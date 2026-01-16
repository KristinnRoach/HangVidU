(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))s(r);new MutationObserver(r=>{for(const i of r)if(i.type==="childList")for(const o of i.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&s(o)}).observe(document,{childList:!0,subtree:!0});function n(r){const i={};return r.integrity&&(i.integrity=r.integrity),r.referrerPolicy&&(i.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?i.credentials="include":r.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function s(r){if(r.ep)return;r.ep=!0;const i=n(r);fetch(r.href,i)}})();const u_="modulepreload",d_=function(t){return"/HangVidU/"+t},ou={},rt=function(e,n,s){let r=Promise.resolve();if(n&&n.length>0){let c=function(l){return Promise.all(l.map(u=>Promise.resolve(u).then(d=>({status:"fulfilled",value:d}),d=>({status:"rejected",reason:d}))))};document.getElementsByTagName("link");const o=document.querySelector("meta[property=csp-nonce]"),a=o?.nonce||o?.getAttribute("nonce");r=c(n.map(l=>{if(l=d_(l),l in ou)return;ou[l]=!0;const u=l.endsWith(".css"),d=u?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${l}"]${d}`))return;const h=document.createElement("link");if(h.rel=u?"stylesheet":u_,u||(h.as="script"),h.crossOrigin="",h.href=l,a&&h.setAttribute("nonce",a),document.head.appendChild(h),u)return new Promise((f,p)=>{h.addEventListener("load",f),h.addEventListener("error",()=>p(new Error(`Unable to preload CSS for ${l}`)))})}))}function i(o){const a=new Event("vite:preloadError",{cancelable:!0});if(a.payload=o,window.dispatchEvent(a),!a.defaultPrevented)throw o}return r.then(o=>{for(const a of o||[])a.status==="rejected"&&i(a.reason);return e().catch(i)})},I=typeof __SENTRY_DEBUG__>"u"||__SENTRY_DEBUG__,U=globalThis,mn="10.26.0";function eo(){return to(U),U}function to(t){const e=t.__SENTRY__=t.__SENTRY__||{};return e.version=e.version||mn,e[mn]=e[mn]||{}}function _s(t,e,n=U){const s=n.__SENTRY__=n.__SENTRY__||{},r=s[mn]=s[mn]||{};return r[t]||(r[t]=e())}const h_=["debug","info","warn","error","log","assert","trace"],f_="Sentry Logger ",_i={};function ys(t){if(!("console"in U))return t();const e=U.console,n={},s=Object.keys(_i);s.forEach(r=>{const i=_i[r];n[r]=e[r],e[r]=i});try{return t()}finally{s.forEach(r=>{e[r]=n[r]})}}function p_(){vc().enabled=!0}function g_(){vc().enabled=!1}function $h(){return vc().enabled}function m_(...t){Ec("log",...t)}function __(...t){Ec("warn",...t)}function y_(...t){Ec("error",...t)}function Ec(t,...e){I&&$h()&&ys(()=>{U.console[t](`${f_}[${t}]:`,...e)})}function vc(){return I?_s("loggerSettings",()=>({enabled:!1})):{enabled:!1}}const b={enable:p_,disable:g_,isEnabled:$h,log:m_,warn:__,error:y_},Bh=50,wn="?",au=/\(error: (.*)\)/,cu=/captureMessage|captureException/;function Hh(...t){const e=t.sort((n,s)=>n[0]-s[0]).map(n=>n[1]);return(n,s=0,r=0)=>{const i=[],o=n.split(`
`);for(let a=s;a<o.length;a++){let c=o[a];c.length>1024&&(c=c.slice(0,1024));const l=au.test(c)?c.replace(au,"$1"):c;if(!l.match(/\S*Error: /)){for(const u of e){const d=u(l);if(d){i.push(d);break}}if(i.length>=Bh+r)break}}return v_(i.slice(r))}}function E_(t){return Array.isArray(t)?Hh(...t):t}function v_(t){if(!t.length)return[];const e=Array.from(t);return/sentryWrapped/.test(qr(e).function||"")&&e.pop(),e.reverse(),cu.test(qr(e).function||"")&&(e.pop(),cu.test(qr(e).function||"")&&e.pop()),e.slice(0,Bh).map(n=>({...n,filename:n.filename||qr(e).filename,function:n.function||wn}))}function qr(t){return t[t.length-1]||{}}const Uo="<anonymous>";function zt(t){try{return!t||typeof t!="function"?Uo:t.name||Uo}catch{return Uo}}function lu(t){const e=t.exception;if(e){const n=[];try{return e.values.forEach(s=>{s.stacktrace.frames&&n.push(...s.stacktrace.frames)}),n}catch{return}}}function Vh(t){return"__v_isVNode"in t&&t.__v_isVNode?"[VueVNode]":"[VueViewModel]"}const ri={},uu={};function On(t,e){ri[t]=ri[t]||[],ri[t].push(e)}function Dn(t,e){if(!uu[t]){uu[t]=!0;try{e()}catch(n){I&&b.error(`Error while instrumenting ${t}`,n)}}}function qe(t,e){const n=t&&ri[t];if(n)for(const s of n)try{s(e)}catch(r){I&&b.error(`Error while triggering instrumentation handler.
Type: ${t}
Name: ${zt(s)}
Error:`,r)}}let $o=null;function w_(t){const e="error";On(e,t),Dn(e,b_)}function b_(){$o=U.onerror,U.onerror=function(t,e,n,s,r){return qe("error",{column:s,error:r,line:n,msg:t,url:e}),$o?$o.apply(this,arguments):!1},U.onerror.__SENTRY_INSTRUMENTED__=!0}let Bo=null;function C_(t){const e="unhandledrejection";On(e,t),Dn(e,S_)}function S_(){Bo=U.onunhandledrejection,U.onunhandledrejection=function(t){return qe("unhandledrejection",t),Bo?Bo.apply(this,arguments):!0},U.onunhandledrejection.__SENTRY_INSTRUMENTED__=!0}const Wh=Object.prototype.toString;function wc(t){switch(Wh.call(t)){case"[object Error]":case"[object Exception]":case"[object DOMException]":case"[object WebAssembly.Exception]":return!0;default:return qt(t,Error)}}function Es(t,e){return Wh.call(t)===`[object ${e}]`}function jh(t){return Es(t,"ErrorEvent")}function du(t){return Es(t,"DOMError")}function T_(t){return Es(t,"DOMException")}function yt(t){return Es(t,"String")}function bc(t){return typeof t=="object"&&t!==null&&"__sentry_template_string__"in t&&"__sentry_template_values__"in t}function no(t){return t===null||bc(t)||typeof t!="object"&&typeof t!="function"}function or(t){return Es(t,"Object")}function so(t){return typeof Event<"u"&&qt(t,Event)}function I_(t){return typeof Element<"u"&&qt(t,Element)}function k_(t){return Es(t,"RegExp")}function Sr(t){return!!(t?.then&&typeof t.then=="function")}function R_(t){return or(t)&&"nativeEvent"in t&&"preventDefault"in t&&"stopPropagation"in t}function qt(t,e){try{return t instanceof e}catch{return!1}}function zh(t){return!!(typeof t=="object"&&t!==null&&(t.__isVue||t._isVue||t.__v_isVNode))}function A_(t){return typeof Request<"u"&&qt(t,Request)}const Cc=U,N_=80;function qh(t,e={}){if(!t)return"<unknown>";try{let n=t;const s=5,r=[];let i=0,o=0;const a=" > ",c=a.length;let l;const u=Array.isArray(e)?e:e.keyAttrs,d=!Array.isArray(e)&&e.maxStringLength||N_;for(;n&&i++<s&&(l=P_(n,u),!(l==="html"||i>1&&o+r.length*c+l.length>=d));)r.push(l),o+=l.length,n=n.parentNode;return r.reverse().join(a)}catch{return"<unknown>"}}function P_(t,e){const n=t,s=[];if(!n?.tagName)return"";if(Cc.HTMLElement&&n instanceof HTMLElement&&n.dataset){if(n.dataset.sentryComponent)return n.dataset.sentryComponent;if(n.dataset.sentryElement)return n.dataset.sentryElement}s.push(n.tagName.toLowerCase());const r=e?.length?e.filter(o=>n.getAttribute(o)).map(o=>[o,n.getAttribute(o)]):null;if(r?.length)r.forEach(o=>{s.push(`[${o[0]}="${o[1]}"]`)});else{n.id&&s.push(`#${n.id}`);const o=n.className;if(o&&yt(o)){const a=o.split(/\s+/);for(const c of a)s.push(`.${c}`)}}const i=["aria-label","type","name","title","alt"];for(const o of i){const a=n.getAttribute(o);a&&s.push(`[${o}="${a}"]`)}return s.join("")}function Sc(){try{return Cc.document.location.href}catch{return""}}function L_(t){if(!Cc.HTMLElement)return null;let e=t;const n=5;for(let s=0;s<n;s++){if(!e)return null;if(e instanceof HTMLElement){if(e.dataset.sentryComponent)return e.dataset.sentryComponent;if(e.dataset.sentryElement)return e.dataset.sentryElement}e=e.parentNode}return null}function Ne(t,e,n){if(!(e in t))return;const s=t[e];if(typeof s!="function")return;const r=n(s);typeof r=="function"&&Gh(r,s);try{t[e]=r}catch{I&&b.log(`Failed to replace method "${e}" in object`,t)}}function bn(t,e,n){try{Object.defineProperty(t,e,{value:n,writable:!0,configurable:!0})}catch{I&&b.log(`Failed to add non-enumerable property "${e}" to object`,t)}}function Gh(t,e){try{const n=e.prototype||{};t.prototype=e.prototype=n,bn(t,"__sentry_original__",e)}catch{}}function Tc(t){return t.__sentry_original__}function Yh(t){if(wc(t))return{message:t.message,name:t.name,stack:t.stack,...fu(t)};if(so(t)){const e={type:t.type,target:hu(t.target),currentTarget:hu(t.currentTarget),...fu(t)};return typeof CustomEvent<"u"&&qt(t,CustomEvent)&&(e.detail=t.detail),e}else return t}function hu(t){try{return I_(t)?qh(t):Object.prototype.toString.call(t)}catch{return"<unknown>"}}function fu(t){if(typeof t=="object"&&t!==null){const e={};for(const n in t)Object.prototype.hasOwnProperty.call(t,n)&&(e[n]=t[n]);return e}else return{}}function O_(t){const e=Object.keys(Yh(t));return e.sort(),e[0]?e.join(", "):"[object has no keys]"}function Kh(t,e=0){return typeof t!="string"||e===0||t.length<=e?t:`${t.slice(0,e)}...`}function pu(t,e){if(!Array.isArray(t))return"";const n=[];for(let s=0;s<t.length;s++){const r=t[s];try{zh(r)?n.push(Vh(r)):n.push(String(r))}catch{n.push("[value cannot be serialized]")}}return n.join(e)}function ii(t,e,n=!1){return yt(t)?k_(e)?e.test(t):yt(e)?n?t===e:t.includes(e):!1:!1}function ro(t,e=[],n=!1){return e.some(s=>ii(t,s,n))}function D_(){const t=U;return t.crypto||t.msCrypto}let Ho;function M_(){return Math.random()*16}function De(t=D_()){try{if(t?.randomUUID)return t.randomUUID().replace(/-/g,"")}catch{}return Ho||(Ho="10000000100040008000"+1e11),Ho.replace(/[018]/g,e=>(e^(M_()&15)>>e/4).toString(16))}function Jh(t){return t.exception?.values?.[0]}function dn(t){const{message:e,event_id:n}=t;if(e)return e;const s=Jh(t);return s?s.type&&s.value?`${s.type}: ${s.value}`:s.type||s.value||n||"<unknown>":n||"<unknown>"}function Ea(t,e,n){const s=t.exception=t.exception||{},r=s.values=s.values||[],i=r[0]=r[0]||{};i.value||(i.value=e||""),i.type||(i.type="Error")}function ss(t,e){const n=Jh(t);if(!n)return;const s={type:"generic",handled:!0},r=n.mechanism;if(n.mechanism={...s,...r,...e},e&&"data"in e){const i={...r?.data,...e.data};n.mechanism.data=i}}function gu(t){if(x_(t))return!0;try{bn(t,"__sentry_captured__",!0)}catch{}return!1}function x_(t){try{return t.__sentry_captured__}catch{}}const Xh=1e3;function Tr(){return Date.now()/Xh}function F_(){const{performance:t}=U;if(!t?.now||!t.timeOrigin)return Tr;const e=t.timeOrigin;return()=>(e+t.now())/Xh}let mu;function Et(){return(mu??(mu=F_()))()}function U_(t){const e=Et(),n={sid:De(),init:!0,timestamp:e,started:e,duration:0,status:"ok",errors:0,ignoreDuration:!1,toJSON:()=>B_(n)};return t&&rs(n,t),n}function rs(t,e={}){if(e.user&&(!t.ipAddress&&e.user.ip_address&&(t.ipAddress=e.user.ip_address),!t.did&&!e.did&&(t.did=e.user.id||e.user.email||e.user.username)),t.timestamp=e.timestamp||Et(),e.abnormal_mechanism&&(t.abnormal_mechanism=e.abnormal_mechanism),e.ignoreDuration&&(t.ignoreDuration=e.ignoreDuration),e.sid&&(t.sid=e.sid.length===32?e.sid:De()),e.init!==void 0&&(t.init=e.init),!t.did&&e.did&&(t.did=`${e.did}`),typeof e.started=="number"&&(t.started=e.started),t.ignoreDuration)t.duration=void 0;else if(typeof e.duration=="number")t.duration=e.duration;else{const n=t.timestamp-t.started;t.duration=n>=0?n:0}e.release&&(t.release=e.release),e.environment&&(t.environment=e.environment),!t.ipAddress&&e.ipAddress&&(t.ipAddress=e.ipAddress),!t.userAgent&&e.userAgent&&(t.userAgent=e.userAgent),typeof e.errors=="number"&&(t.errors=e.errors),e.status&&(t.status=e.status)}function $_(t,e){let n={};t.status==="ok"&&(n={status:"exited"}),rs(t,n)}function B_(t){return{sid:`${t.sid}`,init:t.init,started:new Date(t.started*1e3).toISOString(),timestamp:new Date(t.timestamp*1e3).toISOString(),status:t.status,errors:t.errors,did:typeof t.did=="number"||typeof t.did=="string"?`${t.did}`:void 0,duration:t.duration,abnormal_mechanism:t.abnormal_mechanism,attrs:{release:t.release,environment:t.environment,ip_address:t.ipAddress,user_agent:t.userAgent}}}function Ir(t,e,n=2){if(!e||typeof e!="object"||n<=0)return e;if(t&&Object.keys(e).length===0)return t;const s={...t};for(const r in e)Object.prototype.hasOwnProperty.call(e,r)&&(s[r]=Ir(s[r],e[r],n-1));return s}function _u(){return De()}function Qh(){return De().substring(16)}const va="_sentrySpan";function yu(t,e){e?bn(t,va,e):delete t[va]}function Eu(t){return t[va]}const H_=100;class bt{constructor(){this._notifyingListeners=!1,this._scopeListeners=[],this._eventProcessors=[],this._breadcrumbs=[],this._attachments=[],this._user={},this._tags={},this._extra={},this._contexts={},this._sdkProcessingMetadata={},this._propagationContext={traceId:_u(),sampleRand:Math.random()}}clone(){const e=new bt;return e._breadcrumbs=[...this._breadcrumbs],e._tags={...this._tags},e._extra={...this._extra},e._contexts={...this._contexts},this._contexts.flags&&(e._contexts.flags={values:[...this._contexts.flags.values]}),e._user=this._user,e._level=this._level,e._session=this._session,e._transactionName=this._transactionName,e._fingerprint=this._fingerprint,e._eventProcessors=[...this._eventProcessors],e._attachments=[...this._attachments],e._sdkProcessingMetadata={...this._sdkProcessingMetadata},e._propagationContext={...this._propagationContext},e._client=this._client,e._lastEventId=this._lastEventId,yu(e,Eu(this)),e}setClient(e){this._client=e}setLastEventId(e){this._lastEventId=e}getClient(){return this._client}lastEventId(){return this._lastEventId}addScopeListener(e){this._scopeListeners.push(e)}addEventProcessor(e){return this._eventProcessors.push(e),this}setUser(e){return this._user=e||{email:void 0,id:void 0,ip_address:void 0,username:void 0},this._session&&rs(this._session,{user:e}),this._notifyScopeListeners(),this}getUser(){return this._user}setTags(e){return this._tags={...this._tags,...e},this._notifyScopeListeners(),this}setTag(e,n){return this.setTags({[e]:n})}setExtras(e){return this._extra={...this._extra,...e},this._notifyScopeListeners(),this}setExtra(e,n){return this._extra={...this._extra,[e]:n},this._notifyScopeListeners(),this}setFingerprint(e){return this._fingerprint=e,this._notifyScopeListeners(),this}setLevel(e){return this._level=e,this._notifyScopeListeners(),this}setTransactionName(e){return this._transactionName=e,this._notifyScopeListeners(),this}setContext(e,n){return n===null?delete this._contexts[e]:this._contexts[e]=n,this._notifyScopeListeners(),this}setSession(e){return e?this._session=e:delete this._session,this._notifyScopeListeners(),this}getSession(){return this._session}update(e){if(!e)return this;const n=typeof e=="function"?e(this):e,s=n instanceof bt?n.getScopeData():or(n)?e:void 0,{tags:r,extra:i,user:o,contexts:a,level:c,fingerprint:l=[],propagationContext:u}=s||{};return this._tags={...this._tags,...r},this._extra={...this._extra,...i},this._contexts={...this._contexts,...a},o&&Object.keys(o).length&&(this._user=o),c&&(this._level=c),l.length&&(this._fingerprint=l),u&&(this._propagationContext=u),this}clear(){return this._breadcrumbs=[],this._tags={},this._extra={},this._user={},this._contexts={},this._level=void 0,this._transactionName=void 0,this._fingerprint=void 0,this._session=void 0,yu(this,void 0),this._attachments=[],this.setPropagationContext({traceId:_u(),sampleRand:Math.random()}),this._notifyScopeListeners(),this}addBreadcrumb(e,n){const s=typeof n=="number"?n:H_;if(s<=0)return this;const r={timestamp:Tr(),...e,message:e.message?Kh(e.message,2048):e.message};return this._breadcrumbs.push(r),this._breadcrumbs.length>s&&(this._breadcrumbs=this._breadcrumbs.slice(-s),this._client?.recordDroppedEvent("buffer_overflow","log_item")),this._notifyScopeListeners(),this}getLastBreadcrumb(){return this._breadcrumbs[this._breadcrumbs.length-1]}clearBreadcrumbs(){return this._breadcrumbs=[],this._notifyScopeListeners(),this}addAttachment(e){return this._attachments.push(e),this}clearAttachments(){return this._attachments=[],this}getScopeData(){return{breadcrumbs:this._breadcrumbs,attachments:this._attachments,contexts:this._contexts,tags:this._tags,extra:this._extra,user:this._user,level:this._level,fingerprint:this._fingerprint||[],eventProcessors:this._eventProcessors,propagationContext:this._propagationContext,sdkProcessingMetadata:this._sdkProcessingMetadata,transactionName:this._transactionName,span:Eu(this)}}setSDKProcessingMetadata(e){return this._sdkProcessingMetadata=Ir(this._sdkProcessingMetadata,e,2),this}setPropagationContext(e){return this._propagationContext=e,this}getPropagationContext(){return this._propagationContext}captureException(e,n){const s=n?.event_id||De();if(!this._client)return I&&b.warn("No client configured on scope - will not capture exception!"),s;const r=new Error("Sentry syntheticException");return this._client.captureException(e,{originalException:e,syntheticException:r,...n,event_id:s},this),s}captureMessage(e,n,s){const r=s?.event_id||De();if(!this._client)return I&&b.warn("No client configured on scope - will not capture message!"),r;const i=s?.syntheticException??new Error(e);return this._client.captureMessage(e,n,{originalException:e,syntheticException:i,...s,event_id:r},this),r}captureEvent(e,n){const s=n?.event_id||De();return this._client?(this._client.captureEvent(e,{...n,event_id:s},this),s):(I&&b.warn("No client configured on scope - will not capture event!"),s)}_notifyScopeListeners(){this._notifyingListeners||(this._notifyingListeners=!0,this._scopeListeners.forEach(e=>{e(this)}),this._notifyingListeners=!1)}}function V_(){return _s("defaultCurrentScope",()=>new bt)}function W_(){return _s("defaultIsolationScope",()=>new bt)}class j_{constructor(e,n){let s;e?s=e:s=new bt;let r;n?r=n:r=new bt,this._stack=[{scope:s}],this._isolationScope=r}withScope(e){const n=this._pushScope();let s;try{s=e(n)}catch(r){throw this._popScope(),r}return Sr(s)?s.then(r=>(this._popScope(),r),r=>{throw this._popScope(),r}):(this._popScope(),s)}getClient(){return this.getStackTop().client}getScope(){return this.getStackTop().scope}getIsolationScope(){return this._isolationScope}getStackTop(){return this._stack[this._stack.length-1]}_pushScope(){const e=this.getScope().clone();return this._stack.push({client:this.getClient(),scope:e}),e}_popScope(){return this._stack.length<=1?!1:!!this._stack.pop()}}function is(){const t=eo(),e=to(t);return e.stack=e.stack||new j_(V_(),W_())}function z_(t){return is().withScope(t)}function q_(t,e){const n=is();return n.withScope(()=>(n.getStackTop().scope=t,e(t)))}function vu(t){return is().withScope(()=>t(is().getIsolationScope()))}function G_(){return{withIsolationScope:vu,withScope:z_,withSetScope:q_,withSetIsolationScope:(t,e)=>vu(e),getCurrentScope:()=>is().getScope(),getIsolationScope:()=>is().getIsolationScope()}}function Ic(t){const e=to(t);return e.acs?e.acs:G_()}function Zt(){const t=eo();return Ic(t).getCurrentScope()}function kr(){const t=eo();return Ic(t).getIsolationScope()}function Y_(){return _s("globalScope",()=>new bt)}function K_(...t){const e=eo(),n=Ic(e);if(t.length===2){const[s,r]=t;return s?n.withSetScope(s,r):n.withScope(r)}return n.withScope(t[0])}function be(){return Zt().getClient()}function J_(t){const e=t.getPropagationContext(),{traceId:n,parentSpanId:s,propagationSpanId:r}=e,i={trace_id:n,span_id:r||Qh()};return s&&(i.parent_span_id=s),i}const X_="sentry.source",Q_="sentry.sample_rate",Z_="sentry.previous_trace_sample_rate",ey="sentry.op",ty="sentry.origin",Zh="sentry.profile_id",ef="sentry.exclusive_time",ny=0,sy=1,ry="_sentryScope",iy="_sentryIsolationScope";function oy(t){if(t){if(typeof t=="object"&&"deref"in t&&typeof t.deref=="function")try{return t.deref()}catch{return}return t}}function tf(t){const e=t;return{scope:e[ry],isolationScope:oy(e[iy])}}const ay="sentry-",cy=/^sentry-/;function ly(t){const e=uy(t);if(!e)return;const n=Object.entries(e).reduce((s,[r,i])=>{if(r.match(cy)){const o=r.slice(ay.length);s[o]=i}return s},{});if(Object.keys(n).length>0)return n}function uy(t){if(!(!t||!yt(t)&&!Array.isArray(t)))return Array.isArray(t)?t.reduce((e,n)=>{const s=wu(n);return Object.entries(s).forEach(([r,i])=>{e[r]=i}),e},{}):wu(t)}function wu(t){return t.split(",").map(e=>{const n=e.indexOf("=");if(n===-1)return[];const s=e.slice(0,n),r=e.slice(n+1);return[s,r].map(i=>{try{return decodeURIComponent(i.trim())}catch{return}})}).reduce((e,[n,s])=>(n&&s&&(e[n]=s),e),{})}const dy=/^o(\d+)\./,hy=/^(?:(\w+):)\/\/(?:(\w+)(?::(\w+)?)?@)([\w.-]+)(?::(\d+))?\/(.+)/;function fy(t){return t==="http"||t==="https"}function Rr(t,e=!1){const{host:n,path:s,pass:r,port:i,projectId:o,protocol:a,publicKey:c}=t;return`${a}://${c}${e&&r?`:${r}`:""}@${n}${i?`:${i}`:""}/${s&&`${s}/`}${o}`}function py(t){const e=hy.exec(t);if(!e){ys(()=>{console.error(`Invalid Sentry Dsn: ${t}`)});return}const[n,s,r="",i="",o="",a=""]=e.slice(1);let c="",l=a;const u=l.split("/");if(u.length>1&&(c=u.slice(0,-1).join("/"),l=u.pop()),l){const d=l.match(/^\d+/);d&&(l=d[0])}return nf({host:i,pass:r,path:c,projectId:l,port:o,protocol:n,publicKey:s})}function nf(t){return{protocol:t.protocol,publicKey:t.publicKey||"",pass:t.pass||"",host:t.host,port:t.port||"",path:t.path||"",projectId:t.projectId}}function gy(t){if(!I)return!0;const{port:e,projectId:n,protocol:s}=t;return["protocol","publicKey","host","projectId"].find(o=>t[o]?!1:(b.error(`Invalid Sentry Dsn: ${o} missing`),!0))?!1:n.match(/^\d+$/)?fy(s)?e&&isNaN(parseInt(e,10))?(b.error(`Invalid Sentry Dsn: Invalid port ${e}`),!1):!0:(b.error(`Invalid Sentry Dsn: Invalid protocol ${s}`),!1):(b.error(`Invalid Sentry Dsn: Invalid projectId ${n}`),!1)}function my(t){return t.match(dy)?.[1]}function _y(t){const e=t.getOptions(),{host:n}=t.getDsn()||{};let s;return e.orgId?s=String(e.orgId):n&&(s=my(n)),s}function yy(t){const e=typeof t=="string"?py(t):nf(t);if(!(!e||!gy(e)))return e}function Ey(t){if(typeof t=="boolean")return Number(t);const e=typeof t=="string"?parseFloat(t):t;if(!(typeof e!="number"||isNaN(e)||e<0||e>1))return e}const sf=1;let bu=!1;function vy(t){const{spanId:e,traceId:n,isRemote:s}=t.spanContext(),r=s?e:kc(t).parent_span_id,i=tf(t).scope,o=s?i?.getPropagationContext().propagationSpanId||Qh():e;return{parent_span_id:r,span_id:o,trace_id:n}}function wy(t){if(t&&t.length>0)return t.map(({context:{spanId:e,traceId:n,traceFlags:s,...r},attributes:i})=>({span_id:e,trace_id:n,sampled:s===sf,attributes:i,...r}))}function Cu(t){return typeof t=="number"?Su(t):Array.isArray(t)?t[0]+t[1]/1e9:t instanceof Date?Su(t.getTime()):Et()}function Su(t){return t>9999999999?t/1e3:t}function kc(t){if(Cy(t))return t.getSpanJSON();const{spanId:e,traceId:n}=t.spanContext();if(by(t)){const{attributes:s,startTime:r,name:i,endTime:o,status:a,links:c}=t,l="parentSpanId"in t?t.parentSpanId:"parentSpanContext"in t?t.parentSpanContext?.spanId:void 0;return{span_id:e,trace_id:n,data:s,description:i,parent_span_id:l,start_timestamp:Cu(r),timestamp:Cu(o)||void 0,status:Ty(a),op:s[ey],origin:s[ty],links:wy(c)}}return{span_id:e,trace_id:n,start_timestamp:0,data:{}}}function by(t){const e=t;return!!e.attributes&&!!e.startTime&&!!e.name&&!!e.endTime&&!!e.status}function Cy(t){return typeof t.getSpanJSON=="function"}function Sy(t){const{traceFlags:e}=t.spanContext();return e===sf}function Ty(t){if(!(!t||t.code===ny))return t.code===sy?"ok":t.message||"internal_error"}const Iy="_sentryRootSpan";function rf(t){return t[Iy]||t}function Tu(){bu||(ys(()=>{console.warn("[Sentry] Returning null from `beforeSendSpan` is disallowed. To drop certain spans, configure the respective integrations directly or use `ignoreSpans`.")}),bu=!0)}function ky(t){if(typeof __SENTRY_TRACING__=="boolean"&&!__SENTRY_TRACING__)return!1;const e=be()?.getOptions();return!!e&&(e.tracesSampleRate!=null||!!e.tracesSampler)}function Iu(t){b.log(`Ignoring span ${t.op} - ${t.description} because it matches \`ignoreSpans\`.`)}function ku(t,e){if(!e?.length||!t.description)return!1;for(const n of e){if(Ay(n)){if(ii(t.description,n))return I&&Iu(t),!0;continue}if(!n.name&&!n.op)continue;const s=n.name?ii(t.description,n.name):!0,r=n.op?t.op&&ii(t.op,n.op):!0;if(s&&r)return I&&Iu(t),!0}return!1}function Ry(t,e){const n=e.parent_span_id,s=e.span_id;if(n)for(const r of t)r.parent_span_id===s&&(r.parent_span_id=n)}function Ay(t){return typeof t=="string"||t instanceof RegExp}const Rc="production",Ny="_frozenDsc";function of(t,e){const n=e.getOptions(),{publicKey:s}=e.getDsn()||{},r={environment:n.environment||Rc,release:n.release,public_key:s,trace_id:t,org_id:_y(e)};return e.emit("createDsc",r),r}function Py(t,e){const n=e.getPropagationContext();return n.dsc||of(n.traceId,t)}function Ly(t){const e=be();if(!e)return{};const n=rf(t),s=kc(n),r=s.data,i=n.spanContext().traceState,o=i?.get("sentry.sample_rate")??r[Q_]??r[Z_];function a(p){return(typeof o=="number"||typeof o=="string")&&(p.sample_rate=`${o}`),p}const c=n[Ny];if(c)return a(c);const l=i?.get("sentry.dsc"),u=l&&ly(l);if(u)return a(u);const d=of(t.spanContext().traceId,e),h=r[X_],f=s.description;return h!=="url"&&f&&(d.transaction=f),ky()&&(d.sampled=String(Sy(n)),d.sample_rand=i?.get("sentry.sample_rand")??tf(n).scope?.getPropagationContext().sampleRand.toString()),a(d),e.emit("createDsc",d,n),d}function ut(t,e=100,n=1/0){try{return wa("",t,e,n)}catch(s){return{ERROR:`**non-serializable** (${s})`}}}function af(t,e=3,n=100*1024){const s=ut(t,e);return xy(s)>n?af(t,e-1,n):s}function wa(t,e,n=1/0,s=1/0,r=Fy()){const[i,o]=r;if(e==null||["boolean","string"].includes(typeof e)||typeof e=="number"&&Number.isFinite(e))return e;const a=Oy(t,e);if(!a.startsWith("[object "))return a;if(e.__sentry_skip_normalization__)return e;const c=typeof e.__sentry_override_normalization_depth__=="number"?e.__sentry_override_normalization_depth__:n;if(c===0)return a.replace("object ","");if(i(e))return"[Circular ~]";const l=e;if(l&&typeof l.toJSON=="function")try{const f=l.toJSON();return wa("",f,c-1,s,r)}catch{}const u=Array.isArray(e)?[]:{};let d=0;const h=Yh(e);for(const f in h){if(!Object.prototype.hasOwnProperty.call(h,f))continue;if(d>=s){u[f]="[MaxProperties ~]";break}const p=h[f];u[f]=wa(f,p,c-1,s,r),d++}return o(e),u}function Oy(t,e){try{if(t==="domain"&&e&&typeof e=="object"&&e._events)return"[Domain]";if(t==="domainEmitter")return"[DomainEmitter]";if(typeof global<"u"&&e===global)return"[Global]";if(typeof window<"u"&&e===window)return"[Window]";if(typeof document<"u"&&e===document)return"[Document]";if(zh(e))return Vh(e);if(R_(e))return"[SyntheticEvent]";if(typeof e=="number"&&!Number.isFinite(e))return`[${e}]`;if(typeof e=="function")return`[Function: ${zt(e)}]`;if(typeof e=="symbol")return`[${String(e)}]`;if(typeof e=="bigint")return`[BigInt: ${String(e)}]`;const n=Dy(e);return/^HTML(\w*)Element$/.test(n)?`[HTMLElement: ${n}]`:`[object ${n}]`}catch(n){return`**non-serializable** (${n})`}}function Dy(t){const e=Object.getPrototypeOf(t);return e?.constructor?e.constructor.name:"null prototype"}function My(t){return~-encodeURI(t).split(/%..|./).length}function xy(t){return My(JSON.stringify(t))}function Fy(){const t=new WeakSet;function e(s){return t.has(s)?!0:(t.add(s),!1)}function n(s){t.delete(s)}return[e,n]}function vs(t,e=[]){return[t,e]}function Uy(t,e){const[n,s]=t;return[n,[...s,e]]}function Ru(t,e){const n=t[1];for(const s of n){const r=s[0].type;if(e(s,r))return!0}return!1}function ba(t){const e=to(U);return e.encodePolyfill?e.encodePolyfill(t):new TextEncoder().encode(t)}function $y(t){const[e,n]=t;let s=JSON.stringify(e);function r(i){typeof s=="string"?s=typeof i=="string"?s+i:[ba(s),i]:s.push(typeof i=="string"?ba(i):i)}for(const i of n){const[o,a]=i;if(r(`
${JSON.stringify(o)}
`),typeof a=="string"||a instanceof Uint8Array)r(a);else{let c;try{c=JSON.stringify(a)}catch{c=JSON.stringify(ut(a))}r(c)}}return typeof s=="string"?s:By(s)}function By(t){const e=t.reduce((r,i)=>r+i.length,0),n=new Uint8Array(e);let s=0;for(const r of t)n.set(r,s),s+=r.length;return n}function Hy(t){const e=typeof t.data=="string"?ba(t.data):t.data;return[{type:"attachment",length:e.length,filename:t.filename,content_type:t.contentType,attachment_type:t.attachmentType},e]}const Vy={session:"session",sessions:"session",attachment:"attachment",transaction:"transaction",event:"error",client_report:"internal",user_report:"default",profile:"profile",profile_chunk:"profile",replay_event:"replay",replay_recording:"replay",check_in:"monitor",feedback:"feedback",span:"span",raw_security:"security",log:"log_item",metric:"metric",trace_metric:"metric"};function Au(t){return Vy[t]}function cf(t){if(!t?.sdk)return;const{name:e,version:n}=t.sdk;return{name:e,version:n}}function Wy(t,e,n,s){const r=t.sdkProcessingMetadata?.dynamicSamplingContext;return{event_id:t.event_id,sent_at:new Date().toISOString(),...e&&{sdk:e},...!!n&&s&&{dsn:Rr(s)},...r&&{trace:r}}}function jy(t,e){if(!e)return t;const n=t.sdk||{};return t.sdk={...n,name:n.name||e.name,version:n.version||e.version,integrations:[...t.sdk?.integrations||[],...e.integrations||[]],packages:[...t.sdk?.packages||[],...e.packages||[]],settings:t.sdk?.settings||e.settings?{...t.sdk?.settings,...e.settings}:void 0},t}function zy(t,e,n,s){const r=cf(n),i={sent_at:new Date().toISOString(),...r&&{sdk:r},...!!s&&e&&{dsn:Rr(e)}},o="aggregates"in t?[{type:"sessions"},t]:[{type:"session"},t.toJSON()];return vs(i,[o])}function qy(t,e,n,s){const r=cf(n),i=t.type&&t.type!=="replay_event"?t.type:"event";jy(t,n?.sdk);const o=Wy(t,r,s,e);return delete t.sdkProcessingMetadata,vs(o,[[{type:i},t]])}const Vo=0,Nu=1,Pu=2;function io(t){return new ar(e=>{e(t)})}function Ac(t){return new ar((e,n)=>{n(t)})}class ar{constructor(e){this._state=Vo,this._handlers=[],this._runExecutor(e)}then(e,n){return new ar((s,r)=>{this._handlers.push([!1,i=>{if(!e)s(i);else try{s(e(i))}catch(o){r(o)}},i=>{if(!n)r(i);else try{s(n(i))}catch(o){r(o)}}]),this._executeHandlers()})}catch(e){return this.then(n=>n,e)}finally(e){return new ar((n,s)=>{let r,i;return this.then(o=>{i=!1,r=o,e&&e()},o=>{i=!0,r=o,e&&e()}).then(()=>{if(i){s(r);return}n(r)})})}_executeHandlers(){if(this._state===Vo)return;const e=this._handlers.slice();this._handlers=[],e.forEach(n=>{n[0]||(this._state===Nu&&n[1](this._value),this._state===Pu&&n[2](this._value),n[0]=!0)})}_runExecutor(e){const n=(i,o)=>{if(this._state===Vo){if(Sr(o)){o.then(s,r);return}this._state=i,this._value=o,this._executeHandlers()}},s=i=>{n(Nu,i)},r=i=>{n(Pu,i)};try{e(s,r)}catch(i){r(i)}}}function Gy(t,e,n,s=0){try{const r=Ca(e,n,t,s);return Sr(r)?r:io(r)}catch(r){return Ac(r)}}function Ca(t,e,n,s){const r=n[s];if(!t||!r)return t;const i=r({...t},e);return I&&i===null&&b.log(`Event processor "${r.id||"?"}" dropped event`),Sr(i)?i.then(o=>Ca(o,e,n,s+1)):Ca(i,e,n,s+1)}function Yy(t,e){const{fingerprint:n,span:s,breadcrumbs:r,sdkProcessingMetadata:i}=e;Ky(t,e),s&&Qy(t,s),Zy(t,n),Jy(t,r),Xy(t,i)}function Lu(t,e){const{extra:n,tags:s,user:r,contexts:i,level:o,sdkProcessingMetadata:a,breadcrumbs:c,fingerprint:l,eventProcessors:u,attachments:d,propagationContext:h,transactionName:f,span:p}=e;Gr(t,"extra",n),Gr(t,"tags",s),Gr(t,"user",r),Gr(t,"contexts",i),t.sdkProcessingMetadata=Ir(t.sdkProcessingMetadata,a,2),o&&(t.level=o),f&&(t.transactionName=f),p&&(t.span=p),c.length&&(t.breadcrumbs=[...t.breadcrumbs,...c]),l.length&&(t.fingerprint=[...t.fingerprint,...l]),u.length&&(t.eventProcessors=[...t.eventProcessors,...u]),d.length&&(t.attachments=[...t.attachments,...d]),t.propagationContext={...t.propagationContext,...h}}function Gr(t,e,n){t[e]=Ir(t[e],n,1)}function Ky(t,e){const{extra:n,tags:s,user:r,contexts:i,level:o,transactionName:a}=e;Object.keys(n).length&&(t.extra={...n,...t.extra}),Object.keys(s).length&&(t.tags={...s,...t.tags}),Object.keys(r).length&&(t.user={...r,...t.user}),Object.keys(i).length&&(t.contexts={...i,...t.contexts}),o&&(t.level=o),a&&t.type!=="transaction"&&(t.transaction=a)}function Jy(t,e){const n=[...t.breadcrumbs||[],...e];t.breadcrumbs=n.length?n:void 0}function Xy(t,e){t.sdkProcessingMetadata={...t.sdkProcessingMetadata,...e}}function Qy(t,e){t.contexts={trace:vy(e),...t.contexts},t.sdkProcessingMetadata={dynamicSamplingContext:Ly(e),...t.sdkProcessingMetadata};const n=rf(e),s=kc(n).description;s&&!t.transaction&&t.type==="transaction"&&(t.transaction=s)}function Zy(t,e){t.fingerprint=t.fingerprint?Array.isArray(t.fingerprint)?t.fingerprint:[t.fingerprint]:[],e&&(t.fingerprint=t.fingerprint.concat(e)),t.fingerprint.length||delete t.fingerprint}let rn,Ou,Du,At;function eE(t){const e=U._sentryDebugIds,n=U._debugIds;if(!e&&!n)return{};const s=e?Object.keys(e):[],r=n?Object.keys(n):[];if(At&&s.length===Ou&&r.length===Du)return At;Ou=s.length,Du=r.length,At={},rn||(rn={});const i=(o,a)=>{for(const c of o){const l=a[c],u=rn?.[c];if(u&&At&&l)At[u[0]]=l,rn&&(rn[c]=[u[0],l]);else if(l){const d=t(c);for(let h=d.length-1;h>=0;h--){const p=d[h]?.filename;if(p&&At&&rn){At[p]=l,rn[c]=[p,l];break}}}}};return e&&i(s,e),n&&i(r,n),At}function tE(t,e,n,s,r,i){const{normalizeDepth:o=3,normalizeMaxBreadth:a=1e3}=t,c={...e,event_id:e.event_id||n.event_id||De(),timestamp:e.timestamp||Tr()},l=n.integrations||t.integrations.map(m=>m.name);nE(c,t),iE(c,l),r&&r.emit("applyFrameMetadata",e),e.type===void 0&&sE(c,t.stackParser);const u=aE(s,n.captureContext);n.mechanism&&ss(c,n.mechanism);const d=r?r.getEventProcessors():[],h=Y_().getScopeData();if(i){const m=i.getScopeData();Lu(h,m)}if(u){const m=u.getScopeData();Lu(h,m)}const f=[...n.attachments||[],...h.attachments];f.length&&(n.attachments=f),Yy(c,h);const p=[...d,...h.eventProcessors];return Gy(p,c,n).then(m=>(m&&rE(m),typeof o=="number"&&o>0?oE(m,o,a):m))}function nE(t,e){const{environment:n,release:s,dist:r,maxValueLength:i}=e;t.environment=t.environment||n||Rc,!t.release&&s&&(t.release=s),!t.dist&&r&&(t.dist=r);const o=t.request;o?.url&&(o.url=i?Kh(o.url,i):o.url)}function sE(t,e){const n=eE(e);t.exception?.values?.forEach(s=>{s.stacktrace?.frames?.forEach(r=>{r.filename&&(r.debug_id=n[r.filename])})})}function rE(t){const e={};if(t.exception?.values?.forEach(s=>{s.stacktrace?.frames?.forEach(r=>{r.debug_id&&(r.abs_path?e[r.abs_path]=r.debug_id:r.filename&&(e[r.filename]=r.debug_id),delete r.debug_id)})}),Object.keys(e).length===0)return;t.debug_meta=t.debug_meta||{},t.debug_meta.images=t.debug_meta.images||[];const n=t.debug_meta.images;Object.entries(e).forEach(([s,r])=>{n.push({type:"sourcemap",code_file:s,debug_id:r})})}function iE(t,e){e.length>0&&(t.sdk=t.sdk||{},t.sdk.integrations=[...t.sdk.integrations||[],...e])}function oE(t,e,n){if(!t)return null;const s={...t,...t.breadcrumbs&&{breadcrumbs:t.breadcrumbs.map(r=>({...r,...r.data&&{data:ut(r.data,e,n)}}))},...t.user&&{user:ut(t.user,e,n)},...t.contexts&&{contexts:ut(t.contexts,e,n)},...t.extra&&{extra:ut(t.extra,e,n)}};return t.contexts?.trace&&s.contexts&&(s.contexts.trace=t.contexts.trace,t.contexts.trace.data&&(s.contexts.trace.data=ut(t.contexts.trace.data,e,n))),t.spans&&(s.spans=t.spans.map(r=>({...r,...r.data&&{data:ut(r.data,e,n)}}))),t.contexts?.flags&&s.contexts&&(s.contexts.flags=ut(t.contexts.flags,3,n)),s}function aE(t,e){if(!e)return t;const n=t?t.clone():new bt;return n.update(e),n}function cE(t,e){return Zt().captureException(t,void 0)}function lf(t,e){return Zt().captureEvent(t,e)}function Mu(t){const e=kr(),n=Zt(),{userAgent:s}=U.navigator||{},r=U_({user:n.getUser()||e.getUser(),...s&&{userAgent:s},...t}),i=e.getSession();return i?.status==="ok"&&rs(i,{status:"exited"}),uf(),e.setSession(r),r}function uf(){const t=kr(),n=Zt().getSession()||t.getSession();n&&$_(n),df(),t.setSession()}function df(){const t=kr(),e=be(),n=t.getSession();n&&e&&e.captureSession(n)}function xu(t=!1){if(t){uf();return}df()}const lE="7";function uE(t){const e=t.protocol?`${t.protocol}:`:"",n=t.port?`:${t.port}`:"";return`${e}//${t.host}${n}${t.path?`/${t.path}`:""}/api/`}function dE(t){return`${uE(t)}${t.projectId}/envelope/`}function hE(t,e){const n={sentry_version:lE};return t.publicKey&&(n.sentry_key=t.publicKey),e&&(n.sentry_client=`${e.name}/${e.version}`),new URLSearchParams(n).toString()}function fE(t,e,n){return e||`${dE(t)}?${hE(t,n)}`}const Fu=[];function pE(t){const e={};return t.forEach(n=>{const{name:s}=n,r=e[s];r&&!r.isDefaultInstance&&n.isDefaultInstance||(e[s]=n)}),Object.values(e)}function gE(t){const e=t.defaultIntegrations||[],n=t.integrations;e.forEach(r=>{r.isDefaultInstance=!0});let s;if(Array.isArray(n))s=[...e,...n];else if(typeof n=="function"){const r=n(e);s=Array.isArray(r)?r:[r]}else s=e;return pE(s)}function mE(t,e){const n={};return e.forEach(s=>{s&&hf(t,s,n)}),n}function Uu(t,e){for(const n of e)n?.afterAllSetup&&n.afterAllSetup(t)}function hf(t,e,n){if(n[e.name]){I&&b.log(`Integration skipped because it was already installed: ${e.name}`);return}if(n[e.name]=e,!Fu.includes(e.name)&&typeof e.setupOnce=="function"&&(e.setupOnce(),Fu.push(e.name)),e.setup&&typeof e.setup=="function"&&e.setup(t),typeof e.preprocessEvent=="function"){const s=e.preprocessEvent.bind(e);t.on("preprocessEvent",(r,i)=>s(r,i,t))}if(typeof e.processEvent=="function"){const s=e.processEvent.bind(e),r=Object.assign((i,o)=>s(i,o,t),{id:e.name});t.addEventProcessor(r)}I&&b.log(`Integration installed: ${e.name}`)}function _E(t){return[{type:"log",item_count:t.length,content_type:"application/vnd.sentry.items.log+json"},{items:t}]}function yE(t,e,n,s){const r={};return e?.sdk&&(r.sdk={name:e.sdk.name,version:e.sdk.version}),n&&s&&(r.dsn=Rr(s)),vs(r,[_E(t)])}function ff(t,e){const n=e??EE(t)??[];if(n.length===0)return;const s=t.getOptions(),r=yE(n,s._metadata,s.tunnel,t.getDsn());pf().set(t,[]),t.emit("flushLogs"),t.sendEnvelope(r)}function EE(t){return pf().get(t)}function pf(){return _s("clientToLogBufferMap",()=>new WeakMap)}function vE(t){return[{type:"trace_metric",item_count:t.length,content_type:"application/vnd.sentry.items.trace-metric+json"},{items:t}]}function wE(t,e,n,s){const r={};return e?.sdk&&(r.sdk={name:e.sdk.name,version:e.sdk.version}),n&&s&&(r.dsn=Rr(s)),vs(r,[vE(t)])}function gf(t,e){const n=e??bE(t)??[];if(n.length===0)return;const s=t.getOptions(),r=wE(n,s._metadata,s.tunnel,t.getDsn());mf().set(t,[]),t.emit("flushMetrics"),t.sendEnvelope(r)}function bE(t){return mf().get(t)}function mf(){return _s("clientToMetricBufferMap",()=>new WeakMap)}function CE(t,e,n){const s=[{type:"client_report"},{timestamp:Tr(),discarded_events:t}];return vs(e?{dsn:e}:{},[s])}function _f(t){const e=[];t.message&&e.push(t.message);try{const n=t.exception.values[t.exception.values.length-1];n?.value&&(e.push(n.value),n.type&&e.push(`${n.type}: ${n.value}`))}catch{}return e}function SE(t){const{trace_id:e,parent_span_id:n,span_id:s,status:r,origin:i,data:o,op:a}=t.contexts?.trace??{};return{data:o??{},description:t.transaction,op:a,parent_span_id:n,span_id:s??"",start_timestamp:t.start_timestamp??0,status:r,timestamp:t.timestamp,trace_id:e??"",origin:i,profile_id:o?.[Zh],exclusive_time:o?.[ef],measurements:t.measurements,is_segment:!0}}function TE(t){return{type:"transaction",timestamp:t.timestamp,start_timestamp:t.start_timestamp,transaction:t.description,contexts:{trace:{trace_id:t.trace_id,span_id:t.span_id,parent_span_id:t.parent_span_id,op:t.op,status:t.status,origin:t.origin,data:{...t.data,...t.profile_id&&{[Zh]:t.profile_id},...t.exclusive_time&&{[ef]:t.exclusive_time}}}},measurements:t.measurements}}const $u="Not capturing exception because it's already been captured.",Bu="Discarded session because of missing or non-string release",yf=Symbol.for("SentryInternalError"),Ef=Symbol.for("SentryDoNotSendEventError"),IE=5e3;function oi(t){return{message:t,[yf]:!0}}function Wo(t){return{message:t,[Ef]:!0}}function Hu(t){return!!t&&typeof t=="object"&&yf in t}function Vu(t){return!!t&&typeof t=="object"&&Ef in t}function Wu(t,e,n,s,r){let i=0,o,a=!1;t.on(n,()=>{i=0,clearTimeout(o),a=!1}),t.on(e,c=>{i+=s(c),i>=8e5?r(t):a||(a=!0,o=setTimeout(()=>{r(t)},IE))}),t.on("flush",()=>{r(t)})}class kE{constructor(e){if(this._options=e,this._integrations={},this._numProcessing=0,this._outcomes={},this._hooks={},this._eventProcessors=[],e.dsn?this._dsn=yy(e.dsn):I&&b.warn("No DSN provided, client will not send events."),this._dsn){const s=fE(this._dsn,e.tunnel,e._metadata?e._metadata.sdk:void 0);this._transport=e.transport({tunnel:this._options.tunnel,recordDroppedEvent:this.recordDroppedEvent.bind(this),...e.transportOptions,url:s})}this._options.enableLogs&&Wu(this,"afterCaptureLog","flushLogs",PE,ff),(this._options.enableMetrics??this._options._experiments?.enableMetrics??!0)&&Wu(this,"afterCaptureMetric","flushMetrics",NE,gf)}captureException(e,n,s){const r=De();if(gu(e))return I&&b.log($u),r;const i={event_id:r,...n};return this._process(this.eventFromException(e,i).then(o=>this._captureEvent(o,i,s))),i.event_id}captureMessage(e,n,s,r){const i={event_id:De(),...s},o=bc(e)?e:String(e),a=no(e)?this.eventFromMessage(o,n,i):this.eventFromException(e,i);return this._process(a.then(c=>this._captureEvent(c,i,r))),i.event_id}captureEvent(e,n,s){const r=De();if(n?.originalException&&gu(n.originalException))return I&&b.log($u),r;const i={event_id:r,...n},o=e.sdkProcessingMetadata||{},a=o.capturedSpanScope,c=o.capturedSpanIsolationScope;return this._process(this._captureEvent(e,i,a||s,c)),i.event_id}captureSession(e){this.sendSession(e),rs(e,{init:!1})}getDsn(){return this._dsn}getOptions(){return this._options}getSdkMetadata(){return this._options._metadata}getTransport(){return this._transport}async flush(e){const n=this._transport;if(!n)return!0;this.emit("flush");const s=await this._isClientDoneProcessing(e),r=await n.flush(e);return s&&r}async close(e){const n=await this.flush(e);return this.getOptions().enabled=!1,this.emit("close"),n}getEventProcessors(){return this._eventProcessors}addEventProcessor(e){this._eventProcessors.push(e)}init(){(this._isEnabled()||this._options.integrations.some(({name:e})=>e.startsWith("Spotlight")))&&this._setupIntegrations()}getIntegrationByName(e){return this._integrations[e]}addIntegration(e){const n=this._integrations[e.name];hf(this,e,this._integrations),n||Uu(this,[e])}sendEvent(e,n={}){this.emit("beforeSendEvent",e,n);let s=qy(e,this._dsn,this._options._metadata,this._options.tunnel);for(const r of n.attachments||[])s=Uy(s,Hy(r));this.sendEnvelope(s).then(r=>this.emit("afterSendEvent",e,r))}sendSession(e){const{release:n,environment:s=Rc}=this._options;if("aggregates"in e){const i=e.attrs||{};if(!i.release&&!n){I&&b.warn(Bu);return}i.release=i.release||n,i.environment=i.environment||s,e.attrs=i}else{if(!e.release&&!n){I&&b.warn(Bu);return}e.release=e.release||n,e.environment=e.environment||s}this.emit("beforeSendSession",e);const r=zy(e,this._dsn,this._options._metadata,this._options.tunnel);this.sendEnvelope(r)}recordDroppedEvent(e,n,s=1){if(this._options.sendClientReports){const r=`${e}:${n}`;I&&b.log(`Recording outcome: "${r}"${s>1?` (${s} times)`:""}`),this._outcomes[r]=(this._outcomes[r]||0)+s}}on(e,n){const s=this._hooks[e]=this._hooks[e]||new Set,r=(...i)=>n(...i);return s.add(r),()=>{s.delete(r)}}emit(e,...n){const s=this._hooks[e];s&&s.forEach(r=>r(...n))}async sendEnvelope(e){if(this.emit("beforeEnvelope",e),this._isEnabled()&&this._transport)try{return await this._transport.send(e)}catch(n){return I&&b.error("Error while sending envelope:",n),{}}return I&&b.error("Transport disabled"),{}}_setupIntegrations(){const{integrations:e}=this._options;this._integrations=mE(this,e),Uu(this,e)}_updateSessionFromEvent(e,n){let s=n.level==="fatal",r=!1;const i=n.exception?.values;if(i){r=!0,s=!1;for(const c of i)if(c.mechanism?.handled===!1){s=!0;break}}const o=e.status==="ok";(o&&e.errors===0||o&&s)&&(rs(e,{...s&&{status:"crashed"},errors:e.errors||Number(r||s)}),this.captureSession(e))}async _isClientDoneProcessing(e){let n=0;for(;!e||n<e;){if(await new Promise(s=>setTimeout(s,1)),!this._numProcessing)return!0;n++}return!1}_isEnabled(){return this.getOptions().enabled!==!1&&this._transport!==void 0}_prepareEvent(e,n,s,r){const i=this.getOptions(),o=Object.keys(this._integrations);return!n.integrations&&o?.length&&(n.integrations=o),this.emit("preprocessEvent",e,n),e.type||r.setLastEventId(e.event_id||n.event_id),tE(i,e,n,s,this,r).then(a=>{if(a===null)return a;this.emit("postprocessEvent",a,n),a.contexts={trace:J_(s),...a.contexts};const c=Py(this,s);return a.sdkProcessingMetadata={dynamicSamplingContext:c,...a.sdkProcessingMetadata},a})}_captureEvent(e,n={},s=Zt(),r=kr()){return I&&Sa(e)&&b.log(`Captured error event \`${_f(e)[0]||"<unknown>"}\``),this._processEvent(e,n,s,r).then(i=>i.event_id,i=>{I&&(Vu(i)?b.log(i.message):Hu(i)?b.warn(i.message):b.warn(i))})}_processEvent(e,n,s,r){const i=this.getOptions(),{sampleRate:o}=i,a=vf(e),c=Sa(e),l=e.type||"error",u=`before send for type \`${l}\``,d=typeof o>"u"?void 0:Ey(o);if(c&&typeof d=="number"&&Math.random()>d)return this.recordDroppedEvent("sample_rate","error"),Ac(Wo(`Discarding event because it's not included in the random sample (sampling rate = ${o})`));const h=l==="replay_event"?"replay":l;return this._prepareEvent(e,n,s,r).then(f=>{if(f===null)throw this.recordDroppedEvent("event_processor",h),Wo("An event processor returned `null`, will not send event.");if(n.data&&n.data.__sentry__===!0)return f;const _=AE(this,i,f,n);return RE(_,u)}).then(f=>{if(f===null){if(this.recordDroppedEvent("before_send",h),a){const R=1+(e.spans||[]).length;this.recordDroppedEvent("before_send","span",R)}throw Wo(`${u} returned \`null\`, will not send event.`)}const p=s.getSession()||r.getSession();if(c&&p&&this._updateSessionFromEvent(p,f),a){const m=f.sdkProcessingMetadata?.spanCountBeforeProcessing||0,R=f.spans?f.spans.length:0,W=m-R;W>0&&this.recordDroppedEvent("before_send","span",W)}const _=f.transaction_info;if(a&&_&&f.transaction!==e.transaction){const m="custom";f.transaction_info={..._,source:m}}return this.sendEvent(f,n),f}).then(null,f=>{throw Vu(f)||Hu(f)?f:(this.captureException(f,{mechanism:{handled:!1,type:"internal"},data:{__sentry__:!0},originalException:f}),oi(`Event processing pipeline threw an error, original event will not be sent. Details have been sent as a new event.
Reason: ${f}`))})}_process(e){this._numProcessing++,e.then(n=>(this._numProcessing--,n),n=>(this._numProcessing--,n))}_clearOutcomes(){const e=this._outcomes;return this._outcomes={},Object.entries(e).map(([n,s])=>{const[r,i]=n.split(":");return{reason:r,category:i,quantity:s}})}_flushOutcomes(){I&&b.log("Flushing outcomes...");const e=this._clearOutcomes();if(e.length===0){I&&b.log("No outcomes to send");return}if(!this._dsn){I&&b.log("No dsn provided, will not send outcomes");return}I&&b.log("Sending outcomes:",e);const n=CE(e,this._options.tunnel&&Rr(this._dsn));this.sendEnvelope(n)}}function RE(t,e){const n=`${e} must return \`null\` or a valid event.`;if(Sr(t))return t.then(s=>{if(!or(s)&&s!==null)throw oi(n);return s},s=>{throw oi(`${e} rejected with ${s}`)});if(!or(t)&&t!==null)throw oi(n);return t}function AE(t,e,n,s){const{beforeSend:r,beforeSendTransaction:i,beforeSendSpan:o,ignoreSpans:a}=e;let c=n;if(Sa(c)&&r)return r(c,s);if(vf(c)){if(o||a){const l=SE(c);if(a?.length&&ku(l,a))return null;if(o){const u=o(l);u?c=Ir(n,TE(u)):Tu()}if(c.spans){const u=[],d=c.spans;for(const f of d){if(a?.length&&ku(f,a)){Ry(d,f);continue}if(o){const p=o(f);p?u.push(p):(Tu(),u.push(f))}else u.push(f)}const h=c.spans.length-u.length;h&&t.recordDroppedEvent("before_send","span",h),c.spans=u}}if(i){if(c.spans){const l=c.spans.length;c.sdkProcessingMetadata={...n.sdkProcessingMetadata,spanCountBeforeProcessing:l}}return i(c,s)}}return c}function Sa(t){return t.type===void 0}function vf(t){return t.type==="transaction"}function NE(t){let e=0;return t.name&&(e+=t.name.length*2),e+=8,e+wf(t.attributes)}function PE(t){let e=0;return t.message&&(e+=t.message.length*2),e+wf(t.attributes)}function wf(t){if(!t)return 0;let e=0;return Object.values(t).forEach(n=>{Array.isArray(n)?e+=n.length*ju(n[0]):no(n)?e+=ju(n):e+=100}),e}function ju(t){return typeof t=="string"?t.length*2:typeof t=="number"?8:typeof t=="boolean"?4:0}function LE(t,e){e.debug===!0&&(I?b.enable():ys(()=>{console.warn("[Sentry] Cannot initialize SDK with `debug` option using a non-debug bundle.")})),Zt().update(e.initialScope);const s=new t(e);return OE(s),s.init(),s}function OE(t){Zt().setClient(t)}const bf=Symbol.for("SentryBufferFullError");function Cf(t=100){const e=new Set;function n(){return e.size<t}function s(o){e.delete(o)}function r(o){if(!n())return Ac(bf);const a=o();return e.add(a),a.then(()=>s(a),()=>s(a)),a}function i(o){if(!e.size)return io(!0);const a=Promise.allSettled(Array.from(e)).then(()=>!0);if(!o)return a;const c=[a,new Promise(l=>setTimeout(()=>l(!1),o))];return Promise.race(c)}return{get $(){return Array.from(e)},add:r,drain:i}}const DE=60*1e3;function ME(t,e=Date.now()){const n=parseInt(`${t}`,10);if(!isNaN(n))return n*1e3;const s=Date.parse(`${t}`);return isNaN(s)?DE:s-e}function xE(t,e){return t[e]||t.all||0}function FE(t,e,n=Date.now()){return xE(t,e)>n}function UE(t,{statusCode:e,headers:n},s=Date.now()){const r={...t},i=n?.["x-sentry-rate-limits"],o=n?.["retry-after"];if(i)for(const a of i.trim().split(",")){const[c,l,,,u]=a.split(":",5),d=parseInt(c,10),h=(isNaN(d)?60:d)*1e3;if(!l)r.all=s+h;else for(const f of l.split(";"))f==="metric_bucket"?(!u||u.split(";").includes("custom"))&&(r[f]=s+h):r[f]=s+h}else o?r.all=s+ME(o,s):e===429&&(r.all=s+60*1e3);return r}const $E=64;function BE(t,e,n=Cf(t.bufferSize||$E)){let s={};const r=o=>n.drain(o);function i(o){const a=[];if(Ru(o,(d,h)=>{const f=Au(h);FE(s,f)?t.recordDroppedEvent("ratelimit_backoff",f):a.push(d)}),a.length===0)return Promise.resolve({});const c=vs(o[0],a),l=d=>{Ru(c,(h,f)=>{t.recordDroppedEvent(d,Au(f))})},u=()=>e({body:$y(c)}).then(d=>(d.statusCode!==void 0&&(d.statusCode<200||d.statusCode>=300)&&I&&b.warn(`Sentry responded with status code ${d.statusCode} to sent event.`),s=UE(s,d),d),d=>{throw l("network_error"),I&&b.error("Encountered error running transport request:",d),d});return n.add(u).then(d=>d,d=>{if(d===bf)return I&&b.error("Skipped sending event because buffer is full."),l("queue_overflow"),Promise.resolve({});throw d})}return{send:i,flush:r}}function jo(t){if(!t)return{};const e=t.match(/^(([^:/?#]+):)?(\/\/([^/?#]*))?([^?#]*)(\?([^#]*))?(#(.*))?$/);if(!e)return{};const n=e[6]||"",s=e[8]||"";return{host:e[4],path:e[5],protocol:e[2],search:n,hash:s,relative:e[5]+n+s}}function HE(t){"aggregates"in t?t.attrs?.ip_address===void 0&&(t.attrs={...t.attrs,ip_address:"{{auto}}"}):t.ipAddress===void 0&&(t.ipAddress="{{auto}}")}function VE(t,e,n=[e],s="npm"){const r=t._metadata||{};r.sdk||(r.sdk={name:`sentry.javascript.${e}`,packages:n.map(i=>({name:`${s}:@sentry/${i}`,version:mn})),version:mn}),t._metadata=r}const WE=100;function Cn(t,e){const n=be(),s=kr();if(!n)return;const{beforeBreadcrumb:r=null,maxBreadcrumbs:i=WE}=n.getOptions();if(i<=0)return;const a={timestamp:Tr(),...t},c=r?ys(()=>r(a,e)):a;c!==null&&(n.emit&&n.emit("beforeAddBreadcrumb",c,e),s.addBreadcrumb(c,i))}let zu;const jE="FunctionToString",qu=new WeakMap,zE=(()=>({name:jE,setupOnce(){zu=Function.prototype.toString;try{Function.prototype.toString=function(...t){const e=Tc(this),n=qu.has(be())&&e!==void 0?e:this;return zu.apply(n,t)}}catch{}},setup(t){qu.set(t,!0)}})),qE=zE,GE=[/^Script error\.?$/,/^Javascript error: Script error\.? on line 0$/,/^ResizeObserver loop completed with undelivered notifications.$/,/^Cannot redefine property: googletag$/,/^Can't find variable: gmo$/,/^undefined is not an object \(evaluating 'a\.[A-Z]'\)$/,`can't redefine non-configurable property "solana"`,"vv().getRestrictions is not a function. (In 'vv().getRestrictions(1,a)', 'vv().getRestrictions' is undefined)","Can't find variable: _AutofillCallbackHandler",/^Non-Error promise rejection captured with value: Object Not Found Matching Id:\d+, MethodName:simulateEvent, ParamCount:\d+$/,/^Java exception was raised during method invocation$/],YE="EventFilters",KE=(t={})=>{let e;return{name:YE,setup(n){const s=n.getOptions();e=Gu(t,s)},processEvent(n,s,r){if(!e){const i=r.getOptions();e=Gu(t,i)}return XE(n,e)?null:n}}},JE=((t={})=>({...KE(t),name:"InboundFilters"}));function Gu(t={},e={}){return{allowUrls:[...t.allowUrls||[],...e.allowUrls||[]],denyUrls:[...t.denyUrls||[],...e.denyUrls||[]],ignoreErrors:[...t.ignoreErrors||[],...e.ignoreErrors||[],...t.disableErrorDefaults?[]:GE],ignoreTransactions:[...t.ignoreTransactions||[],...e.ignoreTransactions||[]]}}function XE(t,e){if(t.type){if(t.type==="transaction"&&ZE(t,e.ignoreTransactions))return I&&b.warn(`Event dropped due to being matched by \`ignoreTransactions\` option.
Event: ${dn(t)}`),!0}else{if(QE(t,e.ignoreErrors))return I&&b.warn(`Event dropped due to being matched by \`ignoreErrors\` option.
Event: ${dn(t)}`),!0;if(sv(t))return I&&b.warn(`Event dropped due to not having an error message, error type or stacktrace.
Event: ${dn(t)}`),!0;if(ev(t,e.denyUrls))return I&&b.warn(`Event dropped due to being matched by \`denyUrls\` option.
Event: ${dn(t)}.
Url: ${yi(t)}`),!0;if(!tv(t,e.allowUrls))return I&&b.warn(`Event dropped due to not being matched by \`allowUrls\` option.
Event: ${dn(t)}.
Url: ${yi(t)}`),!0}return!1}function QE(t,e){return e?.length?_f(t).some(n=>ro(n,e)):!1}function ZE(t,e){if(!e?.length)return!1;const n=t.transaction;return n?ro(n,e):!1}function ev(t,e){if(!e?.length)return!1;const n=yi(t);return n?ro(n,e):!1}function tv(t,e){if(!e?.length)return!0;const n=yi(t);return n?ro(n,e):!0}function nv(t=[]){for(let e=t.length-1;e>=0;e--){const n=t[e];if(n&&n.filename!=="<anonymous>"&&n.filename!=="[native code]")return n.filename||null}return null}function yi(t){try{const n=[...t.exception?.values??[]].reverse().find(s=>s.mechanism?.parent_id===void 0&&s.stacktrace?.frames?.length)?.stacktrace?.frames;return n?nv(n):null}catch{return I&&b.error(`Cannot extract url for event ${dn(t)}`),null}}function sv(t){return t.exception?.values?.length?!t.message&&!t.exception.values.some(e=>e.stacktrace||e.type&&e.type!=="Error"||e.value):!1}function rv(t,e,n,s,r,i){if(!r.exception?.values||!i||!qt(i.originalException,Error))return;const o=r.exception.values.length>0?r.exception.values[r.exception.values.length-1]:void 0;o&&(r.exception.values=Ta(t,e,s,i.originalException,n,r.exception.values,o,0))}function Ta(t,e,n,s,r,i,o,a){if(i.length>=n+1)return i;let c=[...i];if(qt(s[r],Error)){Yu(o,a);const l=t(e,s[r]),u=c.length;Ku(l,r,u,a),c=Ta(t,e,n,s[r],r,[l,...c],l,u)}return Array.isArray(s.errors)&&s.errors.forEach((l,u)=>{if(qt(l,Error)){Yu(o,a);const d=t(e,l),h=c.length;Ku(d,`errors[${u}]`,h,a),c=Ta(t,e,n,l,r,[d,...c],d,h)}}),c}function Yu(t,e){t.mechanism={handled:!0,type:"auto.core.linked_errors",...t.mechanism,...t.type==="AggregateError"&&{is_exception_group:!0},exception_id:e}}function Ku(t,e,n,s){t.mechanism={handled:!0,...t.mechanism,type:"chained",source:e,exception_id:n,parent_id:s}}function iv(t){const e="console";On(e,t),Dn(e,ov)}function ov(){"console"in U&&h_.forEach(function(t){t in U.console&&Ne(U.console,t,function(e){return _i[t]=e,function(...n){qe("console",{args:n,level:t}),_i[t]?.apply(U.console,n)}})})}function av(t){return t==="warn"?"warning":["fatal","error","warning","log","info","debug"].includes(t)?t:"log"}const cv="Dedupe",lv=(()=>{let t;return{name:cv,processEvent(e){if(e.type)return e;try{if(dv(e,t))return I&&b.warn("Event dropped due to being a duplicate of previously captured event."),null}catch{}return t=e}}}),uv=lv;function dv(t,e){return e?!!(hv(t,e)||fv(t,e)):!1}function hv(t,e){const n=t.message,s=e.message;return!(!n&&!s||n&&!s||!n&&s||n!==s||!Tf(t,e)||!Sf(t,e))}function fv(t,e){const n=Ju(e),s=Ju(t);return!(!n||!s||n.type!==s.type||n.value!==s.value||!Tf(t,e)||!Sf(t,e))}function Sf(t,e){let n=lu(t),s=lu(e);if(!n&&!s)return!0;if(n&&!s||!n&&s||(n=n,s=s,s.length!==n.length))return!1;for(let r=0;r<s.length;r++){const i=s[r],o=n[r];if(i.filename!==o.filename||i.lineno!==o.lineno||i.colno!==o.colno||i.function!==o.function)return!1}return!0}function Tf(t,e){let n=t.fingerprint,s=e.fingerprint;if(!n&&!s)return!0;if(n&&!s||!n&&s)return!1;n=n,s=s;try{return n.join("")===s.join("")}catch{return!1}}function Ju(t){return t.exception?.values?.[0]}function If(t){if(t!==void 0)return t>=400&&t<500?"warning":t>=500?"error":void 0}const cr=U;function pv(){return"history"in cr&&!!cr.history}function gv(){if(!("fetch"in cr))return!1;try{return new Headers,new Request("data:,"),new Response,!0}catch{return!1}}function Ia(t){return t&&/^function\s+\w+\(\)\s+\{\s+\[native code\]\s+\}$/.test(t.toString())}function mv(){if(typeof EdgeRuntime=="string")return!0;if(!gv())return!1;if(Ia(cr.fetch))return!0;let t=!1;const e=cr.document;if(e&&typeof e.createElement=="function")try{const n=e.createElement("iframe");n.hidden=!0,e.head.appendChild(n),n.contentWindow?.fetch&&(t=Ia(n.contentWindow.fetch)),e.head.removeChild(n)}catch(n){I&&b.warn("Could not create sandbox iframe for pure fetch check, bailing to window.fetch: ",n)}return t}function _v(t,e){const n="fetch";On(n,t),Dn(n,()=>yv(void 0,e))}function yv(t,e=!1){e&&!mv()||Ne(U,"fetch",function(n){return function(...s){const r=new Error,{method:i,url:o}=Ev(s),a={args:s,fetchData:{method:i,url:o},startTimestamp:Et()*1e3,virtualError:r,headers:vv(s)};return qe("fetch",{...a}),n.apply(U,s).then(async c=>(qe("fetch",{...a,endTimestamp:Et()*1e3,response:c}),c),c=>{if(qe("fetch",{...a,endTimestamp:Et()*1e3,error:c}),wc(c)&&c.stack===void 0&&(c.stack=r.stack,bn(c,"framesToPop",1)),c instanceof TypeError&&(c.message==="Failed to fetch"||c.message==="Load failed"||c.message==="NetworkError when attempting to fetch resource."))try{const l=new URL(a.fetchData.url);c.message=`${c.message} (${l.host})`}catch{}throw c})}})}function ka(t,e){return!!t&&typeof t=="object"&&!!t[e]}function Xu(t){return typeof t=="string"?t:t?ka(t,"url")?t.url:t.toString?t.toString():"":""}function Ev(t){if(t.length===0)return{method:"GET",url:""};if(t.length===2){const[n,s]=t;return{url:Xu(n),method:ka(s,"method")?String(s.method).toUpperCase():"GET"}}const e=t[0];return{url:Xu(e),method:ka(e,"method")?String(e.method).toUpperCase():"GET"}}function vv(t){const[e,n]=t;try{if(typeof n=="object"&&n!==null&&"headers"in n&&n.headers)return new Headers(n.headers);if(A_(e))return new Headers(e.headers)}catch{}}function wv(){return"npm"}const ee=U;let Ra=0;function kf(){return Ra>0}function bv(){Ra++,setTimeout(()=>{Ra--})}function os(t,e={}){function n(r){return typeof r=="function"}if(!n(t))return t;try{const r=t.__sentry_wrapped__;if(r)return typeof r=="function"?r:t;if(Tc(t))return t}catch{return t}const s=function(...r){try{const i=r.map(o=>os(o,e));return t.apply(this,i)}catch(i){throw bv(),K_(o=>{o.addEventProcessor(a=>(e.mechanism&&(Ea(a,void 0),ss(a,e.mechanism)),a.extra={...a.extra,arguments:r},a)),cE(i)}),i}};try{for(const r in t)Object.prototype.hasOwnProperty.call(t,r)&&(s[r]=t[r])}catch{}Gh(s,t),bn(t,"__sentry_wrapped__",s);try{Object.getOwnPropertyDescriptor(s,"name").configurable&&Object.defineProperty(s,"name",{get(){return t.name}})}catch{}return s}function Cv(){const t=Sc(),{referrer:e}=ee.document||{},{userAgent:n}=ee.navigator||{},s={...e&&{Referer:e},...n&&{"User-Agent":n}};return{url:t,headers:s}}function Nc(t,e){const n=Pc(t,e),s={type:Rv(e),value:Av(e)};return n.length&&(s.stacktrace={frames:n}),s.type===void 0&&s.value===""&&(s.value="Unrecoverable error caught"),s}function Sv(t,e,n,s){const i=be()?.getOptions().normalizeDepth,o=Dv(e),a={__serialized__:af(e,i)};if(o)return{exception:{values:[Nc(t,o)]},extra:a};const c={exception:{values:[{type:so(e)?e.constructor.name:s?"UnhandledRejection":"Error",value:Lv(e,{isUnhandledRejection:s})}]},extra:a};if(n){const l=Pc(t,n);l.length&&(c.exception.values[0].stacktrace={frames:l})}return c}function zo(t,e){return{exception:{values:[Nc(t,e)]}}}function Pc(t,e){const n=e.stacktrace||e.stack||"",s=Iv(e),r=kv(e);try{return t(n,s,r)}catch{}return[]}const Tv=/Minified React error #\d+;/i;function Iv(t){return t&&Tv.test(t.message)?1:0}function kv(t){return typeof t.framesToPop=="number"?t.framesToPop:0}function Rf(t){return typeof WebAssembly<"u"&&typeof WebAssembly.Exception<"u"?t instanceof WebAssembly.Exception:!1}function Rv(t){const e=t?.name;return!e&&Rf(t)?t.message&&Array.isArray(t.message)&&t.message.length==2?t.message[0]:"WebAssembly.Exception":e}function Av(t){const e=t?.message;return Rf(t)?Array.isArray(t.message)&&t.message.length==2?t.message[1]:"wasm exception":e?e.error&&typeof e.error.message=="string"?e.error.message:e:"No error message"}function Nv(t,e,n,s){const r=n?.syntheticException||void 0,i=Lc(t,e,r,s);return ss(i),i.level="error",n?.event_id&&(i.event_id=n.event_id),io(i)}function Pv(t,e,n="info",s,r){const i=s?.syntheticException||void 0,o=Aa(t,e,i,r);return o.level=n,s?.event_id&&(o.event_id=s.event_id),io(o)}function Lc(t,e,n,s,r){let i;if(jh(e)&&e.error)return zo(t,e.error);if(du(e)||T_(e)){const o=e;if("stack"in e)i=zo(t,e);else{const a=o.name||(du(o)?"DOMError":"DOMException"),c=o.message?`${a}: ${o.message}`:a;i=Aa(t,c,n,s),Ea(i,c)}return"code"in o&&(i.tags={...i.tags,"DOMException.code":`${o.code}`}),i}return wc(e)?zo(t,e):or(e)||so(e)?(i=Sv(t,e,n,r),ss(i,{synthetic:!0}),i):(i=Aa(t,e,n,s),Ea(i,`${e}`),ss(i,{synthetic:!0}),i)}function Aa(t,e,n,s){const r={};if(s&&n){const i=Pc(t,n);i.length&&(r.exception={values:[{value:e,stacktrace:{frames:i}}]}),ss(r,{synthetic:!0})}if(bc(e)){const{__sentry_template_string__:i,__sentry_template_values__:o}=e;return r.logentry={message:i,params:o},r}return r.message=e,r}function Lv(t,{isUnhandledRejection:e}){const n=O_(t),s=e?"promise rejection":"exception";return jh(t)?`Event \`ErrorEvent\` captured as ${s} with message \`${t.message}\``:so(t)?`Event \`${Ov(t)}\` (type=${t.type}) captured as ${s}`:`Object captured as ${s} with keys: ${n}`}function Ov(t){try{const e=Object.getPrototypeOf(t);return e?e.constructor.name:void 0}catch{}}function Dv(t){for(const e in t)if(Object.prototype.hasOwnProperty.call(t,e)){const n=t[e];if(n instanceof Error)return n}}class Mv extends kE{constructor(e){const n=xv(e),s=ee.SENTRY_SDK_SOURCE||wv();VE(n,"browser",["browser"],s),n._metadata?.sdk&&(n._metadata.sdk.settings={infer_ip:n.sendDefaultPii?"auto":"never",...n._metadata.sdk.settings}),super(n);const{sendDefaultPii:r,sendClientReports:i,enableLogs:o,_experiments:a,enableMetrics:c}=this._options,l=c??a?.enableMetrics??!0;ee.document&&(i||o||l)&&ee.document.addEventListener("visibilitychange",()=>{ee.document.visibilityState==="hidden"&&(i&&this._flushOutcomes(),o&&ff(this),l&&gf(this))}),r&&this.on("beforeSendSession",HE)}eventFromException(e,n){return Nv(this._options.stackParser,e,n,this._options.attachStacktrace)}eventFromMessage(e,n="info",s){return Pv(this._options.stackParser,e,n,s,this._options.attachStacktrace)}_prepareEvent(e,n,s,r){return e.platform=e.platform||"javascript",super._prepareEvent(e,n,s,r)}}function xv(t){return{release:typeof __SENTRY_RELEASE__=="string"?__SENTRY_RELEASE__:ee.SENTRY_RELEASE?.id,sendClientReports:!0,parentSpanIsAlwaysRootSpan:!0,...t}}const Fv=typeof __SENTRY_DEBUG__>"u"||__SENTRY_DEBUG__,ye=U,Uv=1e3;let Qu,Na,Pa;function $v(t){On("dom",t),Dn("dom",Bv)}function Bv(){if(!ye.document)return;const t=qe.bind(null,"dom"),e=Zu(t,!0);ye.document.addEventListener("click",e,!1),ye.document.addEventListener("keypress",e,!1),["EventTarget","Node"].forEach(n=>{const r=ye[n]?.prototype;r?.hasOwnProperty?.("addEventListener")&&(Ne(r,"addEventListener",function(i){return function(o,a,c){if(o==="click"||o=="keypress")try{const l=this.__sentry_instrumentation_handlers__=this.__sentry_instrumentation_handlers__||{},u=l[o]=l[o]||{refCount:0};if(!u.handler){const d=Zu(t);u.handler=d,i.call(this,o,d,c)}u.refCount++}catch{}return i.call(this,o,a,c)}}),Ne(r,"removeEventListener",function(i){return function(o,a,c){if(o==="click"||o=="keypress")try{const l=this.__sentry_instrumentation_handlers__||{},u=l[o];u&&(u.refCount--,u.refCount<=0&&(i.call(this,o,u.handler,c),u.handler=void 0,delete l[o]),Object.keys(l).length===0&&delete this.__sentry_instrumentation_handlers__)}catch{}return i.call(this,o,a,c)}}))})}function Hv(t){if(t.type!==Na)return!1;try{if(!t.target||t.target._sentryId!==Pa)return!1}catch{}return!0}function Vv(t,e){return t!=="keypress"?!1:e?.tagName?!(e.tagName==="INPUT"||e.tagName==="TEXTAREA"||e.isContentEditable):!0}function Zu(t,e=!1){return n=>{if(!n||n._sentryCaptured)return;const s=Wv(n);if(Vv(n.type,s))return;bn(n,"_sentryCaptured",!0),s&&!s._sentryId&&bn(s,"_sentryId",De());const r=n.type==="keypress"?"input":n.type;Hv(n)||(t({event:n,name:r,global:e}),Na=n.type,Pa=s?s._sentryId:void 0),clearTimeout(Qu),Qu=ye.setTimeout(()=>{Pa=void 0,Na=void 0},Uv)}}function Wv(t){try{return t.target}catch{return null}}let Yr;function Af(t){const e="history";On(e,t),Dn(e,jv)}function jv(){if(ye.addEventListener("popstate",()=>{const e=ye.location.href,n=Yr;if(Yr=e,n===e)return;qe("history",{from:n,to:e})}),!pv())return;function t(e){return function(...n){const s=n.length>2?n[2]:void 0;if(s){const r=Yr,i=zv(String(s));if(Yr=i,r===i)return e.apply(this,n);qe("history",{from:r,to:i})}return e.apply(this,n)}}Ne(ye.history,"pushState",t),Ne(ye.history,"replaceState",t)}function zv(t){try{return new URL(t,ye.location.origin).toString()}catch{return t}}const ai={};function qv(t){const e=ai[t];if(e)return e;let n=ye[t];if(Ia(n))return ai[t]=n.bind(ye);const s=ye.document;if(s&&typeof s.createElement=="function")try{const r=s.createElement("iframe");r.hidden=!0,s.head.appendChild(r);const i=r.contentWindow;i?.[t]&&(n=i[t]),s.head.removeChild(r)}catch(r){Fv&&b.warn(`Could not create sandbox iframe for ${t} check, bailing to window.${t}: `,r)}return n&&(ai[t]=n.bind(ye))}function Gv(t){ai[t]=void 0}const js="__sentry_xhr_v3__";function Yv(t){On("xhr",t),Dn("xhr",Kv)}function Kv(){if(!ye.XMLHttpRequest)return;const t=XMLHttpRequest.prototype;t.open=new Proxy(t.open,{apply(e,n,s){const r=new Error,i=Et()*1e3,o=yt(s[0])?s[0].toUpperCase():void 0,a=Jv(s[1]);if(!o||!a)return e.apply(n,s);n[js]={method:o,url:a,request_headers:{}},o==="POST"&&a.match(/sentry_key/)&&(n.__sentry_own_request__=!0);const c=()=>{const l=n[js];if(l&&n.readyState===4){try{l.status_code=n.status}catch{}const u={endTimestamp:Et()*1e3,startTimestamp:i,xhr:n,virtualError:r};qe("xhr",u)}};return"onreadystatechange"in n&&typeof n.onreadystatechange=="function"?n.onreadystatechange=new Proxy(n.onreadystatechange,{apply(l,u,d){return c(),l.apply(u,d)}}):n.addEventListener("readystatechange",c),n.setRequestHeader=new Proxy(n.setRequestHeader,{apply(l,u,d){const[h,f]=d,p=u[js];return p&&yt(h)&&yt(f)&&(p.request_headers[h.toLowerCase()]=f),l.apply(u,d)}}),e.apply(n,s)}}),t.send=new Proxy(t.send,{apply(e,n,s){const r=n[js];if(!r)return e.apply(n,s);s[0]!==void 0&&(r.body=s[0]);const i={startTimestamp:Et()*1e3,xhr:n};return qe("xhr",i),e.apply(n,s)}})}function Jv(t){if(yt(t))return t;try{return t.toString()}catch{}}const Xv=40;function Qv(t,e=qv("fetch")){let n=0,s=0;async function r(i){const o=i.body.length;n+=o,s++;const a={body:i.body,method:"POST",referrerPolicy:"strict-origin",headers:t.headers,keepalive:n<=6e4&&s<15,...t.fetchOptions};try{const c=await e(t.url,a);return{statusCode:c.status,headers:{"x-sentry-rate-limits":c.headers.get("X-Sentry-Rate-Limits"),"retry-after":c.headers.get("Retry-After")}}}catch(c){throw Gv("fetch"),c}finally{n-=o,s--}}return BE(t,r,Cf(t.bufferSize||Xv))}const Zv=30,ew=50;function La(t,e,n,s){const r={filename:t,function:e==="<anonymous>"?wn:e,in_app:!0};return n!==void 0&&(r.lineno=n),s!==void 0&&(r.colno=s),r}const tw=/^\s*at (\S+?)(?::(\d+))(?::(\d+))\s*$/i,nw=/^\s*at (?:(.+?\)(?: \[.+\])?|.*?) ?\((?:address at )?)?(?:async )?((?:<anonymous>|[-a-z]+:|.*bundle|\/)?.*?)(?::(\d+))?(?::(\d+))?\)?\s*$/i,sw=/\((\S*)(?::(\d+))(?::(\d+))\)/,rw=/at (.+?) ?\(data:(.+?),/,iw=t=>{const e=t.match(rw);if(e)return{filename:`<data:${e[2]}>`,function:e[1]};const n=tw.exec(t);if(n){const[,r,i,o]=n;return La(r,wn,+i,+o)}const s=nw.exec(t);if(s){if(s[2]&&s[2].indexOf("eval")===0){const a=sw.exec(s[2]);a&&(s[2]=a[1],s[3]=a[2],s[4]=a[3])}const[i,o]=Nf(s[1]||wn,s[2]);return La(o,i,s[3]?+s[3]:void 0,s[4]?+s[4]:void 0)}},ow=[Zv,iw],aw=/^\s*(.*?)(?:\((.*?)\))?(?:^|@)?((?:[-a-z]+)?:\/.*?|\[native code\]|[^@]*(?:bundle|\d+\.js)|\/[\w\-. /=]+)(?::(\d+))?(?::(\d+))?\s*$/i,cw=/(\S+) line (\d+)(?: > eval line \d+)* > eval/i,lw=t=>{const e=aw.exec(t);if(e){if(e[3]&&e[3].indexOf(" > eval")>-1){const i=cw.exec(e[3]);i&&(e[1]=e[1]||"eval",e[3]=i[1],e[4]=i[2],e[5]="")}let s=e[3],r=e[1]||wn;return[r,s]=Nf(r,s),La(s,r,e[4]?+e[4]:void 0,e[5]?+e[5]:void 0)}},uw=[ew,lw],dw=[ow,uw],hw=Hh(...dw),Nf=(t,e)=>{const n=t.indexOf("safari-extension")!==-1,s=t.indexOf("safari-web-extension")!==-1;return n||s?[t.indexOf("@")!==-1?t.split("@")[0]:wn,n?`safari-extension:${e}`:`safari-web-extension:${e}`]:[t,e]},oo=typeof __SENTRY_DEBUG__>"u"||__SENTRY_DEBUG__,Kr=1024,fw="Breadcrumbs",pw=((t={})=>{const e={console:!0,dom:!0,fetch:!0,history:!0,sentry:!0,xhr:!0,...t};return{name:fw,setup(n){e.console&&iv(yw(n)),e.dom&&$v(_w(n,e.dom)),e.xhr&&Yv(Ew(n)),e.fetch&&_v(vw(n)),e.history&&Af(ww(n)),e.sentry&&n.on("beforeSendEvent",mw(n))}}}),gw=pw;function mw(t){return function(n){be()===t&&Cn({category:`sentry.${n.type==="transaction"?"transaction":"event"}`,event_id:n.event_id,level:n.level,message:dn(n)},{event:n})}}function _w(t,e){return function(s){if(be()!==t)return;let r,i,o=typeof e=="object"?e.serializeAttribute:void 0,a=typeof e=="object"&&typeof e.maxStringLength=="number"?e.maxStringLength:void 0;a&&a>Kr&&(oo&&b.warn(`\`dom.maxStringLength\` cannot exceed ${Kr}, but a value of ${a} was configured. Sentry will use ${Kr} instead.`),a=Kr),typeof o=="string"&&(o=[o]);try{const l=s.event,u=bw(l)?l.target:l;r=qh(u,{keyAttrs:o,maxStringLength:a}),i=L_(u)}catch{r="<unknown>"}if(r.length===0)return;const c={category:`ui.${s.name}`,message:r};i&&(c.data={"ui.component_name":i}),Cn(c,{event:s.event,name:s.name,global:s.global})}}function yw(t){return function(n){if(be()!==t)return;const s={category:"console",data:{arguments:n.args,logger:"console"},level:av(n.level),message:pu(n.args," ")};if(n.level==="assert")if(n.args[0]===!1)s.message=`Assertion failed: ${pu(n.args.slice(1)," ")||"console.assert"}`,s.data.arguments=n.args.slice(1);else return;Cn(s,{input:n.args,level:n.level})}}function Ew(t){return function(n){if(be()!==t)return;const{startTimestamp:s,endTimestamp:r}=n,i=n.xhr[js];if(!s||!r||!i)return;const{method:o,url:a,status_code:c,body:l}=i,u={method:o,url:a,status_code:c},d={xhr:n.xhr,input:l,startTimestamp:s,endTimestamp:r},h={category:"xhr",data:u,type:"http",level:If(c)};t.emit("beforeOutgoingRequestBreadcrumb",h,d),Cn(h,d)}}function vw(t){return function(n){if(be()!==t)return;const{startTimestamp:s,endTimestamp:r}=n;if(r&&!(n.fetchData.url.match(/sentry_key/)&&n.fetchData.method==="POST"))if(n.fetchData.method,n.fetchData.url,n.error){const i=n.fetchData,o={data:n.error,input:n.args,startTimestamp:s,endTimestamp:r},a={category:"fetch",data:i,level:"error",type:"http"};t.emit("beforeOutgoingRequestBreadcrumb",a,o),Cn(a,o)}else{const i=n.response,o={...n.fetchData,status_code:i?.status};n.fetchData.request_body_size,n.fetchData.response_body_size,i?.status;const a={input:n.args,response:i,startTimestamp:s,endTimestamp:r},c={category:"fetch",data:o,type:"http",level:If(o.status_code)};t.emit("beforeOutgoingRequestBreadcrumb",c,a),Cn(c,a)}}}function ww(t){return function(n){if(be()!==t)return;let s=n.from,r=n.to;const i=jo(ee.location.href);let o=s?jo(s):void 0;const a=jo(r);o?.path||(o=i),i.protocol===a.protocol&&i.host===a.host&&(r=a.relative),i.protocol===o.protocol&&i.host===o.host&&(s=o.relative),Cn({category:"navigation",data:{from:s,to:r}})}}function bw(t){return!!t&&!!t.target}const Cw=["EventTarget","Window","Node","ApplicationCache","AudioTrackList","BroadcastChannel","ChannelMergerNode","CryptoOperation","EventSource","FileReader","HTMLUnknownElement","IDBDatabase","IDBRequest","IDBTransaction","KeyOperation","MediaController","MessagePort","ModalWindow","Notification","SVGElementInstance","Screen","SharedWorker","TextTrack","TextTrackCue","TextTrackList","WebSocket","WebSocketWorker","Worker","XMLHttpRequest","XMLHttpRequestEventTarget","XMLHttpRequestUpload"],Sw="BrowserApiErrors",Tw=((t={})=>{const e={XMLHttpRequest:!0,eventTarget:!0,requestAnimationFrame:!0,setInterval:!0,setTimeout:!0,unregisterOriginalCallbacks:!1,...t};return{name:Sw,setupOnce(){e.setTimeout&&Ne(ee,"setTimeout",ed),e.setInterval&&Ne(ee,"setInterval",ed),e.requestAnimationFrame&&Ne(ee,"requestAnimationFrame",kw),e.XMLHttpRequest&&"XMLHttpRequest"in ee&&Ne(XMLHttpRequest.prototype,"send",Rw);const n=e.eventTarget;n&&(Array.isArray(n)?n:Cw).forEach(r=>Aw(r,e))}}}),Iw=Tw;function ed(t){return function(...e){const n=e[0];return e[0]=os(n,{mechanism:{handled:!1,type:`auto.browser.browserapierrors.${zt(t)}`}}),t.apply(this,e)}}function kw(t){return function(e){return t.apply(this,[os(e,{mechanism:{data:{handler:zt(t)},handled:!1,type:"auto.browser.browserapierrors.requestAnimationFrame"}})])}}function Rw(t){return function(...e){const n=this;return["onload","onerror","onprogress","onreadystatechange"].forEach(r=>{r in n&&typeof n[r]=="function"&&Ne(n,r,function(i){const o={mechanism:{data:{handler:zt(i)},handled:!1,type:`auto.browser.browserapierrors.xhr.${r}`}},a=Tc(i);return a&&(o.mechanism.data.handler=zt(a)),os(i,o)})}),t.apply(this,e)}}function Aw(t,e){const s=ee[t]?.prototype;s?.hasOwnProperty?.("addEventListener")&&(Ne(s,"addEventListener",function(r){return function(i,o,a){try{Nw(o)&&(o.handleEvent=os(o.handleEvent,{mechanism:{data:{handler:zt(o),target:t},handled:!1,type:"auto.browser.browserapierrors.handleEvent"}}))}catch{}return e.unregisterOriginalCallbacks&&Pw(this,i,o),r.apply(this,[i,os(o,{mechanism:{data:{handler:zt(o),target:t},handled:!1,type:"auto.browser.browserapierrors.addEventListener"}}),a])}}),Ne(s,"removeEventListener",function(r){return function(i,o,a){try{const c=o.__sentry_wrapped__;c&&r.call(this,i,c,a)}catch{}return r.call(this,i,o,a)}}))}function Nw(t){return typeof t.handleEvent=="function"}function Pw(t,e,n){t&&typeof t=="object"&&"removeEventListener"in t&&typeof t.removeEventListener=="function"&&t.removeEventListener(e,n)}const Lw=()=>({name:"BrowserSession",setupOnce(){if(typeof ee.document>"u"){oo&&b.warn("Using the `browserSessionIntegration` in non-browser environments is not supported.");return}Mu({ignoreDuration:!0}),xu(),Af(({from:t,to:e})=>{t!==void 0&&t!==e&&(Mu({ignoreDuration:!0}),xu())})}}),Ow="GlobalHandlers",Dw=((t={})=>{const e={onerror:!0,onunhandledrejection:!0,...t};return{name:Ow,setupOnce(){Error.stackTraceLimit=50},setup(n){e.onerror&&(xw(n),td("onerror")),e.onunhandledrejection&&(Fw(n),td("onunhandledrejection"))}}}),Mw=Dw;function xw(t){w_(e=>{const{stackParser:n,attachStacktrace:s}=Pf();if(be()!==t||kf())return;const{msg:r,url:i,line:o,column:a,error:c}=e,l=Bw(Lc(n,c||r,void 0,s,!1),i,o,a);l.level="error",lf(l,{originalException:c,mechanism:{handled:!1,type:"auto.browser.global_handlers.onerror"}})})}function Fw(t){C_(e=>{const{stackParser:n,attachStacktrace:s}=Pf();if(be()!==t||kf())return;const r=Uw(e),i=no(r)?$w(r):Lc(n,r,void 0,s,!0);i.level="error",lf(i,{originalException:r,mechanism:{handled:!1,type:"auto.browser.global_handlers.onunhandledrejection"}})})}function Uw(t){if(no(t))return t;try{if("reason"in t)return t.reason;if("detail"in t&&"reason"in t.detail)return t.detail.reason}catch{}return t}function $w(t){return{exception:{values:[{type:"UnhandledRejection",value:`Non-Error promise rejection captured with value: ${String(t)}`}]}}}function Bw(t,e,n,s){const r=t.exception=t.exception||{},i=r.values=r.values||[],o=i[0]=i[0]||{},a=o.stacktrace=o.stacktrace||{},c=a.frames=a.frames||[],l=s,u=n,d=Hw(e)??Sc();return c.length===0&&c.push({colno:l,filename:d,function:wn,in_app:!0,lineno:u}),t}function td(t){oo&&b.log(`Global Handler attached: ${t}`)}function Pf(){return be()?.getOptions()||{stackParser:()=>[],attachStacktrace:!1}}function Hw(t){if(!(!yt(t)||t.length===0)){if(t.startsWith("data:")){const e=t.match(/^data:([^;]+)/),n=e?e[1]:"text/javascript",s=t.includes("base64,");return`<data:${n}${s?",base64":""}>`}return t}}const Vw=()=>({name:"HttpContext",preprocessEvent(t){if(!ee.navigator&&!ee.location&&!ee.document)return;const e=Cv(),n={...e.headers,...t.request?.headers};t.request={...e,...t.request,headers:n}}}),Ww="cause",jw=5,zw="LinkedErrors",qw=((t={})=>{const e=t.limit||jw,n=t.key||Ww;return{name:zw,preprocessEvent(s,r,i){const o=i.getOptions();rv(Nc,o.stackParser,n,e,s,r)}}}),Gw=qw;function Yw(){return Kw()?(oo&&ys(()=>{console.error("[Sentry] You cannot use Sentry.init() in a browser extension, see: https://docs.sentry.io/platforms/javascript/best-practices/browser-extensions/")}),!0):!1}function Kw(){if(typeof ee.window>"u")return!1;const t=ee;if(t.nw||!(t.chrome||t.browser)?.runtime?.id)return!1;const n=Sc(),s=["chrome-extension","moz-extension","ms-browser-extension","safari-web-extension"];return!(ee===ee.top&&s.some(i=>n.startsWith(`${i}://`)))}function Jw(t){return[JE(),qE(),Iw(),gw(),Mw(),Gw(),uv(),Vw(),Lw()]}function Xw(t={}){const e=!t.skipBrowserExtensionCheck&&Yw();let n=t.defaultIntegrations==null?Jw():t.defaultIntegrations;const s={...t,enabled:e?!1:t.enabled,stackParser:E_(t.stackParser||hw),integrations:gE({integrations:t.integrations,defaultIntegrations:n}),transport:t.transport||Qv};return LE(Mv,s)}const Qw="https://adc1b5518c6a55273a1398d1b8b9cd3e@o4510415124496384.ingest.de.sentry.io/4510415129083984";Xw({dsn:Qw,sendDefaultPii:!0});/**
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
 */const Zw=()=>{};var nd={};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Lf={NODE_ADMIN:!1,SDK_VERSION:"${JSCORE_VERSION}"};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const g=function(t,e){if(!t)throw ws(e)},ws=function(t){return new Error("Firebase Database ("+Lf.SDK_VERSION+") INTERNAL ASSERT FAILED: "+t)};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Of=function(t){const e=[];let n=0;for(let s=0;s<t.length;s++){let r=t.charCodeAt(s);r<128?e[n++]=r:r<2048?(e[n++]=r>>6|192,e[n++]=r&63|128):(r&64512)===55296&&s+1<t.length&&(t.charCodeAt(s+1)&64512)===56320?(r=65536+((r&1023)<<10)+(t.charCodeAt(++s)&1023),e[n++]=r>>18|240,e[n++]=r>>12&63|128,e[n++]=r>>6&63|128,e[n++]=r&63|128):(e[n++]=r>>12|224,e[n++]=r>>6&63|128,e[n++]=r&63|128)}return e},eb=function(t){const e=[];let n=0,s=0;for(;n<t.length;){const r=t[n++];if(r<128)e[s++]=String.fromCharCode(r);else if(r>191&&r<224){const i=t[n++];e[s++]=String.fromCharCode((r&31)<<6|i&63)}else if(r>239&&r<365){const i=t[n++],o=t[n++],a=t[n++],c=((r&7)<<18|(i&63)<<12|(o&63)<<6|a&63)-65536;e[s++]=String.fromCharCode(55296+(c>>10)),e[s++]=String.fromCharCode(56320+(c&1023))}else{const i=t[n++],o=t[n++];e[s++]=String.fromCharCode((r&15)<<12|(i&63)<<6|o&63)}}return e.join("")},ao={byteToCharMap_:null,charToByteMap_:null,byteToCharMapWebSafe_:null,charToByteMapWebSafe_:null,ENCODED_VALS_BASE:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",get ENCODED_VALS(){return this.ENCODED_VALS_BASE+"+/="},get ENCODED_VALS_WEBSAFE(){return this.ENCODED_VALS_BASE+"-_."},HAS_NATIVE_SUPPORT:typeof atob=="function",encodeByteArray(t,e){if(!Array.isArray(t))throw Error("encodeByteArray takes an array as a parameter");this.init_();const n=e?this.byteToCharMapWebSafe_:this.byteToCharMap_,s=[];for(let r=0;r<t.length;r+=3){const i=t[r],o=r+1<t.length,a=o?t[r+1]:0,c=r+2<t.length,l=c?t[r+2]:0,u=i>>2,d=(i&3)<<4|a>>4;let h=(a&15)<<2|l>>6,f=l&63;c||(f=64,o||(h=64)),s.push(n[u],n[d],n[h],n[f])}return s.join("")},encodeString(t,e){return this.HAS_NATIVE_SUPPORT&&!e?btoa(t):this.encodeByteArray(Of(t),e)},decodeString(t,e){return this.HAS_NATIVE_SUPPORT&&!e?atob(t):eb(this.decodeStringToByteArray(t,e))},decodeStringToByteArray(t,e){this.init_();const n=e?this.charToByteMapWebSafe_:this.charToByteMap_,s=[];for(let r=0;r<t.length;){const i=n[t.charAt(r++)],a=r<t.length?n[t.charAt(r)]:0;++r;const l=r<t.length?n[t.charAt(r)]:64;++r;const d=r<t.length?n[t.charAt(r)]:64;if(++r,i==null||a==null||l==null||d==null)throw new tb;const h=i<<2|a>>4;if(s.push(h),l!==64){const f=a<<4&240|l>>2;if(s.push(f),d!==64){const p=l<<6&192|d;s.push(p)}}}return s},init_(){if(!this.byteToCharMap_){this.byteToCharMap_={},this.charToByteMap_={},this.byteToCharMapWebSafe_={},this.charToByteMapWebSafe_={};for(let t=0;t<this.ENCODED_VALS.length;t++)this.byteToCharMap_[t]=this.ENCODED_VALS.charAt(t),this.charToByteMap_[this.byteToCharMap_[t]]=t,this.byteToCharMapWebSafe_[t]=this.ENCODED_VALS_WEBSAFE.charAt(t),this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[t]]=t,t>=this.ENCODED_VALS_BASE.length&&(this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(t)]=t,this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(t)]=t)}}};class tb extends Error{constructor(){super(...arguments),this.name="DecodeBase64StringError"}}const Df=function(t){const e=Of(t);return ao.encodeByteArray(e,!0)},Ei=function(t){return Df(t).replace(/\./g,"")},vi=function(t){try{return ao.decodeString(t,!0)}catch(e){console.error("base64Decode failed: ",e)}return null};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function nb(t){return Mf(void 0,t)}function Mf(t,e){if(!(e instanceof Object))return e;switch(e.constructor){case Date:const n=e;return new Date(n.getTime());case Object:t===void 0&&(t={});break;case Array:t=[];break;default:return e}for(const n in e)!e.hasOwnProperty(n)||!sb(n)||(t[n]=Mf(t[n],e[n]));return t}function sb(t){return t!=="__proto__"}/**
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
 */function xf(){if(typeof self<"u")return self;if(typeof window<"u")return window;if(typeof global<"u")return global;throw new Error("Unable to locate global object.")}/**
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
 */const rb=()=>xf().__FIREBASE_DEFAULTS__,ib=()=>{if(typeof process>"u"||typeof nd>"u")return;const t=nd.__FIREBASE_DEFAULTS__;if(t)return JSON.parse(t)},ob=()=>{if(typeof document>"u")return;let t;try{t=document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/)}catch{return}const e=t&&vi(t[1]);return e&&JSON.parse(e)},Oc=()=>{try{return Zw()||rb()||ib()||ob()}catch(t){console.info(`Unable to get __FIREBASE_DEFAULTS__ due to: ${t}`);return}},Ff=t=>Oc()?.emulatorHosts?.[t],ab=t=>{const e=Ff(t);if(!e)return;const n=e.lastIndexOf(":");if(n<=0||n+1===e.length)throw new Error(`Invalid host ${e} with no separate hostname and port!`);const s=parseInt(e.substring(n+1),10);return e[0]==="["?[e.substring(1,n-1),s]:[e.substring(0,n),s]},Uf=()=>Oc()?.config,$f=t=>Oc()?.[`_${t}`];/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ce{constructor(){this.reject=()=>{},this.resolve=()=>{},this.promise=new Promise((e,n)=>{this.resolve=e,this.reject=n})}wrapCallback(e){return(n,s)=>{n?this.reject(n):this.resolve(s),typeof e=="function"&&(this.promise.catch(()=>{}),e.length===1?e(n):e(n,s))}}}/**
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
 */function bs(t){try{return(t.startsWith("http://")||t.startsWith("https://")?new URL(t).hostname:t).endsWith(".cloudworkstations.dev")}catch{return!1}}async function Bf(t){return(await fetch(t,{credentials:"include"})).ok}/**
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
 */function cb(t,e){if(t.uid)throw new Error('The "uid" field is no longer supported by mockUserToken. Please use "sub" instead for Firebase Auth User ID.');const n={alg:"none",type:"JWT"},s=e||"demo-project",r=t.iat||0,i=t.sub||t.user_id;if(!i)throw new Error("mockUserToken must contain 'sub' or 'user_id' field!");const o={iss:`https://securetoken.google.com/${s}`,aud:s,iat:r,exp:r+3600,auth_time:r,sub:i,user_id:i,firebase:{sign_in_provider:"custom",identities:{}},...t};return[Ei(JSON.stringify(n)),Ei(JSON.stringify(o)),""].join(".")}const Gs={};function lb(){const t={prod:[],emulator:[]};for(const e of Object.keys(Gs))Gs[e]?t.emulator.push(e):t.prod.push(e);return t}function ub(t){let e=document.getElementById(t),n=!1;return e||(e=document.createElement("div"),e.setAttribute("id",t),n=!0),{created:n,element:e}}let sd=!1;function Hf(t,e){if(typeof window>"u"||typeof document>"u"||!bs(window.location.host)||Gs[t]===e||Gs[t]||sd)return;Gs[t]=e;function n(h){return`__firebase__banner__${h}`}const s="__firebase__banner",i=lb().prod.length>0;function o(){const h=document.getElementById(s);h&&h.remove()}function a(h){h.style.display="flex",h.style.background="#7faaf0",h.style.position="fixed",h.style.bottom="5px",h.style.left="5px",h.style.padding=".5em",h.style.borderRadius="5px",h.style.alignItems="center"}function c(h,f){h.setAttribute("width","24"),h.setAttribute("id",f),h.setAttribute("height","24"),h.setAttribute("viewBox","0 0 24 24"),h.setAttribute("fill","none"),h.style.marginLeft="-6px"}function l(){const h=document.createElement("span");return h.style.cursor="pointer",h.style.marginLeft="16px",h.style.fontSize="24px",h.innerHTML=" &times;",h.onclick=()=>{sd=!0,o()},h}function u(h,f){h.setAttribute("id",f),h.innerText="Learn more",h.href="https://firebase.google.com/docs/studio/preview-apps#preview-backend",h.setAttribute("target","__blank"),h.style.paddingLeft="5px",h.style.textDecoration="underline"}function d(){const h=ub(s),f=n("text"),p=document.getElementById(f)||document.createElement("span"),_=n("learnmore"),m=document.getElementById(_)||document.createElement("a"),R=n("preprendIcon"),W=document.getElementById(R)||document.createElementNS("http://www.w3.org/2000/svg","svg");if(h.created){const j=h.element;a(j),u(m,_);const v=l();c(W,R),j.append(W,p,m,v),document.body.appendChild(j)}i?(p.innerText="Preview backend disconnected.",W.innerHTML=`<g clip-path="url(#clip0_6013_33858)">
<path d="M4.8 17.6L12 5.6L19.2 17.6H4.8ZM6.91667 16.4H17.0833L12 7.93333L6.91667 16.4ZM12 15.6C12.1667 15.6 12.3056 15.5444 12.4167 15.4333C12.5389 15.3111 12.6 15.1667 12.6 15C12.6 14.8333 12.5389 14.6944 12.4167 14.5833C12.3056 14.4611 12.1667 14.4 12 14.4C11.8333 14.4 11.6889 14.4611 11.5667 14.5833C11.4556 14.6944 11.4 14.8333 11.4 15C11.4 15.1667 11.4556 15.3111 11.5667 15.4333C11.6889 15.5444 11.8333 15.6 12 15.6ZM11.4 13.6H12.6V10.4H11.4V13.6Z" fill="#212121"/>
</g>
<defs>
<clipPath id="clip0_6013_33858">
<rect width="24" height="24" fill="white"/>
</clipPath>
</defs>`):(W.innerHTML=`<g clip-path="url(#clip0_6083_34804)">
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
 */function we(){return typeof navigator<"u"&&typeof navigator.userAgent=="string"?navigator.userAgent:""}function Dc(){return typeof window<"u"&&!!(window.cordova||window.phonegap||window.PhoneGap)&&/ios|iphone|ipod|ipad|android|blackberry|iemobile/i.test(we())}function db(){return typeof navigator<"u"&&navigator.userAgent==="Cloudflare-Workers"}function hb(){const t=typeof chrome=="object"?chrome.runtime:typeof browser=="object"?browser.runtime:void 0;return typeof t=="object"&&t.id!==void 0}function Vf(){return typeof navigator=="object"&&navigator.product==="ReactNative"}function fb(){const t=we();return t.indexOf("MSIE ")>=0||t.indexOf("Trident/")>=0}function pb(){return Lf.NODE_ADMIN===!0}function Mc(){try{return typeof indexedDB=="object"}catch{return!1}}function gb(){return new Promise((t,e)=>{try{let n=!0;const s="validate-browser-context-for-indexeddb-analytics-module",r=self.indexedDB.open(s);r.onsuccess=()=>{r.result.close(),n||self.indexedDB.deleteDatabase(s),t(!0)},r.onupgradeneeded=()=>{n=!1},r.onerror=()=>{e(r.error?.message||"")}}catch(n){e(n)}})}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const mb="FirebaseError";class en extends Error{constructor(e,n,s){super(n),this.code=e,this.customData=s,this.name=mb,Object.setPrototypeOf(this,en.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,Cs.prototype.create)}}class Cs{constructor(e,n,s){this.service=e,this.serviceName=n,this.errors=s}create(e,...n){const s=n[0]||{},r=`${this.service}/${e}`,i=this.errors[e],o=i?_b(i,s):"Error",a=`${this.serviceName}: ${o} (${r}).`;return new en(r,a,s)}}function _b(t,e){return t.replace(yb,(n,s)=>{const r=e[s];return r!=null?String(r):`<${s}?>`})}const yb=/\{\$([^}]+)}/g;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function lr(t){return JSON.parse(t)}function se(t){return JSON.stringify(t)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Wf=function(t){let e={},n={},s={},r="";try{const i=t.split(".");e=lr(vi(i[0])||""),n=lr(vi(i[1])||""),r=i[2],s=n.d||{},delete n.d}catch{}return{header:e,claims:n,data:s,signature:r}},Eb=function(t){const e=Wf(t),n=e.claims;return!!n&&typeof n=="object"&&n.hasOwnProperty("iat")},vb=function(t){const e=Wf(t).claims;return typeof e=="object"&&e.admin===!0};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function lt(t,e){return Object.prototype.hasOwnProperty.call(t,e)}function as(t,e){if(Object.prototype.hasOwnProperty.call(t,e))return t[e]}function wi(t){for(const e in t)if(Object.prototype.hasOwnProperty.call(t,e))return!1;return!0}function bi(t,e,n){const s={};for(const r in t)Object.prototype.hasOwnProperty.call(t,r)&&(s[r]=e.call(n,t[r],r,t));return s}function Sn(t,e){if(t===e)return!0;const n=Object.keys(t),s=Object.keys(e);for(const r of n){if(!s.includes(r))return!1;const i=t[r],o=e[r];if(rd(i)&&rd(o)){if(!Sn(i,o))return!1}else if(i!==o)return!1}for(const r of s)if(!n.includes(r))return!1;return!0}function rd(t){return t!==null&&typeof t=="object"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ss(t){const e=[];for(const[n,s]of Object.entries(t))Array.isArray(s)?s.forEach(r=>{e.push(encodeURIComponent(n)+"="+encodeURIComponent(r))}):e.push(encodeURIComponent(n)+"="+encodeURIComponent(s));return e.length?"&"+e.join("&"):""}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class wb{constructor(){this.chain_=[],this.buf_=[],this.W_=[],this.pad_=[],this.inbuf_=0,this.total_=0,this.blockSize=512/8,this.pad_[0]=128;for(let e=1;e<this.blockSize;++e)this.pad_[e]=0;this.reset()}reset(){this.chain_[0]=1732584193,this.chain_[1]=4023233417,this.chain_[2]=2562383102,this.chain_[3]=271733878,this.chain_[4]=3285377520,this.inbuf_=0,this.total_=0}compress_(e,n){n||(n=0);const s=this.W_;if(typeof e=="string")for(let d=0;d<16;d++)s[d]=e.charCodeAt(n)<<24|e.charCodeAt(n+1)<<16|e.charCodeAt(n+2)<<8|e.charCodeAt(n+3),n+=4;else for(let d=0;d<16;d++)s[d]=e[n]<<24|e[n+1]<<16|e[n+2]<<8|e[n+3],n+=4;for(let d=16;d<80;d++){const h=s[d-3]^s[d-8]^s[d-14]^s[d-16];s[d]=(h<<1|h>>>31)&4294967295}let r=this.chain_[0],i=this.chain_[1],o=this.chain_[2],a=this.chain_[3],c=this.chain_[4],l,u;for(let d=0;d<80;d++){d<40?d<20?(l=a^i&(o^a),u=1518500249):(l=i^o^a,u=1859775393):d<60?(l=i&o|a&(i|o),u=2400959708):(l=i^o^a,u=3395469782);const h=(r<<5|r>>>27)+l+c+u+s[d]&4294967295;c=a,a=o,o=(i<<30|i>>>2)&4294967295,i=r,r=h}this.chain_[0]=this.chain_[0]+r&4294967295,this.chain_[1]=this.chain_[1]+i&4294967295,this.chain_[2]=this.chain_[2]+o&4294967295,this.chain_[3]=this.chain_[3]+a&4294967295,this.chain_[4]=this.chain_[4]+c&4294967295}update(e,n){if(e==null)return;n===void 0&&(n=e.length);const s=n-this.blockSize;let r=0;const i=this.buf_;let o=this.inbuf_;for(;r<n;){if(o===0)for(;r<=s;)this.compress_(e,r),r+=this.blockSize;if(typeof e=="string"){for(;r<n;)if(i[o]=e.charCodeAt(r),++o,++r,o===this.blockSize){this.compress_(i),o=0;break}}else for(;r<n;)if(i[o]=e[r],++o,++r,o===this.blockSize){this.compress_(i),o=0;break}}this.inbuf_=o,this.total_+=n}digest(){const e=[];let n=this.total_*8;this.inbuf_<56?this.update(this.pad_,56-this.inbuf_):this.update(this.pad_,this.blockSize-(this.inbuf_-56));for(let r=this.blockSize-1;r>=56;r--)this.buf_[r]=n&255,n/=256;this.compress_(this.buf_);let s=0;for(let r=0;r<5;r++)for(let i=24;i>=0;i-=8)e[s]=this.chain_[r]>>i&255,++s;return e}}function bb(t,e){const n=new Cb(t,e);return n.subscribe.bind(n)}class Cb{constructor(e,n){this.observers=[],this.unsubscribes=[],this.observerCount=0,this.task=Promise.resolve(),this.finalized=!1,this.onNoObservers=n,this.task.then(()=>{e(this)}).catch(s=>{this.error(s)})}next(e){this.forEachObserver(n=>{n.next(e)})}error(e){this.forEachObserver(n=>{n.error(e)}),this.close(e)}complete(){this.forEachObserver(e=>{e.complete()}),this.close()}subscribe(e,n,s){let r;if(e===void 0&&n===void 0&&s===void 0)throw new Error("Missing Observer.");Sb(e,["next","error","complete"])?r=e:r={next:e,error:n,complete:s},r.next===void 0&&(r.next=qo),r.error===void 0&&(r.error=qo),r.complete===void 0&&(r.complete=qo);const i=this.unsubscribeOne.bind(this,this.observers.length);return this.finalized&&this.task.then(()=>{try{this.finalError?r.error(this.finalError):r.complete()}catch{}}),this.observers.push(r),i}unsubscribeOne(e){this.observers===void 0||this.observers[e]===void 0||(delete this.observers[e],this.observerCount-=1,this.observerCount===0&&this.onNoObservers!==void 0&&this.onNoObservers(this))}forEachObserver(e){if(!this.finalized)for(let n=0;n<this.observers.length;n++)this.sendOne(n,e)}sendOne(e,n){this.task.then(()=>{if(this.observers!==void 0&&this.observers[e]!==void 0)try{n(this.observers[e])}catch(s){typeof console<"u"&&console.error&&console.error(s)}})}close(e){this.finalized||(this.finalized=!0,e!==void 0&&(this.finalError=e),this.task.then(()=>{this.observers=void 0,this.onNoObservers=void 0}))}}function Sb(t,e){if(typeof t!="object"||t===null)return!1;for(const n of e)if(n in t&&typeof t[n]=="function")return!0;return!1}function qo(){}function cs(t,e){return`${t} failed: ${e} argument `}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Tb=function(t){const e=[];let n=0;for(let s=0;s<t.length;s++){let r=t.charCodeAt(s);if(r>=55296&&r<=56319){const i=r-55296;s++,g(s<t.length,"Surrogate pair missing trail surrogate.");const o=t.charCodeAt(s)-56320;r=65536+(i<<10)+o}r<128?e[n++]=r:r<2048?(e[n++]=r>>6|192,e[n++]=r&63|128):r<65536?(e[n++]=r>>12|224,e[n++]=r>>6&63|128,e[n++]=r&63|128):(e[n++]=r>>18|240,e[n++]=r>>12&63|128,e[n++]=r>>6&63|128,e[n++]=r&63|128)}return e},co=function(t){let e=0;for(let n=0;n<t.length;n++){const s=t.charCodeAt(n);s<128?e++:s<2048?e+=2:s>=55296&&s<=56319?(e+=4,n++):e+=3}return e};/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ib=1e3,kb=2,Rb=14400*1e3,Ab=.5;function Nb(t,e=Ib,n=kb){const s=e*Math.pow(n,t),r=Math.round(Ab*s*(Math.random()-.5)*2);return Math.min(Rb,s+r)}/**
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
 */function de(t){return t&&t._delegate?t._delegate:t}class Ct{constructor(e,n,s){this.name=e,this.instanceFactory=n,this.type=s,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}setInstantiationMode(e){return this.instantiationMode=e,this}setMultipleInstances(e){return this.multipleInstances=e,this}setServiceProps(e){return this.serviceProps=e,this}setInstanceCreatedCallback(e){return this.onInstanceCreated=e,this}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ln="[DEFAULT]";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Pb{constructor(e,n){this.name=e,this.container=n,this.component=null,this.instances=new Map,this.instancesDeferred=new Map,this.instancesOptions=new Map,this.onInitCallbacks=new Map}get(e){const n=this.normalizeInstanceIdentifier(e);if(!this.instancesDeferred.has(n)){const s=new Ce;if(this.instancesDeferred.set(n,s),this.isInitialized(n)||this.shouldAutoInitialize())try{const r=this.getOrInitializeService({instanceIdentifier:n});r&&s.resolve(r)}catch{}}return this.instancesDeferred.get(n).promise}getImmediate(e){const n=this.normalizeInstanceIdentifier(e?.identifier),s=e?.optional??!1;if(this.isInitialized(n)||this.shouldAutoInitialize())try{return this.getOrInitializeService({instanceIdentifier:n})}catch(r){if(s)return null;throw r}else{if(s)return null;throw Error(`Service ${this.name} is not available`)}}getComponent(){return this.component}setComponent(e){if(e.name!==this.name)throw Error(`Mismatching Component ${e.name} for Provider ${this.name}.`);if(this.component)throw Error(`Component for ${this.name} has already been provided`);if(this.component=e,!!this.shouldAutoInitialize()){if(Ob(e))try{this.getOrInitializeService({instanceIdentifier:ln})}catch{}for(const[n,s]of this.instancesDeferred.entries()){const r=this.normalizeInstanceIdentifier(n);try{const i=this.getOrInitializeService({instanceIdentifier:r});s.resolve(i)}catch{}}}}clearInstance(e=ln){this.instancesDeferred.delete(e),this.instancesOptions.delete(e),this.instances.delete(e)}async delete(){const e=Array.from(this.instances.values());await Promise.all([...e.filter(n=>"INTERNAL"in n).map(n=>n.INTERNAL.delete()),...e.filter(n=>"_delete"in n).map(n=>n._delete())])}isComponentSet(){return this.component!=null}isInitialized(e=ln){return this.instances.has(e)}getOptions(e=ln){return this.instancesOptions.get(e)||{}}initialize(e={}){const{options:n={}}=e,s=this.normalizeInstanceIdentifier(e.instanceIdentifier);if(this.isInitialized(s))throw Error(`${this.name}(${s}) has already been initialized`);if(!this.isComponentSet())throw Error(`Component ${this.name} has not been registered yet`);const r=this.getOrInitializeService({instanceIdentifier:s,options:n});for(const[i,o]of this.instancesDeferred.entries()){const a=this.normalizeInstanceIdentifier(i);s===a&&o.resolve(r)}return r}onInit(e,n){const s=this.normalizeInstanceIdentifier(n),r=this.onInitCallbacks.get(s)??new Set;r.add(e),this.onInitCallbacks.set(s,r);const i=this.instances.get(s);return i&&e(i,s),()=>{r.delete(e)}}invokeOnInitCallbacks(e,n){const s=this.onInitCallbacks.get(n);if(s)for(const r of s)try{r(e,n)}catch{}}getOrInitializeService({instanceIdentifier:e,options:n={}}){let s=this.instances.get(e);if(!s&&this.component&&(s=this.component.instanceFactory(this.container,{instanceIdentifier:Lb(e),options:n}),this.instances.set(e,s),this.instancesOptions.set(e,n),this.invokeOnInitCallbacks(s,e),this.component.onInstanceCreated))try{this.component.onInstanceCreated(this.container,e,s)}catch{}return s||null}normalizeInstanceIdentifier(e=ln){return this.component?this.component.multipleInstances?e:ln:e}shouldAutoInitialize(){return!!this.component&&this.component.instantiationMode!=="EXPLICIT"}}function Lb(t){return t===ln?void 0:t}function Ob(t){return t.instantiationMode==="EAGER"}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Db{constructor(e){this.name=e,this.providers=new Map}addComponent(e){const n=this.getProvider(e.name);if(n.isComponentSet())throw new Error(`Component ${e.name} has already been registered with ${this.name}`);n.setComponent(e)}addOrOverwriteComponent(e){this.getProvider(e.name).isComponentSet()&&this.providers.delete(e.name),this.addComponent(e)}getProvider(e){if(this.providers.has(e))return this.providers.get(e);const n=new Pb(e,this);return this.providers.set(e,n),n}getProviders(){return Array.from(this.providers.values())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var x;(function(t){t[t.DEBUG=0]="DEBUG",t[t.VERBOSE=1]="VERBOSE",t[t.INFO=2]="INFO",t[t.WARN=3]="WARN",t[t.ERROR=4]="ERROR",t[t.SILENT=5]="SILENT"})(x||(x={}));const Mb={debug:x.DEBUG,verbose:x.VERBOSE,info:x.INFO,warn:x.WARN,error:x.ERROR,silent:x.SILENT},xb=x.INFO,Fb={[x.DEBUG]:"log",[x.VERBOSE]:"log",[x.INFO]:"info",[x.WARN]:"warn",[x.ERROR]:"error"},Ub=(t,e,...n)=>{if(e<t.logLevel)return;const s=new Date().toISOString(),r=Fb[e];if(r)console[r](`[${s}]  ${t.name}:`,...n);else throw new Error(`Attempted to log a message with an invalid logType (value: ${e})`)};class lo{constructor(e){this.name=e,this._logLevel=xb,this._logHandler=Ub,this._userLogHandler=null}get logLevel(){return this._logLevel}set logLevel(e){if(!(e in x))throw new TypeError(`Invalid value "${e}" assigned to \`logLevel\``);this._logLevel=e}setLogLevel(e){this._logLevel=typeof e=="string"?Mb[e]:e}get logHandler(){return this._logHandler}set logHandler(e){if(typeof e!="function")throw new TypeError("Value assigned to `logHandler` must be a function");this._logHandler=e}get userLogHandler(){return this._userLogHandler}set userLogHandler(e){this._userLogHandler=e}debug(...e){this._userLogHandler&&this._userLogHandler(this,x.DEBUG,...e),this._logHandler(this,x.DEBUG,...e)}log(...e){this._userLogHandler&&this._userLogHandler(this,x.VERBOSE,...e),this._logHandler(this,x.VERBOSE,...e)}info(...e){this._userLogHandler&&this._userLogHandler(this,x.INFO,...e),this._logHandler(this,x.INFO,...e)}warn(...e){this._userLogHandler&&this._userLogHandler(this,x.WARN,...e),this._logHandler(this,x.WARN,...e)}error(...e){this._userLogHandler&&this._userLogHandler(this,x.ERROR,...e),this._logHandler(this,x.ERROR,...e)}}const $b=(t,e)=>e.some(n=>t instanceof n);let id,od;function Bb(){return id||(id=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])}function Hb(){return od||(od=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])}const jf=new WeakMap,Oa=new WeakMap,zf=new WeakMap,Go=new WeakMap,xc=new WeakMap;function Vb(t){const e=new Promise((n,s)=>{const r=()=>{t.removeEventListener("success",i),t.removeEventListener("error",o)},i=()=>{n(Bt(t.result)),r()},o=()=>{s(t.error),r()};t.addEventListener("success",i),t.addEventListener("error",o)});return e.then(n=>{n instanceof IDBCursor&&jf.set(n,t)}).catch(()=>{}),xc.set(e,t),e}function Wb(t){if(Oa.has(t))return;const e=new Promise((n,s)=>{const r=()=>{t.removeEventListener("complete",i),t.removeEventListener("error",o),t.removeEventListener("abort",o)},i=()=>{n(),r()},o=()=>{s(t.error||new DOMException("AbortError","AbortError")),r()};t.addEventListener("complete",i),t.addEventListener("error",o),t.addEventListener("abort",o)});Oa.set(t,e)}let Da={get(t,e,n){if(t instanceof IDBTransaction){if(e==="done")return Oa.get(t);if(e==="objectStoreNames")return t.objectStoreNames||zf.get(t);if(e==="store")return n.objectStoreNames[1]?void 0:n.objectStore(n.objectStoreNames[0])}return Bt(t[e])},set(t,e,n){return t[e]=n,!0},has(t,e){return t instanceof IDBTransaction&&(e==="done"||e==="store")?!0:e in t}};function jb(t){Da=t(Da)}function zb(t){return t===IDBDatabase.prototype.transaction&&!("objectStoreNames"in IDBTransaction.prototype)?function(e,...n){const s=t.call(Yo(this),e,...n);return zf.set(s,e.sort?e.sort():[e]),Bt(s)}:Hb().includes(t)?function(...e){return t.apply(Yo(this),e),Bt(jf.get(this))}:function(...e){return Bt(t.apply(Yo(this),e))}}function qb(t){return typeof t=="function"?zb(t):(t instanceof IDBTransaction&&Wb(t),$b(t,Bb())?new Proxy(t,Da):t)}function Bt(t){if(t instanceof IDBRequest)return Vb(t);if(Go.has(t))return Go.get(t);const e=qb(t);return e!==t&&(Go.set(t,e),xc.set(e,t)),e}const Yo=t=>xc.get(t);function Gb(t,e,{blocked:n,upgrade:s,blocking:r,terminated:i}={}){const o=indexedDB.open(t,e),a=Bt(o);return s&&o.addEventListener("upgradeneeded",c=>{s(Bt(o.result),c.oldVersion,c.newVersion,Bt(o.transaction),c)}),n&&o.addEventListener("blocked",c=>n(c.oldVersion,c.newVersion,c)),a.then(c=>{i&&c.addEventListener("close",()=>i()),r&&c.addEventListener("versionchange",l=>r(l.oldVersion,l.newVersion,l))}).catch(()=>{}),a}const Yb=["get","getKey","getAll","getAllKeys","count"],Kb=["put","add","delete","clear"],Ko=new Map;function ad(t,e){if(!(t instanceof IDBDatabase&&!(e in t)&&typeof e=="string"))return;if(Ko.get(e))return Ko.get(e);const n=e.replace(/FromIndex$/,""),s=e!==n,r=Kb.includes(n);if(!(n in(s?IDBIndex:IDBObjectStore).prototype)||!(r||Yb.includes(n)))return;const i=async function(o,...a){const c=this.transaction(o,r?"readwrite":"readonly");let l=c.store;return s&&(l=l.index(a.shift())),(await Promise.all([l[n](...a),r&&c.done]))[0]};return Ko.set(e,i),i}jb(t=>({...t,get:(e,n,s)=>ad(e,n)||t.get(e,n,s),has:(e,n)=>!!ad(e,n)||t.has(e,n)}));/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Jb{constructor(e){this.container=e}getPlatformInfoString(){return this.container.getProviders().map(n=>{if(Xb(n)){const s=n.getImmediate();return`${s.library}/${s.version}`}else return null}).filter(n=>n).join(" ")}}function Xb(t){return t.getComponent()?.type==="VERSION"}const Ma="@firebase/app",cd="0.14.4";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const St=new lo("@firebase/app"),Qb="@firebase/app-compat",Zb="@firebase/analytics-compat",eC="@firebase/analytics",tC="@firebase/app-check-compat",nC="@firebase/app-check",sC="@firebase/auth",rC="@firebase/auth-compat",iC="@firebase/database",oC="@firebase/data-connect",aC="@firebase/database-compat",cC="@firebase/functions",lC="@firebase/functions-compat",uC="@firebase/installations",dC="@firebase/installations-compat",hC="@firebase/messaging",fC="@firebase/messaging-compat",pC="@firebase/performance",gC="@firebase/performance-compat",mC="@firebase/remote-config",_C="@firebase/remote-config-compat",yC="@firebase/storage",EC="@firebase/storage-compat",vC="@firebase/firestore",wC="@firebase/ai",bC="@firebase/firestore-compat",CC="firebase",SC="12.4.0";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const xa="[DEFAULT]",TC={[Ma]:"fire-core",[Qb]:"fire-core-compat",[eC]:"fire-analytics",[Zb]:"fire-analytics-compat",[nC]:"fire-app-check",[tC]:"fire-app-check-compat",[sC]:"fire-auth",[rC]:"fire-auth-compat",[iC]:"fire-rtdb",[oC]:"fire-data-connect",[aC]:"fire-rtdb-compat",[cC]:"fire-fn",[lC]:"fire-fn-compat",[uC]:"fire-iid",[dC]:"fire-iid-compat",[hC]:"fire-fcm",[fC]:"fire-fcm-compat",[pC]:"fire-perf",[gC]:"fire-perf-compat",[mC]:"fire-rc",[_C]:"fire-rc-compat",[yC]:"fire-gcs",[EC]:"fire-gcs-compat",[vC]:"fire-fst",[bC]:"fire-fst-compat",[wC]:"fire-vertex","fire-js":"fire-js",[CC]:"fire-js-all"};/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ci=new Map,IC=new Map,Fa=new Map;function ld(t,e){try{t.container.addComponent(e)}catch(n){St.debug(`Component ${e.name} failed to register with FirebaseApp ${t.name}`,n)}}function Gt(t){const e=t.name;if(Fa.has(e))return St.debug(`There were multiple attempts to register component ${e}.`),!1;Fa.set(e,t);for(const n of Ci.values())ld(n,t);for(const n of IC.values())ld(n,t);return!0}function Ar(t,e){const n=t.container.getProvider("heartbeat").getImmediate({optional:!0});return n&&n.triggerHeartbeat(),t.container.getProvider(e)}function Be(t){return t==null?!1:t.settings!==void 0}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const kC={"no-app":"No Firebase App '{$appName}' has been created - call initializeApp() first","bad-app-name":"Illegal App name: '{$appName}'","duplicate-app":"Firebase App named '{$appName}' already exists with different options or config","app-deleted":"Firebase App named '{$appName}' already deleted","server-app-deleted":"Firebase Server App has been deleted","no-options":"Need to provide options, when not being deployed to hosting via source.","invalid-app-argument":"firebase.{$appName}() takes either no argument or a Firebase App instance.","invalid-log-argument":"First argument to `onLog` must be null or a function.","idb-open":"Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.","idb-get":"Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.","idb-set":"Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.","idb-delete":"Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}.","finalization-registry-not-supported":"FirebaseServerApp deleteOnDeref field defined but the JS runtime does not support FinalizationRegistry.","invalid-server-app-environment":"FirebaseServerApp is not for use in browser environments."},Ht=new Cs("app","Firebase",kC);/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class RC{constructor(e,n,s){this._isDeleted=!1,this._options={...e},this._config={...n},this._name=n.name,this._automaticDataCollectionEnabled=n.automaticDataCollectionEnabled,this._container=s,this.container.addComponent(new Ct("app",()=>this,"PUBLIC"))}get automaticDataCollectionEnabled(){return this.checkDestroyed(),this._automaticDataCollectionEnabled}set automaticDataCollectionEnabled(e){this.checkDestroyed(),this._automaticDataCollectionEnabled=e}get name(){return this.checkDestroyed(),this._name}get options(){return this.checkDestroyed(),this._options}get config(){return this.checkDestroyed(),this._config}get container(){return this._container}get isDeleted(){return this._isDeleted}set isDeleted(e){this._isDeleted=e}checkDestroyed(){if(this.isDeleted)throw Ht.create("app-deleted",{appName:this._name})}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ts=SC;function qf(t,e={}){let n=t;typeof e!="object"&&(e={name:e});const s={name:xa,automaticDataCollectionEnabled:!0,...e},r=s.name;if(typeof r!="string"||!r)throw Ht.create("bad-app-name",{appName:String(r)});if(n||(n=Uf()),!n)throw Ht.create("no-options");const i=Ci.get(r);if(i){if(Sn(n,i.options)&&Sn(s,i.config))return i;throw Ht.create("duplicate-app",{appName:r})}const o=new Db(r);for(const c of Fa.values())o.addComponent(c);const a=new RC(n,s,o);return Ci.set(r,a),a}function Fc(t=xa){const e=Ci.get(t);if(!e&&t===xa&&Uf())return qf();if(!e)throw Ht.create("no-app",{appName:t});return e}function vt(t,e,n){let s=TC[t]??t;n&&(s+=`-${n}`);const r=s.match(/\s|\//),i=e.match(/\s|\//);if(r||i){const o=[`Unable to register library "${s}" with version "${e}":`];r&&o.push(`library name "${s}" contains illegal characters (whitespace or "/")`),r&&i&&o.push("and"),i&&o.push(`version name "${e}" contains illegal characters (whitespace or "/")`),St.warn(o.join(" "));return}Gt(new Ct(`${s}-version`,()=>({library:s,version:e}),"VERSION"))}/**
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
 */const AC="firebase-heartbeat-database",NC=1,ur="firebase-heartbeat-store";let Jo=null;function Gf(){return Jo||(Jo=Gb(AC,NC,{upgrade:(t,e)=>{switch(e){case 0:try{t.createObjectStore(ur)}catch(n){console.warn(n)}}}}).catch(t=>{throw Ht.create("idb-open",{originalErrorMessage:t.message})})),Jo}async function PC(t){try{const n=(await Gf()).transaction(ur),s=await n.objectStore(ur).get(Yf(t));return await n.done,s}catch(e){if(e instanceof en)St.warn(e.message);else{const n=Ht.create("idb-get",{originalErrorMessage:e?.message});St.warn(n.message)}}}async function ud(t,e){try{const s=(await Gf()).transaction(ur,"readwrite");await s.objectStore(ur).put(e,Yf(t)),await s.done}catch(n){if(n instanceof en)St.warn(n.message);else{const s=Ht.create("idb-set",{originalErrorMessage:n?.message});St.warn(s.message)}}}function Yf(t){return`${t.name}!${t.options.appId}`}/**
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
 */const LC=1024,OC=30;class DC{constructor(e){this.container=e,this._heartbeatsCache=null;const n=this.container.getProvider("app").getImmediate();this._storage=new xC(n),this._heartbeatsCachePromise=this._storage.read().then(s=>(this._heartbeatsCache=s,s))}async triggerHeartbeat(){try{const n=this.container.getProvider("platform-logger").getImmediate().getPlatformInfoString(),s=dd();if(this._heartbeatsCache?.heartbeats==null&&(this._heartbeatsCache=await this._heartbeatsCachePromise,this._heartbeatsCache?.heartbeats==null)||this._heartbeatsCache.lastSentHeartbeatDate===s||this._heartbeatsCache.heartbeats.some(r=>r.date===s))return;if(this._heartbeatsCache.heartbeats.push({date:s,agent:n}),this._heartbeatsCache.heartbeats.length>OC){const r=FC(this._heartbeatsCache.heartbeats);this._heartbeatsCache.heartbeats.splice(r,1)}return this._storage.overwrite(this._heartbeatsCache)}catch(e){St.warn(e)}}async getHeartbeatsHeader(){try{if(this._heartbeatsCache===null&&await this._heartbeatsCachePromise,this._heartbeatsCache?.heartbeats==null||this._heartbeatsCache.heartbeats.length===0)return"";const e=dd(),{heartbeatsToSend:n,unsentEntries:s}=MC(this._heartbeatsCache.heartbeats),r=Ei(JSON.stringify({version:2,heartbeats:n}));return this._heartbeatsCache.lastSentHeartbeatDate=e,s.length>0?(this._heartbeatsCache.heartbeats=s,await this._storage.overwrite(this._heartbeatsCache)):(this._heartbeatsCache.heartbeats=[],this._storage.overwrite(this._heartbeatsCache)),r}catch(e){return St.warn(e),""}}}function dd(){return new Date().toISOString().substring(0,10)}function MC(t,e=LC){const n=[];let s=t.slice();for(const r of t){const i=n.find(o=>o.agent===r.agent);if(i){if(i.dates.push(r.date),hd(n)>e){i.dates.pop();break}}else if(n.push({agent:r.agent,dates:[r.date]}),hd(n)>e){n.pop();break}s=s.slice(1)}return{heartbeatsToSend:n,unsentEntries:s}}class xC{constructor(e){this.app=e,this._canUseIndexedDBPromise=this.runIndexedDBEnvironmentCheck()}async runIndexedDBEnvironmentCheck(){return Mc()?gb().then(()=>!0).catch(()=>!1):!1}async read(){if(await this._canUseIndexedDBPromise){const n=await PC(this.app);return n?.heartbeats?n:{heartbeats:[]}}else return{heartbeats:[]}}async overwrite(e){if(await this._canUseIndexedDBPromise){const s=await this.read();return ud(this.app,{lastSentHeartbeatDate:e.lastSentHeartbeatDate??s.lastSentHeartbeatDate,heartbeats:e.heartbeats})}else return}async add(e){if(await this._canUseIndexedDBPromise){const s=await this.read();return ud(this.app,{lastSentHeartbeatDate:e.lastSentHeartbeatDate??s.lastSentHeartbeatDate,heartbeats:[...s.heartbeats,...e.heartbeats]})}else return}}function hd(t){return Ei(JSON.stringify({version:2,heartbeats:t})).length}function FC(t){if(t.length===0)return-1;let e=0,n=t[0].date;for(let s=1;s<t.length;s++)t[s].date<n&&(n=t[s].date,e=s);return e}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function UC(t){Gt(new Ct("platform-logger",e=>new Jb(e),"PRIVATE")),Gt(new Ct("heartbeat",e=>new DC(e),"PRIVATE")),vt(Ma,cd,t),vt(Ma,cd,"esm2020"),vt("fire-js","")}UC("");var fd={};const pd="@firebase/database",gd="1.1.0";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Kf="";function Jf(t){Kf=t}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class $C{constructor(e){this.domStorage_=e,this.prefix_="firebase:"}set(e,n){n==null?this.domStorage_.removeItem(this.prefixedName_(e)):this.domStorage_.setItem(this.prefixedName_(e),se(n))}get(e){const n=this.domStorage_.getItem(this.prefixedName_(e));return n==null?null:lr(n)}remove(e){this.domStorage_.removeItem(this.prefixedName_(e))}prefixedName_(e){return this.prefix_+e}toString(){return this.domStorage_.toString()}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class BC{constructor(){this.cache_={},this.isInMemoryStorage=!0}set(e,n){n==null?delete this.cache_[e]:this.cache_[e]=n}get(e){return lt(this.cache_,e)?this.cache_[e]:null}remove(e){delete this.cache_[e]}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Xf=function(t){try{if(typeof window<"u"&&typeof window[t]<"u"){const e=window[t];return e.setItem("firebase:sentinel","cache"),e.removeItem("firebase:sentinel"),new $C(e)}}catch{}return new BC},pn=Xf("localStorage"),HC=Xf("sessionStorage");/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const zn=new lo("@firebase/database"),VC=(function(){let t=1;return function(){return t++}})(),Qf=function(t){const e=Tb(t),n=new wb;n.update(e);const s=n.digest();return ao.encodeByteArray(s)},Nr=function(...t){let e="";for(let n=0;n<t.length;n++){const s=t[n];Array.isArray(s)||s&&typeof s=="object"&&typeof s.length=="number"?e+=Nr.apply(null,s):typeof s=="object"?e+=se(s):e+=s,e+=" "}return e};let Ys=null,md=!0;const WC=function(t,e){g(!0,"Can't turn on custom loggers persistently."),zn.logLevel=x.VERBOSE,Ys=zn.log.bind(zn)},ce=function(...t){if(md===!0&&(md=!1,Ys===null&&HC.get("logging_enabled")===!0&&WC()),Ys){const e=Nr.apply(null,t);Ys(e)}},Pr=function(t){return function(...e){ce(t,...e)}},Ua=function(...t){const e="FIREBASE INTERNAL ERROR: "+Nr(...t);zn.error(e)},Tt=function(...t){const e=`FIREBASE FATAL ERROR: ${Nr(...t)}`;throw zn.error(e),new Error(e)},ve=function(...t){const e="FIREBASE WARNING: "+Nr(...t);zn.warn(e)},jC=function(){typeof window<"u"&&window.location&&window.location.protocol&&window.location.protocol.indexOf("https:")!==-1&&ve("Insecure Firebase access from a secure page. Please use https in calls to new Firebase().")},uo=function(t){return typeof t=="number"&&(t!==t||t===Number.POSITIVE_INFINITY||t===Number.NEGATIVE_INFINITY)},zC=function(t){if(document.readyState==="complete")t();else{let e=!1;const n=function(){if(!document.body){setTimeout(n,Math.floor(10));return}e||(e=!0,t())};document.addEventListener?(document.addEventListener("DOMContentLoaded",n,!1),window.addEventListener("load",n,!1)):document.attachEvent&&(document.attachEvent("onreadystatechange",()=>{document.readyState==="complete"&&n()}),window.attachEvent("onload",n))}},ls="[MIN_NAME]",Tn="[MAX_NAME]",Mn=function(t,e){if(t===e)return 0;if(t===ls||e===Tn)return-1;if(e===ls||t===Tn)return 1;{const n=_d(t),s=_d(e);return n!==null?s!==null?n-s===0?t.length-e.length:n-s:-1:s!==null?1:t<e?-1:1}},qC=function(t,e){return t===e?0:t<e?-1:1},Fs=function(t,e){if(e&&t in e)return e[t];throw new Error("Missing required key ("+t+") in object: "+se(e))},Uc=function(t){if(typeof t!="object"||t===null)return se(t);const e=[];for(const s in t)e.push(s);e.sort();let n="{";for(let s=0;s<e.length;s++)s!==0&&(n+=","),n+=se(e[s]),n+=":",n+=Uc(t[e[s]]);return n+="}",n},Zf=function(t,e){const n=t.length;if(n<=e)return[t];const s=[];for(let r=0;r<n;r+=e)r+e>n?s.push(t.substring(r,n)):s.push(t.substring(r,r+e));return s};function le(t,e){for(const n in t)t.hasOwnProperty(n)&&e(n,t[n])}const ep=function(t){g(!uo(t),"Invalid JSON number");const e=11,n=52,s=(1<<e-1)-1;let r,i,o,a,c;t===0?(i=0,o=0,r=1/t===-1/0?1:0):(r=t<0,t=Math.abs(t),t>=Math.pow(2,1-s)?(a=Math.min(Math.floor(Math.log(t)/Math.LN2),s),i=a+s,o=Math.round(t*Math.pow(2,n-a)-Math.pow(2,n))):(i=0,o=Math.round(t/Math.pow(2,1-s-n))));const l=[];for(c=n;c;c-=1)l.push(o%2?1:0),o=Math.floor(o/2);for(c=e;c;c-=1)l.push(i%2?1:0),i=Math.floor(i/2);l.push(r?1:0),l.reverse();const u=l.join("");let d="";for(c=0;c<64;c+=8){let h=parseInt(u.substr(c,8),2).toString(16);h.length===1&&(h="0"+h),d=d+h}return d.toLowerCase()},GC=function(){return!!(typeof window=="object"&&window.chrome&&window.chrome.extension&&!/^chrome/.test(window.location.href))},YC=function(){return typeof Windows=="object"&&typeof Windows.UI=="object"};function KC(t,e){let n="Unknown Error";t==="too_big"?n="The data requested exceeds the maximum size that can be accessed with a single request.":t==="permission_denied"?n="Client doesn't have permission to access the desired data.":t==="unavailable"&&(n="The service is unavailable");const s=new Error(t+" at "+e._path.toString()+": "+n);return s.code=t.toUpperCase(),s}const JC=new RegExp("^-?(0*)\\d{1,10}$"),XC=-2147483648,QC=2147483647,_d=function(t){if(JC.test(t)){const e=Number(t);if(e>=XC&&e<=QC)return e}return null},Is=function(t){try{t()}catch(e){setTimeout(()=>{const n=e.stack||"";throw ve("Exception was thrown by user callback.",n),e},Math.floor(0))}},ZC=function(){return(typeof window=="object"&&window.navigator&&window.navigator.userAgent||"").search(/googlebot|google webmaster tools|bingbot|yahoo! slurp|baiduspider|yandexbot|duckduckbot/i)>=0},Ks=function(t,e){const n=setTimeout(t,e);return typeof n=="number"&&typeof Deno<"u"&&Deno.unrefTimer?Deno.unrefTimer(n):typeof n=="object"&&n.unref&&n.unref(),n};/**
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
 */class eS{constructor(e,n){this.appCheckProvider=n,this.appName=e.name,Be(e)&&e.settings.appCheckToken&&(this.serverAppAppCheckToken=e.settings.appCheckToken),this.appCheck=n?.getImmediate({optional:!0}),this.appCheck||n?.get().then(s=>this.appCheck=s)}getToken(e){if(this.serverAppAppCheckToken){if(e)throw new Error("Attempted reuse of `FirebaseServerApp.appCheckToken` after previous usage failed.");return Promise.resolve({token:this.serverAppAppCheckToken})}return this.appCheck?this.appCheck.getToken(e):new Promise((n,s)=>{setTimeout(()=>{this.appCheck?this.getToken(e).then(n,s):n(null)},0)})}addTokenChangeListener(e){this.appCheckProvider?.get().then(n=>n.addTokenListener(e))}notifyForInvalidToken(){ve(`Provided AppCheck credentials for the app named "${this.appName}" are invalid. This usually indicates your app was not initialized correctly.`)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class tS{constructor(e,n,s){this.appName_=e,this.firebaseOptions_=n,this.authProvider_=s,this.auth_=null,this.auth_=s.getImmediate({optional:!0}),this.auth_||s.onInit(r=>this.auth_=r)}getToken(e){return this.auth_?this.auth_.getToken(e).catch(n=>n&&n.code==="auth/token-not-initialized"?(ce("Got auth/token-not-initialized error.  Treating as null token."),null):Promise.reject(n)):new Promise((n,s)=>{setTimeout(()=>{this.auth_?this.getToken(e).then(n,s):n(null)},0)})}addTokenChangeListener(e){this.auth_?this.auth_.addAuthTokenListener(e):this.authProvider_.get().then(n=>n.addAuthTokenListener(e))}removeTokenChangeListener(e){this.authProvider_.get().then(n=>n.removeAuthTokenListener(e))}notifyForInvalidToken(){let e='Provided authentication credentials for the app named "'+this.appName_+'" are invalid. This usually indicates your app was not initialized correctly. ';"credential"in this.firebaseOptions_?e+='Make sure the "credential" property provided to initializeApp() is authorized to access the specified "databaseURL" and is from the correct project.':"serviceAccount"in this.firebaseOptions_?e+='Make sure the "serviceAccount" property provided to initializeApp() is authorized to access the specified "databaseURL" and is from the correct project.':e+='Make sure the "apiKey" and "databaseURL" properties provided to initializeApp() match the values provided for your app at https://console.firebase.google.com/.',ve(e)}}class ci{constructor(e){this.accessToken=e}getToken(e){return Promise.resolve({accessToken:this.accessToken})}addTokenChangeListener(e){e(this.accessToken)}removeTokenChangeListener(e){}notifyForInvalidToken(){}}ci.OWNER="owner";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const $c="5",tp="v",np="s",sp="r",rp="f",ip=/(console\.firebase|firebase-console-\w+\.corp|firebase\.corp)\.google\.com/,op="ls",ap="p",$a="ac",cp="websocket",lp="long_polling";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class up{constructor(e,n,s,r,i=!1,o="",a=!1,c=!1,l=null){this.secure=n,this.namespace=s,this.webSocketOnly=r,this.nodeAdmin=i,this.persistenceKey=o,this.includeNamespaceInQueryParams=a,this.isUsingEmulator=c,this.emulatorOptions=l,this._host=e.toLowerCase(),this._domain=this._host.substr(this._host.indexOf(".")+1),this.internalHost=pn.get("host:"+e)||this._host}isCacheableHost(){return this.internalHost.substr(0,2)==="s-"}isCustomHost(){return this._domain!=="firebaseio.com"&&this._domain!=="firebaseio-demo.com"}get host(){return this._host}set host(e){e!==this.internalHost&&(this.internalHost=e,this.isCacheableHost()&&pn.set("host:"+this._host,this.internalHost))}toString(){let e=this.toURLString();return this.persistenceKey&&(e+="<"+this.persistenceKey+">"),e}toURLString(){const e=this.secure?"https://":"http://",n=this.includeNamespaceInQueryParams?`?ns=${this.namespace}`:"";return`${e}${this.host}/${n}`}}function nS(t){return t.host!==t.internalHost||t.isCustomHost()||t.includeNamespaceInQueryParams}function dp(t,e,n){g(typeof e=="string","typeof type must == string"),g(typeof n=="object","typeof params must == object");let s;if(e===cp)s=(t.secure?"wss://":"ws://")+t.internalHost+"/.ws?";else if(e===lp)s=(t.secure?"https://":"http://")+t.internalHost+"/.lp?";else throw new Error("Unknown connection type: "+e);nS(t)&&(n.ns=t.namespace);const r=[];return le(n,(i,o)=>{r.push(i+"="+o)}),s+r.join("&")}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class sS{constructor(){this.counters_={}}incrementCounter(e,n=1){lt(this.counters_,e)||(this.counters_[e]=0),this.counters_[e]+=n}get(){return nb(this.counters_)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Xo={},Qo={};function Bc(t){const e=t.toString();return Xo[e]||(Xo[e]=new sS),Xo[e]}function rS(t,e){const n=t.toString();return Qo[n]||(Qo[n]=e()),Qo[n]}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class iS{constructor(e){this.onMessage_=e,this.pendingResponses=[],this.currentResponseNum=0,this.closeAfterResponse=-1,this.onClose=null}closeAfter(e,n){this.closeAfterResponse=e,this.onClose=n,this.closeAfterResponse<this.currentResponseNum&&(this.onClose(),this.onClose=null)}handleResponse(e,n){for(this.pendingResponses[e]=n;this.pendingResponses[this.currentResponseNum];){const s=this.pendingResponses[this.currentResponseNum];delete this.pendingResponses[this.currentResponseNum];for(let r=0;r<s.length;++r)s[r]&&Is(()=>{this.onMessage_(s[r])});if(this.currentResponseNum===this.closeAfterResponse){this.onClose&&(this.onClose(),this.onClose=null);break}this.currentResponseNum++}}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const yd="start",oS="close",aS="pLPCommand",cS="pRTLPCB",hp="id",fp="pw",pp="ser",lS="cb",uS="seg",dS="ts",hS="d",fS="dframe",gp=1870,mp=30,pS=gp-mp,gS=25e3,mS=3e4;class Vn{constructor(e,n,s,r,i,o,a){this.connId=e,this.repoInfo=n,this.applicationId=s,this.appCheckToken=r,this.authToken=i,this.transportSessionId=o,this.lastSessionId=a,this.bytesSent=0,this.bytesReceived=0,this.everConnected_=!1,this.log_=Pr(e),this.stats_=Bc(n),this.urlFn=c=>(this.appCheckToken&&(c[$a]=this.appCheckToken),dp(n,lp,c))}open(e,n){this.curSegmentNum=0,this.onDisconnect_=n,this.myPacketOrderer=new iS(e),this.isClosed_=!1,this.connectTimeoutTimer_=setTimeout(()=>{this.log_("Timed out trying to connect."),this.onClosed_(),this.connectTimeoutTimer_=null},Math.floor(mS)),zC(()=>{if(this.isClosed_)return;this.scriptTagHolder=new Hc((...i)=>{const[o,a,c,l,u]=i;if(this.incrementIncomingBytes_(i),!!this.scriptTagHolder)if(this.connectTimeoutTimer_&&(clearTimeout(this.connectTimeoutTimer_),this.connectTimeoutTimer_=null),this.everConnected_=!0,o===yd)this.id=a,this.password=c;else if(o===oS)a?(this.scriptTagHolder.sendNewPolls=!1,this.myPacketOrderer.closeAfter(a,()=>{this.onClosed_()})):this.onClosed_();else throw new Error("Unrecognized command received: "+o)},(...i)=>{const[o,a]=i;this.incrementIncomingBytes_(i),this.myPacketOrderer.handleResponse(o,a)},()=>{this.onClosed_()},this.urlFn);const s={};s[yd]="t",s[pp]=Math.floor(Math.random()*1e8),this.scriptTagHolder.uniqueCallbackIdentifier&&(s[lS]=this.scriptTagHolder.uniqueCallbackIdentifier),s[tp]=$c,this.transportSessionId&&(s[np]=this.transportSessionId),this.lastSessionId&&(s[op]=this.lastSessionId),this.applicationId&&(s[ap]=this.applicationId),this.appCheckToken&&(s[$a]=this.appCheckToken),typeof location<"u"&&location.hostname&&ip.test(location.hostname)&&(s[sp]=rp);const r=this.urlFn(s);this.log_("Connecting via long-poll to "+r),this.scriptTagHolder.addTag(r,()=>{})})}start(){this.scriptTagHolder.startLongPoll(this.id,this.password),this.addDisconnectPingFrame(this.id,this.password)}static forceAllow(){Vn.forceAllow_=!0}static forceDisallow(){Vn.forceDisallow_=!0}static isAvailable(){return Vn.forceAllow_?!0:!Vn.forceDisallow_&&typeof document<"u"&&document.createElement!=null&&!GC()&&!YC()}markConnectionHealthy(){}shutdown_(){this.isClosed_=!0,this.scriptTagHolder&&(this.scriptTagHolder.close(),this.scriptTagHolder=null),this.myDisconnFrame&&(document.body.removeChild(this.myDisconnFrame),this.myDisconnFrame=null),this.connectTimeoutTimer_&&(clearTimeout(this.connectTimeoutTimer_),this.connectTimeoutTimer_=null)}onClosed_(){this.isClosed_||(this.log_("Longpoll is closing itself"),this.shutdown_(),this.onDisconnect_&&(this.onDisconnect_(this.everConnected_),this.onDisconnect_=null))}close(){this.isClosed_||(this.log_("Longpoll is being closed."),this.shutdown_())}send(e){const n=se(e);this.bytesSent+=n.length,this.stats_.incrementCounter("bytes_sent",n.length);const s=Df(n),r=Zf(s,pS);for(let i=0;i<r.length;i++)this.scriptTagHolder.enqueueSegment(this.curSegmentNum,r.length,r[i]),this.curSegmentNum++}addDisconnectPingFrame(e,n){this.myDisconnFrame=document.createElement("iframe");const s={};s[fS]="t",s[hp]=e,s[fp]=n,this.myDisconnFrame.src=this.urlFn(s),this.myDisconnFrame.style.display="none",document.body.appendChild(this.myDisconnFrame)}incrementIncomingBytes_(e){const n=se(e).length;this.bytesReceived+=n,this.stats_.incrementCounter("bytes_received",n)}}class Hc{constructor(e,n,s,r){this.onDisconnect=s,this.urlFn=r,this.outstandingRequests=new Set,this.pendingSegs=[],this.currentSerial=Math.floor(Math.random()*1e8),this.sendNewPolls=!0;{this.uniqueCallbackIdentifier=VC(),window[aS+this.uniqueCallbackIdentifier]=e,window[cS+this.uniqueCallbackIdentifier]=n,this.myIFrame=Hc.createIFrame_();let i="";this.myIFrame.src&&this.myIFrame.src.substr(0,11)==="javascript:"&&(i='<script>document.domain="'+document.domain+'";<\/script>');const o="<html><body>"+i+"</body></html>";try{this.myIFrame.doc.open(),this.myIFrame.doc.write(o),this.myIFrame.doc.close()}catch(a){ce("frame writing exception"),a.stack&&ce(a.stack),ce(a)}}}static createIFrame_(){const e=document.createElement("iframe");if(e.style.display="none",document.body){document.body.appendChild(e);try{e.contentWindow.document||ce("No IE domain setting required")}catch{const s=document.domain;e.src="javascript:void((function(){document.open();document.domain='"+s+"';document.close();})())"}}else throw"Document body has not initialized. Wait to initialize Firebase until after the document is ready.";return e.contentDocument?e.doc=e.contentDocument:e.contentWindow?e.doc=e.contentWindow.document:e.document&&(e.doc=e.document),e}close(){this.alive=!1,this.myIFrame&&(this.myIFrame.doc.body.textContent="",setTimeout(()=>{this.myIFrame!==null&&(document.body.removeChild(this.myIFrame),this.myIFrame=null)},Math.floor(0)));const e=this.onDisconnect;e&&(this.onDisconnect=null,e())}startLongPoll(e,n){for(this.myID=e,this.myPW=n,this.alive=!0;this.newRequest_(););}newRequest_(){if(this.alive&&this.sendNewPolls&&this.outstandingRequests.size<(this.pendingSegs.length>0?2:1)){this.currentSerial++;const e={};e[hp]=this.myID,e[fp]=this.myPW,e[pp]=this.currentSerial;let n=this.urlFn(e),s="",r=0;for(;this.pendingSegs.length>0&&this.pendingSegs[0].d.length+mp+s.length<=gp;){const o=this.pendingSegs.shift();s=s+"&"+uS+r+"="+o.seg+"&"+dS+r+"="+o.ts+"&"+hS+r+"="+o.d,r++}return n=n+s,this.addLongPollTag_(n,this.currentSerial),!0}else return!1}enqueueSegment(e,n,s){this.pendingSegs.push({seg:e,ts:n,d:s}),this.alive&&this.newRequest_()}addLongPollTag_(e,n){this.outstandingRequests.add(n);const s=()=>{this.outstandingRequests.delete(n),this.newRequest_()},r=setTimeout(s,Math.floor(gS)),i=()=>{clearTimeout(r),s()};this.addTag(e,i)}addTag(e,n){setTimeout(()=>{try{if(!this.sendNewPolls)return;const s=this.myIFrame.doc.createElement("script");s.type="text/javascript",s.async=!0,s.src=e,s.onload=s.onreadystatechange=function(){const r=s.readyState;(!r||r==="loaded"||r==="complete")&&(s.onload=s.onreadystatechange=null,s.parentNode&&s.parentNode.removeChild(s),n())},s.onerror=()=>{ce("Long-poll script failed to load: "+e),this.sendNewPolls=!1,this.close()},this.myIFrame.doc.body.appendChild(s)}catch{}},Math.floor(1))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const _S=16384,yS=45e3;let Si=null;typeof MozWebSocket<"u"?Si=MozWebSocket:typeof WebSocket<"u"&&(Si=WebSocket);class He{constructor(e,n,s,r,i,o,a){this.connId=e,this.applicationId=s,this.appCheckToken=r,this.authToken=i,this.keepaliveTimer=null,this.frames=null,this.totalFrames=0,this.bytesSent=0,this.bytesReceived=0,this.log_=Pr(this.connId),this.stats_=Bc(n),this.connURL=He.connectionURL_(n,o,a,r,s),this.nodeAdmin=n.nodeAdmin}static connectionURL_(e,n,s,r,i){const o={};return o[tp]=$c,typeof location<"u"&&location.hostname&&ip.test(location.hostname)&&(o[sp]=rp),n&&(o[np]=n),s&&(o[op]=s),r&&(o[$a]=r),i&&(o[ap]=i),dp(e,cp,o)}open(e,n){this.onDisconnect=n,this.onMessage=e,this.log_("Websocket connecting to "+this.connURL),this.everConnected_=!1,pn.set("previous_websocket_failure",!0);try{let s;pb(),this.mySock=new Si(this.connURL,[],s)}catch(s){this.log_("Error instantiating WebSocket.");const r=s.message||s.data;r&&this.log_(r),this.onClosed_();return}this.mySock.onopen=()=>{this.log_("Websocket connected."),this.everConnected_=!0},this.mySock.onclose=()=>{this.log_("Websocket connection was disconnected."),this.mySock=null,this.onClosed_()},this.mySock.onmessage=s=>{this.handleIncomingFrame(s)},this.mySock.onerror=s=>{this.log_("WebSocket error.  Closing connection.");const r=s.message||s.data;r&&this.log_(r),this.onClosed_()}}start(){}static forceDisallow(){He.forceDisallow_=!0}static isAvailable(){let e=!1;if(typeof navigator<"u"&&navigator.userAgent){const n=/Android ([0-9]{0,}\.[0-9]{0,})/,s=navigator.userAgent.match(n);s&&s.length>1&&parseFloat(s[1])<4.4&&(e=!0)}return!e&&Si!==null&&!He.forceDisallow_}static previouslyFailed(){return pn.isInMemoryStorage||pn.get("previous_websocket_failure")===!0}markConnectionHealthy(){pn.remove("previous_websocket_failure")}appendFrame_(e){if(this.frames.push(e),this.frames.length===this.totalFrames){const n=this.frames.join("");this.frames=null;const s=lr(n);this.onMessage(s)}}handleNewFrameCount_(e){this.totalFrames=e,this.frames=[]}extractFrameCount_(e){if(g(this.frames===null,"We already have a frame buffer"),e.length<=6){const n=Number(e);if(!isNaN(n))return this.handleNewFrameCount_(n),null}return this.handleNewFrameCount_(1),e}handleIncomingFrame(e){if(this.mySock===null)return;const n=e.data;if(this.bytesReceived+=n.length,this.stats_.incrementCounter("bytes_received",n.length),this.resetKeepAlive(),this.frames!==null)this.appendFrame_(n);else{const s=this.extractFrameCount_(n);s!==null&&this.appendFrame_(s)}}send(e){this.resetKeepAlive();const n=se(e);this.bytesSent+=n.length,this.stats_.incrementCounter("bytes_sent",n.length);const s=Zf(n,_S);s.length>1&&this.sendString_(String(s.length));for(let r=0;r<s.length;r++)this.sendString_(s[r])}shutdown_(){this.isClosed_=!0,this.keepaliveTimer&&(clearInterval(this.keepaliveTimer),this.keepaliveTimer=null),this.mySock&&(this.mySock.close(),this.mySock=null)}onClosed_(){this.isClosed_||(this.log_("WebSocket is closing itself"),this.shutdown_(),this.onDisconnect&&(this.onDisconnect(this.everConnected_),this.onDisconnect=null))}close(){this.isClosed_||(this.log_("WebSocket is being closed"),this.shutdown_())}resetKeepAlive(){clearInterval(this.keepaliveTimer),this.keepaliveTimer=setInterval(()=>{this.mySock&&this.sendString_("0"),this.resetKeepAlive()},Math.floor(yS))}sendString_(e){try{this.mySock.send(e)}catch(n){this.log_("Exception thrown from WebSocket.send():",n.message||n.data,"Closing connection."),setTimeout(this.onClosed_.bind(this),0)}}}He.responsesRequiredToBeHealthy=2;He.healthyTimeout=3e4;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class dr{static get ALL_TRANSPORTS(){return[Vn,He]}static get IS_TRANSPORT_INITIALIZED(){return this.globalTransportInitialized_}constructor(e){this.initTransports_(e)}initTransports_(e){const n=He&&He.isAvailable();let s=n&&!He.previouslyFailed();if(e.webSocketOnly&&(n||ve("wss:// URL used, but browser isn't known to support websockets.  Trying anyway."),s=!0),s)this.transports_=[He];else{const r=this.transports_=[];for(const i of dr.ALL_TRANSPORTS)i&&i.isAvailable()&&r.push(i);dr.globalTransportInitialized_=!0}}initialTransport(){if(this.transports_.length>0)return this.transports_[0];throw new Error("No transports available")}upgradeTransport(){return this.transports_.length>1?this.transports_[1]:null}}dr.globalTransportInitialized_=!1;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ES=6e4,vS=5e3,wS=10*1024,bS=100*1024,Zo="t",Ed="d",CS="s",vd="r",SS="e",wd="o",bd="a",Cd="n",Sd="p",TS="h";class IS{constructor(e,n,s,r,i,o,a,c,l,u){this.id=e,this.repoInfo_=n,this.applicationId_=s,this.appCheckToken_=r,this.authToken_=i,this.onMessage_=o,this.onReady_=a,this.onDisconnect_=c,this.onKill_=l,this.lastSessionId=u,this.connectionCount=0,this.pendingDataMessages=[],this.state_=0,this.log_=Pr("c:"+this.id+":"),this.transportManager_=new dr(n),this.log_("Connection created"),this.start_()}start_(){const e=this.transportManager_.initialTransport();this.conn_=new e(this.nextTransportId_(),this.repoInfo_,this.applicationId_,this.appCheckToken_,this.authToken_,null,this.lastSessionId),this.primaryResponsesRequired_=e.responsesRequiredToBeHealthy||0;const n=this.connReceiver_(this.conn_),s=this.disconnReceiver_(this.conn_);this.tx_=this.conn_,this.rx_=this.conn_,this.secondaryConn_=null,this.isHealthy_=!1,setTimeout(()=>{this.conn_&&this.conn_.open(n,s)},Math.floor(0));const r=e.healthyTimeout||0;r>0&&(this.healthyTimeout_=Ks(()=>{this.healthyTimeout_=null,this.isHealthy_||(this.conn_&&this.conn_.bytesReceived>bS?(this.log_("Connection exceeded healthy timeout but has received "+this.conn_.bytesReceived+" bytes.  Marking connection healthy."),this.isHealthy_=!0,this.conn_.markConnectionHealthy()):this.conn_&&this.conn_.bytesSent>wS?this.log_("Connection exceeded healthy timeout but has sent "+this.conn_.bytesSent+" bytes.  Leaving connection alive."):(this.log_("Closing unhealthy connection after timeout."),this.close()))},Math.floor(r)))}nextTransportId_(){return"c:"+this.id+":"+this.connectionCount++}disconnReceiver_(e){return n=>{e===this.conn_?this.onConnectionLost_(n):e===this.secondaryConn_?(this.log_("Secondary connection lost."),this.onSecondaryConnectionLost_()):this.log_("closing an old connection")}}connReceiver_(e){return n=>{this.state_!==2&&(e===this.rx_?this.onPrimaryMessageReceived_(n):e===this.secondaryConn_?this.onSecondaryMessageReceived_(n):this.log_("message on old connection"))}}sendRequest(e){const n={t:"d",d:e};this.sendData_(n)}tryCleanupConnection(){this.tx_===this.secondaryConn_&&this.rx_===this.secondaryConn_&&(this.log_("cleaning up and promoting a connection: "+this.secondaryConn_.connId),this.conn_=this.secondaryConn_,this.secondaryConn_=null)}onSecondaryControl_(e){if(Zo in e){const n=e[Zo];n===bd?this.upgradeIfSecondaryHealthy_():n===vd?(this.log_("Got a reset on secondary, closing it"),this.secondaryConn_.close(),(this.tx_===this.secondaryConn_||this.rx_===this.secondaryConn_)&&this.close()):n===wd&&(this.log_("got pong on secondary."),this.secondaryResponsesRequired_--,this.upgradeIfSecondaryHealthy_())}}onSecondaryMessageReceived_(e){const n=Fs("t",e),s=Fs("d",e);if(n==="c")this.onSecondaryControl_(s);else if(n==="d")this.pendingDataMessages.push(s);else throw new Error("Unknown protocol layer: "+n)}upgradeIfSecondaryHealthy_(){this.secondaryResponsesRequired_<=0?(this.log_("Secondary connection is healthy."),this.isHealthy_=!0,this.secondaryConn_.markConnectionHealthy(),this.proceedWithUpgrade_()):(this.log_("sending ping on secondary."),this.secondaryConn_.send({t:"c",d:{t:Sd,d:{}}}))}proceedWithUpgrade_(){this.secondaryConn_.start(),this.log_("sending client ack on secondary"),this.secondaryConn_.send({t:"c",d:{t:bd,d:{}}}),this.log_("Ending transmission on primary"),this.conn_.send({t:"c",d:{t:Cd,d:{}}}),this.tx_=this.secondaryConn_,this.tryCleanupConnection()}onPrimaryMessageReceived_(e){const n=Fs("t",e),s=Fs("d",e);n==="c"?this.onControl_(s):n==="d"&&this.onDataMessage_(s)}onDataMessage_(e){this.onPrimaryResponse_(),this.onMessage_(e)}onPrimaryResponse_(){this.isHealthy_||(this.primaryResponsesRequired_--,this.primaryResponsesRequired_<=0&&(this.log_("Primary connection is healthy."),this.isHealthy_=!0,this.conn_.markConnectionHealthy()))}onControl_(e){const n=Fs(Zo,e);if(Ed in e){const s=e[Ed];if(n===TS){const r={...s};this.repoInfo_.isUsingEmulator&&(r.h=this.repoInfo_.host),this.onHandshake_(r)}else if(n===Cd){this.log_("recvd end transmission on primary"),this.rx_=this.secondaryConn_;for(let r=0;r<this.pendingDataMessages.length;++r)this.onDataMessage_(this.pendingDataMessages[r]);this.pendingDataMessages=[],this.tryCleanupConnection()}else n===CS?this.onConnectionShutdown_(s):n===vd?this.onReset_(s):n===SS?Ua("Server Error: "+s):n===wd?(this.log_("got pong on primary."),this.onPrimaryResponse_(),this.sendPingOnPrimaryIfNecessary_()):Ua("Unknown control packet command: "+n)}}onHandshake_(e){const n=e.ts,s=e.v,r=e.h;this.sessionId=e.s,this.repoInfo_.host=r,this.state_===0&&(this.conn_.start(),this.onConnectionEstablished_(this.conn_,n),$c!==s&&ve("Protocol version mismatch detected"),this.tryStartUpgrade_())}tryStartUpgrade_(){const e=this.transportManager_.upgradeTransport();e&&this.startUpgrade_(e)}startUpgrade_(e){this.secondaryConn_=new e(this.nextTransportId_(),this.repoInfo_,this.applicationId_,this.appCheckToken_,this.authToken_,this.sessionId),this.secondaryResponsesRequired_=e.responsesRequiredToBeHealthy||0;const n=this.connReceiver_(this.secondaryConn_),s=this.disconnReceiver_(this.secondaryConn_);this.secondaryConn_.open(n,s),Ks(()=>{this.secondaryConn_&&(this.log_("Timed out trying to upgrade."),this.secondaryConn_.close())},Math.floor(ES))}onReset_(e){this.log_("Reset packet received.  New host: "+e),this.repoInfo_.host=e,this.state_===1?this.close():(this.closeConnections_(),this.start_())}onConnectionEstablished_(e,n){this.log_("Realtime connection established."),this.conn_=e,this.state_=1,this.onReady_&&(this.onReady_(n,this.sessionId),this.onReady_=null),this.primaryResponsesRequired_===0?(this.log_("Primary connection is healthy."),this.isHealthy_=!0):Ks(()=>{this.sendPingOnPrimaryIfNecessary_()},Math.floor(vS))}sendPingOnPrimaryIfNecessary_(){!this.isHealthy_&&this.state_===1&&(this.log_("sending ping on primary."),this.sendData_({t:"c",d:{t:Sd,d:{}}}))}onSecondaryConnectionLost_(){const e=this.secondaryConn_;this.secondaryConn_=null,(this.tx_===e||this.rx_===e)&&this.close()}onConnectionLost_(e){this.conn_=null,!e&&this.state_===0?(this.log_("Realtime connection failed."),this.repoInfo_.isCacheableHost()&&(pn.remove("host:"+this.repoInfo_.host),this.repoInfo_.internalHost=this.repoInfo_.host)):this.state_===1&&this.log_("Realtime connection lost."),this.close()}onConnectionShutdown_(e){this.log_("Connection shutdown command received. Shutting down..."),this.onKill_&&(this.onKill_(e),this.onKill_=null),this.onDisconnect_=null,this.close()}sendData_(e){if(this.state_!==1)throw"Connection is not connected";this.tx_.send(e)}close(){this.state_!==2&&(this.log_("Closing realtime connection."),this.state_=2,this.closeConnections_(),this.onDisconnect_&&(this.onDisconnect_(),this.onDisconnect_=null))}closeConnections_(){this.log_("Shutting down all connections"),this.conn_&&(this.conn_.close(),this.conn_=null),this.secondaryConn_&&(this.secondaryConn_.close(),this.secondaryConn_=null),this.healthyTimeout_&&(clearTimeout(this.healthyTimeout_),this.healthyTimeout_=null)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class _p{put(e,n,s,r){}merge(e,n,s,r){}refreshAuthToken(e){}refreshAppCheckToken(e){}onDisconnectPut(e,n,s){}onDisconnectMerge(e,n,s){}onDisconnectCancel(e,n){}reportStats(e){}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class yp{constructor(e){this.allowedEvents_=e,this.listeners_={},g(Array.isArray(e)&&e.length>0,"Requires a non-empty array")}trigger(e,...n){if(Array.isArray(this.listeners_[e])){const s=[...this.listeners_[e]];for(let r=0;r<s.length;r++)s[r].callback.apply(s[r].context,n)}}on(e,n,s){this.validateEventType_(e),this.listeners_[e]=this.listeners_[e]||[],this.listeners_[e].push({callback:n,context:s});const r=this.getInitialEvent(e);r&&n.apply(s,r)}off(e,n,s){this.validateEventType_(e);const r=this.listeners_[e]||[];for(let i=0;i<r.length;i++)if(r[i].callback===n&&(!s||s===r[i].context)){r.splice(i,1);return}}validateEventType_(e){g(this.allowedEvents_.find(n=>n===e),"Unknown event: "+e)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ti extends yp{static getInstance(){return new Ti}constructor(){super(["online"]),this.online_=!0,typeof window<"u"&&typeof window.addEventListener<"u"&&!Dc()&&(window.addEventListener("online",()=>{this.online_||(this.online_=!0,this.trigger("online",!0))},!1),window.addEventListener("offline",()=>{this.online_&&(this.online_=!1,this.trigger("online",!1))},!1))}getInitialEvent(e){return g(e==="online","Unknown event type: "+e),[this.online_]}currentlyOnline(){return this.online_}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Td=32,Id=768;class M{constructor(e,n){if(n===void 0){this.pieces_=e.split("/");let s=0;for(let r=0;r<this.pieces_.length;r++)this.pieces_[r].length>0&&(this.pieces_[s]=this.pieces_[r],s++);this.pieces_.length=s,this.pieceNum_=0}else this.pieces_=e,this.pieceNum_=n}toString(){let e="";for(let n=this.pieceNum_;n<this.pieces_.length;n++)this.pieces_[n]!==""&&(e+="/"+this.pieces_[n]);return e||"/"}}function O(){return new M("")}function k(t){return t.pieceNum_>=t.pieces_.length?null:t.pieces_[t.pieceNum_]}function Yt(t){return t.pieces_.length-t.pieceNum_}function $(t){let e=t.pieceNum_;return e<t.pieces_.length&&e++,new M(t.pieces_,e)}function Vc(t){return t.pieceNum_<t.pieces_.length?t.pieces_[t.pieces_.length-1]:null}function kS(t){let e="";for(let n=t.pieceNum_;n<t.pieces_.length;n++)t.pieces_[n]!==""&&(e+="/"+encodeURIComponent(String(t.pieces_[n])));return e||"/"}function hr(t,e=0){return t.pieces_.slice(t.pieceNum_+e)}function Ep(t){if(t.pieceNum_>=t.pieces_.length)return null;const e=[];for(let n=t.pieceNum_;n<t.pieces_.length-1;n++)e.push(t.pieces_[n]);return new M(e,0)}function J(t,e){const n=[];for(let s=t.pieceNum_;s<t.pieces_.length;s++)n.push(t.pieces_[s]);if(e instanceof M)for(let s=e.pieceNum_;s<e.pieces_.length;s++)n.push(e.pieces_[s]);else{const s=e.split("/");for(let r=0;r<s.length;r++)s[r].length>0&&n.push(s[r])}return new M(n,0)}function N(t){return t.pieceNum_>=t.pieces_.length}function Ee(t,e){const n=k(t),s=k(e);if(n===null)return e;if(n===s)return Ee($(t),$(e));throw new Error("INTERNAL ERROR: innerPath ("+e+") is not within outerPath ("+t+")")}function RS(t,e){const n=hr(t,0),s=hr(e,0);for(let r=0;r<n.length&&r<s.length;r++){const i=Mn(n[r],s[r]);if(i!==0)return i}return n.length===s.length?0:n.length<s.length?-1:1}function Wc(t,e){if(Yt(t)!==Yt(e))return!1;for(let n=t.pieceNum_,s=e.pieceNum_;n<=t.pieces_.length;n++,s++)if(t.pieces_[n]!==e.pieces_[s])return!1;return!0}function Oe(t,e){let n=t.pieceNum_,s=e.pieceNum_;if(Yt(t)>Yt(e))return!1;for(;n<t.pieces_.length;){if(t.pieces_[n]!==e.pieces_[s])return!1;++n,++s}return!0}class AS{constructor(e,n){this.errorPrefix_=n,this.parts_=hr(e,0),this.byteLength_=Math.max(1,this.parts_.length);for(let s=0;s<this.parts_.length;s++)this.byteLength_+=co(this.parts_[s]);vp(this)}}function NS(t,e){t.parts_.length>0&&(t.byteLength_+=1),t.parts_.push(e),t.byteLength_+=co(e),vp(t)}function PS(t){const e=t.parts_.pop();t.byteLength_-=co(e),t.parts_.length>0&&(t.byteLength_-=1)}function vp(t){if(t.byteLength_>Id)throw new Error(t.errorPrefix_+"has a key path longer than "+Id+" bytes ("+t.byteLength_+").");if(t.parts_.length>Td)throw new Error(t.errorPrefix_+"path specified exceeds the maximum depth that can be written ("+Td+") or object contains a cycle "+un(t))}function un(t){return t.parts_.length===0?"":"in property '"+t.parts_.join(".")+"'"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class jc extends yp{static getInstance(){return new jc}constructor(){super(["visible"]);let e,n;typeof document<"u"&&typeof document.addEventListener<"u"&&(typeof document.hidden<"u"?(n="visibilitychange",e="hidden"):typeof document.mozHidden<"u"?(n="mozvisibilitychange",e="mozHidden"):typeof document.msHidden<"u"?(n="msvisibilitychange",e="msHidden"):typeof document.webkitHidden<"u"&&(n="webkitvisibilitychange",e="webkitHidden")),this.visible_=!0,n&&document.addEventListener(n,()=>{const s=!document[e];s!==this.visible_&&(this.visible_=s,this.trigger("visible",s))},!1)}getInitialEvent(e){return g(e==="visible","Unknown event type: "+e),[this.visible_]}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Us=1e3,LS=300*1e3,kd=30*1e3,OS=1.3,DS=3e4,MS="server_kill",Rd=3;class wt extends _p{constructor(e,n,s,r,i,o,a,c){if(super(),this.repoInfo_=e,this.applicationId_=n,this.onDataUpdate_=s,this.onConnectStatus_=r,this.onServerInfoUpdate_=i,this.authTokenProvider_=o,this.appCheckTokenProvider_=a,this.authOverride_=c,this.id=wt.nextPersistentConnectionId_++,this.log_=Pr("p:"+this.id+":"),this.interruptReasons_={},this.listens=new Map,this.outstandingPuts_=[],this.outstandingGets_=[],this.outstandingPutCount_=0,this.outstandingGetCount_=0,this.onDisconnectRequestQueue_=[],this.connected_=!1,this.reconnectDelay_=Us,this.maxReconnectDelay_=LS,this.securityDebugCallback_=null,this.lastSessionId=null,this.establishConnectionTimer_=null,this.visible_=!1,this.requestCBHash_={},this.requestNumber_=0,this.realtime_=null,this.authToken_=null,this.appCheckToken_=null,this.forceTokenRefresh_=!1,this.invalidAuthTokenCount_=0,this.invalidAppCheckTokenCount_=0,this.firstConnection_=!0,this.lastConnectionAttemptTime_=null,this.lastConnectionEstablishedTime_=null,c)throw new Error("Auth override specified in options, but not supported on non Node.js platforms");jc.getInstance().on("visible",this.onVisible_,this),e.host.indexOf("fblocal")===-1&&Ti.getInstance().on("online",this.onOnline_,this)}sendRequest(e,n,s){const r=++this.requestNumber_,i={r,a:e,b:n};this.log_(se(i)),g(this.connected_,"sendRequest call when we're not connected not allowed."),this.realtime_.sendRequest(i),s&&(this.requestCBHash_[r]=s)}get(e){this.initConnection_();const n=new Ce,r={action:"g",request:{p:e._path.toString(),q:e._queryObject},onComplete:o=>{const a=o.d;o.s==="ok"?n.resolve(a):n.reject(a)}};this.outstandingGets_.push(r),this.outstandingGetCount_++;const i=this.outstandingGets_.length-1;return this.connected_&&this.sendGet_(i),n.promise}listen(e,n,s,r){this.initConnection_();const i=e._queryIdentifier,o=e._path.toString();this.log_("Listen called for "+o+" "+i),this.listens.has(o)||this.listens.set(o,new Map),g(e._queryParams.isDefault()||!e._queryParams.loadsAllData(),"listen() called for non-default but complete query"),g(!this.listens.get(o).has(i),"listen() called twice for same path/queryId.");const a={onComplete:r,hashFn:n,query:e,tag:s};this.listens.get(o).set(i,a),this.connected_&&this.sendListen_(a)}sendGet_(e){const n=this.outstandingGets_[e];this.sendRequest("g",n.request,s=>{delete this.outstandingGets_[e],this.outstandingGetCount_--,this.outstandingGetCount_===0&&(this.outstandingGets_=[]),n.onComplete&&n.onComplete(s)})}sendListen_(e){const n=e.query,s=n._path.toString(),r=n._queryIdentifier;this.log_("Listen on "+s+" for "+r);const i={p:s},o="q";e.tag&&(i.q=n._queryObject,i.t=e.tag),i.h=e.hashFn(),this.sendRequest(o,i,a=>{const c=a.d,l=a.s;wt.warnOnListenWarnings_(c,n),(this.listens.get(s)&&this.listens.get(s).get(r))===e&&(this.log_("listen response",a),l!=="ok"&&this.removeListen_(s,r),e.onComplete&&e.onComplete(l,c))})}static warnOnListenWarnings_(e,n){if(e&&typeof e=="object"&&lt(e,"w")){const s=as(e,"w");if(Array.isArray(s)&&~s.indexOf("no_index")){const r='".indexOn": "'+n._queryParams.getIndex().toString()+'"',i=n._path.toString();ve(`Using an unspecified index. Your data will be downloaded and filtered on the client. Consider adding ${r} at ${i} to your security rules for better performance.`)}}}refreshAuthToken(e){this.authToken_=e,this.log_("Auth token refreshed"),this.authToken_?this.tryAuth():this.connected_&&this.sendRequest("unauth",{},()=>{}),this.reduceReconnectDelayIfAdminCredential_(e)}reduceReconnectDelayIfAdminCredential_(e){(e&&e.length===40||vb(e))&&(this.log_("Admin auth credential detected.  Reducing max reconnect time."),this.maxReconnectDelay_=kd)}refreshAppCheckToken(e){this.appCheckToken_=e,this.log_("App check token refreshed"),this.appCheckToken_?this.tryAppCheck():this.connected_&&this.sendRequest("unappeck",{},()=>{})}tryAuth(){if(this.connected_&&this.authToken_){const e=this.authToken_,n=Eb(e)?"auth":"gauth",s={cred:e};this.authOverride_===null?s.noauth=!0:typeof this.authOverride_=="object"&&(s.authvar=this.authOverride_),this.sendRequest(n,s,r=>{const i=r.s,o=r.d||"error";this.authToken_===e&&(i==="ok"?this.invalidAuthTokenCount_=0:this.onAuthRevoked_(i,o))})}}tryAppCheck(){this.connected_&&this.appCheckToken_&&this.sendRequest("appcheck",{token:this.appCheckToken_},e=>{const n=e.s,s=e.d||"error";n==="ok"?this.invalidAppCheckTokenCount_=0:this.onAppCheckRevoked_(n,s)})}unlisten(e,n){const s=e._path.toString(),r=e._queryIdentifier;this.log_("Unlisten called for "+s+" "+r),g(e._queryParams.isDefault()||!e._queryParams.loadsAllData(),"unlisten() called for non-default but complete query"),this.removeListen_(s,r)&&this.connected_&&this.sendUnlisten_(s,r,e._queryObject,n)}sendUnlisten_(e,n,s,r){this.log_("Unlisten on "+e+" for "+n);const i={p:e},o="n";r&&(i.q=s,i.t=r),this.sendRequest(o,i)}onDisconnectPut(e,n,s){this.initConnection_(),this.connected_?this.sendOnDisconnect_("o",e,n,s):this.onDisconnectRequestQueue_.push({pathString:e,action:"o",data:n,onComplete:s})}onDisconnectMerge(e,n,s){this.initConnection_(),this.connected_?this.sendOnDisconnect_("om",e,n,s):this.onDisconnectRequestQueue_.push({pathString:e,action:"om",data:n,onComplete:s})}onDisconnectCancel(e,n){this.initConnection_(),this.connected_?this.sendOnDisconnect_("oc",e,null,n):this.onDisconnectRequestQueue_.push({pathString:e,action:"oc",data:null,onComplete:n})}sendOnDisconnect_(e,n,s,r){const i={p:n,d:s};this.log_("onDisconnect "+e,i),this.sendRequest(e,i,o=>{r&&setTimeout(()=>{r(o.s,o.d)},Math.floor(0))})}put(e,n,s,r){this.putInternal("p",e,n,s,r)}merge(e,n,s,r){this.putInternal("m",e,n,s,r)}putInternal(e,n,s,r,i){this.initConnection_();const o={p:n,d:s};i!==void 0&&(o.h=i),this.outstandingPuts_.push({action:e,request:o,onComplete:r}),this.outstandingPutCount_++;const a=this.outstandingPuts_.length-1;this.connected_?this.sendPut_(a):this.log_("Buffering put: "+n)}sendPut_(e){const n=this.outstandingPuts_[e].action,s=this.outstandingPuts_[e].request,r=this.outstandingPuts_[e].onComplete;this.outstandingPuts_[e].queued=this.connected_,this.sendRequest(n,s,i=>{this.log_(n+" response",i),delete this.outstandingPuts_[e],this.outstandingPutCount_--,this.outstandingPutCount_===0&&(this.outstandingPuts_=[]),r&&r(i.s,i.d)})}reportStats(e){if(this.connected_){const n={c:e};this.log_("reportStats",n),this.sendRequest("s",n,s=>{if(s.s!=="ok"){const i=s.d;this.log_("reportStats","Error sending stats: "+i)}})}}onDataMessage_(e){if("r"in e){this.log_("from server: "+se(e));const n=e.r,s=this.requestCBHash_[n];s&&(delete this.requestCBHash_[n],s(e.b))}else{if("error"in e)throw"A server-side error has occurred: "+e.error;"a"in e&&this.onDataPush_(e.a,e.b)}}onDataPush_(e,n){this.log_("handleServerMessage",e,n),e==="d"?this.onDataUpdate_(n.p,n.d,!1,n.t):e==="m"?this.onDataUpdate_(n.p,n.d,!0,n.t):e==="c"?this.onListenRevoked_(n.p,n.q):e==="ac"?this.onAuthRevoked_(n.s,n.d):e==="apc"?this.onAppCheckRevoked_(n.s,n.d):e==="sd"?this.onSecurityDebugPacket_(n):Ua("Unrecognized action received from server: "+se(e)+`
Are you using the latest client?`)}onReady_(e,n){this.log_("connection ready"),this.connected_=!0,this.lastConnectionEstablishedTime_=new Date().getTime(),this.handleTimestamp_(e),this.lastSessionId=n,this.firstConnection_&&this.sendConnectStats_(),this.restoreState_(),this.firstConnection_=!1,this.onConnectStatus_(!0)}scheduleConnect_(e){g(!this.realtime_,"Scheduling a connect when we're already connected/ing?"),this.establishConnectionTimer_&&clearTimeout(this.establishConnectionTimer_),this.establishConnectionTimer_=setTimeout(()=>{this.establishConnectionTimer_=null,this.establishConnection_()},Math.floor(e))}initConnection_(){!this.realtime_&&this.firstConnection_&&this.scheduleConnect_(0)}onVisible_(e){e&&!this.visible_&&this.reconnectDelay_===this.maxReconnectDelay_&&(this.log_("Window became visible.  Reducing delay."),this.reconnectDelay_=Us,this.realtime_||this.scheduleConnect_(0)),this.visible_=e}onOnline_(e){e?(this.log_("Browser went online."),this.reconnectDelay_=Us,this.realtime_||this.scheduleConnect_(0)):(this.log_("Browser went offline.  Killing connection."),this.realtime_&&this.realtime_.close())}onRealtimeDisconnect_(){if(this.log_("data client disconnected"),this.connected_=!1,this.realtime_=null,this.cancelSentTransactions_(),this.requestCBHash_={},this.shouldReconnect_()){this.visible_?this.lastConnectionEstablishedTime_&&(new Date().getTime()-this.lastConnectionEstablishedTime_>DS&&(this.reconnectDelay_=Us),this.lastConnectionEstablishedTime_=null):(this.log_("Window isn't visible.  Delaying reconnect."),this.reconnectDelay_=this.maxReconnectDelay_,this.lastConnectionAttemptTime_=new Date().getTime());const e=Math.max(0,new Date().getTime()-this.lastConnectionAttemptTime_);let n=Math.max(0,this.reconnectDelay_-e);n=Math.random()*n,this.log_("Trying to reconnect in "+n+"ms"),this.scheduleConnect_(n),this.reconnectDelay_=Math.min(this.maxReconnectDelay_,this.reconnectDelay_*OS)}this.onConnectStatus_(!1)}async establishConnection_(){if(this.shouldReconnect_()){this.log_("Making a connection attempt"),this.lastConnectionAttemptTime_=new Date().getTime(),this.lastConnectionEstablishedTime_=null;const e=this.onDataMessage_.bind(this),n=this.onReady_.bind(this),s=this.onRealtimeDisconnect_.bind(this),r=this.id+":"+wt.nextConnectionId_++,i=this.lastSessionId;let o=!1,a=null;const c=function(){a?a.close():(o=!0,s())},l=function(d){g(a,"sendRequest call when we're not connected not allowed."),a.sendRequest(d)};this.realtime_={close:c,sendRequest:l};const u=this.forceTokenRefresh_;this.forceTokenRefresh_=!1;try{const[d,h]=await Promise.all([this.authTokenProvider_.getToken(u),this.appCheckTokenProvider_.getToken(u)]);o?ce("getToken() completed but was canceled"):(ce("getToken() completed. Creating connection."),this.authToken_=d&&d.accessToken,this.appCheckToken_=h&&h.token,a=new IS(r,this.repoInfo_,this.applicationId_,this.appCheckToken_,this.authToken_,e,n,s,f=>{ve(f+" ("+this.repoInfo_.toString()+")"),this.interrupt(MS)},i))}catch(d){this.log_("Failed to get token: "+d),o||(this.repoInfo_.nodeAdmin&&ve(d),c())}}}interrupt(e){ce("Interrupting connection for reason: "+e),this.interruptReasons_[e]=!0,this.realtime_?this.realtime_.close():(this.establishConnectionTimer_&&(clearTimeout(this.establishConnectionTimer_),this.establishConnectionTimer_=null),this.connected_&&this.onRealtimeDisconnect_())}resume(e){ce("Resuming connection for reason: "+e),delete this.interruptReasons_[e],wi(this.interruptReasons_)&&(this.reconnectDelay_=Us,this.realtime_||this.scheduleConnect_(0))}handleTimestamp_(e){const n=e-new Date().getTime();this.onServerInfoUpdate_({serverTimeOffset:n})}cancelSentTransactions_(){for(let e=0;e<this.outstandingPuts_.length;e++){const n=this.outstandingPuts_[e];n&&"h"in n.request&&n.queued&&(n.onComplete&&n.onComplete("disconnect"),delete this.outstandingPuts_[e],this.outstandingPutCount_--)}this.outstandingPutCount_===0&&(this.outstandingPuts_=[])}onListenRevoked_(e,n){let s;n?s=n.map(i=>Uc(i)).join("$"):s="default";const r=this.removeListen_(e,s);r&&r.onComplete&&r.onComplete("permission_denied")}removeListen_(e,n){const s=new M(e).toString();let r;if(this.listens.has(s)){const i=this.listens.get(s);r=i.get(n),i.delete(n),i.size===0&&this.listens.delete(s)}else r=void 0;return r}onAuthRevoked_(e,n){ce("Auth token revoked: "+e+"/"+n),this.authToken_=null,this.forceTokenRefresh_=!0,this.realtime_.close(),(e==="invalid_token"||e==="permission_denied")&&(this.invalidAuthTokenCount_++,this.invalidAuthTokenCount_>=Rd&&(this.reconnectDelay_=kd,this.authTokenProvider_.notifyForInvalidToken()))}onAppCheckRevoked_(e,n){ce("App check token revoked: "+e+"/"+n),this.appCheckToken_=null,this.forceTokenRefresh_=!0,(e==="invalid_token"||e==="permission_denied")&&(this.invalidAppCheckTokenCount_++,this.invalidAppCheckTokenCount_>=Rd&&this.appCheckTokenProvider_.notifyForInvalidToken())}onSecurityDebugPacket_(e){this.securityDebugCallback_?this.securityDebugCallback_(e):"msg"in e&&console.log("FIREBASE: "+e.msg.replace(`
`,`
FIREBASE: `))}restoreState_(){this.tryAuth(),this.tryAppCheck();for(const e of this.listens.values())for(const n of e.values())this.sendListen_(n);for(let e=0;e<this.outstandingPuts_.length;e++)this.outstandingPuts_[e]&&this.sendPut_(e);for(;this.onDisconnectRequestQueue_.length;){const e=this.onDisconnectRequestQueue_.shift();this.sendOnDisconnect_(e.action,e.pathString,e.data,e.onComplete)}for(let e=0;e<this.outstandingGets_.length;e++)this.outstandingGets_[e]&&this.sendGet_(e)}sendConnectStats_(){const e={};let n="js";e["sdk."+n+"."+Kf.replace(/\./g,"-")]=1,Dc()?e["framework.cordova"]=1:Vf()&&(e["framework.reactnative"]=1),this.reportStats(e)}shouldReconnect_(){const e=Ti.getInstance().currentlyOnline();return wi(this.interruptReasons_)&&e}}wt.nextPersistentConnectionId_=0;wt.nextConnectionId_=0;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class P{constructor(e,n){this.name=e,this.node=n}static Wrap(e,n){return new P(e,n)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ho{getCompare(){return this.compare.bind(this)}indexedValueChanged(e,n){const s=new P(ls,e),r=new P(ls,n);return this.compare(s,r)!==0}minPost(){return P.MIN}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Jr;class wp extends ho{static get __EMPTY_NODE(){return Jr}static set __EMPTY_NODE(e){Jr=e}compare(e,n){return Mn(e.name,n.name)}isDefinedOn(e){throw ws("KeyIndex.isDefinedOn not expected to be called.")}indexedValueChanged(e,n){return!1}minPost(){return P.MIN}maxPost(){return new P(Tn,Jr)}makePost(e,n){return g(typeof e=="string","KeyIndex indexValue must always be a string."),new P(e,Jr)}toString(){return".key"}}const qn=new wp;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Xr{constructor(e,n,s,r,i=null){this.isReverse_=r,this.resultGenerator_=i,this.nodeStack_=[];let o=1;for(;!e.isEmpty();)if(e=e,o=n?s(e.key,n):1,r&&(o*=-1),o<0)this.isReverse_?e=e.left:e=e.right;else if(o===0){this.nodeStack_.push(e);break}else this.nodeStack_.push(e),this.isReverse_?e=e.right:e=e.left}getNext(){if(this.nodeStack_.length===0)return null;let e=this.nodeStack_.pop(),n;if(this.resultGenerator_?n=this.resultGenerator_(e.key,e.value):n={key:e.key,value:e.value},this.isReverse_)for(e=e.left;!e.isEmpty();)this.nodeStack_.push(e),e=e.right;else for(e=e.right;!e.isEmpty();)this.nodeStack_.push(e),e=e.left;return n}hasNext(){return this.nodeStack_.length>0}peek(){if(this.nodeStack_.length===0)return null;const e=this.nodeStack_[this.nodeStack_.length-1];return this.resultGenerator_?this.resultGenerator_(e.key,e.value):{key:e.key,value:e.value}}}class ae{constructor(e,n,s,r,i){this.key=e,this.value=n,this.color=s??ae.RED,this.left=r??Se.EMPTY_NODE,this.right=i??Se.EMPTY_NODE}copy(e,n,s,r,i){return new ae(e??this.key,n??this.value,s??this.color,r??this.left,i??this.right)}count(){return this.left.count()+1+this.right.count()}isEmpty(){return!1}inorderTraversal(e){return this.left.inorderTraversal(e)||!!e(this.key,this.value)||this.right.inorderTraversal(e)}reverseTraversal(e){return this.right.reverseTraversal(e)||e(this.key,this.value)||this.left.reverseTraversal(e)}min_(){return this.left.isEmpty()?this:this.left.min_()}minKey(){return this.min_().key}maxKey(){return this.right.isEmpty()?this.key:this.right.maxKey()}insert(e,n,s){let r=this;const i=s(e,r.key);return i<0?r=r.copy(null,null,null,r.left.insert(e,n,s),null):i===0?r=r.copy(null,n,null,null,null):r=r.copy(null,null,null,null,r.right.insert(e,n,s)),r.fixUp_()}removeMin_(){if(this.left.isEmpty())return Se.EMPTY_NODE;let e=this;return!e.left.isRed_()&&!e.left.left.isRed_()&&(e=e.moveRedLeft_()),e=e.copy(null,null,null,e.left.removeMin_(),null),e.fixUp_()}remove(e,n){let s,r;if(s=this,n(e,s.key)<0)!s.left.isEmpty()&&!s.left.isRed_()&&!s.left.left.isRed_()&&(s=s.moveRedLeft_()),s=s.copy(null,null,null,s.left.remove(e,n),null);else{if(s.left.isRed_()&&(s=s.rotateRight_()),!s.right.isEmpty()&&!s.right.isRed_()&&!s.right.left.isRed_()&&(s=s.moveRedRight_()),n(e,s.key)===0){if(s.right.isEmpty())return Se.EMPTY_NODE;r=s.right.min_(),s=s.copy(r.key,r.value,null,null,s.right.removeMin_())}s=s.copy(null,null,null,null,s.right.remove(e,n))}return s.fixUp_()}isRed_(){return this.color}fixUp_(){let e=this;return e.right.isRed_()&&!e.left.isRed_()&&(e=e.rotateLeft_()),e.left.isRed_()&&e.left.left.isRed_()&&(e=e.rotateRight_()),e.left.isRed_()&&e.right.isRed_()&&(e=e.colorFlip_()),e}moveRedLeft_(){let e=this.colorFlip_();return e.right.left.isRed_()&&(e=e.copy(null,null,null,null,e.right.rotateRight_()),e=e.rotateLeft_(),e=e.colorFlip_()),e}moveRedRight_(){let e=this.colorFlip_();return e.left.left.isRed_()&&(e=e.rotateRight_(),e=e.colorFlip_()),e}rotateLeft_(){const e=this.copy(null,null,ae.RED,null,this.right.left);return this.right.copy(null,null,this.color,e,null)}rotateRight_(){const e=this.copy(null,null,ae.RED,this.left.right,null);return this.left.copy(null,null,this.color,null,e)}colorFlip_(){const e=this.left.copy(null,null,!this.left.color,null,null),n=this.right.copy(null,null,!this.right.color,null,null);return this.copy(null,null,!this.color,e,n)}checkMaxDepth_(){const e=this.check_();return Math.pow(2,e)<=this.count()+1}check_(){if(this.isRed_()&&this.left.isRed_())throw new Error("Red node has red child("+this.key+","+this.value+")");if(this.right.isRed_())throw new Error("Right child of ("+this.key+","+this.value+") is red");const e=this.left.check_();if(e!==this.right.check_())throw new Error("Black depths differ");return e+(this.isRed_()?0:1)}}ae.RED=!0;ae.BLACK=!1;class xS{copy(e,n,s,r,i){return this}insert(e,n,s){return new ae(e,n,null)}remove(e,n){return this}count(){return 0}isEmpty(){return!0}inorderTraversal(e){return!1}reverseTraversal(e){return!1}minKey(){return null}maxKey(){return null}check_(){return 0}isRed_(){return!1}}class Se{constructor(e,n=Se.EMPTY_NODE){this.comparator_=e,this.root_=n}insert(e,n){return new Se(this.comparator_,this.root_.insert(e,n,this.comparator_).copy(null,null,ae.BLACK,null,null))}remove(e){return new Se(this.comparator_,this.root_.remove(e,this.comparator_).copy(null,null,ae.BLACK,null,null))}get(e){let n,s=this.root_;for(;!s.isEmpty();){if(n=this.comparator_(e,s.key),n===0)return s.value;n<0?s=s.left:n>0&&(s=s.right)}return null}getPredecessorKey(e){let n,s=this.root_,r=null;for(;!s.isEmpty();)if(n=this.comparator_(e,s.key),n===0){if(s.left.isEmpty())return r?r.key:null;for(s=s.left;!s.right.isEmpty();)s=s.right;return s.key}else n<0?s=s.left:n>0&&(r=s,s=s.right);throw new Error("Attempted to find predecessor key for a nonexistent key.  What gives?")}isEmpty(){return this.root_.isEmpty()}count(){return this.root_.count()}minKey(){return this.root_.minKey()}maxKey(){return this.root_.maxKey()}inorderTraversal(e){return this.root_.inorderTraversal(e)}reverseTraversal(e){return this.root_.reverseTraversal(e)}getIterator(e){return new Xr(this.root_,null,this.comparator_,!1,e)}getIteratorFrom(e,n){return new Xr(this.root_,e,this.comparator_,!1,n)}getReverseIteratorFrom(e,n){return new Xr(this.root_,e,this.comparator_,!0,n)}getReverseIterator(e){return new Xr(this.root_,null,this.comparator_,!0,e)}}Se.EMPTY_NODE=new xS;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function FS(t,e){return Mn(t.name,e.name)}function zc(t,e){return Mn(t,e)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Ba;function US(t){Ba=t}const bp=function(t){return typeof t=="number"?"number:"+ep(t):"string:"+t},Cp=function(t){if(t.isLeafNode()){const e=t.val();g(typeof e=="string"||typeof e=="number"||typeof e=="object"&&lt(e,".sv"),"Priority must be a string or number.")}else g(t===Ba||t.isEmpty(),"priority of unexpected type.");g(t===Ba||t.getPriority().isEmpty(),"Priority nodes can't have a priority of their own.")};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Ad;class oe{static set __childrenNodeConstructor(e){Ad=e}static get __childrenNodeConstructor(){return Ad}constructor(e,n=oe.__childrenNodeConstructor.EMPTY_NODE){this.value_=e,this.priorityNode_=n,this.lazyHash_=null,g(this.value_!==void 0&&this.value_!==null,"LeafNode shouldn't be created with null/undefined value."),Cp(this.priorityNode_)}isLeafNode(){return!0}getPriority(){return this.priorityNode_}updatePriority(e){return new oe(this.value_,e)}getImmediateChild(e){return e===".priority"?this.priorityNode_:oe.__childrenNodeConstructor.EMPTY_NODE}getChild(e){return N(e)?this:k(e)===".priority"?this.priorityNode_:oe.__childrenNodeConstructor.EMPTY_NODE}hasChild(){return!1}getPredecessorChildName(e,n){return null}updateImmediateChild(e,n){return e===".priority"?this.updatePriority(n):n.isEmpty()&&e!==".priority"?this:oe.__childrenNodeConstructor.EMPTY_NODE.updateImmediateChild(e,n).updatePriority(this.priorityNode_)}updateChild(e,n){const s=k(e);return s===null?n:n.isEmpty()&&s!==".priority"?this:(g(s!==".priority"||Yt(e)===1,".priority must be the last token in a path"),this.updateImmediateChild(s,oe.__childrenNodeConstructor.EMPTY_NODE.updateChild($(e),n)))}isEmpty(){return!1}numChildren(){return 0}forEachChild(e,n){return!1}val(e){return e&&!this.getPriority().isEmpty()?{".value":this.getValue(),".priority":this.getPriority().val()}:this.getValue()}hash(){if(this.lazyHash_===null){let e="";this.priorityNode_.isEmpty()||(e+="priority:"+bp(this.priorityNode_.val())+":");const n=typeof this.value_;e+=n+":",n==="number"?e+=ep(this.value_):e+=this.value_,this.lazyHash_=Qf(e)}return this.lazyHash_}getValue(){return this.value_}compareTo(e){return e===oe.__childrenNodeConstructor.EMPTY_NODE?1:e instanceof oe.__childrenNodeConstructor?-1:(g(e.isLeafNode(),"Unknown node type"),this.compareToLeafNode_(e))}compareToLeafNode_(e){const n=typeof e.value_,s=typeof this.value_,r=oe.VALUE_TYPE_ORDER.indexOf(n),i=oe.VALUE_TYPE_ORDER.indexOf(s);return g(r>=0,"Unknown leaf type: "+n),g(i>=0,"Unknown leaf type: "+s),r===i?s==="object"?0:this.value_<e.value_?-1:this.value_===e.value_?0:1:i-r}withIndex(){return this}isIndexed(){return!0}equals(e){if(e===this)return!0;if(e.isLeafNode()){const n=e;return this.value_===n.value_&&this.priorityNode_.equals(n.priorityNode_)}else return!1}}oe.VALUE_TYPE_ORDER=["object","boolean","number","string"];/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Sp,Tp;function $S(t){Sp=t}function BS(t){Tp=t}class HS extends ho{compare(e,n){const s=e.node.getPriority(),r=n.node.getPriority(),i=s.compareTo(r);return i===0?Mn(e.name,n.name):i}isDefinedOn(e){return!e.getPriority().isEmpty()}indexedValueChanged(e,n){return!e.getPriority().equals(n.getPriority())}minPost(){return P.MIN}maxPost(){return new P(Tn,new oe("[PRIORITY-POST]",Tp))}makePost(e,n){const s=Sp(e);return new P(n,new oe("[PRIORITY-POST]",s))}toString(){return".priority"}}const X=new HS;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const VS=Math.log(2);class WS{constructor(e){const n=i=>parseInt(Math.log(i)/VS,10),s=i=>parseInt(Array(i+1).join("1"),2);this.count=n(e+1),this.current_=this.count-1;const r=s(this.count);this.bits_=e+1&r}nextBitIsOne(){const e=!(this.bits_&1<<this.current_);return this.current_--,e}}const Ii=function(t,e,n,s){t.sort(e);const r=function(c,l){const u=l-c;let d,h;if(u===0)return null;if(u===1)return d=t[c],h=n?n(d):d,new ae(h,d.node,ae.BLACK,null,null);{const f=parseInt(u/2,10)+c,p=r(c,f),_=r(f+1,l);return d=t[f],h=n?n(d):d,new ae(h,d.node,ae.BLACK,p,_)}},i=function(c){let l=null,u=null,d=t.length;const h=function(p,_){const m=d-p,R=d;d-=p;const W=r(m+1,R),j=t[m],v=n?n(j):j;f(new ae(v,j.node,_,null,W))},f=function(p){l?(l.left=p,l=p):(u=p,l=p)};for(let p=0;p<c.count;++p){const _=c.nextBitIsOne(),m=Math.pow(2,c.count-(p+1));_?h(m,ae.BLACK):(h(m,ae.BLACK),h(m,ae.RED))}return u},o=new WS(t.length),a=i(o);return new Se(s||e,a)};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let ea;const Un={};class ht{static get Default(){return g(Un&&X,"ChildrenNode.ts has not been loaded"),ea=ea||new ht({".priority":Un},{".priority":X}),ea}constructor(e,n){this.indexes_=e,this.indexSet_=n}get(e){const n=as(this.indexes_,e);if(!n)throw new Error("No index defined for "+e);return n instanceof Se?n:null}hasIndex(e){return lt(this.indexSet_,e.toString())}addIndex(e,n){g(e!==qn,"KeyIndex always exists and isn't meant to be added to the IndexMap.");const s=[];let r=!1;const i=n.getIterator(P.Wrap);let o=i.getNext();for(;o;)r=r||e.isDefinedOn(o.node),s.push(o),o=i.getNext();let a;r?a=Ii(s,e.getCompare()):a=Un;const c=e.toString(),l={...this.indexSet_};l[c]=e;const u={...this.indexes_};return u[c]=a,new ht(u,l)}addToIndexes(e,n){const s=bi(this.indexes_,(r,i)=>{const o=as(this.indexSet_,i);if(g(o,"Missing index implementation for "+i),r===Un)if(o.isDefinedOn(e.node)){const a=[],c=n.getIterator(P.Wrap);let l=c.getNext();for(;l;)l.name!==e.name&&a.push(l),l=c.getNext();return a.push(e),Ii(a,o.getCompare())}else return Un;else{const a=n.get(e.name);let c=r;return a&&(c=c.remove(new P(e.name,a))),c.insert(e,e.node)}});return new ht(s,this.indexSet_)}removeFromIndexes(e,n){const s=bi(this.indexes_,r=>{if(r===Un)return r;{const i=n.get(e.name);return i?r.remove(new P(e.name,i)):r}});return new ht(s,this.indexSet_)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let $s;class w{static get EMPTY_NODE(){return $s||($s=new w(new Se(zc),null,ht.Default))}constructor(e,n,s){this.children_=e,this.priorityNode_=n,this.indexMap_=s,this.lazyHash_=null,this.priorityNode_&&Cp(this.priorityNode_),this.children_.isEmpty()&&g(!this.priorityNode_||this.priorityNode_.isEmpty(),"An empty node cannot have a priority")}isLeafNode(){return!1}getPriority(){return this.priorityNode_||$s}updatePriority(e){return this.children_.isEmpty()?this:new w(this.children_,e,this.indexMap_)}getImmediateChild(e){if(e===".priority")return this.getPriority();{const n=this.children_.get(e);return n===null?$s:n}}getChild(e){const n=k(e);return n===null?this:this.getImmediateChild(n).getChild($(e))}hasChild(e){return this.children_.get(e)!==null}updateImmediateChild(e,n){if(g(n,"We should always be passing snapshot nodes"),e===".priority")return this.updatePriority(n);{const s=new P(e,n);let r,i;n.isEmpty()?(r=this.children_.remove(e),i=this.indexMap_.removeFromIndexes(s,this.children_)):(r=this.children_.insert(e,n),i=this.indexMap_.addToIndexes(s,this.children_));const o=r.isEmpty()?$s:this.priorityNode_;return new w(r,o,i)}}updateChild(e,n){const s=k(e);if(s===null)return n;{g(k(e)!==".priority"||Yt(e)===1,".priority must be the last token in a path");const r=this.getImmediateChild(s).updateChild($(e),n);return this.updateImmediateChild(s,r)}}isEmpty(){return this.children_.isEmpty()}numChildren(){return this.children_.count()}val(e){if(this.isEmpty())return null;const n={};let s=0,r=0,i=!0;if(this.forEachChild(X,(o,a)=>{n[o]=a.val(e),s++,i&&w.INTEGER_REGEXP_.test(o)?r=Math.max(r,Number(o)):i=!1}),!e&&i&&r<2*s){const o=[];for(const a in n)o[a]=n[a];return o}else return e&&!this.getPriority().isEmpty()&&(n[".priority"]=this.getPriority().val()),n}hash(){if(this.lazyHash_===null){let e="";this.getPriority().isEmpty()||(e+="priority:"+bp(this.getPriority().val())+":"),this.forEachChild(X,(n,s)=>{const r=s.hash();r!==""&&(e+=":"+n+":"+r)}),this.lazyHash_=e===""?"":Qf(e)}return this.lazyHash_}getPredecessorChildName(e,n,s){const r=this.resolveIndex_(s);if(r){const i=r.getPredecessorKey(new P(e,n));return i?i.name:null}else return this.children_.getPredecessorKey(e)}getFirstChildName(e){const n=this.resolveIndex_(e);if(n){const s=n.minKey();return s&&s.name}else return this.children_.minKey()}getFirstChild(e){const n=this.getFirstChildName(e);return n?new P(n,this.children_.get(n)):null}getLastChildName(e){const n=this.resolveIndex_(e);if(n){const s=n.maxKey();return s&&s.name}else return this.children_.maxKey()}getLastChild(e){const n=this.getLastChildName(e);return n?new P(n,this.children_.get(n)):null}forEachChild(e,n){const s=this.resolveIndex_(e);return s?s.inorderTraversal(r=>n(r.name,r.node)):this.children_.inorderTraversal(n)}getIterator(e){return this.getIteratorFrom(e.minPost(),e)}getIteratorFrom(e,n){const s=this.resolveIndex_(n);if(s)return s.getIteratorFrom(e,r=>r);{const r=this.children_.getIteratorFrom(e.name,P.Wrap);let i=r.peek();for(;i!=null&&n.compare(i,e)<0;)r.getNext(),i=r.peek();return r}}getReverseIterator(e){return this.getReverseIteratorFrom(e.maxPost(),e)}getReverseIteratorFrom(e,n){const s=this.resolveIndex_(n);if(s)return s.getReverseIteratorFrom(e,r=>r);{const r=this.children_.getReverseIteratorFrom(e.name,P.Wrap);let i=r.peek();for(;i!=null&&n.compare(i,e)>0;)r.getNext(),i=r.peek();return r}}compareTo(e){return this.isEmpty()?e.isEmpty()?0:-1:e.isLeafNode()||e.isEmpty()?1:e===Lr?-1:0}withIndex(e){if(e===qn||this.indexMap_.hasIndex(e))return this;{const n=this.indexMap_.addIndex(e,this.children_);return new w(this.children_,this.priorityNode_,n)}}isIndexed(e){return e===qn||this.indexMap_.hasIndex(e)}equals(e){if(e===this)return!0;if(e.isLeafNode())return!1;{const n=e;if(this.getPriority().equals(n.getPriority()))if(this.children_.count()===n.children_.count()){const s=this.getIterator(X),r=n.getIterator(X);let i=s.getNext(),o=r.getNext();for(;i&&o;){if(i.name!==o.name||!i.node.equals(o.node))return!1;i=s.getNext(),o=r.getNext()}return i===null&&o===null}else return!1;else return!1}}resolveIndex_(e){return e===qn?null:this.indexMap_.get(e.toString())}}w.INTEGER_REGEXP_=/^(0|[1-9]\d*)$/;class jS extends w{constructor(){super(new Se(zc),w.EMPTY_NODE,ht.Default)}compareTo(e){return e===this?0:1}equals(e){return e===this}getPriority(){return this}getImmediateChild(e){return w.EMPTY_NODE}isEmpty(){return!1}}const Lr=new jS;Object.defineProperties(P,{MIN:{value:new P(ls,w.EMPTY_NODE)},MAX:{value:new P(Tn,Lr)}});wp.__EMPTY_NODE=w.EMPTY_NODE;oe.__childrenNodeConstructor=w;US(Lr);BS(Lr);/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const zS=!0;function Q(t,e=null){if(t===null)return w.EMPTY_NODE;if(typeof t=="object"&&".priority"in t&&(e=t[".priority"]),g(e===null||typeof e=="string"||typeof e=="number"||typeof e=="object"&&".sv"in e,"Invalid priority type found: "+typeof e),typeof t=="object"&&".value"in t&&t[".value"]!==null&&(t=t[".value"]),typeof t!="object"||".sv"in t){const n=t;return new oe(n,Q(e))}if(!(t instanceof Array)&&zS){const n=[];let s=!1;if(le(t,(o,a)=>{if(o.substring(0,1)!=="."){const c=Q(a);c.isEmpty()||(s=s||!c.getPriority().isEmpty(),n.push(new P(o,c)))}}),n.length===0)return w.EMPTY_NODE;const i=Ii(n,FS,o=>o.name,zc);if(s){const o=Ii(n,X.getCompare());return new w(i,Q(e),new ht({".priority":o},{".priority":X}))}else return new w(i,Q(e),ht.Default)}else{let n=w.EMPTY_NODE;return le(t,(s,r)=>{if(lt(t,s)&&s.substring(0,1)!=="."){const i=Q(r);(i.isLeafNode()||!i.isEmpty())&&(n=n.updateImmediateChild(s,i))}}),n.updatePriority(Q(e))}}$S(Q);/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class qS extends ho{constructor(e){super(),this.indexPath_=e,g(!N(e)&&k(e)!==".priority","Can't create PathIndex with empty path or .priority key")}extractChild(e){return e.getChild(this.indexPath_)}isDefinedOn(e){return!e.getChild(this.indexPath_).isEmpty()}compare(e,n){const s=this.extractChild(e.node),r=this.extractChild(n.node),i=s.compareTo(r);return i===0?Mn(e.name,n.name):i}makePost(e,n){const s=Q(e),r=w.EMPTY_NODE.updateChild(this.indexPath_,s);return new P(n,r)}maxPost(){const e=w.EMPTY_NODE.updateChild(this.indexPath_,Lr);return new P(Tn,e)}toString(){return hr(this.indexPath_,0).join("/")}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class GS extends ho{compare(e,n){const s=e.node.compareTo(n.node);return s===0?Mn(e.name,n.name):s}isDefinedOn(e){return!0}indexedValueChanged(e,n){return!e.equals(n)}minPost(){return P.MIN}maxPost(){return P.MAX}makePost(e,n){const s=Q(e);return new P(n,s)}toString(){return".value"}}const YS=new GS;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ip(t){return{type:"value",snapshotNode:t}}function us(t,e){return{type:"child_added",snapshotNode:e,childName:t}}function fr(t,e){return{type:"child_removed",snapshotNode:e,childName:t}}function pr(t,e,n){return{type:"child_changed",snapshotNode:e,childName:t,oldSnap:n}}function KS(t,e){return{type:"child_moved",snapshotNode:e,childName:t}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class qc{constructor(e){this.index_=e}updateChild(e,n,s,r,i,o){g(e.isIndexed(this.index_),"A node must be indexed if only a child is updated");const a=e.getImmediateChild(n);return a.getChild(r).equals(s.getChild(r))&&a.isEmpty()===s.isEmpty()||(o!=null&&(s.isEmpty()?e.hasChild(n)?o.trackChildChange(fr(n,a)):g(e.isLeafNode(),"A child remove without an old child only makes sense on a leaf node"):a.isEmpty()?o.trackChildChange(us(n,s)):o.trackChildChange(pr(n,s,a))),e.isLeafNode()&&s.isEmpty())?e:e.updateImmediateChild(n,s).withIndex(this.index_)}updateFullNode(e,n,s){return s!=null&&(e.isLeafNode()||e.forEachChild(X,(r,i)=>{n.hasChild(r)||s.trackChildChange(fr(r,i))}),n.isLeafNode()||n.forEachChild(X,(r,i)=>{if(e.hasChild(r)){const o=e.getImmediateChild(r);o.equals(i)||s.trackChildChange(pr(r,i,o))}else s.trackChildChange(us(r,i))})),n.withIndex(this.index_)}updatePriority(e,n){return e.isEmpty()?w.EMPTY_NODE:e.updatePriority(n)}filtersNodes(){return!1}getIndexedFilter(){return this}getIndex(){return this.index_}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class gr{constructor(e){this.indexedFilter_=new qc(e.getIndex()),this.index_=e.getIndex(),this.startPost_=gr.getStartPost_(e),this.endPost_=gr.getEndPost_(e),this.startIsInclusive_=!e.startAfterSet_,this.endIsInclusive_=!e.endBeforeSet_}getStartPost(){return this.startPost_}getEndPost(){return this.endPost_}matches(e){const n=this.startIsInclusive_?this.index_.compare(this.getStartPost(),e)<=0:this.index_.compare(this.getStartPost(),e)<0,s=this.endIsInclusive_?this.index_.compare(e,this.getEndPost())<=0:this.index_.compare(e,this.getEndPost())<0;return n&&s}updateChild(e,n,s,r,i,o){return this.matches(new P(n,s))||(s=w.EMPTY_NODE),this.indexedFilter_.updateChild(e,n,s,r,i,o)}updateFullNode(e,n,s){n.isLeafNode()&&(n=w.EMPTY_NODE);let r=n.withIndex(this.index_);r=r.updatePriority(w.EMPTY_NODE);const i=this;return n.forEachChild(X,(o,a)=>{i.matches(new P(o,a))||(r=r.updateImmediateChild(o,w.EMPTY_NODE))}),this.indexedFilter_.updateFullNode(e,r,s)}updatePriority(e,n){return e}filtersNodes(){return!0}getIndexedFilter(){return this.indexedFilter_}getIndex(){return this.index_}static getStartPost_(e){if(e.hasStart()){const n=e.getIndexStartName();return e.getIndex().makePost(e.getIndexStartValue(),n)}else return e.getIndex().minPost()}static getEndPost_(e){if(e.hasEnd()){const n=e.getIndexEndName();return e.getIndex().makePost(e.getIndexEndValue(),n)}else return e.getIndex().maxPost()}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class JS{constructor(e){this.withinDirectionalStart=n=>this.reverse_?this.withinEndPost(n):this.withinStartPost(n),this.withinDirectionalEnd=n=>this.reverse_?this.withinStartPost(n):this.withinEndPost(n),this.withinStartPost=n=>{const s=this.index_.compare(this.rangedFilter_.getStartPost(),n);return this.startIsInclusive_?s<=0:s<0},this.withinEndPost=n=>{const s=this.index_.compare(n,this.rangedFilter_.getEndPost());return this.endIsInclusive_?s<=0:s<0},this.rangedFilter_=new gr(e),this.index_=e.getIndex(),this.limit_=e.getLimit(),this.reverse_=!e.isViewFromLeft(),this.startIsInclusive_=!e.startAfterSet_,this.endIsInclusive_=!e.endBeforeSet_}updateChild(e,n,s,r,i,o){return this.rangedFilter_.matches(new P(n,s))||(s=w.EMPTY_NODE),e.getImmediateChild(n).equals(s)?e:e.numChildren()<this.limit_?this.rangedFilter_.getIndexedFilter().updateChild(e,n,s,r,i,o):this.fullLimitUpdateChild_(e,n,s,i,o)}updateFullNode(e,n,s){let r;if(n.isLeafNode()||n.isEmpty())r=w.EMPTY_NODE.withIndex(this.index_);else if(this.limit_*2<n.numChildren()&&n.isIndexed(this.index_)){r=w.EMPTY_NODE.withIndex(this.index_);let i;this.reverse_?i=n.getReverseIteratorFrom(this.rangedFilter_.getEndPost(),this.index_):i=n.getIteratorFrom(this.rangedFilter_.getStartPost(),this.index_);let o=0;for(;i.hasNext()&&o<this.limit_;){const a=i.getNext();if(this.withinDirectionalStart(a))if(this.withinDirectionalEnd(a))r=r.updateImmediateChild(a.name,a.node),o++;else break;else continue}}else{r=n.withIndex(this.index_),r=r.updatePriority(w.EMPTY_NODE);let i;this.reverse_?i=r.getReverseIterator(this.index_):i=r.getIterator(this.index_);let o=0;for(;i.hasNext();){const a=i.getNext();o<this.limit_&&this.withinDirectionalStart(a)&&this.withinDirectionalEnd(a)?o++:r=r.updateImmediateChild(a.name,w.EMPTY_NODE)}}return this.rangedFilter_.getIndexedFilter().updateFullNode(e,r,s)}updatePriority(e,n){return e}filtersNodes(){return!0}getIndexedFilter(){return this.rangedFilter_.getIndexedFilter()}getIndex(){return this.index_}fullLimitUpdateChild_(e,n,s,r,i){let o;if(this.reverse_){const d=this.index_.getCompare();o=(h,f)=>d(f,h)}else o=this.index_.getCompare();const a=e;g(a.numChildren()===this.limit_,"");const c=new P(n,s),l=this.reverse_?a.getFirstChild(this.index_):a.getLastChild(this.index_),u=this.rangedFilter_.matches(c);if(a.hasChild(n)){const d=a.getImmediateChild(n);let h=r.getChildAfterChild(this.index_,l,this.reverse_);for(;h!=null&&(h.name===n||a.hasChild(h.name));)h=r.getChildAfterChild(this.index_,h,this.reverse_);const f=h==null?1:o(h,c);if(u&&!s.isEmpty()&&f>=0)return i?.trackChildChange(pr(n,s,d)),a.updateImmediateChild(n,s);{i?.trackChildChange(fr(n,d));const _=a.updateImmediateChild(n,w.EMPTY_NODE);return h!=null&&this.rangedFilter_.matches(h)?(i?.trackChildChange(us(h.name,h.node)),_.updateImmediateChild(h.name,h.node)):_}}else return s.isEmpty()?e:u&&o(l,c)>=0?(i!=null&&(i.trackChildChange(fr(l.name,l.node)),i.trackChildChange(us(n,s))),a.updateImmediateChild(n,s).updateImmediateChild(l.name,w.EMPTY_NODE)):e}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class fo{constructor(){this.limitSet_=!1,this.startSet_=!1,this.startNameSet_=!1,this.startAfterSet_=!1,this.endSet_=!1,this.endNameSet_=!1,this.endBeforeSet_=!1,this.limit_=0,this.viewFrom_="",this.indexStartValue_=null,this.indexStartName_="",this.indexEndValue_=null,this.indexEndName_="",this.index_=X}hasStart(){return this.startSet_}isViewFromLeft(){return this.viewFrom_===""?this.startSet_:this.viewFrom_==="l"}getIndexStartValue(){return g(this.startSet_,"Only valid if start has been set"),this.indexStartValue_}getIndexStartName(){return g(this.startSet_,"Only valid if start has been set"),this.startNameSet_?this.indexStartName_:ls}hasEnd(){return this.endSet_}getIndexEndValue(){return g(this.endSet_,"Only valid if end has been set"),this.indexEndValue_}getIndexEndName(){return g(this.endSet_,"Only valid if end has been set"),this.endNameSet_?this.indexEndName_:Tn}hasLimit(){return this.limitSet_}hasAnchoredLimit(){return this.limitSet_&&this.viewFrom_!==""}getLimit(){return g(this.limitSet_,"Only valid if limit has been set"),this.limit_}getIndex(){return this.index_}loadsAllData(){return!(this.startSet_||this.endSet_||this.limitSet_)}isDefault(){return this.loadsAllData()&&this.index_===X}copy(){const e=new fo;return e.limitSet_=this.limitSet_,e.limit_=this.limit_,e.startSet_=this.startSet_,e.startAfterSet_=this.startAfterSet_,e.indexStartValue_=this.indexStartValue_,e.startNameSet_=this.startNameSet_,e.indexStartName_=this.indexStartName_,e.endSet_=this.endSet_,e.endBeforeSet_=this.endBeforeSet_,e.indexEndValue_=this.indexEndValue_,e.endNameSet_=this.endNameSet_,e.indexEndName_=this.indexEndName_,e.index_=this.index_,e.viewFrom_=this.viewFrom_,e}}function XS(t){return t.loadsAllData()?new qc(t.getIndex()):t.hasLimit()?new JS(t):new gr(t)}function Nd(t){const e={};if(t.isDefault())return e;let n;if(t.index_===X?n="$priority":t.index_===YS?n="$value":t.index_===qn?n="$key":(g(t.index_ instanceof qS,"Unrecognized index type!"),n=t.index_.toString()),e.orderBy=se(n),t.startSet_){const s=t.startAfterSet_?"startAfter":"startAt";e[s]=se(t.indexStartValue_),t.startNameSet_&&(e[s]+=","+se(t.indexStartName_))}if(t.endSet_){const s=t.endBeforeSet_?"endBefore":"endAt";e[s]=se(t.indexEndValue_),t.endNameSet_&&(e[s]+=","+se(t.indexEndName_))}return t.limitSet_&&(t.isViewFromLeft()?e.limitToFirst=t.limit_:e.limitToLast=t.limit_),e}function Pd(t){const e={};if(t.startSet_&&(e.sp=t.indexStartValue_,t.startNameSet_&&(e.sn=t.indexStartName_),e.sin=!t.startAfterSet_),t.endSet_&&(e.ep=t.indexEndValue_,t.endNameSet_&&(e.en=t.indexEndName_),e.ein=!t.endBeforeSet_),t.limitSet_){e.l=t.limit_;let n=t.viewFrom_;n===""&&(t.isViewFromLeft()?n="l":n="r"),e.vf=n}return t.index_!==X&&(e.i=t.index_.toString()),e}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ki extends _p{reportStats(e){throw new Error("Method not implemented.")}static getListenId_(e,n){return n!==void 0?"tag$"+n:(g(e._queryParams.isDefault(),"should have a tag if it's not a default query."),e._path.toString())}constructor(e,n,s,r){super(),this.repoInfo_=e,this.onDataUpdate_=n,this.authTokenProvider_=s,this.appCheckTokenProvider_=r,this.log_=Pr("p:rest:"),this.listens_={}}listen(e,n,s,r){const i=e._path.toString();this.log_("Listen called for "+i+" "+e._queryIdentifier);const o=ki.getListenId_(e,s),a={};this.listens_[o]=a;const c=Nd(e._queryParams);this.restRequest_(i+".json",c,(l,u)=>{let d=u;if(l===404&&(d=null,l=null),l===null&&this.onDataUpdate_(i,d,!1,s),as(this.listens_,o)===a){let h;l?l===401?h="permission_denied":h="rest_error:"+l:h="ok",r(h,null)}})}unlisten(e,n){const s=ki.getListenId_(e,n);delete this.listens_[s]}get(e){const n=Nd(e._queryParams),s=e._path.toString(),r=new Ce;return this.restRequest_(s+".json",n,(i,o)=>{let a=o;i===404&&(a=null,i=null),i===null?(this.onDataUpdate_(s,a,!1,null),r.resolve(a)):r.reject(new Error(a))}),r.promise}refreshAuthToken(e){}restRequest_(e,n={},s){return n.format="export",Promise.all([this.authTokenProvider_.getToken(!1),this.appCheckTokenProvider_.getToken(!1)]).then(([r,i])=>{r&&r.accessToken&&(n.auth=r.accessToken),i&&i.token&&(n.ac=i.token);const o=(this.repoInfo_.secure?"https://":"http://")+this.repoInfo_.host+e+"?ns="+this.repoInfo_.namespace+Ss(n);this.log_("Sending REST request for "+o);const a=new XMLHttpRequest;a.onreadystatechange=()=>{if(s&&a.readyState===4){this.log_("REST Response for "+o+" received. status:",a.status,"response:",a.responseText);let c=null;if(a.status>=200&&a.status<300){try{c=lr(a.responseText)}catch{ve("Failed to parse JSON response for "+o+": "+a.responseText)}s(null,c)}else a.status!==401&&a.status!==404&&ve("Got unsuccessful REST response for "+o+" Status: "+a.status),s(a.status);s=null}},a.open("GET",o,!0),a.send()})}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class QS{constructor(){this.rootNode_=w.EMPTY_NODE}getNode(e){return this.rootNode_.getChild(e)}updateSnapshot(e,n){this.rootNode_=this.rootNode_.updateChild(e,n)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ri(){return{value:null,children:new Map}}function ks(t,e,n){if(N(e))t.value=n,t.children.clear();else if(t.value!==null)t.value=t.value.updateChild(e,n);else{const s=k(e);t.children.has(s)||t.children.set(s,Ri());const r=t.children.get(s);e=$(e),ks(r,e,n)}}function Ha(t,e){if(N(e))return t.value=null,t.children.clear(),!0;if(t.value!==null){if(t.value.isLeafNode())return!1;{const n=t.value;return t.value=null,n.forEachChild(X,(s,r)=>{ks(t,new M(s),r)}),Ha(t,e)}}else if(t.children.size>0){const n=k(e);return e=$(e),t.children.has(n)&&Ha(t.children.get(n),e)&&t.children.delete(n),t.children.size===0}else return!0}function Va(t,e,n){t.value!==null?n(e,t.value):ZS(t,(s,r)=>{const i=new M(e.toString()+"/"+s);Va(r,i,n)})}function ZS(t,e){t.children.forEach((n,s)=>{e(s,n)})}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class eT{constructor(e){this.collection_=e,this.last_=null}get(){const e=this.collection_.get(),n={...e};return this.last_&&le(this.last_,(s,r)=>{n[s]=n[s]-r}),this.last_=e,n}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ld=10*1e3,tT=30*1e3,nT=300*1e3;class sT{constructor(e,n){this.server_=n,this.statsToReport_={},this.statsListener_=new eT(e);const s=Ld+(tT-Ld)*Math.random();Ks(this.reportStats_.bind(this),Math.floor(s))}reportStats_(){const e=this.statsListener_.get(),n={};let s=!1;le(e,(r,i)=>{i>0&&lt(this.statsToReport_,r)&&(n[r]=i,s=!0)}),s&&this.server_.reportStats(n),Ks(this.reportStats_.bind(this),Math.floor(Math.random()*2*nT))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var We;(function(t){t[t.OVERWRITE=0]="OVERWRITE",t[t.MERGE=1]="MERGE",t[t.ACK_USER_WRITE=2]="ACK_USER_WRITE",t[t.LISTEN_COMPLETE=3]="LISTEN_COMPLETE"})(We||(We={}));function Gc(){return{fromUser:!0,fromServer:!1,queryId:null,tagged:!1}}function Yc(){return{fromUser:!1,fromServer:!0,queryId:null,tagged:!1}}function Kc(t){return{fromUser:!1,fromServer:!0,queryId:t,tagged:!0}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ai{constructor(e,n,s){this.path=e,this.affectedTree=n,this.revert=s,this.type=We.ACK_USER_WRITE,this.source=Gc()}operationForChild(e){if(N(this.path)){if(this.affectedTree.value!=null)return g(this.affectedTree.children.isEmpty(),"affectedTree should not have overlapping affected paths."),this;{const n=this.affectedTree.subtree(new M(e));return new Ai(O(),n,this.revert)}}else return g(k(this.path)===e,"operationForChild called for unrelated child."),new Ai($(this.path),this.affectedTree,this.revert)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class mr{constructor(e,n){this.source=e,this.path=n,this.type=We.LISTEN_COMPLETE}operationForChild(e){return N(this.path)?new mr(this.source,O()):new mr(this.source,$(this.path))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class In{constructor(e,n,s){this.source=e,this.path=n,this.snap=s,this.type=We.OVERWRITE}operationForChild(e){return N(this.path)?new In(this.source,O(),this.snap.getImmediateChild(e)):new In(this.source,$(this.path),this.snap)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ds{constructor(e,n,s){this.source=e,this.path=n,this.children=s,this.type=We.MERGE}operationForChild(e){if(N(this.path)){const n=this.children.subtree(new M(e));return n.isEmpty()?null:n.value?new In(this.source,O(),n.value):new ds(this.source,O(),n)}else return g(k(this.path)===e,"Can't get a merge for a child not on the path of the operation"),new ds(this.source,$(this.path),this.children)}toString(){return"Operation("+this.path+": "+this.source.toString()+" merge: "+this.children.toString()+")"}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Kt{constructor(e,n,s){this.node_=e,this.fullyInitialized_=n,this.filtered_=s}isFullyInitialized(){return this.fullyInitialized_}isFiltered(){return this.filtered_}isCompleteForPath(e){if(N(e))return this.isFullyInitialized()&&!this.filtered_;const n=k(e);return this.isCompleteForChild(n)}isCompleteForChild(e){return this.isFullyInitialized()&&!this.filtered_||this.node_.hasChild(e)}getNode(){return this.node_}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class rT{constructor(e){this.query_=e,this.index_=this.query_._queryParams.getIndex()}}function iT(t,e,n,s){const r=[],i=[];return e.forEach(o=>{o.type==="child_changed"&&t.index_.indexedValueChanged(o.oldSnap,o.snapshotNode)&&i.push(KS(o.childName,o.snapshotNode))}),Bs(t,r,"child_removed",e,s,n),Bs(t,r,"child_added",e,s,n),Bs(t,r,"child_moved",i,s,n),Bs(t,r,"child_changed",e,s,n),Bs(t,r,"value",e,s,n),r}function Bs(t,e,n,s,r,i){const o=s.filter(a=>a.type===n);o.sort((a,c)=>aT(t,a,c)),o.forEach(a=>{const c=oT(t,a,i);r.forEach(l=>{l.respondsTo(a.type)&&e.push(l.createEvent(c,t.query_))})})}function oT(t,e,n){return e.type==="value"||e.type==="child_removed"||(e.prevName=n.getPredecessorChildName(e.childName,e.snapshotNode,t.index_)),e}function aT(t,e,n){if(e.childName==null||n.childName==null)throw ws("Should only compare child_ events.");const s=new P(e.childName,e.snapshotNode),r=new P(n.childName,n.snapshotNode);return t.index_.compare(s,r)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function po(t,e){return{eventCache:t,serverCache:e}}function Js(t,e,n,s){return po(new Kt(e,n,s),t.serverCache)}function kp(t,e,n,s){return po(t.eventCache,new Kt(e,n,s))}function Ni(t){return t.eventCache.isFullyInitialized()?t.eventCache.getNode():null}function kn(t){return t.serverCache.isFullyInitialized()?t.serverCache.getNode():null}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let ta;const cT=()=>(ta||(ta=new Se(qC)),ta);class H{static fromObject(e){let n=new H(null);return le(e,(s,r)=>{n=n.set(new M(s),r)}),n}constructor(e,n=cT()){this.value=e,this.children=n}isEmpty(){return this.value===null&&this.children.isEmpty()}findRootMostMatchingPathAndValue(e,n){if(this.value!=null&&n(this.value))return{path:O(),value:this.value};if(N(e))return null;{const s=k(e),r=this.children.get(s);if(r!==null){const i=r.findRootMostMatchingPathAndValue($(e),n);return i!=null?{path:J(new M(s),i.path),value:i.value}:null}else return null}}findRootMostValueAndPath(e){return this.findRootMostMatchingPathAndValue(e,()=>!0)}subtree(e){if(N(e))return this;{const n=k(e),s=this.children.get(n);return s!==null?s.subtree($(e)):new H(null)}}set(e,n){if(N(e))return new H(n,this.children);{const s=k(e),i=(this.children.get(s)||new H(null)).set($(e),n),o=this.children.insert(s,i);return new H(this.value,o)}}remove(e){if(N(e))return this.children.isEmpty()?new H(null):new H(null,this.children);{const n=k(e),s=this.children.get(n);if(s){const r=s.remove($(e));let i;return r.isEmpty()?i=this.children.remove(n):i=this.children.insert(n,r),this.value===null&&i.isEmpty()?new H(null):new H(this.value,i)}else return this}}get(e){if(N(e))return this.value;{const n=k(e),s=this.children.get(n);return s?s.get($(e)):null}}setTree(e,n){if(N(e))return n;{const s=k(e),i=(this.children.get(s)||new H(null)).setTree($(e),n);let o;return i.isEmpty()?o=this.children.remove(s):o=this.children.insert(s,i),new H(this.value,o)}}fold(e){return this.fold_(O(),e)}fold_(e,n){const s={};return this.children.inorderTraversal((r,i)=>{s[r]=i.fold_(J(e,r),n)}),n(e,this.value,s)}findOnPath(e,n){return this.findOnPath_(e,O(),n)}findOnPath_(e,n,s){const r=this.value?s(n,this.value):!1;if(r)return r;if(N(e))return null;{const i=k(e),o=this.children.get(i);return o?o.findOnPath_($(e),J(n,i),s):null}}foreachOnPath(e,n){return this.foreachOnPath_(e,O(),n)}foreachOnPath_(e,n,s){if(N(e))return this;{this.value&&s(n,this.value);const r=k(e),i=this.children.get(r);return i?i.foreachOnPath_($(e),J(n,r),s):new H(null)}}foreach(e){this.foreach_(O(),e)}foreach_(e,n){this.children.inorderTraversal((s,r)=>{r.foreach_(J(e,s),n)}),this.value&&n(e,this.value)}foreachChild(e){this.children.inorderTraversal((n,s)=>{s.value&&e(n,s.value)})}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ge{constructor(e){this.writeTree_=e}static empty(){return new Ge(new H(null))}}function Xs(t,e,n){if(N(e))return new Ge(new H(n));{const s=t.writeTree_.findRootMostValueAndPath(e);if(s!=null){const r=s.path;let i=s.value;const o=Ee(r,e);return i=i.updateChild(o,n),new Ge(t.writeTree_.set(r,i))}else{const r=new H(n),i=t.writeTree_.setTree(e,r);return new Ge(i)}}}function Wa(t,e,n){let s=t;return le(n,(r,i)=>{s=Xs(s,J(e,r),i)}),s}function Od(t,e){if(N(e))return Ge.empty();{const n=t.writeTree_.setTree(e,new H(null));return new Ge(n)}}function ja(t,e){return xn(t,e)!=null}function xn(t,e){const n=t.writeTree_.findRootMostValueAndPath(e);return n!=null?t.writeTree_.get(n.path).getChild(Ee(n.path,e)):null}function Dd(t){const e=[],n=t.writeTree_.value;return n!=null?n.isLeafNode()||n.forEachChild(X,(s,r)=>{e.push(new P(s,r))}):t.writeTree_.children.inorderTraversal((s,r)=>{r.value!=null&&e.push(new P(s,r.value))}),e}function Vt(t,e){if(N(e))return t;{const n=xn(t,e);return n!=null?new Ge(new H(n)):new Ge(t.writeTree_.subtree(e))}}function za(t){return t.writeTree_.isEmpty()}function hs(t,e){return Rp(O(),t.writeTree_,e)}function Rp(t,e,n){if(e.value!=null)return n.updateChild(t,e.value);{let s=null;return e.children.inorderTraversal((r,i)=>{r===".priority"?(g(i.value!==null,"Priority writes must always be leaf nodes"),s=i.value):n=Rp(J(t,r),i,n)}),!n.getChild(t).isEmpty()&&s!==null&&(n=n.updateChild(J(t,".priority"),s)),n}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function go(t,e){return Lp(e,t)}function lT(t,e,n,s,r){g(s>t.lastWriteId,"Stacking an older write on top of newer ones"),r===void 0&&(r=!0),t.allWrites.push({path:e,snap:n,writeId:s,visible:r}),r&&(t.visibleWrites=Xs(t.visibleWrites,e,n)),t.lastWriteId=s}function uT(t,e,n,s){g(s>t.lastWriteId,"Stacking an older merge on top of newer ones"),t.allWrites.push({path:e,children:n,writeId:s,visible:!0}),t.visibleWrites=Wa(t.visibleWrites,e,n),t.lastWriteId=s}function dT(t,e){for(let n=0;n<t.allWrites.length;n++){const s=t.allWrites[n];if(s.writeId===e)return s}return null}function hT(t,e){const n=t.allWrites.findIndex(a=>a.writeId===e);g(n>=0,"removeWrite called with nonexistent writeId.");const s=t.allWrites[n];t.allWrites.splice(n,1);let r=s.visible,i=!1,o=t.allWrites.length-1;for(;r&&o>=0;){const a=t.allWrites[o];a.visible&&(o>=n&&fT(a,s.path)?r=!1:Oe(s.path,a.path)&&(i=!0)),o--}if(r){if(i)return pT(t),!0;if(s.snap)t.visibleWrites=Od(t.visibleWrites,s.path);else{const a=s.children;le(a,c=>{t.visibleWrites=Od(t.visibleWrites,J(s.path,c))})}return!0}else return!1}function fT(t,e){if(t.snap)return Oe(t.path,e);for(const n in t.children)if(t.children.hasOwnProperty(n)&&Oe(J(t.path,n),e))return!0;return!1}function pT(t){t.visibleWrites=Ap(t.allWrites,gT,O()),t.allWrites.length>0?t.lastWriteId=t.allWrites[t.allWrites.length-1].writeId:t.lastWriteId=-1}function gT(t){return t.visible}function Ap(t,e,n){let s=Ge.empty();for(let r=0;r<t.length;++r){const i=t[r];if(e(i)){const o=i.path;let a;if(i.snap)Oe(n,o)?(a=Ee(n,o),s=Xs(s,a,i.snap)):Oe(o,n)&&(a=Ee(o,n),s=Xs(s,O(),i.snap.getChild(a)));else if(i.children){if(Oe(n,o))a=Ee(n,o),s=Wa(s,a,i.children);else if(Oe(o,n))if(a=Ee(o,n),N(a))s=Wa(s,O(),i.children);else{const c=as(i.children,k(a));if(c){const l=c.getChild($(a));s=Xs(s,O(),l)}}}else throw ws("WriteRecord should have .snap or .children")}}return s}function Np(t,e,n,s,r){if(!s&&!r){const i=xn(t.visibleWrites,e);if(i!=null)return i;{const o=Vt(t.visibleWrites,e);if(za(o))return n;if(n==null&&!ja(o,O()))return null;{const a=n||w.EMPTY_NODE;return hs(o,a)}}}else{const i=Vt(t.visibleWrites,e);if(!r&&za(i))return n;if(!r&&n==null&&!ja(i,O()))return null;{const o=function(l){return(l.visible||r)&&(!s||!~s.indexOf(l.writeId))&&(Oe(l.path,e)||Oe(e,l.path))},a=Ap(t.allWrites,o,e),c=n||w.EMPTY_NODE;return hs(a,c)}}}function mT(t,e,n){let s=w.EMPTY_NODE;const r=xn(t.visibleWrites,e);if(r)return r.isLeafNode()||r.forEachChild(X,(i,o)=>{s=s.updateImmediateChild(i,o)}),s;if(n){const i=Vt(t.visibleWrites,e);return n.forEachChild(X,(o,a)=>{const c=hs(Vt(i,new M(o)),a);s=s.updateImmediateChild(o,c)}),Dd(i).forEach(o=>{s=s.updateImmediateChild(o.name,o.node)}),s}else{const i=Vt(t.visibleWrites,e);return Dd(i).forEach(o=>{s=s.updateImmediateChild(o.name,o.node)}),s}}function _T(t,e,n,s,r){g(s||r,"Either existingEventSnap or existingServerSnap must exist");const i=J(e,n);if(ja(t.visibleWrites,i))return null;{const o=Vt(t.visibleWrites,i);return za(o)?r.getChild(n):hs(o,r.getChild(n))}}function yT(t,e,n,s){const r=J(e,n),i=xn(t.visibleWrites,r);if(i!=null)return i;if(s.isCompleteForChild(n)){const o=Vt(t.visibleWrites,r);return hs(o,s.getNode().getImmediateChild(n))}else return null}function ET(t,e){return xn(t.visibleWrites,e)}function vT(t,e,n,s,r,i,o){let a;const c=Vt(t.visibleWrites,e),l=xn(c,O());if(l!=null)a=l;else if(n!=null)a=hs(c,n);else return[];if(a=a.withIndex(o),!a.isEmpty()&&!a.isLeafNode()){const u=[],d=o.getCompare(),h=i?a.getReverseIteratorFrom(s,o):a.getIteratorFrom(s,o);let f=h.getNext();for(;f&&u.length<r;)d(f,s)!==0&&u.push(f),f=h.getNext();return u}else return[]}function wT(){return{visibleWrites:Ge.empty(),allWrites:[],lastWriteId:-1}}function Pi(t,e,n,s){return Np(t.writeTree,t.treePath,e,n,s)}function Jc(t,e){return mT(t.writeTree,t.treePath,e)}function Md(t,e,n,s){return _T(t.writeTree,t.treePath,e,n,s)}function Li(t,e){return ET(t.writeTree,J(t.treePath,e))}function bT(t,e,n,s,r,i){return vT(t.writeTree,t.treePath,e,n,s,r,i)}function Xc(t,e,n){return yT(t.writeTree,t.treePath,e,n)}function Pp(t,e){return Lp(J(t.treePath,e),t.writeTree)}function Lp(t,e){return{treePath:t,writeTree:e}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class CT{constructor(){this.changeMap=new Map}trackChildChange(e){const n=e.type,s=e.childName;g(n==="child_added"||n==="child_changed"||n==="child_removed","Only child changes supported for tracking"),g(s!==".priority","Only non-priority child changes can be tracked.");const r=this.changeMap.get(s);if(r){const i=r.type;if(n==="child_added"&&i==="child_removed")this.changeMap.set(s,pr(s,e.snapshotNode,r.snapshotNode));else if(n==="child_removed"&&i==="child_added")this.changeMap.delete(s);else if(n==="child_removed"&&i==="child_changed")this.changeMap.set(s,fr(s,r.oldSnap));else if(n==="child_changed"&&i==="child_added")this.changeMap.set(s,us(s,e.snapshotNode));else if(n==="child_changed"&&i==="child_changed")this.changeMap.set(s,pr(s,e.snapshotNode,r.oldSnap));else throw ws("Illegal combination of changes: "+e+" occurred after "+r)}else this.changeMap.set(s,e)}getChanges(){return Array.from(this.changeMap.values())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ST{getCompleteChild(e){return null}getChildAfterChild(e,n,s){return null}}const Op=new ST;class Qc{constructor(e,n,s=null){this.writes_=e,this.viewCache_=n,this.optCompleteServerCache_=s}getCompleteChild(e){const n=this.viewCache_.eventCache;if(n.isCompleteForChild(e))return n.getNode().getImmediateChild(e);{const s=this.optCompleteServerCache_!=null?new Kt(this.optCompleteServerCache_,!0,!1):this.viewCache_.serverCache;return Xc(this.writes_,e,s)}}getChildAfterChild(e,n,s){const r=this.optCompleteServerCache_!=null?this.optCompleteServerCache_:kn(this.viewCache_),i=bT(this.writes_,r,n,1,s,e);return i.length===0?null:i[0]}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function TT(t){return{filter:t}}function IT(t,e){g(e.eventCache.getNode().isIndexed(t.filter.getIndex()),"Event snap not indexed"),g(e.serverCache.getNode().isIndexed(t.filter.getIndex()),"Server snap not indexed")}function kT(t,e,n,s,r){const i=new CT;let o,a;if(n.type===We.OVERWRITE){const l=n;l.source.fromUser?o=qa(t,e,l.path,l.snap,s,r,i):(g(l.source.fromServer,"Unknown source."),a=l.source.tagged||e.serverCache.isFiltered()&&!N(l.path),o=Oi(t,e,l.path,l.snap,s,r,a,i))}else if(n.type===We.MERGE){const l=n;l.source.fromUser?o=AT(t,e,l.path,l.children,s,r,i):(g(l.source.fromServer,"Unknown source."),a=l.source.tagged||e.serverCache.isFiltered(),o=Ga(t,e,l.path,l.children,s,r,a,i))}else if(n.type===We.ACK_USER_WRITE){const l=n;l.revert?o=LT(t,e,l.path,s,r,i):o=NT(t,e,l.path,l.affectedTree,s,r,i)}else if(n.type===We.LISTEN_COMPLETE)o=PT(t,e,n.path,s,i);else throw ws("Unknown operation type: "+n.type);const c=i.getChanges();return RT(e,o,c),{viewCache:o,changes:c}}function RT(t,e,n){const s=e.eventCache;if(s.isFullyInitialized()){const r=s.getNode().isLeafNode()||s.getNode().isEmpty(),i=Ni(t);(n.length>0||!t.eventCache.isFullyInitialized()||r&&!s.getNode().equals(i)||!s.getNode().getPriority().equals(i.getPriority()))&&n.push(Ip(Ni(e)))}}function Dp(t,e,n,s,r,i){const o=e.eventCache;if(Li(s,n)!=null)return e;{let a,c;if(N(n))if(g(e.serverCache.isFullyInitialized(),"If change path is empty, we must have complete server data"),e.serverCache.isFiltered()){const l=kn(e),u=l instanceof w?l:w.EMPTY_NODE,d=Jc(s,u);a=t.filter.updateFullNode(e.eventCache.getNode(),d,i)}else{const l=Pi(s,kn(e));a=t.filter.updateFullNode(e.eventCache.getNode(),l,i)}else{const l=k(n);if(l===".priority"){g(Yt(n)===1,"Can't have a priority with additional path components");const u=o.getNode();c=e.serverCache.getNode();const d=Md(s,n,u,c);d!=null?a=t.filter.updatePriority(u,d):a=o.getNode()}else{const u=$(n);let d;if(o.isCompleteForChild(l)){c=e.serverCache.getNode();const h=Md(s,n,o.getNode(),c);h!=null?d=o.getNode().getImmediateChild(l).updateChild(u,h):d=o.getNode().getImmediateChild(l)}else d=Xc(s,l,e.serverCache);d!=null?a=t.filter.updateChild(o.getNode(),l,d,u,r,i):a=o.getNode()}}return Js(e,a,o.isFullyInitialized()||N(n),t.filter.filtersNodes())}}function Oi(t,e,n,s,r,i,o,a){const c=e.serverCache;let l;const u=o?t.filter:t.filter.getIndexedFilter();if(N(n))l=u.updateFullNode(c.getNode(),s,null);else if(u.filtersNodes()&&!c.isFiltered()){const f=c.getNode().updateChild(n,s);l=u.updateFullNode(c.getNode(),f,null)}else{const f=k(n);if(!c.isCompleteForPath(n)&&Yt(n)>1)return e;const p=$(n),m=c.getNode().getImmediateChild(f).updateChild(p,s);f===".priority"?l=u.updatePriority(c.getNode(),m):l=u.updateChild(c.getNode(),f,m,p,Op,null)}const d=kp(e,l,c.isFullyInitialized()||N(n),u.filtersNodes()),h=new Qc(r,d,i);return Dp(t,d,n,r,h,a)}function qa(t,e,n,s,r,i,o){const a=e.eventCache;let c,l;const u=new Qc(r,e,i);if(N(n))l=t.filter.updateFullNode(e.eventCache.getNode(),s,o),c=Js(e,l,!0,t.filter.filtersNodes());else{const d=k(n);if(d===".priority")l=t.filter.updatePriority(e.eventCache.getNode(),s),c=Js(e,l,a.isFullyInitialized(),a.isFiltered());else{const h=$(n),f=a.getNode().getImmediateChild(d);let p;if(N(h))p=s;else{const _=u.getCompleteChild(d);_!=null?Vc(h)===".priority"&&_.getChild(Ep(h)).isEmpty()?p=_:p=_.updateChild(h,s):p=w.EMPTY_NODE}if(f.equals(p))c=e;else{const _=t.filter.updateChild(a.getNode(),d,p,h,u,o);c=Js(e,_,a.isFullyInitialized(),t.filter.filtersNodes())}}}return c}function xd(t,e){return t.eventCache.isCompleteForChild(e)}function AT(t,e,n,s,r,i,o){let a=e;return s.foreach((c,l)=>{const u=J(n,c);xd(e,k(u))&&(a=qa(t,a,u,l,r,i,o))}),s.foreach((c,l)=>{const u=J(n,c);xd(e,k(u))||(a=qa(t,a,u,l,r,i,o))}),a}function Fd(t,e,n){return n.foreach((s,r)=>{e=e.updateChild(s,r)}),e}function Ga(t,e,n,s,r,i,o,a){if(e.serverCache.getNode().isEmpty()&&!e.serverCache.isFullyInitialized())return e;let c=e,l;N(n)?l=s:l=new H(null).setTree(n,s);const u=e.serverCache.getNode();return l.children.inorderTraversal((d,h)=>{if(u.hasChild(d)){const f=e.serverCache.getNode().getImmediateChild(d),p=Fd(t,f,h);c=Oi(t,c,new M(d),p,r,i,o,a)}}),l.children.inorderTraversal((d,h)=>{const f=!e.serverCache.isCompleteForChild(d)&&h.value===null;if(!u.hasChild(d)&&!f){const p=e.serverCache.getNode().getImmediateChild(d),_=Fd(t,p,h);c=Oi(t,c,new M(d),_,r,i,o,a)}}),c}function NT(t,e,n,s,r,i,o){if(Li(r,n)!=null)return e;const a=e.serverCache.isFiltered(),c=e.serverCache;if(s.value!=null){if(N(n)&&c.isFullyInitialized()||c.isCompleteForPath(n))return Oi(t,e,n,c.getNode().getChild(n),r,i,a,o);if(N(n)){let l=new H(null);return c.getNode().forEachChild(qn,(u,d)=>{l=l.set(new M(u),d)}),Ga(t,e,n,l,r,i,a,o)}else return e}else{let l=new H(null);return s.foreach((u,d)=>{const h=J(n,u);c.isCompleteForPath(h)&&(l=l.set(u,c.getNode().getChild(h)))}),Ga(t,e,n,l,r,i,a,o)}}function PT(t,e,n,s,r){const i=e.serverCache,o=kp(e,i.getNode(),i.isFullyInitialized()||N(n),i.isFiltered());return Dp(t,o,n,s,Op,r)}function LT(t,e,n,s,r,i){let o;if(Li(s,n)!=null)return e;{const a=new Qc(s,e,r),c=e.eventCache.getNode();let l;if(N(n)||k(n)===".priority"){let u;if(e.serverCache.isFullyInitialized())u=Pi(s,kn(e));else{const d=e.serverCache.getNode();g(d instanceof w,"serverChildren would be complete if leaf node"),u=Jc(s,d)}u=u,l=t.filter.updateFullNode(c,u,i)}else{const u=k(n);let d=Xc(s,u,e.serverCache);d==null&&e.serverCache.isCompleteForChild(u)&&(d=c.getImmediateChild(u)),d!=null?l=t.filter.updateChild(c,u,d,$(n),a,i):e.eventCache.getNode().hasChild(u)?l=t.filter.updateChild(c,u,w.EMPTY_NODE,$(n),a,i):l=c,l.isEmpty()&&e.serverCache.isFullyInitialized()&&(o=Pi(s,kn(e)),o.isLeafNode()&&(l=t.filter.updateFullNode(l,o,i)))}return o=e.serverCache.isFullyInitialized()||Li(s,O())!=null,Js(e,l,o,t.filter.filtersNodes())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class OT{constructor(e,n){this.query_=e,this.eventRegistrations_=[];const s=this.query_._queryParams,r=new qc(s.getIndex()),i=XS(s);this.processor_=TT(i);const o=n.serverCache,a=n.eventCache,c=r.updateFullNode(w.EMPTY_NODE,o.getNode(),null),l=i.updateFullNode(w.EMPTY_NODE,a.getNode(),null),u=new Kt(c,o.isFullyInitialized(),r.filtersNodes()),d=new Kt(l,a.isFullyInitialized(),i.filtersNodes());this.viewCache_=po(d,u),this.eventGenerator_=new rT(this.query_)}get query(){return this.query_}}function DT(t){return t.viewCache_.serverCache.getNode()}function MT(t){return Ni(t.viewCache_)}function xT(t,e){const n=kn(t.viewCache_);return n&&(t.query._queryParams.loadsAllData()||!N(e)&&!n.getImmediateChild(k(e)).isEmpty())?n.getChild(e):null}function Ud(t){return t.eventRegistrations_.length===0}function FT(t,e){t.eventRegistrations_.push(e)}function $d(t,e,n){const s=[];if(n){g(e==null,"A cancel should cancel all event registrations.");const r=t.query._path;t.eventRegistrations_.forEach(i=>{const o=i.createCancelEvent(n,r);o&&s.push(o)})}if(e){let r=[];for(let i=0;i<t.eventRegistrations_.length;++i){const o=t.eventRegistrations_[i];if(!o.matches(e))r.push(o);else if(e.hasAnyCallback()){r=r.concat(t.eventRegistrations_.slice(i+1));break}}t.eventRegistrations_=r}else t.eventRegistrations_=[];return s}function Bd(t,e,n,s){e.type===We.MERGE&&e.source.queryId!==null&&(g(kn(t.viewCache_),"We should always have a full cache before handling merges"),g(Ni(t.viewCache_),"Missing event cache, even though we have a server cache"));const r=t.viewCache_,i=kT(t.processor_,r,e,n,s);return IT(t.processor_,i.viewCache),g(i.viewCache.serverCache.isFullyInitialized()||!r.serverCache.isFullyInitialized(),"Once a server snap is complete, it should never go back"),t.viewCache_=i.viewCache,Mp(t,i.changes,i.viewCache.eventCache.getNode(),null)}function UT(t,e){const n=t.viewCache_.eventCache,s=[];return n.getNode().isLeafNode()||n.getNode().forEachChild(X,(i,o)=>{s.push(us(i,o))}),n.isFullyInitialized()&&s.push(Ip(n.getNode())),Mp(t,s,n.getNode(),e)}function Mp(t,e,n,s){const r=s?[s]:t.eventRegistrations_;return iT(t.eventGenerator_,e,n,r)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Di;class xp{constructor(){this.views=new Map}}function $T(t){g(!Di,"__referenceConstructor has already been defined"),Di=t}function BT(){return g(Di,"Reference.ts has not been loaded"),Di}function HT(t){return t.views.size===0}function Zc(t,e,n,s){const r=e.source.queryId;if(r!==null){const i=t.views.get(r);return g(i!=null,"SyncTree gave us an op for an invalid query."),Bd(i,e,n,s)}else{let i=[];for(const o of t.views.values())i=i.concat(Bd(o,e,n,s));return i}}function Fp(t,e,n,s,r){const i=e._queryIdentifier,o=t.views.get(i);if(!o){let a=Pi(n,r?s:null),c=!1;a?c=!0:s instanceof w?(a=Jc(n,s),c=!1):(a=w.EMPTY_NODE,c=!1);const l=po(new Kt(a,c,!1),new Kt(s,r,!1));return new OT(e,l)}return o}function VT(t,e,n,s,r,i){const o=Fp(t,e,s,r,i);return t.views.has(e._queryIdentifier)||t.views.set(e._queryIdentifier,o),FT(o,n),UT(o,n)}function WT(t,e,n,s){const r=e._queryIdentifier,i=[];let o=[];const a=Jt(t);if(r==="default")for(const[c,l]of t.views.entries())o=o.concat($d(l,n,s)),Ud(l)&&(t.views.delete(c),l.query._queryParams.loadsAllData()||i.push(l.query));else{const c=t.views.get(r);c&&(o=o.concat($d(c,n,s)),Ud(c)&&(t.views.delete(r),c.query._queryParams.loadsAllData()||i.push(c.query)))}return a&&!Jt(t)&&i.push(new(BT())(e._repo,e._path)),{removed:i,events:o}}function Up(t){const e=[];for(const n of t.views.values())n.query._queryParams.loadsAllData()||e.push(n);return e}function Wt(t,e){let n=null;for(const s of t.views.values())n=n||xT(s,e);return n}function $p(t,e){if(e._queryParams.loadsAllData())return mo(t);{const s=e._queryIdentifier;return t.views.get(s)}}function Bp(t,e){return $p(t,e)!=null}function Jt(t){return mo(t)!=null}function mo(t){for(const e of t.views.values())if(e.query._queryParams.loadsAllData())return e;return null}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Mi;function jT(t){g(!Mi,"__referenceConstructor has already been defined"),Mi=t}function zT(){return g(Mi,"Reference.ts has not been loaded"),Mi}let qT=1;class Hd{constructor(e){this.listenProvider_=e,this.syncPointTree_=new H(null),this.pendingWriteTree_=wT(),this.tagToQueryMap=new Map,this.queryToTagMap=new Map}}function Hp(t,e,n,s,r){return lT(t.pendingWriteTree_,e,n,s,r),r?Rs(t,new In(Gc(),e,n)):[]}function GT(t,e,n,s){uT(t.pendingWriteTree_,e,n,s);const r=H.fromObject(n);return Rs(t,new ds(Gc(),e,r))}function Mt(t,e,n=!1){const s=dT(t.pendingWriteTree_,e);if(hT(t.pendingWriteTree_,e)){let i=new H(null);return s.snap!=null?i=i.set(O(),!0):le(s.children,o=>{i=i.set(new M(o),!0)}),Rs(t,new Ai(s.path,i,n))}else return[]}function Or(t,e,n){return Rs(t,new In(Yc(),e,n))}function YT(t,e,n){const s=H.fromObject(n);return Rs(t,new ds(Yc(),e,s))}function KT(t,e){return Rs(t,new mr(Yc(),e))}function JT(t,e,n){const s=tl(t,n);if(s){const r=nl(s),i=r.path,o=r.queryId,a=Ee(i,e),c=new mr(Kc(o),a);return sl(t,i,c)}else return[]}function xi(t,e,n,s,r=!1){const i=e._path,o=t.syncPointTree_.get(i);let a=[];if(o&&(e._queryIdentifier==="default"||Bp(o,e))){const c=WT(o,e,n,s);HT(o)&&(t.syncPointTree_=t.syncPointTree_.remove(i));const l=c.removed;if(a=c.events,!r){const u=l.findIndex(h=>h._queryParams.loadsAllData())!==-1,d=t.syncPointTree_.findOnPath(i,(h,f)=>Jt(f));if(u&&!d){const h=t.syncPointTree_.subtree(i);if(!h.isEmpty()){const f=ZT(h);for(let p=0;p<f.length;++p){const _=f[p],m=_.query,R=zp(t,_);t.listenProvider_.startListening(Qs(m),_r(t,m),R.hashFn,R.onComplete)}}}!d&&l.length>0&&!s&&(u?t.listenProvider_.stopListening(Qs(e),null):l.forEach(h=>{const f=t.queryToTagMap.get(_o(h));t.listenProvider_.stopListening(Qs(h),f)}))}eI(t,l)}return a}function Vp(t,e,n,s){const r=tl(t,s);if(r!=null){const i=nl(r),o=i.path,a=i.queryId,c=Ee(o,e),l=new In(Kc(a),c,n);return sl(t,o,l)}else return[]}function XT(t,e,n,s){const r=tl(t,s);if(r){const i=nl(r),o=i.path,a=i.queryId,c=Ee(o,e),l=H.fromObject(n),u=new ds(Kc(a),c,l);return sl(t,o,u)}else return[]}function Ya(t,e,n,s=!1){const r=e._path;let i=null,o=!1;t.syncPointTree_.foreachOnPath(r,(h,f)=>{const p=Ee(h,r);i=i||Wt(f,p),o=o||Jt(f)});let a=t.syncPointTree_.get(r);a?(o=o||Jt(a),i=i||Wt(a,O())):(a=new xp,t.syncPointTree_=t.syncPointTree_.set(r,a));let c;i!=null?c=!0:(c=!1,i=w.EMPTY_NODE,t.syncPointTree_.subtree(r).foreachChild((f,p)=>{const _=Wt(p,O());_&&(i=i.updateImmediateChild(f,_))}));const l=Bp(a,e);if(!l&&!e._queryParams.loadsAllData()){const h=_o(e);g(!t.queryToTagMap.has(h),"View does not exist, but we have a tag");const f=tI();t.queryToTagMap.set(h,f),t.tagToQueryMap.set(f,h)}const u=go(t.pendingWriteTree_,r);let d=VT(a,e,n,u,i,c);if(!l&&!o&&!s){const h=$p(a,e);d=d.concat(nI(t,e,h))}return d}function el(t,e,n){const r=t.pendingWriteTree_,i=t.syncPointTree_.findOnPath(e,(o,a)=>{const c=Ee(o,e),l=Wt(a,c);if(l)return l});return Np(r,e,i,n,!0)}function QT(t,e){const n=e._path;let s=null;t.syncPointTree_.foreachOnPath(n,(l,u)=>{const d=Ee(l,n);s=s||Wt(u,d)});let r=t.syncPointTree_.get(n);r?s=s||Wt(r,O()):(r=new xp,t.syncPointTree_=t.syncPointTree_.set(n,r));const i=s!=null,o=i?new Kt(s,!0,!1):null,a=go(t.pendingWriteTree_,e._path),c=Fp(r,e,a,i?o.getNode():w.EMPTY_NODE,i);return MT(c)}function Rs(t,e){return Wp(e,t.syncPointTree_,null,go(t.pendingWriteTree_,O()))}function Wp(t,e,n,s){if(N(t.path))return jp(t,e,n,s);{const r=e.get(O());n==null&&r!=null&&(n=Wt(r,O()));let i=[];const o=k(t.path),a=t.operationForChild(o),c=e.children.get(o);if(c&&a){const l=n?n.getImmediateChild(o):null,u=Pp(s,o);i=i.concat(Wp(a,c,l,u))}return r&&(i=i.concat(Zc(r,t,s,n))),i}}function jp(t,e,n,s){const r=e.get(O());n==null&&r!=null&&(n=Wt(r,O()));let i=[];return e.children.inorderTraversal((o,a)=>{const c=n?n.getImmediateChild(o):null,l=Pp(s,o),u=t.operationForChild(o);u&&(i=i.concat(jp(u,a,c,l)))}),r&&(i=i.concat(Zc(r,t,s,n))),i}function zp(t,e){const n=e.query,s=_r(t,n);return{hashFn:()=>(DT(e)||w.EMPTY_NODE).hash(),onComplete:r=>{if(r==="ok")return s?JT(t,n._path,s):KT(t,n._path);{const i=KC(r,n);return xi(t,n,null,i)}}}}function _r(t,e){const n=_o(e);return t.queryToTagMap.get(n)}function _o(t){return t._path.toString()+"$"+t._queryIdentifier}function tl(t,e){return t.tagToQueryMap.get(e)}function nl(t){const e=t.indexOf("$");return g(e!==-1&&e<t.length-1,"Bad queryKey."),{queryId:t.substr(e+1),path:new M(t.substr(0,e))}}function sl(t,e,n){const s=t.syncPointTree_.get(e);g(s,"Missing sync point for query tag that we're tracking");const r=go(t.pendingWriteTree_,e);return Zc(s,n,r,null)}function ZT(t){return t.fold((e,n,s)=>{if(n&&Jt(n))return[mo(n)];{let r=[];return n&&(r=Up(n)),le(s,(i,o)=>{r=r.concat(o)}),r}})}function Qs(t){return t._queryParams.loadsAllData()&&!t._queryParams.isDefault()?new(zT())(t._repo,t._path):t}function eI(t,e){for(let n=0;n<e.length;++n){const s=e[n];if(!s._queryParams.loadsAllData()){const r=_o(s),i=t.queryToTagMap.get(r);t.queryToTagMap.delete(r),t.tagToQueryMap.delete(i)}}}function tI(){return qT++}function nI(t,e,n){const s=e._path,r=_r(t,e),i=zp(t,n),o=t.listenProvider_.startListening(Qs(e),r,i.hashFn,i.onComplete),a=t.syncPointTree_.subtree(s);if(r)g(!Jt(a.value),"If we're adding a query, it shouldn't be shadowed");else{const c=a.fold((l,u,d)=>{if(!N(l)&&u&&Jt(u))return[mo(u).query];{let h=[];return u&&(h=h.concat(Up(u).map(f=>f.query))),le(d,(f,p)=>{h=h.concat(p)}),h}});for(let l=0;l<c.length;++l){const u=c[l];t.listenProvider_.stopListening(Qs(u),_r(t,u))}}return o}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class rl{constructor(e){this.node_=e}getImmediateChild(e){const n=this.node_.getImmediateChild(e);return new rl(n)}node(){return this.node_}}class il{constructor(e,n){this.syncTree_=e,this.path_=n}getImmediateChild(e){const n=J(this.path_,e);return new il(this.syncTree_,n)}node(){return el(this.syncTree_,this.path_)}}const sI=function(t){return t=t||{},t.timestamp=t.timestamp||new Date().getTime(),t},Vd=function(t,e,n){if(!t||typeof t!="object")return t;if(g(".sv"in t,"Unexpected leaf node or priority contents"),typeof t[".sv"]=="string")return rI(t[".sv"],e,n);if(typeof t[".sv"]=="object")return iI(t[".sv"],e);g(!1,"Unexpected server value: "+JSON.stringify(t,null,2))},rI=function(t,e,n){switch(t){case"timestamp":return n.timestamp;default:g(!1,"Unexpected server value: "+t)}},iI=function(t,e,n){t.hasOwnProperty("increment")||g(!1,"Unexpected server value: "+JSON.stringify(t,null,2));const s=t.increment;typeof s!="number"&&g(!1,"Unexpected increment value: "+s);const r=e.node();if(g(r!==null&&typeof r<"u","Expected ChildrenNode.EMPTY_NODE for nulls"),!r.isLeafNode())return s;const o=r.getValue();return typeof o!="number"?s:o+s},qp=function(t,e,n,s){return ol(e,new il(n,t),s)},Gp=function(t,e,n){return ol(t,new rl(e),n)};function ol(t,e,n){const s=t.getPriority().val(),r=Vd(s,e.getImmediateChild(".priority"),n);let i;if(t.isLeafNode()){const o=t,a=Vd(o.getValue(),e,n);return a!==o.getValue()||r!==o.getPriority().val()?new oe(a,Q(r)):t}else{const o=t;return i=o,r!==o.getPriority().val()&&(i=i.updatePriority(new oe(r))),o.forEachChild(X,(a,c)=>{const l=ol(c,e.getImmediateChild(a),n);l!==c&&(i=i.updateImmediateChild(a,l))}),i}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class al{constructor(e="",n=null,s={children:{},childCount:0}){this.name=e,this.parent=n,this.node=s}}function cl(t,e){let n=e instanceof M?e:new M(e),s=t,r=k(n);for(;r!==null;){const i=as(s.node.children,r)||{children:{},childCount:0};s=new al(r,s,i),n=$(n),r=k(n)}return s}function As(t){return t.node.value}function Yp(t,e){t.node.value=e,Ka(t)}function Kp(t){return t.node.childCount>0}function oI(t){return As(t)===void 0&&!Kp(t)}function yo(t,e){le(t.node.children,(n,s)=>{e(new al(n,t,s))})}function Jp(t,e,n,s){n&&e(t),yo(t,r=>{Jp(r,e,!0)})}function aI(t,e,n){let s=t.parent;for(;s!==null;){if(e(s))return!0;s=s.parent}return!1}function Dr(t){return new M(t.parent===null?t.name:Dr(t.parent)+"/"+t.name)}function Ka(t){t.parent!==null&&cI(t.parent,t.name,t)}function cI(t,e,n){const s=oI(n),r=lt(t.node.children,e);s&&r?(delete t.node.children[e],t.node.childCount--,Ka(t)):!s&&!r&&(t.node.children[e]=n.node,t.node.childCount++,Ka(t))}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const lI=/[\[\].#$\/\u0000-\u001F\u007F]/,uI=/[\[\].#$\u0000-\u001F\u007F]/,na=10*1024*1024,ll=function(t){return typeof t=="string"&&t.length!==0&&!lI.test(t)},Xp=function(t){return typeof t=="string"&&t.length!==0&&!uI.test(t)},dI=function(t){return t&&(t=t.replace(/^\/*\.info(\/|$)/,"/")),Xp(t)},Qp=function(t){return t===null||typeof t=="string"||typeof t=="number"&&!uo(t)||t&&typeof t=="object"&&lt(t,".sv")},Fi=function(t,e,n,s){s&&e===void 0||Eo(cs(t,"value"),e,n)},Eo=function(t,e,n){const s=n instanceof M?new AS(n,t):n;if(e===void 0)throw new Error(t+"contains undefined "+un(s));if(typeof e=="function")throw new Error(t+"contains a function "+un(s)+" with contents = "+e.toString());if(uo(e))throw new Error(t+"contains "+e.toString()+" "+un(s));if(typeof e=="string"&&e.length>na/3&&co(e)>na)throw new Error(t+"contains a string greater than "+na+" utf8 bytes "+un(s)+" ('"+e.substring(0,50)+"...')");if(e&&typeof e=="object"){let r=!1,i=!1;if(le(e,(o,a)=>{if(o===".value")r=!0;else if(o!==".priority"&&o!==".sv"&&(i=!0,!ll(o)))throw new Error(t+" contains an invalid key ("+o+") "+un(s)+`.  Keys must be non-empty strings and can't contain ".", "#", "$", "/", "[", or "]"`);NS(s,o),Eo(t,a,s),PS(s)}),r&&i)throw new Error(t+' contains ".value" child '+un(s)+" in addition to actual children.")}},hI=function(t,e){let n,s;for(n=0;n<e.length;n++){s=e[n];const i=hr(s);for(let o=0;o<i.length;o++)if(!(i[o]===".priority"&&o===i.length-1)){if(!ll(i[o]))throw new Error(t+"contains an invalid key ("+i[o]+") in path "+s.toString()+`. Keys must be non-empty strings and can't contain ".", "#", "$", "/", "[", or "]"`)}}e.sort(RS);let r=null;for(n=0;n<e.length;n++){if(s=e[n],r!==null&&Oe(r,s))throw new Error(t+"contains a path "+r.toString()+" that is ancestor of another path "+s.toString());r=s}},Zp=function(t,e,n,s){const r=cs(t,"values");if(!(e&&typeof e=="object")||Array.isArray(e))throw new Error(r+" must be an object containing the children to replace.");const i=[];le(e,(o,a)=>{const c=new M(o);if(Eo(r,a,J(n,c)),Vc(c)===".priority"&&!Qp(a))throw new Error(r+"contains an invalid value for '"+c.toString()+"', which must be a valid Firebase priority (a string, finite number, server value, or null).");i.push(c)}),hI(r,i)},fI=function(t,e,n){if(uo(e))throw new Error(cs(t,"priority")+"is "+e.toString()+", but must be a valid Firebase priority (a string, finite number, server value, or null).");if(!Qp(e))throw new Error(cs(t,"priority")+"must be a valid Firebase priority (a string, finite number, server value, or null).")},ul=function(t,e,n,s){if(!Xp(n))throw new Error(cs(t,e)+'was an invalid path = "'+n+`". Paths must be non-empty strings and can't contain ".", "#", "$", "[", or "]"`)},pI=function(t,e,n,s){n&&(n=n.replace(/^\/*\.info(\/|$)/,"/")),ul(t,e,n)},xt=function(t,e){if(k(e)===".info")throw new Error(t+" failed = Can't modify data under /.info/")},gI=function(t,e){const n=e.path.toString();if(typeof e.repoInfo.host!="string"||e.repoInfo.host.length===0||!ll(e.repoInfo.namespace)&&e.repoInfo.host.split(":")[0]!=="localhost"||n.length!==0&&!dI(n))throw new Error(cs(t,"url")+`must be a valid firebase URL and the path can't contain ".", "#", "$", "[", or "]".`)};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class mI{constructor(){this.eventLists_=[],this.recursionDepth_=0}}function vo(t,e){let n=null;for(let s=0;s<e.length;s++){const r=e[s],i=r.getPath();n!==null&&!Wc(i,n.path)&&(t.eventLists_.push(n),n=null),n===null&&(n={events:[],path:i}),n.events.push(r)}n&&t.eventLists_.push(n)}function eg(t,e,n){vo(t,n),tg(t,s=>Wc(s,e))}function Fe(t,e,n){vo(t,n),tg(t,s=>Oe(s,e)||Oe(e,s))}function tg(t,e){t.recursionDepth_++;let n=!0;for(let s=0;s<t.eventLists_.length;s++){const r=t.eventLists_[s];if(r){const i=r.path;e(i)?(_I(t.eventLists_[s]),t.eventLists_[s]=null):n=!1}}n&&(t.eventLists_=[]),t.recursionDepth_--}function _I(t){for(let e=0;e<t.events.length;e++){const n=t.events[e];if(n!==null){t.events[e]=null;const s=n.getEventRunner();Ys&&ce("event: "+n.toString()),Is(s)}}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const yI="repo_interrupt",EI=25;class vI{constructor(e,n,s,r){this.repoInfo_=e,this.forceRestClient_=n,this.authTokenProvider_=s,this.appCheckProvider_=r,this.dataUpdateCount=0,this.statsListener_=null,this.eventQueue_=new mI,this.nextWriteId_=1,this.interceptServerDataCallback_=null,this.onDisconnect_=Ri(),this.transactionQueueTree_=new al,this.persistentConnection_=null,this.key=this.repoInfo_.toURLString()}toString(){return(this.repoInfo_.secure?"https://":"http://")+this.repoInfo_.host}}function wI(t,e,n){if(t.stats_=Bc(t.repoInfo_),t.forceRestClient_||ZC())t.server_=new ki(t.repoInfo_,(s,r,i,o)=>{Wd(t,s,r,i,o)},t.authTokenProvider_,t.appCheckProvider_),setTimeout(()=>jd(t,!0),0);else{if(typeof n<"u"&&n!==null){if(typeof n!="object")throw new Error("Only objects are supported for option databaseAuthVariableOverride");try{se(n)}catch(s){throw new Error("Invalid authOverride provided: "+s)}}t.persistentConnection_=new wt(t.repoInfo_,e,(s,r,i,o)=>{Wd(t,s,r,i,o)},s=>{jd(t,s)},s=>{bI(t,s)},t.authTokenProvider_,t.appCheckProvider_,n),t.server_=t.persistentConnection_}t.authTokenProvider_.addTokenChangeListener(s=>{t.server_.refreshAuthToken(s)}),t.appCheckProvider_.addTokenChangeListener(s=>{t.server_.refreshAppCheckToken(s.token)}),t.statsReporter_=rS(t.repoInfo_,()=>new sT(t.stats_,t.server_)),t.infoData_=new QS,t.infoSyncTree_=new Hd({startListening:(s,r,i,o)=>{let a=[];const c=t.infoData_.getNode(s._path);return c.isEmpty()||(a=Or(t.infoSyncTree_,s._path,c),setTimeout(()=>{o("ok")},0)),a},stopListening:()=>{}}),dl(t,"connected",!1),t.serverSyncTree_=new Hd({startListening:(s,r,i,o)=>(t.server_.listen(s,i,r,(a,c)=>{const l=o(a,c);Fe(t.eventQueue_,s._path,l)}),[]),stopListening:(s,r)=>{t.server_.unlisten(s,r)}})}function ng(t){const n=t.infoData_.getNode(new M(".info/serverTimeOffset")).val()||0;return new Date().getTime()+n}function wo(t){return sI({timestamp:ng(t)})}function Wd(t,e,n,s,r){t.dataUpdateCount++;const i=new M(e);n=t.interceptServerDataCallback_?t.interceptServerDataCallback_(e,n):n;let o=[];if(r)if(s){const c=bi(n,l=>Q(l));o=XT(t.serverSyncTree_,i,c,r)}else{const c=Q(n);o=Vp(t.serverSyncTree_,i,c,r)}else if(s){const c=bi(n,l=>Q(l));o=YT(t.serverSyncTree_,i,c)}else{const c=Q(n);o=Or(t.serverSyncTree_,i,c)}let a=i;o.length>0&&(a=fs(t,i)),Fe(t.eventQueue_,a,o)}function jd(t,e){dl(t,"connected",e),e===!1&&II(t)}function bI(t,e){le(e,(n,s)=>{dl(t,n,s)})}function dl(t,e,n){const s=new M("/.info/"+e),r=Q(n);t.infoData_.updateSnapshot(s,r);const i=Or(t.infoSyncTree_,s,r);Fe(t.eventQueue_,s,i)}function hl(t){return t.nextWriteId_++}function CI(t,e,n){const s=QT(t.serverSyncTree_,e);return s!=null?Promise.resolve(s):t.server_.get(e).then(r=>{const i=Q(r).withIndex(e._queryParams.getIndex());Ya(t.serverSyncTree_,e,n,!0);let o;if(e._queryParams.loadsAllData())o=Or(t.serverSyncTree_,e._path,i);else{const a=_r(t.serverSyncTree_,e);o=Vp(t.serverSyncTree_,e._path,i,a)}return Fe(t.eventQueue_,e._path,o),xi(t.serverSyncTree_,e,n,null,!0),i},r=>(Mr(t,"get for query "+se(e)+" failed: "+r),Promise.reject(new Error(r))))}function SI(t,e,n,s,r){Mr(t,"set",{path:e.toString(),value:n,priority:s});const i=wo(t),o=Q(n,s),a=el(t.serverSyncTree_,e),c=Gp(o,a,i),l=hl(t),u=Hp(t.serverSyncTree_,e,c,l,!0);vo(t.eventQueue_,u),t.server_.put(e.toString(),o.val(!0),(h,f)=>{const p=h==="ok";p||ve("set at "+e+" failed: "+h);const _=Mt(t.serverSyncTree_,l,!p);Fe(t.eventQueue_,e,_),Xt(t,r,h,f)});const d=pl(t,e);fs(t,d),Fe(t.eventQueue_,d,[])}function TI(t,e,n,s){Mr(t,"update",{path:e.toString(),value:n});let r=!0;const i=wo(t),o={};if(le(n,(a,c)=>{r=!1,o[a]=qp(J(e,a),Q(c),t.serverSyncTree_,i)}),r)ce("update() called with empty data.  Don't do anything."),Xt(t,s,"ok",void 0);else{const a=hl(t),c=GT(t.serverSyncTree_,e,o,a);vo(t.eventQueue_,c),t.server_.merge(e.toString(),n,(l,u)=>{const d=l==="ok";d||ve("update at "+e+" failed: "+l);const h=Mt(t.serverSyncTree_,a,!d),f=h.length>0?fs(t,e):e;Fe(t.eventQueue_,f,h),Xt(t,s,l,u)}),le(n,l=>{const u=pl(t,J(e,l));fs(t,u)}),Fe(t.eventQueue_,e,[])}}function II(t){Mr(t,"onDisconnectEvents");const e=wo(t),n=Ri();Va(t.onDisconnect_,O(),(r,i)=>{const o=qp(r,i,t.serverSyncTree_,e);ks(n,r,o)});let s=[];Va(n,O(),(r,i)=>{s=s.concat(Or(t.serverSyncTree_,r,i));const o=pl(t,r);fs(t,o)}),t.onDisconnect_=Ri(),Fe(t.eventQueue_,O(),s)}function kI(t,e,n){t.server_.onDisconnectCancel(e.toString(),(s,r)=>{s==="ok"&&Ha(t.onDisconnect_,e),Xt(t,n,s,r)})}function zd(t,e,n,s){const r=Q(n);t.server_.onDisconnectPut(e.toString(),r.val(!0),(i,o)=>{i==="ok"&&ks(t.onDisconnect_,e,r),Xt(t,s,i,o)})}function RI(t,e,n,s,r){const i=Q(n,s);t.server_.onDisconnectPut(e.toString(),i.val(!0),(o,a)=>{o==="ok"&&ks(t.onDisconnect_,e,i),Xt(t,r,o,a)})}function AI(t,e,n,s){if(wi(n)){ce("onDisconnect().update() called with empty data.  Don't do anything."),Xt(t,s,"ok",void 0);return}t.server_.onDisconnectMerge(e.toString(),n,(r,i)=>{r==="ok"&&le(n,(o,a)=>{const c=Q(a);ks(t.onDisconnect_,J(e,o),c)}),Xt(t,s,r,i)})}function NI(t,e,n){let s;k(e._path)===".info"?s=Ya(t.infoSyncTree_,e,n):s=Ya(t.serverSyncTree_,e,n),eg(t.eventQueue_,e._path,s)}function sg(t,e,n){let s;k(e._path)===".info"?s=xi(t.infoSyncTree_,e,n):s=xi(t.serverSyncTree_,e,n),eg(t.eventQueue_,e._path,s)}function PI(t){t.persistentConnection_&&t.persistentConnection_.interrupt(yI)}function Mr(t,...e){let n="";t.persistentConnection_&&(n=t.persistentConnection_.id+":"),ce(n,...e)}function Xt(t,e,n,s){e&&Is(()=>{if(n==="ok")e(null);else{const r=(n||"error").toUpperCase();let i=r;s&&(i+=": "+s);const o=new Error(i);o.code=r,e(o)}})}function rg(t,e,n){return el(t.serverSyncTree_,e,n)||w.EMPTY_NODE}function fl(t,e=t.transactionQueueTree_){if(e||bo(t,e),As(e)){const n=og(t,e);g(n.length>0,"Sending zero length transaction queue"),n.every(r=>r.status===0)&&LI(t,Dr(e),n)}else Kp(e)&&yo(e,n=>{fl(t,n)})}function LI(t,e,n){const s=n.map(l=>l.currentWriteId),r=rg(t,e,s);let i=r;const o=r.hash();for(let l=0;l<n.length;l++){const u=n[l];g(u.status===0,"tryToSendTransactionQueue_: items in queue should all be run."),u.status=1,u.retryCount++;const d=Ee(e,u.path);i=i.updateChild(d,u.currentOutputSnapshotRaw)}const a=i.val(!0),c=e;t.server_.put(c.toString(),a,l=>{Mr(t,"transaction put response",{path:c.toString(),status:l});let u=[];if(l==="ok"){const d=[];for(let h=0;h<n.length;h++)n[h].status=2,u=u.concat(Mt(t.serverSyncTree_,n[h].currentWriteId)),n[h].onComplete&&d.push(()=>n[h].onComplete(null,!0,n[h].currentOutputSnapshotResolved)),n[h].unwatcher();bo(t,cl(t.transactionQueueTree_,e)),fl(t,t.transactionQueueTree_),Fe(t.eventQueue_,e,u);for(let h=0;h<d.length;h++)Is(d[h])}else{if(l==="datastale")for(let d=0;d<n.length;d++)n[d].status===3?n[d].status=4:n[d].status=0;else{ve("transaction at "+c.toString()+" failed: "+l);for(let d=0;d<n.length;d++)n[d].status=4,n[d].abortReason=l}fs(t,e)}},o)}function fs(t,e){const n=ig(t,e),s=Dr(n),r=og(t,n);return OI(t,r,s),s}function OI(t,e,n){if(e.length===0)return;const s=[];let r=[];const o=e.filter(a=>a.status===0).map(a=>a.currentWriteId);for(let a=0;a<e.length;a++){const c=e[a],l=Ee(n,c.path);let u=!1,d;if(g(l!==null,"rerunTransactionsUnderNode_: relativePath should not be null."),c.status===4)u=!0,d=c.abortReason,r=r.concat(Mt(t.serverSyncTree_,c.currentWriteId,!0));else if(c.status===0)if(c.retryCount>=EI)u=!0,d="maxretry",r=r.concat(Mt(t.serverSyncTree_,c.currentWriteId,!0));else{const h=rg(t,c.path,o);c.currentInputSnapshot=h;const f=e[a].update(h.val());if(f!==void 0){Eo("transaction failed: Data returned ",f,c.path);let p=Q(f);typeof f=="object"&&f!=null&&lt(f,".priority")||(p=p.updatePriority(h.getPriority()));const m=c.currentWriteId,R=wo(t),W=Gp(p,h,R);c.currentOutputSnapshotRaw=p,c.currentOutputSnapshotResolved=W,c.currentWriteId=hl(t),o.splice(o.indexOf(m),1),r=r.concat(Hp(t.serverSyncTree_,c.path,W,c.currentWriteId,c.applyLocally)),r=r.concat(Mt(t.serverSyncTree_,m,!0))}else u=!0,d="nodata",r=r.concat(Mt(t.serverSyncTree_,c.currentWriteId,!0))}Fe(t.eventQueue_,n,r),r=[],u&&(e[a].status=2,(function(h){setTimeout(h,Math.floor(0))})(e[a].unwatcher),e[a].onComplete&&(d==="nodata"?s.push(()=>e[a].onComplete(null,!1,e[a].currentInputSnapshot)):s.push(()=>e[a].onComplete(new Error(d),!1,null))))}bo(t,t.transactionQueueTree_);for(let a=0;a<s.length;a++)Is(s[a]);fl(t,t.transactionQueueTree_)}function ig(t,e){let n,s=t.transactionQueueTree_;for(n=k(e);n!==null&&As(s)===void 0;)s=cl(s,n),e=$(e),n=k(e);return s}function og(t,e){const n=[];return ag(t,e,n),n.sort((s,r)=>s.order-r.order),n}function ag(t,e,n){const s=As(e);if(s)for(let r=0;r<s.length;r++)n.push(s[r]);yo(e,r=>{ag(t,r,n)})}function bo(t,e){const n=As(e);if(n){let s=0;for(let r=0;r<n.length;r++)n[r].status!==2&&(n[s]=n[r],s++);n.length=s,Yp(e,n.length>0?n:void 0)}yo(e,s=>{bo(t,s)})}function pl(t,e){const n=Dr(ig(t,e)),s=cl(t.transactionQueueTree_,e);return aI(s,r=>{sa(t,r)}),sa(t,s),Jp(s,r=>{sa(t,r)}),n}function sa(t,e){const n=As(e);if(n){const s=[];let r=[],i=-1;for(let o=0;o<n.length;o++)n[o].status===3||(n[o].status===1?(g(i===o-1,"All SENT items should be at beginning of queue."),i=o,n[o].status=3,n[o].abortReason="set"):(g(n[o].status===0,"Unexpected transaction status in abort"),n[o].unwatcher(),r=r.concat(Mt(t.serverSyncTree_,n[o].currentWriteId,!0)),n[o].onComplete&&s.push(n[o].onComplete.bind(null,new Error("set"),!1,null))));i===-1?Yp(e,void 0):n.length=i+1,Fe(t.eventQueue_,Dr(e),r);for(let o=0;o<s.length;o++)Is(s[o])}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function DI(t){let e="";const n=t.split("/");for(let s=0;s<n.length;s++)if(n[s].length>0){let r=n[s];try{r=decodeURIComponent(r.replace(/\+/g," "))}catch{}e+="/"+r}return e}function MI(t){const e={};t.charAt(0)==="?"&&(t=t.substring(1));for(const n of t.split("&")){if(n.length===0)continue;const s=n.split("=");s.length===2?e[decodeURIComponent(s[0])]=decodeURIComponent(s[1]):ve(`Invalid query segment '${n}' in query '${t}'`)}return e}const qd=function(t,e){const n=xI(t),s=n.namespace;n.domain==="firebase.com"&&Tt(n.host+" is no longer supported. Please use <YOUR FIREBASE>.firebaseio.com instead"),(!s||s==="undefined")&&n.domain!=="localhost"&&Tt("Cannot parse Firebase url. Please use https://<YOUR FIREBASE>.firebaseio.com"),n.secure||jC();const r=n.scheme==="ws"||n.scheme==="wss";return{repoInfo:new up(n.host,n.secure,s,r,e,"",s!==n.subdomain),path:new M(n.pathString)}},xI=function(t){let e="",n="",s="",r="",i="",o=!0,a="https",c=443;if(typeof t=="string"){let l=t.indexOf("//");l>=0&&(a=t.substring(0,l-1),t=t.substring(l+2));let u=t.indexOf("/");u===-1&&(u=t.length);let d=t.indexOf("?");d===-1&&(d=t.length),e=t.substring(0,Math.min(u,d)),u<d&&(r=DI(t.substring(u,d)));const h=MI(t.substring(Math.min(t.length,d)));l=e.indexOf(":"),l>=0?(o=a==="https"||a==="wss",c=parseInt(e.substring(l+1),10)):l=e.length;const f=e.slice(0,l);if(f.toLowerCase()==="localhost")n="localhost";else if(f.split(".").length<=2)n=f;else{const p=e.indexOf(".");s=e.substring(0,p).toLowerCase(),n=e.substring(p+1),i=s}"ns"in h&&(i=h.ns)}return{host:e,port:c,domain:n,subdomain:s,secure:o,scheme:a,pathString:r,namespace:i}};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Gd="-0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ_abcdefghijklmnopqrstuvwxyz",FI=(function(){let t=0;const e=[];return function(n){const s=n===t;t=n;let r;const i=new Array(8);for(r=7;r>=0;r--)i[r]=Gd.charAt(n%64),n=Math.floor(n/64);g(n===0,"Cannot push at time == 0");let o=i.join("");if(s){for(r=11;r>=0&&e[r]===63;r--)e[r]=0;e[r]++}else for(r=0;r<12;r++)e[r]=Math.floor(Math.random()*64);for(r=0;r<12;r++)o+=Gd.charAt(e[r]);return g(o.length===20,"nextPushId: Length should be 20."),o}})();/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class cg{constructor(e,n,s,r){this.eventType=e,this.eventRegistration=n,this.snapshot=s,this.prevName=r}getPath(){const e=this.snapshot.ref;return this.eventType==="value"?e._path:e.parent._path}getEventType(){return this.eventType}getEventRunner(){return this.eventRegistration.getEventRunner(this)}toString(){return this.getPath().toString()+":"+this.eventType+":"+se(this.snapshot.exportVal())}}class lg{constructor(e,n,s){this.eventRegistration=e,this.error=n,this.path=s}getPath(){return this.path}getEventType(){return"cancel"}getEventRunner(){return this.eventRegistration.getEventRunner(this)}toString(){return this.path.toString()+":cancel"}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class gl{constructor(e,n){this.snapshotCallback=e,this.cancelCallback=n}onValue(e,n){this.snapshotCallback.call(null,e,n)}onCancel(e){return g(this.hasCancelCallback,"Raising a cancel event on a listener with no cancel callback"),this.cancelCallback.call(null,e)}get hasCancelCallback(){return!!this.cancelCallback}matches(e){return this.snapshotCallback===e.snapshotCallback||this.snapshotCallback.userCallback!==void 0&&this.snapshotCallback.userCallback===e.snapshotCallback.userCallback&&this.snapshotCallback.context===e.snapshotCallback.context}}/**
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
 */class ug{constructor(e,n){this._repo=e,this._path=n}cancel(){const e=new Ce;return kI(this._repo,this._path,e.wrapCallback(()=>{})),e.promise}remove(){xt("OnDisconnect.remove",this._path);const e=new Ce;return zd(this._repo,this._path,null,e.wrapCallback(()=>{})),e.promise}set(e){xt("OnDisconnect.set",this._path),Fi("OnDisconnect.set",e,this._path,!1);const n=new Ce;return zd(this._repo,this._path,e,n.wrapCallback(()=>{})),n.promise}setWithPriority(e,n){xt("OnDisconnect.setWithPriority",this._path),Fi("OnDisconnect.setWithPriority",e,this._path,!1),fI("OnDisconnect.setWithPriority",n);const s=new Ce;return RI(this._repo,this._path,e,n,s.wrapCallback(()=>{})),s.promise}update(e){xt("OnDisconnect.update",this._path),Zp("OnDisconnect.update",e,this._path);const n=new Ce;return AI(this._repo,this._path,e,n.wrapCallback(()=>{})),n.promise}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Co{constructor(e,n,s,r){this._repo=e,this._path=n,this._queryParams=s,this._orderByCalled=r}get key(){return N(this._path)?null:Vc(this._path)}get ref(){return new Ze(this._repo,this._path)}get _queryIdentifier(){const e=Pd(this._queryParams),n=Uc(e);return n==="{}"?"default":n}get _queryObject(){return Pd(this._queryParams)}isEqual(e){if(e=de(e),!(e instanceof Co))return!1;const n=this._repo===e._repo,s=Wc(this._path,e._path),r=this._queryIdentifier===e._queryIdentifier;return n&&s&&r}toJSON(){return this.toString()}toString(){return this._repo.toString()+kS(this._path)}}class Ze extends Co{constructor(e,n){super(e,n,new fo,!1)}get parent(){const e=Ep(this._path);return e===null?null:new Ze(this._repo,e)}get root(){let e=this;for(;e.parent!==null;)e=e.parent;return e}}class Rn{constructor(e,n,s){this._node=e,this.ref=n,this._index=s}get priority(){return this._node.getPriority().val()}get key(){return this.ref.key}get size(){return this._node.numChildren()}child(e){const n=new M(e),s=An(this.ref,e);return new Rn(this._node.getChild(n),s,X)}exists(){return!this._node.isEmpty()}exportVal(){return this._node.val(!0)}forEach(e){return this._node.isLeafNode()?!1:!!this._node.forEachChild(this._index,(s,r)=>e(new Rn(r,An(this.ref,s),X)))}hasChild(e){const n=new M(e);return!this._node.getChild(n).isEmpty()}hasChildren(){return this._node.isLeafNode()?!1:!this._node.isEmpty()}toJSON(){return this.exportVal()}val(){return this._node.val()}}function S(t,e){return t=de(t),t._checkNotDeleted("ref"),e!==void 0?An(t._root,e):t._root}function An(t,e){return t=de(t),k(t._path)===null?pI("child","path",e):ul("child","path",e),new Ze(t._repo,J(t._path,e))}function dg(t){return t=de(t),new ug(t._repo,t._path)}function Ui(t,e){t=de(t),xt("push",t._path),Fi("push",e,t._path,!0);const n=ng(t._repo),s=FI(n),r=An(t,s),i=An(t,s);let o;return o=Promise.resolve(i),r.then=o.then.bind(o),r.catch=o.then.bind(o,void 0),r}function at(t){return xt("remove",t._path),ue(t,null)}function ue(t,e){t=de(t),xt("set",t._path),Fi("set",e,t._path,!1);const n=new Ce;return SI(t._repo,t._path,e,null,n.wrapCallback(()=>{})),n.promise}function _n(t,e){Zp("update",e,t._path);const n=new Ce;return TI(t._repo,t._path,e,n.wrapCallback(()=>{})),n.promise}function Ye(t){t=de(t);const e=new gl(()=>{}),n=new xr(e);return CI(t._repo,t,n).then(s=>new Rn(s,new Ze(t._repo,t._path),t._queryParams.getIndex()))}class xr{constructor(e){this.callbackContext=e}respondsTo(e){return e==="value"}createEvent(e,n){const s=n._queryParams.getIndex();return new cg("value",this,new Rn(e.snapshotNode,new Ze(n._repo,n._path),s))}getEventRunner(e){return e.getEventType()==="cancel"?()=>this.callbackContext.onCancel(e.error):()=>this.callbackContext.onValue(e.snapshot,null)}createCancelEvent(e,n){return this.callbackContext.hasCancelCallback?new lg(this,e,n):null}matches(e){return e instanceof xr?!e.callbackContext||!this.callbackContext?!0:e.callbackContext.matches(this.callbackContext):!1}hasAnyCallback(){return this.callbackContext!==null}}class So{constructor(e,n){this.eventType=e,this.callbackContext=n}respondsTo(e){let n=e==="children_added"?"child_added":e;return n=n==="children_removed"?"child_removed":n,this.eventType===n}createCancelEvent(e,n){return this.callbackContext.hasCancelCallback?new lg(this,e,n):null}createEvent(e,n){g(e.childName!=null,"Child events should have a childName.");const s=An(new Ze(n._repo,n._path),e.childName),r=n._queryParams.getIndex();return new cg(e.type,this,new Rn(e.snapshotNode,s,r),e.prevName)}getEventRunner(e){return e.getEventType()==="cancel"?()=>this.callbackContext.onCancel(e.error):()=>this.callbackContext.onValue(e.snapshot,e.prevName)}matches(e){return e instanceof So?this.eventType===e.eventType&&(!this.callbackContext||!e.callbackContext||this.callbackContext.matches(e.callbackContext)):!1}hasAnyCallback(){return!!this.callbackContext}}function To(t,e,n,s,r){const i=new gl(n,void 0),o=e==="value"?new xr(i):new So(e,i);return NI(t._repo,t,o),()=>sg(t._repo,t,o)}function Fr(t,e,n,s){return To(t,"value",e)}function $i(t,e,n,s){return To(t,"child_added",e)}function hg(t,e,n,s){return To(t,"child_changed",e)}function fg(t,e,n,s){return To(t,"child_removed",e)}function Le(t,e,n){let s=null;const r=n?new gl(n):null;e==="value"?s=new xr(r):e&&(s=new So(e,r)),sg(t._repo,t,s)}$T(Ze);jT(Ze);/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const UI="FIREBASE_DATABASE_EMULATOR_HOST",Ja={};let $I=!1;function BI(t,e,n,s){const r=e.lastIndexOf(":"),i=e.substring(0,r),o=bs(i);t.repoInfo_=new up(e,o,t.repoInfo_.namespace,t.repoInfo_.webSocketOnly,t.repoInfo_.nodeAdmin,t.repoInfo_.persistenceKey,t.repoInfo_.includeNamespaceInQueryParams,!0,n),s&&(t.authTokenProvider_=s)}function pg(t,e,n,s,r){let i=s||t.options.databaseURL;i===void 0&&(t.options.projectId||Tt("Can't determine Firebase Database URL. Be sure to include  a Project ID when calling firebase.initializeApp()."),ce("Using default host for project ",t.options.projectId),i=`${t.options.projectId}-default-rtdb.firebaseio.com`);let o=qd(i,r),a=o.repoInfo,c;typeof process<"u"&&fd&&(c=fd[UI]),c?(i=`http://${c}?ns=${a.namespace}`,o=qd(i,r),a=o.repoInfo):o.repoInfo.secure;const l=new tS(t.name,t.options,e);gI("Invalid Firebase Database URL",o),N(o.path)||Tt("Database URL must point to the root of a Firebase Database (not including a child path).");const u=VI(a,t,l,new eS(t,n));return new gg(u,t)}function HI(t,e){const n=Ja[e];(!n||n[t.key]!==t)&&Tt(`Database ${e}(${t.repoInfo_}) has already been deleted.`),PI(t),delete n[t.key]}function VI(t,e,n,s){let r=Ja[e.name];r||(r={},Ja[e.name]=r);let i=r[t.toURLString()];return i&&Tt("Database initialized multiple times. Please make sure the format of the database URL matches with each database() call."),i=new vI(t,$I,n,s),r[t.toURLString()]=i,i}class gg{constructor(e,n){this._repoInternal=e,this.app=n,this.type="database",this._instanceStarted=!1}get _repo(){return this._instanceStarted||(wI(this._repoInternal,this.app.options.appId,this.app.options.databaseAuthVariableOverride),this._instanceStarted=!0),this._repoInternal}get _root(){return this._rootInternal||(this._rootInternal=new Ze(this._repo,O())),this._rootInternal}_delete(){return this._rootInternal!==null&&(HI(this._repo,this.app.name),this._repoInternal=null,this._rootInternal=null),Promise.resolve()}_checkNotDeleted(e){this._rootInternal===null&&Tt("Cannot call "+e+" on a deleted database.")}}function mg(t=Fc(),e){const n=Ar(t,"database").getImmediate({identifier:e});if(!n._instanceStarted){const s=ab("database");s&&_g(n,...s)}return n}function _g(t,e,n,s={}){t=de(t),t._checkNotDeleted("useEmulator");const r=`${e}:${n}`,i=t._repoInternal;if(t._instanceStarted){if(r===t._repoInternal.repoInfo_.host&&Sn(s,i.repoInfo_.emulatorOptions))return;Tt("connectDatabaseEmulator() cannot initialize or alter the emulator configuration after the database instance has started.")}let o;if(i.repoInfo_.nodeAdmin)s.mockUserToken&&Tt('mockUserToken is not supported by the Admin SDK. For client access with mock users, please use the "firebase" package instead of "firebase-admin".'),o=new ci(ci.OWNER);else if(s.mockUserToken){const a=typeof s.mockUserToken=="string"?s.mockUserToken:cb(s.mockUserToken,t.app.options.projectId);o=new ci(a)}bs(e)&&(Bf(e),Hf("Database",!0)),BI(i,r,s,o)}/**
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
 */function WI(t){Jf(Ts),Gt(new Ct("database",(e,{instanceIdentifier:n})=>{const s=e.getProvider("app").getImmediate(),r=e.getProvider("auth-internal"),i=e.getProvider("app-check-internal");return pg(s,r,i,n)},"PUBLIC").setMultipleInstances(!0)),vt(pd,gd,t),vt(pd,gd,"esm2020")}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const jI={".sv":"timestamp"};function yn(){return jI}wt.prototype.simpleListen=function(t,e){this.sendRequest("q",{p:t},e)};wt.prototype.echo=function(t,e){this.sendRequest("echo",{d:t},e)};WI();const zI=Object.freeze(Object.defineProperty({__proto__:null,DataSnapshot:Rn,Database:gg,OnDisconnect:ug,_QueryImpl:Co,_QueryParams:fo,_ReferenceImpl:Ze,_repoManagerDatabaseFromApp:pg,_setSDKVersion:Jf,_validatePathString:ul,_validateWritablePath:xt,child:An,connectDatabaseEmulator:_g,get:Ye,getDatabase:mg,off:Le,onChildAdded:$i,onChildChanged:hg,onChildRemoved:fg,onDisconnect:dg,onValue:Fr,push:Ui,ref:S,remove:at,serverTimestamp:yn,set:ue,update:_n},Symbol.toStringTag,{value:"Module"}));var qI="firebase",GI="12.4.0";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */vt(qI,GI,"app");/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Xa=new Map,yg={activated:!1,tokenObservers:[]},YI={initialized:!1,enabled:!1};function re(t){return Xa.get(t)||{...yg}}function KI(t,e){return Xa.set(t,e),Xa.get(t)}function Io(){return YI}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Eg="https://content-firebaseappcheck.googleapis.com/v1",JI="exchangeRecaptchaEnterpriseToken",XI="exchangeDebugToken",Yd={RETRIAL_MIN_WAIT:30*1e3,RETRIAL_MAX_WAIT:960*1e3},QI=1440*60*1e3;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ZI{constructor(e,n,s,r,i){if(this.operation=e,this.retryPolicy=n,this.getWaitDuration=s,this.lowerBound=r,this.upperBound=i,this.pending=null,this.nextErrorWaitInterval=r,r>i)throw new Error("Proactive refresh lower bound greater than upper bound!")}start(){this.nextErrorWaitInterval=this.lowerBound,this.process(!0).catch(()=>{})}stop(){this.pending&&(this.pending.reject("cancelled"),this.pending=null)}isRunning(){return!!this.pending}async process(e){this.stop();try{this.pending=new Ce,this.pending.promise.catch(n=>{}),await ek(this.getNextRun(e)),this.pending.resolve(),await this.pending.promise,this.pending=new Ce,this.pending.promise.catch(n=>{}),await this.operation(),this.pending.resolve(),await this.pending.promise,this.process(!0).catch(()=>{})}catch(n){this.retryPolicy(n)?this.process(!1).catch(()=>{}):this.stop()}}getNextRun(e){if(e)return this.nextErrorWaitInterval=this.lowerBound,this.getWaitDuration();{const n=this.nextErrorWaitInterval;return this.nextErrorWaitInterval*=2,this.nextErrorWaitInterval>this.upperBound&&(this.nextErrorWaitInterval=this.upperBound),n}}}function ek(t){return new Promise(e=>{setTimeout(e,t)})}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const tk={"already-initialized":"You have already called initializeAppCheck() for FirebaseApp {$appName} with different options. To avoid this error, call initializeAppCheck() with the same options as when it was originally called. This will return the already initialized instance.","use-before-activation":"App Check is being used before initializeAppCheck() is called for FirebaseApp {$appName}. Call initializeAppCheck() before instantiating other Firebase services.","fetch-network-error":"Fetch failed to connect to a network. Check Internet connection. Original error: {$originalErrorMessage}.","fetch-parse-error":"Fetch client could not parse response. Original error: {$originalErrorMessage}.","fetch-status-error":"Fetch server returned an HTTP error status. HTTP status: {$httpStatus}.","storage-open":"Error thrown when opening storage. Original error: {$originalErrorMessage}.","storage-get":"Error thrown when reading from storage. Original error: {$originalErrorMessage}.","storage-set":"Error thrown when writing to storage. Original error: {$originalErrorMessage}.","recaptcha-error":"ReCAPTCHA error.","initial-throttle":"{$httpStatus} error. Attempts allowed again after {$time}",throttled:"Requests throttled due to previous {$httpStatus} error. Attempts allowed again after {$time}"},Te=new Cs("appCheck","AppCheck",tk);/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Kd(t=!1){return t?self.grecaptcha?.enterprise:self.grecaptcha}function ml(t){if(!re(t).activated)throw Te.create("use-before-activation",{appName:t.name})}function vg(t){const e=Math.round(t/1e3),n=Math.floor(e/(3600*24)),s=Math.floor((e-n*3600*24)/3600),r=Math.floor((e-n*3600*24-s*3600)/60),i=e-n*3600*24-s*3600-r*60;let o="";return n&&(o+=Qr(n)+"d:"),s&&(o+=Qr(s)+"h:"),o+=Qr(r)+"m:"+Qr(i)+"s",o}function Qr(t){return t===0?"00":t>=10?t.toString():"0"+t}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function _l({url:t,body:e},n){const s={"Content-Type":"application/json"},r=n.getImmediate({optional:!0});if(r){const d=await r.getHeartbeatsHeader();d&&(s["X-Firebase-Client"]=d)}const i={method:"POST",body:JSON.stringify(e),headers:s};let o;try{o=await fetch(t,i)}catch(d){throw Te.create("fetch-network-error",{originalErrorMessage:d?.message})}if(o.status!==200)throw Te.create("fetch-status-error",{httpStatus:o.status});let a;try{a=await o.json()}catch(d){throw Te.create("fetch-parse-error",{originalErrorMessage:d?.message})}const c=a.ttl.match(/^([\d.]+)(s)$/);if(!c||!c[2]||isNaN(Number(c[1])))throw Te.create("fetch-parse-error",{originalErrorMessage:`ttl field (timeToLive) is not in standard Protobuf Duration format: ${a.ttl}`});const l=Number(c[1])*1e3,u=Date.now();return{token:a.token,expireTimeMillis:u+l,issuedAtTimeMillis:u}}function nk(t,e){const{projectId:n,appId:s,apiKey:r}=t.options;return{url:`${Eg}/projects/${n}/apps/${s}:${JI}?key=${r}`,body:{recaptcha_enterprise_token:e}}}function wg(t,e){const{projectId:n,appId:s,apiKey:r}=t.options;return{url:`${Eg}/projects/${n}/apps/${s}:${XI}?key=${r}`,body:{debug_token:e}}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const sk="firebase-app-check-database",rk=1,yr="firebase-app-check-store",bg="debug-token";let Zr=null;function Cg(){return Zr||(Zr=new Promise((t,e)=>{try{const n=indexedDB.open(sk,rk);n.onsuccess=s=>{t(s.target.result)},n.onerror=s=>{e(Te.create("storage-open",{originalErrorMessage:s.target.error?.message}))},n.onupgradeneeded=s=>{const r=s.target.result;switch(s.oldVersion){case 0:r.createObjectStore(yr,{keyPath:"compositeKey"})}}}catch(n){e(Te.create("storage-open",{originalErrorMessage:n?.message}))}}),Zr)}function ik(t){return Tg(Ig(t))}function ok(t,e){return Sg(Ig(t),e)}function ak(t){return Sg(bg,t)}function ck(){return Tg(bg)}async function Sg(t,e){const s=(await Cg()).transaction(yr,"readwrite"),i=s.objectStore(yr).put({compositeKey:t,value:e});return new Promise((o,a)=>{i.onsuccess=c=>{o()},s.onerror=c=>{a(Te.create("storage-set",{originalErrorMessage:c.target.error?.message}))}})}async function Tg(t){const n=(await Cg()).transaction(yr,"readonly"),r=n.objectStore(yr).get(t);return new Promise((i,o)=>{r.onsuccess=a=>{const c=a.target.result;i(c?c.value:void 0)},n.onerror=a=>{o(Te.create("storage-get",{originalErrorMessage:a.target.error?.message}))}})}function Ig(t){return`${t.options.appId}-${t.name}`}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ft=new lo("@firebase/app-check");/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function lk(t){if(Mc()){let e;try{e=await ik(t)}catch(n){Ft.warn(`Failed to read token from IndexedDB. Error: ${n}`)}return e}}function ra(t,e){return Mc()?ok(t,e).catch(n=>{Ft.warn(`Failed to write token to IndexedDB. Error: ${n}`)}):Promise.resolve()}async function uk(){let t;try{t=await ck()}catch{}if(t)return t;{const e=crypto.randomUUID();return ak(e).catch(n=>Ft.warn(`Failed to persist debug token to IndexedDB. Error: ${n}`)),e}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function yl(){return Io().enabled}async function El(){const t=Io();if(t.enabled&&t.token)return t.token.promise;throw Error(`
            Can't get debug token in production mode.
        `)}function dk(){const t=xf(),e=Io();if(e.initialized=!0,typeof t.FIREBASE_APPCHECK_DEBUG_TOKEN!="string"&&t.FIREBASE_APPCHECK_DEBUG_TOKEN!==!0)return;e.enabled=!0;const n=new Ce;e.token=n,typeof t.FIREBASE_APPCHECK_DEBUG_TOKEN=="string"?n.resolve(t.FIREBASE_APPCHECK_DEBUG_TOKEN):n.resolve(uk())}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const hk={error:"UNKNOWN_ERROR"};function fk(t){return ao.encodeString(JSON.stringify(t),!1)}async function Qa(t,e=!1,n=!1){const s=t.app;ml(s);const r=re(s);let i=r.token,o;if(i&&!Wn(i)&&(r.token=void 0,i=void 0),!i){const l=await r.cachedTokenPromise;l&&(Wn(l)?i=l:await ra(s,void 0))}if(!e&&i&&Wn(i))return{token:i.token};let a=!1;if(yl())try{r.exchangeTokenPromise||(r.exchangeTokenPromise=_l(wg(s,await El()),t.heartbeatServiceProvider).finally(()=>{r.exchangeTokenPromise=void 0}),a=!0);const l=await r.exchangeTokenPromise;return await ra(s,l),r.token=l,{token:l.token}}catch(l){return l.code==="appCheck/throttled"||l.code==="appCheck/initial-throttle"?Ft.warn(l.message):n&&Ft.error(l),ia(l)}try{r.exchangeTokenPromise||(r.exchangeTokenPromise=r.provider.getToken().finally(()=>{r.exchangeTokenPromise=void 0}),a=!0),i=await re(s).exchangeTokenPromise}catch(l){l.code==="appCheck/throttled"||l.code==="appCheck/initial-throttle"?Ft.warn(l.message):n&&Ft.error(l),o=l}let c;return i?o?Wn(i)?c={token:i.token,internalError:o}:c=ia(o):(c={token:i.token},r.token=i,await ra(s,i)):c=ia(o),a&&Ag(s,c),c}async function pk(t){const e=t.app;ml(e);const{provider:n}=re(e);if(yl()){const s=await El(),{token:r}=await _l(wg(e,s),t.heartbeatServiceProvider);return{token:r}}else{const{token:s}=await n.getToken();return{token:s}}}function kg(t,e,n,s){const{app:r}=t,i=re(r),o={next:n,error:s,type:e};if(i.tokenObservers=[...i.tokenObservers,o],i.token&&Wn(i.token)){const a=i.token;Promise.resolve().then(()=>{n({token:a.token}),Jd(t)}).catch(()=>{})}i.cachedTokenPromise.then(()=>Jd(t))}function Rg(t,e){const n=re(t),s=n.tokenObservers.filter(r=>r.next!==e);s.length===0&&n.tokenRefresher&&n.tokenRefresher.isRunning()&&n.tokenRefresher.stop(),n.tokenObservers=s}function Jd(t){const{app:e}=t,n=re(e);let s=n.tokenRefresher;s||(s=gk(t),n.tokenRefresher=s),!s.isRunning()&&n.isTokenAutoRefreshEnabled&&s.start()}function gk(t){const{app:e}=t;return new ZI(async()=>{const n=re(e);let s;if(n.token?s=await Qa(t,!0):s=await Qa(t),s.error)throw s.error;if(s.internalError)throw s.internalError},()=>!0,()=>{const n=re(e);if(n.token){let s=n.token.issuedAtTimeMillis+(n.token.expireTimeMillis-n.token.issuedAtTimeMillis)*.5+3e5;const r=n.token.expireTimeMillis-300*1e3;return s=Math.min(s,r),Math.max(0,s-Date.now())}else return 0},Yd.RETRIAL_MIN_WAIT,Yd.RETRIAL_MAX_WAIT)}function Ag(t,e){const n=re(t).tokenObservers;for(const s of n)try{s.type==="EXTERNAL"&&e.error!=null?s.error(e.error):s.next(e)}catch{}}function Wn(t){return t.expireTimeMillis-Date.now()>0}function ia(t){return{token:fk(hk),error:t}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class mk{constructor(e,n){this.app=e,this.heartbeatServiceProvider=n}_delete(){const{tokenObservers:e}=re(this.app);for(const n of e)Rg(this.app,n.next);return Promise.resolve()}}function _k(t,e){return new mk(t,e)}function yk(t){return{getToken:e=>Qa(t,e),getLimitedUseToken:()=>pk(t),addTokenListener:e=>kg(t,"INTERNAL",e),removeTokenListener:e=>Rg(t.app,e)}}const Ek="@firebase/app-check",vk="0.11.0",wk="https://www.google.com/recaptcha/enterprise.js";function bk(t,e){const n=new Ce,s=re(t);s.reCAPTCHAState={initialized:n};const r=Ck(t),i=Kd(!0);return i?Xd(t,e,i,r,n):Ik(()=>{const o=Kd(!0);if(!o)throw new Error("no recaptcha");Xd(t,e,o,r,n)}),n.promise}function Xd(t,e,n,s,r){n.ready(()=>{Tk(t,e,n,s),r.resolve(n)})}function Ck(t){const e=`fire_app_check_${t.name}`,n=document.createElement("div");return n.id=e,n.style.display="none",document.body.appendChild(n),e}async function Sk(t){ml(t);const n=await re(t).reCAPTCHAState.initialized.promise;return new Promise((s,r)=>{const i=re(t).reCAPTCHAState;n.ready(()=>{s(n.execute(i.widgetId,{action:"fire_app_check"}))})})}function Tk(t,e,n,s){const r=n.render(s,{sitekey:e,size:"invisible",callback:()=>{re(t).reCAPTCHAState.succeeded=!0},"error-callback":()=>{re(t).reCAPTCHAState.succeeded=!1}}),i=re(t);i.reCAPTCHAState={...i.reCAPTCHAState,widgetId:r}}function Ik(t){const e=document.createElement("script");e.src=wk,e.onload=t,document.head.appendChild(e)}class vl{constructor(e){this._siteKey=e,this._throttleData=null}async getToken(){Rk(this._throttleData);const e=await Sk(this._app).catch(s=>{throw Te.create("recaptcha-error")});if(!re(this._app).reCAPTCHAState?.succeeded)throw Te.create("recaptcha-error");let n;try{n=await _l(nk(this._app,e),this._heartbeatServiceProvider)}catch(s){throw s.code?.includes("fetch-status-error")?(this._throttleData=kk(Number(s.customData?.httpStatus),this._throttleData),Te.create("initial-throttle",{time:vg(this._throttleData.allowRequestsAfter-Date.now()),httpStatus:this._throttleData.httpStatus})):s}return this._throttleData=null,n}initialize(e){this._app=e,this._heartbeatServiceProvider=Ar(e,"heartbeat"),bk(e,this._siteKey).catch(()=>{})}isEqual(e){return e instanceof vl?this._siteKey===e._siteKey:!1}}function kk(t,e){if(t===404||t===403)return{backoffCount:1,allowRequestsAfter:Date.now()+QI,httpStatus:t};{const n=e?e.backoffCount:0,s=Nb(n,1e3,2);return{backoffCount:n+1,allowRequestsAfter:Date.now()+s,httpStatus:t}}}function Rk(t){if(t&&Date.now()-t.allowRequestsAfter<=0)throw Te.create("throttled",{time:vg(t.allowRequestsAfter-Date.now()),httpStatus:t.httpStatus})}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ak(t=Fc(),e){t=de(t);const n=Ar(t,"app-check");if(Io().initialized||dk(),yl()&&El().then(r=>console.log(`App Check debug token: ${r}. You will need to add it to your app's App Check settings in the Firebase console for it to work.`)),n.isInitialized()){const r=n.getImmediate(),i=n.getOptions();if(i.isTokenAutoRefreshEnabled===e.isTokenAutoRefreshEnabled&&i.provider.isEqual(e.provider))return r;throw Te.create("already-initialized",{appName:t.name})}const s=n.initialize({options:e});return Nk(t,e.provider,e.isTokenAutoRefreshEnabled),re(t).isTokenAutoRefreshEnabled&&kg(s,"INTERNAL",()=>{}),s}function Nk(t,e,n=!1){const s=KI(t,{...yg});s.activated=!0,s.provider=e,s.cachedTokenPromise=lk(t).then(r=>(r&&Wn(r)&&(s.token=r,Ag(t,{token:r.token})),r)),s.isTokenAutoRefreshEnabled=n&&t.automaticDataCollectionEnabled,!t.automaticDataCollectionEnabled&&n&&Ft.warn("`isTokenAutoRefreshEnabled` is true but `automaticDataCollectionEnabled` was set to false during `initializeApp()`. This blocks automatic token refresh."),s.provider.initialize(t)}const Pk="app-check",Qd="app-check-internal";function Lk(){Gt(new Ct(Pk,t=>{const e=t.getProvider("app").getImmediate(),n=t.getProvider("heartbeat");return _k(e,n)},"PUBLIC").setInstantiationMode("EXPLICIT").setInstanceCreatedCallback((t,e,n)=>{t.getProvider(Qd).initialize()})),Gt(new Ct(Qd,t=>{const e=t.getProvider("app-check").getImmediate();return yk(e)},"PUBLIC").setInstantiationMode("EXPLICIT")),vt(Ek,vk)}Lk();const Ok={apiKey:"AIzaSyA-fvCaKCjyEFX__YAVr1oPGdVsUEhFehA",authDomain:"vidu-aae11.firebaseapp.com",projectId:"vidu-aae11",databaseURL:"https://vidu-aae11-default-rtdb.europe-west1.firebasedatabase.app",storageBucket:"vidu-aae11.firebasestorage.app",messagingSenderId:"765724787439",appId:"1:765724787439:web:61a3b5dd538149564c911a",measurementId:"G-EGJ53HLGY4"},wl=qf(Ok),Zd="6LdBIBgsAAAAAB4zIcXaZI-FD4kt21TWs9Zx9_fp";let Za;if(Zd.trim()!=="")Za=new vl(Zd),console.info("[Firebase App Check: PROD] Initializing with ReCAPTCHA Enterprise (invisible mode).");else throw console.error("[Firebase App Check: PROD] VITE_RECAPTCHA_ENTERPRISE_SITE_KEY is missing or empty. App Check will NOT be initialized, leaving Firebase services unprotected!"),new Error("Firebase App Check configuration missing in production.");if(Za)try{Ak(wl,{provider:Za,isTokenAutoRefreshEnabled:!0})}catch(t){console.error("[Firebase App Check] initializeAppCheck call failed:",t)}const T=mg(wl),je=[];function hn(t,e,n,s=null,r=null,i=null){e==="value"?Fr(t,n):e==="child_added"?$i(t,n):e==="child_removed"?fg(t,n):console.warn(`Unknown listener type: ${e}`),je.push({ref:t,type:e,callback:n,roomId:s,userId:r,category:i})}function Dk(){je.forEach(({ref:t,type:e,callback:n})=>{try{Le(t,e,n)}catch(s){console.warn("Failed to remove firebase rtdb listener",s)}}),je.length=0}function ko(t){if(!t)return;je.filter(s=>s.roomId===t).forEach(({ref:s,type:r,callback:i})=>{try{Le(s,r,i)}catch(o){console.warn(`Failed to remove listener for room ${t}`,o)}});const n=je.filter(s=>s.roomId!==t);je.length=0,je.push(...n)}function Mk(t,e){if(!t||!e)return;const n=i=>i.userId===t&&i.roomId===e;je.filter(n).forEach(({ref:i,type:o,callback:a})=>{try{Le(i,o,a)}catch(c){console.warn(`Failed to remove listener for user ${t} in room ${e}`,c)}});const r=je.filter(i=>!n(i));je.length=0,je.push(...r)}function li(t,e,n=null){hn(t,"value",e,n)}const on=t=>S(T,`rooms/${t}`),ei=t=>S(T,`rooms/${t}/members`),eh=(t,e)=>S(T,`rooms/${t}/members/${e}`),xk=t=>S(T,`rooms/${t}/cancellation`),Ro=t=>S(T,`rooms/${t}/watch`),Fk=t=>S(T,`users/${t}/recentCalls`),bl=(t,e)=>S(T,`users/${t}/recentCalls/${e}`),Cl=t=>S(T,`users/${t}/outgoingCall`),Ng=t=>S(T,`rooms/${t}/offerCandidates`),Pg=t=>S(T,`rooms/${t}/answerCandidates`);function Lg(){return{"dependent-sdk-initialized-before-auth":"Another Firebase SDK was initialized and is trying to use Auth before Auth is initialized. Please be sure to call `initializeAuth` or `getAuth` before starting any other Firebase SDK."}}const Uk=Lg,Og=new Cs("auth","Firebase",Lg());/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Bi=new lo("@firebase/auth");function $k(t,...e){Bi.logLevel<=x.WARN&&Bi.warn(`Auth (${Ts}): ${t}`,...e)}function ui(t,...e){Bi.logLevel<=x.ERROR&&Bi.error(`Auth (${Ts}): ${t}`,...e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ct(t,...e){throw Tl(t,...e)}function Ke(t,...e){return Tl(t,...e)}function Sl(t,e,n){const s={...Uk(),[e]:n};return new Cs("auth","Firebase",s).create(e,{appName:t.name})}function En(t){return Sl(t,"operation-not-supported-in-this-environment","Operations that alter the current user are not supported in conjunction with FirebaseServerApp")}function Bk(t,e,n){const s=n;if(!(e instanceof s))throw s.name!==e.constructor.name&&ct(t,"argument-error"),Sl(t,"argument-error",`Type of ${e.constructor.name} does not match expected instance.Did you pass a reference from a different Auth SDK?`)}function Tl(t,...e){if(typeof t!="string"){const n=e[0],s=[...e.slice(1)];return s[0]&&(s[0].appName=t.name),t._errorFactory.create(n,...s)}return Og.create(t,...e)}function C(t,e,...n){if(!t)throw Tl(e,...n)}function ft(t){const e="INTERNAL ASSERTION FAILED: "+t;throw ui(e),new Error(e)}function It(t,e){t||ft(e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ec(){return typeof self<"u"&&self.location?.href||""}function Hk(){return th()==="http:"||th()==="https:"}function th(){return typeof self<"u"&&self.location?.protocol||null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Vk(){return typeof navigator<"u"&&navigator&&"onLine"in navigator&&typeof navigator.onLine=="boolean"&&(Hk()||hb()||"connection"in navigator)?navigator.onLine:!0}function Wk(){if(typeof navigator>"u")return null;const t=navigator;return t.languages&&t.languages[0]||t.language||null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ur{constructor(e,n){this.shortDelay=e,this.longDelay=n,It(n>e,"Short delay should be less than long delay!"),this.isMobile=Dc()||Vf()}get(){return Vk()?this.isMobile?this.longDelay:this.shortDelay:Math.min(5e3,this.shortDelay)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Il(t,e){It(t.emulator,"Emulator should always be set here");const{url:n}=t.emulator;return e?`${n}${e.startsWith("/")?e.slice(1):e}`:n}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Dg{static initialize(e,n,s){this.fetchImpl=e,n&&(this.headersImpl=n),s&&(this.responseImpl=s)}static fetch(){if(this.fetchImpl)return this.fetchImpl;if(typeof self<"u"&&"fetch"in self)return self.fetch;if(typeof globalThis<"u"&&globalThis.fetch)return globalThis.fetch;if(typeof fetch<"u")return fetch;ft("Could not find fetch implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static headers(){if(this.headersImpl)return this.headersImpl;if(typeof self<"u"&&"Headers"in self)return self.Headers;if(typeof globalThis<"u"&&globalThis.Headers)return globalThis.Headers;if(typeof Headers<"u")return Headers;ft("Could not find Headers implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static response(){if(this.responseImpl)return this.responseImpl;if(typeof self<"u"&&"Response"in self)return self.Response;if(typeof globalThis<"u"&&globalThis.Response)return globalThis.Response;if(typeof Response<"u")return Response;ft("Could not find Response implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const jk={CREDENTIAL_MISMATCH:"custom-token-mismatch",MISSING_CUSTOM_TOKEN:"internal-error",INVALID_IDENTIFIER:"invalid-email",MISSING_CONTINUE_URI:"internal-error",INVALID_PASSWORD:"wrong-password",MISSING_PASSWORD:"missing-password",INVALID_LOGIN_CREDENTIALS:"invalid-credential",EMAIL_EXISTS:"email-already-in-use",PASSWORD_LOGIN_DISABLED:"operation-not-allowed",INVALID_IDP_RESPONSE:"invalid-credential",INVALID_PENDING_TOKEN:"invalid-credential",FEDERATED_USER_ID_ALREADY_LINKED:"credential-already-in-use",MISSING_REQ_TYPE:"internal-error",EMAIL_NOT_FOUND:"user-not-found",RESET_PASSWORD_EXCEED_LIMIT:"too-many-requests",EXPIRED_OOB_CODE:"expired-action-code",INVALID_OOB_CODE:"invalid-action-code",MISSING_OOB_CODE:"internal-error",CREDENTIAL_TOO_OLD_LOGIN_AGAIN:"requires-recent-login",INVALID_ID_TOKEN:"invalid-user-token",TOKEN_EXPIRED:"user-token-expired",USER_NOT_FOUND:"user-token-expired",TOO_MANY_ATTEMPTS_TRY_LATER:"too-many-requests",PASSWORD_DOES_NOT_MEET_REQUIREMENTS:"password-does-not-meet-requirements",INVALID_CODE:"invalid-verification-code",INVALID_SESSION_INFO:"invalid-verification-id",INVALID_TEMPORARY_PROOF:"invalid-credential",MISSING_SESSION_INFO:"missing-verification-id",SESSION_EXPIRED:"code-expired",MISSING_ANDROID_PACKAGE_NAME:"missing-android-pkg-name",UNAUTHORIZED_DOMAIN:"unauthorized-continue-uri",INVALID_OAUTH_CLIENT_ID:"invalid-oauth-client-id",ADMIN_ONLY_OPERATION:"admin-restricted-operation",INVALID_MFA_PENDING_CREDENTIAL:"invalid-multi-factor-session",MFA_ENROLLMENT_NOT_FOUND:"multi-factor-info-not-found",MISSING_MFA_ENROLLMENT_ID:"missing-multi-factor-info",MISSING_MFA_PENDING_CREDENTIAL:"missing-multi-factor-session",SECOND_FACTOR_EXISTS:"second-factor-already-in-use",SECOND_FACTOR_LIMIT_EXCEEDED:"maximum-second-factor-count-exceeded",BLOCKING_FUNCTION_ERROR_RESPONSE:"internal-error",RECAPTCHA_NOT_ENABLED:"recaptcha-not-enabled",MISSING_RECAPTCHA_TOKEN:"missing-recaptcha-token",INVALID_RECAPTCHA_TOKEN:"invalid-recaptcha-token",INVALID_RECAPTCHA_ACTION:"invalid-recaptcha-action",MISSING_CLIENT_TYPE:"missing-client-type",MISSING_RECAPTCHA_VERSION:"missing-recaptcha-version",INVALID_RECAPTCHA_VERSION:"invalid-recaptcha-version",INVALID_REQ_TYPE:"invalid-req-type"};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const zk=["/v1/accounts:signInWithCustomToken","/v1/accounts:signInWithEmailLink","/v1/accounts:signInWithIdp","/v1/accounts:signInWithPassword","/v1/accounts:signInWithPhoneNumber","/v1/token"],qk=new Ur(3e4,6e4);function kl(t,e){return t.tenantId&&!e.tenantId?{...e,tenantId:t.tenantId}:e}async function Ns(t,e,n,s,r={}){return Mg(t,r,async()=>{let i={},o={};s&&(e==="GET"?o=s:i={body:JSON.stringify(s)});const a=Ss({key:t.config.apiKey,...o}).slice(1),c=await t._getAdditionalHeaders();c["Content-Type"]="application/json",t.languageCode&&(c["X-Firebase-Locale"]=t.languageCode);const l={method:e,headers:c,...i};return db()||(l.referrerPolicy="no-referrer"),t.emulatorConfig&&bs(t.emulatorConfig.host)&&(l.credentials="include"),Dg.fetch()(await xg(t,t.config.apiHost,n,a),l)})}async function Mg(t,e,n){t._canInitEmulator=!1;const s={...jk,...e};try{const r=new Yk(t),i=await Promise.race([n(),r.promise]);r.clearNetworkTimeout();const o=await i.json();if("needConfirmation"in o)throw ti(t,"account-exists-with-different-credential",o);if(i.ok&&!("errorMessage"in o))return o;{const a=i.ok?o.errorMessage:o.error.message,[c,l]=a.split(" : ");if(c==="FEDERATED_USER_ID_ALREADY_LINKED")throw ti(t,"credential-already-in-use",o);if(c==="EMAIL_EXISTS")throw ti(t,"email-already-in-use",o);if(c==="USER_DISABLED")throw ti(t,"user-disabled",o);const u=s[c]||c.toLowerCase().replace(/[_\s]+/g,"-");if(l)throw Sl(t,u,l);ct(t,u)}}catch(r){if(r instanceof en)throw r;ct(t,"network-request-failed",{message:String(r)})}}async function Gk(t,e,n,s,r={}){const i=await Ns(t,e,n,s,r);return"mfaPendingCredential"in i&&ct(t,"multi-factor-auth-required",{_serverResponse:i}),i}async function xg(t,e,n,s){const r=`${e}${n}?${s}`,i=t,o=i.config.emulator?Il(t.config,r):`${t.config.apiScheme}://${r}`;return zk.includes(n)&&(await i._persistenceManagerAvailable,i._getPersistenceType()==="COOKIE")?i._getPersistence()._getFinalTarget(o).toString():o}class Yk{clearNetworkTimeout(){clearTimeout(this.timer)}constructor(e){this.auth=e,this.timer=null,this.promise=new Promise((n,s)=>{this.timer=setTimeout(()=>s(Ke(this.auth,"network-request-failed")),qk.get())})}}function ti(t,e,n){const s={appName:t.name};n.email&&(s.email=n.email),n.phoneNumber&&(s.phoneNumber=n.phoneNumber);const r=Ke(t,e,s);return r.customData._tokenResponse=n,r}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Kk(t,e){return Ns(t,"POST","/v1/accounts:delete",e)}async function Hi(t,e){return Ns(t,"POST","/v1/accounts:lookup",e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Zs(t){if(t)try{const e=new Date(Number(t));if(!isNaN(e.getTime()))return e.toUTCString()}catch{}}async function Jk(t,e=!1){const n=de(t),s=await n.getIdToken(e),r=Rl(s);C(r&&r.exp&&r.auth_time&&r.iat,n.auth,"internal-error");const i=typeof r.firebase=="object"?r.firebase:void 0,o=i?.sign_in_provider;return{claims:r,token:s,authTime:Zs(oa(r.auth_time)),issuedAtTime:Zs(oa(r.iat)),expirationTime:Zs(oa(r.exp)),signInProvider:o||null,signInSecondFactor:i?.sign_in_second_factor||null}}function oa(t){return Number(t)*1e3}function Rl(t){const[e,n,s]=t.split(".");if(e===void 0||n===void 0||s===void 0)return ui("JWT malformed, contained fewer than 3 sections"),null;try{const r=vi(n);return r?JSON.parse(r):(ui("Failed to decode base64 JWT payload"),null)}catch(r){return ui("Caught error parsing JWT payload as JSON",r?.toString()),null}}function nh(t){const e=Rl(t);return C(e,"internal-error"),C(typeof e.exp<"u","internal-error"),C(typeof e.iat<"u","internal-error"),Number(e.exp)-Number(e.iat)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Er(t,e,n=!1){if(n)return e;try{return await e}catch(s){throw s instanceof en&&Xk(s)&&t.auth.currentUser===t&&await t.auth.signOut(),s}}function Xk({code:t}){return t==="auth/user-disabled"||t==="auth/user-token-expired"}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Qk{constructor(e){this.user=e,this.isRunning=!1,this.timerId=null,this.errorBackoff=3e4}_start(){this.isRunning||(this.isRunning=!0,this.schedule())}_stop(){this.isRunning&&(this.isRunning=!1,this.timerId!==null&&clearTimeout(this.timerId))}getInterval(e){if(e){const n=this.errorBackoff;return this.errorBackoff=Math.min(this.errorBackoff*2,96e4),n}else{this.errorBackoff=3e4;const s=(this.user.stsTokenManager.expirationTime??0)-Date.now()-3e5;return Math.max(0,s)}}schedule(e=!1){if(!this.isRunning)return;const n=this.getInterval(e);this.timerId=setTimeout(async()=>{await this.iteration()},n)}async iteration(){try{await this.user.getIdToken(!0)}catch(e){e?.code==="auth/network-request-failed"&&this.schedule(!0);return}this.schedule()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class tc{constructor(e,n){this.createdAt=e,this.lastLoginAt=n,this._initializeTime()}_initializeTime(){this.lastSignInTime=Zs(this.lastLoginAt),this.creationTime=Zs(this.createdAt)}_copy(e){this.createdAt=e.createdAt,this.lastLoginAt=e.lastLoginAt,this._initializeTime()}toJSON(){return{createdAt:this.createdAt,lastLoginAt:this.lastLoginAt}}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Vi(t){const e=t.auth,n=await t.getIdToken(),s=await Er(t,Hi(e,{idToken:n}));C(s?.users.length,e,"internal-error");const r=s.users[0];t._notifyReloadListener(r);const i=r.providerUserInfo?.length?Fg(r.providerUserInfo):[],o=eR(t.providerData,i),a=t.isAnonymous,c=!(t.email&&r.passwordHash)&&!o?.length,l=a?c:!1,u={uid:r.localId,displayName:r.displayName||null,photoURL:r.photoUrl||null,email:r.email||null,emailVerified:r.emailVerified||!1,phoneNumber:r.phoneNumber||null,tenantId:r.tenantId||null,providerData:o,metadata:new tc(r.createdAt,r.lastLoginAt),isAnonymous:l};Object.assign(t,u)}async function Zk(t){const e=de(t);await Vi(e),await e.auth._persistUserIfCurrent(e),e.auth._notifyListenersIfCurrent(e)}function eR(t,e){return[...t.filter(s=>!e.some(r=>r.providerId===s.providerId)),...e]}function Fg(t){return t.map(({providerId:e,...n})=>({providerId:e,uid:n.rawId||"",displayName:n.displayName||null,email:n.email||null,phoneNumber:n.phoneNumber||null,photoURL:n.photoUrl||null}))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function tR(t,e){const n=await Mg(t,{},async()=>{const s=Ss({grant_type:"refresh_token",refresh_token:e}).slice(1),{tokenApiHost:r,apiKey:i}=t.config,o=await xg(t,r,"/v1/token",`key=${i}`),a=await t._getAdditionalHeaders();a["Content-Type"]="application/x-www-form-urlencoded";const c={method:"POST",headers:a,body:s};return t.emulatorConfig&&bs(t.emulatorConfig.host)&&(c.credentials="include"),Dg.fetch()(o,c)});return{accessToken:n.access_token,expiresIn:n.expires_in,refreshToken:n.refresh_token}}async function nR(t,e){return Ns(t,"POST","/v2/accounts:revokeToken",kl(t,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Gn{constructor(){this.refreshToken=null,this.accessToken=null,this.expirationTime=null}get isExpired(){return!this.expirationTime||Date.now()>this.expirationTime-3e4}updateFromServerResponse(e){C(e.idToken,"internal-error"),C(typeof e.idToken<"u","internal-error"),C(typeof e.refreshToken<"u","internal-error");const n="expiresIn"in e&&typeof e.expiresIn<"u"?Number(e.expiresIn):nh(e.idToken);this.updateTokensAndExpiration(e.idToken,e.refreshToken,n)}updateFromIdToken(e){C(e.length!==0,"internal-error");const n=nh(e);this.updateTokensAndExpiration(e,null,n)}async getToken(e,n=!1){return!n&&this.accessToken&&!this.isExpired?this.accessToken:(C(this.refreshToken,e,"user-token-expired"),this.refreshToken?(await this.refresh(e,this.refreshToken),this.accessToken):null)}clearRefreshToken(){this.refreshToken=null}async refresh(e,n){const{accessToken:s,refreshToken:r,expiresIn:i}=await tR(e,n);this.updateTokensAndExpiration(s,r,Number(i))}updateTokensAndExpiration(e,n,s){this.refreshToken=n||null,this.accessToken=e||null,this.expirationTime=Date.now()+s*1e3}static fromJSON(e,n){const{refreshToken:s,accessToken:r,expirationTime:i}=n,o=new Gn;return s&&(C(typeof s=="string","internal-error",{appName:e}),o.refreshToken=s),r&&(C(typeof r=="string","internal-error",{appName:e}),o.accessToken=r),i&&(C(typeof i=="number","internal-error",{appName:e}),o.expirationTime=i),o}toJSON(){return{refreshToken:this.refreshToken,accessToken:this.accessToken,expirationTime:this.expirationTime}}_assign(e){this.accessToken=e.accessToken,this.refreshToken=e.refreshToken,this.expirationTime=e.expirationTime}_clone(){return Object.assign(new Gn,this.toJSON())}_performRefresh(){return ft("not implemented")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Nt(t,e){C(typeof t=="string"||typeof t>"u","internal-error",{appName:e})}class ze{constructor({uid:e,auth:n,stsTokenManager:s,...r}){this.providerId="firebase",this.proactiveRefresh=new Qk(this),this.reloadUserInfo=null,this.reloadListener=null,this.uid=e,this.auth=n,this.stsTokenManager=s,this.accessToken=s.accessToken,this.displayName=r.displayName||null,this.email=r.email||null,this.emailVerified=r.emailVerified||!1,this.phoneNumber=r.phoneNumber||null,this.photoURL=r.photoURL||null,this.isAnonymous=r.isAnonymous||!1,this.tenantId=r.tenantId||null,this.providerData=r.providerData?[...r.providerData]:[],this.metadata=new tc(r.createdAt||void 0,r.lastLoginAt||void 0)}async getIdToken(e){const n=await Er(this,this.stsTokenManager.getToken(this.auth,e));return C(n,this.auth,"internal-error"),this.accessToken!==n&&(this.accessToken=n,await this.auth._persistUserIfCurrent(this),this.auth._notifyListenersIfCurrent(this)),n}getIdTokenResult(e){return Jk(this,e)}reload(){return Zk(this)}_assign(e){this!==e&&(C(this.uid===e.uid,this.auth,"internal-error"),this.displayName=e.displayName,this.photoURL=e.photoURL,this.email=e.email,this.emailVerified=e.emailVerified,this.phoneNumber=e.phoneNumber,this.isAnonymous=e.isAnonymous,this.tenantId=e.tenantId,this.providerData=e.providerData.map(n=>({...n})),this.metadata._copy(e.metadata),this.stsTokenManager._assign(e.stsTokenManager))}_clone(e){const n=new ze({...this,auth:e,stsTokenManager:this.stsTokenManager._clone()});return n.metadata._copy(this.metadata),n}_onReload(e){C(!this.reloadListener,this.auth,"internal-error"),this.reloadListener=e,this.reloadUserInfo&&(this._notifyReloadListener(this.reloadUserInfo),this.reloadUserInfo=null)}_notifyReloadListener(e){this.reloadListener?this.reloadListener(e):this.reloadUserInfo=e}_startProactiveRefresh(){this.proactiveRefresh._start()}_stopProactiveRefresh(){this.proactiveRefresh._stop()}async _updateTokensIfNecessary(e,n=!1){let s=!1;e.idToken&&e.idToken!==this.stsTokenManager.accessToken&&(this.stsTokenManager.updateFromServerResponse(e),s=!0),n&&await Vi(this),await this.auth._persistUserIfCurrent(this),s&&this.auth._notifyListenersIfCurrent(this)}async delete(){if(Be(this.auth.app))return Promise.reject(En(this.auth));const e=await this.getIdToken();return await Er(this,Kk(this.auth,{idToken:e})),this.stsTokenManager.clearRefreshToken(),this.auth.signOut()}toJSON(){return{uid:this.uid,email:this.email||void 0,emailVerified:this.emailVerified,displayName:this.displayName||void 0,isAnonymous:this.isAnonymous,photoURL:this.photoURL||void 0,phoneNumber:this.phoneNumber||void 0,tenantId:this.tenantId||void 0,providerData:this.providerData.map(e=>({...e})),stsTokenManager:this.stsTokenManager.toJSON(),_redirectEventId:this._redirectEventId,...this.metadata.toJSON(),apiKey:this.auth.config.apiKey,appName:this.auth.name}}get refreshToken(){return this.stsTokenManager.refreshToken||""}static _fromJSON(e,n){const s=n.displayName??void 0,r=n.email??void 0,i=n.phoneNumber??void 0,o=n.photoURL??void 0,a=n.tenantId??void 0,c=n._redirectEventId??void 0,l=n.createdAt??void 0,u=n.lastLoginAt??void 0,{uid:d,emailVerified:h,isAnonymous:f,providerData:p,stsTokenManager:_}=n;C(d&&_,e,"internal-error");const m=Gn.fromJSON(this.name,_);C(typeof d=="string",e,"internal-error"),Nt(s,e.name),Nt(r,e.name),C(typeof h=="boolean",e,"internal-error"),C(typeof f=="boolean",e,"internal-error"),Nt(i,e.name),Nt(o,e.name),Nt(a,e.name),Nt(c,e.name),Nt(l,e.name),Nt(u,e.name);const R=new ze({uid:d,auth:e,email:r,emailVerified:h,displayName:s,isAnonymous:f,photoURL:o,phoneNumber:i,tenantId:a,stsTokenManager:m,createdAt:l,lastLoginAt:u});return p&&Array.isArray(p)&&(R.providerData=p.map(W=>({...W}))),c&&(R._redirectEventId=c),R}static async _fromIdTokenResponse(e,n,s=!1){const r=new Gn;r.updateFromServerResponse(n);const i=new ze({uid:n.localId,auth:e,stsTokenManager:r,isAnonymous:s});return await Vi(i),i}static async _fromGetAccountInfoResponse(e,n,s){const r=n.users[0];C(r.localId!==void 0,"internal-error");const i=r.providerUserInfo!==void 0?Fg(r.providerUserInfo):[],o=!(r.email&&r.passwordHash)&&!i?.length,a=new Gn;a.updateFromIdToken(s);const c=new ze({uid:r.localId,auth:e,stsTokenManager:a,isAnonymous:o}),l={uid:r.localId,displayName:r.displayName||null,photoURL:r.photoUrl||null,email:r.email||null,emailVerified:r.emailVerified||!1,phoneNumber:r.phoneNumber||null,tenantId:r.tenantId||null,providerData:i,metadata:new tc(r.createdAt,r.lastLoginAt),isAnonymous:!(r.email&&r.passwordHash)&&!i?.length};return Object.assign(c,l),c}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const sh=new Map;function pt(t){It(t instanceof Function,"Expected a class definition");let e=sh.get(t);return e?(It(e instanceof t,"Instance stored in cache mismatched with class"),e):(e=new t,sh.set(t,e),e)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ug{constructor(){this.type="NONE",this.storage={}}async _isAvailable(){return!0}async _set(e,n){this.storage[e]=n}async _get(e){const n=this.storage[e];return n===void 0?null:n}async _remove(e){delete this.storage[e]}_addListener(e,n){}_removeListener(e,n){}}Ug.type="NONE";const nc=Ug;/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function di(t,e,n){return`firebase:${t}:${e}:${n}`}class Yn{constructor(e,n,s){this.persistence=e,this.auth=n,this.userKey=s;const{config:r,name:i}=this.auth;this.fullUserKey=di(this.userKey,r.apiKey,i),this.fullPersistenceKey=di("persistence",r.apiKey,i),this.boundEventHandler=n._onStorageEvent.bind(n),this.persistence._addListener(this.fullUserKey,this.boundEventHandler)}setCurrentUser(e){return this.persistence._set(this.fullUserKey,e.toJSON())}async getCurrentUser(){const e=await this.persistence._get(this.fullUserKey);if(!e)return null;if(typeof e=="string"){const n=await Hi(this.auth,{idToken:e}).catch(()=>{});return n?ze._fromGetAccountInfoResponse(this.auth,n,e):null}return ze._fromJSON(this.auth,e)}removeCurrentUser(){return this.persistence._remove(this.fullUserKey)}savePersistenceForRedirect(){return this.persistence._set(this.fullPersistenceKey,this.persistence.type)}async setPersistence(e){if(this.persistence===e)return;const n=await this.getCurrentUser();if(await this.removeCurrentUser(),this.persistence=e,n)return this.setCurrentUser(n)}delete(){this.persistence._removeListener(this.fullUserKey,this.boundEventHandler)}static async create(e,n,s="authUser"){if(!n.length)return new Yn(pt(nc),e,s);const r=(await Promise.all(n.map(async l=>{if(await l._isAvailable())return l}))).filter(l=>l);let i=r[0]||pt(nc);const o=di(s,e.config.apiKey,e.name);let a=null;for(const l of n)try{const u=await l._get(o);if(u){let d;if(typeof u=="string"){const h=await Hi(e,{idToken:u}).catch(()=>{});if(!h)break;d=await ze._fromGetAccountInfoResponse(e,h,u)}else d=ze._fromJSON(e,u);l!==i&&(a=d),i=l;break}}catch{}const c=r.filter(l=>l._shouldAllowMigration);return!i._shouldAllowMigration||!c.length?new Yn(i,e,s):(i=c[0],a&&await i._set(o,a.toJSON()),await Promise.all(n.map(async l=>{if(l!==i)try{await l._remove(o)}catch{}})),new Yn(i,e,s))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function rh(t){const e=t.toLowerCase();if(e.includes("opera/")||e.includes("opr/")||e.includes("opios/"))return"Opera";if(Vg(e))return"IEMobile";if(e.includes("msie")||e.includes("trident/"))return"IE";if(e.includes("edge/"))return"Edge";if($g(e))return"Firefox";if(e.includes("silk/"))return"Silk";if(jg(e))return"Blackberry";if(zg(e))return"Webos";if(Bg(e))return"Safari";if((e.includes("chrome/")||Hg(e))&&!e.includes("edge/"))return"Chrome";if(Wg(e))return"Android";{const n=/([a-zA-Z\d\.]+)\/[a-zA-Z\d\.]*$/,s=t.match(n);if(s?.length===2)return s[1]}return"Other"}function $g(t=we()){return/firefox\//i.test(t)}function Bg(t=we()){const e=t.toLowerCase();return e.includes("safari/")&&!e.includes("chrome/")&&!e.includes("crios/")&&!e.includes("android")}function Hg(t=we()){return/crios\//i.test(t)}function Vg(t=we()){return/iemobile/i.test(t)}function Wg(t=we()){return/android/i.test(t)}function jg(t=we()){return/blackberry/i.test(t)}function zg(t=we()){return/webos/i.test(t)}function Al(t=we()){return/iphone|ipad|ipod/i.test(t)||/macintosh/i.test(t)&&/mobile/i.test(t)}function sR(t=we()){return Al(t)&&!!window.navigator?.standalone}function rR(){return fb()&&document.documentMode===10}function qg(t=we()){return Al(t)||Wg(t)||zg(t)||jg(t)||/windows phone/i.test(t)||Vg(t)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Gg(t,e=[]){let n;switch(t){case"Browser":n=rh(we());break;case"Worker":n=`${rh(we())}-${t}`;break;default:n=t}const s=e.length?e.join(","):"FirebaseCore-web";return`${n}/JsCore/${Ts}/${s}`}/**
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
 */class iR{constructor(e){this.auth=e,this.queue=[]}pushCallback(e,n){const s=i=>new Promise((o,a)=>{try{const c=e(i);o(c)}catch(c){a(c)}});s.onAbort=n,this.queue.push(s);const r=this.queue.length-1;return()=>{this.queue[r]=()=>Promise.resolve()}}async runMiddleware(e){if(this.auth.currentUser===e)return;const n=[];try{for(const s of this.queue)await s(e),s.onAbort&&n.push(s.onAbort)}catch(s){n.reverse();for(const r of n)try{r()}catch{}throw this.auth._errorFactory.create("login-blocked",{originalMessage:s?.message})}}}/**
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
 */async function oR(t,e={}){return Ns(t,"GET","/v2/passwordPolicy",kl(t,e))}/**
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
 */const aR=6;class cR{constructor(e){const n=e.customStrengthOptions;this.customStrengthOptions={},this.customStrengthOptions.minPasswordLength=n.minPasswordLength??aR,n.maxPasswordLength&&(this.customStrengthOptions.maxPasswordLength=n.maxPasswordLength),n.containsLowercaseCharacter!==void 0&&(this.customStrengthOptions.containsLowercaseLetter=n.containsLowercaseCharacter),n.containsUppercaseCharacter!==void 0&&(this.customStrengthOptions.containsUppercaseLetter=n.containsUppercaseCharacter),n.containsNumericCharacter!==void 0&&(this.customStrengthOptions.containsNumericCharacter=n.containsNumericCharacter),n.containsNonAlphanumericCharacter!==void 0&&(this.customStrengthOptions.containsNonAlphanumericCharacter=n.containsNonAlphanumericCharacter),this.enforcementState=e.enforcementState,this.enforcementState==="ENFORCEMENT_STATE_UNSPECIFIED"&&(this.enforcementState="OFF"),this.allowedNonAlphanumericCharacters=e.allowedNonAlphanumericCharacters?.join("")??"",this.forceUpgradeOnSignin=e.forceUpgradeOnSignin??!1,this.schemaVersion=e.schemaVersion}validatePassword(e){const n={isValid:!0,passwordPolicy:this};return this.validatePasswordLengthOptions(e,n),this.validatePasswordCharacterOptions(e,n),n.isValid&&(n.isValid=n.meetsMinPasswordLength??!0),n.isValid&&(n.isValid=n.meetsMaxPasswordLength??!0),n.isValid&&(n.isValid=n.containsLowercaseLetter??!0),n.isValid&&(n.isValid=n.containsUppercaseLetter??!0),n.isValid&&(n.isValid=n.containsNumericCharacter??!0),n.isValid&&(n.isValid=n.containsNonAlphanumericCharacter??!0),n}validatePasswordLengthOptions(e,n){const s=this.customStrengthOptions.minPasswordLength,r=this.customStrengthOptions.maxPasswordLength;s&&(n.meetsMinPasswordLength=e.length>=s),r&&(n.meetsMaxPasswordLength=e.length<=r)}validatePasswordCharacterOptions(e,n){this.updatePasswordCharacterOptionsStatuses(n,!1,!1,!1,!1);let s;for(let r=0;r<e.length;r++)s=e.charAt(r),this.updatePasswordCharacterOptionsStatuses(n,s>="a"&&s<="z",s>="A"&&s<="Z",s>="0"&&s<="9",this.allowedNonAlphanumericCharacters.includes(s))}updatePasswordCharacterOptionsStatuses(e,n,s,r,i){this.customStrengthOptions.containsLowercaseLetter&&(e.containsLowercaseLetter||(e.containsLowercaseLetter=n)),this.customStrengthOptions.containsUppercaseLetter&&(e.containsUppercaseLetter||(e.containsUppercaseLetter=s)),this.customStrengthOptions.containsNumericCharacter&&(e.containsNumericCharacter||(e.containsNumericCharacter=r)),this.customStrengthOptions.containsNonAlphanumericCharacter&&(e.containsNonAlphanumericCharacter||(e.containsNonAlphanumericCharacter=i))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class lR{constructor(e,n,s,r){this.app=e,this.heartbeatServiceProvider=n,this.appCheckServiceProvider=s,this.config=r,this.currentUser=null,this.emulatorConfig=null,this.operations=Promise.resolve(),this.authStateSubscription=new ih(this),this.idTokenSubscription=new ih(this),this.beforeStateQueue=new iR(this),this.redirectUser=null,this.isProactiveRefreshEnabled=!1,this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION=1,this._canInitEmulator=!0,this._isInitialized=!1,this._deleted=!1,this._initializationPromise=null,this._popupRedirectResolver=null,this._errorFactory=Og,this._agentRecaptchaConfig=null,this._tenantRecaptchaConfigs={},this._projectPasswordPolicy=null,this._tenantPasswordPolicies={},this._resolvePersistenceManagerAvailable=void 0,this.lastNotifiedUid=void 0,this.languageCode=null,this.tenantId=null,this.settings={appVerificationDisabledForTesting:!1},this.frameworks=[],this.name=e.name,this.clientVersion=r.sdkClientVersion,this._persistenceManagerAvailable=new Promise(i=>this._resolvePersistenceManagerAvailable=i)}_initializeWithPersistence(e,n){return n&&(this._popupRedirectResolver=pt(n)),this._initializationPromise=this.queue(async()=>{if(!this._deleted&&(this.persistenceManager=await Yn.create(this,e),this._resolvePersistenceManagerAvailable?.(),!this._deleted)){if(this._popupRedirectResolver?._shouldInitProactively)try{await this._popupRedirectResolver._initialize(this)}catch{}await this.initializeCurrentUser(n),this.lastNotifiedUid=this.currentUser?.uid||null,!this._deleted&&(this._isInitialized=!0)}}),this._initializationPromise}async _onStorageEvent(){if(this._deleted)return;const e=await this.assertedPersistence.getCurrentUser();if(!(!this.currentUser&&!e)){if(this.currentUser&&e&&this.currentUser.uid===e.uid){this._currentUser._assign(e),await this.currentUser.getIdToken();return}await this._updateCurrentUser(e,!0)}}async initializeCurrentUserFromIdToken(e){try{const n=await Hi(this,{idToken:e}),s=await ze._fromGetAccountInfoResponse(this,n,e);await this.directlySetCurrentUser(s)}catch(n){console.warn("FirebaseServerApp could not login user with provided authIdToken: ",n),await this.directlySetCurrentUser(null)}}async initializeCurrentUser(e){if(Be(this.app)){const i=this.app.settings.authIdToken;return i?new Promise(o=>{setTimeout(()=>this.initializeCurrentUserFromIdToken(i).then(o,o))}):this.directlySetCurrentUser(null)}const n=await this.assertedPersistence.getCurrentUser();let s=n,r=!1;if(e&&this.config.authDomain){await this.getOrInitRedirectPersistenceManager();const i=this.redirectUser?._redirectEventId,o=s?._redirectEventId,a=await this.tryRedirectSignIn(e);(!i||i===o)&&a?.user&&(s=a.user,r=!0)}if(!s)return this.directlySetCurrentUser(null);if(!s._redirectEventId){if(r)try{await this.beforeStateQueue.runMiddleware(s)}catch(i){s=n,this._popupRedirectResolver._overrideRedirectResult(this,()=>Promise.reject(i))}return s?this.reloadAndSetCurrentUserOrClear(s):this.directlySetCurrentUser(null)}return C(this._popupRedirectResolver,this,"argument-error"),await this.getOrInitRedirectPersistenceManager(),this.redirectUser&&this.redirectUser._redirectEventId===s._redirectEventId?this.directlySetCurrentUser(s):this.reloadAndSetCurrentUserOrClear(s)}async tryRedirectSignIn(e){let n=null;try{n=await this._popupRedirectResolver._completeRedirectFn(this,e,!0)}catch{await this._setRedirectUser(null)}return n}async reloadAndSetCurrentUserOrClear(e){try{await Vi(e)}catch(n){if(n?.code!=="auth/network-request-failed")return this.directlySetCurrentUser(null)}return this.directlySetCurrentUser(e)}useDeviceLanguage(){this.languageCode=Wk()}async _delete(){this._deleted=!0}async updateCurrentUser(e){if(Be(this.app))return Promise.reject(En(this));const n=e?de(e):null;return n&&C(n.auth.config.apiKey===this.config.apiKey,this,"invalid-user-token"),this._updateCurrentUser(n&&n._clone(this))}async _updateCurrentUser(e,n=!1){if(!this._deleted)return e&&C(this.tenantId===e.tenantId,this,"tenant-id-mismatch"),n||await this.beforeStateQueue.runMiddleware(e),this.queue(async()=>{await this.directlySetCurrentUser(e),this.notifyAuthListeners()})}async signOut(){return Be(this.app)?Promise.reject(En(this)):(await this.beforeStateQueue.runMiddleware(null),(this.redirectPersistenceManager||this._popupRedirectResolver)&&await this._setRedirectUser(null),this._updateCurrentUser(null,!0))}setPersistence(e){return Be(this.app)?Promise.reject(En(this)):this.queue(async()=>{await this.assertedPersistence.setPersistence(pt(e))})}_getRecaptchaConfig(){return this.tenantId==null?this._agentRecaptchaConfig:this._tenantRecaptchaConfigs[this.tenantId]}async validatePassword(e){this._getPasswordPolicyInternal()||await this._updatePasswordPolicy();const n=this._getPasswordPolicyInternal();return n.schemaVersion!==this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION?Promise.reject(this._errorFactory.create("unsupported-password-policy-schema-version",{})):n.validatePassword(e)}_getPasswordPolicyInternal(){return this.tenantId===null?this._projectPasswordPolicy:this._tenantPasswordPolicies[this.tenantId]}async _updatePasswordPolicy(){const e=await oR(this),n=new cR(e);this.tenantId===null?this._projectPasswordPolicy=n:this._tenantPasswordPolicies[this.tenantId]=n}_getPersistenceType(){return this.assertedPersistence.persistence.type}_getPersistence(){return this.assertedPersistence.persistence}_updateErrorMap(e){this._errorFactory=new Cs("auth","Firebase",e())}onAuthStateChanged(e,n,s){return this.registerStateListener(this.authStateSubscription,e,n,s)}beforeAuthStateChanged(e,n){return this.beforeStateQueue.pushCallback(e,n)}onIdTokenChanged(e,n,s){return this.registerStateListener(this.idTokenSubscription,e,n,s)}authStateReady(){return new Promise((e,n)=>{if(this.currentUser)e();else{const s=this.onAuthStateChanged(()=>{s(),e()},n)}})}async revokeAccessToken(e){if(this.currentUser){const n=await this.currentUser.getIdToken(),s={providerId:"apple.com",tokenType:"ACCESS_TOKEN",token:e,idToken:n};this.tenantId!=null&&(s.tenantId=this.tenantId),await nR(this,s)}}toJSON(){return{apiKey:this.config.apiKey,authDomain:this.config.authDomain,appName:this.name,currentUser:this._currentUser?.toJSON()}}async _setRedirectUser(e,n){const s=await this.getOrInitRedirectPersistenceManager(n);return e===null?s.removeCurrentUser():s.setCurrentUser(e)}async getOrInitRedirectPersistenceManager(e){if(!this.redirectPersistenceManager){const n=e&&pt(e)||this._popupRedirectResolver;C(n,this,"argument-error"),this.redirectPersistenceManager=await Yn.create(this,[pt(n._redirectPersistence)],"redirectUser"),this.redirectUser=await this.redirectPersistenceManager.getCurrentUser()}return this.redirectPersistenceManager}async _redirectUserForId(e){return this._isInitialized&&await this.queue(async()=>{}),this._currentUser?._redirectEventId===e?this._currentUser:this.redirectUser?._redirectEventId===e?this.redirectUser:null}async _persistUserIfCurrent(e){if(e===this.currentUser)return this.queue(async()=>this.directlySetCurrentUser(e))}_notifyListenersIfCurrent(e){e===this.currentUser&&this.notifyAuthListeners()}_key(){return`${this.config.authDomain}:${this.config.apiKey}:${this.name}`}_startProactiveRefresh(){this.isProactiveRefreshEnabled=!0,this.currentUser&&this._currentUser._startProactiveRefresh()}_stopProactiveRefresh(){this.isProactiveRefreshEnabled=!1,this.currentUser&&this._currentUser._stopProactiveRefresh()}get _currentUser(){return this.currentUser}notifyAuthListeners(){if(!this._isInitialized)return;this.idTokenSubscription.next(this.currentUser);const e=this.currentUser?.uid??null;this.lastNotifiedUid!==e&&(this.lastNotifiedUid=e,this.authStateSubscription.next(this.currentUser))}registerStateListener(e,n,s,r){if(this._deleted)return()=>{};const i=typeof n=="function"?n:n.next.bind(n);let o=!1;const a=this._isInitialized?Promise.resolve():this._initializationPromise;if(C(a,this,"internal-error"),a.then(()=>{o||i(this.currentUser)}),typeof n=="function"){const c=e.addObserver(n,s,r);return()=>{o=!0,c()}}else{const c=e.addObserver(n);return()=>{o=!0,c()}}}async directlySetCurrentUser(e){this.currentUser&&this.currentUser!==e&&this._currentUser._stopProactiveRefresh(),e&&this.isProactiveRefreshEnabled&&e._startProactiveRefresh(),this.currentUser=e,e?await this.assertedPersistence.setCurrentUser(e):await this.assertedPersistence.removeCurrentUser()}queue(e){return this.operations=this.operations.then(e,e),this.operations}get assertedPersistence(){return C(this.persistenceManager,this,"internal-error"),this.persistenceManager}_logFramework(e){!e||this.frameworks.includes(e)||(this.frameworks.push(e),this.frameworks.sort(),this.clientVersion=Gg(this.config.clientPlatform,this._getFrameworks()))}_getFrameworks(){return this.frameworks}async _getAdditionalHeaders(){const e={"X-Client-Version":this.clientVersion};this.app.options.appId&&(e["X-Firebase-gmpid"]=this.app.options.appId);const n=await this.heartbeatServiceProvider.getImmediate({optional:!0})?.getHeartbeatsHeader();n&&(e["X-Firebase-Client"]=n);const s=await this._getAppCheckToken();return s&&(e["X-Firebase-AppCheck"]=s),e}async _getAppCheckToken(){if(Be(this.app)&&this.app.settings.appCheckToken)return this.app.settings.appCheckToken;const e=await this.appCheckServiceProvider.getImmediate({optional:!0})?.getToken();return e?.error&&$k(`Error while retrieving App Check token: ${e.error}`),e?.token}}function Ps(t){return de(t)}class ih{constructor(e){this.auth=e,this.observer=null,this.addObserver=bb(n=>this.observer=n)}get next(){return C(this.observer,this.auth,"internal-error"),this.observer.next.bind(this.observer)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Nl={async loadJS(){throw new Error("Unable to load external scripts")},recaptchaV2Script:"",recaptchaEnterpriseScript:"",gapiScript:""};function uR(t){Nl=t}function dR(t){return Nl.loadJS(t)}function hR(){return Nl.gapiScript}function fR(t){return`__${t}${Math.floor(Math.random()*1e6)}`}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function pR(t,e){const n=Ar(t,"auth");if(n.isInitialized()){const r=n.getImmediate(),i=n.getOptions();if(Sn(i,e??{}))return r;ct(r,"already-initialized")}return n.initialize({options:e})}function gR(t,e){const n=e?.persistence||[],s=(Array.isArray(n)?n:[n]).map(pt);e?.errorMap&&t._updateErrorMap(e.errorMap),t._initializeWithPersistence(s,e?.popupRedirectResolver)}function mR(t,e,n){const s=Ps(t);C(/^https?:\/\//.test(e),s,"invalid-emulator-scheme");const r=!1,i=Yg(e),{host:o,port:a}=_R(e),c=a===null?"":`:${a}`,l={url:`${i}//${o}${c}/`},u=Object.freeze({host:o,port:a,protocol:i.replace(":",""),options:Object.freeze({disableWarnings:r})});if(!s._canInitEmulator){C(s.config.emulator&&s.emulatorConfig,s,"emulator-config-failed"),C(Sn(l,s.config.emulator)&&Sn(u,s.emulatorConfig),s,"emulator-config-failed");return}s.config.emulator=l,s.emulatorConfig=u,s.settings.appVerificationDisabledForTesting=!0,bs(o)?(Bf(`${i}//${o}${c}`),Hf("Auth",!0)):yR()}function Yg(t){const e=t.indexOf(":");return e<0?"":t.substr(0,e+1)}function _R(t){const e=Yg(t),n=/(\/\/)?([^?#/]+)/.exec(t.substr(e.length));if(!n)return{host:"",port:null};const s=n[2].split("@").pop()||"",r=/^(\[[^\]]+\])(:|$)/.exec(s);if(r){const i=r[1];return{host:i,port:oh(s.substr(i.length+1))}}else{const[i,o]=s.split(":");return{host:i,port:oh(o)}}}function oh(t){if(!t)return null;const e=Number(t);return isNaN(e)?null:e}function yR(){function t(){const e=document.createElement("p"),n=e.style;e.innerText="Running in emulator mode. Do not use with production credentials.",n.position="fixed",n.width="100%",n.backgroundColor="#ffffff",n.border=".1em solid #000000",n.color="#b50000",n.bottom="0px",n.left="0px",n.margin="0px",n.zIndex="10000",n.textAlign="center",e.classList.add("firebase-emulator-warning"),document.body.appendChild(e)}typeof console<"u"&&typeof console.info=="function"&&console.info("WARNING: You are using the Auth Emulator, which is intended for local testing only.  Do not use with production credentials."),typeof window<"u"&&typeof document<"u"&&(document.readyState==="loading"?window.addEventListener("DOMContentLoaded",t):t())}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Kg{constructor(e,n){this.providerId=e,this.signInMethod=n}toJSON(){return ft("not implemented")}_getIdTokenResponse(e){return ft("not implemented")}_linkToIdToken(e,n){return ft("not implemented")}_getReauthenticationResolver(e){return ft("not implemented")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Kn(t,e){return Gk(t,"POST","/v1/accounts:signInWithIdp",kl(t,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ER="http://localhost";class Nn extends Kg{constructor(){super(...arguments),this.pendingToken=null}static _fromParams(e){const n=new Nn(e.providerId,e.signInMethod);return e.idToken||e.accessToken?(e.idToken&&(n.idToken=e.idToken),e.accessToken&&(n.accessToken=e.accessToken),e.nonce&&!e.pendingToken&&(n.nonce=e.nonce),e.pendingToken&&(n.pendingToken=e.pendingToken)):e.oauthToken&&e.oauthTokenSecret?(n.accessToken=e.oauthToken,n.secret=e.oauthTokenSecret):ct("argument-error"),n}toJSON(){return{idToken:this.idToken,accessToken:this.accessToken,secret:this.secret,nonce:this.nonce,pendingToken:this.pendingToken,providerId:this.providerId,signInMethod:this.signInMethod}}static fromJSON(e){const n=typeof e=="string"?JSON.parse(e):e,{providerId:s,signInMethod:r,...i}=n;if(!s||!r)return null;const o=new Nn(s,r);return o.idToken=i.idToken||void 0,o.accessToken=i.accessToken||void 0,o.secret=i.secret,o.nonce=i.nonce,o.pendingToken=i.pendingToken||null,o}_getIdTokenResponse(e){const n=this.buildRequest();return Kn(e,n)}_linkToIdToken(e,n){const s=this.buildRequest();return s.idToken=n,Kn(e,s)}_getReauthenticationResolver(e){const n=this.buildRequest();return n.autoCreate=!1,Kn(e,n)}buildRequest(){const e={requestUri:ER,returnSecureToken:!0};if(this.pendingToken)e.pendingToken=this.pendingToken;else{const n={};this.idToken&&(n.id_token=this.idToken),this.accessToken&&(n.access_token=this.accessToken),this.secret&&(n.oauth_token_secret=this.secret),n.providerId=this.providerId,this.nonce&&!this.pendingToken&&(n.nonce=this.nonce),e.postBody=Ss(n)}return e}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Pl{constructor(e){this.providerId=e,this.defaultLanguageCode=null,this.customParameters={}}setDefaultLanguage(e){this.defaultLanguageCode=e}setCustomParameters(e){return this.customParameters=e,this}getCustomParameters(){return this.customParameters}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class $r extends Pl{constructor(){super(...arguments),this.scopes=[]}addScope(e){return this.scopes.includes(e)||this.scopes.push(e),this}getScopes(){return[...this.scopes]}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Pt extends $r{constructor(){super("facebook.com")}static credential(e){return Nn._fromParams({providerId:Pt.PROVIDER_ID,signInMethod:Pt.FACEBOOK_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return Pt.credentialFromTaggedObject(e)}static credentialFromError(e){return Pt.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return Pt.credential(e.oauthAccessToken)}catch{return null}}}Pt.FACEBOOK_SIGN_IN_METHOD="facebook.com";Pt.PROVIDER_ID="facebook.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ve extends $r{constructor(){super("google.com"),this.addScope("profile")}static credential(e,n){return Nn._fromParams({providerId:Ve.PROVIDER_ID,signInMethod:Ve.GOOGLE_SIGN_IN_METHOD,idToken:e,accessToken:n})}static credentialFromResult(e){return Ve.credentialFromTaggedObject(e)}static credentialFromError(e){return Ve.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthIdToken:n,oauthAccessToken:s}=e;if(!n&&!s)return null;try{return Ve.credential(n,s)}catch{return null}}}Ve.GOOGLE_SIGN_IN_METHOD="google.com";Ve.PROVIDER_ID="google.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Lt extends $r{constructor(){super("github.com")}static credential(e){return Nn._fromParams({providerId:Lt.PROVIDER_ID,signInMethod:Lt.GITHUB_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return Lt.credentialFromTaggedObject(e)}static credentialFromError(e){return Lt.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return Lt.credential(e.oauthAccessToken)}catch{return null}}}Lt.GITHUB_SIGN_IN_METHOD="github.com";Lt.PROVIDER_ID="github.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ot extends $r{constructor(){super("twitter.com")}static credential(e,n){return Nn._fromParams({providerId:Ot.PROVIDER_ID,signInMethod:Ot.TWITTER_SIGN_IN_METHOD,oauthToken:e,oauthTokenSecret:n})}static credentialFromResult(e){return Ot.credentialFromTaggedObject(e)}static credentialFromError(e){return Ot.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthAccessToken:n,oauthTokenSecret:s}=e;if(!n||!s)return null;try{return Ot.credential(n,s)}catch{return null}}}Ot.TWITTER_SIGN_IN_METHOD="twitter.com";Ot.PROVIDER_ID="twitter.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ps{constructor(e){this.user=e.user,this.providerId=e.providerId,this._tokenResponse=e._tokenResponse,this.operationType=e.operationType}static async _fromIdTokenResponse(e,n,s,r=!1){const i=await ze._fromIdTokenResponse(e,s,r),o=ah(s);return new ps({user:i,providerId:o,_tokenResponse:s,operationType:n})}static async _forOperation(e,n,s){await e._updateTokensIfNecessary(s,!0);const r=ah(s);return new ps({user:e,providerId:r,_tokenResponse:s,operationType:n})}}function ah(t){return t.providerId?t.providerId:"phoneNumber"in t?"phone":null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Wi extends en{constructor(e,n,s,r){super(n.code,n.message),this.operationType=s,this.user=r,Object.setPrototypeOf(this,Wi.prototype),this.customData={appName:e.name,tenantId:e.tenantId??void 0,_serverResponse:n.customData._serverResponse,operationType:s}}static _fromErrorAndOperation(e,n,s,r){return new Wi(e,n,s,r)}}function Jg(t,e,n,s){return(e==="reauthenticate"?n._getReauthenticationResolver(t):n._getIdTokenResponse(t)).catch(i=>{throw i.code==="auth/multi-factor-auth-required"?Wi._fromErrorAndOperation(t,i,e,s):i})}async function vR(t,e,n=!1){const s=await Er(t,e._linkToIdToken(t.auth,await t.getIdToken()),n);return ps._forOperation(t,"link",s)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function wR(t,e,n=!1){const{auth:s}=t;if(Be(s.app))return Promise.reject(En(s));const r="reauthenticate";try{const i=await Er(t,Jg(s,r,e,t),n);C(i.idToken,s,"internal-error");const o=Rl(i.idToken);C(o,s,"internal-error");const{sub:a}=o;return C(t.uid===a,s,"user-mismatch"),ps._forOperation(t,r,i)}catch(i){throw i?.code==="auth/user-not-found"&&ct(s,"user-mismatch"),i}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Xg(t,e,n=!1){if(Be(t.app))return Promise.reject(En(t));const s="signIn",r=await Jg(t,s,e),i=await ps._fromIdTokenResponse(t,s,r);return n||await t._updateCurrentUser(i.user),i}async function bR(t,e){return Xg(Ps(t),e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function aa(t,e){return de(t).setPersistence(e)}function CR(t,e,n,s){return de(t).onIdTokenChanged(e,n,s)}function SR(t,e,n){return de(t).beforeAuthStateChanged(e,n)}function Qg(t,e,n,s){return de(t).onAuthStateChanged(e,n,s)}function TR(t){return de(t).signOut()}const ji="__sak";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Zg{constructor(e,n){this.storageRetriever=e,this.type=n}_isAvailable(){try{return this.storage?(this.storage.setItem(ji,"1"),this.storage.removeItem(ji),Promise.resolve(!0)):Promise.resolve(!1)}catch{return Promise.resolve(!1)}}_set(e,n){return this.storage.setItem(e,JSON.stringify(n)),Promise.resolve()}_get(e){const n=this.storage.getItem(e);return Promise.resolve(n?JSON.parse(n):null)}_remove(e){return this.storage.removeItem(e),Promise.resolve()}get storage(){return this.storageRetriever()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const IR=1e3,kR=10;class em extends Zg{constructor(){super(()=>window.localStorage,"LOCAL"),this.boundEventHandler=(e,n)=>this.onStorageEvent(e,n),this.listeners={},this.localCache={},this.pollTimer=null,this.fallbackToPolling=qg(),this._shouldAllowMigration=!0}forAllChangedKeys(e){for(const n of Object.keys(this.listeners)){const s=this.storage.getItem(n),r=this.localCache[n];s!==r&&e(n,r,s)}}onStorageEvent(e,n=!1){if(!e.key){this.forAllChangedKeys((o,a,c)=>{this.notifyListeners(o,c)});return}const s=e.key;n?this.detachListener():this.stopPolling();const r=()=>{const o=this.storage.getItem(s);!n&&this.localCache[s]===o||this.notifyListeners(s,o)},i=this.storage.getItem(s);rR()&&i!==e.newValue&&e.newValue!==e.oldValue?setTimeout(r,kR):r()}notifyListeners(e,n){this.localCache[e]=n;const s=this.listeners[e];if(s)for(const r of Array.from(s))r(n&&JSON.parse(n))}startPolling(){this.stopPolling(),this.pollTimer=setInterval(()=>{this.forAllChangedKeys((e,n,s)=>{this.onStorageEvent(new StorageEvent("storage",{key:e,oldValue:n,newValue:s}),!0)})},IR)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}attachListener(){window.addEventListener("storage",this.boundEventHandler)}detachListener(){window.removeEventListener("storage",this.boundEventHandler)}_addListener(e,n){Object.keys(this.listeners).length===0&&(this.fallbackToPolling?this.startPolling():this.attachListener()),this.listeners[e]||(this.listeners[e]=new Set,this.localCache[e]=this.storage.getItem(e)),this.listeners[e].add(n)}_removeListener(e,n){this.listeners[e]&&(this.listeners[e].delete(n),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&(this.detachListener(),this.stopPolling())}async _set(e,n){await super._set(e,n),this.localCache[e]=JSON.stringify(n)}async _get(e){const n=await super._get(e);return this.localCache[e]=JSON.stringify(n),n}async _remove(e){await super._remove(e),delete this.localCache[e]}}em.type="LOCAL";const tm=em;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class nm extends Zg{constructor(){super(()=>window.sessionStorage,"SESSION")}_addListener(e,n){}_removeListener(e,n){}}nm.type="SESSION";const sm=nm;/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function RR(t){return Promise.all(t.map(async e=>{try{return{fulfilled:!0,value:await e}}catch(n){return{fulfilled:!1,reason:n}}}))}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ao{constructor(e){this.eventTarget=e,this.handlersMap={},this.boundEventHandler=this.handleEvent.bind(this)}static _getInstance(e){const n=this.receivers.find(r=>r.isListeningto(e));if(n)return n;const s=new Ao(e);return this.receivers.push(s),s}isListeningto(e){return this.eventTarget===e}async handleEvent(e){const n=e,{eventId:s,eventType:r,data:i}=n.data,o=this.handlersMap[r];if(!o?.size)return;n.ports[0].postMessage({status:"ack",eventId:s,eventType:r});const a=Array.from(o).map(async l=>l(n.origin,i)),c=await RR(a);n.ports[0].postMessage({status:"done",eventId:s,eventType:r,response:c})}_subscribe(e,n){Object.keys(this.handlersMap).length===0&&this.eventTarget.addEventListener("message",this.boundEventHandler),this.handlersMap[e]||(this.handlersMap[e]=new Set),this.handlersMap[e].add(n)}_unsubscribe(e,n){this.handlersMap[e]&&n&&this.handlersMap[e].delete(n),(!n||this.handlersMap[e].size===0)&&delete this.handlersMap[e],Object.keys(this.handlersMap).length===0&&this.eventTarget.removeEventListener("message",this.boundEventHandler)}}Ao.receivers=[];/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ll(t="",e=10){let n="";for(let s=0;s<e;s++)n+=Math.floor(Math.random()*10);return t+n}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class AR{constructor(e){this.target=e,this.handlers=new Set}removeMessageHandler(e){e.messageChannel&&(e.messageChannel.port1.removeEventListener("message",e.onMessage),e.messageChannel.port1.close()),this.handlers.delete(e)}async _send(e,n,s=50){const r=typeof MessageChannel<"u"?new MessageChannel:null;if(!r)throw new Error("connection_unavailable");let i,o;return new Promise((a,c)=>{const l=Ll("",20);r.port1.start();const u=setTimeout(()=>{c(new Error("unsupported_event"))},s);o={messageChannel:r,onMessage(d){const h=d;if(h.data.eventId===l)switch(h.data.status){case"ack":clearTimeout(u),i=setTimeout(()=>{c(new Error("timeout"))},3e3);break;case"done":clearTimeout(i),a(h.data.response);break;default:clearTimeout(u),clearTimeout(i),c(new Error("invalid_response"));break}}},this.handlers.add(o),r.port1.addEventListener("message",o.onMessage),this.target.postMessage({eventType:e,eventId:l,data:n},[r.port2])}).finally(()=>{o&&this.removeMessageHandler(o)})}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ot(){return window}function NR(t){ot().location.href=t}/**
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
 */function rm(){return typeof ot().WorkerGlobalScope<"u"&&typeof ot().importScripts=="function"}async function PR(){if(!navigator?.serviceWorker)return null;try{return(await navigator.serviceWorker.ready).active}catch{return null}}function LR(){return navigator?.serviceWorker?.controller||null}function OR(){return rm()?self:null}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const im="firebaseLocalStorageDb",DR=1,zi="firebaseLocalStorage",om="fbase_key";class Br{constructor(e){this.request=e}toPromise(){return new Promise((e,n)=>{this.request.addEventListener("success",()=>{e(this.request.result)}),this.request.addEventListener("error",()=>{n(this.request.error)})})}}function No(t,e){return t.transaction([zi],e?"readwrite":"readonly").objectStore(zi)}function MR(){const t=indexedDB.deleteDatabase(im);return new Br(t).toPromise()}function sc(){const t=indexedDB.open(im,DR);return new Promise((e,n)=>{t.addEventListener("error",()=>{n(t.error)}),t.addEventListener("upgradeneeded",()=>{const s=t.result;try{s.createObjectStore(zi,{keyPath:om})}catch(r){n(r)}}),t.addEventListener("success",async()=>{const s=t.result;s.objectStoreNames.contains(zi)?e(s):(s.close(),await MR(),e(await sc()))})})}async function ch(t,e,n){const s=No(t,!0).put({[om]:e,value:n});return new Br(s).toPromise()}async function xR(t,e){const n=No(t,!1).get(e),s=await new Br(n).toPromise();return s===void 0?null:s.value}function lh(t,e){const n=No(t,!0).delete(e);return new Br(n).toPromise()}const FR=800,UR=3;class am{constructor(){this.type="LOCAL",this._shouldAllowMigration=!0,this.listeners={},this.localCache={},this.pollTimer=null,this.pendingWrites=0,this.receiver=null,this.sender=null,this.serviceWorkerReceiverAvailable=!1,this.activeServiceWorker=null,this._workerInitializationPromise=this.initializeServiceWorkerMessaging().then(()=>{},()=>{})}async _openDb(){return this.db?this.db:(this.db=await sc(),this.db)}async _withRetries(e){let n=0;for(;;)try{const s=await this._openDb();return await e(s)}catch(s){if(n++>UR)throw s;this.db&&(this.db.close(),this.db=void 0)}}async initializeServiceWorkerMessaging(){return rm()?this.initializeReceiver():this.initializeSender()}async initializeReceiver(){this.receiver=Ao._getInstance(OR()),this.receiver._subscribe("keyChanged",async(e,n)=>({keyProcessed:(await this._poll()).includes(n.key)})),this.receiver._subscribe("ping",async(e,n)=>["keyChanged"])}async initializeSender(){if(this.activeServiceWorker=await PR(),!this.activeServiceWorker)return;this.sender=new AR(this.activeServiceWorker);const e=await this.sender._send("ping",{},800);e&&e[0]?.fulfilled&&e[0]?.value.includes("keyChanged")&&(this.serviceWorkerReceiverAvailable=!0)}async notifyServiceWorker(e){if(!(!this.sender||!this.activeServiceWorker||LR()!==this.activeServiceWorker))try{await this.sender._send("keyChanged",{key:e},this.serviceWorkerReceiverAvailable?800:50)}catch{}}async _isAvailable(){try{if(!indexedDB)return!1;const e=await sc();return await ch(e,ji,"1"),await lh(e,ji),!0}catch{}return!1}async _withPendingWrite(e){this.pendingWrites++;try{await e()}finally{this.pendingWrites--}}async _set(e,n){return this._withPendingWrite(async()=>(await this._withRetries(s=>ch(s,e,n)),this.localCache[e]=n,this.notifyServiceWorker(e)))}async _get(e){const n=await this._withRetries(s=>xR(s,e));return this.localCache[e]=n,n}async _remove(e){return this._withPendingWrite(async()=>(await this._withRetries(n=>lh(n,e)),delete this.localCache[e],this.notifyServiceWorker(e)))}async _poll(){const e=await this._withRetries(r=>{const i=No(r,!1).getAll();return new Br(i).toPromise()});if(!e)return[];if(this.pendingWrites!==0)return[];const n=[],s=new Set;if(e.length!==0)for(const{fbase_key:r,value:i}of e)s.add(r),JSON.stringify(this.localCache[r])!==JSON.stringify(i)&&(this.notifyListeners(r,i),n.push(r));for(const r of Object.keys(this.localCache))this.localCache[r]&&!s.has(r)&&(this.notifyListeners(r,null),n.push(r));return n}notifyListeners(e,n){this.localCache[e]=n;const s=this.listeners[e];if(s)for(const r of Array.from(s))r(n)}startPolling(){this.stopPolling(),this.pollTimer=setInterval(async()=>this._poll(),FR)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}_addListener(e,n){Object.keys(this.listeners).length===0&&this.startPolling(),this.listeners[e]||(this.listeners[e]=new Set,this._get(e)),this.listeners[e].add(n)}_removeListener(e,n){this.listeners[e]&&(this.listeners[e].delete(n),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&this.stopPolling()}}am.type="LOCAL";const cm=am;new Ur(3e4,6e4);/**
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
 */function lm(t,e){return e?pt(e):(C(t._popupRedirectResolver,t,"argument-error"),t._popupRedirectResolver)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ol extends Kg{constructor(e){super("custom","custom"),this.params=e}_getIdTokenResponse(e){return Kn(e,this._buildIdpRequest())}_linkToIdToken(e,n){return Kn(e,this._buildIdpRequest(n))}_getReauthenticationResolver(e){return Kn(e,this._buildIdpRequest())}_buildIdpRequest(e){const n={requestUri:this.params.requestUri,sessionId:this.params.sessionId,postBody:this.params.postBody,tenantId:this.params.tenantId,pendingToken:this.params.pendingToken,returnSecureToken:!0,returnIdpCredential:!0};return e&&(n.idToken=e),n}}function $R(t){return Xg(t.auth,new Ol(t),t.bypassAuthState)}function BR(t){const{auth:e,user:n}=t;return C(n,e,"internal-error"),wR(n,new Ol(t),t.bypassAuthState)}async function HR(t){const{auth:e,user:n}=t;return C(n,e,"internal-error"),vR(n,new Ol(t),t.bypassAuthState)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class um{constructor(e,n,s,r,i=!1){this.auth=e,this.resolver=s,this.user=r,this.bypassAuthState=i,this.pendingPromise=null,this.eventManager=null,this.filter=Array.isArray(n)?n:[n]}execute(){return new Promise(async(e,n)=>{this.pendingPromise={resolve:e,reject:n};try{this.eventManager=await this.resolver._initialize(this.auth),await this.onExecution(),this.eventManager.registerConsumer(this)}catch(s){this.reject(s)}})}async onAuthEvent(e){const{urlResponse:n,sessionId:s,postBody:r,tenantId:i,error:o,type:a}=e;if(o){this.reject(o);return}const c={auth:this.auth,requestUri:n,sessionId:s,tenantId:i||void 0,postBody:r||void 0,user:this.user,bypassAuthState:this.bypassAuthState};try{this.resolve(await this.getIdpTask(a)(c))}catch(l){this.reject(l)}}onError(e){this.reject(e)}getIdpTask(e){switch(e){case"signInViaPopup":case"signInViaRedirect":return $R;case"linkViaPopup":case"linkViaRedirect":return HR;case"reauthViaPopup":case"reauthViaRedirect":return BR;default:ct(this.auth,"internal-error")}}resolve(e){It(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.resolve(e),this.unregisterAndCleanUp()}reject(e){It(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.reject(e),this.unregisterAndCleanUp()}unregisterAndCleanUp(){this.eventManager&&this.eventManager.unregisterConsumer(this),this.pendingPromise=null,this.cleanUp()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const VR=new Ur(2e3,1e4);async function WR(t,e,n){if(Be(t.app))return Promise.reject(Ke(t,"operation-not-supported-in-this-environment"));const s=Ps(t);Bk(t,e,Pl);const r=lm(s,n);return new gn(s,"signInViaPopup",e,r).executeNotNull()}class gn extends um{constructor(e,n,s,r,i){super(e,n,r,i),this.provider=s,this.authWindow=null,this.pollId=null,gn.currentPopupAction&&gn.currentPopupAction.cancel(),gn.currentPopupAction=this}async executeNotNull(){const e=await this.execute();return C(e,this.auth,"internal-error"),e}async onExecution(){It(this.filter.length===1,"Popup operations only handle one event");const e=Ll();this.authWindow=await this.resolver._openPopup(this.auth,this.provider,this.filter[0],e),this.authWindow.associatedEvent=e,this.resolver._originValidation(this.auth).catch(n=>{this.reject(n)}),this.resolver._isIframeWebStorageSupported(this.auth,n=>{n||this.reject(Ke(this.auth,"web-storage-unsupported"))}),this.pollUserCancellation()}get eventId(){return this.authWindow?.associatedEvent||null}cancel(){this.reject(Ke(this.auth,"cancelled-popup-request"))}cleanUp(){this.authWindow&&this.authWindow.close(),this.pollId&&window.clearTimeout(this.pollId),this.authWindow=null,this.pollId=null,gn.currentPopupAction=null}pollUserCancellation(){const e=()=>{if(this.authWindow?.window?.closed){this.pollId=window.setTimeout(()=>{this.pollId=null,this.reject(Ke(this.auth,"popup-closed-by-user"))},8e3);return}this.pollId=window.setTimeout(e,VR.get())};e()}}gn.currentPopupAction=null;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const jR="pendingRedirect",hi=new Map;class zR extends um{constructor(e,n,s=!1){super(e,["signInViaRedirect","linkViaRedirect","reauthViaRedirect","unknown"],n,void 0,s),this.eventId=null}async execute(){let e=hi.get(this.auth._key());if(!e){try{const s=await qR(this.resolver,this.auth)?await super.execute():null;e=()=>Promise.resolve(s)}catch(n){e=()=>Promise.reject(n)}hi.set(this.auth._key(),e)}return this.bypassAuthState||hi.set(this.auth._key(),()=>Promise.resolve(null)),e()}async onAuthEvent(e){if(e.type==="signInViaRedirect")return super.onAuthEvent(e);if(e.type==="unknown"){this.resolve(null);return}if(e.eventId){const n=await this.auth._redirectUserForId(e.eventId);if(n)return this.user=n,super.onAuthEvent(e);this.resolve(null)}}async onExecution(){}cleanUp(){}}async function qR(t,e){const n=KR(e),s=YR(t);if(!await s._isAvailable())return!1;const r=await s._get(n)==="true";return await s._remove(n),r}function GR(t,e){hi.set(t._key(),e)}function YR(t){return pt(t._redirectPersistence)}function KR(t){return di(jR,t.config.apiKey,t.name)}async function JR(t,e){return await Ps(t)._initializationPromise,dm(t,e,!1)}async function dm(t,e,n=!1){if(Be(t.app))return Promise.reject(En(t));const s=Ps(t),r=lm(s,e),o=await new zR(s,r,n).execute();return o&&!n&&(delete o.user._redirectEventId,await s._persistUserIfCurrent(o.user),await s._setRedirectUser(null,e)),o}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const XR=600*1e3;class QR{constructor(e){this.auth=e,this.cachedEventUids=new Set,this.consumers=new Set,this.queuedRedirectEvent=null,this.hasHandledPotentialRedirect=!1,this.lastProcessedEventTime=Date.now()}registerConsumer(e){this.consumers.add(e),this.queuedRedirectEvent&&this.isEventForConsumer(this.queuedRedirectEvent,e)&&(this.sendToConsumer(this.queuedRedirectEvent,e),this.saveEventToCache(this.queuedRedirectEvent),this.queuedRedirectEvent=null)}unregisterConsumer(e){this.consumers.delete(e)}onEvent(e){if(this.hasEventBeenHandled(e))return!1;let n=!1;return this.consumers.forEach(s=>{this.isEventForConsumer(e,s)&&(n=!0,this.sendToConsumer(e,s),this.saveEventToCache(e))}),this.hasHandledPotentialRedirect||!ZR(e)||(this.hasHandledPotentialRedirect=!0,n||(this.queuedRedirectEvent=e,n=!0)),n}sendToConsumer(e,n){if(e.error&&!hm(e)){const s=e.error.code?.split("auth/")[1]||"internal-error";n.onError(Ke(this.auth,s))}else n.onAuthEvent(e)}isEventForConsumer(e,n){const s=n.eventId===null||!!e.eventId&&e.eventId===n.eventId;return n.filter.includes(e.type)&&s}hasEventBeenHandled(e){return Date.now()-this.lastProcessedEventTime>=XR&&this.cachedEventUids.clear(),this.cachedEventUids.has(uh(e))}saveEventToCache(e){this.cachedEventUids.add(uh(e)),this.lastProcessedEventTime=Date.now()}}function uh(t){return[t.type,t.eventId,t.sessionId,t.tenantId].filter(e=>e).join("-")}function hm({type:t,error:e}){return t==="unknown"&&e?.code==="auth/no-auth-event"}function ZR(t){switch(t.type){case"signInViaRedirect":case"linkViaRedirect":case"reauthViaRedirect":return!0;case"unknown":return hm(t);default:return!1}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function eA(t,e={}){return Ns(t,"GET","/v1/projects",e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const tA=/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/,nA=/^https?/;async function sA(t){if(t.config.emulator)return;const{authorizedDomains:e}=await eA(t);for(const n of e)try{if(rA(n))return}catch{}ct(t,"unauthorized-domain")}function rA(t){const e=ec(),{protocol:n,hostname:s}=new URL(e);if(t.startsWith("chrome-extension://")){const o=new URL(t);return o.hostname===""&&s===""?n==="chrome-extension:"&&t.replace("chrome-extension://","")===e.replace("chrome-extension://",""):n==="chrome-extension:"&&o.hostname===s}if(!nA.test(n))return!1;if(tA.test(t))return s===t;const r=t.replace(/\./g,"\\.");return new RegExp("^(.+\\."+r+"|"+r+")$","i").test(s)}/**
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
 */const iA=new Ur(3e4,6e4);function dh(){const t=ot().___jsl;if(t?.H){for(const e of Object.keys(t.H))if(t.H[e].r=t.H[e].r||[],t.H[e].L=t.H[e].L||[],t.H[e].r=[...t.H[e].L],t.CP)for(let n=0;n<t.CP.length;n++)t.CP[n]=null}}function oA(t){return new Promise((e,n)=>{function s(){dh(),gapi.load("gapi.iframes",{callback:()=>{e(gapi.iframes.getContext())},ontimeout:()=>{dh(),n(Ke(t,"network-request-failed"))},timeout:iA.get()})}if(ot().gapi?.iframes?.Iframe)e(gapi.iframes.getContext());else if(ot().gapi?.load)s();else{const r=fR("iframefcb");return ot()[r]=()=>{gapi.load?s():n(Ke(t,"network-request-failed"))},dR(`${hR()}?onload=${r}`).catch(i=>n(i))}}).catch(e=>{throw fi=null,e})}let fi=null;function aA(t){return fi=fi||oA(t),fi}/**
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
 */const cA=new Ur(5e3,15e3),lA="__/auth/iframe",uA="emulator/auth/iframe",dA={style:{position:"absolute",top:"-100px",width:"1px",height:"1px"},"aria-hidden":"true",tabindex:"-1"},hA=new Map([["identitytoolkit.googleapis.com","p"],["staging-identitytoolkit.sandbox.googleapis.com","s"],["test-identitytoolkit.sandbox.googleapis.com","t"]]);function fA(t){const e=t.config;C(e.authDomain,t,"auth-domain-config-required");const n=e.emulator?Il(e,uA):`https://${t.config.authDomain}/${lA}`,s={apiKey:e.apiKey,appName:t.name,v:Ts},r=hA.get(t.config.apiHost);r&&(s.eid=r);const i=t._getFrameworks();return i.length&&(s.fw=i.join(",")),`${n}?${Ss(s).slice(1)}`}async function pA(t){const e=await aA(t),n=ot().gapi;return C(n,t,"internal-error"),e.open({where:document.body,url:fA(t),messageHandlersFilter:n.iframes.CROSS_ORIGIN_IFRAMES_FILTER,attributes:dA,dontclear:!0},s=>new Promise(async(r,i)=>{await s.restyle({setHideOnLeave:!1});const o=Ke(t,"network-request-failed"),a=ot().setTimeout(()=>{i(o)},cA.get());function c(){ot().clearTimeout(a),r(s)}s.ping(c).then(c,()=>{i(o)})}))}/**
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
 */const gA={location:"yes",resizable:"yes",statusbar:"yes",toolbar:"no"},mA=500,_A=600,yA="_blank",EA="http://localhost";class hh{constructor(e){this.window=e,this.associatedEvent=null}close(){if(this.window)try{this.window.close()}catch{}}}function vA(t,e,n,s=mA,r=_A){const i=Math.max((window.screen.availHeight-r)/2,0).toString(),o=Math.max((window.screen.availWidth-s)/2,0).toString();let a="";const c={...gA,width:s.toString(),height:r.toString(),top:i,left:o},l=we().toLowerCase();n&&(a=Hg(l)?yA:n),$g(l)&&(e=e||EA,c.scrollbars="yes");const u=Object.entries(c).reduce((h,[f,p])=>`${h}${f}=${p},`,"");if(sR(l)&&a!=="_self")return wA(e||"",a),new hh(null);const d=window.open(e||"",a,u);C(d,t,"popup-blocked");try{d.focus()}catch{}return new hh(d)}function wA(t,e){const n=document.createElement("a");n.href=t,n.target=e;const s=document.createEvent("MouseEvent");s.initMouseEvent("click",!0,!0,window,1,0,0,0,0,!1,!1,!1,!1,1,null),n.dispatchEvent(s)}/**
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
 */const bA="__/auth/handler",CA="emulator/auth/handler",SA=encodeURIComponent("fac");async function fh(t,e,n,s,r,i){C(t.config.authDomain,t,"auth-domain-config-required"),C(t.config.apiKey,t,"invalid-api-key");const o={apiKey:t.config.apiKey,appName:t.name,authType:n,redirectUrl:s,v:Ts,eventId:r};if(e instanceof Pl){e.setDefaultLanguage(t.languageCode),o.providerId=e.providerId||"",wi(e.getCustomParameters())||(o.customParameters=JSON.stringify(e.getCustomParameters()));for(const[u,d]of Object.entries({}))o[u]=d}if(e instanceof $r){const u=e.getScopes().filter(d=>d!=="");u.length>0&&(o.scopes=u.join(","))}t.tenantId&&(o.tid=t.tenantId);const a=o;for(const u of Object.keys(a))a[u]===void 0&&delete a[u];const c=await t._getAppCheckToken(),l=c?`#${SA}=${encodeURIComponent(c)}`:"";return`${TA(t)}?${Ss(a).slice(1)}${l}`}function TA({config:t}){return t.emulator?Il(t,CA):`https://${t.authDomain}/${bA}`}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ca="webStorageSupport";class IA{constructor(){this.eventManagers={},this.iframes={},this.originValidationPromises={},this._redirectPersistence=sm,this._completeRedirectFn=dm,this._overrideRedirectResult=GR}async _openPopup(e,n,s,r){It(this.eventManagers[e._key()]?.manager,"_initialize() not called before _openPopup()");const i=await fh(e,n,s,ec(),r);return vA(e,i,Ll())}async _openRedirect(e,n,s,r){await this._originValidation(e);const i=await fh(e,n,s,ec(),r);return NR(i),new Promise(()=>{})}_initialize(e){const n=e._key();if(this.eventManagers[n]){const{manager:r,promise:i}=this.eventManagers[n];return r?Promise.resolve(r):(It(i,"If manager is not set, promise should be"),i)}const s=this.initAndGetManager(e);return this.eventManagers[n]={promise:s},s.catch(()=>{delete this.eventManagers[n]}),s}async initAndGetManager(e){const n=await pA(e),s=new QR(e);return n.register("authEvent",r=>(C(r?.authEvent,e,"invalid-auth-event"),{status:s.onEvent(r.authEvent)?"ACK":"ERROR"}),gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER),this.eventManagers[e._key()]={manager:s},this.iframes[e._key()]=n,s}_isIframeWebStorageSupported(e,n){this.iframes[e._key()].send(ca,{type:ca},r=>{const i=r?.[0]?.[ca];i!==void 0&&n(!!i),ct(e,"internal-error")},gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER)}_originValidation(e){const n=e._key();return this.originValidationPromises[n]||(this.originValidationPromises[n]=sA(e)),this.originValidationPromises[n]}get _shouldInitProactively(){return qg()||Bg()||Al()}}const kA=IA;var ph="@firebase/auth",gh="1.11.0";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class RA{constructor(e){this.auth=e,this.internalListeners=new Map}getUid(){return this.assertAuthConfigured(),this.auth.currentUser?.uid||null}async getToken(e){return this.assertAuthConfigured(),await this.auth._initializationPromise,this.auth.currentUser?{accessToken:await this.auth.currentUser.getIdToken(e)}:null}addAuthTokenListener(e){if(this.assertAuthConfigured(),this.internalListeners.has(e))return;const n=this.auth.onIdTokenChanged(s=>{e(s?.stsTokenManager.accessToken||null)});this.internalListeners.set(e,n),this.updateProactiveRefresh()}removeAuthTokenListener(e){this.assertAuthConfigured();const n=this.internalListeners.get(e);n&&(this.internalListeners.delete(e),n(),this.updateProactiveRefresh())}assertAuthConfigured(){C(this.auth._initializationPromise,"dependent-sdk-initialized-before-auth")}updateProactiveRefresh(){this.internalListeners.size>0?this.auth._startProactiveRefresh():this.auth._stopProactiveRefresh()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function AA(t){switch(t){case"Node":return"node";case"ReactNative":return"rn";case"Worker":return"webworker";case"Cordova":return"cordova";case"WebExtension":return"web-extension";default:return}}function NA(t){Gt(new Ct("auth",(e,{options:n})=>{const s=e.getProvider("app").getImmediate(),r=e.getProvider("heartbeat"),i=e.getProvider("app-check-internal"),{apiKey:o,authDomain:a}=s.options;C(o&&!o.includes(":"),"invalid-api-key",{appName:s.name});const c={apiKey:o,authDomain:a,clientPlatform:t,apiHost:"identitytoolkit.googleapis.com",tokenApiHost:"securetoken.googleapis.com",apiScheme:"https",sdkClientVersion:Gg(t)},l=new lR(s,r,i,c);return gR(l,n),l},"PUBLIC").setInstantiationMode("EXPLICIT").setInstanceCreatedCallback((e,n,s)=>{e.getProvider("auth-internal").initialize()})),Gt(new Ct("auth-internal",e=>{const n=Ps(e.getProvider("auth").getImmediate());return(s=>new RA(s))(n)},"PRIVATE").setInstantiationMode("EXPLICIT")),vt(ph,gh,AA(t)),vt(ph,gh,"esm2020")}/**
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
 */const PA=300,LA=$f("authIdTokenMaxAge")||PA;let mh=null;const OA=t=>async e=>{const n=e&&await e.getIdTokenResult(),s=n&&(new Date().getTime()-Date.parse(n.issuedAtTime))/1e3;if(s&&s>LA)return;const r=n?.token;mh!==r&&(mh=r,await fetch(t,{method:r?"POST":"DELETE",headers:r?{Authorization:`Bearer ${r}`}:{}}))};function DA(t=Fc()){const e=Ar(t,"auth");if(e.isInitialized())return e.getImmediate();const n=pR(t,{popupRedirectResolver:kA,persistence:[cm,tm,sm]}),s=$f("authTokenSyncURL");if(s&&typeof isSecureContext=="boolean"&&isSecureContext){const i=new URL(s,location.origin);if(location.origin===i.origin){const o=OA(i.toString());SR(n,o,()=>o(n.currentUser)),CR(n,a=>o(a))}}const r=Ff("auth");return r&&mR(n,`http://${r}`),n}function MA(){return document.getElementsByTagName("head")?.[0]??document}uR({loadJS(t){return new Promise((e,n)=>{const s=document.createElement("script");s.setAttribute("src",t),s.onload=e,s.onerror=r=>{const i=Ke("internal-error");i.customData=r,n(i)},s.type="text/javascript",s.charset="UTF-8",MA().appendChild(s)})},gapiScript:"https://apis.google.com/js/api.js",recaptchaV2Script:"https://www.google.com/recaptcha/api.js",recaptchaEnterpriseScript:"https://www.google.com/recaptcha/enterprise.js?render="});NA("Browser");const oL=()=>!1,xA=t=>{try{t&&localStorage.setItem("debug:console","1")}catch{}},D=(...t)=>{},FA=(...t)=>{localStorage.getItem("debug:console")},UA="765724787439-21p8n3e2tsfq2qk4oriq7ipp7m4o50ad.apps.googleusercontent.com",er=new Set;function $A(){const t=console.error;console.error=(...e)=>{const n=e.join(" ");n.includes("FedCM")&&n.includes("AbortError")&&n.includes("signal is aborted without reason")||e.length===1&&typeof e[0]=="string"&&e[0].trim()==="The request has been aborted."||t.apply(console,e)}}function BA(t){return D("[ONE TAP] Callback registered, total callbacks:",er.size+1),er.add(t),()=>er.delete(t)}function Bn(t){D("[ONE TAP] Notifying status:",t,"to",er.size,"callbacks"),er.forEach(e=>{try{e(t)}catch{}})}function fm(){if(typeof google>"u"||!google.accounts?.id){setTimeout(()=>fm(),100);return}$A(),google.accounts.id.initialize({client_id:UA,callback:HA,auto_select:!1,cancel_on_tap_outside:!0,context:"signin",use_fedcm_for_prompt:!0,itp_support:!0})}function pm(){if(Dl()){Bn("not_needed");return}window.google?.accounts?.id&&(Bn("prompting"),window.google.accounts.id.prompt(t=>{const e=t.getMomentType();e==="skipped"?Bn("skipped"):e==="dismissed"?Bn("dismissed"):e==="display"&&Bn("displayed")}))}async function HA(t){try{D("[ONE TAP] Received credential, signing in with Firebase..."),Bn("signing_in");const e=Ve.credential(t.credential),n=await bR(Pe,e);D("[ONE TAP] ✅ Successfully signed in:",n.user.email),ym(!1)}catch(e){const n=e?.code||"unknown",s=e?.message||String(e);alert(n==="auth/account-exists-with-different-credential"?"An account already exists with the same email but different sign-in credentials.":`One Tap sign-in failed: ${s}`)}}let rc=!1;async function VA(){const t=F();if(!t||rc)return;const e=S(T,`users/${t}/presence`);try{await ue(e,{state:"online",lastChanged:yn()}),await dg(e).set({state:"offline",lastSeen:yn(),lastChanged:yn()}),rc=!0,console.log("Presence initialized for user:",t)}catch(n){console.error("Failed to initialize presence:",n)}}async function WA(){const t=F();if(!t)return;const e=S(T,`users/${t}/presence`);try{await ue(e,{state:"offline",lastSeen:yn(),lastChanged:yn()}),rc=!1}catch(n){console.error("Failed to set offline:",n)}}function gm(t){if(!t||typeof t!="string")throw new Error("Invalid email: must be a non-empty string");const e=t.toLowerCase().trim();return btoa(e).replace(/\./g,"_").replace(/\$/g,"-").replace(/#/g,"-").replace(/\[/g,"-").replace(/\]/g,"-").replace(/\//g,"-")}async function jA(t){if(!t||!t.uid||!t.email)throw new Error("Invalid user: must have uid and email");const e=gm(t.email),n=S(T,`usersByEmail/${e}`),s={uid:t.uid,displayName:t.displayName||"Anonymous",photoURL:t.photoURL||null,registeredAt:Date.now()};try{await ue(n,s),console.log("[USER DISCOVERY] Registered user in directory:",t.email)}catch(r){throw console.error("[USER DISCOVERY] Failed to register user:",r),r}}async function zA(t){if(!t||typeof t!="string")return null;try{const e=gm(t),n=S(T,`usersByEmail/${e}`),s=await Ye(n);return s.exists()?s.val():null}catch(e){return console.error("[USER DISCOVERY] Failed to find user by email:",e),null}}const Pe=DA(wl),qA=typeof import.meta<"u"&&!0;function mm(t,e,n={}){const s=typeof window<"u"?window.location.origin:"n/a";qA?console.error(`[AUTH] ${t}:`,{code:e?.code||"unknown",message:e?.message||String(e),origin:s,...n}):console.error(`[AUTH] ${t}:`,e,n,{origin:s})}const _m=(async()=>{try{await aa(Pe,cm)}catch{try{await aa(Pe,tm)}catch{await aa(Pe,nc)}}try{(await JR(Pe))?.user&&D("[AUTH] ✅ Sign-in completed (via Safari fallback)")}catch(t){D("[AUTH] No redirect result:",t.code)}setTimeout(()=>{fm(),pm()},500)})();let Hn=!1;function ym(t){Hn=t}function GA(){try{const t=document.createElement("a");t.href=window.location.href,t.target="_blank",t.rel="noopener noreferrer external",document.body.appendChild(t),t.click(),document.body.removeChild(t)}catch{}}let Hs=null;const YA=()=>Math.random().toString(36).substring(2,15),ic="guestUser",KA=2880*60*1e3;function JA(){try{const t=typeof localStorage<"u"?localStorage.getItem(ic):null;if(!t)return null;const e=JSON.parse(t);if(!e||typeof e!="object"||!e.id)return null;if(e.expiresAt&&Date.now()>e.expiresAt){try{localStorage.removeItem(ic)}catch{}return null}return e}catch{return null}}function XA(t,e=KA){const n=Date.now(),s={id:t,createdAt:n,expiresAt:n+e};try{typeof localStorage<"u"&&localStorage.setItem(ic,JSON.stringify(s))}catch{}return s}function he(){const t=F();if(t)return t;if(!Hs){const e=JA();e&&e.id?Hs=e.id:(Hs=YA(),XA(Hs))}return Hs}function Hr(){return Pe.currentUser}function Dl(){return Pe.currentUser!==null}function F(){return Pe.currentUser?.uid??null}function QA(){return new Promise(t=>{const e=Qg(Pe,n=>{e(),t(n)})})}function Ml(t,{truncate:e=7}={}){return Qg(Pe,n=>{const s=!!n,r=n?.displayName||"Guest User",i=typeof r=="string"&&r.length>e?r.slice(0,e)+"...":r;s&&(VA().catch(o=>{console.warn("Failed to initialize presence:",o)}),jA(n).catch(o=>{console.warn("Failed to register user in directory:",o)}));try{t({user:n,isLoggedIn:s,userName:i})}catch{}})}async function Em(){const t=new Ve;t.setCustomParameters({prompt:"select_account"});const e=typeof window<"u"&&window.matchMedia?.("(display-mode: standalone)").matches,n=typeof navigator<"u"&&navigator.standalone===!0,s=e||n,r=/iphone|ipad|ipod/i.test(navigator.userAgent||""),i=s&&r;console.log("[AUTH] PWA detection:",{displayModeStandalone:e,navigatorStandalone:n,isStandalonePWA:s,isIOS:r,isIOSStandalone:i,safariExternalOpenArmed:Hn});try{if(i&&Hn){console.log("[AUTH] Using Safari external fallback"),Hn=!1,GA();return}console.log("[AUTH] Starting popup sign-in flow...");const o=await WR(Pe,t),c=Ve.credentialFromResult(o).accessToken,l=o.user;D("Signed in user: ",l.displayName),D("Google Access Token exists:",!!c),Hn=!1}catch(o){const a=o?.code||"unknown",c=o?.message||String(o);if(a==="auth/popup-closed-by-user"||a==="auth/cancelled-popup-request"){console.log("Sign-in cancelled by user");return}if((a==="auth/network-request-failed"||a==="auth/popup-blocked")&&i){console.warn(`[AUTH] ${a} inside iOS standalone PWA. Arming Safari fallback.`),Hn=!0,alert(`Sign-in is blocked in the installed app on iOS.

Tap the Login button again to open in Safari and complete sign-in.`);return}if(a==="auth/popup-blocked"){alert("Pop-up blocked. Please enable pop-ups for this site in your browser settings, or try signing in from a desktop browser.");return}const l=o?.customData?.email;if(mm("Google sign-in",o,{email:l?"<redacted>":void 0}),a==="auth/unauthorized-domain"){const u=typeof window<"u"?window.location.origin:"",d=["This app's host is not whitelisted in Firebase Authentication.","Fix: In Firebase Console, go to Build → Authentication → Settings → Authorized domains and add this origin:",u?`• ${u}`:"• <your dev origin>","","Common dev hosts to add:","• http://localhost (covers any port)","• http://127.0.0.1","• http://[::1] (IPv6 localhost)","• Your LAN IP, e.g. http://192.168.x.y","","Tip: avoid opening index.html directly from the filesystem (file://). Use a dev server instead."];u&&typeof navigator<"u"&&navigator.clipboard?.writeText&&navigator.clipboard.writeText(u).catch(()=>{}),alert(`Sign-in failed: Unauthorized domain.

${d.join(`
`)}`);return}alert(`Sign-in failed: ${c}`)}}async function vm(){try{await WA(),await TR(Pe),console.info("User signed out"),setTimeout(()=>pm(),1500)}catch(t){throw mm("Sign out",t),t}}const ZA=Object.freeze(Object.defineProperty({__proto__:null,auth:Pe,authReady:_m,getCurrentUser:Hr,getCurrentUserAsync:QA,getLoggedInUserId:F,getUserId:he,isLoggedIn:Dl,onAuthChange:Ml,setSafariExternalOpenArmed:ym,signInWithGoogle:Em,signOutUser:vm},Symbol.toStringTag,{value:"Module"})),eN=t=>String(t).replace(/[&<>"'`=\/]/g,n=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;","`":"&#x60;","=":"&#x3D;","/":"&#x2F;"})[n]),tN=(t,e)=>t.replace(/\$\{([^}]+)\}/g,(n,s)=>{const r=s.trim(),i=r.split(".").reduce((a,c)=>a?.[c],e);return i==null?"":r.endsWith("Html")?String(i):eN(String(i))}),nN=(t,e={})=>{const n=document.createElement("template");return n.innerHTML=tN(t,e),n.content.cloneNode(!0)},sN=(t,e)=>{const n=[];let s=e;for(;s&&s!==t;){const r=s.parentElement;if(!r)break;const i=Array.prototype.indexOf.call(r.children,s);n.push(i),s=r}return n.reverse()},rN=(t,e)=>e.reduce((n,s)=>n&&n.children?n.children[s]:null,t),iN=t=>Array.from(t.querySelectorAll("input, textarea, select")).map(e=>({name:e.name,id:e.id,path:sN(t,e),value:e.value,checked:e.checked,selectionStart:e.selectionStart,selectionEnd:e.selectionEnd,wasFocused:document.activeElement===e})),oN=t=>typeof CSS<"u"&&typeof CSS.escape=="function"?CSS.escape(String(t)):String(t).replace(/[^_a-zA-Z0-9-]/g,e=>"\\"+e),aN=(t,e)=>{e.forEach(n=>{let s=null;if(n.name){const r=t.querySelectorAll("input[name], textarea[name], select[name]");for(const i of r)if(i.getAttribute("name")===n.name){s=i;break}}else if(n.id)try{s=t.querySelector("#"+oN(n.id))}catch{s=t.querySelector(`#${n.id}`)}else n.path&&(s=rN(t,n.path));if(s){if(s.value=n.value,n.checked!==void 0&&(s.checked=n.checked),n.selectionStart!=null&&s.setSelectionRange)try{s.setSelectionRange(n.selectionStart,n.selectionEnd)}catch{}if(n.wasFocused)try{s.focus()}catch{}}})},cN=t=>Array.from(t.querySelectorAll("video, audio")).map(e=>({src:e.currentSrc||e.src,currentTime:e.currentTime,paused:e.paused,volume:e.volume,playbackRate:e.playbackRate,muted:e.muted})),lN=(t,e)=>{const n=t.querySelectorAll("video, audio");for(const s of n)if(s.currentSrc===e||s.src===e)return s;return null},uN=(t,e)=>{e.forEach(n=>{if(!n.src)return;const s=lN(t,n.src);s&&(s.currentTime=n.currentTime,s.volume=n.volume,s.playbackRate=n.playbackRate,s.muted=n.muted,n.paused||s.play().catch(()=>{}))})},dN=()=>document.readyState!=="loading",xl=({initialProps:t={},template:e="",handlers:n={},parent:s=null,containerTag:r="div",className:i="",onMount:o=null,onCleanup:a=null,autoAppend:c=!0,preserveInputState:l=!0}={})=>{if(!dN())return console.error("createComponent: DOM must be ready before creating components."),null;const u=document.createElement(r);i&&(u.className=i);let d={...t};const h=new Set,f=/\$\{([^}]+)\}/g;let p;for(;(p=f.exec(e))!==null;){const v=p[1].trim().split(".")[0];h.add(v)}const _=[],m=[],R={},W=()=>{let v=[],ie=[];l&&(v=iN(u),ie=cN(u)),u.textContent="";const et=nN(e,d);u.appendChild(et),Object.keys(n).forEach(tt=>{const ge=u.querySelectorAll(`[onclick="${tt}"]`),Fn=n[tt];ge.forEach(Ms=>{Ms.removeAttribute("onclick"),typeof Fn=="function"&&Ms.addEventListener("click",Fn)})}),l&&(aN(u,v),uN(u,ie)),_.forEach(tt=>tt({...d}))},j=v=>{if(!Array.isArray(v)||v.length===0)return;const ie={props:{...d},changedKeys:v};m.forEach(et=>et(ie))};for(const v of Object.keys(t))R[v]=[],Object.defineProperty(u,v,{get(){return d[v]},set(ie){d[v]!==ie&&(d[v]=ie,h.has(v)&&W(),R[v].forEach(et=>et(ie)),j([v]))},configurable:!0,enumerable:!0});if(u.update=v=>{let ie=!1,et=!1;const tt=[];for(const ge in v)v[ge]!==d[ge]&&(d[ge]=v[ge],h.has(ge)&&(et=!0),R[ge]&&R[ge].forEach(Fn=>Fn(v[ge])),ie=!0,tt.push(ge));ie&&et&&W(),tt.length>0&&j(tt)},u.onRender=v=>{typeof v=="function"&&_.push(v)},u.onAnyPropUpdated=v=>{typeof v=="function"&&m.push(v)},u.onPropUpdated=(v,ie)=>{typeof ie=="function"&&R[v]&&R[v].push(ie)},u.dispose=()=>{a&&(Array.isArray(a)?a.forEach(v=>{typeof v=="function"&&v()}):typeof a=="function"&&a()),_.length=0,m.length=0;for(const v in R)R[v].length=0;u.remove()},W(),c&&s&&!s.contains(u)&&s.appendChild(u),typeof o=="function")try{o(u)}catch(v){FA("[createComponent]: Error in onMount handler of component",v)}return u};let Vs=null;const hN=(t,e=null)=>{if(Vs)return Vs;if(!t)return console.error("Auth UI: Parent element is required"),null;let n=null,s=null,r=10;typeof e=="number"&&(r=e);const i=Dl();return Vs=xl({initialProps:{isLoggedIn:i,userName:"Guest User",signingInDisplay:"none",loginBtnMarginRightPx:r},template:`
      <button style="margin-right: \${loginBtnMarginRightPx}px" id="goog-login-btn" class="login-btn" onclick="handleLogin" disabled>Login</button>
      <button id="goog-logout-btn" class="logout-btn" onclick="handleLogout" disabled>Logout</button>
      <span class="signing-in-indicator" style="display: \${signingInDisplay}; color: var(--text-secondary, #888); font-size: 0.9rem;">Signing in...</span>
      <div class="user-info">\${isLoggedIn ? 'Logged in: ' + userName : 'Logged out'}</div>
    `,handlers:{handleLogin:Em,handleLogout:vm},onMount:o=>{const a=c=>{const l=o.querySelector("#goog-login-btn"),u=o.querySelector("#goog-logout-btn");l&&u&&(l.disabled=c,u.disabled=!c)};a(i),n=Ml(({isLoggedIn:c,userName:l})=>{D("[AuthComponent] Auth state changed:",{isLoggedIn:c,userName:l}),a(c),o.update({isLoggedIn:c,userName:l,signingInDisplay:"none"})}),s=BA(c=>{D("[AuthComponent] One Tap status:",c),c==="signing_in"?o.update({signingInDisplay:"inline-block"}):o.update({signingInDisplay:"none"})})},onCleanup:()=>{n&&(n(),n=null),s&&(s(),s=null),Vs=null},className:"auth-component",parent:t}),Vs},Fl=t=>t?!0:(console.warn("Element not found. el.id: =>",t?.id??"(no id)","el: =>",t),console.trace(),!1),qi=t=>{if(Fl(t))return t.classList.contains("hidden")},A=t=>{Fl(t)&&t.classList.contains("hidden")&&t.classList.remove("hidden")},E=t=>{Fl(t)&&!t.classList.contains("hidden")&&t.classList.add("hidden")},wm=t=>t.classList.contains("small-frame"),Jn=t=>{if(t&&!wm(t)){t.classList.add("small-frame");const e=document.createElement("div");e.classList.add("small-frame-toggle-div");const n=document.createElement("span");n.classList.add("small-frame-toggle-icon"),n.textContent="❮",e.appendChild(n),t.appendChild(e),e.addEventListener("click",()=>{t.classList.contains("closed")?(t.classList.remove("closed"),e.classList.remove("closed"),n.classList.remove("closed")):(t.classList.add("closed"),e.classList.add("closed"),n.classList.add("closed"))})}},gt=t=>{if(wm(t)){t.classList.remove("small-frame");const e=document.querySelector(".small-frame-close");e&&e.remove()}};function oc(t){return document.pictureInPictureElement===t}function Po(t="room"){const e=new URL(window.location);e.searchParams.delete(t),window.history.replaceState({},"",e)}const B=t=>{const e=document.getElementById(t);return e||(console.warn(`Element with id: ${t} not found.`),null)};let Ue=null,tn=null,Lo=null,Ul=null,Re=null,te=null,ne=null,Y=null,q=null,Ie=null,Me=null,$e=null,Xe=null,Ls=null,bm=null,Qe=null,Oo=null,Qt=null,Os=null,Ds=null,Pn=null,$l=null,Bl=null,Hl=null,Vl=null,Xn=null,vr=null;function _h(){Ue=B("lobby"),tn=B("lobby-call-btn"),Lo=B("title-auth-bar"),Ul=B("videos"),Re=B("local-video-el"),te=B("local-video-box"),ne=B("remote-video-el"),Y=B("remote-video-box"),q=B("shared-video-el"),Ie=B("shared-video-box"),Me=B("chat-controls"),$e=B("call-btn"),Xe=B("hang-up-btn"),Ls=B("switch-camera-btn"),Qe=B("mute-btn"),Oo=B("fullscreen-partner-btn"),Qt=B("remote-pip-btn"),Os=B("mic-btn"),Ds=B("camera-btn"),Pn=B("exit-watch-mode-btn"),$l=B("app-pip-btn"),Bl=B("app-title-h1"),Hl=B("app-title-a"),Vl=B("app-title-span"),Xn=B("paste-join-btn"),vr=B("add-contact-btn")}document.readyState==="loading"?document.addEventListener("DOMContentLoaded",_h):_h();const Cm=()=>({lobbyDiv:Ue,lobbyCallBtn:tn,titleAuthBar:Lo,videosWrapper:Ul,localVideoEl:Re,localBoxEl:te,remoteVideoEl:ne,remoteBoxEl:Y,sharedVideoEl:q,sharedBoxEl:Ie,chatControls:Me,callBtn:$e,hangUpBtn:Xe,switchCameraBtn:Ls,installBtn:bm,mutePartnerBtn:Qe,fullscreenPartnerBtn:Oo,remotePipBtn:Qt,micBtn:Os,cameraBtn:Ds,exitWatchModeBtn:Pn,appPipBtn:$l,appTitleH1:Bl,appTitleA:Hl,appTitleSpan:Vl,pasteJoinBtn:Xn,addContactBtn:vr});function Sm(t,e=3,n=100){return new Promise(s=>{let r=0;const i=()=>{const o=document.getElementById(t);if(o){s(o);return}if(r++,r>=e){console.warn(`Element ${t} not found after ${e} attempts`),s(null);return}setTimeout(i,n)};i()})}async function Tm(t,e=3,n=100){const s={},r=t.map(async i=>{const o=await Sm(i,e,n);return s[i]=o,o});return await Promise.all(r),s}async function fN(){const t=await Tm(["searchBtn","searchQuery","searchResults"],5,200),e=document.querySelector(".search-section");t.searchContainer=e;const n=Object.entries(t).filter(([s,r])=>!r).map(([s])=>s);return n.length>0&&console.warn("Some YouTube elements not found:",n),t}const pN=Object.freeze(Object.defineProperty({__proto__:null,get addContactBtn(){return vr},get appPipBtn(){return $l},get appTitleA(){return Hl},get appTitleH1(){return Bl},get appTitleSpan(){return Vl},get callBtn(){return $e},get cameraBtn(){return Ds},get chatControls(){return Me},get exitWatchModeBtn(){return Pn},get fullscreenPartnerBtn(){return Oo},getElements:Cm,get hangUpBtn(){return Xe},initializeYouTubeElements:fN,installBtn:bm,get lobbyCallBtn(){return tn},get lobbyDiv(){return Ue},get localBoxEl(){return te},get localVideoEl(){return Re},get micBtn(){return Os},get mutePartnerBtn(){return Qe},get pasteJoinBtn(){return Xn},get remoteBoxEl(){return Y},get remotePipBtn(){return Qt},get remoteVideoEl(){return ne},robustElementAccess:Sm,get sharedBoxEl(){return Ie},get sharedVideoEl(){return q},get switchCameraBtn(){return Ls},get titleAuthBar(){return Lo},get videosWrapper(){return Ul},waitForElements:Tm},Symbol.toStringTag,{value:"Module"})),yh="yt-video-box",ac="yt-player-root";let K=null,kt=!1;const tr=()=>K,gN=()=>kt,Im=t=>kt=t,Qn=()=>{const t=document.getElementById(yh);if(!t)throw new Error(`Container #${yh} not found`);return t};function mN(){return new Promise(t=>{window.YT&&window.YT.Player?t():window.onYouTubeIframeAPIReady=()=>{t()}})}function km(){const t=Qn();if(!document.getElementById(ac)){const e=document.createElement("div");e.id=ac,t.appendChild(e)}A(t)}function Gi(){const t=Qn();E(t)}function la(){const t=Qn();return t&&!t.classList.contains("hidden")}function cc(t){return t?t.includes("youtube.com")||t.includes("youtu.be"):!1}function Rm(t){if(!t)return null;const e=[/(?:youtube\.com\/watch\?v=)([\w-]+)/,/(?:youtu\.be\/)([\w-]+)/,/(?:youtube\.com\/embed\/)([\w-]+)/,/(?:youtube\.com\/shorts\/)([\w-]+)/];for(const n of e){const s=t.match(n);if(s&&s[1])return s[1]}return null}async function _N({url:t,onReady:e,onStateChange:n}){const s=Rm(t);if(!s)throw new Error("Invalid YouTube URL");if(await mN(),K){try{K.destroy()}catch(o){console.warn("Error destroying previous YouTube player:",o)}K=null}const r=(o=!0)=>{const a=Qn(),c=K.getIframe();if(c&&a){try{a.tabIndex=-1,a.focus({preventScroll:!0})}catch{if(document.activeElement===c)try{c.blur()}catch{}}if(o){const l=u=>{if(u.code==="Space"){const d=Qn(),h=K.getIframe();if(document.activeElement===h||document.activeElement===d)return;u.preventDefault(),console.debug("Space pressed, refocusing iframe"),K.getPlayerState()!==window.YT.PlayerState.PLAYING?jl():Vr()}};document.addEventListener("keydown",l,{once:!0})}}},i=()=>{const o=Qn(),a=K.getIframe();if(o&&a&&document.activeElement!==a)try{a.focus()}catch{}};return km(),new Promise((o,a)=>{try{K=new window.YT.Player(ac,{videoId:s,playerVars:{autoplay:1,mute:0,controls:1,fs:1,rel:0,modestbranding:1,disablekb:0,origin:window.location.origin},events:{onReady:c=>{kt=!0,e&&e(c),o(K)},onStateChange:c=>{c.data===window.YT.PlayerState.ENDED&&r(!1),c.data===window.YT.PlayerState.PAUSED&&r(),c.data===window.YT.PlayerState.PLAYING&&i(),n&&n(c)},onError:c=>{console.error("YouTube player error:",c.data),a(new Error(`YouTube error: ${c.data}`))}}})}catch(c){a(c)}})}function Wl(){if(K){try{Gi(),K.destroy()}catch(t){console.warn("Error destroying YouTube player:",t)}K=null,kt=!1}}function jl(){K&&kt&&K.playVideo()}function Vr(){K&&kt&&K.pauseVideo()}function yN(t){K&&kt&&K.seekTo(t,!0)}function Yi(){return K&&kt?K.getCurrentTime():0}function zl(){return K&&kt?K.getPlayerState():-1}const Ut={UNSTARTED:-1,ENDED:0,PLAYING:1,PAUSED:2,BUFFERING:3,CUED:5};let Je=null,Wr=null,Am=!1,xe="none",ql=null;const gs=()=>Am,Nm=t=>Am=t,fn=()=>xe,EN=t=>{["yt","url","none"].includes(t)?xe=t:console.warn("Invalid lastWatched platform:",t)};let $t=!1,nr=null,sr=0;async function Zn(t){if(!Je)return;console.debug("Updating watch sync state, roomId:",Je);const e=Ro(Je);try{await _n(e,{...t,updatedBy:Wr})}catch(n){console.error("Failed to update watch state:",n)}}function vN(t,e,n){if(!t)return;Je=t,Wr=n;const s=Ro(t);li(s,wN,t),RN()}function wN(t){const e=t.val();e&&e.updatedBy!==Wr&&(Date.now()-sr<500||(e.url&&e.url!==ql&&bN(e.url),e.isYouTube?CN(e):kN(e)))}function bN(t){ql=t,cc(t)?(E(Ie),Pm(t),xe="yt"):(Wl(),A(Ie),q.src=t,xe="url")}function CN(t){!tr()||!gN()||(SN(t),TN(t))}function SN(t){const e=zl(),n=e===Ut.PLAYING;if([Ut.BUFFERING,Ut.UNSTARTED].includes(e)){IN();return}$t||(t.playing&&!n?(jl(),xe="yt"):!t.playing&&n&&(Vr(),xe="yt"))}function TN(t){if(t.currentTime===void 0)return;const e=Yi();Math.abs(e-t.currentTime)>.3&&!$t&&(yN(t.currentTime),setTimeout(()=>{t.playing?jl():Vr(),xe="yt"},500))}function IN(){$t=!0,clearTimeout(nr),nr=setTimeout(async()=>{$t=!1;const t=zl()===Ut.PLAYING;await Zn({playing:t,currentTime:Yi()})},700)}function kN(t){t.playing!==void 0&&(t.playing&&q.paused?q.play().catch(e=>console.warn("Play failed:",e)):!t.playing&&!q.paused&&q.pause()),t.currentTime!==void 0&&Math.abs(q.currentTime-t.currentTime)>1&&(q.currentTime=t.currentTime,t.playing?q.play().catch(n=>console.warn("Play failed:",n)):q.pause())}function RN(){q.addEventListener("play",async()=>{!tr()&&Je&&(sr=Date.now(),await Zn({playing:!0,isYouTube:!1})),xe="url"}),q.addEventListener("pause",async()=>{!tr()&&Je&&(sr=Date.now(),await Zn({playing:!1,isYouTube:!1})),xe="url"}),q.addEventListener("seeked",async()=>{!tr()&&Je&&(sr=Date.now(),await Zn({currentTime:q.currentTime,playing:!q.paused,isYouTube:!1})),xe="url"})}async function AN(t){if(!t)return!1;if(sr=Date.now(),cc(t)){if(E(Ie),!await Pm(t))return!1;xe="yt"}else Wl(),A(Ie),q.src=t,xe="url";if(Je){const e=Ro(Je);ue(e,{url:t,playing:!1,currentTime:0,isYouTube:cc(t),updatedBy:Wr})}return!0}async function lc(t){if(!t||!t.url)return console.warn("Non-existing or invalid video."),!1;ql=t.url;const e=await AN(t.url);return dc(),e}async function Pm(t){if(!Rm(t))return console.error("Invalid YouTube URL:",t),!1;try{return await _N({url:t,onReady:n=>{if(Im(!0),Je){const s=Ro(Je);ue(s,{url:t,playing:!1,currentTime:0,isYouTube:!0,updatedBy:Wr})}},onStateChange:async n=>{if(!tr())return;const r=n.data===Ut.PLAYING,i=n.data===Ut.PAUSED;if(n.data===Ut.BUFFERING){$t=!0,nr&&clearTimeout(nr),nr=setTimeout(async()=>{$t=!1;const c=zl()===Ut.PLAYING;await Zn({playing:c,currentTime:Yi()})},700);return}i&&$t||!$t&&(r||i)&&await Zn({playing:r,currentTime:Yi()})}}),!0}catch(n){return console.error("Failed to load YouTube video:",n),!1}}function NN(t,{inactivityMs:e=3e3,listenTarget:n=document,onShow:s=null,onHide:r=null,hideOnEsc:i=!1,excludeEvents:o=["keydown"]}={}){if(!t)return()=>{};let a=null;const l=["pointermove","pointerdown","pointerup","touchstart","touchmove","mousemove","mousedown","keydown"].filter(m=>!Array.isArray(o)||!o.includes(m));function u(){A(t);try{typeof s=="function"&&s()}catch(m){console.warn("showHideOnInactivity onShow callback error:",m)}a&&clearTimeout(a),a=setTimeout(()=>{E(t);try{typeof r=="function"&&r()}catch(m){console.warn("showHideOnInactivity onHide callback error:",m)}a=null},e)}l.forEach(m=>n.addEventListener(m,u,{passive:!0}));function d(){if(document.hidden){a&&(clearTimeout(a),a=null);try{E(t)}catch(m){console.warn("showHideOnInactivity onHide (visibilitychange) callback error:",m)}}else u()}document.addEventListener("visibilitychange",d);function h(m){if(!m.relatedTarget){a&&(clearTimeout(a),a=null),E(t);try{typeof r=="function"&&r()}catch(R){console.warn("showHideOnInactivity onHide (visibilitychange) callback error:",R)}}}n.addEventListener("mouseout",h);function f(m){if(i&&(m.key==="Escape"||m.key==="Esc")){a&&(clearTimeout(a),a=null),E(t);try{typeof r=="function"&&r()}catch(R){console.warn("showHideOnInactivity onHide (esc) callback error:",R)}}}document.addEventListener("keydown",f);function p(){a||u()}n.addEventListener("touchend",p,{passive:!0}),E(t);function _(){l.forEach(m=>n.removeEventListener(m,u)),document.removeEventListener("visibilitychange",d),n.removeEventListener("mouseout",h),n.removeEventListener("touchend",p),document.removeEventListener("keydown",f),a&&(clearTimeout(a),a=null)}return _}let mt=null,_t=null,Lm="user";function uc(){return Lm}function Om(t){Lm=t}function Do(){return mt instanceof MediaStream}function Gl(){return!mt||!(mt instanceof MediaStream)?(console.error("Invalid remote MediaStream accessed:",mt),null):mt}function Dm(t){mt=t}function Mm(){mt&&(mt.getTracks().forEach(t=>t.stop()),mt=null)}function xm(){return _t instanceof MediaStream}function Mo(){return!_t||!(_t instanceof MediaStream)?(console.error("Invalid local MediaStream accessed:",_t),console.error("Call createLocalStream() before accessing local stream."),null):_t}function Ki(t){_t=t}function Fm(){_t&&(_t.getTracks().forEach(t=>t.stop()),_t=null)}const PN=Object.freeze(Object.defineProperty({__proto__:null,cleanupLocalStream:Fm,cleanupRemoteStream:Mm,getFacingMode:uc,getLocalStream:Mo,getRemoteStream:Gl,hasLocalStream:xm,hasRemoteStream:Do,setFacingMode:Om,setLocalStream:Ki,setRemoteStream:Dm},Symbol.toStringTag,{value:"Module"}));let wr=!1,ni=!1,Eh=null,vh=null,rr=null;const Um=()=>wr;let Yl=()=>{if(!wr){if(!ne||!Do()||ne.paused||ne.readyState<2){ni||(ni=!0,ne.addEventListener("playing",()=>{ni=!1,Yl()},{once:!0}));return}if(ni=!1,wr=!0,A(Y),A(te),Jn(te),E(Ue),E(tn),$e.disabled=!0,$e.classList.add("disabled"),Xe.disabled=!1,Xe.classList.remove("disabled"),Qe.disabled=!1,Qe.classList.remove("disabled"),Qt.disabled=!1,Qt.classList.remove("disabled"),rr||(rr=NN(Me,{inactivityMs:2500,hideOnEsc:!0})),!Eh){const t=()=>{gs()?Jn(Y):gt(Y),A(Y)};ne.addEventListener("leavepictureinpicture",t),Eh=()=>ne.removeEventListener("leavepictureinpicture",t)}if(!vh){const t=()=>E(Y);ne.addEventListener("enterpictureinpicture",t),vh=()=>ne.removeEventListener("enterpictureinpicture",t)}}},$m=()=>{wr&&(wr=!1,gt(te),E(te),gt(Y),E(Y),$e.disabled=!1,$e.classList.remove("disabled"),A(tn),Xe.disabled=!0,Xe.classList.add("disabled"),Qe.disabled=!0,Qe.classList.add("disabled"),Qt.disabled=!0,Qt.classList.add("disabled"),rr&&(rr(),rr=null),A(Ue),A(Me))};const Kl=()=>{if(!Do())return!1;const t=Gl();return t&&t.getVideoTracks().length>0&&t.getVideoTracks()[0].enabled&&t.getVideoTracks()[0].readyState==="live"};function LN(){return"pictureInPictureEnabled"in document&&typeof document.pictureInPictureEnabled=="boolean"&&document.pictureInPictureEnabled}function dc(){if(!gs()){if(Nm(!0),E(Ue),E(tn),Me.classList.remove("bottom"),Me.classList.add("watch-mode"),Um()?(E($e),A(Xe)):(E(Xe),E(Os),E(Qe),A($e)),E(Ds),E(Ls),A(Pn),A(Me),!Kl()){E(Y),gt(Y),oc(Re)||(A(te),Jn(te));return}E(te),gt(te),oc(ne)?(E(Y),gt(Y)):LN()?ne.requestPictureInPicture().then(()=>{E(Y),gt(Y)}).catch(t=>{console.warn("Failed to enter Picture-in-Picture:",t),Jn(Y),A(Y)}):(Jn(Y),A(Y))}}function ir(){gs()&&(E(Pn),A($e),A(Xe),A(Os),A(Qe),A(Ds),A(Ls),Me.classList.remove("watch-mode"),Me.classList.add("bottom"),A(Me),Kl()&&(oc(ne)&&document.exitPictureInPicture().catch(t=>{console.error("Failed to exit Picture-in-Picture:",t)}),gt(Y),A(Y)),Um()?(Jn(te),A(te)):(A(Ue),A(tn),gt(te),E(te)),Nm(!1))}class es{constructor(){this.logs=[],this.isEnabled=!0,this.maxLogs=1e3,this.sessionId=this.generateSessionId()}log(e,n,s={}){if(!this.isEnabled)return;const r={timestamp:performance.now(),sessionId:this.sessionId,category:e,event:n,data:{...s},id:this.generateLogId()};this.logs.push(r),this.logs.length>this.maxLogs&&(this.logs=this.logs.slice(-this.maxLogs)),typeof window<"u"&&window.location?.hostname==="localhost"&&console.log(`[DIAG] ${e}:${n}`,s)}logListenerAttachment(e,n,s,r={}){this.log("LISTENER","ATTACHED",{roomId:e,listenerType:n,currentCount:s,...r})}logListenerCleanup(e,n,s={}){this.log("LISTENER","CLEANUP",{removedCount:e.length,preservedCount:n.length,removedRoomIds:e,preservedRoomIds:n,...s})}logDuplicateListener(e,n,s={}){this.log("LISTENER","DUPLICATE_PREVENTED",{roomId:e,listenerType:n,...s})}logIncomingCallEvent(e,n,s,r={}){this.log("INCOMING_CALL","DETECTED",{callerId:e,roomId:n,isFresh:s.isFresh,validationMethod:s.method,age:s.age,reason:s.reason,...r})}logNotificationDecision(e,n,s,r={}){this.log("INCOMING_CALL","NOTIFICATION_DECISION",{decision:e,reason:n,roomId:s,...r})}logCallingUILifecycle(e,n,s={}){this.log("CALLING_UI",e,{roomId:n,...s})}logFirebaseOperation(e,n,s=null,r={}){this.log("FIREBASE","OPERATION",{operation:e,success:n,error:s?{message:s.message,code:s.code,stack:s.stack}:null,...r})}logFirebaseConnectionState(e,n={}){this.log("FIREBASE","CONNECTION_STATE",{state:e,...n})}logRoomCreation(e,n,s,r={}){this.log("ROOM","CREATED",{roomId:e,isInitiator:n,creationTime:s.creationTime,listenerAttachTime:s.listenerAttachTime,timeDiff:s.listenerAttachTime-s.creationTime,...r})}logMemberJoinEvent(e,n,s,r={}){this.log("ROOM","MEMBER_JOINED",{roomId:e,memberId:n,joinedAt:s.joinedAt,role:s.role,...r})}logContactSave(e,n,s={}){this.log("CONTACT","SAVED",{contactId:e,roomId:n,...s})}logContactCall(e,n,s,r={}){this.log("CONTACT","CALL_INITIATED",{contactId:e,roomId:n,forceInitiator:s,...r})}logFreshnessValidation(e,n,s,r={}){this.log("FRESHNESS","VALIDATION",{roomId:e,method:n,result:{isFresh:s.isFresh,age:s.age,threshold:s.threshold,reason:s.reason},...r})}logRaceCondition(e,n,s,r={}){this.log("RACE_CONDITION",e,{roomId:n,events:s,...r})}getLogs(e={}){let n=[...this.logs];return e.category&&(n=n.filter(s=>s.category===e.category)),e.event&&(n=n.filter(s=>s.event===e.event)),e.roomId&&(n=n.filter(s=>s.data.roomId===e.roomId)),e.since&&(n=n.filter(s=>s.timestamp>=e.since)),e.until&&(n=n.filter(s=>s.timestamp<=e.until)),n}getCallFlowTrace(e){return this.getLogs({roomId:e}).sort((n,s)=>n.timestamp-s.timestamp)}getListenerDiagnostics(e=null){const n=this.getLogs({category:"LISTENER"});return e?n.filter(s=>s.data.roomId===e):n}getFailureAnalysis(){const e=this.logs.filter(n=>n.category==="FIREBASE"&&n.data.success===!1||n.category==="INCOMING_CALL"&&n.data.decision==="REJECT"||n.category==="LISTENER"&&n.event==="DUPLICATE_PREVENTED");return{totalFailures:e.length,firebaseFailures:e.filter(n=>n.category==="FIREBASE").length,rejectedCalls:e.filter(n=>n.category==="INCOMING_CALL"&&n.data.decision==="REJECT").length,duplicateListeners:e.filter(n=>n.event==="DUPLICATE_PREVENTED").length,failures:e}}exportDiagnostics(){return{sessionId:this.sessionId,exportTime:Date.now(),logCount:this.logs.length,logs:[...this.logs],summary:this.getFailureAnalysis()}}exportLogsAsJSON(){return JSON.stringify(this.exportDiagnostics(),null,2)}downloadLogs(e=null){e||(e=`diagnostic-logs-${this.sessionId}-${Date.now()}.json`);const n=this.exportLogsAsJSON(),s=new Blob([n],{type:"application/json"}),r=document.createElement("a");r.href=URL.createObjectURL(s),r.download=e,r.click(),URL.revokeObjectURL(r.href)}getLogsInTimeRange(e,n){return this.logs.filter(s=>s.timestamp>=e&&s.timestamp<=n)}getLogsSince(e){return this.logs.filter(n=>n.timestamp>=e)}clearOldLogs(e=1440*60*1e3){const n=Date.now()-e;this.logs=this.logs.filter(s=>s.timestamp>=n)}clearLogs(){this.logs=[]}persistLogs(){try{const e=`diagnostic-logs-${this.sessionId}`;return localStorage.setItem(e,this.exportLogsAsJSON()),e}catch(e){return console.warn("Failed to persist logs to localStorage:",e),null}}loadPersistedLogs(e){try{const n=localStorage.getItem(e);if(n){const s=JSON.parse(n);if(s.logs&&Array.isArray(s.logs)){const r=new Set(this.logs.map(o=>o.id)),i=s.logs.filter(o=>!r.has(o.id));return this.logs=[...this.logs,...i].sort((o,a)=>o.timestamp-a.timestamp),i.length}}return 0}catch(n){return console.warn("Failed to load persisted logs:",n),0}}static getPersistedLogKeys(){const e=[];for(let n=0;n<localStorage.length;n++){const s=localStorage.key(n);s&&s.startsWith("diagnostic-logs-")&&e.push(s)}return e}static cleanupPersistedLogs(e=1440*60*1e3){const n=Date.now()-e;es.getPersistedLogKeys().forEach(r=>{try{const i=localStorage.getItem(r);if(i){const o=JSON.parse(i);o.exportTime&&o.exportTime<n&&localStorage.removeItem(r)}}catch{localStorage.removeItem(r)}})}enable(){this.isEnabled=!0}disable(){this.isEnabled=!1}generateSessionId(){return`session_${performance.now()}_${Math.random().toString(36).substr(2,9)}`}generateLogId(){return`log_${performance.now()}_${Math.random().toString(36).substr(2,9)}`}formatTimestamp(e){return new Date(e).toISOString()}startTiming(e){const n=`timing_${e}_${Date.now()}`;return this.log("TIMING","START",{operation:e,timingId:n}),n}endTiming(e,n={}){const s=this.logs.find(r=>r.category==="TIMING"&&r.event==="START"&&r.data.timingId===e);if(s){const r=Date.now()-s.timestamp;return this.log("TIMING","END",{timingId:e,duration:r,operation:s.data.operation,...n}),r}return null}}let ua=null;function y(){return ua||(ua=new es),ua}typeof window<"u"&&(window.diagnosticLogger={getInstance:()=>y(),exportLogs:()=>{const e=y().exportLogsAsJSON();return console.log("Diagnostic logs exported:"),console.log(e),e},downloadLogs:t=>{y().downloadLogs(t),console.log("Diagnostic logs downloaded")},getRoomLogs:t=>{const n=y().getCallFlowTrace(t);return console.log(`Logs for room ${t}:`,n),n},getFailures:()=>{const e=y().getFailureAnalysis();return console.log("Failure analysis:",e),e},getListenerDiagnostics:t=>{const n=y().getListenerDiagnostics(t);return console.log("Listener diagnostics:",n),n},getLogsSince:t=>{const n=y().getLogsSince(t);return console.log(`Logs since ${new Date(t).toISOString()}:`,n),n},getLogsInRange:(t,e)=>{const s=y().getLogsInTimeRange(t,e);return console.log(`Logs from ${new Date(t).toISOString()} to ${new Date(e).toISOString()}:`,s),s},persistLogs:()=>{const e=y().persistLogs();return console.log(`Logs persisted with key: ${e}`),e},loadPersistedLogs:t=>{const n=y().loadPersistedLogs(t);return console.log(`Loaded ${n} persisted logs`),n},getPersistedKeys:()=>{const t=es.getPersistedLogKeys();return console.log("Persisted log keys:",t),t},clearLogs:()=>{y().clearLogs(),console.log("Diagnostic logs cleared")},enable:()=>{y().enable(),console.log("Diagnostic logging enabled")},disable:()=>{y().disable(),console.log("Diagnostic logging disabled")},getSessionInfo:()=>{const t=y(),e={sessionId:t.sessionId,logCount:t.logs.length,isEnabled:t.isEnabled,maxLogs:t.maxLogs};return console.log("Session info:",e),e},help:()=>{console.log(`
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
      `)}},window.addEventListener("beforeunload",()=>{try{const t=y();t.logs.length>0&&t.persistLogs(),es.cleanupPersistedLogs()}catch{}}),(window.location.hostname==="localhost"||window.location.hostname==="127.0.0.1")&&setTimeout(()=>{try{const t=y(),e=typeof localStorage<"u"&&localStorage.getItem("debug:console")==="1";if(!t.isEnabled||!e)return;const n=es.getPersistedLogKeys();n.length>0&&(console.log(`Found ${n.length} persisted diagnostic log sessions. Use diagnosticLogger.loadPersistedLogs(key) to load them.`),console.log("Available keys:",n))}catch{}},1e3));class ON{constructor(){this.currentRoomId=null}async createNewRoom(e,n,s=null){const r=Date.now();s||(s=Math.random().toString(36).substring(2,15)),y().log("ROOM","CREATE_START",{roomId:s,userId:n,hasOffer:!!e,timestamp:r});const i=on(s);try{return await ue(i,{offer:{type:e.type,sdp:e.sdp},createdAt:Date.now(),createdBy:n}),y().logFirebaseOperation("create_room",!0,null,{roomId:s,userId:n,duration:Date.now()-r}),await this.joinRoom(s,n),y().log("ROOM","CREATE_COMPLETE",{roomId:s,userId:n,totalDuration:Date.now()-r}),s}catch(o){throw y().logFirebaseOperation("create_room",!1,o,{roomId:s,userId:n,duration:Date.now()-r}),o}}async checkRoomStatus(e){const n=on(e),s=await Ye(n);if(!s.exists())return{exists:!1,hasMembers:!1,memberCount:0};const r=s.val(),i=r.members||{},o=Object.keys(i).length;return{exists:!0,hasMembers:o>0,memberCount:o,roomData:r}}async getRoomData(e){const n=on(e),s=await Ye(n);if(!s.exists())throw new Error("Room does not exist");return s.val()}async saveAnswer(e,n){const s=on(e);await _n(s,{answer:n})}async joinRoom(e,n,s="Guest User"){const r=eh(e,n);await ue(r,{displayName:s,joinedAt:Date.now()}),y().logFirebaseOperation("set","joinRoom",`rooms/${e}/members/${n}`)}async leaveRoom(e,n=null,{deleteRoomIfEmpty:s=!0}={}){const r=n||this.currentRoomId;if(!r||!e)return;const i=eh(r,e),o=ei(r),a=on(r);try{await at(i)}catch(c){y().logFirebaseOperation("leave_room_remove_member",!1,c,{roomId:r,userId:e})}if(s)try{const c=await Ye(o),l=c.exists()?c.val():{};(l?Object.keys(l).length:0)===0&&await at(a).catch(d=>{y().logFirebaseOperation("delete_empty_room",!1,d,{roomId:r})})}catch(c){y().logFirebaseOperation("check_members_after_leave",!1,c,{roomId:r})}(!n||n===this.currentRoomId)&&(this.currentRoomId=null)}async rejectCall(e,n,s="user_rejected"){if(!e||!n)return;const r=on(e),i={rejection:{by:n,reason:s,at:Date.now()}};try{await _n(r,i),y().log("ROOM","REJECT_SET",{roomId:e,byUserId:n,reason:s})}catch(o){throw y().log("ROOM","REJECT_SET_FAILED",{roomId:e,byUserId:n,reason:s,error:String(o?.message||o)}),o}}async cancelCall(e,n,s="caller_cancelled"){if(!e||!n)return;const r=on(e),i={cancellation:{by:n,reason:s,at:Date.now()}};try{await _n(r,i),y().log("ROOM","CANCEL_SET",{roomId:e,byUserId:n,reason:s})}catch(o){throw y().log("ROOM","CANCEL_SET_FAILED",{roomId:e,byUserId:n,reason:s,error:String(o?.message||o)}),o}}onCallCancelled(e,n){const s=xk(e);hn(s,"value",n,e),y().logFirebaseOperation("on","onCallCancelled",`rooms/${e}/cancellation`,{event:"value"})}onMemberJoined(e,n){const s=ei(e);hn(s,"child_added",n,e),y().logFirebaseOperation("on","onMemberJoined",`rooms/${e}/members`,{event:"child_added"})}onMemberLeft(e,n){const s=ei(e);hn(s,"child_removed",n,e),y().logFirebaseOperation("on","onMemberLeft",`rooms/${e}/members`,{event:"child_removed"})}onIncomingCall(e,n,s){const r=ei(e),i=a=>{s("join",a.key,a.val())},o=a=>{s("leave",a.key,a.val())};return hn(r,"child_added",i,e,n),hn(r,"child_removed",o,e,n),()=>Mk(n,e)}get roomId(){return this.currentRoomId}}const Z=new ON;class DN{constructor(e,{loop:n=!1,volume:s=.5}={}){this.src=e,this.audio=new Audio(e),this.audio.loop=n,this.audio.volume=Math.max(0,Math.min(1,s)),this.isPlaying=!1,this.audio.onerror=r=>{console.error(`[AudioPlayer] Failed to load audio: ${e}`,r),this.isPlaying=!1},this.audio.onplay=()=>{this.isPlaying=!0},this.audio.onpause=()=>{this.isPlaying=!1},this.audio.onended=()=>{this.isPlaying=!1}}async play(){if(!this.audio)return!1;if(this.isPlaying)return!0;try{return await this.audio.play(),this.isPlaying=!0,!0}catch(e){return e.name==="NotAllowedError"?console.warn("[AudioPlayer] Autoplay blocked - user interaction required first",{src:this.src}):e.name==="NotSupportedError"?console.error("[AudioPlayer] Audio format not supported",{src:this.src}):console.error("[AudioPlayer] Playback error:",e),this.isPlaying=!1,!1}}stop(){this.audio&&(this.audio.pause(),this.audio.currentTime=0,this.isPlaying=!1)}pause(){this.audio&&(this.audio.pause(),this.isPlaying=!1)}setVolume(e){this.audio&&(this.audio.volume=Math.max(0,Math.min(1,e)))}getVolume(){return this.audio?.volume??0}dispose(){this.stop(),this.audio&&(this.audio.onerror=null,this.audio.onplay=null,this.audio.onpause=null,this.audio.onended=null,this.audio.src="",this.audio=null),this.isPlaying=!1}}class MN{constructor({incomingSrc:e,outgoingSrc:n,volume:s}={}){this.incomingSrc=e??"/sounds/incoming.mp3",this.outgoingSrc=n??"/sounds/outgoing.mp3",this.defaultVolume=s??.7,this.currentPlayer=null,this.currentType=null}configure({incomingSrc:e,outgoingSrc:n,volume:s}={}){e!==void 0&&(this.incomingSrc=e),n!==void 0&&(this.outgoingSrc=n),s!==void 0&&(this.defaultVolume=s)}setIncomingRingtone(e){this.incomingSrc=e}setOutgoingRingtone(e){this.outgoingSrc=e}setVolume(e){this.defaultVolume=Math.max(0,Math.min(1,e))}async playIncoming(){return this._play("incoming",this.incomingSrc)}async playOutgoing(){return this._play("outgoing",this.outgoingSrc)}async _play(e,n){this.stop();try{this.currentPlayer=new DN(n,{loop:!0,volume:this.defaultVolume}),this.currentType=e;const s=await this.currentPlayer.play();return s?console.log(`[Ringtone] Playing ${e} ringtone`):(console.warn(`[Ringtone] Failed to start ${e} ringtone (likely autoplay blocked)`),this.currentPlayer?.dispose(),this.currentPlayer=null,this.currentType=null),s}catch(s){return console.error(`[Ringtone] Error playing ${e} ringtone:`,s),this.currentPlayer?.dispose(),this.currentPlayer=null,this.currentType=null,!1}}stop(){this.currentPlayer&&(console.log(`[Ringtone] Stopping ${this.currentType} ringtone`),this.currentPlayer.stop(),this.currentPlayer.dispose(),this.currentPlayer=null,this.currentType=null)}isPlaying(){return this.currentPlayer?.isPlaying??!1}getCurrentType(){return this.currentType}}const ts=new MN,Ji=3e4;let dt=null,zs=null;async function xN(t,e=null){const n=he(),s=F();if(!s)return;const r=Cl(s);await ue(r,{roomId:t,targetContactName:e,initiatedAt:Date.now(),callerUserId:n})}async function Xi(){const t=F();if(!t)return;const e=Cl(t);await at(e).catch(()=>{})}async function Bm(t,e){if(!t)return!1;try{const n=Cl(t),s=await Ye(n);if(!s.exists())return!1;const r=s.val();return r.roomId!==e?!1:Date.now()-r.initiatedAt<Ji}catch(n){return console.warn("Failed to check outgoing call freshness",n),!1}}async function Hm(t){if(!t)return!1;try{const e=S(T,`rooms/${t}/createdAt`),n=await Ye(e);if(!n.exists())return!1;const s=n.val();return typeof s!="number"?!1:Date.now()-s<Ji}catch(e){return console.warn("Failed to check room freshness",e),!1}}async function Vm(t,e,n){const s=y(),r=Date.now();vn(),await xN(t,e);const i=document.createElement("div");i.id="calling-modal",i.style.cssText=`
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
  `;const u=async()=>{s.logCallingUILifecycle("CANCEL",t,{contactName:e,reason:"user_cancelled",duration:Date.now()-r});try{await Promise.all([Xi(),Z.cancelCall(t,he(),"caller_cancelled"),Z.leaveRoom(he(),t)])}catch(d){s.log("ROOM","CALLER_CANCELLED_CLEANUP_FAIL",{roomId:t,error:String(d)})}ts.stop(),vn()};l.onclick=u,o.appendChild(a),o.appendChild(c),o.appendChild(l),i.appendChild(o),document.body.appendChild(i),i.dataset.roomId=t,dt=i,ts.playOutgoing(),zs=setTimeout(async()=>{s.logCallingUILifecycle("TIMEOUT",t,{contactName:e,reason:"auto_timeout",duration:Date.now()-r,timeoutMs:Ji});try{await Promise.all([Xi(),Z.cancelCall(t,he(),"auto_timeout"),Z.leaveRoom(he(),t)])}catch(d){s.log("ROOM","CALLER_TIMEOUT_CLEANUP_FAIL",{roomId:t,error:String(d)})}ts.stop(),vn()},Ji)}function vn(){if(ts.stop(),dt){const t=dt.dataset?.roomId||"unknown";y().logCallingUILifecycle("HIDE",t,{reason:"hide_called",hadTimeout:!!zs,timestamp:Date.now()})}zs&&(clearTimeout(zs),zs=null),dt&&(dt.remove(),dt=null)}async function Jl(){if(dt){const t=dt.dataset?.roomId||"unknown";y().logCallingUILifecycle("ANSWERED",t,{reason:"call_answered",timestamp:Date.now()})}await Xi(),vn()}async function FN(t="user_rejected"){const e=y(),n=dt?.dataset?.roomId||"unknown";e.logCallingUILifecycle("REJECTED",n,{reason:t,timestamp:Date.now()}),await Xi(),vn()}const UN=Object.freeze(Object.defineProperty({__proto__:null,hideCallingUI:vn,isOutgoingCallFresh:Bm,isRoomCallFresh:Hm,onCallAnswered:Jl,onCallRejected:FN,showCallingUI:Vm},Symbol.toStringTag,{value:"Module"}));let ns=null;function xo(t,e={}){return new Promise(n=>{const s=document.createElement("dialog");s.innerHTML=`
      <p>${t}</p>
      <div class="confirm-dialog-actions">
        <button data-action="cancel">Cancel</button>
        <button data-action="confirm" autofocus>Confirm</button>
      </div>
    `,s.classList.add("confirm-dialog");const r=s.querySelector('[data-action="confirm"]'),i=s.querySelector('[data-action="cancel"]');if(!r||!i){console.error("dialog element not found!"),n(!1);return}let o=null;function a(c){o&&clearTimeout(o),s.close(),s.remove(),ns===a&&(ns=null),n(c)}r.addEventListener("click",()=>{a(!0)}),i.addEventListener("click",()=>{a(!1)}),s.addEventListener("cancel",()=>a(!1)),document.body.appendChild(s),s.showModal(),ns=a,e.autoRemoveSeconds&&typeof e.autoRemoveSeconds=="number"&&e.autoRemoveSeconds>0&&(o=setTimeout(()=>{a(!1)},e.autoRemoveSeconds*1e3))})}function $N(){if(typeof ns=="function"){try{ns(!1)}catch{}return ns=null,!0}return!1}const BN=Object.freeze(Object.defineProperty({__proto__:null,default:xo,dismissActiveConfirmDialog:$N},Symbol.toStringTag,{value:"Module"}));class HN{async send(e,n){throw new Error("MessagingTransport.send() must be implemented by subclass")}listen(e,n){throw new Error("MessagingTransport.listen() must be implemented by subclass")}async getUnreadCount(e){throw new Error("MessagingTransport.getUnreadCount() must be implemented by subclass")}async markAsRead(e){throw new Error("MessagingTransport.markAsRead() must be implemented by subclass")}listenToUnreadCount(e,n){throw new Error("MessagingTransport.listenToUnreadCount() must be implemented by subclass")}}const wh=100;class VN extends HN{_getConversationId(e,n){return[e,n].sort().join("_")}async send(e,n){const s=F();if(!s)throw new Error("Cannot send message: not logged in");const i=Hr()?.displayName||"Guest User",o=this._getConversationId(s,e),a=Ui(S(T,`conversations/${o}/messages`));await ue(a,{text:n,from:s,fromName:i,sentAt:yn(),read:!1}),this._cleanupOldMessages(o).catch(c=>{console.warn("[RTDBTransport] Failed to cleanup old messages:",c)})}listen(e,n){const s=F();if(!s)return console.warn("[RTDBTransport] Cannot listen to messages: not logged in"),()=>{};const r=this._getConversationId(s,e),i=S(T,`conversations/${r}/messages`),o=new Set,a=c=>{const l=c.key,u=c.val();if(!u||o.has(l))return;o.add(l);const d=u.from===s;n(u.text,u,d)};return $i(i,a),()=>{Le(i,"child_added",a)}}async getUnreadCount(e){const n=F();if(!n)return 0;const s=this._getConversationId(n,e),r=S(T,`conversations/${s}/messages`),{get:i}=await rt(async()=>{const{get:o}=await Promise.resolve().then(()=>zI);return{get:o}},void 0);try{const o=await i(r);if(!o.exists())return 0;const a=o.val();return Object.values(a).filter(c=>!c.read&&c.from===e).length}catch(o){return console.warn("[RTDBTransport] Failed to get unread count:",o),0}}async markAsRead(e){const n=F();if(!n)return;const s=this._getConversationId(n,e),r=S(T,`conversations/${s}/messages`);try{const i=await Ye(r);if(!i.exists())return;const o=i.val(),a={};Object.entries(o).forEach(([c,l])=>{!l.read&&l.from===e&&(a[`conversations/${s}/messages/${c}/read`]=!0)}),Object.keys(a).length>0&&await _n(S(T),a)}catch(i){console.warn("[RTDBTransport] Failed to mark messages as read:",i)}}listenToUnreadCount(e,n){const s=F();if(!s)return console.warn("[RTDBTransport] Cannot listen to unread count: not logged in"),()=>{};const r=this._getConversationId(s,e),i=S(T,`conversations/${r}/messages`),o=async()=>{try{const l=await this.getUnreadCount(e);n(l)}catch(l){console.warn("[RTDBTransport] Failed to get unread count:",l)}},a=async l=>{const u=l.val();u&&u.from===e&&!u.read&&await o()},c=async l=>{const u=l.val();u&&u.from===e&&await o()};return $i(i,a),hg(i,c),()=>{Le(i,"child_added",a),Le(i,"child_changed",c)}}async _cleanupOldMessages(e){const n=S(T,`conversations/${e}/messages`),s=await Ye(n);if(!s.exists())return;const r=s.val(),i=Object.keys(r).length;if(i<=wh)return;const o=i-wh,a=Object.entries(r).sort((l,u)=>(l[1].sentAt||0)-(u[1].sentAt||0)),c={};for(let l=0;l<o;l++){const[u]=a[l];c[`conversations/${e}/messages/${u}`]=null}await _n(S(T),c),console.log(`[RTDBTransport] Cleaned up ${o} old messages from conversation ${e}`)}}class WN{constructor(e,n=null){if(!e)throw new Error("MessagingController requires a transport implementation");this.transport=e,this.fileTransport=n,this.sessions=new Map}openSession(e,{onMessage:n,onUnreadChange:s}={}){if(!e||typeof e!="string")throw new Error("contactId must be a non-empty string");if(this.sessions.has(e))return console.info(`[MessagingController] Session already open for ${e}`),this.sessions.get(e);const r=this.transport.listen(e,(o,a,c)=>{n&&typeof n=="function"&&n(o,a,c),!c&&s&&typeof s=="function"&&this.transport.getUnreadCount(e).then(l=>s(l)).catch(l=>console.warn("[MessagingController] Failed to get unread count:",l))}),i={contactId:e,send:o=>!o||typeof o!="string"?Promise.reject(new Error("Message text must be a non-empty string")):this.transport.send(e,o),markAsRead:()=>this.transport.markAsRead(e),getUnreadCount:()=>this.transport.getUnreadCount(e),close:()=>{this.closeSession(e)},_unsubscribe:r};return this.sessions.set(e,i),i}closeSession(e){const n=this.sessions.get(e);n&&(n._unsubscribe&&typeof n._unsubscribe=="function"&&n._unsubscribe(),this.sessions.delete(e))}getSession(e){return this.sessions.get(e)}getAllSessions(){return Array.from(this.sessions.values())}closeAllSessions(){this.sessions.forEach(e=>{e._unsubscribe&&typeof e._unsubscribe=="function"&&e._unsubscribe()}),this.sessions.clear()}async getUnreadCount(e){if(!e||typeof e!="string")throw new Error("contactId must be a non-empty string");return this.transport.getUnreadCount(e)}listenToUnreadCount(e,n){if(!e||typeof e!="string")throw new Error("contactId must be a non-empty string");if(typeof n!="function")throw new Error("onCountChange must be a function");return this.transport.listenToUnreadCount(e,n)}setFileTransport(e){this.fileTransport=e}canSendFiles(){return this.fileTransport!==null&&this.fileTransport.isReady()}async sendFile(e,n){if(!this.fileTransport)throw new Error("File transport not available. Files can only be sent during active calls.");if(!this.fileTransport.isReady())throw new Error("File transport not ready");return this.fileTransport.sendFile(e,n)}onFileReceived(e){if(!this.fileTransport)throw new Error("File transport not available");if(typeof e!="function")throw new Error("onFileReceived callback must be a function");this.fileTransport.onFileReceived(e)}clearFileTransport(){this.fileTransport&&(this.fileTransport.cleanup(),this.fileTransport=null)}}const jt=new WN(new VN);function Qi(t,e,n={}){if(!t||typeof e!="function")throw new Error("closeOnClickOutside: valid element and onClose callback required");const{ignore:s=[],esc:r=!0,events:i=["mousedown","touchstart"]}=n,o=Array.isArray(s)?s.filter(Boolean):[],a=l=>{try{const u=l.target;if(t.contains(u))return;for(const d of o)if(d&&d.contains&&d.contains(u)||d===u)return;e(l)}catch(u){console.error("closeOnClickOutside handler error:",u)}},c=l=>{r&&l.key==="Escape"&&e(l)};return i.forEach(l=>document.addEventListener(l,a,{passive:!0})),r&&document.addEventListener("keydown",c),function(){i.forEach(u=>document.removeEventListener(u,a,{passive:!0})),r&&document.removeEventListener("keydown",c)}}function Wm({parent:t,onToggle:e,icon:n="💬",initialUnreadCount:s=0,id:r=null,startHidden:i=!1}={}){if(!t)return console.error("createMessageToggle: parent element is required"),null;if(typeof e!="function")return console.error("createMessageToggle: onToggle callback is required"),null;const o=xl({initialProps:{unreadCount:s},template:`
      <div class="messages-toggle-btn">
        <button onclick="handleToggle">
          ${n}
          <span class="notification-badge">
            \${unreadCount}
          </span>
        </button>
      </div>
    `,handlers:{handleToggle:c=>{c.preventDefault(),c.stopPropagation(),e()}},className:"messages-toggle-container"+(i?" hidden":""),autoAppend:!1});if(r&&o&&typeof r=="string")try{o.id=r}catch(c){console.warn("createMessageToggle: failed to set id on toggleContainer",c)}let a=o.querySelector(".notification-badge");return a&&(a.style.display=s>0?"flex":"none"),o.onPropUpdated("unreadCount",c=>{const l=o.querySelector(".notification-badge");if(l&&(l.style.display=c>0?"flex":"none"),c>0){const u=o.querySelector(".messages-toggle-btn");u&&(u.classList.add("new-message"),setTimeout(()=>{u.classList.remove("new-message")},4e3))}}),t.appendChild(o),{element:o,setUnreadCount(c){let l=Number(c);(!Number.isFinite(l)||l<0)&&(l=0),o.unreadCount=l},clearBadge(){this.setUnreadCount(0)},cleanup(){if(o&&typeof o.dispose=="function")try{o.dispose()}catch(c){console.warn("createMessageToggle: error during dispose()",c)}if(o&&o.parentNode)try{o.parentNode.removeChild(o)}catch{}}}}function bh(t=!1){if(typeof window>"u"||typeof navigator>"u")return!1;const e=navigator.userAgent||navigator.vendor||"",n=/iPad|iPhone|iPod/.test(e),s=/Macintosh/.test(e)&&typeof navigator.maxTouchPoints=="number"&&navigator.maxTouchPoints>1,r=(n||s)&&!window.MSStream,i=/Android/i.test(e),o=r||i;return t&&console.table({"User Agent":e,isAndroid:i,isiOSUA:n,isiPadOSDesktopUA:s,isMobileDevice:o}),o}function jN(){const t=document.createElement("div");t.innerHTML=`
    <div id="messages-box" class="messages-box hidden">
      
      <div id="messages"></div>
      
      <div class="message-attachments">
        <input type="file" id="file-input" style="display: none" />
        <button type="button" id="attach-file-btn" title="Attach file">
          <i class="fa fa-paperclip"></i>
        </button>
      </div>

      <form id="messages-form">
        <input id="messages-input" placeholder="Type a message...">
        <button type="submit">Send</button>
      </form>

    </div>
  `,document.body.appendChild(t);const e=t.querySelector("#messages-box"),n=t.querySelector("#messages"),s=t.querySelector("#messages-form"),r=t.querySelector("#messages-input");return"virtualKeyboard"in navigator&&(navigator.virtualKeyboard.overlaysContent=!0),{messagesBoxContainer:t,messagesBox:e,messagesMessages:n,messagesForm:s,messagesInput:r}}const zN=CSS.supports?.("position-anchor: --msg-toggle")&&CSS.supports?.("right: anchor(right)")&&CSS.supports?.("bottom: anchor(top)");function qN(t){const e=t.getBoundingClientRect();return e.top>=0&&e.left>=0&&e.bottom<=window.innerHeight&&e.right<=window.innerWidth}function GN(){let t=!1,e=null,n=null,s=!1;const r=document.querySelector(".top-bar .top-right-menu")||document.querySelector(".top-right-menu"),i=Wm({parent:r,onToggle:()=>ge(),icon:"💬",initialUnreadCount:0,id:"main-messages-toggle-btn",startHidden:!0});if(!i)return console.error("Messages UI: failed to initialize message toggle; aborting messages UI initialization."),null;const o=i.element,{messagesBoxContainer:a,messagesBox:c,messagesMessages:l,messagesForm:u,messagesInput:d}=jN();if(!o||!c||!l||!u||!d)return console.error("Messages UI elements not found."),null;const h=document.getElementById("attach-file-btn"),f=document.getElementById("file-input"),p=u.querySelector('button[type="submit"]');E(h),h.addEventListener("click",()=>{f.click()}),f.addEventListener("change",async L=>{const z=L.target.files[0];if(!z||!n){n||console.warn("[MessagesUI] FileTransfer not initialized");return}const me=p.textContent;p.textContent="Sending...";try{await n.sendFile(z,ke=>{p.textContent=`${Math.round(ke*100)}%`}),xs(`📎 You sent: ${z.name}`)}catch(ke){console.error("[MessagesUI] File send failed:",ke),xs("❌ Failed to send file")}finally{p.textContent=me,f.value=""}});function _(){if(!o||!c||c.classList.contains("hidden"))return;const L=o.getBoundingClientRect(),z=c.getBoundingClientRect(),me=8;let ke=L.top-z.height-me;ke<8&&(ke=L.bottom+me);let Rt=L.left+L.width/2-z.width/2;const zr=window.innerWidth-z.width-8;Rt<8&&(Rt=8),Rt>zr&&(Rt=zr),c.style.top=`${Math.round(ke)}px`,c.style.left=`${Math.round(Rt)}px`}function m(){t||(t=!0,window.addEventListener("resize",_,{passive:!0}),window.addEventListener("scroll",_,{passive:!0}),window.addEventListener("orientationchange",_,{passive:!0}))}function R(){t&&(t=!1,window.removeEventListener("resize",_),window.removeEventListener("scroll",_),window.removeEventListener("orientationchange",_))}let W=null;const j=new MutationObserver(L=>{L.forEach(z=>{z.type==="attributes"&&z.attributeName==="class"&&(c.classList.contains("hidden")||(i.clearBadge(),e?.toggle&&e.toggle.clearBadge()))})});j.observe(c,{attributes:!0});function v(){return!c.classList.contains("hidden")}function ie(){return document.activeElement===d}function et(){ie()||d.focus()}function tt(){ie()&&d.blur()}function ge(){c.classList.toggle("hidden"),v()?(bh()||d.focus(),zN?requestAnimationFrame(()=>{qN(c)||(_(),m())}):(_(),m()),ru()):(document.activeElement===d&&d.blur(),R(),c.style.top="",c.style.left="",c.style.bottom="",c.style.right="")}bh()||(W=Qi(c,()=>{E(c),R(),c.style.top="",c.style.left="",c.style.bottom="",c.style.right=""},{ignore:[i.element],esc:!0}));function Fn(){A(i.element)}function Ms(){E(i.element)}function xs(L,z={}){const me=document.createElement("p");if(z.fileDownload){const{fileName:ke,url:Rt}=z.fileDownload,zr=L.split(ke)[0];me.textContent=zr;const sn=document.createElement("a");sn.textContent=ke,sn.href=Rt,sn.download=ke,sn.style.cursor="pointer",sn.style.textDecoration="underline",sn.addEventListener("click",()=>{setTimeout(()=>URL.revokeObjectURL(Rt),100)}),me.appendChild(sn)}else me.textContent=L;L.startsWith("You:")?me.style.textAlign="right":L.startsWith("Partner:")&&(me.style.textAlign="left"),l.appendChild(me),ru()}let nn=null;function ru(){l&&(nn!==null&&cancelAnimationFrame(nn),nn=requestAnimationFrame(()=>{l.scrollTop=l.scrollHeight,nn=null}))}function s_(L,{isUnread:z=!0}={}){if(xs(`Partner: ${L}`),qi(c)&&z){const me=i.element.unreadCount||0;i.setUnreadCount(me+1)}}u.addEventListener("submit",L=>{L.preventDefault();const z=d.value.trim();z&&(e?(e.send(z),d.value=""):console.warn("[MessagesUI] No active session to send message"))});const r_=()=>{const L=document.activeElement;return L&&(L.tagName==="INPUT"||L.tagName==="TEXTAREA"||L.isContentEditable)},iu=L=>{(L.key==="m"||L.key==="M")&&!v()&&!r_()&&(L.preventDefault(),ge())};document.addEventListener("keydown",iu);function Fo(){nn!==null&&(cancelAnimationFrame(nn),nn=null),l.innerHTML="",l.scrollTop=0}function i_(L){e!==null&&e!==L&&Fo(),e=L}function o_(){return e}function a_(L){n=L,n?(A(h),n.onFileReceived=z=>{const me=URL.createObjectURL(z);if(xs(`📎 Partner sent: ${z.name}`,{fileDownload:{fileName:z.name,url:me}}),qi(c)){const ke=i.element.unreadCount||0;i.setUnreadCount(ke+1)}s&&(p.textContent="Send",s=!1)},n.onReceiveProgress=z=>{s=!0,p.textContent=`${Math.round(z*100)}%`}):E(h)}function c_(){Fo(),e=null,n=null,s=!1,Ms(),E(c),i.clearBadge(),d.value="",p&&(p.textContent="Send"),E(h),c.style.top="",c.style.left="",c.style.bottom="",c.style.right="",R()}function l_(){if(i&&i.cleanup(),R(),typeof W=="function")try{W()}catch(L){console.error("Error removing messages box outside click handler:",L)}j.disconnect(),document.removeEventListener("keydown",iu),a&&a.parentNode&&a.parentNode.removeChild(a)}return{appendChatMessage:xs,receiveMessage:s_,isMessagesUIOpen:v,toggleMessages:ge,showMessagesToggle:Fn,hideMessagesToggle:Ms,isMessageInputFocused:ie,focusMessageInput:et,unfocusMessageInput:tt,setSession:i_,getCurrentSession:o_,clearMessages:Fo,setFileTransfer:a_,reset:c_,cleanup:l_}}const _e=GN();function Zi(t,e){if(!t||!e)throw new Error("Both user IDs are required");if(t===e)throw new Error("Cannot create room ID for same user");const[n,s]=[t,e].sort(),r=`${n}_${s}`;let i=0;for(let u=0;u<r.length;u++){const d=r.charCodeAt(u);i=(i<<5)-i+d,i=i&i}let o=5381;for(let u=0;u<r.length;u++)o=(o<<5)+o+r.charCodeAt(u);const a=Math.abs(i).toString(36),c=Math.abs(o).toString(36);return(a+c).slice(0,16).padEnd(16,"0")}const da=new Map,ha=new Map,jn=new Map,Ch=14;async function Sh(t,e,n){const s=F();if(s){const r=S(T,`users/${s}/contacts/${t}`);await ue(r,{contactId:t,contactName:e,roomId:n,savedAt:Date.now()});return}try{const r=localStorage.getItem("contacts")||"{}",i=JSON.parse(r);i[t]={contactId:t,contactName:e,roomId:n,savedAt:Date.now()},localStorage.setItem("contacts",JSON.stringify(i))}catch(r){console.warn("Failed to save contact to localStorage",r)}}async function br(){const t=F();if(t)try{const e=S(T,`users/${t}/contacts`),n=await Ye(e);return n.exists()?n.val():{}}catch(e){return console.warn("Failed to read contacts from RTDB",e),{}}try{const e=localStorage.getItem("contacts")||"{}";return JSON.parse(e)}catch(e){return console.warn("Failed to read contacts from localStorage",e),{}}}async function YN(t,e){if(!t)return e||"Unknown";try{const n=await br();for(const s of Object.values(n||{}))if(s?.roomId===t)return s.contactName||s.contactId||e}catch(n){console.warn("Failed to resolve caller name",n)}return e||"Unknown"}async function KN(t,e,n){if(!t||!e)return;const r=(await br())?.[t];if(r){r.roomId!==e&&(await Sh(t,r.contactName,e),await Ln(n)),ms(e);return}if(!await xo("Save contact?",{autoRemoveSeconds:15}))return;const o=window.prompt("Enter a name for this contact:",t)||t;await Sh(t,o,e),ms(e),await Ln(n)}async function Ln(t){if(!t)return;const e=await br(),n=Object.keys(e);let s=t.querySelector(".contacts-container");if(s||(s=document.createElement("div"),s.className="contacts-container",t.appendChild(s)),n.length===0){s.innerHTML="<p>No saved contacts yet.</p>",E(s);return}A(s),s.innerHTML=`
    <h3>Contacts</h3>
    <div class="contacts-list">
      ${n.map(r=>{const i=e[r];return`
            <div class="contact-entry">
              <div class="contact-msg-toggle-container" data-contact-id="${r}"></div>
              <span
                class="contact-name"
                data-room-id="${i.roomId||""}"
                data-contact-name="${i.contactName}"
                data-contact-id="${r}"
                title="Call ${i.contactName}"
              >
                <span class="presence-indicator" data-contact-id="${r}"></span>
                <i class="fa fa-phone"></i>
                ${i.contactName&&i.contactName.length>Ch?i.contactName.slice(0,Ch-2)+"..":i.contactName}
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
  `,JN(s,t),XN(n),await QN(s,n,e)}function JN(t,e){t.querySelectorAll(".contact-message-btn").forEach(n=>{n.onclick=s=>{s.stopPropagation();const r=n.getAttribute("data-contact-id"),i=n.getAttribute("data-contact-name");r&&Xl(r,i)}}),t.querySelectorAll(".contact-name").forEach(n=>{n.onclick=async()=>{let s=n.getAttribute("data-room-id");const r=n.getAttribute("data-contact-name"),i=n.getAttribute("data-contact-id");if(!s&&i){const o=F();if(o)try{s=Zi(o,i),console.log("[CONTACTS] Generated deterministic room ID:",s)}catch(a){console.error("[CONTACTS] Failed to generate deterministic room ID:",a);return}}s&&(ms(s),await jr(s,{forceInitiator:!0}).catch(a=>(console.warn("Failed to call contact:",a),!1))&&await Vm(s,r))}}),t.querySelectorAll(".contact-delete-btn").forEach(n=>{n.onclick=async()=>{const s=n.getAttribute("data-contact-id");!s||!window.confirm("Delete this contact?")||(await ZN(s),await Ln(e))}})}function Xl(t,e,n=!1){if(!F()){alert("Please sign in to send messages");return}if(jt.getSession(t)){_e.showMessagesToggle(),n&&!_e.isMessagesUIOpen()&&_e.toggleMessages();return}jt.getAllSessions().forEach(a=>{a.close()}),_e.clearMessages(),_e.setSession(null);const i=jt.openSession(t,{onMessage:(a,c,l)=>{if(l)_e.appendChatMessage(`You: ${a}`);else{const u=!c.read;_e.receiveMessage(a,{isUnread:u})}}});i.contactName=e,i.toggle=jn.get(t),_e.setSession(i),_e.showMessagesToggle(),n&&!_e.isMessagesUIOpen()&&_e.toggleMessages(),i.markAsRead().catch(a=>{console.warn("Failed to mark messages as read:",a)});const o=jn.get(t);o&&o.clearBadge()}function XN(t){da.forEach(({ref:e,callback:n})=>{Le(e,"value",n)}),da.clear(),F()&&t.forEach(e=>{const n=S(T,`users/${e}/presence`),s=document.querySelector(`.presence-indicator[data-contact-id="${e}"]`);if(!s)return;const r=i=>{const a=i.val()?.state==="online";s.style.backgroundColor=a?"#00d26a":"#444",s.title=a?"Online":"Offline"};Fr(n,r),da.set(e,{ref:n,callback:r})})}let Ws=!1,$n=null;async function QN(t,e,n){if(!F())return;const s=10;let r=0;for(;Ws&&r<s;)await new Promise(i=>setTimeout(i,100)),r++;if(Ws){console.debug("[CONTACTS] Toggle replacement still in progress after waiting, skipping");return}Ws=!0,$n&&clearTimeout($n),$n=setTimeout(()=>{console.warn("[CONTACTS] Toggle replacement timeout - forcing flag reset"),Ws=!1},5e3);try{jn.forEach(o=>{o.cleanup()}),jn.clear(),ha.forEach(o=>{o()}),ha.clear();const i=F();for(const o of e){const a=n[o],c=t.querySelector(`.contact-msg-toggle-container[data-contact-id="${o}"]`);if(!c){console.warn(`[CONTACTS] No toggle container found for contact ${o}`);continue}const l=Wm({parent:c,onToggle:()=>Xl(o,a.contactName,!0),icon:"💬",initialUnreadCount:0});if(!l){console.error(`[CONTACTS] Failed to create toggle for contact ${o}`);continue}jn.set(o,l);const u=jt.listenToUnreadCount(o,d=>{l.setUnreadCount(d)});ha.set(o,u)}Promise.all(e.map(o=>jt.getUnreadCount(o).then(a=>{const c=jn.get(o);c&&c.setUnreadCount(a)}).catch(a=>console.warn(`[CONTACTS] Failed to get unread count for ${o}:`,a))))}finally{$n&&(clearTimeout($n),$n=null),Ws=!1}}async function ZN(t){const e=F();if(e){try{await at(S(T,`users/${e}/contacts/${t}`))}catch(n){console.warn("Failed to delete contact from RTDB",n)}return}try{const n=localStorage.getItem("contacts")||"{}",s=JSON.parse(n);s[t]&&(delete s[t],localStorage.setItem("contacts",JSON.stringify(s)))}catch(n){console.warn("Failed to delete contact from localStorage",n)}}let qs=null,st=null;async function eP(t,e="User"){const n=F(),s=Hr();if(!n||!s)throw new Error("Must be logged in to send invites");if(!t)throw new Error("Recipient user ID is required");const r=Zi(n,t),i=S(T,`users/${t}/incomingInvites/${n}`),o={fromUserId:n,fromName:s.displayName||"Anonymous",fromEmail:s.email||"",fromPhotoURL:s.photoURL||null,roomId:r,timestamp:Date.now(),status:"pending"};await ue(i,o),console.log(`[INVITATIONS] Sent invite to ${e} (${t})`)}function tP(t){const e=F();if(!e)return console.warn("[INVITATIONS] Cannot listen for invites - not logged in"),()=>{};hc();const n=S(T,`users/${e}/incomingInvites`);return qs=Fr(n,s=>{if(s.exists()){const r=s.val();Object.entries(r).forEach(([i,o])=>{o&&o.status==="pending"&&(console.log(`[INVITATIONS] New invite from ${o.fromName}`),t(i,o))})}}),console.log("[INVITATIONS] Listening for incoming invites"),hc}async function nP(t,e){const n=F(),s=Hr();if(!n||!s)throw new Error("Must be logged in to accept invites");const r=S(T,`users/${n}/contacts/${t}`);await ue(r,{contactId:t,contactName:e.fromName||"User",roomId:e.roomId,savedAt:Date.now()});const i=S(T,`users/${t}/acceptedInvites/${n}`);await ue(i,{acceptedByUserId:n,acceptedByName:s.displayName||"User",acceptedByEmail:s.email||"",acceptedByPhotoURL:s.photoURL||null,roomId:e.roomId,timestamp:Date.now()});const o=S(T,`users/${n}/incomingInvites/${t}`);await at(o),console.log(`[INVITATIONS] Accepted invite from ${e.fromName} and notified sender`)}async function sP(t){const e=F();if(!e)throw new Error("Must be logged in to decline invites");const n=S(T,`users/${e}/incomingInvites/${t}`);await at(n),console.log(`[INVITATIONS] Declined invite from ${t}`)}function rP(t){const e=F();if(!e)return console.warn("[INVITATIONS] Cannot listen for accepted invites - not logged in"),()=>{};if(st){const s=S(T,`users/${e}/acceptedInvites`);Le(s,"value",st)}const n=S(T,`users/${e}/acceptedInvites`);return st=Fr(n,async s=>{if(s.exists()){const r=s.val();for(const[i,o]of Object.entries(r))if(o)try{const a=S(T,`users/${e}/contacts/${i}`);await ue(a,{contactId:i,contactName:o.acceptedByName||"User",roomId:o.roomId,savedAt:Date.now()}),console.log(`[INVITATIONS] Auto-saved contact: ${o.acceptedByName} (invite accepted)`);const c=S(T,`users/${e}/acceptedInvites/${i}`);await at(c),t&&t(i,o)}catch(a){console.error("[INVITATIONS] Failed to auto-save contact from accepted invite:",a)}}}),console.log("[INVITATIONS] Listening for accepted invites"),()=>{if(st){const s=S(T,`users/${e}/acceptedInvites`);Le(s,"value",st),st=null}}}function hc(){const t=F();if(qs&&t){const e=S(T,`users/${t}/incomingInvites`);Le(e,"value",qs),qs=null}if(st&&t){const e=S(T,`users/${t}/acceptedInvites`);Le(e,"value",st),st=null}qs===null&&st===null&&console.log("[INVITATIONS] Cleaned up all invite listeners")}async function iP(){return new Promise(t=>{const e=document.createElement("dialog");e.classList.add("add-contact-modal"),e.innerHTML=`
      <h2>Add Contact</h2>
      <p>Enter the email address of someone you want to connect with:</p>
      <form id="add-contact-form">
        <input 
          type="email" 
          id="contact-email-input" 
          placeholder="friend@example.com"
          required
          autofocus
        />
        <div id="search-status" class="search-status"></div>
        <div class="modal-actions">
          <button type="button" data-action="cancel">Cancel</button>
          <button type="submit" data-action="search">Search</button>
        </div>
      </form>
    `;const n=e.querySelector("#add-contact-form"),s=e.querySelector("#contact-email-input"),r=e.querySelector("#search-status"),i=e.querySelector('[data-action="cancel"]'),o=e.querySelector('[data-action="search"]');function a(){e.close(),e.remove(),t()}i.addEventListener("click",a),e.addEventListener("cancel",a),n.addEventListener("submit",async c=>{c.preventDefault();const l=s.value.trim();if(l){o.disabled=!0,s.disabled=!0,r.textContent="Searching...",r.className="search-status searching";try{const u=await zA(l);if(!u){r.textContent=`${l} is not on HangVidU yet. You can invite them via email or share a link when this feature is available.`,r.className="search-status not-found",o.disabled=!1,s.disabled=!1;return}const d=Hr();if(d&&u.uid===d.uid){r.textContent="That's your own email address!",r.className="search-status error",o.disabled=!1,s.disabled=!1;return}r.textContent=`Found ${u.displayName}! Sending invitation...`,r.className="search-status found",await eP(u.uid,u.displayName),r.textContent=`✓ Invitation sent to ${u.displayName}!`,r.className="search-status success",setTimeout(()=>{a()},1500)}catch(u){console.error("[ADD CONTACT] Error searching for user:",u),r.textContent="Error searching for user. Please try again.",r.className="search-status error",o.disabled=!1,s.disabled=!1}}}),document.body.appendChild(e),e.showModal()})}function oP(){const t=document.querySelector("link[rel~='icon']");return t?t.href:"/favicon.ico"}class aP{constructor(){this.originalTitle=document.title,this.originalFavicon=oP(),this.titleFlashInterval=null,this.isFlashing=!1,this.wakeLock=null,this.setupVisibilityListener()}setupVisibilityListener(){document.addEventListener("visibilitychange",()=>{!document.hidden&&this.isFlashing&&this.stopTitleFlashing()})}startCallIndicators(e){console.log(`[VisibilityManager] Starting call indicators for: ${e}`),this.startTitleFlashing(e),this.setFavicon("/icons/phone-ringing.svg"),this.setBadge(1),this.requestWakeLock()}stopCallIndicators(){console.log("[VisibilityManager] Stopping call indicators"),this.stopTitleFlashing(),this.restoreFavicon(),this.clearBadge(),this.releaseWakeLock()}startTitleFlashing(e){this.stopTitleFlashing();let n=!0;this.isFlashing=!0,document.title=`📞 Call from ${e}!`,this.titleFlashInterval=setInterval(()=>{this.isFlashing&&(document.title=n?`📞 Call from ${e}!`:this.originalTitle,n=!n)},1e3)}stopTitleFlashing(){this.titleFlashInterval&&(clearInterval(this.titleFlashInterval),this.titleFlashInterval=null),this.isFlashing=!1,document.title=this.originalTitle}setFavicon(e){const n=document.querySelector("link[rel~='icon']");n&&(n.href=e,console.log(`[VisibilityManager] Favicon changed to: ${e}`))}restoreFavicon(){this.setFavicon(this.originalFavicon)}setBadge(e){"setAppBadge"in navigator&&navigator.setAppBadge(e).then(()=>{console.log(`[VisibilityManager] Badge set to: ${e}`)}).catch(n=>{console.warn("[VisibilityManager] Badge not supported:",n)})}clearBadge(){"clearAppBadge"in navigator&&navigator.clearAppBadge().then(()=>{console.log("[VisibilityManager] Badge cleared")}).catch(e=>{console.warn("[VisibilityManager] Badge clear failed:",e)})}async requestWakeLock(){if("wakeLock"in navigator)try{this.wakeLock=await navigator.wakeLock.request("screen"),console.log("[VisibilityManager] Wake lock active"),this.wakeLock.addEventListener("release",()=>{console.log("[VisibilityManager] Wake lock released"),this.wakeLock=null},{once:!0})}catch(e){console.warn("[VisibilityManager] Wake lock failed:",e)}}releaseWakeLock(){if(this.wakeLock){const e=this.wakeLock;this.wakeLock=null,e.release().then(()=>{console.log("[VisibilityManager] Wake lock released manually")}).catch(n=>{console.warn("[VisibilityManager] Wake lock release failed:",n)})}}}const Th=new aP,Cr=new WeakMap;function Ql(t,e,n){if(!t||!n)throw new Error("setupIceCandidates: pc and roomId are required");if(Cr.has(t)||Cr.set(t,[]),e==="initiator")Ih(t,"offerCandidates",n),kh(t,"answerCandidates",n);else if(e==="joiner")Ih(t,"answerCandidates",n),kh(t,"offerCandidates",n);else throw new Error(`Invalid role: ${e} specified for ICE candidate setup.`)}function Ih(t,e,n){t.onicecandidate=s=>{if(s.candidate){const r=Ui(e==="offerCandidates"?Ng(n):Pg(n));ue(r,s.candidate.toJSON())}}}function kh(t,e,n){const s=e==="offerCandidates"?Ng(n):Pg(n);let r=!1;const i=()=>{if(r)return;r=!0;const a=()=>{t.remoteDescription&&(Zl(t),t.removeEventListener("signalingstatechange",a))};t.addEventListener("signalingstatechange",a)};hn(s,"child_added",a=>{const c=a.val();if(!(!t||t.signalingState==="closed")&&c)if(t.remoteDescription)try{t.addIceCandidate(new RTCIceCandidate(c))}catch{}else{const l=Cr.get(t);l&&(l.push(c),l.length===1&&i())}},n)}function Zl(t){if(!t||!Cr.has(t))return;const e=Cr.get(t);if(e.length!==0){D(`🔄 Draining ${e.length} queued ICE candidate(s)`);for(const n of e)try{t.addIceCandidate(new RTCIceCandidate(n)).catch(s=>{D("Error adding queued ICE candidate:",s)})}catch{}e.length=0}}const cP=Object.freeze(Object.defineProperty({__proto__:null,drainIceCandidateQueue:Zl,setupIceCandidates:Ql},Symbol.toStringTag,{value:"Module"}));let nt=null,Rh=null;function jm(t){Rh=t,t.onconnectionstatechange=()=>{D("onconnectionstatechange:",t.connectionState),t.connectionState==="connected"?(Yl(),Jl().catch(e=>console.warn("Failed to clear calling state on connect:",e)),nt&&(clearTimeout(nt),nt=null)):t.connectionState==="disconnected"?(nt&&clearTimeout(nt),nt=setTimeout(()=>{t===Rh&&t.connectionState==="disconnected"&&fe.cleanupCall({reason:"connection_lost"}),nt=null},3e3)):t.connectionState==="failed"&&(Po(),nt&&(clearTimeout(nt),nt=null),fe.cleanupCall({reason:"connection_failed"}))},t.addEventListener("iceconnectionstatechange",e=>{D("ICE iceconnectionstatechange:",t.iceConnectionState),t.iceConnectionState==="failed"&&(console.warn("ICE connection failed, restarting ICE..."),t.restartIce())})}const eu={iceServers:[{urls:"stun:stun.l.google.com:19302"}]},fa=new WeakMap;function zm(t,e,n){fa.has(t)||fa.set(t,{});const s=fa.get(t),r=e==="offer"?"lastOffer":"lastAnswer";return s[r]===n?!0:(s[r]=n,!1)}function qm(t,e){return t?e==="offer"?t.signalingState==="stable":t.signalingState==="have-local-offer"||t.signalingState==="stable":!1}function tu(t,e){e.getTracks().forEach(n=>{t.addTrack(n,e)})}async function Gm(t){const e=await t.createOffer();return await t.setLocalDescription(e),e}async function Ym(t){const e=await t.createAnswer();return await t.setLocalDescription(e),e}async function Km(t,e,n){if(zm(t,e.type,e.sdp))return console.debug(`Ignoring duplicate ${e.type} - already processed`),!1;if(!qm(t,e.type))return console.warn(`Ignoring ${e.type} - unexpected signaling state:`,t.signalingState),!1;try{return await t.setRemoteDescription(new RTCSessionDescription(e)),n(t),console.debug(`Remote description set (${e.type})`),!0}catch(s){return console.error(`Failed to set remote description (${e.type}):`,s),!1}}function Jm(){return Math.random().toString(36).substring(2,9)}const lP=Object.freeze(Object.defineProperty({__proto__:null,addLocalTracks:tu,createAnswer:Ym,createOffer:Gm,generateRoomId:Jm,isDuplicateSdp:zm,isValidSignalingState:qm,rtcConfig:eu,setRemoteDescription:Km},Symbol.toStringTag,{value:"Module"}));async function uP({localStream:t,remoteVideoEl:e,mutePartnerBtn:n,setupRemoteStream:s,setupWatchSync:r,targetRoomId:i=null}){if(!t)return{success:!1};const o=new RTCPeerConnection(eu),a="initiator",c=i||Jm(),l=he();tu(o,t);const u=o.createDataChannel("files");if(!s(o,e,n))return console.error("Error setting up remote stream"),o.close(),{success:!1};Ql(o,a,c),jm(o);const h=await Gm(o);await Z.createNewRoom(h,l,c),r(c,a,l);const f=`${window.location.origin}${window.location.pathname}?room=${c}`;return{success:!0,pc:o,roomId:c,roomLink:f,dataChannel:u,role:a}}async function dP({roomId:t,localStream:e,remoteVideoEl:n,mutePartnerBtn:s,setupRemoteStream:r,setupWatchSync:i,onMessagesUIReady:o=null}){if(!e)return{success:!1};if(!t)return{success:!1};const a=await Z.checkRoomStatus(t);if(!a.exists)return{success:!1};if(!a.hasMembers)return{success:!1};let c;try{c=await Z.getRoomData(t)}catch(m){return D("Error: "+m.message),{success:!1}}const l=c.offer;if(!l)return{success:!1};const u=new RTCPeerConnection(eu),d="joiner",h=he();tu(u,e);let f=null;if(u.ondatachannel=m=>{f=m.channel,D("[Call Flow] DataChannel received by joiner",{label:f.label})},!r(u,n,s))return console.error("Error setting up remote stream for joiner"),u.close(),{success:!1};Ql(u,d,t),jm(u),await Km(u,l,Zl);const _=await Ym(u);try{await Z.saveAnswer(t,_)}catch(m){return console.error("Failed to save answer to Firebase:",m),u.close(),{success:!1}}return i(t,d,h),await Z.joinRoom(t,h),{success:!0,pc:u,roomId:t,dataChannel:f,role:d}}class hP{async sendFile(e,n){throw new Error("FileTransport.sendFile() must be implemented by subclass")}onFileReceived(e){throw new Error("FileTransport.onFileReceived() must be implemented by subclass")}onReceiveProgress(e){throw new Error("FileTransport.onReceiveProgress() must be implemented by subclass")}isReady(){throw new Error("FileTransport.isReady() must be implemented by subclass")}cleanup(){throw new Error("FileTransport.cleanup() must be implemented by subclass")}}const fP={FILE_CONFIG:{NETWORK_CHUNK_SIZE:65536}};async function pP(t){if(t instanceof ArrayBuffer)return t;if(t instanceof Blob)try{return await t.arrayBuffer()}catch(e){return console.error("[ChunkProcessor] Blob conversion failed:",e),null}else if(t instanceof Uint8Array||ArrayBuffer.isView(t))try{const e=t instanceof Uint8Array?t:new Uint8Array(t.buffer,t.byteOffset,t.byteLength),n=new ArrayBuffer(e.length);return new Uint8Array(n).set(e),n}catch(e){return console.error("[ChunkProcessor] TypedArray conversion failed:",e),null}else return console.error("[ChunkProcessor] Unknown data type:",Object.prototype.toString.call(t)),null}function gP(t){try{if(t.byteLength<4)return console.error("[ChunkProcessor] Invalid embedded packet - too small:",t.byteLength),null;const s=new DataView(t).getUint32(0,!0),r=4+s;if(t.byteLength<r)return console.error("[ChunkProcessor] Incomplete embedded packet - expected:",r,"got:",t.byteLength),null;const i=new Uint8Array(t,4,s),o=new TextDecoder().decode(i),a=JSON.parse(o),c=4+s,l=t.slice(c);return{chunkMeta:a,chunkData:l}}catch(e){return console.error("[ChunkProcessor] Failed to parse embedded packet:",e),null}}const mP=1024;function _P(t,e,n){let s=0,r=0;const i=[];t.forEach((c,l)=>{c instanceof ArrayBuffer?(r++,s+=c.byteLength):i.push(l)});const o=e-s;return{isComplete:r===n&&Math.abs(o)<=mP,validChunks:r,totalSize:s,missingChunks:i,sizeDifference:o}}const pa=fP.FILE_CONFIG.NETWORK_CHUNK_SIZE,Ah=9e3*1024*1024;class yP{constructor(e){this.dataChannel=e,this.receivedChunks=new Map,this.fileMetadata=new Map,this.onFileError=null,this.onReceiveProgress=null}async sendFile(e,n){if(e.size>Ah)throw new Error(`File too large (max ${Ah/(1024*1024)} MB)`);if(this.dataChannel.readyState!=="open")throw new Error("DataChannel not ready");const s=`${e.name}-${e.size}-${Date.now()}`,r=Math.ceil(e.size/pa);this.dataChannel.send(JSON.stringify({type:"FILE_META",fileId:s,name:e.name,size:e.size,mimeType:e.type,totalChunks:r}));for(let i=0;i<r;i++){const o=i*pa,a=Math.min(o+pa,e.size),c=await e.slice(o,a).arrayBuffer(),l={type:"FILE_CHUNK",fileId:s,chunkIndex:i,totalChunks:r},u=new TextEncoder().encode(JSON.stringify(l)),d=new ArrayBuffer(4+u.length+c.byteLength),h=new Uint8Array(d);for(new DataView(d).setUint32(0,u.length,!0),h.set(u,4),h.set(new Uint8Array(c),4+u.length),this.dataChannel.send(d),n&&n((i+1)/r);this.dataChannel.bufferedAmount>256*1024;)await new Promise(p=>setTimeout(p,10))}}async handleMessage(e){if(typeof e=="string"){const n=JSON.parse(e);n.type==="FILE_META"&&(this.fileMetadata.set(n.fileId,n),this.receivedChunks.set(n.fileId,[]),this.onFileMetaReceived?.(n))}else{const n=await pP(e);if(!n){console.error("[FileTransfer] Failed to convert binary data to ArrayBuffer");return}const s=gP(n);if(!s){console.error("[FileTransfer] Failed to parse embedded chunk packet");return}const{chunkMeta:r,chunkData:i}=s,o=this.receivedChunks.get(r.fileId);if(!o){console.error("[FileTransfer] Received chunk for unknown file:",r.fileId);return}if(o[r.chunkIndex]=i,this.onReceiveProgress){const a=o.filter(c=>c).length;this.onReceiveProgress(a/r.totalChunks)}o.filter(a=>a).length===r.totalChunks&&this.assembleFile(r.fileId)}}assembleFile(e){const n=this.fileMetadata.get(e),s=this.receivedChunks.get(e),r=_P(s,n.size,n.totalChunks);if(!r.isComplete){console.error("[FileTransfer] File assembly failed:",{fileId:e,fileName:n.name,...r}),this.onFileError&&this.onFileError({fileName:n.name,reason:"incomplete",details:r});return}const i=new Blob(s,{type:n.mimeType}),o=new File([i],n.name,{type:n.mimeType});this.onFileReceived?.(o),this.receivedChunks.delete(e),this.fileMetadata.delete(e)}}class EP extends hP{constructor(e){if(super(),!e)throw new Error("DataChannelFileTransport requires a DataChannel");this.dataChannel=e,this.fileTransfer=new yP(e),this._setupMessageHandling()}_setupMessageHandling(){this.dataChannel.onmessage=e=>{if(typeof e.data=="string")try{const n=JSON.parse(e.data);if(n.type==="FILE_META"||n.type==="FILE_CHUNK"){this.fileTransfer.handleMessage(e.data);return}}catch{}else this.fileTransfer.handleMessage(e.data)}}async sendFile(e,n){if(!this.isReady())throw new Error("DataChannel not ready");return this.fileTransfer.sendFile(e,n)}onFileReceived(e){if(typeof e!="function")throw new Error("onFileReceived callback must be a function");this.fileTransfer.onFileReceived=e}onReceiveProgress(e){if(typeof e!="function")throw new Error("onReceiveProgress callback must be a function");this.fileTransfer.onReceiveProgress=e}isReady(){return this.dataChannel&&this.dataChannel.readyState==="open"}cleanup(){this.dataChannel&&(this.dataChannel.onmessage=null),this.fileTransfer&&(this.fileTransfer.onFileReceived=null,this.fileTransfer.onFileMetaReceived=null),this.dataChannel=null,this.fileTransfer=null}}class vP{constructor(){this.listeners=new Map}on(e,n){this.listeners.has(e)||this.listeners.set(e,new Set),this.listeners.get(e).add(n)}off(e,n){this.listeners.has(e)&&this.listeners.get(e).delete(n)}emit(e,n){if(this.listeners.has(e))for(const s of Array.from(this.listeners.get(e)))try{s(n)}catch(r){console.warn("CallController listener error",r)}}}class wP{constructor(){this.emitter=new vP,this.resetState()}resetState(){this.state="idle",this.roomId=null,this.roomLink=null,this.role=null,this.partnerId=null,this.pc=null,this.dataChannel=null,this.messagesUI=null,this.localVideoEl=null,this.remoteVideoEl=null,this.isHangingUp=!1,this.isCleaningUp=!1,this.listeners=new Map}getState(){return{state:this.state,roomId:this.roomId,roomLink:this.roomLink,role:this.role,partnerId:this.partnerId,hasPc:!!this.pc,isHangingUp:this.isHangingUp,isCleaningUp:this.isCleaningUp}}on(e,n){this.emitter.on(e,n)}off(e,n){this.emitter.off(e,n)}setPartnerId(e){this.partnerId=e}setupCancellationListener(e){if(!e)return;const n=S(T,`rooms/${e}/cancellation`);let s=!1;const r=async i=>{const o=i.val();if(o&&!s){s=!0;try{this.remoteVideoEl&&(this.remoteVideoEl.srcObject=null)}catch(a){console.warn("Failed to clear remote video after cancellation",a)}try{this.pc&&this.pc.close()}catch{}try{await this.cleanupCall({reason:o.reason||"remote_cancelled"})}catch(a){console.warn("Failed to trigger CallController cleanup",a)}}};li(n,r,e),this.listeners.has("cancellation")||this.listeners.set("cancellation",[]),this.listeners.get("cancellation").push({ref:n,callback:r,roomId:e})}setupAnswerListener(e,n,s){if(!e||!n)return;const r=S(T,`rooms/${e}/answer`),i=async o=>{const a=o.val();if(a){const{setRemoteDescription:c}=await rt(async()=>{const{setRemoteDescription:l}=await Promise.resolve().then(()=>lP);return{setRemoteDescription:l}},void 0);await c(n,a,s)}};li(r,i,e),this.listeners.has("answer")||this.listeners.set("answer",[]),this.listeners.get("answer").push({ref:r,callback:i,roomId:e})}setupRejectionListener(e){if(!e)return;const n=S(T,`rooms/${e}/rejection`);let s=!1;const r=async i=>{const o=i.val();if(o&&!s&&(s=!0,this.pc?.connectionState!=="connected")){try{const{onCallRejected:a}=await rt(async()=>{const{onCallRejected:c}=await Promise.resolve().then(()=>UN);return{onCallRejected:c}},void 0);await a(o.reason||"user_rejected")}catch{}try{await Z.leaveRoom(he(),e)}catch{}try{this.pc&&this.pc.close()}catch{}}};li(n,r,e),this.listeners.has("rejection")||this.listeners.set("rejection",[]),this.listeners.get("rejection").push({ref:n,callback:r,roomId:e})}setupMemberJoinedListener(e){if(!e)return;const n=he(),s=r=>{r.key!==n&&(this.setPartnerId(r.key),this.emitter.emit("memberJoined",{memberId:r.key,roomId:e}))};Z.onMemberJoined(e,s),this.listeners.has("member-joined")||this.listeners.set("member-joined",[]),this.listeners.get("member-joined").push({callback:s,roomId:e})}setupMemberLeftListener(e){if(!e)return;const n=he(),s=r=>{r.key!==n&&this.pc?.connectionState==="connected"&&this.emitter.emit("memberLeft",{memberId:r.key,roomId:e})};Z.onMemberLeft(e,s),this.listeners.has("member-left")||this.listeners.set("member-left",[]),this.listeners.get("member-left").push({callback:s,roomId:e})}removeTrackedListeners(){try{for(const[e,n]of this.listeners.entries())for(const s of n)try{s.ref&&Le(s.ref,"value",s.callback)}catch(r){console.warn(`Failed to remove ${e} listener`,r)}}catch(e){console.warn("Failed to remove tracked listeners",e)}finally{this.listeners.clear()}if(this.roomId)try{ko(this.roomId)}catch(e){console.warn("Failed to remove RTDB listeners for room",e)}}async createCall(e={}){this.state="creating";try{e.localVideoEl&&(this.localVideoEl=e.localVideoEl),e.remoteVideoEl&&(this.remoteVideoEl=e.remoteVideoEl);const n=await uP(e);if(!n||!n.success)return this.state="idle",this.emitter.emit("error",{phase:"createCall",detail:n}),this.emitCallFailed("createCall",n),n;this.pc=n.pc,this.roomId=n.roomId,this.roomLink=n.roomLink||null,this.role=n.role||"initiator",this.dataChannel=n.dataChannel||null,this.messagesUI=n.messagesUI||null,this.state="waiting",this.dataChannel&&this.setupFileTransport(this.dataChannel);const{drainIceCandidateQueue:s}=await rt(async()=>{const{drainIceCandidateQueue:r}=await Promise.resolve().then(()=>cP);return{drainIceCandidateQueue:r}},void 0);return this.setupAnswerListener(this.roomId,this.pc,s),this.setupCancellationListener(this.roomId),this.setupRejectionListener(this.roomId),this.setupMemberJoinedListener(this.roomId),this.setupMemberLeftListener(this.roomId),this.emitter.emit("created",{roomId:this.roomId,roomLink:this.roomLink,role:this.role}),n}catch(n){throw this.state="idle",this.emitter.emit("error",{phase:"createCall",error:n}),this.emitCallFailed("createCall",n),n}}async answerCall(e={}){this.state="joining";try{e.localVideoEl&&(this.localVideoEl=e.localVideoEl),e.remoteVideoEl&&(this.remoteVideoEl=e.remoteVideoEl);const s=await dP({...e,onMessagesUIReady:r=>{this.messagesUI=r}});return!s||!s.success?(this.state="idle",this.emitter.emit("error",{phase:"answerCall",detail:s}),this.emitCallFailed("answerCall",s),s):(this.pc=s.pc,this.roomId=s.roomId,this.role=s.role||"joiner",this.dataChannel=s.dataChannel||null,!this.messagesUI&&s.messagesUI&&(this.messagesUI=s.messagesUI),this.state="connected",this.dataChannel?this.setupFileTransport(this.dataChannel):this.role==="joiner"&&this.pc&&(this.pc.ondatachannel=r=>{this.dataChannel=r.channel,this.setupFileTransport(this.dataChannel)}),this.setupCancellationListener(this.roomId),this.setupMemberJoinedListener(this.roomId),this.setupMemberLeftListener(this.roomId),this.emitter.emit("answered",{roomId:this.roomId,role:this.role}),s)}catch(n){throw this.state="idle",this.emitter.emit("error",{phase:"answerCall",error:n}),this.emitCallFailed("answerCall",n),n}}setupFileTransport(e){if(!e)return;const n=()=>{try{const s=new EP(e);jt.setFileTransport(s),_e.setFileTransfer(s.fileTransfer),D("[CallController] File transport initialized")}catch(s){console.error("[CallController] Failed to setup file transport:",s)}};e.readyState==="open"?n():e.addEventListener("open",n,{once:!0})}async hangUp({emitCancel:e=!0,reason:n="user_hung_up"}={}){if(!this.isHangingUp){this.isHangingUp=!0;try{if(e&&this.roomId)try{await Z.cancelCall(this.roomId,he(),n)}catch(s){console.warn("CallController: cancelCall failed (non-fatal)",s)}await this.cleanupCall({reason:n}),this.emitter.emit("hangup",{roomId:this.roomId,reason:n})}catch(s){throw this.emitter.emit("error",{phase:"hangUp",error:s}),s}finally{this.isHangingUp=!1}}}isRemoteHangup(e){return e?["remote","cancelled","partner_disconnected","connection_failed"].some(s=>e.includes(s)):!1}emitCallFailed(e,n){this.emitter.emit("callFailed",{phase:e,error:n?.message||n?.error||n||"Unknown error"})}async cleanupCall({reason:e}={}){if(!this.isCleaningUp){this.isCleaningUp=!0;try{const n=this.roomId,s=this.partnerId;this.removeTrackedListeners();try{await Z.leaveRoom(he(),this.roomId)}catch{}try{if(this.pc){try{this.pc.close()}catch{}this.pc=null}}catch{}try{this.remoteVideoEl&&(this.remoteVideoEl.srcObject=null)}catch(r){console.warn("CallController: failed to clear remote video",r)}try{this.localVideoEl&&(this.localVideoEl.srcObject=null)}catch(r){console.warn("CallController: failed to clear local video",r)}try{const{cleanupLocalStream:r}=await rt(async()=>{const{cleanupLocalStream:i}=await Promise.resolve().then(()=>PN);return{cleanupLocalStream:i}},void 0);r()}catch(r){console.warn("CallController: failed to cleanup local stream",r)}try{const{resetLocalStreamInitFlag:r}=await rt(async()=>{const{resetLocalStreamInitFlag:i}=await Promise.resolve().then(()=>iL);return{resetLocalStreamInitFlag:i}},void 0);r()}catch{}this.isRemoteHangup(e)&&this.emitter.emit("remoteHangup",{roomId:n,partnerId:s,reason:e});try{jt.clearFileTransport(),_e.setFileTransfer(null)}catch(r){console.warn("CallController: failed to cleanup file transport",r)}if(this.messagesUI&&this.messagesUI.cleanup)try{this.messagesUI.cleanup()}catch(r){console.warn("CallController: failed to cleanup messages UI",r)}this.resetState(),this.emitter.emit("cleanup",{roomId:n,partnerId:s,reason:e})}catch(n){throw this.emitter.emit("error",{phase:"cleanupCall",error:n}),n}finally{this.isCleaningUp=!1}}}}const fe=new wP,fc={default:{echoCancellation:!0,noiseSuppression:!0,autoGainControl:!0},withVoiceIsolationIfSupported:{echoCancellation:!0,noiseSuppression:!0,autoGainControl:!0,voiceIsolation:!0,restrictOwnAudio:!0,googHighpassFilter:!0,googTypingNoiseDetection:!0,highpassFilter:!0,typingNoiseDetection:!0}};function Xm(){const t=navigator.mediaDevices.getSupportedConstraints();return["voiceIsolation","highpassFilter","typingNoiseDetection"].every(s=>t[s])?fc.withVoiceIsolationIfSupported:fc.default}const bP=()=>fc.default,CP={desktop:{landscape:{width:{ideal:1920},height:{ideal:1080},frameRate:{min:10,ideal:30},aspectRatio:{ideal:16/9}},portrait:{width:{ideal:1080},height:{ideal:1920},frameRate:{min:10,ideal:30},aspectRatio:{ideal:9/16}}},mobile:{portrait:{width:{ideal:1080},height:{ideal:1920},aspectRatio:{ideal:9/16},frameRate:{ideal:30}},landscape:{width:{ideal:1920},height:{ideal:1080},aspectRatio:{ideal:16/9},frameRate:{ideal:30}}}},SP=()=>window.screen?.orientation?.type?.includes("portrait")||window.orientation===0||window.orientation===180;function nu(t){const e=SP()?"portrait":"landscape",s=/Mobi|Android/i.test(navigator.userAgent)?"mobile":"desktop",r=CP[s][e];return{facingMode:t,...r}}function TP(){return!!(navigator.mediaDevices&&navigator.mediaDevices.enumerateDevices)}async function IP(){return TP()?(await navigator.mediaDevices.enumerateDevices()).filter(e=>e.kind==="videoinput"):[]}async function kP(){const t=await IP();let e=!1,n=!1;return t.forEach(s=>{const r=s.label.toLowerCase();(r.includes("front")||r.includes("user"))&&(e=!0),(r.includes("back")||r.includes("rear")||r.includes("environment"))&&(n=!0)}),e&&n}async function RP({localStream:t,localVideo:e,currentFacingMode:n,peerConnection:s=null}){if(!t||!e)return console.error("switchCamera: missing localStream or localVideo"),null;const r=n==="user"?"environment":"user";try{const i=await navigator.mediaDevices.getUserMedia({video:nu(r),audio:Xm()}),o=i.getVideoTracks()[0],a=i.getAudioTracks()[0],c=t.getVideoTracks()[0],l=c?c.enabled:!0,u=t.getAudioTracks()[0],d=u?!u.enabled:!1;if(o&&(o.enabled=l),a&&(a.enabled=!d),t.getTracks().forEach(h=>h.stop()),s){const h=s.getSenders().find(p=>p.track&&p.track.kind==="video");h&&await h.replaceTrack(o);const f=s.getSenders().find(p=>p.track&&p.track.kind==="audio");f&&a&&await f.replaceTrack(a)}return e.srcObject=new MediaStream([o].filter(Boolean)),{newStream:i,facingMode:r}}catch(i){return console.error("Failed to switch camera:",i),null}}let ga=!1,an=null,cn=null;function AP({getLocalStream:t,getFacingMode:e}){return an&&cn&&an.removeEventListener("change",cn),an=window.matchMedia("(orientation: portrait)"),cn=()=>{try{const n=typeof t=="function"?t():null,s=typeof e=="function"?e():"user";NP({localStream:n,currentFacingMode:s})}catch(n){console.error("Orientation handler failed:",n)}},an.addEventListener("change",cn),()=>{an&&cn&&an.removeEventListener("change",cn),an=null,cn=null}}async function NP({localStream:t,currentFacingMode:e}){if(!(ga||!t?.getVideoTracks()[0])){ga=!0;try{const n=t.getVideoTracks()[0],s=nu(e);D("Applying constraints:",s),await n.applyConstraints(s),D("Video constraints updated successfully")}catch(n){console.error("Failed to apply orientation constraints:",n)}finally{ga=!1}}}let pc=[];function PP(t,e){const n=e.querySelector("i");n.className=t?"fa fa-microphone-slash":"fa fa-microphone"}function LP({getLocalStream:t,getLocalVideo:e,getRemoteVideo:n,getPeerConnection:s=()=>null,setLocalStream:r=null,micBtn:i,cameraBtn:o,switchCameraBtn:a,mutePartnerBtn:c,fullscreenPartnerBtn:l,remotePipBtn:u}){i&&(i.onclick=()=>{const h=t();if(!h)return;const f=h.getAudioTracks()[0];f&&(f.enabled=!f.enabled,PP(!f.enabled,i))}),o&&(o.onclick=()=>{const h=t();if(!h)return;const f=h.getVideoTracks()[0];if(f){f.enabled=!f.enabled;const p=o.querySelector("i");p.className=f.enabled?"fa fa-video":"fa fa-video-slash"}});const d=AP({getLocalStream:t,getFacingMode:uc});pc.push(d),a&&(a.onclick=async()=>{const h=await RP({localStream:t(),localVideo:e(),currentFacingMode:uc(),peerConnection:s()||null});h?(Om(h.facingMode),console.log("Switched camera to facingMode:",h.facingMode),h.newStream&&typeof r=="function"&&r(h.newStream)):console.error("Camera switch failed.")},(async()=>await kP()?A(a):E(a))()),c&&(c.onclick=()=>{const h=n();if(!h)return;h.muted=!h.muted;const f=c.querySelector("i");f.className=h.muted?"fa fa-volume-mute":"fa fa-volume-up"}),l&&(l.onclick=()=>{const h=n();h.requestFullscreen?h.requestFullscreen():h.webkitRequestFullscreen&&h.webkitRequestFullscreen()}),u&&(u.onclick=async()=>{const h=n();if(h)try{document.pictureInPictureElement===h?await document.exitPictureInPicture():h.requestPictureInPicture&&await h.requestPictureInPicture()}catch(f){console.error("Picture-in-Picture failed:",f)}})}function OP(){pc.forEach(t=>t()),pc=[]}let ma=null,Dt=null,G=null,V=null,Nh=!1,si=!1,it=[],gc="",pe=-1,mc=[];const DP="AIzaSyBPUjW7ac277WIYTbN4M8dUomK39qRQjhA",MP="https://www.googleapis.com/youtube/v3";async function xP(){if(Nh||si)return!1;si=!0;const{initializeYouTubeElements:t}=await rt(async()=>{const{initializeYouTubeElements:o}=await Promise.resolve().then(()=>pN);return{initializeYouTubeElements:o}},void 0),e=await t();if(ma=e.searchContainer,Dt=e.searchBtn,G=e.searchQuery,V=e.searchResults,!ma||!Dt||!G||!V)return console.error("YouTube search elements not found in DOM"),si=!1,!1;const n=o=>/^https?:\/\//i.test(o),s=o=>{(V?.querySelectorAll(".search-result-item")||[]).forEach((c,l)=>{l===o?(c.classList.add("focused"),c.scrollIntoView({block:"nearest"})):c.classList.remove("focused")}),pe=o??-1};Dt.onclick=async()=>{const o=G.value.trim();if(qi(G)){A(G),G.focus();return}if(!o){pi(),E(G);return}if(Oh()&&o===gc)_c(it);else if(!n(o))await Ph(o);else{await lc({url:o}),E(V),G.value="",E(G),pe=-1;return}},ma.addEventListener("keydown",async o=>{const a=V.querySelectorAll(".search-result-item");if(a.length>0&&(o.key==="ArrowDown"||o.key==="ArrowUp")){if(o.key==="ArrowDown"){let c=pe+1;c>=a.length&&(c=0),s(c)}else if(o.key==="ArrowUp"){let c=pe-1;c<0&&(c=pe===-1?0:a.length-1),s(c)}return}if(o.key==="Enter"){if(a.length>0&&pe>=0){a[pe].click(),E(G),E(V),pe=-1;return}const c=G.value.trim();if(c)if(Oh()&&c===gc)_c(it);else if(!n(c))await Ph(c);else{await lc({url:c}),E(V),pe=-1,G.value="",E(G);return}}else o.key==="Escape"&&(UP()?pi():G.value?G.value="":E(G))}),G.addEventListener("input",()=>{G.value.trim()===""&&pi(),pe=-1});const r=Qi(G,()=>E(G),{ignore:[Dt],esc:!1});mc.push(r);const i=Qi(V,()=>E(V),{ignore:[Dt],esc:!1});return mc.push(i),si=!1,Nh=!0,!0}async function Ph(t){if(!Dt||!V){console.error("Search elements not initialized");return}it=[],gc=t,Dt.disabled=!0,V.innerHTML='<div class="search-loading">Searching YouTube...</div>',A(V);try{const e=await fetch(`${MP}/search?part=snippet&maxResults=10&q=${encodeURIComponent(t)}&type=video&key=${DP}`);if(!e.ok)throw e.status===403?new Error("YouTube API quota exceeded. Please try again later."):e.status===400?new Error("Invalid API key or request."):new Error(`YouTube API error: ${e.status}`);const n=await e.json();if(!n.items||n.items.length===0){Lh("No videos found"),it=[];return}it=n.items.map(s=>({id:s.id.videoId,title:s.snippet.title,thumbnail:s.snippet.thumbnails.medium.url,channel:s.snippet.channelTitle,url:`https://www.youtube.com/watch?v=${s.id.videoId}`})),_c(it)}catch(e){console.error("YouTube search failed:",e),Lh(e.message||"Search failed. Please try again.")}finally{Dt.disabled=!1}}function _c(t){if(!V){console.error("Search results element not initialized");return}if(!t||t.length===0){V.innerHTML='<div class="search-no-results">No results found</div>',it=[],pe=-1;return}V.innerHTML="",t.forEach(n=>{const s=document.createElement("div");s.className="search-result-item",s.innerHTML=`
      <img src="${n.thumbnail}" alt="${n.title}" class="result-thumbnail">
      <div class="search-result-info">
        <div class="search-result-title">${n.title}</div>
        <div class="search-result-channel">${n.channel}</div>
      </div>
    `,s.onclick=async()=>{if(await lc(n),E(V),pe=-1,!G){console.error("Search query element not initialized");return}G.value="",E(G)},V.appendChild(s)}),A(V),pe=0,V.querySelectorAll(".search-result-item").forEach((n,s)=>{s===pe?(n.classList.add("focused"),n.scrollIntoView({block:"nearest"})):n.classList.remove("focused")})}function Lh(t){if(it=[],pe=-1,!V){console.error("Search results element not initialized");return}V.innerHTML=`<div class="search-error">${t}</div>`,A(V)}function pi(){it=[],pe=-1,V&&(V.innerHTML="",E(V))}function FP(){pi(),mc.forEach(t=>t())}function UP(){return!qi(V)}function Oh(){return it.length>0}function $P({parent:t,manager:e=null,onClick:n=null,hideWhenAllRead:s=!1}={}){let r=e;const i=xl({initialProps:{unreadCount:0,isHidden:!0},template:`
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
    `,handlers:{handleClick:()=>{n?n():r&&r.toggleList()}},className:"notifications-toggle-container",parent:t});let o=i.querySelector(".notification-badge");return o&&(o.style.display="none"),i.onPropUpdated("unreadCount",a=>{const c=i.querySelector(".notification-badge");c&&(c.style.display=a>0?"flex":"none")}),i.show=()=>{i.isHidden=!1,i.style.display="block"},i.hide=()=>{i.isHidden=!0,i.style.display="none"},i.setUnread=a=>{i.unreadCount=a,a>0?i.show():s&&i.hide()},i.setManager=a=>{r=a},i.hide(),i}class BP{constructor(){this.notifications=new Map,this.toggle=null,this.container=null,this.clickOutsideCleanup=null}setToggle(e){this.toggle=e,this.toggle.setManager&&this.toggle.setManager(this),this.createContainer(),this.updateToggle()}createContainer(){this.container||(this.container=document.createElement("div"),this.container.className="notifications-list-container",this.container.style.display="none",document.body.appendChild(this.container))}showList(){this.container&&(this.container.style.display="flex",this.setupClickOutside())}hideList(){this.container&&(this.container.style.display="none",this.cleanupClickOutside())}setupClickOutside(){this.clickOutsideCleanup||(this.clickOutsideCleanup=Qi(this.container,()=>this.hideList(),{ignore:this.toggle?[this.toggle]:[],esc:!0}))}cleanupClickOutside(){this.clickOutsideCleanup&&(this.clickOutsideCleanup(),this.clickOutsideCleanup=null)}toggleList(){this.container&&(this.container.style.display==="none"?this.showList():this.hideList())}isListVisible(){return this.container&&this.container.style.display!=="none"}add(e,n){this.notifications.has(e)&&this.remove(e),this.container||this.createContainer(),n.parentElement===document.body&&n.remove(),this.container.prepend(n),this.notifications.set(e,n),this.updateToggle(),n._originalDispose||(n._originalDispose=n.dispose);const s=n._originalDispose;n.dispose=()=>{s&&s.call(n),n.parentElement&&n.remove(),this.notifications.delete(e),this.updateToggle(),n.dispose=s,delete n._originalDispose}}remove(e){const n=this.notifications.get(e);n&&(n.dispose&&n.dispose(),this.notifications.delete(e),this.updateToggle())}getCount(){return this.notifications.size}has(e){return this.notifications.has(e)}clear(){this.notifications.forEach(e=>{e.dispose&&e.dispose()}),this.notifications.clear(),this.updateToggle()}updateToggle(){this.toggle&&this.toggle.setUnread(this.getCount())}}const HP=new BP;const VP=async()=>{if(xm())return console.debug("Reusing existing local MediaStream."),Mo();const t=nu("user"),e=Xm();try{const n=await navigator.mediaDevices.getUserMedia({video:t,audio:e});return Ki(n),n}catch(n){if(n.name==="OverconstrainedError"){console.warn(`❌ Constraint failed on property: ${n.constraint}, falling back to basic constraints`);const s=bP(),r=await navigator.mediaDevices.getUserMedia({video:!0,audio:s});return Ki(r),r}throw n}};async function WP(t){const e=await VP(),n=new MediaStream(e.getVideoTracks());return t.srcObject=n,!0}function jP(t,e,n){return t.ontrack=s=>{D(`REMOTE TRACK RECEIVED: ${s.track.kind}`);const r=Do()?Gl():null;let i;s.streams&&s.streams[0]&&s.streams[0]instanceof MediaStream?i=s.streams[0]:(console.warn("No stream in track event, using fallback track handling"),r?(r.addTrack(s.track),i=r):i=new MediaStream([s.track])),Dm(i),e.srcObject=i,r!==i||D(`Added ${s.track.kind} track to existing remote stream`);try{const o=document.getElementById("remote-video-box")||e.parentElement;o&&(o.classList?.remove("hidden"),e.classList?.remove("hidden"),o.style.visibility="visible",o.style.opacity="1",o.style.position="",o.style.left="",o.style.top="",e.style.visibility="visible",e.style.opacity="1")}catch(o){console.warn("Visibility override failed:",o)}},!0}let Dh=!1;function zP(t,e){const n=document.createElement("dialog");n.className="copy-link-dialog";const s=document.createElement("div");s.className="copy-link-dialog__content";const r=document.createElement("h2");r.className="copy-link-dialog__title",r.textContent=e.title,s.appendChild(r);const i=document.createElement("div");i.className="copy-link-dialog__input-container";const o=document.createElement("input");o.type="text",o.className="copy-link-dialog__input",o.value=t,o.readOnly=!0,o.setAttribute("aria-label","Link to copy"),i.appendChild(o),s.appendChild(i);const a=document.createElement("div");a.className="copy-link-dialog__buttons";const c=document.createElement("button");c.className="copy-link-dialog__button copy-link-dialog__button--primary",c.textContent=e.buttonText,c.autofocus=!0;const l=document.createElement("button");l.className="copy-link-dialog__button copy-link-dialog__button--secondary",l.textContent=e.cancelText,a.appendChild(c),a.appendChild(l),s.appendChild(a);const u=document.createElement("p");return u.className="copy-link-dialog__feedback",u.setAttribute("aria-live","polite"),s.appendChild(u),n.appendChild(s),{dialog:n,input:o,copyButton:c,cancelButton:l,feedback:u}}function qP(t,e={}){const n={title:"Share this link",buttonText:"Copy",cancelText:"Cancel",successMessage:"✓ Copied to clipboard!",errorMessage:"Failed to copy. Click the link to select it manually.",autoClose:!0,autoCloseDelay:1200,onCopy:null,onError:null,onCancel:null,onClose:null,...e};GP();const{dialog:s,input:r,copyButton:i,cancelButton:o,feedback:a}=zP(t,n);YP(s);let c=!1;const l=async()=>{await KP(t,r)?(c=!0,a.textContent=n.successMessage,a.classList.remove("copy-link-dialog__feedback--error"),n.onCopy&&n.onCopy(t),n.autoClose&&setTimeout(()=>{s.close()},n.autoCloseDelay)):(a.textContent=n.errorMessage,a.classList.add("copy-link-dialog__feedback--error"),r.readOnly=!1,r.addEventListener("click",()=>{r.select()}),n.onError&&n.onError())};return i.addEventListener("click",l),o.addEventListener("click",()=>{n.onCancel&&n.onCancel(),s.close()}),s.addEventListener("keydown",u=>{u.key==="Enter"&&!u.shiftKey&&!u.ctrlKey&&!u.altKey&&!u.metaKey&&(u.preventDefault(),l())}),s.addEventListener("close",()=>{!c&&n.onCancel&&n.onCancel(),n.onClose&&n.onClose(),setTimeout(()=>{s.remove()},300)}),document.body.appendChild(s),s.showModal(),s}function GP(){if(Dh)return;const t=document.createElement("style");t.textContent=`
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
  `,document.head.appendChild(t),Dh=!0}function YP(t){t.showModal||(t.showModal=function(){this.setAttribute("open",""),this.style.display="block",this.style.position="fixed",this.style.top="50%",this.style.left="50%",this.style.transform="translate(-50%, -50%)";const e=getComputedStyle(document.documentElement).getPropertyValue("--z-ui-overlay").trim();this.style.zIndex=e||"1000"},t.close=function(){this.removeAttribute("open"),this.style.display="none"})}async function KP(t,e=null){if(navigator.clipboard&&navigator.clipboard.writeText)try{return await navigator.clipboard.writeText(t),!0}catch(n){return console.warn("Clipboard API failed, using fallback:",n),!1}if(!e)return!1;try{return e.select(),e.setSelectionRange(0,99999),document.execCommand("copy")}catch(n){return console.error("Fallback copy failed:",n),!1}}function JP(){const t=window.matchMedia&&window.matchMedia("(display-mode: standalone)").matches||navigator.standalone===!0,e=/iphone|ipad|ipod/i.test(navigator.userAgent||"");if(!t||!e||!window.location.hostname.includes("github.io"))return;const s="https://vidu-aae11.web.app",r=s.replace(/\/$/,"");let i;try{i=new URL(r).hostname}catch(l){console.error("[PWA Redirect] Invalid VITE_APP_HOSTING_URL:",s,l);return}if(window.location.hostname===i)return;const o="/HangVidU/";let a=window.location.pathname;a.startsWith(o)?a="/"+a.slice(o.length):a==="/HangVidU"&&(a="/");let c;try{c=new URL(a+window.location.search+window.location.hash,r).toString()}catch(l){console.error("[PWA Redirect] Failed to construct target URL:",l);return}console.log("[PWA Redirect] iOS standalone PWA on gh-pages → redirecting to Firebase Hosting:",c),window.location.replace(c)}xA(!0);y().disable();let su=[];async function XP(){QP();const t=Cm(),n=["localVideoEl","remoteVideoEl","localBoxEl","remoteBoxEl","chatControls","lobbyDiv","titleAuthBar"].filter(s=>!t[s]);if(n.length>0)return console.error("Critical elements missing:",n),!1;try{{const{setupPWA:i}=await rt(async()=>{const{setupPWA:o}=await import("./PWA--9LbAhkk.js");return{setupPWA:o}},[]);await i()}xP(),tL(),await _m;const s=hN(Lo);s&&su.push(s.dispose);const r=document.querySelector(".top-right-menu");if(r){const i=$P({parent:r,hideWhenAllRead:!0});HP.setToggle(i)}return!0}catch(s){return console.error("Initialization error:",s),!1}}let yc=!1;function Qm(){yc=!1}async function Zm(){yc||(yc=!0,await WP(Re),LP({getLocalStream:Mo,getLocalVideo:()=>Re,getRemoteVideo:()=>ne,getPeerConnection:()=>fe.getState().pc,setLocalStream:Ki,micBtn:Os,cameraBtn:Ds,switchCameraBtn:Ls,mutePartnerBtn:Qe,fullscreenPartnerBtn:Oo,remotePipBtn:Qt}),Re&&(Re.addEventListener("enterpictureinpicture",()=>te&&E(te)),Re.addEventListener("leavepictureinpicture",()=>{te&&!(gs()&&Kl())&&A(te)})))}function QP(){E(Y),E(te),E(Ie),E(Me)}function e_(t){(t?.name==="NotAllowedError"||t?.name==="PermissionDeniedError")&&alert('Camera/microphone access is required for video calls. Please click "Allow" when prompted, or check your browser settings.'),Qm()}function gi(t=null){return{localStream:Mo(),localVideoEl:Re,remoteVideoEl:ne,mutePartnerBtn:Qe,setupRemoteStream:jP,setupWatchSync:vN,targetRoomId:t}}function mi(t,e=!1){return t.success?(e&&t.roomLink&&qP(t.roomLink,{onCopy:()=>D("Link ready! Share with your partner."),onCancel:()=>D("Link ready! Use the copy button to use it, or create a new one.")}),!0):!1}async function jr(t,{forceInitiator:e=!1}={}){try{await Zm()}catch(i){return console.error("Failed to initialize local media stream:",i),e_(i),!1}const n=Date.now();if(e){y().logRoomCreation(t,!0,{creationTime:n,listenerAttachTime:n,timeDiff:0},{trigger:"force_initiator",reason:"calling_saved_contact"});const i=await fe.createCall(gi(t));return mi(i,!1)}let s=await Z.checkRoomStatus(t);if(s.exists&&!s.hasMembers){let o=0;for(;o<3&&!s.hasMembers;)await new Promise(a=>setTimeout(a,250*(o+1))),s=await Z.checkRoomStatus(t),o++}if(!s.exists||!s.hasMembers){y().logRoomCreation(t,!0,{creationTime:n,listenerAttachTime:n,timeDiff:0},{trigger:"room_empty_or_nonexistent",roomExists:s.exists,memberCount:s.memberCount||0});const i=await fe.createCall(gi(t));return mi(i,!0)}y().log("ROOM","JOINING_EXISTING",{roomId:t,memberCount:s.memberCount,roomExists:s.exists});const r=await fe.answerCall({roomId:t,...gi()});return mi(r,!1)}const Ae=new Set,t_=new Map;function Mh(t){t&&(ko(t),Ae.delete(t),t_.delete(t),y().log("LISTENER","INCOMING_CLEANUP",{roomId:t,remainingListeners:Ae.size}))}function ZP(){D(`[LISTENER] Removing all incoming listeners (${Ae.size} rooms)`);const t=Array.from(Ae);t.forEach(e=>{ko(e)}),Ae.clear(),t_.clear(),y().log("LISTENER","ALL_INCOMING_CLEANUP",{roomsCleared:t.length})}async function eL(t){const e=Date.now(),n=e+1440*60*1e3,s=F();if(s){const r=bl(s,t);await ue(r,{roomId:t,savedAt:e,expiresAt:n});return}try{const r=localStorage.getItem("recentCalls")||"{}",i=JSON.parse(r);i[t]={roomId:t,savedAt:e,expiresAt:n},localStorage.setItem("recentCalls",JSON.stringify(i))}catch(r){console.warn("Failed to save recent call to localStorage",r)}}async function _a(t){const e=F();if(e){try{await at(bl(e,t))}catch(n){console.warn("Failed to remove recent call from RTDB",n)}return}try{const n=localStorage.getItem("recentCalls")||"{}",s=JSON.parse(n);s[t]&&(delete s[t],localStorage.setItem("recentCalls",JSON.stringify(s)))}catch(n){console.warn("Failed to remove recent call from localStorage",n)}}function ms(t){t&&(Ae.has(t)&&(Ae.delete(t),ko(t)),D(`[LISTENER] Attaching listener for room: ${t} (total: ${Ae.size+1})`),Ae.add(t),y().logListenerAttachment(t,"member_join",Ae.size,{action:"incoming_call_listener_attached"}),Z.onMemberJoined(t,async e=>{const n=e.key,s=e.val?e.val():null,r=he();if(n&&n!==r){y().logMemberJoinEvent(t,n,s||{},{detectedBy:"incoming_call_listener",currentUserId:r});const i=s&&typeof s.joinedAt=="number"?s.joinedAt:null,o=2e4;let a=!1,c="none",l=0;if(i&&(l=Date.now()-i,a=l<o,c="joinedAt"),!a){const j=await Bm(n,t),v=await Hm(t);a=j||v,c=j?"outgoingState":v?"roomCreatedAt":"failed"}const u={isFresh:a,method:c,age:l,reason:a?"call_is_fresh":"call_is_stale"};if(y().logIncomingCallEvent(n,t,u,{memberData:s,joinedAt:i,CALL_FRESH_MS:o}),!a){y().logNotificationDecision("REJECT","stale_call",t,{age:l,validationMethod:c,joiningUserId:n});return}let d;try{d=await Z.getRoomData(t)}catch{return}if(!d||typeof d!="object")return;const h=!!d.offer,f=!!d.answer,p=d.createdBy;if(!h||f||p===r)return;const _=fe.getState();if(!!_.pc&&_.pc.connectionState==="connected"){y().logNotificationDecision("REJECT","already_in_call",t,{joiningUserId:n,currentCallState:_.pc?.connectionState});return}y().logNotificationDecision("SHOW","fresh_call_detected",t,{joiningUserId:n,freshnessResult:u});const R=await YN(t,n);ts.playIncoming(),Th.startCallIndicators(R);let W=!1;try{W=await xo(`Incoming call from ${R}.

Accept?`)}finally{ts.stop(),Th.stopCallIndicators()}if(W)Mh(t),y().logNotificationDecision("ACCEPT","user_accepted",t,{joiningUserId:n}),jr(t).catch(j=>{console.warn("Failed to answer incoming call:",j),y().logFirebaseOperation("join_room_on_accept",!1,j,{roomId:t,joiningUserId:n})});else{y().logNotificationDecision("REJECT","user_rejected",t,{joiningUserId:n});try{await Z.rejectCall(t,he(),"user_rejected")}catch(j){console.warn("Failed to signal rejection via RTDB:",j)}await _a(t).catch(j=>{console.warn("Failed to remove recent call on rejection:",j)})}}}),Z.onCallCancelled(t,async e=>{if(e&&typeof e.val=="function"&&e.val()){try{const{dismissActiveConfirmDialog:s}=await rt(async()=>{const{dismissActiveConfirmDialog:r}=await Promise.resolve().then(()=>BN);return{dismissActiveConfirmDialog:r}},void 0);typeof s=="function"&&s()}catch{}await _a(t).catch(()=>{})}}),Z.onMemberLeft(t,async e=>{const n=e.key,s=he();if(!(!n||n===s))try{(await Z.checkRoomStatus(t)).hasMembers||(await _a(t),Mh(t),D(`Removed saved recent call and listeners for room ${t} because it is now empty`))}catch(r){console.warn("Failed to evaluate room status on member leave",r)}}))}async function xh(){const t=Date.now();y().log("LISTENER","STARTUP_BEGIN",{timestamp:t,currentListenerCount:Ae.size});try{if(typeof window<"u"){const{getCurrentUserAsync:n}=await rt(async()=>{const{getCurrentUserAsync:s}=await Promise.resolve().then(()=>ZA);return{getCurrentUserAsync:s}},void 0);await n()}}catch{}const e=F();if(y().log("LISTENER","AUTH_STATE_DETERMINED",{isLoggedIn:!!e,userId:e||"guest"}),e){const n=Fk(e);try{const s=await Ye(n),r=s.exists()?s.val():null,i=new Set;if(r)for(const[o,a]of Object.entries(r)){if(!a||a.expiresAt&&a.expiresAt<Date.now()){await at(bl(e,o)).catch(()=>{});continue}i.add(o)}try{const o=await br();Object.entries(o||{}).forEach(([a,c])=>{if(c?.roomId)i.add(c.roomId);else if(a&&e)try{const l=Zi(e,a);i.add(l)}catch{}})}catch{}i.forEach(o=>ms(o)),y().log("LISTENER","STARTUP_COMPLETE",{storage:"rtdb",roomsToListen:Array.from(i),totalListeners:Ae.size,duration:Date.now()-t})}catch(s){console.warn("Failed to read recent calls from RTDB",s),y().logFirebaseOperation("read_recent_calls",!1,s,{storage:"rtdb",userId:e})}return}try{const n=localStorage.getItem("recentCalls")||"{}",s=JSON.parse(n),r={},i=new Set;for(const[o,a]of Object.entries(s||{}))!a||a.expiresAt&&a.expiresAt<Date.now()||(r[o]=a,i.add(o));try{const o=await br(),a=he();Object.entries(o||{}).forEach(([c,l])=>{if(l?.roomId)i.add(l.roomId);else if(c&&a)try{const u=Zi(a,c);i.add(u)}catch{}})}catch{}i.forEach(o=>ms(o)),localStorage.setItem("recentCalls",JSON.stringify(r)),y().log("LISTENER","STARTUP_COMPLETE",{storage:"localStorage",roomsToListen:Array.from(i),totalListeners:Ae.size,duration:Date.now()-t,expiredRoomsRemoved:Object.keys(s||{}).length-i.size})}catch(n){console.warn("Failed to read recent calls from localStorage",n),y().logFirebaseOperation("read_recent_calls",!1,n,{storage:"localStorage"})}}function ya(){return q&&Ie&&!Ie.classList.contains("hidden")&&q.src&&q.src.trim()!==""}let Fh=!1;function tL(){if(Fh)return;const t=()=>{const e=document.activeElement;return e&&(e.tagName==="INPUT"||e.tagName==="TEXTAREA"||e.isContentEditable)};document.addEventListener("keydown",e=>{t()||(e.key==="w"||e.key==="W")&&(console.log("=== W KEY PRESSED ==="),console.log("lastWatched:",fn()),console.log("isYTVisible():",la()),console.log("isSharedVideoVisible():",ya()),console.log("isWatchModeActive():",gs()),fn()==="yt"?la()?(Gi(),ir()):(km(),dc()):fn()==="url"&&(ya()?(E(Ie),ir()):(A(Ie),dc()))),e.key==="Escape"&&gs()&&(fn()==="yt"&&la()?(Vr(),Gi()):fn()==="url"&&ya()&&(q.pause(),E(Ie)),ir())}),Fh=!0}const n_=async()=>{try{await Zm();const t=await fe.createCall(gi());mi(t,!0)}catch(t){console.error("Failed to start call:",t),e_(t)}};$e.onclick=n_;tn.onclick=n_;Xn&&(navigator.clipboard&&navigator.clipboard.readText?Xn.onclick=async()=>{try{const t=await navigator.clipboard.readText(),e=nL(t);if(!e){alert("No valid room link found in clipboard.");return}await jr(e)}catch(t){t.name==="NotAllowedError"?alert("Clipboard access denied. Please allow clipboard access or paste the link manually."):(console.error("Paste & Join failed:",t),alert("Failed to read clipboard. Please try again."))}}:(Xn.style.display="none",console.warn("Paste & Join button hidden: Clipboard API not available in this context (requires HTTPS).")));vr&&(vr.onclick=async()=>{await iP()});Pn&&(Pn.onclick=()=>{fn()==="yt"?(Vr(),Gi()):fn()==="url"&&(q.pause(),E(Ie)),ir()});Xe.onclick=async()=>{console.debug("Hanging up..."),await fe.hangUp({emitCancel:!0,reason:"user_hung_up"})};function nL(t){let e=t.trim();if(!e)return"";try{const n=new URL(e,window.location.origin),s=n.searchParams.get("room");if(s)return s;const r=n.hash.match(/room=([^&]+)/);return r?decodeURIComponent(r[1]):n.pathname.replace(/^\//,"")||e}catch{return e}}async function sL(){const e=new URLSearchParams(window.location.search).get("room");if(!e)return!1;const n=await jr(e);return n||(Po(),$m()),n}function Uh(){tP(async(t,e)=>{if(await xo(`${e.fromName||"Someone"} wants to connect.

Accept contact invitation?`))try{await nP(t,e),console.log("[INVITATIONS] Contact added:",e.fromName),await Ln(Ue).catch(()=>{}),alert(`Added ${e.fromName} to your contacts!`)}catch(s){console.error("[INVITATIONS] Failed to accept invite:",s),alert("Failed to add contact. Please try again.")}else try{await sP(t),console.log("[INVITATIONS] Invite declined")}catch(s){console.error("[INVITATIONS] Failed to decline invite:",s)}}),rP(async(t,e)=>{console.log("[INVITATIONS] Your invite was accepted by:",e.acceptedByName),await Ln(Ue).catch(()=>{}),alert(`${e.acceptedByName} accepted your invitation!`)})}JP();window.onload=async()=>{if(!await XP()){$e.disabled=!0,console.error("Initialization failed. Cannot start chat.");return}await xh().catch(r=>console.warn("Failed to start saved-room listeners",r)),Ln(Ue).catch(r=>{console.warn("Failed to render contacts list:",r)});let e=null;const n=Ml(async({isLoggedIn:r,user:i})=>{try{const o=e===null,a=e===!0&&!r,c=e===!1&&r;e=r,await Ln(Ue),a?(D("[AUTH] User logged out - cleaning up messaging and listeners"),_e.reset(),jt.closeAllSessions(),ZP(),hc()):c?(D("[AUTH] User logged in - re-attaching incoming listeners"),await xh().catch(l=>console.warn("Failed to re-attach saved-room listeners on login",l)),Uh()):o&&r&&(D("[AUTH] Initial load with logged-in user"),Uh())}catch(o){console.warn("Failed to handle auth change:",o)}});su.push(()=>{try{typeof n=="function"&&n()}catch{}}),await sL()};window.addEventListener("beforeunload",async t=>{const e=fe.getState();if(e.pc&&e.pc.connectionState==="connected")return t.preventDefault(),t.returnValue="You are in an active call. Are you sure you want to leave?",t.returnValue;await rL()});fe.on("memberJoined",({memberId:t,roomId:e})=>{console.debug("CallController memberJoined event",{memberId:t,roomId:e}),fe.setPartnerId(t),_e.showMessagesToggle(),Xl(t,t),Yl(),Jl().catch(n=>console.warn("Failed to clear calling state:",n)),eL(e).catch(n=>console.warn("Failed to save recent call:",n))});fe.on("memberLeft",({memberId:t})=>{console.info("Partner has left the call")});fe.on("cleanup",({roomId:t,partnerId:e,reason:n})=>{vn(),Mm(),$m(),Po();const s=fe.getState();s.messagesUI&&typeof s.messagesUI.cleanup=="function"&&(s.messagesUI.cleanup(),s.messagesUI=null),e&&t&&setTimeout(()=>{KN(e,t,Ue).catch(r=>{console.warn("Failed to save contact after cleanup:",r)})},500)});async function rL(){await fe.hangUp({emitCancel:!0,reason:"page_unload"}),OP(),Dk(),document.pictureInPictureElement&&document.exitPictureInPicture().catch(e=>console.error(e));const t=fe.getState();t.messagesUI&&t.messagesUI.cleanup&&t.messagesUI.cleanup(),window.history.replaceState({},document.title,window.location.pathname),q.src="",Fm(),Re&&Re.srcObject&&(Re.srcObject=null),ne&&ne.srcObject&&(ne.srcObject=null),ir(),Po(),EN("none"),Wl(),Im(!1),FP(),su.forEach(e=>e())}const iL=Object.freeze(Object.defineProperty({__proto__:null,joinOrCreateRoomWithId:jr,listenForIncomingOnRoom:ms,resetLocalStreamInitFlag:Qm},Symbol.toStringTag,{value:"Module"}));export{rt as _,xl as c,D as d,E as h,oL as i,HP as n,A as s};
