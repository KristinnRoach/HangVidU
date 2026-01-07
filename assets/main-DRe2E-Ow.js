(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))r(i);new MutationObserver(i=>{for(const s of i)if(s.type==="childList")for(const o of s.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&r(o)}).observe(document,{childList:!0,subtree:!0});function n(i){const s={};return i.integrity&&(s.integrity=i.integrity),i.referrerPolicy&&(s.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?s.credentials="include":i.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function r(i){if(i.ep)return;i.ep=!0;const s=n(i);fetch(i.href,s)}})();const Um="modulepreload",$m=function(t){return"/HangVidU/"+t},Gl={},Ae=function(e,n,r){let i=Promise.resolve();if(n&&n.length>0){let c=function(l){return Promise.all(l.map(u=>Promise.resolve(u).then(d=>({status:"fulfilled",value:d}),d=>({status:"rejected",reason:d}))))};document.getElementsByTagName("link");const o=document.querySelector("meta[property=csp-nonce]"),a=o?.nonce||o?.getAttribute("nonce");i=c(n.map(l=>{if(l=$m(l),l in Gl)return;Gl[l]=!0;const u=l.endsWith(".css"),d=u?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${l}"]${d}`))return;const h=document.createElement("link");if(h.rel=u?"stylesheet":Um,u||(h.as="script"),h.crossOrigin="",h.href=l,a&&h.setAttribute("nonce",a),document.head.appendChild(h),u)return new Promise((f,p)=>{h.addEventListener("load",f),h.addEventListener("error",()=>p(new Error(`Unable to preload CSS for ${l}`)))})}))}function s(o){const a=new Event("vite:preloadError",{cancelable:!0});if(a.payload=o,window.dispatchEvent(a),!a.defaultPrevented)throw o}return i.then(o=>{for(const a of o||[])a.status==="rejected"&&s(a.reason);return e().catch(s)})},C=typeof __SENTRY_DEBUG__>"u"||__SENTRY_DEBUG__,D=globalThis,an="10.26.0";function Us(){return $s(D),D}function $s(t){const e=t.__SENTRY__=t.__SENTRY__||{};return e.version=e.version||an,e[an]=e[an]||{}}function or(t,e,n=D){const r=n.__SENTRY__=n.__SENTRY__||{},i=r[an]=r[an]||{};return i[t]||(i[t]=e())}const Bm=["debug","info","warn","error","log","assert","trace"],Hm="Sentry Logger ",is={};function ar(t){if(!("console"in D))return t();const e=D.console,n={},r=Object.keys(is);r.forEach(i=>{const s=is[i];n[i]=e[i],e[i]=s});try{return t()}finally{r.forEach(i=>{e[i]=n[i]})}}function Wm(){rc().enabled=!0}function Vm(){rc().enabled=!1}function bh(){return rc().enabled}function jm(...t){nc("log",...t)}function zm(...t){nc("warn",...t)}function Gm(...t){nc("error",...t)}function nc(t,...e){C&&bh()&&ar(()=>{D.console[t](`${Hm}[${t}]:`,...e)})}function rc(){return C?or("loggerSettings",()=>({enabled:!1})):{enabled:!1}}const b={enable:Wm,disable:Vm,isEnabled:bh,log:jm,warn:zm,error:Gm},Sh=50,dn="?",ql=/\(error: (.*)\)/,Yl=/captureMessage|captureException/;function Ch(...t){const e=t.sort((n,r)=>n[0]-r[0]).map(n=>n[1]);return(n,r=0,i=0)=>{const s=[],o=n.split(`
`);for(let a=r;a<o.length;a++){let c=o[a];c.length>1024&&(c=c.slice(0,1024));const l=ql.test(c)?c.replace(ql,"$1"):c;if(!l.match(/\S*Error: /)){for(const u of e){const d=u(l);if(d){s.push(d);break}}if(s.length>=Sh+i)break}}return Ym(s.slice(i))}}function qm(t){return Array.isArray(t)?Ch(...t):t}function Ym(t){if(!t.length)return[];const e=Array.from(t);return/sentryWrapped/.test(Ni(e).function||"")&&e.pop(),e.reverse(),Yl.test(Ni(e).function||"")&&(e.pop(),Yl.test(Ni(e).function||"")&&e.pop()),e.slice(0,Sh).map(n=>({...n,filename:n.filename||Ni(e).filename,function:n.function||dn}))}function Ni(t){return t[t.length-1]||{}}const So="<anonymous>";function Ut(t){try{return!t||typeof t!="function"?So:t.name||So}catch{return So}}function Kl(t){const e=t.exception;if(e){const n=[];try{return e.values.forEach(r=>{r.stacktrace.frames&&n.push(...r.stacktrace.frames)}),n}catch{return}}}function Th(t){return"__v_isVNode"in t&&t.__v_isVNode?"[VueVNode]":"[VueViewModel]"}const ji={},Jl={};function Sn(t,e){ji[t]=ji[t]||[],ji[t].push(e)}function Cn(t,e){if(!Jl[t]){Jl[t]=!0;try{e()}catch(n){C&&b.error(`Error while instrumenting ${t}`,n)}}}function Ve(t,e){const n=t&&ji[t];if(n)for(const r of n)try{r(e)}catch(i){C&&b.error(`Error while triggering instrumentation handler.
Type: ${t}
Name: ${Ut(r)}
Error:`,i)}}let Co=null;function Km(t){const e="error";Sn(e,t),Cn(e,Jm)}function Jm(){Co=D.onerror,D.onerror=function(t,e,n,r,i){return Ve("error",{column:r,error:i,line:n,msg:t,url:e}),Co?Co.apply(this,arguments):!1},D.onerror.__SENTRY_INSTRUMENTED__=!0}let To=null;function Xm(t){const e="unhandledrejection";Sn(e,t),Cn(e,Qm)}function Qm(){To=D.onunhandledrejection,D.onunhandledrejection=function(t){return Ve("unhandledrejection",t),To?To.apply(this,arguments):!0},D.onunhandledrejection.__SENTRY_INSTRUMENTED__=!0}const Ih=Object.prototype.toString;function ic(t){switch(Ih.call(t)){case"[object Error]":case"[object Exception]":case"[object DOMException]":case"[object WebAssembly.Exception]":return!0;default:return $t(t,Error)}}function cr(t,e){return Ih.call(t)===`[object ${e}]`}function kh(t){return cr(t,"ErrorEvent")}function Xl(t){return cr(t,"DOMError")}function Zm(t){return cr(t,"DOMException")}function dt(t){return cr(t,"String")}function sc(t){return typeof t=="object"&&t!==null&&"__sentry_template_string__"in t&&"__sentry_template_values__"in t}function Bs(t){return t===null||sc(t)||typeof t!="object"&&typeof t!="function"}function Kr(t){return cr(t,"Object")}function Hs(t){return typeof Event<"u"&&$t(t,Event)}function e_(t){return typeof Element<"u"&&$t(t,Element)}function t_(t){return cr(t,"RegExp")}function fi(t){return!!(t?.then&&typeof t.then=="function")}function n_(t){return Kr(t)&&"nativeEvent"in t&&"preventDefault"in t&&"stopPropagation"in t}function $t(t,e){try{return t instanceof e}catch{return!1}}function Rh(t){return!!(typeof t=="object"&&t!==null&&(t.__isVue||t._isVue||t.__v_isVNode))}function r_(t){return typeof Request<"u"&&$t(t,Request)}const oc=D,i_=80;function Ah(t,e={}){if(!t)return"<unknown>";try{let n=t;const r=5,i=[];let s=0,o=0;const a=" > ",c=a.length;let l;const u=Array.isArray(e)?e:e.keyAttrs,d=!Array.isArray(e)&&e.maxStringLength||i_;for(;n&&s++<r&&(l=s_(n,u),!(l==="html"||s>1&&o+i.length*c+l.length>=d));)i.push(l),o+=l.length,n=n.parentNode;return i.reverse().join(a)}catch{return"<unknown>"}}function s_(t,e){const n=t,r=[];if(!n?.tagName)return"";if(oc.HTMLElement&&n instanceof HTMLElement&&n.dataset){if(n.dataset.sentryComponent)return n.dataset.sentryComponent;if(n.dataset.sentryElement)return n.dataset.sentryElement}r.push(n.tagName.toLowerCase());const i=e?.length?e.filter(o=>n.getAttribute(o)).map(o=>[o,n.getAttribute(o)]):null;if(i?.length)i.forEach(o=>{r.push(`[${o[0]}="${o[1]}"]`)});else{n.id&&r.push(`#${n.id}`);const o=n.className;if(o&&dt(o)){const a=o.split(/\s+/);for(const c of a)r.push(`.${c}`)}}const s=["aria-label","type","name","title","alt"];for(const o of s){const a=n.getAttribute(o);a&&r.push(`[${o}="${a}"]`)}return r.join("")}function ac(){try{return oc.document.location.href}catch{return""}}function o_(t){if(!oc.HTMLElement)return null;let e=t;const n=5;for(let r=0;r<n;r++){if(!e)return null;if(e instanceof HTMLElement){if(e.dataset.sentryComponent)return e.dataset.sentryComponent;if(e.dataset.sentryElement)return e.dataset.sentryElement}e=e.parentNode}return null}function Ie(t,e,n){if(!(e in t))return;const r=t[e];if(typeof r!="function")return;const i=n(r);typeof i=="function"&&Ph(i,r);try{t[e]=i}catch{C&&b.log(`Failed to replace method "${e}" in object`,t)}}function hn(t,e,n){try{Object.defineProperty(t,e,{value:n,writable:!0,configurable:!0})}catch{C&&b.log(`Failed to add non-enumerable property "${e}" to object`,t)}}function Ph(t,e){try{const n=e.prototype||{};t.prototype=e.prototype=n,hn(t,"__sentry_original__",e)}catch{}}function cc(t){return t.__sentry_original__}function Nh(t){if(ic(t))return{message:t.message,name:t.name,stack:t.stack,...Zl(t)};if(Hs(t)){const e={type:t.type,target:Ql(t.target),currentTarget:Ql(t.currentTarget),...Zl(t)};return typeof CustomEvent<"u"&&$t(t,CustomEvent)&&(e.detail=t.detail),e}else return t}function Ql(t){try{return e_(t)?Ah(t):Object.prototype.toString.call(t)}catch{return"<unknown>"}}function Zl(t){if(typeof t=="object"&&t!==null){const e={};for(const n in t)Object.prototype.hasOwnProperty.call(t,n)&&(e[n]=t[n]);return e}else return{}}function a_(t){const e=Object.keys(Nh(t));return e.sort(),e[0]?e.join(", "):"[object has no keys]"}function Lh(t,e=0){return typeof t!="string"||e===0||t.length<=e?t:`${t.slice(0,e)}...`}function eu(t,e){if(!Array.isArray(t))return"";const n=[];for(let r=0;r<t.length;r++){const i=t[r];try{Rh(i)?n.push(Th(i)):n.push(String(i))}catch{n.push("[value cannot be serialized]")}}return n.join(e)}function zi(t,e,n=!1){return dt(t)?t_(e)?e.test(t):dt(e)?n?t===e:t.includes(e):!1:!1}function Ws(t,e=[],n=!1){return e.some(r=>zi(t,r,n))}function c_(){const t=D;return t.crypto||t.msCrypto}let Io;function l_(){return Math.random()*16}function Le(t=c_()){try{if(t?.randomUUID)return t.randomUUID().replace(/-/g,"")}catch{}return Io||(Io="10000000100040008000"+1e11),Io.replace(/[018]/g,e=>(e^(l_()&15)>>e/4).toString(16))}function Oh(t){return t.exception?.values?.[0]}function tn(t){const{message:e,event_id:n}=t;if(e)return e;const r=Oh(t);return r?r.type&&r.value?`${r.type}: ${r.value}`:r.type||r.value||n||"<unknown>":n||"<unknown>"}function ra(t,e,n){const r=t.exception=t.exception||{},i=r.values=r.values||[],s=i[0]=i[0]||{};s.value||(s.value=e||""),s.type||(s.type="Error")}function Gn(t,e){const n=Oh(t);if(!n)return;const r={type:"generic",handled:!0},i=n.mechanism;if(n.mechanism={...r,...i,...e},e&&"data"in e){const s={...i?.data,...e.data};n.mechanism.data=s}}function tu(t){if(u_(t))return!0;try{hn(t,"__sentry_captured__",!0)}catch{}return!1}function u_(t){try{return t.__sentry_captured__}catch{}}const Dh=1e3;function pi(){return Date.now()/Dh}function d_(){const{performance:t}=D;if(!t?.now||!t.timeOrigin)return pi;const e=t.timeOrigin;return()=>(e+t.now())/Dh}let nu;function ht(){return(nu??(nu=d_()))()}function h_(t){const e=ht(),n={sid:Le(),init:!0,timestamp:e,started:e,duration:0,status:"ok",errors:0,ignoreDuration:!1,toJSON:()=>p_(n)};return t&&qn(n,t),n}function qn(t,e={}){if(e.user&&(!t.ipAddress&&e.user.ip_address&&(t.ipAddress=e.user.ip_address),!t.did&&!e.did&&(t.did=e.user.id||e.user.email||e.user.username)),t.timestamp=e.timestamp||ht(),e.abnormal_mechanism&&(t.abnormal_mechanism=e.abnormal_mechanism),e.ignoreDuration&&(t.ignoreDuration=e.ignoreDuration),e.sid&&(t.sid=e.sid.length===32?e.sid:Le()),e.init!==void 0&&(t.init=e.init),!t.did&&e.did&&(t.did=`${e.did}`),typeof e.started=="number"&&(t.started=e.started),t.ignoreDuration)t.duration=void 0;else if(typeof e.duration=="number")t.duration=e.duration;else{const n=t.timestamp-t.started;t.duration=n>=0?n:0}e.release&&(t.release=e.release),e.environment&&(t.environment=e.environment),!t.ipAddress&&e.ipAddress&&(t.ipAddress=e.ipAddress),!t.userAgent&&e.userAgent&&(t.userAgent=e.userAgent),typeof e.errors=="number"&&(t.errors=e.errors),e.status&&(t.status=e.status)}function f_(t,e){let n={};t.status==="ok"&&(n={status:"exited"}),qn(t,n)}function p_(t){return{sid:`${t.sid}`,init:t.init,started:new Date(t.started*1e3).toISOString(),timestamp:new Date(t.timestamp*1e3).toISOString(),status:t.status,errors:t.errors,did:typeof t.did=="number"||typeof t.did=="string"?`${t.did}`:void 0,duration:t.duration,abnormal_mechanism:t.abnormal_mechanism,attrs:{release:t.release,environment:t.environment,ip_address:t.ipAddress,user_agent:t.userAgent}}}function gi(t,e,n=2){if(!e||typeof e!="object"||n<=0)return e;if(t&&Object.keys(e).length===0)return t;const r={...t};for(const i in e)Object.prototype.hasOwnProperty.call(e,i)&&(r[i]=gi(r[i],e[i],n-1));return r}function ru(){return Le()}function Mh(){return Le().substring(16)}const ia="_sentrySpan";function iu(t,e){e?hn(t,ia,e):delete t[ia]}function su(t){return t[ia]}const g_=100;class gt{constructor(){this._notifyingListeners=!1,this._scopeListeners=[],this._eventProcessors=[],this._breadcrumbs=[],this._attachments=[],this._user={},this._tags={},this._extra={},this._contexts={},this._sdkProcessingMetadata={},this._propagationContext={traceId:ru(),sampleRand:Math.random()}}clone(){const e=new gt;return e._breadcrumbs=[...this._breadcrumbs],e._tags={...this._tags},e._extra={...this._extra},e._contexts={...this._contexts},this._contexts.flags&&(e._contexts.flags={values:[...this._contexts.flags.values]}),e._user=this._user,e._level=this._level,e._session=this._session,e._transactionName=this._transactionName,e._fingerprint=this._fingerprint,e._eventProcessors=[...this._eventProcessors],e._attachments=[...this._attachments],e._sdkProcessingMetadata={...this._sdkProcessingMetadata},e._propagationContext={...this._propagationContext},e._client=this._client,e._lastEventId=this._lastEventId,iu(e,su(this)),e}setClient(e){this._client=e}setLastEventId(e){this._lastEventId=e}getClient(){return this._client}lastEventId(){return this._lastEventId}addScopeListener(e){this._scopeListeners.push(e)}addEventProcessor(e){return this._eventProcessors.push(e),this}setUser(e){return this._user=e||{email:void 0,id:void 0,ip_address:void 0,username:void 0},this._session&&qn(this._session,{user:e}),this._notifyScopeListeners(),this}getUser(){return this._user}setTags(e){return this._tags={...this._tags,...e},this._notifyScopeListeners(),this}setTag(e,n){return this.setTags({[e]:n})}setExtras(e){return this._extra={...this._extra,...e},this._notifyScopeListeners(),this}setExtra(e,n){return this._extra={...this._extra,[e]:n},this._notifyScopeListeners(),this}setFingerprint(e){return this._fingerprint=e,this._notifyScopeListeners(),this}setLevel(e){return this._level=e,this._notifyScopeListeners(),this}setTransactionName(e){return this._transactionName=e,this._notifyScopeListeners(),this}setContext(e,n){return n===null?delete this._contexts[e]:this._contexts[e]=n,this._notifyScopeListeners(),this}setSession(e){return e?this._session=e:delete this._session,this._notifyScopeListeners(),this}getSession(){return this._session}update(e){if(!e)return this;const n=typeof e=="function"?e(this):e,r=n instanceof gt?n.getScopeData():Kr(n)?e:void 0,{tags:i,extra:s,user:o,contexts:a,level:c,fingerprint:l=[],propagationContext:u}=r||{};return this._tags={...this._tags,...i},this._extra={...this._extra,...s},this._contexts={...this._contexts,...a},o&&Object.keys(o).length&&(this._user=o),c&&(this._level=c),l.length&&(this._fingerprint=l),u&&(this._propagationContext=u),this}clear(){return this._breadcrumbs=[],this._tags={},this._extra={},this._user={},this._contexts={},this._level=void 0,this._transactionName=void 0,this._fingerprint=void 0,this._session=void 0,iu(this,void 0),this._attachments=[],this.setPropagationContext({traceId:ru(),sampleRand:Math.random()}),this._notifyScopeListeners(),this}addBreadcrumb(e,n){const r=typeof n=="number"?n:g_;if(r<=0)return this;const i={timestamp:pi(),...e,message:e.message?Lh(e.message,2048):e.message};return this._breadcrumbs.push(i),this._breadcrumbs.length>r&&(this._breadcrumbs=this._breadcrumbs.slice(-r),this._client?.recordDroppedEvent("buffer_overflow","log_item")),this._notifyScopeListeners(),this}getLastBreadcrumb(){return this._breadcrumbs[this._breadcrumbs.length-1]}clearBreadcrumbs(){return this._breadcrumbs=[],this._notifyScopeListeners(),this}addAttachment(e){return this._attachments.push(e),this}clearAttachments(){return this._attachments=[],this}getScopeData(){return{breadcrumbs:this._breadcrumbs,attachments:this._attachments,contexts:this._contexts,tags:this._tags,extra:this._extra,user:this._user,level:this._level,fingerprint:this._fingerprint||[],eventProcessors:this._eventProcessors,propagationContext:this._propagationContext,sdkProcessingMetadata:this._sdkProcessingMetadata,transactionName:this._transactionName,span:su(this)}}setSDKProcessingMetadata(e){return this._sdkProcessingMetadata=gi(this._sdkProcessingMetadata,e,2),this}setPropagationContext(e){return this._propagationContext=e,this}getPropagationContext(){return this._propagationContext}captureException(e,n){const r=n?.event_id||Le();if(!this._client)return C&&b.warn("No client configured on scope - will not capture exception!"),r;const i=new Error("Sentry syntheticException");return this._client.captureException(e,{originalException:e,syntheticException:i,...n,event_id:r},this),r}captureMessage(e,n,r){const i=r?.event_id||Le();if(!this._client)return C&&b.warn("No client configured on scope - will not capture message!"),i;const s=r?.syntheticException??new Error(e);return this._client.captureMessage(e,n,{originalException:e,syntheticException:s,...r,event_id:i},this),i}captureEvent(e,n){const r=n?.event_id||Le();return this._client?(this._client.captureEvent(e,{...n,event_id:r},this),r):(C&&b.warn("No client configured on scope - will not capture event!"),r)}_notifyScopeListeners(){this._notifyingListeners||(this._notifyingListeners=!0,this._scopeListeners.forEach(e=>{e(this)}),this._notifyingListeners=!1)}}function m_(){return or("defaultCurrentScope",()=>new gt)}function __(){return or("defaultIsolationScope",()=>new gt)}class y_{constructor(e,n){let r;e?r=e:r=new gt;let i;n?i=n:i=new gt,this._stack=[{scope:r}],this._isolationScope=i}withScope(e){const n=this._pushScope();let r;try{r=e(n)}catch(i){throw this._popScope(),i}return fi(r)?r.then(i=>(this._popScope(),i),i=>{throw this._popScope(),i}):(this._popScope(),r)}getClient(){return this.getStackTop().client}getScope(){return this.getStackTop().scope}getIsolationScope(){return this._isolationScope}getStackTop(){return this._stack[this._stack.length-1]}_pushScope(){const e=this.getScope().clone();return this._stack.push({client:this.getClient(),scope:e}),e}_popScope(){return this._stack.length<=1?!1:!!this._stack.pop()}}function Yn(){const t=Us(),e=$s(t);return e.stack=e.stack||new y_(m_(),__())}function E_(t){return Yn().withScope(t)}function v_(t,e){const n=Yn();return n.withScope(()=>(n.getStackTop().scope=t,e(t)))}function ou(t){return Yn().withScope(()=>t(Yn().getIsolationScope()))}function w_(){return{withIsolationScope:ou,withScope:E_,withSetScope:v_,withSetIsolationScope:(t,e)=>ou(e),getCurrentScope:()=>Yn().getScope(),getIsolationScope:()=>Yn().getIsolationScope()}}function lc(t){const e=$s(t);return e.acs?e.acs:w_()}function Gt(){const t=Us();return lc(t).getCurrentScope()}function mi(){const t=Us();return lc(t).getIsolationScope()}function b_(){return or("globalScope",()=>new gt)}function S_(...t){const e=Us(),n=lc(e);if(t.length===2){const[r,i]=t;return r?n.withSetScope(r,i):n.withScope(i)}return n.withScope(t[0])}function ye(){return Gt().getClient()}function C_(t){const e=t.getPropagationContext(),{traceId:n,parentSpanId:r,propagationSpanId:i}=e,s={trace_id:n,span_id:i||Mh()};return r&&(s.parent_span_id=r),s}const T_="sentry.source",I_="sentry.sample_rate",k_="sentry.previous_trace_sample_rate",R_="sentry.op",A_="sentry.origin",xh="sentry.profile_id",Fh="sentry.exclusive_time",P_=0,N_=1,L_="_sentryScope",O_="_sentryIsolationScope";function D_(t){if(t){if(typeof t=="object"&&"deref"in t&&typeof t.deref=="function")try{return t.deref()}catch{return}return t}}function Uh(t){const e=t;return{scope:e[L_],isolationScope:D_(e[O_])}}const M_="sentry-",x_=/^sentry-/;function F_(t){const e=U_(t);if(!e)return;const n=Object.entries(e).reduce((r,[i,s])=>{if(i.match(x_)){const o=i.slice(M_.length);r[o]=s}return r},{});if(Object.keys(n).length>0)return n}function U_(t){if(!(!t||!dt(t)&&!Array.isArray(t)))return Array.isArray(t)?t.reduce((e,n)=>{const r=au(n);return Object.entries(r).forEach(([i,s])=>{e[i]=s}),e},{}):au(t)}function au(t){return t.split(",").map(e=>{const n=e.indexOf("=");if(n===-1)return[];const r=e.slice(0,n),i=e.slice(n+1);return[r,i].map(s=>{try{return decodeURIComponent(s.trim())}catch{return}})}).reduce((e,[n,r])=>(n&&r&&(e[n]=r),e),{})}const $_=/^o(\d+)\./,B_=/^(?:(\w+):)\/\/(?:(\w+)(?::(\w+)?)?@)([\w.-]+)(?::(\d+))?\/(.+)/;function H_(t){return t==="http"||t==="https"}function _i(t,e=!1){const{host:n,path:r,pass:i,port:s,projectId:o,protocol:a,publicKey:c}=t;return`${a}://${c}${e&&i?`:${i}`:""}@${n}${s?`:${s}`:""}/${r&&`${r}/`}${o}`}function W_(t){const e=B_.exec(t);if(!e){ar(()=>{console.error(`Invalid Sentry Dsn: ${t}`)});return}const[n,r,i="",s="",o="",a=""]=e.slice(1);let c="",l=a;const u=l.split("/");if(u.length>1&&(c=u.slice(0,-1).join("/"),l=u.pop()),l){const d=l.match(/^\d+/);d&&(l=d[0])}return $h({host:s,pass:i,path:c,projectId:l,port:o,protocol:n,publicKey:r})}function $h(t){return{protocol:t.protocol,publicKey:t.publicKey||"",pass:t.pass||"",host:t.host,port:t.port||"",path:t.path||"",projectId:t.projectId}}function V_(t){if(!C)return!0;const{port:e,projectId:n,protocol:r}=t;return["protocol","publicKey","host","projectId"].find(o=>t[o]?!1:(b.error(`Invalid Sentry Dsn: ${o} missing`),!0))?!1:n.match(/^\d+$/)?H_(r)?e&&isNaN(parseInt(e,10))?(b.error(`Invalid Sentry Dsn: Invalid port ${e}`),!1):!0:(b.error(`Invalid Sentry Dsn: Invalid protocol ${r}`),!1):(b.error(`Invalid Sentry Dsn: Invalid projectId ${n}`),!1)}function j_(t){return t.match($_)?.[1]}function z_(t){const e=t.getOptions(),{host:n}=t.getDsn()||{};let r;return e.orgId?r=String(e.orgId):n&&(r=j_(n)),r}function G_(t){const e=typeof t=="string"?W_(t):$h(t);if(!(!e||!V_(e)))return e}function q_(t){if(typeof t=="boolean")return Number(t);const e=typeof t=="string"?parseFloat(t):t;if(!(typeof e!="number"||isNaN(e)||e<0||e>1))return e}const Bh=1;let cu=!1;function Y_(t){const{spanId:e,traceId:n,isRemote:r}=t.spanContext(),i=r?e:uc(t).parent_span_id,s=Uh(t).scope,o=r?s?.getPropagationContext().propagationSpanId||Mh():e;return{parent_span_id:i,span_id:o,trace_id:n}}function K_(t){if(t&&t.length>0)return t.map(({context:{spanId:e,traceId:n,traceFlags:r,...i},attributes:s})=>({span_id:e,trace_id:n,sampled:r===Bh,attributes:s,...i}))}function lu(t){return typeof t=="number"?uu(t):Array.isArray(t)?t[0]+t[1]/1e9:t instanceof Date?uu(t.getTime()):ht()}function uu(t){return t>9999999999?t/1e3:t}function uc(t){if(X_(t))return t.getSpanJSON();const{spanId:e,traceId:n}=t.spanContext();if(J_(t)){const{attributes:r,startTime:i,name:s,endTime:o,status:a,links:c}=t,l="parentSpanId"in t?t.parentSpanId:"parentSpanContext"in t?t.parentSpanContext?.spanId:void 0;return{span_id:e,trace_id:n,data:r,description:s,parent_span_id:l,start_timestamp:lu(i),timestamp:lu(o)||void 0,status:Z_(a),op:r[R_],origin:r[A_],links:K_(c)}}return{span_id:e,trace_id:n,start_timestamp:0,data:{}}}function J_(t){const e=t;return!!e.attributes&&!!e.startTime&&!!e.name&&!!e.endTime&&!!e.status}function X_(t){return typeof t.getSpanJSON=="function"}function Q_(t){const{traceFlags:e}=t.spanContext();return e===Bh}function Z_(t){if(!(!t||t.code===P_))return t.code===N_?"ok":t.message||"internal_error"}const ey="_sentryRootSpan";function Hh(t){return t[ey]||t}function du(){cu||(ar(()=>{console.warn("[Sentry] Returning null from `beforeSendSpan` is disallowed. To drop certain spans, configure the respective integrations directly or use `ignoreSpans`.")}),cu=!0)}function ty(t){if(typeof __SENTRY_TRACING__=="boolean"&&!__SENTRY_TRACING__)return!1;const e=ye()?.getOptions();return!!e&&(e.tracesSampleRate!=null||!!e.tracesSampler)}function hu(t){b.log(`Ignoring span ${t.op} - ${t.description} because it matches \`ignoreSpans\`.`)}function fu(t,e){if(!e?.length||!t.description)return!1;for(const n of e){if(ry(n)){if(zi(t.description,n))return C&&hu(t),!0;continue}if(!n.name&&!n.op)continue;const r=n.name?zi(t.description,n.name):!0,i=n.op?t.op&&zi(t.op,n.op):!0;if(r&&i)return C&&hu(t),!0}return!1}function ny(t,e){const n=e.parent_span_id,r=e.span_id;if(n)for(const i of t)i.parent_span_id===r&&(i.parent_span_id=n)}function ry(t){return typeof t=="string"||t instanceof RegExp}const dc="production",iy="_frozenDsc";function Wh(t,e){const n=e.getOptions(),{publicKey:r}=e.getDsn()||{},i={environment:n.environment||dc,release:n.release,public_key:r,trace_id:t,org_id:z_(e)};return e.emit("createDsc",i),i}function sy(t,e){const n=e.getPropagationContext();return n.dsc||Wh(n.traceId,t)}function oy(t){const e=ye();if(!e)return{};const n=Hh(t),r=uc(n),i=r.data,s=n.spanContext().traceState,o=s?.get("sentry.sample_rate")??i[I_]??i[k_];function a(p){return(typeof o=="number"||typeof o=="string")&&(p.sample_rate=`${o}`),p}const c=n[iy];if(c)return a(c);const l=s?.get("sentry.dsc"),u=l&&F_(l);if(u)return a(u);const d=Wh(t.spanContext().traceId,e),h=i[T_],f=r.description;return h!=="url"&&f&&(d.transaction=f),ty()&&(d.sampled=String(Q_(n)),d.sample_rand=s?.get("sentry.sample_rand")??Uh(n).scope?.getPropagationContext().sampleRand.toString()),a(d),e.emit("createDsc",d,n),d}function rt(t,e=100,n=1/0){try{return sa("",t,e,n)}catch(r){return{ERROR:`**non-serializable** (${r})`}}}function Vh(t,e=3,n=100*1024){const r=rt(t,e);return uy(r)>n?Vh(t,e-1,n):r}function sa(t,e,n=1/0,r=1/0,i=dy()){const[s,o]=i;if(e==null||["boolean","string"].includes(typeof e)||typeof e=="number"&&Number.isFinite(e))return e;const a=ay(t,e);if(!a.startsWith("[object "))return a;if(e.__sentry_skip_normalization__)return e;const c=typeof e.__sentry_override_normalization_depth__=="number"?e.__sentry_override_normalization_depth__:n;if(c===0)return a.replace("object ","");if(s(e))return"[Circular ~]";const l=e;if(l&&typeof l.toJSON=="function")try{const f=l.toJSON();return sa("",f,c-1,r,i)}catch{}const u=Array.isArray(e)?[]:{};let d=0;const h=Nh(e);for(const f in h){if(!Object.prototype.hasOwnProperty.call(h,f))continue;if(d>=r){u[f]="[MaxProperties ~]";break}const p=h[f];u[f]=sa(f,p,c-1,r,i),d++}return o(e),u}function ay(t,e){try{if(t==="domain"&&e&&typeof e=="object"&&e._events)return"[Domain]";if(t==="domainEmitter")return"[DomainEmitter]";if(typeof global<"u"&&e===global)return"[Global]";if(typeof window<"u"&&e===window)return"[Window]";if(typeof document<"u"&&e===document)return"[Document]";if(Rh(e))return Th(e);if(n_(e))return"[SyntheticEvent]";if(typeof e=="number"&&!Number.isFinite(e))return`[${e}]`;if(typeof e=="function")return`[Function: ${Ut(e)}]`;if(typeof e=="symbol")return`[${String(e)}]`;if(typeof e=="bigint")return`[BigInt: ${String(e)}]`;const n=cy(e);return/^HTML(\w*)Element$/.test(n)?`[HTMLElement: ${n}]`:`[object ${n}]`}catch(n){return`**non-serializable** (${n})`}}function cy(t){const e=Object.getPrototypeOf(t);return e?.constructor?e.constructor.name:"null prototype"}function ly(t){return~-encodeURI(t).split(/%..|./).length}function uy(t){return ly(JSON.stringify(t))}function dy(){const t=new WeakSet;function e(r){return t.has(r)?!0:(t.add(r),!1)}function n(r){t.delete(r)}return[e,n]}function lr(t,e=[]){return[t,e]}function hy(t,e){const[n,r]=t;return[n,[...r,e]]}function pu(t,e){const n=t[1];for(const r of n){const i=r[0].type;if(e(r,i))return!0}return!1}function oa(t){const e=$s(D);return e.encodePolyfill?e.encodePolyfill(t):new TextEncoder().encode(t)}function fy(t){const[e,n]=t;let r=JSON.stringify(e);function i(s){typeof r=="string"?r=typeof s=="string"?r+s:[oa(r),s]:r.push(typeof s=="string"?oa(s):s)}for(const s of n){const[o,a]=s;if(i(`
${JSON.stringify(o)}
`),typeof a=="string"||a instanceof Uint8Array)i(a);else{let c;try{c=JSON.stringify(a)}catch{c=JSON.stringify(rt(a))}i(c)}}return typeof r=="string"?r:py(r)}function py(t){const e=t.reduce((i,s)=>i+s.length,0),n=new Uint8Array(e);let r=0;for(const i of t)n.set(i,r),r+=i.length;return n}function gy(t){const e=typeof t.data=="string"?oa(t.data):t.data;return[{type:"attachment",length:e.length,filename:t.filename,content_type:t.contentType,attachment_type:t.attachmentType},e]}const my={session:"session",sessions:"session",attachment:"attachment",transaction:"transaction",event:"error",client_report:"internal",user_report:"default",profile:"profile",profile_chunk:"profile",replay_event:"replay",replay_recording:"replay",check_in:"monitor",feedback:"feedback",span:"span",raw_security:"security",log:"log_item",metric:"metric",trace_metric:"metric"};function gu(t){return my[t]}function jh(t){if(!t?.sdk)return;const{name:e,version:n}=t.sdk;return{name:e,version:n}}function _y(t,e,n,r){const i=t.sdkProcessingMetadata?.dynamicSamplingContext;return{event_id:t.event_id,sent_at:new Date().toISOString(),...e&&{sdk:e},...!!n&&r&&{dsn:_i(r)},...i&&{trace:i}}}function yy(t,e){if(!e)return t;const n=t.sdk||{};return t.sdk={...n,name:n.name||e.name,version:n.version||e.version,integrations:[...t.sdk?.integrations||[],...e.integrations||[]],packages:[...t.sdk?.packages||[],...e.packages||[]],settings:t.sdk?.settings||e.settings?{...t.sdk?.settings,...e.settings}:void 0},t}function Ey(t,e,n,r){const i=jh(n),s={sent_at:new Date().toISOString(),...i&&{sdk:i},...!!r&&e&&{dsn:_i(e)}},o="aggregates"in t?[{type:"sessions"},t]:[{type:"session"},t.toJSON()];return lr(s,[o])}function vy(t,e,n,r){const i=jh(n),s=t.type&&t.type!=="replay_event"?t.type:"event";yy(t,n?.sdk);const o=_y(t,i,r,e);return delete t.sdkProcessingMetadata,lr(o,[[{type:s},t]])}const ko=0,mu=1,_u=2;function Vs(t){return new Jr(e=>{e(t)})}function hc(t){return new Jr((e,n)=>{n(t)})}class Jr{constructor(e){this._state=ko,this._handlers=[],this._runExecutor(e)}then(e,n){return new Jr((r,i)=>{this._handlers.push([!1,s=>{if(!e)r(s);else try{r(e(s))}catch(o){i(o)}},s=>{if(!n)i(s);else try{r(n(s))}catch(o){i(o)}}]),this._executeHandlers()})}catch(e){return this.then(n=>n,e)}finally(e){return new Jr((n,r)=>{let i,s;return this.then(o=>{s=!1,i=o,e&&e()},o=>{s=!0,i=o,e&&e()}).then(()=>{if(s){r(i);return}n(i)})})}_executeHandlers(){if(this._state===ko)return;const e=this._handlers.slice();this._handlers=[],e.forEach(n=>{n[0]||(this._state===mu&&n[1](this._value),this._state===_u&&n[2](this._value),n[0]=!0)})}_runExecutor(e){const n=(s,o)=>{if(this._state===ko){if(fi(o)){o.then(r,i);return}this._state=s,this._value=o,this._executeHandlers()}},r=s=>{n(mu,s)},i=s=>{n(_u,s)};try{e(r,i)}catch(s){i(s)}}}function wy(t,e,n,r=0){try{const i=aa(e,n,t,r);return fi(i)?i:Vs(i)}catch(i){return hc(i)}}function aa(t,e,n,r){const i=n[r];if(!t||!i)return t;const s=i({...t},e);return C&&s===null&&b.log(`Event processor "${i.id||"?"}" dropped event`),fi(s)?s.then(o=>aa(o,e,n,r+1)):aa(s,e,n,r+1)}function by(t,e){const{fingerprint:n,span:r,breadcrumbs:i,sdkProcessingMetadata:s}=e;Sy(t,e),r&&Iy(t,r),ky(t,n),Cy(t,i),Ty(t,s)}function yu(t,e){const{extra:n,tags:r,user:i,contexts:s,level:o,sdkProcessingMetadata:a,breadcrumbs:c,fingerprint:l,eventProcessors:u,attachments:d,propagationContext:h,transactionName:f,span:p}=e;Li(t,"extra",n),Li(t,"tags",r),Li(t,"user",i),Li(t,"contexts",s),t.sdkProcessingMetadata=gi(t.sdkProcessingMetadata,a,2),o&&(t.level=o),f&&(t.transactionName=f),p&&(t.span=p),c.length&&(t.breadcrumbs=[...t.breadcrumbs,...c]),l.length&&(t.fingerprint=[...t.fingerprint,...l]),u.length&&(t.eventProcessors=[...t.eventProcessors,...u]),d.length&&(t.attachments=[...t.attachments,...d]),t.propagationContext={...t.propagationContext,...h}}function Li(t,e,n){t[e]=gi(t[e],n,1)}function Sy(t,e){const{extra:n,tags:r,user:i,contexts:s,level:o,transactionName:a}=e;Object.keys(n).length&&(t.extra={...n,...t.extra}),Object.keys(r).length&&(t.tags={...r,...t.tags}),Object.keys(i).length&&(t.user={...i,...t.user}),Object.keys(s).length&&(t.contexts={...s,...t.contexts}),o&&(t.level=o),a&&t.type!=="transaction"&&(t.transaction=a)}function Cy(t,e){const n=[...t.breadcrumbs||[],...e];t.breadcrumbs=n.length?n:void 0}function Ty(t,e){t.sdkProcessingMetadata={...t.sdkProcessingMetadata,...e}}function Iy(t,e){t.contexts={trace:Y_(e),...t.contexts},t.sdkProcessingMetadata={dynamicSamplingContext:oy(e),...t.sdkProcessingMetadata};const n=Hh(e),r=uc(n).description;r&&!t.transaction&&t.type==="transaction"&&(t.transaction=r)}function ky(t,e){t.fingerprint=t.fingerprint?Array.isArray(t.fingerprint)?t.fingerprint:[t.fingerprint]:[],e&&(t.fingerprint=t.fingerprint.concat(e)),t.fingerprint.length||delete t.fingerprint}let Kt,Eu,vu,wt;function Ry(t){const e=D._sentryDebugIds,n=D._debugIds;if(!e&&!n)return{};const r=e?Object.keys(e):[],i=n?Object.keys(n):[];if(wt&&r.length===Eu&&i.length===vu)return wt;Eu=r.length,vu=i.length,wt={},Kt||(Kt={});const s=(o,a)=>{for(const c of o){const l=a[c],u=Kt?.[c];if(u&&wt&&l)wt[u[0]]=l,Kt&&(Kt[c]=[u[0],l]);else if(l){const d=t(c);for(let h=d.length-1;h>=0;h--){const p=d[h]?.filename;if(p&&wt&&Kt){wt[p]=l,Kt[c]=[p,l];break}}}}};return e&&s(r,e),n&&s(i,n),wt}function Ay(t,e,n,r,i,s){const{normalizeDepth:o=3,normalizeMaxBreadth:a=1e3}=t,c={...e,event_id:e.event_id||n.event_id||Le(),timestamp:e.timestamp||pi()},l=n.integrations||t.integrations.map(m=>m.name);Py(c,t),Oy(c,l),i&&i.emit("applyFrameMetadata",e),e.type===void 0&&Ny(c,t.stackParser);const u=My(r,n.captureContext);n.mechanism&&Gn(c,n.mechanism);const d=i?i.getEventProcessors():[],h=b_().getScopeData();if(s){const m=s.getScopeData();yu(h,m)}if(u){const m=u.getScopeData();yu(h,m)}const f=[...n.attachments||[],...h.attachments];f.length&&(n.attachments=f),by(c,h);const p=[...d,...h.eventProcessors];return wy(p,c,n).then(m=>(m&&Ly(m),typeof o=="number"&&o>0?Dy(m,o,a):m))}function Py(t,e){const{environment:n,release:r,dist:i,maxValueLength:s}=e;t.environment=t.environment||n||dc,!t.release&&r&&(t.release=r),!t.dist&&i&&(t.dist=i);const o=t.request;o?.url&&(o.url=s?Lh(o.url,s):o.url)}function Ny(t,e){const n=Ry(e);t.exception?.values?.forEach(r=>{r.stacktrace?.frames?.forEach(i=>{i.filename&&(i.debug_id=n[i.filename])})})}function Ly(t){const e={};if(t.exception?.values?.forEach(r=>{r.stacktrace?.frames?.forEach(i=>{i.debug_id&&(i.abs_path?e[i.abs_path]=i.debug_id:i.filename&&(e[i.filename]=i.debug_id),delete i.debug_id)})}),Object.keys(e).length===0)return;t.debug_meta=t.debug_meta||{},t.debug_meta.images=t.debug_meta.images||[];const n=t.debug_meta.images;Object.entries(e).forEach(([r,i])=>{n.push({type:"sourcemap",code_file:r,debug_id:i})})}function Oy(t,e){e.length>0&&(t.sdk=t.sdk||{},t.sdk.integrations=[...t.sdk.integrations||[],...e])}function Dy(t,e,n){if(!t)return null;const r={...t,...t.breadcrumbs&&{breadcrumbs:t.breadcrumbs.map(i=>({...i,...i.data&&{data:rt(i.data,e,n)}}))},...t.user&&{user:rt(t.user,e,n)},...t.contexts&&{contexts:rt(t.contexts,e,n)},...t.extra&&{extra:rt(t.extra,e,n)}};return t.contexts?.trace&&r.contexts&&(r.contexts.trace=t.contexts.trace,t.contexts.trace.data&&(r.contexts.trace.data=rt(t.contexts.trace.data,e,n))),t.spans&&(r.spans=t.spans.map(i=>({...i,...i.data&&{data:rt(i.data,e,n)}}))),t.contexts?.flags&&r.contexts&&(r.contexts.flags=rt(t.contexts.flags,3,n)),r}function My(t,e){if(!e)return t;const n=t?t.clone():new gt;return n.update(e),n}function xy(t,e){return Gt().captureException(t,void 0)}function zh(t,e){return Gt().captureEvent(t,e)}function wu(t){const e=mi(),n=Gt(),{userAgent:r}=D.navigator||{},i=h_({user:n.getUser()||e.getUser(),...r&&{userAgent:r},...t}),s=e.getSession();return s?.status==="ok"&&qn(s,{status:"exited"}),Gh(),e.setSession(i),i}function Gh(){const t=mi(),n=Gt().getSession()||t.getSession();n&&f_(n),qh(),t.setSession()}function qh(){const t=mi(),e=ye(),n=t.getSession();n&&e&&e.captureSession(n)}function bu(t=!1){if(t){Gh();return}qh()}const Fy="7";function Uy(t){const e=t.protocol?`${t.protocol}:`:"",n=t.port?`:${t.port}`:"";return`${e}//${t.host}${n}${t.path?`/${t.path}`:""}/api/`}function $y(t){return`${Uy(t)}${t.projectId}/envelope/`}function By(t,e){const n={sentry_version:Fy};return t.publicKey&&(n.sentry_key=t.publicKey),e&&(n.sentry_client=`${e.name}/${e.version}`),new URLSearchParams(n).toString()}function Hy(t,e,n){return e||`${$y(t)}?${By(t,n)}`}const Su=[];function Wy(t){const e={};return t.forEach(n=>{const{name:r}=n,i=e[r];i&&!i.isDefaultInstance&&n.isDefaultInstance||(e[r]=n)}),Object.values(e)}function Vy(t){const e=t.defaultIntegrations||[],n=t.integrations;e.forEach(i=>{i.isDefaultInstance=!0});let r;if(Array.isArray(n))r=[...e,...n];else if(typeof n=="function"){const i=n(e);r=Array.isArray(i)?i:[i]}else r=e;return Wy(r)}function jy(t,e){const n={};return e.forEach(r=>{r&&Yh(t,r,n)}),n}function Cu(t,e){for(const n of e)n?.afterAllSetup&&n.afterAllSetup(t)}function Yh(t,e,n){if(n[e.name]){C&&b.log(`Integration skipped because it was already installed: ${e.name}`);return}if(n[e.name]=e,!Su.includes(e.name)&&typeof e.setupOnce=="function"&&(e.setupOnce(),Su.push(e.name)),e.setup&&typeof e.setup=="function"&&e.setup(t),typeof e.preprocessEvent=="function"){const r=e.preprocessEvent.bind(e);t.on("preprocessEvent",(i,s)=>r(i,s,t))}if(typeof e.processEvent=="function"){const r=e.processEvent.bind(e),i=Object.assign((s,o)=>r(s,o,t),{id:e.name});t.addEventProcessor(i)}C&&b.log(`Integration installed: ${e.name}`)}function zy(t){return[{type:"log",item_count:t.length,content_type:"application/vnd.sentry.items.log+json"},{items:t}]}function Gy(t,e,n,r){const i={};return e?.sdk&&(i.sdk={name:e.sdk.name,version:e.sdk.version}),n&&r&&(i.dsn=_i(r)),lr(i,[zy(t)])}function Kh(t,e){const n=e??qy(t)??[];if(n.length===0)return;const r=t.getOptions(),i=Gy(n,r._metadata,r.tunnel,t.getDsn());Jh().set(t,[]),t.emit("flushLogs"),t.sendEnvelope(i)}function qy(t){return Jh().get(t)}function Jh(){return or("clientToLogBufferMap",()=>new WeakMap)}function Yy(t){return[{type:"trace_metric",item_count:t.length,content_type:"application/vnd.sentry.items.trace-metric+json"},{items:t}]}function Ky(t,e,n,r){const i={};return e?.sdk&&(i.sdk={name:e.sdk.name,version:e.sdk.version}),n&&r&&(i.dsn=_i(r)),lr(i,[Yy(t)])}function Xh(t,e){const n=e??Jy(t)??[];if(n.length===0)return;const r=t.getOptions(),i=Ky(n,r._metadata,r.tunnel,t.getDsn());Qh().set(t,[]),t.emit("flushMetrics"),t.sendEnvelope(i)}function Jy(t){return Qh().get(t)}function Qh(){return or("clientToMetricBufferMap",()=>new WeakMap)}function Xy(t,e,n){const r=[{type:"client_report"},{timestamp:pi(),discarded_events:t}];return lr(e?{dsn:e}:{},[r])}function Zh(t){const e=[];t.message&&e.push(t.message);try{const n=t.exception.values[t.exception.values.length-1];n?.value&&(e.push(n.value),n.type&&e.push(`${n.type}: ${n.value}`))}catch{}return e}function Qy(t){const{trace_id:e,parent_span_id:n,span_id:r,status:i,origin:s,data:o,op:a}=t.contexts?.trace??{};return{data:o??{},description:t.transaction,op:a,parent_span_id:n,span_id:r??"",start_timestamp:t.start_timestamp??0,status:i,timestamp:t.timestamp,trace_id:e??"",origin:s,profile_id:o?.[xh],exclusive_time:o?.[Fh],measurements:t.measurements,is_segment:!0}}function Zy(t){return{type:"transaction",timestamp:t.timestamp,start_timestamp:t.start_timestamp,transaction:t.description,contexts:{trace:{trace_id:t.trace_id,span_id:t.span_id,parent_span_id:t.parent_span_id,op:t.op,status:t.status,origin:t.origin,data:{...t.data,...t.profile_id&&{[xh]:t.profile_id},...t.exclusive_time&&{[Fh]:t.exclusive_time}}}},measurements:t.measurements}}const Tu="Not capturing exception because it's already been captured.",Iu="Discarded session because of missing or non-string release",ef=Symbol.for("SentryInternalError"),tf=Symbol.for("SentryDoNotSendEventError"),eE=5e3;function Gi(t){return{message:t,[ef]:!0}}function Ro(t){return{message:t,[tf]:!0}}function ku(t){return!!t&&typeof t=="object"&&ef in t}function Ru(t){return!!t&&typeof t=="object"&&tf in t}function Au(t,e,n,r,i){let s=0,o,a=!1;t.on(n,()=>{s=0,clearTimeout(o),a=!1}),t.on(e,c=>{s+=r(c),s>=8e5?i(t):a||(a=!0,o=setTimeout(()=>{i(t)},eE))}),t.on("flush",()=>{i(t)})}class tE{constructor(e){if(this._options=e,this._integrations={},this._numProcessing=0,this._outcomes={},this._hooks={},this._eventProcessors=[],e.dsn?this._dsn=G_(e.dsn):C&&b.warn("No DSN provided, client will not send events."),this._dsn){const r=Hy(this._dsn,e.tunnel,e._metadata?e._metadata.sdk:void 0);this._transport=e.transport({tunnel:this._options.tunnel,recordDroppedEvent:this.recordDroppedEvent.bind(this),...e.transportOptions,url:r})}this._options.enableLogs&&Au(this,"afterCaptureLog","flushLogs",sE,Kh),(this._options.enableMetrics??this._options._experiments?.enableMetrics??!0)&&Au(this,"afterCaptureMetric","flushMetrics",iE,Xh)}captureException(e,n,r){const i=Le();if(tu(e))return C&&b.log(Tu),i;const s={event_id:i,...n};return this._process(this.eventFromException(e,s).then(o=>this._captureEvent(o,s,r))),s.event_id}captureMessage(e,n,r,i){const s={event_id:Le(),...r},o=sc(e)?e:String(e),a=Bs(e)?this.eventFromMessage(o,n,s):this.eventFromException(e,s);return this._process(a.then(c=>this._captureEvent(c,s,i))),s.event_id}captureEvent(e,n,r){const i=Le();if(n?.originalException&&tu(n.originalException))return C&&b.log(Tu),i;const s={event_id:i,...n},o=e.sdkProcessingMetadata||{},a=o.capturedSpanScope,c=o.capturedSpanIsolationScope;return this._process(this._captureEvent(e,s,a||r,c)),s.event_id}captureSession(e){this.sendSession(e),qn(e,{init:!1})}getDsn(){return this._dsn}getOptions(){return this._options}getSdkMetadata(){return this._options._metadata}getTransport(){return this._transport}async flush(e){const n=this._transport;if(!n)return!0;this.emit("flush");const r=await this._isClientDoneProcessing(e),i=await n.flush(e);return r&&i}async close(e){const n=await this.flush(e);return this.getOptions().enabled=!1,this.emit("close"),n}getEventProcessors(){return this._eventProcessors}addEventProcessor(e){this._eventProcessors.push(e)}init(){(this._isEnabled()||this._options.integrations.some(({name:e})=>e.startsWith("Spotlight")))&&this._setupIntegrations()}getIntegrationByName(e){return this._integrations[e]}addIntegration(e){const n=this._integrations[e.name];Yh(this,e,this._integrations),n||Cu(this,[e])}sendEvent(e,n={}){this.emit("beforeSendEvent",e,n);let r=vy(e,this._dsn,this._options._metadata,this._options.tunnel);for(const i of n.attachments||[])r=hy(r,gy(i));this.sendEnvelope(r).then(i=>this.emit("afterSendEvent",e,i))}sendSession(e){const{release:n,environment:r=dc}=this._options;if("aggregates"in e){const s=e.attrs||{};if(!s.release&&!n){C&&b.warn(Iu);return}s.release=s.release||n,s.environment=s.environment||r,e.attrs=s}else{if(!e.release&&!n){C&&b.warn(Iu);return}e.release=e.release||n,e.environment=e.environment||r}this.emit("beforeSendSession",e);const i=Ey(e,this._dsn,this._options._metadata,this._options.tunnel);this.sendEnvelope(i)}recordDroppedEvent(e,n,r=1){if(this._options.sendClientReports){const i=`${e}:${n}`;C&&b.log(`Recording outcome: "${i}"${r>1?` (${r} times)`:""}`),this._outcomes[i]=(this._outcomes[i]||0)+r}}on(e,n){const r=this._hooks[e]=this._hooks[e]||new Set,i=(...s)=>n(...s);return r.add(i),()=>{r.delete(i)}}emit(e,...n){const r=this._hooks[e];r&&r.forEach(i=>i(...n))}async sendEnvelope(e){if(this.emit("beforeEnvelope",e),this._isEnabled()&&this._transport)try{return await this._transport.send(e)}catch(n){return C&&b.error("Error while sending envelope:",n),{}}return C&&b.error("Transport disabled"),{}}_setupIntegrations(){const{integrations:e}=this._options;this._integrations=jy(this,e),Cu(this,e)}_updateSessionFromEvent(e,n){let r=n.level==="fatal",i=!1;const s=n.exception?.values;if(s){i=!0,r=!1;for(const c of s)if(c.mechanism?.handled===!1){r=!0;break}}const o=e.status==="ok";(o&&e.errors===0||o&&r)&&(qn(e,{...r&&{status:"crashed"},errors:e.errors||Number(i||r)}),this.captureSession(e))}async _isClientDoneProcessing(e){let n=0;for(;!e||n<e;){if(await new Promise(r=>setTimeout(r,1)),!this._numProcessing)return!0;n++}return!1}_isEnabled(){return this.getOptions().enabled!==!1&&this._transport!==void 0}_prepareEvent(e,n,r,i){const s=this.getOptions(),o=Object.keys(this._integrations);return!n.integrations&&o?.length&&(n.integrations=o),this.emit("preprocessEvent",e,n),e.type||i.setLastEventId(e.event_id||n.event_id),Ay(s,e,n,r,this,i).then(a=>{if(a===null)return a;this.emit("postprocessEvent",a,n),a.contexts={trace:C_(r),...a.contexts};const c=sy(this,r);return a.sdkProcessingMetadata={dynamicSamplingContext:c,...a.sdkProcessingMetadata},a})}_captureEvent(e,n={},r=Gt(),i=mi()){return C&&ca(e)&&b.log(`Captured error event \`${Zh(e)[0]||"<unknown>"}\``),this._processEvent(e,n,r,i).then(s=>s.event_id,s=>{C&&(Ru(s)?b.log(s.message):ku(s)?b.warn(s.message):b.warn(s))})}_processEvent(e,n,r,i){const s=this.getOptions(),{sampleRate:o}=s,a=nf(e),c=ca(e),l=e.type||"error",u=`before send for type \`${l}\``,d=typeof o>"u"?void 0:q_(o);if(c&&typeof d=="number"&&Math.random()>d)return this.recordDroppedEvent("sample_rate","error"),hc(Ro(`Discarding event because it's not included in the random sample (sampling rate = ${o})`));const h=l==="replay_event"?"replay":l;return this._prepareEvent(e,n,r,i).then(f=>{if(f===null)throw this.recordDroppedEvent("event_processor",h),Ro("An event processor returned `null`, will not send event.");if(n.data&&n.data.__sentry__===!0)return f;const _=rE(this,s,f,n);return nE(_,u)}).then(f=>{if(f===null){if(this.recordDroppedEvent("before_send",h),a){const T=1+(e.spans||[]).length;this.recordDroppedEvent("before_send","span",T)}throw Ro(`${u} returned \`null\`, will not send event.`)}const p=r.getSession()||i.getSession();if(c&&p&&this._updateSessionFromEvent(p,f),a){const m=f.sdkProcessingMetadata?.spanCountBeforeProcessing||0,T=f.spans?f.spans.length:0,V=m-T;V>0&&this.recordDroppedEvent("before_send","span",V)}const _=f.transaction_info;if(a&&_&&f.transaction!==e.transaction){const m="custom";f.transaction_info={..._,source:m}}return this.sendEvent(f,n),f}).then(null,f=>{throw Ru(f)||ku(f)?f:(this.captureException(f,{mechanism:{handled:!1,type:"internal"},data:{__sentry__:!0},originalException:f}),Gi(`Event processing pipeline threw an error, original event will not be sent. Details have been sent as a new event.
Reason: ${f}`))})}_process(e){this._numProcessing++,e.then(n=>(this._numProcessing--,n),n=>(this._numProcessing--,n))}_clearOutcomes(){const e=this._outcomes;return this._outcomes={},Object.entries(e).map(([n,r])=>{const[i,s]=n.split(":");return{reason:i,category:s,quantity:r}})}_flushOutcomes(){C&&b.log("Flushing outcomes...");const e=this._clearOutcomes();if(e.length===0){C&&b.log("No outcomes to send");return}if(!this._dsn){C&&b.log("No dsn provided, will not send outcomes");return}C&&b.log("Sending outcomes:",e);const n=Xy(e,this._options.tunnel&&_i(this._dsn));this.sendEnvelope(n)}}function nE(t,e){const n=`${e} must return \`null\` or a valid event.`;if(fi(t))return t.then(r=>{if(!Kr(r)&&r!==null)throw Gi(n);return r},r=>{throw Gi(`${e} rejected with ${r}`)});if(!Kr(t)&&t!==null)throw Gi(n);return t}function rE(t,e,n,r){const{beforeSend:i,beforeSendTransaction:s,beforeSendSpan:o,ignoreSpans:a}=e;let c=n;if(ca(c)&&i)return i(c,r);if(nf(c)){if(o||a){const l=Qy(c);if(a?.length&&fu(l,a))return null;if(o){const u=o(l);u?c=gi(n,Zy(u)):du()}if(c.spans){const u=[],d=c.spans;for(const f of d){if(a?.length&&fu(f,a)){ny(d,f);continue}if(o){const p=o(f);p?u.push(p):(du(),u.push(f))}else u.push(f)}const h=c.spans.length-u.length;h&&t.recordDroppedEvent("before_send","span",h),c.spans=u}}if(s){if(c.spans){const l=c.spans.length;c.sdkProcessingMetadata={...n.sdkProcessingMetadata,spanCountBeforeProcessing:l}}return s(c,r)}}return c}function ca(t){return t.type===void 0}function nf(t){return t.type==="transaction"}function iE(t){let e=0;return t.name&&(e+=t.name.length*2),e+=8,e+rf(t.attributes)}function sE(t){let e=0;return t.message&&(e+=t.message.length*2),e+rf(t.attributes)}function rf(t){if(!t)return 0;let e=0;return Object.values(t).forEach(n=>{Array.isArray(n)?e+=n.length*Pu(n[0]):Bs(n)?e+=Pu(n):e+=100}),e}function Pu(t){return typeof t=="string"?t.length*2:typeof t=="number"?8:typeof t=="boolean"?4:0}function oE(t,e){e.debug===!0&&(C?b.enable():ar(()=>{console.warn("[Sentry] Cannot initialize SDK with `debug` option using a non-debug bundle.")})),Gt().update(e.initialScope);const r=new t(e);return aE(r),r.init(),r}function aE(t){Gt().setClient(t)}const sf=Symbol.for("SentryBufferFullError");function of(t=100){const e=new Set;function n(){return e.size<t}function r(o){e.delete(o)}function i(o){if(!n())return hc(sf);const a=o();return e.add(a),a.then(()=>r(a),()=>r(a)),a}function s(o){if(!e.size)return Vs(!0);const a=Promise.allSettled(Array.from(e)).then(()=>!0);if(!o)return a;const c=[a,new Promise(l=>setTimeout(()=>l(!1),o))];return Promise.race(c)}return{get $(){return Array.from(e)},add:i,drain:s}}const cE=60*1e3;function lE(t,e=Date.now()){const n=parseInt(`${t}`,10);if(!isNaN(n))return n*1e3;const r=Date.parse(`${t}`);return isNaN(r)?cE:r-e}function uE(t,e){return t[e]||t.all||0}function dE(t,e,n=Date.now()){return uE(t,e)>n}function hE(t,{statusCode:e,headers:n},r=Date.now()){const i={...t},s=n?.["x-sentry-rate-limits"],o=n?.["retry-after"];if(s)for(const a of s.trim().split(",")){const[c,l,,,u]=a.split(":",5),d=parseInt(c,10),h=(isNaN(d)?60:d)*1e3;if(!l)i.all=r+h;else for(const f of l.split(";"))f==="metric_bucket"?(!u||u.split(";").includes("custom"))&&(i[f]=r+h):i[f]=r+h}else o?i.all=r+lE(o,r):e===429&&(i.all=r+60*1e3);return i}const fE=64;function pE(t,e,n=of(t.bufferSize||fE)){let r={};const i=o=>n.drain(o);function s(o){const a=[];if(pu(o,(d,h)=>{const f=gu(h);dE(r,f)?t.recordDroppedEvent("ratelimit_backoff",f):a.push(d)}),a.length===0)return Promise.resolve({});const c=lr(o[0],a),l=d=>{pu(c,(h,f)=>{t.recordDroppedEvent(d,gu(f))})},u=()=>e({body:fy(c)}).then(d=>(d.statusCode!==void 0&&(d.statusCode<200||d.statusCode>=300)&&C&&b.warn(`Sentry responded with status code ${d.statusCode} to sent event.`),r=hE(r,d),d),d=>{throw l("network_error"),C&&b.error("Encountered error running transport request:",d),d});return n.add(u).then(d=>d,d=>{if(d===sf)return C&&b.error("Skipped sending event because buffer is full."),l("queue_overflow"),Promise.resolve({});throw d})}return{send:s,flush:i}}function Ao(t){if(!t)return{};const e=t.match(/^(([^:/?#]+):)?(\/\/([^/?#]*))?([^?#]*)(\?([^#]*))?(#(.*))?$/);if(!e)return{};const n=e[6]||"",r=e[8]||"";return{host:e[4],path:e[5],protocol:e[2],search:n,hash:r,relative:e[5]+n+r}}function gE(t){"aggregates"in t?t.attrs?.ip_address===void 0&&(t.attrs={...t.attrs,ip_address:"{{auto}}"}):t.ipAddress===void 0&&(t.ipAddress="{{auto}}")}function mE(t,e,n=[e],r="npm"){const i=t._metadata||{};i.sdk||(i.sdk={name:`sentry.javascript.${e}`,packages:n.map(s=>({name:`${r}:@sentry/${s}`,version:an})),version:an}),t._metadata=i}const _E=100;function fn(t,e){const n=ye(),r=mi();if(!n)return;const{beforeBreadcrumb:i=null,maxBreadcrumbs:s=_E}=n.getOptions();if(s<=0)return;const a={timestamp:pi(),...t},c=i?ar(()=>i(a,e)):a;c!==null&&(n.emit&&n.emit("beforeAddBreadcrumb",c,e),r.addBreadcrumb(c,s))}let Nu;const yE="FunctionToString",Lu=new WeakMap,EE=(()=>({name:yE,setupOnce(){Nu=Function.prototype.toString;try{Function.prototype.toString=function(...t){const e=cc(this),n=Lu.has(ye())&&e!==void 0?e:this;return Nu.apply(n,t)}}catch{}},setup(t){Lu.set(t,!0)}})),vE=EE,wE=[/^Script error\.?$/,/^Javascript error: Script error\.? on line 0$/,/^ResizeObserver loop completed with undelivered notifications.$/,/^Cannot redefine property: googletag$/,/^Can't find variable: gmo$/,/^undefined is not an object \(evaluating 'a\.[A-Z]'\)$/,`can't redefine non-configurable property "solana"`,"vv().getRestrictions is not a function. (In 'vv().getRestrictions(1,a)', 'vv().getRestrictions' is undefined)","Can't find variable: _AutofillCallbackHandler",/^Non-Error promise rejection captured with value: Object Not Found Matching Id:\d+, MethodName:simulateEvent, ParamCount:\d+$/,/^Java exception was raised during method invocation$/],bE="EventFilters",SE=(t={})=>{let e;return{name:bE,setup(n){const r=n.getOptions();e=Ou(t,r)},processEvent(n,r,i){if(!e){const s=i.getOptions();e=Ou(t,s)}return TE(n,e)?null:n}}},CE=((t={})=>({...SE(t),name:"InboundFilters"}));function Ou(t={},e={}){return{allowUrls:[...t.allowUrls||[],...e.allowUrls||[]],denyUrls:[...t.denyUrls||[],...e.denyUrls||[]],ignoreErrors:[...t.ignoreErrors||[],...e.ignoreErrors||[],...t.disableErrorDefaults?[]:wE],ignoreTransactions:[...t.ignoreTransactions||[],...e.ignoreTransactions||[]]}}function TE(t,e){if(t.type){if(t.type==="transaction"&&kE(t,e.ignoreTransactions))return C&&b.warn(`Event dropped due to being matched by \`ignoreTransactions\` option.
Event: ${tn(t)}`),!0}else{if(IE(t,e.ignoreErrors))return C&&b.warn(`Event dropped due to being matched by \`ignoreErrors\` option.
Event: ${tn(t)}`),!0;if(NE(t))return C&&b.warn(`Event dropped due to not having an error message, error type or stacktrace.
Event: ${tn(t)}`),!0;if(RE(t,e.denyUrls))return C&&b.warn(`Event dropped due to being matched by \`denyUrls\` option.
Event: ${tn(t)}.
Url: ${ss(t)}`),!0;if(!AE(t,e.allowUrls))return C&&b.warn(`Event dropped due to not being matched by \`allowUrls\` option.
Event: ${tn(t)}.
Url: ${ss(t)}`),!0}return!1}function IE(t,e){return e?.length?Zh(t).some(n=>Ws(n,e)):!1}function kE(t,e){if(!e?.length)return!1;const n=t.transaction;return n?Ws(n,e):!1}function RE(t,e){if(!e?.length)return!1;const n=ss(t);return n?Ws(n,e):!1}function AE(t,e){if(!e?.length)return!0;const n=ss(t);return n?Ws(n,e):!0}function PE(t=[]){for(let e=t.length-1;e>=0;e--){const n=t[e];if(n&&n.filename!=="<anonymous>"&&n.filename!=="[native code]")return n.filename||null}return null}function ss(t){try{const n=[...t.exception?.values??[]].reverse().find(r=>r.mechanism?.parent_id===void 0&&r.stacktrace?.frames?.length)?.stacktrace?.frames;return n?PE(n):null}catch{return C&&b.error(`Cannot extract url for event ${tn(t)}`),null}}function NE(t){return t.exception?.values?.length?!t.message&&!t.exception.values.some(e=>e.stacktrace||e.type&&e.type!=="Error"||e.value):!1}function LE(t,e,n,r,i,s){if(!i.exception?.values||!s||!$t(s.originalException,Error))return;const o=i.exception.values.length>0?i.exception.values[i.exception.values.length-1]:void 0;o&&(i.exception.values=la(t,e,r,s.originalException,n,i.exception.values,o,0))}function la(t,e,n,r,i,s,o,a){if(s.length>=n+1)return s;let c=[...s];if($t(r[i],Error)){Du(o,a);const l=t(e,r[i]),u=c.length;Mu(l,i,u,a),c=la(t,e,n,r[i],i,[l,...c],l,u)}return Array.isArray(r.errors)&&r.errors.forEach((l,u)=>{if($t(l,Error)){Du(o,a);const d=t(e,l),h=c.length;Mu(d,`errors[${u}]`,h,a),c=la(t,e,n,l,i,[d,...c],d,h)}}),c}function Du(t,e){t.mechanism={handled:!0,type:"auto.core.linked_errors",...t.mechanism,...t.type==="AggregateError"&&{is_exception_group:!0},exception_id:e}}function Mu(t,e,n,r){t.mechanism={handled:!0,...t.mechanism,type:"chained",source:e,exception_id:n,parent_id:r}}function OE(t){const e="console";Sn(e,t),Cn(e,DE)}function DE(){"console"in D&&Bm.forEach(function(t){t in D.console&&Ie(D.console,t,function(e){return is[t]=e,function(...n){Ve("console",{args:n,level:t}),is[t]?.apply(D.console,n)}})})}function ME(t){return t==="warn"?"warning":["fatal","error","warning","log","info","debug"].includes(t)?t:"log"}const xE="Dedupe",FE=(()=>{let t;return{name:xE,processEvent(e){if(e.type)return e;try{if($E(e,t))return C&&b.warn("Event dropped due to being a duplicate of previously captured event."),null}catch{}return t=e}}}),UE=FE;function $E(t,e){return e?!!(BE(t,e)||HE(t,e)):!1}function BE(t,e){const n=t.message,r=e.message;return!(!n&&!r||n&&!r||!n&&r||n!==r||!cf(t,e)||!af(t,e))}function HE(t,e){const n=xu(e),r=xu(t);return!(!n||!r||n.type!==r.type||n.value!==r.value||!cf(t,e)||!af(t,e))}function af(t,e){let n=Kl(t),r=Kl(e);if(!n&&!r)return!0;if(n&&!r||!n&&r||(n=n,r=r,r.length!==n.length))return!1;for(let i=0;i<r.length;i++){const s=r[i],o=n[i];if(s.filename!==o.filename||s.lineno!==o.lineno||s.colno!==o.colno||s.function!==o.function)return!1}return!0}function cf(t,e){let n=t.fingerprint,r=e.fingerprint;if(!n&&!r)return!0;if(n&&!r||!n&&r)return!1;n=n,r=r;try{return n.join("")===r.join("")}catch{return!1}}function xu(t){return t.exception?.values?.[0]}function lf(t){if(t!==void 0)return t>=400&&t<500?"warning":t>=500?"error":void 0}const Xr=D;function WE(){return"history"in Xr&&!!Xr.history}function VE(){if(!("fetch"in Xr))return!1;try{return new Headers,new Request("data:,"),new Response,!0}catch{return!1}}function ua(t){return t&&/^function\s+\w+\(\)\s+\{\s+\[native code\]\s+\}$/.test(t.toString())}function jE(){if(typeof EdgeRuntime=="string")return!0;if(!VE())return!1;if(ua(Xr.fetch))return!0;let t=!1;const e=Xr.document;if(e&&typeof e.createElement=="function")try{const n=e.createElement("iframe");n.hidden=!0,e.head.appendChild(n),n.contentWindow?.fetch&&(t=ua(n.contentWindow.fetch)),e.head.removeChild(n)}catch(n){C&&b.warn("Could not create sandbox iframe for pure fetch check, bailing to window.fetch: ",n)}return t}function zE(t,e){const n="fetch";Sn(n,t),Cn(n,()=>GE(void 0,e))}function GE(t,e=!1){e&&!jE()||Ie(D,"fetch",function(n){return function(...r){const i=new Error,{method:s,url:o}=qE(r),a={args:r,fetchData:{method:s,url:o},startTimestamp:ht()*1e3,virtualError:i,headers:YE(r)};return Ve("fetch",{...a}),n.apply(D,r).then(async c=>(Ve("fetch",{...a,endTimestamp:ht()*1e3,response:c}),c),c=>{if(Ve("fetch",{...a,endTimestamp:ht()*1e3,error:c}),ic(c)&&c.stack===void 0&&(c.stack=i.stack,hn(c,"framesToPop",1)),c instanceof TypeError&&(c.message==="Failed to fetch"||c.message==="Load failed"||c.message==="NetworkError when attempting to fetch resource."))try{const l=new URL(a.fetchData.url);c.message=`${c.message} (${l.host})`}catch{}throw c})}})}function da(t,e){return!!t&&typeof t=="object"&&!!t[e]}function Fu(t){return typeof t=="string"?t:t?da(t,"url")?t.url:t.toString?t.toString():"":""}function qE(t){if(t.length===0)return{method:"GET",url:""};if(t.length===2){const[n,r]=t;return{url:Fu(n),method:da(r,"method")?String(r.method).toUpperCase():"GET"}}const e=t[0];return{url:Fu(e),method:da(e,"method")?String(e.method).toUpperCase():"GET"}}function YE(t){const[e,n]=t;try{if(typeof n=="object"&&n!==null&&"headers"in n&&n.headers)return new Headers(n.headers);if(r_(e))return new Headers(e.headers)}catch{}}function KE(){return"npm"}const Q=D;let ha=0;function uf(){return ha>0}function JE(){ha++,setTimeout(()=>{ha--})}function Kn(t,e={}){function n(i){return typeof i=="function"}if(!n(t))return t;try{const i=t.__sentry_wrapped__;if(i)return typeof i=="function"?i:t;if(cc(t))return t}catch{return t}const r=function(...i){try{const s=i.map(o=>Kn(o,e));return t.apply(this,s)}catch(s){throw JE(),S_(o=>{o.addEventProcessor(a=>(e.mechanism&&(ra(a,void 0),Gn(a,e.mechanism)),a.extra={...a.extra,arguments:i},a)),xy(s)}),s}};try{for(const i in t)Object.prototype.hasOwnProperty.call(t,i)&&(r[i]=t[i])}catch{}Ph(r,t),hn(t,"__sentry_wrapped__",r);try{Object.getOwnPropertyDescriptor(r,"name").configurable&&Object.defineProperty(r,"name",{get(){return t.name}})}catch{}return r}function XE(){const t=ac(),{referrer:e}=Q.document||{},{userAgent:n}=Q.navigator||{},r={...e&&{Referer:e},...n&&{"User-Agent":n}};return{url:t,headers:r}}function fc(t,e){const n=pc(t,e),r={type:nv(e),value:rv(e)};return n.length&&(r.stacktrace={frames:n}),r.type===void 0&&r.value===""&&(r.value="Unrecoverable error caught"),r}function QE(t,e,n,r){const s=ye()?.getOptions().normalizeDepth,o=cv(e),a={__serialized__:Vh(e,s)};if(o)return{exception:{values:[fc(t,o)]},extra:a};const c={exception:{values:[{type:Hs(e)?e.constructor.name:r?"UnhandledRejection":"Error",value:ov(e,{isUnhandledRejection:r})}]},extra:a};if(n){const l=pc(t,n);l.length&&(c.exception.values[0].stacktrace={frames:l})}return c}function Po(t,e){return{exception:{values:[fc(t,e)]}}}function pc(t,e){const n=e.stacktrace||e.stack||"",r=ev(e),i=tv(e);try{return t(n,r,i)}catch{}return[]}const ZE=/Minified React error #\d+;/i;function ev(t){return t&&ZE.test(t.message)?1:0}function tv(t){return typeof t.framesToPop=="number"?t.framesToPop:0}function df(t){return typeof WebAssembly<"u"&&typeof WebAssembly.Exception<"u"?t instanceof WebAssembly.Exception:!1}function nv(t){const e=t?.name;return!e&&df(t)?t.message&&Array.isArray(t.message)&&t.message.length==2?t.message[0]:"WebAssembly.Exception":e}function rv(t){const e=t?.message;return df(t)?Array.isArray(t.message)&&t.message.length==2?t.message[1]:"wasm exception":e?e.error&&typeof e.error.message=="string"?e.error.message:e:"No error message"}function iv(t,e,n,r){const i=n?.syntheticException||void 0,s=gc(t,e,i,r);return Gn(s),s.level="error",n?.event_id&&(s.event_id=n.event_id),Vs(s)}function sv(t,e,n="info",r,i){const s=r?.syntheticException||void 0,o=fa(t,e,s,i);return o.level=n,r?.event_id&&(o.event_id=r.event_id),Vs(o)}function gc(t,e,n,r,i){let s;if(kh(e)&&e.error)return Po(t,e.error);if(Xl(e)||Zm(e)){const o=e;if("stack"in e)s=Po(t,e);else{const a=o.name||(Xl(o)?"DOMError":"DOMException"),c=o.message?`${a}: ${o.message}`:a;s=fa(t,c,n,r),ra(s,c)}return"code"in o&&(s.tags={...s.tags,"DOMException.code":`${o.code}`}),s}return ic(e)?Po(t,e):Kr(e)||Hs(e)?(s=QE(t,e,n,i),Gn(s,{synthetic:!0}),s):(s=fa(t,e,n,r),ra(s,`${e}`),Gn(s,{synthetic:!0}),s)}function fa(t,e,n,r){const i={};if(r&&n){const s=pc(t,n);s.length&&(i.exception={values:[{value:e,stacktrace:{frames:s}}]}),Gn(i,{synthetic:!0})}if(sc(e)){const{__sentry_template_string__:s,__sentry_template_values__:o}=e;return i.logentry={message:s,params:o},i}return i.message=e,i}function ov(t,{isUnhandledRejection:e}){const n=a_(t),r=e?"promise rejection":"exception";return kh(t)?`Event \`ErrorEvent\` captured as ${r} with message \`${t.message}\``:Hs(t)?`Event \`${av(t)}\` (type=${t.type}) captured as ${r}`:`Object captured as ${r} with keys: ${n}`}function av(t){try{const e=Object.getPrototypeOf(t);return e?e.constructor.name:void 0}catch{}}function cv(t){for(const e in t)if(Object.prototype.hasOwnProperty.call(t,e)){const n=t[e];if(n instanceof Error)return n}}class lv extends tE{constructor(e){const n=uv(e),r=Q.SENTRY_SDK_SOURCE||KE();mE(n,"browser",["browser"],r),n._metadata?.sdk&&(n._metadata.sdk.settings={infer_ip:n.sendDefaultPii?"auto":"never",...n._metadata.sdk.settings}),super(n);const{sendDefaultPii:i,sendClientReports:s,enableLogs:o,_experiments:a,enableMetrics:c}=this._options,l=c??a?.enableMetrics??!0;Q.document&&(s||o||l)&&Q.document.addEventListener("visibilitychange",()=>{Q.document.visibilityState==="hidden"&&(s&&this._flushOutcomes(),o&&Kh(this),l&&Xh(this))}),i&&this.on("beforeSendSession",gE)}eventFromException(e,n){return iv(this._options.stackParser,e,n,this._options.attachStacktrace)}eventFromMessage(e,n="info",r){return sv(this._options.stackParser,e,n,r,this._options.attachStacktrace)}_prepareEvent(e,n,r,i){return e.platform=e.platform||"javascript",super._prepareEvent(e,n,r,i)}}function uv(t){return{release:typeof __SENTRY_RELEASE__=="string"?__SENTRY_RELEASE__:Q.SENTRY_RELEASE?.id,sendClientReports:!0,parentSpanIsAlwaysRootSpan:!0,...t}}const dv=typeof __SENTRY_DEBUG__>"u"||__SENTRY_DEBUG__,pe=D,hv=1e3;let Uu,pa,ga;function fv(t){Sn("dom",t),Cn("dom",pv)}function pv(){if(!pe.document)return;const t=Ve.bind(null,"dom"),e=$u(t,!0);pe.document.addEventListener("click",e,!1),pe.document.addEventListener("keypress",e,!1),["EventTarget","Node"].forEach(n=>{const i=pe[n]?.prototype;i?.hasOwnProperty?.("addEventListener")&&(Ie(i,"addEventListener",function(s){return function(o,a,c){if(o==="click"||o=="keypress")try{const l=this.__sentry_instrumentation_handlers__=this.__sentry_instrumentation_handlers__||{},u=l[o]=l[o]||{refCount:0};if(!u.handler){const d=$u(t);u.handler=d,s.call(this,o,d,c)}u.refCount++}catch{}return s.call(this,o,a,c)}}),Ie(i,"removeEventListener",function(s){return function(o,a,c){if(o==="click"||o=="keypress")try{const l=this.__sentry_instrumentation_handlers__||{},u=l[o];u&&(u.refCount--,u.refCount<=0&&(s.call(this,o,u.handler,c),u.handler=void 0,delete l[o]),Object.keys(l).length===0&&delete this.__sentry_instrumentation_handlers__)}catch{}return s.call(this,o,a,c)}}))})}function gv(t){if(t.type!==pa)return!1;try{if(!t.target||t.target._sentryId!==ga)return!1}catch{}return!0}function mv(t,e){return t!=="keypress"?!1:e?.tagName?!(e.tagName==="INPUT"||e.tagName==="TEXTAREA"||e.isContentEditable):!0}function $u(t,e=!1){return n=>{if(!n||n._sentryCaptured)return;const r=_v(n);if(mv(n.type,r))return;hn(n,"_sentryCaptured",!0),r&&!r._sentryId&&hn(r,"_sentryId",Le());const i=n.type==="keypress"?"input":n.type;gv(n)||(t({event:n,name:i,global:e}),pa=n.type,ga=r?r._sentryId:void 0),clearTimeout(Uu),Uu=pe.setTimeout(()=>{ga=void 0,pa=void 0},hv)}}function _v(t){try{return t.target}catch{return null}}let Oi;function hf(t){const e="history";Sn(e,t),Cn(e,yv)}function yv(){if(pe.addEventListener("popstate",()=>{const e=pe.location.href,n=Oi;if(Oi=e,n===e)return;Ve("history",{from:n,to:e})}),!WE())return;function t(e){return function(...n){const r=n.length>2?n[2]:void 0;if(r){const i=Oi,s=Ev(String(r));if(Oi=s,i===s)return e.apply(this,n);Ve("history",{from:i,to:s})}return e.apply(this,n)}}Ie(pe.history,"pushState",t),Ie(pe.history,"replaceState",t)}function Ev(t){try{return new URL(t,pe.location.origin).toString()}catch{return t}}const qi={};function vv(t){const e=qi[t];if(e)return e;let n=pe[t];if(ua(n))return qi[t]=n.bind(pe);const r=pe.document;if(r&&typeof r.createElement=="function")try{const i=r.createElement("iframe");i.hidden=!0,r.head.appendChild(i);const s=i.contentWindow;s?.[t]&&(n=s[t]),r.head.removeChild(i)}catch(i){dv&&b.warn(`Could not create sandbox iframe for ${t} check, bailing to window.${t}: `,i)}return n&&(qi[t]=n.bind(pe))}function wv(t){qi[t]=void 0}const Lr="__sentry_xhr_v3__";function bv(t){Sn("xhr",t),Cn("xhr",Sv)}function Sv(){if(!pe.XMLHttpRequest)return;const t=XMLHttpRequest.prototype;t.open=new Proxy(t.open,{apply(e,n,r){const i=new Error,s=ht()*1e3,o=dt(r[0])?r[0].toUpperCase():void 0,a=Cv(r[1]);if(!o||!a)return e.apply(n,r);n[Lr]={method:o,url:a,request_headers:{}},o==="POST"&&a.match(/sentry_key/)&&(n.__sentry_own_request__=!0);const c=()=>{const l=n[Lr];if(l&&n.readyState===4){try{l.status_code=n.status}catch{}const u={endTimestamp:ht()*1e3,startTimestamp:s,xhr:n,virtualError:i};Ve("xhr",u)}};return"onreadystatechange"in n&&typeof n.onreadystatechange=="function"?n.onreadystatechange=new Proxy(n.onreadystatechange,{apply(l,u,d){return c(),l.apply(u,d)}}):n.addEventListener("readystatechange",c),n.setRequestHeader=new Proxy(n.setRequestHeader,{apply(l,u,d){const[h,f]=d,p=u[Lr];return p&&dt(h)&&dt(f)&&(p.request_headers[h.toLowerCase()]=f),l.apply(u,d)}}),e.apply(n,r)}}),t.send=new Proxy(t.send,{apply(e,n,r){const i=n[Lr];if(!i)return e.apply(n,r);r[0]!==void 0&&(i.body=r[0]);const s={startTimestamp:ht()*1e3,xhr:n};return Ve("xhr",s),e.apply(n,r)}})}function Cv(t){if(dt(t))return t;try{return t.toString()}catch{}}const Tv=40;function Iv(t,e=vv("fetch")){let n=0,r=0;async function i(s){const o=s.body.length;n+=o,r++;const a={body:s.body,method:"POST",referrerPolicy:"strict-origin",headers:t.headers,keepalive:n<=6e4&&r<15,...t.fetchOptions};try{const c=await e(t.url,a);return{statusCode:c.status,headers:{"x-sentry-rate-limits":c.headers.get("X-Sentry-Rate-Limits"),"retry-after":c.headers.get("Retry-After")}}}catch(c){throw wv("fetch"),c}finally{n-=o,r--}}return pE(t,i,of(t.bufferSize||Tv))}const kv=30,Rv=50;function ma(t,e,n,r){const i={filename:t,function:e==="<anonymous>"?dn:e,in_app:!0};return n!==void 0&&(i.lineno=n),r!==void 0&&(i.colno=r),i}const Av=/^\s*at (\S+?)(?::(\d+))(?::(\d+))\s*$/i,Pv=/^\s*at (?:(.+?\)(?: \[.+\])?|.*?) ?\((?:address at )?)?(?:async )?((?:<anonymous>|[-a-z]+:|.*bundle|\/)?.*?)(?::(\d+))?(?::(\d+))?\)?\s*$/i,Nv=/\((\S*)(?::(\d+))(?::(\d+))\)/,Lv=/at (.+?) ?\(data:(.+?),/,Ov=t=>{const e=t.match(Lv);if(e)return{filename:`<data:${e[2]}>`,function:e[1]};const n=Av.exec(t);if(n){const[,i,s,o]=n;return ma(i,dn,+s,+o)}const r=Pv.exec(t);if(r){if(r[2]&&r[2].indexOf("eval")===0){const a=Nv.exec(r[2]);a&&(r[2]=a[1],r[3]=a[2],r[4]=a[3])}const[s,o]=ff(r[1]||dn,r[2]);return ma(o,s,r[3]?+r[3]:void 0,r[4]?+r[4]:void 0)}},Dv=[kv,Ov],Mv=/^\s*(.*?)(?:\((.*?)\))?(?:^|@)?((?:[-a-z]+)?:\/.*?|\[native code\]|[^@]*(?:bundle|\d+\.js)|\/[\w\-. /=]+)(?::(\d+))?(?::(\d+))?\s*$/i,xv=/(\S+) line (\d+)(?: > eval line \d+)* > eval/i,Fv=t=>{const e=Mv.exec(t);if(e){if(e[3]&&e[3].indexOf(" > eval")>-1){const s=xv.exec(e[3]);s&&(e[1]=e[1]||"eval",e[3]=s[1],e[4]=s[2],e[5]="")}let r=e[3],i=e[1]||dn;return[i,r]=ff(i,r),ma(r,i,e[4]?+e[4]:void 0,e[5]?+e[5]:void 0)}},Uv=[Rv,Fv],$v=[Dv,Uv],Bv=Ch(...$v),ff=(t,e)=>{const n=t.indexOf("safari-extension")!==-1,r=t.indexOf("safari-web-extension")!==-1;return n||r?[t.indexOf("@")!==-1?t.split("@")[0]:dn,n?`safari-extension:${e}`:`safari-web-extension:${e}`]:[t,e]},js=typeof __SENTRY_DEBUG__>"u"||__SENTRY_DEBUG__,Di=1024,Hv="Breadcrumbs",Wv=((t={})=>{const e={console:!0,dom:!0,fetch:!0,history:!0,sentry:!0,xhr:!0,...t};return{name:Hv,setup(n){e.console&&OE(Gv(n)),e.dom&&fv(zv(n,e.dom)),e.xhr&&bv(qv(n)),e.fetch&&zE(Yv(n)),e.history&&hf(Kv(n)),e.sentry&&n.on("beforeSendEvent",jv(n))}}}),Vv=Wv;function jv(t){return function(n){ye()===t&&fn({category:`sentry.${n.type==="transaction"?"transaction":"event"}`,event_id:n.event_id,level:n.level,message:tn(n)},{event:n})}}function zv(t,e){return function(r){if(ye()!==t)return;let i,s,o=typeof e=="object"?e.serializeAttribute:void 0,a=typeof e=="object"&&typeof e.maxStringLength=="number"?e.maxStringLength:void 0;a&&a>Di&&(js&&b.warn(`\`dom.maxStringLength\` cannot exceed ${Di}, but a value of ${a} was configured. Sentry will use ${Di} instead.`),a=Di),typeof o=="string"&&(o=[o]);try{const l=r.event,u=Jv(l)?l.target:l;i=Ah(u,{keyAttrs:o,maxStringLength:a}),s=o_(u)}catch{i="<unknown>"}if(i.length===0)return;const c={category:`ui.${r.name}`,message:i};s&&(c.data={"ui.component_name":s}),fn(c,{event:r.event,name:r.name,global:r.global})}}function Gv(t){return function(n){if(ye()!==t)return;const r={category:"console",data:{arguments:n.args,logger:"console"},level:ME(n.level),message:eu(n.args," ")};if(n.level==="assert")if(n.args[0]===!1)r.message=`Assertion failed: ${eu(n.args.slice(1)," ")||"console.assert"}`,r.data.arguments=n.args.slice(1);else return;fn(r,{input:n.args,level:n.level})}}function qv(t){return function(n){if(ye()!==t)return;const{startTimestamp:r,endTimestamp:i}=n,s=n.xhr[Lr];if(!r||!i||!s)return;const{method:o,url:a,status_code:c,body:l}=s,u={method:o,url:a,status_code:c},d={xhr:n.xhr,input:l,startTimestamp:r,endTimestamp:i},h={category:"xhr",data:u,type:"http",level:lf(c)};t.emit("beforeOutgoingRequestBreadcrumb",h,d),fn(h,d)}}function Yv(t){return function(n){if(ye()!==t)return;const{startTimestamp:r,endTimestamp:i}=n;if(i&&!(n.fetchData.url.match(/sentry_key/)&&n.fetchData.method==="POST"))if(n.fetchData.method,n.fetchData.url,n.error){const s=n.fetchData,o={data:n.error,input:n.args,startTimestamp:r,endTimestamp:i},a={category:"fetch",data:s,level:"error",type:"http"};t.emit("beforeOutgoingRequestBreadcrumb",a,o),fn(a,o)}else{const s=n.response,o={...n.fetchData,status_code:s?.status};n.fetchData.request_body_size,n.fetchData.response_body_size,s?.status;const a={input:n.args,response:s,startTimestamp:r,endTimestamp:i},c={category:"fetch",data:o,type:"http",level:lf(o.status_code)};t.emit("beforeOutgoingRequestBreadcrumb",c,a),fn(c,a)}}}function Kv(t){return function(n){if(ye()!==t)return;let r=n.from,i=n.to;const s=Ao(Q.location.href);let o=r?Ao(r):void 0;const a=Ao(i);o?.path||(o=s),s.protocol===a.protocol&&s.host===a.host&&(i=a.relative),s.protocol===o.protocol&&s.host===o.host&&(r=o.relative),fn({category:"navigation",data:{from:r,to:i}})}}function Jv(t){return!!t&&!!t.target}const Xv=["EventTarget","Window","Node","ApplicationCache","AudioTrackList","BroadcastChannel","ChannelMergerNode","CryptoOperation","EventSource","FileReader","HTMLUnknownElement","IDBDatabase","IDBRequest","IDBTransaction","KeyOperation","MediaController","MessagePort","ModalWindow","Notification","SVGElementInstance","Screen","SharedWorker","TextTrack","TextTrackCue","TextTrackList","WebSocket","WebSocketWorker","Worker","XMLHttpRequest","XMLHttpRequestEventTarget","XMLHttpRequestUpload"],Qv="BrowserApiErrors",Zv=((t={})=>{const e={XMLHttpRequest:!0,eventTarget:!0,requestAnimationFrame:!0,setInterval:!0,setTimeout:!0,unregisterOriginalCallbacks:!1,...t};return{name:Qv,setupOnce(){e.setTimeout&&Ie(Q,"setTimeout",Bu),e.setInterval&&Ie(Q,"setInterval",Bu),e.requestAnimationFrame&&Ie(Q,"requestAnimationFrame",tw),e.XMLHttpRequest&&"XMLHttpRequest"in Q&&Ie(XMLHttpRequest.prototype,"send",nw);const n=e.eventTarget;n&&(Array.isArray(n)?n:Xv).forEach(i=>rw(i,e))}}}),ew=Zv;function Bu(t){return function(...e){const n=e[0];return e[0]=Kn(n,{mechanism:{handled:!1,type:`auto.browser.browserapierrors.${Ut(t)}`}}),t.apply(this,e)}}function tw(t){return function(e){return t.apply(this,[Kn(e,{mechanism:{data:{handler:Ut(t)},handled:!1,type:"auto.browser.browserapierrors.requestAnimationFrame"}})])}}function nw(t){return function(...e){const n=this;return["onload","onerror","onprogress","onreadystatechange"].forEach(i=>{i in n&&typeof n[i]=="function"&&Ie(n,i,function(s){const o={mechanism:{data:{handler:Ut(s)},handled:!1,type:`auto.browser.browserapierrors.xhr.${i}`}},a=cc(s);return a&&(o.mechanism.data.handler=Ut(a)),Kn(s,o)})}),t.apply(this,e)}}function rw(t,e){const r=Q[t]?.prototype;r?.hasOwnProperty?.("addEventListener")&&(Ie(r,"addEventListener",function(i){return function(s,o,a){try{iw(o)&&(o.handleEvent=Kn(o.handleEvent,{mechanism:{data:{handler:Ut(o),target:t},handled:!1,type:"auto.browser.browserapierrors.handleEvent"}}))}catch{}return e.unregisterOriginalCallbacks&&sw(this,s,o),i.apply(this,[s,Kn(o,{mechanism:{data:{handler:Ut(o),target:t},handled:!1,type:"auto.browser.browserapierrors.addEventListener"}}),a])}}),Ie(r,"removeEventListener",function(i){return function(s,o,a){try{const c=o.__sentry_wrapped__;c&&i.call(this,s,c,a)}catch{}return i.call(this,s,o,a)}}))}function iw(t){return typeof t.handleEvent=="function"}function sw(t,e,n){t&&typeof t=="object"&&"removeEventListener"in t&&typeof t.removeEventListener=="function"&&t.removeEventListener(e,n)}const ow=()=>({name:"BrowserSession",setupOnce(){if(typeof Q.document>"u"){js&&b.warn("Using the `browserSessionIntegration` in non-browser environments is not supported.");return}wu({ignoreDuration:!0}),bu(),hf(({from:t,to:e})=>{t!==void 0&&t!==e&&(wu({ignoreDuration:!0}),bu())})}}),aw="GlobalHandlers",cw=((t={})=>{const e={onerror:!0,onunhandledrejection:!0,...t};return{name:aw,setupOnce(){Error.stackTraceLimit=50},setup(n){e.onerror&&(uw(n),Hu("onerror")),e.onunhandledrejection&&(dw(n),Hu("onunhandledrejection"))}}}),lw=cw;function uw(t){Km(e=>{const{stackParser:n,attachStacktrace:r}=pf();if(ye()!==t||uf())return;const{msg:i,url:s,line:o,column:a,error:c}=e,l=pw(gc(n,c||i,void 0,r,!1),s,o,a);l.level="error",zh(l,{originalException:c,mechanism:{handled:!1,type:"auto.browser.global_handlers.onerror"}})})}function dw(t){Xm(e=>{const{stackParser:n,attachStacktrace:r}=pf();if(ye()!==t||uf())return;const i=hw(e),s=Bs(i)?fw(i):gc(n,i,void 0,r,!0);s.level="error",zh(s,{originalException:i,mechanism:{handled:!1,type:"auto.browser.global_handlers.onunhandledrejection"}})})}function hw(t){if(Bs(t))return t;try{if("reason"in t)return t.reason;if("detail"in t&&"reason"in t.detail)return t.detail.reason}catch{}return t}function fw(t){return{exception:{values:[{type:"UnhandledRejection",value:`Non-Error promise rejection captured with value: ${String(t)}`}]}}}function pw(t,e,n,r){const i=t.exception=t.exception||{},s=i.values=i.values||[],o=s[0]=s[0]||{},a=o.stacktrace=o.stacktrace||{},c=a.frames=a.frames||[],l=r,u=n,d=gw(e)??ac();return c.length===0&&c.push({colno:l,filename:d,function:dn,in_app:!0,lineno:u}),t}function Hu(t){js&&b.log(`Global Handler attached: ${t}`)}function pf(){return ye()?.getOptions()||{stackParser:()=>[],attachStacktrace:!1}}function gw(t){if(!(!dt(t)||t.length===0)){if(t.startsWith("data:")){const e=t.match(/^data:([^;]+)/),n=e?e[1]:"text/javascript",r=t.includes("base64,");return`<data:${n}${r?",base64":""}>`}return t}}const mw=()=>({name:"HttpContext",preprocessEvent(t){if(!Q.navigator&&!Q.location&&!Q.document)return;const e=XE(),n={...e.headers,...t.request?.headers};t.request={...e,...t.request,headers:n}}}),_w="cause",yw=5,Ew="LinkedErrors",vw=((t={})=>{const e=t.limit||yw,n=t.key||_w;return{name:Ew,preprocessEvent(r,i,s){const o=s.getOptions();LE(fc,o.stackParser,n,e,r,i)}}}),ww=vw;function bw(){return Sw()?(js&&ar(()=>{console.error("[Sentry] You cannot use Sentry.init() in a browser extension, see: https://docs.sentry.io/platforms/javascript/best-practices/browser-extensions/")}),!0):!1}function Sw(){if(typeof Q.window>"u")return!1;const t=Q;if(t.nw||!(t.chrome||t.browser)?.runtime?.id)return!1;const n=ac(),r=["chrome-extension","moz-extension","ms-browser-extension","safari-web-extension"];return!(Q===Q.top&&r.some(s=>n.startsWith(`${s}://`)))}function Cw(t){return[CE(),vE(),ew(),Vv(),lw(),ww(),UE(),mw(),ow()]}function Tw(t={}){const e=!t.skipBrowserExtensionCheck&&bw();let n=t.defaultIntegrations==null?Cw():t.defaultIntegrations;const r={...t,enabled:e?!1:t.enabled,stackParser:qm(t.stackParser||Bv),integrations:Vy({integrations:t.integrations,defaultIntegrations:n}),transport:t.transport||Iv};return oE(lv,r)}const Iw="https://adc1b5518c6a55273a1398d1b8b9cd3e@o4510415124496384.ingest.de.sentry.io/4510415129083984";Tw({dsn:Iw,sendDefaultPii:!0});/**
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
 */const kw=()=>{};var Wu={};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const gf={NODE_ADMIN:!1,SDK_VERSION:"${JSCORE_VERSION}"};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const g=function(t,e){if(!t)throw ur(e)},ur=function(t){return new Error("Firebase Database ("+gf.SDK_VERSION+") INTERNAL ASSERT FAILED: "+t)};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const mf=function(t){const e=[];let n=0;for(let r=0;r<t.length;r++){let i=t.charCodeAt(r);i<128?e[n++]=i:i<2048?(e[n++]=i>>6|192,e[n++]=i&63|128):(i&64512)===55296&&r+1<t.length&&(t.charCodeAt(r+1)&64512)===56320?(i=65536+((i&1023)<<10)+(t.charCodeAt(++r)&1023),e[n++]=i>>18|240,e[n++]=i>>12&63|128,e[n++]=i>>6&63|128,e[n++]=i&63|128):(e[n++]=i>>12|224,e[n++]=i>>6&63|128,e[n++]=i&63|128)}return e},Rw=function(t){const e=[];let n=0,r=0;for(;n<t.length;){const i=t[n++];if(i<128)e[r++]=String.fromCharCode(i);else if(i>191&&i<224){const s=t[n++];e[r++]=String.fromCharCode((i&31)<<6|s&63)}else if(i>239&&i<365){const s=t[n++],o=t[n++],a=t[n++],c=((i&7)<<18|(s&63)<<12|(o&63)<<6|a&63)-65536;e[r++]=String.fromCharCode(55296+(c>>10)),e[r++]=String.fromCharCode(56320+(c&1023))}else{const s=t[n++],o=t[n++];e[r++]=String.fromCharCode((i&15)<<12|(s&63)<<6|o&63)}}return e.join("")},zs={byteToCharMap_:null,charToByteMap_:null,byteToCharMapWebSafe_:null,charToByteMapWebSafe_:null,ENCODED_VALS_BASE:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",get ENCODED_VALS(){return this.ENCODED_VALS_BASE+"+/="},get ENCODED_VALS_WEBSAFE(){return this.ENCODED_VALS_BASE+"-_."},HAS_NATIVE_SUPPORT:typeof atob=="function",encodeByteArray(t,e){if(!Array.isArray(t))throw Error("encodeByteArray takes an array as a parameter");this.init_();const n=e?this.byteToCharMapWebSafe_:this.byteToCharMap_,r=[];for(let i=0;i<t.length;i+=3){const s=t[i],o=i+1<t.length,a=o?t[i+1]:0,c=i+2<t.length,l=c?t[i+2]:0,u=s>>2,d=(s&3)<<4|a>>4;let h=(a&15)<<2|l>>6,f=l&63;c||(f=64,o||(h=64)),r.push(n[u],n[d],n[h],n[f])}return r.join("")},encodeString(t,e){return this.HAS_NATIVE_SUPPORT&&!e?btoa(t):this.encodeByteArray(mf(t),e)},decodeString(t,e){return this.HAS_NATIVE_SUPPORT&&!e?atob(t):Rw(this.decodeStringToByteArray(t,e))},decodeStringToByteArray(t,e){this.init_();const n=e?this.charToByteMapWebSafe_:this.charToByteMap_,r=[];for(let i=0;i<t.length;){const s=n[t.charAt(i++)],a=i<t.length?n[t.charAt(i)]:0;++i;const l=i<t.length?n[t.charAt(i)]:64;++i;const d=i<t.length?n[t.charAt(i)]:64;if(++i,s==null||a==null||l==null||d==null)throw new Aw;const h=s<<2|a>>4;if(r.push(h),l!==64){const f=a<<4&240|l>>2;if(r.push(f),d!==64){const p=l<<6&192|d;r.push(p)}}}return r},init_(){if(!this.byteToCharMap_){this.byteToCharMap_={},this.charToByteMap_={},this.byteToCharMapWebSafe_={},this.charToByteMapWebSafe_={};for(let t=0;t<this.ENCODED_VALS.length;t++)this.byteToCharMap_[t]=this.ENCODED_VALS.charAt(t),this.charToByteMap_[this.byteToCharMap_[t]]=t,this.byteToCharMapWebSafe_[t]=this.ENCODED_VALS_WEBSAFE.charAt(t),this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[t]]=t,t>=this.ENCODED_VALS_BASE.length&&(this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(t)]=t,this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(t)]=t)}}};class Aw extends Error{constructor(){super(...arguments),this.name="DecodeBase64StringError"}}const _f=function(t){const e=mf(t);return zs.encodeByteArray(e,!0)},os=function(t){return _f(t).replace(/\./g,"")},as=function(t){try{return zs.decodeString(t,!0)}catch(e){console.error("base64Decode failed: ",e)}return null};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Pw(t){return yf(void 0,t)}function yf(t,e){if(!(e instanceof Object))return e;switch(e.constructor){case Date:const n=e;return new Date(n.getTime());case Object:t===void 0&&(t={});break;case Array:t=[];break;default:return e}for(const n in e)!e.hasOwnProperty(n)||!Nw(n)||(t[n]=yf(t[n],e[n]));return t}function Nw(t){return t!=="__proto__"}/**
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
 */function Ef(){if(typeof self<"u")return self;if(typeof window<"u")return window;if(typeof global<"u")return global;throw new Error("Unable to locate global object.")}/**
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
 */const Lw=()=>Ef().__FIREBASE_DEFAULTS__,Ow=()=>{if(typeof process>"u"||typeof Wu>"u")return;const t=Wu.__FIREBASE_DEFAULTS__;if(t)return JSON.parse(t)},Dw=()=>{if(typeof document>"u")return;let t;try{t=document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/)}catch{return}const e=t&&as(t[1]);return e&&JSON.parse(e)},mc=()=>{try{return kw()||Lw()||Ow()||Dw()}catch(t){console.info(`Unable to get __FIREBASE_DEFAULTS__ due to: ${t}`);return}},vf=t=>mc()?.emulatorHosts?.[t],Mw=t=>{const e=vf(t);if(!e)return;const n=e.lastIndexOf(":");if(n<=0||n+1===e.length)throw new Error(`Invalid host ${e} with no separate hostname and port!`);const r=parseInt(e.substring(n+1),10);return e[0]==="["?[e.substring(1,n-1),r]:[e.substring(0,n),r]},wf=()=>mc()?.config,bf=t=>mc()?.[`_${t}`];/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ve{constructor(){this.reject=()=>{},this.resolve=()=>{},this.promise=new Promise((e,n)=>{this.resolve=e,this.reject=n})}wrapCallback(e){return(n,r)=>{n?this.reject(n):this.resolve(r),typeof e=="function"&&(this.promise.catch(()=>{}),e.length===1?e(n):e(n,r))}}}/**
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
 */function dr(t){try{return(t.startsWith("http://")||t.startsWith("https://")?new URL(t).hostname:t).endsWith(".cloudworkstations.dev")}catch{return!1}}async function Sf(t){return(await fetch(t,{credentials:"include"})).ok}/**
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
 */function xw(t,e){if(t.uid)throw new Error('The "uid" field is no longer supported by mockUserToken. Please use "sub" instead for Firebase Auth User ID.');const n={alg:"none",type:"JWT"},r=e||"demo-project",i=t.iat||0,s=t.sub||t.user_id;if(!s)throw new Error("mockUserToken must contain 'sub' or 'user_id' field!");const o={iss:`https://securetoken.google.com/${r}`,aud:r,iat:i,exp:i+3600,auth_time:i,sub:s,user_id:s,firebase:{sign_in_provider:"custom",identities:{}},...t};return[os(JSON.stringify(n)),os(JSON.stringify(o)),""].join(".")}const Mr={};function Fw(){const t={prod:[],emulator:[]};for(const e of Object.keys(Mr))Mr[e]?t.emulator.push(e):t.prod.push(e);return t}function Uw(t){let e=document.getElementById(t),n=!1;return e||(e=document.createElement("div"),e.setAttribute("id",t),n=!0),{created:n,element:e}}let Vu=!1;function Cf(t,e){if(typeof window>"u"||typeof document>"u"||!dr(window.location.host)||Mr[t]===e||Mr[t]||Vu)return;Mr[t]=e;function n(h){return`__firebase__banner__${h}`}const r="__firebase__banner",s=Fw().prod.length>0;function o(){const h=document.getElementById(r);h&&h.remove()}function a(h){h.style.display="flex",h.style.background="#7faaf0",h.style.position="fixed",h.style.bottom="5px",h.style.left="5px",h.style.padding=".5em",h.style.borderRadius="5px",h.style.alignItems="center"}function c(h,f){h.setAttribute("width","24"),h.setAttribute("id",f),h.setAttribute("height","24"),h.setAttribute("viewBox","0 0 24 24"),h.setAttribute("fill","none"),h.style.marginLeft="-6px"}function l(){const h=document.createElement("span");return h.style.cursor="pointer",h.style.marginLeft="16px",h.style.fontSize="24px",h.innerHTML=" &times;",h.onclick=()=>{Vu=!0,o()},h}function u(h,f){h.setAttribute("id",f),h.innerText="Learn more",h.href="https://firebase.google.com/docs/studio/preview-apps#preview-backend",h.setAttribute("target","__blank"),h.style.paddingLeft="5px",h.style.textDecoration="underline"}function d(){const h=Uw(r),f=n("text"),p=document.getElementById(f)||document.createElement("span"),_=n("learnmore"),m=document.getElementById(_)||document.createElement("a"),T=n("preprendIcon"),V=document.getElementById(T)||document.createElementNS("http://www.w3.org/2000/svg","svg");if(h.created){const $=h.element;a($),u(m,_);const w=l();c(V,T),$.append(V,p,m,w),document.body.appendChild($)}s?(p.innerText="Preview backend disconnected.",V.innerHTML=`<g clip-path="url(#clip0_6013_33858)">
<path d="M4.8 17.6L12 5.6L19.2 17.6H4.8ZM6.91667 16.4H17.0833L12 7.93333L6.91667 16.4ZM12 15.6C12.1667 15.6 12.3056 15.5444 12.4167 15.4333C12.5389 15.3111 12.6 15.1667 12.6 15C12.6 14.8333 12.5389 14.6944 12.4167 14.5833C12.3056 14.4611 12.1667 14.4 12 14.4C11.8333 14.4 11.6889 14.4611 11.5667 14.5833C11.4556 14.6944 11.4 14.8333 11.4 15C11.4 15.1667 11.4556 15.3111 11.5667 15.4333C11.6889 15.5444 11.8333 15.6 12 15.6ZM11.4 13.6H12.6V10.4H11.4V13.6Z" fill="#212121"/>
</g>
<defs>
<clipPath id="clip0_6013_33858">
<rect width="24" height="24" fill="white"/>
</clipPath>
</defs>`):(V.innerHTML=`<g clip-path="url(#clip0_6083_34804)">
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
 */function _e(){return typeof navigator<"u"&&typeof navigator.userAgent=="string"?navigator.userAgent:""}function _c(){return typeof window<"u"&&!!(window.cordova||window.phonegap||window.PhoneGap)&&/ios|iphone|ipod|ipad|android|blackberry|iemobile/i.test(_e())}function $w(){return typeof navigator<"u"&&navigator.userAgent==="Cloudflare-Workers"}function Bw(){const t=typeof chrome=="object"?chrome.runtime:typeof browser=="object"?browser.runtime:void 0;return typeof t=="object"&&t.id!==void 0}function Tf(){return typeof navigator=="object"&&navigator.product==="ReactNative"}function Hw(){const t=_e();return t.indexOf("MSIE ")>=0||t.indexOf("Trident/")>=0}function Ww(){return gf.NODE_ADMIN===!0}function yc(){try{return typeof indexedDB=="object"}catch{return!1}}function Vw(){return new Promise((t,e)=>{try{let n=!0;const r="validate-browser-context-for-indexeddb-analytics-module",i=self.indexedDB.open(r);i.onsuccess=()=>{i.result.close(),n||self.indexedDB.deleteDatabase(r),t(!0)},i.onupgradeneeded=()=>{n=!1},i.onerror=()=>{e(i.error?.message||"")}}catch(n){e(n)}})}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const jw="FirebaseError";class qt extends Error{constructor(e,n,r){super(n),this.code=e,this.customData=r,this.name=jw,Object.setPrototypeOf(this,qt.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,hr.prototype.create)}}class hr{constructor(e,n,r){this.service=e,this.serviceName=n,this.errors=r}create(e,...n){const r=n[0]||{},i=`${this.service}/${e}`,s=this.errors[e],o=s?zw(s,r):"Error",a=`${this.serviceName}: ${o} (${i}).`;return new qt(i,a,r)}}function zw(t,e){return t.replace(Gw,(n,r)=>{const i=e[r];return i!=null?String(i):`<${r}?>`})}const Gw=/\{\$([^}]+)}/g;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Qr(t){return JSON.parse(t)}function ne(t){return JSON.stringify(t)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const If=function(t){let e={},n={},r={},i="";try{const s=t.split(".");e=Qr(as(s[0])||""),n=Qr(as(s[1])||""),i=s[2],r=n.d||{},delete n.d}catch{}return{header:e,claims:n,data:r,signature:i}},qw=function(t){const e=If(t),n=e.claims;return!!n&&typeof n=="object"&&n.hasOwnProperty("iat")},Yw=function(t){const e=If(t).claims;return typeof e=="object"&&e.admin===!0};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function nt(t,e){return Object.prototype.hasOwnProperty.call(t,e)}function Jn(t,e){if(Object.prototype.hasOwnProperty.call(t,e))return t[e]}function cs(t){for(const e in t)if(Object.prototype.hasOwnProperty.call(t,e))return!1;return!0}function ls(t,e,n){const r={};for(const i in t)Object.prototype.hasOwnProperty.call(t,i)&&(r[i]=e.call(n,t[i],i,t));return r}function pn(t,e){if(t===e)return!0;const n=Object.keys(t),r=Object.keys(e);for(const i of n){if(!r.includes(i))return!1;const s=t[i],o=e[i];if(ju(s)&&ju(o)){if(!pn(s,o))return!1}else if(s!==o)return!1}for(const i of r)if(!n.includes(i))return!1;return!0}function ju(t){return t!==null&&typeof t=="object"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function fr(t){const e=[];for(const[n,r]of Object.entries(t))Array.isArray(r)?r.forEach(i=>{e.push(encodeURIComponent(n)+"="+encodeURIComponent(i))}):e.push(encodeURIComponent(n)+"="+encodeURIComponent(r));return e.length?"&"+e.join("&"):""}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Kw{constructor(){this.chain_=[],this.buf_=[],this.W_=[],this.pad_=[],this.inbuf_=0,this.total_=0,this.blockSize=512/8,this.pad_[0]=128;for(let e=1;e<this.blockSize;++e)this.pad_[e]=0;this.reset()}reset(){this.chain_[0]=1732584193,this.chain_[1]=4023233417,this.chain_[2]=2562383102,this.chain_[3]=271733878,this.chain_[4]=3285377520,this.inbuf_=0,this.total_=0}compress_(e,n){n||(n=0);const r=this.W_;if(typeof e=="string")for(let d=0;d<16;d++)r[d]=e.charCodeAt(n)<<24|e.charCodeAt(n+1)<<16|e.charCodeAt(n+2)<<8|e.charCodeAt(n+3),n+=4;else for(let d=0;d<16;d++)r[d]=e[n]<<24|e[n+1]<<16|e[n+2]<<8|e[n+3],n+=4;for(let d=16;d<80;d++){const h=r[d-3]^r[d-8]^r[d-14]^r[d-16];r[d]=(h<<1|h>>>31)&4294967295}let i=this.chain_[0],s=this.chain_[1],o=this.chain_[2],a=this.chain_[3],c=this.chain_[4],l,u;for(let d=0;d<80;d++){d<40?d<20?(l=a^s&(o^a),u=1518500249):(l=s^o^a,u=1859775393):d<60?(l=s&o|a&(s|o),u=2400959708):(l=s^o^a,u=3395469782);const h=(i<<5|i>>>27)+l+c+u+r[d]&4294967295;c=a,a=o,o=(s<<30|s>>>2)&4294967295,s=i,i=h}this.chain_[0]=this.chain_[0]+i&4294967295,this.chain_[1]=this.chain_[1]+s&4294967295,this.chain_[2]=this.chain_[2]+o&4294967295,this.chain_[3]=this.chain_[3]+a&4294967295,this.chain_[4]=this.chain_[4]+c&4294967295}update(e,n){if(e==null)return;n===void 0&&(n=e.length);const r=n-this.blockSize;let i=0;const s=this.buf_;let o=this.inbuf_;for(;i<n;){if(o===0)for(;i<=r;)this.compress_(e,i),i+=this.blockSize;if(typeof e=="string"){for(;i<n;)if(s[o]=e.charCodeAt(i),++o,++i,o===this.blockSize){this.compress_(s),o=0;break}}else for(;i<n;)if(s[o]=e[i],++o,++i,o===this.blockSize){this.compress_(s),o=0;break}}this.inbuf_=o,this.total_+=n}digest(){const e=[];let n=this.total_*8;this.inbuf_<56?this.update(this.pad_,56-this.inbuf_):this.update(this.pad_,this.blockSize-(this.inbuf_-56));for(let i=this.blockSize-1;i>=56;i--)this.buf_[i]=n&255,n/=256;this.compress_(this.buf_);let r=0;for(let i=0;i<5;i++)for(let s=24;s>=0;s-=8)e[r]=this.chain_[i]>>s&255,++r;return e}}function Jw(t,e){const n=new Xw(t,e);return n.subscribe.bind(n)}class Xw{constructor(e,n){this.observers=[],this.unsubscribes=[],this.observerCount=0,this.task=Promise.resolve(),this.finalized=!1,this.onNoObservers=n,this.task.then(()=>{e(this)}).catch(r=>{this.error(r)})}next(e){this.forEachObserver(n=>{n.next(e)})}error(e){this.forEachObserver(n=>{n.error(e)}),this.close(e)}complete(){this.forEachObserver(e=>{e.complete()}),this.close()}subscribe(e,n,r){let i;if(e===void 0&&n===void 0&&r===void 0)throw new Error("Missing Observer.");Qw(e,["next","error","complete"])?i=e:i={next:e,error:n,complete:r},i.next===void 0&&(i.next=No),i.error===void 0&&(i.error=No),i.complete===void 0&&(i.complete=No);const s=this.unsubscribeOne.bind(this,this.observers.length);return this.finalized&&this.task.then(()=>{try{this.finalError?i.error(this.finalError):i.complete()}catch{}}),this.observers.push(i),s}unsubscribeOne(e){this.observers===void 0||this.observers[e]===void 0||(delete this.observers[e],this.observerCount-=1,this.observerCount===0&&this.onNoObservers!==void 0&&this.onNoObservers(this))}forEachObserver(e){if(!this.finalized)for(let n=0;n<this.observers.length;n++)this.sendOne(n,e)}sendOne(e,n){this.task.then(()=>{if(this.observers!==void 0&&this.observers[e]!==void 0)try{n(this.observers[e])}catch(r){typeof console<"u"&&console.error&&console.error(r)}})}close(e){this.finalized||(this.finalized=!0,e!==void 0&&(this.finalError=e),this.task.then(()=>{this.observers=void 0,this.onNoObservers=void 0}))}}function Qw(t,e){if(typeof t!="object"||t===null)return!1;for(const n of e)if(n in t&&typeof t[n]=="function")return!0;return!1}function No(){}function Xn(t,e){return`${t} failed: ${e} argument `}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Zw=function(t){const e=[];let n=0;for(let r=0;r<t.length;r++){let i=t.charCodeAt(r);if(i>=55296&&i<=56319){const s=i-55296;r++,g(r<t.length,"Surrogate pair missing trail surrogate.");const o=t.charCodeAt(r)-56320;i=65536+(s<<10)+o}i<128?e[n++]=i:i<2048?(e[n++]=i>>6|192,e[n++]=i&63|128):i<65536?(e[n++]=i>>12|224,e[n++]=i>>6&63|128,e[n++]=i&63|128):(e[n++]=i>>18|240,e[n++]=i>>12&63|128,e[n++]=i>>6&63|128,e[n++]=i&63|128)}return e},Gs=function(t){let e=0;for(let n=0;n<t.length;n++){const r=t.charCodeAt(n);r<128?e++:r<2048?e+=2:r>=55296&&r<=56319?(e+=4,n++):e+=3}return e};/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const eb=1e3,tb=2,nb=14400*1e3,rb=.5;function ib(t,e=eb,n=tb){const r=e*Math.pow(n,t),i=Math.round(rb*r*(Math.random()-.5)*2);return Math.min(nb,r+i)}/**
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
 */function ce(t){return t&&t._delegate?t._delegate:t}class mt{constructor(e,n,r){this.name=e,this.instanceFactory=n,this.type=r,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}setInstantiationMode(e){return this.instantiationMode=e,this}setMultipleInstances(e){return this.multipleInstances=e,this}setServiceProps(e){return this.serviceProps=e,this}setInstanceCreatedCallback(e){return this.onInstanceCreated=e,this}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Zt="[DEFAULT]";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class sb{constructor(e,n){this.name=e,this.container=n,this.component=null,this.instances=new Map,this.instancesDeferred=new Map,this.instancesOptions=new Map,this.onInitCallbacks=new Map}get(e){const n=this.normalizeInstanceIdentifier(e);if(!this.instancesDeferred.has(n)){const r=new ve;if(this.instancesDeferred.set(n,r),this.isInitialized(n)||this.shouldAutoInitialize())try{const i=this.getOrInitializeService({instanceIdentifier:n});i&&r.resolve(i)}catch{}}return this.instancesDeferred.get(n).promise}getImmediate(e){const n=this.normalizeInstanceIdentifier(e?.identifier),r=e?.optional??!1;if(this.isInitialized(n)||this.shouldAutoInitialize())try{return this.getOrInitializeService({instanceIdentifier:n})}catch(i){if(r)return null;throw i}else{if(r)return null;throw Error(`Service ${this.name} is not available`)}}getComponent(){return this.component}setComponent(e){if(e.name!==this.name)throw Error(`Mismatching Component ${e.name} for Provider ${this.name}.`);if(this.component)throw Error(`Component for ${this.name} has already been provided`);if(this.component=e,!!this.shouldAutoInitialize()){if(ab(e))try{this.getOrInitializeService({instanceIdentifier:Zt})}catch{}for(const[n,r]of this.instancesDeferred.entries()){const i=this.normalizeInstanceIdentifier(n);try{const s=this.getOrInitializeService({instanceIdentifier:i});r.resolve(s)}catch{}}}}clearInstance(e=Zt){this.instancesDeferred.delete(e),this.instancesOptions.delete(e),this.instances.delete(e)}async delete(){const e=Array.from(this.instances.values());await Promise.all([...e.filter(n=>"INTERNAL"in n).map(n=>n.INTERNAL.delete()),...e.filter(n=>"_delete"in n).map(n=>n._delete())])}isComponentSet(){return this.component!=null}isInitialized(e=Zt){return this.instances.has(e)}getOptions(e=Zt){return this.instancesOptions.get(e)||{}}initialize(e={}){const{options:n={}}=e,r=this.normalizeInstanceIdentifier(e.instanceIdentifier);if(this.isInitialized(r))throw Error(`${this.name}(${r}) has already been initialized`);if(!this.isComponentSet())throw Error(`Component ${this.name} has not been registered yet`);const i=this.getOrInitializeService({instanceIdentifier:r,options:n});for(const[s,o]of this.instancesDeferred.entries()){const a=this.normalizeInstanceIdentifier(s);r===a&&o.resolve(i)}return i}onInit(e,n){const r=this.normalizeInstanceIdentifier(n),i=this.onInitCallbacks.get(r)??new Set;i.add(e),this.onInitCallbacks.set(r,i);const s=this.instances.get(r);return s&&e(s,r),()=>{i.delete(e)}}invokeOnInitCallbacks(e,n){const r=this.onInitCallbacks.get(n);if(r)for(const i of r)try{i(e,n)}catch{}}getOrInitializeService({instanceIdentifier:e,options:n={}}){let r=this.instances.get(e);if(!r&&this.component&&(r=this.component.instanceFactory(this.container,{instanceIdentifier:ob(e),options:n}),this.instances.set(e,r),this.instancesOptions.set(e,n),this.invokeOnInitCallbacks(r,e),this.component.onInstanceCreated))try{this.component.onInstanceCreated(this.container,e,r)}catch{}return r||null}normalizeInstanceIdentifier(e=Zt){return this.component?this.component.multipleInstances?e:Zt:e}shouldAutoInitialize(){return!!this.component&&this.component.instantiationMode!=="EXPLICIT"}}function ob(t){return t===Zt?void 0:t}function ab(t){return t.instantiationMode==="EAGER"}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class cb{constructor(e){this.name=e,this.providers=new Map}addComponent(e){const n=this.getProvider(e.name);if(n.isComponentSet())throw new Error(`Component ${e.name} has already been registered with ${this.name}`);n.setComponent(e)}addOrOverwriteComponent(e){this.getProvider(e.name).isComponentSet()&&this.providers.delete(e.name),this.addComponent(e)}getProvider(e){if(this.providers.has(e))return this.providers.get(e);const n=new sb(e,this);return this.providers.set(e,n),n}getProviders(){return Array.from(this.providers.values())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var O;(function(t){t[t.DEBUG=0]="DEBUG",t[t.VERBOSE=1]="VERBOSE",t[t.INFO=2]="INFO",t[t.WARN=3]="WARN",t[t.ERROR=4]="ERROR",t[t.SILENT=5]="SILENT"})(O||(O={}));const lb={debug:O.DEBUG,verbose:O.VERBOSE,info:O.INFO,warn:O.WARN,error:O.ERROR,silent:O.SILENT},ub=O.INFO,db={[O.DEBUG]:"log",[O.VERBOSE]:"log",[O.INFO]:"info",[O.WARN]:"warn",[O.ERROR]:"error"},hb=(t,e,...n)=>{if(e<t.logLevel)return;const r=new Date().toISOString(),i=db[e];if(i)console[i](`[${r}]  ${t.name}:`,...n);else throw new Error(`Attempted to log a message with an invalid logType (value: ${e})`)};class qs{constructor(e){this.name=e,this._logLevel=ub,this._logHandler=hb,this._userLogHandler=null}get logLevel(){return this._logLevel}set logLevel(e){if(!(e in O))throw new TypeError(`Invalid value "${e}" assigned to \`logLevel\``);this._logLevel=e}setLogLevel(e){this._logLevel=typeof e=="string"?lb[e]:e}get logHandler(){return this._logHandler}set logHandler(e){if(typeof e!="function")throw new TypeError("Value assigned to `logHandler` must be a function");this._logHandler=e}get userLogHandler(){return this._userLogHandler}set userLogHandler(e){this._userLogHandler=e}debug(...e){this._userLogHandler&&this._userLogHandler(this,O.DEBUG,...e),this._logHandler(this,O.DEBUG,...e)}log(...e){this._userLogHandler&&this._userLogHandler(this,O.VERBOSE,...e),this._logHandler(this,O.VERBOSE,...e)}info(...e){this._userLogHandler&&this._userLogHandler(this,O.INFO,...e),this._logHandler(this,O.INFO,...e)}warn(...e){this._userLogHandler&&this._userLogHandler(this,O.WARN,...e),this._logHandler(this,O.WARN,...e)}error(...e){this._userLogHandler&&this._userLogHandler(this,O.ERROR,...e),this._logHandler(this,O.ERROR,...e)}}const fb=(t,e)=>e.some(n=>t instanceof n);let zu,Gu;function pb(){return zu||(zu=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])}function gb(){return Gu||(Gu=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])}const kf=new WeakMap,_a=new WeakMap,Rf=new WeakMap,Lo=new WeakMap,Ec=new WeakMap;function mb(t){const e=new Promise((n,r)=>{const i=()=>{t.removeEventListener("success",s),t.removeEventListener("error",o)},s=()=>{n(Lt(t.result)),i()},o=()=>{r(t.error),i()};t.addEventListener("success",s),t.addEventListener("error",o)});return e.then(n=>{n instanceof IDBCursor&&kf.set(n,t)}).catch(()=>{}),Ec.set(e,t),e}function _b(t){if(_a.has(t))return;const e=new Promise((n,r)=>{const i=()=>{t.removeEventListener("complete",s),t.removeEventListener("error",o),t.removeEventListener("abort",o)},s=()=>{n(),i()},o=()=>{r(t.error||new DOMException("AbortError","AbortError")),i()};t.addEventListener("complete",s),t.addEventListener("error",o),t.addEventListener("abort",o)});_a.set(t,e)}let ya={get(t,e,n){if(t instanceof IDBTransaction){if(e==="done")return _a.get(t);if(e==="objectStoreNames")return t.objectStoreNames||Rf.get(t);if(e==="store")return n.objectStoreNames[1]?void 0:n.objectStore(n.objectStoreNames[0])}return Lt(t[e])},set(t,e,n){return t[e]=n,!0},has(t,e){return t instanceof IDBTransaction&&(e==="done"||e==="store")?!0:e in t}};function yb(t){ya=t(ya)}function Eb(t){return t===IDBDatabase.prototype.transaction&&!("objectStoreNames"in IDBTransaction.prototype)?function(e,...n){const r=t.call(Oo(this),e,...n);return Rf.set(r,e.sort?e.sort():[e]),Lt(r)}:gb().includes(t)?function(...e){return t.apply(Oo(this),e),Lt(kf.get(this))}:function(...e){return Lt(t.apply(Oo(this),e))}}function vb(t){return typeof t=="function"?Eb(t):(t instanceof IDBTransaction&&_b(t),fb(t,pb())?new Proxy(t,ya):t)}function Lt(t){if(t instanceof IDBRequest)return mb(t);if(Lo.has(t))return Lo.get(t);const e=vb(t);return e!==t&&(Lo.set(t,e),Ec.set(e,t)),e}const Oo=t=>Ec.get(t);function wb(t,e,{blocked:n,upgrade:r,blocking:i,terminated:s}={}){const o=indexedDB.open(t,e),a=Lt(o);return r&&o.addEventListener("upgradeneeded",c=>{r(Lt(o.result),c.oldVersion,c.newVersion,Lt(o.transaction),c)}),n&&o.addEventListener("blocked",c=>n(c.oldVersion,c.newVersion,c)),a.then(c=>{s&&c.addEventListener("close",()=>s()),i&&c.addEventListener("versionchange",l=>i(l.oldVersion,l.newVersion,l))}).catch(()=>{}),a}const bb=["get","getKey","getAll","getAllKeys","count"],Sb=["put","add","delete","clear"],Do=new Map;function qu(t,e){if(!(t instanceof IDBDatabase&&!(e in t)&&typeof e=="string"))return;if(Do.get(e))return Do.get(e);const n=e.replace(/FromIndex$/,""),r=e!==n,i=Sb.includes(n);if(!(n in(r?IDBIndex:IDBObjectStore).prototype)||!(i||bb.includes(n)))return;const s=async function(o,...a){const c=this.transaction(o,i?"readwrite":"readonly");let l=c.store;return r&&(l=l.index(a.shift())),(await Promise.all([l[n](...a),i&&c.done]))[0]};return Do.set(e,s),s}yb(t=>({...t,get:(e,n,r)=>qu(e,n)||t.get(e,n,r),has:(e,n)=>!!qu(e,n)||t.has(e,n)}));/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Cb{constructor(e){this.container=e}getPlatformInfoString(){return this.container.getProviders().map(n=>{if(Tb(n)){const r=n.getImmediate();return`${r.library}/${r.version}`}else return null}).filter(n=>n).join(" ")}}function Tb(t){return t.getComponent()?.type==="VERSION"}const Ea="@firebase/app",Yu="0.14.4";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const _t=new qs("@firebase/app"),Ib="@firebase/app-compat",kb="@firebase/analytics-compat",Rb="@firebase/analytics",Ab="@firebase/app-check-compat",Pb="@firebase/app-check",Nb="@firebase/auth",Lb="@firebase/auth-compat",Ob="@firebase/database",Db="@firebase/data-connect",Mb="@firebase/database-compat",xb="@firebase/functions",Fb="@firebase/functions-compat",Ub="@firebase/installations",$b="@firebase/installations-compat",Bb="@firebase/messaging",Hb="@firebase/messaging-compat",Wb="@firebase/performance",Vb="@firebase/performance-compat",jb="@firebase/remote-config",zb="@firebase/remote-config-compat",Gb="@firebase/storage",qb="@firebase/storage-compat",Yb="@firebase/firestore",Kb="@firebase/ai",Jb="@firebase/firestore-compat",Xb="firebase",Qb="12.4.0";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const va="[DEFAULT]",Zb={[Ea]:"fire-core",[Ib]:"fire-core-compat",[Rb]:"fire-analytics",[kb]:"fire-analytics-compat",[Pb]:"fire-app-check",[Ab]:"fire-app-check-compat",[Nb]:"fire-auth",[Lb]:"fire-auth-compat",[Ob]:"fire-rtdb",[Db]:"fire-data-connect",[Mb]:"fire-rtdb-compat",[xb]:"fire-fn",[Fb]:"fire-fn-compat",[Ub]:"fire-iid",[$b]:"fire-iid-compat",[Bb]:"fire-fcm",[Hb]:"fire-fcm-compat",[Wb]:"fire-perf",[Vb]:"fire-perf-compat",[jb]:"fire-rc",[zb]:"fire-rc-compat",[Gb]:"fire-gcs",[qb]:"fire-gcs-compat",[Yb]:"fire-fst",[Jb]:"fire-fst-compat",[Kb]:"fire-vertex","fire-js":"fire-js",[Xb]:"fire-js-all"};/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const us=new Map,eS=new Map,wa=new Map;function Ku(t,e){try{t.container.addComponent(e)}catch(n){_t.debug(`Component ${e.name} failed to register with FirebaseApp ${t.name}`,n)}}function Bt(t){const e=t.name;if(wa.has(e))return _t.debug(`There were multiple attempts to register component ${e}.`),!1;wa.set(e,t);for(const n of us.values())Ku(n,t);for(const n of eS.values())Ku(n,t);return!0}function yi(t,e){const n=t.container.getProvider("heartbeat").getImmediate({optional:!0});return n&&n.triggerHeartbeat(),t.container.getProvider(e)}function Ue(t){return t==null?!1:t.settings!==void 0}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const tS={"no-app":"No Firebase App '{$appName}' has been created - call initializeApp() first","bad-app-name":"Illegal App name: '{$appName}'","duplicate-app":"Firebase App named '{$appName}' already exists with different options or config","app-deleted":"Firebase App named '{$appName}' already deleted","server-app-deleted":"Firebase Server App has been deleted","no-options":"Need to provide options, when not being deployed to hosting via source.","invalid-app-argument":"firebase.{$appName}() takes either no argument or a Firebase App instance.","invalid-log-argument":"First argument to `onLog` must be null or a function.","idb-open":"Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.","idb-get":"Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.","idb-set":"Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.","idb-delete":"Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}.","finalization-registry-not-supported":"FirebaseServerApp deleteOnDeref field defined but the JS runtime does not support FinalizationRegistry.","invalid-server-app-environment":"FirebaseServerApp is not for use in browser environments."},Ot=new hr("app","Firebase",tS);/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class nS{constructor(e,n,r){this._isDeleted=!1,this._options={...e},this._config={...n},this._name=n.name,this._automaticDataCollectionEnabled=n.automaticDataCollectionEnabled,this._container=r,this.container.addComponent(new mt("app",()=>this,"PUBLIC"))}get automaticDataCollectionEnabled(){return this.checkDestroyed(),this._automaticDataCollectionEnabled}set automaticDataCollectionEnabled(e){this.checkDestroyed(),this._automaticDataCollectionEnabled=e}get name(){return this.checkDestroyed(),this._name}get options(){return this.checkDestroyed(),this._options}get config(){return this.checkDestroyed(),this._config}get container(){return this._container}get isDeleted(){return this._isDeleted}set isDeleted(e){this._isDeleted=e}checkDestroyed(){if(this.isDeleted)throw Ot.create("app-deleted",{appName:this._name})}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const pr=Qb;function Af(t,e={}){let n=t;typeof e!="object"&&(e={name:e});const r={name:va,automaticDataCollectionEnabled:!0,...e},i=r.name;if(typeof i!="string"||!i)throw Ot.create("bad-app-name",{appName:String(i)});if(n||(n=wf()),!n)throw Ot.create("no-options");const s=us.get(i);if(s){if(pn(n,s.options)&&pn(r,s.config))return s;throw Ot.create("duplicate-app",{appName:i})}const o=new cb(i);for(const c of wa.values())o.addComponent(c);const a=new nS(n,r,o);return us.set(i,a),a}function vc(t=va){const e=us.get(t);if(!e&&t===va&&wf())return Af();if(!e)throw Ot.create("no-app",{appName:t});return e}function ft(t,e,n){let r=Zb[t]??t;n&&(r+=`-${n}`);const i=r.match(/\s|\//),s=e.match(/\s|\//);if(i||s){const o=[`Unable to register library "${r}" with version "${e}":`];i&&o.push(`library name "${r}" contains illegal characters (whitespace or "/")`),i&&s&&o.push("and"),s&&o.push(`version name "${e}" contains illegal characters (whitespace or "/")`),_t.warn(o.join(" "));return}Bt(new mt(`${r}-version`,()=>({library:r,version:e}),"VERSION"))}/**
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
 */const rS="firebase-heartbeat-database",iS=1,Zr="firebase-heartbeat-store";let Mo=null;function Pf(){return Mo||(Mo=wb(rS,iS,{upgrade:(t,e)=>{switch(e){case 0:try{t.createObjectStore(Zr)}catch(n){console.warn(n)}}}}).catch(t=>{throw Ot.create("idb-open",{originalErrorMessage:t.message})})),Mo}async function sS(t){try{const n=(await Pf()).transaction(Zr),r=await n.objectStore(Zr).get(Nf(t));return await n.done,r}catch(e){if(e instanceof qt)_t.warn(e.message);else{const n=Ot.create("idb-get",{originalErrorMessage:e?.message});_t.warn(n.message)}}}async function Ju(t,e){try{const r=(await Pf()).transaction(Zr,"readwrite");await r.objectStore(Zr).put(e,Nf(t)),await r.done}catch(n){if(n instanceof qt)_t.warn(n.message);else{const r=Ot.create("idb-set",{originalErrorMessage:n?.message});_t.warn(r.message)}}}function Nf(t){return`${t.name}!${t.options.appId}`}/**
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
 */const oS=1024,aS=30;class cS{constructor(e){this.container=e,this._heartbeatsCache=null;const n=this.container.getProvider("app").getImmediate();this._storage=new uS(n),this._heartbeatsCachePromise=this._storage.read().then(r=>(this._heartbeatsCache=r,r))}async triggerHeartbeat(){try{const n=this.container.getProvider("platform-logger").getImmediate().getPlatformInfoString(),r=Xu();if(this._heartbeatsCache?.heartbeats==null&&(this._heartbeatsCache=await this._heartbeatsCachePromise,this._heartbeatsCache?.heartbeats==null)||this._heartbeatsCache.lastSentHeartbeatDate===r||this._heartbeatsCache.heartbeats.some(i=>i.date===r))return;if(this._heartbeatsCache.heartbeats.push({date:r,agent:n}),this._heartbeatsCache.heartbeats.length>aS){const i=dS(this._heartbeatsCache.heartbeats);this._heartbeatsCache.heartbeats.splice(i,1)}return this._storage.overwrite(this._heartbeatsCache)}catch(e){_t.warn(e)}}async getHeartbeatsHeader(){try{if(this._heartbeatsCache===null&&await this._heartbeatsCachePromise,this._heartbeatsCache?.heartbeats==null||this._heartbeatsCache.heartbeats.length===0)return"";const e=Xu(),{heartbeatsToSend:n,unsentEntries:r}=lS(this._heartbeatsCache.heartbeats),i=os(JSON.stringify({version:2,heartbeats:n}));return this._heartbeatsCache.lastSentHeartbeatDate=e,r.length>0?(this._heartbeatsCache.heartbeats=r,await this._storage.overwrite(this._heartbeatsCache)):(this._heartbeatsCache.heartbeats=[],this._storage.overwrite(this._heartbeatsCache)),i}catch(e){return _t.warn(e),""}}}function Xu(){return new Date().toISOString().substring(0,10)}function lS(t,e=oS){const n=[];let r=t.slice();for(const i of t){const s=n.find(o=>o.agent===i.agent);if(s){if(s.dates.push(i.date),Qu(n)>e){s.dates.pop();break}}else if(n.push({agent:i.agent,dates:[i.date]}),Qu(n)>e){n.pop();break}r=r.slice(1)}return{heartbeatsToSend:n,unsentEntries:r}}class uS{constructor(e){this.app=e,this._canUseIndexedDBPromise=this.runIndexedDBEnvironmentCheck()}async runIndexedDBEnvironmentCheck(){return yc()?Vw().then(()=>!0).catch(()=>!1):!1}async read(){if(await this._canUseIndexedDBPromise){const n=await sS(this.app);return n?.heartbeats?n:{heartbeats:[]}}else return{heartbeats:[]}}async overwrite(e){if(await this._canUseIndexedDBPromise){const r=await this.read();return Ju(this.app,{lastSentHeartbeatDate:e.lastSentHeartbeatDate??r.lastSentHeartbeatDate,heartbeats:e.heartbeats})}else return}async add(e){if(await this._canUseIndexedDBPromise){const r=await this.read();return Ju(this.app,{lastSentHeartbeatDate:e.lastSentHeartbeatDate??r.lastSentHeartbeatDate,heartbeats:[...r.heartbeats,...e.heartbeats]})}else return}}function Qu(t){return os(JSON.stringify({version:2,heartbeats:t})).length}function dS(t){if(t.length===0)return-1;let e=0,n=t[0].date;for(let r=1;r<t.length;r++)t[r].date<n&&(n=t[r].date,e=r);return e}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function hS(t){Bt(new mt("platform-logger",e=>new Cb(e),"PRIVATE")),Bt(new mt("heartbeat",e=>new cS(e),"PRIVATE")),ft(Ea,Yu,t),ft(Ea,Yu,"esm2020"),ft("fire-js","")}hS("");var Zu={};const ed="@firebase/database",td="1.1.0";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Lf="";function Of(t){Lf=t}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class fS{constructor(e){this.domStorage_=e,this.prefix_="firebase:"}set(e,n){n==null?this.domStorage_.removeItem(this.prefixedName_(e)):this.domStorage_.setItem(this.prefixedName_(e),ne(n))}get(e){const n=this.domStorage_.getItem(this.prefixedName_(e));return n==null?null:Qr(n)}remove(e){this.domStorage_.removeItem(this.prefixedName_(e))}prefixedName_(e){return this.prefix_+e}toString(){return this.domStorage_.toString()}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class pS{constructor(){this.cache_={},this.isInMemoryStorage=!0}set(e,n){n==null?delete this.cache_[e]:this.cache_[e]=n}get(e){return nt(this.cache_,e)?this.cache_[e]:null}remove(e){delete this.cache_[e]}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Df=function(t){try{if(typeof window<"u"&&typeof window[t]<"u"){const e=window[t];return e.setItem("firebase:sentinel","cache"),e.removeItem("firebase:sentinel"),new fS(e)}}catch{}return new pS},sn=Df("localStorage"),gS=Df("sessionStorage");/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Mn=new qs("@firebase/database"),mS=(function(){let t=1;return function(){return t++}})(),Mf=function(t){const e=Zw(t),n=new Kw;n.update(e);const r=n.digest();return zs.encodeByteArray(r)},Ei=function(...t){let e="";for(let n=0;n<t.length;n++){const r=t[n];Array.isArray(r)||r&&typeof r=="object"&&typeof r.length=="number"?e+=Ei.apply(null,r):typeof r=="object"?e+=ne(r):e+=r,e+=" "}return e};let xr=null,nd=!0;const _S=function(t,e){g(!0,"Can't turn on custom loggers persistently."),Mn.logLevel=O.VERBOSE,xr=Mn.log.bind(Mn)},oe=function(...t){if(nd===!0&&(nd=!1,xr===null&&gS.get("logging_enabled")===!0&&_S()),xr){const e=Ei.apply(null,t);xr(e)}},vi=function(t){return function(...e){oe(t,...e)}},ba=function(...t){const e="FIREBASE INTERNAL ERROR: "+Ei(...t);Mn.error(e)},yt=function(...t){const e=`FIREBASE FATAL ERROR: ${Ei(...t)}`;throw Mn.error(e),new Error(e)},me=function(...t){const e="FIREBASE WARNING: "+Ei(...t);Mn.warn(e)},yS=function(){typeof window<"u"&&window.location&&window.location.protocol&&window.location.protocol.indexOf("https:")!==-1&&me("Insecure Firebase access from a secure page. Please use https in calls to new Firebase().")},Ys=function(t){return typeof t=="number"&&(t!==t||t===Number.POSITIVE_INFINITY||t===Number.NEGATIVE_INFINITY)},ES=function(t){if(document.readyState==="complete")t();else{let e=!1;const n=function(){if(!document.body){setTimeout(n,Math.floor(10));return}e||(e=!0,t())};document.addEventListener?(document.addEventListener("DOMContentLoaded",n,!1),window.addEventListener("load",n,!1)):document.attachEvent&&(document.attachEvent("onreadystatechange",()=>{document.readyState==="complete"&&n()}),window.attachEvent("onload",n))}},Qn="[MIN_NAME]",gn="[MAX_NAME]",Tn=function(t,e){if(t===e)return 0;if(t===Qn||e===gn)return-1;if(e===Qn||t===gn)return 1;{const n=rd(t),r=rd(e);return n!==null?r!==null?n-r===0?t.length-e.length:n-r:-1:r!==null?1:t<e?-1:1}},vS=function(t,e){return t===e?0:t<e?-1:1},Ir=function(t,e){if(e&&t in e)return e[t];throw new Error("Missing required key ("+t+") in object: "+ne(e))},wc=function(t){if(typeof t!="object"||t===null)return ne(t);const e=[];for(const r in t)e.push(r);e.sort();let n="{";for(let r=0;r<e.length;r++)r!==0&&(n+=","),n+=ne(e[r]),n+=":",n+=wc(t[e[r]]);return n+="}",n},xf=function(t,e){const n=t.length;if(n<=e)return[t];const r=[];for(let i=0;i<n;i+=e)i+e>n?r.push(t.substring(i,n)):r.push(t.substring(i,i+e));return r};function ae(t,e){for(const n in t)t.hasOwnProperty(n)&&e(n,t[n])}const Ff=function(t){g(!Ys(t),"Invalid JSON number");const e=11,n=52,r=(1<<e-1)-1;let i,s,o,a,c;t===0?(s=0,o=0,i=1/t===-1/0?1:0):(i=t<0,t=Math.abs(t),t>=Math.pow(2,1-r)?(a=Math.min(Math.floor(Math.log(t)/Math.LN2),r),s=a+r,o=Math.round(t*Math.pow(2,n-a)-Math.pow(2,n))):(s=0,o=Math.round(t/Math.pow(2,1-r-n))));const l=[];for(c=n;c;c-=1)l.push(o%2?1:0),o=Math.floor(o/2);for(c=e;c;c-=1)l.push(s%2?1:0),s=Math.floor(s/2);l.push(i?1:0),l.reverse();const u=l.join("");let d="";for(c=0;c<64;c+=8){let h=parseInt(u.substr(c,8),2).toString(16);h.length===1&&(h="0"+h),d=d+h}return d.toLowerCase()},wS=function(){return!!(typeof window=="object"&&window.chrome&&window.chrome.extension&&!/^chrome/.test(window.location.href))},bS=function(){return typeof Windows=="object"&&typeof Windows.UI=="object"};function SS(t,e){let n="Unknown Error";t==="too_big"?n="The data requested exceeds the maximum size that can be accessed with a single request.":t==="permission_denied"?n="Client doesn't have permission to access the desired data.":t==="unavailable"&&(n="The service is unavailable");const r=new Error(t+" at "+e._path.toString()+": "+n);return r.code=t.toUpperCase(),r}const CS=new RegExp("^-?(0*)\\d{1,10}$"),TS=-2147483648,IS=2147483647,rd=function(t){if(CS.test(t)){const e=Number(t);if(e>=TS&&e<=IS)return e}return null},gr=function(t){try{t()}catch(e){setTimeout(()=>{const n=e.stack||"";throw me("Exception was thrown by user callback.",n),e},Math.floor(0))}},kS=function(){return(typeof window=="object"&&window.navigator&&window.navigator.userAgent||"").search(/googlebot|google webmaster tools|bingbot|yahoo! slurp|baiduspider|yandexbot|duckduckbot/i)>=0},Fr=function(t,e){const n=setTimeout(t,e);return typeof n=="number"&&typeof Deno<"u"&&Deno.unrefTimer?Deno.unrefTimer(n):typeof n=="object"&&n.unref&&n.unref(),n};/**
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
 */class RS{constructor(e,n){this.appCheckProvider=n,this.appName=e.name,Ue(e)&&e.settings.appCheckToken&&(this.serverAppAppCheckToken=e.settings.appCheckToken),this.appCheck=n?.getImmediate({optional:!0}),this.appCheck||n?.get().then(r=>this.appCheck=r)}getToken(e){if(this.serverAppAppCheckToken){if(e)throw new Error("Attempted reuse of `FirebaseServerApp.appCheckToken` after previous usage failed.");return Promise.resolve({token:this.serverAppAppCheckToken})}return this.appCheck?this.appCheck.getToken(e):new Promise((n,r)=>{setTimeout(()=>{this.appCheck?this.getToken(e).then(n,r):n(null)},0)})}addTokenChangeListener(e){this.appCheckProvider?.get().then(n=>n.addTokenListener(e))}notifyForInvalidToken(){me(`Provided AppCheck credentials for the app named "${this.appName}" are invalid. This usually indicates your app was not initialized correctly.`)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class AS{constructor(e,n,r){this.appName_=e,this.firebaseOptions_=n,this.authProvider_=r,this.auth_=null,this.auth_=r.getImmediate({optional:!0}),this.auth_||r.onInit(i=>this.auth_=i)}getToken(e){return this.auth_?this.auth_.getToken(e).catch(n=>n&&n.code==="auth/token-not-initialized"?(oe("Got auth/token-not-initialized error.  Treating as null token."),null):Promise.reject(n)):new Promise((n,r)=>{setTimeout(()=>{this.auth_?this.getToken(e).then(n,r):n(null)},0)})}addTokenChangeListener(e){this.auth_?this.auth_.addAuthTokenListener(e):this.authProvider_.get().then(n=>n.addAuthTokenListener(e))}removeTokenChangeListener(e){this.authProvider_.get().then(n=>n.removeAuthTokenListener(e))}notifyForInvalidToken(){let e='Provided authentication credentials for the app named "'+this.appName_+'" are invalid. This usually indicates your app was not initialized correctly. ';"credential"in this.firebaseOptions_?e+='Make sure the "credential" property provided to initializeApp() is authorized to access the specified "databaseURL" and is from the correct project.':"serviceAccount"in this.firebaseOptions_?e+='Make sure the "serviceAccount" property provided to initializeApp() is authorized to access the specified "databaseURL" and is from the correct project.':e+='Make sure the "apiKey" and "databaseURL" properties provided to initializeApp() match the values provided for your app at https://console.firebase.google.com/.',me(e)}}class Yi{constructor(e){this.accessToken=e}getToken(e){return Promise.resolve({accessToken:this.accessToken})}addTokenChangeListener(e){e(this.accessToken)}removeTokenChangeListener(e){}notifyForInvalidToken(){}}Yi.OWNER="owner";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const bc="5",Uf="v",$f="s",Bf="r",Hf="f",Wf=/(console\.firebase|firebase-console-\w+\.corp|firebase\.corp)\.google\.com/,Vf="ls",jf="p",Sa="ac",zf="websocket",Gf="long_polling";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class qf{constructor(e,n,r,i,s=!1,o="",a=!1,c=!1,l=null){this.secure=n,this.namespace=r,this.webSocketOnly=i,this.nodeAdmin=s,this.persistenceKey=o,this.includeNamespaceInQueryParams=a,this.isUsingEmulator=c,this.emulatorOptions=l,this._host=e.toLowerCase(),this._domain=this._host.substr(this._host.indexOf(".")+1),this.internalHost=sn.get("host:"+e)||this._host}isCacheableHost(){return this.internalHost.substr(0,2)==="s-"}isCustomHost(){return this._domain!=="firebaseio.com"&&this._domain!=="firebaseio-demo.com"}get host(){return this._host}set host(e){e!==this.internalHost&&(this.internalHost=e,this.isCacheableHost()&&sn.set("host:"+this._host,this.internalHost))}toString(){let e=this.toURLString();return this.persistenceKey&&(e+="<"+this.persistenceKey+">"),e}toURLString(){const e=this.secure?"https://":"http://",n=this.includeNamespaceInQueryParams?`?ns=${this.namespace}`:"";return`${e}${this.host}/${n}`}}function PS(t){return t.host!==t.internalHost||t.isCustomHost()||t.includeNamespaceInQueryParams}function Yf(t,e,n){g(typeof e=="string","typeof type must == string"),g(typeof n=="object","typeof params must == object");let r;if(e===zf)r=(t.secure?"wss://":"ws://")+t.internalHost+"/.ws?";else if(e===Gf)r=(t.secure?"https://":"http://")+t.internalHost+"/.lp?";else throw new Error("Unknown connection type: "+e);PS(t)&&(n.ns=t.namespace);const i=[];return ae(n,(s,o)=>{i.push(s+"="+o)}),r+i.join("&")}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class NS{constructor(){this.counters_={}}incrementCounter(e,n=1){nt(this.counters_,e)||(this.counters_[e]=0),this.counters_[e]+=n}get(){return Pw(this.counters_)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const xo={},Fo={};function Sc(t){const e=t.toString();return xo[e]||(xo[e]=new NS),xo[e]}function LS(t,e){const n=t.toString();return Fo[n]||(Fo[n]=e()),Fo[n]}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class OS{constructor(e){this.onMessage_=e,this.pendingResponses=[],this.currentResponseNum=0,this.closeAfterResponse=-1,this.onClose=null}closeAfter(e,n){this.closeAfterResponse=e,this.onClose=n,this.closeAfterResponse<this.currentResponseNum&&(this.onClose(),this.onClose=null)}handleResponse(e,n){for(this.pendingResponses[e]=n;this.pendingResponses[this.currentResponseNum];){const r=this.pendingResponses[this.currentResponseNum];delete this.pendingResponses[this.currentResponseNum];for(let i=0;i<r.length;++i)r[i]&&gr(()=>{this.onMessage_(r[i])});if(this.currentResponseNum===this.closeAfterResponse){this.onClose&&(this.onClose(),this.onClose=null);break}this.currentResponseNum++}}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const id="start",DS="close",MS="pLPCommand",xS="pRTLPCB",Kf="id",Jf="pw",Xf="ser",FS="cb",US="seg",$S="ts",BS="d",HS="dframe",Qf=1870,Zf=30,WS=Qf-Zf,VS=25e3,jS=3e4;class On{constructor(e,n,r,i,s,o,a){this.connId=e,this.repoInfo=n,this.applicationId=r,this.appCheckToken=i,this.authToken=s,this.transportSessionId=o,this.lastSessionId=a,this.bytesSent=0,this.bytesReceived=0,this.everConnected_=!1,this.log_=vi(e),this.stats_=Sc(n),this.urlFn=c=>(this.appCheckToken&&(c[Sa]=this.appCheckToken),Yf(n,Gf,c))}open(e,n){this.curSegmentNum=0,this.onDisconnect_=n,this.myPacketOrderer=new OS(e),this.isClosed_=!1,this.connectTimeoutTimer_=setTimeout(()=>{this.log_("Timed out trying to connect."),this.onClosed_(),this.connectTimeoutTimer_=null},Math.floor(jS)),ES(()=>{if(this.isClosed_)return;this.scriptTagHolder=new Cc((...s)=>{const[o,a,c,l,u]=s;if(this.incrementIncomingBytes_(s),!!this.scriptTagHolder)if(this.connectTimeoutTimer_&&(clearTimeout(this.connectTimeoutTimer_),this.connectTimeoutTimer_=null),this.everConnected_=!0,o===id)this.id=a,this.password=c;else if(o===DS)a?(this.scriptTagHolder.sendNewPolls=!1,this.myPacketOrderer.closeAfter(a,()=>{this.onClosed_()})):this.onClosed_();else throw new Error("Unrecognized command received: "+o)},(...s)=>{const[o,a]=s;this.incrementIncomingBytes_(s),this.myPacketOrderer.handleResponse(o,a)},()=>{this.onClosed_()},this.urlFn);const r={};r[id]="t",r[Xf]=Math.floor(Math.random()*1e8),this.scriptTagHolder.uniqueCallbackIdentifier&&(r[FS]=this.scriptTagHolder.uniqueCallbackIdentifier),r[Uf]=bc,this.transportSessionId&&(r[$f]=this.transportSessionId),this.lastSessionId&&(r[Vf]=this.lastSessionId),this.applicationId&&(r[jf]=this.applicationId),this.appCheckToken&&(r[Sa]=this.appCheckToken),typeof location<"u"&&location.hostname&&Wf.test(location.hostname)&&(r[Bf]=Hf);const i=this.urlFn(r);this.log_("Connecting via long-poll to "+i),this.scriptTagHolder.addTag(i,()=>{})})}start(){this.scriptTagHolder.startLongPoll(this.id,this.password),this.addDisconnectPingFrame(this.id,this.password)}static forceAllow(){On.forceAllow_=!0}static forceDisallow(){On.forceDisallow_=!0}static isAvailable(){return On.forceAllow_?!0:!On.forceDisallow_&&typeof document<"u"&&document.createElement!=null&&!wS()&&!bS()}markConnectionHealthy(){}shutdown_(){this.isClosed_=!0,this.scriptTagHolder&&(this.scriptTagHolder.close(),this.scriptTagHolder=null),this.myDisconnFrame&&(document.body.removeChild(this.myDisconnFrame),this.myDisconnFrame=null),this.connectTimeoutTimer_&&(clearTimeout(this.connectTimeoutTimer_),this.connectTimeoutTimer_=null)}onClosed_(){this.isClosed_||(this.log_("Longpoll is closing itself"),this.shutdown_(),this.onDisconnect_&&(this.onDisconnect_(this.everConnected_),this.onDisconnect_=null))}close(){this.isClosed_||(this.log_("Longpoll is being closed."),this.shutdown_())}send(e){const n=ne(e);this.bytesSent+=n.length,this.stats_.incrementCounter("bytes_sent",n.length);const r=_f(n),i=xf(r,WS);for(let s=0;s<i.length;s++)this.scriptTagHolder.enqueueSegment(this.curSegmentNum,i.length,i[s]),this.curSegmentNum++}addDisconnectPingFrame(e,n){this.myDisconnFrame=document.createElement("iframe");const r={};r[HS]="t",r[Kf]=e,r[Jf]=n,this.myDisconnFrame.src=this.urlFn(r),this.myDisconnFrame.style.display="none",document.body.appendChild(this.myDisconnFrame)}incrementIncomingBytes_(e){const n=ne(e).length;this.bytesReceived+=n,this.stats_.incrementCounter("bytes_received",n)}}class Cc{constructor(e,n,r,i){this.onDisconnect=r,this.urlFn=i,this.outstandingRequests=new Set,this.pendingSegs=[],this.currentSerial=Math.floor(Math.random()*1e8),this.sendNewPolls=!0;{this.uniqueCallbackIdentifier=mS(),window[MS+this.uniqueCallbackIdentifier]=e,window[xS+this.uniqueCallbackIdentifier]=n,this.myIFrame=Cc.createIFrame_();let s="";this.myIFrame.src&&this.myIFrame.src.substr(0,11)==="javascript:"&&(s='<script>document.domain="'+document.domain+'";<\/script>');const o="<html><body>"+s+"</body></html>";try{this.myIFrame.doc.open(),this.myIFrame.doc.write(o),this.myIFrame.doc.close()}catch(a){oe("frame writing exception"),a.stack&&oe(a.stack),oe(a)}}}static createIFrame_(){const e=document.createElement("iframe");if(e.style.display="none",document.body){document.body.appendChild(e);try{e.contentWindow.document||oe("No IE domain setting required")}catch{const r=document.domain;e.src="javascript:void((function(){document.open();document.domain='"+r+"';document.close();})())"}}else throw"Document body has not initialized. Wait to initialize Firebase until after the document is ready.";return e.contentDocument?e.doc=e.contentDocument:e.contentWindow?e.doc=e.contentWindow.document:e.document&&(e.doc=e.document),e}close(){this.alive=!1,this.myIFrame&&(this.myIFrame.doc.body.textContent="",setTimeout(()=>{this.myIFrame!==null&&(document.body.removeChild(this.myIFrame),this.myIFrame=null)},Math.floor(0)));const e=this.onDisconnect;e&&(this.onDisconnect=null,e())}startLongPoll(e,n){for(this.myID=e,this.myPW=n,this.alive=!0;this.newRequest_(););}newRequest_(){if(this.alive&&this.sendNewPolls&&this.outstandingRequests.size<(this.pendingSegs.length>0?2:1)){this.currentSerial++;const e={};e[Kf]=this.myID,e[Jf]=this.myPW,e[Xf]=this.currentSerial;let n=this.urlFn(e),r="",i=0;for(;this.pendingSegs.length>0&&this.pendingSegs[0].d.length+Zf+r.length<=Qf;){const o=this.pendingSegs.shift();r=r+"&"+US+i+"="+o.seg+"&"+$S+i+"="+o.ts+"&"+BS+i+"="+o.d,i++}return n=n+r,this.addLongPollTag_(n,this.currentSerial),!0}else return!1}enqueueSegment(e,n,r){this.pendingSegs.push({seg:e,ts:n,d:r}),this.alive&&this.newRequest_()}addLongPollTag_(e,n){this.outstandingRequests.add(n);const r=()=>{this.outstandingRequests.delete(n),this.newRequest_()},i=setTimeout(r,Math.floor(VS)),s=()=>{clearTimeout(i),r()};this.addTag(e,s)}addTag(e,n){setTimeout(()=>{try{if(!this.sendNewPolls)return;const r=this.myIFrame.doc.createElement("script");r.type="text/javascript",r.async=!0,r.src=e,r.onload=r.onreadystatechange=function(){const i=r.readyState;(!i||i==="loaded"||i==="complete")&&(r.onload=r.onreadystatechange=null,r.parentNode&&r.parentNode.removeChild(r),n())},r.onerror=()=>{oe("Long-poll script failed to load: "+e),this.sendNewPolls=!1,this.close()},this.myIFrame.doc.body.appendChild(r)}catch{}},Math.floor(1))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const zS=16384,GS=45e3;let ds=null;typeof MozWebSocket<"u"?ds=MozWebSocket:typeof WebSocket<"u"&&(ds=WebSocket);class $e{constructor(e,n,r,i,s,o,a){this.connId=e,this.applicationId=r,this.appCheckToken=i,this.authToken=s,this.keepaliveTimer=null,this.frames=null,this.totalFrames=0,this.bytesSent=0,this.bytesReceived=0,this.log_=vi(this.connId),this.stats_=Sc(n),this.connURL=$e.connectionURL_(n,o,a,i,r),this.nodeAdmin=n.nodeAdmin}static connectionURL_(e,n,r,i,s){const o={};return o[Uf]=bc,typeof location<"u"&&location.hostname&&Wf.test(location.hostname)&&(o[Bf]=Hf),n&&(o[$f]=n),r&&(o[Vf]=r),i&&(o[Sa]=i),s&&(o[jf]=s),Yf(e,zf,o)}open(e,n){this.onDisconnect=n,this.onMessage=e,this.log_("Websocket connecting to "+this.connURL),this.everConnected_=!1,sn.set("previous_websocket_failure",!0);try{let r;Ww(),this.mySock=new ds(this.connURL,[],r)}catch(r){this.log_("Error instantiating WebSocket.");const i=r.message||r.data;i&&this.log_(i),this.onClosed_();return}this.mySock.onopen=()=>{this.log_("Websocket connected."),this.everConnected_=!0},this.mySock.onclose=()=>{this.log_("Websocket connection was disconnected."),this.mySock=null,this.onClosed_()},this.mySock.onmessage=r=>{this.handleIncomingFrame(r)},this.mySock.onerror=r=>{this.log_("WebSocket error.  Closing connection.");const i=r.message||r.data;i&&this.log_(i),this.onClosed_()}}start(){}static forceDisallow(){$e.forceDisallow_=!0}static isAvailable(){let e=!1;if(typeof navigator<"u"&&navigator.userAgent){const n=/Android ([0-9]{0,}\.[0-9]{0,})/,r=navigator.userAgent.match(n);r&&r.length>1&&parseFloat(r[1])<4.4&&(e=!0)}return!e&&ds!==null&&!$e.forceDisallow_}static previouslyFailed(){return sn.isInMemoryStorage||sn.get("previous_websocket_failure")===!0}markConnectionHealthy(){sn.remove("previous_websocket_failure")}appendFrame_(e){if(this.frames.push(e),this.frames.length===this.totalFrames){const n=this.frames.join("");this.frames=null;const r=Qr(n);this.onMessage(r)}}handleNewFrameCount_(e){this.totalFrames=e,this.frames=[]}extractFrameCount_(e){if(g(this.frames===null,"We already have a frame buffer"),e.length<=6){const n=Number(e);if(!isNaN(n))return this.handleNewFrameCount_(n),null}return this.handleNewFrameCount_(1),e}handleIncomingFrame(e){if(this.mySock===null)return;const n=e.data;if(this.bytesReceived+=n.length,this.stats_.incrementCounter("bytes_received",n.length),this.resetKeepAlive(),this.frames!==null)this.appendFrame_(n);else{const r=this.extractFrameCount_(n);r!==null&&this.appendFrame_(r)}}send(e){this.resetKeepAlive();const n=ne(e);this.bytesSent+=n.length,this.stats_.incrementCounter("bytes_sent",n.length);const r=xf(n,zS);r.length>1&&this.sendString_(String(r.length));for(let i=0;i<r.length;i++)this.sendString_(r[i])}shutdown_(){this.isClosed_=!0,this.keepaliveTimer&&(clearInterval(this.keepaliveTimer),this.keepaliveTimer=null),this.mySock&&(this.mySock.close(),this.mySock=null)}onClosed_(){this.isClosed_||(this.log_("WebSocket is closing itself"),this.shutdown_(),this.onDisconnect&&(this.onDisconnect(this.everConnected_),this.onDisconnect=null))}close(){this.isClosed_||(this.log_("WebSocket is being closed"),this.shutdown_())}resetKeepAlive(){clearInterval(this.keepaliveTimer),this.keepaliveTimer=setInterval(()=>{this.mySock&&this.sendString_("0"),this.resetKeepAlive()},Math.floor(GS))}sendString_(e){try{this.mySock.send(e)}catch(n){this.log_("Exception thrown from WebSocket.send():",n.message||n.data,"Closing connection."),setTimeout(this.onClosed_.bind(this),0)}}}$e.responsesRequiredToBeHealthy=2;$e.healthyTimeout=3e4;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ei{static get ALL_TRANSPORTS(){return[On,$e]}static get IS_TRANSPORT_INITIALIZED(){return this.globalTransportInitialized_}constructor(e){this.initTransports_(e)}initTransports_(e){const n=$e&&$e.isAvailable();let r=n&&!$e.previouslyFailed();if(e.webSocketOnly&&(n||me("wss:// URL used, but browser isn't known to support websockets.  Trying anyway."),r=!0),r)this.transports_=[$e];else{const i=this.transports_=[];for(const s of ei.ALL_TRANSPORTS)s&&s.isAvailable()&&i.push(s);ei.globalTransportInitialized_=!0}}initialTransport(){if(this.transports_.length>0)return this.transports_[0];throw new Error("No transports available")}upgradeTransport(){return this.transports_.length>1?this.transports_[1]:null}}ei.globalTransportInitialized_=!1;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const qS=6e4,YS=5e3,KS=10*1024,JS=100*1024,Uo="t",sd="d",XS="s",od="r",QS="e",ad="o",cd="a",ld="n",ud="p",ZS="h";class eC{constructor(e,n,r,i,s,o,a,c,l,u){this.id=e,this.repoInfo_=n,this.applicationId_=r,this.appCheckToken_=i,this.authToken_=s,this.onMessage_=o,this.onReady_=a,this.onDisconnect_=c,this.onKill_=l,this.lastSessionId=u,this.connectionCount=0,this.pendingDataMessages=[],this.state_=0,this.log_=vi("c:"+this.id+":"),this.transportManager_=new ei(n),this.log_("Connection created"),this.start_()}start_(){const e=this.transportManager_.initialTransport();this.conn_=new e(this.nextTransportId_(),this.repoInfo_,this.applicationId_,this.appCheckToken_,this.authToken_,null,this.lastSessionId),this.primaryResponsesRequired_=e.responsesRequiredToBeHealthy||0;const n=this.connReceiver_(this.conn_),r=this.disconnReceiver_(this.conn_);this.tx_=this.conn_,this.rx_=this.conn_,this.secondaryConn_=null,this.isHealthy_=!1,setTimeout(()=>{this.conn_&&this.conn_.open(n,r)},Math.floor(0));const i=e.healthyTimeout||0;i>0&&(this.healthyTimeout_=Fr(()=>{this.healthyTimeout_=null,this.isHealthy_||(this.conn_&&this.conn_.bytesReceived>JS?(this.log_("Connection exceeded healthy timeout but has received "+this.conn_.bytesReceived+" bytes.  Marking connection healthy."),this.isHealthy_=!0,this.conn_.markConnectionHealthy()):this.conn_&&this.conn_.bytesSent>KS?this.log_("Connection exceeded healthy timeout but has sent "+this.conn_.bytesSent+" bytes.  Leaving connection alive."):(this.log_("Closing unhealthy connection after timeout."),this.close()))},Math.floor(i)))}nextTransportId_(){return"c:"+this.id+":"+this.connectionCount++}disconnReceiver_(e){return n=>{e===this.conn_?this.onConnectionLost_(n):e===this.secondaryConn_?(this.log_("Secondary connection lost."),this.onSecondaryConnectionLost_()):this.log_("closing an old connection")}}connReceiver_(e){return n=>{this.state_!==2&&(e===this.rx_?this.onPrimaryMessageReceived_(n):e===this.secondaryConn_?this.onSecondaryMessageReceived_(n):this.log_("message on old connection"))}}sendRequest(e){const n={t:"d",d:e};this.sendData_(n)}tryCleanupConnection(){this.tx_===this.secondaryConn_&&this.rx_===this.secondaryConn_&&(this.log_("cleaning up and promoting a connection: "+this.secondaryConn_.connId),this.conn_=this.secondaryConn_,this.secondaryConn_=null)}onSecondaryControl_(e){if(Uo in e){const n=e[Uo];n===cd?this.upgradeIfSecondaryHealthy_():n===od?(this.log_("Got a reset on secondary, closing it"),this.secondaryConn_.close(),(this.tx_===this.secondaryConn_||this.rx_===this.secondaryConn_)&&this.close()):n===ad&&(this.log_("got pong on secondary."),this.secondaryResponsesRequired_--,this.upgradeIfSecondaryHealthy_())}}onSecondaryMessageReceived_(e){const n=Ir("t",e),r=Ir("d",e);if(n==="c")this.onSecondaryControl_(r);else if(n==="d")this.pendingDataMessages.push(r);else throw new Error("Unknown protocol layer: "+n)}upgradeIfSecondaryHealthy_(){this.secondaryResponsesRequired_<=0?(this.log_("Secondary connection is healthy."),this.isHealthy_=!0,this.secondaryConn_.markConnectionHealthy(),this.proceedWithUpgrade_()):(this.log_("sending ping on secondary."),this.secondaryConn_.send({t:"c",d:{t:ud,d:{}}}))}proceedWithUpgrade_(){this.secondaryConn_.start(),this.log_("sending client ack on secondary"),this.secondaryConn_.send({t:"c",d:{t:cd,d:{}}}),this.log_("Ending transmission on primary"),this.conn_.send({t:"c",d:{t:ld,d:{}}}),this.tx_=this.secondaryConn_,this.tryCleanupConnection()}onPrimaryMessageReceived_(e){const n=Ir("t",e),r=Ir("d",e);n==="c"?this.onControl_(r):n==="d"&&this.onDataMessage_(r)}onDataMessage_(e){this.onPrimaryResponse_(),this.onMessage_(e)}onPrimaryResponse_(){this.isHealthy_||(this.primaryResponsesRequired_--,this.primaryResponsesRequired_<=0&&(this.log_("Primary connection is healthy."),this.isHealthy_=!0,this.conn_.markConnectionHealthy()))}onControl_(e){const n=Ir(Uo,e);if(sd in e){const r=e[sd];if(n===ZS){const i={...r};this.repoInfo_.isUsingEmulator&&(i.h=this.repoInfo_.host),this.onHandshake_(i)}else if(n===ld){this.log_("recvd end transmission on primary"),this.rx_=this.secondaryConn_;for(let i=0;i<this.pendingDataMessages.length;++i)this.onDataMessage_(this.pendingDataMessages[i]);this.pendingDataMessages=[],this.tryCleanupConnection()}else n===XS?this.onConnectionShutdown_(r):n===od?this.onReset_(r):n===QS?ba("Server Error: "+r):n===ad?(this.log_("got pong on primary."),this.onPrimaryResponse_(),this.sendPingOnPrimaryIfNecessary_()):ba("Unknown control packet command: "+n)}}onHandshake_(e){const n=e.ts,r=e.v,i=e.h;this.sessionId=e.s,this.repoInfo_.host=i,this.state_===0&&(this.conn_.start(),this.onConnectionEstablished_(this.conn_,n),bc!==r&&me("Protocol version mismatch detected"),this.tryStartUpgrade_())}tryStartUpgrade_(){const e=this.transportManager_.upgradeTransport();e&&this.startUpgrade_(e)}startUpgrade_(e){this.secondaryConn_=new e(this.nextTransportId_(),this.repoInfo_,this.applicationId_,this.appCheckToken_,this.authToken_,this.sessionId),this.secondaryResponsesRequired_=e.responsesRequiredToBeHealthy||0;const n=this.connReceiver_(this.secondaryConn_),r=this.disconnReceiver_(this.secondaryConn_);this.secondaryConn_.open(n,r),Fr(()=>{this.secondaryConn_&&(this.log_("Timed out trying to upgrade."),this.secondaryConn_.close())},Math.floor(qS))}onReset_(e){this.log_("Reset packet received.  New host: "+e),this.repoInfo_.host=e,this.state_===1?this.close():(this.closeConnections_(),this.start_())}onConnectionEstablished_(e,n){this.log_("Realtime connection established."),this.conn_=e,this.state_=1,this.onReady_&&(this.onReady_(n,this.sessionId),this.onReady_=null),this.primaryResponsesRequired_===0?(this.log_("Primary connection is healthy."),this.isHealthy_=!0):Fr(()=>{this.sendPingOnPrimaryIfNecessary_()},Math.floor(YS))}sendPingOnPrimaryIfNecessary_(){!this.isHealthy_&&this.state_===1&&(this.log_("sending ping on primary."),this.sendData_({t:"c",d:{t:ud,d:{}}}))}onSecondaryConnectionLost_(){const e=this.secondaryConn_;this.secondaryConn_=null,(this.tx_===e||this.rx_===e)&&this.close()}onConnectionLost_(e){this.conn_=null,!e&&this.state_===0?(this.log_("Realtime connection failed."),this.repoInfo_.isCacheableHost()&&(sn.remove("host:"+this.repoInfo_.host),this.repoInfo_.internalHost=this.repoInfo_.host)):this.state_===1&&this.log_("Realtime connection lost."),this.close()}onConnectionShutdown_(e){this.log_("Connection shutdown command received. Shutting down..."),this.onKill_&&(this.onKill_(e),this.onKill_=null),this.onDisconnect_=null,this.close()}sendData_(e){if(this.state_!==1)throw"Connection is not connected";this.tx_.send(e)}close(){this.state_!==2&&(this.log_("Closing realtime connection."),this.state_=2,this.closeConnections_(),this.onDisconnect_&&(this.onDisconnect_(),this.onDisconnect_=null))}closeConnections_(){this.log_("Shutting down all connections"),this.conn_&&(this.conn_.close(),this.conn_=null),this.secondaryConn_&&(this.secondaryConn_.close(),this.secondaryConn_=null),this.healthyTimeout_&&(clearTimeout(this.healthyTimeout_),this.healthyTimeout_=null)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ep{put(e,n,r,i){}merge(e,n,r,i){}refreshAuthToken(e){}refreshAppCheckToken(e){}onDisconnectPut(e,n,r){}onDisconnectMerge(e,n,r){}onDisconnectCancel(e,n){}reportStats(e){}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class tp{constructor(e){this.allowedEvents_=e,this.listeners_={},g(Array.isArray(e)&&e.length>0,"Requires a non-empty array")}trigger(e,...n){if(Array.isArray(this.listeners_[e])){const r=[...this.listeners_[e]];for(let i=0;i<r.length;i++)r[i].callback.apply(r[i].context,n)}}on(e,n,r){this.validateEventType_(e),this.listeners_[e]=this.listeners_[e]||[],this.listeners_[e].push({callback:n,context:r});const i=this.getInitialEvent(e);i&&n.apply(r,i)}off(e,n,r){this.validateEventType_(e);const i=this.listeners_[e]||[];for(let s=0;s<i.length;s++)if(i[s].callback===n&&(!r||r===i[s].context)){i.splice(s,1);return}}validateEventType_(e){g(this.allowedEvents_.find(n=>n===e),"Unknown event: "+e)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class hs extends tp{static getInstance(){return new hs}constructor(){super(["online"]),this.online_=!0,typeof window<"u"&&typeof window.addEventListener<"u"&&!_c()&&(window.addEventListener("online",()=>{this.online_||(this.online_=!0,this.trigger("online",!0))},!1),window.addEventListener("offline",()=>{this.online_&&(this.online_=!1,this.trigger("online",!1))},!1))}getInitialEvent(e){return g(e==="online","Unknown event type: "+e),[this.online_]}currentlyOnline(){return this.online_}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const dd=32,hd=768;class L{constructor(e,n){if(n===void 0){this.pieces_=e.split("/");let r=0;for(let i=0;i<this.pieces_.length;i++)this.pieces_[i].length>0&&(this.pieces_[r]=this.pieces_[i],r++);this.pieces_.length=r,this.pieceNum_=0}else this.pieces_=e,this.pieceNum_=n}toString(){let e="";for(let n=this.pieceNum_;n<this.pieces_.length;n++)this.pieces_[n]!==""&&(e+="/"+this.pieces_[n]);return e||"/"}}function P(){return new L("")}function I(t){return t.pieceNum_>=t.pieces_.length?null:t.pieces_[t.pieceNum_]}function Ht(t){return t.pieces_.length-t.pieceNum_}function x(t){let e=t.pieceNum_;return e<t.pieces_.length&&e++,new L(t.pieces_,e)}function Tc(t){return t.pieceNum_<t.pieces_.length?t.pieces_[t.pieces_.length-1]:null}function tC(t){let e="";for(let n=t.pieceNum_;n<t.pieces_.length;n++)t.pieces_[n]!==""&&(e+="/"+encodeURIComponent(String(t.pieces_[n])));return e||"/"}function ti(t,e=0){return t.pieces_.slice(t.pieceNum_+e)}function np(t){if(t.pieceNum_>=t.pieces_.length)return null;const e=[];for(let n=t.pieceNum_;n<t.pieces_.length-1;n++)e.push(t.pieces_[n]);return new L(e,0)}function q(t,e){const n=[];for(let r=t.pieceNum_;r<t.pieces_.length;r++)n.push(t.pieces_[r]);if(e instanceof L)for(let r=e.pieceNum_;r<e.pieces_.length;r++)n.push(e.pieces_[r]);else{const r=e.split("/");for(let i=0;i<r.length;i++)r[i].length>0&&n.push(r[i])}return new L(n,0)}function k(t){return t.pieceNum_>=t.pieces_.length}function ge(t,e){const n=I(t),r=I(e);if(n===null)return e;if(n===r)return ge(x(t),x(e));throw new Error("INTERNAL ERROR: innerPath ("+e+") is not within outerPath ("+t+")")}function nC(t,e){const n=ti(t,0),r=ti(e,0);for(let i=0;i<n.length&&i<r.length;i++){const s=Tn(n[i],r[i]);if(s!==0)return s}return n.length===r.length?0:n.length<r.length?-1:1}function Ic(t,e){if(Ht(t)!==Ht(e))return!1;for(let n=t.pieceNum_,r=e.pieceNum_;n<=t.pieces_.length;n++,r++)if(t.pieces_[n]!==e.pieces_[r])return!1;return!0}function Ne(t,e){let n=t.pieceNum_,r=e.pieceNum_;if(Ht(t)>Ht(e))return!1;for(;n<t.pieces_.length;){if(t.pieces_[n]!==e.pieces_[r])return!1;++n,++r}return!0}class rC{constructor(e,n){this.errorPrefix_=n,this.parts_=ti(e,0),this.byteLength_=Math.max(1,this.parts_.length);for(let r=0;r<this.parts_.length;r++)this.byteLength_+=Gs(this.parts_[r]);rp(this)}}function iC(t,e){t.parts_.length>0&&(t.byteLength_+=1),t.parts_.push(e),t.byteLength_+=Gs(e),rp(t)}function sC(t){const e=t.parts_.pop();t.byteLength_-=Gs(e),t.parts_.length>0&&(t.byteLength_-=1)}function rp(t){if(t.byteLength_>hd)throw new Error(t.errorPrefix_+"has a key path longer than "+hd+" bytes ("+t.byteLength_+").");if(t.parts_.length>dd)throw new Error(t.errorPrefix_+"path specified exceeds the maximum depth that can be written ("+dd+") or object contains a cycle "+en(t))}function en(t){return t.parts_.length===0?"":"in property '"+t.parts_.join(".")+"'"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class kc extends tp{static getInstance(){return new kc}constructor(){super(["visible"]);let e,n;typeof document<"u"&&typeof document.addEventListener<"u"&&(typeof document.hidden<"u"?(n="visibilitychange",e="hidden"):typeof document.mozHidden<"u"?(n="mozvisibilitychange",e="mozHidden"):typeof document.msHidden<"u"?(n="msvisibilitychange",e="msHidden"):typeof document.webkitHidden<"u"&&(n="webkitvisibilitychange",e="webkitHidden")),this.visible_=!0,n&&document.addEventListener(n,()=>{const r=!document[e];r!==this.visible_&&(this.visible_=r,this.trigger("visible",r))},!1)}getInitialEvent(e){return g(e==="visible","Unknown event type: "+e),[this.visible_]}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const kr=1e3,oC=300*1e3,fd=30*1e3,aC=1.3,cC=3e4,lC="server_kill",pd=3;class pt extends ep{constructor(e,n,r,i,s,o,a,c){if(super(),this.repoInfo_=e,this.applicationId_=n,this.onDataUpdate_=r,this.onConnectStatus_=i,this.onServerInfoUpdate_=s,this.authTokenProvider_=o,this.appCheckTokenProvider_=a,this.authOverride_=c,this.id=pt.nextPersistentConnectionId_++,this.log_=vi("p:"+this.id+":"),this.interruptReasons_={},this.listens=new Map,this.outstandingPuts_=[],this.outstandingGets_=[],this.outstandingPutCount_=0,this.outstandingGetCount_=0,this.onDisconnectRequestQueue_=[],this.connected_=!1,this.reconnectDelay_=kr,this.maxReconnectDelay_=oC,this.securityDebugCallback_=null,this.lastSessionId=null,this.establishConnectionTimer_=null,this.visible_=!1,this.requestCBHash_={},this.requestNumber_=0,this.realtime_=null,this.authToken_=null,this.appCheckToken_=null,this.forceTokenRefresh_=!1,this.invalidAuthTokenCount_=0,this.invalidAppCheckTokenCount_=0,this.firstConnection_=!0,this.lastConnectionAttemptTime_=null,this.lastConnectionEstablishedTime_=null,c)throw new Error("Auth override specified in options, but not supported on non Node.js platforms");kc.getInstance().on("visible",this.onVisible_,this),e.host.indexOf("fblocal")===-1&&hs.getInstance().on("online",this.onOnline_,this)}sendRequest(e,n,r){const i=++this.requestNumber_,s={r:i,a:e,b:n};this.log_(ne(s)),g(this.connected_,"sendRequest call when we're not connected not allowed."),this.realtime_.sendRequest(s),r&&(this.requestCBHash_[i]=r)}get(e){this.initConnection_();const n=new ve,i={action:"g",request:{p:e._path.toString(),q:e._queryObject},onComplete:o=>{const a=o.d;o.s==="ok"?n.resolve(a):n.reject(a)}};this.outstandingGets_.push(i),this.outstandingGetCount_++;const s=this.outstandingGets_.length-1;return this.connected_&&this.sendGet_(s),n.promise}listen(e,n,r,i){this.initConnection_();const s=e._queryIdentifier,o=e._path.toString();this.log_("Listen called for "+o+" "+s),this.listens.has(o)||this.listens.set(o,new Map),g(e._queryParams.isDefault()||!e._queryParams.loadsAllData(),"listen() called for non-default but complete query"),g(!this.listens.get(o).has(s),"listen() called twice for same path/queryId.");const a={onComplete:i,hashFn:n,query:e,tag:r};this.listens.get(o).set(s,a),this.connected_&&this.sendListen_(a)}sendGet_(e){const n=this.outstandingGets_[e];this.sendRequest("g",n.request,r=>{delete this.outstandingGets_[e],this.outstandingGetCount_--,this.outstandingGetCount_===0&&(this.outstandingGets_=[]),n.onComplete&&n.onComplete(r)})}sendListen_(e){const n=e.query,r=n._path.toString(),i=n._queryIdentifier;this.log_("Listen on "+r+" for "+i);const s={p:r},o="q";e.tag&&(s.q=n._queryObject,s.t=e.tag),s.h=e.hashFn(),this.sendRequest(o,s,a=>{const c=a.d,l=a.s;pt.warnOnListenWarnings_(c,n),(this.listens.get(r)&&this.listens.get(r).get(i))===e&&(this.log_("listen response",a),l!=="ok"&&this.removeListen_(r,i),e.onComplete&&e.onComplete(l,c))})}static warnOnListenWarnings_(e,n){if(e&&typeof e=="object"&&nt(e,"w")){const r=Jn(e,"w");if(Array.isArray(r)&&~r.indexOf("no_index")){const i='".indexOn": "'+n._queryParams.getIndex().toString()+'"',s=n._path.toString();me(`Using an unspecified index. Your data will be downloaded and filtered on the client. Consider adding ${i} at ${s} to your security rules for better performance.`)}}}refreshAuthToken(e){this.authToken_=e,this.log_("Auth token refreshed"),this.authToken_?this.tryAuth():this.connected_&&this.sendRequest("unauth",{},()=>{}),this.reduceReconnectDelayIfAdminCredential_(e)}reduceReconnectDelayIfAdminCredential_(e){(e&&e.length===40||Yw(e))&&(this.log_("Admin auth credential detected.  Reducing max reconnect time."),this.maxReconnectDelay_=fd)}refreshAppCheckToken(e){this.appCheckToken_=e,this.log_("App check token refreshed"),this.appCheckToken_?this.tryAppCheck():this.connected_&&this.sendRequest("unappeck",{},()=>{})}tryAuth(){if(this.connected_&&this.authToken_){const e=this.authToken_,n=qw(e)?"auth":"gauth",r={cred:e};this.authOverride_===null?r.noauth=!0:typeof this.authOverride_=="object"&&(r.authvar=this.authOverride_),this.sendRequest(n,r,i=>{const s=i.s,o=i.d||"error";this.authToken_===e&&(s==="ok"?this.invalidAuthTokenCount_=0:this.onAuthRevoked_(s,o))})}}tryAppCheck(){this.connected_&&this.appCheckToken_&&this.sendRequest("appcheck",{token:this.appCheckToken_},e=>{const n=e.s,r=e.d||"error";n==="ok"?this.invalidAppCheckTokenCount_=0:this.onAppCheckRevoked_(n,r)})}unlisten(e,n){const r=e._path.toString(),i=e._queryIdentifier;this.log_("Unlisten called for "+r+" "+i),g(e._queryParams.isDefault()||!e._queryParams.loadsAllData(),"unlisten() called for non-default but complete query"),this.removeListen_(r,i)&&this.connected_&&this.sendUnlisten_(r,i,e._queryObject,n)}sendUnlisten_(e,n,r,i){this.log_("Unlisten on "+e+" for "+n);const s={p:e},o="n";i&&(s.q=r,s.t=i),this.sendRequest(o,s)}onDisconnectPut(e,n,r){this.initConnection_(),this.connected_?this.sendOnDisconnect_("o",e,n,r):this.onDisconnectRequestQueue_.push({pathString:e,action:"o",data:n,onComplete:r})}onDisconnectMerge(e,n,r){this.initConnection_(),this.connected_?this.sendOnDisconnect_("om",e,n,r):this.onDisconnectRequestQueue_.push({pathString:e,action:"om",data:n,onComplete:r})}onDisconnectCancel(e,n){this.initConnection_(),this.connected_?this.sendOnDisconnect_("oc",e,null,n):this.onDisconnectRequestQueue_.push({pathString:e,action:"oc",data:null,onComplete:n})}sendOnDisconnect_(e,n,r,i){const s={p:n,d:r};this.log_("onDisconnect "+e,s),this.sendRequest(e,s,o=>{i&&setTimeout(()=>{i(o.s,o.d)},Math.floor(0))})}put(e,n,r,i){this.putInternal("p",e,n,r,i)}merge(e,n,r,i){this.putInternal("m",e,n,r,i)}putInternal(e,n,r,i,s){this.initConnection_();const o={p:n,d:r};s!==void 0&&(o.h=s),this.outstandingPuts_.push({action:e,request:o,onComplete:i}),this.outstandingPutCount_++;const a=this.outstandingPuts_.length-1;this.connected_?this.sendPut_(a):this.log_("Buffering put: "+n)}sendPut_(e){const n=this.outstandingPuts_[e].action,r=this.outstandingPuts_[e].request,i=this.outstandingPuts_[e].onComplete;this.outstandingPuts_[e].queued=this.connected_,this.sendRequest(n,r,s=>{this.log_(n+" response",s),delete this.outstandingPuts_[e],this.outstandingPutCount_--,this.outstandingPutCount_===0&&(this.outstandingPuts_=[]),i&&i(s.s,s.d)})}reportStats(e){if(this.connected_){const n={c:e};this.log_("reportStats",n),this.sendRequest("s",n,r=>{if(r.s!=="ok"){const s=r.d;this.log_("reportStats","Error sending stats: "+s)}})}}onDataMessage_(e){if("r"in e){this.log_("from server: "+ne(e));const n=e.r,r=this.requestCBHash_[n];r&&(delete this.requestCBHash_[n],r(e.b))}else{if("error"in e)throw"A server-side error has occurred: "+e.error;"a"in e&&this.onDataPush_(e.a,e.b)}}onDataPush_(e,n){this.log_("handleServerMessage",e,n),e==="d"?this.onDataUpdate_(n.p,n.d,!1,n.t):e==="m"?this.onDataUpdate_(n.p,n.d,!0,n.t):e==="c"?this.onListenRevoked_(n.p,n.q):e==="ac"?this.onAuthRevoked_(n.s,n.d):e==="apc"?this.onAppCheckRevoked_(n.s,n.d):e==="sd"?this.onSecurityDebugPacket_(n):ba("Unrecognized action received from server: "+ne(e)+`
Are you using the latest client?`)}onReady_(e,n){this.log_("connection ready"),this.connected_=!0,this.lastConnectionEstablishedTime_=new Date().getTime(),this.handleTimestamp_(e),this.lastSessionId=n,this.firstConnection_&&this.sendConnectStats_(),this.restoreState_(),this.firstConnection_=!1,this.onConnectStatus_(!0)}scheduleConnect_(e){g(!this.realtime_,"Scheduling a connect when we're already connected/ing?"),this.establishConnectionTimer_&&clearTimeout(this.establishConnectionTimer_),this.establishConnectionTimer_=setTimeout(()=>{this.establishConnectionTimer_=null,this.establishConnection_()},Math.floor(e))}initConnection_(){!this.realtime_&&this.firstConnection_&&this.scheduleConnect_(0)}onVisible_(e){e&&!this.visible_&&this.reconnectDelay_===this.maxReconnectDelay_&&(this.log_("Window became visible.  Reducing delay."),this.reconnectDelay_=kr,this.realtime_||this.scheduleConnect_(0)),this.visible_=e}onOnline_(e){e?(this.log_("Browser went online."),this.reconnectDelay_=kr,this.realtime_||this.scheduleConnect_(0)):(this.log_("Browser went offline.  Killing connection."),this.realtime_&&this.realtime_.close())}onRealtimeDisconnect_(){if(this.log_("data client disconnected"),this.connected_=!1,this.realtime_=null,this.cancelSentTransactions_(),this.requestCBHash_={},this.shouldReconnect_()){this.visible_?this.lastConnectionEstablishedTime_&&(new Date().getTime()-this.lastConnectionEstablishedTime_>cC&&(this.reconnectDelay_=kr),this.lastConnectionEstablishedTime_=null):(this.log_("Window isn't visible.  Delaying reconnect."),this.reconnectDelay_=this.maxReconnectDelay_,this.lastConnectionAttemptTime_=new Date().getTime());const e=Math.max(0,new Date().getTime()-this.lastConnectionAttemptTime_);let n=Math.max(0,this.reconnectDelay_-e);n=Math.random()*n,this.log_("Trying to reconnect in "+n+"ms"),this.scheduleConnect_(n),this.reconnectDelay_=Math.min(this.maxReconnectDelay_,this.reconnectDelay_*aC)}this.onConnectStatus_(!1)}async establishConnection_(){if(this.shouldReconnect_()){this.log_("Making a connection attempt"),this.lastConnectionAttemptTime_=new Date().getTime(),this.lastConnectionEstablishedTime_=null;const e=this.onDataMessage_.bind(this),n=this.onReady_.bind(this),r=this.onRealtimeDisconnect_.bind(this),i=this.id+":"+pt.nextConnectionId_++,s=this.lastSessionId;let o=!1,a=null;const c=function(){a?a.close():(o=!0,r())},l=function(d){g(a,"sendRequest call when we're not connected not allowed."),a.sendRequest(d)};this.realtime_={close:c,sendRequest:l};const u=this.forceTokenRefresh_;this.forceTokenRefresh_=!1;try{const[d,h]=await Promise.all([this.authTokenProvider_.getToken(u),this.appCheckTokenProvider_.getToken(u)]);o?oe("getToken() completed but was canceled"):(oe("getToken() completed. Creating connection."),this.authToken_=d&&d.accessToken,this.appCheckToken_=h&&h.token,a=new eC(i,this.repoInfo_,this.applicationId_,this.appCheckToken_,this.authToken_,e,n,r,f=>{me(f+" ("+this.repoInfo_.toString()+")"),this.interrupt(lC)},s))}catch(d){this.log_("Failed to get token: "+d),o||(this.repoInfo_.nodeAdmin&&me(d),c())}}}interrupt(e){oe("Interrupting connection for reason: "+e),this.interruptReasons_[e]=!0,this.realtime_?this.realtime_.close():(this.establishConnectionTimer_&&(clearTimeout(this.establishConnectionTimer_),this.establishConnectionTimer_=null),this.connected_&&this.onRealtimeDisconnect_())}resume(e){oe("Resuming connection for reason: "+e),delete this.interruptReasons_[e],cs(this.interruptReasons_)&&(this.reconnectDelay_=kr,this.realtime_||this.scheduleConnect_(0))}handleTimestamp_(e){const n=e-new Date().getTime();this.onServerInfoUpdate_({serverTimeOffset:n})}cancelSentTransactions_(){for(let e=0;e<this.outstandingPuts_.length;e++){const n=this.outstandingPuts_[e];n&&"h"in n.request&&n.queued&&(n.onComplete&&n.onComplete("disconnect"),delete this.outstandingPuts_[e],this.outstandingPutCount_--)}this.outstandingPutCount_===0&&(this.outstandingPuts_=[])}onListenRevoked_(e,n){let r;n?r=n.map(s=>wc(s)).join("$"):r="default";const i=this.removeListen_(e,r);i&&i.onComplete&&i.onComplete("permission_denied")}removeListen_(e,n){const r=new L(e).toString();let i;if(this.listens.has(r)){const s=this.listens.get(r);i=s.get(n),s.delete(n),s.size===0&&this.listens.delete(r)}else i=void 0;return i}onAuthRevoked_(e,n){oe("Auth token revoked: "+e+"/"+n),this.authToken_=null,this.forceTokenRefresh_=!0,this.realtime_.close(),(e==="invalid_token"||e==="permission_denied")&&(this.invalidAuthTokenCount_++,this.invalidAuthTokenCount_>=pd&&(this.reconnectDelay_=fd,this.authTokenProvider_.notifyForInvalidToken()))}onAppCheckRevoked_(e,n){oe("App check token revoked: "+e+"/"+n),this.appCheckToken_=null,this.forceTokenRefresh_=!0,(e==="invalid_token"||e==="permission_denied")&&(this.invalidAppCheckTokenCount_++,this.invalidAppCheckTokenCount_>=pd&&this.appCheckTokenProvider_.notifyForInvalidToken())}onSecurityDebugPacket_(e){this.securityDebugCallback_?this.securityDebugCallback_(e):"msg"in e&&console.log("FIREBASE: "+e.msg.replace(`
`,`
FIREBASE: `))}restoreState_(){this.tryAuth(),this.tryAppCheck();for(const e of this.listens.values())for(const n of e.values())this.sendListen_(n);for(let e=0;e<this.outstandingPuts_.length;e++)this.outstandingPuts_[e]&&this.sendPut_(e);for(;this.onDisconnectRequestQueue_.length;){const e=this.onDisconnectRequestQueue_.shift();this.sendOnDisconnect_(e.action,e.pathString,e.data,e.onComplete)}for(let e=0;e<this.outstandingGets_.length;e++)this.outstandingGets_[e]&&this.sendGet_(e)}sendConnectStats_(){const e={};let n="js";e["sdk."+n+"."+Lf.replace(/\./g,"-")]=1,_c()?e["framework.cordova"]=1:Tf()&&(e["framework.reactnative"]=1),this.reportStats(e)}shouldReconnect_(){const e=hs.getInstance().currentlyOnline();return cs(this.interruptReasons_)&&e}}pt.nextPersistentConnectionId_=0;pt.nextConnectionId_=0;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
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
 */class Ks{getCompare(){return this.compare.bind(this)}indexedValueChanged(e,n){const r=new R(Qn,e),i=new R(Qn,n);return this.compare(r,i)!==0}minPost(){return R.MIN}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Mi;class ip extends Ks{static get __EMPTY_NODE(){return Mi}static set __EMPTY_NODE(e){Mi=e}compare(e,n){return Tn(e.name,n.name)}isDefinedOn(e){throw ur("KeyIndex.isDefinedOn not expected to be called.")}indexedValueChanged(e,n){return!1}minPost(){return R.MIN}maxPost(){return new R(gn,Mi)}makePost(e,n){return g(typeof e=="string","KeyIndex indexValue must always be a string."),new R(e,Mi)}toString(){return".key"}}const xn=new ip;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class xi{constructor(e,n,r,i,s=null){this.isReverse_=i,this.resultGenerator_=s,this.nodeStack_=[];let o=1;for(;!e.isEmpty();)if(e=e,o=n?r(e.key,n):1,i&&(o*=-1),o<0)this.isReverse_?e=e.left:e=e.right;else if(o===0){this.nodeStack_.push(e);break}else this.nodeStack_.push(e),this.isReverse_?e=e.right:e=e.left}getNext(){if(this.nodeStack_.length===0)return null;let e=this.nodeStack_.pop(),n;if(this.resultGenerator_?n=this.resultGenerator_(e.key,e.value):n={key:e.key,value:e.value},this.isReverse_)for(e=e.left;!e.isEmpty();)this.nodeStack_.push(e),e=e.right;else for(e=e.right;!e.isEmpty();)this.nodeStack_.push(e),e=e.left;return n}hasNext(){return this.nodeStack_.length>0}peek(){if(this.nodeStack_.length===0)return null;const e=this.nodeStack_[this.nodeStack_.length-1];return this.resultGenerator_?this.resultGenerator_(e.key,e.value):{key:e.key,value:e.value}}}class se{constructor(e,n,r,i,s){this.key=e,this.value=n,this.color=r??se.RED,this.left=i??we.EMPTY_NODE,this.right=s??we.EMPTY_NODE}copy(e,n,r,i,s){return new se(e??this.key,n??this.value,r??this.color,i??this.left,s??this.right)}count(){return this.left.count()+1+this.right.count()}isEmpty(){return!1}inorderTraversal(e){return this.left.inorderTraversal(e)||!!e(this.key,this.value)||this.right.inorderTraversal(e)}reverseTraversal(e){return this.right.reverseTraversal(e)||e(this.key,this.value)||this.left.reverseTraversal(e)}min_(){return this.left.isEmpty()?this:this.left.min_()}minKey(){return this.min_().key}maxKey(){return this.right.isEmpty()?this.key:this.right.maxKey()}insert(e,n,r){let i=this;const s=r(e,i.key);return s<0?i=i.copy(null,null,null,i.left.insert(e,n,r),null):s===0?i=i.copy(null,n,null,null,null):i=i.copy(null,null,null,null,i.right.insert(e,n,r)),i.fixUp_()}removeMin_(){if(this.left.isEmpty())return we.EMPTY_NODE;let e=this;return!e.left.isRed_()&&!e.left.left.isRed_()&&(e=e.moveRedLeft_()),e=e.copy(null,null,null,e.left.removeMin_(),null),e.fixUp_()}remove(e,n){let r,i;if(r=this,n(e,r.key)<0)!r.left.isEmpty()&&!r.left.isRed_()&&!r.left.left.isRed_()&&(r=r.moveRedLeft_()),r=r.copy(null,null,null,r.left.remove(e,n),null);else{if(r.left.isRed_()&&(r=r.rotateRight_()),!r.right.isEmpty()&&!r.right.isRed_()&&!r.right.left.isRed_()&&(r=r.moveRedRight_()),n(e,r.key)===0){if(r.right.isEmpty())return we.EMPTY_NODE;i=r.right.min_(),r=r.copy(i.key,i.value,null,null,r.right.removeMin_())}r=r.copy(null,null,null,null,r.right.remove(e,n))}return r.fixUp_()}isRed_(){return this.color}fixUp_(){let e=this;return e.right.isRed_()&&!e.left.isRed_()&&(e=e.rotateLeft_()),e.left.isRed_()&&e.left.left.isRed_()&&(e=e.rotateRight_()),e.left.isRed_()&&e.right.isRed_()&&(e=e.colorFlip_()),e}moveRedLeft_(){let e=this.colorFlip_();return e.right.left.isRed_()&&(e=e.copy(null,null,null,null,e.right.rotateRight_()),e=e.rotateLeft_(),e=e.colorFlip_()),e}moveRedRight_(){let e=this.colorFlip_();return e.left.left.isRed_()&&(e=e.rotateRight_(),e=e.colorFlip_()),e}rotateLeft_(){const e=this.copy(null,null,se.RED,null,this.right.left);return this.right.copy(null,null,this.color,e,null)}rotateRight_(){const e=this.copy(null,null,se.RED,this.left.right,null);return this.left.copy(null,null,this.color,null,e)}colorFlip_(){const e=this.left.copy(null,null,!this.left.color,null,null),n=this.right.copy(null,null,!this.right.color,null,null);return this.copy(null,null,!this.color,e,n)}checkMaxDepth_(){const e=this.check_();return Math.pow(2,e)<=this.count()+1}check_(){if(this.isRed_()&&this.left.isRed_())throw new Error("Red node has red child("+this.key+","+this.value+")");if(this.right.isRed_())throw new Error("Right child of ("+this.key+","+this.value+") is red");const e=this.left.check_();if(e!==this.right.check_())throw new Error("Black depths differ");return e+(this.isRed_()?0:1)}}se.RED=!0;se.BLACK=!1;class uC{copy(e,n,r,i,s){return this}insert(e,n,r){return new se(e,n,null)}remove(e,n){return this}count(){return 0}isEmpty(){return!0}inorderTraversal(e){return!1}reverseTraversal(e){return!1}minKey(){return null}maxKey(){return null}check_(){return 0}isRed_(){return!1}}class we{constructor(e,n=we.EMPTY_NODE){this.comparator_=e,this.root_=n}insert(e,n){return new we(this.comparator_,this.root_.insert(e,n,this.comparator_).copy(null,null,se.BLACK,null,null))}remove(e){return new we(this.comparator_,this.root_.remove(e,this.comparator_).copy(null,null,se.BLACK,null,null))}get(e){let n,r=this.root_;for(;!r.isEmpty();){if(n=this.comparator_(e,r.key),n===0)return r.value;n<0?r=r.left:n>0&&(r=r.right)}return null}getPredecessorKey(e){let n,r=this.root_,i=null;for(;!r.isEmpty();)if(n=this.comparator_(e,r.key),n===0){if(r.left.isEmpty())return i?i.key:null;for(r=r.left;!r.right.isEmpty();)r=r.right;return r.key}else n<0?r=r.left:n>0&&(i=r,r=r.right);throw new Error("Attempted to find predecessor key for a nonexistent key.  What gives?")}isEmpty(){return this.root_.isEmpty()}count(){return this.root_.count()}minKey(){return this.root_.minKey()}maxKey(){return this.root_.maxKey()}inorderTraversal(e){return this.root_.inorderTraversal(e)}reverseTraversal(e){return this.root_.reverseTraversal(e)}getIterator(e){return new xi(this.root_,null,this.comparator_,!1,e)}getIteratorFrom(e,n){return new xi(this.root_,e,this.comparator_,!1,n)}getReverseIteratorFrom(e,n){return new xi(this.root_,e,this.comparator_,!0,n)}getReverseIterator(e){return new xi(this.root_,null,this.comparator_,!0,e)}}we.EMPTY_NODE=new uC;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function dC(t,e){return Tn(t.name,e.name)}function Rc(t,e){return Tn(t,e)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Ca;function hC(t){Ca=t}const sp=function(t){return typeof t=="number"?"number:"+Ff(t):"string:"+t},op=function(t){if(t.isLeafNode()){const e=t.val();g(typeof e=="string"||typeof e=="number"||typeof e=="object"&&nt(e,".sv"),"Priority must be a string or number.")}else g(t===Ca||t.isEmpty(),"priority of unexpected type.");g(t===Ca||t.getPriority().isEmpty(),"Priority nodes can't have a priority of their own.")};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let gd;class ie{static set __childrenNodeConstructor(e){gd=e}static get __childrenNodeConstructor(){return gd}constructor(e,n=ie.__childrenNodeConstructor.EMPTY_NODE){this.value_=e,this.priorityNode_=n,this.lazyHash_=null,g(this.value_!==void 0&&this.value_!==null,"LeafNode shouldn't be created with null/undefined value."),op(this.priorityNode_)}isLeafNode(){return!0}getPriority(){return this.priorityNode_}updatePriority(e){return new ie(this.value_,e)}getImmediateChild(e){return e===".priority"?this.priorityNode_:ie.__childrenNodeConstructor.EMPTY_NODE}getChild(e){return k(e)?this:I(e)===".priority"?this.priorityNode_:ie.__childrenNodeConstructor.EMPTY_NODE}hasChild(){return!1}getPredecessorChildName(e,n){return null}updateImmediateChild(e,n){return e===".priority"?this.updatePriority(n):n.isEmpty()&&e!==".priority"?this:ie.__childrenNodeConstructor.EMPTY_NODE.updateImmediateChild(e,n).updatePriority(this.priorityNode_)}updateChild(e,n){const r=I(e);return r===null?n:n.isEmpty()&&r!==".priority"?this:(g(r!==".priority"||Ht(e)===1,".priority must be the last token in a path"),this.updateImmediateChild(r,ie.__childrenNodeConstructor.EMPTY_NODE.updateChild(x(e),n)))}isEmpty(){return!1}numChildren(){return 0}forEachChild(e,n){return!1}val(e){return e&&!this.getPriority().isEmpty()?{".value":this.getValue(),".priority":this.getPriority().val()}:this.getValue()}hash(){if(this.lazyHash_===null){let e="";this.priorityNode_.isEmpty()||(e+="priority:"+sp(this.priorityNode_.val())+":");const n=typeof this.value_;e+=n+":",n==="number"?e+=Ff(this.value_):e+=this.value_,this.lazyHash_=Mf(e)}return this.lazyHash_}getValue(){return this.value_}compareTo(e){return e===ie.__childrenNodeConstructor.EMPTY_NODE?1:e instanceof ie.__childrenNodeConstructor?-1:(g(e.isLeafNode(),"Unknown node type"),this.compareToLeafNode_(e))}compareToLeafNode_(e){const n=typeof e.value_,r=typeof this.value_,i=ie.VALUE_TYPE_ORDER.indexOf(n),s=ie.VALUE_TYPE_ORDER.indexOf(r);return g(i>=0,"Unknown leaf type: "+n),g(s>=0,"Unknown leaf type: "+r),i===s?r==="object"?0:this.value_<e.value_?-1:this.value_===e.value_?0:1:s-i}withIndex(){return this}isIndexed(){return!0}equals(e){if(e===this)return!0;if(e.isLeafNode()){const n=e;return this.value_===n.value_&&this.priorityNode_.equals(n.priorityNode_)}else return!1}}ie.VALUE_TYPE_ORDER=["object","boolean","number","string"];/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let ap,cp;function fC(t){ap=t}function pC(t){cp=t}class gC extends Ks{compare(e,n){const r=e.node.getPriority(),i=n.node.getPriority(),s=r.compareTo(i);return s===0?Tn(e.name,n.name):s}isDefinedOn(e){return!e.getPriority().isEmpty()}indexedValueChanged(e,n){return!e.getPriority().equals(n.getPriority())}minPost(){return R.MIN}maxPost(){return new R(gn,new ie("[PRIORITY-POST]",cp))}makePost(e,n){const r=ap(e);return new R(n,new ie("[PRIORITY-POST]",r))}toString(){return".priority"}}const Y=new gC;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const mC=Math.log(2);class _C{constructor(e){const n=s=>parseInt(Math.log(s)/mC,10),r=s=>parseInt(Array(s+1).join("1"),2);this.count=n(e+1),this.current_=this.count-1;const i=r(this.count);this.bits_=e+1&i}nextBitIsOne(){const e=!(this.bits_&1<<this.current_);return this.current_--,e}}const fs=function(t,e,n,r){t.sort(e);const i=function(c,l){const u=l-c;let d,h;if(u===0)return null;if(u===1)return d=t[c],h=n?n(d):d,new se(h,d.node,se.BLACK,null,null);{const f=parseInt(u/2,10)+c,p=i(c,f),_=i(f+1,l);return d=t[f],h=n?n(d):d,new se(h,d.node,se.BLACK,p,_)}},s=function(c){let l=null,u=null,d=t.length;const h=function(p,_){const m=d-p,T=d;d-=p;const V=i(m+1,T),$=t[m],w=n?n($):$;f(new se(w,$.node,_,null,V))},f=function(p){l?(l.left=p,l=p):(u=p,l=p)};for(let p=0;p<c.count;++p){const _=c.nextBitIsOne(),m=Math.pow(2,c.count-(p+1));_?h(m,se.BLACK):(h(m,se.BLACK),h(m,se.RED))}return u},o=new _C(t.length),a=s(o);return new we(r||e,a)};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let $o;const An={};class st{static get Default(){return g(An&&Y,"ChildrenNode.ts has not been loaded"),$o=$o||new st({".priority":An},{".priority":Y}),$o}constructor(e,n){this.indexes_=e,this.indexSet_=n}get(e){const n=Jn(this.indexes_,e);if(!n)throw new Error("No index defined for "+e);return n instanceof we?n:null}hasIndex(e){return nt(this.indexSet_,e.toString())}addIndex(e,n){g(e!==xn,"KeyIndex always exists and isn't meant to be added to the IndexMap.");const r=[];let i=!1;const s=n.getIterator(R.Wrap);let o=s.getNext();for(;o;)i=i||e.isDefinedOn(o.node),r.push(o),o=s.getNext();let a;i?a=fs(r,e.getCompare()):a=An;const c=e.toString(),l={...this.indexSet_};l[c]=e;const u={...this.indexes_};return u[c]=a,new st(u,l)}addToIndexes(e,n){const r=ls(this.indexes_,(i,s)=>{const o=Jn(this.indexSet_,s);if(g(o,"Missing index implementation for "+s),i===An)if(o.isDefinedOn(e.node)){const a=[],c=n.getIterator(R.Wrap);let l=c.getNext();for(;l;)l.name!==e.name&&a.push(l),l=c.getNext();return a.push(e),fs(a,o.getCompare())}else return An;else{const a=n.get(e.name);let c=i;return a&&(c=c.remove(new R(e.name,a))),c.insert(e,e.node)}});return new st(r,this.indexSet_)}removeFromIndexes(e,n){const r=ls(this.indexes_,i=>{if(i===An)return i;{const s=n.get(e.name);return s?i.remove(new R(e.name,s)):i}});return new st(r,this.indexSet_)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Rr;class v{static get EMPTY_NODE(){return Rr||(Rr=new v(new we(Rc),null,st.Default))}constructor(e,n,r){this.children_=e,this.priorityNode_=n,this.indexMap_=r,this.lazyHash_=null,this.priorityNode_&&op(this.priorityNode_),this.children_.isEmpty()&&g(!this.priorityNode_||this.priorityNode_.isEmpty(),"An empty node cannot have a priority")}isLeafNode(){return!1}getPriority(){return this.priorityNode_||Rr}updatePriority(e){return this.children_.isEmpty()?this:new v(this.children_,e,this.indexMap_)}getImmediateChild(e){if(e===".priority")return this.getPriority();{const n=this.children_.get(e);return n===null?Rr:n}}getChild(e){const n=I(e);return n===null?this:this.getImmediateChild(n).getChild(x(e))}hasChild(e){return this.children_.get(e)!==null}updateImmediateChild(e,n){if(g(n,"We should always be passing snapshot nodes"),e===".priority")return this.updatePriority(n);{const r=new R(e,n);let i,s;n.isEmpty()?(i=this.children_.remove(e),s=this.indexMap_.removeFromIndexes(r,this.children_)):(i=this.children_.insert(e,n),s=this.indexMap_.addToIndexes(r,this.children_));const o=i.isEmpty()?Rr:this.priorityNode_;return new v(i,o,s)}}updateChild(e,n){const r=I(e);if(r===null)return n;{g(I(e)!==".priority"||Ht(e)===1,".priority must be the last token in a path");const i=this.getImmediateChild(r).updateChild(x(e),n);return this.updateImmediateChild(r,i)}}isEmpty(){return this.children_.isEmpty()}numChildren(){return this.children_.count()}val(e){if(this.isEmpty())return null;const n={};let r=0,i=0,s=!0;if(this.forEachChild(Y,(o,a)=>{n[o]=a.val(e),r++,s&&v.INTEGER_REGEXP_.test(o)?i=Math.max(i,Number(o)):s=!1}),!e&&s&&i<2*r){const o=[];for(const a in n)o[a]=n[a];return o}else return e&&!this.getPriority().isEmpty()&&(n[".priority"]=this.getPriority().val()),n}hash(){if(this.lazyHash_===null){let e="";this.getPriority().isEmpty()||(e+="priority:"+sp(this.getPriority().val())+":"),this.forEachChild(Y,(n,r)=>{const i=r.hash();i!==""&&(e+=":"+n+":"+i)}),this.lazyHash_=e===""?"":Mf(e)}return this.lazyHash_}getPredecessorChildName(e,n,r){const i=this.resolveIndex_(r);if(i){const s=i.getPredecessorKey(new R(e,n));return s?s.name:null}else return this.children_.getPredecessorKey(e)}getFirstChildName(e){const n=this.resolveIndex_(e);if(n){const r=n.minKey();return r&&r.name}else return this.children_.minKey()}getFirstChild(e){const n=this.getFirstChildName(e);return n?new R(n,this.children_.get(n)):null}getLastChildName(e){const n=this.resolveIndex_(e);if(n){const r=n.maxKey();return r&&r.name}else return this.children_.maxKey()}getLastChild(e){const n=this.getLastChildName(e);return n?new R(n,this.children_.get(n)):null}forEachChild(e,n){const r=this.resolveIndex_(e);return r?r.inorderTraversal(i=>n(i.name,i.node)):this.children_.inorderTraversal(n)}getIterator(e){return this.getIteratorFrom(e.minPost(),e)}getIteratorFrom(e,n){const r=this.resolveIndex_(n);if(r)return r.getIteratorFrom(e,i=>i);{const i=this.children_.getIteratorFrom(e.name,R.Wrap);let s=i.peek();for(;s!=null&&n.compare(s,e)<0;)i.getNext(),s=i.peek();return i}}getReverseIterator(e){return this.getReverseIteratorFrom(e.maxPost(),e)}getReverseIteratorFrom(e,n){const r=this.resolveIndex_(n);if(r)return r.getReverseIteratorFrom(e,i=>i);{const i=this.children_.getReverseIteratorFrom(e.name,R.Wrap);let s=i.peek();for(;s!=null&&n.compare(s,e)>0;)i.getNext(),s=i.peek();return i}}compareTo(e){return this.isEmpty()?e.isEmpty()?0:-1:e.isLeafNode()||e.isEmpty()?1:e===wi?-1:0}withIndex(e){if(e===xn||this.indexMap_.hasIndex(e))return this;{const n=this.indexMap_.addIndex(e,this.children_);return new v(this.children_,this.priorityNode_,n)}}isIndexed(e){return e===xn||this.indexMap_.hasIndex(e)}equals(e){if(e===this)return!0;if(e.isLeafNode())return!1;{const n=e;if(this.getPriority().equals(n.getPriority()))if(this.children_.count()===n.children_.count()){const r=this.getIterator(Y),i=n.getIterator(Y);let s=r.getNext(),o=i.getNext();for(;s&&o;){if(s.name!==o.name||!s.node.equals(o.node))return!1;s=r.getNext(),o=i.getNext()}return s===null&&o===null}else return!1;else return!1}}resolveIndex_(e){return e===xn?null:this.indexMap_.get(e.toString())}}v.INTEGER_REGEXP_=/^(0|[1-9]\d*)$/;class yC extends v{constructor(){super(new we(Rc),v.EMPTY_NODE,st.Default)}compareTo(e){return e===this?0:1}equals(e){return e===this}getPriority(){return this}getImmediateChild(e){return v.EMPTY_NODE}isEmpty(){return!1}}const wi=new yC;Object.defineProperties(R,{MIN:{value:new R(Qn,v.EMPTY_NODE)},MAX:{value:new R(gn,wi)}});ip.__EMPTY_NODE=v.EMPTY_NODE;ie.__childrenNodeConstructor=v;hC(wi);pC(wi);/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const EC=!0;function K(t,e=null){if(t===null)return v.EMPTY_NODE;if(typeof t=="object"&&".priority"in t&&(e=t[".priority"]),g(e===null||typeof e=="string"||typeof e=="number"||typeof e=="object"&&".sv"in e,"Invalid priority type found: "+typeof e),typeof t=="object"&&".value"in t&&t[".value"]!==null&&(t=t[".value"]),typeof t!="object"||".sv"in t){const n=t;return new ie(n,K(e))}if(!(t instanceof Array)&&EC){const n=[];let r=!1;if(ae(t,(o,a)=>{if(o.substring(0,1)!=="."){const c=K(a);c.isEmpty()||(r=r||!c.getPriority().isEmpty(),n.push(new R(o,c)))}}),n.length===0)return v.EMPTY_NODE;const s=fs(n,dC,o=>o.name,Rc);if(r){const o=fs(n,Y.getCompare());return new v(s,K(e),new st({".priority":o},{".priority":Y}))}else return new v(s,K(e),st.Default)}else{let n=v.EMPTY_NODE;return ae(t,(r,i)=>{if(nt(t,r)&&r.substring(0,1)!=="."){const s=K(i);(s.isLeafNode()||!s.isEmpty())&&(n=n.updateImmediateChild(r,s))}}),n.updatePriority(K(e))}}fC(K);/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class vC extends Ks{constructor(e){super(),this.indexPath_=e,g(!k(e)&&I(e)!==".priority","Can't create PathIndex with empty path or .priority key")}extractChild(e){return e.getChild(this.indexPath_)}isDefinedOn(e){return!e.getChild(this.indexPath_).isEmpty()}compare(e,n){const r=this.extractChild(e.node),i=this.extractChild(n.node),s=r.compareTo(i);return s===0?Tn(e.name,n.name):s}makePost(e,n){const r=K(e),i=v.EMPTY_NODE.updateChild(this.indexPath_,r);return new R(n,i)}maxPost(){const e=v.EMPTY_NODE.updateChild(this.indexPath_,wi);return new R(gn,e)}toString(){return ti(this.indexPath_,0).join("/")}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class wC extends Ks{compare(e,n){const r=e.node.compareTo(n.node);return r===0?Tn(e.name,n.name):r}isDefinedOn(e){return!0}indexedValueChanged(e,n){return!e.equals(n)}minPost(){return R.MIN}maxPost(){return R.MAX}makePost(e,n){const r=K(e);return new R(n,r)}toString(){return".value"}}const bC=new wC;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function lp(t){return{type:"value",snapshotNode:t}}function Zn(t,e){return{type:"child_added",snapshotNode:e,childName:t}}function ni(t,e){return{type:"child_removed",snapshotNode:e,childName:t}}function ri(t,e,n){return{type:"child_changed",snapshotNode:e,childName:t,oldSnap:n}}function SC(t,e){return{type:"child_moved",snapshotNode:e,childName:t}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ac{constructor(e){this.index_=e}updateChild(e,n,r,i,s,o){g(e.isIndexed(this.index_),"A node must be indexed if only a child is updated");const a=e.getImmediateChild(n);return a.getChild(i).equals(r.getChild(i))&&a.isEmpty()===r.isEmpty()||(o!=null&&(r.isEmpty()?e.hasChild(n)?o.trackChildChange(ni(n,a)):g(e.isLeafNode(),"A child remove without an old child only makes sense on a leaf node"):a.isEmpty()?o.trackChildChange(Zn(n,r)):o.trackChildChange(ri(n,r,a))),e.isLeafNode()&&r.isEmpty())?e:e.updateImmediateChild(n,r).withIndex(this.index_)}updateFullNode(e,n,r){return r!=null&&(e.isLeafNode()||e.forEachChild(Y,(i,s)=>{n.hasChild(i)||r.trackChildChange(ni(i,s))}),n.isLeafNode()||n.forEachChild(Y,(i,s)=>{if(e.hasChild(i)){const o=e.getImmediateChild(i);o.equals(s)||r.trackChildChange(ri(i,s,o))}else r.trackChildChange(Zn(i,s))})),n.withIndex(this.index_)}updatePriority(e,n){return e.isEmpty()?v.EMPTY_NODE:e.updatePriority(n)}filtersNodes(){return!1}getIndexedFilter(){return this}getIndex(){return this.index_}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ii{constructor(e){this.indexedFilter_=new Ac(e.getIndex()),this.index_=e.getIndex(),this.startPost_=ii.getStartPost_(e),this.endPost_=ii.getEndPost_(e),this.startIsInclusive_=!e.startAfterSet_,this.endIsInclusive_=!e.endBeforeSet_}getStartPost(){return this.startPost_}getEndPost(){return this.endPost_}matches(e){const n=this.startIsInclusive_?this.index_.compare(this.getStartPost(),e)<=0:this.index_.compare(this.getStartPost(),e)<0,r=this.endIsInclusive_?this.index_.compare(e,this.getEndPost())<=0:this.index_.compare(e,this.getEndPost())<0;return n&&r}updateChild(e,n,r,i,s,o){return this.matches(new R(n,r))||(r=v.EMPTY_NODE),this.indexedFilter_.updateChild(e,n,r,i,s,o)}updateFullNode(e,n,r){n.isLeafNode()&&(n=v.EMPTY_NODE);let i=n.withIndex(this.index_);i=i.updatePriority(v.EMPTY_NODE);const s=this;return n.forEachChild(Y,(o,a)=>{s.matches(new R(o,a))||(i=i.updateImmediateChild(o,v.EMPTY_NODE))}),this.indexedFilter_.updateFullNode(e,i,r)}updatePriority(e,n){return e}filtersNodes(){return!0}getIndexedFilter(){return this.indexedFilter_}getIndex(){return this.index_}static getStartPost_(e){if(e.hasStart()){const n=e.getIndexStartName();return e.getIndex().makePost(e.getIndexStartValue(),n)}else return e.getIndex().minPost()}static getEndPost_(e){if(e.hasEnd()){const n=e.getIndexEndName();return e.getIndex().makePost(e.getIndexEndValue(),n)}else return e.getIndex().maxPost()}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class CC{constructor(e){this.withinDirectionalStart=n=>this.reverse_?this.withinEndPost(n):this.withinStartPost(n),this.withinDirectionalEnd=n=>this.reverse_?this.withinStartPost(n):this.withinEndPost(n),this.withinStartPost=n=>{const r=this.index_.compare(this.rangedFilter_.getStartPost(),n);return this.startIsInclusive_?r<=0:r<0},this.withinEndPost=n=>{const r=this.index_.compare(n,this.rangedFilter_.getEndPost());return this.endIsInclusive_?r<=0:r<0},this.rangedFilter_=new ii(e),this.index_=e.getIndex(),this.limit_=e.getLimit(),this.reverse_=!e.isViewFromLeft(),this.startIsInclusive_=!e.startAfterSet_,this.endIsInclusive_=!e.endBeforeSet_}updateChild(e,n,r,i,s,o){return this.rangedFilter_.matches(new R(n,r))||(r=v.EMPTY_NODE),e.getImmediateChild(n).equals(r)?e:e.numChildren()<this.limit_?this.rangedFilter_.getIndexedFilter().updateChild(e,n,r,i,s,o):this.fullLimitUpdateChild_(e,n,r,s,o)}updateFullNode(e,n,r){let i;if(n.isLeafNode()||n.isEmpty())i=v.EMPTY_NODE.withIndex(this.index_);else if(this.limit_*2<n.numChildren()&&n.isIndexed(this.index_)){i=v.EMPTY_NODE.withIndex(this.index_);let s;this.reverse_?s=n.getReverseIteratorFrom(this.rangedFilter_.getEndPost(),this.index_):s=n.getIteratorFrom(this.rangedFilter_.getStartPost(),this.index_);let o=0;for(;s.hasNext()&&o<this.limit_;){const a=s.getNext();if(this.withinDirectionalStart(a))if(this.withinDirectionalEnd(a))i=i.updateImmediateChild(a.name,a.node),o++;else break;else continue}}else{i=n.withIndex(this.index_),i=i.updatePriority(v.EMPTY_NODE);let s;this.reverse_?s=i.getReverseIterator(this.index_):s=i.getIterator(this.index_);let o=0;for(;s.hasNext();){const a=s.getNext();o<this.limit_&&this.withinDirectionalStart(a)&&this.withinDirectionalEnd(a)?o++:i=i.updateImmediateChild(a.name,v.EMPTY_NODE)}}return this.rangedFilter_.getIndexedFilter().updateFullNode(e,i,r)}updatePriority(e,n){return e}filtersNodes(){return!0}getIndexedFilter(){return this.rangedFilter_.getIndexedFilter()}getIndex(){return this.index_}fullLimitUpdateChild_(e,n,r,i,s){let o;if(this.reverse_){const d=this.index_.getCompare();o=(h,f)=>d(f,h)}else o=this.index_.getCompare();const a=e;g(a.numChildren()===this.limit_,"");const c=new R(n,r),l=this.reverse_?a.getFirstChild(this.index_):a.getLastChild(this.index_),u=this.rangedFilter_.matches(c);if(a.hasChild(n)){const d=a.getImmediateChild(n);let h=i.getChildAfterChild(this.index_,l,this.reverse_);for(;h!=null&&(h.name===n||a.hasChild(h.name));)h=i.getChildAfterChild(this.index_,h,this.reverse_);const f=h==null?1:o(h,c);if(u&&!r.isEmpty()&&f>=0)return s?.trackChildChange(ri(n,r,d)),a.updateImmediateChild(n,r);{s?.trackChildChange(ni(n,d));const _=a.updateImmediateChild(n,v.EMPTY_NODE);return h!=null&&this.rangedFilter_.matches(h)?(s?.trackChildChange(Zn(h.name,h.node)),_.updateImmediateChild(h.name,h.node)):_}}else return r.isEmpty()?e:u&&o(l,c)>=0?(s!=null&&(s.trackChildChange(ni(l.name,l.node)),s.trackChildChange(Zn(n,r))),a.updateImmediateChild(n,r).updateImmediateChild(l.name,v.EMPTY_NODE)):e}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Js{constructor(){this.limitSet_=!1,this.startSet_=!1,this.startNameSet_=!1,this.startAfterSet_=!1,this.endSet_=!1,this.endNameSet_=!1,this.endBeforeSet_=!1,this.limit_=0,this.viewFrom_="",this.indexStartValue_=null,this.indexStartName_="",this.indexEndValue_=null,this.indexEndName_="",this.index_=Y}hasStart(){return this.startSet_}isViewFromLeft(){return this.viewFrom_===""?this.startSet_:this.viewFrom_==="l"}getIndexStartValue(){return g(this.startSet_,"Only valid if start has been set"),this.indexStartValue_}getIndexStartName(){return g(this.startSet_,"Only valid if start has been set"),this.startNameSet_?this.indexStartName_:Qn}hasEnd(){return this.endSet_}getIndexEndValue(){return g(this.endSet_,"Only valid if end has been set"),this.indexEndValue_}getIndexEndName(){return g(this.endSet_,"Only valid if end has been set"),this.endNameSet_?this.indexEndName_:gn}hasLimit(){return this.limitSet_}hasAnchoredLimit(){return this.limitSet_&&this.viewFrom_!==""}getLimit(){return g(this.limitSet_,"Only valid if limit has been set"),this.limit_}getIndex(){return this.index_}loadsAllData(){return!(this.startSet_||this.endSet_||this.limitSet_)}isDefault(){return this.loadsAllData()&&this.index_===Y}copy(){const e=new Js;return e.limitSet_=this.limitSet_,e.limit_=this.limit_,e.startSet_=this.startSet_,e.startAfterSet_=this.startAfterSet_,e.indexStartValue_=this.indexStartValue_,e.startNameSet_=this.startNameSet_,e.indexStartName_=this.indexStartName_,e.endSet_=this.endSet_,e.endBeforeSet_=this.endBeforeSet_,e.indexEndValue_=this.indexEndValue_,e.endNameSet_=this.endNameSet_,e.indexEndName_=this.indexEndName_,e.index_=this.index_,e.viewFrom_=this.viewFrom_,e}}function TC(t){return t.loadsAllData()?new Ac(t.getIndex()):t.hasLimit()?new CC(t):new ii(t)}function md(t){const e={};if(t.isDefault())return e;let n;if(t.index_===Y?n="$priority":t.index_===bC?n="$value":t.index_===xn?n="$key":(g(t.index_ instanceof vC,"Unrecognized index type!"),n=t.index_.toString()),e.orderBy=ne(n),t.startSet_){const r=t.startAfterSet_?"startAfter":"startAt";e[r]=ne(t.indexStartValue_),t.startNameSet_&&(e[r]+=","+ne(t.indexStartName_))}if(t.endSet_){const r=t.endBeforeSet_?"endBefore":"endAt";e[r]=ne(t.indexEndValue_),t.endNameSet_&&(e[r]+=","+ne(t.indexEndName_))}return t.limitSet_&&(t.isViewFromLeft()?e.limitToFirst=t.limit_:e.limitToLast=t.limit_),e}function _d(t){const e={};if(t.startSet_&&(e.sp=t.indexStartValue_,t.startNameSet_&&(e.sn=t.indexStartName_),e.sin=!t.startAfterSet_),t.endSet_&&(e.ep=t.indexEndValue_,t.endNameSet_&&(e.en=t.indexEndName_),e.ein=!t.endBeforeSet_),t.limitSet_){e.l=t.limit_;let n=t.viewFrom_;n===""&&(t.isViewFromLeft()?n="l":n="r"),e.vf=n}return t.index_!==Y&&(e.i=t.index_.toString()),e}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ps extends ep{reportStats(e){throw new Error("Method not implemented.")}static getListenId_(e,n){return n!==void 0?"tag$"+n:(g(e._queryParams.isDefault(),"should have a tag if it's not a default query."),e._path.toString())}constructor(e,n,r,i){super(),this.repoInfo_=e,this.onDataUpdate_=n,this.authTokenProvider_=r,this.appCheckTokenProvider_=i,this.log_=vi("p:rest:"),this.listens_={}}listen(e,n,r,i){const s=e._path.toString();this.log_("Listen called for "+s+" "+e._queryIdentifier);const o=ps.getListenId_(e,r),a={};this.listens_[o]=a;const c=md(e._queryParams);this.restRequest_(s+".json",c,(l,u)=>{let d=u;if(l===404&&(d=null,l=null),l===null&&this.onDataUpdate_(s,d,!1,r),Jn(this.listens_,o)===a){let h;l?l===401?h="permission_denied":h="rest_error:"+l:h="ok",i(h,null)}})}unlisten(e,n){const r=ps.getListenId_(e,n);delete this.listens_[r]}get(e){const n=md(e._queryParams),r=e._path.toString(),i=new ve;return this.restRequest_(r+".json",n,(s,o)=>{let a=o;s===404&&(a=null,s=null),s===null?(this.onDataUpdate_(r,a,!1,null),i.resolve(a)):i.reject(new Error(a))}),i.promise}refreshAuthToken(e){}restRequest_(e,n={},r){return n.format="export",Promise.all([this.authTokenProvider_.getToken(!1),this.appCheckTokenProvider_.getToken(!1)]).then(([i,s])=>{i&&i.accessToken&&(n.auth=i.accessToken),s&&s.token&&(n.ac=s.token);const o=(this.repoInfo_.secure?"https://":"http://")+this.repoInfo_.host+e+"?ns="+this.repoInfo_.namespace+fr(n);this.log_("Sending REST request for "+o);const a=new XMLHttpRequest;a.onreadystatechange=()=>{if(r&&a.readyState===4){this.log_("REST Response for "+o+" received. status:",a.status,"response:",a.responseText);let c=null;if(a.status>=200&&a.status<300){try{c=Qr(a.responseText)}catch{me("Failed to parse JSON response for "+o+": "+a.responseText)}r(null,c)}else a.status!==401&&a.status!==404&&me("Got unsuccessful REST response for "+o+" Status: "+a.status),r(a.status);r=null}},a.open("GET",o,!0),a.send()})}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class IC{constructor(){this.rootNode_=v.EMPTY_NODE}getNode(e){return this.rootNode_.getChild(e)}updateSnapshot(e,n){this.rootNode_=this.rootNode_.updateChild(e,n)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function gs(){return{value:null,children:new Map}}function mr(t,e,n){if(k(e))t.value=n,t.children.clear();else if(t.value!==null)t.value=t.value.updateChild(e,n);else{const r=I(e);t.children.has(r)||t.children.set(r,gs());const i=t.children.get(r);e=x(e),mr(i,e,n)}}function Ta(t,e){if(k(e))return t.value=null,t.children.clear(),!0;if(t.value!==null){if(t.value.isLeafNode())return!1;{const n=t.value;return t.value=null,n.forEachChild(Y,(r,i)=>{mr(t,new L(r),i)}),Ta(t,e)}}else if(t.children.size>0){const n=I(e);return e=x(e),t.children.has(n)&&Ta(t.children.get(n),e)&&t.children.delete(n),t.children.size===0}else return!0}function Ia(t,e,n){t.value!==null?n(e,t.value):kC(t,(r,i)=>{const s=new L(e.toString()+"/"+r);Ia(i,s,n)})}function kC(t,e){t.children.forEach((n,r)=>{e(r,n)})}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class RC{constructor(e){this.collection_=e,this.last_=null}get(){const e=this.collection_.get(),n={...e};return this.last_&&ae(this.last_,(r,i)=>{n[r]=n[r]-i}),this.last_=e,n}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const yd=10*1e3,AC=30*1e3,PC=300*1e3;class NC{constructor(e,n){this.server_=n,this.statsToReport_={},this.statsListener_=new RC(e);const r=yd+(AC-yd)*Math.random();Fr(this.reportStats_.bind(this),Math.floor(r))}reportStats_(){const e=this.statsListener_.get(),n={};let r=!1;ae(e,(i,s)=>{s>0&&nt(this.statsToReport_,i)&&(n[i]=s,r=!0)}),r&&this.server_.reportStats(n),Fr(this.reportStats_.bind(this),Math.floor(Math.random()*2*PC))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var Be;(function(t){t[t.OVERWRITE=0]="OVERWRITE",t[t.MERGE=1]="MERGE",t[t.ACK_USER_WRITE=2]="ACK_USER_WRITE",t[t.LISTEN_COMPLETE=3]="LISTEN_COMPLETE"})(Be||(Be={}));function Pc(){return{fromUser:!0,fromServer:!1,queryId:null,tagged:!1}}function Nc(){return{fromUser:!1,fromServer:!0,queryId:null,tagged:!1}}function Lc(t){return{fromUser:!1,fromServer:!0,queryId:t,tagged:!0}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ms{constructor(e,n,r){this.path=e,this.affectedTree=n,this.revert=r,this.type=Be.ACK_USER_WRITE,this.source=Pc()}operationForChild(e){if(k(this.path)){if(this.affectedTree.value!=null)return g(this.affectedTree.children.isEmpty(),"affectedTree should not have overlapping affected paths."),this;{const n=this.affectedTree.subtree(new L(e));return new ms(P(),n,this.revert)}}else return g(I(this.path)===e,"operationForChild called for unrelated child."),new ms(x(this.path),this.affectedTree,this.revert)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class si{constructor(e,n){this.source=e,this.path=n,this.type=Be.LISTEN_COMPLETE}operationForChild(e){return k(this.path)?new si(this.source,P()):new si(this.source,x(this.path))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class mn{constructor(e,n,r){this.source=e,this.path=n,this.snap=r,this.type=Be.OVERWRITE}operationForChild(e){return k(this.path)?new mn(this.source,P(),this.snap.getImmediateChild(e)):new mn(this.source,x(this.path),this.snap)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class er{constructor(e,n,r){this.source=e,this.path=n,this.children=r,this.type=Be.MERGE}operationForChild(e){if(k(this.path)){const n=this.children.subtree(new L(e));return n.isEmpty()?null:n.value?new mn(this.source,P(),n.value):new er(this.source,P(),n)}else return g(I(this.path)===e,"Can't get a merge for a child not on the path of the operation"),new er(this.source,x(this.path),this.children)}toString(){return"Operation("+this.path+": "+this.source.toString()+" merge: "+this.children.toString()+")"}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Wt{constructor(e,n,r){this.node_=e,this.fullyInitialized_=n,this.filtered_=r}isFullyInitialized(){return this.fullyInitialized_}isFiltered(){return this.filtered_}isCompleteForPath(e){if(k(e))return this.isFullyInitialized()&&!this.filtered_;const n=I(e);return this.isCompleteForChild(n)}isCompleteForChild(e){return this.isFullyInitialized()&&!this.filtered_||this.node_.hasChild(e)}getNode(){return this.node_}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class LC{constructor(e){this.query_=e,this.index_=this.query_._queryParams.getIndex()}}function OC(t,e,n,r){const i=[],s=[];return e.forEach(o=>{o.type==="child_changed"&&t.index_.indexedValueChanged(o.oldSnap,o.snapshotNode)&&s.push(SC(o.childName,o.snapshotNode))}),Ar(t,i,"child_removed",e,r,n),Ar(t,i,"child_added",e,r,n),Ar(t,i,"child_moved",s,r,n),Ar(t,i,"child_changed",e,r,n),Ar(t,i,"value",e,r,n),i}function Ar(t,e,n,r,i,s){const o=r.filter(a=>a.type===n);o.sort((a,c)=>MC(t,a,c)),o.forEach(a=>{const c=DC(t,a,s);i.forEach(l=>{l.respondsTo(a.type)&&e.push(l.createEvent(c,t.query_))})})}function DC(t,e,n){return e.type==="value"||e.type==="child_removed"||(e.prevName=n.getPredecessorChildName(e.childName,e.snapshotNode,t.index_)),e}function MC(t,e,n){if(e.childName==null||n.childName==null)throw ur("Should only compare child_ events.");const r=new R(e.childName,e.snapshotNode),i=new R(n.childName,n.snapshotNode);return t.index_.compare(r,i)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Xs(t,e){return{eventCache:t,serverCache:e}}function Ur(t,e,n,r){return Xs(new Wt(e,n,r),t.serverCache)}function up(t,e,n,r){return Xs(t.eventCache,new Wt(e,n,r))}function _s(t){return t.eventCache.isFullyInitialized()?t.eventCache.getNode():null}function _n(t){return t.serverCache.isFullyInitialized()?t.serverCache.getNode():null}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Bo;const xC=()=>(Bo||(Bo=new we(vS)),Bo);class F{static fromObject(e){let n=new F(null);return ae(e,(r,i)=>{n=n.set(new L(r),i)}),n}constructor(e,n=xC()){this.value=e,this.children=n}isEmpty(){return this.value===null&&this.children.isEmpty()}findRootMostMatchingPathAndValue(e,n){if(this.value!=null&&n(this.value))return{path:P(),value:this.value};if(k(e))return null;{const r=I(e),i=this.children.get(r);if(i!==null){const s=i.findRootMostMatchingPathAndValue(x(e),n);return s!=null?{path:q(new L(r),s.path),value:s.value}:null}else return null}}findRootMostValueAndPath(e){return this.findRootMostMatchingPathAndValue(e,()=>!0)}subtree(e){if(k(e))return this;{const n=I(e),r=this.children.get(n);return r!==null?r.subtree(x(e)):new F(null)}}set(e,n){if(k(e))return new F(n,this.children);{const r=I(e),s=(this.children.get(r)||new F(null)).set(x(e),n),o=this.children.insert(r,s);return new F(this.value,o)}}remove(e){if(k(e))return this.children.isEmpty()?new F(null):new F(null,this.children);{const n=I(e),r=this.children.get(n);if(r){const i=r.remove(x(e));let s;return i.isEmpty()?s=this.children.remove(n):s=this.children.insert(n,i),this.value===null&&s.isEmpty()?new F(null):new F(this.value,s)}else return this}}get(e){if(k(e))return this.value;{const n=I(e),r=this.children.get(n);return r?r.get(x(e)):null}}setTree(e,n){if(k(e))return n;{const r=I(e),s=(this.children.get(r)||new F(null)).setTree(x(e),n);let o;return s.isEmpty()?o=this.children.remove(r):o=this.children.insert(r,s),new F(this.value,o)}}fold(e){return this.fold_(P(),e)}fold_(e,n){const r={};return this.children.inorderTraversal((i,s)=>{r[i]=s.fold_(q(e,i),n)}),n(e,this.value,r)}findOnPath(e,n){return this.findOnPath_(e,P(),n)}findOnPath_(e,n,r){const i=this.value?r(n,this.value):!1;if(i)return i;if(k(e))return null;{const s=I(e),o=this.children.get(s);return o?o.findOnPath_(x(e),q(n,s),r):null}}foreachOnPath(e,n){return this.foreachOnPath_(e,P(),n)}foreachOnPath_(e,n,r){if(k(e))return this;{this.value&&r(n,this.value);const i=I(e),s=this.children.get(i);return s?s.foreachOnPath_(x(e),q(n,i),r):new F(null)}}foreach(e){this.foreach_(P(),e)}foreach_(e,n){this.children.inorderTraversal((r,i)=>{i.foreach_(q(e,r),n)}),this.value&&n(e,this.value)}foreachChild(e){this.children.inorderTraversal((n,r)=>{r.value&&e(n,r.value)})}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class je{constructor(e){this.writeTree_=e}static empty(){return new je(new F(null))}}function $r(t,e,n){if(k(e))return new je(new F(n));{const r=t.writeTree_.findRootMostValueAndPath(e);if(r!=null){const i=r.path;let s=r.value;const o=ge(i,e);return s=s.updateChild(o,n),new je(t.writeTree_.set(i,s))}else{const i=new F(n),s=t.writeTree_.setTree(e,i);return new je(s)}}}function ka(t,e,n){let r=t;return ae(n,(i,s)=>{r=$r(r,q(e,i),s)}),r}function Ed(t,e){if(k(e))return je.empty();{const n=t.writeTree_.setTree(e,new F(null));return new je(n)}}function Ra(t,e){return In(t,e)!=null}function In(t,e){const n=t.writeTree_.findRootMostValueAndPath(e);return n!=null?t.writeTree_.get(n.path).getChild(ge(n.path,e)):null}function vd(t){const e=[],n=t.writeTree_.value;return n!=null?n.isLeafNode()||n.forEachChild(Y,(r,i)=>{e.push(new R(r,i))}):t.writeTree_.children.inorderTraversal((r,i)=>{i.value!=null&&e.push(new R(r,i.value))}),e}function Dt(t,e){if(k(e))return t;{const n=In(t,e);return n!=null?new je(new F(n)):new je(t.writeTree_.subtree(e))}}function Aa(t){return t.writeTree_.isEmpty()}function tr(t,e){return dp(P(),t.writeTree_,e)}function dp(t,e,n){if(e.value!=null)return n.updateChild(t,e.value);{let r=null;return e.children.inorderTraversal((i,s)=>{i===".priority"?(g(s.value!==null,"Priority writes must always be leaf nodes"),r=s.value):n=dp(q(t,i),s,n)}),!n.getChild(t).isEmpty()&&r!==null&&(n=n.updateChild(q(t,".priority"),r)),n}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Qs(t,e){return gp(e,t)}function FC(t,e,n,r,i){g(r>t.lastWriteId,"Stacking an older write on top of newer ones"),i===void 0&&(i=!0),t.allWrites.push({path:e,snap:n,writeId:r,visible:i}),i&&(t.visibleWrites=$r(t.visibleWrites,e,n)),t.lastWriteId=r}function UC(t,e,n,r){g(r>t.lastWriteId,"Stacking an older merge on top of newer ones"),t.allWrites.push({path:e,children:n,writeId:r,visible:!0}),t.visibleWrites=ka(t.visibleWrites,e,n),t.lastWriteId=r}function $C(t,e){for(let n=0;n<t.allWrites.length;n++){const r=t.allWrites[n];if(r.writeId===e)return r}return null}function BC(t,e){const n=t.allWrites.findIndex(a=>a.writeId===e);g(n>=0,"removeWrite called with nonexistent writeId.");const r=t.allWrites[n];t.allWrites.splice(n,1);let i=r.visible,s=!1,o=t.allWrites.length-1;for(;i&&o>=0;){const a=t.allWrites[o];a.visible&&(o>=n&&HC(a,r.path)?i=!1:Ne(r.path,a.path)&&(s=!0)),o--}if(i){if(s)return WC(t),!0;if(r.snap)t.visibleWrites=Ed(t.visibleWrites,r.path);else{const a=r.children;ae(a,c=>{t.visibleWrites=Ed(t.visibleWrites,q(r.path,c))})}return!0}else return!1}function HC(t,e){if(t.snap)return Ne(t.path,e);for(const n in t.children)if(t.children.hasOwnProperty(n)&&Ne(q(t.path,n),e))return!0;return!1}function WC(t){t.visibleWrites=hp(t.allWrites,VC,P()),t.allWrites.length>0?t.lastWriteId=t.allWrites[t.allWrites.length-1].writeId:t.lastWriteId=-1}function VC(t){return t.visible}function hp(t,e,n){let r=je.empty();for(let i=0;i<t.length;++i){const s=t[i];if(e(s)){const o=s.path;let a;if(s.snap)Ne(n,o)?(a=ge(n,o),r=$r(r,a,s.snap)):Ne(o,n)&&(a=ge(o,n),r=$r(r,P(),s.snap.getChild(a)));else if(s.children){if(Ne(n,o))a=ge(n,o),r=ka(r,a,s.children);else if(Ne(o,n))if(a=ge(o,n),k(a))r=ka(r,P(),s.children);else{const c=Jn(s.children,I(a));if(c){const l=c.getChild(x(a));r=$r(r,P(),l)}}}else throw ur("WriteRecord should have .snap or .children")}}return r}function fp(t,e,n,r,i){if(!r&&!i){const s=In(t.visibleWrites,e);if(s!=null)return s;{const o=Dt(t.visibleWrites,e);if(Aa(o))return n;if(n==null&&!Ra(o,P()))return null;{const a=n||v.EMPTY_NODE;return tr(o,a)}}}else{const s=Dt(t.visibleWrites,e);if(!i&&Aa(s))return n;if(!i&&n==null&&!Ra(s,P()))return null;{const o=function(l){return(l.visible||i)&&(!r||!~r.indexOf(l.writeId))&&(Ne(l.path,e)||Ne(e,l.path))},a=hp(t.allWrites,o,e),c=n||v.EMPTY_NODE;return tr(a,c)}}}function jC(t,e,n){let r=v.EMPTY_NODE;const i=In(t.visibleWrites,e);if(i)return i.isLeafNode()||i.forEachChild(Y,(s,o)=>{r=r.updateImmediateChild(s,o)}),r;if(n){const s=Dt(t.visibleWrites,e);return n.forEachChild(Y,(o,a)=>{const c=tr(Dt(s,new L(o)),a);r=r.updateImmediateChild(o,c)}),vd(s).forEach(o=>{r=r.updateImmediateChild(o.name,o.node)}),r}else{const s=Dt(t.visibleWrites,e);return vd(s).forEach(o=>{r=r.updateImmediateChild(o.name,o.node)}),r}}function zC(t,e,n,r,i){g(r||i,"Either existingEventSnap or existingServerSnap must exist");const s=q(e,n);if(Ra(t.visibleWrites,s))return null;{const o=Dt(t.visibleWrites,s);return Aa(o)?i.getChild(n):tr(o,i.getChild(n))}}function GC(t,e,n,r){const i=q(e,n),s=In(t.visibleWrites,i);if(s!=null)return s;if(r.isCompleteForChild(n)){const o=Dt(t.visibleWrites,i);return tr(o,r.getNode().getImmediateChild(n))}else return null}function qC(t,e){return In(t.visibleWrites,e)}function YC(t,e,n,r,i,s,o){let a;const c=Dt(t.visibleWrites,e),l=In(c,P());if(l!=null)a=l;else if(n!=null)a=tr(c,n);else return[];if(a=a.withIndex(o),!a.isEmpty()&&!a.isLeafNode()){const u=[],d=o.getCompare(),h=s?a.getReverseIteratorFrom(r,o):a.getIteratorFrom(r,o);let f=h.getNext();for(;f&&u.length<i;)d(f,r)!==0&&u.push(f),f=h.getNext();return u}else return[]}function KC(){return{visibleWrites:je.empty(),allWrites:[],lastWriteId:-1}}function ys(t,e,n,r){return fp(t.writeTree,t.treePath,e,n,r)}function Oc(t,e){return jC(t.writeTree,t.treePath,e)}function wd(t,e,n,r){return zC(t.writeTree,t.treePath,e,n,r)}function Es(t,e){return qC(t.writeTree,q(t.treePath,e))}function JC(t,e,n,r,i,s){return YC(t.writeTree,t.treePath,e,n,r,i,s)}function Dc(t,e,n){return GC(t.writeTree,t.treePath,e,n)}function pp(t,e){return gp(q(t.treePath,e),t.writeTree)}function gp(t,e){return{treePath:t,writeTree:e}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class XC{constructor(){this.changeMap=new Map}trackChildChange(e){const n=e.type,r=e.childName;g(n==="child_added"||n==="child_changed"||n==="child_removed","Only child changes supported for tracking"),g(r!==".priority","Only non-priority child changes can be tracked.");const i=this.changeMap.get(r);if(i){const s=i.type;if(n==="child_added"&&s==="child_removed")this.changeMap.set(r,ri(r,e.snapshotNode,i.snapshotNode));else if(n==="child_removed"&&s==="child_added")this.changeMap.delete(r);else if(n==="child_removed"&&s==="child_changed")this.changeMap.set(r,ni(r,i.oldSnap));else if(n==="child_changed"&&s==="child_added")this.changeMap.set(r,Zn(r,e.snapshotNode));else if(n==="child_changed"&&s==="child_changed")this.changeMap.set(r,ri(r,e.snapshotNode,i.oldSnap));else throw ur("Illegal combination of changes: "+e+" occurred after "+i)}else this.changeMap.set(r,e)}getChanges(){return Array.from(this.changeMap.values())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class QC{getCompleteChild(e){return null}getChildAfterChild(e,n,r){return null}}const mp=new QC;class Mc{constructor(e,n,r=null){this.writes_=e,this.viewCache_=n,this.optCompleteServerCache_=r}getCompleteChild(e){const n=this.viewCache_.eventCache;if(n.isCompleteForChild(e))return n.getNode().getImmediateChild(e);{const r=this.optCompleteServerCache_!=null?new Wt(this.optCompleteServerCache_,!0,!1):this.viewCache_.serverCache;return Dc(this.writes_,e,r)}}getChildAfterChild(e,n,r){const i=this.optCompleteServerCache_!=null?this.optCompleteServerCache_:_n(this.viewCache_),s=JC(this.writes_,i,n,1,r,e);return s.length===0?null:s[0]}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ZC(t){return{filter:t}}function eT(t,e){g(e.eventCache.getNode().isIndexed(t.filter.getIndex()),"Event snap not indexed"),g(e.serverCache.getNode().isIndexed(t.filter.getIndex()),"Server snap not indexed")}function tT(t,e,n,r,i){const s=new XC;let o,a;if(n.type===Be.OVERWRITE){const l=n;l.source.fromUser?o=Pa(t,e,l.path,l.snap,r,i,s):(g(l.source.fromServer,"Unknown source."),a=l.source.tagged||e.serverCache.isFiltered()&&!k(l.path),o=vs(t,e,l.path,l.snap,r,i,a,s))}else if(n.type===Be.MERGE){const l=n;l.source.fromUser?o=rT(t,e,l.path,l.children,r,i,s):(g(l.source.fromServer,"Unknown source."),a=l.source.tagged||e.serverCache.isFiltered(),o=Na(t,e,l.path,l.children,r,i,a,s))}else if(n.type===Be.ACK_USER_WRITE){const l=n;l.revert?o=oT(t,e,l.path,r,i,s):o=iT(t,e,l.path,l.affectedTree,r,i,s)}else if(n.type===Be.LISTEN_COMPLETE)o=sT(t,e,n.path,r,s);else throw ur("Unknown operation type: "+n.type);const c=s.getChanges();return nT(e,o,c),{viewCache:o,changes:c}}function nT(t,e,n){const r=e.eventCache;if(r.isFullyInitialized()){const i=r.getNode().isLeafNode()||r.getNode().isEmpty(),s=_s(t);(n.length>0||!t.eventCache.isFullyInitialized()||i&&!r.getNode().equals(s)||!r.getNode().getPriority().equals(s.getPriority()))&&n.push(lp(_s(e)))}}function _p(t,e,n,r,i,s){const o=e.eventCache;if(Es(r,n)!=null)return e;{let a,c;if(k(n))if(g(e.serverCache.isFullyInitialized(),"If change path is empty, we must have complete server data"),e.serverCache.isFiltered()){const l=_n(e),u=l instanceof v?l:v.EMPTY_NODE,d=Oc(r,u);a=t.filter.updateFullNode(e.eventCache.getNode(),d,s)}else{const l=ys(r,_n(e));a=t.filter.updateFullNode(e.eventCache.getNode(),l,s)}else{const l=I(n);if(l===".priority"){g(Ht(n)===1,"Can't have a priority with additional path components");const u=o.getNode();c=e.serverCache.getNode();const d=wd(r,n,u,c);d!=null?a=t.filter.updatePriority(u,d):a=o.getNode()}else{const u=x(n);let d;if(o.isCompleteForChild(l)){c=e.serverCache.getNode();const h=wd(r,n,o.getNode(),c);h!=null?d=o.getNode().getImmediateChild(l).updateChild(u,h):d=o.getNode().getImmediateChild(l)}else d=Dc(r,l,e.serverCache);d!=null?a=t.filter.updateChild(o.getNode(),l,d,u,i,s):a=o.getNode()}}return Ur(e,a,o.isFullyInitialized()||k(n),t.filter.filtersNodes())}}function vs(t,e,n,r,i,s,o,a){const c=e.serverCache;let l;const u=o?t.filter:t.filter.getIndexedFilter();if(k(n))l=u.updateFullNode(c.getNode(),r,null);else if(u.filtersNodes()&&!c.isFiltered()){const f=c.getNode().updateChild(n,r);l=u.updateFullNode(c.getNode(),f,null)}else{const f=I(n);if(!c.isCompleteForPath(n)&&Ht(n)>1)return e;const p=x(n),m=c.getNode().getImmediateChild(f).updateChild(p,r);f===".priority"?l=u.updatePriority(c.getNode(),m):l=u.updateChild(c.getNode(),f,m,p,mp,null)}const d=up(e,l,c.isFullyInitialized()||k(n),u.filtersNodes()),h=new Mc(i,d,s);return _p(t,d,n,i,h,a)}function Pa(t,e,n,r,i,s,o){const a=e.eventCache;let c,l;const u=new Mc(i,e,s);if(k(n))l=t.filter.updateFullNode(e.eventCache.getNode(),r,o),c=Ur(e,l,!0,t.filter.filtersNodes());else{const d=I(n);if(d===".priority")l=t.filter.updatePriority(e.eventCache.getNode(),r),c=Ur(e,l,a.isFullyInitialized(),a.isFiltered());else{const h=x(n),f=a.getNode().getImmediateChild(d);let p;if(k(h))p=r;else{const _=u.getCompleteChild(d);_!=null?Tc(h)===".priority"&&_.getChild(np(h)).isEmpty()?p=_:p=_.updateChild(h,r):p=v.EMPTY_NODE}if(f.equals(p))c=e;else{const _=t.filter.updateChild(a.getNode(),d,p,h,u,o);c=Ur(e,_,a.isFullyInitialized(),t.filter.filtersNodes())}}}return c}function bd(t,e){return t.eventCache.isCompleteForChild(e)}function rT(t,e,n,r,i,s,o){let a=e;return r.foreach((c,l)=>{const u=q(n,c);bd(e,I(u))&&(a=Pa(t,a,u,l,i,s,o))}),r.foreach((c,l)=>{const u=q(n,c);bd(e,I(u))||(a=Pa(t,a,u,l,i,s,o))}),a}function Sd(t,e,n){return n.foreach((r,i)=>{e=e.updateChild(r,i)}),e}function Na(t,e,n,r,i,s,o,a){if(e.serverCache.getNode().isEmpty()&&!e.serverCache.isFullyInitialized())return e;let c=e,l;k(n)?l=r:l=new F(null).setTree(n,r);const u=e.serverCache.getNode();return l.children.inorderTraversal((d,h)=>{if(u.hasChild(d)){const f=e.serverCache.getNode().getImmediateChild(d),p=Sd(t,f,h);c=vs(t,c,new L(d),p,i,s,o,a)}}),l.children.inorderTraversal((d,h)=>{const f=!e.serverCache.isCompleteForChild(d)&&h.value===null;if(!u.hasChild(d)&&!f){const p=e.serverCache.getNode().getImmediateChild(d),_=Sd(t,p,h);c=vs(t,c,new L(d),_,i,s,o,a)}}),c}function iT(t,e,n,r,i,s,o){if(Es(i,n)!=null)return e;const a=e.serverCache.isFiltered(),c=e.serverCache;if(r.value!=null){if(k(n)&&c.isFullyInitialized()||c.isCompleteForPath(n))return vs(t,e,n,c.getNode().getChild(n),i,s,a,o);if(k(n)){let l=new F(null);return c.getNode().forEachChild(xn,(u,d)=>{l=l.set(new L(u),d)}),Na(t,e,n,l,i,s,a,o)}else return e}else{let l=new F(null);return r.foreach((u,d)=>{const h=q(n,u);c.isCompleteForPath(h)&&(l=l.set(u,c.getNode().getChild(h)))}),Na(t,e,n,l,i,s,a,o)}}function sT(t,e,n,r,i){const s=e.serverCache,o=up(e,s.getNode(),s.isFullyInitialized()||k(n),s.isFiltered());return _p(t,o,n,r,mp,i)}function oT(t,e,n,r,i,s){let o;if(Es(r,n)!=null)return e;{const a=new Mc(r,e,i),c=e.eventCache.getNode();let l;if(k(n)||I(n)===".priority"){let u;if(e.serverCache.isFullyInitialized())u=ys(r,_n(e));else{const d=e.serverCache.getNode();g(d instanceof v,"serverChildren would be complete if leaf node"),u=Oc(r,d)}u=u,l=t.filter.updateFullNode(c,u,s)}else{const u=I(n);let d=Dc(r,u,e.serverCache);d==null&&e.serverCache.isCompleteForChild(u)&&(d=c.getImmediateChild(u)),d!=null?l=t.filter.updateChild(c,u,d,x(n),a,s):e.eventCache.getNode().hasChild(u)?l=t.filter.updateChild(c,u,v.EMPTY_NODE,x(n),a,s):l=c,l.isEmpty()&&e.serverCache.isFullyInitialized()&&(o=ys(r,_n(e)),o.isLeafNode()&&(l=t.filter.updateFullNode(l,o,s)))}return o=e.serverCache.isFullyInitialized()||Es(r,P())!=null,Ur(e,l,o,t.filter.filtersNodes())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class aT{constructor(e,n){this.query_=e,this.eventRegistrations_=[];const r=this.query_._queryParams,i=new Ac(r.getIndex()),s=TC(r);this.processor_=ZC(s);const o=n.serverCache,a=n.eventCache,c=i.updateFullNode(v.EMPTY_NODE,o.getNode(),null),l=s.updateFullNode(v.EMPTY_NODE,a.getNode(),null),u=new Wt(c,o.isFullyInitialized(),i.filtersNodes()),d=new Wt(l,a.isFullyInitialized(),s.filtersNodes());this.viewCache_=Xs(d,u),this.eventGenerator_=new LC(this.query_)}get query(){return this.query_}}function cT(t){return t.viewCache_.serverCache.getNode()}function lT(t){return _s(t.viewCache_)}function uT(t,e){const n=_n(t.viewCache_);return n&&(t.query._queryParams.loadsAllData()||!k(e)&&!n.getImmediateChild(I(e)).isEmpty())?n.getChild(e):null}function Cd(t){return t.eventRegistrations_.length===0}function dT(t,e){t.eventRegistrations_.push(e)}function Td(t,e,n){const r=[];if(n){g(e==null,"A cancel should cancel all event registrations.");const i=t.query._path;t.eventRegistrations_.forEach(s=>{const o=s.createCancelEvent(n,i);o&&r.push(o)})}if(e){let i=[];for(let s=0;s<t.eventRegistrations_.length;++s){const o=t.eventRegistrations_[s];if(!o.matches(e))i.push(o);else if(e.hasAnyCallback()){i=i.concat(t.eventRegistrations_.slice(s+1));break}}t.eventRegistrations_=i}else t.eventRegistrations_=[];return r}function Id(t,e,n,r){e.type===Be.MERGE&&e.source.queryId!==null&&(g(_n(t.viewCache_),"We should always have a full cache before handling merges"),g(_s(t.viewCache_),"Missing event cache, even though we have a server cache"));const i=t.viewCache_,s=tT(t.processor_,i,e,n,r);return eT(t.processor_,s.viewCache),g(s.viewCache.serverCache.isFullyInitialized()||!i.serverCache.isFullyInitialized(),"Once a server snap is complete, it should never go back"),t.viewCache_=s.viewCache,yp(t,s.changes,s.viewCache.eventCache.getNode(),null)}function hT(t,e){const n=t.viewCache_.eventCache,r=[];return n.getNode().isLeafNode()||n.getNode().forEachChild(Y,(s,o)=>{r.push(Zn(s,o))}),n.isFullyInitialized()&&r.push(lp(n.getNode())),yp(t,r,n.getNode(),e)}function yp(t,e,n,r){const i=r?[r]:t.eventRegistrations_;return OC(t.eventGenerator_,e,n,i)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let ws;class Ep{constructor(){this.views=new Map}}function fT(t){g(!ws,"__referenceConstructor has already been defined"),ws=t}function pT(){return g(ws,"Reference.ts has not been loaded"),ws}function gT(t){return t.views.size===0}function xc(t,e,n,r){const i=e.source.queryId;if(i!==null){const s=t.views.get(i);return g(s!=null,"SyncTree gave us an op for an invalid query."),Id(s,e,n,r)}else{let s=[];for(const o of t.views.values())s=s.concat(Id(o,e,n,r));return s}}function vp(t,e,n,r,i){const s=e._queryIdentifier,o=t.views.get(s);if(!o){let a=ys(n,i?r:null),c=!1;a?c=!0:r instanceof v?(a=Oc(n,r),c=!1):(a=v.EMPTY_NODE,c=!1);const l=Xs(new Wt(a,c,!1),new Wt(r,i,!1));return new aT(e,l)}return o}function mT(t,e,n,r,i,s){const o=vp(t,e,r,i,s);return t.views.has(e._queryIdentifier)||t.views.set(e._queryIdentifier,o),dT(o,n),hT(o,n)}function _T(t,e,n,r){const i=e._queryIdentifier,s=[];let o=[];const a=Vt(t);if(i==="default")for(const[c,l]of t.views.entries())o=o.concat(Td(l,n,r)),Cd(l)&&(t.views.delete(c),l.query._queryParams.loadsAllData()||s.push(l.query));else{const c=t.views.get(i);c&&(o=o.concat(Td(c,n,r)),Cd(c)&&(t.views.delete(i),c.query._queryParams.loadsAllData()||s.push(c.query)))}return a&&!Vt(t)&&s.push(new(pT())(e._repo,e._path)),{removed:s,events:o}}function wp(t){const e=[];for(const n of t.views.values())n.query._queryParams.loadsAllData()||e.push(n);return e}function Mt(t,e){let n=null;for(const r of t.views.values())n=n||uT(r,e);return n}function bp(t,e){if(e._queryParams.loadsAllData())return Zs(t);{const r=e._queryIdentifier;return t.views.get(r)}}function Sp(t,e){return bp(t,e)!=null}function Vt(t){return Zs(t)!=null}function Zs(t){for(const e of t.views.values())if(e.query._queryParams.loadsAllData())return e;return null}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let bs;function yT(t){g(!bs,"__referenceConstructor has already been defined"),bs=t}function ET(){return g(bs,"Reference.ts has not been loaded"),bs}let vT=1;class kd{constructor(e){this.listenProvider_=e,this.syncPointTree_=new F(null),this.pendingWriteTree_=KC(),this.tagToQueryMap=new Map,this.queryToTagMap=new Map}}function Cp(t,e,n,r,i){return FC(t.pendingWriteTree_,e,n,r,i),i?_r(t,new mn(Pc(),e,n)):[]}function wT(t,e,n,r){UC(t.pendingWriteTree_,e,n,r);const i=F.fromObject(n);return _r(t,new er(Pc(),e,i))}function kt(t,e,n=!1){const r=$C(t.pendingWriteTree_,e);if(BC(t.pendingWriteTree_,e)){let s=new F(null);return r.snap!=null?s=s.set(P(),!0):ae(r.children,o=>{s=s.set(new L(o),!0)}),_r(t,new ms(r.path,s,n))}else return[]}function bi(t,e,n){return _r(t,new mn(Nc(),e,n))}function bT(t,e,n){const r=F.fromObject(n);return _r(t,new er(Nc(),e,r))}function ST(t,e){return _r(t,new si(Nc(),e))}function CT(t,e,n){const r=Uc(t,n);if(r){const i=$c(r),s=i.path,o=i.queryId,a=ge(s,e),c=new si(Lc(o),a);return Bc(t,s,c)}else return[]}function Ss(t,e,n,r,i=!1){const s=e._path,o=t.syncPointTree_.get(s);let a=[];if(o&&(e._queryIdentifier==="default"||Sp(o,e))){const c=_T(o,e,n,r);gT(o)&&(t.syncPointTree_=t.syncPointTree_.remove(s));const l=c.removed;if(a=c.events,!i){const u=l.findIndex(h=>h._queryParams.loadsAllData())!==-1,d=t.syncPointTree_.findOnPath(s,(h,f)=>Vt(f));if(u&&!d){const h=t.syncPointTree_.subtree(s);if(!h.isEmpty()){const f=kT(h);for(let p=0;p<f.length;++p){const _=f[p],m=_.query,T=Rp(t,_);t.listenProvider_.startListening(Br(m),oi(t,m),T.hashFn,T.onComplete)}}}!d&&l.length>0&&!r&&(u?t.listenProvider_.stopListening(Br(e),null):l.forEach(h=>{const f=t.queryToTagMap.get(eo(h));t.listenProvider_.stopListening(Br(h),f)}))}RT(t,l)}return a}function Tp(t,e,n,r){const i=Uc(t,r);if(i!=null){const s=$c(i),o=s.path,a=s.queryId,c=ge(o,e),l=new mn(Lc(a),c,n);return Bc(t,o,l)}else return[]}function TT(t,e,n,r){const i=Uc(t,r);if(i){const s=$c(i),o=s.path,a=s.queryId,c=ge(o,e),l=F.fromObject(n),u=new er(Lc(a),c,l);return Bc(t,o,u)}else return[]}function La(t,e,n,r=!1){const i=e._path;let s=null,o=!1;t.syncPointTree_.foreachOnPath(i,(h,f)=>{const p=ge(h,i);s=s||Mt(f,p),o=o||Vt(f)});let a=t.syncPointTree_.get(i);a?(o=o||Vt(a),s=s||Mt(a,P())):(a=new Ep,t.syncPointTree_=t.syncPointTree_.set(i,a));let c;s!=null?c=!0:(c=!1,s=v.EMPTY_NODE,t.syncPointTree_.subtree(i).foreachChild((f,p)=>{const _=Mt(p,P());_&&(s=s.updateImmediateChild(f,_))}));const l=Sp(a,e);if(!l&&!e._queryParams.loadsAllData()){const h=eo(e);g(!t.queryToTagMap.has(h),"View does not exist, but we have a tag");const f=AT();t.queryToTagMap.set(h,f),t.tagToQueryMap.set(f,h)}const u=Qs(t.pendingWriteTree_,i);let d=mT(a,e,n,u,s,c);if(!l&&!o&&!r){const h=bp(a,e);d=d.concat(PT(t,e,h))}return d}function Fc(t,e,n){const i=t.pendingWriteTree_,s=t.syncPointTree_.findOnPath(e,(o,a)=>{const c=ge(o,e),l=Mt(a,c);if(l)return l});return fp(i,e,s,n,!0)}function IT(t,e){const n=e._path;let r=null;t.syncPointTree_.foreachOnPath(n,(l,u)=>{const d=ge(l,n);r=r||Mt(u,d)});let i=t.syncPointTree_.get(n);i?r=r||Mt(i,P()):(i=new Ep,t.syncPointTree_=t.syncPointTree_.set(n,i));const s=r!=null,o=s?new Wt(r,!0,!1):null,a=Qs(t.pendingWriteTree_,e._path),c=vp(i,e,a,s?o.getNode():v.EMPTY_NODE,s);return lT(c)}function _r(t,e){return Ip(e,t.syncPointTree_,null,Qs(t.pendingWriteTree_,P()))}function Ip(t,e,n,r){if(k(t.path))return kp(t,e,n,r);{const i=e.get(P());n==null&&i!=null&&(n=Mt(i,P()));let s=[];const o=I(t.path),a=t.operationForChild(o),c=e.children.get(o);if(c&&a){const l=n?n.getImmediateChild(o):null,u=pp(r,o);s=s.concat(Ip(a,c,l,u))}return i&&(s=s.concat(xc(i,t,r,n))),s}}function kp(t,e,n,r){const i=e.get(P());n==null&&i!=null&&(n=Mt(i,P()));let s=[];return e.children.inorderTraversal((o,a)=>{const c=n?n.getImmediateChild(o):null,l=pp(r,o),u=t.operationForChild(o);u&&(s=s.concat(kp(u,a,c,l)))}),i&&(s=s.concat(xc(i,t,r,n))),s}function Rp(t,e){const n=e.query,r=oi(t,n);return{hashFn:()=>(cT(e)||v.EMPTY_NODE).hash(),onComplete:i=>{if(i==="ok")return r?CT(t,n._path,r):ST(t,n._path);{const s=SS(i,n);return Ss(t,n,null,s)}}}}function oi(t,e){const n=eo(e);return t.queryToTagMap.get(n)}function eo(t){return t._path.toString()+"$"+t._queryIdentifier}function Uc(t,e){return t.tagToQueryMap.get(e)}function $c(t){const e=t.indexOf("$");return g(e!==-1&&e<t.length-1,"Bad queryKey."),{queryId:t.substr(e+1),path:new L(t.substr(0,e))}}function Bc(t,e,n){const r=t.syncPointTree_.get(e);g(r,"Missing sync point for query tag that we're tracking");const i=Qs(t.pendingWriteTree_,e);return xc(r,n,i,null)}function kT(t){return t.fold((e,n,r)=>{if(n&&Vt(n))return[Zs(n)];{let i=[];return n&&(i=wp(n)),ae(r,(s,o)=>{i=i.concat(o)}),i}})}function Br(t){return t._queryParams.loadsAllData()&&!t._queryParams.isDefault()?new(ET())(t._repo,t._path):t}function RT(t,e){for(let n=0;n<e.length;++n){const r=e[n];if(!r._queryParams.loadsAllData()){const i=eo(r),s=t.queryToTagMap.get(i);t.queryToTagMap.delete(i),t.tagToQueryMap.delete(s)}}}function AT(){return vT++}function PT(t,e,n){const r=e._path,i=oi(t,e),s=Rp(t,n),o=t.listenProvider_.startListening(Br(e),i,s.hashFn,s.onComplete),a=t.syncPointTree_.subtree(r);if(i)g(!Vt(a.value),"If we're adding a query, it shouldn't be shadowed");else{const c=a.fold((l,u,d)=>{if(!k(l)&&u&&Vt(u))return[Zs(u).query];{let h=[];return u&&(h=h.concat(wp(u).map(f=>f.query))),ae(d,(f,p)=>{h=h.concat(p)}),h}});for(let l=0;l<c.length;++l){const u=c[l];t.listenProvider_.stopListening(Br(u),oi(t,u))}}return o}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Hc{constructor(e){this.node_=e}getImmediateChild(e){const n=this.node_.getImmediateChild(e);return new Hc(n)}node(){return this.node_}}class Wc{constructor(e,n){this.syncTree_=e,this.path_=n}getImmediateChild(e){const n=q(this.path_,e);return new Wc(this.syncTree_,n)}node(){return Fc(this.syncTree_,this.path_)}}const NT=function(t){return t=t||{},t.timestamp=t.timestamp||new Date().getTime(),t},Rd=function(t,e,n){if(!t||typeof t!="object")return t;if(g(".sv"in t,"Unexpected leaf node or priority contents"),typeof t[".sv"]=="string")return LT(t[".sv"],e,n);if(typeof t[".sv"]=="object")return OT(t[".sv"],e);g(!1,"Unexpected server value: "+JSON.stringify(t,null,2))},LT=function(t,e,n){switch(t){case"timestamp":return n.timestamp;default:g(!1,"Unexpected server value: "+t)}},OT=function(t,e,n){t.hasOwnProperty("increment")||g(!1,"Unexpected server value: "+JSON.stringify(t,null,2));const r=t.increment;typeof r!="number"&&g(!1,"Unexpected increment value: "+r);const i=e.node();if(g(i!==null&&typeof i<"u","Expected ChildrenNode.EMPTY_NODE for nulls"),!i.isLeafNode())return r;const o=i.getValue();return typeof o!="number"?r:o+r},Ap=function(t,e,n,r){return Vc(e,new Wc(n,t),r)},Pp=function(t,e,n){return Vc(t,new Hc(e),n)};function Vc(t,e,n){const r=t.getPriority().val(),i=Rd(r,e.getImmediateChild(".priority"),n);let s;if(t.isLeafNode()){const o=t,a=Rd(o.getValue(),e,n);return a!==o.getValue()||i!==o.getPriority().val()?new ie(a,K(i)):t}else{const o=t;return s=o,i!==o.getPriority().val()&&(s=s.updatePriority(new ie(i))),o.forEachChild(Y,(a,c)=>{const l=Vc(c,e.getImmediateChild(a),n);l!==c&&(s=s.updateImmediateChild(a,l))}),s}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class jc{constructor(e="",n=null,r={children:{},childCount:0}){this.name=e,this.parent=n,this.node=r}}function zc(t,e){let n=e instanceof L?e:new L(e),r=t,i=I(n);for(;i!==null;){const s=Jn(r.node.children,i)||{children:{},childCount:0};r=new jc(i,r,s),n=x(n),i=I(n)}return r}function yr(t){return t.node.value}function Np(t,e){t.node.value=e,Oa(t)}function Lp(t){return t.node.childCount>0}function DT(t){return yr(t)===void 0&&!Lp(t)}function to(t,e){ae(t.node.children,(n,r)=>{e(new jc(n,t,r))})}function Op(t,e,n,r){n&&e(t),to(t,i=>{Op(i,e,!0)})}function MT(t,e,n){let r=t.parent;for(;r!==null;){if(e(r))return!0;r=r.parent}return!1}function Si(t){return new L(t.parent===null?t.name:Si(t.parent)+"/"+t.name)}function Oa(t){t.parent!==null&&xT(t.parent,t.name,t)}function xT(t,e,n){const r=DT(n),i=nt(t.node.children,e);r&&i?(delete t.node.children[e],t.node.childCount--,Oa(t)):!r&&!i&&(t.node.children[e]=n.node,t.node.childCount++,Oa(t))}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const FT=/[\[\].#$\/\u0000-\u001F\u007F]/,UT=/[\[\].#$\u0000-\u001F\u007F]/,Ho=10*1024*1024,Gc=function(t){return typeof t=="string"&&t.length!==0&&!FT.test(t)},Dp=function(t){return typeof t=="string"&&t.length!==0&&!UT.test(t)},$T=function(t){return t&&(t=t.replace(/^\/*\.info(\/|$)/,"/")),Dp(t)},Mp=function(t){return t===null||typeof t=="string"||typeof t=="number"&&!Ys(t)||t&&typeof t=="object"&&nt(t,".sv")},Cs=function(t,e,n,r){r&&e===void 0||no(Xn(t,"value"),e,n)},no=function(t,e,n){const r=n instanceof L?new rC(n,t):n;if(e===void 0)throw new Error(t+"contains undefined "+en(r));if(typeof e=="function")throw new Error(t+"contains a function "+en(r)+" with contents = "+e.toString());if(Ys(e))throw new Error(t+"contains "+e.toString()+" "+en(r));if(typeof e=="string"&&e.length>Ho/3&&Gs(e)>Ho)throw new Error(t+"contains a string greater than "+Ho+" utf8 bytes "+en(r)+" ('"+e.substring(0,50)+"...')");if(e&&typeof e=="object"){let i=!1,s=!1;if(ae(e,(o,a)=>{if(o===".value")i=!0;else if(o!==".priority"&&o!==".sv"&&(s=!0,!Gc(o)))throw new Error(t+" contains an invalid key ("+o+") "+en(r)+`.  Keys must be non-empty strings and can't contain ".", "#", "$", "/", "[", or "]"`);iC(r,o),no(t,a,r),sC(r)}),i&&s)throw new Error(t+' contains ".value" child '+en(r)+" in addition to actual children.")}},BT=function(t,e){let n,r;for(n=0;n<e.length;n++){r=e[n];const s=ti(r);for(let o=0;o<s.length;o++)if(!(s[o]===".priority"&&o===s.length-1)){if(!Gc(s[o]))throw new Error(t+"contains an invalid key ("+s[o]+") in path "+r.toString()+`. Keys must be non-empty strings and can't contain ".", "#", "$", "/", "[", or "]"`)}}e.sort(nC);let i=null;for(n=0;n<e.length;n++){if(r=e[n],i!==null&&Ne(i,r))throw new Error(t+"contains a path "+i.toString()+" that is ancestor of another path "+r.toString());i=r}},xp=function(t,e,n,r){const i=Xn(t,"values");if(!(e&&typeof e=="object")||Array.isArray(e))throw new Error(i+" must be an object containing the children to replace.");const s=[];ae(e,(o,a)=>{const c=new L(o);if(no(i,a,q(n,c)),Tc(c)===".priority"&&!Mp(a))throw new Error(i+"contains an invalid value for '"+c.toString()+"', which must be a valid Firebase priority (a string, finite number, server value, or null).");s.push(c)}),BT(i,s)},HT=function(t,e,n){if(Ys(e))throw new Error(Xn(t,"priority")+"is "+e.toString()+", but must be a valid Firebase priority (a string, finite number, server value, or null).");if(!Mp(e))throw new Error(Xn(t,"priority")+"must be a valid Firebase priority (a string, finite number, server value, or null).")},qc=function(t,e,n,r){if(!Dp(n))throw new Error(Xn(t,e)+'was an invalid path = "'+n+`". Paths must be non-empty strings and can't contain ".", "#", "$", "[", or "]"`)},WT=function(t,e,n,r){n&&(n=n.replace(/^\/*\.info(\/|$)/,"/")),qc(t,e,n)},Rt=function(t,e){if(I(e)===".info")throw new Error(t+" failed = Can't modify data under /.info/")},VT=function(t,e){const n=e.path.toString();if(typeof e.repoInfo.host!="string"||e.repoInfo.host.length===0||!Gc(e.repoInfo.namespace)&&e.repoInfo.host.split(":")[0]!=="localhost"||n.length!==0&&!$T(n))throw new Error(Xn(t,"url")+`must be a valid firebase URL and the path can't contain ".", "#", "$", "[", or "]".`)};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class jT{constructor(){this.eventLists_=[],this.recursionDepth_=0}}function ro(t,e){let n=null;for(let r=0;r<e.length;r++){const i=e[r],s=i.getPath();n!==null&&!Ic(s,n.path)&&(t.eventLists_.push(n),n=null),n===null&&(n={events:[],path:s}),n.events.push(i)}n&&t.eventLists_.push(n)}function Fp(t,e,n){ro(t,n),Up(t,r=>Ic(r,e))}function Me(t,e,n){ro(t,n),Up(t,r=>Ne(r,e)||Ne(e,r))}function Up(t,e){t.recursionDepth_++;let n=!0;for(let r=0;r<t.eventLists_.length;r++){const i=t.eventLists_[r];if(i){const s=i.path;e(s)?(zT(t.eventLists_[r]),t.eventLists_[r]=null):n=!1}}n&&(t.eventLists_=[]),t.recursionDepth_--}function zT(t){for(let e=0;e<t.events.length;e++){const n=t.events[e];if(n!==null){t.events[e]=null;const r=n.getEventRunner();xr&&oe("event: "+n.toString()),gr(r)}}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const GT="repo_interrupt",qT=25;class YT{constructor(e,n,r,i){this.repoInfo_=e,this.forceRestClient_=n,this.authTokenProvider_=r,this.appCheckProvider_=i,this.dataUpdateCount=0,this.statsListener_=null,this.eventQueue_=new jT,this.nextWriteId_=1,this.interceptServerDataCallback_=null,this.onDisconnect_=gs(),this.transactionQueueTree_=new jc,this.persistentConnection_=null,this.key=this.repoInfo_.toURLString()}toString(){return(this.repoInfo_.secure?"https://":"http://")+this.repoInfo_.host}}function KT(t,e,n){if(t.stats_=Sc(t.repoInfo_),t.forceRestClient_||kS())t.server_=new ps(t.repoInfo_,(r,i,s,o)=>{Ad(t,r,i,s,o)},t.authTokenProvider_,t.appCheckProvider_),setTimeout(()=>Pd(t,!0),0);else{if(typeof n<"u"&&n!==null){if(typeof n!="object")throw new Error("Only objects are supported for option databaseAuthVariableOverride");try{ne(n)}catch(r){throw new Error("Invalid authOverride provided: "+r)}}t.persistentConnection_=new pt(t.repoInfo_,e,(r,i,s,o)=>{Ad(t,r,i,s,o)},r=>{Pd(t,r)},r=>{JT(t,r)},t.authTokenProvider_,t.appCheckProvider_,n),t.server_=t.persistentConnection_}t.authTokenProvider_.addTokenChangeListener(r=>{t.server_.refreshAuthToken(r)}),t.appCheckProvider_.addTokenChangeListener(r=>{t.server_.refreshAppCheckToken(r.token)}),t.statsReporter_=LS(t.repoInfo_,()=>new NC(t.stats_,t.server_)),t.infoData_=new IC,t.infoSyncTree_=new kd({startListening:(r,i,s,o)=>{let a=[];const c=t.infoData_.getNode(r._path);return c.isEmpty()||(a=bi(t.infoSyncTree_,r._path,c),setTimeout(()=>{o("ok")},0)),a},stopListening:()=>{}}),Yc(t,"connected",!1),t.serverSyncTree_=new kd({startListening:(r,i,s,o)=>(t.server_.listen(r,s,i,(a,c)=>{const l=o(a,c);Me(t.eventQueue_,r._path,l)}),[]),stopListening:(r,i)=>{t.server_.unlisten(r,i)}})}function $p(t){const n=t.infoData_.getNode(new L(".info/serverTimeOffset")).val()||0;return new Date().getTime()+n}function io(t){return NT({timestamp:$p(t)})}function Ad(t,e,n,r,i){t.dataUpdateCount++;const s=new L(e);n=t.interceptServerDataCallback_?t.interceptServerDataCallback_(e,n):n;let o=[];if(i)if(r){const c=ls(n,l=>K(l));o=TT(t.serverSyncTree_,s,c,i)}else{const c=K(n);o=Tp(t.serverSyncTree_,s,c,i)}else if(r){const c=ls(n,l=>K(l));o=bT(t.serverSyncTree_,s,c)}else{const c=K(n);o=bi(t.serverSyncTree_,s,c)}let a=s;o.length>0&&(a=nr(t,s)),Me(t.eventQueue_,a,o)}function Pd(t,e){Yc(t,"connected",e),e===!1&&eI(t)}function JT(t,e){ae(e,(n,r)=>{Yc(t,n,r)})}function Yc(t,e,n){const r=new L("/.info/"+e),i=K(n);t.infoData_.updateSnapshot(r,i);const s=bi(t.infoSyncTree_,r,i);Me(t.eventQueue_,r,s)}function Kc(t){return t.nextWriteId_++}function XT(t,e,n){const r=IT(t.serverSyncTree_,e);return r!=null?Promise.resolve(r):t.server_.get(e).then(i=>{const s=K(i).withIndex(e._queryParams.getIndex());La(t.serverSyncTree_,e,n,!0);let o;if(e._queryParams.loadsAllData())o=bi(t.serverSyncTree_,e._path,s);else{const a=oi(t.serverSyncTree_,e);o=Tp(t.serverSyncTree_,e._path,s,a)}return Me(t.eventQueue_,e._path,o),Ss(t.serverSyncTree_,e,n,null,!0),s},i=>(Ci(t,"get for query "+ne(e)+" failed: "+i),Promise.reject(new Error(i))))}function QT(t,e,n,r,i){Ci(t,"set",{path:e.toString(),value:n,priority:r});const s=io(t),o=K(n,r),a=Fc(t.serverSyncTree_,e),c=Pp(o,a,s),l=Kc(t),u=Cp(t.serverSyncTree_,e,c,l,!0);ro(t.eventQueue_,u),t.server_.put(e.toString(),o.val(!0),(h,f)=>{const p=h==="ok";p||me("set at "+e+" failed: "+h);const _=kt(t.serverSyncTree_,l,!p);Me(t.eventQueue_,e,_),jt(t,i,h,f)});const d=Xc(t,e);nr(t,d),Me(t.eventQueue_,d,[])}function ZT(t,e,n,r){Ci(t,"update",{path:e.toString(),value:n});let i=!0;const s=io(t),o={};if(ae(n,(a,c)=>{i=!1,o[a]=Ap(q(e,a),K(c),t.serverSyncTree_,s)}),i)oe("update() called with empty data.  Don't do anything."),jt(t,r,"ok",void 0);else{const a=Kc(t),c=wT(t.serverSyncTree_,e,o,a);ro(t.eventQueue_,c),t.server_.merge(e.toString(),n,(l,u)=>{const d=l==="ok";d||me("update at "+e+" failed: "+l);const h=kt(t.serverSyncTree_,a,!d),f=h.length>0?nr(t,e):e;Me(t.eventQueue_,f,h),jt(t,r,l,u)}),ae(n,l=>{const u=Xc(t,q(e,l));nr(t,u)}),Me(t.eventQueue_,e,[])}}function eI(t){Ci(t,"onDisconnectEvents");const e=io(t),n=gs();Ia(t.onDisconnect_,P(),(i,s)=>{const o=Ap(i,s,t.serverSyncTree_,e);mr(n,i,o)});let r=[];Ia(n,P(),(i,s)=>{r=r.concat(bi(t.serverSyncTree_,i,s));const o=Xc(t,i);nr(t,o)}),t.onDisconnect_=gs(),Me(t.eventQueue_,P(),r)}function tI(t,e,n){t.server_.onDisconnectCancel(e.toString(),(r,i)=>{r==="ok"&&Ta(t.onDisconnect_,e),jt(t,n,r,i)})}function Nd(t,e,n,r){const i=K(n);t.server_.onDisconnectPut(e.toString(),i.val(!0),(s,o)=>{s==="ok"&&mr(t.onDisconnect_,e,i),jt(t,r,s,o)})}function nI(t,e,n,r,i){const s=K(n,r);t.server_.onDisconnectPut(e.toString(),s.val(!0),(o,a)=>{o==="ok"&&mr(t.onDisconnect_,e,s),jt(t,i,o,a)})}function rI(t,e,n,r){if(cs(n)){oe("onDisconnect().update() called with empty data.  Don't do anything."),jt(t,r,"ok",void 0);return}t.server_.onDisconnectMerge(e.toString(),n,(i,s)=>{i==="ok"&&ae(n,(o,a)=>{const c=K(a);mr(t.onDisconnect_,q(e,o),c)}),jt(t,r,i,s)})}function iI(t,e,n){let r;I(e._path)===".info"?r=La(t.infoSyncTree_,e,n):r=La(t.serverSyncTree_,e,n),Fp(t.eventQueue_,e._path,r)}function Bp(t,e,n){let r;I(e._path)===".info"?r=Ss(t.infoSyncTree_,e,n):r=Ss(t.serverSyncTree_,e,n),Fp(t.eventQueue_,e._path,r)}function sI(t){t.persistentConnection_&&t.persistentConnection_.interrupt(GT)}function Ci(t,...e){let n="";t.persistentConnection_&&(n=t.persistentConnection_.id+":"),oe(n,...e)}function jt(t,e,n,r){e&&gr(()=>{if(n==="ok")e(null);else{const i=(n||"error").toUpperCase();let s=i;r&&(s+=": "+r);const o=new Error(s);o.code=i,e(o)}})}function Hp(t,e,n){return Fc(t.serverSyncTree_,e,n)||v.EMPTY_NODE}function Jc(t,e=t.transactionQueueTree_){if(e||so(t,e),yr(e)){const n=Vp(t,e);g(n.length>0,"Sending zero length transaction queue"),n.every(i=>i.status===0)&&oI(t,Si(e),n)}else Lp(e)&&to(e,n=>{Jc(t,n)})}function oI(t,e,n){const r=n.map(l=>l.currentWriteId),i=Hp(t,e,r);let s=i;const o=i.hash();for(let l=0;l<n.length;l++){const u=n[l];g(u.status===0,"tryToSendTransactionQueue_: items in queue should all be run."),u.status=1,u.retryCount++;const d=ge(e,u.path);s=s.updateChild(d,u.currentOutputSnapshotRaw)}const a=s.val(!0),c=e;t.server_.put(c.toString(),a,l=>{Ci(t,"transaction put response",{path:c.toString(),status:l});let u=[];if(l==="ok"){const d=[];for(let h=0;h<n.length;h++)n[h].status=2,u=u.concat(kt(t.serverSyncTree_,n[h].currentWriteId)),n[h].onComplete&&d.push(()=>n[h].onComplete(null,!0,n[h].currentOutputSnapshotResolved)),n[h].unwatcher();so(t,zc(t.transactionQueueTree_,e)),Jc(t,t.transactionQueueTree_),Me(t.eventQueue_,e,u);for(let h=0;h<d.length;h++)gr(d[h])}else{if(l==="datastale")for(let d=0;d<n.length;d++)n[d].status===3?n[d].status=4:n[d].status=0;else{me("transaction at "+c.toString()+" failed: "+l);for(let d=0;d<n.length;d++)n[d].status=4,n[d].abortReason=l}nr(t,e)}},o)}function nr(t,e){const n=Wp(t,e),r=Si(n),i=Vp(t,n);return aI(t,i,r),r}function aI(t,e,n){if(e.length===0)return;const r=[];let i=[];const o=e.filter(a=>a.status===0).map(a=>a.currentWriteId);for(let a=0;a<e.length;a++){const c=e[a],l=ge(n,c.path);let u=!1,d;if(g(l!==null,"rerunTransactionsUnderNode_: relativePath should not be null."),c.status===4)u=!0,d=c.abortReason,i=i.concat(kt(t.serverSyncTree_,c.currentWriteId,!0));else if(c.status===0)if(c.retryCount>=qT)u=!0,d="maxretry",i=i.concat(kt(t.serverSyncTree_,c.currentWriteId,!0));else{const h=Hp(t,c.path,o);c.currentInputSnapshot=h;const f=e[a].update(h.val());if(f!==void 0){no("transaction failed: Data returned ",f,c.path);let p=K(f);typeof f=="object"&&f!=null&&nt(f,".priority")||(p=p.updatePriority(h.getPriority()));const m=c.currentWriteId,T=io(t),V=Pp(p,h,T);c.currentOutputSnapshotRaw=p,c.currentOutputSnapshotResolved=V,c.currentWriteId=Kc(t),o.splice(o.indexOf(m),1),i=i.concat(Cp(t.serverSyncTree_,c.path,V,c.currentWriteId,c.applyLocally)),i=i.concat(kt(t.serverSyncTree_,m,!0))}else u=!0,d="nodata",i=i.concat(kt(t.serverSyncTree_,c.currentWriteId,!0))}Me(t.eventQueue_,n,i),i=[],u&&(e[a].status=2,(function(h){setTimeout(h,Math.floor(0))})(e[a].unwatcher),e[a].onComplete&&(d==="nodata"?r.push(()=>e[a].onComplete(null,!1,e[a].currentInputSnapshot)):r.push(()=>e[a].onComplete(new Error(d),!1,null))))}so(t,t.transactionQueueTree_);for(let a=0;a<r.length;a++)gr(r[a]);Jc(t,t.transactionQueueTree_)}function Wp(t,e){let n,r=t.transactionQueueTree_;for(n=I(e);n!==null&&yr(r)===void 0;)r=zc(r,n),e=x(e),n=I(e);return r}function Vp(t,e){const n=[];return jp(t,e,n),n.sort((r,i)=>r.order-i.order),n}function jp(t,e,n){const r=yr(e);if(r)for(let i=0;i<r.length;i++)n.push(r[i]);to(e,i=>{jp(t,i,n)})}function so(t,e){const n=yr(e);if(n){let r=0;for(let i=0;i<n.length;i++)n[i].status!==2&&(n[r]=n[i],r++);n.length=r,Np(e,n.length>0?n:void 0)}to(e,r=>{so(t,r)})}function Xc(t,e){const n=Si(Wp(t,e)),r=zc(t.transactionQueueTree_,e);return MT(r,i=>{Wo(t,i)}),Wo(t,r),Op(r,i=>{Wo(t,i)}),n}function Wo(t,e){const n=yr(e);if(n){const r=[];let i=[],s=-1;for(let o=0;o<n.length;o++)n[o].status===3||(n[o].status===1?(g(s===o-1,"All SENT items should be at beginning of queue."),s=o,n[o].status=3,n[o].abortReason="set"):(g(n[o].status===0,"Unexpected transaction status in abort"),n[o].unwatcher(),i=i.concat(kt(t.serverSyncTree_,n[o].currentWriteId,!0)),n[o].onComplete&&r.push(n[o].onComplete.bind(null,new Error("set"),!1,null))));s===-1?Np(e,void 0):n.length=s+1,Me(t.eventQueue_,Si(e),i);for(let o=0;o<r.length;o++)gr(r[o])}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function cI(t){let e="";const n=t.split("/");for(let r=0;r<n.length;r++)if(n[r].length>0){let i=n[r];try{i=decodeURIComponent(i.replace(/\+/g," "))}catch{}e+="/"+i}return e}function lI(t){const e={};t.charAt(0)==="?"&&(t=t.substring(1));for(const n of t.split("&")){if(n.length===0)continue;const r=n.split("=");r.length===2?e[decodeURIComponent(r[0])]=decodeURIComponent(r[1]):me(`Invalid query segment '${n}' in query '${t}'`)}return e}const Ld=function(t,e){const n=uI(t),r=n.namespace;n.domain==="firebase.com"&&yt(n.host+" is no longer supported. Please use <YOUR FIREBASE>.firebaseio.com instead"),(!r||r==="undefined")&&n.domain!=="localhost"&&yt("Cannot parse Firebase url. Please use https://<YOUR FIREBASE>.firebaseio.com"),n.secure||yS();const i=n.scheme==="ws"||n.scheme==="wss";return{repoInfo:new qf(n.host,n.secure,r,i,e,"",r!==n.subdomain),path:new L(n.pathString)}},uI=function(t){let e="",n="",r="",i="",s="",o=!0,a="https",c=443;if(typeof t=="string"){let l=t.indexOf("//");l>=0&&(a=t.substring(0,l-1),t=t.substring(l+2));let u=t.indexOf("/");u===-1&&(u=t.length);let d=t.indexOf("?");d===-1&&(d=t.length),e=t.substring(0,Math.min(u,d)),u<d&&(i=cI(t.substring(u,d)));const h=lI(t.substring(Math.min(t.length,d)));l=e.indexOf(":"),l>=0?(o=a==="https"||a==="wss",c=parseInt(e.substring(l+1),10)):l=e.length;const f=e.slice(0,l);if(f.toLowerCase()==="localhost")n="localhost";else if(f.split(".").length<=2)n=f;else{const p=e.indexOf(".");r=e.substring(0,p).toLowerCase(),n=e.substring(p+1),s=r}"ns"in h&&(s=h.ns)}return{host:e,port:c,domain:n,subdomain:r,secure:o,scheme:a,pathString:i,namespace:s}};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Od="-0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ_abcdefghijklmnopqrstuvwxyz",dI=(function(){let t=0;const e=[];return function(n){const r=n===t;t=n;let i;const s=new Array(8);for(i=7;i>=0;i--)s[i]=Od.charAt(n%64),n=Math.floor(n/64);g(n===0,"Cannot push at time == 0");let o=s.join("");if(r){for(i=11;i>=0&&e[i]===63;i--)e[i]=0;e[i]++}else for(i=0;i<12;i++)e[i]=Math.floor(Math.random()*64);for(i=0;i<12;i++)o+=Od.charAt(e[i]);return g(o.length===20,"nextPushId: Length should be 20."),o}})();/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class zp{constructor(e,n,r,i){this.eventType=e,this.eventRegistration=n,this.snapshot=r,this.prevName=i}getPath(){const e=this.snapshot.ref;return this.eventType==="value"?e._path:e.parent._path}getEventType(){return this.eventType}getEventRunner(){return this.eventRegistration.getEventRunner(this)}toString(){return this.getPath().toString()+":"+this.eventType+":"+ne(this.snapshot.exportVal())}}class Gp{constructor(e,n,r){this.eventRegistration=e,this.error=n,this.path=r}getPath(){return this.path}getEventType(){return"cancel"}getEventRunner(){return this.eventRegistration.getEventRunner(this)}toString(){return this.path.toString()+":cancel"}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Qc{constructor(e,n){this.snapshotCallback=e,this.cancelCallback=n}onValue(e,n){this.snapshotCallback.call(null,e,n)}onCancel(e){return g(this.hasCancelCallback,"Raising a cancel event on a listener with no cancel callback"),this.cancelCallback.call(null,e)}get hasCancelCallback(){return!!this.cancelCallback}matches(e){return this.snapshotCallback===e.snapshotCallback||this.snapshotCallback.userCallback!==void 0&&this.snapshotCallback.userCallback===e.snapshotCallback.userCallback&&this.snapshotCallback.context===e.snapshotCallback.context}}/**
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
 */class qp{constructor(e,n){this._repo=e,this._path=n}cancel(){const e=new ve;return tI(this._repo,this._path,e.wrapCallback(()=>{})),e.promise}remove(){Rt("OnDisconnect.remove",this._path);const e=new ve;return Nd(this._repo,this._path,null,e.wrapCallback(()=>{})),e.promise}set(e){Rt("OnDisconnect.set",this._path),Cs("OnDisconnect.set",e,this._path,!1);const n=new ve;return Nd(this._repo,this._path,e,n.wrapCallback(()=>{})),n.promise}setWithPriority(e,n){Rt("OnDisconnect.setWithPriority",this._path),Cs("OnDisconnect.setWithPriority",e,this._path,!1),HT("OnDisconnect.setWithPriority",n);const r=new ve;return nI(this._repo,this._path,e,n,r.wrapCallback(()=>{})),r.promise}update(e){Rt("OnDisconnect.update",this._path),xp("OnDisconnect.update",e,this._path);const n=new ve;return rI(this._repo,this._path,e,n.wrapCallback(()=>{})),n.promise}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class oo{constructor(e,n,r,i){this._repo=e,this._path=n,this._queryParams=r,this._orderByCalled=i}get key(){return k(this._path)?null:Tc(this._path)}get ref(){return new Ke(this._repo,this._path)}get _queryIdentifier(){const e=_d(this._queryParams),n=wc(e);return n==="{}"?"default":n}get _queryObject(){return _d(this._queryParams)}isEqual(e){if(e=ce(e),!(e instanceof oo))return!1;const n=this._repo===e._repo,r=Ic(this._path,e._path),i=this._queryIdentifier===e._queryIdentifier;return n&&r&&i}toJSON(){return this.toString()}toString(){return this._repo.toString()+tC(this._path)}}class Ke extends oo{constructor(e,n){super(e,n,new Js,!1)}get parent(){const e=np(this._path);return e===null?null:new Ke(this._repo,e)}get root(){let e=this;for(;e.parent!==null;)e=e.parent;return e}}class yn{constructor(e,n,r){this._node=e,this.ref=n,this._index=r}get priority(){return this._node.getPriority().val()}get key(){return this.ref.key}get size(){return this._node.numChildren()}child(e){const n=new L(e),r=En(this.ref,e);return new yn(this._node.getChild(n),r,Y)}exists(){return!this._node.isEmpty()}exportVal(){return this._node.val(!0)}forEach(e){return this._node.isLeafNode()?!1:!!this._node.forEachChild(this._index,(r,i)=>e(new yn(i,En(this.ref,r),Y)))}hasChild(e){const n=new L(e);return!this._node.getChild(n).isEmpty()}hasChildren(){return this._node.isLeafNode()?!1:!this._node.isEmpty()}toJSON(){return this.exportVal()}val(){return this._node.val()}}function N(t,e){return t=ce(t),t._checkNotDeleted("ref"),e!==void 0?En(t._root,e):t._root}function En(t,e){return t=ce(t),I(t._path)===null?WT("child","path",e):qc("child","path",e),new Ke(t._repo,q(t._path,e))}function Yp(t){return t=ce(t),new qp(t._repo,t._path)}function Ts(t,e){t=ce(t),Rt("push",t._path),Cs("push",e,t._path,!0);const n=$p(t._repo),r=dI(n),i=En(t,r),s=En(t,r);let o;return o=Promise.resolve(s),i.then=o.then.bind(o),i.catch=o.then.bind(o,void 0),i}function vn(t){return Rt("remove",t._path),Re(t,null)}function Re(t,e){t=ce(t),Rt("set",t._path),Cs("set",e,t._path,!1);const n=new ve;return QT(t._repo,t._path,e,null,n.wrapCallback(()=>{})),n.promise}function cn(t,e){xp("update",e,t._path);const n=new ve;return ZT(t._repo,t._path,e,n.wrapCallback(()=>{})),n.promise}function xt(t){t=ce(t);const e=new Qc(()=>{}),n=new Ti(e);return XT(t._repo,t,n).then(r=>new yn(r,new Ke(t._repo,t._path),t._queryParams.getIndex()))}class Ti{constructor(e){this.callbackContext=e}respondsTo(e){return e==="value"}createEvent(e,n){const r=n._queryParams.getIndex();return new zp("value",this,new yn(e.snapshotNode,new Ke(n._repo,n._path),r))}getEventRunner(e){return e.getEventType()==="cancel"?()=>this.callbackContext.onCancel(e.error):()=>this.callbackContext.onValue(e.snapshot,null)}createCancelEvent(e,n){return this.callbackContext.hasCancelCallback?new Gp(this,e,n):null}matches(e){return e instanceof Ti?!e.callbackContext||!this.callbackContext?!0:e.callbackContext.matches(this.callbackContext):!1}hasAnyCallback(){return this.callbackContext!==null}}class ao{constructor(e,n){this.eventType=e,this.callbackContext=n}respondsTo(e){let n=e==="children_added"?"child_added":e;return n=n==="children_removed"?"child_removed":n,this.eventType===n}createCancelEvent(e,n){return this.callbackContext.hasCancelCallback?new Gp(this,e,n):null}createEvent(e,n){g(e.childName!=null,"Child events should have a childName.");const r=En(new Ke(n._repo,n._path),e.childName),i=n._queryParams.getIndex();return new zp(e.type,this,new yn(e.snapshotNode,r,i),e.prevName)}getEventRunner(e){return e.getEventType()==="cancel"?()=>this.callbackContext.onCancel(e.error):()=>this.callbackContext.onValue(e.snapshot,e.prevName)}matches(e){return e instanceof ao?this.eventType===e.eventType&&(!this.callbackContext||!e.callbackContext||this.callbackContext.matches(e.callbackContext)):!1}hasAnyCallback(){return!!this.callbackContext}}function Zc(t,e,n,r,i){const s=new Qc(n,void 0),o=e==="value"?new Ti(s):new ao(e,s);return iI(t._repo,t,o),()=>Bp(t._repo,t,o)}function el(t,e,n,r){return Zc(t,"value",e)}function co(t,e,n,r){return Zc(t,"child_added",e)}function Kp(t,e,n,r){return Zc(t,"child_removed",e)}function kn(t,e,n){let r=null;const i=n?new Qc(n):null;e==="value"?r=new Ti(i):e&&(r=new ao(e,i)),Bp(t._repo,t,r)}fT(Ke);yT(Ke);/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const hI="FIREBASE_DATABASE_EMULATOR_HOST",Da={};let fI=!1;function pI(t,e,n,r){const i=e.lastIndexOf(":"),s=e.substring(0,i),o=dr(s);t.repoInfo_=new qf(e,o,t.repoInfo_.namespace,t.repoInfo_.webSocketOnly,t.repoInfo_.nodeAdmin,t.repoInfo_.persistenceKey,t.repoInfo_.includeNamespaceInQueryParams,!0,n),r&&(t.authTokenProvider_=r)}function Jp(t,e,n,r,i){let s=r||t.options.databaseURL;s===void 0&&(t.options.projectId||yt("Can't determine Firebase Database URL. Be sure to include  a Project ID when calling firebase.initializeApp()."),oe("Using default host for project ",t.options.projectId),s=`${t.options.projectId}-default-rtdb.firebaseio.com`);let o=Ld(s,i),a=o.repoInfo,c;typeof process<"u"&&Zu&&(c=Zu[hI]),c?(s=`http://${c}?ns=${a.namespace}`,o=Ld(s,i),a=o.repoInfo):o.repoInfo.secure;const l=new AS(t.name,t.options,e);VT("Invalid Firebase Database URL",o),k(o.path)||yt("Database URL must point to the root of a Firebase Database (not including a child path).");const u=mI(a,t,l,new RS(t,n));return new Xp(u,t)}function gI(t,e){const n=Da[e];(!n||n[t.key]!==t)&&yt(`Database ${e}(${t.repoInfo_}) has already been deleted.`),sI(t),delete n[t.key]}function mI(t,e,n,r){let i=Da[e.name];i||(i={},Da[e.name]=i);let s=i[t.toURLString()];return s&&yt("Database initialized multiple times. Please make sure the format of the database URL matches with each database() call."),s=new YT(t,fI,n,r),i[t.toURLString()]=s,s}class Xp{constructor(e,n){this._repoInternal=e,this.app=n,this.type="database",this._instanceStarted=!1}get _repo(){return this._instanceStarted||(KT(this._repoInternal,this.app.options.appId,this.app.options.databaseAuthVariableOverride),this._instanceStarted=!0),this._repoInternal}get _root(){return this._rootInternal||(this._rootInternal=new Ke(this._repo,P())),this._rootInternal}_delete(){return this._rootInternal!==null&&(gI(this._repo,this.app.name),this._repoInternal=null,this._rootInternal=null),Promise.resolve()}_checkNotDeleted(e){this._rootInternal===null&&yt("Cannot call "+e+" on a deleted database.")}}function Qp(t=vc(),e){const n=yi(t,"database").getImmediate({identifier:e});if(!n._instanceStarted){const r=Mw("database");r&&Zp(n,...r)}return n}function Zp(t,e,n,r={}){t=ce(t),t._checkNotDeleted("useEmulator");const i=`${e}:${n}`,s=t._repoInternal;if(t._instanceStarted){if(i===t._repoInternal.repoInfo_.host&&pn(r,s.repoInfo_.emulatorOptions))return;yt("connectDatabaseEmulator() cannot initialize or alter the emulator configuration after the database instance has started.")}let o;if(s.repoInfo_.nodeAdmin)r.mockUserToken&&yt('mockUserToken is not supported by the Admin SDK. For client access with mock users, please use the "firebase" package instead of "firebase-admin".'),o=new Yi(Yi.OWNER);else if(r.mockUserToken){const a=typeof r.mockUserToken=="string"?r.mockUserToken:xw(r.mockUserToken,t.app.options.projectId);o=new Yi(a)}dr(e)&&(Sf(e),Cf("Database",!0)),pI(s,i,r,o)}/**
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
 */function _I(t){Of(pr),Bt(new mt("database",(e,{instanceIdentifier:n})=>{const r=e.getProvider("app").getImmediate(),i=e.getProvider("auth-internal"),s=e.getProvider("app-check-internal");return Jp(r,i,s,n)},"PUBLIC").setMultipleInstances(!0)),ft(ed,td,t),ft(ed,td,"esm2020")}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const yI={".sv":"timestamp"};function ln(){return yI}pt.prototype.simpleListen=function(t,e){this.sendRequest("q",{p:t},e)};pt.prototype.echo=function(t,e){this.sendRequest("echo",{d:t},e)};_I();const tl=Object.freeze(Object.defineProperty({__proto__:null,DataSnapshot:yn,Database:Xp,OnDisconnect:qp,_QueryImpl:oo,_QueryParams:Js,_ReferenceImpl:Ke,_repoManagerDatabaseFromApp:Jp,_setSDKVersion:Of,_validatePathString:qc,_validateWritablePath:Rt,child:En,connectDatabaseEmulator:Zp,get:xt,getDatabase:Qp,off:kn,onChildAdded:co,onChildRemoved:Kp,onDisconnect:Yp,onValue:el,push:Ts,ref:N,remove:vn,serverTimestamp:ln,set:Re,update:cn},Symbol.toStringTag,{value:"Module"}));var EI="firebase",vI="12.4.0";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ft(EI,vI,"app");/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ma=new Map,eg={activated:!1,tokenObservers:[]},wI={initialized:!1,enabled:!1};function re(t){return Ma.get(t)||{...eg}}function bI(t,e){return Ma.set(t,e),Ma.get(t)}function lo(){return wI}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const tg="https://content-firebaseappcheck.googleapis.com/v1",SI="exchangeRecaptchaEnterpriseToken",CI="exchangeDebugToken",Dd={RETRIAL_MIN_WAIT:30*1e3,RETRIAL_MAX_WAIT:960*1e3},TI=1440*60*1e3;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class II{constructor(e,n,r,i,s){if(this.operation=e,this.retryPolicy=n,this.getWaitDuration=r,this.lowerBound=i,this.upperBound=s,this.pending=null,this.nextErrorWaitInterval=i,i>s)throw new Error("Proactive refresh lower bound greater than upper bound!")}start(){this.nextErrorWaitInterval=this.lowerBound,this.process(!0).catch(()=>{})}stop(){this.pending&&(this.pending.reject("cancelled"),this.pending=null)}isRunning(){return!!this.pending}async process(e){this.stop();try{this.pending=new ve,this.pending.promise.catch(n=>{}),await kI(this.getNextRun(e)),this.pending.resolve(),await this.pending.promise,this.pending=new ve,this.pending.promise.catch(n=>{}),await this.operation(),this.pending.resolve(),await this.pending.promise,this.process(!0).catch(()=>{})}catch(n){this.retryPolicy(n)?this.process(!1).catch(()=>{}):this.stop()}}getNextRun(e){if(e)return this.nextErrorWaitInterval=this.lowerBound,this.getWaitDuration();{const n=this.nextErrorWaitInterval;return this.nextErrorWaitInterval*=2,this.nextErrorWaitInterval>this.upperBound&&(this.nextErrorWaitInterval=this.upperBound),n}}}function kI(t){return new Promise(e=>{setTimeout(e,t)})}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const RI={"already-initialized":"You have already called initializeAppCheck() for FirebaseApp {$appName} with different options. To avoid this error, call initializeAppCheck() with the same options as when it was originally called. This will return the already initialized instance.","use-before-activation":"App Check is being used before initializeAppCheck() is called for FirebaseApp {$appName}. Call initializeAppCheck() before instantiating other Firebase services.","fetch-network-error":"Fetch failed to connect to a network. Check Internet connection. Original error: {$originalErrorMessage}.","fetch-parse-error":"Fetch client could not parse response. Original error: {$originalErrorMessage}.","fetch-status-error":"Fetch server returned an HTTP error status. HTTP status: {$httpStatus}.","storage-open":"Error thrown when opening storage. Original error: {$originalErrorMessage}.","storage-get":"Error thrown when reading from storage. Original error: {$originalErrorMessage}.","storage-set":"Error thrown when writing to storage. Original error: {$originalErrorMessage}.","recaptcha-error":"ReCAPTCHA error.","initial-throttle":"{$httpStatus} error. Attempts allowed again after {$time}",throttled:"Requests throttled due to previous {$httpStatus} error. Attempts allowed again after {$time}"},be=new hr("appCheck","AppCheck",RI);/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Md(t=!1){return t?self.grecaptcha?.enterprise:self.grecaptcha}function nl(t){if(!re(t).activated)throw be.create("use-before-activation",{appName:t.name})}function ng(t){const e=Math.round(t/1e3),n=Math.floor(e/(3600*24)),r=Math.floor((e-n*3600*24)/3600),i=Math.floor((e-n*3600*24-r*3600)/60),s=e-n*3600*24-r*3600-i*60;let o="";return n&&(o+=Fi(n)+"d:"),r&&(o+=Fi(r)+"h:"),o+=Fi(i)+"m:"+Fi(s)+"s",o}function Fi(t){return t===0?"00":t>=10?t.toString():"0"+t}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function rl({url:t,body:e},n){const r={"Content-Type":"application/json"},i=n.getImmediate({optional:!0});if(i){const d=await i.getHeartbeatsHeader();d&&(r["X-Firebase-Client"]=d)}const s={method:"POST",body:JSON.stringify(e),headers:r};let o;try{o=await fetch(t,s)}catch(d){throw be.create("fetch-network-error",{originalErrorMessage:d?.message})}if(o.status!==200)throw be.create("fetch-status-error",{httpStatus:o.status});let a;try{a=await o.json()}catch(d){throw be.create("fetch-parse-error",{originalErrorMessage:d?.message})}const c=a.ttl.match(/^([\d.]+)(s)$/);if(!c||!c[2]||isNaN(Number(c[1])))throw be.create("fetch-parse-error",{originalErrorMessage:`ttl field (timeToLive) is not in standard Protobuf Duration format: ${a.ttl}`});const l=Number(c[1])*1e3,u=Date.now();return{token:a.token,expireTimeMillis:u+l,issuedAtTimeMillis:u}}function AI(t,e){const{projectId:n,appId:r,apiKey:i}=t.options;return{url:`${tg}/projects/${n}/apps/${r}:${SI}?key=${i}`,body:{recaptcha_enterprise_token:e}}}function rg(t,e){const{projectId:n,appId:r,apiKey:i}=t.options;return{url:`${tg}/projects/${n}/apps/${r}:${CI}?key=${i}`,body:{debug_token:e}}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const PI="firebase-app-check-database",NI=1,ai="firebase-app-check-store",ig="debug-token";let Ui=null;function sg(){return Ui||(Ui=new Promise((t,e)=>{try{const n=indexedDB.open(PI,NI);n.onsuccess=r=>{t(r.target.result)},n.onerror=r=>{e(be.create("storage-open",{originalErrorMessage:r.target.error?.message}))},n.onupgradeneeded=r=>{const i=r.target.result;switch(r.oldVersion){case 0:i.createObjectStore(ai,{keyPath:"compositeKey"})}}}catch(n){e(be.create("storage-open",{originalErrorMessage:n?.message}))}}),Ui)}function LI(t){return ag(cg(t))}function OI(t,e){return og(cg(t),e)}function DI(t){return og(ig,t)}function MI(){return ag(ig)}async function og(t,e){const r=(await sg()).transaction(ai,"readwrite"),s=r.objectStore(ai).put({compositeKey:t,value:e});return new Promise((o,a)=>{s.onsuccess=c=>{o()},r.onerror=c=>{a(be.create("storage-set",{originalErrorMessage:c.target.error?.message}))}})}async function ag(t){const n=(await sg()).transaction(ai,"readonly"),i=n.objectStore(ai).get(t);return new Promise((s,o)=>{i.onsuccess=a=>{const c=a.target.result;s(c?c.value:void 0)},n.onerror=a=>{o(be.create("storage-get",{originalErrorMessage:a.target.error?.message}))}})}function cg(t){return`${t.options.appId}-${t.name}`}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const At=new qs("@firebase/app-check");/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function xI(t){if(yc()){let e;try{e=await LI(t)}catch(n){At.warn(`Failed to read token from IndexedDB. Error: ${n}`)}return e}}function Vo(t,e){return yc()?OI(t,e).catch(n=>{At.warn(`Failed to write token to IndexedDB. Error: ${n}`)}):Promise.resolve()}async function FI(){let t;try{t=await MI()}catch{}if(t)return t;{const e=crypto.randomUUID();return DI(e).catch(n=>At.warn(`Failed to persist debug token to IndexedDB. Error: ${n}`)),e}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function il(){return lo().enabled}async function sl(){const t=lo();if(t.enabled&&t.token)return t.token.promise;throw Error(`
            Can't get debug token in production mode.
        `)}function UI(){const t=Ef(),e=lo();if(e.initialized=!0,typeof t.FIREBASE_APPCHECK_DEBUG_TOKEN!="string"&&t.FIREBASE_APPCHECK_DEBUG_TOKEN!==!0)return;e.enabled=!0;const n=new ve;e.token=n,typeof t.FIREBASE_APPCHECK_DEBUG_TOKEN=="string"?n.resolve(t.FIREBASE_APPCHECK_DEBUG_TOKEN):n.resolve(FI())}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const $I={error:"UNKNOWN_ERROR"};function BI(t){return zs.encodeString(JSON.stringify(t),!1)}async function xa(t,e=!1,n=!1){const r=t.app;nl(r);const i=re(r);let s=i.token,o;if(s&&!Dn(s)&&(i.token=void 0,s=void 0),!s){const l=await i.cachedTokenPromise;l&&(Dn(l)?s=l:await Vo(r,void 0))}if(!e&&s&&Dn(s))return{token:s.token};let a=!1;if(il())try{i.exchangeTokenPromise||(i.exchangeTokenPromise=rl(rg(r,await sl()),t.heartbeatServiceProvider).finally(()=>{i.exchangeTokenPromise=void 0}),a=!0);const l=await i.exchangeTokenPromise;return await Vo(r,l),i.token=l,{token:l.token}}catch(l){return l.code==="appCheck/throttled"||l.code==="appCheck/initial-throttle"?At.warn(l.message):n&&At.error(l),jo(l)}try{i.exchangeTokenPromise||(i.exchangeTokenPromise=i.provider.getToken().finally(()=>{i.exchangeTokenPromise=void 0}),a=!0),s=await re(r).exchangeTokenPromise}catch(l){l.code==="appCheck/throttled"||l.code==="appCheck/initial-throttle"?At.warn(l.message):n&&At.error(l),o=l}let c;return s?o?Dn(s)?c={token:s.token,internalError:o}:c=jo(o):(c={token:s.token},i.token=s,await Vo(r,s)):c=jo(o),a&&dg(r,c),c}async function HI(t){const e=t.app;nl(e);const{provider:n}=re(e);if(il()){const r=await sl(),{token:i}=await rl(rg(e,r),t.heartbeatServiceProvider);return{token:i}}else{const{token:r}=await n.getToken();return{token:r}}}function lg(t,e,n,r){const{app:i}=t,s=re(i),o={next:n,error:r,type:e};if(s.tokenObservers=[...s.tokenObservers,o],s.token&&Dn(s.token)){const a=s.token;Promise.resolve().then(()=>{n({token:a.token}),xd(t)}).catch(()=>{})}s.cachedTokenPromise.then(()=>xd(t))}function ug(t,e){const n=re(t),r=n.tokenObservers.filter(i=>i.next!==e);r.length===0&&n.tokenRefresher&&n.tokenRefresher.isRunning()&&n.tokenRefresher.stop(),n.tokenObservers=r}function xd(t){const{app:e}=t,n=re(e);let r=n.tokenRefresher;r||(r=WI(t),n.tokenRefresher=r),!r.isRunning()&&n.isTokenAutoRefreshEnabled&&r.start()}function WI(t){const{app:e}=t;return new II(async()=>{const n=re(e);let r;if(n.token?r=await xa(t,!0):r=await xa(t),r.error)throw r.error;if(r.internalError)throw r.internalError},()=>!0,()=>{const n=re(e);if(n.token){let r=n.token.issuedAtTimeMillis+(n.token.expireTimeMillis-n.token.issuedAtTimeMillis)*.5+3e5;const i=n.token.expireTimeMillis-300*1e3;return r=Math.min(r,i),Math.max(0,r-Date.now())}else return 0},Dd.RETRIAL_MIN_WAIT,Dd.RETRIAL_MAX_WAIT)}function dg(t,e){const n=re(t).tokenObservers;for(const r of n)try{r.type==="EXTERNAL"&&e.error!=null?r.error(e.error):r.next(e)}catch{}}function Dn(t){return t.expireTimeMillis-Date.now()>0}function jo(t){return{token:BI($I),error:t}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class VI{constructor(e,n){this.app=e,this.heartbeatServiceProvider=n}_delete(){const{tokenObservers:e}=re(this.app);for(const n of e)ug(this.app,n.next);return Promise.resolve()}}function jI(t,e){return new VI(t,e)}function zI(t){return{getToken:e=>xa(t,e),getLimitedUseToken:()=>HI(t),addTokenListener:e=>lg(t,"INTERNAL",e),removeTokenListener:e=>ug(t.app,e)}}const GI="@firebase/app-check",qI="0.11.0",YI="https://www.google.com/recaptcha/enterprise.js";function KI(t,e){const n=new ve,r=re(t);r.reCAPTCHAState={initialized:n};const i=JI(t),s=Md(!0);return s?Fd(t,e,s,i,n):ZI(()=>{const o=Md(!0);if(!o)throw new Error("no recaptcha");Fd(t,e,o,i,n)}),n.promise}function Fd(t,e,n,r,i){n.ready(()=>{QI(t,e,n,r),i.resolve(n)})}function JI(t){const e=`fire_app_check_${t.name}`,n=document.createElement("div");return n.id=e,n.style.display="none",document.body.appendChild(n),e}async function XI(t){nl(t);const n=await re(t).reCAPTCHAState.initialized.promise;return new Promise((r,i)=>{const s=re(t).reCAPTCHAState;n.ready(()=>{r(n.execute(s.widgetId,{action:"fire_app_check"}))})})}function QI(t,e,n,r){const i=n.render(r,{sitekey:e,size:"invisible",callback:()=>{re(t).reCAPTCHAState.succeeded=!0},"error-callback":()=>{re(t).reCAPTCHAState.succeeded=!1}}),s=re(t);s.reCAPTCHAState={...s.reCAPTCHAState,widgetId:i}}function ZI(t){const e=document.createElement("script");e.src=YI,e.onload=t,document.head.appendChild(e)}class ol{constructor(e){this._siteKey=e,this._throttleData=null}async getToken(){tk(this._throttleData);const e=await XI(this._app).catch(r=>{throw be.create("recaptcha-error")});if(!re(this._app).reCAPTCHAState?.succeeded)throw be.create("recaptcha-error");let n;try{n=await rl(AI(this._app,e),this._heartbeatServiceProvider)}catch(r){throw r.code?.includes("fetch-status-error")?(this._throttleData=ek(Number(r.customData?.httpStatus),this._throttleData),be.create("initial-throttle",{time:ng(this._throttleData.allowRequestsAfter-Date.now()),httpStatus:this._throttleData.httpStatus})):r}return this._throttleData=null,n}initialize(e){this._app=e,this._heartbeatServiceProvider=yi(e,"heartbeat"),KI(e,this._siteKey).catch(()=>{})}isEqual(e){return e instanceof ol?this._siteKey===e._siteKey:!1}}function ek(t,e){if(t===404||t===403)return{backoffCount:1,allowRequestsAfter:Date.now()+TI,httpStatus:t};{const n=e?e.backoffCount:0,r=ib(n,1e3,2);return{backoffCount:n+1,allowRequestsAfter:Date.now()+r,httpStatus:t}}}function tk(t){if(t&&Date.now()-t.allowRequestsAfter<=0)throw be.create("throttled",{time:ng(t.allowRequestsAfter-Date.now()),httpStatus:t.httpStatus})}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function nk(t=vc(),e){t=ce(t);const n=yi(t,"app-check");if(lo().initialized||UI(),il()&&sl().then(i=>console.log(`App Check debug token: ${i}. You will need to add it to your app's App Check settings in the Firebase console for it to work.`)),n.isInitialized()){const i=n.getImmediate(),s=n.getOptions();if(s.isTokenAutoRefreshEnabled===e.isTokenAutoRefreshEnabled&&s.provider.isEqual(e.provider))return i;throw be.create("already-initialized",{appName:t.name})}const r=n.initialize({options:e});return rk(t,e.provider,e.isTokenAutoRefreshEnabled),re(t).isTokenAutoRefreshEnabled&&lg(r,"INTERNAL",()=>{}),r}function rk(t,e,n=!1){const r=bI(t,{...eg});r.activated=!0,r.provider=e,r.cachedTokenPromise=xI(t).then(i=>(i&&Dn(i)&&(r.token=i,dg(t,{token:i.token})),i)),r.isTokenAutoRefreshEnabled=n&&t.automaticDataCollectionEnabled,!t.automaticDataCollectionEnabled&&n&&At.warn("`isTokenAutoRefreshEnabled` is true but `automaticDataCollectionEnabled` was set to false during `initializeApp()`. This blocks automatic token refresh."),r.provider.initialize(t)}const ik="app-check",Ud="app-check-internal";function sk(){Bt(new mt(ik,t=>{const e=t.getProvider("app").getImmediate(),n=t.getProvider("heartbeat");return jI(e,n)},"PUBLIC").setInstantiationMode("EXPLICIT").setInstanceCreatedCallback((t,e,n)=>{t.getProvider(Ud).initialize()})),Bt(new mt(Ud,t=>{const e=t.getProvider("app-check").getImmediate();return zI(e)},"PUBLIC").setInstantiationMode("EXPLICIT")),ft(GI,qI)}sk();const ok={apiKey:"AIzaSyA-fvCaKCjyEFX__YAVr1oPGdVsUEhFehA",authDomain:"vidu-aae11.firebaseapp.com",projectId:"vidu-aae11",databaseURL:"https://vidu-aae11-default-rtdb.europe-west1.firebasedatabase.app",storageBucket:"vidu-aae11.firebasestorage.app",messagingSenderId:"765724787439",appId:"1:765724787439:web:61a3b5dd538149564c911a",measurementId:"G-EGJ53HLGY4"},al=Af(ok),$d="6LdBIBgsAAAAAB4zIcXaZI-FD4kt21TWs9Zx9_fp";let Fa;if($d.trim()!=="")Fa=new ol($d),console.info("[Firebase App Check: PROD] Initializing with ReCAPTCHA Enterprise (invisible mode).");else throw console.error("[Firebase App Check: PROD] VITE_RECAPTCHA_ENTERPRISE_SITE_KEY is missing or empty. App Check will NOT be initialized, leaving Firebase services unprotected!"),new Error("Firebase App Check configuration missing in production.");if(Fa)try{nk(al,{provider:Fa,isTokenAutoRefreshEnabled:!0})}catch(t){console.error("[Firebase App Check] initializeAppCheck call failed:",t)}const M=Qp(al),He=[];function nn(t,e,n,r=null,i=null,s=null){e==="value"?el(t,n):e==="child_added"?co(t,n):e==="child_removed"?Kp(t,n):console.warn(`Unknown listener type: ${e}`),He.push({ref:t,type:e,callback:n,roomId:r,userId:i,category:s})}function ak(){He.forEach(({ref:t,type:e,callback:n})=>{try{kn(t,e,n)}catch(r){console.warn("Failed to remove firebase rtdb listener",r)}}),He.length=0}function uo(t){if(!t)return;He.filter(r=>r.roomId===t).forEach(({ref:r,type:i,callback:s})=>{try{kn(r,i,s)}catch(o){console.warn(`Failed to remove listener for room ${t}`,o)}});const n=He.filter(r=>r.roomId!==t);He.length=0,He.push(...n)}function ck(t,e){if(!t||!e)return;const n=s=>s.userId===t&&s.roomId===e;He.filter(n).forEach(({ref:s,type:o,callback:a})=>{try{kn(s,o,a)}catch(c){console.warn(`Failed to remove listener for user ${t} in room ${e}`,c)}});const i=He.filter(s=>!n(s));He.length=0,He.push(...i)}function Ki(t,e,n=null){nn(t,"value",e,n)}const Jt=t=>N(M,`rooms/${t}`),$i=t=>N(M,`rooms/${t}/members`),Bd=(t,e)=>N(M,`rooms/${t}/members/${e}`),lk=t=>N(M,`rooms/${t}/cancellation`),ho=t=>N(M,`rooms/${t}/watch`),uk=t=>N(M,`users/${t}/recentCalls`),cl=(t,e)=>N(M,`users/${t}/recentCalls/${e}`),ll=t=>N(M,`users/${t}/outgoingCall`),hg=t=>N(M,`rooms/${t}/offerCandidates`),fg=t=>N(M,`rooms/${t}/answerCandidates`);function pg(){return{"dependent-sdk-initialized-before-auth":"Another Firebase SDK was initialized and is trying to use Auth before Auth is initialized. Please be sure to call `initializeAuth` or `getAuth` before starting any other Firebase SDK."}}const dk=pg,gg=new hr("auth","Firebase",pg());/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Is=new qs("@firebase/auth");function hk(t,...e){Is.logLevel<=O.WARN&&Is.warn(`Auth (${pr}): ${t}`,...e)}function Ji(t,...e){Is.logLevel<=O.ERROR&&Is.error(`Auth (${pr}): ${t}`,...e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function et(t,...e){throw dl(t,...e)}function ze(t,...e){return dl(t,...e)}function ul(t,e,n){const r={...dk(),[e]:n};return new hr("auth","Firebase",r).create(e,{appName:t.name})}function un(t){return ul(t,"operation-not-supported-in-this-environment","Operations that alter the current user are not supported in conjunction with FirebaseServerApp")}function fk(t,e,n){const r=n;if(!(e instanceof r))throw r.name!==e.constructor.name&&et(t,"argument-error"),ul(t,"argument-error",`Type of ${e.constructor.name} does not match expected instance.Did you pass a reference from a different Auth SDK?`)}function dl(t,...e){if(typeof t!="string"){const n=e[0],r=[...e.slice(1)];return r[0]&&(r[0].appName=t.name),t._errorFactory.create(n,...r)}return gg.create(t,...e)}function S(t,e,...n){if(!t)throw dl(e,...n)}function ot(t){const e="INTERNAL ASSERTION FAILED: "+t;throw Ji(e),new Error(e)}function Et(t,e){t||ot(e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ua(){return typeof self<"u"&&self.location?.href||""}function pk(){return Hd()==="http:"||Hd()==="https:"}function Hd(){return typeof self<"u"&&self.location?.protocol||null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function gk(){return typeof navigator<"u"&&navigator&&"onLine"in navigator&&typeof navigator.onLine=="boolean"&&(pk()||Bw()||"connection"in navigator)?navigator.onLine:!0}function mk(){if(typeof navigator>"u")return null;const t=navigator;return t.languages&&t.languages[0]||t.language||null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ii{constructor(e,n){this.shortDelay=e,this.longDelay=n,Et(n>e,"Short delay should be less than long delay!"),this.isMobile=_c()||Tf()}get(){return gk()?this.isMobile?this.longDelay:this.shortDelay:Math.min(5e3,this.shortDelay)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function hl(t,e){Et(t.emulator,"Emulator should always be set here");const{url:n}=t.emulator;return e?`${n}${e.startsWith("/")?e.slice(1):e}`:n}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class mg{static initialize(e,n,r){this.fetchImpl=e,n&&(this.headersImpl=n),r&&(this.responseImpl=r)}static fetch(){if(this.fetchImpl)return this.fetchImpl;if(typeof self<"u"&&"fetch"in self)return self.fetch;if(typeof globalThis<"u"&&globalThis.fetch)return globalThis.fetch;if(typeof fetch<"u")return fetch;ot("Could not find fetch implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static headers(){if(this.headersImpl)return this.headersImpl;if(typeof self<"u"&&"Headers"in self)return self.Headers;if(typeof globalThis<"u"&&globalThis.Headers)return globalThis.Headers;if(typeof Headers<"u")return Headers;ot("Could not find Headers implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static response(){if(this.responseImpl)return this.responseImpl;if(typeof self<"u"&&"Response"in self)return self.Response;if(typeof globalThis<"u"&&globalThis.Response)return globalThis.Response;if(typeof Response<"u")return Response;ot("Could not find Response implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const _k={CREDENTIAL_MISMATCH:"custom-token-mismatch",MISSING_CUSTOM_TOKEN:"internal-error",INVALID_IDENTIFIER:"invalid-email",MISSING_CONTINUE_URI:"internal-error",INVALID_PASSWORD:"wrong-password",MISSING_PASSWORD:"missing-password",INVALID_LOGIN_CREDENTIALS:"invalid-credential",EMAIL_EXISTS:"email-already-in-use",PASSWORD_LOGIN_DISABLED:"operation-not-allowed",INVALID_IDP_RESPONSE:"invalid-credential",INVALID_PENDING_TOKEN:"invalid-credential",FEDERATED_USER_ID_ALREADY_LINKED:"credential-already-in-use",MISSING_REQ_TYPE:"internal-error",EMAIL_NOT_FOUND:"user-not-found",RESET_PASSWORD_EXCEED_LIMIT:"too-many-requests",EXPIRED_OOB_CODE:"expired-action-code",INVALID_OOB_CODE:"invalid-action-code",MISSING_OOB_CODE:"internal-error",CREDENTIAL_TOO_OLD_LOGIN_AGAIN:"requires-recent-login",INVALID_ID_TOKEN:"invalid-user-token",TOKEN_EXPIRED:"user-token-expired",USER_NOT_FOUND:"user-token-expired",TOO_MANY_ATTEMPTS_TRY_LATER:"too-many-requests",PASSWORD_DOES_NOT_MEET_REQUIREMENTS:"password-does-not-meet-requirements",INVALID_CODE:"invalid-verification-code",INVALID_SESSION_INFO:"invalid-verification-id",INVALID_TEMPORARY_PROOF:"invalid-credential",MISSING_SESSION_INFO:"missing-verification-id",SESSION_EXPIRED:"code-expired",MISSING_ANDROID_PACKAGE_NAME:"missing-android-pkg-name",UNAUTHORIZED_DOMAIN:"unauthorized-continue-uri",INVALID_OAUTH_CLIENT_ID:"invalid-oauth-client-id",ADMIN_ONLY_OPERATION:"admin-restricted-operation",INVALID_MFA_PENDING_CREDENTIAL:"invalid-multi-factor-session",MFA_ENROLLMENT_NOT_FOUND:"multi-factor-info-not-found",MISSING_MFA_ENROLLMENT_ID:"missing-multi-factor-info",MISSING_MFA_PENDING_CREDENTIAL:"missing-multi-factor-session",SECOND_FACTOR_EXISTS:"second-factor-already-in-use",SECOND_FACTOR_LIMIT_EXCEEDED:"maximum-second-factor-count-exceeded",BLOCKING_FUNCTION_ERROR_RESPONSE:"internal-error",RECAPTCHA_NOT_ENABLED:"recaptcha-not-enabled",MISSING_RECAPTCHA_TOKEN:"missing-recaptcha-token",INVALID_RECAPTCHA_TOKEN:"invalid-recaptcha-token",INVALID_RECAPTCHA_ACTION:"invalid-recaptcha-action",MISSING_CLIENT_TYPE:"missing-client-type",MISSING_RECAPTCHA_VERSION:"missing-recaptcha-version",INVALID_RECAPTCHA_VERSION:"invalid-recaptcha-version",INVALID_REQ_TYPE:"invalid-req-type"};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const yk=["/v1/accounts:signInWithCustomToken","/v1/accounts:signInWithEmailLink","/v1/accounts:signInWithIdp","/v1/accounts:signInWithPassword","/v1/accounts:signInWithPhoneNumber","/v1/token"],Ek=new Ii(3e4,6e4);function fl(t,e){return t.tenantId&&!e.tenantId?{...e,tenantId:t.tenantId}:e}async function Er(t,e,n,r,i={}){return _g(t,i,async()=>{let s={},o={};r&&(e==="GET"?o=r:s={body:JSON.stringify(r)});const a=fr({key:t.config.apiKey,...o}).slice(1),c=await t._getAdditionalHeaders();c["Content-Type"]="application/json",t.languageCode&&(c["X-Firebase-Locale"]=t.languageCode);const l={method:e,headers:c,...s};return $w()||(l.referrerPolicy="no-referrer"),t.emulatorConfig&&dr(t.emulatorConfig.host)&&(l.credentials="include"),mg.fetch()(await yg(t,t.config.apiHost,n,a),l)})}async function _g(t,e,n){t._canInitEmulator=!1;const r={..._k,...e};try{const i=new wk(t),s=await Promise.race([n(),i.promise]);i.clearNetworkTimeout();const o=await s.json();if("needConfirmation"in o)throw Bi(t,"account-exists-with-different-credential",o);if(s.ok&&!("errorMessage"in o))return o;{const a=s.ok?o.errorMessage:o.error.message,[c,l]=a.split(" : ");if(c==="FEDERATED_USER_ID_ALREADY_LINKED")throw Bi(t,"credential-already-in-use",o);if(c==="EMAIL_EXISTS")throw Bi(t,"email-already-in-use",o);if(c==="USER_DISABLED")throw Bi(t,"user-disabled",o);const u=r[c]||c.toLowerCase().replace(/[_\s]+/g,"-");if(l)throw ul(t,u,l);et(t,u)}}catch(i){if(i instanceof qt)throw i;et(t,"network-request-failed",{message:String(i)})}}async function vk(t,e,n,r,i={}){const s=await Er(t,e,n,r,i);return"mfaPendingCredential"in s&&et(t,"multi-factor-auth-required",{_serverResponse:s}),s}async function yg(t,e,n,r){const i=`${e}${n}?${r}`,s=t,o=s.config.emulator?hl(t.config,i):`${t.config.apiScheme}://${i}`;return yk.includes(n)&&(await s._persistenceManagerAvailable,s._getPersistenceType()==="COOKIE")?s._getPersistence()._getFinalTarget(o).toString():o}class wk{clearNetworkTimeout(){clearTimeout(this.timer)}constructor(e){this.auth=e,this.timer=null,this.promise=new Promise((n,r)=>{this.timer=setTimeout(()=>r(ze(this.auth,"network-request-failed")),Ek.get())})}}function Bi(t,e,n){const r={appName:t.name};n.email&&(r.email=n.email),n.phoneNumber&&(r.phoneNumber=n.phoneNumber);const i=ze(t,e,r);return i.customData._tokenResponse=n,i}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function bk(t,e){return Er(t,"POST","/v1/accounts:delete",e)}async function ks(t,e){return Er(t,"POST","/v1/accounts:lookup",e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Hr(t){if(t)try{const e=new Date(Number(t));if(!isNaN(e.getTime()))return e.toUTCString()}catch{}}async function Sk(t,e=!1){const n=ce(t),r=await n.getIdToken(e),i=pl(r);S(i&&i.exp&&i.auth_time&&i.iat,n.auth,"internal-error");const s=typeof i.firebase=="object"?i.firebase:void 0,o=s?.sign_in_provider;return{claims:i,token:r,authTime:Hr(zo(i.auth_time)),issuedAtTime:Hr(zo(i.iat)),expirationTime:Hr(zo(i.exp)),signInProvider:o||null,signInSecondFactor:s?.sign_in_second_factor||null}}function zo(t){return Number(t)*1e3}function pl(t){const[e,n,r]=t.split(".");if(e===void 0||n===void 0||r===void 0)return Ji("JWT malformed, contained fewer than 3 sections"),null;try{const i=as(n);return i?JSON.parse(i):(Ji("Failed to decode base64 JWT payload"),null)}catch(i){return Ji("Caught error parsing JWT payload as JSON",i?.toString()),null}}function Wd(t){const e=pl(t);return S(e,"internal-error"),S(typeof e.exp<"u","internal-error"),S(typeof e.iat<"u","internal-error"),Number(e.exp)-Number(e.iat)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function ci(t,e,n=!1){if(n)return e;try{return await e}catch(r){throw r instanceof qt&&Ck(r)&&t.auth.currentUser===t&&await t.auth.signOut(),r}}function Ck({code:t}){return t==="auth/user-disabled"||t==="auth/user-token-expired"}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Tk{constructor(e){this.user=e,this.isRunning=!1,this.timerId=null,this.errorBackoff=3e4}_start(){this.isRunning||(this.isRunning=!0,this.schedule())}_stop(){this.isRunning&&(this.isRunning=!1,this.timerId!==null&&clearTimeout(this.timerId))}getInterval(e){if(e){const n=this.errorBackoff;return this.errorBackoff=Math.min(this.errorBackoff*2,96e4),n}else{this.errorBackoff=3e4;const r=(this.user.stsTokenManager.expirationTime??0)-Date.now()-3e5;return Math.max(0,r)}}schedule(e=!1){if(!this.isRunning)return;const n=this.getInterval(e);this.timerId=setTimeout(async()=>{await this.iteration()},n)}async iteration(){try{await this.user.getIdToken(!0)}catch(e){e?.code==="auth/network-request-failed"&&this.schedule(!0);return}this.schedule()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class $a{constructor(e,n){this.createdAt=e,this.lastLoginAt=n,this._initializeTime()}_initializeTime(){this.lastSignInTime=Hr(this.lastLoginAt),this.creationTime=Hr(this.createdAt)}_copy(e){this.createdAt=e.createdAt,this.lastLoginAt=e.lastLoginAt,this._initializeTime()}toJSON(){return{createdAt:this.createdAt,lastLoginAt:this.lastLoginAt}}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Rs(t){const e=t.auth,n=await t.getIdToken(),r=await ci(t,ks(e,{idToken:n}));S(r?.users.length,e,"internal-error");const i=r.users[0];t._notifyReloadListener(i);const s=i.providerUserInfo?.length?Eg(i.providerUserInfo):[],o=kk(t.providerData,s),a=t.isAnonymous,c=!(t.email&&i.passwordHash)&&!o?.length,l=a?c:!1,u={uid:i.localId,displayName:i.displayName||null,photoURL:i.photoUrl||null,email:i.email||null,emailVerified:i.emailVerified||!1,phoneNumber:i.phoneNumber||null,tenantId:i.tenantId||null,providerData:o,metadata:new $a(i.createdAt,i.lastLoginAt),isAnonymous:l};Object.assign(t,u)}async function Ik(t){const e=ce(t);await Rs(e),await e.auth._persistUserIfCurrent(e),e.auth._notifyListenersIfCurrent(e)}function kk(t,e){return[...t.filter(r=>!e.some(i=>i.providerId===r.providerId)),...e]}function Eg(t){return t.map(({providerId:e,...n})=>({providerId:e,uid:n.rawId||"",displayName:n.displayName||null,email:n.email||null,phoneNumber:n.phoneNumber||null,photoURL:n.photoUrl||null}))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Rk(t,e){const n=await _g(t,{},async()=>{const r=fr({grant_type:"refresh_token",refresh_token:e}).slice(1),{tokenApiHost:i,apiKey:s}=t.config,o=await yg(t,i,"/v1/token",`key=${s}`),a=await t._getAdditionalHeaders();a["Content-Type"]="application/x-www-form-urlencoded";const c={method:"POST",headers:a,body:r};return t.emulatorConfig&&dr(t.emulatorConfig.host)&&(c.credentials="include"),mg.fetch()(o,c)});return{accessToken:n.access_token,expiresIn:n.expires_in,refreshToken:n.refresh_token}}async function Ak(t,e){return Er(t,"POST","/v2/accounts:revokeToken",fl(t,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Fn{constructor(){this.refreshToken=null,this.accessToken=null,this.expirationTime=null}get isExpired(){return!this.expirationTime||Date.now()>this.expirationTime-3e4}updateFromServerResponse(e){S(e.idToken,"internal-error"),S(typeof e.idToken<"u","internal-error"),S(typeof e.refreshToken<"u","internal-error");const n="expiresIn"in e&&typeof e.expiresIn<"u"?Number(e.expiresIn):Wd(e.idToken);this.updateTokensAndExpiration(e.idToken,e.refreshToken,n)}updateFromIdToken(e){S(e.length!==0,"internal-error");const n=Wd(e);this.updateTokensAndExpiration(e,null,n)}async getToken(e,n=!1){return!n&&this.accessToken&&!this.isExpired?this.accessToken:(S(this.refreshToken,e,"user-token-expired"),this.refreshToken?(await this.refresh(e,this.refreshToken),this.accessToken):null)}clearRefreshToken(){this.refreshToken=null}async refresh(e,n){const{accessToken:r,refreshToken:i,expiresIn:s}=await Rk(e,n);this.updateTokensAndExpiration(r,i,Number(s))}updateTokensAndExpiration(e,n,r){this.refreshToken=n||null,this.accessToken=e||null,this.expirationTime=Date.now()+r*1e3}static fromJSON(e,n){const{refreshToken:r,accessToken:i,expirationTime:s}=n,o=new Fn;return r&&(S(typeof r=="string","internal-error",{appName:e}),o.refreshToken=r),i&&(S(typeof i=="string","internal-error",{appName:e}),o.accessToken=i),s&&(S(typeof s=="number","internal-error",{appName:e}),o.expirationTime=s),o}toJSON(){return{refreshToken:this.refreshToken,accessToken:this.accessToken,expirationTime:this.expirationTime}}_assign(e){this.accessToken=e.accessToken,this.refreshToken=e.refreshToken,this.expirationTime=e.expirationTime}_clone(){return Object.assign(new Fn,this.toJSON())}_performRefresh(){return ot("not implemented")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function bt(t,e){S(typeof t=="string"||typeof t>"u","internal-error",{appName:e})}class We{constructor({uid:e,auth:n,stsTokenManager:r,...i}){this.providerId="firebase",this.proactiveRefresh=new Tk(this),this.reloadUserInfo=null,this.reloadListener=null,this.uid=e,this.auth=n,this.stsTokenManager=r,this.accessToken=r.accessToken,this.displayName=i.displayName||null,this.email=i.email||null,this.emailVerified=i.emailVerified||!1,this.phoneNumber=i.phoneNumber||null,this.photoURL=i.photoURL||null,this.isAnonymous=i.isAnonymous||!1,this.tenantId=i.tenantId||null,this.providerData=i.providerData?[...i.providerData]:[],this.metadata=new $a(i.createdAt||void 0,i.lastLoginAt||void 0)}async getIdToken(e){const n=await ci(this,this.stsTokenManager.getToken(this.auth,e));return S(n,this.auth,"internal-error"),this.accessToken!==n&&(this.accessToken=n,await this.auth._persistUserIfCurrent(this),this.auth._notifyListenersIfCurrent(this)),n}getIdTokenResult(e){return Sk(this,e)}reload(){return Ik(this)}_assign(e){this!==e&&(S(this.uid===e.uid,this.auth,"internal-error"),this.displayName=e.displayName,this.photoURL=e.photoURL,this.email=e.email,this.emailVerified=e.emailVerified,this.phoneNumber=e.phoneNumber,this.isAnonymous=e.isAnonymous,this.tenantId=e.tenantId,this.providerData=e.providerData.map(n=>({...n})),this.metadata._copy(e.metadata),this.stsTokenManager._assign(e.stsTokenManager))}_clone(e){const n=new We({...this,auth:e,stsTokenManager:this.stsTokenManager._clone()});return n.metadata._copy(this.metadata),n}_onReload(e){S(!this.reloadListener,this.auth,"internal-error"),this.reloadListener=e,this.reloadUserInfo&&(this._notifyReloadListener(this.reloadUserInfo),this.reloadUserInfo=null)}_notifyReloadListener(e){this.reloadListener?this.reloadListener(e):this.reloadUserInfo=e}_startProactiveRefresh(){this.proactiveRefresh._start()}_stopProactiveRefresh(){this.proactiveRefresh._stop()}async _updateTokensIfNecessary(e,n=!1){let r=!1;e.idToken&&e.idToken!==this.stsTokenManager.accessToken&&(this.stsTokenManager.updateFromServerResponse(e),r=!0),n&&await Rs(this),await this.auth._persistUserIfCurrent(this),r&&this.auth._notifyListenersIfCurrent(this)}async delete(){if(Ue(this.auth.app))return Promise.reject(un(this.auth));const e=await this.getIdToken();return await ci(this,bk(this.auth,{idToken:e})),this.stsTokenManager.clearRefreshToken(),this.auth.signOut()}toJSON(){return{uid:this.uid,email:this.email||void 0,emailVerified:this.emailVerified,displayName:this.displayName||void 0,isAnonymous:this.isAnonymous,photoURL:this.photoURL||void 0,phoneNumber:this.phoneNumber||void 0,tenantId:this.tenantId||void 0,providerData:this.providerData.map(e=>({...e})),stsTokenManager:this.stsTokenManager.toJSON(),_redirectEventId:this._redirectEventId,...this.metadata.toJSON(),apiKey:this.auth.config.apiKey,appName:this.auth.name}}get refreshToken(){return this.stsTokenManager.refreshToken||""}static _fromJSON(e,n){const r=n.displayName??void 0,i=n.email??void 0,s=n.phoneNumber??void 0,o=n.photoURL??void 0,a=n.tenantId??void 0,c=n._redirectEventId??void 0,l=n.createdAt??void 0,u=n.lastLoginAt??void 0,{uid:d,emailVerified:h,isAnonymous:f,providerData:p,stsTokenManager:_}=n;S(d&&_,e,"internal-error");const m=Fn.fromJSON(this.name,_);S(typeof d=="string",e,"internal-error"),bt(r,e.name),bt(i,e.name),S(typeof h=="boolean",e,"internal-error"),S(typeof f=="boolean",e,"internal-error"),bt(s,e.name),bt(o,e.name),bt(a,e.name),bt(c,e.name),bt(l,e.name),bt(u,e.name);const T=new We({uid:d,auth:e,email:i,emailVerified:h,displayName:r,isAnonymous:f,photoURL:o,phoneNumber:s,tenantId:a,stsTokenManager:m,createdAt:l,lastLoginAt:u});return p&&Array.isArray(p)&&(T.providerData=p.map(V=>({...V}))),c&&(T._redirectEventId=c),T}static async _fromIdTokenResponse(e,n,r=!1){const i=new Fn;i.updateFromServerResponse(n);const s=new We({uid:n.localId,auth:e,stsTokenManager:i,isAnonymous:r});return await Rs(s),s}static async _fromGetAccountInfoResponse(e,n,r){const i=n.users[0];S(i.localId!==void 0,"internal-error");const s=i.providerUserInfo!==void 0?Eg(i.providerUserInfo):[],o=!(i.email&&i.passwordHash)&&!s?.length,a=new Fn;a.updateFromIdToken(r);const c=new We({uid:i.localId,auth:e,stsTokenManager:a,isAnonymous:o}),l={uid:i.localId,displayName:i.displayName||null,photoURL:i.photoUrl||null,email:i.email||null,emailVerified:i.emailVerified||!1,phoneNumber:i.phoneNumber||null,tenantId:i.tenantId||null,providerData:s,metadata:new $a(i.createdAt,i.lastLoginAt),isAnonymous:!(i.email&&i.passwordHash)&&!s?.length};return Object.assign(c,l),c}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Vd=new Map;function at(t){Et(t instanceof Function,"Expected a class definition");let e=Vd.get(t);return e?(Et(e instanceof t,"Instance stored in cache mismatched with class"),e):(e=new t,Vd.set(t,e),e)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class vg{constructor(){this.type="NONE",this.storage={}}async _isAvailable(){return!0}async _set(e,n){this.storage[e]=n}async _get(e){const n=this.storage[e];return n===void 0?null:n}async _remove(e){delete this.storage[e]}_addListener(e,n){}_removeListener(e,n){}}vg.type="NONE";const Ba=vg;/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Xi(t,e,n){return`firebase:${t}:${e}:${n}`}class Un{constructor(e,n,r){this.persistence=e,this.auth=n,this.userKey=r;const{config:i,name:s}=this.auth;this.fullUserKey=Xi(this.userKey,i.apiKey,s),this.fullPersistenceKey=Xi("persistence",i.apiKey,s),this.boundEventHandler=n._onStorageEvent.bind(n),this.persistence._addListener(this.fullUserKey,this.boundEventHandler)}setCurrentUser(e){return this.persistence._set(this.fullUserKey,e.toJSON())}async getCurrentUser(){const e=await this.persistence._get(this.fullUserKey);if(!e)return null;if(typeof e=="string"){const n=await ks(this.auth,{idToken:e}).catch(()=>{});return n?We._fromGetAccountInfoResponse(this.auth,n,e):null}return We._fromJSON(this.auth,e)}removeCurrentUser(){return this.persistence._remove(this.fullUserKey)}savePersistenceForRedirect(){return this.persistence._set(this.fullPersistenceKey,this.persistence.type)}async setPersistence(e){if(this.persistence===e)return;const n=await this.getCurrentUser();if(await this.removeCurrentUser(),this.persistence=e,n)return this.setCurrentUser(n)}delete(){this.persistence._removeListener(this.fullUserKey,this.boundEventHandler)}static async create(e,n,r="authUser"){if(!n.length)return new Un(at(Ba),e,r);const i=(await Promise.all(n.map(async l=>{if(await l._isAvailable())return l}))).filter(l=>l);let s=i[0]||at(Ba);const o=Xi(r,e.config.apiKey,e.name);let a=null;for(const l of n)try{const u=await l._get(o);if(u){let d;if(typeof u=="string"){const h=await ks(e,{idToken:u}).catch(()=>{});if(!h)break;d=await We._fromGetAccountInfoResponse(e,h,u)}else d=We._fromJSON(e,u);l!==s&&(a=d),s=l;break}}catch{}const c=i.filter(l=>l._shouldAllowMigration);return!s._shouldAllowMigration||!c.length?new Un(s,e,r):(s=c[0],a&&await s._set(o,a.toJSON()),await Promise.all(n.map(async l=>{if(l!==s)try{await l._remove(o)}catch{}})),new Un(s,e,r))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function jd(t){const e=t.toLowerCase();if(e.includes("opera/")||e.includes("opr/")||e.includes("opios/"))return"Opera";if(Cg(e))return"IEMobile";if(e.includes("msie")||e.includes("trident/"))return"IE";if(e.includes("edge/"))return"Edge";if(wg(e))return"Firefox";if(e.includes("silk/"))return"Silk";if(Ig(e))return"Blackberry";if(kg(e))return"Webos";if(bg(e))return"Safari";if((e.includes("chrome/")||Sg(e))&&!e.includes("edge/"))return"Chrome";if(Tg(e))return"Android";{const n=/([a-zA-Z\d\.]+)\/[a-zA-Z\d\.]*$/,r=t.match(n);if(r?.length===2)return r[1]}return"Other"}function wg(t=_e()){return/firefox\//i.test(t)}function bg(t=_e()){const e=t.toLowerCase();return e.includes("safari/")&&!e.includes("chrome/")&&!e.includes("crios/")&&!e.includes("android")}function Sg(t=_e()){return/crios\//i.test(t)}function Cg(t=_e()){return/iemobile/i.test(t)}function Tg(t=_e()){return/android/i.test(t)}function Ig(t=_e()){return/blackberry/i.test(t)}function kg(t=_e()){return/webos/i.test(t)}function gl(t=_e()){return/iphone|ipad|ipod/i.test(t)||/macintosh/i.test(t)&&/mobile/i.test(t)}function Pk(t=_e()){return gl(t)&&!!window.navigator?.standalone}function Nk(){return Hw()&&document.documentMode===10}function Rg(t=_e()){return gl(t)||Tg(t)||kg(t)||Ig(t)||/windows phone/i.test(t)||Cg(t)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ag(t,e=[]){let n;switch(t){case"Browser":n=jd(_e());break;case"Worker":n=`${jd(_e())}-${t}`;break;default:n=t}const r=e.length?e.join(","):"FirebaseCore-web";return`${n}/JsCore/${pr}/${r}`}/**
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
 */class Lk{constructor(e){this.auth=e,this.queue=[]}pushCallback(e,n){const r=s=>new Promise((o,a)=>{try{const c=e(s);o(c)}catch(c){a(c)}});r.onAbort=n,this.queue.push(r);const i=this.queue.length-1;return()=>{this.queue[i]=()=>Promise.resolve()}}async runMiddleware(e){if(this.auth.currentUser===e)return;const n=[];try{for(const r of this.queue)await r(e),r.onAbort&&n.push(r.onAbort)}catch(r){n.reverse();for(const i of n)try{i()}catch{}throw this.auth._errorFactory.create("login-blocked",{originalMessage:r?.message})}}}/**
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
 */async function Ok(t,e={}){return Er(t,"GET","/v2/passwordPolicy",fl(t,e))}/**
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
 */const Dk=6;class Mk{constructor(e){const n=e.customStrengthOptions;this.customStrengthOptions={},this.customStrengthOptions.minPasswordLength=n.minPasswordLength??Dk,n.maxPasswordLength&&(this.customStrengthOptions.maxPasswordLength=n.maxPasswordLength),n.containsLowercaseCharacter!==void 0&&(this.customStrengthOptions.containsLowercaseLetter=n.containsLowercaseCharacter),n.containsUppercaseCharacter!==void 0&&(this.customStrengthOptions.containsUppercaseLetter=n.containsUppercaseCharacter),n.containsNumericCharacter!==void 0&&(this.customStrengthOptions.containsNumericCharacter=n.containsNumericCharacter),n.containsNonAlphanumericCharacter!==void 0&&(this.customStrengthOptions.containsNonAlphanumericCharacter=n.containsNonAlphanumericCharacter),this.enforcementState=e.enforcementState,this.enforcementState==="ENFORCEMENT_STATE_UNSPECIFIED"&&(this.enforcementState="OFF"),this.allowedNonAlphanumericCharacters=e.allowedNonAlphanumericCharacters?.join("")??"",this.forceUpgradeOnSignin=e.forceUpgradeOnSignin??!1,this.schemaVersion=e.schemaVersion}validatePassword(e){const n={isValid:!0,passwordPolicy:this};return this.validatePasswordLengthOptions(e,n),this.validatePasswordCharacterOptions(e,n),n.isValid&&(n.isValid=n.meetsMinPasswordLength??!0),n.isValid&&(n.isValid=n.meetsMaxPasswordLength??!0),n.isValid&&(n.isValid=n.containsLowercaseLetter??!0),n.isValid&&(n.isValid=n.containsUppercaseLetter??!0),n.isValid&&(n.isValid=n.containsNumericCharacter??!0),n.isValid&&(n.isValid=n.containsNonAlphanumericCharacter??!0),n}validatePasswordLengthOptions(e,n){const r=this.customStrengthOptions.minPasswordLength,i=this.customStrengthOptions.maxPasswordLength;r&&(n.meetsMinPasswordLength=e.length>=r),i&&(n.meetsMaxPasswordLength=e.length<=i)}validatePasswordCharacterOptions(e,n){this.updatePasswordCharacterOptionsStatuses(n,!1,!1,!1,!1);let r;for(let i=0;i<e.length;i++)r=e.charAt(i),this.updatePasswordCharacterOptionsStatuses(n,r>="a"&&r<="z",r>="A"&&r<="Z",r>="0"&&r<="9",this.allowedNonAlphanumericCharacters.includes(r))}updatePasswordCharacterOptionsStatuses(e,n,r,i,s){this.customStrengthOptions.containsLowercaseLetter&&(e.containsLowercaseLetter||(e.containsLowercaseLetter=n)),this.customStrengthOptions.containsUppercaseLetter&&(e.containsUppercaseLetter||(e.containsUppercaseLetter=r)),this.customStrengthOptions.containsNumericCharacter&&(e.containsNumericCharacter||(e.containsNumericCharacter=i)),this.customStrengthOptions.containsNonAlphanumericCharacter&&(e.containsNonAlphanumericCharacter||(e.containsNonAlphanumericCharacter=s))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class xk{constructor(e,n,r,i){this.app=e,this.heartbeatServiceProvider=n,this.appCheckServiceProvider=r,this.config=i,this.currentUser=null,this.emulatorConfig=null,this.operations=Promise.resolve(),this.authStateSubscription=new zd(this),this.idTokenSubscription=new zd(this),this.beforeStateQueue=new Lk(this),this.redirectUser=null,this.isProactiveRefreshEnabled=!1,this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION=1,this._canInitEmulator=!0,this._isInitialized=!1,this._deleted=!1,this._initializationPromise=null,this._popupRedirectResolver=null,this._errorFactory=gg,this._agentRecaptchaConfig=null,this._tenantRecaptchaConfigs={},this._projectPasswordPolicy=null,this._tenantPasswordPolicies={},this._resolvePersistenceManagerAvailable=void 0,this.lastNotifiedUid=void 0,this.languageCode=null,this.tenantId=null,this.settings={appVerificationDisabledForTesting:!1},this.frameworks=[],this.name=e.name,this.clientVersion=i.sdkClientVersion,this._persistenceManagerAvailable=new Promise(s=>this._resolvePersistenceManagerAvailable=s)}_initializeWithPersistence(e,n){return n&&(this._popupRedirectResolver=at(n)),this._initializationPromise=this.queue(async()=>{if(!this._deleted&&(this.persistenceManager=await Un.create(this,e),this._resolvePersistenceManagerAvailable?.(),!this._deleted)){if(this._popupRedirectResolver?._shouldInitProactively)try{await this._popupRedirectResolver._initialize(this)}catch{}await this.initializeCurrentUser(n),this.lastNotifiedUid=this.currentUser?.uid||null,!this._deleted&&(this._isInitialized=!0)}}),this._initializationPromise}async _onStorageEvent(){if(this._deleted)return;const e=await this.assertedPersistence.getCurrentUser();if(!(!this.currentUser&&!e)){if(this.currentUser&&e&&this.currentUser.uid===e.uid){this._currentUser._assign(e),await this.currentUser.getIdToken();return}await this._updateCurrentUser(e,!0)}}async initializeCurrentUserFromIdToken(e){try{const n=await ks(this,{idToken:e}),r=await We._fromGetAccountInfoResponse(this,n,e);await this.directlySetCurrentUser(r)}catch(n){console.warn("FirebaseServerApp could not login user with provided authIdToken: ",n),await this.directlySetCurrentUser(null)}}async initializeCurrentUser(e){if(Ue(this.app)){const s=this.app.settings.authIdToken;return s?new Promise(o=>{setTimeout(()=>this.initializeCurrentUserFromIdToken(s).then(o,o))}):this.directlySetCurrentUser(null)}const n=await this.assertedPersistence.getCurrentUser();let r=n,i=!1;if(e&&this.config.authDomain){await this.getOrInitRedirectPersistenceManager();const s=this.redirectUser?._redirectEventId,o=r?._redirectEventId,a=await this.tryRedirectSignIn(e);(!s||s===o)&&a?.user&&(r=a.user,i=!0)}if(!r)return this.directlySetCurrentUser(null);if(!r._redirectEventId){if(i)try{await this.beforeStateQueue.runMiddleware(r)}catch(s){r=n,this._popupRedirectResolver._overrideRedirectResult(this,()=>Promise.reject(s))}return r?this.reloadAndSetCurrentUserOrClear(r):this.directlySetCurrentUser(null)}return S(this._popupRedirectResolver,this,"argument-error"),await this.getOrInitRedirectPersistenceManager(),this.redirectUser&&this.redirectUser._redirectEventId===r._redirectEventId?this.directlySetCurrentUser(r):this.reloadAndSetCurrentUserOrClear(r)}async tryRedirectSignIn(e){let n=null;try{n=await this._popupRedirectResolver._completeRedirectFn(this,e,!0)}catch{await this._setRedirectUser(null)}return n}async reloadAndSetCurrentUserOrClear(e){try{await Rs(e)}catch(n){if(n?.code!=="auth/network-request-failed")return this.directlySetCurrentUser(null)}return this.directlySetCurrentUser(e)}useDeviceLanguage(){this.languageCode=mk()}async _delete(){this._deleted=!0}async updateCurrentUser(e){if(Ue(this.app))return Promise.reject(un(this));const n=e?ce(e):null;return n&&S(n.auth.config.apiKey===this.config.apiKey,this,"invalid-user-token"),this._updateCurrentUser(n&&n._clone(this))}async _updateCurrentUser(e,n=!1){if(!this._deleted)return e&&S(this.tenantId===e.tenantId,this,"tenant-id-mismatch"),n||await this.beforeStateQueue.runMiddleware(e),this.queue(async()=>{await this.directlySetCurrentUser(e),this.notifyAuthListeners()})}async signOut(){return Ue(this.app)?Promise.reject(un(this)):(await this.beforeStateQueue.runMiddleware(null),(this.redirectPersistenceManager||this._popupRedirectResolver)&&await this._setRedirectUser(null),this._updateCurrentUser(null,!0))}setPersistence(e){return Ue(this.app)?Promise.reject(un(this)):this.queue(async()=>{await this.assertedPersistence.setPersistence(at(e))})}_getRecaptchaConfig(){return this.tenantId==null?this._agentRecaptchaConfig:this._tenantRecaptchaConfigs[this.tenantId]}async validatePassword(e){this._getPasswordPolicyInternal()||await this._updatePasswordPolicy();const n=this._getPasswordPolicyInternal();return n.schemaVersion!==this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION?Promise.reject(this._errorFactory.create("unsupported-password-policy-schema-version",{})):n.validatePassword(e)}_getPasswordPolicyInternal(){return this.tenantId===null?this._projectPasswordPolicy:this._tenantPasswordPolicies[this.tenantId]}async _updatePasswordPolicy(){const e=await Ok(this),n=new Mk(e);this.tenantId===null?this._projectPasswordPolicy=n:this._tenantPasswordPolicies[this.tenantId]=n}_getPersistenceType(){return this.assertedPersistence.persistence.type}_getPersistence(){return this.assertedPersistence.persistence}_updateErrorMap(e){this._errorFactory=new hr("auth","Firebase",e())}onAuthStateChanged(e,n,r){return this.registerStateListener(this.authStateSubscription,e,n,r)}beforeAuthStateChanged(e,n){return this.beforeStateQueue.pushCallback(e,n)}onIdTokenChanged(e,n,r){return this.registerStateListener(this.idTokenSubscription,e,n,r)}authStateReady(){return new Promise((e,n)=>{if(this.currentUser)e();else{const r=this.onAuthStateChanged(()=>{r(),e()},n)}})}async revokeAccessToken(e){if(this.currentUser){const n=await this.currentUser.getIdToken(),r={providerId:"apple.com",tokenType:"ACCESS_TOKEN",token:e,idToken:n};this.tenantId!=null&&(r.tenantId=this.tenantId),await Ak(this,r)}}toJSON(){return{apiKey:this.config.apiKey,authDomain:this.config.authDomain,appName:this.name,currentUser:this._currentUser?.toJSON()}}async _setRedirectUser(e,n){const r=await this.getOrInitRedirectPersistenceManager(n);return e===null?r.removeCurrentUser():r.setCurrentUser(e)}async getOrInitRedirectPersistenceManager(e){if(!this.redirectPersistenceManager){const n=e&&at(e)||this._popupRedirectResolver;S(n,this,"argument-error"),this.redirectPersistenceManager=await Un.create(this,[at(n._redirectPersistence)],"redirectUser"),this.redirectUser=await this.redirectPersistenceManager.getCurrentUser()}return this.redirectPersistenceManager}async _redirectUserForId(e){return this._isInitialized&&await this.queue(async()=>{}),this._currentUser?._redirectEventId===e?this._currentUser:this.redirectUser?._redirectEventId===e?this.redirectUser:null}async _persistUserIfCurrent(e){if(e===this.currentUser)return this.queue(async()=>this.directlySetCurrentUser(e))}_notifyListenersIfCurrent(e){e===this.currentUser&&this.notifyAuthListeners()}_key(){return`${this.config.authDomain}:${this.config.apiKey}:${this.name}`}_startProactiveRefresh(){this.isProactiveRefreshEnabled=!0,this.currentUser&&this._currentUser._startProactiveRefresh()}_stopProactiveRefresh(){this.isProactiveRefreshEnabled=!1,this.currentUser&&this._currentUser._stopProactiveRefresh()}get _currentUser(){return this.currentUser}notifyAuthListeners(){if(!this._isInitialized)return;this.idTokenSubscription.next(this.currentUser);const e=this.currentUser?.uid??null;this.lastNotifiedUid!==e&&(this.lastNotifiedUid=e,this.authStateSubscription.next(this.currentUser))}registerStateListener(e,n,r,i){if(this._deleted)return()=>{};const s=typeof n=="function"?n:n.next.bind(n);let o=!1;const a=this._isInitialized?Promise.resolve():this._initializationPromise;if(S(a,this,"internal-error"),a.then(()=>{o||s(this.currentUser)}),typeof n=="function"){const c=e.addObserver(n,r,i);return()=>{o=!0,c()}}else{const c=e.addObserver(n);return()=>{o=!0,c()}}}async directlySetCurrentUser(e){this.currentUser&&this.currentUser!==e&&this._currentUser._stopProactiveRefresh(),e&&this.isProactiveRefreshEnabled&&e._startProactiveRefresh(),this.currentUser=e,e?await this.assertedPersistence.setCurrentUser(e):await this.assertedPersistence.removeCurrentUser()}queue(e){return this.operations=this.operations.then(e,e),this.operations}get assertedPersistence(){return S(this.persistenceManager,this,"internal-error"),this.persistenceManager}_logFramework(e){!e||this.frameworks.includes(e)||(this.frameworks.push(e),this.frameworks.sort(),this.clientVersion=Ag(this.config.clientPlatform,this._getFrameworks()))}_getFrameworks(){return this.frameworks}async _getAdditionalHeaders(){const e={"X-Client-Version":this.clientVersion};this.app.options.appId&&(e["X-Firebase-gmpid"]=this.app.options.appId);const n=await this.heartbeatServiceProvider.getImmediate({optional:!0})?.getHeartbeatsHeader();n&&(e["X-Firebase-Client"]=n);const r=await this._getAppCheckToken();return r&&(e["X-Firebase-AppCheck"]=r),e}async _getAppCheckToken(){if(Ue(this.app)&&this.app.settings.appCheckToken)return this.app.settings.appCheckToken;const e=await this.appCheckServiceProvider.getImmediate({optional:!0})?.getToken();return e?.error&&hk(`Error while retrieving App Check token: ${e.error}`),e?.token}}function vr(t){return ce(t)}class zd{constructor(e){this.auth=e,this.observer=null,this.addObserver=Jw(n=>this.observer=n)}get next(){return S(this.observer,this.auth,"internal-error"),this.observer.next.bind(this.observer)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let ml={async loadJS(){throw new Error("Unable to load external scripts")},recaptchaV2Script:"",recaptchaEnterpriseScript:"",gapiScript:""};function Fk(t){ml=t}function Uk(t){return ml.loadJS(t)}function $k(){return ml.gapiScript}function Bk(t){return`__${t}${Math.floor(Math.random()*1e6)}`}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Hk(t,e){const n=yi(t,"auth");if(n.isInitialized()){const i=n.getImmediate(),s=n.getOptions();if(pn(s,e??{}))return i;et(i,"already-initialized")}return n.initialize({options:e})}function Wk(t,e){const n=e?.persistence||[],r=(Array.isArray(n)?n:[n]).map(at);e?.errorMap&&t._updateErrorMap(e.errorMap),t._initializeWithPersistence(r,e?.popupRedirectResolver)}function Vk(t,e,n){const r=vr(t);S(/^https?:\/\//.test(e),r,"invalid-emulator-scheme");const i=!1,s=Pg(e),{host:o,port:a}=jk(e),c=a===null?"":`:${a}`,l={url:`${s}//${o}${c}/`},u=Object.freeze({host:o,port:a,protocol:s.replace(":",""),options:Object.freeze({disableWarnings:i})});if(!r._canInitEmulator){S(r.config.emulator&&r.emulatorConfig,r,"emulator-config-failed"),S(pn(l,r.config.emulator)&&pn(u,r.emulatorConfig),r,"emulator-config-failed");return}r.config.emulator=l,r.emulatorConfig=u,r.settings.appVerificationDisabledForTesting=!0,dr(o)?(Sf(`${s}//${o}${c}`),Cf("Auth",!0)):zk()}function Pg(t){const e=t.indexOf(":");return e<0?"":t.substr(0,e+1)}function jk(t){const e=Pg(t),n=/(\/\/)?([^?#/]+)/.exec(t.substr(e.length));if(!n)return{host:"",port:null};const r=n[2].split("@").pop()||"",i=/^(\[[^\]]+\])(:|$)/.exec(r);if(i){const s=i[1];return{host:s,port:Gd(r.substr(s.length+1))}}else{const[s,o]=r.split(":");return{host:s,port:Gd(o)}}}function Gd(t){if(!t)return null;const e=Number(t);return isNaN(e)?null:e}function zk(){function t(){const e=document.createElement("p"),n=e.style;e.innerText="Running in emulator mode. Do not use with production credentials.",n.position="fixed",n.width="100%",n.backgroundColor="#ffffff",n.border=".1em solid #000000",n.color="#b50000",n.bottom="0px",n.left="0px",n.margin="0px",n.zIndex="10000",n.textAlign="center",e.classList.add("firebase-emulator-warning"),document.body.appendChild(e)}typeof console<"u"&&typeof console.info=="function"&&console.info("WARNING: You are using the Auth Emulator, which is intended for local testing only.  Do not use with production credentials."),typeof window<"u"&&typeof document<"u"&&(document.readyState==="loading"?window.addEventListener("DOMContentLoaded",t):t())}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ng{constructor(e,n){this.providerId=e,this.signInMethod=n}toJSON(){return ot("not implemented")}_getIdTokenResponse(e){return ot("not implemented")}_linkToIdToken(e,n){return ot("not implemented")}_getReauthenticationResolver(e){return ot("not implemented")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function $n(t,e){return vk(t,"POST","/v1/accounts:signInWithIdp",fl(t,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Gk="http://localhost";class wn extends Ng{constructor(){super(...arguments),this.pendingToken=null}static _fromParams(e){const n=new wn(e.providerId,e.signInMethod);return e.idToken||e.accessToken?(e.idToken&&(n.idToken=e.idToken),e.accessToken&&(n.accessToken=e.accessToken),e.nonce&&!e.pendingToken&&(n.nonce=e.nonce),e.pendingToken&&(n.pendingToken=e.pendingToken)):e.oauthToken&&e.oauthTokenSecret?(n.accessToken=e.oauthToken,n.secret=e.oauthTokenSecret):et("argument-error"),n}toJSON(){return{idToken:this.idToken,accessToken:this.accessToken,secret:this.secret,nonce:this.nonce,pendingToken:this.pendingToken,providerId:this.providerId,signInMethod:this.signInMethod}}static fromJSON(e){const n=typeof e=="string"?JSON.parse(e):e,{providerId:r,signInMethod:i,...s}=n;if(!r||!i)return null;const o=new wn(r,i);return o.idToken=s.idToken||void 0,o.accessToken=s.accessToken||void 0,o.secret=s.secret,o.nonce=s.nonce,o.pendingToken=s.pendingToken||null,o}_getIdTokenResponse(e){const n=this.buildRequest();return $n(e,n)}_linkToIdToken(e,n){const r=this.buildRequest();return r.idToken=n,$n(e,r)}_getReauthenticationResolver(e){const n=this.buildRequest();return n.autoCreate=!1,$n(e,n)}buildRequest(){const e={requestUri:Gk,returnSecureToken:!0};if(this.pendingToken)e.pendingToken=this.pendingToken;else{const n={};this.idToken&&(n.id_token=this.idToken),this.accessToken&&(n.access_token=this.accessToken),this.secret&&(n.oauth_token_secret=this.secret),n.providerId=this.providerId,this.nonce&&!this.pendingToken&&(n.nonce=this.nonce),e.postBody=fr(n)}return e}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class _l{constructor(e){this.providerId=e,this.defaultLanguageCode=null,this.customParameters={}}setDefaultLanguage(e){this.defaultLanguageCode=e}setCustomParameters(e){return this.customParameters=e,this}getCustomParameters(){return this.customParameters}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ki extends _l{constructor(){super(...arguments),this.scopes=[]}addScope(e){return this.scopes.includes(e)||this.scopes.push(e),this}getScopes(){return[...this.scopes]}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class St extends ki{constructor(){super("facebook.com")}static credential(e){return wn._fromParams({providerId:St.PROVIDER_ID,signInMethod:St.FACEBOOK_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return St.credentialFromTaggedObject(e)}static credentialFromError(e){return St.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return St.credential(e.oauthAccessToken)}catch{return null}}}St.FACEBOOK_SIGN_IN_METHOD="facebook.com";St.PROVIDER_ID="facebook.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Pe extends ki{constructor(){super("google.com"),this.addScope("profile")}static credential(e,n){return wn._fromParams({providerId:Pe.PROVIDER_ID,signInMethod:Pe.GOOGLE_SIGN_IN_METHOD,idToken:e,accessToken:n})}static credentialFromResult(e){return Pe.credentialFromTaggedObject(e)}static credentialFromError(e){return Pe.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthIdToken:n,oauthAccessToken:r}=e;if(!n&&!r)return null;try{return Pe.credential(n,r)}catch{return null}}}Pe.GOOGLE_SIGN_IN_METHOD="google.com";Pe.PROVIDER_ID="google.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ct extends ki{constructor(){super("github.com")}static credential(e){return wn._fromParams({providerId:Ct.PROVIDER_ID,signInMethod:Ct.GITHUB_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return Ct.credentialFromTaggedObject(e)}static credentialFromError(e){return Ct.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return Ct.credential(e.oauthAccessToken)}catch{return null}}}Ct.GITHUB_SIGN_IN_METHOD="github.com";Ct.PROVIDER_ID="github.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Tt extends ki{constructor(){super("twitter.com")}static credential(e,n){return wn._fromParams({providerId:Tt.PROVIDER_ID,signInMethod:Tt.TWITTER_SIGN_IN_METHOD,oauthToken:e,oauthTokenSecret:n})}static credentialFromResult(e){return Tt.credentialFromTaggedObject(e)}static credentialFromError(e){return Tt.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthAccessToken:n,oauthTokenSecret:r}=e;if(!n||!r)return null;try{return Tt.credential(n,r)}catch{return null}}}Tt.TWITTER_SIGN_IN_METHOD="twitter.com";Tt.PROVIDER_ID="twitter.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class rr{constructor(e){this.user=e.user,this.providerId=e.providerId,this._tokenResponse=e._tokenResponse,this.operationType=e.operationType}static async _fromIdTokenResponse(e,n,r,i=!1){const s=await We._fromIdTokenResponse(e,r,i),o=qd(r);return new rr({user:s,providerId:o,_tokenResponse:r,operationType:n})}static async _forOperation(e,n,r){await e._updateTokensIfNecessary(r,!0);const i=qd(r);return new rr({user:e,providerId:i,_tokenResponse:r,operationType:n})}}function qd(t){return t.providerId?t.providerId:"phoneNumber"in t?"phone":null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class As extends qt{constructor(e,n,r,i){super(n.code,n.message),this.operationType=r,this.user=i,Object.setPrototypeOf(this,As.prototype),this.customData={appName:e.name,tenantId:e.tenantId??void 0,_serverResponse:n.customData._serverResponse,operationType:r}}static _fromErrorAndOperation(e,n,r,i){return new As(e,n,r,i)}}function Lg(t,e,n,r){return(e==="reauthenticate"?n._getReauthenticationResolver(t):n._getIdTokenResponse(t)).catch(s=>{throw s.code==="auth/multi-factor-auth-required"?As._fromErrorAndOperation(t,s,e,r):s})}async function qk(t,e,n=!1){const r=await ci(t,e._linkToIdToken(t.auth,await t.getIdToken()),n);return rr._forOperation(t,"link",r)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Yk(t,e,n=!1){const{auth:r}=t;if(Ue(r.app))return Promise.reject(un(r));const i="reauthenticate";try{const s=await ci(t,Lg(r,i,e,t),n);S(s.idToken,r,"internal-error");const o=pl(s.idToken);S(o,r,"internal-error");const{sub:a}=o;return S(t.uid===a,r,"user-mismatch"),rr._forOperation(t,i,s)}catch(s){throw s?.code==="auth/user-not-found"&&et(r,"user-mismatch"),s}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Og(t,e,n=!1){if(Ue(t.app))return Promise.reject(un(t));const r="signIn",i=await Lg(t,r,e),s=await rr._fromIdTokenResponse(t,r,i);return n||await t._updateCurrentUser(s.user),s}async function Kk(t,e){return Og(vr(t),e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Go(t,e){return ce(t).setPersistence(e)}function Jk(t,e,n,r){return ce(t).onIdTokenChanged(e,n,r)}function Xk(t,e,n){return ce(t).beforeAuthStateChanged(e,n)}function Dg(t,e,n,r){return ce(t).onAuthStateChanged(e,n,r)}function Qk(t){return ce(t).signOut()}const Ps="__sak";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Mg{constructor(e,n){this.storageRetriever=e,this.type=n}_isAvailable(){try{return this.storage?(this.storage.setItem(Ps,"1"),this.storage.removeItem(Ps),Promise.resolve(!0)):Promise.resolve(!1)}catch{return Promise.resolve(!1)}}_set(e,n){return this.storage.setItem(e,JSON.stringify(n)),Promise.resolve()}_get(e){const n=this.storage.getItem(e);return Promise.resolve(n?JSON.parse(n):null)}_remove(e){return this.storage.removeItem(e),Promise.resolve()}get storage(){return this.storageRetriever()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Zk=1e3,eR=10;class xg extends Mg{constructor(){super(()=>window.localStorage,"LOCAL"),this.boundEventHandler=(e,n)=>this.onStorageEvent(e,n),this.listeners={},this.localCache={},this.pollTimer=null,this.fallbackToPolling=Rg(),this._shouldAllowMigration=!0}forAllChangedKeys(e){for(const n of Object.keys(this.listeners)){const r=this.storage.getItem(n),i=this.localCache[n];r!==i&&e(n,i,r)}}onStorageEvent(e,n=!1){if(!e.key){this.forAllChangedKeys((o,a,c)=>{this.notifyListeners(o,c)});return}const r=e.key;n?this.detachListener():this.stopPolling();const i=()=>{const o=this.storage.getItem(r);!n&&this.localCache[r]===o||this.notifyListeners(r,o)},s=this.storage.getItem(r);Nk()&&s!==e.newValue&&e.newValue!==e.oldValue?setTimeout(i,eR):i()}notifyListeners(e,n){this.localCache[e]=n;const r=this.listeners[e];if(r)for(const i of Array.from(r))i(n&&JSON.parse(n))}startPolling(){this.stopPolling(),this.pollTimer=setInterval(()=>{this.forAllChangedKeys((e,n,r)=>{this.onStorageEvent(new StorageEvent("storage",{key:e,oldValue:n,newValue:r}),!0)})},Zk)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}attachListener(){window.addEventListener("storage",this.boundEventHandler)}detachListener(){window.removeEventListener("storage",this.boundEventHandler)}_addListener(e,n){Object.keys(this.listeners).length===0&&(this.fallbackToPolling?this.startPolling():this.attachListener()),this.listeners[e]||(this.listeners[e]=new Set,this.localCache[e]=this.storage.getItem(e)),this.listeners[e].add(n)}_removeListener(e,n){this.listeners[e]&&(this.listeners[e].delete(n),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&(this.detachListener(),this.stopPolling())}async _set(e,n){await super._set(e,n),this.localCache[e]=JSON.stringify(n)}async _get(e){const n=await super._get(e);return this.localCache[e]=JSON.stringify(n),n}async _remove(e){await super._remove(e),delete this.localCache[e]}}xg.type="LOCAL";const Fg=xg;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ug extends Mg{constructor(){super(()=>window.sessionStorage,"SESSION")}_addListener(e,n){}_removeListener(e,n){}}Ug.type="SESSION";const $g=Ug;/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function tR(t){return Promise.all(t.map(async e=>{try{return{fulfilled:!0,value:await e}}catch(n){return{fulfilled:!1,reason:n}}}))}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class fo{constructor(e){this.eventTarget=e,this.handlersMap={},this.boundEventHandler=this.handleEvent.bind(this)}static _getInstance(e){const n=this.receivers.find(i=>i.isListeningto(e));if(n)return n;const r=new fo(e);return this.receivers.push(r),r}isListeningto(e){return this.eventTarget===e}async handleEvent(e){const n=e,{eventId:r,eventType:i,data:s}=n.data,o=this.handlersMap[i];if(!o?.size)return;n.ports[0].postMessage({status:"ack",eventId:r,eventType:i});const a=Array.from(o).map(async l=>l(n.origin,s)),c=await tR(a);n.ports[0].postMessage({status:"done",eventId:r,eventType:i,response:c})}_subscribe(e,n){Object.keys(this.handlersMap).length===0&&this.eventTarget.addEventListener("message",this.boundEventHandler),this.handlersMap[e]||(this.handlersMap[e]=new Set),this.handlersMap[e].add(n)}_unsubscribe(e,n){this.handlersMap[e]&&n&&this.handlersMap[e].delete(n),(!n||this.handlersMap[e].size===0)&&delete this.handlersMap[e],Object.keys(this.handlersMap).length===0&&this.eventTarget.removeEventListener("message",this.boundEventHandler)}}fo.receivers=[];/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function yl(t="",e=10){let n="";for(let r=0;r<e;r++)n+=Math.floor(Math.random()*10);return t+n}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class nR{constructor(e){this.target=e,this.handlers=new Set}removeMessageHandler(e){e.messageChannel&&(e.messageChannel.port1.removeEventListener("message",e.onMessage),e.messageChannel.port1.close()),this.handlers.delete(e)}async _send(e,n,r=50){const i=typeof MessageChannel<"u"?new MessageChannel:null;if(!i)throw new Error("connection_unavailable");let s,o;return new Promise((a,c)=>{const l=yl("",20);i.port1.start();const u=setTimeout(()=>{c(new Error("unsupported_event"))},r);o={messageChannel:i,onMessage(d){const h=d;if(h.data.eventId===l)switch(h.data.status){case"ack":clearTimeout(u),s=setTimeout(()=>{c(new Error("timeout"))},3e3);break;case"done":clearTimeout(s),a(h.data.response);break;default:clearTimeout(u),clearTimeout(s),c(new Error("invalid_response"));break}}},this.handlers.add(o),i.port1.addEventListener("message",o.onMessage),this.target.postMessage({eventType:e,eventId:l,data:n},[i.port2])}).finally(()=>{o&&this.removeMessageHandler(o)})}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ze(){return window}function rR(t){Ze().location.href=t}/**
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
 */function Bg(){return typeof Ze().WorkerGlobalScope<"u"&&typeof Ze().importScripts=="function"}async function iR(){if(!navigator?.serviceWorker)return null;try{return(await navigator.serviceWorker.ready).active}catch{return null}}function sR(){return navigator?.serviceWorker?.controller||null}function oR(){return Bg()?self:null}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Hg="firebaseLocalStorageDb",aR=1,Ns="firebaseLocalStorage",Wg="fbase_key";class Ri{constructor(e){this.request=e}toPromise(){return new Promise((e,n)=>{this.request.addEventListener("success",()=>{e(this.request.result)}),this.request.addEventListener("error",()=>{n(this.request.error)})})}}function po(t,e){return t.transaction([Ns],e?"readwrite":"readonly").objectStore(Ns)}function cR(){const t=indexedDB.deleteDatabase(Hg);return new Ri(t).toPromise()}function Ha(){const t=indexedDB.open(Hg,aR);return new Promise((e,n)=>{t.addEventListener("error",()=>{n(t.error)}),t.addEventListener("upgradeneeded",()=>{const r=t.result;try{r.createObjectStore(Ns,{keyPath:Wg})}catch(i){n(i)}}),t.addEventListener("success",async()=>{const r=t.result;r.objectStoreNames.contains(Ns)?e(r):(r.close(),await cR(),e(await Ha()))})})}async function Yd(t,e,n){const r=po(t,!0).put({[Wg]:e,value:n});return new Ri(r).toPromise()}async function lR(t,e){const n=po(t,!1).get(e),r=await new Ri(n).toPromise();return r===void 0?null:r.value}function Kd(t,e){const n=po(t,!0).delete(e);return new Ri(n).toPromise()}const uR=800,dR=3;class Vg{constructor(){this.type="LOCAL",this._shouldAllowMigration=!0,this.listeners={},this.localCache={},this.pollTimer=null,this.pendingWrites=0,this.receiver=null,this.sender=null,this.serviceWorkerReceiverAvailable=!1,this.activeServiceWorker=null,this._workerInitializationPromise=this.initializeServiceWorkerMessaging().then(()=>{},()=>{})}async _openDb(){return this.db?this.db:(this.db=await Ha(),this.db)}async _withRetries(e){let n=0;for(;;)try{const r=await this._openDb();return await e(r)}catch(r){if(n++>dR)throw r;this.db&&(this.db.close(),this.db=void 0)}}async initializeServiceWorkerMessaging(){return Bg()?this.initializeReceiver():this.initializeSender()}async initializeReceiver(){this.receiver=fo._getInstance(oR()),this.receiver._subscribe("keyChanged",async(e,n)=>({keyProcessed:(await this._poll()).includes(n.key)})),this.receiver._subscribe("ping",async(e,n)=>["keyChanged"])}async initializeSender(){if(this.activeServiceWorker=await iR(),!this.activeServiceWorker)return;this.sender=new nR(this.activeServiceWorker);const e=await this.sender._send("ping",{},800);e&&e[0]?.fulfilled&&e[0]?.value.includes("keyChanged")&&(this.serviceWorkerReceiverAvailable=!0)}async notifyServiceWorker(e){if(!(!this.sender||!this.activeServiceWorker||sR()!==this.activeServiceWorker))try{await this.sender._send("keyChanged",{key:e},this.serviceWorkerReceiverAvailable?800:50)}catch{}}async _isAvailable(){try{if(!indexedDB)return!1;const e=await Ha();return await Yd(e,Ps,"1"),await Kd(e,Ps),!0}catch{}return!1}async _withPendingWrite(e){this.pendingWrites++;try{await e()}finally{this.pendingWrites--}}async _set(e,n){return this._withPendingWrite(async()=>(await this._withRetries(r=>Yd(r,e,n)),this.localCache[e]=n,this.notifyServiceWorker(e)))}async _get(e){const n=await this._withRetries(r=>lR(r,e));return this.localCache[e]=n,n}async _remove(e){return this._withPendingWrite(async()=>(await this._withRetries(n=>Kd(n,e)),delete this.localCache[e],this.notifyServiceWorker(e)))}async _poll(){const e=await this._withRetries(i=>{const s=po(i,!1).getAll();return new Ri(s).toPromise()});if(!e)return[];if(this.pendingWrites!==0)return[];const n=[],r=new Set;if(e.length!==0)for(const{fbase_key:i,value:s}of e)r.add(i),JSON.stringify(this.localCache[i])!==JSON.stringify(s)&&(this.notifyListeners(i,s),n.push(i));for(const i of Object.keys(this.localCache))this.localCache[i]&&!r.has(i)&&(this.notifyListeners(i,null),n.push(i));return n}notifyListeners(e,n){this.localCache[e]=n;const r=this.listeners[e];if(r)for(const i of Array.from(r))i(n)}startPolling(){this.stopPolling(),this.pollTimer=setInterval(async()=>this._poll(),uR)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}_addListener(e,n){Object.keys(this.listeners).length===0&&this.startPolling(),this.listeners[e]||(this.listeners[e]=new Set,this._get(e)),this.listeners[e].add(n)}_removeListener(e,n){this.listeners[e]&&(this.listeners[e].delete(n),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&this.stopPolling()}}Vg.type="LOCAL";const jg=Vg;new Ii(3e4,6e4);/**
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
 */function zg(t,e){return e?at(e):(S(t._popupRedirectResolver,t,"argument-error"),t._popupRedirectResolver)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class El extends Ng{constructor(e){super("custom","custom"),this.params=e}_getIdTokenResponse(e){return $n(e,this._buildIdpRequest())}_linkToIdToken(e,n){return $n(e,this._buildIdpRequest(n))}_getReauthenticationResolver(e){return $n(e,this._buildIdpRequest())}_buildIdpRequest(e){const n={requestUri:this.params.requestUri,sessionId:this.params.sessionId,postBody:this.params.postBody,tenantId:this.params.tenantId,pendingToken:this.params.pendingToken,returnSecureToken:!0,returnIdpCredential:!0};return e&&(n.idToken=e),n}}function hR(t){return Og(t.auth,new El(t),t.bypassAuthState)}function fR(t){const{auth:e,user:n}=t;return S(n,e,"internal-error"),Yk(n,new El(t),t.bypassAuthState)}async function pR(t){const{auth:e,user:n}=t;return S(n,e,"internal-error"),qk(n,new El(t),t.bypassAuthState)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Gg{constructor(e,n,r,i,s=!1){this.auth=e,this.resolver=r,this.user=i,this.bypassAuthState=s,this.pendingPromise=null,this.eventManager=null,this.filter=Array.isArray(n)?n:[n]}execute(){return new Promise(async(e,n)=>{this.pendingPromise={resolve:e,reject:n};try{this.eventManager=await this.resolver._initialize(this.auth),await this.onExecution(),this.eventManager.registerConsumer(this)}catch(r){this.reject(r)}})}async onAuthEvent(e){const{urlResponse:n,sessionId:r,postBody:i,tenantId:s,error:o,type:a}=e;if(o){this.reject(o);return}const c={auth:this.auth,requestUri:n,sessionId:r,tenantId:s||void 0,postBody:i||void 0,user:this.user,bypassAuthState:this.bypassAuthState};try{this.resolve(await this.getIdpTask(a)(c))}catch(l){this.reject(l)}}onError(e){this.reject(e)}getIdpTask(e){switch(e){case"signInViaPopup":case"signInViaRedirect":return hR;case"linkViaPopup":case"linkViaRedirect":return pR;case"reauthViaPopup":case"reauthViaRedirect":return fR;default:et(this.auth,"internal-error")}}resolve(e){Et(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.resolve(e),this.unregisterAndCleanUp()}reject(e){Et(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.reject(e),this.unregisterAndCleanUp()}unregisterAndCleanUp(){this.eventManager&&this.eventManager.unregisterConsumer(this),this.pendingPromise=null,this.cleanUp()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const gR=new Ii(2e3,1e4);async function mR(t,e,n){if(Ue(t.app))return Promise.reject(ze(t,"operation-not-supported-in-this-environment"));const r=vr(t);fk(t,e,_l);const i=zg(r,n);return new on(r,"signInViaPopup",e,i).executeNotNull()}class on extends Gg{constructor(e,n,r,i,s){super(e,n,i,s),this.provider=r,this.authWindow=null,this.pollId=null,on.currentPopupAction&&on.currentPopupAction.cancel(),on.currentPopupAction=this}async executeNotNull(){const e=await this.execute();return S(e,this.auth,"internal-error"),e}async onExecution(){Et(this.filter.length===1,"Popup operations only handle one event");const e=yl();this.authWindow=await this.resolver._openPopup(this.auth,this.provider,this.filter[0],e),this.authWindow.associatedEvent=e,this.resolver._originValidation(this.auth).catch(n=>{this.reject(n)}),this.resolver._isIframeWebStorageSupported(this.auth,n=>{n||this.reject(ze(this.auth,"web-storage-unsupported"))}),this.pollUserCancellation()}get eventId(){return this.authWindow?.associatedEvent||null}cancel(){this.reject(ze(this.auth,"cancelled-popup-request"))}cleanUp(){this.authWindow&&this.authWindow.close(),this.pollId&&window.clearTimeout(this.pollId),this.authWindow=null,this.pollId=null,on.currentPopupAction=null}pollUserCancellation(){const e=()=>{if(this.authWindow?.window?.closed){this.pollId=window.setTimeout(()=>{this.pollId=null,this.reject(ze(this.auth,"popup-closed-by-user"))},8e3);return}this.pollId=window.setTimeout(e,gR.get())};e()}}on.currentPopupAction=null;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const _R="pendingRedirect",Qi=new Map;class yR extends Gg{constructor(e,n,r=!1){super(e,["signInViaRedirect","linkViaRedirect","reauthViaRedirect","unknown"],n,void 0,r),this.eventId=null}async execute(){let e=Qi.get(this.auth._key());if(!e){try{const r=await ER(this.resolver,this.auth)?await super.execute():null;e=()=>Promise.resolve(r)}catch(n){e=()=>Promise.reject(n)}Qi.set(this.auth._key(),e)}return this.bypassAuthState||Qi.set(this.auth._key(),()=>Promise.resolve(null)),e()}async onAuthEvent(e){if(e.type==="signInViaRedirect")return super.onAuthEvent(e);if(e.type==="unknown"){this.resolve(null);return}if(e.eventId){const n=await this.auth._redirectUserForId(e.eventId);if(n)return this.user=n,super.onAuthEvent(e);this.resolve(null)}}async onExecution(){}cleanUp(){}}async function ER(t,e){const n=bR(e),r=wR(t);if(!await r._isAvailable())return!1;const i=await r._get(n)==="true";return await r._remove(n),i}function vR(t,e){Qi.set(t._key(),e)}function wR(t){return at(t._redirectPersistence)}function bR(t){return Xi(_R,t.config.apiKey,t.name)}async function SR(t,e){return await vr(t)._initializationPromise,qg(t,e,!1)}async function qg(t,e,n=!1){if(Ue(t.app))return Promise.reject(un(t));const r=vr(t),i=zg(r,e),o=await new yR(r,i,n).execute();return o&&!n&&(delete o.user._redirectEventId,await r._persistUserIfCurrent(o.user),await r._setRedirectUser(null,e)),o}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const CR=600*1e3;class TR{constructor(e){this.auth=e,this.cachedEventUids=new Set,this.consumers=new Set,this.queuedRedirectEvent=null,this.hasHandledPotentialRedirect=!1,this.lastProcessedEventTime=Date.now()}registerConsumer(e){this.consumers.add(e),this.queuedRedirectEvent&&this.isEventForConsumer(this.queuedRedirectEvent,e)&&(this.sendToConsumer(this.queuedRedirectEvent,e),this.saveEventToCache(this.queuedRedirectEvent),this.queuedRedirectEvent=null)}unregisterConsumer(e){this.consumers.delete(e)}onEvent(e){if(this.hasEventBeenHandled(e))return!1;let n=!1;return this.consumers.forEach(r=>{this.isEventForConsumer(e,r)&&(n=!0,this.sendToConsumer(e,r),this.saveEventToCache(e))}),this.hasHandledPotentialRedirect||!IR(e)||(this.hasHandledPotentialRedirect=!0,n||(this.queuedRedirectEvent=e,n=!0)),n}sendToConsumer(e,n){if(e.error&&!Yg(e)){const r=e.error.code?.split("auth/")[1]||"internal-error";n.onError(ze(this.auth,r))}else n.onAuthEvent(e)}isEventForConsumer(e,n){const r=n.eventId===null||!!e.eventId&&e.eventId===n.eventId;return n.filter.includes(e.type)&&r}hasEventBeenHandled(e){return Date.now()-this.lastProcessedEventTime>=CR&&this.cachedEventUids.clear(),this.cachedEventUids.has(Jd(e))}saveEventToCache(e){this.cachedEventUids.add(Jd(e)),this.lastProcessedEventTime=Date.now()}}function Jd(t){return[t.type,t.eventId,t.sessionId,t.tenantId].filter(e=>e).join("-")}function Yg({type:t,error:e}){return t==="unknown"&&e?.code==="auth/no-auth-event"}function IR(t){switch(t.type){case"signInViaRedirect":case"linkViaRedirect":case"reauthViaRedirect":return!0;case"unknown":return Yg(t);default:return!1}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function kR(t,e={}){return Er(t,"GET","/v1/projects",e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const RR=/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/,AR=/^https?/;async function PR(t){if(t.config.emulator)return;const{authorizedDomains:e}=await kR(t);for(const n of e)try{if(NR(n))return}catch{}et(t,"unauthorized-domain")}function NR(t){const e=Ua(),{protocol:n,hostname:r}=new URL(e);if(t.startsWith("chrome-extension://")){const o=new URL(t);return o.hostname===""&&r===""?n==="chrome-extension:"&&t.replace("chrome-extension://","")===e.replace("chrome-extension://",""):n==="chrome-extension:"&&o.hostname===r}if(!AR.test(n))return!1;if(RR.test(t))return r===t;const i=t.replace(/\./g,"\\.");return new RegExp("^(.+\\."+i+"|"+i+")$","i").test(r)}/**
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
 */const LR=new Ii(3e4,6e4);function Xd(){const t=Ze().___jsl;if(t?.H){for(const e of Object.keys(t.H))if(t.H[e].r=t.H[e].r||[],t.H[e].L=t.H[e].L||[],t.H[e].r=[...t.H[e].L],t.CP)for(let n=0;n<t.CP.length;n++)t.CP[n]=null}}function OR(t){return new Promise((e,n)=>{function r(){Xd(),gapi.load("gapi.iframes",{callback:()=>{e(gapi.iframes.getContext())},ontimeout:()=>{Xd(),n(ze(t,"network-request-failed"))},timeout:LR.get()})}if(Ze().gapi?.iframes?.Iframe)e(gapi.iframes.getContext());else if(Ze().gapi?.load)r();else{const i=Bk("iframefcb");return Ze()[i]=()=>{gapi.load?r():n(ze(t,"network-request-failed"))},Uk(`${$k()}?onload=${i}`).catch(s=>n(s))}}).catch(e=>{throw Zi=null,e})}let Zi=null;function DR(t){return Zi=Zi||OR(t),Zi}/**
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
 */const MR=new Ii(5e3,15e3),xR="__/auth/iframe",FR="emulator/auth/iframe",UR={style:{position:"absolute",top:"-100px",width:"1px",height:"1px"},"aria-hidden":"true",tabindex:"-1"},$R=new Map([["identitytoolkit.googleapis.com","p"],["staging-identitytoolkit.sandbox.googleapis.com","s"],["test-identitytoolkit.sandbox.googleapis.com","t"]]);function BR(t){const e=t.config;S(e.authDomain,t,"auth-domain-config-required");const n=e.emulator?hl(e,FR):`https://${t.config.authDomain}/${xR}`,r={apiKey:e.apiKey,appName:t.name,v:pr},i=$R.get(t.config.apiHost);i&&(r.eid=i);const s=t._getFrameworks();return s.length&&(r.fw=s.join(",")),`${n}?${fr(r).slice(1)}`}async function HR(t){const e=await DR(t),n=Ze().gapi;return S(n,t,"internal-error"),e.open({where:document.body,url:BR(t),messageHandlersFilter:n.iframes.CROSS_ORIGIN_IFRAMES_FILTER,attributes:UR,dontclear:!0},r=>new Promise(async(i,s)=>{await r.restyle({setHideOnLeave:!1});const o=ze(t,"network-request-failed"),a=Ze().setTimeout(()=>{s(o)},MR.get());function c(){Ze().clearTimeout(a),i(r)}r.ping(c).then(c,()=>{s(o)})}))}/**
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
 */const WR={location:"yes",resizable:"yes",statusbar:"yes",toolbar:"no"},VR=500,jR=600,zR="_blank",GR="http://localhost";class Qd{constructor(e){this.window=e,this.associatedEvent=null}close(){if(this.window)try{this.window.close()}catch{}}}function qR(t,e,n,r=VR,i=jR){const s=Math.max((window.screen.availHeight-i)/2,0).toString(),o=Math.max((window.screen.availWidth-r)/2,0).toString();let a="";const c={...WR,width:r.toString(),height:i.toString(),top:s,left:o},l=_e().toLowerCase();n&&(a=Sg(l)?zR:n),wg(l)&&(e=e||GR,c.scrollbars="yes");const u=Object.entries(c).reduce((h,[f,p])=>`${h}${f}=${p},`,"");if(Pk(l)&&a!=="_self")return YR(e||"",a),new Qd(null);const d=window.open(e||"",a,u);S(d,t,"popup-blocked");try{d.focus()}catch{}return new Qd(d)}function YR(t,e){const n=document.createElement("a");n.href=t,n.target=e;const r=document.createEvent("MouseEvent");r.initMouseEvent("click",!0,!0,window,1,0,0,0,0,!1,!1,!1,!1,1,null),n.dispatchEvent(r)}/**
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
 */const KR="__/auth/handler",JR="emulator/auth/handler",XR=encodeURIComponent("fac");async function Zd(t,e,n,r,i,s){S(t.config.authDomain,t,"auth-domain-config-required"),S(t.config.apiKey,t,"invalid-api-key");const o={apiKey:t.config.apiKey,appName:t.name,authType:n,redirectUrl:r,v:pr,eventId:i};if(e instanceof _l){e.setDefaultLanguage(t.languageCode),o.providerId=e.providerId||"",cs(e.getCustomParameters())||(o.customParameters=JSON.stringify(e.getCustomParameters()));for(const[u,d]of Object.entries({}))o[u]=d}if(e instanceof ki){const u=e.getScopes().filter(d=>d!=="");u.length>0&&(o.scopes=u.join(","))}t.tenantId&&(o.tid=t.tenantId);const a=o;for(const u of Object.keys(a))a[u]===void 0&&delete a[u];const c=await t._getAppCheckToken(),l=c?`#${XR}=${encodeURIComponent(c)}`:"";return`${QR(t)}?${fr(a).slice(1)}${l}`}function QR({config:t}){return t.emulator?hl(t,JR):`https://${t.authDomain}/${KR}`}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const qo="webStorageSupport";class ZR{constructor(){this.eventManagers={},this.iframes={},this.originValidationPromises={},this._redirectPersistence=$g,this._completeRedirectFn=qg,this._overrideRedirectResult=vR}async _openPopup(e,n,r,i){Et(this.eventManagers[e._key()]?.manager,"_initialize() not called before _openPopup()");const s=await Zd(e,n,r,Ua(),i);return qR(e,s,yl())}async _openRedirect(e,n,r,i){await this._originValidation(e);const s=await Zd(e,n,r,Ua(),i);return rR(s),new Promise(()=>{})}_initialize(e){const n=e._key();if(this.eventManagers[n]){const{manager:i,promise:s}=this.eventManagers[n];return i?Promise.resolve(i):(Et(s,"If manager is not set, promise should be"),s)}const r=this.initAndGetManager(e);return this.eventManagers[n]={promise:r},r.catch(()=>{delete this.eventManagers[n]}),r}async initAndGetManager(e){const n=await HR(e),r=new TR(e);return n.register("authEvent",i=>(S(i?.authEvent,e,"invalid-auth-event"),{status:r.onEvent(i.authEvent)?"ACK":"ERROR"}),gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER),this.eventManagers[e._key()]={manager:r},this.iframes[e._key()]=n,r}_isIframeWebStorageSupported(e,n){this.iframes[e._key()].send(qo,{type:qo},i=>{const s=i?.[0]?.[qo];s!==void 0&&n(!!s),et(e,"internal-error")},gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER)}_originValidation(e){const n=e._key();return this.originValidationPromises[n]||(this.originValidationPromises[n]=PR(e)),this.originValidationPromises[n]}get _shouldInitProactively(){return Rg()||bg()||gl()}}const eA=ZR;var eh="@firebase/auth",th="1.11.0";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class tA{constructor(e){this.auth=e,this.internalListeners=new Map}getUid(){return this.assertAuthConfigured(),this.auth.currentUser?.uid||null}async getToken(e){return this.assertAuthConfigured(),await this.auth._initializationPromise,this.auth.currentUser?{accessToken:await this.auth.currentUser.getIdToken(e)}:null}addAuthTokenListener(e){if(this.assertAuthConfigured(),this.internalListeners.has(e))return;const n=this.auth.onIdTokenChanged(r=>{e(r?.stsTokenManager.accessToken||null)});this.internalListeners.set(e,n),this.updateProactiveRefresh()}removeAuthTokenListener(e){this.assertAuthConfigured();const n=this.internalListeners.get(e);n&&(this.internalListeners.delete(e),n(),this.updateProactiveRefresh())}assertAuthConfigured(){S(this.auth._initializationPromise,"dependent-sdk-initialized-before-auth")}updateProactiveRefresh(){this.internalListeners.size>0?this.auth._startProactiveRefresh():this.auth._stopProactiveRefresh()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function nA(t){switch(t){case"Node":return"node";case"ReactNative":return"rn";case"Worker":return"webworker";case"Cordova":return"cordova";case"WebExtension":return"web-extension";default:return}}function rA(t){Bt(new mt("auth",(e,{options:n})=>{const r=e.getProvider("app").getImmediate(),i=e.getProvider("heartbeat"),s=e.getProvider("app-check-internal"),{apiKey:o,authDomain:a}=r.options;S(o&&!o.includes(":"),"invalid-api-key",{appName:r.name});const c={apiKey:o,authDomain:a,clientPlatform:t,apiHost:"identitytoolkit.googleapis.com",tokenApiHost:"securetoken.googleapis.com",apiScheme:"https",sdkClientVersion:Ag(t)},l=new xk(r,i,s,c);return Wk(l,n),l},"PUBLIC").setInstantiationMode("EXPLICIT").setInstanceCreatedCallback((e,n,r)=>{e.getProvider("auth-internal").initialize()})),Bt(new mt("auth-internal",e=>{const n=vr(e.getProvider("auth").getImmediate());return(r=>new tA(r))(n)},"PRIVATE").setInstantiationMode("EXPLICIT")),ft(eh,th,nA(t)),ft(eh,th,"esm2020")}/**
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
 */const iA=300,sA=bf("authIdTokenMaxAge")||iA;let nh=null;const oA=t=>async e=>{const n=e&&await e.getIdTokenResult(),r=n&&(new Date().getTime()-Date.parse(n.issuedAtTime))/1e3;if(r&&r>sA)return;const i=n?.token;nh!==i&&(nh=i,await fetch(t,{method:i?"POST":"DELETE",headers:i?{Authorization:`Bearer ${i}`}:{}}))};function aA(t=vc()){const e=yi(t,"auth");if(e.isInitialized())return e.getImmediate();const n=Hk(t,{popupRedirectResolver:eA,persistence:[jg,Fg,$g]}),r=bf("authTokenSyncURL");if(r&&typeof isSecureContext=="boolean"&&isSecureContext){const s=new URL(r,location.origin);if(location.origin===s.origin){const o=oA(s.toString());Xk(n,o,()=>o(n.currentUser)),Jk(n,a=>o(a))}}const i=vf("auth");return i&&Vk(n,`http://${i}`),n}function cA(){return document.getElementsByTagName("head")?.[0]??document}Fk({loadJS(t){return new Promise((e,n)=>{const r=document.createElement("script");r.setAttribute("src",t),r.onload=e,r.onerror=i=>{const s=ze("internal-error");s.customData=i,n(s)},r.type="text/javascript",r.charset="UTF-8",cA().appendChild(r)})},gapiScript:"https://apis.google.com/js/api.js",recaptchaV2Script:"https://www.google.com/recaptcha/api.js",recaptchaEnterpriseScript:"https://www.google.com/recaptcha/enterprise.js?render="});rA("Browser");const mN=()=>!1,lA=t=>{try{t&&localStorage.setItem("debug:console","1")}catch{}},B=(...t)=>{},uA=(...t)=>{localStorage.getItem("debug:console")},dA="765724787439-21p8n3e2tsfq2qk4oriq7ipp7m4o50ad.apps.googleusercontent.com",Wr=new Set;function hA(){const t=console.error;console.error=(...e)=>{const n=e.join(" ");n.includes("FedCM")&&n.includes("AbortError")&&n.includes("signal is aborted without reason")||e.length===1&&typeof e[0]=="string"&&e[0].trim()==="The request has been aborted."||t.apply(console,e)}}function fA(t){return B("[ONE TAP] Callback registered, total callbacks:",Wr.size+1),Wr.add(t),()=>Wr.delete(t)}function Nn(t){B("[ONE TAP] Notifying status:",t,"to",Wr.size,"callbacks"),Wr.forEach(e=>{try{e(t)}catch{}})}function Kg(){if(typeof google>"u"||!google.accounts?.id){setTimeout(()=>Kg(),100);return}hA(),google.accounts.id.initialize({client_id:dA,callback:pA,auto_select:!1,cancel_on_tap_outside:!0,context:"signin",use_fedcm_for_prompt:!0,itp_support:!0})}function Jg(){if(vl()){Nn("not_needed");return}window.google?.accounts?.id&&(Nn("prompting"),window.google.accounts.id.prompt(t=>{const e=t.getMomentType();e==="skipped"?Nn("skipped"):e==="dismissed"?Nn("dismissed"):e==="display"&&Nn("displayed")}))}async function pA(t){try{B("[ONE TAP] Received credential, signing in with Firebase..."),Nn("signing_in");const e=Pe.credential(t.credential),n=await Kk(ke,e);B("[ONE TAP] ✅ Successfully signed in:",n.user.email),Qg(!1)}catch(e){const n=e?.code||"unknown",r=e?.message||String(e);alert(n==="auth/account-exists-with-different-credential"?"An account already exists with the same email but different sign-in credentials.":`One Tap sign-in failed: ${r}`)}}let Wa=!1;async function gA(){const t=ee();if(!t||Wa)return;const e=N(M,`users/${t}/presence`);try{await Re(e,{state:"online",lastChanged:ln()}),await Yp(e).set({state:"offline",lastSeen:ln(),lastChanged:ln()}),Wa=!0,console.log("Presence initialized for user:",t)}catch(n){console.error("Failed to initialize presence:",n)}}async function mA(){const t=ee();if(!t)return;const e=N(M,`users/${t}/presence`);try{await Re(e,{state:"offline",lastSeen:ln(),lastChanged:ln()}),Wa=!1}catch(n){console.error("Failed to set offline:",n)}}const ke=aA(al),Xg=(async()=>{try{await Go(ke,jg)}catch{try{await Go(ke,Fg)}catch{await Go(ke,Ba)}}try{const t=await SR(ke);t?.user&&console.log("[AUTH] ✅ Sign-in completed (via Safari fallback), user:",t.user.email||t.user.uid)}catch(t){B("[AUTH] No redirect result:",t.code)}setTimeout(()=>{Kg(),Jg()},500)})();let Or=!1;function Qg(t){Or=t}function _A(){try{const t=document.createElement("a");t.href=window.location.href,t.target="_blank",t.rel="noopener noreferrer external",document.body.appendChild(t),t.click(),document.body.removeChild(t)}catch{}}let Pr=null;const yA=()=>Math.random().toString(36).substring(2,15),Va="guestUser",EA=2880*60*1e3;function vA(){try{const t=typeof localStorage<"u"?localStorage.getItem(Va):null;if(!t)return null;const e=JSON.parse(t);if(!e||typeof e!="object"||!e.id)return null;if(e.expiresAt&&Date.now()>e.expiresAt){try{localStorage.removeItem(Va)}catch{}return null}return e}catch{return null}}function wA(t,e=EA){const n=Date.now(),r={id:t,createdAt:n,expiresAt:n+e};try{typeof localStorage<"u"&&localStorage.setItem(Va,JSON.stringify(r))}catch{}return r}function fe(){const t=ee();if(t)return t;if(!Pr){const e=vA();e&&e.id?Pr=e.id:(Pr=yA(),wA(Pr))}return Pr}function Zg(){return ke.currentUser}function vl(){return ke.currentUser!==null}function ee(){return ke.currentUser?.uid??null}function bA(){return new Promise(t=>{const e=Dg(ke,n=>{e(),t(n)})})}function wl(t,{truncate:e=7}={}){return Dg(ke,n=>{const r=!!n,i=n?.displayName||"Guest User",s=typeof i=="string"&&i.length>e?i.slice(0,e)+"...":i;r&&gA().catch(o=>{console.warn("Failed to initialize presence:",o)});try{t({user:n,isLoggedIn:r,userName:s})}catch{}})}async function em(){const t=new Pe;t.setCustomParameters({prompt:"select_account"});const n=(()=>{try{return typeof window<"u"&&window.matchMedia&&window.matchMedia("(display-mode: standalone)").matches||typeof navigator<"u"&&navigator.standalone===!0}catch{return!1}})()&&/iphone|ipad|ipod/i.test(navigator.userAgent||"");try{if(n&&Or){Or=!1,_A();return}console.log("[AUTH] Starting popup sign-in flow...");const r=await mR(ke,t),s=Pe.credentialFromResult(r).accessToken,o=r.user;console.log("Signed in user:",o),B("Google Access Token exists:",!!s),Or=!1}catch(r){const i=r?.code||"unknown",s=r?.message||String(r);if(i==="auth/popup-closed-by-user"||i==="auth/cancelled-popup-request"){console.log("Sign-in cancelled by user");return}if((i==="auth/network-request-failed"||i==="auth/popup-blocked")&&n){console.warn(`[AUTH] ${i} inside iOS standalone PWA. Arming Safari fallback.`),Or=!0,alert(`Sign-in is blocked in the installed app on iOS.

Tap the Login button again to open in Safari and complete sign-in.`);return}if(i==="auth/popup-blocked"){alert("Pop-up blocked. Please enable pop-ups for this site in your browser settings, or try signing in from a desktop browser.");return}const o=r?.customData?.email,a=Pe.credentialFromError(r);if(console.error("Error during Google sign-in:",{errorCode:i,errorMessage:s,email:o,credential:a,origin:typeof window<"u"?window.location.origin:"n/a"}),i==="auth/unauthorized-domain"){const c=typeof window<"u"?window.location.origin:"",l=["This app's host is not whitelisted in Firebase Authentication.","Fix: In Firebase Console, go to Build → Authentication → Settings → Authorized domains and add this origin:",c?`• ${c}`:"• <your dev origin>","","Common dev hosts to add:","• http://localhost (covers any port)","• http://127.0.0.1","• http://[::1] (IPv6 localhost)","• Your LAN IP, e.g. http://192.168.x.y","","Tip: avoid opening index.html directly from the filesystem (file://). Use a dev server instead."];c&&typeof navigator<"u"&&navigator.clipboard?.writeText&&navigator.clipboard.writeText(c).catch(()=>{}),alert(`Sign-in failed: Unauthorized domain.

${l.join(`
`)}`);return}alert(`Sign-in failed: ${s}`)}}async function tm(){try{await mA(),await Qk(ke),console.info("User signed out"),setTimeout(()=>Jg(),1500)}catch(t){throw console.error("Error signing out:",t),t}}const SA=Object.freeze(Object.defineProperty({__proto__:null,auth:ke,authReady:Xg,getCurrentUser:Zg,getCurrentUserAsync:bA,getLoggedInUserId:ee,getUserId:fe,isLoggedIn:vl,onAuthChange:wl,setSafariExternalOpenArmed:Qg,signInWithGoogle:em,signOutUser:tm},Symbol.toStringTag,{value:"Module"})),CA=t=>String(t).replace(/[&<>"'`=\/]/g,n=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;","`":"&#x60;","=":"&#x3D;","/":"&#x2F;"})[n]),TA=(t,e)=>t.replace(/\$\{([^}]+)\}/g,(n,r)=>{const i=r.trim(),s=i.split(".").reduce((a,c)=>a?.[c],e);return s==null?"":i.endsWith("Html")?String(s):CA(String(s))}),IA=(t,e={})=>{const n=document.createElement("template");return n.innerHTML=TA(t,e),n.content.cloneNode(!0)},kA=(t,e)=>{const n=[];let r=e;for(;r&&r!==t;){const i=r.parentElement;if(!i)break;const s=Array.prototype.indexOf.call(i.children,r);n.push(s),r=i}return n.reverse()},RA=(t,e)=>e.reduce((n,r)=>n&&n.children?n.children[r]:null,t),AA=t=>Array.from(t.querySelectorAll("input, textarea, select")).map(e=>({name:e.name,id:e.id,path:kA(t,e),value:e.value,checked:e.checked,selectionStart:e.selectionStart,selectionEnd:e.selectionEnd,wasFocused:document.activeElement===e})),PA=t=>t.replace(/["'\\]/g,"\\$&"),NA=(t,e)=>{e.forEach(n=>{let r=null;if(n.name){const i=PA(n.name);r=t.querySelector(`input[name="${i}"], textarea[name="${i}"], select[name="${i}"]`)}else n.id?r=t.querySelector(`#${n.id}`):n.path&&(r=RA(t,n.path));if(r){if(r.value=n.value,n.checked!==void 0&&(r.checked=n.checked),n.selectionStart!=null&&r.setSelectionRange)try{r.setSelectionRange(n.selectionStart,n.selectionEnd)}catch{}if(n.wasFocused)try{r.focus()}catch{}}})},LA=t=>Array.from(t.querySelectorAll("video, audio")).map(e=>({src:e.currentSrc||e.src,currentTime:e.currentTime,paused:e.paused,volume:e.volume,playbackRate:e.playbackRate,muted:e.muted})),OA=(t,e)=>{const n=t.querySelectorAll("video, audio");for(const r of n)if(r.currentSrc===e||r.src===e)return r;return null},DA=(t,e)=>{e.forEach(n=>{if(!n.src)return;const r=OA(t,n.src);r&&(r.currentTime=n.currentTime,r.volume=n.volume,r.playbackRate=n.playbackRate,r.muted=n.muted,n.paused||r.play().catch(()=>{}))})},MA=()=>document.readyState!=="loading",bl=({initialProps:t={},template:e="",handlers:n={},parent:r=null,containerTag:i="div",className:s="",onMount:o=null,onCleanup:a=null,autoAppend:c=!0,preserveInputState:l=!0}={})=>{if(!MA())return console.error("createComponent: DOM must be ready before creating components."),null;const u=document.createElement(i);s&&(u.className=s);let d={...t};const h=new Set,f=/\$\{([^}]+)\}/g;let p;for(;(p=f.exec(e))!==null;){const w=p[1].trim().split(".")[0];h.add(w)}const _=[],m=[],T={},V=()=>{let w=[],ue=[];l&&(w=AA(u),ue=LA(u)),u.textContent="";const Fe=IA(e,d);u.appendChild(Fe),Object.keys(n).forEach(Je=>{const Ee=u.querySelectorAll(`[onclick="${Je}"]`),Rn=n[Je];Ee.forEach(X=>{X.removeAttribute("onclick"),typeof Rn=="function"&&X.addEventListener("click",Rn)})}),l&&(NA(u,w),DA(u,ue)),_.forEach(Je=>Je({...d}))},$=w=>{if(!Array.isArray(w)||w.length===0)return;const ue={props:{...d},changedKeys:w};m.forEach(Fe=>Fe(ue))};for(const w of Object.keys(t))T[w]=[],Object.defineProperty(u,w,{get(){return d[w]},set(ue){d[w]!==ue&&(d[w]=ue,h.has(w)&&V(),T[w].forEach(Fe=>Fe(ue)),$([w]))},configurable:!0,enumerable:!0});if(u.update=w=>{let ue=!1,Fe=!1;const Je=[];for(const Ee in w)w[Ee]!==d[Ee]&&(d[Ee]=w[Ee],h.has(Ee)&&(Fe=!0),T[Ee]&&T[Ee].forEach(Rn=>Rn(w[Ee])),ue=!0,Je.push(Ee));ue&&Fe&&V(),Je.length>0&&$(Je)},u.onRender=w=>{typeof w=="function"&&_.push(w)},u.onAnyPropUpdated=w=>{typeof w=="function"&&m.push(w)},u.onPropUpdated=(w,ue)=>{typeof ue=="function"&&T[w]&&T[w].push(ue)},u.dispose=()=>{a&&(Array.isArray(a)?a.forEach(w=>{typeof w=="function"&&w()}):typeof a=="function"&&a()),_.length=0,m.length=0;for(const w in T)T[w].length=0;u.remove()},V(),c&&r&&!r.contains(u)&&r.appendChild(u),typeof o=="function")try{o(u)}catch(w){uA("[createComponent]: Error in onMount handler of component",w)}return u};let Nr=null;const xA=(t,e=null)=>{if(Nr)return Nr;if(!t)return console.error("Auth UI: Parent element is required"),null;let n=null,r=null,i=10;typeof e=="number"&&(i=e);const s=vl();return Nr=bl({initialProps:{isLoggedIn:s,userName:"Guest User",signingInDisplay:"none",loginBtnMarginRightPx:i},template:`
      <button style="margin-right: \${loginBtnMarginRightPx}px" id="goog-login-btn" class="login-btn" onclick="handleLogin" disabled>Login</button>
      <button id="goog-logout-btn" class="logout-btn" onclick="handleLogout" disabled>Logout</button>
      <span class="signing-in-indicator" style="display: \${signingInDisplay}; color: var(--text-secondary, #888); font-size: 0.9rem;">Signing in...</span>
      <div class="user-info">\${isLoggedIn ? 'Logged in: ' + userName : 'Logged out'}</div>
    `,handlers:{handleLogin:em,handleLogout:tm},onMount:o=>{const a=c=>{const l=o.querySelector("#goog-login-btn"),u=o.querySelector("#goog-logout-btn");l&&u&&(l.disabled=c,u.disabled=!c)};a(s),n=wl(({isLoggedIn:c,userName:l})=>{B("[AuthComponent] Auth state changed:",{isLoggedIn:c,userName:l}),a(c),o.update({isLoggedIn:c,userName:l,signingInDisplay:"none"})}),r=fA(c=>{B("[AuthComponent] One Tap status:",c),c==="signing_in"?o.update({signingInDisplay:"inline-block"}):o.update({signingInDisplay:"none"})})},onCleanup:()=>{n&&(n(),n=null),r&&(r(),r=null),Nr=null},className:"auth-component",parent:t}),Nr},Sl=t=>t?!0:(console.warn("Element not found. el.id: =>",t?.id??"(no id)","el: =>",t),console.trace(),!1),Cl=t=>{if(Sl(t))return t.classList.contains("hidden")},A=t=>{Sl(t)&&t.classList.contains("hidden")&&t.classList.remove("hidden")},E=t=>{Sl(t)&&!t.classList.contains("hidden")&&t.classList.add("hidden")},nm=t=>t.classList.contains("small-frame"),Bn=t=>{if(t&&!nm(t)){t.classList.add("small-frame");const e=document.createElement("div");e.classList.add("small-frame-toggle-div");const n=document.createElement("span");n.classList.add("small-frame-toggle-icon"),n.textContent="❮",e.appendChild(n),t.appendChild(e),e.addEventListener("click",()=>{t.classList.contains("closed")?(t.classList.remove("closed"),e.classList.remove("closed"),n.classList.remove("closed")):(t.classList.add("closed"),e.classList.add("closed"),n.classList.add("closed"))})}},ct=t=>{if(nm(t)){t.classList.remove("small-frame");const e=document.querySelector(".small-frame-close");e&&e.remove()}};function ja(t){return document.pictureInPictureElement===t}function go(t="room"){const e=new URL(window.location);e.searchParams.delete(t),window.history.replaceState({},"",e)}const H=t=>{const e=document.getElementById(t);return e||(console.warn(`Element with id: ${t} not found.`),null)};let tt=null,Yt=null,mo=null,Tl=null,Ce=null,Z=null,te=null,z=null,W=null,Se=null,Oe=null,xe=null,qe=null,wr=null,rm=null,Ye=null,_o=null,zt=null,br=null,Sr=null,bn=null,Il=null,kl=null,Rl=null,Al=null;function rh(){tt=H("lobby"),Yt=H("lobby-call-btn"),mo=H("title-auth-bar"),Tl=H("videos"),Ce=H("local-video-el"),Z=H("local-video-box"),te=H("remote-video-el"),z=H("remote-video-box"),W=H("shared-video-el"),Se=H("shared-video-box"),Oe=H("chat-controls"),xe=H("call-btn"),qe=H("hang-up-btn"),wr=H("switch-camera-btn"),Ye=H("mute-btn"),_o=H("fullscreen-partner-btn"),zt=H("remote-pip-btn"),br=H("mic-btn"),Sr=H("camera-btn"),bn=H("exit-watch-mode-btn"),Il=H("app-pip-btn"),kl=H("app-title-h1"),Rl=H("app-title-a"),Al=H("app-title-span")}document.readyState==="loading"?document.addEventListener("DOMContentLoaded",rh):rh();const im=()=>({lobbyDiv:tt,lobbyCallBtn:Yt,titleAuthBar:mo,videosWrapper:Tl,localVideoEl:Ce,localBoxEl:Z,remoteVideoEl:te,remoteBoxEl:z,sharedVideoEl:W,sharedBoxEl:Se,chatControls:Oe,callBtn:xe,hangUpBtn:qe,switchCameraBtn:wr,installBtn:rm,mutePartnerBtn:Ye,fullscreenPartnerBtn:_o,remotePipBtn:zt,micBtn:br,cameraBtn:Sr,exitWatchModeBtn:bn,appPipBtn:Il,appTitleH1:kl,appTitleA:Rl,appTitleSpan:Al});function sm(t,e=3,n=100){return new Promise(r=>{let i=0;const s=()=>{const o=document.getElementById(t);if(o){r(o);return}if(i++,i>=e){console.warn(`Element ${t} not found after ${e} attempts`),r(null);return}setTimeout(s,n)};s()})}async function om(t,e=3,n=100){const r={},i=t.map(async s=>{const o=await sm(s,e,n);return r[s]=o,o});return await Promise.all(i),r}async function FA(){const t=await om(["searchBtn","searchQuery","searchResults"],5,200),e=document.querySelector(".search-section");t.searchContainer=e;const n=Object.entries(t).filter(([r,i])=>!i).map(([r])=>r);return n.length>0&&console.warn("Some YouTube elements not found:",n),t}const UA=Object.freeze(Object.defineProperty({__proto__:null,get appPipBtn(){return Il},get appTitleA(){return Rl},get appTitleH1(){return kl},get appTitleSpan(){return Al},get callBtn(){return xe},get cameraBtn(){return Sr},get chatControls(){return Oe},get exitWatchModeBtn(){return bn},get fullscreenPartnerBtn(){return _o},getElements:im,get hangUpBtn(){return qe},initializeYouTubeElements:FA,installBtn:rm,get lobbyCallBtn(){return Yt},get lobbyDiv(){return tt},get localBoxEl(){return Z},get localVideoEl(){return Ce},get micBtn(){return br},get mutePartnerBtn(){return Ye},get remoteBoxEl(){return z},get remotePipBtn(){return zt},get remoteVideoEl(){return te},robustElementAccess:sm,get sharedBoxEl(){return Se},get sharedVideoEl(){return W},get switchCameraBtn(){return wr},get titleAuthBar(){return mo},get videosWrapper(){return Tl},waitForElements:om},Symbol.toStringTag,{value:"Module"})),ih="yt-video-box",za="yt-player-root";let G=null,vt=!1;const Vr=()=>G,$A=()=>vt,am=t=>vt=t,Hn=()=>{const t=document.getElementById(ih);if(!t)throw new Error(`Container #${ih} not found`);return t};function BA(){return new Promise(t=>{window.YT&&window.YT.Player?t():window.onYouTubeIframeAPIReady=()=>{t()}})}function cm(){const t=Hn();if(!document.getElementById(za)){const e=document.createElement("div");e.id=za,t.appendChild(e)}A(t)}function Ls(){const t=Hn();E(t)}function Yo(){const t=Hn();return t&&!t.classList.contains("hidden")}function Ga(t){return t?t.includes("youtube.com")||t.includes("youtu.be"):!1}function lm(t){if(!t)return null;const e=[/(?:youtube\.com\/watch\?v=)([\w-]+)/,/(?:youtu\.be\/)([\w-]+)/,/(?:youtube\.com\/embed\/)([\w-]+)/,/(?:youtube\.com\/shorts\/)([\w-]+)/];for(const n of e){const r=t.match(n);if(r&&r[1])return r[1]}return null}async function HA({url:t,onReady:e,onStateChange:n}){const r=lm(t);if(!r)throw new Error("Invalid YouTube URL");if(await BA(),G){try{G.destroy()}catch(o){console.warn("Error destroying previous YouTube player:",o)}G=null}const i=(o=!0)=>{const a=Hn(),c=G.getIframe();if(c&&a){try{a.tabIndex=-1,a.focus({preventScroll:!0})}catch{if(document.activeElement===c)try{c.blur()}catch{}}if(o){const l=u=>{if(u.code==="Space"){const d=Hn(),h=G.getIframe();if(document.activeElement===h||document.activeElement===d)return;u.preventDefault(),console.debug("Space pressed, refocusing iframe"),G.getPlayerState()!==window.YT.PlayerState.PLAYING?Nl():Ai()}};document.addEventListener("keydown",l,{once:!0})}}},s=()=>{const o=Hn(),a=G.getIframe();if(o&&a&&document.activeElement!==a)try{a.focus()}catch{}};return cm(),new Promise((o,a)=>{try{G=new window.YT.Player(za,{videoId:r,playerVars:{autoplay:1,mute:0,controls:1,fs:1,rel:0,modestbranding:1,disablekb:0,origin:window.location.origin},events:{onReady:c=>{vt=!0,e&&e(c),o(G)},onStateChange:c=>{c.data===window.YT.PlayerState.ENDED&&i(!1),c.data===window.YT.PlayerState.PAUSED&&i(),c.data===window.YT.PlayerState.PLAYING&&s(),n&&n(c)},onError:c=>{console.error("YouTube player error:",c.data),a(new Error(`YouTube error: ${c.data}`))}}})}catch(c){a(c)}})}function Pl(){if(G){try{Ls(),G.destroy()}catch(t){console.warn("Error destroying YouTube player:",t)}G=null,vt=!1}}function Nl(){G&&vt&&G.playVideo()}function Ai(){G&&vt&&G.pauseVideo()}function WA(t){G&&vt&&G.seekTo(t,!0)}function Os(){return G&&vt?G.getCurrentTime():0}function Ll(){return G&&vt?G.getPlayerState():-1}const Pt={UNSTARTED:-1,ENDED:0,PLAYING:1,PAUSED:2,BUFFERING:3,CUED:5};let Ge=null,Pi=null,um=!1,De="none",Ol=null;const ir=()=>um,dm=t=>um=t,rn=()=>De,VA=t=>{["yt","url","none"].includes(t)?De=t:console.warn("Invalid lastWatched platform:",t)};let Nt=!1,jr=null,zr=0;async function Wn(t){if(!Ge)return;console.debug("Updating watch sync state, roomId:",Ge);const e=ho(Ge);try{await cn(e,{...t,updatedBy:Pi})}catch(n){console.error("Failed to update watch state:",n)}}function jA(t,e,n){if(!t)return;Ge=t,Pi=n;const r=ho(t);Ki(r,zA,t),QA()}function zA(t){const e=t.val();e&&e.updatedBy!==Pi&&(Date.now()-zr<500||(e.url&&e.url!==Ol&&GA(e.url),e.isYouTube?qA(e):XA(e)))}function GA(t){Ol=t,Ga(t)?(E(Se),hm(t),De="yt"):(Pl(),A(Se),W.src=t,De="url")}function qA(t){!Vr()||!$A()||(YA(t),KA(t))}function YA(t){const e=Ll(),n=e===Pt.PLAYING;if([Pt.BUFFERING,Pt.UNSTARTED].includes(e)){JA();return}Nt||(t.playing&&!n?(Nl(),De="yt"):!t.playing&&n&&(Ai(),De="yt"))}function KA(t){if(t.currentTime===void 0)return;const e=Os();Math.abs(e-t.currentTime)>.3&&!Nt&&(WA(t.currentTime),setTimeout(()=>{t.playing?Nl():Ai(),De="yt"},500))}function JA(){Nt=!0,clearTimeout(jr),jr=setTimeout(async()=>{Nt=!1;const t=Ll()===Pt.PLAYING;await Wn({playing:t,currentTime:Os()})},700)}function XA(t){t.playing!==void 0&&(t.playing&&W.paused?W.play().catch(e=>console.warn("Play failed:",e)):!t.playing&&!W.paused&&W.pause()),t.currentTime!==void 0&&Math.abs(W.currentTime-t.currentTime)>1&&(W.currentTime=t.currentTime,t.playing?W.play().catch(n=>console.warn("Play failed:",n)):W.pause())}function QA(){W.addEventListener("play",async()=>{!Vr()&&Ge&&(zr=Date.now(),await Wn({playing:!0,isYouTube:!1})),De="url"}),W.addEventListener("pause",async()=>{!Vr()&&Ge&&(zr=Date.now(),await Wn({playing:!1,isYouTube:!1})),De="url"}),W.addEventListener("seeked",async()=>{!Vr()&&Ge&&(zr=Date.now(),await Wn({currentTime:W.currentTime,playing:!W.paused,isYouTube:!1})),De="url"})}async function ZA(t){if(!t)return!1;if(zr=Date.now(),Ga(t)){if(E(Se),!await hm(t))return!1;De="yt"}else Pl(),A(Se),W.src=t,De="url";if(Ge){const e=ho(Ge);Re(e,{url:t,playing:!1,currentTime:0,isYouTube:Ga(t),updatedBy:Pi})}return!0}async function qa(t){if(!t||!t.url)return console.warn("Non-existing or invalid video."),!1;Ol=t.url;const e=await ZA(t.url);return Ka(),e}async function hm(t){if(!lm(t))return console.error("Invalid YouTube URL:",t),!1;try{return await HA({url:t,onReady:n=>{if(am(!0),Ge){const r=ho(Ge);Re(r,{url:t,playing:!1,currentTime:0,isYouTube:!0,updatedBy:Pi})}},onStateChange:async n=>{if(!Vr())return;const i=n.data===Pt.PLAYING,s=n.data===Pt.PAUSED;if(n.data===Pt.BUFFERING){Nt=!0,jr&&clearTimeout(jr),jr=setTimeout(async()=>{Nt=!1;const c=Ll()===Pt.PLAYING;await Wn({playing:c,currentTime:Os()})},700);return}s&&Nt||!Nt&&(i||s)&&await Wn({playing:i,currentTime:Os()})}}),!0}catch(n){return console.error("Failed to load YouTube video:",n),!1}}function eP(t,{inactivityMs:e=3e3,listenTarget:n=document,onShow:r=null,onHide:i=null,hideOnEsc:s=!1,excludeEvents:o=["keydown"]}={}){if(!t)return()=>{};let a=null;const l=["pointermove","pointerdown","pointerup","touchstart","touchmove","mousemove","mousedown","keydown"].filter(m=>!Array.isArray(o)||!o.includes(m));function u(){A(t);try{typeof r=="function"&&r()}catch(m){console.warn("showHideOnInactivity onShow callback error:",m)}a&&clearTimeout(a),a=setTimeout(()=>{E(t);try{typeof i=="function"&&i()}catch(m){console.warn("showHideOnInactivity onHide callback error:",m)}a=null},e)}l.forEach(m=>n.addEventListener(m,u,{passive:!0}));function d(){if(document.hidden){a&&(clearTimeout(a),a=null);try{E(t)}catch(m){console.warn("showHideOnInactivity onHide (visibilitychange) callback error:",m)}}else u()}document.addEventListener("visibilitychange",d);function h(m){if(!m.relatedTarget){a&&(clearTimeout(a),a=null),E(t);try{typeof i=="function"&&i()}catch(T){console.warn("showHideOnInactivity onHide (visibilitychange) callback error:",T)}}}n.addEventListener("mouseout",h);function f(m){if(s&&(m.key==="Escape"||m.key==="Esc")){a&&(clearTimeout(a),a=null),E(t);try{typeof i=="function"&&i()}catch(T){console.warn("showHideOnInactivity onHide (esc) callback error:",T)}}}document.addEventListener("keydown",f);function p(){a||u()}n.addEventListener("touchend",p,{passive:!0}),E(t);function _(){l.forEach(m=>n.removeEventListener(m,u)),document.removeEventListener("visibilitychange",d),n.removeEventListener("mouseout",h),n.removeEventListener("touchend",p),document.removeEventListener("keydown",f),a&&(clearTimeout(a),a=null)}return _}let lt=null,ut=null,fm="user";function Ya(){return fm}function pm(t){fm=t}function yo(){return lt instanceof MediaStream}function Dl(){return!lt||!(lt instanceof MediaStream)?(console.error("Invalid remote MediaStream accessed:",lt),null):lt}function gm(t){lt=t}function mm(){lt&&(lt.getTracks().forEach(t=>t.stop()),lt=null)}function _m(){return ut instanceof MediaStream}function Eo(){return!ut||!(ut instanceof MediaStream)?(console.error("Invalid local MediaStream accessed:",ut),console.error("Call createLocalStream() before accessing local stream."),null):ut}function Ds(t){ut=t}function ym(){ut&&(ut.getTracks().forEach(t=>t.stop()),ut=null)}const tP=Object.freeze(Object.defineProperty({__proto__:null,cleanupLocalStream:ym,cleanupRemoteStream:mm,getFacingMode:Ya,getLocalStream:Eo,getRemoteStream:Dl,hasLocalStream:_m,hasRemoteStream:yo,setFacingMode:pm,setLocalStream:Ds,setRemoteStream:gm},Symbol.toStringTag,{value:"Module"}));let li=!1,Hi=!1,sh=null,oh=null,Gr=null;const Em=()=>li;let Ml=()=>{if(!li){if(!te||!yo()||te.paused||te.readyState<2){Hi||(Hi=!0,te.addEventListener("playing",()=>{Hi=!1,Ml()},{once:!0}));return}if(Hi=!1,li=!0,A(z),A(Z),Bn(Z),E(tt),E(Yt),xe.disabled=!0,xe.classList.add("disabled"),qe.disabled=!1,qe.classList.remove("disabled"),Ye.disabled=!1,Ye.classList.remove("disabled"),zt.disabled=!1,zt.classList.remove("disabled"),Gr||(Gr=eP(Oe,{inactivityMs:2500,hideOnEsc:!0})),!sh){const t=()=>{ir()?Bn(z):ct(z),A(z)};te.addEventListener("leavepictureinpicture",t),sh=()=>te.removeEventListener("leavepictureinpicture",t)}if(!oh){const t=()=>E(z);te.addEventListener("enterpictureinpicture",t),oh=()=>te.removeEventListener("enterpictureinpicture",t)}}},vm=()=>{li&&(li=!1,ct(Z),E(Z),ct(z),E(z),xe.disabled=!1,xe.classList.remove("disabled"),A(Yt),qe.disabled=!0,qe.classList.add("disabled"),Ye.disabled=!0,Ye.classList.add("disabled"),zt.disabled=!0,zt.classList.add("disabled"),Gr&&(Gr(),Gr=null),A(tt),A(Oe))};const xl=()=>{if(!yo())return!1;const t=Dl();return t&&t.getVideoTracks().length>0&&t.getVideoTracks()[0].enabled&&t.getVideoTracks()[0].readyState==="live"};function nP(){return"pictureInPictureEnabled"in document&&typeof document.pictureInPictureEnabled=="boolean"&&document.pictureInPictureEnabled}function Ka(){if(!ir()){if(dm(!0),E(tt),E(Yt),Oe.classList.remove("bottom"),Oe.classList.add("watch-mode"),Em()?(E(xe),A(qe)):(E(qe),E(br),E(Ye),A(xe)),E(Sr),E(wr),A(bn),A(Oe),!xl()){E(z),ct(z),ja(Ce)||(A(Z),Bn(Z));return}E(Z),ct(Z),ja(te)?(E(z),ct(z)):nP()?te.requestPictureInPicture().then(()=>{E(z),ct(z)}).catch(t=>{console.warn("Failed to enter Picture-in-Picture:",t),Bn(z),A(z)}):(Bn(z),A(z))}}function qr(){ir()&&(E(bn),A(xe),A(qe),A(br),A(Ye),A(Sr),A(wr),Oe.classList.remove("watch-mode"),Oe.classList.add("bottom"),A(Oe),xl()&&(ja(te)&&document.exitPictureInPicture().catch(t=>{console.error("Failed to exit Picture-in-Picture:",t)}),ct(z),A(z)),Em()?(Bn(Z),A(Z)):(A(tt),A(Yt),ct(Z),E(Z)),dm(!1))}class Vn{constructor(){this.logs=[],this.isEnabled=!0,this.maxLogs=1e3,this.sessionId=this.generateSessionId()}log(e,n,r={}){if(!this.isEnabled)return;const i={timestamp:performance.now(),sessionId:this.sessionId,category:e,event:n,data:{...r},id:this.generateLogId()};this.logs.push(i),this.logs.length>this.maxLogs&&(this.logs=this.logs.slice(-this.maxLogs)),typeof window<"u"&&window.location?.hostname==="localhost"&&console.log(`[DIAG] ${e}:${n}`,r)}logListenerAttachment(e,n,r,i={}){this.log("LISTENER","ATTACHED",{roomId:e,listenerType:n,currentCount:r,...i})}logListenerCleanup(e,n,r={}){this.log("LISTENER","CLEANUP",{removedCount:e.length,preservedCount:n.length,removedRoomIds:e,preservedRoomIds:n,...r})}logDuplicateListener(e,n,r={}){this.log("LISTENER","DUPLICATE_PREVENTED",{roomId:e,listenerType:n,...r})}logIncomingCallEvent(e,n,r,i={}){this.log("INCOMING_CALL","DETECTED",{callerId:e,roomId:n,isFresh:r.isFresh,validationMethod:r.method,age:r.age,reason:r.reason,...i})}logNotificationDecision(e,n,r,i={}){this.log("INCOMING_CALL","NOTIFICATION_DECISION",{decision:e,reason:n,roomId:r,...i})}logCallingUILifecycle(e,n,r={}){this.log("CALLING_UI",e,{roomId:n,...r})}logFirebaseOperation(e,n,r=null,i={}){this.log("FIREBASE","OPERATION",{operation:e,success:n,error:r?{message:r.message,code:r.code,stack:r.stack}:null,...i})}logFirebaseConnectionState(e,n={}){this.log("FIREBASE","CONNECTION_STATE",{state:e,...n})}logRoomCreation(e,n,r,i={}){this.log("ROOM","CREATED",{roomId:e,isInitiator:n,creationTime:r.creationTime,listenerAttachTime:r.listenerAttachTime,timeDiff:r.listenerAttachTime-r.creationTime,...i})}logMemberJoinEvent(e,n,r,i={}){this.log("ROOM","MEMBER_JOINED",{roomId:e,memberId:n,joinedAt:r.joinedAt,role:r.role,...i})}logContactSave(e,n,r={}){this.log("CONTACT","SAVED",{contactId:e,roomId:n,...r})}logContactCall(e,n,r,i={}){this.log("CONTACT","CALL_INITIATED",{contactId:e,roomId:n,forceInitiator:r,...i})}logFreshnessValidation(e,n,r,i={}){this.log("FRESHNESS","VALIDATION",{roomId:e,method:n,result:{isFresh:r.isFresh,age:r.age,threshold:r.threshold,reason:r.reason},...i})}logRaceCondition(e,n,r,i={}){this.log("RACE_CONDITION",e,{roomId:n,events:r,...i})}getLogs(e={}){let n=[...this.logs];return e.category&&(n=n.filter(r=>r.category===e.category)),e.event&&(n=n.filter(r=>r.event===e.event)),e.roomId&&(n=n.filter(r=>r.data.roomId===e.roomId)),e.since&&(n=n.filter(r=>r.timestamp>=e.since)),e.until&&(n=n.filter(r=>r.timestamp<=e.until)),n}getCallFlowTrace(e){return this.getLogs({roomId:e}).sort((n,r)=>n.timestamp-r.timestamp)}getListenerDiagnostics(e=null){const n=this.getLogs({category:"LISTENER"});return e?n.filter(r=>r.data.roomId===e):n}getFailureAnalysis(){const e=this.logs.filter(n=>n.category==="FIREBASE"&&n.data.success===!1||n.category==="INCOMING_CALL"&&n.data.decision==="REJECT"||n.category==="LISTENER"&&n.event==="DUPLICATE_PREVENTED");return{totalFailures:e.length,firebaseFailures:e.filter(n=>n.category==="FIREBASE").length,rejectedCalls:e.filter(n=>n.category==="INCOMING_CALL"&&n.data.decision==="REJECT").length,duplicateListeners:e.filter(n=>n.event==="DUPLICATE_PREVENTED").length,failures:e}}exportDiagnostics(){return{sessionId:this.sessionId,exportTime:Date.now(),logCount:this.logs.length,logs:[...this.logs],summary:this.getFailureAnalysis()}}exportLogsAsJSON(){return JSON.stringify(this.exportDiagnostics(),null,2)}downloadLogs(e=null){e||(e=`diagnostic-logs-${this.sessionId}-${Date.now()}.json`);const n=this.exportLogsAsJSON(),r=new Blob([n],{type:"application/json"}),i=document.createElement("a");i.href=URL.createObjectURL(r),i.download=e,i.click(),URL.revokeObjectURL(i.href)}getLogsInTimeRange(e,n){return this.logs.filter(r=>r.timestamp>=e&&r.timestamp<=n)}getLogsSince(e){return this.logs.filter(n=>n.timestamp>=e)}clearOldLogs(e=1440*60*1e3){const n=Date.now()-e;this.logs=this.logs.filter(r=>r.timestamp>=n)}clearLogs(){this.logs=[]}persistLogs(){try{const e=`diagnostic-logs-${this.sessionId}`;return localStorage.setItem(e,this.exportLogsAsJSON()),e}catch(e){return console.warn("Failed to persist logs to localStorage:",e),null}}loadPersistedLogs(e){try{const n=localStorage.getItem(e);if(n){const r=JSON.parse(n);if(r.logs&&Array.isArray(r.logs)){const i=new Set(this.logs.map(o=>o.id)),s=r.logs.filter(o=>!i.has(o.id));return this.logs=[...this.logs,...s].sort((o,a)=>o.timestamp-a.timestamp),s.length}}return 0}catch(n){return console.warn("Failed to load persisted logs:",n),0}}static getPersistedLogKeys(){const e=[];for(let n=0;n<localStorage.length;n++){const r=localStorage.key(n);r&&r.startsWith("diagnostic-logs-")&&e.push(r)}return e}static cleanupPersistedLogs(e=1440*60*1e3){const n=Date.now()-e;Vn.getPersistedLogKeys().forEach(i=>{try{const s=localStorage.getItem(i);if(s){const o=JSON.parse(s);o.exportTime&&o.exportTime<n&&localStorage.removeItem(i)}}catch{localStorage.removeItem(i)}})}enable(){this.isEnabled=!0}disable(){this.isEnabled=!1}generateSessionId(){return`session_${performance.now()}_${Math.random().toString(36).substr(2,9)}`}generateLogId(){return`log_${performance.now()}_${Math.random().toString(36).substr(2,9)}`}formatTimestamp(e){return new Date(e).toISOString()}startTiming(e){const n=`timing_${e}_${Date.now()}`;return this.log("TIMING","START",{operation:e,timingId:n}),n}endTiming(e,n={}){const r=this.logs.find(i=>i.category==="TIMING"&&i.event==="START"&&i.data.timingId===e);if(r){const i=Date.now()-r.timestamp;return this.log("TIMING","END",{timingId:e,duration:i,operation:r.data.operation,...n}),i}return null}}let Ko=null;function y(){return Ko||(Ko=new Vn),Ko}typeof window<"u"&&(window.diagnosticLogger={getInstance:()=>y(),exportLogs:()=>{const e=y().exportLogsAsJSON();return console.log("Diagnostic logs exported:"),console.log(e),e},downloadLogs:t=>{y().downloadLogs(t),console.log("Diagnostic logs downloaded")},getRoomLogs:t=>{const n=y().getCallFlowTrace(t);return console.log(`Logs for room ${t}:`,n),n},getFailures:()=>{const e=y().getFailureAnalysis();return console.log("Failure analysis:",e),e},getListenerDiagnostics:t=>{const n=y().getListenerDiagnostics(t);return console.log("Listener diagnostics:",n),n},getLogsSince:t=>{const n=y().getLogsSince(t);return console.log(`Logs since ${new Date(t).toISOString()}:`,n),n},getLogsInRange:(t,e)=>{const r=y().getLogsInTimeRange(t,e);return console.log(`Logs from ${new Date(t).toISOString()} to ${new Date(e).toISOString()}:`,r),r},persistLogs:()=>{const e=y().persistLogs();return console.log(`Logs persisted with key: ${e}`),e},loadPersistedLogs:t=>{const n=y().loadPersistedLogs(t);return console.log(`Loaded ${n} persisted logs`),n},getPersistedKeys:()=>{const t=Vn.getPersistedLogKeys();return console.log("Persisted log keys:",t),t},clearLogs:()=>{y().clearLogs(),console.log("Diagnostic logs cleared")},enable:()=>{y().enable(),console.log("Diagnostic logging enabled")},disable:()=>{y().disable(),console.log("Diagnostic logging disabled")},getSessionInfo:()=>{const t=y(),e={sessionId:t.sessionId,logCount:t.logs.length,isEnabled:t.isEnabled,maxLogs:t.maxLogs};return console.log("Session info:",e),e},help:()=>{console.log(`
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
      `)}},window.addEventListener("beforeunload",()=>{try{const t=y();t.logs.length>0&&t.persistLogs(),Vn.cleanupPersistedLogs()}catch{}}),(window.location.hostname==="localhost"||window.location.hostname==="127.0.0.1")&&setTimeout(()=>{try{const t=y(),e=typeof localStorage<"u"&&localStorage.getItem("debug:console")==="1";if(!t.isEnabled||!e)return;const n=Vn.getPersistedLogKeys();n.length>0&&(console.log(`Found ${n.length} persisted diagnostic log sessions. Use diagnosticLogger.loadPersistedLogs(key) to load them.`),console.log("Available keys:",n))}catch{}},1e3));class rP{constructor(){this.currentRoomId=null}async createNewRoom(e,n,r=null){const i=Date.now();r||(r=Math.random().toString(36).substring(2,15)),y().log("ROOM","CREATE_START",{roomId:r,userId:n,hasOffer:!!e,timestamp:i});const s=Jt(r);try{return await Re(s,{offer:{type:e.type,sdp:e.sdp},createdAt:Date.now(),createdBy:n}),y().logFirebaseOperation("create_room",!0,null,{roomId:r,userId:n,duration:Date.now()-i}),await this.joinRoom(r,n),y().log("ROOM","CREATE_COMPLETE",{roomId:r,userId:n,totalDuration:Date.now()-i}),r}catch(o){throw y().logFirebaseOperation("create_room",!1,o,{roomId:r,userId:n,duration:Date.now()-i}),o}}async checkRoomStatus(e){const n=Jt(e),r=await xt(n);if(!r.exists())return{exists:!1,hasMembers:!1,memberCount:0};const i=r.val(),s=i.members||{},o=Object.keys(s).length;return{exists:!0,hasMembers:o>0,memberCount:o,roomData:i}}async getRoomData(e){const n=Jt(e),r=await xt(n);if(!r.exists())throw new Error("Room does not exist");return r.val()}async saveAnswer(e,n){const r=Jt(e);await cn(r,{answer:n})}async joinRoom(e,n,r="Guest User"){const i=Bd(e,n);await Re(i,{displayName:r,joinedAt:Date.now()}),y().logFirebaseOperation("set","joinRoom",`rooms/${e}/members/${n}`)}async leaveRoom(e,n=null,{deleteRoomIfEmpty:r=!0}={}){const i=n||this.currentRoomId;if(!i||!e)return;const s=Bd(i,e),o=$i(i),a=Jt(i);try{await vn(s)}catch(c){y().logFirebaseOperation("leave_room_remove_member",!1,c,{roomId:i,userId:e})}if(r)try{const c=await xt(o),l=c.exists()?c.val():{};(l?Object.keys(l).length:0)===0&&await vn(a).catch(d=>{y().logFirebaseOperation("delete_empty_room",!1,d,{roomId:i})})}catch(c){y().logFirebaseOperation("check_members_after_leave",!1,c,{roomId:i})}(!n||n===this.currentRoomId)&&(this.currentRoomId=null)}async rejectCall(e,n,r="user_rejected"){if(!e||!n)return;const i=Jt(e),s={rejection:{by:n,reason:r,at:Date.now()}};try{await cn(i,s),y().log("ROOM","REJECT_SET",{roomId:e,byUserId:n,reason:r})}catch(o){throw y().log("ROOM","REJECT_SET_FAILED",{roomId:e,byUserId:n,reason:r,error:String(o?.message||o)}),o}}async cancelCall(e,n,r="caller_cancelled"){if(!e||!n)return;const i=Jt(e),s={cancellation:{by:n,reason:r,at:Date.now()}};try{await cn(i,s),y().log("ROOM","CANCEL_SET",{roomId:e,byUserId:n,reason:r})}catch(o){throw y().log("ROOM","CANCEL_SET_FAILED",{roomId:e,byUserId:n,reason:r,error:String(o?.message||o)}),o}}onCallCancelled(e,n){const r=lk(e);nn(r,"value",n,e),y().logFirebaseOperation("on","onCallCancelled",`rooms/${e}/cancellation`,{event:"value"})}onMemberJoined(e,n){const r=$i(e);nn(r,"child_added",n,e),y().logFirebaseOperation("on","onMemberJoined",`rooms/${e}/members`,{event:"child_added"})}onMemberLeft(e,n){const r=$i(e);nn(r,"child_removed",n,e),y().logFirebaseOperation("on","onMemberLeft",`rooms/${e}/members`,{event:"child_removed"})}onIncomingCall(e,n,r){const i=$i(e),s=a=>{r("join",a.key,a.val())},o=a=>{r("leave",a.key,a.val())};return nn(i,"child_added",s,e,n),nn(i,"child_removed",o,e,n),()=>ck(n,e)}get roomId(){return this.currentRoomId}}const J=new rP;class iP{constructor(e,{loop:n=!1,volume:r=.5}={}){this.src=e,this.audio=new Audio(e),this.audio.loop=n,this.audio.volume=Math.max(0,Math.min(1,r)),this.isPlaying=!1,this.audio.onerror=i=>{console.error(`[AudioPlayer] Failed to load audio: ${e}`,i),this.isPlaying=!1},this.audio.onplay=()=>{this.isPlaying=!0},this.audio.onpause=()=>{this.isPlaying=!1},this.audio.onended=()=>{this.isPlaying=!1}}async play(){if(!this.audio)return!1;if(this.isPlaying)return!0;try{return await this.audio.play(),this.isPlaying=!0,!0}catch(e){return e.name==="NotAllowedError"?console.warn("[AudioPlayer] Autoplay blocked - user interaction required first",{src:this.src}):e.name==="NotSupportedError"?console.error("[AudioPlayer] Audio format not supported",{src:this.src}):console.error("[AudioPlayer] Playback error:",e),this.isPlaying=!1,!1}}stop(){this.audio&&(this.audio.pause(),this.audio.currentTime=0,this.isPlaying=!1)}pause(){this.audio&&(this.audio.pause(),this.isPlaying=!1)}setVolume(e){this.audio&&(this.audio.volume=Math.max(0,Math.min(1,e)))}getVolume(){return this.audio?.volume??0}dispose(){this.stop(),this.audio&&(this.audio.onerror=null,this.audio.onplay=null,this.audio.onpause=null,this.audio.onended=null,this.audio.src="",this.audio=null),this.isPlaying=!1}}class sP{constructor({incomingSrc:e,outgoingSrc:n,volume:r}={}){this.incomingSrc=e??"/sounds/incoming.mp3",this.outgoingSrc=n??"/sounds/outgoing.mp3",this.defaultVolume=r??.7,this.currentPlayer=null,this.currentType=null}configure({incomingSrc:e,outgoingSrc:n,volume:r}={}){e!==void 0&&(this.incomingSrc=e),n!==void 0&&(this.outgoingSrc=n),r!==void 0&&(this.defaultVolume=r)}setIncomingRingtone(e){this.incomingSrc=e}setOutgoingRingtone(e){this.outgoingSrc=e}setVolume(e){this.defaultVolume=Math.max(0,Math.min(1,e))}async playIncoming(){return this._play("incoming",this.incomingSrc)}async playOutgoing(){return this._play("outgoing",this.outgoingSrc)}async _play(e,n){this.stop();try{this.currentPlayer=new iP(n,{loop:!0,volume:this.defaultVolume}),this.currentType=e;const r=await this.currentPlayer.play();return r?console.log(`[Ringtone] Playing ${e} ringtone`):(console.warn(`[Ringtone] Failed to start ${e} ringtone (likely autoplay blocked)`),this.currentPlayer?.dispose(),this.currentPlayer=null,this.currentType=null),r}catch(r){return console.error(`[Ringtone] Error playing ${e} ringtone:`,r),this.currentPlayer?.dispose(),this.currentPlayer=null,this.currentType=null,!1}}stop(){this.currentPlayer&&(console.log(`[Ringtone] Stopping ${this.currentType} ringtone`),this.currentPlayer.stop(),this.currentPlayer.dispose(),this.currentPlayer=null,this.currentType=null)}isPlaying(){return this.currentPlayer?.isPlaying??!1}getCurrentType(){return this.currentType}}const jn=new sP,Ms=3e4;let it=null,Dr=null;async function oP(t,e=null){const n=fe(),r=ee();if(!r)return;const i=ll(r);await Re(i,{roomId:t,targetContactName:e,initiatedAt:Date.now(),callerUserId:n})}async function xs(){const t=ee();if(!t)return;const e=ll(t);await vn(e).catch(()=>{})}async function wm(t,e){if(!t)return!1;try{const n=ll(t),r=await xt(n);if(!r.exists())return!1;const i=r.val();return i.roomId!==e?!1:Date.now()-i.initiatedAt<Ms}catch(n){return console.warn("Failed to check outgoing call freshness",n),!1}}async function bm(t){if(!t)return!1;try{const e=N(M,`rooms/${t}/createdAt`),n=await xt(e);if(!n.exists())return!1;const r=n.val();return typeof r!="number"?!1:Date.now()-r<Ms}catch(e){return console.warn("Failed to check room freshness",e),!1}}async function Sm(t,e,n){const r=y(),i=Date.now();Ft(),await oP(t,e);const s=document.createElement("div");s.id="calling-modal",s.style.cssText=`
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
  `;const u=async()=>{r.logCallingUILifecycle("CANCEL",t,{contactName:e,reason:"user_cancelled",duration:Date.now()-i});try{await Promise.all([xs(),J.cancelCall(t,fe(),"caller_cancelled"),J.leaveRoom(fe(),t)])}catch(d){r.log("ROOM","CALLER_CANCELLED_CLEANUP_FAIL",{roomId:t,error:String(d)})}jn.stop(),Ft()};l.onclick=u,o.appendChild(a),o.appendChild(c),o.appendChild(l),s.appendChild(o),document.body.appendChild(s),s.dataset.roomId=t,it=s,jn.playOutgoing(),Dr=setTimeout(async()=>{r.logCallingUILifecycle("TIMEOUT",t,{contactName:e,reason:"auto_timeout",duration:Date.now()-i,timeoutMs:Ms});try{await Promise.all([xs(),J.cancelCall(t,fe(),"auto_timeout"),J.leaveRoom(fe(),t)])}catch(d){r.log("ROOM","CALLER_TIMEOUT_CLEANUP_FAIL",{roomId:t,error:String(d)})}jn.stop(),Ft()},Ms)}function Ft(){if(jn.stop(),it){const t=it.dataset?.roomId||"unknown";y().logCallingUILifecycle("HIDE",t,{reason:"hide_called",hadTimeout:!!Dr,timestamp:Date.now()})}Dr&&(clearTimeout(Dr),Dr=null),it&&(it.remove(),it=null)}async function Fl(){if(it){const t=it.dataset?.roomId||"unknown";y().logCallingUILifecycle("ANSWERED",t,{reason:"call_answered",timestamp:Date.now()})}await xs(),Ft()}async function aP(t="user_rejected"){const e=y(),n=it?.dataset?.roomId||"unknown";e.logCallingUILifecycle("REJECTED",n,{reason:t,timestamp:Date.now()}),await xs(),Ft()}const cP=Object.freeze(Object.defineProperty({__proto__:null,hideCallingUI:Ft,isOutgoingCallFresh:wm,isRoomCallFresh:bm,onCallAnswered:Fl,onCallRejected:aP,showCallingUI:Sm},Symbol.toStringTag,{value:"Module"}));let zn=null;function Ul(t,e={}){return new Promise(n=>{const r=document.createElement("dialog");r.innerHTML=`
      <p>${t}</p>
      <div class="confirm-dialog-actions">
        <button data-action="cancel">Cancel</button>
        <button data-action="confirm" autofocus>Confirm</button>
      </div>
    `,r.classList.add("confirm-dialog");const i=r.querySelector('[data-action="confirm"]'),s=r.querySelector('[data-action="cancel"]');if(!i||!s){console.error("dialog element not found!"),n(!1);return}let o=null;function a(c){o&&clearTimeout(o),r.close(),r.remove(),zn===a&&(zn=null),n(c)}i.addEventListener("click",()=>{a(!0)}),s.addEventListener("click",()=>{a(!1)}),r.addEventListener("cancel",()=>a(!1)),document.body.appendChild(r),r.showModal(),zn=a,e.autoRemoveSeconds&&typeof e.autoRemoveSeconds=="number"&&e.autoRemoveSeconds>0&&(o=setTimeout(()=>{a(!1)},e.autoRemoveSeconds*1e3))})}function lP(){if(typeof zn=="function"){try{zn(!1)}catch{}return zn=null,!0}return!1}const uP=Object.freeze(Object.defineProperty({__proto__:null,default:Ul,dismissActiveConfirmDialog:lP},Symbol.toStringTag,{value:"Module"})),Ln=new Map;function vo(t,e){return[t,e].sort().join("_")}const ah=100;async function dP(t,e){const n=ee();if(!n){console.warn("Cannot send message: not logged in");return}const i=Zg()?.displayName||"Guest User",s=vo(n,t),o=Ts(N(M,`conversations/${s}/messages`));await Re(o,{text:e,from:n,fromName:i,sentAt:ln(),read:!1}),hP(s).catch(a=>{console.warn("Failed to cleanup old messages:",a)})}async function hP(t){const{get:e,remove:n}=await Ae(async()=>{const{get:l,remove:u}=await Promise.resolve().then(()=>tl);return{get:l,remove:u}},void 0),r=N(M,`conversations/${t}/messages`),i=await e(r);if(!i.exists())return;const s=i.val(),o=Object.keys(s).length;if(o<=ah)return;const a=o-ah,c=Object.entries(s).sort((l,u)=>(l[1].sentAt||0)-(u[1].sentAt||0));for(let l=0;l<a;l++){const[u]=c[l];await n(N(M,`conversations/${t}/messages/${u}`))}console.log(`[MESSAGING] Cleaned up ${a} old messages from conversation ${t}`)}function fP(t,e,n){const r=ee();if(!r)return console.warn("Cannot listen to messages: not logged in"),()=>{};const i=vo(r,t),s=N(M,`conversations/${i}/messages`),o=a=>{const c=a.val();if(!c)return;const l=c.from===r;e(c.text,c,l),!l&&!c.read&&(!n||n())&&cn(a.ref,{read:!0}).catch(d=>{console.warn("Failed to mark message as read:",d)})};return co(s,o),()=>{kn(s,"child_added",o)}}async function ch(t){const e=ee();if(!e)return 0;const n=vo(e,t),r=N(M,`conversations/${n}/messages`),{get:i}=await Ae(async()=>{const{get:s}=await Promise.resolve().then(()=>tl);return{get:s}},void 0);try{const s=await i(r);if(!s.exists())return 0;const o=s.val();return Object.values(o).filter(a=>!a.read&&a.from===t).length}catch(s){return console.warn("Failed to get unread count:",s),0}}async function pP(t){const e=ee();if(!e)return;const n=vo(e,t),r=N(M,`conversations/${n}/messages`),{get:i}=await Ae(async()=>{const{get:s}=await Promise.resolve().then(()=>tl);return{get:s}},void 0);try{const s=await i(r);if(!s.exists())return;const o=s.val(),a=[];Object.entries(o).forEach(([c,l])=>{if(!l.read&&l.from===t){const u=N(M,`conversations/${n}/messages/${c}`);a.push(cn(u,{read:!0}))}}),await Promise.all(a)}catch(s){console.warn("Failed to mark messages as read:",s)}}function gP(){return Array.from(Ln.values())[0]}function Fs(t,e,n={}){if(!t||typeof e!="function")throw new Error("closeOnClickOutside: valid element and onClose callback required");const{ignore:r=[],esc:i=!0,events:s=["mousedown","touchstart"]}=n,o=Array.isArray(r)?r.filter(Boolean):[],a=l=>{try{const u=l.target;if(t.contains(u))return;for(const d of o)if(d&&d.contains&&d.contains(u)||d===u)return;e(l)}catch(u){console.error("closeOnClickOutside handler error:",u)}},c=l=>{i&&l.key==="Escape"&&e(l)};return s.forEach(l=>document.addEventListener(l,a,{passive:!0})),i&&document.addEventListener("keydown",c),function(){s.forEach(u=>document.removeEventListener(u,a,{passive:!0})),i&&document.removeEventListener("keydown",c)}}function Cm({parent:t,onToggle:e,icon:n="💬",initialUnreadCount:r=0,id:i=null}={}){if(!t)return console.error("createMessageToggle: parent element is required"),null;if(typeof e!="function")return console.error("createMessageToggle: onToggle callback is required"),null;const s=bl({initialProps:{unreadCount:r},template:`
      <div class="messages-toggle-btn"${i?` id="${i}"`:""}>
        <button onclick="handleToggle">
          ${n}
          <span class="notification-badge">
            \${unreadCount}
          </span>
        </button>
      </div>
    `,handlers:{handleToggle:a=>{a.preventDefault(),a.stopPropagation(),e()}},className:"messages-toggle-container",autoAppend:!1});let o=s.querySelector(".notification-badge");return o&&(o.style.display="none"),s.onPropUpdated("unreadCount",a=>{const c=s.querySelector(".notification-badge");if(c&&(c.style.display=a>0?"flex":"none"),a>0){const l=s.querySelector(".messages-toggle-btn");l&&(l.classList.add("new-message"),setTimeout(()=>{l.classList.remove("new-message")},4e3))}}),t.appendChild(s),{element:s,setUnreadCount(a){s.unreadCount=a},clearBadge(){s.unreadCount=0},cleanup(){s&&s.parentNode&&s.parentNode.removeChild(s),s.dispose()}}}const mP=CSS.supports?.("position-anchor: --msg-toggle")&&CSS.supports?.("right: anchor(right)")&&CSS.supports?.("bottom: anchor(top)");function _P(t){const e=t.getBoundingClientRect();return e.top>=0&&e.left>=0&&e.bottom<=window.innerHeight&&e.right<=window.innerWidth}function yP(t){let e=null,n=null,r=null,i=null,s=null,o=!1;const a=document.querySelector(".top-bar .top-right-menu")||document.querySelector(".top-right-menu"),c=Cm({parent:a,onToggle:()=>$(),icon:"💬",initialUnreadCount:0,id:"main-messages-toggle-btn"}),l=c.element,u=document.createElement("div");if(u.innerHTML=`
    <div id="messages-box" class="messages-box hidden">
      <div id="messages"></div>
      <form id="messages-form">
        <input id="messages-input" placeholder="Type a message...">
        <button type="submit">Send</button>
      </form>
    </div>
  `,document.body.appendChild(u),e=l.querySelector("#main-messages-toggle-btn"),n=u.querySelector("#messages-box"),r=u.querySelector("#messages"),i=u.querySelector("#messages-form"),s=u.querySelector("#messages-input"),!e||!n||!r||!i||!s)return console.error("Messages UI elements not found."),null;function d(){if(!e||!n||n.classList.contains("hidden"))return;const X=e.getBoundingClientRect(),de=n.getBoundingClientRect(),Cr=8;let bo=X.top-de.height-Cr;bo<8&&(bo=X.bottom+Cr);let Tr=X.left+X.width/2-de.width/2;const zl=window.innerWidth-de.width-8;Tr<8&&(Tr=8),Tr>zl&&(Tr=zl),n.style.top=`${Math.round(bo)}px`,n.style.left=`${Math.round(Tr)}px`}function h(){o||(o=!0,window.addEventListener("resize",d,{passive:!0}),window.addEventListener("scroll",d,{passive:!0}),window.addEventListener("orientationchange",d,{passive:!0}))}function f(){o&&(o=!1,window.removeEventListener("resize",d),window.removeEventListener("scroll",d),window.removeEventListener("orientationchange",d))}const p=new MutationObserver(X=>{X.forEach(de=>{if(de.type==="attributes"&&de.attributeName==="class"&&!n.classList.contains("hidden")){c.clearBadge();const Cr=gP();Cr?.toggle&&Cr.toggle.clearBadge()}})});p.observe(n,{attributes:!0});function _(){return!n.classList.contains("hidden")}function m(){return document.activeElement===s}function T(){m()||s.focus()}function V(){m()&&s.blur()}function $(){n.classList.toggle("hidden"),_()?(s.focus(),mP?requestAnimationFrame(()=>{_P(n)||(d(),h())}):(d(),h())):(s.blur(),f(),n.style.top="",n.style.left="",n.style.bottom="",n.style.right="")}Fs(n,()=>{E(n),f(),n.style.top="",n.style.left="",n.style.bottom="",n.style.right=""},{ignore:[l],esc:!0});function w(){A(l)}function ue(){E(l)}function Fe(X){const de=document.createElement("p");de.textContent=X,X.startsWith("You:")?de.style.textAlign="right":X.startsWith("Partner:")&&(de.style.textAlign="left"),r.appendChild(de),r.scrollTop=r.scrollHeight}function Je(X){if(Fe(`Partner: ${X}`),Cl(n)){const de=c.element.unreadCount||0;c.setUnreadCount(de+1)}}i.addEventListener("submit",X=>{X.preventDefault();const de=s.value.trim();de&&(t(de),s.value="")});const Ee=X=>{(X.key==="m"||X.key==="M")&&!_()&&!m()&&(X.preventDefault(),$())};document.addEventListener("keydown",Ee);function Rn(){c&&c.cleanup(),f(),p.disconnect(),document.removeEventListener("keydown",Ee),u&&u.parentNode&&u.parentNode.removeChild(u)}return{appendChatMessage:Fe,receiveMessage:Je,isMessagesUIOpen:_,toggleMessages:$,showMessagesToggle:w,hideMessagesToggle:ue,isMessageInputFocused:m,focusMessageInput:T,unfocusMessageInput:V,cleanup:Rn}}const Jo=new Map,Xo=new Map,Yr=new Map;async function lh(t,e,n){const r=ee();if(r){const i=N(M,`users/${r}/contacts/${t}`);await Re(i,{contactId:t,contactName:e,roomId:n,savedAt:Date.now()});return}try{const i=localStorage.getItem("contacts")||"{}",s=JSON.parse(i);s[t]={contactId:t,contactName:e,roomId:n,savedAt:Date.now()},localStorage.setItem("contacts",JSON.stringify(s))}catch(i){console.warn("Failed to save contact to localStorage",i)}}async function ui(){const t=ee();if(t)try{const e=N(M,`users/${t}/contacts`),n=await xt(e);return n.exists()?n.val():{}}catch(e){return console.warn("Failed to read contacts from RTDB",e),{}}try{const e=localStorage.getItem("contacts")||"{}";return JSON.parse(e)}catch(e){return console.warn("Failed to read contacts from localStorage",e),{}}}async function EP(t,e){if(!t)return e||"Unknown";try{const n=await ui();for(const r of Object.values(n||{}))if(r?.roomId===t)return r.contactName||r.contactId||e}catch(n){console.warn("Failed to resolve caller name",n)}return e||"Unknown"}async function vP(t,e,n){if(!t||!e)return;const i=(await ui())?.[t];if(i){i.roomId!==e&&(await lh(t,i.contactName,e),await di(n)),console.log(`[CONTACT SAVE] Re-attaching listener for existing contact room: ${e}`),sr(e);return}if(!await Ul("Save contact?",{autoRemoveSeconds:15}))return;const o=window.prompt("Enter a name for this contact:",t)||t;await lh(t,o,e),console.log(`[CONTACT SAVE] Attaching listener for saved contact room: ${e}`),sr(e),await di(n)}async function di(t){if(!t)return;const e=await ui(),n=Object.keys(e);let r=t.querySelector(".contacts-container");if(r||(r=document.createElement("div"),r.className="contacts-container",t.appendChild(r)),n.length===0){r.innerHTML="<p>No saved contacts yet.</p>",E(r);return}A(r),r.innerHTML=`
    <h3>Saved Contacts</h3>
    <div class="contacts-list">
      ${n.map(i=>{const s=e[i];return`
            <div class="contact-entry">
            <div class="contact-msg-toggle-container">
              <span
                class="contact-message-btn-placeholder"
                data-contact-id="${i}"
                data-contact-name="${s.contactName}"
              ></span>
            </div>
              <span
                class="contact-name"
                data-room-id="${s.roomId}"
                data-contact-name="${s.contactName}"
                data-contact-id="${i}"
                title="Call ${s.contactName}"
              >
                <span class="presence-indicator" data-contact-id="${i}"></span>
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
  `,wP(r,t),bP(n),await SP(r,n)}function wP(t,e){t.querySelectorAll(".contact-message-btn").forEach(n=>{n.onclick=r=>{r.stopPropagation();const i=n.getAttribute("data-contact-id"),s=n.getAttribute("data-contact-name");i&&Tm(i,s)}}),t.querySelectorAll(".contact-name").forEach(n=>{n.onclick=async()=>{const r=n.getAttribute("data-room-id"),i=n.getAttribute("data-contact-name");r&&(console.log(`[CONTACT CALL] Ensuring listener is active for room: ${r}`),sr(r),await Sm(r,i),wo(r,{forceInitiator:!0}).catch(s=>{console.warn("Failed to call contact:",s),Ft()}))}}),t.querySelectorAll(".contact-delete-btn").forEach(n=>{n.onclick=async()=>{const r=n.getAttribute("data-contact-id");!r||!window.confirm("Delete this contact?")||(await CP(r),await di(e))}})}function Tm(t,e){if(!ee()){alert("Please sign in to send messages");return}if(Ln.has(t)){Ln.get(t).messagesUI.toggleMessages();return}Ln.forEach((o,a)=>{console.log(`[MESSAGING] Closing previous session with ${o.contactName}`),o.unsubscribe(),o.messagesUI.cleanup(),Ln.delete(a)});const r=yP(o=>{dP(t,o)}),i=fP(t,(o,a,c)=>{c?r.appendChatMessage(`You: ${o}`):r.receiveMessage(o)},()=>r.isMessagesUIOpen());Ln.set(t,{messagesUI:r,unsubscribe:i,contactId:t,contactName:e,toggle:Yr.get(t)}),r.showMessagesToggle(),r.toggleMessages(),pP(t).catch(o=>{console.warn("Failed to mark messages as read:",o)});const s=Yr.get(t);s&&s.clearBadge(),console.log(`[MESSAGING] Opened messaging session with ${e}`)}function bP(t){Jo.forEach(({ref:e,callback:n})=>{kn(e,"value",n)}),Jo.clear(),ee()&&t.forEach(e=>{const n=N(M,`users/${e}/presence`),r=document.querySelector(`.presence-indicator[data-contact-id="${e}"]`);if(!r)return;const i=s=>{const a=s.val()?.state==="online";r.style.backgroundColor=a?"#00d26a":"#444",r.title=a?"Online":"Offline"};el(n,i),Jo.set(e,{ref:n,callback:i})})}let Wi=!1,Pn=null;async function SP(t,e){if(ee()){if(Wi){console.warn("[CONTACTS] Toggle replacement already in progress, skipping");return}Wi=!0,Pn&&clearTimeout(Pn),Pn=setTimeout(()=>{console.warn("[CONTACTS] Toggle replacement timeout - forcing flag reset"),Wi=!1},5e3);try{Yr.forEach(r=>{r.cleanup()}),Yr.clear(),Xo.forEach(r=>{r()}),Xo.clear();const n=ee();for(const r of e){const i=t.querySelector(`.contact-message-btn-placeholder[data-contact-id="${r}"]`);if(!i){console.warn(`[CONTACTS] No placeholder found for contact ${r}`);continue}const s=i.getAttribute("data-contact-name"),o=i.parentElement;if(!o){console.error(`[CONTACTS] No parent element for contact ${r}`);continue}let a=0;try{a=await ch(r)}catch(f){console.warn(`[CONTACTS] Failed to get unread count for ${r}:`,f)}i.remove();const c=Cm({parent:o,onToggle:()=>Tm(r,s),icon:"💬",initialUnreadCount:a});if(!c){console.error(`[CONTACTS] Failed to create toggle for contact ${r}`);continue}Yr.set(r,c),c.setUnreadCount(a);const l=[n,r].sort().join("_"),u=N(M,`conversations/${l}/messages`),h=co(u,async f=>{const p=f.val();if(p&&p.from===r&&!p.read){const _=await ch(r);c.setUnreadCount(_)}});Xo.set(r,h)}}finally{Pn&&(clearTimeout(Pn),Pn=null),Wi=!1}}}async function CP(t){const e=ee();if(e){try{await vn(N(M,`users/${e}/contacts/${t}`))}catch(n){console.warn("Failed to delete contact from RTDB",n)}return}try{const n=localStorage.getItem("contacts")||"{}",r=JSON.parse(n);r[t]&&(delete r[t],localStorage.setItem("contacts",JSON.stringify(r)))}catch(n){console.warn("Failed to delete contact from localStorage",n)}}function TP(){const t=document.querySelector("link[rel~='icon']");return t?t.href:"/favicon.ico"}class IP{constructor(){this.originalTitle=document.title,this.originalFavicon=TP(),this.titleFlashInterval=null,this.isFlashing=!1,this.wakeLock=null,this.setupVisibilityListener()}setupVisibilityListener(){document.addEventListener("visibilitychange",()=>{!document.hidden&&this.isFlashing&&this.stopTitleFlashing()})}startCallIndicators(e){console.log(`[VisibilityManager] Starting call indicators for: ${e}`),this.startTitleFlashing(e),this.setFavicon("/icons/phone-ringing.svg"),this.setBadge(1),this.requestWakeLock()}stopCallIndicators(){console.log("[VisibilityManager] Stopping call indicators"),this.stopTitleFlashing(),this.restoreFavicon(),this.clearBadge(),this.releaseWakeLock()}startTitleFlashing(e){this.stopTitleFlashing();let n=!0;this.isFlashing=!0,document.title=`📞 Call from ${e}!`,this.titleFlashInterval=setInterval(()=>{this.isFlashing&&(document.title=n?`📞 Call from ${e}!`:this.originalTitle,n=!n)},1e3)}stopTitleFlashing(){this.titleFlashInterval&&(clearInterval(this.titleFlashInterval),this.titleFlashInterval=null),this.isFlashing=!1,document.title=this.originalTitle}setFavicon(e){const n=document.querySelector("link[rel~='icon']");n&&(n.href=e,console.log(`[VisibilityManager] Favicon changed to: ${e}`))}restoreFavicon(){this.setFavicon(this.originalFavicon)}setBadge(e){"setAppBadge"in navigator&&navigator.setAppBadge(e).then(()=>{console.log(`[VisibilityManager] Badge set to: ${e}`)}).catch(n=>{console.warn("[VisibilityManager] Badge not supported:",n)})}clearBadge(){"clearAppBadge"in navigator&&navigator.clearAppBadge().then(()=>{console.log("[VisibilityManager] Badge cleared")}).catch(e=>{console.warn("[VisibilityManager] Badge clear failed:",e)})}async requestWakeLock(){if("wakeLock"in navigator)try{this.wakeLock=await navigator.wakeLock.request("screen"),console.log("[VisibilityManager] Wake lock active"),this.wakeLock.addEventListener("release",()=>{console.log("[VisibilityManager] Wake lock released"),this.wakeLock=null},{once:!0})}catch(e){console.warn("[VisibilityManager] Wake lock failed:",e)}}releaseWakeLock(){if(this.wakeLock){const e=this.wakeLock;this.wakeLock=null,e.release().then(()=>{console.log("[VisibilityManager] Wake lock released manually")}).catch(n=>{console.warn("[VisibilityManager] Wake lock release failed:",n)})}}}const uh=new IP,hi=new WeakMap;function $l(t,e,n){if(!t||!n)throw new Error("setupIceCandidates: pc and roomId are required");if(hi.has(t)||hi.set(t,[]),e==="initiator")dh(t,"offerCandidates",n),hh(t,"answerCandidates",n);else if(e==="joiner")dh(t,"answerCandidates",n),hh(t,"offerCandidates",n);else throw new Error(`Invalid role: ${e} specified for ICE candidate setup.`)}function dh(t,e,n){t.onicecandidate=r=>{if(r.candidate){const i=Ts(e==="offerCandidates"?hg(n):fg(n));Re(i,r.candidate.toJSON())}}}function hh(t,e,n){const r=e==="offerCandidates"?hg(n):fg(n);let i=!1;const s=()=>{if(i)return;i=!0;const a=()=>{t.remoteDescription&&(Bl(t),t.removeEventListener("signalingstatechange",a))};t.addEventListener("signalingstatechange",a)};nn(r,"child_added",a=>{const c=a.val();if(!(!t||t.signalingState==="closed")&&c)if(t.remoteDescription)try{t.addIceCandidate(new RTCIceCandidate(c))}catch{}else{const l=hi.get(t);l&&(l.push(c),l.length===1&&s())}},n)}function Bl(t){if(!t||!hi.has(t))return;const e=hi.get(t);if(e.length!==0){B(`🔄 Draining ${e.length} queued ICE candidate(s)`);for(const n of e)try{t.addIceCandidate(new RTCIceCandidate(n)).catch(r=>{B("Error adding queued ICE candidate:",r)})}catch{}e.length=0}}const kP=Object.freeze(Object.defineProperty({__proto__:null,drainIceCandidateQueue:Bl,setupIceCandidates:$l},Symbol.toStringTag,{value:"Module"}));let Xe=null,fh=null;function Im(t){fh=t,t.onconnectionstatechange=()=>{B("onconnectionstatechange:",t.connectionState),t.connectionState==="connected"?(Ml(),Fl().catch(e=>console.warn("Failed to clear calling state on connect:",e)),Xe&&(clearTimeout(Xe),Xe=null)):t.connectionState==="disconnected"?(Xe&&clearTimeout(Xe),Xe=setTimeout(()=>{t===fh&&t.connectionState==="disconnected"&&le.cleanupCall({reason:"connection_lost"}),Xe=null},3e3)):t.connectionState==="failed"&&(go(),Xe&&(clearTimeout(Xe),Xe=null),le.cleanupCall({reason:"connection_failed"}))},t.addEventListener("iceconnectionstatechange",e=>{B("ICE iceconnectionstatechange:",t.iceConnectionState),t.iceConnectionState==="failed"&&(console.warn("ICE connection failed, restarting ICE..."),t.restartIce())})}const Hl={iceServers:[{urls:"stun:stun.l.google.com:19302"}]},Qo=new WeakMap;function km(t,e,n){Qo.has(t)||Qo.set(t,{});const r=Qo.get(t),i=e==="offer"?"lastOffer":"lastAnswer";return r[i]===n?!0:(r[i]=n,!1)}function Rm(t,e){return t?e==="offer"?t.signalingState==="stable":t.signalingState==="have-local-offer"||t.signalingState==="stable":!1}function Wl(t,e){e.getTracks().forEach(n=>{t.addTrack(n,e)})}async function Am(t){const e=await t.createOffer();return await t.setLocalDescription(e),e}async function Pm(t){const e=await t.createAnswer();return await t.setLocalDescription(e),e}async function Nm(t,e,n){if(km(t,e.type,e.sdp))return console.debug(`Ignoring duplicate ${e.type} - already processed`),!1;if(!Rm(t,e.type))return console.warn(`Ignoring ${e.type} - unexpected signaling state:`,t.signalingState),!1;try{return await t.setRemoteDescription(new RTCSessionDescription(e)),n(t),console.debug(`Remote description set (${e.type})`),!0}catch(r){return console.error(`Failed to set remote description (${e.type}):`,r),!1}}function Lm(){return Math.random().toString(36).substring(2,9)}const RP=Object.freeze(Object.defineProperty({__proto__:null,addLocalTracks:Wl,createAnswer:Pm,createOffer:Am,generateRoomId:Lm,isDuplicateSdp:km,isValidSignalingState:Rm,rtcConfig:Hl,setRemoteDescription:Nm},Symbol.toStringTag,{value:"Module"}));async function AP({localStream:t,remoteVideoEl:e,mutePartnerBtn:n,setupRemoteStream:r,setupWatchSync:i,targetRoomId:s=null}){if(!t)return{success:!1};const o=new RTCPeerConnection(Hl),a="initiator",c=s||Lm(),l=fe();Wl(o,t);const u=null,d=null;if(!r(o,e,n))return console.error("Error setting up remote stream"),o.close(),{success:!1};$l(o,a,c),Im(o);const f=await Am(o);await J.createNewRoom(f,l,c),i(c,a,l);const p=`${window.location.origin}${window.location.pathname}?room=${c}`;return{success:!0,pc:o,roomId:c,roomLink:p,dataChannel:u,messagesUI:d,role:a}}async function PP({roomId:t,localStream:e,remoteVideoEl:n,mutePartnerBtn:r,setupRemoteStream:i,setupWatchSync:s,onMessagesUIReady:o=null}){if(!e)return{success:!1};if(!t)return{success:!1};const a=await J.checkRoomStatus(t);if(!a.exists)return{success:!1};if(!a.hasMembers)return{success:!1};let c;try{c=await J.getRoomData(t)}catch(T){return B("Error: "+T.message),{success:!1}}const l=c.offer;if(!l)return{success:!1};const u=new RTCPeerConnection(Hl),d="joiner",h=fe();Wl(u,e);const f=null,p=null;if(!i(u,n,r))return console.error("Error setting up remote stream for joiner"),u.close(),{success:!1};$l(u,d,t),Im(u),await Nm(u,l,Bl);const m=await Pm(u);try{await J.saveAnswer(t,m)}catch(T){return console.error("Failed to save answer to Firebase:",T),u.close(),{success:!1}}return s(t,d,h),await J.joinRoom(t,h),{success:!0,pc:u,roomId:t,dataChannel:f,messagesUI:p,role:d}}class NP{constructor(){this.listeners=new Map}on(e,n){this.listeners.has(e)||this.listeners.set(e,new Set),this.listeners.get(e).add(n)}off(e,n){this.listeners.has(e)&&this.listeners.get(e).delete(n)}emit(e,n){if(this.listeners.has(e))for(const r of Array.from(this.listeners.get(e)))try{r(n)}catch(i){console.warn("CallController listener error",i)}}}class LP{constructor(){this.emitter=new NP,this.resetState()}resetState(){this.state="idle",this.roomId=null,this.roomLink=null,this.role=null,this.partnerId=null,this.pc=null,this.dataChannel=null,this.messagesUI=null,this.localVideoEl=null,this.remoteVideoEl=null,this.isHangingUp=!1,this.isCleaningUp=!1,this.listeners=new Map}getState(){return{state:this.state,roomId:this.roomId,roomLink:this.roomLink,role:this.role,partnerId:this.partnerId,hasPc:!!this.pc,isHangingUp:this.isHangingUp,isCleaningUp:this.isCleaningUp}}on(e,n){this.emitter.on(e,n)}off(e,n){this.emitter.off(e,n)}setPartnerId(e){this.partnerId=e}setupCancellationListener(e){if(!e)return;const n=N(M,`rooms/${e}/cancellation`);let r=!1;const i=async s=>{const o=s.val();if(o&&!r){r=!0;try{this.remoteVideoEl&&(this.remoteVideoEl.srcObject=null)}catch(a){console.warn("Failed to clear remote video after cancellation",a)}try{this.pc&&this.pc.close()}catch{}try{await this.cleanupCall({reason:o.reason||"remote_cancelled"})}catch(a){console.warn("Failed to trigger CallController cleanup",a)}}};Ki(n,i,e),this.listeners.has("cancellation")||this.listeners.set("cancellation",[]),this.listeners.get("cancellation").push({ref:n,callback:i,roomId:e})}setupAnswerListener(e,n,r){if(!e||!n)return;const i=N(M,`rooms/${e}/answer`),s=async o=>{const a=o.val();if(a){const{setRemoteDescription:c}=await Ae(async()=>{const{setRemoteDescription:l}=await Promise.resolve().then(()=>RP);return{setRemoteDescription:l}},void 0);await c(n,a,r)}};Ki(i,s,e),this.listeners.has("answer")||this.listeners.set("answer",[]),this.listeners.get("answer").push({ref:i,callback:s,roomId:e})}setupRejectionListener(e){if(!e)return;const n=N(M,`rooms/${e}/rejection`);let r=!1;const i=async s=>{const o=s.val();if(o&&!r&&(r=!0,this.pc?.connectionState!=="connected")){try{const{onCallRejected:a}=await Ae(async()=>{const{onCallRejected:c}=await Promise.resolve().then(()=>cP);return{onCallRejected:c}},void 0);await a(o.reason||"user_rejected")}catch{}try{await J.leaveRoom(fe(),e)}catch{}try{this.pc&&this.pc.close()}catch{}}};Ki(n,i,e),this.listeners.has("rejection")||this.listeners.set("rejection",[]),this.listeners.get("rejection").push({ref:n,callback:i,roomId:e})}setupMemberJoinedListener(e){if(!e)return;const n=fe(),r=i=>{i.key!==n&&(this.setPartnerId(i.key),this.emitter.emit("memberJoined",{memberId:i.key,roomId:e}))};J.onMemberJoined(e,r),this.listeners.has("member-joined")||this.listeners.set("member-joined",[]),this.listeners.get("member-joined").push({callback:r,roomId:e})}setupMemberLeftListener(e){if(!e)return;const n=fe(),r=i=>{i.key!==n&&this.pc?.connectionState==="connected"&&this.emitter.emit("memberLeft",{memberId:i.key,roomId:e})};J.onMemberLeft(e,r),this.listeners.has("member-left")||this.listeners.set("member-left",[]),this.listeners.get("member-left").push({callback:r,roomId:e})}removeTrackedListeners(){try{for(const[e,n]of this.listeners.entries())for(const r of n)try{r.ref&&kn(r.ref,"value",r.callback)}catch(i){console.warn(`Failed to remove ${e} listener`,i)}}catch(e){console.warn("Failed to remove tracked listeners",e)}finally{this.listeners.clear()}if(this.roomId)try{uo(this.roomId)}catch(e){console.warn("Failed to remove RTDB listeners for room",e)}}async createCall(e={}){this.state="creating";try{e.localVideoEl&&(this.localVideoEl=e.localVideoEl),e.remoteVideoEl&&(this.remoteVideoEl=e.remoteVideoEl);const n=await AP(e);if(!n||!n.success)return this.state="idle",this.emitter.emit("error",{phase:"createCall",detail:n}),this.emitCallFailed("createCall",n),n;this.pc=n.pc,this.roomId=n.roomId,this.roomLink=n.roomLink||null,this.role=n.role||"initiator",this.dataChannel=n.dataChannel||null,this.messagesUI=n.messagesUI||null,this.state="waiting";const{drainIceCandidateQueue:r}=await Ae(async()=>{const{drainIceCandidateQueue:i}=await Promise.resolve().then(()=>kP);return{drainIceCandidateQueue:i}},void 0);return this.setupAnswerListener(this.roomId,this.pc,r),this.setupCancellationListener(this.roomId),this.setupRejectionListener(this.roomId),this.setupMemberJoinedListener(this.roomId),this.setupMemberLeftListener(this.roomId),this.emitter.emit("created",{roomId:this.roomId,roomLink:this.roomLink,role:this.role}),n}catch(n){throw this.state="idle",this.emitter.emit("error",{phase:"createCall",error:n}),this.emitCallFailed("createCall",n),n}}async answerCall(e={}){this.state="joining";try{e.localVideoEl&&(this.localVideoEl=e.localVideoEl),e.remoteVideoEl&&(this.remoteVideoEl=e.remoteVideoEl);const r=await PP({...e,onMessagesUIReady:i=>{this.messagesUI=i}});return!r||!r.success?(this.state="idle",this.emitter.emit("error",{phase:"answerCall",detail:r}),this.emitCallFailed("answerCall",r),r):(this.pc=r.pc,this.roomId=r.roomId,this.role=r.role||"joiner",this.dataChannel=r.dataChannel||null,!this.messagesUI&&r.messagesUI&&(this.messagesUI=r.messagesUI),this.state="connected",this.setupCancellationListener(this.roomId),this.setupMemberJoinedListener(this.roomId),this.setupMemberLeftListener(this.roomId),this.emitter.emit("answered",{roomId:this.roomId,role:this.role}),r)}catch(n){throw this.state="idle",this.emitter.emit("error",{phase:"answerCall",error:n}),this.emitCallFailed("answerCall",n),n}}async hangUp({emitCancel:e=!0,reason:n="user_hung_up"}={}){if(!this.isHangingUp){this.isHangingUp=!0;try{if(e&&this.roomId)try{await J.cancelCall(this.roomId,fe(),n)}catch(r){console.warn("CallController: cancelCall failed (non-fatal)",r)}await this.cleanupCall({reason:n}),this.emitter.emit("hangup",{roomId:this.roomId,reason:n})}catch(r){throw this.emitter.emit("error",{phase:"hangUp",error:r}),r}finally{this.isHangingUp=!1}}}isRemoteHangup(e){return e?["remote","cancelled","partner_disconnected","connection_failed"].some(r=>e.includes(r)):!1}emitCallFailed(e,n){this.emitter.emit("callFailed",{phase:e,error:n?.message||n?.error||n||"Unknown error"})}async cleanupCall({reason:e}={}){if(!this.isCleaningUp){this.isCleaningUp=!0;try{const n=this.roomId,r=this.partnerId;this.removeTrackedListeners();try{await J.leaveRoom(fe(),this.roomId)}catch{}try{if(this.pc){try{this.pc.close()}catch{}this.pc=null}}catch{}try{this.remoteVideoEl&&(this.remoteVideoEl.srcObject=null)}catch(i){console.warn("CallController: failed to clear remote video",i)}try{this.localVideoEl&&(this.localVideoEl.srcObject=null)}catch(i){console.warn("CallController: failed to clear local video",i)}try{const{cleanupLocalStream:i}=await Ae(async()=>{const{cleanupLocalStream:s}=await Promise.resolve().then(()=>tP);return{cleanupLocalStream:s}},void 0);i()}catch(i){console.warn("CallController: failed to cleanup local stream",i)}try{const{resetLocalStreamInitFlag:i}=await Ae(async()=>{const{resetLocalStreamInitFlag:s}=await Promise.resolve().then(()=>gN);return{resetLocalStreamInitFlag:s}},void 0);i()}catch{}if(this.isRemoteHangup(e)&&this.emitter.emit("remoteHangup",{roomId:n,partnerId:r,reason:e}),this.messagesUI&&this.messagesUI.cleanup)try{this.messagesUI.cleanup()}catch(i){console.warn("CallController: failed to cleanup messages UI",i)}this.resetState(),this.emitter.emit("cleanup",{roomId:n,partnerId:r,reason:e})}catch(n){throw this.emitter.emit("error",{phase:"cleanupCall",error:n}),n}finally{this.isCleaningUp=!1}}}}const le=new LP,Ja={default:{echoCancellation:!0,noiseSuppression:!0,autoGainControl:!0},withVoiceIsolationIfSupported:{echoCancellation:!0,noiseSuppression:!0,autoGainControl:!0,voiceIsolation:!0,restrictOwnAudio:!0,googHighpassFilter:!0,googTypingNoiseDetection:!0,highpassFilter:!0,typingNoiseDetection:!0}};function Om(){const t=navigator.mediaDevices.getSupportedConstraints();return["voiceIsolation","highpassFilter","typingNoiseDetection"].every(r=>t[r])?Ja.withVoiceIsolationIfSupported:Ja.default}const OP=()=>Ja.default,DP={desktop:{landscape:{width:{ideal:1920},height:{ideal:1080},frameRate:{min:10,ideal:30},aspectRatio:{ideal:16/9}},portrait:{width:{ideal:1080},height:{ideal:1920},frameRate:{min:10,ideal:30},aspectRatio:{ideal:9/16}}},mobile:{portrait:{width:{ideal:1080},height:{ideal:1920},aspectRatio:{ideal:9/16},frameRate:{ideal:30}},landscape:{width:{ideal:1920},height:{ideal:1080},aspectRatio:{ideal:16/9},frameRate:{ideal:30}}}},MP=()=>window.screen?.orientation?.type?.includes("portrait")||window.orientation===0||window.orientation===180;function Vl(t){const e=MP()?"portrait":"landscape",r=/Mobi|Android/i.test(navigator.userAgent)?"mobile":"desktop",i=DP[r][e];return{facingMode:t,...i}}function xP(){return!!(navigator.mediaDevices&&navigator.mediaDevices.enumerateDevices)}async function FP(){return xP()?(await navigator.mediaDevices.enumerateDevices()).filter(e=>e.kind==="videoinput"):[]}async function UP(){const t=await FP();let e=!1,n=!1;return t.forEach(r=>{const i=r.label.toLowerCase();(i.includes("front")||i.includes("user"))&&(e=!0),(i.includes("back")||i.includes("rear")||i.includes("environment"))&&(n=!0)}),e&&n}async function $P({localStream:t,localVideo:e,currentFacingMode:n,peerConnection:r=null}){if(!t||!e)return console.error("switchCamera: missing localStream or localVideo"),null;const i=n==="user"?"environment":"user";try{const s=await navigator.mediaDevices.getUserMedia({video:Vl(i),audio:Om()}),o=s.getVideoTracks()[0],a=s.getAudioTracks()[0],c=t.getVideoTracks()[0],l=c?c.enabled:!0,u=t.getAudioTracks()[0],d=u?!u.enabled:!1;if(o&&(o.enabled=l),a&&(a.enabled=!d),t.getTracks().forEach(h=>h.stop()),r){const h=r.getSenders().find(p=>p.track&&p.track.kind==="video");h&&await h.replaceTrack(o);const f=r.getSenders().find(p=>p.track&&p.track.kind==="audio");f&&a&&await f.replaceTrack(a)}return e.srcObject=new MediaStream([o].filter(Boolean)),{newStream:s,facingMode:i}}catch(s){return console.error("Failed to switch camera:",s),null}}let Zo=!1,Xt=null,Qt=null;function BP({getLocalStream:t,getFacingMode:e}){return Xt&&Qt&&Xt.removeEventListener("change",Qt),Xt=window.matchMedia("(orientation: portrait)"),Qt=()=>{try{const n=typeof t=="function"?t():null,r=typeof e=="function"?e():"user";HP({localStream:n,currentFacingMode:r})}catch(n){console.error("Orientation handler failed:",n)}},Xt.addEventListener("change",Qt),()=>{Xt&&Qt&&Xt.removeEventListener("change",Qt),Xt=null,Qt=null}}async function HP({localStream:t,currentFacingMode:e}){if(!(Zo||!t?.getVideoTracks()[0])){Zo=!0;try{const n=t.getVideoTracks()[0],r=Vl(e);B("Applying constraints:",r),await n.applyConstraints(r),B("Video constraints updated successfully")}catch(n){console.error("Failed to apply orientation constraints:",n)}finally{Zo=!1}}}let Xa=[];function WP(t,e){const n=e.querySelector("i");n.className=t?"fa fa-microphone-slash":"fa fa-microphone"}function VP({getLocalStream:t,getLocalVideo:e,getRemoteVideo:n,getPeerConnection:r=()=>null,setLocalStream:i=null,micBtn:s,cameraBtn:o,switchCameraBtn:a,mutePartnerBtn:c,fullscreenPartnerBtn:l,remotePipBtn:u}){s&&(s.onclick=()=>{const h=t();if(!h)return;const f=h.getAudioTracks()[0];f&&(f.enabled=!f.enabled,WP(!f.enabled,s))}),o&&(o.onclick=()=>{const h=t();if(!h)return;const f=h.getVideoTracks()[0];if(f){f.enabled=!f.enabled;const p=o.querySelector("i");p.className=f.enabled?"fa fa-video":"fa fa-video-slash"}});const d=BP({getLocalStream:t,getFacingMode:Ya});Xa.push(d),a&&(a.onclick=async()=>{const h=await $P({localStream:t(),localVideo:e(),currentFacingMode:Ya(),peerConnection:r()||null});h?(pm(h.facingMode),console.log("Switched camera to facingMode:",h.facingMode),h.newStream&&typeof i=="function"&&i(h.newStream)):console.error("Camera switch failed.")},(async()=>await UP()?A(a):E(a))()),c&&(c.onclick=()=>{const h=n();if(!h)return;h.muted=!h.muted;const f=c.querySelector("i");f.className=h.muted?"fa fa-volume-mute":"fa fa-volume-up"}),l&&(l.onclick=()=>{const h=n();h.requestFullscreen?h.requestFullscreen():h.webkitRequestFullscreen&&h.webkitRequestFullscreen()}),u&&(u.onclick=async()=>{const h=n();if(h)try{document.pictureInPictureElement?await document.exitPictureInPicture():h.requestPictureInPicture&&await h.requestPictureInPicture()}catch(f){console.error("Picture-in-Picture failed:",f)}})}function jP(){Xa.forEach(t=>t()),Xa=[]}let ea=null,It=null,j=null,U=null,ph=!1,Vi=!1,Qe=[],Qa="",he=-1,Za=[];const zP="AIzaSyBPUjW7ac277WIYTbN4M8dUomK39qRQjhA",GP="https://www.googleapis.com/youtube/v3";async function qP(){if(ph||Vi)return!1;Vi=!0;const{initializeYouTubeElements:t}=await Ae(async()=>{const{initializeYouTubeElements:o}=await Promise.resolve().then(()=>UA);return{initializeYouTubeElements:o}},void 0),e=await t();if(ea=e.searchContainer,It=e.searchBtn,j=e.searchQuery,U=e.searchResults,!ea||!It||!j||!U)return console.error("YouTube search elements not found in DOM"),Vi=!1,!1;const n=o=>/^https?:\/\//i.test(o),r=o=>{(U?.querySelectorAll(".search-result-item")||[]).forEach((c,l)=>{l===o?(c.classList.add("focused"),c.scrollIntoView({block:"nearest"})):c.classList.remove("focused")}),he=o??-1};It.onclick=async()=>{const o=j.value.trim();if(Cl(j)){A(j),j.focus();return}if(!o){es(),E(j);return}if(_h()&&o===Qa)ec(Qe);else if(!n(o))await gh(o);else{await qa({url:o}),E(U),j.value="",E(j),he=-1;return}},ea.addEventListener("keydown",async o=>{const a=U.querySelectorAll(".search-result-item");if(a.length>0&&(o.key==="ArrowDown"||o.key==="ArrowUp")){if(o.key==="ArrowDown"){let c=he+1;c>=a.length&&(c=0),r(c)}else if(o.key==="ArrowUp"){let c=he-1;c<0&&(c=he===-1?0:a.length-1),r(c)}return}if(o.key==="Enter"){if(a.length>0&&he>=0){a[he].click(),E(j),E(U),he=-1;return}const c=j.value.trim();if(c)if(_h()&&c===Qa)ec(Qe);else if(!n(c))await gh(c);else{await qa({url:c}),E(U),he=-1,j.value="",E(j);return}}else o.key==="Escape"&&(KP()?es():j.value?j.value="":E(j))}),j.addEventListener("input",()=>{j.value.trim()===""&&es(),he=-1});const i=Fs(j,()=>E(j),{ignore:[It],esc:!1});Za.push(i);const s=Fs(U,()=>E(U),{ignore:[It],esc:!1});return Za.push(s),Vi=!1,ph=!0,!0}async function gh(t){if(!It||!U){console.error("Search elements not initialized");return}Qe=[],Qa=t,It.disabled=!0,U.innerHTML='<div class="search-loading">Searching YouTube...</div>',A(U);try{const e=await fetch(`${GP}/search?part=snippet&maxResults=10&q=${encodeURIComponent(t)}&type=video&key=${zP}`);if(!e.ok)throw e.status===403?new Error("YouTube API quota exceeded. Please try again later."):e.status===400?new Error("Invalid API key or request."):new Error(`YouTube API error: ${e.status}`);const n=await e.json();if(!n.items||n.items.length===0){mh("No videos found"),Qe=[];return}Qe=n.items.map(r=>({id:r.id.videoId,title:r.snippet.title,thumbnail:r.snippet.thumbnails.medium.url,channel:r.snippet.channelTitle,url:`https://www.youtube.com/watch?v=${r.id.videoId}`})),ec(Qe)}catch(e){console.error("YouTube search failed:",e),mh(e.message||"Search failed. Please try again.")}finally{It.disabled=!1}}function ec(t){if(!U){console.error("Search results element not initialized");return}if(!t||t.length===0){U.innerHTML='<div class="search-no-results">No results found</div>',Qe=[],he=-1;return}U.innerHTML="",t.forEach(n=>{const r=document.createElement("div");r.className="search-result-item",r.innerHTML=`
      <img src="${n.thumbnail}" alt="${n.title}" class="result-thumbnail">
      <div class="search-result-info">
        <div class="search-result-title">${n.title}</div>
        <div class="search-result-channel">${n.channel}</div>
      </div>
    `,r.onclick=async()=>{if(await qa(n),E(U),he=-1,!j){console.error("Search query element not initialized");return}j.value="",E(j)},U.appendChild(r)}),A(U),he=0,U.querySelectorAll(".search-result-item").forEach((n,r)=>{r===he?(n.classList.add("focused"),n.scrollIntoView({block:"nearest"})):n.classList.remove("focused")})}function mh(t){if(Qe=[],he=-1,!U){console.error("Search results element not initialized");return}U.innerHTML=`<div class="search-error">${t}</div>`,A(U)}function es(){Qe=[],he=-1,U&&(U.innerHTML="",E(U))}function YP(){es(),Za.forEach(t=>t())}function KP(){return!Cl(U)}function _h(){return Qe.length>0}function JP({parent:t,manager:e=null,onClick:n=null,hideWhenAllRead:r=!1}={}){let i=e;const s=bl({initialProps:{unreadCount:0,isHidden:!0},template:`
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
    `,handlers:{handleClick:()=>{n?n():i&&i.toggleList()}},className:"notifications-toggle-container",parent:t});let o=s.querySelector(".notification-badge");return o&&(o.style.display="none"),s.onPropUpdated("unreadCount",a=>{const c=s.querySelector(".notification-badge");c&&(c.style.display=a>0?"flex":"none")}),s.show=()=>{s.isHidden=!1,s.style.display="block"},s.hide=()=>{s.isHidden=!0,s.style.display="none"},s.setUnread=a=>{s.unreadCount=a,a>0?s.show():r&&s.hide()},s.setManager=a=>{i=a},s.hide(),s}class XP{constructor(){this.notifications=new Map,this.toggle=null,this.container=null,this.clickOutsideCleanup=null}setToggle(e){this.toggle=e,this.toggle.setManager&&this.toggle.setManager(this),this.createContainer(),this.updateToggle()}createContainer(){this.container||(this.container=document.createElement("div"),this.container.className="notifications-list-container",this.container.style.display="none",document.body.appendChild(this.container))}showList(){this.container&&(this.container.style.display="flex",this.setupClickOutside())}hideList(){this.container&&(this.container.style.display="none",this.cleanupClickOutside())}setupClickOutside(){this.clickOutsideCleanup||(this.clickOutsideCleanup=Fs(this.container,()=>this.hideList(),{ignore:this.toggle?[this.toggle]:[],esc:!0}))}cleanupClickOutside(){this.clickOutsideCleanup&&(this.clickOutsideCleanup(),this.clickOutsideCleanup=null)}toggleList(){this.container&&(this.container.style.display==="none"?this.showList():this.hideList())}isListVisible(){return this.container&&this.container.style.display!=="none"}add(e,n){this.notifications.has(e)&&this.remove(e),this.container||this.createContainer(),n.parentElement===document.body&&n.remove(),this.container.prepend(n),this.notifications.set(e,n),this.updateToggle(),n._originalDispose||(n._originalDispose=n.dispose);const r=n._originalDispose;n.dispose=()=>{r&&r.call(n),n.parentElement&&n.remove(),this.notifications.delete(e),this.updateToggle(),n.dispose=r,delete n._originalDispose}}remove(e){const n=this.notifications.get(e);n&&(n.dispose&&n.dispose(),this.notifications.delete(e),this.updateToggle())}getCount(){return this.notifications.size}has(e){return this.notifications.has(e)}clear(){this.notifications.forEach(e=>{e.dispose&&e.dispose()}),this.notifications.clear(),this.updateToggle()}updateToggle(){this.toggle&&this.toggle.setUnread(this.getCount())}}const QP=new XP;const ZP=async()=>{if(_m())return console.debug("Reusing existing local MediaStream."),Eo();const t=Vl("user"),e=Om();try{const n=await navigator.mediaDevices.getUserMedia({video:t,audio:e});return Ds(n),n}catch(n){if(n.name==="OverconstrainedError"){console.warn(`❌ Constraint failed on property: ${n.constraint}, falling back to basic constraints`);const r=OP(),i=await navigator.mediaDevices.getUserMedia({video:!0,audio:r});return Ds(i),i}throw n}};async function eN(t){const e=await ZP(),n=new MediaStream(e.getVideoTracks());return t.srcObject=n,!0}function tN(t,e,n){return t.ontrack=r=>{B(`REMOTE TRACK RECEIVED: ${r.track.kind}`);const i=yo()?Dl():null;let s;r.streams&&r.streams[0]&&r.streams[0]instanceof MediaStream?s=r.streams[0]:(console.warn("No stream in track event, using fallback track handling"),i?(i.addTrack(r.track),s=i):s=new MediaStream([r.track])),gm(s),e.srcObject=s,i!==s||B(`Added ${r.track.kind} track to existing remote stream`);try{const o=document.getElementById("remote-video-box")||e.parentElement;o&&(o.classList?.remove("hidden"),e.classList?.remove("hidden"),o.style.visibility="visible",o.style.opacity="1",o.style.position="",o.style.left="",o.style.top="",e.style.visibility="visible",e.style.opacity="1")}catch(o){console.warn("Visibility override failed:",o)}},!0}let yh=!1;function nN(t,e){const n=document.createElement("dialog");n.className="copy-link-dialog";const r=document.createElement("div");r.className="copy-link-dialog__content";const i=document.createElement("h2");i.className="copy-link-dialog__title",i.textContent=e.title,r.appendChild(i);const s=document.createElement("div");s.className="copy-link-dialog__input-container";const o=document.createElement("input");o.type="text",o.className="copy-link-dialog__input",o.value=t,o.readOnly=!0,o.setAttribute("aria-label","Link to copy"),s.appendChild(o),r.appendChild(s);const a=document.createElement("div");a.className="copy-link-dialog__buttons";const c=document.createElement("button");c.className="copy-link-dialog__button copy-link-dialog__button--primary",c.textContent=e.buttonText,c.autofocus=!0;const l=document.createElement("button");l.className="copy-link-dialog__button copy-link-dialog__button--secondary",l.textContent=e.cancelText,a.appendChild(c),a.appendChild(l),r.appendChild(a);const u=document.createElement("p");return u.className="copy-link-dialog__feedback",u.setAttribute("aria-live","polite"),r.appendChild(u),n.appendChild(r),{dialog:n,input:o,copyButton:c,cancelButton:l,feedback:u}}function rN(t,e={}){const n={title:"Share this link",buttonText:"Copy",cancelText:"Cancel",successMessage:"✓ Copied to clipboard!",errorMessage:"Failed to copy. Click the link to select it manually.",autoClose:!0,autoCloseDelay:1200,onCopy:null,onError:null,onCancel:null,onClose:null,...e};iN();const{dialog:r,input:i,copyButton:s,cancelButton:o,feedback:a}=nN(t,n);sN(r);let c=!1;const l=async()=>{await oN(t,i)?(c=!0,a.textContent=n.successMessage,a.classList.remove("copy-link-dialog__feedback--error"),n.onCopy&&n.onCopy(t),n.autoClose&&setTimeout(()=>{r.close()},n.autoCloseDelay)):(a.textContent=n.errorMessage,a.classList.add("copy-link-dialog__feedback--error"),i.readOnly=!1,i.addEventListener("click",()=>{i.select()}),n.onError&&n.onError())};return s.addEventListener("click",l),o.addEventListener("click",()=>{n.onCancel&&n.onCancel(),r.close()}),r.addEventListener("keydown",u=>{u.key==="Enter"&&!u.shiftKey&&!u.ctrlKey&&!u.altKey&&!u.metaKey&&(u.preventDefault(),l())}),r.addEventListener("close",()=>{!c&&n.onCancel&&n.onCancel(),n.onClose&&n.onClose(),setTimeout(()=>{r.remove()},300)}),document.body.appendChild(r),r.showModal(),r}function iN(){if(yh)return;const t=document.createElement("style");t.textContent=`
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
  `,document.head.appendChild(t),yh=!0}function sN(t){t.showModal||(t.showModal=function(){this.setAttribute("open",""),this.style.display="block",this.style.position="fixed",this.style.top="50%",this.style.left="50%",this.style.transform="translate(-50%, -50%)";const e=getComputedStyle(document.documentElement).getPropertyValue("--z-ui-overlay").trim();this.style.zIndex=e||"1000"},t.close=function(){this.removeAttribute("open"),this.style.display="none"})}async function oN(t,e=null){if(navigator.clipboard&&navigator.clipboard.writeText)try{return await navigator.clipboard.writeText(t),!0}catch(n){return console.warn("Clipboard API failed, using fallback:",n),!1}if(!e)return!1;try{return e.select(),e.setSelectionRange(0,99999),document.execCommand("copy")}catch(n){return console.error("Fallback copy failed:",n),!1}}function aN(){const t=window.matchMedia&&window.matchMedia("(display-mode: standalone)").matches||navigator.standalone===!0,e=/iphone|ipad|ipod/i.test(navigator.userAgent||"");if(!t||!e||!window.location.hostname.includes("github.io"))return;const r="https://vidu-aae11.web.app",i=r.replace(/\/$/,"");let s;try{s=new URL(i).hostname}catch(l){console.error("[PWA Redirect] Invalid VITE_APP_HOSTING_URL:",r,l);return}if(window.location.hostname===s)return;const o="/HangVidU/";let a=window.location.pathname;a.startsWith(o)?a="/"+a.slice(o.length):a==="/HangVidU"&&(a="/");let c;try{c=new URL(a+window.location.search+window.location.hash,i).toString()}catch(l){console.error("[PWA Redirect] Failed to construct target URL:",l);return}console.log("[PWA Redirect] iOS standalone PWA on gh-pages → redirecting to Firebase Hosting:",c),window.location.replace(c)}lA(!0);y().disable();let jl=[];async function cN(){lN();const t=im(),n=["localVideoEl","remoteVideoEl","localBoxEl","remoteBoxEl","chatControls","lobbyDiv","titleAuthBar"].filter(r=>!t[r]);if(n.length>0)return console.error("Critical elements missing:",n),!1;try{{const{setupPWA:s}=await Ae(async()=>{const{setupPWA:o}=await import("./PWA-0O7OiRox.js");return{setupPWA:o}},[]);await s()}qP(),hN(),await Xg;const r=xA(mo);r&&jl.push(r.dispose);const i=document.querySelector(".top-right-menu");if(i){const s=JP({parent:i,hideWhenAllRead:!0});QP.setToggle(s)}return!0}catch(r){return console.error("Initialization error:",r),!1}}let tc=!1;function Dm(){tc=!1}async function ts(){tc||(tc=!0,await eN(Ce),VP({getLocalStream:Eo,getLocalVideo:()=>Ce,getRemoteVideo:()=>te,getPeerConnection:()=>le.getState().pc,setLocalStream:Ds,micBtn:br,cameraBtn:Sr,switchCameraBtn:wr,mutePartnerBtn:Ye,fullscreenPartnerBtn:_o,remotePipBtn:zt}),Ce&&(Ce.addEventListener("enterpictureinpicture",()=>Z&&E(Z)),Ce.addEventListener("leavepictureinpicture",()=>{Z&&!(ir()&&xl())&&A(Z)})))}function lN(){E(z),E(Z),E(Se),E(Oe)}function Mm(t){(t?.name==="NotAllowedError"||t?.name==="PermissionDeniedError")&&alert('Camera/microphone access is required for video calls. Please click "Allow" when prompted, or check your browser settings.'),Dm()}function ns(t=null){return{localStream:Eo(),localVideoEl:Ce,remoteVideoEl:te,mutePartnerBtn:Ye,setupRemoteStream:tN,setupWatchSync:jA,targetRoomId:t}}function rs(t,e=!1){return t.success?(e&&t.roomLink&&rN(t.roomLink,{onCopy:()=>B("Link ready! Share with your partner."),onCancel:()=>B("Link ready! Use the copy button to use it, or create a new one.")}),!0):!1}async function wo(t,{forceInitiator:e=!1}={}){try{await ts()}catch(s){return console.error("Failed to initialize local media stream:",s),Mm(s),!1}const n=Date.now();if(e){y().logRoomCreation(t,!0,{creationTime:n,listenerAttachTime:n,timeDiff:0},{trigger:"force_initiator",reason:"calling_saved_contact"}),await ts();const s=await le.createCall(ns(t));return rs(s,!1)}let r=await J.checkRoomStatus(t);if(r.exists&&!r.hasMembers){let o=0;for(;o<3&&!r.hasMembers;)await new Promise(a=>setTimeout(a,250*(o+1))),r=await J.checkRoomStatus(t),o++}if(!r.exists||!r.hasMembers){y().logRoomCreation(t,!0,{creationTime:n,listenerAttachTime:n,timeDiff:0},{trigger:"room_empty_or_nonexistent",roomExists:r.exists,memberCount:r.memberCount||0}),await ts();const s=await le.createCall(ns(t));return rs(s,!0)}y().log("ROOM","JOINING_EXISTING",{roomId:t,memberCount:r.memberCount,roomExists:r.exists});const i=await le.answerCall({roomId:t,...ns()});return rs(i,!1)}const Te=new Set,xm=new Map;function Eh(t){t&&(uo(t),Te.delete(t),xm.delete(t),y().log("LISTENER","INCOMING_CLEANUP",{roomId:t,remainingListeners:Te.size}))}function uN(){B(`[LISTENER] Removing all incoming listeners (${Te.size} rooms)`);const t=Array.from(Te);t.forEach(e=>{uo(e)}),Te.clear(),xm.clear(),y().log("LISTENER","ALL_INCOMING_CLEANUP",{roomsCleared:t.length})}async function dN(t){const e=Date.now(),n=e+1440*60*1e3,r=ee();if(r){const i=cl(r,t);await Re(i,{roomId:t,savedAt:e,expiresAt:n});return}try{const i=localStorage.getItem("recentCalls")||"{}",s=JSON.parse(i);s[t]={roomId:t,savedAt:e,expiresAt:n},localStorage.setItem("recentCalls",JSON.stringify(s))}catch(i){console.warn("Failed to save recent call to localStorage",i)}}async function ta(t){const e=ee();if(e){try{await vn(cl(e,t))}catch(n){console.warn("Failed to remove recent call from RTDB",n)}return}try{const n=localStorage.getItem("recentCalls")||"{}",r=JSON.parse(n);r[t]&&(delete r[t],localStorage.setItem("recentCalls",JSON.stringify(r)))}catch(n){console.warn("Failed to remove recent call from localStorage",n)}}function sr(t){t&&(Te.has(t)&&(Te.delete(t),uo(t)),B(`[LISTENER] Attaching listener for room: ${t} (total: ${Te.size+1})`),Te.add(t),y().logListenerAttachment(t,"member_join",Te.size,{action:"incoming_call_listener_attached"}),J.onMemberJoined(t,async e=>{const n=e.key,r=e.val?e.val():null,i=fe();if(n&&n!==i){y().logMemberJoinEvent(t,n,r||{},{detectedBy:"incoming_call_listener",currentUserId:i});const s=r&&typeof r.joinedAt=="number"?r.joinedAt:null,o=2e4;let a=!1,c="none",l=0;if(s&&(l=Date.now()-s,a=l<o,c="joinedAt"),!a){const $=await wm(n,t),w=await bm(t);a=$||w,c=$?"outgoingState":w?"roomCreatedAt":"failed"}const u={isFresh:a,method:c,age:l,reason:a?"call_is_fresh":"call_is_stale"};if(y().logIncomingCallEvent(n,t,u,{memberData:r,joinedAt:s,CALL_FRESH_MS:o}),!a){y().logNotificationDecision("REJECT","stale_call",t,{age:l,validationMethod:c,joiningUserId:n});return}let d;try{d=await J.getRoomData(t)}catch{return}if(!d||typeof d!="object")return;const h=!!d.offer,f=!!d.answer,p=d.createdBy;if(!h||f||p===i)return;const _=le.getState();if(!!_.pc&&_.pc.connectionState==="connected"){y().logNotificationDecision("REJECT","already_in_call",t,{joiningUserId:n,currentCallState:_.pc?.connectionState});return}y().logNotificationDecision("SHOW","fresh_call_detected",t,{joiningUserId:n,freshnessResult:u});const T=await EP(t,n);jn.playIncoming(),uh.startCallIndicators(T);let V=!1;try{V=await Ul(`Incoming call from ${T}.

Accept?`)}finally{jn.stop(),uh.stopCallIndicators()}if(V)Eh(t),y().logNotificationDecision("ACCEPT","user_accepted",t,{joiningUserId:n}),wo(t).catch($=>{console.warn("Failed to answer incoming call:",$),y().logFirebaseOperation("join_room_on_accept",!1,$,{roomId:t,joiningUserId:n})});else{y().logNotificationDecision("REJECT","user_rejected",t,{joiningUserId:n});try{await J.rejectCall(t,fe(),"user_rejected")}catch($){console.warn("Failed to signal rejection via RTDB:",$)}await ta(t).catch($=>{console.warn("Failed to remove recent call on rejection:",$)})}}}),J.onCallCancelled(t,async e=>{if(e&&typeof e.val=="function"&&e.val()){try{const{dismissActiveConfirmDialog:r}=await Ae(async()=>{const{dismissActiveConfirmDialog:i}=await Promise.resolve().then(()=>uP);return{dismissActiveConfirmDialog:i}},void 0);typeof r=="function"&&r()}catch{}await ta(t).catch(()=>{})}}),J.onMemberLeft(t,async e=>{const n=e.key,r=fe();if(!(!n||n===r))try{(await J.checkRoomStatus(t)).hasMembers||(await ta(t),Eh(t),B(`Removed saved recent call and listeners for room ${t} because it is now empty`))}catch(i){console.warn("Failed to evaluate room status on member leave",i)}}))}async function vh(){const t=Date.now();y().log("LISTENER","STARTUP_BEGIN",{timestamp:t,currentListenerCount:Te.size});try{if(typeof window<"u"){const{getCurrentUserAsync:n}=await Ae(async()=>{const{getCurrentUserAsync:r}=await Promise.resolve().then(()=>SA);return{getCurrentUserAsync:r}},void 0);await n()}}catch{}const e=ee();if(y().log("LISTENER","AUTH_STATE_DETERMINED",{isLoggedIn:!!e,userId:e||"guest"}),e){const n=uk(e);try{const r=await xt(n),i=r.exists()?r.val():null,s=new Set;if(i)for(const[o,a]of Object.entries(i)){if(!a||a.expiresAt&&a.expiresAt<Date.now()){await vn(cl(e,o)).catch(()=>{});continue}s.add(o)}try{const o=await ui();Object.values(o||{}).forEach(a=>{a?.roomId&&s.add(a.roomId)})}catch{}s.forEach(o=>sr(o)),y().log("LISTENER","STARTUP_COMPLETE",{storage:"rtdb",roomsToListen:Array.from(s),totalListeners:Te.size,duration:Date.now()-t})}catch(r){console.warn("Failed to read recent calls from RTDB",r),y().logFirebaseOperation("read_recent_calls",!1,r,{storage:"rtdb",userId:e})}return}try{const n=localStorage.getItem("recentCalls")||"{}",r=JSON.parse(n),i={},s=new Set;for(const[o,a]of Object.entries(r||{}))!a||a.expiresAt&&a.expiresAt<Date.now()||(i[o]=a,s.add(o));try{const o=await ui();Object.values(o||{}).forEach(a=>{a?.roomId&&s.add(a.roomId)})}catch{}s.forEach(o=>sr(o)),localStorage.setItem("recentCalls",JSON.stringify(i)),y().log("LISTENER","STARTUP_COMPLETE",{storage:"localStorage",roomsToListen:Array.from(s),totalListeners:Te.size,duration:Date.now()-t,expiredRoomsRemoved:Object.keys(r||{}).length-s.size})}catch(n){console.warn("Failed to read recent calls from localStorage",n),y().logFirebaseOperation("read_recent_calls",!1,n,{storage:"localStorage"})}}function na(){return W&&Se&&!Se.classList.contains("hidden")&&W.src&&W.src.trim()!==""}let wh=!1;function hN(){if(wh)return;const t=()=>{const e=document.activeElement;return e&&(e.tagName==="INPUT"||e.tagName==="TEXTAREA"||e.isContentEditable)};document.addEventListener("keydown",e=>{t()||(e.key==="w"||e.key==="W")&&(console.log("=== W KEY PRESSED ==="),console.log("lastWatched:",rn()),console.log("isYTVisible():",Yo()),console.log("isSharedVideoVisible():",na()),console.log("isWatchModeActive():",ir()),rn()==="yt"?Yo()?(Ls(),qr()):(cm(),Ka()):rn()==="url"&&(na()?(E(Se),qr()):(A(Se),Ka()))),e.key==="Escape"&&ir()&&(rn()==="yt"&&Yo()?(Ai(),Ls()):rn()==="url"&&na()&&(W.pause(),E(Se)),qr())}),wh=!0}const Fm=async()=>{try{await ts();const t=await le.createCall(ns());rs(t,!0)}catch(t){console.error("Failed to start call:",t),Mm(t)}};xe.onclick=Fm;Yt.onclick=Fm;bn&&(bn.onclick=()=>{rn()==="yt"?(Ai(),Ls()):rn()==="url"&&(W.pause(),E(Se)),qr()});qe.onclick=async()=>{console.debug("Hanging up..."),await le.hangUp({emitCancel:!0,reason:"user_hung_up"})};async function fN(){const e=new URLSearchParams(window.location.search).get("room");if(!e)return!1;const n=await wo(e);return n||(go(),vm()),n}aN();window.onload=async()=>{if(!await cN()){xe.disabled=!0,console.error("Initialization failed. Cannot start chat.");return}await vh().catch(i=>console.warn("Failed to start saved-room listeners",i)),di(tt).catch(i=>{console.warn("Failed to render contacts list:",i)});let e=null;const n=wl(async({isLoggedIn:i,user:s})=>{try{const o=e===null,a=e===!0&&!i,c=e===!1&&i;e=i,await di(tt),a?(B("[AUTH] User logged out - cleaning up incoming listeners"),uN()):c?(B("[AUTH] User logged in - re-attaching incoming listeners"),await vh().catch(l=>console.warn("Failed to re-attach saved-room listeners on login",l))):o&&i&&B("[AUTH] Initial load with logged-in user")}catch(o){console.warn("Failed to handle auth change:",o)}});jl.push(()=>{try{typeof n=="function"&&n()}catch{}}),await fN()};window.addEventListener("beforeunload",async t=>{const e=le.getState();if(e.pc&&e.pc.connectionState==="connected")return t.preventDefault(),t.returnValue="You are in an active call. Are you sure you want to leave?",t.returnValue;await pN()});le.on("memberJoined",({memberId:t,roomId:e})=>{console.debug("CallController memberJoined event",{memberId:t,roomId:e}),le.setPartnerId(t),Ml(),Fl().catch(n=>console.warn("Failed to clear calling state:",n)),dN(e).catch(n=>console.warn("Failed to save recent call:",n))});le.on("memberLeft",({memberId:t})=>{console.info("Partner has left the call")});le.on("cleanup",({roomId:t,partnerId:e,reason:n})=>{Ft(),mm(),vm(),go();const r=le.getState();r.messagesUI&&typeof r.messagesUI.cleanup=="function"&&(r.messagesUI.cleanup(),r.messagesUI=null),e&&t&&setTimeout(()=>{vP(e,t,tt).catch(i=>{console.warn("Failed to save contact after cleanup:",i)})},500)});async function pN(){await le.hangUp({emitCancel:!0,reason:"page_unload"}),jP(),ak(),document.pictureInPictureElement&&document.exitPictureInPicture().catch(e=>console.error(e));const t=le.getState();t.messagesUI&&t.messagesUI.cleanup&&t.messagesUI.cleanup(),window.history.replaceState({},document.title,window.location.pathname),W.src="",ym(),Ce&&Ce.srcObject&&(Ce.srcObject=null),te&&te.srcObject&&(te.srcObject=null),qr(),go(),VA("none"),Pl(),am(!1),YP(),jl.forEach(e=>e())}const gN=Object.freeze(Object.defineProperty({__proto__:null,joinOrCreateRoomWithId:wo,listenForIncomingOnRoom:sr,resetLocalStreamInitFlag:Dm},Symbol.toStringTag,{value:"Module"}));export{Ae as _,bl as c,B as d,E as h,mN as i,QP as n,A as s};
