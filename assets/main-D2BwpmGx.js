(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))i(r);new MutationObserver(r=>{for(const s of r)if(s.type==="childList")for(const o of s.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&i(o)}).observe(document,{childList:!0,subtree:!0});function n(r){const s={};return r.integrity&&(s.integrity=r.integrity),r.referrerPolicy&&(s.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?s.credentials="include":r.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function i(r){if(r.ep)return;r.ep=!0;const s=n(r);fetch(r.href,s)}})();const em="modulepreload",tm=function(t){return"/HangVidU/"+t},wl={},Ze=function(e,n,i){let r=Promise.resolve();if(n&&n.length>0){let c=function(l){return Promise.all(l.map(u=>Promise.resolve(u).then(d=>({status:"fulfilled",value:d}),d=>({status:"rejected",reason:d}))))};document.getElementsByTagName("link");const o=document.querySelector("meta[property=csp-nonce]"),a=o?.nonce||o?.getAttribute("nonce");r=c(n.map(l=>{if(l=tm(l),l in wl)return;wl[l]=!0;const u=l.endsWith(".css"),d=u?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${l}"]${d}`))return;const h=document.createElement("link");if(h.rel=u?"stylesheet":em,u||(h.as="script"),h.crossOrigin="",h.href=l,a&&h.setAttribute("nonce",a),document.head.appendChild(h),u)return new Promise((f,p)=>{h.addEventListener("load",f),h.addEventListener("error",()=>p(new Error(`Unable to preload CSS for ${l}`)))})}))}function s(o){const a=new Event("vite:preloadError",{cancelable:!0});if(a.payload=o,window.dispatchEvent(a),!a.defaultPrevented)throw o}return r.then(o=>{for(const a of o||[])a.status==="rejected"&&s(a.reason);return e().catch(s)})},C=typeof __SENTRY_DEBUG__>"u"||__SENTRY_DEBUG__,D=globalThis,en="10.26.0";function vs(){return ws(D),D}function ws(t){const e=t.__SENTRY__=t.__SENTRY__||{};return e.version=e.version||en,e[en]=e[en]||{}}function qn(t,e,n=D){const i=n.__SENTRY__=n.__SENTRY__||{},r=i[en]=i[en]||{};return r[t]||(r[t]=e())}const nm=["debug","info","warn","error","log","assert","trace"],im="Sentry Logger ",Hr={};function Yn(t){if(!("console"in D))return t();const e=D.console,n={},i=Object.keys(Hr);i.forEach(r=>{const s=Hr[r];n[r]=e[r],e[r]=s});try{return t()}finally{i.forEach(r=>{e[r]=n[r]})}}function rm(){Da().enabled=!0}function sm(){Da().enabled=!1}function Jd(){return Da().enabled}function om(...t){Oa("log",...t)}function am(...t){Oa("warn",...t)}function cm(...t){Oa("error",...t)}function Oa(t,...e){C&&Jd()&&Yn(()=>{D.console[t](`${im}[${t}]:`,...e)})}function Da(){return C?qn("loggerSettings",()=>({enabled:!1})):{enabled:!1}}const b={enable:rm,disable:sm,isEnabled:Jd,log:om,warn:am,error:cm},Xd=50,rn="?",bl=/\(error: (.*)\)/,Sl=/captureMessage|captureException/;function Qd(...t){const e=t.sort((n,i)=>n[0]-i[0]).map(n=>n[1]);return(n,i=0,r=0)=>{const s=[],o=n.split(`
`);for(let a=i;a<o.length;a++){let c=o[a];c.length>1024&&(c=c.slice(0,1024));const l=bl.test(c)?c.replace(bl,"$1"):c;if(!l.match(/\S*Error: /)){for(const u of e){const d=u(l);if(d){s.push(d);break}}if(s.length>=Xd+r)break}}return um(s.slice(r))}}function lm(t){return Array.isArray(t)?Qd(...t):t}function um(t){if(!t.length)return[];const e=Array.from(t);return/sentryWrapped/.test(pr(e).function||"")&&e.pop(),e.reverse(),Sl.test(pr(e).function||"")&&(e.pop(),Sl.test(pr(e).function||"")&&e.pop()),e.slice(0,Xd).map(n=>({...n,filename:n.filename||pr(e).filename,function:n.function||rn}))}function pr(t){return t[t.length-1]||{}}const to="<anonymous>";function Dt(t){try{return!t||typeof t!="function"?to:t.name||to}catch{return to}}function Cl(t){const e=t.exception;if(e){const n=[];try{return e.values.forEach(i=>{i.stacktrace.frames&&n.push(...i.stacktrace.frames)}),n}catch{return}}}function Zd(t){return"__v_isVNode"in t&&t.__v_isVNode?"[VueVNode]":"[VueViewModel]"}const Ir={},Tl={};function hn(t,e){Ir[t]=Ir[t]||[],Ir[t].push(e)}function fn(t,e){if(!Tl[t]){Tl[t]=!0;try{e()}catch(n){C&&b.error(`Error while instrumenting ${t}`,n)}}}function Ue(t,e){const n=t&&Ir[t];if(n)for(const i of n)try{i(e)}catch(r){C&&b.error(`Error while triggering instrumentation handler.
Type: ${t}
Name: ${Dt(i)}
Error:`,r)}}let no=null;function dm(t){const e="error";hn(e,t),fn(e,hm)}function hm(){no=D.onerror,D.onerror=function(t,e,n,i,r){return Ue("error",{column:i,error:r,line:n,msg:t,url:e}),no?no.apply(this,arguments):!1},D.onerror.__SENTRY_INSTRUMENTED__=!0}let io=null;function fm(t){const e="unhandledrejection";hn(e,t),fn(e,pm)}function pm(){io=D.onunhandledrejection,D.onunhandledrejection=function(t){return Ue("unhandledrejection",t),io?io.apply(this,arguments):!0},D.onunhandledrejection.__SENTRY_INSTRUMENTED__=!0}const eh=Object.prototype.toString;function Ma(t){switch(eh.call(t)){case"[object Error]":case"[object Exception]":case"[object DOMException]":case"[object WebAssembly.Exception]":return!0;default:return Mt(t,Error)}}function Kn(t,e){return eh.call(t)===`[object ${e}]`}function th(t){return Kn(t,"ErrorEvent")}function Il(t){return Kn(t,"DOMError")}function gm(t){return Kn(t,"DOMException")}function rt(t){return Kn(t,"String")}function xa(t){return typeof t=="object"&&t!==null&&"__sentry_template_string__"in t&&"__sentry_template_values__"in t}function bs(t){return t===null||xa(t)||typeof t!="object"&&typeof t!="function"}function Oi(t){return Kn(t,"Object")}function Ss(t){return typeof Event<"u"&&Mt(t,Event)}function mm(t){return typeof Element<"u"&&Mt(t,Element)}function _m(t){return Kn(t,"RegExp")}function Ji(t){return!!(t?.then&&typeof t.then=="function")}function ym(t){return Oi(t)&&"nativeEvent"in t&&"preventDefault"in t&&"stopPropagation"in t}function Mt(t,e){try{return t instanceof e}catch{return!1}}function nh(t){return!!(typeof t=="object"&&t!==null&&(t.__isVue||t._isVue||t.__v_isVNode))}function Em(t){return typeof Request<"u"&&Mt(t,Request)}const Fa=D,vm=80;function ih(t,e={}){if(!t)return"<unknown>";try{let n=t;const i=5,r=[];let s=0,o=0;const a=" > ",c=a.length;let l;const u=Array.isArray(e)?e:e.keyAttrs,d=!Array.isArray(e)&&e.maxStringLength||vm;for(;n&&s++<i&&(l=wm(n,u),!(l==="html"||s>1&&o+r.length*c+l.length>=d));)r.push(l),o+=l.length,n=n.parentNode;return r.reverse().join(a)}catch{return"<unknown>"}}function wm(t,e){const n=t,i=[];if(!n?.tagName)return"";if(Fa.HTMLElement&&n instanceof HTMLElement&&n.dataset){if(n.dataset.sentryComponent)return n.dataset.sentryComponent;if(n.dataset.sentryElement)return n.dataset.sentryElement}i.push(n.tagName.toLowerCase());const r=e?.length?e.filter(o=>n.getAttribute(o)).map(o=>[o,n.getAttribute(o)]):null;if(r?.length)r.forEach(o=>{i.push(`[${o[0]}="${o[1]}"]`)});else{n.id&&i.push(`#${n.id}`);const o=n.className;if(o&&rt(o)){const a=o.split(/\s+/);for(const c of a)i.push(`.${c}`)}}const s=["aria-label","type","name","title","alt"];for(const o of s){const a=n.getAttribute(o);a&&i.push(`[${o}="${a}"]`)}return i.join("")}function Ua(){try{return Fa.document.location.href}catch{return""}}function bm(t){if(!Fa.HTMLElement)return null;let e=t;const n=5;for(let i=0;i<n;i++){if(!e)return null;if(e instanceof HTMLElement){if(e.dataset.sentryComponent)return e.dataset.sentryComponent;if(e.dataset.sentryElement)return e.dataset.sentryElement}e=e.parentNode}return null}function we(t,e,n){if(!(e in t))return;const i=t[e];if(typeof i!="function")return;const r=n(i);typeof r=="function"&&rh(r,i);try{t[e]=r}catch{C&&b.log(`Failed to replace method "${e}" in object`,t)}}function sn(t,e,n){try{Object.defineProperty(t,e,{value:n,writable:!0,configurable:!0})}catch{C&&b.log(`Failed to add non-enumerable property "${e}" to object`,t)}}function rh(t,e){try{const n=e.prototype||{};t.prototype=e.prototype=n,sn(t,"__sentry_original__",e)}catch{}}function $a(t){return t.__sentry_original__}function sh(t){if(Ma(t))return{message:t.message,name:t.name,stack:t.stack,...Rl(t)};if(Ss(t)){const e={type:t.type,target:kl(t.target),currentTarget:kl(t.currentTarget),...Rl(t)};return typeof CustomEvent<"u"&&Mt(t,CustomEvent)&&(e.detail=t.detail),e}else return t}function kl(t){try{return mm(t)?ih(t):Object.prototype.toString.call(t)}catch{return"<unknown>"}}function Rl(t){if(typeof t=="object"&&t!==null){const e={};for(const n in t)Object.prototype.hasOwnProperty.call(t,n)&&(e[n]=t[n]);return e}else return{}}function Sm(t){const e=Object.keys(sh(t));return e.sort(),e[0]?e.join(", "):"[object has no keys]"}function oh(t,e=0){return typeof t!="string"||e===0||t.length<=e?t:`${t.slice(0,e)}...`}function Al(t,e){if(!Array.isArray(t))return"";const n=[];for(let i=0;i<t.length;i++){const r=t[i];try{nh(r)?n.push(Zd(r)):n.push(String(r))}catch{n.push("[value cannot be serialized]")}}return n.join(e)}function kr(t,e,n=!1){return rt(t)?_m(e)?e.test(t):rt(e)?n?t===e:t.includes(e):!1:!1}function Cs(t,e=[],n=!1){return e.some(i=>kr(t,i,n))}function Cm(){const t=D;return t.crypto||t.msCrypto}let ro;function Tm(){return Math.random()*16}function ke(t=Cm()){try{if(t?.randomUUID)return t.randomUUID().replace(/-/g,"")}catch{}return ro||(ro="10000000100040008000"+1e11),ro.replace(/[018]/g,e=>(e^(Tm()&15)>>e/4).toString(16))}function ah(t){return t.exception?.values?.[0]}function Jt(t){const{message:e,event_id:n}=t;if(e)return e;const i=ah(t);return i?i.type&&i.value?`${i.type}: ${i.value}`:i.type||i.value||n||"<unknown>":n||"<unknown>"}function Do(t,e,n){const i=t.exception=t.exception||{},r=i.values=i.values||[],s=r[0]=r[0]||{};s.value||(s.value=e||""),s.type||(s.type="Error")}function Ln(t,e){const n=ah(t);if(!n)return;const i={type:"generic",handled:!0},r=n.mechanism;if(n.mechanism={...i,...r,...e},e&&"data"in e){const s={...r?.data,...e.data};n.mechanism.data=s}}function Pl(t){if(Im(t))return!0;try{sn(t,"__sentry_captured__",!0)}catch{}return!1}function Im(t){try{return t.__sentry_captured__}catch{}}const ch=1e3;function Xi(){return Date.now()/ch}function km(){const{performance:t}=D;if(!t?.now||!t.timeOrigin)return Xi;const e=t.timeOrigin;return()=>(e+t.now())/ch}let Nl;function st(){return(Nl??(Nl=km()))()}function Rm(t){const e=st(),n={sid:ke(),init:!0,timestamp:e,started:e,duration:0,status:"ok",errors:0,ignoreDuration:!1,toJSON:()=>Pm(n)};return t&&On(n,t),n}function On(t,e={}){if(e.user&&(!t.ipAddress&&e.user.ip_address&&(t.ipAddress=e.user.ip_address),!t.did&&!e.did&&(t.did=e.user.id||e.user.email||e.user.username)),t.timestamp=e.timestamp||st(),e.abnormal_mechanism&&(t.abnormal_mechanism=e.abnormal_mechanism),e.ignoreDuration&&(t.ignoreDuration=e.ignoreDuration),e.sid&&(t.sid=e.sid.length===32?e.sid:ke()),e.init!==void 0&&(t.init=e.init),!t.did&&e.did&&(t.did=`${e.did}`),typeof e.started=="number"&&(t.started=e.started),t.ignoreDuration)t.duration=void 0;else if(typeof e.duration=="number")t.duration=e.duration;else{const n=t.timestamp-t.started;t.duration=n>=0?n:0}e.release&&(t.release=e.release),e.environment&&(t.environment=e.environment),!t.ipAddress&&e.ipAddress&&(t.ipAddress=e.ipAddress),!t.userAgent&&e.userAgent&&(t.userAgent=e.userAgent),typeof e.errors=="number"&&(t.errors=e.errors),e.status&&(t.status=e.status)}function Am(t,e){let n={};t.status==="ok"&&(n={status:"exited"}),On(t,n)}function Pm(t){return{sid:`${t.sid}`,init:t.init,started:new Date(t.started*1e3).toISOString(),timestamp:new Date(t.timestamp*1e3).toISOString(),status:t.status,errors:t.errors,did:typeof t.did=="number"||typeof t.did=="string"?`${t.did}`:void 0,duration:t.duration,abnormal_mechanism:t.abnormal_mechanism,attrs:{release:t.release,environment:t.environment,ip_address:t.ipAddress,user_agent:t.userAgent}}}function Qi(t,e,n=2){if(!e||typeof e!="object"||n<=0)return e;if(t&&Object.keys(e).length===0)return t;const i={...t};for(const r in e)Object.prototype.hasOwnProperty.call(e,r)&&(i[r]=Qi(i[r],e[r],n-1));return i}function Ll(){return ke()}function lh(){return ke().substring(16)}const Mo="_sentrySpan";function Ol(t,e){e?sn(t,Mo,e):delete t[Mo]}function Dl(t){return t[Mo]}const Nm=100;class ct{constructor(){this._notifyingListeners=!1,this._scopeListeners=[],this._eventProcessors=[],this._breadcrumbs=[],this._attachments=[],this._user={},this._tags={},this._extra={},this._contexts={},this._sdkProcessingMetadata={},this._propagationContext={traceId:Ll(),sampleRand:Math.random()}}clone(){const e=new ct;return e._breadcrumbs=[...this._breadcrumbs],e._tags={...this._tags},e._extra={...this._extra},e._contexts={...this._contexts},this._contexts.flags&&(e._contexts.flags={values:[...this._contexts.flags.values]}),e._user=this._user,e._level=this._level,e._session=this._session,e._transactionName=this._transactionName,e._fingerprint=this._fingerprint,e._eventProcessors=[...this._eventProcessors],e._attachments=[...this._attachments],e._sdkProcessingMetadata={...this._sdkProcessingMetadata},e._propagationContext={...this._propagationContext},e._client=this._client,e._lastEventId=this._lastEventId,Ol(e,Dl(this)),e}setClient(e){this._client=e}setLastEventId(e){this._lastEventId=e}getClient(){return this._client}lastEventId(){return this._lastEventId}addScopeListener(e){this._scopeListeners.push(e)}addEventProcessor(e){return this._eventProcessors.push(e),this}setUser(e){return this._user=e||{email:void 0,id:void 0,ip_address:void 0,username:void 0},this._session&&On(this._session,{user:e}),this._notifyScopeListeners(),this}getUser(){return this._user}setTags(e){return this._tags={...this._tags,...e},this._notifyScopeListeners(),this}setTag(e,n){return this.setTags({[e]:n})}setExtras(e){return this._extra={...this._extra,...e},this._notifyScopeListeners(),this}setExtra(e,n){return this._extra={...this._extra,[e]:n},this._notifyScopeListeners(),this}setFingerprint(e){return this._fingerprint=e,this._notifyScopeListeners(),this}setLevel(e){return this._level=e,this._notifyScopeListeners(),this}setTransactionName(e){return this._transactionName=e,this._notifyScopeListeners(),this}setContext(e,n){return n===null?delete this._contexts[e]:this._contexts[e]=n,this._notifyScopeListeners(),this}setSession(e){return e?this._session=e:delete this._session,this._notifyScopeListeners(),this}getSession(){return this._session}update(e){if(!e)return this;const n=typeof e=="function"?e(this):e,i=n instanceof ct?n.getScopeData():Oi(n)?e:void 0,{tags:r,extra:s,user:o,contexts:a,level:c,fingerprint:l=[],propagationContext:u}=i||{};return this._tags={...this._tags,...r},this._extra={...this._extra,...s},this._contexts={...this._contexts,...a},o&&Object.keys(o).length&&(this._user=o),c&&(this._level=c),l.length&&(this._fingerprint=l),u&&(this._propagationContext=u),this}clear(){return this._breadcrumbs=[],this._tags={},this._extra={},this._user={},this._contexts={},this._level=void 0,this._transactionName=void 0,this._fingerprint=void 0,this._session=void 0,Ol(this,void 0),this._attachments=[],this.setPropagationContext({traceId:Ll(),sampleRand:Math.random()}),this._notifyScopeListeners(),this}addBreadcrumb(e,n){const i=typeof n=="number"?n:Nm;if(i<=0)return this;const r={timestamp:Xi(),...e,message:e.message?oh(e.message,2048):e.message};return this._breadcrumbs.push(r),this._breadcrumbs.length>i&&(this._breadcrumbs=this._breadcrumbs.slice(-i),this._client?.recordDroppedEvent("buffer_overflow","log_item")),this._notifyScopeListeners(),this}getLastBreadcrumb(){return this._breadcrumbs[this._breadcrumbs.length-1]}clearBreadcrumbs(){return this._breadcrumbs=[],this._notifyScopeListeners(),this}addAttachment(e){return this._attachments.push(e),this}clearAttachments(){return this._attachments=[],this}getScopeData(){return{breadcrumbs:this._breadcrumbs,attachments:this._attachments,contexts:this._contexts,tags:this._tags,extra:this._extra,user:this._user,level:this._level,fingerprint:this._fingerprint||[],eventProcessors:this._eventProcessors,propagationContext:this._propagationContext,sdkProcessingMetadata:this._sdkProcessingMetadata,transactionName:this._transactionName,span:Dl(this)}}setSDKProcessingMetadata(e){return this._sdkProcessingMetadata=Qi(this._sdkProcessingMetadata,e,2),this}setPropagationContext(e){return this._propagationContext=e,this}getPropagationContext(){return this._propagationContext}captureException(e,n){const i=n?.event_id||ke();if(!this._client)return C&&b.warn("No client configured on scope - will not capture exception!"),i;const r=new Error("Sentry syntheticException");return this._client.captureException(e,{originalException:e,syntheticException:r,...n,event_id:i},this),i}captureMessage(e,n,i){const r=i?.event_id||ke();if(!this._client)return C&&b.warn("No client configured on scope - will not capture message!"),r;const s=i?.syntheticException??new Error(e);return this._client.captureMessage(e,n,{originalException:e,syntheticException:s,...i,event_id:r},this),r}captureEvent(e,n){const i=n?.event_id||ke();return this._client?(this._client.captureEvent(e,{...n,event_id:i},this),i):(C&&b.warn("No client configured on scope - will not capture event!"),i)}_notifyScopeListeners(){this._notifyingListeners||(this._notifyingListeners=!0,this._scopeListeners.forEach(e=>{e(this)}),this._notifyingListeners=!1)}}function Lm(){return qn("defaultCurrentScope",()=>new ct)}function Om(){return qn("defaultIsolationScope",()=>new ct)}class Dm{constructor(e,n){let i;e?i=e:i=new ct;let r;n?r=n:r=new ct,this._stack=[{scope:i}],this._isolationScope=r}withScope(e){const n=this._pushScope();let i;try{i=e(n)}catch(r){throw this._popScope(),r}return Ji(i)?i.then(r=>(this._popScope(),r),r=>{throw this._popScope(),r}):(this._popScope(),i)}getClient(){return this.getStackTop().client}getScope(){return this.getStackTop().scope}getIsolationScope(){return this._isolationScope}getStackTop(){return this._stack[this._stack.length-1]}_pushScope(){const e=this.getScope().clone();return this._stack.push({client:this.getClient(),scope:e}),e}_popScope(){return this._stack.length<=1?!1:!!this._stack.pop()}}function Dn(){const t=vs(),e=ws(t);return e.stack=e.stack||new Dm(Lm(),Om())}function Mm(t){return Dn().withScope(t)}function xm(t,e){const n=Dn();return n.withScope(()=>(n.getStackTop().scope=t,e(t)))}function Ml(t){return Dn().withScope(()=>t(Dn().getIsolationScope()))}function Fm(){return{withIsolationScope:Ml,withScope:Mm,withSetScope:xm,withSetIsolationScope:(t,e)=>Ml(e),getCurrentScope:()=>Dn().getScope(),getIsolationScope:()=>Dn().getIsolationScope()}}function Ba(t){const e=ws(t);return e.acs?e.acs:Fm()}function Bt(){const t=vs();return Ba(t).getCurrentScope()}function Zi(){const t=vs();return Ba(t).getIsolationScope()}function Um(){return qn("globalScope",()=>new ct)}function $m(...t){const e=vs(),n=Ba(e);if(t.length===2){const[i,r]=t;return i?n.withSetScope(i,r):n.withScope(r)}return n.withScope(t[0])}function me(){return Bt().getClient()}function Bm(t){const e=t.getPropagationContext(),{traceId:n,parentSpanId:i,propagationSpanId:r}=e,s={trace_id:n,span_id:r||lh()};return i&&(s.parent_span_id=i),s}const Hm="sentry.source",Wm="sentry.sample_rate",Vm="sentry.previous_trace_sample_rate",jm="sentry.op",Gm="sentry.origin",uh="sentry.profile_id",dh="sentry.exclusive_time",zm=0,qm=1,Ym="_sentryScope",Km="_sentryIsolationScope";function Jm(t){if(t){if(typeof t=="object"&&"deref"in t&&typeof t.deref=="function")try{return t.deref()}catch{return}return t}}function hh(t){const e=t;return{scope:e[Ym],isolationScope:Jm(e[Km])}}const Xm="sentry-",Qm=/^sentry-/;function Zm(t){const e=e_(t);if(!e)return;const n=Object.entries(e).reduce((i,[r,s])=>{if(r.match(Qm)){const o=r.slice(Xm.length);i[o]=s}return i},{});if(Object.keys(n).length>0)return n}function e_(t){if(!(!t||!rt(t)&&!Array.isArray(t)))return Array.isArray(t)?t.reduce((e,n)=>{const i=xl(n);return Object.entries(i).forEach(([r,s])=>{e[r]=s}),e},{}):xl(t)}function xl(t){return t.split(",").map(e=>{const n=e.indexOf("=");if(n===-1)return[];const i=e.slice(0,n),r=e.slice(n+1);return[i,r].map(s=>{try{return decodeURIComponent(s.trim())}catch{return}})}).reduce((e,[n,i])=>(n&&i&&(e[n]=i),e),{})}const t_=/^o(\d+)\./,n_=/^(?:(\w+):)\/\/(?:(\w+)(?::(\w+)?)?@)([\w.-]+)(?::(\d+))?\/(.+)/;function i_(t){return t==="http"||t==="https"}function er(t,e=!1){const{host:n,path:i,pass:r,port:s,projectId:o,protocol:a,publicKey:c}=t;return`${a}://${c}${e&&r?`:${r}`:""}@${n}${s?`:${s}`:""}/${i&&`${i}/`}${o}`}function r_(t){const e=n_.exec(t);if(!e){Yn(()=>{console.error(`Invalid Sentry Dsn: ${t}`)});return}const[n,i,r="",s="",o="",a=""]=e.slice(1);let c="",l=a;const u=l.split("/");if(u.length>1&&(c=u.slice(0,-1).join("/"),l=u.pop()),l){const d=l.match(/^\d+/);d&&(l=d[0])}return fh({host:s,pass:r,path:c,projectId:l,port:o,protocol:n,publicKey:i})}function fh(t){return{protocol:t.protocol,publicKey:t.publicKey||"",pass:t.pass||"",host:t.host,port:t.port||"",path:t.path||"",projectId:t.projectId}}function s_(t){if(!C)return!0;const{port:e,projectId:n,protocol:i}=t;return["protocol","publicKey","host","projectId"].find(o=>t[o]?!1:(b.error(`Invalid Sentry Dsn: ${o} missing`),!0))?!1:n.match(/^\d+$/)?i_(i)?e&&isNaN(parseInt(e,10))?(b.error(`Invalid Sentry Dsn: Invalid port ${e}`),!1):!0:(b.error(`Invalid Sentry Dsn: Invalid protocol ${i}`),!1):(b.error(`Invalid Sentry Dsn: Invalid projectId ${n}`),!1)}function o_(t){return t.match(t_)?.[1]}function a_(t){const e=t.getOptions(),{host:n}=t.getDsn()||{};let i;return e.orgId?i=String(e.orgId):n&&(i=o_(n)),i}function c_(t){const e=typeof t=="string"?r_(t):fh(t);if(!(!e||!s_(e)))return e}function l_(t){if(typeof t=="boolean")return Number(t);const e=typeof t=="string"?parseFloat(t):t;if(!(typeof e!="number"||isNaN(e)||e<0||e>1))return e}const ph=1;let Fl=!1;function u_(t){const{spanId:e,traceId:n,isRemote:i}=t.spanContext(),r=i?e:Ha(t).parent_span_id,s=hh(t).scope,o=i?s?.getPropagationContext().propagationSpanId||lh():e;return{parent_span_id:r,span_id:o,trace_id:n}}function d_(t){if(t&&t.length>0)return t.map(({context:{spanId:e,traceId:n,traceFlags:i,...r},attributes:s})=>({span_id:e,trace_id:n,sampled:i===ph,attributes:s,...r}))}function Ul(t){return typeof t=="number"?$l(t):Array.isArray(t)?t[0]+t[1]/1e9:t instanceof Date?$l(t.getTime()):st()}function $l(t){return t>9999999999?t/1e3:t}function Ha(t){if(f_(t))return t.getSpanJSON();const{spanId:e,traceId:n}=t.spanContext();if(h_(t)){const{attributes:i,startTime:r,name:s,endTime:o,status:a,links:c}=t,l="parentSpanId"in t?t.parentSpanId:"parentSpanContext"in t?t.parentSpanContext?.spanId:void 0;return{span_id:e,trace_id:n,data:i,description:s,parent_span_id:l,start_timestamp:Ul(r),timestamp:Ul(o)||void 0,status:g_(a),op:i[jm],origin:i[Gm],links:d_(c)}}return{span_id:e,trace_id:n,start_timestamp:0,data:{}}}function h_(t){const e=t;return!!e.attributes&&!!e.startTime&&!!e.name&&!!e.endTime&&!!e.status}function f_(t){return typeof t.getSpanJSON=="function"}function p_(t){const{traceFlags:e}=t.spanContext();return e===ph}function g_(t){if(!(!t||t.code===zm))return t.code===qm?"ok":t.message||"internal_error"}const m_="_sentryRootSpan";function gh(t){return t[m_]||t}function Bl(){Fl||(Yn(()=>{console.warn("[Sentry] Returning null from `beforeSendSpan` is disallowed. To drop certain spans, configure the respective integrations directly or use `ignoreSpans`.")}),Fl=!0)}function __(t){if(typeof __SENTRY_TRACING__=="boolean"&&!__SENTRY_TRACING__)return!1;const e=me()?.getOptions();return!!e&&(e.tracesSampleRate!=null||!!e.tracesSampler)}function Hl(t){b.log(`Ignoring span ${t.op} - ${t.description} because it matches \`ignoreSpans\`.`)}function Wl(t,e){if(!e?.length||!t.description)return!1;for(const n of e){if(E_(n)){if(kr(t.description,n))return C&&Hl(t),!0;continue}if(!n.name&&!n.op)continue;const i=n.name?kr(t.description,n.name):!0,r=n.op?t.op&&kr(t.op,n.op):!0;if(i&&r)return C&&Hl(t),!0}return!1}function y_(t,e){const n=e.parent_span_id,i=e.span_id;if(n)for(const r of t)r.parent_span_id===i&&(r.parent_span_id=n)}function E_(t){return typeof t=="string"||t instanceof RegExp}const Wa="production",v_="_frozenDsc";function mh(t,e){const n=e.getOptions(),{publicKey:i}=e.getDsn()||{},r={environment:n.environment||Wa,release:n.release,public_key:i,trace_id:t,org_id:a_(e)};return e.emit("createDsc",r),r}function w_(t,e){const n=e.getPropagationContext();return n.dsc||mh(n.traceId,t)}function b_(t){const e=me();if(!e)return{};const n=gh(t),i=Ha(n),r=i.data,s=n.spanContext().traceState,o=s?.get("sentry.sample_rate")??r[Wm]??r[Vm];function a(p){return(typeof o=="number"||typeof o=="string")&&(p.sample_rate=`${o}`),p}const c=n[v_];if(c)return a(c);const l=s?.get("sentry.dsc"),u=l&&Zm(l);if(u)return a(u);const d=mh(t.spanContext().traceId,e),h=r[Hm],f=i.description;return h!=="url"&&f&&(d.transaction=f),__()&&(d.sampled=String(p_(n)),d.sample_rand=s?.get("sentry.sample_rand")??hh(n).scope?.getPropagationContext().sampleRand.toString()),a(d),e.emit("createDsc",d,n),d}function Qe(t,e=100,n=1/0){try{return xo("",t,e,n)}catch(i){return{ERROR:`**non-serializable** (${i})`}}}function _h(t,e=3,n=100*1024){const i=Qe(t,e);return I_(i)>n?_h(t,e-1,n):i}function xo(t,e,n=1/0,i=1/0,r=k_()){const[s,o]=r;if(e==null||["boolean","string"].includes(typeof e)||typeof e=="number"&&Number.isFinite(e))return e;const a=S_(t,e);if(!a.startsWith("[object "))return a;if(e.__sentry_skip_normalization__)return e;const c=typeof e.__sentry_override_normalization_depth__=="number"?e.__sentry_override_normalization_depth__:n;if(c===0)return a.replace("object ","");if(s(e))return"[Circular ~]";const l=e;if(l&&typeof l.toJSON=="function")try{const f=l.toJSON();return xo("",f,c-1,i,r)}catch{}const u=Array.isArray(e)?[]:{};let d=0;const h=sh(e);for(const f in h){if(!Object.prototype.hasOwnProperty.call(h,f))continue;if(d>=i){u[f]="[MaxProperties ~]";break}const p=h[f];u[f]=xo(f,p,c-1,i,r),d++}return o(e),u}function S_(t,e){try{if(t==="domain"&&e&&typeof e=="object"&&e._events)return"[Domain]";if(t==="domainEmitter")return"[DomainEmitter]";if(typeof global<"u"&&e===global)return"[Global]";if(typeof window<"u"&&e===window)return"[Window]";if(typeof document<"u"&&e===document)return"[Document]";if(nh(e))return Zd(e);if(ym(e))return"[SyntheticEvent]";if(typeof e=="number"&&!Number.isFinite(e))return`[${e}]`;if(typeof e=="function")return`[Function: ${Dt(e)}]`;if(typeof e=="symbol")return`[${String(e)}]`;if(typeof e=="bigint")return`[BigInt: ${String(e)}]`;const n=C_(e);return/^HTML(\w*)Element$/.test(n)?`[HTMLElement: ${n}]`:`[object ${n}]`}catch(n){return`**non-serializable** (${n})`}}function C_(t){const e=Object.getPrototypeOf(t);return e?.constructor?e.constructor.name:"null prototype"}function T_(t){return~-encodeURI(t).split(/%..|./).length}function I_(t){return T_(JSON.stringify(t))}function k_(){const t=new WeakSet;function e(i){return t.has(i)?!0:(t.add(i),!1)}function n(i){t.delete(i)}return[e,n]}function Jn(t,e=[]){return[t,e]}function R_(t,e){const[n,i]=t;return[n,[...i,e]]}function Vl(t,e){const n=t[1];for(const i of n){const r=i[0].type;if(e(i,r))return!0}return!1}function Fo(t){const e=ws(D);return e.encodePolyfill?e.encodePolyfill(t):new TextEncoder().encode(t)}function A_(t){const[e,n]=t;let i=JSON.stringify(e);function r(s){typeof i=="string"?i=typeof s=="string"?i+s:[Fo(i),s]:i.push(typeof s=="string"?Fo(s):s)}for(const s of n){const[o,a]=s;if(r(`
${JSON.stringify(o)}
`),typeof a=="string"||a instanceof Uint8Array)r(a);else{let c;try{c=JSON.stringify(a)}catch{c=JSON.stringify(Qe(a))}r(c)}}return typeof i=="string"?i:P_(i)}function P_(t){const e=t.reduce((r,s)=>r+s.length,0),n=new Uint8Array(e);let i=0;for(const r of t)n.set(r,i),i+=r.length;return n}function N_(t){const e=typeof t.data=="string"?Fo(t.data):t.data;return[{type:"attachment",length:e.length,filename:t.filename,content_type:t.contentType,attachment_type:t.attachmentType},e]}const L_={session:"session",sessions:"session",attachment:"attachment",transaction:"transaction",event:"error",client_report:"internal",user_report:"default",profile:"profile",profile_chunk:"profile",replay_event:"replay",replay_recording:"replay",check_in:"monitor",feedback:"feedback",span:"span",raw_security:"security",log:"log_item",metric:"metric",trace_metric:"metric"};function jl(t){return L_[t]}function yh(t){if(!t?.sdk)return;const{name:e,version:n}=t.sdk;return{name:e,version:n}}function O_(t,e,n,i){const r=t.sdkProcessingMetadata?.dynamicSamplingContext;return{event_id:t.event_id,sent_at:new Date().toISOString(),...e&&{sdk:e},...!!n&&i&&{dsn:er(i)},...r&&{trace:r}}}function D_(t,e){if(!e)return t;const n=t.sdk||{};return t.sdk={...n,name:n.name||e.name,version:n.version||e.version,integrations:[...t.sdk?.integrations||[],...e.integrations||[]],packages:[...t.sdk?.packages||[],...e.packages||[]],settings:t.sdk?.settings||e.settings?{...t.sdk?.settings,...e.settings}:void 0},t}function M_(t,e,n,i){const r=yh(n),s={sent_at:new Date().toISOString(),...r&&{sdk:r},...!!i&&e&&{dsn:er(e)}},o="aggregates"in t?[{type:"sessions"},t]:[{type:"session"},t.toJSON()];return Jn(s,[o])}function x_(t,e,n,i){const r=yh(n),s=t.type&&t.type!=="replay_event"?t.type:"event";D_(t,n?.sdk);const o=O_(t,r,i,e);return delete t.sdkProcessingMetadata,Jn(o,[[{type:s},t]])}const so=0,Gl=1,zl=2;function Ts(t){return new Di(e=>{e(t)})}function Va(t){return new Di((e,n)=>{n(t)})}class Di{constructor(e){this._state=so,this._handlers=[],this._runExecutor(e)}then(e,n){return new Di((i,r)=>{this._handlers.push([!1,s=>{if(!e)i(s);else try{i(e(s))}catch(o){r(o)}},s=>{if(!n)r(s);else try{i(n(s))}catch(o){r(o)}}]),this._executeHandlers()})}catch(e){return this.then(n=>n,e)}finally(e){return new Di((n,i)=>{let r,s;return this.then(o=>{s=!1,r=o,e&&e()},o=>{s=!0,r=o,e&&e()}).then(()=>{if(s){i(r);return}n(r)})})}_executeHandlers(){if(this._state===so)return;const e=this._handlers.slice();this._handlers=[],e.forEach(n=>{n[0]||(this._state===Gl&&n[1](this._value),this._state===zl&&n[2](this._value),n[0]=!0)})}_runExecutor(e){const n=(s,o)=>{if(this._state===so){if(Ji(o)){o.then(i,r);return}this._state=s,this._value=o,this._executeHandlers()}},i=s=>{n(Gl,s)},r=s=>{n(zl,s)};try{e(i,r)}catch(s){r(s)}}}function F_(t,e,n,i=0){try{const r=Uo(e,n,t,i);return Ji(r)?r:Ts(r)}catch(r){return Va(r)}}function Uo(t,e,n,i){const r=n[i];if(!t||!r)return t;const s=r({...t},e);return C&&s===null&&b.log(`Event processor "${r.id||"?"}" dropped event`),Ji(s)?s.then(o=>Uo(o,e,n,i+1)):Uo(s,e,n,i+1)}function U_(t,e){const{fingerprint:n,span:i,breadcrumbs:r,sdkProcessingMetadata:s}=e;$_(t,e),i&&W_(t,i),V_(t,n),B_(t,r),H_(t,s)}function ql(t,e){const{extra:n,tags:i,user:r,contexts:s,level:o,sdkProcessingMetadata:a,breadcrumbs:c,fingerprint:l,eventProcessors:u,attachments:d,propagationContext:h,transactionName:f,span:p}=e;gr(t,"extra",n),gr(t,"tags",i),gr(t,"user",r),gr(t,"contexts",s),t.sdkProcessingMetadata=Qi(t.sdkProcessingMetadata,a,2),o&&(t.level=o),f&&(t.transactionName=f),p&&(t.span=p),c.length&&(t.breadcrumbs=[...t.breadcrumbs,...c]),l.length&&(t.fingerprint=[...t.fingerprint,...l]),u.length&&(t.eventProcessors=[...t.eventProcessors,...u]),d.length&&(t.attachments=[...t.attachments,...d]),t.propagationContext={...t.propagationContext,...h}}function gr(t,e,n){t[e]=Qi(t[e],n,1)}function $_(t,e){const{extra:n,tags:i,user:r,contexts:s,level:o,transactionName:a}=e;Object.keys(n).length&&(t.extra={...n,...t.extra}),Object.keys(i).length&&(t.tags={...i,...t.tags}),Object.keys(r).length&&(t.user={...r,...t.user}),Object.keys(s).length&&(t.contexts={...s,...t.contexts}),o&&(t.level=o),a&&t.type!=="transaction"&&(t.transaction=a)}function B_(t,e){const n=[...t.breadcrumbs||[],...e];t.breadcrumbs=n.length?n:void 0}function H_(t,e){t.sdkProcessingMetadata={...t.sdkProcessingMetadata,...e}}function W_(t,e){t.contexts={trace:u_(e),...t.contexts},t.sdkProcessingMetadata={dynamicSamplingContext:b_(e),...t.sdkProcessingMetadata};const n=gh(e),i=Ha(n).description;i&&!t.transaction&&t.type==="transaction"&&(t.transaction=i)}function V_(t,e){t.fingerprint=t.fingerprint?Array.isArray(t.fingerprint)?t.fingerprint:[t.fingerprint]:[],e&&(t.fingerprint=t.fingerprint.concat(e)),t.fingerprint.length||delete t.fingerprint}let jt,Yl,Kl,mt;function j_(t){const e=D._sentryDebugIds,n=D._debugIds;if(!e&&!n)return{};const i=e?Object.keys(e):[],r=n?Object.keys(n):[];if(mt&&i.length===Yl&&r.length===Kl)return mt;Yl=i.length,Kl=r.length,mt={},jt||(jt={});const s=(o,a)=>{for(const c of o){const l=a[c],u=jt?.[c];if(u&&mt&&l)mt[u[0]]=l,jt&&(jt[c]=[u[0],l]);else if(l){const d=t(c);for(let h=d.length-1;h>=0;h--){const p=d[h]?.filename;if(p&&mt&&jt){mt[p]=l,jt[c]=[p,l];break}}}}};return e&&s(i,e),n&&s(r,n),mt}function G_(t,e,n,i,r,s){const{normalizeDepth:o=3,normalizeMaxBreadth:a=1e3}=t,c={...e,event_id:e.event_id||n.event_id||ke(),timestamp:e.timestamp||Xi()},l=n.integrations||t.integrations.map(m=>m.name);z_(c,t),K_(c,l),r&&r.emit("applyFrameMetadata",e),e.type===void 0&&q_(c,t.stackParser);const u=X_(i,n.captureContext);n.mechanism&&Ln(c,n.mechanism);const d=r?r.getEventProcessors():[],h=Um().getScopeData();if(s){const m=s.getScopeData();ql(h,m)}if(u){const m=u.getScopeData();ql(h,m)}const f=[...n.attachments||[],...h.attachments];f.length&&(n.attachments=f),U_(c,h);const p=[...d,...h.eventProcessors];return F_(p,c,n).then(m=>(m&&Y_(m),typeof o=="number"&&o>0?J_(m,o,a):m))}function z_(t,e){const{environment:n,release:i,dist:r,maxValueLength:s}=e;t.environment=t.environment||n||Wa,!t.release&&i&&(t.release=i),!t.dist&&r&&(t.dist=r);const o=t.request;o?.url&&(o.url=s?oh(o.url,s):o.url)}function q_(t,e){const n=j_(e);t.exception?.values?.forEach(i=>{i.stacktrace?.frames?.forEach(r=>{r.filename&&(r.debug_id=n[r.filename])})})}function Y_(t){const e={};if(t.exception?.values?.forEach(i=>{i.stacktrace?.frames?.forEach(r=>{r.debug_id&&(r.abs_path?e[r.abs_path]=r.debug_id:r.filename&&(e[r.filename]=r.debug_id),delete r.debug_id)})}),Object.keys(e).length===0)return;t.debug_meta=t.debug_meta||{},t.debug_meta.images=t.debug_meta.images||[];const n=t.debug_meta.images;Object.entries(e).forEach(([i,r])=>{n.push({type:"sourcemap",code_file:i,debug_id:r})})}function K_(t,e){e.length>0&&(t.sdk=t.sdk||{},t.sdk.integrations=[...t.sdk.integrations||[],...e])}function J_(t,e,n){if(!t)return null;const i={...t,...t.breadcrumbs&&{breadcrumbs:t.breadcrumbs.map(r=>({...r,...r.data&&{data:Qe(r.data,e,n)}}))},...t.user&&{user:Qe(t.user,e,n)},...t.contexts&&{contexts:Qe(t.contexts,e,n)},...t.extra&&{extra:Qe(t.extra,e,n)}};return t.contexts?.trace&&i.contexts&&(i.contexts.trace=t.contexts.trace,t.contexts.trace.data&&(i.contexts.trace.data=Qe(t.contexts.trace.data,e,n))),t.spans&&(i.spans=t.spans.map(r=>({...r,...r.data&&{data:Qe(r.data,e,n)}}))),t.contexts?.flags&&i.contexts&&(i.contexts.flags=Qe(t.contexts.flags,3,n)),i}function X_(t,e){if(!e)return t;const n=t?t.clone():new ct;return n.update(e),n}function Q_(t,e){return Bt().captureException(t,void 0)}function Eh(t,e){return Bt().captureEvent(t,e)}function Jl(t){const e=Zi(),n=Bt(),{userAgent:i}=D.navigator||{},r=Rm({user:n.getUser()||e.getUser(),...i&&{userAgent:i},...t}),s=e.getSession();return s?.status==="ok"&&On(s,{status:"exited"}),vh(),e.setSession(r),r}function vh(){const t=Zi(),n=Bt().getSession()||t.getSession();n&&Am(n),wh(),t.setSession()}function wh(){const t=Zi(),e=me(),n=t.getSession();n&&e&&e.captureSession(n)}function Xl(t=!1){if(t){vh();return}wh()}const Z_="7";function ey(t){const e=t.protocol?`${t.protocol}:`:"",n=t.port?`:${t.port}`:"";return`${e}//${t.host}${n}${t.path?`/${t.path}`:""}/api/`}function ty(t){return`${ey(t)}${t.projectId}/envelope/`}function ny(t,e){const n={sentry_version:Z_};return t.publicKey&&(n.sentry_key=t.publicKey),e&&(n.sentry_client=`${e.name}/${e.version}`),new URLSearchParams(n).toString()}function iy(t,e,n){return e||`${ty(t)}?${ny(t,n)}`}const Ql=[];function ry(t){const e={};return t.forEach(n=>{const{name:i}=n,r=e[i];r&&!r.isDefaultInstance&&n.isDefaultInstance||(e[i]=n)}),Object.values(e)}function sy(t){const e=t.defaultIntegrations||[],n=t.integrations;e.forEach(r=>{r.isDefaultInstance=!0});let i;if(Array.isArray(n))i=[...e,...n];else if(typeof n=="function"){const r=n(e);i=Array.isArray(r)?r:[r]}else i=e;return ry(i)}function oy(t,e){const n={};return e.forEach(i=>{i&&bh(t,i,n)}),n}function Zl(t,e){for(const n of e)n?.afterAllSetup&&n.afterAllSetup(t)}function bh(t,e,n){if(n[e.name]){C&&b.log(`Integration skipped because it was already installed: ${e.name}`);return}if(n[e.name]=e,!Ql.includes(e.name)&&typeof e.setupOnce=="function"&&(e.setupOnce(),Ql.push(e.name)),e.setup&&typeof e.setup=="function"&&e.setup(t),typeof e.preprocessEvent=="function"){const i=e.preprocessEvent.bind(e);t.on("preprocessEvent",(r,s)=>i(r,s,t))}if(typeof e.processEvent=="function"){const i=e.processEvent.bind(e),r=Object.assign((s,o)=>i(s,o,t),{id:e.name});t.addEventProcessor(r)}C&&b.log(`Integration installed: ${e.name}`)}function ay(t){return[{type:"log",item_count:t.length,content_type:"application/vnd.sentry.items.log+json"},{items:t}]}function cy(t,e,n,i){const r={};return e?.sdk&&(r.sdk={name:e.sdk.name,version:e.sdk.version}),n&&i&&(r.dsn=er(i)),Jn(r,[ay(t)])}function Sh(t,e){const n=e??ly(t)??[];if(n.length===0)return;const i=t.getOptions(),r=cy(n,i._metadata,i.tunnel,t.getDsn());Ch().set(t,[]),t.emit("flushLogs"),t.sendEnvelope(r)}function ly(t){return Ch().get(t)}function Ch(){return qn("clientToLogBufferMap",()=>new WeakMap)}function uy(t){return[{type:"trace_metric",item_count:t.length,content_type:"application/vnd.sentry.items.trace-metric+json"},{items:t}]}function dy(t,e,n,i){const r={};return e?.sdk&&(r.sdk={name:e.sdk.name,version:e.sdk.version}),n&&i&&(r.dsn=er(i)),Jn(r,[uy(t)])}function Th(t,e){const n=e??hy(t)??[];if(n.length===0)return;const i=t.getOptions(),r=dy(n,i._metadata,i.tunnel,t.getDsn());Ih().set(t,[]),t.emit("flushMetrics"),t.sendEnvelope(r)}function hy(t){return Ih().get(t)}function Ih(){return qn("clientToMetricBufferMap",()=>new WeakMap)}function fy(t,e,n){const i=[{type:"client_report"},{timestamp:Xi(),discarded_events:t}];return Jn(e?{dsn:e}:{},[i])}function kh(t){const e=[];t.message&&e.push(t.message);try{const n=t.exception.values[t.exception.values.length-1];n?.value&&(e.push(n.value),n.type&&e.push(`${n.type}: ${n.value}`))}catch{}return e}function py(t){const{trace_id:e,parent_span_id:n,span_id:i,status:r,origin:s,data:o,op:a}=t.contexts?.trace??{};return{data:o??{},description:t.transaction,op:a,parent_span_id:n,span_id:i??"",start_timestamp:t.start_timestamp??0,status:r,timestamp:t.timestamp,trace_id:e??"",origin:s,profile_id:o?.[uh],exclusive_time:o?.[dh],measurements:t.measurements,is_segment:!0}}function gy(t){return{type:"transaction",timestamp:t.timestamp,start_timestamp:t.start_timestamp,transaction:t.description,contexts:{trace:{trace_id:t.trace_id,span_id:t.span_id,parent_span_id:t.parent_span_id,op:t.op,status:t.status,origin:t.origin,data:{...t.data,...t.profile_id&&{[uh]:t.profile_id},...t.exclusive_time&&{[dh]:t.exclusive_time}}}},measurements:t.measurements}}const eu="Not capturing exception because it's already been captured.",tu="Discarded session because of missing or non-string release",Rh=Symbol.for("SentryInternalError"),Ah=Symbol.for("SentryDoNotSendEventError"),my=5e3;function Rr(t){return{message:t,[Rh]:!0}}function oo(t){return{message:t,[Ah]:!0}}function nu(t){return!!t&&typeof t=="object"&&Rh in t}function iu(t){return!!t&&typeof t=="object"&&Ah in t}function ru(t,e,n,i,r){let s=0,o,a=!1;t.on(n,()=>{s=0,clearTimeout(o),a=!1}),t.on(e,c=>{s+=i(c),s>=8e5?r(t):a||(a=!0,o=setTimeout(()=>{r(t)},my))}),t.on("flush",()=>{r(t)})}class _y{constructor(e){if(this._options=e,this._integrations={},this._numProcessing=0,this._outcomes={},this._hooks={},this._eventProcessors=[],e.dsn?this._dsn=c_(e.dsn):C&&b.warn("No DSN provided, client will not send events."),this._dsn){const i=iy(this._dsn,e.tunnel,e._metadata?e._metadata.sdk:void 0);this._transport=e.transport({tunnel:this._options.tunnel,recordDroppedEvent:this.recordDroppedEvent.bind(this),...e.transportOptions,url:i})}this._options.enableLogs&&ru(this,"afterCaptureLog","flushLogs",wy,Sh),(this._options.enableMetrics??this._options._experiments?.enableMetrics??!0)&&ru(this,"afterCaptureMetric","flushMetrics",vy,Th)}captureException(e,n,i){const r=ke();if(Pl(e))return C&&b.log(eu),r;const s={event_id:r,...n};return this._process(this.eventFromException(e,s).then(o=>this._captureEvent(o,s,i))),s.event_id}captureMessage(e,n,i,r){const s={event_id:ke(),...i},o=xa(e)?e:String(e),a=bs(e)?this.eventFromMessage(o,n,s):this.eventFromException(e,s);return this._process(a.then(c=>this._captureEvent(c,s,r))),s.event_id}captureEvent(e,n,i){const r=ke();if(n?.originalException&&Pl(n.originalException))return C&&b.log(eu),r;const s={event_id:r,...n},o=e.sdkProcessingMetadata||{},a=o.capturedSpanScope,c=o.capturedSpanIsolationScope;return this._process(this._captureEvent(e,s,a||i,c)),s.event_id}captureSession(e){this.sendSession(e),On(e,{init:!1})}getDsn(){return this._dsn}getOptions(){return this._options}getSdkMetadata(){return this._options._metadata}getTransport(){return this._transport}async flush(e){const n=this._transport;if(!n)return!0;this.emit("flush");const i=await this._isClientDoneProcessing(e),r=await n.flush(e);return i&&r}async close(e){const n=await this.flush(e);return this.getOptions().enabled=!1,this.emit("close"),n}getEventProcessors(){return this._eventProcessors}addEventProcessor(e){this._eventProcessors.push(e)}init(){(this._isEnabled()||this._options.integrations.some(({name:e})=>e.startsWith("Spotlight")))&&this._setupIntegrations()}getIntegrationByName(e){return this._integrations[e]}addIntegration(e){const n=this._integrations[e.name];bh(this,e,this._integrations),n||Zl(this,[e])}sendEvent(e,n={}){this.emit("beforeSendEvent",e,n);let i=x_(e,this._dsn,this._options._metadata,this._options.tunnel);for(const r of n.attachments||[])i=R_(i,N_(r));this.sendEnvelope(i).then(r=>this.emit("afterSendEvent",e,r))}sendSession(e){const{release:n,environment:i=Wa}=this._options;if("aggregates"in e){const s=e.attrs||{};if(!s.release&&!n){C&&b.warn(tu);return}s.release=s.release||n,s.environment=s.environment||i,e.attrs=s}else{if(!e.release&&!n){C&&b.warn(tu);return}e.release=e.release||n,e.environment=e.environment||i}this.emit("beforeSendSession",e);const r=M_(e,this._dsn,this._options._metadata,this._options.tunnel);this.sendEnvelope(r)}recordDroppedEvent(e,n,i=1){if(this._options.sendClientReports){const r=`${e}:${n}`;C&&b.log(`Recording outcome: "${r}"${i>1?` (${i} times)`:""}`),this._outcomes[r]=(this._outcomes[r]||0)+i}}on(e,n){const i=this._hooks[e]=this._hooks[e]||new Set,r=(...s)=>n(...s);return i.add(r),()=>{i.delete(r)}}emit(e,...n){const i=this._hooks[e];i&&i.forEach(r=>r(...n))}async sendEnvelope(e){if(this.emit("beforeEnvelope",e),this._isEnabled()&&this._transport)try{return await this._transport.send(e)}catch(n){return C&&b.error("Error while sending envelope:",n),{}}return C&&b.error("Transport disabled"),{}}_setupIntegrations(){const{integrations:e}=this._options;this._integrations=oy(this,e),Zl(this,e)}_updateSessionFromEvent(e,n){let i=n.level==="fatal",r=!1;const s=n.exception?.values;if(s){r=!0,i=!1;for(const c of s)if(c.mechanism?.handled===!1){i=!0;break}}const o=e.status==="ok";(o&&e.errors===0||o&&i)&&(On(e,{...i&&{status:"crashed"},errors:e.errors||Number(r||i)}),this.captureSession(e))}async _isClientDoneProcessing(e){let n=0;for(;!e||n<e;){if(await new Promise(i=>setTimeout(i,1)),!this._numProcessing)return!0;n++}return!1}_isEnabled(){return this.getOptions().enabled!==!1&&this._transport!==void 0}_prepareEvent(e,n,i,r){const s=this.getOptions(),o=Object.keys(this._integrations);return!n.integrations&&o?.length&&(n.integrations=o),this.emit("preprocessEvent",e,n),e.type||r.setLastEventId(e.event_id||n.event_id),G_(s,e,n,i,this,r).then(a=>{if(a===null)return a;this.emit("postprocessEvent",a,n),a.contexts={trace:Bm(i),...a.contexts};const c=w_(this,i);return a.sdkProcessingMetadata={dynamicSamplingContext:c,...a.sdkProcessingMetadata},a})}_captureEvent(e,n={},i=Bt(),r=Zi()){return C&&$o(e)&&b.log(`Captured error event \`${kh(e)[0]||"<unknown>"}\``),this._processEvent(e,n,i,r).then(s=>s.event_id,s=>{C&&(iu(s)?b.log(s.message):nu(s)?b.warn(s.message):b.warn(s))})}_processEvent(e,n,i,r){const s=this.getOptions(),{sampleRate:o}=s,a=Ph(e),c=$o(e),l=e.type||"error",u=`before send for type \`${l}\``,d=typeof o>"u"?void 0:l_(o);if(c&&typeof d=="number"&&Math.random()>d)return this.recordDroppedEvent("sample_rate","error"),Va(oo(`Discarding event because it's not included in the random sample (sampling rate = ${o})`));const h=l==="replay_event"?"replay":l;return this._prepareEvent(e,n,i,r).then(f=>{if(f===null)throw this.recordDroppedEvent("event_processor",h),oo("An event processor returned `null`, will not send event.");if(n.data&&n.data.__sentry__===!0)return f;const E=Ey(this,s,f,n);return yy(E,u)}).then(f=>{if(f===null){if(this.recordDroppedEvent("before_send",h),a){const T=1+(e.spans||[]).length;this.recordDroppedEvent("before_send","span",T)}throw oo(`${u} returned \`null\`, will not send event.`)}const p=i.getSession()||r.getSession();if(c&&p&&this._updateSessionFromEvent(p,f),a){const m=f.sdkProcessingMetadata?.spanCountBeforeProcessing||0,T=f.spans?f.spans.length:0,N=m-T;N>0&&this.recordDroppedEvent("before_send","span",N)}const E=f.transaction_info;if(a&&E&&f.transaction!==e.transaction){const m="custom";f.transaction_info={...E,source:m}}return this.sendEvent(f,n),f}).then(null,f=>{throw iu(f)||nu(f)?f:(this.captureException(f,{mechanism:{handled:!1,type:"internal"},data:{__sentry__:!0},originalException:f}),Rr(`Event processing pipeline threw an error, original event will not be sent. Details have been sent as a new event.
Reason: ${f}`))})}_process(e){this._numProcessing++,e.then(n=>(this._numProcessing--,n),n=>(this._numProcessing--,n))}_clearOutcomes(){const e=this._outcomes;return this._outcomes={},Object.entries(e).map(([n,i])=>{const[r,s]=n.split(":");return{reason:r,category:s,quantity:i}})}_flushOutcomes(){C&&b.log("Flushing outcomes...");const e=this._clearOutcomes();if(e.length===0){C&&b.log("No outcomes to send");return}if(!this._dsn){C&&b.log("No dsn provided, will not send outcomes");return}C&&b.log("Sending outcomes:",e);const n=fy(e,this._options.tunnel&&er(this._dsn));this.sendEnvelope(n)}}function yy(t,e){const n=`${e} must return \`null\` or a valid event.`;if(Ji(t))return t.then(i=>{if(!Oi(i)&&i!==null)throw Rr(n);return i},i=>{throw Rr(`${e} rejected with ${i}`)});if(!Oi(t)&&t!==null)throw Rr(n);return t}function Ey(t,e,n,i){const{beforeSend:r,beforeSendTransaction:s,beforeSendSpan:o,ignoreSpans:a}=e;let c=n;if($o(c)&&r)return r(c,i);if(Ph(c)){if(o||a){const l=py(c);if(a?.length&&Wl(l,a))return null;if(o){const u=o(l);u?c=Qi(n,gy(u)):Bl()}if(c.spans){const u=[],d=c.spans;for(const f of d){if(a?.length&&Wl(f,a)){y_(d,f);continue}if(o){const p=o(f);p?u.push(p):(Bl(),u.push(f))}else u.push(f)}const h=c.spans.length-u.length;h&&t.recordDroppedEvent("before_send","span",h),c.spans=u}}if(s){if(c.spans){const l=c.spans.length;c.sdkProcessingMetadata={...n.sdkProcessingMetadata,spanCountBeforeProcessing:l}}return s(c,i)}}return c}function $o(t){return t.type===void 0}function Ph(t){return t.type==="transaction"}function vy(t){let e=0;return t.name&&(e+=t.name.length*2),e+=8,e+Nh(t.attributes)}function wy(t){let e=0;return t.message&&(e+=t.message.length*2),e+Nh(t.attributes)}function Nh(t){if(!t)return 0;let e=0;return Object.values(t).forEach(n=>{Array.isArray(n)?e+=n.length*su(n[0]):bs(n)?e+=su(n):e+=100}),e}function su(t){return typeof t=="string"?t.length*2:typeof t=="number"?8:typeof t=="boolean"?4:0}function by(t,e){e.debug===!0&&(C?b.enable():Yn(()=>{console.warn("[Sentry] Cannot initialize SDK with `debug` option using a non-debug bundle.")})),Bt().update(e.initialScope);const i=new t(e);return Sy(i),i.init(),i}function Sy(t){Bt().setClient(t)}const Lh=Symbol.for("SentryBufferFullError");function Oh(t=100){const e=new Set;function n(){return e.size<t}function i(o){e.delete(o)}function r(o){if(!n())return Va(Lh);const a=o();return e.add(a),a.then(()=>i(a),()=>i(a)),a}function s(o){if(!e.size)return Ts(!0);const a=Promise.allSettled(Array.from(e)).then(()=>!0);if(!o)return a;const c=[a,new Promise(l=>setTimeout(()=>l(!1),o))];return Promise.race(c)}return{get $(){return Array.from(e)},add:r,drain:s}}const Cy=60*1e3;function Ty(t,e=Date.now()){const n=parseInt(`${t}`,10);if(!isNaN(n))return n*1e3;const i=Date.parse(`${t}`);return isNaN(i)?Cy:i-e}function Iy(t,e){return t[e]||t.all||0}function ky(t,e,n=Date.now()){return Iy(t,e)>n}function Ry(t,{statusCode:e,headers:n},i=Date.now()){const r={...t},s=n?.["x-sentry-rate-limits"],o=n?.["retry-after"];if(s)for(const a of s.trim().split(",")){const[c,l,,,u]=a.split(":",5),d=parseInt(c,10),h=(isNaN(d)?60:d)*1e3;if(!l)r.all=i+h;else for(const f of l.split(";"))f==="metric_bucket"?(!u||u.split(";").includes("custom"))&&(r[f]=i+h):r[f]=i+h}else o?r.all=i+Ty(o,i):e===429&&(r.all=i+60*1e3);return r}const Ay=64;function Py(t,e,n=Oh(t.bufferSize||Ay)){let i={};const r=o=>n.drain(o);function s(o){const a=[];if(Vl(o,(d,h)=>{const f=jl(h);ky(i,f)?t.recordDroppedEvent("ratelimit_backoff",f):a.push(d)}),a.length===0)return Promise.resolve({});const c=Jn(o[0],a),l=d=>{Vl(c,(h,f)=>{t.recordDroppedEvent(d,jl(f))})},u=()=>e({body:A_(c)}).then(d=>(d.statusCode!==void 0&&(d.statusCode<200||d.statusCode>=300)&&C&&b.warn(`Sentry responded with status code ${d.statusCode} to sent event.`),i=Ry(i,d),d),d=>{throw l("network_error"),C&&b.error("Encountered error running transport request:",d),d});return n.add(u).then(d=>d,d=>{if(d===Lh)return C&&b.error("Skipped sending event because buffer is full."),l("queue_overflow"),Promise.resolve({});throw d})}return{send:s,flush:r}}function ao(t){if(!t)return{};const e=t.match(/^(([^:/?#]+):)?(\/\/([^/?#]*))?([^?#]*)(\?([^#]*))?(#(.*))?$/);if(!e)return{};const n=e[6]||"",i=e[8]||"";return{host:e[4],path:e[5],protocol:e[2],search:n,hash:i,relative:e[5]+n+i}}function Ny(t){"aggregates"in t?t.attrs?.ip_address===void 0&&(t.attrs={...t.attrs,ip_address:"{{auto}}"}):t.ipAddress===void 0&&(t.ipAddress="{{auto}}")}function Ly(t,e,n=[e],i="npm"){const r=t._metadata||{};r.sdk||(r.sdk={name:`sentry.javascript.${e}`,packages:n.map(s=>({name:`${i}:@sentry/${s}`,version:en})),version:en}),t._metadata=r}const Oy=100;function on(t,e){const n=me(),i=Zi();if(!n)return;const{beforeBreadcrumb:r=null,maxBreadcrumbs:s=Oy}=n.getOptions();if(s<=0)return;const a={timestamp:Xi(),...t},c=r?Yn(()=>r(a,e)):a;c!==null&&(n.emit&&n.emit("beforeAddBreadcrumb",c,e),i.addBreadcrumb(c,s))}let ou;const Dy="FunctionToString",au=new WeakMap,My=(()=>({name:Dy,setupOnce(){ou=Function.prototype.toString;try{Function.prototype.toString=function(...t){const e=$a(this),n=au.has(me())&&e!==void 0?e:this;return ou.apply(n,t)}}catch{}},setup(t){au.set(t,!0)}})),xy=My,Fy=[/^Script error\.?$/,/^Javascript error: Script error\.? on line 0$/,/^ResizeObserver loop completed with undelivered notifications.$/,/^Cannot redefine property: googletag$/,/^Can't find variable: gmo$/,/^undefined is not an object \(evaluating 'a\.[A-Z]'\)$/,`can't redefine non-configurable property "solana"`,"vv().getRestrictions is not a function. (In 'vv().getRestrictions(1,a)', 'vv().getRestrictions' is undefined)","Can't find variable: _AutofillCallbackHandler",/^Non-Error promise rejection captured with value: Object Not Found Matching Id:\d+, MethodName:simulateEvent, ParamCount:\d+$/,/^Java exception was raised during method invocation$/],Uy="EventFilters",$y=(t={})=>{let e;return{name:Uy,setup(n){const i=n.getOptions();e=cu(t,i)},processEvent(n,i,r){if(!e){const s=r.getOptions();e=cu(t,s)}return Hy(n,e)?null:n}}},By=((t={})=>({...$y(t),name:"InboundFilters"}));function cu(t={},e={}){return{allowUrls:[...t.allowUrls||[],...e.allowUrls||[]],denyUrls:[...t.denyUrls||[],...e.denyUrls||[]],ignoreErrors:[...t.ignoreErrors||[],...e.ignoreErrors||[],...t.disableErrorDefaults?[]:Fy],ignoreTransactions:[...t.ignoreTransactions||[],...e.ignoreTransactions||[]]}}function Hy(t,e){if(t.type){if(t.type==="transaction"&&Vy(t,e.ignoreTransactions))return C&&b.warn(`Event dropped due to being matched by \`ignoreTransactions\` option.
Event: ${Jt(t)}`),!0}else{if(Wy(t,e.ignoreErrors))return C&&b.warn(`Event dropped due to being matched by \`ignoreErrors\` option.
Event: ${Jt(t)}`),!0;if(qy(t))return C&&b.warn(`Event dropped due to not having an error message, error type or stacktrace.
Event: ${Jt(t)}`),!0;if(jy(t,e.denyUrls))return C&&b.warn(`Event dropped due to being matched by \`denyUrls\` option.
Event: ${Jt(t)}.
Url: ${Wr(t)}`),!0;if(!Gy(t,e.allowUrls))return C&&b.warn(`Event dropped due to not being matched by \`allowUrls\` option.
Event: ${Jt(t)}.
Url: ${Wr(t)}`),!0}return!1}function Wy(t,e){return e?.length?kh(t).some(n=>Cs(n,e)):!1}function Vy(t,e){if(!e?.length)return!1;const n=t.transaction;return n?Cs(n,e):!1}function jy(t,e){if(!e?.length)return!1;const n=Wr(t);return n?Cs(n,e):!1}function Gy(t,e){if(!e?.length)return!0;const n=Wr(t);return n?Cs(n,e):!0}function zy(t=[]){for(let e=t.length-1;e>=0;e--){const n=t[e];if(n&&n.filename!=="<anonymous>"&&n.filename!=="[native code]")return n.filename||null}return null}function Wr(t){try{const n=[...t.exception?.values??[]].reverse().find(i=>i.mechanism?.parent_id===void 0&&i.stacktrace?.frames?.length)?.stacktrace?.frames;return n?zy(n):null}catch{return C&&b.error(`Cannot extract url for event ${Jt(t)}`),null}}function qy(t){return t.exception?.values?.length?!t.message&&!t.exception.values.some(e=>e.stacktrace||e.type&&e.type!=="Error"||e.value):!1}function Yy(t,e,n,i,r,s){if(!r.exception?.values||!s||!Mt(s.originalException,Error))return;const o=r.exception.values.length>0?r.exception.values[r.exception.values.length-1]:void 0;o&&(r.exception.values=Bo(t,e,i,s.originalException,n,r.exception.values,o,0))}function Bo(t,e,n,i,r,s,o,a){if(s.length>=n+1)return s;let c=[...s];if(Mt(i[r],Error)){lu(o,a);const l=t(e,i[r]),u=c.length;uu(l,r,u,a),c=Bo(t,e,n,i[r],r,[l,...c],l,u)}return Array.isArray(i.errors)&&i.errors.forEach((l,u)=>{if(Mt(l,Error)){lu(o,a);const d=t(e,l),h=c.length;uu(d,`errors[${u}]`,h,a),c=Bo(t,e,n,l,r,[d,...c],d,h)}}),c}function lu(t,e){t.mechanism={handled:!0,type:"auto.core.linked_errors",...t.mechanism,...t.type==="AggregateError"&&{is_exception_group:!0},exception_id:e}}function uu(t,e,n,i){t.mechanism={handled:!0,...t.mechanism,type:"chained",source:e,exception_id:n,parent_id:i}}function Ky(t){const e="console";hn(e,t),fn(e,Jy)}function Jy(){"console"in D&&nm.forEach(function(t){t in D.console&&we(D.console,t,function(e){return Hr[t]=e,function(...n){Ue("console",{args:n,level:t}),Hr[t]?.apply(D.console,n)}})})}function Xy(t){return t==="warn"?"warning":["fatal","error","warning","log","info","debug"].includes(t)?t:"log"}const Qy="Dedupe",Zy=(()=>{let t;return{name:Qy,processEvent(e){if(e.type)return e;try{if(tE(e,t))return C&&b.warn("Event dropped due to being a duplicate of previously captured event."),null}catch{}return t=e}}}),eE=Zy;function tE(t,e){return e?!!(nE(t,e)||iE(t,e)):!1}function nE(t,e){const n=t.message,i=e.message;return!(!n&&!i||n&&!i||!n&&i||n!==i||!Mh(t,e)||!Dh(t,e))}function iE(t,e){const n=du(e),i=du(t);return!(!n||!i||n.type!==i.type||n.value!==i.value||!Mh(t,e)||!Dh(t,e))}function Dh(t,e){let n=Cl(t),i=Cl(e);if(!n&&!i)return!0;if(n&&!i||!n&&i||(n=n,i=i,i.length!==n.length))return!1;for(let r=0;r<i.length;r++){const s=i[r],o=n[r];if(s.filename!==o.filename||s.lineno!==o.lineno||s.colno!==o.colno||s.function!==o.function)return!1}return!0}function Mh(t,e){let n=t.fingerprint,i=e.fingerprint;if(!n&&!i)return!0;if(n&&!i||!n&&i)return!1;n=n,i=i;try{return n.join("")===i.join("")}catch{return!1}}function du(t){return t.exception?.values?.[0]}function xh(t){if(t!==void 0)return t>=400&&t<500?"warning":t>=500?"error":void 0}const Mi=D;function rE(){return"history"in Mi&&!!Mi.history}function sE(){if(!("fetch"in Mi))return!1;try{return new Headers,new Request("data:,"),new Response,!0}catch{return!1}}function Ho(t){return t&&/^function\s+\w+\(\)\s+\{\s+\[native code\]\s+\}$/.test(t.toString())}function oE(){if(typeof EdgeRuntime=="string")return!0;if(!sE())return!1;if(Ho(Mi.fetch))return!0;let t=!1;const e=Mi.document;if(e&&typeof e.createElement=="function")try{const n=e.createElement("iframe");n.hidden=!0,e.head.appendChild(n),n.contentWindow?.fetch&&(t=Ho(n.contentWindow.fetch)),e.head.removeChild(n)}catch(n){C&&b.warn("Could not create sandbox iframe for pure fetch check, bailing to window.fetch: ",n)}return t}function aE(t,e){const n="fetch";hn(n,t),fn(n,()=>cE(void 0,e))}function cE(t,e=!1){e&&!oE()||we(D,"fetch",function(n){return function(...i){const r=new Error,{method:s,url:o}=lE(i),a={args:i,fetchData:{method:s,url:o},startTimestamp:st()*1e3,virtualError:r,headers:uE(i)};return Ue("fetch",{...a}),n.apply(D,i).then(async c=>(Ue("fetch",{...a,endTimestamp:st()*1e3,response:c}),c),c=>{if(Ue("fetch",{...a,endTimestamp:st()*1e3,error:c}),Ma(c)&&c.stack===void 0&&(c.stack=r.stack,sn(c,"framesToPop",1)),c instanceof TypeError&&(c.message==="Failed to fetch"||c.message==="Load failed"||c.message==="NetworkError when attempting to fetch resource."))try{const l=new URL(a.fetchData.url);c.message=`${c.message} (${l.host})`}catch{}throw c})}})}function Wo(t,e){return!!t&&typeof t=="object"&&!!t[e]}function hu(t){return typeof t=="string"?t:t?Wo(t,"url")?t.url:t.toString?t.toString():"":""}function lE(t){if(t.length===0)return{method:"GET",url:""};if(t.length===2){const[n,i]=t;return{url:hu(n),method:Wo(i,"method")?String(i.method).toUpperCase():"GET"}}const e=t[0];return{url:hu(e),method:Wo(e,"method")?String(e.method).toUpperCase():"GET"}}function uE(t){const[e,n]=t;try{if(typeof n=="object"&&n!==null&&"headers"in n&&n.headers)return new Headers(n.headers);if(Em(e))return new Headers(e.headers)}catch{}}function dE(){return"npm"}const Y=D;let Vo=0;function Fh(){return Vo>0}function hE(){Vo++,setTimeout(()=>{Vo--})}function Mn(t,e={}){function n(r){return typeof r=="function"}if(!n(t))return t;try{const r=t.__sentry_wrapped__;if(r)return typeof r=="function"?r:t;if($a(t))return t}catch{return t}const i=function(...r){try{const s=r.map(o=>Mn(o,e));return t.apply(this,s)}catch(s){throw hE(),$m(o=>{o.addEventProcessor(a=>(e.mechanism&&(Do(a,void 0),Ln(a,e.mechanism)),a.extra={...a.extra,arguments:r},a)),Q_(s)}),s}};try{for(const r in t)Object.prototype.hasOwnProperty.call(t,r)&&(i[r]=t[r])}catch{}rh(i,t),sn(t,"__sentry_wrapped__",i);try{Object.getOwnPropertyDescriptor(i,"name").configurable&&Object.defineProperty(i,"name",{get(){return t.name}})}catch{}return i}function fE(){const t=Ua(),{referrer:e}=Y.document||{},{userAgent:n}=Y.navigator||{},i={...e&&{Referer:e},...n&&{"User-Agent":n}};return{url:t,headers:i}}function ja(t,e){const n=Ga(t,e),i={type:yE(e),value:EE(e)};return n.length&&(i.stacktrace={frames:n}),i.type===void 0&&i.value===""&&(i.value="Unrecoverable error caught"),i}function pE(t,e,n,i){const s=me()?.getOptions().normalizeDepth,o=CE(e),a={__serialized__:_h(e,s)};if(o)return{exception:{values:[ja(t,o)]},extra:a};const c={exception:{values:[{type:Ss(e)?e.constructor.name:i?"UnhandledRejection":"Error",value:bE(e,{isUnhandledRejection:i})}]},extra:a};if(n){const l=Ga(t,n);l.length&&(c.exception.values[0].stacktrace={frames:l})}return c}function co(t,e){return{exception:{values:[ja(t,e)]}}}function Ga(t,e){const n=e.stacktrace||e.stack||"",i=mE(e),r=_E(e);try{return t(n,i,r)}catch{}return[]}const gE=/Minified React error #\d+;/i;function mE(t){return t&&gE.test(t.message)?1:0}function _E(t){return typeof t.framesToPop=="number"?t.framesToPop:0}function Uh(t){return typeof WebAssembly<"u"&&typeof WebAssembly.Exception<"u"?t instanceof WebAssembly.Exception:!1}function yE(t){const e=t?.name;return!e&&Uh(t)?t.message&&Array.isArray(t.message)&&t.message.length==2?t.message[0]:"WebAssembly.Exception":e}function EE(t){const e=t?.message;return Uh(t)?Array.isArray(t.message)&&t.message.length==2?t.message[1]:"wasm exception":e?e.error&&typeof e.error.message=="string"?e.error.message:e:"No error message"}function vE(t,e,n,i){const r=n?.syntheticException||void 0,s=za(t,e,r,i);return Ln(s),s.level="error",n?.event_id&&(s.event_id=n.event_id),Ts(s)}function wE(t,e,n="info",i,r){const s=i?.syntheticException||void 0,o=jo(t,e,s,r);return o.level=n,i?.event_id&&(o.event_id=i.event_id),Ts(o)}function za(t,e,n,i,r){let s;if(th(e)&&e.error)return co(t,e.error);if(Il(e)||gm(e)){const o=e;if("stack"in e)s=co(t,e);else{const a=o.name||(Il(o)?"DOMError":"DOMException"),c=o.message?`${a}: ${o.message}`:a;s=jo(t,c,n,i),Do(s,c)}return"code"in o&&(s.tags={...s.tags,"DOMException.code":`${o.code}`}),s}return Ma(e)?co(t,e):Oi(e)||Ss(e)?(s=pE(t,e,n,r),Ln(s,{synthetic:!0}),s):(s=jo(t,e,n,i),Do(s,`${e}`),Ln(s,{synthetic:!0}),s)}function jo(t,e,n,i){const r={};if(i&&n){const s=Ga(t,n);s.length&&(r.exception={values:[{value:e,stacktrace:{frames:s}}]}),Ln(r,{synthetic:!0})}if(xa(e)){const{__sentry_template_string__:s,__sentry_template_values__:o}=e;return r.logentry={message:s,params:o},r}return r.message=e,r}function bE(t,{isUnhandledRejection:e}){const n=Sm(t),i=e?"promise rejection":"exception";return th(t)?`Event \`ErrorEvent\` captured as ${i} with message \`${t.message}\``:Ss(t)?`Event \`${SE(t)}\` (type=${t.type}) captured as ${i}`:`Object captured as ${i} with keys: ${n}`}function SE(t){try{const e=Object.getPrototypeOf(t);return e?e.constructor.name:void 0}catch{}}function CE(t){for(const e in t)if(Object.prototype.hasOwnProperty.call(t,e)){const n=t[e];if(n instanceof Error)return n}}class TE extends _y{constructor(e){const n=IE(e),i=Y.SENTRY_SDK_SOURCE||dE();Ly(n,"browser",["browser"],i),n._metadata?.sdk&&(n._metadata.sdk.settings={infer_ip:n.sendDefaultPii?"auto":"never",...n._metadata.sdk.settings}),super(n);const{sendDefaultPii:r,sendClientReports:s,enableLogs:o,_experiments:a,enableMetrics:c}=this._options,l=c??a?.enableMetrics??!0;Y.document&&(s||o||l)&&Y.document.addEventListener("visibilitychange",()=>{Y.document.visibilityState==="hidden"&&(s&&this._flushOutcomes(),o&&Sh(this),l&&Th(this))}),r&&this.on("beforeSendSession",Ny)}eventFromException(e,n){return vE(this._options.stackParser,e,n,this._options.attachStacktrace)}eventFromMessage(e,n="info",i){return wE(this._options.stackParser,e,n,i,this._options.attachStacktrace)}_prepareEvent(e,n,i,r){return e.platform=e.platform||"javascript",super._prepareEvent(e,n,i,r)}}function IE(t){return{release:typeof __SENTRY_RELEASE__=="string"?__SENTRY_RELEASE__:Y.SENTRY_RELEASE?.id,sendClientReports:!0,parentSpanIsAlwaysRootSpan:!0,...t}}const kE=typeof __SENTRY_DEBUG__>"u"||__SENTRY_DEBUG__,he=D,RE=1e3;let fu,Go,zo;function AE(t){hn("dom",t),fn("dom",PE)}function PE(){if(!he.document)return;const t=Ue.bind(null,"dom"),e=pu(t,!0);he.document.addEventListener("click",e,!1),he.document.addEventListener("keypress",e,!1),["EventTarget","Node"].forEach(n=>{const r=he[n]?.prototype;r?.hasOwnProperty?.("addEventListener")&&(we(r,"addEventListener",function(s){return function(o,a,c){if(o==="click"||o=="keypress")try{const l=this.__sentry_instrumentation_handlers__=this.__sentry_instrumentation_handlers__||{},u=l[o]=l[o]||{refCount:0};if(!u.handler){const d=pu(t);u.handler=d,s.call(this,o,d,c)}u.refCount++}catch{}return s.call(this,o,a,c)}}),we(r,"removeEventListener",function(s){return function(o,a,c){if(o==="click"||o=="keypress")try{const l=this.__sentry_instrumentation_handlers__||{},u=l[o];u&&(u.refCount--,u.refCount<=0&&(s.call(this,o,u.handler,c),u.handler=void 0,delete l[o]),Object.keys(l).length===0&&delete this.__sentry_instrumentation_handlers__)}catch{}return s.call(this,o,a,c)}}))})}function NE(t){if(t.type!==Go)return!1;try{if(!t.target||t.target._sentryId!==zo)return!1}catch{}return!0}function LE(t,e){return t!=="keypress"?!1:e?.tagName?!(e.tagName==="INPUT"||e.tagName==="TEXTAREA"||e.isContentEditable):!0}function pu(t,e=!1){return n=>{if(!n||n._sentryCaptured)return;const i=OE(n);if(LE(n.type,i))return;sn(n,"_sentryCaptured",!0),i&&!i._sentryId&&sn(i,"_sentryId",ke());const r=n.type==="keypress"?"input":n.type;NE(n)||(t({event:n,name:r,global:e}),Go=n.type,zo=i?i._sentryId:void 0),clearTimeout(fu),fu=he.setTimeout(()=>{zo=void 0,Go=void 0},RE)}}function OE(t){try{return t.target}catch{return null}}let mr;function $h(t){const e="history";hn(e,t),fn(e,DE)}function DE(){if(he.addEventListener("popstate",()=>{const e=he.location.href,n=mr;if(mr=e,n===e)return;Ue("history",{from:n,to:e})}),!rE())return;function t(e){return function(...n){const i=n.length>2?n[2]:void 0;if(i){const r=mr,s=ME(String(i));if(mr=s,r===s)return e.apply(this,n);Ue("history",{from:r,to:s})}return e.apply(this,n)}}we(he.history,"pushState",t),we(he.history,"replaceState",t)}function ME(t){try{return new URL(t,he.location.origin).toString()}catch{return t}}const Ar={};function xE(t){const e=Ar[t];if(e)return e;let n=he[t];if(Ho(n))return Ar[t]=n.bind(he);const i=he.document;if(i&&typeof i.createElement=="function")try{const r=i.createElement("iframe");r.hidden=!0,i.head.appendChild(r);const s=r.contentWindow;s?.[t]&&(n=s[t]),i.head.removeChild(r)}catch(r){kE&&b.warn(`Could not create sandbox iframe for ${t} check, bailing to window.${t}: `,r)}return n&&(Ar[t]=n.bind(he))}function FE(t){Ar[t]=void 0}const _i="__sentry_xhr_v3__";function UE(t){hn("xhr",t),fn("xhr",$E)}function $E(){if(!he.XMLHttpRequest)return;const t=XMLHttpRequest.prototype;t.open=new Proxy(t.open,{apply(e,n,i){const r=new Error,s=st()*1e3,o=rt(i[0])?i[0].toUpperCase():void 0,a=BE(i[1]);if(!o||!a)return e.apply(n,i);n[_i]={method:o,url:a,request_headers:{}},o==="POST"&&a.match(/sentry_key/)&&(n.__sentry_own_request__=!0);const c=()=>{const l=n[_i];if(l&&n.readyState===4){try{l.status_code=n.status}catch{}const u={endTimestamp:st()*1e3,startTimestamp:s,xhr:n,virtualError:r};Ue("xhr",u)}};return"onreadystatechange"in n&&typeof n.onreadystatechange=="function"?n.onreadystatechange=new Proxy(n.onreadystatechange,{apply(l,u,d){return c(),l.apply(u,d)}}):n.addEventListener("readystatechange",c),n.setRequestHeader=new Proxy(n.setRequestHeader,{apply(l,u,d){const[h,f]=d,p=u[_i];return p&&rt(h)&&rt(f)&&(p.request_headers[h.toLowerCase()]=f),l.apply(u,d)}}),e.apply(n,i)}}),t.send=new Proxy(t.send,{apply(e,n,i){const r=n[_i];if(!r)return e.apply(n,i);i[0]!==void 0&&(r.body=i[0]);const s={startTimestamp:st()*1e3,xhr:n};return Ue("xhr",s),e.apply(n,i)}})}function BE(t){if(rt(t))return t;try{return t.toString()}catch{}}const HE=40;function WE(t,e=xE("fetch")){let n=0,i=0;async function r(s){const o=s.body.length;n+=o,i++;const a={body:s.body,method:"POST",referrerPolicy:"strict-origin",headers:t.headers,keepalive:n<=6e4&&i<15,...t.fetchOptions};try{const c=await e(t.url,a);return{statusCode:c.status,headers:{"x-sentry-rate-limits":c.headers.get("X-Sentry-Rate-Limits"),"retry-after":c.headers.get("Retry-After")}}}catch(c){throw FE("fetch"),c}finally{n-=o,i--}}return Py(t,r,Oh(t.bufferSize||HE))}const VE=30,jE=50;function qo(t,e,n,i){const r={filename:t,function:e==="<anonymous>"?rn:e,in_app:!0};return n!==void 0&&(r.lineno=n),i!==void 0&&(r.colno=i),r}const GE=/^\s*at (\S+?)(?::(\d+))(?::(\d+))\s*$/i,zE=/^\s*at (?:(.+?\)(?: \[.+\])?|.*?) ?\((?:address at )?)?(?:async )?((?:<anonymous>|[-a-z]+:|.*bundle|\/)?.*?)(?::(\d+))?(?::(\d+))?\)?\s*$/i,qE=/\((\S*)(?::(\d+))(?::(\d+))\)/,YE=/at (.+?) ?\(data:(.+?),/,KE=t=>{const e=t.match(YE);if(e)return{filename:`<data:${e[2]}>`,function:e[1]};const n=GE.exec(t);if(n){const[,r,s,o]=n;return qo(r,rn,+s,+o)}const i=zE.exec(t);if(i){if(i[2]&&i[2].indexOf("eval")===0){const a=qE.exec(i[2]);a&&(i[2]=a[1],i[3]=a[2],i[4]=a[3])}const[s,o]=Bh(i[1]||rn,i[2]);return qo(o,s,i[3]?+i[3]:void 0,i[4]?+i[4]:void 0)}},JE=[VE,KE],XE=/^\s*(.*?)(?:\((.*?)\))?(?:^|@)?((?:[-a-z]+)?:\/.*?|\[native code\]|[^@]*(?:bundle|\d+\.js)|\/[\w\-. /=]+)(?::(\d+))?(?::(\d+))?\s*$/i,QE=/(\S+) line (\d+)(?: > eval line \d+)* > eval/i,ZE=t=>{const e=XE.exec(t);if(e){if(e[3]&&e[3].indexOf(" > eval")>-1){const s=QE.exec(e[3]);s&&(e[1]=e[1]||"eval",e[3]=s[1],e[4]=s[2],e[5]="")}let i=e[3],r=e[1]||rn;return[r,i]=Bh(r,i),qo(i,r,e[4]?+e[4]:void 0,e[5]?+e[5]:void 0)}},ev=[jE,ZE],tv=[JE,ev],nv=Qd(...tv),Bh=(t,e)=>{const n=t.indexOf("safari-extension")!==-1,i=t.indexOf("safari-web-extension")!==-1;return n||i?[t.indexOf("@")!==-1?t.split("@")[0]:rn,n?`safari-extension:${e}`:`safari-web-extension:${e}`]:[t,e]},Is=typeof __SENTRY_DEBUG__>"u"||__SENTRY_DEBUG__,_r=1024,iv="Breadcrumbs",rv=((t={})=>{const e={console:!0,dom:!0,fetch:!0,history:!0,sentry:!0,xhr:!0,...t};return{name:iv,setup(n){e.console&&Ky(cv(n)),e.dom&&AE(av(n,e.dom)),e.xhr&&UE(lv(n)),e.fetch&&aE(uv(n)),e.history&&$h(dv(n)),e.sentry&&n.on("beforeSendEvent",ov(n))}}}),sv=rv;function ov(t){return function(n){me()===t&&on({category:`sentry.${n.type==="transaction"?"transaction":"event"}`,event_id:n.event_id,level:n.level,message:Jt(n)},{event:n})}}function av(t,e){return function(i){if(me()!==t)return;let r,s,o=typeof e=="object"?e.serializeAttribute:void 0,a=typeof e=="object"&&typeof e.maxStringLength=="number"?e.maxStringLength:void 0;a&&a>_r&&(Is&&b.warn(`\`dom.maxStringLength\` cannot exceed ${_r}, but a value of ${a} was configured. Sentry will use ${_r} instead.`),a=_r),typeof o=="string"&&(o=[o]);try{const l=i.event,u=hv(l)?l.target:l;r=ih(u,{keyAttrs:o,maxStringLength:a}),s=bm(u)}catch{r="<unknown>"}if(r.length===0)return;const c={category:`ui.${i.name}`,message:r};s&&(c.data={"ui.component_name":s}),on(c,{event:i.event,name:i.name,global:i.global})}}function cv(t){return function(n){if(me()!==t)return;const i={category:"console",data:{arguments:n.args,logger:"console"},level:Xy(n.level),message:Al(n.args," ")};if(n.level==="assert")if(n.args[0]===!1)i.message=`Assertion failed: ${Al(n.args.slice(1)," ")||"console.assert"}`,i.data.arguments=n.args.slice(1);else return;on(i,{input:n.args,level:n.level})}}function lv(t){return function(n){if(me()!==t)return;const{startTimestamp:i,endTimestamp:r}=n,s=n.xhr[_i];if(!i||!r||!s)return;const{method:o,url:a,status_code:c,body:l}=s,u={method:o,url:a,status_code:c},d={xhr:n.xhr,input:l,startTimestamp:i,endTimestamp:r},h={category:"xhr",data:u,type:"http",level:xh(c)};t.emit("beforeOutgoingRequestBreadcrumb",h,d),on(h,d)}}function uv(t){return function(n){if(me()!==t)return;const{startTimestamp:i,endTimestamp:r}=n;if(r&&!(n.fetchData.url.match(/sentry_key/)&&n.fetchData.method==="POST"))if(n.fetchData.method,n.fetchData.url,n.error){const s=n.fetchData,o={data:n.error,input:n.args,startTimestamp:i,endTimestamp:r},a={category:"fetch",data:s,level:"error",type:"http"};t.emit("beforeOutgoingRequestBreadcrumb",a,o),on(a,o)}else{const s=n.response,o={...n.fetchData,status_code:s?.status};n.fetchData.request_body_size,n.fetchData.response_body_size,s?.status;const a={input:n.args,response:s,startTimestamp:i,endTimestamp:r},c={category:"fetch",data:o,type:"http",level:xh(o.status_code)};t.emit("beforeOutgoingRequestBreadcrumb",c,a),on(c,a)}}}function dv(t){return function(n){if(me()!==t)return;let i=n.from,r=n.to;const s=ao(Y.location.href);let o=i?ao(i):void 0;const a=ao(r);o?.path||(o=s),s.protocol===a.protocol&&s.host===a.host&&(r=a.relative),s.protocol===o.protocol&&s.host===o.host&&(i=o.relative),on({category:"navigation",data:{from:i,to:r}})}}function hv(t){return!!t&&!!t.target}const fv=["EventTarget","Window","Node","ApplicationCache","AudioTrackList","BroadcastChannel","ChannelMergerNode","CryptoOperation","EventSource","FileReader","HTMLUnknownElement","IDBDatabase","IDBRequest","IDBTransaction","KeyOperation","MediaController","MessagePort","ModalWindow","Notification","SVGElementInstance","Screen","SharedWorker","TextTrack","TextTrackCue","TextTrackList","WebSocket","WebSocketWorker","Worker","XMLHttpRequest","XMLHttpRequestEventTarget","XMLHttpRequestUpload"],pv="BrowserApiErrors",gv=((t={})=>{const e={XMLHttpRequest:!0,eventTarget:!0,requestAnimationFrame:!0,setInterval:!0,setTimeout:!0,unregisterOriginalCallbacks:!1,...t};return{name:pv,setupOnce(){e.setTimeout&&we(Y,"setTimeout",gu),e.setInterval&&we(Y,"setInterval",gu),e.requestAnimationFrame&&we(Y,"requestAnimationFrame",_v),e.XMLHttpRequest&&"XMLHttpRequest"in Y&&we(XMLHttpRequest.prototype,"send",yv);const n=e.eventTarget;n&&(Array.isArray(n)?n:fv).forEach(r=>Ev(r,e))}}}),mv=gv;function gu(t){return function(...e){const n=e[0];return e[0]=Mn(n,{mechanism:{handled:!1,type:`auto.browser.browserapierrors.${Dt(t)}`}}),t.apply(this,e)}}function _v(t){return function(e){return t.apply(this,[Mn(e,{mechanism:{data:{handler:Dt(t)},handled:!1,type:"auto.browser.browserapierrors.requestAnimationFrame"}})])}}function yv(t){return function(...e){const n=this;return["onload","onerror","onprogress","onreadystatechange"].forEach(r=>{r in n&&typeof n[r]=="function"&&we(n,r,function(s){const o={mechanism:{data:{handler:Dt(s)},handled:!1,type:`auto.browser.browserapierrors.xhr.${r}`}},a=$a(s);return a&&(o.mechanism.data.handler=Dt(a)),Mn(s,o)})}),t.apply(this,e)}}function Ev(t,e){const i=Y[t]?.prototype;i?.hasOwnProperty?.("addEventListener")&&(we(i,"addEventListener",function(r){return function(s,o,a){try{vv(o)&&(o.handleEvent=Mn(o.handleEvent,{mechanism:{data:{handler:Dt(o),target:t},handled:!1,type:"auto.browser.browserapierrors.handleEvent"}}))}catch{}return e.unregisterOriginalCallbacks&&wv(this,s,o),r.apply(this,[s,Mn(o,{mechanism:{data:{handler:Dt(o),target:t},handled:!1,type:"auto.browser.browserapierrors.addEventListener"}}),a])}}),we(i,"removeEventListener",function(r){return function(s,o,a){try{const c=o.__sentry_wrapped__;c&&r.call(this,s,c,a)}catch{}return r.call(this,s,o,a)}}))}function vv(t){return typeof t.handleEvent=="function"}function wv(t,e,n){t&&typeof t=="object"&&"removeEventListener"in t&&typeof t.removeEventListener=="function"&&t.removeEventListener(e,n)}const bv=()=>({name:"BrowserSession",setupOnce(){if(typeof Y.document>"u"){Is&&b.warn("Using the `browserSessionIntegration` in non-browser environments is not supported.");return}Jl({ignoreDuration:!0}),Xl(),$h(({from:t,to:e})=>{t!==void 0&&t!==e&&(Jl({ignoreDuration:!0}),Xl())})}}),Sv="GlobalHandlers",Cv=((t={})=>{const e={onerror:!0,onunhandledrejection:!0,...t};return{name:Sv,setupOnce(){Error.stackTraceLimit=50},setup(n){e.onerror&&(Iv(n),mu("onerror")),e.onunhandledrejection&&(kv(n),mu("onunhandledrejection"))}}}),Tv=Cv;function Iv(t){dm(e=>{const{stackParser:n,attachStacktrace:i}=Hh();if(me()!==t||Fh())return;const{msg:r,url:s,line:o,column:a,error:c}=e,l=Pv(za(n,c||r,void 0,i,!1),s,o,a);l.level="error",Eh(l,{originalException:c,mechanism:{handled:!1,type:"auto.browser.global_handlers.onerror"}})})}function kv(t){fm(e=>{const{stackParser:n,attachStacktrace:i}=Hh();if(me()!==t||Fh())return;const r=Rv(e),s=bs(r)?Av(r):za(n,r,void 0,i,!0);s.level="error",Eh(s,{originalException:r,mechanism:{handled:!1,type:"auto.browser.global_handlers.onunhandledrejection"}})})}function Rv(t){if(bs(t))return t;try{if("reason"in t)return t.reason;if("detail"in t&&"reason"in t.detail)return t.detail.reason}catch{}return t}function Av(t){return{exception:{values:[{type:"UnhandledRejection",value:`Non-Error promise rejection captured with value: ${String(t)}`}]}}}function Pv(t,e,n,i){const r=t.exception=t.exception||{},s=r.values=r.values||[],o=s[0]=s[0]||{},a=o.stacktrace=o.stacktrace||{},c=a.frames=a.frames||[],l=i,u=n,d=Nv(e)??Ua();return c.length===0&&c.push({colno:l,filename:d,function:rn,in_app:!0,lineno:u}),t}function mu(t){Is&&b.log(`Global Handler attached: ${t}`)}function Hh(){return me()?.getOptions()||{stackParser:()=>[],attachStacktrace:!1}}function Nv(t){if(!(!rt(t)||t.length===0)){if(t.startsWith("data:")){const e=t.match(/^data:([^;]+)/),n=e?e[1]:"text/javascript",i=t.includes("base64,");return`<data:${n}${i?",base64":""}>`}return t}}const Lv=()=>({name:"HttpContext",preprocessEvent(t){if(!Y.navigator&&!Y.location&&!Y.document)return;const e=fE(),n={...e.headers,...t.request?.headers};t.request={...e,...t.request,headers:n}}}),Ov="cause",Dv=5,Mv="LinkedErrors",xv=((t={})=>{const e=t.limit||Dv,n=t.key||Ov;return{name:Mv,preprocessEvent(i,r,s){const o=s.getOptions();Yy(ja,o.stackParser,n,e,i,r)}}}),Fv=xv;function Uv(){return $v()?(Is&&Yn(()=>{console.error("[Sentry] You cannot use Sentry.init() in a browser extension, see: https://docs.sentry.io/platforms/javascript/best-practices/browser-extensions/")}),!0):!1}function $v(){if(typeof Y.window>"u")return!1;const t=Y;if(t.nw||!(t.chrome||t.browser)?.runtime?.id)return!1;const n=Ua(),i=["chrome-extension","moz-extension","ms-browser-extension","safari-web-extension"];return!(Y===Y.top&&i.some(s=>n.startsWith(`${s}://`)))}function Bv(t){return[By(),xy(),mv(),sv(),Tv(),Fv(),eE(),Lv(),bv()]}function Hv(t={}){const e=!t.skipBrowserExtensionCheck&&Uv();let n=t.defaultIntegrations==null?Bv():t.defaultIntegrations;const i={...t,enabled:e?!1:t.enabled,stackParser:lm(t.stackParser||nv),integrations:sy({integrations:t.integrations,defaultIntegrations:n}),transport:t.transport||WE};return by(TE,i)}const Wv="https://adc1b5518c6a55273a1398d1b8b9cd3e@o4510415124496384.ingest.de.sentry.io/4510415129083984";Hv({dsn:Wv,sendDefaultPii:!0});/**
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
 */const Vv=()=>{};var _u={};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Wh={NODE_ADMIN:!1,SDK_VERSION:"${JSCORE_VERSION}"};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const g=function(t,e){if(!t)throw Xn(e)},Xn=function(t){return new Error("Firebase Database ("+Wh.SDK_VERSION+") INTERNAL ASSERT FAILED: "+t)};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Vh=function(t){const e=[];let n=0;for(let i=0;i<t.length;i++){let r=t.charCodeAt(i);r<128?e[n++]=r:r<2048?(e[n++]=r>>6|192,e[n++]=r&63|128):(r&64512)===55296&&i+1<t.length&&(t.charCodeAt(i+1)&64512)===56320?(r=65536+((r&1023)<<10)+(t.charCodeAt(++i)&1023),e[n++]=r>>18|240,e[n++]=r>>12&63|128,e[n++]=r>>6&63|128,e[n++]=r&63|128):(e[n++]=r>>12|224,e[n++]=r>>6&63|128,e[n++]=r&63|128)}return e},jv=function(t){const e=[];let n=0,i=0;for(;n<t.length;){const r=t[n++];if(r<128)e[i++]=String.fromCharCode(r);else if(r>191&&r<224){const s=t[n++];e[i++]=String.fromCharCode((r&31)<<6|s&63)}else if(r>239&&r<365){const s=t[n++],o=t[n++],a=t[n++],c=((r&7)<<18|(s&63)<<12|(o&63)<<6|a&63)-65536;e[i++]=String.fromCharCode(55296+(c>>10)),e[i++]=String.fromCharCode(56320+(c&1023))}else{const s=t[n++],o=t[n++];e[i++]=String.fromCharCode((r&15)<<12|(s&63)<<6|o&63)}}return e.join("")},ks={byteToCharMap_:null,charToByteMap_:null,byteToCharMapWebSafe_:null,charToByteMapWebSafe_:null,ENCODED_VALS_BASE:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",get ENCODED_VALS(){return this.ENCODED_VALS_BASE+"+/="},get ENCODED_VALS_WEBSAFE(){return this.ENCODED_VALS_BASE+"-_."},HAS_NATIVE_SUPPORT:typeof atob=="function",encodeByteArray(t,e){if(!Array.isArray(t))throw Error("encodeByteArray takes an array as a parameter");this.init_();const n=e?this.byteToCharMapWebSafe_:this.byteToCharMap_,i=[];for(let r=0;r<t.length;r+=3){const s=t[r],o=r+1<t.length,a=o?t[r+1]:0,c=r+2<t.length,l=c?t[r+2]:0,u=s>>2,d=(s&3)<<4|a>>4;let h=(a&15)<<2|l>>6,f=l&63;c||(f=64,o||(h=64)),i.push(n[u],n[d],n[h],n[f])}return i.join("")},encodeString(t,e){return this.HAS_NATIVE_SUPPORT&&!e?btoa(t):this.encodeByteArray(Vh(t),e)},decodeString(t,e){return this.HAS_NATIVE_SUPPORT&&!e?atob(t):jv(this.decodeStringToByteArray(t,e))},decodeStringToByteArray(t,e){this.init_();const n=e?this.charToByteMapWebSafe_:this.charToByteMap_,i=[];for(let r=0;r<t.length;){const s=n[t.charAt(r++)],a=r<t.length?n[t.charAt(r)]:0;++r;const l=r<t.length?n[t.charAt(r)]:64;++r;const d=r<t.length?n[t.charAt(r)]:64;if(++r,s==null||a==null||l==null||d==null)throw new Gv;const h=s<<2|a>>4;if(i.push(h),l!==64){const f=a<<4&240|l>>2;if(i.push(f),d!==64){const p=l<<6&192|d;i.push(p)}}}return i},init_(){if(!this.byteToCharMap_){this.byteToCharMap_={},this.charToByteMap_={},this.byteToCharMapWebSafe_={},this.charToByteMapWebSafe_={};for(let t=0;t<this.ENCODED_VALS.length;t++)this.byteToCharMap_[t]=this.ENCODED_VALS.charAt(t),this.charToByteMap_[this.byteToCharMap_[t]]=t,this.byteToCharMapWebSafe_[t]=this.ENCODED_VALS_WEBSAFE.charAt(t),this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[t]]=t,t>=this.ENCODED_VALS_BASE.length&&(this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(t)]=t,this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(t)]=t)}}};class Gv extends Error{constructor(){super(...arguments),this.name="DecodeBase64StringError"}}const jh=function(t){const e=Vh(t);return ks.encodeByteArray(e,!0)},Vr=function(t){return jh(t).replace(/\./g,"")},jr=function(t){try{return ks.decodeString(t,!0)}catch(e){console.error("base64Decode failed: ",e)}return null};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function zv(t){return Gh(void 0,t)}function Gh(t,e){if(!(e instanceof Object))return e;switch(e.constructor){case Date:const n=e;return new Date(n.getTime());case Object:t===void 0&&(t={});break;case Array:t=[];break;default:return e}for(const n in e)!e.hasOwnProperty(n)||!qv(n)||(t[n]=Gh(t[n],e[n]));return t}function qv(t){return t!=="__proto__"}/**
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
 */function zh(){if(typeof self<"u")return self;if(typeof window<"u")return window;if(typeof global<"u")return global;throw new Error("Unable to locate global object.")}/**
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
 */const Yv=()=>zh().__FIREBASE_DEFAULTS__,Kv=()=>{if(typeof process>"u"||typeof _u>"u")return;const t=_u.__FIREBASE_DEFAULTS__;if(t)return JSON.parse(t)},Jv=()=>{if(typeof document>"u")return;let t;try{t=document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/)}catch{return}const e=t&&jr(t[1]);return e&&JSON.parse(e)},qa=()=>{try{return Vv()||Yv()||Kv()||Jv()}catch(t){console.info(`Unable to get __FIREBASE_DEFAULTS__ due to: ${t}`);return}},qh=t=>qa()?.emulatorHosts?.[t],Xv=t=>{const e=qh(t);if(!e)return;const n=e.lastIndexOf(":");if(n<=0||n+1===e.length)throw new Error(`Invalid host ${e} with no separate hostname and port!`);const i=parseInt(e.substring(n+1),10);return e[0]==="["?[e.substring(1,n-1),i]:[e.substring(0,n),i]},Yh=()=>qa()?.config,Kh=t=>qa()?.[`_${t}`];/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class lt{constructor(){this.reject=()=>{},this.resolve=()=>{},this.promise=new Promise((e,n)=>{this.resolve=e,this.reject=n})}wrapCallback(e){return(n,i)=>{n?this.reject(n):this.resolve(i),typeof e=="function"&&(this.promise.catch(()=>{}),e.length===1?e(n):e(n,i))}}}/**
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
 */function Qn(t){try{return(t.startsWith("http://")||t.startsWith("https://")?new URL(t).hostname:t).endsWith(".cloudworkstations.dev")}catch{return!1}}async function Jh(t){return(await fetch(t,{credentials:"include"})).ok}/**
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
 */function Qv(t,e){if(t.uid)throw new Error('The "uid" field is no longer supported by mockUserToken. Please use "sub" instead for Firebase Auth User ID.');const n={alg:"none",type:"JWT"},i=e||"demo-project",r=t.iat||0,s=t.sub||t.user_id;if(!s)throw new Error("mockUserToken must contain 'sub' or 'user_id' field!");const o={iss:`https://securetoken.google.com/${i}`,aud:i,iat:r,exp:r+3600,auth_time:r,sub:s,user_id:s,firebase:{sign_in_provider:"custom",identities:{}},...t};return[Vr(JSON.stringify(n)),Vr(JSON.stringify(o)),""].join(".")}const vi={};function Zv(){const t={prod:[],emulator:[]};for(const e of Object.keys(vi))vi[e]?t.emulator.push(e):t.prod.push(e);return t}function ew(t){let e=document.getElementById(t),n=!1;return e||(e=document.createElement("div"),e.setAttribute("id",t),n=!0),{created:n,element:e}}let yu=!1;function Xh(t,e){if(typeof window>"u"||typeof document>"u"||!Qn(window.location.host)||vi[t]===e||vi[t]||yu)return;vi[t]=e;function n(h){return`__firebase__banner__${h}`}const i="__firebase__banner",s=Zv().prod.length>0;function o(){const h=document.getElementById(i);h&&h.remove()}function a(h){h.style.display="flex",h.style.background="#7faaf0",h.style.position="fixed",h.style.bottom="5px",h.style.left="5px",h.style.padding=".5em",h.style.borderRadius="5px",h.style.alignItems="center"}function c(h,f){h.setAttribute("width","24"),h.setAttribute("id",f),h.setAttribute("height","24"),h.setAttribute("viewBox","0 0 24 24"),h.setAttribute("fill","none"),h.style.marginLeft="-6px"}function l(){const h=document.createElement("span");return h.style.cursor="pointer",h.style.marginLeft="16px",h.style.fontSize="24px",h.innerHTML=" &times;",h.onclick=()=>{yu=!0,o()},h}function u(h,f){h.setAttribute("id",f),h.innerText="Learn more",h.href="https://firebase.google.com/docs/studio/preview-apps#preview-backend",h.setAttribute("target","__blank"),h.style.paddingLeft="5px",h.style.textDecoration="underline"}function d(){const h=ew(i),f=n("text"),p=document.getElementById(f)||document.createElement("span"),E=n("learnmore"),m=document.getElementById(E)||document.createElement("a"),T=n("preprendIcon"),N=document.getElementById(T)||document.createElementNS("http://www.w3.org/2000/svg","svg");if(h.created){const de=h.element;a(de),u(m,E);const _=l();c(N,T),de.append(N,p,m,_),document.body.appendChild(de)}s?(p.innerText="Preview backend disconnected.",N.innerHTML=`<g clip-path="url(#clip0_6013_33858)">
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
 */function ge(){return typeof navigator<"u"&&typeof navigator.userAgent=="string"?navigator.userAgent:""}function Ya(){return typeof window<"u"&&!!(window.cordova||window.phonegap||window.PhoneGap)&&/ios|iphone|ipod|ipad|android|blackberry|iemobile/i.test(ge())}function tw(){return typeof navigator<"u"&&navigator.userAgent==="Cloudflare-Workers"}function nw(){const t=typeof chrome=="object"?chrome.runtime:typeof browser=="object"?browser.runtime:void 0;return typeof t=="object"&&t.id!==void 0}function Qh(){return typeof navigator=="object"&&navigator.product==="ReactNative"}function iw(){const t=ge();return t.indexOf("MSIE ")>=0||t.indexOf("Trident/")>=0}function rw(){return Wh.NODE_ADMIN===!0}function Ka(){try{return typeof indexedDB=="object"}catch{return!1}}function sw(){return new Promise((t,e)=>{try{let n=!0;const i="validate-browser-context-for-indexeddb-analytics-module",r=self.indexedDB.open(i);r.onsuccess=()=>{r.result.close(),n||self.indexedDB.deleteDatabase(i),t(!0)},r.onupgradeneeded=()=>{n=!1},r.onerror=()=>{e(r.error?.message||"")}}catch(n){e(n)}})}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ow="FirebaseError";class Ht extends Error{constructor(e,n,i){super(n),this.code=e,this.customData=i,this.name=ow,Object.setPrototypeOf(this,Ht.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,Zn.prototype.create)}}class Zn{constructor(e,n,i){this.service=e,this.serviceName=n,this.errors=i}create(e,...n){const i=n[0]||{},r=`${this.service}/${e}`,s=this.errors[e],o=s?aw(s,i):"Error",a=`${this.serviceName}: ${o} (${r}).`;return new Ht(r,a,i)}}function aw(t,e){return t.replace(cw,(n,i)=>{const r=e[i];return r!=null?String(r):`<${i}?>`})}const cw=/\{\$([^}]+)}/g;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function xi(t){return JSON.parse(t)}function X(t){return JSON.stringify(t)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Zh=function(t){let e={},n={},i={},r="";try{const s=t.split(".");e=xi(jr(s[0])||""),n=xi(jr(s[1])||""),r=s[2],i=n.d||{},delete n.d}catch{}return{header:e,claims:n,data:i,signature:r}},lw=function(t){const e=Zh(t),n=e.claims;return!!n&&typeof n=="object"&&n.hasOwnProperty("iat")},uw=function(t){const e=Zh(t).claims;return typeof e=="object"&&e.admin===!0};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ke(t,e){return Object.prototype.hasOwnProperty.call(t,e)}function xn(t,e){if(Object.prototype.hasOwnProperty.call(t,e))return t[e]}function Yo(t){for(const e in t)if(Object.prototype.hasOwnProperty.call(t,e))return!1;return!0}function Gr(t,e,n){const i={};for(const r in t)Object.prototype.hasOwnProperty.call(t,r)&&(i[r]=e.call(n,t[r],r,t));return i}function an(t,e){if(t===e)return!0;const n=Object.keys(t),i=Object.keys(e);for(const r of n){if(!i.includes(r))return!1;const s=t[r],o=e[r];if(Eu(s)&&Eu(o)){if(!an(s,o))return!1}else if(s!==o)return!1}for(const r of i)if(!n.includes(r))return!1;return!0}function Eu(t){return t!==null&&typeof t=="object"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ei(t){const e=[];for(const[n,i]of Object.entries(t))Array.isArray(i)?i.forEach(r=>{e.push(encodeURIComponent(n)+"="+encodeURIComponent(r))}):e.push(encodeURIComponent(n)+"="+encodeURIComponent(i));return e.length?"&"+e.join("&"):""}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class dw{constructor(){this.chain_=[],this.buf_=[],this.W_=[],this.pad_=[],this.inbuf_=0,this.total_=0,this.blockSize=512/8,this.pad_[0]=128;for(let e=1;e<this.blockSize;++e)this.pad_[e]=0;this.reset()}reset(){this.chain_[0]=1732584193,this.chain_[1]=4023233417,this.chain_[2]=2562383102,this.chain_[3]=271733878,this.chain_[4]=3285377520,this.inbuf_=0,this.total_=0}compress_(e,n){n||(n=0);const i=this.W_;if(typeof e=="string")for(let d=0;d<16;d++)i[d]=e.charCodeAt(n)<<24|e.charCodeAt(n+1)<<16|e.charCodeAt(n+2)<<8|e.charCodeAt(n+3),n+=4;else for(let d=0;d<16;d++)i[d]=e[n]<<24|e[n+1]<<16|e[n+2]<<8|e[n+3],n+=4;for(let d=16;d<80;d++){const h=i[d-3]^i[d-8]^i[d-14]^i[d-16];i[d]=(h<<1|h>>>31)&4294967295}let r=this.chain_[0],s=this.chain_[1],o=this.chain_[2],a=this.chain_[3],c=this.chain_[4],l,u;for(let d=0;d<80;d++){d<40?d<20?(l=a^s&(o^a),u=1518500249):(l=s^o^a,u=1859775393):d<60?(l=s&o|a&(s|o),u=2400959708):(l=s^o^a,u=3395469782);const h=(r<<5|r>>>27)+l+c+u+i[d]&4294967295;c=a,a=o,o=(s<<30|s>>>2)&4294967295,s=r,r=h}this.chain_[0]=this.chain_[0]+r&4294967295,this.chain_[1]=this.chain_[1]+s&4294967295,this.chain_[2]=this.chain_[2]+o&4294967295,this.chain_[3]=this.chain_[3]+a&4294967295,this.chain_[4]=this.chain_[4]+c&4294967295}update(e,n){if(e==null)return;n===void 0&&(n=e.length);const i=n-this.blockSize;let r=0;const s=this.buf_;let o=this.inbuf_;for(;r<n;){if(o===0)for(;r<=i;)this.compress_(e,r),r+=this.blockSize;if(typeof e=="string"){for(;r<n;)if(s[o]=e.charCodeAt(r),++o,++r,o===this.blockSize){this.compress_(s),o=0;break}}else for(;r<n;)if(s[o]=e[r],++o,++r,o===this.blockSize){this.compress_(s),o=0;break}}this.inbuf_=o,this.total_+=n}digest(){const e=[];let n=this.total_*8;this.inbuf_<56?this.update(this.pad_,56-this.inbuf_):this.update(this.pad_,this.blockSize-(this.inbuf_-56));for(let r=this.blockSize-1;r>=56;r--)this.buf_[r]=n&255,n/=256;this.compress_(this.buf_);let i=0;for(let r=0;r<5;r++)for(let s=24;s>=0;s-=8)e[i]=this.chain_[r]>>s&255,++i;return e}}function hw(t,e){const n=new fw(t,e);return n.subscribe.bind(n)}class fw{constructor(e,n){this.observers=[],this.unsubscribes=[],this.observerCount=0,this.task=Promise.resolve(),this.finalized=!1,this.onNoObservers=n,this.task.then(()=>{e(this)}).catch(i=>{this.error(i)})}next(e){this.forEachObserver(n=>{n.next(e)})}error(e){this.forEachObserver(n=>{n.error(e)}),this.close(e)}complete(){this.forEachObserver(e=>{e.complete()}),this.close()}subscribe(e,n,i){let r;if(e===void 0&&n===void 0&&i===void 0)throw new Error("Missing Observer.");pw(e,["next","error","complete"])?r=e:r={next:e,error:n,complete:i},r.next===void 0&&(r.next=lo),r.error===void 0&&(r.error=lo),r.complete===void 0&&(r.complete=lo);const s=this.unsubscribeOne.bind(this,this.observers.length);return this.finalized&&this.task.then(()=>{try{this.finalError?r.error(this.finalError):r.complete()}catch{}}),this.observers.push(r),s}unsubscribeOne(e){this.observers===void 0||this.observers[e]===void 0||(delete this.observers[e],this.observerCount-=1,this.observerCount===0&&this.onNoObservers!==void 0&&this.onNoObservers(this))}forEachObserver(e){if(!this.finalized)for(let n=0;n<this.observers.length;n++)this.sendOne(n,e)}sendOne(e,n){this.task.then(()=>{if(this.observers!==void 0&&this.observers[e]!==void 0)try{n(this.observers[e])}catch(i){typeof console<"u"&&console.error&&console.error(i)}})}close(e){this.finalized||(this.finalized=!0,e!==void 0&&(this.finalError=e),this.task.then(()=>{this.observers=void 0,this.onNoObservers=void 0}))}}function pw(t,e){if(typeof t!="object"||t===null)return!1;for(const n of e)if(n in t&&typeof t[n]=="function")return!0;return!1}function lo(){}function Rs(t,e){return`${t} failed: ${e} argument `}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const gw=function(t){const e=[];let n=0;for(let i=0;i<t.length;i++){let r=t.charCodeAt(i);if(r>=55296&&r<=56319){const s=r-55296;i++,g(i<t.length,"Surrogate pair missing trail surrogate.");const o=t.charCodeAt(i)-56320;r=65536+(s<<10)+o}r<128?e[n++]=r:r<2048?(e[n++]=r>>6|192,e[n++]=r&63|128):r<65536?(e[n++]=r>>12|224,e[n++]=r>>6&63|128,e[n++]=r&63|128):(e[n++]=r>>18|240,e[n++]=r>>12&63|128,e[n++]=r>>6&63|128,e[n++]=r&63|128)}return e},As=function(t){let e=0;for(let n=0;n<t.length;n++){const i=t.charCodeAt(n);i<128?e++:i<2048?e+=2:i>=55296&&i<=56319?(e+=4,n++):e+=3}return e};/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const mw=1e3,_w=2,yw=14400*1e3,Ew=.5;function vw(t,e=mw,n=_w){const i=e*Math.pow(n,t),r=Math.round(Ew*i*(Math.random()-.5)*2);return Math.min(yw,i+r)}/**
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
 */function ce(t){return t&&t._delegate?t._delegate:t}class ut{constructor(e,n,i){this.name=e,this.instanceFactory=n,this.type=i,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}setInstantiationMode(e){return this.instantiationMode=e,this}setMultipleInstances(e){return this.multipleInstances=e,this}setServiceProps(e){return this.serviceProps=e,this}setInstanceCreatedCallback(e){return this.onInstanceCreated=e,this}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
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
 */class ww{constructor(e,n){this.name=e,this.container=n,this.component=null,this.instances=new Map,this.instancesDeferred=new Map,this.instancesOptions=new Map,this.onInitCallbacks=new Map}get(e){const n=this.normalizeInstanceIdentifier(e);if(!this.instancesDeferred.has(n)){const i=new lt;if(this.instancesDeferred.set(n,i),this.isInitialized(n)||this.shouldAutoInitialize())try{const r=this.getOrInitializeService({instanceIdentifier:n});r&&i.resolve(r)}catch{}}return this.instancesDeferred.get(n).promise}getImmediate(e){const n=this.normalizeInstanceIdentifier(e?.identifier),i=e?.optional??!1;if(this.isInitialized(n)||this.shouldAutoInitialize())try{return this.getOrInitializeService({instanceIdentifier:n})}catch(r){if(i)return null;throw r}else{if(i)return null;throw Error(`Service ${this.name} is not available`)}}getComponent(){return this.component}setComponent(e){if(e.name!==this.name)throw Error(`Mismatching Component ${e.name} for Provider ${this.name}.`);if(this.component)throw Error(`Component for ${this.name} has already been provided`);if(this.component=e,!!this.shouldAutoInitialize()){if(Sw(e))try{this.getOrInitializeService({instanceIdentifier:Yt})}catch{}for(const[n,i]of this.instancesDeferred.entries()){const r=this.normalizeInstanceIdentifier(n);try{const s=this.getOrInitializeService({instanceIdentifier:r});i.resolve(s)}catch{}}}}clearInstance(e=Yt){this.instancesDeferred.delete(e),this.instancesOptions.delete(e),this.instances.delete(e)}async delete(){const e=Array.from(this.instances.values());await Promise.all([...e.filter(n=>"INTERNAL"in n).map(n=>n.INTERNAL.delete()),...e.filter(n=>"_delete"in n).map(n=>n._delete())])}isComponentSet(){return this.component!=null}isInitialized(e=Yt){return this.instances.has(e)}getOptions(e=Yt){return this.instancesOptions.get(e)||{}}initialize(e={}){const{options:n={}}=e,i=this.normalizeInstanceIdentifier(e.instanceIdentifier);if(this.isInitialized(i))throw Error(`${this.name}(${i}) has already been initialized`);if(!this.isComponentSet())throw Error(`Component ${this.name} has not been registered yet`);const r=this.getOrInitializeService({instanceIdentifier:i,options:n});for(const[s,o]of this.instancesDeferred.entries()){const a=this.normalizeInstanceIdentifier(s);i===a&&o.resolve(r)}return r}onInit(e,n){const i=this.normalizeInstanceIdentifier(n),r=this.onInitCallbacks.get(i)??new Set;r.add(e),this.onInitCallbacks.set(i,r);const s=this.instances.get(i);return s&&e(s,i),()=>{r.delete(e)}}invokeOnInitCallbacks(e,n){const i=this.onInitCallbacks.get(n);if(i)for(const r of i)try{r(e,n)}catch{}}getOrInitializeService({instanceIdentifier:e,options:n={}}){let i=this.instances.get(e);if(!i&&this.component&&(i=this.component.instanceFactory(this.container,{instanceIdentifier:bw(e),options:n}),this.instances.set(e,i),this.instancesOptions.set(e,n),this.invokeOnInitCallbacks(i,e),this.component.onInstanceCreated))try{this.component.onInstanceCreated(this.container,e,i)}catch{}return i||null}normalizeInstanceIdentifier(e=Yt){return this.component?this.component.multipleInstances?e:Yt:e}shouldAutoInitialize(){return!!this.component&&this.component.instantiationMode!=="EXPLICIT"}}function bw(t){return t===Yt?void 0:t}function Sw(t){return t.instantiationMode==="EAGER"}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Cw{constructor(e){this.name=e,this.providers=new Map}addComponent(e){const n=this.getProvider(e.name);if(n.isComponentSet())throw new Error(`Component ${e.name} has already been registered with ${this.name}`);n.setComponent(e)}addOrOverwriteComponent(e){this.getProvider(e.name).isComponentSet()&&this.providers.delete(e.name),this.addComponent(e)}getProvider(e){if(this.providers.has(e))return this.providers.get(e);const n=new ww(e,this);return this.providers.set(e,n),n}getProviders(){return Array.from(this.providers.values())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var O;(function(t){t[t.DEBUG=0]="DEBUG",t[t.VERBOSE=1]="VERBOSE",t[t.INFO=2]="INFO",t[t.WARN=3]="WARN",t[t.ERROR=4]="ERROR",t[t.SILENT=5]="SILENT"})(O||(O={}));const Tw={debug:O.DEBUG,verbose:O.VERBOSE,info:O.INFO,warn:O.WARN,error:O.ERROR,silent:O.SILENT},Iw=O.INFO,kw={[O.DEBUG]:"log",[O.VERBOSE]:"log",[O.INFO]:"info",[O.WARN]:"warn",[O.ERROR]:"error"},Rw=(t,e,...n)=>{if(e<t.logLevel)return;const i=new Date().toISOString(),r=kw[e];if(r)console[r](`[${i}]  ${t.name}:`,...n);else throw new Error(`Attempted to log a message with an invalid logType (value: ${e})`)};class Ps{constructor(e){this.name=e,this._logLevel=Iw,this._logHandler=Rw,this._userLogHandler=null}get logLevel(){return this._logLevel}set logLevel(e){if(!(e in O))throw new TypeError(`Invalid value "${e}" assigned to \`logLevel\``);this._logLevel=e}setLogLevel(e){this._logLevel=typeof e=="string"?Tw[e]:e}get logHandler(){return this._logHandler}set logHandler(e){if(typeof e!="function")throw new TypeError("Value assigned to `logHandler` must be a function");this._logHandler=e}get userLogHandler(){return this._userLogHandler}set userLogHandler(e){this._userLogHandler=e}debug(...e){this._userLogHandler&&this._userLogHandler(this,O.DEBUG,...e),this._logHandler(this,O.DEBUG,...e)}log(...e){this._userLogHandler&&this._userLogHandler(this,O.VERBOSE,...e),this._logHandler(this,O.VERBOSE,...e)}info(...e){this._userLogHandler&&this._userLogHandler(this,O.INFO,...e),this._logHandler(this,O.INFO,...e)}warn(...e){this._userLogHandler&&this._userLogHandler(this,O.WARN,...e),this._logHandler(this,O.WARN,...e)}error(...e){this._userLogHandler&&this._userLogHandler(this,O.ERROR,...e),this._logHandler(this,O.ERROR,...e)}}const Aw=(t,e)=>e.some(n=>t instanceof n);let vu,wu;function Pw(){return vu||(vu=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])}function Nw(){return wu||(wu=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])}const ef=new WeakMap,Ko=new WeakMap,tf=new WeakMap,uo=new WeakMap,Ja=new WeakMap;function Lw(t){const e=new Promise((n,i)=>{const r=()=>{t.removeEventListener("success",s),t.removeEventListener("error",o)},s=()=>{n(At(t.result)),r()},o=()=>{i(t.error),r()};t.addEventListener("success",s),t.addEventListener("error",o)});return e.then(n=>{n instanceof IDBCursor&&ef.set(n,t)}).catch(()=>{}),Ja.set(e,t),e}function Ow(t){if(Ko.has(t))return;const e=new Promise((n,i)=>{const r=()=>{t.removeEventListener("complete",s),t.removeEventListener("error",o),t.removeEventListener("abort",o)},s=()=>{n(),r()},o=()=>{i(t.error||new DOMException("AbortError","AbortError")),r()};t.addEventListener("complete",s),t.addEventListener("error",o),t.addEventListener("abort",o)});Ko.set(t,e)}let Jo={get(t,e,n){if(t instanceof IDBTransaction){if(e==="done")return Ko.get(t);if(e==="objectStoreNames")return t.objectStoreNames||tf.get(t);if(e==="store")return n.objectStoreNames[1]?void 0:n.objectStore(n.objectStoreNames[0])}return At(t[e])},set(t,e,n){return t[e]=n,!0},has(t,e){return t instanceof IDBTransaction&&(e==="done"||e==="store")?!0:e in t}};function Dw(t){Jo=t(Jo)}function Mw(t){return t===IDBDatabase.prototype.transaction&&!("objectStoreNames"in IDBTransaction.prototype)?function(e,...n){const i=t.call(ho(this),e,...n);return tf.set(i,e.sort?e.sort():[e]),At(i)}:Nw().includes(t)?function(...e){return t.apply(ho(this),e),At(ef.get(this))}:function(...e){return At(t.apply(ho(this),e))}}function xw(t){return typeof t=="function"?Mw(t):(t instanceof IDBTransaction&&Ow(t),Aw(t,Pw())?new Proxy(t,Jo):t)}function At(t){if(t instanceof IDBRequest)return Lw(t);if(uo.has(t))return uo.get(t);const e=xw(t);return e!==t&&(uo.set(t,e),Ja.set(e,t)),e}const ho=t=>Ja.get(t);function Fw(t,e,{blocked:n,upgrade:i,blocking:r,terminated:s}={}){const o=indexedDB.open(t,e),a=At(o);return i&&o.addEventListener("upgradeneeded",c=>{i(At(o.result),c.oldVersion,c.newVersion,At(o.transaction),c)}),n&&o.addEventListener("blocked",c=>n(c.oldVersion,c.newVersion,c)),a.then(c=>{s&&c.addEventListener("close",()=>s()),r&&c.addEventListener("versionchange",l=>r(l.oldVersion,l.newVersion,l))}).catch(()=>{}),a}const Uw=["get","getKey","getAll","getAllKeys","count"],$w=["put","add","delete","clear"],fo=new Map;function bu(t,e){if(!(t instanceof IDBDatabase&&!(e in t)&&typeof e=="string"))return;if(fo.get(e))return fo.get(e);const n=e.replace(/FromIndex$/,""),i=e!==n,r=$w.includes(n);if(!(n in(i?IDBIndex:IDBObjectStore).prototype)||!(r||Uw.includes(n)))return;const s=async function(o,...a){const c=this.transaction(o,r?"readwrite":"readonly");let l=c.store;return i&&(l=l.index(a.shift())),(await Promise.all([l[n](...a),r&&c.done]))[0]};return fo.set(e,s),s}Dw(t=>({...t,get:(e,n,i)=>bu(e,n)||t.get(e,n,i),has:(e,n)=>!!bu(e,n)||t.has(e,n)}));/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Bw{constructor(e){this.container=e}getPlatformInfoString(){return this.container.getProviders().map(n=>{if(Hw(n)){const i=n.getImmediate();return`${i.library}/${i.version}`}else return null}).filter(n=>n).join(" ")}}function Hw(t){return t.getComponent()?.type==="VERSION"}const Xo="@firebase/app",Su="0.14.4";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const dt=new Ps("@firebase/app"),Ww="@firebase/app-compat",Vw="@firebase/analytics-compat",jw="@firebase/analytics",Gw="@firebase/app-check-compat",zw="@firebase/app-check",qw="@firebase/auth",Yw="@firebase/auth-compat",Kw="@firebase/database",Jw="@firebase/data-connect",Xw="@firebase/database-compat",Qw="@firebase/functions",Zw="@firebase/functions-compat",eb="@firebase/installations",tb="@firebase/installations-compat",nb="@firebase/messaging",ib="@firebase/messaging-compat",rb="@firebase/performance",sb="@firebase/performance-compat",ob="@firebase/remote-config",ab="@firebase/remote-config-compat",cb="@firebase/storage",lb="@firebase/storage-compat",ub="@firebase/firestore",db="@firebase/ai",hb="@firebase/firestore-compat",fb="firebase",pb="12.4.0";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Qo="[DEFAULT]",gb={[Xo]:"fire-core",[Ww]:"fire-core-compat",[jw]:"fire-analytics",[Vw]:"fire-analytics-compat",[zw]:"fire-app-check",[Gw]:"fire-app-check-compat",[qw]:"fire-auth",[Yw]:"fire-auth-compat",[Kw]:"fire-rtdb",[Jw]:"fire-data-connect",[Xw]:"fire-rtdb-compat",[Qw]:"fire-fn",[Zw]:"fire-fn-compat",[eb]:"fire-iid",[tb]:"fire-iid-compat",[nb]:"fire-fcm",[ib]:"fire-fcm-compat",[rb]:"fire-perf",[sb]:"fire-perf-compat",[ob]:"fire-rc",[ab]:"fire-rc-compat",[cb]:"fire-gcs",[lb]:"fire-gcs-compat",[ub]:"fire-fst",[hb]:"fire-fst-compat",[db]:"fire-vertex","fire-js":"fire-js",[fb]:"fire-js-all"};/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const zr=new Map,mb=new Map,Zo=new Map;function Cu(t,e){try{t.container.addComponent(e)}catch(n){dt.debug(`Component ${e.name} failed to register with FirebaseApp ${t.name}`,n)}}function xt(t){const e=t.name;if(Zo.has(e))return dt.debug(`There were multiple attempts to register component ${e}.`),!1;Zo.set(e,t);for(const n of zr.values())Cu(n,t);for(const n of mb.values())Cu(n,t);return!0}function tr(t,e){const n=t.container.getProvider("heartbeat").getImmediate({optional:!0});return n&&n.triggerHeartbeat(),t.container.getProvider(e)}function Oe(t){return t==null?!1:t.settings!==void 0}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const _b={"no-app":"No Firebase App '{$appName}' has been created - call initializeApp() first","bad-app-name":"Illegal App name: '{$appName}'","duplicate-app":"Firebase App named '{$appName}' already exists with different options or config","app-deleted":"Firebase App named '{$appName}' already deleted","server-app-deleted":"Firebase Server App has been deleted","no-options":"Need to provide options, when not being deployed to hosting via source.","invalid-app-argument":"firebase.{$appName}() takes either no argument or a Firebase App instance.","invalid-log-argument":"First argument to `onLog` must be null or a function.","idb-open":"Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.","idb-get":"Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.","idb-set":"Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.","idb-delete":"Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}.","finalization-registry-not-supported":"FirebaseServerApp deleteOnDeref field defined but the JS runtime does not support FinalizationRegistry.","invalid-server-app-environment":"FirebaseServerApp is not for use in browser environments."},Pt=new Zn("app","Firebase",_b);/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class yb{constructor(e,n,i){this._isDeleted=!1,this._options={...e},this._config={...n},this._name=n.name,this._automaticDataCollectionEnabled=n.automaticDataCollectionEnabled,this._container=i,this.container.addComponent(new ut("app",()=>this,"PUBLIC"))}get automaticDataCollectionEnabled(){return this.checkDestroyed(),this._automaticDataCollectionEnabled}set automaticDataCollectionEnabled(e){this.checkDestroyed(),this._automaticDataCollectionEnabled=e}get name(){return this.checkDestroyed(),this._name}get options(){return this.checkDestroyed(),this._options}get config(){return this.checkDestroyed(),this._config}get container(){return this._container}get isDeleted(){return this._isDeleted}set isDeleted(e){this._isDeleted=e}checkDestroyed(){if(this.isDeleted)throw Pt.create("app-deleted",{appName:this._name})}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ti=pb;function nf(t,e={}){let n=t;typeof e!="object"&&(e={name:e});const i={name:Qo,automaticDataCollectionEnabled:!0,...e},r=i.name;if(typeof r!="string"||!r)throw Pt.create("bad-app-name",{appName:String(r)});if(n||(n=Yh()),!n)throw Pt.create("no-options");const s=zr.get(r);if(s){if(an(n,s.options)&&an(i,s.config))return s;throw Pt.create("duplicate-app",{appName:r})}const o=new Cw(r);for(const c of Zo.values())o.addComponent(c);const a=new yb(n,i,o);return zr.set(r,a),a}function Xa(t=Qo){const e=zr.get(t);if(!e&&t===Qo&&Yh())return nf();if(!e)throw Pt.create("no-app",{appName:t});return e}function ot(t,e,n){let i=gb[t]??t;n&&(i+=`-${n}`);const r=i.match(/\s|\//),s=e.match(/\s|\//);if(r||s){const o=[`Unable to register library "${i}" with version "${e}":`];r&&o.push(`library name "${i}" contains illegal characters (whitespace or "/")`),r&&s&&o.push("and"),s&&o.push(`version name "${e}" contains illegal characters (whitespace or "/")`),dt.warn(o.join(" "));return}xt(new ut(`${i}-version`,()=>({library:i,version:e}),"VERSION"))}/**
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
 */const Eb="firebase-heartbeat-database",vb=1,Fi="firebase-heartbeat-store";let po=null;function rf(){return po||(po=Fw(Eb,vb,{upgrade:(t,e)=>{switch(e){case 0:try{t.createObjectStore(Fi)}catch(n){console.warn(n)}}}}).catch(t=>{throw Pt.create("idb-open",{originalErrorMessage:t.message})})),po}async function wb(t){try{const n=(await rf()).transaction(Fi),i=await n.objectStore(Fi).get(sf(t));return await n.done,i}catch(e){if(e instanceof Ht)dt.warn(e.message);else{const n=Pt.create("idb-get",{originalErrorMessage:e?.message});dt.warn(n.message)}}}async function Tu(t,e){try{const i=(await rf()).transaction(Fi,"readwrite");await i.objectStore(Fi).put(e,sf(t)),await i.done}catch(n){if(n instanceof Ht)dt.warn(n.message);else{const i=Pt.create("idb-set",{originalErrorMessage:n?.message});dt.warn(i.message)}}}function sf(t){return`${t.name}!${t.options.appId}`}/**
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
 */const bb=1024,Sb=30;class Cb{constructor(e){this.container=e,this._heartbeatsCache=null;const n=this.container.getProvider("app").getImmediate();this._storage=new Ib(n),this._heartbeatsCachePromise=this._storage.read().then(i=>(this._heartbeatsCache=i,i))}async triggerHeartbeat(){try{const n=this.container.getProvider("platform-logger").getImmediate().getPlatformInfoString(),i=Iu();if(this._heartbeatsCache?.heartbeats==null&&(this._heartbeatsCache=await this._heartbeatsCachePromise,this._heartbeatsCache?.heartbeats==null)||this._heartbeatsCache.lastSentHeartbeatDate===i||this._heartbeatsCache.heartbeats.some(r=>r.date===i))return;if(this._heartbeatsCache.heartbeats.push({date:i,agent:n}),this._heartbeatsCache.heartbeats.length>Sb){const r=kb(this._heartbeatsCache.heartbeats);this._heartbeatsCache.heartbeats.splice(r,1)}return this._storage.overwrite(this._heartbeatsCache)}catch(e){dt.warn(e)}}async getHeartbeatsHeader(){try{if(this._heartbeatsCache===null&&await this._heartbeatsCachePromise,this._heartbeatsCache?.heartbeats==null||this._heartbeatsCache.heartbeats.length===0)return"";const e=Iu(),{heartbeatsToSend:n,unsentEntries:i}=Tb(this._heartbeatsCache.heartbeats),r=Vr(JSON.stringify({version:2,heartbeats:n}));return this._heartbeatsCache.lastSentHeartbeatDate=e,i.length>0?(this._heartbeatsCache.heartbeats=i,await this._storage.overwrite(this._heartbeatsCache)):(this._heartbeatsCache.heartbeats=[],this._storage.overwrite(this._heartbeatsCache)),r}catch(e){return dt.warn(e),""}}}function Iu(){return new Date().toISOString().substring(0,10)}function Tb(t,e=bb){const n=[];let i=t.slice();for(const r of t){const s=n.find(o=>o.agent===r.agent);if(s){if(s.dates.push(r.date),ku(n)>e){s.dates.pop();break}}else if(n.push({agent:r.agent,dates:[r.date]}),ku(n)>e){n.pop();break}i=i.slice(1)}return{heartbeatsToSend:n,unsentEntries:i}}class Ib{constructor(e){this.app=e,this._canUseIndexedDBPromise=this.runIndexedDBEnvironmentCheck()}async runIndexedDBEnvironmentCheck(){return Ka()?sw().then(()=>!0).catch(()=>!1):!1}async read(){if(await this._canUseIndexedDBPromise){const n=await wb(this.app);return n?.heartbeats?n:{heartbeats:[]}}else return{heartbeats:[]}}async overwrite(e){if(await this._canUseIndexedDBPromise){const i=await this.read();return Tu(this.app,{lastSentHeartbeatDate:e.lastSentHeartbeatDate??i.lastSentHeartbeatDate,heartbeats:e.heartbeats})}else return}async add(e){if(await this._canUseIndexedDBPromise){const i=await this.read();return Tu(this.app,{lastSentHeartbeatDate:e.lastSentHeartbeatDate??i.lastSentHeartbeatDate,heartbeats:[...i.heartbeats,...e.heartbeats]})}else return}}function ku(t){return Vr(JSON.stringify({version:2,heartbeats:t})).length}function kb(t){if(t.length===0)return-1;let e=0,n=t[0].date;for(let i=1;i<t.length;i++)t[i].date<n&&(n=t[i].date,e=i);return e}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Rb(t){xt(new ut("platform-logger",e=>new Bw(e),"PRIVATE")),xt(new ut("heartbeat",e=>new Cb(e),"PRIVATE")),ot(Xo,Su,t),ot(Xo,Su,"esm2020"),ot("fire-js","")}Rb("");var Ru={};const Au="@firebase/database",Pu="1.1.0";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let of="";function Ab(t){of=t}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Pb{constructor(e){this.domStorage_=e,this.prefix_="firebase:"}set(e,n){n==null?this.domStorage_.removeItem(this.prefixedName_(e)):this.domStorage_.setItem(this.prefixedName_(e),X(n))}get(e){const n=this.domStorage_.getItem(this.prefixedName_(e));return n==null?null:xi(n)}remove(e){this.domStorage_.removeItem(this.prefixedName_(e))}prefixedName_(e){return this.prefix_+e}toString(){return this.domStorage_.toString()}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Nb{constructor(){this.cache_={},this.isInMemoryStorage=!0}set(e,n){n==null?delete this.cache_[e]:this.cache_[e]=n}get(e){return Ke(this.cache_,e)?this.cache_[e]:null}remove(e){delete this.cache_[e]}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const af=function(t){try{if(typeof window<"u"&&typeof window[t]<"u"){const e=window[t];return e.setItem("firebase:sentinel","cache"),e.removeItem("firebase:sentinel"),new Pb(e)}}catch{}return new Nb},Qt=af("localStorage"),Lb=af("sessionStorage");/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const wn=new Ps("@firebase/database"),Ob=(function(){let t=1;return function(){return t++}})(),cf=function(t){const e=gw(t),n=new dw;n.update(e);const i=n.digest();return ks.encodeByteArray(i)},nr=function(...t){let e="";for(let n=0;n<t.length;n++){const i=t[n];Array.isArray(i)||i&&typeof i=="object"&&typeof i.length=="number"?e+=nr.apply(null,i):typeof i=="object"?e+=X(i):e+=i,e+=" "}return e};let wi=null,Nu=!0;const Db=function(t,e){g(!0,"Can't turn on custom loggers persistently."),wn.logLevel=O.VERBOSE,wi=wn.log.bind(wn)},re=function(...t){if(Nu===!0&&(Nu=!1,wi===null&&Lb.get("logging_enabled")===!0&&Db()),wi){const e=nr.apply(null,t);wi(e)}},ir=function(t){return function(...e){re(t,...e)}},ea=function(...t){const e="FIREBASE INTERNAL ERROR: "+nr(...t);wn.error(e)},ht=function(...t){const e=`FIREBASE FATAL ERROR: ${nr(...t)}`;throw wn.error(e),new Error(e)},pe=function(...t){const e="FIREBASE WARNING: "+nr(...t);wn.warn(e)},Mb=function(){typeof window<"u"&&window.location&&window.location.protocol&&window.location.protocol.indexOf("https:")!==-1&&pe("Insecure Firebase access from a secure page. Please use https in calls to new Firebase().")},Qa=function(t){return typeof t=="number"&&(t!==t||t===Number.POSITIVE_INFINITY||t===Number.NEGATIVE_INFINITY)},xb=function(t){if(document.readyState==="complete")t();else{let e=!1;const n=function(){if(!document.body){setTimeout(n,Math.floor(10));return}e||(e=!0,t())};document.addEventListener?(document.addEventListener("DOMContentLoaded",n,!1),window.addEventListener("load",n,!1)):document.attachEvent&&(document.attachEvent("onreadystatechange",()=>{document.readyState==="complete"&&n()}),window.attachEvent("onload",n))}},Fn="[MIN_NAME]",cn="[MAX_NAME]",pn=function(t,e){if(t===e)return 0;if(t===Fn||e===cn)return-1;if(e===Fn||t===cn)return 1;{const n=Lu(t),i=Lu(e);return n!==null?i!==null?n-i===0?t.length-e.length:n-i:-1:i!==null?1:t<e?-1:1}},Fb=function(t,e){return t===e?0:t<e?-1:1},ui=function(t,e){if(e&&t in e)return e[t];throw new Error("Missing required key ("+t+") in object: "+X(e))},Za=function(t){if(typeof t!="object"||t===null)return X(t);const e=[];for(const i in t)e.push(i);e.sort();let n="{";for(let i=0;i<e.length;i++)i!==0&&(n+=","),n+=X(e[i]),n+=":",n+=Za(t[e[i]]);return n+="}",n},lf=function(t,e){const n=t.length;if(n<=e)return[t];const i=[];for(let r=0;r<n;r+=e)r+e>n?i.push(t.substring(r,n)):i.push(t.substring(r,r+e));return i};function ae(t,e){for(const n in t)t.hasOwnProperty(n)&&e(n,t[n])}const uf=function(t){g(!Qa(t),"Invalid JSON number");const e=11,n=52,i=(1<<e-1)-1;let r,s,o,a,c;t===0?(s=0,o=0,r=1/t===-1/0?1:0):(r=t<0,t=Math.abs(t),t>=Math.pow(2,1-i)?(a=Math.min(Math.floor(Math.log(t)/Math.LN2),i),s=a+i,o=Math.round(t*Math.pow(2,n-a)-Math.pow(2,n))):(s=0,o=Math.round(t/Math.pow(2,1-i-n))));const l=[];for(c=n;c;c-=1)l.push(o%2?1:0),o=Math.floor(o/2);for(c=e;c;c-=1)l.push(s%2?1:0),s=Math.floor(s/2);l.push(r?1:0),l.reverse();const u=l.join("");let d="";for(c=0;c<64;c+=8){let h=parseInt(u.substr(c,8),2).toString(16);h.length===1&&(h="0"+h),d=d+h}return d.toLowerCase()},Ub=function(){return!!(typeof window=="object"&&window.chrome&&window.chrome.extension&&!/^chrome/.test(window.location.href))},$b=function(){return typeof Windows=="object"&&typeof Windows.UI=="object"};function Bb(t,e){let n="Unknown Error";t==="too_big"?n="The data requested exceeds the maximum size that can be accessed with a single request.":t==="permission_denied"?n="Client doesn't have permission to access the desired data.":t==="unavailable"&&(n="The service is unavailable");const i=new Error(t+" at "+e._path.toString()+": "+n);return i.code=t.toUpperCase(),i}const Hb=new RegExp("^-?(0*)\\d{1,10}$"),Wb=-2147483648,Vb=2147483647,Lu=function(t){if(Hb.test(t)){const e=Number(t);if(e>=Wb&&e<=Vb)return e}return null},ni=function(t){try{t()}catch(e){setTimeout(()=>{const n=e.stack||"";throw pe("Exception was thrown by user callback.",n),e},Math.floor(0))}},jb=function(){return(typeof window=="object"&&window.navigator&&window.navigator.userAgent||"").search(/googlebot|google webmaster tools|bingbot|yahoo! slurp|baiduspider|yandexbot|duckduckbot/i)>=0},bi=function(t,e){const n=setTimeout(t,e);return typeof n=="number"&&typeof Deno<"u"&&Deno.unrefTimer?Deno.unrefTimer(n):typeof n=="object"&&n.unref&&n.unref(),n};/**
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
 */class Gb{constructor(e,n){this.appCheckProvider=n,this.appName=e.name,Oe(e)&&e.settings.appCheckToken&&(this.serverAppAppCheckToken=e.settings.appCheckToken),this.appCheck=n?.getImmediate({optional:!0}),this.appCheck||n?.get().then(i=>this.appCheck=i)}getToken(e){if(this.serverAppAppCheckToken){if(e)throw new Error("Attempted reuse of `FirebaseServerApp.appCheckToken` after previous usage failed.");return Promise.resolve({token:this.serverAppAppCheckToken})}return this.appCheck?this.appCheck.getToken(e):new Promise((n,i)=>{setTimeout(()=>{this.appCheck?this.getToken(e).then(n,i):n(null)},0)})}addTokenChangeListener(e){this.appCheckProvider?.get().then(n=>n.addTokenListener(e))}notifyForInvalidToken(){pe(`Provided AppCheck credentials for the app named "${this.appName}" are invalid. This usually indicates your app was not initialized correctly.`)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class zb{constructor(e,n,i){this.appName_=e,this.firebaseOptions_=n,this.authProvider_=i,this.auth_=null,this.auth_=i.getImmediate({optional:!0}),this.auth_||i.onInit(r=>this.auth_=r)}getToken(e){return this.auth_?this.auth_.getToken(e).catch(n=>n&&n.code==="auth/token-not-initialized"?(re("Got auth/token-not-initialized error.  Treating as null token."),null):Promise.reject(n)):new Promise((n,i)=>{setTimeout(()=>{this.auth_?this.getToken(e).then(n,i):n(null)},0)})}addTokenChangeListener(e){this.auth_?this.auth_.addAuthTokenListener(e):this.authProvider_.get().then(n=>n.addAuthTokenListener(e))}removeTokenChangeListener(e){this.authProvider_.get().then(n=>n.removeAuthTokenListener(e))}notifyForInvalidToken(){let e='Provided authentication credentials for the app named "'+this.appName_+'" are invalid. This usually indicates your app was not initialized correctly. ';"credential"in this.firebaseOptions_?e+='Make sure the "credential" property provided to initializeApp() is authorized to access the specified "databaseURL" and is from the correct project.':"serviceAccount"in this.firebaseOptions_?e+='Make sure the "serviceAccount" property provided to initializeApp() is authorized to access the specified "databaseURL" and is from the correct project.':e+='Make sure the "apiKey" and "databaseURL" properties provided to initializeApp() match the values provided for your app at https://console.firebase.google.com/.',pe(e)}}class Pr{constructor(e){this.accessToken=e}getToken(e){return Promise.resolve({accessToken:this.accessToken})}addTokenChangeListener(e){e(this.accessToken)}removeTokenChangeListener(e){}notifyForInvalidToken(){}}Pr.OWNER="owner";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ec="5",df="v",hf="s",ff="r",pf="f",gf=/(console\.firebase|firebase-console-\w+\.corp|firebase\.corp)\.google\.com/,mf="ls",_f="p",ta="ac",yf="websocket",Ef="long_polling";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class vf{constructor(e,n,i,r,s=!1,o="",a=!1,c=!1,l=null){this.secure=n,this.namespace=i,this.webSocketOnly=r,this.nodeAdmin=s,this.persistenceKey=o,this.includeNamespaceInQueryParams=a,this.isUsingEmulator=c,this.emulatorOptions=l,this._host=e.toLowerCase(),this._domain=this._host.substr(this._host.indexOf(".")+1),this.internalHost=Qt.get("host:"+e)||this._host}isCacheableHost(){return this.internalHost.substr(0,2)==="s-"}isCustomHost(){return this._domain!=="firebaseio.com"&&this._domain!=="firebaseio-demo.com"}get host(){return this._host}set host(e){e!==this.internalHost&&(this.internalHost=e,this.isCacheableHost()&&Qt.set("host:"+this._host,this.internalHost))}toString(){let e=this.toURLString();return this.persistenceKey&&(e+="<"+this.persistenceKey+">"),e}toURLString(){const e=this.secure?"https://":"http://",n=this.includeNamespaceInQueryParams?`?ns=${this.namespace}`:"";return`${e}${this.host}/${n}`}}function qb(t){return t.host!==t.internalHost||t.isCustomHost()||t.includeNamespaceInQueryParams}function wf(t,e,n){g(typeof e=="string","typeof type must == string"),g(typeof n=="object","typeof params must == object");let i;if(e===yf)i=(t.secure?"wss://":"ws://")+t.internalHost+"/.ws?";else if(e===Ef)i=(t.secure?"https://":"http://")+t.internalHost+"/.lp?";else throw new Error("Unknown connection type: "+e);qb(t)&&(n.ns=t.namespace);const r=[];return ae(n,(s,o)=>{r.push(s+"="+o)}),i+r.join("&")}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Yb{constructor(){this.counters_={}}incrementCounter(e,n=1){Ke(this.counters_,e)||(this.counters_[e]=0),this.counters_[e]+=n}get(){return zv(this.counters_)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const go={},mo={};function tc(t){const e=t.toString();return go[e]||(go[e]=new Yb),go[e]}function Kb(t,e){const n=t.toString();return mo[n]||(mo[n]=e()),mo[n]}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Jb{constructor(e){this.onMessage_=e,this.pendingResponses=[],this.currentResponseNum=0,this.closeAfterResponse=-1,this.onClose=null}closeAfter(e,n){this.closeAfterResponse=e,this.onClose=n,this.closeAfterResponse<this.currentResponseNum&&(this.onClose(),this.onClose=null)}handleResponse(e,n){for(this.pendingResponses[e]=n;this.pendingResponses[this.currentResponseNum];){const i=this.pendingResponses[this.currentResponseNum];delete this.pendingResponses[this.currentResponseNum];for(let r=0;r<i.length;++r)i[r]&&ni(()=>{this.onMessage_(i[r])});if(this.currentResponseNum===this.closeAfterResponse){this.onClose&&(this.onClose(),this.onClose=null);break}this.currentResponseNum++}}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ou="start",Xb="close",Qb="pLPCommand",Zb="pRTLPCB",bf="id",Sf="pw",Cf="ser",eS="cb",tS="seg",nS="ts",iS="d",rS="dframe",Tf=1870,If=30,sS=Tf-If,oS=25e3,aS=3e4;class yn{constructor(e,n,i,r,s,o,a){this.connId=e,this.repoInfo=n,this.applicationId=i,this.appCheckToken=r,this.authToken=s,this.transportSessionId=o,this.lastSessionId=a,this.bytesSent=0,this.bytesReceived=0,this.everConnected_=!1,this.log_=ir(e),this.stats_=tc(n),this.urlFn=c=>(this.appCheckToken&&(c[ta]=this.appCheckToken),wf(n,Ef,c))}open(e,n){this.curSegmentNum=0,this.onDisconnect_=n,this.myPacketOrderer=new Jb(e),this.isClosed_=!1,this.connectTimeoutTimer_=setTimeout(()=>{this.log_("Timed out trying to connect."),this.onClosed_(),this.connectTimeoutTimer_=null},Math.floor(aS)),xb(()=>{if(this.isClosed_)return;this.scriptTagHolder=new nc((...s)=>{const[o,a,c,l,u]=s;if(this.incrementIncomingBytes_(s),!!this.scriptTagHolder)if(this.connectTimeoutTimer_&&(clearTimeout(this.connectTimeoutTimer_),this.connectTimeoutTimer_=null),this.everConnected_=!0,o===Ou)this.id=a,this.password=c;else if(o===Xb)a?(this.scriptTagHolder.sendNewPolls=!1,this.myPacketOrderer.closeAfter(a,()=>{this.onClosed_()})):this.onClosed_();else throw new Error("Unrecognized command received: "+o)},(...s)=>{const[o,a]=s;this.incrementIncomingBytes_(s),this.myPacketOrderer.handleResponse(o,a)},()=>{this.onClosed_()},this.urlFn);const i={};i[Ou]="t",i[Cf]=Math.floor(Math.random()*1e8),this.scriptTagHolder.uniqueCallbackIdentifier&&(i[eS]=this.scriptTagHolder.uniqueCallbackIdentifier),i[df]=ec,this.transportSessionId&&(i[hf]=this.transportSessionId),this.lastSessionId&&(i[mf]=this.lastSessionId),this.applicationId&&(i[_f]=this.applicationId),this.appCheckToken&&(i[ta]=this.appCheckToken),typeof location<"u"&&location.hostname&&gf.test(location.hostname)&&(i[ff]=pf);const r=this.urlFn(i);this.log_("Connecting via long-poll to "+r),this.scriptTagHolder.addTag(r,()=>{})})}start(){this.scriptTagHolder.startLongPoll(this.id,this.password),this.addDisconnectPingFrame(this.id,this.password)}static forceAllow(){yn.forceAllow_=!0}static forceDisallow(){yn.forceDisallow_=!0}static isAvailable(){return yn.forceAllow_?!0:!yn.forceDisallow_&&typeof document<"u"&&document.createElement!=null&&!Ub()&&!$b()}markConnectionHealthy(){}shutdown_(){this.isClosed_=!0,this.scriptTagHolder&&(this.scriptTagHolder.close(),this.scriptTagHolder=null),this.myDisconnFrame&&(document.body.removeChild(this.myDisconnFrame),this.myDisconnFrame=null),this.connectTimeoutTimer_&&(clearTimeout(this.connectTimeoutTimer_),this.connectTimeoutTimer_=null)}onClosed_(){this.isClosed_||(this.log_("Longpoll is closing itself"),this.shutdown_(),this.onDisconnect_&&(this.onDisconnect_(this.everConnected_),this.onDisconnect_=null))}close(){this.isClosed_||(this.log_("Longpoll is being closed."),this.shutdown_())}send(e){const n=X(e);this.bytesSent+=n.length,this.stats_.incrementCounter("bytes_sent",n.length);const i=jh(n),r=lf(i,sS);for(let s=0;s<r.length;s++)this.scriptTagHolder.enqueueSegment(this.curSegmentNum,r.length,r[s]),this.curSegmentNum++}addDisconnectPingFrame(e,n){this.myDisconnFrame=document.createElement("iframe");const i={};i[rS]="t",i[bf]=e,i[Sf]=n,this.myDisconnFrame.src=this.urlFn(i),this.myDisconnFrame.style.display="none",document.body.appendChild(this.myDisconnFrame)}incrementIncomingBytes_(e){const n=X(e).length;this.bytesReceived+=n,this.stats_.incrementCounter("bytes_received",n)}}class nc{constructor(e,n,i,r){this.onDisconnect=i,this.urlFn=r,this.outstandingRequests=new Set,this.pendingSegs=[],this.currentSerial=Math.floor(Math.random()*1e8),this.sendNewPolls=!0;{this.uniqueCallbackIdentifier=Ob(),window[Qb+this.uniqueCallbackIdentifier]=e,window[Zb+this.uniqueCallbackIdentifier]=n,this.myIFrame=nc.createIFrame_();let s="";this.myIFrame.src&&this.myIFrame.src.substr(0,11)==="javascript:"&&(s='<script>document.domain="'+document.domain+'";<\/script>');const o="<html><body>"+s+"</body></html>";try{this.myIFrame.doc.open(),this.myIFrame.doc.write(o),this.myIFrame.doc.close()}catch(a){re("frame writing exception"),a.stack&&re(a.stack),re(a)}}}static createIFrame_(){const e=document.createElement("iframe");if(e.style.display="none",document.body){document.body.appendChild(e);try{e.contentWindow.document||re("No IE domain setting required")}catch{const i=document.domain;e.src="javascript:void((function(){document.open();document.domain='"+i+"';document.close();})())"}}else throw"Document body has not initialized. Wait to initialize Firebase until after the document is ready.";return e.contentDocument?e.doc=e.contentDocument:e.contentWindow?e.doc=e.contentWindow.document:e.document&&(e.doc=e.document),e}close(){this.alive=!1,this.myIFrame&&(this.myIFrame.doc.body.textContent="",setTimeout(()=>{this.myIFrame!==null&&(document.body.removeChild(this.myIFrame),this.myIFrame=null)},Math.floor(0)));const e=this.onDisconnect;e&&(this.onDisconnect=null,e())}startLongPoll(e,n){for(this.myID=e,this.myPW=n,this.alive=!0;this.newRequest_(););}newRequest_(){if(this.alive&&this.sendNewPolls&&this.outstandingRequests.size<(this.pendingSegs.length>0?2:1)){this.currentSerial++;const e={};e[bf]=this.myID,e[Sf]=this.myPW,e[Cf]=this.currentSerial;let n=this.urlFn(e),i="",r=0;for(;this.pendingSegs.length>0&&this.pendingSegs[0].d.length+If+i.length<=Tf;){const o=this.pendingSegs.shift();i=i+"&"+tS+r+"="+o.seg+"&"+nS+r+"="+o.ts+"&"+iS+r+"="+o.d,r++}return n=n+i,this.addLongPollTag_(n,this.currentSerial),!0}else return!1}enqueueSegment(e,n,i){this.pendingSegs.push({seg:e,ts:n,d:i}),this.alive&&this.newRequest_()}addLongPollTag_(e,n){this.outstandingRequests.add(n);const i=()=>{this.outstandingRequests.delete(n),this.newRequest_()},r=setTimeout(i,Math.floor(oS)),s=()=>{clearTimeout(r),i()};this.addTag(e,s)}addTag(e,n){setTimeout(()=>{try{if(!this.sendNewPolls)return;const i=this.myIFrame.doc.createElement("script");i.type="text/javascript",i.async=!0,i.src=e,i.onload=i.onreadystatechange=function(){const r=i.readyState;(!r||r==="loaded"||r==="complete")&&(i.onload=i.onreadystatechange=null,i.parentNode&&i.parentNode.removeChild(i),n())},i.onerror=()=>{re("Long-poll script failed to load: "+e),this.sendNewPolls=!1,this.close()},this.myIFrame.doc.body.appendChild(i)}catch{}},Math.floor(1))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const cS=16384,lS=45e3;let qr=null;typeof MozWebSocket<"u"?qr=MozWebSocket:typeof WebSocket<"u"&&(qr=WebSocket);class De{constructor(e,n,i,r,s,o,a){this.connId=e,this.applicationId=i,this.appCheckToken=r,this.authToken=s,this.keepaliveTimer=null,this.frames=null,this.totalFrames=0,this.bytesSent=0,this.bytesReceived=0,this.log_=ir(this.connId),this.stats_=tc(n),this.connURL=De.connectionURL_(n,o,a,r,i),this.nodeAdmin=n.nodeAdmin}static connectionURL_(e,n,i,r,s){const o={};return o[df]=ec,typeof location<"u"&&location.hostname&&gf.test(location.hostname)&&(o[ff]=pf),n&&(o[hf]=n),i&&(o[mf]=i),r&&(o[ta]=r),s&&(o[_f]=s),wf(e,yf,o)}open(e,n){this.onDisconnect=n,this.onMessage=e,this.log_("Websocket connecting to "+this.connURL),this.everConnected_=!1,Qt.set("previous_websocket_failure",!0);try{let i;rw(),this.mySock=new qr(this.connURL,[],i)}catch(i){this.log_("Error instantiating WebSocket.");const r=i.message||i.data;r&&this.log_(r),this.onClosed_();return}this.mySock.onopen=()=>{this.log_("Websocket connected."),this.everConnected_=!0},this.mySock.onclose=()=>{this.log_("Websocket connection was disconnected."),this.mySock=null,this.onClosed_()},this.mySock.onmessage=i=>{this.handleIncomingFrame(i)},this.mySock.onerror=i=>{this.log_("WebSocket error.  Closing connection.");const r=i.message||i.data;r&&this.log_(r),this.onClosed_()}}start(){}static forceDisallow(){De.forceDisallow_=!0}static isAvailable(){let e=!1;if(typeof navigator<"u"&&navigator.userAgent){const n=/Android ([0-9]{0,}\.[0-9]{0,})/,i=navigator.userAgent.match(n);i&&i.length>1&&parseFloat(i[1])<4.4&&(e=!0)}return!e&&qr!==null&&!De.forceDisallow_}static previouslyFailed(){return Qt.isInMemoryStorage||Qt.get("previous_websocket_failure")===!0}markConnectionHealthy(){Qt.remove("previous_websocket_failure")}appendFrame_(e){if(this.frames.push(e),this.frames.length===this.totalFrames){const n=this.frames.join("");this.frames=null;const i=xi(n);this.onMessage(i)}}handleNewFrameCount_(e){this.totalFrames=e,this.frames=[]}extractFrameCount_(e){if(g(this.frames===null,"We already have a frame buffer"),e.length<=6){const n=Number(e);if(!isNaN(n))return this.handleNewFrameCount_(n),null}return this.handleNewFrameCount_(1),e}handleIncomingFrame(e){if(this.mySock===null)return;const n=e.data;if(this.bytesReceived+=n.length,this.stats_.incrementCounter("bytes_received",n.length),this.resetKeepAlive(),this.frames!==null)this.appendFrame_(n);else{const i=this.extractFrameCount_(n);i!==null&&this.appendFrame_(i)}}send(e){this.resetKeepAlive();const n=X(e);this.bytesSent+=n.length,this.stats_.incrementCounter("bytes_sent",n.length);const i=lf(n,cS);i.length>1&&this.sendString_(String(i.length));for(let r=0;r<i.length;r++)this.sendString_(i[r])}shutdown_(){this.isClosed_=!0,this.keepaliveTimer&&(clearInterval(this.keepaliveTimer),this.keepaliveTimer=null),this.mySock&&(this.mySock.close(),this.mySock=null)}onClosed_(){this.isClosed_||(this.log_("WebSocket is closing itself"),this.shutdown_(),this.onDisconnect&&(this.onDisconnect(this.everConnected_),this.onDisconnect=null))}close(){this.isClosed_||(this.log_("WebSocket is being closed"),this.shutdown_())}resetKeepAlive(){clearInterval(this.keepaliveTimer),this.keepaliveTimer=setInterval(()=>{this.mySock&&this.sendString_("0"),this.resetKeepAlive()},Math.floor(lS))}sendString_(e){try{this.mySock.send(e)}catch(n){this.log_("Exception thrown from WebSocket.send():",n.message||n.data,"Closing connection."),setTimeout(this.onClosed_.bind(this),0)}}}De.responsesRequiredToBeHealthy=2;De.healthyTimeout=3e4;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ui{static get ALL_TRANSPORTS(){return[yn,De]}static get IS_TRANSPORT_INITIALIZED(){return this.globalTransportInitialized_}constructor(e){this.initTransports_(e)}initTransports_(e){const n=De&&De.isAvailable();let i=n&&!De.previouslyFailed();if(e.webSocketOnly&&(n||pe("wss:// URL used, but browser isn't known to support websockets.  Trying anyway."),i=!0),i)this.transports_=[De];else{const r=this.transports_=[];for(const s of Ui.ALL_TRANSPORTS)s&&s.isAvailable()&&r.push(s);Ui.globalTransportInitialized_=!0}}initialTransport(){if(this.transports_.length>0)return this.transports_[0];throw new Error("No transports available")}upgradeTransport(){return this.transports_.length>1?this.transports_[1]:null}}Ui.globalTransportInitialized_=!1;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const uS=6e4,dS=5e3,hS=10*1024,fS=100*1024,_o="t",Du="d",pS="s",Mu="r",gS="e",xu="o",Fu="a",Uu="n",$u="p",mS="h";class _S{constructor(e,n,i,r,s,o,a,c,l,u){this.id=e,this.repoInfo_=n,this.applicationId_=i,this.appCheckToken_=r,this.authToken_=s,this.onMessage_=o,this.onReady_=a,this.onDisconnect_=c,this.onKill_=l,this.lastSessionId=u,this.connectionCount=0,this.pendingDataMessages=[],this.state_=0,this.log_=ir("c:"+this.id+":"),this.transportManager_=new Ui(n),this.log_("Connection created"),this.start_()}start_(){const e=this.transportManager_.initialTransport();this.conn_=new e(this.nextTransportId_(),this.repoInfo_,this.applicationId_,this.appCheckToken_,this.authToken_,null,this.lastSessionId),this.primaryResponsesRequired_=e.responsesRequiredToBeHealthy||0;const n=this.connReceiver_(this.conn_),i=this.disconnReceiver_(this.conn_);this.tx_=this.conn_,this.rx_=this.conn_,this.secondaryConn_=null,this.isHealthy_=!1,setTimeout(()=>{this.conn_&&this.conn_.open(n,i)},Math.floor(0));const r=e.healthyTimeout||0;r>0&&(this.healthyTimeout_=bi(()=>{this.healthyTimeout_=null,this.isHealthy_||(this.conn_&&this.conn_.bytesReceived>fS?(this.log_("Connection exceeded healthy timeout but has received "+this.conn_.bytesReceived+" bytes.  Marking connection healthy."),this.isHealthy_=!0,this.conn_.markConnectionHealthy()):this.conn_&&this.conn_.bytesSent>hS?this.log_("Connection exceeded healthy timeout but has sent "+this.conn_.bytesSent+" bytes.  Leaving connection alive."):(this.log_("Closing unhealthy connection after timeout."),this.close()))},Math.floor(r)))}nextTransportId_(){return"c:"+this.id+":"+this.connectionCount++}disconnReceiver_(e){return n=>{e===this.conn_?this.onConnectionLost_(n):e===this.secondaryConn_?(this.log_("Secondary connection lost."),this.onSecondaryConnectionLost_()):this.log_("closing an old connection")}}connReceiver_(e){return n=>{this.state_!==2&&(e===this.rx_?this.onPrimaryMessageReceived_(n):e===this.secondaryConn_?this.onSecondaryMessageReceived_(n):this.log_("message on old connection"))}}sendRequest(e){const n={t:"d",d:e};this.sendData_(n)}tryCleanupConnection(){this.tx_===this.secondaryConn_&&this.rx_===this.secondaryConn_&&(this.log_("cleaning up and promoting a connection: "+this.secondaryConn_.connId),this.conn_=this.secondaryConn_,this.secondaryConn_=null)}onSecondaryControl_(e){if(_o in e){const n=e[_o];n===Fu?this.upgradeIfSecondaryHealthy_():n===Mu?(this.log_("Got a reset on secondary, closing it"),this.secondaryConn_.close(),(this.tx_===this.secondaryConn_||this.rx_===this.secondaryConn_)&&this.close()):n===xu&&(this.log_("got pong on secondary."),this.secondaryResponsesRequired_--,this.upgradeIfSecondaryHealthy_())}}onSecondaryMessageReceived_(e){const n=ui("t",e),i=ui("d",e);if(n==="c")this.onSecondaryControl_(i);else if(n==="d")this.pendingDataMessages.push(i);else throw new Error("Unknown protocol layer: "+n)}upgradeIfSecondaryHealthy_(){this.secondaryResponsesRequired_<=0?(this.log_("Secondary connection is healthy."),this.isHealthy_=!0,this.secondaryConn_.markConnectionHealthy(),this.proceedWithUpgrade_()):(this.log_("sending ping on secondary."),this.secondaryConn_.send({t:"c",d:{t:$u,d:{}}}))}proceedWithUpgrade_(){this.secondaryConn_.start(),this.log_("sending client ack on secondary"),this.secondaryConn_.send({t:"c",d:{t:Fu,d:{}}}),this.log_("Ending transmission on primary"),this.conn_.send({t:"c",d:{t:Uu,d:{}}}),this.tx_=this.secondaryConn_,this.tryCleanupConnection()}onPrimaryMessageReceived_(e){const n=ui("t",e),i=ui("d",e);n==="c"?this.onControl_(i):n==="d"&&this.onDataMessage_(i)}onDataMessage_(e){this.onPrimaryResponse_(),this.onMessage_(e)}onPrimaryResponse_(){this.isHealthy_||(this.primaryResponsesRequired_--,this.primaryResponsesRequired_<=0&&(this.log_("Primary connection is healthy."),this.isHealthy_=!0,this.conn_.markConnectionHealthy()))}onControl_(e){const n=ui(_o,e);if(Du in e){const i=e[Du];if(n===mS){const r={...i};this.repoInfo_.isUsingEmulator&&(r.h=this.repoInfo_.host),this.onHandshake_(r)}else if(n===Uu){this.log_("recvd end transmission on primary"),this.rx_=this.secondaryConn_;for(let r=0;r<this.pendingDataMessages.length;++r)this.onDataMessage_(this.pendingDataMessages[r]);this.pendingDataMessages=[],this.tryCleanupConnection()}else n===pS?this.onConnectionShutdown_(i):n===Mu?this.onReset_(i):n===gS?ea("Server Error: "+i):n===xu?(this.log_("got pong on primary."),this.onPrimaryResponse_(),this.sendPingOnPrimaryIfNecessary_()):ea("Unknown control packet command: "+n)}}onHandshake_(e){const n=e.ts,i=e.v,r=e.h;this.sessionId=e.s,this.repoInfo_.host=r,this.state_===0&&(this.conn_.start(),this.onConnectionEstablished_(this.conn_,n),ec!==i&&pe("Protocol version mismatch detected"),this.tryStartUpgrade_())}tryStartUpgrade_(){const e=this.transportManager_.upgradeTransport();e&&this.startUpgrade_(e)}startUpgrade_(e){this.secondaryConn_=new e(this.nextTransportId_(),this.repoInfo_,this.applicationId_,this.appCheckToken_,this.authToken_,this.sessionId),this.secondaryResponsesRequired_=e.responsesRequiredToBeHealthy||0;const n=this.connReceiver_(this.secondaryConn_),i=this.disconnReceiver_(this.secondaryConn_);this.secondaryConn_.open(n,i),bi(()=>{this.secondaryConn_&&(this.log_("Timed out trying to upgrade."),this.secondaryConn_.close())},Math.floor(uS))}onReset_(e){this.log_("Reset packet received.  New host: "+e),this.repoInfo_.host=e,this.state_===1?this.close():(this.closeConnections_(),this.start_())}onConnectionEstablished_(e,n){this.log_("Realtime connection established."),this.conn_=e,this.state_=1,this.onReady_&&(this.onReady_(n,this.sessionId),this.onReady_=null),this.primaryResponsesRequired_===0?(this.log_("Primary connection is healthy."),this.isHealthy_=!0):bi(()=>{this.sendPingOnPrimaryIfNecessary_()},Math.floor(dS))}sendPingOnPrimaryIfNecessary_(){!this.isHealthy_&&this.state_===1&&(this.log_("sending ping on primary."),this.sendData_({t:"c",d:{t:$u,d:{}}}))}onSecondaryConnectionLost_(){const e=this.secondaryConn_;this.secondaryConn_=null,(this.tx_===e||this.rx_===e)&&this.close()}onConnectionLost_(e){this.conn_=null,!e&&this.state_===0?(this.log_("Realtime connection failed."),this.repoInfo_.isCacheableHost()&&(Qt.remove("host:"+this.repoInfo_.host),this.repoInfo_.internalHost=this.repoInfo_.host)):this.state_===1&&this.log_("Realtime connection lost."),this.close()}onConnectionShutdown_(e){this.log_("Connection shutdown command received. Shutting down..."),this.onKill_&&(this.onKill_(e),this.onKill_=null),this.onDisconnect_=null,this.close()}sendData_(e){if(this.state_!==1)throw"Connection is not connected";this.tx_.send(e)}close(){this.state_!==2&&(this.log_("Closing realtime connection."),this.state_=2,this.closeConnections_(),this.onDisconnect_&&(this.onDisconnect_(),this.onDisconnect_=null))}closeConnections_(){this.log_("Shutting down all connections"),this.conn_&&(this.conn_.close(),this.conn_=null),this.secondaryConn_&&(this.secondaryConn_.close(),this.secondaryConn_=null),this.healthyTimeout_&&(clearTimeout(this.healthyTimeout_),this.healthyTimeout_=null)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class kf{put(e,n,i,r){}merge(e,n,i,r){}refreshAuthToken(e){}refreshAppCheckToken(e){}onDisconnectPut(e,n,i){}onDisconnectMerge(e,n,i){}onDisconnectCancel(e,n){}reportStats(e){}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Rf{constructor(e){this.allowedEvents_=e,this.listeners_={},g(Array.isArray(e)&&e.length>0,"Requires a non-empty array")}trigger(e,...n){if(Array.isArray(this.listeners_[e])){const i=[...this.listeners_[e]];for(let r=0;r<i.length;r++)i[r].callback.apply(i[r].context,n)}}on(e,n,i){this.validateEventType_(e),this.listeners_[e]=this.listeners_[e]||[],this.listeners_[e].push({callback:n,context:i});const r=this.getInitialEvent(e);r&&n.apply(i,r)}off(e,n,i){this.validateEventType_(e);const r=this.listeners_[e]||[];for(let s=0;s<r.length;s++)if(r[s].callback===n&&(!i||i===r[s].context)){r.splice(s,1);return}}validateEventType_(e){g(this.allowedEvents_.find(n=>n===e),"Unknown event: "+e)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Yr extends Rf{static getInstance(){return new Yr}constructor(){super(["online"]),this.online_=!0,typeof window<"u"&&typeof window.addEventListener<"u"&&!Ya()&&(window.addEventListener("online",()=>{this.online_||(this.online_=!0,this.trigger("online",!0))},!1),window.addEventListener("offline",()=>{this.online_&&(this.online_=!1,this.trigger("online",!1))},!1))}getInitialEvent(e){return g(e==="online","Unknown event type: "+e),[this.online_]}currentlyOnline(){return this.online_}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Bu=32,Hu=768;class M{constructor(e,n){if(n===void 0){this.pieces_=e.split("/");let i=0;for(let r=0;r<this.pieces_.length;r++)this.pieces_[r].length>0&&(this.pieces_[i]=this.pieces_[r],i++);this.pieces_.length=i,this.pieceNum_=0}else this.pieces_=e,this.pieceNum_=n}toString(){let e="";for(let n=this.pieceNum_;n<this.pieces_.length;n++)this.pieces_[n]!==""&&(e+="/"+this.pieces_[n]);return e||"/"}}function P(){return new M("")}function I(t){return t.pieceNum_>=t.pieces_.length?null:t.pieces_[t.pieceNum_]}function Ft(t){return t.pieces_.length-t.pieceNum_}function U(t){let e=t.pieceNum_;return e<t.pieces_.length&&e++,new M(t.pieces_,e)}function ic(t){return t.pieceNum_<t.pieces_.length?t.pieces_[t.pieces_.length-1]:null}function yS(t){let e="";for(let n=t.pieceNum_;n<t.pieces_.length;n++)t.pieces_[n]!==""&&(e+="/"+encodeURIComponent(String(t.pieces_[n])));return e||"/"}function $i(t,e=0){return t.pieces_.slice(t.pieceNum_+e)}function Af(t){if(t.pieceNum_>=t.pieces_.length)return null;const e=[];for(let n=t.pieceNum_;n<t.pieces_.length-1;n++)e.push(t.pieces_[n]);return new M(e,0)}function z(t,e){const n=[];for(let i=t.pieceNum_;i<t.pieces_.length;i++)n.push(t.pieces_[i]);if(e instanceof M)for(let i=e.pieceNum_;i<e.pieces_.length;i++)n.push(e.pieces_[i]);else{const i=e.split("/");for(let r=0;r<i.length;r++)i[r].length>0&&n.push(i[r])}return new M(n,0)}function R(t){return t.pieceNum_>=t.pieces_.length}function fe(t,e){const n=I(t),i=I(e);if(n===null)return e;if(n===i)return fe(U(t),U(e));throw new Error("INTERNAL ERROR: innerPath ("+e+") is not within outerPath ("+t+")")}function ES(t,e){const n=$i(t,0),i=$i(e,0);for(let r=0;r<n.length&&r<i.length;r++){const s=pn(n[r],i[r]);if(s!==0)return s}return n.length===i.length?0:n.length<i.length?-1:1}function rc(t,e){if(Ft(t)!==Ft(e))return!1;for(let n=t.pieceNum_,i=e.pieceNum_;n<=t.pieces_.length;n++,i++)if(t.pieces_[n]!==e.pieces_[i])return!1;return!0}function Te(t,e){let n=t.pieceNum_,i=e.pieceNum_;if(Ft(t)>Ft(e))return!1;for(;n<t.pieces_.length;){if(t.pieces_[n]!==e.pieces_[i])return!1;++n,++i}return!0}class vS{constructor(e,n){this.errorPrefix_=n,this.parts_=$i(e,0),this.byteLength_=Math.max(1,this.parts_.length);for(let i=0;i<this.parts_.length;i++)this.byteLength_+=As(this.parts_[i]);Pf(this)}}function wS(t,e){t.parts_.length>0&&(t.byteLength_+=1),t.parts_.push(e),t.byteLength_+=As(e),Pf(t)}function bS(t){const e=t.parts_.pop();t.byteLength_-=As(e),t.parts_.length>0&&(t.byteLength_-=1)}function Pf(t){if(t.byteLength_>Hu)throw new Error(t.errorPrefix_+"has a key path longer than "+Hu+" bytes ("+t.byteLength_+").");if(t.parts_.length>Bu)throw new Error(t.errorPrefix_+"path specified exceeds the maximum depth that can be written ("+Bu+") or object contains a cycle "+Kt(t))}function Kt(t){return t.parts_.length===0?"":"in property '"+t.parts_.join(".")+"'"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class sc extends Rf{static getInstance(){return new sc}constructor(){super(["visible"]);let e,n;typeof document<"u"&&typeof document.addEventListener<"u"&&(typeof document.hidden<"u"?(n="visibilitychange",e="hidden"):typeof document.mozHidden<"u"?(n="mozvisibilitychange",e="mozHidden"):typeof document.msHidden<"u"?(n="msvisibilitychange",e="msHidden"):typeof document.webkitHidden<"u"&&(n="webkitvisibilitychange",e="webkitHidden")),this.visible_=!0,n&&document.addEventListener(n,()=>{const i=!document[e];i!==this.visible_&&(this.visible_=i,this.trigger("visible",i))},!1)}getInitialEvent(e){return g(e==="visible","Unknown event type: "+e),[this.visible_]}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const di=1e3,SS=300*1e3,Wu=30*1e3,CS=1.3,TS=3e4,IS="server_kill",Vu=3;class at extends kf{constructor(e,n,i,r,s,o,a,c){if(super(),this.repoInfo_=e,this.applicationId_=n,this.onDataUpdate_=i,this.onConnectStatus_=r,this.onServerInfoUpdate_=s,this.authTokenProvider_=o,this.appCheckTokenProvider_=a,this.authOverride_=c,this.id=at.nextPersistentConnectionId_++,this.log_=ir("p:"+this.id+":"),this.interruptReasons_={},this.listens=new Map,this.outstandingPuts_=[],this.outstandingGets_=[],this.outstandingPutCount_=0,this.outstandingGetCount_=0,this.onDisconnectRequestQueue_=[],this.connected_=!1,this.reconnectDelay_=di,this.maxReconnectDelay_=SS,this.securityDebugCallback_=null,this.lastSessionId=null,this.establishConnectionTimer_=null,this.visible_=!1,this.requestCBHash_={},this.requestNumber_=0,this.realtime_=null,this.authToken_=null,this.appCheckToken_=null,this.forceTokenRefresh_=!1,this.invalidAuthTokenCount_=0,this.invalidAppCheckTokenCount_=0,this.firstConnection_=!0,this.lastConnectionAttemptTime_=null,this.lastConnectionEstablishedTime_=null,c)throw new Error("Auth override specified in options, but not supported on non Node.js platforms");sc.getInstance().on("visible",this.onVisible_,this),e.host.indexOf("fblocal")===-1&&Yr.getInstance().on("online",this.onOnline_,this)}sendRequest(e,n,i){const r=++this.requestNumber_,s={r,a:e,b:n};this.log_(X(s)),g(this.connected_,"sendRequest call when we're not connected not allowed."),this.realtime_.sendRequest(s),i&&(this.requestCBHash_[r]=i)}get(e){this.initConnection_();const n=new lt,r={action:"g",request:{p:e._path.toString(),q:e._queryObject},onComplete:o=>{const a=o.d;o.s==="ok"?n.resolve(a):n.reject(a)}};this.outstandingGets_.push(r),this.outstandingGetCount_++;const s=this.outstandingGets_.length-1;return this.connected_&&this.sendGet_(s),n.promise}listen(e,n,i,r){this.initConnection_();const s=e._queryIdentifier,o=e._path.toString();this.log_("Listen called for "+o+" "+s),this.listens.has(o)||this.listens.set(o,new Map),g(e._queryParams.isDefault()||!e._queryParams.loadsAllData(),"listen() called for non-default but complete query"),g(!this.listens.get(o).has(s),"listen() called twice for same path/queryId.");const a={onComplete:r,hashFn:n,query:e,tag:i};this.listens.get(o).set(s,a),this.connected_&&this.sendListen_(a)}sendGet_(e){const n=this.outstandingGets_[e];this.sendRequest("g",n.request,i=>{delete this.outstandingGets_[e],this.outstandingGetCount_--,this.outstandingGetCount_===0&&(this.outstandingGets_=[]),n.onComplete&&n.onComplete(i)})}sendListen_(e){const n=e.query,i=n._path.toString(),r=n._queryIdentifier;this.log_("Listen on "+i+" for "+r);const s={p:i},o="q";e.tag&&(s.q=n._queryObject,s.t=e.tag),s.h=e.hashFn(),this.sendRequest(o,s,a=>{const c=a.d,l=a.s;at.warnOnListenWarnings_(c,n),(this.listens.get(i)&&this.listens.get(i).get(r))===e&&(this.log_("listen response",a),l!=="ok"&&this.removeListen_(i,r),e.onComplete&&e.onComplete(l,c))})}static warnOnListenWarnings_(e,n){if(e&&typeof e=="object"&&Ke(e,"w")){const i=xn(e,"w");if(Array.isArray(i)&&~i.indexOf("no_index")){const r='".indexOn": "'+n._queryParams.getIndex().toString()+'"',s=n._path.toString();pe(`Using an unspecified index. Your data will be downloaded and filtered on the client. Consider adding ${r} at ${s} to your security rules for better performance.`)}}}refreshAuthToken(e){this.authToken_=e,this.log_("Auth token refreshed"),this.authToken_?this.tryAuth():this.connected_&&this.sendRequest("unauth",{},()=>{}),this.reduceReconnectDelayIfAdminCredential_(e)}reduceReconnectDelayIfAdminCredential_(e){(e&&e.length===40||uw(e))&&(this.log_("Admin auth credential detected.  Reducing max reconnect time."),this.maxReconnectDelay_=Wu)}refreshAppCheckToken(e){this.appCheckToken_=e,this.log_("App check token refreshed"),this.appCheckToken_?this.tryAppCheck():this.connected_&&this.sendRequest("unappeck",{},()=>{})}tryAuth(){if(this.connected_&&this.authToken_){const e=this.authToken_,n=lw(e)?"auth":"gauth",i={cred:e};this.authOverride_===null?i.noauth=!0:typeof this.authOverride_=="object"&&(i.authvar=this.authOverride_),this.sendRequest(n,i,r=>{const s=r.s,o=r.d||"error";this.authToken_===e&&(s==="ok"?this.invalidAuthTokenCount_=0:this.onAuthRevoked_(s,o))})}}tryAppCheck(){this.connected_&&this.appCheckToken_&&this.sendRequest("appcheck",{token:this.appCheckToken_},e=>{const n=e.s,i=e.d||"error";n==="ok"?this.invalidAppCheckTokenCount_=0:this.onAppCheckRevoked_(n,i)})}unlisten(e,n){const i=e._path.toString(),r=e._queryIdentifier;this.log_("Unlisten called for "+i+" "+r),g(e._queryParams.isDefault()||!e._queryParams.loadsAllData(),"unlisten() called for non-default but complete query"),this.removeListen_(i,r)&&this.connected_&&this.sendUnlisten_(i,r,e._queryObject,n)}sendUnlisten_(e,n,i,r){this.log_("Unlisten on "+e+" for "+n);const s={p:e},o="n";r&&(s.q=i,s.t=r),this.sendRequest(o,s)}onDisconnectPut(e,n,i){this.initConnection_(),this.connected_?this.sendOnDisconnect_("o",e,n,i):this.onDisconnectRequestQueue_.push({pathString:e,action:"o",data:n,onComplete:i})}onDisconnectMerge(e,n,i){this.initConnection_(),this.connected_?this.sendOnDisconnect_("om",e,n,i):this.onDisconnectRequestQueue_.push({pathString:e,action:"om",data:n,onComplete:i})}onDisconnectCancel(e,n){this.initConnection_(),this.connected_?this.sendOnDisconnect_("oc",e,null,n):this.onDisconnectRequestQueue_.push({pathString:e,action:"oc",data:null,onComplete:n})}sendOnDisconnect_(e,n,i,r){const s={p:n,d:i};this.log_("onDisconnect "+e,s),this.sendRequest(e,s,o=>{r&&setTimeout(()=>{r(o.s,o.d)},Math.floor(0))})}put(e,n,i,r){this.putInternal("p",e,n,i,r)}merge(e,n,i,r){this.putInternal("m",e,n,i,r)}putInternal(e,n,i,r,s){this.initConnection_();const o={p:n,d:i};s!==void 0&&(o.h=s),this.outstandingPuts_.push({action:e,request:o,onComplete:r}),this.outstandingPutCount_++;const a=this.outstandingPuts_.length-1;this.connected_?this.sendPut_(a):this.log_("Buffering put: "+n)}sendPut_(e){const n=this.outstandingPuts_[e].action,i=this.outstandingPuts_[e].request,r=this.outstandingPuts_[e].onComplete;this.outstandingPuts_[e].queued=this.connected_,this.sendRequest(n,i,s=>{this.log_(n+" response",s),delete this.outstandingPuts_[e],this.outstandingPutCount_--,this.outstandingPutCount_===0&&(this.outstandingPuts_=[]),r&&r(s.s,s.d)})}reportStats(e){if(this.connected_){const n={c:e};this.log_("reportStats",n),this.sendRequest("s",n,i=>{if(i.s!=="ok"){const s=i.d;this.log_("reportStats","Error sending stats: "+s)}})}}onDataMessage_(e){if("r"in e){this.log_("from server: "+X(e));const n=e.r,i=this.requestCBHash_[n];i&&(delete this.requestCBHash_[n],i(e.b))}else{if("error"in e)throw"A server-side error has occurred: "+e.error;"a"in e&&this.onDataPush_(e.a,e.b)}}onDataPush_(e,n){this.log_("handleServerMessage",e,n),e==="d"?this.onDataUpdate_(n.p,n.d,!1,n.t):e==="m"?this.onDataUpdate_(n.p,n.d,!0,n.t):e==="c"?this.onListenRevoked_(n.p,n.q):e==="ac"?this.onAuthRevoked_(n.s,n.d):e==="apc"?this.onAppCheckRevoked_(n.s,n.d):e==="sd"?this.onSecurityDebugPacket_(n):ea("Unrecognized action received from server: "+X(e)+`
Are you using the latest client?`)}onReady_(e,n){this.log_("connection ready"),this.connected_=!0,this.lastConnectionEstablishedTime_=new Date().getTime(),this.handleTimestamp_(e),this.lastSessionId=n,this.firstConnection_&&this.sendConnectStats_(),this.restoreState_(),this.firstConnection_=!1,this.onConnectStatus_(!0)}scheduleConnect_(e){g(!this.realtime_,"Scheduling a connect when we're already connected/ing?"),this.establishConnectionTimer_&&clearTimeout(this.establishConnectionTimer_),this.establishConnectionTimer_=setTimeout(()=>{this.establishConnectionTimer_=null,this.establishConnection_()},Math.floor(e))}initConnection_(){!this.realtime_&&this.firstConnection_&&this.scheduleConnect_(0)}onVisible_(e){e&&!this.visible_&&this.reconnectDelay_===this.maxReconnectDelay_&&(this.log_("Window became visible.  Reducing delay."),this.reconnectDelay_=di,this.realtime_||this.scheduleConnect_(0)),this.visible_=e}onOnline_(e){e?(this.log_("Browser went online."),this.reconnectDelay_=di,this.realtime_||this.scheduleConnect_(0)):(this.log_("Browser went offline.  Killing connection."),this.realtime_&&this.realtime_.close())}onRealtimeDisconnect_(){if(this.log_("data client disconnected"),this.connected_=!1,this.realtime_=null,this.cancelSentTransactions_(),this.requestCBHash_={},this.shouldReconnect_()){this.visible_?this.lastConnectionEstablishedTime_&&(new Date().getTime()-this.lastConnectionEstablishedTime_>TS&&(this.reconnectDelay_=di),this.lastConnectionEstablishedTime_=null):(this.log_("Window isn't visible.  Delaying reconnect."),this.reconnectDelay_=this.maxReconnectDelay_,this.lastConnectionAttemptTime_=new Date().getTime());const e=Math.max(0,new Date().getTime()-this.lastConnectionAttemptTime_);let n=Math.max(0,this.reconnectDelay_-e);n=Math.random()*n,this.log_("Trying to reconnect in "+n+"ms"),this.scheduleConnect_(n),this.reconnectDelay_=Math.min(this.maxReconnectDelay_,this.reconnectDelay_*CS)}this.onConnectStatus_(!1)}async establishConnection_(){if(this.shouldReconnect_()){this.log_("Making a connection attempt"),this.lastConnectionAttemptTime_=new Date().getTime(),this.lastConnectionEstablishedTime_=null;const e=this.onDataMessage_.bind(this),n=this.onReady_.bind(this),i=this.onRealtimeDisconnect_.bind(this),r=this.id+":"+at.nextConnectionId_++,s=this.lastSessionId;let o=!1,a=null;const c=function(){a?a.close():(o=!0,i())},l=function(d){g(a,"sendRequest call when we're not connected not allowed."),a.sendRequest(d)};this.realtime_={close:c,sendRequest:l};const u=this.forceTokenRefresh_;this.forceTokenRefresh_=!1;try{const[d,h]=await Promise.all([this.authTokenProvider_.getToken(u),this.appCheckTokenProvider_.getToken(u)]);o?re("getToken() completed but was canceled"):(re("getToken() completed. Creating connection."),this.authToken_=d&&d.accessToken,this.appCheckToken_=h&&h.token,a=new _S(r,this.repoInfo_,this.applicationId_,this.appCheckToken_,this.authToken_,e,n,i,f=>{pe(f+" ("+this.repoInfo_.toString()+")"),this.interrupt(IS)},s))}catch(d){this.log_("Failed to get token: "+d),o||(this.repoInfo_.nodeAdmin&&pe(d),c())}}}interrupt(e){re("Interrupting connection for reason: "+e),this.interruptReasons_[e]=!0,this.realtime_?this.realtime_.close():(this.establishConnectionTimer_&&(clearTimeout(this.establishConnectionTimer_),this.establishConnectionTimer_=null),this.connected_&&this.onRealtimeDisconnect_())}resume(e){re("Resuming connection for reason: "+e),delete this.interruptReasons_[e],Yo(this.interruptReasons_)&&(this.reconnectDelay_=di,this.realtime_||this.scheduleConnect_(0))}handleTimestamp_(e){const n=e-new Date().getTime();this.onServerInfoUpdate_({serverTimeOffset:n})}cancelSentTransactions_(){for(let e=0;e<this.outstandingPuts_.length;e++){const n=this.outstandingPuts_[e];n&&"h"in n.request&&n.queued&&(n.onComplete&&n.onComplete("disconnect"),delete this.outstandingPuts_[e],this.outstandingPutCount_--)}this.outstandingPutCount_===0&&(this.outstandingPuts_=[])}onListenRevoked_(e,n){let i;n?i=n.map(s=>Za(s)).join("$"):i="default";const r=this.removeListen_(e,i);r&&r.onComplete&&r.onComplete("permission_denied")}removeListen_(e,n){const i=new M(e).toString();let r;if(this.listens.has(i)){const s=this.listens.get(i);r=s.get(n),s.delete(n),s.size===0&&this.listens.delete(i)}else r=void 0;return r}onAuthRevoked_(e,n){re("Auth token revoked: "+e+"/"+n),this.authToken_=null,this.forceTokenRefresh_=!0,this.realtime_.close(),(e==="invalid_token"||e==="permission_denied")&&(this.invalidAuthTokenCount_++,this.invalidAuthTokenCount_>=Vu&&(this.reconnectDelay_=Wu,this.authTokenProvider_.notifyForInvalidToken()))}onAppCheckRevoked_(e,n){re("App check token revoked: "+e+"/"+n),this.appCheckToken_=null,this.forceTokenRefresh_=!0,(e==="invalid_token"||e==="permission_denied")&&(this.invalidAppCheckTokenCount_++,this.invalidAppCheckTokenCount_>=Vu&&this.appCheckTokenProvider_.notifyForInvalidToken())}onSecurityDebugPacket_(e){this.securityDebugCallback_?this.securityDebugCallback_(e):"msg"in e&&console.log("FIREBASE: "+e.msg.replace(`
`,`
FIREBASE: `))}restoreState_(){this.tryAuth(),this.tryAppCheck();for(const e of this.listens.values())for(const n of e.values())this.sendListen_(n);for(let e=0;e<this.outstandingPuts_.length;e++)this.outstandingPuts_[e]&&this.sendPut_(e);for(;this.onDisconnectRequestQueue_.length;){const e=this.onDisconnectRequestQueue_.shift();this.sendOnDisconnect_(e.action,e.pathString,e.data,e.onComplete)}for(let e=0;e<this.outstandingGets_.length;e++)this.outstandingGets_[e]&&this.sendGet_(e)}sendConnectStats_(){const e={};let n="js";e["sdk."+n+"."+of.replace(/\./g,"-")]=1,Ya()?e["framework.cordova"]=1:Qh()&&(e["framework.reactnative"]=1),this.reportStats(e)}shouldReconnect_(){const e=Yr.getInstance().currentlyOnline();return Yo(this.interruptReasons_)&&e}}at.nextPersistentConnectionId_=0;at.nextConnectionId_=0;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
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
 */class Ns{getCompare(){return this.compare.bind(this)}indexedValueChanged(e,n){const i=new k(Fn,e),r=new k(Fn,n);return this.compare(i,r)!==0}minPost(){return k.MIN}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let yr;class Nf extends Ns{static get __EMPTY_NODE(){return yr}static set __EMPTY_NODE(e){yr=e}compare(e,n){return pn(e.name,n.name)}isDefinedOn(e){throw Xn("KeyIndex.isDefinedOn not expected to be called.")}indexedValueChanged(e,n){return!1}minPost(){return k.MIN}maxPost(){return new k(cn,yr)}makePost(e,n){return g(typeof e=="string","KeyIndex indexValue must always be a string."),new k(e,yr)}toString(){return".key"}}const bn=new Nf;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Er{constructor(e,n,i,r,s=null){this.isReverse_=r,this.resultGenerator_=s,this.nodeStack_=[];let o=1;for(;!e.isEmpty();)if(e=e,o=n?i(e.key,n):1,r&&(o*=-1),o<0)this.isReverse_?e=e.left:e=e.right;else if(o===0){this.nodeStack_.push(e);break}else this.nodeStack_.push(e),this.isReverse_?e=e.right:e=e.left}getNext(){if(this.nodeStack_.length===0)return null;let e=this.nodeStack_.pop(),n;if(this.resultGenerator_?n=this.resultGenerator_(e.key,e.value):n={key:e.key,value:e.value},this.isReverse_)for(e=e.left;!e.isEmpty();)this.nodeStack_.push(e),e=e.right;else for(e=e.right;!e.isEmpty();)this.nodeStack_.push(e),e=e.left;return n}hasNext(){return this.nodeStack_.length>0}peek(){if(this.nodeStack_.length===0)return null;const e=this.nodeStack_[this.nodeStack_.length-1];return this.resultGenerator_?this.resultGenerator_(e.key,e.value):{key:e.key,value:e.value}}}class ee{constructor(e,n,i,r,s){this.key=e,this.value=n,this.color=i??ee.RED,this.left=r??_e.EMPTY_NODE,this.right=s??_e.EMPTY_NODE}copy(e,n,i,r,s){return new ee(e??this.key,n??this.value,i??this.color,r??this.left,s??this.right)}count(){return this.left.count()+1+this.right.count()}isEmpty(){return!1}inorderTraversal(e){return this.left.inorderTraversal(e)||!!e(this.key,this.value)||this.right.inorderTraversal(e)}reverseTraversal(e){return this.right.reverseTraversal(e)||e(this.key,this.value)||this.left.reverseTraversal(e)}min_(){return this.left.isEmpty()?this:this.left.min_()}minKey(){return this.min_().key}maxKey(){return this.right.isEmpty()?this.key:this.right.maxKey()}insert(e,n,i){let r=this;const s=i(e,r.key);return s<0?r=r.copy(null,null,null,r.left.insert(e,n,i),null):s===0?r=r.copy(null,n,null,null,null):r=r.copy(null,null,null,null,r.right.insert(e,n,i)),r.fixUp_()}removeMin_(){if(this.left.isEmpty())return _e.EMPTY_NODE;let e=this;return!e.left.isRed_()&&!e.left.left.isRed_()&&(e=e.moveRedLeft_()),e=e.copy(null,null,null,e.left.removeMin_(),null),e.fixUp_()}remove(e,n){let i,r;if(i=this,n(e,i.key)<0)!i.left.isEmpty()&&!i.left.isRed_()&&!i.left.left.isRed_()&&(i=i.moveRedLeft_()),i=i.copy(null,null,null,i.left.remove(e,n),null);else{if(i.left.isRed_()&&(i=i.rotateRight_()),!i.right.isEmpty()&&!i.right.isRed_()&&!i.right.left.isRed_()&&(i=i.moveRedRight_()),n(e,i.key)===0){if(i.right.isEmpty())return _e.EMPTY_NODE;r=i.right.min_(),i=i.copy(r.key,r.value,null,null,i.right.removeMin_())}i=i.copy(null,null,null,null,i.right.remove(e,n))}return i.fixUp_()}isRed_(){return this.color}fixUp_(){let e=this;return e.right.isRed_()&&!e.left.isRed_()&&(e=e.rotateLeft_()),e.left.isRed_()&&e.left.left.isRed_()&&(e=e.rotateRight_()),e.left.isRed_()&&e.right.isRed_()&&(e=e.colorFlip_()),e}moveRedLeft_(){let e=this.colorFlip_();return e.right.left.isRed_()&&(e=e.copy(null,null,null,null,e.right.rotateRight_()),e=e.rotateLeft_(),e=e.colorFlip_()),e}moveRedRight_(){let e=this.colorFlip_();return e.left.left.isRed_()&&(e=e.rotateRight_(),e=e.colorFlip_()),e}rotateLeft_(){const e=this.copy(null,null,ee.RED,null,this.right.left);return this.right.copy(null,null,this.color,e,null)}rotateRight_(){const e=this.copy(null,null,ee.RED,this.left.right,null);return this.left.copy(null,null,this.color,null,e)}colorFlip_(){const e=this.left.copy(null,null,!this.left.color,null,null),n=this.right.copy(null,null,!this.right.color,null,null);return this.copy(null,null,!this.color,e,n)}checkMaxDepth_(){const e=this.check_();return Math.pow(2,e)<=this.count()+1}check_(){if(this.isRed_()&&this.left.isRed_())throw new Error("Red node has red child("+this.key+","+this.value+")");if(this.right.isRed_())throw new Error("Right child of ("+this.key+","+this.value+") is red");const e=this.left.check_();if(e!==this.right.check_())throw new Error("Black depths differ");return e+(this.isRed_()?0:1)}}ee.RED=!0;ee.BLACK=!1;class kS{copy(e,n,i,r,s){return this}insert(e,n,i){return new ee(e,n,null)}remove(e,n){return this}count(){return 0}isEmpty(){return!0}inorderTraversal(e){return!1}reverseTraversal(e){return!1}minKey(){return null}maxKey(){return null}check_(){return 0}isRed_(){return!1}}class _e{constructor(e,n=_e.EMPTY_NODE){this.comparator_=e,this.root_=n}insert(e,n){return new _e(this.comparator_,this.root_.insert(e,n,this.comparator_).copy(null,null,ee.BLACK,null,null))}remove(e){return new _e(this.comparator_,this.root_.remove(e,this.comparator_).copy(null,null,ee.BLACK,null,null))}get(e){let n,i=this.root_;for(;!i.isEmpty();){if(n=this.comparator_(e,i.key),n===0)return i.value;n<0?i=i.left:n>0&&(i=i.right)}return null}getPredecessorKey(e){let n,i=this.root_,r=null;for(;!i.isEmpty();)if(n=this.comparator_(e,i.key),n===0){if(i.left.isEmpty())return r?r.key:null;for(i=i.left;!i.right.isEmpty();)i=i.right;return i.key}else n<0?i=i.left:n>0&&(r=i,i=i.right);throw new Error("Attempted to find predecessor key for a nonexistent key.  What gives?")}isEmpty(){return this.root_.isEmpty()}count(){return this.root_.count()}minKey(){return this.root_.minKey()}maxKey(){return this.root_.maxKey()}inorderTraversal(e){return this.root_.inorderTraversal(e)}reverseTraversal(e){return this.root_.reverseTraversal(e)}getIterator(e){return new Er(this.root_,null,this.comparator_,!1,e)}getIteratorFrom(e,n){return new Er(this.root_,e,this.comparator_,!1,n)}getReverseIteratorFrom(e,n){return new Er(this.root_,e,this.comparator_,!0,n)}getReverseIterator(e){return new Er(this.root_,null,this.comparator_,!0,e)}}_e.EMPTY_NODE=new kS;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function RS(t,e){return pn(t.name,e.name)}function oc(t,e){return pn(t,e)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let na;function AS(t){na=t}const Lf=function(t){return typeof t=="number"?"number:"+uf(t):"string:"+t},Of=function(t){if(t.isLeafNode()){const e=t.val();g(typeof e=="string"||typeof e=="number"||typeof e=="object"&&Ke(e,".sv"),"Priority must be a string or number.")}else g(t===na||t.isEmpty(),"priority of unexpected type.");g(t===na||t.getPriority().isEmpty(),"Priority nodes can't have a priority of their own.")};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let ju;class Z{static set __childrenNodeConstructor(e){ju=e}static get __childrenNodeConstructor(){return ju}constructor(e,n=Z.__childrenNodeConstructor.EMPTY_NODE){this.value_=e,this.priorityNode_=n,this.lazyHash_=null,g(this.value_!==void 0&&this.value_!==null,"LeafNode shouldn't be created with null/undefined value."),Of(this.priorityNode_)}isLeafNode(){return!0}getPriority(){return this.priorityNode_}updatePriority(e){return new Z(this.value_,e)}getImmediateChild(e){return e===".priority"?this.priorityNode_:Z.__childrenNodeConstructor.EMPTY_NODE}getChild(e){return R(e)?this:I(e)===".priority"?this.priorityNode_:Z.__childrenNodeConstructor.EMPTY_NODE}hasChild(){return!1}getPredecessorChildName(e,n){return null}updateImmediateChild(e,n){return e===".priority"?this.updatePriority(n):n.isEmpty()&&e!==".priority"?this:Z.__childrenNodeConstructor.EMPTY_NODE.updateImmediateChild(e,n).updatePriority(this.priorityNode_)}updateChild(e,n){const i=I(e);return i===null?n:n.isEmpty()&&i!==".priority"?this:(g(i!==".priority"||Ft(e)===1,".priority must be the last token in a path"),this.updateImmediateChild(i,Z.__childrenNodeConstructor.EMPTY_NODE.updateChild(U(e),n)))}isEmpty(){return!1}numChildren(){return 0}forEachChild(e,n){return!1}val(e){return e&&!this.getPriority().isEmpty()?{".value":this.getValue(),".priority":this.getPriority().val()}:this.getValue()}hash(){if(this.lazyHash_===null){let e="";this.priorityNode_.isEmpty()||(e+="priority:"+Lf(this.priorityNode_.val())+":");const n=typeof this.value_;e+=n+":",n==="number"?e+=uf(this.value_):e+=this.value_,this.lazyHash_=cf(e)}return this.lazyHash_}getValue(){return this.value_}compareTo(e){return e===Z.__childrenNodeConstructor.EMPTY_NODE?1:e instanceof Z.__childrenNodeConstructor?-1:(g(e.isLeafNode(),"Unknown node type"),this.compareToLeafNode_(e))}compareToLeafNode_(e){const n=typeof e.value_,i=typeof this.value_,r=Z.VALUE_TYPE_ORDER.indexOf(n),s=Z.VALUE_TYPE_ORDER.indexOf(i);return g(r>=0,"Unknown leaf type: "+n),g(s>=0,"Unknown leaf type: "+i),r===s?i==="object"?0:this.value_<e.value_?-1:this.value_===e.value_?0:1:s-r}withIndex(){return this}isIndexed(){return!0}equals(e){if(e===this)return!0;if(e.isLeafNode()){const n=e;return this.value_===n.value_&&this.priorityNode_.equals(n.priorityNode_)}else return!1}}Z.VALUE_TYPE_ORDER=["object","boolean","number","string"];/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Df,Mf;function PS(t){Df=t}function NS(t){Mf=t}class LS extends Ns{compare(e,n){const i=e.node.getPriority(),r=n.node.getPriority(),s=i.compareTo(r);return s===0?pn(e.name,n.name):s}isDefinedOn(e){return!e.getPriority().isEmpty()}indexedValueChanged(e,n){return!e.getPriority().equals(n.getPriority())}minPost(){return k.MIN}maxPost(){return new k(cn,new Z("[PRIORITY-POST]",Mf))}makePost(e,n){const i=Df(e);return new k(n,new Z("[PRIORITY-POST]",i))}toString(){return".priority"}}const q=new LS;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const OS=Math.log(2);class DS{constructor(e){const n=s=>parseInt(Math.log(s)/OS,10),i=s=>parseInt(Array(s+1).join("1"),2);this.count=n(e+1),this.current_=this.count-1;const r=i(this.count);this.bits_=e+1&r}nextBitIsOne(){const e=!(this.bits_&1<<this.current_);return this.current_--,e}}const Kr=function(t,e,n,i){t.sort(e);const r=function(c,l){const u=l-c;let d,h;if(u===0)return null;if(u===1)return d=t[c],h=n?n(d):d,new ee(h,d.node,ee.BLACK,null,null);{const f=parseInt(u/2,10)+c,p=r(c,f),E=r(f+1,l);return d=t[f],h=n?n(d):d,new ee(h,d.node,ee.BLACK,p,E)}},s=function(c){let l=null,u=null,d=t.length;const h=function(p,E){const m=d-p,T=d;d-=p;const N=r(m+1,T),de=t[m],_=n?n(de):de;f(new ee(_,de.node,E,null,N))},f=function(p){l?(l.left=p,l=p):(u=p,l=p)};for(let p=0;p<c.count;++p){const E=c.nextBitIsOne(),m=Math.pow(2,c.count-(p+1));E?h(m,ee.BLACK):(h(m,ee.BLACK),h(m,ee.RED))}return u},o=new DS(t.length),a=s(o);return new _e(i||e,a)};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let yo;const mn={};class tt{static get Default(){return g(mn&&q,"ChildrenNode.ts has not been loaded"),yo=yo||new tt({".priority":mn},{".priority":q}),yo}constructor(e,n){this.indexes_=e,this.indexSet_=n}get(e){const n=xn(this.indexes_,e);if(!n)throw new Error("No index defined for "+e);return n instanceof _e?n:null}hasIndex(e){return Ke(this.indexSet_,e.toString())}addIndex(e,n){g(e!==bn,"KeyIndex always exists and isn't meant to be added to the IndexMap.");const i=[];let r=!1;const s=n.getIterator(k.Wrap);let o=s.getNext();for(;o;)r=r||e.isDefinedOn(o.node),i.push(o),o=s.getNext();let a;r?a=Kr(i,e.getCompare()):a=mn;const c=e.toString(),l={...this.indexSet_};l[c]=e;const u={...this.indexes_};return u[c]=a,new tt(u,l)}addToIndexes(e,n){const i=Gr(this.indexes_,(r,s)=>{const o=xn(this.indexSet_,s);if(g(o,"Missing index implementation for "+s),r===mn)if(o.isDefinedOn(e.node)){const a=[],c=n.getIterator(k.Wrap);let l=c.getNext();for(;l;)l.name!==e.name&&a.push(l),l=c.getNext();return a.push(e),Kr(a,o.getCompare())}else return mn;else{const a=n.get(e.name);let c=r;return a&&(c=c.remove(new k(e.name,a))),c.insert(e,e.node)}});return new tt(i,this.indexSet_)}removeFromIndexes(e,n){const i=Gr(this.indexes_,r=>{if(r===mn)return r;{const s=n.get(e.name);return s?r.remove(new k(e.name,s)):r}});return new tt(i,this.indexSet_)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let hi;class w{static get EMPTY_NODE(){return hi||(hi=new w(new _e(oc),null,tt.Default))}constructor(e,n,i){this.children_=e,this.priorityNode_=n,this.indexMap_=i,this.lazyHash_=null,this.priorityNode_&&Of(this.priorityNode_),this.children_.isEmpty()&&g(!this.priorityNode_||this.priorityNode_.isEmpty(),"An empty node cannot have a priority")}isLeafNode(){return!1}getPriority(){return this.priorityNode_||hi}updatePriority(e){return this.children_.isEmpty()?this:new w(this.children_,e,this.indexMap_)}getImmediateChild(e){if(e===".priority")return this.getPriority();{const n=this.children_.get(e);return n===null?hi:n}}getChild(e){const n=I(e);return n===null?this:this.getImmediateChild(n).getChild(U(e))}hasChild(e){return this.children_.get(e)!==null}updateImmediateChild(e,n){if(g(n,"We should always be passing snapshot nodes"),e===".priority")return this.updatePriority(n);{const i=new k(e,n);let r,s;n.isEmpty()?(r=this.children_.remove(e),s=this.indexMap_.removeFromIndexes(i,this.children_)):(r=this.children_.insert(e,n),s=this.indexMap_.addToIndexes(i,this.children_));const o=r.isEmpty()?hi:this.priorityNode_;return new w(r,o,s)}}updateChild(e,n){const i=I(e);if(i===null)return n;{g(I(e)!==".priority"||Ft(e)===1,".priority must be the last token in a path");const r=this.getImmediateChild(i).updateChild(U(e),n);return this.updateImmediateChild(i,r)}}isEmpty(){return this.children_.isEmpty()}numChildren(){return this.children_.count()}val(e){if(this.isEmpty())return null;const n={};let i=0,r=0,s=!0;if(this.forEachChild(q,(o,a)=>{n[o]=a.val(e),i++,s&&w.INTEGER_REGEXP_.test(o)?r=Math.max(r,Number(o)):s=!1}),!e&&s&&r<2*i){const o=[];for(const a in n)o[a]=n[a];return o}else return e&&!this.getPriority().isEmpty()&&(n[".priority"]=this.getPriority().val()),n}hash(){if(this.lazyHash_===null){let e="";this.getPriority().isEmpty()||(e+="priority:"+Lf(this.getPriority().val())+":"),this.forEachChild(q,(n,i)=>{const r=i.hash();r!==""&&(e+=":"+n+":"+r)}),this.lazyHash_=e===""?"":cf(e)}return this.lazyHash_}getPredecessorChildName(e,n,i){const r=this.resolveIndex_(i);if(r){const s=r.getPredecessorKey(new k(e,n));return s?s.name:null}else return this.children_.getPredecessorKey(e)}getFirstChildName(e){const n=this.resolveIndex_(e);if(n){const i=n.minKey();return i&&i.name}else return this.children_.minKey()}getFirstChild(e){const n=this.getFirstChildName(e);return n?new k(n,this.children_.get(n)):null}getLastChildName(e){const n=this.resolveIndex_(e);if(n){const i=n.maxKey();return i&&i.name}else return this.children_.maxKey()}getLastChild(e){const n=this.getLastChildName(e);return n?new k(n,this.children_.get(n)):null}forEachChild(e,n){const i=this.resolveIndex_(e);return i?i.inorderTraversal(r=>n(r.name,r.node)):this.children_.inorderTraversal(n)}getIterator(e){return this.getIteratorFrom(e.minPost(),e)}getIteratorFrom(e,n){const i=this.resolveIndex_(n);if(i)return i.getIteratorFrom(e,r=>r);{const r=this.children_.getIteratorFrom(e.name,k.Wrap);let s=r.peek();for(;s!=null&&n.compare(s,e)<0;)r.getNext(),s=r.peek();return r}}getReverseIterator(e){return this.getReverseIteratorFrom(e.maxPost(),e)}getReverseIteratorFrom(e,n){const i=this.resolveIndex_(n);if(i)return i.getReverseIteratorFrom(e,r=>r);{const r=this.children_.getReverseIteratorFrom(e.name,k.Wrap);let s=r.peek();for(;s!=null&&n.compare(s,e)>0;)r.getNext(),s=r.peek();return r}}compareTo(e){return this.isEmpty()?e.isEmpty()?0:-1:e.isLeafNode()||e.isEmpty()?1:e===rr?-1:0}withIndex(e){if(e===bn||this.indexMap_.hasIndex(e))return this;{const n=this.indexMap_.addIndex(e,this.children_);return new w(this.children_,this.priorityNode_,n)}}isIndexed(e){return e===bn||this.indexMap_.hasIndex(e)}equals(e){if(e===this)return!0;if(e.isLeafNode())return!1;{const n=e;if(this.getPriority().equals(n.getPriority()))if(this.children_.count()===n.children_.count()){const i=this.getIterator(q),r=n.getIterator(q);let s=i.getNext(),o=r.getNext();for(;s&&o;){if(s.name!==o.name||!s.node.equals(o.node))return!1;s=i.getNext(),o=r.getNext()}return s===null&&o===null}else return!1;else return!1}}resolveIndex_(e){return e===bn?null:this.indexMap_.get(e.toString())}}w.INTEGER_REGEXP_=/^(0|[1-9]\d*)$/;class MS extends w{constructor(){super(new _e(oc),w.EMPTY_NODE,tt.Default)}compareTo(e){return e===this?0:1}equals(e){return e===this}getPriority(){return this}getImmediateChild(e){return w.EMPTY_NODE}isEmpty(){return!1}}const rr=new MS;Object.defineProperties(k,{MIN:{value:new k(Fn,w.EMPTY_NODE)},MAX:{value:new k(cn,rr)}});Nf.__EMPTY_NODE=w.EMPTY_NODE;Z.__childrenNodeConstructor=w;AS(rr);NS(rr);/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const xS=!0;function J(t,e=null){if(t===null)return w.EMPTY_NODE;if(typeof t=="object"&&".priority"in t&&(e=t[".priority"]),g(e===null||typeof e=="string"||typeof e=="number"||typeof e=="object"&&".sv"in e,"Invalid priority type found: "+typeof e),typeof t=="object"&&".value"in t&&t[".value"]!==null&&(t=t[".value"]),typeof t!="object"||".sv"in t){const n=t;return new Z(n,J(e))}if(!(t instanceof Array)&&xS){const n=[];let i=!1;if(ae(t,(o,a)=>{if(o.substring(0,1)!=="."){const c=J(a);c.isEmpty()||(i=i||!c.getPriority().isEmpty(),n.push(new k(o,c)))}}),n.length===0)return w.EMPTY_NODE;const s=Kr(n,RS,o=>o.name,oc);if(i){const o=Kr(n,q.getCompare());return new w(s,J(e),new tt({".priority":o},{".priority":q}))}else return new w(s,J(e),tt.Default)}else{let n=w.EMPTY_NODE;return ae(t,(i,r)=>{if(Ke(t,i)&&i.substring(0,1)!=="."){const s=J(r);(s.isLeafNode()||!s.isEmpty())&&(n=n.updateImmediateChild(i,s))}}),n.updatePriority(J(e))}}PS(J);/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class FS extends Ns{constructor(e){super(),this.indexPath_=e,g(!R(e)&&I(e)!==".priority","Can't create PathIndex with empty path or .priority key")}extractChild(e){return e.getChild(this.indexPath_)}isDefinedOn(e){return!e.getChild(this.indexPath_).isEmpty()}compare(e,n){const i=this.extractChild(e.node),r=this.extractChild(n.node),s=i.compareTo(r);return s===0?pn(e.name,n.name):s}makePost(e,n){const i=J(e),r=w.EMPTY_NODE.updateChild(this.indexPath_,i);return new k(n,r)}maxPost(){const e=w.EMPTY_NODE.updateChild(this.indexPath_,rr);return new k(cn,e)}toString(){return $i(this.indexPath_,0).join("/")}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class US extends Ns{compare(e,n){const i=e.node.compareTo(n.node);return i===0?pn(e.name,n.name):i}isDefinedOn(e){return!0}indexedValueChanged(e,n){return!e.equals(n)}minPost(){return k.MIN}maxPost(){return k.MAX}makePost(e,n){const i=J(e);return new k(n,i)}toString(){return".value"}}const $S=new US;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function xf(t){return{type:"value",snapshotNode:t}}function Un(t,e){return{type:"child_added",snapshotNode:e,childName:t}}function Bi(t,e){return{type:"child_removed",snapshotNode:e,childName:t}}function Hi(t,e,n){return{type:"child_changed",snapshotNode:e,childName:t,oldSnap:n}}function BS(t,e){return{type:"child_moved",snapshotNode:e,childName:t}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ac{constructor(e){this.index_=e}updateChild(e,n,i,r,s,o){g(e.isIndexed(this.index_),"A node must be indexed if only a child is updated");const a=e.getImmediateChild(n);return a.getChild(r).equals(i.getChild(r))&&a.isEmpty()===i.isEmpty()||(o!=null&&(i.isEmpty()?e.hasChild(n)?o.trackChildChange(Bi(n,a)):g(e.isLeafNode(),"A child remove without an old child only makes sense on a leaf node"):a.isEmpty()?o.trackChildChange(Un(n,i)):o.trackChildChange(Hi(n,i,a))),e.isLeafNode()&&i.isEmpty())?e:e.updateImmediateChild(n,i).withIndex(this.index_)}updateFullNode(e,n,i){return i!=null&&(e.isLeafNode()||e.forEachChild(q,(r,s)=>{n.hasChild(r)||i.trackChildChange(Bi(r,s))}),n.isLeafNode()||n.forEachChild(q,(r,s)=>{if(e.hasChild(r)){const o=e.getImmediateChild(r);o.equals(s)||i.trackChildChange(Hi(r,s,o))}else i.trackChildChange(Un(r,s))})),n.withIndex(this.index_)}updatePriority(e,n){return e.isEmpty()?w.EMPTY_NODE:e.updatePriority(n)}filtersNodes(){return!1}getIndexedFilter(){return this}getIndex(){return this.index_}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Wi{constructor(e){this.indexedFilter_=new ac(e.getIndex()),this.index_=e.getIndex(),this.startPost_=Wi.getStartPost_(e),this.endPost_=Wi.getEndPost_(e),this.startIsInclusive_=!e.startAfterSet_,this.endIsInclusive_=!e.endBeforeSet_}getStartPost(){return this.startPost_}getEndPost(){return this.endPost_}matches(e){const n=this.startIsInclusive_?this.index_.compare(this.getStartPost(),e)<=0:this.index_.compare(this.getStartPost(),e)<0,i=this.endIsInclusive_?this.index_.compare(e,this.getEndPost())<=0:this.index_.compare(e,this.getEndPost())<0;return n&&i}updateChild(e,n,i,r,s,o){return this.matches(new k(n,i))||(i=w.EMPTY_NODE),this.indexedFilter_.updateChild(e,n,i,r,s,o)}updateFullNode(e,n,i){n.isLeafNode()&&(n=w.EMPTY_NODE);let r=n.withIndex(this.index_);r=r.updatePriority(w.EMPTY_NODE);const s=this;return n.forEachChild(q,(o,a)=>{s.matches(new k(o,a))||(r=r.updateImmediateChild(o,w.EMPTY_NODE))}),this.indexedFilter_.updateFullNode(e,r,i)}updatePriority(e,n){return e}filtersNodes(){return!0}getIndexedFilter(){return this.indexedFilter_}getIndex(){return this.index_}static getStartPost_(e){if(e.hasStart()){const n=e.getIndexStartName();return e.getIndex().makePost(e.getIndexStartValue(),n)}else return e.getIndex().minPost()}static getEndPost_(e){if(e.hasEnd()){const n=e.getIndexEndName();return e.getIndex().makePost(e.getIndexEndValue(),n)}else return e.getIndex().maxPost()}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class HS{constructor(e){this.withinDirectionalStart=n=>this.reverse_?this.withinEndPost(n):this.withinStartPost(n),this.withinDirectionalEnd=n=>this.reverse_?this.withinStartPost(n):this.withinEndPost(n),this.withinStartPost=n=>{const i=this.index_.compare(this.rangedFilter_.getStartPost(),n);return this.startIsInclusive_?i<=0:i<0},this.withinEndPost=n=>{const i=this.index_.compare(n,this.rangedFilter_.getEndPost());return this.endIsInclusive_?i<=0:i<0},this.rangedFilter_=new Wi(e),this.index_=e.getIndex(),this.limit_=e.getLimit(),this.reverse_=!e.isViewFromLeft(),this.startIsInclusive_=!e.startAfterSet_,this.endIsInclusive_=!e.endBeforeSet_}updateChild(e,n,i,r,s,o){return this.rangedFilter_.matches(new k(n,i))||(i=w.EMPTY_NODE),e.getImmediateChild(n).equals(i)?e:e.numChildren()<this.limit_?this.rangedFilter_.getIndexedFilter().updateChild(e,n,i,r,s,o):this.fullLimitUpdateChild_(e,n,i,s,o)}updateFullNode(e,n,i){let r;if(n.isLeafNode()||n.isEmpty())r=w.EMPTY_NODE.withIndex(this.index_);else if(this.limit_*2<n.numChildren()&&n.isIndexed(this.index_)){r=w.EMPTY_NODE.withIndex(this.index_);let s;this.reverse_?s=n.getReverseIteratorFrom(this.rangedFilter_.getEndPost(),this.index_):s=n.getIteratorFrom(this.rangedFilter_.getStartPost(),this.index_);let o=0;for(;s.hasNext()&&o<this.limit_;){const a=s.getNext();if(this.withinDirectionalStart(a))if(this.withinDirectionalEnd(a))r=r.updateImmediateChild(a.name,a.node),o++;else break;else continue}}else{r=n.withIndex(this.index_),r=r.updatePriority(w.EMPTY_NODE);let s;this.reverse_?s=r.getReverseIterator(this.index_):s=r.getIterator(this.index_);let o=0;for(;s.hasNext();){const a=s.getNext();o<this.limit_&&this.withinDirectionalStart(a)&&this.withinDirectionalEnd(a)?o++:r=r.updateImmediateChild(a.name,w.EMPTY_NODE)}}return this.rangedFilter_.getIndexedFilter().updateFullNode(e,r,i)}updatePriority(e,n){return e}filtersNodes(){return!0}getIndexedFilter(){return this.rangedFilter_.getIndexedFilter()}getIndex(){return this.index_}fullLimitUpdateChild_(e,n,i,r,s){let o;if(this.reverse_){const d=this.index_.getCompare();o=(h,f)=>d(f,h)}else o=this.index_.getCompare();const a=e;g(a.numChildren()===this.limit_,"");const c=new k(n,i),l=this.reverse_?a.getFirstChild(this.index_):a.getLastChild(this.index_),u=this.rangedFilter_.matches(c);if(a.hasChild(n)){const d=a.getImmediateChild(n);let h=r.getChildAfterChild(this.index_,l,this.reverse_);for(;h!=null&&(h.name===n||a.hasChild(h.name));)h=r.getChildAfterChild(this.index_,h,this.reverse_);const f=h==null?1:o(h,c);if(u&&!i.isEmpty()&&f>=0)return s?.trackChildChange(Hi(n,i,d)),a.updateImmediateChild(n,i);{s?.trackChildChange(Bi(n,d));const E=a.updateImmediateChild(n,w.EMPTY_NODE);return h!=null&&this.rangedFilter_.matches(h)?(s?.trackChildChange(Un(h.name,h.node)),E.updateImmediateChild(h.name,h.node)):E}}else return i.isEmpty()?e:u&&o(l,c)>=0?(s!=null&&(s.trackChildChange(Bi(l.name,l.node)),s.trackChildChange(Un(n,i))),a.updateImmediateChild(n,i).updateImmediateChild(l.name,w.EMPTY_NODE)):e}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class cc{constructor(){this.limitSet_=!1,this.startSet_=!1,this.startNameSet_=!1,this.startAfterSet_=!1,this.endSet_=!1,this.endNameSet_=!1,this.endBeforeSet_=!1,this.limit_=0,this.viewFrom_="",this.indexStartValue_=null,this.indexStartName_="",this.indexEndValue_=null,this.indexEndName_="",this.index_=q}hasStart(){return this.startSet_}isViewFromLeft(){return this.viewFrom_===""?this.startSet_:this.viewFrom_==="l"}getIndexStartValue(){return g(this.startSet_,"Only valid if start has been set"),this.indexStartValue_}getIndexStartName(){return g(this.startSet_,"Only valid if start has been set"),this.startNameSet_?this.indexStartName_:Fn}hasEnd(){return this.endSet_}getIndexEndValue(){return g(this.endSet_,"Only valid if end has been set"),this.indexEndValue_}getIndexEndName(){return g(this.endSet_,"Only valid if end has been set"),this.endNameSet_?this.indexEndName_:cn}hasLimit(){return this.limitSet_}hasAnchoredLimit(){return this.limitSet_&&this.viewFrom_!==""}getLimit(){return g(this.limitSet_,"Only valid if limit has been set"),this.limit_}getIndex(){return this.index_}loadsAllData(){return!(this.startSet_||this.endSet_||this.limitSet_)}isDefault(){return this.loadsAllData()&&this.index_===q}copy(){const e=new cc;return e.limitSet_=this.limitSet_,e.limit_=this.limit_,e.startSet_=this.startSet_,e.startAfterSet_=this.startAfterSet_,e.indexStartValue_=this.indexStartValue_,e.startNameSet_=this.startNameSet_,e.indexStartName_=this.indexStartName_,e.endSet_=this.endSet_,e.endBeforeSet_=this.endBeforeSet_,e.indexEndValue_=this.indexEndValue_,e.endNameSet_=this.endNameSet_,e.indexEndName_=this.indexEndName_,e.index_=this.index_,e.viewFrom_=this.viewFrom_,e}}function WS(t){return t.loadsAllData()?new ac(t.getIndex()):t.hasLimit()?new HS(t):new Wi(t)}function Gu(t){const e={};if(t.isDefault())return e;let n;if(t.index_===q?n="$priority":t.index_===$S?n="$value":t.index_===bn?n="$key":(g(t.index_ instanceof FS,"Unrecognized index type!"),n=t.index_.toString()),e.orderBy=X(n),t.startSet_){const i=t.startAfterSet_?"startAfter":"startAt";e[i]=X(t.indexStartValue_),t.startNameSet_&&(e[i]+=","+X(t.indexStartName_))}if(t.endSet_){const i=t.endBeforeSet_?"endBefore":"endAt";e[i]=X(t.indexEndValue_),t.endNameSet_&&(e[i]+=","+X(t.indexEndName_))}return t.limitSet_&&(t.isViewFromLeft()?e.limitToFirst=t.limit_:e.limitToLast=t.limit_),e}function zu(t){const e={};if(t.startSet_&&(e.sp=t.indexStartValue_,t.startNameSet_&&(e.sn=t.indexStartName_),e.sin=!t.startAfterSet_),t.endSet_&&(e.ep=t.indexEndValue_,t.endNameSet_&&(e.en=t.indexEndName_),e.ein=!t.endBeforeSet_),t.limitSet_){e.l=t.limit_;let n=t.viewFrom_;n===""&&(t.isViewFromLeft()?n="l":n="r"),e.vf=n}return t.index_!==q&&(e.i=t.index_.toString()),e}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Jr extends kf{reportStats(e){throw new Error("Method not implemented.")}static getListenId_(e,n){return n!==void 0?"tag$"+n:(g(e._queryParams.isDefault(),"should have a tag if it's not a default query."),e._path.toString())}constructor(e,n,i,r){super(),this.repoInfo_=e,this.onDataUpdate_=n,this.authTokenProvider_=i,this.appCheckTokenProvider_=r,this.log_=ir("p:rest:"),this.listens_={}}listen(e,n,i,r){const s=e._path.toString();this.log_("Listen called for "+s+" "+e._queryIdentifier);const o=Jr.getListenId_(e,i),a={};this.listens_[o]=a;const c=Gu(e._queryParams);this.restRequest_(s+".json",c,(l,u)=>{let d=u;if(l===404&&(d=null,l=null),l===null&&this.onDataUpdate_(s,d,!1,i),xn(this.listens_,o)===a){let h;l?l===401?h="permission_denied":h="rest_error:"+l:h="ok",r(h,null)}})}unlisten(e,n){const i=Jr.getListenId_(e,n);delete this.listens_[i]}get(e){const n=Gu(e._queryParams),i=e._path.toString(),r=new lt;return this.restRequest_(i+".json",n,(s,o)=>{let a=o;s===404&&(a=null,s=null),s===null?(this.onDataUpdate_(i,a,!1,null),r.resolve(a)):r.reject(new Error(a))}),r.promise}refreshAuthToken(e){}restRequest_(e,n={},i){return n.format="export",Promise.all([this.authTokenProvider_.getToken(!1),this.appCheckTokenProvider_.getToken(!1)]).then(([r,s])=>{r&&r.accessToken&&(n.auth=r.accessToken),s&&s.token&&(n.ac=s.token);const o=(this.repoInfo_.secure?"https://":"http://")+this.repoInfo_.host+e+"?ns="+this.repoInfo_.namespace+ei(n);this.log_("Sending REST request for "+o);const a=new XMLHttpRequest;a.onreadystatechange=()=>{if(i&&a.readyState===4){this.log_("REST Response for "+o+" received. status:",a.status,"response:",a.responseText);let c=null;if(a.status>=200&&a.status<300){try{c=xi(a.responseText)}catch{pe("Failed to parse JSON response for "+o+": "+a.responseText)}i(null,c)}else a.status!==401&&a.status!==404&&pe("Got unsuccessful REST response for "+o+" Status: "+a.status),i(a.status);i=null}},a.open("GET",o,!0),a.send()})}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class VS{constructor(){this.rootNode_=w.EMPTY_NODE}getNode(e){return this.rootNode_.getChild(e)}updateSnapshot(e,n){this.rootNode_=this.rootNode_.updateChild(e,n)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Xr(){return{value:null,children:new Map}}function Ff(t,e,n){if(R(e))t.value=n,t.children.clear();else if(t.value!==null)t.value=t.value.updateChild(e,n);else{const i=I(e);t.children.has(i)||t.children.set(i,Xr());const r=t.children.get(i);e=U(e),Ff(r,e,n)}}function ia(t,e,n){t.value!==null?n(e,t.value):jS(t,(i,r)=>{const s=new M(e.toString()+"/"+i);ia(r,s,n)})}function jS(t,e){t.children.forEach((n,i)=>{e(i,n)})}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class GS{constructor(e){this.collection_=e,this.last_=null}get(){const e=this.collection_.get(),n={...e};return this.last_&&ae(this.last_,(i,r)=>{n[i]=n[i]-r}),this.last_=e,n}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const qu=10*1e3,zS=30*1e3,qS=300*1e3;class YS{constructor(e,n){this.server_=n,this.statsToReport_={},this.statsListener_=new GS(e);const i=qu+(zS-qu)*Math.random();bi(this.reportStats_.bind(this),Math.floor(i))}reportStats_(){const e=this.statsListener_.get(),n={};let i=!1;ae(e,(r,s)=>{s>0&&Ke(this.statsToReport_,r)&&(n[r]=s,i=!0)}),i&&this.server_.reportStats(n),bi(this.reportStats_.bind(this),Math.floor(Math.random()*2*qS))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
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
 */class Qr{constructor(e,n,i){this.path=e,this.affectedTree=n,this.revert=i,this.type=Me.ACK_USER_WRITE,this.source=lc()}operationForChild(e){if(R(this.path)){if(this.affectedTree.value!=null)return g(this.affectedTree.children.isEmpty(),"affectedTree should not have overlapping affected paths."),this;{const n=this.affectedTree.subtree(new M(e));return new Qr(P(),n,this.revert)}}else return g(I(this.path)===e,"operationForChild called for unrelated child."),new Qr(U(this.path),this.affectedTree,this.revert)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Vi{constructor(e,n){this.source=e,this.path=n,this.type=Me.LISTEN_COMPLETE}operationForChild(e){return R(this.path)?new Vi(this.source,P()):new Vi(this.source,U(this.path))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ln{constructor(e,n,i){this.source=e,this.path=n,this.snap=i,this.type=Me.OVERWRITE}operationForChild(e){return R(this.path)?new ln(this.source,P(),this.snap.getImmediateChild(e)):new ln(this.source,U(this.path),this.snap)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class $n{constructor(e,n,i){this.source=e,this.path=n,this.children=i,this.type=Me.MERGE}operationForChild(e){if(R(this.path)){const n=this.children.subtree(new M(e));return n.isEmpty()?null:n.value?new ln(this.source,P(),n.value):new $n(this.source,P(),n)}else return g(I(this.path)===e,"Can't get a merge for a child not on the path of the operation"),new $n(this.source,U(this.path),this.children)}toString(){return"Operation("+this.path+": "+this.source.toString()+" merge: "+this.children.toString()+")"}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ut{constructor(e,n,i){this.node_=e,this.fullyInitialized_=n,this.filtered_=i}isFullyInitialized(){return this.fullyInitialized_}isFiltered(){return this.filtered_}isCompleteForPath(e){if(R(e))return this.isFullyInitialized()&&!this.filtered_;const n=I(e);return this.isCompleteForChild(n)}isCompleteForChild(e){return this.isFullyInitialized()&&!this.filtered_||this.node_.hasChild(e)}getNode(){return this.node_}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class KS{constructor(e){this.query_=e,this.index_=this.query_._queryParams.getIndex()}}function JS(t,e,n,i){const r=[],s=[];return e.forEach(o=>{o.type==="child_changed"&&t.index_.indexedValueChanged(o.oldSnap,o.snapshotNode)&&s.push(BS(o.childName,o.snapshotNode))}),fi(t,r,"child_removed",e,i,n),fi(t,r,"child_added",e,i,n),fi(t,r,"child_moved",s,i,n),fi(t,r,"child_changed",e,i,n),fi(t,r,"value",e,i,n),r}function fi(t,e,n,i,r,s){const o=i.filter(a=>a.type===n);o.sort((a,c)=>QS(t,a,c)),o.forEach(a=>{const c=XS(t,a,s);r.forEach(l=>{l.respondsTo(a.type)&&e.push(l.createEvent(c,t.query_))})})}function XS(t,e,n){return e.type==="value"||e.type==="child_removed"||(e.prevName=n.getPredecessorChildName(e.childName,e.snapshotNode,t.index_)),e}function QS(t,e,n){if(e.childName==null||n.childName==null)throw Xn("Should only compare child_ events.");const i=new k(e.childName,e.snapshotNode),r=new k(n.childName,n.snapshotNode);return t.index_.compare(i,r)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ls(t,e){return{eventCache:t,serverCache:e}}function Si(t,e,n,i){return Ls(new Ut(e,n,i),t.serverCache)}function Uf(t,e,n,i){return Ls(t.eventCache,new Ut(e,n,i))}function Zr(t){return t.eventCache.isFullyInitialized()?t.eventCache.getNode():null}function un(t){return t.serverCache.isFullyInitialized()?t.serverCache.getNode():null}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Eo;const ZS=()=>(Eo||(Eo=new _e(Fb)),Eo);class x{static fromObject(e){let n=new x(null);return ae(e,(i,r)=>{n=n.set(new M(i),r)}),n}constructor(e,n=ZS()){this.value=e,this.children=n}isEmpty(){return this.value===null&&this.children.isEmpty()}findRootMostMatchingPathAndValue(e,n){if(this.value!=null&&n(this.value))return{path:P(),value:this.value};if(R(e))return null;{const i=I(e),r=this.children.get(i);if(r!==null){const s=r.findRootMostMatchingPathAndValue(U(e),n);return s!=null?{path:z(new M(i),s.path),value:s.value}:null}else return null}}findRootMostValueAndPath(e){return this.findRootMostMatchingPathAndValue(e,()=>!0)}subtree(e){if(R(e))return this;{const n=I(e),i=this.children.get(n);return i!==null?i.subtree(U(e)):new x(null)}}set(e,n){if(R(e))return new x(n,this.children);{const i=I(e),s=(this.children.get(i)||new x(null)).set(U(e),n),o=this.children.insert(i,s);return new x(this.value,o)}}remove(e){if(R(e))return this.children.isEmpty()?new x(null):new x(null,this.children);{const n=I(e),i=this.children.get(n);if(i){const r=i.remove(U(e));let s;return r.isEmpty()?s=this.children.remove(n):s=this.children.insert(n,r),this.value===null&&s.isEmpty()?new x(null):new x(this.value,s)}else return this}}get(e){if(R(e))return this.value;{const n=I(e),i=this.children.get(n);return i?i.get(U(e)):null}}setTree(e,n){if(R(e))return n;{const i=I(e),s=(this.children.get(i)||new x(null)).setTree(U(e),n);let o;return s.isEmpty()?o=this.children.remove(i):o=this.children.insert(i,s),new x(this.value,o)}}fold(e){return this.fold_(P(),e)}fold_(e,n){const i={};return this.children.inorderTraversal((r,s)=>{i[r]=s.fold_(z(e,r),n)}),n(e,this.value,i)}findOnPath(e,n){return this.findOnPath_(e,P(),n)}findOnPath_(e,n,i){const r=this.value?i(n,this.value):!1;if(r)return r;if(R(e))return null;{const s=I(e),o=this.children.get(s);return o?o.findOnPath_(U(e),z(n,s),i):null}}foreachOnPath(e,n){return this.foreachOnPath_(e,P(),n)}foreachOnPath_(e,n,i){if(R(e))return this;{this.value&&i(n,this.value);const r=I(e),s=this.children.get(r);return s?s.foreachOnPath_(U(e),z(n,r),i):new x(null)}}foreach(e){this.foreach_(P(),e)}foreach_(e,n){this.children.inorderTraversal((i,r)=>{r.foreach_(z(e,i),n)}),this.value&&n(e,this.value)}foreachChild(e){this.children.inorderTraversal((n,i)=>{i.value&&e(n,i.value)})}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class $e{constructor(e){this.writeTree_=e}static empty(){return new $e(new x(null))}}function Ci(t,e,n){if(R(e))return new $e(new x(n));{const i=t.writeTree_.findRootMostValueAndPath(e);if(i!=null){const r=i.path;let s=i.value;const o=fe(r,e);return s=s.updateChild(o,n),new $e(t.writeTree_.set(r,s))}else{const r=new x(n),s=t.writeTree_.setTree(e,r);return new $e(s)}}}function ra(t,e,n){let i=t;return ae(n,(r,s)=>{i=Ci(i,z(e,r),s)}),i}function Yu(t,e){if(R(e))return $e.empty();{const n=t.writeTree_.setTree(e,new x(null));return new $e(n)}}function sa(t,e){return gn(t,e)!=null}function gn(t,e){const n=t.writeTree_.findRootMostValueAndPath(e);return n!=null?t.writeTree_.get(n.path).getChild(fe(n.path,e)):null}function Ku(t){const e=[],n=t.writeTree_.value;return n!=null?n.isLeafNode()||n.forEachChild(q,(i,r)=>{e.push(new k(i,r))}):t.writeTree_.children.inorderTraversal((i,r)=>{r.value!=null&&e.push(new k(i,r.value))}),e}function Nt(t,e){if(R(e))return t;{const n=gn(t,e);return n!=null?new $e(new x(n)):new $e(t.writeTree_.subtree(e))}}function oa(t){return t.writeTree_.isEmpty()}function Bn(t,e){return $f(P(),t.writeTree_,e)}function $f(t,e,n){if(e.value!=null)return n.updateChild(t,e.value);{let i=null;return e.children.inorderTraversal((r,s)=>{r===".priority"?(g(s.value!==null,"Priority writes must always be leaf nodes"),i=s.value):n=$f(z(t,r),s,n)}),!n.getChild(t).isEmpty()&&i!==null&&(n=n.updateChild(z(t,".priority"),i)),n}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Os(t,e){return Vf(e,t)}function eC(t,e,n,i,r){g(i>t.lastWriteId,"Stacking an older write on top of newer ones"),r===void 0&&(r=!0),t.allWrites.push({path:e,snap:n,writeId:i,visible:r}),r&&(t.visibleWrites=Ci(t.visibleWrites,e,n)),t.lastWriteId=i}function tC(t,e,n,i){g(i>t.lastWriteId,"Stacking an older merge on top of newer ones"),t.allWrites.push({path:e,children:n,writeId:i,visible:!0}),t.visibleWrites=ra(t.visibleWrites,e,n),t.lastWriteId=i}function nC(t,e){for(let n=0;n<t.allWrites.length;n++){const i=t.allWrites[n];if(i.writeId===e)return i}return null}function iC(t,e){const n=t.allWrites.findIndex(a=>a.writeId===e);g(n>=0,"removeWrite called with nonexistent writeId.");const i=t.allWrites[n];t.allWrites.splice(n,1);let r=i.visible,s=!1,o=t.allWrites.length-1;for(;r&&o>=0;){const a=t.allWrites[o];a.visible&&(o>=n&&rC(a,i.path)?r=!1:Te(i.path,a.path)&&(s=!0)),o--}if(r){if(s)return sC(t),!0;if(i.snap)t.visibleWrites=Yu(t.visibleWrites,i.path);else{const a=i.children;ae(a,c=>{t.visibleWrites=Yu(t.visibleWrites,z(i.path,c))})}return!0}else return!1}function rC(t,e){if(t.snap)return Te(t.path,e);for(const n in t.children)if(t.children.hasOwnProperty(n)&&Te(z(t.path,n),e))return!0;return!1}function sC(t){t.visibleWrites=Bf(t.allWrites,oC,P()),t.allWrites.length>0?t.lastWriteId=t.allWrites[t.allWrites.length-1].writeId:t.lastWriteId=-1}function oC(t){return t.visible}function Bf(t,e,n){let i=$e.empty();for(let r=0;r<t.length;++r){const s=t[r];if(e(s)){const o=s.path;let a;if(s.snap)Te(n,o)?(a=fe(n,o),i=Ci(i,a,s.snap)):Te(o,n)&&(a=fe(o,n),i=Ci(i,P(),s.snap.getChild(a)));else if(s.children){if(Te(n,o))a=fe(n,o),i=ra(i,a,s.children);else if(Te(o,n))if(a=fe(o,n),R(a))i=ra(i,P(),s.children);else{const c=xn(s.children,I(a));if(c){const l=c.getChild(U(a));i=Ci(i,P(),l)}}}else throw Xn("WriteRecord should have .snap or .children")}}return i}function Hf(t,e,n,i,r){if(!i&&!r){const s=gn(t.visibleWrites,e);if(s!=null)return s;{const o=Nt(t.visibleWrites,e);if(oa(o))return n;if(n==null&&!sa(o,P()))return null;{const a=n||w.EMPTY_NODE;return Bn(o,a)}}}else{const s=Nt(t.visibleWrites,e);if(!r&&oa(s))return n;if(!r&&n==null&&!sa(s,P()))return null;{const o=function(l){return(l.visible||r)&&(!i||!~i.indexOf(l.writeId))&&(Te(l.path,e)||Te(e,l.path))},a=Bf(t.allWrites,o,e),c=n||w.EMPTY_NODE;return Bn(a,c)}}}function aC(t,e,n){let i=w.EMPTY_NODE;const r=gn(t.visibleWrites,e);if(r)return r.isLeafNode()||r.forEachChild(q,(s,o)=>{i=i.updateImmediateChild(s,o)}),i;if(n){const s=Nt(t.visibleWrites,e);return n.forEachChild(q,(o,a)=>{const c=Bn(Nt(s,new M(o)),a);i=i.updateImmediateChild(o,c)}),Ku(s).forEach(o=>{i=i.updateImmediateChild(o.name,o.node)}),i}else{const s=Nt(t.visibleWrites,e);return Ku(s).forEach(o=>{i=i.updateImmediateChild(o.name,o.node)}),i}}function cC(t,e,n,i,r){g(i||r,"Either existingEventSnap or existingServerSnap must exist");const s=z(e,n);if(sa(t.visibleWrites,s))return null;{const o=Nt(t.visibleWrites,s);return oa(o)?r.getChild(n):Bn(o,r.getChild(n))}}function lC(t,e,n,i){const r=z(e,n),s=gn(t.visibleWrites,r);if(s!=null)return s;if(i.isCompleteForChild(n)){const o=Nt(t.visibleWrites,r);return Bn(o,i.getNode().getImmediateChild(n))}else return null}function uC(t,e){return gn(t.visibleWrites,e)}function dC(t,e,n,i,r,s,o){let a;const c=Nt(t.visibleWrites,e),l=gn(c,P());if(l!=null)a=l;else if(n!=null)a=Bn(c,n);else return[];if(a=a.withIndex(o),!a.isEmpty()&&!a.isLeafNode()){const u=[],d=o.getCompare(),h=s?a.getReverseIteratorFrom(i,o):a.getIteratorFrom(i,o);let f=h.getNext();for(;f&&u.length<r;)d(f,i)!==0&&u.push(f),f=h.getNext();return u}else return[]}function hC(){return{visibleWrites:$e.empty(),allWrites:[],lastWriteId:-1}}function es(t,e,n,i){return Hf(t.writeTree,t.treePath,e,n,i)}function hc(t,e){return aC(t.writeTree,t.treePath,e)}function Ju(t,e,n,i){return cC(t.writeTree,t.treePath,e,n,i)}function ts(t,e){return uC(t.writeTree,z(t.treePath,e))}function fC(t,e,n,i,r,s){return dC(t.writeTree,t.treePath,e,n,i,r,s)}function fc(t,e,n){return lC(t.writeTree,t.treePath,e,n)}function Wf(t,e){return Vf(z(t.treePath,e),t.writeTree)}function Vf(t,e){return{treePath:t,writeTree:e}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class pC{constructor(){this.changeMap=new Map}trackChildChange(e){const n=e.type,i=e.childName;g(n==="child_added"||n==="child_changed"||n==="child_removed","Only child changes supported for tracking"),g(i!==".priority","Only non-priority child changes can be tracked.");const r=this.changeMap.get(i);if(r){const s=r.type;if(n==="child_added"&&s==="child_removed")this.changeMap.set(i,Hi(i,e.snapshotNode,r.snapshotNode));else if(n==="child_removed"&&s==="child_added")this.changeMap.delete(i);else if(n==="child_removed"&&s==="child_changed")this.changeMap.set(i,Bi(i,r.oldSnap));else if(n==="child_changed"&&s==="child_added")this.changeMap.set(i,Un(i,e.snapshotNode));else if(n==="child_changed"&&s==="child_changed")this.changeMap.set(i,Hi(i,e.snapshotNode,r.oldSnap));else throw Xn("Illegal combination of changes: "+e+" occurred after "+r)}else this.changeMap.set(i,e)}getChanges(){return Array.from(this.changeMap.values())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class gC{getCompleteChild(e){return null}getChildAfterChild(e,n,i){return null}}const jf=new gC;class pc{constructor(e,n,i=null){this.writes_=e,this.viewCache_=n,this.optCompleteServerCache_=i}getCompleteChild(e){const n=this.viewCache_.eventCache;if(n.isCompleteForChild(e))return n.getNode().getImmediateChild(e);{const i=this.optCompleteServerCache_!=null?new Ut(this.optCompleteServerCache_,!0,!1):this.viewCache_.serverCache;return fc(this.writes_,e,i)}}getChildAfterChild(e,n,i){const r=this.optCompleteServerCache_!=null?this.optCompleteServerCache_:un(this.viewCache_),s=fC(this.writes_,r,n,1,i,e);return s.length===0?null:s[0]}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function mC(t){return{filter:t}}function _C(t,e){g(e.eventCache.getNode().isIndexed(t.filter.getIndex()),"Event snap not indexed"),g(e.serverCache.getNode().isIndexed(t.filter.getIndex()),"Server snap not indexed")}function yC(t,e,n,i,r){const s=new pC;let o,a;if(n.type===Me.OVERWRITE){const l=n;l.source.fromUser?o=aa(t,e,l.path,l.snap,i,r,s):(g(l.source.fromServer,"Unknown source."),a=l.source.tagged||e.serverCache.isFiltered()&&!R(l.path),o=ns(t,e,l.path,l.snap,i,r,a,s))}else if(n.type===Me.MERGE){const l=n;l.source.fromUser?o=vC(t,e,l.path,l.children,i,r,s):(g(l.source.fromServer,"Unknown source."),a=l.source.tagged||e.serverCache.isFiltered(),o=ca(t,e,l.path,l.children,i,r,a,s))}else if(n.type===Me.ACK_USER_WRITE){const l=n;l.revert?o=SC(t,e,l.path,i,r,s):o=wC(t,e,l.path,l.affectedTree,i,r,s)}else if(n.type===Me.LISTEN_COMPLETE)o=bC(t,e,n.path,i,s);else throw Xn("Unknown operation type: "+n.type);const c=s.getChanges();return EC(e,o,c),{viewCache:o,changes:c}}function EC(t,e,n){const i=e.eventCache;if(i.isFullyInitialized()){const r=i.getNode().isLeafNode()||i.getNode().isEmpty(),s=Zr(t);(n.length>0||!t.eventCache.isFullyInitialized()||r&&!i.getNode().equals(s)||!i.getNode().getPriority().equals(s.getPriority()))&&n.push(xf(Zr(e)))}}function Gf(t,e,n,i,r,s){const o=e.eventCache;if(ts(i,n)!=null)return e;{let a,c;if(R(n))if(g(e.serverCache.isFullyInitialized(),"If change path is empty, we must have complete server data"),e.serverCache.isFiltered()){const l=un(e),u=l instanceof w?l:w.EMPTY_NODE,d=hc(i,u);a=t.filter.updateFullNode(e.eventCache.getNode(),d,s)}else{const l=es(i,un(e));a=t.filter.updateFullNode(e.eventCache.getNode(),l,s)}else{const l=I(n);if(l===".priority"){g(Ft(n)===1,"Can't have a priority with additional path components");const u=o.getNode();c=e.serverCache.getNode();const d=Ju(i,n,u,c);d!=null?a=t.filter.updatePriority(u,d):a=o.getNode()}else{const u=U(n);let d;if(o.isCompleteForChild(l)){c=e.serverCache.getNode();const h=Ju(i,n,o.getNode(),c);h!=null?d=o.getNode().getImmediateChild(l).updateChild(u,h):d=o.getNode().getImmediateChild(l)}else d=fc(i,l,e.serverCache);d!=null?a=t.filter.updateChild(o.getNode(),l,d,u,r,s):a=o.getNode()}}return Si(e,a,o.isFullyInitialized()||R(n),t.filter.filtersNodes())}}function ns(t,e,n,i,r,s,o,a){const c=e.serverCache;let l;const u=o?t.filter:t.filter.getIndexedFilter();if(R(n))l=u.updateFullNode(c.getNode(),i,null);else if(u.filtersNodes()&&!c.isFiltered()){const f=c.getNode().updateChild(n,i);l=u.updateFullNode(c.getNode(),f,null)}else{const f=I(n);if(!c.isCompleteForPath(n)&&Ft(n)>1)return e;const p=U(n),m=c.getNode().getImmediateChild(f).updateChild(p,i);f===".priority"?l=u.updatePriority(c.getNode(),m):l=u.updateChild(c.getNode(),f,m,p,jf,null)}const d=Uf(e,l,c.isFullyInitialized()||R(n),u.filtersNodes()),h=new pc(r,d,s);return Gf(t,d,n,r,h,a)}function aa(t,e,n,i,r,s,o){const a=e.eventCache;let c,l;const u=new pc(r,e,s);if(R(n))l=t.filter.updateFullNode(e.eventCache.getNode(),i,o),c=Si(e,l,!0,t.filter.filtersNodes());else{const d=I(n);if(d===".priority")l=t.filter.updatePriority(e.eventCache.getNode(),i),c=Si(e,l,a.isFullyInitialized(),a.isFiltered());else{const h=U(n),f=a.getNode().getImmediateChild(d);let p;if(R(h))p=i;else{const E=u.getCompleteChild(d);E!=null?ic(h)===".priority"&&E.getChild(Af(h)).isEmpty()?p=E:p=E.updateChild(h,i):p=w.EMPTY_NODE}if(f.equals(p))c=e;else{const E=t.filter.updateChild(a.getNode(),d,p,h,u,o);c=Si(e,E,a.isFullyInitialized(),t.filter.filtersNodes())}}}return c}function Xu(t,e){return t.eventCache.isCompleteForChild(e)}function vC(t,e,n,i,r,s,o){let a=e;return i.foreach((c,l)=>{const u=z(n,c);Xu(e,I(u))&&(a=aa(t,a,u,l,r,s,o))}),i.foreach((c,l)=>{const u=z(n,c);Xu(e,I(u))||(a=aa(t,a,u,l,r,s,o))}),a}function Qu(t,e,n){return n.foreach((i,r)=>{e=e.updateChild(i,r)}),e}function ca(t,e,n,i,r,s,o,a){if(e.serverCache.getNode().isEmpty()&&!e.serverCache.isFullyInitialized())return e;let c=e,l;R(n)?l=i:l=new x(null).setTree(n,i);const u=e.serverCache.getNode();return l.children.inorderTraversal((d,h)=>{if(u.hasChild(d)){const f=e.serverCache.getNode().getImmediateChild(d),p=Qu(t,f,h);c=ns(t,c,new M(d),p,r,s,o,a)}}),l.children.inorderTraversal((d,h)=>{const f=!e.serverCache.isCompleteForChild(d)&&h.value===null;if(!u.hasChild(d)&&!f){const p=e.serverCache.getNode().getImmediateChild(d),E=Qu(t,p,h);c=ns(t,c,new M(d),E,r,s,o,a)}}),c}function wC(t,e,n,i,r,s,o){if(ts(r,n)!=null)return e;const a=e.serverCache.isFiltered(),c=e.serverCache;if(i.value!=null){if(R(n)&&c.isFullyInitialized()||c.isCompleteForPath(n))return ns(t,e,n,c.getNode().getChild(n),r,s,a,o);if(R(n)){let l=new x(null);return c.getNode().forEachChild(bn,(u,d)=>{l=l.set(new M(u),d)}),ca(t,e,n,l,r,s,a,o)}else return e}else{let l=new x(null);return i.foreach((u,d)=>{const h=z(n,u);c.isCompleteForPath(h)&&(l=l.set(u,c.getNode().getChild(h)))}),ca(t,e,n,l,r,s,a,o)}}function bC(t,e,n,i,r){const s=e.serverCache,o=Uf(e,s.getNode(),s.isFullyInitialized()||R(n),s.isFiltered());return Gf(t,o,n,i,jf,r)}function SC(t,e,n,i,r,s){let o;if(ts(i,n)!=null)return e;{const a=new pc(i,e,r),c=e.eventCache.getNode();let l;if(R(n)||I(n)===".priority"){let u;if(e.serverCache.isFullyInitialized())u=es(i,un(e));else{const d=e.serverCache.getNode();g(d instanceof w,"serverChildren would be complete if leaf node"),u=hc(i,d)}u=u,l=t.filter.updateFullNode(c,u,s)}else{const u=I(n);let d=fc(i,u,e.serverCache);d==null&&e.serverCache.isCompleteForChild(u)&&(d=c.getImmediateChild(u)),d!=null?l=t.filter.updateChild(c,u,d,U(n),a,s):e.eventCache.getNode().hasChild(u)?l=t.filter.updateChild(c,u,w.EMPTY_NODE,U(n),a,s):l=c,l.isEmpty()&&e.serverCache.isFullyInitialized()&&(o=es(i,un(e)),o.isLeafNode()&&(l=t.filter.updateFullNode(l,o,s)))}return o=e.serverCache.isFullyInitialized()||ts(i,P())!=null,Si(e,l,o,t.filter.filtersNodes())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class CC{constructor(e,n){this.query_=e,this.eventRegistrations_=[];const i=this.query_._queryParams,r=new ac(i.getIndex()),s=WS(i);this.processor_=mC(s);const o=n.serverCache,a=n.eventCache,c=r.updateFullNode(w.EMPTY_NODE,o.getNode(),null),l=s.updateFullNode(w.EMPTY_NODE,a.getNode(),null),u=new Ut(c,o.isFullyInitialized(),r.filtersNodes()),d=new Ut(l,a.isFullyInitialized(),s.filtersNodes());this.viewCache_=Ls(d,u),this.eventGenerator_=new KS(this.query_)}get query(){return this.query_}}function TC(t){return t.viewCache_.serverCache.getNode()}function IC(t){return Zr(t.viewCache_)}function kC(t,e){const n=un(t.viewCache_);return n&&(t.query._queryParams.loadsAllData()||!R(e)&&!n.getImmediateChild(I(e)).isEmpty())?n.getChild(e):null}function Zu(t){return t.eventRegistrations_.length===0}function RC(t,e){t.eventRegistrations_.push(e)}function ed(t,e,n){const i=[];if(n){g(e==null,"A cancel should cancel all event registrations.");const r=t.query._path;t.eventRegistrations_.forEach(s=>{const o=s.createCancelEvent(n,r);o&&i.push(o)})}if(e){let r=[];for(let s=0;s<t.eventRegistrations_.length;++s){const o=t.eventRegistrations_[s];if(!o.matches(e))r.push(o);else if(e.hasAnyCallback()){r=r.concat(t.eventRegistrations_.slice(s+1));break}}t.eventRegistrations_=r}else t.eventRegistrations_=[];return i}function td(t,e,n,i){e.type===Me.MERGE&&e.source.queryId!==null&&(g(un(t.viewCache_),"We should always have a full cache before handling merges"),g(Zr(t.viewCache_),"Missing event cache, even though we have a server cache"));const r=t.viewCache_,s=yC(t.processor_,r,e,n,i);return _C(t.processor_,s.viewCache),g(s.viewCache.serverCache.isFullyInitialized()||!r.serverCache.isFullyInitialized(),"Once a server snap is complete, it should never go back"),t.viewCache_=s.viewCache,zf(t,s.changes,s.viewCache.eventCache.getNode(),null)}function AC(t,e){const n=t.viewCache_.eventCache,i=[];return n.getNode().isLeafNode()||n.getNode().forEachChild(q,(s,o)=>{i.push(Un(s,o))}),n.isFullyInitialized()&&i.push(xf(n.getNode())),zf(t,i,n.getNode(),e)}function zf(t,e,n,i){const r=i?[i]:t.eventRegistrations_;return JS(t.eventGenerator_,e,n,r)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let is;class qf{constructor(){this.views=new Map}}function PC(t){g(!is,"__referenceConstructor has already been defined"),is=t}function NC(){return g(is,"Reference.ts has not been loaded"),is}function LC(t){return t.views.size===0}function gc(t,e,n,i){const r=e.source.queryId;if(r!==null){const s=t.views.get(r);return g(s!=null,"SyncTree gave us an op for an invalid query."),td(s,e,n,i)}else{let s=[];for(const o of t.views.values())s=s.concat(td(o,e,n,i));return s}}function Yf(t,e,n,i,r){const s=e._queryIdentifier,o=t.views.get(s);if(!o){let a=es(n,r?i:null),c=!1;a?c=!0:i instanceof w?(a=hc(n,i),c=!1):(a=w.EMPTY_NODE,c=!1);const l=Ls(new Ut(a,c,!1),new Ut(i,r,!1));return new CC(e,l)}return o}function OC(t,e,n,i,r,s){const o=Yf(t,e,i,r,s);return t.views.has(e._queryIdentifier)||t.views.set(e._queryIdentifier,o),RC(o,n),AC(o,n)}function DC(t,e,n,i){const r=e._queryIdentifier,s=[];let o=[];const a=$t(t);if(r==="default")for(const[c,l]of t.views.entries())o=o.concat(ed(l,n,i)),Zu(l)&&(t.views.delete(c),l.query._queryParams.loadsAllData()||s.push(l.query));else{const c=t.views.get(r);c&&(o=o.concat(ed(c,n,i)),Zu(c)&&(t.views.delete(r),c.query._queryParams.loadsAllData()||s.push(c.query)))}return a&&!$t(t)&&s.push(new(NC())(e._repo,e._path)),{removed:s,events:o}}function Kf(t){const e=[];for(const n of t.views.values())n.query._queryParams.loadsAllData()||e.push(n);return e}function Lt(t,e){let n=null;for(const i of t.views.values())n=n||kC(i,e);return n}function Jf(t,e){if(e._queryParams.loadsAllData())return Ds(t);{const i=e._queryIdentifier;return t.views.get(i)}}function Xf(t,e){return Jf(t,e)!=null}function $t(t){return Ds(t)!=null}function Ds(t){for(const e of t.views.values())if(e.query._queryParams.loadsAllData())return e;return null}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let rs;function MC(t){g(!rs,"__referenceConstructor has already been defined"),rs=t}function xC(){return g(rs,"Reference.ts has not been loaded"),rs}let FC=1;class nd{constructor(e){this.listenProvider_=e,this.syncPointTree_=new x(null),this.pendingWriteTree_=hC(),this.tagToQueryMap=new Map,this.queryToTagMap=new Map}}function Qf(t,e,n,i,r){return eC(t.pendingWriteTree_,e,n,i,r),r?ii(t,new ln(lc(),e,n)):[]}function UC(t,e,n,i){tC(t.pendingWriteTree_,e,n,i);const r=x.fromObject(n);return ii(t,new $n(lc(),e,r))}function bt(t,e,n=!1){const i=nC(t.pendingWriteTree_,e);if(iC(t.pendingWriteTree_,e)){let s=new x(null);return i.snap!=null?s=s.set(P(),!0):ae(i.children,o=>{s=s.set(new M(o),!0)}),ii(t,new Qr(i.path,s,n))}else return[]}function sr(t,e,n){return ii(t,new ln(uc(),e,n))}function $C(t,e,n){const i=x.fromObject(n);return ii(t,new $n(uc(),e,i))}function BC(t,e){return ii(t,new Vi(uc(),e))}function HC(t,e,n){const i=_c(t,n);if(i){const r=yc(i),s=r.path,o=r.queryId,a=fe(s,e),c=new Vi(dc(o),a);return Ec(t,s,c)}else return[]}function ss(t,e,n,i,r=!1){const s=e._path,o=t.syncPointTree_.get(s);let a=[];if(o&&(e._queryIdentifier==="default"||Xf(o,e))){const c=DC(o,e,n,i);LC(o)&&(t.syncPointTree_=t.syncPointTree_.remove(s));const l=c.removed;if(a=c.events,!r){const u=l.findIndex(h=>h._queryParams.loadsAllData())!==-1,d=t.syncPointTree_.findOnPath(s,(h,f)=>$t(f));if(u&&!d){const h=t.syncPointTree_.subtree(s);if(!h.isEmpty()){const f=jC(h);for(let p=0;p<f.length;++p){const E=f[p],m=E.query,T=np(t,E);t.listenProvider_.startListening(Ti(m),ji(t,m),T.hashFn,T.onComplete)}}}!d&&l.length>0&&!i&&(u?t.listenProvider_.stopListening(Ti(e),null):l.forEach(h=>{const f=t.queryToTagMap.get(Ms(h));t.listenProvider_.stopListening(Ti(h),f)}))}GC(t,l)}return a}function Zf(t,e,n,i){const r=_c(t,i);if(r!=null){const s=yc(r),o=s.path,a=s.queryId,c=fe(o,e),l=new ln(dc(a),c,n);return Ec(t,o,l)}else return[]}function WC(t,e,n,i){const r=_c(t,i);if(r){const s=yc(r),o=s.path,a=s.queryId,c=fe(o,e),l=x.fromObject(n),u=new $n(dc(a),c,l);return Ec(t,o,u)}else return[]}function la(t,e,n,i=!1){const r=e._path;let s=null,o=!1;t.syncPointTree_.foreachOnPath(r,(h,f)=>{const p=fe(h,r);s=s||Lt(f,p),o=o||$t(f)});let a=t.syncPointTree_.get(r);a?(o=o||$t(a),s=s||Lt(a,P())):(a=new qf,t.syncPointTree_=t.syncPointTree_.set(r,a));let c;s!=null?c=!0:(c=!1,s=w.EMPTY_NODE,t.syncPointTree_.subtree(r).foreachChild((f,p)=>{const E=Lt(p,P());E&&(s=s.updateImmediateChild(f,E))}));const l=Xf(a,e);if(!l&&!e._queryParams.loadsAllData()){const h=Ms(e);g(!t.queryToTagMap.has(h),"View does not exist, but we have a tag");const f=zC();t.queryToTagMap.set(h,f),t.tagToQueryMap.set(f,h)}const u=Os(t.pendingWriteTree_,r);let d=OC(a,e,n,u,s,c);if(!l&&!o&&!i){const h=Jf(a,e);d=d.concat(qC(t,e,h))}return d}function mc(t,e,n){const r=t.pendingWriteTree_,s=t.syncPointTree_.findOnPath(e,(o,a)=>{const c=fe(o,e),l=Lt(a,c);if(l)return l});return Hf(r,e,s,n,!0)}function VC(t,e){const n=e._path;let i=null;t.syncPointTree_.foreachOnPath(n,(l,u)=>{const d=fe(l,n);i=i||Lt(u,d)});let r=t.syncPointTree_.get(n);r?i=i||Lt(r,P()):(r=new qf,t.syncPointTree_=t.syncPointTree_.set(n,r));const s=i!=null,o=s?new Ut(i,!0,!1):null,a=Os(t.pendingWriteTree_,e._path),c=Yf(r,e,a,s?o.getNode():w.EMPTY_NODE,s);return IC(c)}function ii(t,e){return ep(e,t.syncPointTree_,null,Os(t.pendingWriteTree_,P()))}function ep(t,e,n,i){if(R(t.path))return tp(t,e,n,i);{const r=e.get(P());n==null&&r!=null&&(n=Lt(r,P()));let s=[];const o=I(t.path),a=t.operationForChild(o),c=e.children.get(o);if(c&&a){const l=n?n.getImmediateChild(o):null,u=Wf(i,o);s=s.concat(ep(a,c,l,u))}return r&&(s=s.concat(gc(r,t,i,n))),s}}function tp(t,e,n,i){const r=e.get(P());n==null&&r!=null&&(n=Lt(r,P()));let s=[];return e.children.inorderTraversal((o,a)=>{const c=n?n.getImmediateChild(o):null,l=Wf(i,o),u=t.operationForChild(o);u&&(s=s.concat(tp(u,a,c,l)))}),r&&(s=s.concat(gc(r,t,i,n))),s}function np(t,e){const n=e.query,i=ji(t,n);return{hashFn:()=>(TC(e)||w.EMPTY_NODE).hash(),onComplete:r=>{if(r==="ok")return i?HC(t,n._path,i):BC(t,n._path);{const s=Bb(r,n);return ss(t,n,null,s)}}}}function ji(t,e){const n=Ms(e);return t.queryToTagMap.get(n)}function Ms(t){return t._path.toString()+"$"+t._queryIdentifier}function _c(t,e){return t.tagToQueryMap.get(e)}function yc(t){const e=t.indexOf("$");return g(e!==-1&&e<t.length-1,"Bad queryKey."),{queryId:t.substr(e+1),path:new M(t.substr(0,e))}}function Ec(t,e,n){const i=t.syncPointTree_.get(e);g(i,"Missing sync point for query tag that we're tracking");const r=Os(t.pendingWriteTree_,e);return gc(i,n,r,null)}function jC(t){return t.fold((e,n,i)=>{if(n&&$t(n))return[Ds(n)];{let r=[];return n&&(r=Kf(n)),ae(i,(s,o)=>{r=r.concat(o)}),r}})}function Ti(t){return t._queryParams.loadsAllData()&&!t._queryParams.isDefault()?new(xC())(t._repo,t._path):t}function GC(t,e){for(let n=0;n<e.length;++n){const i=e[n];if(!i._queryParams.loadsAllData()){const r=Ms(i),s=t.queryToTagMap.get(r);t.queryToTagMap.delete(r),t.tagToQueryMap.delete(s)}}}function zC(){return FC++}function qC(t,e,n){const i=e._path,r=ji(t,e),s=np(t,n),o=t.listenProvider_.startListening(Ti(e),r,s.hashFn,s.onComplete),a=t.syncPointTree_.subtree(i);if(r)g(!$t(a.value),"If we're adding a query, it shouldn't be shadowed");else{const c=a.fold((l,u,d)=>{if(!R(l)&&u&&$t(u))return[Ds(u).query];{let h=[];return u&&(h=h.concat(Kf(u).map(f=>f.query))),ae(d,(f,p)=>{h=h.concat(p)}),h}});for(let l=0;l<c.length;++l){const u=c[l];t.listenProvider_.stopListening(Ti(u),ji(t,u))}}return o}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class vc{constructor(e){this.node_=e}getImmediateChild(e){const n=this.node_.getImmediateChild(e);return new vc(n)}node(){return this.node_}}class wc{constructor(e,n){this.syncTree_=e,this.path_=n}getImmediateChild(e){const n=z(this.path_,e);return new wc(this.syncTree_,n)}node(){return mc(this.syncTree_,this.path_)}}const YC=function(t){return t=t||{},t.timestamp=t.timestamp||new Date().getTime(),t},id=function(t,e,n){if(!t||typeof t!="object")return t;if(g(".sv"in t,"Unexpected leaf node or priority contents"),typeof t[".sv"]=="string")return KC(t[".sv"],e,n);if(typeof t[".sv"]=="object")return JC(t[".sv"],e);g(!1,"Unexpected server value: "+JSON.stringify(t,null,2))},KC=function(t,e,n){switch(t){case"timestamp":return n.timestamp;default:g(!1,"Unexpected server value: "+t)}},JC=function(t,e,n){t.hasOwnProperty("increment")||g(!1,"Unexpected server value: "+JSON.stringify(t,null,2));const i=t.increment;typeof i!="number"&&g(!1,"Unexpected increment value: "+i);const r=e.node();if(g(r!==null&&typeof r<"u","Expected ChildrenNode.EMPTY_NODE for nulls"),!r.isLeafNode())return i;const o=r.getValue();return typeof o!="number"?i:o+i},ip=function(t,e,n,i){return bc(e,new wc(n,t),i)},rp=function(t,e,n){return bc(t,new vc(e),n)};function bc(t,e,n){const i=t.getPriority().val(),r=id(i,e.getImmediateChild(".priority"),n);let s;if(t.isLeafNode()){const o=t,a=id(o.getValue(),e,n);return a!==o.getValue()||r!==o.getPriority().val()?new Z(a,J(r)):t}else{const o=t;return s=o,r!==o.getPriority().val()&&(s=s.updatePriority(new Z(r))),o.forEachChild(q,(a,c)=>{const l=bc(c,e.getImmediateChild(a),n);l!==c&&(s=s.updateImmediateChild(a,l))}),s}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Sc{constructor(e="",n=null,i={children:{},childCount:0}){this.name=e,this.parent=n,this.node=i}}function Cc(t,e){let n=e instanceof M?e:new M(e),i=t,r=I(n);for(;r!==null;){const s=xn(i.node.children,r)||{children:{},childCount:0};i=new Sc(r,i,s),n=U(n),r=I(n)}return i}function ri(t){return t.node.value}function sp(t,e){t.node.value=e,ua(t)}function op(t){return t.node.childCount>0}function XC(t){return ri(t)===void 0&&!op(t)}function xs(t,e){ae(t.node.children,(n,i)=>{e(new Sc(n,t,i))})}function ap(t,e,n,i){n&&e(t),xs(t,r=>{ap(r,e,!0)})}function QC(t,e,n){let i=t.parent;for(;i!==null;){if(e(i))return!0;i=i.parent}return!1}function or(t){return new M(t.parent===null?t.name:or(t.parent)+"/"+t.name)}function ua(t){t.parent!==null&&ZC(t.parent,t.name,t)}function ZC(t,e,n){const i=XC(n),r=Ke(t.node.children,e);i&&r?(delete t.node.children[e],t.node.childCount--,ua(t)):!i&&!r&&(t.node.children[e]=n.node,t.node.childCount++,ua(t))}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const eT=/[\[\].#$\/\u0000-\u001F\u007F]/,tT=/[\[\].#$\u0000-\u001F\u007F]/,vo=10*1024*1024,Tc=function(t){return typeof t=="string"&&t.length!==0&&!eT.test(t)},cp=function(t){return typeof t=="string"&&t.length!==0&&!tT.test(t)},nT=function(t){return t&&(t=t.replace(/^\/*\.info(\/|$)/,"/")),cp(t)},iT=function(t){return t===null||typeof t=="string"||typeof t=="number"&&!Qa(t)||t&&typeof t=="object"&&Ke(t,".sv")},lp=function(t,e,n,i){i&&e===void 0||Fs(Rs(t,"value"),e,n)},Fs=function(t,e,n){const i=n instanceof M?new vS(n,t):n;if(e===void 0)throw new Error(t+"contains undefined "+Kt(i));if(typeof e=="function")throw new Error(t+"contains a function "+Kt(i)+" with contents = "+e.toString());if(Qa(e))throw new Error(t+"contains "+e.toString()+" "+Kt(i));if(typeof e=="string"&&e.length>vo/3&&As(e)>vo)throw new Error(t+"contains a string greater than "+vo+" utf8 bytes "+Kt(i)+" ('"+e.substring(0,50)+"...')");if(e&&typeof e=="object"){let r=!1,s=!1;if(ae(e,(o,a)=>{if(o===".value")r=!0;else if(o!==".priority"&&o!==".sv"&&(s=!0,!Tc(o)))throw new Error(t+" contains an invalid key ("+o+") "+Kt(i)+`.  Keys must be non-empty strings and can't contain ".", "#", "$", "/", "[", or "]"`);wS(i,o),Fs(t,a,i),bS(i)}),r&&s)throw new Error(t+' contains ".value" child '+Kt(i)+" in addition to actual children.")}},rT=function(t,e){let n,i;for(n=0;n<e.length;n++){i=e[n];const s=$i(i);for(let o=0;o<s.length;o++)if(!(s[o]===".priority"&&o===s.length-1)){if(!Tc(s[o]))throw new Error(t+"contains an invalid key ("+s[o]+") in path "+i.toString()+`. Keys must be non-empty strings and can't contain ".", "#", "$", "/", "[", or "]"`)}}e.sort(ES);let r=null;for(n=0;n<e.length;n++){if(i=e[n],r!==null&&Te(r,i))throw new Error(t+"contains a path "+r.toString()+" that is ancestor of another path "+i.toString());r=i}},sT=function(t,e,n,i){const r=Rs(t,"values");if(!(e&&typeof e=="object")||Array.isArray(e))throw new Error(r+" must be an object containing the children to replace.");const s=[];ae(e,(o,a)=>{const c=new M(o);if(Fs(r,a,z(n,c)),ic(c)===".priority"&&!iT(a))throw new Error(r+"contains an invalid value for '"+c.toString()+"', which must be a valid Firebase priority (a string, finite number, server value, or null).");s.push(c)}),rT(r,s)},up=function(t,e,n,i){if(!cp(n))throw new Error(Rs(t,e)+'was an invalid path = "'+n+`". Paths must be non-empty strings and can't contain ".", "#", "$", "[", or "]"`)},oT=function(t,e,n,i){n&&(n=n.replace(/^\/*\.info(\/|$)/,"/")),up(t,e,n)},Ic=function(t,e){if(I(e)===".info")throw new Error(t+" failed = Can't modify data under /.info/")},aT=function(t,e){const n=e.path.toString();if(typeof e.repoInfo.host!="string"||e.repoInfo.host.length===0||!Tc(e.repoInfo.namespace)&&e.repoInfo.host.split(":")[0]!=="localhost"||n.length!==0&&!nT(n))throw new Error(Rs(t,"url")+`must be a valid firebase URL and the path can't contain ".", "#", "$", "[", or "]".`)};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class cT{constructor(){this.eventLists_=[],this.recursionDepth_=0}}function Us(t,e){let n=null;for(let i=0;i<e.length;i++){const r=e[i],s=r.getPath();n!==null&&!rc(s,n.path)&&(t.eventLists_.push(n),n=null),n===null&&(n={events:[],path:s}),n.events.push(r)}n&&t.eventLists_.push(n)}function dp(t,e,n){Us(t,n),hp(t,i=>rc(i,e))}function Pe(t,e,n){Us(t,n),hp(t,i=>Te(i,e)||Te(e,i))}function hp(t,e){t.recursionDepth_++;let n=!0;for(let i=0;i<t.eventLists_.length;i++){const r=t.eventLists_[i];if(r){const s=r.path;e(s)?(lT(t.eventLists_[i]),t.eventLists_[i]=null):n=!1}}n&&(t.eventLists_=[]),t.recursionDepth_--}function lT(t){for(let e=0;e<t.events.length;e++){const n=t.events[e];if(n!==null){t.events[e]=null;const i=n.getEventRunner();wi&&re("event: "+n.toString()),ni(i)}}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const uT="repo_interrupt",dT=25;class hT{constructor(e,n,i,r){this.repoInfo_=e,this.forceRestClient_=n,this.authTokenProvider_=i,this.appCheckProvider_=r,this.dataUpdateCount=0,this.statsListener_=null,this.eventQueue_=new cT,this.nextWriteId_=1,this.interceptServerDataCallback_=null,this.onDisconnect_=Xr(),this.transactionQueueTree_=new Sc,this.persistentConnection_=null,this.key=this.repoInfo_.toURLString()}toString(){return(this.repoInfo_.secure?"https://":"http://")+this.repoInfo_.host}}function fT(t,e,n){if(t.stats_=tc(t.repoInfo_),t.forceRestClient_||jb())t.server_=new Jr(t.repoInfo_,(i,r,s,o)=>{rd(t,i,r,s,o)},t.authTokenProvider_,t.appCheckProvider_),setTimeout(()=>sd(t,!0),0);else{if(typeof n<"u"&&n!==null){if(typeof n!="object")throw new Error("Only objects are supported for option databaseAuthVariableOverride");try{X(n)}catch(i){throw new Error("Invalid authOverride provided: "+i)}}t.persistentConnection_=new at(t.repoInfo_,e,(i,r,s,o)=>{rd(t,i,r,s,o)},i=>{sd(t,i)},i=>{pT(t,i)},t.authTokenProvider_,t.appCheckProvider_,n),t.server_=t.persistentConnection_}t.authTokenProvider_.addTokenChangeListener(i=>{t.server_.refreshAuthToken(i)}),t.appCheckProvider_.addTokenChangeListener(i=>{t.server_.refreshAppCheckToken(i.token)}),t.statsReporter_=Kb(t.repoInfo_,()=>new YS(t.stats_,t.server_)),t.infoData_=new VS,t.infoSyncTree_=new nd({startListening:(i,r,s,o)=>{let a=[];const c=t.infoData_.getNode(i._path);return c.isEmpty()||(a=sr(t.infoSyncTree_,i._path,c),setTimeout(()=>{o("ok")},0)),a},stopListening:()=>{}}),kc(t,"connected",!1),t.serverSyncTree_=new nd({startListening:(i,r,s,o)=>(t.server_.listen(i,s,r,(a,c)=>{const l=o(a,c);Pe(t.eventQueue_,i._path,l)}),[]),stopListening:(i,r)=>{t.server_.unlisten(i,r)}})}function fp(t){const n=t.infoData_.getNode(new M(".info/serverTimeOffset")).val()||0;return new Date().getTime()+n}function $s(t){return YC({timestamp:fp(t)})}function rd(t,e,n,i,r){t.dataUpdateCount++;const s=new M(e);n=t.interceptServerDataCallback_?t.interceptServerDataCallback_(e,n):n;let o=[];if(r)if(i){const c=Gr(n,l=>J(l));o=WC(t.serverSyncTree_,s,c,r)}else{const c=J(n);o=Zf(t.serverSyncTree_,s,c,r)}else if(i){const c=Gr(n,l=>J(l));o=$C(t.serverSyncTree_,s,c)}else{const c=J(n);o=sr(t.serverSyncTree_,s,c)}let a=s;o.length>0&&(a=Hn(t,s)),Pe(t.eventQueue_,a,o)}function sd(t,e){kc(t,"connected",e),e===!1&&yT(t)}function pT(t,e){ae(e,(n,i)=>{kc(t,n,i)})}function kc(t,e,n){const i=new M("/.info/"+e),r=J(n);t.infoData_.updateSnapshot(i,r);const s=sr(t.infoSyncTree_,i,r);Pe(t.eventQueue_,i,s)}function Rc(t){return t.nextWriteId_++}function gT(t,e,n){const i=VC(t.serverSyncTree_,e);return i!=null?Promise.resolve(i):t.server_.get(e).then(r=>{const s=J(r).withIndex(e._queryParams.getIndex());la(t.serverSyncTree_,e,n,!0);let o;if(e._queryParams.loadsAllData())o=sr(t.serverSyncTree_,e._path,s);else{const a=ji(t.serverSyncTree_,e);o=Zf(t.serverSyncTree_,e._path,s,a)}return Pe(t.eventQueue_,e._path,o),ss(t.serverSyncTree_,e,n,null,!0),s},r=>(ar(t,"get for query "+X(e)+" failed: "+r),Promise.reject(new Error(r))))}function mT(t,e,n,i,r){ar(t,"set",{path:e.toString(),value:n,priority:i});const s=$s(t),o=J(n,i),a=mc(t.serverSyncTree_,e),c=rp(o,a,s),l=Rc(t),u=Qf(t.serverSyncTree_,e,c,l,!0);Us(t.eventQueue_,u),t.server_.put(e.toString(),o.val(!0),(h,f)=>{const p=h==="ok";p||pe("set at "+e+" failed: "+h);const E=bt(t.serverSyncTree_,l,!p);Pe(t.eventQueue_,e,E),da(t,r,h,f)});const d=Pc(t,e);Hn(t,d),Pe(t.eventQueue_,d,[])}function _T(t,e,n,i){ar(t,"update",{path:e.toString(),value:n});let r=!0;const s=$s(t),o={};if(ae(n,(a,c)=>{r=!1,o[a]=ip(z(e,a),J(c),t.serverSyncTree_,s)}),r)re("update() called with empty data.  Don't do anything."),da(t,i,"ok",void 0);else{const a=Rc(t),c=UC(t.serverSyncTree_,e,o,a);Us(t.eventQueue_,c),t.server_.merge(e.toString(),n,(l,u)=>{const d=l==="ok";d||pe("update at "+e+" failed: "+l);const h=bt(t.serverSyncTree_,a,!d),f=h.length>0?Hn(t,e):e;Pe(t.eventQueue_,f,h),da(t,i,l,u)}),ae(n,l=>{const u=Pc(t,z(e,l));Hn(t,u)}),Pe(t.eventQueue_,e,[])}}function yT(t){ar(t,"onDisconnectEvents");const e=$s(t),n=Xr();ia(t.onDisconnect_,P(),(r,s)=>{const o=ip(r,s,t.serverSyncTree_,e);Ff(n,r,o)});let i=[];ia(n,P(),(r,s)=>{i=i.concat(sr(t.serverSyncTree_,r,s));const o=Pc(t,r);Hn(t,o)}),t.onDisconnect_=Xr(),Pe(t.eventQueue_,P(),i)}function ET(t,e,n){let i;I(e._path)===".info"?i=la(t.infoSyncTree_,e,n):i=la(t.serverSyncTree_,e,n),dp(t.eventQueue_,e._path,i)}function pp(t,e,n){let i;I(e._path)===".info"?i=ss(t.infoSyncTree_,e,n):i=ss(t.serverSyncTree_,e,n),dp(t.eventQueue_,e._path,i)}function vT(t){t.persistentConnection_&&t.persistentConnection_.interrupt(uT)}function ar(t,...e){let n="";t.persistentConnection_&&(n=t.persistentConnection_.id+":"),re(n,...e)}function da(t,e,n,i){e&&ni(()=>{if(n==="ok")e(null);else{const r=(n||"error").toUpperCase();let s=r;i&&(s+=": "+i);const o=new Error(s);o.code=r,e(o)}})}function gp(t,e,n){return mc(t.serverSyncTree_,e,n)||w.EMPTY_NODE}function Ac(t,e=t.transactionQueueTree_){if(e||Bs(t,e),ri(e)){const n=_p(t,e);g(n.length>0,"Sending zero length transaction queue"),n.every(r=>r.status===0)&&wT(t,or(e),n)}else op(e)&&xs(e,n=>{Ac(t,n)})}function wT(t,e,n){const i=n.map(l=>l.currentWriteId),r=gp(t,e,i);let s=r;const o=r.hash();for(let l=0;l<n.length;l++){const u=n[l];g(u.status===0,"tryToSendTransactionQueue_: items in queue should all be run."),u.status=1,u.retryCount++;const d=fe(e,u.path);s=s.updateChild(d,u.currentOutputSnapshotRaw)}const a=s.val(!0),c=e;t.server_.put(c.toString(),a,l=>{ar(t,"transaction put response",{path:c.toString(),status:l});let u=[];if(l==="ok"){const d=[];for(let h=0;h<n.length;h++)n[h].status=2,u=u.concat(bt(t.serverSyncTree_,n[h].currentWriteId)),n[h].onComplete&&d.push(()=>n[h].onComplete(null,!0,n[h].currentOutputSnapshotResolved)),n[h].unwatcher();Bs(t,Cc(t.transactionQueueTree_,e)),Ac(t,t.transactionQueueTree_),Pe(t.eventQueue_,e,u);for(let h=0;h<d.length;h++)ni(d[h])}else{if(l==="datastale")for(let d=0;d<n.length;d++)n[d].status===3?n[d].status=4:n[d].status=0;else{pe("transaction at "+c.toString()+" failed: "+l);for(let d=0;d<n.length;d++)n[d].status=4,n[d].abortReason=l}Hn(t,e)}},o)}function Hn(t,e){const n=mp(t,e),i=or(n),r=_p(t,n);return bT(t,r,i),i}function bT(t,e,n){if(e.length===0)return;const i=[];let r=[];const o=e.filter(a=>a.status===0).map(a=>a.currentWriteId);for(let a=0;a<e.length;a++){const c=e[a],l=fe(n,c.path);let u=!1,d;if(g(l!==null,"rerunTransactionsUnderNode_: relativePath should not be null."),c.status===4)u=!0,d=c.abortReason,r=r.concat(bt(t.serverSyncTree_,c.currentWriteId,!0));else if(c.status===0)if(c.retryCount>=dT)u=!0,d="maxretry",r=r.concat(bt(t.serverSyncTree_,c.currentWriteId,!0));else{const h=gp(t,c.path,o);c.currentInputSnapshot=h;const f=e[a].update(h.val());if(f!==void 0){Fs("transaction failed: Data returned ",f,c.path);let p=J(f);typeof f=="object"&&f!=null&&Ke(f,".priority")||(p=p.updatePriority(h.getPriority()));const m=c.currentWriteId,T=$s(t),N=rp(p,h,T);c.currentOutputSnapshotRaw=p,c.currentOutputSnapshotResolved=N,c.currentWriteId=Rc(t),o.splice(o.indexOf(m),1),r=r.concat(Qf(t.serverSyncTree_,c.path,N,c.currentWriteId,c.applyLocally)),r=r.concat(bt(t.serverSyncTree_,m,!0))}else u=!0,d="nodata",r=r.concat(bt(t.serverSyncTree_,c.currentWriteId,!0))}Pe(t.eventQueue_,n,r),r=[],u&&(e[a].status=2,(function(h){setTimeout(h,Math.floor(0))})(e[a].unwatcher),e[a].onComplete&&(d==="nodata"?i.push(()=>e[a].onComplete(null,!1,e[a].currentInputSnapshot)):i.push(()=>e[a].onComplete(new Error(d),!1,null))))}Bs(t,t.transactionQueueTree_);for(let a=0;a<i.length;a++)ni(i[a]);Ac(t,t.transactionQueueTree_)}function mp(t,e){let n,i=t.transactionQueueTree_;for(n=I(e);n!==null&&ri(i)===void 0;)i=Cc(i,n),e=U(e),n=I(e);return i}function _p(t,e){const n=[];return yp(t,e,n),n.sort((i,r)=>i.order-r.order),n}function yp(t,e,n){const i=ri(e);if(i)for(let r=0;r<i.length;r++)n.push(i[r]);xs(e,r=>{yp(t,r,n)})}function Bs(t,e){const n=ri(e);if(n){let i=0;for(let r=0;r<n.length;r++)n[r].status!==2&&(n[i]=n[r],i++);n.length=i,sp(e,n.length>0?n:void 0)}xs(e,i=>{Bs(t,i)})}function Pc(t,e){const n=or(mp(t,e)),i=Cc(t.transactionQueueTree_,e);return QC(i,r=>{wo(t,r)}),wo(t,i),ap(i,r=>{wo(t,r)}),n}function wo(t,e){const n=ri(e);if(n){const i=[];let r=[],s=-1;for(let o=0;o<n.length;o++)n[o].status===3||(n[o].status===1?(g(s===o-1,"All SENT items should be at beginning of queue."),s=o,n[o].status=3,n[o].abortReason="set"):(g(n[o].status===0,"Unexpected transaction status in abort"),n[o].unwatcher(),r=r.concat(bt(t.serverSyncTree_,n[o].currentWriteId,!0)),n[o].onComplete&&i.push(n[o].onComplete.bind(null,new Error("set"),!1,null))));s===-1?sp(e,void 0):n.length=s+1,Pe(t.eventQueue_,or(e),r);for(let o=0;o<i.length;o++)ni(i[o])}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ST(t){let e="";const n=t.split("/");for(let i=0;i<n.length;i++)if(n[i].length>0){let r=n[i];try{r=decodeURIComponent(r.replace(/\+/g," "))}catch{}e+="/"+r}return e}function CT(t){const e={};t.charAt(0)==="?"&&(t=t.substring(1));for(const n of t.split("&")){if(n.length===0)continue;const i=n.split("=");i.length===2?e[decodeURIComponent(i[0])]=decodeURIComponent(i[1]):pe(`Invalid query segment '${n}' in query '${t}'`)}return e}const od=function(t,e){const n=TT(t),i=n.namespace;n.domain==="firebase.com"&&ht(n.host+" is no longer supported. Please use <YOUR FIREBASE>.firebaseio.com instead"),(!i||i==="undefined")&&n.domain!=="localhost"&&ht("Cannot parse Firebase url. Please use https://<YOUR FIREBASE>.firebaseio.com"),n.secure||Mb();const r=n.scheme==="ws"||n.scheme==="wss";return{repoInfo:new vf(n.host,n.secure,i,r,e,"",i!==n.subdomain),path:new M(n.pathString)}},TT=function(t){let e="",n="",i="",r="",s="",o=!0,a="https",c=443;if(typeof t=="string"){let l=t.indexOf("//");l>=0&&(a=t.substring(0,l-1),t=t.substring(l+2));let u=t.indexOf("/");u===-1&&(u=t.length);let d=t.indexOf("?");d===-1&&(d=t.length),e=t.substring(0,Math.min(u,d)),u<d&&(r=ST(t.substring(u,d)));const h=CT(t.substring(Math.min(t.length,d)));l=e.indexOf(":"),l>=0?(o=a==="https"||a==="wss",c=parseInt(e.substring(l+1),10)):l=e.length;const f=e.slice(0,l);if(f.toLowerCase()==="localhost")n="localhost";else if(f.split(".").length<=2)n=f;else{const p=e.indexOf(".");i=e.substring(0,p).toLowerCase(),n=e.substring(p+1),s=i}"ns"in h&&(s=h.ns)}return{host:e,port:c,domain:n,subdomain:i,secure:o,scheme:a,pathString:r,namespace:s}};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ad="-0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ_abcdefghijklmnopqrstuvwxyz",IT=(function(){let t=0;const e=[];return function(n){const i=n===t;t=n;let r;const s=new Array(8);for(r=7;r>=0;r--)s[r]=ad.charAt(n%64),n=Math.floor(n/64);g(n===0,"Cannot push at time == 0");let o=s.join("");if(i){for(r=11;r>=0&&e[r]===63;r--)e[r]=0;e[r]++}else for(r=0;r<12;r++)e[r]=Math.floor(Math.random()*64);for(r=0;r<12;r++)o+=ad.charAt(e[r]);return g(o.length===20,"nextPushId: Length should be 20."),o}})();/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ep{constructor(e,n,i,r){this.eventType=e,this.eventRegistration=n,this.snapshot=i,this.prevName=r}getPath(){const e=this.snapshot.ref;return this.eventType==="value"?e._path:e.parent._path}getEventType(){return this.eventType}getEventRunner(){return this.eventRegistration.getEventRunner(this)}toString(){return this.getPath().toString()+":"+this.eventType+":"+X(this.snapshot.exportVal())}}class vp{constructor(e,n,i){this.eventRegistration=e,this.error=n,this.path=i}getPath(){return this.path}getEventType(){return"cancel"}getEventRunner(){return this.eventRegistration.getEventRunner(this)}toString(){return this.path.toString()+":cancel"}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
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
 */class Lc{constructor(e,n,i,r){this._repo=e,this._path=n,this._queryParams=i,this._orderByCalled=r}get key(){return R(this._path)?null:ic(this._path)}get ref(){return new Je(this._repo,this._path)}get _queryIdentifier(){const e=zu(this._queryParams),n=Za(e);return n==="{}"?"default":n}get _queryObject(){return zu(this._queryParams)}isEqual(e){if(e=ce(e),!(e instanceof Lc))return!1;const n=this._repo===e._repo,i=rc(this._path,e._path),r=this._queryIdentifier===e._queryIdentifier;return n&&i&&r}toJSON(){return this.toString()}toString(){return this._repo.toString()+yS(this._path)}}class Je extends Lc{constructor(e,n){super(e,n,new cc,!1)}get parent(){const e=Af(this._path);return e===null?null:new Je(this._repo,e)}get root(){let e=this;for(;e.parent!==null;)e=e.parent;return e}}class Wn{constructor(e,n,i){this._node=e,this.ref=n,this._index=i}get priority(){return this._node.getPriority().val()}get key(){return this.ref.key}get size(){return this._node.numChildren()}child(e){const n=new M(e),i=Vn(this.ref,e);return new Wn(this._node.getChild(n),i,q)}exists(){return!this._node.isEmpty()}exportVal(){return this._node.val(!0)}forEach(e){return this._node.isLeafNode()?!1:!!this._node.forEachChild(this._index,(i,r)=>e(new Wn(r,Vn(this.ref,i),q)))}hasChild(e){const n=new M(e);return!this._node.getChild(n).isEmpty()}hasChildren(){return this._node.isLeafNode()?!1:!this._node.isEmpty()}toJSON(){return this.exportVal()}val(){return this._node.val()}}function se(t,e){return t=ce(t),t._checkNotDeleted("ref"),e!==void 0?Vn(t._root,e):t._root}function Vn(t,e){return t=ce(t),I(t._path)===null?oT("child","path",e):up("child","path",e),new Je(t._repo,z(t._path,e))}function cd(t,e){t=ce(t),Ic("push",t._path),lp("push",e,t._path,!0);const n=fp(t._repo),i=IT(n),r=Vn(t,i),s=Vn(t,i);let o;return o=Promise.resolve(s),r.then=o.then.bind(o),r.catch=o.then.bind(o,void 0),r}function jn(t){return Ic("remove",t._path),ft(t,null)}function ft(t,e){t=ce(t),Ic("set",t._path),lp("set",e,t._path,!1);const n=new lt;return mT(t._repo,t._path,e,null,n.wrapCallback(()=>{})),n.promise}function Nr(t,e){sT("update",e,t._path);const n=new lt;return _T(t._repo,t._path,e,n.wrapCallback(()=>{})),n.promise}function tn(t){t=ce(t);const e=new Nc(()=>{}),n=new cr(e);return gT(t._repo,t,n).then(i=>new Wn(i,new Je(t._repo,t._path),t._queryParams.getIndex()))}class cr{constructor(e){this.callbackContext=e}respondsTo(e){return e==="value"}createEvent(e,n){const i=n._queryParams.getIndex();return new Ep("value",this,new Wn(e.snapshotNode,new Je(n._repo,n._path),i))}getEventRunner(e){return e.getEventType()==="cancel"?()=>this.callbackContext.onCancel(e.error):()=>this.callbackContext.onValue(e.snapshot,null)}createCancelEvent(e,n){return this.callbackContext.hasCancelCallback?new vp(this,e,n):null}matches(e){return e instanceof cr?!e.callbackContext||!this.callbackContext?!0:e.callbackContext.matches(this.callbackContext):!1}hasAnyCallback(){return this.callbackContext!==null}}class Hs{constructor(e,n){this.eventType=e,this.callbackContext=n}respondsTo(e){let n=e==="children_added"?"child_added":e;return n=n==="children_removed"?"child_removed":n,this.eventType===n}createCancelEvent(e,n){return this.callbackContext.hasCancelCallback?new vp(this,e,n):null}createEvent(e,n){g(e.childName!=null,"Child events should have a childName.");const i=Vn(new Je(n._repo,n._path),e.childName),r=n._queryParams.getIndex();return new Ep(e.type,this,new Wn(e.snapshotNode,i,r),e.prevName)}getEventRunner(e){return e.getEventType()==="cancel"?()=>this.callbackContext.onCancel(e.error):()=>this.callbackContext.onValue(e.snapshot,e.prevName)}matches(e){return e instanceof Hs?this.eventType===e.eventType&&(!this.callbackContext||!e.callbackContext||this.callbackContext.matches(e.callbackContext)):!1}hasAnyCallback(){return!!this.callbackContext}}function Oc(t,e,n,i,r){const s=new Nc(n,void 0),o=e==="value"?new cr(s):new Hs(e,s);return ET(t._repo,t,o),()=>pp(t._repo,t,o)}function kT(t,e,n,i){return Oc(t,"value",e)}function RT(t,e,n,i){return Oc(t,"child_added",e)}function AT(t,e,n,i){return Oc(t,"child_removed",e)}function Ws(t,e,n){let i=null;const r=n?new Nc(n):null;e==="value"?i=new cr(r):e&&(i=new Hs(e,r)),pp(t._repo,t,i)}PC(Je);MC(Je);/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const PT="FIREBASE_DATABASE_EMULATOR_HOST",ha={};let NT=!1;function LT(t,e,n,i){const r=e.lastIndexOf(":"),s=e.substring(0,r),o=Qn(s);t.repoInfo_=new vf(e,o,t.repoInfo_.namespace,t.repoInfo_.webSocketOnly,t.repoInfo_.nodeAdmin,t.repoInfo_.persistenceKey,t.repoInfo_.includeNamespaceInQueryParams,!0,n),i&&(t.authTokenProvider_=i)}function OT(t,e,n,i,r){let s=i||t.options.databaseURL;s===void 0&&(t.options.projectId||ht("Can't determine Firebase Database URL. Be sure to include  a Project ID when calling firebase.initializeApp()."),re("Using default host for project ",t.options.projectId),s=`${t.options.projectId}-default-rtdb.firebaseio.com`);let o=od(s,r),a=o.repoInfo,c;typeof process<"u"&&Ru&&(c=Ru[PT]),c?(s=`http://${c}?ns=${a.namespace}`,o=od(s,r),a=o.repoInfo):o.repoInfo.secure;const l=new zb(t.name,t.options,e);aT("Invalid Firebase Database URL",o),R(o.path)||ht("Database URL must point to the root of a Firebase Database (not including a child path).");const u=MT(a,t,l,new Gb(t,n));return new xT(u,t)}function DT(t,e){const n=ha[e];(!n||n[t.key]!==t)&&ht(`Database ${e}(${t.repoInfo_}) has already been deleted.`),vT(t),delete n[t.key]}function MT(t,e,n,i){let r=ha[e.name];r||(r={},ha[e.name]=r);let s=r[t.toURLString()];return s&&ht("Database initialized multiple times. Please make sure the format of the database URL matches with each database() call."),s=new hT(t,NT,n,i),r[t.toURLString()]=s,s}class xT{constructor(e,n){this._repoInternal=e,this.app=n,this.type="database",this._instanceStarted=!1}get _repo(){return this._instanceStarted||(fT(this._repoInternal,this.app.options.appId,this.app.options.databaseAuthVariableOverride),this._instanceStarted=!0),this._repoInternal}get _root(){return this._rootInternal||(this._rootInternal=new Je(this._repo,P())),this._rootInternal}_delete(){return this._rootInternal!==null&&(DT(this._repo,this.app.name),this._repoInternal=null,this._rootInternal=null),Promise.resolve()}_checkNotDeleted(e){this._rootInternal===null&&ht("Cannot call "+e+" on a deleted database.")}}function FT(t=Xa(),e){const n=tr(t,"database").getImmediate({identifier:e});if(!n._instanceStarted){const i=Xv("database");i&&UT(n,...i)}return n}function UT(t,e,n,i={}){t=ce(t),t._checkNotDeleted("useEmulator");const r=`${e}:${n}`,s=t._repoInternal;if(t._instanceStarted){if(r===t._repoInternal.repoInfo_.host&&an(i,s.repoInfo_.emulatorOptions))return;ht("connectDatabaseEmulator() cannot initialize or alter the emulator configuration after the database instance has started.")}let o;if(s.repoInfo_.nodeAdmin)i.mockUserToken&&ht('mockUserToken is not supported by the Admin SDK. For client access with mock users, please use the "firebase" package instead of "firebase-admin".'),o=new Pr(Pr.OWNER);else if(i.mockUserToken){const a=typeof i.mockUserToken=="string"?i.mockUserToken:Qv(i.mockUserToken,t.app.options.projectId);o=new Pr(a)}Qn(e)&&(Jh(e),Xh("Database",!0)),LT(s,r,i,o)}/**
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
 */function $T(t){Ab(ti),xt(new ut("database",(e,{instanceIdentifier:n})=>{const i=e.getProvider("app").getImmediate(),r=e.getProvider("auth-internal"),s=e.getProvider("app-check-internal");return OT(i,r,s,n)},"PUBLIC").setMultipleInstances(!0)),ot(Au,Pu,t),ot(Au,Pu,"esm2020")}at.prototype.simpleListen=function(t,e){this.sendRequest("q",{p:t},e)};at.prototype.echo=function(t,e){this.sendRequest("echo",{d:t},e)};$T();var BT="firebase",HT="12.4.0";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ot(BT,HT,"app");/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const fa=new Map,wp={activated:!1,tokenObservers:[]},WT={initialized:!1,enabled:!1};function Q(t){return fa.get(t)||{...wp}}function VT(t,e){return fa.set(t,e),fa.get(t)}function Vs(){return WT}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const bp="https://content-firebaseappcheck.googleapis.com/v1",jT="exchangeRecaptchaEnterpriseToken",GT="exchangeDebugToken",ld={RETRIAL_MIN_WAIT:30*1e3,RETRIAL_MAX_WAIT:960*1e3},zT=1440*60*1e3;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class qT{constructor(e,n,i,r,s){if(this.operation=e,this.retryPolicy=n,this.getWaitDuration=i,this.lowerBound=r,this.upperBound=s,this.pending=null,this.nextErrorWaitInterval=r,r>s)throw new Error("Proactive refresh lower bound greater than upper bound!")}start(){this.nextErrorWaitInterval=this.lowerBound,this.process(!0).catch(()=>{})}stop(){this.pending&&(this.pending.reject("cancelled"),this.pending=null)}isRunning(){return!!this.pending}async process(e){this.stop();try{this.pending=new lt,this.pending.promise.catch(n=>{}),await YT(this.getNextRun(e)),this.pending.resolve(),await this.pending.promise,this.pending=new lt,this.pending.promise.catch(n=>{}),await this.operation(),this.pending.resolve(),await this.pending.promise,this.process(!0).catch(()=>{})}catch(n){this.retryPolicy(n)?this.process(!1).catch(()=>{}):this.stop()}}getNextRun(e){if(e)return this.nextErrorWaitInterval=this.lowerBound,this.getWaitDuration();{const n=this.nextErrorWaitInterval;return this.nextErrorWaitInterval*=2,this.nextErrorWaitInterval>this.upperBound&&(this.nextErrorWaitInterval=this.upperBound),n}}}function YT(t){return new Promise(e=>{setTimeout(e,t)})}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const KT={"already-initialized":"You have already called initializeAppCheck() for FirebaseApp {$appName} with different options. To avoid this error, call initializeAppCheck() with the same options as when it was originally called. This will return the already initialized instance.","use-before-activation":"App Check is being used before initializeAppCheck() is called for FirebaseApp {$appName}. Call initializeAppCheck() before instantiating other Firebase services.","fetch-network-error":"Fetch failed to connect to a network. Check Internet connection. Original error: {$originalErrorMessage}.","fetch-parse-error":"Fetch client could not parse response. Original error: {$originalErrorMessage}.","fetch-status-error":"Fetch server returned an HTTP error status. HTTP status: {$httpStatus}.","storage-open":"Error thrown when opening storage. Original error: {$originalErrorMessage}.","storage-get":"Error thrown when reading from storage. Original error: {$originalErrorMessage}.","storage-set":"Error thrown when writing to storage. Original error: {$originalErrorMessage}.","recaptcha-error":"ReCAPTCHA error.","initial-throttle":"{$httpStatus} error. Attempts allowed again after {$time}",throttled:"Requests throttled due to previous {$httpStatus} error. Attempts allowed again after {$time}"},ye=new Zn("appCheck","AppCheck",KT);/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ud(t=!1){return t?self.grecaptcha?.enterprise:self.grecaptcha}function Dc(t){if(!Q(t).activated)throw ye.create("use-before-activation",{appName:t.name})}function Sp(t){const e=Math.round(t/1e3),n=Math.floor(e/(3600*24)),i=Math.floor((e-n*3600*24)/3600),r=Math.floor((e-n*3600*24-i*3600)/60),s=e-n*3600*24-i*3600-r*60;let o="";return n&&(o+=vr(n)+"d:"),i&&(o+=vr(i)+"h:"),o+=vr(r)+"m:"+vr(s)+"s",o}function vr(t){return t===0?"00":t>=10?t.toString():"0"+t}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Mc({url:t,body:e},n){const i={"Content-Type":"application/json"},r=n.getImmediate({optional:!0});if(r){const d=await r.getHeartbeatsHeader();d&&(i["X-Firebase-Client"]=d)}const s={method:"POST",body:JSON.stringify(e),headers:i};let o;try{o=await fetch(t,s)}catch(d){throw ye.create("fetch-network-error",{originalErrorMessage:d?.message})}if(o.status!==200)throw ye.create("fetch-status-error",{httpStatus:o.status});let a;try{a=await o.json()}catch(d){throw ye.create("fetch-parse-error",{originalErrorMessage:d?.message})}const c=a.ttl.match(/^([\d.]+)(s)$/);if(!c||!c[2]||isNaN(Number(c[1])))throw ye.create("fetch-parse-error",{originalErrorMessage:`ttl field (timeToLive) is not in standard Protobuf Duration format: ${a.ttl}`});const l=Number(c[1])*1e3,u=Date.now();return{token:a.token,expireTimeMillis:u+l,issuedAtTimeMillis:u}}function JT(t,e){const{projectId:n,appId:i,apiKey:r}=t.options;return{url:`${bp}/projects/${n}/apps/${i}:${jT}?key=${r}`,body:{recaptcha_enterprise_token:e}}}function Cp(t,e){const{projectId:n,appId:i,apiKey:r}=t.options;return{url:`${bp}/projects/${n}/apps/${i}:${GT}?key=${r}`,body:{debug_token:e}}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const XT="firebase-app-check-database",QT=1,Gi="firebase-app-check-store",Tp="debug-token";let wr=null;function Ip(){return wr||(wr=new Promise((t,e)=>{try{const n=indexedDB.open(XT,QT);n.onsuccess=i=>{t(i.target.result)},n.onerror=i=>{e(ye.create("storage-open",{originalErrorMessage:i.target.error?.message}))},n.onupgradeneeded=i=>{const r=i.target.result;switch(i.oldVersion){case 0:r.createObjectStore(Gi,{keyPath:"compositeKey"})}}}catch(n){e(ye.create("storage-open",{originalErrorMessage:n?.message}))}}),wr)}function ZT(t){return Rp(Ap(t))}function eI(t,e){return kp(Ap(t),e)}function tI(t){return kp(Tp,t)}function nI(){return Rp(Tp)}async function kp(t,e){const i=(await Ip()).transaction(Gi,"readwrite"),s=i.objectStore(Gi).put({compositeKey:t,value:e});return new Promise((o,a)=>{s.onsuccess=c=>{o()},i.onerror=c=>{a(ye.create("storage-set",{originalErrorMessage:c.target.error?.message}))}})}async function Rp(t){const n=(await Ip()).transaction(Gi,"readonly"),r=n.objectStore(Gi).get(t);return new Promise((s,o)=>{r.onsuccess=a=>{const c=a.target.result;s(c?c.value:void 0)},n.onerror=a=>{o(ye.create("storage-get",{originalErrorMessage:a.target.error?.message}))}})}function Ap(t){return`${t.options.appId}-${t.name}`}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
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
 */async function iI(t){if(Ka()){let e;try{e=await ZT(t)}catch(n){St.warn(`Failed to read token from IndexedDB. Error: ${n}`)}return e}}function bo(t,e){return Ka()?eI(t,e).catch(n=>{St.warn(`Failed to write token to IndexedDB. Error: ${n}`)}):Promise.resolve()}async function rI(){let t;try{t=await nI()}catch{}if(t)return t;{const e=crypto.randomUUID();return tI(e).catch(n=>St.warn(`Failed to persist debug token to IndexedDB. Error: ${n}`)),e}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
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
        `)}function sI(){const t=zh(),e=Vs();if(e.initialized=!0,typeof t.FIREBASE_APPCHECK_DEBUG_TOKEN!="string"&&t.FIREBASE_APPCHECK_DEBUG_TOKEN!==!0)return;e.enabled=!0;const n=new lt;e.token=n,typeof t.FIREBASE_APPCHECK_DEBUG_TOKEN=="string"?n.resolve(t.FIREBASE_APPCHECK_DEBUG_TOKEN):n.resolve(rI())}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const oI={error:"UNKNOWN_ERROR"};function aI(t){return ks.encodeString(JSON.stringify(t),!1)}async function pa(t,e=!1,n=!1){const i=t.app;Dc(i);const r=Q(i);let s=r.token,o;if(s&&!En(s)&&(r.token=void 0,s=void 0),!s){const l=await r.cachedTokenPromise;l&&(En(l)?s=l:await bo(i,void 0))}if(!e&&s&&En(s))return{token:s.token};let a=!1;if(xc())try{r.exchangeTokenPromise||(r.exchangeTokenPromise=Mc(Cp(i,await Fc()),t.heartbeatServiceProvider).finally(()=>{r.exchangeTokenPromise=void 0}),a=!0);const l=await r.exchangeTokenPromise;return await bo(i,l),r.token=l,{token:l.token}}catch(l){return l.code==="appCheck/throttled"||l.code==="appCheck/initial-throttle"?St.warn(l.message):n&&St.error(l),So(l)}try{r.exchangeTokenPromise||(r.exchangeTokenPromise=r.provider.getToken().finally(()=>{r.exchangeTokenPromise=void 0}),a=!0),s=await Q(i).exchangeTokenPromise}catch(l){l.code==="appCheck/throttled"||l.code==="appCheck/initial-throttle"?St.warn(l.message):n&&St.error(l),o=l}let c;return s?o?En(s)?c={token:s.token,internalError:o}:c=So(o):(c={token:s.token},r.token=s,await bo(i,s)):c=So(o),a&&Lp(i,c),c}async function cI(t){const e=t.app;Dc(e);const{provider:n}=Q(e);if(xc()){const i=await Fc(),{token:r}=await Mc(Cp(e,i),t.heartbeatServiceProvider);return{token:r}}else{const{token:i}=await n.getToken();return{token:i}}}function Pp(t,e,n,i){const{app:r}=t,s=Q(r),o={next:n,error:i,type:e};if(s.tokenObservers=[...s.tokenObservers,o],s.token&&En(s.token)){const a=s.token;Promise.resolve().then(()=>{n({token:a.token}),dd(t)}).catch(()=>{})}s.cachedTokenPromise.then(()=>dd(t))}function Np(t,e){const n=Q(t),i=n.tokenObservers.filter(r=>r.next!==e);i.length===0&&n.tokenRefresher&&n.tokenRefresher.isRunning()&&n.tokenRefresher.stop(),n.tokenObservers=i}function dd(t){const{app:e}=t,n=Q(e);let i=n.tokenRefresher;i||(i=lI(t),n.tokenRefresher=i),!i.isRunning()&&n.isTokenAutoRefreshEnabled&&i.start()}function lI(t){const{app:e}=t;return new qT(async()=>{const n=Q(e);let i;if(n.token?i=await pa(t,!0):i=await pa(t),i.error)throw i.error;if(i.internalError)throw i.internalError},()=>!0,()=>{const n=Q(e);if(n.token){let i=n.token.issuedAtTimeMillis+(n.token.expireTimeMillis-n.token.issuedAtTimeMillis)*.5+3e5;const r=n.token.expireTimeMillis-300*1e3;return i=Math.min(i,r),Math.max(0,i-Date.now())}else return 0},ld.RETRIAL_MIN_WAIT,ld.RETRIAL_MAX_WAIT)}function Lp(t,e){const n=Q(t).tokenObservers;for(const i of n)try{i.type==="EXTERNAL"&&e.error!=null?i.error(e.error):i.next(e)}catch{}}function En(t){return t.expireTimeMillis-Date.now()>0}function So(t){return{token:aI(oI),error:t}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class uI{constructor(e,n){this.app=e,this.heartbeatServiceProvider=n}_delete(){const{tokenObservers:e}=Q(this.app);for(const n of e)Np(this.app,n.next);return Promise.resolve()}}function dI(t,e){return new uI(t,e)}function hI(t){return{getToken:e=>pa(t,e),getLimitedUseToken:()=>cI(t),addTokenListener:e=>Pp(t,"INTERNAL",e),removeTokenListener:e=>Np(t.app,e)}}const fI="@firebase/app-check",pI="0.11.0",gI="https://www.google.com/recaptcha/enterprise.js";function mI(t,e){const n=new lt,i=Q(t);i.reCAPTCHAState={initialized:n};const r=_I(t),s=ud(!0);return s?hd(t,e,s,r,n):vI(()=>{const o=ud(!0);if(!o)throw new Error("no recaptcha");hd(t,e,o,r,n)}),n.promise}function hd(t,e,n,i,r){n.ready(()=>{EI(t,e,n,i),r.resolve(n)})}function _I(t){const e=`fire_app_check_${t.name}`,n=document.createElement("div");return n.id=e,n.style.display="none",document.body.appendChild(n),e}async function yI(t){Dc(t);const n=await Q(t).reCAPTCHAState.initialized.promise;return new Promise((i,r)=>{const s=Q(t).reCAPTCHAState;n.ready(()=>{i(n.execute(s.widgetId,{action:"fire_app_check"}))})})}function EI(t,e,n,i){const r=n.render(i,{sitekey:e,size:"invisible",callback:()=>{Q(t).reCAPTCHAState.succeeded=!0},"error-callback":()=>{Q(t).reCAPTCHAState.succeeded=!1}}),s=Q(t);s.reCAPTCHAState={...s.reCAPTCHAState,widgetId:r}}function vI(t){const e=document.createElement("script");e.src=gI,e.onload=t,document.head.appendChild(e)}class Uc{constructor(e){this._siteKey=e,this._throttleData=null}async getToken(){bI(this._throttleData);const e=await yI(this._app).catch(i=>{throw ye.create("recaptcha-error")});if(!Q(this._app).reCAPTCHAState?.succeeded)throw ye.create("recaptcha-error");let n;try{n=await Mc(JT(this._app,e),this._heartbeatServiceProvider)}catch(i){throw i.code?.includes("fetch-status-error")?(this._throttleData=wI(Number(i.customData?.httpStatus),this._throttleData),ye.create("initial-throttle",{time:Sp(this._throttleData.allowRequestsAfter-Date.now()),httpStatus:this._throttleData.httpStatus})):i}return this._throttleData=null,n}initialize(e){this._app=e,this._heartbeatServiceProvider=tr(e,"heartbeat"),mI(e,this._siteKey).catch(()=>{})}isEqual(e){return e instanceof Uc?this._siteKey===e._siteKey:!1}}function wI(t,e){if(t===404||t===403)return{backoffCount:1,allowRequestsAfter:Date.now()+zT,httpStatus:t};{const n=e?e.backoffCount:0,i=vw(n,1e3,2);return{backoffCount:n+1,allowRequestsAfter:Date.now()+i,httpStatus:t}}}function bI(t){if(t&&Date.now()-t.allowRequestsAfter<=0)throw ye.create("throttled",{time:Sp(t.allowRequestsAfter-Date.now()),httpStatus:t.httpStatus})}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function SI(t=Xa(),e){t=ce(t);const n=tr(t,"app-check");if(Vs().initialized||sI(),xc()&&Fc().then(r=>console.log(`App Check debug token: ${r}. You will need to add it to your app's App Check settings in the Firebase console for it to work.`)),n.isInitialized()){const r=n.getImmediate(),s=n.getOptions();if(s.isTokenAutoRefreshEnabled===e.isTokenAutoRefreshEnabled&&s.provider.isEqual(e.provider))return r;throw ye.create("already-initialized",{appName:t.name})}const i=n.initialize({options:e});return CI(t,e.provider,e.isTokenAutoRefreshEnabled),Q(t).isTokenAutoRefreshEnabled&&Pp(i,"INTERNAL",()=>{}),i}function CI(t,e,n=!1){const i=VT(t,{...wp});i.activated=!0,i.provider=e,i.cachedTokenPromise=iI(t).then(r=>(r&&En(r)&&(i.token=r,Lp(t,{token:r.token})),r)),i.isTokenAutoRefreshEnabled=n&&t.automaticDataCollectionEnabled,!t.automaticDataCollectionEnabled&&n&&St.warn("`isTokenAutoRefreshEnabled` is true but `automaticDataCollectionEnabled` was set to false during `initializeApp()`. This blocks automatic token refresh."),i.provider.initialize(t)}const TI="app-check",fd="app-check-internal";function II(){xt(new ut(TI,t=>{const e=t.getProvider("app").getImmediate(),n=t.getProvider("heartbeat");return dI(e,n)},"PUBLIC").setInstantiationMode("EXPLICIT").setInstanceCreatedCallback((t,e,n)=>{t.getProvider(fd).initialize()})),xt(new ut(fd,t=>{const e=t.getProvider("app-check").getImmediate();return hI(e)},"PUBLIC").setInstantiationMode("EXPLICIT")),ot(fI,pI)}II();const kI={apiKey:"AIzaSyA-fvCaKCjyEFX__YAVr1oPGdVsUEhFehA",authDomain:"vidu-aae11.firebaseapp.com",projectId:"vidu-aae11",databaseURL:"https://vidu-aae11-default-rtdb.europe-west1.firebasedatabase.app",storageBucket:"vidu-aae11.firebasestorage.app",messagingSenderId:"765724787439",appId:"1:765724787439:web:61a3b5dd538149564c911a",measurementId:"G-EGJ53HLGY4"},$c=nf(kI),pd="6LdBIBgsAAAAAB4zIcXaZI-FD4kt21TWs9Zx9_fp";let ga;if(pd.trim()!=="")ga=new Uc(pd),console.info("[Firebase App Check: PROD] Initializing with ReCAPTCHA Enterprise (invisible mode).");else throw console.error("[Firebase App Check: PROD] VITE_RECAPTCHA_ENTERPRISE_SITE_KEY is missing or empty. App Check will NOT be initialized, leaving Firebase services unprotected!"),new Error("Firebase App Check configuration missing in production.");if(ga)try{SI($c,{provider:ga,isTokenAutoRefreshEnabled:!0})}catch(t){console.error("[Firebase App Check] initializeAppCheck call failed:",t)}const oe=FT($c),xe=[];function Xt(t,e,n,i=null,r=null,s=null){e==="value"?kT(t,n):e==="child_added"?RT(t,n):e==="child_removed"?AT(t,n):console.warn(`Unknown listener type: ${e}`),xe.push({ref:t,type:e,callback:n,roomId:i,userId:r,category:s})}function RI(){xe.forEach(({ref:t,type:e,callback:n})=>{try{Ws(t,e,n)}catch(i){console.warn("Failed to remove firebase rtdb listener",i)}}),xe.length=0}function js(t){if(!t)return;xe.filter(i=>i.roomId===t).forEach(({ref:i,type:r,callback:s})=>{try{Ws(i,r,s)}catch(o){console.warn(`Failed to remove listener for room ${t}`,o)}});const n=xe.filter(i=>i.roomId!==t);xe.length=0,xe.push(...n)}function AI(t,e){if(!t||!e)return;const n=s=>s.userId===t&&s.roomId===e;xe.filter(n).forEach(({ref:s,type:o,callback:a})=>{try{Ws(s,o,a)}catch(c){console.warn(`Failed to remove listener for user ${t} in room ${e}`,c)}});const r=xe.filter(s=>!n(s));xe.length=0,xe.push(...r)}function Lr(t,e,n=null){Xt(t,"value",e,n)}const Gt=t=>se(oe,`rooms/${t}`),br=t=>se(oe,`rooms/${t}/members`),gd=(t,e)=>se(oe,`rooms/${t}/members/${e}`),PI=t=>se(oe,`rooms/${t}/cancellation`),Gs=t=>se(oe,`rooms/${t}/watch`),NI=t=>se(oe,`users/${t}/recentCalls`),Bc=(t,e)=>se(oe,`users/${t}/recentCalls/${e}`),Hc=t=>se(oe,`users/${t}/outgoingCall`),Op=t=>se(oe,`rooms/${t}/offerCandidates`),Dp=t=>se(oe,`rooms/${t}/answerCandidates`);function Mp(){return{"dependent-sdk-initialized-before-auth":"Another Firebase SDK was initialized and is trying to use Auth before Auth is initialized. Please be sure to call `initializeAuth` or `getAuth` before starting any other Firebase SDK."}}const LI=Mp,xp=new Zn("auth","Firebase",Mp());/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const os=new Ps("@firebase/auth");function OI(t,...e){os.logLevel<=O.WARN&&os.warn(`Auth (${ti}): ${t}`,...e)}function Or(t,...e){os.logLevel<=O.ERROR&&os.error(`Auth (${ti}): ${t}`,...e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function qe(t,...e){throw Vc(t,...e)}function Be(t,...e){return Vc(t,...e)}function Wc(t,e,n){const i={...LI(),[e]:n};return new Zn("auth","Firebase",i).create(e,{appName:t.name})}function nn(t){return Wc(t,"operation-not-supported-in-this-environment","Operations that alter the current user are not supported in conjunction with FirebaseServerApp")}function DI(t,e,n){const i=n;if(!(e instanceof i))throw i.name!==e.constructor.name&&qe(t,"argument-error"),Wc(t,"argument-error",`Type of ${e.constructor.name} does not match expected instance.Did you pass a reference from a different Auth SDK?`)}function Vc(t,...e){if(typeof t!="string"){const n=e[0],i=[...e.slice(1)];return i[0]&&(i[0].appName=t.name),t._errorFactory.create(n,...i)}return xp.create(t,...e)}function S(t,e,...n){if(!t)throw Vc(e,...n)}function nt(t){const e="INTERNAL ASSERTION FAILED: "+t;throw Or(e),new Error(e)}function pt(t,e){t||nt(e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ma(){return typeof self<"u"&&self.location?.href||""}function MI(){return md()==="http:"||md()==="https:"}function md(){return typeof self<"u"&&self.location?.protocol||null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function xI(){return typeof navigator<"u"&&navigator&&"onLine"in navigator&&typeof navigator.onLine=="boolean"&&(MI()||nw()||"connection"in navigator)?navigator.onLine:!0}function FI(){if(typeof navigator>"u")return null;const t=navigator;return t.languages&&t.languages[0]||t.language||null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class lr{constructor(e,n){this.shortDelay=e,this.longDelay=n,pt(n>e,"Short delay should be less than long delay!"),this.isMobile=Ya()||Qh()}get(){return xI()?this.isMobile?this.longDelay:this.shortDelay:Math.min(5e3,this.shortDelay)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
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
 */class Fp{static initialize(e,n,i){this.fetchImpl=e,n&&(this.headersImpl=n),i&&(this.responseImpl=i)}static fetch(){if(this.fetchImpl)return this.fetchImpl;if(typeof self<"u"&&"fetch"in self)return self.fetch;if(typeof globalThis<"u"&&globalThis.fetch)return globalThis.fetch;if(typeof fetch<"u")return fetch;nt("Could not find fetch implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static headers(){if(this.headersImpl)return this.headersImpl;if(typeof self<"u"&&"Headers"in self)return self.Headers;if(typeof globalThis<"u"&&globalThis.Headers)return globalThis.Headers;if(typeof Headers<"u")return Headers;nt("Could not find Headers implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static response(){if(this.responseImpl)return this.responseImpl;if(typeof self<"u"&&"Response"in self)return self.Response;if(typeof globalThis<"u"&&globalThis.Response)return globalThis.Response;if(typeof Response<"u")return Response;nt("Could not find Response implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const UI={CREDENTIAL_MISMATCH:"custom-token-mismatch",MISSING_CUSTOM_TOKEN:"internal-error",INVALID_IDENTIFIER:"invalid-email",MISSING_CONTINUE_URI:"internal-error",INVALID_PASSWORD:"wrong-password",MISSING_PASSWORD:"missing-password",INVALID_LOGIN_CREDENTIALS:"invalid-credential",EMAIL_EXISTS:"email-already-in-use",PASSWORD_LOGIN_DISABLED:"operation-not-allowed",INVALID_IDP_RESPONSE:"invalid-credential",INVALID_PENDING_TOKEN:"invalid-credential",FEDERATED_USER_ID_ALREADY_LINKED:"credential-already-in-use",MISSING_REQ_TYPE:"internal-error",EMAIL_NOT_FOUND:"user-not-found",RESET_PASSWORD_EXCEED_LIMIT:"too-many-requests",EXPIRED_OOB_CODE:"expired-action-code",INVALID_OOB_CODE:"invalid-action-code",MISSING_OOB_CODE:"internal-error",CREDENTIAL_TOO_OLD_LOGIN_AGAIN:"requires-recent-login",INVALID_ID_TOKEN:"invalid-user-token",TOKEN_EXPIRED:"user-token-expired",USER_NOT_FOUND:"user-token-expired",TOO_MANY_ATTEMPTS_TRY_LATER:"too-many-requests",PASSWORD_DOES_NOT_MEET_REQUIREMENTS:"password-does-not-meet-requirements",INVALID_CODE:"invalid-verification-code",INVALID_SESSION_INFO:"invalid-verification-id",INVALID_TEMPORARY_PROOF:"invalid-credential",MISSING_SESSION_INFO:"missing-verification-id",SESSION_EXPIRED:"code-expired",MISSING_ANDROID_PACKAGE_NAME:"missing-android-pkg-name",UNAUTHORIZED_DOMAIN:"unauthorized-continue-uri",INVALID_OAUTH_CLIENT_ID:"invalid-oauth-client-id",ADMIN_ONLY_OPERATION:"admin-restricted-operation",INVALID_MFA_PENDING_CREDENTIAL:"invalid-multi-factor-session",MFA_ENROLLMENT_NOT_FOUND:"multi-factor-info-not-found",MISSING_MFA_ENROLLMENT_ID:"missing-multi-factor-info",MISSING_MFA_PENDING_CREDENTIAL:"missing-multi-factor-session",SECOND_FACTOR_EXISTS:"second-factor-already-in-use",SECOND_FACTOR_LIMIT_EXCEEDED:"maximum-second-factor-count-exceeded",BLOCKING_FUNCTION_ERROR_RESPONSE:"internal-error",RECAPTCHA_NOT_ENABLED:"recaptcha-not-enabled",MISSING_RECAPTCHA_TOKEN:"missing-recaptcha-token",INVALID_RECAPTCHA_TOKEN:"invalid-recaptcha-token",INVALID_RECAPTCHA_ACTION:"invalid-recaptcha-action",MISSING_CLIENT_TYPE:"missing-client-type",MISSING_RECAPTCHA_VERSION:"missing-recaptcha-version",INVALID_RECAPTCHA_VERSION:"invalid-recaptcha-version",INVALID_REQ_TYPE:"invalid-req-type"};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const $I=["/v1/accounts:signInWithCustomToken","/v1/accounts:signInWithEmailLink","/v1/accounts:signInWithIdp","/v1/accounts:signInWithPassword","/v1/accounts:signInWithPhoneNumber","/v1/token"],BI=new lr(3e4,6e4);function Gc(t,e){return t.tenantId&&!e.tenantId?{...e,tenantId:t.tenantId}:e}async function si(t,e,n,i,r={}){return Up(t,r,async()=>{let s={},o={};i&&(e==="GET"?o=i:s={body:JSON.stringify(i)});const a=ei({key:t.config.apiKey,...o}).slice(1),c=await t._getAdditionalHeaders();c["Content-Type"]="application/json",t.languageCode&&(c["X-Firebase-Locale"]=t.languageCode);const l={method:e,headers:c,...s};return tw()||(l.referrerPolicy="no-referrer"),t.emulatorConfig&&Qn(t.emulatorConfig.host)&&(l.credentials="include"),Fp.fetch()(await $p(t,t.config.apiHost,n,a),l)})}async function Up(t,e,n){t._canInitEmulator=!1;const i={...UI,...e};try{const r=new WI(t),s=await Promise.race([n(),r.promise]);r.clearNetworkTimeout();const o=await s.json();if("needConfirmation"in o)throw Sr(t,"account-exists-with-different-credential",o);if(s.ok&&!("errorMessage"in o))return o;{const a=s.ok?o.errorMessage:o.error.message,[c,l]=a.split(" : ");if(c==="FEDERATED_USER_ID_ALREADY_LINKED")throw Sr(t,"credential-already-in-use",o);if(c==="EMAIL_EXISTS")throw Sr(t,"email-already-in-use",o);if(c==="USER_DISABLED")throw Sr(t,"user-disabled",o);const u=i[c]||c.toLowerCase().replace(/[_\s]+/g,"-");if(l)throw Wc(t,u,l);qe(t,u)}}catch(r){if(r instanceof Ht)throw r;qe(t,"network-request-failed",{message:String(r)})}}async function HI(t,e,n,i,r={}){const s=await si(t,e,n,i,r);return"mfaPendingCredential"in s&&qe(t,"multi-factor-auth-required",{_serverResponse:s}),s}async function $p(t,e,n,i){const r=`${e}${n}?${i}`,s=t,o=s.config.emulator?jc(t.config,r):`${t.config.apiScheme}://${r}`;return $I.includes(n)&&(await s._persistenceManagerAvailable,s._getPersistenceType()==="COOKIE")?s._getPersistence()._getFinalTarget(o).toString():o}class WI{clearNetworkTimeout(){clearTimeout(this.timer)}constructor(e){this.auth=e,this.timer=null,this.promise=new Promise((n,i)=>{this.timer=setTimeout(()=>i(Be(this.auth,"network-request-failed")),BI.get())})}}function Sr(t,e,n){const i={appName:t.name};n.email&&(i.email=n.email),n.phoneNumber&&(i.phoneNumber=n.phoneNumber);const r=Be(t,e,i);return r.customData._tokenResponse=n,r}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function VI(t,e){return si(t,"POST","/v1/accounts:delete",e)}async function as(t,e){return si(t,"POST","/v1/accounts:lookup",e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ii(t){if(t)try{const e=new Date(Number(t));if(!isNaN(e.getTime()))return e.toUTCString()}catch{}}async function jI(t,e=!1){const n=ce(t),i=await n.getIdToken(e),r=zc(i);S(r&&r.exp&&r.auth_time&&r.iat,n.auth,"internal-error");const s=typeof r.firebase=="object"?r.firebase:void 0,o=s?.sign_in_provider;return{claims:r,token:i,authTime:Ii(Co(r.auth_time)),issuedAtTime:Ii(Co(r.iat)),expirationTime:Ii(Co(r.exp)),signInProvider:o||null,signInSecondFactor:s?.sign_in_second_factor||null}}function Co(t){return Number(t)*1e3}function zc(t){const[e,n,i]=t.split(".");if(e===void 0||n===void 0||i===void 0)return Or("JWT malformed, contained fewer than 3 sections"),null;try{const r=jr(n);return r?JSON.parse(r):(Or("Failed to decode base64 JWT payload"),null)}catch(r){return Or("Caught error parsing JWT payload as JSON",r?.toString()),null}}function _d(t){const e=zc(t);return S(e,"internal-error"),S(typeof e.exp<"u","internal-error"),S(typeof e.iat<"u","internal-error"),Number(e.exp)-Number(e.iat)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function zi(t,e,n=!1){if(n)return e;try{return await e}catch(i){throw i instanceof Ht&&GI(i)&&t.auth.currentUser===t&&await t.auth.signOut(),i}}function GI({code:t}){return t==="auth/user-disabled"||t==="auth/user-token-expired"}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class zI{constructor(e){this.user=e,this.isRunning=!1,this.timerId=null,this.errorBackoff=3e4}_start(){this.isRunning||(this.isRunning=!0,this.schedule())}_stop(){this.isRunning&&(this.isRunning=!1,this.timerId!==null&&clearTimeout(this.timerId))}getInterval(e){if(e){const n=this.errorBackoff;return this.errorBackoff=Math.min(this.errorBackoff*2,96e4),n}else{this.errorBackoff=3e4;const i=(this.user.stsTokenManager.expirationTime??0)-Date.now()-3e5;return Math.max(0,i)}}schedule(e=!1){if(!this.isRunning)return;const n=this.getInterval(e);this.timerId=setTimeout(async()=>{await this.iteration()},n)}async iteration(){try{await this.user.getIdToken(!0)}catch(e){e?.code==="auth/network-request-failed"&&this.schedule(!0);return}this.schedule()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class _a{constructor(e,n){this.createdAt=e,this.lastLoginAt=n,this._initializeTime()}_initializeTime(){this.lastSignInTime=Ii(this.lastLoginAt),this.creationTime=Ii(this.createdAt)}_copy(e){this.createdAt=e.createdAt,this.lastLoginAt=e.lastLoginAt,this._initializeTime()}toJSON(){return{createdAt:this.createdAt,lastLoginAt:this.lastLoginAt}}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function cs(t){const e=t.auth,n=await t.getIdToken(),i=await zi(t,as(e,{idToken:n}));S(i?.users.length,e,"internal-error");const r=i.users[0];t._notifyReloadListener(r);const s=r.providerUserInfo?.length?Bp(r.providerUserInfo):[],o=YI(t.providerData,s),a=t.isAnonymous,c=!(t.email&&r.passwordHash)&&!o?.length,l=a?c:!1,u={uid:r.localId,displayName:r.displayName||null,photoURL:r.photoUrl||null,email:r.email||null,emailVerified:r.emailVerified||!1,phoneNumber:r.phoneNumber||null,tenantId:r.tenantId||null,providerData:o,metadata:new _a(r.createdAt,r.lastLoginAt),isAnonymous:l};Object.assign(t,u)}async function qI(t){const e=ce(t);await cs(e),await e.auth._persistUserIfCurrent(e),e.auth._notifyListenersIfCurrent(e)}function YI(t,e){return[...t.filter(i=>!e.some(r=>r.providerId===i.providerId)),...e]}function Bp(t){return t.map(({providerId:e,...n})=>({providerId:e,uid:n.rawId||"",displayName:n.displayName||null,email:n.email||null,phoneNumber:n.phoneNumber||null,photoURL:n.photoUrl||null}))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function KI(t,e){const n=await Up(t,{},async()=>{const i=ei({grant_type:"refresh_token",refresh_token:e}).slice(1),{tokenApiHost:r,apiKey:s}=t.config,o=await $p(t,r,"/v1/token",`key=${s}`),a=await t._getAdditionalHeaders();a["Content-Type"]="application/x-www-form-urlencoded";const c={method:"POST",headers:a,body:i};return t.emulatorConfig&&Qn(t.emulatorConfig.host)&&(c.credentials="include"),Fp.fetch()(o,c)});return{accessToken:n.access_token,expiresIn:n.expires_in,refreshToken:n.refresh_token}}async function JI(t,e){return si(t,"POST","/v2/accounts:revokeToken",Gc(t,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Sn{constructor(){this.refreshToken=null,this.accessToken=null,this.expirationTime=null}get isExpired(){return!this.expirationTime||Date.now()>this.expirationTime-3e4}updateFromServerResponse(e){S(e.idToken,"internal-error"),S(typeof e.idToken<"u","internal-error"),S(typeof e.refreshToken<"u","internal-error");const n="expiresIn"in e&&typeof e.expiresIn<"u"?Number(e.expiresIn):_d(e.idToken);this.updateTokensAndExpiration(e.idToken,e.refreshToken,n)}updateFromIdToken(e){S(e.length!==0,"internal-error");const n=_d(e);this.updateTokensAndExpiration(e,null,n)}async getToken(e,n=!1){return!n&&this.accessToken&&!this.isExpired?this.accessToken:(S(this.refreshToken,e,"user-token-expired"),this.refreshToken?(await this.refresh(e,this.refreshToken),this.accessToken):null)}clearRefreshToken(){this.refreshToken=null}async refresh(e,n){const{accessToken:i,refreshToken:r,expiresIn:s}=await KI(e,n);this.updateTokensAndExpiration(i,r,Number(s))}updateTokensAndExpiration(e,n,i){this.refreshToken=n||null,this.accessToken=e||null,this.expirationTime=Date.now()+i*1e3}static fromJSON(e,n){const{refreshToken:i,accessToken:r,expirationTime:s}=n,o=new Sn;return i&&(S(typeof i=="string","internal-error",{appName:e}),o.refreshToken=i),r&&(S(typeof r=="string","internal-error",{appName:e}),o.accessToken=r),s&&(S(typeof s=="number","internal-error",{appName:e}),o.expirationTime=s),o}toJSON(){return{refreshToken:this.refreshToken,accessToken:this.accessToken,expirationTime:this.expirationTime}}_assign(e){this.accessToken=e.accessToken,this.refreshToken=e.refreshToken,this.expirationTime=e.expirationTime}_clone(){return Object.assign(new Sn,this.toJSON())}_performRefresh(){return nt("not implemented")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function _t(t,e){S(typeof t=="string"||typeof t>"u","internal-error",{appName:e})}class Fe{constructor({uid:e,auth:n,stsTokenManager:i,...r}){this.providerId="firebase",this.proactiveRefresh=new zI(this),this.reloadUserInfo=null,this.reloadListener=null,this.uid=e,this.auth=n,this.stsTokenManager=i,this.accessToken=i.accessToken,this.displayName=r.displayName||null,this.email=r.email||null,this.emailVerified=r.emailVerified||!1,this.phoneNumber=r.phoneNumber||null,this.photoURL=r.photoURL||null,this.isAnonymous=r.isAnonymous||!1,this.tenantId=r.tenantId||null,this.providerData=r.providerData?[...r.providerData]:[],this.metadata=new _a(r.createdAt||void 0,r.lastLoginAt||void 0)}async getIdToken(e){const n=await zi(this,this.stsTokenManager.getToken(this.auth,e));return S(n,this.auth,"internal-error"),this.accessToken!==n&&(this.accessToken=n,await this.auth._persistUserIfCurrent(this),this.auth._notifyListenersIfCurrent(this)),n}getIdTokenResult(e){return jI(this,e)}reload(){return qI(this)}_assign(e){this!==e&&(S(this.uid===e.uid,this.auth,"internal-error"),this.displayName=e.displayName,this.photoURL=e.photoURL,this.email=e.email,this.emailVerified=e.emailVerified,this.phoneNumber=e.phoneNumber,this.isAnonymous=e.isAnonymous,this.tenantId=e.tenantId,this.providerData=e.providerData.map(n=>({...n})),this.metadata._copy(e.metadata),this.stsTokenManager._assign(e.stsTokenManager))}_clone(e){const n=new Fe({...this,auth:e,stsTokenManager:this.stsTokenManager._clone()});return n.metadata._copy(this.metadata),n}_onReload(e){S(!this.reloadListener,this.auth,"internal-error"),this.reloadListener=e,this.reloadUserInfo&&(this._notifyReloadListener(this.reloadUserInfo),this.reloadUserInfo=null)}_notifyReloadListener(e){this.reloadListener?this.reloadListener(e):this.reloadUserInfo=e}_startProactiveRefresh(){this.proactiveRefresh._start()}_stopProactiveRefresh(){this.proactiveRefresh._stop()}async _updateTokensIfNecessary(e,n=!1){let i=!1;e.idToken&&e.idToken!==this.stsTokenManager.accessToken&&(this.stsTokenManager.updateFromServerResponse(e),i=!0),n&&await cs(this),await this.auth._persistUserIfCurrent(this),i&&this.auth._notifyListenersIfCurrent(this)}async delete(){if(Oe(this.auth.app))return Promise.reject(nn(this.auth));const e=await this.getIdToken();return await zi(this,VI(this.auth,{idToken:e})),this.stsTokenManager.clearRefreshToken(),this.auth.signOut()}toJSON(){return{uid:this.uid,email:this.email||void 0,emailVerified:this.emailVerified,displayName:this.displayName||void 0,isAnonymous:this.isAnonymous,photoURL:this.photoURL||void 0,phoneNumber:this.phoneNumber||void 0,tenantId:this.tenantId||void 0,providerData:this.providerData.map(e=>({...e})),stsTokenManager:this.stsTokenManager.toJSON(),_redirectEventId:this._redirectEventId,...this.metadata.toJSON(),apiKey:this.auth.config.apiKey,appName:this.auth.name}}get refreshToken(){return this.stsTokenManager.refreshToken||""}static _fromJSON(e,n){const i=n.displayName??void 0,r=n.email??void 0,s=n.phoneNumber??void 0,o=n.photoURL??void 0,a=n.tenantId??void 0,c=n._redirectEventId??void 0,l=n.createdAt??void 0,u=n.lastLoginAt??void 0,{uid:d,emailVerified:h,isAnonymous:f,providerData:p,stsTokenManager:E}=n;S(d&&E,e,"internal-error");const m=Sn.fromJSON(this.name,E);S(typeof d=="string",e,"internal-error"),_t(i,e.name),_t(r,e.name),S(typeof h=="boolean",e,"internal-error"),S(typeof f=="boolean",e,"internal-error"),_t(s,e.name),_t(o,e.name),_t(a,e.name),_t(c,e.name),_t(l,e.name),_t(u,e.name);const T=new Fe({uid:d,auth:e,email:r,emailVerified:h,displayName:i,isAnonymous:f,photoURL:o,phoneNumber:s,tenantId:a,stsTokenManager:m,createdAt:l,lastLoginAt:u});return p&&Array.isArray(p)&&(T.providerData=p.map(N=>({...N}))),c&&(T._redirectEventId=c),T}static async _fromIdTokenResponse(e,n,i=!1){const r=new Sn;r.updateFromServerResponse(n);const s=new Fe({uid:n.localId,auth:e,stsTokenManager:r,isAnonymous:i});return await cs(s),s}static async _fromGetAccountInfoResponse(e,n,i){const r=n.users[0];S(r.localId!==void 0,"internal-error");const s=r.providerUserInfo!==void 0?Bp(r.providerUserInfo):[],o=!(r.email&&r.passwordHash)&&!s?.length,a=new Sn;a.updateFromIdToken(i);const c=new Fe({uid:r.localId,auth:e,stsTokenManager:a,isAnonymous:o}),l={uid:r.localId,displayName:r.displayName||null,photoURL:r.photoUrl||null,email:r.email||null,emailVerified:r.emailVerified||!1,phoneNumber:r.phoneNumber||null,tenantId:r.tenantId||null,providerData:s,metadata:new _a(r.createdAt,r.lastLoginAt),isAnonymous:!(r.email&&r.passwordHash)&&!s?.length};return Object.assign(c,l),c}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const yd=new Map;function it(t){pt(t instanceof Function,"Expected a class definition");let e=yd.get(t);return e?(pt(e instanceof t,"Instance stored in cache mismatched with class"),e):(e=new t,yd.set(t,e),e)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Hp{constructor(){this.type="NONE",this.storage={}}async _isAvailable(){return!0}async _set(e,n){this.storage[e]=n}async _get(e){const n=this.storage[e];return n===void 0?null:n}async _remove(e){delete this.storage[e]}_addListener(e,n){}_removeListener(e,n){}}Hp.type="NONE";const ya=Hp;/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Dr(t,e,n){return`firebase:${t}:${e}:${n}`}class Cn{constructor(e,n,i){this.persistence=e,this.auth=n,this.userKey=i;const{config:r,name:s}=this.auth;this.fullUserKey=Dr(this.userKey,r.apiKey,s),this.fullPersistenceKey=Dr("persistence",r.apiKey,s),this.boundEventHandler=n._onStorageEvent.bind(n),this.persistence._addListener(this.fullUserKey,this.boundEventHandler)}setCurrentUser(e){return this.persistence._set(this.fullUserKey,e.toJSON())}async getCurrentUser(){const e=await this.persistence._get(this.fullUserKey);if(!e)return null;if(typeof e=="string"){const n=await as(this.auth,{idToken:e}).catch(()=>{});return n?Fe._fromGetAccountInfoResponse(this.auth,n,e):null}return Fe._fromJSON(this.auth,e)}removeCurrentUser(){return this.persistence._remove(this.fullUserKey)}savePersistenceForRedirect(){return this.persistence._set(this.fullPersistenceKey,this.persistence.type)}async setPersistence(e){if(this.persistence===e)return;const n=await this.getCurrentUser();if(await this.removeCurrentUser(),this.persistence=e,n)return this.setCurrentUser(n)}delete(){this.persistence._removeListener(this.fullUserKey,this.boundEventHandler)}static async create(e,n,i="authUser"){if(!n.length)return new Cn(it(ya),e,i);const r=(await Promise.all(n.map(async l=>{if(await l._isAvailable())return l}))).filter(l=>l);let s=r[0]||it(ya);const o=Dr(i,e.config.apiKey,e.name);let a=null;for(const l of n)try{const u=await l._get(o);if(u){let d;if(typeof u=="string"){const h=await as(e,{idToken:u}).catch(()=>{});if(!h)break;d=await Fe._fromGetAccountInfoResponse(e,h,u)}else d=Fe._fromJSON(e,u);l!==s&&(a=d),s=l;break}}catch{}const c=r.filter(l=>l._shouldAllowMigration);return!s._shouldAllowMigration||!c.length?new Cn(s,e,i):(s=c[0],a&&await s._set(o,a.toJSON()),await Promise.all(n.map(async l=>{if(l!==s)try{await l._remove(o)}catch{}})),new Cn(s,e,i))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ed(t){const e=t.toLowerCase();if(e.includes("opera/")||e.includes("opr/")||e.includes("opios/"))return"Opera";if(Gp(e))return"IEMobile";if(e.includes("msie")||e.includes("trident/"))return"IE";if(e.includes("edge/"))return"Edge";if(Wp(e))return"Firefox";if(e.includes("silk/"))return"Silk";if(qp(e))return"Blackberry";if(Yp(e))return"Webos";if(Vp(e))return"Safari";if((e.includes("chrome/")||jp(e))&&!e.includes("edge/"))return"Chrome";if(zp(e))return"Android";{const n=/([a-zA-Z\d\.]+)\/[a-zA-Z\d\.]*$/,i=t.match(n);if(i?.length===2)return i[1]}return"Other"}function Wp(t=ge()){return/firefox\//i.test(t)}function Vp(t=ge()){const e=t.toLowerCase();return e.includes("safari/")&&!e.includes("chrome/")&&!e.includes("crios/")&&!e.includes("android")}function jp(t=ge()){return/crios\//i.test(t)}function Gp(t=ge()){return/iemobile/i.test(t)}function zp(t=ge()){return/android/i.test(t)}function qp(t=ge()){return/blackberry/i.test(t)}function Yp(t=ge()){return/webos/i.test(t)}function qc(t=ge()){return/iphone|ipad|ipod/i.test(t)||/macintosh/i.test(t)&&/mobile/i.test(t)}function XI(t=ge()){return qc(t)&&!!window.navigator?.standalone}function QI(){return iw()&&document.documentMode===10}function Kp(t=ge()){return qc(t)||zp(t)||Yp(t)||qp(t)||/windows phone/i.test(t)||Gp(t)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Jp(t,e=[]){let n;switch(t){case"Browser":n=Ed(ge());break;case"Worker":n=`${Ed(ge())}-${t}`;break;default:n=t}const i=e.length?e.join(","):"FirebaseCore-web";return`${n}/JsCore/${ti}/${i}`}/**
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
 */class ZI{constructor(e){this.auth=e,this.queue=[]}pushCallback(e,n){const i=s=>new Promise((o,a)=>{try{const c=e(s);o(c)}catch(c){a(c)}});i.onAbort=n,this.queue.push(i);const r=this.queue.length-1;return()=>{this.queue[r]=()=>Promise.resolve()}}async runMiddleware(e){if(this.auth.currentUser===e)return;const n=[];try{for(const i of this.queue)await i(e),i.onAbort&&n.push(i.onAbort)}catch(i){n.reverse();for(const r of n)try{r()}catch{}throw this.auth._errorFactory.create("login-blocked",{originalMessage:i?.message})}}}/**
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
 */async function ek(t,e={}){return si(t,"GET","/v2/passwordPolicy",Gc(t,e))}/**
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
 */const tk=6;class nk{constructor(e){const n=e.customStrengthOptions;this.customStrengthOptions={},this.customStrengthOptions.minPasswordLength=n.minPasswordLength??tk,n.maxPasswordLength&&(this.customStrengthOptions.maxPasswordLength=n.maxPasswordLength),n.containsLowercaseCharacter!==void 0&&(this.customStrengthOptions.containsLowercaseLetter=n.containsLowercaseCharacter),n.containsUppercaseCharacter!==void 0&&(this.customStrengthOptions.containsUppercaseLetter=n.containsUppercaseCharacter),n.containsNumericCharacter!==void 0&&(this.customStrengthOptions.containsNumericCharacter=n.containsNumericCharacter),n.containsNonAlphanumericCharacter!==void 0&&(this.customStrengthOptions.containsNonAlphanumericCharacter=n.containsNonAlphanumericCharacter),this.enforcementState=e.enforcementState,this.enforcementState==="ENFORCEMENT_STATE_UNSPECIFIED"&&(this.enforcementState="OFF"),this.allowedNonAlphanumericCharacters=e.allowedNonAlphanumericCharacters?.join("")??"",this.forceUpgradeOnSignin=e.forceUpgradeOnSignin??!1,this.schemaVersion=e.schemaVersion}validatePassword(e){const n={isValid:!0,passwordPolicy:this};return this.validatePasswordLengthOptions(e,n),this.validatePasswordCharacterOptions(e,n),n.isValid&&(n.isValid=n.meetsMinPasswordLength??!0),n.isValid&&(n.isValid=n.meetsMaxPasswordLength??!0),n.isValid&&(n.isValid=n.containsLowercaseLetter??!0),n.isValid&&(n.isValid=n.containsUppercaseLetter??!0),n.isValid&&(n.isValid=n.containsNumericCharacter??!0),n.isValid&&(n.isValid=n.containsNonAlphanumericCharacter??!0),n}validatePasswordLengthOptions(e,n){const i=this.customStrengthOptions.minPasswordLength,r=this.customStrengthOptions.maxPasswordLength;i&&(n.meetsMinPasswordLength=e.length>=i),r&&(n.meetsMaxPasswordLength=e.length<=r)}validatePasswordCharacterOptions(e,n){this.updatePasswordCharacterOptionsStatuses(n,!1,!1,!1,!1);let i;for(let r=0;r<e.length;r++)i=e.charAt(r),this.updatePasswordCharacterOptionsStatuses(n,i>="a"&&i<="z",i>="A"&&i<="Z",i>="0"&&i<="9",this.allowedNonAlphanumericCharacters.includes(i))}updatePasswordCharacterOptionsStatuses(e,n,i,r,s){this.customStrengthOptions.containsLowercaseLetter&&(e.containsLowercaseLetter||(e.containsLowercaseLetter=n)),this.customStrengthOptions.containsUppercaseLetter&&(e.containsUppercaseLetter||(e.containsUppercaseLetter=i)),this.customStrengthOptions.containsNumericCharacter&&(e.containsNumericCharacter||(e.containsNumericCharacter=r)),this.customStrengthOptions.containsNonAlphanumericCharacter&&(e.containsNonAlphanumericCharacter||(e.containsNonAlphanumericCharacter=s))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ik{constructor(e,n,i,r){this.app=e,this.heartbeatServiceProvider=n,this.appCheckServiceProvider=i,this.config=r,this.currentUser=null,this.emulatorConfig=null,this.operations=Promise.resolve(),this.authStateSubscription=new vd(this),this.idTokenSubscription=new vd(this),this.beforeStateQueue=new ZI(this),this.redirectUser=null,this.isProactiveRefreshEnabled=!1,this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION=1,this._canInitEmulator=!0,this._isInitialized=!1,this._deleted=!1,this._initializationPromise=null,this._popupRedirectResolver=null,this._errorFactory=xp,this._agentRecaptchaConfig=null,this._tenantRecaptchaConfigs={},this._projectPasswordPolicy=null,this._tenantPasswordPolicies={},this._resolvePersistenceManagerAvailable=void 0,this.lastNotifiedUid=void 0,this.languageCode=null,this.tenantId=null,this.settings={appVerificationDisabledForTesting:!1},this.frameworks=[],this.name=e.name,this.clientVersion=r.sdkClientVersion,this._persistenceManagerAvailable=new Promise(s=>this._resolvePersistenceManagerAvailable=s)}_initializeWithPersistence(e,n){return n&&(this._popupRedirectResolver=it(n)),this._initializationPromise=this.queue(async()=>{if(!this._deleted&&(this.persistenceManager=await Cn.create(this,e),this._resolvePersistenceManagerAvailable?.(),!this._deleted)){if(this._popupRedirectResolver?._shouldInitProactively)try{await this._popupRedirectResolver._initialize(this)}catch{}await this.initializeCurrentUser(n),this.lastNotifiedUid=this.currentUser?.uid||null,!this._deleted&&(this._isInitialized=!0)}}),this._initializationPromise}async _onStorageEvent(){if(this._deleted)return;const e=await this.assertedPersistence.getCurrentUser();if(!(!this.currentUser&&!e)){if(this.currentUser&&e&&this.currentUser.uid===e.uid){this._currentUser._assign(e),await this.currentUser.getIdToken();return}await this._updateCurrentUser(e,!0)}}async initializeCurrentUserFromIdToken(e){try{const n=await as(this,{idToken:e}),i=await Fe._fromGetAccountInfoResponse(this,n,e);await this.directlySetCurrentUser(i)}catch(n){console.warn("FirebaseServerApp could not login user with provided authIdToken: ",n),await this.directlySetCurrentUser(null)}}async initializeCurrentUser(e){if(Oe(this.app)){const s=this.app.settings.authIdToken;return s?new Promise(o=>{setTimeout(()=>this.initializeCurrentUserFromIdToken(s).then(o,o))}):this.directlySetCurrentUser(null)}const n=await this.assertedPersistence.getCurrentUser();let i=n,r=!1;if(e&&this.config.authDomain){await this.getOrInitRedirectPersistenceManager();const s=this.redirectUser?._redirectEventId,o=i?._redirectEventId,a=await this.tryRedirectSignIn(e);(!s||s===o)&&a?.user&&(i=a.user,r=!0)}if(!i)return this.directlySetCurrentUser(null);if(!i._redirectEventId){if(r)try{await this.beforeStateQueue.runMiddleware(i)}catch(s){i=n,this._popupRedirectResolver._overrideRedirectResult(this,()=>Promise.reject(s))}return i?this.reloadAndSetCurrentUserOrClear(i):this.directlySetCurrentUser(null)}return S(this._popupRedirectResolver,this,"argument-error"),await this.getOrInitRedirectPersistenceManager(),this.redirectUser&&this.redirectUser._redirectEventId===i._redirectEventId?this.directlySetCurrentUser(i):this.reloadAndSetCurrentUserOrClear(i)}async tryRedirectSignIn(e){let n=null;try{n=await this._popupRedirectResolver._completeRedirectFn(this,e,!0)}catch{await this._setRedirectUser(null)}return n}async reloadAndSetCurrentUserOrClear(e){try{await cs(e)}catch(n){if(n?.code!=="auth/network-request-failed")return this.directlySetCurrentUser(null)}return this.directlySetCurrentUser(e)}useDeviceLanguage(){this.languageCode=FI()}async _delete(){this._deleted=!0}async updateCurrentUser(e){if(Oe(this.app))return Promise.reject(nn(this));const n=e?ce(e):null;return n&&S(n.auth.config.apiKey===this.config.apiKey,this,"invalid-user-token"),this._updateCurrentUser(n&&n._clone(this))}async _updateCurrentUser(e,n=!1){if(!this._deleted)return e&&S(this.tenantId===e.tenantId,this,"tenant-id-mismatch"),n||await this.beforeStateQueue.runMiddleware(e),this.queue(async()=>{await this.directlySetCurrentUser(e),this.notifyAuthListeners()})}async signOut(){return Oe(this.app)?Promise.reject(nn(this)):(await this.beforeStateQueue.runMiddleware(null),(this.redirectPersistenceManager||this._popupRedirectResolver)&&await this._setRedirectUser(null),this._updateCurrentUser(null,!0))}setPersistence(e){return Oe(this.app)?Promise.reject(nn(this)):this.queue(async()=>{await this.assertedPersistence.setPersistence(it(e))})}_getRecaptchaConfig(){return this.tenantId==null?this._agentRecaptchaConfig:this._tenantRecaptchaConfigs[this.tenantId]}async validatePassword(e){this._getPasswordPolicyInternal()||await this._updatePasswordPolicy();const n=this._getPasswordPolicyInternal();return n.schemaVersion!==this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION?Promise.reject(this._errorFactory.create("unsupported-password-policy-schema-version",{})):n.validatePassword(e)}_getPasswordPolicyInternal(){return this.tenantId===null?this._projectPasswordPolicy:this._tenantPasswordPolicies[this.tenantId]}async _updatePasswordPolicy(){const e=await ek(this),n=new nk(e);this.tenantId===null?this._projectPasswordPolicy=n:this._tenantPasswordPolicies[this.tenantId]=n}_getPersistenceType(){return this.assertedPersistence.persistence.type}_getPersistence(){return this.assertedPersistence.persistence}_updateErrorMap(e){this._errorFactory=new Zn("auth","Firebase",e())}onAuthStateChanged(e,n,i){return this.registerStateListener(this.authStateSubscription,e,n,i)}beforeAuthStateChanged(e,n){return this.beforeStateQueue.pushCallback(e,n)}onIdTokenChanged(e,n,i){return this.registerStateListener(this.idTokenSubscription,e,n,i)}authStateReady(){return new Promise((e,n)=>{if(this.currentUser)e();else{const i=this.onAuthStateChanged(()=>{i(),e()},n)}})}async revokeAccessToken(e){if(this.currentUser){const n=await this.currentUser.getIdToken(),i={providerId:"apple.com",tokenType:"ACCESS_TOKEN",token:e,idToken:n};this.tenantId!=null&&(i.tenantId=this.tenantId),await JI(this,i)}}toJSON(){return{apiKey:this.config.apiKey,authDomain:this.config.authDomain,appName:this.name,currentUser:this._currentUser?.toJSON()}}async _setRedirectUser(e,n){const i=await this.getOrInitRedirectPersistenceManager(n);return e===null?i.removeCurrentUser():i.setCurrentUser(e)}async getOrInitRedirectPersistenceManager(e){if(!this.redirectPersistenceManager){const n=e&&it(e)||this._popupRedirectResolver;S(n,this,"argument-error"),this.redirectPersistenceManager=await Cn.create(this,[it(n._redirectPersistence)],"redirectUser"),this.redirectUser=await this.redirectPersistenceManager.getCurrentUser()}return this.redirectPersistenceManager}async _redirectUserForId(e){return this._isInitialized&&await this.queue(async()=>{}),this._currentUser?._redirectEventId===e?this._currentUser:this.redirectUser?._redirectEventId===e?this.redirectUser:null}async _persistUserIfCurrent(e){if(e===this.currentUser)return this.queue(async()=>this.directlySetCurrentUser(e))}_notifyListenersIfCurrent(e){e===this.currentUser&&this.notifyAuthListeners()}_key(){return`${this.config.authDomain}:${this.config.apiKey}:${this.name}`}_startProactiveRefresh(){this.isProactiveRefreshEnabled=!0,this.currentUser&&this._currentUser._startProactiveRefresh()}_stopProactiveRefresh(){this.isProactiveRefreshEnabled=!1,this.currentUser&&this._currentUser._stopProactiveRefresh()}get _currentUser(){return this.currentUser}notifyAuthListeners(){if(!this._isInitialized)return;this.idTokenSubscription.next(this.currentUser);const e=this.currentUser?.uid??null;this.lastNotifiedUid!==e&&(this.lastNotifiedUid=e,this.authStateSubscription.next(this.currentUser))}registerStateListener(e,n,i,r){if(this._deleted)return()=>{};const s=typeof n=="function"?n:n.next.bind(n);let o=!1;const a=this._isInitialized?Promise.resolve():this._initializationPromise;if(S(a,this,"internal-error"),a.then(()=>{o||s(this.currentUser)}),typeof n=="function"){const c=e.addObserver(n,i,r);return()=>{o=!0,c()}}else{const c=e.addObserver(n);return()=>{o=!0,c()}}}async directlySetCurrentUser(e){this.currentUser&&this.currentUser!==e&&this._currentUser._stopProactiveRefresh(),e&&this.isProactiveRefreshEnabled&&e._startProactiveRefresh(),this.currentUser=e,e?await this.assertedPersistence.setCurrentUser(e):await this.assertedPersistence.removeCurrentUser()}queue(e){return this.operations=this.operations.then(e,e),this.operations}get assertedPersistence(){return S(this.persistenceManager,this,"internal-error"),this.persistenceManager}_logFramework(e){!e||this.frameworks.includes(e)||(this.frameworks.push(e),this.frameworks.sort(),this.clientVersion=Jp(this.config.clientPlatform,this._getFrameworks()))}_getFrameworks(){return this.frameworks}async _getAdditionalHeaders(){const e={"X-Client-Version":this.clientVersion};this.app.options.appId&&(e["X-Firebase-gmpid"]=this.app.options.appId);const n=await this.heartbeatServiceProvider.getImmediate({optional:!0})?.getHeartbeatsHeader();n&&(e["X-Firebase-Client"]=n);const i=await this._getAppCheckToken();return i&&(e["X-Firebase-AppCheck"]=i),e}async _getAppCheckToken(){if(Oe(this.app)&&this.app.settings.appCheckToken)return this.app.settings.appCheckToken;const e=await this.appCheckServiceProvider.getImmediate({optional:!0})?.getToken();return e?.error&&OI(`Error while retrieving App Check token: ${e.error}`),e?.token}}function oi(t){return ce(t)}class vd{constructor(e){this.auth=e,this.observer=null,this.addObserver=hw(n=>this.observer=n)}get next(){return S(this.observer,this.auth,"internal-error"),this.observer.next.bind(this.observer)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Yc={async loadJS(){throw new Error("Unable to load external scripts")},recaptchaV2Script:"",recaptchaEnterpriseScript:"",gapiScript:""};function rk(t){Yc=t}function sk(t){return Yc.loadJS(t)}function ok(){return Yc.gapiScript}function ak(t){return`__${t}${Math.floor(Math.random()*1e6)}`}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ck(t,e){const n=tr(t,"auth");if(n.isInitialized()){const r=n.getImmediate(),s=n.getOptions();if(an(s,e??{}))return r;qe(r,"already-initialized")}return n.initialize({options:e})}function lk(t,e){const n=e?.persistence||[],i=(Array.isArray(n)?n:[n]).map(it);e?.errorMap&&t._updateErrorMap(e.errorMap),t._initializeWithPersistence(i,e?.popupRedirectResolver)}function uk(t,e,n){const i=oi(t);S(/^https?:\/\//.test(e),i,"invalid-emulator-scheme");const r=!1,s=Xp(e),{host:o,port:a}=dk(e),c=a===null?"":`:${a}`,l={url:`${s}//${o}${c}/`},u=Object.freeze({host:o,port:a,protocol:s.replace(":",""),options:Object.freeze({disableWarnings:r})});if(!i._canInitEmulator){S(i.config.emulator&&i.emulatorConfig,i,"emulator-config-failed"),S(an(l,i.config.emulator)&&an(u,i.emulatorConfig),i,"emulator-config-failed");return}i.config.emulator=l,i.emulatorConfig=u,i.settings.appVerificationDisabledForTesting=!0,Qn(o)?(Jh(`${s}//${o}${c}`),Xh("Auth",!0)):hk()}function Xp(t){const e=t.indexOf(":");return e<0?"":t.substr(0,e+1)}function dk(t){const e=Xp(t),n=/(\/\/)?([^?#/]+)/.exec(t.substr(e.length));if(!n)return{host:"",port:null};const i=n[2].split("@").pop()||"",r=/^(\[[^\]]+\])(:|$)/.exec(i);if(r){const s=r[1];return{host:s,port:wd(i.substr(s.length+1))}}else{const[s,o]=i.split(":");return{host:s,port:wd(o)}}}function wd(t){if(!t)return null;const e=Number(t);return isNaN(e)?null:e}function hk(){function t(){const e=document.createElement("p"),n=e.style;e.innerText="Running in emulator mode. Do not use with production credentials.",n.position="fixed",n.width="100%",n.backgroundColor="#ffffff",n.border=".1em solid #000000",n.color="#b50000",n.bottom="0px",n.left="0px",n.margin="0px",n.zIndex="10000",n.textAlign="center",e.classList.add("firebase-emulator-warning"),document.body.appendChild(e)}typeof console<"u"&&typeof console.info=="function"&&console.info("WARNING: You are using the Auth Emulator, which is intended for local testing only.  Do not use with production credentials."),typeof window<"u"&&typeof document<"u"&&(document.readyState==="loading"?window.addEventListener("DOMContentLoaded",t):t())}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Qp{constructor(e,n){this.providerId=e,this.signInMethod=n}toJSON(){return nt("not implemented")}_getIdTokenResponse(e){return nt("not implemented")}_linkToIdToken(e,n){return nt("not implemented")}_getReauthenticationResolver(e){return nt("not implemented")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Tn(t,e){return HI(t,"POST","/v1/accounts:signInWithIdp",Gc(t,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const fk="http://localhost";class dn extends Qp{constructor(){super(...arguments),this.pendingToken=null}static _fromParams(e){const n=new dn(e.providerId,e.signInMethod);return e.idToken||e.accessToken?(e.idToken&&(n.idToken=e.idToken),e.accessToken&&(n.accessToken=e.accessToken),e.nonce&&!e.pendingToken&&(n.nonce=e.nonce),e.pendingToken&&(n.pendingToken=e.pendingToken)):e.oauthToken&&e.oauthTokenSecret?(n.accessToken=e.oauthToken,n.secret=e.oauthTokenSecret):qe("argument-error"),n}toJSON(){return{idToken:this.idToken,accessToken:this.accessToken,secret:this.secret,nonce:this.nonce,pendingToken:this.pendingToken,providerId:this.providerId,signInMethod:this.signInMethod}}static fromJSON(e){const n=typeof e=="string"?JSON.parse(e):e,{providerId:i,signInMethod:r,...s}=n;if(!i||!r)return null;const o=new dn(i,r);return o.idToken=s.idToken||void 0,o.accessToken=s.accessToken||void 0,o.secret=s.secret,o.nonce=s.nonce,o.pendingToken=s.pendingToken||null,o}_getIdTokenResponse(e){const n=this.buildRequest();return Tn(e,n)}_linkToIdToken(e,n){const i=this.buildRequest();return i.idToken=n,Tn(e,i)}_getReauthenticationResolver(e){const n=this.buildRequest();return n.autoCreate=!1,Tn(e,n)}buildRequest(){const e={requestUri:fk,returnSecureToken:!0};if(this.pendingToken)e.pendingToken=this.pendingToken;else{const n={};this.idToken&&(n.id_token=this.idToken),this.accessToken&&(n.access_token=this.accessToken),this.secret&&(n.oauth_token_secret=this.secret),n.providerId=this.providerId,this.nonce&&!this.pendingToken&&(n.nonce=this.nonce),e.postBody=ei(n)}return e}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
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
 */class ur extends Kc{constructor(){super(...arguments),this.scopes=[]}addScope(e){return this.scopes.includes(e)||this.scopes.push(e),this}getScopes(){return[...this.scopes]}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class yt extends ur{constructor(){super("facebook.com")}static credential(e){return dn._fromParams({providerId:yt.PROVIDER_ID,signInMethod:yt.FACEBOOK_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return yt.credentialFromTaggedObject(e)}static credentialFromError(e){return yt.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return yt.credential(e.oauthAccessToken)}catch{return null}}}yt.FACEBOOK_SIGN_IN_METHOD="facebook.com";yt.PROVIDER_ID="facebook.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ce extends ur{constructor(){super("google.com"),this.addScope("profile")}static credential(e,n){return dn._fromParams({providerId:Ce.PROVIDER_ID,signInMethod:Ce.GOOGLE_SIGN_IN_METHOD,idToken:e,accessToken:n})}static credentialFromResult(e){return Ce.credentialFromTaggedObject(e)}static credentialFromError(e){return Ce.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthIdToken:n,oauthAccessToken:i}=e;if(!n&&!i)return null;try{return Ce.credential(n,i)}catch{return null}}}Ce.GOOGLE_SIGN_IN_METHOD="google.com";Ce.PROVIDER_ID="google.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Et extends ur{constructor(){super("github.com")}static credential(e){return dn._fromParams({providerId:Et.PROVIDER_ID,signInMethod:Et.GITHUB_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return Et.credentialFromTaggedObject(e)}static credentialFromError(e){return Et.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return Et.credential(e.oauthAccessToken)}catch{return null}}}Et.GITHUB_SIGN_IN_METHOD="github.com";Et.PROVIDER_ID="github.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class vt extends ur{constructor(){super("twitter.com")}static credential(e,n){return dn._fromParams({providerId:vt.PROVIDER_ID,signInMethod:vt.TWITTER_SIGN_IN_METHOD,oauthToken:e,oauthTokenSecret:n})}static credentialFromResult(e){return vt.credentialFromTaggedObject(e)}static credentialFromError(e){return vt.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthAccessToken:n,oauthTokenSecret:i}=e;if(!n||!i)return null;try{return vt.credential(n,i)}catch{return null}}}vt.TWITTER_SIGN_IN_METHOD="twitter.com";vt.PROVIDER_ID="twitter.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Gn{constructor(e){this.user=e.user,this.providerId=e.providerId,this._tokenResponse=e._tokenResponse,this.operationType=e.operationType}static async _fromIdTokenResponse(e,n,i,r=!1){const s=await Fe._fromIdTokenResponse(e,i,r),o=bd(i);return new Gn({user:s,providerId:o,_tokenResponse:i,operationType:n})}static async _forOperation(e,n,i){await e._updateTokensIfNecessary(i,!0);const r=bd(i);return new Gn({user:e,providerId:r,_tokenResponse:i,operationType:n})}}function bd(t){return t.providerId?t.providerId:"phoneNumber"in t?"phone":null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ls extends Ht{constructor(e,n,i,r){super(n.code,n.message),this.operationType=i,this.user=r,Object.setPrototypeOf(this,ls.prototype),this.customData={appName:e.name,tenantId:e.tenantId??void 0,_serverResponse:n.customData._serverResponse,operationType:i}}static _fromErrorAndOperation(e,n,i,r){return new ls(e,n,i,r)}}function Zp(t,e,n,i){return(e==="reauthenticate"?n._getReauthenticationResolver(t):n._getIdTokenResponse(t)).catch(s=>{throw s.code==="auth/multi-factor-auth-required"?ls._fromErrorAndOperation(t,s,e,i):s})}async function pk(t,e,n=!1){const i=await zi(t,e._linkToIdToken(t.auth,await t.getIdToken()),n);return Gn._forOperation(t,"link",i)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function gk(t,e,n=!1){const{auth:i}=t;if(Oe(i.app))return Promise.reject(nn(i));const r="reauthenticate";try{const s=await zi(t,Zp(i,r,e,t),n);S(s.idToken,i,"internal-error");const o=zc(s.idToken);S(o,i,"internal-error");const{sub:a}=o;return S(t.uid===a,i,"user-mismatch"),Gn._forOperation(t,r,s)}catch(s){throw s?.code==="auth/user-not-found"&&qe(i,"user-mismatch"),s}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function eg(t,e,n=!1){if(Oe(t.app))return Promise.reject(nn(t));const i="signIn",r=await Zp(t,i,e),s=await Gn._fromIdTokenResponse(t,i,r);return n||await t._updateCurrentUser(s.user),s}async function mk(t,e){return eg(oi(t),e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function To(t,e){return ce(t).setPersistence(e)}function _k(t,e,n,i){return ce(t).onIdTokenChanged(e,n,i)}function yk(t,e,n){return ce(t).beforeAuthStateChanged(e,n)}function tg(t,e,n,i){return ce(t).onAuthStateChanged(e,n,i)}function Ek(t){return ce(t).signOut()}const us="__sak";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ng{constructor(e,n){this.storageRetriever=e,this.type=n}_isAvailable(){try{return this.storage?(this.storage.setItem(us,"1"),this.storage.removeItem(us),Promise.resolve(!0)):Promise.resolve(!1)}catch{return Promise.resolve(!1)}}_set(e,n){return this.storage.setItem(e,JSON.stringify(n)),Promise.resolve()}_get(e){const n=this.storage.getItem(e);return Promise.resolve(n?JSON.parse(n):null)}_remove(e){return this.storage.removeItem(e),Promise.resolve()}get storage(){return this.storageRetriever()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const vk=1e3,wk=10;class ig extends ng{constructor(){super(()=>window.localStorage,"LOCAL"),this.boundEventHandler=(e,n)=>this.onStorageEvent(e,n),this.listeners={},this.localCache={},this.pollTimer=null,this.fallbackToPolling=Kp(),this._shouldAllowMigration=!0}forAllChangedKeys(e){for(const n of Object.keys(this.listeners)){const i=this.storage.getItem(n),r=this.localCache[n];i!==r&&e(n,r,i)}}onStorageEvent(e,n=!1){if(!e.key){this.forAllChangedKeys((o,a,c)=>{this.notifyListeners(o,c)});return}const i=e.key;n?this.detachListener():this.stopPolling();const r=()=>{const o=this.storage.getItem(i);!n&&this.localCache[i]===o||this.notifyListeners(i,o)},s=this.storage.getItem(i);QI()&&s!==e.newValue&&e.newValue!==e.oldValue?setTimeout(r,wk):r()}notifyListeners(e,n){this.localCache[e]=n;const i=this.listeners[e];if(i)for(const r of Array.from(i))r(n&&JSON.parse(n))}startPolling(){this.stopPolling(),this.pollTimer=setInterval(()=>{this.forAllChangedKeys((e,n,i)=>{this.onStorageEvent(new StorageEvent("storage",{key:e,oldValue:n,newValue:i}),!0)})},vk)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}attachListener(){window.addEventListener("storage",this.boundEventHandler)}detachListener(){window.removeEventListener("storage",this.boundEventHandler)}_addListener(e,n){Object.keys(this.listeners).length===0&&(this.fallbackToPolling?this.startPolling():this.attachListener()),this.listeners[e]||(this.listeners[e]=new Set,this.localCache[e]=this.storage.getItem(e)),this.listeners[e].add(n)}_removeListener(e,n){this.listeners[e]&&(this.listeners[e].delete(n),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&(this.detachListener(),this.stopPolling())}async _set(e,n){await super._set(e,n),this.localCache[e]=JSON.stringify(n)}async _get(e){const n=await super._get(e);return this.localCache[e]=JSON.stringify(n),n}async _remove(e){await super._remove(e),delete this.localCache[e]}}ig.type="LOCAL";const rg=ig;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class sg extends ng{constructor(){super(()=>window.sessionStorage,"SESSION")}_addListener(e,n){}_removeListener(e,n){}}sg.type="SESSION";const og=sg;/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function bk(t){return Promise.all(t.map(async e=>{try{return{fulfilled:!0,value:await e}}catch(n){return{fulfilled:!1,reason:n}}}))}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class zs{constructor(e){this.eventTarget=e,this.handlersMap={},this.boundEventHandler=this.handleEvent.bind(this)}static _getInstance(e){const n=this.receivers.find(r=>r.isListeningto(e));if(n)return n;const i=new zs(e);return this.receivers.push(i),i}isListeningto(e){return this.eventTarget===e}async handleEvent(e){const n=e,{eventId:i,eventType:r,data:s}=n.data,o=this.handlersMap[r];if(!o?.size)return;n.ports[0].postMessage({status:"ack",eventId:i,eventType:r});const a=Array.from(o).map(async l=>l(n.origin,s)),c=await bk(a);n.ports[0].postMessage({status:"done",eventId:i,eventType:r,response:c})}_subscribe(e,n){Object.keys(this.handlersMap).length===0&&this.eventTarget.addEventListener("message",this.boundEventHandler),this.handlersMap[e]||(this.handlersMap[e]=new Set),this.handlersMap[e].add(n)}_unsubscribe(e,n){this.handlersMap[e]&&n&&this.handlersMap[e].delete(n),(!n||this.handlersMap[e].size===0)&&delete this.handlersMap[e],Object.keys(this.handlersMap).length===0&&this.eventTarget.removeEventListener("message",this.boundEventHandler)}}zs.receivers=[];/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Jc(t="",e=10){let n="";for(let i=0;i<e;i++)n+=Math.floor(Math.random()*10);return t+n}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Sk{constructor(e){this.target=e,this.handlers=new Set}removeMessageHandler(e){e.messageChannel&&(e.messageChannel.port1.removeEventListener("message",e.onMessage),e.messageChannel.port1.close()),this.handlers.delete(e)}async _send(e,n,i=50){const r=typeof MessageChannel<"u"?new MessageChannel:null;if(!r)throw new Error("connection_unavailable");let s,o;return new Promise((a,c)=>{const l=Jc("",20);r.port1.start();const u=setTimeout(()=>{c(new Error("unsupported_event"))},i);o={messageChannel:r,onMessage(d){const h=d;if(h.data.eventId===l)switch(h.data.status){case"ack":clearTimeout(u),s=setTimeout(()=>{c(new Error("timeout"))},3e3);break;case"done":clearTimeout(s),a(h.data.response);break;default:clearTimeout(u),clearTimeout(s),c(new Error("invalid_response"));break}}},this.handlers.add(o),r.port1.addEventListener("message",o.onMessage),this.target.postMessage({eventType:e,eventId:l,data:n},[r.port2])}).finally(()=>{o&&this.removeMessageHandler(o)})}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ze(){return window}function Ck(t){ze().location.href=t}/**
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
 */function ag(){return typeof ze().WorkerGlobalScope<"u"&&typeof ze().importScripts=="function"}async function Tk(){if(!navigator?.serviceWorker)return null;try{return(await navigator.serviceWorker.ready).active}catch{return null}}function Ik(){return navigator?.serviceWorker?.controller||null}function kk(){return ag()?self:null}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const cg="firebaseLocalStorageDb",Rk=1,ds="firebaseLocalStorage",lg="fbase_key";class dr{constructor(e){this.request=e}toPromise(){return new Promise((e,n)=>{this.request.addEventListener("success",()=>{e(this.request.result)}),this.request.addEventListener("error",()=>{n(this.request.error)})})}}function qs(t,e){return t.transaction([ds],e?"readwrite":"readonly").objectStore(ds)}function Ak(){const t=indexedDB.deleteDatabase(cg);return new dr(t).toPromise()}function Ea(){const t=indexedDB.open(cg,Rk);return new Promise((e,n)=>{t.addEventListener("error",()=>{n(t.error)}),t.addEventListener("upgradeneeded",()=>{const i=t.result;try{i.createObjectStore(ds,{keyPath:lg})}catch(r){n(r)}}),t.addEventListener("success",async()=>{const i=t.result;i.objectStoreNames.contains(ds)?e(i):(i.close(),await Ak(),e(await Ea()))})})}async function Sd(t,e,n){const i=qs(t,!0).put({[lg]:e,value:n});return new dr(i).toPromise()}async function Pk(t,e){const n=qs(t,!1).get(e),i=await new dr(n).toPromise();return i===void 0?null:i.value}function Cd(t,e){const n=qs(t,!0).delete(e);return new dr(n).toPromise()}const Nk=800,Lk=3;class ug{constructor(){this.type="LOCAL",this._shouldAllowMigration=!0,this.listeners={},this.localCache={},this.pollTimer=null,this.pendingWrites=0,this.receiver=null,this.sender=null,this.serviceWorkerReceiverAvailable=!1,this.activeServiceWorker=null,this._workerInitializationPromise=this.initializeServiceWorkerMessaging().then(()=>{},()=>{})}async _openDb(){return this.db?this.db:(this.db=await Ea(),this.db)}async _withRetries(e){let n=0;for(;;)try{const i=await this._openDb();return await e(i)}catch(i){if(n++>Lk)throw i;this.db&&(this.db.close(),this.db=void 0)}}async initializeServiceWorkerMessaging(){return ag()?this.initializeReceiver():this.initializeSender()}async initializeReceiver(){this.receiver=zs._getInstance(kk()),this.receiver._subscribe("keyChanged",async(e,n)=>({keyProcessed:(await this._poll()).includes(n.key)})),this.receiver._subscribe("ping",async(e,n)=>["keyChanged"])}async initializeSender(){if(this.activeServiceWorker=await Tk(),!this.activeServiceWorker)return;this.sender=new Sk(this.activeServiceWorker);const e=await this.sender._send("ping",{},800);e&&e[0]?.fulfilled&&e[0]?.value.includes("keyChanged")&&(this.serviceWorkerReceiverAvailable=!0)}async notifyServiceWorker(e){if(!(!this.sender||!this.activeServiceWorker||Ik()!==this.activeServiceWorker))try{await this.sender._send("keyChanged",{key:e},this.serviceWorkerReceiverAvailable?800:50)}catch{}}async _isAvailable(){try{if(!indexedDB)return!1;const e=await Ea();return await Sd(e,us,"1"),await Cd(e,us),!0}catch{}return!1}async _withPendingWrite(e){this.pendingWrites++;try{await e()}finally{this.pendingWrites--}}async _set(e,n){return this._withPendingWrite(async()=>(await this._withRetries(i=>Sd(i,e,n)),this.localCache[e]=n,this.notifyServiceWorker(e)))}async _get(e){const n=await this._withRetries(i=>Pk(i,e));return this.localCache[e]=n,n}async _remove(e){return this._withPendingWrite(async()=>(await this._withRetries(n=>Cd(n,e)),delete this.localCache[e],this.notifyServiceWorker(e)))}async _poll(){const e=await this._withRetries(r=>{const s=qs(r,!1).getAll();return new dr(s).toPromise()});if(!e)return[];if(this.pendingWrites!==0)return[];const n=[],i=new Set;if(e.length!==0)for(const{fbase_key:r,value:s}of e)i.add(r),JSON.stringify(this.localCache[r])!==JSON.stringify(s)&&(this.notifyListeners(r,s),n.push(r));for(const r of Object.keys(this.localCache))this.localCache[r]&&!i.has(r)&&(this.notifyListeners(r,null),n.push(r));return n}notifyListeners(e,n){this.localCache[e]=n;const i=this.listeners[e];if(i)for(const r of Array.from(i))r(n)}startPolling(){this.stopPolling(),this.pollTimer=setInterval(async()=>this._poll(),Nk)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}_addListener(e,n){Object.keys(this.listeners).length===0&&this.startPolling(),this.listeners[e]||(this.listeners[e]=new Set,this._get(e)),this.listeners[e].add(n)}_removeListener(e,n){this.listeners[e]&&(this.listeners[e].delete(n),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&this.stopPolling()}}ug.type="LOCAL";const dg=ug;new lr(3e4,6e4);/**
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
 */function hg(t,e){return e?it(e):(S(t._popupRedirectResolver,t,"argument-error"),t._popupRedirectResolver)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Xc extends Qp{constructor(e){super("custom","custom"),this.params=e}_getIdTokenResponse(e){return Tn(e,this._buildIdpRequest())}_linkToIdToken(e,n){return Tn(e,this._buildIdpRequest(n))}_getReauthenticationResolver(e){return Tn(e,this._buildIdpRequest())}_buildIdpRequest(e){const n={requestUri:this.params.requestUri,sessionId:this.params.sessionId,postBody:this.params.postBody,tenantId:this.params.tenantId,pendingToken:this.params.pendingToken,returnSecureToken:!0,returnIdpCredential:!0};return e&&(n.idToken=e),n}}function Ok(t){return eg(t.auth,new Xc(t),t.bypassAuthState)}function Dk(t){const{auth:e,user:n}=t;return S(n,e,"internal-error"),gk(n,new Xc(t),t.bypassAuthState)}async function Mk(t){const{auth:e,user:n}=t;return S(n,e,"internal-error"),pk(n,new Xc(t),t.bypassAuthState)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class fg{constructor(e,n,i,r,s=!1){this.auth=e,this.resolver=i,this.user=r,this.bypassAuthState=s,this.pendingPromise=null,this.eventManager=null,this.filter=Array.isArray(n)?n:[n]}execute(){return new Promise(async(e,n)=>{this.pendingPromise={resolve:e,reject:n};try{this.eventManager=await this.resolver._initialize(this.auth),await this.onExecution(),this.eventManager.registerConsumer(this)}catch(i){this.reject(i)}})}async onAuthEvent(e){const{urlResponse:n,sessionId:i,postBody:r,tenantId:s,error:o,type:a}=e;if(o){this.reject(o);return}const c={auth:this.auth,requestUri:n,sessionId:i,tenantId:s||void 0,postBody:r||void 0,user:this.user,bypassAuthState:this.bypassAuthState};try{this.resolve(await this.getIdpTask(a)(c))}catch(l){this.reject(l)}}onError(e){this.reject(e)}getIdpTask(e){switch(e){case"signInViaPopup":case"signInViaRedirect":return Ok;case"linkViaPopup":case"linkViaRedirect":return Mk;case"reauthViaPopup":case"reauthViaRedirect":return Dk;default:qe(this.auth,"internal-error")}}resolve(e){pt(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.resolve(e),this.unregisterAndCleanUp()}reject(e){pt(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.reject(e),this.unregisterAndCleanUp()}unregisterAndCleanUp(){this.eventManager&&this.eventManager.unregisterConsumer(this),this.pendingPromise=null,this.cleanUp()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const xk=new lr(2e3,1e4);async function Fk(t,e,n){if(Oe(t.app))return Promise.reject(Be(t,"operation-not-supported-in-this-environment"));const i=oi(t);DI(t,e,Kc);const r=hg(i,n);return new Zt(i,"signInViaPopup",e,r).executeNotNull()}class Zt extends fg{constructor(e,n,i,r,s){super(e,n,r,s),this.provider=i,this.authWindow=null,this.pollId=null,Zt.currentPopupAction&&Zt.currentPopupAction.cancel(),Zt.currentPopupAction=this}async executeNotNull(){const e=await this.execute();return S(e,this.auth,"internal-error"),e}async onExecution(){pt(this.filter.length===1,"Popup operations only handle one event");const e=Jc();this.authWindow=await this.resolver._openPopup(this.auth,this.provider,this.filter[0],e),this.authWindow.associatedEvent=e,this.resolver._originValidation(this.auth).catch(n=>{this.reject(n)}),this.resolver._isIframeWebStorageSupported(this.auth,n=>{n||this.reject(Be(this.auth,"web-storage-unsupported"))}),this.pollUserCancellation()}get eventId(){return this.authWindow?.associatedEvent||null}cancel(){this.reject(Be(this.auth,"cancelled-popup-request"))}cleanUp(){this.authWindow&&this.authWindow.close(),this.pollId&&window.clearTimeout(this.pollId),this.authWindow=null,this.pollId=null,Zt.currentPopupAction=null}pollUserCancellation(){const e=()=>{if(this.authWindow?.window?.closed){this.pollId=window.setTimeout(()=>{this.pollId=null,this.reject(Be(this.auth,"popup-closed-by-user"))},8e3);return}this.pollId=window.setTimeout(e,xk.get())};e()}}Zt.currentPopupAction=null;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Uk="pendingRedirect",Mr=new Map;class $k extends fg{constructor(e,n,i=!1){super(e,["signInViaRedirect","linkViaRedirect","reauthViaRedirect","unknown"],n,void 0,i),this.eventId=null}async execute(){let e=Mr.get(this.auth._key());if(!e){try{const i=await Bk(this.resolver,this.auth)?await super.execute():null;e=()=>Promise.resolve(i)}catch(n){e=()=>Promise.reject(n)}Mr.set(this.auth._key(),e)}return this.bypassAuthState||Mr.set(this.auth._key(),()=>Promise.resolve(null)),e()}async onAuthEvent(e){if(e.type==="signInViaRedirect")return super.onAuthEvent(e);if(e.type==="unknown"){this.resolve(null);return}if(e.eventId){const n=await this.auth._redirectUserForId(e.eventId);if(n)return this.user=n,super.onAuthEvent(e);this.resolve(null)}}async onExecution(){}cleanUp(){}}async function Bk(t,e){const n=Vk(e),i=Wk(t);if(!await i._isAvailable())return!1;const r=await i._get(n)==="true";return await i._remove(n),r}function Hk(t,e){Mr.set(t._key(),e)}function Wk(t){return it(t._redirectPersistence)}function Vk(t){return Dr(Uk,t.config.apiKey,t.name)}async function jk(t,e){return await oi(t)._initializationPromise,pg(t,e,!1)}async function pg(t,e,n=!1){if(Oe(t.app))return Promise.reject(nn(t));const i=oi(t),r=hg(i,e),o=await new $k(i,r,n).execute();return o&&!n&&(delete o.user._redirectEventId,await i._persistUserIfCurrent(o.user),await i._setRedirectUser(null,e)),o}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Gk=600*1e3;class zk{constructor(e){this.auth=e,this.cachedEventUids=new Set,this.consumers=new Set,this.queuedRedirectEvent=null,this.hasHandledPotentialRedirect=!1,this.lastProcessedEventTime=Date.now()}registerConsumer(e){this.consumers.add(e),this.queuedRedirectEvent&&this.isEventForConsumer(this.queuedRedirectEvent,e)&&(this.sendToConsumer(this.queuedRedirectEvent,e),this.saveEventToCache(this.queuedRedirectEvent),this.queuedRedirectEvent=null)}unregisterConsumer(e){this.consumers.delete(e)}onEvent(e){if(this.hasEventBeenHandled(e))return!1;let n=!1;return this.consumers.forEach(i=>{this.isEventForConsumer(e,i)&&(n=!0,this.sendToConsumer(e,i),this.saveEventToCache(e))}),this.hasHandledPotentialRedirect||!qk(e)||(this.hasHandledPotentialRedirect=!0,n||(this.queuedRedirectEvent=e,n=!0)),n}sendToConsumer(e,n){if(e.error&&!gg(e)){const i=e.error.code?.split("auth/")[1]||"internal-error";n.onError(Be(this.auth,i))}else n.onAuthEvent(e)}isEventForConsumer(e,n){const i=n.eventId===null||!!e.eventId&&e.eventId===n.eventId;return n.filter.includes(e.type)&&i}hasEventBeenHandled(e){return Date.now()-this.lastProcessedEventTime>=Gk&&this.cachedEventUids.clear(),this.cachedEventUids.has(Td(e))}saveEventToCache(e){this.cachedEventUids.add(Td(e)),this.lastProcessedEventTime=Date.now()}}function Td(t){return[t.type,t.eventId,t.sessionId,t.tenantId].filter(e=>e).join("-")}function gg({type:t,error:e}){return t==="unknown"&&e?.code==="auth/no-auth-event"}function qk(t){switch(t.type){case"signInViaRedirect":case"linkViaRedirect":case"reauthViaRedirect":return!0;case"unknown":return gg(t);default:return!1}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Yk(t,e={}){return si(t,"GET","/v1/projects",e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Kk=/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/,Jk=/^https?/;async function Xk(t){if(t.config.emulator)return;const{authorizedDomains:e}=await Yk(t);for(const n of e)try{if(Qk(n))return}catch{}qe(t,"unauthorized-domain")}function Qk(t){const e=ma(),{protocol:n,hostname:i}=new URL(e);if(t.startsWith("chrome-extension://")){const o=new URL(t);return o.hostname===""&&i===""?n==="chrome-extension:"&&t.replace("chrome-extension://","")===e.replace("chrome-extension://",""):n==="chrome-extension:"&&o.hostname===i}if(!Jk.test(n))return!1;if(Kk.test(t))return i===t;const r=t.replace(/\./g,"\\.");return new RegExp("^(.+\\."+r+"|"+r+")$","i").test(i)}/**
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
 */const Zk=new lr(3e4,6e4);function Id(){const t=ze().___jsl;if(t?.H){for(const e of Object.keys(t.H))if(t.H[e].r=t.H[e].r||[],t.H[e].L=t.H[e].L||[],t.H[e].r=[...t.H[e].L],t.CP)for(let n=0;n<t.CP.length;n++)t.CP[n]=null}}function eR(t){return new Promise((e,n)=>{function i(){Id(),gapi.load("gapi.iframes",{callback:()=>{e(gapi.iframes.getContext())},ontimeout:()=>{Id(),n(Be(t,"network-request-failed"))},timeout:Zk.get()})}if(ze().gapi?.iframes?.Iframe)e(gapi.iframes.getContext());else if(ze().gapi?.load)i();else{const r=ak("iframefcb");return ze()[r]=()=>{gapi.load?i():n(Be(t,"network-request-failed"))},sk(`${ok()}?onload=${r}`).catch(s=>n(s))}}).catch(e=>{throw xr=null,e})}let xr=null;function tR(t){return xr=xr||eR(t),xr}/**
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
 */const nR=new lr(5e3,15e3),iR="__/auth/iframe",rR="emulator/auth/iframe",sR={style:{position:"absolute",top:"-100px",width:"1px",height:"1px"},"aria-hidden":"true",tabindex:"-1"},oR=new Map([["identitytoolkit.googleapis.com","p"],["staging-identitytoolkit.sandbox.googleapis.com","s"],["test-identitytoolkit.sandbox.googleapis.com","t"]]);function aR(t){const e=t.config;S(e.authDomain,t,"auth-domain-config-required");const n=e.emulator?jc(e,rR):`https://${t.config.authDomain}/${iR}`,i={apiKey:e.apiKey,appName:t.name,v:ti},r=oR.get(t.config.apiHost);r&&(i.eid=r);const s=t._getFrameworks();return s.length&&(i.fw=s.join(",")),`${n}?${ei(i).slice(1)}`}async function cR(t){const e=await tR(t),n=ze().gapi;return S(n,t,"internal-error"),e.open({where:document.body,url:aR(t),messageHandlersFilter:n.iframes.CROSS_ORIGIN_IFRAMES_FILTER,attributes:sR,dontclear:!0},i=>new Promise(async(r,s)=>{await i.restyle({setHideOnLeave:!1});const o=Be(t,"network-request-failed"),a=ze().setTimeout(()=>{s(o)},nR.get());function c(){ze().clearTimeout(a),r(i)}i.ping(c).then(c,()=>{s(o)})}))}/**
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
 */const lR={location:"yes",resizable:"yes",statusbar:"yes",toolbar:"no"},uR=500,dR=600,hR="_blank",fR="http://localhost";class kd{constructor(e){this.window=e,this.associatedEvent=null}close(){if(this.window)try{this.window.close()}catch{}}}function pR(t,e,n,i=uR,r=dR){const s=Math.max((window.screen.availHeight-r)/2,0).toString(),o=Math.max((window.screen.availWidth-i)/2,0).toString();let a="";const c={...lR,width:i.toString(),height:r.toString(),top:s,left:o},l=ge().toLowerCase();n&&(a=jp(l)?hR:n),Wp(l)&&(e=e||fR,c.scrollbars="yes");const u=Object.entries(c).reduce((h,[f,p])=>`${h}${f}=${p},`,"");if(XI(l)&&a!=="_self")return gR(e||"",a),new kd(null);const d=window.open(e||"",a,u);S(d,t,"popup-blocked");try{d.focus()}catch{}return new kd(d)}function gR(t,e){const n=document.createElement("a");n.href=t,n.target=e;const i=document.createEvent("MouseEvent");i.initMouseEvent("click",!0,!0,window,1,0,0,0,0,!1,!1,!1,!1,1,null),n.dispatchEvent(i)}/**
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
 */const mR="__/auth/handler",_R="emulator/auth/handler",yR=encodeURIComponent("fac");async function Rd(t,e,n,i,r,s){S(t.config.authDomain,t,"auth-domain-config-required"),S(t.config.apiKey,t,"invalid-api-key");const o={apiKey:t.config.apiKey,appName:t.name,authType:n,redirectUrl:i,v:ti,eventId:r};if(e instanceof Kc){e.setDefaultLanguage(t.languageCode),o.providerId=e.providerId||"",Yo(e.getCustomParameters())||(o.customParameters=JSON.stringify(e.getCustomParameters()));for(const[u,d]of Object.entries({}))o[u]=d}if(e instanceof ur){const u=e.getScopes().filter(d=>d!=="");u.length>0&&(o.scopes=u.join(","))}t.tenantId&&(o.tid=t.tenantId);const a=o;for(const u of Object.keys(a))a[u]===void 0&&delete a[u];const c=await t._getAppCheckToken(),l=c?`#${yR}=${encodeURIComponent(c)}`:"";return`${ER(t)}?${ei(a).slice(1)}${l}`}function ER({config:t}){return t.emulator?jc(t,_R):`https://${t.authDomain}/${mR}`}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Io="webStorageSupport";class vR{constructor(){this.eventManagers={},this.iframes={},this.originValidationPromises={},this._redirectPersistence=og,this._completeRedirectFn=pg,this._overrideRedirectResult=Hk}async _openPopup(e,n,i,r){pt(this.eventManagers[e._key()]?.manager,"_initialize() not called before _openPopup()");const s=await Rd(e,n,i,ma(),r);return pR(e,s,Jc())}async _openRedirect(e,n,i,r){await this._originValidation(e);const s=await Rd(e,n,i,ma(),r);return Ck(s),new Promise(()=>{})}_initialize(e){const n=e._key();if(this.eventManagers[n]){const{manager:r,promise:s}=this.eventManagers[n];return r?Promise.resolve(r):(pt(s,"If manager is not set, promise should be"),s)}const i=this.initAndGetManager(e);return this.eventManagers[n]={promise:i},i.catch(()=>{delete this.eventManagers[n]}),i}async initAndGetManager(e){const n=await cR(e),i=new zk(e);return n.register("authEvent",r=>(S(r?.authEvent,e,"invalid-auth-event"),{status:i.onEvent(r.authEvent)?"ACK":"ERROR"}),gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER),this.eventManagers[e._key()]={manager:i},this.iframes[e._key()]=n,i}_isIframeWebStorageSupported(e,n){this.iframes[e._key()].send(Io,{type:Io},r=>{const s=r?.[0]?.[Io];s!==void 0&&n(!!s),qe(e,"internal-error")},gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER)}_originValidation(e){const n=e._key();return this.originValidationPromises[n]||(this.originValidationPromises[n]=Xk(e)),this.originValidationPromises[n]}get _shouldInitProactively(){return Kp()||Vp()||qc()}}const wR=vR;var Ad="@firebase/auth",Pd="1.11.0";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class bR{constructor(e){this.auth=e,this.internalListeners=new Map}getUid(){return this.assertAuthConfigured(),this.auth.currentUser?.uid||null}async getToken(e){return this.assertAuthConfigured(),await this.auth._initializationPromise,this.auth.currentUser?{accessToken:await this.auth.currentUser.getIdToken(e)}:null}addAuthTokenListener(e){if(this.assertAuthConfigured(),this.internalListeners.has(e))return;const n=this.auth.onIdTokenChanged(i=>{e(i?.stsTokenManager.accessToken||null)});this.internalListeners.set(e,n),this.updateProactiveRefresh()}removeAuthTokenListener(e){this.assertAuthConfigured();const n=this.internalListeners.get(e);n&&(this.internalListeners.delete(e),n(),this.updateProactiveRefresh())}assertAuthConfigured(){S(this.auth._initializationPromise,"dependent-sdk-initialized-before-auth")}updateProactiveRefresh(){this.internalListeners.size>0?this.auth._startProactiveRefresh():this.auth._stopProactiveRefresh()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function SR(t){switch(t){case"Node":return"node";case"ReactNative":return"rn";case"Worker":return"webworker";case"Cordova":return"cordova";case"WebExtension":return"web-extension";default:return}}function CR(t){xt(new ut("auth",(e,{options:n})=>{const i=e.getProvider("app").getImmediate(),r=e.getProvider("heartbeat"),s=e.getProvider("app-check-internal"),{apiKey:o,authDomain:a}=i.options;S(o&&!o.includes(":"),"invalid-api-key",{appName:i.name});const c={apiKey:o,authDomain:a,clientPlatform:t,apiHost:"identitytoolkit.googleapis.com",tokenApiHost:"securetoken.googleapis.com",apiScheme:"https",sdkClientVersion:Jp(t)},l=new ik(i,r,s,c);return lk(l,n),l},"PUBLIC").setInstantiationMode("EXPLICIT").setInstanceCreatedCallback((e,n,i)=>{e.getProvider("auth-internal").initialize()})),xt(new ut("auth-internal",e=>{const n=oi(e.getProvider("auth").getImmediate());return(i=>new bR(i))(n)},"PRIVATE").setInstantiationMode("EXPLICIT")),ot(Ad,Pd,SR(t)),ot(Ad,Pd,"esm2020")}/**
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
 */const TR=300,IR=Kh("authIdTokenMaxAge")||TR;let Nd=null;const kR=t=>async e=>{const n=e&&await e.getIdTokenResult(),i=n&&(new Date().getTime()-Date.parse(n.issuedAtTime))/1e3;if(i&&i>IR)return;const r=n?.token;Nd!==r&&(Nd=r,await fetch(t,{method:r?"POST":"DELETE",headers:r?{Authorization:`Bearer ${r}`}:{}}))};function RR(t=Xa()){const e=tr(t,"auth");if(e.isInitialized())return e.getImmediate();const n=ck(t,{popupRedirectResolver:wR,persistence:[dg,rg,og]}),i=Kh("authTokenSyncURL");if(i&&typeof isSecureContext=="boolean"&&isSecureContext){const s=new URL(i,location.origin);if(location.origin===s.origin){const o=kR(s.toString());yk(n,o,()=>o(n.currentUser)),_k(n,a=>o(a))}}const r=qh("auth");return r&&uk(n,`http://${r}`),n}function AR(){return document.getElementsByTagName("head")?.[0]??document}rk({loadJS(t){return new Promise((e,n)=>{const i=document.createElement("script");i.setAttribute("src",t),i.onload=e,i.onerror=r=>{const s=Be("internal-error");s.customData=r,n(s)},i.type="text/javascript",i.charset="UTF-8",AR().appendChild(i)})},gapiScript:"https://apis.google.com/js/api.js",recaptchaV2Script:"https://www.google.com/recaptcha/api.js",recaptchaEnterpriseScript:"https://www.google.com/recaptcha/enterprise.js?render="});CR("Browser");const NP=()=>!1,PR=t=>{try{t&&localStorage.setItem("debug:console","1")}catch{}},$=(...t)=>{},NR=(...t)=>{localStorage.getItem("debug:console")},LR="765724787439-21p8n3e2tsfq2qk4oriq7ipp7m4o50ad.apps.googleusercontent.com",ki=new Set;function OR(){const t=console.error;console.error=(...e)=>{const n=e.join(" ");n.includes("FedCM")&&n.includes("AbortError")&&n.includes("signal is aborted without reason")||e.length===1&&typeof e[0]=="string"&&e[0].trim()==="The request has been aborted."||t.apply(console,e)}}function DR(t){return $("[ONE TAP] Callback registered, total callbacks:",ki.size+1),ki.add(t),()=>ki.delete(t)}function _n(t){$("[ONE TAP] Notifying status:",t,"to",ki.size,"callbacks"),ki.forEach(e=>{try{e(t)}catch{}})}function mg(){if(typeof google>"u"||!google.accounts?.id){setTimeout(()=>mg(),100);return}OR(),google.accounts.id.initialize({client_id:LR,callback:MR,auto_select:!1,cancel_on_tap_outside:!0,context:"signin",use_fedcm_for_prompt:!0,itp_support:!0})}function _g(){if(Qc()){_n("not_needed");return}window.google?.accounts?.id&&(_n("prompting"),window.google.accounts.id.prompt(t=>{const e=t.getMomentType();e==="skipped"?_n("skipped"):e==="dismissed"?_n("dismissed"):e==="display"&&_n("displayed")}))}async function MR(t){try{$("[ONE TAP] Received credential, signing in with Firebase..."),_n("signing_in");const e=Ce.credential(t.credential),n=await mk(Ie,e);$("[ONE TAP] ✅ Successfully signed in:",n.user.email),Eg(!1)}catch(e){const n=e?.code||"unknown",i=e?.message||String(e);alert(n==="auth/account-exists-with-different-credential"?"An account already exists with the same email but different sign-in credentials.":`One Tap sign-in failed: ${i}`)}}const Ie=RR($c),yg=(async()=>{try{await To(Ie,dg)}catch{try{await To(Ie,rg)}catch{await To(Ie,ya)}}try{const t=await jk(Ie);t?.user&&console.log("[AUTH] ✅ Sign-in completed (via Safari fallback), user:",t.user.email||t.user.uid)}catch(t){$("[AUTH] No redirect result:",t.code)}setTimeout(()=>{mg(),_g()},500)})();let yi=!1;function Eg(t){yi=t}function xR(){try{const t=document.createElement("a");t.href=window.location.href,t.target="_blank",t.rel="noopener noreferrer external",document.body.appendChild(t),t.click(),document.body.removeChild(t)}catch{}}let pi=null;const FR=()=>Math.random().toString(36).substring(2,15),va="guestUser",UR=2880*60*1e3;function $R(){try{const t=typeof localStorage<"u"?localStorage.getItem(va):null;if(!t)return null;const e=JSON.parse(t);if(!e||typeof e!="object"||!e.id)return null;if(e.expiresAt&&Date.now()>e.expiresAt){try{localStorage.removeItem(va)}catch{}return null}return e}catch{return null}}function BR(t,e=UR){const n=Date.now(),i={id:t,createdAt:n,expiresAt:n+e};try{typeof localStorage<"u"&&localStorage.setItem(va,JSON.stringify(i))}catch{}return i}function ue(){const t=Xe();if(t)return t;if(!pi){const e=$R();e&&e.id?pi=e.id:(pi=FR(),BR(pi))}return pi}function Qc(){return Ie.currentUser!==null}function Xe(){return Ie.currentUser?.uid??null}function HR(){return new Promise(t=>{const e=tg(Ie,n=>{e(),t(n)})})}function Zc(t,{truncate:e=7}={}){return tg(Ie,n=>{const i=!!n,r=n?.displayName||"Guest User",s=typeof r=="string"&&r.length>e?r.slice(0,e)+"...":r;try{t({user:n,isLoggedIn:i,userName:s})}catch{}})}async function vg(){const t=new Ce;t.setCustomParameters({prompt:"select_account"});const n=(()=>{try{return typeof window<"u"&&window.matchMedia&&window.matchMedia("(display-mode: standalone)").matches||typeof navigator<"u"&&navigator.standalone===!0}catch{return!1}})()&&/iphone|ipad|ipod/i.test(navigator.userAgent||"");try{if(n&&yi){yi=!1,xR();return}console.log("[AUTH] Starting popup sign-in flow...");const i=await Fk(Ie,t),s=Ce.credentialFromResult(i).accessToken,o=i.user;console.log("Signed in user:",o),$("Google Access Token exists:",!!s),yi=!1}catch(i){const r=i?.code||"unknown",s=i?.message||String(i);if(r==="auth/popup-closed-by-user"||r==="auth/cancelled-popup-request"){console.log("Sign-in cancelled by user");return}if((r==="auth/network-request-failed"||r==="auth/popup-blocked")&&n){console.warn(`[AUTH] ${r} inside iOS standalone PWA. Arming Safari fallback.`),yi=!0,alert(`Sign-in is blocked in the installed app on iOS.

Tap the Login button again to open in Safari and complete sign-in.`);return}if(r==="auth/popup-blocked"){alert("Pop-up blocked. Please enable pop-ups for this site in your browser settings, or try signing in from a desktop browser.");return}const o=i?.customData?.email,a=Ce.credentialFromError(i);if(console.error("Error during Google sign-in:",{errorCode:r,errorMessage:s,email:o,credential:a,origin:typeof window<"u"?window.location.origin:"n/a"}),r==="auth/unauthorized-domain"){const c=typeof window<"u"?window.location.origin:"",l=["This app's host is not whitelisted in Firebase Authentication.","Fix: In Firebase Console, go to Build → Authentication → Settings → Authorized domains and add this origin:",c?`• ${c}`:"• <your dev origin>","","Common dev hosts to add:","• http://localhost (covers any port)","• http://127.0.0.1","• http://[::1] (IPv6 localhost)","• Your LAN IP, e.g. http://192.168.x.y","","Tip: avoid opening index.html directly from the filesystem (file://). Use a dev server instead."];c&&typeof navigator<"u"&&navigator.clipboard?.writeText&&navigator.clipboard.writeText(c).catch(()=>{}),alert(`Sign-in failed: Unauthorized domain.

${l.join(`
`)}`);return}alert(`Sign-in failed: ${s}`)}}async function wg(){try{await Ek(Ie),console.info("User signed out"),setTimeout(()=>_g(),1500)}catch(t){throw console.error("Error signing out:",t),t}}const WR=Object.freeze(Object.defineProperty({__proto__:null,auth:Ie,authReady:yg,getCurrentUserAsync:HR,getLoggedInUserId:Xe,getUserId:ue,isLoggedIn:Qc,onAuthChange:Zc,setSafariExternalOpenArmed:Eg,signInWithGoogle:vg,signOutUser:wg},Symbol.toStringTag,{value:"Module"})),VR=t=>String(t).replace(/[&<>"'`=\/]/g,n=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;","`":"&#x60;","=":"&#x3D;","/":"&#x2F;"})[n]),jR=(t,e)=>t.replace(/\$\{([^}]+)\}/g,(n,i)=>{const r=i.trim(),s=r.split(".").reduce((a,c)=>a?.[c],e);return s==null?"":r.endsWith("Html")?String(s):VR(String(s))}),GR=(t,e={})=>{const n=document.createElement("template");return n.innerHTML=jR(t,e),n.content.cloneNode(!0)},zR=(t,e)=>{const n=[];let i=e;for(;i&&i!==t;){const r=i.parentElement;if(!r)break;const s=Array.prototype.indexOf.call(r.children,i);n.push(s),i=r}return n.reverse()},qR=(t,e)=>e.reduce((n,i)=>n&&n.children?n.children[i]:null,t),YR=t=>Array.from(t.querySelectorAll("input, textarea, select")).map(e=>({name:e.name,id:e.id,path:zR(t,e),value:e.value,checked:e.checked,selectionStart:e.selectionStart,selectionEnd:e.selectionEnd,wasFocused:document.activeElement===e})),KR=t=>t.replace(/["'\\]/g,"\\$&"),JR=(t,e)=>{e.forEach(n=>{let i=null;if(n.name){const r=KR(n.name);i=t.querySelector(`input[name="${r}"], textarea[name="${r}"], select[name="${r}"]`)}else n.id?i=t.querySelector(`#${n.id}`):n.path&&(i=qR(t,n.path));if(i){if(i.value=n.value,n.checked!==void 0&&(i.checked=n.checked),n.selectionStart!=null&&i.setSelectionRange)try{i.setSelectionRange(n.selectionStart,n.selectionEnd)}catch{}if(n.wasFocused)try{i.focus()}catch{}}})},XR=t=>Array.from(t.querySelectorAll("video, audio")).map(e=>({src:e.currentSrc||e.src,currentTime:e.currentTime,paused:e.paused,volume:e.volume,playbackRate:e.playbackRate,muted:e.muted})),QR=(t,e)=>{const n=t.querySelectorAll("video, audio");for(const i of n)if(i.currentSrc===e||i.src===e)return i;return null},ZR=(t,e)=>{e.forEach(n=>{if(!n.src)return;const i=QR(t,n.src);i&&(i.currentTime=n.currentTime,i.volume=n.volume,i.playbackRate=n.playbackRate,i.muted=n.muted,n.paused||i.play().catch(()=>{}))})},eA=()=>document.readyState!=="loading",bg=({initialProps:t={},template:e="",handlers:n={},parent:i=null,containerTag:r="div",className:s="",onMount:o=null,onCleanup:a=null,autoAppend:c=!0,preserveInputState:l=!0}={})=>{if(!eA())return console.error("createComponent: DOM must be ready before creating components."),null;const u=document.createElement(r);s&&(u.className=s);let d={...t};const h=new Set,f=/\$\{([^}]+)\}/g;let p;for(;(p=f.exec(e))!==null;){const _=p[1].trim().split(".")[0];h.add(_)}const E=[],m=[],T={},N=()=>{let _=[],L=[];l&&(_=YR(u),L=XR(u)),u.textContent="";const Le=GR(e,d);u.appendChild(Le),Object.keys(n).forEach(Se=>{const ie=u.querySelectorAll(`[onclick="${Se}"]`),Vt=n[Se];ie.forEach(vl=>{vl.removeAttribute("onclick"),typeof Vt=="function"&&vl.addEventListener("click",Vt)})}),l&&(JR(u,_),ZR(u,L)),E.forEach(Se=>Se({...d}))},de=_=>{if(!Array.isArray(_)||_.length===0)return;const L={props:{...d},changedKeys:_};m.forEach(Le=>Le(L))};for(const _ of Object.keys(t))T[_]=[],Object.defineProperty(u,_,{get(){return d[_]},set(L){d[_]!==L&&(d[_]=L,h.has(_)&&N(),T[_].forEach(Le=>Le(L)),de([_]))},configurable:!0,enumerable:!0});if(u.update=_=>{let L=!1,Le=!1;const Se=[];for(const ie in _)_[ie]!==d[ie]&&(d[ie]=_[ie],h.has(ie)&&(Le=!0),T[ie]&&T[ie].forEach(Vt=>Vt(_[ie])),L=!0,Se.push(ie));L&&Le&&N(),Se.length>0&&de(Se)},u.onRender=_=>{typeof _=="function"&&E.push(_)},u.onAnyPropUpdated=_=>{typeof _=="function"&&m.push(_)},u.onPropUpdated=(_,L)=>{typeof L=="function"&&T[_]&&T[_].push(L)},u.dispose=()=>{a&&(Array.isArray(a)?a.forEach(_=>{typeof _=="function"&&_()}):typeof a=="function"&&a()),E.length=0,m.length=0;for(const _ in T)T[_].length=0;u.remove()},N(),c&&i&&!i.contains(u)&&i.appendChild(u),typeof o=="function")try{o(u)}catch(_){NR("[createComponent]: Error in onMount handler of component",_)}return u};let gi=null;const tA=(t,e=null)=>{if(gi)return gi;if(!t)return console.error("Auth UI: Parent element is required"),null;let n=null,i=null,r=10;typeof e=="number"&&(r=e);const s=Qc();return gi=bg({initialProps:{isLoggedIn:s,userName:"Guest User",signingInDisplay:"none",loginBtnMarginRightPx:r},template:`
      <button style="margin-right: \${loginBtnMarginRightPx}px" id="goog-login-btn" class="login-btn" onclick="handleLogin" disabled>Login</button>
      <button id="goog-logout-btn" class="logout-btn" onclick="handleLogout" disabled>Logout</button>
      <span class="signing-in-indicator" style="display: \${signingInDisplay}; color: var(--text-secondary, #888); font-size: 0.9rem;">Signing in...</span>
      <div class="user-info">\${isLoggedIn ? 'Logged in: ' + userName : 'Logged out'}</div>
    `,handlers:{handleLogin:vg,handleLogout:wg},onMount:o=>{const a=c=>{const l=o.querySelector("#goog-login-btn"),u=o.querySelector("#goog-logout-btn");l&&u&&(l.disabled=c,u.disabled=!c)};a(s),n=Zc(({isLoggedIn:c,userName:l})=>{$("[AuthComponent] Auth state changed:",{isLoggedIn:c,userName:l}),a(c),o.update({isLoggedIn:c,userName:l,signingInDisplay:"none"})}),i=DR(c=>{$("[AuthComponent] One Tap status:",c),c==="signing_in"?o.update({signingInDisplay:"inline-block"}):o.update({signingInDisplay:"none"})})},onCleanup:()=>{n&&(n(),n=null),i&&(i(),i=null),gi=null},className:"auth-component",parent:t}),gi},el=t=>t?!0:(console.warn("Element not found. el.id: =>",t?.id??"(no id)","el: =>",t),console.trace(),!1),tl=t=>{if(el(t))return t.classList.contains("hidden")},A=t=>{el(t)&&t.classList.contains("hidden")&&t.classList.remove("hidden")},v=t=>{el(t)&&!t.classList.contains("hidden")&&t.classList.add("hidden")},Sg=t=>t.classList.contains("small-frame"),In=t=>{if(t&&!Sg(t)){t.classList.add("small-frame");const e=document.createElement("div");e.classList.add("small-frame-toggle-div");const n=document.createElement("span");n.classList.add("small-frame-toggle-icon"),n.textContent="❮",e.appendChild(n),t.appendChild(e),e.addEventListener("click",()=>{t.classList.contains("closed")?(t.classList.remove("closed"),e.classList.remove("closed"),n.classList.remove("closed")):(t.classList.add("closed"),e.classList.add("closed"),n.classList.add("closed"))})}},Ct=t=>{if(Sg(t)){t.classList.remove("small-frame");const e=document.querySelector(".small-frame-close");e&&e.remove()}};function wa(t){return document.pictureInPictureElement===t}function Ys(t="room"){const e=new URL(window.location);e.searchParams.delete(t),window.history.replaceState({},"",e)}const j=t=>{const e=document.getElementById(t);return e||(console.warn(`Element with id: ${t} not found.`),null)};let Ye=null,Wt=null,Ks=null,nl=null,Ee=null,te=null,K=null,H=null,V=null,be=null,Re=null,Ne=null,We=null,ai=null,Cg=null,Ve=null,Js=null,ci=null,li=null,il=null,rl=null,sl=null,ol=null;function Ld(){Ye=j("lobby"),Wt=j("lobby-call-btn"),Ks=j("title-auth-bar"),nl=j("videos"),Ee=j("local-video-el"),te=j("local-video-box"),K=j("remote-video-el"),H=j("remote-video-box"),V=j("shared-video-el"),be=j("shared-video-box"),Re=j("chat-controls"),Ne=j("call-btn"),We=j("hang-up-btn"),ai=j("switch-camera-btn"),Ve=j("mute-btn"),Js=j("fullscreen-partner-btn"),ci=j("mic-btn"),li=j("camera-btn"),il=j("app-pip-btn"),rl=j("app-title-h1"),sl=j("app-title-a"),ol=j("app-title-span")}document.readyState==="loading"?document.addEventListener("DOMContentLoaded",Ld):Ld();const Tg=()=>({lobbyDiv:Ye,lobbyCallBtn:Wt,titleAuthBar:Ks,videosWrapper:nl,localVideoEl:Ee,localBoxEl:te,remoteVideoEl:K,remoteBoxEl:H,sharedVideoEl:V,sharedBoxEl:be,chatControls:Re,callBtn:Ne,hangUpBtn:We,switchCameraBtn:ai,installBtn:Cg,mutePartnerBtn:Ve,fullscreenPartnerBtn:Js,micBtn:ci,cameraBtn:li,appPipBtn:il,appTitleH1:rl,appTitleA:sl,appTitleSpan:ol});function Ig(t,e=3,n=100){return new Promise(i=>{let r=0;const s=()=>{const o=document.getElementById(t);if(o){i(o);return}if(r++,r>=e){console.warn(`Element ${t} not found after ${e} attempts`),i(null);return}setTimeout(s,n)};s()})}async function kg(t,e=3,n=100){const i={},r=t.map(async s=>{const o=await Ig(s,e,n);return i[s]=o,o});return await Promise.all(r),i}async function nA(){const t=await kg(["searchBtn","searchQuery","searchResults"],5,200),e=document.querySelector(".search-section");t.searchContainer=e;const n=Object.entries(t).filter(([i,r])=>!r).map(([i])=>i);return n.length>0&&console.warn("Some YouTube elements not found:",n),t}const iA=Object.freeze(Object.defineProperty({__proto__:null,get appPipBtn(){return il},get appTitleA(){return sl},get appTitleH1(){return rl},get appTitleSpan(){return ol},get callBtn(){return Ne},get cameraBtn(){return li},get chatControls(){return Re},get fullscreenPartnerBtn(){return Js},getElements:Tg,get hangUpBtn(){return We},initializeYouTubeElements:nA,installBtn:Cg,get lobbyCallBtn(){return Wt},get lobbyDiv(){return Ye},get localBoxEl(){return te},get localVideoEl(){return Ee},get micBtn(){return ci},get mutePartnerBtn(){return Ve},get remoteBoxEl(){return H},get remoteVideoEl(){return K},robustElementAccess:Ig,get sharedBoxEl(){return be},get sharedVideoEl(){return V},get switchCameraBtn(){return ai},get titleAuthBar(){return Ks},get videosWrapper(){return nl},waitForElements:kg},Symbol.toStringTag,{value:"Module"})),Od="yt-video-box",ba="yt-player-root";let W=null,gt=!1;const Ri=()=>W,rA=()=>gt,Rg=t=>gt=t,kn=()=>{const t=document.getElementById(Od);if(!t)throw new Error(`Container #${Od} not found`);return t};function sA(){return new Promise(t=>{window.YT&&window.YT.Player?t():window.onYouTubeIframeAPIReady=()=>{t()}})}function Ag(){const t=kn();if(!document.getElementById(ba)){const e=document.createElement("div");e.id=ba,t.appendChild(e)}A(t)}function Sa(){const t=kn();v(t)}function ko(){const t=kn();return t&&!t.classList.contains("hidden")}function Ca(t){return t?t.includes("youtube.com")||t.includes("youtu.be"):!1}function Pg(t){if(!t)return null;const e=[/(?:youtube\.com\/watch\?v=)([\w-]+)/,/(?:youtu\.be\/)([\w-]+)/,/(?:youtube\.com\/embed\/)([\w-]+)/,/(?:youtube\.com\/shorts\/)([\w-]+)/];for(const n of e){const i=t.match(n);if(i&&i[1])return i[1]}return null}async function oA({url:t,onReady:e,onStateChange:n}){const i=Pg(t);if(!i)throw new Error("Invalid YouTube URL");if(await sA(),W){try{W.destroy()}catch(o){console.warn("Error destroying previous YouTube player:",o)}W=null}const r=(o=!0)=>{const a=kn(),c=W.getIframe();if(c&&a){try{a.tabIndex=-1,a.focus({preventScroll:!0})}catch{if(document.activeElement===c)try{c.blur()}catch{}}if(o){const l=u=>{if(u.code==="Space"){const d=kn(),h=W.getIframe();if(document.activeElement===h||document.activeElement===d)return;u.preventDefault(),console.debug("Space pressed, refocusing iframe"),W.getPlayerState()!==window.YT.PlayerState.PLAYING?cl():Xs()}};document.addEventListener("keydown",l,{once:!0})}}},s=()=>{const o=kn(),a=W.getIframe();if(o&&a&&document.activeElement!==a)try{a.focus()}catch{}};return Ag(),new Promise((o,a)=>{try{W=new window.YT.Player(ba,{videoId:i,playerVars:{autoplay:1,mute:0,controls:1,fs:1,rel:0,modestbranding:1,disablekb:0,origin:window.location.origin},events:{onReady:c=>{gt=!0,e&&e(c),o(W)},onStateChange:c=>{c.data===window.YT.PlayerState.ENDED&&r(!1),c.data===window.YT.PlayerState.PAUSED&&r(),c.data===window.YT.PlayerState.PLAYING&&s(),n&&n(c)},onError:c=>{console.error("YouTube player error:",c.data),a(new Error(`YouTube error: ${c.data}`))}}})}catch(c){a(c)}})}function al(){if(W){try{Sa(),W.destroy()}catch(t){console.warn("Error destroying YouTube player:",t)}W=null,gt=!1}}function cl(){W&&gt&&W.playVideo()}function Xs(){W&&gt&&W.pauseVideo()}function aA(t){W&&gt&&W.seekTo(t,!0)}function hs(){return W&&gt?W.getCurrentTime():0}function ll(){return W&&gt?W.getPlayerState():-1}const Tt={UNSTARTED:-1,ENDED:0,PLAYING:1,PAUSED:2,BUFFERING:3,CUED:5};let He=null,hr=null,Ng=!1,Ae="none",ul=null;const fr=()=>Ng,Lg=t=>Ng=t,mi=()=>Ae,cA=t=>{["yt","url","none"].includes(t)?Ae=t:console.warn("Invalid lastWatched platform:",t)};let It=!1,Ai=null,Pi=0;async function Rn(t){if(!He)return;console.debug("Updating watch sync state, roomId:",He);const e=Gs(He);try{await Nr(e,{...t,updatedBy:hr})}catch(n){console.error("Failed to update watch state:",n)}}function lA(t,e,n){if(!t)return;He=t,hr=n;const i=Gs(t);Lr(i,uA,t),_A()}function uA(t){const e=t.val();e&&e.updatedBy!==hr&&(Date.now()-Pi<500||(e.url&&e.url!==ul&&dA(e.url),e.isYouTube?hA(e):mA(e)))}function dA(t){ul=t,Ca(t)?(v(be),Og(t),Ae="yt"):(al(),A(be),V.src=t,Ae="url")}function hA(t){!Ri()||!rA()||(fA(t),pA(t))}function fA(t){const e=ll(),n=e===Tt.PLAYING;if([Tt.BUFFERING,Tt.UNSTARTED].includes(e)){gA();return}It||(t.playing&&!n?(cl(),Ae="yt"):!t.playing&&n&&(Xs(),Ae="yt"))}function pA(t){if(t.currentTime===void 0)return;const e=hs();Math.abs(e-t.currentTime)>.3&&!It&&(aA(t.currentTime),setTimeout(()=>{t.playing?cl():Xs(),Ae="yt"},500))}function gA(){It=!0,clearTimeout(Ai),Ai=setTimeout(async()=>{It=!1;const t=ll()===Tt.PLAYING;await Rn({playing:t,currentTime:hs()})},700)}function mA(t){t.playing!==void 0&&(t.playing&&V.paused?V.play().catch(e=>console.warn("Play failed:",e)):!t.playing&&!V.paused&&V.pause()),t.currentTime!==void 0&&Math.abs(V.currentTime-t.currentTime)>1&&(V.currentTime=t.currentTime,t.playing?V.play().catch(n=>console.warn("Play failed:",n)):V.pause())}function _A(){V.addEventListener("play",async()=>{!Ri()&&He&&(Pi=Date.now(),await Rn({playing:!0,isYouTube:!1})),Ae="url"}),V.addEventListener("pause",async()=>{!Ri()&&He&&(Pi=Date.now(),await Rn({playing:!1,isYouTube:!1})),Ae="url"}),V.addEventListener("seeked",async()=>{!Ri()&&He&&(Pi=Date.now(),await Rn({currentTime:V.currentTime,playing:!V.paused,isYouTube:!1})),Ae="url"})}async function yA(t){if(!t)return!1;if(Pi=Date.now(),Ca(t)){if(v(be),!await Og(t))return!1;Ae="yt"}else al(),A(be),V.src=t,Ae="url";if(He){const e=Gs(He);ft(e,{url:t,playing:!1,currentTime:0,isYouTube:Ca(t),updatedBy:hr})}return!0}async function vn(t){if(!t||!t.url)return console.warn("Non-existing or invalid video."),!1;ul=t.url;const e=await yA(t.url);return Ia(),e}async function Og(t){if(!Pg(t))return console.error("Invalid YouTube URL:",t),!1;try{return await oA({url:t,onReady:n=>{if(Rg(!0),He){const i=Gs(He);ft(i,{url:t,playing:!1,currentTime:0,isYouTube:!0,updatedBy:hr})}},onStateChange:async n=>{if(!Ri())return;const r=n.data===Tt.PLAYING,s=n.data===Tt.PAUSED;if(n.data===Tt.BUFFERING){It=!0,Ai&&clearTimeout(Ai),Ai=setTimeout(async()=>{It=!1;const c=ll()===Tt.PLAYING;await Rn({playing:c,currentTime:hs()})},700);return}s&&It||!It&&(r||s)&&await Rn({playing:r,currentTime:hs()})}}),!0}catch(n){return console.error("Failed to load YouTube video:",n),!1}}function EA(t,{inactivityMs:e=3e3,listenTarget:n=document,onShow:i=null,onHide:r=null,hideOnEsc:s=!1,excludeEvents:o=["keydown"]}={}){if(!t)return()=>{};let a=null;const l=["pointermove","pointerdown","pointerup","touchstart","touchmove","mousemove","mousedown","keydown"].filter(m=>!Array.isArray(o)||!o.includes(m));function u(){A(t);try{typeof i=="function"&&i()}catch(m){console.warn("showHideOnInactivity onShow callback error:",m)}a&&clearTimeout(a),a=setTimeout(()=>{v(t);try{typeof r=="function"&&r()}catch(m){console.warn("showHideOnInactivity onHide callback error:",m)}a=null},e)}l.forEach(m=>n.addEventListener(m,u,{passive:!0}));function d(){if(document.hidden){a&&(clearTimeout(a),a=null);try{v(t)}catch(m){console.warn("showHideOnInactivity onHide (visibilitychange) callback error:",m)}}else u()}document.addEventListener("visibilitychange",d);function h(m){if(!m.relatedTarget){a&&(clearTimeout(a),a=null),v(t);try{typeof r=="function"&&r()}catch(T){console.warn("showHideOnInactivity onHide (visibilitychange) callback error:",T)}}}n.addEventListener("mouseout",h);function f(m){if(s&&(m.key==="Escape"||m.key==="Esc")){a&&(clearTimeout(a),a=null),v(t);try{typeof r=="function"&&r()}catch(T){console.warn("showHideOnInactivity onHide (esc) callback error:",T)}}}document.addEventListener("keydown",f);function p(){a||u()}n.addEventListener("touchend",p,{passive:!0}),v(t);function E(){l.forEach(m=>n.removeEventListener(m,u)),document.removeEventListener("visibilitychange",d),n.removeEventListener("mouseout",h),n.removeEventListener("touchend",p),document.removeEventListener("keydown",f),a&&(clearTimeout(a),a=null)}return E}let kt=null,Rt=null,Dg="user";function Ta(){return Dg}function Mg(t){Dg=t}function Qs(t=!0){return!kt||!(kt instanceof MediaStream)?(t&&console.error("Invalid remote MediaStream accessed:",kt),null):kt}function xg(t){kt=t}function Fg(){kt&&(kt.getTracks().forEach(t=>t.stop()),kt=null)}function Zs(t=!0){return!Rt||!(Rt instanceof MediaStream)?(t&&(console.error("Invalid local MediaStream accessed:",Rt),console.error("Call createLocalStream() before accessing local stream.")),null):Rt}function fs(t){Rt=t}function Ug(){Rt&&(Rt.getTracks().forEach(t=>t.stop()),Rt=null)}const vA=Object.freeze(Object.defineProperty({__proto__:null,cleanupLocalStream:Ug,cleanupRemoteStream:Fg,getFacingMode:Ta,getLocalStream:Zs,getRemoteStream:Qs,setFacingMode:Mg,setLocalStream:fs,setRemoteStream:xg},Symbol.toStringTag,{value:"Module"}));let qi=!1,Cr=!1,Dd=null,Md=null,Ni=null;const wA=()=>qi;let dl=()=>{if(qi)return;const t=Qs(!1);if(!K||!t||K.paused||K.readyState<2){Cr||(Cr=!0,K.addEventListener("playing",()=>{Cr=!1,dl()},{once:!0}));return}if(Cr=!1,qi=!0,A(H),A(te),In(te),v(Ye),v(Wt),Ne.disabled=!0,Ne.classList.add("disabled"),We.disabled=!1,We.classList.remove("disabled"),Ve.disabled=!1,Ve.classList.remove("disabled"),Ni||(Ni=EA(Re,{inactivityMs:2500,hideOnEsc:!0})),!Dd){const e=()=>{fr()?In(H):Ct(H),A(H)};K.addEventListener("leavepictureinpicture",e),Dd=()=>K.removeEventListener("leavepictureinpicture",e)}if(!Md){const e=()=>v(H);K.addEventListener("enterpictureinpicture",e),Md=()=>K.removeEventListener("enterpictureinpicture",e)}},$g=()=>{qi&&(qi=!1,Ct(te),v(te),Ct(H),v(H),Ne.disabled=!1,Ne.classList.remove("disabled"),A(Wt),We.disabled=!0,We.classList.add("disabled"),Ve.disabled=!0,Ve.classList.add("disabled"),Ni&&(Ni(),Ni=null),A(Ye),A(Re))};const ps=()=>{const t=Qs(!1);return t&&t.getVideoTracks().length>0&&t.getVideoTracks()[0].enabled&&t.getVideoTracks()[0].readyState==="live"};function bA(){return"pictureInPictureEnabled"in document&&typeof document.pictureInPictureEnabled=="boolean"&&document.pictureInPictureEnabled}function Ia(){if(!fr()){if(Lg(!0),v(Ye),Re.classList.remove("bottom"),Re.classList.add("watch-mode"),wA()?(v(Ne),A(We)):(v(We),v(ci),v(Ve),A(Ne)),v(Wt),v(li),v(ai),A(Re),!ps()){v(H),Ct(H),wa(Ee)||(A(te),In(te));return}v(te),Ct(te),wa(K)?(v(H),Ct(H)):bA()?K.requestPictureInPicture().then(()=>{v(H),Ct(H)}).catch(t=>{console.warn("Failed to enter Picture-in-Picture:",t),In(H),A(H)}):(In(H),A(H))}}function Fr(){fr()&&(A(Ne),A(We),A(ci),A(Ve),A(li),A(ai),Re.classList.remove("watch-mode"),Re.classList.add("bottom"),A(Re),ps()&&(wa(K)&&document.exitPictureInPicture().catch(t=>{console.error("Failed to exit Picture-in-Picture:",t)}),Ct(H),A(H)),In(te),A(te),ps()||(A(Ye),A(Wt)),Lg(!1))}class An{constructor(){this.logs=[],this.isEnabled=!0,this.maxLogs=1e3,this.sessionId=this.generateSessionId()}log(e,n,i={}){if(!this.isEnabled)return;const r={timestamp:performance.now(),sessionId:this.sessionId,category:e,event:n,data:{...i},id:this.generateLogId()};this.logs.push(r),this.logs.length>this.maxLogs&&(this.logs=this.logs.slice(-this.maxLogs)),typeof window<"u"&&window.location?.hostname==="localhost"&&console.log(`[DIAG] ${e}:${n}`,i)}logListenerAttachment(e,n,i,r={}){this.log("LISTENER","ATTACHED",{roomId:e,listenerType:n,currentCount:i,...r})}logListenerCleanup(e,n,i={}){this.log("LISTENER","CLEANUP",{removedCount:e.length,preservedCount:n.length,removedRoomIds:e,preservedRoomIds:n,...i})}logDuplicateListener(e,n,i={}){this.log("LISTENER","DUPLICATE_PREVENTED",{roomId:e,listenerType:n,...i})}logIncomingCallEvent(e,n,i,r={}){this.log("INCOMING_CALL","DETECTED",{callerId:e,roomId:n,isFresh:i.isFresh,validationMethod:i.method,age:i.age,reason:i.reason,...r})}logNotificationDecision(e,n,i,r={}){this.log("INCOMING_CALL","NOTIFICATION_DECISION",{decision:e,reason:n,roomId:i,...r})}logCallingUILifecycle(e,n,i={}){this.log("CALLING_UI",e,{roomId:n,...i})}logFirebaseOperation(e,n,i=null,r={}){this.log("FIREBASE","OPERATION",{operation:e,success:n,error:i?{message:i.message,code:i.code,stack:i.stack}:null,...r})}logFirebaseConnectionState(e,n={}){this.log("FIREBASE","CONNECTION_STATE",{state:e,...n})}logRoomCreation(e,n,i,r={}){this.log("ROOM","CREATED",{roomId:e,isInitiator:n,creationTime:i.creationTime,listenerAttachTime:i.listenerAttachTime,timeDiff:i.listenerAttachTime-i.creationTime,...r})}logMemberJoinEvent(e,n,i,r={}){this.log("ROOM","MEMBER_JOINED",{roomId:e,memberId:n,joinedAt:i.joinedAt,role:i.role,...r})}logContactSave(e,n,i={}){this.log("CONTACT","SAVED",{contactId:e,roomId:n,...i})}logContactCall(e,n,i,r={}){this.log("CONTACT","CALL_INITIATED",{contactId:e,roomId:n,forceInitiator:i,...r})}logFreshnessValidation(e,n,i,r={}){this.log("FRESHNESS","VALIDATION",{roomId:e,method:n,result:{isFresh:i.isFresh,age:i.age,threshold:i.threshold,reason:i.reason},...r})}logRaceCondition(e,n,i,r={}){this.log("RACE_CONDITION",e,{roomId:n,events:i,...r})}getLogs(e={}){let n=[...this.logs];return e.category&&(n=n.filter(i=>i.category===e.category)),e.event&&(n=n.filter(i=>i.event===e.event)),e.roomId&&(n=n.filter(i=>i.data.roomId===e.roomId)),e.since&&(n=n.filter(i=>i.timestamp>=e.since)),e.until&&(n=n.filter(i=>i.timestamp<=e.until)),n}getCallFlowTrace(e){return this.getLogs({roomId:e}).sort((n,i)=>n.timestamp-i.timestamp)}getListenerDiagnostics(e=null){const n=this.getLogs({category:"LISTENER"});return e?n.filter(i=>i.data.roomId===e):n}getFailureAnalysis(){const e=this.logs.filter(n=>n.category==="FIREBASE"&&n.data.success===!1||n.category==="INCOMING_CALL"&&n.data.decision==="REJECT"||n.category==="LISTENER"&&n.event==="DUPLICATE_PREVENTED");return{totalFailures:e.length,firebaseFailures:e.filter(n=>n.category==="FIREBASE").length,rejectedCalls:e.filter(n=>n.category==="INCOMING_CALL"&&n.data.decision==="REJECT").length,duplicateListeners:e.filter(n=>n.event==="DUPLICATE_PREVENTED").length,failures:e}}exportDiagnostics(){return{sessionId:this.sessionId,exportTime:Date.now(),logCount:this.logs.length,logs:[...this.logs],summary:this.getFailureAnalysis()}}exportLogsAsJSON(){return JSON.stringify(this.exportDiagnostics(),null,2)}downloadLogs(e=null){e||(e=`diagnostic-logs-${this.sessionId}-${Date.now()}.json`);const n=this.exportLogsAsJSON(),i=new Blob([n],{type:"application/json"}),r=document.createElement("a");r.href=URL.createObjectURL(i),r.download=e,r.click(),URL.revokeObjectURL(r.href)}getLogsInTimeRange(e,n){return this.logs.filter(i=>i.timestamp>=e&&i.timestamp<=n)}getLogsSince(e){return this.logs.filter(n=>n.timestamp>=e)}clearOldLogs(e=1440*60*1e3){const n=Date.now()-e;this.logs=this.logs.filter(i=>i.timestamp>=n)}clearLogs(){this.logs=[]}persistLogs(){try{const e=`diagnostic-logs-${this.sessionId}`;return localStorage.setItem(e,this.exportLogsAsJSON()),e}catch(e){return console.warn("Failed to persist logs to localStorage:",e),null}}loadPersistedLogs(e){try{const n=localStorage.getItem(e);if(n){const i=JSON.parse(n);if(i.logs&&Array.isArray(i.logs)){const r=new Set(this.logs.map(o=>o.id)),s=i.logs.filter(o=>!r.has(o.id));return this.logs=[...this.logs,...s].sort((o,a)=>o.timestamp-a.timestamp),s.length}}return 0}catch(n){return console.warn("Failed to load persisted logs:",n),0}}static getPersistedLogKeys(){const e=[];for(let n=0;n<localStorage.length;n++){const i=localStorage.key(n);i&&i.startsWith("diagnostic-logs-")&&e.push(i)}return e}static cleanupPersistedLogs(e=1440*60*1e3){const n=Date.now()-e;An.getPersistedLogKeys().forEach(r=>{try{const s=localStorage.getItem(r);if(s){const o=JSON.parse(s);o.exportTime&&o.exportTime<n&&localStorage.removeItem(r)}}catch{localStorage.removeItem(r)}})}enable(){this.isEnabled=!0}disable(){this.isEnabled=!1}generateSessionId(){return`session_${performance.now()}_${Math.random().toString(36).substr(2,9)}`}generateLogId(){return`log_${performance.now()}_${Math.random().toString(36).substr(2,9)}`}formatTimestamp(e){return new Date(e).toISOString()}startTiming(e){const n=`timing_${e}_${Date.now()}`;return this.log("TIMING","START",{operation:e,timingId:n}),n}endTiming(e,n={}){const i=this.logs.find(r=>r.category==="TIMING"&&r.event==="START"&&r.data.timingId===e);if(i){const r=Date.now()-i.timestamp;return this.log("TIMING","END",{timingId:e,duration:r,operation:i.data.operation,...n}),r}return null}}let Ro=null;function y(){return Ro||(Ro=new An),Ro}typeof window<"u"&&(window.diagnosticLogger={getInstance:()=>y(),exportLogs:()=>{const e=y().exportLogsAsJSON();return console.log("Diagnostic logs exported:"),console.log(e),e},downloadLogs:t=>{y().downloadLogs(t),console.log("Diagnostic logs downloaded")},getRoomLogs:t=>{const n=y().getCallFlowTrace(t);return console.log(`Logs for room ${t}:`,n),n},getFailures:()=>{const e=y().getFailureAnalysis();return console.log("Failure analysis:",e),e},getListenerDiagnostics:t=>{const n=y().getListenerDiagnostics(t);return console.log("Listener diagnostics:",n),n},getLogsSince:t=>{const n=y().getLogsSince(t);return console.log(`Logs since ${new Date(t).toISOString()}:`,n),n},getLogsInRange:(t,e)=>{const i=y().getLogsInTimeRange(t,e);return console.log(`Logs from ${new Date(t).toISOString()} to ${new Date(e).toISOString()}:`,i),i},persistLogs:()=>{const e=y().persistLogs();return console.log(`Logs persisted with key: ${e}`),e},loadPersistedLogs:t=>{const n=y().loadPersistedLogs(t);return console.log(`Loaded ${n} persisted logs`),n},getPersistedKeys:()=>{const t=An.getPersistedLogKeys();return console.log("Persisted log keys:",t),t},clearLogs:()=>{y().clearLogs(),console.log("Diagnostic logs cleared")},enable:()=>{y().enable(),console.log("Diagnostic logging enabled")},disable:()=>{y().disable(),console.log("Diagnostic logging disabled")},getSessionInfo:()=>{const t=y(),e={sessionId:t.sessionId,logCount:t.logs.length,isEnabled:t.isEnabled,maxLogs:t.maxLogs};return console.log("Session info:",e),e},help:()=>{console.log(`
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
      `)}},window.addEventListener("beforeunload",()=>{try{const t=y();t.logs.length>0&&t.persistLogs(),An.cleanupPersistedLogs()}catch{}}),(window.location.hostname==="localhost"||window.location.hostname==="127.0.0.1")&&setTimeout(()=>{try{const t=y(),e=typeof localStorage<"u"&&localStorage.getItem("debug:console")==="1";if(!t.isEnabled||!e)return;const n=An.getPersistedLogKeys();n.length>0&&(console.log(`Found ${n.length} persisted diagnostic log sessions. Use diagnosticLogger.loadPersistedLogs(key) to load them.`),console.log("Available keys:",n))}catch{}},1e3));class SA{constructor(){this.currentRoomId=null}async createNewRoom(e,n,i=null){const r=Date.now();i||(i=Math.random().toString(36).substring(2,15)),y().log("ROOM","CREATE_START",{roomId:i,userId:n,hasOffer:!!e,timestamp:r});const s=Gt(i);try{return await ft(s,{offer:{type:e.type,sdp:e.sdp},createdAt:Date.now(),createdBy:n}),y().logFirebaseOperation("create_room",!0,null,{roomId:i,userId:n,duration:Date.now()-r}),await this.joinRoom(i,n),y().log("ROOM","CREATE_COMPLETE",{roomId:i,userId:n,totalDuration:Date.now()-r}),i}catch(o){throw y().logFirebaseOperation("create_room",!1,o,{roomId:i,userId:n,duration:Date.now()-r}),o}}async checkRoomStatus(e){const n=Gt(e),i=await tn(n);if(!i.exists())return{exists:!1,hasMembers:!1,memberCount:0};const r=i.val(),s=r.members||{},o=Object.keys(s).length;return{exists:!0,hasMembers:o>0,memberCount:o,roomData:r}}async getRoomData(e){const n=Gt(e),i=await tn(n);if(!i.exists())throw new Error("Room does not exist");return i.val()}async saveAnswer(e,n){const i=Gt(e);await Nr(i,{answer:n})}async joinRoom(e,n,i="Guest User"){const r=gd(e,n);await ft(r,{displayName:i,joinedAt:Date.now()}),y().logFirebaseOperation("set","joinRoom",`rooms/${e}/members/${n}`)}async leaveRoom(e,n=null,{deleteRoomIfEmpty:i=!0}={}){const r=n||this.currentRoomId;if(!r||!e)return;const s=gd(r,e),o=br(r),a=Gt(r);try{await jn(s)}catch(c){y().logFirebaseOperation("leave_room_remove_member",!1,c,{roomId:r,userId:e})}if(i)try{const c=await tn(o),l=c.exists()?c.val():{};(l?Object.keys(l).length:0)===0&&await jn(a).catch(d=>{y().logFirebaseOperation("delete_empty_room",!1,d,{roomId:r})})}catch(c){y().logFirebaseOperation("check_members_after_leave",!1,c,{roomId:r})}(!n||n===this.currentRoomId)&&(this.currentRoomId=null)}async rejectCall(e,n,i="user_rejected"){if(!e||!n)return;const r=Gt(e),s={rejection:{by:n,reason:i,at:Date.now()}};try{await Nr(r,s),y().log("ROOM","REJECT_SET",{roomId:e,byUserId:n,reason:i})}catch(o){throw y().log("ROOM","REJECT_SET_FAILED",{roomId:e,byUserId:n,reason:i,error:String(o?.message||o)}),o}}async cancelCall(e,n,i="caller_cancelled"){if(!e||!n)return;const r=Gt(e),s={cancellation:{by:n,reason:i,at:Date.now()}};try{await Nr(r,s),y().log("ROOM","CANCEL_SET",{roomId:e,byUserId:n,reason:i})}catch(o){throw y().log("ROOM","CANCEL_SET_FAILED",{roomId:e,byUserId:n,reason:i,error:String(o?.message||o)}),o}}onCallCancelled(e,n){const i=PI(e);Xt(i,"value",n,e),y().logFirebaseOperation("on","onCallCancelled",`rooms/${e}/cancellation`,{event:"value"})}onMemberJoined(e,n){const i=br(e);Xt(i,"child_added",n,e),y().logFirebaseOperation("on","onMemberJoined",`rooms/${e}/members`,{event:"child_added"})}onMemberLeft(e,n){const i=br(e);Xt(i,"child_removed",n,e),y().logFirebaseOperation("on","onMemberLeft",`rooms/${e}/members`,{event:"child_removed"})}onIncomingCall(e,n,i){const r=br(e),s=a=>{i("join",a.key,a.val())},o=a=>{i("leave",a.key,a.val())};return Xt(r,"child_added",s,e,n),Xt(r,"child_removed",o,e,n),()=>AI(n,e)}get roomId(){return this.currentRoomId}}const G=new SA;class CA{constructor(e,{loop:n=!1,volume:i=.5}={}){this.src=e,this.audio=new Audio(e),this.audio.loop=n,this.audio.volume=Math.max(0,Math.min(1,i)),this.isPlaying=!1,this.audio.onerror=r=>{console.error(`[AudioPlayer] Failed to load audio: ${e}`,r),this.isPlaying=!1},this.audio.onplay=()=>{this.isPlaying=!0},this.audio.onpause=()=>{this.isPlaying=!1},this.audio.onended=()=>{this.isPlaying=!1}}async play(){if(this.isPlaying)return!0;try{return await this.audio.play(),this.isPlaying=!0,!0}catch(e){return e.name==="NotAllowedError"?console.warn("[AudioPlayer] Autoplay blocked - user interaction required first",{src:this.src}):e.name==="NotSupportedError"?console.error("[AudioPlayer] Audio format not supported",{src:this.src}):console.error("[AudioPlayer] Playback error:",e),this.isPlaying=!1,!1}}stop(){this.audio&&(this.audio.pause(),this.audio.currentTime=0,this.isPlaying=!1)}pause(){this.audio&&(this.audio.pause(),this.isPlaying=!1)}setVolume(e){this.audio&&(this.audio.volume=Math.max(0,Math.min(1,e)))}getVolume(){return this.audio?.volume??0}dispose(){this.stop(),this.audio&&(this.audio.onerror=null,this.audio.onplay=null,this.audio.onpause=null,this.audio.onended=null,this.audio.src="",this.audio=null),this.isPlaying=!1}}class TA{constructor(){this.currentPlayer=null,this.currentType=null}async playIncoming(){return this._play("incoming","/sounds/incoming.mp3")}async playOutgoing(){return this._play("outgoing","/sounds/outgoing.mp3")}async _play(e,n){this.stop();try{this.currentPlayer=new CA(n,{loop:!0,volume:.7}),this.currentType=e;const i=await this.currentPlayer.play();return i?console.log(`[Ringtone] Playing ${e} ringtone`):(console.warn(`[Ringtone] Failed to start ${e} ringtone (likely autoplay blocked)`),this.currentPlayer?.dispose(),this.currentPlayer=null,this.currentType=null),i}catch(i){return console.error(`[Ringtone] Error playing ${e} ringtone:`,i),this.currentPlayer?.dispose(),this.currentPlayer=null,this.currentType=null,!1}}stop(){this.currentPlayer&&(console.log(`[Ringtone] Stopping ${this.currentType} ringtone`),this.currentPlayer.stop(),this.currentPlayer.dispose(),this.currentPlayer=null,this.currentType=null)}isPlaying(){return this.currentPlayer?.isPlaying??!1}getCurrentType(){return this.currentType}}const Pn=new TA,gs=3e4;let et=null,Ei=null;async function IA(t,e=null){const n=ue(),i=Xe();if(!i)return;const r=Hc(i);await ft(r,{roomId:t,targetContactName:e,initiatedAt:Date.now(),callerUserId:n})}async function ms(){const t=Xe();if(!t)return;const e=Hc(t);await jn(e).catch(()=>{})}async function Bg(t,e){if(!t)return!1;try{const n=Hc(t),i=await tn(n);if(!i.exists())return!1;const r=i.val();return r.roomId!==e?!1:Date.now()-r.initiatedAt<gs}catch(n){return console.warn("Failed to check outgoing call freshness",n),!1}}async function Hg(t){if(!t)return!1;try{const e=se(oe,`rooms/${t}/createdAt`),n=await tn(e);if(!n.exists())return!1;const i=n.val();return typeof i!="number"?!1:Date.now()-i<gs}catch(e){return console.warn("Failed to check room freshness",e),!1}}async function Wg(t,e,n){const i=y(),r=Date.now();Ot(),await IA(t,e);const s=document.createElement("div");s.id="calling-modal",s.style.cssText=`
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
  `;const u=async()=>{i.logCallingUILifecycle("CANCEL",t,{contactName:e,reason:"user_cancelled",duration:Date.now()-r});try{await Promise.all([ms(),G.cancelCall(t,ue(),"caller_cancelled"),G.leaveRoom(ue(),t)])}catch(d){i.log("ROOM","CALLER_CANCELLED_CLEANUP_FAIL",{roomId:t,error:String(d)})}Pn.stop(),Ot()};l.onclick=u,o.appendChild(a),o.appendChild(c),o.appendChild(l),s.appendChild(o),document.body.appendChild(s),s.dataset.roomId=t,et=s,Pn.playOutgoing(),Ei=setTimeout(async()=>{i.logCallingUILifecycle("TIMEOUT",t,{contactName:e,reason:"auto_timeout",duration:Date.now()-r,timeoutMs:gs});try{await Promise.all([ms(),G.cancelCall(t,ue(),"auto_timeout"),G.leaveRoom(ue(),t)])}catch(d){i.log("ROOM","CALLER_TIMEOUT_CLEANUP_FAIL",{roomId:t,error:String(d)})}Pn.stop(),Ot()},gs)}function Ot(){if(Pn.stop(),et){const t=et.dataset?.roomId||"unknown";y().logCallingUILifecycle("HIDE",t,{reason:"hide_called",hadTimeout:!!Ei,timestamp:Date.now()})}Ei&&(clearTimeout(Ei),Ei=null),et&&(et.remove(),et=null)}async function hl(){if(et){const t=et.dataset?.roomId||"unknown";y().logCallingUILifecycle("ANSWERED",t,{reason:"call_answered",timestamp:Date.now()})}await ms(),Ot()}async function kA(t="user_rejected"){const e=y(),n=et?.dataset?.roomId||"unknown";e.logCallingUILifecycle("REJECTED",n,{reason:t,timestamp:Date.now()}),await ms(),Ot()}const RA=Object.freeze(Object.defineProperty({__proto__:null,hideCallingUI:Ot,isOutgoingCallFresh:Bg,isRoomCallFresh:Hg,onCallAnswered:hl,onCallRejected:kA,showCallingUI:Wg},Symbol.toStringTag,{value:"Module"}));let Nn=null;function fl(t,e={}){return new Promise(n=>{const i=document.createElement("dialog");i.innerHTML=`
      <p>${t}</p>
      <div class="confirm-dialog-actions">
        <button data-action="cancel">Cancel</button>
        <button data-action="confirm" autofocus>Confirm</button>
      </div>
    `,i.classList.add("confirm-dialog");const r=i.querySelector('[data-action="confirm"]'),s=i.querySelector('[data-action="cancel"]');if(!r||!s){console.error("dialog element not found!"),n(!1);return}let o=null;function a(c){o&&clearTimeout(o),i.close(),i.remove(),Nn===a&&(Nn=null),n(c)}r.addEventListener("click",()=>{a(!0)}),s.addEventListener("click",()=>{a(!1)}),i.addEventListener("cancel",()=>a(!1)),document.body.appendChild(i),i.showModal(),Nn=a,e.autoRemoveSeconds&&typeof e.autoRemoveSeconds=="number"&&e.autoRemoveSeconds>0&&(o=setTimeout(()=>{a(!1)},e.autoRemoveSeconds*1e3))})}function AA(){if(typeof Nn=="function"){try{Nn(!1)}catch{}return Nn=null,!0}return!1}const PA=Object.freeze(Object.defineProperty({__proto__:null,default:fl,dismissActiveConfirmDialog:AA},Symbol.toStringTag,{value:"Module"}));async function xd(t,e,n){const i=Xe();if(i){const r=se(oe,`users/${i}/contacts/${t}`);await ft(r,{contactId:t,contactName:e,roomId:n,savedAt:Date.now()});return}try{const r=localStorage.getItem("contacts")||"{}",s=JSON.parse(r);s[t]={contactId:t,contactName:e,roomId:n,savedAt:Date.now()},localStorage.setItem("contacts",JSON.stringify(s))}catch(r){console.warn("Failed to save contact to localStorage",r)}}async function _s(){const t=Xe();if(t)try{const e=se(oe,`users/${t}/contacts`),n=await tn(e);return n.exists()?n.val():{}}catch(e){return console.warn("Failed to read contacts from RTDB",e),{}}try{const e=localStorage.getItem("contacts")||"{}";return JSON.parse(e)}catch(e){return console.warn("Failed to read contacts from localStorage",e),{}}}async function NA(t,e,n){if(!t||!e)return;const r=(await _s())?.[t];if(r){r.roomId!==e&&(await xd(t,r.contactName,e),await Yi(n)),console.log(`[CONTACT SAVE] Re-attaching listener for existing contact room: ${e}`),zn(e);return}if(!await fl("Save contact?",{autoRemoveSeconds:15}))return;const o=window.prompt("Enter a name for this contact:",t)||t;await xd(t,o,e),console.log(`[CONTACT SAVE] Attaching listener for saved contact room: ${e}`),zn(e),await Yi(n)}async function Yi(t){if(!t)return;const e=await _s(),n=Object.keys(e);let i=t.querySelector(".contacts-container");if(i||(i=document.createElement("div"),i.className="contacts-container",t.appendChild(i)),n.length===0){i.innerHTML="<p>No saved contacts yet.</p>",v(i);return}A(i),i.innerHTML=`
    <h3>Saved Contacts</h3>
    <div class="contacts-list">
      ${n.map(r=>{const s=e[r];return`
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
                data-contact-id="${r}"
                title="Delete contact"
              >
                ✕
              </button>
            </div>
          `}).join("")}
    </div>
  `,LA(i,t)}function LA(t,e){t.querySelectorAll(".contact-name").forEach(n=>{n.onclick=async()=>{const i=n.getAttribute("data-room-id"),r=n.getAttribute("data-contact-name");i&&(console.log(`[CONTACT CALL] Ensuring listener is active for room: ${i}`),zn(i),await Wg(i,r),eo(i,{forceInitiator:!0}).catch(s=>{console.warn("Failed to call contact:",s),Ot()}))}}),t.querySelectorAll(".contact-delete-btn").forEach(n=>{n.onclick=async()=>{const i=n.getAttribute("data-contact-id");!i||!window.confirm("Delete this contact?")||(await OA(i),await Yi(e))}})}async function OA(t){const e=Xe();if(e){try{await jn(se(oe,`users/${e}/contacts/${t}`))}catch(n){console.warn("Failed to delete contact from RTDB",n)}return}try{const n=localStorage.getItem("contacts")||"{}",i=JSON.parse(n);i[t]&&(delete i[t],localStorage.setItem("contacts",JSON.stringify(i)))}catch(n){console.warn("Failed to delete contact from localStorage",n)}}function DA(){const t=document.querySelector("link[rel~='icon']");return t?t.href:"/favicon.ico"}class MA{constructor(){this.originalTitle=document.title,this.originalFavicon=DA(),this.titleFlashInterval=null,this.isFlashing=!1,this.wakeLock=null,this.setupVisibilityListener()}setupVisibilityListener(){document.addEventListener("visibilitychange",()=>{!document.hidden&&this.isFlashing&&this.stopTitleFlashing()})}startCallIndicators(e){console.log(`[VisibilityManager] Starting call indicators for: ${e}`),this.startTitleFlashing(e),this.setFavicon("/icons/phone-ringing.svg"),this.setBadge(1),this.requestWakeLock()}stopCallIndicators(){console.log("[VisibilityManager] Stopping call indicators"),this.stopTitleFlashing(),this.restoreFavicon(),this.clearBadge(),this.releaseWakeLock()}startTitleFlashing(e){this.stopTitleFlashing();let n=!0;this.isFlashing=!0,document.title=`📞 Call from ${e}!`,this.titleFlashInterval=setInterval(()=>{this.isFlashing&&(document.title=n?`📞 Call from ${e}!`:this.originalTitle,n=!n)},1e3)}stopTitleFlashing(){this.titleFlashInterval&&(clearInterval(this.titleFlashInterval),this.titleFlashInterval=null),this.isFlashing=!1,document.title=this.originalTitle}setFavicon(e){const n=document.querySelector("link[rel~='icon']");n&&(n.href=e,console.log(`[VisibilityManager] Favicon changed to: ${e}`))}restoreFavicon(){this.setFavicon(this.originalFavicon)}setBadge(e){"setAppBadge"in navigator&&navigator.setAppBadge(e).then(()=>{console.log(`[VisibilityManager] Badge set to: ${e}`)}).catch(n=>{console.warn("[VisibilityManager] Badge not supported:",n)})}clearBadge(){"clearAppBadge"in navigator&&navigator.clearAppBadge().then(()=>{console.log("[VisibilityManager] Badge cleared")}).catch(e=>{console.warn("[VisibilityManager] Badge clear failed:",e)})}async requestWakeLock(){if("wakeLock"in navigator)try{this.wakeLock=await navigator.wakeLock.request("screen"),console.log("[VisibilityManager] Wake lock active"),this.wakeLock.addEventListener("release",()=>{console.log("[VisibilityManager] Wake lock released")})}catch(e){console.warn("[VisibilityManager] Wake lock failed:",e)}}releaseWakeLock(){this.wakeLock&&this.wakeLock.release().then(()=>{console.log("[VisibilityManager] Wake lock released manually"),this.wakeLock=null}).catch(e=>{console.warn("[VisibilityManager] Wake lock release failed:",e)})}}const Fd=new MA,Ki=new WeakMap;function pl(t,e,n){if(!t||!n)throw new Error("setupIceCandidates: pc and roomId are required");if(Ki.has(t)||Ki.set(t,[]),e==="initiator")Ud(t,"offerCandidates",n),$d(t,"answerCandidates",n);else if(e==="joiner")Ud(t,"answerCandidates",n),$d(t,"offerCandidates",n);else throw new Error(`Invalid role: ${e} specified for ICE candidate setup.`)}function Ud(t,e,n){t.onicecandidate=i=>{if(i.candidate){const r=cd(e==="offerCandidates"?Op(n):Dp(n));ft(r,i.candidate.toJSON())}}}function $d(t,e,n){const i=e==="offerCandidates"?Op(n):Dp(n);let r=!1;const s=()=>{if(r)return;r=!0;const a=()=>{t.remoteDescription&&(gl(t),t.removeEventListener("signalingstatechange",a))};t.addEventListener("signalingstatechange",a)};Xt(i,"child_added",a=>{const c=a.val();if(!(!t||t.signalingState==="closed")&&c)if(t.remoteDescription)try{t.addIceCandidate(new RTCIceCandidate(c))}catch{}else{const l=Ki.get(t);l&&(l.push(c),l.length===1&&s())}},n)}function gl(t){if(!t||!Ki.has(t))return;const e=Ki.get(t);if(e.length!==0){$(`🔄 Draining ${e.length} queued ICE candidate(s)`);for(const n of e)try{t.addIceCandidate(new RTCIceCandidate(n)).catch(i=>{$("Error adding queued ICE candidate:",i)})}catch{}e.length=0}}const xA=Object.freeze(Object.defineProperty({__proto__:null,drainIceCandidateQueue:gl,setupIceCandidates:pl},Symbol.toStringTag,{value:"Module"}));let je=null,Bd=null;function Vg(t){Bd=t,t.onconnectionstatechange=()=>{$("onconnectionstatechange:",t.connectionState),t.connectionState==="connected"?(dl(),hl().catch(e=>console.warn("Failed to clear calling state on connect:",e)),je&&(clearTimeout(je),je=null)):t.connectionState==="disconnected"?(je&&clearTimeout(je),je=setTimeout(()=>{t===Bd&&t.connectionState==="disconnected"&&ne.cleanupCall({reason:"connection_lost"}),je=null},3e3)):t.connectionState==="failed"&&(Ys(),je&&(clearTimeout(je),je=null),ne.cleanupCall({reason:"connection_failed"}))},t.addEventListener("iceconnectionstatechange",e=>{$("ICE iceconnectionstatechange:",t.iceConnectionState),t.iceConnectionState==="failed"&&(console.warn("ICE connection failed, restarting ICE..."),t.restartIce())})}function ys(t,e,n={}){if(!t||typeof e!="function")throw new Error("closeOnClickOutside: valid element and onClose callback required");const{ignore:i=[],esc:r=!0,events:s=["mousedown","touchstart"]}=n,o=Array.isArray(i)?i.filter(Boolean):[],a=l=>{try{const u=l.target;if(t.contains(u))return;for(const d of o)if(d&&d.contains&&d.contains(u)||d===u)return;e(l)}catch(u){console.error("closeOnClickOutside handler error:",u)}},c=l=>{r&&l.key==="Escape"&&e(l)};return s.forEach(l=>document.addEventListener(l,a,{passive:!0})),r&&document.addEventListener("keydown",c),function(){s.forEach(u=>document.removeEventListener(u,a,{passive:!0})),r&&document.removeEventListener("keydown",c)}}const FA=CSS.supports?.("position-anchor: --msg-toggle")&&CSS.supports?.("right: anchor(right)")&&CSS.supports?.("bottom: anchor(top)");function UA(t){const e=t.getBoundingClientRect();return e.top>=0&&e.left>=0&&e.bottom<=window.innerHeight&&e.right<=window.innerWidth}function Hd(t){const e=document.createElement("div");e.innerHTML=`
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
  `,document.body.appendChild(e);const n=e.querySelector("#messages-toggle-btn"),i=e.querySelector("#messages-box"),r=e.querySelector("#messages"),s=e.querySelector("#messages-form"),o=e.querySelector("#messages-input");if(!n||!i||!r||!s||!o)return console.error("Messages UI elements not found."),null;let a=!1;function c(){if(!n||!i||i.classList.contains("hidden"))return;const _=n.getBoundingClientRect(),L=i.getBoundingClientRect(),Le=8;let Se=_.top-L.height-Le;Se<8&&(Se=_.bottom+Le);let ie=_.left+_.width/2-L.width/2;const Vt=window.innerWidth-L.width-8;ie<8&&(ie=8),ie>Vt&&(ie=Vt),i.style.top=`${Math.round(Se)}px`,i.style.left=`${Math.round(ie)}px`}function l(){a||(a=!0,window.addEventListener("resize",c,{passive:!0}),window.addEventListener("scroll",c,{passive:!0}),window.addEventListener("orientationchange",c,{passive:!0}))}function u(){a&&(a=!1,window.removeEventListener("resize",c),window.removeEventListener("scroll",c),window.removeEventListener("orientationchange",c))}const d=document.querySelector(".top-bar .top-right-menu")||document.querySelector(".top-right-menu");n&&d&&d.appendChild(n);const h=new MutationObserver(_=>{_.forEach(L=>{L.type==="attributes"&&L.attributeName==="class"&&i.classList.contains("hidden")})});h.observe(i,{attributes:!0});function f(){i.classList.toggle("hidden"),i.classList.contains("hidden")?(o.blur(),u(),i.style.top="",i.style.left="",i.style.bottom="",i.style.right=""):(o.focus(),FA?requestAnimationFrame(()=>{UA(i)||(c(),l())}):(c(),l()))}n.addEventListener("click",f),ys(i,()=>{v(i),u(),i.style.top="",i.style.left="",i.style.bottom="",i.style.right=""},{ignore:[n],esc:!0});function p(){A(n)}function E(){v(n)}function m(_){const L=document.createElement("p");L.textContent=_,_.startsWith("You:")?L.style.textAlign="right":_.startsWith("Partner:")&&(L.style.textAlign="left"),r.appendChild(L),r.scrollTop=r.scrollHeight}function T(_){m(`Partner: ${_}`),tl(i)&&N()}function N(){n.classList.add("new-message"),setTimeout(()=>{n.classList.remove("new-message")},4e3)}s.addEventListener("submit",_=>{_.preventDefault();const L=o.value.trim();L&&(t(L),m(`You: ${L}`),o.value="")});function de(){try{mq.removeEventListener("change",applyPlacement)}catch{}n&&n.parentNode&&n.parentNode.removeChild(n),u(),h.disconnect(),e&&e.parentNode&&e.parentNode.removeChild(e)}return{appendChatMessage:m,receiveMessage:T,toggleMessages:f,showMessagesToggle:p,hideMessagesToggle:E,cleanup:de}}function jg(t,e,n=null){let i,r;return e==="initiator"?(i=t.createDataChannel("chat"),r=Hd(o=>{i.readyState==="open"&&i.send(o)}),i.onopen=()=>{r.showMessagesToggle(),r.appendChatMessage("💬 Chat connected")},i.onmessage=o=>r.receiveMessage(o.data)):e==="joiner"&&(t.ondatachannel=s=>{i=s.channel,r=Hd(o=>i.send(o)),n&&n(r),i.onopen=()=>{r.showMessagesToggle(),r.appendChatMessage("💬 Chat connected")},i.onmessage=o=>r.receiveMessage(o.data)}),{dataChannel:i,messagesUI:r}}const ml={iceServers:[{urls:"stun:stun.l.google.com:19302"}]},Ao=new WeakMap;function Gg(t,e,n){Ao.has(t)||Ao.set(t,{});const i=Ao.get(t),r=e==="offer"?"lastOffer":"lastAnswer";return i[r]===n?!0:(i[r]=n,!1)}function zg(t,e){return t?e==="offer"?t.signalingState==="stable":t.signalingState==="have-local-offer"||t.signalingState==="stable":!1}function _l(t,e){e.getTracks().forEach(n=>{t.addTrack(n,e)})}async function qg(t){const e=await t.createOffer();return await t.setLocalDescription(e),e}async function Yg(t){const e=await t.createAnswer();return await t.setLocalDescription(e),e}async function Kg(t,e,n){if(Gg(t,e.type,e.sdp))return console.debug(`Ignoring duplicate ${e.type} - already processed`),!1;if(!zg(t,e.type))return console.warn(`Ignoring ${e.type} - unexpected signaling state:`,t.signalingState),!1;try{return await t.setRemoteDescription(new RTCSessionDescription(e)),n(t),console.debug(`Remote description set (${e.type})`),!0}catch(i){return console.error(`Failed to set remote description (${e.type}):`,i),!1}}function Jg(){return Math.random().toString(36).substring(2,9)}const $A=Object.freeze(Object.defineProperty({__proto__:null,addLocalTracks:_l,createAnswer:Yg,createOffer:qg,generateRoomId:Jg,isDuplicateSdp:Gg,isValidSignalingState:zg,rtcConfig:ml,setRemoteDescription:Kg},Symbol.toStringTag,{value:"Module"}));async function BA({localStream:t,remoteVideoEl:e,mutePartnerBtn:n,setupRemoteStream:i,setupWatchSync:r,targetRoomId:s=null}){if(!t)return{success:!1};const o=new RTCPeerConnection(ml),a="initiator",c=s||Jg(),l=ue();_l(o,t);const{dataChannel:u,messagesUI:d}=jg(o,a);if(!i(o,e,n))return console.error("Error setting up remote stream"),o.close(),{success:!1};pl(o,a,c),Vg(o);const f=await qg(o);await G.createNewRoom(f,l,c),r(c,a,l);const p=`${window.location.origin}${window.location.pathname}?room=${c}`;return{success:!0,pc:o,roomId:c,roomLink:p,dataChannel:u,messagesUI:d,role:a}}async function HA({roomId:t,localStream:e,remoteVideoEl:n,mutePartnerBtn:i,setupRemoteStream:r,setupWatchSync:s,onMessagesUIReady:o=null}){if(!e)return{success:!1};if(!t)return{success:!1};const a=await G.checkRoomStatus(t);if(!a.exists)return{success:!1};if(!a.hasMembers)return{success:!1};let c;try{c=await G.getRoomData(t)}catch(T){return $("Error: "+T.message),{success:!1}}const l=c.offer;if(!l)return{success:!1};const u=new RTCPeerConnection(ml),d="joiner",h=ue();_l(u,e);const{dataChannel:f,messagesUI:p}=jg(u,d,o);if(!r(u,n,i))return console.error("Error setting up remote stream for joiner"),u.close(),{success:!1};pl(u,d,t),Vg(u),await Kg(u,l,gl);const m=await Yg(u);try{await G.saveAnswer(t,m)}catch(T){return console.error("Failed to save answer to Firebase:",T),u.close(),{success:!1}}return s(t,d,h),await G.joinRoom(t,h),{success:!0,pc:u,roomId:t,dataChannel:f,messagesUI:p,role:d}}class WA{constructor(){this.listeners=new Map}on(e,n){this.listeners.has(e)||this.listeners.set(e,new Set),this.listeners.get(e).add(n)}off(e,n){this.listeners.has(e)&&this.listeners.get(e).delete(n)}emit(e,n){if(this.listeners.has(e))for(const i of Array.from(this.listeners.get(e)))try{i(n)}catch(r){console.warn("CallController listener error",r)}}}class VA{constructor(){this.emitter=new WA,this.resetState()}resetState(){this.state="idle",this.roomId=null,this.roomLink=null,this.role=null,this.partnerId=null,this.pc=null,this.dataChannel=null,this.messagesUI=null,this.localVideoEl=null,this.remoteVideoEl=null,this.isHangingUp=!1,this.isCleaningUp=!1,this.listeners=new Map}getState(){return{state:this.state,roomId:this.roomId,roomLink:this.roomLink,role:this.role,partnerId:this.partnerId,hasPc:!!this.pc,isHangingUp:this.isHangingUp,isCleaningUp:this.isCleaningUp}}on(e,n){this.emitter.on(e,n)}off(e,n){this.emitter.off(e,n)}setPartnerId(e){this.partnerId=e}setupCancellationListener(e){if(!e)return;const n=se(oe,`rooms/${e}/cancellation`);let i=!1;const r=async s=>{const o=s.val();if(o&&!i){i=!0;try{this.remoteVideoEl&&(this.remoteVideoEl.srcObject=null)}catch(a){console.warn("Failed to clear remote video after cancellation",a)}try{this.pc&&this.pc.close()}catch{}try{await this.cleanupCall({reason:o.reason||"remote_cancelled"})}catch(a){console.warn("Failed to trigger CallController cleanup",a)}}};Lr(n,r,e),this.listeners.has("cancellation")||this.listeners.set("cancellation",[]),this.listeners.get("cancellation").push({ref:n,callback:r,roomId:e})}setupAnswerListener(e,n,i){if(!e||!n)return;const r=se(oe,`rooms/${e}/answer`),s=async o=>{const a=o.val();if(a){const{setRemoteDescription:c}=await Ze(async()=>{const{setRemoteDescription:l}=await Promise.resolve().then(()=>$A);return{setRemoteDescription:l}},void 0);await c(n,a,i)}};Lr(r,s,e),this.listeners.has("answer")||this.listeners.set("answer",[]),this.listeners.get("answer").push({ref:r,callback:s,roomId:e})}setupRejectionListener(e){if(!e)return;const n=se(oe,`rooms/${e}/rejection`);let i=!1;const r=async s=>{const o=s.val();if(o&&!i&&(i=!0,this.pc?.connectionState!=="connected")){try{const{onCallRejected:a}=await Ze(async()=>{const{onCallRejected:c}=await Promise.resolve().then(()=>RA);return{onCallRejected:c}},void 0);await a(o.reason||"user_rejected")}catch{}try{await G.leaveRoom(ue(),e)}catch{}try{this.pc&&this.pc.close()}catch{}}};Lr(n,r,e),this.listeners.has("rejection")||this.listeners.set("rejection",[]),this.listeners.get("rejection").push({ref:n,callback:r,roomId:e})}setupMemberJoinedListener(e){if(!e)return;const n=ue(),i=r=>{r.key!==n&&(this.setPartnerId(r.key),this.emitter.emit("memberJoined",{memberId:r.key,roomId:e}))};G.onMemberJoined(e,i),this.listeners.has("member-joined")||this.listeners.set("member-joined",[]),this.listeners.get("member-joined").push({callback:i,roomId:e})}setupMemberLeftListener(e){if(!e)return;const n=ue(),i=r=>{r.key!==n&&this.pc?.connectionState==="connected"&&this.emitter.emit("memberLeft",{memberId:r.key,roomId:e})};G.onMemberLeft(e,i),this.listeners.has("member-left")||this.listeners.set("member-left",[]),this.listeners.get("member-left").push({callback:i,roomId:e})}removeTrackedListeners(){try{for(const[e,n]of this.listeners.entries())for(const i of n)try{i.ref&&Ws(i.ref,"value",i.callback)}catch(r){console.warn(`Failed to remove ${e} listener`,r)}}catch(e){console.warn("Failed to remove tracked listeners",e)}finally{this.listeners.clear()}if(this.roomId)try{js(this.roomId)}catch(e){console.warn("Failed to remove RTDB listeners for room",e)}}async createCall(e={}){this.state="creating";try{e.localVideoEl&&(this.localVideoEl=e.localVideoEl),e.remoteVideoEl&&(this.remoteVideoEl=e.remoteVideoEl);const n=await BA(e);if(!n||!n.success)return this.state="idle",this.emitter.emit("error",{phase:"createCall",detail:n}),this.emitCallFailed("createCall",n),n;this.pc=n.pc,this.roomId=n.roomId,this.roomLink=n.roomLink||null,this.role=n.role||"initiator",this.dataChannel=n.dataChannel||null,this.messagesUI=n.messagesUI||null,this.state="waiting";const{drainIceCandidateQueue:i}=await Ze(async()=>{const{drainIceCandidateQueue:r}=await Promise.resolve().then(()=>xA);return{drainIceCandidateQueue:r}},void 0);return this.setupAnswerListener(this.roomId,this.pc,i),this.setupCancellationListener(this.roomId),this.setupRejectionListener(this.roomId),this.setupMemberJoinedListener(this.roomId),this.setupMemberLeftListener(this.roomId),this.emitter.emit("created",{roomId:this.roomId,roomLink:this.roomLink,role:this.role}),n}catch(n){throw this.state="idle",this.emitter.emit("error",{phase:"createCall",error:n}),this.emitCallFailed("createCall",n),n}}async answerCall(e={}){this.state="joining";try{e.localVideoEl&&(this.localVideoEl=e.localVideoEl),e.remoteVideoEl&&(this.remoteVideoEl=e.remoteVideoEl);const i=await HA({...e,onMessagesUIReady:r=>{this.messagesUI=r}});return!i||!i.success?(this.state="idle",this.emitter.emit("error",{phase:"answerCall",detail:i}),this.emitCallFailed("answerCall",i),i):(this.pc=i.pc,this.roomId=i.roomId,this.role=i.role||"joiner",this.dataChannel=i.dataChannel||null,this.messagesUI=i.messagesUI||null,this.state="connected",this.setupCancellationListener(this.roomId),this.setupMemberJoinedListener(this.roomId),this.setupMemberLeftListener(this.roomId),this.emitter.emit("answered",{roomId:this.roomId,role:this.role}),i)}catch(n){throw this.state="idle",this.emitter.emit("error",{phase:"answerCall",error:n}),this.emitCallFailed("answerCall",n),n}}async hangUp({emitCancel:e=!0,reason:n="user_hung_up"}={}){if(!this.isHangingUp){this.isHangingUp=!0;try{if(e&&this.roomId)try{await G.cancelCall(this.roomId,ue(),n)}catch(i){console.warn("CallController: cancelCall failed (non-fatal)",i)}await this.cleanupCall({reason:n}),this.emitter.emit("hangup",{roomId:this.roomId,reason:n})}catch(i){throw this.emitter.emit("error",{phase:"hangUp",error:i}),i}finally{this.isHangingUp=!1}}}isRemoteHangup(e){return e?["remote","cancelled","partner_disconnected","connection_failed"].some(i=>e.includes(i)):!1}emitCallFailed(e,n){this.emitter.emit("callFailed",{phase:e,error:n?.message||n?.error||n||"Unknown error"})}async cleanupCall({reason:e}={}){if(!this.isCleaningUp){this.isCleaningUp=!0;try{const n=this.roomId,i=this.partnerId;this.removeTrackedListeners();try{await G.leaveRoom(ue(),this.roomId)}catch{}try{if(this.pc){try{this.pc.close()}catch{}this.pc=null}}catch{}try{this.remoteVideoEl&&(this.remoteVideoEl.srcObject=null)}catch(r){console.warn("CallController: failed to clear remote video",r)}try{this.localVideoEl&&(this.localVideoEl.srcObject=null)}catch(r){console.warn("CallController: failed to clear local video",r)}try{const{cleanupLocalStream:r}=await Ze(async()=>{const{cleanupLocalStream:s}=await Promise.resolve().then(()=>vA);return{cleanupLocalStream:s}},void 0);r()}catch(r){console.warn("CallController: failed to cleanup local stream",r)}try{const{resetLocalStreamInitFlag:r}=await Ze(async()=>{const{resetLocalStreamInitFlag:s}=await Promise.resolve().then(()=>PP);return{resetLocalStreamInitFlag:s}},void 0);r()}catch{}if(this.isRemoteHangup(e)&&this.emitter.emit("remoteHangup",{roomId:n,partnerId:i,reason:e}),this.messagesUI&&this.messagesUI.cleanup)try{this.messagesUI.cleanup()}catch(r){console.warn("CallController: failed to cleanup messages UI",r)}this.resetState(),this.emitter.emit("cleanup",{roomId:n,partnerId:i,reason:e})}catch(n){throw this.emitter.emit("error",{phase:"cleanupCall",error:n}),n}finally{this.isCleaningUp=!1}}}}const ne=new VA,ka={default:{echoCancellation:!0,noiseSuppression:!0,autoGainControl:!0},withVoiceIsolationIfSupported:{echoCancellation:!0,noiseSuppression:!0,autoGainControl:!0,voiceIsolation:!0,restrictOwnAudio:!0,googHighpassFilter:!0,googTypingNoiseDetection:!0,highpassFilter:!0,typingNoiseDetection:!0}};function Xg(){const t=navigator.mediaDevices.getSupportedConstraints();return["voiceIsolation","highpassFilter","typingNoiseDetection"].every(i=>t[i])?ka.withVoiceIsolationIfSupported:ka.default}const jA=()=>ka.default,GA={desktop:{landscape:{width:{ideal:1920},height:{ideal:1080},frameRate:{min:10,ideal:30},aspectRatio:{ideal:16/9}},portrait:{width:{ideal:1080},height:{ideal:1920},frameRate:{min:10,ideal:30},aspectRatio:{ideal:9/16}}},mobile:{portrait:{width:{ideal:1080},height:{ideal:1920},aspectRatio:{ideal:9/16},frameRate:{ideal:30}},landscape:{width:{ideal:1920},height:{ideal:1080},aspectRatio:{ideal:16/9},frameRate:{ideal:30}}}},zA=()=>window.screen?.orientation?.type?.includes("portrait")||window.orientation===0||window.orientation===180;function yl(t){const e=zA()?"portrait":"landscape",i=/Mobi|Android/i.test(navigator.userAgent)?"mobile":"desktop",r=GA[i][e];return{facingMode:t,...r}}function qA(){return!!(navigator.mediaDevices&&navigator.mediaDevices.enumerateDevices)}async function YA(){return qA()?(await navigator.mediaDevices.enumerateDevices()).filter(e=>e.kind==="videoinput"):[]}async function KA(){const t=await YA();let e=!1,n=!1;return t.forEach(i=>{const r=i.label.toLowerCase();(r.includes("front")||r.includes("user"))&&(e=!0),(r.includes("back")||r.includes("rear")||r.includes("environment"))&&(n=!0)}),e&&n}async function JA({localStream:t,localVideo:e,currentFacingMode:n,peerConnection:i=null}){if(!t||!e)return console.error("switchCamera: missing localStream or localVideo"),null;const r=n==="user"?"environment":"user";try{const s=await navigator.mediaDevices.getUserMedia({video:yl(r),audio:Xg()}),o=s.getVideoTracks()[0],a=s.getAudioTracks()[0],c=t.getVideoTracks()[0],l=c?c.enabled:!0,u=t.getAudioTracks()[0],d=u?!u.enabled:!1;if(i){const h=i.getSenders().find(p=>p.track&&p.track.kind==="video");h&&h.replaceTrack(o);const f=i.getSenders().find(p=>p.track&&p.track.kind==="audio");f&&a&&f.replaceTrack(a)}return o&&(o.enabled=l),a&&(a.enabled=!d),t.getTracks().forEach(h=>h.stop()),e.srcObject=new MediaStream([o].filter(Boolean)),{newStream:s,facingMode:r}}catch(s){return console.error("Failed to switch camera:",s),null}}let Po=!1,zt=null,qt=null;function XA({getLocalStream:t,getFacingMode:e}){return zt&&qt&&zt.removeEventListener("change",qt),zt=window.matchMedia("(orientation: portrait)"),qt=()=>{try{const n=typeof t=="function"?t():null,i=typeof e=="function"?e():"user";QA({localStream:n,currentFacingMode:i})}catch(n){console.error("Orientation handler failed:",n)}},zt.addEventListener("change",qt),()=>{zt&&qt&&zt.removeEventListener("change",qt),zt=null,qt=null}}async function QA({localStream:t,currentFacingMode:e}){if(!(Po||!t?.getVideoTracks()[0])){Po=!0;try{const n=t.getVideoTracks()[0],i=yl(e);$("Applying constraints:",i),await n.applyConstraints(i),$("Video constraints updated successfully")}catch(n){console.error("Failed to apply orientation constraints:",n)}finally{Po=!1}}}let Ra=!1,Es=[];function ZA(t,e){if(!e)return;const n=e.getAudioTracks()[0];n&&(n.enabled=t)}function eP(t,e,n){n&&(n.muted=!t,n.volume=e)}function tP(t,e){const n=e.querySelector("i");n.className=t?"fa fa-microphone-slash":"fa fa-microphone"}function nP(t,e){if(!t)return;const n=()=>{if(t.muted!==Ra){const i=e.querySelector("i");i.className=t.muted?"fa fa-volume-mute":"fa fa-volume-up",Ra=t.muted}};t.addEventListener("volumechange",n),Es.push(()=>{t&&t.removeEventListener("volumechange",n)})}function iP({getLocalStream:t,getLocalVideo:e,getRemoteVideo:n,getPeerConnection:i=()=>null,setLocalStream:r=null,micBtn:s,cameraBtn:o,switchCameraBtn:a,mutePartnerBtn:c,fullscreenPartnerBtn:l}){s&&(s.onclick=()=>{const d=t(),h=e();if(!h||!d)return;const f=d.getAudioTracks()[0];if(!f)return;const p=f.enabled;ZA(!p,d),eP(!p,0,h),tP(p,s)}),o&&(o.onclick=()=>{const d=t();if(!d)return;const h=d.getVideoTracks()[0];if(h){h.enabled=!h.enabled;const f=o.querySelector("i");f.className=h.enabled?"fa fa-video":"fa fa-video-slash"}});const u=XA({getLocalStream:t,getFacingMode:Ta});Es.push(u),a&&(a.onclick=async()=>{const d=await JA({localStream:t(),localVideo:e(),currentFacingMode:Ta(),peerConnection:i()||null});d?(Mg(d.facingMode),console.log("Switched camera to facingMode:",d.facingMode),d.newStream&&typeof r=="function"&&r(d.newStream)):console.error("Camera switch failed.")},(async()=>await KA()?A(a):v(a))()),c&&(c.onclick=()=>{const d=n();d&&(d.muted=!d.muted)}),l&&(l.onclick=()=>{const d=n();d.requestFullscreen?d.requestFullscreen():d.webkitRequestFullscreen&&d.webkitRequestFullscreen()})}function rP(){Es.forEach(t=>t()),Es=[],Ra=!1}let No=null,wt=null,B=null,F=null,Wd=!1,Tr=!1,Ge=[],Aa="",le=-1,Pa=[];const sP="AIzaSyBPUjW7ac277WIYTbN4M8dUomK39qRQjhA",oP="https://www.googleapis.com/youtube/v3";async function aP(){if(Wd||Tr)return!1;Tr=!0;const{initializeYouTubeElements:t}=await Ze(async()=>{const{initializeYouTubeElements:o}=await Promise.resolve().then(()=>iA);return{initializeYouTubeElements:o}},void 0),e=await t();if(No=e.searchContainer,wt=e.searchBtn,B=e.searchQuery,F=e.searchResults,!No||!wt||!B||!F)return console.error("YouTube search elements not found in DOM"),Tr=!1,!1;const n=o=>/^https?:\/\//i.test(o),i=o=>{(F?.querySelectorAll(".search-result-item")||[]).forEach((c,l)=>{l===o?(c.classList.add("focused"),c.scrollIntoView({block:"nearest"})):c.classList.remove("focused")}),le=o??-1};wt.onclick=async()=>{const o=B.value.trim();if(tl(B)){A(B),B.focus();return}if(!o){Ur(),v(B);return}if(Gd()&&o===Aa)Na(Ge);else if(!n(o))await Vd(o);else{vn&&await vn({url:o}),v(F),B.value="",v(B),le=-1;return}},No.addEventListener("keydown",async o=>{const a=F.querySelectorAll(".search-result-item");if(a.length>0&&(o.key==="ArrowDown"||o.key==="ArrowUp")){if(o.key==="ArrowDown"){let c=le+1;c>=a.length&&(c=0),i(c)}else if(o.key==="ArrowUp"){let c=le-1;c<0&&(c=le===-1?0:a.length-1),i(c)}return}if(o.key==="Enter"){if(a.length>0&&le>=0){a[le].click(),v(B),v(F),le=-1;return}const c=B.value.trim();if(c)if(Gd()&&c===Aa)Na(Ge);else if(!n(c))await Vd(c);else{vn&&await vn({url:c}),v(F),le=-1,B.value="",v(B);return}}else o.key==="Escape"&&(lP()?Ur():B.value?B.value="":v(B))}),B.addEventListener("input",()=>{B.value.trim()===""&&Ur(),le=-1});const r=ys(B,()=>v(B),{ignore:[wt],esc:!1});Pa.push(r);const s=ys(F,()=>v(F),{ignore:[wt],esc:!1});return Pa.push(s),Tr=!1,Wd=!0,!0}async function Vd(t){if(!wt||!F){console.error("Search elements not initialized");return}Ge=[],Aa=t,wt.disabled=!0,F.innerHTML='<div class="search-loading">Searching YouTube...</div>',A(F);try{const e=await fetch(`${oP}/search?part=snippet&maxResults=10&q=${encodeURIComponent(t)}&type=video&key=${sP}`);if(!e.ok)throw e.status===403?new Error("YouTube API quota exceeded. Please try again later."):e.status===400?new Error("Invalid API key or request."):new Error(`YouTube API error: ${e.status}`);const n=await e.json();if(!n.items||n.items.length===0){jd("No videos found"),Ge=[];return}Ge=n.items.map(i=>({id:i.id.videoId,title:i.snippet.title,thumbnail:i.snippet.thumbnails.medium.url,channel:i.snippet.channelTitle,url:`https://www.youtube.com/watch?v=${i.id.videoId}`})),Na(Ge)}catch(e){console.error("YouTube search failed:",e),jd(e.message||"Search failed. Please try again.")}finally{wt.disabled=!1}}function Na(t){if(!F){console.error("Search results element not initialized");return}if(!t||t.length===0){F.innerHTML='<div class="no-results">No results found</div>',Ge=[],le=-1;return}F.innerHTML="",t.forEach(n=>{const i=document.createElement("div");i.className="search-result-item",i.innerHTML=`
      <img src="${n.thumbnail}" alt="${n.title}" class="result-thumbnail">
      <div class="search-result-info">
        <div class="search-result-title">${n.title}</div>
        <div class="search-result-channel">${n.channel}</div>
      </div>
    `,i.onclick=async()=>{if(vn){if(await vn(n),v(F),le=-1,!B){console.error("Search query element not initialized");return}B.value="",v(B)}},F.appendChild(i)}),A(F),le=0,F.querySelectorAll(".search-result-item").forEach((n,i)=>{i===le?(n.classList.add("focused"),n.scrollIntoView({block:"nearest"})):n.classList.remove("focused")})}function jd(t){if(Ge=[],le=-1,!F){console.error("Search results element not initialized");return}F.innerHTML=`<div class="search-error">${t}</div>`,A(F)}function Ur(){Ge=[],le=-1,F&&(F.innerHTML="",v(F))}function cP(){Ur(),Pa.forEach(t=>t())}function lP(){return!tl(F)}function Gd(){return Ge.length>0}function uP({parent:t,manager:e=null,onClick:n=null,hideWhenAllRead:i=!1}={}){let r=e;const s=bg({initialProps:{unreadCount:0,isHidden:!0},template:`
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
    `,handlers:{handleClick:()=>{n?n():r&&r.toggleList()}},className:"notifications-toggle-container",parent:t});return s.show=()=>{s.isHidden=!1,s.style.display="block"},s.hide=()=>{s.isHidden=!0,s.style.display="none"},s.setUnread=o=>{s.unreadCount=o,o>0?s.show():i&&s.hide()},s.setManager=o=>{r=o},s.hide(),s}class dP{constructor(){this.notifications=new Map,this.toggle=null,this.container=null,this.clickOutsideCleanup=null}setToggle(e){this.toggle=e,this.toggle.setManager&&this.toggle.setManager(this),this.createContainer(),this.updateToggle()}createContainer(){this.container||(this.container=document.createElement("div"),this.container.className="notifications-list-container",this.container.style.display="none",document.body.appendChild(this.container))}showList(){this.container&&(this.container.style.display="flex",this.setupClickOutside())}hideList(){this.container&&(this.container.style.display="none",this.cleanupClickOutside())}setupClickOutside(){this.clickOutsideCleanup||(this.clickOutsideCleanup=ys(this.container,()=>this.hideList(),{ignore:this.toggle?[this.toggle]:[],esc:!0}))}cleanupClickOutside(){this.clickOutsideCleanup&&(this.clickOutsideCleanup(),this.clickOutsideCleanup=null)}toggleList(){this.container&&(this.container.style.display==="none"?this.showList():this.hideList())}isListVisible(){return this.container&&this.container.style.display!=="none"}add(e,n){this.notifications.has(e)&&this.remove(e),this.container||this.createContainer(),n.parentElement===document.body&&n.remove(),this.container.prepend(n),this.notifications.set(e,n),this.updateToggle(),n._originalDispose||(n._originalDispose=n.dispose);const i=n._originalDispose;n.dispose=()=>{i&&i.call(n),n.parentElement&&n.remove(),this.notifications.delete(e),this.updateToggle(),n.dispose=i,delete n._originalDispose}}remove(e){const n=this.notifications.get(e);n&&(n.dispose&&n.dispose(),this.notifications.delete(e),this.updateToggle())}getCount(){return this.notifications.size}has(e){return this.notifications.has(e)}clear(){this.notifications.forEach(e=>{e.dispose&&e.dispose()}),this.notifications.clear(),this.updateToggle()}updateToggle(){this.toggle&&this.toggle.setUnread(this.getCount())}}const hP=new dP;const fP=async()=>{const t=Zs(!1);if(t&&t instanceof MediaStream)return console.debug("Reusing existing local MediaStream."),t;const e=yl("user"),n=Xg();try{const i=await navigator.mediaDevices.getUserMedia({video:e,audio:n});return fs(i),i}catch(i){if(i.name==="OverconstrainedError"){console.warn(`❌ Constraint failed on property: ${i.constraint}, falling back to basic constraints`);const r=jA(),s=await navigator.mediaDevices.getUserMedia({video:!0,audio:r});return fs(s),s}throw i}};async function pP(t){const e=await fP(),n=new MediaStream(e.getVideoTracks());return t.srcObject=n,!0}function gP(t,e,n){return t.ontrack=i=>{if($(`REMOTE TRACK RECEIVED: ${i.track.kind}`),!i.streams||!i.streams[0]||!(i.streams[0]instanceof MediaStream))return console.error("No valid remote MediaStream found in event.streams:",i.streams),!1;const r=i.streams[0];if(Qs(!1)!==r){xg(r),e.srcObject=r,nP(e,n);try{const o=document.getElementById("remote-video-box")||e.parentElement;o&&(o.classList?.remove("hidden"),e.classList?.remove("hidden"),o.style.visibility="visible",o.style.opacity="1",o.style.position="",o.style.left="",o.style.top="",e.style.visibility="visible",e.style.opacity="1")}catch(o){console.warn("Visibility override failed:",o)}}},!0}let zd=!1;function mP(t,e){const n=document.createElement("dialog");n.className="copy-link-dialog";const i=document.createElement("div");i.className="copy-link-dialog__content";const r=document.createElement("h2");r.className="copy-link-dialog__title",r.textContent=e.title,i.appendChild(r);const s=document.createElement("div");s.className="copy-link-dialog__input-container";const o=document.createElement("input");o.type="text",o.className="copy-link-dialog__input",o.value=t,o.readOnly=!0,o.setAttribute("aria-label","Link to copy"),s.appendChild(o),i.appendChild(s);const a=document.createElement("div");a.className="copy-link-dialog__buttons";const c=document.createElement("button");c.className="copy-link-dialog__button copy-link-dialog__button--primary",c.textContent=e.buttonText,c.autofocus=!0;const l=document.createElement("button");l.className="copy-link-dialog__button copy-link-dialog__button--secondary",l.textContent=e.cancelText,a.appendChild(c),a.appendChild(l),i.appendChild(a);const u=document.createElement("p");return u.className="copy-link-dialog__feedback",u.setAttribute("aria-live","polite"),i.appendChild(u),n.appendChild(i),{dialog:n,input:o,copyButton:c,cancelButton:l,feedback:u}}function _P(t,e={}){const n={title:"Share this link",buttonText:"Copy",cancelText:"Cancel",successMessage:"✓ Copied to clipboard!",errorMessage:"Failed to copy. Click the link to select it manually.",autoClose:!0,autoCloseDelay:1200,onCopy:null,onError:null,onCancel:null,onClose:null,...e};yP();const{dialog:i,input:r,copyButton:s,cancelButton:o,feedback:a}=mP(t,n);EP(i);let c=!1;const l=async()=>{await vP(t,r)?(c=!0,a.textContent=n.successMessage,a.classList.remove("copy-link-dialog__feedback--error"),n.onCopy&&n.onCopy(t),n.autoClose&&setTimeout(()=>{i.close()},n.autoCloseDelay)):(a.textContent=n.errorMessage,a.classList.add("copy-link-dialog__feedback--error"),r.readOnly=!1,r.addEventListener("click",()=>{r.select()}),n.onError&&n.onError())};return s.addEventListener("click",l),o.addEventListener("click",()=>{n.onCancel&&n.onCancel(),i.close()}),i.addEventListener("keydown",u=>{u.key==="Enter"&&!u.shiftKey&&!u.ctrlKey&&!u.altKey&&!u.metaKey&&(u.preventDefault(),l())}),i.addEventListener("close",()=>{!c&&n.onCancel&&n.onCancel(),n.onClose&&n.onClose(),setTimeout(()=>{i.remove()},300)}),document.body.appendChild(i),i.showModal(),i}function yP(){if(zd)return;const t=document.createElement("style");t.textContent=`
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
  `,document.head.appendChild(t),zd=!0}function EP(t){t.showModal||(t.showModal=function(){this.setAttribute("open",""),this.style.display="block",this.style.position="fixed",this.style.top="50%",this.style.left="50%",this.style.transform="translate(-50%, -50%)";const e=getComputedStyle(document.documentElement).getPropertyValue("--z-ui-overlay").trim();this.style.zIndex=e||"1000"},t.close=function(){this.removeAttribute("open"),this.style.display="none"})}async function vP(t,e=null){if(navigator.clipboard&&navigator.clipboard.writeText)try{return await navigator.clipboard.writeText(t),!0}catch(n){return console.warn("Clipboard API failed, using fallback:",n),!1}if(!e)return!1;try{return e.select(),e.setSelectionRange(0,99999),document.execCommand("copy")}catch(n){return console.error("Fallback copy failed:",n),!1}}function wP(){const t=window.matchMedia&&window.matchMedia("(display-mode: standalone)").matches||navigator.standalone===!0,e=/iphone|ipad|ipod/i.test(navigator.userAgent||"");if(!t||!e||!window.location.hostname.includes("github.io"))return;const i="https://vidu-aae11.web.app",r=i.replace(/\/$/,"");let s;try{s=new URL(r).hostname}catch(l){console.error("[PWA Redirect] Invalid VITE_APP_HOSTING_URL:",i,l);return}if(window.location.hostname===s)return;const o="/HangVidU/";let a=window.location.pathname;a.startsWith(o)?a="/"+a.slice(o.length):a==="/HangVidU"&&(a="/");let c;try{c=new URL(a+window.location.search+window.location.hash,r).toString()}catch(l){console.error("[PWA Redirect] Failed to construct target URL:",l);return}console.log("[PWA Redirect] iOS standalone PWA on gh-pages → redirecting to Firebase Hosting:",c),window.location.replace(c)}PR(!0);y().disable();let El=[];async function bP(){CP();const t=Tg(),n=["localVideoEl","remoteVideoEl","localBoxEl","remoteBoxEl","chatControls","lobbyDiv","titleAuthBar"].filter(i=>!t[i]);if(n.length>0)return console.error("Critical elements missing:",n),!1;try{{const{setupPWA:s}=await Ze(async()=>{const{setupPWA:o}=await import("./PWA-Bi3K6_dD.js");return{setupPWA:o}},[]);await s()}aP(),kP(),await yg;const i=tA(Ks);i&&El.push(i.dispose),await Li();const r=document.querySelector(".top-right-menu");if(r){const s=uP({parent:r,hideWhenAllRead:!0});hP.setToggle(s)}return!0}catch(i){return console.error("Failed to get user media:",i),!1}}let La=!1;function SP(){La=!1}async function Li(){La||(La=!0,await pP(Ee),iP({getLocalStream:Zs,getLocalVideo:()=>Ee,getRemoteVideo:()=>K,getPeerConnection:()=>ne.getState().pc,setLocalStream:fs,micBtn:ci,cameraBtn:li,switchCameraBtn:ai,mutePartnerBtn:Ve,fullscreenPartnerBtn:Js}),Ee&&(Ee.addEventListener("enterpictureinpicture",()=>te&&v(te)),Ee.addEventListener("leavepictureinpicture",()=>{te&&!(fr()&&ps())&&A(te)})))}function CP(){v(H),v(te),v(be),v(Re)}function $r(t=null){return{localStream:Zs(),localVideoEl:Ee,remoteVideoEl:K,mutePartnerBtn:Ve,setupRemoteStream:gP,setupWatchSync:lA,targetRoomId:t}}function Br(t,e=!1){return t.success?(e&&t.roomLink&&_P(t.roomLink,{onCopy:()=>$("Link ready! Share with your partner."),onCancel:()=>$("Link ready! Use the copy button to use it, or create a new one.")}),!0):!1}async function eo(t,{forceInitiator:e=!1}={}){try{await Li()}catch(s){return console.error("Failed to initialize local media stream:",s),!1}const n=Date.now();if(e){y().logRoomCreation(t,!0,{creationTime:n,listenerAttachTime:n,timeDiff:0},{trigger:"force_initiator",reason:"calling_saved_contact"}),await Li();const s=await ne.createCall($r(t));return Br(s,!1)}let i=await G.checkRoomStatus(t);if(i.exists&&!i.hasMembers){let o=0;for(;o<3&&!i.hasMembers;)await new Promise(a=>setTimeout(a,250*(o+1))),i=await G.checkRoomStatus(t),o++}if(!i.exists||!i.hasMembers){y().logRoomCreation(t,!0,{creationTime:n,listenerAttachTime:n,timeDiff:0},{trigger:"room_empty_or_nonexistent",roomExists:i.exists,memberCount:i.memberCount||0}),await Li();const s=await ne.createCall($r(t));return Br(s,!0)}y().log("ROOM","JOINING_EXISTING",{roomId:t,memberCount:i.memberCount,roomExists:i.exists});const r=await ne.answerCall({roomId:t,...$r()});return Br(r,!1)}const ve=new Set,Qg=new Map;function qd(t){t&&(js(t),ve.delete(t),Qg.delete(t),y().log("LISTENER","INCOMING_CLEANUP",{roomId:t,remainingListeners:ve.size}))}function TP(){$(`[LISTENER] Removing all incoming listeners (${ve.size} rooms)`);const t=Array.from(ve);t.forEach(e=>{js(e)}),ve.clear(),Qg.clear(),y().log("LISTENER","ALL_INCOMING_CLEANUP",{roomsCleared:t.length})}async function IP(t){const e=Date.now(),n=e+1440*60*1e3,i=Xe();if(i){const r=Bc(i,t);await ft(r,{roomId:t,savedAt:e,expiresAt:n});return}try{const r=localStorage.getItem("recentCalls")||"{}",s=JSON.parse(r);s[t]={roomId:t,savedAt:e,expiresAt:n},localStorage.setItem("recentCalls",JSON.stringify(s))}catch(r){console.warn("Failed to save recent call to localStorage",r)}}async function Lo(t){const e=Xe();if(e){try{await jn(Bc(e,t))}catch(n){console.warn("Failed to remove recent call from RTDB",n)}return}try{const n=localStorage.getItem("recentCalls")||"{}",i=JSON.parse(n);i[t]&&(delete i[t],localStorage.setItem("recentCalls",JSON.stringify(i)))}catch(n){console.warn("Failed to remove recent call from localStorage",n)}}function zn(t){t&&(ve.has(t)&&(ve.delete(t),js(t)),$(`[LISTENER] Attaching listener for room: ${t} (total: ${ve.size+1})`),ve.add(t),y().logListenerAttachment(t,"member_join",ve.size,{action:"incoming_call_listener_attached"}),G.onMemberJoined(t,async e=>{const n=e.key,i=e.val?e.val():null,r=ue();if(n&&n!==r){y().logMemberJoinEvent(t,n,i||{},{detectedBy:"incoming_call_listener",currentUserId:r});const s=i&&typeof i.joinedAt=="number"?i.joinedAt:null,o=2e4;let a=!1,c="none",l=0;if(s&&(l=Date.now()-s,a=l<o,c="joinedAt"),!a){const N=await Bg(n,t),de=await Hg(t);a=N||de,c=N?"outgoingState":de?"roomCreatedAt":"failed"}const u={isFresh:a,method:c,age:l,reason:a?"call_is_fresh":"call_is_stale"};if(y().logIncomingCallEvent(n,t,u,{memberData:i,joinedAt:s,CALL_FRESH_MS:o}),!a){y().logNotificationDecision("REJECT","stale_call",t,{age:l,validationMethod:c,joiningUserId:n});return}let d;try{d=await G.getRoomData(t)}catch{return}if(!d||typeof d!="object")return;const h=!!d.offer,f=!!d.answer,p=d.createdBy;if(!h||f||p===r)return;const E=ne.getState();if(!!E.pc&&E.pc.connectionState==="connected"){y().logNotificationDecision("REJECT","already_in_call",t,{joiningUserId:n,currentCallState:E.pc?.connectionState});return}y().logNotificationDecision("SHOW","fresh_call_detected",t,{joiningUserId:n,freshnessResult:u}),Pn.playIncoming(),Fd.startCallIndicators(n);const T=await fl(`Incoming call from ${n} for room ${t}.

Accept?`);if(Pn.stop(),Fd.stopCallIndicators(),T)qd(t),y().logNotificationDecision("ACCEPT","user_accepted",t,{joiningUserId:n}),eo(t).catch(N=>{console.warn("Failed to answer incoming call:",N),y().logFirebaseOperation("join_room_on_accept",!1,N,{roomId:t,joiningUserId:n})});else{y().logNotificationDecision("REJECT","user_rejected",t,{joiningUserId:n});try{await G.rejectCall(t,ue(),"user_rejected")}catch(N){console.warn("Failed to signal rejection via RTDB:",N)}await Lo(t).catch(N=>{console.warn("Failed to remove recent call on rejection:",N)})}}}),G.onCallCancelled(t,async e=>{if(e&&typeof e.val=="function"&&e.val()){try{const{dismissActiveConfirmDialog:i}=await Ze(async()=>{const{dismissActiveConfirmDialog:r}=await Promise.resolve().then(()=>PA);return{dismissActiveConfirmDialog:r}},void 0);typeof i=="function"&&i()}catch{}await Lo(t).catch(()=>{})}}),G.onMemberLeft(t,async e=>{const n=e.key,i=ue();if(!(!n||n===i))try{(await G.checkRoomStatus(t)).hasMembers||(await Lo(t),qd(t),$(`Removed saved recent call and listeners for room ${t} because it is now empty`))}catch(r){console.warn("Failed to evaluate room status on member leave",r)}}))}async function Yd(){const t=Date.now();y().log("LISTENER","STARTUP_BEGIN",{timestamp:t,currentListenerCount:ve.size});try{if(typeof window<"u"){const{getCurrentUserAsync:n}=await Ze(async()=>{const{getCurrentUserAsync:i}=await Promise.resolve().then(()=>WR);return{getCurrentUserAsync:i}},void 0);await n()}}catch{}const e=Xe();if(y().log("LISTENER","AUTH_STATE_DETERMINED",{isLoggedIn:!!e,userId:e||"guest"}),e){const n=NI(e);try{const i=await tn(n),r=i.exists()?i.val():null,s=new Set;if(r)for(const[o,a]of Object.entries(r)){if(!a||a.expiresAt&&a.expiresAt<Date.now()){await jn(Bc(e,o)).catch(()=>{});continue}s.add(o)}try{const o=await _s();Object.values(o||{}).forEach(a=>{a?.roomId&&s.add(a.roomId)})}catch{}s.forEach(o=>zn(o)),y().log("LISTENER","STARTUP_COMPLETE",{storage:"rtdb",roomsToListen:Array.from(s),totalListeners:ve.size,duration:Date.now()-t})}catch(i){console.warn("Failed to read recent calls from RTDB",i),y().logFirebaseOperation("read_recent_calls",!1,i,{storage:"rtdb",userId:e})}return}try{const n=localStorage.getItem("recentCalls")||"{}",i=JSON.parse(n),r={},s=new Set;for(const[o,a]of Object.entries(i||{}))!a||a.expiresAt&&a.expiresAt<Date.now()||(r[o]=a,s.add(o));try{const o=await _s();Object.values(o||{}).forEach(a=>{a?.roomId&&s.add(a.roomId)})}catch{}s.forEach(o=>zn(o)),localStorage.setItem("recentCalls",JSON.stringify(r)),y().log("LISTENER","STARTUP_COMPLETE",{storage:"localStorage",roomsToListen:Array.from(s),totalListeners:ve.size,duration:Date.now()-t,expiredRoomsRemoved:Object.keys(i||{}).length-s.size})}catch(n){console.warn("Failed to read recent calls from localStorage",n),y().logFirebaseOperation("read_recent_calls",!1,n,{storage:"localStorage"})}}function Oo(){return V&&be&&!be.classList.contains("hidden")&&V.src&&V.src.trim()!==""}let Kd=!1;function kP(){if(Kd)return;const t=()=>{const e=document.activeElement;return e&&(e.tagName==="INPUT"||e.tagName==="TEXTAREA"||e.isContentEditable)};document.addEventListener("keydown",e=>{if(!t()&&((e.key==="w"||e.key==="W")&&(console.log("=== W KEY PRESSED ==="),console.log("lastWatched:",mi()),console.log("isYTVisible():",ko()),console.log("isSharedVideoVisible():",Oo()),console.log("isWatchModeActive():",fr()),mi()==="yt"?ko()?(Sa(),Fr()):(Ag(),Ia()):mi()==="url"&&(Oo()?(v(be),Fr()):(A(be),Ia()))),e.key==="m"||e.key==="M")){const n=ne.getState();n.messagesUI&&n.messagesUI.toggleMessages()}e.key==="Escape"&&(mi()==="yt"&&ko()?(Xs(),Sa()):mi()==="url"&&Oo()&&(V.pause(),v(be)),Fr())}),Kd=!0}const Zg=async()=>{await Li();const t=await ne.createCall($r());Br(t,!0)};Ne.onclick=Zg;Wt.onclick=Zg;We.onclick=async()=>{console.debug("Hanging up..."),await ne.hangUp({emitCancel:!0,reason:"user_hung_up"})};async function RP(){const e=new URLSearchParams(window.location.search).get("room");if(!e)return!1;const n=await eo(e);return n||(Ys(),$g()),n}wP();window.onload=async()=>{if(!await bP()){Ne.disabled=!0,console.error("Initialization failed. Cannot start chat.");return}await Yd().catch(r=>console.warn("Failed to start saved-room listeners",r)),Yi(Ye).catch(r=>{console.warn("Failed to render contacts list:",r)});let e=null;const n=Zc(async({isLoggedIn:r,user:s})=>{try{const o=e===null,a=e===!0&&!r,c=e===!1&&r;e=r,await Yi(Ye),a?($("[AUTH] User logged out - cleaning up incoming listeners"),TP()):c?($("[AUTH] User logged in - re-attaching incoming listeners"),await Yd().catch(l=>console.warn("Failed to re-attach saved-room listeners on login",l))):o&&r&&$("[AUTH] Initial load with logged-in user")}catch(o){console.warn("Failed to handle auth change:",o)}});El.push(()=>{try{typeof n=="function"&&n()}catch{}}),await RP()};window.addEventListener("beforeunload",async t=>{const e=ne.getState();if(e.pc&&e.pc.connectionState==="connected")return t.preventDefault(),t.returnValue="You are in an active call. Are you sure you want to leave?",t.returnValue;await AP()});ne.on("memberJoined",({memberId:t,roomId:e})=>{console.debug("CallController memberJoined event",{memberId:t,roomId:e}),ne.setPartnerId(t),dl(),hl().catch(n=>console.warn("Failed to clear calling state:",n)),IP(e).catch(n=>console.warn("Failed to save recent call:",n))});ne.on("memberLeft",({memberId:t})=>{console.info("Partner has left the call")});ne.on("cleanup",({roomId:t,partnerId:e,reason:n})=>{Ot(),Fg(),$g(),Ys();const i=ne.getState();i.messagesUI&&typeof i.messagesUI.cleanup=="function"&&(i.messagesUI.cleanup(),i.messagesUI=null),e&&t&&setTimeout(()=>{NA(e,t,Ye).catch(r=>{console.warn("Failed to save contact after cleanup:",r)})},500)});async function AP(){await ne.hangUp({emitCancel:!0,reason:"page_unload"}),rP(),RI(),document.pictureInPictureElement&&document.exitPictureInPicture().catch(e=>console.error(e));const t=ne.getState();t.messagesUI&&t.messagesUI.cleanup&&t.messagesUI.cleanup(),window.history.replaceState({},document.title,window.location.pathname),V.src="",Ug(),Ee&&Ee.srcObject&&(Ee.srcObject=null),K&&K.srcObject&&(K.srcObject=null),Fr(),Ys(),cA("none"),al(),Rg(!1),cP(),El.forEach(e=>e())}const PP=Object.freeze(Object.defineProperty({__proto__:null,joinOrCreateRoomWithId:eo,listenForIncomingOnRoom:zn,resetLocalStreamInitFlag:SP},Symbol.toStringTag,{value:"Module"}));export{Ze as _,bg as c,$ as d,v as h,NP as i,hP as n,A as s};
