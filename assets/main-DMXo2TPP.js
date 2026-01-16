(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))s(r);new MutationObserver(r=>{for(const i of r)if(i.type==="childList")for(const o of i.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&s(o)}).observe(document,{childList:!0,subtree:!0});function n(r){const i={};return r.integrity&&(i.integrity=r.integrity),r.referrerPolicy&&(i.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?i.credentials="include":r.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function s(r){if(r.ep)return;r.ep=!0;const i=n(r);fetch(r.href,i)}})();const k_="modulepreload",R_=function(t){return"/HangVidU/"+t},gu={},lt=function(e,n,s){let r=Promise.resolve();if(n&&n.length>0){let c=function(l){return Promise.all(l.map(u=>Promise.resolve(u).then(d=>({status:"fulfilled",value:d}),d=>({status:"rejected",reason:d}))))};document.getElementsByTagName("link");const o=document.querySelector("meta[property=csp-nonce]"),a=o?.nonce||o?.getAttribute("nonce");r=c(n.map(l=>{if(l=R_(l),l in gu)return;gu[l]=!0;const u=l.endsWith(".css"),d=u?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${l}"]${d}`))return;const h=document.createElement("link");if(h.rel=u?"stylesheet":k_,u||(h.as="script"),h.crossOrigin="",h.href=l,a&&h.setAttribute("nonce",a),document.head.appendChild(h),u)return new Promise((f,p)=>{h.addEventListener("load",f),h.addEventListener("error",()=>p(new Error(`Unable to preload CSS for ${l}`)))})}))}function i(o){const a=new Event("vite:preloadError",{cancelable:!0});if(a.payload=o,window.dispatchEvent(a),!a.defaultPrevented)throw o}return r.then(o=>{for(const a of o||[])a.status==="rejected"&&i(a.reason);return e().catch(i)})},I=typeof __SENTRY_DEBUG__>"u"||__SENTRY_DEBUG__,V=globalThis,wn="10.26.0";function so(){return ro(V),V}function ro(t){const e=t.__SENTRY__=t.__SENTRY__||{};return e.version=e.version||wn,e[wn]=e[wn]||{}}function Cs(t,e,n=V){const s=n.__SENTRY__=n.__SENTRY__||{},r=s[wn]=s[wn]||{};return r[t]||(r[t]=e())}const A_=["debug","info","warn","error","log","assert","trace"],N_="Sentry Logger ",wi={};function Ss(t){if(!("console"in V))return t();const e=V.console,n={},s=Object.keys(wi);s.forEach(r=>{const i=wi[r];n[r]=e[r],e[r]=i});try{return t()}finally{s.forEach(r=>{e[r]=n[r]})}}function P_(){Ac().enabled=!0}function L_(){Ac().enabled=!1}function Yh(){return Ac().enabled}function O_(...t){Rc("log",...t)}function D_(...t){Rc("warn",...t)}function x_(...t){Rc("error",...t)}function Rc(t,...e){I&&Yh()&&Ss(()=>{V.console[t](`${N_}[${t}]:`,...e)})}function Ac(){return I?Cs("loggerSettings",()=>({enabled:!1})):{enabled:!1}}const b={enable:P_,disable:L_,isEnabled:Yh,log:O_,warn:D_,error:x_},Kh=50,Tn="?",mu=/\(error: (.*)\)/,_u=/captureMessage|captureException/;function Jh(...t){const e=t.sort((n,s)=>n[0]-s[0]).map(n=>n[1]);return(n,s=0,r=0)=>{const i=[],o=n.split(`
`);for(let a=s;a<o.length;a++){let c=o[a];c.length>1024&&(c=c.slice(0,1024));const l=mu.test(c)?c.replace(mu,"$1"):c;if(!l.match(/\S*Error: /)){for(const u of e){const d=u(l);if(d){i.push(d);break}}if(i.length>=Kh+r)break}}return F_(i.slice(r))}}function M_(t){return Array.isArray(t)?Jh(...t):t}function F_(t){if(!t.length)return[];const e=Array.from(t);return/sentryWrapped/.test(Yr(e).function||"")&&e.pop(),e.reverse(),_u.test(Yr(e).function||"")&&(e.pop(),_u.test(Yr(e).function||"")&&e.pop()),e.slice(0,Kh).map(n=>({...n,filename:n.filename||Yr(e).filename,function:n.function||Tn}))}function Yr(t){return t[t.length-1]||{}}const jo="<anonymous>";function Xt(t){try{return!t||typeof t!="function"?jo:t.name||jo}catch{return jo}}function yu(t){const e=t.exception;if(e){const n=[];try{return e.values.forEach(s=>{s.stacktrace.frames&&n.push(...s.stacktrace.frames)}),n}catch{return}}}function Xh(t){return"__v_isVNode"in t&&t.__v_isVNode?"[VueVNode]":"[VueViewModel]"}const ai={},vu={};function $n(t,e){ai[t]=ai[t]||[],ai[t].push(e)}function Bn(t,e){if(!vu[t]){vu[t]=!0;try{e()}catch(n){I&&b.error(`Error while instrumenting ${t}`,n)}}}function Ze(t,e){const n=t&&ai[t];if(n)for(const s of n)try{s(e)}catch(r){I&&b.error(`Error while triggering instrumentation handler.
Type: ${t}
Name: ${Xt(s)}
Error:`,r)}}let qo=null;function U_(t){const e="error";$n(e,t),Bn(e,$_)}function $_(){qo=V.onerror,V.onerror=function(t,e,n,s,r){return Ze("error",{column:s,error:r,line:n,msg:t,url:e}),qo?qo.apply(this,arguments):!1},V.onerror.__SENTRY_INSTRUMENTED__=!0}let zo=null;function B_(t){const e="unhandledrejection";$n(e,t),Bn(e,H_)}function H_(){zo=V.onunhandledrejection,V.onunhandledrejection=function(t){return Ze("unhandledrejection",t),zo?zo.apply(this,arguments):!0},V.onunhandledrejection.__SENTRY_INSTRUMENTED__=!0}const Qh=Object.prototype.toString;function Nc(t){switch(Qh.call(t)){case"[object Error]":case"[object Exception]":case"[object DOMException]":case"[object WebAssembly.Exception]":return!0;default:return Qt(t,Error)}}function Ts(t,e){return Qh.call(t)===`[object ${e}]`}function Zh(t){return Ts(t,"ErrorEvent")}function wu(t){return Ts(t,"DOMError")}function W_(t){return Ts(t,"DOMException")}function Et(t){return Ts(t,"String")}function Pc(t){return typeof t=="object"&&t!==null&&"__sentry_template_string__"in t&&"__sentry_template_values__"in t}function io(t){return t===null||Pc(t)||typeof t!="object"&&typeof t!="function"}function lr(t){return Ts(t,"Object")}function oo(t){return typeof Event<"u"&&Qt(t,Event)}function V_(t){return typeof Element<"u"&&Qt(t,Element)}function j_(t){return Ts(t,"RegExp")}function Ar(t){return!!(t?.then&&typeof t.then=="function")}function q_(t){return lr(t)&&"nativeEvent"in t&&"preventDefault"in t&&"stopPropagation"in t}function Qt(t,e){try{return t instanceof e}catch{return!1}}function ef(t){return!!(typeof t=="object"&&t!==null&&(t.__isVue||t._isVue||t.__v_isVNode))}function z_(t){return typeof Request<"u"&&Qt(t,Request)}const Lc=V,G_=80;function tf(t,e={}){if(!t)return"<unknown>";try{let n=t;const s=5,r=[];let i=0,o=0;const a=" > ",c=a.length;let l;const u=Array.isArray(e)?e:e.keyAttrs,d=!Array.isArray(e)&&e.maxStringLength||G_;for(;n&&i++<s&&(l=Y_(n,u),!(l==="html"||i>1&&o+r.length*c+l.length>=d));)r.push(l),o+=l.length,n=n.parentNode;return r.reverse().join(a)}catch{return"<unknown>"}}function Y_(t,e){const n=t,s=[];if(!n?.tagName)return"";if(Lc.HTMLElement&&n instanceof HTMLElement&&n.dataset){if(n.dataset.sentryComponent)return n.dataset.sentryComponent;if(n.dataset.sentryElement)return n.dataset.sentryElement}s.push(n.tagName.toLowerCase());const r=e?.length?e.filter(o=>n.getAttribute(o)).map(o=>[o,n.getAttribute(o)]):null;if(r?.length)r.forEach(o=>{s.push(`[${o[0]}="${o[1]}"]`)});else{n.id&&s.push(`#${n.id}`);const o=n.className;if(o&&Et(o)){const a=o.split(/\s+/);for(const c of a)s.push(`.${c}`)}}const i=["aria-label","type","name","title","alt"];for(const o of i){const a=n.getAttribute(o);a&&s.push(`[${o}="${a}"]`)}return s.join("")}function Oc(){try{return Lc.document.location.href}catch{return""}}function K_(t){if(!Lc.HTMLElement)return null;let e=t;const n=5;for(let s=0;s<n;s++){if(!e)return null;if(e instanceof HTMLElement){if(e.dataset.sentryComponent)return e.dataset.sentryComponent;if(e.dataset.sentryElement)return e.dataset.sentryElement}e=e.parentNode}return null}function De(t,e,n){if(!(e in t))return;const s=t[e];if(typeof s!="function")return;const r=n(s);typeof r=="function"&&nf(r,s);try{t[e]=r}catch{I&&b.log(`Failed to replace method "${e}" in object`,t)}}function In(t,e,n){try{Object.defineProperty(t,e,{value:n,writable:!0,configurable:!0})}catch{I&&b.log(`Failed to add non-enumerable property "${e}" to object`,t)}}function nf(t,e){try{const n=e.prototype||{};t.prototype=e.prototype=n,In(t,"__sentry_original__",e)}catch{}}function Dc(t){return t.__sentry_original__}function sf(t){if(Nc(t))return{message:t.message,name:t.name,stack:t.stack,...bu(t)};if(oo(t)){const e={type:t.type,target:Eu(t.target),currentTarget:Eu(t.currentTarget),...bu(t)};return typeof CustomEvent<"u"&&Qt(t,CustomEvent)&&(e.detail=t.detail),e}else return t}function Eu(t){try{return V_(t)?tf(t):Object.prototype.toString.call(t)}catch{return"<unknown>"}}function bu(t){if(typeof t=="object"&&t!==null){const e={};for(const n in t)Object.prototype.hasOwnProperty.call(t,n)&&(e[n]=t[n]);return e}else return{}}function J_(t){const e=Object.keys(sf(t));return e.sort(),e[0]?e.join(", "):"[object has no keys]"}function rf(t,e=0){return typeof t!="string"||e===0||t.length<=e?t:`${t.slice(0,e)}...`}function Cu(t,e){if(!Array.isArray(t))return"";const n=[];for(let s=0;s<t.length;s++){const r=t[s];try{ef(r)?n.push(Xh(r)):n.push(String(r))}catch{n.push("[value cannot be serialized]")}}return n.join(e)}function ci(t,e,n=!1){return Et(t)?j_(e)?e.test(t):Et(e)?n?t===e:t.includes(e):!1:!1}function ao(t,e=[],n=!1){return e.some(s=>ci(t,s,n))}function X_(){const t=V;return t.crypto||t.msCrypto}let Go;function Q_(){return Math.random()*16}function $e(t=X_()){try{if(t?.randomUUID)return t.randomUUID().replace(/-/g,"")}catch{}return Go||(Go="10000000100040008000"+1e11),Go.replace(/[018]/g,e=>(e^(Q_()&15)>>e/4).toString(16))}function of(t){return t.exception?.values?.[0]}function mn(t){const{message:e,event_id:n}=t;if(e)return e;const s=of(t);return s?s.type&&s.value?`${s.type}: ${s.value}`:s.type||s.value||n||"<unknown>":n||"<unknown>"}function ka(t,e,n){const s=t.exception=t.exception||{},r=s.values=s.values||[],i=r[0]=r[0]||{};i.value||(i.value=e||""),i.type||(i.type="Error")}function ls(t,e){const n=of(t);if(!n)return;const s={type:"generic",handled:!0},r=n.mechanism;if(n.mechanism={...s,...r,...e},e&&"data"in e){const i={...r?.data,...e.data};n.mechanism.data=i}}function Su(t){if(Z_(t))return!0;try{In(t,"__sentry_captured__",!0)}catch{}return!1}function Z_(t){try{return t.__sentry_captured__}catch{}}const af=1e3;function Nr(){return Date.now()/af}function ey(){const{performance:t}=V;if(!t?.now||!t.timeOrigin)return Nr;const e=t.timeOrigin;return()=>(e+t.now())/af}let Tu;function bt(){return(Tu??(Tu=ey()))()}function ty(t){const e=bt(),n={sid:$e(),init:!0,timestamp:e,started:e,duration:0,status:"ok",errors:0,ignoreDuration:!1,toJSON:()=>sy(n)};return t&&us(n,t),n}function us(t,e={}){if(e.user&&(!t.ipAddress&&e.user.ip_address&&(t.ipAddress=e.user.ip_address),!t.did&&!e.did&&(t.did=e.user.id||e.user.email||e.user.username)),t.timestamp=e.timestamp||bt(),e.abnormal_mechanism&&(t.abnormal_mechanism=e.abnormal_mechanism),e.ignoreDuration&&(t.ignoreDuration=e.ignoreDuration),e.sid&&(t.sid=e.sid.length===32?e.sid:$e()),e.init!==void 0&&(t.init=e.init),!t.did&&e.did&&(t.did=`${e.did}`),typeof e.started=="number"&&(t.started=e.started),t.ignoreDuration)t.duration=void 0;else if(typeof e.duration=="number")t.duration=e.duration;else{const n=t.timestamp-t.started;t.duration=n>=0?n:0}e.release&&(t.release=e.release),e.environment&&(t.environment=e.environment),!t.ipAddress&&e.ipAddress&&(t.ipAddress=e.ipAddress),!t.userAgent&&e.userAgent&&(t.userAgent=e.userAgent),typeof e.errors=="number"&&(t.errors=e.errors),e.status&&(t.status=e.status)}function ny(t,e){let n={};t.status==="ok"&&(n={status:"exited"}),us(t,n)}function sy(t){return{sid:`${t.sid}`,init:t.init,started:new Date(t.started*1e3).toISOString(),timestamp:new Date(t.timestamp*1e3).toISOString(),status:t.status,errors:t.errors,did:typeof t.did=="number"||typeof t.did=="string"?`${t.did}`:void 0,duration:t.duration,abnormal_mechanism:t.abnormal_mechanism,attrs:{release:t.release,environment:t.environment,ip_address:t.ipAddress,user_agent:t.userAgent}}}function Pr(t,e,n=2){if(!e||typeof e!="object"||n<=0)return e;if(t&&Object.keys(e).length===0)return t;const s={...t};for(const r in e)Object.prototype.hasOwnProperty.call(e,r)&&(s[r]=Pr(s[r],e[r],n-1));return s}function Iu(){return $e()}function cf(){return $e().substring(16)}const Ra="_sentrySpan";function ku(t,e){e?In(t,Ra,e):delete t[Ra]}function Ru(t){return t[Ra]}const ry=100;class It{constructor(){this._notifyingListeners=!1,this._scopeListeners=[],this._eventProcessors=[],this._breadcrumbs=[],this._attachments=[],this._user={},this._tags={},this._extra={},this._contexts={},this._sdkProcessingMetadata={},this._propagationContext={traceId:Iu(),sampleRand:Math.random()}}clone(){const e=new It;return e._breadcrumbs=[...this._breadcrumbs],e._tags={...this._tags},e._extra={...this._extra},e._contexts={...this._contexts},this._contexts.flags&&(e._contexts.flags={values:[...this._contexts.flags.values]}),e._user=this._user,e._level=this._level,e._session=this._session,e._transactionName=this._transactionName,e._fingerprint=this._fingerprint,e._eventProcessors=[...this._eventProcessors],e._attachments=[...this._attachments],e._sdkProcessingMetadata={...this._sdkProcessingMetadata},e._propagationContext={...this._propagationContext},e._client=this._client,e._lastEventId=this._lastEventId,ku(e,Ru(this)),e}setClient(e){this._client=e}setLastEventId(e){this._lastEventId=e}getClient(){return this._client}lastEventId(){return this._lastEventId}addScopeListener(e){this._scopeListeners.push(e)}addEventProcessor(e){return this._eventProcessors.push(e),this}setUser(e){return this._user=e||{email:void 0,id:void 0,ip_address:void 0,username:void 0},this._session&&us(this._session,{user:e}),this._notifyScopeListeners(),this}getUser(){return this._user}setTags(e){return this._tags={...this._tags,...e},this._notifyScopeListeners(),this}setTag(e,n){return this.setTags({[e]:n})}setExtras(e){return this._extra={...this._extra,...e},this._notifyScopeListeners(),this}setExtra(e,n){return this._extra={...this._extra,[e]:n},this._notifyScopeListeners(),this}setFingerprint(e){return this._fingerprint=e,this._notifyScopeListeners(),this}setLevel(e){return this._level=e,this._notifyScopeListeners(),this}setTransactionName(e){return this._transactionName=e,this._notifyScopeListeners(),this}setContext(e,n){return n===null?delete this._contexts[e]:this._contexts[e]=n,this._notifyScopeListeners(),this}setSession(e){return e?this._session=e:delete this._session,this._notifyScopeListeners(),this}getSession(){return this._session}update(e){if(!e)return this;const n=typeof e=="function"?e(this):e,s=n instanceof It?n.getScopeData():lr(n)?e:void 0,{tags:r,extra:i,user:o,contexts:a,level:c,fingerprint:l=[],propagationContext:u}=s||{};return this._tags={...this._tags,...r},this._extra={...this._extra,...i},this._contexts={...this._contexts,...a},o&&Object.keys(o).length&&(this._user=o),c&&(this._level=c),l.length&&(this._fingerprint=l),u&&(this._propagationContext=u),this}clear(){return this._breadcrumbs=[],this._tags={},this._extra={},this._user={},this._contexts={},this._level=void 0,this._transactionName=void 0,this._fingerprint=void 0,this._session=void 0,ku(this,void 0),this._attachments=[],this.setPropagationContext({traceId:Iu(),sampleRand:Math.random()}),this._notifyScopeListeners(),this}addBreadcrumb(e,n){const s=typeof n=="number"?n:ry;if(s<=0)return this;const r={timestamp:Nr(),...e,message:e.message?rf(e.message,2048):e.message};return this._breadcrumbs.push(r),this._breadcrumbs.length>s&&(this._breadcrumbs=this._breadcrumbs.slice(-s),this._client?.recordDroppedEvent("buffer_overflow","log_item")),this._notifyScopeListeners(),this}getLastBreadcrumb(){return this._breadcrumbs[this._breadcrumbs.length-1]}clearBreadcrumbs(){return this._breadcrumbs=[],this._notifyScopeListeners(),this}addAttachment(e){return this._attachments.push(e),this}clearAttachments(){return this._attachments=[],this}getScopeData(){return{breadcrumbs:this._breadcrumbs,attachments:this._attachments,contexts:this._contexts,tags:this._tags,extra:this._extra,user:this._user,level:this._level,fingerprint:this._fingerprint||[],eventProcessors:this._eventProcessors,propagationContext:this._propagationContext,sdkProcessingMetadata:this._sdkProcessingMetadata,transactionName:this._transactionName,span:Ru(this)}}setSDKProcessingMetadata(e){return this._sdkProcessingMetadata=Pr(this._sdkProcessingMetadata,e,2),this}setPropagationContext(e){return this._propagationContext=e,this}getPropagationContext(){return this._propagationContext}captureException(e,n){const s=n?.event_id||$e();if(!this._client)return I&&b.warn("No client configured on scope - will not capture exception!"),s;const r=new Error("Sentry syntheticException");return this._client.captureException(e,{originalException:e,syntheticException:r,...n,event_id:s},this),s}captureMessage(e,n,s){const r=s?.event_id||$e();if(!this._client)return I&&b.warn("No client configured on scope - will not capture message!"),r;const i=s?.syntheticException??new Error(e);return this._client.captureMessage(e,n,{originalException:e,syntheticException:i,...s,event_id:r},this),r}captureEvent(e,n){const s=n?.event_id||$e();return this._client?(this._client.captureEvent(e,{...n,event_id:s},this),s):(I&&b.warn("No client configured on scope - will not capture event!"),s)}_notifyScopeListeners(){this._notifyingListeners||(this._notifyingListeners=!0,this._scopeListeners.forEach(e=>{e(this)}),this._notifyingListeners=!1)}}function iy(){return Cs("defaultCurrentScope",()=>new It)}function oy(){return Cs("defaultIsolationScope",()=>new It)}class ay{constructor(e,n){let s;e?s=e:s=new It;let r;n?r=n:r=new It,this._stack=[{scope:s}],this._isolationScope=r}withScope(e){const n=this._pushScope();let s;try{s=e(n)}catch(r){throw this._popScope(),r}return Ar(s)?s.then(r=>(this._popScope(),r),r=>{throw this._popScope(),r}):(this._popScope(),s)}getClient(){return this.getStackTop().client}getScope(){return this.getStackTop().scope}getIsolationScope(){return this._isolationScope}getStackTop(){return this._stack[this._stack.length-1]}_pushScope(){const e=this.getScope().clone();return this._stack.push({client:this.getClient(),scope:e}),e}_popScope(){return this._stack.length<=1?!1:!!this._stack.pop()}}function ds(){const t=so(),e=ro(t);return e.stack=e.stack||new ay(iy(),oy())}function cy(t){return ds().withScope(t)}function ly(t,e){const n=ds();return n.withScope(()=>(n.getStackTop().scope=t,e(t)))}function Au(t){return ds().withScope(()=>t(ds().getIsolationScope()))}function uy(){return{withIsolationScope:Au,withScope:cy,withSetScope:ly,withSetIsolationScope:(t,e)=>Au(e),getCurrentScope:()=>ds().getScope(),getIsolationScope:()=>ds().getIsolationScope()}}function xc(t){const e=ro(t);return e.acs?e.acs:uy()}function on(){const t=so();return xc(t).getCurrentScope()}function Lr(){const t=so();return xc(t).getIsolationScope()}function dy(){return Cs("globalScope",()=>new It)}function hy(...t){const e=so(),n=xc(e);if(t.length===2){const[s,r]=t;return s?n.withSetScope(s,r):n.withScope(r)}return n.withScope(t[0])}function Re(){return on().getClient()}function fy(t){const e=t.getPropagationContext(),{traceId:n,parentSpanId:s,propagationSpanId:r}=e,i={trace_id:n,span_id:r||cf()};return s&&(i.parent_span_id=s),i}const py="sentry.source",gy="sentry.sample_rate",my="sentry.previous_trace_sample_rate",_y="sentry.op",yy="sentry.origin",lf="sentry.profile_id",uf="sentry.exclusive_time",vy=0,wy=1,Ey="_sentryScope",by="_sentryIsolationScope";function Cy(t){if(t){if(typeof t=="object"&&"deref"in t&&typeof t.deref=="function")try{return t.deref()}catch{return}return t}}function df(t){const e=t;return{scope:e[Ey],isolationScope:Cy(e[by])}}const Sy="sentry-",Ty=/^sentry-/;function Iy(t){const e=ky(t);if(!e)return;const n=Object.entries(e).reduce((s,[r,i])=>{if(r.match(Ty)){const o=r.slice(Sy.length);s[o]=i}return s},{});if(Object.keys(n).length>0)return n}function ky(t){if(!(!t||!Et(t)&&!Array.isArray(t)))return Array.isArray(t)?t.reduce((e,n)=>{const s=Nu(n);return Object.entries(s).forEach(([r,i])=>{e[r]=i}),e},{}):Nu(t)}function Nu(t){return t.split(",").map(e=>{const n=e.indexOf("=");if(n===-1)return[];const s=e.slice(0,n),r=e.slice(n+1);return[s,r].map(i=>{try{return decodeURIComponent(i.trim())}catch{return}})}).reduce((e,[n,s])=>(n&&s&&(e[n]=s),e),{})}const Ry=/^o(\d+)\./,Ay=/^(?:(\w+):)\/\/(?:(\w+)(?::(\w+)?)?@)([\w.-]+)(?::(\d+))?\/(.+)/;function Ny(t){return t==="http"||t==="https"}function Or(t,e=!1){const{host:n,path:s,pass:r,port:i,projectId:o,protocol:a,publicKey:c}=t;return`${a}://${c}${e&&r?`:${r}`:""}@${n}${i?`:${i}`:""}/${s&&`${s}/`}${o}`}function Py(t){const e=Ay.exec(t);if(!e){Ss(()=>{console.error(`Invalid Sentry Dsn: ${t}`)});return}const[n,s,r="",i="",o="",a=""]=e.slice(1);let c="",l=a;const u=l.split("/");if(u.length>1&&(c=u.slice(0,-1).join("/"),l=u.pop()),l){const d=l.match(/^\d+/);d&&(l=d[0])}return hf({host:i,pass:r,path:c,projectId:l,port:o,protocol:n,publicKey:s})}function hf(t){return{protocol:t.protocol,publicKey:t.publicKey||"",pass:t.pass||"",host:t.host,port:t.port||"",path:t.path||"",projectId:t.projectId}}function Ly(t){if(!I)return!0;const{port:e,projectId:n,protocol:s}=t;return["protocol","publicKey","host","projectId"].find(o=>t[o]?!1:(b.error(`Invalid Sentry Dsn: ${o} missing`),!0))?!1:n.match(/^\d+$/)?Ny(s)?e&&isNaN(parseInt(e,10))?(b.error(`Invalid Sentry Dsn: Invalid port ${e}`),!1):!0:(b.error(`Invalid Sentry Dsn: Invalid protocol ${s}`),!1):(b.error(`Invalid Sentry Dsn: Invalid projectId ${n}`),!1)}function Oy(t){return t.match(Ry)?.[1]}function Dy(t){const e=t.getOptions(),{host:n}=t.getDsn()||{};let s;return e.orgId?s=String(e.orgId):n&&(s=Oy(n)),s}function xy(t){const e=typeof t=="string"?Py(t):hf(t);if(!(!e||!Ly(e)))return e}function My(t){if(typeof t=="boolean")return Number(t);const e=typeof t=="string"?parseFloat(t):t;if(!(typeof e!="number"||isNaN(e)||e<0||e>1))return e}const ff=1;let Pu=!1;function Fy(t){const{spanId:e,traceId:n,isRemote:s}=t.spanContext(),r=s?e:Mc(t).parent_span_id,i=df(t).scope,o=s?i?.getPropagationContext().propagationSpanId||cf():e;return{parent_span_id:r,span_id:o,trace_id:n}}function Uy(t){if(t&&t.length>0)return t.map(({context:{spanId:e,traceId:n,traceFlags:s,...r},attributes:i})=>({span_id:e,trace_id:n,sampled:s===ff,attributes:i,...r}))}function Lu(t){return typeof t=="number"?Ou(t):Array.isArray(t)?t[0]+t[1]/1e9:t instanceof Date?Ou(t.getTime()):bt()}function Ou(t){return t>9999999999?t/1e3:t}function Mc(t){if(By(t))return t.getSpanJSON();const{spanId:e,traceId:n}=t.spanContext();if($y(t)){const{attributes:s,startTime:r,name:i,endTime:o,status:a,links:c}=t,l="parentSpanId"in t?t.parentSpanId:"parentSpanContext"in t?t.parentSpanContext?.spanId:void 0;return{span_id:e,trace_id:n,data:s,description:i,parent_span_id:l,start_timestamp:Lu(r),timestamp:Lu(o)||void 0,status:Wy(a),op:s[_y],origin:s[yy],links:Uy(c)}}return{span_id:e,trace_id:n,start_timestamp:0,data:{}}}function $y(t){const e=t;return!!e.attributes&&!!e.startTime&&!!e.name&&!!e.endTime&&!!e.status}function By(t){return typeof t.getSpanJSON=="function"}function Hy(t){const{traceFlags:e}=t.spanContext();return e===ff}function Wy(t){if(!(!t||t.code===vy))return t.code===wy?"ok":t.message||"internal_error"}const Vy="_sentryRootSpan";function pf(t){return t[Vy]||t}function Du(){Pu||(Ss(()=>{console.warn("[Sentry] Returning null from `beforeSendSpan` is disallowed. To drop certain spans, configure the respective integrations directly or use `ignoreSpans`.")}),Pu=!0)}function jy(t){if(typeof __SENTRY_TRACING__=="boolean"&&!__SENTRY_TRACING__)return!1;const e=Re()?.getOptions();return!!e&&(e.tracesSampleRate!=null||!!e.tracesSampler)}function xu(t){b.log(`Ignoring span ${t.op} - ${t.description} because it matches \`ignoreSpans\`.`)}function Mu(t,e){if(!e?.length||!t.description)return!1;for(const n of e){if(zy(n)){if(ci(t.description,n))return I&&xu(t),!0;continue}if(!n.name&&!n.op)continue;const s=n.name?ci(t.description,n.name):!0,r=n.op?t.op&&ci(t.op,n.op):!0;if(s&&r)return I&&xu(t),!0}return!1}function qy(t,e){const n=e.parent_span_id,s=e.span_id;if(n)for(const r of t)r.parent_span_id===s&&(r.parent_span_id=n)}function zy(t){return typeof t=="string"||t instanceof RegExp}const Fc="production",Gy="_frozenDsc";function gf(t,e){const n=e.getOptions(),{publicKey:s}=e.getDsn()||{},r={environment:n.environment||Fc,release:n.release,public_key:s,trace_id:t,org_id:Dy(e)};return e.emit("createDsc",r),r}function Yy(t,e){const n=e.getPropagationContext();return n.dsc||gf(n.traceId,t)}function Ky(t){const e=Re();if(!e)return{};const n=pf(t),s=Mc(n),r=s.data,i=n.spanContext().traceState,o=i?.get("sentry.sample_rate")??r[gy]??r[my];function a(p){return(typeof o=="number"||typeof o=="string")&&(p.sample_rate=`${o}`),p}const c=n[Gy];if(c)return a(c);const l=i?.get("sentry.dsc"),u=l&&Iy(l);if(u)return a(u);const d=gf(t.spanContext().traceId,e),h=r[py],f=s.description;return h!=="url"&&f&&(d.transaction=f),jy()&&(d.sampled=String(Hy(n)),d.sample_rand=i?.get("sentry.sample_rand")??df(n).scope?.getPropagationContext().sampleRand.toString()),a(d),e.emit("createDsc",d,n),d}function pt(t,e=100,n=1/0){try{return Aa("",t,e,n)}catch(s){return{ERROR:`**non-serializable** (${s})`}}}function mf(t,e=3,n=100*1024){const s=pt(t,e);return Zy(s)>n?mf(t,e-1,n):s}function Aa(t,e,n=1/0,s=1/0,r=ev()){const[i,o]=r;if(e==null||["boolean","string"].includes(typeof e)||typeof e=="number"&&Number.isFinite(e))return e;const a=Jy(t,e);if(!a.startsWith("[object "))return a;if(e.__sentry_skip_normalization__)return e;const c=typeof e.__sentry_override_normalization_depth__=="number"?e.__sentry_override_normalization_depth__:n;if(c===0)return a.replace("object ","");if(i(e))return"[Circular ~]";const l=e;if(l&&typeof l.toJSON=="function")try{const f=l.toJSON();return Aa("",f,c-1,s,r)}catch{}const u=Array.isArray(e)?[]:{};let d=0;const h=sf(e);for(const f in h){if(!Object.prototype.hasOwnProperty.call(h,f))continue;if(d>=s){u[f]="[MaxProperties ~]";break}const p=h[f];u[f]=Aa(f,p,c-1,s,r),d++}return o(e),u}function Jy(t,e){try{if(t==="domain"&&e&&typeof e=="object"&&e._events)return"[Domain]";if(t==="domainEmitter")return"[DomainEmitter]";if(typeof global<"u"&&e===global)return"[Global]";if(typeof window<"u"&&e===window)return"[Window]";if(typeof document<"u"&&e===document)return"[Document]";if(ef(e))return Xh(e);if(q_(e))return"[SyntheticEvent]";if(typeof e=="number"&&!Number.isFinite(e))return`[${e}]`;if(typeof e=="function")return`[Function: ${Xt(e)}]`;if(typeof e=="symbol")return`[${String(e)}]`;if(typeof e=="bigint")return`[BigInt: ${String(e)}]`;const n=Xy(e);return/^HTML(\w*)Element$/.test(n)?`[HTMLElement: ${n}]`:`[object ${n}]`}catch(n){return`**non-serializable** (${n})`}}function Xy(t){const e=Object.getPrototypeOf(t);return e?.constructor?e.constructor.name:"null prototype"}function Qy(t){return~-encodeURI(t).split(/%..|./).length}function Zy(t){return Qy(JSON.stringify(t))}function ev(){const t=new WeakSet;function e(s){return t.has(s)?!0:(t.add(s),!1)}function n(s){t.delete(s)}return[e,n]}function Is(t,e=[]){return[t,e]}function tv(t,e){const[n,s]=t;return[n,[...s,e]]}function Fu(t,e){const n=t[1];for(const s of n){const r=s[0].type;if(e(s,r))return!0}return!1}function Na(t){const e=ro(V);return e.encodePolyfill?e.encodePolyfill(t):new TextEncoder().encode(t)}function nv(t){const[e,n]=t;let s=JSON.stringify(e);function r(i){typeof s=="string"?s=typeof i=="string"?s+i:[Na(s),i]:s.push(typeof i=="string"?Na(i):i)}for(const i of n){const[o,a]=i;if(r(`
${JSON.stringify(o)}
`),typeof a=="string"||a instanceof Uint8Array)r(a);else{let c;try{c=JSON.stringify(a)}catch{c=JSON.stringify(pt(a))}r(c)}}return typeof s=="string"?s:sv(s)}function sv(t){const e=t.reduce((r,i)=>r+i.length,0),n=new Uint8Array(e);let s=0;for(const r of t)n.set(r,s),s+=r.length;return n}function rv(t){const e=typeof t.data=="string"?Na(t.data):t.data;return[{type:"attachment",length:e.length,filename:t.filename,content_type:t.contentType,attachment_type:t.attachmentType},e]}const iv={session:"session",sessions:"session",attachment:"attachment",transaction:"transaction",event:"error",client_report:"internal",user_report:"default",profile:"profile",profile_chunk:"profile",replay_event:"replay",replay_recording:"replay",check_in:"monitor",feedback:"feedback",span:"span",raw_security:"security",log:"log_item",metric:"metric",trace_metric:"metric"};function Uu(t){return iv[t]}function _f(t){if(!t?.sdk)return;const{name:e,version:n}=t.sdk;return{name:e,version:n}}function ov(t,e,n,s){const r=t.sdkProcessingMetadata?.dynamicSamplingContext;return{event_id:t.event_id,sent_at:new Date().toISOString(),...e&&{sdk:e},...!!n&&s&&{dsn:Or(s)},...r&&{trace:r}}}function av(t,e){if(!e)return t;const n=t.sdk||{};return t.sdk={...n,name:n.name||e.name,version:n.version||e.version,integrations:[...t.sdk?.integrations||[],...e.integrations||[]],packages:[...t.sdk?.packages||[],...e.packages||[]],settings:t.sdk?.settings||e.settings?{...t.sdk?.settings,...e.settings}:void 0},t}function cv(t,e,n,s){const r=_f(n),i={sent_at:new Date().toISOString(),...r&&{sdk:r},...!!s&&e&&{dsn:Or(e)}},o="aggregates"in t?[{type:"sessions"},t]:[{type:"session"},t.toJSON()];return Is(i,[o])}function lv(t,e,n,s){const r=_f(n),i=t.type&&t.type!=="replay_event"?t.type:"event";av(t,n?.sdk);const o=ov(t,r,s,e);return delete t.sdkProcessingMetadata,Is(o,[[{type:i},t]])}const Yo=0,$u=1,Bu=2;function co(t){return new ur(e=>{e(t)})}function Uc(t){return new ur((e,n)=>{n(t)})}class ur{constructor(e){this._state=Yo,this._handlers=[],this._runExecutor(e)}then(e,n){return new ur((s,r)=>{this._handlers.push([!1,i=>{if(!e)s(i);else try{s(e(i))}catch(o){r(o)}},i=>{if(!n)r(i);else try{s(n(i))}catch(o){r(o)}}]),this._executeHandlers()})}catch(e){return this.then(n=>n,e)}finally(e){return new ur((n,s)=>{let r,i;return this.then(o=>{i=!1,r=o,e&&e()},o=>{i=!0,r=o,e&&e()}).then(()=>{if(i){s(r);return}n(r)})})}_executeHandlers(){if(this._state===Yo)return;const e=this._handlers.slice();this._handlers=[],e.forEach(n=>{n[0]||(this._state===$u&&n[1](this._value),this._state===Bu&&n[2](this._value),n[0]=!0)})}_runExecutor(e){const n=(i,o)=>{if(this._state===Yo){if(Ar(o)){o.then(s,r);return}this._state=i,this._value=o,this._executeHandlers()}},s=i=>{n($u,i)},r=i=>{n(Bu,i)};try{e(s,r)}catch(i){r(i)}}}function uv(t,e,n,s=0){try{const r=Pa(e,n,t,s);return Ar(r)?r:co(r)}catch(r){return Uc(r)}}function Pa(t,e,n,s){const r=n[s];if(!t||!r)return t;const i=r({...t},e);return I&&i===null&&b.log(`Event processor "${r.id||"?"}" dropped event`),Ar(i)?i.then(o=>Pa(o,e,n,s+1)):Pa(i,e,n,s+1)}function dv(t,e){const{fingerprint:n,span:s,breadcrumbs:r,sdkProcessingMetadata:i}=e;hv(t,e),s&&gv(t,s),mv(t,n),fv(t,r),pv(t,i)}function Hu(t,e){const{extra:n,tags:s,user:r,contexts:i,level:o,sdkProcessingMetadata:a,breadcrumbs:c,fingerprint:l,eventProcessors:u,attachments:d,propagationContext:h,transactionName:f,span:p}=e;Kr(t,"extra",n),Kr(t,"tags",s),Kr(t,"user",r),Kr(t,"contexts",i),t.sdkProcessingMetadata=Pr(t.sdkProcessingMetadata,a,2),o&&(t.level=o),f&&(t.transactionName=f),p&&(t.span=p),c.length&&(t.breadcrumbs=[...t.breadcrumbs,...c]),l.length&&(t.fingerprint=[...t.fingerprint,...l]),u.length&&(t.eventProcessors=[...t.eventProcessors,...u]),d.length&&(t.attachments=[...t.attachments,...d]),t.propagationContext={...t.propagationContext,...h}}function Kr(t,e,n){t[e]=Pr(t[e],n,1)}function hv(t,e){const{extra:n,tags:s,user:r,contexts:i,level:o,transactionName:a}=e;Object.keys(n).length&&(t.extra={...n,...t.extra}),Object.keys(s).length&&(t.tags={...s,...t.tags}),Object.keys(r).length&&(t.user={...r,...t.user}),Object.keys(i).length&&(t.contexts={...i,...t.contexts}),o&&(t.level=o),a&&t.type!=="transaction"&&(t.transaction=a)}function fv(t,e){const n=[...t.breadcrumbs||[],...e];t.breadcrumbs=n.length?n:void 0}function pv(t,e){t.sdkProcessingMetadata={...t.sdkProcessingMetadata,...e}}function gv(t,e){t.contexts={trace:Fy(e),...t.contexts},t.sdkProcessingMetadata={dynamicSamplingContext:Ky(e),...t.sdkProcessingMetadata};const n=pf(e),s=Mc(n).description;s&&!t.transaction&&t.type==="transaction"&&(t.transaction=s)}function mv(t,e){t.fingerprint=t.fingerprint?Array.isArray(t.fingerprint)?t.fingerprint:[t.fingerprint]:[],e&&(t.fingerprint=t.fingerprint.concat(e)),t.fingerprint.length||delete t.fingerprint}let un,Wu,Vu,Ot;function _v(t){const e=V._sentryDebugIds,n=V._debugIds;if(!e&&!n)return{};const s=e?Object.keys(e):[],r=n?Object.keys(n):[];if(Ot&&s.length===Wu&&r.length===Vu)return Ot;Wu=s.length,Vu=r.length,Ot={},un||(un={});const i=(o,a)=>{for(const c of o){const l=a[c],u=un?.[c];if(u&&Ot&&l)Ot[u[0]]=l,un&&(un[c]=[u[0],l]);else if(l){const d=t(c);for(let h=d.length-1;h>=0;h--){const p=d[h]?.filename;if(p&&Ot&&un){Ot[p]=l,un[c]=[p,l];break}}}}};return e&&i(s,e),n&&i(r,n),Ot}function yv(t,e,n,s,r,i){const{normalizeDepth:o=3,normalizeMaxBreadth:a=1e3}=t,c={...e,event_id:e.event_id||n.event_id||$e(),timestamp:e.timestamp||Nr()},l=n.integrations||t.integrations.map(m=>m.name);vv(c,t),bv(c,l),r&&r.emit("applyFrameMetadata",e),e.type===void 0&&wv(c,t.stackParser);const u=Sv(s,n.captureContext);n.mechanism&&ls(c,n.mechanism);const d=r?r.getEventProcessors():[],h=dy().getScopeData();if(i){const m=i.getScopeData();Hu(h,m)}if(u){const m=u.getScopeData();Hu(h,m)}const f=[...n.attachments||[],...h.attachments];f.length&&(n.attachments=f),dv(c,h);const p=[...d,...h.eventProcessors];return uv(p,c,n).then(m=>(m&&Ev(m),typeof o=="number"&&o>0?Cv(m,o,a):m))}function vv(t,e){const{environment:n,release:s,dist:r,maxValueLength:i}=e;t.environment=t.environment||n||Fc,!t.release&&s&&(t.release=s),!t.dist&&r&&(t.dist=r);const o=t.request;o?.url&&(o.url=i?rf(o.url,i):o.url)}function wv(t,e){const n=_v(e);t.exception?.values?.forEach(s=>{s.stacktrace?.frames?.forEach(r=>{r.filename&&(r.debug_id=n[r.filename])})})}function Ev(t){const e={};if(t.exception?.values?.forEach(s=>{s.stacktrace?.frames?.forEach(r=>{r.debug_id&&(r.abs_path?e[r.abs_path]=r.debug_id:r.filename&&(e[r.filename]=r.debug_id),delete r.debug_id)})}),Object.keys(e).length===0)return;t.debug_meta=t.debug_meta||{},t.debug_meta.images=t.debug_meta.images||[];const n=t.debug_meta.images;Object.entries(e).forEach(([s,r])=>{n.push({type:"sourcemap",code_file:s,debug_id:r})})}function bv(t,e){e.length>0&&(t.sdk=t.sdk||{},t.sdk.integrations=[...t.sdk.integrations||[],...e])}function Cv(t,e,n){if(!t)return null;const s={...t,...t.breadcrumbs&&{breadcrumbs:t.breadcrumbs.map(r=>({...r,...r.data&&{data:pt(r.data,e,n)}}))},...t.user&&{user:pt(t.user,e,n)},...t.contexts&&{contexts:pt(t.contexts,e,n)},...t.extra&&{extra:pt(t.extra,e,n)}};return t.contexts?.trace&&s.contexts&&(s.contexts.trace=t.contexts.trace,t.contexts.trace.data&&(s.contexts.trace.data=pt(t.contexts.trace.data,e,n))),t.spans&&(s.spans=t.spans.map(r=>({...r,...r.data&&{data:pt(r.data,e,n)}}))),t.contexts?.flags&&s.contexts&&(s.contexts.flags=pt(t.contexts.flags,3,n)),s}function Sv(t,e){if(!e)return t;const n=t?t.clone():new It;return n.update(e),n}function Tv(t,e){return on().captureException(t,void 0)}function yf(t,e){return on().captureEvent(t,e)}function ju(t){const e=Lr(),n=on(),{userAgent:s}=V.navigator||{},r=ty({user:n.getUser()||e.getUser(),...s&&{userAgent:s},...t}),i=e.getSession();return i?.status==="ok"&&us(i,{status:"exited"}),vf(),e.setSession(r),r}function vf(){const t=Lr(),n=on().getSession()||t.getSession();n&&ny(n),wf(),t.setSession()}function wf(){const t=Lr(),e=Re(),n=t.getSession();n&&e&&e.captureSession(n)}function qu(t=!1){if(t){vf();return}wf()}const Iv="7";function kv(t){const e=t.protocol?`${t.protocol}:`:"",n=t.port?`:${t.port}`:"";return`${e}//${t.host}${n}${t.path?`/${t.path}`:""}/api/`}function Rv(t){return`${kv(t)}${t.projectId}/envelope/`}function Av(t,e){const n={sentry_version:Iv};return t.publicKey&&(n.sentry_key=t.publicKey),e&&(n.sentry_client=`${e.name}/${e.version}`),new URLSearchParams(n).toString()}function Nv(t,e,n){return e||`${Rv(t)}?${Av(t,n)}`}const zu=[];function Pv(t){const e={};return t.forEach(n=>{const{name:s}=n,r=e[s];r&&!r.isDefaultInstance&&n.isDefaultInstance||(e[s]=n)}),Object.values(e)}function Lv(t){const e=t.defaultIntegrations||[],n=t.integrations;e.forEach(r=>{r.isDefaultInstance=!0});let s;if(Array.isArray(n))s=[...e,...n];else if(typeof n=="function"){const r=n(e);s=Array.isArray(r)?r:[r]}else s=e;return Pv(s)}function Ov(t,e){const n={};return e.forEach(s=>{s&&Ef(t,s,n)}),n}function Gu(t,e){for(const n of e)n?.afterAllSetup&&n.afterAllSetup(t)}function Ef(t,e,n){if(n[e.name]){I&&b.log(`Integration skipped because it was already installed: ${e.name}`);return}if(n[e.name]=e,!zu.includes(e.name)&&typeof e.setupOnce=="function"&&(e.setupOnce(),zu.push(e.name)),e.setup&&typeof e.setup=="function"&&e.setup(t),typeof e.preprocessEvent=="function"){const s=e.preprocessEvent.bind(e);t.on("preprocessEvent",(r,i)=>s(r,i,t))}if(typeof e.processEvent=="function"){const s=e.processEvent.bind(e),r=Object.assign((i,o)=>s(i,o,t),{id:e.name});t.addEventProcessor(r)}I&&b.log(`Integration installed: ${e.name}`)}function Dv(t){return[{type:"log",item_count:t.length,content_type:"application/vnd.sentry.items.log+json"},{items:t}]}function xv(t,e,n,s){const r={};return e?.sdk&&(r.sdk={name:e.sdk.name,version:e.sdk.version}),n&&s&&(r.dsn=Or(s)),Is(r,[Dv(t)])}function bf(t,e){const n=e??Mv(t)??[];if(n.length===0)return;const s=t.getOptions(),r=xv(n,s._metadata,s.tunnel,t.getDsn());Cf().set(t,[]),t.emit("flushLogs"),t.sendEnvelope(r)}function Mv(t){return Cf().get(t)}function Cf(){return Cs("clientToLogBufferMap",()=>new WeakMap)}function Fv(t){return[{type:"trace_metric",item_count:t.length,content_type:"application/vnd.sentry.items.trace-metric+json"},{items:t}]}function Uv(t,e,n,s){const r={};return e?.sdk&&(r.sdk={name:e.sdk.name,version:e.sdk.version}),n&&s&&(r.dsn=Or(s)),Is(r,[Fv(t)])}function Sf(t,e){const n=e??$v(t)??[];if(n.length===0)return;const s=t.getOptions(),r=Uv(n,s._metadata,s.tunnel,t.getDsn());Tf().set(t,[]),t.emit("flushMetrics"),t.sendEnvelope(r)}function $v(t){return Tf().get(t)}function Tf(){return Cs("clientToMetricBufferMap",()=>new WeakMap)}function Bv(t,e,n){const s=[{type:"client_report"},{timestamp:Nr(),discarded_events:t}];return Is(e?{dsn:e}:{},[s])}function If(t){const e=[];t.message&&e.push(t.message);try{const n=t.exception.values[t.exception.values.length-1];n?.value&&(e.push(n.value),n.type&&e.push(`${n.type}: ${n.value}`))}catch{}return e}function Hv(t){const{trace_id:e,parent_span_id:n,span_id:s,status:r,origin:i,data:o,op:a}=t.contexts?.trace??{};return{data:o??{},description:t.transaction,op:a,parent_span_id:n,span_id:s??"",start_timestamp:t.start_timestamp??0,status:r,timestamp:t.timestamp,trace_id:e??"",origin:i,profile_id:o?.[lf],exclusive_time:o?.[uf],measurements:t.measurements,is_segment:!0}}function Wv(t){return{type:"transaction",timestamp:t.timestamp,start_timestamp:t.start_timestamp,transaction:t.description,contexts:{trace:{trace_id:t.trace_id,span_id:t.span_id,parent_span_id:t.parent_span_id,op:t.op,status:t.status,origin:t.origin,data:{...t.data,...t.profile_id&&{[lf]:t.profile_id},...t.exclusive_time&&{[uf]:t.exclusive_time}}}},measurements:t.measurements}}const Yu="Not capturing exception because it's already been captured.",Ku="Discarded session because of missing or non-string release",kf=Symbol.for("SentryInternalError"),Rf=Symbol.for("SentryDoNotSendEventError"),Vv=5e3;function li(t){return{message:t,[kf]:!0}}function Ko(t){return{message:t,[Rf]:!0}}function Ju(t){return!!t&&typeof t=="object"&&kf in t}function Xu(t){return!!t&&typeof t=="object"&&Rf in t}function Qu(t,e,n,s,r){let i=0,o,a=!1;t.on(n,()=>{i=0,clearTimeout(o),a=!1}),t.on(e,c=>{i+=s(c),i>=8e5?r(t):a||(a=!0,o=setTimeout(()=>{r(t)},Vv))}),t.on("flush",()=>{r(t)})}class jv{constructor(e){if(this._options=e,this._integrations={},this._numProcessing=0,this._outcomes={},this._hooks={},this._eventProcessors=[],e.dsn?this._dsn=xy(e.dsn):I&&b.warn("No DSN provided, client will not send events."),this._dsn){const s=Nv(this._dsn,e.tunnel,e._metadata?e._metadata.sdk:void 0);this._transport=e.transport({tunnel:this._options.tunnel,recordDroppedEvent:this.recordDroppedEvent.bind(this),...e.transportOptions,url:s})}this._options.enableLogs&&Qu(this,"afterCaptureLog","flushLogs",Yv,bf),(this._options.enableMetrics??this._options._experiments?.enableMetrics??!0)&&Qu(this,"afterCaptureMetric","flushMetrics",Gv,Sf)}captureException(e,n,s){const r=$e();if(Su(e))return I&&b.log(Yu),r;const i={event_id:r,...n};return this._process(this.eventFromException(e,i).then(o=>this._captureEvent(o,i,s))),i.event_id}captureMessage(e,n,s,r){const i={event_id:$e(),...s},o=Pc(e)?e:String(e),a=io(e)?this.eventFromMessage(o,n,i):this.eventFromException(e,i);return this._process(a.then(c=>this._captureEvent(c,i,r))),i.event_id}captureEvent(e,n,s){const r=$e();if(n?.originalException&&Su(n.originalException))return I&&b.log(Yu),r;const i={event_id:r,...n},o=e.sdkProcessingMetadata||{},a=o.capturedSpanScope,c=o.capturedSpanIsolationScope;return this._process(this._captureEvent(e,i,a||s,c)),i.event_id}captureSession(e){this.sendSession(e),us(e,{init:!1})}getDsn(){return this._dsn}getOptions(){return this._options}getSdkMetadata(){return this._options._metadata}getTransport(){return this._transport}async flush(e){const n=this._transport;if(!n)return!0;this.emit("flush");const s=await this._isClientDoneProcessing(e),r=await n.flush(e);return s&&r}async close(e){const n=await this.flush(e);return this.getOptions().enabled=!1,this.emit("close"),n}getEventProcessors(){return this._eventProcessors}addEventProcessor(e){this._eventProcessors.push(e)}init(){(this._isEnabled()||this._options.integrations.some(({name:e})=>e.startsWith("Spotlight")))&&this._setupIntegrations()}getIntegrationByName(e){return this._integrations[e]}addIntegration(e){const n=this._integrations[e.name];Ef(this,e,this._integrations),n||Gu(this,[e])}sendEvent(e,n={}){this.emit("beforeSendEvent",e,n);let s=lv(e,this._dsn,this._options._metadata,this._options.tunnel);for(const r of n.attachments||[])s=tv(s,rv(r));this.sendEnvelope(s).then(r=>this.emit("afterSendEvent",e,r))}sendSession(e){const{release:n,environment:s=Fc}=this._options;if("aggregates"in e){const i=e.attrs||{};if(!i.release&&!n){I&&b.warn(Ku);return}i.release=i.release||n,i.environment=i.environment||s,e.attrs=i}else{if(!e.release&&!n){I&&b.warn(Ku);return}e.release=e.release||n,e.environment=e.environment||s}this.emit("beforeSendSession",e);const r=cv(e,this._dsn,this._options._metadata,this._options.tunnel);this.sendEnvelope(r)}recordDroppedEvent(e,n,s=1){if(this._options.sendClientReports){const r=`${e}:${n}`;I&&b.log(`Recording outcome: "${r}"${s>1?` (${s} times)`:""}`),this._outcomes[r]=(this._outcomes[r]||0)+s}}on(e,n){const s=this._hooks[e]=this._hooks[e]||new Set,r=(...i)=>n(...i);return s.add(r),()=>{s.delete(r)}}emit(e,...n){const s=this._hooks[e];s&&s.forEach(r=>r(...n))}async sendEnvelope(e){if(this.emit("beforeEnvelope",e),this._isEnabled()&&this._transport)try{return await this._transport.send(e)}catch(n){return I&&b.error("Error while sending envelope:",n),{}}return I&&b.error("Transport disabled"),{}}_setupIntegrations(){const{integrations:e}=this._options;this._integrations=Ov(this,e),Gu(this,e)}_updateSessionFromEvent(e,n){let s=n.level==="fatal",r=!1;const i=n.exception?.values;if(i){r=!0,s=!1;for(const c of i)if(c.mechanism?.handled===!1){s=!0;break}}const o=e.status==="ok";(o&&e.errors===0||o&&s)&&(us(e,{...s&&{status:"crashed"},errors:e.errors||Number(r||s)}),this.captureSession(e))}async _isClientDoneProcessing(e){let n=0;for(;!e||n<e;){if(await new Promise(s=>setTimeout(s,1)),!this._numProcessing)return!0;n++}return!1}_isEnabled(){return this.getOptions().enabled!==!1&&this._transport!==void 0}_prepareEvent(e,n,s,r){const i=this.getOptions(),o=Object.keys(this._integrations);return!n.integrations&&o?.length&&(n.integrations=o),this.emit("preprocessEvent",e,n),e.type||r.setLastEventId(e.event_id||n.event_id),yv(i,e,n,s,this,r).then(a=>{if(a===null)return a;this.emit("postprocessEvent",a,n),a.contexts={trace:fy(s),...a.contexts};const c=Yy(this,s);return a.sdkProcessingMetadata={dynamicSamplingContext:c,...a.sdkProcessingMetadata},a})}_captureEvent(e,n={},s=on(),r=Lr()){return I&&La(e)&&b.log(`Captured error event \`${If(e)[0]||"<unknown>"}\``),this._processEvent(e,n,s,r).then(i=>i.event_id,i=>{I&&(Xu(i)?b.log(i.message):Ju(i)?b.warn(i.message):b.warn(i))})}_processEvent(e,n,s,r){const i=this.getOptions(),{sampleRate:o}=i,a=Af(e),c=La(e),l=e.type||"error",u=`before send for type \`${l}\``,d=typeof o>"u"?void 0:My(o);if(c&&typeof d=="number"&&Math.random()>d)return this.recordDroppedEvent("sample_rate","error"),Uc(Ko(`Discarding event because it's not included in the random sample (sampling rate = ${o})`));const h=l==="replay_event"?"replay":l;return this._prepareEvent(e,n,s,r).then(f=>{if(f===null)throw this.recordDroppedEvent("event_processor",h),Ko("An event processor returned `null`, will not send event.");if(n.data&&n.data.__sentry__===!0)return f;const _=zv(this,i,f,n);return qv(_,u)}).then(f=>{if(f===null){if(this.recordDroppedEvent("before_send",h),a){const A=1+(e.spans||[]).length;this.recordDroppedEvent("before_send","span",A)}throw Ko(`${u} returned \`null\`, will not send event.`)}const p=s.getSession()||r.getSession();if(c&&p&&this._updateSessionFromEvent(p,f),a){const m=f.sdkProcessingMetadata?.spanCountBeforeProcessing||0,A=f.spans?f.spans.length:0,x=m-A;x>0&&this.recordDroppedEvent("before_send","span",x)}const _=f.transaction_info;if(a&&_&&f.transaction!==e.transaction){const m="custom";f.transaction_info={..._,source:m}}return this.sendEvent(f,n),f}).then(null,f=>{throw Xu(f)||Ju(f)?f:(this.captureException(f,{mechanism:{handled:!1,type:"internal"},data:{__sentry__:!0},originalException:f}),li(`Event processing pipeline threw an error, original event will not be sent. Details have been sent as a new event.
Reason: ${f}`))})}_process(e){this._numProcessing++,e.then(n=>(this._numProcessing--,n),n=>(this._numProcessing--,n))}_clearOutcomes(){const e=this._outcomes;return this._outcomes={},Object.entries(e).map(([n,s])=>{const[r,i]=n.split(":");return{reason:r,category:i,quantity:s}})}_flushOutcomes(){I&&b.log("Flushing outcomes...");const e=this._clearOutcomes();if(e.length===0){I&&b.log("No outcomes to send");return}if(!this._dsn){I&&b.log("No dsn provided, will not send outcomes");return}I&&b.log("Sending outcomes:",e);const n=Bv(e,this._options.tunnel&&Or(this._dsn));this.sendEnvelope(n)}}function qv(t,e){const n=`${e} must return \`null\` or a valid event.`;if(Ar(t))return t.then(s=>{if(!lr(s)&&s!==null)throw li(n);return s},s=>{throw li(`${e} rejected with ${s}`)});if(!lr(t)&&t!==null)throw li(n);return t}function zv(t,e,n,s){const{beforeSend:r,beforeSendTransaction:i,beforeSendSpan:o,ignoreSpans:a}=e;let c=n;if(La(c)&&r)return r(c,s);if(Af(c)){if(o||a){const l=Hv(c);if(a?.length&&Mu(l,a))return null;if(o){const u=o(l);u?c=Pr(n,Wv(u)):Du()}if(c.spans){const u=[],d=c.spans;for(const f of d){if(a?.length&&Mu(f,a)){qy(d,f);continue}if(o){const p=o(f);p?u.push(p):(Du(),u.push(f))}else u.push(f)}const h=c.spans.length-u.length;h&&t.recordDroppedEvent("before_send","span",h),c.spans=u}}if(i){if(c.spans){const l=c.spans.length;c.sdkProcessingMetadata={...n.sdkProcessingMetadata,spanCountBeforeProcessing:l}}return i(c,s)}}return c}function La(t){return t.type===void 0}function Af(t){return t.type==="transaction"}function Gv(t){let e=0;return t.name&&(e+=t.name.length*2),e+=8,e+Nf(t.attributes)}function Yv(t){let e=0;return t.message&&(e+=t.message.length*2),e+Nf(t.attributes)}function Nf(t){if(!t)return 0;let e=0;return Object.values(t).forEach(n=>{Array.isArray(n)?e+=n.length*Zu(n[0]):io(n)?e+=Zu(n):e+=100}),e}function Zu(t){return typeof t=="string"?t.length*2:typeof t=="number"?8:typeof t=="boolean"?4:0}function Kv(t,e){e.debug===!0&&(I?b.enable():Ss(()=>{console.warn("[Sentry] Cannot initialize SDK with `debug` option using a non-debug bundle.")})),on().update(e.initialScope);const s=new t(e);return Jv(s),s.init(),s}function Jv(t){on().setClient(t)}const Pf=Symbol.for("SentryBufferFullError");function Lf(t=100){const e=new Set;function n(){return e.size<t}function s(o){e.delete(o)}function r(o){if(!n())return Uc(Pf);const a=o();return e.add(a),a.then(()=>s(a),()=>s(a)),a}function i(o){if(!e.size)return co(!0);const a=Promise.allSettled(Array.from(e)).then(()=>!0);if(!o)return a;const c=[a,new Promise(l=>setTimeout(()=>l(!1),o))];return Promise.race(c)}return{get $(){return Array.from(e)},add:r,drain:i}}const Xv=60*1e3;function Qv(t,e=Date.now()){const n=parseInt(`${t}`,10);if(!isNaN(n))return n*1e3;const s=Date.parse(`${t}`);return isNaN(s)?Xv:s-e}function Zv(t,e){return t[e]||t.all||0}function ew(t,e,n=Date.now()){return Zv(t,e)>n}function tw(t,{statusCode:e,headers:n},s=Date.now()){const r={...t},i=n?.["x-sentry-rate-limits"],o=n?.["retry-after"];if(i)for(const a of i.trim().split(",")){const[c,l,,,u]=a.split(":",5),d=parseInt(c,10),h=(isNaN(d)?60:d)*1e3;if(!l)r.all=s+h;else for(const f of l.split(";"))f==="metric_bucket"?(!u||u.split(";").includes("custom"))&&(r[f]=s+h):r[f]=s+h}else o?r.all=s+Qv(o,s):e===429&&(r.all=s+60*1e3);return r}const nw=64;function sw(t,e,n=Lf(t.bufferSize||nw)){let s={};const r=o=>n.drain(o);function i(o){const a=[];if(Fu(o,(d,h)=>{const f=Uu(h);ew(s,f)?t.recordDroppedEvent("ratelimit_backoff",f):a.push(d)}),a.length===0)return Promise.resolve({});const c=Is(o[0],a),l=d=>{Fu(c,(h,f)=>{t.recordDroppedEvent(d,Uu(f))})},u=()=>e({body:nv(c)}).then(d=>(d.statusCode!==void 0&&(d.statusCode<200||d.statusCode>=300)&&I&&b.warn(`Sentry responded with status code ${d.statusCode} to sent event.`),s=tw(s,d),d),d=>{throw l("network_error"),I&&b.error("Encountered error running transport request:",d),d});return n.add(u).then(d=>d,d=>{if(d===Pf)return I&&b.error("Skipped sending event because buffer is full."),l("queue_overflow"),Promise.resolve({});throw d})}return{send:i,flush:r}}function Jo(t){if(!t)return{};const e=t.match(/^(([^:/?#]+):)?(\/\/([^/?#]*))?([^?#]*)(\?([^#]*))?(#(.*))?$/);if(!e)return{};const n=e[6]||"",s=e[8]||"";return{host:e[4],path:e[5],protocol:e[2],search:n,hash:s,relative:e[5]+n+s}}function rw(t){"aggregates"in t?t.attrs?.ip_address===void 0&&(t.attrs={...t.attrs,ip_address:"{{auto}}"}):t.ipAddress===void 0&&(t.ipAddress="{{auto}}")}function iw(t,e,n=[e],s="npm"){const r=t._metadata||{};r.sdk||(r.sdk={name:`sentry.javascript.${e}`,packages:n.map(i=>({name:`${s}:@sentry/${i}`,version:wn})),version:wn}),t._metadata=r}const ow=100;function kn(t,e){const n=Re(),s=Lr();if(!n)return;const{beforeBreadcrumb:r=null,maxBreadcrumbs:i=ow}=n.getOptions();if(i<=0)return;const a={timestamp:Nr(),...t},c=r?Ss(()=>r(a,e)):a;c!==null&&(n.emit&&n.emit("beforeAddBreadcrumb",c,e),s.addBreadcrumb(c,i))}let ed;const aw="FunctionToString",td=new WeakMap,cw=(()=>({name:aw,setupOnce(){ed=Function.prototype.toString;try{Function.prototype.toString=function(...t){const e=Dc(this),n=td.has(Re())&&e!==void 0?e:this;return ed.apply(n,t)}}catch{}},setup(t){td.set(t,!0)}})),lw=cw,uw=[/^Script error\.?$/,/^Javascript error: Script error\.? on line 0$/,/^ResizeObserver loop completed with undelivered notifications.$/,/^Cannot redefine property: googletag$/,/^Can't find variable: gmo$/,/^undefined is not an object \(evaluating 'a\.[A-Z]'\)$/,`can't redefine non-configurable property "solana"`,"vv().getRestrictions is not a function. (In 'vv().getRestrictions(1,a)', 'vv().getRestrictions' is undefined)","Can't find variable: _AutofillCallbackHandler",/^Non-Error promise rejection captured with value: Object Not Found Matching Id:\d+, MethodName:simulateEvent, ParamCount:\d+$/,/^Java exception was raised during method invocation$/],dw="EventFilters",hw=(t={})=>{let e;return{name:dw,setup(n){const s=n.getOptions();e=nd(t,s)},processEvent(n,s,r){if(!e){const i=r.getOptions();e=nd(t,i)}return pw(n,e)?null:n}}},fw=((t={})=>({...hw(t),name:"InboundFilters"}));function nd(t={},e={}){return{allowUrls:[...t.allowUrls||[],...e.allowUrls||[]],denyUrls:[...t.denyUrls||[],...e.denyUrls||[]],ignoreErrors:[...t.ignoreErrors||[],...e.ignoreErrors||[],...t.disableErrorDefaults?[]:uw],ignoreTransactions:[...t.ignoreTransactions||[],...e.ignoreTransactions||[]]}}function pw(t,e){if(t.type){if(t.type==="transaction"&&mw(t,e.ignoreTransactions))return I&&b.warn(`Event dropped due to being matched by \`ignoreTransactions\` option.
Event: ${mn(t)}`),!0}else{if(gw(t,e.ignoreErrors))return I&&b.warn(`Event dropped due to being matched by \`ignoreErrors\` option.
Event: ${mn(t)}`),!0;if(ww(t))return I&&b.warn(`Event dropped due to not having an error message, error type or stacktrace.
Event: ${mn(t)}`),!0;if(_w(t,e.denyUrls))return I&&b.warn(`Event dropped due to being matched by \`denyUrls\` option.
Event: ${mn(t)}.
Url: ${Ei(t)}`),!0;if(!yw(t,e.allowUrls))return I&&b.warn(`Event dropped due to not being matched by \`allowUrls\` option.
Event: ${mn(t)}.
Url: ${Ei(t)}`),!0}return!1}function gw(t,e){return e?.length?If(t).some(n=>ao(n,e)):!1}function mw(t,e){if(!e?.length)return!1;const n=t.transaction;return n?ao(n,e):!1}function _w(t,e){if(!e?.length)return!1;const n=Ei(t);return n?ao(n,e):!1}function yw(t,e){if(!e?.length)return!0;const n=Ei(t);return n?ao(n,e):!0}function vw(t=[]){for(let e=t.length-1;e>=0;e--){const n=t[e];if(n&&n.filename!=="<anonymous>"&&n.filename!=="[native code]")return n.filename||null}return null}function Ei(t){try{const n=[...t.exception?.values??[]].reverse().find(s=>s.mechanism?.parent_id===void 0&&s.stacktrace?.frames?.length)?.stacktrace?.frames;return n?vw(n):null}catch{return I&&b.error(`Cannot extract url for event ${mn(t)}`),null}}function ww(t){return t.exception?.values?.length?!t.message&&!t.exception.values.some(e=>e.stacktrace||e.type&&e.type!=="Error"||e.value):!1}function Ew(t,e,n,s,r,i){if(!r.exception?.values||!i||!Qt(i.originalException,Error))return;const o=r.exception.values.length>0?r.exception.values[r.exception.values.length-1]:void 0;o&&(r.exception.values=Oa(t,e,s,i.originalException,n,r.exception.values,o,0))}function Oa(t,e,n,s,r,i,o,a){if(i.length>=n+1)return i;let c=[...i];if(Qt(s[r],Error)){sd(o,a);const l=t(e,s[r]),u=c.length;rd(l,r,u,a),c=Oa(t,e,n,s[r],r,[l,...c],l,u)}return Array.isArray(s.errors)&&s.errors.forEach((l,u)=>{if(Qt(l,Error)){sd(o,a);const d=t(e,l),h=c.length;rd(d,`errors[${u}]`,h,a),c=Oa(t,e,n,l,r,[d,...c],d,h)}}),c}function sd(t,e){t.mechanism={handled:!0,type:"auto.core.linked_errors",...t.mechanism,...t.type==="AggregateError"&&{is_exception_group:!0},exception_id:e}}function rd(t,e,n,s){t.mechanism={handled:!0,...t.mechanism,type:"chained",source:e,exception_id:n,parent_id:s}}function bw(t){const e="console";$n(e,t),Bn(e,Cw)}function Cw(){"console"in V&&A_.forEach(function(t){t in V.console&&De(V.console,t,function(e){return wi[t]=e,function(...n){Ze("console",{args:n,level:t}),wi[t]?.apply(V.console,n)}})})}function Sw(t){return t==="warn"?"warning":["fatal","error","warning","log","info","debug"].includes(t)?t:"log"}const Tw="Dedupe",Iw=(()=>{let t;return{name:Tw,processEvent(e){if(e.type)return e;try{if(Rw(e,t))return I&&b.warn("Event dropped due to being a duplicate of previously captured event."),null}catch{}return t=e}}}),kw=Iw;function Rw(t,e){return e?!!(Aw(t,e)||Nw(t,e)):!1}function Aw(t,e){const n=t.message,s=e.message;return!(!n&&!s||n&&!s||!n&&s||n!==s||!Df(t,e)||!Of(t,e))}function Nw(t,e){const n=id(e),s=id(t);return!(!n||!s||n.type!==s.type||n.value!==s.value||!Df(t,e)||!Of(t,e))}function Of(t,e){let n=yu(t),s=yu(e);if(!n&&!s)return!0;if(n&&!s||!n&&s||(n=n,s=s,s.length!==n.length))return!1;for(let r=0;r<s.length;r++){const i=s[r],o=n[r];if(i.filename!==o.filename||i.lineno!==o.lineno||i.colno!==o.colno||i.function!==o.function)return!1}return!0}function Df(t,e){let n=t.fingerprint,s=e.fingerprint;if(!n&&!s)return!0;if(n&&!s||!n&&s)return!1;n=n,s=s;try{return n.join("")===s.join("")}catch{return!1}}function id(t){return t.exception?.values?.[0]}function xf(t){if(t!==void 0)return t>=400&&t<500?"warning":t>=500?"error":void 0}const dr=V;function Pw(){return"history"in dr&&!!dr.history}function Lw(){if(!("fetch"in dr))return!1;try{return new Headers,new Request("data:,"),new Response,!0}catch{return!1}}function Da(t){return t&&/^function\s+\w+\(\)\s+\{\s+\[native code\]\s+\}$/.test(t.toString())}function Ow(){if(typeof EdgeRuntime=="string")return!0;if(!Lw())return!1;if(Da(dr.fetch))return!0;let t=!1;const e=dr.document;if(e&&typeof e.createElement=="function")try{const n=e.createElement("iframe");n.hidden=!0,e.head.appendChild(n),n.contentWindow?.fetch&&(t=Da(n.contentWindow.fetch)),e.head.removeChild(n)}catch(n){I&&b.warn("Could not create sandbox iframe for pure fetch check, bailing to window.fetch: ",n)}return t}function Dw(t,e){const n="fetch";$n(n,t),Bn(n,()=>xw(void 0,e))}function xw(t,e=!1){e&&!Ow()||De(V,"fetch",function(n){return function(...s){const r=new Error,{method:i,url:o}=Mw(s),a={args:s,fetchData:{method:i,url:o},startTimestamp:bt()*1e3,virtualError:r,headers:Fw(s)};return Ze("fetch",{...a}),n.apply(V,s).then(async c=>(Ze("fetch",{...a,endTimestamp:bt()*1e3,response:c}),c),c=>{if(Ze("fetch",{...a,endTimestamp:bt()*1e3,error:c}),Nc(c)&&c.stack===void 0&&(c.stack=r.stack,In(c,"framesToPop",1)),c instanceof TypeError&&(c.message==="Failed to fetch"||c.message==="Load failed"||c.message==="NetworkError when attempting to fetch resource."))try{const l=new URL(a.fetchData.url);c.message=`${c.message} (${l.host})`}catch{}throw c})}})}function xa(t,e){return!!t&&typeof t=="object"&&!!t[e]}function od(t){return typeof t=="string"?t:t?xa(t,"url")?t.url:t.toString?t.toString():"":""}function Mw(t){if(t.length===0)return{method:"GET",url:""};if(t.length===2){const[n,s]=t;return{url:od(n),method:xa(s,"method")?String(s.method).toUpperCase():"GET"}}const e=t[0];return{url:od(e),method:xa(e,"method")?String(e.method).toUpperCase():"GET"}}function Fw(t){const[e,n]=t;try{if(typeof n=="object"&&n!==null&&"headers"in n&&n.headers)return new Headers(n.headers);if(z_(e))return new Headers(e.headers)}catch{}}function Uw(){return"npm"}const te=V;let Ma=0;function Mf(){return Ma>0}function $w(){Ma++,setTimeout(()=>{Ma--})}function hs(t,e={}){function n(r){return typeof r=="function"}if(!n(t))return t;try{const r=t.__sentry_wrapped__;if(r)return typeof r=="function"?r:t;if(Dc(t))return t}catch{return t}const s=function(...r){try{const i=r.map(o=>hs(o,e));return t.apply(this,i)}catch(i){throw $w(),hy(o=>{o.addEventProcessor(a=>(e.mechanism&&(ka(a,void 0),ls(a,e.mechanism)),a.extra={...a.extra,arguments:r},a)),Tv(i)}),i}};try{for(const r in t)Object.prototype.hasOwnProperty.call(t,r)&&(s[r]=t[r])}catch{}nf(s,t),In(t,"__sentry_wrapped__",s);try{Object.getOwnPropertyDescriptor(s,"name").configurable&&Object.defineProperty(s,"name",{get(){return t.name}})}catch{}return s}function Bw(){const t=Oc(),{referrer:e}=te.document||{},{userAgent:n}=te.navigator||{},s={...e&&{Referer:e},...n&&{"User-Agent":n}};return{url:t,headers:s}}function $c(t,e){const n=Bc(t,e),s={type:qw(e),value:zw(e)};return n.length&&(s.stacktrace={frames:n}),s.type===void 0&&s.value===""&&(s.value="Unrecoverable error caught"),s}function Hw(t,e,n,s){const i=Re()?.getOptions().normalizeDepth,o=Xw(e),a={__serialized__:mf(e,i)};if(o)return{exception:{values:[$c(t,o)]},extra:a};const c={exception:{values:[{type:oo(e)?e.constructor.name:s?"UnhandledRejection":"Error",value:Kw(e,{isUnhandledRejection:s})}]},extra:a};if(n){const l=Bc(t,n);l.length&&(c.exception.values[0].stacktrace={frames:l})}return c}function Xo(t,e){return{exception:{values:[$c(t,e)]}}}function Bc(t,e){const n=e.stacktrace||e.stack||"",s=Vw(e),r=jw(e);try{return t(n,s,r)}catch{}return[]}const Ww=/Minified React error #\d+;/i;function Vw(t){return t&&Ww.test(t.message)?1:0}function jw(t){return typeof t.framesToPop=="number"?t.framesToPop:0}function Ff(t){return typeof WebAssembly<"u"&&typeof WebAssembly.Exception<"u"?t instanceof WebAssembly.Exception:!1}function qw(t){const e=t?.name;return!e&&Ff(t)?t.message&&Array.isArray(t.message)&&t.message.length==2?t.message[0]:"WebAssembly.Exception":e}function zw(t){const e=t?.message;return Ff(t)?Array.isArray(t.message)&&t.message.length==2?t.message[1]:"wasm exception":e?e.error&&typeof e.error.message=="string"?e.error.message:e:"No error message"}function Gw(t,e,n,s){const r=n?.syntheticException||void 0,i=Hc(t,e,r,s);return ls(i),i.level="error",n?.event_id&&(i.event_id=n.event_id),co(i)}function Yw(t,e,n="info",s,r){const i=s?.syntheticException||void 0,o=Fa(t,e,i,r);return o.level=n,s?.event_id&&(o.event_id=s.event_id),co(o)}function Hc(t,e,n,s,r){let i;if(Zh(e)&&e.error)return Xo(t,e.error);if(wu(e)||W_(e)){const o=e;if("stack"in e)i=Xo(t,e);else{const a=o.name||(wu(o)?"DOMError":"DOMException"),c=o.message?`${a}: ${o.message}`:a;i=Fa(t,c,n,s),ka(i,c)}return"code"in o&&(i.tags={...i.tags,"DOMException.code":`${o.code}`}),i}return Nc(e)?Xo(t,e):lr(e)||oo(e)?(i=Hw(t,e,n,r),ls(i,{synthetic:!0}),i):(i=Fa(t,e,n,s),ka(i,`${e}`),ls(i,{synthetic:!0}),i)}function Fa(t,e,n,s){const r={};if(s&&n){const i=Bc(t,n);i.length&&(r.exception={values:[{value:e,stacktrace:{frames:i}}]}),ls(r,{synthetic:!0})}if(Pc(e)){const{__sentry_template_string__:i,__sentry_template_values__:o}=e;return r.logentry={message:i,params:o},r}return r.message=e,r}function Kw(t,{isUnhandledRejection:e}){const n=J_(t),s=e?"promise rejection":"exception";return Zh(t)?`Event \`ErrorEvent\` captured as ${s} with message \`${t.message}\``:oo(t)?`Event \`${Jw(t)}\` (type=${t.type}) captured as ${s}`:`Object captured as ${s} with keys: ${n}`}function Jw(t){try{const e=Object.getPrototypeOf(t);return e?e.constructor.name:void 0}catch{}}function Xw(t){for(const e in t)if(Object.prototype.hasOwnProperty.call(t,e)){const n=t[e];if(n instanceof Error)return n}}class Qw extends jv{constructor(e){const n=Zw(e),s=te.SENTRY_SDK_SOURCE||Uw();iw(n,"browser",["browser"],s),n._metadata?.sdk&&(n._metadata.sdk.settings={infer_ip:n.sendDefaultPii?"auto":"never",...n._metadata.sdk.settings}),super(n);const{sendDefaultPii:r,sendClientReports:i,enableLogs:o,_experiments:a,enableMetrics:c}=this._options,l=c??a?.enableMetrics??!0;te.document&&(i||o||l)&&te.document.addEventListener("visibilitychange",()=>{te.document.visibilityState==="hidden"&&(i&&this._flushOutcomes(),o&&bf(this),l&&Sf(this))}),r&&this.on("beforeSendSession",rw)}eventFromException(e,n){return Gw(this._options.stackParser,e,n,this._options.attachStacktrace)}eventFromMessage(e,n="info",s){return Yw(this._options.stackParser,e,n,s,this._options.attachStacktrace)}_prepareEvent(e,n,s,r){return e.platform=e.platform||"javascript",super._prepareEvent(e,n,s,r)}}function Zw(t){return{release:typeof __SENTRY_RELEASE__=="string"?__SENTRY_RELEASE__:te.SENTRY_RELEASE?.id,sendClientReports:!0,parentSpanIsAlwaysRootSpan:!0,...t}}const eE=typeof __SENTRY_DEBUG__>"u"||__SENTRY_DEBUG__,Se=V,tE=1e3;let ad,Ua,$a;function nE(t){$n("dom",t),Bn("dom",sE)}function sE(){if(!Se.document)return;const t=Ze.bind(null,"dom"),e=cd(t,!0);Se.document.addEventListener("click",e,!1),Se.document.addEventListener("keypress",e,!1),["EventTarget","Node"].forEach(n=>{const r=Se[n]?.prototype;r?.hasOwnProperty?.("addEventListener")&&(De(r,"addEventListener",function(i){return function(o,a,c){if(o==="click"||o=="keypress")try{const l=this.__sentry_instrumentation_handlers__=this.__sentry_instrumentation_handlers__||{},u=l[o]=l[o]||{refCount:0};if(!u.handler){const d=cd(t);u.handler=d,i.call(this,o,d,c)}u.refCount++}catch{}return i.call(this,o,a,c)}}),De(r,"removeEventListener",function(i){return function(o,a,c){if(o==="click"||o=="keypress")try{const l=this.__sentry_instrumentation_handlers__||{},u=l[o];u&&(u.refCount--,u.refCount<=0&&(i.call(this,o,u.handler,c),u.handler=void 0,delete l[o]),Object.keys(l).length===0&&delete this.__sentry_instrumentation_handlers__)}catch{}return i.call(this,o,a,c)}}))})}function rE(t){if(t.type!==Ua)return!1;try{if(!t.target||t.target._sentryId!==$a)return!1}catch{}return!0}function iE(t,e){return t!=="keypress"?!1:e?.tagName?!(e.tagName==="INPUT"||e.tagName==="TEXTAREA"||e.isContentEditable):!0}function cd(t,e=!1){return n=>{if(!n||n._sentryCaptured)return;const s=oE(n);if(iE(n.type,s))return;In(n,"_sentryCaptured",!0),s&&!s._sentryId&&In(s,"_sentryId",$e());const r=n.type==="keypress"?"input":n.type;rE(n)||(t({event:n,name:r,global:e}),Ua=n.type,$a=s?s._sentryId:void 0),clearTimeout(ad),ad=Se.setTimeout(()=>{$a=void 0,Ua=void 0},tE)}}function oE(t){try{return t.target}catch{return null}}let Jr;function Uf(t){const e="history";$n(e,t),Bn(e,aE)}function aE(){if(Se.addEventListener("popstate",()=>{const e=Se.location.href,n=Jr;if(Jr=e,n===e)return;Ze("history",{from:n,to:e})}),!Pw())return;function t(e){return function(...n){const s=n.length>2?n[2]:void 0;if(s){const r=Jr,i=cE(String(s));if(Jr=i,r===i)return e.apply(this,n);Ze("history",{from:r,to:i})}return e.apply(this,n)}}De(Se.history,"pushState",t),De(Se.history,"replaceState",t)}function cE(t){try{return new URL(t,Se.location.origin).toString()}catch{return t}}const ui={};function lE(t){const e=ui[t];if(e)return e;let n=Se[t];if(Da(n))return ui[t]=n.bind(Se);const s=Se.document;if(s&&typeof s.createElement=="function")try{const r=s.createElement("iframe");r.hidden=!0,s.head.appendChild(r);const i=r.contentWindow;i?.[t]&&(n=i[t]),s.head.removeChild(r)}catch(r){eE&&b.warn(`Could not create sandbox iframe for ${t} check, bailing to window.${t}: `,r)}return n&&(ui[t]=n.bind(Se))}function uE(t){ui[t]=void 0}const Ys="__sentry_xhr_v3__";function dE(t){$n("xhr",t),Bn("xhr",hE)}function hE(){if(!Se.XMLHttpRequest)return;const t=XMLHttpRequest.prototype;t.open=new Proxy(t.open,{apply(e,n,s){const r=new Error,i=bt()*1e3,o=Et(s[0])?s[0].toUpperCase():void 0,a=fE(s[1]);if(!o||!a)return e.apply(n,s);n[Ys]={method:o,url:a,request_headers:{}},o==="POST"&&a.match(/sentry_key/)&&(n.__sentry_own_request__=!0);const c=()=>{const l=n[Ys];if(l&&n.readyState===4){try{l.status_code=n.status}catch{}const u={endTimestamp:bt()*1e3,startTimestamp:i,xhr:n,virtualError:r};Ze("xhr",u)}};return"onreadystatechange"in n&&typeof n.onreadystatechange=="function"?n.onreadystatechange=new Proxy(n.onreadystatechange,{apply(l,u,d){return c(),l.apply(u,d)}}):n.addEventListener("readystatechange",c),n.setRequestHeader=new Proxy(n.setRequestHeader,{apply(l,u,d){const[h,f]=d,p=u[Ys];return p&&Et(h)&&Et(f)&&(p.request_headers[h.toLowerCase()]=f),l.apply(u,d)}}),e.apply(n,s)}}),t.send=new Proxy(t.send,{apply(e,n,s){const r=n[Ys];if(!r)return e.apply(n,s);s[0]!==void 0&&(r.body=s[0]);const i={startTimestamp:bt()*1e3,xhr:n};return Ze("xhr",i),e.apply(n,s)}})}function fE(t){if(Et(t))return t;try{return t.toString()}catch{}}const pE=40;function gE(t,e=lE("fetch")){let n=0,s=0;async function r(i){const o=i.body.length;n+=o,s++;const a={body:i.body,method:"POST",referrerPolicy:"strict-origin",headers:t.headers,keepalive:n<=6e4&&s<15,...t.fetchOptions};try{const c=await e(t.url,a);return{statusCode:c.status,headers:{"x-sentry-rate-limits":c.headers.get("X-Sentry-Rate-Limits"),"retry-after":c.headers.get("Retry-After")}}}catch(c){throw uE("fetch"),c}finally{n-=o,s--}}return sw(t,r,Lf(t.bufferSize||pE))}const mE=30,_E=50;function Ba(t,e,n,s){const r={filename:t,function:e==="<anonymous>"?Tn:e,in_app:!0};return n!==void 0&&(r.lineno=n),s!==void 0&&(r.colno=s),r}const yE=/^\s*at (\S+?)(?::(\d+))(?::(\d+))\s*$/i,vE=/^\s*at (?:(.+?\)(?: \[.+\])?|.*?) ?\((?:address at )?)?(?:async )?((?:<anonymous>|[-a-z]+:|.*bundle|\/)?.*?)(?::(\d+))?(?::(\d+))?\)?\s*$/i,wE=/\((\S*)(?::(\d+))(?::(\d+))\)/,EE=/at (.+?) ?\(data:(.+?),/,bE=t=>{const e=t.match(EE);if(e)return{filename:`<data:${e[2]}>`,function:e[1]};const n=yE.exec(t);if(n){const[,r,i,o]=n;return Ba(r,Tn,+i,+o)}const s=vE.exec(t);if(s){if(s[2]&&s[2].indexOf("eval")===0){const a=wE.exec(s[2]);a&&(s[2]=a[1],s[3]=a[2],s[4]=a[3])}const[i,o]=$f(s[1]||Tn,s[2]);return Ba(o,i,s[3]?+s[3]:void 0,s[4]?+s[4]:void 0)}},CE=[mE,bE],SE=/^\s*(.*?)(?:\((.*?)\))?(?:^|@)?((?:[-a-z]+)?:\/.*?|\[native code\]|[^@]*(?:bundle|\d+\.js)|\/[\w\-. /=]+)(?::(\d+))?(?::(\d+))?\s*$/i,TE=/(\S+) line (\d+)(?: > eval line \d+)* > eval/i,IE=t=>{const e=SE.exec(t);if(e){if(e[3]&&e[3].indexOf(" > eval")>-1){const i=TE.exec(e[3]);i&&(e[1]=e[1]||"eval",e[3]=i[1],e[4]=i[2],e[5]="")}let s=e[3],r=e[1]||Tn;return[r,s]=$f(r,s),Ba(s,r,e[4]?+e[4]:void 0,e[5]?+e[5]:void 0)}},kE=[_E,IE],RE=[CE,kE],AE=Jh(...RE),$f=(t,e)=>{const n=t.indexOf("safari-extension")!==-1,s=t.indexOf("safari-web-extension")!==-1;return n||s?[t.indexOf("@")!==-1?t.split("@")[0]:Tn,n?`safari-extension:${e}`:`safari-web-extension:${e}`]:[t,e]},lo=typeof __SENTRY_DEBUG__>"u"||__SENTRY_DEBUG__,Xr=1024,NE="Breadcrumbs",PE=((t={})=>{const e={console:!0,dom:!0,fetch:!0,history:!0,sentry:!0,xhr:!0,...t};return{name:NE,setup(n){e.console&&bw(xE(n)),e.dom&&nE(DE(n,e.dom)),e.xhr&&dE(ME(n)),e.fetch&&Dw(FE(n)),e.history&&Uf(UE(n)),e.sentry&&n.on("beforeSendEvent",OE(n))}}}),LE=PE;function OE(t){return function(n){Re()===t&&kn({category:`sentry.${n.type==="transaction"?"transaction":"event"}`,event_id:n.event_id,level:n.level,message:mn(n)},{event:n})}}function DE(t,e){return function(s){if(Re()!==t)return;let r,i,o=typeof e=="object"?e.serializeAttribute:void 0,a=typeof e=="object"&&typeof e.maxStringLength=="number"?e.maxStringLength:void 0;a&&a>Xr&&(lo&&b.warn(`\`dom.maxStringLength\` cannot exceed ${Xr}, but a value of ${a} was configured. Sentry will use ${Xr} instead.`),a=Xr),typeof o=="string"&&(o=[o]);try{const l=s.event,u=$E(l)?l.target:l;r=tf(u,{keyAttrs:o,maxStringLength:a}),i=K_(u)}catch{r="<unknown>"}if(r.length===0)return;const c={category:`ui.${s.name}`,message:r};i&&(c.data={"ui.component_name":i}),kn(c,{event:s.event,name:s.name,global:s.global})}}function xE(t){return function(n){if(Re()!==t)return;const s={category:"console",data:{arguments:n.args,logger:"console"},level:Sw(n.level),message:Cu(n.args," ")};if(n.level==="assert")if(n.args[0]===!1)s.message=`Assertion failed: ${Cu(n.args.slice(1)," ")||"console.assert"}`,s.data.arguments=n.args.slice(1);else return;kn(s,{input:n.args,level:n.level})}}function ME(t){return function(n){if(Re()!==t)return;const{startTimestamp:s,endTimestamp:r}=n,i=n.xhr[Ys];if(!s||!r||!i)return;const{method:o,url:a,status_code:c,body:l}=i,u={method:o,url:a,status_code:c},d={xhr:n.xhr,input:l,startTimestamp:s,endTimestamp:r},h={category:"xhr",data:u,type:"http",level:xf(c)};t.emit("beforeOutgoingRequestBreadcrumb",h,d),kn(h,d)}}function FE(t){return function(n){if(Re()!==t)return;const{startTimestamp:s,endTimestamp:r}=n;if(r&&!(n.fetchData.url.match(/sentry_key/)&&n.fetchData.method==="POST"))if(n.fetchData.method,n.fetchData.url,n.error){const i=n.fetchData,o={data:n.error,input:n.args,startTimestamp:s,endTimestamp:r},a={category:"fetch",data:i,level:"error",type:"http"};t.emit("beforeOutgoingRequestBreadcrumb",a,o),kn(a,o)}else{const i=n.response,o={...n.fetchData,status_code:i?.status};n.fetchData.request_body_size,n.fetchData.response_body_size,i?.status;const a={input:n.args,response:i,startTimestamp:s,endTimestamp:r},c={category:"fetch",data:o,type:"http",level:xf(o.status_code)};t.emit("beforeOutgoingRequestBreadcrumb",c,a),kn(c,a)}}}function UE(t){return function(n){if(Re()!==t)return;let s=n.from,r=n.to;const i=Jo(te.location.href);let o=s?Jo(s):void 0;const a=Jo(r);o?.path||(o=i),i.protocol===a.protocol&&i.host===a.host&&(r=a.relative),i.protocol===o.protocol&&i.host===o.host&&(s=o.relative),kn({category:"navigation",data:{from:s,to:r}})}}function $E(t){return!!t&&!!t.target}const BE=["EventTarget","Window","Node","ApplicationCache","AudioTrackList","BroadcastChannel","ChannelMergerNode","CryptoOperation","EventSource","FileReader","HTMLUnknownElement","IDBDatabase","IDBRequest","IDBTransaction","KeyOperation","MediaController","MessagePort","ModalWindow","Notification","SVGElementInstance","Screen","SharedWorker","TextTrack","TextTrackCue","TextTrackList","WebSocket","WebSocketWorker","Worker","XMLHttpRequest","XMLHttpRequestEventTarget","XMLHttpRequestUpload"],HE="BrowserApiErrors",WE=((t={})=>{const e={XMLHttpRequest:!0,eventTarget:!0,requestAnimationFrame:!0,setInterval:!0,setTimeout:!0,unregisterOriginalCallbacks:!1,...t};return{name:HE,setupOnce(){e.setTimeout&&De(te,"setTimeout",ld),e.setInterval&&De(te,"setInterval",ld),e.requestAnimationFrame&&De(te,"requestAnimationFrame",jE),e.XMLHttpRequest&&"XMLHttpRequest"in te&&De(XMLHttpRequest.prototype,"send",qE);const n=e.eventTarget;n&&(Array.isArray(n)?n:BE).forEach(r=>zE(r,e))}}}),VE=WE;function ld(t){return function(...e){const n=e[0];return e[0]=hs(n,{mechanism:{handled:!1,type:`auto.browser.browserapierrors.${Xt(t)}`}}),t.apply(this,e)}}function jE(t){return function(e){return t.apply(this,[hs(e,{mechanism:{data:{handler:Xt(t)},handled:!1,type:"auto.browser.browserapierrors.requestAnimationFrame"}})])}}function qE(t){return function(...e){const n=this;return["onload","onerror","onprogress","onreadystatechange"].forEach(r=>{r in n&&typeof n[r]=="function"&&De(n,r,function(i){const o={mechanism:{data:{handler:Xt(i)},handled:!1,type:`auto.browser.browserapierrors.xhr.${r}`}},a=Dc(i);return a&&(o.mechanism.data.handler=Xt(a)),hs(i,o)})}),t.apply(this,e)}}function zE(t,e){const s=te[t]?.prototype;s?.hasOwnProperty?.("addEventListener")&&(De(s,"addEventListener",function(r){return function(i,o,a){try{GE(o)&&(o.handleEvent=hs(o.handleEvent,{mechanism:{data:{handler:Xt(o),target:t},handled:!1,type:"auto.browser.browserapierrors.handleEvent"}}))}catch{}return e.unregisterOriginalCallbacks&&YE(this,i,o),r.apply(this,[i,hs(o,{mechanism:{data:{handler:Xt(o),target:t},handled:!1,type:"auto.browser.browserapierrors.addEventListener"}}),a])}}),De(s,"removeEventListener",function(r){return function(i,o,a){try{const c=o.__sentry_wrapped__;c&&r.call(this,i,c,a)}catch{}return r.call(this,i,o,a)}}))}function GE(t){return typeof t.handleEvent=="function"}function YE(t,e,n){t&&typeof t=="object"&&"removeEventListener"in t&&typeof t.removeEventListener=="function"&&t.removeEventListener(e,n)}const KE=()=>({name:"BrowserSession",setupOnce(){if(typeof te.document>"u"){lo&&b.warn("Using the `browserSessionIntegration` in non-browser environments is not supported.");return}ju({ignoreDuration:!0}),qu(),Uf(({from:t,to:e})=>{t!==void 0&&t!==e&&(ju({ignoreDuration:!0}),qu())})}}),JE="GlobalHandlers",XE=((t={})=>{const e={onerror:!0,onunhandledrejection:!0,...t};return{name:JE,setupOnce(){Error.stackTraceLimit=50},setup(n){e.onerror&&(ZE(n),ud("onerror")),e.onunhandledrejection&&(eb(n),ud("onunhandledrejection"))}}}),QE=XE;function ZE(t){U_(e=>{const{stackParser:n,attachStacktrace:s}=Bf();if(Re()!==t||Mf())return;const{msg:r,url:i,line:o,column:a,error:c}=e,l=sb(Hc(n,c||r,void 0,s,!1),i,o,a);l.level="error",yf(l,{originalException:c,mechanism:{handled:!1,type:"auto.browser.global_handlers.onerror"}})})}function eb(t){B_(e=>{const{stackParser:n,attachStacktrace:s}=Bf();if(Re()!==t||Mf())return;const r=tb(e),i=io(r)?nb(r):Hc(n,r,void 0,s,!0);i.level="error",yf(i,{originalException:r,mechanism:{handled:!1,type:"auto.browser.global_handlers.onunhandledrejection"}})})}function tb(t){if(io(t))return t;try{if("reason"in t)return t.reason;if("detail"in t&&"reason"in t.detail)return t.detail.reason}catch{}return t}function nb(t){return{exception:{values:[{type:"UnhandledRejection",value:`Non-Error promise rejection captured with value: ${String(t)}`}]}}}function sb(t,e,n,s){const r=t.exception=t.exception||{},i=r.values=r.values||[],o=i[0]=i[0]||{},a=o.stacktrace=o.stacktrace||{},c=a.frames=a.frames||[],l=s,u=n,d=rb(e)??Oc();return c.length===0&&c.push({colno:l,filename:d,function:Tn,in_app:!0,lineno:u}),t}function ud(t){lo&&b.log(`Global Handler attached: ${t}`)}function Bf(){return Re()?.getOptions()||{stackParser:()=>[],attachStacktrace:!1}}function rb(t){if(!(!Et(t)||t.length===0)){if(t.startsWith("data:")){const e=t.match(/^data:([^;]+)/),n=e?e[1]:"text/javascript",s=t.includes("base64,");return`<data:${n}${s?",base64":""}>`}return t}}const ib=()=>({name:"HttpContext",preprocessEvent(t){if(!te.navigator&&!te.location&&!te.document)return;const e=Bw(),n={...e.headers,...t.request?.headers};t.request={...e,...t.request,headers:n}}}),ob="cause",ab=5,cb="LinkedErrors",lb=((t={})=>{const e=t.limit||ab,n=t.key||ob;return{name:cb,preprocessEvent(s,r,i){const o=i.getOptions();Ew($c,o.stackParser,n,e,s,r)}}}),ub=lb;function db(){return hb()?(lo&&Ss(()=>{console.error("[Sentry] You cannot use Sentry.init() in a browser extension, see: https://docs.sentry.io/platforms/javascript/best-practices/browser-extensions/")}),!0):!1}function hb(){if(typeof te.window>"u")return!1;const t=te;if(t.nw||!(t.chrome||t.browser)?.runtime?.id)return!1;const n=Oc(),s=["chrome-extension","moz-extension","ms-browser-extension","safari-web-extension"];return!(te===te.top&&s.some(i=>n.startsWith(`${i}://`)))}function fb(t){return[fw(),lw(),VE(),LE(),QE(),ub(),kw(),ib(),KE()]}function pb(t={}){const e=!t.skipBrowserExtensionCheck&&db();let n=t.defaultIntegrations==null?fb():t.defaultIntegrations;const s={...t,enabled:e?!1:t.enabled,stackParser:M_(t.stackParser||AE),integrations:Lv({integrations:t.integrations,defaultIntegrations:n}),transport:t.transport||gE};return Kv(Qw,s)}const gb="https://adc1b5518c6a55273a1398d1b8b9cd3e@o4510415124496384.ingest.de.sentry.io/4510415129083984";pb({dsn:gb,sendDefaultPii:!0});/**
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
 */const mb=()=>{};var dd={};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Hf={NODE_ADMIN:!1,SDK_VERSION:"${JSCORE_VERSION}"};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const g=function(t,e){if(!t)throw ks(e)},ks=function(t){return new Error("Firebase Database ("+Hf.SDK_VERSION+") INTERNAL ASSERT FAILED: "+t)};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Wf=function(t){const e=[];let n=0;for(let s=0;s<t.length;s++){let r=t.charCodeAt(s);r<128?e[n++]=r:r<2048?(e[n++]=r>>6|192,e[n++]=r&63|128):(r&64512)===55296&&s+1<t.length&&(t.charCodeAt(s+1)&64512)===56320?(r=65536+((r&1023)<<10)+(t.charCodeAt(++s)&1023),e[n++]=r>>18|240,e[n++]=r>>12&63|128,e[n++]=r>>6&63|128,e[n++]=r&63|128):(e[n++]=r>>12|224,e[n++]=r>>6&63|128,e[n++]=r&63|128)}return e},_b=function(t){const e=[];let n=0,s=0;for(;n<t.length;){const r=t[n++];if(r<128)e[s++]=String.fromCharCode(r);else if(r>191&&r<224){const i=t[n++];e[s++]=String.fromCharCode((r&31)<<6|i&63)}else if(r>239&&r<365){const i=t[n++],o=t[n++],a=t[n++],c=((r&7)<<18|(i&63)<<12|(o&63)<<6|a&63)-65536;e[s++]=String.fromCharCode(55296+(c>>10)),e[s++]=String.fromCharCode(56320+(c&1023))}else{const i=t[n++],o=t[n++];e[s++]=String.fromCharCode((r&15)<<12|(i&63)<<6|o&63)}}return e.join("")},uo={byteToCharMap_:null,charToByteMap_:null,byteToCharMapWebSafe_:null,charToByteMapWebSafe_:null,ENCODED_VALS_BASE:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",get ENCODED_VALS(){return this.ENCODED_VALS_BASE+"+/="},get ENCODED_VALS_WEBSAFE(){return this.ENCODED_VALS_BASE+"-_."},HAS_NATIVE_SUPPORT:typeof atob=="function",encodeByteArray(t,e){if(!Array.isArray(t))throw Error("encodeByteArray takes an array as a parameter");this.init_();const n=e?this.byteToCharMapWebSafe_:this.byteToCharMap_,s=[];for(let r=0;r<t.length;r+=3){const i=t[r],o=r+1<t.length,a=o?t[r+1]:0,c=r+2<t.length,l=c?t[r+2]:0,u=i>>2,d=(i&3)<<4|a>>4;let h=(a&15)<<2|l>>6,f=l&63;c||(f=64,o||(h=64)),s.push(n[u],n[d],n[h],n[f])}return s.join("")},encodeString(t,e){return this.HAS_NATIVE_SUPPORT&&!e?btoa(t):this.encodeByteArray(Wf(t),e)},decodeString(t,e){return this.HAS_NATIVE_SUPPORT&&!e?atob(t):_b(this.decodeStringToByteArray(t,e))},decodeStringToByteArray(t,e){this.init_();const n=e?this.charToByteMapWebSafe_:this.charToByteMap_,s=[];for(let r=0;r<t.length;){const i=n[t.charAt(r++)],a=r<t.length?n[t.charAt(r)]:0;++r;const l=r<t.length?n[t.charAt(r)]:64;++r;const d=r<t.length?n[t.charAt(r)]:64;if(++r,i==null||a==null||l==null||d==null)throw new yb;const h=i<<2|a>>4;if(s.push(h),l!==64){const f=a<<4&240|l>>2;if(s.push(f),d!==64){const p=l<<6&192|d;s.push(p)}}}return s},init_(){if(!this.byteToCharMap_){this.byteToCharMap_={},this.charToByteMap_={},this.byteToCharMapWebSafe_={},this.charToByteMapWebSafe_={};for(let t=0;t<this.ENCODED_VALS.length;t++)this.byteToCharMap_[t]=this.ENCODED_VALS.charAt(t),this.charToByteMap_[this.byteToCharMap_[t]]=t,this.byteToCharMapWebSafe_[t]=this.ENCODED_VALS_WEBSAFE.charAt(t),this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[t]]=t,t>=this.ENCODED_VALS_BASE.length&&(this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(t)]=t,this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(t)]=t)}}};class yb extends Error{constructor(){super(...arguments),this.name="DecodeBase64StringError"}}const Vf=function(t){const e=Wf(t);return uo.encodeByteArray(e,!0)},bi=function(t){return Vf(t).replace(/\./g,"")},Ci=function(t){try{return uo.decodeString(t,!0)}catch(e){console.error("base64Decode failed: ",e)}return null};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function vb(t){return jf(void 0,t)}function jf(t,e){if(!(e instanceof Object))return e;switch(e.constructor){case Date:const n=e;return new Date(n.getTime());case Object:t===void 0&&(t={});break;case Array:t=[];break;default:return e}for(const n in e)!e.hasOwnProperty(n)||!wb(n)||(t[n]=jf(t[n],e[n]));return t}function wb(t){return t!=="__proto__"}/**
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
 */function qf(){if(typeof self<"u")return self;if(typeof window<"u")return window;if(typeof global<"u")return global;throw new Error("Unable to locate global object.")}/**
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
 */const Eb=()=>qf().__FIREBASE_DEFAULTS__,bb=()=>{if(typeof process>"u"||typeof dd>"u")return;const t=dd.__FIREBASE_DEFAULTS__;if(t)return JSON.parse(t)},Cb=()=>{if(typeof document>"u")return;let t;try{t=document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/)}catch{return}const e=t&&Ci(t[1]);return e&&JSON.parse(e)},Wc=()=>{try{return mb()||Eb()||bb()||Cb()}catch(t){console.info(`Unable to get __FIREBASE_DEFAULTS__ due to: ${t}`);return}},zf=t=>Wc()?.emulatorHosts?.[t],Sb=t=>{const e=zf(t);if(!e)return;const n=e.lastIndexOf(":");if(n<=0||n+1===e.length)throw new Error(`Invalid host ${e} with no separate hostname and port!`);const s=parseInt(e.substring(n+1),10);return e[0]==="["?[e.substring(1,n-1),s]:[e.substring(0,n),s]},Gf=()=>Wc()?.config,Yf=t=>Wc()?.[`_${t}`];/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ae{constructor(){this.reject=()=>{},this.resolve=()=>{},this.promise=new Promise((e,n)=>{this.resolve=e,this.reject=n})}wrapCallback(e){return(n,s)=>{n?this.reject(n):this.resolve(s),typeof e=="function"&&(this.promise.catch(()=>{}),e.length===1?e(n):e(n,s))}}}/**
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
 */function Rs(t){try{return(t.startsWith("http://")||t.startsWith("https://")?new URL(t).hostname:t).endsWith(".cloudworkstations.dev")}catch{return!1}}async function Kf(t){return(await fetch(t,{credentials:"include"})).ok}/**
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
 */function Tb(t,e){if(t.uid)throw new Error('The "uid" field is no longer supported by mockUserToken. Please use "sub" instead for Firebase Auth User ID.');const n={alg:"none",type:"JWT"},s=e||"demo-project",r=t.iat||0,i=t.sub||t.user_id;if(!i)throw new Error("mockUserToken must contain 'sub' or 'user_id' field!");const o={iss:`https://securetoken.google.com/${s}`,aud:s,iat:r,exp:r+3600,auth_time:r,sub:i,user_id:i,firebase:{sign_in_provider:"custom",identities:{}},...t};return[bi(JSON.stringify(n)),bi(JSON.stringify(o)),""].join(".")}const Js={};function Ib(){const t={prod:[],emulator:[]};for(const e of Object.keys(Js))Js[e]?t.emulator.push(e):t.prod.push(e);return t}function kb(t){let e=document.getElementById(t),n=!1;return e||(e=document.createElement("div"),e.setAttribute("id",t),n=!0),{created:n,element:e}}let hd=!1;function Jf(t,e){if(typeof window>"u"||typeof document>"u"||!Rs(window.location.host)||Js[t]===e||Js[t]||hd)return;Js[t]=e;function n(h){return`__firebase__banner__${h}`}const s="__firebase__banner",i=Ib().prod.length>0;function o(){const h=document.getElementById(s);h&&h.remove()}function a(h){h.style.display="flex",h.style.background="#7faaf0",h.style.position="fixed",h.style.bottom="5px",h.style.left="5px",h.style.padding=".5em",h.style.borderRadius="5px",h.style.alignItems="center"}function c(h,f){h.setAttribute("width","24"),h.setAttribute("id",f),h.setAttribute("height","24"),h.setAttribute("viewBox","0 0 24 24"),h.setAttribute("fill","none"),h.style.marginLeft="-6px"}function l(){const h=document.createElement("span");return h.style.cursor="pointer",h.style.marginLeft="16px",h.style.fontSize="24px",h.innerHTML=" &times;",h.onclick=()=>{hd=!0,o()},h}function u(h,f){h.setAttribute("id",f),h.innerText="Learn more",h.href="https://firebase.google.com/docs/studio/preview-apps#preview-backend",h.setAttribute("target","__blank"),h.style.paddingLeft="5px",h.style.textDecoration="underline"}function d(){const h=kb(s),f=n("text"),p=document.getElementById(f)||document.createElement("span"),_=n("learnmore"),m=document.getElementById(_)||document.createElement("a"),A=n("preprendIcon"),x=document.getElementById(A)||document.createElementNS("http://www.w3.org/2000/svg","svg");if(h.created){const $=h.element;a($),u(m,_);const w=l();c(x,A),$.append(x,p,m,w),document.body.appendChild($)}i?(p.innerText="Preview backend disconnected.",x.innerHTML=`<g clip-path="url(#clip0_6013_33858)">
<path d="M4.8 17.6L12 5.6L19.2 17.6H4.8ZM6.91667 16.4H17.0833L12 7.93333L6.91667 16.4ZM12 15.6C12.1667 15.6 12.3056 15.5444 12.4167 15.4333C12.5389 15.3111 12.6 15.1667 12.6 15C12.6 14.8333 12.5389 14.6944 12.4167 14.5833C12.3056 14.4611 12.1667 14.4 12 14.4C11.8333 14.4 11.6889 14.4611 11.5667 14.5833C11.4556 14.6944 11.4 14.8333 11.4 15C11.4 15.1667 11.4556 15.3111 11.5667 15.4333C11.6889 15.5444 11.8333 15.6 12 15.6ZM11.4 13.6H12.6V10.4H11.4V13.6Z" fill="#212121"/>
</g>
<defs>
<clipPath id="clip0_6013_33858">
<rect width="24" height="24" fill="white"/>
</clipPath>
</defs>`):(x.innerHTML=`<g clip-path="url(#clip0_6083_34804)">
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
 */function ke(){return typeof navigator<"u"&&typeof navigator.userAgent=="string"?navigator.userAgent:""}function Vc(){return typeof window<"u"&&!!(window.cordova||window.phonegap||window.PhoneGap)&&/ios|iphone|ipod|ipad|android|blackberry|iemobile/i.test(ke())}function Rb(){return typeof navigator<"u"&&navigator.userAgent==="Cloudflare-Workers"}function Ab(){const t=typeof chrome=="object"?chrome.runtime:typeof browser=="object"?browser.runtime:void 0;return typeof t=="object"&&t.id!==void 0}function Xf(){return typeof navigator=="object"&&navigator.product==="ReactNative"}function Nb(){const t=ke();return t.indexOf("MSIE ")>=0||t.indexOf("Trident/")>=0}function Pb(){return Hf.NODE_ADMIN===!0}function jc(){try{return typeof indexedDB=="object"}catch{return!1}}function Lb(){return new Promise((t,e)=>{try{let n=!0;const s="validate-browser-context-for-indexeddb-analytics-module",r=self.indexedDB.open(s);r.onsuccess=()=>{r.result.close(),n||self.indexedDB.deleteDatabase(s),t(!0)},r.onupgradeneeded=()=>{n=!1},r.onerror=()=>{e(r.error?.message||"")}}catch(n){e(n)}})}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ob="FirebaseError";class an extends Error{constructor(e,n,s){super(n),this.code=e,this.customData=s,this.name=Ob,Object.setPrototypeOf(this,an.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,As.prototype.create)}}class As{constructor(e,n,s){this.service=e,this.serviceName=n,this.errors=s}create(e,...n){const s=n[0]||{},r=`${this.service}/${e}`,i=this.errors[e],o=i?Db(i,s):"Error",a=`${this.serviceName}: ${o} (${r}).`;return new an(r,a,s)}}function Db(t,e){return t.replace(xb,(n,s)=>{const r=e[s];return r!=null?String(r):`<${s}?>`})}const xb=/\{\$([^}]+)}/g;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function hr(t){return JSON.parse(t)}function oe(t){return JSON.stringify(t)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Qf=function(t){let e={},n={},s={},r="";try{const i=t.split(".");e=hr(Ci(i[0])||""),n=hr(Ci(i[1])||""),r=i[2],s=n.d||{},delete n.d}catch{}return{header:e,claims:n,data:s,signature:r}},Mb=function(t){const e=Qf(t),n=e.claims;return!!n&&typeof n=="object"&&n.hasOwnProperty("iat")},Fb=function(t){const e=Qf(t).claims;return typeof e=="object"&&e.admin===!0};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ft(t,e){return Object.prototype.hasOwnProperty.call(t,e)}function fs(t,e){if(Object.prototype.hasOwnProperty.call(t,e))return t[e]}function Si(t){for(const e in t)if(Object.prototype.hasOwnProperty.call(t,e))return!1;return!0}function Ti(t,e,n){const s={};for(const r in t)Object.prototype.hasOwnProperty.call(t,r)&&(s[r]=e.call(n,t[r],r,t));return s}function Rn(t,e){if(t===e)return!0;const n=Object.keys(t),s=Object.keys(e);for(const r of n){if(!s.includes(r))return!1;const i=t[r],o=e[r];if(fd(i)&&fd(o)){if(!Rn(i,o))return!1}else if(i!==o)return!1}for(const r of s)if(!n.includes(r))return!1;return!0}function fd(t){return t!==null&&typeof t=="object"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ns(t){const e=[];for(const[n,s]of Object.entries(t))Array.isArray(s)?s.forEach(r=>{e.push(encodeURIComponent(n)+"="+encodeURIComponent(r))}):e.push(encodeURIComponent(n)+"="+encodeURIComponent(s));return e.length?"&"+e.join("&"):""}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ub{constructor(){this.chain_=[],this.buf_=[],this.W_=[],this.pad_=[],this.inbuf_=0,this.total_=0,this.blockSize=512/8,this.pad_[0]=128;for(let e=1;e<this.blockSize;++e)this.pad_[e]=0;this.reset()}reset(){this.chain_[0]=1732584193,this.chain_[1]=4023233417,this.chain_[2]=2562383102,this.chain_[3]=271733878,this.chain_[4]=3285377520,this.inbuf_=0,this.total_=0}compress_(e,n){n||(n=0);const s=this.W_;if(typeof e=="string")for(let d=0;d<16;d++)s[d]=e.charCodeAt(n)<<24|e.charCodeAt(n+1)<<16|e.charCodeAt(n+2)<<8|e.charCodeAt(n+3),n+=4;else for(let d=0;d<16;d++)s[d]=e[n]<<24|e[n+1]<<16|e[n+2]<<8|e[n+3],n+=4;for(let d=16;d<80;d++){const h=s[d-3]^s[d-8]^s[d-14]^s[d-16];s[d]=(h<<1|h>>>31)&4294967295}let r=this.chain_[0],i=this.chain_[1],o=this.chain_[2],a=this.chain_[3],c=this.chain_[4],l,u;for(let d=0;d<80;d++){d<40?d<20?(l=a^i&(o^a),u=1518500249):(l=i^o^a,u=1859775393):d<60?(l=i&o|a&(i|o),u=2400959708):(l=i^o^a,u=3395469782);const h=(r<<5|r>>>27)+l+c+u+s[d]&4294967295;c=a,a=o,o=(i<<30|i>>>2)&4294967295,i=r,r=h}this.chain_[0]=this.chain_[0]+r&4294967295,this.chain_[1]=this.chain_[1]+i&4294967295,this.chain_[2]=this.chain_[2]+o&4294967295,this.chain_[3]=this.chain_[3]+a&4294967295,this.chain_[4]=this.chain_[4]+c&4294967295}update(e,n){if(e==null)return;n===void 0&&(n=e.length);const s=n-this.blockSize;let r=0;const i=this.buf_;let o=this.inbuf_;for(;r<n;){if(o===0)for(;r<=s;)this.compress_(e,r),r+=this.blockSize;if(typeof e=="string"){for(;r<n;)if(i[o]=e.charCodeAt(r),++o,++r,o===this.blockSize){this.compress_(i),o=0;break}}else for(;r<n;)if(i[o]=e[r],++o,++r,o===this.blockSize){this.compress_(i),o=0;break}}this.inbuf_=o,this.total_+=n}digest(){const e=[];let n=this.total_*8;this.inbuf_<56?this.update(this.pad_,56-this.inbuf_):this.update(this.pad_,this.blockSize-(this.inbuf_-56));for(let r=this.blockSize-1;r>=56;r--)this.buf_[r]=n&255,n/=256;this.compress_(this.buf_);let s=0;for(let r=0;r<5;r++)for(let i=24;i>=0;i-=8)e[s]=this.chain_[r]>>i&255,++s;return e}}function $b(t,e){const n=new Bb(t,e);return n.subscribe.bind(n)}class Bb{constructor(e,n){this.observers=[],this.unsubscribes=[],this.observerCount=0,this.task=Promise.resolve(),this.finalized=!1,this.onNoObservers=n,this.task.then(()=>{e(this)}).catch(s=>{this.error(s)})}next(e){this.forEachObserver(n=>{n.next(e)})}error(e){this.forEachObserver(n=>{n.error(e)}),this.close(e)}complete(){this.forEachObserver(e=>{e.complete()}),this.close()}subscribe(e,n,s){let r;if(e===void 0&&n===void 0&&s===void 0)throw new Error("Missing Observer.");Hb(e,["next","error","complete"])?r=e:r={next:e,error:n,complete:s},r.next===void 0&&(r.next=Qo),r.error===void 0&&(r.error=Qo),r.complete===void 0&&(r.complete=Qo);const i=this.unsubscribeOne.bind(this,this.observers.length);return this.finalized&&this.task.then(()=>{try{this.finalError?r.error(this.finalError):r.complete()}catch{}}),this.observers.push(r),i}unsubscribeOne(e){this.observers===void 0||this.observers[e]===void 0||(delete this.observers[e],this.observerCount-=1,this.observerCount===0&&this.onNoObservers!==void 0&&this.onNoObservers(this))}forEachObserver(e){if(!this.finalized)for(let n=0;n<this.observers.length;n++)this.sendOne(n,e)}sendOne(e,n){this.task.then(()=>{if(this.observers!==void 0&&this.observers[e]!==void 0)try{n(this.observers[e])}catch(s){typeof console<"u"&&console.error&&console.error(s)}})}close(e){this.finalized||(this.finalized=!0,e!==void 0&&(this.finalError=e),this.task.then(()=>{this.observers=void 0,this.onNoObservers=void 0}))}}function Hb(t,e){if(typeof t!="object"||t===null)return!1;for(const n of e)if(n in t&&typeof t[n]=="function")return!0;return!1}function Qo(){}function ps(t,e){return`${t} failed: ${e} argument `}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Wb=function(t){const e=[];let n=0;for(let s=0;s<t.length;s++){let r=t.charCodeAt(s);if(r>=55296&&r<=56319){const i=r-55296;s++,g(s<t.length,"Surrogate pair missing trail surrogate.");const o=t.charCodeAt(s)-56320;r=65536+(i<<10)+o}r<128?e[n++]=r:r<2048?(e[n++]=r>>6|192,e[n++]=r&63|128):r<65536?(e[n++]=r>>12|224,e[n++]=r>>6&63|128,e[n++]=r&63|128):(e[n++]=r>>18|240,e[n++]=r>>12&63|128,e[n++]=r>>6&63|128,e[n++]=r&63|128)}return e},ho=function(t){let e=0;for(let n=0;n<t.length;n++){const s=t.charCodeAt(n);s<128?e++:s<2048?e+=2:s>=55296&&s<=56319?(e+=4,n++):e+=3}return e};/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Vb=1e3,jb=2,qb=14400*1e3,zb=.5;function Gb(t,e=Vb,n=jb){const s=e*Math.pow(n,t),r=Math.round(zb*s*(Math.random()-.5)*2);return Math.min(qb,s+r)}/**
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
 */function ge(t){return t&&t._delegate?t._delegate:t}class kt{constructor(e,n,s){this.name=e,this.instanceFactory=n,this.type=s,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}setInstantiationMode(e){return this.instantiationMode=e,this}setMultipleInstances(e){return this.multipleInstances=e,this}setServiceProps(e){return this.serviceProps=e,this}setInstanceCreatedCallback(e){return this.onInstanceCreated=e,this}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const pn="[DEFAULT]";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Yb{constructor(e,n){this.name=e,this.container=n,this.component=null,this.instances=new Map,this.instancesDeferred=new Map,this.instancesOptions=new Map,this.onInitCallbacks=new Map}get(e){const n=this.normalizeInstanceIdentifier(e);if(!this.instancesDeferred.has(n)){const s=new Ae;if(this.instancesDeferred.set(n,s),this.isInitialized(n)||this.shouldAutoInitialize())try{const r=this.getOrInitializeService({instanceIdentifier:n});r&&s.resolve(r)}catch{}}return this.instancesDeferred.get(n).promise}getImmediate(e){const n=this.normalizeInstanceIdentifier(e?.identifier),s=e?.optional??!1;if(this.isInitialized(n)||this.shouldAutoInitialize())try{return this.getOrInitializeService({instanceIdentifier:n})}catch(r){if(s)return null;throw r}else{if(s)return null;throw Error(`Service ${this.name} is not available`)}}getComponent(){return this.component}setComponent(e){if(e.name!==this.name)throw Error(`Mismatching Component ${e.name} for Provider ${this.name}.`);if(this.component)throw Error(`Component for ${this.name} has already been provided`);if(this.component=e,!!this.shouldAutoInitialize()){if(Jb(e))try{this.getOrInitializeService({instanceIdentifier:pn})}catch{}for(const[n,s]of this.instancesDeferred.entries()){const r=this.normalizeInstanceIdentifier(n);try{const i=this.getOrInitializeService({instanceIdentifier:r});s.resolve(i)}catch{}}}}clearInstance(e=pn){this.instancesDeferred.delete(e),this.instancesOptions.delete(e),this.instances.delete(e)}async delete(){const e=Array.from(this.instances.values());await Promise.all([...e.filter(n=>"INTERNAL"in n).map(n=>n.INTERNAL.delete()),...e.filter(n=>"_delete"in n).map(n=>n._delete())])}isComponentSet(){return this.component!=null}isInitialized(e=pn){return this.instances.has(e)}getOptions(e=pn){return this.instancesOptions.get(e)||{}}initialize(e={}){const{options:n={}}=e,s=this.normalizeInstanceIdentifier(e.instanceIdentifier);if(this.isInitialized(s))throw Error(`${this.name}(${s}) has already been initialized`);if(!this.isComponentSet())throw Error(`Component ${this.name} has not been registered yet`);const r=this.getOrInitializeService({instanceIdentifier:s,options:n});for(const[i,o]of this.instancesDeferred.entries()){const a=this.normalizeInstanceIdentifier(i);s===a&&o.resolve(r)}return r}onInit(e,n){const s=this.normalizeInstanceIdentifier(n),r=this.onInitCallbacks.get(s)??new Set;r.add(e),this.onInitCallbacks.set(s,r);const i=this.instances.get(s);return i&&e(i,s),()=>{r.delete(e)}}invokeOnInitCallbacks(e,n){const s=this.onInitCallbacks.get(n);if(s)for(const r of s)try{r(e,n)}catch{}}getOrInitializeService({instanceIdentifier:e,options:n={}}){let s=this.instances.get(e);if(!s&&this.component&&(s=this.component.instanceFactory(this.container,{instanceIdentifier:Kb(e),options:n}),this.instances.set(e,s),this.instancesOptions.set(e,n),this.invokeOnInitCallbacks(s,e),this.component.onInstanceCreated))try{this.component.onInstanceCreated(this.container,e,s)}catch{}return s||null}normalizeInstanceIdentifier(e=pn){return this.component?this.component.multipleInstances?e:pn:e}shouldAutoInitialize(){return!!this.component&&this.component.instantiationMode!=="EXPLICIT"}}function Kb(t){return t===pn?void 0:t}function Jb(t){return t.instantiationMode==="EAGER"}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Xb{constructor(e){this.name=e,this.providers=new Map}addComponent(e){const n=this.getProvider(e.name);if(n.isComponentSet())throw new Error(`Component ${e.name} has already been registered with ${this.name}`);n.setComponent(e)}addOrOverwriteComponent(e){this.getProvider(e.name).isComponentSet()&&this.providers.delete(e.name),this.addComponent(e)}getProvider(e){if(this.providers.has(e))return this.providers.get(e);const n=new Yb(e,this);return this.providers.set(e,n),n}getProviders(){return Array.from(this.providers.values())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var W;(function(t){t[t.DEBUG=0]="DEBUG",t[t.VERBOSE=1]="VERBOSE",t[t.INFO=2]="INFO",t[t.WARN=3]="WARN",t[t.ERROR=4]="ERROR",t[t.SILENT=5]="SILENT"})(W||(W={}));const Qb={debug:W.DEBUG,verbose:W.VERBOSE,info:W.INFO,warn:W.WARN,error:W.ERROR,silent:W.SILENT},Zb=W.INFO,eC={[W.DEBUG]:"log",[W.VERBOSE]:"log",[W.INFO]:"info",[W.WARN]:"warn",[W.ERROR]:"error"},tC=(t,e,...n)=>{if(e<t.logLevel)return;const s=new Date().toISOString(),r=eC[e];if(r)console[r](`[${s}]  ${t.name}:`,...n);else throw new Error(`Attempted to log a message with an invalid logType (value: ${e})`)};class fo{constructor(e){this.name=e,this._logLevel=Zb,this._logHandler=tC,this._userLogHandler=null}get logLevel(){return this._logLevel}set logLevel(e){if(!(e in W))throw new TypeError(`Invalid value "${e}" assigned to \`logLevel\``);this._logLevel=e}setLogLevel(e){this._logLevel=typeof e=="string"?Qb[e]:e}get logHandler(){return this._logHandler}set logHandler(e){if(typeof e!="function")throw new TypeError("Value assigned to `logHandler` must be a function");this._logHandler=e}get userLogHandler(){return this._userLogHandler}set userLogHandler(e){this._userLogHandler=e}debug(...e){this._userLogHandler&&this._userLogHandler(this,W.DEBUG,...e),this._logHandler(this,W.DEBUG,...e)}log(...e){this._userLogHandler&&this._userLogHandler(this,W.VERBOSE,...e),this._logHandler(this,W.VERBOSE,...e)}info(...e){this._userLogHandler&&this._userLogHandler(this,W.INFO,...e),this._logHandler(this,W.INFO,...e)}warn(...e){this._userLogHandler&&this._userLogHandler(this,W.WARN,...e),this._logHandler(this,W.WARN,...e)}error(...e){this._userLogHandler&&this._userLogHandler(this,W.ERROR,...e),this._logHandler(this,W.ERROR,...e)}}const nC=(t,e)=>e.some(n=>t instanceof n);let pd,gd;function sC(){return pd||(pd=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])}function rC(){return gd||(gd=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])}const Zf=new WeakMap,Ha=new WeakMap,ep=new WeakMap,Zo=new WeakMap,qc=new WeakMap;function iC(t){const e=new Promise((n,s)=>{const r=()=>{t.removeEventListener("success",i),t.removeEventListener("error",o)},i=()=>{n(qt(t.result)),r()},o=()=>{s(t.error),r()};t.addEventListener("success",i),t.addEventListener("error",o)});return e.then(n=>{n instanceof IDBCursor&&Zf.set(n,t)}).catch(()=>{}),qc.set(e,t),e}function oC(t){if(Ha.has(t))return;const e=new Promise((n,s)=>{const r=()=>{t.removeEventListener("complete",i),t.removeEventListener("error",o),t.removeEventListener("abort",o)},i=()=>{n(),r()},o=()=>{s(t.error||new DOMException("AbortError","AbortError")),r()};t.addEventListener("complete",i),t.addEventListener("error",o),t.addEventListener("abort",o)});Ha.set(t,e)}let Wa={get(t,e,n){if(t instanceof IDBTransaction){if(e==="done")return Ha.get(t);if(e==="objectStoreNames")return t.objectStoreNames||ep.get(t);if(e==="store")return n.objectStoreNames[1]?void 0:n.objectStore(n.objectStoreNames[0])}return qt(t[e])},set(t,e,n){return t[e]=n,!0},has(t,e){return t instanceof IDBTransaction&&(e==="done"||e==="store")?!0:e in t}};function aC(t){Wa=t(Wa)}function cC(t){return t===IDBDatabase.prototype.transaction&&!("objectStoreNames"in IDBTransaction.prototype)?function(e,...n){const s=t.call(ea(this),e,...n);return ep.set(s,e.sort?e.sort():[e]),qt(s)}:rC().includes(t)?function(...e){return t.apply(ea(this),e),qt(Zf.get(this))}:function(...e){return qt(t.apply(ea(this),e))}}function lC(t){return typeof t=="function"?cC(t):(t instanceof IDBTransaction&&oC(t),nC(t,sC())?new Proxy(t,Wa):t)}function qt(t){if(t instanceof IDBRequest)return iC(t);if(Zo.has(t))return Zo.get(t);const e=lC(t);return e!==t&&(Zo.set(t,e),qc.set(e,t)),e}const ea=t=>qc.get(t);function uC(t,e,{blocked:n,upgrade:s,blocking:r,terminated:i}={}){const o=indexedDB.open(t,e),a=qt(o);return s&&o.addEventListener("upgradeneeded",c=>{s(qt(o.result),c.oldVersion,c.newVersion,qt(o.transaction),c)}),n&&o.addEventListener("blocked",c=>n(c.oldVersion,c.newVersion,c)),a.then(c=>{i&&c.addEventListener("close",()=>i()),r&&c.addEventListener("versionchange",l=>r(l.oldVersion,l.newVersion,l))}).catch(()=>{}),a}const dC=["get","getKey","getAll","getAllKeys","count"],hC=["put","add","delete","clear"],ta=new Map;function md(t,e){if(!(t instanceof IDBDatabase&&!(e in t)&&typeof e=="string"))return;if(ta.get(e))return ta.get(e);const n=e.replace(/FromIndex$/,""),s=e!==n,r=hC.includes(n);if(!(n in(s?IDBIndex:IDBObjectStore).prototype)||!(r||dC.includes(n)))return;const i=async function(o,...a){const c=this.transaction(o,r?"readwrite":"readonly");let l=c.store;return s&&(l=l.index(a.shift())),(await Promise.all([l[n](...a),r&&c.done]))[0]};return ta.set(e,i),i}aC(t=>({...t,get:(e,n,s)=>md(e,n)||t.get(e,n,s),has:(e,n)=>!!md(e,n)||t.has(e,n)}));/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class fC{constructor(e){this.container=e}getPlatformInfoString(){return this.container.getProviders().map(n=>{if(pC(n)){const s=n.getImmediate();return`${s.library}/${s.version}`}else return null}).filter(n=>n).join(" ")}}function pC(t){return t.getComponent()?.type==="VERSION"}const Va="@firebase/app",_d="0.14.4";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Rt=new fo("@firebase/app"),gC="@firebase/app-compat",mC="@firebase/analytics-compat",_C="@firebase/analytics",yC="@firebase/app-check-compat",vC="@firebase/app-check",wC="@firebase/auth",EC="@firebase/auth-compat",bC="@firebase/database",CC="@firebase/data-connect",SC="@firebase/database-compat",TC="@firebase/functions",IC="@firebase/functions-compat",kC="@firebase/installations",RC="@firebase/installations-compat",AC="@firebase/messaging",NC="@firebase/messaging-compat",PC="@firebase/performance",LC="@firebase/performance-compat",OC="@firebase/remote-config",DC="@firebase/remote-config-compat",xC="@firebase/storage",MC="@firebase/storage-compat",FC="@firebase/firestore",UC="@firebase/ai",$C="@firebase/firestore-compat",BC="firebase",HC="12.4.0";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ja="[DEFAULT]",WC={[Va]:"fire-core",[gC]:"fire-core-compat",[_C]:"fire-analytics",[mC]:"fire-analytics-compat",[vC]:"fire-app-check",[yC]:"fire-app-check-compat",[wC]:"fire-auth",[EC]:"fire-auth-compat",[bC]:"fire-rtdb",[CC]:"fire-data-connect",[SC]:"fire-rtdb-compat",[TC]:"fire-fn",[IC]:"fire-fn-compat",[kC]:"fire-iid",[RC]:"fire-iid-compat",[AC]:"fire-fcm",[NC]:"fire-fcm-compat",[PC]:"fire-perf",[LC]:"fire-perf-compat",[OC]:"fire-rc",[DC]:"fire-rc-compat",[xC]:"fire-gcs",[MC]:"fire-gcs-compat",[FC]:"fire-fst",[$C]:"fire-fst-compat",[UC]:"fire-vertex","fire-js":"fire-js",[BC]:"fire-js-all"};/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ii=new Map,VC=new Map,qa=new Map;function yd(t,e){try{t.container.addComponent(e)}catch(n){Rt.debug(`Component ${e.name} failed to register with FirebaseApp ${t.name}`,n)}}function Zt(t){const e=t.name;if(qa.has(e))return Rt.debug(`There were multiple attempts to register component ${e}.`),!1;qa.set(e,t);for(const n of Ii.values())yd(n,t);for(const n of VC.values())yd(n,t);return!0}function Dr(t,e){const n=t.container.getProvider("heartbeat").getImmediate({optional:!0});return n&&n.triggerHeartbeat(),t.container.getProvider(e)}function Ge(t){return t==null?!1:t.settings!==void 0}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const jC={"no-app":"No Firebase App '{$appName}' has been created - call initializeApp() first","bad-app-name":"Illegal App name: '{$appName}'","duplicate-app":"Firebase App named '{$appName}' already exists with different options or config","app-deleted":"Firebase App named '{$appName}' already deleted","server-app-deleted":"Firebase Server App has been deleted","no-options":"Need to provide options, when not being deployed to hosting via source.","invalid-app-argument":"firebase.{$appName}() takes either no argument or a Firebase App instance.","invalid-log-argument":"First argument to `onLog` must be null or a function.","idb-open":"Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.","idb-get":"Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.","idb-set":"Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.","idb-delete":"Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}.","finalization-registry-not-supported":"FirebaseServerApp deleteOnDeref field defined but the JS runtime does not support FinalizationRegistry.","invalid-server-app-environment":"FirebaseServerApp is not for use in browser environments."},zt=new As("app","Firebase",jC);/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class qC{constructor(e,n,s){this._isDeleted=!1,this._options={...e},this._config={...n},this._name=n.name,this._automaticDataCollectionEnabled=n.automaticDataCollectionEnabled,this._container=s,this.container.addComponent(new kt("app",()=>this,"PUBLIC"))}get automaticDataCollectionEnabled(){return this.checkDestroyed(),this._automaticDataCollectionEnabled}set automaticDataCollectionEnabled(e){this.checkDestroyed(),this._automaticDataCollectionEnabled=e}get name(){return this.checkDestroyed(),this._name}get options(){return this.checkDestroyed(),this._options}get config(){return this.checkDestroyed(),this._config}get container(){return this._container}get isDeleted(){return this._isDeleted}set isDeleted(e){this._isDeleted=e}checkDestroyed(){if(this.isDeleted)throw zt.create("app-deleted",{appName:this._name})}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ps=HC;function tp(t,e={}){let n=t;typeof e!="object"&&(e={name:e});const s={name:ja,automaticDataCollectionEnabled:!0,...e},r=s.name;if(typeof r!="string"||!r)throw zt.create("bad-app-name",{appName:String(r)});if(n||(n=Gf()),!n)throw zt.create("no-options");const i=Ii.get(r);if(i){if(Rn(n,i.options)&&Rn(s,i.config))return i;throw zt.create("duplicate-app",{appName:r})}const o=new Xb(r);for(const c of qa.values())o.addComponent(c);const a=new qC(n,s,o);return Ii.set(r,a),a}function zc(t=ja){const e=Ii.get(t);if(!e&&t===ja&&Gf())return tp();if(!e)throw zt.create("no-app",{appName:t});return e}function Ct(t,e,n){let s=WC[t]??t;n&&(s+=`-${n}`);const r=s.match(/\s|\//),i=e.match(/\s|\//);if(r||i){const o=[`Unable to register library "${s}" with version "${e}":`];r&&o.push(`library name "${s}" contains illegal characters (whitespace or "/")`),r&&i&&o.push("and"),i&&o.push(`version name "${e}" contains illegal characters (whitespace or "/")`),Rt.warn(o.join(" "));return}Zt(new kt(`${s}-version`,()=>({library:s,version:e}),"VERSION"))}/**
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
 */const zC="firebase-heartbeat-database",GC=1,fr="firebase-heartbeat-store";let na=null;function np(){return na||(na=uC(zC,GC,{upgrade:(t,e)=>{switch(e){case 0:try{t.createObjectStore(fr)}catch(n){console.warn(n)}}}}).catch(t=>{throw zt.create("idb-open",{originalErrorMessage:t.message})})),na}async function YC(t){try{const n=(await np()).transaction(fr),s=await n.objectStore(fr).get(sp(t));return await n.done,s}catch(e){if(e instanceof an)Rt.warn(e.message);else{const n=zt.create("idb-get",{originalErrorMessage:e?.message});Rt.warn(n.message)}}}async function vd(t,e){try{const s=(await np()).transaction(fr,"readwrite");await s.objectStore(fr).put(e,sp(t)),await s.done}catch(n){if(n instanceof an)Rt.warn(n.message);else{const s=zt.create("idb-set",{originalErrorMessage:n?.message});Rt.warn(s.message)}}}function sp(t){return`${t.name}!${t.options.appId}`}/**
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
 */const KC=1024,JC=30;class XC{constructor(e){this.container=e,this._heartbeatsCache=null;const n=this.container.getProvider("app").getImmediate();this._storage=new ZC(n),this._heartbeatsCachePromise=this._storage.read().then(s=>(this._heartbeatsCache=s,s))}async triggerHeartbeat(){try{const n=this.container.getProvider("platform-logger").getImmediate().getPlatformInfoString(),s=wd();if(this._heartbeatsCache?.heartbeats==null&&(this._heartbeatsCache=await this._heartbeatsCachePromise,this._heartbeatsCache?.heartbeats==null)||this._heartbeatsCache.lastSentHeartbeatDate===s||this._heartbeatsCache.heartbeats.some(r=>r.date===s))return;if(this._heartbeatsCache.heartbeats.push({date:s,agent:n}),this._heartbeatsCache.heartbeats.length>JC){const r=eS(this._heartbeatsCache.heartbeats);this._heartbeatsCache.heartbeats.splice(r,1)}return this._storage.overwrite(this._heartbeatsCache)}catch(e){Rt.warn(e)}}async getHeartbeatsHeader(){try{if(this._heartbeatsCache===null&&await this._heartbeatsCachePromise,this._heartbeatsCache?.heartbeats==null||this._heartbeatsCache.heartbeats.length===0)return"";const e=wd(),{heartbeatsToSend:n,unsentEntries:s}=QC(this._heartbeatsCache.heartbeats),r=bi(JSON.stringify({version:2,heartbeats:n}));return this._heartbeatsCache.lastSentHeartbeatDate=e,s.length>0?(this._heartbeatsCache.heartbeats=s,await this._storage.overwrite(this._heartbeatsCache)):(this._heartbeatsCache.heartbeats=[],this._storage.overwrite(this._heartbeatsCache)),r}catch(e){return Rt.warn(e),""}}}function wd(){return new Date().toISOString().substring(0,10)}function QC(t,e=KC){const n=[];let s=t.slice();for(const r of t){const i=n.find(o=>o.agent===r.agent);if(i){if(i.dates.push(r.date),Ed(n)>e){i.dates.pop();break}}else if(n.push({agent:r.agent,dates:[r.date]}),Ed(n)>e){n.pop();break}s=s.slice(1)}return{heartbeatsToSend:n,unsentEntries:s}}class ZC{constructor(e){this.app=e,this._canUseIndexedDBPromise=this.runIndexedDBEnvironmentCheck()}async runIndexedDBEnvironmentCheck(){return jc()?Lb().then(()=>!0).catch(()=>!1):!1}async read(){if(await this._canUseIndexedDBPromise){const n=await YC(this.app);return n?.heartbeats?n:{heartbeats:[]}}else return{heartbeats:[]}}async overwrite(e){if(await this._canUseIndexedDBPromise){const s=await this.read();return vd(this.app,{lastSentHeartbeatDate:e.lastSentHeartbeatDate??s.lastSentHeartbeatDate,heartbeats:e.heartbeats})}else return}async add(e){if(await this._canUseIndexedDBPromise){const s=await this.read();return vd(this.app,{lastSentHeartbeatDate:e.lastSentHeartbeatDate??s.lastSentHeartbeatDate,heartbeats:[...s.heartbeats,...e.heartbeats]})}else return}}function Ed(t){return bi(JSON.stringify({version:2,heartbeats:t})).length}function eS(t){if(t.length===0)return-1;let e=0,n=t[0].date;for(let s=1;s<t.length;s++)t[s].date<n&&(n=t[s].date,e=s);return e}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function tS(t){Zt(new kt("platform-logger",e=>new fC(e),"PRIVATE")),Zt(new kt("heartbeat",e=>new XC(e),"PRIVATE")),Ct(Va,_d,t),Ct(Va,_d,"esm2020"),Ct("fire-js","")}tS("");var bd={};const Cd="@firebase/database",Sd="1.1.0";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let rp="";function ip(t){rp=t}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class nS{constructor(e){this.domStorage_=e,this.prefix_="firebase:"}set(e,n){n==null?this.domStorage_.removeItem(this.prefixedName_(e)):this.domStorage_.setItem(this.prefixedName_(e),oe(n))}get(e){const n=this.domStorage_.getItem(this.prefixedName_(e));return n==null?null:hr(n)}remove(e){this.domStorage_.removeItem(this.prefixedName_(e))}prefixedName_(e){return this.prefix_+e}toString(){return this.domStorage_.toString()}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class sS{constructor(){this.cache_={},this.isInMemoryStorage=!0}set(e,n){n==null?delete this.cache_[e]:this.cache_[e]=n}get(e){return ft(this.cache_,e)?this.cache_[e]:null}remove(e){delete this.cache_[e]}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const op=function(t){try{if(typeof window<"u"&&typeof window[t]<"u"){const e=window[t];return e.setItem("firebase:sentinel","cache"),e.removeItem("firebase:sentinel"),new nS(e)}}catch{}return new sS},yn=op("localStorage"),rS=op("sessionStorage");/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Xn=new fo("@firebase/database"),iS=(function(){let t=1;return function(){return t++}})(),ap=function(t){const e=Wb(t),n=new Ub;n.update(e);const s=n.digest();return uo.encodeByteArray(s)},xr=function(...t){let e="";for(let n=0;n<t.length;n++){const s=t[n];Array.isArray(s)||s&&typeof s=="object"&&typeof s.length=="number"?e+=xr.apply(null,s):typeof s=="object"?e+=oe(s):e+=s,e+=" "}return e};let Xs=null,Td=!0;const oS=function(t,e){g(!0,"Can't turn on custom loggers persistently."),Xn.logLevel=W.VERBOSE,Xs=Xn.log.bind(Xn)},he=function(...t){if(Td===!0&&(Td=!1,Xs===null&&rS.get("logging_enabled")===!0&&oS()),Xs){const e=xr.apply(null,t);Xs(e)}},Mr=function(t){return function(...e){he(t,...e)}},za=function(...t){const e="FIREBASE INTERNAL ERROR: "+xr(...t);Xn.error(e)},At=function(...t){const e=`FIREBASE FATAL ERROR: ${xr(...t)}`;throw Xn.error(e),new Error(e)},Ie=function(...t){const e="FIREBASE WARNING: "+xr(...t);Xn.warn(e)},aS=function(){typeof window<"u"&&window.location&&window.location.protocol&&window.location.protocol.indexOf("https:")!==-1&&Ie("Insecure Firebase access from a secure page. Please use https in calls to new Firebase().")},po=function(t){return typeof t=="number"&&(t!==t||t===Number.POSITIVE_INFINITY||t===Number.NEGATIVE_INFINITY)},cS=function(t){if(document.readyState==="complete")t();else{let e=!1;const n=function(){if(!document.body){setTimeout(n,Math.floor(10));return}e||(e=!0,t())};document.addEventListener?(document.addEventListener("DOMContentLoaded",n,!1),window.addEventListener("load",n,!1)):document.attachEvent&&(document.attachEvent("onreadystatechange",()=>{document.readyState==="complete"&&n()}),window.attachEvent("onload",n))}},gs="[MIN_NAME]",An="[MAX_NAME]",Hn=function(t,e){if(t===e)return 0;if(t===gs||e===An)return-1;if(e===gs||t===An)return 1;{const n=Id(t),s=Id(e);return n!==null?s!==null?n-s===0?t.length-e.length:n-s:-1:s!==null?1:t<e?-1:1}},lS=function(t,e){return t===e?0:t<e?-1:1},Hs=function(t,e){if(e&&t in e)return e[t];throw new Error("Missing required key ("+t+") in object: "+oe(e))},Gc=function(t){if(typeof t!="object"||t===null)return oe(t);const e=[];for(const s in t)e.push(s);e.sort();let n="{";for(let s=0;s<e.length;s++)s!==0&&(n+=","),n+=oe(e[s]),n+=":",n+=Gc(t[e[s]]);return n+="}",n},cp=function(t,e){const n=t.length;if(n<=e)return[t];const s=[];for(let r=0;r<n;r+=e)r+e>n?s.push(t.substring(r,n)):s.push(t.substring(r,r+e));return s};function pe(t,e){for(const n in t)t.hasOwnProperty(n)&&e(n,t[n])}const lp=function(t){g(!po(t),"Invalid JSON number");const e=11,n=52,s=(1<<e-1)-1;let r,i,o,a,c;t===0?(i=0,o=0,r=1/t===-1/0?1:0):(r=t<0,t=Math.abs(t),t>=Math.pow(2,1-s)?(a=Math.min(Math.floor(Math.log(t)/Math.LN2),s),i=a+s,o=Math.round(t*Math.pow(2,n-a)-Math.pow(2,n))):(i=0,o=Math.round(t/Math.pow(2,1-s-n))));const l=[];for(c=n;c;c-=1)l.push(o%2?1:0),o=Math.floor(o/2);for(c=e;c;c-=1)l.push(i%2?1:0),i=Math.floor(i/2);l.push(r?1:0),l.reverse();const u=l.join("");let d="";for(c=0;c<64;c+=8){let h=parseInt(u.substr(c,8),2).toString(16);h.length===1&&(h="0"+h),d=d+h}return d.toLowerCase()},uS=function(){return!!(typeof window=="object"&&window.chrome&&window.chrome.extension&&!/^chrome/.test(window.location.href))},dS=function(){return typeof Windows=="object"&&typeof Windows.UI=="object"};function hS(t,e){let n="Unknown Error";t==="too_big"?n="The data requested exceeds the maximum size that can be accessed with a single request.":t==="permission_denied"?n="Client doesn't have permission to access the desired data.":t==="unavailable"&&(n="The service is unavailable");const s=new Error(t+" at "+e._path.toString()+": "+n);return s.code=t.toUpperCase(),s}const fS=new RegExp("^-?(0*)\\d{1,10}$"),pS=-2147483648,gS=2147483647,Id=function(t){if(fS.test(t)){const e=Number(t);if(e>=pS&&e<=gS)return e}return null},Ls=function(t){try{t()}catch(e){setTimeout(()=>{const n=e.stack||"";throw Ie("Exception was thrown by user callback.",n),e},Math.floor(0))}},mS=function(){return(typeof window=="object"&&window.navigator&&window.navigator.userAgent||"").search(/googlebot|google webmaster tools|bingbot|yahoo! slurp|baiduspider|yandexbot|duckduckbot/i)>=0},Qs=function(t,e){const n=setTimeout(t,e);return typeof n=="number"&&typeof Deno<"u"&&Deno.unrefTimer?Deno.unrefTimer(n):typeof n=="object"&&n.unref&&n.unref(),n};/**
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
 */class _S{constructor(e,n){this.appCheckProvider=n,this.appName=e.name,Ge(e)&&e.settings.appCheckToken&&(this.serverAppAppCheckToken=e.settings.appCheckToken),this.appCheck=n?.getImmediate({optional:!0}),this.appCheck||n?.get().then(s=>this.appCheck=s)}getToken(e){if(this.serverAppAppCheckToken){if(e)throw new Error("Attempted reuse of `FirebaseServerApp.appCheckToken` after previous usage failed.");return Promise.resolve({token:this.serverAppAppCheckToken})}return this.appCheck?this.appCheck.getToken(e):new Promise((n,s)=>{setTimeout(()=>{this.appCheck?this.getToken(e).then(n,s):n(null)},0)})}addTokenChangeListener(e){this.appCheckProvider?.get().then(n=>n.addTokenListener(e))}notifyForInvalidToken(){Ie(`Provided AppCheck credentials for the app named "${this.appName}" are invalid. This usually indicates your app was not initialized correctly.`)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class yS{constructor(e,n,s){this.appName_=e,this.firebaseOptions_=n,this.authProvider_=s,this.auth_=null,this.auth_=s.getImmediate({optional:!0}),this.auth_||s.onInit(r=>this.auth_=r)}getToken(e){return this.auth_?this.auth_.getToken(e).catch(n=>n&&n.code==="auth/token-not-initialized"?(he("Got auth/token-not-initialized error.  Treating as null token."),null):Promise.reject(n)):new Promise((n,s)=>{setTimeout(()=>{this.auth_?this.getToken(e).then(n,s):n(null)},0)})}addTokenChangeListener(e){this.auth_?this.auth_.addAuthTokenListener(e):this.authProvider_.get().then(n=>n.addAuthTokenListener(e))}removeTokenChangeListener(e){this.authProvider_.get().then(n=>n.removeAuthTokenListener(e))}notifyForInvalidToken(){let e='Provided authentication credentials for the app named "'+this.appName_+'" are invalid. This usually indicates your app was not initialized correctly. ';"credential"in this.firebaseOptions_?e+='Make sure the "credential" property provided to initializeApp() is authorized to access the specified "databaseURL" and is from the correct project.':"serviceAccount"in this.firebaseOptions_?e+='Make sure the "serviceAccount" property provided to initializeApp() is authorized to access the specified "databaseURL" and is from the correct project.':e+='Make sure the "apiKey" and "databaseURL" properties provided to initializeApp() match the values provided for your app at https://console.firebase.google.com/.',Ie(e)}}class di{constructor(e){this.accessToken=e}getToken(e){return Promise.resolve({accessToken:this.accessToken})}addTokenChangeListener(e){e(this.accessToken)}removeTokenChangeListener(e){}notifyForInvalidToken(){}}di.OWNER="owner";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Yc="5",up="v",dp="s",hp="r",fp="f",pp=/(console\.firebase|firebase-console-\w+\.corp|firebase\.corp)\.google\.com/,gp="ls",mp="p",Ga="ac",_p="websocket",yp="long_polling";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class vp{constructor(e,n,s,r,i=!1,o="",a=!1,c=!1,l=null){this.secure=n,this.namespace=s,this.webSocketOnly=r,this.nodeAdmin=i,this.persistenceKey=o,this.includeNamespaceInQueryParams=a,this.isUsingEmulator=c,this.emulatorOptions=l,this._host=e.toLowerCase(),this._domain=this._host.substr(this._host.indexOf(".")+1),this.internalHost=yn.get("host:"+e)||this._host}isCacheableHost(){return this.internalHost.substr(0,2)==="s-"}isCustomHost(){return this._domain!=="firebaseio.com"&&this._domain!=="firebaseio-demo.com"}get host(){return this._host}set host(e){e!==this.internalHost&&(this.internalHost=e,this.isCacheableHost()&&yn.set("host:"+this._host,this.internalHost))}toString(){let e=this.toURLString();return this.persistenceKey&&(e+="<"+this.persistenceKey+">"),e}toURLString(){const e=this.secure?"https://":"http://",n=this.includeNamespaceInQueryParams?`?ns=${this.namespace}`:"";return`${e}${this.host}/${n}`}}function vS(t){return t.host!==t.internalHost||t.isCustomHost()||t.includeNamespaceInQueryParams}function wp(t,e,n){g(typeof e=="string","typeof type must == string"),g(typeof n=="object","typeof params must == object");let s;if(e===_p)s=(t.secure?"wss://":"ws://")+t.internalHost+"/.ws?";else if(e===yp)s=(t.secure?"https://":"http://")+t.internalHost+"/.lp?";else throw new Error("Unknown connection type: "+e);vS(t)&&(n.ns=t.namespace);const r=[];return pe(n,(i,o)=>{r.push(i+"="+o)}),s+r.join("&")}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class wS{constructor(){this.counters_={}}incrementCounter(e,n=1){ft(this.counters_,e)||(this.counters_[e]=0),this.counters_[e]+=n}get(){return vb(this.counters_)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const sa={},ra={};function Kc(t){const e=t.toString();return sa[e]||(sa[e]=new wS),sa[e]}function ES(t,e){const n=t.toString();return ra[n]||(ra[n]=e()),ra[n]}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class bS{constructor(e){this.onMessage_=e,this.pendingResponses=[],this.currentResponseNum=0,this.closeAfterResponse=-1,this.onClose=null}closeAfter(e,n){this.closeAfterResponse=e,this.onClose=n,this.closeAfterResponse<this.currentResponseNum&&(this.onClose(),this.onClose=null)}handleResponse(e,n){for(this.pendingResponses[e]=n;this.pendingResponses[this.currentResponseNum];){const s=this.pendingResponses[this.currentResponseNum];delete this.pendingResponses[this.currentResponseNum];for(let r=0;r<s.length;++r)s[r]&&Ls(()=>{this.onMessage_(s[r])});if(this.currentResponseNum===this.closeAfterResponse){this.onClose&&(this.onClose(),this.onClose=null);break}this.currentResponseNum++}}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const kd="start",CS="close",SS="pLPCommand",TS="pRTLPCB",Ep="id",bp="pw",Cp="ser",IS="cb",kS="seg",RS="ts",AS="d",NS="dframe",Sp=1870,Tp=30,PS=Sp-Tp,LS=25e3,OS=3e4;class Yn{constructor(e,n,s,r,i,o,a){this.connId=e,this.repoInfo=n,this.applicationId=s,this.appCheckToken=r,this.authToken=i,this.transportSessionId=o,this.lastSessionId=a,this.bytesSent=0,this.bytesReceived=0,this.everConnected_=!1,this.log_=Mr(e),this.stats_=Kc(n),this.urlFn=c=>(this.appCheckToken&&(c[Ga]=this.appCheckToken),wp(n,yp,c))}open(e,n){this.curSegmentNum=0,this.onDisconnect_=n,this.myPacketOrderer=new bS(e),this.isClosed_=!1,this.connectTimeoutTimer_=setTimeout(()=>{this.log_("Timed out trying to connect."),this.onClosed_(),this.connectTimeoutTimer_=null},Math.floor(OS)),cS(()=>{if(this.isClosed_)return;this.scriptTagHolder=new Jc((...i)=>{const[o,a,c,l,u]=i;if(this.incrementIncomingBytes_(i),!!this.scriptTagHolder)if(this.connectTimeoutTimer_&&(clearTimeout(this.connectTimeoutTimer_),this.connectTimeoutTimer_=null),this.everConnected_=!0,o===kd)this.id=a,this.password=c;else if(o===CS)a?(this.scriptTagHolder.sendNewPolls=!1,this.myPacketOrderer.closeAfter(a,()=>{this.onClosed_()})):this.onClosed_();else throw new Error("Unrecognized command received: "+o)},(...i)=>{const[o,a]=i;this.incrementIncomingBytes_(i),this.myPacketOrderer.handleResponse(o,a)},()=>{this.onClosed_()},this.urlFn);const s={};s[kd]="t",s[Cp]=Math.floor(Math.random()*1e8),this.scriptTagHolder.uniqueCallbackIdentifier&&(s[IS]=this.scriptTagHolder.uniqueCallbackIdentifier),s[up]=Yc,this.transportSessionId&&(s[dp]=this.transportSessionId),this.lastSessionId&&(s[gp]=this.lastSessionId),this.applicationId&&(s[mp]=this.applicationId),this.appCheckToken&&(s[Ga]=this.appCheckToken),typeof location<"u"&&location.hostname&&pp.test(location.hostname)&&(s[hp]=fp);const r=this.urlFn(s);this.log_("Connecting via long-poll to "+r),this.scriptTagHolder.addTag(r,()=>{})})}start(){this.scriptTagHolder.startLongPoll(this.id,this.password),this.addDisconnectPingFrame(this.id,this.password)}static forceAllow(){Yn.forceAllow_=!0}static forceDisallow(){Yn.forceDisallow_=!0}static isAvailable(){return Yn.forceAllow_?!0:!Yn.forceDisallow_&&typeof document<"u"&&document.createElement!=null&&!uS()&&!dS()}markConnectionHealthy(){}shutdown_(){this.isClosed_=!0,this.scriptTagHolder&&(this.scriptTagHolder.close(),this.scriptTagHolder=null),this.myDisconnFrame&&(document.body.removeChild(this.myDisconnFrame),this.myDisconnFrame=null),this.connectTimeoutTimer_&&(clearTimeout(this.connectTimeoutTimer_),this.connectTimeoutTimer_=null)}onClosed_(){this.isClosed_||(this.log_("Longpoll is closing itself"),this.shutdown_(),this.onDisconnect_&&(this.onDisconnect_(this.everConnected_),this.onDisconnect_=null))}close(){this.isClosed_||(this.log_("Longpoll is being closed."),this.shutdown_())}send(e){const n=oe(e);this.bytesSent+=n.length,this.stats_.incrementCounter("bytes_sent",n.length);const s=Vf(n),r=cp(s,PS);for(let i=0;i<r.length;i++)this.scriptTagHolder.enqueueSegment(this.curSegmentNum,r.length,r[i]),this.curSegmentNum++}addDisconnectPingFrame(e,n){this.myDisconnFrame=document.createElement("iframe");const s={};s[NS]="t",s[Ep]=e,s[bp]=n,this.myDisconnFrame.src=this.urlFn(s),this.myDisconnFrame.style.display="none",document.body.appendChild(this.myDisconnFrame)}incrementIncomingBytes_(e){const n=oe(e).length;this.bytesReceived+=n,this.stats_.incrementCounter("bytes_received",n)}}class Jc{constructor(e,n,s,r){this.onDisconnect=s,this.urlFn=r,this.outstandingRequests=new Set,this.pendingSegs=[],this.currentSerial=Math.floor(Math.random()*1e8),this.sendNewPolls=!0;{this.uniqueCallbackIdentifier=iS(),window[SS+this.uniqueCallbackIdentifier]=e,window[TS+this.uniqueCallbackIdentifier]=n,this.myIFrame=Jc.createIFrame_();let i="";this.myIFrame.src&&this.myIFrame.src.substr(0,11)==="javascript:"&&(i='<script>document.domain="'+document.domain+'";<\/script>');const o="<html><body>"+i+"</body></html>";try{this.myIFrame.doc.open(),this.myIFrame.doc.write(o),this.myIFrame.doc.close()}catch(a){he("frame writing exception"),a.stack&&he(a.stack),he(a)}}}static createIFrame_(){const e=document.createElement("iframe");if(e.style.display="none",document.body){document.body.appendChild(e);try{e.contentWindow.document||he("No IE domain setting required")}catch{const s=document.domain;e.src="javascript:void((function(){document.open();document.domain='"+s+"';document.close();})())"}}else throw"Document body has not initialized. Wait to initialize Firebase until after the document is ready.";return e.contentDocument?e.doc=e.contentDocument:e.contentWindow?e.doc=e.contentWindow.document:e.document&&(e.doc=e.document),e}close(){this.alive=!1,this.myIFrame&&(this.myIFrame.doc.body.textContent="",setTimeout(()=>{this.myIFrame!==null&&(document.body.removeChild(this.myIFrame),this.myIFrame=null)},Math.floor(0)));const e=this.onDisconnect;e&&(this.onDisconnect=null,e())}startLongPoll(e,n){for(this.myID=e,this.myPW=n,this.alive=!0;this.newRequest_(););}newRequest_(){if(this.alive&&this.sendNewPolls&&this.outstandingRequests.size<(this.pendingSegs.length>0?2:1)){this.currentSerial++;const e={};e[Ep]=this.myID,e[bp]=this.myPW,e[Cp]=this.currentSerial;let n=this.urlFn(e),s="",r=0;for(;this.pendingSegs.length>0&&this.pendingSegs[0].d.length+Tp+s.length<=Sp;){const o=this.pendingSegs.shift();s=s+"&"+kS+r+"="+o.seg+"&"+RS+r+"="+o.ts+"&"+AS+r+"="+o.d,r++}return n=n+s,this.addLongPollTag_(n,this.currentSerial),!0}else return!1}enqueueSegment(e,n,s){this.pendingSegs.push({seg:e,ts:n,d:s}),this.alive&&this.newRequest_()}addLongPollTag_(e,n){this.outstandingRequests.add(n);const s=()=>{this.outstandingRequests.delete(n),this.newRequest_()},r=setTimeout(s,Math.floor(LS)),i=()=>{clearTimeout(r),s()};this.addTag(e,i)}addTag(e,n){setTimeout(()=>{try{if(!this.sendNewPolls)return;const s=this.myIFrame.doc.createElement("script");s.type="text/javascript",s.async=!0,s.src=e,s.onload=s.onreadystatechange=function(){const r=s.readyState;(!r||r==="loaded"||r==="complete")&&(s.onload=s.onreadystatechange=null,s.parentNode&&s.parentNode.removeChild(s),n())},s.onerror=()=>{he("Long-poll script failed to load: "+e),this.sendNewPolls=!1,this.close()},this.myIFrame.doc.body.appendChild(s)}catch{}},Math.floor(1))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const DS=16384,xS=45e3;let ki=null;typeof MozWebSocket<"u"?ki=MozWebSocket:typeof WebSocket<"u"&&(ki=WebSocket);class Ye{constructor(e,n,s,r,i,o,a){this.connId=e,this.applicationId=s,this.appCheckToken=r,this.authToken=i,this.keepaliveTimer=null,this.frames=null,this.totalFrames=0,this.bytesSent=0,this.bytesReceived=0,this.log_=Mr(this.connId),this.stats_=Kc(n),this.connURL=Ye.connectionURL_(n,o,a,r,s),this.nodeAdmin=n.nodeAdmin}static connectionURL_(e,n,s,r,i){const o={};return o[up]=Yc,typeof location<"u"&&location.hostname&&pp.test(location.hostname)&&(o[hp]=fp),n&&(o[dp]=n),s&&(o[gp]=s),r&&(o[Ga]=r),i&&(o[mp]=i),wp(e,_p,o)}open(e,n){this.onDisconnect=n,this.onMessage=e,this.log_("Websocket connecting to "+this.connURL),this.everConnected_=!1,yn.set("previous_websocket_failure",!0);try{let s;Pb(),this.mySock=new ki(this.connURL,[],s)}catch(s){this.log_("Error instantiating WebSocket.");const r=s.message||s.data;r&&this.log_(r),this.onClosed_();return}this.mySock.onopen=()=>{this.log_("Websocket connected."),this.everConnected_=!0},this.mySock.onclose=()=>{this.log_("Websocket connection was disconnected."),this.mySock=null,this.onClosed_()},this.mySock.onmessage=s=>{this.handleIncomingFrame(s)},this.mySock.onerror=s=>{this.log_("WebSocket error.  Closing connection.");const r=s.message||s.data;r&&this.log_(r),this.onClosed_()}}start(){}static forceDisallow(){Ye.forceDisallow_=!0}static isAvailable(){let e=!1;if(typeof navigator<"u"&&navigator.userAgent){const n=/Android ([0-9]{0,}\.[0-9]{0,})/,s=navigator.userAgent.match(n);s&&s.length>1&&parseFloat(s[1])<4.4&&(e=!0)}return!e&&ki!==null&&!Ye.forceDisallow_}static previouslyFailed(){return yn.isInMemoryStorage||yn.get("previous_websocket_failure")===!0}markConnectionHealthy(){yn.remove("previous_websocket_failure")}appendFrame_(e){if(this.frames.push(e),this.frames.length===this.totalFrames){const n=this.frames.join("");this.frames=null;const s=hr(n);this.onMessage(s)}}handleNewFrameCount_(e){this.totalFrames=e,this.frames=[]}extractFrameCount_(e){if(g(this.frames===null,"We already have a frame buffer"),e.length<=6){const n=Number(e);if(!isNaN(n))return this.handleNewFrameCount_(n),null}return this.handleNewFrameCount_(1),e}handleIncomingFrame(e){if(this.mySock===null)return;const n=e.data;if(this.bytesReceived+=n.length,this.stats_.incrementCounter("bytes_received",n.length),this.resetKeepAlive(),this.frames!==null)this.appendFrame_(n);else{const s=this.extractFrameCount_(n);s!==null&&this.appendFrame_(s)}}send(e){this.resetKeepAlive();const n=oe(e);this.bytesSent+=n.length,this.stats_.incrementCounter("bytes_sent",n.length);const s=cp(n,DS);s.length>1&&this.sendString_(String(s.length));for(let r=0;r<s.length;r++)this.sendString_(s[r])}shutdown_(){this.isClosed_=!0,this.keepaliveTimer&&(clearInterval(this.keepaliveTimer),this.keepaliveTimer=null),this.mySock&&(this.mySock.close(),this.mySock=null)}onClosed_(){this.isClosed_||(this.log_("WebSocket is closing itself"),this.shutdown_(),this.onDisconnect&&(this.onDisconnect(this.everConnected_),this.onDisconnect=null))}close(){this.isClosed_||(this.log_("WebSocket is being closed"),this.shutdown_())}resetKeepAlive(){clearInterval(this.keepaliveTimer),this.keepaliveTimer=setInterval(()=>{this.mySock&&this.sendString_("0"),this.resetKeepAlive()},Math.floor(xS))}sendString_(e){try{this.mySock.send(e)}catch(n){this.log_("Exception thrown from WebSocket.send():",n.message||n.data,"Closing connection."),setTimeout(this.onClosed_.bind(this),0)}}}Ye.responsesRequiredToBeHealthy=2;Ye.healthyTimeout=3e4;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class pr{static get ALL_TRANSPORTS(){return[Yn,Ye]}static get IS_TRANSPORT_INITIALIZED(){return this.globalTransportInitialized_}constructor(e){this.initTransports_(e)}initTransports_(e){const n=Ye&&Ye.isAvailable();let s=n&&!Ye.previouslyFailed();if(e.webSocketOnly&&(n||Ie("wss:// URL used, but browser isn't known to support websockets.  Trying anyway."),s=!0),s)this.transports_=[Ye];else{const r=this.transports_=[];for(const i of pr.ALL_TRANSPORTS)i&&i.isAvailable()&&r.push(i);pr.globalTransportInitialized_=!0}}initialTransport(){if(this.transports_.length>0)return this.transports_[0];throw new Error("No transports available")}upgradeTransport(){return this.transports_.length>1?this.transports_[1]:null}}pr.globalTransportInitialized_=!1;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const MS=6e4,FS=5e3,US=10*1024,$S=100*1024,ia="t",Rd="d",BS="s",Ad="r",HS="e",Nd="o",Pd="a",Ld="n",Od="p",WS="h";class VS{constructor(e,n,s,r,i,o,a,c,l,u){this.id=e,this.repoInfo_=n,this.applicationId_=s,this.appCheckToken_=r,this.authToken_=i,this.onMessage_=o,this.onReady_=a,this.onDisconnect_=c,this.onKill_=l,this.lastSessionId=u,this.connectionCount=0,this.pendingDataMessages=[],this.state_=0,this.log_=Mr("c:"+this.id+":"),this.transportManager_=new pr(n),this.log_("Connection created"),this.start_()}start_(){const e=this.transportManager_.initialTransport();this.conn_=new e(this.nextTransportId_(),this.repoInfo_,this.applicationId_,this.appCheckToken_,this.authToken_,null,this.lastSessionId),this.primaryResponsesRequired_=e.responsesRequiredToBeHealthy||0;const n=this.connReceiver_(this.conn_),s=this.disconnReceiver_(this.conn_);this.tx_=this.conn_,this.rx_=this.conn_,this.secondaryConn_=null,this.isHealthy_=!1,setTimeout(()=>{this.conn_&&this.conn_.open(n,s)},Math.floor(0));const r=e.healthyTimeout||0;r>0&&(this.healthyTimeout_=Qs(()=>{this.healthyTimeout_=null,this.isHealthy_||(this.conn_&&this.conn_.bytesReceived>$S?(this.log_("Connection exceeded healthy timeout but has received "+this.conn_.bytesReceived+" bytes.  Marking connection healthy."),this.isHealthy_=!0,this.conn_.markConnectionHealthy()):this.conn_&&this.conn_.bytesSent>US?this.log_("Connection exceeded healthy timeout but has sent "+this.conn_.bytesSent+" bytes.  Leaving connection alive."):(this.log_("Closing unhealthy connection after timeout."),this.close()))},Math.floor(r)))}nextTransportId_(){return"c:"+this.id+":"+this.connectionCount++}disconnReceiver_(e){return n=>{e===this.conn_?this.onConnectionLost_(n):e===this.secondaryConn_?(this.log_("Secondary connection lost."),this.onSecondaryConnectionLost_()):this.log_("closing an old connection")}}connReceiver_(e){return n=>{this.state_!==2&&(e===this.rx_?this.onPrimaryMessageReceived_(n):e===this.secondaryConn_?this.onSecondaryMessageReceived_(n):this.log_("message on old connection"))}}sendRequest(e){const n={t:"d",d:e};this.sendData_(n)}tryCleanupConnection(){this.tx_===this.secondaryConn_&&this.rx_===this.secondaryConn_&&(this.log_("cleaning up and promoting a connection: "+this.secondaryConn_.connId),this.conn_=this.secondaryConn_,this.secondaryConn_=null)}onSecondaryControl_(e){if(ia in e){const n=e[ia];n===Pd?this.upgradeIfSecondaryHealthy_():n===Ad?(this.log_("Got a reset on secondary, closing it"),this.secondaryConn_.close(),(this.tx_===this.secondaryConn_||this.rx_===this.secondaryConn_)&&this.close()):n===Nd&&(this.log_("got pong on secondary."),this.secondaryResponsesRequired_--,this.upgradeIfSecondaryHealthy_())}}onSecondaryMessageReceived_(e){const n=Hs("t",e),s=Hs("d",e);if(n==="c")this.onSecondaryControl_(s);else if(n==="d")this.pendingDataMessages.push(s);else throw new Error("Unknown protocol layer: "+n)}upgradeIfSecondaryHealthy_(){this.secondaryResponsesRequired_<=0?(this.log_("Secondary connection is healthy."),this.isHealthy_=!0,this.secondaryConn_.markConnectionHealthy(),this.proceedWithUpgrade_()):(this.log_("sending ping on secondary."),this.secondaryConn_.send({t:"c",d:{t:Od,d:{}}}))}proceedWithUpgrade_(){this.secondaryConn_.start(),this.log_("sending client ack on secondary"),this.secondaryConn_.send({t:"c",d:{t:Pd,d:{}}}),this.log_("Ending transmission on primary"),this.conn_.send({t:"c",d:{t:Ld,d:{}}}),this.tx_=this.secondaryConn_,this.tryCleanupConnection()}onPrimaryMessageReceived_(e){const n=Hs("t",e),s=Hs("d",e);n==="c"?this.onControl_(s):n==="d"&&this.onDataMessage_(s)}onDataMessage_(e){this.onPrimaryResponse_(),this.onMessage_(e)}onPrimaryResponse_(){this.isHealthy_||(this.primaryResponsesRequired_--,this.primaryResponsesRequired_<=0&&(this.log_("Primary connection is healthy."),this.isHealthy_=!0,this.conn_.markConnectionHealthy()))}onControl_(e){const n=Hs(ia,e);if(Rd in e){const s=e[Rd];if(n===WS){const r={...s};this.repoInfo_.isUsingEmulator&&(r.h=this.repoInfo_.host),this.onHandshake_(r)}else if(n===Ld){this.log_("recvd end transmission on primary"),this.rx_=this.secondaryConn_;for(let r=0;r<this.pendingDataMessages.length;++r)this.onDataMessage_(this.pendingDataMessages[r]);this.pendingDataMessages=[],this.tryCleanupConnection()}else n===BS?this.onConnectionShutdown_(s):n===Ad?this.onReset_(s):n===HS?za("Server Error: "+s):n===Nd?(this.log_("got pong on primary."),this.onPrimaryResponse_(),this.sendPingOnPrimaryIfNecessary_()):za("Unknown control packet command: "+n)}}onHandshake_(e){const n=e.ts,s=e.v,r=e.h;this.sessionId=e.s,this.repoInfo_.host=r,this.state_===0&&(this.conn_.start(),this.onConnectionEstablished_(this.conn_,n),Yc!==s&&Ie("Protocol version mismatch detected"),this.tryStartUpgrade_())}tryStartUpgrade_(){const e=this.transportManager_.upgradeTransport();e&&this.startUpgrade_(e)}startUpgrade_(e){this.secondaryConn_=new e(this.nextTransportId_(),this.repoInfo_,this.applicationId_,this.appCheckToken_,this.authToken_,this.sessionId),this.secondaryResponsesRequired_=e.responsesRequiredToBeHealthy||0;const n=this.connReceiver_(this.secondaryConn_),s=this.disconnReceiver_(this.secondaryConn_);this.secondaryConn_.open(n,s),Qs(()=>{this.secondaryConn_&&(this.log_("Timed out trying to upgrade."),this.secondaryConn_.close())},Math.floor(MS))}onReset_(e){this.log_("Reset packet received.  New host: "+e),this.repoInfo_.host=e,this.state_===1?this.close():(this.closeConnections_(),this.start_())}onConnectionEstablished_(e,n){this.log_("Realtime connection established."),this.conn_=e,this.state_=1,this.onReady_&&(this.onReady_(n,this.sessionId),this.onReady_=null),this.primaryResponsesRequired_===0?(this.log_("Primary connection is healthy."),this.isHealthy_=!0):Qs(()=>{this.sendPingOnPrimaryIfNecessary_()},Math.floor(FS))}sendPingOnPrimaryIfNecessary_(){!this.isHealthy_&&this.state_===1&&(this.log_("sending ping on primary."),this.sendData_({t:"c",d:{t:Od,d:{}}}))}onSecondaryConnectionLost_(){const e=this.secondaryConn_;this.secondaryConn_=null,(this.tx_===e||this.rx_===e)&&this.close()}onConnectionLost_(e){this.conn_=null,!e&&this.state_===0?(this.log_("Realtime connection failed."),this.repoInfo_.isCacheableHost()&&(yn.remove("host:"+this.repoInfo_.host),this.repoInfo_.internalHost=this.repoInfo_.host)):this.state_===1&&this.log_("Realtime connection lost."),this.close()}onConnectionShutdown_(e){this.log_("Connection shutdown command received. Shutting down..."),this.onKill_&&(this.onKill_(e),this.onKill_=null),this.onDisconnect_=null,this.close()}sendData_(e){if(this.state_!==1)throw"Connection is not connected";this.tx_.send(e)}close(){this.state_!==2&&(this.log_("Closing realtime connection."),this.state_=2,this.closeConnections_(),this.onDisconnect_&&(this.onDisconnect_(),this.onDisconnect_=null))}closeConnections_(){this.log_("Shutting down all connections"),this.conn_&&(this.conn_.close(),this.conn_=null),this.secondaryConn_&&(this.secondaryConn_.close(),this.secondaryConn_=null),this.healthyTimeout_&&(clearTimeout(this.healthyTimeout_),this.healthyTimeout_=null)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ip{put(e,n,s,r){}merge(e,n,s,r){}refreshAuthToken(e){}refreshAppCheckToken(e){}onDisconnectPut(e,n,s){}onDisconnectMerge(e,n,s){}onDisconnectCancel(e,n){}reportStats(e){}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class kp{constructor(e){this.allowedEvents_=e,this.listeners_={},g(Array.isArray(e)&&e.length>0,"Requires a non-empty array")}trigger(e,...n){if(Array.isArray(this.listeners_[e])){const s=[...this.listeners_[e]];for(let r=0;r<s.length;r++)s[r].callback.apply(s[r].context,n)}}on(e,n,s){this.validateEventType_(e),this.listeners_[e]=this.listeners_[e]||[],this.listeners_[e].push({callback:n,context:s});const r=this.getInitialEvent(e);r&&n.apply(s,r)}off(e,n,s){this.validateEventType_(e);const r=this.listeners_[e]||[];for(let i=0;i<r.length;i++)if(r[i].callback===n&&(!s||s===r[i].context)){r.splice(i,1);return}}validateEventType_(e){g(this.allowedEvents_.find(n=>n===e),"Unknown event: "+e)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ri extends kp{static getInstance(){return new Ri}constructor(){super(["online"]),this.online_=!0,typeof window<"u"&&typeof window.addEventListener<"u"&&!Vc()&&(window.addEventListener("online",()=>{this.online_||(this.online_=!0,this.trigger("online",!0))},!1),window.addEventListener("offline",()=>{this.online_&&(this.online_=!1,this.trigger("online",!1))},!1))}getInitialEvent(e){return g(e==="online","Unknown event type: "+e),[this.online_]}currentlyOnline(){return this.online_}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Dd=32,xd=768;class H{constructor(e,n){if(n===void 0){this.pieces_=e.split("/");let s=0;for(let r=0;r<this.pieces_.length;r++)this.pieces_[r].length>0&&(this.pieces_[s]=this.pieces_[r],s++);this.pieces_.length=s,this.pieceNum_=0}else this.pieces_=e,this.pieceNum_=n}toString(){let e="";for(let n=this.pieceNum_;n<this.pieces_.length;n++)this.pieces_[n]!==""&&(e+="/"+this.pieces_[n]);return e||"/"}}function F(){return new H("")}function N(t){return t.pieceNum_>=t.pieces_.length?null:t.pieces_[t.pieceNum_]}function en(t){return t.pieces_.length-t.pieceNum_}function j(t){let e=t.pieceNum_;return e<t.pieces_.length&&e++,new H(t.pieces_,e)}function Xc(t){return t.pieceNum_<t.pieces_.length?t.pieces_[t.pieces_.length-1]:null}function jS(t){let e="";for(let n=t.pieceNum_;n<t.pieces_.length;n++)t.pieces_[n]!==""&&(e+="/"+encodeURIComponent(String(t.pieces_[n])));return e||"/"}function gr(t,e=0){return t.pieces_.slice(t.pieceNum_+e)}function Rp(t){if(t.pieceNum_>=t.pieces_.length)return null;const e=[];for(let n=t.pieceNum_;n<t.pieces_.length-1;n++)e.push(t.pieces_[n]);return new H(e,0)}function X(t,e){const n=[];for(let s=t.pieceNum_;s<t.pieces_.length;s++)n.push(t.pieces_[s]);if(e instanceof H)for(let s=e.pieceNum_;s<e.pieces_.length;s++)n.push(e.pieces_[s]);else{const s=e.split("/");for(let r=0;r<s.length;r++)s[r].length>0&&n.push(s[r])}return new H(n,0)}function L(t){return t.pieceNum_>=t.pieces_.length}function Te(t,e){const n=N(t),s=N(e);if(n===null)return e;if(n===s)return Te(j(t),j(e));throw new Error("INTERNAL ERROR: innerPath ("+e+") is not within outerPath ("+t+")")}function qS(t,e){const n=gr(t,0),s=gr(e,0);for(let r=0;r<n.length&&r<s.length;r++){const i=Hn(n[r],s[r]);if(i!==0)return i}return n.length===s.length?0:n.length<s.length?-1:1}function Qc(t,e){if(en(t)!==en(e))return!1;for(let n=t.pieceNum_,s=e.pieceNum_;n<=t.pieces_.length;n++,s++)if(t.pieces_[n]!==e.pieces_[s])return!1;return!0}function Ue(t,e){let n=t.pieceNum_,s=e.pieceNum_;if(en(t)>en(e))return!1;for(;n<t.pieces_.length;){if(t.pieces_[n]!==e.pieces_[s])return!1;++n,++s}return!0}class zS{constructor(e,n){this.errorPrefix_=n,this.parts_=gr(e,0),this.byteLength_=Math.max(1,this.parts_.length);for(let s=0;s<this.parts_.length;s++)this.byteLength_+=ho(this.parts_[s]);Ap(this)}}function GS(t,e){t.parts_.length>0&&(t.byteLength_+=1),t.parts_.push(e),t.byteLength_+=ho(e),Ap(t)}function YS(t){const e=t.parts_.pop();t.byteLength_-=ho(e),t.parts_.length>0&&(t.byteLength_-=1)}function Ap(t){if(t.byteLength_>xd)throw new Error(t.errorPrefix_+"has a key path longer than "+xd+" bytes ("+t.byteLength_+").");if(t.parts_.length>Dd)throw new Error(t.errorPrefix_+"path specified exceeds the maximum depth that can be written ("+Dd+") or object contains a cycle "+gn(t))}function gn(t){return t.parts_.length===0?"":"in property '"+t.parts_.join(".")+"'"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Zc extends kp{static getInstance(){return new Zc}constructor(){super(["visible"]);let e,n;typeof document<"u"&&typeof document.addEventListener<"u"&&(typeof document.hidden<"u"?(n="visibilitychange",e="hidden"):typeof document.mozHidden<"u"?(n="mozvisibilitychange",e="mozHidden"):typeof document.msHidden<"u"?(n="msvisibilitychange",e="msHidden"):typeof document.webkitHidden<"u"&&(n="webkitvisibilitychange",e="webkitHidden")),this.visible_=!0,n&&document.addEventListener(n,()=>{const s=!document[e];s!==this.visible_&&(this.visible_=s,this.trigger("visible",s))},!1)}getInitialEvent(e){return g(e==="visible","Unknown event type: "+e),[this.visible_]}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ws=1e3,KS=300*1e3,Md=30*1e3,JS=1.3,XS=3e4,QS="server_kill",Fd=3;class St extends Ip{constructor(e,n,s,r,i,o,a,c){if(super(),this.repoInfo_=e,this.applicationId_=n,this.onDataUpdate_=s,this.onConnectStatus_=r,this.onServerInfoUpdate_=i,this.authTokenProvider_=o,this.appCheckTokenProvider_=a,this.authOverride_=c,this.id=St.nextPersistentConnectionId_++,this.log_=Mr("p:"+this.id+":"),this.interruptReasons_={},this.listens=new Map,this.outstandingPuts_=[],this.outstandingGets_=[],this.outstandingPutCount_=0,this.outstandingGetCount_=0,this.onDisconnectRequestQueue_=[],this.connected_=!1,this.reconnectDelay_=Ws,this.maxReconnectDelay_=KS,this.securityDebugCallback_=null,this.lastSessionId=null,this.establishConnectionTimer_=null,this.visible_=!1,this.requestCBHash_={},this.requestNumber_=0,this.realtime_=null,this.authToken_=null,this.appCheckToken_=null,this.forceTokenRefresh_=!1,this.invalidAuthTokenCount_=0,this.invalidAppCheckTokenCount_=0,this.firstConnection_=!0,this.lastConnectionAttemptTime_=null,this.lastConnectionEstablishedTime_=null,c)throw new Error("Auth override specified in options, but not supported on non Node.js platforms");Zc.getInstance().on("visible",this.onVisible_,this),e.host.indexOf("fblocal")===-1&&Ri.getInstance().on("online",this.onOnline_,this)}sendRequest(e,n,s){const r=++this.requestNumber_,i={r,a:e,b:n};this.log_(oe(i)),g(this.connected_,"sendRequest call when we're not connected not allowed."),this.realtime_.sendRequest(i),s&&(this.requestCBHash_[r]=s)}get(e){this.initConnection_();const n=new Ae,r={action:"g",request:{p:e._path.toString(),q:e._queryObject},onComplete:o=>{const a=o.d;o.s==="ok"?n.resolve(a):n.reject(a)}};this.outstandingGets_.push(r),this.outstandingGetCount_++;const i=this.outstandingGets_.length-1;return this.connected_&&this.sendGet_(i),n.promise}listen(e,n,s,r){this.initConnection_();const i=e._queryIdentifier,o=e._path.toString();this.log_("Listen called for "+o+" "+i),this.listens.has(o)||this.listens.set(o,new Map),g(e._queryParams.isDefault()||!e._queryParams.loadsAllData(),"listen() called for non-default but complete query"),g(!this.listens.get(o).has(i),"listen() called twice for same path/queryId.");const a={onComplete:r,hashFn:n,query:e,tag:s};this.listens.get(o).set(i,a),this.connected_&&this.sendListen_(a)}sendGet_(e){const n=this.outstandingGets_[e];this.sendRequest("g",n.request,s=>{delete this.outstandingGets_[e],this.outstandingGetCount_--,this.outstandingGetCount_===0&&(this.outstandingGets_=[]),n.onComplete&&n.onComplete(s)})}sendListen_(e){const n=e.query,s=n._path.toString(),r=n._queryIdentifier;this.log_("Listen on "+s+" for "+r);const i={p:s},o="q";e.tag&&(i.q=n._queryObject,i.t=e.tag),i.h=e.hashFn(),this.sendRequest(o,i,a=>{const c=a.d,l=a.s;St.warnOnListenWarnings_(c,n),(this.listens.get(s)&&this.listens.get(s).get(r))===e&&(this.log_("listen response",a),l!=="ok"&&this.removeListen_(s,r),e.onComplete&&e.onComplete(l,c))})}static warnOnListenWarnings_(e,n){if(e&&typeof e=="object"&&ft(e,"w")){const s=fs(e,"w");if(Array.isArray(s)&&~s.indexOf("no_index")){const r='".indexOn": "'+n._queryParams.getIndex().toString()+'"',i=n._path.toString();Ie(`Using an unspecified index. Your data will be downloaded and filtered on the client. Consider adding ${r} at ${i} to your security rules for better performance.`)}}}refreshAuthToken(e){this.authToken_=e,this.log_("Auth token refreshed"),this.authToken_?this.tryAuth():this.connected_&&this.sendRequest("unauth",{},()=>{}),this.reduceReconnectDelayIfAdminCredential_(e)}reduceReconnectDelayIfAdminCredential_(e){(e&&e.length===40||Fb(e))&&(this.log_("Admin auth credential detected.  Reducing max reconnect time."),this.maxReconnectDelay_=Md)}refreshAppCheckToken(e){this.appCheckToken_=e,this.log_("App check token refreshed"),this.appCheckToken_?this.tryAppCheck():this.connected_&&this.sendRequest("unappeck",{},()=>{})}tryAuth(){if(this.connected_&&this.authToken_){const e=this.authToken_,n=Mb(e)?"auth":"gauth",s={cred:e};this.authOverride_===null?s.noauth=!0:typeof this.authOverride_=="object"&&(s.authvar=this.authOverride_),this.sendRequest(n,s,r=>{const i=r.s,o=r.d||"error";this.authToken_===e&&(i==="ok"?this.invalidAuthTokenCount_=0:this.onAuthRevoked_(i,o))})}}tryAppCheck(){this.connected_&&this.appCheckToken_&&this.sendRequest("appcheck",{token:this.appCheckToken_},e=>{const n=e.s,s=e.d||"error";n==="ok"?this.invalidAppCheckTokenCount_=0:this.onAppCheckRevoked_(n,s)})}unlisten(e,n){const s=e._path.toString(),r=e._queryIdentifier;this.log_("Unlisten called for "+s+" "+r),g(e._queryParams.isDefault()||!e._queryParams.loadsAllData(),"unlisten() called for non-default but complete query"),this.removeListen_(s,r)&&this.connected_&&this.sendUnlisten_(s,r,e._queryObject,n)}sendUnlisten_(e,n,s,r){this.log_("Unlisten on "+e+" for "+n);const i={p:e},o="n";r&&(i.q=s,i.t=r),this.sendRequest(o,i)}onDisconnectPut(e,n,s){this.initConnection_(),this.connected_?this.sendOnDisconnect_("o",e,n,s):this.onDisconnectRequestQueue_.push({pathString:e,action:"o",data:n,onComplete:s})}onDisconnectMerge(e,n,s){this.initConnection_(),this.connected_?this.sendOnDisconnect_("om",e,n,s):this.onDisconnectRequestQueue_.push({pathString:e,action:"om",data:n,onComplete:s})}onDisconnectCancel(e,n){this.initConnection_(),this.connected_?this.sendOnDisconnect_("oc",e,null,n):this.onDisconnectRequestQueue_.push({pathString:e,action:"oc",data:null,onComplete:n})}sendOnDisconnect_(e,n,s,r){const i={p:n,d:s};this.log_("onDisconnect "+e,i),this.sendRequest(e,i,o=>{r&&setTimeout(()=>{r(o.s,o.d)},Math.floor(0))})}put(e,n,s,r){this.putInternal("p",e,n,s,r)}merge(e,n,s,r){this.putInternal("m",e,n,s,r)}putInternal(e,n,s,r,i){this.initConnection_();const o={p:n,d:s};i!==void 0&&(o.h=i),this.outstandingPuts_.push({action:e,request:o,onComplete:r}),this.outstandingPutCount_++;const a=this.outstandingPuts_.length-1;this.connected_?this.sendPut_(a):this.log_("Buffering put: "+n)}sendPut_(e){const n=this.outstandingPuts_[e].action,s=this.outstandingPuts_[e].request,r=this.outstandingPuts_[e].onComplete;this.outstandingPuts_[e].queued=this.connected_,this.sendRequest(n,s,i=>{this.log_(n+" response",i),delete this.outstandingPuts_[e],this.outstandingPutCount_--,this.outstandingPutCount_===0&&(this.outstandingPuts_=[]),r&&r(i.s,i.d)})}reportStats(e){if(this.connected_){const n={c:e};this.log_("reportStats",n),this.sendRequest("s",n,s=>{if(s.s!=="ok"){const i=s.d;this.log_("reportStats","Error sending stats: "+i)}})}}onDataMessage_(e){if("r"in e){this.log_("from server: "+oe(e));const n=e.r,s=this.requestCBHash_[n];s&&(delete this.requestCBHash_[n],s(e.b))}else{if("error"in e)throw"A server-side error has occurred: "+e.error;"a"in e&&this.onDataPush_(e.a,e.b)}}onDataPush_(e,n){this.log_("handleServerMessage",e,n),e==="d"?this.onDataUpdate_(n.p,n.d,!1,n.t):e==="m"?this.onDataUpdate_(n.p,n.d,!0,n.t):e==="c"?this.onListenRevoked_(n.p,n.q):e==="ac"?this.onAuthRevoked_(n.s,n.d):e==="apc"?this.onAppCheckRevoked_(n.s,n.d):e==="sd"?this.onSecurityDebugPacket_(n):za("Unrecognized action received from server: "+oe(e)+`
Are you using the latest client?`)}onReady_(e,n){this.log_("connection ready"),this.connected_=!0,this.lastConnectionEstablishedTime_=new Date().getTime(),this.handleTimestamp_(e),this.lastSessionId=n,this.firstConnection_&&this.sendConnectStats_(),this.restoreState_(),this.firstConnection_=!1,this.onConnectStatus_(!0)}scheduleConnect_(e){g(!this.realtime_,"Scheduling a connect when we're already connected/ing?"),this.establishConnectionTimer_&&clearTimeout(this.establishConnectionTimer_),this.establishConnectionTimer_=setTimeout(()=>{this.establishConnectionTimer_=null,this.establishConnection_()},Math.floor(e))}initConnection_(){!this.realtime_&&this.firstConnection_&&this.scheduleConnect_(0)}onVisible_(e){e&&!this.visible_&&this.reconnectDelay_===this.maxReconnectDelay_&&(this.log_("Window became visible.  Reducing delay."),this.reconnectDelay_=Ws,this.realtime_||this.scheduleConnect_(0)),this.visible_=e}onOnline_(e){e?(this.log_("Browser went online."),this.reconnectDelay_=Ws,this.realtime_||this.scheduleConnect_(0)):(this.log_("Browser went offline.  Killing connection."),this.realtime_&&this.realtime_.close())}onRealtimeDisconnect_(){if(this.log_("data client disconnected"),this.connected_=!1,this.realtime_=null,this.cancelSentTransactions_(),this.requestCBHash_={},this.shouldReconnect_()){this.visible_?this.lastConnectionEstablishedTime_&&(new Date().getTime()-this.lastConnectionEstablishedTime_>XS&&(this.reconnectDelay_=Ws),this.lastConnectionEstablishedTime_=null):(this.log_("Window isn't visible.  Delaying reconnect."),this.reconnectDelay_=this.maxReconnectDelay_,this.lastConnectionAttemptTime_=new Date().getTime());const e=Math.max(0,new Date().getTime()-this.lastConnectionAttemptTime_);let n=Math.max(0,this.reconnectDelay_-e);n=Math.random()*n,this.log_("Trying to reconnect in "+n+"ms"),this.scheduleConnect_(n),this.reconnectDelay_=Math.min(this.maxReconnectDelay_,this.reconnectDelay_*JS)}this.onConnectStatus_(!1)}async establishConnection_(){if(this.shouldReconnect_()){this.log_("Making a connection attempt"),this.lastConnectionAttemptTime_=new Date().getTime(),this.lastConnectionEstablishedTime_=null;const e=this.onDataMessage_.bind(this),n=this.onReady_.bind(this),s=this.onRealtimeDisconnect_.bind(this),r=this.id+":"+St.nextConnectionId_++,i=this.lastSessionId;let o=!1,a=null;const c=function(){a?a.close():(o=!0,s())},l=function(d){g(a,"sendRequest call when we're not connected not allowed."),a.sendRequest(d)};this.realtime_={close:c,sendRequest:l};const u=this.forceTokenRefresh_;this.forceTokenRefresh_=!1;try{const[d,h]=await Promise.all([this.authTokenProvider_.getToken(u),this.appCheckTokenProvider_.getToken(u)]);o?he("getToken() completed but was canceled"):(he("getToken() completed. Creating connection."),this.authToken_=d&&d.accessToken,this.appCheckToken_=h&&h.token,a=new VS(r,this.repoInfo_,this.applicationId_,this.appCheckToken_,this.authToken_,e,n,s,f=>{Ie(f+" ("+this.repoInfo_.toString()+")"),this.interrupt(QS)},i))}catch(d){this.log_("Failed to get token: "+d),o||(this.repoInfo_.nodeAdmin&&Ie(d),c())}}}interrupt(e){he("Interrupting connection for reason: "+e),this.interruptReasons_[e]=!0,this.realtime_?this.realtime_.close():(this.establishConnectionTimer_&&(clearTimeout(this.establishConnectionTimer_),this.establishConnectionTimer_=null),this.connected_&&this.onRealtimeDisconnect_())}resume(e){he("Resuming connection for reason: "+e),delete this.interruptReasons_[e],Si(this.interruptReasons_)&&(this.reconnectDelay_=Ws,this.realtime_||this.scheduleConnect_(0))}handleTimestamp_(e){const n=e-new Date().getTime();this.onServerInfoUpdate_({serverTimeOffset:n})}cancelSentTransactions_(){for(let e=0;e<this.outstandingPuts_.length;e++){const n=this.outstandingPuts_[e];n&&"h"in n.request&&n.queued&&(n.onComplete&&n.onComplete("disconnect"),delete this.outstandingPuts_[e],this.outstandingPutCount_--)}this.outstandingPutCount_===0&&(this.outstandingPuts_=[])}onListenRevoked_(e,n){let s;n?s=n.map(i=>Gc(i)).join("$"):s="default";const r=this.removeListen_(e,s);r&&r.onComplete&&r.onComplete("permission_denied")}removeListen_(e,n){const s=new H(e).toString();let r;if(this.listens.has(s)){const i=this.listens.get(s);r=i.get(n),i.delete(n),i.size===0&&this.listens.delete(s)}else r=void 0;return r}onAuthRevoked_(e,n){he("Auth token revoked: "+e+"/"+n),this.authToken_=null,this.forceTokenRefresh_=!0,this.realtime_.close(),(e==="invalid_token"||e==="permission_denied")&&(this.invalidAuthTokenCount_++,this.invalidAuthTokenCount_>=Fd&&(this.reconnectDelay_=Md,this.authTokenProvider_.notifyForInvalidToken()))}onAppCheckRevoked_(e,n){he("App check token revoked: "+e+"/"+n),this.appCheckToken_=null,this.forceTokenRefresh_=!0,(e==="invalid_token"||e==="permission_denied")&&(this.invalidAppCheckTokenCount_++,this.invalidAppCheckTokenCount_>=Fd&&this.appCheckTokenProvider_.notifyForInvalidToken())}onSecurityDebugPacket_(e){this.securityDebugCallback_?this.securityDebugCallback_(e):"msg"in e&&console.log("FIREBASE: "+e.msg.replace(`
`,`
FIREBASE: `))}restoreState_(){this.tryAuth(),this.tryAppCheck();for(const e of this.listens.values())for(const n of e.values())this.sendListen_(n);for(let e=0;e<this.outstandingPuts_.length;e++)this.outstandingPuts_[e]&&this.sendPut_(e);for(;this.onDisconnectRequestQueue_.length;){const e=this.onDisconnectRequestQueue_.shift();this.sendOnDisconnect_(e.action,e.pathString,e.data,e.onComplete)}for(let e=0;e<this.outstandingGets_.length;e++)this.outstandingGets_[e]&&this.sendGet_(e)}sendConnectStats_(){const e={};let n="js";e["sdk."+n+"."+rp.replace(/\./g,"-")]=1,Vc()?e["framework.cordova"]=1:Xf()&&(e["framework.reactnative"]=1),this.reportStats(e)}shouldReconnect_(){const e=Ri.getInstance().currentlyOnline();return Si(this.interruptReasons_)&&e}}St.nextPersistentConnectionId_=0;St.nextConnectionId_=0;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class O{constructor(e,n){this.name=e,this.node=n}static Wrap(e,n){return new O(e,n)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class go{getCompare(){return this.compare.bind(this)}indexedValueChanged(e,n){const s=new O(gs,e),r=new O(gs,n);return this.compare(s,r)!==0}minPost(){return O.MIN}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Qr;class Np extends go{static get __EMPTY_NODE(){return Qr}static set __EMPTY_NODE(e){Qr=e}compare(e,n){return Hn(e.name,n.name)}isDefinedOn(e){throw ks("KeyIndex.isDefinedOn not expected to be called.")}indexedValueChanged(e,n){return!1}minPost(){return O.MIN}maxPost(){return new O(An,Qr)}makePost(e,n){return g(typeof e=="string","KeyIndex indexValue must always be a string."),new O(e,Qr)}toString(){return".key"}}const Qn=new Np;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Zr{constructor(e,n,s,r,i=null){this.isReverse_=r,this.resultGenerator_=i,this.nodeStack_=[];let o=1;for(;!e.isEmpty();)if(e=e,o=n?s(e.key,n):1,r&&(o*=-1),o<0)this.isReverse_?e=e.left:e=e.right;else if(o===0){this.nodeStack_.push(e);break}else this.nodeStack_.push(e),this.isReverse_?e=e.right:e=e.left}getNext(){if(this.nodeStack_.length===0)return null;let e=this.nodeStack_.pop(),n;if(this.resultGenerator_?n=this.resultGenerator_(e.key,e.value):n={key:e.key,value:e.value},this.isReverse_)for(e=e.left;!e.isEmpty();)this.nodeStack_.push(e),e=e.right;else for(e=e.right;!e.isEmpty();)this.nodeStack_.push(e),e=e.left;return n}hasNext(){return this.nodeStack_.length>0}peek(){if(this.nodeStack_.length===0)return null;const e=this.nodeStack_[this.nodeStack_.length-1];return this.resultGenerator_?this.resultGenerator_(e.key,e.value):{key:e.key,value:e.value}}}class de{constructor(e,n,s,r,i){this.key=e,this.value=n,this.color=s??de.RED,this.left=r??Ne.EMPTY_NODE,this.right=i??Ne.EMPTY_NODE}copy(e,n,s,r,i){return new de(e??this.key,n??this.value,s??this.color,r??this.left,i??this.right)}count(){return this.left.count()+1+this.right.count()}isEmpty(){return!1}inorderTraversal(e){return this.left.inorderTraversal(e)||!!e(this.key,this.value)||this.right.inorderTraversal(e)}reverseTraversal(e){return this.right.reverseTraversal(e)||e(this.key,this.value)||this.left.reverseTraversal(e)}min_(){return this.left.isEmpty()?this:this.left.min_()}minKey(){return this.min_().key}maxKey(){return this.right.isEmpty()?this.key:this.right.maxKey()}insert(e,n,s){let r=this;const i=s(e,r.key);return i<0?r=r.copy(null,null,null,r.left.insert(e,n,s),null):i===0?r=r.copy(null,n,null,null,null):r=r.copy(null,null,null,null,r.right.insert(e,n,s)),r.fixUp_()}removeMin_(){if(this.left.isEmpty())return Ne.EMPTY_NODE;let e=this;return!e.left.isRed_()&&!e.left.left.isRed_()&&(e=e.moveRedLeft_()),e=e.copy(null,null,null,e.left.removeMin_(),null),e.fixUp_()}remove(e,n){let s,r;if(s=this,n(e,s.key)<0)!s.left.isEmpty()&&!s.left.isRed_()&&!s.left.left.isRed_()&&(s=s.moveRedLeft_()),s=s.copy(null,null,null,s.left.remove(e,n),null);else{if(s.left.isRed_()&&(s=s.rotateRight_()),!s.right.isEmpty()&&!s.right.isRed_()&&!s.right.left.isRed_()&&(s=s.moveRedRight_()),n(e,s.key)===0){if(s.right.isEmpty())return Ne.EMPTY_NODE;r=s.right.min_(),s=s.copy(r.key,r.value,null,null,s.right.removeMin_())}s=s.copy(null,null,null,null,s.right.remove(e,n))}return s.fixUp_()}isRed_(){return this.color}fixUp_(){let e=this;return e.right.isRed_()&&!e.left.isRed_()&&(e=e.rotateLeft_()),e.left.isRed_()&&e.left.left.isRed_()&&(e=e.rotateRight_()),e.left.isRed_()&&e.right.isRed_()&&(e=e.colorFlip_()),e}moveRedLeft_(){let e=this.colorFlip_();return e.right.left.isRed_()&&(e=e.copy(null,null,null,null,e.right.rotateRight_()),e=e.rotateLeft_(),e=e.colorFlip_()),e}moveRedRight_(){let e=this.colorFlip_();return e.left.left.isRed_()&&(e=e.rotateRight_(),e=e.colorFlip_()),e}rotateLeft_(){const e=this.copy(null,null,de.RED,null,this.right.left);return this.right.copy(null,null,this.color,e,null)}rotateRight_(){const e=this.copy(null,null,de.RED,this.left.right,null);return this.left.copy(null,null,this.color,null,e)}colorFlip_(){const e=this.left.copy(null,null,!this.left.color,null,null),n=this.right.copy(null,null,!this.right.color,null,null);return this.copy(null,null,!this.color,e,n)}checkMaxDepth_(){const e=this.check_();return Math.pow(2,e)<=this.count()+1}check_(){if(this.isRed_()&&this.left.isRed_())throw new Error("Red node has red child("+this.key+","+this.value+")");if(this.right.isRed_())throw new Error("Right child of ("+this.key+","+this.value+") is red");const e=this.left.check_();if(e!==this.right.check_())throw new Error("Black depths differ");return e+(this.isRed_()?0:1)}}de.RED=!0;de.BLACK=!1;class ZS{copy(e,n,s,r,i){return this}insert(e,n,s){return new de(e,n,null)}remove(e,n){return this}count(){return 0}isEmpty(){return!0}inorderTraversal(e){return!1}reverseTraversal(e){return!1}minKey(){return null}maxKey(){return null}check_(){return 0}isRed_(){return!1}}class Ne{constructor(e,n=Ne.EMPTY_NODE){this.comparator_=e,this.root_=n}insert(e,n){return new Ne(this.comparator_,this.root_.insert(e,n,this.comparator_).copy(null,null,de.BLACK,null,null))}remove(e){return new Ne(this.comparator_,this.root_.remove(e,this.comparator_).copy(null,null,de.BLACK,null,null))}get(e){let n,s=this.root_;for(;!s.isEmpty();){if(n=this.comparator_(e,s.key),n===0)return s.value;n<0?s=s.left:n>0&&(s=s.right)}return null}getPredecessorKey(e){let n,s=this.root_,r=null;for(;!s.isEmpty();)if(n=this.comparator_(e,s.key),n===0){if(s.left.isEmpty())return r?r.key:null;for(s=s.left;!s.right.isEmpty();)s=s.right;return s.key}else n<0?s=s.left:n>0&&(r=s,s=s.right);throw new Error("Attempted to find predecessor key for a nonexistent key.  What gives?")}isEmpty(){return this.root_.isEmpty()}count(){return this.root_.count()}minKey(){return this.root_.minKey()}maxKey(){return this.root_.maxKey()}inorderTraversal(e){return this.root_.inorderTraversal(e)}reverseTraversal(e){return this.root_.reverseTraversal(e)}getIterator(e){return new Zr(this.root_,null,this.comparator_,!1,e)}getIteratorFrom(e,n){return new Zr(this.root_,e,this.comparator_,!1,n)}getReverseIteratorFrom(e,n){return new Zr(this.root_,e,this.comparator_,!0,n)}getReverseIterator(e){return new Zr(this.root_,null,this.comparator_,!0,e)}}Ne.EMPTY_NODE=new ZS;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function eT(t,e){return Hn(t.name,e.name)}function el(t,e){return Hn(t,e)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Ya;function tT(t){Ya=t}const Pp=function(t){return typeof t=="number"?"number:"+lp(t):"string:"+t},Lp=function(t){if(t.isLeafNode()){const e=t.val();g(typeof e=="string"||typeof e=="number"||typeof e=="object"&&ft(e,".sv"),"Priority must be a string or number.")}else g(t===Ya||t.isEmpty(),"priority of unexpected type.");g(t===Ya||t.getPriority().isEmpty(),"Priority nodes can't have a priority of their own.")};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Ud;class ue{static set __childrenNodeConstructor(e){Ud=e}static get __childrenNodeConstructor(){return Ud}constructor(e,n=ue.__childrenNodeConstructor.EMPTY_NODE){this.value_=e,this.priorityNode_=n,this.lazyHash_=null,g(this.value_!==void 0&&this.value_!==null,"LeafNode shouldn't be created with null/undefined value."),Lp(this.priorityNode_)}isLeafNode(){return!0}getPriority(){return this.priorityNode_}updatePriority(e){return new ue(this.value_,e)}getImmediateChild(e){return e===".priority"?this.priorityNode_:ue.__childrenNodeConstructor.EMPTY_NODE}getChild(e){return L(e)?this:N(e)===".priority"?this.priorityNode_:ue.__childrenNodeConstructor.EMPTY_NODE}hasChild(){return!1}getPredecessorChildName(e,n){return null}updateImmediateChild(e,n){return e===".priority"?this.updatePriority(n):n.isEmpty()&&e!==".priority"?this:ue.__childrenNodeConstructor.EMPTY_NODE.updateImmediateChild(e,n).updatePriority(this.priorityNode_)}updateChild(e,n){const s=N(e);return s===null?n:n.isEmpty()&&s!==".priority"?this:(g(s!==".priority"||en(e)===1,".priority must be the last token in a path"),this.updateImmediateChild(s,ue.__childrenNodeConstructor.EMPTY_NODE.updateChild(j(e),n)))}isEmpty(){return!1}numChildren(){return 0}forEachChild(e,n){return!1}val(e){return e&&!this.getPriority().isEmpty()?{".value":this.getValue(),".priority":this.getPriority().val()}:this.getValue()}hash(){if(this.lazyHash_===null){let e="";this.priorityNode_.isEmpty()||(e+="priority:"+Pp(this.priorityNode_.val())+":");const n=typeof this.value_;e+=n+":",n==="number"?e+=lp(this.value_):e+=this.value_,this.lazyHash_=ap(e)}return this.lazyHash_}getValue(){return this.value_}compareTo(e){return e===ue.__childrenNodeConstructor.EMPTY_NODE?1:e instanceof ue.__childrenNodeConstructor?-1:(g(e.isLeafNode(),"Unknown node type"),this.compareToLeafNode_(e))}compareToLeafNode_(e){const n=typeof e.value_,s=typeof this.value_,r=ue.VALUE_TYPE_ORDER.indexOf(n),i=ue.VALUE_TYPE_ORDER.indexOf(s);return g(r>=0,"Unknown leaf type: "+n),g(i>=0,"Unknown leaf type: "+s),r===i?s==="object"?0:this.value_<e.value_?-1:this.value_===e.value_?0:1:i-r}withIndex(){return this}isIndexed(){return!0}equals(e){if(e===this)return!0;if(e.isLeafNode()){const n=e;return this.value_===n.value_&&this.priorityNode_.equals(n.priorityNode_)}else return!1}}ue.VALUE_TYPE_ORDER=["object","boolean","number","string"];/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Op,Dp;function nT(t){Op=t}function sT(t){Dp=t}class rT extends go{compare(e,n){const s=e.node.getPriority(),r=n.node.getPriority(),i=s.compareTo(r);return i===0?Hn(e.name,n.name):i}isDefinedOn(e){return!e.getPriority().isEmpty()}indexedValueChanged(e,n){return!e.getPriority().equals(n.getPriority())}minPost(){return O.MIN}maxPost(){return new O(An,new ue("[PRIORITY-POST]",Dp))}makePost(e,n){const s=Op(e);return new O(n,new ue("[PRIORITY-POST]",s))}toString(){return".priority"}}const Q=new rT;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const iT=Math.log(2);class oT{constructor(e){const n=i=>parseInt(Math.log(i)/iT,10),s=i=>parseInt(Array(i+1).join("1"),2);this.count=n(e+1),this.current_=this.count-1;const r=s(this.count);this.bits_=e+1&r}nextBitIsOne(){const e=!(this.bits_&1<<this.current_);return this.current_--,e}}const Ai=function(t,e,n,s){t.sort(e);const r=function(c,l){const u=l-c;let d,h;if(u===0)return null;if(u===1)return d=t[c],h=n?n(d):d,new de(h,d.node,de.BLACK,null,null);{const f=parseInt(u/2,10)+c,p=r(c,f),_=r(f+1,l);return d=t[f],h=n?n(d):d,new de(h,d.node,de.BLACK,p,_)}},i=function(c){let l=null,u=null,d=t.length;const h=function(p,_){const m=d-p,A=d;d-=p;const x=r(m+1,A),$=t[m],w=n?n($):$;f(new de(w,$.node,_,null,x))},f=function(p){l?(l.left=p,l=p):(u=p,l=p)};for(let p=0;p<c.count;++p){const _=c.nextBitIsOne(),m=Math.pow(2,c.count-(p+1));_?h(m,de.BLACK):(h(m,de.BLACK),h(m,de.RED))}return u},o=new oT(t.length),a=i(o);return new Ne(s||e,a)};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let oa;const jn={};class mt{static get Default(){return g(jn&&Q,"ChildrenNode.ts has not been loaded"),oa=oa||new mt({".priority":jn},{".priority":Q}),oa}constructor(e,n){this.indexes_=e,this.indexSet_=n}get(e){const n=fs(this.indexes_,e);if(!n)throw new Error("No index defined for "+e);return n instanceof Ne?n:null}hasIndex(e){return ft(this.indexSet_,e.toString())}addIndex(e,n){g(e!==Qn,"KeyIndex always exists and isn't meant to be added to the IndexMap.");const s=[];let r=!1;const i=n.getIterator(O.Wrap);let o=i.getNext();for(;o;)r=r||e.isDefinedOn(o.node),s.push(o),o=i.getNext();let a;r?a=Ai(s,e.getCompare()):a=jn;const c=e.toString(),l={...this.indexSet_};l[c]=e;const u={...this.indexes_};return u[c]=a,new mt(u,l)}addToIndexes(e,n){const s=Ti(this.indexes_,(r,i)=>{const o=fs(this.indexSet_,i);if(g(o,"Missing index implementation for "+i),r===jn)if(o.isDefinedOn(e.node)){const a=[],c=n.getIterator(O.Wrap);let l=c.getNext();for(;l;)l.name!==e.name&&a.push(l),l=c.getNext();return a.push(e),Ai(a,o.getCompare())}else return jn;else{const a=n.get(e.name);let c=r;return a&&(c=c.remove(new O(e.name,a))),c.insert(e,e.node)}});return new mt(s,this.indexSet_)}removeFromIndexes(e,n){const s=Ti(this.indexes_,r=>{if(r===jn)return r;{const i=n.get(e.name);return i?r.remove(new O(e.name,i)):r}});return new mt(s,this.indexSet_)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Vs;class E{static get EMPTY_NODE(){return Vs||(Vs=new E(new Ne(el),null,mt.Default))}constructor(e,n,s){this.children_=e,this.priorityNode_=n,this.indexMap_=s,this.lazyHash_=null,this.priorityNode_&&Lp(this.priorityNode_),this.children_.isEmpty()&&g(!this.priorityNode_||this.priorityNode_.isEmpty(),"An empty node cannot have a priority")}isLeafNode(){return!1}getPriority(){return this.priorityNode_||Vs}updatePriority(e){return this.children_.isEmpty()?this:new E(this.children_,e,this.indexMap_)}getImmediateChild(e){if(e===".priority")return this.getPriority();{const n=this.children_.get(e);return n===null?Vs:n}}getChild(e){const n=N(e);return n===null?this:this.getImmediateChild(n).getChild(j(e))}hasChild(e){return this.children_.get(e)!==null}updateImmediateChild(e,n){if(g(n,"We should always be passing snapshot nodes"),e===".priority")return this.updatePriority(n);{const s=new O(e,n);let r,i;n.isEmpty()?(r=this.children_.remove(e),i=this.indexMap_.removeFromIndexes(s,this.children_)):(r=this.children_.insert(e,n),i=this.indexMap_.addToIndexes(s,this.children_));const o=r.isEmpty()?Vs:this.priorityNode_;return new E(r,o,i)}}updateChild(e,n){const s=N(e);if(s===null)return n;{g(N(e)!==".priority"||en(e)===1,".priority must be the last token in a path");const r=this.getImmediateChild(s).updateChild(j(e),n);return this.updateImmediateChild(s,r)}}isEmpty(){return this.children_.isEmpty()}numChildren(){return this.children_.count()}val(e){if(this.isEmpty())return null;const n={};let s=0,r=0,i=!0;if(this.forEachChild(Q,(o,a)=>{n[o]=a.val(e),s++,i&&E.INTEGER_REGEXP_.test(o)?r=Math.max(r,Number(o)):i=!1}),!e&&i&&r<2*s){const o=[];for(const a in n)o[a]=n[a];return o}else return e&&!this.getPriority().isEmpty()&&(n[".priority"]=this.getPriority().val()),n}hash(){if(this.lazyHash_===null){let e="";this.getPriority().isEmpty()||(e+="priority:"+Pp(this.getPriority().val())+":"),this.forEachChild(Q,(n,s)=>{const r=s.hash();r!==""&&(e+=":"+n+":"+r)}),this.lazyHash_=e===""?"":ap(e)}return this.lazyHash_}getPredecessorChildName(e,n,s){const r=this.resolveIndex_(s);if(r){const i=r.getPredecessorKey(new O(e,n));return i?i.name:null}else return this.children_.getPredecessorKey(e)}getFirstChildName(e){const n=this.resolveIndex_(e);if(n){const s=n.minKey();return s&&s.name}else return this.children_.minKey()}getFirstChild(e){const n=this.getFirstChildName(e);return n?new O(n,this.children_.get(n)):null}getLastChildName(e){const n=this.resolveIndex_(e);if(n){const s=n.maxKey();return s&&s.name}else return this.children_.maxKey()}getLastChild(e){const n=this.getLastChildName(e);return n?new O(n,this.children_.get(n)):null}forEachChild(e,n){const s=this.resolveIndex_(e);return s?s.inorderTraversal(r=>n(r.name,r.node)):this.children_.inorderTraversal(n)}getIterator(e){return this.getIteratorFrom(e.minPost(),e)}getIteratorFrom(e,n){const s=this.resolveIndex_(n);if(s)return s.getIteratorFrom(e,r=>r);{const r=this.children_.getIteratorFrom(e.name,O.Wrap);let i=r.peek();for(;i!=null&&n.compare(i,e)<0;)r.getNext(),i=r.peek();return r}}getReverseIterator(e){return this.getReverseIteratorFrom(e.maxPost(),e)}getReverseIteratorFrom(e,n){const s=this.resolveIndex_(n);if(s)return s.getReverseIteratorFrom(e,r=>r);{const r=this.children_.getReverseIteratorFrom(e.name,O.Wrap);let i=r.peek();for(;i!=null&&n.compare(i,e)>0;)r.getNext(),i=r.peek();return r}}compareTo(e){return this.isEmpty()?e.isEmpty()?0:-1:e.isLeafNode()||e.isEmpty()?1:e===Fr?-1:0}withIndex(e){if(e===Qn||this.indexMap_.hasIndex(e))return this;{const n=this.indexMap_.addIndex(e,this.children_);return new E(this.children_,this.priorityNode_,n)}}isIndexed(e){return e===Qn||this.indexMap_.hasIndex(e)}equals(e){if(e===this)return!0;if(e.isLeafNode())return!1;{const n=e;if(this.getPriority().equals(n.getPriority()))if(this.children_.count()===n.children_.count()){const s=this.getIterator(Q),r=n.getIterator(Q);let i=s.getNext(),o=r.getNext();for(;i&&o;){if(i.name!==o.name||!i.node.equals(o.node))return!1;i=s.getNext(),o=r.getNext()}return i===null&&o===null}else return!1;else return!1}}resolveIndex_(e){return e===Qn?null:this.indexMap_.get(e.toString())}}E.INTEGER_REGEXP_=/^(0|[1-9]\d*)$/;class aT extends E{constructor(){super(new Ne(el),E.EMPTY_NODE,mt.Default)}compareTo(e){return e===this?0:1}equals(e){return e===this}getPriority(){return this}getImmediateChild(e){return E.EMPTY_NODE}isEmpty(){return!1}}const Fr=new aT;Object.defineProperties(O,{MIN:{value:new O(gs,E.EMPTY_NODE)},MAX:{value:new O(An,Fr)}});Np.__EMPTY_NODE=E.EMPTY_NODE;ue.__childrenNodeConstructor=E;tT(Fr);sT(Fr);/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const cT=!0;function Z(t,e=null){if(t===null)return E.EMPTY_NODE;if(typeof t=="object"&&".priority"in t&&(e=t[".priority"]),g(e===null||typeof e=="string"||typeof e=="number"||typeof e=="object"&&".sv"in e,"Invalid priority type found: "+typeof e),typeof t=="object"&&".value"in t&&t[".value"]!==null&&(t=t[".value"]),typeof t!="object"||".sv"in t){const n=t;return new ue(n,Z(e))}if(!(t instanceof Array)&&cT){const n=[];let s=!1;if(pe(t,(o,a)=>{if(o.substring(0,1)!=="."){const c=Z(a);c.isEmpty()||(s=s||!c.getPriority().isEmpty(),n.push(new O(o,c)))}}),n.length===0)return E.EMPTY_NODE;const i=Ai(n,eT,o=>o.name,el);if(s){const o=Ai(n,Q.getCompare());return new E(i,Z(e),new mt({".priority":o},{".priority":Q}))}else return new E(i,Z(e),mt.Default)}else{let n=E.EMPTY_NODE;return pe(t,(s,r)=>{if(ft(t,s)&&s.substring(0,1)!=="."){const i=Z(r);(i.isLeafNode()||!i.isEmpty())&&(n=n.updateImmediateChild(s,i))}}),n.updatePriority(Z(e))}}nT(Z);/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class lT extends go{constructor(e){super(),this.indexPath_=e,g(!L(e)&&N(e)!==".priority","Can't create PathIndex with empty path or .priority key")}extractChild(e){return e.getChild(this.indexPath_)}isDefinedOn(e){return!e.getChild(this.indexPath_).isEmpty()}compare(e,n){const s=this.extractChild(e.node),r=this.extractChild(n.node),i=s.compareTo(r);return i===0?Hn(e.name,n.name):i}makePost(e,n){const s=Z(e),r=E.EMPTY_NODE.updateChild(this.indexPath_,s);return new O(n,r)}maxPost(){const e=E.EMPTY_NODE.updateChild(this.indexPath_,Fr);return new O(An,e)}toString(){return gr(this.indexPath_,0).join("/")}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class uT extends go{compare(e,n){const s=e.node.compareTo(n.node);return s===0?Hn(e.name,n.name):s}isDefinedOn(e){return!0}indexedValueChanged(e,n){return!e.equals(n)}minPost(){return O.MIN}maxPost(){return O.MAX}makePost(e,n){const s=Z(e);return new O(n,s)}toString(){return".value"}}const dT=new uT;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function xp(t){return{type:"value",snapshotNode:t}}function ms(t,e){return{type:"child_added",snapshotNode:e,childName:t}}function mr(t,e){return{type:"child_removed",snapshotNode:e,childName:t}}function _r(t,e,n){return{type:"child_changed",snapshotNode:e,childName:t,oldSnap:n}}function hT(t,e){return{type:"child_moved",snapshotNode:e,childName:t}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class tl{constructor(e){this.index_=e}updateChild(e,n,s,r,i,o){g(e.isIndexed(this.index_),"A node must be indexed if only a child is updated");const a=e.getImmediateChild(n);return a.getChild(r).equals(s.getChild(r))&&a.isEmpty()===s.isEmpty()||(o!=null&&(s.isEmpty()?e.hasChild(n)?o.trackChildChange(mr(n,a)):g(e.isLeafNode(),"A child remove without an old child only makes sense on a leaf node"):a.isEmpty()?o.trackChildChange(ms(n,s)):o.trackChildChange(_r(n,s,a))),e.isLeafNode()&&s.isEmpty())?e:e.updateImmediateChild(n,s).withIndex(this.index_)}updateFullNode(e,n,s){return s!=null&&(e.isLeafNode()||e.forEachChild(Q,(r,i)=>{n.hasChild(r)||s.trackChildChange(mr(r,i))}),n.isLeafNode()||n.forEachChild(Q,(r,i)=>{if(e.hasChild(r)){const o=e.getImmediateChild(r);o.equals(i)||s.trackChildChange(_r(r,i,o))}else s.trackChildChange(ms(r,i))})),n.withIndex(this.index_)}updatePriority(e,n){return e.isEmpty()?E.EMPTY_NODE:e.updatePriority(n)}filtersNodes(){return!1}getIndexedFilter(){return this}getIndex(){return this.index_}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class yr{constructor(e){this.indexedFilter_=new tl(e.getIndex()),this.index_=e.getIndex(),this.startPost_=yr.getStartPost_(e),this.endPost_=yr.getEndPost_(e),this.startIsInclusive_=!e.startAfterSet_,this.endIsInclusive_=!e.endBeforeSet_}getStartPost(){return this.startPost_}getEndPost(){return this.endPost_}matches(e){const n=this.startIsInclusive_?this.index_.compare(this.getStartPost(),e)<=0:this.index_.compare(this.getStartPost(),e)<0,s=this.endIsInclusive_?this.index_.compare(e,this.getEndPost())<=0:this.index_.compare(e,this.getEndPost())<0;return n&&s}updateChild(e,n,s,r,i,o){return this.matches(new O(n,s))||(s=E.EMPTY_NODE),this.indexedFilter_.updateChild(e,n,s,r,i,o)}updateFullNode(e,n,s){n.isLeafNode()&&(n=E.EMPTY_NODE);let r=n.withIndex(this.index_);r=r.updatePriority(E.EMPTY_NODE);const i=this;return n.forEachChild(Q,(o,a)=>{i.matches(new O(o,a))||(r=r.updateImmediateChild(o,E.EMPTY_NODE))}),this.indexedFilter_.updateFullNode(e,r,s)}updatePriority(e,n){return e}filtersNodes(){return!0}getIndexedFilter(){return this.indexedFilter_}getIndex(){return this.index_}static getStartPost_(e){if(e.hasStart()){const n=e.getIndexStartName();return e.getIndex().makePost(e.getIndexStartValue(),n)}else return e.getIndex().minPost()}static getEndPost_(e){if(e.hasEnd()){const n=e.getIndexEndName();return e.getIndex().makePost(e.getIndexEndValue(),n)}else return e.getIndex().maxPost()}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class fT{constructor(e){this.withinDirectionalStart=n=>this.reverse_?this.withinEndPost(n):this.withinStartPost(n),this.withinDirectionalEnd=n=>this.reverse_?this.withinStartPost(n):this.withinEndPost(n),this.withinStartPost=n=>{const s=this.index_.compare(this.rangedFilter_.getStartPost(),n);return this.startIsInclusive_?s<=0:s<0},this.withinEndPost=n=>{const s=this.index_.compare(n,this.rangedFilter_.getEndPost());return this.endIsInclusive_?s<=0:s<0},this.rangedFilter_=new yr(e),this.index_=e.getIndex(),this.limit_=e.getLimit(),this.reverse_=!e.isViewFromLeft(),this.startIsInclusive_=!e.startAfterSet_,this.endIsInclusive_=!e.endBeforeSet_}updateChild(e,n,s,r,i,o){return this.rangedFilter_.matches(new O(n,s))||(s=E.EMPTY_NODE),e.getImmediateChild(n).equals(s)?e:e.numChildren()<this.limit_?this.rangedFilter_.getIndexedFilter().updateChild(e,n,s,r,i,o):this.fullLimitUpdateChild_(e,n,s,i,o)}updateFullNode(e,n,s){let r;if(n.isLeafNode()||n.isEmpty())r=E.EMPTY_NODE.withIndex(this.index_);else if(this.limit_*2<n.numChildren()&&n.isIndexed(this.index_)){r=E.EMPTY_NODE.withIndex(this.index_);let i;this.reverse_?i=n.getReverseIteratorFrom(this.rangedFilter_.getEndPost(),this.index_):i=n.getIteratorFrom(this.rangedFilter_.getStartPost(),this.index_);let o=0;for(;i.hasNext()&&o<this.limit_;){const a=i.getNext();if(this.withinDirectionalStart(a))if(this.withinDirectionalEnd(a))r=r.updateImmediateChild(a.name,a.node),o++;else break;else continue}}else{r=n.withIndex(this.index_),r=r.updatePriority(E.EMPTY_NODE);let i;this.reverse_?i=r.getReverseIterator(this.index_):i=r.getIterator(this.index_);let o=0;for(;i.hasNext();){const a=i.getNext();o<this.limit_&&this.withinDirectionalStart(a)&&this.withinDirectionalEnd(a)?o++:r=r.updateImmediateChild(a.name,E.EMPTY_NODE)}}return this.rangedFilter_.getIndexedFilter().updateFullNode(e,r,s)}updatePriority(e,n){return e}filtersNodes(){return!0}getIndexedFilter(){return this.rangedFilter_.getIndexedFilter()}getIndex(){return this.index_}fullLimitUpdateChild_(e,n,s,r,i){let o;if(this.reverse_){const d=this.index_.getCompare();o=(h,f)=>d(f,h)}else o=this.index_.getCompare();const a=e;g(a.numChildren()===this.limit_,"");const c=new O(n,s),l=this.reverse_?a.getFirstChild(this.index_):a.getLastChild(this.index_),u=this.rangedFilter_.matches(c);if(a.hasChild(n)){const d=a.getImmediateChild(n);let h=r.getChildAfterChild(this.index_,l,this.reverse_);for(;h!=null&&(h.name===n||a.hasChild(h.name));)h=r.getChildAfterChild(this.index_,h,this.reverse_);const f=h==null?1:o(h,c);if(u&&!s.isEmpty()&&f>=0)return i?.trackChildChange(_r(n,s,d)),a.updateImmediateChild(n,s);{i?.trackChildChange(mr(n,d));const _=a.updateImmediateChild(n,E.EMPTY_NODE);return h!=null&&this.rangedFilter_.matches(h)?(i?.trackChildChange(ms(h.name,h.node)),_.updateImmediateChild(h.name,h.node)):_}}else return s.isEmpty()?e:u&&o(l,c)>=0?(i!=null&&(i.trackChildChange(mr(l.name,l.node)),i.trackChildChange(ms(n,s))),a.updateImmediateChild(n,s).updateImmediateChild(l.name,E.EMPTY_NODE)):e}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class mo{constructor(){this.limitSet_=!1,this.startSet_=!1,this.startNameSet_=!1,this.startAfterSet_=!1,this.endSet_=!1,this.endNameSet_=!1,this.endBeforeSet_=!1,this.limit_=0,this.viewFrom_="",this.indexStartValue_=null,this.indexStartName_="",this.indexEndValue_=null,this.indexEndName_="",this.index_=Q}hasStart(){return this.startSet_}isViewFromLeft(){return this.viewFrom_===""?this.startSet_:this.viewFrom_==="l"}getIndexStartValue(){return g(this.startSet_,"Only valid if start has been set"),this.indexStartValue_}getIndexStartName(){return g(this.startSet_,"Only valid if start has been set"),this.startNameSet_?this.indexStartName_:gs}hasEnd(){return this.endSet_}getIndexEndValue(){return g(this.endSet_,"Only valid if end has been set"),this.indexEndValue_}getIndexEndName(){return g(this.endSet_,"Only valid if end has been set"),this.endNameSet_?this.indexEndName_:An}hasLimit(){return this.limitSet_}hasAnchoredLimit(){return this.limitSet_&&this.viewFrom_!==""}getLimit(){return g(this.limitSet_,"Only valid if limit has been set"),this.limit_}getIndex(){return this.index_}loadsAllData(){return!(this.startSet_||this.endSet_||this.limitSet_)}isDefault(){return this.loadsAllData()&&this.index_===Q}copy(){const e=new mo;return e.limitSet_=this.limitSet_,e.limit_=this.limit_,e.startSet_=this.startSet_,e.startAfterSet_=this.startAfterSet_,e.indexStartValue_=this.indexStartValue_,e.startNameSet_=this.startNameSet_,e.indexStartName_=this.indexStartName_,e.endSet_=this.endSet_,e.endBeforeSet_=this.endBeforeSet_,e.indexEndValue_=this.indexEndValue_,e.endNameSet_=this.endNameSet_,e.indexEndName_=this.indexEndName_,e.index_=this.index_,e.viewFrom_=this.viewFrom_,e}}function pT(t){return t.loadsAllData()?new tl(t.getIndex()):t.hasLimit()?new fT(t):new yr(t)}function $d(t){const e={};if(t.isDefault())return e;let n;if(t.index_===Q?n="$priority":t.index_===dT?n="$value":t.index_===Qn?n="$key":(g(t.index_ instanceof lT,"Unrecognized index type!"),n=t.index_.toString()),e.orderBy=oe(n),t.startSet_){const s=t.startAfterSet_?"startAfter":"startAt";e[s]=oe(t.indexStartValue_),t.startNameSet_&&(e[s]+=","+oe(t.indexStartName_))}if(t.endSet_){const s=t.endBeforeSet_?"endBefore":"endAt";e[s]=oe(t.indexEndValue_),t.endNameSet_&&(e[s]+=","+oe(t.indexEndName_))}return t.limitSet_&&(t.isViewFromLeft()?e.limitToFirst=t.limit_:e.limitToLast=t.limit_),e}function Bd(t){const e={};if(t.startSet_&&(e.sp=t.indexStartValue_,t.startNameSet_&&(e.sn=t.indexStartName_),e.sin=!t.startAfterSet_),t.endSet_&&(e.ep=t.indexEndValue_,t.endNameSet_&&(e.en=t.indexEndName_),e.ein=!t.endBeforeSet_),t.limitSet_){e.l=t.limit_;let n=t.viewFrom_;n===""&&(t.isViewFromLeft()?n="l":n="r"),e.vf=n}return t.index_!==Q&&(e.i=t.index_.toString()),e}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ni extends Ip{reportStats(e){throw new Error("Method not implemented.")}static getListenId_(e,n){return n!==void 0?"tag$"+n:(g(e._queryParams.isDefault(),"should have a tag if it's not a default query."),e._path.toString())}constructor(e,n,s,r){super(),this.repoInfo_=e,this.onDataUpdate_=n,this.authTokenProvider_=s,this.appCheckTokenProvider_=r,this.log_=Mr("p:rest:"),this.listens_={}}listen(e,n,s,r){const i=e._path.toString();this.log_("Listen called for "+i+" "+e._queryIdentifier);const o=Ni.getListenId_(e,s),a={};this.listens_[o]=a;const c=$d(e._queryParams);this.restRequest_(i+".json",c,(l,u)=>{let d=u;if(l===404&&(d=null,l=null),l===null&&this.onDataUpdate_(i,d,!1,s),fs(this.listens_,o)===a){let h;l?l===401?h="permission_denied":h="rest_error:"+l:h="ok",r(h,null)}})}unlisten(e,n){const s=Ni.getListenId_(e,n);delete this.listens_[s]}get(e){const n=$d(e._queryParams),s=e._path.toString(),r=new Ae;return this.restRequest_(s+".json",n,(i,o)=>{let a=o;i===404&&(a=null,i=null),i===null?(this.onDataUpdate_(s,a,!1,null),r.resolve(a)):r.reject(new Error(a))}),r.promise}refreshAuthToken(e){}restRequest_(e,n={},s){return n.format="export",Promise.all([this.authTokenProvider_.getToken(!1),this.appCheckTokenProvider_.getToken(!1)]).then(([r,i])=>{r&&r.accessToken&&(n.auth=r.accessToken),i&&i.token&&(n.ac=i.token);const o=(this.repoInfo_.secure?"https://":"http://")+this.repoInfo_.host+e+"?ns="+this.repoInfo_.namespace+Ns(n);this.log_("Sending REST request for "+o);const a=new XMLHttpRequest;a.onreadystatechange=()=>{if(s&&a.readyState===4){this.log_("REST Response for "+o+" received. status:",a.status,"response:",a.responseText);let c=null;if(a.status>=200&&a.status<300){try{c=hr(a.responseText)}catch{Ie("Failed to parse JSON response for "+o+": "+a.responseText)}s(null,c)}else a.status!==401&&a.status!==404&&Ie("Got unsuccessful REST response for "+o+" Status: "+a.status),s(a.status);s=null}},a.open("GET",o,!0),a.send()})}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class gT{constructor(){this.rootNode_=E.EMPTY_NODE}getNode(e){return this.rootNode_.getChild(e)}updateSnapshot(e,n){this.rootNode_=this.rootNode_.updateChild(e,n)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Pi(){return{value:null,children:new Map}}function Os(t,e,n){if(L(e))t.value=n,t.children.clear();else if(t.value!==null)t.value=t.value.updateChild(e,n);else{const s=N(e);t.children.has(s)||t.children.set(s,Pi());const r=t.children.get(s);e=j(e),Os(r,e,n)}}function Ka(t,e){if(L(e))return t.value=null,t.children.clear(),!0;if(t.value!==null){if(t.value.isLeafNode())return!1;{const n=t.value;return t.value=null,n.forEachChild(Q,(s,r)=>{Os(t,new H(s),r)}),Ka(t,e)}}else if(t.children.size>0){const n=N(e);return e=j(e),t.children.has(n)&&Ka(t.children.get(n),e)&&t.children.delete(n),t.children.size===0}else return!0}function Ja(t,e,n){t.value!==null?n(e,t.value):mT(t,(s,r)=>{const i=new H(e.toString()+"/"+s);Ja(r,i,n)})}function mT(t,e){t.children.forEach((n,s)=>{e(s,n)})}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class _T{constructor(e){this.collection_=e,this.last_=null}get(){const e=this.collection_.get(),n={...e};return this.last_&&pe(this.last_,(s,r)=>{n[s]=n[s]-r}),this.last_=e,n}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Hd=10*1e3,yT=30*1e3,vT=300*1e3;class wT{constructor(e,n){this.server_=n,this.statsToReport_={},this.statsListener_=new _T(e);const s=Hd+(yT-Hd)*Math.random();Qs(this.reportStats_.bind(this),Math.floor(s))}reportStats_(){const e=this.statsListener_.get(),n={};let s=!1;pe(e,(r,i)=>{i>0&&ft(this.statsToReport_,r)&&(n[r]=i,s=!0)}),s&&this.server_.reportStats(n),Qs(this.reportStats_.bind(this),Math.floor(Math.random()*2*vT))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var Je;(function(t){t[t.OVERWRITE=0]="OVERWRITE",t[t.MERGE=1]="MERGE",t[t.ACK_USER_WRITE=2]="ACK_USER_WRITE",t[t.LISTEN_COMPLETE=3]="LISTEN_COMPLETE"})(Je||(Je={}));function nl(){return{fromUser:!0,fromServer:!1,queryId:null,tagged:!1}}function sl(){return{fromUser:!1,fromServer:!0,queryId:null,tagged:!1}}function rl(t){return{fromUser:!1,fromServer:!0,queryId:t,tagged:!0}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Li{constructor(e,n,s){this.path=e,this.affectedTree=n,this.revert=s,this.type=Je.ACK_USER_WRITE,this.source=nl()}operationForChild(e){if(L(this.path)){if(this.affectedTree.value!=null)return g(this.affectedTree.children.isEmpty(),"affectedTree should not have overlapping affected paths."),this;{const n=this.affectedTree.subtree(new H(e));return new Li(F(),n,this.revert)}}else return g(N(this.path)===e,"operationForChild called for unrelated child."),new Li(j(this.path),this.affectedTree,this.revert)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class vr{constructor(e,n){this.source=e,this.path=n,this.type=Je.LISTEN_COMPLETE}operationForChild(e){return L(this.path)?new vr(this.source,F()):new vr(this.source,j(this.path))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Nn{constructor(e,n,s){this.source=e,this.path=n,this.snap=s,this.type=Je.OVERWRITE}operationForChild(e){return L(this.path)?new Nn(this.source,F(),this.snap.getImmediateChild(e)):new Nn(this.source,j(this.path),this.snap)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class _s{constructor(e,n,s){this.source=e,this.path=n,this.children=s,this.type=Je.MERGE}operationForChild(e){if(L(this.path)){const n=this.children.subtree(new H(e));return n.isEmpty()?null:n.value?new Nn(this.source,F(),n.value):new _s(this.source,F(),n)}else return g(N(this.path)===e,"Can't get a merge for a child not on the path of the operation"),new _s(this.source,j(this.path),this.children)}toString(){return"Operation("+this.path+": "+this.source.toString()+" merge: "+this.children.toString()+")"}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class tn{constructor(e,n,s){this.node_=e,this.fullyInitialized_=n,this.filtered_=s}isFullyInitialized(){return this.fullyInitialized_}isFiltered(){return this.filtered_}isCompleteForPath(e){if(L(e))return this.isFullyInitialized()&&!this.filtered_;const n=N(e);return this.isCompleteForChild(n)}isCompleteForChild(e){return this.isFullyInitialized()&&!this.filtered_||this.node_.hasChild(e)}getNode(){return this.node_}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ET{constructor(e){this.query_=e,this.index_=this.query_._queryParams.getIndex()}}function bT(t,e,n,s){const r=[],i=[];return e.forEach(o=>{o.type==="child_changed"&&t.index_.indexedValueChanged(o.oldSnap,o.snapshotNode)&&i.push(hT(o.childName,o.snapshotNode))}),js(t,r,"child_removed",e,s,n),js(t,r,"child_added",e,s,n),js(t,r,"child_moved",i,s,n),js(t,r,"child_changed",e,s,n),js(t,r,"value",e,s,n),r}function js(t,e,n,s,r,i){const o=s.filter(a=>a.type===n);o.sort((a,c)=>ST(t,a,c)),o.forEach(a=>{const c=CT(t,a,i);r.forEach(l=>{l.respondsTo(a.type)&&e.push(l.createEvent(c,t.query_))})})}function CT(t,e,n){return e.type==="value"||e.type==="child_removed"||(e.prevName=n.getPredecessorChildName(e.childName,e.snapshotNode,t.index_)),e}function ST(t,e,n){if(e.childName==null||n.childName==null)throw ks("Should only compare child_ events.");const s=new O(e.childName,e.snapshotNode),r=new O(n.childName,n.snapshotNode);return t.index_.compare(s,r)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function _o(t,e){return{eventCache:t,serverCache:e}}function Zs(t,e,n,s){return _o(new tn(e,n,s),t.serverCache)}function Mp(t,e,n,s){return _o(t.eventCache,new tn(e,n,s))}function Oi(t){return t.eventCache.isFullyInitialized()?t.eventCache.getNode():null}function Pn(t){return t.serverCache.isFullyInitialized()?t.serverCache.getNode():null}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let aa;const TT=()=>(aa||(aa=new Ne(lS)),aa);class G{static fromObject(e){let n=new G(null);return pe(e,(s,r)=>{n=n.set(new H(s),r)}),n}constructor(e,n=TT()){this.value=e,this.children=n}isEmpty(){return this.value===null&&this.children.isEmpty()}findRootMostMatchingPathAndValue(e,n){if(this.value!=null&&n(this.value))return{path:F(),value:this.value};if(L(e))return null;{const s=N(e),r=this.children.get(s);if(r!==null){const i=r.findRootMostMatchingPathAndValue(j(e),n);return i!=null?{path:X(new H(s),i.path),value:i.value}:null}else return null}}findRootMostValueAndPath(e){return this.findRootMostMatchingPathAndValue(e,()=>!0)}subtree(e){if(L(e))return this;{const n=N(e),s=this.children.get(n);return s!==null?s.subtree(j(e)):new G(null)}}set(e,n){if(L(e))return new G(n,this.children);{const s=N(e),i=(this.children.get(s)||new G(null)).set(j(e),n),o=this.children.insert(s,i);return new G(this.value,o)}}remove(e){if(L(e))return this.children.isEmpty()?new G(null):new G(null,this.children);{const n=N(e),s=this.children.get(n);if(s){const r=s.remove(j(e));let i;return r.isEmpty()?i=this.children.remove(n):i=this.children.insert(n,r),this.value===null&&i.isEmpty()?new G(null):new G(this.value,i)}else return this}}get(e){if(L(e))return this.value;{const n=N(e),s=this.children.get(n);return s?s.get(j(e)):null}}setTree(e,n){if(L(e))return n;{const s=N(e),i=(this.children.get(s)||new G(null)).setTree(j(e),n);let o;return i.isEmpty()?o=this.children.remove(s):o=this.children.insert(s,i),new G(this.value,o)}}fold(e){return this.fold_(F(),e)}fold_(e,n){const s={};return this.children.inorderTraversal((r,i)=>{s[r]=i.fold_(X(e,r),n)}),n(e,this.value,s)}findOnPath(e,n){return this.findOnPath_(e,F(),n)}findOnPath_(e,n,s){const r=this.value?s(n,this.value):!1;if(r)return r;if(L(e))return null;{const i=N(e),o=this.children.get(i);return o?o.findOnPath_(j(e),X(n,i),s):null}}foreachOnPath(e,n){return this.foreachOnPath_(e,F(),n)}foreachOnPath_(e,n,s){if(L(e))return this;{this.value&&s(n,this.value);const r=N(e),i=this.children.get(r);return i?i.foreachOnPath_(j(e),X(n,r),s):new G(null)}}foreach(e){this.foreach_(F(),e)}foreach_(e,n){this.children.inorderTraversal((s,r)=>{r.foreach_(X(e,s),n)}),this.value&&n(e,this.value)}foreachChild(e){this.children.inorderTraversal((n,s)=>{s.value&&e(n,s.value)})}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class et{constructor(e){this.writeTree_=e}static empty(){return new et(new G(null))}}function er(t,e,n){if(L(e))return new et(new G(n));{const s=t.writeTree_.findRootMostValueAndPath(e);if(s!=null){const r=s.path;let i=s.value;const o=Te(r,e);return i=i.updateChild(o,n),new et(t.writeTree_.set(r,i))}else{const r=new G(n),i=t.writeTree_.setTree(e,r);return new et(i)}}}function Xa(t,e,n){let s=t;return pe(n,(r,i)=>{s=er(s,X(e,r),i)}),s}function Wd(t,e){if(L(e))return et.empty();{const n=t.writeTree_.setTree(e,new G(null));return new et(n)}}function Qa(t,e){return Wn(t,e)!=null}function Wn(t,e){const n=t.writeTree_.findRootMostValueAndPath(e);return n!=null?t.writeTree_.get(n.path).getChild(Te(n.path,e)):null}function Vd(t){const e=[],n=t.writeTree_.value;return n!=null?n.isLeafNode()||n.forEachChild(Q,(s,r)=>{e.push(new O(s,r))}):t.writeTree_.children.inorderTraversal((s,r)=>{r.value!=null&&e.push(new O(s,r.value))}),e}function Gt(t,e){if(L(e))return t;{const n=Wn(t,e);return n!=null?new et(new G(n)):new et(t.writeTree_.subtree(e))}}function Za(t){return t.writeTree_.isEmpty()}function ys(t,e){return Fp(F(),t.writeTree_,e)}function Fp(t,e,n){if(e.value!=null)return n.updateChild(t,e.value);{let s=null;return e.children.inorderTraversal((r,i)=>{r===".priority"?(g(i.value!==null,"Priority writes must always be leaf nodes"),s=i.value):n=Fp(X(t,r),i,n)}),!n.getChild(t).isEmpty()&&s!==null&&(n=n.updateChild(X(t,".priority"),s)),n}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function yo(t,e){return Hp(e,t)}function IT(t,e,n,s,r){g(s>t.lastWriteId,"Stacking an older write on top of newer ones"),r===void 0&&(r=!0),t.allWrites.push({path:e,snap:n,writeId:s,visible:r}),r&&(t.visibleWrites=er(t.visibleWrites,e,n)),t.lastWriteId=s}function kT(t,e,n,s){g(s>t.lastWriteId,"Stacking an older merge on top of newer ones"),t.allWrites.push({path:e,children:n,writeId:s,visible:!0}),t.visibleWrites=Xa(t.visibleWrites,e,n),t.lastWriteId=s}function RT(t,e){for(let n=0;n<t.allWrites.length;n++){const s=t.allWrites[n];if(s.writeId===e)return s}return null}function AT(t,e){const n=t.allWrites.findIndex(a=>a.writeId===e);g(n>=0,"removeWrite called with nonexistent writeId.");const s=t.allWrites[n];t.allWrites.splice(n,1);let r=s.visible,i=!1,o=t.allWrites.length-1;for(;r&&o>=0;){const a=t.allWrites[o];a.visible&&(o>=n&&NT(a,s.path)?r=!1:Ue(s.path,a.path)&&(i=!0)),o--}if(r){if(i)return PT(t),!0;if(s.snap)t.visibleWrites=Wd(t.visibleWrites,s.path);else{const a=s.children;pe(a,c=>{t.visibleWrites=Wd(t.visibleWrites,X(s.path,c))})}return!0}else return!1}function NT(t,e){if(t.snap)return Ue(t.path,e);for(const n in t.children)if(t.children.hasOwnProperty(n)&&Ue(X(t.path,n),e))return!0;return!1}function PT(t){t.visibleWrites=Up(t.allWrites,LT,F()),t.allWrites.length>0?t.lastWriteId=t.allWrites[t.allWrites.length-1].writeId:t.lastWriteId=-1}function LT(t){return t.visible}function Up(t,e,n){let s=et.empty();for(let r=0;r<t.length;++r){const i=t[r];if(e(i)){const o=i.path;let a;if(i.snap)Ue(n,o)?(a=Te(n,o),s=er(s,a,i.snap)):Ue(o,n)&&(a=Te(o,n),s=er(s,F(),i.snap.getChild(a)));else if(i.children){if(Ue(n,o))a=Te(n,o),s=Xa(s,a,i.children);else if(Ue(o,n))if(a=Te(o,n),L(a))s=Xa(s,F(),i.children);else{const c=fs(i.children,N(a));if(c){const l=c.getChild(j(a));s=er(s,F(),l)}}}else throw ks("WriteRecord should have .snap or .children")}}return s}function $p(t,e,n,s,r){if(!s&&!r){const i=Wn(t.visibleWrites,e);if(i!=null)return i;{const o=Gt(t.visibleWrites,e);if(Za(o))return n;if(n==null&&!Qa(o,F()))return null;{const a=n||E.EMPTY_NODE;return ys(o,a)}}}else{const i=Gt(t.visibleWrites,e);if(!r&&Za(i))return n;if(!r&&n==null&&!Qa(i,F()))return null;{const o=function(l){return(l.visible||r)&&(!s||!~s.indexOf(l.writeId))&&(Ue(l.path,e)||Ue(e,l.path))},a=Up(t.allWrites,o,e),c=n||E.EMPTY_NODE;return ys(a,c)}}}function OT(t,e,n){let s=E.EMPTY_NODE;const r=Wn(t.visibleWrites,e);if(r)return r.isLeafNode()||r.forEachChild(Q,(i,o)=>{s=s.updateImmediateChild(i,o)}),s;if(n){const i=Gt(t.visibleWrites,e);return n.forEachChild(Q,(o,a)=>{const c=ys(Gt(i,new H(o)),a);s=s.updateImmediateChild(o,c)}),Vd(i).forEach(o=>{s=s.updateImmediateChild(o.name,o.node)}),s}else{const i=Gt(t.visibleWrites,e);return Vd(i).forEach(o=>{s=s.updateImmediateChild(o.name,o.node)}),s}}function DT(t,e,n,s,r){g(s||r,"Either existingEventSnap or existingServerSnap must exist");const i=X(e,n);if(Qa(t.visibleWrites,i))return null;{const o=Gt(t.visibleWrites,i);return Za(o)?r.getChild(n):ys(o,r.getChild(n))}}function xT(t,e,n,s){const r=X(e,n),i=Wn(t.visibleWrites,r);if(i!=null)return i;if(s.isCompleteForChild(n)){const o=Gt(t.visibleWrites,r);return ys(o,s.getNode().getImmediateChild(n))}else return null}function MT(t,e){return Wn(t.visibleWrites,e)}function FT(t,e,n,s,r,i,o){let a;const c=Gt(t.visibleWrites,e),l=Wn(c,F());if(l!=null)a=l;else if(n!=null)a=ys(c,n);else return[];if(a=a.withIndex(o),!a.isEmpty()&&!a.isLeafNode()){const u=[],d=o.getCompare(),h=i?a.getReverseIteratorFrom(s,o):a.getIteratorFrom(s,o);let f=h.getNext();for(;f&&u.length<r;)d(f,s)!==0&&u.push(f),f=h.getNext();return u}else return[]}function UT(){return{visibleWrites:et.empty(),allWrites:[],lastWriteId:-1}}function Di(t,e,n,s){return $p(t.writeTree,t.treePath,e,n,s)}function il(t,e){return OT(t.writeTree,t.treePath,e)}function jd(t,e,n,s){return DT(t.writeTree,t.treePath,e,n,s)}function xi(t,e){return MT(t.writeTree,X(t.treePath,e))}function $T(t,e,n,s,r,i){return FT(t.writeTree,t.treePath,e,n,s,r,i)}function ol(t,e,n){return xT(t.writeTree,t.treePath,e,n)}function Bp(t,e){return Hp(X(t.treePath,e),t.writeTree)}function Hp(t,e){return{treePath:t,writeTree:e}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class BT{constructor(){this.changeMap=new Map}trackChildChange(e){const n=e.type,s=e.childName;g(n==="child_added"||n==="child_changed"||n==="child_removed","Only child changes supported for tracking"),g(s!==".priority","Only non-priority child changes can be tracked.");const r=this.changeMap.get(s);if(r){const i=r.type;if(n==="child_added"&&i==="child_removed")this.changeMap.set(s,_r(s,e.snapshotNode,r.snapshotNode));else if(n==="child_removed"&&i==="child_added")this.changeMap.delete(s);else if(n==="child_removed"&&i==="child_changed")this.changeMap.set(s,mr(s,r.oldSnap));else if(n==="child_changed"&&i==="child_added")this.changeMap.set(s,ms(s,e.snapshotNode));else if(n==="child_changed"&&i==="child_changed")this.changeMap.set(s,_r(s,e.snapshotNode,r.oldSnap));else throw ks("Illegal combination of changes: "+e+" occurred after "+r)}else this.changeMap.set(s,e)}getChanges(){return Array.from(this.changeMap.values())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class HT{getCompleteChild(e){return null}getChildAfterChild(e,n,s){return null}}const Wp=new HT;class al{constructor(e,n,s=null){this.writes_=e,this.viewCache_=n,this.optCompleteServerCache_=s}getCompleteChild(e){const n=this.viewCache_.eventCache;if(n.isCompleteForChild(e))return n.getNode().getImmediateChild(e);{const s=this.optCompleteServerCache_!=null?new tn(this.optCompleteServerCache_,!0,!1):this.viewCache_.serverCache;return ol(this.writes_,e,s)}}getChildAfterChild(e,n,s){const r=this.optCompleteServerCache_!=null?this.optCompleteServerCache_:Pn(this.viewCache_),i=$T(this.writes_,r,n,1,s,e);return i.length===0?null:i[0]}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function WT(t){return{filter:t}}function VT(t,e){g(e.eventCache.getNode().isIndexed(t.filter.getIndex()),"Event snap not indexed"),g(e.serverCache.getNode().isIndexed(t.filter.getIndex()),"Server snap not indexed")}function jT(t,e,n,s,r){const i=new BT;let o,a;if(n.type===Je.OVERWRITE){const l=n;l.source.fromUser?o=ec(t,e,l.path,l.snap,s,r,i):(g(l.source.fromServer,"Unknown source."),a=l.source.tagged||e.serverCache.isFiltered()&&!L(l.path),o=Mi(t,e,l.path,l.snap,s,r,a,i))}else if(n.type===Je.MERGE){const l=n;l.source.fromUser?o=zT(t,e,l.path,l.children,s,r,i):(g(l.source.fromServer,"Unknown source."),a=l.source.tagged||e.serverCache.isFiltered(),o=tc(t,e,l.path,l.children,s,r,a,i))}else if(n.type===Je.ACK_USER_WRITE){const l=n;l.revert?o=KT(t,e,l.path,s,r,i):o=GT(t,e,l.path,l.affectedTree,s,r,i)}else if(n.type===Je.LISTEN_COMPLETE)o=YT(t,e,n.path,s,i);else throw ks("Unknown operation type: "+n.type);const c=i.getChanges();return qT(e,o,c),{viewCache:o,changes:c}}function qT(t,e,n){const s=e.eventCache;if(s.isFullyInitialized()){const r=s.getNode().isLeafNode()||s.getNode().isEmpty(),i=Oi(t);(n.length>0||!t.eventCache.isFullyInitialized()||r&&!s.getNode().equals(i)||!s.getNode().getPriority().equals(i.getPriority()))&&n.push(xp(Oi(e)))}}function Vp(t,e,n,s,r,i){const o=e.eventCache;if(xi(s,n)!=null)return e;{let a,c;if(L(n))if(g(e.serverCache.isFullyInitialized(),"If change path is empty, we must have complete server data"),e.serverCache.isFiltered()){const l=Pn(e),u=l instanceof E?l:E.EMPTY_NODE,d=il(s,u);a=t.filter.updateFullNode(e.eventCache.getNode(),d,i)}else{const l=Di(s,Pn(e));a=t.filter.updateFullNode(e.eventCache.getNode(),l,i)}else{const l=N(n);if(l===".priority"){g(en(n)===1,"Can't have a priority with additional path components");const u=o.getNode();c=e.serverCache.getNode();const d=jd(s,n,u,c);d!=null?a=t.filter.updatePriority(u,d):a=o.getNode()}else{const u=j(n);let d;if(o.isCompleteForChild(l)){c=e.serverCache.getNode();const h=jd(s,n,o.getNode(),c);h!=null?d=o.getNode().getImmediateChild(l).updateChild(u,h):d=o.getNode().getImmediateChild(l)}else d=ol(s,l,e.serverCache);d!=null?a=t.filter.updateChild(o.getNode(),l,d,u,r,i):a=o.getNode()}}return Zs(e,a,o.isFullyInitialized()||L(n),t.filter.filtersNodes())}}function Mi(t,e,n,s,r,i,o,a){const c=e.serverCache;let l;const u=o?t.filter:t.filter.getIndexedFilter();if(L(n))l=u.updateFullNode(c.getNode(),s,null);else if(u.filtersNodes()&&!c.isFiltered()){const f=c.getNode().updateChild(n,s);l=u.updateFullNode(c.getNode(),f,null)}else{const f=N(n);if(!c.isCompleteForPath(n)&&en(n)>1)return e;const p=j(n),m=c.getNode().getImmediateChild(f).updateChild(p,s);f===".priority"?l=u.updatePriority(c.getNode(),m):l=u.updateChild(c.getNode(),f,m,p,Wp,null)}const d=Mp(e,l,c.isFullyInitialized()||L(n),u.filtersNodes()),h=new al(r,d,i);return Vp(t,d,n,r,h,a)}function ec(t,e,n,s,r,i,o){const a=e.eventCache;let c,l;const u=new al(r,e,i);if(L(n))l=t.filter.updateFullNode(e.eventCache.getNode(),s,o),c=Zs(e,l,!0,t.filter.filtersNodes());else{const d=N(n);if(d===".priority")l=t.filter.updatePriority(e.eventCache.getNode(),s),c=Zs(e,l,a.isFullyInitialized(),a.isFiltered());else{const h=j(n),f=a.getNode().getImmediateChild(d);let p;if(L(h))p=s;else{const _=u.getCompleteChild(d);_!=null?Xc(h)===".priority"&&_.getChild(Rp(h)).isEmpty()?p=_:p=_.updateChild(h,s):p=E.EMPTY_NODE}if(f.equals(p))c=e;else{const _=t.filter.updateChild(a.getNode(),d,p,h,u,o);c=Zs(e,_,a.isFullyInitialized(),t.filter.filtersNodes())}}}return c}function qd(t,e){return t.eventCache.isCompleteForChild(e)}function zT(t,e,n,s,r,i,o){let a=e;return s.foreach((c,l)=>{const u=X(n,c);qd(e,N(u))&&(a=ec(t,a,u,l,r,i,o))}),s.foreach((c,l)=>{const u=X(n,c);qd(e,N(u))||(a=ec(t,a,u,l,r,i,o))}),a}function zd(t,e,n){return n.foreach((s,r)=>{e=e.updateChild(s,r)}),e}function tc(t,e,n,s,r,i,o,a){if(e.serverCache.getNode().isEmpty()&&!e.serverCache.isFullyInitialized())return e;let c=e,l;L(n)?l=s:l=new G(null).setTree(n,s);const u=e.serverCache.getNode();return l.children.inorderTraversal((d,h)=>{if(u.hasChild(d)){const f=e.serverCache.getNode().getImmediateChild(d),p=zd(t,f,h);c=Mi(t,c,new H(d),p,r,i,o,a)}}),l.children.inorderTraversal((d,h)=>{const f=!e.serverCache.isCompleteForChild(d)&&h.value===null;if(!u.hasChild(d)&&!f){const p=e.serverCache.getNode().getImmediateChild(d),_=zd(t,p,h);c=Mi(t,c,new H(d),_,r,i,o,a)}}),c}function GT(t,e,n,s,r,i,o){if(xi(r,n)!=null)return e;const a=e.serverCache.isFiltered(),c=e.serverCache;if(s.value!=null){if(L(n)&&c.isFullyInitialized()||c.isCompleteForPath(n))return Mi(t,e,n,c.getNode().getChild(n),r,i,a,o);if(L(n)){let l=new G(null);return c.getNode().forEachChild(Qn,(u,d)=>{l=l.set(new H(u),d)}),tc(t,e,n,l,r,i,a,o)}else return e}else{let l=new G(null);return s.foreach((u,d)=>{const h=X(n,u);c.isCompleteForPath(h)&&(l=l.set(u,c.getNode().getChild(h)))}),tc(t,e,n,l,r,i,a,o)}}function YT(t,e,n,s,r){const i=e.serverCache,o=Mp(e,i.getNode(),i.isFullyInitialized()||L(n),i.isFiltered());return Vp(t,o,n,s,Wp,r)}function KT(t,e,n,s,r,i){let o;if(xi(s,n)!=null)return e;{const a=new al(s,e,r),c=e.eventCache.getNode();let l;if(L(n)||N(n)===".priority"){let u;if(e.serverCache.isFullyInitialized())u=Di(s,Pn(e));else{const d=e.serverCache.getNode();g(d instanceof E,"serverChildren would be complete if leaf node"),u=il(s,d)}u=u,l=t.filter.updateFullNode(c,u,i)}else{const u=N(n);let d=ol(s,u,e.serverCache);d==null&&e.serverCache.isCompleteForChild(u)&&(d=c.getImmediateChild(u)),d!=null?l=t.filter.updateChild(c,u,d,j(n),a,i):e.eventCache.getNode().hasChild(u)?l=t.filter.updateChild(c,u,E.EMPTY_NODE,j(n),a,i):l=c,l.isEmpty()&&e.serverCache.isFullyInitialized()&&(o=Di(s,Pn(e)),o.isLeafNode()&&(l=t.filter.updateFullNode(l,o,i)))}return o=e.serverCache.isFullyInitialized()||xi(s,F())!=null,Zs(e,l,o,t.filter.filtersNodes())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class JT{constructor(e,n){this.query_=e,this.eventRegistrations_=[];const s=this.query_._queryParams,r=new tl(s.getIndex()),i=pT(s);this.processor_=WT(i);const o=n.serverCache,a=n.eventCache,c=r.updateFullNode(E.EMPTY_NODE,o.getNode(),null),l=i.updateFullNode(E.EMPTY_NODE,a.getNode(),null),u=new tn(c,o.isFullyInitialized(),r.filtersNodes()),d=new tn(l,a.isFullyInitialized(),i.filtersNodes());this.viewCache_=_o(d,u),this.eventGenerator_=new ET(this.query_)}get query(){return this.query_}}function XT(t){return t.viewCache_.serverCache.getNode()}function QT(t){return Oi(t.viewCache_)}function ZT(t,e){const n=Pn(t.viewCache_);return n&&(t.query._queryParams.loadsAllData()||!L(e)&&!n.getImmediateChild(N(e)).isEmpty())?n.getChild(e):null}function Gd(t){return t.eventRegistrations_.length===0}function eI(t,e){t.eventRegistrations_.push(e)}function Yd(t,e,n){const s=[];if(n){g(e==null,"A cancel should cancel all event registrations.");const r=t.query._path;t.eventRegistrations_.forEach(i=>{const o=i.createCancelEvent(n,r);o&&s.push(o)})}if(e){let r=[];for(let i=0;i<t.eventRegistrations_.length;++i){const o=t.eventRegistrations_[i];if(!o.matches(e))r.push(o);else if(e.hasAnyCallback()){r=r.concat(t.eventRegistrations_.slice(i+1));break}}t.eventRegistrations_=r}else t.eventRegistrations_=[];return s}function Kd(t,e,n,s){e.type===Je.MERGE&&e.source.queryId!==null&&(g(Pn(t.viewCache_),"We should always have a full cache before handling merges"),g(Oi(t.viewCache_),"Missing event cache, even though we have a server cache"));const r=t.viewCache_,i=jT(t.processor_,r,e,n,s);return VT(t.processor_,i.viewCache),g(i.viewCache.serverCache.isFullyInitialized()||!r.serverCache.isFullyInitialized(),"Once a server snap is complete, it should never go back"),t.viewCache_=i.viewCache,jp(t,i.changes,i.viewCache.eventCache.getNode(),null)}function tI(t,e){const n=t.viewCache_.eventCache,s=[];return n.getNode().isLeafNode()||n.getNode().forEachChild(Q,(i,o)=>{s.push(ms(i,o))}),n.isFullyInitialized()&&s.push(xp(n.getNode())),jp(t,s,n.getNode(),e)}function jp(t,e,n,s){const r=s?[s]:t.eventRegistrations_;return bT(t.eventGenerator_,e,n,r)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Fi;class qp{constructor(){this.views=new Map}}function nI(t){g(!Fi,"__referenceConstructor has already been defined"),Fi=t}function sI(){return g(Fi,"Reference.ts has not been loaded"),Fi}function rI(t){return t.views.size===0}function cl(t,e,n,s){const r=e.source.queryId;if(r!==null){const i=t.views.get(r);return g(i!=null,"SyncTree gave us an op for an invalid query."),Kd(i,e,n,s)}else{let i=[];for(const o of t.views.values())i=i.concat(Kd(o,e,n,s));return i}}function zp(t,e,n,s,r){const i=e._queryIdentifier,o=t.views.get(i);if(!o){let a=Di(n,r?s:null),c=!1;a?c=!0:s instanceof E?(a=il(n,s),c=!1):(a=E.EMPTY_NODE,c=!1);const l=_o(new tn(a,c,!1),new tn(s,r,!1));return new JT(e,l)}return o}function iI(t,e,n,s,r,i){const o=zp(t,e,s,r,i);return t.views.has(e._queryIdentifier)||t.views.set(e._queryIdentifier,o),eI(o,n),tI(o,n)}function oI(t,e,n,s){const r=e._queryIdentifier,i=[];let o=[];const a=nn(t);if(r==="default")for(const[c,l]of t.views.entries())o=o.concat(Yd(l,n,s)),Gd(l)&&(t.views.delete(c),l.query._queryParams.loadsAllData()||i.push(l.query));else{const c=t.views.get(r);c&&(o=o.concat(Yd(c,n,s)),Gd(c)&&(t.views.delete(r),c.query._queryParams.loadsAllData()||i.push(c.query)))}return a&&!nn(t)&&i.push(new(sI())(e._repo,e._path)),{removed:i,events:o}}function Gp(t){const e=[];for(const n of t.views.values())n.query._queryParams.loadsAllData()||e.push(n);return e}function Yt(t,e){let n=null;for(const s of t.views.values())n=n||ZT(s,e);return n}function Yp(t,e){if(e._queryParams.loadsAllData())return vo(t);{const s=e._queryIdentifier;return t.views.get(s)}}function Kp(t,e){return Yp(t,e)!=null}function nn(t){return vo(t)!=null}function vo(t){for(const e of t.views.values())if(e.query._queryParams.loadsAllData())return e;return null}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Ui;function aI(t){g(!Ui,"__referenceConstructor has already been defined"),Ui=t}function cI(){return g(Ui,"Reference.ts has not been loaded"),Ui}let lI=1;class Jd{constructor(e){this.listenProvider_=e,this.syncPointTree_=new G(null),this.pendingWriteTree_=UT(),this.tagToQueryMap=new Map,this.queryToTagMap=new Map}}function Jp(t,e,n,s,r){return IT(t.pendingWriteTree_,e,n,s,r),r?Ds(t,new Nn(nl(),e,n)):[]}function uI(t,e,n,s){kT(t.pendingWriteTree_,e,n,s);const r=G.fromObject(n);return Ds(t,new _s(nl(),e,r))}function Bt(t,e,n=!1){const s=RT(t.pendingWriteTree_,e);if(AT(t.pendingWriteTree_,e)){let i=new G(null);return s.snap!=null?i=i.set(F(),!0):pe(s.children,o=>{i=i.set(new H(o),!0)}),Ds(t,new Li(s.path,i,n))}else return[]}function Ur(t,e,n){return Ds(t,new Nn(sl(),e,n))}function dI(t,e,n){const s=G.fromObject(n);return Ds(t,new _s(sl(),e,s))}function hI(t,e){return Ds(t,new vr(sl(),e))}function fI(t,e,n){const s=ul(t,n);if(s){const r=dl(s),i=r.path,o=r.queryId,a=Te(i,e),c=new vr(rl(o),a);return hl(t,i,c)}else return[]}function $i(t,e,n,s,r=!1){const i=e._path,o=t.syncPointTree_.get(i);let a=[];if(o&&(e._queryIdentifier==="default"||Kp(o,e))){const c=oI(o,e,n,s);rI(o)&&(t.syncPointTree_=t.syncPointTree_.remove(i));const l=c.removed;if(a=c.events,!r){const u=l.findIndex(h=>h._queryParams.loadsAllData())!==-1,d=t.syncPointTree_.findOnPath(i,(h,f)=>nn(f));if(u&&!d){const h=t.syncPointTree_.subtree(i);if(!h.isEmpty()){const f=mI(h);for(let p=0;p<f.length;++p){const _=f[p],m=_.query,A=eg(t,_);t.listenProvider_.startListening(tr(m),wr(t,m),A.hashFn,A.onComplete)}}}!d&&l.length>0&&!s&&(u?t.listenProvider_.stopListening(tr(e),null):l.forEach(h=>{const f=t.queryToTagMap.get(wo(h));t.listenProvider_.stopListening(tr(h),f)}))}_I(t,l)}return a}function Xp(t,e,n,s){const r=ul(t,s);if(r!=null){const i=dl(r),o=i.path,a=i.queryId,c=Te(o,e),l=new Nn(rl(a),c,n);return hl(t,o,l)}else return[]}function pI(t,e,n,s){const r=ul(t,s);if(r){const i=dl(r),o=i.path,a=i.queryId,c=Te(o,e),l=G.fromObject(n),u=new _s(rl(a),c,l);return hl(t,o,u)}else return[]}function nc(t,e,n,s=!1){const r=e._path;let i=null,o=!1;t.syncPointTree_.foreachOnPath(r,(h,f)=>{const p=Te(h,r);i=i||Yt(f,p),o=o||nn(f)});let a=t.syncPointTree_.get(r);a?(o=o||nn(a),i=i||Yt(a,F())):(a=new qp,t.syncPointTree_=t.syncPointTree_.set(r,a));let c;i!=null?c=!0:(c=!1,i=E.EMPTY_NODE,t.syncPointTree_.subtree(r).foreachChild((f,p)=>{const _=Yt(p,F());_&&(i=i.updateImmediateChild(f,_))}));const l=Kp(a,e);if(!l&&!e._queryParams.loadsAllData()){const h=wo(e);g(!t.queryToTagMap.has(h),"View does not exist, but we have a tag");const f=yI();t.queryToTagMap.set(h,f),t.tagToQueryMap.set(f,h)}const u=yo(t.pendingWriteTree_,r);let d=iI(a,e,n,u,i,c);if(!l&&!o&&!s){const h=Yp(a,e);d=d.concat(vI(t,e,h))}return d}function ll(t,e,n){const r=t.pendingWriteTree_,i=t.syncPointTree_.findOnPath(e,(o,a)=>{const c=Te(o,e),l=Yt(a,c);if(l)return l});return $p(r,e,i,n,!0)}function gI(t,e){const n=e._path;let s=null;t.syncPointTree_.foreachOnPath(n,(l,u)=>{const d=Te(l,n);s=s||Yt(u,d)});let r=t.syncPointTree_.get(n);r?s=s||Yt(r,F()):(r=new qp,t.syncPointTree_=t.syncPointTree_.set(n,r));const i=s!=null,o=i?new tn(s,!0,!1):null,a=yo(t.pendingWriteTree_,e._path),c=zp(r,e,a,i?o.getNode():E.EMPTY_NODE,i);return QT(c)}function Ds(t,e){return Qp(e,t.syncPointTree_,null,yo(t.pendingWriteTree_,F()))}function Qp(t,e,n,s){if(L(t.path))return Zp(t,e,n,s);{const r=e.get(F());n==null&&r!=null&&(n=Yt(r,F()));let i=[];const o=N(t.path),a=t.operationForChild(o),c=e.children.get(o);if(c&&a){const l=n?n.getImmediateChild(o):null,u=Bp(s,o);i=i.concat(Qp(a,c,l,u))}return r&&(i=i.concat(cl(r,t,s,n))),i}}function Zp(t,e,n,s){const r=e.get(F());n==null&&r!=null&&(n=Yt(r,F()));let i=[];return e.children.inorderTraversal((o,a)=>{const c=n?n.getImmediateChild(o):null,l=Bp(s,o),u=t.operationForChild(o);u&&(i=i.concat(Zp(u,a,c,l)))}),r&&(i=i.concat(cl(r,t,s,n))),i}function eg(t,e){const n=e.query,s=wr(t,n);return{hashFn:()=>(XT(e)||E.EMPTY_NODE).hash(),onComplete:r=>{if(r==="ok")return s?fI(t,n._path,s):hI(t,n._path);{const i=hS(r,n);return $i(t,n,null,i)}}}}function wr(t,e){const n=wo(e);return t.queryToTagMap.get(n)}function wo(t){return t._path.toString()+"$"+t._queryIdentifier}function ul(t,e){return t.tagToQueryMap.get(e)}function dl(t){const e=t.indexOf("$");return g(e!==-1&&e<t.length-1,"Bad queryKey."),{queryId:t.substr(e+1),path:new H(t.substr(0,e))}}function hl(t,e,n){const s=t.syncPointTree_.get(e);g(s,"Missing sync point for query tag that we're tracking");const r=yo(t.pendingWriteTree_,e);return cl(s,n,r,null)}function mI(t){return t.fold((e,n,s)=>{if(n&&nn(n))return[vo(n)];{let r=[];return n&&(r=Gp(n)),pe(s,(i,o)=>{r=r.concat(o)}),r}})}function tr(t){return t._queryParams.loadsAllData()&&!t._queryParams.isDefault()?new(cI())(t._repo,t._path):t}function _I(t,e){for(let n=0;n<e.length;++n){const s=e[n];if(!s._queryParams.loadsAllData()){const r=wo(s),i=t.queryToTagMap.get(r);t.queryToTagMap.delete(r),t.tagToQueryMap.delete(i)}}}function yI(){return lI++}function vI(t,e,n){const s=e._path,r=wr(t,e),i=eg(t,n),o=t.listenProvider_.startListening(tr(e),r,i.hashFn,i.onComplete),a=t.syncPointTree_.subtree(s);if(r)g(!nn(a.value),"If we're adding a query, it shouldn't be shadowed");else{const c=a.fold((l,u,d)=>{if(!L(l)&&u&&nn(u))return[vo(u).query];{let h=[];return u&&(h=h.concat(Gp(u).map(f=>f.query))),pe(d,(f,p)=>{h=h.concat(p)}),h}});for(let l=0;l<c.length;++l){const u=c[l];t.listenProvider_.stopListening(tr(u),wr(t,u))}}return o}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class fl{constructor(e){this.node_=e}getImmediateChild(e){const n=this.node_.getImmediateChild(e);return new fl(n)}node(){return this.node_}}class pl{constructor(e,n){this.syncTree_=e,this.path_=n}getImmediateChild(e){const n=X(this.path_,e);return new pl(this.syncTree_,n)}node(){return ll(this.syncTree_,this.path_)}}const wI=function(t){return t=t||{},t.timestamp=t.timestamp||new Date().getTime(),t},Xd=function(t,e,n){if(!t||typeof t!="object")return t;if(g(".sv"in t,"Unexpected leaf node or priority contents"),typeof t[".sv"]=="string")return EI(t[".sv"],e,n);if(typeof t[".sv"]=="object")return bI(t[".sv"],e);g(!1,"Unexpected server value: "+JSON.stringify(t,null,2))},EI=function(t,e,n){switch(t){case"timestamp":return n.timestamp;default:g(!1,"Unexpected server value: "+t)}},bI=function(t,e,n){t.hasOwnProperty("increment")||g(!1,"Unexpected server value: "+JSON.stringify(t,null,2));const s=t.increment;typeof s!="number"&&g(!1,"Unexpected increment value: "+s);const r=e.node();if(g(r!==null&&typeof r<"u","Expected ChildrenNode.EMPTY_NODE for nulls"),!r.isLeafNode())return s;const o=r.getValue();return typeof o!="number"?s:o+s},tg=function(t,e,n,s){return gl(e,new pl(n,t),s)},ng=function(t,e,n){return gl(t,new fl(e),n)};function gl(t,e,n){const s=t.getPriority().val(),r=Xd(s,e.getImmediateChild(".priority"),n);let i;if(t.isLeafNode()){const o=t,a=Xd(o.getValue(),e,n);return a!==o.getValue()||r!==o.getPriority().val()?new ue(a,Z(r)):t}else{const o=t;return i=o,r!==o.getPriority().val()&&(i=i.updatePriority(new ue(r))),o.forEachChild(Q,(a,c)=>{const l=gl(c,e.getImmediateChild(a),n);l!==c&&(i=i.updateImmediateChild(a,l))}),i}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ml{constructor(e="",n=null,s={children:{},childCount:0}){this.name=e,this.parent=n,this.node=s}}function _l(t,e){let n=e instanceof H?e:new H(e),s=t,r=N(n);for(;r!==null;){const i=fs(s.node.children,r)||{children:{},childCount:0};s=new ml(r,s,i),n=j(n),r=N(n)}return s}function xs(t){return t.node.value}function sg(t,e){t.node.value=e,sc(t)}function rg(t){return t.node.childCount>0}function CI(t){return xs(t)===void 0&&!rg(t)}function Eo(t,e){pe(t.node.children,(n,s)=>{e(new ml(n,t,s))})}function ig(t,e,n,s){n&&e(t),Eo(t,r=>{ig(r,e,!0)})}function SI(t,e,n){let s=t.parent;for(;s!==null;){if(e(s))return!0;s=s.parent}return!1}function $r(t){return new H(t.parent===null?t.name:$r(t.parent)+"/"+t.name)}function sc(t){t.parent!==null&&TI(t.parent,t.name,t)}function TI(t,e,n){const s=CI(n),r=ft(t.node.children,e);s&&r?(delete t.node.children[e],t.node.childCount--,sc(t)):!s&&!r&&(t.node.children[e]=n.node,t.node.childCount++,sc(t))}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const II=/[\[\].#$\/\u0000-\u001F\u007F]/,kI=/[\[\].#$\u0000-\u001F\u007F]/,ca=10*1024*1024,yl=function(t){return typeof t=="string"&&t.length!==0&&!II.test(t)},og=function(t){return typeof t=="string"&&t.length!==0&&!kI.test(t)},RI=function(t){return t&&(t=t.replace(/^\/*\.info(\/|$)/,"/")),og(t)},ag=function(t){return t===null||typeof t=="string"||typeof t=="number"&&!po(t)||t&&typeof t=="object"&&ft(t,".sv")},Bi=function(t,e,n,s){s&&e===void 0||bo(ps(t,"value"),e,n)},bo=function(t,e,n){const s=n instanceof H?new zS(n,t):n;if(e===void 0)throw new Error(t+"contains undefined "+gn(s));if(typeof e=="function")throw new Error(t+"contains a function "+gn(s)+" with contents = "+e.toString());if(po(e))throw new Error(t+"contains "+e.toString()+" "+gn(s));if(typeof e=="string"&&e.length>ca/3&&ho(e)>ca)throw new Error(t+"contains a string greater than "+ca+" utf8 bytes "+gn(s)+" ('"+e.substring(0,50)+"...')");if(e&&typeof e=="object"){let r=!1,i=!1;if(pe(e,(o,a)=>{if(o===".value")r=!0;else if(o!==".priority"&&o!==".sv"&&(i=!0,!yl(o)))throw new Error(t+" contains an invalid key ("+o+") "+gn(s)+`.  Keys must be non-empty strings and can't contain ".", "#", "$", "/", "[", or "]"`);GS(s,o),bo(t,a,s),YS(s)}),r&&i)throw new Error(t+' contains ".value" child '+gn(s)+" in addition to actual children.")}},AI=function(t,e){let n,s;for(n=0;n<e.length;n++){s=e[n];const i=gr(s);for(let o=0;o<i.length;o++)if(!(i[o]===".priority"&&o===i.length-1)){if(!yl(i[o]))throw new Error(t+"contains an invalid key ("+i[o]+") in path "+s.toString()+`. Keys must be non-empty strings and can't contain ".", "#", "$", "/", "[", or "]"`)}}e.sort(qS);let r=null;for(n=0;n<e.length;n++){if(s=e[n],r!==null&&Ue(r,s))throw new Error(t+"contains a path "+r.toString()+" that is ancestor of another path "+s.toString());r=s}},cg=function(t,e,n,s){const r=ps(t,"values");if(!(e&&typeof e=="object")||Array.isArray(e))throw new Error(r+" must be an object containing the children to replace.");const i=[];pe(e,(o,a)=>{const c=new H(o);if(bo(r,a,X(n,c)),Xc(c)===".priority"&&!ag(a))throw new Error(r+"contains an invalid value for '"+c.toString()+"', which must be a valid Firebase priority (a string, finite number, server value, or null).");i.push(c)}),AI(r,i)},NI=function(t,e,n){if(po(e))throw new Error(ps(t,"priority")+"is "+e.toString()+", but must be a valid Firebase priority (a string, finite number, server value, or null).");if(!ag(e))throw new Error(ps(t,"priority")+"must be a valid Firebase priority (a string, finite number, server value, or null).")},vl=function(t,e,n,s){if(!og(n))throw new Error(ps(t,e)+'was an invalid path = "'+n+`". Paths must be non-empty strings and can't contain ".", "#", "$", "[", or "]"`)},PI=function(t,e,n,s){n&&(n=n.replace(/^\/*\.info(\/|$)/,"/")),vl(t,e,n)},Ht=function(t,e){if(N(e)===".info")throw new Error(t+" failed = Can't modify data under /.info/")},LI=function(t,e){const n=e.path.toString();if(typeof e.repoInfo.host!="string"||e.repoInfo.host.length===0||!yl(e.repoInfo.namespace)&&e.repoInfo.host.split(":")[0]!=="localhost"||n.length!==0&&!RI(n))throw new Error(ps(t,"url")+`must be a valid firebase URL and the path can't contain ".", "#", "$", "[", or "]".`)};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class OI{constructor(){this.eventLists_=[],this.recursionDepth_=0}}function Co(t,e){let n=null;for(let s=0;s<e.length;s++){const r=e[s],i=r.getPath();n!==null&&!Qc(i,n.path)&&(t.eventLists_.push(n),n=null),n===null&&(n={events:[],path:i}),n.events.push(r)}n&&t.eventLists_.push(n)}function lg(t,e,n){Co(t,n),ug(t,s=>Qc(s,e))}function We(t,e,n){Co(t,n),ug(t,s=>Ue(s,e)||Ue(e,s))}function ug(t,e){t.recursionDepth_++;let n=!0;for(let s=0;s<t.eventLists_.length;s++){const r=t.eventLists_[s];if(r){const i=r.path;e(i)?(DI(t.eventLists_[s]),t.eventLists_[s]=null):n=!1}}n&&(t.eventLists_=[]),t.recursionDepth_--}function DI(t){for(let e=0;e<t.events.length;e++){const n=t.events[e];if(n!==null){t.events[e]=null;const s=n.getEventRunner();Xs&&he("event: "+n.toString()),Ls(s)}}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const xI="repo_interrupt",MI=25;class FI{constructor(e,n,s,r){this.repoInfo_=e,this.forceRestClient_=n,this.authTokenProvider_=s,this.appCheckProvider_=r,this.dataUpdateCount=0,this.statsListener_=null,this.eventQueue_=new OI,this.nextWriteId_=1,this.interceptServerDataCallback_=null,this.onDisconnect_=Pi(),this.transactionQueueTree_=new ml,this.persistentConnection_=null,this.key=this.repoInfo_.toURLString()}toString(){return(this.repoInfo_.secure?"https://":"http://")+this.repoInfo_.host}}function UI(t,e,n){if(t.stats_=Kc(t.repoInfo_),t.forceRestClient_||mS())t.server_=new Ni(t.repoInfo_,(s,r,i,o)=>{Qd(t,s,r,i,o)},t.authTokenProvider_,t.appCheckProvider_),setTimeout(()=>Zd(t,!0),0);else{if(typeof n<"u"&&n!==null){if(typeof n!="object")throw new Error("Only objects are supported for option databaseAuthVariableOverride");try{oe(n)}catch(s){throw new Error("Invalid authOverride provided: "+s)}}t.persistentConnection_=new St(t.repoInfo_,e,(s,r,i,o)=>{Qd(t,s,r,i,o)},s=>{Zd(t,s)},s=>{$I(t,s)},t.authTokenProvider_,t.appCheckProvider_,n),t.server_=t.persistentConnection_}t.authTokenProvider_.addTokenChangeListener(s=>{t.server_.refreshAuthToken(s)}),t.appCheckProvider_.addTokenChangeListener(s=>{t.server_.refreshAppCheckToken(s.token)}),t.statsReporter_=ES(t.repoInfo_,()=>new wT(t.stats_,t.server_)),t.infoData_=new gT,t.infoSyncTree_=new Jd({startListening:(s,r,i,o)=>{let a=[];const c=t.infoData_.getNode(s._path);return c.isEmpty()||(a=Ur(t.infoSyncTree_,s._path,c),setTimeout(()=>{o("ok")},0)),a},stopListening:()=>{}}),wl(t,"connected",!1),t.serverSyncTree_=new Jd({startListening:(s,r,i,o)=>(t.server_.listen(s,i,r,(a,c)=>{const l=o(a,c);We(t.eventQueue_,s._path,l)}),[]),stopListening:(s,r)=>{t.server_.unlisten(s,r)}})}function dg(t){const n=t.infoData_.getNode(new H(".info/serverTimeOffset")).val()||0;return new Date().getTime()+n}function So(t){return wI({timestamp:dg(t)})}function Qd(t,e,n,s,r){t.dataUpdateCount++;const i=new H(e);n=t.interceptServerDataCallback_?t.interceptServerDataCallback_(e,n):n;let o=[];if(r)if(s){const c=Ti(n,l=>Z(l));o=pI(t.serverSyncTree_,i,c,r)}else{const c=Z(n);o=Xp(t.serverSyncTree_,i,c,r)}else if(s){const c=Ti(n,l=>Z(l));o=dI(t.serverSyncTree_,i,c)}else{const c=Z(n);o=Ur(t.serverSyncTree_,i,c)}let a=i;o.length>0&&(a=vs(t,i)),We(t.eventQueue_,a,o)}function Zd(t,e){wl(t,"connected",e),e===!1&&VI(t)}function $I(t,e){pe(e,(n,s)=>{wl(t,n,s)})}function wl(t,e,n){const s=new H("/.info/"+e),r=Z(n);t.infoData_.updateSnapshot(s,r);const i=Ur(t.infoSyncTree_,s,r);We(t.eventQueue_,s,i)}function El(t){return t.nextWriteId_++}function BI(t,e,n){const s=gI(t.serverSyncTree_,e);return s!=null?Promise.resolve(s):t.server_.get(e).then(r=>{const i=Z(r).withIndex(e._queryParams.getIndex());nc(t.serverSyncTree_,e,n,!0);let o;if(e._queryParams.loadsAllData())o=Ur(t.serverSyncTree_,e._path,i);else{const a=wr(t.serverSyncTree_,e);o=Xp(t.serverSyncTree_,e._path,i,a)}return We(t.eventQueue_,e._path,o),$i(t.serverSyncTree_,e,n,null,!0),i},r=>(Br(t,"get for query "+oe(e)+" failed: "+r),Promise.reject(new Error(r))))}function HI(t,e,n,s,r){Br(t,"set",{path:e.toString(),value:n,priority:s});const i=So(t),o=Z(n,s),a=ll(t.serverSyncTree_,e),c=ng(o,a,i),l=El(t),u=Jp(t.serverSyncTree_,e,c,l,!0);Co(t.eventQueue_,u),t.server_.put(e.toString(),o.val(!0),(h,f)=>{const p=h==="ok";p||Ie("set at "+e+" failed: "+h);const _=Bt(t.serverSyncTree_,l,!p);We(t.eventQueue_,e,_),sn(t,r,h,f)});const d=Cl(t,e);vs(t,d),We(t.eventQueue_,d,[])}function WI(t,e,n,s){Br(t,"update",{path:e.toString(),value:n});let r=!0;const i=So(t),o={};if(pe(n,(a,c)=>{r=!1,o[a]=tg(X(e,a),Z(c),t.serverSyncTree_,i)}),r)he("update() called with empty data.  Don't do anything."),sn(t,s,"ok",void 0);else{const a=El(t),c=uI(t.serverSyncTree_,e,o,a);Co(t.eventQueue_,c),t.server_.merge(e.toString(),n,(l,u)=>{const d=l==="ok";d||Ie("update at "+e+" failed: "+l);const h=Bt(t.serverSyncTree_,a,!d),f=h.length>0?vs(t,e):e;We(t.eventQueue_,f,h),sn(t,s,l,u)}),pe(n,l=>{const u=Cl(t,X(e,l));vs(t,u)}),We(t.eventQueue_,e,[])}}function VI(t){Br(t,"onDisconnectEvents");const e=So(t),n=Pi();Ja(t.onDisconnect_,F(),(r,i)=>{const o=tg(r,i,t.serverSyncTree_,e);Os(n,r,o)});let s=[];Ja(n,F(),(r,i)=>{s=s.concat(Ur(t.serverSyncTree_,r,i));const o=Cl(t,r);vs(t,o)}),t.onDisconnect_=Pi(),We(t.eventQueue_,F(),s)}function jI(t,e,n){t.server_.onDisconnectCancel(e.toString(),(s,r)=>{s==="ok"&&Ka(t.onDisconnect_,e),sn(t,n,s,r)})}function eh(t,e,n,s){const r=Z(n);t.server_.onDisconnectPut(e.toString(),r.val(!0),(i,o)=>{i==="ok"&&Os(t.onDisconnect_,e,r),sn(t,s,i,o)})}function qI(t,e,n,s,r){const i=Z(n,s);t.server_.onDisconnectPut(e.toString(),i.val(!0),(o,a)=>{o==="ok"&&Os(t.onDisconnect_,e,i),sn(t,r,o,a)})}function zI(t,e,n,s){if(Si(n)){he("onDisconnect().update() called with empty data.  Don't do anything."),sn(t,s,"ok",void 0);return}t.server_.onDisconnectMerge(e.toString(),n,(r,i)=>{r==="ok"&&pe(n,(o,a)=>{const c=Z(a);Os(t.onDisconnect_,X(e,o),c)}),sn(t,s,r,i)})}function GI(t,e,n){let s;N(e._path)===".info"?s=nc(t.infoSyncTree_,e,n):s=nc(t.serverSyncTree_,e,n),lg(t.eventQueue_,e._path,s)}function hg(t,e,n){let s;N(e._path)===".info"?s=$i(t.infoSyncTree_,e,n):s=$i(t.serverSyncTree_,e,n),lg(t.eventQueue_,e._path,s)}function YI(t){t.persistentConnection_&&t.persistentConnection_.interrupt(xI)}function Br(t,...e){let n="";t.persistentConnection_&&(n=t.persistentConnection_.id+":"),he(n,...e)}function sn(t,e,n,s){e&&Ls(()=>{if(n==="ok")e(null);else{const r=(n||"error").toUpperCase();let i=r;s&&(i+=": "+s);const o=new Error(i);o.code=r,e(o)}})}function fg(t,e,n){return ll(t.serverSyncTree_,e,n)||E.EMPTY_NODE}function bl(t,e=t.transactionQueueTree_){if(e||To(t,e),xs(e)){const n=gg(t,e);g(n.length>0,"Sending zero length transaction queue"),n.every(r=>r.status===0)&&KI(t,$r(e),n)}else rg(e)&&Eo(e,n=>{bl(t,n)})}function KI(t,e,n){const s=n.map(l=>l.currentWriteId),r=fg(t,e,s);let i=r;const o=r.hash();for(let l=0;l<n.length;l++){const u=n[l];g(u.status===0,"tryToSendTransactionQueue_: items in queue should all be run."),u.status=1,u.retryCount++;const d=Te(e,u.path);i=i.updateChild(d,u.currentOutputSnapshotRaw)}const a=i.val(!0),c=e;t.server_.put(c.toString(),a,l=>{Br(t,"transaction put response",{path:c.toString(),status:l});let u=[];if(l==="ok"){const d=[];for(let h=0;h<n.length;h++)n[h].status=2,u=u.concat(Bt(t.serverSyncTree_,n[h].currentWriteId)),n[h].onComplete&&d.push(()=>n[h].onComplete(null,!0,n[h].currentOutputSnapshotResolved)),n[h].unwatcher();To(t,_l(t.transactionQueueTree_,e)),bl(t,t.transactionQueueTree_),We(t.eventQueue_,e,u);for(let h=0;h<d.length;h++)Ls(d[h])}else{if(l==="datastale")for(let d=0;d<n.length;d++)n[d].status===3?n[d].status=4:n[d].status=0;else{Ie("transaction at "+c.toString()+" failed: "+l);for(let d=0;d<n.length;d++)n[d].status=4,n[d].abortReason=l}vs(t,e)}},o)}function vs(t,e){const n=pg(t,e),s=$r(n),r=gg(t,n);return JI(t,r,s),s}function JI(t,e,n){if(e.length===0)return;const s=[];let r=[];const o=e.filter(a=>a.status===0).map(a=>a.currentWriteId);for(let a=0;a<e.length;a++){const c=e[a],l=Te(n,c.path);let u=!1,d;if(g(l!==null,"rerunTransactionsUnderNode_: relativePath should not be null."),c.status===4)u=!0,d=c.abortReason,r=r.concat(Bt(t.serverSyncTree_,c.currentWriteId,!0));else if(c.status===0)if(c.retryCount>=MI)u=!0,d="maxretry",r=r.concat(Bt(t.serverSyncTree_,c.currentWriteId,!0));else{const h=fg(t,c.path,o);c.currentInputSnapshot=h;const f=e[a].update(h.val());if(f!==void 0){bo("transaction failed: Data returned ",f,c.path);let p=Z(f);typeof f=="object"&&f!=null&&ft(f,".priority")||(p=p.updatePriority(h.getPriority()));const m=c.currentWriteId,A=So(t),x=ng(p,h,A);c.currentOutputSnapshotRaw=p,c.currentOutputSnapshotResolved=x,c.currentWriteId=El(t),o.splice(o.indexOf(m),1),r=r.concat(Jp(t.serverSyncTree_,c.path,x,c.currentWriteId,c.applyLocally)),r=r.concat(Bt(t.serverSyncTree_,m,!0))}else u=!0,d="nodata",r=r.concat(Bt(t.serverSyncTree_,c.currentWriteId,!0))}We(t.eventQueue_,n,r),r=[],u&&(e[a].status=2,(function(h){setTimeout(h,Math.floor(0))})(e[a].unwatcher),e[a].onComplete&&(d==="nodata"?s.push(()=>e[a].onComplete(null,!1,e[a].currentInputSnapshot)):s.push(()=>e[a].onComplete(new Error(d),!1,null))))}To(t,t.transactionQueueTree_);for(let a=0;a<s.length;a++)Ls(s[a]);bl(t,t.transactionQueueTree_)}function pg(t,e){let n,s=t.transactionQueueTree_;for(n=N(e);n!==null&&xs(s)===void 0;)s=_l(s,n),e=j(e),n=N(e);return s}function gg(t,e){const n=[];return mg(t,e,n),n.sort((s,r)=>s.order-r.order),n}function mg(t,e,n){const s=xs(e);if(s)for(let r=0;r<s.length;r++)n.push(s[r]);Eo(e,r=>{mg(t,r,n)})}function To(t,e){const n=xs(e);if(n){let s=0;for(let r=0;r<n.length;r++)n[r].status!==2&&(n[s]=n[r],s++);n.length=s,sg(e,n.length>0?n:void 0)}Eo(e,s=>{To(t,s)})}function Cl(t,e){const n=$r(pg(t,e)),s=_l(t.transactionQueueTree_,e);return SI(s,r=>{la(t,r)}),la(t,s),ig(s,r=>{la(t,r)}),n}function la(t,e){const n=xs(e);if(n){const s=[];let r=[],i=-1;for(let o=0;o<n.length;o++)n[o].status===3||(n[o].status===1?(g(i===o-1,"All SENT items should be at beginning of queue."),i=o,n[o].status=3,n[o].abortReason="set"):(g(n[o].status===0,"Unexpected transaction status in abort"),n[o].unwatcher(),r=r.concat(Bt(t.serverSyncTree_,n[o].currentWriteId,!0)),n[o].onComplete&&s.push(n[o].onComplete.bind(null,new Error("set"),!1,null))));i===-1?sg(e,void 0):n.length=i+1,We(t.eventQueue_,$r(e),r);for(let o=0;o<s.length;o++)Ls(s[o])}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function XI(t){let e="";const n=t.split("/");for(let s=0;s<n.length;s++)if(n[s].length>0){let r=n[s];try{r=decodeURIComponent(r.replace(/\+/g," "))}catch{}e+="/"+r}return e}function QI(t){const e={};t.charAt(0)==="?"&&(t=t.substring(1));for(const n of t.split("&")){if(n.length===0)continue;const s=n.split("=");s.length===2?e[decodeURIComponent(s[0])]=decodeURIComponent(s[1]):Ie(`Invalid query segment '${n}' in query '${t}'`)}return e}const th=function(t,e){const n=ZI(t),s=n.namespace;n.domain==="firebase.com"&&At(n.host+" is no longer supported. Please use <YOUR FIREBASE>.firebaseio.com instead"),(!s||s==="undefined")&&n.domain!=="localhost"&&At("Cannot parse Firebase url. Please use https://<YOUR FIREBASE>.firebaseio.com"),n.secure||aS();const r=n.scheme==="ws"||n.scheme==="wss";return{repoInfo:new vp(n.host,n.secure,s,r,e,"",s!==n.subdomain),path:new H(n.pathString)}},ZI=function(t){let e="",n="",s="",r="",i="",o=!0,a="https",c=443;if(typeof t=="string"){let l=t.indexOf("//");l>=0&&(a=t.substring(0,l-1),t=t.substring(l+2));let u=t.indexOf("/");u===-1&&(u=t.length);let d=t.indexOf("?");d===-1&&(d=t.length),e=t.substring(0,Math.min(u,d)),u<d&&(r=XI(t.substring(u,d)));const h=QI(t.substring(Math.min(t.length,d)));l=e.indexOf(":"),l>=0?(o=a==="https"||a==="wss",c=parseInt(e.substring(l+1),10)):l=e.length;const f=e.slice(0,l);if(f.toLowerCase()==="localhost")n="localhost";else if(f.split(".").length<=2)n=f;else{const p=e.indexOf(".");s=e.substring(0,p).toLowerCase(),n=e.substring(p+1),i=s}"ns"in h&&(i=h.ns)}return{host:e,port:c,domain:n,subdomain:s,secure:o,scheme:a,pathString:r,namespace:i}};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const nh="-0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ_abcdefghijklmnopqrstuvwxyz",ek=(function(){let t=0;const e=[];return function(n){const s=n===t;t=n;let r;const i=new Array(8);for(r=7;r>=0;r--)i[r]=nh.charAt(n%64),n=Math.floor(n/64);g(n===0,"Cannot push at time == 0");let o=i.join("");if(s){for(r=11;r>=0&&e[r]===63;r--)e[r]=0;e[r]++}else for(r=0;r<12;r++)e[r]=Math.floor(Math.random()*64);for(r=0;r<12;r++)o+=nh.charAt(e[r]);return g(o.length===20,"nextPushId: Length should be 20."),o}})();/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class _g{constructor(e,n,s,r){this.eventType=e,this.eventRegistration=n,this.snapshot=s,this.prevName=r}getPath(){const e=this.snapshot.ref;return this.eventType==="value"?e._path:e.parent._path}getEventType(){return this.eventType}getEventRunner(){return this.eventRegistration.getEventRunner(this)}toString(){return this.getPath().toString()+":"+this.eventType+":"+oe(this.snapshot.exportVal())}}class yg{constructor(e,n,s){this.eventRegistration=e,this.error=n,this.path=s}getPath(){return this.path}getEventType(){return"cancel"}getEventRunner(){return this.eventRegistration.getEventRunner(this)}toString(){return this.path.toString()+":cancel"}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Sl{constructor(e,n){this.snapshotCallback=e,this.cancelCallback=n}onValue(e,n){this.snapshotCallback.call(null,e,n)}onCancel(e){return g(this.hasCancelCallback,"Raising a cancel event on a listener with no cancel callback"),this.cancelCallback.call(null,e)}get hasCancelCallback(){return!!this.cancelCallback}matches(e){return this.snapshotCallback===e.snapshotCallback||this.snapshotCallback.userCallback!==void 0&&this.snapshotCallback.userCallback===e.snapshotCallback.userCallback&&this.snapshotCallback.context===e.snapshotCallback.context}}/**
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
 */class vg{constructor(e,n){this._repo=e,this._path=n}cancel(){const e=new Ae;return jI(this._repo,this._path,e.wrapCallback(()=>{})),e.promise}remove(){Ht("OnDisconnect.remove",this._path);const e=new Ae;return eh(this._repo,this._path,null,e.wrapCallback(()=>{})),e.promise}set(e){Ht("OnDisconnect.set",this._path),Bi("OnDisconnect.set",e,this._path,!1);const n=new Ae;return eh(this._repo,this._path,e,n.wrapCallback(()=>{})),n.promise}setWithPriority(e,n){Ht("OnDisconnect.setWithPriority",this._path),Bi("OnDisconnect.setWithPriority",e,this._path,!1),NI("OnDisconnect.setWithPriority",n);const s=new Ae;return qI(this._repo,this._path,e,n,s.wrapCallback(()=>{})),s.promise}update(e){Ht("OnDisconnect.update",this._path),cg("OnDisconnect.update",e,this._path);const n=new Ae;return zI(this._repo,this._path,e,n.wrapCallback(()=>{})),n.promise}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Io{constructor(e,n,s,r){this._repo=e,this._path=n,this._queryParams=s,this._orderByCalled=r}get key(){return L(this._path)?null:Xc(this._path)}get ref(){return new ot(this._repo,this._path)}get _queryIdentifier(){const e=Bd(this._queryParams),n=Gc(e);return n==="{}"?"default":n}get _queryObject(){return Bd(this._queryParams)}isEqual(e){if(e=ge(e),!(e instanceof Io))return!1;const n=this._repo===e._repo,s=Qc(this._path,e._path),r=this._queryIdentifier===e._queryIdentifier;return n&&s&&r}toJSON(){return this.toString()}toString(){return this._repo.toString()+jS(this._path)}}class ot extends Io{constructor(e,n){super(e,n,new mo,!1)}get parent(){const e=Rp(this._path);return e===null?null:new ot(this._repo,e)}get root(){let e=this;for(;e.parent!==null;)e=e.parent;return e}}class Ln{constructor(e,n,s){this._node=e,this.ref=n,this._index=s}get priority(){return this._node.getPriority().val()}get key(){return this.ref.key}get size(){return this._node.numChildren()}child(e){const n=new H(e),s=On(this.ref,e);return new Ln(this._node.getChild(n),s,Q)}exists(){return!this._node.isEmpty()}exportVal(){return this._node.val(!0)}forEach(e){return this._node.isLeafNode()?!1:!!this._node.forEachChild(this._index,(s,r)=>e(new Ln(r,On(this.ref,s),Q)))}hasChild(e){const n=new H(e);return!this._node.getChild(n).isEmpty()}hasChildren(){return this._node.isLeafNode()?!1:!this._node.isEmpty()}toJSON(){return this.exportVal()}val(){return this._node.val()}}function k(t,e){return t=ge(t),t._checkNotDeleted("ref"),e!==void 0?On(t._root,e):t._root}function On(t,e){return t=ge(t),N(t._path)===null?PI("child","path",e):vl("child","path",e),new ot(t._repo,X(t._path,e))}function wg(t){return t=ge(t),new vg(t._repo,t._path)}function Hi(t,e){t=ge(t),Ht("push",t._path),Bi("push",e,t._path,!0);const n=dg(t._repo),s=ek(n),r=On(t,s),i=On(t,s);let o;return o=Promise.resolve(i),r.then=o.then.bind(o),r.catch=o.then.bind(o,void 0),r}function Ve(t){return Ht("remove",t._path),se(t,null)}function se(t,e){t=ge(t),Ht("set",t._path),Bi("set",e,t._path,!1);const n=new Ae;return HI(t._repo,t._path,e,null,n.wrapCallback(()=>{})),n.promise}function En(t,e){cg("update",e,t._path);const n=new Ae;return WI(t._repo,t._path,e,n.wrapCallback(()=>{})),n.promise}function tt(t){t=ge(t);const e=new Sl(()=>{}),n=new Hr(e);return BI(t._repo,t,n).then(s=>new Ln(s,new ot(t._repo,t._path),t._queryParams.getIndex()))}class Hr{constructor(e){this.callbackContext=e}respondsTo(e){return e==="value"}createEvent(e,n){const s=n._queryParams.getIndex();return new _g("value",this,new Ln(e.snapshotNode,new ot(n._repo,n._path),s))}getEventRunner(e){return e.getEventType()==="cancel"?()=>this.callbackContext.onCancel(e.error):()=>this.callbackContext.onValue(e.snapshot,null)}createCancelEvent(e,n){return this.callbackContext.hasCancelCallback?new yg(this,e,n):null}matches(e){return e instanceof Hr?!e.callbackContext||!this.callbackContext?!0:e.callbackContext.matches(this.callbackContext):!1}hasAnyCallback(){return this.callbackContext!==null}}class ko{constructor(e,n){this.eventType=e,this.callbackContext=n}respondsTo(e){let n=e==="children_added"?"child_added":e;return n=n==="children_removed"?"child_removed":n,this.eventType===n}createCancelEvent(e,n){return this.callbackContext.hasCancelCallback?new yg(this,e,n):null}createEvent(e,n){g(e.childName!=null,"Child events should have a childName.");const s=On(new ot(n._repo,n._path),e.childName),r=n._queryParams.getIndex();return new _g(e.type,this,new Ln(e.snapshotNode,s,r),e.prevName)}getEventRunner(e){return e.getEventType()==="cancel"?()=>this.callbackContext.onCancel(e.error):()=>this.callbackContext.onValue(e.snapshot,e.prevName)}matches(e){return e instanceof ko?this.eventType===e.eventType&&(!this.callbackContext||!e.callbackContext||this.callbackContext.matches(e.callbackContext)):!1}hasAnyCallback(){return!!this.callbackContext}}function Ro(t,e,n,s,r){const i=new Sl(n,void 0),o=e==="value"?new Hr(i):new ko(e,i);return GI(t._repo,t,o),()=>hg(t._repo,t,o)}function Tl(t,e,n,s){return Ro(t,"value",e)}function ws(t,e,n,s){return Ro(t,"child_added",e)}function Eg(t,e,n,s){return Ro(t,"child_changed",e)}function bg(t,e,n,s){return Ro(t,"child_removed",e)}function Tt(t,e,n){let s=null;const r=n?new Sl(n):null;e==="value"?s=new Hr(r):e&&(s=new ko(e,r)),hg(t._repo,t,s)}nI(ot);aI(ot);/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const tk="FIREBASE_DATABASE_EMULATOR_HOST",rc={};let nk=!1;function sk(t,e,n,s){const r=e.lastIndexOf(":"),i=e.substring(0,r),o=Rs(i);t.repoInfo_=new vp(e,o,t.repoInfo_.namespace,t.repoInfo_.webSocketOnly,t.repoInfo_.nodeAdmin,t.repoInfo_.persistenceKey,t.repoInfo_.includeNamespaceInQueryParams,!0,n),s&&(t.authTokenProvider_=s)}function Cg(t,e,n,s,r){let i=s||t.options.databaseURL;i===void 0&&(t.options.projectId||At("Can't determine Firebase Database URL. Be sure to include  a Project ID when calling firebase.initializeApp()."),he("Using default host for project ",t.options.projectId),i=`${t.options.projectId}-default-rtdb.firebaseio.com`);let o=th(i,r),a=o.repoInfo,c;typeof process<"u"&&bd&&(c=bd[tk]),c?(i=`http://${c}?ns=${a.namespace}`,o=th(i,r),a=o.repoInfo):o.repoInfo.secure;const l=new yS(t.name,t.options,e);LI("Invalid Firebase Database URL",o),L(o.path)||At("Database URL must point to the root of a Firebase Database (not including a child path).");const u=ik(a,t,l,new _S(t,n));return new Sg(u,t)}function rk(t,e){const n=rc[e];(!n||n[t.key]!==t)&&At(`Database ${e}(${t.repoInfo_}) has already been deleted.`),YI(t),delete n[t.key]}function ik(t,e,n,s){let r=rc[e.name];r||(r={},rc[e.name]=r);let i=r[t.toURLString()];return i&&At("Database initialized multiple times. Please make sure the format of the database URL matches with each database() call."),i=new FI(t,nk,n,s),r[t.toURLString()]=i,i}class Sg{constructor(e,n){this._repoInternal=e,this.app=n,this.type="database",this._instanceStarted=!1}get _repo(){return this._instanceStarted||(UI(this._repoInternal,this.app.options.appId,this.app.options.databaseAuthVariableOverride),this._instanceStarted=!0),this._repoInternal}get _root(){return this._rootInternal||(this._rootInternal=new ot(this._repo,F())),this._rootInternal}_delete(){return this._rootInternal!==null&&(rk(this._repo,this.app.name),this._repoInternal=null,this._rootInternal=null),Promise.resolve()}_checkNotDeleted(e){this._rootInternal===null&&At("Cannot call "+e+" on a deleted database.")}}function Tg(t=zc(),e){const n=Dr(t,"database").getImmediate({identifier:e});if(!n._instanceStarted){const s=Sb("database");s&&Ig(n,...s)}return n}function Ig(t,e,n,s={}){t=ge(t),t._checkNotDeleted("useEmulator");const r=`${e}:${n}`,i=t._repoInternal;if(t._instanceStarted){if(r===t._repoInternal.repoInfo_.host&&Rn(s,i.repoInfo_.emulatorOptions))return;At("connectDatabaseEmulator() cannot initialize or alter the emulator configuration after the database instance has started.")}let o;if(i.repoInfo_.nodeAdmin)s.mockUserToken&&At('mockUserToken is not supported by the Admin SDK. For client access with mock users, please use the "firebase" package instead of "firebase-admin".'),o=new di(di.OWNER);else if(s.mockUserToken){const a=typeof s.mockUserToken=="string"?s.mockUserToken:Tb(s.mockUserToken,t.app.options.projectId);o=new di(a)}Rs(e)&&(Kf(e),Jf("Database",!0)),sk(i,r,s,o)}/**
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
 */function ok(t){ip(Ps),Zt(new kt("database",(e,{instanceIdentifier:n})=>{const s=e.getProvider("app").getImmediate(),r=e.getProvider("auth-internal"),i=e.getProvider("app-check-internal");return Cg(s,r,i,n)},"PUBLIC").setMultipleInstances(!0)),Ct(Cd,Sd,t),Ct(Cd,Sd,"esm2020")}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ak={".sv":"timestamp"};function bn(){return ak}St.prototype.simpleListen=function(t,e){this.sendRequest("q",{p:t},e)};St.prototype.echo=function(t,e){this.sendRequest("echo",{d:t},e)};ok();const ck=Object.freeze(Object.defineProperty({__proto__:null,DataSnapshot:Ln,Database:Sg,OnDisconnect:vg,_QueryImpl:Io,_QueryParams:mo,_ReferenceImpl:ot,_repoManagerDatabaseFromApp:Cg,_setSDKVersion:ip,_validatePathString:vl,_validateWritablePath:Ht,child:On,connectDatabaseEmulator:Ig,get:tt,getDatabase:Tg,off:Tt,onChildAdded:ws,onChildChanged:Eg,onChildRemoved:bg,onDisconnect:wg,onValue:Tl,push:Hi,ref:k,remove:Ve,serverTimestamp:bn,set:se,update:En},Symbol.toStringTag,{value:"Module"}));var lk="firebase",uk="12.4.0";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */Ct(lk,uk,"app");/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ic=new Map,kg={activated:!1,tokenObservers:[]},dk={initialized:!1,enabled:!1};function ae(t){return ic.get(t)||{...kg}}function hk(t,e){return ic.set(t,e),ic.get(t)}function Ao(){return dk}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Rg="https://content-firebaseappcheck.googleapis.com/v1",fk="exchangeRecaptchaEnterpriseToken",pk="exchangeDebugToken",sh={RETRIAL_MIN_WAIT:30*1e3,RETRIAL_MAX_WAIT:960*1e3},gk=1440*60*1e3;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class mk{constructor(e,n,s,r,i){if(this.operation=e,this.retryPolicy=n,this.getWaitDuration=s,this.lowerBound=r,this.upperBound=i,this.pending=null,this.nextErrorWaitInterval=r,r>i)throw new Error("Proactive refresh lower bound greater than upper bound!")}start(){this.nextErrorWaitInterval=this.lowerBound,this.process(!0).catch(()=>{})}stop(){this.pending&&(this.pending.reject("cancelled"),this.pending=null)}isRunning(){return!!this.pending}async process(e){this.stop();try{this.pending=new Ae,this.pending.promise.catch(n=>{}),await _k(this.getNextRun(e)),this.pending.resolve(),await this.pending.promise,this.pending=new Ae,this.pending.promise.catch(n=>{}),await this.operation(),this.pending.resolve(),await this.pending.promise,this.process(!0).catch(()=>{})}catch(n){this.retryPolicy(n)?this.process(!1).catch(()=>{}):this.stop()}}getNextRun(e){if(e)return this.nextErrorWaitInterval=this.lowerBound,this.getWaitDuration();{const n=this.nextErrorWaitInterval;return this.nextErrorWaitInterval*=2,this.nextErrorWaitInterval>this.upperBound&&(this.nextErrorWaitInterval=this.upperBound),n}}}function _k(t){return new Promise(e=>{setTimeout(e,t)})}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const yk={"already-initialized":"You have already called initializeAppCheck() for FirebaseApp {$appName} with different options. To avoid this error, call initializeAppCheck() with the same options as when it was originally called. This will return the already initialized instance.","use-before-activation":"App Check is being used before initializeAppCheck() is called for FirebaseApp {$appName}. Call initializeAppCheck() before instantiating other Firebase services.","fetch-network-error":"Fetch failed to connect to a network. Check Internet connection. Original error: {$originalErrorMessage}.","fetch-parse-error":"Fetch client could not parse response. Original error: {$originalErrorMessage}.","fetch-status-error":"Fetch server returned an HTTP error status. HTTP status: {$httpStatus}.","storage-open":"Error thrown when opening storage. Original error: {$originalErrorMessage}.","storage-get":"Error thrown when reading from storage. Original error: {$originalErrorMessage}.","storage-set":"Error thrown when writing to storage. Original error: {$originalErrorMessage}.","recaptcha-error":"ReCAPTCHA error.","initial-throttle":"{$httpStatus} error. Attempts allowed again after {$time}",throttled:"Requests throttled due to previous {$httpStatus} error. Attempts allowed again after {$time}"},Pe=new As("appCheck","AppCheck",yk);/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function rh(t=!1){return t?self.grecaptcha?.enterprise:self.grecaptcha}function Il(t){if(!ae(t).activated)throw Pe.create("use-before-activation",{appName:t.name})}function Ag(t){const e=Math.round(t/1e3),n=Math.floor(e/(3600*24)),s=Math.floor((e-n*3600*24)/3600),r=Math.floor((e-n*3600*24-s*3600)/60),i=e-n*3600*24-s*3600-r*60;let o="";return n&&(o+=ei(n)+"d:"),s&&(o+=ei(s)+"h:"),o+=ei(r)+"m:"+ei(i)+"s",o}function ei(t){return t===0?"00":t>=10?t.toString():"0"+t}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function kl({url:t,body:e},n){const s={"Content-Type":"application/json"},r=n.getImmediate({optional:!0});if(r){const d=await r.getHeartbeatsHeader();d&&(s["X-Firebase-Client"]=d)}const i={method:"POST",body:JSON.stringify(e),headers:s};let o;try{o=await fetch(t,i)}catch(d){throw Pe.create("fetch-network-error",{originalErrorMessage:d?.message})}if(o.status!==200)throw Pe.create("fetch-status-error",{httpStatus:o.status});let a;try{a=await o.json()}catch(d){throw Pe.create("fetch-parse-error",{originalErrorMessage:d?.message})}const c=a.ttl.match(/^([\d.]+)(s)$/);if(!c||!c[2]||isNaN(Number(c[1])))throw Pe.create("fetch-parse-error",{originalErrorMessage:`ttl field (timeToLive) is not in standard Protobuf Duration format: ${a.ttl}`});const l=Number(c[1])*1e3,u=Date.now();return{token:a.token,expireTimeMillis:u+l,issuedAtTimeMillis:u}}function vk(t,e){const{projectId:n,appId:s,apiKey:r}=t.options;return{url:`${Rg}/projects/${n}/apps/${s}:${fk}?key=${r}`,body:{recaptcha_enterprise_token:e}}}function Ng(t,e){const{projectId:n,appId:s,apiKey:r}=t.options;return{url:`${Rg}/projects/${n}/apps/${s}:${pk}?key=${r}`,body:{debug_token:e}}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const wk="firebase-app-check-database",Ek=1,Er="firebase-app-check-store",Pg="debug-token";let ti=null;function Lg(){return ti||(ti=new Promise((t,e)=>{try{const n=indexedDB.open(wk,Ek);n.onsuccess=s=>{t(s.target.result)},n.onerror=s=>{e(Pe.create("storage-open",{originalErrorMessage:s.target.error?.message}))},n.onupgradeneeded=s=>{const r=s.target.result;switch(s.oldVersion){case 0:r.createObjectStore(Er,{keyPath:"compositeKey"})}}}catch(n){e(Pe.create("storage-open",{originalErrorMessage:n?.message}))}}),ti)}function bk(t){return Dg(xg(t))}function Ck(t,e){return Og(xg(t),e)}function Sk(t){return Og(Pg,t)}function Tk(){return Dg(Pg)}async function Og(t,e){const s=(await Lg()).transaction(Er,"readwrite"),i=s.objectStore(Er).put({compositeKey:t,value:e});return new Promise((o,a)=>{i.onsuccess=c=>{o()},s.onerror=c=>{a(Pe.create("storage-set",{originalErrorMessage:c.target.error?.message}))}})}async function Dg(t){const n=(await Lg()).transaction(Er,"readonly"),r=n.objectStore(Er).get(t);return new Promise((i,o)=>{r.onsuccess=a=>{const c=a.target.result;i(c?c.value:void 0)},n.onerror=a=>{o(Pe.create("storage-get",{originalErrorMessage:a.target.error?.message}))}})}function xg(t){return`${t.options.appId}-${t.name}`}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Wt=new fo("@firebase/app-check");/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Ik(t){if(jc()){let e;try{e=await bk(t)}catch(n){Wt.warn(`Failed to read token from IndexedDB. Error: ${n}`)}return e}}function ua(t,e){return jc()?Ck(t,e).catch(n=>{Wt.warn(`Failed to write token to IndexedDB. Error: ${n}`)}):Promise.resolve()}async function kk(){let t;try{t=await Tk()}catch{}if(t)return t;{const e=crypto.randomUUID();return Sk(e).catch(n=>Wt.warn(`Failed to persist debug token to IndexedDB. Error: ${n}`)),e}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Rl(){return Ao().enabled}async function Al(){const t=Ao();if(t.enabled&&t.token)return t.token.promise;throw Error(`
            Can't get debug token in production mode.
        `)}function Rk(){const t=qf(),e=Ao();if(e.initialized=!0,typeof t.FIREBASE_APPCHECK_DEBUG_TOKEN!="string"&&t.FIREBASE_APPCHECK_DEBUG_TOKEN!==!0)return;e.enabled=!0;const n=new Ae;e.token=n,typeof t.FIREBASE_APPCHECK_DEBUG_TOKEN=="string"?n.resolve(t.FIREBASE_APPCHECK_DEBUG_TOKEN):n.resolve(kk())}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ak={error:"UNKNOWN_ERROR"};function Nk(t){return uo.encodeString(JSON.stringify(t),!1)}async function oc(t,e=!1,n=!1){const s=t.app;Il(s);const r=ae(s);let i=r.token,o;if(i&&!Kn(i)&&(r.token=void 0,i=void 0),!i){const l=await r.cachedTokenPromise;l&&(Kn(l)?i=l:await ua(s,void 0))}if(!e&&i&&Kn(i))return{token:i.token};let a=!1;if(Rl())try{r.exchangeTokenPromise||(r.exchangeTokenPromise=kl(Ng(s,await Al()),t.heartbeatServiceProvider).finally(()=>{r.exchangeTokenPromise=void 0}),a=!0);const l=await r.exchangeTokenPromise;return await ua(s,l),r.token=l,{token:l.token}}catch(l){return l.code==="appCheck/throttled"||l.code==="appCheck/initial-throttle"?Wt.warn(l.message):n&&Wt.error(l),da(l)}try{r.exchangeTokenPromise||(r.exchangeTokenPromise=r.provider.getToken().finally(()=>{r.exchangeTokenPromise=void 0}),a=!0),i=await ae(s).exchangeTokenPromise}catch(l){l.code==="appCheck/throttled"||l.code==="appCheck/initial-throttle"?Wt.warn(l.message):n&&Wt.error(l),o=l}let c;return i?o?Kn(i)?c={token:i.token,internalError:o}:c=da(o):(c={token:i.token},r.token=i,await ua(s,i)):c=da(o),a&&Ug(s,c),c}async function Pk(t){const e=t.app;Il(e);const{provider:n}=ae(e);if(Rl()){const s=await Al(),{token:r}=await kl(Ng(e,s),t.heartbeatServiceProvider);return{token:r}}else{const{token:s}=await n.getToken();return{token:s}}}function Mg(t,e,n,s){const{app:r}=t,i=ae(r),o={next:n,error:s,type:e};if(i.tokenObservers=[...i.tokenObservers,o],i.token&&Kn(i.token)){const a=i.token;Promise.resolve().then(()=>{n({token:a.token}),ih(t)}).catch(()=>{})}i.cachedTokenPromise.then(()=>ih(t))}function Fg(t,e){const n=ae(t),s=n.tokenObservers.filter(r=>r.next!==e);s.length===0&&n.tokenRefresher&&n.tokenRefresher.isRunning()&&n.tokenRefresher.stop(),n.tokenObservers=s}function ih(t){const{app:e}=t,n=ae(e);let s=n.tokenRefresher;s||(s=Lk(t),n.tokenRefresher=s),!s.isRunning()&&n.isTokenAutoRefreshEnabled&&s.start()}function Lk(t){const{app:e}=t;return new mk(async()=>{const n=ae(e);let s;if(n.token?s=await oc(t,!0):s=await oc(t),s.error)throw s.error;if(s.internalError)throw s.internalError},()=>!0,()=>{const n=ae(e);if(n.token){let s=n.token.issuedAtTimeMillis+(n.token.expireTimeMillis-n.token.issuedAtTimeMillis)*.5+3e5;const r=n.token.expireTimeMillis-300*1e3;return s=Math.min(s,r),Math.max(0,s-Date.now())}else return 0},sh.RETRIAL_MIN_WAIT,sh.RETRIAL_MAX_WAIT)}function Ug(t,e){const n=ae(t).tokenObservers;for(const s of n)try{s.type==="EXTERNAL"&&e.error!=null?s.error(e.error):s.next(e)}catch{}}function Kn(t){return t.expireTimeMillis-Date.now()>0}function da(t){return{token:Nk(Ak),error:t}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ok{constructor(e,n){this.app=e,this.heartbeatServiceProvider=n}_delete(){const{tokenObservers:e}=ae(this.app);for(const n of e)Fg(this.app,n.next);return Promise.resolve()}}function Dk(t,e){return new Ok(t,e)}function xk(t){return{getToken:e=>oc(t,e),getLimitedUseToken:()=>Pk(t),addTokenListener:e=>Mg(t,"INTERNAL",e),removeTokenListener:e=>Fg(t.app,e)}}const Mk="@firebase/app-check",Fk="0.11.0",Uk="https://www.google.com/recaptcha/enterprise.js";function $k(t,e){const n=new Ae,s=ae(t);s.reCAPTCHAState={initialized:n};const r=Bk(t),i=rh(!0);return i?oh(t,e,i,r,n):Vk(()=>{const o=rh(!0);if(!o)throw new Error("no recaptcha");oh(t,e,o,r,n)}),n.promise}function oh(t,e,n,s,r){n.ready(()=>{Wk(t,e,n,s),r.resolve(n)})}function Bk(t){const e=`fire_app_check_${t.name}`,n=document.createElement("div");return n.id=e,n.style.display="none",document.body.appendChild(n),e}async function Hk(t){Il(t);const n=await ae(t).reCAPTCHAState.initialized.promise;return new Promise((s,r)=>{const i=ae(t).reCAPTCHAState;n.ready(()=>{s(n.execute(i.widgetId,{action:"fire_app_check"}))})})}function Wk(t,e,n,s){const r=n.render(s,{sitekey:e,size:"invisible",callback:()=>{ae(t).reCAPTCHAState.succeeded=!0},"error-callback":()=>{ae(t).reCAPTCHAState.succeeded=!1}}),i=ae(t);i.reCAPTCHAState={...i.reCAPTCHAState,widgetId:r}}function Vk(t){const e=document.createElement("script");e.src=Uk,e.onload=t,document.head.appendChild(e)}class Nl{constructor(e){this._siteKey=e,this._throttleData=null}async getToken(){qk(this._throttleData);const e=await Hk(this._app).catch(s=>{throw Pe.create("recaptcha-error")});if(!ae(this._app).reCAPTCHAState?.succeeded)throw Pe.create("recaptcha-error");let n;try{n=await kl(vk(this._app,e),this._heartbeatServiceProvider)}catch(s){throw s.code?.includes("fetch-status-error")?(this._throttleData=jk(Number(s.customData?.httpStatus),this._throttleData),Pe.create("initial-throttle",{time:Ag(this._throttleData.allowRequestsAfter-Date.now()),httpStatus:this._throttleData.httpStatus})):s}return this._throttleData=null,n}initialize(e){this._app=e,this._heartbeatServiceProvider=Dr(e,"heartbeat"),$k(e,this._siteKey).catch(()=>{})}isEqual(e){return e instanceof Nl?this._siteKey===e._siteKey:!1}}function jk(t,e){if(t===404||t===403)return{backoffCount:1,allowRequestsAfter:Date.now()+gk,httpStatus:t};{const n=e?e.backoffCount:0,s=Gb(n,1e3,2);return{backoffCount:n+1,allowRequestsAfter:Date.now()+s,httpStatus:t}}}function qk(t){if(t&&Date.now()-t.allowRequestsAfter<=0)throw Pe.create("throttled",{time:Ag(t.allowRequestsAfter-Date.now()),httpStatus:t.httpStatus})}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function zk(t=zc(),e){t=ge(t);const n=Dr(t,"app-check");if(Ao().initialized||Rk(),Rl()&&Al().then(r=>console.log(`App Check debug token: ${r}. You will need to add it to your app's App Check settings in the Firebase console for it to work.`)),n.isInitialized()){const r=n.getImmediate(),i=n.getOptions();if(i.isTokenAutoRefreshEnabled===e.isTokenAutoRefreshEnabled&&i.provider.isEqual(e.provider))return r;throw Pe.create("already-initialized",{appName:t.name})}const s=n.initialize({options:e});return Gk(t,e.provider,e.isTokenAutoRefreshEnabled),ae(t).isTokenAutoRefreshEnabled&&Mg(s,"INTERNAL",()=>{}),s}function Gk(t,e,n=!1){const s=hk(t,{...kg});s.activated=!0,s.provider=e,s.cachedTokenPromise=Ik(t).then(r=>(r&&Kn(r)&&(s.token=r,Ug(t,{token:r.token})),r)),s.isTokenAutoRefreshEnabled=n&&t.automaticDataCollectionEnabled,!t.automaticDataCollectionEnabled&&n&&Wt.warn("`isTokenAutoRefreshEnabled` is true but `automaticDataCollectionEnabled` was set to false during `initializeApp()`. This blocks automatic token refresh."),s.provider.initialize(t)}const Yk="app-check",ah="app-check-internal";function Kk(){Zt(new kt(Yk,t=>{const e=t.getProvider("app").getImmediate(),n=t.getProvider("heartbeat");return Dk(e,n)},"PUBLIC").setInstantiationMode("EXPLICIT").setInstanceCreatedCallback((t,e,n)=>{t.getProvider(ah).initialize()})),Zt(new kt(ah,t=>{const e=t.getProvider("app-check").getImmediate();return xk(e)},"PUBLIC").setInstantiationMode("EXPLICIT")),Ct(Mk,Fk)}Kk();const Jk={apiKey:"AIzaSyA-fvCaKCjyEFX__YAVr1oPGdVsUEhFehA",authDomain:"vidu-aae11.web.app",projectId:"vidu-aae11",databaseURL:"https://vidu-aae11-default-rtdb.europe-west1.firebasedatabase.app",storageBucket:"vidu-aae11.firebasestorage.app",messagingSenderId:"765724787439",appId:"1:765724787439:web:61a3b5dd538149564c911a",measurementId:"G-EGJ53HLGY4"},Pl=tp(Jk),ch="6LdBIBgsAAAAAB4zIcXaZI-FD4kt21TWs9Zx9_fp";let ac;if(ch.trim()!=="")ac=new Nl(ch),console.info("[Firebase App Check: PROD] Initializing with ReCAPTCHA Enterprise (invisible mode).");else throw console.error("[Firebase App Check: PROD] VITE_RECAPTCHA_ENTERPRISE_SITE_KEY is missing or empty. App Check will NOT be initialized, leaving Firebase services unprotected!"),new Error("Firebase App Check configuration missing in production.");if(ac)try{zk(Pl,{provider:ac,isTokenAutoRefreshEnabled:!0})}catch(t){console.error("[Firebase App Check] initializeAppCheck call failed:",t)}const R=Tg(Pl),Xe=[];function _n(t,e,n,s=null,r=null,i=null){e==="value"?Tl(t,n):e==="child_added"?ws(t,n):e==="child_removed"?bg(t,n):console.warn(`Unknown listener type: ${e}`),Xe.push({ref:t,type:e,callback:n,roomId:s,userId:r,category:i})}function Xk(){Xe.forEach(({ref:t,type:e,callback:n})=>{try{Tt(t,e,n)}catch(s){console.warn("Failed to remove firebase rtdb listener",s)}}),Xe.length=0}function No(t){if(!t)return;Xe.filter(s=>s.roomId===t).forEach(({ref:s,type:r,callback:i})=>{try{Tt(s,r,i)}catch(o){console.warn(`Failed to remove listener for room ${t}`,o)}});const n=Xe.filter(s=>s.roomId!==t);Xe.length=0,Xe.push(...n)}function Qk(t,e){if(!t||!e)return;const n=i=>i.userId===t&&i.roomId===e;Xe.filter(n).forEach(({ref:i,type:o,callback:a})=>{try{Tt(i,o,a)}catch(c){console.warn(`Failed to remove listener for user ${t} in room ${e}`,c)}});const r=Xe.filter(i=>!n(i));Xe.length=0,Xe.push(...r)}function nr(t,e,n=null){_n(t,"value",e,n)}const dn=t=>k(R,`rooms/${t}`),ni=t=>k(R,`rooms/${t}/members`),lh=(t,e)=>k(R,`rooms/${t}/members/${e}`),Zk=t=>k(R,`rooms/${t}/cancellation`),Po=t=>k(R,`rooms/${t}/watch`),Lo=t=>k(R,`rooms/${t}/watch/fileRequest`),eR=t=>k(R,`users/${t}/recentCalls`),Ll=(t,e)=>k(R,`users/${t}/recentCalls/${e}`),Ol=t=>k(R,`users/${t}/outgoingCall`),$g=t=>k(R,`rooms/${t}/offerCandidates`),Bg=t=>k(R,`rooms/${t}/answerCandidates`);function Hg(){return{"dependent-sdk-initialized-before-auth":"Another Firebase SDK was initialized and is trying to use Auth before Auth is initialized. Please be sure to call `initializeAuth` or `getAuth` before starting any other Firebase SDK."}}const tR=Hg,Wg=new As("auth","Firebase",Hg());/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Wi=new fo("@firebase/auth");function nR(t,...e){Wi.logLevel<=W.WARN&&Wi.warn(`Auth (${Ps}): ${t}`,...e)}function hi(t,...e){Wi.logLevel<=W.ERROR&&Wi.error(`Auth (${Ps}): ${t}`,...e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ht(t,...e){throw xl(t,...e)}function nt(t,...e){return xl(t,...e)}function Dl(t,e,n){const s={...tR(),[e]:n};return new As("auth","Firebase",s).create(e,{appName:t.name})}function Cn(t){return Dl(t,"operation-not-supported-in-this-environment","Operations that alter the current user are not supported in conjunction with FirebaseServerApp")}function sR(t,e,n){const s=n;if(!(e instanceof s))throw s.name!==e.constructor.name&&ht(t,"argument-error"),Dl(t,"argument-error",`Type of ${e.constructor.name} does not match expected instance.Did you pass a reference from a different Auth SDK?`)}function xl(t,...e){if(typeof t!="string"){const n=e[0],s=[...e.slice(1)];return s[0]&&(s[0].appName=t.name),t._errorFactory.create(n,...s)}return Wg.create(t,...e)}function C(t,e,...n){if(!t)throw xl(e,...n)}function _t(t){const e="INTERNAL ASSERTION FAILED: "+t;throw hi(e),new Error(e)}function Nt(t,e){t||_t(e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function cc(){return typeof self<"u"&&self.location?.href||""}function rR(){return uh()==="http:"||uh()==="https:"}function uh(){return typeof self<"u"&&self.location?.protocol||null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function iR(){return typeof navigator<"u"&&navigator&&"onLine"in navigator&&typeof navigator.onLine=="boolean"&&(rR()||Ab()||"connection"in navigator)?navigator.onLine:!0}function oR(){if(typeof navigator>"u")return null;const t=navigator;return t.languages&&t.languages[0]||t.language||null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Wr{constructor(e,n){this.shortDelay=e,this.longDelay=n,Nt(n>e,"Short delay should be less than long delay!"),this.isMobile=Vc()||Xf()}get(){return iR()?this.isMobile?this.longDelay:this.shortDelay:Math.min(5e3,this.shortDelay)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ml(t,e){Nt(t.emulator,"Emulator should always be set here");const{url:n}=t.emulator;return e?`${n}${e.startsWith("/")?e.slice(1):e}`:n}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Vg{static initialize(e,n,s){this.fetchImpl=e,n&&(this.headersImpl=n),s&&(this.responseImpl=s)}static fetch(){if(this.fetchImpl)return this.fetchImpl;if(typeof self<"u"&&"fetch"in self)return self.fetch;if(typeof globalThis<"u"&&globalThis.fetch)return globalThis.fetch;if(typeof fetch<"u")return fetch;_t("Could not find fetch implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static headers(){if(this.headersImpl)return this.headersImpl;if(typeof self<"u"&&"Headers"in self)return self.Headers;if(typeof globalThis<"u"&&globalThis.Headers)return globalThis.Headers;if(typeof Headers<"u")return Headers;_t("Could not find Headers implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static response(){if(this.responseImpl)return this.responseImpl;if(typeof self<"u"&&"Response"in self)return self.Response;if(typeof globalThis<"u"&&globalThis.Response)return globalThis.Response;if(typeof Response<"u")return Response;_t("Could not find Response implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const aR={CREDENTIAL_MISMATCH:"custom-token-mismatch",MISSING_CUSTOM_TOKEN:"internal-error",INVALID_IDENTIFIER:"invalid-email",MISSING_CONTINUE_URI:"internal-error",INVALID_PASSWORD:"wrong-password",MISSING_PASSWORD:"missing-password",INVALID_LOGIN_CREDENTIALS:"invalid-credential",EMAIL_EXISTS:"email-already-in-use",PASSWORD_LOGIN_DISABLED:"operation-not-allowed",INVALID_IDP_RESPONSE:"invalid-credential",INVALID_PENDING_TOKEN:"invalid-credential",FEDERATED_USER_ID_ALREADY_LINKED:"credential-already-in-use",MISSING_REQ_TYPE:"internal-error",EMAIL_NOT_FOUND:"user-not-found",RESET_PASSWORD_EXCEED_LIMIT:"too-many-requests",EXPIRED_OOB_CODE:"expired-action-code",INVALID_OOB_CODE:"invalid-action-code",MISSING_OOB_CODE:"internal-error",CREDENTIAL_TOO_OLD_LOGIN_AGAIN:"requires-recent-login",INVALID_ID_TOKEN:"invalid-user-token",TOKEN_EXPIRED:"user-token-expired",USER_NOT_FOUND:"user-token-expired",TOO_MANY_ATTEMPTS_TRY_LATER:"too-many-requests",PASSWORD_DOES_NOT_MEET_REQUIREMENTS:"password-does-not-meet-requirements",INVALID_CODE:"invalid-verification-code",INVALID_SESSION_INFO:"invalid-verification-id",INVALID_TEMPORARY_PROOF:"invalid-credential",MISSING_SESSION_INFO:"missing-verification-id",SESSION_EXPIRED:"code-expired",MISSING_ANDROID_PACKAGE_NAME:"missing-android-pkg-name",UNAUTHORIZED_DOMAIN:"unauthorized-continue-uri",INVALID_OAUTH_CLIENT_ID:"invalid-oauth-client-id",ADMIN_ONLY_OPERATION:"admin-restricted-operation",INVALID_MFA_PENDING_CREDENTIAL:"invalid-multi-factor-session",MFA_ENROLLMENT_NOT_FOUND:"multi-factor-info-not-found",MISSING_MFA_ENROLLMENT_ID:"missing-multi-factor-info",MISSING_MFA_PENDING_CREDENTIAL:"missing-multi-factor-session",SECOND_FACTOR_EXISTS:"second-factor-already-in-use",SECOND_FACTOR_LIMIT_EXCEEDED:"maximum-second-factor-count-exceeded",BLOCKING_FUNCTION_ERROR_RESPONSE:"internal-error",RECAPTCHA_NOT_ENABLED:"recaptcha-not-enabled",MISSING_RECAPTCHA_TOKEN:"missing-recaptcha-token",INVALID_RECAPTCHA_TOKEN:"invalid-recaptcha-token",INVALID_RECAPTCHA_ACTION:"invalid-recaptcha-action",MISSING_CLIENT_TYPE:"missing-client-type",MISSING_RECAPTCHA_VERSION:"missing-recaptcha-version",INVALID_RECAPTCHA_VERSION:"invalid-recaptcha-version",INVALID_REQ_TYPE:"invalid-req-type"};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const cR=["/v1/accounts:signInWithCustomToken","/v1/accounts:signInWithEmailLink","/v1/accounts:signInWithIdp","/v1/accounts:signInWithPassword","/v1/accounts:signInWithPhoneNumber","/v1/token"],lR=new Wr(3e4,6e4);function Fl(t,e){return t.tenantId&&!e.tenantId?{...e,tenantId:t.tenantId}:e}async function Ms(t,e,n,s,r={}){return jg(t,r,async()=>{let i={},o={};s&&(e==="GET"?o=s:i={body:JSON.stringify(s)});const a=Ns({key:t.config.apiKey,...o}).slice(1),c=await t._getAdditionalHeaders();c["Content-Type"]="application/json",t.languageCode&&(c["X-Firebase-Locale"]=t.languageCode);const l={method:e,headers:c,...i};return Rb()||(l.referrerPolicy="no-referrer"),t.emulatorConfig&&Rs(t.emulatorConfig.host)&&(l.credentials="include"),Vg.fetch()(await qg(t,t.config.apiHost,n,a),l)})}async function jg(t,e,n){t._canInitEmulator=!1;const s={...aR,...e};try{const r=new dR(t),i=await Promise.race([n(),r.promise]);r.clearNetworkTimeout();const o=await i.json();if("needConfirmation"in o)throw si(t,"account-exists-with-different-credential",o);if(i.ok&&!("errorMessage"in o))return o;{const a=i.ok?o.errorMessage:o.error.message,[c,l]=a.split(" : ");if(c==="FEDERATED_USER_ID_ALREADY_LINKED")throw si(t,"credential-already-in-use",o);if(c==="EMAIL_EXISTS")throw si(t,"email-already-in-use",o);if(c==="USER_DISABLED")throw si(t,"user-disabled",o);const u=s[c]||c.toLowerCase().replace(/[_\s]+/g,"-");if(l)throw Dl(t,u,l);ht(t,u)}}catch(r){if(r instanceof an)throw r;ht(t,"network-request-failed",{message:String(r)})}}async function uR(t,e,n,s,r={}){const i=await Ms(t,e,n,s,r);return"mfaPendingCredential"in i&&ht(t,"multi-factor-auth-required",{_serverResponse:i}),i}async function qg(t,e,n,s){const r=`${e}${n}?${s}`,i=t,o=i.config.emulator?Ml(t.config,r):`${t.config.apiScheme}://${r}`;return cR.includes(n)&&(await i._persistenceManagerAvailable,i._getPersistenceType()==="COOKIE")?i._getPersistence()._getFinalTarget(o).toString():o}class dR{clearNetworkTimeout(){clearTimeout(this.timer)}constructor(e){this.auth=e,this.timer=null,this.promise=new Promise((n,s)=>{this.timer=setTimeout(()=>s(nt(this.auth,"network-request-failed")),lR.get())})}}function si(t,e,n){const s={appName:t.name};n.email&&(s.email=n.email),n.phoneNumber&&(s.phoneNumber=n.phoneNumber);const r=nt(t,e,s);return r.customData._tokenResponse=n,r}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function hR(t,e){return Ms(t,"POST","/v1/accounts:delete",e)}async function Vi(t,e){return Ms(t,"POST","/v1/accounts:lookup",e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function sr(t){if(t)try{const e=new Date(Number(t));if(!isNaN(e.getTime()))return e.toUTCString()}catch{}}async function fR(t,e=!1){const n=ge(t),s=await n.getIdToken(e),r=Ul(s);C(r&&r.exp&&r.auth_time&&r.iat,n.auth,"internal-error");const i=typeof r.firebase=="object"?r.firebase:void 0,o=i?.sign_in_provider;return{claims:r,token:s,authTime:sr(ha(r.auth_time)),issuedAtTime:sr(ha(r.iat)),expirationTime:sr(ha(r.exp)),signInProvider:o||null,signInSecondFactor:i?.sign_in_second_factor||null}}function ha(t){return Number(t)*1e3}function Ul(t){const[e,n,s]=t.split(".");if(e===void 0||n===void 0||s===void 0)return hi("JWT malformed, contained fewer than 3 sections"),null;try{const r=Ci(n);return r?JSON.parse(r):(hi("Failed to decode base64 JWT payload"),null)}catch(r){return hi("Caught error parsing JWT payload as JSON",r?.toString()),null}}function dh(t){const e=Ul(t);return C(e,"internal-error"),C(typeof e.exp<"u","internal-error"),C(typeof e.iat<"u","internal-error"),Number(e.exp)-Number(e.iat)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function br(t,e,n=!1){if(n)return e;try{return await e}catch(s){throw s instanceof an&&pR(s)&&t.auth.currentUser===t&&await t.auth.signOut(),s}}function pR({code:t}){return t==="auth/user-disabled"||t==="auth/user-token-expired"}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class gR{constructor(e){this.user=e,this.isRunning=!1,this.timerId=null,this.errorBackoff=3e4}_start(){this.isRunning||(this.isRunning=!0,this.schedule())}_stop(){this.isRunning&&(this.isRunning=!1,this.timerId!==null&&clearTimeout(this.timerId))}getInterval(e){if(e){const n=this.errorBackoff;return this.errorBackoff=Math.min(this.errorBackoff*2,96e4),n}else{this.errorBackoff=3e4;const s=(this.user.stsTokenManager.expirationTime??0)-Date.now()-3e5;return Math.max(0,s)}}schedule(e=!1){if(!this.isRunning)return;const n=this.getInterval(e);this.timerId=setTimeout(async()=>{await this.iteration()},n)}async iteration(){try{await this.user.getIdToken(!0)}catch(e){e?.code==="auth/network-request-failed"&&this.schedule(!0);return}this.schedule()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class lc{constructor(e,n){this.createdAt=e,this.lastLoginAt=n,this._initializeTime()}_initializeTime(){this.lastSignInTime=sr(this.lastLoginAt),this.creationTime=sr(this.createdAt)}_copy(e){this.createdAt=e.createdAt,this.lastLoginAt=e.lastLoginAt,this._initializeTime()}toJSON(){return{createdAt:this.createdAt,lastLoginAt:this.lastLoginAt}}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function ji(t){const e=t.auth,n=await t.getIdToken(),s=await br(t,Vi(e,{idToken:n}));C(s?.users.length,e,"internal-error");const r=s.users[0];t._notifyReloadListener(r);const i=r.providerUserInfo?.length?zg(r.providerUserInfo):[],o=_R(t.providerData,i),a=t.isAnonymous,c=!(t.email&&r.passwordHash)&&!o?.length,l=a?c:!1,u={uid:r.localId,displayName:r.displayName||null,photoURL:r.photoUrl||null,email:r.email||null,emailVerified:r.emailVerified||!1,phoneNumber:r.phoneNumber||null,tenantId:r.tenantId||null,providerData:o,metadata:new lc(r.createdAt,r.lastLoginAt),isAnonymous:l};Object.assign(t,u)}async function mR(t){const e=ge(t);await ji(e),await e.auth._persistUserIfCurrent(e),e.auth._notifyListenersIfCurrent(e)}function _R(t,e){return[...t.filter(s=>!e.some(r=>r.providerId===s.providerId)),...e]}function zg(t){return t.map(({providerId:e,...n})=>({providerId:e,uid:n.rawId||"",displayName:n.displayName||null,email:n.email||null,phoneNumber:n.phoneNumber||null,photoURL:n.photoUrl||null}))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function yR(t,e){const n=await jg(t,{},async()=>{const s=Ns({grant_type:"refresh_token",refresh_token:e}).slice(1),{tokenApiHost:r,apiKey:i}=t.config,o=await qg(t,r,"/v1/token",`key=${i}`),a=await t._getAdditionalHeaders();a["Content-Type"]="application/x-www-form-urlencoded";const c={method:"POST",headers:a,body:s};return t.emulatorConfig&&Rs(t.emulatorConfig.host)&&(c.credentials="include"),Vg.fetch()(o,c)});return{accessToken:n.access_token,expiresIn:n.expires_in,refreshToken:n.refresh_token}}async function vR(t,e){return Ms(t,"POST","/v2/accounts:revokeToken",Fl(t,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Zn{constructor(){this.refreshToken=null,this.accessToken=null,this.expirationTime=null}get isExpired(){return!this.expirationTime||Date.now()>this.expirationTime-3e4}updateFromServerResponse(e){C(e.idToken,"internal-error"),C(typeof e.idToken<"u","internal-error"),C(typeof e.refreshToken<"u","internal-error");const n="expiresIn"in e&&typeof e.expiresIn<"u"?Number(e.expiresIn):dh(e.idToken);this.updateTokensAndExpiration(e.idToken,e.refreshToken,n)}updateFromIdToken(e){C(e.length!==0,"internal-error");const n=dh(e);this.updateTokensAndExpiration(e,null,n)}async getToken(e,n=!1){return!n&&this.accessToken&&!this.isExpired?this.accessToken:(C(this.refreshToken,e,"user-token-expired"),this.refreshToken?(await this.refresh(e,this.refreshToken),this.accessToken):null)}clearRefreshToken(){this.refreshToken=null}async refresh(e,n){const{accessToken:s,refreshToken:r,expiresIn:i}=await yR(e,n);this.updateTokensAndExpiration(s,r,Number(i))}updateTokensAndExpiration(e,n,s){this.refreshToken=n||null,this.accessToken=e||null,this.expirationTime=Date.now()+s*1e3}static fromJSON(e,n){const{refreshToken:s,accessToken:r,expirationTime:i}=n,o=new Zn;return s&&(C(typeof s=="string","internal-error",{appName:e}),o.refreshToken=s),r&&(C(typeof r=="string","internal-error",{appName:e}),o.accessToken=r),i&&(C(typeof i=="number","internal-error",{appName:e}),o.expirationTime=i),o}toJSON(){return{refreshToken:this.refreshToken,accessToken:this.accessToken,expirationTime:this.expirationTime}}_assign(e){this.accessToken=e.accessToken,this.refreshToken=e.refreshToken,this.expirationTime=e.expirationTime}_clone(){return Object.assign(new Zn,this.toJSON())}_performRefresh(){return _t("not implemented")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Dt(t,e){C(typeof t=="string"||typeof t>"u","internal-error",{appName:e})}class Qe{constructor({uid:e,auth:n,stsTokenManager:s,...r}){this.providerId="firebase",this.proactiveRefresh=new gR(this),this.reloadUserInfo=null,this.reloadListener=null,this.uid=e,this.auth=n,this.stsTokenManager=s,this.accessToken=s.accessToken,this.displayName=r.displayName||null,this.email=r.email||null,this.emailVerified=r.emailVerified||!1,this.phoneNumber=r.phoneNumber||null,this.photoURL=r.photoURL||null,this.isAnonymous=r.isAnonymous||!1,this.tenantId=r.tenantId||null,this.providerData=r.providerData?[...r.providerData]:[],this.metadata=new lc(r.createdAt||void 0,r.lastLoginAt||void 0)}async getIdToken(e){const n=await br(this,this.stsTokenManager.getToken(this.auth,e));return C(n,this.auth,"internal-error"),this.accessToken!==n&&(this.accessToken=n,await this.auth._persistUserIfCurrent(this),this.auth._notifyListenersIfCurrent(this)),n}getIdTokenResult(e){return fR(this,e)}reload(){return mR(this)}_assign(e){this!==e&&(C(this.uid===e.uid,this.auth,"internal-error"),this.displayName=e.displayName,this.photoURL=e.photoURL,this.email=e.email,this.emailVerified=e.emailVerified,this.phoneNumber=e.phoneNumber,this.isAnonymous=e.isAnonymous,this.tenantId=e.tenantId,this.providerData=e.providerData.map(n=>({...n})),this.metadata._copy(e.metadata),this.stsTokenManager._assign(e.stsTokenManager))}_clone(e){const n=new Qe({...this,auth:e,stsTokenManager:this.stsTokenManager._clone()});return n.metadata._copy(this.metadata),n}_onReload(e){C(!this.reloadListener,this.auth,"internal-error"),this.reloadListener=e,this.reloadUserInfo&&(this._notifyReloadListener(this.reloadUserInfo),this.reloadUserInfo=null)}_notifyReloadListener(e){this.reloadListener?this.reloadListener(e):this.reloadUserInfo=e}_startProactiveRefresh(){this.proactiveRefresh._start()}_stopProactiveRefresh(){this.proactiveRefresh._stop()}async _updateTokensIfNecessary(e,n=!1){let s=!1;e.idToken&&e.idToken!==this.stsTokenManager.accessToken&&(this.stsTokenManager.updateFromServerResponse(e),s=!0),n&&await ji(this),await this.auth._persistUserIfCurrent(this),s&&this.auth._notifyListenersIfCurrent(this)}async delete(){if(Ge(this.auth.app))return Promise.reject(Cn(this.auth));const e=await this.getIdToken();return await br(this,hR(this.auth,{idToken:e})),this.stsTokenManager.clearRefreshToken(),this.auth.signOut()}toJSON(){return{uid:this.uid,email:this.email||void 0,emailVerified:this.emailVerified,displayName:this.displayName||void 0,isAnonymous:this.isAnonymous,photoURL:this.photoURL||void 0,phoneNumber:this.phoneNumber||void 0,tenantId:this.tenantId||void 0,providerData:this.providerData.map(e=>({...e})),stsTokenManager:this.stsTokenManager.toJSON(),_redirectEventId:this._redirectEventId,...this.metadata.toJSON(),apiKey:this.auth.config.apiKey,appName:this.auth.name}}get refreshToken(){return this.stsTokenManager.refreshToken||""}static _fromJSON(e,n){const s=n.displayName??void 0,r=n.email??void 0,i=n.phoneNumber??void 0,o=n.photoURL??void 0,a=n.tenantId??void 0,c=n._redirectEventId??void 0,l=n.createdAt??void 0,u=n.lastLoginAt??void 0,{uid:d,emailVerified:h,isAnonymous:f,providerData:p,stsTokenManager:_}=n;C(d&&_,e,"internal-error");const m=Zn.fromJSON(this.name,_);C(typeof d=="string",e,"internal-error"),Dt(s,e.name),Dt(r,e.name),C(typeof h=="boolean",e,"internal-error"),C(typeof f=="boolean",e,"internal-error"),Dt(i,e.name),Dt(o,e.name),Dt(a,e.name),Dt(c,e.name),Dt(l,e.name),Dt(u,e.name);const A=new Qe({uid:d,auth:e,email:r,emailVerified:h,displayName:s,isAnonymous:f,photoURL:o,phoneNumber:i,tenantId:a,stsTokenManager:m,createdAt:l,lastLoginAt:u});return p&&Array.isArray(p)&&(A.providerData=p.map(x=>({...x}))),c&&(A._redirectEventId=c),A}static async _fromIdTokenResponse(e,n,s=!1){const r=new Zn;r.updateFromServerResponse(n);const i=new Qe({uid:n.localId,auth:e,stsTokenManager:r,isAnonymous:s});return await ji(i),i}static async _fromGetAccountInfoResponse(e,n,s){const r=n.users[0];C(r.localId!==void 0,"internal-error");const i=r.providerUserInfo!==void 0?zg(r.providerUserInfo):[],o=!(r.email&&r.passwordHash)&&!i?.length,a=new Zn;a.updateFromIdToken(s);const c=new Qe({uid:r.localId,auth:e,stsTokenManager:a,isAnonymous:o}),l={uid:r.localId,displayName:r.displayName||null,photoURL:r.photoUrl||null,email:r.email||null,emailVerified:r.emailVerified||!1,phoneNumber:r.phoneNumber||null,tenantId:r.tenantId||null,providerData:i,metadata:new lc(r.createdAt,r.lastLoginAt),isAnonymous:!(r.email&&r.passwordHash)&&!i?.length};return Object.assign(c,l),c}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const hh=new Map;function yt(t){Nt(t instanceof Function,"Expected a class definition");let e=hh.get(t);return e?(Nt(e instanceof t,"Instance stored in cache mismatched with class"),e):(e=new t,hh.set(t,e),e)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Gg{constructor(){this.type="NONE",this.storage={}}async _isAvailable(){return!0}async _set(e,n){this.storage[e]=n}async _get(e){const n=this.storage[e];return n===void 0?null:n}async _remove(e){delete this.storage[e]}_addListener(e,n){}_removeListener(e,n){}}Gg.type="NONE";const uc=Gg;/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function fi(t,e,n){return`firebase:${t}:${e}:${n}`}class es{constructor(e,n,s){this.persistence=e,this.auth=n,this.userKey=s;const{config:r,name:i}=this.auth;this.fullUserKey=fi(this.userKey,r.apiKey,i),this.fullPersistenceKey=fi("persistence",r.apiKey,i),this.boundEventHandler=n._onStorageEvent.bind(n),this.persistence._addListener(this.fullUserKey,this.boundEventHandler)}setCurrentUser(e){return this.persistence._set(this.fullUserKey,e.toJSON())}async getCurrentUser(){const e=await this.persistence._get(this.fullUserKey);if(!e)return null;if(typeof e=="string"){const n=await Vi(this.auth,{idToken:e}).catch(()=>{});return n?Qe._fromGetAccountInfoResponse(this.auth,n,e):null}return Qe._fromJSON(this.auth,e)}removeCurrentUser(){return this.persistence._remove(this.fullUserKey)}savePersistenceForRedirect(){return this.persistence._set(this.fullPersistenceKey,this.persistence.type)}async setPersistence(e){if(this.persistence===e)return;const n=await this.getCurrentUser();if(await this.removeCurrentUser(),this.persistence=e,n)return this.setCurrentUser(n)}delete(){this.persistence._removeListener(this.fullUserKey,this.boundEventHandler)}static async create(e,n,s="authUser"){if(!n.length)return new es(yt(uc),e,s);const r=(await Promise.all(n.map(async l=>{if(await l._isAvailable())return l}))).filter(l=>l);let i=r[0]||yt(uc);const o=fi(s,e.config.apiKey,e.name);let a=null;for(const l of n)try{const u=await l._get(o);if(u){let d;if(typeof u=="string"){const h=await Vi(e,{idToken:u}).catch(()=>{});if(!h)break;d=await Qe._fromGetAccountInfoResponse(e,h,u)}else d=Qe._fromJSON(e,u);l!==i&&(a=d),i=l;break}}catch{}const c=r.filter(l=>l._shouldAllowMigration);return!i._shouldAllowMigration||!c.length?new es(i,e,s):(i=c[0],a&&await i._set(o,a.toJSON()),await Promise.all(n.map(async l=>{if(l!==i)try{await l._remove(o)}catch{}})),new es(i,e,s))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function fh(t){const e=t.toLowerCase();if(e.includes("opera/")||e.includes("opr/")||e.includes("opios/"))return"Opera";if(Xg(e))return"IEMobile";if(e.includes("msie")||e.includes("trident/"))return"IE";if(e.includes("edge/"))return"Edge";if(Yg(e))return"Firefox";if(e.includes("silk/"))return"Silk";if(Zg(e))return"Blackberry";if(em(e))return"Webos";if(Kg(e))return"Safari";if((e.includes("chrome/")||Jg(e))&&!e.includes("edge/"))return"Chrome";if(Qg(e))return"Android";{const n=/([a-zA-Z\d\.]+)\/[a-zA-Z\d\.]*$/,s=t.match(n);if(s?.length===2)return s[1]}return"Other"}function Yg(t=ke()){return/firefox\//i.test(t)}function Kg(t=ke()){const e=t.toLowerCase();return e.includes("safari/")&&!e.includes("chrome/")&&!e.includes("crios/")&&!e.includes("android")}function Jg(t=ke()){return/crios\//i.test(t)}function Xg(t=ke()){return/iemobile/i.test(t)}function Qg(t=ke()){return/android/i.test(t)}function Zg(t=ke()){return/blackberry/i.test(t)}function em(t=ke()){return/webos/i.test(t)}function $l(t=ke()){return/iphone|ipad|ipod/i.test(t)||/macintosh/i.test(t)&&/mobile/i.test(t)}function wR(t=ke()){return $l(t)&&!!window.navigator?.standalone}function ER(){return Nb()&&document.documentMode===10}function tm(t=ke()){return $l(t)||Qg(t)||em(t)||Zg(t)||/windows phone/i.test(t)||Xg(t)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function nm(t,e=[]){let n;switch(t){case"Browser":n=fh(ke());break;case"Worker":n=`${fh(ke())}-${t}`;break;default:n=t}const s=e.length?e.join(","):"FirebaseCore-web";return`${n}/JsCore/${Ps}/${s}`}/**
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
 */class bR{constructor(e){this.auth=e,this.queue=[]}pushCallback(e,n){const s=i=>new Promise((o,a)=>{try{const c=e(i);o(c)}catch(c){a(c)}});s.onAbort=n,this.queue.push(s);const r=this.queue.length-1;return()=>{this.queue[r]=()=>Promise.resolve()}}async runMiddleware(e){if(this.auth.currentUser===e)return;const n=[];try{for(const s of this.queue)await s(e),s.onAbort&&n.push(s.onAbort)}catch(s){n.reverse();for(const r of n)try{r()}catch{}throw this.auth._errorFactory.create("login-blocked",{originalMessage:s?.message})}}}/**
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
 */async function CR(t,e={}){return Ms(t,"GET","/v2/passwordPolicy",Fl(t,e))}/**
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
 */const SR=6;class TR{constructor(e){const n=e.customStrengthOptions;this.customStrengthOptions={},this.customStrengthOptions.minPasswordLength=n.minPasswordLength??SR,n.maxPasswordLength&&(this.customStrengthOptions.maxPasswordLength=n.maxPasswordLength),n.containsLowercaseCharacter!==void 0&&(this.customStrengthOptions.containsLowercaseLetter=n.containsLowercaseCharacter),n.containsUppercaseCharacter!==void 0&&(this.customStrengthOptions.containsUppercaseLetter=n.containsUppercaseCharacter),n.containsNumericCharacter!==void 0&&(this.customStrengthOptions.containsNumericCharacter=n.containsNumericCharacter),n.containsNonAlphanumericCharacter!==void 0&&(this.customStrengthOptions.containsNonAlphanumericCharacter=n.containsNonAlphanumericCharacter),this.enforcementState=e.enforcementState,this.enforcementState==="ENFORCEMENT_STATE_UNSPECIFIED"&&(this.enforcementState="OFF"),this.allowedNonAlphanumericCharacters=e.allowedNonAlphanumericCharacters?.join("")??"",this.forceUpgradeOnSignin=e.forceUpgradeOnSignin??!1,this.schemaVersion=e.schemaVersion}validatePassword(e){const n={isValid:!0,passwordPolicy:this};return this.validatePasswordLengthOptions(e,n),this.validatePasswordCharacterOptions(e,n),n.isValid&&(n.isValid=n.meetsMinPasswordLength??!0),n.isValid&&(n.isValid=n.meetsMaxPasswordLength??!0),n.isValid&&(n.isValid=n.containsLowercaseLetter??!0),n.isValid&&(n.isValid=n.containsUppercaseLetter??!0),n.isValid&&(n.isValid=n.containsNumericCharacter??!0),n.isValid&&(n.isValid=n.containsNonAlphanumericCharacter??!0),n}validatePasswordLengthOptions(e,n){const s=this.customStrengthOptions.minPasswordLength,r=this.customStrengthOptions.maxPasswordLength;s&&(n.meetsMinPasswordLength=e.length>=s),r&&(n.meetsMaxPasswordLength=e.length<=r)}validatePasswordCharacterOptions(e,n){this.updatePasswordCharacterOptionsStatuses(n,!1,!1,!1,!1);let s;for(let r=0;r<e.length;r++)s=e.charAt(r),this.updatePasswordCharacterOptionsStatuses(n,s>="a"&&s<="z",s>="A"&&s<="Z",s>="0"&&s<="9",this.allowedNonAlphanumericCharacters.includes(s))}updatePasswordCharacterOptionsStatuses(e,n,s,r,i){this.customStrengthOptions.containsLowercaseLetter&&(e.containsLowercaseLetter||(e.containsLowercaseLetter=n)),this.customStrengthOptions.containsUppercaseLetter&&(e.containsUppercaseLetter||(e.containsUppercaseLetter=s)),this.customStrengthOptions.containsNumericCharacter&&(e.containsNumericCharacter||(e.containsNumericCharacter=r)),this.customStrengthOptions.containsNonAlphanumericCharacter&&(e.containsNonAlphanumericCharacter||(e.containsNonAlphanumericCharacter=i))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class IR{constructor(e,n,s,r){this.app=e,this.heartbeatServiceProvider=n,this.appCheckServiceProvider=s,this.config=r,this.currentUser=null,this.emulatorConfig=null,this.operations=Promise.resolve(),this.authStateSubscription=new ph(this),this.idTokenSubscription=new ph(this),this.beforeStateQueue=new bR(this),this.redirectUser=null,this.isProactiveRefreshEnabled=!1,this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION=1,this._canInitEmulator=!0,this._isInitialized=!1,this._deleted=!1,this._initializationPromise=null,this._popupRedirectResolver=null,this._errorFactory=Wg,this._agentRecaptchaConfig=null,this._tenantRecaptchaConfigs={},this._projectPasswordPolicy=null,this._tenantPasswordPolicies={},this._resolvePersistenceManagerAvailable=void 0,this.lastNotifiedUid=void 0,this.languageCode=null,this.tenantId=null,this.settings={appVerificationDisabledForTesting:!1},this.frameworks=[],this.name=e.name,this.clientVersion=r.sdkClientVersion,this._persistenceManagerAvailable=new Promise(i=>this._resolvePersistenceManagerAvailable=i)}_initializeWithPersistence(e,n){return n&&(this._popupRedirectResolver=yt(n)),this._initializationPromise=this.queue(async()=>{if(!this._deleted&&(this.persistenceManager=await es.create(this,e),this._resolvePersistenceManagerAvailable?.(),!this._deleted)){if(this._popupRedirectResolver?._shouldInitProactively)try{await this._popupRedirectResolver._initialize(this)}catch{}await this.initializeCurrentUser(n),this.lastNotifiedUid=this.currentUser?.uid||null,!this._deleted&&(this._isInitialized=!0)}}),this._initializationPromise}async _onStorageEvent(){if(this._deleted)return;const e=await this.assertedPersistence.getCurrentUser();if(!(!this.currentUser&&!e)){if(this.currentUser&&e&&this.currentUser.uid===e.uid){this._currentUser._assign(e),await this.currentUser.getIdToken();return}await this._updateCurrentUser(e,!0)}}async initializeCurrentUserFromIdToken(e){try{const n=await Vi(this,{idToken:e}),s=await Qe._fromGetAccountInfoResponse(this,n,e);await this.directlySetCurrentUser(s)}catch(n){console.warn("FirebaseServerApp could not login user with provided authIdToken: ",n),await this.directlySetCurrentUser(null)}}async initializeCurrentUser(e){if(Ge(this.app)){const i=this.app.settings.authIdToken;return i?new Promise(o=>{setTimeout(()=>this.initializeCurrentUserFromIdToken(i).then(o,o))}):this.directlySetCurrentUser(null)}const n=await this.assertedPersistence.getCurrentUser();let s=n,r=!1;if(e&&this.config.authDomain){await this.getOrInitRedirectPersistenceManager();const i=this.redirectUser?._redirectEventId,o=s?._redirectEventId,a=await this.tryRedirectSignIn(e);(!i||i===o)&&a?.user&&(s=a.user,r=!0)}if(!s)return this.directlySetCurrentUser(null);if(!s._redirectEventId){if(r)try{await this.beforeStateQueue.runMiddleware(s)}catch(i){s=n,this._popupRedirectResolver._overrideRedirectResult(this,()=>Promise.reject(i))}return s?this.reloadAndSetCurrentUserOrClear(s):this.directlySetCurrentUser(null)}return C(this._popupRedirectResolver,this,"argument-error"),await this.getOrInitRedirectPersistenceManager(),this.redirectUser&&this.redirectUser._redirectEventId===s._redirectEventId?this.directlySetCurrentUser(s):this.reloadAndSetCurrentUserOrClear(s)}async tryRedirectSignIn(e){let n=null;try{n=await this._popupRedirectResolver._completeRedirectFn(this,e,!0)}catch{await this._setRedirectUser(null)}return n}async reloadAndSetCurrentUserOrClear(e){try{await ji(e)}catch(n){if(n?.code!=="auth/network-request-failed")return this.directlySetCurrentUser(null)}return this.directlySetCurrentUser(e)}useDeviceLanguage(){this.languageCode=oR()}async _delete(){this._deleted=!0}async updateCurrentUser(e){if(Ge(this.app))return Promise.reject(Cn(this));const n=e?ge(e):null;return n&&C(n.auth.config.apiKey===this.config.apiKey,this,"invalid-user-token"),this._updateCurrentUser(n&&n._clone(this))}async _updateCurrentUser(e,n=!1){if(!this._deleted)return e&&C(this.tenantId===e.tenantId,this,"tenant-id-mismatch"),n||await this.beforeStateQueue.runMiddleware(e),this.queue(async()=>{await this.directlySetCurrentUser(e),this.notifyAuthListeners()})}async signOut(){return Ge(this.app)?Promise.reject(Cn(this)):(await this.beforeStateQueue.runMiddleware(null),(this.redirectPersistenceManager||this._popupRedirectResolver)&&await this._setRedirectUser(null),this._updateCurrentUser(null,!0))}setPersistence(e){return Ge(this.app)?Promise.reject(Cn(this)):this.queue(async()=>{await this.assertedPersistence.setPersistence(yt(e))})}_getRecaptchaConfig(){return this.tenantId==null?this._agentRecaptchaConfig:this._tenantRecaptchaConfigs[this.tenantId]}async validatePassword(e){this._getPasswordPolicyInternal()||await this._updatePasswordPolicy();const n=this._getPasswordPolicyInternal();return n.schemaVersion!==this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION?Promise.reject(this._errorFactory.create("unsupported-password-policy-schema-version",{})):n.validatePassword(e)}_getPasswordPolicyInternal(){return this.tenantId===null?this._projectPasswordPolicy:this._tenantPasswordPolicies[this.tenantId]}async _updatePasswordPolicy(){const e=await CR(this),n=new TR(e);this.tenantId===null?this._projectPasswordPolicy=n:this._tenantPasswordPolicies[this.tenantId]=n}_getPersistenceType(){return this.assertedPersistence.persistence.type}_getPersistence(){return this.assertedPersistence.persistence}_updateErrorMap(e){this._errorFactory=new As("auth","Firebase",e())}onAuthStateChanged(e,n,s){return this.registerStateListener(this.authStateSubscription,e,n,s)}beforeAuthStateChanged(e,n){return this.beforeStateQueue.pushCallback(e,n)}onIdTokenChanged(e,n,s){return this.registerStateListener(this.idTokenSubscription,e,n,s)}authStateReady(){return new Promise((e,n)=>{if(this.currentUser)e();else{const s=this.onAuthStateChanged(()=>{s(),e()},n)}})}async revokeAccessToken(e){if(this.currentUser){const n=await this.currentUser.getIdToken(),s={providerId:"apple.com",tokenType:"ACCESS_TOKEN",token:e,idToken:n};this.tenantId!=null&&(s.tenantId=this.tenantId),await vR(this,s)}}toJSON(){return{apiKey:this.config.apiKey,authDomain:this.config.authDomain,appName:this.name,currentUser:this._currentUser?.toJSON()}}async _setRedirectUser(e,n){const s=await this.getOrInitRedirectPersistenceManager(n);return e===null?s.removeCurrentUser():s.setCurrentUser(e)}async getOrInitRedirectPersistenceManager(e){if(!this.redirectPersistenceManager){const n=e&&yt(e)||this._popupRedirectResolver;C(n,this,"argument-error"),this.redirectPersistenceManager=await es.create(this,[yt(n._redirectPersistence)],"redirectUser"),this.redirectUser=await this.redirectPersistenceManager.getCurrentUser()}return this.redirectPersistenceManager}async _redirectUserForId(e){return this._isInitialized&&await this.queue(async()=>{}),this._currentUser?._redirectEventId===e?this._currentUser:this.redirectUser?._redirectEventId===e?this.redirectUser:null}async _persistUserIfCurrent(e){if(e===this.currentUser)return this.queue(async()=>this.directlySetCurrentUser(e))}_notifyListenersIfCurrent(e){e===this.currentUser&&this.notifyAuthListeners()}_key(){return`${this.config.authDomain}:${this.config.apiKey}:${this.name}`}_startProactiveRefresh(){this.isProactiveRefreshEnabled=!0,this.currentUser&&this._currentUser._startProactiveRefresh()}_stopProactiveRefresh(){this.isProactiveRefreshEnabled=!1,this.currentUser&&this._currentUser._stopProactiveRefresh()}get _currentUser(){return this.currentUser}notifyAuthListeners(){if(!this._isInitialized)return;this.idTokenSubscription.next(this.currentUser);const e=this.currentUser?.uid??null;this.lastNotifiedUid!==e&&(this.lastNotifiedUid=e,this.authStateSubscription.next(this.currentUser))}registerStateListener(e,n,s,r){if(this._deleted)return()=>{};const i=typeof n=="function"?n:n.next.bind(n);let o=!1;const a=this._isInitialized?Promise.resolve():this._initializationPromise;if(C(a,this,"internal-error"),a.then(()=>{o||i(this.currentUser)}),typeof n=="function"){const c=e.addObserver(n,s,r);return()=>{o=!0,c()}}else{const c=e.addObserver(n);return()=>{o=!0,c()}}}async directlySetCurrentUser(e){this.currentUser&&this.currentUser!==e&&this._currentUser._stopProactiveRefresh(),e&&this.isProactiveRefreshEnabled&&e._startProactiveRefresh(),this.currentUser=e,e?await this.assertedPersistence.setCurrentUser(e):await this.assertedPersistence.removeCurrentUser()}queue(e){return this.operations=this.operations.then(e,e),this.operations}get assertedPersistence(){return C(this.persistenceManager,this,"internal-error"),this.persistenceManager}_logFramework(e){!e||this.frameworks.includes(e)||(this.frameworks.push(e),this.frameworks.sort(),this.clientVersion=nm(this.config.clientPlatform,this._getFrameworks()))}_getFrameworks(){return this.frameworks}async _getAdditionalHeaders(){const e={"X-Client-Version":this.clientVersion};this.app.options.appId&&(e["X-Firebase-gmpid"]=this.app.options.appId);const n=await this.heartbeatServiceProvider.getImmediate({optional:!0})?.getHeartbeatsHeader();n&&(e["X-Firebase-Client"]=n);const s=await this._getAppCheckToken();return s&&(e["X-Firebase-AppCheck"]=s),e}async _getAppCheckToken(){if(Ge(this.app)&&this.app.settings.appCheckToken)return this.app.settings.appCheckToken;const e=await this.appCheckServiceProvider.getImmediate({optional:!0})?.getToken();return e?.error&&nR(`Error while retrieving App Check token: ${e.error}`),e?.token}}function Fs(t){return ge(t)}class ph{constructor(e){this.auth=e,this.observer=null,this.addObserver=$b(n=>this.observer=n)}get next(){return C(this.observer,this.auth,"internal-error"),this.observer.next.bind(this.observer)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Bl={async loadJS(){throw new Error("Unable to load external scripts")},recaptchaV2Script:"",recaptchaEnterpriseScript:"",gapiScript:""};function kR(t){Bl=t}function RR(t){return Bl.loadJS(t)}function AR(){return Bl.gapiScript}function NR(t){return`__${t}${Math.floor(Math.random()*1e6)}`}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function PR(t,e){const n=Dr(t,"auth");if(n.isInitialized()){const r=n.getImmediate(),i=n.getOptions();if(Rn(i,e??{}))return r;ht(r,"already-initialized")}return n.initialize({options:e})}function LR(t,e){const n=e?.persistence||[],s=(Array.isArray(n)?n:[n]).map(yt);e?.errorMap&&t._updateErrorMap(e.errorMap),t._initializeWithPersistence(s,e?.popupRedirectResolver)}function OR(t,e,n){const s=Fs(t);C(/^https?:\/\//.test(e),s,"invalid-emulator-scheme");const r=!1,i=sm(e),{host:o,port:a}=DR(e),c=a===null?"":`:${a}`,l={url:`${i}//${o}${c}/`},u=Object.freeze({host:o,port:a,protocol:i.replace(":",""),options:Object.freeze({disableWarnings:r})});if(!s._canInitEmulator){C(s.config.emulator&&s.emulatorConfig,s,"emulator-config-failed"),C(Rn(l,s.config.emulator)&&Rn(u,s.emulatorConfig),s,"emulator-config-failed");return}s.config.emulator=l,s.emulatorConfig=u,s.settings.appVerificationDisabledForTesting=!0,Rs(o)?(Kf(`${i}//${o}${c}`),Jf("Auth",!0)):xR()}function sm(t){const e=t.indexOf(":");return e<0?"":t.substr(0,e+1)}function DR(t){const e=sm(t),n=/(\/\/)?([^?#/]+)/.exec(t.substr(e.length));if(!n)return{host:"",port:null};const s=n[2].split("@").pop()||"",r=/^(\[[^\]]+\])(:|$)/.exec(s);if(r){const i=r[1];return{host:i,port:gh(s.substr(i.length+1))}}else{const[i,o]=s.split(":");return{host:i,port:gh(o)}}}function gh(t){if(!t)return null;const e=Number(t);return isNaN(e)?null:e}function xR(){function t(){const e=document.createElement("p"),n=e.style;e.innerText="Running in emulator mode. Do not use with production credentials.",n.position="fixed",n.width="100%",n.backgroundColor="#ffffff",n.border=".1em solid #000000",n.color="#b50000",n.bottom="0px",n.left="0px",n.margin="0px",n.zIndex="10000",n.textAlign="center",e.classList.add("firebase-emulator-warning"),document.body.appendChild(e)}typeof console<"u"&&typeof console.info=="function"&&console.info("WARNING: You are using the Auth Emulator, which is intended for local testing only.  Do not use with production credentials."),typeof window<"u"&&typeof document<"u"&&(document.readyState==="loading"?window.addEventListener("DOMContentLoaded",t):t())}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class rm{constructor(e,n){this.providerId=e,this.signInMethod=n}toJSON(){return _t("not implemented")}_getIdTokenResponse(e){return _t("not implemented")}_linkToIdToken(e,n){return _t("not implemented")}_getReauthenticationResolver(e){return _t("not implemented")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function ts(t,e){return uR(t,"POST","/v1/accounts:signInWithIdp",Fl(t,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const MR="http://localhost";class Dn extends rm{constructor(){super(...arguments),this.pendingToken=null}static _fromParams(e){const n=new Dn(e.providerId,e.signInMethod);return e.idToken||e.accessToken?(e.idToken&&(n.idToken=e.idToken),e.accessToken&&(n.accessToken=e.accessToken),e.nonce&&!e.pendingToken&&(n.nonce=e.nonce),e.pendingToken&&(n.pendingToken=e.pendingToken)):e.oauthToken&&e.oauthTokenSecret?(n.accessToken=e.oauthToken,n.secret=e.oauthTokenSecret):ht("argument-error"),n}toJSON(){return{idToken:this.idToken,accessToken:this.accessToken,secret:this.secret,nonce:this.nonce,pendingToken:this.pendingToken,providerId:this.providerId,signInMethod:this.signInMethod}}static fromJSON(e){const n=typeof e=="string"?JSON.parse(e):e,{providerId:s,signInMethod:r,...i}=n;if(!s||!r)return null;const o=new Dn(s,r);return o.idToken=i.idToken||void 0,o.accessToken=i.accessToken||void 0,o.secret=i.secret,o.nonce=i.nonce,o.pendingToken=i.pendingToken||null,o}_getIdTokenResponse(e){const n=this.buildRequest();return ts(e,n)}_linkToIdToken(e,n){const s=this.buildRequest();return s.idToken=n,ts(e,s)}_getReauthenticationResolver(e){const n=this.buildRequest();return n.autoCreate=!1,ts(e,n)}buildRequest(){const e={requestUri:MR,returnSecureToken:!0};if(this.pendingToken)e.pendingToken=this.pendingToken;else{const n={};this.idToken&&(n.id_token=this.idToken),this.accessToken&&(n.access_token=this.accessToken),this.secret&&(n.oauth_token_secret=this.secret),n.providerId=this.providerId,this.nonce&&!this.pendingToken&&(n.nonce=this.nonce),e.postBody=Ns(n)}return e}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Hl{constructor(e){this.providerId=e,this.defaultLanguageCode=null,this.customParameters={}}setDefaultLanguage(e){this.defaultLanguageCode=e}setCustomParameters(e){return this.customParameters=e,this}getCustomParameters(){return this.customParameters}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Vr extends Hl{constructor(){super(...arguments),this.scopes=[]}addScope(e){return this.scopes.includes(e)||this.scopes.push(e),this}getScopes(){return[...this.scopes]}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class xt extends Vr{constructor(){super("facebook.com")}static credential(e){return Dn._fromParams({providerId:xt.PROVIDER_ID,signInMethod:xt.FACEBOOK_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return xt.credentialFromTaggedObject(e)}static credentialFromError(e){return xt.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return xt.credential(e.oauthAccessToken)}catch{return null}}}xt.FACEBOOK_SIGN_IN_METHOD="facebook.com";xt.PROVIDER_ID="facebook.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ke extends Vr{constructor(){super("google.com"),this.addScope("profile")}static credential(e,n){return Dn._fromParams({providerId:Ke.PROVIDER_ID,signInMethod:Ke.GOOGLE_SIGN_IN_METHOD,idToken:e,accessToken:n})}static credentialFromResult(e){return Ke.credentialFromTaggedObject(e)}static credentialFromError(e){return Ke.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthIdToken:n,oauthAccessToken:s}=e;if(!n&&!s)return null;try{return Ke.credential(n,s)}catch{return null}}}Ke.GOOGLE_SIGN_IN_METHOD="google.com";Ke.PROVIDER_ID="google.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Mt extends Vr{constructor(){super("github.com")}static credential(e){return Dn._fromParams({providerId:Mt.PROVIDER_ID,signInMethod:Mt.GITHUB_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return Mt.credentialFromTaggedObject(e)}static credentialFromError(e){return Mt.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return Mt.credential(e.oauthAccessToken)}catch{return null}}}Mt.GITHUB_SIGN_IN_METHOD="github.com";Mt.PROVIDER_ID="github.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ft extends Vr{constructor(){super("twitter.com")}static credential(e,n){return Dn._fromParams({providerId:Ft.PROVIDER_ID,signInMethod:Ft.TWITTER_SIGN_IN_METHOD,oauthToken:e,oauthTokenSecret:n})}static credentialFromResult(e){return Ft.credentialFromTaggedObject(e)}static credentialFromError(e){return Ft.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthAccessToken:n,oauthTokenSecret:s}=e;if(!n||!s)return null;try{return Ft.credential(n,s)}catch{return null}}}Ft.TWITTER_SIGN_IN_METHOD="twitter.com";Ft.PROVIDER_ID="twitter.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Es{constructor(e){this.user=e.user,this.providerId=e.providerId,this._tokenResponse=e._tokenResponse,this.operationType=e.operationType}static async _fromIdTokenResponse(e,n,s,r=!1){const i=await Qe._fromIdTokenResponse(e,s,r),o=mh(s);return new Es({user:i,providerId:o,_tokenResponse:s,operationType:n})}static async _forOperation(e,n,s){await e._updateTokensIfNecessary(s,!0);const r=mh(s);return new Es({user:e,providerId:r,_tokenResponse:s,operationType:n})}}function mh(t){return t.providerId?t.providerId:"phoneNumber"in t?"phone":null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class qi extends an{constructor(e,n,s,r){super(n.code,n.message),this.operationType=s,this.user=r,Object.setPrototypeOf(this,qi.prototype),this.customData={appName:e.name,tenantId:e.tenantId??void 0,_serverResponse:n.customData._serverResponse,operationType:s}}static _fromErrorAndOperation(e,n,s,r){return new qi(e,n,s,r)}}function im(t,e,n,s){return(e==="reauthenticate"?n._getReauthenticationResolver(t):n._getIdTokenResponse(t)).catch(i=>{throw i.code==="auth/multi-factor-auth-required"?qi._fromErrorAndOperation(t,i,e,s):i})}async function FR(t,e,n=!1){const s=await br(t,e._linkToIdToken(t.auth,await t.getIdToken()),n);return Es._forOperation(t,"link",s)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function UR(t,e,n=!1){const{auth:s}=t;if(Ge(s.app))return Promise.reject(Cn(s));const r="reauthenticate";try{const i=await br(t,im(s,r,e,t),n);C(i.idToken,s,"internal-error");const o=Ul(i.idToken);C(o,s,"internal-error");const{sub:a}=o;return C(t.uid===a,s,"user-mismatch"),Es._forOperation(t,r,i)}catch(i){throw i?.code==="auth/user-not-found"&&ht(s,"user-mismatch"),i}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function om(t,e,n=!1){if(Ge(t.app))return Promise.reject(Cn(t));const s="signIn",r=await im(t,s,e),i=await Es._fromIdTokenResponse(t,s,r);return n||await t._updateCurrentUser(i.user),i}async function $R(t,e){return om(Fs(t),e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function fa(t,e){return ge(t).setPersistence(e)}function BR(t,e,n,s){return ge(t).onIdTokenChanged(e,n,s)}function HR(t,e,n){return ge(t).beforeAuthStateChanged(e,n)}function am(t,e,n,s){return ge(t).onAuthStateChanged(e,n,s)}function WR(t){return ge(t).signOut()}const zi="__sak";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class cm{constructor(e,n){this.storageRetriever=e,this.type=n}_isAvailable(){try{return this.storage?(this.storage.setItem(zi,"1"),this.storage.removeItem(zi),Promise.resolve(!0)):Promise.resolve(!1)}catch{return Promise.resolve(!1)}}_set(e,n){return this.storage.setItem(e,JSON.stringify(n)),Promise.resolve()}_get(e){const n=this.storage.getItem(e);return Promise.resolve(n?JSON.parse(n):null)}_remove(e){return this.storage.removeItem(e),Promise.resolve()}get storage(){return this.storageRetriever()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const VR=1e3,jR=10;class lm extends cm{constructor(){super(()=>window.localStorage,"LOCAL"),this.boundEventHandler=(e,n)=>this.onStorageEvent(e,n),this.listeners={},this.localCache={},this.pollTimer=null,this.fallbackToPolling=tm(),this._shouldAllowMigration=!0}forAllChangedKeys(e){for(const n of Object.keys(this.listeners)){const s=this.storage.getItem(n),r=this.localCache[n];s!==r&&e(n,r,s)}}onStorageEvent(e,n=!1){if(!e.key){this.forAllChangedKeys((o,a,c)=>{this.notifyListeners(o,c)});return}const s=e.key;n?this.detachListener():this.stopPolling();const r=()=>{const o=this.storage.getItem(s);!n&&this.localCache[s]===o||this.notifyListeners(s,o)},i=this.storage.getItem(s);ER()&&i!==e.newValue&&e.newValue!==e.oldValue?setTimeout(r,jR):r()}notifyListeners(e,n){this.localCache[e]=n;const s=this.listeners[e];if(s)for(const r of Array.from(s))r(n&&JSON.parse(n))}startPolling(){this.stopPolling(),this.pollTimer=setInterval(()=>{this.forAllChangedKeys((e,n,s)=>{this.onStorageEvent(new StorageEvent("storage",{key:e,oldValue:n,newValue:s}),!0)})},VR)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}attachListener(){window.addEventListener("storage",this.boundEventHandler)}detachListener(){window.removeEventListener("storage",this.boundEventHandler)}_addListener(e,n){Object.keys(this.listeners).length===0&&(this.fallbackToPolling?this.startPolling():this.attachListener()),this.listeners[e]||(this.listeners[e]=new Set,this.localCache[e]=this.storage.getItem(e)),this.listeners[e].add(n)}_removeListener(e,n){this.listeners[e]&&(this.listeners[e].delete(n),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&(this.detachListener(),this.stopPolling())}async _set(e,n){await super._set(e,n),this.localCache[e]=JSON.stringify(n)}async _get(e){const n=await super._get(e);return this.localCache[e]=JSON.stringify(n),n}async _remove(e){await super._remove(e),delete this.localCache[e]}}lm.type="LOCAL";const um=lm;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class dm extends cm{constructor(){super(()=>window.sessionStorage,"SESSION")}_addListener(e,n){}_removeListener(e,n){}}dm.type="SESSION";const hm=dm;/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function qR(t){return Promise.all(t.map(async e=>{try{return{fulfilled:!0,value:await e}}catch(n){return{fulfilled:!1,reason:n}}}))}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Oo{constructor(e){this.eventTarget=e,this.handlersMap={},this.boundEventHandler=this.handleEvent.bind(this)}static _getInstance(e){const n=this.receivers.find(r=>r.isListeningto(e));if(n)return n;const s=new Oo(e);return this.receivers.push(s),s}isListeningto(e){return this.eventTarget===e}async handleEvent(e){const n=e,{eventId:s,eventType:r,data:i}=n.data,o=this.handlersMap[r];if(!o?.size)return;n.ports[0].postMessage({status:"ack",eventId:s,eventType:r});const a=Array.from(o).map(async l=>l(n.origin,i)),c=await qR(a);n.ports[0].postMessage({status:"done",eventId:s,eventType:r,response:c})}_subscribe(e,n){Object.keys(this.handlersMap).length===0&&this.eventTarget.addEventListener("message",this.boundEventHandler),this.handlersMap[e]||(this.handlersMap[e]=new Set),this.handlersMap[e].add(n)}_unsubscribe(e,n){this.handlersMap[e]&&n&&this.handlersMap[e].delete(n),(!n||this.handlersMap[e].size===0)&&delete this.handlersMap[e],Object.keys(this.handlersMap).length===0&&this.eventTarget.removeEventListener("message",this.boundEventHandler)}}Oo.receivers=[];/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Wl(t="",e=10){let n="";for(let s=0;s<e;s++)n+=Math.floor(Math.random()*10);return t+n}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class zR{constructor(e){this.target=e,this.handlers=new Set}removeMessageHandler(e){e.messageChannel&&(e.messageChannel.port1.removeEventListener("message",e.onMessage),e.messageChannel.port1.close()),this.handlers.delete(e)}async _send(e,n,s=50){const r=typeof MessageChannel<"u"?new MessageChannel:null;if(!r)throw new Error("connection_unavailable");let i,o;return new Promise((a,c)=>{const l=Wl("",20);r.port1.start();const u=setTimeout(()=>{c(new Error("unsupported_event"))},s);o={messageChannel:r,onMessage(d){const h=d;if(h.data.eventId===l)switch(h.data.status){case"ack":clearTimeout(u),i=setTimeout(()=>{c(new Error("timeout"))},3e3);break;case"done":clearTimeout(i),a(h.data.response);break;default:clearTimeout(u),clearTimeout(i),c(new Error("invalid_response"));break}}},this.handlers.add(o),r.port1.addEventListener("message",o.onMessage),this.target.postMessage({eventType:e,eventId:l,data:n},[r.port2])}).finally(()=>{o&&this.removeMessageHandler(o)})}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function dt(){return window}function GR(t){dt().location.href=t}/**
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
 */function fm(){return typeof dt().WorkerGlobalScope<"u"&&typeof dt().importScripts=="function"}async function YR(){if(!navigator?.serviceWorker)return null;try{return(await navigator.serviceWorker.ready).active}catch{return null}}function KR(){return navigator?.serviceWorker?.controller||null}function JR(){return fm()?self:null}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const pm="firebaseLocalStorageDb",XR=1,Gi="firebaseLocalStorage",gm="fbase_key";class jr{constructor(e){this.request=e}toPromise(){return new Promise((e,n)=>{this.request.addEventListener("success",()=>{e(this.request.result)}),this.request.addEventListener("error",()=>{n(this.request.error)})})}}function Do(t,e){return t.transaction([Gi],e?"readwrite":"readonly").objectStore(Gi)}function QR(){const t=indexedDB.deleteDatabase(pm);return new jr(t).toPromise()}function dc(){const t=indexedDB.open(pm,XR);return new Promise((e,n)=>{t.addEventListener("error",()=>{n(t.error)}),t.addEventListener("upgradeneeded",()=>{const s=t.result;try{s.createObjectStore(Gi,{keyPath:gm})}catch(r){n(r)}}),t.addEventListener("success",async()=>{const s=t.result;s.objectStoreNames.contains(Gi)?e(s):(s.close(),await QR(),e(await dc()))})})}async function _h(t,e,n){const s=Do(t,!0).put({[gm]:e,value:n});return new jr(s).toPromise()}async function ZR(t,e){const n=Do(t,!1).get(e),s=await new jr(n).toPromise();return s===void 0?null:s.value}function yh(t,e){const n=Do(t,!0).delete(e);return new jr(n).toPromise()}const eA=800,tA=3;class mm{constructor(){this.type="LOCAL",this._shouldAllowMigration=!0,this.listeners={},this.localCache={},this.pollTimer=null,this.pendingWrites=0,this.receiver=null,this.sender=null,this.serviceWorkerReceiverAvailable=!1,this.activeServiceWorker=null,this._workerInitializationPromise=this.initializeServiceWorkerMessaging().then(()=>{},()=>{})}async _openDb(){return this.db?this.db:(this.db=await dc(),this.db)}async _withRetries(e){let n=0;for(;;)try{const s=await this._openDb();return await e(s)}catch(s){if(n++>tA)throw s;this.db&&(this.db.close(),this.db=void 0)}}async initializeServiceWorkerMessaging(){return fm()?this.initializeReceiver():this.initializeSender()}async initializeReceiver(){this.receiver=Oo._getInstance(JR()),this.receiver._subscribe("keyChanged",async(e,n)=>({keyProcessed:(await this._poll()).includes(n.key)})),this.receiver._subscribe("ping",async(e,n)=>["keyChanged"])}async initializeSender(){if(this.activeServiceWorker=await YR(),!this.activeServiceWorker)return;this.sender=new zR(this.activeServiceWorker);const e=await this.sender._send("ping",{},800);e&&e[0]?.fulfilled&&e[0]?.value.includes("keyChanged")&&(this.serviceWorkerReceiverAvailable=!0)}async notifyServiceWorker(e){if(!(!this.sender||!this.activeServiceWorker||KR()!==this.activeServiceWorker))try{await this.sender._send("keyChanged",{key:e},this.serviceWorkerReceiverAvailable?800:50)}catch{}}async _isAvailable(){try{if(!indexedDB)return!1;const e=await dc();return await _h(e,zi,"1"),await yh(e,zi),!0}catch{}return!1}async _withPendingWrite(e){this.pendingWrites++;try{await e()}finally{this.pendingWrites--}}async _set(e,n){return this._withPendingWrite(async()=>(await this._withRetries(s=>_h(s,e,n)),this.localCache[e]=n,this.notifyServiceWorker(e)))}async _get(e){const n=await this._withRetries(s=>ZR(s,e));return this.localCache[e]=n,n}async _remove(e){return this._withPendingWrite(async()=>(await this._withRetries(n=>yh(n,e)),delete this.localCache[e],this.notifyServiceWorker(e)))}async _poll(){const e=await this._withRetries(r=>{const i=Do(r,!1).getAll();return new jr(i).toPromise()});if(!e)return[];if(this.pendingWrites!==0)return[];const n=[],s=new Set;if(e.length!==0)for(const{fbase_key:r,value:i}of e)s.add(r),JSON.stringify(this.localCache[r])!==JSON.stringify(i)&&(this.notifyListeners(r,i),n.push(r));for(const r of Object.keys(this.localCache))this.localCache[r]&&!s.has(r)&&(this.notifyListeners(r,null),n.push(r));return n}notifyListeners(e,n){this.localCache[e]=n;const s=this.listeners[e];if(s)for(const r of Array.from(s))r(n)}startPolling(){this.stopPolling(),this.pollTimer=setInterval(async()=>this._poll(),eA)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}_addListener(e,n){Object.keys(this.listeners).length===0&&this.startPolling(),this.listeners[e]||(this.listeners[e]=new Set,this._get(e)),this.listeners[e].add(n)}_removeListener(e,n){this.listeners[e]&&(this.listeners[e].delete(n),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&this.stopPolling()}}mm.type="LOCAL";const _m=mm;new Wr(3e4,6e4);/**
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
 */function ym(t,e){return e?yt(e):(C(t._popupRedirectResolver,t,"argument-error"),t._popupRedirectResolver)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Vl extends rm{constructor(e){super("custom","custom"),this.params=e}_getIdTokenResponse(e){return ts(e,this._buildIdpRequest())}_linkToIdToken(e,n){return ts(e,this._buildIdpRequest(n))}_getReauthenticationResolver(e){return ts(e,this._buildIdpRequest())}_buildIdpRequest(e){const n={requestUri:this.params.requestUri,sessionId:this.params.sessionId,postBody:this.params.postBody,tenantId:this.params.tenantId,pendingToken:this.params.pendingToken,returnSecureToken:!0,returnIdpCredential:!0};return e&&(n.idToken=e),n}}function nA(t){return om(t.auth,new Vl(t),t.bypassAuthState)}function sA(t){const{auth:e,user:n}=t;return C(n,e,"internal-error"),UR(n,new Vl(t),t.bypassAuthState)}async function rA(t){const{auth:e,user:n}=t;return C(n,e,"internal-error"),FR(n,new Vl(t),t.bypassAuthState)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class vm{constructor(e,n,s,r,i=!1){this.auth=e,this.resolver=s,this.user=r,this.bypassAuthState=i,this.pendingPromise=null,this.eventManager=null,this.filter=Array.isArray(n)?n:[n]}execute(){return new Promise(async(e,n)=>{this.pendingPromise={resolve:e,reject:n};try{this.eventManager=await this.resolver._initialize(this.auth),await this.onExecution(),this.eventManager.registerConsumer(this)}catch(s){this.reject(s)}})}async onAuthEvent(e){const{urlResponse:n,sessionId:s,postBody:r,tenantId:i,error:o,type:a}=e;if(o){this.reject(o);return}const c={auth:this.auth,requestUri:n,sessionId:s,tenantId:i||void 0,postBody:r||void 0,user:this.user,bypassAuthState:this.bypassAuthState};try{this.resolve(await this.getIdpTask(a)(c))}catch(l){this.reject(l)}}onError(e){this.reject(e)}getIdpTask(e){switch(e){case"signInViaPopup":case"signInViaRedirect":return nA;case"linkViaPopup":case"linkViaRedirect":return rA;case"reauthViaPopup":case"reauthViaRedirect":return sA;default:ht(this.auth,"internal-error")}}resolve(e){Nt(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.resolve(e),this.unregisterAndCleanUp()}reject(e){Nt(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.reject(e),this.unregisterAndCleanUp()}unregisterAndCleanUp(){this.eventManager&&this.eventManager.unregisterConsumer(this),this.pendingPromise=null,this.cleanUp()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const iA=new Wr(2e3,1e4);async function oA(t,e,n){if(Ge(t.app))return Promise.reject(nt(t,"operation-not-supported-in-this-environment"));const s=Fs(t);sR(t,e,Hl);const r=ym(s,n);return new vn(s,"signInViaPopup",e,r).executeNotNull()}class vn extends vm{constructor(e,n,s,r,i){super(e,n,r,i),this.provider=s,this.authWindow=null,this.pollId=null,vn.currentPopupAction&&vn.currentPopupAction.cancel(),vn.currentPopupAction=this}async executeNotNull(){const e=await this.execute();return C(e,this.auth,"internal-error"),e}async onExecution(){Nt(this.filter.length===1,"Popup operations only handle one event");const e=Wl();this.authWindow=await this.resolver._openPopup(this.auth,this.provider,this.filter[0],e),this.authWindow.associatedEvent=e,this.resolver._originValidation(this.auth).catch(n=>{this.reject(n)}),this.resolver._isIframeWebStorageSupported(this.auth,n=>{n||this.reject(nt(this.auth,"web-storage-unsupported"))}),this.pollUserCancellation()}get eventId(){return this.authWindow?.associatedEvent||null}cancel(){this.reject(nt(this.auth,"cancelled-popup-request"))}cleanUp(){this.authWindow&&this.authWindow.close(),this.pollId&&window.clearTimeout(this.pollId),this.authWindow=null,this.pollId=null,vn.currentPopupAction=null}pollUserCancellation(){const e=()=>{if(this.authWindow?.window?.closed){this.pollId=window.setTimeout(()=>{this.pollId=null,this.reject(nt(this.auth,"popup-closed-by-user"))},8e3);return}this.pollId=window.setTimeout(e,iA.get())};e()}}vn.currentPopupAction=null;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const aA="pendingRedirect",pi=new Map;class cA extends vm{constructor(e,n,s=!1){super(e,["signInViaRedirect","linkViaRedirect","reauthViaRedirect","unknown"],n,void 0,s),this.eventId=null}async execute(){let e=pi.get(this.auth._key());if(!e){try{const s=await lA(this.resolver,this.auth)?await super.execute():null;e=()=>Promise.resolve(s)}catch(n){e=()=>Promise.reject(n)}pi.set(this.auth._key(),e)}return this.bypassAuthState||pi.set(this.auth._key(),()=>Promise.resolve(null)),e()}async onAuthEvent(e){if(e.type==="signInViaRedirect")return super.onAuthEvent(e);if(e.type==="unknown"){this.resolve(null);return}if(e.eventId){const n=await this.auth._redirectUserForId(e.eventId);if(n)return this.user=n,super.onAuthEvent(e);this.resolve(null)}}async onExecution(){}cleanUp(){}}async function lA(t,e){const n=hA(e),s=dA(t);if(!await s._isAvailable())return!1;const r=await s._get(n)==="true";return await s._remove(n),r}function uA(t,e){pi.set(t._key(),e)}function dA(t){return yt(t._redirectPersistence)}function hA(t){return fi(aA,t.config.apiKey,t.name)}async function fA(t,e){return await Fs(t)._initializationPromise,wm(t,e,!1)}async function wm(t,e,n=!1){if(Ge(t.app))return Promise.reject(Cn(t));const s=Fs(t),r=ym(s,e),o=await new cA(s,r,n).execute();return o&&!n&&(delete o.user._redirectEventId,await s._persistUserIfCurrent(o.user),await s._setRedirectUser(null,e)),o}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const pA=600*1e3;class gA{constructor(e){this.auth=e,this.cachedEventUids=new Set,this.consumers=new Set,this.queuedRedirectEvent=null,this.hasHandledPotentialRedirect=!1,this.lastProcessedEventTime=Date.now()}registerConsumer(e){this.consumers.add(e),this.queuedRedirectEvent&&this.isEventForConsumer(this.queuedRedirectEvent,e)&&(this.sendToConsumer(this.queuedRedirectEvent,e),this.saveEventToCache(this.queuedRedirectEvent),this.queuedRedirectEvent=null)}unregisterConsumer(e){this.consumers.delete(e)}onEvent(e){if(this.hasEventBeenHandled(e))return!1;let n=!1;return this.consumers.forEach(s=>{this.isEventForConsumer(e,s)&&(n=!0,this.sendToConsumer(e,s),this.saveEventToCache(e))}),this.hasHandledPotentialRedirect||!mA(e)||(this.hasHandledPotentialRedirect=!0,n||(this.queuedRedirectEvent=e,n=!0)),n}sendToConsumer(e,n){if(e.error&&!Em(e)){const s=e.error.code?.split("auth/")[1]||"internal-error";n.onError(nt(this.auth,s))}else n.onAuthEvent(e)}isEventForConsumer(e,n){const s=n.eventId===null||!!e.eventId&&e.eventId===n.eventId;return n.filter.includes(e.type)&&s}hasEventBeenHandled(e){return Date.now()-this.lastProcessedEventTime>=pA&&this.cachedEventUids.clear(),this.cachedEventUids.has(vh(e))}saveEventToCache(e){this.cachedEventUids.add(vh(e)),this.lastProcessedEventTime=Date.now()}}function vh(t){return[t.type,t.eventId,t.sessionId,t.tenantId].filter(e=>e).join("-")}function Em({type:t,error:e}){return t==="unknown"&&e?.code==="auth/no-auth-event"}function mA(t){switch(t.type){case"signInViaRedirect":case"linkViaRedirect":case"reauthViaRedirect":return!0;case"unknown":return Em(t);default:return!1}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function _A(t,e={}){return Ms(t,"GET","/v1/projects",e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const yA=/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/,vA=/^https?/;async function wA(t){if(t.config.emulator)return;const{authorizedDomains:e}=await _A(t);for(const n of e)try{if(EA(n))return}catch{}ht(t,"unauthorized-domain")}function EA(t){const e=cc(),{protocol:n,hostname:s}=new URL(e);if(t.startsWith("chrome-extension://")){const o=new URL(t);return o.hostname===""&&s===""?n==="chrome-extension:"&&t.replace("chrome-extension://","")===e.replace("chrome-extension://",""):n==="chrome-extension:"&&o.hostname===s}if(!vA.test(n))return!1;if(yA.test(t))return s===t;const r=t.replace(/\./g,"\\.");return new RegExp("^(.+\\."+r+"|"+r+")$","i").test(s)}/**
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
 */const bA=new Wr(3e4,6e4);function wh(){const t=dt().___jsl;if(t?.H){for(const e of Object.keys(t.H))if(t.H[e].r=t.H[e].r||[],t.H[e].L=t.H[e].L||[],t.H[e].r=[...t.H[e].L],t.CP)for(let n=0;n<t.CP.length;n++)t.CP[n]=null}}function CA(t){return new Promise((e,n)=>{function s(){wh(),gapi.load("gapi.iframes",{callback:()=>{e(gapi.iframes.getContext())},ontimeout:()=>{wh(),n(nt(t,"network-request-failed"))},timeout:bA.get()})}if(dt().gapi?.iframes?.Iframe)e(gapi.iframes.getContext());else if(dt().gapi?.load)s();else{const r=NR("iframefcb");return dt()[r]=()=>{gapi.load?s():n(nt(t,"network-request-failed"))},RR(`${AR()}?onload=${r}`).catch(i=>n(i))}}).catch(e=>{throw gi=null,e})}let gi=null;function SA(t){return gi=gi||CA(t),gi}/**
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
 */const TA=new Wr(5e3,15e3),IA="__/auth/iframe",kA="emulator/auth/iframe",RA={style:{position:"absolute",top:"-100px",width:"1px",height:"1px"},"aria-hidden":"true",tabindex:"-1"},AA=new Map([["identitytoolkit.googleapis.com","p"],["staging-identitytoolkit.sandbox.googleapis.com","s"],["test-identitytoolkit.sandbox.googleapis.com","t"]]);function NA(t){const e=t.config;C(e.authDomain,t,"auth-domain-config-required");const n=e.emulator?Ml(e,kA):`https://${t.config.authDomain}/${IA}`,s={apiKey:e.apiKey,appName:t.name,v:Ps},r=AA.get(t.config.apiHost);r&&(s.eid=r);const i=t._getFrameworks();return i.length&&(s.fw=i.join(",")),`${n}?${Ns(s).slice(1)}`}async function PA(t){const e=await SA(t),n=dt().gapi;return C(n,t,"internal-error"),e.open({where:document.body,url:NA(t),messageHandlersFilter:n.iframes.CROSS_ORIGIN_IFRAMES_FILTER,attributes:RA,dontclear:!0},s=>new Promise(async(r,i)=>{await s.restyle({setHideOnLeave:!1});const o=nt(t,"network-request-failed"),a=dt().setTimeout(()=>{i(o)},TA.get());function c(){dt().clearTimeout(a),r(s)}s.ping(c).then(c,()=>{i(o)})}))}/**
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
 */const LA={location:"yes",resizable:"yes",statusbar:"yes",toolbar:"no"},OA=500,DA=600,xA="_blank",MA="http://localhost";class Eh{constructor(e){this.window=e,this.associatedEvent=null}close(){if(this.window)try{this.window.close()}catch{}}}function FA(t,e,n,s=OA,r=DA){const i=Math.max((window.screen.availHeight-r)/2,0).toString(),o=Math.max((window.screen.availWidth-s)/2,0).toString();let a="";const c={...LA,width:s.toString(),height:r.toString(),top:i,left:o},l=ke().toLowerCase();n&&(a=Jg(l)?xA:n),Yg(l)&&(e=e||MA,c.scrollbars="yes");const u=Object.entries(c).reduce((h,[f,p])=>`${h}${f}=${p},`,"");if(wR(l)&&a!=="_self")return UA(e||"",a),new Eh(null);const d=window.open(e||"",a,u);C(d,t,"popup-blocked");try{d.focus()}catch{}return new Eh(d)}function UA(t,e){const n=document.createElement("a");n.href=t,n.target=e;const s=document.createEvent("MouseEvent");s.initMouseEvent("click",!0,!0,window,1,0,0,0,0,!1,!1,!1,!1,1,null),n.dispatchEvent(s)}/**
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
 */const $A="__/auth/handler",BA="emulator/auth/handler",HA=encodeURIComponent("fac");async function bh(t,e,n,s,r,i){C(t.config.authDomain,t,"auth-domain-config-required"),C(t.config.apiKey,t,"invalid-api-key");const o={apiKey:t.config.apiKey,appName:t.name,authType:n,redirectUrl:s,v:Ps,eventId:r};if(e instanceof Hl){e.setDefaultLanguage(t.languageCode),o.providerId=e.providerId||"",Si(e.getCustomParameters())||(o.customParameters=JSON.stringify(e.getCustomParameters()));for(const[u,d]of Object.entries({}))o[u]=d}if(e instanceof Vr){const u=e.getScopes().filter(d=>d!=="");u.length>0&&(o.scopes=u.join(","))}t.tenantId&&(o.tid=t.tenantId);const a=o;for(const u of Object.keys(a))a[u]===void 0&&delete a[u];const c=await t._getAppCheckToken(),l=c?`#${HA}=${encodeURIComponent(c)}`:"";return`${WA(t)}?${Ns(a).slice(1)}${l}`}function WA({config:t}){return t.emulator?Ml(t,BA):`https://${t.authDomain}/${$A}`}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const pa="webStorageSupport";class VA{constructor(){this.eventManagers={},this.iframes={},this.originValidationPromises={},this._redirectPersistence=hm,this._completeRedirectFn=wm,this._overrideRedirectResult=uA}async _openPopup(e,n,s,r){Nt(this.eventManagers[e._key()]?.manager,"_initialize() not called before _openPopup()");const i=await bh(e,n,s,cc(),r);return FA(e,i,Wl())}async _openRedirect(e,n,s,r){await this._originValidation(e);const i=await bh(e,n,s,cc(),r);return GR(i),new Promise(()=>{})}_initialize(e){const n=e._key();if(this.eventManagers[n]){const{manager:r,promise:i}=this.eventManagers[n];return r?Promise.resolve(r):(Nt(i,"If manager is not set, promise should be"),i)}const s=this.initAndGetManager(e);return this.eventManagers[n]={promise:s},s.catch(()=>{delete this.eventManagers[n]}),s}async initAndGetManager(e){const n=await PA(e),s=new gA(e);return n.register("authEvent",r=>(C(r?.authEvent,e,"invalid-auth-event"),{status:s.onEvent(r.authEvent)?"ACK":"ERROR"}),gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER),this.eventManagers[e._key()]={manager:s},this.iframes[e._key()]=n,s}_isIframeWebStorageSupported(e,n){this.iframes[e._key()].send(pa,{type:pa},r=>{const i=r?.[0]?.[pa];i!==void 0&&n(!!i),ht(e,"internal-error")},gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER)}_originValidation(e){const n=e._key();return this.originValidationPromises[n]||(this.originValidationPromises[n]=wA(e)),this.originValidationPromises[n]}get _shouldInitProactively(){return tm()||Kg()||$l()}}const jA=VA;var Ch="@firebase/auth",Sh="1.11.0";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class qA{constructor(e){this.auth=e,this.internalListeners=new Map}getUid(){return this.assertAuthConfigured(),this.auth.currentUser?.uid||null}async getToken(e){return this.assertAuthConfigured(),await this.auth._initializationPromise,this.auth.currentUser?{accessToken:await this.auth.currentUser.getIdToken(e)}:null}addAuthTokenListener(e){if(this.assertAuthConfigured(),this.internalListeners.has(e))return;const n=this.auth.onIdTokenChanged(s=>{e(s?.stsTokenManager.accessToken||null)});this.internalListeners.set(e,n),this.updateProactiveRefresh()}removeAuthTokenListener(e){this.assertAuthConfigured();const n=this.internalListeners.get(e);n&&(this.internalListeners.delete(e),n(),this.updateProactiveRefresh())}assertAuthConfigured(){C(this.auth._initializationPromise,"dependent-sdk-initialized-before-auth")}updateProactiveRefresh(){this.internalListeners.size>0?this.auth._startProactiveRefresh():this.auth._stopProactiveRefresh()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function zA(t){switch(t){case"Node":return"node";case"ReactNative":return"rn";case"Worker":return"webworker";case"Cordova":return"cordova";case"WebExtension":return"web-extension";default:return}}function GA(t){Zt(new kt("auth",(e,{options:n})=>{const s=e.getProvider("app").getImmediate(),r=e.getProvider("heartbeat"),i=e.getProvider("app-check-internal"),{apiKey:o,authDomain:a}=s.options;C(o&&!o.includes(":"),"invalid-api-key",{appName:s.name});const c={apiKey:o,authDomain:a,clientPlatform:t,apiHost:"identitytoolkit.googleapis.com",tokenApiHost:"securetoken.googleapis.com",apiScheme:"https",sdkClientVersion:nm(t)},l=new IR(s,r,i,c);return LR(l,n),l},"PUBLIC").setInstantiationMode("EXPLICIT").setInstanceCreatedCallback((e,n,s)=>{e.getProvider("auth-internal").initialize()})),Zt(new kt("auth-internal",e=>{const n=Fs(e.getProvider("auth").getImmediate());return(s=>new qA(s))(n)},"PRIVATE").setInstantiationMode("EXPLICIT")),Ct(Ch,Sh,zA(t)),Ct(Ch,Sh,"esm2020")}/**
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
 */const YA=300,KA=Yf("authIdTokenMaxAge")||YA;let Th=null;const JA=t=>async e=>{const n=e&&await e.getIdTokenResult(),s=n&&(new Date().getTime()-Date.parse(n.issuedAtTime))/1e3;if(s&&s>KA)return;const r=n?.token;Th!==r&&(Th=r,await fetch(t,{method:r?"POST":"DELETE",headers:r?{Authorization:`Bearer ${r}`}:{}}))};function XA(t=zc()){const e=Dr(t,"auth");if(e.isInitialized())return e.getImmediate();const n=PR(t,{popupRedirectResolver:jA,persistence:[_m,um,hm]}),s=Yf("authTokenSyncURL");if(s&&typeof isSecureContext=="boolean"&&isSecureContext){const i=new URL(s,location.origin);if(location.origin===i.origin){const o=JA(i.toString());HR(n,o,()=>o(n.currentUser)),BR(n,a=>o(a))}}const r=zf("auth");return r&&OR(n,`http://${r}`),n}function QA(){return document.getElementsByTagName("head")?.[0]??document}kR({loadJS(t){return new Promise((e,n)=>{const s=document.createElement("script");s.setAttribute("src",t),s.onload=e,s.onerror=r=>{const i=nt("internal-error");i.customData=r,n(i)},s.type="text/javascript",s.charset="UTF-8",QA().appendChild(s)})},gapiScript:"https://apis.google.com/js/api.js",recaptchaV2Script:"https://www.google.com/recaptcha/api.js",recaptchaEnterpriseScript:"https://www.google.com/recaptcha/enterprise.js?render="});GA("Browser");const N0=()=>!1,ZA=t=>{try{t&&localStorage.setItem("debug:console","1")}catch{}},B=(...t)=>{},eN=(...t)=>{localStorage.getItem("debug:console")},tN="765724787439-21p8n3e2tsfq2qk4oriq7ipp7m4o50ad.apps.googleusercontent.com",rr=new Set;function nN(){const t=console.error;console.error=(...e)=>{const n=e.join(" ");n.includes("FedCM")&&n.includes("AbortError")&&n.includes("signal is aborted without reason")||e.length===1&&typeof e[0]=="string"&&e[0].trim()==="The request has been aborted."||t.apply(console,e)}}function sN(t){return B("[ONE TAP] Callback registered, total callbacks:",rr.size+1),rr.add(t),()=>rr.delete(t)}function zn(t){B("[ONE TAP] Notifying status:",t,"to",rr.size,"callbacks"),rr.forEach(e=>{try{e(t)}catch{}})}function bm(){if(typeof google>"u"||!google.accounts?.id){setTimeout(()=>bm(),100);return}nN(),google.accounts.id.initialize({client_id:tN,callback:rN,auto_select:!1,cancel_on_tap_outside:!0,context:"signin",use_fedcm_for_prompt:!0,itp_support:!0})}function Cm(){if(jl()){zn("not_needed");return}window.google?.accounts?.id&&(zn("prompting"),window.google.accounts.id.prompt(t=>{const e=t.getMomentType();e==="skipped"?zn("skipped"):e==="dismissed"?zn("dismissed"):e==="display"&&zn("displayed")}))}async function rN(t){try{B("[ONE TAP] Received credential, signing in with Firebase..."),zn("signing_in");const e=Ke.credential(t.credential),n=await $R(xe,e);B("[ONE TAP] ✅ Successfully signed in:",n.user.email),Rm(!1)}catch(e){const n=e?.code||"unknown",s=e?.message||String(e);alert(n==="auth/account-exists-with-different-credential"?"An account already exists with the same email but different sign-in credentials.":`One Tap sign-in failed: ${s}`)}}let hc=!1;async function iN(){const t=q();if(!t||hc)return;const e=k(R,`users/${t}/presence`);try{await se(e,{state:"online",lastChanged:bn()}),await wg(e).set({state:"offline",lastSeen:bn(),lastChanged:bn()}),hc=!0,console.log("Presence initialized for user:",t)}catch(n){console.error("Failed to initialize presence:",n)}}async function oN(){const t=q();if(!t)return;const e=k(R,`users/${t}/presence`);try{await se(e,{state:"offline",lastSeen:bn(),lastChanged:bn()}),hc=!1}catch(n){console.error("Failed to set offline:",n)}}function Sm(t){if(!t||typeof t!="string")throw new Error("Invalid email: must be a non-empty string");const e=t.toLowerCase().trim();return btoa(unescape(encodeURIComponent(e))).replace(/\//g,"-")}async function aN(t){if(!t||!t.uid||!t.email)throw new Error("Invalid user: must have uid and email");const e=Sm(t.email),n=k(R,`usersByEmail/${e}`),s={uid:t.uid,displayName:t.displayName||"Anonymous",photoURL:t.photoURL||null,registeredAt:Date.now()};try{await se(n,s),console.log("[USER DISCOVERY] Registered user in directory:",t.email)}catch(r){throw console.error("[USER DISCOVERY] Failed to register user:",r),r}}async function Tm(t){if(!t||typeof t!="string")return null;try{const e=Sm(t),n=k(R,`usersByEmail/${e}`),s=await tt(n);return s.exists()?s.val():null}catch(e){return console.error("[USER DISCOVERY] Failed to find user by email:",e),null}}async function cN(t){if(!Array.isArray(t))throw new Error("Invalid emails: must be an array");const e={},n=t.map(async s=>{const r=await Tm(s);e[s]=r});return await Promise.all(n),e}const xe=XA(Pl),lN=typeof import.meta<"u"&&!0;function Im(t,e,n={}){const s=typeof window<"u"?window.location.origin:"n/a";lN?console.error(`[AUTH] ${t}:`,{code:e?.code||"unknown",message:e?.message||String(e),origin:s,...n}):console.error(`[AUTH] ${t}:`,e,n,{origin:s})}const km=(async()=>{try{await fa(xe,_m)}catch{try{await fa(xe,um)}catch{await fa(xe,uc)}}try{(await fA(xe))?.user&&B("[AUTH] ✅ Sign-in completed (via Safari fallback)")}catch(t){B("[AUTH] No redirect result:",t.code)}setTimeout(()=>{bm(),Cm()},500)})();let Gn=!1;function Rm(t){Gn=t}function uN(){try{const t=document.createElement("a");t.href=window.location.href,t.target="_blank",t.rel="noopener noreferrer external",document.body.appendChild(t),t.click(),document.body.removeChild(t)}catch{}}let qs=null;const dN=()=>Math.random().toString(36).substring(2,15),fc="guestUser",hN=2880*60*1e3;function fN(){try{const t=typeof localStorage<"u"?localStorage.getItem(fc):null;if(!t)return null;const e=JSON.parse(t);if(!e||typeof e!="object"||!e.id)return null;if(e.expiresAt&&Date.now()>e.expiresAt){try{localStorage.removeItem(fc)}catch{}return null}return e}catch{return null}}function pN(t,e=hN){const n=Date.now(),s={id:t,createdAt:n,expiresAt:n+e};try{typeof localStorage<"u"&&localStorage.setItem(fc,JSON.stringify(s))}catch{}return s}function _e(){const t=q();if(t)return t;if(!qs){const e=fN();e&&e.id?qs=e.id:(qs=dN(),pN(qs))}return qs}function xn(){return xe.currentUser}function jl(){return xe.currentUser!==null}function q(){return xe.currentUser?.uid??null}function gN(){return new Promise(t=>{const e=am(xe,n=>{e(),t(n)})})}function ql(t,{truncate:e=7}={}){return am(xe,n=>{const s=!!n,r=n?.displayName||"Guest User",i=typeof r=="string"&&r.length>e?r.slice(0,e)+"...":r;s&&(iN().catch(o=>{console.warn("Failed to initialize presence:",o)}),aN(n).catch(o=>{console.warn("Failed to register user in directory:",o)}));try{t({user:n,isLoggedIn:s,userName:i})}catch{}})}async function Am(){const t=new Ke;t.setCustomParameters({prompt:"select_account"});const e=typeof window<"u"&&window.matchMedia?.("(display-mode: standalone)").matches,n=typeof navigator<"u"&&navigator.standalone===!0,s=e||n,r=/iphone|ipad|ipod/i.test(navigator.userAgent||""),i=s&&r;console.log("[AUTH] PWA detection:",{displayModeStandalone:e,navigatorStandalone:n,isStandalonePWA:s,isIOS:r,isIOSStandalone:i,safariExternalOpenArmed:Gn});try{if(i&&Gn){console.log("[AUTH] Using Safari external fallback"),Gn=!1,uN();return}console.log("[AUTH] Starting popup sign-in flow...");const o=await oA(xe,t),c=Ke.credentialFromResult(o).accessToken,l=o.user;B("Signed in user: ",l.displayName),B("Google Access Token exists:",!!c),Gn=!1}catch(o){const a=o?.code||"unknown",c=o?.message||String(o);if(a==="auth/popup-closed-by-user"||a==="auth/cancelled-popup-request"){console.log("Sign-in cancelled by user");return}if((a==="auth/network-request-failed"||a==="auth/popup-blocked")&&i){console.warn(`[AUTH] ${a} inside iOS standalone PWA. Arming Safari fallback.`),Gn=!0,alert(`Sign-in is blocked in the installed app on iOS.

Tap the Login button again to open in Safari and complete sign-in.`);return}if(a==="auth/popup-blocked"){alert("Pop-up blocked. Please enable pop-ups for this site in your browser settings, or try signing in from a desktop browser.");return}const l=o?.customData?.email;if(Im("Google sign-in",o,{email:l?"<redacted>":void 0}),a==="auth/unauthorized-domain"){const u=typeof window<"u"?window.location.origin:"",d=["This app's host is not whitelisted in Firebase Authentication.","Fix: In Firebase Console, go to Build → Authentication → Settings → Authorized domains and add this origin:",u?`• ${u}`:"• <your dev origin>","","Common dev hosts to add:","• http://localhost (covers any port)","• http://127.0.0.1","• http://[::1] (IPv6 localhost)","• Your LAN IP, e.g. http://192.168.x.y","","Tip: avoid opening index.html directly from the filesystem (file://). Use a dev server instead."];u&&typeof navigator<"u"&&navigator.clipboard?.writeText&&navigator.clipboard.writeText(u).catch(()=>{}),alert(`Sign-in failed: Unauthorized domain.

${d.join(`
`)}`);return}alert(`Sign-in failed: ${c}`)}}async function Nm(){try{await oN(),await WR(xe),console.info("User signed out"),setTimeout(()=>Cm(),1500)}catch(t){throw Im("Sign out",t),t}}const mN="765724787439-21p8n3e2tsfq2qk4oriq7ipp7m4o50ad.apps.googleusercontent.com";function Pm(){return new Promise((t,e)=>{if(typeof google>"u"||!google.accounts?.oauth2){e(new Error("Google Identity Services not loaded"));return}const n=xn();console.log("[AUTH] Requesting contacts access via GIS Token Model..."),google.accounts.oauth2.initTokenClient({client_id:mN,scope:"https://www.googleapis.com/auth/contacts.readonly https://www.googleapis.com/auth/contacts.other.readonly",hint:n?.email||void 0,callback:r=>{if(r.error){console.error("[AUTH] Token request error:",r.error),r.error==="access_denied"?e(new Error("Authorization cancelled")):e(new Error(r.error_description||r.error));return}if(!r.access_token){e(new Error("No access token received"));return}console.log("[AUTH] Contacts access granted"),t(r.access_token)},error_callback:r=>{console.error("[AUTH] Token client error:",r),r.type==="popup_closed"?e(new Error("Authorization cancelled")):e(new Error(r.message||"Authorization failed"))}}).requestAccessToken()})}const _N=Object.freeze(Object.defineProperty({__proto__:null,auth:xe,authReady:km,getCurrentUser:xn,getCurrentUserAsync:gN,getLoggedInUserId:q,getUserId:_e,isLoggedIn:jl,onAuthChange:ql,requestContactsAccess:Pm,setSafariExternalOpenArmed:Rm,signInWithGoogle:Am,signOutUser:Nm},Symbol.toStringTag,{value:"Module"})),yN=t=>String(t).replace(/[&<>"'`=\/]/g,n=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;","`":"&#x60;","=":"&#x3D;","/":"&#x2F;"})[n]),vN=(t,e)=>t.replace(/\$\{([^}]+)\}/g,(n,s)=>{const r=s.trim(),i=r.split(".").reduce((a,c)=>a?.[c],e);return i==null?"":r.endsWith("Html")?String(i):yN(String(i))}),wN=(t,e={})=>{const n=document.createElement("template");return n.innerHTML=vN(t,e),n.content.cloneNode(!0)},EN=(t,e)=>{const n=[];let s=e;for(;s&&s!==t;){const r=s.parentElement;if(!r)break;const i=Array.prototype.indexOf.call(r.children,s);n.push(i),s=r}return n.reverse()},bN=(t,e)=>e.reduce((n,s)=>n&&n.children?n.children[s]:null,t),CN=t=>Array.from(t.querySelectorAll("input, textarea, select")).map(e=>({name:e.name,id:e.id,path:EN(t,e),value:e.value,checked:e.checked,selectionStart:e.selectionStart,selectionEnd:e.selectionEnd,wasFocused:document.activeElement===e})),SN=t=>typeof CSS<"u"&&typeof CSS.escape=="function"?CSS.escape(String(t)):String(t).replace(/[^_a-zA-Z0-9-]/g,e=>"\\"+e),TN=(t,e)=>{e.forEach(n=>{let s=null;if(n.name){const r=t.querySelectorAll("input[name], textarea[name], select[name]");for(const i of r)if(i.getAttribute("name")===n.name){s=i;break}}else if(n.id)try{s=t.querySelector("#"+SN(n.id))}catch{s=t.querySelector(`#${n.id}`)}else n.path&&(s=bN(t,n.path));if(s){if(s.value=n.value,n.checked!==void 0&&(s.checked=n.checked),n.selectionStart!=null&&s.setSelectionRange)try{s.setSelectionRange(n.selectionStart,n.selectionEnd)}catch{}if(n.wasFocused)try{s.focus()}catch{}}})},IN=t=>Array.from(t.querySelectorAll("video, audio")).map(e=>({src:e.currentSrc||e.src,currentTime:e.currentTime,paused:e.paused,volume:e.volume,playbackRate:e.playbackRate,muted:e.muted})),kN=(t,e)=>{const n=t.querySelectorAll("video, audio");for(const s of n)if(s.currentSrc===e||s.src===e)return s;return null},RN=(t,e)=>{e.forEach(n=>{if(!n.src)return;const s=kN(t,n.src);s&&(s.currentTime=n.currentTime,s.volume=n.volume,s.playbackRate=n.playbackRate,s.muted=n.muted,n.paused||s.play().catch(()=>{}))})},AN=()=>document.readyState!=="loading",zl=({initialProps:t={},template:e="",handlers:n={},parent:s=null,containerTag:r="div",className:i="",onMount:o=null,onCleanup:a=null,autoAppend:c=!0,preserveInputState:l=!0}={})=>{if(!AN())return console.error("createComponent: DOM must be ready before creating components."),null;const u=document.createElement(r);i&&(u.className=i);let d={...t};const h=new Set,f=/\$\{([^}]+)\}/g;let p;for(;(p=f.exec(e))!==null;){const w=p[1].trim().split(".")[0];h.add(w)}const _=[],m=[],A={},x=()=>{let w=[],ce=[];l&&(w=CN(u),ce=IN(u)),u.textContent="";const ze=wN(e,d);u.appendChild(ze),Object.keys(n).forEach(Me=>{const be=u.querySelectorAll(`[onclick="${Me}"]`),Vn=n[Me];be.forEach(Gr=>{Gr.removeAttribute("onclick"),typeof Vn=="function"&&Gr.addEventListener("click",Vn)})}),l&&(TN(u,w),RN(u,ce)),_.forEach(Me=>Me({...d}))},$=w=>{if(!Array.isArray(w)||w.length===0)return;const ce={props:{...d},changedKeys:w};m.forEach(ze=>ze(ce))};for(const w of Object.keys(t))A[w]=[],Object.defineProperty(u,w,{get(){return d[w]},set(ce){d[w]!==ce&&(d[w]=ce,h.has(w)&&x(),A[w].forEach(ze=>ze(ce)),$([w]))},configurable:!0,enumerable:!0});if(u.update=w=>{let ce=!1,ze=!1;const Me=[];for(const be in w)w[be]!==d[be]&&(d[be]=w[be],h.has(be)&&(ze=!0),A[be]&&A[be].forEach(Vn=>Vn(w[be])),ce=!0,Me.push(be));ce&&ze&&x(),Me.length>0&&$(Me)},u.onRender=w=>{typeof w=="function"&&_.push(w)},u.onAnyPropUpdated=w=>{typeof w=="function"&&m.push(w)},u.onPropUpdated=(w,ce)=>{typeof ce=="function"&&A[w]&&A[w].push(ce)},u.dispose=()=>{a&&(Array.isArray(a)?a.forEach(w=>{typeof w=="function"&&w()}):typeof a=="function"&&a()),_.length=0,m.length=0;for(const w in A)A[w].length=0;u.remove()},x(),c&&s&&!s.contains(u)&&s.appendChild(u),typeof o=="function")try{o(u)}catch(w){eN("[createComponent]: Error in onMount handler of component",w)}return u};let zs=null;const NN=(t,e=null)=>{if(zs)return zs;if(!t)return console.error("Auth UI: Parent element is required"),null;let n=null,s=null,r=10;typeof e=="number"&&(r=e);const i=jl();return zs=zl({initialProps:{isLoggedIn:i,userName:"Guest User",signingInDisplay:"none",loginBtnMarginRightPx:r},template:`
      <button style="margin-right: \${loginBtnMarginRightPx}px" id="goog-login-btn" class="login-btn" onclick="handleLogin" disabled>Login</button>
      <button id="goog-logout-btn" class="logout-btn" onclick="handleLogout" disabled>Logout</button>
      <span class="signing-in-indicator" style="display: \${signingInDisplay}; color: var(--text-secondary, #888); font-size: 0.9rem;">Signing in...</span>
      <div class="user-info">\${isLoggedIn ? 'Logged in: ' + userName : 'Logged out'}</div>
    `,handlers:{handleLogin:Am,handleLogout:Nm},onMount:o=>{const a=c=>{const l=o.querySelector("#goog-login-btn"),u=o.querySelector("#goog-logout-btn");l&&u&&(l.disabled=c,u.disabled=!c)};a(i),n=ql(({isLoggedIn:c,userName:l})=>{B("[AuthComponent] Auth state changed:",{isLoggedIn:c,userName:l}),a(c),o.update({isLoggedIn:c,userName:l,signingInDisplay:"none"})}),s=sN(c=>{B("[AuthComponent] One Tap status:",c),c==="signing_in"?o.update({signingInDisplay:"inline-block"}):o.update({signingInDisplay:"none"})})},onCleanup:()=>{n&&(n(),n=null),s&&(s(),s=null),zs=null},className:"auth-component",parent:t}),zs},Gl=t=>t?!0:(console.warn("Element not found. el.id: =>",t?.id??"(no id)","el: =>",t),console.trace(),!1),Yi=t=>{if(Gl(t))return t.classList.contains("hidden")},D=t=>{Gl(t)&&t.classList.contains("hidden")&&t.classList.remove("hidden")},v=t=>{Gl(t)&&!t.classList.contains("hidden")&&t.classList.add("hidden")},Lm=t=>t.classList.contains("small-frame"),Cr=t=>{if(t&&!Lm(t)){t.classList.add("small-frame");const e=document.createElement("div");e.classList.add("small-frame-toggle-div");const n=document.createElement("span");n.classList.add("small-frame-toggle-icon"),n.textContent="❮",e.appendChild(n),t.appendChild(e),e.addEventListener("click",()=>{t.classList.contains("closed")?(t.classList.remove("closed"),e.classList.remove("closed"),n.classList.remove("closed")):(t.classList.add("closed"),e.classList.add("closed"),n.classList.add("closed"))})}},Kt=t=>{if(Lm(t)){t.classList.remove("small-frame");const e=document.querySelector(".small-frame-close");e&&e.remove()}};function Om(t){return document.pictureInPictureElement===t}function xo(t="room"){const e=new URL(window.location);e.searchParams.delete(t),window.history.replaceState({},"",e)}const z=t=>{const e=document.getElementById(t);return e||(console.warn(`Element with id: ${t} not found.`),null)};let je=null,cn=null,Mo=null,Yl=null,Fe=null,fe=null,ie=null,ne=null,M=null,Le=null,Be=null,qe=null,st=null,Us=null,Dm=null,rt=null,Fo=null,rn=null,$s=null,Bs=null,Mn=null,Kl=null,Jl=null,Xl=null,Ql=null,ns=null,Sr=null;function Ih(){je=z("lobby"),cn=z("lobby-call-btn"),Mo=z("title-auth-bar"),Yl=z("videos"),Fe=z("local-video-el"),fe=z("local-video-box"),ie=z("remote-video-el"),ne=z("remote-video-box"),M=z("shared-video-el"),Le=z("shared-video-box"),Be=z("chat-controls"),qe=z("call-btn"),st=z("hang-up-btn"),Us=z("switch-camera-btn"),rt=z("mute-btn"),Fo=z("fullscreen-partner-btn"),rn=z("remote-pip-btn"),$s=z("mic-btn"),Bs=z("camera-btn"),Mn=z("exit-watch-mode-btn"),Kl=z("app-pip-btn"),Jl=z("app-title-h1"),Xl=z("app-title-a"),Ql=z("app-title-span"),ns=z("paste-join-btn"),Sr=z("add-contact-btn")}document.readyState==="loading"?document.addEventListener("DOMContentLoaded",Ih):Ih();const xm=()=>({lobbyDiv:je,lobbyCallBtn:cn,titleAuthBar:Mo,videosWrapper:Yl,localVideoEl:Fe,localBoxEl:fe,remoteVideoEl:ie,remoteBoxEl:ne,sharedVideoEl:M,sharedBoxEl:Le,chatControls:Be,callBtn:qe,hangUpBtn:st,switchCameraBtn:Us,installBtn:Dm,mutePartnerBtn:rt,fullscreenPartnerBtn:Fo,remotePipBtn:rn,micBtn:$s,cameraBtn:Bs,exitWatchModeBtn:Mn,appPipBtn:Kl,appTitleH1:Jl,appTitleA:Xl,appTitleSpan:Ql,pasteJoinBtn:ns,addContactBtn:Sr});function Mm(t,e=3,n=100){return new Promise(s=>{let r=0;const i=()=>{const o=document.getElementById(t);if(o){s(o);return}if(r++,r>=e){console.warn(`Element ${t} not found after ${e} attempts`),s(null);return}setTimeout(i,n)};i()})}async function Fm(t,e=3,n=100){const s={},r=t.map(async i=>{const o=await Mm(i,e,n);return s[i]=o,o});return await Promise.all(r),s}async function PN(){const t=await Fm(["searchBtn","searchQuery","searchResults"],5,200),e=document.querySelector(".search-section");t.searchContainer=e;const n=Object.entries(t).filter(([s,r])=>!r).map(([s])=>s);return n.length>0&&console.warn("Some YouTube elements not found:",n),t}const LN=Object.freeze(Object.defineProperty({__proto__:null,get addContactBtn(){return Sr},get appPipBtn(){return Kl},get appTitleA(){return Xl},get appTitleH1(){return Jl},get appTitleSpan(){return Ql},get callBtn(){return qe},get cameraBtn(){return Bs},get chatControls(){return Be},get exitWatchModeBtn(){return Mn},get fullscreenPartnerBtn(){return Fo},getElements:xm,get hangUpBtn(){return st},initializeYouTubeElements:PN,installBtn:Dm,get lobbyCallBtn(){return cn},get lobbyDiv(){return je},get localBoxEl(){return fe},get localVideoEl(){return Fe},get micBtn(){return $s},get mutePartnerBtn(){return rt},get pasteJoinBtn(){return ns},get remoteBoxEl(){return ne},get remotePipBtn(){return rn},get remoteVideoEl(){return ie},robustElementAccess:Mm,get sharedBoxEl(){return Le},get sharedVideoEl(){return M},get switchCameraBtn(){return Us},get titleAuthBar(){return Mo},get videosWrapper(){return Yl},waitForElements:Fm},Symbol.toStringTag,{value:"Module"})),kh="yt-video-box",pc="yt-player-root";let J=null,Lt=!1;const ir=()=>J,ON=()=>Lt,Um=t=>Lt=t,ss=()=>{const t=document.getElementById(kh);if(!t)throw new Error(`Container #${kh} not found`);return t};function DN(){return new Promise(t=>{window.YT&&window.YT.Player?t():window.onYouTubeIframeAPIReady=()=>{t()}})}function $m(){const t=ss();if(!document.getElementById(pc)){const e=document.createElement("div");e.id=pc,t.appendChild(e)}D(t)}function Ki(){const t=ss();v(t)}function ga(){const t=ss();return t&&!t.classList.contains("hidden")}function gc(t){return t?t.includes("youtube.com")||t.includes("youtu.be"):!1}function Bm(t){if(!t)return null;const e=[/(?:youtube\.com\/watch\?v=)([\w-]+)/,/(?:youtu\.be\/)([\w-]+)/,/(?:youtube\.com\/embed\/)([\w-]+)/,/(?:youtube\.com\/shorts\/)([\w-]+)/];for(const n of e){const s=t.match(n);if(s&&s[1])return s[1]}return null}async function xN({url:t,onReady:e,onStateChange:n}){const s=Bm(t);if(!s)throw new Error("Invalid YouTube URL");if(await DN(),J){try{J.destroy()}catch(o){console.warn("Error destroying previous YouTube player:",o)}J=null}const r=(o=!0)=>{const a=ss(),c=J.getIframe();if(c&&a){try{a.tabIndex=-1,a.focus({preventScroll:!0})}catch{if(document.activeElement===c)try{c.blur()}catch{}}if(o){const l=u=>{if(u.code==="Space"){const d=ss(),h=J.getIframe();if(document.activeElement===h||document.activeElement===d)return;u.preventDefault(),console.debug("Space pressed, refocusing iframe"),J.getPlayerState()!==window.YT.PlayerState.PLAYING?eu():qr()}};document.addEventListener("keydown",l,{once:!0})}}},i=()=>{const o=ss(),a=J.getIframe();if(o&&a&&document.activeElement!==a)try{a.focus()}catch{}};return $m(),new Promise((o,a)=>{try{J=new window.YT.Player(pc,{videoId:s,playerVars:{autoplay:1,mute:0,controls:1,fs:1,rel:0,modestbranding:1,disablekb:0,origin:window.location.origin},events:{onReady:c=>{Lt=!0,e&&e(c),o(J)},onStateChange:c=>{c.data===window.YT.PlayerState.ENDED&&r(!1),c.data===window.YT.PlayerState.PAUSED&&r(),c.data===window.YT.PlayerState.PLAYING&&i(),n&&n(c)},onError:c=>{console.error("YouTube player error:",c.data),a(new Error(`YouTube error: ${c.data}`))}}})}catch(c){a(c)}})}function Zl(){if(J){try{Ki(),J.destroy()}catch(t){console.warn("Error destroying YouTube player:",t)}J=null,Lt=!1}}function eu(){J&&Lt&&J.playVideo()}function qr(){J&&Lt&&J.pauseVideo()}function MN(t){J&&Lt&&J.seekTo(t,!0)}function Ji(){return J&&Lt?J.getCurrentTime():0}function tu(){return J&&Lt?J.getPlayerState():-1}const Vt={UNSTARTED:-1,ENDED:0,PLAYING:1,PAUSED:2,BUFFERING:3,CUED:5};let ye=null,Pt=null,Hm=!1,it="none",Xi=null,He=null;const Fn=()=>Hm,Wm=t=>Hm=t,Ut=()=>it,FN=t=>{["yt","url","file","none"].includes(t)?it=t:console.warn("Invalid lastWatched platform:",t)};let jt=!1,or=null,rs=0,ma=!1;async function is(t){if(!ye)return;console.debug("Updating watch sync state, roomId:",ye);const e=Po(ye);try{await En(e,{...t,updatedBy:Pt})}catch(n){console.error("Failed to update watch state:",n)}}function UN(t,e,n){if(!t)return;ye=t,Pt=n;const s=Po(t),r=Lo(t);nr(s,WN,t),nr(r,HN,t),KN()}function Vm(t){return typeof t=="string"&&t.startsWith("blob:")}async function $N(t,e){if(!ye||!Pt)return!1;const n=Lo(ye);try{return await se(n,{fileName:t,requestedBy:Pt,timestamp:Date.now()}),He&&clearTimeout(He),He=setTimeout(()=>{mc()},300*1e3),!0}catch(s){return console.error("Failed to create watch request:",s),!1}}async function BN(t){if(!ye)return!1;const e=Lo(ye);try{await Ve(e)}catch(n){console.warn("Failed to remove watch request:",n)}return He&&(clearTimeout(He),He=null),await Tr(t)}async function mc(){if(!ye)return;He&&(clearTimeout(He),He=null);const t=Lo(ye);try{await Ve(t)}catch(e){console.warn("Failed to cancel watch request:",e)}}function HN(t){const e=t.val();if(!e){He&&(clearTimeout(He),He=null);return}e.requestedBy!==Pt&&window.onFileWatchRequestReceived&&window.onFileWatchRequestReceived(e.fileName)}function WN(t){const e=t.val();e&&e.updatedBy!==Pt&&(Date.now()-rs<500||(e.url&&e.url!==Xi&&!Vm(e.url)&&VN(e.url),e.isYouTube?jN(e):YN(e)))}function VN(t){Xi=t,gc(t)?(v(Le),jm(t),it="yt"):(Zl(),D(Le),M.src=t,it="url")}function jN(t){!ir()||!ON()||(qN(t),zN(t))}function qN(t){const e=tu(),n=e===Vt.PLAYING;if([Vt.BUFFERING,Vt.UNSTARTED].includes(e)){GN();return}jt||(t.playing&&!n?(eu(),it="yt"):!t.playing&&n&&(qr(),it="yt"))}function zN(t){if(t.currentTime===void 0)return;const e=Ji();Math.abs(e-t.currentTime)>.3&&!jt&&(MN(t.currentTime),setTimeout(()=>{t.playing?eu():qr(),it="yt"},500))}function GN(){jt=!0,clearTimeout(or),or=setTimeout(async()=>{jt=!1;const t=tu()===Vt.PLAYING;await is({playing:t,currentTime:Ji()})},700)}function YN(t){rs=Date.now(),t.playing!==void 0&&(t.playing&&M.paused?M.play().catch(e=>console.warn("Play failed:",e)):!t.playing&&!M.paused&&M.pause()),t.currentTime!==void 0&&Math.abs(M.currentTime-t.currentTime)>1&&(M.currentTime=t.currentTime,t.playing?M.play().catch(n=>console.warn("Play failed:",n)):M.pause())}function KN(){const t=()=>{it!=="file"&&(it="url")};M.addEventListener("play",async()=>{!ir()&&ye&&(rs=Date.now(),await is({playing:!0,currentTime:M.currentTime,isYouTube:!1})),t()}),M.addEventListener("pause",async()=>{M.seeking||(!ir()&&ye&&(rs=Date.now(),console.log("[SYNC DEBUG] Local pause event:",{currentTime:M.currentTime}),await is({playing:!1,currentTime:M.currentTime,isYouTube:!1})),t())}),M.addEventListener("playing",()=>{ma=!0}),M.addEventListener("pause",()=>{M.seeking||(ma=!1)},!0),M.addEventListener("seeked",async()=>{!ir()&&ye&&(rs=Date.now(),await is({currentTime:M.currentTime,playing:ma,isYouTube:!1})),t()})}async function JN(t){if(!t)return!1;rs=Date.now();const e=Vm(t);if(gc(t)){if(v(Le),!await jm(t))return!1;it="yt"}else Zl(),D(Le),M.src=t,it=e?"file":"url";if(ye){const n=Po(ye);e?await se(n,{playing:!1,currentTime:0,isYouTube:!1,updatedBy:Pt}):se(n,{url:t,playing:!1,currentTime:0,isYouTube:gc(t),updatedBy:Pt})}return!0}async function Tr(t){let e;if(t instanceof File){if(!t.type.startsWith("video/"))return console.warn("Invalid file type:",t.type),!1;e=URL.createObjectURL(t)}else if(typeof t=="string")e=t;else if(t?.url)e=t.url;else return console.warn("Invalid video source:",t),!1;Xi=e;const n=await JN(e);return n?yc():t instanceof File&&(URL.revokeObjectURL(e),Xi=null),n}async function jm(t){if(!Bm(t))return console.error("Invalid YouTube URL:",t),!1;try{return await xN({url:t,onReady:n=>{if(Um(!0),ye){const s=Po(ye);se(s,{url:t,playing:!1,currentTime:0,isYouTube:!0,updatedBy:Pt})}},onStateChange:async n=>{if(!ir())return;const r=n.data===Vt.PLAYING,i=n.data===Vt.PAUSED;if(n.data===Vt.BUFFERING){jt=!0,or&&clearTimeout(or),or=setTimeout(async()=>{jt=!1;const c=tu()===Vt.PLAYING;await is({playing:c,currentTime:Ji()})},700);return}i&&jt||!jt&&(r||i)&&await is({playing:r,currentTime:Ji()})}}),!0}catch(n){return console.error("Failed to load YouTube video:",n),!1}}function XN(t,{inactivityMs:e=3e3,listenTarget:n=document,onShow:s=null,onHide:r=null,hideOnEsc:i=!1,excludeEvents:o=["keydown"]}={}){if(!t)return()=>{};let a=null;const l=["pointermove","pointerdown","pointerup","touchstart","touchmove","mousemove","mousedown","keydown"].filter(m=>!Array.isArray(o)||!o.includes(m));function u(){D(t);try{typeof s=="function"&&s()}catch(m){console.warn("showHideOnInactivity onShow callback error:",m)}a&&clearTimeout(a),a=setTimeout(()=>{v(t);try{typeof r=="function"&&r()}catch(m){console.warn("showHideOnInactivity onHide callback error:",m)}a=null},e)}l.forEach(m=>n.addEventListener(m,u,{passive:!0}));function d(){if(document.hidden){a&&(clearTimeout(a),a=null);try{v(t)}catch(m){console.warn("showHideOnInactivity onHide (visibilitychange) callback error:",m)}}else u()}document.addEventListener("visibilitychange",d);function h(m){if(!m.relatedTarget){a&&(clearTimeout(a),a=null),v(t);try{typeof r=="function"&&r()}catch(A){console.warn("showHideOnInactivity onHide (visibilitychange) callback error:",A)}}}n.addEventListener("mouseout",h);function f(m){if(i&&(m.key==="Escape"||m.key==="Esc")){a&&(clearTimeout(a),a=null),v(t);try{typeof r=="function"&&r()}catch(A){console.warn("showHideOnInactivity onHide (esc) callback error:",A)}}}document.addEventListener("keydown",f);function p(){a||u()}n.addEventListener("touchend",p,{passive:!0}),v(t);function _(){l.forEach(m=>n.removeEventListener(m,u)),document.removeEventListener("visibilitychange",d),n.removeEventListener("mouseout",h),n.removeEventListener("touchend",p),document.removeEventListener("keydown",f),a&&(clearTimeout(a),a=null)}return _}let vt=null,wt=null,qm="user";function _c(){return qm}function zm(t){qm=t}function Uo(){return vt instanceof MediaStream}function nu(){return!vt||!(vt instanceof MediaStream)?(console.error("Invalid remote MediaStream accessed:",vt),null):vt}function Gm(t){vt=t}function Ym(){vt&&(vt.getTracks().forEach(t=>t.stop()),vt=null)}function Km(){return wt instanceof MediaStream}function $o(){return!wt||!(wt instanceof MediaStream)?(console.error("Invalid local MediaStream accessed:",wt),console.error("Call createLocalStream() before accessing local stream."),null):wt}function Qi(t){wt=t}function Jm(){wt&&(wt.getTracks().forEach(t=>t.stop()),wt=null)}const QN=Object.freeze(Object.defineProperty({__proto__:null,cleanupLocalStream:Jm,cleanupRemoteStream:Ym,getFacingMode:_c,getLocalStream:$o,getRemoteStream:nu,hasLocalStream:Km,hasRemoteStream:Uo,setFacingMode:zm,setLocalStream:Qi,setRemoteStream:Gm},Symbol.toStringTag,{value:"Module"}));let Ir=!1,ri=!1,Rh=null,Ah=null,ar=null;const Xm=()=>Ir,su=()=>{if(!Ir){if(!ie||!Uo()||ie.paused||ie.readyState<2){ri||(ri=!0,ie.addEventListener("playing",()=>{ri=!1,su()},{once:!0}));return}if(ri=!1,Ir=!0,D(ne),D(fe),Cr(fe),v(je),v(cn),qe.disabled=!0,qe.classList.add("disabled"),st.disabled=!1,st.classList.remove("disabled"),rt.disabled=!1,rt.classList.remove("disabled"),rn.disabled=!1,rn.classList.remove("disabled"),ar||(ar=XN(Be,{inactivityMs:2500,hideOnEsc:!0})),!Rh){const t=()=>{Fn()?Cr(ne):Kt(ne),D(ne)};ie.addEventListener("leavepictureinpicture",t),Rh=()=>ie.removeEventListener("leavepictureinpicture",t)}if(!Ah){const t=()=>v(ne);ie.addEventListener("enterpictureinpicture",t),Ah=()=>ie.removeEventListener("enterpictureinpicture",t)}}},Qm=()=>{Ir&&(Ir=!1,Kt(fe),v(fe),Kt(ne),v(ne),qe.disabled=!1,qe.classList.remove("disabled"),st.disabled=!0,st.classList.add("disabled"),rt.disabled=!0,rt.classList.add("disabled"),rn.disabled=!0,rn.classList.add("disabled"),ar&&(ar(),ar=null),Fn()||(D(cn),D(je),D(Be)))},Zm=()=>{if(!Uo())return!1;const t=nu();return t&&t.getVideoTracks().length>0&&t.getVideoTracks()[0].enabled&&t.getVideoTracks()[0].readyState==="live"};function ZN(){return"pictureInPictureEnabled"in document&&typeof document.pictureInPictureEnabled=="boolean"&&document.pictureInPictureEnabled}function yc(){Fn()||(Wm(!0),v(je),v(cn),Be.classList.remove("bottom"),Be.classList.add("watch-mode"),Xm()?(v(qe),D(st)):(v(st),v($s),v(rt),D(qe)),v(Bs),v(Us),D(Mn),D(Be),v(fe),Kt(fe),v(ne),Om(ie)?Kt(ne):ZN()?ie.requestPictureInPicture().then(()=>{Kt(ne)}).catch(t=>{console.warn("Failed to enter Picture-in-Picture:",t),Cr(ne),D(ne)}):(Cr(ne),D(ne)))}function cr(){Fn()&&(v(Mn),D(qe),D(st),D($s),D(rt),D(Bs),D(Us),Be.classList.remove("watch-mode"),Be.classList.add("bottom"),D(Be),Zm()&&(Om(ie)&&document.exitPictureInPicture().catch(t=>{console.error("Failed to exit Picture-in-Picture:",t)}),Kt(ne),D(ne)),Xm()?(Cr(fe),D(fe)):(D(je),D(cn),Kt(fe),v(fe)),Wm(!1))}class os{constructor(){this.logs=[],this.isEnabled=!0,this.maxLogs=1e3,this.sessionId=this.generateSessionId()}log(e,n,s={}){if(!this.isEnabled)return;const r={timestamp:performance.now(),sessionId:this.sessionId,category:e,event:n,data:{...s},id:this.generateLogId()};this.logs.push(r),this.logs.length>this.maxLogs&&(this.logs=this.logs.slice(-this.maxLogs)),typeof window<"u"&&window.location?.hostname==="localhost"&&console.log(`[DIAG] ${e}:${n}`,s)}logListenerAttachment(e,n,s,r={}){this.log("LISTENER","ATTACHED",{roomId:e,listenerType:n,currentCount:s,...r})}logListenerCleanup(e,n,s={}){this.log("LISTENER","CLEANUP",{removedCount:e.length,preservedCount:n.length,removedRoomIds:e,preservedRoomIds:n,...s})}logDuplicateListener(e,n,s={}){this.log("LISTENER","DUPLICATE_PREVENTED",{roomId:e,listenerType:n,...s})}logIncomingCallEvent(e,n,s,r={}){this.log("INCOMING_CALL","DETECTED",{callerId:e,roomId:n,isFresh:s.isFresh,validationMethod:s.method,age:s.age,reason:s.reason,...r})}logNotificationDecision(e,n,s,r={}){this.log("INCOMING_CALL","NOTIFICATION_DECISION",{decision:e,reason:n,roomId:s,...r})}logCallingUILifecycle(e,n,s={}){this.log("CALLING_UI",e,{roomId:n,...s})}logFirebaseOperation(e,n,s=null,r={}){this.log("FIREBASE","OPERATION",{operation:e,success:n,error:s?{message:s.message,code:s.code,stack:s.stack}:null,...r})}logFirebaseConnectionState(e,n={}){this.log("FIREBASE","CONNECTION_STATE",{state:e,...n})}logRoomCreation(e,n,s,r={}){this.log("ROOM","CREATED",{roomId:e,isInitiator:n,creationTime:s.creationTime,listenerAttachTime:s.listenerAttachTime,timeDiff:s.listenerAttachTime-s.creationTime,...r})}logMemberJoinEvent(e,n,s,r={}){this.log("ROOM","MEMBER_JOINED",{roomId:e,memberId:n,joinedAt:s.joinedAt,role:s.role,...r})}logContactSave(e,n,s={}){this.log("CONTACT","SAVED",{contactId:e,roomId:n,...s})}logContactCall(e,n,s,r={}){this.log("CONTACT","CALL_INITIATED",{contactId:e,roomId:n,forceInitiator:s,...r})}logFreshnessValidation(e,n,s,r={}){this.log("FRESHNESS","VALIDATION",{roomId:e,method:n,result:{isFresh:s.isFresh,age:s.age,threshold:s.threshold,reason:s.reason},...r})}logRaceCondition(e,n,s,r={}){this.log("RACE_CONDITION",e,{roomId:n,events:s,...r})}getLogs(e={}){let n=[...this.logs];return e.category&&(n=n.filter(s=>s.category===e.category)),e.event&&(n=n.filter(s=>s.event===e.event)),e.roomId&&(n=n.filter(s=>s.data.roomId===e.roomId)),e.since&&(n=n.filter(s=>s.timestamp>=e.since)),e.until&&(n=n.filter(s=>s.timestamp<=e.until)),n}getCallFlowTrace(e){return this.getLogs({roomId:e}).sort((n,s)=>n.timestamp-s.timestamp)}getListenerDiagnostics(e=null){const n=this.getLogs({category:"LISTENER"});return e?n.filter(s=>s.data.roomId===e):n}getFailureAnalysis(){const e=this.logs.filter(n=>n.category==="FIREBASE"&&n.data.success===!1||n.category==="INCOMING_CALL"&&n.data.decision==="REJECT"||n.category==="LISTENER"&&n.event==="DUPLICATE_PREVENTED");return{totalFailures:e.length,firebaseFailures:e.filter(n=>n.category==="FIREBASE").length,rejectedCalls:e.filter(n=>n.category==="INCOMING_CALL"&&n.data.decision==="REJECT").length,duplicateListeners:e.filter(n=>n.event==="DUPLICATE_PREVENTED").length,failures:e}}exportDiagnostics(){return{sessionId:this.sessionId,exportTime:Date.now(),logCount:this.logs.length,logs:[...this.logs],summary:this.getFailureAnalysis()}}exportLogsAsJSON(){return JSON.stringify(this.exportDiagnostics(),null,2)}downloadLogs(e=null){e||(e=`diagnostic-logs-${this.sessionId}-${Date.now()}.json`);const n=this.exportLogsAsJSON(),s=new Blob([n],{type:"application/json"}),r=document.createElement("a");r.href=URL.createObjectURL(s),r.download=e,r.click(),URL.revokeObjectURL(r.href)}getLogsInTimeRange(e,n){return this.logs.filter(s=>s.timestamp>=e&&s.timestamp<=n)}getLogsSince(e){return this.logs.filter(n=>n.timestamp>=e)}clearOldLogs(e=1440*60*1e3){const n=Date.now()-e;this.logs=this.logs.filter(s=>s.timestamp>=n)}clearLogs(){this.logs=[]}persistLogs(){try{const e=`diagnostic-logs-${this.sessionId}`;return localStorage.setItem(e,this.exportLogsAsJSON()),e}catch(e){return console.warn("Failed to persist logs to localStorage:",e),null}}loadPersistedLogs(e){try{const n=localStorage.getItem(e);if(n){const s=JSON.parse(n);if(s.logs&&Array.isArray(s.logs)){const r=new Set(this.logs.map(o=>o.id)),i=s.logs.filter(o=>!r.has(o.id));return this.logs=[...this.logs,...i].sort((o,a)=>o.timestamp-a.timestamp),i.length}}return 0}catch(n){return console.warn("Failed to load persisted logs:",n),0}}static getPersistedLogKeys(){const e=[];for(let n=0;n<localStorage.length;n++){const s=localStorage.key(n);s&&s.startsWith("diagnostic-logs-")&&e.push(s)}return e}static cleanupPersistedLogs(e=1440*60*1e3){const n=Date.now()-e;os.getPersistedLogKeys().forEach(r=>{try{const i=localStorage.getItem(r);if(i){const o=JSON.parse(i);o.exportTime&&o.exportTime<n&&localStorage.removeItem(r)}}catch{localStorage.removeItem(r)}})}enable(){this.isEnabled=!0}disable(){this.isEnabled=!1}generateSessionId(){return`session_${performance.now()}_${Math.random().toString(36).substr(2,9)}`}generateLogId(){return`log_${performance.now()}_${Math.random().toString(36).substr(2,9)}`}formatTimestamp(e){return new Date(e).toISOString()}startTiming(e){const n=`timing_${e}_${Date.now()}`;return this.log("TIMING","START",{operation:e,timingId:n}),n}endTiming(e,n={}){const s=this.logs.find(r=>r.category==="TIMING"&&r.event==="START"&&r.data.timingId===e);if(s){const r=Date.now()-s.timestamp;return this.log("TIMING","END",{timingId:e,duration:r,operation:s.data.operation,...n}),r}return null}}let _a=null;function y(){return _a||(_a=new os),_a}typeof window<"u"&&(window.diagnosticLogger={getInstance:()=>y(),exportLogs:()=>{const e=y().exportLogsAsJSON();return console.log("Diagnostic logs exported:"),console.log(e),e},downloadLogs:t=>{y().downloadLogs(t),console.log("Diagnostic logs downloaded")},getRoomLogs:t=>{const n=y().getCallFlowTrace(t);return console.log(`Logs for room ${t}:`,n),n},getFailures:()=>{const e=y().getFailureAnalysis();return console.log("Failure analysis:",e),e},getListenerDiagnostics:t=>{const n=y().getListenerDiagnostics(t);return console.log("Listener diagnostics:",n),n},getLogsSince:t=>{const n=y().getLogsSince(t);return console.log(`Logs since ${new Date(t).toISOString()}:`,n),n},getLogsInRange:(t,e)=>{const s=y().getLogsInTimeRange(t,e);return console.log(`Logs from ${new Date(t).toISOString()} to ${new Date(e).toISOString()}:`,s),s},persistLogs:()=>{const e=y().persistLogs();return console.log(`Logs persisted with key: ${e}`),e},loadPersistedLogs:t=>{const n=y().loadPersistedLogs(t);return console.log(`Loaded ${n} persisted logs`),n},getPersistedKeys:()=>{const t=os.getPersistedLogKeys();return console.log("Persisted log keys:",t),t},clearLogs:()=>{y().clearLogs(),console.log("Diagnostic logs cleared")},enable:()=>{y().enable(),console.log("Diagnostic logging enabled")},disable:()=>{y().disable(),console.log("Diagnostic logging disabled")},getSessionInfo:()=>{const t=y(),e={sessionId:t.sessionId,logCount:t.logs.length,isEnabled:t.isEnabled,maxLogs:t.maxLogs};return console.log("Session info:",e),e},help:()=>{console.log(`
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
      `)}},window.addEventListener("beforeunload",()=>{try{const t=y();t.logs.length>0&&t.persistLogs(),os.cleanupPersistedLogs()}catch{}}),(window.location.hostname==="localhost"||window.location.hostname==="127.0.0.1")&&setTimeout(()=>{try{const t=y(),e=typeof localStorage<"u"&&localStorage.getItem("debug:console")==="1";if(!t.isEnabled||!e)return;const n=os.getPersistedLogKeys();n.length>0&&(console.log(`Found ${n.length} persisted diagnostic log sessions. Use diagnosticLogger.loadPersistedLogs(key) to load them.`),console.log("Available keys:",n))}catch{}},1e3));class eP{constructor(){this.currentRoomId=null}async createNewRoom(e,n,s=null){const r=Date.now();s||(s=Math.random().toString(36).substring(2,15)),y().log("ROOM","CREATE_START",{roomId:s,userId:n,hasOffer:!!e,timestamp:r});const i=dn(s);try{return await se(i,{offer:{type:e.type,sdp:e.sdp},createdAt:Date.now(),createdBy:n}),y().logFirebaseOperation("create_room",!0,null,{roomId:s,userId:n,duration:Date.now()-r}),await this.joinRoom(s,n),y().log("ROOM","CREATE_COMPLETE",{roomId:s,userId:n,totalDuration:Date.now()-r}),s}catch(o){throw y().logFirebaseOperation("create_room",!1,o,{roomId:s,userId:n,duration:Date.now()-r}),o}}async checkRoomStatus(e){const n=dn(e),s=await tt(n);if(!s.exists())return{exists:!1,hasMembers:!1,memberCount:0};const r=s.val(),i=r.members||{},o=Object.keys(i).length;return{exists:!0,hasMembers:o>0,memberCount:o,roomData:r}}async getRoomData(e){const n=dn(e),s=await tt(n);if(!s.exists())throw new Error("Room does not exist");return s.val()}async saveAnswer(e,n){const s=dn(e);await En(s,{answer:n})}async joinRoom(e,n,s="Guest User"){const r=lh(e,n);await se(r,{displayName:s,joinedAt:Date.now()}),y().logFirebaseOperation("set","joinRoom",`rooms/${e}/members/${n}`)}async leaveRoom(e,n=null,{deleteRoomIfEmpty:s=!0}={}){const r=n||this.currentRoomId;if(!r||!e)return;const i=lh(r,e),o=ni(r),a=dn(r);try{await Ve(i)}catch(c){y().logFirebaseOperation("leave_room_remove_member",!1,c,{roomId:r,userId:e})}if(s)try{const c=await tt(o),l=c.exists()?c.val():{};(l?Object.keys(l).length:0)===0&&await Ve(a).catch(d=>{y().logFirebaseOperation("delete_empty_room",!1,d,{roomId:r})})}catch(c){y().logFirebaseOperation("check_members_after_leave",!1,c,{roomId:r})}(!n||n===this.currentRoomId)&&(this.currentRoomId=null)}async rejectCall(e,n,s="user_rejected"){if(!e||!n)return;const r=dn(e),i={rejection:{by:n,reason:s,at:Date.now()}};try{await En(r,i),y().log("ROOM","REJECT_SET",{roomId:e,byUserId:n,reason:s})}catch(o){throw y().log("ROOM","REJECT_SET_FAILED",{roomId:e,byUserId:n,reason:s,error:String(o?.message||o)}),o}}async cancelCall(e,n,s="caller_cancelled"){if(!e||!n)return;const r=dn(e),i={cancellation:{by:n,reason:s,at:Date.now()}};try{await En(r,i),y().log("ROOM","CANCEL_SET",{roomId:e,byUserId:n,reason:s})}catch(o){throw y().log("ROOM","CANCEL_SET_FAILED",{roomId:e,byUserId:n,reason:s,error:String(o?.message||o)}),o}}onCallCancelled(e,n){const s=Zk(e);_n(s,"value",n,e),y().logFirebaseOperation("on","onCallCancelled",`rooms/${e}/cancellation`,{event:"value"})}onMemberJoined(e,n){const s=ni(e);_n(s,"child_added",n,e),y().logFirebaseOperation("on","onMemberJoined",`rooms/${e}/members`,{event:"child_added"})}onMemberLeft(e,n){const s=ni(e);_n(s,"child_removed",n,e),y().logFirebaseOperation("on","onMemberLeft",`rooms/${e}/members`,{event:"child_removed"})}onIncomingCall(e,n,s){const r=ni(e),i=a=>{s("join",a.key,a.val())},o=a=>{s("leave",a.key,a.val())};return _n(r,"child_added",i,e,n),_n(r,"child_removed",o,e,n),()=>Qk(n,e)}get roomId(){return this.currentRoomId}}const ee=new eP;class tP{constructor(e,{loop:n=!1,volume:s=.5}={}){this.src=e,this.audio=new Audio(e),this.audio.loop=n,this.audio.volume=Math.max(0,Math.min(1,s)),this.isPlaying=!1,this.audio.onerror=r=>{console.error(`[AudioPlayer] Failed to load audio: ${e}`,r),this.isPlaying=!1},this.audio.onplay=()=>{this.isPlaying=!0},this.audio.onpause=()=>{this.isPlaying=!1},this.audio.onended=()=>{this.isPlaying=!1}}async play(){if(!this.audio)return!1;if(this.isPlaying)return!0;try{return await this.audio.play(),this.isPlaying=!0,!0}catch(e){return e.name==="NotAllowedError"?console.warn("[AudioPlayer] Autoplay blocked - user interaction required first",{src:this.src}):e.name==="NotSupportedError"?console.error("[AudioPlayer] Audio format not supported",{src:this.src}):console.error("[AudioPlayer] Playback error:",e),this.isPlaying=!1,!1}}stop(){this.audio&&(this.audio.pause(),this.audio.currentTime=0,this.isPlaying=!1)}pause(){this.audio&&(this.audio.pause(),this.isPlaying=!1)}setVolume(e){this.audio&&(this.audio.volume=Math.max(0,Math.min(1,e)))}getVolume(){return this.audio?.volume??0}dispose(){this.stop(),this.audio&&(this.audio.onerror=null,this.audio.onplay=null,this.audio.onpause=null,this.audio.onended=null,this.audio.src="",this.audio=null),this.isPlaying=!1}}class nP{constructor({incomingSrc:e,outgoingSrc:n,volume:s}={}){this.incomingSrc=e??"/sounds/incoming.mp3",this.outgoingSrc=n??"/sounds/outgoing.mp3",this.defaultVolume=s??.7,this.currentPlayer=null,this.currentType=null}configure({incomingSrc:e,outgoingSrc:n,volume:s}={}){e!==void 0&&(this.incomingSrc=e),n!==void 0&&(this.outgoingSrc=n),s!==void 0&&(this.defaultVolume=s)}setIncomingRingtone(e){this.incomingSrc=e}setOutgoingRingtone(e){this.outgoingSrc=e}setVolume(e){this.defaultVolume=Math.max(0,Math.min(1,e))}async playIncoming(){return this._play("incoming",this.incomingSrc)}async playOutgoing(){return this._play("outgoing",this.outgoingSrc)}async _play(e,n){this.stop();try{this.currentPlayer=new tP(n,{loop:!0,volume:this.defaultVolume}),this.currentType=e;const s=await this.currentPlayer.play();return s?console.log(`[Ringtone] Playing ${e} ringtone`):(console.warn(`[Ringtone] Failed to start ${e} ringtone (likely autoplay blocked)`),this.currentPlayer?.dispose(),this.currentPlayer=null,this.currentType=null),s}catch(s){return console.error(`[Ringtone] Error playing ${e} ringtone:`,s),this.currentPlayer?.dispose(),this.currentPlayer=null,this.currentType=null,!1}}stop(){this.currentPlayer&&(console.log(`[Ringtone] Stopping ${this.currentType} ringtone`),this.currentPlayer.stop(),this.currentPlayer.dispose(),this.currentPlayer=null,this.currentType=null)}isPlaying(){return this.currentPlayer?.isPlaying??!1}getCurrentType(){return this.currentType}}const as=new nP,Zi=3e4;let gt=null,Ks=null;async function sP(t,e=null){const n=_e(),s=q();if(!s)return;const r=Ol(s);await se(r,{roomId:t,targetContactName:e,initiatedAt:Date.now(),callerUserId:n})}async function eo(){const t=q();if(!t)return;const e=Ol(t);await Ve(e).catch(()=>{})}async function e_(t,e){if(!t)return!1;try{const n=Ol(t),s=await tt(n);if(!s.exists())return!1;const r=s.val();return r.roomId!==e?!1:Date.now()-r.initiatedAt<Zi}catch(n){return console.warn("Failed to check outgoing call freshness",n),!1}}async function t_(t){if(!t)return!1;try{const e=k(R,`rooms/${t}/createdAt`),n=await tt(e);if(!n.exists())return!1;const s=n.val();return typeof s!="number"?!1:Date.now()-s<Zi}catch(e){return console.warn("Failed to check room freshness",e),!1}}async function n_(t,e,n){const s=y(),r=Date.now();Sn(),await sP(t,e);const i=document.createElement("div");i.id="calling-modal",i.style.cssText=`
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
  `;const u=async()=>{s.logCallingUILifecycle("CANCEL",t,{contactName:e,reason:"user_cancelled",duration:Date.now()-r});try{await Promise.all([eo(),ee.cancelCall(t,_e(),"caller_cancelled"),ee.leaveRoom(_e(),t)])}catch(d){s.log("ROOM","CALLER_CANCELLED_CLEANUP_FAIL",{roomId:t,error:String(d)})}as.stop(),Sn()};l.onclick=u,o.appendChild(a),o.appendChild(c),o.appendChild(l),i.appendChild(o),document.body.appendChild(i),i.dataset.roomId=t,gt=i,as.playOutgoing(),Ks=setTimeout(async()=>{s.logCallingUILifecycle("TIMEOUT",t,{contactName:e,reason:"auto_timeout",duration:Date.now()-r,timeoutMs:Zi});try{await Promise.all([eo(),ee.cancelCall(t,_e(),"auto_timeout"),ee.leaveRoom(_e(),t)])}catch(d){s.log("ROOM","CALLER_TIMEOUT_CLEANUP_FAIL",{roomId:t,error:String(d)})}as.stop(),Sn()},Zi)}function Sn(){if(as.stop(),gt){const t=gt.dataset?.roomId||"unknown";y().logCallingUILifecycle("HIDE",t,{reason:"hide_called",hadTimeout:!!Ks,timestamp:Date.now()})}Ks&&(clearTimeout(Ks),Ks=null),gt&&(gt.remove(),gt=null)}async function ru(){if(gt){const t=gt.dataset?.roomId||"unknown";y().logCallingUILifecycle("ANSWERED",t,{reason:"call_answered",timestamp:Date.now()})}await eo(),Sn()}async function rP(t="user_rejected"){const e=y(),n=gt?.dataset?.roomId||"unknown";e.logCallingUILifecycle("REJECTED",n,{reason:t,timestamp:Date.now()}),await eo(),Sn()}const iP=Object.freeze(Object.defineProperty({__proto__:null,hideCallingUI:Sn,isOutgoingCallFresh:e_,isRoomCallFresh:t_,onCallAnswered:ru,onCallRejected:rP,showCallingUI:n_},Symbol.toStringTag,{value:"Module"}));let cs=null;function Bo(t,e={}){return new Promise(n=>{const s=document.createElement("dialog");s.innerHTML=`
      <p>${t}</p>
      <div class="confirm-dialog-actions">
        <button data-action="cancel">Cancel</button>
        <button data-action="confirm" autofocus>Confirm</button>
      </div>
    `,s.classList.add("confirm-dialog");const r=s.querySelector('[data-action="confirm"]'),i=s.querySelector('[data-action="cancel"]');if(!r||!i){console.error("dialog element not found!"),n(!1);return}let o=null;function a(c){o&&clearTimeout(o),s.close(),s.remove(),cs===a&&(cs=null),n(c)}r.addEventListener("click",()=>{a(!0)}),i.addEventListener("click",()=>{a(!1)}),s.addEventListener("cancel",()=>a(!1)),document.body.appendChild(s),s.showModal(),cs=a,e.autoRemoveSeconds&&typeof e.autoRemoveSeconds=="number"&&e.autoRemoveSeconds>0&&(o=setTimeout(()=>{a(!1)},e.autoRemoveSeconds*1e3))})}function oP(){if(typeof cs=="function"){try{cs(!1)}catch{}return cs=null,!0}return!1}const aP=Object.freeze(Object.defineProperty({__proto__:null,default:Bo,dismissActiveConfirmDialog:oP},Symbol.toStringTag,{value:"Module"}));class cP{async send(e,n){throw new Error("MessagingTransport.send() must be implemented by subclass")}listen(e,n){throw new Error("MessagingTransport.listen() must be implemented by subclass")}async getUnreadCount(e){throw new Error("MessagingTransport.getUnreadCount() must be implemented by subclass")}async markAsRead(e){throw new Error("MessagingTransport.markAsRead() must be implemented by subclass")}listenToUnreadCount(e,n){throw new Error("MessagingTransport.listenToUnreadCount() must be implemented by subclass")}}const Nh=100;class lP extends cP{_getConversationId(e,n){return[e,n].sort().join("_")}async send(e,n){const s=q();if(!s)throw new Error("Cannot send message: not logged in");const i=xn()?.displayName||"Guest User",o=this._getConversationId(s,e),a=Hi(k(R,`conversations/${o}/messages`));await se(a,{text:n,from:s,fromName:i,sentAt:bn(),read:!1}),this._cleanupOldMessages(o).catch(c=>{console.warn("[RTDBTransport] Failed to cleanup old messages:",c)})}listen(e,n){const s=q();if(!s)return console.warn("[RTDBTransport] Cannot listen to messages: not logged in"),()=>{};const r=this._getConversationId(s,e),i=k(R,`conversations/${r}/messages`),o=new Set,a=c=>{const l=c.key,u=c.val();if(!u||o.has(l))return;o.add(l);const d=u.from===s;n(u.text,u,d)};return ws(i,a),()=>{Tt(i,"child_added",a)}}async getUnreadCount(e){const n=q();if(!n)return 0;const s=this._getConversationId(n,e),r=k(R,`conversations/${s}/messages`),{get:i}=await lt(async()=>{const{get:o}=await Promise.resolve().then(()=>ck);return{get:o}},void 0);try{const o=await i(r);if(!o.exists())return 0;const a=o.val();return Object.values(a).filter(c=>!c.read&&c.from===e).length}catch(o){return console.warn("[RTDBTransport] Failed to get unread count:",o),0}}async markAsRead(e){const n=q();if(!n)return;const s=this._getConversationId(n,e),r=k(R,`conversations/${s}/messages`);try{const i=await tt(r);if(!i.exists())return;const o=i.val(),a={};Object.entries(o).forEach(([c,l])=>{!l.read&&l.from===e&&(a[`conversations/${s}/messages/${c}/read`]=!0)}),Object.keys(a).length>0&&await En(k(R),a)}catch(i){console.warn("[RTDBTransport] Failed to mark messages as read:",i)}}listenToUnreadCount(e,n){const s=q();if(!s)return console.warn("[RTDBTransport] Cannot listen to unread count: not logged in"),()=>{};const r=this._getConversationId(s,e),i=k(R,`conversations/${r}/messages`),o=async()=>{try{const l=await this.getUnreadCount(e);n(l)}catch(l){console.warn("[RTDBTransport] Failed to get unread count:",l)}},a=async l=>{const u=l.val();u&&u.from===e&&!u.read&&await o()},c=async l=>{const u=l.val();u&&u.from===e&&await o()};return ws(i,a),Eg(i,c),()=>{Tt(i,"child_added",a),Tt(i,"child_changed",c)}}async _cleanupOldMessages(e){const n=k(R,`conversations/${e}/messages`),s=await tt(n);if(!s.exists())return;const r=s.val(),i=Object.keys(r).length;if(i<=Nh)return;const o=i-Nh,a=Object.entries(r).sort((l,u)=>(l[1].sentAt||0)-(u[1].sentAt||0)),c={};for(let l=0;l<o;l++){const[u]=a[l];c[`conversations/${e}/messages/${u}`]=null}await En(k(R),c),console.log(`[RTDBTransport] Cleaned up ${o} old messages from conversation ${e}`)}}class uP{constructor(e,n=null){if(!e)throw new Error("MessagingController requires a transport implementation");this.transport=e,this.fileTransport=n,this.sessions=new Map}openSession(e,{onMessage:n,onUnreadChange:s}={}){if(!e||typeof e!="string")throw new Error("contactId must be a non-empty string");if(this.sessions.has(e))return console.info(`[MessagingController] Session already open for ${e}`),this.sessions.get(e);const r=this.transport.listen(e,(o,a,c)=>{n&&typeof n=="function"&&n(o,a,c),!c&&s&&typeof s=="function"&&this.transport.getUnreadCount(e).then(l=>s(l)).catch(l=>console.warn("[MessagingController] Failed to get unread count:",l))}),i={contactId:e,send:o=>!o||typeof o!="string"?Promise.reject(new Error("Message text must be a non-empty string")):this.transport.send(e,o),markAsRead:()=>this.transport.markAsRead(e),getUnreadCount:()=>this.transport.getUnreadCount(e),close:()=>{this.closeSession(e)},_unsubscribe:r};return this.sessions.set(e,i),i}closeSession(e){const n=this.sessions.get(e);n&&(n._unsubscribe&&typeof n._unsubscribe=="function"&&n._unsubscribe(),this.sessions.delete(e))}getSession(e){return this.sessions.get(e)}getAllSessions(){return Array.from(this.sessions.values())}closeAllSessions(){this.sessions.forEach(e=>{e._unsubscribe&&typeof e._unsubscribe=="function"&&e._unsubscribe()}),this.sessions.clear()}async getUnreadCount(e){if(!e||typeof e!="string")throw new Error("contactId must be a non-empty string");return this.transport.getUnreadCount(e)}listenToUnreadCount(e,n){if(!e||typeof e!="string")throw new Error("contactId must be a non-empty string");if(typeof n!="function")throw new Error("onCountChange must be a function");return this.transport.listenToUnreadCount(e,n)}setFileTransport(e){this.fileTransport=e}canSendFiles(){return this.fileTransport!==null&&this.fileTransport.isReady()}async sendFile(e,n){if(!this.fileTransport)throw new Error("File transport not available. Files can only be sent during active calls.");if(!this.fileTransport.isReady())throw new Error("File transport not ready");return this.fileTransport.sendFile(e,n)}onFileReceived(e){if(!this.fileTransport)throw new Error("File transport not available");if(typeof e!="function")throw new Error("onFileReceived callback must be a function");this.fileTransport.onFileReceived(e)}clearFileTransport(){this.fileTransport&&(this.fileTransport.cleanup(),this.fileTransport=null)}}const Jt=new uP(new lP);function to(t,e,n={}){if(!t||typeof e!="function")throw new Error("closeOnClickOutside: valid element and onClose callback required");const{ignore:s=[],esc:r=!0,events:i=["mousedown","touchstart"]}=n,o=Array.isArray(s)?s.filter(Boolean):[],a=l=>{try{const u=l.target;if(t.contains(u))return;for(const d of o)if(d&&d.contains&&d.contains(u)||d===u)return;e(l)}catch(u){console.error("closeOnClickOutside handler error:",u)}},c=l=>{r&&l.key==="Escape"&&e(l)};return i.forEach(l=>document.addEventListener(l,a,{passive:!0})),r&&document.addEventListener("keydown",c),function(){i.forEach(u=>document.removeEventListener(u,a,{passive:!0})),r&&document.removeEventListener("keydown",c)}}function s_({parent:t,onToggle:e,icon:n="💬",initialUnreadCount:s=0,id:r=null,startHidden:i=!1}={}){if(!t)return console.error("createMessageToggle: parent element is required"),null;if(typeof e!="function")return console.error("createMessageToggle: onToggle callback is required"),null;const o=zl({initialProps:{unreadCount:s},template:`
      <div class="messages-toggle-btn">
        <button onclick="handleToggle">
          ${n}
          <span class="notification-badge">
            \${unreadCount}
          </span>
        </button>
      </div>
    `,handlers:{handleToggle:c=>{c.preventDefault(),c.stopPropagation(),e()}},className:"messages-toggle-container"+(i?" hidden":""),autoAppend:!1});if(r&&o&&typeof r=="string")try{o.id=r}catch(c){console.warn("createMessageToggle: failed to set id on toggleContainer",c)}let a=o.querySelector(".notification-badge");return a&&(a.style.display=s>0?"flex":"none"),o.onPropUpdated("unreadCount",c=>{const l=o.querySelector(".notification-badge");if(l&&(l.style.display=c>0?"flex":"none"),c>0){const u=o.querySelector(".messages-toggle-btn");u&&(u.classList.add("new-message"),setTimeout(()=>{u.classList.remove("new-message")},4e3))}}),t.appendChild(o),{element:o,setUnreadCount(c){let l=Number(c);(!Number.isFinite(l)||l<0)&&(l=0),o.unreadCount=l},clearBadge(){this.setUnreadCount(0)},cleanup(){if(o&&typeof o.dispose=="function")try{o.dispose()}catch(c){console.warn("createMessageToggle: error during dispose()",c)}if(o&&o.parentNode)try{o.parentNode.removeChild(o)}catch{}}}}function Ph(t=!1){if(typeof window>"u"||typeof navigator>"u")return!1;const e=navigator.userAgent||navigator.vendor||"",n=/iPad|iPhone|iPod/.test(e),s=/Macintosh/.test(e)&&typeof navigator.maxTouchPoints=="number"&&navigator.maxTouchPoints>1,r=(n||s)&&!window.MSStream,i=/Android/i.test(e),o=r||i;return t&&console.table({"User Agent":e,isAndroid:i,isiOSUA:n,isiPadOSDesktopUA:s,isMobileDevice:o}),o}function dP(){const t=document.createElement("div");t.innerHTML=`
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
  `,document.body.appendChild(t);const e=t.querySelector("#messages-box"),n=t.querySelector("#messages"),s=t.querySelector("#messages-form"),r=t.querySelector("#messages-input");if("virtualKeyboard"in navigator&&(navigator.virtualKeyboard.overlaysContent=!0),r&&r.tagName==="TEXTAREA"){r.style.overflow="hidden",r.style.resize="none";const i=()=>{r.style.height="auto",r.style.height=`${r.scrollHeight}px`};r.addEventListener("input",i,{passive:!0}),requestAnimationFrame(i)}return{messagesBoxContainer:t,messagesBox:e,messagesMessages:n,messagesForm:s,messagesInput:r}}const hP=CSS.supports?.("position-anchor: --msg-toggle")&&CSS.supports?.("right: anchor(right)")&&CSS.supports?.("bottom: anchor(top)");function fP(t){const e=t.getBoundingClientRect();return e.top>=0&&e.left>=0&&e.bottom<=window.innerHeight&&e.right<=window.innerWidth}function pP(){let t=!1,e=null,n=null,s=!1,r=new Map;const i=document.querySelector(".top-bar .top-right-menu")||document.querySelector(".top-right-menu"),o=s_({parent:i,onToggle:()=>Ho(),icon:"💬",initialUnreadCount:0,id:"main-messages-toggle-btn",startHidden:!0});if(!o)return console.error("Messages UI: failed to initialize message toggle; aborting messages UI initialization."),null;const a=o.element,{messagesBoxContainer:c,messagesBox:l,messagesMessages:u,messagesForm:d,messagesInput:h}=dP();if(!a||!l||!u||!d||!h)return console.error("Messages UI elements not found."),null;const f=document.getElementById("attach-file-btn"),p=document.getElementById("file-input"),_=d.querySelector('button[type="submit"]');v(f),f.addEventListener("click",()=>{p.click()}),p.addEventListener("change",async T=>{const S=T.target.files[0];if(!S||!n){n||console.warn("[MessagesUI] FileTransfer not initialized");return}const P=_.textContent;_.textContent="Sending...";try{await n.sendFile(S,U=>{_.textContent=`${Math.round(U*100)}%`}),S.type.startsWith("video/")&&r.set(S.name,S),we(`📎 You sent: ${S.name}`)}catch(U){console.error("[MessagesUI] File send failed:",U),we("❌ Failed to send file")}finally{_.textContent=P,p.value=""}});async function m(T){return new Promise(S=>{const P=document.createElement("div");P.className="file-action-overlay",P.style.cssText=`
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
      `;const U=document.createElement("div");U.className="file-action-prompt",U.style.cssText=`
        background: var(--bg-primary, #1a1a1a);
        border: 1px solid var(--border-color, #333);
        border-radius: 12px;
        padding: 24px;
        max-width: 400px;
        width: 90%;
        box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);
      `,U.innerHTML=`
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
      `,P.appendChild(U),document.body.appendChild(P);const me=U.querySelector("#file-name-display");me.textContent=T;const le=U.querySelector("#download-file-btn"),re=U.querySelector("#watch-together-btn");le.addEventListener("mouseenter",()=>{le.style.background="var(--bg-hover, #333)"}),le.addEventListener("mouseleave",()=>{le.style.background="var(--bg-secondary, #2a2a2a)"}),re.addEventListener("mouseenter",()=>{re.style.opacity="0.9"}),re.addEventListener("mouseleave",()=>{re.style.opacity="1"}),le.addEventListener("click",()=>{P.remove(),S("download")}),re.addEventListener("click",()=>{P.remove(),S("watch")}),P.addEventListener("click",Vo=>{Vo.target===P&&(P.remove(),S("download"))})})}async function A(T){return new Promise(S=>{const P=document.createElement("div");P.className="watch-request-overlay",P.style.cssText=`
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
      `;const U=document.createElement("div");U.className="watch-request-prompt",U.style.cssText=`
        background: var(--bg-primary, #1a1a1a);
        border: 1px solid var(--border-color, #333);
        border-radius: 12px;
        padding: 24px;
        max-width: 400px;
        width: 90%;
        box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);
      `,U.innerHTML=`
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
      `,P.appendChild(U),document.body.appendChild(P);const me=U.querySelector("#watch-request-filename");me.textContent=T;const le=U.querySelector("#decline-watch-btn"),re=U.querySelector("#accept-watch-btn");le.addEventListener("mouseenter",()=>{le.style.background="var(--bg-hover, #333)"}),le.addEventListener("mouseleave",()=>{le.style.background="var(--bg-secondary, #2a2a2a)"}),re.addEventListener("mouseenter",()=>{re.style.opacity="0.9"}),re.addEventListener("mouseleave",()=>{re.style.opacity="1"}),le.addEventListener("click",()=>{P.remove(),S(!1)}),re.addEventListener("click",()=>{P.remove(),S(!0)}),P.addEventListener("click",Vo=>{Vo.target===P&&(P.remove(),S(!1))})})}window.onFileWatchRequestReceived=async T=>{const S=r.get(T);if(!S){we(`❌ File not available to watch together: ${T}`),await mc();return}we(`🎬 Partner wants to watch: ${T}`),await A(T)?(we("✅ Joining watch together..."),await BN(S)||we("❌ Failed to load video")):(we("❌ Declined watch together request"),await mc())};function x(){if(!a||!l||l.classList.contains("hidden"))return;const T=a.getBoundingClientRect(),S=l.getBoundingClientRect(),P=8;let U=T.top-S.height-P;U<8&&(U=T.bottom+P);let me=T.left+T.width/2-S.width/2;const le=window.innerWidth-S.width-8;me<8&&(me=8),me>le&&(me=le),l.style.top=`${Math.round(U)}px`,l.style.left=`${Math.round(me)}px`}function $(){t||(t=!0,window.addEventListener("resize",x,{passive:!0}),window.addEventListener("scroll",x,{passive:!0}),window.addEventListener("orientationchange",x,{passive:!0}))}function w(){t&&(t=!1,window.removeEventListener("resize",x),window.removeEventListener("scroll",x),window.removeEventListener("orientationchange",x))}let ce=null;const ze=new MutationObserver(T=>{T.forEach(S=>{S.type==="attributes"&&S.attributeName==="class"&&(l.classList.contains("hidden")||(o.clearBadge(),e?.toggle&&e.toggle.clearBadge()))})});ze.observe(l,{attributes:!0});function Me(){return!l.classList.contains("hidden")}function be(){return document.activeElement===h}function Vn(){be()||h.focus()}function Gr(){be()&&h.blur()}function Ho(){l.classList.toggle("hidden"),Me()?(Ph()||h.focus(),hP?requestAnimationFrame(()=>{fP(l)||(x(),$())}):(x(),$()),fu()):(document.activeElement===h&&h.blur(),w(),l.style.top="",l.style.left="",l.style.bottom="",l.style.right="")}Ph()||(ce=to(l,()=>{v(l),w(),l.style.top="",l.style.left="",l.style.bottom="",l.style.right=""},{ignore:[o.element],esc:!0}));function v_(){D(o.element)}function hu(){v(o.element)}function we(T,S={}){const P=document.createElement("p");if(S.fileDownload){const{fileName:U,url:me}=S.fileDownload,le=T.split(U)[0];P.textContent=le;const re=document.createElement("a");re.textContent=U,re.href=me,re.download=U,re.style.cursor="pointer",re.style.textDecoration="underline",re.addEventListener("click",()=>{setTimeout(()=>URL.revokeObjectURL(me),100)}),P.appendChild(re)}else P.textContent=T;T.startsWith("You:")?P.style.textAlign="right":T.startsWith("Partner:")&&(P.style.textAlign="left"),u.appendChild(P),fu()}let ln=null;function fu(){u&&(ln!==null&&cancelAnimationFrame(ln),ln=requestAnimationFrame(()=>{u.scrollTop=u.scrollHeight,ln=null}))}function w_(T,{isUnread:S=!0}={}){if(we(`Partner: ${T}`),Yi(l)&&S){const P=o.element.unreadCount||0;o.setUnreadCount(P+1)}}d.addEventListener("submit",T=>{T.preventDefault();const S=h.value.trim();S&&(e?(e.send(S),h.value=""):console.warn("[MessagesUI] No active session to send message"))});const E_=()=>{const T=document.activeElement;return T&&(T.tagName==="INPUT"||T.tagName==="TEXTAREA"||T.isContentEditable)},pu=T=>{(T.key==="m"||T.key==="M")&&!Me()&&!E_()&&(T.preventDefault(),Ho())};document.addEventListener("keydown",pu);function Wo(){ln!==null&&(cancelAnimationFrame(ln),ln=null),u.innerHTML="",u.scrollTop=0}function b_(T){e!==null&&e!==T&&Wo(),e=T}function C_(){return e}function S_(T){n=T,n?(D(f),n.onFileReceived=async S=>{const P=URL.createObjectURL(S);if(S.type.startsWith("video/"))if(await m(S.name)==="watch"){if(we(`📹 Partner sent video: ${S.name}`),we("🎬 Requesting partner to join watch together..."),!await Tr(S)){we("❌ Failed to load video");return}const le=await $N(S.name);we(le?"⏳ Waiting for partner to join...":"❌ Failed to send watch request")}else{const me=document.createElement("a");me.href=P,me.download=S.name,me.click(),setTimeout(()=>URL.revokeObjectURL(P),1e3),we(`📎 Downloaded: ${S.name}`)}else we(`📎 Partner sent: ${S.name}`,{fileDownload:{fileName:S.name,url:P}});if(Yi(l)){const U=o.element.unreadCount||0;o.setUnreadCount(U+1)}s&&(_.textContent="Send",s=!1)},n.onReceiveProgress=S=>{s=!0,_.textContent=`${Math.round(S*100)}%`}):v(f)}function T_(){Wo(),e=null,n=null,s=!1,hu(),v(l),o.clearBadge(),h.value="",_&&(_.textContent="Send"),v(f),l.style.top="",l.style.left="",l.style.bottom="",l.style.right="",w()}function I_(){if(o&&o.cleanup(),w(),typeof ce=="function")try{ce()}catch(T){console.error("Error removing messages box outside click handler:",T)}ze.disconnect(),document.removeEventListener("keydown",pu),c&&c.parentNode&&c.parentNode.removeChild(c)}return{appendChatMessage:we,receiveMessage:w_,isMessagesUIOpen:Me,toggleMessages:Ho,showMessagesToggle:v_,hideMessagesToggle:hu,isMessageInputFocused:be,focusMessageInput:Vn,unfocusMessageInput:Gr,setSession:b_,getCurrentSession:C_,clearMessages:Wo,setFileTransfer:S_,reset:T_,cleanup:I_}}const Ce=pP();function no(t,e){if(!t||!e)throw new Error("Both user IDs are required");if(t===e)throw new Error("Cannot create room ID for same user");const[n,s]=[t,e].sort(),r=`${n}_${s}`;let i=0;for(let u=0;u<r.length;u++){const d=r.charCodeAt(u);i=(i<<5)-i+d,i=i&i}let o=5381;for(let u=0;u<r.length;u++)o=(o<<5)+o+r.charCodeAt(u);const a=Math.abs(i).toString(36),c=Math.abs(o).toString(36);return(a+c).slice(0,16).padEnd(16,"0")}const ya=new Map,va=new Map,Jn=new Map,Lh=14;async function vc(t,e,n){const s=q();if(s){const r=k(R,`users/${s}/contacts/${t}`);await se(r,{contactId:t,contactName:e,roomId:n,savedAt:Date.now()});return}try{const r=localStorage.getItem("contacts")||"{}",i=JSON.parse(r);i[t]={contactId:t,contactName:e,roomId:n,savedAt:Date.now()},localStorage.setItem("contacts",JSON.stringify(i))}catch(r){console.warn("Failed to save contact to localStorage",r)}}async function kr(){const t=q();if(t)try{const e=k(R,`users/${t}/contacts`),n=await tt(e);return n.exists()?n.val():{}}catch(e){return console.warn("Failed to read contacts from RTDB",e),{}}try{const e=localStorage.getItem("contacts")||"{}";return JSON.parse(e)}catch(e){return console.warn("Failed to read contacts from localStorage",e),{}}}async function gP(t,e){if(!t)return e||"Unknown";try{const n=await kr();for(const s of Object.values(n||{}))if(s?.roomId===t)return s.contactName||s.contactId||e}catch(n){console.warn("Failed to resolve caller name",n)}return e||"Unknown"}async function mP(t,e,n){if(!t||!e)return;const r=(await kr())?.[t];if(r){r.roomId!==e&&(await vc(t,r.contactName,e),await Un(n)),bs(e);return}if(!await Bo("Save contact?",{autoRemoveSeconds:15}))return;const o=window.prompt("Enter a name for this contact:",t)||t;await vc(t,o,e),bs(e),await Un(n)}async function Un(t){if(!t)return;const e=await kr(),n=Object.keys(e);let s=t.querySelector(".contacts-container");if(s||(s=document.createElement("div"),s.className="contacts-container",t.appendChild(s)),n.length===0){s.innerHTML="<p>No saved contacts yet.</p>",v(s);return}D(s),s.innerHTML=`
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
                ${i.contactName&&i.contactName.length>Lh?i.contactName.slice(0,Lh-2)+"..":i.contactName}
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
  `,_P(s,t),yP(n),await vP(s,n,e)}function _P(t,e){t.querySelectorAll(".contact-message-btn").forEach(n=>{n.onclick=s=>{s.stopPropagation();const r=n.getAttribute("data-contact-id"),i=n.getAttribute("data-contact-name");r&&iu(r,i)}}),t.querySelectorAll(".contact-name").forEach(n=>{n.onclick=async()=>{let s=n.getAttribute("data-room-id");const r=n.getAttribute("data-contact-name"),i=n.getAttribute("data-contact-id");if(!s&&i){const o=q();if(o)try{s=no(o,i),console.log("[CONTACTS] Generated deterministic room ID:",s),await vc(i,r,s),n.setAttribute("data-room-id",s)}catch(a){console.error("[CONTACTS] Failed to generate or save room ID:",a);return}}s&&(bs(s),await zr(s,{forceInitiator:!0}).catch(a=>(console.warn("Failed to call contact:",a),!1))&&await n_(s,r))}}),t.querySelectorAll(".contact-delete-btn").forEach(n=>{n.onclick=async()=>{const s=n.getAttribute("data-contact-id");!s||!window.confirm("Delete this contact?")||(await wP(s),await Un(e))}})}function iu(t,e,n=!1){if(!q()){alert("Please sign in to send messages");return}if(Jt.getSession(t)){Ce.showMessagesToggle(),n&&!Ce.isMessagesUIOpen()&&Ce.toggleMessages();return}Jt.getAllSessions().forEach(a=>{a.close()}),Ce.clearMessages(),Ce.setSession(null);const i=Jt.openSession(t,{onMessage:(a,c,l)=>{if(l)Ce.appendChatMessage(`You: ${a}`);else{const u=!c.read;Ce.receiveMessage(a,{isUnread:u})}}});i.contactName=e,i.toggle=Jn.get(t),Ce.setSession(i),Ce.showMessagesToggle(),n&&!Ce.isMessagesUIOpen()&&Ce.toggleMessages(),i.markAsRead().catch(a=>{console.warn("Failed to mark messages as read:",a)});const o=Jn.get(t);o&&o.clearBadge()}function yP(t){ya.forEach(({ref:e,callback:n})=>{Tt(e,"value",n)}),ya.clear(),q()&&t.forEach(e=>{const n=k(R,`users/${e}/presence`),s=document.querySelector(`.presence-indicator[data-contact-id="${e}"]`);if(!s)return;const r=i=>{const a=i.val()?.state==="online";s.style.backgroundColor=a?"#00d26a":"#444",s.title=a?"Online":"Offline"};Tl(n,r),ya.set(e,{ref:n,callback:r})})}let Gs=!1,qn=null;async function vP(t,e,n){if(!q())return;const s=10;let r=0;for(;Gs&&r<s;)await new Promise(i=>setTimeout(i,100)),r++;if(Gs){console.debug("[CONTACTS] Toggle replacement still in progress after waiting, skipping");return}Gs=!0,qn&&clearTimeout(qn),qn=setTimeout(()=>{console.warn("[CONTACTS] Toggle replacement timeout - forcing flag reset"),Gs=!1},5e3);try{Jn.forEach(o=>{o.cleanup()}),Jn.clear(),va.forEach(o=>{o()}),va.clear();const i=q();for(const o of e){const a=n[o],c=t.querySelector(`.contact-msg-toggle-container[data-contact-id="${o}"]`);if(!c){console.warn(`[CONTACTS] No toggle container found for contact ${o}`);continue}const l=s_({parent:c,onToggle:()=>iu(o,a.contactName,!0),icon:"💬",initialUnreadCount:0});if(!l){console.error(`[CONTACTS] Failed to create toggle for contact ${o}`);continue}Jn.set(o,l);const u=Jt.listenToUnreadCount(o,d=>{l.setUnreadCount(d)});va.set(o,u)}Promise.all(e.map(o=>Jt.getUnreadCount(o).then(a=>{const c=Jn.get(o);c&&c.setUnreadCount(a)}).catch(a=>console.warn(`[CONTACTS] Failed to get unread count for ${o}:`,a))))}finally{qn&&(clearTimeout(qn),qn=null),Gs=!1}}async function wP(t){const e=q();if(e){try{await Ve(k(R,`users/${e}/contacts/${t}`))}catch(n){console.warn("Failed to delete contact from RTDB",n)}return}try{const n=localStorage.getItem("contacts")||"{}",s=JSON.parse(n);s[t]&&(delete s[t],localStorage.setItem("contacts",JSON.stringify(s)))}catch(n){console.warn("Failed to delete contact from localStorage",n)}}let mi=null,ct=null;async function r_(t,e="User"){const n=q(),s=xn();if(!n||!s)throw new Error("Must be logged in to send invites");if(!t)throw new Error("Recipient user ID is required");const r=no(n,t),i=k(R,`users/${t}/incomingInvites/${n}`),o={fromUserId:n,fromName:s.displayName||"Anonymous",fromEmail:s.email||"",fromPhotoURL:s.photoURL||null,roomId:r,timestamp:Date.now(),status:"pending"};await se(i,o),console.log(`[INVITATIONS] Sent invite to ${e} (${t})`)}function EP(t){const e=q();if(!e)return console.warn("[INVITATIONS] Cannot listen for invites - not logged in"),()=>{};wc();const n=k(R,`users/${e}/incomingInvites`);return mi=ws(n,s=>{const r=s.key,i=s.val();i&&i.status==="pending"&&(console.log(`[INVITATIONS] New invite from ${i.fromName}`),t(r,i))}),console.log("[INVITATIONS] Listening for incoming invites"),wc}async function bP(t,e){const n=q(),s=xn();if(!n||!s)throw new Error("Must be logged in to accept invites");const r=k(R,`users/${n}/contacts/${t}`);await se(r,{contactId:t,contactName:e.fromName||"User",roomId:e.roomId,savedAt:Date.now()});const i=k(R,`users/${t}/acceptedInvites/${n}`);await se(i,{acceptedByUserId:n,acceptedByName:s.displayName||"User",acceptedByEmail:s.email||"",acceptedByPhotoURL:s.photoURL||null,roomId:e.roomId,timestamp:Date.now()});const o=k(R,`users/${n}/incomingInvites/${t}`);await Ve(o),console.log(`[INVITATIONS] Accepted invite from ${e.fromName} and notified sender`)}async function CP(t){const e=q();if(!e)throw new Error("Must be logged in to decline invites");const n=k(R,`users/${e}/incomingInvites/${t}`);await Ve(n),console.log(`[INVITATIONS] Declined invite from ${t}`)}function SP(t){const e=q();if(!e)return console.warn("[INVITATIONS] Cannot listen for accepted invites - not logged in"),()=>{};ct&&(ct(),ct=null);const n=k(R,`users/${e}/acceptedInvites`);return ct=ws(n,async s=>{const r=s.key,i=s.val();if(i)try{const o=k(R,`users/${e}/contacts/${r}`);await se(o,{contactId:r,contactName:i.acceptedByName||"User",roomId:i.roomId,savedAt:Date.now()}),console.log(`[INVITATIONS] Auto-saved contact: ${i.acceptedByName} (invite accepted)`);const a=k(R,`users/${e}/acceptedInvites/${r}`);await Ve(a),t&&t(r,i)}catch(o){console.error("[INVITATIONS] Failed to auto-save contact from accepted invite:",o)}}),console.log("[INVITATIONS] Listening for accepted invites"),()=>{ct&&(ct(),ct=null)}}function wc(){mi&&(mi(),mi=null),ct&&(ct(),ct=null),console.log("[INVITATIONS] Cleaned up all invite listeners")}const TP="https://people.googleapis.com/v1/people/me/connections",IP="https://people.googleapis.com/v1/otherContacts";async function kP(t){if(!t)throw new Error("Access token is required");const e=[],n=await Oh(t,TP,"names,emailAddresses");console.log(`[GOOGLE CONTACTS] My Contacts: ${n.length}`),e.push(...n);const s=await Oh(t,IP,"names,emailAddresses");console.log(`[GOOGLE CONTACTS] Other Contacts: ${s.length}`),e.push(...s),console.log(`[GOOGLE CONTACTS] Total: ${e.length} contacts with email addresses`);const r=new Set;return e.filter(o=>r.has(o.email)?!1:(r.add(o.email),!0))}async function Oh(t,e,n){const s=[];let r=null;do{const i=new URL(e);i.searchParams.set("pageSize","100"),e.includes("otherContacts")?i.searchParams.set("readMask",n):i.searchParams.set("personFields",n),r&&i.searchParams.set("pageToken",r);const o=await fetch(i.toString(),{headers:{Authorization:`Bearer ${t}`}});if(!o.ok){const l=await o.json().catch(()=>({}));if(e.includes("otherContacts"))return console.warn("[GOOGLE CONTACTS] Other contacts fetch failed (may need additional scope):",l.error?.message),s;throw console.error("[GOOGLE CONTACTS] API error:",l),new Error(l.error?.message||`API error: ${o.status}`)}const a=await o.json(),c=a.connections||a.otherContacts||[];for(const l of c){const u=l.emailAddresses||[],h=(l.names||[])[0]?.displayName||"Unknown";for(const f of u)f.value&&s.push({email:f.value.toLowerCase().trim(),name:h})}r=a.nextPageToken}while(r);return s}async function RP(){return new Promise(t=>{const e=document.createElement("dialog");e.classList.add("add-contact-modal"),e.innerHTML=`
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
    `;const n=e.querySelector("#add-contact-form"),s=e.querySelector("#contact-email-input"),r=e.querySelector("#search-status"),i=e.querySelector('[data-action="cancel"]'),o=e.querySelector('[data-action="search"]'),a=e.querySelector("#import-google-btn"),c=e.querySelector("#import-status"),l=e.querySelector("#import-results");function u(){e.close(),e.remove(),t()}i.addEventListener("click",u),e.addEventListener("cancel",u),n.addEventListener("submit",async d=>{d.preventDefault();const h=s.value.trim();if(h){o.disabled=!0,s.disabled=!0,r.textContent="Searching...",r.className="search-status searching";try{const f=await Tm(h);if(!f){r.textContent=`${h} is not on HangVidU yet.`,r.className="search-status not-found",o.disabled=!1,s.disabled=!1;return}const p=xn();if(p&&f.uid===p.uid){r.textContent="That's your own email address!",r.className="search-status error",o.disabled=!1,s.disabled=!1;return}r.textContent=`Found ${f.displayName}! Sending invitation...`,r.className="search-status found",await r_(f.uid,f.displayName),r.textContent=`✓ Invitation sent to ${f.displayName}!`,r.className="search-status success",setTimeout(u,1500)}catch(f){console.error("[ADD CONTACT] Error searching for user:",f),r.textContent="Error searching for user. Please try again.",r.className="search-status error",o.disabled=!1,s.disabled=!1}}}),a.addEventListener("click",async()=>{a.disabled=!0,c.textContent="Requesting access...",c.className="import-status loading",l.innerHTML="";try{const d=await Pm();c.textContent="Fetching contacts...";const h=await kP(d);if(h.length===0){c.textContent="No contacts with email addresses found.",c.className="import-status not-found",a.disabled=!1;return}c.textContent=`Found ${h.length} contacts. Checking HangVidU...`;const f=h.map(x=>x.email),p=await cN(f),_=xn(),m=[],A=[];for(const x of h){const $=p[x.email];$&&$.uid!==_?.uid?m.push({...x,user:$}):$||A.push(x)}c.textContent=`${m.length} on HangVidU, ${A.length} not yet`,c.className="import-status success",AP(l,m,A),a.disabled=!1}catch(d){console.error("[ADD CONTACT] Import error:",d),d.message==="Authorization cancelled"?(c.textContent="Import cancelled.",c.className="import-status cancelled"):(c.textContent=`Error: ${d.message}`,c.className="import-status error"),a.disabled=!1}}),document.body.appendChild(e),e.showModal()})}function AP(t,e,n){if(t.innerHTML="",e.length>0){const s=document.createElement("div");s.className="results-section",s.innerHTML=`<h4>On HangVidU (${e.length})</h4>`;const r=document.createElement("ul");r.className="contact-list";for(const{name:i,email:o,user:a}of e){const c=document.createElement("li");c.className="contact-item",c.innerHTML=`
        <span class="contact-info">
          <strong>${ii(i)}</strong>
          <small>${ii(o)}</small>
        </span>
        <button type="button" class="invite-btn" data-uid="${ii(a.uid)}" data-name="${ii(a.displayName)}">
          Invite
        </button>
      `;const l=c.querySelector(".invite-btn");l.addEventListener("click",async()=>{l.disabled=!0,l.textContent="Sending...";try{await r_(a.uid,a.displayName),l.textContent="✓ Sent",l.classList.add("sent")}catch(u){console.error("[ADD CONTACT] Invite error:",u),l.textContent="Error",l.disabled=!1}}),r.appendChild(c)}s.appendChild(r),t.appendChild(s)}if(e.length===0&&n.length>0){const s=document.createElement("div");s.className="empty-state",s.innerHTML=`
      <p>None of your ${n.length} contacts are on HangVidU yet.</p>
      <p>Be the first to invite them!</p>
    `,t.appendChild(s)}if(n.length>0&&e.length>0){const s=document.createElement("div");s.className="results-section not-on-app",s.innerHTML=`<p class="muted-text">${n.length} contacts not on HangVidU yet</p>`,t.appendChild(s)}}function ii(t){const e=document.createElement("div");return e.textContent=t||"",e.innerHTML.replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function NP(){const t=document.querySelector("link[rel~='icon']");return t?t.href:"/favicon.ico"}class PP{constructor(){this.originalTitle=document.title,this.originalFavicon=NP(),this.titleFlashInterval=null,this.isFlashing=!1,this.wakeLock=null,this.setupVisibilityListener()}setupVisibilityListener(){document.addEventListener("visibilitychange",()=>{!document.hidden&&this.isFlashing&&this.stopTitleFlashing()})}startCallIndicators(e){console.log(`[VisibilityManager] Starting call indicators for: ${e}`),this.startTitleFlashing(e),this.setFavicon("/icons/phone-ringing.svg"),this.setBadge(1),this.requestWakeLock()}stopCallIndicators(){console.log("[VisibilityManager] Stopping call indicators"),this.stopTitleFlashing(),this.restoreFavicon(),this.clearBadge(),this.releaseWakeLock()}startTitleFlashing(e){this.stopTitleFlashing();let n=!0;this.isFlashing=!0,document.title=`📞 Call from ${e}!`,this.titleFlashInterval=setInterval(()=>{this.isFlashing&&(document.title=n?`📞 Call from ${e}!`:this.originalTitle,n=!n)},1e3)}stopTitleFlashing(){this.titleFlashInterval&&(clearInterval(this.titleFlashInterval),this.titleFlashInterval=null),this.isFlashing=!1,document.title=this.originalTitle}setFavicon(e){const n=document.querySelector("link[rel~='icon']");n&&(n.href=e,console.log(`[VisibilityManager] Favicon changed to: ${e}`))}restoreFavicon(){this.setFavicon(this.originalFavicon)}setBadge(e){"setAppBadge"in navigator&&navigator.setAppBadge(e).then(()=>{console.log(`[VisibilityManager] Badge set to: ${e}`)}).catch(n=>{console.warn("[VisibilityManager] Badge not supported:",n)})}clearBadge(){"clearAppBadge"in navigator&&navigator.clearAppBadge().then(()=>{console.log("[VisibilityManager] Badge cleared")}).catch(e=>{console.warn("[VisibilityManager] Badge clear failed:",e)})}async requestWakeLock(){if("wakeLock"in navigator)try{this.wakeLock=await navigator.wakeLock.request("screen"),console.log("[VisibilityManager] Wake lock active"),this.wakeLock.addEventListener("release",()=>{console.log("[VisibilityManager] Wake lock released"),this.wakeLock=null},{once:!0})}catch(e){console.warn("[VisibilityManager] Wake lock failed:",e)}}releaseWakeLock(){if(this.wakeLock){const e=this.wakeLock;this.wakeLock=null,e.release().then(()=>{console.log("[VisibilityManager] Wake lock released manually")}).catch(n=>{console.warn("[VisibilityManager] Wake lock release failed:",n)})}}}const Dh=new PP,Rr=new WeakMap;function ou(t,e,n){if(!t||!n)throw new Error("setupIceCandidates: pc and roomId are required");if(Rr.has(t)||Rr.set(t,[]),e==="initiator")xh(t,"offerCandidates",n),Mh(t,"answerCandidates",n);else if(e==="joiner")xh(t,"answerCandidates",n),Mh(t,"offerCandidates",n);else throw new Error(`Invalid role: ${e} specified for ICE candidate setup.`)}function xh(t,e,n){t.onicecandidate=s=>{if(s.candidate){const r=Hi(e==="offerCandidates"?$g(n):Bg(n));se(r,s.candidate.toJSON())}}}function Mh(t,e,n){const s=e==="offerCandidates"?$g(n):Bg(n);let r=!1;const i=()=>{if(r)return;r=!0;const a=()=>{t.remoteDescription&&(au(t),t.removeEventListener("signalingstatechange",a))};t.addEventListener("signalingstatechange",a)};_n(s,"child_added",a=>{const c=a.val();if(!(!t||t.signalingState==="closed")&&c)if(t.remoteDescription)try{t.addIceCandidate(new RTCIceCandidate(c))}catch{}else{const l=Rr.get(t);l&&(l.push(c),l.length===1&&i())}},n)}function au(t){if(!t||!Rr.has(t))return;const e=Rr.get(t);if(e.length!==0){B(`🔄 Draining ${e.length} queued ICE candidate(s)`);for(const n of e)try{t.addIceCandidate(new RTCIceCandidate(n)).catch(s=>{B("Error adding queued ICE candidate:",s)})}catch{}e.length=0}}const LP=Object.freeze(Object.defineProperty({__proto__:null,drainIceCandidateQueue:au,setupIceCandidates:ou},Symbol.toStringTag,{value:"Module"}));let at=null,Fh=null;function i_(t){Fh=t,t.onconnectionstatechange=()=>{B("onconnectionstatechange:",t.connectionState),t.connectionState==="connected"?(su(),ru().catch(e=>console.warn("Failed to clear calling state on connect:",e)),at&&(clearTimeout(at),at=null)):t.connectionState==="disconnected"?(at&&clearTimeout(at),at=setTimeout(()=>{t===Fh&&t.connectionState==="disconnected"&&ve.cleanupCall({reason:"connection_lost"}),at=null},3e3)):t.connectionState==="failed"&&(xo(),at&&(clearTimeout(at),at=null),ve.cleanupCall({reason:"connection_failed"}))},t.addEventListener("iceconnectionstatechange",e=>{B("ICE iceconnectionstatechange:",t.iceConnectionState),t.iceConnectionState==="failed"&&(console.warn("ICE connection failed, restarting ICE..."),t.restartIce())})}const cu={iceServers:[{urls:"stun:stun.l.google.com:19302"}]},wa=new WeakMap;function o_(t,e,n){wa.has(t)||wa.set(t,{});const s=wa.get(t),r=e==="offer"?"lastOffer":"lastAnswer";return s[r]===n?!0:(s[r]=n,!1)}function a_(t,e){return t?e==="offer"?t.signalingState==="stable":t.signalingState==="have-local-offer"||t.signalingState==="stable":!1}function lu(t,e){e.getTracks().forEach(n=>{t.addTrack(n,e)})}async function c_(t){const e=await t.createOffer();return await t.setLocalDescription(e),e}async function l_(t){const e=await t.createAnswer();return await t.setLocalDescription(e),e}async function u_(t,e,n){if(o_(t,e.type,e.sdp))return console.debug(`Ignoring duplicate ${e.type} - already processed`),!1;if(!a_(t,e.type))return console.warn(`Ignoring ${e.type} - unexpected signaling state:`,t.signalingState),!1;try{return await t.setRemoteDescription(new RTCSessionDescription(e)),n(t),console.debug(`Remote description set (${e.type})`),!0}catch(s){return console.error(`Failed to set remote description (${e.type}):`,s),!1}}function d_(){return Math.random().toString(36).substring(2,9)}const OP=Object.freeze(Object.defineProperty({__proto__:null,addLocalTracks:lu,createAnswer:l_,createOffer:c_,generateRoomId:d_,isDuplicateSdp:o_,isValidSignalingState:a_,rtcConfig:cu,setRemoteDescription:u_},Symbol.toStringTag,{value:"Module"}));async function DP({localStream:t,remoteVideoEl:e,mutePartnerBtn:n,setupRemoteStream:s,setupWatchSync:r,targetRoomId:i=null}){if(!t)return{success:!1};const o=new RTCPeerConnection(cu),a="initiator",c=i||d_(),l=_e();lu(o,t);const u=o.createDataChannel("files");if(!s(o,e,n))return console.error("Error setting up remote stream"),o.close(),{success:!1};ou(o,a,c),i_(o);const h=await c_(o);await ee.createNewRoom(h,l,c),r(c,a,l);const f=`${window.location.origin}${window.location.pathname}?room=${c}`;return{success:!0,pc:o,roomId:c,roomLink:f,dataChannel:u,role:a}}async function xP({roomId:t,localStream:e,remoteVideoEl:n,mutePartnerBtn:s,setupRemoteStream:r,setupWatchSync:i,onMessagesUIReady:o=null}){if(!e)return{success:!1};if(!t)return{success:!1};const a=await ee.checkRoomStatus(t);if(!a.exists)return{success:!1};if(!a.hasMembers)return{success:!1};let c;try{c=await ee.getRoomData(t)}catch(m){return B("Error: "+m.message),{success:!1}}const l=c.offer;if(!l)return{success:!1};const u=new RTCPeerConnection(cu),d="joiner",h=_e();lu(u,e);let f=null;if(u.ondatachannel=m=>{f=m.channel,B("[Call Flow] DataChannel received by joiner",{label:f.label})},!r(u,n,s))return console.error("Error setting up remote stream for joiner"),u.close(),{success:!1};ou(u,d,t),i_(u),await u_(u,l,au);const _=await l_(u);try{await ee.saveAnswer(t,_)}catch(m){return console.error("Failed to save answer to Firebase:",m),u.close(),{success:!1}}return i(t,d,h),await ee.joinRoom(t,h),{success:!0,pc:u,roomId:t,dataChannel:f,role:d}}class MP{async sendFile(e,n){throw new Error("FileTransport.sendFile() must be implemented by subclass")}onFileReceived(e){throw new Error("FileTransport.onFileReceived() must be implemented by subclass")}onReceiveProgress(e){throw new Error("FileTransport.onReceiveProgress() must be implemented by subclass")}isReady(){throw new Error("FileTransport.isReady() must be implemented by subclass")}cleanup(){throw new Error("FileTransport.cleanup() must be implemented by subclass")}}const FP={FILE_CONFIG:{NETWORK_CHUNK_SIZE:65536}};async function UP(t){if(t instanceof ArrayBuffer)return t;if(t instanceof Blob)try{return await t.arrayBuffer()}catch(e){return console.error("[ChunkProcessor] Blob conversion failed:",e),null}else if(t instanceof Uint8Array||ArrayBuffer.isView(t))try{const e=t instanceof Uint8Array?t:new Uint8Array(t.buffer,t.byteOffset,t.byteLength),n=new ArrayBuffer(e.length);return new Uint8Array(n).set(e),n}catch(e){return console.error("[ChunkProcessor] TypedArray conversion failed:",e),null}else return console.error("[ChunkProcessor] Unknown data type:",Object.prototype.toString.call(t)),null}function $P(t){try{if(t.byteLength<4)return console.error("[ChunkProcessor] Invalid embedded packet - too small:",t.byteLength),null;const s=new DataView(t).getUint32(0,!0),r=4+s;if(t.byteLength<r)return console.error("[ChunkProcessor] Incomplete embedded packet - expected:",r,"got:",t.byteLength),null;const i=new Uint8Array(t,4,s),o=new TextDecoder().decode(i),a=JSON.parse(o),c=4+s,l=t.slice(c);return{chunkMeta:a,chunkData:l}}catch(e){return console.error("[ChunkProcessor] Failed to parse embedded packet:",e),null}}const BP=1024;function HP(t,e,n){let s=0,r=0;const i=[];t.forEach((c,l)=>{c instanceof ArrayBuffer?(r++,s+=c.byteLength):i.push(l)});const o=e-s;return{isComplete:r===n&&Math.abs(o)<=BP,validChunks:r,totalSize:s,missingChunks:i,sizeDifference:o}}const Ea=FP.FILE_CONFIG.NETWORK_CHUNK_SIZE,Uh=9e3*1024*1024;class WP{constructor(e){this.dataChannel=e,this.receivedChunks=new Map,this.fileMetadata=new Map,this.onFileError=null,this.onReceiveProgress=null}async sendFile(e,n){if(e.size>Uh)throw new Error(`File too large (max ${Uh/(1024*1024)} MB)`);if(this.dataChannel.readyState!=="open")throw new Error("DataChannel not ready");const s=`${e.name}-${e.size}-${Date.now()}`,r=Math.ceil(e.size/Ea);this.dataChannel.send(JSON.stringify({type:"FILE_META",fileId:s,name:e.name,size:e.size,mimeType:e.type,totalChunks:r}));for(let i=0;i<r;i++){const o=i*Ea,a=Math.min(o+Ea,e.size),c=await e.slice(o,a).arrayBuffer(),l={type:"FILE_CHUNK",fileId:s,chunkIndex:i,totalChunks:r},u=new TextEncoder().encode(JSON.stringify(l)),d=new ArrayBuffer(4+u.length+c.byteLength),h=new Uint8Array(d);for(new DataView(d).setUint32(0,u.length,!0),h.set(u,4),h.set(new Uint8Array(c),4+u.length),this.dataChannel.send(d),n&&n((i+1)/r);this.dataChannel.bufferedAmount>256*1024;)await new Promise(p=>setTimeout(p,10))}}async handleMessage(e){if(typeof e=="string"){const n=JSON.parse(e);n.type==="FILE_META"&&(this.fileMetadata.set(n.fileId,n),this.receivedChunks.set(n.fileId,[]),this.onFileMetaReceived?.(n))}else{const n=await UP(e);if(!n){console.error("[FileTransfer] Failed to convert binary data to ArrayBuffer");return}const s=$P(n);if(!s){console.error("[FileTransfer] Failed to parse embedded chunk packet");return}const{chunkMeta:r,chunkData:i}=s,o=this.receivedChunks.get(r.fileId);if(!o){console.error("[FileTransfer] Received chunk for unknown file:",r.fileId);return}if(o[r.chunkIndex]=i,this.onReceiveProgress){const a=o.filter(c=>c).length;this.onReceiveProgress(a/r.totalChunks)}o.filter(a=>a).length===r.totalChunks&&this.assembleFile(r.fileId)}}assembleFile(e){const n=this.fileMetadata.get(e),s=this.receivedChunks.get(e),r=HP(s,n.size,n.totalChunks);if(!r.isComplete){console.error("[FileTransfer] File assembly failed:",{fileId:e,fileName:n.name,...r}),this.onFileError&&this.onFileError({fileName:n.name,reason:"incomplete",details:r});return}const i=new Blob(s,{type:n.mimeType}),o=new File([i],n.name,{type:n.mimeType});this.onFileReceived?.(o),this.receivedChunks.delete(e),this.fileMetadata.delete(e)}}class VP extends MP{constructor(e){if(super(),!e)throw new Error("DataChannelFileTransport requires a DataChannel");this.dataChannel=e,this.fileTransfer=new WP(e),this._setupMessageHandling()}_setupMessageHandling(){this.dataChannel.onmessage=e=>{if(typeof e.data=="string")try{const n=JSON.parse(e.data);if(n.type==="FILE_META"||n.type==="FILE_CHUNK"){this.fileTransfer.handleMessage(e.data);return}}catch{}else this.fileTransfer.handleMessage(e.data)}}async sendFile(e,n){if(!this.isReady())throw new Error("DataChannel not ready");return this.fileTransfer.sendFile(e,n)}onFileReceived(e){if(typeof e!="function")throw new Error("onFileReceived callback must be a function");this.fileTransfer.onFileReceived=e}onReceiveProgress(e){if(typeof e!="function")throw new Error("onReceiveProgress callback must be a function");this.fileTransfer.onReceiveProgress=e}isReady(){return this.dataChannel&&this.dataChannel.readyState==="open"}cleanup(){this.dataChannel&&(this.dataChannel.onmessage=null),this.fileTransfer&&(this.fileTransfer.onFileReceived=null,this.fileTransfer.onFileMetaReceived=null),this.dataChannel=null,this.fileTransfer=null}}class jP{constructor(){this.listeners=new Map}on(e,n){this.listeners.has(e)||this.listeners.set(e,new Set),this.listeners.get(e).add(n)}off(e,n){this.listeners.has(e)&&this.listeners.get(e).delete(n)}emit(e,n){if(this.listeners.has(e))for(const s of Array.from(this.listeners.get(e)))try{s(n)}catch(r){console.warn("CallController listener error",r)}}}class qP{constructor(){this.emitter=new jP,this.resetState()}resetState(){this.state="idle",this.roomId=null,this.roomLink=null,this.role=null,this.partnerId=null,this.pc=null,this.dataChannel=null,this.messagesUI=null,this.localVideoEl=null,this.remoteVideoEl=null,this.isHangingUp=!1,this.isCleaningUp=!1,this.listeners=new Map}getState(){return{state:this.state,roomId:this.roomId,roomLink:this.roomLink,role:this.role,partnerId:this.partnerId,hasPc:!!this.pc,isHangingUp:this.isHangingUp,isCleaningUp:this.isCleaningUp}}on(e,n){this.emitter.on(e,n)}off(e,n){this.emitter.off(e,n)}setPartnerId(e){this.partnerId=e}setupCancellationListener(e){if(!e)return;const n=k(R,`rooms/${e}/cancellation`);let s=!1;const r=async i=>{const o=i.val();if(o&&!s){s=!0;try{this.remoteVideoEl&&(this.remoteVideoEl.srcObject=null)}catch(a){console.warn("Failed to clear remote video after cancellation",a)}try{this.pc&&this.pc.close()}catch{}try{await this.cleanupCall({reason:o.reason||"remote_cancelled"})}catch(a){console.warn("Failed to trigger CallController cleanup",a)}}};nr(n,r,e),this.listeners.has("cancellation")||this.listeners.set("cancellation",[]),this.listeners.get("cancellation").push({ref:n,callback:r,roomId:e})}setupAnswerListener(e,n,s){if(!e||!n)return;const r=k(R,`rooms/${e}/answer`),i=async o=>{const a=o.val();if(a){const{setRemoteDescription:c}=await lt(async()=>{const{setRemoteDescription:l}=await Promise.resolve().then(()=>OP);return{setRemoteDescription:l}},void 0);await c(n,a,s)}};nr(r,i,e),this.listeners.has("answer")||this.listeners.set("answer",[]),this.listeners.get("answer").push({ref:r,callback:i,roomId:e})}setupRejectionListener(e){if(!e)return;const n=k(R,`rooms/${e}/rejection`);let s=!1;const r=async i=>{const o=i.val();if(o&&!s&&(s=!0,this.pc?.connectionState!=="connected")){try{const{onCallRejected:a}=await lt(async()=>{const{onCallRejected:c}=await Promise.resolve().then(()=>iP);return{onCallRejected:c}},void 0);await a(o.reason||"user_rejected")}catch{}try{await ee.leaveRoom(_e(),e)}catch{}try{this.pc&&this.pc.close()}catch{}}};nr(n,r,e),this.listeners.has("rejection")||this.listeners.set("rejection",[]),this.listeners.get("rejection").push({ref:n,callback:r,roomId:e})}setupMemberJoinedListener(e){if(!e)return;const n=_e(),s=r=>{r.key!==n&&(this.setPartnerId(r.key),this.emitter.emit("memberJoined",{memberId:r.key,roomId:e}))};ee.onMemberJoined(e,s),this.listeners.has("member-joined")||this.listeners.set("member-joined",[]),this.listeners.get("member-joined").push({callback:s,roomId:e})}setupMemberLeftListener(e){if(!e)return;const n=_e(),s=r=>{r.key!==n&&this.pc?.connectionState==="connected"&&this.emitter.emit("memberLeft",{memberId:r.key,roomId:e})};ee.onMemberLeft(e,s),this.listeners.has("member-left")||this.listeners.set("member-left",[]),this.listeners.get("member-left").push({callback:s,roomId:e})}removeTrackedListeners(){try{for(const[e,n]of this.listeners.entries())for(const s of n)try{s.ref&&Tt(s.ref,"value",s.callback)}catch(r){console.warn(`Failed to remove ${e} listener`,r)}}catch(e){console.warn("Failed to remove tracked listeners",e)}finally{this.listeners.clear()}if(this.roomId)try{No(this.roomId)}catch(e){console.warn("Failed to remove RTDB listeners for room",e)}}async createCall(e={}){this.state="creating";try{e.localVideoEl&&(this.localVideoEl=e.localVideoEl),e.remoteVideoEl&&(this.remoteVideoEl=e.remoteVideoEl);const n=await DP(e);if(!n||!n.success)return this.state="idle",this.emitter.emit("error",{phase:"createCall",detail:n}),this.emitCallFailed("createCall",n),n;this.pc=n.pc,this.roomId=n.roomId,this.roomLink=n.roomLink||null,this.role=n.role||"initiator",this.dataChannel=n.dataChannel||null,this.messagesUI=n.messagesUI||null,this.state="waiting",this.dataChannel&&this.setupFileTransport(this.dataChannel);const{drainIceCandidateQueue:s}=await lt(async()=>{const{drainIceCandidateQueue:r}=await Promise.resolve().then(()=>LP);return{drainIceCandidateQueue:r}},void 0);return this.setupAnswerListener(this.roomId,this.pc,s),this.setupCancellationListener(this.roomId),this.setupRejectionListener(this.roomId),this.setupMemberJoinedListener(this.roomId),this.setupMemberLeftListener(this.roomId),this.emitter.emit("created",{roomId:this.roomId,roomLink:this.roomLink,role:this.role}),n}catch(n){throw this.state="idle",this.emitter.emit("error",{phase:"createCall",error:n}),this.emitCallFailed("createCall",n),n}}async answerCall(e={}){this.state="joining";try{e.localVideoEl&&(this.localVideoEl=e.localVideoEl),e.remoteVideoEl&&(this.remoteVideoEl=e.remoteVideoEl);const s=await xP({...e,onMessagesUIReady:r=>{this.messagesUI=r}});return!s||!s.success?(this.state="idle",this.emitter.emit("error",{phase:"answerCall",detail:s}),this.emitCallFailed("answerCall",s),s):(this.pc=s.pc,this.roomId=s.roomId,this.role=s.role||"joiner",this.dataChannel=s.dataChannel||null,!this.messagesUI&&s.messagesUI&&(this.messagesUI=s.messagesUI),this.state="connected",this.dataChannel?this.setupFileTransport(this.dataChannel):this.role==="joiner"&&this.pc&&(this.pc.ondatachannel=r=>{this.dataChannel=r.channel,this.setupFileTransport(this.dataChannel)}),this.setupCancellationListener(this.roomId),this.setupMemberJoinedListener(this.roomId),this.setupMemberLeftListener(this.roomId),this.emitter.emit("answered",{roomId:this.roomId,role:this.role}),s)}catch(n){throw this.state="idle",this.emitter.emit("error",{phase:"answerCall",error:n}),this.emitCallFailed("answerCall",n),n}}setupFileTransport(e){if(!e)return;const n=()=>{try{const s=new VP(e);Jt.setFileTransport(s),Ce.setFileTransfer(s.fileTransfer),B("[CallController] File transport initialized")}catch(s){console.error("[CallController] Failed to setup file transport:",s)}};e.readyState==="open"?n():e.addEventListener("open",n,{once:!0})}async hangUp({emitCancel:e=!0,reason:n="user_hung_up"}={}){if(!this.isHangingUp){this.isHangingUp=!0;try{if(e&&this.roomId)try{await ee.cancelCall(this.roomId,_e(),n)}catch(s){console.warn("CallController: cancelCall failed (non-fatal)",s)}await this.cleanupCall({reason:n}),this.emitter.emit("hangup",{roomId:this.roomId,reason:n})}catch(s){throw this.emitter.emit("error",{phase:"hangUp",error:s}),s}finally{this.isHangingUp=!1}}}isRemoteHangup(e){return e?["remote","cancelled","partner_disconnected","connection_failed"].some(s=>e.includes(s)):!1}emitCallFailed(e,n){this.emitter.emit("callFailed",{phase:e,error:n?.message||n?.error||n||"Unknown error"})}async cleanupCall({reason:e}={}){if(!this.isCleaningUp){this.isCleaningUp=!0;try{const n=this.roomId,s=this.partnerId;this.removeTrackedListeners();try{await ee.leaveRoom(_e(),this.roomId)}catch{}try{if(this.pc){try{this.pc.close()}catch{}this.pc=null}}catch{}try{this.remoteVideoEl&&(this.remoteVideoEl.srcObject=null)}catch(r){console.warn("CallController: failed to clear remote video",r)}try{this.localVideoEl&&(this.localVideoEl.srcObject=null)}catch(r){console.warn("CallController: failed to clear local video",r)}try{const{cleanupLocalStream:r}=await lt(async()=>{const{cleanupLocalStream:i}=await Promise.resolve().then(()=>QN);return{cleanupLocalStream:i}},void 0);r()}catch(r){console.warn("CallController: failed to cleanup local stream",r)}try{const{resetLocalStreamInitFlag:r}=await lt(async()=>{const{resetLocalStreamInitFlag:i}=await Promise.resolve().then(()=>A0);return{resetLocalStreamInitFlag:i}},void 0);r()}catch{}this.isRemoteHangup(e)&&this.emitter.emit("remoteHangup",{roomId:n,partnerId:s,reason:e});try{Jt.clearFileTransport(),Ce.setFileTransfer(null)}catch(r){console.warn("CallController: failed to cleanup file transport",r)}if(this.messagesUI&&this.messagesUI.cleanup)try{this.messagesUI.cleanup()}catch(r){console.warn("CallController: failed to cleanup messages UI",r)}this.resetState(),this.emitter.emit("cleanup",{roomId:n,partnerId:s,reason:e})}catch(n){throw this.emitter.emit("error",{phase:"cleanupCall",error:n}),n}finally{this.isCleaningUp=!1}}}}const ve=new qP,Ec={default:{echoCancellation:!0,noiseSuppression:!0,autoGainControl:!0},withVoiceIsolationIfSupported:{echoCancellation:!0,noiseSuppression:!0,autoGainControl:!0,voiceIsolation:!0,restrictOwnAudio:!0,googHighpassFilter:!0,googTypingNoiseDetection:!0,highpassFilter:!0,typingNoiseDetection:!0}};function h_(){const t=navigator.mediaDevices.getSupportedConstraints();return["voiceIsolation","highpassFilter","typingNoiseDetection"].every(s=>t[s])?Ec.withVoiceIsolationIfSupported:Ec.default}const zP=()=>Ec.default,GP={desktop:{landscape:{width:{ideal:1920},height:{ideal:1080},frameRate:{min:10,ideal:30},aspectRatio:{ideal:16/9}},portrait:{width:{ideal:1080},height:{ideal:1920},frameRate:{min:10,ideal:30},aspectRatio:{ideal:9/16}}},mobile:{portrait:{width:{ideal:1080},height:{ideal:1920},aspectRatio:{ideal:9/16},frameRate:{ideal:30}},landscape:{width:{ideal:1920},height:{ideal:1080},aspectRatio:{ideal:16/9},frameRate:{ideal:30}}}},YP=()=>window.screen?.orientation?.type?.includes("portrait")||window.orientation===0||window.orientation===180;function uu(t){const e=YP()?"portrait":"landscape",s=/Mobi|Android/i.test(navigator.userAgent)?"mobile":"desktop",r=GP[s][e];return{facingMode:t,...r}}function KP(){return!!(navigator.mediaDevices&&navigator.mediaDevices.enumerateDevices)}async function JP(){return KP()?(await navigator.mediaDevices.enumerateDevices()).filter(e=>e.kind==="videoinput"):[]}async function XP(){const t=await JP();let e=!1,n=!1;return t.forEach(s=>{const r=s.label.toLowerCase();(r.includes("front")||r.includes("user"))&&(e=!0),(r.includes("back")||r.includes("rear")||r.includes("environment"))&&(n=!0)}),e&&n}async function QP({localStream:t,localVideo:e,currentFacingMode:n,peerConnection:s=null}){if(!t||!e)return console.error("switchCamera: missing localStream or localVideo"),null;const r=n==="user"?"environment":"user";try{const i=await navigator.mediaDevices.getUserMedia({video:uu(r),audio:h_()}),o=i.getVideoTracks()[0],a=i.getAudioTracks()[0],c=t.getVideoTracks()[0],l=c?c.enabled:!0,u=t.getAudioTracks()[0],d=u?!u.enabled:!1;if(o&&(o.enabled=l),a&&(a.enabled=!d),t.getTracks().forEach(h=>h.stop()),s){const h=s.getSenders().find(p=>p.track&&p.track.kind==="video");h&&await h.replaceTrack(o);const f=s.getSenders().find(p=>p.track&&p.track.kind==="audio");f&&a&&await f.replaceTrack(a)}return e.srcObject=new MediaStream([o].filter(Boolean)),{newStream:i,facingMode:r}}catch(i){return console.error("Failed to switch camera:",i),null}}let ba=!1,hn=null,fn=null;function ZP({getLocalStream:t,getFacingMode:e}){return hn&&fn&&hn.removeEventListener("change",fn),hn=window.matchMedia("(orientation: portrait)"),fn=()=>{try{const n=typeof t=="function"?t():null,s=typeof e=="function"?e():"user";e0({localStream:n,currentFacingMode:s})}catch(n){console.error("Orientation handler failed:",n)}},hn.addEventListener("change",fn),()=>{hn&&fn&&hn.removeEventListener("change",fn),hn=null,fn=null}}async function e0({localStream:t,currentFacingMode:e}){if(!(ba||!t?.getVideoTracks()[0])){ba=!0;try{const n=t.getVideoTracks()[0],s=uu(e);B("Applying constraints:",s),await n.applyConstraints(s),B("Video constraints updated successfully")}catch(n){console.error("Failed to apply orientation constraints:",n)}finally{ba=!1}}}let bc=[];function t0(t,e){const n=e.querySelector("i");n.className=t?"fa fa-microphone-slash":"fa fa-microphone"}function n0({getLocalStream:t,getLocalVideo:e,getRemoteVideo:n,getPeerConnection:s=()=>null,setLocalStream:r=null,micBtn:i,cameraBtn:o,switchCameraBtn:a,mutePartnerBtn:c,fullscreenPartnerBtn:l,remotePipBtn:u}){i&&(i.onclick=()=>{const h=t();if(!h)return;const f=h.getAudioTracks()[0];f&&(f.enabled=!f.enabled,t0(!f.enabled,i))}),o&&(o.onclick=()=>{const h=t();if(!h)return;const f=h.getVideoTracks()[0];if(f){f.enabled=!f.enabled;const p=o.querySelector("i");p.className=f.enabled?"fa fa-video":"fa fa-video-slash"}});const d=ZP({getLocalStream:t,getFacingMode:_c});bc.push(d),a&&(a.onclick=async()=>{const h=await QP({localStream:t(),localVideo:e(),currentFacingMode:_c(),peerConnection:s()||null});h?(zm(h.facingMode),console.log("Switched camera to facingMode:",h.facingMode),h.newStream&&typeof r=="function"&&r(h.newStream)):console.error("Camera switch failed.")},(async()=>await XP()?D(a):v(a))()),c&&(c.onclick=()=>{const h=n();if(!h)return;h.muted=!h.muted;const f=c.querySelector("i");f.className=h.muted?"fa fa-volume-mute":"fa fa-volume-up"}),l&&(l.onclick=()=>{const h=n();h.requestFullscreen?h.requestFullscreen():h.webkitRequestFullscreen&&h.webkitRequestFullscreen()}),u&&(u.onclick=async()=>{const h=n();if(h)try{document.pictureInPictureElement===h?await document.exitPictureInPicture():h.requestPictureInPicture&&await h.requestPictureInPicture()}catch(f){console.error("Picture-in-Picture failed:",f)}})}function s0(){bc.forEach(t=>t()),bc=[]}let Ca=null,$t=null,K=null,Y=null,$h=!1,oi=!1,ut=[],Cc="",Ee=-1,Sc=[];const r0="AIzaSyBPUjW7ac277WIYTbN4M8dUomK39qRQjhA",i0="https://www.googleapis.com/youtube/v3";async function o0(){if($h||oi)return!1;oi=!0;const{initializeYouTubeElements:t}=await lt(async()=>{const{initializeYouTubeElements:o}=await Promise.resolve().then(()=>LN);return{initializeYouTubeElements:o}},void 0),e=await t();if(Ca=e.searchContainer,$t=e.searchBtn,K=e.searchQuery,Y=e.searchResults,!Ca||!$t||!K||!Y)return console.error("YouTube search elements not found in DOM"),oi=!1,!1;const n=o=>/^https?:\/\//i.test(o),s=o=>{(Y?.querySelectorAll(".search-result-item")||[]).forEach((c,l)=>{l===o?(c.classList.add("focused"),c.scrollIntoView({block:"nearest"})):c.classList.remove("focused")}),Ee=o??-1};$t.onclick=async()=>{const o=K.value.trim();if(Yi(K)){D(K),K.focus();return}if(!o){_i(),v(K);return}if(Wh()&&o===Cc)Tc(ut);else if(!n(o))await Bh(o);else{await Tr({url:o,title:o,channel:"",thumbnail:"",id:o}),v(Y),K.value="",v(K),Ee=-1;return}},Ca.addEventListener("keydown",async o=>{const a=Y.querySelectorAll(".search-result-item");if(a.length>0&&(o.key==="ArrowDown"||o.key==="ArrowUp")){if(o.key==="ArrowDown"){let c=Ee+1;c>=a.length&&(c=0),s(c)}else if(o.key==="ArrowUp"){let c=Ee-1;c<0&&(c=Ee===-1?0:a.length-1),s(c)}return}if(o.key==="Enter"){if(a.length>0&&Ee>=0){a[Ee].click(),v(K),v(Y),Ee=-1;return}const c=K.value.trim();if(c)if(Wh()&&c===Cc)Tc(ut);else if(!n(c))await Bh(c);else{await Tr({url:c,title:c,channel:"",thumbnail:"",id:c}),v(Y),Ee=-1,K.value="",v(K);return}}else o.key==="Escape"&&(c0()?_i():K.value?K.value="":v(K))}),K.addEventListener("input",()=>{K.value.trim()===""&&_i(),Ee=-1});const r=to(K,()=>v(K),{ignore:[$t],esc:!1});Sc.push(r);const i=to(Y,()=>v(Y),{ignore:[$t],esc:!1});return Sc.push(i),oi=!1,$h=!0,!0}async function Bh(t){if(!$t||!Y){console.error("Search elements not initialized");return}ut=[],Cc=t,$t.disabled=!0,Y.innerHTML='<div class="search-loading">Searching YouTube...</div>',D(Y);try{const e=await fetch(`${i0}/search?part=snippet&maxResults=10&q=${encodeURIComponent(t)}&type=video&key=${r0}`);if(!e.ok)throw e.status===403?new Error("YouTube API quota exceeded. Please try again later."):e.status===400?new Error("Invalid API key or request."):new Error(`YouTube API error: ${e.status}`);const n=await e.json();if(!n.items||n.items.length===0){Hh("No videos found"),ut=[];return}ut=n.items.map(s=>({id:s.id.videoId,title:s.snippet.title,thumbnail:s.snippet.thumbnails.medium.url,channel:s.snippet.channelTitle,url:`https://www.youtube.com/watch?v=${s.id.videoId}`})),Tc(ut)}catch(e){console.error("YouTube search failed:",e),Hh(e.message||"Search failed. Please try again.")}finally{$t.disabled=!1}}function Tc(t){if(!Y){console.error("Search results element not initialized");return}if(!t||t.length===0){Y.innerHTML='<div class="search-no-results">No results found</div>',ut=[],Ee=-1;return}Y.innerHTML="",t.forEach(n=>{const s=document.createElement("div");s.className="search-result-item",s.innerHTML=`
      <img src="${n.thumbnail}" alt="${n.title}" class="result-thumbnail">
      <div class="search-result-info">
        <div class="search-result-title">${n.title}</div>
        <div class="search-result-channel">${n.channel}</div>
      </div>
    `,s.onclick=async()=>{if(await Tr(n),v(Y),Ee=-1,!K){console.error("Search query element not initialized");return}K.value="",v(K)},Y.appendChild(s)}),D(Y),Ee=0,Y.querySelectorAll(".search-result-item").forEach((n,s)=>{s===Ee?(n.classList.add("focused"),n.scrollIntoView({block:"nearest"})):n.classList.remove("focused")})}function Hh(t){if(ut=[],Ee=-1,!Y){console.error("Search results element not initialized");return}Y.innerHTML=`<div class="search-error">${t}</div>`,D(Y)}function _i(){ut=[],Ee=-1,Y&&(Y.innerHTML="",v(Y))}function a0(){_i(),Sc.forEach(t=>t())}function c0(){return!Yi(Y)}function Wh(){return ut.length>0}function l0({parent:t,manager:e=null,onClick:n=null,hideWhenAllRead:s=!1}={}){let r=e;const i=zl({initialProps:{unreadCount:0,isHidden:!0},template:`
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
    `,handlers:{handleClick:()=>{n?n():r&&r.toggleList()}},className:"notifications-toggle-container",parent:t});let o=i.querySelector(".notification-badge");return o&&(o.style.display="none"),i.onPropUpdated("unreadCount",a=>{const c=i.querySelector(".notification-badge");c&&(c.style.display=a>0?"flex":"none")}),i.show=()=>{i.isHidden=!1,i.style.display="block"},i.hide=()=>{i.isHidden=!0,i.style.display="none"},i.setUnread=a=>{i.unreadCount=a,a>0?i.show():s&&i.hide()},i.setManager=a=>{r=a},i.hide(),i}class u0{constructor(){this.notifications=new Map,this.toggle=null,this.container=null,this.clickOutsideCleanup=null}setToggle(e){this.toggle=e,this.toggle.setManager&&this.toggle.setManager(this),this.createContainer(),this.updateToggle()}createContainer(){this.container||(this.container=document.createElement("div"),this.container.className="notifications-list-container",this.container.style.display="none",document.body.appendChild(this.container))}showList(){this.container&&(this.container.style.display="flex",this.setupClickOutside())}hideList(){this.container&&(this.container.style.display="none",this.cleanupClickOutside())}setupClickOutside(){this.clickOutsideCleanup||(this.clickOutsideCleanup=to(this.container,()=>this.hideList(),{ignore:this.toggle?[this.toggle]:[],esc:!0}))}cleanupClickOutside(){this.clickOutsideCleanup&&(this.clickOutsideCleanup(),this.clickOutsideCleanup=null)}toggleList(){this.container&&(this.container.style.display==="none"?this.showList():this.hideList())}isListVisible(){return this.container&&this.container.style.display!=="none"}add(e,n){this.notifications.has(e)&&this.remove(e),this.container||this.createContainer(),n.parentElement===document.body&&n.remove(),this.container.prepend(n),this.notifications.set(e,n),this.updateToggle(),n._originalDispose||(n._originalDispose=n.dispose);const s=n._originalDispose;n.dispose=()=>{s&&s.call(n),n.parentElement&&n.remove(),this.notifications.delete(e),this.updateToggle(),n.dispose=s,delete n._originalDispose}}remove(e){const n=this.notifications.get(e);n&&(n.dispose&&n.dispose(),this.notifications.delete(e),this.updateToggle())}getCount(){return this.notifications.size}has(e){return this.notifications.has(e)}clear(){this.notifications.forEach(e=>{e.dispose&&e.dispose()}),this.notifications.clear(),this.updateToggle()}updateToggle(){this.toggle&&this.toggle.setUnread(this.getCount())}}const d0=new u0;const h0=async()=>{if(Km())return console.debug("Reusing existing local MediaStream."),$o();const t=uu("user"),e=h_();try{const n=await navigator.mediaDevices.getUserMedia({video:t,audio:e});return Qi(n),n}catch(n){if(n.name==="OverconstrainedError"){console.warn(`❌ Constraint failed on property: ${n.constraint}, falling back to basic constraints`);const s=zP(),r=await navigator.mediaDevices.getUserMedia({video:!0,audio:s});return Qi(r),r}throw n}};async function f0(t){const e=await h0(),n=new MediaStream(e.getVideoTracks());return t.srcObject=n,!0}function p0(t,e,n){return t.ontrack=s=>{B(`REMOTE TRACK RECEIVED: ${s.track.kind}`);const r=Uo()?nu():null;let i;s.streams&&s.streams[0]&&s.streams[0]instanceof MediaStream?i=s.streams[0]:(console.warn("No stream in track event, using fallback track handling"),r?(r.addTrack(s.track),i=r):i=new MediaStream([s.track])),Gm(i),e.srcObject=i,r!==i||B(`Added ${s.track.kind} track to existing remote stream`);try{const o=document.getElementById("remote-video-box")||e.parentElement;o&&(o.classList?.remove("hidden"),e.classList?.remove("hidden"),o.style.visibility="visible",o.style.opacity="1",o.style.position="",o.style.left="",o.style.top="",e.style.visibility="visible",e.style.opacity="1")}catch(o){console.warn("Visibility override failed:",o)}},!0}let Vh=!1;function g0(t,e){const n=document.createElement("dialog");n.className="copy-link-dialog";const s=document.createElement("div");s.className="copy-link-dialog__content";const r=document.createElement("h2");r.className="copy-link-dialog__title",r.textContent=e.title,s.appendChild(r);const i=document.createElement("div");i.className="copy-link-dialog__input-container";const o=document.createElement("input");o.type="text",o.className="copy-link-dialog__input",o.value=t,o.readOnly=!0,o.setAttribute("aria-label","Link to copy"),i.appendChild(o),s.appendChild(i);const a=document.createElement("div");a.className="copy-link-dialog__buttons";const c=document.createElement("button");c.className="copy-link-dialog__button copy-link-dialog__button--primary",c.textContent=e.buttonText,c.autofocus=!0;const l=document.createElement("button");l.className="copy-link-dialog__button copy-link-dialog__button--secondary",l.textContent=e.cancelText,a.appendChild(c),a.appendChild(l),s.appendChild(a);const u=document.createElement("p");return u.className="copy-link-dialog__feedback",u.setAttribute("aria-live","polite"),s.appendChild(u),n.appendChild(s),{dialog:n,input:o,copyButton:c,cancelButton:l,feedback:u}}function m0(t,e={}){const n={title:"Share this link",buttonText:"Copy",cancelText:"Cancel",successMessage:"✓ Copied to clipboard!",errorMessage:"Failed to copy. Click the link to select it manually.",autoClose:!0,autoCloseDelay:1200,onCopy:null,onError:null,onCancel:null,onClose:null,...e};_0();const{dialog:s,input:r,copyButton:i,cancelButton:o,feedback:a}=g0(t,n);y0(s);let c=!1;const l=async()=>{await v0(t,r)?(c=!0,a.textContent=n.successMessage,a.classList.remove("copy-link-dialog__feedback--error"),n.onCopy&&n.onCopy(t),n.autoClose&&setTimeout(()=>{s.close()},n.autoCloseDelay)):(a.textContent=n.errorMessage,a.classList.add("copy-link-dialog__feedback--error"),r.readOnly=!1,r.addEventListener("click",()=>{r.select()}),n.onError&&n.onError())};return i.addEventListener("click",l),o.addEventListener("click",()=>{n.onCancel&&n.onCancel(),s.close()}),s.addEventListener("keydown",u=>{u.key==="Enter"&&!u.shiftKey&&!u.ctrlKey&&!u.altKey&&!u.metaKey&&(u.preventDefault(),l())}),s.addEventListener("close",()=>{!c&&n.onCancel&&n.onCancel(),n.onClose&&n.onClose(),setTimeout(()=>{s.remove()},300)}),document.body.appendChild(s),s.showModal(),s}function _0(){if(Vh)return;const t=document.createElement("style");t.textContent=`
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
  `,document.head.appendChild(t),Vh=!0}function y0(t){t.showModal||(t.showModal=function(){this.setAttribute("open",""),this.style.display="block",this.style.position="fixed",this.style.top="50%",this.style.left="50%",this.style.transform="translate(-50%, -50%)";const e=getComputedStyle(document.documentElement).getPropertyValue("--z-ui-overlay").trim();this.style.zIndex=e||"1000"},t.close=function(){this.removeAttribute("open"),this.style.display="none"})}async function v0(t,e=null){if(navigator.clipboard&&navigator.clipboard.writeText)try{return await navigator.clipboard.writeText(t),!0}catch(n){return console.warn("Clipboard API failed, using fallback:",n),!1}if(!e)return!1;try{return e.select(),e.setSelectionRange(0,99999),document.execCommand("copy")}catch(n){return console.error("Fallback copy failed:",n),!1}}function w0(){const t=window.matchMedia&&window.matchMedia("(display-mode: standalone)").matches||navigator.standalone===!0,e=/iphone|ipad|ipod/i.test(navigator.userAgent||"");if(!t||!e||!window.location.hostname.includes("github.io"))return;const s="https://vidu-aae11.web.app",r=s.replace(/\/$/,"");let i;try{i=new URL(r).hostname}catch(l){console.error("[PWA Redirect] Invalid VITE_APP_HOSTING_URL:",s,l);return}if(window.location.hostname===i)return;const o="/HangVidU/";let a=window.location.pathname;a.startsWith(o)?a="/"+a.slice(o.length):a==="/HangVidU"&&(a="/");let c;try{c=new URL(a+window.location.search+window.location.hash,r).toString()}catch(l){console.error("[PWA Redirect] Failed to construct target URL:",l);return}console.log("[PWA Redirect] iOS standalone PWA on gh-pages → redirecting to Firebase Hosting:",c),window.location.replace(c)}ZA(!0);y().disable();let du=[];async function E0(){b0();const t=xm(),n=["localVideoEl","remoteVideoEl","localBoxEl","remoteBoxEl","chatControls","lobbyDiv","titleAuthBar"].filter(s=>!t[s]);if(n.length>0)return console.error("Critical elements missing:",n),!1;try{{const{setupPWA:i}=await lt(async()=>{const{setupPWA:o}=await import("./PWA-BZBDRBkV.js");return{setupPWA:o}},[]);await i()}o0(),T0(),await km;const s=NN(Mo);s&&du.push(s.dispose);const r=document.querySelector(".top-right-menu");if(r){const i=l0({parent:r,hideWhenAllRead:!0});d0.setToggle(i)}return!0}catch(s){return console.error("Initialization error:",s),!1}}let Ic=!1;function f_(){Ic=!1}async function p_(){Ic||(Ic=!0,await f0(Fe),n0({getLocalStream:$o,getLocalVideo:()=>Fe,getRemoteVideo:()=>ie,getPeerConnection:()=>ve.getState().pc,setLocalStream:Qi,micBtn:$s,cameraBtn:Bs,switchCameraBtn:Us,mutePartnerBtn:rt,fullscreenPartnerBtn:Fo,remotePipBtn:rn}),Fe&&(Fe.addEventListener("enterpictureinpicture",()=>fe&&v(fe)),Fe.addEventListener("leavepictureinpicture",()=>{fe&&!(Fn()&&Zm())&&D(fe)})))}function b0(){v(ne),v(fe),v(Le),v(Be)}function g_(t){(t?.name==="NotAllowedError"||t?.name==="PermissionDeniedError")&&alert('Camera/microphone access is required for video calls. Please click "Allow" when prompted, or check your browser settings.'),f_()}function yi(t=null){return{localStream:$o(),localVideoEl:Fe,remoteVideoEl:ie,mutePartnerBtn:rt,setupRemoteStream:p0,setupWatchSync:UN,targetRoomId:t}}function vi(t,e=!1){return t.success?(e&&t.roomLink&&m0(t.roomLink,{onCopy:()=>B("Link ready! Share with your partner."),onCancel:()=>B("Link ready! Use the copy button to use it, or create a new one.")}),!0):!1}async function zr(t,{forceInitiator:e=!1}={}){try{await p_()}catch(i){return console.error("Failed to initialize local media stream:",i),g_(i),!1}const n=Date.now();if(e){y().logRoomCreation(t,!0,{creationTime:n,listenerAttachTime:n,timeDiff:0},{trigger:"force_initiator",reason:"calling_saved_contact"});const i=await ve.createCall(yi(t));return vi(i,!1)}let s=await ee.checkRoomStatus(t);if(s.exists&&!s.hasMembers){let o=0;for(;o<3&&!s.hasMembers;)await new Promise(a=>setTimeout(a,250*(o+1))),s=await ee.checkRoomStatus(t),o++}if(!s.exists||!s.hasMembers){y().logRoomCreation(t,!0,{creationTime:n,listenerAttachTime:n,timeDiff:0},{trigger:"room_empty_or_nonexistent",roomExists:s.exists,memberCount:s.memberCount||0});const i=await ve.createCall(yi(t));return vi(i,!0)}y().log("ROOM","JOINING_EXISTING",{roomId:t,memberCount:s.memberCount,roomExists:s.exists});const r=await ve.answerCall({roomId:t,...yi()});return vi(r,!1)}const Oe=new Set,m_=new Map;function jh(t){t&&(No(t),Oe.delete(t),m_.delete(t),y().log("LISTENER","INCOMING_CLEANUP",{roomId:t,remainingListeners:Oe.size}))}function C0(){B(`[LISTENER] Removing all incoming listeners (${Oe.size} rooms)`);const t=Array.from(Oe);t.forEach(e=>{No(e)}),Oe.clear(),m_.clear(),y().log("LISTENER","ALL_INCOMING_CLEANUP",{roomsCleared:t.length})}async function S0(t){const e=Date.now(),n=e+1440*60*1e3,s=q();if(s){const r=Ll(s,t);await se(r,{roomId:t,savedAt:e,expiresAt:n});return}try{const r=localStorage.getItem("recentCalls")||"{}",i=JSON.parse(r);i[t]={roomId:t,savedAt:e,expiresAt:n},localStorage.setItem("recentCalls",JSON.stringify(i))}catch(r){console.warn("Failed to save recent call to localStorage",r)}}async function Sa(t){const e=q();if(e){try{await Ve(Ll(e,t))}catch(n){console.warn("Failed to remove recent call from RTDB",n)}return}try{const n=localStorage.getItem("recentCalls")||"{}",s=JSON.parse(n);s[t]&&(delete s[t],localStorage.setItem("recentCalls",JSON.stringify(s)))}catch(n){console.warn("Failed to remove recent call from localStorage",n)}}function bs(t){t&&(Oe.has(t)&&(Oe.delete(t),No(t)),B(`[LISTENER] Attaching listener for room: ${t} (total: ${Oe.size+1})`),Oe.add(t),y().logListenerAttachment(t,"member_join",Oe.size,{action:"incoming_call_listener_attached"}),ee.onMemberJoined(t,async e=>{const n=e.key,s=e.val?e.val():null,r=_e();if(n&&n!==r){y().logMemberJoinEvent(t,n,s||{},{detectedBy:"incoming_call_listener",currentUserId:r});const i=s&&typeof s.joinedAt=="number"?s.joinedAt:null,o=2e4;let a=!1,c="none",l=0;if(i&&(l=Date.now()-i,a=l<o,c="joinedAt"),!a){const $=await e_(n,t),w=await t_(t);a=$||w,c=$?"outgoingState":w?"roomCreatedAt":"failed"}const u={isFresh:a,method:c,age:l,reason:a?"call_is_fresh":"call_is_stale"};if(y().logIncomingCallEvent(n,t,u,{memberData:s,joinedAt:i,CALL_FRESH_MS:o}),!a){y().logNotificationDecision("REJECT","stale_call",t,{age:l,validationMethod:c,joiningUserId:n});return}let d;try{d=await ee.getRoomData(t)}catch{return}if(!d||typeof d!="object")return;const h=!!d.offer,f=!!d.answer,p=d.createdBy;if(!h||f||p===r)return;const _=ve.getState();if(!!_.pc&&_.pc.connectionState==="connected"){y().logNotificationDecision("REJECT","already_in_call",t,{joiningUserId:n,currentCallState:_.pc?.connectionState});return}y().logNotificationDecision("SHOW","fresh_call_detected",t,{joiningUserId:n,freshnessResult:u});const A=await gP(t,n);as.playIncoming(),Dh.startCallIndicators(A);let x=!1;try{x=await Bo(`Incoming call from ${A}.

Accept?`)}finally{as.stop(),Dh.stopCallIndicators()}if(x)jh(t),y().logNotificationDecision("ACCEPT","user_accepted",t,{joiningUserId:n}),zr(t).catch($=>{console.warn("Failed to answer incoming call:",$),y().logFirebaseOperation("join_room_on_accept",!1,$,{roomId:t,joiningUserId:n})});else{y().logNotificationDecision("REJECT","user_rejected",t,{joiningUserId:n});try{await ee.rejectCall(t,_e(),"user_rejected")}catch($){console.warn("Failed to signal rejection via RTDB:",$)}await Sa(t).catch($=>{console.warn("Failed to remove recent call on rejection:",$)})}}}),ee.onCallCancelled(t,async e=>{if(e&&typeof e.val=="function"&&e.val()){try{const{dismissActiveConfirmDialog:s}=await lt(async()=>{const{dismissActiveConfirmDialog:r}=await Promise.resolve().then(()=>aP);return{dismissActiveConfirmDialog:r}},void 0);typeof s=="function"&&s()}catch{}await Sa(t).catch(()=>{})}}),ee.onMemberLeft(t,async e=>{const n=e.key,s=_e();if(!(!n||n===s))try{(await ee.checkRoomStatus(t)).hasMembers||(await Sa(t),jh(t),B(`Removed saved recent call and listeners for room ${t} because it is now empty`))}catch(r){console.warn("Failed to evaluate room status on member leave",r)}}))}async function qh(){const t=Date.now();y().log("LISTENER","STARTUP_BEGIN",{timestamp:t,currentListenerCount:Oe.size});try{if(typeof window<"u"){const{getCurrentUserAsync:n}=await lt(async()=>{const{getCurrentUserAsync:s}=await Promise.resolve().then(()=>_N);return{getCurrentUserAsync:s}},void 0);await n()}}catch{}const e=q();if(y().log("LISTENER","AUTH_STATE_DETERMINED",{isLoggedIn:!!e,userId:e||"guest"}),e){const n=eR(e);try{const s=await tt(n),r=s.exists()?s.val():null,i=new Set;if(r)for(const[o,a]of Object.entries(r)){if(!a||a.expiresAt&&a.expiresAt<Date.now()){await Ve(Ll(e,o)).catch(()=>{});continue}i.add(o)}try{const o=await kr();Object.entries(o||{}).forEach(([a,c])=>{if(c?.roomId)i.add(c.roomId);else if(a&&e)try{const l=no(e,a);i.add(l)}catch{}})}catch{}i.forEach(o=>bs(o)),y().log("LISTENER","STARTUP_COMPLETE",{storage:"rtdb",roomsToListen:Array.from(i),totalListeners:Oe.size,duration:Date.now()-t})}catch(s){console.warn("Failed to read recent calls from RTDB",s),y().logFirebaseOperation("read_recent_calls",!1,s,{storage:"rtdb",userId:e})}return}try{const n=localStorage.getItem("recentCalls")||"{}",s=JSON.parse(n),r={},i=new Set;for(const[o,a]of Object.entries(s||{}))!a||a.expiresAt&&a.expiresAt<Date.now()||(r[o]=a,i.add(o));try{const o=await kr(),a=_e();Object.entries(o||{}).forEach(([c,l])=>{if(l?.roomId)i.add(l.roomId);else if(c&&a)try{const u=no(a,c);i.add(u)}catch{}})}catch{}i.forEach(o=>bs(o)),localStorage.setItem("recentCalls",JSON.stringify(r)),y().log("LISTENER","STARTUP_COMPLETE",{storage:"localStorage",roomsToListen:Array.from(i),totalListeners:Oe.size,duration:Date.now()-t,expiredRoomsRemoved:Object.keys(s||{}).length-i.size})}catch(n){console.warn("Failed to read recent calls from localStorage",n),y().logFirebaseOperation("read_recent_calls",!1,n,{storage:"localStorage"})}}function Ta(){return M&&Le&&!Le.classList.contains("hidden")&&M.src&&M.src.trim()!==""}let zh=!1;function T0(){if(zh)return;const t=()=>{const e=document.activeElement;return e&&(e.tagName==="INPUT"||e.tagName==="TEXTAREA"||e.isContentEditable)};document.addEventListener("keydown",e=>{t()||(e.key==="w"||e.key==="W")&&(console.log("=== W KEY PRESSED ==="),console.log("lastWatched:",Ut()),console.log("isYTVisible():",ga()),console.log("isSharedVideoVisible():",Ta()),console.log("isWatchModeActive():",Fn()),Ut()==="yt"?ga()?(Ki(),cr()):($m(),yc()):Ut()==="url"&&(Ta()?(v(Le),cr()):(D(Le),yc()))),e.key==="Escape"&&Fn()&&(Ut()==="yt"&&ga()?(qr(),Ki()):Ut()==="url"&&Ta()&&(M.pause(),v(Le)),cr())}),zh=!0}const __=async()=>{try{await p_();const t=await ve.createCall(yi());vi(t,!0)}catch(t){console.error("Failed to start call:",t),g_(t)}};qe.onclick=__;cn.onclick=__;ns&&(navigator.clipboard&&navigator.clipboard.readText?ns.onclick=async()=>{try{const t=await navigator.clipboard.readText(),e=I0(t);if(!e){alert("No valid room link found in clipboard.");return}await zr(e)}catch(t){t.name==="NotAllowedError"?alert("Clipboard access denied. Please allow clipboard access or paste the link manually."):(console.error("Paste & Join failed:",t),alert("Failed to read clipboard. Please try again."))}}:(ns.style.display="none",console.warn("Paste & Join button hidden: Clipboard API not available in this context (requires HTTPS).")));Sr&&(Sr.onclick=async()=>{await RP()});Mn&&(Mn.onclick=()=>{Ut()==="yt"?(qr(),Ki()):(Ut()==="url"||Ut()==="file")&&(M.pause(),M.src.startsWith("blob:")&&URL.revokeObjectURL(M.src),v(Le)),cr()});st.onclick=async()=>{console.debug("Hanging up..."),await ve.hangUp({emitCancel:!0,reason:"user_hung_up"})};function I0(t){let e=t.trim();if(!e)return"";try{const n=new URL(e,window.location.origin),s=n.searchParams.get("room");if(s)return s;const r=n.hash.match(/room=([^&]+)/);return r?decodeURIComponent(r[1]):n.pathname.replace(/^\//,"")||e}catch{return e}}async function k0(){const e=new URLSearchParams(window.location.search).get("room");if(!e)return!1;const n=await zr(e);return n||(xo(),Qm()),n}const kc=[];let Ia=!1;async function y_(){if(Ia||kc.length===0)return;Ia=!0;const{fromUserId:t,inviteData:e}=kc.shift();try{if(await Bo(`${e.fromName||"Someone"} wants to connect.

Accept contact invitation?`))try{await bP(t,e),console.log("[INVITATIONS] Contact added:",e.fromName),await Un(je).catch(()=>{}),alert(`Added ${e.fromName} to your contacts!`)}catch(s){console.error("[INVITATIONS] Failed to accept invite:",s),alert("Failed to add contact. Please try again.")}else try{await CP(t),console.log("[INVITATIONS] Invite declined")}catch(s){console.error("[INVITATIONS] Failed to decline invite:",s)}}finally{Ia=!1,y_()}}function Gh(){EP((t,e)=>{kc.push({fromUserId:t,inviteData:e}),y_()}),SP(async(t,e)=>{console.log("[INVITATIONS] Your invite was accepted by:",e.acceptedByName),await Un(je).catch(()=>{}),alert(`${e.acceptedByName} accepted your invitation!`)})}w0();window.onload=async()=>{if(!await E0()){qe.disabled=!0,console.error("Initialization failed. Cannot start chat.");return}await qh().catch(r=>console.warn("Failed to start saved-room listeners",r)),Un(je).catch(r=>{console.warn("Failed to render contacts list:",r)});let e=null;const n=ql(async({isLoggedIn:r,user:i})=>{try{const o=e===null,a=e===!0&&!r,c=e===!1&&r;e=r,await Un(je),a?(B("[AUTH] User logged out - cleaning up messaging and listeners"),Ce.reset(),Jt.closeAllSessions(),C0(),wc()):c?(B("[AUTH] User logged in - re-attaching incoming listeners"),await qh().catch(l=>console.warn("Failed to re-attach saved-room listeners on login",l)),Gh()):o&&r&&(B("[AUTH] Initial load with logged-in user"),Gh())}catch(o){console.warn("Failed to handle auth change:",o)}});du.push(()=>{try{typeof n=="function"&&n()}catch{}}),await k0()};window.addEventListener("beforeunload",async t=>{const e=ve.getState();if(e.pc&&e.pc.connectionState==="connected")return t.preventDefault(),t.returnValue="You are in an active call. Are you sure you want to leave?",t.returnValue;await R0()});ve.on("memberJoined",({memberId:t,roomId:e})=>{console.debug("CallController memberJoined event",{memberId:t,roomId:e}),ve.setPartnerId(t),Ce.showMessagesToggle(),iu(t,t),su(),ru().catch(n=>console.warn("Failed to clear calling state:",n)),S0(e).catch(n=>console.warn("Failed to save recent call:",n))});ve.on("memberLeft",({memberId:t})=>{console.info("Partner has left the call")});ve.on("cleanup",({roomId:t,partnerId:e,reason:n})=>{Sn(),Ym(),Qm(),xo();const s=ve.getState();s.messagesUI&&typeof s.messagesUI.cleanup=="function"&&(s.messagesUI.cleanup(),s.messagesUI=null),e&&t&&setTimeout(()=>{mP(e,t,je).catch(r=>{console.warn("Failed to save contact after cleanup:",r)})},500)});async function R0(){await ve.hangUp({emitCancel:!0,reason:"page_unload"}),s0(),Xk(),document.pictureInPictureElement&&document.exitPictureInPicture().catch(e=>console.error(e));const t=ve.getState();t.messagesUI&&t.messagesUI.cleanup&&t.messagesUI.cleanup(),window.history.replaceState({},document.title,window.location.pathname),M.src="",Jm(),Fe&&Fe.srcObject&&(Fe.srcObject=null),ie&&ie.srcObject&&(ie.srcObject=null),cr(),xo(),FN("none"),Zl(),Um(!1),a0(),du.forEach(e=>e())}const A0=Object.freeze(Object.defineProperty({__proto__:null,joinOrCreateRoomWithId:zr,listenForIncomingOnRoom:bs,resetLocalStreamInitFlag:f_},Symbol.toStringTag,{value:"Module"}));export{lt as _,zl as c,B as d,v as h,N0 as i,d0 as n,D as s};
