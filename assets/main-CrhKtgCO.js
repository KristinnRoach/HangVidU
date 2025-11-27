(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))r(i);new MutationObserver(i=>{for(const s of i)if(s.type==="childList")for(const o of s.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&r(o)}).observe(document,{childList:!0,subtree:!0});function n(i){const s={};return i.integrity&&(s.integrity=i.integrity),i.referrerPolicy&&(s.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?s.credentials="include":i.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function r(i){if(i.ep)return;i.ep=!0;const s=n(i);fetch(i.href,s)}})();const Zg="modulepreload",em=function(t){return"/HangVidU/"+t},wl={},Ze=function(e,n,r){let i=Promise.resolve();if(n&&n.length>0){let c=function(l){return Promise.all(l.map(u=>Promise.resolve(u).then(d=>({status:"fulfilled",value:d}),d=>({status:"rejected",reason:d}))))};document.getElementsByTagName("link");const o=document.querySelector("meta[property=csp-nonce]"),a=o?.nonce||o?.getAttribute("nonce");i=c(n.map(l=>{if(l=em(l),l in wl)return;wl[l]=!0;const u=l.endsWith(".css"),d=u?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${l}"]${d}`))return;const h=document.createElement("link");if(h.rel=u?"stylesheet":Zg,u||(h.as="script"),h.crossOrigin="",h.href=l,a&&h.setAttribute("nonce",a),document.head.appendChild(h),u)return new Promise((f,p)=>{h.addEventListener("load",f),h.addEventListener("error",()=>p(new Error(`Unable to preload CSS for ${l}`)))})}))}function s(o){const a=new Event("vite:preloadError",{cancelable:!0});if(a.payload=o,window.dispatchEvent(a),!a.defaultPrevented)throw o}return i.then(o=>{for(const a of o||[])a.status==="rejected"&&s(a.reason);return e().catch(s)})},C=typeof __SENTRY_DEBUG__>"u"||__SENTRY_DEBUG__,D=globalThis,en="10.26.0";function vs(){return ws(D),D}function ws(t){const e=t.__SENTRY__=t.__SENTRY__||{};return e.version=e.version||en,e[en]=e[en]||{}}function qn(t,e,n=D){const r=n.__SENTRY__=n.__SENTRY__||{},i=r[en]=r[en]||{};return i[t]||(i[t]=e())}const tm=["debug","info","warn","error","log","assert","trace"],nm="Sentry Logger ",Hi={};function Yn(t){if(!("console"in D))return t();const e=D.console,n={},r=Object.keys(Hi);r.forEach(i=>{const s=Hi[i];n[i]=e[i],e[i]=s});try{return t()}finally{r.forEach(i=>{e[i]=n[i]})}}function rm(){Da().enabled=!0}function im(){Da().enabled=!1}function Kd(){return Da().enabled}function sm(...t){Oa("log",...t)}function om(...t){Oa("warn",...t)}function am(...t){Oa("error",...t)}function Oa(t,...e){C&&Kd()&&Yn(()=>{D.console[t](`${nm}[${t}]:`,...e)})}function Da(){return C?qn("loggerSettings",()=>({enabled:!1})):{enabled:!1}}const b={enable:rm,disable:im,isEnabled:Kd,log:sm,warn:om,error:am},Jd=50,rn="?",bl=/\(error: (.*)\)/,Sl=/captureMessage|captureException/;function Xd(...t){const e=t.sort((n,r)=>n[0]-r[0]).map(n=>n[1]);return(n,r=0,i=0)=>{const s=[],o=n.split(`
`);for(let a=r;a<o.length;a++){let c=o[a];c.length>1024&&(c=c.slice(0,1024));const l=bl.test(c)?c.replace(bl,"$1"):c;if(!l.match(/\S*Error: /)){for(const u of e){const d=u(l);if(d){s.push(d);break}}if(s.length>=Jd+i)break}}return lm(s.slice(i))}}function cm(t){return Array.isArray(t)?Xd(...t):t}function lm(t){if(!t.length)return[];const e=Array.from(t);return/sentryWrapped/.test(pi(e).function||"")&&e.pop(),e.reverse(),Sl.test(pi(e).function||"")&&(e.pop(),Sl.test(pi(e).function||"")&&e.pop()),e.slice(0,Jd).map(n=>({...n,filename:n.filename||pi(e).filename,function:n.function||rn}))}function pi(t){return t[t.length-1]||{}}const to="<anonymous>";function Dt(t){try{return!t||typeof t!="function"?to:t.name||to}catch{return to}}function Cl(t){const e=t.exception;if(e){const n=[];try{return e.values.forEach(r=>{r.stacktrace.frames&&n.push(...r.stacktrace.frames)}),n}catch{return}}}function Qd(t){return"__v_isVNode"in t&&t.__v_isVNode?"[VueVNode]":"[VueViewModel]"}const Ii={},Tl={};function hn(t,e){Ii[t]=Ii[t]||[],Ii[t].push(e)}function fn(t,e){if(!Tl[t]){Tl[t]=!0;try{e()}catch(n){C&&b.error(`Error while instrumenting ${t}`,n)}}}function Ue(t,e){const n=t&&Ii[t];if(n)for(const r of n)try{r(e)}catch(i){C&&b.error(`Error while triggering instrumentation handler.
Type: ${t}
Name: ${Dt(r)}
Error:`,i)}}let no=null;function um(t){const e="error";hn(e,t),fn(e,dm)}function dm(){no=D.onerror,D.onerror=function(t,e,n,r,i){return Ue("error",{column:r,error:i,line:n,msg:t,url:e}),no?no.apply(this,arguments):!1},D.onerror.__SENTRY_INSTRUMENTED__=!0}let ro=null;function hm(t){const e="unhandledrejection";hn(e,t),fn(e,fm)}function fm(){ro=D.onunhandledrejection,D.onunhandledrejection=function(t){return Ue("unhandledrejection",t),ro?ro.apply(this,arguments):!0},D.onunhandledrejection.__SENTRY_INSTRUMENTED__=!0}const Zd=Object.prototype.toString;function Ma(t){switch(Zd.call(t)){case"[object Error]":case"[object Exception]":case"[object DOMException]":case"[object WebAssembly.Exception]":return!0;default:return Mt(t,Error)}}function Kn(t,e){return Zd.call(t)===`[object ${e}]`}function eh(t){return Kn(t,"ErrorEvent")}function Il(t){return Kn(t,"DOMError")}function pm(t){return Kn(t,"DOMException")}function it(t){return Kn(t,"String")}function xa(t){return typeof t=="object"&&t!==null&&"__sentry_template_string__"in t&&"__sentry_template_values__"in t}function bs(t){return t===null||xa(t)||typeof t!="object"&&typeof t!="function"}function Or(t){return Kn(t,"Object")}function Ss(t){return typeof Event<"u"&&Mt(t,Event)}function gm(t){return typeof Element<"u"&&Mt(t,Element)}function mm(t){return Kn(t,"RegExp")}function Jr(t){return!!(t?.then&&typeof t.then=="function")}function _m(t){return Or(t)&&"nativeEvent"in t&&"preventDefault"in t&&"stopPropagation"in t}function Mt(t,e){try{return t instanceof e}catch{return!1}}function th(t){return!!(typeof t=="object"&&t!==null&&(t.__isVue||t._isVue||t.__v_isVNode))}function ym(t){return typeof Request<"u"&&Mt(t,Request)}const Fa=D,Em=80;function nh(t,e={}){if(!t)return"<unknown>";try{let n=t;const r=5,i=[];let s=0,o=0;const a=" > ",c=a.length;let l;const u=Array.isArray(e)?e:e.keyAttrs,d=!Array.isArray(e)&&e.maxStringLength||Em;for(;n&&s++<r&&(l=vm(n,u),!(l==="html"||s>1&&o+i.length*c+l.length>=d));)i.push(l),o+=l.length,n=n.parentNode;return i.reverse().join(a)}catch{return"<unknown>"}}function vm(t,e){const n=t,r=[];if(!n?.tagName)return"";if(Fa.HTMLElement&&n instanceof HTMLElement&&n.dataset){if(n.dataset.sentryComponent)return n.dataset.sentryComponent;if(n.dataset.sentryElement)return n.dataset.sentryElement}r.push(n.tagName.toLowerCase());const i=e?.length?e.filter(o=>n.getAttribute(o)).map(o=>[o,n.getAttribute(o)]):null;if(i?.length)i.forEach(o=>{r.push(`[${o[0]}="${o[1]}"]`)});else{n.id&&r.push(`#${n.id}`);const o=n.className;if(o&&it(o)){const a=o.split(/\s+/);for(const c of a)r.push(`.${c}`)}}const s=["aria-label","type","name","title","alt"];for(const o of s){const a=n.getAttribute(o);a&&r.push(`[${o}="${a}"]`)}return r.join("")}function Ua(){try{return Fa.document.location.href}catch{return""}}function wm(t){if(!Fa.HTMLElement)return null;let e=t;const n=5;for(let r=0;r<n;r++){if(!e)return null;if(e instanceof HTMLElement){if(e.dataset.sentryComponent)return e.dataset.sentryComponent;if(e.dataset.sentryElement)return e.dataset.sentryElement}e=e.parentNode}return null}function we(t,e,n){if(!(e in t))return;const r=t[e];if(typeof r!="function")return;const i=n(r);typeof i=="function"&&rh(i,r);try{t[e]=i}catch{C&&b.log(`Failed to replace method "${e}" in object`,t)}}function sn(t,e,n){try{Object.defineProperty(t,e,{value:n,writable:!0,configurable:!0})}catch{C&&b.log(`Failed to add non-enumerable property "${e}" to object`,t)}}function rh(t,e){try{const n=e.prototype||{};t.prototype=e.prototype=n,sn(t,"__sentry_original__",e)}catch{}}function $a(t){return t.__sentry_original__}function ih(t){if(Ma(t))return{message:t.message,name:t.name,stack:t.stack,...Rl(t)};if(Ss(t)){const e={type:t.type,target:kl(t.target),currentTarget:kl(t.currentTarget),...Rl(t)};return typeof CustomEvent<"u"&&Mt(t,CustomEvent)&&(e.detail=t.detail),e}else return t}function kl(t){try{return gm(t)?nh(t):Object.prototype.toString.call(t)}catch{return"<unknown>"}}function Rl(t){if(typeof t=="object"&&t!==null){const e={};for(const n in t)Object.prototype.hasOwnProperty.call(t,n)&&(e[n]=t[n]);return e}else return{}}function bm(t){const e=Object.keys(ih(t));return e.sort(),e[0]?e.join(", "):"[object has no keys]"}function sh(t,e=0){return typeof t!="string"||e===0||t.length<=e?t:`${t.slice(0,e)}...`}function Al(t,e){if(!Array.isArray(t))return"";const n=[];for(let r=0;r<t.length;r++){const i=t[r];try{th(i)?n.push(Qd(i)):n.push(String(i))}catch{n.push("[value cannot be serialized]")}}return n.join(e)}function ki(t,e,n=!1){return it(t)?mm(e)?e.test(t):it(e)?n?t===e:t.includes(e):!1:!1}function Cs(t,e=[],n=!1){return e.some(r=>ki(t,r,n))}function Sm(){const t=D;return t.crypto||t.msCrypto}let io;function Cm(){return Math.random()*16}function ke(t=Sm()){try{if(t?.randomUUID)return t.randomUUID().replace(/-/g,"")}catch{}return io||(io="10000000100040008000"+1e11),io.replace(/[018]/g,e=>(e^(Cm()&15)>>e/4).toString(16))}function oh(t){return t.exception?.values?.[0]}function Jt(t){const{message:e,event_id:n}=t;if(e)return e;const r=oh(t);return r?r.type&&r.value?`${r.type}: ${r.value}`:r.type||r.value||n||"<unknown>":n||"<unknown>"}function Do(t,e,n){const r=t.exception=t.exception||{},i=r.values=r.values||[],s=i[0]=i[0]||{};s.value||(s.value=e||""),s.type||(s.type="Error")}function Ln(t,e){const n=oh(t);if(!n)return;const r={type:"generic",handled:!0},i=n.mechanism;if(n.mechanism={...r,...i,...e},e&&"data"in e){const s={...i?.data,...e.data};n.mechanism.data=s}}function Pl(t){if(Tm(t))return!0;try{sn(t,"__sentry_captured__",!0)}catch{}return!1}function Tm(t){try{return t.__sentry_captured__}catch{}}const ah=1e3;function Xr(){return Date.now()/ah}function Im(){const{performance:t}=D;if(!t?.now||!t.timeOrigin)return Xr;const e=t.timeOrigin;return()=>(e+t.now())/ah}let Nl;function st(){return(Nl??(Nl=Im()))()}function km(t){const e=st(),n={sid:ke(),init:!0,timestamp:e,started:e,duration:0,status:"ok",errors:0,ignoreDuration:!1,toJSON:()=>Am(n)};return t&&On(n,t),n}function On(t,e={}){if(e.user&&(!t.ipAddress&&e.user.ip_address&&(t.ipAddress=e.user.ip_address),!t.did&&!e.did&&(t.did=e.user.id||e.user.email||e.user.username)),t.timestamp=e.timestamp||st(),e.abnormal_mechanism&&(t.abnormal_mechanism=e.abnormal_mechanism),e.ignoreDuration&&(t.ignoreDuration=e.ignoreDuration),e.sid&&(t.sid=e.sid.length===32?e.sid:ke()),e.init!==void 0&&(t.init=e.init),!t.did&&e.did&&(t.did=`${e.did}`),typeof e.started=="number"&&(t.started=e.started),t.ignoreDuration)t.duration=void 0;else if(typeof e.duration=="number")t.duration=e.duration;else{const n=t.timestamp-t.started;t.duration=n>=0?n:0}e.release&&(t.release=e.release),e.environment&&(t.environment=e.environment),!t.ipAddress&&e.ipAddress&&(t.ipAddress=e.ipAddress),!t.userAgent&&e.userAgent&&(t.userAgent=e.userAgent),typeof e.errors=="number"&&(t.errors=e.errors),e.status&&(t.status=e.status)}function Rm(t,e){let n={};t.status==="ok"&&(n={status:"exited"}),On(t,n)}function Am(t){return{sid:`${t.sid}`,init:t.init,started:new Date(t.started*1e3).toISOString(),timestamp:new Date(t.timestamp*1e3).toISOString(),status:t.status,errors:t.errors,did:typeof t.did=="number"||typeof t.did=="string"?`${t.did}`:void 0,duration:t.duration,abnormal_mechanism:t.abnormal_mechanism,attrs:{release:t.release,environment:t.environment,ip_address:t.ipAddress,user_agent:t.userAgent}}}function Qr(t,e,n=2){if(!e||typeof e!="object"||n<=0)return e;if(t&&Object.keys(e).length===0)return t;const r={...t};for(const i in e)Object.prototype.hasOwnProperty.call(e,i)&&(r[i]=Qr(r[i],e[i],n-1));return r}function Ll(){return ke()}function ch(){return ke().substring(16)}const Mo="_sentrySpan";function Ol(t,e){e?sn(t,Mo,e):delete t[Mo]}function Dl(t){return t[Mo]}const Pm=100;class ct{constructor(){this._notifyingListeners=!1,this._scopeListeners=[],this._eventProcessors=[],this._breadcrumbs=[],this._attachments=[],this._user={},this._tags={},this._extra={},this._contexts={},this._sdkProcessingMetadata={},this._propagationContext={traceId:Ll(),sampleRand:Math.random()}}clone(){const e=new ct;return e._breadcrumbs=[...this._breadcrumbs],e._tags={...this._tags},e._extra={...this._extra},e._contexts={...this._contexts},this._contexts.flags&&(e._contexts.flags={values:[...this._contexts.flags.values]}),e._user=this._user,e._level=this._level,e._session=this._session,e._transactionName=this._transactionName,e._fingerprint=this._fingerprint,e._eventProcessors=[...this._eventProcessors],e._attachments=[...this._attachments],e._sdkProcessingMetadata={...this._sdkProcessingMetadata},e._propagationContext={...this._propagationContext},e._client=this._client,e._lastEventId=this._lastEventId,Ol(e,Dl(this)),e}setClient(e){this._client=e}setLastEventId(e){this._lastEventId=e}getClient(){return this._client}lastEventId(){return this._lastEventId}addScopeListener(e){this._scopeListeners.push(e)}addEventProcessor(e){return this._eventProcessors.push(e),this}setUser(e){return this._user=e||{email:void 0,id:void 0,ip_address:void 0,username:void 0},this._session&&On(this._session,{user:e}),this._notifyScopeListeners(),this}getUser(){return this._user}setTags(e){return this._tags={...this._tags,...e},this._notifyScopeListeners(),this}setTag(e,n){return this.setTags({[e]:n})}setExtras(e){return this._extra={...this._extra,...e},this._notifyScopeListeners(),this}setExtra(e,n){return this._extra={...this._extra,[e]:n},this._notifyScopeListeners(),this}setFingerprint(e){return this._fingerprint=e,this._notifyScopeListeners(),this}setLevel(e){return this._level=e,this._notifyScopeListeners(),this}setTransactionName(e){return this._transactionName=e,this._notifyScopeListeners(),this}setContext(e,n){return n===null?delete this._contexts[e]:this._contexts[e]=n,this._notifyScopeListeners(),this}setSession(e){return e?this._session=e:delete this._session,this._notifyScopeListeners(),this}getSession(){return this._session}update(e){if(!e)return this;const n=typeof e=="function"?e(this):e,r=n instanceof ct?n.getScopeData():Or(n)?e:void 0,{tags:i,extra:s,user:o,contexts:a,level:c,fingerprint:l=[],propagationContext:u}=r||{};return this._tags={...this._tags,...i},this._extra={...this._extra,...s},this._contexts={...this._contexts,...a},o&&Object.keys(o).length&&(this._user=o),c&&(this._level=c),l.length&&(this._fingerprint=l),u&&(this._propagationContext=u),this}clear(){return this._breadcrumbs=[],this._tags={},this._extra={},this._user={},this._contexts={},this._level=void 0,this._transactionName=void 0,this._fingerprint=void 0,this._session=void 0,Ol(this,void 0),this._attachments=[],this.setPropagationContext({traceId:Ll(),sampleRand:Math.random()}),this._notifyScopeListeners(),this}addBreadcrumb(e,n){const r=typeof n=="number"?n:Pm;if(r<=0)return this;const i={timestamp:Xr(),...e,message:e.message?sh(e.message,2048):e.message};return this._breadcrumbs.push(i),this._breadcrumbs.length>r&&(this._breadcrumbs=this._breadcrumbs.slice(-r),this._client?.recordDroppedEvent("buffer_overflow","log_item")),this._notifyScopeListeners(),this}getLastBreadcrumb(){return this._breadcrumbs[this._breadcrumbs.length-1]}clearBreadcrumbs(){return this._breadcrumbs=[],this._notifyScopeListeners(),this}addAttachment(e){return this._attachments.push(e),this}clearAttachments(){return this._attachments=[],this}getScopeData(){return{breadcrumbs:this._breadcrumbs,attachments:this._attachments,contexts:this._contexts,tags:this._tags,extra:this._extra,user:this._user,level:this._level,fingerprint:this._fingerprint||[],eventProcessors:this._eventProcessors,propagationContext:this._propagationContext,sdkProcessingMetadata:this._sdkProcessingMetadata,transactionName:this._transactionName,span:Dl(this)}}setSDKProcessingMetadata(e){return this._sdkProcessingMetadata=Qr(this._sdkProcessingMetadata,e,2),this}setPropagationContext(e){return this._propagationContext=e,this}getPropagationContext(){return this._propagationContext}captureException(e,n){const r=n?.event_id||ke();if(!this._client)return C&&b.warn("No client configured on scope - will not capture exception!"),r;const i=new Error("Sentry syntheticException");return this._client.captureException(e,{originalException:e,syntheticException:i,...n,event_id:r},this),r}captureMessage(e,n,r){const i=r?.event_id||ke();if(!this._client)return C&&b.warn("No client configured on scope - will not capture message!"),i;const s=r?.syntheticException??new Error(e);return this._client.captureMessage(e,n,{originalException:e,syntheticException:s,...r,event_id:i},this),i}captureEvent(e,n){const r=n?.event_id||ke();return this._client?(this._client.captureEvent(e,{...n,event_id:r},this),r):(C&&b.warn("No client configured on scope - will not capture event!"),r)}_notifyScopeListeners(){this._notifyingListeners||(this._notifyingListeners=!0,this._scopeListeners.forEach(e=>{e(this)}),this._notifyingListeners=!1)}}function Nm(){return qn("defaultCurrentScope",()=>new ct)}function Lm(){return qn("defaultIsolationScope",()=>new ct)}class Om{constructor(e,n){let r;e?r=e:r=new ct;let i;n?i=n:i=new ct,this._stack=[{scope:r}],this._isolationScope=i}withScope(e){const n=this._pushScope();let r;try{r=e(n)}catch(i){throw this._popScope(),i}return Jr(r)?r.then(i=>(this._popScope(),i),i=>{throw this._popScope(),i}):(this._popScope(),r)}getClient(){return this.getStackTop().client}getScope(){return this.getStackTop().scope}getIsolationScope(){return this._isolationScope}getStackTop(){return this._stack[this._stack.length-1]}_pushScope(){const e=this.getScope().clone();return this._stack.push({client:this.getClient(),scope:e}),e}_popScope(){return this._stack.length<=1?!1:!!this._stack.pop()}}function Dn(){const t=vs(),e=ws(t);return e.stack=e.stack||new Om(Nm(),Lm())}function Dm(t){return Dn().withScope(t)}function Mm(t,e){const n=Dn();return n.withScope(()=>(n.getStackTop().scope=t,e(t)))}function Ml(t){return Dn().withScope(()=>t(Dn().getIsolationScope()))}function xm(){return{withIsolationScope:Ml,withScope:Dm,withSetScope:Mm,withSetIsolationScope:(t,e)=>Ml(e),getCurrentScope:()=>Dn().getScope(),getIsolationScope:()=>Dn().getIsolationScope()}}function Ba(t){const e=ws(t);return e.acs?e.acs:xm()}function Bt(){const t=vs();return Ba(t).getCurrentScope()}function Zr(){const t=vs();return Ba(t).getIsolationScope()}function Fm(){return qn("globalScope",()=>new ct)}function Um(...t){const e=vs(),n=Ba(e);if(t.length===2){const[r,i]=t;return r?n.withSetScope(r,i):n.withScope(i)}return n.withScope(t[0])}function me(){return Bt().getClient()}function $m(t){const e=t.getPropagationContext(),{traceId:n,parentSpanId:r,propagationSpanId:i}=e,s={trace_id:n,span_id:i||ch()};return r&&(s.parent_span_id=r),s}const Bm="sentry.source",Hm="sentry.sample_rate",Wm="sentry.previous_trace_sample_rate",Vm="sentry.op",jm="sentry.origin",lh="sentry.profile_id",uh="sentry.exclusive_time",Gm=0,zm=1,qm="_sentryScope",Ym="_sentryIsolationScope";function Km(t){if(t){if(typeof t=="object"&&"deref"in t&&typeof t.deref=="function")try{return t.deref()}catch{return}return t}}function dh(t){const e=t;return{scope:e[qm],isolationScope:Km(e[Ym])}}const Jm="sentry-",Xm=/^sentry-/;function Qm(t){const e=Zm(t);if(!e)return;const n=Object.entries(e).reduce((r,[i,s])=>{if(i.match(Xm)){const o=i.slice(Jm.length);r[o]=s}return r},{});if(Object.keys(n).length>0)return n}function Zm(t){if(!(!t||!it(t)&&!Array.isArray(t)))return Array.isArray(t)?t.reduce((e,n)=>{const r=xl(n);return Object.entries(r).forEach(([i,s])=>{e[i]=s}),e},{}):xl(t)}function xl(t){return t.split(",").map(e=>{const n=e.indexOf("=");if(n===-1)return[];const r=e.slice(0,n),i=e.slice(n+1);return[r,i].map(s=>{try{return decodeURIComponent(s.trim())}catch{return}})}).reduce((e,[n,r])=>(n&&r&&(e[n]=r),e),{})}const e_=/^o(\d+)\./,t_=/^(?:(\w+):)\/\/(?:(\w+)(?::(\w+)?)?@)([\w.-]+)(?::(\d+))?\/(.+)/;function n_(t){return t==="http"||t==="https"}function ei(t,e=!1){const{host:n,path:r,pass:i,port:s,projectId:o,protocol:a,publicKey:c}=t;return`${a}://${c}${e&&i?`:${i}`:""}@${n}${s?`:${s}`:""}/${r&&`${r}/`}${o}`}function r_(t){const e=t_.exec(t);if(!e){Yn(()=>{console.error(`Invalid Sentry Dsn: ${t}`)});return}const[n,r,i="",s="",o="",a=""]=e.slice(1);let c="",l=a;const u=l.split("/");if(u.length>1&&(c=u.slice(0,-1).join("/"),l=u.pop()),l){const d=l.match(/^\d+/);d&&(l=d[0])}return hh({host:s,pass:i,path:c,projectId:l,port:o,protocol:n,publicKey:r})}function hh(t){return{protocol:t.protocol,publicKey:t.publicKey||"",pass:t.pass||"",host:t.host,port:t.port||"",path:t.path||"",projectId:t.projectId}}function i_(t){if(!C)return!0;const{port:e,projectId:n,protocol:r}=t;return["protocol","publicKey","host","projectId"].find(o=>t[o]?!1:(b.error(`Invalid Sentry Dsn: ${o} missing`),!0))?!1:n.match(/^\d+$/)?n_(r)?e&&isNaN(parseInt(e,10))?(b.error(`Invalid Sentry Dsn: Invalid port ${e}`),!1):!0:(b.error(`Invalid Sentry Dsn: Invalid protocol ${r}`),!1):(b.error(`Invalid Sentry Dsn: Invalid projectId ${n}`),!1)}function s_(t){return t.match(e_)?.[1]}function o_(t){const e=t.getOptions(),{host:n}=t.getDsn()||{};let r;return e.orgId?r=String(e.orgId):n&&(r=s_(n)),r}function a_(t){const e=typeof t=="string"?r_(t):hh(t);if(!(!e||!i_(e)))return e}function c_(t){if(typeof t=="boolean")return Number(t);const e=typeof t=="string"?parseFloat(t):t;if(!(typeof e!="number"||isNaN(e)||e<0||e>1))return e}const fh=1;let Fl=!1;function l_(t){const{spanId:e,traceId:n,isRemote:r}=t.spanContext(),i=r?e:Ha(t).parent_span_id,s=dh(t).scope,o=r?s?.getPropagationContext().propagationSpanId||ch():e;return{parent_span_id:i,span_id:o,trace_id:n}}function u_(t){if(t&&t.length>0)return t.map(({context:{spanId:e,traceId:n,traceFlags:r,...i},attributes:s})=>({span_id:e,trace_id:n,sampled:r===fh,attributes:s,...i}))}function Ul(t){return typeof t=="number"?$l(t):Array.isArray(t)?t[0]+t[1]/1e9:t instanceof Date?$l(t.getTime()):st()}function $l(t){return t>9999999999?t/1e3:t}function Ha(t){if(h_(t))return t.getSpanJSON();const{spanId:e,traceId:n}=t.spanContext();if(d_(t)){const{attributes:r,startTime:i,name:s,endTime:o,status:a,links:c}=t,l="parentSpanId"in t?t.parentSpanId:"parentSpanContext"in t?t.parentSpanContext?.spanId:void 0;return{span_id:e,trace_id:n,data:r,description:s,parent_span_id:l,start_timestamp:Ul(i),timestamp:Ul(o)||void 0,status:p_(a),op:r[Vm],origin:r[jm],links:u_(c)}}return{span_id:e,trace_id:n,start_timestamp:0,data:{}}}function d_(t){const e=t;return!!e.attributes&&!!e.startTime&&!!e.name&&!!e.endTime&&!!e.status}function h_(t){return typeof t.getSpanJSON=="function"}function f_(t){const{traceFlags:e}=t.spanContext();return e===fh}function p_(t){if(!(!t||t.code===Gm))return t.code===zm?"ok":t.message||"internal_error"}const g_="_sentryRootSpan";function ph(t){return t[g_]||t}function Bl(){Fl||(Yn(()=>{console.warn("[Sentry] Returning null from `beforeSendSpan` is disallowed. To drop certain spans, configure the respective integrations directly or use `ignoreSpans`.")}),Fl=!0)}function m_(t){if(typeof __SENTRY_TRACING__=="boolean"&&!__SENTRY_TRACING__)return!1;const e=me()?.getOptions();return!!e&&(e.tracesSampleRate!=null||!!e.tracesSampler)}function Hl(t){b.log(`Ignoring span ${t.op} - ${t.description} because it matches \`ignoreSpans\`.`)}function Wl(t,e){if(!e?.length||!t.description)return!1;for(const n of e){if(y_(n)){if(ki(t.description,n))return C&&Hl(t),!0;continue}if(!n.name&&!n.op)continue;const r=n.name?ki(t.description,n.name):!0,i=n.op?t.op&&ki(t.op,n.op):!0;if(r&&i)return C&&Hl(t),!0}return!1}function __(t,e){const n=e.parent_span_id,r=e.span_id;if(n)for(const i of t)i.parent_span_id===r&&(i.parent_span_id=n)}function y_(t){return typeof t=="string"||t instanceof RegExp}const Wa="production",E_="_frozenDsc";function gh(t,e){const n=e.getOptions(),{publicKey:r}=e.getDsn()||{},i={environment:n.environment||Wa,release:n.release,public_key:r,trace_id:t,org_id:o_(e)};return e.emit("createDsc",i),i}function v_(t,e){const n=e.getPropagationContext();return n.dsc||gh(n.traceId,t)}function w_(t){const e=me();if(!e)return{};const n=ph(t),r=Ha(n),i=r.data,s=n.spanContext().traceState,o=s?.get("sentry.sample_rate")??i[Hm]??i[Wm];function a(p){return(typeof o=="number"||typeof o=="string")&&(p.sample_rate=`${o}`),p}const c=n[E_];if(c)return a(c);const l=s?.get("sentry.dsc"),u=l&&Qm(l);if(u)return a(u);const d=gh(t.spanContext().traceId,e),h=i[Bm],f=r.description;return h!=="url"&&f&&(d.transaction=f),m_()&&(d.sampled=String(f_(n)),d.sample_rand=s?.get("sentry.sample_rand")??dh(n).scope?.getPropagationContext().sampleRand.toString()),a(d),e.emit("createDsc",d,n),d}function Qe(t,e=100,n=1/0){try{return xo("",t,e,n)}catch(r){return{ERROR:`**non-serializable** (${r})`}}}function mh(t,e=3,n=100*1024){const r=Qe(t,e);return T_(r)>n?mh(t,e-1,n):r}function xo(t,e,n=1/0,r=1/0,i=I_()){const[s,o]=i;if(e==null||["boolean","string"].includes(typeof e)||typeof e=="number"&&Number.isFinite(e))return e;const a=b_(t,e);if(!a.startsWith("[object "))return a;if(e.__sentry_skip_normalization__)return e;const c=typeof e.__sentry_override_normalization_depth__=="number"?e.__sentry_override_normalization_depth__:n;if(c===0)return a.replace("object ","");if(s(e))return"[Circular ~]";const l=e;if(l&&typeof l.toJSON=="function")try{const f=l.toJSON();return xo("",f,c-1,r,i)}catch{}const u=Array.isArray(e)?[]:{};let d=0;const h=ih(e);for(const f in h){if(!Object.prototype.hasOwnProperty.call(h,f))continue;if(d>=r){u[f]="[MaxProperties ~]";break}const p=h[f];u[f]=xo(f,p,c-1,r,i),d++}return o(e),u}function b_(t,e){try{if(t==="domain"&&e&&typeof e=="object"&&e._events)return"[Domain]";if(t==="domainEmitter")return"[DomainEmitter]";if(typeof global<"u"&&e===global)return"[Global]";if(typeof window<"u"&&e===window)return"[Window]";if(typeof document<"u"&&e===document)return"[Document]";if(th(e))return Qd(e);if(_m(e))return"[SyntheticEvent]";if(typeof e=="number"&&!Number.isFinite(e))return`[${e}]`;if(typeof e=="function")return`[Function: ${Dt(e)}]`;if(typeof e=="symbol")return`[${String(e)}]`;if(typeof e=="bigint")return`[BigInt: ${String(e)}]`;const n=S_(e);return/^HTML(\w*)Element$/.test(n)?`[HTMLElement: ${n}]`:`[object ${n}]`}catch(n){return`**non-serializable** (${n})`}}function S_(t){const e=Object.getPrototypeOf(t);return e?.constructor?e.constructor.name:"null prototype"}function C_(t){return~-encodeURI(t).split(/%..|./).length}function T_(t){return C_(JSON.stringify(t))}function I_(){const t=new WeakSet;function e(r){return t.has(r)?!0:(t.add(r),!1)}function n(r){t.delete(r)}return[e,n]}function Jn(t,e=[]){return[t,e]}function k_(t,e){const[n,r]=t;return[n,[...r,e]]}function Vl(t,e){const n=t[1];for(const r of n){const i=r[0].type;if(e(r,i))return!0}return!1}function Fo(t){const e=ws(D);return e.encodePolyfill?e.encodePolyfill(t):new TextEncoder().encode(t)}function R_(t){const[e,n]=t;let r=JSON.stringify(e);function i(s){typeof r=="string"?r=typeof s=="string"?r+s:[Fo(r),s]:r.push(typeof s=="string"?Fo(s):s)}for(const s of n){const[o,a]=s;if(i(`
${JSON.stringify(o)}
`),typeof a=="string"||a instanceof Uint8Array)i(a);else{let c;try{c=JSON.stringify(a)}catch{c=JSON.stringify(Qe(a))}i(c)}}return typeof r=="string"?r:A_(r)}function A_(t){const e=t.reduce((i,s)=>i+s.length,0),n=new Uint8Array(e);let r=0;for(const i of t)n.set(i,r),r+=i.length;return n}function P_(t){const e=typeof t.data=="string"?Fo(t.data):t.data;return[{type:"attachment",length:e.length,filename:t.filename,content_type:t.contentType,attachment_type:t.attachmentType},e]}const N_={session:"session",sessions:"session",attachment:"attachment",transaction:"transaction",event:"error",client_report:"internal",user_report:"default",profile:"profile",profile_chunk:"profile",replay_event:"replay",replay_recording:"replay",check_in:"monitor",feedback:"feedback",span:"span",raw_security:"security",log:"log_item",metric:"metric",trace_metric:"metric"};function jl(t){return N_[t]}function _h(t){if(!t?.sdk)return;const{name:e,version:n}=t.sdk;return{name:e,version:n}}function L_(t,e,n,r){const i=t.sdkProcessingMetadata?.dynamicSamplingContext;return{event_id:t.event_id,sent_at:new Date().toISOString(),...e&&{sdk:e},...!!n&&r&&{dsn:ei(r)},...i&&{trace:i}}}function O_(t,e){if(!e)return t;const n=t.sdk||{};return t.sdk={...n,name:n.name||e.name,version:n.version||e.version,integrations:[...t.sdk?.integrations||[],...e.integrations||[]],packages:[...t.sdk?.packages||[],...e.packages||[]],settings:t.sdk?.settings||e.settings?{...t.sdk?.settings,...e.settings}:void 0},t}function D_(t,e,n,r){const i=_h(n),s={sent_at:new Date().toISOString(),...i&&{sdk:i},...!!r&&e&&{dsn:ei(e)}},o="aggregates"in t?[{type:"sessions"},t]:[{type:"session"},t.toJSON()];return Jn(s,[o])}function M_(t,e,n,r){const i=_h(n),s=t.type&&t.type!=="replay_event"?t.type:"event";O_(t,n?.sdk);const o=L_(t,i,r,e);return delete t.sdkProcessingMetadata,Jn(o,[[{type:s},t]])}const so=0,Gl=1,zl=2;function Ts(t){return new Dr(e=>{e(t)})}function Va(t){return new Dr((e,n)=>{n(t)})}class Dr{constructor(e){this._state=so,this._handlers=[],this._runExecutor(e)}then(e,n){return new Dr((r,i)=>{this._handlers.push([!1,s=>{if(!e)r(s);else try{r(e(s))}catch(o){i(o)}},s=>{if(!n)i(s);else try{r(n(s))}catch(o){i(o)}}]),this._executeHandlers()})}catch(e){return this.then(n=>n,e)}finally(e){return new Dr((n,r)=>{let i,s;return this.then(o=>{s=!1,i=o,e&&e()},o=>{s=!0,i=o,e&&e()}).then(()=>{if(s){r(i);return}n(i)})})}_executeHandlers(){if(this._state===so)return;const e=this._handlers.slice();this._handlers=[],e.forEach(n=>{n[0]||(this._state===Gl&&n[1](this._value),this._state===zl&&n[2](this._value),n[0]=!0)})}_runExecutor(e){const n=(s,o)=>{if(this._state===so){if(Jr(o)){o.then(r,i);return}this._state=s,this._value=o,this._executeHandlers()}},r=s=>{n(Gl,s)},i=s=>{n(zl,s)};try{e(r,i)}catch(s){i(s)}}}function x_(t,e,n,r=0){try{const i=Uo(e,n,t,r);return Jr(i)?i:Ts(i)}catch(i){return Va(i)}}function Uo(t,e,n,r){const i=n[r];if(!t||!i)return t;const s=i({...t},e);return C&&s===null&&b.log(`Event processor "${i.id||"?"}" dropped event`),Jr(s)?s.then(o=>Uo(o,e,n,r+1)):Uo(s,e,n,r+1)}function F_(t,e){const{fingerprint:n,span:r,breadcrumbs:i,sdkProcessingMetadata:s}=e;U_(t,e),r&&H_(t,r),W_(t,n),$_(t,i),B_(t,s)}function ql(t,e){const{extra:n,tags:r,user:i,contexts:s,level:o,sdkProcessingMetadata:a,breadcrumbs:c,fingerprint:l,eventProcessors:u,attachments:d,propagationContext:h,transactionName:f,span:p}=e;gi(t,"extra",n),gi(t,"tags",r),gi(t,"user",i),gi(t,"contexts",s),t.sdkProcessingMetadata=Qr(t.sdkProcessingMetadata,a,2),o&&(t.level=o),f&&(t.transactionName=f),p&&(t.span=p),c.length&&(t.breadcrumbs=[...t.breadcrumbs,...c]),l.length&&(t.fingerprint=[...t.fingerprint,...l]),u.length&&(t.eventProcessors=[...t.eventProcessors,...u]),d.length&&(t.attachments=[...t.attachments,...d]),t.propagationContext={...t.propagationContext,...h}}function gi(t,e,n){t[e]=Qr(t[e],n,1)}function U_(t,e){const{extra:n,tags:r,user:i,contexts:s,level:o,transactionName:a}=e;Object.keys(n).length&&(t.extra={...n,...t.extra}),Object.keys(r).length&&(t.tags={...r,...t.tags}),Object.keys(i).length&&(t.user={...i,...t.user}),Object.keys(s).length&&(t.contexts={...s,...t.contexts}),o&&(t.level=o),a&&t.type!=="transaction"&&(t.transaction=a)}function $_(t,e){const n=[...t.breadcrumbs||[],...e];t.breadcrumbs=n.length?n:void 0}function B_(t,e){t.sdkProcessingMetadata={...t.sdkProcessingMetadata,...e}}function H_(t,e){t.contexts={trace:l_(e),...t.contexts},t.sdkProcessingMetadata={dynamicSamplingContext:w_(e),...t.sdkProcessingMetadata};const n=ph(e),r=Ha(n).description;r&&!t.transaction&&t.type==="transaction"&&(t.transaction=r)}function W_(t,e){t.fingerprint=t.fingerprint?Array.isArray(t.fingerprint)?t.fingerprint:[t.fingerprint]:[],e&&(t.fingerprint=t.fingerprint.concat(e)),t.fingerprint.length||delete t.fingerprint}let jt,Yl,Kl,mt;function V_(t){const e=D._sentryDebugIds,n=D._debugIds;if(!e&&!n)return{};const r=e?Object.keys(e):[],i=n?Object.keys(n):[];if(mt&&r.length===Yl&&i.length===Kl)return mt;Yl=r.length,Kl=i.length,mt={},jt||(jt={});const s=(o,a)=>{for(const c of o){const l=a[c],u=jt?.[c];if(u&&mt&&l)mt[u[0]]=l,jt&&(jt[c]=[u[0],l]);else if(l){const d=t(c);for(let h=d.length-1;h>=0;h--){const p=d[h]?.filename;if(p&&mt&&jt){mt[p]=l,jt[c]=[p,l];break}}}}};return e&&s(r,e),n&&s(i,n),mt}function j_(t,e,n,r,i,s){const{normalizeDepth:o=3,normalizeMaxBreadth:a=1e3}=t,c={...e,event_id:e.event_id||n.event_id||ke(),timestamp:e.timestamp||Xr()},l=n.integrations||t.integrations.map(m=>m.name);G_(c,t),Y_(c,l),i&&i.emit("applyFrameMetadata",e),e.type===void 0&&z_(c,t.stackParser);const u=J_(r,n.captureContext);n.mechanism&&Ln(c,n.mechanism);const d=i?i.getEventProcessors():[],h=Fm().getScopeData();if(s){const m=s.getScopeData();ql(h,m)}if(u){const m=u.getScopeData();ql(h,m)}const f=[...n.attachments||[],...h.attachments];f.length&&(n.attachments=f),F_(c,h);const p=[...d,...h.eventProcessors];return x_(p,c,n).then(m=>(m&&q_(m),typeof o=="number"&&o>0?K_(m,o,a):m))}function G_(t,e){const{environment:n,release:r,dist:i,maxValueLength:s}=e;t.environment=t.environment||n||Wa,!t.release&&r&&(t.release=r),!t.dist&&i&&(t.dist=i);const o=t.request;o?.url&&(o.url=s?sh(o.url,s):o.url)}function z_(t,e){const n=V_(e);t.exception?.values?.forEach(r=>{r.stacktrace?.frames?.forEach(i=>{i.filename&&(i.debug_id=n[i.filename])})})}function q_(t){const e={};if(t.exception?.values?.forEach(r=>{r.stacktrace?.frames?.forEach(i=>{i.debug_id&&(i.abs_path?e[i.abs_path]=i.debug_id:i.filename&&(e[i.filename]=i.debug_id),delete i.debug_id)})}),Object.keys(e).length===0)return;t.debug_meta=t.debug_meta||{},t.debug_meta.images=t.debug_meta.images||[];const n=t.debug_meta.images;Object.entries(e).forEach(([r,i])=>{n.push({type:"sourcemap",code_file:r,debug_id:i})})}function Y_(t,e){e.length>0&&(t.sdk=t.sdk||{},t.sdk.integrations=[...t.sdk.integrations||[],...e])}function K_(t,e,n){if(!t)return null;const r={...t,...t.breadcrumbs&&{breadcrumbs:t.breadcrumbs.map(i=>({...i,...i.data&&{data:Qe(i.data,e,n)}}))},...t.user&&{user:Qe(t.user,e,n)},...t.contexts&&{contexts:Qe(t.contexts,e,n)},...t.extra&&{extra:Qe(t.extra,e,n)}};return t.contexts?.trace&&r.contexts&&(r.contexts.trace=t.contexts.trace,t.contexts.trace.data&&(r.contexts.trace.data=Qe(t.contexts.trace.data,e,n))),t.spans&&(r.spans=t.spans.map(i=>({...i,...i.data&&{data:Qe(i.data,e,n)}}))),t.contexts?.flags&&r.contexts&&(r.contexts.flags=Qe(t.contexts.flags,3,n)),r}function J_(t,e){if(!e)return t;const n=t?t.clone():new ct;return n.update(e),n}function X_(t,e){return Bt().captureException(t,void 0)}function yh(t,e){return Bt().captureEvent(t,e)}function Jl(t){const e=Zr(),n=Bt(),{userAgent:r}=D.navigator||{},i=km({user:n.getUser()||e.getUser(),...r&&{userAgent:r},...t}),s=e.getSession();return s?.status==="ok"&&On(s,{status:"exited"}),Eh(),e.setSession(i),i}function Eh(){const t=Zr(),n=Bt().getSession()||t.getSession();n&&Rm(n),vh(),t.setSession()}function vh(){const t=Zr(),e=me(),n=t.getSession();n&&e&&e.captureSession(n)}function Xl(t=!1){if(t){Eh();return}vh()}const Q_="7";function Z_(t){const e=t.protocol?`${t.protocol}:`:"",n=t.port?`:${t.port}`:"";return`${e}//${t.host}${n}${t.path?`/${t.path}`:""}/api/`}function ey(t){return`${Z_(t)}${t.projectId}/envelope/`}function ty(t,e){const n={sentry_version:Q_};return t.publicKey&&(n.sentry_key=t.publicKey),e&&(n.sentry_client=`${e.name}/${e.version}`),new URLSearchParams(n).toString()}function ny(t,e,n){return e||`${ey(t)}?${ty(t,n)}`}const Ql=[];function ry(t){const e={};return t.forEach(n=>{const{name:r}=n,i=e[r];i&&!i.isDefaultInstance&&n.isDefaultInstance||(e[r]=n)}),Object.values(e)}function iy(t){const e=t.defaultIntegrations||[],n=t.integrations;e.forEach(i=>{i.isDefaultInstance=!0});let r;if(Array.isArray(n))r=[...e,...n];else if(typeof n=="function"){const i=n(e);r=Array.isArray(i)?i:[i]}else r=e;return ry(r)}function sy(t,e){const n={};return e.forEach(r=>{r&&wh(t,r,n)}),n}function Zl(t,e){for(const n of e)n?.afterAllSetup&&n.afterAllSetup(t)}function wh(t,e,n){if(n[e.name]){C&&b.log(`Integration skipped because it was already installed: ${e.name}`);return}if(n[e.name]=e,!Ql.includes(e.name)&&typeof e.setupOnce=="function"&&(e.setupOnce(),Ql.push(e.name)),e.setup&&typeof e.setup=="function"&&e.setup(t),typeof e.preprocessEvent=="function"){const r=e.preprocessEvent.bind(e);t.on("preprocessEvent",(i,s)=>r(i,s,t))}if(typeof e.processEvent=="function"){const r=e.processEvent.bind(e),i=Object.assign((s,o)=>r(s,o,t),{id:e.name});t.addEventProcessor(i)}C&&b.log(`Integration installed: ${e.name}`)}function oy(t){return[{type:"log",item_count:t.length,content_type:"application/vnd.sentry.items.log+json"},{items:t}]}function ay(t,e,n,r){const i={};return e?.sdk&&(i.sdk={name:e.sdk.name,version:e.sdk.version}),n&&r&&(i.dsn=ei(r)),Jn(i,[oy(t)])}function bh(t,e){const n=e??cy(t)??[];if(n.length===0)return;const r=t.getOptions(),i=ay(n,r._metadata,r.tunnel,t.getDsn());Sh().set(t,[]),t.emit("flushLogs"),t.sendEnvelope(i)}function cy(t){return Sh().get(t)}function Sh(){return qn("clientToLogBufferMap",()=>new WeakMap)}function ly(t){return[{type:"trace_metric",item_count:t.length,content_type:"application/vnd.sentry.items.trace-metric+json"},{items:t}]}function uy(t,e,n,r){const i={};return e?.sdk&&(i.sdk={name:e.sdk.name,version:e.sdk.version}),n&&r&&(i.dsn=ei(r)),Jn(i,[ly(t)])}function Ch(t,e){const n=e??dy(t)??[];if(n.length===0)return;const r=t.getOptions(),i=uy(n,r._metadata,r.tunnel,t.getDsn());Th().set(t,[]),t.emit("flushMetrics"),t.sendEnvelope(i)}function dy(t){return Th().get(t)}function Th(){return qn("clientToMetricBufferMap",()=>new WeakMap)}function hy(t,e,n){const r=[{type:"client_report"},{timestamp:Xr(),discarded_events:t}];return Jn(e?{dsn:e}:{},[r])}function Ih(t){const e=[];t.message&&e.push(t.message);try{const n=t.exception.values[t.exception.values.length-1];n?.value&&(e.push(n.value),n.type&&e.push(`${n.type}: ${n.value}`))}catch{}return e}function fy(t){const{trace_id:e,parent_span_id:n,span_id:r,status:i,origin:s,data:o,op:a}=t.contexts?.trace??{};return{data:o??{},description:t.transaction,op:a,parent_span_id:n,span_id:r??"",start_timestamp:t.start_timestamp??0,status:i,timestamp:t.timestamp,trace_id:e??"",origin:s,profile_id:o?.[lh],exclusive_time:o?.[uh],measurements:t.measurements,is_segment:!0}}function py(t){return{type:"transaction",timestamp:t.timestamp,start_timestamp:t.start_timestamp,transaction:t.description,contexts:{trace:{trace_id:t.trace_id,span_id:t.span_id,parent_span_id:t.parent_span_id,op:t.op,status:t.status,origin:t.origin,data:{...t.data,...t.profile_id&&{[lh]:t.profile_id},...t.exclusive_time&&{[uh]:t.exclusive_time}}}},measurements:t.measurements}}const eu="Not capturing exception because it's already been captured.",tu="Discarded session because of missing or non-string release",kh=Symbol.for("SentryInternalError"),Rh=Symbol.for("SentryDoNotSendEventError"),gy=5e3;function Ri(t){return{message:t,[kh]:!0}}function oo(t){return{message:t,[Rh]:!0}}function nu(t){return!!t&&typeof t=="object"&&kh in t}function ru(t){return!!t&&typeof t=="object"&&Rh in t}function iu(t,e,n,r,i){let s=0,o,a=!1;t.on(n,()=>{s=0,clearTimeout(o),a=!1}),t.on(e,c=>{s+=r(c),s>=8e5?i(t):a||(a=!0,o=setTimeout(()=>{i(t)},gy))}),t.on("flush",()=>{i(t)})}class my{constructor(e){if(this._options=e,this._integrations={},this._numProcessing=0,this._outcomes={},this._hooks={},this._eventProcessors=[],e.dsn?this._dsn=a_(e.dsn):C&&b.warn("No DSN provided, client will not send events."),this._dsn){const r=ny(this._dsn,e.tunnel,e._metadata?e._metadata.sdk:void 0);this._transport=e.transport({tunnel:this._options.tunnel,recordDroppedEvent:this.recordDroppedEvent.bind(this),...e.transportOptions,url:r})}this._options.enableLogs&&iu(this,"afterCaptureLog","flushLogs",vy,bh),(this._options.enableMetrics??this._options._experiments?.enableMetrics??!0)&&iu(this,"afterCaptureMetric","flushMetrics",Ey,Ch)}captureException(e,n,r){const i=ke();if(Pl(e))return C&&b.log(eu),i;const s={event_id:i,...n};return this._process(this.eventFromException(e,s).then(o=>this._captureEvent(o,s,r))),s.event_id}captureMessage(e,n,r,i){const s={event_id:ke(),...r},o=xa(e)?e:String(e),a=bs(e)?this.eventFromMessage(o,n,s):this.eventFromException(e,s);return this._process(a.then(c=>this._captureEvent(c,s,i))),s.event_id}captureEvent(e,n,r){const i=ke();if(n?.originalException&&Pl(n.originalException))return C&&b.log(eu),i;const s={event_id:i,...n},o=e.sdkProcessingMetadata||{},a=o.capturedSpanScope,c=o.capturedSpanIsolationScope;return this._process(this._captureEvent(e,s,a||r,c)),s.event_id}captureSession(e){this.sendSession(e),On(e,{init:!1})}getDsn(){return this._dsn}getOptions(){return this._options}getSdkMetadata(){return this._options._metadata}getTransport(){return this._transport}async flush(e){const n=this._transport;if(!n)return!0;this.emit("flush");const r=await this._isClientDoneProcessing(e),i=await n.flush(e);return r&&i}async close(e){const n=await this.flush(e);return this.getOptions().enabled=!1,this.emit("close"),n}getEventProcessors(){return this._eventProcessors}addEventProcessor(e){this._eventProcessors.push(e)}init(){(this._isEnabled()||this._options.integrations.some(({name:e})=>e.startsWith("Spotlight")))&&this._setupIntegrations()}getIntegrationByName(e){return this._integrations[e]}addIntegration(e){const n=this._integrations[e.name];wh(this,e,this._integrations),n||Zl(this,[e])}sendEvent(e,n={}){this.emit("beforeSendEvent",e,n);let r=M_(e,this._dsn,this._options._metadata,this._options.tunnel);for(const i of n.attachments||[])r=k_(r,P_(i));this.sendEnvelope(r).then(i=>this.emit("afterSendEvent",e,i))}sendSession(e){const{release:n,environment:r=Wa}=this._options;if("aggregates"in e){const s=e.attrs||{};if(!s.release&&!n){C&&b.warn(tu);return}s.release=s.release||n,s.environment=s.environment||r,e.attrs=s}else{if(!e.release&&!n){C&&b.warn(tu);return}e.release=e.release||n,e.environment=e.environment||r}this.emit("beforeSendSession",e);const i=D_(e,this._dsn,this._options._metadata,this._options.tunnel);this.sendEnvelope(i)}recordDroppedEvent(e,n,r=1){if(this._options.sendClientReports){const i=`${e}:${n}`;C&&b.log(`Recording outcome: "${i}"${r>1?` (${r} times)`:""}`),this._outcomes[i]=(this._outcomes[i]||0)+r}}on(e,n){const r=this._hooks[e]=this._hooks[e]||new Set,i=(...s)=>n(...s);return r.add(i),()=>{r.delete(i)}}emit(e,...n){const r=this._hooks[e];r&&r.forEach(i=>i(...n))}async sendEnvelope(e){if(this.emit("beforeEnvelope",e),this._isEnabled()&&this._transport)try{return await this._transport.send(e)}catch(n){return C&&b.error("Error while sending envelope:",n),{}}return C&&b.error("Transport disabled"),{}}_setupIntegrations(){const{integrations:e}=this._options;this._integrations=sy(this,e),Zl(this,e)}_updateSessionFromEvent(e,n){let r=n.level==="fatal",i=!1;const s=n.exception?.values;if(s){i=!0,r=!1;for(const c of s)if(c.mechanism?.handled===!1){r=!0;break}}const o=e.status==="ok";(o&&e.errors===0||o&&r)&&(On(e,{...r&&{status:"crashed"},errors:e.errors||Number(i||r)}),this.captureSession(e))}async _isClientDoneProcessing(e){let n=0;for(;!e||n<e;){if(await new Promise(r=>setTimeout(r,1)),!this._numProcessing)return!0;n++}return!1}_isEnabled(){return this.getOptions().enabled!==!1&&this._transport!==void 0}_prepareEvent(e,n,r,i){const s=this.getOptions(),o=Object.keys(this._integrations);return!n.integrations&&o?.length&&(n.integrations=o),this.emit("preprocessEvent",e,n),e.type||i.setLastEventId(e.event_id||n.event_id),j_(s,e,n,r,this,i).then(a=>{if(a===null)return a;this.emit("postprocessEvent",a,n),a.contexts={trace:$m(r),...a.contexts};const c=v_(this,r);return a.sdkProcessingMetadata={dynamicSamplingContext:c,...a.sdkProcessingMetadata},a})}_captureEvent(e,n={},r=Bt(),i=Zr()){return C&&$o(e)&&b.log(`Captured error event \`${Ih(e)[0]||"<unknown>"}\``),this._processEvent(e,n,r,i).then(s=>s.event_id,s=>{C&&(ru(s)?b.log(s.message):nu(s)?b.warn(s.message):b.warn(s))})}_processEvent(e,n,r,i){const s=this.getOptions(),{sampleRate:o}=s,a=Ah(e),c=$o(e),l=e.type||"error",u=`before send for type \`${l}\``,d=typeof o>"u"?void 0:c_(o);if(c&&typeof d=="number"&&Math.random()>d)return this.recordDroppedEvent("sample_rate","error"),Va(oo(`Discarding event because it's not included in the random sample (sampling rate = ${o})`));const h=l==="replay_event"?"replay":l;return this._prepareEvent(e,n,r,i).then(f=>{if(f===null)throw this.recordDroppedEvent("event_processor",h),oo("An event processor returned `null`, will not send event.");if(n.data&&n.data.__sentry__===!0)return f;const E=yy(this,s,f,n);return _y(E,u)}).then(f=>{if(f===null){if(this.recordDroppedEvent("before_send",h),a){const T=1+(e.spans||[]).length;this.recordDroppedEvent("before_send","span",T)}throw oo(`${u} returned \`null\`, will not send event.`)}const p=r.getSession()||i.getSession();if(c&&p&&this._updateSessionFromEvent(p,f),a){const m=f.sdkProcessingMetadata?.spanCountBeforeProcessing||0,T=f.spans?f.spans.length:0,N=m-T;N>0&&this.recordDroppedEvent("before_send","span",N)}const E=f.transaction_info;if(a&&E&&f.transaction!==e.transaction){const m="custom";f.transaction_info={...E,source:m}}return this.sendEvent(f,n),f}).then(null,f=>{throw ru(f)||nu(f)?f:(this.captureException(f,{mechanism:{handled:!1,type:"internal"},data:{__sentry__:!0},originalException:f}),Ri(`Event processing pipeline threw an error, original event will not be sent. Details have been sent as a new event.
Reason: ${f}`))})}_process(e){this._numProcessing++,e.then(n=>(this._numProcessing--,n),n=>(this._numProcessing--,n))}_clearOutcomes(){const e=this._outcomes;return this._outcomes={},Object.entries(e).map(([n,r])=>{const[i,s]=n.split(":");return{reason:i,category:s,quantity:r}})}_flushOutcomes(){C&&b.log("Flushing outcomes...");const e=this._clearOutcomes();if(e.length===0){C&&b.log("No outcomes to send");return}if(!this._dsn){C&&b.log("No dsn provided, will not send outcomes");return}C&&b.log("Sending outcomes:",e);const n=hy(e,this._options.tunnel&&ei(this._dsn));this.sendEnvelope(n)}}function _y(t,e){const n=`${e} must return \`null\` or a valid event.`;if(Jr(t))return t.then(r=>{if(!Or(r)&&r!==null)throw Ri(n);return r},r=>{throw Ri(`${e} rejected with ${r}`)});if(!Or(t)&&t!==null)throw Ri(n);return t}function yy(t,e,n,r){const{beforeSend:i,beforeSendTransaction:s,beforeSendSpan:o,ignoreSpans:a}=e;let c=n;if($o(c)&&i)return i(c,r);if(Ah(c)){if(o||a){const l=fy(c);if(a?.length&&Wl(l,a))return null;if(o){const u=o(l);u?c=Qr(n,py(u)):Bl()}if(c.spans){const u=[],d=c.spans;for(const f of d){if(a?.length&&Wl(f,a)){__(d,f);continue}if(o){const p=o(f);p?u.push(p):(Bl(),u.push(f))}else u.push(f)}const h=c.spans.length-u.length;h&&t.recordDroppedEvent("before_send","span",h),c.spans=u}}if(s){if(c.spans){const l=c.spans.length;c.sdkProcessingMetadata={...n.sdkProcessingMetadata,spanCountBeforeProcessing:l}}return s(c,r)}}return c}function $o(t){return t.type===void 0}function Ah(t){return t.type==="transaction"}function Ey(t){let e=0;return t.name&&(e+=t.name.length*2),e+=8,e+Ph(t.attributes)}function vy(t){let e=0;return t.message&&(e+=t.message.length*2),e+Ph(t.attributes)}function Ph(t){if(!t)return 0;let e=0;return Object.values(t).forEach(n=>{Array.isArray(n)?e+=n.length*su(n[0]):bs(n)?e+=su(n):e+=100}),e}function su(t){return typeof t=="string"?t.length*2:typeof t=="number"?8:typeof t=="boolean"?4:0}function wy(t,e){e.debug===!0&&(C?b.enable():Yn(()=>{console.warn("[Sentry] Cannot initialize SDK with `debug` option using a non-debug bundle.")})),Bt().update(e.initialScope);const r=new t(e);return by(r),r.init(),r}function by(t){Bt().setClient(t)}const Nh=Symbol.for("SentryBufferFullError");function Lh(t=100){const e=new Set;function n(){return e.size<t}function r(o){e.delete(o)}function i(o){if(!n())return Va(Nh);const a=o();return e.add(a),a.then(()=>r(a),()=>r(a)),a}function s(o){if(!e.size)return Ts(!0);const a=Promise.allSettled(Array.from(e)).then(()=>!0);if(!o)return a;const c=[a,new Promise(l=>setTimeout(()=>l(!1),o))];return Promise.race(c)}return{get $(){return Array.from(e)},add:i,drain:s}}const Sy=60*1e3;function Cy(t,e=Date.now()){const n=parseInt(`${t}`,10);if(!isNaN(n))return n*1e3;const r=Date.parse(`${t}`);return isNaN(r)?Sy:r-e}function Ty(t,e){return t[e]||t.all||0}function Iy(t,e,n=Date.now()){return Ty(t,e)>n}function ky(t,{statusCode:e,headers:n},r=Date.now()){const i={...t},s=n?.["x-sentry-rate-limits"],o=n?.["retry-after"];if(s)for(const a of s.trim().split(",")){const[c,l,,,u]=a.split(":",5),d=parseInt(c,10),h=(isNaN(d)?60:d)*1e3;if(!l)i.all=r+h;else for(const f of l.split(";"))f==="metric_bucket"?(!u||u.split(";").includes("custom"))&&(i[f]=r+h):i[f]=r+h}else o?i.all=r+Cy(o,r):e===429&&(i.all=r+60*1e3);return i}const Ry=64;function Ay(t,e,n=Lh(t.bufferSize||Ry)){let r={};const i=o=>n.drain(o);function s(o){const a=[];if(Vl(o,(d,h)=>{const f=jl(h);Iy(r,f)?t.recordDroppedEvent("ratelimit_backoff",f):a.push(d)}),a.length===0)return Promise.resolve({});const c=Jn(o[0],a),l=d=>{Vl(c,(h,f)=>{t.recordDroppedEvent(d,jl(f))})},u=()=>e({body:R_(c)}).then(d=>(d.statusCode!==void 0&&(d.statusCode<200||d.statusCode>=300)&&C&&b.warn(`Sentry responded with status code ${d.statusCode} to sent event.`),r=ky(r,d),d),d=>{throw l("network_error"),C&&b.error("Encountered error running transport request:",d),d});return n.add(u).then(d=>d,d=>{if(d===Nh)return C&&b.error("Skipped sending event because buffer is full."),l("queue_overflow"),Promise.resolve({});throw d})}return{send:s,flush:i}}function ao(t){if(!t)return{};const e=t.match(/^(([^:/?#]+):)?(\/\/([^/?#]*))?([^?#]*)(\?([^#]*))?(#(.*))?$/);if(!e)return{};const n=e[6]||"",r=e[8]||"";return{host:e[4],path:e[5],protocol:e[2],search:n,hash:r,relative:e[5]+n+r}}function Py(t){"aggregates"in t?t.attrs?.ip_address===void 0&&(t.attrs={...t.attrs,ip_address:"{{auto}}"}):t.ipAddress===void 0&&(t.ipAddress="{{auto}}")}function Ny(t,e,n=[e],r="npm"){const i=t._metadata||{};i.sdk||(i.sdk={name:`sentry.javascript.${e}`,packages:n.map(s=>({name:`${r}:@sentry/${s}`,version:en})),version:en}),t._metadata=i}const Ly=100;function on(t,e){const n=me(),r=Zr();if(!n)return;const{beforeBreadcrumb:i=null,maxBreadcrumbs:s=Ly}=n.getOptions();if(s<=0)return;const a={timestamp:Xr(),...t},c=i?Yn(()=>i(a,e)):a;c!==null&&(n.emit&&n.emit("beforeAddBreadcrumb",c,e),r.addBreadcrumb(c,s))}let ou;const Oy="FunctionToString",au=new WeakMap,Dy=(()=>({name:Oy,setupOnce(){ou=Function.prototype.toString;try{Function.prototype.toString=function(...t){const e=$a(this),n=au.has(me())&&e!==void 0?e:this;return ou.apply(n,t)}}catch{}},setup(t){au.set(t,!0)}})),My=Dy,xy=[/^Script error\.?$/,/^Javascript error: Script error\.? on line 0$/,/^ResizeObserver loop completed with undelivered notifications.$/,/^Cannot redefine property: googletag$/,/^Can't find variable: gmo$/,/^undefined is not an object \(evaluating 'a\.[A-Z]'\)$/,`can't redefine non-configurable property "solana"`,"vv().getRestrictions is not a function. (In 'vv().getRestrictions(1,a)', 'vv().getRestrictions' is undefined)","Can't find variable: _AutofillCallbackHandler",/^Non-Error promise rejection captured with value: Object Not Found Matching Id:\d+, MethodName:simulateEvent, ParamCount:\d+$/,/^Java exception was raised during method invocation$/],Fy="EventFilters",Uy=(t={})=>{let e;return{name:Fy,setup(n){const r=n.getOptions();e=cu(t,r)},processEvent(n,r,i){if(!e){const s=i.getOptions();e=cu(t,s)}return By(n,e)?null:n}}},$y=((t={})=>({...Uy(t),name:"InboundFilters"}));function cu(t={},e={}){return{allowUrls:[...t.allowUrls||[],...e.allowUrls||[]],denyUrls:[...t.denyUrls||[],...e.denyUrls||[]],ignoreErrors:[...t.ignoreErrors||[],...e.ignoreErrors||[],...t.disableErrorDefaults?[]:xy],ignoreTransactions:[...t.ignoreTransactions||[],...e.ignoreTransactions||[]]}}function By(t,e){if(t.type){if(t.type==="transaction"&&Wy(t,e.ignoreTransactions))return C&&b.warn(`Event dropped due to being matched by \`ignoreTransactions\` option.
Event: ${Jt(t)}`),!0}else{if(Hy(t,e.ignoreErrors))return C&&b.warn(`Event dropped due to being matched by \`ignoreErrors\` option.
Event: ${Jt(t)}`),!0;if(zy(t))return C&&b.warn(`Event dropped due to not having an error message, error type or stacktrace.
Event: ${Jt(t)}`),!0;if(Vy(t,e.denyUrls))return C&&b.warn(`Event dropped due to being matched by \`denyUrls\` option.
Event: ${Jt(t)}.
Url: ${Wi(t)}`),!0;if(!jy(t,e.allowUrls))return C&&b.warn(`Event dropped due to not being matched by \`allowUrls\` option.
Event: ${Jt(t)}.
Url: ${Wi(t)}`),!0}return!1}function Hy(t,e){return e?.length?Ih(t).some(n=>Cs(n,e)):!1}function Wy(t,e){if(!e?.length)return!1;const n=t.transaction;return n?Cs(n,e):!1}function Vy(t,e){if(!e?.length)return!1;const n=Wi(t);return n?Cs(n,e):!1}function jy(t,e){if(!e?.length)return!0;const n=Wi(t);return n?Cs(n,e):!0}function Gy(t=[]){for(let e=t.length-1;e>=0;e--){const n=t[e];if(n&&n.filename!=="<anonymous>"&&n.filename!=="[native code]")return n.filename||null}return null}function Wi(t){try{const n=[...t.exception?.values??[]].reverse().find(r=>r.mechanism?.parent_id===void 0&&r.stacktrace?.frames?.length)?.stacktrace?.frames;return n?Gy(n):null}catch{return C&&b.error(`Cannot extract url for event ${Jt(t)}`),null}}function zy(t){return t.exception?.values?.length?!t.message&&!t.exception.values.some(e=>e.stacktrace||e.type&&e.type!=="Error"||e.value):!1}function qy(t,e,n,r,i,s){if(!i.exception?.values||!s||!Mt(s.originalException,Error))return;const o=i.exception.values.length>0?i.exception.values[i.exception.values.length-1]:void 0;o&&(i.exception.values=Bo(t,e,r,s.originalException,n,i.exception.values,o,0))}function Bo(t,e,n,r,i,s,o,a){if(s.length>=n+1)return s;let c=[...s];if(Mt(r[i],Error)){lu(o,a);const l=t(e,r[i]),u=c.length;uu(l,i,u,a),c=Bo(t,e,n,r[i],i,[l,...c],l,u)}return Array.isArray(r.errors)&&r.errors.forEach((l,u)=>{if(Mt(l,Error)){lu(o,a);const d=t(e,l),h=c.length;uu(d,`errors[${u}]`,h,a),c=Bo(t,e,n,l,i,[d,...c],d,h)}}),c}function lu(t,e){t.mechanism={handled:!0,type:"auto.core.linked_errors",...t.mechanism,...t.type==="AggregateError"&&{is_exception_group:!0},exception_id:e}}function uu(t,e,n,r){t.mechanism={handled:!0,...t.mechanism,type:"chained",source:e,exception_id:n,parent_id:r}}function Yy(t){const e="console";hn(e,t),fn(e,Ky)}function Ky(){"console"in D&&tm.forEach(function(t){t in D.console&&we(D.console,t,function(e){return Hi[t]=e,function(...n){Ue("console",{args:n,level:t}),Hi[t]?.apply(D.console,n)}})})}function Jy(t){return t==="warn"?"warning":["fatal","error","warning","log","info","debug"].includes(t)?t:"log"}const Xy="Dedupe",Qy=(()=>{let t;return{name:Xy,processEvent(e){if(e.type)return e;try{if(eE(e,t))return C&&b.warn("Event dropped due to being a duplicate of previously captured event."),null}catch{}return t=e}}}),Zy=Qy;function eE(t,e){return e?!!(tE(t,e)||nE(t,e)):!1}function tE(t,e){const n=t.message,r=e.message;return!(!n&&!r||n&&!r||!n&&r||n!==r||!Dh(t,e)||!Oh(t,e))}function nE(t,e){const n=du(e),r=du(t);return!(!n||!r||n.type!==r.type||n.value!==r.value||!Dh(t,e)||!Oh(t,e))}function Oh(t,e){let n=Cl(t),r=Cl(e);if(!n&&!r)return!0;if(n&&!r||!n&&r||(n=n,r=r,r.length!==n.length))return!1;for(let i=0;i<r.length;i++){const s=r[i],o=n[i];if(s.filename!==o.filename||s.lineno!==o.lineno||s.colno!==o.colno||s.function!==o.function)return!1}return!0}function Dh(t,e){let n=t.fingerprint,r=e.fingerprint;if(!n&&!r)return!0;if(n&&!r||!n&&r)return!1;n=n,r=r;try{return n.join("")===r.join("")}catch{return!1}}function du(t){return t.exception?.values?.[0]}function Mh(t){if(t!==void 0)return t>=400&&t<500?"warning":t>=500?"error":void 0}const Mr=D;function rE(){return"history"in Mr&&!!Mr.history}function iE(){if(!("fetch"in Mr))return!1;try{return new Headers,new Request("data:,"),new Response,!0}catch{return!1}}function Ho(t){return t&&/^function\s+\w+\(\)\s+\{\s+\[native code\]\s+\}$/.test(t.toString())}function sE(){if(typeof EdgeRuntime=="string")return!0;if(!iE())return!1;if(Ho(Mr.fetch))return!0;let t=!1;const e=Mr.document;if(e&&typeof e.createElement=="function")try{const n=e.createElement("iframe");n.hidden=!0,e.head.appendChild(n),n.contentWindow?.fetch&&(t=Ho(n.contentWindow.fetch)),e.head.removeChild(n)}catch(n){C&&b.warn("Could not create sandbox iframe for pure fetch check, bailing to window.fetch: ",n)}return t}function oE(t,e){const n="fetch";hn(n,t),fn(n,()=>aE(void 0,e))}function aE(t,e=!1){e&&!sE()||we(D,"fetch",function(n){return function(...r){const i=new Error,{method:s,url:o}=cE(r),a={args:r,fetchData:{method:s,url:o},startTimestamp:st()*1e3,virtualError:i,headers:lE(r)};return Ue("fetch",{...a}),n.apply(D,r).then(async c=>(Ue("fetch",{...a,endTimestamp:st()*1e3,response:c}),c),c=>{if(Ue("fetch",{...a,endTimestamp:st()*1e3,error:c}),Ma(c)&&c.stack===void 0&&(c.stack=i.stack,sn(c,"framesToPop",1)),c instanceof TypeError&&(c.message==="Failed to fetch"||c.message==="Load failed"||c.message==="NetworkError when attempting to fetch resource."))try{const l=new URL(a.fetchData.url);c.message=`${c.message} (${l.host})`}catch{}throw c})}})}function Wo(t,e){return!!t&&typeof t=="object"&&!!t[e]}function hu(t){return typeof t=="string"?t:t?Wo(t,"url")?t.url:t.toString?t.toString():"":""}function cE(t){if(t.length===0)return{method:"GET",url:""};if(t.length===2){const[n,r]=t;return{url:hu(n),method:Wo(r,"method")?String(r.method).toUpperCase():"GET"}}const e=t[0];return{url:hu(e),method:Wo(e,"method")?String(e.method).toUpperCase():"GET"}}function lE(t){const[e,n]=t;try{if(typeof n=="object"&&n!==null&&"headers"in n&&n.headers)return new Headers(n.headers);if(ym(e))return new Headers(e.headers)}catch{}}function uE(){return"npm"}const Y=D;let Vo=0;function xh(){return Vo>0}function dE(){Vo++,setTimeout(()=>{Vo--})}function Mn(t,e={}){function n(i){return typeof i=="function"}if(!n(t))return t;try{const i=t.__sentry_wrapped__;if(i)return typeof i=="function"?i:t;if($a(t))return t}catch{return t}const r=function(...i){try{const s=i.map(o=>Mn(o,e));return t.apply(this,s)}catch(s){throw dE(),Um(o=>{o.addEventProcessor(a=>(e.mechanism&&(Do(a,void 0),Ln(a,e.mechanism)),a.extra={...a.extra,arguments:i},a)),X_(s)}),s}};try{for(const i in t)Object.prototype.hasOwnProperty.call(t,i)&&(r[i]=t[i])}catch{}rh(r,t),sn(t,"__sentry_wrapped__",r);try{Object.getOwnPropertyDescriptor(r,"name").configurable&&Object.defineProperty(r,"name",{get(){return t.name}})}catch{}return r}function hE(){const t=Ua(),{referrer:e}=Y.document||{},{userAgent:n}=Y.navigator||{},r={...e&&{Referer:e},...n&&{"User-Agent":n}};return{url:t,headers:r}}function ja(t,e){const n=Ga(t,e),r={type:_E(e),value:yE(e)};return n.length&&(r.stacktrace={frames:n}),r.type===void 0&&r.value===""&&(r.value="Unrecoverable error caught"),r}function fE(t,e,n,r){const s=me()?.getOptions().normalizeDepth,o=SE(e),a={__serialized__:mh(e,s)};if(o)return{exception:{values:[ja(t,o)]},extra:a};const c={exception:{values:[{type:Ss(e)?e.constructor.name:r?"UnhandledRejection":"Error",value:wE(e,{isUnhandledRejection:r})}]},extra:a};if(n){const l=Ga(t,n);l.length&&(c.exception.values[0].stacktrace={frames:l})}return c}function co(t,e){return{exception:{values:[ja(t,e)]}}}function Ga(t,e){const n=e.stacktrace||e.stack||"",r=gE(e),i=mE(e);try{return t(n,r,i)}catch{}return[]}const pE=/Minified React error #\d+;/i;function gE(t){return t&&pE.test(t.message)?1:0}function mE(t){return typeof t.framesToPop=="number"?t.framesToPop:0}function Fh(t){return typeof WebAssembly<"u"&&typeof WebAssembly.Exception<"u"?t instanceof WebAssembly.Exception:!1}function _E(t){const e=t?.name;return!e&&Fh(t)?t.message&&Array.isArray(t.message)&&t.message.length==2?t.message[0]:"WebAssembly.Exception":e}function yE(t){const e=t?.message;return Fh(t)?Array.isArray(t.message)&&t.message.length==2?t.message[1]:"wasm exception":e?e.error&&typeof e.error.message=="string"?e.error.message:e:"No error message"}function EE(t,e,n,r){const i=n?.syntheticException||void 0,s=za(t,e,i,r);return Ln(s),s.level="error",n?.event_id&&(s.event_id=n.event_id),Ts(s)}function vE(t,e,n="info",r,i){const s=r?.syntheticException||void 0,o=jo(t,e,s,i);return o.level=n,r?.event_id&&(o.event_id=r.event_id),Ts(o)}function za(t,e,n,r,i){let s;if(eh(e)&&e.error)return co(t,e.error);if(Il(e)||pm(e)){const o=e;if("stack"in e)s=co(t,e);else{const a=o.name||(Il(o)?"DOMError":"DOMException"),c=o.message?`${a}: ${o.message}`:a;s=jo(t,c,n,r),Do(s,c)}return"code"in o&&(s.tags={...s.tags,"DOMException.code":`${o.code}`}),s}return Ma(e)?co(t,e):Or(e)||Ss(e)?(s=fE(t,e,n,i),Ln(s,{synthetic:!0}),s):(s=jo(t,e,n,r),Do(s,`${e}`),Ln(s,{synthetic:!0}),s)}function jo(t,e,n,r){const i={};if(r&&n){const s=Ga(t,n);s.length&&(i.exception={values:[{value:e,stacktrace:{frames:s}}]}),Ln(i,{synthetic:!0})}if(xa(e)){const{__sentry_template_string__:s,__sentry_template_values__:o}=e;return i.logentry={message:s,params:o},i}return i.message=e,i}function wE(t,{isUnhandledRejection:e}){const n=bm(t),r=e?"promise rejection":"exception";return eh(t)?`Event \`ErrorEvent\` captured as ${r} with message \`${t.message}\``:Ss(t)?`Event \`${bE(t)}\` (type=${t.type}) captured as ${r}`:`Object captured as ${r} with keys: ${n}`}function bE(t){try{const e=Object.getPrototypeOf(t);return e?e.constructor.name:void 0}catch{}}function SE(t){for(const e in t)if(Object.prototype.hasOwnProperty.call(t,e)){const n=t[e];if(n instanceof Error)return n}}class CE extends my{constructor(e){const n=TE(e),r=Y.SENTRY_SDK_SOURCE||uE();Ny(n,"browser",["browser"],r),n._metadata?.sdk&&(n._metadata.sdk.settings={infer_ip:n.sendDefaultPii?"auto":"never",...n._metadata.sdk.settings}),super(n);const{sendDefaultPii:i,sendClientReports:s,enableLogs:o,_experiments:a,enableMetrics:c}=this._options,l=c??a?.enableMetrics??!0;Y.document&&(s||o||l)&&Y.document.addEventListener("visibilitychange",()=>{Y.document.visibilityState==="hidden"&&(s&&this._flushOutcomes(),o&&bh(this),l&&Ch(this))}),i&&this.on("beforeSendSession",Py)}eventFromException(e,n){return EE(this._options.stackParser,e,n,this._options.attachStacktrace)}eventFromMessage(e,n="info",r){return vE(this._options.stackParser,e,n,r,this._options.attachStacktrace)}_prepareEvent(e,n,r,i){return e.platform=e.platform||"javascript",super._prepareEvent(e,n,r,i)}}function TE(t){return{release:typeof __SENTRY_RELEASE__=="string"?__SENTRY_RELEASE__:Y.SENTRY_RELEASE?.id,sendClientReports:!0,parentSpanIsAlwaysRootSpan:!0,...t}}const IE=typeof __SENTRY_DEBUG__>"u"||__SENTRY_DEBUG__,he=D,kE=1e3;let fu,Go,zo;function RE(t){hn("dom",t),fn("dom",AE)}function AE(){if(!he.document)return;const t=Ue.bind(null,"dom"),e=pu(t,!0);he.document.addEventListener("click",e,!1),he.document.addEventListener("keypress",e,!1),["EventTarget","Node"].forEach(n=>{const i=he[n]?.prototype;i?.hasOwnProperty?.("addEventListener")&&(we(i,"addEventListener",function(s){return function(o,a,c){if(o==="click"||o=="keypress")try{const l=this.__sentry_instrumentation_handlers__=this.__sentry_instrumentation_handlers__||{},u=l[o]=l[o]||{refCount:0};if(!u.handler){const d=pu(t);u.handler=d,s.call(this,o,d,c)}u.refCount++}catch{}return s.call(this,o,a,c)}}),we(i,"removeEventListener",function(s){return function(o,a,c){if(o==="click"||o=="keypress")try{const l=this.__sentry_instrumentation_handlers__||{},u=l[o];u&&(u.refCount--,u.refCount<=0&&(s.call(this,o,u.handler,c),u.handler=void 0,delete l[o]),Object.keys(l).length===0&&delete this.__sentry_instrumentation_handlers__)}catch{}return s.call(this,o,a,c)}}))})}function PE(t){if(t.type!==Go)return!1;try{if(!t.target||t.target._sentryId!==zo)return!1}catch{}return!0}function NE(t,e){return t!=="keypress"?!1:e?.tagName?!(e.tagName==="INPUT"||e.tagName==="TEXTAREA"||e.isContentEditable):!0}function pu(t,e=!1){return n=>{if(!n||n._sentryCaptured)return;const r=LE(n);if(NE(n.type,r))return;sn(n,"_sentryCaptured",!0),r&&!r._sentryId&&sn(r,"_sentryId",ke());const i=n.type==="keypress"?"input":n.type;PE(n)||(t({event:n,name:i,global:e}),Go=n.type,zo=r?r._sentryId:void 0),clearTimeout(fu),fu=he.setTimeout(()=>{zo=void 0,Go=void 0},kE)}}function LE(t){try{return t.target}catch{return null}}let mi;function Uh(t){const e="history";hn(e,t),fn(e,OE)}function OE(){if(he.addEventListener("popstate",()=>{const e=he.location.href,n=mi;if(mi=e,n===e)return;Ue("history",{from:n,to:e})}),!rE())return;function t(e){return function(...n){const r=n.length>2?n[2]:void 0;if(r){const i=mi,s=DE(String(r));if(mi=s,i===s)return e.apply(this,n);Ue("history",{from:i,to:s})}return e.apply(this,n)}}we(he.history,"pushState",t),we(he.history,"replaceState",t)}function DE(t){try{return new URL(t,he.location.origin).toString()}catch{return t}}const Ai={};function ME(t){const e=Ai[t];if(e)return e;let n=he[t];if(Ho(n))return Ai[t]=n.bind(he);const r=he.document;if(r&&typeof r.createElement=="function")try{const i=r.createElement("iframe");i.hidden=!0,r.head.appendChild(i);const s=i.contentWindow;s?.[t]&&(n=s[t]),r.head.removeChild(i)}catch(i){IE&&b.warn(`Could not create sandbox iframe for ${t} check, bailing to window.${t}: `,i)}return n&&(Ai[t]=n.bind(he))}function xE(t){Ai[t]=void 0}const _r="__sentry_xhr_v3__";function FE(t){hn("xhr",t),fn("xhr",UE)}function UE(){if(!he.XMLHttpRequest)return;const t=XMLHttpRequest.prototype;t.open=new Proxy(t.open,{apply(e,n,r){const i=new Error,s=st()*1e3,o=it(r[0])?r[0].toUpperCase():void 0,a=$E(r[1]);if(!o||!a)return e.apply(n,r);n[_r]={method:o,url:a,request_headers:{}},o==="POST"&&a.match(/sentry_key/)&&(n.__sentry_own_request__=!0);const c=()=>{const l=n[_r];if(l&&n.readyState===4){try{l.status_code=n.status}catch{}const u={endTimestamp:st()*1e3,startTimestamp:s,xhr:n,virtualError:i};Ue("xhr",u)}};return"onreadystatechange"in n&&typeof n.onreadystatechange=="function"?n.onreadystatechange=new Proxy(n.onreadystatechange,{apply(l,u,d){return c(),l.apply(u,d)}}):n.addEventListener("readystatechange",c),n.setRequestHeader=new Proxy(n.setRequestHeader,{apply(l,u,d){const[h,f]=d,p=u[_r];return p&&it(h)&&it(f)&&(p.request_headers[h.toLowerCase()]=f),l.apply(u,d)}}),e.apply(n,r)}}),t.send=new Proxy(t.send,{apply(e,n,r){const i=n[_r];if(!i)return e.apply(n,r);r[0]!==void 0&&(i.body=r[0]);const s={startTimestamp:st()*1e3,xhr:n};return Ue("xhr",s),e.apply(n,r)}})}function $E(t){if(it(t))return t;try{return t.toString()}catch{}}const BE=40;function HE(t,e=ME("fetch")){let n=0,r=0;async function i(s){const o=s.body.length;n+=o,r++;const a={body:s.body,method:"POST",referrerPolicy:"strict-origin",headers:t.headers,keepalive:n<=6e4&&r<15,...t.fetchOptions};try{const c=await e(t.url,a);return{statusCode:c.status,headers:{"x-sentry-rate-limits":c.headers.get("X-Sentry-Rate-Limits"),"retry-after":c.headers.get("Retry-After")}}}catch(c){throw xE("fetch"),c}finally{n-=o,r--}}return Ay(t,i,Lh(t.bufferSize||BE))}const WE=30,VE=50;function qo(t,e,n,r){const i={filename:t,function:e==="<anonymous>"?rn:e,in_app:!0};return n!==void 0&&(i.lineno=n),r!==void 0&&(i.colno=r),i}const jE=/^\s*at (\S+?)(?::(\d+))(?::(\d+))\s*$/i,GE=/^\s*at (?:(.+?\)(?: \[.+\])?|.*?) ?\((?:address at )?)?(?:async )?((?:<anonymous>|[-a-z]+:|.*bundle|\/)?.*?)(?::(\d+))?(?::(\d+))?\)?\s*$/i,zE=/\((\S*)(?::(\d+))(?::(\d+))\)/,qE=/at (.+?) ?\(data:(.+?),/,YE=t=>{const e=t.match(qE);if(e)return{filename:`<data:${e[2]}>`,function:e[1]};const n=jE.exec(t);if(n){const[,i,s,o]=n;return qo(i,rn,+s,+o)}const r=GE.exec(t);if(r){if(r[2]&&r[2].indexOf("eval")===0){const a=zE.exec(r[2]);a&&(r[2]=a[1],r[3]=a[2],r[4]=a[3])}const[s,o]=$h(r[1]||rn,r[2]);return qo(o,s,r[3]?+r[3]:void 0,r[4]?+r[4]:void 0)}},KE=[WE,YE],JE=/^\s*(.*?)(?:\((.*?)\))?(?:^|@)?((?:[-a-z]+)?:\/.*?|\[native code\]|[^@]*(?:bundle|\d+\.js)|\/[\w\-. /=]+)(?::(\d+))?(?::(\d+))?\s*$/i,XE=/(\S+) line (\d+)(?: > eval line \d+)* > eval/i,QE=t=>{const e=JE.exec(t);if(e){if(e[3]&&e[3].indexOf(" > eval")>-1){const s=XE.exec(e[3]);s&&(e[1]=e[1]||"eval",e[3]=s[1],e[4]=s[2],e[5]="")}let r=e[3],i=e[1]||rn;return[i,r]=$h(i,r),qo(r,i,e[4]?+e[4]:void 0,e[5]?+e[5]:void 0)}},ZE=[VE,QE],ev=[KE,ZE],tv=Xd(...ev),$h=(t,e)=>{const n=t.indexOf("safari-extension")!==-1,r=t.indexOf("safari-web-extension")!==-1;return n||r?[t.indexOf("@")!==-1?t.split("@")[0]:rn,n?`safari-extension:${e}`:`safari-web-extension:${e}`]:[t,e]},Is=typeof __SENTRY_DEBUG__>"u"||__SENTRY_DEBUG__,_i=1024,nv="Breadcrumbs",rv=((t={})=>{const e={console:!0,dom:!0,fetch:!0,history:!0,sentry:!0,xhr:!0,...t};return{name:nv,setup(n){e.console&&Yy(av(n)),e.dom&&RE(ov(n,e.dom)),e.xhr&&FE(cv(n)),e.fetch&&oE(lv(n)),e.history&&Uh(uv(n)),e.sentry&&n.on("beforeSendEvent",sv(n))}}}),iv=rv;function sv(t){return function(n){me()===t&&on({category:`sentry.${n.type==="transaction"?"transaction":"event"}`,event_id:n.event_id,level:n.level,message:Jt(n)},{event:n})}}function ov(t,e){return function(r){if(me()!==t)return;let i,s,o=typeof e=="object"?e.serializeAttribute:void 0,a=typeof e=="object"&&typeof e.maxStringLength=="number"?e.maxStringLength:void 0;a&&a>_i&&(Is&&b.warn(`\`dom.maxStringLength\` cannot exceed ${_i}, but a value of ${a} was configured. Sentry will use ${_i} instead.`),a=_i),typeof o=="string"&&(o=[o]);try{const l=r.event,u=dv(l)?l.target:l;i=nh(u,{keyAttrs:o,maxStringLength:a}),s=wm(u)}catch{i="<unknown>"}if(i.length===0)return;const c={category:`ui.${r.name}`,message:i};s&&(c.data={"ui.component_name":s}),on(c,{event:r.event,name:r.name,global:r.global})}}function av(t){return function(n){if(me()!==t)return;const r={category:"console",data:{arguments:n.args,logger:"console"},level:Jy(n.level),message:Al(n.args," ")};if(n.level==="assert")if(n.args[0]===!1)r.message=`Assertion failed: ${Al(n.args.slice(1)," ")||"console.assert"}`,r.data.arguments=n.args.slice(1);else return;on(r,{input:n.args,level:n.level})}}function cv(t){return function(n){if(me()!==t)return;const{startTimestamp:r,endTimestamp:i}=n,s=n.xhr[_r];if(!r||!i||!s)return;const{method:o,url:a,status_code:c,body:l}=s,u={method:o,url:a,status_code:c},d={xhr:n.xhr,input:l,startTimestamp:r,endTimestamp:i},h={category:"xhr",data:u,type:"http",level:Mh(c)};t.emit("beforeOutgoingRequestBreadcrumb",h,d),on(h,d)}}function lv(t){return function(n){if(me()!==t)return;const{startTimestamp:r,endTimestamp:i}=n;if(i&&!(n.fetchData.url.match(/sentry_key/)&&n.fetchData.method==="POST"))if(n.fetchData.method,n.fetchData.url,n.error){const s=n.fetchData,o={data:n.error,input:n.args,startTimestamp:r,endTimestamp:i},a={category:"fetch",data:s,level:"error",type:"http"};t.emit("beforeOutgoingRequestBreadcrumb",a,o),on(a,o)}else{const s=n.response,o={...n.fetchData,status_code:s?.status};n.fetchData.request_body_size,n.fetchData.response_body_size,s?.status;const a={input:n.args,response:s,startTimestamp:r,endTimestamp:i},c={category:"fetch",data:o,type:"http",level:Mh(o.status_code)};t.emit("beforeOutgoingRequestBreadcrumb",c,a),on(c,a)}}}function uv(t){return function(n){if(me()!==t)return;let r=n.from,i=n.to;const s=ao(Y.location.href);let o=r?ao(r):void 0;const a=ao(i);o?.path||(o=s),s.protocol===a.protocol&&s.host===a.host&&(i=a.relative),s.protocol===o.protocol&&s.host===o.host&&(r=o.relative),on({category:"navigation",data:{from:r,to:i}})}}function dv(t){return!!t&&!!t.target}const hv=["EventTarget","Window","Node","ApplicationCache","AudioTrackList","BroadcastChannel","ChannelMergerNode","CryptoOperation","EventSource","FileReader","HTMLUnknownElement","IDBDatabase","IDBRequest","IDBTransaction","KeyOperation","MediaController","MessagePort","ModalWindow","Notification","SVGElementInstance","Screen","SharedWorker","TextTrack","TextTrackCue","TextTrackList","WebSocket","WebSocketWorker","Worker","XMLHttpRequest","XMLHttpRequestEventTarget","XMLHttpRequestUpload"],fv="BrowserApiErrors",pv=((t={})=>{const e={XMLHttpRequest:!0,eventTarget:!0,requestAnimationFrame:!0,setInterval:!0,setTimeout:!0,unregisterOriginalCallbacks:!1,...t};return{name:fv,setupOnce(){e.setTimeout&&we(Y,"setTimeout",gu),e.setInterval&&we(Y,"setInterval",gu),e.requestAnimationFrame&&we(Y,"requestAnimationFrame",mv),e.XMLHttpRequest&&"XMLHttpRequest"in Y&&we(XMLHttpRequest.prototype,"send",_v);const n=e.eventTarget;n&&(Array.isArray(n)?n:hv).forEach(i=>yv(i,e))}}}),gv=pv;function gu(t){return function(...e){const n=e[0];return e[0]=Mn(n,{mechanism:{handled:!1,type:`auto.browser.browserapierrors.${Dt(t)}`}}),t.apply(this,e)}}function mv(t){return function(e){return t.apply(this,[Mn(e,{mechanism:{data:{handler:Dt(t)},handled:!1,type:"auto.browser.browserapierrors.requestAnimationFrame"}})])}}function _v(t){return function(...e){const n=this;return["onload","onerror","onprogress","onreadystatechange"].forEach(i=>{i in n&&typeof n[i]=="function"&&we(n,i,function(s){const o={mechanism:{data:{handler:Dt(s)},handled:!1,type:`auto.browser.browserapierrors.xhr.${i}`}},a=$a(s);return a&&(o.mechanism.data.handler=Dt(a)),Mn(s,o)})}),t.apply(this,e)}}function yv(t,e){const r=Y[t]?.prototype;r?.hasOwnProperty?.("addEventListener")&&(we(r,"addEventListener",function(i){return function(s,o,a){try{Ev(o)&&(o.handleEvent=Mn(o.handleEvent,{mechanism:{data:{handler:Dt(o),target:t},handled:!1,type:"auto.browser.browserapierrors.handleEvent"}}))}catch{}return e.unregisterOriginalCallbacks&&vv(this,s,o),i.apply(this,[s,Mn(o,{mechanism:{data:{handler:Dt(o),target:t},handled:!1,type:"auto.browser.browserapierrors.addEventListener"}}),a])}}),we(r,"removeEventListener",function(i){return function(s,o,a){try{const c=o.__sentry_wrapped__;c&&i.call(this,s,c,a)}catch{}return i.call(this,s,o,a)}}))}function Ev(t){return typeof t.handleEvent=="function"}function vv(t,e,n){t&&typeof t=="object"&&"removeEventListener"in t&&typeof t.removeEventListener=="function"&&t.removeEventListener(e,n)}const wv=()=>({name:"BrowserSession",setupOnce(){if(typeof Y.document>"u"){Is&&b.warn("Using the `browserSessionIntegration` in non-browser environments is not supported.");return}Jl({ignoreDuration:!0}),Xl(),Uh(({from:t,to:e})=>{t!==void 0&&t!==e&&(Jl({ignoreDuration:!0}),Xl())})}}),bv="GlobalHandlers",Sv=((t={})=>{const e={onerror:!0,onunhandledrejection:!0,...t};return{name:bv,setupOnce(){Error.stackTraceLimit=50},setup(n){e.onerror&&(Tv(n),mu("onerror")),e.onunhandledrejection&&(Iv(n),mu("onunhandledrejection"))}}}),Cv=Sv;function Tv(t){um(e=>{const{stackParser:n,attachStacktrace:r}=Bh();if(me()!==t||xh())return;const{msg:i,url:s,line:o,column:a,error:c}=e,l=Av(za(n,c||i,void 0,r,!1),s,o,a);l.level="error",yh(l,{originalException:c,mechanism:{handled:!1,type:"auto.browser.global_handlers.onerror"}})})}function Iv(t){hm(e=>{const{stackParser:n,attachStacktrace:r}=Bh();if(me()!==t||xh())return;const i=kv(e),s=bs(i)?Rv(i):za(n,i,void 0,r,!0);s.level="error",yh(s,{originalException:i,mechanism:{handled:!1,type:"auto.browser.global_handlers.onunhandledrejection"}})})}function kv(t){if(bs(t))return t;try{if("reason"in t)return t.reason;if("detail"in t&&"reason"in t.detail)return t.detail.reason}catch{}return t}function Rv(t){return{exception:{values:[{type:"UnhandledRejection",value:`Non-Error promise rejection captured with value: ${String(t)}`}]}}}function Av(t,e,n,r){const i=t.exception=t.exception||{},s=i.values=i.values||[],o=s[0]=s[0]||{},a=o.stacktrace=o.stacktrace||{},c=a.frames=a.frames||[],l=r,u=n,d=Pv(e)??Ua();return c.length===0&&c.push({colno:l,filename:d,function:rn,in_app:!0,lineno:u}),t}function mu(t){Is&&b.log(`Global Handler attached: ${t}`)}function Bh(){return me()?.getOptions()||{stackParser:()=>[],attachStacktrace:!1}}function Pv(t){if(!(!it(t)||t.length===0)){if(t.startsWith("data:")){const e=t.match(/^data:([^;]+)/),n=e?e[1]:"text/javascript",r=t.includes("base64,");return`<data:${n}${r?",base64":""}>`}return t}}const Nv=()=>({name:"HttpContext",preprocessEvent(t){if(!Y.navigator&&!Y.location&&!Y.document)return;const e=hE(),n={...e.headers,...t.request?.headers};t.request={...e,...t.request,headers:n}}}),Lv="cause",Ov=5,Dv="LinkedErrors",Mv=((t={})=>{const e=t.limit||Ov,n=t.key||Lv;return{name:Dv,preprocessEvent(r,i,s){const o=s.getOptions();qy(ja,o.stackParser,n,e,r,i)}}}),xv=Mv;function Fv(){return Uv()?(Is&&Yn(()=>{console.error("[Sentry] You cannot use Sentry.init() in a browser extension, see: https://docs.sentry.io/platforms/javascript/best-practices/browser-extensions/")}),!0):!1}function Uv(){if(typeof Y.window>"u")return!1;const t=Y;if(t.nw||!(t.chrome||t.browser)?.runtime?.id)return!1;const n=Ua(),r=["chrome-extension","moz-extension","ms-browser-extension","safari-web-extension"];return!(Y===Y.top&&r.some(s=>n.startsWith(`${s}://`)))}function $v(t){return[$y(),My(),gv(),iv(),Cv(),xv(),Zy(),Nv(),wv()]}function Bv(t={}){const e=!t.skipBrowserExtensionCheck&&Fv();let n=t.defaultIntegrations==null?$v():t.defaultIntegrations;const r={...t,enabled:e?!1:t.enabled,stackParser:cm(t.stackParser||tv),integrations:iy({integrations:t.integrations,defaultIntegrations:n}),transport:t.transport||HE};return wy(CE,r)}const Hv="https://adc1b5518c6a55273a1398d1b8b9cd3e@o4510415124496384.ingest.de.sentry.io/4510415129083984";Bv({dsn:Hv,sendDefaultPii:!0});/**
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
 */const Wv=()=>{};var _u={};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Hh={NODE_ADMIN:!1,SDK_VERSION:"${JSCORE_VERSION}"};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const g=function(t,e){if(!t)throw Xn(e)},Xn=function(t){return new Error("Firebase Database ("+Hh.SDK_VERSION+") INTERNAL ASSERT FAILED: "+t)};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Wh=function(t){const e=[];let n=0;for(let r=0;r<t.length;r++){let i=t.charCodeAt(r);i<128?e[n++]=i:i<2048?(e[n++]=i>>6|192,e[n++]=i&63|128):(i&64512)===55296&&r+1<t.length&&(t.charCodeAt(r+1)&64512)===56320?(i=65536+((i&1023)<<10)+(t.charCodeAt(++r)&1023),e[n++]=i>>18|240,e[n++]=i>>12&63|128,e[n++]=i>>6&63|128,e[n++]=i&63|128):(e[n++]=i>>12|224,e[n++]=i>>6&63|128,e[n++]=i&63|128)}return e},Vv=function(t){const e=[];let n=0,r=0;for(;n<t.length;){const i=t[n++];if(i<128)e[r++]=String.fromCharCode(i);else if(i>191&&i<224){const s=t[n++];e[r++]=String.fromCharCode((i&31)<<6|s&63)}else if(i>239&&i<365){const s=t[n++],o=t[n++],a=t[n++],c=((i&7)<<18|(s&63)<<12|(o&63)<<6|a&63)-65536;e[r++]=String.fromCharCode(55296+(c>>10)),e[r++]=String.fromCharCode(56320+(c&1023))}else{const s=t[n++],o=t[n++];e[r++]=String.fromCharCode((i&15)<<12|(s&63)<<6|o&63)}}return e.join("")},ks={byteToCharMap_:null,charToByteMap_:null,byteToCharMapWebSafe_:null,charToByteMapWebSafe_:null,ENCODED_VALS_BASE:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",get ENCODED_VALS(){return this.ENCODED_VALS_BASE+"+/="},get ENCODED_VALS_WEBSAFE(){return this.ENCODED_VALS_BASE+"-_."},HAS_NATIVE_SUPPORT:typeof atob=="function",encodeByteArray(t,e){if(!Array.isArray(t))throw Error("encodeByteArray takes an array as a parameter");this.init_();const n=e?this.byteToCharMapWebSafe_:this.byteToCharMap_,r=[];for(let i=0;i<t.length;i+=3){const s=t[i],o=i+1<t.length,a=o?t[i+1]:0,c=i+2<t.length,l=c?t[i+2]:0,u=s>>2,d=(s&3)<<4|a>>4;let h=(a&15)<<2|l>>6,f=l&63;c||(f=64,o||(h=64)),r.push(n[u],n[d],n[h],n[f])}return r.join("")},encodeString(t,e){return this.HAS_NATIVE_SUPPORT&&!e?btoa(t):this.encodeByteArray(Wh(t),e)},decodeString(t,e){return this.HAS_NATIVE_SUPPORT&&!e?atob(t):Vv(this.decodeStringToByteArray(t,e))},decodeStringToByteArray(t,e){this.init_();const n=e?this.charToByteMapWebSafe_:this.charToByteMap_,r=[];for(let i=0;i<t.length;){const s=n[t.charAt(i++)],a=i<t.length?n[t.charAt(i)]:0;++i;const l=i<t.length?n[t.charAt(i)]:64;++i;const d=i<t.length?n[t.charAt(i)]:64;if(++i,s==null||a==null||l==null||d==null)throw new jv;const h=s<<2|a>>4;if(r.push(h),l!==64){const f=a<<4&240|l>>2;if(r.push(f),d!==64){const p=l<<6&192|d;r.push(p)}}}return r},init_(){if(!this.byteToCharMap_){this.byteToCharMap_={},this.charToByteMap_={},this.byteToCharMapWebSafe_={},this.charToByteMapWebSafe_={};for(let t=0;t<this.ENCODED_VALS.length;t++)this.byteToCharMap_[t]=this.ENCODED_VALS.charAt(t),this.charToByteMap_[this.byteToCharMap_[t]]=t,this.byteToCharMapWebSafe_[t]=this.ENCODED_VALS_WEBSAFE.charAt(t),this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[t]]=t,t>=this.ENCODED_VALS_BASE.length&&(this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(t)]=t,this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(t)]=t)}}};class jv extends Error{constructor(){super(...arguments),this.name="DecodeBase64StringError"}}const Vh=function(t){const e=Wh(t);return ks.encodeByteArray(e,!0)},Vi=function(t){return Vh(t).replace(/\./g,"")},ji=function(t){try{return ks.decodeString(t,!0)}catch(e){console.error("base64Decode failed: ",e)}return null};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Gv(t){return jh(void 0,t)}function jh(t,e){if(!(e instanceof Object))return e;switch(e.constructor){case Date:const n=e;return new Date(n.getTime());case Object:t===void 0&&(t={});break;case Array:t=[];break;default:return e}for(const n in e)!e.hasOwnProperty(n)||!zv(n)||(t[n]=jh(t[n],e[n]));return t}function zv(t){return t!=="__proto__"}/**
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
 */function Gh(){if(typeof self<"u")return self;if(typeof window<"u")return window;if(typeof global<"u")return global;throw new Error("Unable to locate global object.")}/**
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
 */const qv=()=>Gh().__FIREBASE_DEFAULTS__,Yv=()=>{if(typeof process>"u"||typeof _u>"u")return;const t=_u.__FIREBASE_DEFAULTS__;if(t)return JSON.parse(t)},Kv=()=>{if(typeof document>"u")return;let t;try{t=document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/)}catch{return}const e=t&&ji(t[1]);return e&&JSON.parse(e)},qa=()=>{try{return Wv()||qv()||Yv()||Kv()}catch(t){console.info(`Unable to get __FIREBASE_DEFAULTS__ due to: ${t}`);return}},zh=t=>qa()?.emulatorHosts?.[t],Jv=t=>{const e=zh(t);if(!e)return;const n=e.lastIndexOf(":");if(n<=0||n+1===e.length)throw new Error(`Invalid host ${e} with no separate hostname and port!`);const r=parseInt(e.substring(n+1),10);return e[0]==="["?[e.substring(1,n-1),r]:[e.substring(0,n),r]},qh=()=>qa()?.config,Yh=t=>qa()?.[`_${t}`];/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class lt{constructor(){this.reject=()=>{},this.resolve=()=>{},this.promise=new Promise((e,n)=>{this.resolve=e,this.reject=n})}wrapCallback(e){return(n,r)=>{n?this.reject(n):this.resolve(r),typeof e=="function"&&(this.promise.catch(()=>{}),e.length===1?e(n):e(n,r))}}}/**
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
 */function Qn(t){try{return(t.startsWith("http://")||t.startsWith("https://")?new URL(t).hostname:t).endsWith(".cloudworkstations.dev")}catch{return!1}}async function Kh(t){return(await fetch(t,{credentials:"include"})).ok}/**
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
 */function Xv(t,e){if(t.uid)throw new Error('The "uid" field is no longer supported by mockUserToken. Please use "sub" instead for Firebase Auth User ID.');const n={alg:"none",type:"JWT"},r=e||"demo-project",i=t.iat||0,s=t.sub||t.user_id;if(!s)throw new Error("mockUserToken must contain 'sub' or 'user_id' field!");const o={iss:`https://securetoken.google.com/${r}`,aud:r,iat:i,exp:i+3600,auth_time:i,sub:s,user_id:s,firebase:{sign_in_provider:"custom",identities:{}},...t};return[Vi(JSON.stringify(n)),Vi(JSON.stringify(o)),""].join(".")}const vr={};function Qv(){const t={prod:[],emulator:[]};for(const e of Object.keys(vr))vr[e]?t.emulator.push(e):t.prod.push(e);return t}function Zv(t){let e=document.getElementById(t),n=!1;return e||(e=document.createElement("div"),e.setAttribute("id",t),n=!0),{created:n,element:e}}let yu=!1;function Jh(t,e){if(typeof window>"u"||typeof document>"u"||!Qn(window.location.host)||vr[t]===e||vr[t]||yu)return;vr[t]=e;function n(h){return`__firebase__banner__${h}`}const r="__firebase__banner",s=Qv().prod.length>0;function o(){const h=document.getElementById(r);h&&h.remove()}function a(h){h.style.display="flex",h.style.background="#7faaf0",h.style.position="fixed",h.style.bottom="5px",h.style.left="5px",h.style.padding=".5em",h.style.borderRadius="5px",h.style.alignItems="center"}function c(h,f){h.setAttribute("width","24"),h.setAttribute("id",f),h.setAttribute("height","24"),h.setAttribute("viewBox","0 0 24 24"),h.setAttribute("fill","none"),h.style.marginLeft="-6px"}function l(){const h=document.createElement("span");return h.style.cursor="pointer",h.style.marginLeft="16px",h.style.fontSize="24px",h.innerHTML=" &times;",h.onclick=()=>{yu=!0,o()},h}function u(h,f){h.setAttribute("id",f),h.innerText="Learn more",h.href="https://firebase.google.com/docs/studio/preview-apps#preview-backend",h.setAttribute("target","__blank"),h.style.paddingLeft="5px",h.style.textDecoration="underline"}function d(){const h=Zv(r),f=n("text"),p=document.getElementById(f)||document.createElement("span"),E=n("learnmore"),m=document.getElementById(E)||document.createElement("a"),T=n("preprendIcon"),N=document.getElementById(T)||document.createElementNS("http://www.w3.org/2000/svg","svg");if(h.created){const de=h.element;a(de),u(m,E);const _=l();c(N,T),de.append(N,p,m,_),document.body.appendChild(de)}s?(p.innerText="Preview backend disconnected.",N.innerHTML=`<g clip-path="url(#clip0_6013_33858)">
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
 */function ge(){return typeof navigator<"u"&&typeof navigator.userAgent=="string"?navigator.userAgent:""}function Ya(){return typeof window<"u"&&!!(window.cordova||window.phonegap||window.PhoneGap)&&/ios|iphone|ipod|ipad|android|blackberry|iemobile/i.test(ge())}function ew(){return typeof navigator<"u"&&navigator.userAgent==="Cloudflare-Workers"}function tw(){const t=typeof chrome=="object"?chrome.runtime:typeof browser=="object"?browser.runtime:void 0;return typeof t=="object"&&t.id!==void 0}function Xh(){return typeof navigator=="object"&&navigator.product==="ReactNative"}function nw(){const t=ge();return t.indexOf("MSIE ")>=0||t.indexOf("Trident/")>=0}function rw(){return Hh.NODE_ADMIN===!0}function Ka(){try{return typeof indexedDB=="object"}catch{return!1}}function iw(){return new Promise((t,e)=>{try{let n=!0;const r="validate-browser-context-for-indexeddb-analytics-module",i=self.indexedDB.open(r);i.onsuccess=()=>{i.result.close(),n||self.indexedDB.deleteDatabase(r),t(!0)},i.onupgradeneeded=()=>{n=!1},i.onerror=()=>{e(i.error?.message||"")}}catch(n){e(n)}})}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const sw="FirebaseError";class Ht extends Error{constructor(e,n,r){super(n),this.code=e,this.customData=r,this.name=sw,Object.setPrototypeOf(this,Ht.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,Zn.prototype.create)}}class Zn{constructor(e,n,r){this.service=e,this.serviceName=n,this.errors=r}create(e,...n){const r=n[0]||{},i=`${this.service}/${e}`,s=this.errors[e],o=s?ow(s,r):"Error",a=`${this.serviceName}: ${o} (${i}).`;return new Ht(i,a,r)}}function ow(t,e){return t.replace(aw,(n,r)=>{const i=e[r];return i!=null?String(i):`<${r}?>`})}const aw=/\{\$([^}]+)}/g;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function xr(t){return JSON.parse(t)}function X(t){return JSON.stringify(t)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Qh=function(t){let e={},n={},r={},i="";try{const s=t.split(".");e=xr(ji(s[0])||""),n=xr(ji(s[1])||""),i=s[2],r=n.d||{},delete n.d}catch{}return{header:e,claims:n,data:r,signature:i}},cw=function(t){const e=Qh(t),n=e.claims;return!!n&&typeof n=="object"&&n.hasOwnProperty("iat")},lw=function(t){const e=Qh(t).claims;return typeof e=="object"&&e.admin===!0};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ke(t,e){return Object.prototype.hasOwnProperty.call(t,e)}function xn(t,e){if(Object.prototype.hasOwnProperty.call(t,e))return t[e]}function Yo(t){for(const e in t)if(Object.prototype.hasOwnProperty.call(t,e))return!1;return!0}function Gi(t,e,n){const r={};for(const i in t)Object.prototype.hasOwnProperty.call(t,i)&&(r[i]=e.call(n,t[i],i,t));return r}function an(t,e){if(t===e)return!0;const n=Object.keys(t),r=Object.keys(e);for(const i of n){if(!r.includes(i))return!1;const s=t[i],o=e[i];if(Eu(s)&&Eu(o)){if(!an(s,o))return!1}else if(s!==o)return!1}for(const i of r)if(!n.includes(i))return!1;return!0}function Eu(t){return t!==null&&typeof t=="object"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function er(t){const e=[];for(const[n,r]of Object.entries(t))Array.isArray(r)?r.forEach(i=>{e.push(encodeURIComponent(n)+"="+encodeURIComponent(i))}):e.push(encodeURIComponent(n)+"="+encodeURIComponent(r));return e.length?"&"+e.join("&"):""}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class uw{constructor(){this.chain_=[],this.buf_=[],this.W_=[],this.pad_=[],this.inbuf_=0,this.total_=0,this.blockSize=512/8,this.pad_[0]=128;for(let e=1;e<this.blockSize;++e)this.pad_[e]=0;this.reset()}reset(){this.chain_[0]=1732584193,this.chain_[1]=4023233417,this.chain_[2]=2562383102,this.chain_[3]=271733878,this.chain_[4]=3285377520,this.inbuf_=0,this.total_=0}compress_(e,n){n||(n=0);const r=this.W_;if(typeof e=="string")for(let d=0;d<16;d++)r[d]=e.charCodeAt(n)<<24|e.charCodeAt(n+1)<<16|e.charCodeAt(n+2)<<8|e.charCodeAt(n+3),n+=4;else for(let d=0;d<16;d++)r[d]=e[n]<<24|e[n+1]<<16|e[n+2]<<8|e[n+3],n+=4;for(let d=16;d<80;d++){const h=r[d-3]^r[d-8]^r[d-14]^r[d-16];r[d]=(h<<1|h>>>31)&4294967295}let i=this.chain_[0],s=this.chain_[1],o=this.chain_[2],a=this.chain_[3],c=this.chain_[4],l,u;for(let d=0;d<80;d++){d<40?d<20?(l=a^s&(o^a),u=1518500249):(l=s^o^a,u=1859775393):d<60?(l=s&o|a&(s|o),u=2400959708):(l=s^o^a,u=3395469782);const h=(i<<5|i>>>27)+l+c+u+r[d]&4294967295;c=a,a=o,o=(s<<30|s>>>2)&4294967295,s=i,i=h}this.chain_[0]=this.chain_[0]+i&4294967295,this.chain_[1]=this.chain_[1]+s&4294967295,this.chain_[2]=this.chain_[2]+o&4294967295,this.chain_[3]=this.chain_[3]+a&4294967295,this.chain_[4]=this.chain_[4]+c&4294967295}update(e,n){if(e==null)return;n===void 0&&(n=e.length);const r=n-this.blockSize;let i=0;const s=this.buf_;let o=this.inbuf_;for(;i<n;){if(o===0)for(;i<=r;)this.compress_(e,i),i+=this.blockSize;if(typeof e=="string"){for(;i<n;)if(s[o]=e.charCodeAt(i),++o,++i,o===this.blockSize){this.compress_(s),o=0;break}}else for(;i<n;)if(s[o]=e[i],++o,++i,o===this.blockSize){this.compress_(s),o=0;break}}this.inbuf_=o,this.total_+=n}digest(){const e=[];let n=this.total_*8;this.inbuf_<56?this.update(this.pad_,56-this.inbuf_):this.update(this.pad_,this.blockSize-(this.inbuf_-56));for(let i=this.blockSize-1;i>=56;i--)this.buf_[i]=n&255,n/=256;this.compress_(this.buf_);let r=0;for(let i=0;i<5;i++)for(let s=24;s>=0;s-=8)e[r]=this.chain_[i]>>s&255,++r;return e}}function dw(t,e){const n=new hw(t,e);return n.subscribe.bind(n)}class hw{constructor(e,n){this.observers=[],this.unsubscribes=[],this.observerCount=0,this.task=Promise.resolve(),this.finalized=!1,this.onNoObservers=n,this.task.then(()=>{e(this)}).catch(r=>{this.error(r)})}next(e){this.forEachObserver(n=>{n.next(e)})}error(e){this.forEachObserver(n=>{n.error(e)}),this.close(e)}complete(){this.forEachObserver(e=>{e.complete()}),this.close()}subscribe(e,n,r){let i;if(e===void 0&&n===void 0&&r===void 0)throw new Error("Missing Observer.");fw(e,["next","error","complete"])?i=e:i={next:e,error:n,complete:r},i.next===void 0&&(i.next=lo),i.error===void 0&&(i.error=lo),i.complete===void 0&&(i.complete=lo);const s=this.unsubscribeOne.bind(this,this.observers.length);return this.finalized&&this.task.then(()=>{try{this.finalError?i.error(this.finalError):i.complete()}catch{}}),this.observers.push(i),s}unsubscribeOne(e){this.observers===void 0||this.observers[e]===void 0||(delete this.observers[e],this.observerCount-=1,this.observerCount===0&&this.onNoObservers!==void 0&&this.onNoObservers(this))}forEachObserver(e){if(!this.finalized)for(let n=0;n<this.observers.length;n++)this.sendOne(n,e)}sendOne(e,n){this.task.then(()=>{if(this.observers!==void 0&&this.observers[e]!==void 0)try{n(this.observers[e])}catch(r){typeof console<"u"&&console.error&&console.error(r)}})}close(e){this.finalized||(this.finalized=!0,e!==void 0&&(this.finalError=e),this.task.then(()=>{this.observers=void 0,this.onNoObservers=void 0}))}}function fw(t,e){if(typeof t!="object"||t===null)return!1;for(const n of e)if(n in t&&typeof t[n]=="function")return!0;return!1}function lo(){}function Rs(t,e){return`${t} failed: ${e} argument `}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const pw=function(t){const e=[];let n=0;for(let r=0;r<t.length;r++){let i=t.charCodeAt(r);if(i>=55296&&i<=56319){const s=i-55296;r++,g(r<t.length,"Surrogate pair missing trail surrogate.");const o=t.charCodeAt(r)-56320;i=65536+(s<<10)+o}i<128?e[n++]=i:i<2048?(e[n++]=i>>6|192,e[n++]=i&63|128):i<65536?(e[n++]=i>>12|224,e[n++]=i>>6&63|128,e[n++]=i&63|128):(e[n++]=i>>18|240,e[n++]=i>>12&63|128,e[n++]=i>>6&63|128,e[n++]=i&63|128)}return e},As=function(t){let e=0;for(let n=0;n<t.length;n++){const r=t.charCodeAt(n);r<128?e++:r<2048?e+=2:r>=55296&&r<=56319?(e+=4,n++):e+=3}return e};/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const gw=1e3,mw=2,_w=14400*1e3,yw=.5;function Ew(t,e=gw,n=mw){const r=e*Math.pow(n,t),i=Math.round(yw*r*(Math.random()-.5)*2);return Math.min(_w,r+i)}/**
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
 */function ce(t){return t&&t._delegate?t._delegate:t}class ut{constructor(e,n,r){this.name=e,this.instanceFactory=n,this.type=r,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}setInstantiationMode(e){return this.instantiationMode=e,this}setMultipleInstances(e){return this.multipleInstances=e,this}setServiceProps(e){return this.serviceProps=e,this}setInstanceCreatedCallback(e){return this.onInstanceCreated=e,this}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Yt="[DEFAULT]";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class vw{constructor(e,n){this.name=e,this.container=n,this.component=null,this.instances=new Map,this.instancesDeferred=new Map,this.instancesOptions=new Map,this.onInitCallbacks=new Map}get(e){const n=this.normalizeInstanceIdentifier(e);if(!this.instancesDeferred.has(n)){const r=new lt;if(this.instancesDeferred.set(n,r),this.isInitialized(n)||this.shouldAutoInitialize())try{const i=this.getOrInitializeService({instanceIdentifier:n});i&&r.resolve(i)}catch{}}return this.instancesDeferred.get(n).promise}getImmediate(e){const n=this.normalizeInstanceIdentifier(e?.identifier),r=e?.optional??!1;if(this.isInitialized(n)||this.shouldAutoInitialize())try{return this.getOrInitializeService({instanceIdentifier:n})}catch(i){if(r)return null;throw i}else{if(r)return null;throw Error(`Service ${this.name} is not available`)}}getComponent(){return this.component}setComponent(e){if(e.name!==this.name)throw Error(`Mismatching Component ${e.name} for Provider ${this.name}.`);if(this.component)throw Error(`Component for ${this.name} has already been provided`);if(this.component=e,!!this.shouldAutoInitialize()){if(bw(e))try{this.getOrInitializeService({instanceIdentifier:Yt})}catch{}for(const[n,r]of this.instancesDeferred.entries()){const i=this.normalizeInstanceIdentifier(n);try{const s=this.getOrInitializeService({instanceIdentifier:i});r.resolve(s)}catch{}}}}clearInstance(e=Yt){this.instancesDeferred.delete(e),this.instancesOptions.delete(e),this.instances.delete(e)}async delete(){const e=Array.from(this.instances.values());await Promise.all([...e.filter(n=>"INTERNAL"in n).map(n=>n.INTERNAL.delete()),...e.filter(n=>"_delete"in n).map(n=>n._delete())])}isComponentSet(){return this.component!=null}isInitialized(e=Yt){return this.instances.has(e)}getOptions(e=Yt){return this.instancesOptions.get(e)||{}}initialize(e={}){const{options:n={}}=e,r=this.normalizeInstanceIdentifier(e.instanceIdentifier);if(this.isInitialized(r))throw Error(`${this.name}(${r}) has already been initialized`);if(!this.isComponentSet())throw Error(`Component ${this.name} has not been registered yet`);const i=this.getOrInitializeService({instanceIdentifier:r,options:n});for(const[s,o]of this.instancesDeferred.entries()){const a=this.normalizeInstanceIdentifier(s);r===a&&o.resolve(i)}return i}onInit(e,n){const r=this.normalizeInstanceIdentifier(n),i=this.onInitCallbacks.get(r)??new Set;i.add(e),this.onInitCallbacks.set(r,i);const s=this.instances.get(r);return s&&e(s,r),()=>{i.delete(e)}}invokeOnInitCallbacks(e,n){const r=this.onInitCallbacks.get(n);if(r)for(const i of r)try{i(e,n)}catch{}}getOrInitializeService({instanceIdentifier:e,options:n={}}){let r=this.instances.get(e);if(!r&&this.component&&(r=this.component.instanceFactory(this.container,{instanceIdentifier:ww(e),options:n}),this.instances.set(e,r),this.instancesOptions.set(e,n),this.invokeOnInitCallbacks(r,e),this.component.onInstanceCreated))try{this.component.onInstanceCreated(this.container,e,r)}catch{}return r||null}normalizeInstanceIdentifier(e=Yt){return this.component?this.component.multipleInstances?e:Yt:e}shouldAutoInitialize(){return!!this.component&&this.component.instantiationMode!=="EXPLICIT"}}function ww(t){return t===Yt?void 0:t}function bw(t){return t.instantiationMode==="EAGER"}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Sw{constructor(e){this.name=e,this.providers=new Map}addComponent(e){const n=this.getProvider(e.name);if(n.isComponentSet())throw new Error(`Component ${e.name} has already been registered with ${this.name}`);n.setComponent(e)}addOrOverwriteComponent(e){this.getProvider(e.name).isComponentSet()&&this.providers.delete(e.name),this.addComponent(e)}getProvider(e){if(this.providers.has(e))return this.providers.get(e);const n=new vw(e,this);return this.providers.set(e,n),n}getProviders(){return Array.from(this.providers.values())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var O;(function(t){t[t.DEBUG=0]="DEBUG",t[t.VERBOSE=1]="VERBOSE",t[t.INFO=2]="INFO",t[t.WARN=3]="WARN",t[t.ERROR=4]="ERROR",t[t.SILENT=5]="SILENT"})(O||(O={}));const Cw={debug:O.DEBUG,verbose:O.VERBOSE,info:O.INFO,warn:O.WARN,error:O.ERROR,silent:O.SILENT},Tw=O.INFO,Iw={[O.DEBUG]:"log",[O.VERBOSE]:"log",[O.INFO]:"info",[O.WARN]:"warn",[O.ERROR]:"error"},kw=(t,e,...n)=>{if(e<t.logLevel)return;const r=new Date().toISOString(),i=Iw[e];if(i)console[i](`[${r}]  ${t.name}:`,...n);else throw new Error(`Attempted to log a message with an invalid logType (value: ${e})`)};class Ps{constructor(e){this.name=e,this._logLevel=Tw,this._logHandler=kw,this._userLogHandler=null}get logLevel(){return this._logLevel}set logLevel(e){if(!(e in O))throw new TypeError(`Invalid value "${e}" assigned to \`logLevel\``);this._logLevel=e}setLogLevel(e){this._logLevel=typeof e=="string"?Cw[e]:e}get logHandler(){return this._logHandler}set logHandler(e){if(typeof e!="function")throw new TypeError("Value assigned to `logHandler` must be a function");this._logHandler=e}get userLogHandler(){return this._userLogHandler}set userLogHandler(e){this._userLogHandler=e}debug(...e){this._userLogHandler&&this._userLogHandler(this,O.DEBUG,...e),this._logHandler(this,O.DEBUG,...e)}log(...e){this._userLogHandler&&this._userLogHandler(this,O.VERBOSE,...e),this._logHandler(this,O.VERBOSE,...e)}info(...e){this._userLogHandler&&this._userLogHandler(this,O.INFO,...e),this._logHandler(this,O.INFO,...e)}warn(...e){this._userLogHandler&&this._userLogHandler(this,O.WARN,...e),this._logHandler(this,O.WARN,...e)}error(...e){this._userLogHandler&&this._userLogHandler(this,O.ERROR,...e),this._logHandler(this,O.ERROR,...e)}}const Rw=(t,e)=>e.some(n=>t instanceof n);let vu,wu;function Aw(){return vu||(vu=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])}function Pw(){return wu||(wu=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])}const Zh=new WeakMap,Ko=new WeakMap,ef=new WeakMap,uo=new WeakMap,Ja=new WeakMap;function Nw(t){const e=new Promise((n,r)=>{const i=()=>{t.removeEventListener("success",s),t.removeEventListener("error",o)},s=()=>{n(At(t.result)),i()},o=()=>{r(t.error),i()};t.addEventListener("success",s),t.addEventListener("error",o)});return e.then(n=>{n instanceof IDBCursor&&Zh.set(n,t)}).catch(()=>{}),Ja.set(e,t),e}function Lw(t){if(Ko.has(t))return;const e=new Promise((n,r)=>{const i=()=>{t.removeEventListener("complete",s),t.removeEventListener("error",o),t.removeEventListener("abort",o)},s=()=>{n(),i()},o=()=>{r(t.error||new DOMException("AbortError","AbortError")),i()};t.addEventListener("complete",s),t.addEventListener("error",o),t.addEventListener("abort",o)});Ko.set(t,e)}let Jo={get(t,e,n){if(t instanceof IDBTransaction){if(e==="done")return Ko.get(t);if(e==="objectStoreNames")return t.objectStoreNames||ef.get(t);if(e==="store")return n.objectStoreNames[1]?void 0:n.objectStore(n.objectStoreNames[0])}return At(t[e])},set(t,e,n){return t[e]=n,!0},has(t,e){return t instanceof IDBTransaction&&(e==="done"||e==="store")?!0:e in t}};function Ow(t){Jo=t(Jo)}function Dw(t){return t===IDBDatabase.prototype.transaction&&!("objectStoreNames"in IDBTransaction.prototype)?function(e,...n){const r=t.call(ho(this),e,...n);return ef.set(r,e.sort?e.sort():[e]),At(r)}:Pw().includes(t)?function(...e){return t.apply(ho(this),e),At(Zh.get(this))}:function(...e){return At(t.apply(ho(this),e))}}function Mw(t){return typeof t=="function"?Dw(t):(t instanceof IDBTransaction&&Lw(t),Rw(t,Aw())?new Proxy(t,Jo):t)}function At(t){if(t instanceof IDBRequest)return Nw(t);if(uo.has(t))return uo.get(t);const e=Mw(t);return e!==t&&(uo.set(t,e),Ja.set(e,t)),e}const ho=t=>Ja.get(t);function xw(t,e,{blocked:n,upgrade:r,blocking:i,terminated:s}={}){const o=indexedDB.open(t,e),a=At(o);return r&&o.addEventListener("upgradeneeded",c=>{r(At(o.result),c.oldVersion,c.newVersion,At(o.transaction),c)}),n&&o.addEventListener("blocked",c=>n(c.oldVersion,c.newVersion,c)),a.then(c=>{s&&c.addEventListener("close",()=>s()),i&&c.addEventListener("versionchange",l=>i(l.oldVersion,l.newVersion,l))}).catch(()=>{}),a}const Fw=["get","getKey","getAll","getAllKeys","count"],Uw=["put","add","delete","clear"],fo=new Map;function bu(t,e){if(!(t instanceof IDBDatabase&&!(e in t)&&typeof e=="string"))return;if(fo.get(e))return fo.get(e);const n=e.replace(/FromIndex$/,""),r=e!==n,i=Uw.includes(n);if(!(n in(r?IDBIndex:IDBObjectStore).prototype)||!(i||Fw.includes(n)))return;const s=async function(o,...a){const c=this.transaction(o,i?"readwrite":"readonly");let l=c.store;return r&&(l=l.index(a.shift())),(await Promise.all([l[n](...a),i&&c.done]))[0]};return fo.set(e,s),s}Ow(t=>({...t,get:(e,n,r)=>bu(e,n)||t.get(e,n,r),has:(e,n)=>!!bu(e,n)||t.has(e,n)}));/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class $w{constructor(e){this.container=e}getPlatformInfoString(){return this.container.getProviders().map(n=>{if(Bw(n)){const r=n.getImmediate();return`${r.library}/${r.version}`}else return null}).filter(n=>n).join(" ")}}function Bw(t){return t.getComponent()?.type==="VERSION"}const Xo="@firebase/app",Su="0.14.4";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const dt=new Ps("@firebase/app"),Hw="@firebase/app-compat",Ww="@firebase/analytics-compat",Vw="@firebase/analytics",jw="@firebase/app-check-compat",Gw="@firebase/app-check",zw="@firebase/auth",qw="@firebase/auth-compat",Yw="@firebase/database",Kw="@firebase/data-connect",Jw="@firebase/database-compat",Xw="@firebase/functions",Qw="@firebase/functions-compat",Zw="@firebase/installations",eb="@firebase/installations-compat",tb="@firebase/messaging",nb="@firebase/messaging-compat",rb="@firebase/performance",ib="@firebase/performance-compat",sb="@firebase/remote-config",ob="@firebase/remote-config-compat",ab="@firebase/storage",cb="@firebase/storage-compat",lb="@firebase/firestore",ub="@firebase/ai",db="@firebase/firestore-compat",hb="firebase",fb="12.4.0";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Qo="[DEFAULT]",pb={[Xo]:"fire-core",[Hw]:"fire-core-compat",[Vw]:"fire-analytics",[Ww]:"fire-analytics-compat",[Gw]:"fire-app-check",[jw]:"fire-app-check-compat",[zw]:"fire-auth",[qw]:"fire-auth-compat",[Yw]:"fire-rtdb",[Kw]:"fire-data-connect",[Jw]:"fire-rtdb-compat",[Xw]:"fire-fn",[Qw]:"fire-fn-compat",[Zw]:"fire-iid",[eb]:"fire-iid-compat",[tb]:"fire-fcm",[nb]:"fire-fcm-compat",[rb]:"fire-perf",[ib]:"fire-perf-compat",[sb]:"fire-rc",[ob]:"fire-rc-compat",[ab]:"fire-gcs",[cb]:"fire-gcs-compat",[lb]:"fire-fst",[db]:"fire-fst-compat",[ub]:"fire-vertex","fire-js":"fire-js",[hb]:"fire-js-all"};/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const zi=new Map,gb=new Map,Zo=new Map;function Cu(t,e){try{t.container.addComponent(e)}catch(n){dt.debug(`Component ${e.name} failed to register with FirebaseApp ${t.name}`,n)}}function xt(t){const e=t.name;if(Zo.has(e))return dt.debug(`There were multiple attempts to register component ${e}.`),!1;Zo.set(e,t);for(const n of zi.values())Cu(n,t);for(const n of gb.values())Cu(n,t);return!0}function ti(t,e){const n=t.container.getProvider("heartbeat").getImmediate({optional:!0});return n&&n.triggerHeartbeat(),t.container.getProvider(e)}function Oe(t){return t==null?!1:t.settings!==void 0}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const mb={"no-app":"No Firebase App '{$appName}' has been created - call initializeApp() first","bad-app-name":"Illegal App name: '{$appName}'","duplicate-app":"Firebase App named '{$appName}' already exists with different options or config","app-deleted":"Firebase App named '{$appName}' already deleted","server-app-deleted":"Firebase Server App has been deleted","no-options":"Need to provide options, when not being deployed to hosting via source.","invalid-app-argument":"firebase.{$appName}() takes either no argument or a Firebase App instance.","invalid-log-argument":"First argument to `onLog` must be null or a function.","idb-open":"Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.","idb-get":"Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.","idb-set":"Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.","idb-delete":"Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}.","finalization-registry-not-supported":"FirebaseServerApp deleteOnDeref field defined but the JS runtime does not support FinalizationRegistry.","invalid-server-app-environment":"FirebaseServerApp is not for use in browser environments."},Pt=new Zn("app","Firebase",mb);/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class _b{constructor(e,n,r){this._isDeleted=!1,this._options={...e},this._config={...n},this._name=n.name,this._automaticDataCollectionEnabled=n.automaticDataCollectionEnabled,this._container=r,this.container.addComponent(new ut("app",()=>this,"PUBLIC"))}get automaticDataCollectionEnabled(){return this.checkDestroyed(),this._automaticDataCollectionEnabled}set automaticDataCollectionEnabled(e){this.checkDestroyed(),this._automaticDataCollectionEnabled=e}get name(){return this.checkDestroyed(),this._name}get options(){return this.checkDestroyed(),this._options}get config(){return this.checkDestroyed(),this._config}get container(){return this._container}get isDeleted(){return this._isDeleted}set isDeleted(e){this._isDeleted=e}checkDestroyed(){if(this.isDeleted)throw Pt.create("app-deleted",{appName:this._name})}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const tr=fb;function tf(t,e={}){let n=t;typeof e!="object"&&(e={name:e});const r={name:Qo,automaticDataCollectionEnabled:!0,...e},i=r.name;if(typeof i!="string"||!i)throw Pt.create("bad-app-name",{appName:String(i)});if(n||(n=qh()),!n)throw Pt.create("no-options");const s=zi.get(i);if(s){if(an(n,s.options)&&an(r,s.config))return s;throw Pt.create("duplicate-app",{appName:i})}const o=new Sw(i);for(const c of Zo.values())o.addComponent(c);const a=new _b(n,r,o);return zi.set(i,a),a}function Xa(t=Qo){const e=zi.get(t);if(!e&&t===Qo&&qh())return tf();if(!e)throw Pt.create("no-app",{appName:t});return e}function ot(t,e,n){let r=pb[t]??t;n&&(r+=`-${n}`);const i=r.match(/\s|\//),s=e.match(/\s|\//);if(i||s){const o=[`Unable to register library "${r}" with version "${e}":`];i&&o.push(`library name "${r}" contains illegal characters (whitespace or "/")`),i&&s&&o.push("and"),s&&o.push(`version name "${e}" contains illegal characters (whitespace or "/")`),dt.warn(o.join(" "));return}xt(new ut(`${r}-version`,()=>({library:r,version:e}),"VERSION"))}/**
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
 */const yb="firebase-heartbeat-database",Eb=1,Fr="firebase-heartbeat-store";let po=null;function nf(){return po||(po=xw(yb,Eb,{upgrade:(t,e)=>{switch(e){case 0:try{t.createObjectStore(Fr)}catch(n){console.warn(n)}}}}).catch(t=>{throw Pt.create("idb-open",{originalErrorMessage:t.message})})),po}async function vb(t){try{const n=(await nf()).transaction(Fr),r=await n.objectStore(Fr).get(rf(t));return await n.done,r}catch(e){if(e instanceof Ht)dt.warn(e.message);else{const n=Pt.create("idb-get",{originalErrorMessage:e?.message});dt.warn(n.message)}}}async function Tu(t,e){try{const r=(await nf()).transaction(Fr,"readwrite");await r.objectStore(Fr).put(e,rf(t)),await r.done}catch(n){if(n instanceof Ht)dt.warn(n.message);else{const r=Pt.create("idb-set",{originalErrorMessage:n?.message});dt.warn(r.message)}}}function rf(t){return`${t.name}!${t.options.appId}`}/**
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
 */const wb=1024,bb=30;class Sb{constructor(e){this.container=e,this._heartbeatsCache=null;const n=this.container.getProvider("app").getImmediate();this._storage=new Tb(n),this._heartbeatsCachePromise=this._storage.read().then(r=>(this._heartbeatsCache=r,r))}async triggerHeartbeat(){try{const n=this.container.getProvider("platform-logger").getImmediate().getPlatformInfoString(),r=Iu();if(this._heartbeatsCache?.heartbeats==null&&(this._heartbeatsCache=await this._heartbeatsCachePromise,this._heartbeatsCache?.heartbeats==null)||this._heartbeatsCache.lastSentHeartbeatDate===r||this._heartbeatsCache.heartbeats.some(i=>i.date===r))return;if(this._heartbeatsCache.heartbeats.push({date:r,agent:n}),this._heartbeatsCache.heartbeats.length>bb){const i=Ib(this._heartbeatsCache.heartbeats);this._heartbeatsCache.heartbeats.splice(i,1)}return this._storage.overwrite(this._heartbeatsCache)}catch(e){dt.warn(e)}}async getHeartbeatsHeader(){try{if(this._heartbeatsCache===null&&await this._heartbeatsCachePromise,this._heartbeatsCache?.heartbeats==null||this._heartbeatsCache.heartbeats.length===0)return"";const e=Iu(),{heartbeatsToSend:n,unsentEntries:r}=Cb(this._heartbeatsCache.heartbeats),i=Vi(JSON.stringify({version:2,heartbeats:n}));return this._heartbeatsCache.lastSentHeartbeatDate=e,r.length>0?(this._heartbeatsCache.heartbeats=r,await this._storage.overwrite(this._heartbeatsCache)):(this._heartbeatsCache.heartbeats=[],this._storage.overwrite(this._heartbeatsCache)),i}catch(e){return dt.warn(e),""}}}function Iu(){return new Date().toISOString().substring(0,10)}function Cb(t,e=wb){const n=[];let r=t.slice();for(const i of t){const s=n.find(o=>o.agent===i.agent);if(s){if(s.dates.push(i.date),ku(n)>e){s.dates.pop();break}}else if(n.push({agent:i.agent,dates:[i.date]}),ku(n)>e){n.pop();break}r=r.slice(1)}return{heartbeatsToSend:n,unsentEntries:r}}class Tb{constructor(e){this.app=e,this._canUseIndexedDBPromise=this.runIndexedDBEnvironmentCheck()}async runIndexedDBEnvironmentCheck(){return Ka()?iw().then(()=>!0).catch(()=>!1):!1}async read(){if(await this._canUseIndexedDBPromise){const n=await vb(this.app);return n?.heartbeats?n:{heartbeats:[]}}else return{heartbeats:[]}}async overwrite(e){if(await this._canUseIndexedDBPromise){const r=await this.read();return Tu(this.app,{lastSentHeartbeatDate:e.lastSentHeartbeatDate??r.lastSentHeartbeatDate,heartbeats:e.heartbeats})}else return}async add(e){if(await this._canUseIndexedDBPromise){const r=await this.read();return Tu(this.app,{lastSentHeartbeatDate:e.lastSentHeartbeatDate??r.lastSentHeartbeatDate,heartbeats:[...r.heartbeats,...e.heartbeats]})}else return}}function ku(t){return Vi(JSON.stringify({version:2,heartbeats:t})).length}function Ib(t){if(t.length===0)return-1;let e=0,n=t[0].date;for(let r=1;r<t.length;r++)t[r].date<n&&(n=t[r].date,e=r);return e}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function kb(t){xt(new ut("platform-logger",e=>new $w(e),"PRIVATE")),xt(new ut("heartbeat",e=>new Sb(e),"PRIVATE")),ot(Xo,Su,t),ot(Xo,Su,"esm2020"),ot("fire-js","")}kb("");var Ru={};const Au="@firebase/database",Pu="1.1.0";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let sf="";function Rb(t){sf=t}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ab{constructor(e){this.domStorage_=e,this.prefix_="firebase:"}set(e,n){n==null?this.domStorage_.removeItem(this.prefixedName_(e)):this.domStorage_.setItem(this.prefixedName_(e),X(n))}get(e){const n=this.domStorage_.getItem(this.prefixedName_(e));return n==null?null:xr(n)}remove(e){this.domStorage_.removeItem(this.prefixedName_(e))}prefixedName_(e){return this.prefix_+e}toString(){return this.domStorage_.toString()}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Pb{constructor(){this.cache_={},this.isInMemoryStorage=!0}set(e,n){n==null?delete this.cache_[e]:this.cache_[e]=n}get(e){return Ke(this.cache_,e)?this.cache_[e]:null}remove(e){delete this.cache_[e]}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const of=function(t){try{if(typeof window<"u"&&typeof window[t]<"u"){const e=window[t];return e.setItem("firebase:sentinel","cache"),e.removeItem("firebase:sentinel"),new Ab(e)}}catch{}return new Pb},Qt=of("localStorage"),Nb=of("sessionStorage");/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const wn=new Ps("@firebase/database"),Lb=(function(){let t=1;return function(){return t++}})(),af=function(t){const e=pw(t),n=new uw;n.update(e);const r=n.digest();return ks.encodeByteArray(r)},ni=function(...t){let e="";for(let n=0;n<t.length;n++){const r=t[n];Array.isArray(r)||r&&typeof r=="object"&&typeof r.length=="number"?e+=ni.apply(null,r):typeof r=="object"?e+=X(r):e+=r,e+=" "}return e};let wr=null,Nu=!0;const Ob=function(t,e){g(!0,"Can't turn on custom loggers persistently."),wn.logLevel=O.VERBOSE,wr=wn.log.bind(wn)},ie=function(...t){if(Nu===!0&&(Nu=!1,wr===null&&Nb.get("logging_enabled")===!0&&Ob()),wr){const e=ni.apply(null,t);wr(e)}},ri=function(t){return function(...e){ie(t,...e)}},ea=function(...t){const e="FIREBASE INTERNAL ERROR: "+ni(...t);wn.error(e)},ht=function(...t){const e=`FIREBASE FATAL ERROR: ${ni(...t)}`;throw wn.error(e),new Error(e)},pe=function(...t){const e="FIREBASE WARNING: "+ni(...t);wn.warn(e)},Db=function(){typeof window<"u"&&window.location&&window.location.protocol&&window.location.protocol.indexOf("https:")!==-1&&pe("Insecure Firebase access from a secure page. Please use https in calls to new Firebase().")},Qa=function(t){return typeof t=="number"&&(t!==t||t===Number.POSITIVE_INFINITY||t===Number.NEGATIVE_INFINITY)},Mb=function(t){if(document.readyState==="complete")t();else{let e=!1;const n=function(){if(!document.body){setTimeout(n,Math.floor(10));return}e||(e=!0,t())};document.addEventListener?(document.addEventListener("DOMContentLoaded",n,!1),window.addEventListener("load",n,!1)):document.attachEvent&&(document.attachEvent("onreadystatechange",()=>{document.readyState==="complete"&&n()}),window.attachEvent("onload",n))}},Fn="[MIN_NAME]",cn="[MAX_NAME]",pn=function(t,e){if(t===e)return 0;if(t===Fn||e===cn)return-1;if(e===Fn||t===cn)return 1;{const n=Lu(t),r=Lu(e);return n!==null?r!==null?n-r===0?t.length-e.length:n-r:-1:r!==null?1:t<e?-1:1}},xb=function(t,e){return t===e?0:t<e?-1:1},ur=function(t,e){if(e&&t in e)return e[t];throw new Error("Missing required key ("+t+") in object: "+X(e))},Za=function(t){if(typeof t!="object"||t===null)return X(t);const e=[];for(const r in t)e.push(r);e.sort();let n="{";for(let r=0;r<e.length;r++)r!==0&&(n+=","),n+=X(e[r]),n+=":",n+=Za(t[e[r]]);return n+="}",n},cf=function(t,e){const n=t.length;if(n<=e)return[t];const r=[];for(let i=0;i<n;i+=e)i+e>n?r.push(t.substring(i,n)):r.push(t.substring(i,i+e));return r};function ae(t,e){for(const n in t)t.hasOwnProperty(n)&&e(n,t[n])}const lf=function(t){g(!Qa(t),"Invalid JSON number");const e=11,n=52,r=(1<<e-1)-1;let i,s,o,a,c;t===0?(s=0,o=0,i=1/t===-1/0?1:0):(i=t<0,t=Math.abs(t),t>=Math.pow(2,1-r)?(a=Math.min(Math.floor(Math.log(t)/Math.LN2),r),s=a+r,o=Math.round(t*Math.pow(2,n-a)-Math.pow(2,n))):(s=0,o=Math.round(t/Math.pow(2,1-r-n))));const l=[];for(c=n;c;c-=1)l.push(o%2?1:0),o=Math.floor(o/2);for(c=e;c;c-=1)l.push(s%2?1:0),s=Math.floor(s/2);l.push(i?1:0),l.reverse();const u=l.join("");let d="";for(c=0;c<64;c+=8){let h=parseInt(u.substr(c,8),2).toString(16);h.length===1&&(h="0"+h),d=d+h}return d.toLowerCase()},Fb=function(){return!!(typeof window=="object"&&window.chrome&&window.chrome.extension&&!/^chrome/.test(window.location.href))},Ub=function(){return typeof Windows=="object"&&typeof Windows.UI=="object"};function $b(t,e){let n="Unknown Error";t==="too_big"?n="The data requested exceeds the maximum size that can be accessed with a single request.":t==="permission_denied"?n="Client doesn't have permission to access the desired data.":t==="unavailable"&&(n="The service is unavailable");const r=new Error(t+" at "+e._path.toString()+": "+n);return r.code=t.toUpperCase(),r}const Bb=new RegExp("^-?(0*)\\d{1,10}$"),Hb=-2147483648,Wb=2147483647,Lu=function(t){if(Bb.test(t)){const e=Number(t);if(e>=Hb&&e<=Wb)return e}return null},nr=function(t){try{t()}catch(e){setTimeout(()=>{const n=e.stack||"";throw pe("Exception was thrown by user callback.",n),e},Math.floor(0))}},Vb=function(){return(typeof window=="object"&&window.navigator&&window.navigator.userAgent||"").search(/googlebot|google webmaster tools|bingbot|yahoo! slurp|baiduspider|yandexbot|duckduckbot/i)>=0},br=function(t,e){const n=setTimeout(t,e);return typeof n=="number"&&typeof Deno<"u"&&Deno.unrefTimer?Deno.unrefTimer(n):typeof n=="object"&&n.unref&&n.unref(),n};/**
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
 */class jb{constructor(e,n){this.appCheckProvider=n,this.appName=e.name,Oe(e)&&e.settings.appCheckToken&&(this.serverAppAppCheckToken=e.settings.appCheckToken),this.appCheck=n?.getImmediate({optional:!0}),this.appCheck||n?.get().then(r=>this.appCheck=r)}getToken(e){if(this.serverAppAppCheckToken){if(e)throw new Error("Attempted reuse of `FirebaseServerApp.appCheckToken` after previous usage failed.");return Promise.resolve({token:this.serverAppAppCheckToken})}return this.appCheck?this.appCheck.getToken(e):new Promise((n,r)=>{setTimeout(()=>{this.appCheck?this.getToken(e).then(n,r):n(null)},0)})}addTokenChangeListener(e){this.appCheckProvider?.get().then(n=>n.addTokenListener(e))}notifyForInvalidToken(){pe(`Provided AppCheck credentials for the app named "${this.appName}" are invalid. This usually indicates your app was not initialized correctly.`)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Gb{constructor(e,n,r){this.appName_=e,this.firebaseOptions_=n,this.authProvider_=r,this.auth_=null,this.auth_=r.getImmediate({optional:!0}),this.auth_||r.onInit(i=>this.auth_=i)}getToken(e){return this.auth_?this.auth_.getToken(e).catch(n=>n&&n.code==="auth/token-not-initialized"?(ie("Got auth/token-not-initialized error.  Treating as null token."),null):Promise.reject(n)):new Promise((n,r)=>{setTimeout(()=>{this.auth_?this.getToken(e).then(n,r):n(null)},0)})}addTokenChangeListener(e){this.auth_?this.auth_.addAuthTokenListener(e):this.authProvider_.get().then(n=>n.addAuthTokenListener(e))}removeTokenChangeListener(e){this.authProvider_.get().then(n=>n.removeAuthTokenListener(e))}notifyForInvalidToken(){let e='Provided authentication credentials for the app named "'+this.appName_+'" are invalid. This usually indicates your app was not initialized correctly. ';"credential"in this.firebaseOptions_?e+='Make sure the "credential" property provided to initializeApp() is authorized to access the specified "databaseURL" and is from the correct project.':"serviceAccount"in this.firebaseOptions_?e+='Make sure the "serviceAccount" property provided to initializeApp() is authorized to access the specified "databaseURL" and is from the correct project.':e+='Make sure the "apiKey" and "databaseURL" properties provided to initializeApp() match the values provided for your app at https://console.firebase.google.com/.',pe(e)}}class Pi{constructor(e){this.accessToken=e}getToken(e){return Promise.resolve({accessToken:this.accessToken})}addTokenChangeListener(e){e(this.accessToken)}removeTokenChangeListener(e){}notifyForInvalidToken(){}}Pi.OWNER="owner";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ec="5",uf="v",df="s",hf="r",ff="f",pf=/(console\.firebase|firebase-console-\w+\.corp|firebase\.corp)\.google\.com/,gf="ls",mf="p",ta="ac",_f="websocket",yf="long_polling";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ef{constructor(e,n,r,i,s=!1,o="",a=!1,c=!1,l=null){this.secure=n,this.namespace=r,this.webSocketOnly=i,this.nodeAdmin=s,this.persistenceKey=o,this.includeNamespaceInQueryParams=a,this.isUsingEmulator=c,this.emulatorOptions=l,this._host=e.toLowerCase(),this._domain=this._host.substr(this._host.indexOf(".")+1),this.internalHost=Qt.get("host:"+e)||this._host}isCacheableHost(){return this.internalHost.substr(0,2)==="s-"}isCustomHost(){return this._domain!=="firebaseio.com"&&this._domain!=="firebaseio-demo.com"}get host(){return this._host}set host(e){e!==this.internalHost&&(this.internalHost=e,this.isCacheableHost()&&Qt.set("host:"+this._host,this.internalHost))}toString(){let e=this.toURLString();return this.persistenceKey&&(e+="<"+this.persistenceKey+">"),e}toURLString(){const e=this.secure?"https://":"http://",n=this.includeNamespaceInQueryParams?`?ns=${this.namespace}`:"";return`${e}${this.host}/${n}`}}function zb(t){return t.host!==t.internalHost||t.isCustomHost()||t.includeNamespaceInQueryParams}function vf(t,e,n){g(typeof e=="string","typeof type must == string"),g(typeof n=="object","typeof params must == object");let r;if(e===_f)r=(t.secure?"wss://":"ws://")+t.internalHost+"/.ws?";else if(e===yf)r=(t.secure?"https://":"http://")+t.internalHost+"/.lp?";else throw new Error("Unknown connection type: "+e);zb(t)&&(n.ns=t.namespace);const i=[];return ae(n,(s,o)=>{i.push(s+"="+o)}),r+i.join("&")}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class qb{constructor(){this.counters_={}}incrementCounter(e,n=1){Ke(this.counters_,e)||(this.counters_[e]=0),this.counters_[e]+=n}get(){return Gv(this.counters_)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const go={},mo={};function tc(t){const e=t.toString();return go[e]||(go[e]=new qb),go[e]}function Yb(t,e){const n=t.toString();return mo[n]||(mo[n]=e()),mo[n]}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Kb{constructor(e){this.onMessage_=e,this.pendingResponses=[],this.currentResponseNum=0,this.closeAfterResponse=-1,this.onClose=null}closeAfter(e,n){this.closeAfterResponse=e,this.onClose=n,this.closeAfterResponse<this.currentResponseNum&&(this.onClose(),this.onClose=null)}handleResponse(e,n){for(this.pendingResponses[e]=n;this.pendingResponses[this.currentResponseNum];){const r=this.pendingResponses[this.currentResponseNum];delete this.pendingResponses[this.currentResponseNum];for(let i=0;i<r.length;++i)r[i]&&nr(()=>{this.onMessage_(r[i])});if(this.currentResponseNum===this.closeAfterResponse){this.onClose&&(this.onClose(),this.onClose=null);break}this.currentResponseNum++}}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ou="start",Jb="close",Xb="pLPCommand",Qb="pRTLPCB",wf="id",bf="pw",Sf="ser",Zb="cb",eS="seg",tS="ts",nS="d",rS="dframe",Cf=1870,Tf=30,iS=Cf-Tf,sS=25e3,oS=3e4;class yn{constructor(e,n,r,i,s,o,a){this.connId=e,this.repoInfo=n,this.applicationId=r,this.appCheckToken=i,this.authToken=s,this.transportSessionId=o,this.lastSessionId=a,this.bytesSent=0,this.bytesReceived=0,this.everConnected_=!1,this.log_=ri(e),this.stats_=tc(n),this.urlFn=c=>(this.appCheckToken&&(c[ta]=this.appCheckToken),vf(n,yf,c))}open(e,n){this.curSegmentNum=0,this.onDisconnect_=n,this.myPacketOrderer=new Kb(e),this.isClosed_=!1,this.connectTimeoutTimer_=setTimeout(()=>{this.log_("Timed out trying to connect."),this.onClosed_(),this.connectTimeoutTimer_=null},Math.floor(oS)),Mb(()=>{if(this.isClosed_)return;this.scriptTagHolder=new nc((...s)=>{const[o,a,c,l,u]=s;if(this.incrementIncomingBytes_(s),!!this.scriptTagHolder)if(this.connectTimeoutTimer_&&(clearTimeout(this.connectTimeoutTimer_),this.connectTimeoutTimer_=null),this.everConnected_=!0,o===Ou)this.id=a,this.password=c;else if(o===Jb)a?(this.scriptTagHolder.sendNewPolls=!1,this.myPacketOrderer.closeAfter(a,()=>{this.onClosed_()})):this.onClosed_();else throw new Error("Unrecognized command received: "+o)},(...s)=>{const[o,a]=s;this.incrementIncomingBytes_(s),this.myPacketOrderer.handleResponse(o,a)},()=>{this.onClosed_()},this.urlFn);const r={};r[Ou]="t",r[Sf]=Math.floor(Math.random()*1e8),this.scriptTagHolder.uniqueCallbackIdentifier&&(r[Zb]=this.scriptTagHolder.uniqueCallbackIdentifier),r[uf]=ec,this.transportSessionId&&(r[df]=this.transportSessionId),this.lastSessionId&&(r[gf]=this.lastSessionId),this.applicationId&&(r[mf]=this.applicationId),this.appCheckToken&&(r[ta]=this.appCheckToken),typeof location<"u"&&location.hostname&&pf.test(location.hostname)&&(r[hf]=ff);const i=this.urlFn(r);this.log_("Connecting via long-poll to "+i),this.scriptTagHolder.addTag(i,()=>{})})}start(){this.scriptTagHolder.startLongPoll(this.id,this.password),this.addDisconnectPingFrame(this.id,this.password)}static forceAllow(){yn.forceAllow_=!0}static forceDisallow(){yn.forceDisallow_=!0}static isAvailable(){return yn.forceAllow_?!0:!yn.forceDisallow_&&typeof document<"u"&&document.createElement!=null&&!Fb()&&!Ub()}markConnectionHealthy(){}shutdown_(){this.isClosed_=!0,this.scriptTagHolder&&(this.scriptTagHolder.close(),this.scriptTagHolder=null),this.myDisconnFrame&&(document.body.removeChild(this.myDisconnFrame),this.myDisconnFrame=null),this.connectTimeoutTimer_&&(clearTimeout(this.connectTimeoutTimer_),this.connectTimeoutTimer_=null)}onClosed_(){this.isClosed_||(this.log_("Longpoll is closing itself"),this.shutdown_(),this.onDisconnect_&&(this.onDisconnect_(this.everConnected_),this.onDisconnect_=null))}close(){this.isClosed_||(this.log_("Longpoll is being closed."),this.shutdown_())}send(e){const n=X(e);this.bytesSent+=n.length,this.stats_.incrementCounter("bytes_sent",n.length);const r=Vh(n),i=cf(r,iS);for(let s=0;s<i.length;s++)this.scriptTagHolder.enqueueSegment(this.curSegmentNum,i.length,i[s]),this.curSegmentNum++}addDisconnectPingFrame(e,n){this.myDisconnFrame=document.createElement("iframe");const r={};r[rS]="t",r[wf]=e,r[bf]=n,this.myDisconnFrame.src=this.urlFn(r),this.myDisconnFrame.style.display="none",document.body.appendChild(this.myDisconnFrame)}incrementIncomingBytes_(e){const n=X(e).length;this.bytesReceived+=n,this.stats_.incrementCounter("bytes_received",n)}}class nc{constructor(e,n,r,i){this.onDisconnect=r,this.urlFn=i,this.outstandingRequests=new Set,this.pendingSegs=[],this.currentSerial=Math.floor(Math.random()*1e8),this.sendNewPolls=!0;{this.uniqueCallbackIdentifier=Lb(),window[Xb+this.uniqueCallbackIdentifier]=e,window[Qb+this.uniqueCallbackIdentifier]=n,this.myIFrame=nc.createIFrame_();let s="";this.myIFrame.src&&this.myIFrame.src.substr(0,11)==="javascript:"&&(s='<script>document.domain="'+document.domain+'";<\/script>');const o="<html><body>"+s+"</body></html>";try{this.myIFrame.doc.open(),this.myIFrame.doc.write(o),this.myIFrame.doc.close()}catch(a){ie("frame writing exception"),a.stack&&ie(a.stack),ie(a)}}}static createIFrame_(){const e=document.createElement("iframe");if(e.style.display="none",document.body){document.body.appendChild(e);try{e.contentWindow.document||ie("No IE domain setting required")}catch{const r=document.domain;e.src="javascript:void((function(){document.open();document.domain='"+r+"';document.close();})())"}}else throw"Document body has not initialized. Wait to initialize Firebase until after the document is ready.";return e.contentDocument?e.doc=e.contentDocument:e.contentWindow?e.doc=e.contentWindow.document:e.document&&(e.doc=e.document),e}close(){this.alive=!1,this.myIFrame&&(this.myIFrame.doc.body.textContent="",setTimeout(()=>{this.myIFrame!==null&&(document.body.removeChild(this.myIFrame),this.myIFrame=null)},Math.floor(0)));const e=this.onDisconnect;e&&(this.onDisconnect=null,e())}startLongPoll(e,n){for(this.myID=e,this.myPW=n,this.alive=!0;this.newRequest_(););}newRequest_(){if(this.alive&&this.sendNewPolls&&this.outstandingRequests.size<(this.pendingSegs.length>0?2:1)){this.currentSerial++;const e={};e[wf]=this.myID,e[bf]=this.myPW,e[Sf]=this.currentSerial;let n=this.urlFn(e),r="",i=0;for(;this.pendingSegs.length>0&&this.pendingSegs[0].d.length+Tf+r.length<=Cf;){const o=this.pendingSegs.shift();r=r+"&"+eS+i+"="+o.seg+"&"+tS+i+"="+o.ts+"&"+nS+i+"="+o.d,i++}return n=n+r,this.addLongPollTag_(n,this.currentSerial),!0}else return!1}enqueueSegment(e,n,r){this.pendingSegs.push({seg:e,ts:n,d:r}),this.alive&&this.newRequest_()}addLongPollTag_(e,n){this.outstandingRequests.add(n);const r=()=>{this.outstandingRequests.delete(n),this.newRequest_()},i=setTimeout(r,Math.floor(sS)),s=()=>{clearTimeout(i),r()};this.addTag(e,s)}addTag(e,n){setTimeout(()=>{try{if(!this.sendNewPolls)return;const r=this.myIFrame.doc.createElement("script");r.type="text/javascript",r.async=!0,r.src=e,r.onload=r.onreadystatechange=function(){const i=r.readyState;(!i||i==="loaded"||i==="complete")&&(r.onload=r.onreadystatechange=null,r.parentNode&&r.parentNode.removeChild(r),n())},r.onerror=()=>{ie("Long-poll script failed to load: "+e),this.sendNewPolls=!1,this.close()},this.myIFrame.doc.body.appendChild(r)}catch{}},Math.floor(1))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const aS=16384,cS=45e3;let qi=null;typeof MozWebSocket<"u"?qi=MozWebSocket:typeof WebSocket<"u"&&(qi=WebSocket);class De{constructor(e,n,r,i,s,o,a){this.connId=e,this.applicationId=r,this.appCheckToken=i,this.authToken=s,this.keepaliveTimer=null,this.frames=null,this.totalFrames=0,this.bytesSent=0,this.bytesReceived=0,this.log_=ri(this.connId),this.stats_=tc(n),this.connURL=De.connectionURL_(n,o,a,i,r),this.nodeAdmin=n.nodeAdmin}static connectionURL_(e,n,r,i,s){const o={};return o[uf]=ec,typeof location<"u"&&location.hostname&&pf.test(location.hostname)&&(o[hf]=ff),n&&(o[df]=n),r&&(o[gf]=r),i&&(o[ta]=i),s&&(o[mf]=s),vf(e,_f,o)}open(e,n){this.onDisconnect=n,this.onMessage=e,this.log_("Websocket connecting to "+this.connURL),this.everConnected_=!1,Qt.set("previous_websocket_failure",!0);try{let r;rw(),this.mySock=new qi(this.connURL,[],r)}catch(r){this.log_("Error instantiating WebSocket.");const i=r.message||r.data;i&&this.log_(i),this.onClosed_();return}this.mySock.onopen=()=>{this.log_("Websocket connected."),this.everConnected_=!0},this.mySock.onclose=()=>{this.log_("Websocket connection was disconnected."),this.mySock=null,this.onClosed_()},this.mySock.onmessage=r=>{this.handleIncomingFrame(r)},this.mySock.onerror=r=>{this.log_("WebSocket error.  Closing connection.");const i=r.message||r.data;i&&this.log_(i),this.onClosed_()}}start(){}static forceDisallow(){De.forceDisallow_=!0}static isAvailable(){let e=!1;if(typeof navigator<"u"&&navigator.userAgent){const n=/Android ([0-9]{0,}\.[0-9]{0,})/,r=navigator.userAgent.match(n);r&&r.length>1&&parseFloat(r[1])<4.4&&(e=!0)}return!e&&qi!==null&&!De.forceDisallow_}static previouslyFailed(){return Qt.isInMemoryStorage||Qt.get("previous_websocket_failure")===!0}markConnectionHealthy(){Qt.remove("previous_websocket_failure")}appendFrame_(e){if(this.frames.push(e),this.frames.length===this.totalFrames){const n=this.frames.join("");this.frames=null;const r=xr(n);this.onMessage(r)}}handleNewFrameCount_(e){this.totalFrames=e,this.frames=[]}extractFrameCount_(e){if(g(this.frames===null,"We already have a frame buffer"),e.length<=6){const n=Number(e);if(!isNaN(n))return this.handleNewFrameCount_(n),null}return this.handleNewFrameCount_(1),e}handleIncomingFrame(e){if(this.mySock===null)return;const n=e.data;if(this.bytesReceived+=n.length,this.stats_.incrementCounter("bytes_received",n.length),this.resetKeepAlive(),this.frames!==null)this.appendFrame_(n);else{const r=this.extractFrameCount_(n);r!==null&&this.appendFrame_(r)}}send(e){this.resetKeepAlive();const n=X(e);this.bytesSent+=n.length,this.stats_.incrementCounter("bytes_sent",n.length);const r=cf(n,aS);r.length>1&&this.sendString_(String(r.length));for(let i=0;i<r.length;i++)this.sendString_(r[i])}shutdown_(){this.isClosed_=!0,this.keepaliveTimer&&(clearInterval(this.keepaliveTimer),this.keepaliveTimer=null),this.mySock&&(this.mySock.close(),this.mySock=null)}onClosed_(){this.isClosed_||(this.log_("WebSocket is closing itself"),this.shutdown_(),this.onDisconnect&&(this.onDisconnect(this.everConnected_),this.onDisconnect=null))}close(){this.isClosed_||(this.log_("WebSocket is being closed"),this.shutdown_())}resetKeepAlive(){clearInterval(this.keepaliveTimer),this.keepaliveTimer=setInterval(()=>{this.mySock&&this.sendString_("0"),this.resetKeepAlive()},Math.floor(cS))}sendString_(e){try{this.mySock.send(e)}catch(n){this.log_("Exception thrown from WebSocket.send():",n.message||n.data,"Closing connection."),setTimeout(this.onClosed_.bind(this),0)}}}De.responsesRequiredToBeHealthy=2;De.healthyTimeout=3e4;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ur{static get ALL_TRANSPORTS(){return[yn,De]}static get IS_TRANSPORT_INITIALIZED(){return this.globalTransportInitialized_}constructor(e){this.initTransports_(e)}initTransports_(e){const n=De&&De.isAvailable();let r=n&&!De.previouslyFailed();if(e.webSocketOnly&&(n||pe("wss:// URL used, but browser isn't known to support websockets.  Trying anyway."),r=!0),r)this.transports_=[De];else{const i=this.transports_=[];for(const s of Ur.ALL_TRANSPORTS)s&&s.isAvailable()&&i.push(s);Ur.globalTransportInitialized_=!0}}initialTransport(){if(this.transports_.length>0)return this.transports_[0];throw new Error("No transports available")}upgradeTransport(){return this.transports_.length>1?this.transports_[1]:null}}Ur.globalTransportInitialized_=!1;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const lS=6e4,uS=5e3,dS=10*1024,hS=100*1024,_o="t",Du="d",fS="s",Mu="r",pS="e",xu="o",Fu="a",Uu="n",$u="p",gS="h";class mS{constructor(e,n,r,i,s,o,a,c,l,u){this.id=e,this.repoInfo_=n,this.applicationId_=r,this.appCheckToken_=i,this.authToken_=s,this.onMessage_=o,this.onReady_=a,this.onDisconnect_=c,this.onKill_=l,this.lastSessionId=u,this.connectionCount=0,this.pendingDataMessages=[],this.state_=0,this.log_=ri("c:"+this.id+":"),this.transportManager_=new Ur(n),this.log_("Connection created"),this.start_()}start_(){const e=this.transportManager_.initialTransport();this.conn_=new e(this.nextTransportId_(),this.repoInfo_,this.applicationId_,this.appCheckToken_,this.authToken_,null,this.lastSessionId),this.primaryResponsesRequired_=e.responsesRequiredToBeHealthy||0;const n=this.connReceiver_(this.conn_),r=this.disconnReceiver_(this.conn_);this.tx_=this.conn_,this.rx_=this.conn_,this.secondaryConn_=null,this.isHealthy_=!1,setTimeout(()=>{this.conn_&&this.conn_.open(n,r)},Math.floor(0));const i=e.healthyTimeout||0;i>0&&(this.healthyTimeout_=br(()=>{this.healthyTimeout_=null,this.isHealthy_||(this.conn_&&this.conn_.bytesReceived>hS?(this.log_("Connection exceeded healthy timeout but has received "+this.conn_.bytesReceived+" bytes.  Marking connection healthy."),this.isHealthy_=!0,this.conn_.markConnectionHealthy()):this.conn_&&this.conn_.bytesSent>dS?this.log_("Connection exceeded healthy timeout but has sent "+this.conn_.bytesSent+" bytes.  Leaving connection alive."):(this.log_("Closing unhealthy connection after timeout."),this.close()))},Math.floor(i)))}nextTransportId_(){return"c:"+this.id+":"+this.connectionCount++}disconnReceiver_(e){return n=>{e===this.conn_?this.onConnectionLost_(n):e===this.secondaryConn_?(this.log_("Secondary connection lost."),this.onSecondaryConnectionLost_()):this.log_("closing an old connection")}}connReceiver_(e){return n=>{this.state_!==2&&(e===this.rx_?this.onPrimaryMessageReceived_(n):e===this.secondaryConn_?this.onSecondaryMessageReceived_(n):this.log_("message on old connection"))}}sendRequest(e){const n={t:"d",d:e};this.sendData_(n)}tryCleanupConnection(){this.tx_===this.secondaryConn_&&this.rx_===this.secondaryConn_&&(this.log_("cleaning up and promoting a connection: "+this.secondaryConn_.connId),this.conn_=this.secondaryConn_,this.secondaryConn_=null)}onSecondaryControl_(e){if(_o in e){const n=e[_o];n===Fu?this.upgradeIfSecondaryHealthy_():n===Mu?(this.log_("Got a reset on secondary, closing it"),this.secondaryConn_.close(),(this.tx_===this.secondaryConn_||this.rx_===this.secondaryConn_)&&this.close()):n===xu&&(this.log_("got pong on secondary."),this.secondaryResponsesRequired_--,this.upgradeIfSecondaryHealthy_())}}onSecondaryMessageReceived_(e){const n=ur("t",e),r=ur("d",e);if(n==="c")this.onSecondaryControl_(r);else if(n==="d")this.pendingDataMessages.push(r);else throw new Error("Unknown protocol layer: "+n)}upgradeIfSecondaryHealthy_(){this.secondaryResponsesRequired_<=0?(this.log_("Secondary connection is healthy."),this.isHealthy_=!0,this.secondaryConn_.markConnectionHealthy(),this.proceedWithUpgrade_()):(this.log_("sending ping on secondary."),this.secondaryConn_.send({t:"c",d:{t:$u,d:{}}}))}proceedWithUpgrade_(){this.secondaryConn_.start(),this.log_("sending client ack on secondary"),this.secondaryConn_.send({t:"c",d:{t:Fu,d:{}}}),this.log_("Ending transmission on primary"),this.conn_.send({t:"c",d:{t:Uu,d:{}}}),this.tx_=this.secondaryConn_,this.tryCleanupConnection()}onPrimaryMessageReceived_(e){const n=ur("t",e),r=ur("d",e);n==="c"?this.onControl_(r):n==="d"&&this.onDataMessage_(r)}onDataMessage_(e){this.onPrimaryResponse_(),this.onMessage_(e)}onPrimaryResponse_(){this.isHealthy_||(this.primaryResponsesRequired_--,this.primaryResponsesRequired_<=0&&(this.log_("Primary connection is healthy."),this.isHealthy_=!0,this.conn_.markConnectionHealthy()))}onControl_(e){const n=ur(_o,e);if(Du in e){const r=e[Du];if(n===gS){const i={...r};this.repoInfo_.isUsingEmulator&&(i.h=this.repoInfo_.host),this.onHandshake_(i)}else if(n===Uu){this.log_("recvd end transmission on primary"),this.rx_=this.secondaryConn_;for(let i=0;i<this.pendingDataMessages.length;++i)this.onDataMessage_(this.pendingDataMessages[i]);this.pendingDataMessages=[],this.tryCleanupConnection()}else n===fS?this.onConnectionShutdown_(r):n===Mu?this.onReset_(r):n===pS?ea("Server Error: "+r):n===xu?(this.log_("got pong on primary."),this.onPrimaryResponse_(),this.sendPingOnPrimaryIfNecessary_()):ea("Unknown control packet command: "+n)}}onHandshake_(e){const n=e.ts,r=e.v,i=e.h;this.sessionId=e.s,this.repoInfo_.host=i,this.state_===0&&(this.conn_.start(),this.onConnectionEstablished_(this.conn_,n),ec!==r&&pe("Protocol version mismatch detected"),this.tryStartUpgrade_())}tryStartUpgrade_(){const e=this.transportManager_.upgradeTransport();e&&this.startUpgrade_(e)}startUpgrade_(e){this.secondaryConn_=new e(this.nextTransportId_(),this.repoInfo_,this.applicationId_,this.appCheckToken_,this.authToken_,this.sessionId),this.secondaryResponsesRequired_=e.responsesRequiredToBeHealthy||0;const n=this.connReceiver_(this.secondaryConn_),r=this.disconnReceiver_(this.secondaryConn_);this.secondaryConn_.open(n,r),br(()=>{this.secondaryConn_&&(this.log_("Timed out trying to upgrade."),this.secondaryConn_.close())},Math.floor(lS))}onReset_(e){this.log_("Reset packet received.  New host: "+e),this.repoInfo_.host=e,this.state_===1?this.close():(this.closeConnections_(),this.start_())}onConnectionEstablished_(e,n){this.log_("Realtime connection established."),this.conn_=e,this.state_=1,this.onReady_&&(this.onReady_(n,this.sessionId),this.onReady_=null),this.primaryResponsesRequired_===0?(this.log_("Primary connection is healthy."),this.isHealthy_=!0):br(()=>{this.sendPingOnPrimaryIfNecessary_()},Math.floor(uS))}sendPingOnPrimaryIfNecessary_(){!this.isHealthy_&&this.state_===1&&(this.log_("sending ping on primary."),this.sendData_({t:"c",d:{t:$u,d:{}}}))}onSecondaryConnectionLost_(){const e=this.secondaryConn_;this.secondaryConn_=null,(this.tx_===e||this.rx_===e)&&this.close()}onConnectionLost_(e){this.conn_=null,!e&&this.state_===0?(this.log_("Realtime connection failed."),this.repoInfo_.isCacheableHost()&&(Qt.remove("host:"+this.repoInfo_.host),this.repoInfo_.internalHost=this.repoInfo_.host)):this.state_===1&&this.log_("Realtime connection lost."),this.close()}onConnectionShutdown_(e){this.log_("Connection shutdown command received. Shutting down..."),this.onKill_&&(this.onKill_(e),this.onKill_=null),this.onDisconnect_=null,this.close()}sendData_(e){if(this.state_!==1)throw"Connection is not connected";this.tx_.send(e)}close(){this.state_!==2&&(this.log_("Closing realtime connection."),this.state_=2,this.closeConnections_(),this.onDisconnect_&&(this.onDisconnect_(),this.onDisconnect_=null))}closeConnections_(){this.log_("Shutting down all connections"),this.conn_&&(this.conn_.close(),this.conn_=null),this.secondaryConn_&&(this.secondaryConn_.close(),this.secondaryConn_=null),this.healthyTimeout_&&(clearTimeout(this.healthyTimeout_),this.healthyTimeout_=null)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class If{put(e,n,r,i){}merge(e,n,r,i){}refreshAuthToken(e){}refreshAppCheckToken(e){}onDisconnectPut(e,n,r){}onDisconnectMerge(e,n,r){}onDisconnectCancel(e,n){}reportStats(e){}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class kf{constructor(e){this.allowedEvents_=e,this.listeners_={},g(Array.isArray(e)&&e.length>0,"Requires a non-empty array")}trigger(e,...n){if(Array.isArray(this.listeners_[e])){const r=[...this.listeners_[e]];for(let i=0;i<r.length;i++)r[i].callback.apply(r[i].context,n)}}on(e,n,r){this.validateEventType_(e),this.listeners_[e]=this.listeners_[e]||[],this.listeners_[e].push({callback:n,context:r});const i=this.getInitialEvent(e);i&&n.apply(r,i)}off(e,n,r){this.validateEventType_(e);const i=this.listeners_[e]||[];for(let s=0;s<i.length;s++)if(i[s].callback===n&&(!r||r===i[s].context)){i.splice(s,1);return}}validateEventType_(e){g(this.allowedEvents_.find(n=>n===e),"Unknown event: "+e)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Yi extends kf{static getInstance(){return new Yi}constructor(){super(["online"]),this.online_=!0,typeof window<"u"&&typeof window.addEventListener<"u"&&!Ya()&&(window.addEventListener("online",()=>{this.online_||(this.online_=!0,this.trigger("online",!0))},!1),window.addEventListener("offline",()=>{this.online_&&(this.online_=!1,this.trigger("online",!1))},!1))}getInitialEvent(e){return g(e==="online","Unknown event type: "+e),[this.online_]}currentlyOnline(){return this.online_}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Bu=32,Hu=768;class M{constructor(e,n){if(n===void 0){this.pieces_=e.split("/");let r=0;for(let i=0;i<this.pieces_.length;i++)this.pieces_[i].length>0&&(this.pieces_[r]=this.pieces_[i],r++);this.pieces_.length=r,this.pieceNum_=0}else this.pieces_=e,this.pieceNum_=n}toString(){let e="";for(let n=this.pieceNum_;n<this.pieces_.length;n++)this.pieces_[n]!==""&&(e+="/"+this.pieces_[n]);return e||"/"}}function P(){return new M("")}function I(t){return t.pieceNum_>=t.pieces_.length?null:t.pieces_[t.pieceNum_]}function Ft(t){return t.pieces_.length-t.pieceNum_}function U(t){let e=t.pieceNum_;return e<t.pieces_.length&&e++,new M(t.pieces_,e)}function rc(t){return t.pieceNum_<t.pieces_.length?t.pieces_[t.pieces_.length-1]:null}function _S(t){let e="";for(let n=t.pieceNum_;n<t.pieces_.length;n++)t.pieces_[n]!==""&&(e+="/"+encodeURIComponent(String(t.pieces_[n])));return e||"/"}function $r(t,e=0){return t.pieces_.slice(t.pieceNum_+e)}function Rf(t){if(t.pieceNum_>=t.pieces_.length)return null;const e=[];for(let n=t.pieceNum_;n<t.pieces_.length-1;n++)e.push(t.pieces_[n]);return new M(e,0)}function z(t,e){const n=[];for(let r=t.pieceNum_;r<t.pieces_.length;r++)n.push(t.pieces_[r]);if(e instanceof M)for(let r=e.pieceNum_;r<e.pieces_.length;r++)n.push(e.pieces_[r]);else{const r=e.split("/");for(let i=0;i<r.length;i++)r[i].length>0&&n.push(r[i])}return new M(n,0)}function R(t){return t.pieceNum_>=t.pieces_.length}function fe(t,e){const n=I(t),r=I(e);if(n===null)return e;if(n===r)return fe(U(t),U(e));throw new Error("INTERNAL ERROR: innerPath ("+e+") is not within outerPath ("+t+")")}function yS(t,e){const n=$r(t,0),r=$r(e,0);for(let i=0;i<n.length&&i<r.length;i++){const s=pn(n[i],r[i]);if(s!==0)return s}return n.length===r.length?0:n.length<r.length?-1:1}function ic(t,e){if(Ft(t)!==Ft(e))return!1;for(let n=t.pieceNum_,r=e.pieceNum_;n<=t.pieces_.length;n++,r++)if(t.pieces_[n]!==e.pieces_[r])return!1;return!0}function Te(t,e){let n=t.pieceNum_,r=e.pieceNum_;if(Ft(t)>Ft(e))return!1;for(;n<t.pieces_.length;){if(t.pieces_[n]!==e.pieces_[r])return!1;++n,++r}return!0}class ES{constructor(e,n){this.errorPrefix_=n,this.parts_=$r(e,0),this.byteLength_=Math.max(1,this.parts_.length);for(let r=0;r<this.parts_.length;r++)this.byteLength_+=As(this.parts_[r]);Af(this)}}function vS(t,e){t.parts_.length>0&&(t.byteLength_+=1),t.parts_.push(e),t.byteLength_+=As(e),Af(t)}function wS(t){const e=t.parts_.pop();t.byteLength_-=As(e),t.parts_.length>0&&(t.byteLength_-=1)}function Af(t){if(t.byteLength_>Hu)throw new Error(t.errorPrefix_+"has a key path longer than "+Hu+" bytes ("+t.byteLength_+").");if(t.parts_.length>Bu)throw new Error(t.errorPrefix_+"path specified exceeds the maximum depth that can be written ("+Bu+") or object contains a cycle "+Kt(t))}function Kt(t){return t.parts_.length===0?"":"in property '"+t.parts_.join(".")+"'"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class sc extends kf{static getInstance(){return new sc}constructor(){super(["visible"]);let e,n;typeof document<"u"&&typeof document.addEventListener<"u"&&(typeof document.hidden<"u"?(n="visibilitychange",e="hidden"):typeof document.mozHidden<"u"?(n="mozvisibilitychange",e="mozHidden"):typeof document.msHidden<"u"?(n="msvisibilitychange",e="msHidden"):typeof document.webkitHidden<"u"&&(n="webkitvisibilitychange",e="webkitHidden")),this.visible_=!0,n&&document.addEventListener(n,()=>{const r=!document[e];r!==this.visible_&&(this.visible_=r,this.trigger("visible",r))},!1)}getInitialEvent(e){return g(e==="visible","Unknown event type: "+e),[this.visible_]}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const dr=1e3,bS=300*1e3,Wu=30*1e3,SS=1.3,CS=3e4,TS="server_kill",Vu=3;class at extends If{constructor(e,n,r,i,s,o,a,c){if(super(),this.repoInfo_=e,this.applicationId_=n,this.onDataUpdate_=r,this.onConnectStatus_=i,this.onServerInfoUpdate_=s,this.authTokenProvider_=o,this.appCheckTokenProvider_=a,this.authOverride_=c,this.id=at.nextPersistentConnectionId_++,this.log_=ri("p:"+this.id+":"),this.interruptReasons_={},this.listens=new Map,this.outstandingPuts_=[],this.outstandingGets_=[],this.outstandingPutCount_=0,this.outstandingGetCount_=0,this.onDisconnectRequestQueue_=[],this.connected_=!1,this.reconnectDelay_=dr,this.maxReconnectDelay_=bS,this.securityDebugCallback_=null,this.lastSessionId=null,this.establishConnectionTimer_=null,this.visible_=!1,this.requestCBHash_={},this.requestNumber_=0,this.realtime_=null,this.authToken_=null,this.appCheckToken_=null,this.forceTokenRefresh_=!1,this.invalidAuthTokenCount_=0,this.invalidAppCheckTokenCount_=0,this.firstConnection_=!0,this.lastConnectionAttemptTime_=null,this.lastConnectionEstablishedTime_=null,c)throw new Error("Auth override specified in options, but not supported on non Node.js platforms");sc.getInstance().on("visible",this.onVisible_,this),e.host.indexOf("fblocal")===-1&&Yi.getInstance().on("online",this.onOnline_,this)}sendRequest(e,n,r){const i=++this.requestNumber_,s={r:i,a:e,b:n};this.log_(X(s)),g(this.connected_,"sendRequest call when we're not connected not allowed."),this.realtime_.sendRequest(s),r&&(this.requestCBHash_[i]=r)}get(e){this.initConnection_();const n=new lt,i={action:"g",request:{p:e._path.toString(),q:e._queryObject},onComplete:o=>{const a=o.d;o.s==="ok"?n.resolve(a):n.reject(a)}};this.outstandingGets_.push(i),this.outstandingGetCount_++;const s=this.outstandingGets_.length-1;return this.connected_&&this.sendGet_(s),n.promise}listen(e,n,r,i){this.initConnection_();const s=e._queryIdentifier,o=e._path.toString();this.log_("Listen called for "+o+" "+s),this.listens.has(o)||this.listens.set(o,new Map),g(e._queryParams.isDefault()||!e._queryParams.loadsAllData(),"listen() called for non-default but complete query"),g(!this.listens.get(o).has(s),"listen() called twice for same path/queryId.");const a={onComplete:i,hashFn:n,query:e,tag:r};this.listens.get(o).set(s,a),this.connected_&&this.sendListen_(a)}sendGet_(e){const n=this.outstandingGets_[e];this.sendRequest("g",n.request,r=>{delete this.outstandingGets_[e],this.outstandingGetCount_--,this.outstandingGetCount_===0&&(this.outstandingGets_=[]),n.onComplete&&n.onComplete(r)})}sendListen_(e){const n=e.query,r=n._path.toString(),i=n._queryIdentifier;this.log_("Listen on "+r+" for "+i);const s={p:r},o="q";e.tag&&(s.q=n._queryObject,s.t=e.tag),s.h=e.hashFn(),this.sendRequest(o,s,a=>{const c=a.d,l=a.s;at.warnOnListenWarnings_(c,n),(this.listens.get(r)&&this.listens.get(r).get(i))===e&&(this.log_("listen response",a),l!=="ok"&&this.removeListen_(r,i),e.onComplete&&e.onComplete(l,c))})}static warnOnListenWarnings_(e,n){if(e&&typeof e=="object"&&Ke(e,"w")){const r=xn(e,"w");if(Array.isArray(r)&&~r.indexOf("no_index")){const i='".indexOn": "'+n._queryParams.getIndex().toString()+'"',s=n._path.toString();pe(`Using an unspecified index. Your data will be downloaded and filtered on the client. Consider adding ${i} at ${s} to your security rules for better performance.`)}}}refreshAuthToken(e){this.authToken_=e,this.log_("Auth token refreshed"),this.authToken_?this.tryAuth():this.connected_&&this.sendRequest("unauth",{},()=>{}),this.reduceReconnectDelayIfAdminCredential_(e)}reduceReconnectDelayIfAdminCredential_(e){(e&&e.length===40||lw(e))&&(this.log_("Admin auth credential detected.  Reducing max reconnect time."),this.maxReconnectDelay_=Wu)}refreshAppCheckToken(e){this.appCheckToken_=e,this.log_("App check token refreshed"),this.appCheckToken_?this.tryAppCheck():this.connected_&&this.sendRequest("unappeck",{},()=>{})}tryAuth(){if(this.connected_&&this.authToken_){const e=this.authToken_,n=cw(e)?"auth":"gauth",r={cred:e};this.authOverride_===null?r.noauth=!0:typeof this.authOverride_=="object"&&(r.authvar=this.authOverride_),this.sendRequest(n,r,i=>{const s=i.s,o=i.d||"error";this.authToken_===e&&(s==="ok"?this.invalidAuthTokenCount_=0:this.onAuthRevoked_(s,o))})}}tryAppCheck(){this.connected_&&this.appCheckToken_&&this.sendRequest("appcheck",{token:this.appCheckToken_},e=>{const n=e.s,r=e.d||"error";n==="ok"?this.invalidAppCheckTokenCount_=0:this.onAppCheckRevoked_(n,r)})}unlisten(e,n){const r=e._path.toString(),i=e._queryIdentifier;this.log_("Unlisten called for "+r+" "+i),g(e._queryParams.isDefault()||!e._queryParams.loadsAllData(),"unlisten() called for non-default but complete query"),this.removeListen_(r,i)&&this.connected_&&this.sendUnlisten_(r,i,e._queryObject,n)}sendUnlisten_(e,n,r,i){this.log_("Unlisten on "+e+" for "+n);const s={p:e},o="n";i&&(s.q=r,s.t=i),this.sendRequest(o,s)}onDisconnectPut(e,n,r){this.initConnection_(),this.connected_?this.sendOnDisconnect_("o",e,n,r):this.onDisconnectRequestQueue_.push({pathString:e,action:"o",data:n,onComplete:r})}onDisconnectMerge(e,n,r){this.initConnection_(),this.connected_?this.sendOnDisconnect_("om",e,n,r):this.onDisconnectRequestQueue_.push({pathString:e,action:"om",data:n,onComplete:r})}onDisconnectCancel(e,n){this.initConnection_(),this.connected_?this.sendOnDisconnect_("oc",e,null,n):this.onDisconnectRequestQueue_.push({pathString:e,action:"oc",data:null,onComplete:n})}sendOnDisconnect_(e,n,r,i){const s={p:n,d:r};this.log_("onDisconnect "+e,s),this.sendRequest(e,s,o=>{i&&setTimeout(()=>{i(o.s,o.d)},Math.floor(0))})}put(e,n,r,i){this.putInternal("p",e,n,r,i)}merge(e,n,r,i){this.putInternal("m",e,n,r,i)}putInternal(e,n,r,i,s){this.initConnection_();const o={p:n,d:r};s!==void 0&&(o.h=s),this.outstandingPuts_.push({action:e,request:o,onComplete:i}),this.outstandingPutCount_++;const a=this.outstandingPuts_.length-1;this.connected_?this.sendPut_(a):this.log_("Buffering put: "+n)}sendPut_(e){const n=this.outstandingPuts_[e].action,r=this.outstandingPuts_[e].request,i=this.outstandingPuts_[e].onComplete;this.outstandingPuts_[e].queued=this.connected_,this.sendRequest(n,r,s=>{this.log_(n+" response",s),delete this.outstandingPuts_[e],this.outstandingPutCount_--,this.outstandingPutCount_===0&&(this.outstandingPuts_=[]),i&&i(s.s,s.d)})}reportStats(e){if(this.connected_){const n={c:e};this.log_("reportStats",n),this.sendRequest("s",n,r=>{if(r.s!=="ok"){const s=r.d;this.log_("reportStats","Error sending stats: "+s)}})}}onDataMessage_(e){if("r"in e){this.log_("from server: "+X(e));const n=e.r,r=this.requestCBHash_[n];r&&(delete this.requestCBHash_[n],r(e.b))}else{if("error"in e)throw"A server-side error has occurred: "+e.error;"a"in e&&this.onDataPush_(e.a,e.b)}}onDataPush_(e,n){this.log_("handleServerMessage",e,n),e==="d"?this.onDataUpdate_(n.p,n.d,!1,n.t):e==="m"?this.onDataUpdate_(n.p,n.d,!0,n.t):e==="c"?this.onListenRevoked_(n.p,n.q):e==="ac"?this.onAuthRevoked_(n.s,n.d):e==="apc"?this.onAppCheckRevoked_(n.s,n.d):e==="sd"?this.onSecurityDebugPacket_(n):ea("Unrecognized action received from server: "+X(e)+`
Are you using the latest client?`)}onReady_(e,n){this.log_("connection ready"),this.connected_=!0,this.lastConnectionEstablishedTime_=new Date().getTime(),this.handleTimestamp_(e),this.lastSessionId=n,this.firstConnection_&&this.sendConnectStats_(),this.restoreState_(),this.firstConnection_=!1,this.onConnectStatus_(!0)}scheduleConnect_(e){g(!this.realtime_,"Scheduling a connect when we're already connected/ing?"),this.establishConnectionTimer_&&clearTimeout(this.establishConnectionTimer_),this.establishConnectionTimer_=setTimeout(()=>{this.establishConnectionTimer_=null,this.establishConnection_()},Math.floor(e))}initConnection_(){!this.realtime_&&this.firstConnection_&&this.scheduleConnect_(0)}onVisible_(e){e&&!this.visible_&&this.reconnectDelay_===this.maxReconnectDelay_&&(this.log_("Window became visible.  Reducing delay."),this.reconnectDelay_=dr,this.realtime_||this.scheduleConnect_(0)),this.visible_=e}onOnline_(e){e?(this.log_("Browser went online."),this.reconnectDelay_=dr,this.realtime_||this.scheduleConnect_(0)):(this.log_("Browser went offline.  Killing connection."),this.realtime_&&this.realtime_.close())}onRealtimeDisconnect_(){if(this.log_("data client disconnected"),this.connected_=!1,this.realtime_=null,this.cancelSentTransactions_(),this.requestCBHash_={},this.shouldReconnect_()){this.visible_?this.lastConnectionEstablishedTime_&&(new Date().getTime()-this.lastConnectionEstablishedTime_>CS&&(this.reconnectDelay_=dr),this.lastConnectionEstablishedTime_=null):(this.log_("Window isn't visible.  Delaying reconnect."),this.reconnectDelay_=this.maxReconnectDelay_,this.lastConnectionAttemptTime_=new Date().getTime());const e=Math.max(0,new Date().getTime()-this.lastConnectionAttemptTime_);let n=Math.max(0,this.reconnectDelay_-e);n=Math.random()*n,this.log_("Trying to reconnect in "+n+"ms"),this.scheduleConnect_(n),this.reconnectDelay_=Math.min(this.maxReconnectDelay_,this.reconnectDelay_*SS)}this.onConnectStatus_(!1)}async establishConnection_(){if(this.shouldReconnect_()){this.log_("Making a connection attempt"),this.lastConnectionAttemptTime_=new Date().getTime(),this.lastConnectionEstablishedTime_=null;const e=this.onDataMessage_.bind(this),n=this.onReady_.bind(this),r=this.onRealtimeDisconnect_.bind(this),i=this.id+":"+at.nextConnectionId_++,s=this.lastSessionId;let o=!1,a=null;const c=function(){a?a.close():(o=!0,r())},l=function(d){g(a,"sendRequest call when we're not connected not allowed."),a.sendRequest(d)};this.realtime_={close:c,sendRequest:l};const u=this.forceTokenRefresh_;this.forceTokenRefresh_=!1;try{const[d,h]=await Promise.all([this.authTokenProvider_.getToken(u),this.appCheckTokenProvider_.getToken(u)]);o?ie("getToken() completed but was canceled"):(ie("getToken() completed. Creating connection."),this.authToken_=d&&d.accessToken,this.appCheckToken_=h&&h.token,a=new mS(i,this.repoInfo_,this.applicationId_,this.appCheckToken_,this.authToken_,e,n,r,f=>{pe(f+" ("+this.repoInfo_.toString()+")"),this.interrupt(TS)},s))}catch(d){this.log_("Failed to get token: "+d),o||(this.repoInfo_.nodeAdmin&&pe(d),c())}}}interrupt(e){ie("Interrupting connection for reason: "+e),this.interruptReasons_[e]=!0,this.realtime_?this.realtime_.close():(this.establishConnectionTimer_&&(clearTimeout(this.establishConnectionTimer_),this.establishConnectionTimer_=null),this.connected_&&this.onRealtimeDisconnect_())}resume(e){ie("Resuming connection for reason: "+e),delete this.interruptReasons_[e],Yo(this.interruptReasons_)&&(this.reconnectDelay_=dr,this.realtime_||this.scheduleConnect_(0))}handleTimestamp_(e){const n=e-new Date().getTime();this.onServerInfoUpdate_({serverTimeOffset:n})}cancelSentTransactions_(){for(let e=0;e<this.outstandingPuts_.length;e++){const n=this.outstandingPuts_[e];n&&"h"in n.request&&n.queued&&(n.onComplete&&n.onComplete("disconnect"),delete this.outstandingPuts_[e],this.outstandingPutCount_--)}this.outstandingPutCount_===0&&(this.outstandingPuts_=[])}onListenRevoked_(e,n){let r;n?r=n.map(s=>Za(s)).join("$"):r="default";const i=this.removeListen_(e,r);i&&i.onComplete&&i.onComplete("permission_denied")}removeListen_(e,n){const r=new M(e).toString();let i;if(this.listens.has(r)){const s=this.listens.get(r);i=s.get(n),s.delete(n),s.size===0&&this.listens.delete(r)}else i=void 0;return i}onAuthRevoked_(e,n){ie("Auth token revoked: "+e+"/"+n),this.authToken_=null,this.forceTokenRefresh_=!0,this.realtime_.close(),(e==="invalid_token"||e==="permission_denied")&&(this.invalidAuthTokenCount_++,this.invalidAuthTokenCount_>=Vu&&(this.reconnectDelay_=Wu,this.authTokenProvider_.notifyForInvalidToken()))}onAppCheckRevoked_(e,n){ie("App check token revoked: "+e+"/"+n),this.appCheckToken_=null,this.forceTokenRefresh_=!0,(e==="invalid_token"||e==="permission_denied")&&(this.invalidAppCheckTokenCount_++,this.invalidAppCheckTokenCount_>=Vu&&this.appCheckTokenProvider_.notifyForInvalidToken())}onSecurityDebugPacket_(e){this.securityDebugCallback_?this.securityDebugCallback_(e):"msg"in e&&console.log("FIREBASE: "+e.msg.replace(`
`,`
FIREBASE: `))}restoreState_(){this.tryAuth(),this.tryAppCheck();for(const e of this.listens.values())for(const n of e.values())this.sendListen_(n);for(let e=0;e<this.outstandingPuts_.length;e++)this.outstandingPuts_[e]&&this.sendPut_(e);for(;this.onDisconnectRequestQueue_.length;){const e=this.onDisconnectRequestQueue_.shift();this.sendOnDisconnect_(e.action,e.pathString,e.data,e.onComplete)}for(let e=0;e<this.outstandingGets_.length;e++)this.outstandingGets_[e]&&this.sendGet_(e)}sendConnectStats_(){const e={};let n="js";e["sdk."+n+"."+sf.replace(/\./g,"-")]=1,Ya()?e["framework.cordova"]=1:Xh()&&(e["framework.reactnative"]=1),this.reportStats(e)}shouldReconnect_(){const e=Yi.getInstance().currentlyOnline();return Yo(this.interruptReasons_)&&e}}at.nextPersistentConnectionId_=0;at.nextConnectionId_=0;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class k{constructor(e,n){this.name=e,this.node=n}static Wrap(e,n){return new k(e,n)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ns{getCompare(){return this.compare.bind(this)}indexedValueChanged(e,n){const r=new k(Fn,e),i=new k(Fn,n);return this.compare(r,i)!==0}minPost(){return k.MIN}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let yi;class Pf extends Ns{static get __EMPTY_NODE(){return yi}static set __EMPTY_NODE(e){yi=e}compare(e,n){return pn(e.name,n.name)}isDefinedOn(e){throw Xn("KeyIndex.isDefinedOn not expected to be called.")}indexedValueChanged(e,n){return!1}minPost(){return k.MIN}maxPost(){return new k(cn,yi)}makePost(e,n){return g(typeof e=="string","KeyIndex indexValue must always be a string."),new k(e,yi)}toString(){return".key"}}const bn=new Pf;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ei{constructor(e,n,r,i,s=null){this.isReverse_=i,this.resultGenerator_=s,this.nodeStack_=[];let o=1;for(;!e.isEmpty();)if(e=e,o=n?r(e.key,n):1,i&&(o*=-1),o<0)this.isReverse_?e=e.left:e=e.right;else if(o===0){this.nodeStack_.push(e);break}else this.nodeStack_.push(e),this.isReverse_?e=e.right:e=e.left}getNext(){if(this.nodeStack_.length===0)return null;let e=this.nodeStack_.pop(),n;if(this.resultGenerator_?n=this.resultGenerator_(e.key,e.value):n={key:e.key,value:e.value},this.isReverse_)for(e=e.left;!e.isEmpty();)this.nodeStack_.push(e),e=e.right;else for(e=e.right;!e.isEmpty();)this.nodeStack_.push(e),e=e.left;return n}hasNext(){return this.nodeStack_.length>0}peek(){if(this.nodeStack_.length===0)return null;const e=this.nodeStack_[this.nodeStack_.length-1];return this.resultGenerator_?this.resultGenerator_(e.key,e.value):{key:e.key,value:e.value}}}class ee{constructor(e,n,r,i,s){this.key=e,this.value=n,this.color=r??ee.RED,this.left=i??_e.EMPTY_NODE,this.right=s??_e.EMPTY_NODE}copy(e,n,r,i,s){return new ee(e??this.key,n??this.value,r??this.color,i??this.left,s??this.right)}count(){return this.left.count()+1+this.right.count()}isEmpty(){return!1}inorderTraversal(e){return this.left.inorderTraversal(e)||!!e(this.key,this.value)||this.right.inorderTraversal(e)}reverseTraversal(e){return this.right.reverseTraversal(e)||e(this.key,this.value)||this.left.reverseTraversal(e)}min_(){return this.left.isEmpty()?this:this.left.min_()}minKey(){return this.min_().key}maxKey(){return this.right.isEmpty()?this.key:this.right.maxKey()}insert(e,n,r){let i=this;const s=r(e,i.key);return s<0?i=i.copy(null,null,null,i.left.insert(e,n,r),null):s===0?i=i.copy(null,n,null,null,null):i=i.copy(null,null,null,null,i.right.insert(e,n,r)),i.fixUp_()}removeMin_(){if(this.left.isEmpty())return _e.EMPTY_NODE;let e=this;return!e.left.isRed_()&&!e.left.left.isRed_()&&(e=e.moveRedLeft_()),e=e.copy(null,null,null,e.left.removeMin_(),null),e.fixUp_()}remove(e,n){let r,i;if(r=this,n(e,r.key)<0)!r.left.isEmpty()&&!r.left.isRed_()&&!r.left.left.isRed_()&&(r=r.moveRedLeft_()),r=r.copy(null,null,null,r.left.remove(e,n),null);else{if(r.left.isRed_()&&(r=r.rotateRight_()),!r.right.isEmpty()&&!r.right.isRed_()&&!r.right.left.isRed_()&&(r=r.moveRedRight_()),n(e,r.key)===0){if(r.right.isEmpty())return _e.EMPTY_NODE;i=r.right.min_(),r=r.copy(i.key,i.value,null,null,r.right.removeMin_())}r=r.copy(null,null,null,null,r.right.remove(e,n))}return r.fixUp_()}isRed_(){return this.color}fixUp_(){let e=this;return e.right.isRed_()&&!e.left.isRed_()&&(e=e.rotateLeft_()),e.left.isRed_()&&e.left.left.isRed_()&&(e=e.rotateRight_()),e.left.isRed_()&&e.right.isRed_()&&(e=e.colorFlip_()),e}moveRedLeft_(){let e=this.colorFlip_();return e.right.left.isRed_()&&(e=e.copy(null,null,null,null,e.right.rotateRight_()),e=e.rotateLeft_(),e=e.colorFlip_()),e}moveRedRight_(){let e=this.colorFlip_();return e.left.left.isRed_()&&(e=e.rotateRight_(),e=e.colorFlip_()),e}rotateLeft_(){const e=this.copy(null,null,ee.RED,null,this.right.left);return this.right.copy(null,null,this.color,e,null)}rotateRight_(){const e=this.copy(null,null,ee.RED,this.left.right,null);return this.left.copy(null,null,this.color,null,e)}colorFlip_(){const e=this.left.copy(null,null,!this.left.color,null,null),n=this.right.copy(null,null,!this.right.color,null,null);return this.copy(null,null,!this.color,e,n)}checkMaxDepth_(){const e=this.check_();return Math.pow(2,e)<=this.count()+1}check_(){if(this.isRed_()&&this.left.isRed_())throw new Error("Red node has red child("+this.key+","+this.value+")");if(this.right.isRed_())throw new Error("Right child of ("+this.key+","+this.value+") is red");const e=this.left.check_();if(e!==this.right.check_())throw new Error("Black depths differ");return e+(this.isRed_()?0:1)}}ee.RED=!0;ee.BLACK=!1;class IS{copy(e,n,r,i,s){return this}insert(e,n,r){return new ee(e,n,null)}remove(e,n){return this}count(){return 0}isEmpty(){return!0}inorderTraversal(e){return!1}reverseTraversal(e){return!1}minKey(){return null}maxKey(){return null}check_(){return 0}isRed_(){return!1}}class _e{constructor(e,n=_e.EMPTY_NODE){this.comparator_=e,this.root_=n}insert(e,n){return new _e(this.comparator_,this.root_.insert(e,n,this.comparator_).copy(null,null,ee.BLACK,null,null))}remove(e){return new _e(this.comparator_,this.root_.remove(e,this.comparator_).copy(null,null,ee.BLACK,null,null))}get(e){let n,r=this.root_;for(;!r.isEmpty();){if(n=this.comparator_(e,r.key),n===0)return r.value;n<0?r=r.left:n>0&&(r=r.right)}return null}getPredecessorKey(e){let n,r=this.root_,i=null;for(;!r.isEmpty();)if(n=this.comparator_(e,r.key),n===0){if(r.left.isEmpty())return i?i.key:null;for(r=r.left;!r.right.isEmpty();)r=r.right;return r.key}else n<0?r=r.left:n>0&&(i=r,r=r.right);throw new Error("Attempted to find predecessor key for a nonexistent key.  What gives?")}isEmpty(){return this.root_.isEmpty()}count(){return this.root_.count()}minKey(){return this.root_.minKey()}maxKey(){return this.root_.maxKey()}inorderTraversal(e){return this.root_.inorderTraversal(e)}reverseTraversal(e){return this.root_.reverseTraversal(e)}getIterator(e){return new Ei(this.root_,null,this.comparator_,!1,e)}getIteratorFrom(e,n){return new Ei(this.root_,e,this.comparator_,!1,n)}getReverseIteratorFrom(e,n){return new Ei(this.root_,e,this.comparator_,!0,n)}getReverseIterator(e){return new Ei(this.root_,null,this.comparator_,!0,e)}}_e.EMPTY_NODE=new IS;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function kS(t,e){return pn(t.name,e.name)}function oc(t,e){return pn(t,e)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let na;function RS(t){na=t}const Nf=function(t){return typeof t=="number"?"number:"+lf(t):"string:"+t},Lf=function(t){if(t.isLeafNode()){const e=t.val();g(typeof e=="string"||typeof e=="number"||typeof e=="object"&&Ke(e,".sv"),"Priority must be a string or number.")}else g(t===na||t.isEmpty(),"priority of unexpected type.");g(t===na||t.getPriority().isEmpty(),"Priority nodes can't have a priority of their own.")};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let ju;class Z{static set __childrenNodeConstructor(e){ju=e}static get __childrenNodeConstructor(){return ju}constructor(e,n=Z.__childrenNodeConstructor.EMPTY_NODE){this.value_=e,this.priorityNode_=n,this.lazyHash_=null,g(this.value_!==void 0&&this.value_!==null,"LeafNode shouldn't be created with null/undefined value."),Lf(this.priorityNode_)}isLeafNode(){return!0}getPriority(){return this.priorityNode_}updatePriority(e){return new Z(this.value_,e)}getImmediateChild(e){return e===".priority"?this.priorityNode_:Z.__childrenNodeConstructor.EMPTY_NODE}getChild(e){return R(e)?this:I(e)===".priority"?this.priorityNode_:Z.__childrenNodeConstructor.EMPTY_NODE}hasChild(){return!1}getPredecessorChildName(e,n){return null}updateImmediateChild(e,n){return e===".priority"?this.updatePriority(n):n.isEmpty()&&e!==".priority"?this:Z.__childrenNodeConstructor.EMPTY_NODE.updateImmediateChild(e,n).updatePriority(this.priorityNode_)}updateChild(e,n){const r=I(e);return r===null?n:n.isEmpty()&&r!==".priority"?this:(g(r!==".priority"||Ft(e)===1,".priority must be the last token in a path"),this.updateImmediateChild(r,Z.__childrenNodeConstructor.EMPTY_NODE.updateChild(U(e),n)))}isEmpty(){return!1}numChildren(){return 0}forEachChild(e,n){return!1}val(e){return e&&!this.getPriority().isEmpty()?{".value":this.getValue(),".priority":this.getPriority().val()}:this.getValue()}hash(){if(this.lazyHash_===null){let e="";this.priorityNode_.isEmpty()||(e+="priority:"+Nf(this.priorityNode_.val())+":");const n=typeof this.value_;e+=n+":",n==="number"?e+=lf(this.value_):e+=this.value_,this.lazyHash_=af(e)}return this.lazyHash_}getValue(){return this.value_}compareTo(e){return e===Z.__childrenNodeConstructor.EMPTY_NODE?1:e instanceof Z.__childrenNodeConstructor?-1:(g(e.isLeafNode(),"Unknown node type"),this.compareToLeafNode_(e))}compareToLeafNode_(e){const n=typeof e.value_,r=typeof this.value_,i=Z.VALUE_TYPE_ORDER.indexOf(n),s=Z.VALUE_TYPE_ORDER.indexOf(r);return g(i>=0,"Unknown leaf type: "+n),g(s>=0,"Unknown leaf type: "+r),i===s?r==="object"?0:this.value_<e.value_?-1:this.value_===e.value_?0:1:s-i}withIndex(){return this}isIndexed(){return!0}equals(e){if(e===this)return!0;if(e.isLeafNode()){const n=e;return this.value_===n.value_&&this.priorityNode_.equals(n.priorityNode_)}else return!1}}Z.VALUE_TYPE_ORDER=["object","boolean","number","string"];/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Of,Df;function AS(t){Of=t}function PS(t){Df=t}class NS extends Ns{compare(e,n){const r=e.node.getPriority(),i=n.node.getPriority(),s=r.compareTo(i);return s===0?pn(e.name,n.name):s}isDefinedOn(e){return!e.getPriority().isEmpty()}indexedValueChanged(e,n){return!e.getPriority().equals(n.getPriority())}minPost(){return k.MIN}maxPost(){return new k(cn,new Z("[PRIORITY-POST]",Df))}makePost(e,n){const r=Of(e);return new k(n,new Z("[PRIORITY-POST]",r))}toString(){return".priority"}}const q=new NS;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const LS=Math.log(2);class OS{constructor(e){const n=s=>parseInt(Math.log(s)/LS,10),r=s=>parseInt(Array(s+1).join("1"),2);this.count=n(e+1),this.current_=this.count-1;const i=r(this.count);this.bits_=e+1&i}nextBitIsOne(){const e=!(this.bits_&1<<this.current_);return this.current_--,e}}const Ki=function(t,e,n,r){t.sort(e);const i=function(c,l){const u=l-c;let d,h;if(u===0)return null;if(u===1)return d=t[c],h=n?n(d):d,new ee(h,d.node,ee.BLACK,null,null);{const f=parseInt(u/2,10)+c,p=i(c,f),E=i(f+1,l);return d=t[f],h=n?n(d):d,new ee(h,d.node,ee.BLACK,p,E)}},s=function(c){let l=null,u=null,d=t.length;const h=function(p,E){const m=d-p,T=d;d-=p;const N=i(m+1,T),de=t[m],_=n?n(de):de;f(new ee(_,de.node,E,null,N))},f=function(p){l?(l.left=p,l=p):(u=p,l=p)};for(let p=0;p<c.count;++p){const E=c.nextBitIsOne(),m=Math.pow(2,c.count-(p+1));E?h(m,ee.BLACK):(h(m,ee.BLACK),h(m,ee.RED))}return u},o=new OS(t.length),a=s(o);return new _e(r||e,a)};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let yo;const mn={};class tt{static get Default(){return g(mn&&q,"ChildrenNode.ts has not been loaded"),yo=yo||new tt({".priority":mn},{".priority":q}),yo}constructor(e,n){this.indexes_=e,this.indexSet_=n}get(e){const n=xn(this.indexes_,e);if(!n)throw new Error("No index defined for "+e);return n instanceof _e?n:null}hasIndex(e){return Ke(this.indexSet_,e.toString())}addIndex(e,n){g(e!==bn,"KeyIndex always exists and isn't meant to be added to the IndexMap.");const r=[];let i=!1;const s=n.getIterator(k.Wrap);let o=s.getNext();for(;o;)i=i||e.isDefinedOn(o.node),r.push(o),o=s.getNext();let a;i?a=Ki(r,e.getCompare()):a=mn;const c=e.toString(),l={...this.indexSet_};l[c]=e;const u={...this.indexes_};return u[c]=a,new tt(u,l)}addToIndexes(e,n){const r=Gi(this.indexes_,(i,s)=>{const o=xn(this.indexSet_,s);if(g(o,"Missing index implementation for "+s),i===mn)if(o.isDefinedOn(e.node)){const a=[],c=n.getIterator(k.Wrap);let l=c.getNext();for(;l;)l.name!==e.name&&a.push(l),l=c.getNext();return a.push(e),Ki(a,o.getCompare())}else return mn;else{const a=n.get(e.name);let c=i;return a&&(c=c.remove(new k(e.name,a))),c.insert(e,e.node)}});return new tt(r,this.indexSet_)}removeFromIndexes(e,n){const r=Gi(this.indexes_,i=>{if(i===mn)return i;{const s=n.get(e.name);return s?i.remove(new k(e.name,s)):i}});return new tt(r,this.indexSet_)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let hr;class w{static get EMPTY_NODE(){return hr||(hr=new w(new _e(oc),null,tt.Default))}constructor(e,n,r){this.children_=e,this.priorityNode_=n,this.indexMap_=r,this.lazyHash_=null,this.priorityNode_&&Lf(this.priorityNode_),this.children_.isEmpty()&&g(!this.priorityNode_||this.priorityNode_.isEmpty(),"An empty node cannot have a priority")}isLeafNode(){return!1}getPriority(){return this.priorityNode_||hr}updatePriority(e){return this.children_.isEmpty()?this:new w(this.children_,e,this.indexMap_)}getImmediateChild(e){if(e===".priority")return this.getPriority();{const n=this.children_.get(e);return n===null?hr:n}}getChild(e){const n=I(e);return n===null?this:this.getImmediateChild(n).getChild(U(e))}hasChild(e){return this.children_.get(e)!==null}updateImmediateChild(e,n){if(g(n,"We should always be passing snapshot nodes"),e===".priority")return this.updatePriority(n);{const r=new k(e,n);let i,s;n.isEmpty()?(i=this.children_.remove(e),s=this.indexMap_.removeFromIndexes(r,this.children_)):(i=this.children_.insert(e,n),s=this.indexMap_.addToIndexes(r,this.children_));const o=i.isEmpty()?hr:this.priorityNode_;return new w(i,o,s)}}updateChild(e,n){const r=I(e);if(r===null)return n;{g(I(e)!==".priority"||Ft(e)===1,".priority must be the last token in a path");const i=this.getImmediateChild(r).updateChild(U(e),n);return this.updateImmediateChild(r,i)}}isEmpty(){return this.children_.isEmpty()}numChildren(){return this.children_.count()}val(e){if(this.isEmpty())return null;const n={};let r=0,i=0,s=!0;if(this.forEachChild(q,(o,a)=>{n[o]=a.val(e),r++,s&&w.INTEGER_REGEXP_.test(o)?i=Math.max(i,Number(o)):s=!1}),!e&&s&&i<2*r){const o=[];for(const a in n)o[a]=n[a];return o}else return e&&!this.getPriority().isEmpty()&&(n[".priority"]=this.getPriority().val()),n}hash(){if(this.lazyHash_===null){let e="";this.getPriority().isEmpty()||(e+="priority:"+Nf(this.getPriority().val())+":"),this.forEachChild(q,(n,r)=>{const i=r.hash();i!==""&&(e+=":"+n+":"+i)}),this.lazyHash_=e===""?"":af(e)}return this.lazyHash_}getPredecessorChildName(e,n,r){const i=this.resolveIndex_(r);if(i){const s=i.getPredecessorKey(new k(e,n));return s?s.name:null}else return this.children_.getPredecessorKey(e)}getFirstChildName(e){const n=this.resolveIndex_(e);if(n){const r=n.minKey();return r&&r.name}else return this.children_.minKey()}getFirstChild(e){const n=this.getFirstChildName(e);return n?new k(n,this.children_.get(n)):null}getLastChildName(e){const n=this.resolveIndex_(e);if(n){const r=n.maxKey();return r&&r.name}else return this.children_.maxKey()}getLastChild(e){const n=this.getLastChildName(e);return n?new k(n,this.children_.get(n)):null}forEachChild(e,n){const r=this.resolveIndex_(e);return r?r.inorderTraversal(i=>n(i.name,i.node)):this.children_.inorderTraversal(n)}getIterator(e){return this.getIteratorFrom(e.minPost(),e)}getIteratorFrom(e,n){const r=this.resolveIndex_(n);if(r)return r.getIteratorFrom(e,i=>i);{const i=this.children_.getIteratorFrom(e.name,k.Wrap);let s=i.peek();for(;s!=null&&n.compare(s,e)<0;)i.getNext(),s=i.peek();return i}}getReverseIterator(e){return this.getReverseIteratorFrom(e.maxPost(),e)}getReverseIteratorFrom(e,n){const r=this.resolveIndex_(n);if(r)return r.getReverseIteratorFrom(e,i=>i);{const i=this.children_.getReverseIteratorFrom(e.name,k.Wrap);let s=i.peek();for(;s!=null&&n.compare(s,e)>0;)i.getNext(),s=i.peek();return i}}compareTo(e){return this.isEmpty()?e.isEmpty()?0:-1:e.isLeafNode()||e.isEmpty()?1:e===ii?-1:0}withIndex(e){if(e===bn||this.indexMap_.hasIndex(e))return this;{const n=this.indexMap_.addIndex(e,this.children_);return new w(this.children_,this.priorityNode_,n)}}isIndexed(e){return e===bn||this.indexMap_.hasIndex(e)}equals(e){if(e===this)return!0;if(e.isLeafNode())return!1;{const n=e;if(this.getPriority().equals(n.getPriority()))if(this.children_.count()===n.children_.count()){const r=this.getIterator(q),i=n.getIterator(q);let s=r.getNext(),o=i.getNext();for(;s&&o;){if(s.name!==o.name||!s.node.equals(o.node))return!1;s=r.getNext(),o=i.getNext()}return s===null&&o===null}else return!1;else return!1}}resolveIndex_(e){return e===bn?null:this.indexMap_.get(e.toString())}}w.INTEGER_REGEXP_=/^(0|[1-9]\d*)$/;class DS extends w{constructor(){super(new _e(oc),w.EMPTY_NODE,tt.Default)}compareTo(e){return e===this?0:1}equals(e){return e===this}getPriority(){return this}getImmediateChild(e){return w.EMPTY_NODE}isEmpty(){return!1}}const ii=new DS;Object.defineProperties(k,{MIN:{value:new k(Fn,w.EMPTY_NODE)},MAX:{value:new k(cn,ii)}});Pf.__EMPTY_NODE=w.EMPTY_NODE;Z.__childrenNodeConstructor=w;RS(ii);PS(ii);/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const MS=!0;function J(t,e=null){if(t===null)return w.EMPTY_NODE;if(typeof t=="object"&&".priority"in t&&(e=t[".priority"]),g(e===null||typeof e=="string"||typeof e=="number"||typeof e=="object"&&".sv"in e,"Invalid priority type found: "+typeof e),typeof t=="object"&&".value"in t&&t[".value"]!==null&&(t=t[".value"]),typeof t!="object"||".sv"in t){const n=t;return new Z(n,J(e))}if(!(t instanceof Array)&&MS){const n=[];let r=!1;if(ae(t,(o,a)=>{if(o.substring(0,1)!=="."){const c=J(a);c.isEmpty()||(r=r||!c.getPriority().isEmpty(),n.push(new k(o,c)))}}),n.length===0)return w.EMPTY_NODE;const s=Ki(n,kS,o=>o.name,oc);if(r){const o=Ki(n,q.getCompare());return new w(s,J(e),new tt({".priority":o},{".priority":q}))}else return new w(s,J(e),tt.Default)}else{let n=w.EMPTY_NODE;return ae(t,(r,i)=>{if(Ke(t,r)&&r.substring(0,1)!=="."){const s=J(i);(s.isLeafNode()||!s.isEmpty())&&(n=n.updateImmediateChild(r,s))}}),n.updatePriority(J(e))}}AS(J);/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class xS extends Ns{constructor(e){super(),this.indexPath_=e,g(!R(e)&&I(e)!==".priority","Can't create PathIndex with empty path or .priority key")}extractChild(e){return e.getChild(this.indexPath_)}isDefinedOn(e){return!e.getChild(this.indexPath_).isEmpty()}compare(e,n){const r=this.extractChild(e.node),i=this.extractChild(n.node),s=r.compareTo(i);return s===0?pn(e.name,n.name):s}makePost(e,n){const r=J(e),i=w.EMPTY_NODE.updateChild(this.indexPath_,r);return new k(n,i)}maxPost(){const e=w.EMPTY_NODE.updateChild(this.indexPath_,ii);return new k(cn,e)}toString(){return $r(this.indexPath_,0).join("/")}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class FS extends Ns{compare(e,n){const r=e.node.compareTo(n.node);return r===0?pn(e.name,n.name):r}isDefinedOn(e){return!0}indexedValueChanged(e,n){return!e.equals(n)}minPost(){return k.MIN}maxPost(){return k.MAX}makePost(e,n){const r=J(e);return new k(n,r)}toString(){return".value"}}const US=new FS;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Mf(t){return{type:"value",snapshotNode:t}}function Un(t,e){return{type:"child_added",snapshotNode:e,childName:t}}function Br(t,e){return{type:"child_removed",snapshotNode:e,childName:t}}function Hr(t,e,n){return{type:"child_changed",snapshotNode:e,childName:t,oldSnap:n}}function $S(t,e){return{type:"child_moved",snapshotNode:e,childName:t}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ac{constructor(e){this.index_=e}updateChild(e,n,r,i,s,o){g(e.isIndexed(this.index_),"A node must be indexed if only a child is updated");const a=e.getImmediateChild(n);return a.getChild(i).equals(r.getChild(i))&&a.isEmpty()===r.isEmpty()||(o!=null&&(r.isEmpty()?e.hasChild(n)?o.trackChildChange(Br(n,a)):g(e.isLeafNode(),"A child remove without an old child only makes sense on a leaf node"):a.isEmpty()?o.trackChildChange(Un(n,r)):o.trackChildChange(Hr(n,r,a))),e.isLeafNode()&&r.isEmpty())?e:e.updateImmediateChild(n,r).withIndex(this.index_)}updateFullNode(e,n,r){return r!=null&&(e.isLeafNode()||e.forEachChild(q,(i,s)=>{n.hasChild(i)||r.trackChildChange(Br(i,s))}),n.isLeafNode()||n.forEachChild(q,(i,s)=>{if(e.hasChild(i)){const o=e.getImmediateChild(i);o.equals(s)||r.trackChildChange(Hr(i,s,o))}else r.trackChildChange(Un(i,s))})),n.withIndex(this.index_)}updatePriority(e,n){return e.isEmpty()?w.EMPTY_NODE:e.updatePriority(n)}filtersNodes(){return!1}getIndexedFilter(){return this}getIndex(){return this.index_}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Wr{constructor(e){this.indexedFilter_=new ac(e.getIndex()),this.index_=e.getIndex(),this.startPost_=Wr.getStartPost_(e),this.endPost_=Wr.getEndPost_(e),this.startIsInclusive_=!e.startAfterSet_,this.endIsInclusive_=!e.endBeforeSet_}getStartPost(){return this.startPost_}getEndPost(){return this.endPost_}matches(e){const n=this.startIsInclusive_?this.index_.compare(this.getStartPost(),e)<=0:this.index_.compare(this.getStartPost(),e)<0,r=this.endIsInclusive_?this.index_.compare(e,this.getEndPost())<=0:this.index_.compare(e,this.getEndPost())<0;return n&&r}updateChild(e,n,r,i,s,o){return this.matches(new k(n,r))||(r=w.EMPTY_NODE),this.indexedFilter_.updateChild(e,n,r,i,s,o)}updateFullNode(e,n,r){n.isLeafNode()&&(n=w.EMPTY_NODE);let i=n.withIndex(this.index_);i=i.updatePriority(w.EMPTY_NODE);const s=this;return n.forEachChild(q,(o,a)=>{s.matches(new k(o,a))||(i=i.updateImmediateChild(o,w.EMPTY_NODE))}),this.indexedFilter_.updateFullNode(e,i,r)}updatePriority(e,n){return e}filtersNodes(){return!0}getIndexedFilter(){return this.indexedFilter_}getIndex(){return this.index_}static getStartPost_(e){if(e.hasStart()){const n=e.getIndexStartName();return e.getIndex().makePost(e.getIndexStartValue(),n)}else return e.getIndex().minPost()}static getEndPost_(e){if(e.hasEnd()){const n=e.getIndexEndName();return e.getIndex().makePost(e.getIndexEndValue(),n)}else return e.getIndex().maxPost()}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class BS{constructor(e){this.withinDirectionalStart=n=>this.reverse_?this.withinEndPost(n):this.withinStartPost(n),this.withinDirectionalEnd=n=>this.reverse_?this.withinStartPost(n):this.withinEndPost(n),this.withinStartPost=n=>{const r=this.index_.compare(this.rangedFilter_.getStartPost(),n);return this.startIsInclusive_?r<=0:r<0},this.withinEndPost=n=>{const r=this.index_.compare(n,this.rangedFilter_.getEndPost());return this.endIsInclusive_?r<=0:r<0},this.rangedFilter_=new Wr(e),this.index_=e.getIndex(),this.limit_=e.getLimit(),this.reverse_=!e.isViewFromLeft(),this.startIsInclusive_=!e.startAfterSet_,this.endIsInclusive_=!e.endBeforeSet_}updateChild(e,n,r,i,s,o){return this.rangedFilter_.matches(new k(n,r))||(r=w.EMPTY_NODE),e.getImmediateChild(n).equals(r)?e:e.numChildren()<this.limit_?this.rangedFilter_.getIndexedFilter().updateChild(e,n,r,i,s,o):this.fullLimitUpdateChild_(e,n,r,s,o)}updateFullNode(e,n,r){let i;if(n.isLeafNode()||n.isEmpty())i=w.EMPTY_NODE.withIndex(this.index_);else if(this.limit_*2<n.numChildren()&&n.isIndexed(this.index_)){i=w.EMPTY_NODE.withIndex(this.index_);let s;this.reverse_?s=n.getReverseIteratorFrom(this.rangedFilter_.getEndPost(),this.index_):s=n.getIteratorFrom(this.rangedFilter_.getStartPost(),this.index_);let o=0;for(;s.hasNext()&&o<this.limit_;){const a=s.getNext();if(this.withinDirectionalStart(a))if(this.withinDirectionalEnd(a))i=i.updateImmediateChild(a.name,a.node),o++;else break;else continue}}else{i=n.withIndex(this.index_),i=i.updatePriority(w.EMPTY_NODE);let s;this.reverse_?s=i.getReverseIterator(this.index_):s=i.getIterator(this.index_);let o=0;for(;s.hasNext();){const a=s.getNext();o<this.limit_&&this.withinDirectionalStart(a)&&this.withinDirectionalEnd(a)?o++:i=i.updateImmediateChild(a.name,w.EMPTY_NODE)}}return this.rangedFilter_.getIndexedFilter().updateFullNode(e,i,r)}updatePriority(e,n){return e}filtersNodes(){return!0}getIndexedFilter(){return this.rangedFilter_.getIndexedFilter()}getIndex(){return this.index_}fullLimitUpdateChild_(e,n,r,i,s){let o;if(this.reverse_){const d=this.index_.getCompare();o=(h,f)=>d(f,h)}else o=this.index_.getCompare();const a=e;g(a.numChildren()===this.limit_,"");const c=new k(n,r),l=this.reverse_?a.getFirstChild(this.index_):a.getLastChild(this.index_),u=this.rangedFilter_.matches(c);if(a.hasChild(n)){const d=a.getImmediateChild(n);let h=i.getChildAfterChild(this.index_,l,this.reverse_);for(;h!=null&&(h.name===n||a.hasChild(h.name));)h=i.getChildAfterChild(this.index_,h,this.reverse_);const f=h==null?1:o(h,c);if(u&&!r.isEmpty()&&f>=0)return s?.trackChildChange(Hr(n,r,d)),a.updateImmediateChild(n,r);{s?.trackChildChange(Br(n,d));const E=a.updateImmediateChild(n,w.EMPTY_NODE);return h!=null&&this.rangedFilter_.matches(h)?(s?.trackChildChange(Un(h.name,h.node)),E.updateImmediateChild(h.name,h.node)):E}}else return r.isEmpty()?e:u&&o(l,c)>=0?(s!=null&&(s.trackChildChange(Br(l.name,l.node)),s.trackChildChange(Un(n,r))),a.updateImmediateChild(n,r).updateImmediateChild(l.name,w.EMPTY_NODE)):e}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class cc{constructor(){this.limitSet_=!1,this.startSet_=!1,this.startNameSet_=!1,this.startAfterSet_=!1,this.endSet_=!1,this.endNameSet_=!1,this.endBeforeSet_=!1,this.limit_=0,this.viewFrom_="",this.indexStartValue_=null,this.indexStartName_="",this.indexEndValue_=null,this.indexEndName_="",this.index_=q}hasStart(){return this.startSet_}isViewFromLeft(){return this.viewFrom_===""?this.startSet_:this.viewFrom_==="l"}getIndexStartValue(){return g(this.startSet_,"Only valid if start has been set"),this.indexStartValue_}getIndexStartName(){return g(this.startSet_,"Only valid if start has been set"),this.startNameSet_?this.indexStartName_:Fn}hasEnd(){return this.endSet_}getIndexEndValue(){return g(this.endSet_,"Only valid if end has been set"),this.indexEndValue_}getIndexEndName(){return g(this.endSet_,"Only valid if end has been set"),this.endNameSet_?this.indexEndName_:cn}hasLimit(){return this.limitSet_}hasAnchoredLimit(){return this.limitSet_&&this.viewFrom_!==""}getLimit(){return g(this.limitSet_,"Only valid if limit has been set"),this.limit_}getIndex(){return this.index_}loadsAllData(){return!(this.startSet_||this.endSet_||this.limitSet_)}isDefault(){return this.loadsAllData()&&this.index_===q}copy(){const e=new cc;return e.limitSet_=this.limitSet_,e.limit_=this.limit_,e.startSet_=this.startSet_,e.startAfterSet_=this.startAfterSet_,e.indexStartValue_=this.indexStartValue_,e.startNameSet_=this.startNameSet_,e.indexStartName_=this.indexStartName_,e.endSet_=this.endSet_,e.endBeforeSet_=this.endBeforeSet_,e.indexEndValue_=this.indexEndValue_,e.endNameSet_=this.endNameSet_,e.indexEndName_=this.indexEndName_,e.index_=this.index_,e.viewFrom_=this.viewFrom_,e}}function HS(t){return t.loadsAllData()?new ac(t.getIndex()):t.hasLimit()?new BS(t):new Wr(t)}function Gu(t){const e={};if(t.isDefault())return e;let n;if(t.index_===q?n="$priority":t.index_===US?n="$value":t.index_===bn?n="$key":(g(t.index_ instanceof xS,"Unrecognized index type!"),n=t.index_.toString()),e.orderBy=X(n),t.startSet_){const r=t.startAfterSet_?"startAfter":"startAt";e[r]=X(t.indexStartValue_),t.startNameSet_&&(e[r]+=","+X(t.indexStartName_))}if(t.endSet_){const r=t.endBeforeSet_?"endBefore":"endAt";e[r]=X(t.indexEndValue_),t.endNameSet_&&(e[r]+=","+X(t.indexEndName_))}return t.limitSet_&&(t.isViewFromLeft()?e.limitToFirst=t.limit_:e.limitToLast=t.limit_),e}function zu(t){const e={};if(t.startSet_&&(e.sp=t.indexStartValue_,t.startNameSet_&&(e.sn=t.indexStartName_),e.sin=!t.startAfterSet_),t.endSet_&&(e.ep=t.indexEndValue_,t.endNameSet_&&(e.en=t.indexEndName_),e.ein=!t.endBeforeSet_),t.limitSet_){e.l=t.limit_;let n=t.viewFrom_;n===""&&(t.isViewFromLeft()?n="l":n="r"),e.vf=n}return t.index_!==q&&(e.i=t.index_.toString()),e}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ji extends If{reportStats(e){throw new Error("Method not implemented.")}static getListenId_(e,n){return n!==void 0?"tag$"+n:(g(e._queryParams.isDefault(),"should have a tag if it's not a default query."),e._path.toString())}constructor(e,n,r,i){super(),this.repoInfo_=e,this.onDataUpdate_=n,this.authTokenProvider_=r,this.appCheckTokenProvider_=i,this.log_=ri("p:rest:"),this.listens_={}}listen(e,n,r,i){const s=e._path.toString();this.log_("Listen called for "+s+" "+e._queryIdentifier);const o=Ji.getListenId_(e,r),a={};this.listens_[o]=a;const c=Gu(e._queryParams);this.restRequest_(s+".json",c,(l,u)=>{let d=u;if(l===404&&(d=null,l=null),l===null&&this.onDataUpdate_(s,d,!1,r),xn(this.listens_,o)===a){let h;l?l===401?h="permission_denied":h="rest_error:"+l:h="ok",i(h,null)}})}unlisten(e,n){const r=Ji.getListenId_(e,n);delete this.listens_[r]}get(e){const n=Gu(e._queryParams),r=e._path.toString(),i=new lt;return this.restRequest_(r+".json",n,(s,o)=>{let a=o;s===404&&(a=null,s=null),s===null?(this.onDataUpdate_(r,a,!1,null),i.resolve(a)):i.reject(new Error(a))}),i.promise}refreshAuthToken(e){}restRequest_(e,n={},r){return n.format="export",Promise.all([this.authTokenProvider_.getToken(!1),this.appCheckTokenProvider_.getToken(!1)]).then(([i,s])=>{i&&i.accessToken&&(n.auth=i.accessToken),s&&s.token&&(n.ac=s.token);const o=(this.repoInfo_.secure?"https://":"http://")+this.repoInfo_.host+e+"?ns="+this.repoInfo_.namespace+er(n);this.log_("Sending REST request for "+o);const a=new XMLHttpRequest;a.onreadystatechange=()=>{if(r&&a.readyState===4){this.log_("REST Response for "+o+" received. status:",a.status,"response:",a.responseText);let c=null;if(a.status>=200&&a.status<300){try{c=xr(a.responseText)}catch{pe("Failed to parse JSON response for "+o+": "+a.responseText)}r(null,c)}else a.status!==401&&a.status!==404&&pe("Got unsuccessful REST response for "+o+" Status: "+a.status),r(a.status);r=null}},a.open("GET",o,!0),a.send()})}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class WS{constructor(){this.rootNode_=w.EMPTY_NODE}getNode(e){return this.rootNode_.getChild(e)}updateSnapshot(e,n){this.rootNode_=this.rootNode_.updateChild(e,n)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Xi(){return{value:null,children:new Map}}function xf(t,e,n){if(R(e))t.value=n,t.children.clear();else if(t.value!==null)t.value=t.value.updateChild(e,n);else{const r=I(e);t.children.has(r)||t.children.set(r,Xi());const i=t.children.get(r);e=U(e),xf(i,e,n)}}function ra(t,e,n){t.value!==null?n(e,t.value):VS(t,(r,i)=>{const s=new M(e.toString()+"/"+r);ra(i,s,n)})}function VS(t,e){t.children.forEach((n,r)=>{e(r,n)})}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class jS{constructor(e){this.collection_=e,this.last_=null}get(){const e=this.collection_.get(),n={...e};return this.last_&&ae(this.last_,(r,i)=>{n[r]=n[r]-i}),this.last_=e,n}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const qu=10*1e3,GS=30*1e3,zS=300*1e3;class qS{constructor(e,n){this.server_=n,this.statsToReport_={},this.statsListener_=new jS(e);const r=qu+(GS-qu)*Math.random();br(this.reportStats_.bind(this),Math.floor(r))}reportStats_(){const e=this.statsListener_.get(),n={};let r=!1;ae(e,(i,s)=>{s>0&&Ke(this.statsToReport_,i)&&(n[i]=s,r=!0)}),r&&this.server_.reportStats(n),br(this.reportStats_.bind(this),Math.floor(Math.random()*2*zS))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var Me;(function(t){t[t.OVERWRITE=0]="OVERWRITE",t[t.MERGE=1]="MERGE",t[t.ACK_USER_WRITE=2]="ACK_USER_WRITE",t[t.LISTEN_COMPLETE=3]="LISTEN_COMPLETE"})(Me||(Me={}));function lc(){return{fromUser:!0,fromServer:!1,queryId:null,tagged:!1}}function uc(){return{fromUser:!1,fromServer:!0,queryId:null,tagged:!1}}function dc(t){return{fromUser:!1,fromServer:!0,queryId:t,tagged:!0}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Qi{constructor(e,n,r){this.path=e,this.affectedTree=n,this.revert=r,this.type=Me.ACK_USER_WRITE,this.source=lc()}operationForChild(e){if(R(this.path)){if(this.affectedTree.value!=null)return g(this.affectedTree.children.isEmpty(),"affectedTree should not have overlapping affected paths."),this;{const n=this.affectedTree.subtree(new M(e));return new Qi(P(),n,this.revert)}}else return g(I(this.path)===e,"operationForChild called for unrelated child."),new Qi(U(this.path),this.affectedTree,this.revert)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Vr{constructor(e,n){this.source=e,this.path=n,this.type=Me.LISTEN_COMPLETE}operationForChild(e){return R(this.path)?new Vr(this.source,P()):new Vr(this.source,U(this.path))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ln{constructor(e,n,r){this.source=e,this.path=n,this.snap=r,this.type=Me.OVERWRITE}operationForChild(e){return R(this.path)?new ln(this.source,P(),this.snap.getImmediateChild(e)):new ln(this.source,U(this.path),this.snap)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class $n{constructor(e,n,r){this.source=e,this.path=n,this.children=r,this.type=Me.MERGE}operationForChild(e){if(R(this.path)){const n=this.children.subtree(new M(e));return n.isEmpty()?null:n.value?new ln(this.source,P(),n.value):new $n(this.source,P(),n)}else return g(I(this.path)===e,"Can't get a merge for a child not on the path of the operation"),new $n(this.source,U(this.path),this.children)}toString(){return"Operation("+this.path+": "+this.source.toString()+" merge: "+this.children.toString()+")"}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ut{constructor(e,n,r){this.node_=e,this.fullyInitialized_=n,this.filtered_=r}isFullyInitialized(){return this.fullyInitialized_}isFiltered(){return this.filtered_}isCompleteForPath(e){if(R(e))return this.isFullyInitialized()&&!this.filtered_;const n=I(e);return this.isCompleteForChild(n)}isCompleteForChild(e){return this.isFullyInitialized()&&!this.filtered_||this.node_.hasChild(e)}getNode(){return this.node_}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class YS{constructor(e){this.query_=e,this.index_=this.query_._queryParams.getIndex()}}function KS(t,e,n,r){const i=[],s=[];return e.forEach(o=>{o.type==="child_changed"&&t.index_.indexedValueChanged(o.oldSnap,o.snapshotNode)&&s.push($S(o.childName,o.snapshotNode))}),fr(t,i,"child_removed",e,r,n),fr(t,i,"child_added",e,r,n),fr(t,i,"child_moved",s,r,n),fr(t,i,"child_changed",e,r,n),fr(t,i,"value",e,r,n),i}function fr(t,e,n,r,i,s){const o=r.filter(a=>a.type===n);o.sort((a,c)=>XS(t,a,c)),o.forEach(a=>{const c=JS(t,a,s);i.forEach(l=>{l.respondsTo(a.type)&&e.push(l.createEvent(c,t.query_))})})}function JS(t,e,n){return e.type==="value"||e.type==="child_removed"||(e.prevName=n.getPredecessorChildName(e.childName,e.snapshotNode,t.index_)),e}function XS(t,e,n){if(e.childName==null||n.childName==null)throw Xn("Should only compare child_ events.");const r=new k(e.childName,e.snapshotNode),i=new k(n.childName,n.snapshotNode);return t.index_.compare(r,i)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ls(t,e){return{eventCache:t,serverCache:e}}function Sr(t,e,n,r){return Ls(new Ut(e,n,r),t.serverCache)}function Ff(t,e,n,r){return Ls(t.eventCache,new Ut(e,n,r))}function Zi(t){return t.eventCache.isFullyInitialized()?t.eventCache.getNode():null}function un(t){return t.serverCache.isFullyInitialized()?t.serverCache.getNode():null}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Eo;const QS=()=>(Eo||(Eo=new _e(xb)),Eo);class x{static fromObject(e){let n=new x(null);return ae(e,(r,i)=>{n=n.set(new M(r),i)}),n}constructor(e,n=QS()){this.value=e,this.children=n}isEmpty(){return this.value===null&&this.children.isEmpty()}findRootMostMatchingPathAndValue(e,n){if(this.value!=null&&n(this.value))return{path:P(),value:this.value};if(R(e))return null;{const r=I(e),i=this.children.get(r);if(i!==null){const s=i.findRootMostMatchingPathAndValue(U(e),n);return s!=null?{path:z(new M(r),s.path),value:s.value}:null}else return null}}findRootMostValueAndPath(e){return this.findRootMostMatchingPathAndValue(e,()=>!0)}subtree(e){if(R(e))return this;{const n=I(e),r=this.children.get(n);return r!==null?r.subtree(U(e)):new x(null)}}set(e,n){if(R(e))return new x(n,this.children);{const r=I(e),s=(this.children.get(r)||new x(null)).set(U(e),n),o=this.children.insert(r,s);return new x(this.value,o)}}remove(e){if(R(e))return this.children.isEmpty()?new x(null):new x(null,this.children);{const n=I(e),r=this.children.get(n);if(r){const i=r.remove(U(e));let s;return i.isEmpty()?s=this.children.remove(n):s=this.children.insert(n,i),this.value===null&&s.isEmpty()?new x(null):new x(this.value,s)}else return this}}get(e){if(R(e))return this.value;{const n=I(e),r=this.children.get(n);return r?r.get(U(e)):null}}setTree(e,n){if(R(e))return n;{const r=I(e),s=(this.children.get(r)||new x(null)).setTree(U(e),n);let o;return s.isEmpty()?o=this.children.remove(r):o=this.children.insert(r,s),new x(this.value,o)}}fold(e){return this.fold_(P(),e)}fold_(e,n){const r={};return this.children.inorderTraversal((i,s)=>{r[i]=s.fold_(z(e,i),n)}),n(e,this.value,r)}findOnPath(e,n){return this.findOnPath_(e,P(),n)}findOnPath_(e,n,r){const i=this.value?r(n,this.value):!1;if(i)return i;if(R(e))return null;{const s=I(e),o=this.children.get(s);return o?o.findOnPath_(U(e),z(n,s),r):null}}foreachOnPath(e,n){return this.foreachOnPath_(e,P(),n)}foreachOnPath_(e,n,r){if(R(e))return this;{this.value&&r(n,this.value);const i=I(e),s=this.children.get(i);return s?s.foreachOnPath_(U(e),z(n,i),r):new x(null)}}foreach(e){this.foreach_(P(),e)}foreach_(e,n){this.children.inorderTraversal((r,i)=>{i.foreach_(z(e,r),n)}),this.value&&n(e,this.value)}foreachChild(e){this.children.inorderTraversal((n,r)=>{r.value&&e(n,r.value)})}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class $e{constructor(e){this.writeTree_=e}static empty(){return new $e(new x(null))}}function Cr(t,e,n){if(R(e))return new $e(new x(n));{const r=t.writeTree_.findRootMostValueAndPath(e);if(r!=null){const i=r.path;let s=r.value;const o=fe(i,e);return s=s.updateChild(o,n),new $e(t.writeTree_.set(i,s))}else{const i=new x(n),s=t.writeTree_.setTree(e,i);return new $e(s)}}}function ia(t,e,n){let r=t;return ae(n,(i,s)=>{r=Cr(r,z(e,i),s)}),r}function Yu(t,e){if(R(e))return $e.empty();{const n=t.writeTree_.setTree(e,new x(null));return new $e(n)}}function sa(t,e){return gn(t,e)!=null}function gn(t,e){const n=t.writeTree_.findRootMostValueAndPath(e);return n!=null?t.writeTree_.get(n.path).getChild(fe(n.path,e)):null}function Ku(t){const e=[],n=t.writeTree_.value;return n!=null?n.isLeafNode()||n.forEachChild(q,(r,i)=>{e.push(new k(r,i))}):t.writeTree_.children.inorderTraversal((r,i)=>{i.value!=null&&e.push(new k(r,i.value))}),e}function Nt(t,e){if(R(e))return t;{const n=gn(t,e);return n!=null?new $e(new x(n)):new $e(t.writeTree_.subtree(e))}}function oa(t){return t.writeTree_.isEmpty()}function Bn(t,e){return Uf(P(),t.writeTree_,e)}function Uf(t,e,n){if(e.value!=null)return n.updateChild(t,e.value);{let r=null;return e.children.inorderTraversal((i,s)=>{i===".priority"?(g(s.value!==null,"Priority writes must always be leaf nodes"),r=s.value):n=Uf(z(t,i),s,n)}),!n.getChild(t).isEmpty()&&r!==null&&(n=n.updateChild(z(t,".priority"),r)),n}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Os(t,e){return Wf(e,t)}function ZS(t,e,n,r,i){g(r>t.lastWriteId,"Stacking an older write on top of newer ones"),i===void 0&&(i=!0),t.allWrites.push({path:e,snap:n,writeId:r,visible:i}),i&&(t.visibleWrites=Cr(t.visibleWrites,e,n)),t.lastWriteId=r}function eC(t,e,n,r){g(r>t.lastWriteId,"Stacking an older merge on top of newer ones"),t.allWrites.push({path:e,children:n,writeId:r,visible:!0}),t.visibleWrites=ia(t.visibleWrites,e,n),t.lastWriteId=r}function tC(t,e){for(let n=0;n<t.allWrites.length;n++){const r=t.allWrites[n];if(r.writeId===e)return r}return null}function nC(t,e){const n=t.allWrites.findIndex(a=>a.writeId===e);g(n>=0,"removeWrite called with nonexistent writeId.");const r=t.allWrites[n];t.allWrites.splice(n,1);let i=r.visible,s=!1,o=t.allWrites.length-1;for(;i&&o>=0;){const a=t.allWrites[o];a.visible&&(o>=n&&rC(a,r.path)?i=!1:Te(r.path,a.path)&&(s=!0)),o--}if(i){if(s)return iC(t),!0;if(r.snap)t.visibleWrites=Yu(t.visibleWrites,r.path);else{const a=r.children;ae(a,c=>{t.visibleWrites=Yu(t.visibleWrites,z(r.path,c))})}return!0}else return!1}function rC(t,e){if(t.snap)return Te(t.path,e);for(const n in t.children)if(t.children.hasOwnProperty(n)&&Te(z(t.path,n),e))return!0;return!1}function iC(t){t.visibleWrites=$f(t.allWrites,sC,P()),t.allWrites.length>0?t.lastWriteId=t.allWrites[t.allWrites.length-1].writeId:t.lastWriteId=-1}function sC(t){return t.visible}function $f(t,e,n){let r=$e.empty();for(let i=0;i<t.length;++i){const s=t[i];if(e(s)){const o=s.path;let a;if(s.snap)Te(n,o)?(a=fe(n,o),r=Cr(r,a,s.snap)):Te(o,n)&&(a=fe(o,n),r=Cr(r,P(),s.snap.getChild(a)));else if(s.children){if(Te(n,o))a=fe(n,o),r=ia(r,a,s.children);else if(Te(o,n))if(a=fe(o,n),R(a))r=ia(r,P(),s.children);else{const c=xn(s.children,I(a));if(c){const l=c.getChild(U(a));r=Cr(r,P(),l)}}}else throw Xn("WriteRecord should have .snap or .children")}}return r}function Bf(t,e,n,r,i){if(!r&&!i){const s=gn(t.visibleWrites,e);if(s!=null)return s;{const o=Nt(t.visibleWrites,e);if(oa(o))return n;if(n==null&&!sa(o,P()))return null;{const a=n||w.EMPTY_NODE;return Bn(o,a)}}}else{const s=Nt(t.visibleWrites,e);if(!i&&oa(s))return n;if(!i&&n==null&&!sa(s,P()))return null;{const o=function(l){return(l.visible||i)&&(!r||!~r.indexOf(l.writeId))&&(Te(l.path,e)||Te(e,l.path))},a=$f(t.allWrites,o,e),c=n||w.EMPTY_NODE;return Bn(a,c)}}}function oC(t,e,n){let r=w.EMPTY_NODE;const i=gn(t.visibleWrites,e);if(i)return i.isLeafNode()||i.forEachChild(q,(s,o)=>{r=r.updateImmediateChild(s,o)}),r;if(n){const s=Nt(t.visibleWrites,e);return n.forEachChild(q,(o,a)=>{const c=Bn(Nt(s,new M(o)),a);r=r.updateImmediateChild(o,c)}),Ku(s).forEach(o=>{r=r.updateImmediateChild(o.name,o.node)}),r}else{const s=Nt(t.visibleWrites,e);return Ku(s).forEach(o=>{r=r.updateImmediateChild(o.name,o.node)}),r}}function aC(t,e,n,r,i){g(r||i,"Either existingEventSnap or existingServerSnap must exist");const s=z(e,n);if(sa(t.visibleWrites,s))return null;{const o=Nt(t.visibleWrites,s);return oa(o)?i.getChild(n):Bn(o,i.getChild(n))}}function cC(t,e,n,r){const i=z(e,n),s=gn(t.visibleWrites,i);if(s!=null)return s;if(r.isCompleteForChild(n)){const o=Nt(t.visibleWrites,i);return Bn(o,r.getNode().getImmediateChild(n))}else return null}function lC(t,e){return gn(t.visibleWrites,e)}function uC(t,e,n,r,i,s,o){let a;const c=Nt(t.visibleWrites,e),l=gn(c,P());if(l!=null)a=l;else if(n!=null)a=Bn(c,n);else return[];if(a=a.withIndex(o),!a.isEmpty()&&!a.isLeafNode()){const u=[],d=o.getCompare(),h=s?a.getReverseIteratorFrom(r,o):a.getIteratorFrom(r,o);let f=h.getNext();for(;f&&u.length<i;)d(f,r)!==0&&u.push(f),f=h.getNext();return u}else return[]}function dC(){return{visibleWrites:$e.empty(),allWrites:[],lastWriteId:-1}}function es(t,e,n,r){return Bf(t.writeTree,t.treePath,e,n,r)}function hc(t,e){return oC(t.writeTree,t.treePath,e)}function Ju(t,e,n,r){return aC(t.writeTree,t.treePath,e,n,r)}function ts(t,e){return lC(t.writeTree,z(t.treePath,e))}function hC(t,e,n,r,i,s){return uC(t.writeTree,t.treePath,e,n,r,i,s)}function fc(t,e,n){return cC(t.writeTree,t.treePath,e,n)}function Hf(t,e){return Wf(z(t.treePath,e),t.writeTree)}function Wf(t,e){return{treePath:t,writeTree:e}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class fC{constructor(){this.changeMap=new Map}trackChildChange(e){const n=e.type,r=e.childName;g(n==="child_added"||n==="child_changed"||n==="child_removed","Only child changes supported for tracking"),g(r!==".priority","Only non-priority child changes can be tracked.");const i=this.changeMap.get(r);if(i){const s=i.type;if(n==="child_added"&&s==="child_removed")this.changeMap.set(r,Hr(r,e.snapshotNode,i.snapshotNode));else if(n==="child_removed"&&s==="child_added")this.changeMap.delete(r);else if(n==="child_removed"&&s==="child_changed")this.changeMap.set(r,Br(r,i.oldSnap));else if(n==="child_changed"&&s==="child_added")this.changeMap.set(r,Un(r,e.snapshotNode));else if(n==="child_changed"&&s==="child_changed")this.changeMap.set(r,Hr(r,e.snapshotNode,i.oldSnap));else throw Xn("Illegal combination of changes: "+e+" occurred after "+i)}else this.changeMap.set(r,e)}getChanges(){return Array.from(this.changeMap.values())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class pC{getCompleteChild(e){return null}getChildAfterChild(e,n,r){return null}}const Vf=new pC;class pc{constructor(e,n,r=null){this.writes_=e,this.viewCache_=n,this.optCompleteServerCache_=r}getCompleteChild(e){const n=this.viewCache_.eventCache;if(n.isCompleteForChild(e))return n.getNode().getImmediateChild(e);{const r=this.optCompleteServerCache_!=null?new Ut(this.optCompleteServerCache_,!0,!1):this.viewCache_.serverCache;return fc(this.writes_,e,r)}}getChildAfterChild(e,n,r){const i=this.optCompleteServerCache_!=null?this.optCompleteServerCache_:un(this.viewCache_),s=hC(this.writes_,i,n,1,r,e);return s.length===0?null:s[0]}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function gC(t){return{filter:t}}function mC(t,e){g(e.eventCache.getNode().isIndexed(t.filter.getIndex()),"Event snap not indexed"),g(e.serverCache.getNode().isIndexed(t.filter.getIndex()),"Server snap not indexed")}function _C(t,e,n,r,i){const s=new fC;let o,a;if(n.type===Me.OVERWRITE){const l=n;l.source.fromUser?o=aa(t,e,l.path,l.snap,r,i,s):(g(l.source.fromServer,"Unknown source."),a=l.source.tagged||e.serverCache.isFiltered()&&!R(l.path),o=ns(t,e,l.path,l.snap,r,i,a,s))}else if(n.type===Me.MERGE){const l=n;l.source.fromUser?o=EC(t,e,l.path,l.children,r,i,s):(g(l.source.fromServer,"Unknown source."),a=l.source.tagged||e.serverCache.isFiltered(),o=ca(t,e,l.path,l.children,r,i,a,s))}else if(n.type===Me.ACK_USER_WRITE){const l=n;l.revert?o=bC(t,e,l.path,r,i,s):o=vC(t,e,l.path,l.affectedTree,r,i,s)}else if(n.type===Me.LISTEN_COMPLETE)o=wC(t,e,n.path,r,s);else throw Xn("Unknown operation type: "+n.type);const c=s.getChanges();return yC(e,o,c),{viewCache:o,changes:c}}function yC(t,e,n){const r=e.eventCache;if(r.isFullyInitialized()){const i=r.getNode().isLeafNode()||r.getNode().isEmpty(),s=Zi(t);(n.length>0||!t.eventCache.isFullyInitialized()||i&&!r.getNode().equals(s)||!r.getNode().getPriority().equals(s.getPriority()))&&n.push(Mf(Zi(e)))}}function jf(t,e,n,r,i,s){const o=e.eventCache;if(ts(r,n)!=null)return e;{let a,c;if(R(n))if(g(e.serverCache.isFullyInitialized(),"If change path is empty, we must have complete server data"),e.serverCache.isFiltered()){const l=un(e),u=l instanceof w?l:w.EMPTY_NODE,d=hc(r,u);a=t.filter.updateFullNode(e.eventCache.getNode(),d,s)}else{const l=es(r,un(e));a=t.filter.updateFullNode(e.eventCache.getNode(),l,s)}else{const l=I(n);if(l===".priority"){g(Ft(n)===1,"Can't have a priority with additional path components");const u=o.getNode();c=e.serverCache.getNode();const d=Ju(r,n,u,c);d!=null?a=t.filter.updatePriority(u,d):a=o.getNode()}else{const u=U(n);let d;if(o.isCompleteForChild(l)){c=e.serverCache.getNode();const h=Ju(r,n,o.getNode(),c);h!=null?d=o.getNode().getImmediateChild(l).updateChild(u,h):d=o.getNode().getImmediateChild(l)}else d=fc(r,l,e.serverCache);d!=null?a=t.filter.updateChild(o.getNode(),l,d,u,i,s):a=o.getNode()}}return Sr(e,a,o.isFullyInitialized()||R(n),t.filter.filtersNodes())}}function ns(t,e,n,r,i,s,o,a){const c=e.serverCache;let l;const u=o?t.filter:t.filter.getIndexedFilter();if(R(n))l=u.updateFullNode(c.getNode(),r,null);else if(u.filtersNodes()&&!c.isFiltered()){const f=c.getNode().updateChild(n,r);l=u.updateFullNode(c.getNode(),f,null)}else{const f=I(n);if(!c.isCompleteForPath(n)&&Ft(n)>1)return e;const p=U(n),m=c.getNode().getImmediateChild(f).updateChild(p,r);f===".priority"?l=u.updatePriority(c.getNode(),m):l=u.updateChild(c.getNode(),f,m,p,Vf,null)}const d=Ff(e,l,c.isFullyInitialized()||R(n),u.filtersNodes()),h=new pc(i,d,s);return jf(t,d,n,i,h,a)}function aa(t,e,n,r,i,s,o){const a=e.eventCache;let c,l;const u=new pc(i,e,s);if(R(n))l=t.filter.updateFullNode(e.eventCache.getNode(),r,o),c=Sr(e,l,!0,t.filter.filtersNodes());else{const d=I(n);if(d===".priority")l=t.filter.updatePriority(e.eventCache.getNode(),r),c=Sr(e,l,a.isFullyInitialized(),a.isFiltered());else{const h=U(n),f=a.getNode().getImmediateChild(d);let p;if(R(h))p=r;else{const E=u.getCompleteChild(d);E!=null?rc(h)===".priority"&&E.getChild(Rf(h)).isEmpty()?p=E:p=E.updateChild(h,r):p=w.EMPTY_NODE}if(f.equals(p))c=e;else{const E=t.filter.updateChild(a.getNode(),d,p,h,u,o);c=Sr(e,E,a.isFullyInitialized(),t.filter.filtersNodes())}}}return c}function Xu(t,e){return t.eventCache.isCompleteForChild(e)}function EC(t,e,n,r,i,s,o){let a=e;return r.foreach((c,l)=>{const u=z(n,c);Xu(e,I(u))&&(a=aa(t,a,u,l,i,s,o))}),r.foreach((c,l)=>{const u=z(n,c);Xu(e,I(u))||(a=aa(t,a,u,l,i,s,o))}),a}function Qu(t,e,n){return n.foreach((r,i)=>{e=e.updateChild(r,i)}),e}function ca(t,e,n,r,i,s,o,a){if(e.serverCache.getNode().isEmpty()&&!e.serverCache.isFullyInitialized())return e;let c=e,l;R(n)?l=r:l=new x(null).setTree(n,r);const u=e.serverCache.getNode();return l.children.inorderTraversal((d,h)=>{if(u.hasChild(d)){const f=e.serverCache.getNode().getImmediateChild(d),p=Qu(t,f,h);c=ns(t,c,new M(d),p,i,s,o,a)}}),l.children.inorderTraversal((d,h)=>{const f=!e.serverCache.isCompleteForChild(d)&&h.value===null;if(!u.hasChild(d)&&!f){const p=e.serverCache.getNode().getImmediateChild(d),E=Qu(t,p,h);c=ns(t,c,new M(d),E,i,s,o,a)}}),c}function vC(t,e,n,r,i,s,o){if(ts(i,n)!=null)return e;const a=e.serverCache.isFiltered(),c=e.serverCache;if(r.value!=null){if(R(n)&&c.isFullyInitialized()||c.isCompleteForPath(n))return ns(t,e,n,c.getNode().getChild(n),i,s,a,o);if(R(n)){let l=new x(null);return c.getNode().forEachChild(bn,(u,d)=>{l=l.set(new M(u),d)}),ca(t,e,n,l,i,s,a,o)}else return e}else{let l=new x(null);return r.foreach((u,d)=>{const h=z(n,u);c.isCompleteForPath(h)&&(l=l.set(u,c.getNode().getChild(h)))}),ca(t,e,n,l,i,s,a,o)}}function wC(t,e,n,r,i){const s=e.serverCache,o=Ff(e,s.getNode(),s.isFullyInitialized()||R(n),s.isFiltered());return jf(t,o,n,r,Vf,i)}function bC(t,e,n,r,i,s){let o;if(ts(r,n)!=null)return e;{const a=new pc(r,e,i),c=e.eventCache.getNode();let l;if(R(n)||I(n)===".priority"){let u;if(e.serverCache.isFullyInitialized())u=es(r,un(e));else{const d=e.serverCache.getNode();g(d instanceof w,"serverChildren would be complete if leaf node"),u=hc(r,d)}u=u,l=t.filter.updateFullNode(c,u,s)}else{const u=I(n);let d=fc(r,u,e.serverCache);d==null&&e.serverCache.isCompleteForChild(u)&&(d=c.getImmediateChild(u)),d!=null?l=t.filter.updateChild(c,u,d,U(n),a,s):e.eventCache.getNode().hasChild(u)?l=t.filter.updateChild(c,u,w.EMPTY_NODE,U(n),a,s):l=c,l.isEmpty()&&e.serverCache.isFullyInitialized()&&(o=es(r,un(e)),o.isLeafNode()&&(l=t.filter.updateFullNode(l,o,s)))}return o=e.serverCache.isFullyInitialized()||ts(r,P())!=null,Sr(e,l,o,t.filter.filtersNodes())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class SC{constructor(e,n){this.query_=e,this.eventRegistrations_=[];const r=this.query_._queryParams,i=new ac(r.getIndex()),s=HS(r);this.processor_=gC(s);const o=n.serverCache,a=n.eventCache,c=i.updateFullNode(w.EMPTY_NODE,o.getNode(),null),l=s.updateFullNode(w.EMPTY_NODE,a.getNode(),null),u=new Ut(c,o.isFullyInitialized(),i.filtersNodes()),d=new Ut(l,a.isFullyInitialized(),s.filtersNodes());this.viewCache_=Ls(d,u),this.eventGenerator_=new YS(this.query_)}get query(){return this.query_}}function CC(t){return t.viewCache_.serverCache.getNode()}function TC(t){return Zi(t.viewCache_)}function IC(t,e){const n=un(t.viewCache_);return n&&(t.query._queryParams.loadsAllData()||!R(e)&&!n.getImmediateChild(I(e)).isEmpty())?n.getChild(e):null}function Zu(t){return t.eventRegistrations_.length===0}function kC(t,e){t.eventRegistrations_.push(e)}function ed(t,e,n){const r=[];if(n){g(e==null,"A cancel should cancel all event registrations.");const i=t.query._path;t.eventRegistrations_.forEach(s=>{const o=s.createCancelEvent(n,i);o&&r.push(o)})}if(e){let i=[];for(let s=0;s<t.eventRegistrations_.length;++s){const o=t.eventRegistrations_[s];if(!o.matches(e))i.push(o);else if(e.hasAnyCallback()){i=i.concat(t.eventRegistrations_.slice(s+1));break}}t.eventRegistrations_=i}else t.eventRegistrations_=[];return r}function td(t,e,n,r){e.type===Me.MERGE&&e.source.queryId!==null&&(g(un(t.viewCache_),"We should always have a full cache before handling merges"),g(Zi(t.viewCache_),"Missing event cache, even though we have a server cache"));const i=t.viewCache_,s=_C(t.processor_,i,e,n,r);return mC(t.processor_,s.viewCache),g(s.viewCache.serverCache.isFullyInitialized()||!i.serverCache.isFullyInitialized(),"Once a server snap is complete, it should never go back"),t.viewCache_=s.viewCache,Gf(t,s.changes,s.viewCache.eventCache.getNode(),null)}function RC(t,e){const n=t.viewCache_.eventCache,r=[];return n.getNode().isLeafNode()||n.getNode().forEachChild(q,(s,o)=>{r.push(Un(s,o))}),n.isFullyInitialized()&&r.push(Mf(n.getNode())),Gf(t,r,n.getNode(),e)}function Gf(t,e,n,r){const i=r?[r]:t.eventRegistrations_;return KS(t.eventGenerator_,e,n,i)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let rs;class zf{constructor(){this.views=new Map}}function AC(t){g(!rs,"__referenceConstructor has already been defined"),rs=t}function PC(){return g(rs,"Reference.ts has not been loaded"),rs}function NC(t){return t.views.size===0}function gc(t,e,n,r){const i=e.source.queryId;if(i!==null){const s=t.views.get(i);return g(s!=null,"SyncTree gave us an op for an invalid query."),td(s,e,n,r)}else{let s=[];for(const o of t.views.values())s=s.concat(td(o,e,n,r));return s}}function qf(t,e,n,r,i){const s=e._queryIdentifier,o=t.views.get(s);if(!o){let a=es(n,i?r:null),c=!1;a?c=!0:r instanceof w?(a=hc(n,r),c=!1):(a=w.EMPTY_NODE,c=!1);const l=Ls(new Ut(a,c,!1),new Ut(r,i,!1));return new SC(e,l)}return o}function LC(t,e,n,r,i,s){const o=qf(t,e,r,i,s);return t.views.has(e._queryIdentifier)||t.views.set(e._queryIdentifier,o),kC(o,n),RC(o,n)}function OC(t,e,n,r){const i=e._queryIdentifier,s=[];let o=[];const a=$t(t);if(i==="default")for(const[c,l]of t.views.entries())o=o.concat(ed(l,n,r)),Zu(l)&&(t.views.delete(c),l.query._queryParams.loadsAllData()||s.push(l.query));else{const c=t.views.get(i);c&&(o=o.concat(ed(c,n,r)),Zu(c)&&(t.views.delete(i),c.query._queryParams.loadsAllData()||s.push(c.query)))}return a&&!$t(t)&&s.push(new(PC())(e._repo,e._path)),{removed:s,events:o}}function Yf(t){const e=[];for(const n of t.views.values())n.query._queryParams.loadsAllData()||e.push(n);return e}function Lt(t,e){let n=null;for(const r of t.views.values())n=n||IC(r,e);return n}function Kf(t,e){if(e._queryParams.loadsAllData())return Ds(t);{const r=e._queryIdentifier;return t.views.get(r)}}function Jf(t,e){return Kf(t,e)!=null}function $t(t){return Ds(t)!=null}function Ds(t){for(const e of t.views.values())if(e.query._queryParams.loadsAllData())return e;return null}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let is;function DC(t){g(!is,"__referenceConstructor has already been defined"),is=t}function MC(){return g(is,"Reference.ts has not been loaded"),is}let xC=1;class nd{constructor(e){this.listenProvider_=e,this.syncPointTree_=new x(null),this.pendingWriteTree_=dC(),this.tagToQueryMap=new Map,this.queryToTagMap=new Map}}function Xf(t,e,n,r,i){return ZS(t.pendingWriteTree_,e,n,r,i),i?rr(t,new ln(lc(),e,n)):[]}function FC(t,e,n,r){eC(t.pendingWriteTree_,e,n,r);const i=x.fromObject(n);return rr(t,new $n(lc(),e,i))}function bt(t,e,n=!1){const r=tC(t.pendingWriteTree_,e);if(nC(t.pendingWriteTree_,e)){let s=new x(null);return r.snap!=null?s=s.set(P(),!0):ae(r.children,o=>{s=s.set(new M(o),!0)}),rr(t,new Qi(r.path,s,n))}else return[]}function si(t,e,n){return rr(t,new ln(uc(),e,n))}function UC(t,e,n){const r=x.fromObject(n);return rr(t,new $n(uc(),e,r))}function $C(t,e){return rr(t,new Vr(uc(),e))}function BC(t,e,n){const r=_c(t,n);if(r){const i=yc(r),s=i.path,o=i.queryId,a=fe(s,e),c=new Vr(dc(o),a);return Ec(t,s,c)}else return[]}function ss(t,e,n,r,i=!1){const s=e._path,o=t.syncPointTree_.get(s);let a=[];if(o&&(e._queryIdentifier==="default"||Jf(o,e))){const c=OC(o,e,n,r);NC(o)&&(t.syncPointTree_=t.syncPointTree_.remove(s));const l=c.removed;if(a=c.events,!i){const u=l.findIndex(h=>h._queryParams.loadsAllData())!==-1,d=t.syncPointTree_.findOnPath(s,(h,f)=>$t(f));if(u&&!d){const h=t.syncPointTree_.subtree(s);if(!h.isEmpty()){const f=VC(h);for(let p=0;p<f.length;++p){const E=f[p],m=E.query,T=tp(t,E);t.listenProvider_.startListening(Tr(m),jr(t,m),T.hashFn,T.onComplete)}}}!d&&l.length>0&&!r&&(u?t.listenProvider_.stopListening(Tr(e),null):l.forEach(h=>{const f=t.queryToTagMap.get(Ms(h));t.listenProvider_.stopListening(Tr(h),f)}))}jC(t,l)}return a}function Qf(t,e,n,r){const i=_c(t,r);if(i!=null){const s=yc(i),o=s.path,a=s.queryId,c=fe(o,e),l=new ln(dc(a),c,n);return Ec(t,o,l)}else return[]}function HC(t,e,n,r){const i=_c(t,r);if(i){const s=yc(i),o=s.path,a=s.queryId,c=fe(o,e),l=x.fromObject(n),u=new $n(dc(a),c,l);return Ec(t,o,u)}else return[]}function la(t,e,n,r=!1){const i=e._path;let s=null,o=!1;t.syncPointTree_.foreachOnPath(i,(h,f)=>{const p=fe(h,i);s=s||Lt(f,p),o=o||$t(f)});let a=t.syncPointTree_.get(i);a?(o=o||$t(a),s=s||Lt(a,P())):(a=new zf,t.syncPointTree_=t.syncPointTree_.set(i,a));let c;s!=null?c=!0:(c=!1,s=w.EMPTY_NODE,t.syncPointTree_.subtree(i).foreachChild((f,p)=>{const E=Lt(p,P());E&&(s=s.updateImmediateChild(f,E))}));const l=Jf(a,e);if(!l&&!e._queryParams.loadsAllData()){const h=Ms(e);g(!t.queryToTagMap.has(h),"View does not exist, but we have a tag");const f=GC();t.queryToTagMap.set(h,f),t.tagToQueryMap.set(f,h)}const u=Os(t.pendingWriteTree_,i);let d=LC(a,e,n,u,s,c);if(!l&&!o&&!r){const h=Kf(a,e);d=d.concat(zC(t,e,h))}return d}function mc(t,e,n){const i=t.pendingWriteTree_,s=t.syncPointTree_.findOnPath(e,(o,a)=>{const c=fe(o,e),l=Lt(a,c);if(l)return l});return Bf(i,e,s,n,!0)}function WC(t,e){const n=e._path;let r=null;t.syncPointTree_.foreachOnPath(n,(l,u)=>{const d=fe(l,n);r=r||Lt(u,d)});let i=t.syncPointTree_.get(n);i?r=r||Lt(i,P()):(i=new zf,t.syncPointTree_=t.syncPointTree_.set(n,i));const s=r!=null,o=s?new Ut(r,!0,!1):null,a=Os(t.pendingWriteTree_,e._path),c=qf(i,e,a,s?o.getNode():w.EMPTY_NODE,s);return TC(c)}function rr(t,e){return Zf(e,t.syncPointTree_,null,Os(t.pendingWriteTree_,P()))}function Zf(t,e,n,r){if(R(t.path))return ep(t,e,n,r);{const i=e.get(P());n==null&&i!=null&&(n=Lt(i,P()));let s=[];const o=I(t.path),a=t.operationForChild(o),c=e.children.get(o);if(c&&a){const l=n?n.getImmediateChild(o):null,u=Hf(r,o);s=s.concat(Zf(a,c,l,u))}return i&&(s=s.concat(gc(i,t,r,n))),s}}function ep(t,e,n,r){const i=e.get(P());n==null&&i!=null&&(n=Lt(i,P()));let s=[];return e.children.inorderTraversal((o,a)=>{const c=n?n.getImmediateChild(o):null,l=Hf(r,o),u=t.operationForChild(o);u&&(s=s.concat(ep(u,a,c,l)))}),i&&(s=s.concat(gc(i,t,r,n))),s}function tp(t,e){const n=e.query,r=jr(t,n);return{hashFn:()=>(CC(e)||w.EMPTY_NODE).hash(),onComplete:i=>{if(i==="ok")return r?BC(t,n._path,r):$C(t,n._path);{const s=$b(i,n);return ss(t,n,null,s)}}}}function jr(t,e){const n=Ms(e);return t.queryToTagMap.get(n)}function Ms(t){return t._path.toString()+"$"+t._queryIdentifier}function _c(t,e){return t.tagToQueryMap.get(e)}function yc(t){const e=t.indexOf("$");return g(e!==-1&&e<t.length-1,"Bad queryKey."),{queryId:t.substr(e+1),path:new M(t.substr(0,e))}}function Ec(t,e,n){const r=t.syncPointTree_.get(e);g(r,"Missing sync point for query tag that we're tracking");const i=Os(t.pendingWriteTree_,e);return gc(r,n,i,null)}function VC(t){return t.fold((e,n,r)=>{if(n&&$t(n))return[Ds(n)];{let i=[];return n&&(i=Yf(n)),ae(r,(s,o)=>{i=i.concat(o)}),i}})}function Tr(t){return t._queryParams.loadsAllData()&&!t._queryParams.isDefault()?new(MC())(t._repo,t._path):t}function jC(t,e){for(let n=0;n<e.length;++n){const r=e[n];if(!r._queryParams.loadsAllData()){const i=Ms(r),s=t.queryToTagMap.get(i);t.queryToTagMap.delete(i),t.tagToQueryMap.delete(s)}}}function GC(){return xC++}function zC(t,e,n){const r=e._path,i=jr(t,e),s=tp(t,n),o=t.listenProvider_.startListening(Tr(e),i,s.hashFn,s.onComplete),a=t.syncPointTree_.subtree(r);if(i)g(!$t(a.value),"If we're adding a query, it shouldn't be shadowed");else{const c=a.fold((l,u,d)=>{if(!R(l)&&u&&$t(u))return[Ds(u).query];{let h=[];return u&&(h=h.concat(Yf(u).map(f=>f.query))),ae(d,(f,p)=>{h=h.concat(p)}),h}});for(let l=0;l<c.length;++l){const u=c[l];t.listenProvider_.stopListening(Tr(u),jr(t,u))}}return o}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class vc{constructor(e){this.node_=e}getImmediateChild(e){const n=this.node_.getImmediateChild(e);return new vc(n)}node(){return this.node_}}class wc{constructor(e,n){this.syncTree_=e,this.path_=n}getImmediateChild(e){const n=z(this.path_,e);return new wc(this.syncTree_,n)}node(){return mc(this.syncTree_,this.path_)}}const qC=function(t){return t=t||{},t.timestamp=t.timestamp||new Date().getTime(),t},rd=function(t,e,n){if(!t||typeof t!="object")return t;if(g(".sv"in t,"Unexpected leaf node or priority contents"),typeof t[".sv"]=="string")return YC(t[".sv"],e,n);if(typeof t[".sv"]=="object")return KC(t[".sv"],e);g(!1,"Unexpected server value: "+JSON.stringify(t,null,2))},YC=function(t,e,n){switch(t){case"timestamp":return n.timestamp;default:g(!1,"Unexpected server value: "+t)}},KC=function(t,e,n){t.hasOwnProperty("increment")||g(!1,"Unexpected server value: "+JSON.stringify(t,null,2));const r=t.increment;typeof r!="number"&&g(!1,"Unexpected increment value: "+r);const i=e.node();if(g(i!==null&&typeof i<"u","Expected ChildrenNode.EMPTY_NODE for nulls"),!i.isLeafNode())return r;const o=i.getValue();return typeof o!="number"?r:o+r},np=function(t,e,n,r){return bc(e,new wc(n,t),r)},rp=function(t,e,n){return bc(t,new vc(e),n)};function bc(t,e,n){const r=t.getPriority().val(),i=rd(r,e.getImmediateChild(".priority"),n);let s;if(t.isLeafNode()){const o=t,a=rd(o.getValue(),e,n);return a!==o.getValue()||i!==o.getPriority().val()?new Z(a,J(i)):t}else{const o=t;return s=o,i!==o.getPriority().val()&&(s=s.updatePriority(new Z(i))),o.forEachChild(q,(a,c)=>{const l=bc(c,e.getImmediateChild(a),n);l!==c&&(s=s.updateImmediateChild(a,l))}),s}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Sc{constructor(e="",n=null,r={children:{},childCount:0}){this.name=e,this.parent=n,this.node=r}}function Cc(t,e){let n=e instanceof M?e:new M(e),r=t,i=I(n);for(;i!==null;){const s=xn(r.node.children,i)||{children:{},childCount:0};r=new Sc(i,r,s),n=U(n),i=I(n)}return r}function ir(t){return t.node.value}function ip(t,e){t.node.value=e,ua(t)}function sp(t){return t.node.childCount>0}function JC(t){return ir(t)===void 0&&!sp(t)}function xs(t,e){ae(t.node.children,(n,r)=>{e(new Sc(n,t,r))})}function op(t,e,n,r){n&&e(t),xs(t,i=>{op(i,e,!0)})}function XC(t,e,n){let r=t.parent;for(;r!==null;){if(e(r))return!0;r=r.parent}return!1}function oi(t){return new M(t.parent===null?t.name:oi(t.parent)+"/"+t.name)}function ua(t){t.parent!==null&&QC(t.parent,t.name,t)}function QC(t,e,n){const r=JC(n),i=Ke(t.node.children,e);r&&i?(delete t.node.children[e],t.node.childCount--,ua(t)):!r&&!i&&(t.node.children[e]=n.node,t.node.childCount++,ua(t))}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ZC=/[\[\].#$\/\u0000-\u001F\u007F]/,eT=/[\[\].#$\u0000-\u001F\u007F]/,vo=10*1024*1024,Tc=function(t){return typeof t=="string"&&t.length!==0&&!ZC.test(t)},ap=function(t){return typeof t=="string"&&t.length!==0&&!eT.test(t)},tT=function(t){return t&&(t=t.replace(/^\/*\.info(\/|$)/,"/")),ap(t)},nT=function(t){return t===null||typeof t=="string"||typeof t=="number"&&!Qa(t)||t&&typeof t=="object"&&Ke(t,".sv")},cp=function(t,e,n,r){r&&e===void 0||Fs(Rs(t,"value"),e,n)},Fs=function(t,e,n){const r=n instanceof M?new ES(n,t):n;if(e===void 0)throw new Error(t+"contains undefined "+Kt(r));if(typeof e=="function")throw new Error(t+"contains a function "+Kt(r)+" with contents = "+e.toString());if(Qa(e))throw new Error(t+"contains "+e.toString()+" "+Kt(r));if(typeof e=="string"&&e.length>vo/3&&As(e)>vo)throw new Error(t+"contains a string greater than "+vo+" utf8 bytes "+Kt(r)+" ('"+e.substring(0,50)+"...')");if(e&&typeof e=="object"){let i=!1,s=!1;if(ae(e,(o,a)=>{if(o===".value")i=!0;else if(o!==".priority"&&o!==".sv"&&(s=!0,!Tc(o)))throw new Error(t+" contains an invalid key ("+o+") "+Kt(r)+`.  Keys must be non-empty strings and can't contain ".", "#", "$", "/", "[", or "]"`);vS(r,o),Fs(t,a,r),wS(r)}),i&&s)throw new Error(t+' contains ".value" child '+Kt(r)+" in addition to actual children.")}},rT=function(t,e){let n,r;for(n=0;n<e.length;n++){r=e[n];const s=$r(r);for(let o=0;o<s.length;o++)if(!(s[o]===".priority"&&o===s.length-1)){if(!Tc(s[o]))throw new Error(t+"contains an invalid key ("+s[o]+") in path "+r.toString()+`. Keys must be non-empty strings and can't contain ".", "#", "$", "/", "[", or "]"`)}}e.sort(yS);let i=null;for(n=0;n<e.length;n++){if(r=e[n],i!==null&&Te(i,r))throw new Error(t+"contains a path "+i.toString()+" that is ancestor of another path "+r.toString());i=r}},iT=function(t,e,n,r){const i=Rs(t,"values");if(!(e&&typeof e=="object")||Array.isArray(e))throw new Error(i+" must be an object containing the children to replace.");const s=[];ae(e,(o,a)=>{const c=new M(o);if(Fs(i,a,z(n,c)),rc(c)===".priority"&&!nT(a))throw new Error(i+"contains an invalid value for '"+c.toString()+"', which must be a valid Firebase priority (a string, finite number, server value, or null).");s.push(c)}),rT(i,s)},lp=function(t,e,n,r){if(!ap(n))throw new Error(Rs(t,e)+'was an invalid path = "'+n+`". Paths must be non-empty strings and can't contain ".", "#", "$", "[", or "]"`)},sT=function(t,e,n,r){n&&(n=n.replace(/^\/*\.info(\/|$)/,"/")),lp(t,e,n)},Ic=function(t,e){if(I(e)===".info")throw new Error(t+" failed = Can't modify data under /.info/")},oT=function(t,e){const n=e.path.toString();if(typeof e.repoInfo.host!="string"||e.repoInfo.host.length===0||!Tc(e.repoInfo.namespace)&&e.repoInfo.host.split(":")[0]!=="localhost"||n.length!==0&&!tT(n))throw new Error(Rs(t,"url")+`must be a valid firebase URL and the path can't contain ".", "#", "$", "[", or "]".`)};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class aT{constructor(){this.eventLists_=[],this.recursionDepth_=0}}function Us(t,e){let n=null;for(let r=0;r<e.length;r++){const i=e[r],s=i.getPath();n!==null&&!ic(s,n.path)&&(t.eventLists_.push(n),n=null),n===null&&(n={events:[],path:s}),n.events.push(i)}n&&t.eventLists_.push(n)}function up(t,e,n){Us(t,n),dp(t,r=>ic(r,e))}function Pe(t,e,n){Us(t,n),dp(t,r=>Te(r,e)||Te(e,r))}function dp(t,e){t.recursionDepth_++;let n=!0;for(let r=0;r<t.eventLists_.length;r++){const i=t.eventLists_[r];if(i){const s=i.path;e(s)?(cT(t.eventLists_[r]),t.eventLists_[r]=null):n=!1}}n&&(t.eventLists_=[]),t.recursionDepth_--}function cT(t){for(let e=0;e<t.events.length;e++){const n=t.events[e];if(n!==null){t.events[e]=null;const r=n.getEventRunner();wr&&ie("event: "+n.toString()),nr(r)}}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const lT="repo_interrupt",uT=25;class dT{constructor(e,n,r,i){this.repoInfo_=e,this.forceRestClient_=n,this.authTokenProvider_=r,this.appCheckProvider_=i,this.dataUpdateCount=0,this.statsListener_=null,this.eventQueue_=new aT,this.nextWriteId_=1,this.interceptServerDataCallback_=null,this.onDisconnect_=Xi(),this.transactionQueueTree_=new Sc,this.persistentConnection_=null,this.key=this.repoInfo_.toURLString()}toString(){return(this.repoInfo_.secure?"https://":"http://")+this.repoInfo_.host}}function hT(t,e,n){if(t.stats_=tc(t.repoInfo_),t.forceRestClient_||Vb())t.server_=new Ji(t.repoInfo_,(r,i,s,o)=>{id(t,r,i,s,o)},t.authTokenProvider_,t.appCheckProvider_),setTimeout(()=>sd(t,!0),0);else{if(typeof n<"u"&&n!==null){if(typeof n!="object")throw new Error("Only objects are supported for option databaseAuthVariableOverride");try{X(n)}catch(r){throw new Error("Invalid authOverride provided: "+r)}}t.persistentConnection_=new at(t.repoInfo_,e,(r,i,s,o)=>{id(t,r,i,s,o)},r=>{sd(t,r)},r=>{fT(t,r)},t.authTokenProvider_,t.appCheckProvider_,n),t.server_=t.persistentConnection_}t.authTokenProvider_.addTokenChangeListener(r=>{t.server_.refreshAuthToken(r)}),t.appCheckProvider_.addTokenChangeListener(r=>{t.server_.refreshAppCheckToken(r.token)}),t.statsReporter_=Yb(t.repoInfo_,()=>new qS(t.stats_,t.server_)),t.infoData_=new WS,t.infoSyncTree_=new nd({startListening:(r,i,s,o)=>{let a=[];const c=t.infoData_.getNode(r._path);return c.isEmpty()||(a=si(t.infoSyncTree_,r._path,c),setTimeout(()=>{o("ok")},0)),a},stopListening:()=>{}}),kc(t,"connected",!1),t.serverSyncTree_=new nd({startListening:(r,i,s,o)=>(t.server_.listen(r,s,i,(a,c)=>{const l=o(a,c);Pe(t.eventQueue_,r._path,l)}),[]),stopListening:(r,i)=>{t.server_.unlisten(r,i)}})}function hp(t){const n=t.infoData_.getNode(new M(".info/serverTimeOffset")).val()||0;return new Date().getTime()+n}function $s(t){return qC({timestamp:hp(t)})}function id(t,e,n,r,i){t.dataUpdateCount++;const s=new M(e);n=t.interceptServerDataCallback_?t.interceptServerDataCallback_(e,n):n;let o=[];if(i)if(r){const c=Gi(n,l=>J(l));o=HC(t.serverSyncTree_,s,c,i)}else{const c=J(n);o=Qf(t.serverSyncTree_,s,c,i)}else if(r){const c=Gi(n,l=>J(l));o=UC(t.serverSyncTree_,s,c)}else{const c=J(n);o=si(t.serverSyncTree_,s,c)}let a=s;o.length>0&&(a=Hn(t,s)),Pe(t.eventQueue_,a,o)}function sd(t,e){kc(t,"connected",e),e===!1&&_T(t)}function fT(t,e){ae(e,(n,r)=>{kc(t,n,r)})}function kc(t,e,n){const r=new M("/.info/"+e),i=J(n);t.infoData_.updateSnapshot(r,i);const s=si(t.infoSyncTree_,r,i);Pe(t.eventQueue_,r,s)}function Rc(t){return t.nextWriteId_++}function pT(t,e,n){const r=WC(t.serverSyncTree_,e);return r!=null?Promise.resolve(r):t.server_.get(e).then(i=>{const s=J(i).withIndex(e._queryParams.getIndex());la(t.serverSyncTree_,e,n,!0);let o;if(e._queryParams.loadsAllData())o=si(t.serverSyncTree_,e._path,s);else{const a=jr(t.serverSyncTree_,e);o=Qf(t.serverSyncTree_,e._path,s,a)}return Pe(t.eventQueue_,e._path,o),ss(t.serverSyncTree_,e,n,null,!0),s},i=>(ai(t,"get for query "+X(e)+" failed: "+i),Promise.reject(new Error(i))))}function gT(t,e,n,r,i){ai(t,"set",{path:e.toString(),value:n,priority:r});const s=$s(t),o=J(n,r),a=mc(t.serverSyncTree_,e),c=rp(o,a,s),l=Rc(t),u=Xf(t.serverSyncTree_,e,c,l,!0);Us(t.eventQueue_,u),t.server_.put(e.toString(),o.val(!0),(h,f)=>{const p=h==="ok";p||pe("set at "+e+" failed: "+h);const E=bt(t.serverSyncTree_,l,!p);Pe(t.eventQueue_,e,E),da(t,i,h,f)});const d=Pc(t,e);Hn(t,d),Pe(t.eventQueue_,d,[])}function mT(t,e,n,r){ai(t,"update",{path:e.toString(),value:n});let i=!0;const s=$s(t),o={};if(ae(n,(a,c)=>{i=!1,o[a]=np(z(e,a),J(c),t.serverSyncTree_,s)}),i)ie("update() called with empty data.  Don't do anything."),da(t,r,"ok",void 0);else{const a=Rc(t),c=FC(t.serverSyncTree_,e,o,a);Us(t.eventQueue_,c),t.server_.merge(e.toString(),n,(l,u)=>{const d=l==="ok";d||pe("update at "+e+" failed: "+l);const h=bt(t.serverSyncTree_,a,!d),f=h.length>0?Hn(t,e):e;Pe(t.eventQueue_,f,h),da(t,r,l,u)}),ae(n,l=>{const u=Pc(t,z(e,l));Hn(t,u)}),Pe(t.eventQueue_,e,[])}}function _T(t){ai(t,"onDisconnectEvents");const e=$s(t),n=Xi();ra(t.onDisconnect_,P(),(i,s)=>{const o=np(i,s,t.serverSyncTree_,e);xf(n,i,o)});let r=[];ra(n,P(),(i,s)=>{r=r.concat(si(t.serverSyncTree_,i,s));const o=Pc(t,i);Hn(t,o)}),t.onDisconnect_=Xi(),Pe(t.eventQueue_,P(),r)}function yT(t,e,n){let r;I(e._path)===".info"?r=la(t.infoSyncTree_,e,n):r=la(t.serverSyncTree_,e,n),up(t.eventQueue_,e._path,r)}function fp(t,e,n){let r;I(e._path)===".info"?r=ss(t.infoSyncTree_,e,n):r=ss(t.serverSyncTree_,e,n),up(t.eventQueue_,e._path,r)}function ET(t){t.persistentConnection_&&t.persistentConnection_.interrupt(lT)}function ai(t,...e){let n="";t.persistentConnection_&&(n=t.persistentConnection_.id+":"),ie(n,...e)}function da(t,e,n,r){e&&nr(()=>{if(n==="ok")e(null);else{const i=(n||"error").toUpperCase();let s=i;r&&(s+=": "+r);const o=new Error(s);o.code=i,e(o)}})}function pp(t,e,n){return mc(t.serverSyncTree_,e,n)||w.EMPTY_NODE}function Ac(t,e=t.transactionQueueTree_){if(e||Bs(t,e),ir(e)){const n=mp(t,e);g(n.length>0,"Sending zero length transaction queue"),n.every(i=>i.status===0)&&vT(t,oi(e),n)}else sp(e)&&xs(e,n=>{Ac(t,n)})}function vT(t,e,n){const r=n.map(l=>l.currentWriteId),i=pp(t,e,r);let s=i;const o=i.hash();for(let l=0;l<n.length;l++){const u=n[l];g(u.status===0,"tryToSendTransactionQueue_: items in queue should all be run."),u.status=1,u.retryCount++;const d=fe(e,u.path);s=s.updateChild(d,u.currentOutputSnapshotRaw)}const a=s.val(!0),c=e;t.server_.put(c.toString(),a,l=>{ai(t,"transaction put response",{path:c.toString(),status:l});let u=[];if(l==="ok"){const d=[];for(let h=0;h<n.length;h++)n[h].status=2,u=u.concat(bt(t.serverSyncTree_,n[h].currentWriteId)),n[h].onComplete&&d.push(()=>n[h].onComplete(null,!0,n[h].currentOutputSnapshotResolved)),n[h].unwatcher();Bs(t,Cc(t.transactionQueueTree_,e)),Ac(t,t.transactionQueueTree_),Pe(t.eventQueue_,e,u);for(let h=0;h<d.length;h++)nr(d[h])}else{if(l==="datastale")for(let d=0;d<n.length;d++)n[d].status===3?n[d].status=4:n[d].status=0;else{pe("transaction at "+c.toString()+" failed: "+l);for(let d=0;d<n.length;d++)n[d].status=4,n[d].abortReason=l}Hn(t,e)}},o)}function Hn(t,e){const n=gp(t,e),r=oi(n),i=mp(t,n);return wT(t,i,r),r}function wT(t,e,n){if(e.length===0)return;const r=[];let i=[];const o=e.filter(a=>a.status===0).map(a=>a.currentWriteId);for(let a=0;a<e.length;a++){const c=e[a],l=fe(n,c.path);let u=!1,d;if(g(l!==null,"rerunTransactionsUnderNode_: relativePath should not be null."),c.status===4)u=!0,d=c.abortReason,i=i.concat(bt(t.serverSyncTree_,c.currentWriteId,!0));else if(c.status===0)if(c.retryCount>=uT)u=!0,d="maxretry",i=i.concat(bt(t.serverSyncTree_,c.currentWriteId,!0));else{const h=pp(t,c.path,o);c.currentInputSnapshot=h;const f=e[a].update(h.val());if(f!==void 0){Fs("transaction failed: Data returned ",f,c.path);let p=J(f);typeof f=="object"&&f!=null&&Ke(f,".priority")||(p=p.updatePriority(h.getPriority()));const m=c.currentWriteId,T=$s(t),N=rp(p,h,T);c.currentOutputSnapshotRaw=p,c.currentOutputSnapshotResolved=N,c.currentWriteId=Rc(t),o.splice(o.indexOf(m),1),i=i.concat(Xf(t.serverSyncTree_,c.path,N,c.currentWriteId,c.applyLocally)),i=i.concat(bt(t.serverSyncTree_,m,!0))}else u=!0,d="nodata",i=i.concat(bt(t.serverSyncTree_,c.currentWriteId,!0))}Pe(t.eventQueue_,n,i),i=[],u&&(e[a].status=2,(function(h){setTimeout(h,Math.floor(0))})(e[a].unwatcher),e[a].onComplete&&(d==="nodata"?r.push(()=>e[a].onComplete(null,!1,e[a].currentInputSnapshot)):r.push(()=>e[a].onComplete(new Error(d),!1,null))))}Bs(t,t.transactionQueueTree_);for(let a=0;a<r.length;a++)nr(r[a]);Ac(t,t.transactionQueueTree_)}function gp(t,e){let n,r=t.transactionQueueTree_;for(n=I(e);n!==null&&ir(r)===void 0;)r=Cc(r,n),e=U(e),n=I(e);return r}function mp(t,e){const n=[];return _p(t,e,n),n.sort((r,i)=>r.order-i.order),n}function _p(t,e,n){const r=ir(e);if(r)for(let i=0;i<r.length;i++)n.push(r[i]);xs(e,i=>{_p(t,i,n)})}function Bs(t,e){const n=ir(e);if(n){let r=0;for(let i=0;i<n.length;i++)n[i].status!==2&&(n[r]=n[i],r++);n.length=r,ip(e,n.length>0?n:void 0)}xs(e,r=>{Bs(t,r)})}function Pc(t,e){const n=oi(gp(t,e)),r=Cc(t.transactionQueueTree_,e);return XC(r,i=>{wo(t,i)}),wo(t,r),op(r,i=>{wo(t,i)}),n}function wo(t,e){const n=ir(e);if(n){const r=[];let i=[],s=-1;for(let o=0;o<n.length;o++)n[o].status===3||(n[o].status===1?(g(s===o-1,"All SENT items should be at beginning of queue."),s=o,n[o].status=3,n[o].abortReason="set"):(g(n[o].status===0,"Unexpected transaction status in abort"),n[o].unwatcher(),i=i.concat(bt(t.serverSyncTree_,n[o].currentWriteId,!0)),n[o].onComplete&&r.push(n[o].onComplete.bind(null,new Error("set"),!1,null))));s===-1?ip(e,void 0):n.length=s+1,Pe(t.eventQueue_,oi(e),i);for(let o=0;o<r.length;o++)nr(r[o])}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function bT(t){let e="";const n=t.split("/");for(let r=0;r<n.length;r++)if(n[r].length>0){let i=n[r];try{i=decodeURIComponent(i.replace(/\+/g," "))}catch{}e+="/"+i}return e}function ST(t){const e={};t.charAt(0)==="?"&&(t=t.substring(1));for(const n of t.split("&")){if(n.length===0)continue;const r=n.split("=");r.length===2?e[decodeURIComponent(r[0])]=decodeURIComponent(r[1]):pe(`Invalid query segment '${n}' in query '${t}'`)}return e}const od=function(t,e){const n=CT(t),r=n.namespace;n.domain==="firebase.com"&&ht(n.host+" is no longer supported. Please use <YOUR FIREBASE>.firebaseio.com instead"),(!r||r==="undefined")&&n.domain!=="localhost"&&ht("Cannot parse Firebase url. Please use https://<YOUR FIREBASE>.firebaseio.com"),n.secure||Db();const i=n.scheme==="ws"||n.scheme==="wss";return{repoInfo:new Ef(n.host,n.secure,r,i,e,"",r!==n.subdomain),path:new M(n.pathString)}},CT=function(t){let e="",n="",r="",i="",s="",o=!0,a="https",c=443;if(typeof t=="string"){let l=t.indexOf("//");l>=0&&(a=t.substring(0,l-1),t=t.substring(l+2));let u=t.indexOf("/");u===-1&&(u=t.length);let d=t.indexOf("?");d===-1&&(d=t.length),e=t.substring(0,Math.min(u,d)),u<d&&(i=bT(t.substring(u,d)));const h=ST(t.substring(Math.min(t.length,d)));l=e.indexOf(":"),l>=0?(o=a==="https"||a==="wss",c=parseInt(e.substring(l+1),10)):l=e.length;const f=e.slice(0,l);if(f.toLowerCase()==="localhost")n="localhost";else if(f.split(".").length<=2)n=f;else{const p=e.indexOf(".");r=e.substring(0,p).toLowerCase(),n=e.substring(p+1),s=r}"ns"in h&&(s=h.ns)}return{host:e,port:c,domain:n,subdomain:r,secure:o,scheme:a,pathString:i,namespace:s}};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ad="-0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ_abcdefghijklmnopqrstuvwxyz",TT=(function(){let t=0;const e=[];return function(n){const r=n===t;t=n;let i;const s=new Array(8);for(i=7;i>=0;i--)s[i]=ad.charAt(n%64),n=Math.floor(n/64);g(n===0,"Cannot push at time == 0");let o=s.join("");if(r){for(i=11;i>=0&&e[i]===63;i--)e[i]=0;e[i]++}else for(i=0;i<12;i++)e[i]=Math.floor(Math.random()*64);for(i=0;i<12;i++)o+=ad.charAt(e[i]);return g(o.length===20,"nextPushId: Length should be 20."),o}})();/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class yp{constructor(e,n,r,i){this.eventType=e,this.eventRegistration=n,this.snapshot=r,this.prevName=i}getPath(){const e=this.snapshot.ref;return this.eventType==="value"?e._path:e.parent._path}getEventType(){return this.eventType}getEventRunner(){return this.eventRegistration.getEventRunner(this)}toString(){return this.getPath().toString()+":"+this.eventType+":"+X(this.snapshot.exportVal())}}class Ep{constructor(e,n,r){this.eventRegistration=e,this.error=n,this.path=r}getPath(){return this.path}getEventType(){return"cancel"}getEventRunner(){return this.eventRegistration.getEventRunner(this)}toString(){return this.path.toString()+":cancel"}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Nc{constructor(e,n){this.snapshotCallback=e,this.cancelCallback=n}onValue(e,n){this.snapshotCallback.call(null,e,n)}onCancel(e){return g(this.hasCancelCallback,"Raising a cancel event on a listener with no cancel callback"),this.cancelCallback.call(null,e)}get hasCancelCallback(){return!!this.cancelCallback}matches(e){return this.snapshotCallback===e.snapshotCallback||this.snapshotCallback.userCallback!==void 0&&this.snapshotCallback.userCallback===e.snapshotCallback.userCallback&&this.snapshotCallback.context===e.snapshotCallback.context}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Lc{constructor(e,n,r,i){this._repo=e,this._path=n,this._queryParams=r,this._orderByCalled=i}get key(){return R(this._path)?null:rc(this._path)}get ref(){return new Je(this._repo,this._path)}get _queryIdentifier(){const e=zu(this._queryParams),n=Za(e);return n==="{}"?"default":n}get _queryObject(){return zu(this._queryParams)}isEqual(e){if(e=ce(e),!(e instanceof Lc))return!1;const n=this._repo===e._repo,r=ic(this._path,e._path),i=this._queryIdentifier===e._queryIdentifier;return n&&r&&i}toJSON(){return this.toString()}toString(){return this._repo.toString()+_S(this._path)}}class Je extends Lc{constructor(e,n){super(e,n,new cc,!1)}get parent(){const e=Rf(this._path);return e===null?null:new Je(this._repo,e)}get root(){let e=this;for(;e.parent!==null;)e=e.parent;return e}}class Wn{constructor(e,n,r){this._node=e,this.ref=n,this._index=r}get priority(){return this._node.getPriority().val()}get key(){return this.ref.key}get size(){return this._node.numChildren()}child(e){const n=new M(e),r=Vn(this.ref,e);return new Wn(this._node.getChild(n),r,q)}exists(){return!this._node.isEmpty()}exportVal(){return this._node.val(!0)}forEach(e){return this._node.isLeafNode()?!1:!!this._node.forEachChild(this._index,(r,i)=>e(new Wn(i,Vn(this.ref,r),q)))}hasChild(e){const n=new M(e);return!this._node.getChild(n).isEmpty()}hasChildren(){return this._node.isLeafNode()?!1:!this._node.isEmpty()}toJSON(){return this.exportVal()}val(){return this._node.val()}}function se(t,e){return t=ce(t),t._checkNotDeleted("ref"),e!==void 0?Vn(t._root,e):t._root}function Vn(t,e){return t=ce(t),I(t._path)===null?sT("child","path",e):lp("child","path",e),new Je(t._repo,z(t._path,e))}function cd(t,e){t=ce(t),Ic("push",t._path),cp("push",e,t._path,!0);const n=hp(t._repo),r=TT(n),i=Vn(t,r),s=Vn(t,r);let o;return o=Promise.resolve(s),i.then=o.then.bind(o),i.catch=o.then.bind(o,void 0),i}function jn(t){return Ic("remove",t._path),ft(t,null)}function ft(t,e){t=ce(t),Ic("set",t._path),cp("set",e,t._path,!1);const n=new lt;return gT(t._repo,t._path,e,null,n.wrapCallback(()=>{})),n.promise}function Ni(t,e){iT("update",e,t._path);const n=new lt;return mT(t._repo,t._path,e,n.wrapCallback(()=>{})),n.promise}function tn(t){t=ce(t);const e=new Nc(()=>{}),n=new ci(e);return pT(t._repo,t,n).then(r=>new Wn(r,new Je(t._repo,t._path),t._queryParams.getIndex()))}class ci{constructor(e){this.callbackContext=e}respondsTo(e){return e==="value"}createEvent(e,n){const r=n._queryParams.getIndex();return new yp("value",this,new Wn(e.snapshotNode,new Je(n._repo,n._path),r))}getEventRunner(e){return e.getEventType()==="cancel"?()=>this.callbackContext.onCancel(e.error):()=>this.callbackContext.onValue(e.snapshot,null)}createCancelEvent(e,n){return this.callbackContext.hasCancelCallback?new Ep(this,e,n):null}matches(e){return e instanceof ci?!e.callbackContext||!this.callbackContext?!0:e.callbackContext.matches(this.callbackContext):!1}hasAnyCallback(){return this.callbackContext!==null}}class Hs{constructor(e,n){this.eventType=e,this.callbackContext=n}respondsTo(e){let n=e==="children_added"?"child_added":e;return n=n==="children_removed"?"child_removed":n,this.eventType===n}createCancelEvent(e,n){return this.callbackContext.hasCancelCallback?new Ep(this,e,n):null}createEvent(e,n){g(e.childName!=null,"Child events should have a childName.");const r=Vn(new Je(n._repo,n._path),e.childName),i=n._queryParams.getIndex();return new yp(e.type,this,new Wn(e.snapshotNode,r,i),e.prevName)}getEventRunner(e){return e.getEventType()==="cancel"?()=>this.callbackContext.onCancel(e.error):()=>this.callbackContext.onValue(e.snapshot,e.prevName)}matches(e){return e instanceof Hs?this.eventType===e.eventType&&(!this.callbackContext||!e.callbackContext||this.callbackContext.matches(e.callbackContext)):!1}hasAnyCallback(){return!!this.callbackContext}}function Oc(t,e,n,r,i){const s=new Nc(n,void 0),o=e==="value"?new ci(s):new Hs(e,s);return yT(t._repo,t,o),()=>fp(t._repo,t,o)}function IT(t,e,n,r){return Oc(t,"value",e)}function kT(t,e,n,r){return Oc(t,"child_added",e)}function RT(t,e,n,r){return Oc(t,"child_removed",e)}function Ws(t,e,n){let r=null;const i=n?new Nc(n):null;e==="value"?r=new ci(i):e&&(r=new Hs(e,i)),fp(t._repo,t,r)}AC(Je);DC(Je);/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const AT="FIREBASE_DATABASE_EMULATOR_HOST",ha={};let PT=!1;function NT(t,e,n,r){const i=e.lastIndexOf(":"),s=e.substring(0,i),o=Qn(s);t.repoInfo_=new Ef(e,o,t.repoInfo_.namespace,t.repoInfo_.webSocketOnly,t.repoInfo_.nodeAdmin,t.repoInfo_.persistenceKey,t.repoInfo_.includeNamespaceInQueryParams,!0,n),r&&(t.authTokenProvider_=r)}function LT(t,e,n,r,i){let s=r||t.options.databaseURL;s===void 0&&(t.options.projectId||ht("Can't determine Firebase Database URL. Be sure to include  a Project ID when calling firebase.initializeApp()."),ie("Using default host for project ",t.options.projectId),s=`${t.options.projectId}-default-rtdb.firebaseio.com`);let o=od(s,i),a=o.repoInfo,c;typeof process<"u"&&Ru&&(c=Ru[AT]),c?(s=`http://${c}?ns=${a.namespace}`,o=od(s,i),a=o.repoInfo):o.repoInfo.secure;const l=new Gb(t.name,t.options,e);oT("Invalid Firebase Database URL",o),R(o.path)||ht("Database URL must point to the root of a Firebase Database (not including a child path).");const u=DT(a,t,l,new jb(t,n));return new MT(u,t)}function OT(t,e){const n=ha[e];(!n||n[t.key]!==t)&&ht(`Database ${e}(${t.repoInfo_}) has already been deleted.`),ET(t),delete n[t.key]}function DT(t,e,n,r){let i=ha[e.name];i||(i={},ha[e.name]=i);let s=i[t.toURLString()];return s&&ht("Database initialized multiple times. Please make sure the format of the database URL matches with each database() call."),s=new dT(t,PT,n,r),i[t.toURLString()]=s,s}class MT{constructor(e,n){this._repoInternal=e,this.app=n,this.type="database",this._instanceStarted=!1}get _repo(){return this._instanceStarted||(hT(this._repoInternal,this.app.options.appId,this.app.options.databaseAuthVariableOverride),this._instanceStarted=!0),this._repoInternal}get _root(){return this._rootInternal||(this._rootInternal=new Je(this._repo,P())),this._rootInternal}_delete(){return this._rootInternal!==null&&(OT(this._repo,this.app.name),this._repoInternal=null,this._rootInternal=null),Promise.resolve()}_checkNotDeleted(e){this._rootInternal===null&&ht("Cannot call "+e+" on a deleted database.")}}function xT(t=Xa(),e){const n=ti(t,"database").getImmediate({identifier:e});if(!n._instanceStarted){const r=Jv("database");r&&FT(n,...r)}return n}function FT(t,e,n,r={}){t=ce(t),t._checkNotDeleted("useEmulator");const i=`${e}:${n}`,s=t._repoInternal;if(t._instanceStarted){if(i===t._repoInternal.repoInfo_.host&&an(r,s.repoInfo_.emulatorOptions))return;ht("connectDatabaseEmulator() cannot initialize or alter the emulator configuration after the database instance has started.")}let o;if(s.repoInfo_.nodeAdmin)r.mockUserToken&&ht('mockUserToken is not supported by the Admin SDK. For client access with mock users, please use the "firebase" package instead of "firebase-admin".'),o=new Pi(Pi.OWNER);else if(r.mockUserToken){const a=typeof r.mockUserToken=="string"?r.mockUserToken:Xv(r.mockUserToken,t.app.options.projectId);o=new Pi(a)}Qn(e)&&(Kh(e),Jh("Database",!0)),NT(s,i,r,o)}/**
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
 */function UT(t){Rb(tr),xt(new ut("database",(e,{instanceIdentifier:n})=>{const r=e.getProvider("app").getImmediate(),i=e.getProvider("auth-internal"),s=e.getProvider("app-check-internal");return LT(r,i,s,n)},"PUBLIC").setMultipleInstances(!0)),ot(Au,Pu,t),ot(Au,Pu,"esm2020")}at.prototype.simpleListen=function(t,e){this.sendRequest("q",{p:t},e)};at.prototype.echo=function(t,e){this.sendRequest("echo",{d:t},e)};UT();var $T="firebase",BT="12.4.0";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ot($T,BT,"app");/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const fa=new Map,vp={activated:!1,tokenObservers:[]},HT={initialized:!1,enabled:!1};function Q(t){return fa.get(t)||{...vp}}function WT(t,e){return fa.set(t,e),fa.get(t)}function Vs(){return HT}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const wp="https://content-firebaseappcheck.googleapis.com/v1",VT="exchangeRecaptchaEnterpriseToken",jT="exchangeDebugToken",ld={RETRIAL_MIN_WAIT:30*1e3,RETRIAL_MAX_WAIT:960*1e3},GT=1440*60*1e3;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class zT{constructor(e,n,r,i,s){if(this.operation=e,this.retryPolicy=n,this.getWaitDuration=r,this.lowerBound=i,this.upperBound=s,this.pending=null,this.nextErrorWaitInterval=i,i>s)throw new Error("Proactive refresh lower bound greater than upper bound!")}start(){this.nextErrorWaitInterval=this.lowerBound,this.process(!0).catch(()=>{})}stop(){this.pending&&(this.pending.reject("cancelled"),this.pending=null)}isRunning(){return!!this.pending}async process(e){this.stop();try{this.pending=new lt,this.pending.promise.catch(n=>{}),await qT(this.getNextRun(e)),this.pending.resolve(),await this.pending.promise,this.pending=new lt,this.pending.promise.catch(n=>{}),await this.operation(),this.pending.resolve(),await this.pending.promise,this.process(!0).catch(()=>{})}catch(n){this.retryPolicy(n)?this.process(!1).catch(()=>{}):this.stop()}}getNextRun(e){if(e)return this.nextErrorWaitInterval=this.lowerBound,this.getWaitDuration();{const n=this.nextErrorWaitInterval;return this.nextErrorWaitInterval*=2,this.nextErrorWaitInterval>this.upperBound&&(this.nextErrorWaitInterval=this.upperBound),n}}}function qT(t){return new Promise(e=>{setTimeout(e,t)})}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const YT={"already-initialized":"You have already called initializeAppCheck() for FirebaseApp {$appName} with different options. To avoid this error, call initializeAppCheck() with the same options as when it was originally called. This will return the already initialized instance.","use-before-activation":"App Check is being used before initializeAppCheck() is called for FirebaseApp {$appName}. Call initializeAppCheck() before instantiating other Firebase services.","fetch-network-error":"Fetch failed to connect to a network. Check Internet connection. Original error: {$originalErrorMessage}.","fetch-parse-error":"Fetch client could not parse response. Original error: {$originalErrorMessage}.","fetch-status-error":"Fetch server returned an HTTP error status. HTTP status: {$httpStatus}.","storage-open":"Error thrown when opening storage. Original error: {$originalErrorMessage}.","storage-get":"Error thrown when reading from storage. Original error: {$originalErrorMessage}.","storage-set":"Error thrown when writing to storage. Original error: {$originalErrorMessage}.","recaptcha-error":"ReCAPTCHA error.","initial-throttle":"{$httpStatus} error. Attempts allowed again after {$time}",throttled:"Requests throttled due to previous {$httpStatus} error. Attempts allowed again after {$time}"},ye=new Zn("appCheck","AppCheck",YT);/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ud(t=!1){return t?self.grecaptcha?.enterprise:self.grecaptcha}function Dc(t){if(!Q(t).activated)throw ye.create("use-before-activation",{appName:t.name})}function bp(t){const e=Math.round(t/1e3),n=Math.floor(e/(3600*24)),r=Math.floor((e-n*3600*24)/3600),i=Math.floor((e-n*3600*24-r*3600)/60),s=e-n*3600*24-r*3600-i*60;let o="";return n&&(o+=vi(n)+"d:"),r&&(o+=vi(r)+"h:"),o+=vi(i)+"m:"+vi(s)+"s",o}function vi(t){return t===0?"00":t>=10?t.toString():"0"+t}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Mc({url:t,body:e},n){const r={"Content-Type":"application/json"},i=n.getImmediate({optional:!0});if(i){const d=await i.getHeartbeatsHeader();d&&(r["X-Firebase-Client"]=d)}const s={method:"POST",body:JSON.stringify(e),headers:r};let o;try{o=await fetch(t,s)}catch(d){throw ye.create("fetch-network-error",{originalErrorMessage:d?.message})}if(o.status!==200)throw ye.create("fetch-status-error",{httpStatus:o.status});let a;try{a=await o.json()}catch(d){throw ye.create("fetch-parse-error",{originalErrorMessage:d?.message})}const c=a.ttl.match(/^([\d.]+)(s)$/);if(!c||!c[2]||isNaN(Number(c[1])))throw ye.create("fetch-parse-error",{originalErrorMessage:`ttl field (timeToLive) is not in standard Protobuf Duration format: ${a.ttl}`});const l=Number(c[1])*1e3,u=Date.now();return{token:a.token,expireTimeMillis:u+l,issuedAtTimeMillis:u}}function KT(t,e){const{projectId:n,appId:r,apiKey:i}=t.options;return{url:`${wp}/projects/${n}/apps/${r}:${VT}?key=${i}`,body:{recaptcha_enterprise_token:e}}}function Sp(t,e){const{projectId:n,appId:r,apiKey:i}=t.options;return{url:`${wp}/projects/${n}/apps/${r}:${jT}?key=${i}`,body:{debug_token:e}}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const JT="firebase-app-check-database",XT=1,Gr="firebase-app-check-store",Cp="debug-token";let wi=null;function Tp(){return wi||(wi=new Promise((t,e)=>{try{const n=indexedDB.open(JT,XT);n.onsuccess=r=>{t(r.target.result)},n.onerror=r=>{e(ye.create("storage-open",{originalErrorMessage:r.target.error?.message}))},n.onupgradeneeded=r=>{const i=r.target.result;switch(r.oldVersion){case 0:i.createObjectStore(Gr,{keyPath:"compositeKey"})}}}catch(n){e(ye.create("storage-open",{originalErrorMessage:n?.message}))}}),wi)}function QT(t){return kp(Rp(t))}function ZT(t,e){return Ip(Rp(t),e)}function eI(t){return Ip(Cp,t)}function tI(){return kp(Cp)}async function Ip(t,e){const r=(await Tp()).transaction(Gr,"readwrite"),s=r.objectStore(Gr).put({compositeKey:t,value:e});return new Promise((o,a)=>{s.onsuccess=c=>{o()},r.onerror=c=>{a(ye.create("storage-set",{originalErrorMessage:c.target.error?.message}))}})}async function kp(t){const n=(await Tp()).transaction(Gr,"readonly"),i=n.objectStore(Gr).get(t);return new Promise((s,o)=>{i.onsuccess=a=>{const c=a.target.result;s(c?c.value:void 0)},n.onerror=a=>{o(ye.create("storage-get",{originalErrorMessage:a.target.error?.message}))}})}function Rp(t){return`${t.options.appId}-${t.name}`}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const St=new Ps("@firebase/app-check");/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function nI(t){if(Ka()){let e;try{e=await QT(t)}catch(n){St.warn(`Failed to read token from IndexedDB. Error: ${n}`)}return e}}function bo(t,e){return Ka()?ZT(t,e).catch(n=>{St.warn(`Failed to write token to IndexedDB. Error: ${n}`)}):Promise.resolve()}async function rI(){let t;try{t=await tI()}catch{}if(t)return t;{const e=crypto.randomUUID();return eI(e).catch(n=>St.warn(`Failed to persist debug token to IndexedDB. Error: ${n}`)),e}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function xc(){return Vs().enabled}async function Fc(){const t=Vs();if(t.enabled&&t.token)return t.token.promise;throw Error(`
            Can't get debug token in production mode.
        `)}function iI(){const t=Gh(),e=Vs();if(e.initialized=!0,typeof t.FIREBASE_APPCHECK_DEBUG_TOKEN!="string"&&t.FIREBASE_APPCHECK_DEBUG_TOKEN!==!0)return;e.enabled=!0;const n=new lt;e.token=n,typeof t.FIREBASE_APPCHECK_DEBUG_TOKEN=="string"?n.resolve(t.FIREBASE_APPCHECK_DEBUG_TOKEN):n.resolve(rI())}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const sI={error:"UNKNOWN_ERROR"};function oI(t){return ks.encodeString(JSON.stringify(t),!1)}async function pa(t,e=!1,n=!1){const r=t.app;Dc(r);const i=Q(r);let s=i.token,o;if(s&&!En(s)&&(i.token=void 0,s=void 0),!s){const l=await i.cachedTokenPromise;l&&(En(l)?s=l:await bo(r,void 0))}if(!e&&s&&En(s))return{token:s.token};let a=!1;if(xc())try{i.exchangeTokenPromise||(i.exchangeTokenPromise=Mc(Sp(r,await Fc()),t.heartbeatServiceProvider).finally(()=>{i.exchangeTokenPromise=void 0}),a=!0);const l=await i.exchangeTokenPromise;return await bo(r,l),i.token=l,{token:l.token}}catch(l){return l.code==="appCheck/throttled"||l.code==="appCheck/initial-throttle"?St.warn(l.message):n&&St.error(l),So(l)}try{i.exchangeTokenPromise||(i.exchangeTokenPromise=i.provider.getToken().finally(()=>{i.exchangeTokenPromise=void 0}),a=!0),s=await Q(r).exchangeTokenPromise}catch(l){l.code==="appCheck/throttled"||l.code==="appCheck/initial-throttle"?St.warn(l.message):n&&St.error(l),o=l}let c;return s?o?En(s)?c={token:s.token,internalError:o}:c=So(o):(c={token:s.token},i.token=s,await bo(r,s)):c=So(o),a&&Np(r,c),c}async function aI(t){const e=t.app;Dc(e);const{provider:n}=Q(e);if(xc()){const r=await Fc(),{token:i}=await Mc(Sp(e,r),t.heartbeatServiceProvider);return{token:i}}else{const{token:r}=await n.getToken();return{token:r}}}function Ap(t,e,n,r){const{app:i}=t,s=Q(i),o={next:n,error:r,type:e};if(s.tokenObservers=[...s.tokenObservers,o],s.token&&En(s.token)){const a=s.token;Promise.resolve().then(()=>{n({token:a.token}),dd(t)}).catch(()=>{})}s.cachedTokenPromise.then(()=>dd(t))}function Pp(t,e){const n=Q(t),r=n.tokenObservers.filter(i=>i.next!==e);r.length===0&&n.tokenRefresher&&n.tokenRefresher.isRunning()&&n.tokenRefresher.stop(),n.tokenObservers=r}function dd(t){const{app:e}=t,n=Q(e);let r=n.tokenRefresher;r||(r=cI(t),n.tokenRefresher=r),!r.isRunning()&&n.isTokenAutoRefreshEnabled&&r.start()}function cI(t){const{app:e}=t;return new zT(async()=>{const n=Q(e);let r;if(n.token?r=await pa(t,!0):r=await pa(t),r.error)throw r.error;if(r.internalError)throw r.internalError},()=>!0,()=>{const n=Q(e);if(n.token){let r=n.token.issuedAtTimeMillis+(n.token.expireTimeMillis-n.token.issuedAtTimeMillis)*.5+3e5;const i=n.token.expireTimeMillis-300*1e3;return r=Math.min(r,i),Math.max(0,r-Date.now())}else return 0},ld.RETRIAL_MIN_WAIT,ld.RETRIAL_MAX_WAIT)}function Np(t,e){const n=Q(t).tokenObservers;for(const r of n)try{r.type==="EXTERNAL"&&e.error!=null?r.error(e.error):r.next(e)}catch{}}function En(t){return t.expireTimeMillis-Date.now()>0}function So(t){return{token:oI(sI),error:t}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class lI{constructor(e,n){this.app=e,this.heartbeatServiceProvider=n}_delete(){const{tokenObservers:e}=Q(this.app);for(const n of e)Pp(this.app,n.next);return Promise.resolve()}}function uI(t,e){return new lI(t,e)}function dI(t){return{getToken:e=>pa(t,e),getLimitedUseToken:()=>aI(t),addTokenListener:e=>Ap(t,"INTERNAL",e),removeTokenListener:e=>Pp(t.app,e)}}const hI="@firebase/app-check",fI="0.11.0",pI="https://www.google.com/recaptcha/enterprise.js";function gI(t,e){const n=new lt,r=Q(t);r.reCAPTCHAState={initialized:n};const i=mI(t),s=ud(!0);return s?hd(t,e,s,i,n):EI(()=>{const o=ud(!0);if(!o)throw new Error("no recaptcha");hd(t,e,o,i,n)}),n.promise}function hd(t,e,n,r,i){n.ready(()=>{yI(t,e,n,r),i.resolve(n)})}function mI(t){const e=`fire_app_check_${t.name}`,n=document.createElement("div");return n.id=e,n.style.display="none",document.body.appendChild(n),e}async function _I(t){Dc(t);const n=await Q(t).reCAPTCHAState.initialized.promise;return new Promise((r,i)=>{const s=Q(t).reCAPTCHAState;n.ready(()=>{r(n.execute(s.widgetId,{action:"fire_app_check"}))})})}function yI(t,e,n,r){const i=n.render(r,{sitekey:e,size:"invisible",callback:()=>{Q(t).reCAPTCHAState.succeeded=!0},"error-callback":()=>{Q(t).reCAPTCHAState.succeeded=!1}}),s=Q(t);s.reCAPTCHAState={...s.reCAPTCHAState,widgetId:i}}function EI(t){const e=document.createElement("script");e.src=pI,e.onload=t,document.head.appendChild(e)}class Uc{constructor(e){this._siteKey=e,this._throttleData=null}async getToken(){wI(this._throttleData);const e=await _I(this._app).catch(r=>{throw ye.create("recaptcha-error")});if(!Q(this._app).reCAPTCHAState?.succeeded)throw ye.create("recaptcha-error");let n;try{n=await Mc(KT(this._app,e),this._heartbeatServiceProvider)}catch(r){throw r.code?.includes("fetch-status-error")?(this._throttleData=vI(Number(r.customData?.httpStatus),this._throttleData),ye.create("initial-throttle",{time:bp(this._throttleData.allowRequestsAfter-Date.now()),httpStatus:this._throttleData.httpStatus})):r}return this._throttleData=null,n}initialize(e){this._app=e,this._heartbeatServiceProvider=ti(e,"heartbeat"),gI(e,this._siteKey).catch(()=>{})}isEqual(e){return e instanceof Uc?this._siteKey===e._siteKey:!1}}function vI(t,e){if(t===404||t===403)return{backoffCount:1,allowRequestsAfter:Date.now()+GT,httpStatus:t};{const n=e?e.backoffCount:0,r=Ew(n,1e3,2);return{backoffCount:n+1,allowRequestsAfter:Date.now()+r,httpStatus:t}}}function wI(t){if(t&&Date.now()-t.allowRequestsAfter<=0)throw ye.create("throttled",{time:bp(t.allowRequestsAfter-Date.now()),httpStatus:t.httpStatus})}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function bI(t=Xa(),e){t=ce(t);const n=ti(t,"app-check");if(Vs().initialized||iI(),xc()&&Fc().then(i=>console.log(`App Check debug token: ${i}. You will need to add it to your app's App Check settings in the Firebase console for it to work.`)),n.isInitialized()){const i=n.getImmediate(),s=n.getOptions();if(s.isTokenAutoRefreshEnabled===e.isTokenAutoRefreshEnabled&&s.provider.isEqual(e.provider))return i;throw ye.create("already-initialized",{appName:t.name})}const r=n.initialize({options:e});return SI(t,e.provider,e.isTokenAutoRefreshEnabled),Q(t).isTokenAutoRefreshEnabled&&Ap(r,"INTERNAL",()=>{}),r}function SI(t,e,n=!1){const r=WT(t,{...vp});r.activated=!0,r.provider=e,r.cachedTokenPromise=nI(t).then(i=>(i&&En(i)&&(r.token=i,Np(t,{token:i.token})),i)),r.isTokenAutoRefreshEnabled=n&&t.automaticDataCollectionEnabled,!t.automaticDataCollectionEnabled&&n&&St.warn("`isTokenAutoRefreshEnabled` is true but `automaticDataCollectionEnabled` was set to false during `initializeApp()`. This blocks automatic token refresh."),r.provider.initialize(t)}const CI="app-check",fd="app-check-internal";function TI(){xt(new ut(CI,t=>{const e=t.getProvider("app").getImmediate(),n=t.getProvider("heartbeat");return uI(e,n)},"PUBLIC").setInstantiationMode("EXPLICIT").setInstanceCreatedCallback((t,e,n)=>{t.getProvider(fd).initialize()})),xt(new ut(fd,t=>{const e=t.getProvider("app-check").getImmediate();return dI(e)},"PUBLIC").setInstantiationMode("EXPLICIT")),ot(hI,fI)}TI();const II={apiKey:"AIzaSyA-fvCaKCjyEFX__YAVr1oPGdVsUEhFehA",authDomain:"vidu-aae11.firebaseapp.com",projectId:"vidu-aae11",databaseURL:"https://vidu-aae11-default-rtdb.europe-west1.firebasedatabase.app",storageBucket:"vidu-aae11.firebasestorage.app",messagingSenderId:"765724787439",appId:"1:765724787439:web:61a3b5dd538149564c911a",measurementId:"G-EGJ53HLGY4"},$c=tf(II),pd="6LdBIBgsAAAAAB4zIcXaZI-FD4kt21TWs9Zx9_fp";let ga;if(pd.trim()!=="")ga=new Uc(pd),console.info("[Firebase App Check: PROD] Initializing with ReCAPTCHA Enterprise (invisible mode).");else throw console.error("[Firebase App Check: PROD] VITE_RECAPTCHA_ENTERPRISE_SITE_KEY is missing or empty. App Check will NOT be initialized, leaving Firebase services unprotected!"),new Error("Firebase App Check configuration missing in production.");if(ga)try{bI($c,{provider:ga,isTokenAutoRefreshEnabled:!0})}catch(t){console.error("[Firebase App Check] initializeAppCheck call failed:",t)}const oe=xT($c),xe=[];function Xt(t,e,n,r=null,i=null,s=null){e==="value"?IT(t,n):e==="child_added"?kT(t,n):e==="child_removed"?RT(t,n):console.warn(`Unknown listener type: ${e}`),xe.push({ref:t,type:e,callback:n,roomId:r,userId:i,category:s})}function kI(){xe.forEach(({ref:t,type:e,callback:n})=>{try{Ws(t,e,n)}catch(r){console.warn("Failed to remove firebase rtdb listener",r)}}),xe.length=0}function js(t){if(!t)return;xe.filter(r=>r.roomId===t).forEach(({ref:r,type:i,callback:s})=>{try{Ws(r,i,s)}catch(o){console.warn(`Failed to remove listener for room ${t}`,o)}});const n=xe.filter(r=>r.roomId!==t);xe.length=0,xe.push(...n)}function RI(t,e){if(!t||!e)return;const n=s=>s.userId===t&&s.roomId===e;xe.filter(n).forEach(({ref:s,type:o,callback:a})=>{try{Ws(s,o,a)}catch(c){console.warn(`Failed to remove listener for user ${t} in room ${e}`,c)}});const i=xe.filter(s=>!n(s));xe.length=0,xe.push(...i)}function Li(t,e,n=null){Xt(t,"value",e,n)}const Gt=t=>se(oe,`rooms/${t}`),bi=t=>se(oe,`rooms/${t}/members`),gd=(t,e)=>se(oe,`rooms/${t}/members/${e}`),AI=t=>se(oe,`rooms/${t}/cancellation`),Gs=t=>se(oe,`rooms/${t}/watch`),PI=t=>se(oe,`users/${t}/recentCalls`),Bc=(t,e)=>se(oe,`users/${t}/recentCalls/${e}`),Hc=t=>se(oe,`users/${t}/outgoingCall`),Lp=t=>se(oe,`rooms/${t}/offerCandidates`),Op=t=>se(oe,`rooms/${t}/answerCandidates`);function Dp(){return{"dependent-sdk-initialized-before-auth":"Another Firebase SDK was initialized and is trying to use Auth before Auth is initialized. Please be sure to call `initializeAuth` or `getAuth` before starting any other Firebase SDK."}}const NI=Dp,Mp=new Zn("auth","Firebase",Dp());/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const os=new Ps("@firebase/auth");function LI(t,...e){os.logLevel<=O.WARN&&os.warn(`Auth (${tr}): ${t}`,...e)}function Oi(t,...e){os.logLevel<=O.ERROR&&os.error(`Auth (${tr}): ${t}`,...e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function qe(t,...e){throw Vc(t,...e)}function Be(t,...e){return Vc(t,...e)}function Wc(t,e,n){const r={...NI(),[e]:n};return new Zn("auth","Firebase",r).create(e,{appName:t.name})}function nn(t){return Wc(t,"operation-not-supported-in-this-environment","Operations that alter the current user are not supported in conjunction with FirebaseServerApp")}function OI(t,e,n){const r=n;if(!(e instanceof r))throw r.name!==e.constructor.name&&qe(t,"argument-error"),Wc(t,"argument-error",`Type of ${e.constructor.name} does not match expected instance.Did you pass a reference from a different Auth SDK?`)}function Vc(t,...e){if(typeof t!="string"){const n=e[0],r=[...e.slice(1)];return r[0]&&(r[0].appName=t.name),t._errorFactory.create(n,...r)}return Mp.create(t,...e)}function S(t,e,...n){if(!t)throw Vc(e,...n)}function nt(t){const e="INTERNAL ASSERTION FAILED: "+t;throw Oi(e),new Error(e)}function pt(t,e){t||nt(e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ma(){return typeof self<"u"&&self.location?.href||""}function DI(){return md()==="http:"||md()==="https:"}function md(){return typeof self<"u"&&self.location?.protocol||null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function MI(){return typeof navigator<"u"&&navigator&&"onLine"in navigator&&typeof navigator.onLine=="boolean"&&(DI()||tw()||"connection"in navigator)?navigator.onLine:!0}function xI(){if(typeof navigator>"u")return null;const t=navigator;return t.languages&&t.languages[0]||t.language||null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class li{constructor(e,n){this.shortDelay=e,this.longDelay=n,pt(n>e,"Short delay should be less than long delay!"),this.isMobile=Ya()||Xh()}get(){return MI()?this.isMobile?this.longDelay:this.shortDelay:Math.min(5e3,this.shortDelay)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function jc(t,e){pt(t.emulator,"Emulator should always be set here");const{url:n}=t.emulator;return e?`${n}${e.startsWith("/")?e.slice(1):e}`:n}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class xp{static initialize(e,n,r){this.fetchImpl=e,n&&(this.headersImpl=n),r&&(this.responseImpl=r)}static fetch(){if(this.fetchImpl)return this.fetchImpl;if(typeof self<"u"&&"fetch"in self)return self.fetch;if(typeof globalThis<"u"&&globalThis.fetch)return globalThis.fetch;if(typeof fetch<"u")return fetch;nt("Could not find fetch implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static headers(){if(this.headersImpl)return this.headersImpl;if(typeof self<"u"&&"Headers"in self)return self.Headers;if(typeof globalThis<"u"&&globalThis.Headers)return globalThis.Headers;if(typeof Headers<"u")return Headers;nt("Could not find Headers implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static response(){if(this.responseImpl)return this.responseImpl;if(typeof self<"u"&&"Response"in self)return self.Response;if(typeof globalThis<"u"&&globalThis.Response)return globalThis.Response;if(typeof Response<"u")return Response;nt("Could not find Response implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const FI={CREDENTIAL_MISMATCH:"custom-token-mismatch",MISSING_CUSTOM_TOKEN:"internal-error",INVALID_IDENTIFIER:"invalid-email",MISSING_CONTINUE_URI:"internal-error",INVALID_PASSWORD:"wrong-password",MISSING_PASSWORD:"missing-password",INVALID_LOGIN_CREDENTIALS:"invalid-credential",EMAIL_EXISTS:"email-already-in-use",PASSWORD_LOGIN_DISABLED:"operation-not-allowed",INVALID_IDP_RESPONSE:"invalid-credential",INVALID_PENDING_TOKEN:"invalid-credential",FEDERATED_USER_ID_ALREADY_LINKED:"credential-already-in-use",MISSING_REQ_TYPE:"internal-error",EMAIL_NOT_FOUND:"user-not-found",RESET_PASSWORD_EXCEED_LIMIT:"too-many-requests",EXPIRED_OOB_CODE:"expired-action-code",INVALID_OOB_CODE:"invalid-action-code",MISSING_OOB_CODE:"internal-error",CREDENTIAL_TOO_OLD_LOGIN_AGAIN:"requires-recent-login",INVALID_ID_TOKEN:"invalid-user-token",TOKEN_EXPIRED:"user-token-expired",USER_NOT_FOUND:"user-token-expired",TOO_MANY_ATTEMPTS_TRY_LATER:"too-many-requests",PASSWORD_DOES_NOT_MEET_REQUIREMENTS:"password-does-not-meet-requirements",INVALID_CODE:"invalid-verification-code",INVALID_SESSION_INFO:"invalid-verification-id",INVALID_TEMPORARY_PROOF:"invalid-credential",MISSING_SESSION_INFO:"missing-verification-id",SESSION_EXPIRED:"code-expired",MISSING_ANDROID_PACKAGE_NAME:"missing-android-pkg-name",UNAUTHORIZED_DOMAIN:"unauthorized-continue-uri",INVALID_OAUTH_CLIENT_ID:"invalid-oauth-client-id",ADMIN_ONLY_OPERATION:"admin-restricted-operation",INVALID_MFA_PENDING_CREDENTIAL:"invalid-multi-factor-session",MFA_ENROLLMENT_NOT_FOUND:"multi-factor-info-not-found",MISSING_MFA_ENROLLMENT_ID:"missing-multi-factor-info",MISSING_MFA_PENDING_CREDENTIAL:"missing-multi-factor-session",SECOND_FACTOR_EXISTS:"second-factor-already-in-use",SECOND_FACTOR_LIMIT_EXCEEDED:"maximum-second-factor-count-exceeded",BLOCKING_FUNCTION_ERROR_RESPONSE:"internal-error",RECAPTCHA_NOT_ENABLED:"recaptcha-not-enabled",MISSING_RECAPTCHA_TOKEN:"missing-recaptcha-token",INVALID_RECAPTCHA_TOKEN:"invalid-recaptcha-token",INVALID_RECAPTCHA_ACTION:"invalid-recaptcha-action",MISSING_CLIENT_TYPE:"missing-client-type",MISSING_RECAPTCHA_VERSION:"missing-recaptcha-version",INVALID_RECAPTCHA_VERSION:"invalid-recaptcha-version",INVALID_REQ_TYPE:"invalid-req-type"};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const UI=["/v1/accounts:signInWithCustomToken","/v1/accounts:signInWithEmailLink","/v1/accounts:signInWithIdp","/v1/accounts:signInWithPassword","/v1/accounts:signInWithPhoneNumber","/v1/token"],$I=new li(3e4,6e4);function Gc(t,e){return t.tenantId&&!e.tenantId?{...e,tenantId:t.tenantId}:e}async function sr(t,e,n,r,i={}){return Fp(t,i,async()=>{let s={},o={};r&&(e==="GET"?o=r:s={body:JSON.stringify(r)});const a=er({key:t.config.apiKey,...o}).slice(1),c=await t._getAdditionalHeaders();c["Content-Type"]="application/json",t.languageCode&&(c["X-Firebase-Locale"]=t.languageCode);const l={method:e,headers:c,...s};return ew()||(l.referrerPolicy="no-referrer"),t.emulatorConfig&&Qn(t.emulatorConfig.host)&&(l.credentials="include"),xp.fetch()(await Up(t,t.config.apiHost,n,a),l)})}async function Fp(t,e,n){t._canInitEmulator=!1;const r={...FI,...e};try{const i=new HI(t),s=await Promise.race([n(),i.promise]);i.clearNetworkTimeout();const o=await s.json();if("needConfirmation"in o)throw Si(t,"account-exists-with-different-credential",o);if(s.ok&&!("errorMessage"in o))return o;{const a=s.ok?o.errorMessage:o.error.message,[c,l]=a.split(" : ");if(c==="FEDERATED_USER_ID_ALREADY_LINKED")throw Si(t,"credential-already-in-use",o);if(c==="EMAIL_EXISTS")throw Si(t,"email-already-in-use",o);if(c==="USER_DISABLED")throw Si(t,"user-disabled",o);const u=r[c]||c.toLowerCase().replace(/[_\s]+/g,"-");if(l)throw Wc(t,u,l);qe(t,u)}}catch(i){if(i instanceof Ht)throw i;qe(t,"network-request-failed",{message:String(i)})}}async function BI(t,e,n,r,i={}){const s=await sr(t,e,n,r,i);return"mfaPendingCredential"in s&&qe(t,"multi-factor-auth-required",{_serverResponse:s}),s}async function Up(t,e,n,r){const i=`${e}${n}?${r}`,s=t,o=s.config.emulator?jc(t.config,i):`${t.config.apiScheme}://${i}`;return UI.includes(n)&&(await s._persistenceManagerAvailable,s._getPersistenceType()==="COOKIE")?s._getPersistence()._getFinalTarget(o).toString():o}class HI{clearNetworkTimeout(){clearTimeout(this.timer)}constructor(e){this.auth=e,this.timer=null,this.promise=new Promise((n,r)=>{this.timer=setTimeout(()=>r(Be(this.auth,"network-request-failed")),$I.get())})}}function Si(t,e,n){const r={appName:t.name};n.email&&(r.email=n.email),n.phoneNumber&&(r.phoneNumber=n.phoneNumber);const i=Be(t,e,r);return i.customData._tokenResponse=n,i}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function WI(t,e){return sr(t,"POST","/v1/accounts:delete",e)}async function as(t,e){return sr(t,"POST","/v1/accounts:lookup",e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ir(t){if(t)try{const e=new Date(Number(t));if(!isNaN(e.getTime()))return e.toUTCString()}catch{}}async function VI(t,e=!1){const n=ce(t),r=await n.getIdToken(e),i=zc(r);S(i&&i.exp&&i.auth_time&&i.iat,n.auth,"internal-error");const s=typeof i.firebase=="object"?i.firebase:void 0,o=s?.sign_in_provider;return{claims:i,token:r,authTime:Ir(Co(i.auth_time)),issuedAtTime:Ir(Co(i.iat)),expirationTime:Ir(Co(i.exp)),signInProvider:o||null,signInSecondFactor:s?.sign_in_second_factor||null}}function Co(t){return Number(t)*1e3}function zc(t){const[e,n,r]=t.split(".");if(e===void 0||n===void 0||r===void 0)return Oi("JWT malformed, contained fewer than 3 sections"),null;try{const i=ji(n);return i?JSON.parse(i):(Oi("Failed to decode base64 JWT payload"),null)}catch(i){return Oi("Caught error parsing JWT payload as JSON",i?.toString()),null}}function _d(t){const e=zc(t);return S(e,"internal-error"),S(typeof e.exp<"u","internal-error"),S(typeof e.iat<"u","internal-error"),Number(e.exp)-Number(e.iat)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function zr(t,e,n=!1){if(n)return e;try{return await e}catch(r){throw r instanceof Ht&&jI(r)&&t.auth.currentUser===t&&await t.auth.signOut(),r}}function jI({code:t}){return t==="auth/user-disabled"||t==="auth/user-token-expired"}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class GI{constructor(e){this.user=e,this.isRunning=!1,this.timerId=null,this.errorBackoff=3e4}_start(){this.isRunning||(this.isRunning=!0,this.schedule())}_stop(){this.isRunning&&(this.isRunning=!1,this.timerId!==null&&clearTimeout(this.timerId))}getInterval(e){if(e){const n=this.errorBackoff;return this.errorBackoff=Math.min(this.errorBackoff*2,96e4),n}else{this.errorBackoff=3e4;const r=(this.user.stsTokenManager.expirationTime??0)-Date.now()-3e5;return Math.max(0,r)}}schedule(e=!1){if(!this.isRunning)return;const n=this.getInterval(e);this.timerId=setTimeout(async()=>{await this.iteration()},n)}async iteration(){try{await this.user.getIdToken(!0)}catch(e){e?.code==="auth/network-request-failed"&&this.schedule(!0);return}this.schedule()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class _a{constructor(e,n){this.createdAt=e,this.lastLoginAt=n,this._initializeTime()}_initializeTime(){this.lastSignInTime=Ir(this.lastLoginAt),this.creationTime=Ir(this.createdAt)}_copy(e){this.createdAt=e.createdAt,this.lastLoginAt=e.lastLoginAt,this._initializeTime()}toJSON(){return{createdAt:this.createdAt,lastLoginAt:this.lastLoginAt}}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function cs(t){const e=t.auth,n=await t.getIdToken(),r=await zr(t,as(e,{idToken:n}));S(r?.users.length,e,"internal-error");const i=r.users[0];t._notifyReloadListener(i);const s=i.providerUserInfo?.length?$p(i.providerUserInfo):[],o=qI(t.providerData,s),a=t.isAnonymous,c=!(t.email&&i.passwordHash)&&!o?.length,l=a?c:!1,u={uid:i.localId,displayName:i.displayName||null,photoURL:i.photoUrl||null,email:i.email||null,emailVerified:i.emailVerified||!1,phoneNumber:i.phoneNumber||null,tenantId:i.tenantId||null,providerData:o,metadata:new _a(i.createdAt,i.lastLoginAt),isAnonymous:l};Object.assign(t,u)}async function zI(t){const e=ce(t);await cs(e),await e.auth._persistUserIfCurrent(e),e.auth._notifyListenersIfCurrent(e)}function qI(t,e){return[...t.filter(r=>!e.some(i=>i.providerId===r.providerId)),...e]}function $p(t){return t.map(({providerId:e,...n})=>({providerId:e,uid:n.rawId||"",displayName:n.displayName||null,email:n.email||null,phoneNumber:n.phoneNumber||null,photoURL:n.photoUrl||null}))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function YI(t,e){const n=await Fp(t,{},async()=>{const r=er({grant_type:"refresh_token",refresh_token:e}).slice(1),{tokenApiHost:i,apiKey:s}=t.config,o=await Up(t,i,"/v1/token",`key=${s}`),a=await t._getAdditionalHeaders();a["Content-Type"]="application/x-www-form-urlencoded";const c={method:"POST",headers:a,body:r};return t.emulatorConfig&&Qn(t.emulatorConfig.host)&&(c.credentials="include"),xp.fetch()(o,c)});return{accessToken:n.access_token,expiresIn:n.expires_in,refreshToken:n.refresh_token}}async function KI(t,e){return sr(t,"POST","/v2/accounts:revokeToken",Gc(t,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Sn{constructor(){this.refreshToken=null,this.accessToken=null,this.expirationTime=null}get isExpired(){return!this.expirationTime||Date.now()>this.expirationTime-3e4}updateFromServerResponse(e){S(e.idToken,"internal-error"),S(typeof e.idToken<"u","internal-error"),S(typeof e.refreshToken<"u","internal-error");const n="expiresIn"in e&&typeof e.expiresIn<"u"?Number(e.expiresIn):_d(e.idToken);this.updateTokensAndExpiration(e.idToken,e.refreshToken,n)}updateFromIdToken(e){S(e.length!==0,"internal-error");const n=_d(e);this.updateTokensAndExpiration(e,null,n)}async getToken(e,n=!1){return!n&&this.accessToken&&!this.isExpired?this.accessToken:(S(this.refreshToken,e,"user-token-expired"),this.refreshToken?(await this.refresh(e,this.refreshToken),this.accessToken):null)}clearRefreshToken(){this.refreshToken=null}async refresh(e,n){const{accessToken:r,refreshToken:i,expiresIn:s}=await YI(e,n);this.updateTokensAndExpiration(r,i,Number(s))}updateTokensAndExpiration(e,n,r){this.refreshToken=n||null,this.accessToken=e||null,this.expirationTime=Date.now()+r*1e3}static fromJSON(e,n){const{refreshToken:r,accessToken:i,expirationTime:s}=n,o=new Sn;return r&&(S(typeof r=="string","internal-error",{appName:e}),o.refreshToken=r),i&&(S(typeof i=="string","internal-error",{appName:e}),o.accessToken=i),s&&(S(typeof s=="number","internal-error",{appName:e}),o.expirationTime=s),o}toJSON(){return{refreshToken:this.refreshToken,accessToken:this.accessToken,expirationTime:this.expirationTime}}_assign(e){this.accessToken=e.accessToken,this.refreshToken=e.refreshToken,this.expirationTime=e.expirationTime}_clone(){return Object.assign(new Sn,this.toJSON())}_performRefresh(){return nt("not implemented")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function _t(t,e){S(typeof t=="string"||typeof t>"u","internal-error",{appName:e})}class Fe{constructor({uid:e,auth:n,stsTokenManager:r,...i}){this.providerId="firebase",this.proactiveRefresh=new GI(this),this.reloadUserInfo=null,this.reloadListener=null,this.uid=e,this.auth=n,this.stsTokenManager=r,this.accessToken=r.accessToken,this.displayName=i.displayName||null,this.email=i.email||null,this.emailVerified=i.emailVerified||!1,this.phoneNumber=i.phoneNumber||null,this.photoURL=i.photoURL||null,this.isAnonymous=i.isAnonymous||!1,this.tenantId=i.tenantId||null,this.providerData=i.providerData?[...i.providerData]:[],this.metadata=new _a(i.createdAt||void 0,i.lastLoginAt||void 0)}async getIdToken(e){const n=await zr(this,this.stsTokenManager.getToken(this.auth,e));return S(n,this.auth,"internal-error"),this.accessToken!==n&&(this.accessToken=n,await this.auth._persistUserIfCurrent(this),this.auth._notifyListenersIfCurrent(this)),n}getIdTokenResult(e){return VI(this,e)}reload(){return zI(this)}_assign(e){this!==e&&(S(this.uid===e.uid,this.auth,"internal-error"),this.displayName=e.displayName,this.photoURL=e.photoURL,this.email=e.email,this.emailVerified=e.emailVerified,this.phoneNumber=e.phoneNumber,this.isAnonymous=e.isAnonymous,this.tenantId=e.tenantId,this.providerData=e.providerData.map(n=>({...n})),this.metadata._copy(e.metadata),this.stsTokenManager._assign(e.stsTokenManager))}_clone(e){const n=new Fe({...this,auth:e,stsTokenManager:this.stsTokenManager._clone()});return n.metadata._copy(this.metadata),n}_onReload(e){S(!this.reloadListener,this.auth,"internal-error"),this.reloadListener=e,this.reloadUserInfo&&(this._notifyReloadListener(this.reloadUserInfo),this.reloadUserInfo=null)}_notifyReloadListener(e){this.reloadListener?this.reloadListener(e):this.reloadUserInfo=e}_startProactiveRefresh(){this.proactiveRefresh._start()}_stopProactiveRefresh(){this.proactiveRefresh._stop()}async _updateTokensIfNecessary(e,n=!1){let r=!1;e.idToken&&e.idToken!==this.stsTokenManager.accessToken&&(this.stsTokenManager.updateFromServerResponse(e),r=!0),n&&await cs(this),await this.auth._persistUserIfCurrent(this),r&&this.auth._notifyListenersIfCurrent(this)}async delete(){if(Oe(this.auth.app))return Promise.reject(nn(this.auth));const e=await this.getIdToken();return await zr(this,WI(this.auth,{idToken:e})),this.stsTokenManager.clearRefreshToken(),this.auth.signOut()}toJSON(){return{uid:this.uid,email:this.email||void 0,emailVerified:this.emailVerified,displayName:this.displayName||void 0,isAnonymous:this.isAnonymous,photoURL:this.photoURL||void 0,phoneNumber:this.phoneNumber||void 0,tenantId:this.tenantId||void 0,providerData:this.providerData.map(e=>({...e})),stsTokenManager:this.stsTokenManager.toJSON(),_redirectEventId:this._redirectEventId,...this.metadata.toJSON(),apiKey:this.auth.config.apiKey,appName:this.auth.name}}get refreshToken(){return this.stsTokenManager.refreshToken||""}static _fromJSON(e,n){const r=n.displayName??void 0,i=n.email??void 0,s=n.phoneNumber??void 0,o=n.photoURL??void 0,a=n.tenantId??void 0,c=n._redirectEventId??void 0,l=n.createdAt??void 0,u=n.lastLoginAt??void 0,{uid:d,emailVerified:h,isAnonymous:f,providerData:p,stsTokenManager:E}=n;S(d&&E,e,"internal-error");const m=Sn.fromJSON(this.name,E);S(typeof d=="string",e,"internal-error"),_t(r,e.name),_t(i,e.name),S(typeof h=="boolean",e,"internal-error"),S(typeof f=="boolean",e,"internal-error"),_t(s,e.name),_t(o,e.name),_t(a,e.name),_t(c,e.name),_t(l,e.name),_t(u,e.name);const T=new Fe({uid:d,auth:e,email:i,emailVerified:h,displayName:r,isAnonymous:f,photoURL:o,phoneNumber:s,tenantId:a,stsTokenManager:m,createdAt:l,lastLoginAt:u});return p&&Array.isArray(p)&&(T.providerData=p.map(N=>({...N}))),c&&(T._redirectEventId=c),T}static async _fromIdTokenResponse(e,n,r=!1){const i=new Sn;i.updateFromServerResponse(n);const s=new Fe({uid:n.localId,auth:e,stsTokenManager:i,isAnonymous:r});return await cs(s),s}static async _fromGetAccountInfoResponse(e,n,r){const i=n.users[0];S(i.localId!==void 0,"internal-error");const s=i.providerUserInfo!==void 0?$p(i.providerUserInfo):[],o=!(i.email&&i.passwordHash)&&!s?.length,a=new Sn;a.updateFromIdToken(r);const c=new Fe({uid:i.localId,auth:e,stsTokenManager:a,isAnonymous:o}),l={uid:i.localId,displayName:i.displayName||null,photoURL:i.photoUrl||null,email:i.email||null,emailVerified:i.emailVerified||!1,phoneNumber:i.phoneNumber||null,tenantId:i.tenantId||null,providerData:s,metadata:new _a(i.createdAt,i.lastLoginAt),isAnonymous:!(i.email&&i.passwordHash)&&!s?.length};return Object.assign(c,l),c}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const yd=new Map;function rt(t){pt(t instanceof Function,"Expected a class definition");let e=yd.get(t);return e?(pt(e instanceof t,"Instance stored in cache mismatched with class"),e):(e=new t,yd.set(t,e),e)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Bp{constructor(){this.type="NONE",this.storage={}}async _isAvailable(){return!0}async _set(e,n){this.storage[e]=n}async _get(e){const n=this.storage[e];return n===void 0?null:n}async _remove(e){delete this.storage[e]}_addListener(e,n){}_removeListener(e,n){}}Bp.type="NONE";const ya=Bp;/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Di(t,e,n){return`firebase:${t}:${e}:${n}`}class Cn{constructor(e,n,r){this.persistence=e,this.auth=n,this.userKey=r;const{config:i,name:s}=this.auth;this.fullUserKey=Di(this.userKey,i.apiKey,s),this.fullPersistenceKey=Di("persistence",i.apiKey,s),this.boundEventHandler=n._onStorageEvent.bind(n),this.persistence._addListener(this.fullUserKey,this.boundEventHandler)}setCurrentUser(e){return this.persistence._set(this.fullUserKey,e.toJSON())}async getCurrentUser(){const e=await this.persistence._get(this.fullUserKey);if(!e)return null;if(typeof e=="string"){const n=await as(this.auth,{idToken:e}).catch(()=>{});return n?Fe._fromGetAccountInfoResponse(this.auth,n,e):null}return Fe._fromJSON(this.auth,e)}removeCurrentUser(){return this.persistence._remove(this.fullUserKey)}savePersistenceForRedirect(){return this.persistence._set(this.fullPersistenceKey,this.persistence.type)}async setPersistence(e){if(this.persistence===e)return;const n=await this.getCurrentUser();if(await this.removeCurrentUser(),this.persistence=e,n)return this.setCurrentUser(n)}delete(){this.persistence._removeListener(this.fullUserKey,this.boundEventHandler)}static async create(e,n,r="authUser"){if(!n.length)return new Cn(rt(ya),e,r);const i=(await Promise.all(n.map(async l=>{if(await l._isAvailable())return l}))).filter(l=>l);let s=i[0]||rt(ya);const o=Di(r,e.config.apiKey,e.name);let a=null;for(const l of n)try{const u=await l._get(o);if(u){let d;if(typeof u=="string"){const h=await as(e,{idToken:u}).catch(()=>{});if(!h)break;d=await Fe._fromGetAccountInfoResponse(e,h,u)}else d=Fe._fromJSON(e,u);l!==s&&(a=d),s=l;break}}catch{}const c=i.filter(l=>l._shouldAllowMigration);return!s._shouldAllowMigration||!c.length?new Cn(s,e,r):(s=c[0],a&&await s._set(o,a.toJSON()),await Promise.all(n.map(async l=>{if(l!==s)try{await l._remove(o)}catch{}})),new Cn(s,e,r))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ed(t){const e=t.toLowerCase();if(e.includes("opera/")||e.includes("opr/")||e.includes("opios/"))return"Opera";if(jp(e))return"IEMobile";if(e.includes("msie")||e.includes("trident/"))return"IE";if(e.includes("edge/"))return"Edge";if(Hp(e))return"Firefox";if(e.includes("silk/"))return"Silk";if(zp(e))return"Blackberry";if(qp(e))return"Webos";if(Wp(e))return"Safari";if((e.includes("chrome/")||Vp(e))&&!e.includes("edge/"))return"Chrome";if(Gp(e))return"Android";{const n=/([a-zA-Z\d\.]+)\/[a-zA-Z\d\.]*$/,r=t.match(n);if(r?.length===2)return r[1]}return"Other"}function Hp(t=ge()){return/firefox\//i.test(t)}function Wp(t=ge()){const e=t.toLowerCase();return e.includes("safari/")&&!e.includes("chrome/")&&!e.includes("crios/")&&!e.includes("android")}function Vp(t=ge()){return/crios\//i.test(t)}function jp(t=ge()){return/iemobile/i.test(t)}function Gp(t=ge()){return/android/i.test(t)}function zp(t=ge()){return/blackberry/i.test(t)}function qp(t=ge()){return/webos/i.test(t)}function qc(t=ge()){return/iphone|ipad|ipod/i.test(t)||/macintosh/i.test(t)&&/mobile/i.test(t)}function JI(t=ge()){return qc(t)&&!!window.navigator?.standalone}function XI(){return nw()&&document.documentMode===10}function Yp(t=ge()){return qc(t)||Gp(t)||qp(t)||zp(t)||/windows phone/i.test(t)||jp(t)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Kp(t,e=[]){let n;switch(t){case"Browser":n=Ed(ge());break;case"Worker":n=`${Ed(ge())}-${t}`;break;default:n=t}const r=e.length?e.join(","):"FirebaseCore-web";return`${n}/JsCore/${tr}/${r}`}/**
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
 */class QI{constructor(e){this.auth=e,this.queue=[]}pushCallback(e,n){const r=s=>new Promise((o,a)=>{try{const c=e(s);o(c)}catch(c){a(c)}});r.onAbort=n,this.queue.push(r);const i=this.queue.length-1;return()=>{this.queue[i]=()=>Promise.resolve()}}async runMiddleware(e){if(this.auth.currentUser===e)return;const n=[];try{for(const r of this.queue)await r(e),r.onAbort&&n.push(r.onAbort)}catch(r){n.reverse();for(const i of n)try{i()}catch{}throw this.auth._errorFactory.create("login-blocked",{originalMessage:r?.message})}}}/**
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
 */async function ZI(t,e={}){return sr(t,"GET","/v2/passwordPolicy",Gc(t,e))}/**
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
 */const ek=6;class tk{constructor(e){const n=e.customStrengthOptions;this.customStrengthOptions={},this.customStrengthOptions.minPasswordLength=n.minPasswordLength??ek,n.maxPasswordLength&&(this.customStrengthOptions.maxPasswordLength=n.maxPasswordLength),n.containsLowercaseCharacter!==void 0&&(this.customStrengthOptions.containsLowercaseLetter=n.containsLowercaseCharacter),n.containsUppercaseCharacter!==void 0&&(this.customStrengthOptions.containsUppercaseLetter=n.containsUppercaseCharacter),n.containsNumericCharacter!==void 0&&(this.customStrengthOptions.containsNumericCharacter=n.containsNumericCharacter),n.containsNonAlphanumericCharacter!==void 0&&(this.customStrengthOptions.containsNonAlphanumericCharacter=n.containsNonAlphanumericCharacter),this.enforcementState=e.enforcementState,this.enforcementState==="ENFORCEMENT_STATE_UNSPECIFIED"&&(this.enforcementState="OFF"),this.allowedNonAlphanumericCharacters=e.allowedNonAlphanumericCharacters?.join("")??"",this.forceUpgradeOnSignin=e.forceUpgradeOnSignin??!1,this.schemaVersion=e.schemaVersion}validatePassword(e){const n={isValid:!0,passwordPolicy:this};return this.validatePasswordLengthOptions(e,n),this.validatePasswordCharacterOptions(e,n),n.isValid&&(n.isValid=n.meetsMinPasswordLength??!0),n.isValid&&(n.isValid=n.meetsMaxPasswordLength??!0),n.isValid&&(n.isValid=n.containsLowercaseLetter??!0),n.isValid&&(n.isValid=n.containsUppercaseLetter??!0),n.isValid&&(n.isValid=n.containsNumericCharacter??!0),n.isValid&&(n.isValid=n.containsNonAlphanumericCharacter??!0),n}validatePasswordLengthOptions(e,n){const r=this.customStrengthOptions.minPasswordLength,i=this.customStrengthOptions.maxPasswordLength;r&&(n.meetsMinPasswordLength=e.length>=r),i&&(n.meetsMaxPasswordLength=e.length<=i)}validatePasswordCharacterOptions(e,n){this.updatePasswordCharacterOptionsStatuses(n,!1,!1,!1,!1);let r;for(let i=0;i<e.length;i++)r=e.charAt(i),this.updatePasswordCharacterOptionsStatuses(n,r>="a"&&r<="z",r>="A"&&r<="Z",r>="0"&&r<="9",this.allowedNonAlphanumericCharacters.includes(r))}updatePasswordCharacterOptionsStatuses(e,n,r,i,s){this.customStrengthOptions.containsLowercaseLetter&&(e.containsLowercaseLetter||(e.containsLowercaseLetter=n)),this.customStrengthOptions.containsUppercaseLetter&&(e.containsUppercaseLetter||(e.containsUppercaseLetter=r)),this.customStrengthOptions.containsNumericCharacter&&(e.containsNumericCharacter||(e.containsNumericCharacter=i)),this.customStrengthOptions.containsNonAlphanumericCharacter&&(e.containsNonAlphanumericCharacter||(e.containsNonAlphanumericCharacter=s))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class nk{constructor(e,n,r,i){this.app=e,this.heartbeatServiceProvider=n,this.appCheckServiceProvider=r,this.config=i,this.currentUser=null,this.emulatorConfig=null,this.operations=Promise.resolve(),this.authStateSubscription=new vd(this),this.idTokenSubscription=new vd(this),this.beforeStateQueue=new QI(this),this.redirectUser=null,this.isProactiveRefreshEnabled=!1,this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION=1,this._canInitEmulator=!0,this._isInitialized=!1,this._deleted=!1,this._initializationPromise=null,this._popupRedirectResolver=null,this._errorFactory=Mp,this._agentRecaptchaConfig=null,this._tenantRecaptchaConfigs={},this._projectPasswordPolicy=null,this._tenantPasswordPolicies={},this._resolvePersistenceManagerAvailable=void 0,this.lastNotifiedUid=void 0,this.languageCode=null,this.tenantId=null,this.settings={appVerificationDisabledForTesting:!1},this.frameworks=[],this.name=e.name,this.clientVersion=i.sdkClientVersion,this._persistenceManagerAvailable=new Promise(s=>this._resolvePersistenceManagerAvailable=s)}_initializeWithPersistence(e,n){return n&&(this._popupRedirectResolver=rt(n)),this._initializationPromise=this.queue(async()=>{if(!this._deleted&&(this.persistenceManager=await Cn.create(this,e),this._resolvePersistenceManagerAvailable?.(),!this._deleted)){if(this._popupRedirectResolver?._shouldInitProactively)try{await this._popupRedirectResolver._initialize(this)}catch{}await this.initializeCurrentUser(n),this.lastNotifiedUid=this.currentUser?.uid||null,!this._deleted&&(this._isInitialized=!0)}}),this._initializationPromise}async _onStorageEvent(){if(this._deleted)return;const e=await this.assertedPersistence.getCurrentUser();if(!(!this.currentUser&&!e)){if(this.currentUser&&e&&this.currentUser.uid===e.uid){this._currentUser._assign(e),await this.currentUser.getIdToken();return}await this._updateCurrentUser(e,!0)}}async initializeCurrentUserFromIdToken(e){try{const n=await as(this,{idToken:e}),r=await Fe._fromGetAccountInfoResponse(this,n,e);await this.directlySetCurrentUser(r)}catch(n){console.warn("FirebaseServerApp could not login user with provided authIdToken: ",n),await this.directlySetCurrentUser(null)}}async initializeCurrentUser(e){if(Oe(this.app)){const s=this.app.settings.authIdToken;return s?new Promise(o=>{setTimeout(()=>this.initializeCurrentUserFromIdToken(s).then(o,o))}):this.directlySetCurrentUser(null)}const n=await this.assertedPersistence.getCurrentUser();let r=n,i=!1;if(e&&this.config.authDomain){await this.getOrInitRedirectPersistenceManager();const s=this.redirectUser?._redirectEventId,o=r?._redirectEventId,a=await this.tryRedirectSignIn(e);(!s||s===o)&&a?.user&&(r=a.user,i=!0)}if(!r)return this.directlySetCurrentUser(null);if(!r._redirectEventId){if(i)try{await this.beforeStateQueue.runMiddleware(r)}catch(s){r=n,this._popupRedirectResolver._overrideRedirectResult(this,()=>Promise.reject(s))}return r?this.reloadAndSetCurrentUserOrClear(r):this.directlySetCurrentUser(null)}return S(this._popupRedirectResolver,this,"argument-error"),await this.getOrInitRedirectPersistenceManager(),this.redirectUser&&this.redirectUser._redirectEventId===r._redirectEventId?this.directlySetCurrentUser(r):this.reloadAndSetCurrentUserOrClear(r)}async tryRedirectSignIn(e){let n=null;try{n=await this._popupRedirectResolver._completeRedirectFn(this,e,!0)}catch{await this._setRedirectUser(null)}return n}async reloadAndSetCurrentUserOrClear(e){try{await cs(e)}catch(n){if(n?.code!=="auth/network-request-failed")return this.directlySetCurrentUser(null)}return this.directlySetCurrentUser(e)}useDeviceLanguage(){this.languageCode=xI()}async _delete(){this._deleted=!0}async updateCurrentUser(e){if(Oe(this.app))return Promise.reject(nn(this));const n=e?ce(e):null;return n&&S(n.auth.config.apiKey===this.config.apiKey,this,"invalid-user-token"),this._updateCurrentUser(n&&n._clone(this))}async _updateCurrentUser(e,n=!1){if(!this._deleted)return e&&S(this.tenantId===e.tenantId,this,"tenant-id-mismatch"),n||await this.beforeStateQueue.runMiddleware(e),this.queue(async()=>{await this.directlySetCurrentUser(e),this.notifyAuthListeners()})}async signOut(){return Oe(this.app)?Promise.reject(nn(this)):(await this.beforeStateQueue.runMiddleware(null),(this.redirectPersistenceManager||this._popupRedirectResolver)&&await this._setRedirectUser(null),this._updateCurrentUser(null,!0))}setPersistence(e){return Oe(this.app)?Promise.reject(nn(this)):this.queue(async()=>{await this.assertedPersistence.setPersistence(rt(e))})}_getRecaptchaConfig(){return this.tenantId==null?this._agentRecaptchaConfig:this._tenantRecaptchaConfigs[this.tenantId]}async validatePassword(e){this._getPasswordPolicyInternal()||await this._updatePasswordPolicy();const n=this._getPasswordPolicyInternal();return n.schemaVersion!==this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION?Promise.reject(this._errorFactory.create("unsupported-password-policy-schema-version",{})):n.validatePassword(e)}_getPasswordPolicyInternal(){return this.tenantId===null?this._projectPasswordPolicy:this._tenantPasswordPolicies[this.tenantId]}async _updatePasswordPolicy(){const e=await ZI(this),n=new tk(e);this.tenantId===null?this._projectPasswordPolicy=n:this._tenantPasswordPolicies[this.tenantId]=n}_getPersistenceType(){return this.assertedPersistence.persistence.type}_getPersistence(){return this.assertedPersistence.persistence}_updateErrorMap(e){this._errorFactory=new Zn("auth","Firebase",e())}onAuthStateChanged(e,n,r){return this.registerStateListener(this.authStateSubscription,e,n,r)}beforeAuthStateChanged(e,n){return this.beforeStateQueue.pushCallback(e,n)}onIdTokenChanged(e,n,r){return this.registerStateListener(this.idTokenSubscription,e,n,r)}authStateReady(){return new Promise((e,n)=>{if(this.currentUser)e();else{const r=this.onAuthStateChanged(()=>{r(),e()},n)}})}async revokeAccessToken(e){if(this.currentUser){const n=await this.currentUser.getIdToken(),r={providerId:"apple.com",tokenType:"ACCESS_TOKEN",token:e,idToken:n};this.tenantId!=null&&(r.tenantId=this.tenantId),await KI(this,r)}}toJSON(){return{apiKey:this.config.apiKey,authDomain:this.config.authDomain,appName:this.name,currentUser:this._currentUser?.toJSON()}}async _setRedirectUser(e,n){const r=await this.getOrInitRedirectPersistenceManager(n);return e===null?r.removeCurrentUser():r.setCurrentUser(e)}async getOrInitRedirectPersistenceManager(e){if(!this.redirectPersistenceManager){const n=e&&rt(e)||this._popupRedirectResolver;S(n,this,"argument-error"),this.redirectPersistenceManager=await Cn.create(this,[rt(n._redirectPersistence)],"redirectUser"),this.redirectUser=await this.redirectPersistenceManager.getCurrentUser()}return this.redirectPersistenceManager}async _redirectUserForId(e){return this._isInitialized&&await this.queue(async()=>{}),this._currentUser?._redirectEventId===e?this._currentUser:this.redirectUser?._redirectEventId===e?this.redirectUser:null}async _persistUserIfCurrent(e){if(e===this.currentUser)return this.queue(async()=>this.directlySetCurrentUser(e))}_notifyListenersIfCurrent(e){e===this.currentUser&&this.notifyAuthListeners()}_key(){return`${this.config.authDomain}:${this.config.apiKey}:${this.name}`}_startProactiveRefresh(){this.isProactiveRefreshEnabled=!0,this.currentUser&&this._currentUser._startProactiveRefresh()}_stopProactiveRefresh(){this.isProactiveRefreshEnabled=!1,this.currentUser&&this._currentUser._stopProactiveRefresh()}get _currentUser(){return this.currentUser}notifyAuthListeners(){if(!this._isInitialized)return;this.idTokenSubscription.next(this.currentUser);const e=this.currentUser?.uid??null;this.lastNotifiedUid!==e&&(this.lastNotifiedUid=e,this.authStateSubscription.next(this.currentUser))}registerStateListener(e,n,r,i){if(this._deleted)return()=>{};const s=typeof n=="function"?n:n.next.bind(n);let o=!1;const a=this._isInitialized?Promise.resolve():this._initializationPromise;if(S(a,this,"internal-error"),a.then(()=>{o||s(this.currentUser)}),typeof n=="function"){const c=e.addObserver(n,r,i);return()=>{o=!0,c()}}else{const c=e.addObserver(n);return()=>{o=!0,c()}}}async directlySetCurrentUser(e){this.currentUser&&this.currentUser!==e&&this._currentUser._stopProactiveRefresh(),e&&this.isProactiveRefreshEnabled&&e._startProactiveRefresh(),this.currentUser=e,e?await this.assertedPersistence.setCurrentUser(e):await this.assertedPersistence.removeCurrentUser()}queue(e){return this.operations=this.operations.then(e,e),this.operations}get assertedPersistence(){return S(this.persistenceManager,this,"internal-error"),this.persistenceManager}_logFramework(e){!e||this.frameworks.includes(e)||(this.frameworks.push(e),this.frameworks.sort(),this.clientVersion=Kp(this.config.clientPlatform,this._getFrameworks()))}_getFrameworks(){return this.frameworks}async _getAdditionalHeaders(){const e={"X-Client-Version":this.clientVersion};this.app.options.appId&&(e["X-Firebase-gmpid"]=this.app.options.appId);const n=await this.heartbeatServiceProvider.getImmediate({optional:!0})?.getHeartbeatsHeader();n&&(e["X-Firebase-Client"]=n);const r=await this._getAppCheckToken();return r&&(e["X-Firebase-AppCheck"]=r),e}async _getAppCheckToken(){if(Oe(this.app)&&this.app.settings.appCheckToken)return this.app.settings.appCheckToken;const e=await this.appCheckServiceProvider.getImmediate({optional:!0})?.getToken();return e?.error&&LI(`Error while retrieving App Check token: ${e.error}`),e?.token}}function or(t){return ce(t)}class vd{constructor(e){this.auth=e,this.observer=null,this.addObserver=dw(n=>this.observer=n)}get next(){return S(this.observer,this.auth,"internal-error"),this.observer.next.bind(this.observer)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Yc={async loadJS(){throw new Error("Unable to load external scripts")},recaptchaV2Script:"",recaptchaEnterpriseScript:"",gapiScript:""};function rk(t){Yc=t}function ik(t){return Yc.loadJS(t)}function sk(){return Yc.gapiScript}function ok(t){return`__${t}${Math.floor(Math.random()*1e6)}`}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ak(t,e){const n=ti(t,"auth");if(n.isInitialized()){const i=n.getImmediate(),s=n.getOptions();if(an(s,e??{}))return i;qe(i,"already-initialized")}return n.initialize({options:e})}function ck(t,e){const n=e?.persistence||[],r=(Array.isArray(n)?n:[n]).map(rt);e?.errorMap&&t._updateErrorMap(e.errorMap),t._initializeWithPersistence(r,e?.popupRedirectResolver)}function lk(t,e,n){const r=or(t);S(/^https?:\/\//.test(e),r,"invalid-emulator-scheme");const i=!1,s=Jp(e),{host:o,port:a}=uk(e),c=a===null?"":`:${a}`,l={url:`${s}//${o}${c}/`},u=Object.freeze({host:o,port:a,protocol:s.replace(":",""),options:Object.freeze({disableWarnings:i})});if(!r._canInitEmulator){S(r.config.emulator&&r.emulatorConfig,r,"emulator-config-failed"),S(an(l,r.config.emulator)&&an(u,r.emulatorConfig),r,"emulator-config-failed");return}r.config.emulator=l,r.emulatorConfig=u,r.settings.appVerificationDisabledForTesting=!0,Qn(o)?(Kh(`${s}//${o}${c}`),Jh("Auth",!0)):dk()}function Jp(t){const e=t.indexOf(":");return e<0?"":t.substr(0,e+1)}function uk(t){const e=Jp(t),n=/(\/\/)?([^?#/]+)/.exec(t.substr(e.length));if(!n)return{host:"",port:null};const r=n[2].split("@").pop()||"",i=/^(\[[^\]]+\])(:|$)/.exec(r);if(i){const s=i[1];return{host:s,port:wd(r.substr(s.length+1))}}else{const[s,o]=r.split(":");return{host:s,port:wd(o)}}}function wd(t){if(!t)return null;const e=Number(t);return isNaN(e)?null:e}function dk(){function t(){const e=document.createElement("p"),n=e.style;e.innerText="Running in emulator mode. Do not use with production credentials.",n.position="fixed",n.width="100%",n.backgroundColor="#ffffff",n.border=".1em solid #000000",n.color="#b50000",n.bottom="0px",n.left="0px",n.margin="0px",n.zIndex="10000",n.textAlign="center",e.classList.add("firebase-emulator-warning"),document.body.appendChild(e)}typeof console<"u"&&typeof console.info=="function"&&console.info("WARNING: You are using the Auth Emulator, which is intended for local testing only.  Do not use with production credentials."),typeof window<"u"&&typeof document<"u"&&(document.readyState==="loading"?window.addEventListener("DOMContentLoaded",t):t())}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Xp{constructor(e,n){this.providerId=e,this.signInMethod=n}toJSON(){return nt("not implemented")}_getIdTokenResponse(e){return nt("not implemented")}_linkToIdToken(e,n){return nt("not implemented")}_getReauthenticationResolver(e){return nt("not implemented")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Tn(t,e){return BI(t,"POST","/v1/accounts:signInWithIdp",Gc(t,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const hk="http://localhost";class dn extends Xp{constructor(){super(...arguments),this.pendingToken=null}static _fromParams(e){const n=new dn(e.providerId,e.signInMethod);return e.idToken||e.accessToken?(e.idToken&&(n.idToken=e.idToken),e.accessToken&&(n.accessToken=e.accessToken),e.nonce&&!e.pendingToken&&(n.nonce=e.nonce),e.pendingToken&&(n.pendingToken=e.pendingToken)):e.oauthToken&&e.oauthTokenSecret?(n.accessToken=e.oauthToken,n.secret=e.oauthTokenSecret):qe("argument-error"),n}toJSON(){return{idToken:this.idToken,accessToken:this.accessToken,secret:this.secret,nonce:this.nonce,pendingToken:this.pendingToken,providerId:this.providerId,signInMethod:this.signInMethod}}static fromJSON(e){const n=typeof e=="string"?JSON.parse(e):e,{providerId:r,signInMethod:i,...s}=n;if(!r||!i)return null;const o=new dn(r,i);return o.idToken=s.idToken||void 0,o.accessToken=s.accessToken||void 0,o.secret=s.secret,o.nonce=s.nonce,o.pendingToken=s.pendingToken||null,o}_getIdTokenResponse(e){const n=this.buildRequest();return Tn(e,n)}_linkToIdToken(e,n){const r=this.buildRequest();return r.idToken=n,Tn(e,r)}_getReauthenticationResolver(e){const n=this.buildRequest();return n.autoCreate=!1,Tn(e,n)}buildRequest(){const e={requestUri:hk,returnSecureToken:!0};if(this.pendingToken)e.pendingToken=this.pendingToken;else{const n={};this.idToken&&(n.id_token=this.idToken),this.accessToken&&(n.access_token=this.accessToken),this.secret&&(n.oauth_token_secret=this.secret),n.providerId=this.providerId,this.nonce&&!this.pendingToken&&(n.nonce=this.nonce),e.postBody=er(n)}return e}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Kc{constructor(e){this.providerId=e,this.defaultLanguageCode=null,this.customParameters={}}setDefaultLanguage(e){this.defaultLanguageCode=e}setCustomParameters(e){return this.customParameters=e,this}getCustomParameters(){return this.customParameters}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ui extends Kc{constructor(){super(...arguments),this.scopes=[]}addScope(e){return this.scopes.includes(e)||this.scopes.push(e),this}getScopes(){return[...this.scopes]}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class yt extends ui{constructor(){super("facebook.com")}static credential(e){return dn._fromParams({providerId:yt.PROVIDER_ID,signInMethod:yt.FACEBOOK_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return yt.credentialFromTaggedObject(e)}static credentialFromError(e){return yt.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return yt.credential(e.oauthAccessToken)}catch{return null}}}yt.FACEBOOK_SIGN_IN_METHOD="facebook.com";yt.PROVIDER_ID="facebook.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ce extends ui{constructor(){super("google.com"),this.addScope("profile")}static credential(e,n){return dn._fromParams({providerId:Ce.PROVIDER_ID,signInMethod:Ce.GOOGLE_SIGN_IN_METHOD,idToken:e,accessToken:n})}static credentialFromResult(e){return Ce.credentialFromTaggedObject(e)}static credentialFromError(e){return Ce.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthIdToken:n,oauthAccessToken:r}=e;if(!n&&!r)return null;try{return Ce.credential(n,r)}catch{return null}}}Ce.GOOGLE_SIGN_IN_METHOD="google.com";Ce.PROVIDER_ID="google.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Et extends ui{constructor(){super("github.com")}static credential(e){return dn._fromParams({providerId:Et.PROVIDER_ID,signInMethod:Et.GITHUB_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return Et.credentialFromTaggedObject(e)}static credentialFromError(e){return Et.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return Et.credential(e.oauthAccessToken)}catch{return null}}}Et.GITHUB_SIGN_IN_METHOD="github.com";Et.PROVIDER_ID="github.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class vt extends ui{constructor(){super("twitter.com")}static credential(e,n){return dn._fromParams({providerId:vt.PROVIDER_ID,signInMethod:vt.TWITTER_SIGN_IN_METHOD,oauthToken:e,oauthTokenSecret:n})}static credentialFromResult(e){return vt.credentialFromTaggedObject(e)}static credentialFromError(e){return vt.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthAccessToken:n,oauthTokenSecret:r}=e;if(!n||!r)return null;try{return vt.credential(n,r)}catch{return null}}}vt.TWITTER_SIGN_IN_METHOD="twitter.com";vt.PROVIDER_ID="twitter.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Gn{constructor(e){this.user=e.user,this.providerId=e.providerId,this._tokenResponse=e._tokenResponse,this.operationType=e.operationType}static async _fromIdTokenResponse(e,n,r,i=!1){const s=await Fe._fromIdTokenResponse(e,r,i),o=bd(r);return new Gn({user:s,providerId:o,_tokenResponse:r,operationType:n})}static async _forOperation(e,n,r){await e._updateTokensIfNecessary(r,!0);const i=bd(r);return new Gn({user:e,providerId:i,_tokenResponse:r,operationType:n})}}function bd(t){return t.providerId?t.providerId:"phoneNumber"in t?"phone":null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ls extends Ht{constructor(e,n,r,i){super(n.code,n.message),this.operationType=r,this.user=i,Object.setPrototypeOf(this,ls.prototype),this.customData={appName:e.name,tenantId:e.tenantId??void 0,_serverResponse:n.customData._serverResponse,operationType:r}}static _fromErrorAndOperation(e,n,r,i){return new ls(e,n,r,i)}}function Qp(t,e,n,r){return(e==="reauthenticate"?n._getReauthenticationResolver(t):n._getIdTokenResponse(t)).catch(s=>{throw s.code==="auth/multi-factor-auth-required"?ls._fromErrorAndOperation(t,s,e,r):s})}async function fk(t,e,n=!1){const r=await zr(t,e._linkToIdToken(t.auth,await t.getIdToken()),n);return Gn._forOperation(t,"link",r)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function pk(t,e,n=!1){const{auth:r}=t;if(Oe(r.app))return Promise.reject(nn(r));const i="reauthenticate";try{const s=await zr(t,Qp(r,i,e,t),n);S(s.idToken,r,"internal-error");const o=zc(s.idToken);S(o,r,"internal-error");const{sub:a}=o;return S(t.uid===a,r,"user-mismatch"),Gn._forOperation(t,i,s)}catch(s){throw s?.code==="auth/user-not-found"&&qe(r,"user-mismatch"),s}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Zp(t,e,n=!1){if(Oe(t.app))return Promise.reject(nn(t));const r="signIn",i=await Qp(t,r,e),s=await Gn._fromIdTokenResponse(t,r,i);return n||await t._updateCurrentUser(s.user),s}async function gk(t,e){return Zp(or(t),e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function To(t,e){return ce(t).setPersistence(e)}function mk(t,e,n,r){return ce(t).onIdTokenChanged(e,n,r)}function _k(t,e,n){return ce(t).beforeAuthStateChanged(e,n)}function eg(t,e,n,r){return ce(t).onAuthStateChanged(e,n,r)}function yk(t){return ce(t).signOut()}const us="__sak";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class tg{constructor(e,n){this.storageRetriever=e,this.type=n}_isAvailable(){try{return this.storage?(this.storage.setItem(us,"1"),this.storage.removeItem(us),Promise.resolve(!0)):Promise.resolve(!1)}catch{return Promise.resolve(!1)}}_set(e,n){return this.storage.setItem(e,JSON.stringify(n)),Promise.resolve()}_get(e){const n=this.storage.getItem(e);return Promise.resolve(n?JSON.parse(n):null)}_remove(e){return this.storage.removeItem(e),Promise.resolve()}get storage(){return this.storageRetriever()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ek=1e3,vk=10;class ng extends tg{constructor(){super(()=>window.localStorage,"LOCAL"),this.boundEventHandler=(e,n)=>this.onStorageEvent(e,n),this.listeners={},this.localCache={},this.pollTimer=null,this.fallbackToPolling=Yp(),this._shouldAllowMigration=!0}forAllChangedKeys(e){for(const n of Object.keys(this.listeners)){const r=this.storage.getItem(n),i=this.localCache[n];r!==i&&e(n,i,r)}}onStorageEvent(e,n=!1){if(!e.key){this.forAllChangedKeys((o,a,c)=>{this.notifyListeners(o,c)});return}const r=e.key;n?this.detachListener():this.stopPolling();const i=()=>{const o=this.storage.getItem(r);!n&&this.localCache[r]===o||this.notifyListeners(r,o)},s=this.storage.getItem(r);XI()&&s!==e.newValue&&e.newValue!==e.oldValue?setTimeout(i,vk):i()}notifyListeners(e,n){this.localCache[e]=n;const r=this.listeners[e];if(r)for(const i of Array.from(r))i(n&&JSON.parse(n))}startPolling(){this.stopPolling(),this.pollTimer=setInterval(()=>{this.forAllChangedKeys((e,n,r)=>{this.onStorageEvent(new StorageEvent("storage",{key:e,oldValue:n,newValue:r}),!0)})},Ek)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}attachListener(){window.addEventListener("storage",this.boundEventHandler)}detachListener(){window.removeEventListener("storage",this.boundEventHandler)}_addListener(e,n){Object.keys(this.listeners).length===0&&(this.fallbackToPolling?this.startPolling():this.attachListener()),this.listeners[e]||(this.listeners[e]=new Set,this.localCache[e]=this.storage.getItem(e)),this.listeners[e].add(n)}_removeListener(e,n){this.listeners[e]&&(this.listeners[e].delete(n),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&(this.detachListener(),this.stopPolling())}async _set(e,n){await super._set(e,n),this.localCache[e]=JSON.stringify(n)}async _get(e){const n=await super._get(e);return this.localCache[e]=JSON.stringify(n),n}async _remove(e){await super._remove(e),delete this.localCache[e]}}ng.type="LOCAL";const rg=ng;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ig extends tg{constructor(){super(()=>window.sessionStorage,"SESSION")}_addListener(e,n){}_removeListener(e,n){}}ig.type="SESSION";const sg=ig;/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function wk(t){return Promise.all(t.map(async e=>{try{return{fulfilled:!0,value:await e}}catch(n){return{fulfilled:!1,reason:n}}}))}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class zs{constructor(e){this.eventTarget=e,this.handlersMap={},this.boundEventHandler=this.handleEvent.bind(this)}static _getInstance(e){const n=this.receivers.find(i=>i.isListeningto(e));if(n)return n;const r=new zs(e);return this.receivers.push(r),r}isListeningto(e){return this.eventTarget===e}async handleEvent(e){const n=e,{eventId:r,eventType:i,data:s}=n.data,o=this.handlersMap[i];if(!o?.size)return;n.ports[0].postMessage({status:"ack",eventId:r,eventType:i});const a=Array.from(o).map(async l=>l(n.origin,s)),c=await wk(a);n.ports[0].postMessage({status:"done",eventId:r,eventType:i,response:c})}_subscribe(e,n){Object.keys(this.handlersMap).length===0&&this.eventTarget.addEventListener("message",this.boundEventHandler),this.handlersMap[e]||(this.handlersMap[e]=new Set),this.handlersMap[e].add(n)}_unsubscribe(e,n){this.handlersMap[e]&&n&&this.handlersMap[e].delete(n),(!n||this.handlersMap[e].size===0)&&delete this.handlersMap[e],Object.keys(this.handlersMap).length===0&&this.eventTarget.removeEventListener("message",this.boundEventHandler)}}zs.receivers=[];/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Jc(t="",e=10){let n="";for(let r=0;r<e;r++)n+=Math.floor(Math.random()*10);return t+n}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class bk{constructor(e){this.target=e,this.handlers=new Set}removeMessageHandler(e){e.messageChannel&&(e.messageChannel.port1.removeEventListener("message",e.onMessage),e.messageChannel.port1.close()),this.handlers.delete(e)}async _send(e,n,r=50){const i=typeof MessageChannel<"u"?new MessageChannel:null;if(!i)throw new Error("connection_unavailable");let s,o;return new Promise((a,c)=>{const l=Jc("",20);i.port1.start();const u=setTimeout(()=>{c(new Error("unsupported_event"))},r);o={messageChannel:i,onMessage(d){const h=d;if(h.data.eventId===l)switch(h.data.status){case"ack":clearTimeout(u),s=setTimeout(()=>{c(new Error("timeout"))},3e3);break;case"done":clearTimeout(s),a(h.data.response);break;default:clearTimeout(u),clearTimeout(s),c(new Error("invalid_response"));break}}},this.handlers.add(o),i.port1.addEventListener("message",o.onMessage),this.target.postMessage({eventType:e,eventId:l,data:n},[i.port2])}).finally(()=>{o&&this.removeMessageHandler(o)})}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ze(){return window}function Sk(t){ze().location.href=t}/**
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
 */function og(){return typeof ze().WorkerGlobalScope<"u"&&typeof ze().importScripts=="function"}async function Ck(){if(!navigator?.serviceWorker)return null;try{return(await navigator.serviceWorker.ready).active}catch{return null}}function Tk(){return navigator?.serviceWorker?.controller||null}function Ik(){return og()?self:null}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ag="firebaseLocalStorageDb",kk=1,ds="firebaseLocalStorage",cg="fbase_key";class di{constructor(e){this.request=e}toPromise(){return new Promise((e,n)=>{this.request.addEventListener("success",()=>{e(this.request.result)}),this.request.addEventListener("error",()=>{n(this.request.error)})})}}function qs(t,e){return t.transaction([ds],e?"readwrite":"readonly").objectStore(ds)}function Rk(){const t=indexedDB.deleteDatabase(ag);return new di(t).toPromise()}function Ea(){const t=indexedDB.open(ag,kk);return new Promise((e,n)=>{t.addEventListener("error",()=>{n(t.error)}),t.addEventListener("upgradeneeded",()=>{const r=t.result;try{r.createObjectStore(ds,{keyPath:cg})}catch(i){n(i)}}),t.addEventListener("success",async()=>{const r=t.result;r.objectStoreNames.contains(ds)?e(r):(r.close(),await Rk(),e(await Ea()))})})}async function Sd(t,e,n){const r=qs(t,!0).put({[cg]:e,value:n});return new di(r).toPromise()}async function Ak(t,e){const n=qs(t,!1).get(e),r=await new di(n).toPromise();return r===void 0?null:r.value}function Cd(t,e){const n=qs(t,!0).delete(e);return new di(n).toPromise()}const Pk=800,Nk=3;class lg{constructor(){this.type="LOCAL",this._shouldAllowMigration=!0,this.listeners={},this.localCache={},this.pollTimer=null,this.pendingWrites=0,this.receiver=null,this.sender=null,this.serviceWorkerReceiverAvailable=!1,this.activeServiceWorker=null,this._workerInitializationPromise=this.initializeServiceWorkerMessaging().then(()=>{},()=>{})}async _openDb(){return this.db?this.db:(this.db=await Ea(),this.db)}async _withRetries(e){let n=0;for(;;)try{const r=await this._openDb();return await e(r)}catch(r){if(n++>Nk)throw r;this.db&&(this.db.close(),this.db=void 0)}}async initializeServiceWorkerMessaging(){return og()?this.initializeReceiver():this.initializeSender()}async initializeReceiver(){this.receiver=zs._getInstance(Ik()),this.receiver._subscribe("keyChanged",async(e,n)=>({keyProcessed:(await this._poll()).includes(n.key)})),this.receiver._subscribe("ping",async(e,n)=>["keyChanged"])}async initializeSender(){if(this.activeServiceWorker=await Ck(),!this.activeServiceWorker)return;this.sender=new bk(this.activeServiceWorker);const e=await this.sender._send("ping",{},800);e&&e[0]?.fulfilled&&e[0]?.value.includes("keyChanged")&&(this.serviceWorkerReceiverAvailable=!0)}async notifyServiceWorker(e){if(!(!this.sender||!this.activeServiceWorker||Tk()!==this.activeServiceWorker))try{await this.sender._send("keyChanged",{key:e},this.serviceWorkerReceiverAvailable?800:50)}catch{}}async _isAvailable(){try{if(!indexedDB)return!1;const e=await Ea();return await Sd(e,us,"1"),await Cd(e,us),!0}catch{}return!1}async _withPendingWrite(e){this.pendingWrites++;try{await e()}finally{this.pendingWrites--}}async _set(e,n){return this._withPendingWrite(async()=>(await this._withRetries(r=>Sd(r,e,n)),this.localCache[e]=n,this.notifyServiceWorker(e)))}async _get(e){const n=await this._withRetries(r=>Ak(r,e));return this.localCache[e]=n,n}async _remove(e){return this._withPendingWrite(async()=>(await this._withRetries(n=>Cd(n,e)),delete this.localCache[e],this.notifyServiceWorker(e)))}async _poll(){const e=await this._withRetries(i=>{const s=qs(i,!1).getAll();return new di(s).toPromise()});if(!e)return[];if(this.pendingWrites!==0)return[];const n=[],r=new Set;if(e.length!==0)for(const{fbase_key:i,value:s}of e)r.add(i),JSON.stringify(this.localCache[i])!==JSON.stringify(s)&&(this.notifyListeners(i,s),n.push(i));for(const i of Object.keys(this.localCache))this.localCache[i]&&!r.has(i)&&(this.notifyListeners(i,null),n.push(i));return n}notifyListeners(e,n){this.localCache[e]=n;const r=this.listeners[e];if(r)for(const i of Array.from(r))i(n)}startPolling(){this.stopPolling(),this.pollTimer=setInterval(async()=>this._poll(),Pk)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}_addListener(e,n){Object.keys(this.listeners).length===0&&this.startPolling(),this.listeners[e]||(this.listeners[e]=new Set,this._get(e)),this.listeners[e].add(n)}_removeListener(e,n){this.listeners[e]&&(this.listeners[e].delete(n),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&this.stopPolling()}}lg.type="LOCAL";const ug=lg;new li(3e4,6e4);/**
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
 */function dg(t,e){return e?rt(e):(S(t._popupRedirectResolver,t,"argument-error"),t._popupRedirectResolver)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Xc extends Xp{constructor(e){super("custom","custom"),this.params=e}_getIdTokenResponse(e){return Tn(e,this._buildIdpRequest())}_linkToIdToken(e,n){return Tn(e,this._buildIdpRequest(n))}_getReauthenticationResolver(e){return Tn(e,this._buildIdpRequest())}_buildIdpRequest(e){const n={requestUri:this.params.requestUri,sessionId:this.params.sessionId,postBody:this.params.postBody,tenantId:this.params.tenantId,pendingToken:this.params.pendingToken,returnSecureToken:!0,returnIdpCredential:!0};return e&&(n.idToken=e),n}}function Lk(t){return Zp(t.auth,new Xc(t),t.bypassAuthState)}function Ok(t){const{auth:e,user:n}=t;return S(n,e,"internal-error"),pk(n,new Xc(t),t.bypassAuthState)}async function Dk(t){const{auth:e,user:n}=t;return S(n,e,"internal-error"),fk(n,new Xc(t),t.bypassAuthState)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class hg{constructor(e,n,r,i,s=!1){this.auth=e,this.resolver=r,this.user=i,this.bypassAuthState=s,this.pendingPromise=null,this.eventManager=null,this.filter=Array.isArray(n)?n:[n]}execute(){return new Promise(async(e,n)=>{this.pendingPromise={resolve:e,reject:n};try{this.eventManager=await this.resolver._initialize(this.auth),await this.onExecution(),this.eventManager.registerConsumer(this)}catch(r){this.reject(r)}})}async onAuthEvent(e){const{urlResponse:n,sessionId:r,postBody:i,tenantId:s,error:o,type:a}=e;if(o){this.reject(o);return}const c={auth:this.auth,requestUri:n,sessionId:r,tenantId:s||void 0,postBody:i||void 0,user:this.user,bypassAuthState:this.bypassAuthState};try{this.resolve(await this.getIdpTask(a)(c))}catch(l){this.reject(l)}}onError(e){this.reject(e)}getIdpTask(e){switch(e){case"signInViaPopup":case"signInViaRedirect":return Lk;case"linkViaPopup":case"linkViaRedirect":return Dk;case"reauthViaPopup":case"reauthViaRedirect":return Ok;default:qe(this.auth,"internal-error")}}resolve(e){pt(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.resolve(e),this.unregisterAndCleanUp()}reject(e){pt(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.reject(e),this.unregisterAndCleanUp()}unregisterAndCleanUp(){this.eventManager&&this.eventManager.unregisterConsumer(this),this.pendingPromise=null,this.cleanUp()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Mk=new li(2e3,1e4);async function xk(t,e,n){if(Oe(t.app))return Promise.reject(Be(t,"operation-not-supported-in-this-environment"));const r=or(t);OI(t,e,Kc);const i=dg(r,n);return new Zt(r,"signInViaPopup",e,i).executeNotNull()}class Zt extends hg{constructor(e,n,r,i,s){super(e,n,i,s),this.provider=r,this.authWindow=null,this.pollId=null,Zt.currentPopupAction&&Zt.currentPopupAction.cancel(),Zt.currentPopupAction=this}async executeNotNull(){const e=await this.execute();return S(e,this.auth,"internal-error"),e}async onExecution(){pt(this.filter.length===1,"Popup operations only handle one event");const e=Jc();this.authWindow=await this.resolver._openPopup(this.auth,this.provider,this.filter[0],e),this.authWindow.associatedEvent=e,this.resolver._originValidation(this.auth).catch(n=>{this.reject(n)}),this.resolver._isIframeWebStorageSupported(this.auth,n=>{n||this.reject(Be(this.auth,"web-storage-unsupported"))}),this.pollUserCancellation()}get eventId(){return this.authWindow?.associatedEvent||null}cancel(){this.reject(Be(this.auth,"cancelled-popup-request"))}cleanUp(){this.authWindow&&this.authWindow.close(),this.pollId&&window.clearTimeout(this.pollId),this.authWindow=null,this.pollId=null,Zt.currentPopupAction=null}pollUserCancellation(){const e=()=>{if(this.authWindow?.window?.closed){this.pollId=window.setTimeout(()=>{this.pollId=null,this.reject(Be(this.auth,"popup-closed-by-user"))},8e3);return}this.pollId=window.setTimeout(e,Mk.get())};e()}}Zt.currentPopupAction=null;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Fk="pendingRedirect",Mi=new Map;class Uk extends hg{constructor(e,n,r=!1){super(e,["signInViaRedirect","linkViaRedirect","reauthViaRedirect","unknown"],n,void 0,r),this.eventId=null}async execute(){let e=Mi.get(this.auth._key());if(!e){try{const r=await $k(this.resolver,this.auth)?await super.execute():null;e=()=>Promise.resolve(r)}catch(n){e=()=>Promise.reject(n)}Mi.set(this.auth._key(),e)}return this.bypassAuthState||Mi.set(this.auth._key(),()=>Promise.resolve(null)),e()}async onAuthEvent(e){if(e.type==="signInViaRedirect")return super.onAuthEvent(e);if(e.type==="unknown"){this.resolve(null);return}if(e.eventId){const n=await this.auth._redirectUserForId(e.eventId);if(n)return this.user=n,super.onAuthEvent(e);this.resolve(null)}}async onExecution(){}cleanUp(){}}async function $k(t,e){const n=Wk(e),r=Hk(t);if(!await r._isAvailable())return!1;const i=await r._get(n)==="true";return await r._remove(n),i}function Bk(t,e){Mi.set(t._key(),e)}function Hk(t){return rt(t._redirectPersistence)}function Wk(t){return Di(Fk,t.config.apiKey,t.name)}async function Vk(t,e){return await or(t)._initializationPromise,fg(t,e,!1)}async function fg(t,e,n=!1){if(Oe(t.app))return Promise.reject(nn(t));const r=or(t),i=dg(r,e),o=await new Uk(r,i,n).execute();return o&&!n&&(delete o.user._redirectEventId,await r._persistUserIfCurrent(o.user),await r._setRedirectUser(null,e)),o}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const jk=600*1e3;class Gk{constructor(e){this.auth=e,this.cachedEventUids=new Set,this.consumers=new Set,this.queuedRedirectEvent=null,this.hasHandledPotentialRedirect=!1,this.lastProcessedEventTime=Date.now()}registerConsumer(e){this.consumers.add(e),this.queuedRedirectEvent&&this.isEventForConsumer(this.queuedRedirectEvent,e)&&(this.sendToConsumer(this.queuedRedirectEvent,e),this.saveEventToCache(this.queuedRedirectEvent),this.queuedRedirectEvent=null)}unregisterConsumer(e){this.consumers.delete(e)}onEvent(e){if(this.hasEventBeenHandled(e))return!1;let n=!1;return this.consumers.forEach(r=>{this.isEventForConsumer(e,r)&&(n=!0,this.sendToConsumer(e,r),this.saveEventToCache(e))}),this.hasHandledPotentialRedirect||!zk(e)||(this.hasHandledPotentialRedirect=!0,n||(this.queuedRedirectEvent=e,n=!0)),n}sendToConsumer(e,n){if(e.error&&!pg(e)){const r=e.error.code?.split("auth/")[1]||"internal-error";n.onError(Be(this.auth,r))}else n.onAuthEvent(e)}isEventForConsumer(e,n){const r=n.eventId===null||!!e.eventId&&e.eventId===n.eventId;return n.filter.includes(e.type)&&r}hasEventBeenHandled(e){return Date.now()-this.lastProcessedEventTime>=jk&&this.cachedEventUids.clear(),this.cachedEventUids.has(Td(e))}saveEventToCache(e){this.cachedEventUids.add(Td(e)),this.lastProcessedEventTime=Date.now()}}function Td(t){return[t.type,t.eventId,t.sessionId,t.tenantId].filter(e=>e).join("-")}function pg({type:t,error:e}){return t==="unknown"&&e?.code==="auth/no-auth-event"}function zk(t){switch(t.type){case"signInViaRedirect":case"linkViaRedirect":case"reauthViaRedirect":return!0;case"unknown":return pg(t);default:return!1}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function qk(t,e={}){return sr(t,"GET","/v1/projects",e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Yk=/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/,Kk=/^https?/;async function Jk(t){if(t.config.emulator)return;const{authorizedDomains:e}=await qk(t);for(const n of e)try{if(Xk(n))return}catch{}qe(t,"unauthorized-domain")}function Xk(t){const e=ma(),{protocol:n,hostname:r}=new URL(e);if(t.startsWith("chrome-extension://")){const o=new URL(t);return o.hostname===""&&r===""?n==="chrome-extension:"&&t.replace("chrome-extension://","")===e.replace("chrome-extension://",""):n==="chrome-extension:"&&o.hostname===r}if(!Kk.test(n))return!1;if(Yk.test(t))return r===t;const i=t.replace(/\./g,"\\.");return new RegExp("^(.+\\."+i+"|"+i+")$","i").test(r)}/**
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
 */const Qk=new li(3e4,6e4);function Id(){const t=ze().___jsl;if(t?.H){for(const e of Object.keys(t.H))if(t.H[e].r=t.H[e].r||[],t.H[e].L=t.H[e].L||[],t.H[e].r=[...t.H[e].L],t.CP)for(let n=0;n<t.CP.length;n++)t.CP[n]=null}}function Zk(t){return new Promise((e,n)=>{function r(){Id(),gapi.load("gapi.iframes",{callback:()=>{e(gapi.iframes.getContext())},ontimeout:()=>{Id(),n(Be(t,"network-request-failed"))},timeout:Qk.get()})}if(ze().gapi?.iframes?.Iframe)e(gapi.iframes.getContext());else if(ze().gapi?.load)r();else{const i=ok("iframefcb");return ze()[i]=()=>{gapi.load?r():n(Be(t,"network-request-failed"))},ik(`${sk()}?onload=${i}`).catch(s=>n(s))}}).catch(e=>{throw xi=null,e})}let xi=null;function eR(t){return xi=xi||Zk(t),xi}/**
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
 */const tR=new li(5e3,15e3),nR="__/auth/iframe",rR="emulator/auth/iframe",iR={style:{position:"absolute",top:"-100px",width:"1px",height:"1px"},"aria-hidden":"true",tabindex:"-1"},sR=new Map([["identitytoolkit.googleapis.com","p"],["staging-identitytoolkit.sandbox.googleapis.com","s"],["test-identitytoolkit.sandbox.googleapis.com","t"]]);function oR(t){const e=t.config;S(e.authDomain,t,"auth-domain-config-required");const n=e.emulator?jc(e,rR):`https://${t.config.authDomain}/${nR}`,r={apiKey:e.apiKey,appName:t.name,v:tr},i=sR.get(t.config.apiHost);i&&(r.eid=i);const s=t._getFrameworks();return s.length&&(r.fw=s.join(",")),`${n}?${er(r).slice(1)}`}async function aR(t){const e=await eR(t),n=ze().gapi;return S(n,t,"internal-error"),e.open({where:document.body,url:oR(t),messageHandlersFilter:n.iframes.CROSS_ORIGIN_IFRAMES_FILTER,attributes:iR,dontclear:!0},r=>new Promise(async(i,s)=>{await r.restyle({setHideOnLeave:!1});const o=Be(t,"network-request-failed"),a=ze().setTimeout(()=>{s(o)},tR.get());function c(){ze().clearTimeout(a),i(r)}r.ping(c).then(c,()=>{s(o)})}))}/**
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
 */const cR={location:"yes",resizable:"yes",statusbar:"yes",toolbar:"no"},lR=500,uR=600,dR="_blank",hR="http://localhost";class kd{constructor(e){this.window=e,this.associatedEvent=null}close(){if(this.window)try{this.window.close()}catch{}}}function fR(t,e,n,r=lR,i=uR){const s=Math.max((window.screen.availHeight-i)/2,0).toString(),o=Math.max((window.screen.availWidth-r)/2,0).toString();let a="";const c={...cR,width:r.toString(),height:i.toString(),top:s,left:o},l=ge().toLowerCase();n&&(a=Vp(l)?dR:n),Hp(l)&&(e=e||hR,c.scrollbars="yes");const u=Object.entries(c).reduce((h,[f,p])=>`${h}${f}=${p},`,"");if(JI(l)&&a!=="_self")return pR(e||"",a),new kd(null);const d=window.open(e||"",a,u);S(d,t,"popup-blocked");try{d.focus()}catch{}return new kd(d)}function pR(t,e){const n=document.createElement("a");n.href=t,n.target=e;const r=document.createEvent("MouseEvent");r.initMouseEvent("click",!0,!0,window,1,0,0,0,0,!1,!1,!1,!1,1,null),n.dispatchEvent(r)}/**
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
 */const gR="__/auth/handler",mR="emulator/auth/handler",_R=encodeURIComponent("fac");async function Rd(t,e,n,r,i,s){S(t.config.authDomain,t,"auth-domain-config-required"),S(t.config.apiKey,t,"invalid-api-key");const o={apiKey:t.config.apiKey,appName:t.name,authType:n,redirectUrl:r,v:tr,eventId:i};if(e instanceof Kc){e.setDefaultLanguage(t.languageCode),o.providerId=e.providerId||"",Yo(e.getCustomParameters())||(o.customParameters=JSON.stringify(e.getCustomParameters()));for(const[u,d]of Object.entries({}))o[u]=d}if(e instanceof ui){const u=e.getScopes().filter(d=>d!=="");u.length>0&&(o.scopes=u.join(","))}t.tenantId&&(o.tid=t.tenantId);const a=o;for(const u of Object.keys(a))a[u]===void 0&&delete a[u];const c=await t._getAppCheckToken(),l=c?`#${_R}=${encodeURIComponent(c)}`:"";return`${yR(t)}?${er(a).slice(1)}${l}`}function yR({config:t}){return t.emulator?jc(t,mR):`https://${t.authDomain}/${gR}`}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Io="webStorageSupport";class ER{constructor(){this.eventManagers={},this.iframes={},this.originValidationPromises={},this._redirectPersistence=sg,this._completeRedirectFn=fg,this._overrideRedirectResult=Bk}async _openPopup(e,n,r,i){pt(this.eventManagers[e._key()]?.manager,"_initialize() not called before _openPopup()");const s=await Rd(e,n,r,ma(),i);return fR(e,s,Jc())}async _openRedirect(e,n,r,i){await this._originValidation(e);const s=await Rd(e,n,r,ma(),i);return Sk(s),new Promise(()=>{})}_initialize(e){const n=e._key();if(this.eventManagers[n]){const{manager:i,promise:s}=this.eventManagers[n];return i?Promise.resolve(i):(pt(s,"If manager is not set, promise should be"),s)}const r=this.initAndGetManager(e);return this.eventManagers[n]={promise:r},r.catch(()=>{delete this.eventManagers[n]}),r}async initAndGetManager(e){const n=await aR(e),r=new Gk(e);return n.register("authEvent",i=>(S(i?.authEvent,e,"invalid-auth-event"),{status:r.onEvent(i.authEvent)?"ACK":"ERROR"}),gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER),this.eventManagers[e._key()]={manager:r},this.iframes[e._key()]=n,r}_isIframeWebStorageSupported(e,n){this.iframes[e._key()].send(Io,{type:Io},i=>{const s=i?.[0]?.[Io];s!==void 0&&n(!!s),qe(e,"internal-error")},gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER)}_originValidation(e){const n=e._key();return this.originValidationPromises[n]||(this.originValidationPromises[n]=Jk(e)),this.originValidationPromises[n]}get _shouldInitProactively(){return Yp()||Wp()||qc()}}const vR=ER;var Ad="@firebase/auth",Pd="1.11.0";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class wR{constructor(e){this.auth=e,this.internalListeners=new Map}getUid(){return this.assertAuthConfigured(),this.auth.currentUser?.uid||null}async getToken(e){return this.assertAuthConfigured(),await this.auth._initializationPromise,this.auth.currentUser?{accessToken:await this.auth.currentUser.getIdToken(e)}:null}addAuthTokenListener(e){if(this.assertAuthConfigured(),this.internalListeners.has(e))return;const n=this.auth.onIdTokenChanged(r=>{e(r?.stsTokenManager.accessToken||null)});this.internalListeners.set(e,n),this.updateProactiveRefresh()}removeAuthTokenListener(e){this.assertAuthConfigured();const n=this.internalListeners.get(e);n&&(this.internalListeners.delete(e),n(),this.updateProactiveRefresh())}assertAuthConfigured(){S(this.auth._initializationPromise,"dependent-sdk-initialized-before-auth")}updateProactiveRefresh(){this.internalListeners.size>0?this.auth._startProactiveRefresh():this.auth._stopProactiveRefresh()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function bR(t){switch(t){case"Node":return"node";case"ReactNative":return"rn";case"Worker":return"webworker";case"Cordova":return"cordova";case"WebExtension":return"web-extension";default:return}}function SR(t){xt(new ut("auth",(e,{options:n})=>{const r=e.getProvider("app").getImmediate(),i=e.getProvider("heartbeat"),s=e.getProvider("app-check-internal"),{apiKey:o,authDomain:a}=r.options;S(o&&!o.includes(":"),"invalid-api-key",{appName:r.name});const c={apiKey:o,authDomain:a,clientPlatform:t,apiHost:"identitytoolkit.googleapis.com",tokenApiHost:"securetoken.googleapis.com",apiScheme:"https",sdkClientVersion:Kp(t)},l=new nk(r,i,s,c);return ck(l,n),l},"PUBLIC").setInstantiationMode("EXPLICIT").setInstanceCreatedCallback((e,n,r)=>{e.getProvider("auth-internal").initialize()})),xt(new ut("auth-internal",e=>{const n=or(e.getProvider("auth").getImmediate());return(r=>new wR(r))(n)},"PRIVATE").setInstantiationMode("EXPLICIT")),ot(Ad,Pd,bR(t)),ot(Ad,Pd,"esm2020")}/**
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
 */const CR=300,TR=Yh("authIdTokenMaxAge")||CR;let Nd=null;const IR=t=>async e=>{const n=e&&await e.getIdTokenResult(),r=n&&(new Date().getTime()-Date.parse(n.issuedAtTime))/1e3;if(r&&r>TR)return;const i=n?.token;Nd!==i&&(Nd=i,await fetch(t,{method:i?"POST":"DELETE",headers:i?{Authorization:`Bearer ${i}`}:{}}))};function kR(t=Xa()){const e=ti(t,"auth");if(e.isInitialized())return e.getImmediate();const n=ak(t,{popupRedirectResolver:vR,persistence:[ug,rg,sg]}),r=Yh("authTokenSyncURL");if(r&&typeof isSecureContext=="boolean"&&isSecureContext){const s=new URL(r,location.origin);if(location.origin===s.origin){const o=IR(s.toString());_k(n,o,()=>o(n.currentUser)),mk(n,a=>o(a))}}const i=zh("auth");return i&&lk(n,`http://${i}`),n}function RR(){return document.getElementsByTagName("head")?.[0]??document}rk({loadJS(t){return new Promise((e,n)=>{const r=document.createElement("script");r.setAttribute("src",t),r.onload=e,r.onerror=i=>{const s=Be("internal-error");s.customData=i,n(s)},r.type="text/javascript",r.charset="UTF-8",RR().appendChild(r)})},gapiScript:"https://apis.google.com/js/api.js",recaptchaV2Script:"https://www.google.com/recaptcha/api.js",recaptchaEnterpriseScript:"https://www.google.com/recaptcha/enterprise.js?render="});SR("Browser");const RP=()=>!1,AR=t=>{try{t&&localStorage.setItem("debug:console","1")}catch{}},$=(...t)=>{},PR=(...t)=>{localStorage.getItem("debug:console")},NR="765724787439-21p8n3e2tsfq2qk4oriq7ipp7m4o50ad.apps.googleusercontent.com",kr=new Set;function LR(){const t=console.error;console.error=(...e)=>{const n=e.join(" ");n.includes("FedCM")&&n.includes("AbortError")&&n.includes("signal is aborted without reason")||e.length===1&&typeof e[0]=="string"&&e[0].trim()==="The request has been aborted."||t.apply(console,e)}}function OR(t){return $("[ONE TAP] Callback registered, total callbacks:",kr.size+1),kr.add(t),()=>kr.delete(t)}function _n(t){$("[ONE TAP] Notifying status:",t,"to",kr.size,"callbacks"),kr.forEach(e=>{try{e(t)}catch{}})}function gg(){if(typeof google>"u"||!google.accounts?.id){setTimeout(()=>gg(),100);return}LR(),google.accounts.id.initialize({client_id:NR,callback:DR,auto_select:!1,cancel_on_tap_outside:!0,context:"signin",use_fedcm_for_prompt:!0,itp_support:!0})}function mg(){if(Qc()){_n("not_needed");return}window.google?.accounts?.id&&(_n("prompting"),window.google.accounts.id.prompt(t=>{const e=t.getMomentType();e==="skipped"?_n("skipped"):e==="dismissed"?_n("dismissed"):e==="display"&&_n("displayed")}))}async function DR(t){try{$("[ONE TAP] Received credential, signing in with Firebase..."),_n("signing_in");const e=Ce.credential(t.credential),n=await gk(Ie,e);$("[ONE TAP] ✅ Successfully signed in:",n.user.email),yg(!1)}catch(e){const n=e?.code||"unknown",r=e?.message||String(e);alert(n==="auth/account-exists-with-different-credential"?"An account already exists with the same email but different sign-in credentials.":`One Tap sign-in failed: ${r}`)}}const Ie=kR($c),_g=(async()=>{try{await To(Ie,ug)}catch{try{await To(Ie,rg)}catch{await To(Ie,ya)}}try{const t=await Vk(Ie);t?.user&&console.log("[AUTH] ✅ Sign-in completed (via Safari fallback), user:",t.user.email||t.user.uid)}catch(t){$("[AUTH] No redirect result:",t.code)}setTimeout(()=>{gg(),mg()},500)})();let yr=!1;function yg(t){yr=t}function MR(){try{const t=document.createElement("a");t.href=window.location.href,t.target="_blank",t.rel="noopener noreferrer external",document.body.appendChild(t),t.click(),document.body.removeChild(t)}catch{}}let pr=null;const xR=()=>Math.random().toString(36).substring(2,15),va="guestUser",FR=2880*60*1e3;function UR(){try{const t=typeof localStorage<"u"?localStorage.getItem(va):null;if(!t)return null;const e=JSON.parse(t);if(!e||typeof e!="object"||!e.id)return null;if(e.expiresAt&&Date.now()>e.expiresAt){try{localStorage.removeItem(va)}catch{}return null}return e}catch{return null}}function $R(t,e=FR){const n=Date.now(),r={id:t,createdAt:n,expiresAt:n+e};try{typeof localStorage<"u"&&localStorage.setItem(va,JSON.stringify(r))}catch{}return r}function ue(){const t=Xe();if(t)return t;if(!pr){const e=UR();e&&e.id?pr=e.id:(pr=xR(),$R(pr))}return pr}function Qc(){return Ie.currentUser!==null}function Xe(){return Ie.currentUser?.uid??null}function BR(){return new Promise(t=>{const e=eg(Ie,n=>{e(),t(n)})})}function Zc(t,{truncate:e=7}={}){return eg(Ie,n=>{const r=!!n,i=n?.displayName||"Guest User",s=typeof i=="string"&&i.length>e?i.slice(0,e)+"...":i;try{t({user:n,isLoggedIn:r,userName:s})}catch{}})}async function Eg(){const t=new Ce;t.setCustomParameters({prompt:"select_account"});const n=(()=>{try{return typeof window<"u"&&window.matchMedia&&window.matchMedia("(display-mode: standalone)").matches||typeof navigator<"u"&&navigator.standalone===!0}catch{return!1}})()&&/iphone|ipad|ipod/i.test(navigator.userAgent||"");try{if(n&&yr){yr=!1,MR();return}console.log("[AUTH] Starting popup sign-in flow...");const r=await xk(Ie,t),s=Ce.credentialFromResult(r).accessToken,o=r.user;console.log("Signed in user:",o),$("Google Access Token exists:",!!s),yr=!1}catch(r){const i=r?.code||"unknown",s=r?.message||String(r);if(i==="auth/popup-closed-by-user"||i==="auth/cancelled-popup-request"){console.log("Sign-in cancelled by user");return}if((i==="auth/network-request-failed"||i==="auth/popup-blocked")&&n){console.warn(`[AUTH] ${i} inside iOS standalone PWA. Arming Safari fallback.`),yr=!0,alert(`Sign-in is blocked in the installed app on iOS.

Tap the Login button again to open in Safari and complete sign-in.`);return}if(i==="auth/popup-blocked"){alert("Pop-up blocked. Please enable pop-ups for this site in your browser settings, or try signing in from a desktop browser.");return}const o=r?.customData?.email,a=Ce.credentialFromError(r);if(console.error("Error during Google sign-in:",{errorCode:i,errorMessage:s,email:o,credential:a,origin:typeof window<"u"?window.location.origin:"n/a"}),i==="auth/unauthorized-domain"){const c=typeof window<"u"?window.location.origin:"",l=["This app's host is not whitelisted in Firebase Authentication.","Fix: In Firebase Console, go to Build → Authentication → Settings → Authorized domains and add this origin:",c?`• ${c}`:"• <your dev origin>","","Common dev hosts to add:","• http://localhost (covers any port)","• http://127.0.0.1","• http://[::1] (IPv6 localhost)","• Your LAN IP, e.g. http://192.168.x.y","","Tip: avoid opening index.html directly from the filesystem (file://). Use a dev server instead."];c&&typeof navigator<"u"&&navigator.clipboard?.writeText&&navigator.clipboard.writeText(c).catch(()=>{}),alert(`Sign-in failed: Unauthorized domain.

${l.join(`
`)}`);return}alert(`Sign-in failed: ${s}`)}}async function vg(){try{await yk(Ie),console.info("User signed out"),setTimeout(()=>mg(),1500)}catch(t){throw console.error("Error signing out:",t),t}}const HR=Object.freeze(Object.defineProperty({__proto__:null,auth:Ie,authReady:_g,getCurrentUserAsync:BR,getLoggedInUserId:Xe,getUserId:ue,isLoggedIn:Qc,onAuthChange:Zc,setSafariExternalOpenArmed:yg,signInWithGoogle:Eg,signOutUser:vg},Symbol.toStringTag,{value:"Module"})),WR=t=>String(t).replace(/[&<>"'`=\/]/g,n=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;","`":"&#x60;","=":"&#x3D;","/":"&#x2F;"})[n]),VR=(t,e)=>t.replace(/\$\{([^}]+)\}/g,(n,r)=>{const i=r.trim(),s=i.split(".").reduce((a,c)=>a?.[c],e);return s==null?"":i.endsWith("Html")?String(s):WR(String(s))}),jR=(t,e={})=>{const n=document.createElement("template");return n.innerHTML=VR(t,e),n.content.cloneNode(!0)},GR=(t,e)=>{const n=[];let r=e;for(;r&&r!==t;){const i=r.parentElement;if(!i)break;const s=Array.prototype.indexOf.call(i.children,r);n.push(s),r=i}return n.reverse()},zR=(t,e)=>e.reduce((n,r)=>n&&n.children?n.children[r]:null,t),qR=t=>Array.from(t.querySelectorAll("input, textarea, select")).map(e=>({name:e.name,id:e.id,path:GR(t,e),value:e.value,checked:e.checked,selectionStart:e.selectionStart,selectionEnd:e.selectionEnd,wasFocused:document.activeElement===e})),YR=t=>t.replace(/["'\\]/g,"\\$&"),KR=(t,e)=>{e.forEach(n=>{let r=null;if(n.name){const i=YR(n.name);r=t.querySelector(`input[name="${i}"], textarea[name="${i}"], select[name="${i}"]`)}else n.id?r=t.querySelector(`#${n.id}`):n.path&&(r=zR(t,n.path));if(r){if(r.value=n.value,n.checked!==void 0&&(r.checked=n.checked),n.selectionStart!=null&&r.setSelectionRange)try{r.setSelectionRange(n.selectionStart,n.selectionEnd)}catch{}if(n.wasFocused)try{r.focus()}catch{}}})},JR=t=>Array.from(t.querySelectorAll("video, audio")).map(e=>({src:e.currentSrc||e.src,currentTime:e.currentTime,paused:e.paused,volume:e.volume,playbackRate:e.playbackRate,muted:e.muted})),XR=(t,e)=>{const n=t.querySelectorAll("video, audio");for(const r of n)if(r.currentSrc===e||r.src===e)return r;return null},QR=(t,e)=>{e.forEach(n=>{if(!n.src)return;const r=XR(t,n.src);r&&(r.currentTime=n.currentTime,r.volume=n.volume,r.playbackRate=n.playbackRate,r.muted=n.muted,n.paused||r.play().catch(()=>{}))})},ZR=()=>document.readyState!=="loading",wg=({initialProps:t={},template:e="",handlers:n={},parent:r=null,containerTag:i="div",className:s="",onMount:o=null,onCleanup:a=null,autoAppend:c=!0,preserveInputState:l=!0}={})=>{if(!ZR())return console.error("createComponent: DOM must be ready before creating components."),null;const u=document.createElement(i);s&&(u.className=s);let d={...t};const h=new Set,f=/\$\{([^}]+)\}/g;let p;for(;(p=f.exec(e))!==null;){const _=p[1].trim().split(".")[0];h.add(_)}const E=[],m=[],T={},N=()=>{let _=[],L=[];l&&(_=qR(u),L=JR(u)),u.textContent="";const Le=jR(e,d);u.appendChild(Le),Object.keys(n).forEach(Se=>{const re=u.querySelectorAll(`[onclick="${Se}"]`),Vt=n[Se];re.forEach(vl=>{vl.removeAttribute("onclick"),typeof Vt=="function"&&vl.addEventListener("click",Vt)})}),l&&(KR(u,_),QR(u,L)),E.forEach(Se=>Se({...d}))},de=_=>{if(!Array.isArray(_)||_.length===0)return;const L={props:{...d},changedKeys:_};m.forEach(Le=>Le(L))};for(const _ of Object.keys(t))T[_]=[],Object.defineProperty(u,_,{get(){return d[_]},set(L){d[_]!==L&&(d[_]=L,h.has(_)&&N(),T[_].forEach(Le=>Le(L)),de([_]))},configurable:!0,enumerable:!0});if(u.update=_=>{let L=!1,Le=!1;const Se=[];for(const re in _)_[re]!==d[re]&&(d[re]=_[re],h.has(re)&&(Le=!0),T[re]&&T[re].forEach(Vt=>Vt(_[re])),L=!0,Se.push(re));L&&Le&&N(),Se.length>0&&de(Se)},u.onRender=_=>{typeof _=="function"&&E.push(_)},u.onAnyPropUpdated=_=>{typeof _=="function"&&m.push(_)},u.onPropUpdated=(_,L)=>{typeof L=="function"&&T[_]&&T[_].push(L)},u.dispose=()=>{a&&(Array.isArray(a)?a.forEach(_=>{typeof _=="function"&&_()}):typeof a=="function"&&a()),E.length=0,m.length=0;for(const _ in T)T[_].length=0;u.remove()},N(),c&&r&&!r.contains(u)&&r.appendChild(u),typeof o=="function")try{o(u)}catch(_){PR("[createComponent]: Error in onMount handler of component",_)}return u};let gr=null;const eA=(t,e=null)=>{if(gr)return gr;if(!t)return console.error("Auth UI: Parent element is required"),null;let n=null,r=null,i=10;typeof e=="number"&&(i=e);const s=Qc();return gr=wg({initialProps:{isLoggedIn:s,userName:"Guest User",signingInDisplay:"none",loginBtnMarginRightPx:i},template:`
      <button style="margin-right: \${loginBtnMarginRightPx}px" id="goog-login-btn" class="login-btn" onclick="handleLogin" disabled>Login</button>
      <button id="goog-logout-btn" class="logout-btn" onclick="handleLogout" disabled>Logout</button>
      <span class="signing-in-indicator" style="display: \${signingInDisplay}; color: var(--text-secondary, #888); font-size: 0.9rem;">Signing in...</span>
      <div class="user-info">\${isLoggedIn ? 'Logged in: ' + userName : 'Logged out'}</div>
    `,handlers:{handleLogin:Eg,handleLogout:vg},onMount:o=>{const a=c=>{const l=o.querySelector("#goog-login-btn"),u=o.querySelector("#goog-logout-btn");l&&u&&(l.disabled=c,u.disabled=!c)};a(s),n=Zc(({isLoggedIn:c,userName:l})=>{$("[AuthComponent] Auth state changed:",{isLoggedIn:c,userName:l}),a(c),o.update({isLoggedIn:c,userName:l,signingInDisplay:"none"})}),r=OR(c=>{$("[AuthComponent] One Tap status:",c),c==="signing_in"?o.update({signingInDisplay:"inline-block"}):o.update({signingInDisplay:"none"})})},onCleanup:()=>{n&&(n(),n=null),r&&(r(),r=null),gr=null},className:"auth-component",parent:t}),gr},el=t=>t?!0:(console.warn("Element not found. el.id: =>",t?.id??"(no id)","el: =>",t),console.trace(),!1),tl=t=>{if(el(t))return t.classList.contains("hidden")},A=t=>{el(t)&&t.classList.contains("hidden")&&t.classList.remove("hidden")},v=t=>{el(t)&&!t.classList.contains("hidden")&&t.classList.add("hidden")},bg=t=>t.classList.contains("small-frame"),In=t=>{if(t&&!bg(t)){t.classList.add("small-frame");const e=document.createElement("div");e.classList.add("small-frame-toggle-div");const n=document.createElement("span");n.classList.add("small-frame-toggle-icon"),n.textContent="❮",e.appendChild(n),t.appendChild(e),e.addEventListener("click",()=>{t.classList.contains("closed")?(t.classList.remove("closed"),e.classList.remove("closed"),n.classList.remove("closed")):(t.classList.add("closed"),e.classList.add("closed"),n.classList.add("closed"))})}},Ct=t=>{if(bg(t)){t.classList.remove("small-frame");const e=document.querySelector(".small-frame-close");e&&e.remove()}};function wa(t){return document.pictureInPictureElement===t}function Ys(t="room"){const e=new URL(window.location);e.searchParams.delete(t),window.history.replaceState({},"",e)}const j=t=>{const e=document.getElementById(t);return e||(console.warn(`Element with id: ${t} not found.`),null)};let Ye=null,Wt=null,Ks=null,nl=null,Ee=null,te=null,K=null,H=null,V=null,be=null,Re=null,Ne=null,We=null,ar=null,Sg=null,Ve=null,Js=null,cr=null,lr=null,rl=null,il=null,sl=null,ol=null;function Ld(){Ye=j("lobby"),Wt=j("lobby-call-btn"),Ks=j("title-auth-bar"),nl=j("videos"),Ee=j("local-video-el"),te=j("local-video-box"),K=j("remote-video-el"),H=j("remote-video-box"),V=j("shared-video-el"),be=j("shared-video-box"),Re=j("chat-controls"),Ne=j("call-btn"),We=j("hang-up-btn"),ar=j("switch-camera-btn"),Ve=j("mute-btn"),Js=j("fullscreen-partner-btn"),cr=j("mic-btn"),lr=j("camera-btn"),rl=j("app-pip-btn"),il=j("app-title-h1"),sl=j("app-title-a"),ol=j("app-title-span")}document.readyState==="loading"?document.addEventListener("DOMContentLoaded",Ld):Ld();const Cg=()=>({lobbyDiv:Ye,lobbyCallBtn:Wt,titleAuthBar:Ks,videosWrapper:nl,localVideoEl:Ee,localBoxEl:te,remoteVideoEl:K,remoteBoxEl:H,sharedVideoEl:V,sharedBoxEl:be,chatControls:Re,callBtn:Ne,hangUpBtn:We,switchCameraBtn:ar,installBtn:Sg,mutePartnerBtn:Ve,fullscreenPartnerBtn:Js,micBtn:cr,cameraBtn:lr,appPipBtn:rl,appTitleH1:il,appTitleA:sl,appTitleSpan:ol});function Tg(t,e=3,n=100){return new Promise(r=>{let i=0;const s=()=>{const o=document.getElementById(t);if(o){r(o);return}if(i++,i>=e){console.warn(`Element ${t} not found after ${e} attempts`),r(null);return}setTimeout(s,n)};s()})}async function Ig(t,e=3,n=100){const r={},i=t.map(async s=>{const o=await Tg(s,e,n);return r[s]=o,o});return await Promise.all(i),r}async function tA(){const t=await Ig(["searchBtn","searchQuery","searchResults"],5,200),e=document.querySelector(".search-section");t.searchContainer=e;const n=Object.entries(t).filter(([r,i])=>!i).map(([r])=>r);return n.length>0&&console.warn("Some YouTube elements not found:",n),t}const nA=Object.freeze(Object.defineProperty({__proto__:null,get appPipBtn(){return rl},get appTitleA(){return sl},get appTitleH1(){return il},get appTitleSpan(){return ol},get callBtn(){return Ne},get cameraBtn(){return lr},get chatControls(){return Re},get fullscreenPartnerBtn(){return Js},getElements:Cg,get hangUpBtn(){return We},initializeYouTubeElements:tA,installBtn:Sg,get lobbyCallBtn(){return Wt},get lobbyDiv(){return Ye},get localBoxEl(){return te},get localVideoEl(){return Ee},get micBtn(){return cr},get mutePartnerBtn(){return Ve},get remoteBoxEl(){return H},get remoteVideoEl(){return K},robustElementAccess:Tg,get sharedBoxEl(){return be},get sharedVideoEl(){return V},get switchCameraBtn(){return ar},get titleAuthBar(){return Ks},get videosWrapper(){return nl},waitForElements:Ig},Symbol.toStringTag,{value:"Module"})),Od="yt-video-box",ba="yt-player-root";let W=null,gt=!1;const Rr=()=>W,rA=()=>gt,kg=t=>gt=t,kn=()=>{const t=document.getElementById(Od);if(!t)throw new Error(`Container #${Od} not found`);return t};function iA(){return new Promise(t=>{window.YT&&window.YT.Player?t():window.onYouTubeIframeAPIReady=()=>{t()}})}function Rg(){const t=kn();if(!document.getElementById(ba)){const e=document.createElement("div");e.id=ba,t.appendChild(e)}A(t)}function Sa(){const t=kn();v(t)}function ko(){const t=kn();return t&&!t.classList.contains("hidden")}function Ca(t){return t?t.includes("youtube.com")||t.includes("youtu.be"):!1}function Ag(t){if(!t)return null;const e=[/(?:youtube\.com\/watch\?v=)([\w-]+)/,/(?:youtu\.be\/)([\w-]+)/,/(?:youtube\.com\/embed\/)([\w-]+)/,/(?:youtube\.com\/shorts\/)([\w-]+)/];for(const n of e){const r=t.match(n);if(r&&r[1])return r[1]}return null}async function sA({url:t,onReady:e,onStateChange:n}){const r=Ag(t);if(!r)throw new Error("Invalid YouTube URL");if(await iA(),W){try{W.destroy()}catch(o){console.warn("Error destroying previous YouTube player:",o)}W=null}const i=(o=!0)=>{const a=kn(),c=W.getIframe();if(c&&a){try{a.tabIndex=-1,a.focus({preventScroll:!0})}catch{if(document.activeElement===c)try{c.blur()}catch{}}if(o){const l=u=>{if(u.code==="Space"){const d=kn(),h=W.getIframe();if(document.activeElement===h||document.activeElement===d)return;u.preventDefault(),console.debug("Space pressed, refocusing iframe"),W.getPlayerState()!==window.YT.PlayerState.PLAYING?cl():Xs()}};document.addEventListener("keydown",l,{once:!0})}}},s=()=>{const o=kn(),a=W.getIframe();if(o&&a&&document.activeElement!==a)try{a.focus()}catch{}};return Rg(),new Promise((o,a)=>{try{W=new window.YT.Player(ba,{videoId:r,playerVars:{autoplay:1,mute:0,controls:1,fs:1,rel:0,modestbranding:1,disablekb:0,origin:window.location.origin},events:{onReady:c=>{gt=!0,e&&e(c),o(W)},onStateChange:c=>{c.data===window.YT.PlayerState.ENDED&&i(!1),c.data===window.YT.PlayerState.PAUSED&&i(),c.data===window.YT.PlayerState.PLAYING&&s(),n&&n(c)},onError:c=>{console.error("YouTube player error:",c.data),a(new Error(`YouTube error: ${c.data}`))}}})}catch(c){a(c)}})}function al(){if(W){try{Sa(),W.destroy()}catch(t){console.warn("Error destroying YouTube player:",t)}W=null,gt=!1}}function cl(){W&&gt&&W.playVideo()}function Xs(){W&&gt&&W.pauseVideo()}function oA(t){W&&gt&&W.seekTo(t,!0)}function hs(){return W&&gt?W.getCurrentTime():0}function ll(){return W&&gt?W.getPlayerState():-1}const Tt={UNSTARTED:-1,ENDED:0,PLAYING:1,PAUSED:2,BUFFERING:3,CUED:5};let He=null,hi=null,Pg=!1,Ae="none",ul=null;const fi=()=>Pg,Ng=t=>Pg=t,mr=()=>Ae,aA=t=>{["yt","url","none"].includes(t)?Ae=t:console.warn("Invalid lastWatched platform:",t)};let It=!1,Ar=null,Pr=0;async function Rn(t){if(!He)return;console.debug("Updating watch sync state, roomId:",He);const e=Gs(He);try{await Ni(e,{...t,updatedBy:hi})}catch(n){console.error("Failed to update watch state:",n)}}function cA(t,e,n){if(!t)return;He=t,hi=n;const r=Gs(t);Li(r,lA,t),mA()}function lA(t){const e=t.val();e&&e.updatedBy!==hi&&(Date.now()-Pr<500||(e.url&&e.url!==ul&&uA(e.url),e.isYouTube?dA(e):gA(e)))}function uA(t){ul=t,Ca(t)?(v(be),Lg(t),Ae="yt"):(al(),A(be),V.src=t,Ae="url")}function dA(t){!Rr()||!rA()||(hA(t),fA(t))}function hA(t){const e=ll(),n=e===Tt.PLAYING;if([Tt.BUFFERING,Tt.UNSTARTED].includes(e)){pA();return}It||(t.playing&&!n?(cl(),Ae="yt"):!t.playing&&n&&(Xs(),Ae="yt"))}function fA(t){if(t.currentTime===void 0)return;const e=hs();Math.abs(e-t.currentTime)>.3&&!It&&(oA(t.currentTime),setTimeout(()=>{t.playing?cl():Xs(),Ae="yt"},500))}function pA(){It=!0,clearTimeout(Ar),Ar=setTimeout(async()=>{It=!1;const t=ll()===Tt.PLAYING;await Rn({playing:t,currentTime:hs()})},700)}function gA(t){t.playing!==void 0&&(t.playing&&V.paused?V.play().catch(e=>console.warn("Play failed:",e)):!t.playing&&!V.paused&&V.pause()),t.currentTime!==void 0&&Math.abs(V.currentTime-t.currentTime)>1&&(V.currentTime=t.currentTime,t.playing?V.play().catch(n=>console.warn("Play failed:",n)):V.pause())}function mA(){V.addEventListener("play",async()=>{!Rr()&&He&&(Pr=Date.now(),await Rn({playing:!0,isYouTube:!1})),Ae="url"}),V.addEventListener("pause",async()=>{!Rr()&&He&&(Pr=Date.now(),await Rn({playing:!1,isYouTube:!1})),Ae="url"}),V.addEventListener("seeked",async()=>{!Rr()&&He&&(Pr=Date.now(),await Rn({currentTime:V.currentTime,playing:!V.paused,isYouTube:!1})),Ae="url"})}async function _A(t){if(!t)return!1;if(Pr=Date.now(),Ca(t)){if(v(be),!await Lg(t))return!1;Ae="yt"}else al(),A(be),V.src=t,Ae="url";if(He){const e=Gs(He);ft(e,{url:t,playing:!1,currentTime:0,isYouTube:Ca(t),updatedBy:hi})}return!0}async function vn(t){if(!t||!t.url)return console.warn("Non-existing or invalid video."),!1;ul=t.url;const e=await _A(t.url);return Ia(),e}async function Lg(t){if(!Ag(t))return console.error("Invalid YouTube URL:",t),!1;try{return await sA({url:t,onReady:n=>{if(kg(!0),He){const r=Gs(He);ft(r,{url:t,playing:!1,currentTime:0,isYouTube:!0,updatedBy:hi})}},onStateChange:async n=>{if(!Rr())return;const i=n.data===Tt.PLAYING,s=n.data===Tt.PAUSED;if(n.data===Tt.BUFFERING){It=!0,Ar&&clearTimeout(Ar),Ar=setTimeout(async()=>{It=!1;const c=ll()===Tt.PLAYING;await Rn({playing:c,currentTime:hs()})},700);return}s&&It||!It&&(i||s)&&await Rn({playing:i,currentTime:hs()})}}),!0}catch(n){return console.error("Failed to load YouTube video:",n),!1}}function yA(t,{inactivityMs:e=3e3,listenTarget:n=document,onShow:r=null,onHide:i=null,hideOnEsc:s=!1,excludeEvents:o=["keydown"]}={}){if(!t)return()=>{};let a=null;const l=["pointermove","pointerdown","pointerup","touchstart","touchmove","mousemove","mousedown","keydown"].filter(m=>!Array.isArray(o)||!o.includes(m));function u(){A(t);try{typeof r=="function"&&r()}catch(m){console.warn("showHideOnInactivity onShow callback error:",m)}a&&clearTimeout(a),a=setTimeout(()=>{v(t);try{typeof i=="function"&&i()}catch(m){console.warn("showHideOnInactivity onHide callback error:",m)}a=null},e)}l.forEach(m=>n.addEventListener(m,u,{passive:!0}));function d(){if(document.hidden){a&&(clearTimeout(a),a=null);try{v(t)}catch(m){console.warn("showHideOnInactivity onHide (visibilitychange) callback error:",m)}}else u()}document.addEventListener("visibilitychange",d);function h(m){if(!m.relatedTarget){a&&(clearTimeout(a),a=null),v(t);try{typeof i=="function"&&i()}catch(T){console.warn("showHideOnInactivity onHide (visibilitychange) callback error:",T)}}}n.addEventListener("mouseout",h);function f(m){if(s&&(m.key==="Escape"||m.key==="Esc")){a&&(clearTimeout(a),a=null),v(t);try{typeof i=="function"&&i()}catch(T){console.warn("showHideOnInactivity onHide (esc) callback error:",T)}}}document.addEventListener("keydown",f);function p(){a||u()}n.addEventListener("touchend",p,{passive:!0}),v(t);function E(){l.forEach(m=>n.removeEventListener(m,u)),document.removeEventListener("visibilitychange",d),n.removeEventListener("mouseout",h),n.removeEventListener("touchend",p),document.removeEventListener("keydown",f),a&&(clearTimeout(a),a=null)}return E}let kt=null,Rt=null,Og="user";function Ta(){return Og}function Dg(t){Og=t}function Qs(t=!0){return!kt||!(kt instanceof MediaStream)?(t&&console.error("Invalid remote MediaStream accessed:",kt),null):kt}function Mg(t){kt=t}function xg(){kt&&(kt.getTracks().forEach(t=>t.stop()),kt=null)}function Zs(t=!0){return!Rt||!(Rt instanceof MediaStream)?(t&&(console.error("Invalid local MediaStream accessed:",Rt),console.error("Call createLocalStream() before accessing local stream.")),null):Rt}function fs(t){Rt=t}function Fg(){Rt&&(Rt.getTracks().forEach(t=>t.stop()),Rt=null)}const EA=Object.freeze(Object.defineProperty({__proto__:null,cleanupLocalStream:Fg,cleanupRemoteStream:xg,getFacingMode:Ta,getLocalStream:Zs,getRemoteStream:Qs,setFacingMode:Dg,setLocalStream:fs,setRemoteStream:Mg},Symbol.toStringTag,{value:"Module"}));let qr=!1,Ci=!1,Dd=null,Md=null,Nr=null;const vA=()=>qr;let dl=()=>{if(qr)return;const t=Qs(!1);if(!K||!t||K.paused||K.readyState<2){Ci||(Ci=!0,K.addEventListener("playing",()=>{Ci=!1,dl()},{once:!0}));return}if(Ci=!1,qr=!0,A(H),A(te),In(te),v(Ye),v(Wt),Ne.disabled=!0,Ne.classList.add("disabled"),We.disabled=!1,We.classList.remove("disabled"),Ve.disabled=!1,Ve.classList.remove("disabled"),Nr||(Nr=yA(Re,{inactivityMs:2500,hideOnEsc:!0})),!Dd){const e=()=>{fi()?In(H):Ct(H),A(H)};K.addEventListener("leavepictureinpicture",e),Dd=()=>K.removeEventListener("leavepictureinpicture",e)}if(!Md){const e=()=>v(H);K.addEventListener("enterpictureinpicture",e),Md=()=>K.removeEventListener("enterpictureinpicture",e)}},Ug=()=>{qr&&(qr=!1,Ct(te),v(te),Ct(H),v(H),Ne.disabled=!1,Ne.classList.remove("disabled"),A(Wt),We.disabled=!0,We.classList.add("disabled"),Ve.disabled=!0,Ve.classList.add("disabled"),Nr&&(Nr(),Nr=null),A(Ye),A(Re))};const ps=()=>{const t=Qs(!1);return t&&t.getVideoTracks().length>0&&t.getVideoTracks()[0].enabled&&t.getVideoTracks()[0].readyState==="live"};function wA(){return"pictureInPictureEnabled"in document&&typeof document.pictureInPictureEnabled=="boolean"&&document.pictureInPictureEnabled}function Ia(){if(!fi()){if(Ng(!0),v(Ye),Re.classList.remove("bottom"),Re.classList.add("watch-mode"),vA()?(v(Ne),A(We)):(v(We),v(cr),v(Ve),A(Ne)),v(Wt),v(lr),v(ar),A(Re),!ps()){v(H),Ct(H),wa(Ee)||(A(te),In(te));return}v(te),Ct(te),wa(K)?(v(H),Ct(H)):wA()?K.requestPictureInPicture().then(()=>{v(H),Ct(H)}).catch(t=>{console.warn("Failed to enter Picture-in-Picture:",t),In(H),A(H)}):(In(H),A(H))}}function Fi(){fi()&&(A(Ne),A(We),A(cr),A(Ve),A(lr),A(ar),Re.classList.remove("watch-mode"),Re.classList.add("bottom"),A(Re),ps()&&(wa(K)&&document.exitPictureInPicture().catch(t=>{console.error("Failed to exit Picture-in-Picture:",t)}),Ct(H),A(H)),In(te),A(te),ps()||(A(Ye),A(Wt)),Ng(!1))}class An{constructor(){this.logs=[],this.isEnabled=!0,this.maxLogs=1e3,this.sessionId=this.generateSessionId()}log(e,n,r={}){if(!this.isEnabled)return;const i={timestamp:performance.now(),sessionId:this.sessionId,category:e,event:n,data:{...r},id:this.generateLogId()};this.logs.push(i),this.logs.length>this.maxLogs&&(this.logs=this.logs.slice(-this.maxLogs)),typeof window<"u"&&window.location?.hostname==="localhost"&&console.log(`[DIAG] ${e}:${n}`,r)}logListenerAttachment(e,n,r,i={}){this.log("LISTENER","ATTACHED",{roomId:e,listenerType:n,currentCount:r,...i})}logListenerCleanup(e,n,r={}){this.log("LISTENER","CLEANUP",{removedCount:e.length,preservedCount:n.length,removedRoomIds:e,preservedRoomIds:n,...r})}logDuplicateListener(e,n,r={}){this.log("LISTENER","DUPLICATE_PREVENTED",{roomId:e,listenerType:n,...r})}logIncomingCallEvent(e,n,r,i={}){this.log("INCOMING_CALL","DETECTED",{callerId:e,roomId:n,isFresh:r.isFresh,validationMethod:r.method,age:r.age,reason:r.reason,...i})}logNotificationDecision(e,n,r,i={}){this.log("INCOMING_CALL","NOTIFICATION_DECISION",{decision:e,reason:n,roomId:r,...i})}logCallingUILifecycle(e,n,r={}){this.log("CALLING_UI",e,{roomId:n,...r})}logFirebaseOperation(e,n,r=null,i={}){this.log("FIREBASE","OPERATION",{operation:e,success:n,error:r?{message:r.message,code:r.code,stack:r.stack}:null,...i})}logFirebaseConnectionState(e,n={}){this.log("FIREBASE","CONNECTION_STATE",{state:e,...n})}logRoomCreation(e,n,r,i={}){this.log("ROOM","CREATED",{roomId:e,isInitiator:n,creationTime:r.creationTime,listenerAttachTime:r.listenerAttachTime,timeDiff:r.listenerAttachTime-r.creationTime,...i})}logMemberJoinEvent(e,n,r,i={}){this.log("ROOM","MEMBER_JOINED",{roomId:e,memberId:n,joinedAt:r.joinedAt,role:r.role,...i})}logContactSave(e,n,r={}){this.log("CONTACT","SAVED",{contactId:e,roomId:n,...r})}logContactCall(e,n,r,i={}){this.log("CONTACT","CALL_INITIATED",{contactId:e,roomId:n,forceInitiator:r,...i})}logFreshnessValidation(e,n,r,i={}){this.log("FRESHNESS","VALIDATION",{roomId:e,method:n,result:{isFresh:r.isFresh,age:r.age,threshold:r.threshold,reason:r.reason},...i})}logRaceCondition(e,n,r,i={}){this.log("RACE_CONDITION",e,{roomId:n,events:r,...i})}getLogs(e={}){let n=[...this.logs];return e.category&&(n=n.filter(r=>r.category===e.category)),e.event&&(n=n.filter(r=>r.event===e.event)),e.roomId&&(n=n.filter(r=>r.data.roomId===e.roomId)),e.since&&(n=n.filter(r=>r.timestamp>=e.since)),e.until&&(n=n.filter(r=>r.timestamp<=e.until)),n}getCallFlowTrace(e){return this.getLogs({roomId:e}).sort((n,r)=>n.timestamp-r.timestamp)}getListenerDiagnostics(e=null){const n=this.getLogs({category:"LISTENER"});return e?n.filter(r=>r.data.roomId===e):n}getFailureAnalysis(){const e=this.logs.filter(n=>n.category==="FIREBASE"&&n.data.success===!1||n.category==="INCOMING_CALL"&&n.data.decision==="REJECT"||n.category==="LISTENER"&&n.event==="DUPLICATE_PREVENTED");return{totalFailures:e.length,firebaseFailures:e.filter(n=>n.category==="FIREBASE").length,rejectedCalls:e.filter(n=>n.category==="INCOMING_CALL"&&n.data.decision==="REJECT").length,duplicateListeners:e.filter(n=>n.event==="DUPLICATE_PREVENTED").length,failures:e}}exportDiagnostics(){return{sessionId:this.sessionId,exportTime:Date.now(),logCount:this.logs.length,logs:[...this.logs],summary:this.getFailureAnalysis()}}exportLogsAsJSON(){return JSON.stringify(this.exportDiagnostics(),null,2)}downloadLogs(e=null){e||(e=`diagnostic-logs-${this.sessionId}-${Date.now()}.json`);const n=this.exportLogsAsJSON(),r=new Blob([n],{type:"application/json"}),i=document.createElement("a");i.href=URL.createObjectURL(r),i.download=e,i.click(),URL.revokeObjectURL(i.href)}getLogsInTimeRange(e,n){return this.logs.filter(r=>r.timestamp>=e&&r.timestamp<=n)}getLogsSince(e){return this.logs.filter(n=>n.timestamp>=e)}clearOldLogs(e=1440*60*1e3){const n=Date.now()-e;this.logs=this.logs.filter(r=>r.timestamp>=n)}clearLogs(){this.logs=[]}persistLogs(){try{const e=`diagnostic-logs-${this.sessionId}`;return localStorage.setItem(e,this.exportLogsAsJSON()),e}catch(e){return console.warn("Failed to persist logs to localStorage:",e),null}}loadPersistedLogs(e){try{const n=localStorage.getItem(e);if(n){const r=JSON.parse(n);if(r.logs&&Array.isArray(r.logs)){const i=new Set(this.logs.map(o=>o.id)),s=r.logs.filter(o=>!i.has(o.id));return this.logs=[...this.logs,...s].sort((o,a)=>o.timestamp-a.timestamp),s.length}}return 0}catch(n){return console.warn("Failed to load persisted logs:",n),0}}static getPersistedLogKeys(){const e=[];for(let n=0;n<localStorage.length;n++){const r=localStorage.key(n);r&&r.startsWith("diagnostic-logs-")&&e.push(r)}return e}static cleanupPersistedLogs(e=1440*60*1e3){const n=Date.now()-e;An.getPersistedLogKeys().forEach(i=>{try{const s=localStorage.getItem(i);if(s){const o=JSON.parse(s);o.exportTime&&o.exportTime<n&&localStorage.removeItem(i)}}catch{localStorage.removeItem(i)}})}enable(){this.isEnabled=!0}disable(){this.isEnabled=!1}generateSessionId(){return`session_${performance.now()}_${Math.random().toString(36).substr(2,9)}`}generateLogId(){return`log_${performance.now()}_${Math.random().toString(36).substr(2,9)}`}formatTimestamp(e){return new Date(e).toISOString()}startTiming(e){const n=`timing_${e}_${Date.now()}`;return this.log("TIMING","START",{operation:e,timingId:n}),n}endTiming(e,n={}){const r=this.logs.find(i=>i.category==="TIMING"&&i.event==="START"&&i.data.timingId===e);if(r){const i=Date.now()-r.timestamp;return this.log("TIMING","END",{timingId:e,duration:i,operation:r.data.operation,...n}),i}return null}}let Ro=null;function y(){return Ro||(Ro=new An),Ro}typeof window<"u"&&(window.diagnosticLogger={getInstance:()=>y(),exportLogs:()=>{const e=y().exportLogsAsJSON();return console.log("Diagnostic logs exported:"),console.log(e),e},downloadLogs:t=>{y().downloadLogs(t),console.log("Diagnostic logs downloaded")},getRoomLogs:t=>{const n=y().getCallFlowTrace(t);return console.log(`Logs for room ${t}:`,n),n},getFailures:()=>{const e=y().getFailureAnalysis();return console.log("Failure analysis:",e),e},getListenerDiagnostics:t=>{const n=y().getListenerDiagnostics(t);return console.log("Listener diagnostics:",n),n},getLogsSince:t=>{const n=y().getLogsSince(t);return console.log(`Logs since ${new Date(t).toISOString()}:`,n),n},getLogsInRange:(t,e)=>{const r=y().getLogsInTimeRange(t,e);return console.log(`Logs from ${new Date(t).toISOString()} to ${new Date(e).toISOString()}:`,r),r},persistLogs:()=>{const e=y().persistLogs();return console.log(`Logs persisted with key: ${e}`),e},loadPersistedLogs:t=>{const n=y().loadPersistedLogs(t);return console.log(`Loaded ${n} persisted logs`),n},getPersistedKeys:()=>{const t=An.getPersistedLogKeys();return console.log("Persisted log keys:",t),t},clearLogs:()=>{y().clearLogs(),console.log("Diagnostic logs cleared")},enable:()=>{y().enable(),console.log("Diagnostic logging enabled")},disable:()=>{y().disable(),console.log("Diagnostic logging disabled")},getSessionInfo:()=>{const t=y(),e={sessionId:t.sessionId,logCount:t.logs.length,isEnabled:t.isEnabled,maxLogs:t.maxLogs};return console.log("Session info:",e),e},help:()=>{console.log(`
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
      `)}},window.addEventListener("beforeunload",()=>{try{const t=y();t.logs.length>0&&t.persistLogs(),An.cleanupPersistedLogs()}catch{}}),(window.location.hostname==="localhost"||window.location.hostname==="127.0.0.1")&&setTimeout(()=>{try{const t=y(),e=typeof localStorage<"u"&&localStorage.getItem("debug:console")==="1";if(!t.isEnabled||!e)return;const n=An.getPersistedLogKeys();n.length>0&&(console.log(`Found ${n.length} persisted diagnostic log sessions. Use diagnosticLogger.loadPersistedLogs(key) to load them.`),console.log("Available keys:",n))}catch{}},1e3));class bA{constructor(){this.currentRoomId=null}async createNewRoom(e,n,r=null){const i=Date.now();r||(r=Math.random().toString(36).substring(2,15)),y().log("ROOM","CREATE_START",{roomId:r,userId:n,hasOffer:!!e,timestamp:i});const s=Gt(r);try{return await ft(s,{offer:{type:e.type,sdp:e.sdp},createdAt:Date.now(),createdBy:n}),y().logFirebaseOperation("create_room",!0,null,{roomId:r,userId:n,duration:Date.now()-i}),await this.joinRoom(r,n),y().log("ROOM","CREATE_COMPLETE",{roomId:r,userId:n,totalDuration:Date.now()-i}),r}catch(o){throw y().logFirebaseOperation("create_room",!1,o,{roomId:r,userId:n,duration:Date.now()-i}),o}}async checkRoomStatus(e){const n=Gt(e),r=await tn(n);if(!r.exists())return{exists:!1,hasMembers:!1,memberCount:0};const i=r.val(),s=i.members||{},o=Object.keys(s).length;return{exists:!0,hasMembers:o>0,memberCount:o,roomData:i}}async getRoomData(e){const n=Gt(e),r=await tn(n);if(!r.exists())throw new Error("Room does not exist");return r.val()}async saveAnswer(e,n){const r=Gt(e);await Ni(r,{answer:n})}async joinRoom(e,n,r="Guest User"){const i=gd(e,n);await ft(i,{displayName:r,joinedAt:Date.now()}),y().logFirebaseOperation("set","joinRoom",`rooms/${e}/members/${n}`)}async leaveRoom(e,n=null,{deleteRoomIfEmpty:r=!0}={}){const i=n||this.currentRoomId;if(!i||!e)return;const s=gd(i,e),o=bi(i),a=Gt(i);try{await jn(s)}catch(c){y().logFirebaseOperation("leave_room_remove_member",!1,c,{roomId:i,userId:e})}if(r)try{const c=await tn(o),l=c.exists()?c.val():{};(l?Object.keys(l).length:0)===0&&await jn(a).catch(d=>{y().logFirebaseOperation("delete_empty_room",!1,d,{roomId:i})})}catch(c){y().logFirebaseOperation("check_members_after_leave",!1,c,{roomId:i})}(!n||n===this.currentRoomId)&&(this.currentRoomId=null)}async rejectCall(e,n,r="user_rejected"){if(!e||!n)return;const i=Gt(e),s={rejection:{by:n,reason:r,at:Date.now()}};try{await Ni(i,s),y().log("ROOM","REJECT_SET",{roomId:e,byUserId:n,reason:r})}catch(o){throw y().log("ROOM","REJECT_SET_FAILED",{roomId:e,byUserId:n,reason:r,error:String(o?.message||o)}),o}}async cancelCall(e,n,r="caller_cancelled"){if(!e||!n)return;const i=Gt(e),s={cancellation:{by:n,reason:r,at:Date.now()}};try{await Ni(i,s),y().log("ROOM","CANCEL_SET",{roomId:e,byUserId:n,reason:r})}catch(o){throw y().log("ROOM","CANCEL_SET_FAILED",{roomId:e,byUserId:n,reason:r,error:String(o?.message||o)}),o}}onCallCancelled(e,n){const r=AI(e);Xt(r,"value",n,e),y().logFirebaseOperation("on","onCallCancelled",`rooms/${e}/cancellation`,{event:"value"})}onMemberJoined(e,n){const r=bi(e);Xt(r,"child_added",n,e),y().logFirebaseOperation("on","onMemberJoined",`rooms/${e}/members`,{event:"child_added"})}onMemberLeft(e,n){const r=bi(e);Xt(r,"child_removed",n,e),y().logFirebaseOperation("on","onMemberLeft",`rooms/${e}/members`,{event:"child_removed"})}onIncomingCall(e,n,r){const i=bi(e),s=a=>{r("join",a.key,a.val())},o=a=>{r("leave",a.key,a.val())};return Xt(i,"child_added",s,e,n),Xt(i,"child_removed",o,e,n),()=>RI(n,e)}get roomId(){return this.currentRoomId}}const G=new bA;class SA{constructor(e,{loop:n=!1,volume:r=.5}={}){this.src=e,this.audio=new Audio(e),this.audio.loop=n,this.audio.volume=Math.max(0,Math.min(1,r)),this.isPlaying=!1,this.audio.onerror=i=>{console.error(`[AudioPlayer] Failed to load audio: ${e}`,i),this.isPlaying=!1},this.audio.onplay=()=>{this.isPlaying=!0},this.audio.onpause=()=>{this.isPlaying=!1},this.audio.onended=()=>{this.isPlaying=!1}}async play(){if(this.isPlaying)return!0;try{return await this.audio.play(),this.isPlaying=!0,!0}catch(e){return e.name==="NotAllowedError"?console.warn("[AudioPlayer] Autoplay blocked - user interaction required first",{src:this.src}):e.name==="NotSupportedError"?console.error("[AudioPlayer] Audio format not supported",{src:this.src}):console.error("[AudioPlayer] Playback error:",e),this.isPlaying=!1,!1}}stop(){this.audio&&(this.audio.pause(),this.audio.currentTime=0,this.isPlaying=!1)}pause(){this.audio&&(this.audio.pause(),this.isPlaying=!1)}setVolume(e){this.audio&&(this.audio.volume=Math.max(0,Math.min(1,e)))}getVolume(){return this.audio?.volume??0}dispose(){this.stop(),this.audio&&(this.audio.onerror=null,this.audio.onplay=null,this.audio.onpause=null,this.audio.onended=null,this.audio.src="",this.audio=null),this.isPlaying=!1}}class CA{constructor(){this.currentPlayer=null,this.currentType=null}async playIncoming(){return this._play("incoming","/sounds/incoming.mp3")}async playOutgoing(){return this._play("outgoing","/sounds/outgoing.mp3")}async _play(e,n){this.stop();try{this.currentPlayer=new SA(n,{loop:!0,volume:.7}),this.currentType=e;const r=await this.currentPlayer.play();return r?console.log(`[Ringtone] Playing ${e} ringtone`):(console.warn(`[Ringtone] Failed to start ${e} ringtone (likely autoplay blocked)`),this.currentPlayer?.dispose(),this.currentPlayer=null,this.currentType=null),r}catch(r){return console.error(`[Ringtone] Error playing ${e} ringtone:`,r),this.currentPlayer?.dispose(),this.currentPlayer=null,this.currentType=null,!1}}stop(){this.currentPlayer&&(console.log(`[Ringtone] Stopping ${this.currentType} ringtone`),this.currentPlayer.stop(),this.currentPlayer.dispose(),this.currentPlayer=null,this.currentType=null)}isPlaying(){return this.currentPlayer?.isPlaying??!1}getCurrentType(){return this.currentType}}const Pn=new CA,gs=3e4;let et=null,Er=null;async function TA(t,e=null){const n=ue(),r=Xe();if(!r)return;const i=Hc(r);await ft(i,{roomId:t,targetContactName:e,initiatedAt:Date.now(),callerUserId:n})}async function ms(){const t=Xe();if(!t)return;const e=Hc(t);await jn(e).catch(()=>{})}async function $g(t,e){if(!t)return!1;try{const n=Hc(t),r=await tn(n);if(!r.exists())return!1;const i=r.val();return i.roomId!==e?!1:Date.now()-i.initiatedAt<gs}catch(n){return console.warn("Failed to check outgoing call freshness",n),!1}}async function Bg(t){if(!t)return!1;try{const e=se(oe,`rooms/${t}/createdAt`),n=await tn(e);if(!n.exists())return!1;const r=n.val();return typeof r!="number"?!1:Date.now()-r<gs}catch(e){return console.warn("Failed to check room freshness",e),!1}}async function Hg(t,e,n){const r=y(),i=Date.now();Ot(),await TA(t,e);const s=document.createElement("div");s.id="calling-modal",s.style.cssText=`
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
  `;const u=async()=>{r.logCallingUILifecycle("CANCEL",t,{contactName:e,reason:"user_cancelled",duration:Date.now()-i});try{await Promise.all([ms(),G.cancelCall(t,ue(),"caller_cancelled"),G.leaveRoom(ue(),t)])}catch(d){r.log("ROOM","CALLER_CANCELLED_CLEANUP_FAIL",{roomId:t,error:String(d)})}Pn.stop(),Ot()};l.onclick=u,o.appendChild(a),o.appendChild(c),o.appendChild(l),s.appendChild(o),document.body.appendChild(s),s.dataset.roomId=t,et=s,Pn.playOutgoing(),Er=setTimeout(async()=>{r.logCallingUILifecycle("TIMEOUT",t,{contactName:e,reason:"auto_timeout",duration:Date.now()-i,timeoutMs:gs});try{await Promise.all([ms(),G.cancelCall(t,ue(),"auto_timeout"),G.leaveRoom(ue(),t)])}catch(d){r.log("ROOM","CALLER_TIMEOUT_CLEANUP_FAIL",{roomId:t,error:String(d)})}Pn.stop(),Ot()},gs)}function Ot(){if(Pn.stop(),et){const t=et.dataset?.roomId||"unknown";y().logCallingUILifecycle("HIDE",t,{reason:"hide_called",hadTimeout:!!Er,timestamp:Date.now()})}Er&&(clearTimeout(Er),Er=null),et&&(et.remove(),et=null)}async function hl(){if(et){const t=et.dataset?.roomId||"unknown";y().logCallingUILifecycle("ANSWERED",t,{reason:"call_answered",timestamp:Date.now()})}await ms(),Ot()}async function IA(t="user_rejected"){const e=y(),n=et?.dataset?.roomId||"unknown";e.logCallingUILifecycle("REJECTED",n,{reason:t,timestamp:Date.now()}),await ms(),Ot()}const kA=Object.freeze(Object.defineProperty({__proto__:null,hideCallingUI:Ot,isOutgoingCallFresh:$g,isRoomCallFresh:Bg,onCallAnswered:hl,onCallRejected:IA,showCallingUI:Hg},Symbol.toStringTag,{value:"Module"}));let Nn=null;function fl(t,e={}){return new Promise(n=>{const r=document.createElement("dialog");r.innerHTML=`
      <p>${t}</p>
      <div class="confirm-dialog-actions">
        <button data-action="cancel">Cancel</button>
        <button data-action="confirm" autofocus>Confirm</button>
      </div>
    `,r.classList.add("confirm-dialog");const i=r.querySelector('[data-action="confirm"]'),s=r.querySelector('[data-action="cancel"]');if(!i||!s){console.error("dialog element not found!"),n(!1);return}let o=null;function a(c){o&&clearTimeout(o),r.close(),r.remove(),Nn===a&&(Nn=null),n(c)}i.addEventListener("click",()=>{a(!0)}),s.addEventListener("click",()=>{a(!1)}),r.addEventListener("cancel",()=>a(!1)),document.body.appendChild(r),r.showModal(),Nn=a,e.autoRemoveSeconds&&typeof e.autoRemoveSeconds=="number"&&e.autoRemoveSeconds>0&&(o=setTimeout(()=>{a(!1)},e.autoRemoveSeconds*1e3))})}function RA(){if(typeof Nn=="function"){try{Nn(!1)}catch{}return Nn=null,!0}return!1}const AA=Object.freeze(Object.defineProperty({__proto__:null,default:fl,dismissActiveConfirmDialog:RA},Symbol.toStringTag,{value:"Module"}));async function xd(t,e,n){const r=Xe();if(r){const i=se(oe,`users/${r}/contacts/${t}`);await ft(i,{contactId:t,contactName:e,roomId:n,savedAt:Date.now()});return}try{const i=localStorage.getItem("contacts")||"{}",s=JSON.parse(i);s[t]={contactId:t,contactName:e,roomId:n,savedAt:Date.now()},localStorage.setItem("contacts",JSON.stringify(s))}catch(i){console.warn("Failed to save contact to localStorage",i)}}async function _s(){const t=Xe();if(t)try{const e=se(oe,`users/${t}/contacts`),n=await tn(e);return n.exists()?n.val():{}}catch(e){return console.warn("Failed to read contacts from RTDB",e),{}}try{const e=localStorage.getItem("contacts")||"{}";return JSON.parse(e)}catch(e){return console.warn("Failed to read contacts from localStorage",e),{}}}async function PA(t,e,n){if(!t||!e)return;const i=(await _s())?.[t];if(i){i.roomId!==e&&(await xd(t,i.contactName,e),await Yr(n)),console.log(`[CONTACT SAVE] Re-attaching listener for existing contact room: ${e}`),zn(e);return}if(!await fl("Save contact?",{autoRemoveSeconds:15}))return;const o=window.prompt("Enter a name for this contact:",t)||t;await xd(t,o,e),console.log(`[CONTACT SAVE] Attaching listener for saved contact room: ${e}`),zn(e),await Yr(n)}async function Yr(t){if(!t)return;const e=await _s(),n=Object.keys(e);let r=t.querySelector(".contacts-container");if(r||(r=document.createElement("div"),r.className="contacts-container",t.appendChild(r)),n.length===0){r.innerHTML="<p>No saved contacts yet.</p>",v(r);return}A(r),r.innerHTML=`
    <h3>Saved Contacts</h3>
    <div class="contacts-list">
      ${n.map(i=>{const s=e[i];return`
            <div class="contact-entry">
              <span
                class="contact-name"
                data-room-id="${s.roomId}"
                data-contact-name="${s.contactName}"
                title="Call ${s.contactName}"
              >
                <i class="fa fa-phone"></i>
                ${s.contactName}
              </span>
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
  `,NA(r,t)}function NA(t,e){t.querySelectorAll(".contact-name").forEach(n=>{n.onclick=async()=>{const r=n.getAttribute("data-room-id"),i=n.getAttribute("data-contact-name");r&&(console.log(`[CONTACT CALL] Ensuring listener is active for room: ${r}`),zn(r),await Hg(r,i),eo(r,{forceInitiator:!0}).catch(s=>{console.warn("Failed to call contact:",s),Ot()}))}}),t.querySelectorAll(".contact-delete-btn").forEach(n=>{n.onclick=async()=>{const r=n.getAttribute("data-contact-id");!r||!window.confirm("Delete this contact?")||(await LA(r),await Yr(e))}})}async function LA(t){const e=Xe();if(e){try{await jn(se(oe,`users/${e}/contacts/${t}`))}catch(n){console.warn("Failed to delete contact from RTDB",n)}return}try{const n=localStorage.getItem("contacts")||"{}",r=JSON.parse(n);r[t]&&(delete r[t],localStorage.setItem("contacts",JSON.stringify(r)))}catch(n){console.warn("Failed to delete contact from localStorage",n)}}const Kr=new WeakMap;function pl(t,e,n){if(!t||!n)throw new Error("setupIceCandidates: pc and roomId are required");if(Kr.has(t)||Kr.set(t,[]),e==="initiator")Fd(t,"offerCandidates",n),Ud(t,"answerCandidates",n);else if(e==="joiner")Fd(t,"answerCandidates",n),Ud(t,"offerCandidates",n);else throw new Error(`Invalid role: ${e} specified for ICE candidate setup.`)}function Fd(t,e,n){t.onicecandidate=r=>{if(r.candidate){const i=cd(e==="offerCandidates"?Lp(n):Op(n));ft(i,r.candidate.toJSON())}}}function Ud(t,e,n){const r=e==="offerCandidates"?Lp(n):Op(n);let i=!1;const s=()=>{if(i)return;i=!0;const a=()=>{t.remoteDescription&&(gl(t),t.removeEventListener("signalingstatechange",a))};t.addEventListener("signalingstatechange",a)};Xt(r,"child_added",a=>{const c=a.val();if(!(!t||t.signalingState==="closed")&&c)if(t.remoteDescription)try{t.addIceCandidate(new RTCIceCandidate(c))}catch{}else{const l=Kr.get(t);l&&(l.push(c),l.length===1&&s())}},n)}function gl(t){if(!t||!Kr.has(t))return;const e=Kr.get(t);if(e.length!==0){$(`🔄 Draining ${e.length} queued ICE candidate(s)`);for(const n of e)try{t.addIceCandidate(new RTCIceCandidate(n)).catch(r=>{$("Error adding queued ICE candidate:",r)})}catch{}e.length=0}}const OA=Object.freeze(Object.defineProperty({__proto__:null,drainIceCandidateQueue:gl,setupIceCandidates:pl},Symbol.toStringTag,{value:"Module"}));let je=null,$d=null;function Wg(t){$d=t,t.onconnectionstatechange=()=>{$("onconnectionstatechange:",t.connectionState),t.connectionState==="connected"?(dl(),hl().catch(e=>console.warn("Failed to clear calling state on connect:",e)),je&&(clearTimeout(je),je=null)):t.connectionState==="disconnected"?(je&&clearTimeout(je),je=setTimeout(()=>{t===$d&&t.connectionState==="disconnected"&&ne.cleanupCall({reason:"connection_lost"}),je=null},3e3)):t.connectionState==="failed"&&(Ys(),je&&(clearTimeout(je),je=null),ne.cleanupCall({reason:"connection_failed"}))},t.addEventListener("iceconnectionstatechange",e=>{$("ICE iceconnectionstatechange:",t.iceConnectionState),t.iceConnectionState==="failed"&&(console.warn("ICE connection failed, restarting ICE..."),t.restartIce())})}function ys(t,e,n={}){if(!t||typeof e!="function")throw new Error("closeOnClickOutside: valid element and onClose callback required");const{ignore:r=[],esc:i=!0,events:s=["mousedown","touchstart"]}=n,o=Array.isArray(r)?r.filter(Boolean):[],a=l=>{try{const u=l.target;if(t.contains(u))return;for(const d of o)if(d&&d.contains&&d.contains(u)||d===u)return;e(l)}catch(u){console.error("closeOnClickOutside handler error:",u)}},c=l=>{i&&l.key==="Escape"&&e(l)};return s.forEach(l=>document.addEventListener(l,a,{passive:!0})),i&&document.addEventListener("keydown",c),function(){s.forEach(u=>document.removeEventListener(u,a,{passive:!0})),i&&document.removeEventListener("keydown",c)}}const DA=CSS.supports?.("position-anchor: --msg-toggle")&&CSS.supports?.("right: anchor(right)")&&CSS.supports?.("bottom: anchor(top)");function MA(t){const e=t.getBoundingClientRect();return e.top>=0&&e.left>=0&&e.bottom<=window.innerHeight&&e.right<=window.innerWidth}function Bd(t){const e=document.createElement("div");e.innerHTML=`
  <div id="messages-ui-container" >
    <div id="messages-toggle-btn" class="hidden">
      <button>
        💬
      </button>
    </div>
    <div id="messages-box" class="messages-box hidden">
      <div id="messages"></div>
      <form id="messages-form">
        <input id="messages-input" placeholder="Type a message...">
        <button>Send</button>
      </form>
    </div>
  </div>
  `,document.body.appendChild(e);const n=e.querySelector("#messages-toggle-btn"),r=e.querySelector("#messages-box"),i=e.querySelector("#messages"),s=e.querySelector("#messages-form"),o=e.querySelector("#messages-input");if(!n||!r||!i||!s||!o)return console.error("Messages UI elements not found."),null;let a=!1;function c(){if(!n||!r||r.classList.contains("hidden"))return;const _=n.getBoundingClientRect(),L=r.getBoundingClientRect(),Le=8;let Se=_.top-L.height-Le;Se<8&&(Se=_.bottom+Le);let re=_.left+_.width/2-L.width/2;const Vt=window.innerWidth-L.width-8;re<8&&(re=8),re>Vt&&(re=Vt),r.style.top=`${Math.round(Se)}px`,r.style.left=`${Math.round(re)}px`}function l(){a||(a=!0,window.addEventListener("resize",c,{passive:!0}),window.addEventListener("scroll",c,{passive:!0}),window.addEventListener("orientationchange",c,{passive:!0}))}function u(){a&&(a=!1,window.removeEventListener("resize",c),window.removeEventListener("scroll",c),window.removeEventListener("orientationchange",c))}const d=document.querySelector(".top-bar .top-right-menu")||document.querySelector(".top-right-menu");n&&d&&d.appendChild(n);const h=new MutationObserver(_=>{_.forEach(L=>{L.type==="attributes"&&L.attributeName==="class"&&r.classList.contains("hidden")})});h.observe(r,{attributes:!0});function f(){r.classList.toggle("hidden"),r.classList.contains("hidden")?(o.blur(),u(),r.style.top="",r.style.left="",r.style.bottom="",r.style.right=""):(o.focus(),DA?requestAnimationFrame(()=>{MA(r)||(c(),l())}):(c(),l()))}n.addEventListener("click",f),ys(r,()=>{v(r),u(),r.style.top="",r.style.left="",r.style.bottom="",r.style.right=""},{ignore:[n],esc:!0});function p(){A(n)}function E(){v(n)}function m(_){const L=document.createElement("p");L.textContent=_,_.startsWith("You:")?L.style.textAlign="right":_.startsWith("Partner:")&&(L.style.textAlign="left"),i.appendChild(L),i.scrollTop=i.scrollHeight}function T(_){m(`Partner: ${_}`),tl(r)&&N()}function N(){n.classList.add("new-message"),setTimeout(()=>{n.classList.remove("new-message")},4e3)}s.addEventListener("submit",_=>{_.preventDefault();const L=o.value.trim();L&&(t(L),m(`You: ${L}`),o.value="")});function de(){try{mq.removeEventListener("change",applyPlacement)}catch{}n&&n.parentNode&&n.parentNode.removeChild(n),u(),h.disconnect(),e&&e.parentNode&&e.parentNode.removeChild(e)}return{appendChatMessage:m,receiveMessage:T,toggleMessages:f,showMessagesToggle:p,hideMessagesToggle:E,cleanup:de}}function Vg(t,e,n=null){let r,i;return e==="initiator"?(r=t.createDataChannel("chat"),i=Bd(o=>{r.readyState==="open"&&r.send(o)}),r.onopen=()=>{i.showMessagesToggle(),i.appendChatMessage("💬 Chat connected")},r.onmessage=o=>i.receiveMessage(o.data)):e==="joiner"&&(t.ondatachannel=s=>{r=s.channel,i=Bd(o=>r.send(o)),n&&n(i),r.onopen=()=>{i.showMessagesToggle(),i.appendChatMessage("💬 Chat connected")},r.onmessage=o=>i.receiveMessage(o.data)}),{dataChannel:r,messagesUI:i}}const ml={iceServers:[{urls:"stun:stun.l.google.com:19302"}]},Ao=new WeakMap;function jg(t,e,n){Ao.has(t)||Ao.set(t,{});const r=Ao.get(t),i=e==="offer"?"lastOffer":"lastAnswer";return r[i]===n?!0:(r[i]=n,!1)}function Gg(t,e){return t?e==="offer"?t.signalingState==="stable":t.signalingState==="have-local-offer"||t.signalingState==="stable":!1}function _l(t,e){e.getTracks().forEach(n=>{t.addTrack(n,e)})}async function zg(t){const e=await t.createOffer();return await t.setLocalDescription(e),e}async function qg(t){const e=await t.createAnswer();return await t.setLocalDescription(e),e}async function Yg(t,e,n){if(jg(t,e.type,e.sdp))return console.debug(`Ignoring duplicate ${e.type} - already processed`),!1;if(!Gg(t,e.type))return console.warn(`Ignoring ${e.type} - unexpected signaling state:`,t.signalingState),!1;try{return await t.setRemoteDescription(new RTCSessionDescription(e)),n(t),console.debug(`Remote description set (${e.type})`),!0}catch(r){return console.error(`Failed to set remote description (${e.type}):`,r),!1}}function Kg(){return Math.random().toString(36).substring(2,9)}const xA=Object.freeze(Object.defineProperty({__proto__:null,addLocalTracks:_l,createAnswer:qg,createOffer:zg,generateRoomId:Kg,isDuplicateSdp:jg,isValidSignalingState:Gg,rtcConfig:ml,setRemoteDescription:Yg},Symbol.toStringTag,{value:"Module"}));async function FA({localStream:t,remoteVideoEl:e,mutePartnerBtn:n,setupRemoteStream:r,setupWatchSync:i,targetRoomId:s=null}){if(!t)return{success:!1};const o=new RTCPeerConnection(ml),a="initiator",c=s||Kg(),l=ue();_l(o,t);const{dataChannel:u,messagesUI:d}=Vg(o,a);if(!r(o,e,n))return console.error("Error setting up remote stream"),o.close(),{success:!1};pl(o,a,c),Wg(o);const f=await zg(o);await G.createNewRoom(f,l,c),i(c,a,l);const p=`${window.location.origin}${window.location.pathname}?room=${c}`;return{success:!0,pc:o,roomId:c,roomLink:p,dataChannel:u,messagesUI:d,role:a}}async function UA({roomId:t,localStream:e,remoteVideoEl:n,mutePartnerBtn:r,setupRemoteStream:i,setupWatchSync:s,onMessagesUIReady:o=null}){if(!e)return{success:!1};if(!t)return{success:!1};const a=await G.checkRoomStatus(t);if(!a.exists)return{success:!1};if(!a.hasMembers)return{success:!1};let c;try{c=await G.getRoomData(t)}catch(T){return $("Error: "+T.message),{success:!1}}const l=c.offer;if(!l)return{success:!1};const u=new RTCPeerConnection(ml),d="joiner",h=ue();_l(u,e);const{dataChannel:f,messagesUI:p}=Vg(u,d,o);if(!i(u,n,r))return console.error("Error setting up remote stream for joiner"),u.close(),{success:!1};pl(u,d,t),Wg(u),await Yg(u,l,gl);const m=await qg(u);try{await G.saveAnswer(t,m)}catch(T){return console.error("Failed to save answer to Firebase:",T),u.close(),{success:!1}}return s(t,d,h),await G.joinRoom(t,h),{success:!0,pc:u,roomId:t,dataChannel:f,messagesUI:p,role:d}}class $A{constructor(){this.listeners=new Map}on(e,n){this.listeners.has(e)||this.listeners.set(e,new Set),this.listeners.get(e).add(n)}off(e,n){this.listeners.has(e)&&this.listeners.get(e).delete(n)}emit(e,n){if(this.listeners.has(e))for(const r of Array.from(this.listeners.get(e)))try{r(n)}catch(i){console.warn("CallController listener error",i)}}}class BA{constructor(){this.emitter=new $A,this.resetState()}resetState(){this.state="idle",this.roomId=null,this.roomLink=null,this.role=null,this.partnerId=null,this.pc=null,this.dataChannel=null,this.messagesUI=null,this.localVideoEl=null,this.remoteVideoEl=null,this.isHangingUp=!1,this.isCleaningUp=!1,this.listeners=new Map}getState(){return{state:this.state,roomId:this.roomId,roomLink:this.roomLink,role:this.role,partnerId:this.partnerId,hasPc:!!this.pc,isHangingUp:this.isHangingUp,isCleaningUp:this.isCleaningUp}}on(e,n){this.emitter.on(e,n)}off(e,n){this.emitter.off(e,n)}setPartnerId(e){this.partnerId=e}setupCancellationListener(e){if(!e)return;const n=se(oe,`rooms/${e}/cancellation`);let r=!1;const i=async s=>{const o=s.val();if(o&&!r){r=!0;try{this.remoteVideoEl&&(this.remoteVideoEl.srcObject=null)}catch(a){console.warn("Failed to clear remote video after cancellation",a)}try{this.pc&&this.pc.close()}catch{}try{await this.cleanupCall({reason:o.reason||"remote_cancelled"})}catch(a){console.warn("Failed to trigger CallController cleanup",a)}}};Li(n,i,e),this.listeners.has("cancellation")||this.listeners.set("cancellation",[]),this.listeners.get("cancellation").push({ref:n,callback:i,roomId:e})}setupAnswerListener(e,n,r){if(!e||!n)return;const i=se(oe,`rooms/${e}/answer`),s=async o=>{const a=o.val();if(a){const{setRemoteDescription:c}=await Ze(async()=>{const{setRemoteDescription:l}=await Promise.resolve().then(()=>xA);return{setRemoteDescription:l}},void 0);await c(n,a,r)}};Li(i,s,e),this.listeners.has("answer")||this.listeners.set("answer",[]),this.listeners.get("answer").push({ref:i,callback:s,roomId:e})}setupRejectionListener(e){if(!e)return;const n=se(oe,`rooms/${e}/rejection`);let r=!1;const i=async s=>{const o=s.val();if(o&&!r&&(r=!0,this.pc?.connectionState!=="connected")){try{const{onCallRejected:a}=await Ze(async()=>{const{onCallRejected:c}=await Promise.resolve().then(()=>kA);return{onCallRejected:c}},void 0);await a(o.reason||"user_rejected")}catch{}try{await G.leaveRoom(ue(),e)}catch{}try{this.pc&&this.pc.close()}catch{}}};Li(n,i,e),this.listeners.has("rejection")||this.listeners.set("rejection",[]),this.listeners.get("rejection").push({ref:n,callback:i,roomId:e})}setupMemberJoinedListener(e){if(!e)return;const n=ue(),r=i=>{i.key!==n&&(this.setPartnerId(i.key),this.emitter.emit("memberJoined",{memberId:i.key,roomId:e}))};G.onMemberJoined(e,r),this.listeners.has("member-joined")||this.listeners.set("member-joined",[]),this.listeners.get("member-joined").push({callback:r,roomId:e})}setupMemberLeftListener(e){if(!e)return;const n=ue(),r=i=>{i.key!==n&&this.pc?.connectionState==="connected"&&this.emitter.emit("memberLeft",{memberId:i.key,roomId:e})};G.onMemberLeft(e,r),this.listeners.has("member-left")||this.listeners.set("member-left",[]),this.listeners.get("member-left").push({callback:r,roomId:e})}removeTrackedListeners(){try{for(const[e,n]of this.listeners.entries())for(const r of n)try{r.ref&&Ws(r.ref,"value",r.callback)}catch(i){console.warn(`Failed to remove ${e} listener`,i)}}catch(e){console.warn("Failed to remove tracked listeners",e)}finally{this.listeners.clear()}if(this.roomId)try{js(this.roomId)}catch(e){console.warn("Failed to remove RTDB listeners for room",e)}}async createCall(e={}){this.state="creating";try{e.localVideoEl&&(this.localVideoEl=e.localVideoEl),e.remoteVideoEl&&(this.remoteVideoEl=e.remoteVideoEl);const n=await FA(e);if(!n||!n.success)return this.state="idle",this.emitter.emit("error",{phase:"createCall",detail:n}),this.emitCallFailed("createCall",n),n;this.pc=n.pc,this.roomId=n.roomId,this.roomLink=n.roomLink||null,this.role=n.role||"initiator",this.dataChannel=n.dataChannel||null,this.messagesUI=n.messagesUI||null,this.state="waiting";const{drainIceCandidateQueue:r}=await Ze(async()=>{const{drainIceCandidateQueue:i}=await Promise.resolve().then(()=>OA);return{drainIceCandidateQueue:i}},void 0);return this.setupAnswerListener(this.roomId,this.pc,r),this.setupCancellationListener(this.roomId),this.setupRejectionListener(this.roomId),this.setupMemberJoinedListener(this.roomId),this.setupMemberLeftListener(this.roomId),this.emitter.emit("created",{roomId:this.roomId,roomLink:this.roomLink,role:this.role}),n}catch(n){throw this.state="idle",this.emitter.emit("error",{phase:"createCall",error:n}),this.emitCallFailed("createCall",n),n}}async answerCall(e={}){this.state="joining";try{e.localVideoEl&&(this.localVideoEl=e.localVideoEl),e.remoteVideoEl&&(this.remoteVideoEl=e.remoteVideoEl);const r=await UA({...e,onMessagesUIReady:i=>{this.messagesUI=i}});return!r||!r.success?(this.state="idle",this.emitter.emit("error",{phase:"answerCall",detail:r}),this.emitCallFailed("answerCall",r),r):(this.pc=r.pc,this.roomId=r.roomId,this.role=r.role||"joiner",this.dataChannel=r.dataChannel||null,this.messagesUI=r.messagesUI||null,this.state="connected",this.setupCancellationListener(this.roomId),this.setupMemberJoinedListener(this.roomId),this.setupMemberLeftListener(this.roomId),this.emitter.emit("answered",{roomId:this.roomId,role:this.role}),r)}catch(n){throw this.state="idle",this.emitter.emit("error",{phase:"answerCall",error:n}),this.emitCallFailed("answerCall",n),n}}async hangUp({emitCancel:e=!0,reason:n="user_hung_up"}={}){if(!this.isHangingUp){this.isHangingUp=!0;try{if(e&&this.roomId)try{await G.cancelCall(this.roomId,ue(),n)}catch(r){console.warn("CallController: cancelCall failed (non-fatal)",r)}await this.cleanupCall({reason:n}),this.emitter.emit("hangup",{roomId:this.roomId,reason:n})}catch(r){throw this.emitter.emit("error",{phase:"hangUp",error:r}),r}finally{this.isHangingUp=!1}}}isRemoteHangup(e){return e?["remote","cancelled","partner_disconnected","connection_failed"].some(r=>e.includes(r)):!1}emitCallFailed(e,n){this.emitter.emit("callFailed",{phase:e,error:n?.message||n?.error||n||"Unknown error"})}async cleanupCall({reason:e}={}){if(!this.isCleaningUp){this.isCleaningUp=!0;try{const n=this.roomId,r=this.partnerId;this.removeTrackedListeners();try{await G.leaveRoom(ue(),this.roomId)}catch{}try{if(this.pc){try{this.pc.close()}catch{}this.pc=null}}catch{}try{this.remoteVideoEl&&(this.remoteVideoEl.srcObject=null)}catch(i){console.warn("CallController: failed to clear remote video",i)}try{this.localVideoEl&&(this.localVideoEl.srcObject=null)}catch(i){console.warn("CallController: failed to clear local video",i)}try{const{cleanupLocalStream:i}=await Ze(async()=>{const{cleanupLocalStream:s}=await Promise.resolve().then(()=>EA);return{cleanupLocalStream:s}},void 0);i()}catch(i){console.warn("CallController: failed to cleanup local stream",i)}try{const{resetLocalStreamInitFlag:i}=await Ze(async()=>{const{resetLocalStreamInitFlag:s}=await Promise.resolve().then(()=>kP);return{resetLocalStreamInitFlag:s}},void 0);i()}catch{}if(this.isRemoteHangup(e)&&this.emitter.emit("remoteHangup",{roomId:n,partnerId:r,reason:e}),this.messagesUI&&this.messagesUI.cleanup)try{this.messagesUI.cleanup()}catch(i){console.warn("CallController: failed to cleanup messages UI",i)}this.resetState(),this.emitter.emit("cleanup",{roomId:n,partnerId:r,reason:e})}catch(n){throw this.emitter.emit("error",{phase:"cleanupCall",error:n}),n}finally{this.isCleaningUp=!1}}}}const ne=new BA,ka={default:{echoCancellation:!0,noiseSuppression:!0,autoGainControl:!0},withVoiceIsolationIfSupported:{echoCancellation:!0,noiseSuppression:!0,autoGainControl:!0,voiceIsolation:!0,restrictOwnAudio:!0,googHighpassFilter:!0,googTypingNoiseDetection:!0,highpassFilter:!0,typingNoiseDetection:!0}};function Jg(){const t=navigator.mediaDevices.getSupportedConstraints();return["voiceIsolation","highpassFilter","typingNoiseDetection"].every(r=>t[r])?ka.withVoiceIsolationIfSupported:ka.default}const HA=()=>ka.default,WA={desktop:{landscape:{width:{ideal:1920},height:{ideal:1080},frameRate:{min:10,ideal:30},aspectRatio:{ideal:16/9}},portrait:{width:{ideal:1080},height:{ideal:1920},frameRate:{min:10,ideal:30},aspectRatio:{ideal:9/16}}},mobile:{portrait:{width:{ideal:1080},height:{ideal:1920},aspectRatio:{ideal:9/16},frameRate:{ideal:30}},landscape:{width:{ideal:1920},height:{ideal:1080},aspectRatio:{ideal:16/9},frameRate:{ideal:30}}}},VA=()=>window.screen?.orientation?.type?.includes("portrait")||window.orientation===0||window.orientation===180;function yl(t){const e=VA()?"portrait":"landscape",r=/Mobi|Android/i.test(navigator.userAgent)?"mobile":"desktop",i=WA[r][e];return{facingMode:t,...i}}function jA(){return!!(navigator.mediaDevices&&navigator.mediaDevices.enumerateDevices)}async function GA(){return jA()?(await navigator.mediaDevices.enumerateDevices()).filter(e=>e.kind==="videoinput"):[]}async function zA(){const t=await GA();let e=!1,n=!1;return t.forEach(r=>{const i=r.label.toLowerCase();(i.includes("front")||i.includes("user"))&&(e=!0),(i.includes("back")||i.includes("rear")||i.includes("environment"))&&(n=!0)}),e&&n}async function qA({localStream:t,localVideo:e,currentFacingMode:n,peerConnection:r=null}){if(!t||!e)return console.error("switchCamera: missing localStream or localVideo"),null;const i=n==="user"?"environment":"user";try{const s=await navigator.mediaDevices.getUserMedia({video:yl(i),audio:Jg()}),o=s.getVideoTracks()[0],a=s.getAudioTracks()[0],c=t.getVideoTracks()[0],l=c?c.enabled:!0,u=t.getAudioTracks()[0],d=u?!u.enabled:!1;if(r){const h=r.getSenders().find(p=>p.track&&p.track.kind==="video");h&&h.replaceTrack(o);const f=r.getSenders().find(p=>p.track&&p.track.kind==="audio");f&&a&&f.replaceTrack(a)}return o&&(o.enabled=l),a&&(a.enabled=!d),t.getTracks().forEach(h=>h.stop()),e.srcObject=new MediaStream([o].filter(Boolean)),{newStream:s,facingMode:i}}catch(s){return console.error("Failed to switch camera:",s),null}}let Po=!1,zt=null,qt=null;function YA({getLocalStream:t,getFacingMode:e}){return zt&&qt&&zt.removeEventListener("change",qt),zt=window.matchMedia("(orientation: portrait)"),qt=()=>{try{const n=typeof t=="function"?t():null,r=typeof e=="function"?e():"user";KA({localStream:n,currentFacingMode:r})}catch(n){console.error("Orientation handler failed:",n)}},zt.addEventListener("change",qt),()=>{zt&&qt&&zt.removeEventListener("change",qt),zt=null,qt=null}}async function KA({localStream:t,currentFacingMode:e}){if(!(Po||!t?.getVideoTracks()[0])){Po=!0;try{const n=t.getVideoTracks()[0],r=yl(e);$("Applying constraints:",r),await n.applyConstraints(r),$("Video constraints updated successfully")}catch(n){console.error("Failed to apply orientation constraints:",n)}finally{Po=!1}}}let Ra=!1,Es=[];function JA(t,e){if(!e)return;const n=e.getAudioTracks()[0];n&&(n.enabled=t)}function XA(t,e,n){n&&(n.muted=!t,n.volume=e)}function QA(t,e){const n=e.querySelector("i");n.className=t?"fa fa-microphone-slash":"fa fa-microphone"}function ZA(t,e){if(!t)return;const n=()=>{if(t.muted!==Ra){const r=e.querySelector("i");r.className=t.muted?"fa fa-volume-mute":"fa fa-volume-up",Ra=t.muted}};t.addEventListener("volumechange",n),Es.push(()=>{t&&t.removeEventListener("volumechange",n)})}function eP({getLocalStream:t,getLocalVideo:e,getRemoteVideo:n,getPeerConnection:r=()=>null,setLocalStream:i=null,micBtn:s,cameraBtn:o,switchCameraBtn:a,mutePartnerBtn:c,fullscreenPartnerBtn:l}){s&&(s.onclick=()=>{const d=t(),h=e();if(!h||!d)return;const f=d.getAudioTracks()[0];if(!f)return;const p=f.enabled;JA(!p,d),XA(!p,0,h),QA(p,s)}),o&&(o.onclick=()=>{const d=t();if(!d)return;const h=d.getVideoTracks()[0];if(h){h.enabled=!h.enabled;const f=o.querySelector("i");f.className=h.enabled?"fa fa-video":"fa fa-video-slash"}});const u=YA({getLocalStream:t,getFacingMode:Ta});Es.push(u),a&&(a.onclick=async()=>{const d=await qA({localStream:t(),localVideo:e(),currentFacingMode:Ta(),peerConnection:r()||null});d?(Dg(d.facingMode),console.log("Switched camera to facingMode:",d.facingMode),d.newStream&&typeof i=="function"&&i(d.newStream)):console.error("Camera switch failed.")},(async()=>await zA()?A(a):v(a))()),c&&(c.onclick=()=>{const d=n();d&&(d.muted=!d.muted)}),l&&(l.onclick=()=>{const d=n();d.requestFullscreen?d.requestFullscreen():d.webkitRequestFullscreen&&d.webkitRequestFullscreen()})}function tP(){Es.forEach(t=>t()),Es=[],Ra=!1}let No=null,wt=null,B=null,F=null,Hd=!1,Ti=!1,Ge=[],Aa="",le=-1,Pa=[];const nP="AIzaSyBPUjW7ac277WIYTbN4M8dUomK39qRQjhA",rP="https://www.googleapis.com/youtube/v3";async function iP(){if(Hd||Ti)return!1;Ti=!0;const{initializeYouTubeElements:t}=await Ze(async()=>{const{initializeYouTubeElements:o}=await Promise.resolve().then(()=>nA);return{initializeYouTubeElements:o}},void 0),e=await t();if(No=e.searchContainer,wt=e.searchBtn,B=e.searchQuery,F=e.searchResults,!No||!wt||!B||!F)return console.error("YouTube search elements not found in DOM"),Ti=!1,!1;const n=o=>/^https?:\/\//i.test(o),r=o=>{(F?.querySelectorAll(".search-result-item")||[]).forEach((c,l)=>{l===o?(c.classList.add("focused"),c.scrollIntoView({block:"nearest"})):c.classList.remove("focused")}),le=o??-1};wt.onclick=async()=>{const o=B.value.trim();if(tl(B)){A(B),B.focus();return}if(!o){Ui(),v(B);return}if(jd()&&o===Aa)Na(Ge);else if(!n(o))await Wd(o);else{vn&&await vn({url:o}),v(F),B.value="",v(B),le=-1;return}},No.addEventListener("keydown",async o=>{const a=F.querySelectorAll(".search-result-item");if(a.length>0&&(o.key==="ArrowDown"||o.key==="ArrowUp")){if(o.key==="ArrowDown"){let c=le+1;c>=a.length&&(c=0),r(c)}else if(o.key==="ArrowUp"){let c=le-1;c<0&&(c=le===-1?0:a.length-1),r(c)}return}if(o.key==="Enter"){if(a.length>0&&le>=0){a[le].click(),v(B),v(F),le=-1;return}const c=B.value.trim();if(c)if(jd()&&c===Aa)Na(Ge);else if(!n(c))await Wd(c);else{vn&&await vn({url:c}),v(F),le=-1,B.value="",v(B);return}}else o.key==="Escape"&&(oP()?Ui():B.value?B.value="":v(B))}),B.addEventListener("input",()=>{B.value.trim()===""&&Ui(),le=-1});const i=ys(B,()=>v(B),{ignore:[wt],esc:!1});Pa.push(i);const s=ys(F,()=>v(F),{ignore:[wt],esc:!1});return Pa.push(s),Ti=!1,Hd=!0,!0}async function Wd(t){if(!wt||!F){console.error("Search elements not initialized");return}Ge=[],Aa=t,wt.disabled=!0,F.innerHTML='<div class="search-loading">Searching YouTube...</div>',A(F);try{const e=await fetch(`${rP}/search?part=snippet&maxResults=10&q=${encodeURIComponent(t)}&type=video&key=${nP}`);if(!e.ok)throw e.status===403?new Error("YouTube API quota exceeded. Please try again later."):e.status===400?new Error("Invalid API key or request."):new Error(`YouTube API error: ${e.status}`);const n=await e.json();if(!n.items||n.items.length===0){Vd("No videos found"),Ge=[];return}Ge=n.items.map(r=>({id:r.id.videoId,title:r.snippet.title,thumbnail:r.snippet.thumbnails.medium.url,channel:r.snippet.channelTitle,url:`https://www.youtube.com/watch?v=${r.id.videoId}`})),Na(Ge)}catch(e){console.error("YouTube search failed:",e),Vd(e.message||"Search failed. Please try again.")}finally{wt.disabled=!1}}function Na(t){if(!F){console.error("Search results element not initialized");return}if(!t||t.length===0){F.innerHTML='<div class="no-results">No results found</div>',Ge=[],le=-1;return}F.innerHTML="",t.forEach(n=>{const r=document.createElement("div");r.className="search-result-item",r.innerHTML=`
      <img src="${n.thumbnail}" alt="${n.title}" class="result-thumbnail">
      <div class="search-result-info">
        <div class="search-result-title">${n.title}</div>
        <div class="search-result-channel">${n.channel}</div>
      </div>
    `,r.onclick=async()=>{if(vn){if(await vn(n),v(F),le=-1,!B){console.error("Search query element not initialized");return}B.value="",v(B)}},F.appendChild(r)}),A(F),le=0,F.querySelectorAll(".search-result-item").forEach((n,r)=>{r===le?(n.classList.add("focused"),n.scrollIntoView({block:"nearest"})):n.classList.remove("focused")})}function Vd(t){if(Ge=[],le=-1,!F){console.error("Search results element not initialized");return}F.innerHTML=`<div class="search-error">${t}</div>`,A(F)}function Ui(){Ge=[],le=-1,F&&(F.innerHTML="",v(F))}function sP(){Ui(),Pa.forEach(t=>t())}function oP(){return!tl(F)}function jd(){return Ge.length>0}function aP({parent:t,manager:e=null,onClick:n=null,hideWhenAllRead:r=!1}={}){let i=e;const s=wg({initialProps:{unreadCount:0,isHidden:!0},template:`
      <button 
        class="notifications-toggle-btn" 
        title="Notifications"
        onclick="handleClick"
      >
        <i class="fa fa-bell"></i>
        <span class="notification-badge" style="display: \${unreadCount > 0 ? 'flex' : 'none'}">
          \${unreadCount}
        </span>
      </button>
    `,handlers:{handleClick:()=>{n?n():i&&i.toggleList()}},className:"notifications-toggle-container",parent:t});return s.show=()=>{s.isHidden=!1,s.style.display="block"},s.hide=()=>{s.isHidden=!0,s.style.display="none"},s.setUnread=o=>{s.unreadCount=o,o>0?s.show():r&&s.hide()},s.setManager=o=>{i=o},s.hide(),s}class cP{constructor(){this.notifications=new Map,this.toggle=null,this.container=null,this.clickOutsideCleanup=null}setToggle(e){this.toggle=e,this.toggle.setManager&&this.toggle.setManager(this),this.createContainer(),this.updateToggle()}createContainer(){this.container||(this.container=document.createElement("div"),this.container.className="notifications-list-container",this.container.style.display="none",document.body.appendChild(this.container))}showList(){this.container&&(this.container.style.display="flex",this.setupClickOutside())}hideList(){this.container&&(this.container.style.display="none",this.cleanupClickOutside())}setupClickOutside(){this.clickOutsideCleanup||(this.clickOutsideCleanup=ys(this.container,()=>this.hideList(),{ignore:this.toggle?[this.toggle]:[],esc:!0}))}cleanupClickOutside(){this.clickOutsideCleanup&&(this.clickOutsideCleanup(),this.clickOutsideCleanup=null)}toggleList(){this.container&&(this.container.style.display==="none"?this.showList():this.hideList())}isListVisible(){return this.container&&this.container.style.display!=="none"}add(e,n){this.notifications.has(e)&&this.remove(e),this.container||this.createContainer(),n.parentElement===document.body&&n.remove(),this.container.prepend(n),this.notifications.set(e,n),this.updateToggle(),n._originalDispose||(n._originalDispose=n.dispose);const r=n._originalDispose;n.dispose=()=>{r&&r.call(n),n.parentElement&&n.remove(),this.notifications.delete(e),this.updateToggle(),n.dispose=r,delete n._originalDispose}}remove(e){const n=this.notifications.get(e);n&&(n.dispose&&n.dispose(),this.notifications.delete(e),this.updateToggle())}getCount(){return this.notifications.size}has(e){return this.notifications.has(e)}clear(){this.notifications.forEach(e=>{e.dispose&&e.dispose()}),this.notifications.clear(),this.updateToggle()}updateToggle(){this.toggle&&this.toggle.setUnread(this.getCount())}}const lP=new cP;const uP=async()=>{const t=Zs(!1);if(t&&t instanceof MediaStream)return console.debug("Reusing existing local MediaStream."),t;const e=yl("user"),n=Jg();try{const r=await navigator.mediaDevices.getUserMedia({video:e,audio:n});return fs(r),r}catch(r){if(r.name==="OverconstrainedError"){console.warn(`❌ Constraint failed on property: ${r.constraint}, falling back to basic constraints`);const i=HA(),s=await navigator.mediaDevices.getUserMedia({video:!0,audio:i});return fs(s),s}throw r}};async function dP(t){const e=await uP(),n=new MediaStream(e.getVideoTracks());return t.srcObject=n,!0}function hP(t,e,n){return t.ontrack=r=>{if($(`REMOTE TRACK RECEIVED: ${r.track.kind}`),!r.streams||!r.streams[0]||!(r.streams[0]instanceof MediaStream))return console.error("No valid remote MediaStream found in event.streams:",r.streams),!1;const i=r.streams[0];if(Qs(!1)!==i){Mg(i),e.srcObject=i,ZA(e,n);try{const o=document.getElementById("remote-video-box")||e.parentElement;o&&(o.classList?.remove("hidden"),e.classList?.remove("hidden"),o.style.visibility="visible",o.style.opacity="1",o.style.position="",o.style.left="",o.style.top="",e.style.visibility="visible",e.style.opacity="1")}catch(o){console.warn("Visibility override failed:",o)}}},!0}let Gd=!1;function fP(t,e){const n=document.createElement("dialog");n.className="copy-link-dialog";const r=document.createElement("div");r.className="copy-link-dialog__content";const i=document.createElement("h2");i.className="copy-link-dialog__title",i.textContent=e.title,r.appendChild(i);const s=document.createElement("div");s.className="copy-link-dialog__input-container";const o=document.createElement("input");o.type="text",o.className="copy-link-dialog__input",o.value=t,o.readOnly=!0,o.setAttribute("aria-label","Link to copy"),s.appendChild(o),r.appendChild(s);const a=document.createElement("div");a.className="copy-link-dialog__buttons";const c=document.createElement("button");c.className="copy-link-dialog__button copy-link-dialog__button--primary",c.textContent=e.buttonText,c.autofocus=!0;const l=document.createElement("button");l.className="copy-link-dialog__button copy-link-dialog__button--secondary",l.textContent=e.cancelText,a.appendChild(c),a.appendChild(l),r.appendChild(a);const u=document.createElement("p");return u.className="copy-link-dialog__feedback",u.setAttribute("aria-live","polite"),r.appendChild(u),n.appendChild(r),{dialog:n,input:o,copyButton:c,cancelButton:l,feedback:u}}function pP(t,e={}){const n={title:"Share this link",buttonText:"Copy",cancelText:"Cancel",successMessage:"✓ Copied to clipboard!",errorMessage:"Failed to copy. Click the link to select it manually.",autoClose:!0,autoCloseDelay:1200,onCopy:null,onError:null,onCancel:null,onClose:null,...e};gP();const{dialog:r,input:i,copyButton:s,cancelButton:o,feedback:a}=fP(t,n);mP(r);let c=!1;const l=async()=>{await _P(t,i)?(c=!0,a.textContent=n.successMessage,a.classList.remove("copy-link-dialog__feedback--error"),n.onCopy&&n.onCopy(t),n.autoClose&&setTimeout(()=>{r.close()},n.autoCloseDelay)):(a.textContent=n.errorMessage,a.classList.add("copy-link-dialog__feedback--error"),i.readOnly=!1,i.addEventListener("click",()=>{i.select()}),n.onError&&n.onError())};return s.addEventListener("click",l),o.addEventListener("click",()=>{n.onCancel&&n.onCancel(),r.close()}),r.addEventListener("keydown",u=>{u.key==="Enter"&&!u.shiftKey&&!u.ctrlKey&&!u.altKey&&!u.metaKey&&(u.preventDefault(),l())}),r.addEventListener("close",()=>{!c&&n.onCancel&&n.onCancel(),n.onClose&&n.onClose(),setTimeout(()=>{r.remove()},300)}),document.body.appendChild(r),r.showModal(),r}function gP(){if(Gd)return;const t=document.createElement("style");t.textContent=`
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
  `,document.head.appendChild(t),Gd=!0}function mP(t){t.showModal||(t.showModal=function(){this.setAttribute("open",""),this.style.display="block",this.style.position="fixed",this.style.top="50%",this.style.left="50%",this.style.transform="translate(-50%, -50%)";const e=getComputedStyle(document.documentElement).getPropertyValue("--z-ui-overlay").trim();this.style.zIndex=e||"1000"},t.close=function(){this.removeAttribute("open"),this.style.display="none"})}async function _P(t,e=null){if(navigator.clipboard&&navigator.clipboard.writeText)try{return await navigator.clipboard.writeText(t),!0}catch(n){return console.warn("Clipboard API failed, using fallback:",n),!1}if(!e)return!1;try{return e.select(),e.setSelectionRange(0,99999),document.execCommand("copy")}catch(n){return console.error("Fallback copy failed:",n),!1}}function yP(){const t=window.matchMedia&&window.matchMedia("(display-mode: standalone)").matches||navigator.standalone===!0,e=/iphone|ipad|ipod/i.test(navigator.userAgent||"");if(!t||!e||!window.location.hostname.includes("github.io"))return;const r="https://vidu-aae11.web.app",i=r.replace(/\/$/,"");let s;try{s=new URL(i).hostname}catch(l){console.error("[PWA Redirect] Invalid VITE_APP_HOSTING_URL:",r,l);return}if(window.location.hostname===s)return;const o="/HangVidU/";let a=window.location.pathname;a.startsWith(o)?a="/"+a.slice(o.length):a==="/HangVidU"&&(a="/");let c;try{c=new URL(a+window.location.search+window.location.hash,i).toString()}catch(l){console.error("[PWA Redirect] Failed to construct target URL:",l);return}console.log("[PWA Redirect] iOS standalone PWA on gh-pages → redirecting to Firebase Hosting:",c),window.location.replace(c)}AR(!0);y().disable();let El=[];async function EP(){wP();const t=Cg(),n=["localVideoEl","remoteVideoEl","localBoxEl","remoteBoxEl","chatControls","lobbyDiv","titleAuthBar"].filter(r=>!t[r]);if(n.length>0)return console.error("Critical elements missing:",n),!1;try{{const{setupPWA:s}=await Ze(async()=>{const{setupPWA:o}=await import("./PWA-Dd0cX0h6.js");return{setupPWA:o}},[]);await s()}iP(),CP(),await _g;const r=eA(Ks);r&&El.push(r.dispose),await Lr();const i=document.querySelector(".top-right-menu");if(i){const s=aP({parent:i,hideWhenAllRead:!0});lP.setToggle(s)}return!0}catch(r){return console.error("Failed to get user media:",r),!1}}let La=!1;function vP(){La=!1}async function Lr(){La||(La=!0,await dP(Ee),eP({getLocalStream:Zs,getLocalVideo:()=>Ee,getRemoteVideo:()=>K,getPeerConnection:()=>ne.getState().pc,setLocalStream:fs,micBtn:cr,cameraBtn:lr,switchCameraBtn:ar,mutePartnerBtn:Ve,fullscreenPartnerBtn:Js}),Ee&&(Ee.addEventListener("enterpictureinpicture",()=>te&&v(te)),Ee.addEventListener("leavepictureinpicture",()=>{te&&!(fi()&&ps())&&A(te)})))}function wP(){v(H),v(te),v(be),v(Re)}function $i(t=null){return{localStream:Zs(),localVideoEl:Ee,remoteVideoEl:K,mutePartnerBtn:Ve,setupRemoteStream:hP,setupWatchSync:cA,targetRoomId:t}}function Bi(t,e=!1){return t.success?(e&&t.roomLink&&pP(t.roomLink,{onCopy:()=>$("Link ready! Share with your partner."),onCancel:()=>$("Link ready! Use the copy button to use it, or create a new one.")}),!0):!1}async function eo(t,{forceInitiator:e=!1}={}){try{await Lr()}catch(s){return console.error("Failed to initialize local media stream:",s),!1}const n=Date.now();if(e){y().logRoomCreation(t,!0,{creationTime:n,listenerAttachTime:n,timeDiff:0},{trigger:"force_initiator",reason:"calling_saved_contact"}),await Lr();const s=await ne.createCall($i(t));return Bi(s,!1)}let r=await G.checkRoomStatus(t);if(r.exists&&!r.hasMembers){let o=0;for(;o<3&&!r.hasMembers;)await new Promise(a=>setTimeout(a,250*(o+1))),r=await G.checkRoomStatus(t),o++}if(!r.exists||!r.hasMembers){y().logRoomCreation(t,!0,{creationTime:n,listenerAttachTime:n,timeDiff:0},{trigger:"room_empty_or_nonexistent",roomExists:r.exists,memberCount:r.memberCount||0}),await Lr();const s=await ne.createCall($i(t));return Bi(s,!0)}y().log("ROOM","JOINING_EXISTING",{roomId:t,memberCount:r.memberCount,roomExists:r.exists});const i=await ne.answerCall({roomId:t,...$i()});return Bi(i,!1)}const ve=new Set,Xg=new Map;function zd(t){t&&(js(t),ve.delete(t),Xg.delete(t),y().log("LISTENER","INCOMING_CLEANUP",{roomId:t,remainingListeners:ve.size}))}function bP(){$(`[LISTENER] Removing all incoming listeners (${ve.size} rooms)`);const t=Array.from(ve);t.forEach(e=>{js(e)}),ve.clear(),Xg.clear(),y().log("LISTENER","ALL_INCOMING_CLEANUP",{roomsCleared:t.length})}async function SP(t){const e=Date.now(),n=e+1440*60*1e3,r=Xe();if(r){const i=Bc(r,t);await ft(i,{roomId:t,savedAt:e,expiresAt:n});return}try{const i=localStorage.getItem("recentCalls")||"{}",s=JSON.parse(i);s[t]={roomId:t,savedAt:e,expiresAt:n},localStorage.setItem("recentCalls",JSON.stringify(s))}catch(i){console.warn("Failed to save recent call to localStorage",i)}}async function Lo(t){const e=Xe();if(e){try{await jn(Bc(e,t))}catch(n){console.warn("Failed to remove recent call from RTDB",n)}return}try{const n=localStorage.getItem("recentCalls")||"{}",r=JSON.parse(n);r[t]&&(delete r[t],localStorage.setItem("recentCalls",JSON.stringify(r)))}catch(n){console.warn("Failed to remove recent call from localStorage",n)}}function zn(t){t&&(ve.has(t)&&(ve.delete(t),js(t)),$(`[LISTENER] Attaching listener for room: ${t} (total: ${ve.size+1})`),ve.add(t),y().logListenerAttachment(t,"member_join",ve.size,{action:"incoming_call_listener_attached"}),G.onMemberJoined(t,async e=>{const n=e.key,r=e.val?e.val():null,i=ue();if(n&&n!==i){y().logMemberJoinEvent(t,n,r||{},{detectedBy:"incoming_call_listener",currentUserId:i});const s=r&&typeof r.joinedAt=="number"?r.joinedAt:null,o=2e4;let a=!1,c="none",l=0;if(s&&(l=Date.now()-s,a=l<o,c="joinedAt"),!a){const N=await $g(n,t),de=await Bg(t);a=N||de,c=N?"outgoingState":de?"roomCreatedAt":"failed"}const u={isFresh:a,method:c,age:l,reason:a?"call_is_fresh":"call_is_stale"};if(y().logIncomingCallEvent(n,t,u,{memberData:r,joinedAt:s,CALL_FRESH_MS:o}),!a){y().logNotificationDecision("REJECT","stale_call",t,{age:l,validationMethod:c,joiningUserId:n});return}let d;try{d=await G.getRoomData(t)}catch{return}if(!d||typeof d!="object")return;const h=!!d.offer,f=!!d.answer,p=d.createdBy;if(!h||f||p===i)return;const E=ne.getState();if(!!E.pc&&E.pc.connectionState==="connected"){y().logNotificationDecision("REJECT","already_in_call",t,{joiningUserId:n,currentCallState:E.pc?.connectionState});return}y().logNotificationDecision("SHOW","fresh_call_detected",t,{joiningUserId:n,freshnessResult:u}),Pn.playIncoming();const T=await fl(`Incoming call from ${n} for room ${t}.

Accept?`);if(Pn.stop(),T)zd(t),y().logNotificationDecision("ACCEPT","user_accepted",t,{joiningUserId:n}),eo(t).catch(N=>{console.warn("Failed to answer incoming call:",N),y().logFirebaseOperation("join_room_on_accept",!1,N,{roomId:t,joiningUserId:n})});else{y().logNotificationDecision("REJECT","user_rejected",t,{joiningUserId:n});try{await G.rejectCall(t,ue(),"user_rejected")}catch(N){console.warn("Failed to signal rejection via RTDB:",N)}await Lo(t).catch(N=>{console.warn("Failed to remove recent call on rejection:",N)})}}}),G.onCallCancelled(t,async e=>{if(e&&typeof e.val=="function"&&e.val()){try{const{dismissActiveConfirmDialog:r}=await Ze(async()=>{const{dismissActiveConfirmDialog:i}=await Promise.resolve().then(()=>AA);return{dismissActiveConfirmDialog:i}},void 0);typeof r=="function"&&r()}catch{}await Lo(t).catch(()=>{})}}),G.onMemberLeft(t,async e=>{const n=e.key,r=ue();if(!(!n||n===r))try{(await G.checkRoomStatus(t)).hasMembers||(await Lo(t),zd(t),$(`Removed saved recent call and listeners for room ${t} because it is now empty`))}catch(i){console.warn("Failed to evaluate room status on member leave",i)}}))}async function qd(){const t=Date.now();y().log("LISTENER","STARTUP_BEGIN",{timestamp:t,currentListenerCount:ve.size});try{if(typeof window<"u"){const{getCurrentUserAsync:n}=await Ze(async()=>{const{getCurrentUserAsync:r}=await Promise.resolve().then(()=>HR);return{getCurrentUserAsync:r}},void 0);await n()}}catch{}const e=Xe();if(y().log("LISTENER","AUTH_STATE_DETERMINED",{isLoggedIn:!!e,userId:e||"guest"}),e){const n=PI(e);try{const r=await tn(n),i=r.exists()?r.val():null,s=new Set;if(i)for(const[o,a]of Object.entries(i)){if(!a||a.expiresAt&&a.expiresAt<Date.now()){await jn(Bc(e,o)).catch(()=>{});continue}s.add(o)}try{const o=await _s();Object.values(o||{}).forEach(a=>{a?.roomId&&s.add(a.roomId)})}catch{}s.forEach(o=>zn(o)),y().log("LISTENER","STARTUP_COMPLETE",{storage:"rtdb",roomsToListen:Array.from(s),totalListeners:ve.size,duration:Date.now()-t})}catch(r){console.warn("Failed to read recent calls from RTDB",r),y().logFirebaseOperation("read_recent_calls",!1,r,{storage:"rtdb",userId:e})}return}try{const n=localStorage.getItem("recentCalls")||"{}",r=JSON.parse(n),i={},s=new Set;for(const[o,a]of Object.entries(r||{}))!a||a.expiresAt&&a.expiresAt<Date.now()||(i[o]=a,s.add(o));try{const o=await _s();Object.values(o||{}).forEach(a=>{a?.roomId&&s.add(a.roomId)})}catch{}s.forEach(o=>zn(o)),localStorage.setItem("recentCalls",JSON.stringify(i)),y().log("LISTENER","STARTUP_COMPLETE",{storage:"localStorage",roomsToListen:Array.from(s),totalListeners:ve.size,duration:Date.now()-t,expiredRoomsRemoved:Object.keys(r||{}).length-s.size})}catch(n){console.warn("Failed to read recent calls from localStorage",n),y().logFirebaseOperation("read_recent_calls",!1,n,{storage:"localStorage"})}}function Oo(){return V&&be&&!be.classList.contains("hidden")&&V.src&&V.src.trim()!==""}let Yd=!1;function CP(){if(Yd)return;const t=()=>{const e=document.activeElement;return e&&(e.tagName==="INPUT"||e.tagName==="TEXTAREA"||e.isContentEditable)};document.addEventListener("keydown",e=>{if(!t()&&((e.key==="w"||e.key==="W")&&(console.log("=== W KEY PRESSED ==="),console.log("lastWatched:",mr()),console.log("isYTVisible():",ko()),console.log("isSharedVideoVisible():",Oo()),console.log("isWatchModeActive():",fi()),mr()==="yt"?ko()?(Sa(),Fi()):(Rg(),Ia()):mr()==="url"&&(Oo()?(v(be),Fi()):(A(be),Ia()))),e.key==="m"||e.key==="M")){const n=ne.getState();n.messagesUI&&n.messagesUI.toggleMessages()}e.key==="Escape"&&(mr()==="yt"&&ko()?(Xs(),Sa()):mr()==="url"&&Oo()&&(V.pause(),v(be)),Fi())}),Yd=!0}const Qg=async()=>{await Lr();const t=await ne.createCall($i());Bi(t,!0)};Ne.onclick=Qg;Wt.onclick=Qg;We.onclick=async()=>{console.debug("Hanging up..."),await ne.hangUp({emitCancel:!0,reason:"user_hung_up"})};async function TP(){const e=new URLSearchParams(window.location.search).get("room");if(!e)return!1;const n=await eo(e);return n||(Ys(),Ug()),n}yP();window.onload=async()=>{if(!await EP()){Ne.disabled=!0,console.error("Initialization failed. Cannot start chat.");return}await qd().catch(i=>console.warn("Failed to start saved-room listeners",i)),Yr(Ye).catch(i=>{console.warn("Failed to render contacts list:",i)});let e=null;const n=Zc(async({isLoggedIn:i,user:s})=>{try{const o=e===null,a=e===!0&&!i,c=e===!1&&i;e=i,await Yr(Ye),a?($("[AUTH] User logged out - cleaning up incoming listeners"),bP()):c?($("[AUTH] User logged in - re-attaching incoming listeners"),await qd().catch(l=>console.warn("Failed to re-attach saved-room listeners on login",l))):o&&i&&$("[AUTH] Initial load with logged-in user")}catch(o){console.warn("Failed to handle auth change:",o)}});El.push(()=>{try{typeof n=="function"&&n()}catch{}}),await TP()};window.addEventListener("beforeunload",async t=>{const e=ne.getState();if(e.pc&&e.pc.connectionState==="connected")return t.preventDefault(),t.returnValue="You are in an active call. Are you sure you want to leave?",t.returnValue;await IP()});ne.on("memberJoined",({memberId:t,roomId:e})=>{console.debug("CallController memberJoined event",{memberId:t,roomId:e}),ne.setPartnerId(t),dl(),hl().catch(n=>console.warn("Failed to clear calling state:",n)),SP(e).catch(n=>console.warn("Failed to save recent call:",n))});ne.on("memberLeft",({memberId:t})=>{console.info("Partner has left the call")});ne.on("cleanup",({roomId:t,partnerId:e,reason:n})=>{Ot(),xg(),Ug(),Ys();const r=ne.getState();r.messagesUI&&typeof r.messagesUI.cleanup=="function"&&(r.messagesUI.cleanup(),r.messagesUI=null),e&&t&&setTimeout(()=>{PA(e,t,Ye).catch(i=>{console.warn("Failed to save contact after cleanup:",i)})},500)});async function IP(){await ne.hangUp({emitCancel:!0,reason:"page_unload"}),tP(),kI(),document.pictureInPictureElement&&document.exitPictureInPicture().catch(e=>console.error(e));const t=ne.getState();t.messagesUI&&t.messagesUI.cleanup&&t.messagesUI.cleanup(),window.history.replaceState({},document.title,window.location.pathname),V.src="",Fg(),Ee&&Ee.srcObject&&(Ee.srcObject=null),K&&K.srcObject&&(K.srcObject=null),Fi(),Ys(),aA("none"),al(),kg(!1),sP(),El.forEach(e=>e())}const kP=Object.freeze(Object.defineProperty({__proto__:null,joinOrCreateRoomWithId:eo,listenForIncomingOnRoom:zn,resetLocalStreamInitFlag:vP},Symbol.toStringTag,{value:"Module"}));export{Ze as _,wg as c,$ as d,v as h,RP as i,lP as n,A as s};
