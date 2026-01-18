(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))s(r);new MutationObserver(r=>{for(const i of r)if(i.type==="childList")for(const o of i.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&s(o)}).observe(document,{childList:!0,subtree:!0});function n(r){const i={};return r.integrity&&(i.integrity=r.integrity),r.referrerPolicy&&(i.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?i.credentials="include":r.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function s(r){if(r.ep)return;r.ep=!0;const i=n(r);fetch(r.href,i)}})();const x_="modulepreload",M_=function(t){return"/HangVidU/"+t},Su={},lt=function(e,n,s){let r=Promise.resolve();if(n&&n.length>0){let c=function(l){return Promise.all(l.map(u=>Promise.resolve(u).then(d=>({status:"fulfilled",value:d}),d=>({status:"rejected",reason:d}))))};document.getElementsByTagName("link");const o=document.querySelector("meta[property=csp-nonce]"),a=o?.nonce||o?.getAttribute("nonce");r=c(n.map(l=>{if(l=M_(l),l in Su)return;Su[l]=!0;const u=l.endsWith(".css"),d=u?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${l}"]${d}`))return;const h=document.createElement("link");if(h.rel=u?"stylesheet":x_,u||(h.as="script"),h.crossOrigin="",h.href=l,a&&h.setAttribute("nonce",a),document.head.appendChild(h),u)return new Promise((f,p)=>{h.addEventListener("load",f),h.addEventListener("error",()=>p(new Error(`Unable to preload CSS for ${l}`)))})}))}function i(o){const a=new Event("vite:preloadError",{cancelable:!0});if(a.payload=o,window.dispatchEvent(a),!a.defaultPrevented)throw o}return r.then(o=>{for(const a of o||[])a.status==="rejected"&&i(a.reason);return e().catch(i)})},I=typeof __SENTRY_DEBUG__>"u"||__SENTRY_DEBUG__,V=globalThis,Cn="10.26.0";function co(){return lo(V),V}function lo(t){const e=t.__SENTRY__=t.__SENTRY__||{};return e.version=e.version||Cn,e[Cn]=e[Cn]||{}}function Ts(t,e,n=V){const s=n.__SENTRY__=n.__SENTRY__||{},r=s[Cn]=s[Cn]||{};return r[t]||(r[t]=e())}const F_=["debug","info","warn","error","log","assert","trace"],U_="Sentry Logger ",Ti={};function Is(t){if(!("console"in V))return t();const e=V.console,n={},s=Object.keys(Ti);s.forEach(r=>{const i=Ti[r];n[r]=e[r],e[r]=i});try{return t()}finally{s.forEach(r=>{e[r]=n[r]})}}function $_(){Oc().enabled=!0}function B_(){Oc().enabled=!1}function sf(){return Oc().enabled}function H_(...t){Lc("log",...t)}function W_(...t){Lc("warn",...t)}function V_(...t){Lc("error",...t)}function Lc(t,...e){I&&sf()&&Is(()=>{V.console[t](`${U_}[${t}]:`,...e)})}function Oc(){return I?Ts("loggerSettings",()=>({enabled:!1})):{enabled:!1}}const C={enable:$_,disable:B_,isEnabled:sf,log:H_,warn:W_,error:V_},rf=50,Rn="?",Tu=/\(error: (.*)\)/,Iu=/captureMessage|captureException/;function of(...t){const e=t.sort((n,s)=>n[0]-s[0]).map(n=>n[1]);return(n,s=0,r=0)=>{const i=[],o=n.split(`
`);for(let a=s;a<o.length;a++){let c=o[a];c.length>1024&&(c=c.slice(0,1024));const l=Tu.test(c)?c.replace(Tu,"$1"):c;if(!l.match(/\S*Error: /)){for(const u of e){const d=u(l);if(d){i.push(d);break}}if(i.length>=rf+r)break}}return q_(i.slice(r))}}function j_(t){return Array.isArray(t)?of(...t):t}function q_(t){if(!t.length)return[];const e=Array.from(t);return/sentryWrapped/.test(Qr(e).function||"")&&e.pop(),e.reverse(),Iu.test(Qr(e).function||"")&&(e.pop(),Iu.test(Qr(e).function||"")&&e.pop()),e.slice(0,rf).map(n=>({...n,filename:n.filename||Qr(e).filename,function:n.function||Rn}))}function Qr(t){return t[t.length-1]||{}}const Ko="<anonymous>";function Zt(t){try{return!t||typeof t!="function"?Ko:t.name||Ko}catch{return Ko}}function ku(t){const e=t.exception;if(e){const n=[];try{return e.values.forEach(s=>{s.stacktrace.frames&&n.push(...s.stacktrace.frames)}),n}catch{return}}}function af(t){return"__v_isVNode"in t&&t.__v_isVNode?"[VueVNode]":"[VueViewModel]"}const hi={},Ru={};function Wn(t,e){hi[t]=hi[t]||[],hi[t].push(e)}function Vn(t,e){if(!Ru[t]){Ru[t]=!0;try{e()}catch(n){I&&C.error(`Error while instrumenting ${t}`,n)}}}function Qe(t,e){const n=t&&hi[t];if(n)for(const s of n)try{s(e)}catch(r){I&&C.error(`Error while triggering instrumentation handler.
Type: ${t}
Name: ${Zt(s)}
Error:`,r)}}let Jo=null;function z_(t){const e="error";Wn(e,t),Vn(e,G_)}function G_(){Jo=V.onerror,V.onerror=function(t,e,n,s,r){return Qe("error",{column:s,error:r,line:n,msg:t,url:e}),Jo?Jo.apply(this,arguments):!1},V.onerror.__SENTRY_INSTRUMENTED__=!0}let Xo=null;function Y_(t){const e="unhandledrejection";Wn(e,t),Vn(e,K_)}function K_(){Xo=V.onunhandledrejection,V.onunhandledrejection=function(t){return Qe("unhandledrejection",t),Xo?Xo.apply(this,arguments):!0},V.onunhandledrejection.__SENTRY_INSTRUMENTED__=!0}const cf=Object.prototype.toString;function Dc(t){switch(cf.call(t)){case"[object Error]":case"[object Exception]":case"[object DOMException]":case"[object WebAssembly.Exception]":return!0;default:return en(t,Error)}}function ks(t,e){return cf.call(t)===`[object ${e}]`}function lf(t){return ks(t,"ErrorEvent")}function Au(t){return ks(t,"DOMError")}function J_(t){return ks(t,"DOMException")}function bt(t){return ks(t,"String")}function xc(t){return typeof t=="object"&&t!==null&&"__sentry_template_string__"in t&&"__sentry_template_values__"in t}function uo(t){return t===null||xc(t)||typeof t!="object"&&typeof t!="function"}function fr(t){return ks(t,"Object")}function ho(t){return typeof Event<"u"&&en(t,Event)}function X_(t){return typeof Element<"u"&&en(t,Element)}function Q_(t){return ks(t,"RegExp")}function Or(t){return!!(t?.then&&typeof t.then=="function")}function Z_(t){return fr(t)&&"nativeEvent"in t&&"preventDefault"in t&&"stopPropagation"in t}function en(t,e){try{return t instanceof e}catch{return!1}}function uf(t){return!!(typeof t=="object"&&t!==null&&(t.__isVue||t._isVue||t.__v_isVNode))}function ey(t){return typeof Request<"u"&&en(t,Request)}const Mc=V,ty=80;function df(t,e={}){if(!t)return"<unknown>";try{let n=t;const s=5,r=[];let i=0,o=0;const a=" > ",c=a.length;let l;const u=Array.isArray(e)?e:e.keyAttrs,d=!Array.isArray(e)&&e.maxStringLength||ty;for(;n&&i++<s&&(l=ny(n,u),!(l==="html"||i>1&&o+r.length*c+l.length>=d));)r.push(l),o+=l.length,n=n.parentNode;return r.reverse().join(a)}catch{return"<unknown>"}}function ny(t,e){const n=t,s=[];if(!n?.tagName)return"";if(Mc.HTMLElement&&n instanceof HTMLElement&&n.dataset){if(n.dataset.sentryComponent)return n.dataset.sentryComponent;if(n.dataset.sentryElement)return n.dataset.sentryElement}s.push(n.tagName.toLowerCase());const r=e?.length?e.filter(o=>n.getAttribute(o)).map(o=>[o,n.getAttribute(o)]):null;if(r?.length)r.forEach(o=>{s.push(`[${o[0]}="${o[1]}"]`)});else{n.id&&s.push(`#${n.id}`);const o=n.className;if(o&&bt(o)){const a=o.split(/\s+/);for(const c of a)s.push(`.${c}`)}}const i=["aria-label","type","name","title","alt"];for(const o of i){const a=n.getAttribute(o);a&&s.push(`[${o}="${a}"]`)}return s.join("")}function Fc(){try{return Mc.document.location.href}catch{return""}}function sy(t){if(!Mc.HTMLElement)return null;let e=t;const n=5;for(let s=0;s<n;s++){if(!e)return null;if(e instanceof HTMLElement){if(e.dataset.sentryComponent)return e.dataset.sentryComponent;if(e.dataset.sentryElement)return e.dataset.sentryElement}e=e.parentNode}return null}function De(t,e,n){if(!(e in t))return;const s=t[e];if(typeof s!="function")return;const r=n(s);typeof r=="function"&&hf(r,s);try{t[e]=r}catch{I&&C.log(`Failed to replace method "${e}" in object`,t)}}function An(t,e,n){try{Object.defineProperty(t,e,{value:n,writable:!0,configurable:!0})}catch{I&&C.log(`Failed to add non-enumerable property "${e}" to object`,t)}}function hf(t,e){try{const n=e.prototype||{};t.prototype=e.prototype=n,An(t,"__sentry_original__",e)}catch{}}function Uc(t){return t.__sentry_original__}function ff(t){if(Dc(t))return{message:t.message,name:t.name,stack:t.stack,...Pu(t)};if(ho(t)){const e={type:t.type,target:Nu(t.target),currentTarget:Nu(t.currentTarget),...Pu(t)};return typeof CustomEvent<"u"&&en(t,CustomEvent)&&(e.detail=t.detail),e}else return t}function Nu(t){try{return X_(t)?df(t):Object.prototype.toString.call(t)}catch{return"<unknown>"}}function Pu(t){if(typeof t=="object"&&t!==null){const e={};for(const n in t)Object.prototype.hasOwnProperty.call(t,n)&&(e[n]=t[n]);return e}else return{}}function ry(t){const e=Object.keys(ff(t));return e.sort(),e[0]?e.join(", "):"[object has no keys]"}function pf(t,e=0){return typeof t!="string"||e===0||t.length<=e?t:`${t.slice(0,e)}...`}function Lu(t,e){if(!Array.isArray(t))return"";const n=[];for(let s=0;s<t.length;s++){const r=t[s];try{uf(r)?n.push(af(r)):n.push(String(r))}catch{n.push("[value cannot be serialized]")}}return n.join(e)}function fi(t,e,n=!1){return bt(t)?Q_(e)?e.test(t):bt(e)?n?t===e:t.includes(e):!1:!1}function fo(t,e=[],n=!1){return e.some(s=>fi(t,s,n))}function iy(){const t=V;return t.crypto||t.msCrypto}let Qo;function oy(){return Math.random()*16}function $e(t=iy()){try{if(t?.randomUUID)return t.randomUUID().replace(/-/g,"")}catch{}return Qo||(Qo="10000000100040008000"+1e11),Qo.replace(/[018]/g,e=>(e^(oy()&15)>>e/4).toString(16))}function gf(t){return t.exception?.values?.[0]}function vn(t){const{message:e,event_id:n}=t;if(e)return e;const s=gf(t);return s?s.type&&s.value?`${s.type}: ${s.value}`:s.type||s.value||n||"<unknown>":n||"<unknown>"}function Pa(t,e,n){const s=t.exception=t.exception||{},r=s.values=s.values||[],i=r[0]=r[0]||{};i.value||(i.value=e||""),i.type||(i.type="Error")}function ds(t,e){const n=gf(t);if(!n)return;const s={type:"generic",handled:!0},r=n.mechanism;if(n.mechanism={...s,...r,...e},e&&"data"in e){const i={...r?.data,...e.data};n.mechanism.data=i}}function Ou(t){if(ay(t))return!0;try{An(t,"__sentry_captured__",!0)}catch{}return!1}function ay(t){try{return t.__sentry_captured__}catch{}}const mf=1e3;function Dr(){return Date.now()/mf}function cy(){const{performance:t}=V;if(!t?.now||!t.timeOrigin)return Dr;const e=t.timeOrigin;return()=>(e+t.now())/mf}let Du;function Ct(){return(Du??(Du=cy()))()}function ly(t){const e=Ct(),n={sid:$e(),init:!0,timestamp:e,started:e,duration:0,status:"ok",errors:0,ignoreDuration:!1,toJSON:()=>dy(n)};return t&&hs(n,t),n}function hs(t,e={}){if(e.user&&(!t.ipAddress&&e.user.ip_address&&(t.ipAddress=e.user.ip_address),!t.did&&!e.did&&(t.did=e.user.id||e.user.email||e.user.username)),t.timestamp=e.timestamp||Ct(),e.abnormal_mechanism&&(t.abnormal_mechanism=e.abnormal_mechanism),e.ignoreDuration&&(t.ignoreDuration=e.ignoreDuration),e.sid&&(t.sid=e.sid.length===32?e.sid:$e()),e.init!==void 0&&(t.init=e.init),!t.did&&e.did&&(t.did=`${e.did}`),typeof e.started=="number"&&(t.started=e.started),t.ignoreDuration)t.duration=void 0;else if(typeof e.duration=="number")t.duration=e.duration;else{const n=t.timestamp-t.started;t.duration=n>=0?n:0}e.release&&(t.release=e.release),e.environment&&(t.environment=e.environment),!t.ipAddress&&e.ipAddress&&(t.ipAddress=e.ipAddress),!t.userAgent&&e.userAgent&&(t.userAgent=e.userAgent),typeof e.errors=="number"&&(t.errors=e.errors),e.status&&(t.status=e.status)}function uy(t,e){let n={};t.status==="ok"&&(n={status:"exited"}),hs(t,n)}function dy(t){return{sid:`${t.sid}`,init:t.init,started:new Date(t.started*1e3).toISOString(),timestamp:new Date(t.timestamp*1e3).toISOString(),status:t.status,errors:t.errors,did:typeof t.did=="number"||typeof t.did=="string"?`${t.did}`:void 0,duration:t.duration,abnormal_mechanism:t.abnormal_mechanism,attrs:{release:t.release,environment:t.environment,ip_address:t.ipAddress,user_agent:t.userAgent}}}function xr(t,e,n=2){if(!e||typeof e!="object"||n<=0)return e;if(t&&Object.keys(e).length===0)return t;const s={...t};for(const r in e)Object.prototype.hasOwnProperty.call(e,r)&&(s[r]=xr(s[r],e[r],n-1));return s}function xu(){return $e()}function _f(){return $e().substring(16)}const La="_sentrySpan";function Mu(t,e){e?An(t,La,e):delete t[La]}function Fu(t){return t[La]}const hy=100;class kt{constructor(){this._notifyingListeners=!1,this._scopeListeners=[],this._eventProcessors=[],this._breadcrumbs=[],this._attachments=[],this._user={},this._tags={},this._extra={},this._contexts={},this._sdkProcessingMetadata={},this._propagationContext={traceId:xu(),sampleRand:Math.random()}}clone(){const e=new kt;return e._breadcrumbs=[...this._breadcrumbs],e._tags={...this._tags},e._extra={...this._extra},e._contexts={...this._contexts},this._contexts.flags&&(e._contexts.flags={values:[...this._contexts.flags.values]}),e._user=this._user,e._level=this._level,e._session=this._session,e._transactionName=this._transactionName,e._fingerprint=this._fingerprint,e._eventProcessors=[...this._eventProcessors],e._attachments=[...this._attachments],e._sdkProcessingMetadata={...this._sdkProcessingMetadata},e._propagationContext={...this._propagationContext},e._client=this._client,e._lastEventId=this._lastEventId,Mu(e,Fu(this)),e}setClient(e){this._client=e}setLastEventId(e){this._lastEventId=e}getClient(){return this._client}lastEventId(){return this._lastEventId}addScopeListener(e){this._scopeListeners.push(e)}addEventProcessor(e){return this._eventProcessors.push(e),this}setUser(e){return this._user=e||{email:void 0,id:void 0,ip_address:void 0,username:void 0},this._session&&hs(this._session,{user:e}),this._notifyScopeListeners(),this}getUser(){return this._user}setTags(e){return this._tags={...this._tags,...e},this._notifyScopeListeners(),this}setTag(e,n){return this.setTags({[e]:n})}setExtras(e){return this._extra={...this._extra,...e},this._notifyScopeListeners(),this}setExtra(e,n){return this._extra={...this._extra,[e]:n},this._notifyScopeListeners(),this}setFingerprint(e){return this._fingerprint=e,this._notifyScopeListeners(),this}setLevel(e){return this._level=e,this._notifyScopeListeners(),this}setTransactionName(e){return this._transactionName=e,this._notifyScopeListeners(),this}setContext(e,n){return n===null?delete this._contexts[e]:this._contexts[e]=n,this._notifyScopeListeners(),this}setSession(e){return e?this._session=e:delete this._session,this._notifyScopeListeners(),this}getSession(){return this._session}update(e){if(!e)return this;const n=typeof e=="function"?e(this):e,s=n instanceof kt?n.getScopeData():fr(n)?e:void 0,{tags:r,extra:i,user:o,contexts:a,level:c,fingerprint:l=[],propagationContext:u}=s||{};return this._tags={...this._tags,...r},this._extra={...this._extra,...i},this._contexts={...this._contexts,...a},o&&Object.keys(o).length&&(this._user=o),c&&(this._level=c),l.length&&(this._fingerprint=l),u&&(this._propagationContext=u),this}clear(){return this._breadcrumbs=[],this._tags={},this._extra={},this._user={},this._contexts={},this._level=void 0,this._transactionName=void 0,this._fingerprint=void 0,this._session=void 0,Mu(this,void 0),this._attachments=[],this.setPropagationContext({traceId:xu(),sampleRand:Math.random()}),this._notifyScopeListeners(),this}addBreadcrumb(e,n){const s=typeof n=="number"?n:hy;if(s<=0)return this;const r={timestamp:Dr(),...e,message:e.message?pf(e.message,2048):e.message};return this._breadcrumbs.push(r),this._breadcrumbs.length>s&&(this._breadcrumbs=this._breadcrumbs.slice(-s),this._client?.recordDroppedEvent("buffer_overflow","log_item")),this._notifyScopeListeners(),this}getLastBreadcrumb(){return this._breadcrumbs[this._breadcrumbs.length-1]}clearBreadcrumbs(){return this._breadcrumbs=[],this._notifyScopeListeners(),this}addAttachment(e){return this._attachments.push(e),this}clearAttachments(){return this._attachments=[],this}getScopeData(){return{breadcrumbs:this._breadcrumbs,attachments:this._attachments,contexts:this._contexts,tags:this._tags,extra:this._extra,user:this._user,level:this._level,fingerprint:this._fingerprint||[],eventProcessors:this._eventProcessors,propagationContext:this._propagationContext,sdkProcessingMetadata:this._sdkProcessingMetadata,transactionName:this._transactionName,span:Fu(this)}}setSDKProcessingMetadata(e){return this._sdkProcessingMetadata=xr(this._sdkProcessingMetadata,e,2),this}setPropagationContext(e){return this._propagationContext=e,this}getPropagationContext(){return this._propagationContext}captureException(e,n){const s=n?.event_id||$e();if(!this._client)return I&&C.warn("No client configured on scope - will not capture exception!"),s;const r=new Error("Sentry syntheticException");return this._client.captureException(e,{originalException:e,syntheticException:r,...n,event_id:s},this),s}captureMessage(e,n,s){const r=s?.event_id||$e();if(!this._client)return I&&C.warn("No client configured on scope - will not capture message!"),r;const i=s?.syntheticException??new Error(e);return this._client.captureMessage(e,n,{originalException:e,syntheticException:i,...s,event_id:r},this),r}captureEvent(e,n){const s=n?.event_id||$e();return this._client?(this._client.captureEvent(e,{...n,event_id:s},this),s):(I&&C.warn("No client configured on scope - will not capture event!"),s)}_notifyScopeListeners(){this._notifyingListeners||(this._notifyingListeners=!0,this._scopeListeners.forEach(e=>{e(this)}),this._notifyingListeners=!1)}}function fy(){return Ts("defaultCurrentScope",()=>new kt)}function py(){return Ts("defaultIsolationScope",()=>new kt)}class gy{constructor(e,n){let s;e?s=e:s=new kt;let r;n?r=n:r=new kt,this._stack=[{scope:s}],this._isolationScope=r}withScope(e){const n=this._pushScope();let s;try{s=e(n)}catch(r){throw this._popScope(),r}return Or(s)?s.then(r=>(this._popScope(),r),r=>{throw this._popScope(),r}):(this._popScope(),s)}getClient(){return this.getStackTop().client}getScope(){return this.getStackTop().scope}getIsolationScope(){return this._isolationScope}getStackTop(){return this._stack[this._stack.length-1]}_pushScope(){const e=this.getScope().clone();return this._stack.push({client:this.getClient(),scope:e}),e}_popScope(){return this._stack.length<=1?!1:!!this._stack.pop()}}function fs(){const t=co(),e=lo(t);return e.stack=e.stack||new gy(fy(),py())}function my(t){return fs().withScope(t)}function _y(t,e){const n=fs();return n.withScope(()=>(n.getStackTop().scope=t,e(t)))}function Uu(t){return fs().withScope(()=>t(fs().getIsolationScope()))}function yy(){return{withIsolationScope:Uu,withScope:my,withSetScope:_y,withSetIsolationScope:(t,e)=>Uu(e),getCurrentScope:()=>fs().getScope(),getIsolationScope:()=>fs().getIsolationScope()}}function $c(t){const e=lo(t);return e.acs?e.acs:yy()}function cn(){const t=co();return $c(t).getCurrentScope()}function Mr(){const t=co();return $c(t).getIsolationScope()}function vy(){return Ts("globalScope",()=>new kt)}function Ey(...t){const e=co(),n=$c(e);if(t.length===2){const[s,r]=t;return s?n.withSetScope(s,r):n.withScope(r)}return n.withScope(t[0])}function Ae(){return cn().getClient()}function wy(t){const e=t.getPropagationContext(),{traceId:n,parentSpanId:s,propagationSpanId:r}=e,i={trace_id:n,span_id:r||_f()};return s&&(i.parent_span_id=s),i}const by="sentry.source",Cy="sentry.sample_rate",Sy="sentry.previous_trace_sample_rate",Ty="sentry.op",Iy="sentry.origin",yf="sentry.profile_id",vf="sentry.exclusive_time",ky=0,Ry=1,Ay="_sentryScope",Ny="_sentryIsolationScope";function Py(t){if(t){if(typeof t=="object"&&"deref"in t&&typeof t.deref=="function")try{return t.deref()}catch{return}return t}}function Ef(t){const e=t;return{scope:e[Ay],isolationScope:Py(e[Ny])}}const Ly="sentry-",Oy=/^sentry-/;function Dy(t){const e=xy(t);if(!e)return;const n=Object.entries(e).reduce((s,[r,i])=>{if(r.match(Oy)){const o=r.slice(Ly.length);s[o]=i}return s},{});if(Object.keys(n).length>0)return n}function xy(t){if(!(!t||!bt(t)&&!Array.isArray(t)))return Array.isArray(t)?t.reduce((e,n)=>{const s=$u(n);return Object.entries(s).forEach(([r,i])=>{e[r]=i}),e},{}):$u(t)}function $u(t){return t.split(",").map(e=>{const n=e.indexOf("=");if(n===-1)return[];const s=e.slice(0,n),r=e.slice(n+1);return[s,r].map(i=>{try{return decodeURIComponent(i.trim())}catch{return}})}).reduce((e,[n,s])=>(n&&s&&(e[n]=s),e),{})}const My=/^o(\d+)\./,Fy=/^(?:(\w+):)\/\/(?:(\w+)(?::(\w+)?)?@)([\w.-]+)(?::(\d+))?\/(.+)/;function Uy(t){return t==="http"||t==="https"}function Fr(t,e=!1){const{host:n,path:s,pass:r,port:i,projectId:o,protocol:a,publicKey:c}=t;return`${a}://${c}${e&&r?`:${r}`:""}@${n}${i?`:${i}`:""}/${s&&`${s}/`}${o}`}function $y(t){const e=Fy.exec(t);if(!e){Is(()=>{console.error(`Invalid Sentry Dsn: ${t}`)});return}const[n,s,r="",i="",o="",a=""]=e.slice(1);let c="",l=a;const u=l.split("/");if(u.length>1&&(c=u.slice(0,-1).join("/"),l=u.pop()),l){const d=l.match(/^\d+/);d&&(l=d[0])}return wf({host:i,pass:r,path:c,projectId:l,port:o,protocol:n,publicKey:s})}function wf(t){return{protocol:t.protocol,publicKey:t.publicKey||"",pass:t.pass||"",host:t.host,port:t.port||"",path:t.path||"",projectId:t.projectId}}function By(t){if(!I)return!0;const{port:e,projectId:n,protocol:s}=t;return["protocol","publicKey","host","projectId"].find(o=>t[o]?!1:(C.error(`Invalid Sentry Dsn: ${o} missing`),!0))?!1:n.match(/^\d+$/)?Uy(s)?e&&isNaN(parseInt(e,10))?(C.error(`Invalid Sentry Dsn: Invalid port ${e}`),!1):!0:(C.error(`Invalid Sentry Dsn: Invalid protocol ${s}`),!1):(C.error(`Invalid Sentry Dsn: Invalid projectId ${n}`),!1)}function Hy(t){return t.match(My)?.[1]}function Wy(t){const e=t.getOptions(),{host:n}=t.getDsn()||{};let s;return e.orgId?s=String(e.orgId):n&&(s=Hy(n)),s}function Vy(t){const e=typeof t=="string"?$y(t):wf(t);if(!(!e||!By(e)))return e}function jy(t){if(typeof t=="boolean")return Number(t);const e=typeof t=="string"?parseFloat(t):t;if(!(typeof e!="number"||isNaN(e)||e<0||e>1))return e}const bf=1;let Bu=!1;function qy(t){const{spanId:e,traceId:n,isRemote:s}=t.spanContext(),r=s?e:Bc(t).parent_span_id,i=Ef(t).scope,o=s?i?.getPropagationContext().propagationSpanId||_f():e;return{parent_span_id:r,span_id:o,trace_id:n}}function zy(t){if(t&&t.length>0)return t.map(({context:{spanId:e,traceId:n,traceFlags:s,...r},attributes:i})=>({span_id:e,trace_id:n,sampled:s===bf,attributes:i,...r}))}function Hu(t){return typeof t=="number"?Wu(t):Array.isArray(t)?t[0]+t[1]/1e9:t instanceof Date?Wu(t.getTime()):Ct()}function Wu(t){return t>9999999999?t/1e3:t}function Bc(t){if(Yy(t))return t.getSpanJSON();const{spanId:e,traceId:n}=t.spanContext();if(Gy(t)){const{attributes:s,startTime:r,name:i,endTime:o,status:a,links:c}=t,l="parentSpanId"in t?t.parentSpanId:"parentSpanContext"in t?t.parentSpanContext?.spanId:void 0;return{span_id:e,trace_id:n,data:s,description:i,parent_span_id:l,start_timestamp:Hu(r),timestamp:Hu(o)||void 0,status:Jy(a),op:s[Ty],origin:s[Iy],links:zy(c)}}return{span_id:e,trace_id:n,start_timestamp:0,data:{}}}function Gy(t){const e=t;return!!e.attributes&&!!e.startTime&&!!e.name&&!!e.endTime&&!!e.status}function Yy(t){return typeof t.getSpanJSON=="function"}function Ky(t){const{traceFlags:e}=t.spanContext();return e===bf}function Jy(t){if(!(!t||t.code===ky))return t.code===Ry?"ok":t.message||"internal_error"}const Xy="_sentryRootSpan";function Cf(t){return t[Xy]||t}function Vu(){Bu||(Is(()=>{console.warn("[Sentry] Returning null from `beforeSendSpan` is disallowed. To drop certain spans, configure the respective integrations directly or use `ignoreSpans`.")}),Bu=!0)}function Qy(t){if(typeof __SENTRY_TRACING__=="boolean"&&!__SENTRY_TRACING__)return!1;const e=Ae()?.getOptions();return!!e&&(e.tracesSampleRate!=null||!!e.tracesSampler)}function ju(t){C.log(`Ignoring span ${t.op} - ${t.description} because it matches \`ignoreSpans\`.`)}function qu(t,e){if(!e?.length||!t.description)return!1;for(const n of e){if(ev(n)){if(fi(t.description,n))return I&&ju(t),!0;continue}if(!n.name&&!n.op)continue;const s=n.name?fi(t.description,n.name):!0,r=n.op?t.op&&fi(t.op,n.op):!0;if(s&&r)return I&&ju(t),!0}return!1}function Zy(t,e){const n=e.parent_span_id,s=e.span_id;if(n)for(const r of t)r.parent_span_id===s&&(r.parent_span_id=n)}function ev(t){return typeof t=="string"||t instanceof RegExp}const Hc="production",tv="_frozenDsc";function Sf(t,e){const n=e.getOptions(),{publicKey:s}=e.getDsn()||{},r={environment:n.environment||Hc,release:n.release,public_key:s,trace_id:t,org_id:Wy(e)};return e.emit("createDsc",r),r}function nv(t,e){const n=e.getPropagationContext();return n.dsc||Sf(n.traceId,t)}function sv(t){const e=Ae();if(!e)return{};const n=Cf(t),s=Bc(n),r=s.data,i=n.spanContext().traceState,o=i?.get("sentry.sample_rate")??r[Cy]??r[Sy];function a(p){return(typeof o=="number"||typeof o=="string")&&(p.sample_rate=`${o}`),p}const c=n[tv];if(c)return a(c);const l=i?.get("sentry.dsc"),u=l&&Dy(l);if(u)return a(u);const d=Sf(t.spanContext().traceId,e),h=r[by],f=s.description;return h!=="url"&&f&&(d.transaction=f),Qy()&&(d.sampled=String(Ky(n)),d.sample_rand=i?.get("sentry.sample_rand")??Ef(n).scope?.getPropagationContext().sampleRand.toString()),a(d),e.emit("createDsc",d,n),d}function gt(t,e=100,n=1/0){try{return Oa("",t,e,n)}catch(s){return{ERROR:`**non-serializable** (${s})`}}}function Tf(t,e=3,n=100*1024){const s=gt(t,e);return av(s)>n?Tf(t,e-1,n):s}function Oa(t,e,n=1/0,s=1/0,r=cv()){const[i,o]=r;if(e==null||["boolean","string"].includes(typeof e)||typeof e=="number"&&Number.isFinite(e))return e;const a=rv(t,e);if(!a.startsWith("[object "))return a;if(e.__sentry_skip_normalization__)return e;const c=typeof e.__sentry_override_normalization_depth__=="number"?e.__sentry_override_normalization_depth__:n;if(c===0)return a.replace("object ","");if(i(e))return"[Circular ~]";const l=e;if(l&&typeof l.toJSON=="function")try{const f=l.toJSON();return Oa("",f,c-1,s,r)}catch{}const u=Array.isArray(e)?[]:{};let d=0;const h=ff(e);for(const f in h){if(!Object.prototype.hasOwnProperty.call(h,f))continue;if(d>=s){u[f]="[MaxProperties ~]";break}const p=h[f];u[f]=Oa(f,p,c-1,s,r),d++}return o(e),u}function rv(t,e){try{if(t==="domain"&&e&&typeof e=="object"&&e._events)return"[Domain]";if(t==="domainEmitter")return"[DomainEmitter]";if(typeof global<"u"&&e===global)return"[Global]";if(typeof window<"u"&&e===window)return"[Window]";if(typeof document<"u"&&e===document)return"[Document]";if(uf(e))return af(e);if(Z_(e))return"[SyntheticEvent]";if(typeof e=="number"&&!Number.isFinite(e))return`[${e}]`;if(typeof e=="function")return`[Function: ${Zt(e)}]`;if(typeof e=="symbol")return`[${String(e)}]`;if(typeof e=="bigint")return`[BigInt: ${String(e)}]`;const n=iv(e);return/^HTML(\w*)Element$/.test(n)?`[HTMLElement: ${n}]`:`[object ${n}]`}catch(n){return`**non-serializable** (${n})`}}function iv(t){const e=Object.getPrototypeOf(t);return e?.constructor?e.constructor.name:"null prototype"}function ov(t){return~-encodeURI(t).split(/%..|./).length}function av(t){return ov(JSON.stringify(t))}function cv(){const t=new WeakSet;function e(s){return t.has(s)?!0:(t.add(s),!1)}function n(s){t.delete(s)}return[e,n]}function Rs(t,e=[]){return[t,e]}function lv(t,e){const[n,s]=t;return[n,[...s,e]]}function zu(t,e){const n=t[1];for(const s of n){const r=s[0].type;if(e(s,r))return!0}return!1}function Da(t){const e=lo(V);return e.encodePolyfill?e.encodePolyfill(t):new TextEncoder().encode(t)}function uv(t){const[e,n]=t;let s=JSON.stringify(e);function r(i){typeof s=="string"?s=typeof i=="string"?s+i:[Da(s),i]:s.push(typeof i=="string"?Da(i):i)}for(const i of n){const[o,a]=i;if(r(`
${JSON.stringify(o)}
`),typeof a=="string"||a instanceof Uint8Array)r(a);else{let c;try{c=JSON.stringify(a)}catch{c=JSON.stringify(gt(a))}r(c)}}return typeof s=="string"?s:dv(s)}function dv(t){const e=t.reduce((r,i)=>r+i.length,0),n=new Uint8Array(e);let s=0;for(const r of t)n.set(r,s),s+=r.length;return n}function hv(t){const e=typeof t.data=="string"?Da(t.data):t.data;return[{type:"attachment",length:e.length,filename:t.filename,content_type:t.contentType,attachment_type:t.attachmentType},e]}const fv={session:"session",sessions:"session",attachment:"attachment",transaction:"transaction",event:"error",client_report:"internal",user_report:"default",profile:"profile",profile_chunk:"profile",replay_event:"replay",replay_recording:"replay",check_in:"monitor",feedback:"feedback",span:"span",raw_security:"security",log:"log_item",metric:"metric",trace_metric:"metric"};function Gu(t){return fv[t]}function If(t){if(!t?.sdk)return;const{name:e,version:n}=t.sdk;return{name:e,version:n}}function pv(t,e,n,s){const r=t.sdkProcessingMetadata?.dynamicSamplingContext;return{event_id:t.event_id,sent_at:new Date().toISOString(),...e&&{sdk:e},...!!n&&s&&{dsn:Fr(s)},...r&&{trace:r}}}function gv(t,e){if(!e)return t;const n=t.sdk||{};return t.sdk={...n,name:n.name||e.name,version:n.version||e.version,integrations:[...t.sdk?.integrations||[],...e.integrations||[]],packages:[...t.sdk?.packages||[],...e.packages||[]],settings:t.sdk?.settings||e.settings?{...t.sdk?.settings,...e.settings}:void 0},t}function mv(t,e,n,s){const r=If(n),i={sent_at:new Date().toISOString(),...r&&{sdk:r},...!!s&&e&&{dsn:Fr(e)}},o="aggregates"in t?[{type:"sessions"},t]:[{type:"session"},t.toJSON()];return Rs(i,[o])}function _v(t,e,n,s){const r=If(n),i=t.type&&t.type!=="replay_event"?t.type:"event";gv(t,n?.sdk);const o=pv(t,r,s,e);return delete t.sdkProcessingMetadata,Rs(o,[[{type:i},t]])}const Zo=0,Yu=1,Ku=2;function po(t){return new pr(e=>{e(t)})}function Wc(t){return new pr((e,n)=>{n(t)})}class pr{constructor(e){this._state=Zo,this._handlers=[],this._runExecutor(e)}then(e,n){return new pr((s,r)=>{this._handlers.push([!1,i=>{if(!e)s(i);else try{s(e(i))}catch(o){r(o)}},i=>{if(!n)r(i);else try{s(n(i))}catch(o){r(o)}}]),this._executeHandlers()})}catch(e){return this.then(n=>n,e)}finally(e){return new pr((n,s)=>{let r,i;return this.then(o=>{i=!1,r=o,e&&e()},o=>{i=!0,r=o,e&&e()}).then(()=>{if(i){s(r);return}n(r)})})}_executeHandlers(){if(this._state===Zo)return;const e=this._handlers.slice();this._handlers=[],e.forEach(n=>{n[0]||(this._state===Yu&&n[1](this._value),this._state===Ku&&n[2](this._value),n[0]=!0)})}_runExecutor(e){const n=(i,o)=>{if(this._state===Zo){if(Or(o)){o.then(s,r);return}this._state=i,this._value=o,this._executeHandlers()}},s=i=>{n(Yu,i)},r=i=>{n(Ku,i)};try{e(s,r)}catch(i){r(i)}}}function yv(t,e,n,s=0){try{const r=xa(e,n,t,s);return Or(r)?r:po(r)}catch(r){return Wc(r)}}function xa(t,e,n,s){const r=n[s];if(!t||!r)return t;const i=r({...t},e);return I&&i===null&&C.log(`Event processor "${r.id||"?"}" dropped event`),Or(i)?i.then(o=>xa(o,e,n,s+1)):xa(i,e,n,s+1)}function vv(t,e){const{fingerprint:n,span:s,breadcrumbs:r,sdkProcessingMetadata:i}=e;Ev(t,e),s&&Cv(t,s),Sv(t,n),wv(t,r),bv(t,i)}function Ju(t,e){const{extra:n,tags:s,user:r,contexts:i,level:o,sdkProcessingMetadata:a,breadcrumbs:c,fingerprint:l,eventProcessors:u,attachments:d,propagationContext:h,transactionName:f,span:p}=e;Zr(t,"extra",n),Zr(t,"tags",s),Zr(t,"user",r),Zr(t,"contexts",i),t.sdkProcessingMetadata=xr(t.sdkProcessingMetadata,a,2),o&&(t.level=o),f&&(t.transactionName=f),p&&(t.span=p),c.length&&(t.breadcrumbs=[...t.breadcrumbs,...c]),l.length&&(t.fingerprint=[...t.fingerprint,...l]),u.length&&(t.eventProcessors=[...t.eventProcessors,...u]),d.length&&(t.attachments=[...t.attachments,...d]),t.propagationContext={...t.propagationContext,...h}}function Zr(t,e,n){t[e]=xr(t[e],n,1)}function Ev(t,e){const{extra:n,tags:s,user:r,contexts:i,level:o,transactionName:a}=e;Object.keys(n).length&&(t.extra={...n,...t.extra}),Object.keys(s).length&&(t.tags={...s,...t.tags}),Object.keys(r).length&&(t.user={...r,...t.user}),Object.keys(i).length&&(t.contexts={...i,...t.contexts}),o&&(t.level=o),a&&t.type!=="transaction"&&(t.transaction=a)}function wv(t,e){const n=[...t.breadcrumbs||[],...e];t.breadcrumbs=n.length?n:void 0}function bv(t,e){t.sdkProcessingMetadata={...t.sdkProcessingMetadata,...e}}function Cv(t,e){t.contexts={trace:qy(e),...t.contexts},t.sdkProcessingMetadata={dynamicSamplingContext:sv(e),...t.sdkProcessingMetadata};const n=Cf(e),s=Bc(n).description;s&&!t.transaction&&t.type==="transaction"&&(t.transaction=s)}function Sv(t,e){t.fingerprint=t.fingerprint?Array.isArray(t.fingerprint)?t.fingerprint:[t.fingerprint]:[],e&&(t.fingerprint=t.fingerprint.concat(e)),t.fingerprint.length||delete t.fingerprint}let fn,Xu,Qu,Mt;function Tv(t){const e=V._sentryDebugIds,n=V._debugIds;if(!e&&!n)return{};const s=e?Object.keys(e):[],r=n?Object.keys(n):[];if(Mt&&s.length===Xu&&r.length===Qu)return Mt;Xu=s.length,Qu=r.length,Mt={},fn||(fn={});const i=(o,a)=>{for(const c of o){const l=a[c],u=fn?.[c];if(u&&Mt&&l)Mt[u[0]]=l,fn&&(fn[c]=[u[0],l]);else if(l){const d=t(c);for(let h=d.length-1;h>=0;h--){const p=d[h]?.filename;if(p&&Mt&&fn){Mt[p]=l,fn[c]=[p,l];break}}}}};return e&&i(s,e),n&&i(r,n),Mt}function Iv(t,e,n,s,r,i){const{normalizeDepth:o=3,normalizeMaxBreadth:a=1e3}=t,c={...e,event_id:e.event_id||n.event_id||$e(),timestamp:e.timestamp||Dr()},l=n.integrations||t.integrations.map(m=>m.name);kv(c,t),Nv(c,l),r&&r.emit("applyFrameMetadata",e),e.type===void 0&&Rv(c,t.stackParser);const u=Lv(s,n.captureContext);n.mechanism&&ds(c,n.mechanism);const d=r?r.getEventProcessors():[],h=vy().getScopeData();if(i){const m=i.getScopeData();Ju(h,m)}if(u){const m=u.getScopeData();Ju(h,m)}const f=[...n.attachments||[],...h.attachments];f.length&&(n.attachments=f),vv(c,h);const p=[...d,...h.eventProcessors];return yv(p,c,n).then(m=>(m&&Av(m),typeof o=="number"&&o>0?Pv(m,o,a):m))}function kv(t,e){const{environment:n,release:s,dist:r,maxValueLength:i}=e;t.environment=t.environment||n||Hc,!t.release&&s&&(t.release=s),!t.dist&&r&&(t.dist=r);const o=t.request;o?.url&&(o.url=i?pf(o.url,i):o.url)}function Rv(t,e){const n=Tv(e);t.exception?.values?.forEach(s=>{s.stacktrace?.frames?.forEach(r=>{r.filename&&(r.debug_id=n[r.filename])})})}function Av(t){const e={};if(t.exception?.values?.forEach(s=>{s.stacktrace?.frames?.forEach(r=>{r.debug_id&&(r.abs_path?e[r.abs_path]=r.debug_id:r.filename&&(e[r.filename]=r.debug_id),delete r.debug_id)})}),Object.keys(e).length===0)return;t.debug_meta=t.debug_meta||{},t.debug_meta.images=t.debug_meta.images||[];const n=t.debug_meta.images;Object.entries(e).forEach(([s,r])=>{n.push({type:"sourcemap",code_file:s,debug_id:r})})}function Nv(t,e){e.length>0&&(t.sdk=t.sdk||{},t.sdk.integrations=[...t.sdk.integrations||[],...e])}function Pv(t,e,n){if(!t)return null;const s={...t,...t.breadcrumbs&&{breadcrumbs:t.breadcrumbs.map(r=>({...r,...r.data&&{data:gt(r.data,e,n)}}))},...t.user&&{user:gt(t.user,e,n)},...t.contexts&&{contexts:gt(t.contexts,e,n)},...t.extra&&{extra:gt(t.extra,e,n)}};return t.contexts?.trace&&s.contexts&&(s.contexts.trace=t.contexts.trace,t.contexts.trace.data&&(s.contexts.trace.data=gt(t.contexts.trace.data,e,n))),t.spans&&(s.spans=t.spans.map(r=>({...r,...r.data&&{data:gt(r.data,e,n)}}))),t.contexts?.flags&&s.contexts&&(s.contexts.flags=gt(t.contexts.flags,3,n)),s}function Lv(t,e){if(!e)return t;const n=t?t.clone():new kt;return n.update(e),n}function Ov(t,e){return cn().captureException(t,void 0)}function kf(t,e){return cn().captureEvent(t,e)}function Zu(t){const e=Mr(),n=cn(),{userAgent:s}=V.navigator||{},r=ly({user:n.getUser()||e.getUser(),...s&&{userAgent:s},...t}),i=e.getSession();return i?.status==="ok"&&hs(i,{status:"exited"}),Rf(),e.setSession(r),r}function Rf(){const t=Mr(),n=cn().getSession()||t.getSession();n&&uy(n),Af(),t.setSession()}function Af(){const t=Mr(),e=Ae(),n=t.getSession();n&&e&&e.captureSession(n)}function ed(t=!1){if(t){Rf();return}Af()}const Dv="7";function xv(t){const e=t.protocol?`${t.protocol}:`:"",n=t.port?`:${t.port}`:"";return`${e}//${t.host}${n}${t.path?`/${t.path}`:""}/api/`}function Mv(t){return`${xv(t)}${t.projectId}/envelope/`}function Fv(t,e){const n={sentry_version:Dv};return t.publicKey&&(n.sentry_key=t.publicKey),e&&(n.sentry_client=`${e.name}/${e.version}`),new URLSearchParams(n).toString()}function Uv(t,e,n){return e||`${Mv(t)}?${Fv(t,n)}`}const td=[];function $v(t){const e={};return t.forEach(n=>{const{name:s}=n,r=e[s];r&&!r.isDefaultInstance&&n.isDefaultInstance||(e[s]=n)}),Object.values(e)}function Bv(t){const e=t.defaultIntegrations||[],n=t.integrations;e.forEach(r=>{r.isDefaultInstance=!0});let s;if(Array.isArray(n))s=[...e,...n];else if(typeof n=="function"){const r=n(e);s=Array.isArray(r)?r:[r]}else s=e;return $v(s)}function Hv(t,e){const n={};return e.forEach(s=>{s&&Nf(t,s,n)}),n}function nd(t,e){for(const n of e)n?.afterAllSetup&&n.afterAllSetup(t)}function Nf(t,e,n){if(n[e.name]){I&&C.log(`Integration skipped because it was already installed: ${e.name}`);return}if(n[e.name]=e,!td.includes(e.name)&&typeof e.setupOnce=="function"&&(e.setupOnce(),td.push(e.name)),e.setup&&typeof e.setup=="function"&&e.setup(t),typeof e.preprocessEvent=="function"){const s=e.preprocessEvent.bind(e);t.on("preprocessEvent",(r,i)=>s(r,i,t))}if(typeof e.processEvent=="function"){const s=e.processEvent.bind(e),r=Object.assign((i,o)=>s(i,o,t),{id:e.name});t.addEventProcessor(r)}I&&C.log(`Integration installed: ${e.name}`)}function Wv(t){return[{type:"log",item_count:t.length,content_type:"application/vnd.sentry.items.log+json"},{items:t}]}function Vv(t,e,n,s){const r={};return e?.sdk&&(r.sdk={name:e.sdk.name,version:e.sdk.version}),n&&s&&(r.dsn=Fr(s)),Rs(r,[Wv(t)])}function Pf(t,e){const n=e??jv(t)??[];if(n.length===0)return;const s=t.getOptions(),r=Vv(n,s._metadata,s.tunnel,t.getDsn());Lf().set(t,[]),t.emit("flushLogs"),t.sendEnvelope(r)}function jv(t){return Lf().get(t)}function Lf(){return Ts("clientToLogBufferMap",()=>new WeakMap)}function qv(t){return[{type:"trace_metric",item_count:t.length,content_type:"application/vnd.sentry.items.trace-metric+json"},{items:t}]}function zv(t,e,n,s){const r={};return e?.sdk&&(r.sdk={name:e.sdk.name,version:e.sdk.version}),n&&s&&(r.dsn=Fr(s)),Rs(r,[qv(t)])}function Of(t,e){const n=e??Gv(t)??[];if(n.length===0)return;const s=t.getOptions(),r=zv(n,s._metadata,s.tunnel,t.getDsn());Df().set(t,[]),t.emit("flushMetrics"),t.sendEnvelope(r)}function Gv(t){return Df().get(t)}function Df(){return Ts("clientToMetricBufferMap",()=>new WeakMap)}function Yv(t,e,n){const s=[{type:"client_report"},{timestamp:Dr(),discarded_events:t}];return Rs(e?{dsn:e}:{},[s])}function xf(t){const e=[];t.message&&e.push(t.message);try{const n=t.exception.values[t.exception.values.length-1];n?.value&&(e.push(n.value),n.type&&e.push(`${n.type}: ${n.value}`))}catch{}return e}function Kv(t){const{trace_id:e,parent_span_id:n,span_id:s,status:r,origin:i,data:o,op:a}=t.contexts?.trace??{};return{data:o??{},description:t.transaction,op:a,parent_span_id:n,span_id:s??"",start_timestamp:t.start_timestamp??0,status:r,timestamp:t.timestamp,trace_id:e??"",origin:i,profile_id:o?.[yf],exclusive_time:o?.[vf],measurements:t.measurements,is_segment:!0}}function Jv(t){return{type:"transaction",timestamp:t.timestamp,start_timestamp:t.start_timestamp,transaction:t.description,contexts:{trace:{trace_id:t.trace_id,span_id:t.span_id,parent_span_id:t.parent_span_id,op:t.op,status:t.status,origin:t.origin,data:{...t.data,...t.profile_id&&{[yf]:t.profile_id},...t.exclusive_time&&{[vf]:t.exclusive_time}}}},measurements:t.measurements}}const sd="Not capturing exception because it's already been captured.",rd="Discarded session because of missing or non-string release",Mf=Symbol.for("SentryInternalError"),Ff=Symbol.for("SentryDoNotSendEventError"),Xv=5e3;function pi(t){return{message:t,[Mf]:!0}}function ea(t){return{message:t,[Ff]:!0}}function id(t){return!!t&&typeof t=="object"&&Mf in t}function od(t){return!!t&&typeof t=="object"&&Ff in t}function ad(t,e,n,s,r){let i=0,o,a=!1;t.on(n,()=>{i=0,clearTimeout(o),a=!1}),t.on(e,c=>{i+=s(c),i>=8e5?r(t):a||(a=!0,o=setTimeout(()=>{r(t)},Xv))}),t.on("flush",()=>{r(t)})}class Qv{constructor(e){if(this._options=e,this._integrations={},this._numProcessing=0,this._outcomes={},this._hooks={},this._eventProcessors=[],e.dsn?this._dsn=Vy(e.dsn):I&&C.warn("No DSN provided, client will not send events."),this._dsn){const s=Uv(this._dsn,e.tunnel,e._metadata?e._metadata.sdk:void 0);this._transport=e.transport({tunnel:this._options.tunnel,recordDroppedEvent:this.recordDroppedEvent.bind(this),...e.transportOptions,url:s})}this._options.enableLogs&&ad(this,"afterCaptureLog","flushLogs",nE,Pf),(this._options.enableMetrics??this._options._experiments?.enableMetrics??!0)&&ad(this,"afterCaptureMetric","flushMetrics",tE,Of)}captureException(e,n,s){const r=$e();if(Ou(e))return I&&C.log(sd),r;const i={event_id:r,...n};return this._process(this.eventFromException(e,i).then(o=>this._captureEvent(o,i,s))),i.event_id}captureMessage(e,n,s,r){const i={event_id:$e(),...s},o=xc(e)?e:String(e),a=uo(e)?this.eventFromMessage(o,n,i):this.eventFromException(e,i);return this._process(a.then(c=>this._captureEvent(c,i,r))),i.event_id}captureEvent(e,n,s){const r=$e();if(n?.originalException&&Ou(n.originalException))return I&&C.log(sd),r;const i={event_id:r,...n},o=e.sdkProcessingMetadata||{},a=o.capturedSpanScope,c=o.capturedSpanIsolationScope;return this._process(this._captureEvent(e,i,a||s,c)),i.event_id}captureSession(e){this.sendSession(e),hs(e,{init:!1})}getDsn(){return this._dsn}getOptions(){return this._options}getSdkMetadata(){return this._options._metadata}getTransport(){return this._transport}async flush(e){const n=this._transport;if(!n)return!0;this.emit("flush");const s=await this._isClientDoneProcessing(e),r=await n.flush(e);return s&&r}async close(e){const n=await this.flush(e);return this.getOptions().enabled=!1,this.emit("close"),n}getEventProcessors(){return this._eventProcessors}addEventProcessor(e){this._eventProcessors.push(e)}init(){(this._isEnabled()||this._options.integrations.some(({name:e})=>e.startsWith("Spotlight")))&&this._setupIntegrations()}getIntegrationByName(e){return this._integrations[e]}addIntegration(e){const n=this._integrations[e.name];Nf(this,e,this._integrations),n||nd(this,[e])}sendEvent(e,n={}){this.emit("beforeSendEvent",e,n);let s=_v(e,this._dsn,this._options._metadata,this._options.tunnel);for(const r of n.attachments||[])s=lv(s,hv(r));this.sendEnvelope(s).then(r=>this.emit("afterSendEvent",e,r))}sendSession(e){const{release:n,environment:s=Hc}=this._options;if("aggregates"in e){const i=e.attrs||{};if(!i.release&&!n){I&&C.warn(rd);return}i.release=i.release||n,i.environment=i.environment||s,e.attrs=i}else{if(!e.release&&!n){I&&C.warn(rd);return}e.release=e.release||n,e.environment=e.environment||s}this.emit("beforeSendSession",e);const r=mv(e,this._dsn,this._options._metadata,this._options.tunnel);this.sendEnvelope(r)}recordDroppedEvent(e,n,s=1){if(this._options.sendClientReports){const r=`${e}:${n}`;I&&C.log(`Recording outcome: "${r}"${s>1?` (${s} times)`:""}`),this._outcomes[r]=(this._outcomes[r]||0)+s}}on(e,n){const s=this._hooks[e]=this._hooks[e]||new Set,r=(...i)=>n(...i);return s.add(r),()=>{s.delete(r)}}emit(e,...n){const s=this._hooks[e];s&&s.forEach(r=>r(...n))}async sendEnvelope(e){if(this.emit("beforeEnvelope",e),this._isEnabled()&&this._transport)try{return await this._transport.send(e)}catch(n){return I&&C.error("Error while sending envelope:",n),{}}return I&&C.error("Transport disabled"),{}}_setupIntegrations(){const{integrations:e}=this._options;this._integrations=Hv(this,e),nd(this,e)}_updateSessionFromEvent(e,n){let s=n.level==="fatal",r=!1;const i=n.exception?.values;if(i){r=!0,s=!1;for(const c of i)if(c.mechanism?.handled===!1){s=!0;break}}const o=e.status==="ok";(o&&e.errors===0||o&&s)&&(hs(e,{...s&&{status:"crashed"},errors:e.errors||Number(r||s)}),this.captureSession(e))}async _isClientDoneProcessing(e){let n=0;for(;!e||n<e;){if(await new Promise(s=>setTimeout(s,1)),!this._numProcessing)return!0;n++}return!1}_isEnabled(){return this.getOptions().enabled!==!1&&this._transport!==void 0}_prepareEvent(e,n,s,r){const i=this.getOptions(),o=Object.keys(this._integrations);return!n.integrations&&o?.length&&(n.integrations=o),this.emit("preprocessEvent",e,n),e.type||r.setLastEventId(e.event_id||n.event_id),Iv(i,e,n,s,this,r).then(a=>{if(a===null)return a;this.emit("postprocessEvent",a,n),a.contexts={trace:wy(s),...a.contexts};const c=nv(this,s);return a.sdkProcessingMetadata={dynamicSamplingContext:c,...a.sdkProcessingMetadata},a})}_captureEvent(e,n={},s=cn(),r=Mr()){return I&&Ma(e)&&C.log(`Captured error event \`${xf(e)[0]||"<unknown>"}\``),this._processEvent(e,n,s,r).then(i=>i.event_id,i=>{I&&(od(i)?C.log(i.message):id(i)?C.warn(i.message):C.warn(i))})}_processEvent(e,n,s,r){const i=this.getOptions(),{sampleRate:o}=i,a=Uf(e),c=Ma(e),l=e.type||"error",u=`before send for type \`${l}\``,d=typeof o>"u"?void 0:jy(o);if(c&&typeof d=="number"&&Math.random()>d)return this.recordDroppedEvent("sample_rate","error"),Wc(ea(`Discarding event because it's not included in the random sample (sampling rate = ${o})`));const h=l==="replay_event"?"replay":l;return this._prepareEvent(e,n,s,r).then(f=>{if(f===null)throw this.recordDroppedEvent("event_processor",h),ea("An event processor returned `null`, will not send event.");if(n.data&&n.data.__sentry__===!0)return f;const _=eE(this,i,f,n);return Zv(_,u)}).then(f=>{if(f===null){if(this.recordDroppedEvent("before_send",h),a){const A=1+(e.spans||[]).length;this.recordDroppedEvent("before_send","span",A)}throw ea(`${u} returned \`null\`, will not send event.`)}const p=s.getSession()||r.getSession();if(c&&p&&this._updateSessionFromEvent(p,f),a){const m=f.sdkProcessingMetadata?.spanCountBeforeProcessing||0,A=f.spans?f.spans.length:0,B=m-A;B>0&&this.recordDroppedEvent("before_send","span",B)}const _=f.transaction_info;if(a&&_&&f.transaction!==e.transaction){const m="custom";f.transaction_info={..._,source:m}}return this.sendEvent(f,n),f}).then(null,f=>{throw od(f)||id(f)?f:(this.captureException(f,{mechanism:{handled:!1,type:"internal"},data:{__sentry__:!0},originalException:f}),pi(`Event processing pipeline threw an error, original event will not be sent. Details have been sent as a new event.
Reason: ${f}`))})}_process(e){this._numProcessing++,e.then(n=>(this._numProcessing--,n),n=>(this._numProcessing--,n))}_clearOutcomes(){const e=this._outcomes;return this._outcomes={},Object.entries(e).map(([n,s])=>{const[r,i]=n.split(":");return{reason:r,category:i,quantity:s}})}_flushOutcomes(){I&&C.log("Flushing outcomes...");const e=this._clearOutcomes();if(e.length===0){I&&C.log("No outcomes to send");return}if(!this._dsn){I&&C.log("No dsn provided, will not send outcomes");return}I&&C.log("Sending outcomes:",e);const n=Yv(e,this._options.tunnel&&Fr(this._dsn));this.sendEnvelope(n)}}function Zv(t,e){const n=`${e} must return \`null\` or a valid event.`;if(Or(t))return t.then(s=>{if(!fr(s)&&s!==null)throw pi(n);return s},s=>{throw pi(`${e} rejected with ${s}`)});if(!fr(t)&&t!==null)throw pi(n);return t}function eE(t,e,n,s){const{beforeSend:r,beforeSendTransaction:i,beforeSendSpan:o,ignoreSpans:a}=e;let c=n;if(Ma(c)&&r)return r(c,s);if(Uf(c)){if(o||a){const l=Kv(c);if(a?.length&&qu(l,a))return null;if(o){const u=o(l);u?c=xr(n,Jv(u)):Vu()}if(c.spans){const u=[],d=c.spans;for(const f of d){if(a?.length&&qu(f,a)){Zy(d,f);continue}if(o){const p=o(f);p?u.push(p):(Vu(),u.push(f))}else u.push(f)}const h=c.spans.length-u.length;h&&t.recordDroppedEvent("before_send","span",h),c.spans=u}}if(i){if(c.spans){const l=c.spans.length;c.sdkProcessingMetadata={...n.sdkProcessingMetadata,spanCountBeforeProcessing:l}}return i(c,s)}}return c}function Ma(t){return t.type===void 0}function Uf(t){return t.type==="transaction"}function tE(t){let e=0;return t.name&&(e+=t.name.length*2),e+=8,e+$f(t.attributes)}function nE(t){let e=0;return t.message&&(e+=t.message.length*2),e+$f(t.attributes)}function $f(t){if(!t)return 0;let e=0;return Object.values(t).forEach(n=>{Array.isArray(n)?e+=n.length*cd(n[0]):uo(n)?e+=cd(n):e+=100}),e}function cd(t){return typeof t=="string"?t.length*2:typeof t=="number"?8:typeof t=="boolean"?4:0}function sE(t,e){e.debug===!0&&(I?C.enable():Is(()=>{console.warn("[Sentry] Cannot initialize SDK with `debug` option using a non-debug bundle.")})),cn().update(e.initialScope);const s=new t(e);return rE(s),s.init(),s}function rE(t){cn().setClient(t)}const Bf=Symbol.for("SentryBufferFullError");function Hf(t=100){const e=new Set;function n(){return e.size<t}function s(o){e.delete(o)}function r(o){if(!n())return Wc(Bf);const a=o();return e.add(a),a.then(()=>s(a),()=>s(a)),a}function i(o){if(!e.size)return po(!0);const a=Promise.allSettled(Array.from(e)).then(()=>!0);if(!o)return a;const c=[a,new Promise(l=>setTimeout(()=>l(!1),o))];return Promise.race(c)}return{get $(){return Array.from(e)},add:r,drain:i}}const iE=60*1e3;function oE(t,e=Date.now()){const n=parseInt(`${t}`,10);if(!isNaN(n))return n*1e3;const s=Date.parse(`${t}`);return isNaN(s)?iE:s-e}function aE(t,e){return t[e]||t.all||0}function cE(t,e,n=Date.now()){return aE(t,e)>n}function lE(t,{statusCode:e,headers:n},s=Date.now()){const r={...t},i=n?.["x-sentry-rate-limits"],o=n?.["retry-after"];if(i)for(const a of i.trim().split(",")){const[c,l,,,u]=a.split(":",5),d=parseInt(c,10),h=(isNaN(d)?60:d)*1e3;if(!l)r.all=s+h;else for(const f of l.split(";"))f==="metric_bucket"?(!u||u.split(";").includes("custom"))&&(r[f]=s+h):r[f]=s+h}else o?r.all=s+oE(o,s):e===429&&(r.all=s+60*1e3);return r}const uE=64;function dE(t,e,n=Hf(t.bufferSize||uE)){let s={};const r=o=>n.drain(o);function i(o){const a=[];if(zu(o,(d,h)=>{const f=Gu(h);cE(s,f)?t.recordDroppedEvent("ratelimit_backoff",f):a.push(d)}),a.length===0)return Promise.resolve({});const c=Rs(o[0],a),l=d=>{zu(c,(h,f)=>{t.recordDroppedEvent(d,Gu(f))})},u=()=>e({body:uv(c)}).then(d=>(d.statusCode!==void 0&&(d.statusCode<200||d.statusCode>=300)&&I&&C.warn(`Sentry responded with status code ${d.statusCode} to sent event.`),s=lE(s,d),d),d=>{throw l("network_error"),I&&C.error("Encountered error running transport request:",d),d});return n.add(u).then(d=>d,d=>{if(d===Bf)return I&&C.error("Skipped sending event because buffer is full."),l("queue_overflow"),Promise.resolve({});throw d})}return{send:i,flush:r}}function ta(t){if(!t)return{};const e=t.match(/^(([^:/?#]+):)?(\/\/([^/?#]*))?([^?#]*)(\?([^#]*))?(#(.*))?$/);if(!e)return{};const n=e[6]||"",s=e[8]||"";return{host:e[4],path:e[5],protocol:e[2],search:n,hash:s,relative:e[5]+n+s}}function hE(t){"aggregates"in t?t.attrs?.ip_address===void 0&&(t.attrs={...t.attrs,ip_address:"{{auto}}"}):t.ipAddress===void 0&&(t.ipAddress="{{auto}}")}function fE(t,e,n=[e],s="npm"){const r=t._metadata||{};r.sdk||(r.sdk={name:`sentry.javascript.${e}`,packages:n.map(i=>({name:`${s}:@sentry/${i}`,version:Cn})),version:Cn}),t._metadata=r}const pE=100;function Nn(t,e){const n=Ae(),s=Mr();if(!n)return;const{beforeBreadcrumb:r=null,maxBreadcrumbs:i=pE}=n.getOptions();if(i<=0)return;const a={timestamp:Dr(),...t},c=r?Is(()=>r(a,e)):a;c!==null&&(n.emit&&n.emit("beforeAddBreadcrumb",c,e),s.addBreadcrumb(c,i))}let ld;const gE="FunctionToString",ud=new WeakMap,mE=(()=>({name:gE,setupOnce(){ld=Function.prototype.toString;try{Function.prototype.toString=function(...t){const e=Uc(this),n=ud.has(Ae())&&e!==void 0?e:this;return ld.apply(n,t)}}catch{}},setup(t){ud.set(t,!0)}})),_E=mE,yE=[/^Script error\.?$/,/^Javascript error: Script error\.? on line 0$/,/^ResizeObserver loop completed with undelivered notifications.$/,/^Cannot redefine property: googletag$/,/^Can't find variable: gmo$/,/^undefined is not an object \(evaluating 'a\.[A-Z]'\)$/,`can't redefine non-configurable property "solana"`,"vv().getRestrictions is not a function. (In 'vv().getRestrictions(1,a)', 'vv().getRestrictions' is undefined)","Can't find variable: _AutofillCallbackHandler",/^Non-Error promise rejection captured with value: Object Not Found Matching Id:\d+, MethodName:simulateEvent, ParamCount:\d+$/,/^Java exception was raised during method invocation$/],vE="EventFilters",EE=(t={})=>{let e;return{name:vE,setup(n){const s=n.getOptions();e=dd(t,s)},processEvent(n,s,r){if(!e){const i=r.getOptions();e=dd(t,i)}return bE(n,e)?null:n}}},wE=((t={})=>({...EE(t),name:"InboundFilters"}));function dd(t={},e={}){return{allowUrls:[...t.allowUrls||[],...e.allowUrls||[]],denyUrls:[...t.denyUrls||[],...e.denyUrls||[]],ignoreErrors:[...t.ignoreErrors||[],...e.ignoreErrors||[],...t.disableErrorDefaults?[]:yE],ignoreTransactions:[...t.ignoreTransactions||[],...e.ignoreTransactions||[]]}}function bE(t,e){if(t.type){if(t.type==="transaction"&&SE(t,e.ignoreTransactions))return I&&C.warn(`Event dropped due to being matched by \`ignoreTransactions\` option.
Event: ${vn(t)}`),!0}else{if(CE(t,e.ignoreErrors))return I&&C.warn(`Event dropped due to being matched by \`ignoreErrors\` option.
Event: ${vn(t)}`),!0;if(RE(t))return I&&C.warn(`Event dropped due to not having an error message, error type or stacktrace.
Event: ${vn(t)}`),!0;if(TE(t,e.denyUrls))return I&&C.warn(`Event dropped due to being matched by \`denyUrls\` option.
Event: ${vn(t)}.
Url: ${Ii(t)}`),!0;if(!IE(t,e.allowUrls))return I&&C.warn(`Event dropped due to not being matched by \`allowUrls\` option.
Event: ${vn(t)}.
Url: ${Ii(t)}`),!0}return!1}function CE(t,e){return e?.length?xf(t).some(n=>fo(n,e)):!1}function SE(t,e){if(!e?.length)return!1;const n=t.transaction;return n?fo(n,e):!1}function TE(t,e){if(!e?.length)return!1;const n=Ii(t);return n?fo(n,e):!1}function IE(t,e){if(!e?.length)return!0;const n=Ii(t);return n?fo(n,e):!0}function kE(t=[]){for(let e=t.length-1;e>=0;e--){const n=t[e];if(n&&n.filename!=="<anonymous>"&&n.filename!=="[native code]")return n.filename||null}return null}function Ii(t){try{const n=[...t.exception?.values??[]].reverse().find(s=>s.mechanism?.parent_id===void 0&&s.stacktrace?.frames?.length)?.stacktrace?.frames;return n?kE(n):null}catch{return I&&C.error(`Cannot extract url for event ${vn(t)}`),null}}function RE(t){return t.exception?.values?.length?!t.message&&!t.exception.values.some(e=>e.stacktrace||e.type&&e.type!=="Error"||e.value):!1}function AE(t,e,n,s,r,i){if(!r.exception?.values||!i||!en(i.originalException,Error))return;const o=r.exception.values.length>0?r.exception.values[r.exception.values.length-1]:void 0;o&&(r.exception.values=Fa(t,e,s,i.originalException,n,r.exception.values,o,0))}function Fa(t,e,n,s,r,i,o,a){if(i.length>=n+1)return i;let c=[...i];if(en(s[r],Error)){hd(o,a);const l=t(e,s[r]),u=c.length;fd(l,r,u,a),c=Fa(t,e,n,s[r],r,[l,...c],l,u)}return Array.isArray(s.errors)&&s.errors.forEach((l,u)=>{if(en(l,Error)){hd(o,a);const d=t(e,l),h=c.length;fd(d,`errors[${u}]`,h,a),c=Fa(t,e,n,l,r,[d,...c],d,h)}}),c}function hd(t,e){t.mechanism={handled:!0,type:"auto.core.linked_errors",...t.mechanism,...t.type==="AggregateError"&&{is_exception_group:!0},exception_id:e}}function fd(t,e,n,s){t.mechanism={handled:!0,...t.mechanism,type:"chained",source:e,exception_id:n,parent_id:s}}function NE(t){const e="console";Wn(e,t),Vn(e,PE)}function PE(){"console"in V&&F_.forEach(function(t){t in V.console&&De(V.console,t,function(e){return Ti[t]=e,function(...n){Qe("console",{args:n,level:t}),Ti[t]?.apply(V.console,n)}})})}function LE(t){return t==="warn"?"warning":["fatal","error","warning","log","info","debug"].includes(t)?t:"log"}const OE="Dedupe",DE=(()=>{let t;return{name:OE,processEvent(e){if(e.type)return e;try{if(ME(e,t))return I&&C.warn("Event dropped due to being a duplicate of previously captured event."),null}catch{}return t=e}}}),xE=DE;function ME(t,e){return e?!!(FE(t,e)||UE(t,e)):!1}function FE(t,e){const n=t.message,s=e.message;return!(!n&&!s||n&&!s||!n&&s||n!==s||!Vf(t,e)||!Wf(t,e))}function UE(t,e){const n=pd(e),s=pd(t);return!(!n||!s||n.type!==s.type||n.value!==s.value||!Vf(t,e)||!Wf(t,e))}function Wf(t,e){let n=ku(t),s=ku(e);if(!n&&!s)return!0;if(n&&!s||!n&&s||(n=n,s=s,s.length!==n.length))return!1;for(let r=0;r<s.length;r++){const i=s[r],o=n[r];if(i.filename!==o.filename||i.lineno!==o.lineno||i.colno!==o.colno||i.function!==o.function)return!1}return!0}function Vf(t,e){let n=t.fingerprint,s=e.fingerprint;if(!n&&!s)return!0;if(n&&!s||!n&&s)return!1;n=n,s=s;try{return n.join("")===s.join("")}catch{return!1}}function pd(t){return t.exception?.values?.[0]}function jf(t){if(t!==void 0)return t>=400&&t<500?"warning":t>=500?"error":void 0}const gr=V;function $E(){return"history"in gr&&!!gr.history}function BE(){if(!("fetch"in gr))return!1;try{return new Headers,new Request("data:,"),new Response,!0}catch{return!1}}function Ua(t){return t&&/^function\s+\w+\(\)\s+\{\s+\[native code\]\s+\}$/.test(t.toString())}function HE(){if(typeof EdgeRuntime=="string")return!0;if(!BE())return!1;if(Ua(gr.fetch))return!0;let t=!1;const e=gr.document;if(e&&typeof e.createElement=="function")try{const n=e.createElement("iframe");n.hidden=!0,e.head.appendChild(n),n.contentWindow?.fetch&&(t=Ua(n.contentWindow.fetch)),e.head.removeChild(n)}catch(n){I&&C.warn("Could not create sandbox iframe for pure fetch check, bailing to window.fetch: ",n)}return t}function WE(t,e){const n="fetch";Wn(n,t),Vn(n,()=>VE(void 0,e))}function VE(t,e=!1){e&&!HE()||De(V,"fetch",function(n){return function(...s){const r=new Error,{method:i,url:o}=jE(s),a={args:s,fetchData:{method:i,url:o},startTimestamp:Ct()*1e3,virtualError:r,headers:qE(s)};return Qe("fetch",{...a}),n.apply(V,s).then(async c=>(Qe("fetch",{...a,endTimestamp:Ct()*1e3,response:c}),c),c=>{if(Qe("fetch",{...a,endTimestamp:Ct()*1e3,error:c}),Dc(c)&&c.stack===void 0&&(c.stack=r.stack,An(c,"framesToPop",1)),c instanceof TypeError&&(c.message==="Failed to fetch"||c.message==="Load failed"||c.message==="NetworkError when attempting to fetch resource."))try{const l=new URL(a.fetchData.url);c.message=`${c.message} (${l.host})`}catch{}throw c})}})}function $a(t,e){return!!t&&typeof t=="object"&&!!t[e]}function gd(t){return typeof t=="string"?t:t?$a(t,"url")?t.url:t.toString?t.toString():"":""}function jE(t){if(t.length===0)return{method:"GET",url:""};if(t.length===2){const[n,s]=t;return{url:gd(n),method:$a(s,"method")?String(s.method).toUpperCase():"GET"}}const e=t[0];return{url:gd(e),method:$a(e,"method")?String(e.method).toUpperCase():"GET"}}function qE(t){const[e,n]=t;try{if(typeof n=="object"&&n!==null&&"headers"in n&&n.headers)return new Headers(n.headers);if(ey(e))return new Headers(e.headers)}catch{}}function zE(){return"npm"}const te=V;let Ba=0;function qf(){return Ba>0}function GE(){Ba++,setTimeout(()=>{Ba--})}function ps(t,e={}){function n(r){return typeof r=="function"}if(!n(t))return t;try{const r=t.__sentry_wrapped__;if(r)return typeof r=="function"?r:t;if(Uc(t))return t}catch{return t}const s=function(...r){try{const i=r.map(o=>ps(o,e));return t.apply(this,i)}catch(i){throw GE(),Ey(o=>{o.addEventProcessor(a=>(e.mechanism&&(Pa(a,void 0),ds(a,e.mechanism)),a.extra={...a.extra,arguments:r},a)),Ov(i)}),i}};try{for(const r in t)Object.prototype.hasOwnProperty.call(t,r)&&(s[r]=t[r])}catch{}hf(s,t),An(t,"__sentry_wrapped__",s);try{Object.getOwnPropertyDescriptor(s,"name").configurable&&Object.defineProperty(s,"name",{get(){return t.name}})}catch{}return s}function YE(){const t=Fc(),{referrer:e}=te.document||{},{userAgent:n}=te.navigator||{},s={...e&&{Referer:e},...n&&{"User-Agent":n}};return{url:t,headers:s}}function Vc(t,e){const n=jc(t,e),s={type:ZE(e),value:ew(e)};return n.length&&(s.stacktrace={frames:n}),s.type===void 0&&s.value===""&&(s.value="Unrecoverable error caught"),s}function KE(t,e,n,s){const i=Ae()?.getOptions().normalizeDepth,o=iw(e),a={__serialized__:Tf(e,i)};if(o)return{exception:{values:[Vc(t,o)]},extra:a};const c={exception:{values:[{type:ho(e)?e.constructor.name:s?"UnhandledRejection":"Error",value:sw(e,{isUnhandledRejection:s})}]},extra:a};if(n){const l=jc(t,n);l.length&&(c.exception.values[0].stacktrace={frames:l})}return c}function na(t,e){return{exception:{values:[Vc(t,e)]}}}function jc(t,e){const n=e.stacktrace||e.stack||"",s=XE(e),r=QE(e);try{return t(n,s,r)}catch{}return[]}const JE=/Minified React error #\d+;/i;function XE(t){return t&&JE.test(t.message)?1:0}function QE(t){return typeof t.framesToPop=="number"?t.framesToPop:0}function zf(t){return typeof WebAssembly<"u"&&typeof WebAssembly.Exception<"u"?t instanceof WebAssembly.Exception:!1}function ZE(t){const e=t?.name;return!e&&zf(t)?t.message&&Array.isArray(t.message)&&t.message.length==2?t.message[0]:"WebAssembly.Exception":e}function ew(t){const e=t?.message;return zf(t)?Array.isArray(t.message)&&t.message.length==2?t.message[1]:"wasm exception":e?e.error&&typeof e.error.message=="string"?e.error.message:e:"No error message"}function tw(t,e,n,s){const r=n?.syntheticException||void 0,i=qc(t,e,r,s);return ds(i),i.level="error",n?.event_id&&(i.event_id=n.event_id),po(i)}function nw(t,e,n="info",s,r){const i=s?.syntheticException||void 0,o=Ha(t,e,i,r);return o.level=n,s?.event_id&&(o.event_id=s.event_id),po(o)}function qc(t,e,n,s,r){let i;if(lf(e)&&e.error)return na(t,e.error);if(Au(e)||J_(e)){const o=e;if("stack"in e)i=na(t,e);else{const a=o.name||(Au(o)?"DOMError":"DOMException"),c=o.message?`${a}: ${o.message}`:a;i=Ha(t,c,n,s),Pa(i,c)}return"code"in o&&(i.tags={...i.tags,"DOMException.code":`${o.code}`}),i}return Dc(e)?na(t,e):fr(e)||ho(e)?(i=KE(t,e,n,r),ds(i,{synthetic:!0}),i):(i=Ha(t,e,n,s),Pa(i,`${e}`),ds(i,{synthetic:!0}),i)}function Ha(t,e,n,s){const r={};if(s&&n){const i=jc(t,n);i.length&&(r.exception={values:[{value:e,stacktrace:{frames:i}}]}),ds(r,{synthetic:!0})}if(xc(e)){const{__sentry_template_string__:i,__sentry_template_values__:o}=e;return r.logentry={message:i,params:o},r}return r.message=e,r}function sw(t,{isUnhandledRejection:e}){const n=ry(t),s=e?"promise rejection":"exception";return lf(t)?`Event \`ErrorEvent\` captured as ${s} with message \`${t.message}\``:ho(t)?`Event \`${rw(t)}\` (type=${t.type}) captured as ${s}`:`Object captured as ${s} with keys: ${n}`}function rw(t){try{const e=Object.getPrototypeOf(t);return e?e.constructor.name:void 0}catch{}}function iw(t){for(const e in t)if(Object.prototype.hasOwnProperty.call(t,e)){const n=t[e];if(n instanceof Error)return n}}class ow extends Qv{constructor(e){const n=aw(e),s=te.SENTRY_SDK_SOURCE||zE();fE(n,"browser",["browser"],s),n._metadata?.sdk&&(n._metadata.sdk.settings={infer_ip:n.sendDefaultPii?"auto":"never",...n._metadata.sdk.settings}),super(n);const{sendDefaultPii:r,sendClientReports:i,enableLogs:o,_experiments:a,enableMetrics:c}=this._options,l=c??a?.enableMetrics??!0;te.document&&(i||o||l)&&te.document.addEventListener("visibilitychange",()=>{te.document.visibilityState==="hidden"&&(i&&this._flushOutcomes(),o&&Pf(this),l&&Of(this))}),r&&this.on("beforeSendSession",hE)}eventFromException(e,n){return tw(this._options.stackParser,e,n,this._options.attachStacktrace)}eventFromMessage(e,n="info",s){return nw(this._options.stackParser,e,n,s,this._options.attachStacktrace)}_prepareEvent(e,n,s,r){return e.platform=e.platform||"javascript",super._prepareEvent(e,n,s,r)}}function aw(t){return{release:typeof __SENTRY_RELEASE__=="string"?__SENTRY_RELEASE__:te.SENTRY_RELEASE?.id,sendClientReports:!0,parentSpanIsAlwaysRootSpan:!0,...t}}const cw=typeof __SENTRY_DEBUG__>"u"||__SENTRY_DEBUG__,Se=V,lw=1e3;let md,Wa,Va;function uw(t){Wn("dom",t),Vn("dom",dw)}function dw(){if(!Se.document)return;const t=Qe.bind(null,"dom"),e=_d(t,!0);Se.document.addEventListener("click",e,!1),Se.document.addEventListener("keypress",e,!1),["EventTarget","Node"].forEach(n=>{const r=Se[n]?.prototype;r?.hasOwnProperty?.("addEventListener")&&(De(r,"addEventListener",function(i){return function(o,a,c){if(o==="click"||o=="keypress")try{const l=this.__sentry_instrumentation_handlers__=this.__sentry_instrumentation_handlers__||{},u=l[o]=l[o]||{refCount:0};if(!u.handler){const d=_d(t);u.handler=d,i.call(this,o,d,c)}u.refCount++}catch{}return i.call(this,o,a,c)}}),De(r,"removeEventListener",function(i){return function(o,a,c){if(o==="click"||o=="keypress")try{const l=this.__sentry_instrumentation_handlers__||{},u=l[o];u&&(u.refCount--,u.refCount<=0&&(i.call(this,o,u.handler,c),u.handler=void 0,delete l[o]),Object.keys(l).length===0&&delete this.__sentry_instrumentation_handlers__)}catch{}return i.call(this,o,a,c)}}))})}function hw(t){if(t.type!==Wa)return!1;try{if(!t.target||t.target._sentryId!==Va)return!1}catch{}return!0}function fw(t,e){return t!=="keypress"?!1:e?.tagName?!(e.tagName==="INPUT"||e.tagName==="TEXTAREA"||e.isContentEditable):!0}function _d(t,e=!1){return n=>{if(!n||n._sentryCaptured)return;const s=pw(n);if(fw(n.type,s))return;An(n,"_sentryCaptured",!0),s&&!s._sentryId&&An(s,"_sentryId",$e());const r=n.type==="keypress"?"input":n.type;hw(n)||(t({event:n,name:r,global:e}),Wa=n.type,Va=s?s._sentryId:void 0),clearTimeout(md),md=Se.setTimeout(()=>{Va=void 0,Wa=void 0},lw)}}function pw(t){try{return t.target}catch{return null}}let ei;function Gf(t){const e="history";Wn(e,t),Vn(e,gw)}function gw(){if(Se.addEventListener("popstate",()=>{const e=Se.location.href,n=ei;if(ei=e,n===e)return;Qe("history",{from:n,to:e})}),!$E())return;function t(e){return function(...n){const s=n.length>2?n[2]:void 0;if(s){const r=ei,i=mw(String(s));if(ei=i,r===i)return e.apply(this,n);Qe("history",{from:r,to:i})}return e.apply(this,n)}}De(Se.history,"pushState",t),De(Se.history,"replaceState",t)}function mw(t){try{return new URL(t,Se.location.origin).toString()}catch{return t}}const gi={};function _w(t){const e=gi[t];if(e)return e;let n=Se[t];if(Ua(n))return gi[t]=n.bind(Se);const s=Se.document;if(s&&typeof s.createElement=="function")try{const r=s.createElement("iframe");r.hidden=!0,s.head.appendChild(r);const i=r.contentWindow;i?.[t]&&(n=i[t]),s.head.removeChild(r)}catch(r){cw&&C.warn(`Could not create sandbox iframe for ${t} check, bailing to window.${t}: `,r)}return n&&(gi[t]=n.bind(Se))}function yw(t){gi[t]=void 0}const Xs="__sentry_xhr_v3__";function vw(t){Wn("xhr",t),Vn("xhr",Ew)}function Ew(){if(!Se.XMLHttpRequest)return;const t=XMLHttpRequest.prototype;t.open=new Proxy(t.open,{apply(e,n,s){const r=new Error,i=Ct()*1e3,o=bt(s[0])?s[0].toUpperCase():void 0,a=ww(s[1]);if(!o||!a)return e.apply(n,s);n[Xs]={method:o,url:a,request_headers:{}},o==="POST"&&a.match(/sentry_key/)&&(n.__sentry_own_request__=!0);const c=()=>{const l=n[Xs];if(l&&n.readyState===4){try{l.status_code=n.status}catch{}const u={endTimestamp:Ct()*1e3,startTimestamp:i,xhr:n,virtualError:r};Qe("xhr",u)}};return"onreadystatechange"in n&&typeof n.onreadystatechange=="function"?n.onreadystatechange=new Proxy(n.onreadystatechange,{apply(l,u,d){return c(),l.apply(u,d)}}):n.addEventListener("readystatechange",c),n.setRequestHeader=new Proxy(n.setRequestHeader,{apply(l,u,d){const[h,f]=d,p=u[Xs];return p&&bt(h)&&bt(f)&&(p.request_headers[h.toLowerCase()]=f),l.apply(u,d)}}),e.apply(n,s)}}),t.send=new Proxy(t.send,{apply(e,n,s){const r=n[Xs];if(!r)return e.apply(n,s);s[0]!==void 0&&(r.body=s[0]);const i={startTimestamp:Ct()*1e3,xhr:n};return Qe("xhr",i),e.apply(n,s)}})}function ww(t){if(bt(t))return t;try{return t.toString()}catch{}}const bw=40;function Cw(t,e=_w("fetch")){let n=0,s=0;async function r(i){const o=i.body.length;n+=o,s++;const a={body:i.body,method:"POST",referrerPolicy:"strict-origin",headers:t.headers,keepalive:n<=6e4&&s<15,...t.fetchOptions};try{const c=await e(t.url,a);return{statusCode:c.status,headers:{"x-sentry-rate-limits":c.headers.get("X-Sentry-Rate-Limits"),"retry-after":c.headers.get("Retry-After")}}}catch(c){throw yw("fetch"),c}finally{n-=o,s--}}return dE(t,r,Hf(t.bufferSize||bw))}const Sw=30,Tw=50;function ja(t,e,n,s){const r={filename:t,function:e==="<anonymous>"?Rn:e,in_app:!0};return n!==void 0&&(r.lineno=n),s!==void 0&&(r.colno=s),r}const Iw=/^\s*at (\S+?)(?::(\d+))(?::(\d+))\s*$/i,kw=/^\s*at (?:(.+?\)(?: \[.+\])?|.*?) ?\((?:address at )?)?(?:async )?((?:<anonymous>|[-a-z]+:|.*bundle|\/)?.*?)(?::(\d+))?(?::(\d+))?\)?\s*$/i,Rw=/\((\S*)(?::(\d+))(?::(\d+))\)/,Aw=/at (.+?) ?\(data:(.+?),/,Nw=t=>{const e=t.match(Aw);if(e)return{filename:`<data:${e[2]}>`,function:e[1]};const n=Iw.exec(t);if(n){const[,r,i,o]=n;return ja(r,Rn,+i,+o)}const s=kw.exec(t);if(s){if(s[2]&&s[2].indexOf("eval")===0){const a=Rw.exec(s[2]);a&&(s[2]=a[1],s[3]=a[2],s[4]=a[3])}const[i,o]=Yf(s[1]||Rn,s[2]);return ja(o,i,s[3]?+s[3]:void 0,s[4]?+s[4]:void 0)}},Pw=[Sw,Nw],Lw=/^\s*(.*?)(?:\((.*?)\))?(?:^|@)?((?:[-a-z]+)?:\/.*?|\[native code\]|[^@]*(?:bundle|\d+\.js)|\/[\w\-. /=]+)(?::(\d+))?(?::(\d+))?\s*$/i,Ow=/(\S+) line (\d+)(?: > eval line \d+)* > eval/i,Dw=t=>{const e=Lw.exec(t);if(e){if(e[3]&&e[3].indexOf(" > eval")>-1){const i=Ow.exec(e[3]);i&&(e[1]=e[1]||"eval",e[3]=i[1],e[4]=i[2],e[5]="")}let s=e[3],r=e[1]||Rn;return[r,s]=Yf(r,s),ja(s,r,e[4]?+e[4]:void 0,e[5]?+e[5]:void 0)}},xw=[Tw,Dw],Mw=[Pw,xw],Fw=of(...Mw),Yf=(t,e)=>{const n=t.indexOf("safari-extension")!==-1,s=t.indexOf("safari-web-extension")!==-1;return n||s?[t.indexOf("@")!==-1?t.split("@")[0]:Rn,n?`safari-extension:${e}`:`safari-web-extension:${e}`]:[t,e]},go=typeof __SENTRY_DEBUG__>"u"||__SENTRY_DEBUG__,ti=1024,Uw="Breadcrumbs",$w=((t={})=>{const e={console:!0,dom:!0,fetch:!0,history:!0,sentry:!0,xhr:!0,...t};return{name:Uw,setup(n){e.console&&NE(Vw(n)),e.dom&&uw(Ww(n,e.dom)),e.xhr&&vw(jw(n)),e.fetch&&WE(qw(n)),e.history&&Gf(zw(n)),e.sentry&&n.on("beforeSendEvent",Hw(n))}}}),Bw=$w;function Hw(t){return function(n){Ae()===t&&Nn({category:`sentry.${n.type==="transaction"?"transaction":"event"}`,event_id:n.event_id,level:n.level,message:vn(n)},{event:n})}}function Ww(t,e){return function(s){if(Ae()!==t)return;let r,i,o=typeof e=="object"?e.serializeAttribute:void 0,a=typeof e=="object"&&typeof e.maxStringLength=="number"?e.maxStringLength:void 0;a&&a>ti&&(go&&C.warn(`\`dom.maxStringLength\` cannot exceed ${ti}, but a value of ${a} was configured. Sentry will use ${ti} instead.`),a=ti),typeof o=="string"&&(o=[o]);try{const l=s.event,u=Gw(l)?l.target:l;r=df(u,{keyAttrs:o,maxStringLength:a}),i=sy(u)}catch{r="<unknown>"}if(r.length===0)return;const c={category:`ui.${s.name}`,message:r};i&&(c.data={"ui.component_name":i}),Nn(c,{event:s.event,name:s.name,global:s.global})}}function Vw(t){return function(n){if(Ae()!==t)return;const s={category:"console",data:{arguments:n.args,logger:"console"},level:LE(n.level),message:Lu(n.args," ")};if(n.level==="assert")if(n.args[0]===!1)s.message=`Assertion failed: ${Lu(n.args.slice(1)," ")||"console.assert"}`,s.data.arguments=n.args.slice(1);else return;Nn(s,{input:n.args,level:n.level})}}function jw(t){return function(n){if(Ae()!==t)return;const{startTimestamp:s,endTimestamp:r}=n,i=n.xhr[Xs];if(!s||!r||!i)return;const{method:o,url:a,status_code:c,body:l}=i,u={method:o,url:a,status_code:c},d={xhr:n.xhr,input:l,startTimestamp:s,endTimestamp:r},h={category:"xhr",data:u,type:"http",level:jf(c)};t.emit("beforeOutgoingRequestBreadcrumb",h,d),Nn(h,d)}}function qw(t){return function(n){if(Ae()!==t)return;const{startTimestamp:s,endTimestamp:r}=n;if(r&&!(n.fetchData.url.match(/sentry_key/)&&n.fetchData.method==="POST"))if(n.fetchData.method,n.fetchData.url,n.error){const i=n.fetchData,o={data:n.error,input:n.args,startTimestamp:s,endTimestamp:r},a={category:"fetch",data:i,level:"error",type:"http"};t.emit("beforeOutgoingRequestBreadcrumb",a,o),Nn(a,o)}else{const i=n.response,o={...n.fetchData,status_code:i?.status};n.fetchData.request_body_size,n.fetchData.response_body_size,i?.status;const a={input:n.args,response:i,startTimestamp:s,endTimestamp:r},c={category:"fetch",data:o,type:"http",level:jf(o.status_code)};t.emit("beforeOutgoingRequestBreadcrumb",c,a),Nn(c,a)}}}function zw(t){return function(n){if(Ae()!==t)return;let s=n.from,r=n.to;const i=ta(te.location.href);let o=s?ta(s):void 0;const a=ta(r);o?.path||(o=i),i.protocol===a.protocol&&i.host===a.host&&(r=a.relative),i.protocol===o.protocol&&i.host===o.host&&(s=o.relative),Nn({category:"navigation",data:{from:s,to:r}})}}function Gw(t){return!!t&&!!t.target}const Yw=["EventTarget","Window","Node","ApplicationCache","AudioTrackList","BroadcastChannel","ChannelMergerNode","CryptoOperation","EventSource","FileReader","HTMLUnknownElement","IDBDatabase","IDBRequest","IDBTransaction","KeyOperation","MediaController","MessagePort","ModalWindow","Notification","SVGElementInstance","Screen","SharedWorker","TextTrack","TextTrackCue","TextTrackList","WebSocket","WebSocketWorker","Worker","XMLHttpRequest","XMLHttpRequestEventTarget","XMLHttpRequestUpload"],Kw="BrowserApiErrors",Jw=((t={})=>{const e={XMLHttpRequest:!0,eventTarget:!0,requestAnimationFrame:!0,setInterval:!0,setTimeout:!0,unregisterOriginalCallbacks:!1,...t};return{name:Kw,setupOnce(){e.setTimeout&&De(te,"setTimeout",yd),e.setInterval&&De(te,"setInterval",yd),e.requestAnimationFrame&&De(te,"requestAnimationFrame",Qw),e.XMLHttpRequest&&"XMLHttpRequest"in te&&De(XMLHttpRequest.prototype,"send",Zw);const n=e.eventTarget;n&&(Array.isArray(n)?n:Yw).forEach(r=>eb(r,e))}}}),Xw=Jw;function yd(t){return function(...e){const n=e[0];return e[0]=ps(n,{mechanism:{handled:!1,type:`auto.browser.browserapierrors.${Zt(t)}`}}),t.apply(this,e)}}function Qw(t){return function(e){return t.apply(this,[ps(e,{mechanism:{data:{handler:Zt(t)},handled:!1,type:"auto.browser.browserapierrors.requestAnimationFrame"}})])}}function Zw(t){return function(...e){const n=this;return["onload","onerror","onprogress","onreadystatechange"].forEach(r=>{r in n&&typeof n[r]=="function"&&De(n,r,function(i){const o={mechanism:{data:{handler:Zt(i)},handled:!1,type:`auto.browser.browserapierrors.xhr.${r}`}},a=Uc(i);return a&&(o.mechanism.data.handler=Zt(a)),ps(i,o)})}),t.apply(this,e)}}function eb(t,e){const s=te[t]?.prototype;s?.hasOwnProperty?.("addEventListener")&&(De(s,"addEventListener",function(r){return function(i,o,a){try{tb(o)&&(o.handleEvent=ps(o.handleEvent,{mechanism:{data:{handler:Zt(o),target:t},handled:!1,type:"auto.browser.browserapierrors.handleEvent"}}))}catch{}return e.unregisterOriginalCallbacks&&nb(this,i,o),r.apply(this,[i,ps(o,{mechanism:{data:{handler:Zt(o),target:t},handled:!1,type:"auto.browser.browserapierrors.addEventListener"}}),a])}}),De(s,"removeEventListener",function(r){return function(i,o,a){try{const c=o.__sentry_wrapped__;c&&r.call(this,i,c,a)}catch{}return r.call(this,i,o,a)}}))}function tb(t){return typeof t.handleEvent=="function"}function nb(t,e,n){t&&typeof t=="object"&&"removeEventListener"in t&&typeof t.removeEventListener=="function"&&t.removeEventListener(e,n)}const sb=()=>({name:"BrowserSession",setupOnce(){if(typeof te.document>"u"){go&&C.warn("Using the `browserSessionIntegration` in non-browser environments is not supported.");return}Zu({ignoreDuration:!0}),ed(),Gf(({from:t,to:e})=>{t!==void 0&&t!==e&&(Zu({ignoreDuration:!0}),ed())})}}),rb="GlobalHandlers",ib=((t={})=>{const e={onerror:!0,onunhandledrejection:!0,...t};return{name:rb,setupOnce(){Error.stackTraceLimit=50},setup(n){e.onerror&&(ab(n),vd("onerror")),e.onunhandledrejection&&(cb(n),vd("onunhandledrejection"))}}}),ob=ib;function ab(t){z_(e=>{const{stackParser:n,attachStacktrace:s}=Kf();if(Ae()!==t||qf())return;const{msg:r,url:i,line:o,column:a,error:c}=e,l=db(qc(n,c||r,void 0,s,!1),i,o,a);l.level="error",kf(l,{originalException:c,mechanism:{handled:!1,type:"auto.browser.global_handlers.onerror"}})})}function cb(t){Y_(e=>{const{stackParser:n,attachStacktrace:s}=Kf();if(Ae()!==t||qf())return;const r=lb(e),i=uo(r)?ub(r):qc(n,r,void 0,s,!0);i.level="error",kf(i,{originalException:r,mechanism:{handled:!1,type:"auto.browser.global_handlers.onunhandledrejection"}})})}function lb(t){if(uo(t))return t;try{if("reason"in t)return t.reason;if("detail"in t&&"reason"in t.detail)return t.detail.reason}catch{}return t}function ub(t){return{exception:{values:[{type:"UnhandledRejection",value:`Non-Error promise rejection captured with value: ${String(t)}`}]}}}function db(t,e,n,s){const r=t.exception=t.exception||{},i=r.values=r.values||[],o=i[0]=i[0]||{},a=o.stacktrace=o.stacktrace||{},c=a.frames=a.frames||[],l=s,u=n,d=hb(e)??Fc();return c.length===0&&c.push({colno:l,filename:d,function:Rn,in_app:!0,lineno:u}),t}function vd(t){go&&C.log(`Global Handler attached: ${t}`)}function Kf(){return Ae()?.getOptions()||{stackParser:()=>[],attachStacktrace:!1}}function hb(t){if(!(!bt(t)||t.length===0)){if(t.startsWith("data:")){const e=t.match(/^data:([^;]+)/),n=e?e[1]:"text/javascript",s=t.includes("base64,");return`<data:${n}${s?",base64":""}>`}return t}}const fb=()=>({name:"HttpContext",preprocessEvent(t){if(!te.navigator&&!te.location&&!te.document)return;const e=YE(),n={...e.headers,...t.request?.headers};t.request={...e,...t.request,headers:n}}}),pb="cause",gb=5,mb="LinkedErrors",_b=((t={})=>{const e=t.limit||gb,n=t.key||pb;return{name:mb,preprocessEvent(s,r,i){const o=i.getOptions();AE(Vc,o.stackParser,n,e,s,r)}}}),yb=_b;function vb(){return Eb()?(go&&Is(()=>{console.error("[Sentry] You cannot use Sentry.init() in a browser extension, see: https://docs.sentry.io/platforms/javascript/best-practices/browser-extensions/")}),!0):!1}function Eb(){if(typeof te.window>"u")return!1;const t=te;if(t.nw||!(t.chrome||t.browser)?.runtime?.id)return!1;const n=Fc(),s=["chrome-extension","moz-extension","ms-browser-extension","safari-web-extension"];return!(te===te.top&&s.some(i=>n.startsWith(`${i}://`)))}function wb(t){return[wE(),_E(),Xw(),Bw(),ob(),yb(),xE(),fb(),sb()]}function bb(t={}){const e=!t.skipBrowserExtensionCheck&&vb();let n=t.defaultIntegrations==null?wb():t.defaultIntegrations;const s={...t,enabled:e?!1:t.enabled,stackParser:j_(t.stackParser||Fw),integrations:Bv({integrations:t.integrations,defaultIntegrations:n}),transport:t.transport||Cw};return sE(ow,s)}const Cb="https://adc1b5518c6a55273a1398d1b8b9cd3e@o4510415124496384.ingest.de.sentry.io/4510415129083984";bb({dsn:Cb,sendDefaultPii:!0});/**
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
 */const Sb=()=>{};var Ed={};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Jf={NODE_ADMIN:!1,SDK_VERSION:"${JSCORE_VERSION}"};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const g=function(t,e){if(!t)throw As(e)},As=function(t){return new Error("Firebase Database ("+Jf.SDK_VERSION+") INTERNAL ASSERT FAILED: "+t)};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Xf=function(t){const e=[];let n=0;for(let s=0;s<t.length;s++){let r=t.charCodeAt(s);r<128?e[n++]=r:r<2048?(e[n++]=r>>6|192,e[n++]=r&63|128):(r&64512)===55296&&s+1<t.length&&(t.charCodeAt(s+1)&64512)===56320?(r=65536+((r&1023)<<10)+(t.charCodeAt(++s)&1023),e[n++]=r>>18|240,e[n++]=r>>12&63|128,e[n++]=r>>6&63|128,e[n++]=r&63|128):(e[n++]=r>>12|224,e[n++]=r>>6&63|128,e[n++]=r&63|128)}return e},Tb=function(t){const e=[];let n=0,s=0;for(;n<t.length;){const r=t[n++];if(r<128)e[s++]=String.fromCharCode(r);else if(r>191&&r<224){const i=t[n++];e[s++]=String.fromCharCode((r&31)<<6|i&63)}else if(r>239&&r<365){const i=t[n++],o=t[n++],a=t[n++],c=((r&7)<<18|(i&63)<<12|(o&63)<<6|a&63)-65536;e[s++]=String.fromCharCode(55296+(c>>10)),e[s++]=String.fromCharCode(56320+(c&1023))}else{const i=t[n++],o=t[n++];e[s++]=String.fromCharCode((r&15)<<12|(i&63)<<6|o&63)}}return e.join("")},mo={byteToCharMap_:null,charToByteMap_:null,byteToCharMapWebSafe_:null,charToByteMapWebSafe_:null,ENCODED_VALS_BASE:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",get ENCODED_VALS(){return this.ENCODED_VALS_BASE+"+/="},get ENCODED_VALS_WEBSAFE(){return this.ENCODED_VALS_BASE+"-_."},HAS_NATIVE_SUPPORT:typeof atob=="function",encodeByteArray(t,e){if(!Array.isArray(t))throw Error("encodeByteArray takes an array as a parameter");this.init_();const n=e?this.byteToCharMapWebSafe_:this.byteToCharMap_,s=[];for(let r=0;r<t.length;r+=3){const i=t[r],o=r+1<t.length,a=o?t[r+1]:0,c=r+2<t.length,l=c?t[r+2]:0,u=i>>2,d=(i&3)<<4|a>>4;let h=(a&15)<<2|l>>6,f=l&63;c||(f=64,o||(h=64)),s.push(n[u],n[d],n[h],n[f])}return s.join("")},encodeString(t,e){return this.HAS_NATIVE_SUPPORT&&!e?btoa(t):this.encodeByteArray(Xf(t),e)},decodeString(t,e){return this.HAS_NATIVE_SUPPORT&&!e?atob(t):Tb(this.decodeStringToByteArray(t,e))},decodeStringToByteArray(t,e){this.init_();const n=e?this.charToByteMapWebSafe_:this.charToByteMap_,s=[];for(let r=0;r<t.length;){const i=n[t.charAt(r++)],a=r<t.length?n[t.charAt(r)]:0;++r;const l=r<t.length?n[t.charAt(r)]:64;++r;const d=r<t.length?n[t.charAt(r)]:64;if(++r,i==null||a==null||l==null||d==null)throw new Ib;const h=i<<2|a>>4;if(s.push(h),l!==64){const f=a<<4&240|l>>2;if(s.push(f),d!==64){const p=l<<6&192|d;s.push(p)}}}return s},init_(){if(!this.byteToCharMap_){this.byteToCharMap_={},this.charToByteMap_={},this.byteToCharMapWebSafe_={},this.charToByteMapWebSafe_={};for(let t=0;t<this.ENCODED_VALS.length;t++)this.byteToCharMap_[t]=this.ENCODED_VALS.charAt(t),this.charToByteMap_[this.byteToCharMap_[t]]=t,this.byteToCharMapWebSafe_[t]=this.ENCODED_VALS_WEBSAFE.charAt(t),this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[t]]=t,t>=this.ENCODED_VALS_BASE.length&&(this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(t)]=t,this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(t)]=t)}}};class Ib extends Error{constructor(){super(...arguments),this.name="DecodeBase64StringError"}}const Qf=function(t){const e=Xf(t);return mo.encodeByteArray(e,!0)},ki=function(t){return Qf(t).replace(/\./g,"")},Ri=function(t){try{return mo.decodeString(t,!0)}catch(e){console.error("base64Decode failed: ",e)}return null};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function kb(t){return Zf(void 0,t)}function Zf(t,e){if(!(e instanceof Object))return e;switch(e.constructor){case Date:const n=e;return new Date(n.getTime());case Object:t===void 0&&(t={});break;case Array:t=[];break;default:return e}for(const n in e)!e.hasOwnProperty(n)||!Rb(n)||(t[n]=Zf(t[n],e[n]));return t}function Rb(t){return t!=="__proto__"}/**
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
 */function ep(){if(typeof self<"u")return self;if(typeof window<"u")return window;if(typeof global<"u")return global;throw new Error("Unable to locate global object.")}/**
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
 */const Ab=()=>ep().__FIREBASE_DEFAULTS__,Nb=()=>{if(typeof process>"u"||typeof Ed>"u")return;const t=Ed.__FIREBASE_DEFAULTS__;if(t)return JSON.parse(t)},Pb=()=>{if(typeof document>"u")return;let t;try{t=document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/)}catch{return}const e=t&&Ri(t[1]);return e&&JSON.parse(e)},zc=()=>{try{return Sb()||Ab()||Nb()||Pb()}catch(t){console.info(`Unable to get __FIREBASE_DEFAULTS__ due to: ${t}`);return}},tp=t=>zc()?.emulatorHosts?.[t],Lb=t=>{const e=tp(t);if(!e)return;const n=e.lastIndexOf(":");if(n<=0||n+1===e.length)throw new Error(`Invalid host ${e} with no separate hostname and port!`);const s=parseInt(e.substring(n+1),10);return e[0]==="["?[e.substring(1,n-1),s]:[e.substring(0,n),s]},np=()=>zc()?.config,sp=t=>zc()?.[`_${t}`];/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ne{constructor(){this.reject=()=>{},this.resolve=()=>{},this.promise=new Promise((e,n)=>{this.resolve=e,this.reject=n})}wrapCallback(e){return(n,s)=>{n?this.reject(n):this.resolve(s),typeof e=="function"&&(this.promise.catch(()=>{}),e.length===1?e(n):e(n,s))}}}/**
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
 */function Ns(t){try{return(t.startsWith("http://")||t.startsWith("https://")?new URL(t).hostname:t).endsWith(".cloudworkstations.dev")}catch{return!1}}async function rp(t){return(await fetch(t,{credentials:"include"})).ok}/**
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
 */function Ob(t,e){if(t.uid)throw new Error('The "uid" field is no longer supported by mockUserToken. Please use "sub" instead for Firebase Auth User ID.');const n={alg:"none",type:"JWT"},s=e||"demo-project",r=t.iat||0,i=t.sub||t.user_id;if(!i)throw new Error("mockUserToken must contain 'sub' or 'user_id' field!");const o={iss:`https://securetoken.google.com/${s}`,aud:s,iat:r,exp:r+3600,auth_time:r,sub:i,user_id:i,firebase:{sign_in_provider:"custom",identities:{}},...t};return[ki(JSON.stringify(n)),ki(JSON.stringify(o)),""].join(".")}const Zs={};function Db(){const t={prod:[],emulator:[]};for(const e of Object.keys(Zs))Zs[e]?t.emulator.push(e):t.prod.push(e);return t}function xb(t){let e=document.getElementById(t),n=!1;return e||(e=document.createElement("div"),e.setAttribute("id",t),n=!0),{created:n,element:e}}let wd=!1;function ip(t,e){if(typeof window>"u"||typeof document>"u"||!Ns(window.location.host)||Zs[t]===e||Zs[t]||wd)return;Zs[t]=e;function n(h){return`__firebase__banner__${h}`}const s="__firebase__banner",i=Db().prod.length>0;function o(){const h=document.getElementById(s);h&&h.remove()}function a(h){h.style.display="flex",h.style.background="#7faaf0",h.style.position="fixed",h.style.bottom="5px",h.style.left="5px",h.style.padding=".5em",h.style.borderRadius="5px",h.style.alignItems="center"}function c(h,f){h.setAttribute("width","24"),h.setAttribute("id",f),h.setAttribute("height","24"),h.setAttribute("viewBox","0 0 24 24"),h.setAttribute("fill","none"),h.style.marginLeft="-6px"}function l(){const h=document.createElement("span");return h.style.cursor="pointer",h.style.marginLeft="16px",h.style.fontSize="24px",h.innerHTML=" &times;",h.onclick=()=>{wd=!0,o()},h}function u(h,f){h.setAttribute("id",f),h.innerText="Learn more",h.href="https://firebase.google.com/docs/studio/preview-apps#preview-backend",h.setAttribute("target","__blank"),h.style.paddingLeft="5px",h.style.textDecoration="underline"}function d(){const h=xb(s),f=n("text"),p=document.getElementById(f)||document.createElement("span"),_=n("learnmore"),m=document.getElementById(_)||document.createElement("a"),A=n("preprendIcon"),B=document.getElementById(A)||document.createElementNS("http://www.w3.org/2000/svg","svg");if(h.created){const x=h.element;a(x),u(m,_);const w=l();c(B,A),x.append(B,p,m,w),document.body.appendChild(x)}i?(p.innerText="Preview backend disconnected.",B.innerHTML=`<g clip-path="url(#clip0_6013_33858)">
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
 */function Re(){return typeof navigator<"u"&&typeof navigator.userAgent=="string"?navigator.userAgent:""}function Gc(){return typeof window<"u"&&!!(window.cordova||window.phonegap||window.PhoneGap)&&/ios|iphone|ipod|ipad|android|blackberry|iemobile/i.test(Re())}function Mb(){return typeof navigator<"u"&&navigator.userAgent==="Cloudflare-Workers"}function Fb(){const t=typeof chrome=="object"?chrome.runtime:typeof browser=="object"?browser.runtime:void 0;return typeof t=="object"&&t.id!==void 0}function op(){return typeof navigator=="object"&&navigator.product==="ReactNative"}function Ub(){const t=Re();return t.indexOf("MSIE ")>=0||t.indexOf("Trident/")>=0}function $b(){return Jf.NODE_ADMIN===!0}function Yc(){try{return typeof indexedDB=="object"}catch{return!1}}function Bb(){return new Promise((t,e)=>{try{let n=!0;const s="validate-browser-context-for-indexeddb-analytics-module",r=self.indexedDB.open(s);r.onsuccess=()=>{r.result.close(),n||self.indexedDB.deleteDatabase(s),t(!0)},r.onupgradeneeded=()=>{n=!1},r.onerror=()=>{e(r.error?.message||"")}}catch(n){e(n)}})}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Hb="FirebaseError";class ln extends Error{constructor(e,n,s){super(n),this.code=e,this.customData=s,this.name=Hb,Object.setPrototypeOf(this,ln.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,Ps.prototype.create)}}class Ps{constructor(e,n,s){this.service=e,this.serviceName=n,this.errors=s}create(e,...n){const s=n[0]||{},r=`${this.service}/${e}`,i=this.errors[e],o=i?Wb(i,s):"Error",a=`${this.serviceName}: ${o} (${r}).`;return new ln(r,a,s)}}function Wb(t,e){return t.replace(Vb,(n,s)=>{const r=e[s];return r!=null?String(r):`<${s}?>`})}const Vb=/\{\$([^}]+)}/g;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function mr(t){return JSON.parse(t)}function ae(t){return JSON.stringify(t)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ap=function(t){let e={},n={},s={},r="";try{const i=t.split(".");e=mr(Ri(i[0])||""),n=mr(Ri(i[1])||""),r=i[2],s=n.d||{},delete n.d}catch{}return{header:e,claims:n,data:s,signature:r}},jb=function(t){const e=ap(t),n=e.claims;return!!n&&typeof n=="object"&&n.hasOwnProperty("iat")},qb=function(t){const e=ap(t).claims;return typeof e=="object"&&e.admin===!0};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function pt(t,e){return Object.prototype.hasOwnProperty.call(t,e)}function gs(t,e){if(Object.prototype.hasOwnProperty.call(t,e))return t[e]}function Ai(t){for(const e in t)if(Object.prototype.hasOwnProperty.call(t,e))return!1;return!0}function Ni(t,e,n){const s={};for(const r in t)Object.prototype.hasOwnProperty.call(t,r)&&(s[r]=e.call(n,t[r],r,t));return s}function Pn(t,e){if(t===e)return!0;const n=Object.keys(t),s=Object.keys(e);for(const r of n){if(!s.includes(r))return!1;const i=t[r],o=e[r];if(bd(i)&&bd(o)){if(!Pn(i,o))return!1}else if(i!==o)return!1}for(const r of s)if(!n.includes(r))return!1;return!0}function bd(t){return t!==null&&typeof t=="object"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ls(t){const e=[];for(const[n,s]of Object.entries(t))Array.isArray(s)?s.forEach(r=>{e.push(encodeURIComponent(n)+"="+encodeURIComponent(r))}):e.push(encodeURIComponent(n)+"="+encodeURIComponent(s));return e.length?"&"+e.join("&"):""}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class zb{constructor(){this.chain_=[],this.buf_=[],this.W_=[],this.pad_=[],this.inbuf_=0,this.total_=0,this.blockSize=512/8,this.pad_[0]=128;for(let e=1;e<this.blockSize;++e)this.pad_[e]=0;this.reset()}reset(){this.chain_[0]=1732584193,this.chain_[1]=4023233417,this.chain_[2]=2562383102,this.chain_[3]=271733878,this.chain_[4]=3285377520,this.inbuf_=0,this.total_=0}compress_(e,n){n||(n=0);const s=this.W_;if(typeof e=="string")for(let d=0;d<16;d++)s[d]=e.charCodeAt(n)<<24|e.charCodeAt(n+1)<<16|e.charCodeAt(n+2)<<8|e.charCodeAt(n+3),n+=4;else for(let d=0;d<16;d++)s[d]=e[n]<<24|e[n+1]<<16|e[n+2]<<8|e[n+3],n+=4;for(let d=16;d<80;d++){const h=s[d-3]^s[d-8]^s[d-14]^s[d-16];s[d]=(h<<1|h>>>31)&4294967295}let r=this.chain_[0],i=this.chain_[1],o=this.chain_[2],a=this.chain_[3],c=this.chain_[4],l,u;for(let d=0;d<80;d++){d<40?d<20?(l=a^i&(o^a),u=1518500249):(l=i^o^a,u=1859775393):d<60?(l=i&o|a&(i|o),u=2400959708):(l=i^o^a,u=3395469782);const h=(r<<5|r>>>27)+l+c+u+s[d]&4294967295;c=a,a=o,o=(i<<30|i>>>2)&4294967295,i=r,r=h}this.chain_[0]=this.chain_[0]+r&4294967295,this.chain_[1]=this.chain_[1]+i&4294967295,this.chain_[2]=this.chain_[2]+o&4294967295,this.chain_[3]=this.chain_[3]+a&4294967295,this.chain_[4]=this.chain_[4]+c&4294967295}update(e,n){if(e==null)return;n===void 0&&(n=e.length);const s=n-this.blockSize;let r=0;const i=this.buf_;let o=this.inbuf_;for(;r<n;){if(o===0)for(;r<=s;)this.compress_(e,r),r+=this.blockSize;if(typeof e=="string"){for(;r<n;)if(i[o]=e.charCodeAt(r),++o,++r,o===this.blockSize){this.compress_(i),o=0;break}}else for(;r<n;)if(i[o]=e[r],++o,++r,o===this.blockSize){this.compress_(i),o=0;break}}this.inbuf_=o,this.total_+=n}digest(){const e=[];let n=this.total_*8;this.inbuf_<56?this.update(this.pad_,56-this.inbuf_):this.update(this.pad_,this.blockSize-(this.inbuf_-56));for(let r=this.blockSize-1;r>=56;r--)this.buf_[r]=n&255,n/=256;this.compress_(this.buf_);let s=0;for(let r=0;r<5;r++)for(let i=24;i>=0;i-=8)e[s]=this.chain_[r]>>i&255,++s;return e}}function Gb(t,e){const n=new Yb(t,e);return n.subscribe.bind(n)}class Yb{constructor(e,n){this.observers=[],this.unsubscribes=[],this.observerCount=0,this.task=Promise.resolve(),this.finalized=!1,this.onNoObservers=n,this.task.then(()=>{e(this)}).catch(s=>{this.error(s)})}next(e){this.forEachObserver(n=>{n.next(e)})}error(e){this.forEachObserver(n=>{n.error(e)}),this.close(e)}complete(){this.forEachObserver(e=>{e.complete()}),this.close()}subscribe(e,n,s){let r;if(e===void 0&&n===void 0&&s===void 0)throw new Error("Missing Observer.");Kb(e,["next","error","complete"])?r=e:r={next:e,error:n,complete:s},r.next===void 0&&(r.next=sa),r.error===void 0&&(r.error=sa),r.complete===void 0&&(r.complete=sa);const i=this.unsubscribeOne.bind(this,this.observers.length);return this.finalized&&this.task.then(()=>{try{this.finalError?r.error(this.finalError):r.complete()}catch{}}),this.observers.push(r),i}unsubscribeOne(e){this.observers===void 0||this.observers[e]===void 0||(delete this.observers[e],this.observerCount-=1,this.observerCount===0&&this.onNoObservers!==void 0&&this.onNoObservers(this))}forEachObserver(e){if(!this.finalized)for(let n=0;n<this.observers.length;n++)this.sendOne(n,e)}sendOne(e,n){this.task.then(()=>{if(this.observers!==void 0&&this.observers[e]!==void 0)try{n(this.observers[e])}catch(s){typeof console<"u"&&console.error&&console.error(s)}})}close(e){this.finalized||(this.finalized=!0,e!==void 0&&(this.finalError=e),this.task.then(()=>{this.observers=void 0,this.onNoObservers=void 0}))}}function Kb(t,e){if(typeof t!="object"||t===null)return!1;for(const n of e)if(n in t&&typeof t[n]=="function")return!0;return!1}function sa(){}function ms(t,e){return`${t} failed: ${e} argument `}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Jb=function(t){const e=[];let n=0;for(let s=0;s<t.length;s++){let r=t.charCodeAt(s);if(r>=55296&&r<=56319){const i=r-55296;s++,g(s<t.length,"Surrogate pair missing trail surrogate.");const o=t.charCodeAt(s)-56320;r=65536+(i<<10)+o}r<128?e[n++]=r:r<2048?(e[n++]=r>>6|192,e[n++]=r&63|128):r<65536?(e[n++]=r>>12|224,e[n++]=r>>6&63|128,e[n++]=r&63|128):(e[n++]=r>>18|240,e[n++]=r>>12&63|128,e[n++]=r>>6&63|128,e[n++]=r&63|128)}return e},_o=function(t){let e=0;for(let n=0;n<t.length;n++){const s=t.charCodeAt(n);s<128?e++:s<2048?e+=2:s>=55296&&s<=56319?(e+=4,n++):e+=3}return e};/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Xb=1e3,Qb=2,Zb=14400*1e3,eC=.5;function tC(t,e=Xb,n=Qb){const s=e*Math.pow(n,t),r=Math.round(eC*s*(Math.random()-.5)*2);return Math.min(Zb,s+r)}/**
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
 */function me(t){return t&&t._delegate?t._delegate:t}class Rt{constructor(e,n,s){this.name=e,this.instanceFactory=n,this.type=s,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}setInstantiationMode(e){return this.instantiationMode=e,this}setMultipleInstances(e){return this.multipleInstances=e,this}setServiceProps(e){return this.serviceProps=e,this}setInstanceCreatedCallback(e){return this.onInstanceCreated=e,this}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const _n="[DEFAULT]";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class nC{constructor(e,n){this.name=e,this.container=n,this.component=null,this.instances=new Map,this.instancesDeferred=new Map,this.instancesOptions=new Map,this.onInitCallbacks=new Map}get(e){const n=this.normalizeInstanceIdentifier(e);if(!this.instancesDeferred.has(n)){const s=new Ne;if(this.instancesDeferred.set(n,s),this.isInitialized(n)||this.shouldAutoInitialize())try{const r=this.getOrInitializeService({instanceIdentifier:n});r&&s.resolve(r)}catch{}}return this.instancesDeferred.get(n).promise}getImmediate(e){const n=this.normalizeInstanceIdentifier(e?.identifier),s=e?.optional??!1;if(this.isInitialized(n)||this.shouldAutoInitialize())try{return this.getOrInitializeService({instanceIdentifier:n})}catch(r){if(s)return null;throw r}else{if(s)return null;throw Error(`Service ${this.name} is not available`)}}getComponent(){return this.component}setComponent(e){if(e.name!==this.name)throw Error(`Mismatching Component ${e.name} for Provider ${this.name}.`);if(this.component)throw Error(`Component for ${this.name} has already been provided`);if(this.component=e,!!this.shouldAutoInitialize()){if(rC(e))try{this.getOrInitializeService({instanceIdentifier:_n})}catch{}for(const[n,s]of this.instancesDeferred.entries()){const r=this.normalizeInstanceIdentifier(n);try{const i=this.getOrInitializeService({instanceIdentifier:r});s.resolve(i)}catch{}}}}clearInstance(e=_n){this.instancesDeferred.delete(e),this.instancesOptions.delete(e),this.instances.delete(e)}async delete(){const e=Array.from(this.instances.values());await Promise.all([...e.filter(n=>"INTERNAL"in n).map(n=>n.INTERNAL.delete()),...e.filter(n=>"_delete"in n).map(n=>n._delete())])}isComponentSet(){return this.component!=null}isInitialized(e=_n){return this.instances.has(e)}getOptions(e=_n){return this.instancesOptions.get(e)||{}}initialize(e={}){const{options:n={}}=e,s=this.normalizeInstanceIdentifier(e.instanceIdentifier);if(this.isInitialized(s))throw Error(`${this.name}(${s}) has already been initialized`);if(!this.isComponentSet())throw Error(`Component ${this.name} has not been registered yet`);const r=this.getOrInitializeService({instanceIdentifier:s,options:n});for(const[i,o]of this.instancesDeferred.entries()){const a=this.normalizeInstanceIdentifier(i);s===a&&o.resolve(r)}return r}onInit(e,n){const s=this.normalizeInstanceIdentifier(n),r=this.onInitCallbacks.get(s)??new Set;r.add(e),this.onInitCallbacks.set(s,r);const i=this.instances.get(s);return i&&e(i,s),()=>{r.delete(e)}}invokeOnInitCallbacks(e,n){const s=this.onInitCallbacks.get(n);if(s)for(const r of s)try{r(e,n)}catch{}}getOrInitializeService({instanceIdentifier:e,options:n={}}){let s=this.instances.get(e);if(!s&&this.component&&(s=this.component.instanceFactory(this.container,{instanceIdentifier:sC(e),options:n}),this.instances.set(e,s),this.instancesOptions.set(e,n),this.invokeOnInitCallbacks(s,e),this.component.onInstanceCreated))try{this.component.onInstanceCreated(this.container,e,s)}catch{}return s||null}normalizeInstanceIdentifier(e=_n){return this.component?this.component.multipleInstances?e:_n:e}shouldAutoInitialize(){return!!this.component&&this.component.instantiationMode!=="EXPLICIT"}}function sC(t){return t===_n?void 0:t}function rC(t){return t.instantiationMode==="EAGER"}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class iC{constructor(e){this.name=e,this.providers=new Map}addComponent(e){const n=this.getProvider(e.name);if(n.isComponentSet())throw new Error(`Component ${e.name} has already been registered with ${this.name}`);n.setComponent(e)}addOrOverwriteComponent(e){this.getProvider(e.name).isComponentSet()&&this.providers.delete(e.name),this.addComponent(e)}getProvider(e){if(this.providers.has(e))return this.providers.get(e);const n=new nC(e,this);return this.providers.set(e,n),n}getProviders(){return Array.from(this.providers.values())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var W;(function(t){t[t.DEBUG=0]="DEBUG",t[t.VERBOSE=1]="VERBOSE",t[t.INFO=2]="INFO",t[t.WARN=3]="WARN",t[t.ERROR=4]="ERROR",t[t.SILENT=5]="SILENT"})(W||(W={}));const oC={debug:W.DEBUG,verbose:W.VERBOSE,info:W.INFO,warn:W.WARN,error:W.ERROR,silent:W.SILENT},aC=W.INFO,cC={[W.DEBUG]:"log",[W.VERBOSE]:"log",[W.INFO]:"info",[W.WARN]:"warn",[W.ERROR]:"error"},lC=(t,e,...n)=>{if(e<t.logLevel)return;const s=new Date().toISOString(),r=cC[e];if(r)console[r](`[${s}]  ${t.name}:`,...n);else throw new Error(`Attempted to log a message with an invalid logType (value: ${e})`)};class yo{constructor(e){this.name=e,this._logLevel=aC,this._logHandler=lC,this._userLogHandler=null}get logLevel(){return this._logLevel}set logLevel(e){if(!(e in W))throw new TypeError(`Invalid value "${e}" assigned to \`logLevel\``);this._logLevel=e}setLogLevel(e){this._logLevel=typeof e=="string"?oC[e]:e}get logHandler(){return this._logHandler}set logHandler(e){if(typeof e!="function")throw new TypeError("Value assigned to `logHandler` must be a function");this._logHandler=e}get userLogHandler(){return this._userLogHandler}set userLogHandler(e){this._userLogHandler=e}debug(...e){this._userLogHandler&&this._userLogHandler(this,W.DEBUG,...e),this._logHandler(this,W.DEBUG,...e)}log(...e){this._userLogHandler&&this._userLogHandler(this,W.VERBOSE,...e),this._logHandler(this,W.VERBOSE,...e)}info(...e){this._userLogHandler&&this._userLogHandler(this,W.INFO,...e),this._logHandler(this,W.INFO,...e)}warn(...e){this._userLogHandler&&this._userLogHandler(this,W.WARN,...e),this._logHandler(this,W.WARN,...e)}error(...e){this._userLogHandler&&this._userLogHandler(this,W.ERROR,...e),this._logHandler(this,W.ERROR,...e)}}const uC=(t,e)=>e.some(n=>t instanceof n);let Cd,Sd;function dC(){return Cd||(Cd=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])}function hC(){return Sd||(Sd=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])}const cp=new WeakMap,qa=new WeakMap,lp=new WeakMap,ra=new WeakMap,Kc=new WeakMap;function fC(t){const e=new Promise((n,s)=>{const r=()=>{t.removeEventListener("success",i),t.removeEventListener("error",o)},i=()=>{n(Gt(t.result)),r()},o=()=>{s(t.error),r()};t.addEventListener("success",i),t.addEventListener("error",o)});return e.then(n=>{n instanceof IDBCursor&&cp.set(n,t)}).catch(()=>{}),Kc.set(e,t),e}function pC(t){if(qa.has(t))return;const e=new Promise((n,s)=>{const r=()=>{t.removeEventListener("complete",i),t.removeEventListener("error",o),t.removeEventListener("abort",o)},i=()=>{n(),r()},o=()=>{s(t.error||new DOMException("AbortError","AbortError")),r()};t.addEventListener("complete",i),t.addEventListener("error",o),t.addEventListener("abort",o)});qa.set(t,e)}let za={get(t,e,n){if(t instanceof IDBTransaction){if(e==="done")return qa.get(t);if(e==="objectStoreNames")return t.objectStoreNames||lp.get(t);if(e==="store")return n.objectStoreNames[1]?void 0:n.objectStore(n.objectStoreNames[0])}return Gt(t[e])},set(t,e,n){return t[e]=n,!0},has(t,e){return t instanceof IDBTransaction&&(e==="done"||e==="store")?!0:e in t}};function gC(t){za=t(za)}function mC(t){return t===IDBDatabase.prototype.transaction&&!("objectStoreNames"in IDBTransaction.prototype)?function(e,...n){const s=t.call(ia(this),e,...n);return lp.set(s,e.sort?e.sort():[e]),Gt(s)}:hC().includes(t)?function(...e){return t.apply(ia(this),e),Gt(cp.get(this))}:function(...e){return Gt(t.apply(ia(this),e))}}function _C(t){return typeof t=="function"?mC(t):(t instanceof IDBTransaction&&pC(t),uC(t,dC())?new Proxy(t,za):t)}function Gt(t){if(t instanceof IDBRequest)return fC(t);if(ra.has(t))return ra.get(t);const e=_C(t);return e!==t&&(ra.set(t,e),Kc.set(e,t)),e}const ia=t=>Kc.get(t);function yC(t,e,{blocked:n,upgrade:s,blocking:r,terminated:i}={}){const o=indexedDB.open(t,e),a=Gt(o);return s&&o.addEventListener("upgradeneeded",c=>{s(Gt(o.result),c.oldVersion,c.newVersion,Gt(o.transaction),c)}),n&&o.addEventListener("blocked",c=>n(c.oldVersion,c.newVersion,c)),a.then(c=>{i&&c.addEventListener("close",()=>i()),r&&c.addEventListener("versionchange",l=>r(l.oldVersion,l.newVersion,l))}).catch(()=>{}),a}const vC=["get","getKey","getAll","getAllKeys","count"],EC=["put","add","delete","clear"],oa=new Map;function Td(t,e){if(!(t instanceof IDBDatabase&&!(e in t)&&typeof e=="string"))return;if(oa.get(e))return oa.get(e);const n=e.replace(/FromIndex$/,""),s=e!==n,r=EC.includes(n);if(!(n in(s?IDBIndex:IDBObjectStore).prototype)||!(r||vC.includes(n)))return;const i=async function(o,...a){const c=this.transaction(o,r?"readwrite":"readonly");let l=c.store;return s&&(l=l.index(a.shift())),(await Promise.all([l[n](...a),r&&c.done]))[0]};return oa.set(e,i),i}gC(t=>({...t,get:(e,n,s)=>Td(e,n)||t.get(e,n,s),has:(e,n)=>!!Td(e,n)||t.has(e,n)}));/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class wC{constructor(e){this.container=e}getPlatformInfoString(){return this.container.getProviders().map(n=>{if(bC(n)){const s=n.getImmediate();return`${s.library}/${s.version}`}else return null}).filter(n=>n).join(" ")}}function bC(t){return t.getComponent()?.type==="VERSION"}const Ga="@firebase/app",Id="0.14.4";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const At=new yo("@firebase/app"),CC="@firebase/app-compat",SC="@firebase/analytics-compat",TC="@firebase/analytics",IC="@firebase/app-check-compat",kC="@firebase/app-check",RC="@firebase/auth",AC="@firebase/auth-compat",NC="@firebase/database",PC="@firebase/data-connect",LC="@firebase/database-compat",OC="@firebase/functions",DC="@firebase/functions-compat",xC="@firebase/installations",MC="@firebase/installations-compat",FC="@firebase/messaging",UC="@firebase/messaging-compat",$C="@firebase/performance",BC="@firebase/performance-compat",HC="@firebase/remote-config",WC="@firebase/remote-config-compat",VC="@firebase/storage",jC="@firebase/storage-compat",qC="@firebase/firestore",zC="@firebase/ai",GC="@firebase/firestore-compat",YC="firebase",KC="12.4.0";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ya="[DEFAULT]",JC={[Ga]:"fire-core",[CC]:"fire-core-compat",[TC]:"fire-analytics",[SC]:"fire-analytics-compat",[kC]:"fire-app-check",[IC]:"fire-app-check-compat",[RC]:"fire-auth",[AC]:"fire-auth-compat",[NC]:"fire-rtdb",[PC]:"fire-data-connect",[LC]:"fire-rtdb-compat",[OC]:"fire-fn",[DC]:"fire-fn-compat",[xC]:"fire-iid",[MC]:"fire-iid-compat",[FC]:"fire-fcm",[UC]:"fire-fcm-compat",[$C]:"fire-perf",[BC]:"fire-perf-compat",[HC]:"fire-rc",[WC]:"fire-rc-compat",[VC]:"fire-gcs",[jC]:"fire-gcs-compat",[qC]:"fire-fst",[GC]:"fire-fst-compat",[zC]:"fire-vertex","fire-js":"fire-js",[YC]:"fire-js-all"};/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Pi=new Map,XC=new Map,Ka=new Map;function kd(t,e){try{t.container.addComponent(e)}catch(n){At.debug(`Component ${e.name} failed to register with FirebaseApp ${t.name}`,n)}}function tn(t){const e=t.name;if(Ka.has(e))return At.debug(`There were multiple attempts to register component ${e}.`),!1;Ka.set(e,t);for(const n of Pi.values())kd(n,t);for(const n of XC.values())kd(n,t);return!0}function Ur(t,e){const n=t.container.getProvider("heartbeat").getImmediate({optional:!0});return n&&n.triggerHeartbeat(),t.container.getProvider(e)}function Ge(t){return t==null?!1:t.settings!==void 0}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const QC={"no-app":"No Firebase App '{$appName}' has been created - call initializeApp() first","bad-app-name":"Illegal App name: '{$appName}'","duplicate-app":"Firebase App named '{$appName}' already exists with different options or config","app-deleted":"Firebase App named '{$appName}' already deleted","server-app-deleted":"Firebase Server App has been deleted","no-options":"Need to provide options, when not being deployed to hosting via source.","invalid-app-argument":"firebase.{$appName}() takes either no argument or a Firebase App instance.","invalid-log-argument":"First argument to `onLog` must be null or a function.","idb-open":"Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.","idb-get":"Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.","idb-set":"Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.","idb-delete":"Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}.","finalization-registry-not-supported":"FirebaseServerApp deleteOnDeref field defined but the JS runtime does not support FinalizationRegistry.","invalid-server-app-environment":"FirebaseServerApp is not for use in browser environments."},Yt=new Ps("app","Firebase",QC);/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ZC{constructor(e,n,s){this._isDeleted=!1,this._options={...e},this._config={...n},this._name=n.name,this._automaticDataCollectionEnabled=n.automaticDataCollectionEnabled,this._container=s,this.container.addComponent(new Rt("app",()=>this,"PUBLIC"))}get automaticDataCollectionEnabled(){return this.checkDestroyed(),this._automaticDataCollectionEnabled}set automaticDataCollectionEnabled(e){this.checkDestroyed(),this._automaticDataCollectionEnabled=e}get name(){return this.checkDestroyed(),this._name}get options(){return this.checkDestroyed(),this._options}get config(){return this.checkDestroyed(),this._config}get container(){return this._container}get isDeleted(){return this._isDeleted}set isDeleted(e){this._isDeleted=e}checkDestroyed(){if(this.isDeleted)throw Yt.create("app-deleted",{appName:this._name})}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Os=KC;function up(t,e={}){let n=t;typeof e!="object"&&(e={name:e});const s={name:Ya,automaticDataCollectionEnabled:!0,...e},r=s.name;if(typeof r!="string"||!r)throw Yt.create("bad-app-name",{appName:String(r)});if(n||(n=np()),!n)throw Yt.create("no-options");const i=Pi.get(r);if(i){if(Pn(n,i.options)&&Pn(s,i.config))return i;throw Yt.create("duplicate-app",{appName:r})}const o=new iC(r);for(const c of Ka.values())o.addComponent(c);const a=new ZC(n,s,o);return Pi.set(r,a),a}function Jc(t=Ya){const e=Pi.get(t);if(!e&&t===Ya&&np())return up();if(!e)throw Yt.create("no-app",{appName:t});return e}function St(t,e,n){let s=JC[t]??t;n&&(s+=`-${n}`);const r=s.match(/\s|\//),i=e.match(/\s|\//);if(r||i){const o=[`Unable to register library "${s}" with version "${e}":`];r&&o.push(`library name "${s}" contains illegal characters (whitespace or "/")`),r&&i&&o.push("and"),i&&o.push(`version name "${e}" contains illegal characters (whitespace or "/")`),At.warn(o.join(" "));return}tn(new Rt(`${s}-version`,()=>({library:s,version:e}),"VERSION"))}/**
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
 */const eS="firebase-heartbeat-database",tS=1,_r="firebase-heartbeat-store";let aa=null;function dp(){return aa||(aa=yC(eS,tS,{upgrade:(t,e)=>{switch(e){case 0:try{t.createObjectStore(_r)}catch(n){console.warn(n)}}}}).catch(t=>{throw Yt.create("idb-open",{originalErrorMessage:t.message})})),aa}async function nS(t){try{const n=(await dp()).transaction(_r),s=await n.objectStore(_r).get(hp(t));return await n.done,s}catch(e){if(e instanceof ln)At.warn(e.message);else{const n=Yt.create("idb-get",{originalErrorMessage:e?.message});At.warn(n.message)}}}async function Rd(t,e){try{const s=(await dp()).transaction(_r,"readwrite");await s.objectStore(_r).put(e,hp(t)),await s.done}catch(n){if(n instanceof ln)At.warn(n.message);else{const s=Yt.create("idb-set",{originalErrorMessage:n?.message});At.warn(s.message)}}}function hp(t){return`${t.name}!${t.options.appId}`}/**
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
 */const sS=1024,rS=30;class iS{constructor(e){this.container=e,this._heartbeatsCache=null;const n=this.container.getProvider("app").getImmediate();this._storage=new aS(n),this._heartbeatsCachePromise=this._storage.read().then(s=>(this._heartbeatsCache=s,s))}async triggerHeartbeat(){try{const n=this.container.getProvider("platform-logger").getImmediate().getPlatformInfoString(),s=Ad();if(this._heartbeatsCache?.heartbeats==null&&(this._heartbeatsCache=await this._heartbeatsCachePromise,this._heartbeatsCache?.heartbeats==null)||this._heartbeatsCache.lastSentHeartbeatDate===s||this._heartbeatsCache.heartbeats.some(r=>r.date===s))return;if(this._heartbeatsCache.heartbeats.push({date:s,agent:n}),this._heartbeatsCache.heartbeats.length>rS){const r=cS(this._heartbeatsCache.heartbeats);this._heartbeatsCache.heartbeats.splice(r,1)}return this._storage.overwrite(this._heartbeatsCache)}catch(e){At.warn(e)}}async getHeartbeatsHeader(){try{if(this._heartbeatsCache===null&&await this._heartbeatsCachePromise,this._heartbeatsCache?.heartbeats==null||this._heartbeatsCache.heartbeats.length===0)return"";const e=Ad(),{heartbeatsToSend:n,unsentEntries:s}=oS(this._heartbeatsCache.heartbeats),r=ki(JSON.stringify({version:2,heartbeats:n}));return this._heartbeatsCache.lastSentHeartbeatDate=e,s.length>0?(this._heartbeatsCache.heartbeats=s,await this._storage.overwrite(this._heartbeatsCache)):(this._heartbeatsCache.heartbeats=[],this._storage.overwrite(this._heartbeatsCache)),r}catch(e){return At.warn(e),""}}}function Ad(){return new Date().toISOString().substring(0,10)}function oS(t,e=sS){const n=[];let s=t.slice();for(const r of t){const i=n.find(o=>o.agent===r.agent);if(i){if(i.dates.push(r.date),Nd(n)>e){i.dates.pop();break}}else if(n.push({agent:r.agent,dates:[r.date]}),Nd(n)>e){n.pop();break}s=s.slice(1)}return{heartbeatsToSend:n,unsentEntries:s}}class aS{constructor(e){this.app=e,this._canUseIndexedDBPromise=this.runIndexedDBEnvironmentCheck()}async runIndexedDBEnvironmentCheck(){return Yc()?Bb().then(()=>!0).catch(()=>!1):!1}async read(){if(await this._canUseIndexedDBPromise){const n=await nS(this.app);return n?.heartbeats?n:{heartbeats:[]}}else return{heartbeats:[]}}async overwrite(e){if(await this._canUseIndexedDBPromise){const s=await this.read();return Rd(this.app,{lastSentHeartbeatDate:e.lastSentHeartbeatDate??s.lastSentHeartbeatDate,heartbeats:e.heartbeats})}else return}async add(e){if(await this._canUseIndexedDBPromise){const s=await this.read();return Rd(this.app,{lastSentHeartbeatDate:e.lastSentHeartbeatDate??s.lastSentHeartbeatDate,heartbeats:[...s.heartbeats,...e.heartbeats]})}else return}}function Nd(t){return ki(JSON.stringify({version:2,heartbeats:t})).length}function cS(t){if(t.length===0)return-1;let e=0,n=t[0].date;for(let s=1;s<t.length;s++)t[s].date<n&&(n=t[s].date,e=s);return e}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function lS(t){tn(new Rt("platform-logger",e=>new wC(e),"PRIVATE")),tn(new Rt("heartbeat",e=>new iS(e),"PRIVATE")),St(Ga,Id,t),St(Ga,Id,"esm2020"),St("fire-js","")}lS("");var Pd={};const Ld="@firebase/database",Od="1.1.0";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let fp="";function pp(t){fp=t}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class uS{constructor(e){this.domStorage_=e,this.prefix_="firebase:"}set(e,n){n==null?this.domStorage_.removeItem(this.prefixedName_(e)):this.domStorage_.setItem(this.prefixedName_(e),ae(n))}get(e){const n=this.domStorage_.getItem(this.prefixedName_(e));return n==null?null:mr(n)}remove(e){this.domStorage_.removeItem(this.prefixedName_(e))}prefixedName_(e){return this.prefix_+e}toString(){return this.domStorage_.toString()}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class dS{constructor(){this.cache_={},this.isInMemoryStorage=!0}set(e,n){n==null?delete this.cache_[e]:this.cache_[e]=n}get(e){return pt(this.cache_,e)?this.cache_[e]:null}remove(e){delete this.cache_[e]}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const gp=function(t){try{if(typeof window<"u"&&typeof window[t]<"u"){const e=window[t];return e.setItem("firebase:sentinel","cache"),e.removeItem("firebase:sentinel"),new uS(e)}}catch{}return new dS},wn=gp("localStorage"),hS=gp("sessionStorage");/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Qn=new yo("@firebase/database"),fS=(function(){let t=1;return function(){return t++}})(),mp=function(t){const e=Jb(t),n=new zb;n.update(e);const s=n.digest();return mo.encodeByteArray(s)},$r=function(...t){let e="";for(let n=0;n<t.length;n++){const s=t[n];Array.isArray(s)||s&&typeof s=="object"&&typeof s.length=="number"?e+=$r.apply(null,s):typeof s=="object"?e+=ae(s):e+=s,e+=" "}return e};let er=null,Dd=!0;const pS=function(t,e){g(!0,"Can't turn on custom loggers persistently."),Qn.logLevel=W.VERBOSE,er=Qn.log.bind(Qn)},fe=function(...t){if(Dd===!0&&(Dd=!1,er===null&&hS.get("logging_enabled")===!0&&pS()),er){const e=$r.apply(null,t);er(e)}},Br=function(t){return function(...e){fe(t,...e)}},Ja=function(...t){const e="FIREBASE INTERNAL ERROR: "+$r(...t);Qn.error(e)},Nt=function(...t){const e=`FIREBASE FATAL ERROR: ${$r(...t)}`;throw Qn.error(e),new Error(e)},ke=function(...t){const e="FIREBASE WARNING: "+$r(...t);Qn.warn(e)},gS=function(){typeof window<"u"&&window.location&&window.location.protocol&&window.location.protocol.indexOf("https:")!==-1&&ke("Insecure Firebase access from a secure page. Please use https in calls to new Firebase().")},vo=function(t){return typeof t=="number"&&(t!==t||t===Number.POSITIVE_INFINITY||t===Number.NEGATIVE_INFINITY)},mS=function(t){if(document.readyState==="complete")t();else{let e=!1;const n=function(){if(!document.body){setTimeout(n,Math.floor(10));return}e||(e=!0,t())};document.addEventListener?(document.addEventListener("DOMContentLoaded",n,!1),window.addEventListener("load",n,!1)):document.attachEvent&&(document.attachEvent("onreadystatechange",()=>{document.readyState==="complete"&&n()}),window.attachEvent("onload",n))}},_s="[MIN_NAME]",Ln="[MAX_NAME]",jn=function(t,e){if(t===e)return 0;if(t===_s||e===Ln)return-1;if(e===_s||t===Ln)return 1;{const n=xd(t),s=xd(e);return n!==null?s!==null?n-s===0?t.length-e.length:n-s:-1:s!==null?1:t<e?-1:1}},_S=function(t,e){return t===e?0:t<e?-1:1},js=function(t,e){if(e&&t in e)return e[t];throw new Error("Missing required key ("+t+") in object: "+ae(e))},Xc=function(t){if(typeof t!="object"||t===null)return ae(t);const e=[];for(const s in t)e.push(s);e.sort();let n="{";for(let s=0;s<e.length;s++)s!==0&&(n+=","),n+=ae(e[s]),n+=":",n+=Xc(t[e[s]]);return n+="}",n},_p=function(t,e){const n=t.length;if(n<=e)return[t];const s=[];for(let r=0;r<n;r+=e)r+e>n?s.push(t.substring(r,n)):s.push(t.substring(r,r+e));return s};function ge(t,e){for(const n in t)t.hasOwnProperty(n)&&e(n,t[n])}const yp=function(t){g(!vo(t),"Invalid JSON number");const e=11,n=52,s=(1<<e-1)-1;let r,i,o,a,c;t===0?(i=0,o=0,r=1/t===-1/0?1:0):(r=t<0,t=Math.abs(t),t>=Math.pow(2,1-s)?(a=Math.min(Math.floor(Math.log(t)/Math.LN2),s),i=a+s,o=Math.round(t*Math.pow(2,n-a)-Math.pow(2,n))):(i=0,o=Math.round(t/Math.pow(2,1-s-n))));const l=[];for(c=n;c;c-=1)l.push(o%2?1:0),o=Math.floor(o/2);for(c=e;c;c-=1)l.push(i%2?1:0),i=Math.floor(i/2);l.push(r?1:0),l.reverse();const u=l.join("");let d="";for(c=0;c<64;c+=8){let h=parseInt(u.substr(c,8),2).toString(16);h.length===1&&(h="0"+h),d=d+h}return d.toLowerCase()},yS=function(){return!!(typeof window=="object"&&window.chrome&&window.chrome.extension&&!/^chrome/.test(window.location.href))},vS=function(){return typeof Windows=="object"&&typeof Windows.UI=="object"};function ES(t,e){let n="Unknown Error";t==="too_big"?n="The data requested exceeds the maximum size that can be accessed with a single request.":t==="permission_denied"?n="Client doesn't have permission to access the desired data.":t==="unavailable"&&(n="The service is unavailable");const s=new Error(t+" at "+e._path.toString()+": "+n);return s.code=t.toUpperCase(),s}const wS=new RegExp("^-?(0*)\\d{1,10}$"),bS=-2147483648,CS=2147483647,xd=function(t){if(wS.test(t)){const e=Number(t);if(e>=bS&&e<=CS)return e}return null},Ds=function(t){try{t()}catch(e){setTimeout(()=>{const n=e.stack||"";throw ke("Exception was thrown by user callback.",n),e},Math.floor(0))}},SS=function(){return(typeof window=="object"&&window.navigator&&window.navigator.userAgent||"").search(/googlebot|google webmaster tools|bingbot|yahoo! slurp|baiduspider|yandexbot|duckduckbot/i)>=0},tr=function(t,e){const n=setTimeout(t,e);return typeof n=="number"&&typeof Deno<"u"&&Deno.unrefTimer?Deno.unrefTimer(n):typeof n=="object"&&n.unref&&n.unref(),n};/**
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
 */class TS{constructor(e,n){this.appCheckProvider=n,this.appName=e.name,Ge(e)&&e.settings.appCheckToken&&(this.serverAppAppCheckToken=e.settings.appCheckToken),this.appCheck=n?.getImmediate({optional:!0}),this.appCheck||n?.get().then(s=>this.appCheck=s)}getToken(e){if(this.serverAppAppCheckToken){if(e)throw new Error("Attempted reuse of `FirebaseServerApp.appCheckToken` after previous usage failed.");return Promise.resolve({token:this.serverAppAppCheckToken})}return this.appCheck?this.appCheck.getToken(e):new Promise((n,s)=>{setTimeout(()=>{this.appCheck?this.getToken(e).then(n,s):n(null)},0)})}addTokenChangeListener(e){this.appCheckProvider?.get().then(n=>n.addTokenListener(e))}notifyForInvalidToken(){ke(`Provided AppCheck credentials for the app named "${this.appName}" are invalid. This usually indicates your app was not initialized correctly.`)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class IS{constructor(e,n,s){this.appName_=e,this.firebaseOptions_=n,this.authProvider_=s,this.auth_=null,this.auth_=s.getImmediate({optional:!0}),this.auth_||s.onInit(r=>this.auth_=r)}getToken(e){return this.auth_?this.auth_.getToken(e).catch(n=>n&&n.code==="auth/token-not-initialized"?(fe("Got auth/token-not-initialized error.  Treating as null token."),null):Promise.reject(n)):new Promise((n,s)=>{setTimeout(()=>{this.auth_?this.getToken(e).then(n,s):n(null)},0)})}addTokenChangeListener(e){this.auth_?this.auth_.addAuthTokenListener(e):this.authProvider_.get().then(n=>n.addAuthTokenListener(e))}removeTokenChangeListener(e){this.authProvider_.get().then(n=>n.removeAuthTokenListener(e))}notifyForInvalidToken(){let e='Provided authentication credentials for the app named "'+this.appName_+'" are invalid. This usually indicates your app was not initialized correctly. ';"credential"in this.firebaseOptions_?e+='Make sure the "credential" property provided to initializeApp() is authorized to access the specified "databaseURL" and is from the correct project.':"serviceAccount"in this.firebaseOptions_?e+='Make sure the "serviceAccount" property provided to initializeApp() is authorized to access the specified "databaseURL" and is from the correct project.':e+='Make sure the "apiKey" and "databaseURL" properties provided to initializeApp() match the values provided for your app at https://console.firebase.google.com/.',ke(e)}}class mi{constructor(e){this.accessToken=e}getToken(e){return Promise.resolve({accessToken:this.accessToken})}addTokenChangeListener(e){e(this.accessToken)}removeTokenChangeListener(e){}notifyForInvalidToken(){}}mi.OWNER="owner";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Qc="5",vp="v",Ep="s",wp="r",bp="f",Cp=/(console\.firebase|firebase-console-\w+\.corp|firebase\.corp)\.google\.com/,Sp="ls",Tp="p",Xa="ac",Ip="websocket",kp="long_polling";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Rp{constructor(e,n,s,r,i=!1,o="",a=!1,c=!1,l=null){this.secure=n,this.namespace=s,this.webSocketOnly=r,this.nodeAdmin=i,this.persistenceKey=o,this.includeNamespaceInQueryParams=a,this.isUsingEmulator=c,this.emulatorOptions=l,this._host=e.toLowerCase(),this._domain=this._host.substr(this._host.indexOf(".")+1),this.internalHost=wn.get("host:"+e)||this._host}isCacheableHost(){return this.internalHost.substr(0,2)==="s-"}isCustomHost(){return this._domain!=="firebaseio.com"&&this._domain!=="firebaseio-demo.com"}get host(){return this._host}set host(e){e!==this.internalHost&&(this.internalHost=e,this.isCacheableHost()&&wn.set("host:"+this._host,this.internalHost))}toString(){let e=this.toURLString();return this.persistenceKey&&(e+="<"+this.persistenceKey+">"),e}toURLString(){const e=this.secure?"https://":"http://",n=this.includeNamespaceInQueryParams?`?ns=${this.namespace}`:"";return`${e}${this.host}/${n}`}}function kS(t){return t.host!==t.internalHost||t.isCustomHost()||t.includeNamespaceInQueryParams}function Ap(t,e,n){g(typeof e=="string","typeof type must == string"),g(typeof n=="object","typeof params must == object");let s;if(e===Ip)s=(t.secure?"wss://":"ws://")+t.internalHost+"/.ws?";else if(e===kp)s=(t.secure?"https://":"http://")+t.internalHost+"/.lp?";else throw new Error("Unknown connection type: "+e);kS(t)&&(n.ns=t.namespace);const r=[];return ge(n,(i,o)=>{r.push(i+"="+o)}),s+r.join("&")}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class RS{constructor(){this.counters_={}}incrementCounter(e,n=1){pt(this.counters_,e)||(this.counters_[e]=0),this.counters_[e]+=n}get(){return kb(this.counters_)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ca={},la={};function Zc(t){const e=t.toString();return ca[e]||(ca[e]=new RS),ca[e]}function AS(t,e){const n=t.toString();return la[n]||(la[n]=e()),la[n]}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class NS{constructor(e){this.onMessage_=e,this.pendingResponses=[],this.currentResponseNum=0,this.closeAfterResponse=-1,this.onClose=null}closeAfter(e,n){this.closeAfterResponse=e,this.onClose=n,this.closeAfterResponse<this.currentResponseNum&&(this.onClose(),this.onClose=null)}handleResponse(e,n){for(this.pendingResponses[e]=n;this.pendingResponses[this.currentResponseNum];){const s=this.pendingResponses[this.currentResponseNum];delete this.pendingResponses[this.currentResponseNum];for(let r=0;r<s.length;++r)s[r]&&Ds(()=>{this.onMessage_(s[r])});if(this.currentResponseNum===this.closeAfterResponse){this.onClose&&(this.onClose(),this.onClose=null);break}this.currentResponseNum++}}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Md="start",PS="close",LS="pLPCommand",OS="pRTLPCB",Np="id",Pp="pw",Lp="ser",DS="cb",xS="seg",MS="ts",FS="d",US="dframe",Op=1870,Dp=30,$S=Op-Dp,BS=25e3,HS=3e4;class Kn{constructor(e,n,s,r,i,o,a){this.connId=e,this.repoInfo=n,this.applicationId=s,this.appCheckToken=r,this.authToken=i,this.transportSessionId=o,this.lastSessionId=a,this.bytesSent=0,this.bytesReceived=0,this.everConnected_=!1,this.log_=Br(e),this.stats_=Zc(n),this.urlFn=c=>(this.appCheckToken&&(c[Xa]=this.appCheckToken),Ap(n,kp,c))}open(e,n){this.curSegmentNum=0,this.onDisconnect_=n,this.myPacketOrderer=new NS(e),this.isClosed_=!1,this.connectTimeoutTimer_=setTimeout(()=>{this.log_("Timed out trying to connect."),this.onClosed_(),this.connectTimeoutTimer_=null},Math.floor(HS)),mS(()=>{if(this.isClosed_)return;this.scriptTagHolder=new el((...i)=>{const[o,a,c,l,u]=i;if(this.incrementIncomingBytes_(i),!!this.scriptTagHolder)if(this.connectTimeoutTimer_&&(clearTimeout(this.connectTimeoutTimer_),this.connectTimeoutTimer_=null),this.everConnected_=!0,o===Md)this.id=a,this.password=c;else if(o===PS)a?(this.scriptTagHolder.sendNewPolls=!1,this.myPacketOrderer.closeAfter(a,()=>{this.onClosed_()})):this.onClosed_();else throw new Error("Unrecognized command received: "+o)},(...i)=>{const[o,a]=i;this.incrementIncomingBytes_(i),this.myPacketOrderer.handleResponse(o,a)},()=>{this.onClosed_()},this.urlFn);const s={};s[Md]="t",s[Lp]=Math.floor(Math.random()*1e8),this.scriptTagHolder.uniqueCallbackIdentifier&&(s[DS]=this.scriptTagHolder.uniqueCallbackIdentifier),s[vp]=Qc,this.transportSessionId&&(s[Ep]=this.transportSessionId),this.lastSessionId&&(s[Sp]=this.lastSessionId),this.applicationId&&(s[Tp]=this.applicationId),this.appCheckToken&&(s[Xa]=this.appCheckToken),typeof location<"u"&&location.hostname&&Cp.test(location.hostname)&&(s[wp]=bp);const r=this.urlFn(s);this.log_("Connecting via long-poll to "+r),this.scriptTagHolder.addTag(r,()=>{})})}start(){this.scriptTagHolder.startLongPoll(this.id,this.password),this.addDisconnectPingFrame(this.id,this.password)}static forceAllow(){Kn.forceAllow_=!0}static forceDisallow(){Kn.forceDisallow_=!0}static isAvailable(){return Kn.forceAllow_?!0:!Kn.forceDisallow_&&typeof document<"u"&&document.createElement!=null&&!yS()&&!vS()}markConnectionHealthy(){}shutdown_(){this.isClosed_=!0,this.scriptTagHolder&&(this.scriptTagHolder.close(),this.scriptTagHolder=null),this.myDisconnFrame&&(document.body.removeChild(this.myDisconnFrame),this.myDisconnFrame=null),this.connectTimeoutTimer_&&(clearTimeout(this.connectTimeoutTimer_),this.connectTimeoutTimer_=null)}onClosed_(){this.isClosed_||(this.log_("Longpoll is closing itself"),this.shutdown_(),this.onDisconnect_&&(this.onDisconnect_(this.everConnected_),this.onDisconnect_=null))}close(){this.isClosed_||(this.log_("Longpoll is being closed."),this.shutdown_())}send(e){const n=ae(e);this.bytesSent+=n.length,this.stats_.incrementCounter("bytes_sent",n.length);const s=Qf(n),r=_p(s,$S);for(let i=0;i<r.length;i++)this.scriptTagHolder.enqueueSegment(this.curSegmentNum,r.length,r[i]),this.curSegmentNum++}addDisconnectPingFrame(e,n){this.myDisconnFrame=document.createElement("iframe");const s={};s[US]="t",s[Np]=e,s[Pp]=n,this.myDisconnFrame.src=this.urlFn(s),this.myDisconnFrame.style.display="none",document.body.appendChild(this.myDisconnFrame)}incrementIncomingBytes_(e){const n=ae(e).length;this.bytesReceived+=n,this.stats_.incrementCounter("bytes_received",n)}}class el{constructor(e,n,s,r){this.onDisconnect=s,this.urlFn=r,this.outstandingRequests=new Set,this.pendingSegs=[],this.currentSerial=Math.floor(Math.random()*1e8),this.sendNewPolls=!0;{this.uniqueCallbackIdentifier=fS(),window[LS+this.uniqueCallbackIdentifier]=e,window[OS+this.uniqueCallbackIdentifier]=n,this.myIFrame=el.createIFrame_();let i="";this.myIFrame.src&&this.myIFrame.src.substr(0,11)==="javascript:"&&(i='<script>document.domain="'+document.domain+'";<\/script>');const o="<html><body>"+i+"</body></html>";try{this.myIFrame.doc.open(),this.myIFrame.doc.write(o),this.myIFrame.doc.close()}catch(a){fe("frame writing exception"),a.stack&&fe(a.stack),fe(a)}}}static createIFrame_(){const e=document.createElement("iframe");if(e.style.display="none",document.body){document.body.appendChild(e);try{e.contentWindow.document||fe("No IE domain setting required")}catch{const s=document.domain;e.src="javascript:void((function(){document.open();document.domain='"+s+"';document.close();})())"}}else throw"Document body has not initialized. Wait to initialize Firebase until after the document is ready.";return e.contentDocument?e.doc=e.contentDocument:e.contentWindow?e.doc=e.contentWindow.document:e.document&&(e.doc=e.document),e}close(){this.alive=!1,this.myIFrame&&(this.myIFrame.doc.body.textContent="",setTimeout(()=>{this.myIFrame!==null&&(document.body.removeChild(this.myIFrame),this.myIFrame=null)},Math.floor(0)));const e=this.onDisconnect;e&&(this.onDisconnect=null,e())}startLongPoll(e,n){for(this.myID=e,this.myPW=n,this.alive=!0;this.newRequest_(););}newRequest_(){if(this.alive&&this.sendNewPolls&&this.outstandingRequests.size<(this.pendingSegs.length>0?2:1)){this.currentSerial++;const e={};e[Np]=this.myID,e[Pp]=this.myPW,e[Lp]=this.currentSerial;let n=this.urlFn(e),s="",r=0;for(;this.pendingSegs.length>0&&this.pendingSegs[0].d.length+Dp+s.length<=Op;){const o=this.pendingSegs.shift();s=s+"&"+xS+r+"="+o.seg+"&"+MS+r+"="+o.ts+"&"+FS+r+"="+o.d,r++}return n=n+s,this.addLongPollTag_(n,this.currentSerial),!0}else return!1}enqueueSegment(e,n,s){this.pendingSegs.push({seg:e,ts:n,d:s}),this.alive&&this.newRequest_()}addLongPollTag_(e,n){this.outstandingRequests.add(n);const s=()=>{this.outstandingRequests.delete(n),this.newRequest_()},r=setTimeout(s,Math.floor(BS)),i=()=>{clearTimeout(r),s()};this.addTag(e,i)}addTag(e,n){setTimeout(()=>{try{if(!this.sendNewPolls)return;const s=this.myIFrame.doc.createElement("script");s.type="text/javascript",s.async=!0,s.src=e,s.onload=s.onreadystatechange=function(){const r=s.readyState;(!r||r==="loaded"||r==="complete")&&(s.onload=s.onreadystatechange=null,s.parentNode&&s.parentNode.removeChild(s),n())},s.onerror=()=>{fe("Long-poll script failed to load: "+e),this.sendNewPolls=!1,this.close()},this.myIFrame.doc.body.appendChild(s)}catch{}},Math.floor(1))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const WS=16384,VS=45e3;let Li=null;typeof MozWebSocket<"u"?Li=MozWebSocket:typeof WebSocket<"u"&&(Li=WebSocket);class Ye{constructor(e,n,s,r,i,o,a){this.connId=e,this.applicationId=s,this.appCheckToken=r,this.authToken=i,this.keepaliveTimer=null,this.frames=null,this.totalFrames=0,this.bytesSent=0,this.bytesReceived=0,this.log_=Br(this.connId),this.stats_=Zc(n),this.connURL=Ye.connectionURL_(n,o,a,r,s),this.nodeAdmin=n.nodeAdmin}static connectionURL_(e,n,s,r,i){const o={};return o[vp]=Qc,typeof location<"u"&&location.hostname&&Cp.test(location.hostname)&&(o[wp]=bp),n&&(o[Ep]=n),s&&(o[Sp]=s),r&&(o[Xa]=r),i&&(o[Tp]=i),Ap(e,Ip,o)}open(e,n){this.onDisconnect=n,this.onMessage=e,this.log_("Websocket connecting to "+this.connURL),this.everConnected_=!1,wn.set("previous_websocket_failure",!0);try{let s;$b(),this.mySock=new Li(this.connURL,[],s)}catch(s){this.log_("Error instantiating WebSocket.");const r=s.message||s.data;r&&this.log_(r),this.onClosed_();return}this.mySock.onopen=()=>{this.log_("Websocket connected."),this.everConnected_=!0},this.mySock.onclose=()=>{this.log_("Websocket connection was disconnected."),this.mySock=null,this.onClosed_()},this.mySock.onmessage=s=>{this.handleIncomingFrame(s)},this.mySock.onerror=s=>{this.log_("WebSocket error.  Closing connection.");const r=s.message||s.data;r&&this.log_(r),this.onClosed_()}}start(){}static forceDisallow(){Ye.forceDisallow_=!0}static isAvailable(){let e=!1;if(typeof navigator<"u"&&navigator.userAgent){const n=/Android ([0-9]{0,}\.[0-9]{0,})/,s=navigator.userAgent.match(n);s&&s.length>1&&parseFloat(s[1])<4.4&&(e=!0)}return!e&&Li!==null&&!Ye.forceDisallow_}static previouslyFailed(){return wn.isInMemoryStorage||wn.get("previous_websocket_failure")===!0}markConnectionHealthy(){wn.remove("previous_websocket_failure")}appendFrame_(e){if(this.frames.push(e),this.frames.length===this.totalFrames){const n=this.frames.join("");this.frames=null;const s=mr(n);this.onMessage(s)}}handleNewFrameCount_(e){this.totalFrames=e,this.frames=[]}extractFrameCount_(e){if(g(this.frames===null,"We already have a frame buffer"),e.length<=6){const n=Number(e);if(!isNaN(n))return this.handleNewFrameCount_(n),null}return this.handleNewFrameCount_(1),e}handleIncomingFrame(e){if(this.mySock===null)return;const n=e.data;if(this.bytesReceived+=n.length,this.stats_.incrementCounter("bytes_received",n.length),this.resetKeepAlive(),this.frames!==null)this.appendFrame_(n);else{const s=this.extractFrameCount_(n);s!==null&&this.appendFrame_(s)}}send(e){this.resetKeepAlive();const n=ae(e);this.bytesSent+=n.length,this.stats_.incrementCounter("bytes_sent",n.length);const s=_p(n,WS);s.length>1&&this.sendString_(String(s.length));for(let r=0;r<s.length;r++)this.sendString_(s[r])}shutdown_(){this.isClosed_=!0,this.keepaliveTimer&&(clearInterval(this.keepaliveTimer),this.keepaliveTimer=null),this.mySock&&(this.mySock.close(),this.mySock=null)}onClosed_(){this.isClosed_||(this.log_("WebSocket is closing itself"),this.shutdown_(),this.onDisconnect&&(this.onDisconnect(this.everConnected_),this.onDisconnect=null))}close(){this.isClosed_||(this.log_("WebSocket is being closed"),this.shutdown_())}resetKeepAlive(){clearInterval(this.keepaliveTimer),this.keepaliveTimer=setInterval(()=>{this.mySock&&this.sendString_("0"),this.resetKeepAlive()},Math.floor(VS))}sendString_(e){try{this.mySock.send(e)}catch(n){this.log_("Exception thrown from WebSocket.send():",n.message||n.data,"Closing connection."),setTimeout(this.onClosed_.bind(this),0)}}}Ye.responsesRequiredToBeHealthy=2;Ye.healthyTimeout=3e4;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class yr{static get ALL_TRANSPORTS(){return[Kn,Ye]}static get IS_TRANSPORT_INITIALIZED(){return this.globalTransportInitialized_}constructor(e){this.initTransports_(e)}initTransports_(e){const n=Ye&&Ye.isAvailable();let s=n&&!Ye.previouslyFailed();if(e.webSocketOnly&&(n||ke("wss:// URL used, but browser isn't known to support websockets.  Trying anyway."),s=!0),s)this.transports_=[Ye];else{const r=this.transports_=[];for(const i of yr.ALL_TRANSPORTS)i&&i.isAvailable()&&r.push(i);yr.globalTransportInitialized_=!0}}initialTransport(){if(this.transports_.length>0)return this.transports_[0];throw new Error("No transports available")}upgradeTransport(){return this.transports_.length>1?this.transports_[1]:null}}yr.globalTransportInitialized_=!1;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const jS=6e4,qS=5e3,zS=10*1024,GS=100*1024,ua="t",Fd="d",YS="s",Ud="r",KS="e",$d="o",Bd="a",Hd="n",Wd="p",JS="h";class XS{constructor(e,n,s,r,i,o,a,c,l,u){this.id=e,this.repoInfo_=n,this.applicationId_=s,this.appCheckToken_=r,this.authToken_=i,this.onMessage_=o,this.onReady_=a,this.onDisconnect_=c,this.onKill_=l,this.lastSessionId=u,this.connectionCount=0,this.pendingDataMessages=[],this.state_=0,this.log_=Br("c:"+this.id+":"),this.transportManager_=new yr(n),this.log_("Connection created"),this.start_()}start_(){const e=this.transportManager_.initialTransport();this.conn_=new e(this.nextTransportId_(),this.repoInfo_,this.applicationId_,this.appCheckToken_,this.authToken_,null,this.lastSessionId),this.primaryResponsesRequired_=e.responsesRequiredToBeHealthy||0;const n=this.connReceiver_(this.conn_),s=this.disconnReceiver_(this.conn_);this.tx_=this.conn_,this.rx_=this.conn_,this.secondaryConn_=null,this.isHealthy_=!1,setTimeout(()=>{this.conn_&&this.conn_.open(n,s)},Math.floor(0));const r=e.healthyTimeout||0;r>0&&(this.healthyTimeout_=tr(()=>{this.healthyTimeout_=null,this.isHealthy_||(this.conn_&&this.conn_.bytesReceived>GS?(this.log_("Connection exceeded healthy timeout but has received "+this.conn_.bytesReceived+" bytes.  Marking connection healthy."),this.isHealthy_=!0,this.conn_.markConnectionHealthy()):this.conn_&&this.conn_.bytesSent>zS?this.log_("Connection exceeded healthy timeout but has sent "+this.conn_.bytesSent+" bytes.  Leaving connection alive."):(this.log_("Closing unhealthy connection after timeout."),this.close()))},Math.floor(r)))}nextTransportId_(){return"c:"+this.id+":"+this.connectionCount++}disconnReceiver_(e){return n=>{e===this.conn_?this.onConnectionLost_(n):e===this.secondaryConn_?(this.log_("Secondary connection lost."),this.onSecondaryConnectionLost_()):this.log_("closing an old connection")}}connReceiver_(e){return n=>{this.state_!==2&&(e===this.rx_?this.onPrimaryMessageReceived_(n):e===this.secondaryConn_?this.onSecondaryMessageReceived_(n):this.log_("message on old connection"))}}sendRequest(e){const n={t:"d",d:e};this.sendData_(n)}tryCleanupConnection(){this.tx_===this.secondaryConn_&&this.rx_===this.secondaryConn_&&(this.log_("cleaning up and promoting a connection: "+this.secondaryConn_.connId),this.conn_=this.secondaryConn_,this.secondaryConn_=null)}onSecondaryControl_(e){if(ua in e){const n=e[ua];n===Bd?this.upgradeIfSecondaryHealthy_():n===Ud?(this.log_("Got a reset on secondary, closing it"),this.secondaryConn_.close(),(this.tx_===this.secondaryConn_||this.rx_===this.secondaryConn_)&&this.close()):n===$d&&(this.log_("got pong on secondary."),this.secondaryResponsesRequired_--,this.upgradeIfSecondaryHealthy_())}}onSecondaryMessageReceived_(e){const n=js("t",e),s=js("d",e);if(n==="c")this.onSecondaryControl_(s);else if(n==="d")this.pendingDataMessages.push(s);else throw new Error("Unknown protocol layer: "+n)}upgradeIfSecondaryHealthy_(){this.secondaryResponsesRequired_<=0?(this.log_("Secondary connection is healthy."),this.isHealthy_=!0,this.secondaryConn_.markConnectionHealthy(),this.proceedWithUpgrade_()):(this.log_("sending ping on secondary."),this.secondaryConn_.send({t:"c",d:{t:Wd,d:{}}}))}proceedWithUpgrade_(){this.secondaryConn_.start(),this.log_("sending client ack on secondary"),this.secondaryConn_.send({t:"c",d:{t:Bd,d:{}}}),this.log_("Ending transmission on primary"),this.conn_.send({t:"c",d:{t:Hd,d:{}}}),this.tx_=this.secondaryConn_,this.tryCleanupConnection()}onPrimaryMessageReceived_(e){const n=js("t",e),s=js("d",e);n==="c"?this.onControl_(s):n==="d"&&this.onDataMessage_(s)}onDataMessage_(e){this.onPrimaryResponse_(),this.onMessage_(e)}onPrimaryResponse_(){this.isHealthy_||(this.primaryResponsesRequired_--,this.primaryResponsesRequired_<=0&&(this.log_("Primary connection is healthy."),this.isHealthy_=!0,this.conn_.markConnectionHealthy()))}onControl_(e){const n=js(ua,e);if(Fd in e){const s=e[Fd];if(n===JS){const r={...s};this.repoInfo_.isUsingEmulator&&(r.h=this.repoInfo_.host),this.onHandshake_(r)}else if(n===Hd){this.log_("recvd end transmission on primary"),this.rx_=this.secondaryConn_;for(let r=0;r<this.pendingDataMessages.length;++r)this.onDataMessage_(this.pendingDataMessages[r]);this.pendingDataMessages=[],this.tryCleanupConnection()}else n===YS?this.onConnectionShutdown_(s):n===Ud?this.onReset_(s):n===KS?Ja("Server Error: "+s):n===$d?(this.log_("got pong on primary."),this.onPrimaryResponse_(),this.sendPingOnPrimaryIfNecessary_()):Ja("Unknown control packet command: "+n)}}onHandshake_(e){const n=e.ts,s=e.v,r=e.h;this.sessionId=e.s,this.repoInfo_.host=r,this.state_===0&&(this.conn_.start(),this.onConnectionEstablished_(this.conn_,n),Qc!==s&&ke("Protocol version mismatch detected"),this.tryStartUpgrade_())}tryStartUpgrade_(){const e=this.transportManager_.upgradeTransport();e&&this.startUpgrade_(e)}startUpgrade_(e){this.secondaryConn_=new e(this.nextTransportId_(),this.repoInfo_,this.applicationId_,this.appCheckToken_,this.authToken_,this.sessionId),this.secondaryResponsesRequired_=e.responsesRequiredToBeHealthy||0;const n=this.connReceiver_(this.secondaryConn_),s=this.disconnReceiver_(this.secondaryConn_);this.secondaryConn_.open(n,s),tr(()=>{this.secondaryConn_&&(this.log_("Timed out trying to upgrade."),this.secondaryConn_.close())},Math.floor(jS))}onReset_(e){this.log_("Reset packet received.  New host: "+e),this.repoInfo_.host=e,this.state_===1?this.close():(this.closeConnections_(),this.start_())}onConnectionEstablished_(e,n){this.log_("Realtime connection established."),this.conn_=e,this.state_=1,this.onReady_&&(this.onReady_(n,this.sessionId),this.onReady_=null),this.primaryResponsesRequired_===0?(this.log_("Primary connection is healthy."),this.isHealthy_=!0):tr(()=>{this.sendPingOnPrimaryIfNecessary_()},Math.floor(qS))}sendPingOnPrimaryIfNecessary_(){!this.isHealthy_&&this.state_===1&&(this.log_("sending ping on primary."),this.sendData_({t:"c",d:{t:Wd,d:{}}}))}onSecondaryConnectionLost_(){const e=this.secondaryConn_;this.secondaryConn_=null,(this.tx_===e||this.rx_===e)&&this.close()}onConnectionLost_(e){this.conn_=null,!e&&this.state_===0?(this.log_("Realtime connection failed."),this.repoInfo_.isCacheableHost()&&(wn.remove("host:"+this.repoInfo_.host),this.repoInfo_.internalHost=this.repoInfo_.host)):this.state_===1&&this.log_("Realtime connection lost."),this.close()}onConnectionShutdown_(e){this.log_("Connection shutdown command received. Shutting down..."),this.onKill_&&(this.onKill_(e),this.onKill_=null),this.onDisconnect_=null,this.close()}sendData_(e){if(this.state_!==1)throw"Connection is not connected";this.tx_.send(e)}close(){this.state_!==2&&(this.log_("Closing realtime connection."),this.state_=2,this.closeConnections_(),this.onDisconnect_&&(this.onDisconnect_(),this.onDisconnect_=null))}closeConnections_(){this.log_("Shutting down all connections"),this.conn_&&(this.conn_.close(),this.conn_=null),this.secondaryConn_&&(this.secondaryConn_.close(),this.secondaryConn_=null),this.healthyTimeout_&&(clearTimeout(this.healthyTimeout_),this.healthyTimeout_=null)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class xp{put(e,n,s,r){}merge(e,n,s,r){}refreshAuthToken(e){}refreshAppCheckToken(e){}onDisconnectPut(e,n,s){}onDisconnectMerge(e,n,s){}onDisconnectCancel(e,n){}reportStats(e){}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Mp{constructor(e){this.allowedEvents_=e,this.listeners_={},g(Array.isArray(e)&&e.length>0,"Requires a non-empty array")}trigger(e,...n){if(Array.isArray(this.listeners_[e])){const s=[...this.listeners_[e]];for(let r=0;r<s.length;r++)s[r].callback.apply(s[r].context,n)}}on(e,n,s){this.validateEventType_(e),this.listeners_[e]=this.listeners_[e]||[],this.listeners_[e].push({callback:n,context:s});const r=this.getInitialEvent(e);r&&n.apply(s,r)}off(e,n,s){this.validateEventType_(e);const r=this.listeners_[e]||[];for(let i=0;i<r.length;i++)if(r[i].callback===n&&(!s||s===r[i].context)){r.splice(i,1);return}}validateEventType_(e){g(this.allowedEvents_.find(n=>n===e),"Unknown event: "+e)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Oi extends Mp{static getInstance(){return new Oi}constructor(){super(["online"]),this.online_=!0,typeof window<"u"&&typeof window.addEventListener<"u"&&!Gc()&&(window.addEventListener("online",()=>{this.online_||(this.online_=!0,this.trigger("online",!0))},!1),window.addEventListener("offline",()=>{this.online_&&(this.online_=!1,this.trigger("online",!1))},!1))}getInitialEvent(e){return g(e==="online","Unknown event type: "+e),[this.online_]}currentlyOnline(){return this.online_}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Vd=32,jd=768;class H{constructor(e,n){if(n===void 0){this.pieces_=e.split("/");let s=0;for(let r=0;r<this.pieces_.length;r++)this.pieces_[r].length>0&&(this.pieces_[s]=this.pieces_[r],s++);this.pieces_.length=s,this.pieceNum_=0}else this.pieces_=e,this.pieceNum_=n}toString(){let e="";for(let n=this.pieceNum_;n<this.pieces_.length;n++)this.pieces_[n]!==""&&(e+="/"+this.pieces_[n]);return e||"/"}}function U(){return new H("")}function N(t){return t.pieceNum_>=t.pieces_.length?null:t.pieces_[t.pieceNum_]}function nn(t){return t.pieces_.length-t.pieceNum_}function j(t){let e=t.pieceNum_;return e<t.pieces_.length&&e++,new H(t.pieces_,e)}function tl(t){return t.pieceNum_<t.pieces_.length?t.pieces_[t.pieces_.length-1]:null}function QS(t){let e="";for(let n=t.pieceNum_;n<t.pieces_.length;n++)t.pieces_[n]!==""&&(e+="/"+encodeURIComponent(String(t.pieces_[n])));return e||"/"}function vr(t,e=0){return t.pieces_.slice(t.pieceNum_+e)}function Fp(t){if(t.pieceNum_>=t.pieces_.length)return null;const e=[];for(let n=t.pieceNum_;n<t.pieces_.length-1;n++)e.push(t.pieces_[n]);return new H(e,0)}function X(t,e){const n=[];for(let s=t.pieceNum_;s<t.pieces_.length;s++)n.push(t.pieces_[s]);if(e instanceof H)for(let s=e.pieceNum_;s<e.pieces_.length;s++)n.push(e.pieces_[s]);else{const s=e.split("/");for(let r=0;r<s.length;r++)s[r].length>0&&n.push(s[r])}return new H(n,0)}function P(t){return t.pieceNum_>=t.pieces_.length}function Te(t,e){const n=N(t),s=N(e);if(n===null)return e;if(n===s)return Te(j(t),j(e));throw new Error("INTERNAL ERROR: innerPath ("+e+") is not within outerPath ("+t+")")}function ZS(t,e){const n=vr(t,0),s=vr(e,0);for(let r=0;r<n.length&&r<s.length;r++){const i=jn(n[r],s[r]);if(i!==0)return i}return n.length===s.length?0:n.length<s.length?-1:1}function nl(t,e){if(nn(t)!==nn(e))return!1;for(let n=t.pieceNum_,s=e.pieceNum_;n<=t.pieces_.length;n++,s++)if(t.pieces_[n]!==e.pieces_[s])return!1;return!0}function Ue(t,e){let n=t.pieceNum_,s=e.pieceNum_;if(nn(t)>nn(e))return!1;for(;n<t.pieces_.length;){if(t.pieces_[n]!==e.pieces_[s])return!1;++n,++s}return!0}class eT{constructor(e,n){this.errorPrefix_=n,this.parts_=vr(e,0),this.byteLength_=Math.max(1,this.parts_.length);for(let s=0;s<this.parts_.length;s++)this.byteLength_+=_o(this.parts_[s]);Up(this)}}function tT(t,e){t.parts_.length>0&&(t.byteLength_+=1),t.parts_.push(e),t.byteLength_+=_o(e),Up(t)}function nT(t){const e=t.parts_.pop();t.byteLength_-=_o(e),t.parts_.length>0&&(t.byteLength_-=1)}function Up(t){if(t.byteLength_>jd)throw new Error(t.errorPrefix_+"has a key path longer than "+jd+" bytes ("+t.byteLength_+").");if(t.parts_.length>Vd)throw new Error(t.errorPrefix_+"path specified exceeds the maximum depth that can be written ("+Vd+") or object contains a cycle "+yn(t))}function yn(t){return t.parts_.length===0?"":"in property '"+t.parts_.join(".")+"'"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class sl extends Mp{static getInstance(){return new sl}constructor(){super(["visible"]);let e,n;typeof document<"u"&&typeof document.addEventListener<"u"&&(typeof document.hidden<"u"?(n="visibilitychange",e="hidden"):typeof document.mozHidden<"u"?(n="mozvisibilitychange",e="mozHidden"):typeof document.msHidden<"u"?(n="msvisibilitychange",e="msHidden"):typeof document.webkitHidden<"u"&&(n="webkitvisibilitychange",e="webkitHidden")),this.visible_=!0,n&&document.addEventListener(n,()=>{const s=!document[e];s!==this.visible_&&(this.visible_=s,this.trigger("visible",s))},!1)}getInitialEvent(e){return g(e==="visible","Unknown event type: "+e),[this.visible_]}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const qs=1e3,sT=300*1e3,qd=30*1e3,rT=1.3,iT=3e4,oT="server_kill",zd=3;class Tt extends xp{constructor(e,n,s,r,i,o,a,c){if(super(),this.repoInfo_=e,this.applicationId_=n,this.onDataUpdate_=s,this.onConnectStatus_=r,this.onServerInfoUpdate_=i,this.authTokenProvider_=o,this.appCheckTokenProvider_=a,this.authOverride_=c,this.id=Tt.nextPersistentConnectionId_++,this.log_=Br("p:"+this.id+":"),this.interruptReasons_={},this.listens=new Map,this.outstandingPuts_=[],this.outstandingGets_=[],this.outstandingPutCount_=0,this.outstandingGetCount_=0,this.onDisconnectRequestQueue_=[],this.connected_=!1,this.reconnectDelay_=qs,this.maxReconnectDelay_=sT,this.securityDebugCallback_=null,this.lastSessionId=null,this.establishConnectionTimer_=null,this.visible_=!1,this.requestCBHash_={},this.requestNumber_=0,this.realtime_=null,this.authToken_=null,this.appCheckToken_=null,this.forceTokenRefresh_=!1,this.invalidAuthTokenCount_=0,this.invalidAppCheckTokenCount_=0,this.firstConnection_=!0,this.lastConnectionAttemptTime_=null,this.lastConnectionEstablishedTime_=null,c)throw new Error("Auth override specified in options, but not supported on non Node.js platforms");sl.getInstance().on("visible",this.onVisible_,this),e.host.indexOf("fblocal")===-1&&Oi.getInstance().on("online",this.onOnline_,this)}sendRequest(e,n,s){const r=++this.requestNumber_,i={r,a:e,b:n};this.log_(ae(i)),g(this.connected_,"sendRequest call when we're not connected not allowed."),this.realtime_.sendRequest(i),s&&(this.requestCBHash_[r]=s)}get(e){this.initConnection_();const n=new Ne,r={action:"g",request:{p:e._path.toString(),q:e._queryObject},onComplete:o=>{const a=o.d;o.s==="ok"?n.resolve(a):n.reject(a)}};this.outstandingGets_.push(r),this.outstandingGetCount_++;const i=this.outstandingGets_.length-1;return this.connected_&&this.sendGet_(i),n.promise}listen(e,n,s,r){this.initConnection_();const i=e._queryIdentifier,o=e._path.toString();this.log_("Listen called for "+o+" "+i),this.listens.has(o)||this.listens.set(o,new Map),g(e._queryParams.isDefault()||!e._queryParams.loadsAllData(),"listen() called for non-default but complete query"),g(!this.listens.get(o).has(i),"listen() called twice for same path/queryId.");const a={onComplete:r,hashFn:n,query:e,tag:s};this.listens.get(o).set(i,a),this.connected_&&this.sendListen_(a)}sendGet_(e){const n=this.outstandingGets_[e];this.sendRequest("g",n.request,s=>{delete this.outstandingGets_[e],this.outstandingGetCount_--,this.outstandingGetCount_===0&&(this.outstandingGets_=[]),n.onComplete&&n.onComplete(s)})}sendListen_(e){const n=e.query,s=n._path.toString(),r=n._queryIdentifier;this.log_("Listen on "+s+" for "+r);const i={p:s},o="q";e.tag&&(i.q=n._queryObject,i.t=e.tag),i.h=e.hashFn(),this.sendRequest(o,i,a=>{const c=a.d,l=a.s;Tt.warnOnListenWarnings_(c,n),(this.listens.get(s)&&this.listens.get(s).get(r))===e&&(this.log_("listen response",a),l!=="ok"&&this.removeListen_(s,r),e.onComplete&&e.onComplete(l,c))})}static warnOnListenWarnings_(e,n){if(e&&typeof e=="object"&&pt(e,"w")){const s=gs(e,"w");if(Array.isArray(s)&&~s.indexOf("no_index")){const r='".indexOn": "'+n._queryParams.getIndex().toString()+'"',i=n._path.toString();ke(`Using an unspecified index. Your data will be downloaded and filtered on the client. Consider adding ${r} at ${i} to your security rules for better performance.`)}}}refreshAuthToken(e){this.authToken_=e,this.log_("Auth token refreshed"),this.authToken_?this.tryAuth():this.connected_&&this.sendRequest("unauth",{},()=>{}),this.reduceReconnectDelayIfAdminCredential_(e)}reduceReconnectDelayIfAdminCredential_(e){(e&&e.length===40||qb(e))&&(this.log_("Admin auth credential detected.  Reducing max reconnect time."),this.maxReconnectDelay_=qd)}refreshAppCheckToken(e){this.appCheckToken_=e,this.log_("App check token refreshed"),this.appCheckToken_?this.tryAppCheck():this.connected_&&this.sendRequest("unappeck",{},()=>{})}tryAuth(){if(this.connected_&&this.authToken_){const e=this.authToken_,n=jb(e)?"auth":"gauth",s={cred:e};this.authOverride_===null?s.noauth=!0:typeof this.authOverride_=="object"&&(s.authvar=this.authOverride_),this.sendRequest(n,s,r=>{const i=r.s,o=r.d||"error";this.authToken_===e&&(i==="ok"?this.invalidAuthTokenCount_=0:this.onAuthRevoked_(i,o))})}}tryAppCheck(){this.connected_&&this.appCheckToken_&&this.sendRequest("appcheck",{token:this.appCheckToken_},e=>{const n=e.s,s=e.d||"error";n==="ok"?this.invalidAppCheckTokenCount_=0:this.onAppCheckRevoked_(n,s)})}unlisten(e,n){const s=e._path.toString(),r=e._queryIdentifier;this.log_("Unlisten called for "+s+" "+r),g(e._queryParams.isDefault()||!e._queryParams.loadsAllData(),"unlisten() called for non-default but complete query"),this.removeListen_(s,r)&&this.connected_&&this.sendUnlisten_(s,r,e._queryObject,n)}sendUnlisten_(e,n,s,r){this.log_("Unlisten on "+e+" for "+n);const i={p:e},o="n";r&&(i.q=s,i.t=r),this.sendRequest(o,i)}onDisconnectPut(e,n,s){this.initConnection_(),this.connected_?this.sendOnDisconnect_("o",e,n,s):this.onDisconnectRequestQueue_.push({pathString:e,action:"o",data:n,onComplete:s})}onDisconnectMerge(e,n,s){this.initConnection_(),this.connected_?this.sendOnDisconnect_("om",e,n,s):this.onDisconnectRequestQueue_.push({pathString:e,action:"om",data:n,onComplete:s})}onDisconnectCancel(e,n){this.initConnection_(),this.connected_?this.sendOnDisconnect_("oc",e,null,n):this.onDisconnectRequestQueue_.push({pathString:e,action:"oc",data:null,onComplete:n})}sendOnDisconnect_(e,n,s,r){const i={p:n,d:s};this.log_("onDisconnect "+e,i),this.sendRequest(e,i,o=>{r&&setTimeout(()=>{r(o.s,o.d)},Math.floor(0))})}put(e,n,s,r){this.putInternal("p",e,n,s,r)}merge(e,n,s,r){this.putInternal("m",e,n,s,r)}putInternal(e,n,s,r,i){this.initConnection_();const o={p:n,d:s};i!==void 0&&(o.h=i),this.outstandingPuts_.push({action:e,request:o,onComplete:r}),this.outstandingPutCount_++;const a=this.outstandingPuts_.length-1;this.connected_?this.sendPut_(a):this.log_("Buffering put: "+n)}sendPut_(e){const n=this.outstandingPuts_[e].action,s=this.outstandingPuts_[e].request,r=this.outstandingPuts_[e].onComplete;this.outstandingPuts_[e].queued=this.connected_,this.sendRequest(n,s,i=>{this.log_(n+" response",i),delete this.outstandingPuts_[e],this.outstandingPutCount_--,this.outstandingPutCount_===0&&(this.outstandingPuts_=[]),r&&r(i.s,i.d)})}reportStats(e){if(this.connected_){const n={c:e};this.log_("reportStats",n),this.sendRequest("s",n,s=>{if(s.s!=="ok"){const i=s.d;this.log_("reportStats","Error sending stats: "+i)}})}}onDataMessage_(e){if("r"in e){this.log_("from server: "+ae(e));const n=e.r,s=this.requestCBHash_[n];s&&(delete this.requestCBHash_[n],s(e.b))}else{if("error"in e)throw"A server-side error has occurred: "+e.error;"a"in e&&this.onDataPush_(e.a,e.b)}}onDataPush_(e,n){this.log_("handleServerMessage",e,n),e==="d"?this.onDataUpdate_(n.p,n.d,!1,n.t):e==="m"?this.onDataUpdate_(n.p,n.d,!0,n.t):e==="c"?this.onListenRevoked_(n.p,n.q):e==="ac"?this.onAuthRevoked_(n.s,n.d):e==="apc"?this.onAppCheckRevoked_(n.s,n.d):e==="sd"?this.onSecurityDebugPacket_(n):Ja("Unrecognized action received from server: "+ae(e)+`
Are you using the latest client?`)}onReady_(e,n){this.log_("connection ready"),this.connected_=!0,this.lastConnectionEstablishedTime_=new Date().getTime(),this.handleTimestamp_(e),this.lastSessionId=n,this.firstConnection_&&this.sendConnectStats_(),this.restoreState_(),this.firstConnection_=!1,this.onConnectStatus_(!0)}scheduleConnect_(e){g(!this.realtime_,"Scheduling a connect when we're already connected/ing?"),this.establishConnectionTimer_&&clearTimeout(this.establishConnectionTimer_),this.establishConnectionTimer_=setTimeout(()=>{this.establishConnectionTimer_=null,this.establishConnection_()},Math.floor(e))}initConnection_(){!this.realtime_&&this.firstConnection_&&this.scheduleConnect_(0)}onVisible_(e){e&&!this.visible_&&this.reconnectDelay_===this.maxReconnectDelay_&&(this.log_("Window became visible.  Reducing delay."),this.reconnectDelay_=qs,this.realtime_||this.scheduleConnect_(0)),this.visible_=e}onOnline_(e){e?(this.log_("Browser went online."),this.reconnectDelay_=qs,this.realtime_||this.scheduleConnect_(0)):(this.log_("Browser went offline.  Killing connection."),this.realtime_&&this.realtime_.close())}onRealtimeDisconnect_(){if(this.log_("data client disconnected"),this.connected_=!1,this.realtime_=null,this.cancelSentTransactions_(),this.requestCBHash_={},this.shouldReconnect_()){this.visible_?this.lastConnectionEstablishedTime_&&(new Date().getTime()-this.lastConnectionEstablishedTime_>iT&&(this.reconnectDelay_=qs),this.lastConnectionEstablishedTime_=null):(this.log_("Window isn't visible.  Delaying reconnect."),this.reconnectDelay_=this.maxReconnectDelay_,this.lastConnectionAttemptTime_=new Date().getTime());const e=Math.max(0,new Date().getTime()-this.lastConnectionAttemptTime_);let n=Math.max(0,this.reconnectDelay_-e);n=Math.random()*n,this.log_("Trying to reconnect in "+n+"ms"),this.scheduleConnect_(n),this.reconnectDelay_=Math.min(this.maxReconnectDelay_,this.reconnectDelay_*rT)}this.onConnectStatus_(!1)}async establishConnection_(){if(this.shouldReconnect_()){this.log_("Making a connection attempt"),this.lastConnectionAttemptTime_=new Date().getTime(),this.lastConnectionEstablishedTime_=null;const e=this.onDataMessage_.bind(this),n=this.onReady_.bind(this),s=this.onRealtimeDisconnect_.bind(this),r=this.id+":"+Tt.nextConnectionId_++,i=this.lastSessionId;let o=!1,a=null;const c=function(){a?a.close():(o=!0,s())},l=function(d){g(a,"sendRequest call when we're not connected not allowed."),a.sendRequest(d)};this.realtime_={close:c,sendRequest:l};const u=this.forceTokenRefresh_;this.forceTokenRefresh_=!1;try{const[d,h]=await Promise.all([this.authTokenProvider_.getToken(u),this.appCheckTokenProvider_.getToken(u)]);o?fe("getToken() completed but was canceled"):(fe("getToken() completed. Creating connection."),this.authToken_=d&&d.accessToken,this.appCheckToken_=h&&h.token,a=new XS(r,this.repoInfo_,this.applicationId_,this.appCheckToken_,this.authToken_,e,n,s,f=>{ke(f+" ("+this.repoInfo_.toString()+")"),this.interrupt(oT)},i))}catch(d){this.log_("Failed to get token: "+d),o||(this.repoInfo_.nodeAdmin&&ke(d),c())}}}interrupt(e){fe("Interrupting connection for reason: "+e),this.interruptReasons_[e]=!0,this.realtime_?this.realtime_.close():(this.establishConnectionTimer_&&(clearTimeout(this.establishConnectionTimer_),this.establishConnectionTimer_=null),this.connected_&&this.onRealtimeDisconnect_())}resume(e){fe("Resuming connection for reason: "+e),delete this.interruptReasons_[e],Ai(this.interruptReasons_)&&(this.reconnectDelay_=qs,this.realtime_||this.scheduleConnect_(0))}handleTimestamp_(e){const n=e-new Date().getTime();this.onServerInfoUpdate_({serverTimeOffset:n})}cancelSentTransactions_(){for(let e=0;e<this.outstandingPuts_.length;e++){const n=this.outstandingPuts_[e];n&&"h"in n.request&&n.queued&&(n.onComplete&&n.onComplete("disconnect"),delete this.outstandingPuts_[e],this.outstandingPutCount_--)}this.outstandingPutCount_===0&&(this.outstandingPuts_=[])}onListenRevoked_(e,n){let s;n?s=n.map(i=>Xc(i)).join("$"):s="default";const r=this.removeListen_(e,s);r&&r.onComplete&&r.onComplete("permission_denied")}removeListen_(e,n){const s=new H(e).toString();let r;if(this.listens.has(s)){const i=this.listens.get(s);r=i.get(n),i.delete(n),i.size===0&&this.listens.delete(s)}else r=void 0;return r}onAuthRevoked_(e,n){fe("Auth token revoked: "+e+"/"+n),this.authToken_=null,this.forceTokenRefresh_=!0,this.realtime_.close(),(e==="invalid_token"||e==="permission_denied")&&(this.invalidAuthTokenCount_++,this.invalidAuthTokenCount_>=zd&&(this.reconnectDelay_=qd,this.authTokenProvider_.notifyForInvalidToken()))}onAppCheckRevoked_(e,n){fe("App check token revoked: "+e+"/"+n),this.appCheckToken_=null,this.forceTokenRefresh_=!0,(e==="invalid_token"||e==="permission_denied")&&(this.invalidAppCheckTokenCount_++,this.invalidAppCheckTokenCount_>=zd&&this.appCheckTokenProvider_.notifyForInvalidToken())}onSecurityDebugPacket_(e){this.securityDebugCallback_?this.securityDebugCallback_(e):"msg"in e&&console.log("FIREBASE: "+e.msg.replace(`
`,`
FIREBASE: `))}restoreState_(){this.tryAuth(),this.tryAppCheck();for(const e of this.listens.values())for(const n of e.values())this.sendListen_(n);for(let e=0;e<this.outstandingPuts_.length;e++)this.outstandingPuts_[e]&&this.sendPut_(e);for(;this.onDisconnectRequestQueue_.length;){const e=this.onDisconnectRequestQueue_.shift();this.sendOnDisconnect_(e.action,e.pathString,e.data,e.onComplete)}for(let e=0;e<this.outstandingGets_.length;e++)this.outstandingGets_[e]&&this.sendGet_(e)}sendConnectStats_(){const e={};let n="js";e["sdk."+n+"."+fp.replace(/\./g,"-")]=1,Gc()?e["framework.cordova"]=1:op()&&(e["framework.reactnative"]=1),this.reportStats(e)}shouldReconnect_(){const e=Oi.getInstance().currentlyOnline();return Ai(this.interruptReasons_)&&e}}Tt.nextPersistentConnectionId_=0;Tt.nextConnectionId_=0;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
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
 */class Eo{getCompare(){return this.compare.bind(this)}indexedValueChanged(e,n){const s=new L(_s,e),r=new L(_s,n);return this.compare(s,r)!==0}minPost(){return L.MIN}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let ni;class $p extends Eo{static get __EMPTY_NODE(){return ni}static set __EMPTY_NODE(e){ni=e}compare(e,n){return jn(e.name,n.name)}isDefinedOn(e){throw As("KeyIndex.isDefinedOn not expected to be called.")}indexedValueChanged(e,n){return!1}minPost(){return L.MIN}maxPost(){return new L(Ln,ni)}makePost(e,n){return g(typeof e=="string","KeyIndex indexValue must always be a string."),new L(e,ni)}toString(){return".key"}}const Zn=new $p;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class si{constructor(e,n,s,r,i=null){this.isReverse_=r,this.resultGenerator_=i,this.nodeStack_=[];let o=1;for(;!e.isEmpty();)if(e=e,o=n?s(e.key,n):1,r&&(o*=-1),o<0)this.isReverse_?e=e.left:e=e.right;else if(o===0){this.nodeStack_.push(e);break}else this.nodeStack_.push(e),this.isReverse_?e=e.right:e=e.left}getNext(){if(this.nodeStack_.length===0)return null;let e=this.nodeStack_.pop(),n;if(this.resultGenerator_?n=this.resultGenerator_(e.key,e.value):n={key:e.key,value:e.value},this.isReverse_)for(e=e.left;!e.isEmpty();)this.nodeStack_.push(e),e=e.right;else for(e=e.right;!e.isEmpty();)this.nodeStack_.push(e),e=e.left;return n}hasNext(){return this.nodeStack_.length>0}peek(){if(this.nodeStack_.length===0)return null;const e=this.nodeStack_[this.nodeStack_.length-1];return this.resultGenerator_?this.resultGenerator_(e.key,e.value):{key:e.key,value:e.value}}}class he{constructor(e,n,s,r,i){this.key=e,this.value=n,this.color=s??he.RED,this.left=r??Pe.EMPTY_NODE,this.right=i??Pe.EMPTY_NODE}copy(e,n,s,r,i){return new he(e??this.key,n??this.value,s??this.color,r??this.left,i??this.right)}count(){return this.left.count()+1+this.right.count()}isEmpty(){return!1}inorderTraversal(e){return this.left.inorderTraversal(e)||!!e(this.key,this.value)||this.right.inorderTraversal(e)}reverseTraversal(e){return this.right.reverseTraversal(e)||e(this.key,this.value)||this.left.reverseTraversal(e)}min_(){return this.left.isEmpty()?this:this.left.min_()}minKey(){return this.min_().key}maxKey(){return this.right.isEmpty()?this.key:this.right.maxKey()}insert(e,n,s){let r=this;const i=s(e,r.key);return i<0?r=r.copy(null,null,null,r.left.insert(e,n,s),null):i===0?r=r.copy(null,n,null,null,null):r=r.copy(null,null,null,null,r.right.insert(e,n,s)),r.fixUp_()}removeMin_(){if(this.left.isEmpty())return Pe.EMPTY_NODE;let e=this;return!e.left.isRed_()&&!e.left.left.isRed_()&&(e=e.moveRedLeft_()),e=e.copy(null,null,null,e.left.removeMin_(),null),e.fixUp_()}remove(e,n){let s,r;if(s=this,n(e,s.key)<0)!s.left.isEmpty()&&!s.left.isRed_()&&!s.left.left.isRed_()&&(s=s.moveRedLeft_()),s=s.copy(null,null,null,s.left.remove(e,n),null);else{if(s.left.isRed_()&&(s=s.rotateRight_()),!s.right.isEmpty()&&!s.right.isRed_()&&!s.right.left.isRed_()&&(s=s.moveRedRight_()),n(e,s.key)===0){if(s.right.isEmpty())return Pe.EMPTY_NODE;r=s.right.min_(),s=s.copy(r.key,r.value,null,null,s.right.removeMin_())}s=s.copy(null,null,null,null,s.right.remove(e,n))}return s.fixUp_()}isRed_(){return this.color}fixUp_(){let e=this;return e.right.isRed_()&&!e.left.isRed_()&&(e=e.rotateLeft_()),e.left.isRed_()&&e.left.left.isRed_()&&(e=e.rotateRight_()),e.left.isRed_()&&e.right.isRed_()&&(e=e.colorFlip_()),e}moveRedLeft_(){let e=this.colorFlip_();return e.right.left.isRed_()&&(e=e.copy(null,null,null,null,e.right.rotateRight_()),e=e.rotateLeft_(),e=e.colorFlip_()),e}moveRedRight_(){let e=this.colorFlip_();return e.left.left.isRed_()&&(e=e.rotateRight_(),e=e.colorFlip_()),e}rotateLeft_(){const e=this.copy(null,null,he.RED,null,this.right.left);return this.right.copy(null,null,this.color,e,null)}rotateRight_(){const e=this.copy(null,null,he.RED,this.left.right,null);return this.left.copy(null,null,this.color,null,e)}colorFlip_(){const e=this.left.copy(null,null,!this.left.color,null,null),n=this.right.copy(null,null,!this.right.color,null,null);return this.copy(null,null,!this.color,e,n)}checkMaxDepth_(){const e=this.check_();return Math.pow(2,e)<=this.count()+1}check_(){if(this.isRed_()&&this.left.isRed_())throw new Error("Red node has red child("+this.key+","+this.value+")");if(this.right.isRed_())throw new Error("Right child of ("+this.key+","+this.value+") is red");const e=this.left.check_();if(e!==this.right.check_())throw new Error("Black depths differ");return e+(this.isRed_()?0:1)}}he.RED=!0;he.BLACK=!1;class aT{copy(e,n,s,r,i){return this}insert(e,n,s){return new he(e,n,null)}remove(e,n){return this}count(){return 0}isEmpty(){return!0}inorderTraversal(e){return!1}reverseTraversal(e){return!1}minKey(){return null}maxKey(){return null}check_(){return 0}isRed_(){return!1}}class Pe{constructor(e,n=Pe.EMPTY_NODE){this.comparator_=e,this.root_=n}insert(e,n){return new Pe(this.comparator_,this.root_.insert(e,n,this.comparator_).copy(null,null,he.BLACK,null,null))}remove(e){return new Pe(this.comparator_,this.root_.remove(e,this.comparator_).copy(null,null,he.BLACK,null,null))}get(e){let n,s=this.root_;for(;!s.isEmpty();){if(n=this.comparator_(e,s.key),n===0)return s.value;n<0?s=s.left:n>0&&(s=s.right)}return null}getPredecessorKey(e){let n,s=this.root_,r=null;for(;!s.isEmpty();)if(n=this.comparator_(e,s.key),n===0){if(s.left.isEmpty())return r?r.key:null;for(s=s.left;!s.right.isEmpty();)s=s.right;return s.key}else n<0?s=s.left:n>0&&(r=s,s=s.right);throw new Error("Attempted to find predecessor key for a nonexistent key.  What gives?")}isEmpty(){return this.root_.isEmpty()}count(){return this.root_.count()}minKey(){return this.root_.minKey()}maxKey(){return this.root_.maxKey()}inorderTraversal(e){return this.root_.inorderTraversal(e)}reverseTraversal(e){return this.root_.reverseTraversal(e)}getIterator(e){return new si(this.root_,null,this.comparator_,!1,e)}getIteratorFrom(e,n){return new si(this.root_,e,this.comparator_,!1,n)}getReverseIteratorFrom(e,n){return new si(this.root_,e,this.comparator_,!0,n)}getReverseIterator(e){return new si(this.root_,null,this.comparator_,!0,e)}}Pe.EMPTY_NODE=new aT;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function cT(t,e){return jn(t.name,e.name)}function rl(t,e){return jn(t,e)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Qa;function lT(t){Qa=t}const Bp=function(t){return typeof t=="number"?"number:"+yp(t):"string:"+t},Hp=function(t){if(t.isLeafNode()){const e=t.val();g(typeof e=="string"||typeof e=="number"||typeof e=="object"&&pt(e,".sv"),"Priority must be a string or number.")}else g(t===Qa||t.isEmpty(),"priority of unexpected type.");g(t===Qa||t.getPriority().isEmpty(),"Priority nodes can't have a priority of their own.")};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Gd;class de{static set __childrenNodeConstructor(e){Gd=e}static get __childrenNodeConstructor(){return Gd}constructor(e,n=de.__childrenNodeConstructor.EMPTY_NODE){this.value_=e,this.priorityNode_=n,this.lazyHash_=null,g(this.value_!==void 0&&this.value_!==null,"LeafNode shouldn't be created with null/undefined value."),Hp(this.priorityNode_)}isLeafNode(){return!0}getPriority(){return this.priorityNode_}updatePriority(e){return new de(this.value_,e)}getImmediateChild(e){return e===".priority"?this.priorityNode_:de.__childrenNodeConstructor.EMPTY_NODE}getChild(e){return P(e)?this:N(e)===".priority"?this.priorityNode_:de.__childrenNodeConstructor.EMPTY_NODE}hasChild(){return!1}getPredecessorChildName(e,n){return null}updateImmediateChild(e,n){return e===".priority"?this.updatePriority(n):n.isEmpty()&&e!==".priority"?this:de.__childrenNodeConstructor.EMPTY_NODE.updateImmediateChild(e,n).updatePriority(this.priorityNode_)}updateChild(e,n){const s=N(e);return s===null?n:n.isEmpty()&&s!==".priority"?this:(g(s!==".priority"||nn(e)===1,".priority must be the last token in a path"),this.updateImmediateChild(s,de.__childrenNodeConstructor.EMPTY_NODE.updateChild(j(e),n)))}isEmpty(){return!1}numChildren(){return 0}forEachChild(e,n){return!1}val(e){return e&&!this.getPriority().isEmpty()?{".value":this.getValue(),".priority":this.getPriority().val()}:this.getValue()}hash(){if(this.lazyHash_===null){let e="";this.priorityNode_.isEmpty()||(e+="priority:"+Bp(this.priorityNode_.val())+":");const n=typeof this.value_;e+=n+":",n==="number"?e+=yp(this.value_):e+=this.value_,this.lazyHash_=mp(e)}return this.lazyHash_}getValue(){return this.value_}compareTo(e){return e===de.__childrenNodeConstructor.EMPTY_NODE?1:e instanceof de.__childrenNodeConstructor?-1:(g(e.isLeafNode(),"Unknown node type"),this.compareToLeafNode_(e))}compareToLeafNode_(e){const n=typeof e.value_,s=typeof this.value_,r=de.VALUE_TYPE_ORDER.indexOf(n),i=de.VALUE_TYPE_ORDER.indexOf(s);return g(r>=0,"Unknown leaf type: "+n),g(i>=0,"Unknown leaf type: "+s),r===i?s==="object"?0:this.value_<e.value_?-1:this.value_===e.value_?0:1:i-r}withIndex(){return this}isIndexed(){return!0}equals(e){if(e===this)return!0;if(e.isLeafNode()){const n=e;return this.value_===n.value_&&this.priorityNode_.equals(n.priorityNode_)}else return!1}}de.VALUE_TYPE_ORDER=["object","boolean","number","string"];/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Wp,Vp;function uT(t){Wp=t}function dT(t){Vp=t}class hT extends Eo{compare(e,n){const s=e.node.getPriority(),r=n.node.getPriority(),i=s.compareTo(r);return i===0?jn(e.name,n.name):i}isDefinedOn(e){return!e.getPriority().isEmpty()}indexedValueChanged(e,n){return!e.getPriority().equals(n.getPriority())}minPost(){return L.MIN}maxPost(){return new L(Ln,new de("[PRIORITY-POST]",Vp))}makePost(e,n){const s=Wp(e);return new L(n,new de("[PRIORITY-POST]",s))}toString(){return".priority"}}const Q=new hT;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const fT=Math.log(2);class pT{constructor(e){const n=i=>parseInt(Math.log(i)/fT,10),s=i=>parseInt(Array(i+1).join("1"),2);this.count=n(e+1),this.current_=this.count-1;const r=s(this.count);this.bits_=e+1&r}nextBitIsOne(){const e=!(this.bits_&1<<this.current_);return this.current_--,e}}const Di=function(t,e,n,s){t.sort(e);const r=function(c,l){const u=l-c;let d,h;if(u===0)return null;if(u===1)return d=t[c],h=n?n(d):d,new he(h,d.node,he.BLACK,null,null);{const f=parseInt(u/2,10)+c,p=r(c,f),_=r(f+1,l);return d=t[f],h=n?n(d):d,new he(h,d.node,he.BLACK,p,_)}},i=function(c){let l=null,u=null,d=t.length;const h=function(p,_){const m=d-p,A=d;d-=p;const B=r(m+1,A),x=t[m],w=n?n(x):x;f(new he(w,x.node,_,null,B))},f=function(p){l?(l.left=p,l=p):(u=p,l=p)};for(let p=0;p<c.count;++p){const _=c.nextBitIsOne(),m=Math.pow(2,c.count-(p+1));_?h(m,he.BLACK):(h(m,he.BLACK),h(m,he.RED))}return u},o=new pT(t.length),a=i(o);return new Pe(s||e,a)};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let da;const zn={};class _t{static get Default(){return g(zn&&Q,"ChildrenNode.ts has not been loaded"),da=da||new _t({".priority":zn},{".priority":Q}),da}constructor(e,n){this.indexes_=e,this.indexSet_=n}get(e){const n=gs(this.indexes_,e);if(!n)throw new Error("No index defined for "+e);return n instanceof Pe?n:null}hasIndex(e){return pt(this.indexSet_,e.toString())}addIndex(e,n){g(e!==Zn,"KeyIndex always exists and isn't meant to be added to the IndexMap.");const s=[];let r=!1;const i=n.getIterator(L.Wrap);let o=i.getNext();for(;o;)r=r||e.isDefinedOn(o.node),s.push(o),o=i.getNext();let a;r?a=Di(s,e.getCompare()):a=zn;const c=e.toString(),l={...this.indexSet_};l[c]=e;const u={...this.indexes_};return u[c]=a,new _t(u,l)}addToIndexes(e,n){const s=Ni(this.indexes_,(r,i)=>{const o=gs(this.indexSet_,i);if(g(o,"Missing index implementation for "+i),r===zn)if(o.isDefinedOn(e.node)){const a=[],c=n.getIterator(L.Wrap);let l=c.getNext();for(;l;)l.name!==e.name&&a.push(l),l=c.getNext();return a.push(e),Di(a,o.getCompare())}else return zn;else{const a=n.get(e.name);let c=r;return a&&(c=c.remove(new L(e.name,a))),c.insert(e,e.node)}});return new _t(s,this.indexSet_)}removeFromIndexes(e,n){const s=Ni(this.indexes_,r=>{if(r===zn)return r;{const i=n.get(e.name);return i?r.remove(new L(e.name,i)):r}});return new _t(s,this.indexSet_)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let zs;class E{static get EMPTY_NODE(){return zs||(zs=new E(new Pe(rl),null,_t.Default))}constructor(e,n,s){this.children_=e,this.priorityNode_=n,this.indexMap_=s,this.lazyHash_=null,this.priorityNode_&&Hp(this.priorityNode_),this.children_.isEmpty()&&g(!this.priorityNode_||this.priorityNode_.isEmpty(),"An empty node cannot have a priority")}isLeafNode(){return!1}getPriority(){return this.priorityNode_||zs}updatePriority(e){return this.children_.isEmpty()?this:new E(this.children_,e,this.indexMap_)}getImmediateChild(e){if(e===".priority")return this.getPriority();{const n=this.children_.get(e);return n===null?zs:n}}getChild(e){const n=N(e);return n===null?this:this.getImmediateChild(n).getChild(j(e))}hasChild(e){return this.children_.get(e)!==null}updateImmediateChild(e,n){if(g(n,"We should always be passing snapshot nodes"),e===".priority")return this.updatePriority(n);{const s=new L(e,n);let r,i;n.isEmpty()?(r=this.children_.remove(e),i=this.indexMap_.removeFromIndexes(s,this.children_)):(r=this.children_.insert(e,n),i=this.indexMap_.addToIndexes(s,this.children_));const o=r.isEmpty()?zs:this.priorityNode_;return new E(r,o,i)}}updateChild(e,n){const s=N(e);if(s===null)return n;{g(N(e)!==".priority"||nn(e)===1,".priority must be the last token in a path");const r=this.getImmediateChild(s).updateChild(j(e),n);return this.updateImmediateChild(s,r)}}isEmpty(){return this.children_.isEmpty()}numChildren(){return this.children_.count()}val(e){if(this.isEmpty())return null;const n={};let s=0,r=0,i=!0;if(this.forEachChild(Q,(o,a)=>{n[o]=a.val(e),s++,i&&E.INTEGER_REGEXP_.test(o)?r=Math.max(r,Number(o)):i=!1}),!e&&i&&r<2*s){const o=[];for(const a in n)o[a]=n[a];return o}else return e&&!this.getPriority().isEmpty()&&(n[".priority"]=this.getPriority().val()),n}hash(){if(this.lazyHash_===null){let e="";this.getPriority().isEmpty()||(e+="priority:"+Bp(this.getPriority().val())+":"),this.forEachChild(Q,(n,s)=>{const r=s.hash();r!==""&&(e+=":"+n+":"+r)}),this.lazyHash_=e===""?"":mp(e)}return this.lazyHash_}getPredecessorChildName(e,n,s){const r=this.resolveIndex_(s);if(r){const i=r.getPredecessorKey(new L(e,n));return i?i.name:null}else return this.children_.getPredecessorKey(e)}getFirstChildName(e){const n=this.resolveIndex_(e);if(n){const s=n.minKey();return s&&s.name}else return this.children_.minKey()}getFirstChild(e){const n=this.getFirstChildName(e);return n?new L(n,this.children_.get(n)):null}getLastChildName(e){const n=this.resolveIndex_(e);if(n){const s=n.maxKey();return s&&s.name}else return this.children_.maxKey()}getLastChild(e){const n=this.getLastChildName(e);return n?new L(n,this.children_.get(n)):null}forEachChild(e,n){const s=this.resolveIndex_(e);return s?s.inorderTraversal(r=>n(r.name,r.node)):this.children_.inorderTraversal(n)}getIterator(e){return this.getIteratorFrom(e.minPost(),e)}getIteratorFrom(e,n){const s=this.resolveIndex_(n);if(s)return s.getIteratorFrom(e,r=>r);{const r=this.children_.getIteratorFrom(e.name,L.Wrap);let i=r.peek();for(;i!=null&&n.compare(i,e)<0;)r.getNext(),i=r.peek();return r}}getReverseIterator(e){return this.getReverseIteratorFrom(e.maxPost(),e)}getReverseIteratorFrom(e,n){const s=this.resolveIndex_(n);if(s)return s.getReverseIteratorFrom(e,r=>r);{const r=this.children_.getReverseIteratorFrom(e.name,L.Wrap);let i=r.peek();for(;i!=null&&n.compare(i,e)>0;)r.getNext(),i=r.peek();return r}}compareTo(e){return this.isEmpty()?e.isEmpty()?0:-1:e.isLeafNode()||e.isEmpty()?1:e===Hr?-1:0}withIndex(e){if(e===Zn||this.indexMap_.hasIndex(e))return this;{const n=this.indexMap_.addIndex(e,this.children_);return new E(this.children_,this.priorityNode_,n)}}isIndexed(e){return e===Zn||this.indexMap_.hasIndex(e)}equals(e){if(e===this)return!0;if(e.isLeafNode())return!1;{const n=e;if(this.getPriority().equals(n.getPriority()))if(this.children_.count()===n.children_.count()){const s=this.getIterator(Q),r=n.getIterator(Q);let i=s.getNext(),o=r.getNext();for(;i&&o;){if(i.name!==o.name||!i.node.equals(o.node))return!1;i=s.getNext(),o=r.getNext()}return i===null&&o===null}else return!1;else return!1}}resolveIndex_(e){return e===Zn?null:this.indexMap_.get(e.toString())}}E.INTEGER_REGEXP_=/^(0|[1-9]\d*)$/;class gT extends E{constructor(){super(new Pe(rl),E.EMPTY_NODE,_t.Default)}compareTo(e){return e===this?0:1}equals(e){return e===this}getPriority(){return this}getImmediateChild(e){return E.EMPTY_NODE}isEmpty(){return!1}}const Hr=new gT;Object.defineProperties(L,{MIN:{value:new L(_s,E.EMPTY_NODE)},MAX:{value:new L(Ln,Hr)}});$p.__EMPTY_NODE=E.EMPTY_NODE;de.__childrenNodeConstructor=E;lT(Hr);dT(Hr);/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const mT=!0;function Z(t,e=null){if(t===null)return E.EMPTY_NODE;if(typeof t=="object"&&".priority"in t&&(e=t[".priority"]),g(e===null||typeof e=="string"||typeof e=="number"||typeof e=="object"&&".sv"in e,"Invalid priority type found: "+typeof e),typeof t=="object"&&".value"in t&&t[".value"]!==null&&(t=t[".value"]),typeof t!="object"||".sv"in t){const n=t;return new de(n,Z(e))}if(!(t instanceof Array)&&mT){const n=[];let s=!1;if(ge(t,(o,a)=>{if(o.substring(0,1)!=="."){const c=Z(a);c.isEmpty()||(s=s||!c.getPriority().isEmpty(),n.push(new L(o,c)))}}),n.length===0)return E.EMPTY_NODE;const i=Di(n,cT,o=>o.name,rl);if(s){const o=Di(n,Q.getCompare());return new E(i,Z(e),new _t({".priority":o},{".priority":Q}))}else return new E(i,Z(e),_t.Default)}else{let n=E.EMPTY_NODE;return ge(t,(s,r)=>{if(pt(t,s)&&s.substring(0,1)!=="."){const i=Z(r);(i.isLeafNode()||!i.isEmpty())&&(n=n.updateImmediateChild(s,i))}}),n.updatePriority(Z(e))}}uT(Z);/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class _T extends Eo{constructor(e){super(),this.indexPath_=e,g(!P(e)&&N(e)!==".priority","Can't create PathIndex with empty path or .priority key")}extractChild(e){return e.getChild(this.indexPath_)}isDefinedOn(e){return!e.getChild(this.indexPath_).isEmpty()}compare(e,n){const s=this.extractChild(e.node),r=this.extractChild(n.node),i=s.compareTo(r);return i===0?jn(e.name,n.name):i}makePost(e,n){const s=Z(e),r=E.EMPTY_NODE.updateChild(this.indexPath_,s);return new L(n,r)}maxPost(){const e=E.EMPTY_NODE.updateChild(this.indexPath_,Hr);return new L(Ln,e)}toString(){return vr(this.indexPath_,0).join("/")}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class yT extends Eo{compare(e,n){const s=e.node.compareTo(n.node);return s===0?jn(e.name,n.name):s}isDefinedOn(e){return!0}indexedValueChanged(e,n){return!e.equals(n)}minPost(){return L.MIN}maxPost(){return L.MAX}makePost(e,n){const s=Z(e);return new L(n,s)}toString(){return".value"}}const vT=new yT;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function jp(t){return{type:"value",snapshotNode:t}}function ys(t,e){return{type:"child_added",snapshotNode:e,childName:t}}function Er(t,e){return{type:"child_removed",snapshotNode:e,childName:t}}function wr(t,e,n){return{type:"child_changed",snapshotNode:e,childName:t,oldSnap:n}}function ET(t,e){return{type:"child_moved",snapshotNode:e,childName:t}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class il{constructor(e){this.index_=e}updateChild(e,n,s,r,i,o){g(e.isIndexed(this.index_),"A node must be indexed if only a child is updated");const a=e.getImmediateChild(n);return a.getChild(r).equals(s.getChild(r))&&a.isEmpty()===s.isEmpty()||(o!=null&&(s.isEmpty()?e.hasChild(n)?o.trackChildChange(Er(n,a)):g(e.isLeafNode(),"A child remove without an old child only makes sense on a leaf node"):a.isEmpty()?o.trackChildChange(ys(n,s)):o.trackChildChange(wr(n,s,a))),e.isLeafNode()&&s.isEmpty())?e:e.updateImmediateChild(n,s).withIndex(this.index_)}updateFullNode(e,n,s){return s!=null&&(e.isLeafNode()||e.forEachChild(Q,(r,i)=>{n.hasChild(r)||s.trackChildChange(Er(r,i))}),n.isLeafNode()||n.forEachChild(Q,(r,i)=>{if(e.hasChild(r)){const o=e.getImmediateChild(r);o.equals(i)||s.trackChildChange(wr(r,i,o))}else s.trackChildChange(ys(r,i))})),n.withIndex(this.index_)}updatePriority(e,n){return e.isEmpty()?E.EMPTY_NODE:e.updatePriority(n)}filtersNodes(){return!1}getIndexedFilter(){return this}getIndex(){return this.index_}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class br{constructor(e){this.indexedFilter_=new il(e.getIndex()),this.index_=e.getIndex(),this.startPost_=br.getStartPost_(e),this.endPost_=br.getEndPost_(e),this.startIsInclusive_=!e.startAfterSet_,this.endIsInclusive_=!e.endBeforeSet_}getStartPost(){return this.startPost_}getEndPost(){return this.endPost_}matches(e){const n=this.startIsInclusive_?this.index_.compare(this.getStartPost(),e)<=0:this.index_.compare(this.getStartPost(),e)<0,s=this.endIsInclusive_?this.index_.compare(e,this.getEndPost())<=0:this.index_.compare(e,this.getEndPost())<0;return n&&s}updateChild(e,n,s,r,i,o){return this.matches(new L(n,s))||(s=E.EMPTY_NODE),this.indexedFilter_.updateChild(e,n,s,r,i,o)}updateFullNode(e,n,s){n.isLeafNode()&&(n=E.EMPTY_NODE);let r=n.withIndex(this.index_);r=r.updatePriority(E.EMPTY_NODE);const i=this;return n.forEachChild(Q,(o,a)=>{i.matches(new L(o,a))||(r=r.updateImmediateChild(o,E.EMPTY_NODE))}),this.indexedFilter_.updateFullNode(e,r,s)}updatePriority(e,n){return e}filtersNodes(){return!0}getIndexedFilter(){return this.indexedFilter_}getIndex(){return this.index_}static getStartPost_(e){if(e.hasStart()){const n=e.getIndexStartName();return e.getIndex().makePost(e.getIndexStartValue(),n)}else return e.getIndex().minPost()}static getEndPost_(e){if(e.hasEnd()){const n=e.getIndexEndName();return e.getIndex().makePost(e.getIndexEndValue(),n)}else return e.getIndex().maxPost()}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class wT{constructor(e){this.withinDirectionalStart=n=>this.reverse_?this.withinEndPost(n):this.withinStartPost(n),this.withinDirectionalEnd=n=>this.reverse_?this.withinStartPost(n):this.withinEndPost(n),this.withinStartPost=n=>{const s=this.index_.compare(this.rangedFilter_.getStartPost(),n);return this.startIsInclusive_?s<=0:s<0},this.withinEndPost=n=>{const s=this.index_.compare(n,this.rangedFilter_.getEndPost());return this.endIsInclusive_?s<=0:s<0},this.rangedFilter_=new br(e),this.index_=e.getIndex(),this.limit_=e.getLimit(),this.reverse_=!e.isViewFromLeft(),this.startIsInclusive_=!e.startAfterSet_,this.endIsInclusive_=!e.endBeforeSet_}updateChild(e,n,s,r,i,o){return this.rangedFilter_.matches(new L(n,s))||(s=E.EMPTY_NODE),e.getImmediateChild(n).equals(s)?e:e.numChildren()<this.limit_?this.rangedFilter_.getIndexedFilter().updateChild(e,n,s,r,i,o):this.fullLimitUpdateChild_(e,n,s,i,o)}updateFullNode(e,n,s){let r;if(n.isLeafNode()||n.isEmpty())r=E.EMPTY_NODE.withIndex(this.index_);else if(this.limit_*2<n.numChildren()&&n.isIndexed(this.index_)){r=E.EMPTY_NODE.withIndex(this.index_);let i;this.reverse_?i=n.getReverseIteratorFrom(this.rangedFilter_.getEndPost(),this.index_):i=n.getIteratorFrom(this.rangedFilter_.getStartPost(),this.index_);let o=0;for(;i.hasNext()&&o<this.limit_;){const a=i.getNext();if(this.withinDirectionalStart(a))if(this.withinDirectionalEnd(a))r=r.updateImmediateChild(a.name,a.node),o++;else break;else continue}}else{r=n.withIndex(this.index_),r=r.updatePriority(E.EMPTY_NODE);let i;this.reverse_?i=r.getReverseIterator(this.index_):i=r.getIterator(this.index_);let o=0;for(;i.hasNext();){const a=i.getNext();o<this.limit_&&this.withinDirectionalStart(a)&&this.withinDirectionalEnd(a)?o++:r=r.updateImmediateChild(a.name,E.EMPTY_NODE)}}return this.rangedFilter_.getIndexedFilter().updateFullNode(e,r,s)}updatePriority(e,n){return e}filtersNodes(){return!0}getIndexedFilter(){return this.rangedFilter_.getIndexedFilter()}getIndex(){return this.index_}fullLimitUpdateChild_(e,n,s,r,i){let o;if(this.reverse_){const d=this.index_.getCompare();o=(h,f)=>d(f,h)}else o=this.index_.getCompare();const a=e;g(a.numChildren()===this.limit_,"");const c=new L(n,s),l=this.reverse_?a.getFirstChild(this.index_):a.getLastChild(this.index_),u=this.rangedFilter_.matches(c);if(a.hasChild(n)){const d=a.getImmediateChild(n);let h=r.getChildAfterChild(this.index_,l,this.reverse_);for(;h!=null&&(h.name===n||a.hasChild(h.name));)h=r.getChildAfterChild(this.index_,h,this.reverse_);const f=h==null?1:o(h,c);if(u&&!s.isEmpty()&&f>=0)return i?.trackChildChange(wr(n,s,d)),a.updateImmediateChild(n,s);{i?.trackChildChange(Er(n,d));const _=a.updateImmediateChild(n,E.EMPTY_NODE);return h!=null&&this.rangedFilter_.matches(h)?(i?.trackChildChange(ys(h.name,h.node)),_.updateImmediateChild(h.name,h.node)):_}}else return s.isEmpty()?e:u&&o(l,c)>=0?(i!=null&&(i.trackChildChange(Er(l.name,l.node)),i.trackChildChange(ys(n,s))),a.updateImmediateChild(n,s).updateImmediateChild(l.name,E.EMPTY_NODE)):e}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class wo{constructor(){this.limitSet_=!1,this.startSet_=!1,this.startNameSet_=!1,this.startAfterSet_=!1,this.endSet_=!1,this.endNameSet_=!1,this.endBeforeSet_=!1,this.limit_=0,this.viewFrom_="",this.indexStartValue_=null,this.indexStartName_="",this.indexEndValue_=null,this.indexEndName_="",this.index_=Q}hasStart(){return this.startSet_}isViewFromLeft(){return this.viewFrom_===""?this.startSet_:this.viewFrom_==="l"}getIndexStartValue(){return g(this.startSet_,"Only valid if start has been set"),this.indexStartValue_}getIndexStartName(){return g(this.startSet_,"Only valid if start has been set"),this.startNameSet_?this.indexStartName_:_s}hasEnd(){return this.endSet_}getIndexEndValue(){return g(this.endSet_,"Only valid if end has been set"),this.indexEndValue_}getIndexEndName(){return g(this.endSet_,"Only valid if end has been set"),this.endNameSet_?this.indexEndName_:Ln}hasLimit(){return this.limitSet_}hasAnchoredLimit(){return this.limitSet_&&this.viewFrom_!==""}getLimit(){return g(this.limitSet_,"Only valid if limit has been set"),this.limit_}getIndex(){return this.index_}loadsAllData(){return!(this.startSet_||this.endSet_||this.limitSet_)}isDefault(){return this.loadsAllData()&&this.index_===Q}copy(){const e=new wo;return e.limitSet_=this.limitSet_,e.limit_=this.limit_,e.startSet_=this.startSet_,e.startAfterSet_=this.startAfterSet_,e.indexStartValue_=this.indexStartValue_,e.startNameSet_=this.startNameSet_,e.indexStartName_=this.indexStartName_,e.endSet_=this.endSet_,e.endBeforeSet_=this.endBeforeSet_,e.indexEndValue_=this.indexEndValue_,e.endNameSet_=this.endNameSet_,e.indexEndName_=this.indexEndName_,e.index_=this.index_,e.viewFrom_=this.viewFrom_,e}}function bT(t){return t.loadsAllData()?new il(t.getIndex()):t.hasLimit()?new wT(t):new br(t)}function Yd(t){const e={};if(t.isDefault())return e;let n;if(t.index_===Q?n="$priority":t.index_===vT?n="$value":t.index_===Zn?n="$key":(g(t.index_ instanceof _T,"Unrecognized index type!"),n=t.index_.toString()),e.orderBy=ae(n),t.startSet_){const s=t.startAfterSet_?"startAfter":"startAt";e[s]=ae(t.indexStartValue_),t.startNameSet_&&(e[s]+=","+ae(t.indexStartName_))}if(t.endSet_){const s=t.endBeforeSet_?"endBefore":"endAt";e[s]=ae(t.indexEndValue_),t.endNameSet_&&(e[s]+=","+ae(t.indexEndName_))}return t.limitSet_&&(t.isViewFromLeft()?e.limitToFirst=t.limit_:e.limitToLast=t.limit_),e}function Kd(t){const e={};if(t.startSet_&&(e.sp=t.indexStartValue_,t.startNameSet_&&(e.sn=t.indexStartName_),e.sin=!t.startAfterSet_),t.endSet_&&(e.ep=t.indexEndValue_,t.endNameSet_&&(e.en=t.indexEndName_),e.ein=!t.endBeforeSet_),t.limitSet_){e.l=t.limit_;let n=t.viewFrom_;n===""&&(t.isViewFromLeft()?n="l":n="r"),e.vf=n}return t.index_!==Q&&(e.i=t.index_.toString()),e}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class xi extends xp{reportStats(e){throw new Error("Method not implemented.")}static getListenId_(e,n){return n!==void 0?"tag$"+n:(g(e._queryParams.isDefault(),"should have a tag if it's not a default query."),e._path.toString())}constructor(e,n,s,r){super(),this.repoInfo_=e,this.onDataUpdate_=n,this.authTokenProvider_=s,this.appCheckTokenProvider_=r,this.log_=Br("p:rest:"),this.listens_={}}listen(e,n,s,r){const i=e._path.toString();this.log_("Listen called for "+i+" "+e._queryIdentifier);const o=xi.getListenId_(e,s),a={};this.listens_[o]=a;const c=Yd(e._queryParams);this.restRequest_(i+".json",c,(l,u)=>{let d=u;if(l===404&&(d=null,l=null),l===null&&this.onDataUpdate_(i,d,!1,s),gs(this.listens_,o)===a){let h;l?l===401?h="permission_denied":h="rest_error:"+l:h="ok",r(h,null)}})}unlisten(e,n){const s=xi.getListenId_(e,n);delete this.listens_[s]}get(e){const n=Yd(e._queryParams),s=e._path.toString(),r=new Ne;return this.restRequest_(s+".json",n,(i,o)=>{let a=o;i===404&&(a=null,i=null),i===null?(this.onDataUpdate_(s,a,!1,null),r.resolve(a)):r.reject(new Error(a))}),r.promise}refreshAuthToken(e){}restRequest_(e,n={},s){return n.format="export",Promise.all([this.authTokenProvider_.getToken(!1),this.appCheckTokenProvider_.getToken(!1)]).then(([r,i])=>{r&&r.accessToken&&(n.auth=r.accessToken),i&&i.token&&(n.ac=i.token);const o=(this.repoInfo_.secure?"https://":"http://")+this.repoInfo_.host+e+"?ns="+this.repoInfo_.namespace+Ls(n);this.log_("Sending REST request for "+o);const a=new XMLHttpRequest;a.onreadystatechange=()=>{if(s&&a.readyState===4){this.log_("REST Response for "+o+" received. status:",a.status,"response:",a.responseText);let c=null;if(a.status>=200&&a.status<300){try{c=mr(a.responseText)}catch{ke("Failed to parse JSON response for "+o+": "+a.responseText)}s(null,c)}else a.status!==401&&a.status!==404&&ke("Got unsuccessful REST response for "+o+" Status: "+a.status),s(a.status);s=null}},a.open("GET",o,!0),a.send()})}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class CT{constructor(){this.rootNode_=E.EMPTY_NODE}getNode(e){return this.rootNode_.getChild(e)}updateSnapshot(e,n){this.rootNode_=this.rootNode_.updateChild(e,n)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Mi(){return{value:null,children:new Map}}function xs(t,e,n){if(P(e))t.value=n,t.children.clear();else if(t.value!==null)t.value=t.value.updateChild(e,n);else{const s=N(e);t.children.has(s)||t.children.set(s,Mi());const r=t.children.get(s);e=j(e),xs(r,e,n)}}function Za(t,e){if(P(e))return t.value=null,t.children.clear(),!0;if(t.value!==null){if(t.value.isLeafNode())return!1;{const n=t.value;return t.value=null,n.forEachChild(Q,(s,r)=>{xs(t,new H(s),r)}),Za(t,e)}}else if(t.children.size>0){const n=N(e);return e=j(e),t.children.has(n)&&Za(t.children.get(n),e)&&t.children.delete(n),t.children.size===0}else return!0}function ec(t,e,n){t.value!==null?n(e,t.value):ST(t,(s,r)=>{const i=new H(e.toString()+"/"+s);ec(r,i,n)})}function ST(t,e){t.children.forEach((n,s)=>{e(s,n)})}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class TT{constructor(e){this.collection_=e,this.last_=null}get(){const e=this.collection_.get(),n={...e};return this.last_&&ge(this.last_,(s,r)=>{n[s]=n[s]-r}),this.last_=e,n}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Jd=10*1e3,IT=30*1e3,kT=300*1e3;class RT{constructor(e,n){this.server_=n,this.statsToReport_={},this.statsListener_=new TT(e);const s=Jd+(IT-Jd)*Math.random();tr(this.reportStats_.bind(this),Math.floor(s))}reportStats_(){const e=this.statsListener_.get(),n={};let s=!1;ge(e,(r,i)=>{i>0&&pt(this.statsToReport_,r)&&(n[r]=i,s=!0)}),s&&this.server_.reportStats(n),tr(this.reportStats_.bind(this),Math.floor(Math.random()*2*kT))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var Ke;(function(t){t[t.OVERWRITE=0]="OVERWRITE",t[t.MERGE=1]="MERGE",t[t.ACK_USER_WRITE=2]="ACK_USER_WRITE",t[t.LISTEN_COMPLETE=3]="LISTEN_COMPLETE"})(Ke||(Ke={}));function ol(){return{fromUser:!0,fromServer:!1,queryId:null,tagged:!1}}function al(){return{fromUser:!1,fromServer:!0,queryId:null,tagged:!1}}function cl(t){return{fromUser:!1,fromServer:!0,queryId:t,tagged:!0}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Fi{constructor(e,n,s){this.path=e,this.affectedTree=n,this.revert=s,this.type=Ke.ACK_USER_WRITE,this.source=ol()}operationForChild(e){if(P(this.path)){if(this.affectedTree.value!=null)return g(this.affectedTree.children.isEmpty(),"affectedTree should not have overlapping affected paths."),this;{const n=this.affectedTree.subtree(new H(e));return new Fi(U(),n,this.revert)}}else return g(N(this.path)===e,"operationForChild called for unrelated child."),new Fi(j(this.path),this.affectedTree,this.revert)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Cr{constructor(e,n){this.source=e,this.path=n,this.type=Ke.LISTEN_COMPLETE}operationForChild(e){return P(this.path)?new Cr(this.source,U()):new Cr(this.source,j(this.path))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class On{constructor(e,n,s){this.source=e,this.path=n,this.snap=s,this.type=Ke.OVERWRITE}operationForChild(e){return P(this.path)?new On(this.source,U(),this.snap.getImmediateChild(e)):new On(this.source,j(this.path),this.snap)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class vs{constructor(e,n,s){this.source=e,this.path=n,this.children=s,this.type=Ke.MERGE}operationForChild(e){if(P(this.path)){const n=this.children.subtree(new H(e));return n.isEmpty()?null:n.value?new On(this.source,U(),n.value):new vs(this.source,U(),n)}else return g(N(this.path)===e,"Can't get a merge for a child not on the path of the operation"),new vs(this.source,j(this.path),this.children)}toString(){return"Operation("+this.path+": "+this.source.toString()+" merge: "+this.children.toString()+")"}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class sn{constructor(e,n,s){this.node_=e,this.fullyInitialized_=n,this.filtered_=s}isFullyInitialized(){return this.fullyInitialized_}isFiltered(){return this.filtered_}isCompleteForPath(e){if(P(e))return this.isFullyInitialized()&&!this.filtered_;const n=N(e);return this.isCompleteForChild(n)}isCompleteForChild(e){return this.isFullyInitialized()&&!this.filtered_||this.node_.hasChild(e)}getNode(){return this.node_}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class AT{constructor(e){this.query_=e,this.index_=this.query_._queryParams.getIndex()}}function NT(t,e,n,s){const r=[],i=[];return e.forEach(o=>{o.type==="child_changed"&&t.index_.indexedValueChanged(o.oldSnap,o.snapshotNode)&&i.push(ET(o.childName,o.snapshotNode))}),Gs(t,r,"child_removed",e,s,n),Gs(t,r,"child_added",e,s,n),Gs(t,r,"child_moved",i,s,n),Gs(t,r,"child_changed",e,s,n),Gs(t,r,"value",e,s,n),r}function Gs(t,e,n,s,r,i){const o=s.filter(a=>a.type===n);o.sort((a,c)=>LT(t,a,c)),o.forEach(a=>{const c=PT(t,a,i);r.forEach(l=>{l.respondsTo(a.type)&&e.push(l.createEvent(c,t.query_))})})}function PT(t,e,n){return e.type==="value"||e.type==="child_removed"||(e.prevName=n.getPredecessorChildName(e.childName,e.snapshotNode,t.index_)),e}function LT(t,e,n){if(e.childName==null||n.childName==null)throw As("Should only compare child_ events.");const s=new L(e.childName,e.snapshotNode),r=new L(n.childName,n.snapshotNode);return t.index_.compare(s,r)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function bo(t,e){return{eventCache:t,serverCache:e}}function nr(t,e,n,s){return bo(new sn(e,n,s),t.serverCache)}function qp(t,e,n,s){return bo(t.eventCache,new sn(e,n,s))}function Ui(t){return t.eventCache.isFullyInitialized()?t.eventCache.getNode():null}function Dn(t){return t.serverCache.isFullyInitialized()?t.serverCache.getNode():null}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let ha;const OT=()=>(ha||(ha=new Pe(_S)),ha);class G{static fromObject(e){let n=new G(null);return ge(e,(s,r)=>{n=n.set(new H(s),r)}),n}constructor(e,n=OT()){this.value=e,this.children=n}isEmpty(){return this.value===null&&this.children.isEmpty()}findRootMostMatchingPathAndValue(e,n){if(this.value!=null&&n(this.value))return{path:U(),value:this.value};if(P(e))return null;{const s=N(e),r=this.children.get(s);if(r!==null){const i=r.findRootMostMatchingPathAndValue(j(e),n);return i!=null?{path:X(new H(s),i.path),value:i.value}:null}else return null}}findRootMostValueAndPath(e){return this.findRootMostMatchingPathAndValue(e,()=>!0)}subtree(e){if(P(e))return this;{const n=N(e),s=this.children.get(n);return s!==null?s.subtree(j(e)):new G(null)}}set(e,n){if(P(e))return new G(n,this.children);{const s=N(e),i=(this.children.get(s)||new G(null)).set(j(e),n),o=this.children.insert(s,i);return new G(this.value,o)}}remove(e){if(P(e))return this.children.isEmpty()?new G(null):new G(null,this.children);{const n=N(e),s=this.children.get(n);if(s){const r=s.remove(j(e));let i;return r.isEmpty()?i=this.children.remove(n):i=this.children.insert(n,r),this.value===null&&i.isEmpty()?new G(null):new G(this.value,i)}else return this}}get(e){if(P(e))return this.value;{const n=N(e),s=this.children.get(n);return s?s.get(j(e)):null}}setTree(e,n){if(P(e))return n;{const s=N(e),i=(this.children.get(s)||new G(null)).setTree(j(e),n);let o;return i.isEmpty()?o=this.children.remove(s):o=this.children.insert(s,i),new G(this.value,o)}}fold(e){return this.fold_(U(),e)}fold_(e,n){const s={};return this.children.inorderTraversal((r,i)=>{s[r]=i.fold_(X(e,r),n)}),n(e,this.value,s)}findOnPath(e,n){return this.findOnPath_(e,U(),n)}findOnPath_(e,n,s){const r=this.value?s(n,this.value):!1;if(r)return r;if(P(e))return null;{const i=N(e),o=this.children.get(i);return o?o.findOnPath_(j(e),X(n,i),s):null}}foreachOnPath(e,n){return this.foreachOnPath_(e,U(),n)}foreachOnPath_(e,n,s){if(P(e))return this;{this.value&&s(n,this.value);const r=N(e),i=this.children.get(r);return i?i.foreachOnPath_(j(e),X(n,r),s):new G(null)}}foreach(e){this.foreach_(U(),e)}foreach_(e,n){this.children.inorderTraversal((s,r)=>{r.foreach_(X(e,s),n)}),this.value&&n(e,this.value)}foreachChild(e){this.children.inorderTraversal((n,s)=>{s.value&&e(n,s.value)})}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ze{constructor(e){this.writeTree_=e}static empty(){return new Ze(new G(null))}}function sr(t,e,n){if(P(e))return new Ze(new G(n));{const s=t.writeTree_.findRootMostValueAndPath(e);if(s!=null){const r=s.path;let i=s.value;const o=Te(r,e);return i=i.updateChild(o,n),new Ze(t.writeTree_.set(r,i))}else{const r=new G(n),i=t.writeTree_.setTree(e,r);return new Ze(i)}}}function tc(t,e,n){let s=t;return ge(n,(r,i)=>{s=sr(s,X(e,r),i)}),s}function Xd(t,e){if(P(e))return Ze.empty();{const n=t.writeTree_.setTree(e,new G(null));return new Ze(n)}}function nc(t,e){return qn(t,e)!=null}function qn(t,e){const n=t.writeTree_.findRootMostValueAndPath(e);return n!=null?t.writeTree_.get(n.path).getChild(Te(n.path,e)):null}function Qd(t){const e=[],n=t.writeTree_.value;return n!=null?n.isLeafNode()||n.forEachChild(Q,(s,r)=>{e.push(new L(s,r))}):t.writeTree_.children.inorderTraversal((s,r)=>{r.value!=null&&e.push(new L(s,r.value))}),e}function Kt(t,e){if(P(e))return t;{const n=qn(t,e);return n!=null?new Ze(new G(n)):new Ze(t.writeTree_.subtree(e))}}function sc(t){return t.writeTree_.isEmpty()}function Es(t,e){return zp(U(),t.writeTree_,e)}function zp(t,e,n){if(e.value!=null)return n.updateChild(t,e.value);{let s=null;return e.children.inorderTraversal((r,i)=>{r===".priority"?(g(i.value!==null,"Priority writes must always be leaf nodes"),s=i.value):n=zp(X(t,r),i,n)}),!n.getChild(t).isEmpty()&&s!==null&&(n=n.updateChild(X(t,".priority"),s)),n}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Co(t,e){return Jp(e,t)}function DT(t,e,n,s,r){g(s>t.lastWriteId,"Stacking an older write on top of newer ones"),r===void 0&&(r=!0),t.allWrites.push({path:e,snap:n,writeId:s,visible:r}),r&&(t.visibleWrites=sr(t.visibleWrites,e,n)),t.lastWriteId=s}function xT(t,e,n,s){g(s>t.lastWriteId,"Stacking an older merge on top of newer ones"),t.allWrites.push({path:e,children:n,writeId:s,visible:!0}),t.visibleWrites=tc(t.visibleWrites,e,n),t.lastWriteId=s}function MT(t,e){for(let n=0;n<t.allWrites.length;n++){const s=t.allWrites[n];if(s.writeId===e)return s}return null}function FT(t,e){const n=t.allWrites.findIndex(a=>a.writeId===e);g(n>=0,"removeWrite called with nonexistent writeId.");const s=t.allWrites[n];t.allWrites.splice(n,1);let r=s.visible,i=!1,o=t.allWrites.length-1;for(;r&&o>=0;){const a=t.allWrites[o];a.visible&&(o>=n&&UT(a,s.path)?r=!1:Ue(s.path,a.path)&&(i=!0)),o--}if(r){if(i)return $T(t),!0;if(s.snap)t.visibleWrites=Xd(t.visibleWrites,s.path);else{const a=s.children;ge(a,c=>{t.visibleWrites=Xd(t.visibleWrites,X(s.path,c))})}return!0}else return!1}function UT(t,e){if(t.snap)return Ue(t.path,e);for(const n in t.children)if(t.children.hasOwnProperty(n)&&Ue(X(t.path,n),e))return!0;return!1}function $T(t){t.visibleWrites=Gp(t.allWrites,BT,U()),t.allWrites.length>0?t.lastWriteId=t.allWrites[t.allWrites.length-1].writeId:t.lastWriteId=-1}function BT(t){return t.visible}function Gp(t,e,n){let s=Ze.empty();for(let r=0;r<t.length;++r){const i=t[r];if(e(i)){const o=i.path;let a;if(i.snap)Ue(n,o)?(a=Te(n,o),s=sr(s,a,i.snap)):Ue(o,n)&&(a=Te(o,n),s=sr(s,U(),i.snap.getChild(a)));else if(i.children){if(Ue(n,o))a=Te(n,o),s=tc(s,a,i.children);else if(Ue(o,n))if(a=Te(o,n),P(a))s=tc(s,U(),i.children);else{const c=gs(i.children,N(a));if(c){const l=c.getChild(j(a));s=sr(s,U(),l)}}}else throw As("WriteRecord should have .snap or .children")}}return s}function Yp(t,e,n,s,r){if(!s&&!r){const i=qn(t.visibleWrites,e);if(i!=null)return i;{const o=Kt(t.visibleWrites,e);if(sc(o))return n;if(n==null&&!nc(o,U()))return null;{const a=n||E.EMPTY_NODE;return Es(o,a)}}}else{const i=Kt(t.visibleWrites,e);if(!r&&sc(i))return n;if(!r&&n==null&&!nc(i,U()))return null;{const o=function(l){return(l.visible||r)&&(!s||!~s.indexOf(l.writeId))&&(Ue(l.path,e)||Ue(e,l.path))},a=Gp(t.allWrites,o,e),c=n||E.EMPTY_NODE;return Es(a,c)}}}function HT(t,e,n){let s=E.EMPTY_NODE;const r=qn(t.visibleWrites,e);if(r)return r.isLeafNode()||r.forEachChild(Q,(i,o)=>{s=s.updateImmediateChild(i,o)}),s;if(n){const i=Kt(t.visibleWrites,e);return n.forEachChild(Q,(o,a)=>{const c=Es(Kt(i,new H(o)),a);s=s.updateImmediateChild(o,c)}),Qd(i).forEach(o=>{s=s.updateImmediateChild(o.name,o.node)}),s}else{const i=Kt(t.visibleWrites,e);return Qd(i).forEach(o=>{s=s.updateImmediateChild(o.name,o.node)}),s}}function WT(t,e,n,s,r){g(s||r,"Either existingEventSnap or existingServerSnap must exist");const i=X(e,n);if(nc(t.visibleWrites,i))return null;{const o=Kt(t.visibleWrites,i);return sc(o)?r.getChild(n):Es(o,r.getChild(n))}}function VT(t,e,n,s){const r=X(e,n),i=qn(t.visibleWrites,r);if(i!=null)return i;if(s.isCompleteForChild(n)){const o=Kt(t.visibleWrites,r);return Es(o,s.getNode().getImmediateChild(n))}else return null}function jT(t,e){return qn(t.visibleWrites,e)}function qT(t,e,n,s,r,i,o){let a;const c=Kt(t.visibleWrites,e),l=qn(c,U());if(l!=null)a=l;else if(n!=null)a=Es(c,n);else return[];if(a=a.withIndex(o),!a.isEmpty()&&!a.isLeafNode()){const u=[],d=o.getCompare(),h=i?a.getReverseIteratorFrom(s,o):a.getIteratorFrom(s,o);let f=h.getNext();for(;f&&u.length<r;)d(f,s)!==0&&u.push(f),f=h.getNext();return u}else return[]}function zT(){return{visibleWrites:Ze.empty(),allWrites:[],lastWriteId:-1}}function $i(t,e,n,s){return Yp(t.writeTree,t.treePath,e,n,s)}function ll(t,e){return HT(t.writeTree,t.treePath,e)}function Zd(t,e,n,s){return WT(t.writeTree,t.treePath,e,n,s)}function Bi(t,e){return jT(t.writeTree,X(t.treePath,e))}function GT(t,e,n,s,r,i){return qT(t.writeTree,t.treePath,e,n,s,r,i)}function ul(t,e,n){return VT(t.writeTree,t.treePath,e,n)}function Kp(t,e){return Jp(X(t.treePath,e),t.writeTree)}function Jp(t,e){return{treePath:t,writeTree:e}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class YT{constructor(){this.changeMap=new Map}trackChildChange(e){const n=e.type,s=e.childName;g(n==="child_added"||n==="child_changed"||n==="child_removed","Only child changes supported for tracking"),g(s!==".priority","Only non-priority child changes can be tracked.");const r=this.changeMap.get(s);if(r){const i=r.type;if(n==="child_added"&&i==="child_removed")this.changeMap.set(s,wr(s,e.snapshotNode,r.snapshotNode));else if(n==="child_removed"&&i==="child_added")this.changeMap.delete(s);else if(n==="child_removed"&&i==="child_changed")this.changeMap.set(s,Er(s,r.oldSnap));else if(n==="child_changed"&&i==="child_added")this.changeMap.set(s,ys(s,e.snapshotNode));else if(n==="child_changed"&&i==="child_changed")this.changeMap.set(s,wr(s,e.snapshotNode,r.oldSnap));else throw As("Illegal combination of changes: "+e+" occurred after "+r)}else this.changeMap.set(s,e)}getChanges(){return Array.from(this.changeMap.values())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class KT{getCompleteChild(e){return null}getChildAfterChild(e,n,s){return null}}const Xp=new KT;class dl{constructor(e,n,s=null){this.writes_=e,this.viewCache_=n,this.optCompleteServerCache_=s}getCompleteChild(e){const n=this.viewCache_.eventCache;if(n.isCompleteForChild(e))return n.getNode().getImmediateChild(e);{const s=this.optCompleteServerCache_!=null?new sn(this.optCompleteServerCache_,!0,!1):this.viewCache_.serverCache;return ul(this.writes_,e,s)}}getChildAfterChild(e,n,s){const r=this.optCompleteServerCache_!=null?this.optCompleteServerCache_:Dn(this.viewCache_),i=GT(this.writes_,r,n,1,s,e);return i.length===0?null:i[0]}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function JT(t){return{filter:t}}function XT(t,e){g(e.eventCache.getNode().isIndexed(t.filter.getIndex()),"Event snap not indexed"),g(e.serverCache.getNode().isIndexed(t.filter.getIndex()),"Server snap not indexed")}function QT(t,e,n,s,r){const i=new YT;let o,a;if(n.type===Ke.OVERWRITE){const l=n;l.source.fromUser?o=rc(t,e,l.path,l.snap,s,r,i):(g(l.source.fromServer,"Unknown source."),a=l.source.tagged||e.serverCache.isFiltered()&&!P(l.path),o=Hi(t,e,l.path,l.snap,s,r,a,i))}else if(n.type===Ke.MERGE){const l=n;l.source.fromUser?o=eI(t,e,l.path,l.children,s,r,i):(g(l.source.fromServer,"Unknown source."),a=l.source.tagged||e.serverCache.isFiltered(),o=ic(t,e,l.path,l.children,s,r,a,i))}else if(n.type===Ke.ACK_USER_WRITE){const l=n;l.revert?o=sI(t,e,l.path,s,r,i):o=tI(t,e,l.path,l.affectedTree,s,r,i)}else if(n.type===Ke.LISTEN_COMPLETE)o=nI(t,e,n.path,s,i);else throw As("Unknown operation type: "+n.type);const c=i.getChanges();return ZT(e,o,c),{viewCache:o,changes:c}}function ZT(t,e,n){const s=e.eventCache;if(s.isFullyInitialized()){const r=s.getNode().isLeafNode()||s.getNode().isEmpty(),i=Ui(t);(n.length>0||!t.eventCache.isFullyInitialized()||r&&!s.getNode().equals(i)||!s.getNode().getPriority().equals(i.getPriority()))&&n.push(jp(Ui(e)))}}function Qp(t,e,n,s,r,i){const o=e.eventCache;if(Bi(s,n)!=null)return e;{let a,c;if(P(n))if(g(e.serverCache.isFullyInitialized(),"If change path is empty, we must have complete server data"),e.serverCache.isFiltered()){const l=Dn(e),u=l instanceof E?l:E.EMPTY_NODE,d=ll(s,u);a=t.filter.updateFullNode(e.eventCache.getNode(),d,i)}else{const l=$i(s,Dn(e));a=t.filter.updateFullNode(e.eventCache.getNode(),l,i)}else{const l=N(n);if(l===".priority"){g(nn(n)===1,"Can't have a priority with additional path components");const u=o.getNode();c=e.serverCache.getNode();const d=Zd(s,n,u,c);d!=null?a=t.filter.updatePriority(u,d):a=o.getNode()}else{const u=j(n);let d;if(o.isCompleteForChild(l)){c=e.serverCache.getNode();const h=Zd(s,n,o.getNode(),c);h!=null?d=o.getNode().getImmediateChild(l).updateChild(u,h):d=o.getNode().getImmediateChild(l)}else d=ul(s,l,e.serverCache);d!=null?a=t.filter.updateChild(o.getNode(),l,d,u,r,i):a=o.getNode()}}return nr(e,a,o.isFullyInitialized()||P(n),t.filter.filtersNodes())}}function Hi(t,e,n,s,r,i,o,a){const c=e.serverCache;let l;const u=o?t.filter:t.filter.getIndexedFilter();if(P(n))l=u.updateFullNode(c.getNode(),s,null);else if(u.filtersNodes()&&!c.isFiltered()){const f=c.getNode().updateChild(n,s);l=u.updateFullNode(c.getNode(),f,null)}else{const f=N(n);if(!c.isCompleteForPath(n)&&nn(n)>1)return e;const p=j(n),m=c.getNode().getImmediateChild(f).updateChild(p,s);f===".priority"?l=u.updatePriority(c.getNode(),m):l=u.updateChild(c.getNode(),f,m,p,Xp,null)}const d=qp(e,l,c.isFullyInitialized()||P(n),u.filtersNodes()),h=new dl(r,d,i);return Qp(t,d,n,r,h,a)}function rc(t,e,n,s,r,i,o){const a=e.eventCache;let c,l;const u=new dl(r,e,i);if(P(n))l=t.filter.updateFullNode(e.eventCache.getNode(),s,o),c=nr(e,l,!0,t.filter.filtersNodes());else{const d=N(n);if(d===".priority")l=t.filter.updatePriority(e.eventCache.getNode(),s),c=nr(e,l,a.isFullyInitialized(),a.isFiltered());else{const h=j(n),f=a.getNode().getImmediateChild(d);let p;if(P(h))p=s;else{const _=u.getCompleteChild(d);_!=null?tl(h)===".priority"&&_.getChild(Fp(h)).isEmpty()?p=_:p=_.updateChild(h,s):p=E.EMPTY_NODE}if(f.equals(p))c=e;else{const _=t.filter.updateChild(a.getNode(),d,p,h,u,o);c=nr(e,_,a.isFullyInitialized(),t.filter.filtersNodes())}}}return c}function eh(t,e){return t.eventCache.isCompleteForChild(e)}function eI(t,e,n,s,r,i,o){let a=e;return s.foreach((c,l)=>{const u=X(n,c);eh(e,N(u))&&(a=rc(t,a,u,l,r,i,o))}),s.foreach((c,l)=>{const u=X(n,c);eh(e,N(u))||(a=rc(t,a,u,l,r,i,o))}),a}function th(t,e,n){return n.foreach((s,r)=>{e=e.updateChild(s,r)}),e}function ic(t,e,n,s,r,i,o,a){if(e.serverCache.getNode().isEmpty()&&!e.serverCache.isFullyInitialized())return e;let c=e,l;P(n)?l=s:l=new G(null).setTree(n,s);const u=e.serverCache.getNode();return l.children.inorderTraversal((d,h)=>{if(u.hasChild(d)){const f=e.serverCache.getNode().getImmediateChild(d),p=th(t,f,h);c=Hi(t,c,new H(d),p,r,i,o,a)}}),l.children.inorderTraversal((d,h)=>{const f=!e.serverCache.isCompleteForChild(d)&&h.value===null;if(!u.hasChild(d)&&!f){const p=e.serverCache.getNode().getImmediateChild(d),_=th(t,p,h);c=Hi(t,c,new H(d),_,r,i,o,a)}}),c}function tI(t,e,n,s,r,i,o){if(Bi(r,n)!=null)return e;const a=e.serverCache.isFiltered(),c=e.serverCache;if(s.value!=null){if(P(n)&&c.isFullyInitialized()||c.isCompleteForPath(n))return Hi(t,e,n,c.getNode().getChild(n),r,i,a,o);if(P(n)){let l=new G(null);return c.getNode().forEachChild(Zn,(u,d)=>{l=l.set(new H(u),d)}),ic(t,e,n,l,r,i,a,o)}else return e}else{let l=new G(null);return s.foreach((u,d)=>{const h=X(n,u);c.isCompleteForPath(h)&&(l=l.set(u,c.getNode().getChild(h)))}),ic(t,e,n,l,r,i,a,o)}}function nI(t,e,n,s,r){const i=e.serverCache,o=qp(e,i.getNode(),i.isFullyInitialized()||P(n),i.isFiltered());return Qp(t,o,n,s,Xp,r)}function sI(t,e,n,s,r,i){let o;if(Bi(s,n)!=null)return e;{const a=new dl(s,e,r),c=e.eventCache.getNode();let l;if(P(n)||N(n)===".priority"){let u;if(e.serverCache.isFullyInitialized())u=$i(s,Dn(e));else{const d=e.serverCache.getNode();g(d instanceof E,"serverChildren would be complete if leaf node"),u=ll(s,d)}u=u,l=t.filter.updateFullNode(c,u,i)}else{const u=N(n);let d=ul(s,u,e.serverCache);d==null&&e.serverCache.isCompleteForChild(u)&&(d=c.getImmediateChild(u)),d!=null?l=t.filter.updateChild(c,u,d,j(n),a,i):e.eventCache.getNode().hasChild(u)?l=t.filter.updateChild(c,u,E.EMPTY_NODE,j(n),a,i):l=c,l.isEmpty()&&e.serverCache.isFullyInitialized()&&(o=$i(s,Dn(e)),o.isLeafNode()&&(l=t.filter.updateFullNode(l,o,i)))}return o=e.serverCache.isFullyInitialized()||Bi(s,U())!=null,nr(e,l,o,t.filter.filtersNodes())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class rI{constructor(e,n){this.query_=e,this.eventRegistrations_=[];const s=this.query_._queryParams,r=new il(s.getIndex()),i=bT(s);this.processor_=JT(i);const o=n.serverCache,a=n.eventCache,c=r.updateFullNode(E.EMPTY_NODE,o.getNode(),null),l=i.updateFullNode(E.EMPTY_NODE,a.getNode(),null),u=new sn(c,o.isFullyInitialized(),r.filtersNodes()),d=new sn(l,a.isFullyInitialized(),i.filtersNodes());this.viewCache_=bo(d,u),this.eventGenerator_=new AT(this.query_)}get query(){return this.query_}}function iI(t){return t.viewCache_.serverCache.getNode()}function oI(t){return Ui(t.viewCache_)}function aI(t,e){const n=Dn(t.viewCache_);return n&&(t.query._queryParams.loadsAllData()||!P(e)&&!n.getImmediateChild(N(e)).isEmpty())?n.getChild(e):null}function nh(t){return t.eventRegistrations_.length===0}function cI(t,e){t.eventRegistrations_.push(e)}function sh(t,e,n){const s=[];if(n){g(e==null,"A cancel should cancel all event registrations.");const r=t.query._path;t.eventRegistrations_.forEach(i=>{const o=i.createCancelEvent(n,r);o&&s.push(o)})}if(e){let r=[];for(let i=0;i<t.eventRegistrations_.length;++i){const o=t.eventRegistrations_[i];if(!o.matches(e))r.push(o);else if(e.hasAnyCallback()){r=r.concat(t.eventRegistrations_.slice(i+1));break}}t.eventRegistrations_=r}else t.eventRegistrations_=[];return s}function rh(t,e,n,s){e.type===Ke.MERGE&&e.source.queryId!==null&&(g(Dn(t.viewCache_),"We should always have a full cache before handling merges"),g(Ui(t.viewCache_),"Missing event cache, even though we have a server cache"));const r=t.viewCache_,i=QT(t.processor_,r,e,n,s);return XT(t.processor_,i.viewCache),g(i.viewCache.serverCache.isFullyInitialized()||!r.serverCache.isFullyInitialized(),"Once a server snap is complete, it should never go back"),t.viewCache_=i.viewCache,Zp(t,i.changes,i.viewCache.eventCache.getNode(),null)}function lI(t,e){const n=t.viewCache_.eventCache,s=[];return n.getNode().isLeafNode()||n.getNode().forEachChild(Q,(i,o)=>{s.push(ys(i,o))}),n.isFullyInitialized()&&s.push(jp(n.getNode())),Zp(t,s,n.getNode(),e)}function Zp(t,e,n,s){const r=s?[s]:t.eventRegistrations_;return NT(t.eventGenerator_,e,n,r)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Wi;class eg{constructor(){this.views=new Map}}function uI(t){g(!Wi,"__referenceConstructor has already been defined"),Wi=t}function dI(){return g(Wi,"Reference.ts has not been loaded"),Wi}function hI(t){return t.views.size===0}function hl(t,e,n,s){const r=e.source.queryId;if(r!==null){const i=t.views.get(r);return g(i!=null,"SyncTree gave us an op for an invalid query."),rh(i,e,n,s)}else{let i=[];for(const o of t.views.values())i=i.concat(rh(o,e,n,s));return i}}function tg(t,e,n,s,r){const i=e._queryIdentifier,o=t.views.get(i);if(!o){let a=$i(n,r?s:null),c=!1;a?c=!0:s instanceof E?(a=ll(n,s),c=!1):(a=E.EMPTY_NODE,c=!1);const l=bo(new sn(a,c,!1),new sn(s,r,!1));return new rI(e,l)}return o}function fI(t,e,n,s,r,i){const o=tg(t,e,s,r,i);return t.views.has(e._queryIdentifier)||t.views.set(e._queryIdentifier,o),cI(o,n),lI(o,n)}function pI(t,e,n,s){const r=e._queryIdentifier,i=[];let o=[];const a=rn(t);if(r==="default")for(const[c,l]of t.views.entries())o=o.concat(sh(l,n,s)),nh(l)&&(t.views.delete(c),l.query._queryParams.loadsAllData()||i.push(l.query));else{const c=t.views.get(r);c&&(o=o.concat(sh(c,n,s)),nh(c)&&(t.views.delete(r),c.query._queryParams.loadsAllData()||i.push(c.query)))}return a&&!rn(t)&&i.push(new(dI())(e._repo,e._path)),{removed:i,events:o}}function ng(t){const e=[];for(const n of t.views.values())n.query._queryParams.loadsAllData()||e.push(n);return e}function Jt(t,e){let n=null;for(const s of t.views.values())n=n||aI(s,e);return n}function sg(t,e){if(e._queryParams.loadsAllData())return So(t);{const s=e._queryIdentifier;return t.views.get(s)}}function rg(t,e){return sg(t,e)!=null}function rn(t){return So(t)!=null}function So(t){for(const e of t.views.values())if(e.query._queryParams.loadsAllData())return e;return null}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Vi;function gI(t){g(!Vi,"__referenceConstructor has already been defined"),Vi=t}function mI(){return g(Vi,"Reference.ts has not been loaded"),Vi}let _I=1;class ih{constructor(e){this.listenProvider_=e,this.syncPointTree_=new G(null),this.pendingWriteTree_=zT(),this.tagToQueryMap=new Map,this.queryToTagMap=new Map}}function ig(t,e,n,s,r){return DT(t.pendingWriteTree_,e,n,s,r),r?Ms(t,new On(ol(),e,n)):[]}function yI(t,e,n,s){xT(t.pendingWriteTree_,e,n,s);const r=G.fromObject(n);return Ms(t,new vs(ol(),e,r))}function Wt(t,e,n=!1){const s=MT(t.pendingWriteTree_,e);if(FT(t.pendingWriteTree_,e)){let i=new G(null);return s.snap!=null?i=i.set(U(),!0):ge(s.children,o=>{i=i.set(new H(o),!0)}),Ms(t,new Fi(s.path,i,n))}else return[]}function Wr(t,e,n){return Ms(t,new On(al(),e,n))}function vI(t,e,n){const s=G.fromObject(n);return Ms(t,new vs(al(),e,s))}function EI(t,e){return Ms(t,new Cr(al(),e))}function wI(t,e,n){const s=pl(t,n);if(s){const r=gl(s),i=r.path,o=r.queryId,a=Te(i,e),c=new Cr(cl(o),a);return ml(t,i,c)}else return[]}function ji(t,e,n,s,r=!1){const i=e._path,o=t.syncPointTree_.get(i);let a=[];if(o&&(e._queryIdentifier==="default"||rg(o,e))){const c=pI(o,e,n,s);hI(o)&&(t.syncPointTree_=t.syncPointTree_.remove(i));const l=c.removed;if(a=c.events,!r){const u=l.findIndex(h=>h._queryParams.loadsAllData())!==-1,d=t.syncPointTree_.findOnPath(i,(h,f)=>rn(f));if(u&&!d){const h=t.syncPointTree_.subtree(i);if(!h.isEmpty()){const f=SI(h);for(let p=0;p<f.length;++p){const _=f[p],m=_.query,A=lg(t,_);t.listenProvider_.startListening(rr(m),Sr(t,m),A.hashFn,A.onComplete)}}}!d&&l.length>0&&!s&&(u?t.listenProvider_.stopListening(rr(e),null):l.forEach(h=>{const f=t.queryToTagMap.get(To(h));t.listenProvider_.stopListening(rr(h),f)}))}TI(t,l)}return a}function og(t,e,n,s){const r=pl(t,s);if(r!=null){const i=gl(r),o=i.path,a=i.queryId,c=Te(o,e),l=new On(cl(a),c,n);return ml(t,o,l)}else return[]}function bI(t,e,n,s){const r=pl(t,s);if(r){const i=gl(r),o=i.path,a=i.queryId,c=Te(o,e),l=G.fromObject(n),u=new vs(cl(a),c,l);return ml(t,o,u)}else return[]}function oc(t,e,n,s=!1){const r=e._path;let i=null,o=!1;t.syncPointTree_.foreachOnPath(r,(h,f)=>{const p=Te(h,r);i=i||Jt(f,p),o=o||rn(f)});let a=t.syncPointTree_.get(r);a?(o=o||rn(a),i=i||Jt(a,U())):(a=new eg,t.syncPointTree_=t.syncPointTree_.set(r,a));let c;i!=null?c=!0:(c=!1,i=E.EMPTY_NODE,t.syncPointTree_.subtree(r).foreachChild((f,p)=>{const _=Jt(p,U());_&&(i=i.updateImmediateChild(f,_))}));const l=rg(a,e);if(!l&&!e._queryParams.loadsAllData()){const h=To(e);g(!t.queryToTagMap.has(h),"View does not exist, but we have a tag");const f=II();t.queryToTagMap.set(h,f),t.tagToQueryMap.set(f,h)}const u=Co(t.pendingWriteTree_,r);let d=fI(a,e,n,u,i,c);if(!l&&!o&&!s){const h=sg(a,e);d=d.concat(kI(t,e,h))}return d}function fl(t,e,n){const r=t.pendingWriteTree_,i=t.syncPointTree_.findOnPath(e,(o,a)=>{const c=Te(o,e),l=Jt(a,c);if(l)return l});return Yp(r,e,i,n,!0)}function CI(t,e){const n=e._path;let s=null;t.syncPointTree_.foreachOnPath(n,(l,u)=>{const d=Te(l,n);s=s||Jt(u,d)});let r=t.syncPointTree_.get(n);r?s=s||Jt(r,U()):(r=new eg,t.syncPointTree_=t.syncPointTree_.set(n,r));const i=s!=null,o=i?new sn(s,!0,!1):null,a=Co(t.pendingWriteTree_,e._path),c=tg(r,e,a,i?o.getNode():E.EMPTY_NODE,i);return oI(c)}function Ms(t,e){return ag(e,t.syncPointTree_,null,Co(t.pendingWriteTree_,U()))}function ag(t,e,n,s){if(P(t.path))return cg(t,e,n,s);{const r=e.get(U());n==null&&r!=null&&(n=Jt(r,U()));let i=[];const o=N(t.path),a=t.operationForChild(o),c=e.children.get(o);if(c&&a){const l=n?n.getImmediateChild(o):null,u=Kp(s,o);i=i.concat(ag(a,c,l,u))}return r&&(i=i.concat(hl(r,t,s,n))),i}}function cg(t,e,n,s){const r=e.get(U());n==null&&r!=null&&(n=Jt(r,U()));let i=[];return e.children.inorderTraversal((o,a)=>{const c=n?n.getImmediateChild(o):null,l=Kp(s,o),u=t.operationForChild(o);u&&(i=i.concat(cg(u,a,c,l)))}),r&&(i=i.concat(hl(r,t,s,n))),i}function lg(t,e){const n=e.query,s=Sr(t,n);return{hashFn:()=>(iI(e)||E.EMPTY_NODE).hash(),onComplete:r=>{if(r==="ok")return s?wI(t,n._path,s):EI(t,n._path);{const i=ES(r,n);return ji(t,n,null,i)}}}}function Sr(t,e){const n=To(e);return t.queryToTagMap.get(n)}function To(t){return t._path.toString()+"$"+t._queryIdentifier}function pl(t,e){return t.tagToQueryMap.get(e)}function gl(t){const e=t.indexOf("$");return g(e!==-1&&e<t.length-1,"Bad queryKey."),{queryId:t.substr(e+1),path:new H(t.substr(0,e))}}function ml(t,e,n){const s=t.syncPointTree_.get(e);g(s,"Missing sync point for query tag that we're tracking");const r=Co(t.pendingWriteTree_,e);return hl(s,n,r,null)}function SI(t){return t.fold((e,n,s)=>{if(n&&rn(n))return[So(n)];{let r=[];return n&&(r=ng(n)),ge(s,(i,o)=>{r=r.concat(o)}),r}})}function rr(t){return t._queryParams.loadsAllData()&&!t._queryParams.isDefault()?new(mI())(t._repo,t._path):t}function TI(t,e){for(let n=0;n<e.length;++n){const s=e[n];if(!s._queryParams.loadsAllData()){const r=To(s),i=t.queryToTagMap.get(r);t.queryToTagMap.delete(r),t.tagToQueryMap.delete(i)}}}function II(){return _I++}function kI(t,e,n){const s=e._path,r=Sr(t,e),i=lg(t,n),o=t.listenProvider_.startListening(rr(e),r,i.hashFn,i.onComplete),a=t.syncPointTree_.subtree(s);if(r)g(!rn(a.value),"If we're adding a query, it shouldn't be shadowed");else{const c=a.fold((l,u,d)=>{if(!P(l)&&u&&rn(u))return[So(u).query];{let h=[];return u&&(h=h.concat(ng(u).map(f=>f.query))),ge(d,(f,p)=>{h=h.concat(p)}),h}});for(let l=0;l<c.length;++l){const u=c[l];t.listenProvider_.stopListening(rr(u),Sr(t,u))}}return o}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class _l{constructor(e){this.node_=e}getImmediateChild(e){const n=this.node_.getImmediateChild(e);return new _l(n)}node(){return this.node_}}class yl{constructor(e,n){this.syncTree_=e,this.path_=n}getImmediateChild(e){const n=X(this.path_,e);return new yl(this.syncTree_,n)}node(){return fl(this.syncTree_,this.path_)}}const RI=function(t){return t=t||{},t.timestamp=t.timestamp||new Date().getTime(),t},oh=function(t,e,n){if(!t||typeof t!="object")return t;if(g(".sv"in t,"Unexpected leaf node or priority contents"),typeof t[".sv"]=="string")return AI(t[".sv"],e,n);if(typeof t[".sv"]=="object")return NI(t[".sv"],e);g(!1,"Unexpected server value: "+JSON.stringify(t,null,2))},AI=function(t,e,n){switch(t){case"timestamp":return n.timestamp;default:g(!1,"Unexpected server value: "+t)}},NI=function(t,e,n){t.hasOwnProperty("increment")||g(!1,"Unexpected server value: "+JSON.stringify(t,null,2));const s=t.increment;typeof s!="number"&&g(!1,"Unexpected increment value: "+s);const r=e.node();if(g(r!==null&&typeof r<"u","Expected ChildrenNode.EMPTY_NODE for nulls"),!r.isLeafNode())return s;const o=r.getValue();return typeof o!="number"?s:o+s},ug=function(t,e,n,s){return vl(e,new yl(n,t),s)},dg=function(t,e,n){return vl(t,new _l(e),n)};function vl(t,e,n){const s=t.getPriority().val(),r=oh(s,e.getImmediateChild(".priority"),n);let i;if(t.isLeafNode()){const o=t,a=oh(o.getValue(),e,n);return a!==o.getValue()||r!==o.getPriority().val()?new de(a,Z(r)):t}else{const o=t;return i=o,r!==o.getPriority().val()&&(i=i.updatePriority(new de(r))),o.forEachChild(Q,(a,c)=>{const l=vl(c,e.getImmediateChild(a),n);l!==c&&(i=i.updateImmediateChild(a,l))}),i}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class El{constructor(e="",n=null,s={children:{},childCount:0}){this.name=e,this.parent=n,this.node=s}}function wl(t,e){let n=e instanceof H?e:new H(e),s=t,r=N(n);for(;r!==null;){const i=gs(s.node.children,r)||{children:{},childCount:0};s=new El(r,s,i),n=j(n),r=N(n)}return s}function Fs(t){return t.node.value}function hg(t,e){t.node.value=e,ac(t)}function fg(t){return t.node.childCount>0}function PI(t){return Fs(t)===void 0&&!fg(t)}function Io(t,e){ge(t.node.children,(n,s)=>{e(new El(n,t,s))})}function pg(t,e,n,s){n&&e(t),Io(t,r=>{pg(r,e,!0)})}function LI(t,e,n){let s=t.parent;for(;s!==null;){if(e(s))return!0;s=s.parent}return!1}function Vr(t){return new H(t.parent===null?t.name:Vr(t.parent)+"/"+t.name)}function ac(t){t.parent!==null&&OI(t.parent,t.name,t)}function OI(t,e,n){const s=PI(n),r=pt(t.node.children,e);s&&r?(delete t.node.children[e],t.node.childCount--,ac(t)):!s&&!r&&(t.node.children[e]=n.node,t.node.childCount++,ac(t))}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const DI=/[\[\].#$\/\u0000-\u001F\u007F]/,xI=/[\[\].#$\u0000-\u001F\u007F]/,fa=10*1024*1024,bl=function(t){return typeof t=="string"&&t.length!==0&&!DI.test(t)},gg=function(t){return typeof t=="string"&&t.length!==0&&!xI.test(t)},MI=function(t){return t&&(t=t.replace(/^\/*\.info(\/|$)/,"/")),gg(t)},mg=function(t){return t===null||typeof t=="string"||typeof t=="number"&&!vo(t)||t&&typeof t=="object"&&pt(t,".sv")},qi=function(t,e,n,s){s&&e===void 0||ko(ms(t,"value"),e,n)},ko=function(t,e,n){const s=n instanceof H?new eT(n,t):n;if(e===void 0)throw new Error(t+"contains undefined "+yn(s));if(typeof e=="function")throw new Error(t+"contains a function "+yn(s)+" with contents = "+e.toString());if(vo(e))throw new Error(t+"contains "+e.toString()+" "+yn(s));if(typeof e=="string"&&e.length>fa/3&&_o(e)>fa)throw new Error(t+"contains a string greater than "+fa+" utf8 bytes "+yn(s)+" ('"+e.substring(0,50)+"...')");if(e&&typeof e=="object"){let r=!1,i=!1;if(ge(e,(o,a)=>{if(o===".value")r=!0;else if(o!==".priority"&&o!==".sv"&&(i=!0,!bl(o)))throw new Error(t+" contains an invalid key ("+o+") "+yn(s)+`.  Keys must be non-empty strings and can't contain ".", "#", "$", "/", "[", or "]"`);tT(s,o),ko(t,a,s),nT(s)}),r&&i)throw new Error(t+' contains ".value" child '+yn(s)+" in addition to actual children.")}},FI=function(t,e){let n,s;for(n=0;n<e.length;n++){s=e[n];const i=vr(s);for(let o=0;o<i.length;o++)if(!(i[o]===".priority"&&o===i.length-1)){if(!bl(i[o]))throw new Error(t+"contains an invalid key ("+i[o]+") in path "+s.toString()+`. Keys must be non-empty strings and can't contain ".", "#", "$", "/", "[", or "]"`)}}e.sort(ZS);let r=null;for(n=0;n<e.length;n++){if(s=e[n],r!==null&&Ue(r,s))throw new Error(t+"contains a path "+r.toString()+" that is ancestor of another path "+s.toString());r=s}},_g=function(t,e,n,s){const r=ms(t,"values");if(!(e&&typeof e=="object")||Array.isArray(e))throw new Error(r+" must be an object containing the children to replace.");const i=[];ge(e,(o,a)=>{const c=new H(o);if(ko(r,a,X(n,c)),tl(c)===".priority"&&!mg(a))throw new Error(r+"contains an invalid value for '"+c.toString()+"', which must be a valid Firebase priority (a string, finite number, server value, or null).");i.push(c)}),FI(r,i)},UI=function(t,e,n){if(vo(e))throw new Error(ms(t,"priority")+"is "+e.toString()+", but must be a valid Firebase priority (a string, finite number, server value, or null).");if(!mg(e))throw new Error(ms(t,"priority")+"must be a valid Firebase priority (a string, finite number, server value, or null).")},Cl=function(t,e,n,s){if(!gg(n))throw new Error(ms(t,e)+'was an invalid path = "'+n+`". Paths must be non-empty strings and can't contain ".", "#", "$", "[", or "]"`)},$I=function(t,e,n,s){n&&(n=n.replace(/^\/*\.info(\/|$)/,"/")),Cl(t,e,n)},Vt=function(t,e){if(N(e)===".info")throw new Error(t+" failed = Can't modify data under /.info/")},BI=function(t,e){const n=e.path.toString();if(typeof e.repoInfo.host!="string"||e.repoInfo.host.length===0||!bl(e.repoInfo.namespace)&&e.repoInfo.host.split(":")[0]!=="localhost"||n.length!==0&&!MI(n))throw new Error(ms(t,"url")+`must be a valid firebase URL and the path can't contain ".", "#", "$", "[", or "]".`)};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class HI{constructor(){this.eventLists_=[],this.recursionDepth_=0}}function Ro(t,e){let n=null;for(let s=0;s<e.length;s++){const r=e[s],i=r.getPath();n!==null&&!nl(i,n.path)&&(t.eventLists_.push(n),n=null),n===null&&(n={events:[],path:i}),n.events.push(r)}n&&t.eventLists_.push(n)}function yg(t,e,n){Ro(t,n),vg(t,s=>nl(s,e))}function We(t,e,n){Ro(t,n),vg(t,s=>Ue(s,e)||Ue(e,s))}function vg(t,e){t.recursionDepth_++;let n=!0;for(let s=0;s<t.eventLists_.length;s++){const r=t.eventLists_[s];if(r){const i=r.path;e(i)?(WI(t.eventLists_[s]),t.eventLists_[s]=null):n=!1}}n&&(t.eventLists_=[]),t.recursionDepth_--}function WI(t){for(let e=0;e<t.events.length;e++){const n=t.events[e];if(n!==null){t.events[e]=null;const s=n.getEventRunner();er&&fe("event: "+n.toString()),Ds(s)}}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const VI="repo_interrupt",jI=25;class qI{constructor(e,n,s,r){this.repoInfo_=e,this.forceRestClient_=n,this.authTokenProvider_=s,this.appCheckProvider_=r,this.dataUpdateCount=0,this.statsListener_=null,this.eventQueue_=new HI,this.nextWriteId_=1,this.interceptServerDataCallback_=null,this.onDisconnect_=Mi(),this.transactionQueueTree_=new El,this.persistentConnection_=null,this.key=this.repoInfo_.toURLString()}toString(){return(this.repoInfo_.secure?"https://":"http://")+this.repoInfo_.host}}function zI(t,e,n){if(t.stats_=Zc(t.repoInfo_),t.forceRestClient_||SS())t.server_=new xi(t.repoInfo_,(s,r,i,o)=>{ah(t,s,r,i,o)},t.authTokenProvider_,t.appCheckProvider_),setTimeout(()=>ch(t,!0),0);else{if(typeof n<"u"&&n!==null){if(typeof n!="object")throw new Error("Only objects are supported for option databaseAuthVariableOverride");try{ae(n)}catch(s){throw new Error("Invalid authOverride provided: "+s)}}t.persistentConnection_=new Tt(t.repoInfo_,e,(s,r,i,o)=>{ah(t,s,r,i,o)},s=>{ch(t,s)},s=>{GI(t,s)},t.authTokenProvider_,t.appCheckProvider_,n),t.server_=t.persistentConnection_}t.authTokenProvider_.addTokenChangeListener(s=>{t.server_.refreshAuthToken(s)}),t.appCheckProvider_.addTokenChangeListener(s=>{t.server_.refreshAppCheckToken(s.token)}),t.statsReporter_=AS(t.repoInfo_,()=>new RT(t.stats_,t.server_)),t.infoData_=new CT,t.infoSyncTree_=new ih({startListening:(s,r,i,o)=>{let a=[];const c=t.infoData_.getNode(s._path);return c.isEmpty()||(a=Wr(t.infoSyncTree_,s._path,c),setTimeout(()=>{o("ok")},0)),a},stopListening:()=>{}}),Sl(t,"connected",!1),t.serverSyncTree_=new ih({startListening:(s,r,i,o)=>(t.server_.listen(s,i,r,(a,c)=>{const l=o(a,c);We(t.eventQueue_,s._path,l)}),[]),stopListening:(s,r)=>{t.server_.unlisten(s,r)}})}function Eg(t){const n=t.infoData_.getNode(new H(".info/serverTimeOffset")).val()||0;return new Date().getTime()+n}function Ao(t){return RI({timestamp:Eg(t)})}function ah(t,e,n,s,r){t.dataUpdateCount++;const i=new H(e);n=t.interceptServerDataCallback_?t.interceptServerDataCallback_(e,n):n;let o=[];if(r)if(s){const c=Ni(n,l=>Z(l));o=bI(t.serverSyncTree_,i,c,r)}else{const c=Z(n);o=og(t.serverSyncTree_,i,c,r)}else if(s){const c=Ni(n,l=>Z(l));o=vI(t.serverSyncTree_,i,c)}else{const c=Z(n);o=Wr(t.serverSyncTree_,i,c)}let a=i;o.length>0&&(a=ws(t,i)),We(t.eventQueue_,a,o)}function ch(t,e){Sl(t,"connected",e),e===!1&&XI(t)}function GI(t,e){ge(e,(n,s)=>{Sl(t,n,s)})}function Sl(t,e,n){const s=new H("/.info/"+e),r=Z(n);t.infoData_.updateSnapshot(s,r);const i=Wr(t.infoSyncTree_,s,r);We(t.eventQueue_,s,i)}function Tl(t){return t.nextWriteId_++}function YI(t,e,n){const s=CI(t.serverSyncTree_,e);return s!=null?Promise.resolve(s):t.server_.get(e).then(r=>{const i=Z(r).withIndex(e._queryParams.getIndex());oc(t.serverSyncTree_,e,n,!0);let o;if(e._queryParams.loadsAllData())o=Wr(t.serverSyncTree_,e._path,i);else{const a=Sr(t.serverSyncTree_,e);o=og(t.serverSyncTree_,e._path,i,a)}return We(t.eventQueue_,e._path,o),ji(t.serverSyncTree_,e,n,null,!0),i},r=>(jr(t,"get for query "+ae(e)+" failed: "+r),Promise.reject(new Error(r))))}function KI(t,e,n,s,r){jr(t,"set",{path:e.toString(),value:n,priority:s});const i=Ao(t),o=Z(n,s),a=fl(t.serverSyncTree_,e),c=dg(o,a,i),l=Tl(t),u=ig(t.serverSyncTree_,e,c,l,!0);Ro(t.eventQueue_,u),t.server_.put(e.toString(),o.val(!0),(h,f)=>{const p=h==="ok";p||ke("set at "+e+" failed: "+h);const _=Wt(t.serverSyncTree_,l,!p);We(t.eventQueue_,e,_),on(t,r,h,f)});const d=kl(t,e);ws(t,d),We(t.eventQueue_,d,[])}function JI(t,e,n,s){jr(t,"update",{path:e.toString(),value:n});let r=!0;const i=Ao(t),o={};if(ge(n,(a,c)=>{r=!1,o[a]=ug(X(e,a),Z(c),t.serverSyncTree_,i)}),r)fe("update() called with empty data.  Don't do anything."),on(t,s,"ok",void 0);else{const a=Tl(t),c=yI(t.serverSyncTree_,e,o,a);Ro(t.eventQueue_,c),t.server_.merge(e.toString(),n,(l,u)=>{const d=l==="ok";d||ke("update at "+e+" failed: "+l);const h=Wt(t.serverSyncTree_,a,!d),f=h.length>0?ws(t,e):e;We(t.eventQueue_,f,h),on(t,s,l,u)}),ge(n,l=>{const u=kl(t,X(e,l));ws(t,u)}),We(t.eventQueue_,e,[])}}function XI(t){jr(t,"onDisconnectEvents");const e=Ao(t),n=Mi();ec(t.onDisconnect_,U(),(r,i)=>{const o=ug(r,i,t.serverSyncTree_,e);xs(n,r,o)});let s=[];ec(n,U(),(r,i)=>{s=s.concat(Wr(t.serverSyncTree_,r,i));const o=kl(t,r);ws(t,o)}),t.onDisconnect_=Mi(),We(t.eventQueue_,U(),s)}function QI(t,e,n){t.server_.onDisconnectCancel(e.toString(),(s,r)=>{s==="ok"&&Za(t.onDisconnect_,e),on(t,n,s,r)})}function lh(t,e,n,s){const r=Z(n);t.server_.onDisconnectPut(e.toString(),r.val(!0),(i,o)=>{i==="ok"&&xs(t.onDisconnect_,e,r),on(t,s,i,o)})}function ZI(t,e,n,s,r){const i=Z(n,s);t.server_.onDisconnectPut(e.toString(),i.val(!0),(o,a)=>{o==="ok"&&xs(t.onDisconnect_,e,i),on(t,r,o,a)})}function ek(t,e,n,s){if(Ai(n)){fe("onDisconnect().update() called with empty data.  Don't do anything."),on(t,s,"ok",void 0);return}t.server_.onDisconnectMerge(e.toString(),n,(r,i)=>{r==="ok"&&ge(n,(o,a)=>{const c=Z(a);xs(t.onDisconnect_,X(e,o),c)}),on(t,s,r,i)})}function tk(t,e,n){let s;N(e._path)===".info"?s=oc(t.infoSyncTree_,e,n):s=oc(t.serverSyncTree_,e,n),yg(t.eventQueue_,e._path,s)}function wg(t,e,n){let s;N(e._path)===".info"?s=ji(t.infoSyncTree_,e,n):s=ji(t.serverSyncTree_,e,n),yg(t.eventQueue_,e._path,s)}function nk(t){t.persistentConnection_&&t.persistentConnection_.interrupt(VI)}function jr(t,...e){let n="";t.persistentConnection_&&(n=t.persistentConnection_.id+":"),fe(n,...e)}function on(t,e,n,s){e&&Ds(()=>{if(n==="ok")e(null);else{const r=(n||"error").toUpperCase();let i=r;s&&(i+=": "+s);const o=new Error(i);o.code=r,e(o)}})}function bg(t,e,n){return fl(t.serverSyncTree_,e,n)||E.EMPTY_NODE}function Il(t,e=t.transactionQueueTree_){if(e||No(t,e),Fs(e)){const n=Sg(t,e);g(n.length>0,"Sending zero length transaction queue"),n.every(r=>r.status===0)&&sk(t,Vr(e),n)}else fg(e)&&Io(e,n=>{Il(t,n)})}function sk(t,e,n){const s=n.map(l=>l.currentWriteId),r=bg(t,e,s);let i=r;const o=r.hash();for(let l=0;l<n.length;l++){const u=n[l];g(u.status===0,"tryToSendTransactionQueue_: items in queue should all be run."),u.status=1,u.retryCount++;const d=Te(e,u.path);i=i.updateChild(d,u.currentOutputSnapshotRaw)}const a=i.val(!0),c=e;t.server_.put(c.toString(),a,l=>{jr(t,"transaction put response",{path:c.toString(),status:l});let u=[];if(l==="ok"){const d=[];for(let h=0;h<n.length;h++)n[h].status=2,u=u.concat(Wt(t.serverSyncTree_,n[h].currentWriteId)),n[h].onComplete&&d.push(()=>n[h].onComplete(null,!0,n[h].currentOutputSnapshotResolved)),n[h].unwatcher();No(t,wl(t.transactionQueueTree_,e)),Il(t,t.transactionQueueTree_),We(t.eventQueue_,e,u);for(let h=0;h<d.length;h++)Ds(d[h])}else{if(l==="datastale")for(let d=0;d<n.length;d++)n[d].status===3?n[d].status=4:n[d].status=0;else{ke("transaction at "+c.toString()+" failed: "+l);for(let d=0;d<n.length;d++)n[d].status=4,n[d].abortReason=l}ws(t,e)}},o)}function ws(t,e){const n=Cg(t,e),s=Vr(n),r=Sg(t,n);return rk(t,r,s),s}function rk(t,e,n){if(e.length===0)return;const s=[];let r=[];const o=e.filter(a=>a.status===0).map(a=>a.currentWriteId);for(let a=0;a<e.length;a++){const c=e[a],l=Te(n,c.path);let u=!1,d;if(g(l!==null,"rerunTransactionsUnderNode_: relativePath should not be null."),c.status===4)u=!0,d=c.abortReason,r=r.concat(Wt(t.serverSyncTree_,c.currentWriteId,!0));else if(c.status===0)if(c.retryCount>=jI)u=!0,d="maxretry",r=r.concat(Wt(t.serverSyncTree_,c.currentWriteId,!0));else{const h=bg(t,c.path,o);c.currentInputSnapshot=h;const f=e[a].update(h.val());if(f!==void 0){ko("transaction failed: Data returned ",f,c.path);let p=Z(f);typeof f=="object"&&f!=null&&pt(f,".priority")||(p=p.updatePriority(h.getPriority()));const m=c.currentWriteId,A=Ao(t),B=dg(p,h,A);c.currentOutputSnapshotRaw=p,c.currentOutputSnapshotResolved=B,c.currentWriteId=Tl(t),o.splice(o.indexOf(m),1),r=r.concat(ig(t.serverSyncTree_,c.path,B,c.currentWriteId,c.applyLocally)),r=r.concat(Wt(t.serverSyncTree_,m,!0))}else u=!0,d="nodata",r=r.concat(Wt(t.serverSyncTree_,c.currentWriteId,!0))}We(t.eventQueue_,n,r),r=[],u&&(e[a].status=2,(function(h){setTimeout(h,Math.floor(0))})(e[a].unwatcher),e[a].onComplete&&(d==="nodata"?s.push(()=>e[a].onComplete(null,!1,e[a].currentInputSnapshot)):s.push(()=>e[a].onComplete(new Error(d),!1,null))))}No(t,t.transactionQueueTree_);for(let a=0;a<s.length;a++)Ds(s[a]);Il(t,t.transactionQueueTree_)}function Cg(t,e){let n,s=t.transactionQueueTree_;for(n=N(e);n!==null&&Fs(s)===void 0;)s=wl(s,n),e=j(e),n=N(e);return s}function Sg(t,e){const n=[];return Tg(t,e,n),n.sort((s,r)=>s.order-r.order),n}function Tg(t,e,n){const s=Fs(e);if(s)for(let r=0;r<s.length;r++)n.push(s[r]);Io(e,r=>{Tg(t,r,n)})}function No(t,e){const n=Fs(e);if(n){let s=0;for(let r=0;r<n.length;r++)n[r].status!==2&&(n[s]=n[r],s++);n.length=s,hg(e,n.length>0?n:void 0)}Io(e,s=>{No(t,s)})}function kl(t,e){const n=Vr(Cg(t,e)),s=wl(t.transactionQueueTree_,e);return LI(s,r=>{pa(t,r)}),pa(t,s),pg(s,r=>{pa(t,r)}),n}function pa(t,e){const n=Fs(e);if(n){const s=[];let r=[],i=-1;for(let o=0;o<n.length;o++)n[o].status===3||(n[o].status===1?(g(i===o-1,"All SENT items should be at beginning of queue."),i=o,n[o].status=3,n[o].abortReason="set"):(g(n[o].status===0,"Unexpected transaction status in abort"),n[o].unwatcher(),r=r.concat(Wt(t.serverSyncTree_,n[o].currentWriteId,!0)),n[o].onComplete&&s.push(n[o].onComplete.bind(null,new Error("set"),!1,null))));i===-1?hg(e,void 0):n.length=i+1,We(t.eventQueue_,Vr(e),r);for(let o=0;o<s.length;o++)Ds(s[o])}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ik(t){let e="";const n=t.split("/");for(let s=0;s<n.length;s++)if(n[s].length>0){let r=n[s];try{r=decodeURIComponent(r.replace(/\+/g," "))}catch{}e+="/"+r}return e}function ok(t){const e={};t.charAt(0)==="?"&&(t=t.substring(1));for(const n of t.split("&")){if(n.length===0)continue;const s=n.split("=");s.length===2?e[decodeURIComponent(s[0])]=decodeURIComponent(s[1]):ke(`Invalid query segment '${n}' in query '${t}'`)}return e}const uh=function(t,e){const n=ak(t),s=n.namespace;n.domain==="firebase.com"&&Nt(n.host+" is no longer supported. Please use <YOUR FIREBASE>.firebaseio.com instead"),(!s||s==="undefined")&&n.domain!=="localhost"&&Nt("Cannot parse Firebase url. Please use https://<YOUR FIREBASE>.firebaseio.com"),n.secure||gS();const r=n.scheme==="ws"||n.scheme==="wss";return{repoInfo:new Rp(n.host,n.secure,s,r,e,"",s!==n.subdomain),path:new H(n.pathString)}},ak=function(t){let e="",n="",s="",r="",i="",o=!0,a="https",c=443;if(typeof t=="string"){let l=t.indexOf("//");l>=0&&(a=t.substring(0,l-1),t=t.substring(l+2));let u=t.indexOf("/");u===-1&&(u=t.length);let d=t.indexOf("?");d===-1&&(d=t.length),e=t.substring(0,Math.min(u,d)),u<d&&(r=ik(t.substring(u,d)));const h=ok(t.substring(Math.min(t.length,d)));l=e.indexOf(":"),l>=0?(o=a==="https"||a==="wss",c=parseInt(e.substring(l+1),10)):l=e.length;const f=e.slice(0,l);if(f.toLowerCase()==="localhost")n="localhost";else if(f.split(".").length<=2)n=f;else{const p=e.indexOf(".");s=e.substring(0,p).toLowerCase(),n=e.substring(p+1),i=s}"ns"in h&&(i=h.ns)}return{host:e,port:c,domain:n,subdomain:s,secure:o,scheme:a,pathString:r,namespace:i}};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const dh="-0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ_abcdefghijklmnopqrstuvwxyz",ck=(function(){let t=0;const e=[];return function(n){const s=n===t;t=n;let r;const i=new Array(8);for(r=7;r>=0;r--)i[r]=dh.charAt(n%64),n=Math.floor(n/64);g(n===0,"Cannot push at time == 0");let o=i.join("");if(s){for(r=11;r>=0&&e[r]===63;r--)e[r]=0;e[r]++}else for(r=0;r<12;r++)e[r]=Math.floor(Math.random()*64);for(r=0;r<12;r++)o+=dh.charAt(e[r]);return g(o.length===20,"nextPushId: Length should be 20."),o}})();/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ig{constructor(e,n,s,r){this.eventType=e,this.eventRegistration=n,this.snapshot=s,this.prevName=r}getPath(){const e=this.snapshot.ref;return this.eventType==="value"?e._path:e.parent._path}getEventType(){return this.eventType}getEventRunner(){return this.eventRegistration.getEventRunner(this)}toString(){return this.getPath().toString()+":"+this.eventType+":"+ae(this.snapshot.exportVal())}}class kg{constructor(e,n,s){this.eventRegistration=e,this.error=n,this.path=s}getPath(){return this.path}getEventType(){return"cancel"}getEventRunner(){return this.eventRegistration.getEventRunner(this)}toString(){return this.path.toString()+":cancel"}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Rl{constructor(e,n){this.snapshotCallback=e,this.cancelCallback=n}onValue(e,n){this.snapshotCallback.call(null,e,n)}onCancel(e){return g(this.hasCancelCallback,"Raising a cancel event on a listener with no cancel callback"),this.cancelCallback.call(null,e)}get hasCancelCallback(){return!!this.cancelCallback}matches(e){return this.snapshotCallback===e.snapshotCallback||this.snapshotCallback.userCallback!==void 0&&this.snapshotCallback.userCallback===e.snapshotCallback.userCallback&&this.snapshotCallback.context===e.snapshotCallback.context}}/**
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
 */class Rg{constructor(e,n){this._repo=e,this._path=n}cancel(){const e=new Ne;return QI(this._repo,this._path,e.wrapCallback(()=>{})),e.promise}remove(){Vt("OnDisconnect.remove",this._path);const e=new Ne;return lh(this._repo,this._path,null,e.wrapCallback(()=>{})),e.promise}set(e){Vt("OnDisconnect.set",this._path),qi("OnDisconnect.set",e,this._path,!1);const n=new Ne;return lh(this._repo,this._path,e,n.wrapCallback(()=>{})),n.promise}setWithPriority(e,n){Vt("OnDisconnect.setWithPriority",this._path),qi("OnDisconnect.setWithPriority",e,this._path,!1),UI("OnDisconnect.setWithPriority",n);const s=new Ne;return ZI(this._repo,this._path,e,n,s.wrapCallback(()=>{})),s.promise}update(e){Vt("OnDisconnect.update",this._path),_g("OnDisconnect.update",e,this._path);const n=new Ne;return ek(this._repo,this._path,e,n.wrapCallback(()=>{})),n.promise}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Po{constructor(e,n,s,r){this._repo=e,this._path=n,this._queryParams=s,this._orderByCalled=r}get key(){return P(this._path)?null:tl(this._path)}get ref(){return new it(this._repo,this._path)}get _queryIdentifier(){const e=Kd(this._queryParams),n=Xc(e);return n==="{}"?"default":n}get _queryObject(){return Kd(this._queryParams)}isEqual(e){if(e=me(e),!(e instanceof Po))return!1;const n=this._repo===e._repo,s=nl(this._path,e._path),r=this._queryIdentifier===e._queryIdentifier;return n&&s&&r}toJSON(){return this.toString()}toString(){return this._repo.toString()+QS(this._path)}}class it extends Po{constructor(e,n){super(e,n,new wo,!1)}get parent(){const e=Fp(this._path);return e===null?null:new it(this._repo,e)}get root(){let e=this;for(;e.parent!==null;)e=e.parent;return e}}class xn{constructor(e,n,s){this._node=e,this.ref=n,this._index=s}get priority(){return this._node.getPriority().val()}get key(){return this.ref.key}get size(){return this._node.numChildren()}child(e){const n=new H(e),s=Mn(this.ref,e);return new xn(this._node.getChild(n),s,Q)}exists(){return!this._node.isEmpty()}exportVal(){return this._node.val(!0)}forEach(e){return this._node.isLeafNode()?!1:!!this._node.forEachChild(this._index,(s,r)=>e(new xn(r,Mn(this.ref,s),Q)))}hasChild(e){const n=new H(e);return!this._node.getChild(n).isEmpty()}hasChildren(){return this._node.isLeafNode()?!1:!this._node.isEmpty()}toJSON(){return this.exportVal()}val(){return this._node.val()}}function k(t,e){return t=me(t),t._checkNotDeleted("ref"),e!==void 0?Mn(t._root,e):t._root}function Mn(t,e){return t=me(t),N(t._path)===null?$I("child","path",e):Cl("child","path",e),new it(t._repo,X(t._path,e))}function Ag(t){return t=me(t),new Rg(t._repo,t._path)}function zi(t,e){t=me(t),Vt("push",t._path),qi("push",e,t._path,!0);const n=Eg(t._repo),s=ck(n),r=Mn(t,s),i=Mn(t,s);let o;return o=Promise.resolve(i),r.then=o.then.bind(o),r.catch=o.then.bind(o,void 0),r}function Ve(t){return Vt("remove",t._path),re(t,null)}function re(t,e){t=me(t),Vt("set",t._path),qi("set",e,t._path,!1);const n=new Ne;return KI(t._repo,t._path,e,null,n.wrapCallback(()=>{})),n.promise}function Sn(t,e){_g("update",e,t._path);const n=new Ne;return JI(t._repo,t._path,e,n.wrapCallback(()=>{})),n.promise}function et(t){t=me(t);const e=new Rl(()=>{}),n=new qr(e);return YI(t._repo,t,n).then(s=>new xn(s,new it(t._repo,t._path),t._queryParams.getIndex()))}class qr{constructor(e){this.callbackContext=e}respondsTo(e){return e==="value"}createEvent(e,n){const s=n._queryParams.getIndex();return new Ig("value",this,new xn(e.snapshotNode,new it(n._repo,n._path),s))}getEventRunner(e){return e.getEventType()==="cancel"?()=>this.callbackContext.onCancel(e.error):()=>this.callbackContext.onValue(e.snapshot,null)}createCancelEvent(e,n){return this.callbackContext.hasCancelCallback?new kg(this,e,n):null}matches(e){return e instanceof qr?!e.callbackContext||!this.callbackContext?!0:e.callbackContext.matches(this.callbackContext):!1}hasAnyCallback(){return this.callbackContext!==null}}class Lo{constructor(e,n){this.eventType=e,this.callbackContext=n}respondsTo(e){let n=e==="children_added"?"child_added":e;return n=n==="children_removed"?"child_removed":n,this.eventType===n}createCancelEvent(e,n){return this.callbackContext.hasCancelCallback?new kg(this,e,n):null}createEvent(e,n){g(e.childName!=null,"Child events should have a childName.");const s=Mn(new it(n._repo,n._path),e.childName),r=n._queryParams.getIndex();return new Ig(e.type,this,new xn(e.snapshotNode,s,r),e.prevName)}getEventRunner(e){return e.getEventType()==="cancel"?()=>this.callbackContext.onCancel(e.error):()=>this.callbackContext.onValue(e.snapshot,e.prevName)}matches(e){return e instanceof Lo?this.eventType===e.eventType&&(!this.callbackContext||!e.callbackContext||this.callbackContext.matches(e.callbackContext)):!1}hasAnyCallback(){return!!this.callbackContext}}function Oo(t,e,n,s,r){const i=new Rl(n,void 0),o=e==="value"?new qr(i):new Lo(e,i);return tk(t._repo,t,o),()=>wg(t._repo,t,o)}function Al(t,e,n,s){return Oo(t,"value",e)}function bs(t,e,n,s){return Oo(t,"child_added",e)}function Ng(t,e,n,s){return Oo(t,"child_changed",e)}function Pg(t,e,n,s){return Oo(t,"child_removed",e)}function It(t,e,n){let s=null;const r=n?new Rl(n):null;e==="value"?s=new qr(r):e&&(s=new Lo(e,r)),wg(t._repo,t,s)}uI(it);gI(it);/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const lk="FIREBASE_DATABASE_EMULATOR_HOST",cc={};let uk=!1;function dk(t,e,n,s){const r=e.lastIndexOf(":"),i=e.substring(0,r),o=Ns(i);t.repoInfo_=new Rp(e,o,t.repoInfo_.namespace,t.repoInfo_.webSocketOnly,t.repoInfo_.nodeAdmin,t.repoInfo_.persistenceKey,t.repoInfo_.includeNamespaceInQueryParams,!0,n),s&&(t.authTokenProvider_=s)}function Lg(t,e,n,s,r){let i=s||t.options.databaseURL;i===void 0&&(t.options.projectId||Nt("Can't determine Firebase Database URL. Be sure to include  a Project ID when calling firebase.initializeApp()."),fe("Using default host for project ",t.options.projectId),i=`${t.options.projectId}-default-rtdb.firebaseio.com`);let o=uh(i,r),a=o.repoInfo,c;typeof process<"u"&&Pd&&(c=Pd[lk]),c?(i=`http://${c}?ns=${a.namespace}`,o=uh(i,r),a=o.repoInfo):o.repoInfo.secure;const l=new IS(t.name,t.options,e);BI("Invalid Firebase Database URL",o),P(o.path)||Nt("Database URL must point to the root of a Firebase Database (not including a child path).");const u=fk(a,t,l,new TS(t,n));return new Og(u,t)}function hk(t,e){const n=cc[e];(!n||n[t.key]!==t)&&Nt(`Database ${e}(${t.repoInfo_}) has already been deleted.`),nk(t),delete n[t.key]}function fk(t,e,n,s){let r=cc[e.name];r||(r={},cc[e.name]=r);let i=r[t.toURLString()];return i&&Nt("Database initialized multiple times. Please make sure the format of the database URL matches with each database() call."),i=new qI(t,uk,n,s),r[t.toURLString()]=i,i}class Og{constructor(e,n){this._repoInternal=e,this.app=n,this.type="database",this._instanceStarted=!1}get _repo(){return this._instanceStarted||(zI(this._repoInternal,this.app.options.appId,this.app.options.databaseAuthVariableOverride),this._instanceStarted=!0),this._repoInternal}get _root(){return this._rootInternal||(this._rootInternal=new it(this._repo,U())),this._rootInternal}_delete(){return this._rootInternal!==null&&(hk(this._repo,this.app.name),this._repoInternal=null,this._rootInternal=null),Promise.resolve()}_checkNotDeleted(e){this._rootInternal===null&&Nt("Cannot call "+e+" on a deleted database.")}}function Dg(t=Jc(),e){const n=Ur(t,"database").getImmediate({identifier:e});if(!n._instanceStarted){const s=Lb("database");s&&xg(n,...s)}return n}function xg(t,e,n,s={}){t=me(t),t._checkNotDeleted("useEmulator");const r=`${e}:${n}`,i=t._repoInternal;if(t._instanceStarted){if(r===t._repoInternal.repoInfo_.host&&Pn(s,i.repoInfo_.emulatorOptions))return;Nt("connectDatabaseEmulator() cannot initialize or alter the emulator configuration after the database instance has started.")}let o;if(i.repoInfo_.nodeAdmin)s.mockUserToken&&Nt('mockUserToken is not supported by the Admin SDK. For client access with mock users, please use the "firebase" package instead of "firebase-admin".'),o=new mi(mi.OWNER);else if(s.mockUserToken){const a=typeof s.mockUserToken=="string"?s.mockUserToken:Ob(s.mockUserToken,t.app.options.projectId);o=new mi(a)}Ns(e)&&(rp(e),ip("Database",!0)),dk(i,r,s,o)}/**
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
 */function pk(t){pp(Os),tn(new Rt("database",(e,{instanceIdentifier:n})=>{const s=e.getProvider("app").getImmediate(),r=e.getProvider("auth-internal"),i=e.getProvider("app-check-internal");return Lg(s,r,i,n)},"PUBLIC").setMultipleInstances(!0)),St(Ld,Od,t),St(Ld,Od,"esm2020")}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const gk={".sv":"timestamp"};function Tn(){return gk}Tt.prototype.simpleListen=function(t,e){this.sendRequest("q",{p:t},e)};Tt.prototype.echo=function(t,e){this.sendRequest("echo",{d:t},e)};pk();const mk=Object.freeze(Object.defineProperty({__proto__:null,DataSnapshot:xn,Database:Og,OnDisconnect:Rg,_QueryImpl:Po,_QueryParams:wo,_ReferenceImpl:it,_repoManagerDatabaseFromApp:Lg,_setSDKVersion:pp,_validatePathString:Cl,_validateWritablePath:Vt,child:Mn,connectDatabaseEmulator:xg,get:et,getDatabase:Dg,off:It,onChildAdded:bs,onChildChanged:Ng,onChildRemoved:Pg,onDisconnect:Ag,onValue:Al,push:zi,ref:k,remove:Ve,serverTimestamp:Tn,set:re,update:Sn},Symbol.toStringTag,{value:"Module"}));var _k="firebase",yk="12.4.0";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */St(_k,yk,"app");/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const lc=new Map,Mg={activated:!1,tokenObservers:[]},vk={initialized:!1,enabled:!1};function ce(t){return lc.get(t)||{...Mg}}function Ek(t,e){return lc.set(t,e),lc.get(t)}function Do(){return vk}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Fg="https://content-firebaseappcheck.googleapis.com/v1",wk="exchangeRecaptchaEnterpriseToken",bk="exchangeDebugToken",hh={RETRIAL_MIN_WAIT:30*1e3,RETRIAL_MAX_WAIT:960*1e3},Ck=1440*60*1e3;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Sk{constructor(e,n,s,r,i){if(this.operation=e,this.retryPolicy=n,this.getWaitDuration=s,this.lowerBound=r,this.upperBound=i,this.pending=null,this.nextErrorWaitInterval=r,r>i)throw new Error("Proactive refresh lower bound greater than upper bound!")}start(){this.nextErrorWaitInterval=this.lowerBound,this.process(!0).catch(()=>{})}stop(){this.pending&&(this.pending.reject("cancelled"),this.pending=null)}isRunning(){return!!this.pending}async process(e){this.stop();try{this.pending=new Ne,this.pending.promise.catch(n=>{}),await Tk(this.getNextRun(e)),this.pending.resolve(),await this.pending.promise,this.pending=new Ne,this.pending.promise.catch(n=>{}),await this.operation(),this.pending.resolve(),await this.pending.promise,this.process(!0).catch(()=>{})}catch(n){this.retryPolicy(n)?this.process(!1).catch(()=>{}):this.stop()}}getNextRun(e){if(e)return this.nextErrorWaitInterval=this.lowerBound,this.getWaitDuration();{const n=this.nextErrorWaitInterval;return this.nextErrorWaitInterval*=2,this.nextErrorWaitInterval>this.upperBound&&(this.nextErrorWaitInterval=this.upperBound),n}}}function Tk(t){return new Promise(e=>{setTimeout(e,t)})}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ik={"already-initialized":"You have already called initializeAppCheck() for FirebaseApp {$appName} with different options. To avoid this error, call initializeAppCheck() with the same options as when it was originally called. This will return the already initialized instance.","use-before-activation":"App Check is being used before initializeAppCheck() is called for FirebaseApp {$appName}. Call initializeAppCheck() before instantiating other Firebase services.","fetch-network-error":"Fetch failed to connect to a network. Check Internet connection. Original error: {$originalErrorMessage}.","fetch-parse-error":"Fetch client could not parse response. Original error: {$originalErrorMessage}.","fetch-status-error":"Fetch server returned an HTTP error status. HTTP status: {$httpStatus}.","storage-open":"Error thrown when opening storage. Original error: {$originalErrorMessage}.","storage-get":"Error thrown when reading from storage. Original error: {$originalErrorMessage}.","storage-set":"Error thrown when writing to storage. Original error: {$originalErrorMessage}.","recaptcha-error":"ReCAPTCHA error.","initial-throttle":"{$httpStatus} error. Attempts allowed again after {$time}",throttled:"Requests throttled due to previous {$httpStatus} error. Attempts allowed again after {$time}"},Le=new Ps("appCheck","AppCheck",Ik);/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function fh(t=!1){return t?self.grecaptcha?.enterprise:self.grecaptcha}function Nl(t){if(!ce(t).activated)throw Le.create("use-before-activation",{appName:t.name})}function Ug(t){const e=Math.round(t/1e3),n=Math.floor(e/(3600*24)),s=Math.floor((e-n*3600*24)/3600),r=Math.floor((e-n*3600*24-s*3600)/60),i=e-n*3600*24-s*3600-r*60;let o="";return n&&(o+=ri(n)+"d:"),s&&(o+=ri(s)+"h:"),o+=ri(r)+"m:"+ri(i)+"s",o}function ri(t){return t===0?"00":t>=10?t.toString():"0"+t}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Pl({url:t,body:e},n){const s={"Content-Type":"application/json"},r=n.getImmediate({optional:!0});if(r){const d=await r.getHeartbeatsHeader();d&&(s["X-Firebase-Client"]=d)}const i={method:"POST",body:JSON.stringify(e),headers:s};let o;try{o=await fetch(t,i)}catch(d){throw Le.create("fetch-network-error",{originalErrorMessage:d?.message})}if(o.status!==200)throw Le.create("fetch-status-error",{httpStatus:o.status});let a;try{a=await o.json()}catch(d){throw Le.create("fetch-parse-error",{originalErrorMessage:d?.message})}const c=a.ttl.match(/^([\d.]+)(s)$/);if(!c||!c[2]||isNaN(Number(c[1])))throw Le.create("fetch-parse-error",{originalErrorMessage:`ttl field (timeToLive) is not in standard Protobuf Duration format: ${a.ttl}`});const l=Number(c[1])*1e3,u=Date.now();return{token:a.token,expireTimeMillis:u+l,issuedAtTimeMillis:u}}function kk(t,e){const{projectId:n,appId:s,apiKey:r}=t.options;return{url:`${Fg}/projects/${n}/apps/${s}:${wk}?key=${r}`,body:{recaptcha_enterprise_token:e}}}function $g(t,e){const{projectId:n,appId:s,apiKey:r}=t.options;return{url:`${Fg}/projects/${n}/apps/${s}:${bk}?key=${r}`,body:{debug_token:e}}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Rk="firebase-app-check-database",Ak=1,Tr="firebase-app-check-store",Bg="debug-token";let ii=null;function Hg(){return ii||(ii=new Promise((t,e)=>{try{const n=indexedDB.open(Rk,Ak);n.onsuccess=s=>{t(s.target.result)},n.onerror=s=>{e(Le.create("storage-open",{originalErrorMessage:s.target.error?.message}))},n.onupgradeneeded=s=>{const r=s.target.result;switch(s.oldVersion){case 0:r.createObjectStore(Tr,{keyPath:"compositeKey"})}}}catch(n){e(Le.create("storage-open",{originalErrorMessage:n?.message}))}}),ii)}function Nk(t){return Vg(jg(t))}function Pk(t,e){return Wg(jg(t),e)}function Lk(t){return Wg(Bg,t)}function Ok(){return Vg(Bg)}async function Wg(t,e){const s=(await Hg()).transaction(Tr,"readwrite"),i=s.objectStore(Tr).put({compositeKey:t,value:e});return new Promise((o,a)=>{i.onsuccess=c=>{o()},s.onerror=c=>{a(Le.create("storage-set",{originalErrorMessage:c.target.error?.message}))}})}async function Vg(t){const n=(await Hg()).transaction(Tr,"readonly"),r=n.objectStore(Tr).get(t);return new Promise((i,o)=>{r.onsuccess=a=>{const c=a.target.result;i(c?c.value:void 0)},n.onerror=a=>{o(Le.create("storage-get",{originalErrorMessage:a.target.error?.message}))}})}function jg(t){return`${t.options.appId}-${t.name}`}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const jt=new yo("@firebase/app-check");/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Dk(t){if(Yc()){let e;try{e=await Nk(t)}catch(n){jt.warn(`Failed to read token from IndexedDB. Error: ${n}`)}return e}}function ga(t,e){return Yc()?Pk(t,e).catch(n=>{jt.warn(`Failed to write token to IndexedDB. Error: ${n}`)}):Promise.resolve()}async function xk(){let t;try{t=await Ok()}catch{}if(t)return t;{const e=crypto.randomUUID();return Lk(e).catch(n=>jt.warn(`Failed to persist debug token to IndexedDB. Error: ${n}`)),e}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ll(){return Do().enabled}async function Ol(){const t=Do();if(t.enabled&&t.token)return t.token.promise;throw Error(`
            Can't get debug token in production mode.
        `)}function Mk(){const t=ep(),e=Do();if(e.initialized=!0,typeof t.FIREBASE_APPCHECK_DEBUG_TOKEN!="string"&&t.FIREBASE_APPCHECK_DEBUG_TOKEN!==!0)return;e.enabled=!0;const n=new Ne;e.token=n,typeof t.FIREBASE_APPCHECK_DEBUG_TOKEN=="string"?n.resolve(t.FIREBASE_APPCHECK_DEBUG_TOKEN):n.resolve(xk())}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Fk={error:"UNKNOWN_ERROR"};function Uk(t){return mo.encodeString(JSON.stringify(t),!1)}async function uc(t,e=!1,n=!1){const s=t.app;Nl(s);const r=ce(s);let i=r.token,o;if(i&&!Jn(i)&&(r.token=void 0,i=void 0),!i){const l=await r.cachedTokenPromise;l&&(Jn(l)?i=l:await ga(s,void 0))}if(!e&&i&&Jn(i))return{token:i.token};let a=!1;if(Ll())try{r.exchangeTokenPromise||(r.exchangeTokenPromise=Pl($g(s,await Ol()),t.heartbeatServiceProvider).finally(()=>{r.exchangeTokenPromise=void 0}),a=!0);const l=await r.exchangeTokenPromise;return await ga(s,l),r.token=l,{token:l.token}}catch(l){return l.code==="appCheck/throttled"||l.code==="appCheck/initial-throttle"?jt.warn(l.message):n&&jt.error(l),ma(l)}try{r.exchangeTokenPromise||(r.exchangeTokenPromise=r.provider.getToken().finally(()=>{r.exchangeTokenPromise=void 0}),a=!0),i=await ce(s).exchangeTokenPromise}catch(l){l.code==="appCheck/throttled"||l.code==="appCheck/initial-throttle"?jt.warn(l.message):n&&jt.error(l),o=l}let c;return i?o?Jn(i)?c={token:i.token,internalError:o}:c=ma(o):(c={token:i.token},r.token=i,await ga(s,i)):c=ma(o),a&&Gg(s,c),c}async function $k(t){const e=t.app;Nl(e);const{provider:n}=ce(e);if(Ll()){const s=await Ol(),{token:r}=await Pl($g(e,s),t.heartbeatServiceProvider);return{token:r}}else{const{token:s}=await n.getToken();return{token:s}}}function qg(t,e,n,s){const{app:r}=t,i=ce(r),o={next:n,error:s,type:e};if(i.tokenObservers=[...i.tokenObservers,o],i.token&&Jn(i.token)){const a=i.token;Promise.resolve().then(()=>{n({token:a.token}),ph(t)}).catch(()=>{})}i.cachedTokenPromise.then(()=>ph(t))}function zg(t,e){const n=ce(t),s=n.tokenObservers.filter(r=>r.next!==e);s.length===0&&n.tokenRefresher&&n.tokenRefresher.isRunning()&&n.tokenRefresher.stop(),n.tokenObservers=s}function ph(t){const{app:e}=t,n=ce(e);let s=n.tokenRefresher;s||(s=Bk(t),n.tokenRefresher=s),!s.isRunning()&&n.isTokenAutoRefreshEnabled&&s.start()}function Bk(t){const{app:e}=t;return new Sk(async()=>{const n=ce(e);let s;if(n.token?s=await uc(t,!0):s=await uc(t),s.error)throw s.error;if(s.internalError)throw s.internalError},()=>!0,()=>{const n=ce(e);if(n.token){let s=n.token.issuedAtTimeMillis+(n.token.expireTimeMillis-n.token.issuedAtTimeMillis)*.5+3e5;const r=n.token.expireTimeMillis-300*1e3;return s=Math.min(s,r),Math.max(0,s-Date.now())}else return 0},hh.RETRIAL_MIN_WAIT,hh.RETRIAL_MAX_WAIT)}function Gg(t,e){const n=ce(t).tokenObservers;for(const s of n)try{s.type==="EXTERNAL"&&e.error!=null?s.error(e.error):s.next(e)}catch{}}function Jn(t){return t.expireTimeMillis-Date.now()>0}function ma(t){return{token:Uk(Fk),error:t}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Hk{constructor(e,n){this.app=e,this.heartbeatServiceProvider=n}_delete(){const{tokenObservers:e}=ce(this.app);for(const n of e)zg(this.app,n.next);return Promise.resolve()}}function Wk(t,e){return new Hk(t,e)}function Vk(t){return{getToken:e=>uc(t,e),getLimitedUseToken:()=>$k(t),addTokenListener:e=>qg(t,"INTERNAL",e),removeTokenListener:e=>zg(t.app,e)}}const jk="@firebase/app-check",qk="0.11.0",zk="https://www.google.com/recaptcha/enterprise.js";function Gk(t,e){const n=new Ne,s=ce(t);s.reCAPTCHAState={initialized:n};const r=Yk(t),i=fh(!0);return i?gh(t,e,i,r,n):Xk(()=>{const o=fh(!0);if(!o)throw new Error("no recaptcha");gh(t,e,o,r,n)}),n.promise}function gh(t,e,n,s,r){n.ready(()=>{Jk(t,e,n,s),r.resolve(n)})}function Yk(t){const e=`fire_app_check_${t.name}`,n=document.createElement("div");return n.id=e,n.style.display="none",document.body.appendChild(n),e}async function Kk(t){Nl(t);const n=await ce(t).reCAPTCHAState.initialized.promise;return new Promise((s,r)=>{const i=ce(t).reCAPTCHAState;n.ready(()=>{s(n.execute(i.widgetId,{action:"fire_app_check"}))})})}function Jk(t,e,n,s){const r=n.render(s,{sitekey:e,size:"invisible",callback:()=>{ce(t).reCAPTCHAState.succeeded=!0},"error-callback":()=>{ce(t).reCAPTCHAState.succeeded=!1}}),i=ce(t);i.reCAPTCHAState={...i.reCAPTCHAState,widgetId:r}}function Xk(t){const e=document.createElement("script");e.src=zk,e.onload=t,document.head.appendChild(e)}class Dl{constructor(e){this._siteKey=e,this._throttleData=null}async getToken(){Zk(this._throttleData);const e=await Kk(this._app).catch(s=>{throw Le.create("recaptcha-error")});if(!ce(this._app).reCAPTCHAState?.succeeded)throw Le.create("recaptcha-error");let n;try{n=await Pl(kk(this._app,e),this._heartbeatServiceProvider)}catch(s){throw s.code?.includes("fetch-status-error")?(this._throttleData=Qk(Number(s.customData?.httpStatus),this._throttleData),Le.create("initial-throttle",{time:Ug(this._throttleData.allowRequestsAfter-Date.now()),httpStatus:this._throttleData.httpStatus})):s}return this._throttleData=null,n}initialize(e){this._app=e,this._heartbeatServiceProvider=Ur(e,"heartbeat"),Gk(e,this._siteKey).catch(()=>{})}isEqual(e){return e instanceof Dl?this._siteKey===e._siteKey:!1}}function Qk(t,e){if(t===404||t===403)return{backoffCount:1,allowRequestsAfter:Date.now()+Ck,httpStatus:t};{const n=e?e.backoffCount:0,s=tC(n,1e3,2);return{backoffCount:n+1,allowRequestsAfter:Date.now()+s,httpStatus:t}}}function Zk(t){if(t&&Date.now()-t.allowRequestsAfter<=0)throw Le.create("throttled",{time:Ug(t.allowRequestsAfter-Date.now()),httpStatus:t.httpStatus})}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function eR(t=Jc(),e){t=me(t);const n=Ur(t,"app-check");if(Do().initialized||Mk(),Ll()&&Ol().then(r=>console.log(`App Check debug token: ${r}. You will need to add it to your app's App Check settings in the Firebase console for it to work.`)),n.isInitialized()){const r=n.getImmediate(),i=n.getOptions();if(i.isTokenAutoRefreshEnabled===e.isTokenAutoRefreshEnabled&&i.provider.isEqual(e.provider))return r;throw Le.create("already-initialized",{appName:t.name})}const s=n.initialize({options:e});return tR(t,e.provider,e.isTokenAutoRefreshEnabled),ce(t).isTokenAutoRefreshEnabled&&qg(s,"INTERNAL",()=>{}),s}function tR(t,e,n=!1){const s=Ek(t,{...Mg});s.activated=!0,s.provider=e,s.cachedTokenPromise=Dk(t).then(r=>(r&&Jn(r)&&(s.token=r,Gg(t,{token:r.token})),r)),s.isTokenAutoRefreshEnabled=n&&t.automaticDataCollectionEnabled,!t.automaticDataCollectionEnabled&&n&&jt.warn("`isTokenAutoRefreshEnabled` is true but `automaticDataCollectionEnabled` was set to false during `initializeApp()`. This blocks automatic token refresh."),s.provider.initialize(t)}const nR="app-check",mh="app-check-internal";function sR(){tn(new Rt(nR,t=>{const e=t.getProvider("app").getImmediate(),n=t.getProvider("heartbeat");return Wk(e,n)},"PUBLIC").setInstantiationMode("EXPLICIT").setInstanceCreatedCallback((t,e,n)=>{t.getProvider(mh).initialize()})),tn(new Rt(mh,t=>{const e=t.getProvider("app-check").getImmediate();return Vk(e)},"PUBLIC").setInstantiationMode("EXPLICIT")),St(jk,qk)}sR();const rR={apiKey:"AIzaSyA-fvCaKCjyEFX__YAVr1oPGdVsUEhFehA",authDomain:"vidu-aae11.web.app",projectId:"vidu-aae11",databaseURL:"https://vidu-aae11-default-rtdb.europe-west1.firebasedatabase.app",storageBucket:"vidu-aae11.firebasestorage.app",messagingSenderId:"765724787439",appId:"1:765724787439:web:61a3b5dd538149564c911a",measurementId:"G-EGJ53HLGY4"},xl=up(rR),_h="6LdBIBgsAAAAAB4zIcXaZI-FD4kt21TWs9Zx9_fp";let dc;if(_h.trim()!=="")dc=new Dl(_h),console.info("[Firebase App Check: PROD] Initializing with ReCAPTCHA Enterprise (invisible mode).");else throw console.error("[Firebase App Check: PROD] VITE_RECAPTCHA_ENTERPRISE_SITE_KEY is missing or empty. App Check will NOT be initialized, leaving Firebase services unprotected!"),new Error("Firebase App Check configuration missing in production.");if(dc)try{eR(xl,{provider:dc,isTokenAutoRefreshEnabled:!0})}catch(t){console.error("[Firebase App Check] initializeAppCheck call failed:",t)}const R=Dg(xl),Je=[];function En(t,e,n,s=null,r=null,i=null){e==="value"?Al(t,n):e==="child_added"?bs(t,n):e==="child_removed"?Pg(t,n):console.warn(`Unknown listener type: ${e}`),Je.push({ref:t,type:e,callback:n,roomId:s,userId:r,category:i})}function iR(){Je.forEach(({ref:t,type:e,callback:n})=>{try{It(t,e,n)}catch(s){console.warn("Failed to remove firebase rtdb listener",s)}}),Je.length=0}function xo(t){if(!t)return;Je.filter(s=>s.roomId===t).forEach(({ref:s,type:r,callback:i})=>{try{It(s,r,i)}catch(o){console.warn(`Failed to remove listener for room ${t}`,o)}});const n=Je.filter(s=>s.roomId!==t);Je.length=0,Je.push(...n)}function oR(t,e){if(!t||!e)return;const n=i=>i.userId===t&&i.roomId===e;Je.filter(n).forEach(({ref:i,type:o,callback:a})=>{try{It(i,o,a)}catch(c){console.warn(`Failed to remove listener for user ${t} in room ${e}`,c)}});const r=Je.filter(i=>!n(i));Je.length=0,Je.push(...r)}function ir(t,e,n=null){En(t,"value",e,n)}const pn=t=>k(R,`rooms/${t}`),oi=t=>k(R,`rooms/${t}/members`),yh=(t,e)=>k(R,`rooms/${t}/members/${e}`),aR=t=>k(R,`rooms/${t}/cancellation`),Mo=t=>k(R,`rooms/${t}/watch`),Fo=t=>k(R,`rooms/${t}/watch/fileRequest`),cR=t=>k(R,`users/${t}/recentCalls`),Ml=(t,e)=>k(R,`users/${t}/recentCalls/${e}`),Fl=t=>k(R,`users/${t}/outgoingCall`),Yg=t=>k(R,`rooms/${t}/offerCandidates`),Kg=t=>k(R,`rooms/${t}/answerCandidates`);function Jg(){return{"dependent-sdk-initialized-before-auth":"Another Firebase SDK was initialized and is trying to use Auth before Auth is initialized. Please be sure to call `initializeAuth` or `getAuth` before starting any other Firebase SDK."}}const lR=Jg,Xg=new Ps("auth","Firebase",Jg());/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Gi=new yo("@firebase/auth");function uR(t,...e){Gi.logLevel<=W.WARN&&Gi.warn(`Auth (${Os}): ${t}`,...e)}function _i(t,...e){Gi.logLevel<=W.ERROR&&Gi.error(`Auth (${Os}): ${t}`,...e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ft(t,...e){throw $l(t,...e)}function tt(t,...e){return $l(t,...e)}function Ul(t,e,n){const s={...lR(),[e]:n};return new Ps("auth","Firebase",s).create(e,{appName:t.name})}function In(t){return Ul(t,"operation-not-supported-in-this-environment","Operations that alter the current user are not supported in conjunction with FirebaseServerApp")}function dR(t,e,n){const s=n;if(!(e instanceof s))throw s.name!==e.constructor.name&&ft(t,"argument-error"),Ul(t,"argument-error",`Type of ${e.constructor.name} does not match expected instance.Did you pass a reference from a different Auth SDK?`)}function $l(t,...e){if(typeof t!="string"){const n=e[0],s=[...e.slice(1)];return s[0]&&(s[0].appName=t.name),t._errorFactory.create(n,...s)}return Xg.create(t,...e)}function S(t,e,...n){if(!t)throw $l(e,...n)}function yt(t){const e="INTERNAL ASSERTION FAILED: "+t;throw _i(e),new Error(e)}function Pt(t,e){t||yt(e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function hc(){return typeof self<"u"&&self.location?.href||""}function hR(){return vh()==="http:"||vh()==="https:"}function vh(){return typeof self<"u"&&self.location?.protocol||null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function fR(){return typeof navigator<"u"&&navigator&&"onLine"in navigator&&typeof navigator.onLine=="boolean"&&(hR()||Fb()||"connection"in navigator)?navigator.onLine:!0}function pR(){if(typeof navigator>"u")return null;const t=navigator;return t.languages&&t.languages[0]||t.language||null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class zr{constructor(e,n){this.shortDelay=e,this.longDelay=n,Pt(n>e,"Short delay should be less than long delay!"),this.isMobile=Gc()||op()}get(){return fR()?this.isMobile?this.longDelay:this.shortDelay:Math.min(5e3,this.shortDelay)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Bl(t,e){Pt(t.emulator,"Emulator should always be set here");const{url:n}=t.emulator;return e?`${n}${e.startsWith("/")?e.slice(1):e}`:n}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Qg{static initialize(e,n,s){this.fetchImpl=e,n&&(this.headersImpl=n),s&&(this.responseImpl=s)}static fetch(){if(this.fetchImpl)return this.fetchImpl;if(typeof self<"u"&&"fetch"in self)return self.fetch;if(typeof globalThis<"u"&&globalThis.fetch)return globalThis.fetch;if(typeof fetch<"u")return fetch;yt("Could not find fetch implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static headers(){if(this.headersImpl)return this.headersImpl;if(typeof self<"u"&&"Headers"in self)return self.Headers;if(typeof globalThis<"u"&&globalThis.Headers)return globalThis.Headers;if(typeof Headers<"u")return Headers;yt("Could not find Headers implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static response(){if(this.responseImpl)return this.responseImpl;if(typeof self<"u"&&"Response"in self)return self.Response;if(typeof globalThis<"u"&&globalThis.Response)return globalThis.Response;if(typeof Response<"u")return Response;yt("Could not find Response implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const gR={CREDENTIAL_MISMATCH:"custom-token-mismatch",MISSING_CUSTOM_TOKEN:"internal-error",INVALID_IDENTIFIER:"invalid-email",MISSING_CONTINUE_URI:"internal-error",INVALID_PASSWORD:"wrong-password",MISSING_PASSWORD:"missing-password",INVALID_LOGIN_CREDENTIALS:"invalid-credential",EMAIL_EXISTS:"email-already-in-use",PASSWORD_LOGIN_DISABLED:"operation-not-allowed",INVALID_IDP_RESPONSE:"invalid-credential",INVALID_PENDING_TOKEN:"invalid-credential",FEDERATED_USER_ID_ALREADY_LINKED:"credential-already-in-use",MISSING_REQ_TYPE:"internal-error",EMAIL_NOT_FOUND:"user-not-found",RESET_PASSWORD_EXCEED_LIMIT:"too-many-requests",EXPIRED_OOB_CODE:"expired-action-code",INVALID_OOB_CODE:"invalid-action-code",MISSING_OOB_CODE:"internal-error",CREDENTIAL_TOO_OLD_LOGIN_AGAIN:"requires-recent-login",INVALID_ID_TOKEN:"invalid-user-token",TOKEN_EXPIRED:"user-token-expired",USER_NOT_FOUND:"user-token-expired",TOO_MANY_ATTEMPTS_TRY_LATER:"too-many-requests",PASSWORD_DOES_NOT_MEET_REQUIREMENTS:"password-does-not-meet-requirements",INVALID_CODE:"invalid-verification-code",INVALID_SESSION_INFO:"invalid-verification-id",INVALID_TEMPORARY_PROOF:"invalid-credential",MISSING_SESSION_INFO:"missing-verification-id",SESSION_EXPIRED:"code-expired",MISSING_ANDROID_PACKAGE_NAME:"missing-android-pkg-name",UNAUTHORIZED_DOMAIN:"unauthorized-continue-uri",INVALID_OAUTH_CLIENT_ID:"invalid-oauth-client-id",ADMIN_ONLY_OPERATION:"admin-restricted-operation",INVALID_MFA_PENDING_CREDENTIAL:"invalid-multi-factor-session",MFA_ENROLLMENT_NOT_FOUND:"multi-factor-info-not-found",MISSING_MFA_ENROLLMENT_ID:"missing-multi-factor-info",MISSING_MFA_PENDING_CREDENTIAL:"missing-multi-factor-session",SECOND_FACTOR_EXISTS:"second-factor-already-in-use",SECOND_FACTOR_LIMIT_EXCEEDED:"maximum-second-factor-count-exceeded",BLOCKING_FUNCTION_ERROR_RESPONSE:"internal-error",RECAPTCHA_NOT_ENABLED:"recaptcha-not-enabled",MISSING_RECAPTCHA_TOKEN:"missing-recaptcha-token",INVALID_RECAPTCHA_TOKEN:"invalid-recaptcha-token",INVALID_RECAPTCHA_ACTION:"invalid-recaptcha-action",MISSING_CLIENT_TYPE:"missing-client-type",MISSING_RECAPTCHA_VERSION:"missing-recaptcha-version",INVALID_RECAPTCHA_VERSION:"invalid-recaptcha-version",INVALID_REQ_TYPE:"invalid-req-type"};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const mR=["/v1/accounts:signInWithCustomToken","/v1/accounts:signInWithEmailLink","/v1/accounts:signInWithIdp","/v1/accounts:signInWithPassword","/v1/accounts:signInWithPhoneNumber","/v1/token"],_R=new zr(3e4,6e4);function Hl(t,e){return t.tenantId&&!e.tenantId?{...e,tenantId:t.tenantId}:e}async function Us(t,e,n,s,r={}){return Zg(t,r,async()=>{let i={},o={};s&&(e==="GET"?o=s:i={body:JSON.stringify(s)});const a=Ls({key:t.config.apiKey,...o}).slice(1),c=await t._getAdditionalHeaders();c["Content-Type"]="application/json",t.languageCode&&(c["X-Firebase-Locale"]=t.languageCode);const l={method:e,headers:c,...i};return Mb()||(l.referrerPolicy="no-referrer"),t.emulatorConfig&&Ns(t.emulatorConfig.host)&&(l.credentials="include"),Qg.fetch()(await em(t,t.config.apiHost,n,a),l)})}async function Zg(t,e,n){t._canInitEmulator=!1;const s={...gR,...e};try{const r=new vR(t),i=await Promise.race([n(),r.promise]);r.clearNetworkTimeout();const o=await i.json();if("needConfirmation"in o)throw ai(t,"account-exists-with-different-credential",o);if(i.ok&&!("errorMessage"in o))return o;{const a=i.ok?o.errorMessage:o.error.message,[c,l]=a.split(" : ");if(c==="FEDERATED_USER_ID_ALREADY_LINKED")throw ai(t,"credential-already-in-use",o);if(c==="EMAIL_EXISTS")throw ai(t,"email-already-in-use",o);if(c==="USER_DISABLED")throw ai(t,"user-disabled",o);const u=s[c]||c.toLowerCase().replace(/[_\s]+/g,"-");if(l)throw Ul(t,u,l);ft(t,u)}}catch(r){if(r instanceof ln)throw r;ft(t,"network-request-failed",{message:String(r)})}}async function yR(t,e,n,s,r={}){const i=await Us(t,e,n,s,r);return"mfaPendingCredential"in i&&ft(t,"multi-factor-auth-required",{_serverResponse:i}),i}async function em(t,e,n,s){const r=`${e}${n}?${s}`,i=t,o=i.config.emulator?Bl(t.config,r):`${t.config.apiScheme}://${r}`;return mR.includes(n)&&(await i._persistenceManagerAvailable,i._getPersistenceType()==="COOKIE")?i._getPersistence()._getFinalTarget(o).toString():o}class vR{clearNetworkTimeout(){clearTimeout(this.timer)}constructor(e){this.auth=e,this.timer=null,this.promise=new Promise((n,s)=>{this.timer=setTimeout(()=>s(tt(this.auth,"network-request-failed")),_R.get())})}}function ai(t,e,n){const s={appName:t.name};n.email&&(s.email=n.email),n.phoneNumber&&(s.phoneNumber=n.phoneNumber);const r=tt(t,e,s);return r.customData._tokenResponse=n,r}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function ER(t,e){return Us(t,"POST","/v1/accounts:delete",e)}async function Yi(t,e){return Us(t,"POST","/v1/accounts:lookup",e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function or(t){if(t)try{const e=new Date(Number(t));if(!isNaN(e.getTime()))return e.toUTCString()}catch{}}async function wR(t,e=!1){const n=me(t),s=await n.getIdToken(e),r=Wl(s);S(r&&r.exp&&r.auth_time&&r.iat,n.auth,"internal-error");const i=typeof r.firebase=="object"?r.firebase:void 0,o=i?.sign_in_provider;return{claims:r,token:s,authTime:or(_a(r.auth_time)),issuedAtTime:or(_a(r.iat)),expirationTime:or(_a(r.exp)),signInProvider:o||null,signInSecondFactor:i?.sign_in_second_factor||null}}function _a(t){return Number(t)*1e3}function Wl(t){const[e,n,s]=t.split(".");if(e===void 0||n===void 0||s===void 0)return _i("JWT malformed, contained fewer than 3 sections"),null;try{const r=Ri(n);return r?JSON.parse(r):(_i("Failed to decode base64 JWT payload"),null)}catch(r){return _i("Caught error parsing JWT payload as JSON",r?.toString()),null}}function Eh(t){const e=Wl(t);return S(e,"internal-error"),S(typeof e.exp<"u","internal-error"),S(typeof e.iat<"u","internal-error"),Number(e.exp)-Number(e.iat)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Ir(t,e,n=!1){if(n)return e;try{return await e}catch(s){throw s instanceof ln&&bR(s)&&t.auth.currentUser===t&&await t.auth.signOut(),s}}function bR({code:t}){return t==="auth/user-disabled"||t==="auth/user-token-expired"}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class CR{constructor(e){this.user=e,this.isRunning=!1,this.timerId=null,this.errorBackoff=3e4}_start(){this.isRunning||(this.isRunning=!0,this.schedule())}_stop(){this.isRunning&&(this.isRunning=!1,this.timerId!==null&&clearTimeout(this.timerId))}getInterval(e){if(e){const n=this.errorBackoff;return this.errorBackoff=Math.min(this.errorBackoff*2,96e4),n}else{this.errorBackoff=3e4;const s=(this.user.stsTokenManager.expirationTime??0)-Date.now()-3e5;return Math.max(0,s)}}schedule(e=!1){if(!this.isRunning)return;const n=this.getInterval(e);this.timerId=setTimeout(async()=>{await this.iteration()},n)}async iteration(){try{await this.user.getIdToken(!0)}catch(e){e?.code==="auth/network-request-failed"&&this.schedule(!0);return}this.schedule()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class fc{constructor(e,n){this.createdAt=e,this.lastLoginAt=n,this._initializeTime()}_initializeTime(){this.lastSignInTime=or(this.lastLoginAt),this.creationTime=or(this.createdAt)}_copy(e){this.createdAt=e.createdAt,this.lastLoginAt=e.lastLoginAt,this._initializeTime()}toJSON(){return{createdAt:this.createdAt,lastLoginAt:this.lastLoginAt}}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Ki(t){const e=t.auth,n=await t.getIdToken(),s=await Ir(t,Yi(e,{idToken:n}));S(s?.users.length,e,"internal-error");const r=s.users[0];t._notifyReloadListener(r);const i=r.providerUserInfo?.length?tm(r.providerUserInfo):[],o=TR(t.providerData,i),a=t.isAnonymous,c=!(t.email&&r.passwordHash)&&!o?.length,l=a?c:!1,u={uid:r.localId,displayName:r.displayName||null,photoURL:r.photoUrl||null,email:r.email||null,emailVerified:r.emailVerified||!1,phoneNumber:r.phoneNumber||null,tenantId:r.tenantId||null,providerData:o,metadata:new fc(r.createdAt,r.lastLoginAt),isAnonymous:l};Object.assign(t,u)}async function SR(t){const e=me(t);await Ki(e),await e.auth._persistUserIfCurrent(e),e.auth._notifyListenersIfCurrent(e)}function TR(t,e){return[...t.filter(s=>!e.some(r=>r.providerId===s.providerId)),...e]}function tm(t){return t.map(({providerId:e,...n})=>({providerId:e,uid:n.rawId||"",displayName:n.displayName||null,email:n.email||null,phoneNumber:n.phoneNumber||null,photoURL:n.photoUrl||null}))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function IR(t,e){const n=await Zg(t,{},async()=>{const s=Ls({grant_type:"refresh_token",refresh_token:e}).slice(1),{tokenApiHost:r,apiKey:i}=t.config,o=await em(t,r,"/v1/token",`key=${i}`),a=await t._getAdditionalHeaders();a["Content-Type"]="application/x-www-form-urlencoded";const c={method:"POST",headers:a,body:s};return t.emulatorConfig&&Ns(t.emulatorConfig.host)&&(c.credentials="include"),Qg.fetch()(o,c)});return{accessToken:n.access_token,expiresIn:n.expires_in,refreshToken:n.refresh_token}}async function kR(t,e){return Us(t,"POST","/v2/accounts:revokeToken",Hl(t,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class es{constructor(){this.refreshToken=null,this.accessToken=null,this.expirationTime=null}get isExpired(){return!this.expirationTime||Date.now()>this.expirationTime-3e4}updateFromServerResponse(e){S(e.idToken,"internal-error"),S(typeof e.idToken<"u","internal-error"),S(typeof e.refreshToken<"u","internal-error");const n="expiresIn"in e&&typeof e.expiresIn<"u"?Number(e.expiresIn):Eh(e.idToken);this.updateTokensAndExpiration(e.idToken,e.refreshToken,n)}updateFromIdToken(e){S(e.length!==0,"internal-error");const n=Eh(e);this.updateTokensAndExpiration(e,null,n)}async getToken(e,n=!1){return!n&&this.accessToken&&!this.isExpired?this.accessToken:(S(this.refreshToken,e,"user-token-expired"),this.refreshToken?(await this.refresh(e,this.refreshToken),this.accessToken):null)}clearRefreshToken(){this.refreshToken=null}async refresh(e,n){const{accessToken:s,refreshToken:r,expiresIn:i}=await IR(e,n);this.updateTokensAndExpiration(s,r,Number(i))}updateTokensAndExpiration(e,n,s){this.refreshToken=n||null,this.accessToken=e||null,this.expirationTime=Date.now()+s*1e3}static fromJSON(e,n){const{refreshToken:s,accessToken:r,expirationTime:i}=n,o=new es;return s&&(S(typeof s=="string","internal-error",{appName:e}),o.refreshToken=s),r&&(S(typeof r=="string","internal-error",{appName:e}),o.accessToken=r),i&&(S(typeof i=="number","internal-error",{appName:e}),o.expirationTime=i),o}toJSON(){return{refreshToken:this.refreshToken,accessToken:this.accessToken,expirationTime:this.expirationTime}}_assign(e){this.accessToken=e.accessToken,this.refreshToken=e.refreshToken,this.expirationTime=e.expirationTime}_clone(){return Object.assign(new es,this.toJSON())}_performRefresh(){return yt("not implemented")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ft(t,e){S(typeof t=="string"||typeof t>"u","internal-error",{appName:e})}class Xe{constructor({uid:e,auth:n,stsTokenManager:s,...r}){this.providerId="firebase",this.proactiveRefresh=new CR(this),this.reloadUserInfo=null,this.reloadListener=null,this.uid=e,this.auth=n,this.stsTokenManager=s,this.accessToken=s.accessToken,this.displayName=r.displayName||null,this.email=r.email||null,this.emailVerified=r.emailVerified||!1,this.phoneNumber=r.phoneNumber||null,this.photoURL=r.photoURL||null,this.isAnonymous=r.isAnonymous||!1,this.tenantId=r.tenantId||null,this.providerData=r.providerData?[...r.providerData]:[],this.metadata=new fc(r.createdAt||void 0,r.lastLoginAt||void 0)}async getIdToken(e){const n=await Ir(this,this.stsTokenManager.getToken(this.auth,e));return S(n,this.auth,"internal-error"),this.accessToken!==n&&(this.accessToken=n,await this.auth._persistUserIfCurrent(this),this.auth._notifyListenersIfCurrent(this)),n}getIdTokenResult(e){return wR(this,e)}reload(){return SR(this)}_assign(e){this!==e&&(S(this.uid===e.uid,this.auth,"internal-error"),this.displayName=e.displayName,this.photoURL=e.photoURL,this.email=e.email,this.emailVerified=e.emailVerified,this.phoneNumber=e.phoneNumber,this.isAnonymous=e.isAnonymous,this.tenantId=e.tenantId,this.providerData=e.providerData.map(n=>({...n})),this.metadata._copy(e.metadata),this.stsTokenManager._assign(e.stsTokenManager))}_clone(e){const n=new Xe({...this,auth:e,stsTokenManager:this.stsTokenManager._clone()});return n.metadata._copy(this.metadata),n}_onReload(e){S(!this.reloadListener,this.auth,"internal-error"),this.reloadListener=e,this.reloadUserInfo&&(this._notifyReloadListener(this.reloadUserInfo),this.reloadUserInfo=null)}_notifyReloadListener(e){this.reloadListener?this.reloadListener(e):this.reloadUserInfo=e}_startProactiveRefresh(){this.proactiveRefresh._start()}_stopProactiveRefresh(){this.proactiveRefresh._stop()}async _updateTokensIfNecessary(e,n=!1){let s=!1;e.idToken&&e.idToken!==this.stsTokenManager.accessToken&&(this.stsTokenManager.updateFromServerResponse(e),s=!0),n&&await Ki(this),await this.auth._persistUserIfCurrent(this),s&&this.auth._notifyListenersIfCurrent(this)}async delete(){if(Ge(this.auth.app))return Promise.reject(In(this.auth));const e=await this.getIdToken();return await Ir(this,ER(this.auth,{idToken:e})),this.stsTokenManager.clearRefreshToken(),this.auth.signOut()}toJSON(){return{uid:this.uid,email:this.email||void 0,emailVerified:this.emailVerified,displayName:this.displayName||void 0,isAnonymous:this.isAnonymous,photoURL:this.photoURL||void 0,phoneNumber:this.phoneNumber||void 0,tenantId:this.tenantId||void 0,providerData:this.providerData.map(e=>({...e})),stsTokenManager:this.stsTokenManager.toJSON(),_redirectEventId:this._redirectEventId,...this.metadata.toJSON(),apiKey:this.auth.config.apiKey,appName:this.auth.name}}get refreshToken(){return this.stsTokenManager.refreshToken||""}static _fromJSON(e,n){const s=n.displayName??void 0,r=n.email??void 0,i=n.phoneNumber??void 0,o=n.photoURL??void 0,a=n.tenantId??void 0,c=n._redirectEventId??void 0,l=n.createdAt??void 0,u=n.lastLoginAt??void 0,{uid:d,emailVerified:h,isAnonymous:f,providerData:p,stsTokenManager:_}=n;S(d&&_,e,"internal-error");const m=es.fromJSON(this.name,_);S(typeof d=="string",e,"internal-error"),Ft(s,e.name),Ft(r,e.name),S(typeof h=="boolean",e,"internal-error"),S(typeof f=="boolean",e,"internal-error"),Ft(i,e.name),Ft(o,e.name),Ft(a,e.name),Ft(c,e.name),Ft(l,e.name),Ft(u,e.name);const A=new Xe({uid:d,auth:e,email:r,emailVerified:h,displayName:s,isAnonymous:f,photoURL:o,phoneNumber:i,tenantId:a,stsTokenManager:m,createdAt:l,lastLoginAt:u});return p&&Array.isArray(p)&&(A.providerData=p.map(B=>({...B}))),c&&(A._redirectEventId=c),A}static async _fromIdTokenResponse(e,n,s=!1){const r=new es;r.updateFromServerResponse(n);const i=new Xe({uid:n.localId,auth:e,stsTokenManager:r,isAnonymous:s});return await Ki(i),i}static async _fromGetAccountInfoResponse(e,n,s){const r=n.users[0];S(r.localId!==void 0,"internal-error");const i=r.providerUserInfo!==void 0?tm(r.providerUserInfo):[],o=!(r.email&&r.passwordHash)&&!i?.length,a=new es;a.updateFromIdToken(s);const c=new Xe({uid:r.localId,auth:e,stsTokenManager:a,isAnonymous:o}),l={uid:r.localId,displayName:r.displayName||null,photoURL:r.photoUrl||null,email:r.email||null,emailVerified:r.emailVerified||!1,phoneNumber:r.phoneNumber||null,tenantId:r.tenantId||null,providerData:i,metadata:new fc(r.createdAt,r.lastLoginAt),isAnonymous:!(r.email&&r.passwordHash)&&!i?.length};return Object.assign(c,l),c}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const wh=new Map;function vt(t){Pt(t instanceof Function,"Expected a class definition");let e=wh.get(t);return e?(Pt(e instanceof t,"Instance stored in cache mismatched with class"),e):(e=new t,wh.set(t,e),e)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class nm{constructor(){this.type="NONE",this.storage={}}async _isAvailable(){return!0}async _set(e,n){this.storage[e]=n}async _get(e){const n=this.storage[e];return n===void 0?null:n}async _remove(e){delete this.storage[e]}_addListener(e,n){}_removeListener(e,n){}}nm.type="NONE";const pc=nm;/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function yi(t,e,n){return`firebase:${t}:${e}:${n}`}class ts{constructor(e,n,s){this.persistence=e,this.auth=n,this.userKey=s;const{config:r,name:i}=this.auth;this.fullUserKey=yi(this.userKey,r.apiKey,i),this.fullPersistenceKey=yi("persistence",r.apiKey,i),this.boundEventHandler=n._onStorageEvent.bind(n),this.persistence._addListener(this.fullUserKey,this.boundEventHandler)}setCurrentUser(e){return this.persistence._set(this.fullUserKey,e.toJSON())}async getCurrentUser(){const e=await this.persistence._get(this.fullUserKey);if(!e)return null;if(typeof e=="string"){const n=await Yi(this.auth,{idToken:e}).catch(()=>{});return n?Xe._fromGetAccountInfoResponse(this.auth,n,e):null}return Xe._fromJSON(this.auth,e)}removeCurrentUser(){return this.persistence._remove(this.fullUserKey)}savePersistenceForRedirect(){return this.persistence._set(this.fullPersistenceKey,this.persistence.type)}async setPersistence(e){if(this.persistence===e)return;const n=await this.getCurrentUser();if(await this.removeCurrentUser(),this.persistence=e,n)return this.setCurrentUser(n)}delete(){this.persistence._removeListener(this.fullUserKey,this.boundEventHandler)}static async create(e,n,s="authUser"){if(!n.length)return new ts(vt(pc),e,s);const r=(await Promise.all(n.map(async l=>{if(await l._isAvailable())return l}))).filter(l=>l);let i=r[0]||vt(pc);const o=yi(s,e.config.apiKey,e.name);let a=null;for(const l of n)try{const u=await l._get(o);if(u){let d;if(typeof u=="string"){const h=await Yi(e,{idToken:u}).catch(()=>{});if(!h)break;d=await Xe._fromGetAccountInfoResponse(e,h,u)}else d=Xe._fromJSON(e,u);l!==i&&(a=d),i=l;break}}catch{}const c=r.filter(l=>l._shouldAllowMigration);return!i._shouldAllowMigration||!c.length?new ts(i,e,s):(i=c[0],a&&await i._set(o,a.toJSON()),await Promise.all(n.map(async l=>{if(l!==i)try{await l._remove(o)}catch{}})),new ts(i,e,s))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function bh(t){const e=t.toLowerCase();if(e.includes("opera/")||e.includes("opr/")||e.includes("opios/"))return"Opera";if(om(e))return"IEMobile";if(e.includes("msie")||e.includes("trident/"))return"IE";if(e.includes("edge/"))return"Edge";if(sm(e))return"Firefox";if(e.includes("silk/"))return"Silk";if(cm(e))return"Blackberry";if(lm(e))return"Webos";if(rm(e))return"Safari";if((e.includes("chrome/")||im(e))&&!e.includes("edge/"))return"Chrome";if(am(e))return"Android";{const n=/([a-zA-Z\d\.]+)\/[a-zA-Z\d\.]*$/,s=t.match(n);if(s?.length===2)return s[1]}return"Other"}function sm(t=Re()){return/firefox\//i.test(t)}function rm(t=Re()){const e=t.toLowerCase();return e.includes("safari/")&&!e.includes("chrome/")&&!e.includes("crios/")&&!e.includes("android")}function im(t=Re()){return/crios\//i.test(t)}function om(t=Re()){return/iemobile/i.test(t)}function am(t=Re()){return/android/i.test(t)}function cm(t=Re()){return/blackberry/i.test(t)}function lm(t=Re()){return/webos/i.test(t)}function Vl(t=Re()){return/iphone|ipad|ipod/i.test(t)||/macintosh/i.test(t)&&/mobile/i.test(t)}function RR(t=Re()){return Vl(t)&&!!window.navigator?.standalone}function AR(){return Ub()&&document.documentMode===10}function um(t=Re()){return Vl(t)||am(t)||lm(t)||cm(t)||/windows phone/i.test(t)||om(t)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function dm(t,e=[]){let n;switch(t){case"Browser":n=bh(Re());break;case"Worker":n=`${bh(Re())}-${t}`;break;default:n=t}const s=e.length?e.join(","):"FirebaseCore-web";return`${n}/JsCore/${Os}/${s}`}/**
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
 */class NR{constructor(e){this.auth=e,this.queue=[]}pushCallback(e,n){const s=i=>new Promise((o,a)=>{try{const c=e(i);o(c)}catch(c){a(c)}});s.onAbort=n,this.queue.push(s);const r=this.queue.length-1;return()=>{this.queue[r]=()=>Promise.resolve()}}async runMiddleware(e){if(this.auth.currentUser===e)return;const n=[];try{for(const s of this.queue)await s(e),s.onAbort&&n.push(s.onAbort)}catch(s){n.reverse();for(const r of n)try{r()}catch{}throw this.auth._errorFactory.create("login-blocked",{originalMessage:s?.message})}}}/**
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
 */async function PR(t,e={}){return Us(t,"GET","/v2/passwordPolicy",Hl(t,e))}/**
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
 */const LR=6;class OR{constructor(e){const n=e.customStrengthOptions;this.customStrengthOptions={},this.customStrengthOptions.minPasswordLength=n.minPasswordLength??LR,n.maxPasswordLength&&(this.customStrengthOptions.maxPasswordLength=n.maxPasswordLength),n.containsLowercaseCharacter!==void 0&&(this.customStrengthOptions.containsLowercaseLetter=n.containsLowercaseCharacter),n.containsUppercaseCharacter!==void 0&&(this.customStrengthOptions.containsUppercaseLetter=n.containsUppercaseCharacter),n.containsNumericCharacter!==void 0&&(this.customStrengthOptions.containsNumericCharacter=n.containsNumericCharacter),n.containsNonAlphanumericCharacter!==void 0&&(this.customStrengthOptions.containsNonAlphanumericCharacter=n.containsNonAlphanumericCharacter),this.enforcementState=e.enforcementState,this.enforcementState==="ENFORCEMENT_STATE_UNSPECIFIED"&&(this.enforcementState="OFF"),this.allowedNonAlphanumericCharacters=e.allowedNonAlphanumericCharacters?.join("")??"",this.forceUpgradeOnSignin=e.forceUpgradeOnSignin??!1,this.schemaVersion=e.schemaVersion}validatePassword(e){const n={isValid:!0,passwordPolicy:this};return this.validatePasswordLengthOptions(e,n),this.validatePasswordCharacterOptions(e,n),n.isValid&&(n.isValid=n.meetsMinPasswordLength??!0),n.isValid&&(n.isValid=n.meetsMaxPasswordLength??!0),n.isValid&&(n.isValid=n.containsLowercaseLetter??!0),n.isValid&&(n.isValid=n.containsUppercaseLetter??!0),n.isValid&&(n.isValid=n.containsNumericCharacter??!0),n.isValid&&(n.isValid=n.containsNonAlphanumericCharacter??!0),n}validatePasswordLengthOptions(e,n){const s=this.customStrengthOptions.minPasswordLength,r=this.customStrengthOptions.maxPasswordLength;s&&(n.meetsMinPasswordLength=e.length>=s),r&&(n.meetsMaxPasswordLength=e.length<=r)}validatePasswordCharacterOptions(e,n){this.updatePasswordCharacterOptionsStatuses(n,!1,!1,!1,!1);let s;for(let r=0;r<e.length;r++)s=e.charAt(r),this.updatePasswordCharacterOptionsStatuses(n,s>="a"&&s<="z",s>="A"&&s<="Z",s>="0"&&s<="9",this.allowedNonAlphanumericCharacters.includes(s))}updatePasswordCharacterOptionsStatuses(e,n,s,r,i){this.customStrengthOptions.containsLowercaseLetter&&(e.containsLowercaseLetter||(e.containsLowercaseLetter=n)),this.customStrengthOptions.containsUppercaseLetter&&(e.containsUppercaseLetter||(e.containsUppercaseLetter=s)),this.customStrengthOptions.containsNumericCharacter&&(e.containsNumericCharacter||(e.containsNumericCharacter=r)),this.customStrengthOptions.containsNonAlphanumericCharacter&&(e.containsNonAlphanumericCharacter||(e.containsNonAlphanumericCharacter=i))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class DR{constructor(e,n,s,r){this.app=e,this.heartbeatServiceProvider=n,this.appCheckServiceProvider=s,this.config=r,this.currentUser=null,this.emulatorConfig=null,this.operations=Promise.resolve(),this.authStateSubscription=new Ch(this),this.idTokenSubscription=new Ch(this),this.beforeStateQueue=new NR(this),this.redirectUser=null,this.isProactiveRefreshEnabled=!1,this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION=1,this._canInitEmulator=!0,this._isInitialized=!1,this._deleted=!1,this._initializationPromise=null,this._popupRedirectResolver=null,this._errorFactory=Xg,this._agentRecaptchaConfig=null,this._tenantRecaptchaConfigs={},this._projectPasswordPolicy=null,this._tenantPasswordPolicies={},this._resolvePersistenceManagerAvailable=void 0,this.lastNotifiedUid=void 0,this.languageCode=null,this.tenantId=null,this.settings={appVerificationDisabledForTesting:!1},this.frameworks=[],this.name=e.name,this.clientVersion=r.sdkClientVersion,this._persistenceManagerAvailable=new Promise(i=>this._resolvePersistenceManagerAvailable=i)}_initializeWithPersistence(e,n){return n&&(this._popupRedirectResolver=vt(n)),this._initializationPromise=this.queue(async()=>{if(!this._deleted&&(this.persistenceManager=await ts.create(this,e),this._resolvePersistenceManagerAvailable?.(),!this._deleted)){if(this._popupRedirectResolver?._shouldInitProactively)try{await this._popupRedirectResolver._initialize(this)}catch{}await this.initializeCurrentUser(n),this.lastNotifiedUid=this.currentUser?.uid||null,!this._deleted&&(this._isInitialized=!0)}}),this._initializationPromise}async _onStorageEvent(){if(this._deleted)return;const e=await this.assertedPersistence.getCurrentUser();if(!(!this.currentUser&&!e)){if(this.currentUser&&e&&this.currentUser.uid===e.uid){this._currentUser._assign(e),await this.currentUser.getIdToken();return}await this._updateCurrentUser(e,!0)}}async initializeCurrentUserFromIdToken(e){try{const n=await Yi(this,{idToken:e}),s=await Xe._fromGetAccountInfoResponse(this,n,e);await this.directlySetCurrentUser(s)}catch(n){console.warn("FirebaseServerApp could not login user with provided authIdToken: ",n),await this.directlySetCurrentUser(null)}}async initializeCurrentUser(e){if(Ge(this.app)){const i=this.app.settings.authIdToken;return i?new Promise(o=>{setTimeout(()=>this.initializeCurrentUserFromIdToken(i).then(o,o))}):this.directlySetCurrentUser(null)}const n=await this.assertedPersistence.getCurrentUser();let s=n,r=!1;if(e&&this.config.authDomain){await this.getOrInitRedirectPersistenceManager();const i=this.redirectUser?._redirectEventId,o=s?._redirectEventId,a=await this.tryRedirectSignIn(e);(!i||i===o)&&a?.user&&(s=a.user,r=!0)}if(!s)return this.directlySetCurrentUser(null);if(!s._redirectEventId){if(r)try{await this.beforeStateQueue.runMiddleware(s)}catch(i){s=n,this._popupRedirectResolver._overrideRedirectResult(this,()=>Promise.reject(i))}return s?this.reloadAndSetCurrentUserOrClear(s):this.directlySetCurrentUser(null)}return S(this._popupRedirectResolver,this,"argument-error"),await this.getOrInitRedirectPersistenceManager(),this.redirectUser&&this.redirectUser._redirectEventId===s._redirectEventId?this.directlySetCurrentUser(s):this.reloadAndSetCurrentUserOrClear(s)}async tryRedirectSignIn(e){let n=null;try{n=await this._popupRedirectResolver._completeRedirectFn(this,e,!0)}catch{await this._setRedirectUser(null)}return n}async reloadAndSetCurrentUserOrClear(e){try{await Ki(e)}catch(n){if(n?.code!=="auth/network-request-failed")return this.directlySetCurrentUser(null)}return this.directlySetCurrentUser(e)}useDeviceLanguage(){this.languageCode=pR()}async _delete(){this._deleted=!0}async updateCurrentUser(e){if(Ge(this.app))return Promise.reject(In(this));const n=e?me(e):null;return n&&S(n.auth.config.apiKey===this.config.apiKey,this,"invalid-user-token"),this._updateCurrentUser(n&&n._clone(this))}async _updateCurrentUser(e,n=!1){if(!this._deleted)return e&&S(this.tenantId===e.tenantId,this,"tenant-id-mismatch"),n||await this.beforeStateQueue.runMiddleware(e),this.queue(async()=>{await this.directlySetCurrentUser(e),this.notifyAuthListeners()})}async signOut(){return Ge(this.app)?Promise.reject(In(this)):(await this.beforeStateQueue.runMiddleware(null),(this.redirectPersistenceManager||this._popupRedirectResolver)&&await this._setRedirectUser(null),this._updateCurrentUser(null,!0))}setPersistence(e){return Ge(this.app)?Promise.reject(In(this)):this.queue(async()=>{await this.assertedPersistence.setPersistence(vt(e))})}_getRecaptchaConfig(){return this.tenantId==null?this._agentRecaptchaConfig:this._tenantRecaptchaConfigs[this.tenantId]}async validatePassword(e){this._getPasswordPolicyInternal()||await this._updatePasswordPolicy();const n=this._getPasswordPolicyInternal();return n.schemaVersion!==this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION?Promise.reject(this._errorFactory.create("unsupported-password-policy-schema-version",{})):n.validatePassword(e)}_getPasswordPolicyInternal(){return this.tenantId===null?this._projectPasswordPolicy:this._tenantPasswordPolicies[this.tenantId]}async _updatePasswordPolicy(){const e=await PR(this),n=new OR(e);this.tenantId===null?this._projectPasswordPolicy=n:this._tenantPasswordPolicies[this.tenantId]=n}_getPersistenceType(){return this.assertedPersistence.persistence.type}_getPersistence(){return this.assertedPersistence.persistence}_updateErrorMap(e){this._errorFactory=new Ps("auth","Firebase",e())}onAuthStateChanged(e,n,s){return this.registerStateListener(this.authStateSubscription,e,n,s)}beforeAuthStateChanged(e,n){return this.beforeStateQueue.pushCallback(e,n)}onIdTokenChanged(e,n,s){return this.registerStateListener(this.idTokenSubscription,e,n,s)}authStateReady(){return new Promise((e,n)=>{if(this.currentUser)e();else{const s=this.onAuthStateChanged(()=>{s(),e()},n)}})}async revokeAccessToken(e){if(this.currentUser){const n=await this.currentUser.getIdToken(),s={providerId:"apple.com",tokenType:"ACCESS_TOKEN",token:e,idToken:n};this.tenantId!=null&&(s.tenantId=this.tenantId),await kR(this,s)}}toJSON(){return{apiKey:this.config.apiKey,authDomain:this.config.authDomain,appName:this.name,currentUser:this._currentUser?.toJSON()}}async _setRedirectUser(e,n){const s=await this.getOrInitRedirectPersistenceManager(n);return e===null?s.removeCurrentUser():s.setCurrentUser(e)}async getOrInitRedirectPersistenceManager(e){if(!this.redirectPersistenceManager){const n=e&&vt(e)||this._popupRedirectResolver;S(n,this,"argument-error"),this.redirectPersistenceManager=await ts.create(this,[vt(n._redirectPersistence)],"redirectUser"),this.redirectUser=await this.redirectPersistenceManager.getCurrentUser()}return this.redirectPersistenceManager}async _redirectUserForId(e){return this._isInitialized&&await this.queue(async()=>{}),this._currentUser?._redirectEventId===e?this._currentUser:this.redirectUser?._redirectEventId===e?this.redirectUser:null}async _persistUserIfCurrent(e){if(e===this.currentUser)return this.queue(async()=>this.directlySetCurrentUser(e))}_notifyListenersIfCurrent(e){e===this.currentUser&&this.notifyAuthListeners()}_key(){return`${this.config.authDomain}:${this.config.apiKey}:${this.name}`}_startProactiveRefresh(){this.isProactiveRefreshEnabled=!0,this.currentUser&&this._currentUser._startProactiveRefresh()}_stopProactiveRefresh(){this.isProactiveRefreshEnabled=!1,this.currentUser&&this._currentUser._stopProactiveRefresh()}get _currentUser(){return this.currentUser}notifyAuthListeners(){if(!this._isInitialized)return;this.idTokenSubscription.next(this.currentUser);const e=this.currentUser?.uid??null;this.lastNotifiedUid!==e&&(this.lastNotifiedUid=e,this.authStateSubscription.next(this.currentUser))}registerStateListener(e,n,s,r){if(this._deleted)return()=>{};const i=typeof n=="function"?n:n.next.bind(n);let o=!1;const a=this._isInitialized?Promise.resolve():this._initializationPromise;if(S(a,this,"internal-error"),a.then(()=>{o||i(this.currentUser)}),typeof n=="function"){const c=e.addObserver(n,s,r);return()=>{o=!0,c()}}else{const c=e.addObserver(n);return()=>{o=!0,c()}}}async directlySetCurrentUser(e){this.currentUser&&this.currentUser!==e&&this._currentUser._stopProactiveRefresh(),e&&this.isProactiveRefreshEnabled&&e._startProactiveRefresh(),this.currentUser=e,e?await this.assertedPersistence.setCurrentUser(e):await this.assertedPersistence.removeCurrentUser()}queue(e){return this.operations=this.operations.then(e,e),this.operations}get assertedPersistence(){return S(this.persistenceManager,this,"internal-error"),this.persistenceManager}_logFramework(e){!e||this.frameworks.includes(e)||(this.frameworks.push(e),this.frameworks.sort(),this.clientVersion=dm(this.config.clientPlatform,this._getFrameworks()))}_getFrameworks(){return this.frameworks}async _getAdditionalHeaders(){const e={"X-Client-Version":this.clientVersion};this.app.options.appId&&(e["X-Firebase-gmpid"]=this.app.options.appId);const n=await this.heartbeatServiceProvider.getImmediate({optional:!0})?.getHeartbeatsHeader();n&&(e["X-Firebase-Client"]=n);const s=await this._getAppCheckToken();return s&&(e["X-Firebase-AppCheck"]=s),e}async _getAppCheckToken(){if(Ge(this.app)&&this.app.settings.appCheckToken)return this.app.settings.appCheckToken;const e=await this.appCheckServiceProvider.getImmediate({optional:!0})?.getToken();return e?.error&&uR(`Error while retrieving App Check token: ${e.error}`),e?.token}}function $s(t){return me(t)}class Ch{constructor(e){this.auth=e,this.observer=null,this.addObserver=Gb(n=>this.observer=n)}get next(){return S(this.observer,this.auth,"internal-error"),this.observer.next.bind(this.observer)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let jl={async loadJS(){throw new Error("Unable to load external scripts")},recaptchaV2Script:"",recaptchaEnterpriseScript:"",gapiScript:""};function xR(t){jl=t}function MR(t){return jl.loadJS(t)}function FR(){return jl.gapiScript}function UR(t){return`__${t}${Math.floor(Math.random()*1e6)}`}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function $R(t,e){const n=Ur(t,"auth");if(n.isInitialized()){const r=n.getImmediate(),i=n.getOptions();if(Pn(i,e??{}))return r;ft(r,"already-initialized")}return n.initialize({options:e})}function BR(t,e){const n=e?.persistence||[],s=(Array.isArray(n)?n:[n]).map(vt);e?.errorMap&&t._updateErrorMap(e.errorMap),t._initializeWithPersistence(s,e?.popupRedirectResolver)}function HR(t,e,n){const s=$s(t);S(/^https?:\/\//.test(e),s,"invalid-emulator-scheme");const r=!1,i=hm(e),{host:o,port:a}=WR(e),c=a===null?"":`:${a}`,l={url:`${i}//${o}${c}/`},u=Object.freeze({host:o,port:a,protocol:i.replace(":",""),options:Object.freeze({disableWarnings:r})});if(!s._canInitEmulator){S(s.config.emulator&&s.emulatorConfig,s,"emulator-config-failed"),S(Pn(l,s.config.emulator)&&Pn(u,s.emulatorConfig),s,"emulator-config-failed");return}s.config.emulator=l,s.emulatorConfig=u,s.settings.appVerificationDisabledForTesting=!0,Ns(o)?(rp(`${i}//${o}${c}`),ip("Auth",!0)):VR()}function hm(t){const e=t.indexOf(":");return e<0?"":t.substr(0,e+1)}function WR(t){const e=hm(t),n=/(\/\/)?([^?#/]+)/.exec(t.substr(e.length));if(!n)return{host:"",port:null};const s=n[2].split("@").pop()||"",r=/^(\[[^\]]+\])(:|$)/.exec(s);if(r){const i=r[1];return{host:i,port:Sh(s.substr(i.length+1))}}else{const[i,o]=s.split(":");return{host:i,port:Sh(o)}}}function Sh(t){if(!t)return null;const e=Number(t);return isNaN(e)?null:e}function VR(){function t(){const e=document.createElement("p"),n=e.style;e.innerText="Running in emulator mode. Do not use with production credentials.",n.position="fixed",n.width="100%",n.backgroundColor="#ffffff",n.border=".1em solid #000000",n.color="#b50000",n.bottom="0px",n.left="0px",n.margin="0px",n.zIndex="10000",n.textAlign="center",e.classList.add("firebase-emulator-warning"),document.body.appendChild(e)}typeof console<"u"&&typeof console.info=="function"&&console.info("WARNING: You are using the Auth Emulator, which is intended for local testing only.  Do not use with production credentials."),typeof window<"u"&&typeof document<"u"&&(document.readyState==="loading"?window.addEventListener("DOMContentLoaded",t):t())}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class fm{constructor(e,n){this.providerId=e,this.signInMethod=n}toJSON(){return yt("not implemented")}_getIdTokenResponse(e){return yt("not implemented")}_linkToIdToken(e,n){return yt("not implemented")}_getReauthenticationResolver(e){return yt("not implemented")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function ns(t,e){return yR(t,"POST","/v1/accounts:signInWithIdp",Hl(t,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const jR="http://localhost";class Fn extends fm{constructor(){super(...arguments),this.pendingToken=null}static _fromParams(e){const n=new Fn(e.providerId,e.signInMethod);return e.idToken||e.accessToken?(e.idToken&&(n.idToken=e.idToken),e.accessToken&&(n.accessToken=e.accessToken),e.nonce&&!e.pendingToken&&(n.nonce=e.nonce),e.pendingToken&&(n.pendingToken=e.pendingToken)):e.oauthToken&&e.oauthTokenSecret?(n.accessToken=e.oauthToken,n.secret=e.oauthTokenSecret):ft("argument-error"),n}toJSON(){return{idToken:this.idToken,accessToken:this.accessToken,secret:this.secret,nonce:this.nonce,pendingToken:this.pendingToken,providerId:this.providerId,signInMethod:this.signInMethod}}static fromJSON(e){const n=typeof e=="string"?JSON.parse(e):e,{providerId:s,signInMethod:r,...i}=n;if(!s||!r)return null;const o=new Fn(s,r);return o.idToken=i.idToken||void 0,o.accessToken=i.accessToken||void 0,o.secret=i.secret,o.nonce=i.nonce,o.pendingToken=i.pendingToken||null,o}_getIdTokenResponse(e){const n=this.buildRequest();return ns(e,n)}_linkToIdToken(e,n){const s=this.buildRequest();return s.idToken=n,ns(e,s)}_getReauthenticationResolver(e){const n=this.buildRequest();return n.autoCreate=!1,ns(e,n)}buildRequest(){const e={requestUri:jR,returnSecureToken:!0};if(this.pendingToken)e.pendingToken=this.pendingToken;else{const n={};this.idToken&&(n.id_token=this.idToken),this.accessToken&&(n.access_token=this.accessToken),this.secret&&(n.oauth_token_secret=this.secret),n.providerId=this.providerId,this.nonce&&!this.pendingToken&&(n.nonce=this.nonce),e.postBody=Ls(n)}return e}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ql{constructor(e){this.providerId=e,this.defaultLanguageCode=null,this.customParameters={}}setDefaultLanguage(e){this.defaultLanguageCode=e}setCustomParameters(e){return this.customParameters=e,this}getCustomParameters(){return this.customParameters}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Gr extends ql{constructor(){super(...arguments),this.scopes=[]}addScope(e){return this.scopes.includes(e)||this.scopes.push(e),this}getScopes(){return[...this.scopes]}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ut extends Gr{constructor(){super("facebook.com")}static credential(e){return Fn._fromParams({providerId:Ut.PROVIDER_ID,signInMethod:Ut.FACEBOOK_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return Ut.credentialFromTaggedObject(e)}static credentialFromError(e){return Ut.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return Ut.credential(e.oauthAccessToken)}catch{return null}}}Ut.FACEBOOK_SIGN_IN_METHOD="facebook.com";Ut.PROVIDER_ID="facebook.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ut extends Gr{constructor(){super("google.com"),this.addScope("profile")}static credential(e,n){return Fn._fromParams({providerId:ut.PROVIDER_ID,signInMethod:ut.GOOGLE_SIGN_IN_METHOD,idToken:e,accessToken:n})}static credentialFromResult(e){return ut.credentialFromTaggedObject(e)}static credentialFromError(e){return ut.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthIdToken:n,oauthAccessToken:s}=e;if(!n&&!s)return null;try{return ut.credential(n,s)}catch{return null}}}ut.GOOGLE_SIGN_IN_METHOD="google.com";ut.PROVIDER_ID="google.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class $t extends Gr{constructor(){super("github.com")}static credential(e){return Fn._fromParams({providerId:$t.PROVIDER_ID,signInMethod:$t.GITHUB_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return $t.credentialFromTaggedObject(e)}static credentialFromError(e){return $t.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return $t.credential(e.oauthAccessToken)}catch{return null}}}$t.GITHUB_SIGN_IN_METHOD="github.com";$t.PROVIDER_ID="github.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Bt extends Gr{constructor(){super("twitter.com")}static credential(e,n){return Fn._fromParams({providerId:Bt.PROVIDER_ID,signInMethod:Bt.TWITTER_SIGN_IN_METHOD,oauthToken:e,oauthTokenSecret:n})}static credentialFromResult(e){return Bt.credentialFromTaggedObject(e)}static credentialFromError(e){return Bt.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthAccessToken:n,oauthTokenSecret:s}=e;if(!n||!s)return null;try{return Bt.credential(n,s)}catch{return null}}}Bt.TWITTER_SIGN_IN_METHOD="twitter.com";Bt.PROVIDER_ID="twitter.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Cs{constructor(e){this.user=e.user,this.providerId=e.providerId,this._tokenResponse=e._tokenResponse,this.operationType=e.operationType}static async _fromIdTokenResponse(e,n,s,r=!1){const i=await Xe._fromIdTokenResponse(e,s,r),o=Th(s);return new Cs({user:i,providerId:o,_tokenResponse:s,operationType:n})}static async _forOperation(e,n,s){await e._updateTokensIfNecessary(s,!0);const r=Th(s);return new Cs({user:e,providerId:r,_tokenResponse:s,operationType:n})}}function Th(t){return t.providerId?t.providerId:"phoneNumber"in t?"phone":null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ji extends ln{constructor(e,n,s,r){super(n.code,n.message),this.operationType=s,this.user=r,Object.setPrototypeOf(this,Ji.prototype),this.customData={appName:e.name,tenantId:e.tenantId??void 0,_serverResponse:n.customData._serverResponse,operationType:s}}static _fromErrorAndOperation(e,n,s,r){return new Ji(e,n,s,r)}}function pm(t,e,n,s){return(e==="reauthenticate"?n._getReauthenticationResolver(t):n._getIdTokenResponse(t)).catch(i=>{throw i.code==="auth/multi-factor-auth-required"?Ji._fromErrorAndOperation(t,i,e,s):i})}async function qR(t,e,n=!1){const s=await Ir(t,e._linkToIdToken(t.auth,await t.getIdToken()),n);return Cs._forOperation(t,"link",s)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function zR(t,e,n=!1){const{auth:s}=t;if(Ge(s.app))return Promise.reject(In(s));const r="reauthenticate";try{const i=await Ir(t,pm(s,r,e,t),n);S(i.idToken,s,"internal-error");const o=Wl(i.idToken);S(o,s,"internal-error");const{sub:a}=o;return S(t.uid===a,s,"user-mismatch"),Cs._forOperation(t,r,i)}catch(i){throw i?.code==="auth/user-not-found"&&ft(s,"user-mismatch"),i}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function gm(t,e,n=!1){if(Ge(t.app))return Promise.reject(In(t));const s="signIn",r=await pm(t,s,e),i=await Cs._fromIdTokenResponse(t,s,r);return n||await t._updateCurrentUser(i.user),i}async function GR(t,e){return gm($s(t),e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ya(t,e){return me(t).setPersistence(e)}function YR(t,e,n,s){return me(t).onIdTokenChanged(e,n,s)}function KR(t,e,n){return me(t).beforeAuthStateChanged(e,n)}function mm(t,e,n,s){return me(t).onAuthStateChanged(e,n,s)}function JR(t){return me(t).signOut()}const Xi="__sak";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class _m{constructor(e,n){this.storageRetriever=e,this.type=n}_isAvailable(){try{return this.storage?(this.storage.setItem(Xi,"1"),this.storage.removeItem(Xi),Promise.resolve(!0)):Promise.resolve(!1)}catch{return Promise.resolve(!1)}}_set(e,n){return this.storage.setItem(e,JSON.stringify(n)),Promise.resolve()}_get(e){const n=this.storage.getItem(e);return Promise.resolve(n?JSON.parse(n):null)}_remove(e){return this.storage.removeItem(e),Promise.resolve()}get storage(){return this.storageRetriever()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const XR=1e3,QR=10;class ym extends _m{constructor(){super(()=>window.localStorage,"LOCAL"),this.boundEventHandler=(e,n)=>this.onStorageEvent(e,n),this.listeners={},this.localCache={},this.pollTimer=null,this.fallbackToPolling=um(),this._shouldAllowMigration=!0}forAllChangedKeys(e){for(const n of Object.keys(this.listeners)){const s=this.storage.getItem(n),r=this.localCache[n];s!==r&&e(n,r,s)}}onStorageEvent(e,n=!1){if(!e.key){this.forAllChangedKeys((o,a,c)=>{this.notifyListeners(o,c)});return}const s=e.key;n?this.detachListener():this.stopPolling();const r=()=>{const o=this.storage.getItem(s);!n&&this.localCache[s]===o||this.notifyListeners(s,o)},i=this.storage.getItem(s);AR()&&i!==e.newValue&&e.newValue!==e.oldValue?setTimeout(r,QR):r()}notifyListeners(e,n){this.localCache[e]=n;const s=this.listeners[e];if(s)for(const r of Array.from(s))r(n&&JSON.parse(n))}startPolling(){this.stopPolling(),this.pollTimer=setInterval(()=>{this.forAllChangedKeys((e,n,s)=>{this.onStorageEvent(new StorageEvent("storage",{key:e,oldValue:n,newValue:s}),!0)})},XR)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}attachListener(){window.addEventListener("storage",this.boundEventHandler)}detachListener(){window.removeEventListener("storage",this.boundEventHandler)}_addListener(e,n){Object.keys(this.listeners).length===0&&(this.fallbackToPolling?this.startPolling():this.attachListener()),this.listeners[e]||(this.listeners[e]=new Set,this.localCache[e]=this.storage.getItem(e)),this.listeners[e].add(n)}_removeListener(e,n){this.listeners[e]&&(this.listeners[e].delete(n),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&(this.detachListener(),this.stopPolling())}async _set(e,n){await super._set(e,n),this.localCache[e]=JSON.stringify(n)}async _get(e){const n=await super._get(e);return this.localCache[e]=JSON.stringify(n),n}async _remove(e){await super._remove(e),delete this.localCache[e]}}ym.type="LOCAL";const vm=ym;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Em extends _m{constructor(){super(()=>window.sessionStorage,"SESSION")}_addListener(e,n){}_removeListener(e,n){}}Em.type="SESSION";const wm=Em;/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ZR(t){return Promise.all(t.map(async e=>{try{return{fulfilled:!0,value:await e}}catch(n){return{fulfilled:!1,reason:n}}}))}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Uo{constructor(e){this.eventTarget=e,this.handlersMap={},this.boundEventHandler=this.handleEvent.bind(this)}static _getInstance(e){const n=this.receivers.find(r=>r.isListeningto(e));if(n)return n;const s=new Uo(e);return this.receivers.push(s),s}isListeningto(e){return this.eventTarget===e}async handleEvent(e){const n=e,{eventId:s,eventType:r,data:i}=n.data,o=this.handlersMap[r];if(!o?.size)return;n.ports[0].postMessage({status:"ack",eventId:s,eventType:r});const a=Array.from(o).map(async l=>l(n.origin,i)),c=await ZR(a);n.ports[0].postMessage({status:"done",eventId:s,eventType:r,response:c})}_subscribe(e,n){Object.keys(this.handlersMap).length===0&&this.eventTarget.addEventListener("message",this.boundEventHandler),this.handlersMap[e]||(this.handlersMap[e]=new Set),this.handlersMap[e].add(n)}_unsubscribe(e,n){this.handlersMap[e]&&n&&this.handlersMap[e].delete(n),(!n||this.handlersMap[e].size===0)&&delete this.handlersMap[e],Object.keys(this.handlersMap).length===0&&this.eventTarget.removeEventListener("message",this.boundEventHandler)}}Uo.receivers=[];/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function zl(t="",e=10){let n="";for(let s=0;s<e;s++)n+=Math.floor(Math.random()*10);return t+n}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class eA{constructor(e){this.target=e,this.handlers=new Set}removeMessageHandler(e){e.messageChannel&&(e.messageChannel.port1.removeEventListener("message",e.onMessage),e.messageChannel.port1.close()),this.handlers.delete(e)}async _send(e,n,s=50){const r=typeof MessageChannel<"u"?new MessageChannel:null;if(!r)throw new Error("connection_unavailable");let i,o;return new Promise((a,c)=>{const l=zl("",20);r.port1.start();const u=setTimeout(()=>{c(new Error("unsupported_event"))},s);o={messageChannel:r,onMessage(d){const h=d;if(h.data.eventId===l)switch(h.data.status){case"ack":clearTimeout(u),i=setTimeout(()=>{c(new Error("timeout"))},3e3);break;case"done":clearTimeout(i),a(h.data.response);break;default:clearTimeout(u),clearTimeout(i),c(new Error("invalid_response"));break}}},this.handlers.add(o),r.port1.addEventListener("message",o.onMessage),this.target.postMessage({eventType:e,eventId:l,data:n},[r.port2])}).finally(()=>{o&&this.removeMessageHandler(o)})}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ht(){return window}function tA(t){ht().location.href=t}/**
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
 */function bm(){return typeof ht().WorkerGlobalScope<"u"&&typeof ht().importScripts=="function"}async function nA(){if(!navigator?.serviceWorker)return null;try{return(await navigator.serviceWorker.ready).active}catch{return null}}function sA(){return navigator?.serviceWorker?.controller||null}function rA(){return bm()?self:null}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Cm="firebaseLocalStorageDb",iA=1,Qi="firebaseLocalStorage",Sm="fbase_key";class Yr{constructor(e){this.request=e}toPromise(){return new Promise((e,n)=>{this.request.addEventListener("success",()=>{e(this.request.result)}),this.request.addEventListener("error",()=>{n(this.request.error)})})}}function $o(t,e){return t.transaction([Qi],e?"readwrite":"readonly").objectStore(Qi)}function oA(){const t=indexedDB.deleteDatabase(Cm);return new Yr(t).toPromise()}function gc(){const t=indexedDB.open(Cm,iA);return new Promise((e,n)=>{t.addEventListener("error",()=>{n(t.error)}),t.addEventListener("upgradeneeded",()=>{const s=t.result;try{s.createObjectStore(Qi,{keyPath:Sm})}catch(r){n(r)}}),t.addEventListener("success",async()=>{const s=t.result;s.objectStoreNames.contains(Qi)?e(s):(s.close(),await oA(),e(await gc()))})})}async function Ih(t,e,n){const s=$o(t,!0).put({[Sm]:e,value:n});return new Yr(s).toPromise()}async function aA(t,e){const n=$o(t,!1).get(e),s=await new Yr(n).toPromise();return s===void 0?null:s.value}function kh(t,e){const n=$o(t,!0).delete(e);return new Yr(n).toPromise()}const cA=800,lA=3;class Tm{constructor(){this.type="LOCAL",this._shouldAllowMigration=!0,this.listeners={},this.localCache={},this.pollTimer=null,this.pendingWrites=0,this.receiver=null,this.sender=null,this.serviceWorkerReceiverAvailable=!1,this.activeServiceWorker=null,this._workerInitializationPromise=this.initializeServiceWorkerMessaging().then(()=>{},()=>{})}async _openDb(){return this.db?this.db:(this.db=await gc(),this.db)}async _withRetries(e){let n=0;for(;;)try{const s=await this._openDb();return await e(s)}catch(s){if(n++>lA)throw s;this.db&&(this.db.close(),this.db=void 0)}}async initializeServiceWorkerMessaging(){return bm()?this.initializeReceiver():this.initializeSender()}async initializeReceiver(){this.receiver=Uo._getInstance(rA()),this.receiver._subscribe("keyChanged",async(e,n)=>({keyProcessed:(await this._poll()).includes(n.key)})),this.receiver._subscribe("ping",async(e,n)=>["keyChanged"])}async initializeSender(){if(this.activeServiceWorker=await nA(),!this.activeServiceWorker)return;this.sender=new eA(this.activeServiceWorker);const e=await this.sender._send("ping",{},800);e&&e[0]?.fulfilled&&e[0]?.value.includes("keyChanged")&&(this.serviceWorkerReceiverAvailable=!0)}async notifyServiceWorker(e){if(!(!this.sender||!this.activeServiceWorker||sA()!==this.activeServiceWorker))try{await this.sender._send("keyChanged",{key:e},this.serviceWorkerReceiverAvailable?800:50)}catch{}}async _isAvailable(){try{if(!indexedDB)return!1;const e=await gc();return await Ih(e,Xi,"1"),await kh(e,Xi),!0}catch{}return!1}async _withPendingWrite(e){this.pendingWrites++;try{await e()}finally{this.pendingWrites--}}async _set(e,n){return this._withPendingWrite(async()=>(await this._withRetries(s=>Ih(s,e,n)),this.localCache[e]=n,this.notifyServiceWorker(e)))}async _get(e){const n=await this._withRetries(s=>aA(s,e));return this.localCache[e]=n,n}async _remove(e){return this._withPendingWrite(async()=>(await this._withRetries(n=>kh(n,e)),delete this.localCache[e],this.notifyServiceWorker(e)))}async _poll(){const e=await this._withRetries(r=>{const i=$o(r,!1).getAll();return new Yr(i).toPromise()});if(!e)return[];if(this.pendingWrites!==0)return[];const n=[],s=new Set;if(e.length!==0)for(const{fbase_key:r,value:i}of e)s.add(r),JSON.stringify(this.localCache[r])!==JSON.stringify(i)&&(this.notifyListeners(r,i),n.push(r));for(const r of Object.keys(this.localCache))this.localCache[r]&&!s.has(r)&&(this.notifyListeners(r,null),n.push(r));return n}notifyListeners(e,n){this.localCache[e]=n;const s=this.listeners[e];if(s)for(const r of Array.from(s))r(n)}startPolling(){this.stopPolling(),this.pollTimer=setInterval(async()=>this._poll(),cA)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}_addListener(e,n){Object.keys(this.listeners).length===0&&this.startPolling(),this.listeners[e]||(this.listeners[e]=new Set,this._get(e)),this.listeners[e].add(n)}_removeListener(e,n){this.listeners[e]&&(this.listeners[e].delete(n),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&this.stopPolling()}}Tm.type="LOCAL";const Im=Tm;new zr(3e4,6e4);/**
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
 */function km(t,e){return e?vt(e):(S(t._popupRedirectResolver,t,"argument-error"),t._popupRedirectResolver)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Gl extends fm{constructor(e){super("custom","custom"),this.params=e}_getIdTokenResponse(e){return ns(e,this._buildIdpRequest())}_linkToIdToken(e,n){return ns(e,this._buildIdpRequest(n))}_getReauthenticationResolver(e){return ns(e,this._buildIdpRequest())}_buildIdpRequest(e){const n={requestUri:this.params.requestUri,sessionId:this.params.sessionId,postBody:this.params.postBody,tenantId:this.params.tenantId,pendingToken:this.params.pendingToken,returnSecureToken:!0,returnIdpCredential:!0};return e&&(n.idToken=e),n}}function uA(t){return gm(t.auth,new Gl(t),t.bypassAuthState)}function dA(t){const{auth:e,user:n}=t;return S(n,e,"internal-error"),zR(n,new Gl(t),t.bypassAuthState)}async function hA(t){const{auth:e,user:n}=t;return S(n,e,"internal-error"),qR(n,new Gl(t),t.bypassAuthState)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Rm{constructor(e,n,s,r,i=!1){this.auth=e,this.resolver=s,this.user=r,this.bypassAuthState=i,this.pendingPromise=null,this.eventManager=null,this.filter=Array.isArray(n)?n:[n]}execute(){return new Promise(async(e,n)=>{this.pendingPromise={resolve:e,reject:n};try{this.eventManager=await this.resolver._initialize(this.auth),await this.onExecution(),this.eventManager.registerConsumer(this)}catch(s){this.reject(s)}})}async onAuthEvent(e){const{urlResponse:n,sessionId:s,postBody:r,tenantId:i,error:o,type:a}=e;if(o){this.reject(o);return}const c={auth:this.auth,requestUri:n,sessionId:s,tenantId:i||void 0,postBody:r||void 0,user:this.user,bypassAuthState:this.bypassAuthState};try{this.resolve(await this.getIdpTask(a)(c))}catch(l){this.reject(l)}}onError(e){this.reject(e)}getIdpTask(e){switch(e){case"signInViaPopup":case"signInViaRedirect":return uA;case"linkViaPopup":case"linkViaRedirect":return hA;case"reauthViaPopup":case"reauthViaRedirect":return dA;default:ft(this.auth,"internal-error")}}resolve(e){Pt(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.resolve(e),this.unregisterAndCleanUp()}reject(e){Pt(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.reject(e),this.unregisterAndCleanUp()}unregisterAndCleanUp(){this.eventManager&&this.eventManager.unregisterConsumer(this),this.pendingPromise=null,this.cleanUp()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const fA=new zr(2e3,1e4);async function pA(t,e,n){if(Ge(t.app))return Promise.reject(tt(t,"operation-not-supported-in-this-environment"));const s=$s(t);dR(t,e,ql);const r=km(s,n);return new bn(s,"signInViaPopup",e,r).executeNotNull()}class bn extends Rm{constructor(e,n,s,r,i){super(e,n,r,i),this.provider=s,this.authWindow=null,this.pollId=null,bn.currentPopupAction&&bn.currentPopupAction.cancel(),bn.currentPopupAction=this}async executeNotNull(){const e=await this.execute();return S(e,this.auth,"internal-error"),e}async onExecution(){Pt(this.filter.length===1,"Popup operations only handle one event");const e=zl();this.authWindow=await this.resolver._openPopup(this.auth,this.provider,this.filter[0],e),this.authWindow.associatedEvent=e,this.resolver._originValidation(this.auth).catch(n=>{this.reject(n)}),this.resolver._isIframeWebStorageSupported(this.auth,n=>{n||this.reject(tt(this.auth,"web-storage-unsupported"))}),this.pollUserCancellation()}get eventId(){return this.authWindow?.associatedEvent||null}cancel(){this.reject(tt(this.auth,"cancelled-popup-request"))}cleanUp(){this.authWindow&&this.authWindow.close(),this.pollId&&window.clearTimeout(this.pollId),this.authWindow=null,this.pollId=null,bn.currentPopupAction=null}pollUserCancellation(){const e=()=>{if(this.authWindow?.window?.closed){this.pollId=window.setTimeout(()=>{this.pollId=null,this.reject(tt(this.auth,"popup-closed-by-user"))},8e3);return}this.pollId=window.setTimeout(e,fA.get())};e()}}bn.currentPopupAction=null;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const gA="pendingRedirect",vi=new Map;class mA extends Rm{constructor(e,n,s=!1){super(e,["signInViaRedirect","linkViaRedirect","reauthViaRedirect","unknown"],n,void 0,s),this.eventId=null}async execute(){let e=vi.get(this.auth._key());if(!e){try{const s=await _A(this.resolver,this.auth)?await super.execute():null;e=()=>Promise.resolve(s)}catch(n){e=()=>Promise.reject(n)}vi.set(this.auth._key(),e)}return this.bypassAuthState||vi.set(this.auth._key(),()=>Promise.resolve(null)),e()}async onAuthEvent(e){if(e.type==="signInViaRedirect")return super.onAuthEvent(e);if(e.type==="unknown"){this.resolve(null);return}if(e.eventId){const n=await this.auth._redirectUserForId(e.eventId);if(n)return this.user=n,super.onAuthEvent(e);this.resolve(null)}}async onExecution(){}cleanUp(){}}async function _A(t,e){const n=EA(e),s=vA(t);if(!await s._isAvailable())return!1;const r=await s._get(n)==="true";return await s._remove(n),r}function yA(t,e){vi.set(t._key(),e)}function vA(t){return vt(t._redirectPersistence)}function EA(t){return yi(gA,t.config.apiKey,t.name)}async function wA(t,e){return await $s(t)._initializationPromise,Am(t,e,!1)}async function Am(t,e,n=!1){if(Ge(t.app))return Promise.reject(In(t));const s=$s(t),r=km(s,e),o=await new mA(s,r,n).execute();return o&&!n&&(delete o.user._redirectEventId,await s._persistUserIfCurrent(o.user),await s._setRedirectUser(null,e)),o}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const bA=600*1e3;class CA{constructor(e){this.auth=e,this.cachedEventUids=new Set,this.consumers=new Set,this.queuedRedirectEvent=null,this.hasHandledPotentialRedirect=!1,this.lastProcessedEventTime=Date.now()}registerConsumer(e){this.consumers.add(e),this.queuedRedirectEvent&&this.isEventForConsumer(this.queuedRedirectEvent,e)&&(this.sendToConsumer(this.queuedRedirectEvent,e),this.saveEventToCache(this.queuedRedirectEvent),this.queuedRedirectEvent=null)}unregisterConsumer(e){this.consumers.delete(e)}onEvent(e){if(this.hasEventBeenHandled(e))return!1;let n=!1;return this.consumers.forEach(s=>{this.isEventForConsumer(e,s)&&(n=!0,this.sendToConsumer(e,s),this.saveEventToCache(e))}),this.hasHandledPotentialRedirect||!SA(e)||(this.hasHandledPotentialRedirect=!0,n||(this.queuedRedirectEvent=e,n=!0)),n}sendToConsumer(e,n){if(e.error&&!Nm(e)){const s=e.error.code?.split("auth/")[1]||"internal-error";n.onError(tt(this.auth,s))}else n.onAuthEvent(e)}isEventForConsumer(e,n){const s=n.eventId===null||!!e.eventId&&e.eventId===n.eventId;return n.filter.includes(e.type)&&s}hasEventBeenHandled(e){return Date.now()-this.lastProcessedEventTime>=bA&&this.cachedEventUids.clear(),this.cachedEventUids.has(Rh(e))}saveEventToCache(e){this.cachedEventUids.add(Rh(e)),this.lastProcessedEventTime=Date.now()}}function Rh(t){return[t.type,t.eventId,t.sessionId,t.tenantId].filter(e=>e).join("-")}function Nm({type:t,error:e}){return t==="unknown"&&e?.code==="auth/no-auth-event"}function SA(t){switch(t.type){case"signInViaRedirect":case"linkViaRedirect":case"reauthViaRedirect":return!0;case"unknown":return Nm(t);default:return!1}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function TA(t,e={}){return Us(t,"GET","/v1/projects",e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const IA=/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/,kA=/^https?/;async function RA(t){if(t.config.emulator)return;const{authorizedDomains:e}=await TA(t);for(const n of e)try{if(AA(n))return}catch{}ft(t,"unauthorized-domain")}function AA(t){const e=hc(),{protocol:n,hostname:s}=new URL(e);if(t.startsWith("chrome-extension://")){const o=new URL(t);return o.hostname===""&&s===""?n==="chrome-extension:"&&t.replace("chrome-extension://","")===e.replace("chrome-extension://",""):n==="chrome-extension:"&&o.hostname===s}if(!kA.test(n))return!1;if(IA.test(t))return s===t;const r=t.replace(/\./g,"\\.");return new RegExp("^(.+\\."+r+"|"+r+")$","i").test(s)}/**
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
 */const NA=new zr(3e4,6e4);function Ah(){const t=ht().___jsl;if(t?.H){for(const e of Object.keys(t.H))if(t.H[e].r=t.H[e].r||[],t.H[e].L=t.H[e].L||[],t.H[e].r=[...t.H[e].L],t.CP)for(let n=0;n<t.CP.length;n++)t.CP[n]=null}}function PA(t){return new Promise((e,n)=>{function s(){Ah(),gapi.load("gapi.iframes",{callback:()=>{e(gapi.iframes.getContext())},ontimeout:()=>{Ah(),n(tt(t,"network-request-failed"))},timeout:NA.get()})}if(ht().gapi?.iframes?.Iframe)e(gapi.iframes.getContext());else if(ht().gapi?.load)s();else{const r=UR("iframefcb");return ht()[r]=()=>{gapi.load?s():n(tt(t,"network-request-failed"))},MR(`${FR()}?onload=${r}`).catch(i=>n(i))}}).catch(e=>{throw Ei=null,e})}let Ei=null;function LA(t){return Ei=Ei||PA(t),Ei}/**
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
 */const OA=new zr(5e3,15e3),DA="__/auth/iframe",xA="emulator/auth/iframe",MA={style:{position:"absolute",top:"-100px",width:"1px",height:"1px"},"aria-hidden":"true",tabindex:"-1"},FA=new Map([["identitytoolkit.googleapis.com","p"],["staging-identitytoolkit.sandbox.googleapis.com","s"],["test-identitytoolkit.sandbox.googleapis.com","t"]]);function UA(t){const e=t.config;S(e.authDomain,t,"auth-domain-config-required");const n=e.emulator?Bl(e,xA):`https://${t.config.authDomain}/${DA}`,s={apiKey:e.apiKey,appName:t.name,v:Os},r=FA.get(t.config.apiHost);r&&(s.eid=r);const i=t._getFrameworks();return i.length&&(s.fw=i.join(",")),`${n}?${Ls(s).slice(1)}`}async function $A(t){const e=await LA(t),n=ht().gapi;return S(n,t,"internal-error"),e.open({where:document.body,url:UA(t),messageHandlersFilter:n.iframes.CROSS_ORIGIN_IFRAMES_FILTER,attributes:MA,dontclear:!0},s=>new Promise(async(r,i)=>{await s.restyle({setHideOnLeave:!1});const o=tt(t,"network-request-failed"),a=ht().setTimeout(()=>{i(o)},OA.get());function c(){ht().clearTimeout(a),r(s)}s.ping(c).then(c,()=>{i(o)})}))}/**
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
 */const BA={location:"yes",resizable:"yes",statusbar:"yes",toolbar:"no"},HA=500,WA=600,VA="_blank",jA="http://localhost";class Nh{constructor(e){this.window=e,this.associatedEvent=null}close(){if(this.window)try{this.window.close()}catch{}}}function qA(t,e,n,s=HA,r=WA){const i=Math.max((window.screen.availHeight-r)/2,0).toString(),o=Math.max((window.screen.availWidth-s)/2,0).toString();let a="";const c={...BA,width:s.toString(),height:r.toString(),top:i,left:o},l=Re().toLowerCase();n&&(a=im(l)?VA:n),sm(l)&&(e=e||jA,c.scrollbars="yes");const u=Object.entries(c).reduce((h,[f,p])=>`${h}${f}=${p},`,"");if(RR(l)&&a!=="_self")return zA(e||"",a),new Nh(null);const d=window.open(e||"",a,u);S(d,t,"popup-blocked");try{d.focus()}catch{}return new Nh(d)}function zA(t,e){const n=document.createElement("a");n.href=t,n.target=e;const s=document.createEvent("MouseEvent");s.initMouseEvent("click",!0,!0,window,1,0,0,0,0,!1,!1,!1,!1,1,null),n.dispatchEvent(s)}/**
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
 */const GA="__/auth/handler",YA="emulator/auth/handler",KA=encodeURIComponent("fac");async function Ph(t,e,n,s,r,i){S(t.config.authDomain,t,"auth-domain-config-required"),S(t.config.apiKey,t,"invalid-api-key");const o={apiKey:t.config.apiKey,appName:t.name,authType:n,redirectUrl:s,v:Os,eventId:r};if(e instanceof ql){e.setDefaultLanguage(t.languageCode),o.providerId=e.providerId||"",Ai(e.getCustomParameters())||(o.customParameters=JSON.stringify(e.getCustomParameters()));for(const[u,d]of Object.entries({}))o[u]=d}if(e instanceof Gr){const u=e.getScopes().filter(d=>d!=="");u.length>0&&(o.scopes=u.join(","))}t.tenantId&&(o.tid=t.tenantId);const a=o;for(const u of Object.keys(a))a[u]===void 0&&delete a[u];const c=await t._getAppCheckToken(),l=c?`#${KA}=${encodeURIComponent(c)}`:"";return`${JA(t)}?${Ls(a).slice(1)}${l}`}function JA({config:t}){return t.emulator?Bl(t,YA):`https://${t.authDomain}/${GA}`}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const va="webStorageSupport";class XA{constructor(){this.eventManagers={},this.iframes={},this.originValidationPromises={},this._redirectPersistence=wm,this._completeRedirectFn=Am,this._overrideRedirectResult=yA}async _openPopup(e,n,s,r){Pt(this.eventManagers[e._key()]?.manager,"_initialize() not called before _openPopup()");const i=await Ph(e,n,s,hc(),r);return qA(e,i,zl())}async _openRedirect(e,n,s,r){await this._originValidation(e);const i=await Ph(e,n,s,hc(),r);return tA(i),new Promise(()=>{})}_initialize(e){const n=e._key();if(this.eventManagers[n]){const{manager:r,promise:i}=this.eventManagers[n];return r?Promise.resolve(r):(Pt(i,"If manager is not set, promise should be"),i)}const s=this.initAndGetManager(e);return this.eventManagers[n]={promise:s},s.catch(()=>{delete this.eventManagers[n]}),s}async initAndGetManager(e){const n=await $A(e),s=new CA(e);return n.register("authEvent",r=>(S(r?.authEvent,e,"invalid-auth-event"),{status:s.onEvent(r.authEvent)?"ACK":"ERROR"}),gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER),this.eventManagers[e._key()]={manager:s},this.iframes[e._key()]=n,s}_isIframeWebStorageSupported(e,n){this.iframes[e._key()].send(va,{type:va},r=>{const i=r?.[0]?.[va];i!==void 0&&n(!!i),ft(e,"internal-error")},gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER)}_originValidation(e){const n=e._key();return this.originValidationPromises[n]||(this.originValidationPromises[n]=RA(e)),this.originValidationPromises[n]}get _shouldInitProactively(){return um()||rm()||Vl()}}const QA=XA;var Lh="@firebase/auth",Oh="1.11.0";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ZA{constructor(e){this.auth=e,this.internalListeners=new Map}getUid(){return this.assertAuthConfigured(),this.auth.currentUser?.uid||null}async getToken(e){return this.assertAuthConfigured(),await this.auth._initializationPromise,this.auth.currentUser?{accessToken:await this.auth.currentUser.getIdToken(e)}:null}addAuthTokenListener(e){if(this.assertAuthConfigured(),this.internalListeners.has(e))return;const n=this.auth.onIdTokenChanged(s=>{e(s?.stsTokenManager.accessToken||null)});this.internalListeners.set(e,n),this.updateProactiveRefresh()}removeAuthTokenListener(e){this.assertAuthConfigured();const n=this.internalListeners.get(e);n&&(this.internalListeners.delete(e),n(),this.updateProactiveRefresh())}assertAuthConfigured(){S(this.auth._initializationPromise,"dependent-sdk-initialized-before-auth")}updateProactiveRefresh(){this.internalListeners.size>0?this.auth._startProactiveRefresh():this.auth._stopProactiveRefresh()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function eN(t){switch(t){case"Node":return"node";case"ReactNative":return"rn";case"Worker":return"webworker";case"Cordova":return"cordova";case"WebExtension":return"web-extension";default:return}}function tN(t){tn(new Rt("auth",(e,{options:n})=>{const s=e.getProvider("app").getImmediate(),r=e.getProvider("heartbeat"),i=e.getProvider("app-check-internal"),{apiKey:o,authDomain:a}=s.options;S(o&&!o.includes(":"),"invalid-api-key",{appName:s.name});const c={apiKey:o,authDomain:a,clientPlatform:t,apiHost:"identitytoolkit.googleapis.com",tokenApiHost:"securetoken.googleapis.com",apiScheme:"https",sdkClientVersion:dm(t)},l=new DR(s,r,i,c);return BR(l,n),l},"PUBLIC").setInstantiationMode("EXPLICIT").setInstanceCreatedCallback((e,n,s)=>{e.getProvider("auth-internal").initialize()})),tn(new Rt("auth-internal",e=>{const n=$s(e.getProvider("auth").getImmediate());return(s=>new ZA(s))(n)},"PRIVATE").setInstantiationMode("EXPLICIT")),St(Lh,Oh,eN(t)),St(Lh,Oh,"esm2020")}/**
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
 */const nN=300,sN=sp("authIdTokenMaxAge")||nN;let Dh=null;const rN=t=>async e=>{const n=e&&await e.getIdTokenResult(),s=n&&(new Date().getTime()-Date.parse(n.issuedAtTime))/1e3;if(s&&s>sN)return;const r=n?.token;Dh!==r&&(Dh=r,await fetch(t,{method:r?"POST":"DELETE",headers:r?{Authorization:`Bearer ${r}`}:{}}))};function iN(t=Jc()){const e=Ur(t,"auth");if(e.isInitialized())return e.getImmediate();const n=$R(t,{popupRedirectResolver:QA,persistence:[Im,vm,wm]}),s=sp("authTokenSyncURL");if(s&&typeof isSecureContext=="boolean"&&isSecureContext){const i=new URL(s,location.origin);if(location.origin===i.origin){const o=rN(i.toString());KR(n,o,()=>o(n.currentUser)),YR(n,a=>o(a))}}const r=tp("auth");return r&&HR(n,`http://${r}`),n}function oN(){return document.getElementsByTagName("head")?.[0]??document}xR({loadJS(t){return new Promise((e,n)=>{const s=document.createElement("script");s.setAttribute("src",t),s.onload=e,s.onerror=r=>{const i=tt("internal-error");i.customData=r,n(i)},s.type="text/javascript",s.charset="UTF-8",oN().appendChild(s)})},gapiScript:"https://apis.google.com/js/api.js",recaptchaV2Script:"https://www.google.com/recaptcha/api.js",recaptchaEnterpriseScript:"https://www.google.com/recaptcha/enterprise.js?render="});tN("Browser");const $0=()=>!1,aN=t=>{try{t&&localStorage.setItem("debug:console","1")}catch{}},$=(...t)=>{},cN=(...t)=>{localStorage.getItem("debug:console")},lN="765724787439-21p8n3e2tsfq2qk4oriq7ipp7m4o50ad.apps.googleusercontent.com",ar=new Set;function uN(){const t=console.error;console.error=(...e)=>{const n=e.join(" ");n.includes("FedCM")&&n.includes("AbortError")&&n.includes("signal is aborted without reason")||e.length===1&&typeof e[0]=="string"&&e[0].trim()==="The request has been aborted."||t.apply(console,e)}}function dN(t){return $("[ONE TAP] Callback registered, total callbacks:",ar.size+1),ar.add(t),()=>ar.delete(t)}function Yn(t){$("[ONE TAP] Notifying status:",t,"to",ar.size,"callbacks"),ar.forEach(e=>{try{e(t)}catch{}})}function Pm(){if(typeof google>"u"||!google.accounts?.id){setTimeout(()=>Pm(),100);return}uN(),google.accounts.id.initialize({client_id:lN,callback:hN,auto_select:!1,cancel_on_tap_outside:!1,context:"signin",use_fedcm_for_prompt:!0,itp_support:!0})}function Lm(){if(Yl()){Yn("not_needed");return}window.google?.accounts?.id&&(Yn("prompting"),window.google.accounts.id.prompt(t=>{const e=t.getMomentType();e==="skipped"?Yn("skipped"):e==="dismissed"?Yn("dismissed"):e==="display"&&Yn("displayed")}))}async function hN(t){try{$("[ONE TAP] Received credential, signing in with Firebase..."),Yn("signing_in");const e=ut.credential(t.credential),n=await GR(xe,e);$("[ONE TAP] ✅ Successfully signed in:",n.user.email),kr(!1)}catch(e){const n=e?.code||"unknown",s=e?.message||String(e);alert(n==="auth/account-exists-with-different-credential"?"An account already exists with the same email but different sign-in credentials.":`One Tap sign-in failed: ${s}`)}}let mc=!1;async function fN(){const t=q();if(!t||mc)return;const e=k(R,`users/${t}/presence`);try{await re(e,{state:"online",lastChanged:Tn()}),await Ag(e).set({state:"offline",lastSeen:Tn(),lastChanged:Tn()}),mc=!0,console.log("Presence initialized for user:",t)}catch(n){console.error("Failed to initialize presence:",n)}}async function pN(){const t=q();if(!t)return;const e=k(R,`users/${t}/presence`);try{await re(e,{state:"offline",lastSeen:Tn(),lastChanged:Tn()}),mc=!1}catch(n){console.error("Failed to set offline:",n)}}function Om(t){if(!t||typeof t!="string")throw new Error("Invalid email: must be a non-empty string");const e=t.toLowerCase().trim();return btoa(unescape(encodeURIComponent(e))).replace(/\//g,"-")}async function gN(t){if(!t||!t.uid||!t.email)throw new Error("Invalid user: must have uid and email");const e=Om(t.email),n=k(R,`usersByEmail/${e}`),s={uid:t.uid,displayName:t.displayName||"Anonymous",photoURL:t.photoURL||null,registeredAt:Date.now()};try{await re(n,s),console.log("[USER DISCOVERY] Registered user in directory:",t.email)}catch(r){throw console.error("[USER DISCOVERY] Failed to register user:",r),r}}async function Dm(t){if(!t||typeof t!="string")return null;try{const e=Om(t),n=k(R,`usersByEmail/${e}`),s=await et(n);return s.exists()?s.val():null}catch(e){return console.error("[USER DISCOVERY] Failed to find user by email:",e),null}}async function mN(t){if(!Array.isArray(t))throw new Error("Invalid emails: must be an array");const e={},n=t.map(async s=>{const r=await Dm(s);e[s]=r});return await Promise.all(n),e}const xe=iN(xl),_N=typeof import.meta<"u"&&!0;function xm(t,e,n={}){const s=typeof window<"u"?window.location.origin:"n/a";_N?console.error(`[AUTH] ${t}:`,{code:e?.code||"unknown",message:e?.message||String(e),origin:s,...n}):console.error(`[AUTH] ${t}:`,e,n,{origin:s})}const Mm=(async()=>{try{await ya(xe,Im)}catch{try{await ya(xe,vm)}catch{await ya(xe,pc)}}try{(await wA(xe))?.user&&$("[AUTH] ✅ Sign-in completed (via Safari fallback)")}catch(t){$("[AUTH] No redirect result:",t.code)}setTimeout(()=>{Pm(),Lm()},500)})();let Fm=!1;function kr(t){Fm=t}function yN(){try{const t=document.createElement("a");t.href=window.location.href,t.target="_blank",t.rel="noopener noreferrer external",document.body.appendChild(t),t.click(),document.body.removeChild(t)}catch{}}function Um(){const t=typeof window<"u"&&window.matchMedia?.("(display-mode: standalone)").matches,e=typeof navigator<"u"&&navigator.standalone===!0,n=t||e,s=/iphone|ipad|ipod/i.test(navigator.userAgent||"");return{isStandalonePWA:n,isIOS:s,isIOSStandalone:n&&s}}function vN(t){const e=t?.code||"unknown",n=t?.message||String(t);if(e==="auth/popup-closed-by-user"||e==="auth/cancelled-popup-request"){console.log("Sign-in cancelled by user");return}const{isIOSStandalone:s}=Um();if((e==="auth/network-request-failed"||e==="auth/popup-blocked")&&s){console.warn(`[AUTH] ${e} inside iOS standalone PWA. Arming Safari fallback.`),kr(!0),alert(`Sign-in is blocked in the installed app on iOS.

Tap the Login button again to open in Safari and complete sign-in.`);return}if(e==="auth/popup-blocked"){alert("Pop-up blocked. Please enable pop-ups for this site in your browser settings, or try signing in from a desktop browser.");return}const r=t?.customData?.email;if(xm("Google sign-in",t,{email:r?"<redacted>":void 0}),e==="auth/unauthorized-domain"){const i=typeof window<"u"?window.location.origin:"",o=["This app's host is not whitelisted in Firebase Authentication.","Fix: In Firebase Console, go to Build → Authentication → Settings → Authorized domains and add this origin:",i?`• ${i}`:"• <your dev origin>","","Common dev hosts to add:","• http://localhost (covers any port)","• http://127.0.0.1","• http://[::1] (IPv6 localhost)","• Your LAN IP, e.g. http://192.168.x.y","","Tip: avoid opening index.html directly from the filesystem (file://). Use a dev server instead."];i&&typeof navigator<"u"&&navigator.clipboard?.writeText&&navigator.clipboard.writeText(i).catch(()=>{}),alert(`Sign-in failed: Unauthorized domain.

${o.join(`
`)}`);return}alert(`Sign-in failed: ${n}`)}let Ys=null;const EN=()=>Math.random().toString(36).substring(2,15),_c="guestUser",wN=2880*60*1e3;function bN(){try{const t=typeof localStorage<"u"?localStorage.getItem(_c):null;if(!t)return null;const e=JSON.parse(t);if(!e||typeof e!="object"||!e.id)return null;if(e.expiresAt&&Date.now()>e.expiresAt){try{localStorage.removeItem(_c)}catch{}return null}return e}catch{return null}}function CN(t,e=wN){const n=Date.now(),s={id:t,createdAt:n,expiresAt:n+e};try{typeof localStorage<"u"&&localStorage.setItem(_c,JSON.stringify(s))}catch{}return s}function _e(){const t=q();if(t)return t;if(!Ys){const e=bN();e&&e.id?Ys=e.id:(Ys=EN(),CN(Ys))}return Ys}function Un(){return xe.currentUser}function Yl(){return xe.currentUser!==null}function q(){return xe.currentUser?.uid??null}function SN(){return new Promise(t=>{const e=mm(xe,n=>{e(),t(n)})})}function Kl(t,{truncate:e=7}={}){return mm(xe,n=>{const s=!!n,r=n?.displayName||"Guest User",i=typeof r=="string"&&r.length>e?r.slice(0,e)+"...":r;s&&(fN().catch(o=>{console.warn("Failed to initialize presence:",o)}),gN(n).catch(o=>{console.warn("Failed to register user in directory:",o)}));try{t({user:n,isLoggedIn:s,userName:i})}catch{}})}const $m=async()=>{const t=new ut;t.setCustomParameters({prompt:"select_account"});const{isIOSStandalone:e}=Um();try{if(e&&Fm){$("[AUTH] Using Safari external fallback"),kr(!1),yN();return}$("[AUTH] Starting popup sign-in flow...");const n=await pA(xe,t);return $("[AUTH] Popup sign-in successful:",n.user.email),kr(!1),n}catch(n){vN(n)}};async function Bm(){try{await pN(),await JR(xe),console.info("User signed out"),setTimeout(()=>Lm(),1500)}catch(t){throw xm("Sign out",t),t}}const TN="765724787439-21p8n3e2tsfq2qk4oriq7ipp7m4o50ad.apps.googleusercontent.com";function Hm(){return new Promise((t,e)=>{if(typeof google>"u"||!google.accounts?.oauth2){e(new Error("Google Identity Services not loaded"));return}const n=Un();console.log("[AUTH] Requesting contacts access via GIS Token Model..."),google.accounts.oauth2.initTokenClient({client_id:TN,scope:"https://www.googleapis.com/auth/contacts.readonly https://www.googleapis.com/auth/contacts.other.readonly",hint:n?.email||void 0,callback:r=>{if(r.error){console.error("[AUTH] Token request error:",r.error),r.error==="access_denied"?e(new Error("Authorization cancelled")):e(new Error(r.error_description||r.error));return}if(!r.access_token){e(new Error("No access token received"));return}console.log("[AUTH] Contacts access granted"),t(r.access_token)},error_callback:r=>{console.error("[AUTH] Token client error:",r),r.type==="popup_closed"?e(new Error("Authorization cancelled")):e(new Error(r.message||"Authorization failed"))}}).requestAccessToken()})}const IN=Object.freeze(Object.defineProperty({__proto__:null,auth:xe,authReady:Mm,getCurrentUser:Un,getCurrentUserAsync:SN,getLoggedInUserId:q,getUserId:_e,isLoggedIn:Yl,onAuthChange:Kl,requestContactsAccess:Hm,setSafariExternalOpenArmed:kr,signInWithAccountSelection:$m,signOutUser:Bm},Symbol.toStringTag,{value:"Module"})),kN=t=>String(t).replace(/[&<>"'`=\/]/g,n=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;","`":"&#x60;","=":"&#x3D;","/":"&#x2F;"})[n]),RN=(t,e)=>t.replace(/\$\{([^}]+)\}/g,(n,s)=>{const r=s.trim(),i=r.split(".").reduce((a,c)=>a?.[c],e);return i==null?"":r.endsWith("Html")?String(i):kN(String(i))}),AN=(t,e={})=>{const n=document.createElement("template");return n.innerHTML=RN(t,e),n.content.cloneNode(!0)},NN=(t,e)=>{const n=[];let s=e;for(;s&&s!==t;){const r=s.parentElement;if(!r)break;const i=Array.prototype.indexOf.call(r.children,s);n.push(i),s=r}return n.reverse()},PN=(t,e)=>e.reduce((n,s)=>n&&n.children?n.children[s]:null,t),LN=t=>Array.from(t.querySelectorAll("input, textarea, select")).map(e=>({name:e.name,id:e.id,path:NN(t,e),value:e.value,checked:e.checked,selectionStart:e.selectionStart,selectionEnd:e.selectionEnd,wasFocused:document.activeElement===e})),ON=t=>typeof CSS<"u"&&typeof CSS.escape=="function"?CSS.escape(String(t)):String(t).replace(/[^_a-zA-Z0-9-]/g,e=>"\\"+e),DN=(t,e)=>{e.forEach(n=>{let s=null;if(n.name){const r=t.querySelectorAll("input[name], textarea[name], select[name]");for(const i of r)if(i.getAttribute("name")===n.name){s=i;break}}else if(n.id)try{s=t.querySelector("#"+ON(n.id))}catch{s=t.querySelector(`#${n.id}`)}else n.path&&(s=PN(t,n.path));if(s){if(s.value=n.value,n.checked!==void 0&&(s.checked=n.checked),n.selectionStart!=null&&s.setSelectionRange)try{s.setSelectionRange(n.selectionStart,n.selectionEnd)}catch{}if(n.wasFocused)try{s.focus()}catch{}}})},xN=t=>Array.from(t.querySelectorAll("video, audio")).map(e=>({src:e.currentSrc||e.src,currentTime:e.currentTime,paused:e.paused,volume:e.volume,playbackRate:e.playbackRate,muted:e.muted})),MN=(t,e)=>{const n=t.querySelectorAll("video, audio");for(const s of n)if(s.currentSrc===e||s.src===e)return s;return null},FN=(t,e)=>{e.forEach(n=>{if(!n.src)return;const s=MN(t,n.src);s&&(s.currentTime=n.currentTime,s.volume=n.volume,s.playbackRate=n.playbackRate,s.muted=n.muted,n.paused||s.play().catch(()=>{}))})},UN=()=>document.readyState!=="loading",Jl=({initialProps:t={},template:e="",handlers:n={},parent:s=null,containerTag:r="div",className:i="",onMount:o=null,onCleanup:a=null,autoAppend:c=!0,preserveInputState:l=!0}={})=>{if(!UN())return console.error("createComponent: DOM must be ready before creating components."),null;const u=document.createElement(r);i&&(u.className=i);let d={...t};const h=new Set,f=/\$\{([^}]+)\}/g;let p;for(;(p=f.exec(e))!==null;){const w=p[1].trim().split(".")[0];h.add(w)}const _=[],m=[],A={},B=()=>{let w=[],ie=[];l&&(w=LN(u),ie=xN(u)),u.textContent="";const Me=AN(e,d);u.appendChild(Me),Object.keys(n).forEach(ze=>{const be=u.querySelectorAll(`[onclick="${ze}"]`),Dt=n[ze];be.forEach(Xr=>{Xr.removeAttribute("onclick"),typeof Dt=="function"&&Xr.addEventListener("click",Dt)})}),l&&(DN(u,w),FN(u,ie)),_.forEach(ze=>ze({...d}))},x=w=>{if(!Array.isArray(w)||w.length===0)return;const ie={props:{...d},changedKeys:w};m.forEach(Me=>Me(ie))};for(const w of Object.keys(t))A[w]=[],Object.defineProperty(u,w,{get(){return d[w]},set(ie){d[w]!==ie&&(d[w]=ie,h.has(w)&&B(),A[w].forEach(Me=>Me(ie)),x([w]))},configurable:!0,enumerable:!0});if(u.update=w=>{let ie=!1,Me=!1;const ze=[];for(const be in w)w[be]!==d[be]&&(d[be]=w[be],h.has(be)&&(Me=!0),A[be]&&A[be].forEach(Dt=>Dt(w[be])),ie=!0,ze.push(be));ie&&Me&&B(),ze.length>0&&x(ze)},u.onRender=w=>{typeof w=="function"&&_.push(w)},u.onAnyPropUpdated=w=>{typeof w=="function"&&m.push(w)},u.onPropUpdated=(w,ie)=>{typeof ie=="function"&&A[w]&&A[w].push(ie)},u.dispose=()=>{a&&(Array.isArray(a)?a.forEach(w=>{typeof w=="function"&&w()}):typeof a=="function"&&a()),_.length=0,m.length=0;for(const w in A)A[w].length=0;u.remove()},B(),c&&s&&!s.contains(u)&&s.appendChild(u),typeof o=="function")try{o(u)}catch(w){cN("[createComponent]: Error in onMount handler of component",w)}return u};let Ks=null;const $N=(t,e=null)=>{if(Ks)return Ks;if(!t)return console.error("Auth UI: Parent element is required"),null;let n=null,s=null,r=10;typeof e=="number"&&(r=e);const i=Yl();return Ks=Jl({initialProps:{isLoggedIn:i,userName:"Guest User",signingInDisplay:"none",loginBtnMarginRightPx:r},template:`
      <button style="margin-right: \${loginBtnMarginRightPx}px" id="goog-login-btn" class="login-btn" onclick="handleLogin" disabled>Login</button>
      <button id="goog-logout-btn" class="logout-btn" onclick="handleLogout" disabled>Logout</button>
      <span class="signing-in-indicator" style="display: \${signingInDisplay}; color: var(--text-secondary, #888); font-size: 0.9rem;">Signing in...</span>
      <div class="user-info">\${isLoggedIn ? 'Logged in: ' + userName : 'Logged out'}</div>
    `,handlers:{handleLogin:$m,handleLogout:Bm},onMount:o=>{const a=c=>{const l=o.querySelector("#goog-login-btn"),u=o.querySelector("#goog-logout-btn");l&&u&&(l.disabled=c,u.disabled=!c)};a(i),n=Kl(({isLoggedIn:c,userName:l})=>{$("[AuthComponent] Auth state changed:",{isLoggedIn:c,userName:l}),a(c),o.update({isLoggedIn:c,userName:l,signingInDisplay:"none"})}),s=dN(c=>{$("[AuthComponent] One Tap status:",c),c==="signing_in"?o.update({signingInDisplay:"inline-block"}):o.update({signingInDisplay:"none"})})},onCleanup:()=>{n&&(n(),n=null),s&&(s(),s=null),Ks=null},className:"auth-component",parent:t}),Ks},Xl=t=>t?!0:(console.warn("Element not found. el.id: =>",t?.id??"(no id)","el: =>",t),console.trace(),!1),Zi=t=>{if(Xl(t))return t.classList.contains("hidden")},D=t=>{Xl(t)&&t.classList.contains("hidden")&&t.classList.remove("hidden")},v=t=>{Xl(t)&&!t.classList.contains("hidden")&&t.classList.add("hidden")},Wm=t=>t.classList.contains("small-frame"),Rr=t=>{if(t&&!Wm(t)){t.classList.add("small-frame");const e=document.createElement("div");e.classList.add("small-frame-toggle-div");const n=document.createElement("span");n.classList.add("small-frame-toggle-icon"),n.textContent="❮",e.appendChild(n),t.appendChild(e),e.addEventListener("click",()=>{t.classList.contains("closed")?(t.classList.remove("closed"),e.classList.remove("closed"),n.classList.remove("closed")):(t.classList.add("closed"),e.classList.add("closed"),n.classList.add("closed"))})}},Xt=t=>{if(Wm(t)){t.classList.remove("small-frame"),t.classList.remove("closed");const e=t.querySelector(".small-frame-toggle-div");e&&e.remove()}};function Ql(t){return document.pictureInPictureElement===t}function Bo(t="room"){const e=new URL(window.location);e.searchParams.delete(t),window.history.replaceState({},"",e)}const z=t=>{const e=document.getElementById(t);return e||(console.warn(`Element with id: ${t} not found.`),null)};let je=null,un=null,Ho=null,Zl=null,Fe=null,pe=null,ne=null,se=null,M=null,Ie=null,Be=null,qe=null,nt=null,Bs=null,Vm=null,st=null,Wo=null,an=null,Hs=null,Ws=null,$n=null,eu=null,tu=null,nu=null,su=null,ss=null,Ar=null;function xh(){je=z("lobby"),un=z("lobby-call-btn"),Ho=z("title-auth-bar"),Zl=z("videos"),Fe=z("local-video-el"),pe=z("local-video-box"),ne=z("remote-video-el"),se=z("remote-video-box"),M=z("shared-video-el"),Ie=z("shared-video-box"),Be=z("chat-controls"),qe=z("call-btn"),nt=z("hang-up-btn"),Bs=z("switch-camera-btn"),st=z("mute-btn"),Wo=z("fullscreen-partner-btn"),an=z("remote-pip-btn"),Hs=z("mic-btn"),Ws=z("camera-btn"),$n=z("exit-watch-mode-btn"),eu=z("app-pip-btn"),tu=z("app-title-h1"),nu=z("app-title-a"),su=z("app-title-span"),ss=z("paste-join-btn"),Ar=z("add-contact-btn")}document.readyState==="loading"?document.addEventListener("DOMContentLoaded",xh):xh();const jm=()=>({lobbyDiv:je,lobbyCallBtn:un,titleAuthBar:Ho,videosWrapper:Zl,localVideoEl:Fe,localBoxEl:pe,remoteVideoEl:ne,remoteBoxEl:se,sharedVideoEl:M,sharedBoxEl:Ie,chatControls:Be,callBtn:qe,hangUpBtn:nt,switchCameraBtn:Bs,installBtn:Vm,mutePartnerBtn:st,fullscreenPartnerBtn:Wo,remotePipBtn:an,micBtn:Hs,cameraBtn:Ws,exitWatchModeBtn:$n,appPipBtn:eu,appTitleH1:tu,appTitleA:nu,appTitleSpan:su,pasteJoinBtn:ss,addContactBtn:Ar});function qm(t,e=3,n=100){return new Promise(s=>{let r=0;const i=()=>{const o=document.getElementById(t);if(o){s(o);return}if(r++,r>=e){console.warn(`Element ${t} not found after ${e} attempts`),s(null);return}setTimeout(i,n)};i()})}async function zm(t,e=3,n=100){const s={},r=t.map(async i=>{const o=await qm(i,e,n);return s[i]=o,o});return await Promise.all(r),s}async function BN(){const t=await zm(["searchBtn","searchQuery","searchResults"],5,200),e=document.querySelector(".search-section");t.searchContainer=e;const n=Object.entries(t).filter(([s,r])=>!r).map(([s])=>s);return n.length>0&&console.warn("Some YouTube elements not found:",n),t}const HN=Object.freeze(Object.defineProperty({__proto__:null,get addContactBtn(){return Ar},get appPipBtn(){return eu},get appTitleA(){return nu},get appTitleH1(){return tu},get appTitleSpan(){return su},get callBtn(){return qe},get cameraBtn(){return Ws},get chatControls(){return Be},get exitWatchModeBtn(){return $n},get fullscreenPartnerBtn(){return Wo},getElements:jm,get hangUpBtn(){return nt},initializeYouTubeElements:BN,installBtn:Vm,get lobbyCallBtn(){return un},get lobbyDiv(){return je},get localBoxEl(){return pe},get localVideoEl(){return Fe},get micBtn(){return Hs},get mutePartnerBtn(){return st},get pasteJoinBtn(){return ss},get remoteBoxEl(){return se},get remotePipBtn(){return an},get remoteVideoEl(){return ne},robustElementAccess:qm,get sharedBoxEl(){return Ie},get sharedVideoEl(){return M},get switchCameraBtn(){return Bs},get titleAuthBar(){return Ho},get videosWrapper(){return Zl},waitForElements:zm},Symbol.toStringTag,{value:"Module"})),Mh="yt-video-box",yc="yt-player-root";let J=null,Ot=!1;const cr=()=>J,WN=()=>Ot,Gm=t=>Ot=t,rs=()=>{const t=document.getElementById(Mh);if(!t)throw new Error(`Container #${Mh} not found`);return t};function VN(){return new Promise(t=>{window.YT&&window.YT.Player?t():window.onYouTubeIframeAPIReady=()=>{t()}})}function Ym(){const t=rs();if(!document.getElementById(yc)){const e=document.createElement("div");e.id=yc,t.appendChild(e)}D(t)}function eo(){const t=rs();v(t)}function Ea(){const t=rs();return t&&!t.classList.contains("hidden")}function vc(t){return t?t.includes("youtube.com")||t.includes("youtu.be"):!1}function Km(t){if(!t)return null;const e=[/(?:youtube\.com\/watch\?v=)([\w-]+)/,/(?:youtu\.be\/)([\w-]+)/,/(?:youtube\.com\/embed\/)([\w-]+)/,/(?:youtube\.com\/shorts\/)([\w-]+)/];for(const n of e){const s=t.match(n);if(s&&s[1])return s[1]}return null}async function jN({url:t,onReady:e,onStateChange:n}){const s=Km(t);if(!s)throw new Error("Invalid YouTube URL");if(await VN(),J){try{J.destroy()}catch(o){console.warn("Error destroying previous YouTube player:",o)}J=null}const r=(o=!0)=>{const a=rs(),c=J.getIframe();if(c&&a){try{a.tabIndex=-1,a.focus({preventScroll:!0})}catch{if(document.activeElement===c)try{c.blur()}catch{}}if(o){const l=u=>{if(u.code==="Space"){const d=rs(),h=J.getIframe();if(document.activeElement===h||document.activeElement===d)return;u.preventDefault(),console.debug("Space pressed, refocusing iframe"),J.getPlayerState()!==window.YT.PlayerState.PLAYING?iu():Kr()}};document.addEventListener("keydown",l,{once:!0})}}},i=()=>{const o=rs(),a=J.getIframe();if(o&&a&&document.activeElement!==a)try{a.focus()}catch{}};return Ym(),new Promise((o,a)=>{try{J=new window.YT.Player(yc,{videoId:s,playerVars:{autoplay:1,mute:0,controls:1,fs:1,rel:0,modestbranding:1,disablekb:0,origin:window.location.origin},events:{onReady:c=>{Ot=!0,e&&e(c),o(J)},onStateChange:c=>{c.data===window.YT.PlayerState.ENDED&&r(!1),c.data===window.YT.PlayerState.PAUSED&&r(),c.data===window.YT.PlayerState.PLAYING&&i(),n&&n(c)},onError:c=>{console.error("YouTube player error:",c.data),a(new Error(`YouTube error: ${c.data}`))}}})}catch(c){a(c)}})}function ru(){if(J){try{eo(),J.destroy()}catch(t){console.warn("Error destroying YouTube player:",t)}J=null,Ot=!1}}function iu(){J&&Ot&&J.playVideo()}function Kr(){J&&Ot&&J.pauseVideo()}function qN(t){J&&Ot&&J.seekTo(t,!0)}function to(){return J&&Ot?J.getCurrentTime():0}function ou(){return J&&Ot?J.getPlayerState():-1}const qt={UNSTARTED:-1,ENDED:0,PLAYING:1,PAUSED:2,BUFFERING:3,CUED:5};let ye=null,Lt=null,Jm=!1,rt="none",lr=null,He=null;const Bn=()=>Jm,Xm=t=>Jm=t,at=()=>rt,zN=t=>{["yt","url","file","none"].includes(t)?rt=t:console.warn("Invalid lastWatched platform:",t)};let zt=!1,ur=null,is=0,wa=!1;async function os(t){if(!ye)return;console.debug("Updating watch sync state, roomId:",ye);const e=Mo(ye);try{await Sn(e,{...t,updatedBy:Lt})}catch(n){console.error("Failed to update watch state:",n)}}function GN(t,e,n){if(!t)return;ye=t,Lt=n;const s=Mo(t),r=Fo(t);ir(s,XN,t),ir(r,JN,t),rP()}function au(t){return typeof t=="string"&&t.startsWith("blob:")}async function YN(t,e){if(!ye||!Lt)return!1;const n=Fo(ye);try{return await re(n,{fileName:t,requestedBy:Lt,timestamp:Date.now()}),He&&clearTimeout(He),He=setTimeout(()=>{Ec()},300*1e3),!0}catch(s){return console.error("Failed to create watch request:",s),!1}}async function KN(t){if(!ye)return!1;const e=Fo(ye);try{await Ve(e)}catch(n){console.warn("Failed to remove watch request:",n)}return He&&(clearTimeout(He),He=null),await Nr(t)}async function Ec(){if(!ye)return;He&&(clearTimeout(He),He=null);const t=Fo(ye);try{await Ve(t)}catch(e){console.warn("Failed to cancel watch request:",e)}}function JN(t){const e=t.val();if(!e){He&&(clearTimeout(He),He=null);return}e.requestedBy!==Lt&&window.onFileWatchRequestReceived&&window.onFileWatchRequestReceived(e.fileName)}function XN(t){const e=t.val();e&&e.updatedBy!==Lt&&(Date.now()-is<500||(e.url&&e.url!==lr&&!au(e.url)&&QN(e.url),e.isYouTube?ZN(e):sP(e)))}function QN(t){lr=t,vc(t)?(v(Ie),Qm(t),rt="yt"):(ru(),D(Ie),M.src=t,rt="url"),so()}function ZN(t){!cr()||!WN()||(eP(t),tP(t))}function eP(t){const e=ou(),n=e===qt.PLAYING;if([qt.BUFFERING,qt.UNSTARTED].includes(e)){nP();return}zt||(t.playing&&!n?(iu(),rt="yt"):!t.playing&&n&&(Kr(),rt="yt"))}function tP(t){if(t.currentTime===void 0)return;const e=to();Math.abs(e-t.currentTime)>.3&&!zt&&(qN(t.currentTime),setTimeout(()=>{t.playing?iu():Kr(),rt="yt"},500))}function nP(){zt=!0,clearTimeout(ur),ur=setTimeout(async()=>{zt=!1;const t=ou()===qt.PLAYING;await os({playing:t,currentTime:to()})},700)}function sP(t){is=Date.now(),t.playing!==void 0&&(t.playing&&M.paused?M.play().catch(e=>console.warn("Play failed:",e)):!t.playing&&!M.paused&&M.pause()),t.currentTime!==void 0&&Math.abs(M.currentTime-t.currentTime)>1&&(M.currentTime=t.currentTime,t.playing?M.play().catch(n=>console.warn("Play failed:",n)):M.pause())}function rP(){const t=()=>{rt!=="file"&&(rt="url")};M.addEventListener("play",async()=>{!cr()&&ye&&(is=Date.now(),await os({playing:!0,currentTime:M.currentTime,isYouTube:!1})),t()}),M.addEventListener("pause",async()=>{M.seeking||(!cr()&&ye&&(is=Date.now(),console.log("[SYNC DEBUG] Local pause event:",{currentTime:M.currentTime}),await os({playing:!1,currentTime:M.currentTime,isYouTube:!1})),t())}),M.addEventListener("playing",()=>{wa=!0}),M.addEventListener("pause",()=>{M.seeking||(wa=!1)},!0),M.addEventListener("seeked",async()=>{!cr()&&ye&&(is=Date.now(),await os({currentTime:M.currentTime,playing:wa,isYouTube:!1})),t()})}async function iP(t){if(!t)return!1;is=Date.now();const e=au(t);if(vc(t)){if(v(Ie),!await Qm(t))return!1;rt="yt"}else ru(),D(Ie),M.src=t,rt=e?"file":"url";if(ye){const n=Mo(ye);e?await re(n,{playing:!1,currentTime:0,isYouTube:!1,updatedBy:Lt}):re(n,{url:t,playing:!1,currentTime:0,isYouTube:vc(t),updatedBy:Lt})}return so(),!0}async function Nr(t){let e;if(t instanceof File){if(!t.type.startsWith("video/"))return console.warn("Invalid file type:",t.type),!1;e=URL.createObjectURL(t)}else if(typeof t=="string")e=t;else if(t?.url)e=t.url;else return console.warn("Invalid video source:",t),!1;lr=e;const n=await iP(e);return n||au(lr)&&t instanceof File&&(URL.revokeObjectURL(e),lr=null),n}async function Qm(t){if(!Km(t))return console.error("Invalid YouTube URL:",t),!1;try{return await jN({url:t,onReady:n=>{if(Gm(!0),ye){const s=Mo(ye);re(s,{url:t,playing:!1,currentTime:0,isYouTube:!0,updatedBy:Lt})}},onStateChange:async n=>{if(!cr())return;const r=n.data===qt.PLAYING,i=n.data===qt.PAUSED;if(n.data===qt.BUFFERING){zt=!0,ur&&clearTimeout(ur),ur=setTimeout(async()=>{zt=!1;const c=ou()===qt.PLAYING;await os({playing:c,currentTime:to()})},700);return}i&&zt||!zt&&(r||i)&&await os({playing:r,currentTime:to()})}}),!0}catch(n){return console.error("Failed to load YouTube video:",n),!1}}function oP(t,{inactivityMs:e=3e3,listenTarget:n=document,onShow:s=null,onHide:r=null,hideOnEsc:i=!1,excludeEvents:o=["keydown"]}={}){if(!t)return()=>{};let a=null;const l=["pointermove","pointerdown","pointerup","touchstart","touchmove","mousemove","mousedown","keydown"].filter(m=>!Array.isArray(o)||!o.includes(m));function u(){D(t);try{typeof s=="function"&&s()}catch(m){console.warn("showHideOnInactivity onShow callback error:",m)}a&&clearTimeout(a),a=setTimeout(()=>{v(t);try{typeof r=="function"&&r()}catch(m){console.warn("showHideOnInactivity onHide callback error:",m)}a=null},e)}l.forEach(m=>n.addEventListener(m,u,{passive:!0}));function d(){if(document.hidden){a&&(clearTimeout(a),a=null);try{v(t)}catch(m){console.warn("showHideOnInactivity onHide (visibilitychange) callback error:",m)}}else u()}document.addEventListener("visibilitychange",d);function h(m){if(!m.relatedTarget){a&&(clearTimeout(a),a=null),v(t);try{typeof r=="function"&&r()}catch(A){console.warn("showHideOnInactivity onHide (visibilitychange) callback error:",A)}}}n.addEventListener("mouseout",h);function f(m){if(i&&(m.key==="Escape"||m.key==="Esc")){a&&(clearTimeout(a),a=null),v(t);try{typeof r=="function"&&r()}catch(A){console.warn("showHideOnInactivity onHide (esc) callback error:",A)}}}document.addEventListener("keydown",f);function p(){a||u()}n.addEventListener("touchend",p,{passive:!0}),v(t);function _(){l.forEach(m=>n.removeEventListener(m,u)),document.removeEventListener("visibilitychange",d),n.removeEventListener("mouseout",h),n.removeEventListener("touchend",p),document.removeEventListener("keydown",f),a&&(clearTimeout(a),a=null)}return _}let Et=null,wt=null,Zm="user";function wc(){return Zm}function e_(t){Zm=t}function Vo(){return Et instanceof MediaStream}function cu(){return!Et||!(Et instanceof MediaStream)?(console.error("Invalid remote MediaStream accessed:",Et),null):Et}function t_(t){Et=t}function n_(){Et&&(Et.getTracks().forEach(t=>t.stop()),Et=null)}function s_(){return wt instanceof MediaStream}function jo(){return!wt||!(wt instanceof MediaStream)?(console.error("Invalid local MediaStream accessed:",wt),console.error("Call createLocalStream() before accessing local stream."),null):wt}function no(t){wt=t}function r_(){wt&&(wt.getTracks().forEach(t=>t.stop()),wt=null)}const aP=Object.freeze(Object.defineProperty({__proto__:null,cleanupLocalStream:r_,cleanupRemoteStream:n_,getFacingMode:wc,getLocalStream:jo,getRemoteStream:cu,hasLocalStream:s_,hasRemoteStream:Vo,setFacingMode:e_,setLocalStream:no,setRemoteStream:t_},Symbol.toStringTag,{value:"Module"}));let as=!1,ci=!1,Fh=null,Uh=null,dr=null;const bc=()=>as,lu=()=>{if(!as){if(!ne||!Vo()||ne.paused||ne.readyState<2){ci||(ci=!0,ne.addEventListener("playing",()=>{ci=!1,lu()},{once:!0}));return}if(ci=!1,as=!0,D(se),D(pe),Rr(pe),v(je),v(un),qe.disabled=!0,qe.classList.add("disabled"),nt.disabled=!1,nt.classList.remove("disabled"),st.disabled=!1,st.classList.remove("disabled"),an.disabled=!1,an.classList.remove("disabled"),dr||(dr=oP(Be,{inactivityMs:2500,hideOnEsc:!0})),!Fh){const t=()=>{as&&(Bn()?Rr(se):Xt(se),D(se))};ne.addEventListener("leavepictureinpicture",t),Fh=()=>ne.removeEventListener("leavepictureinpicture",t)}if(!Uh){const t=()=>v(se);ne.addEventListener("enterpictureinpicture",t),Uh=()=>ne.removeEventListener("enterpictureinpicture",t)}}},i_=()=>{as&&(as=!1,Ql(ne)&&document.exitPictureInPicture().catch(()=>{}),Xt(pe),v(pe),Xt(se),v(se),qe.disabled=!1,qe.classList.remove("disabled"),nt.disabled=!0,nt.classList.add("disabled"),st.disabled=!0,st.classList.add("disabled"),an.disabled=!0,an.classList.add("disabled"),dr&&(dr(),dr=null),Bn()||(D(un),D(je),D(Be)))},o_=()=>{if(!Vo())return!1;const t=cu();return t&&t.getVideoTracks().length>0&&t.getVideoTracks()[0].enabled&&t.getVideoTracks()[0].readyState==="live"};function cP(){return"pictureInPictureEnabled"in document&&typeof document.pictureInPictureEnabled=="boolean"&&document.pictureInPictureEnabled}function so(){Bn()||(Xm(!0),v(je),v(un),Be.classList.remove("bottom"),Be.classList.add("watch-mode"),bc()?(v(qe),D(nt)):(v(nt),v(Hs),v(st),D(qe)),v(Ws),v(Bs),D($n),D(Be),bc()&&(v(pe),Xt(pe),v(se),Ql(ne)?Xt(se):cP()?ne.requestPictureInPicture().then(()=>{Xt(se)}).catch(t=>{console.warn("Failed to enter Picture-in-Picture:",t),Rr(se),D(se)}):(Rr(se),D(se))))}function hr(){Bn()&&(v($n),D(qe),D(nt),D(Hs),D(st),D(Ws),D(Bs),Be.classList.remove("watch-mode"),Be.classList.add("bottom"),D(Be),o_()&&(Ql(ne)&&document.exitPictureInPicture().catch(t=>{console.error("Failed to exit Picture-in-Picture:",t)}),Xt(se),D(se)),bc()?(Rr(pe),D(pe)):(D(je),D(un),Xt(pe),v(pe)),Xm(!1))}class cs{constructor(){this.logs=[],this.isEnabled=!0,this.maxLogs=1e3,this.sessionId=this.generateSessionId()}log(e,n,s={}){if(!this.isEnabled)return;const r={timestamp:performance.now(),sessionId:this.sessionId,category:e,event:n,data:{...s},id:this.generateLogId()};this.logs.push(r),this.logs.length>this.maxLogs&&(this.logs=this.logs.slice(-this.maxLogs)),typeof window<"u"&&window.location?.hostname==="localhost"&&console.log(`[DIAG] ${e}:${n}`,s)}logListenerAttachment(e,n,s,r={}){this.log("LISTENER","ATTACHED",{roomId:e,listenerType:n,currentCount:s,...r})}logListenerCleanup(e,n,s={}){this.log("LISTENER","CLEANUP",{removedCount:e.length,preservedCount:n.length,removedRoomIds:e,preservedRoomIds:n,...s})}logDuplicateListener(e,n,s={}){this.log("LISTENER","DUPLICATE_PREVENTED",{roomId:e,listenerType:n,...s})}logIncomingCallEvent(e,n,s,r={}){this.log("INCOMING_CALL","DETECTED",{callerId:e,roomId:n,isFresh:s.isFresh,validationMethod:s.method,age:s.age,reason:s.reason,...r})}logNotificationDecision(e,n,s,r={}){this.log("INCOMING_CALL","NOTIFICATION_DECISION",{decision:e,reason:n,roomId:s,...r})}logCallingUILifecycle(e,n,s={}){this.log("CALLING_UI",e,{roomId:n,...s})}logFirebaseOperation(e,n,s=null,r={}){this.log("FIREBASE","OPERATION",{operation:e,success:n,error:s?{message:s.message,code:s.code,stack:s.stack}:null,...r})}logFirebaseConnectionState(e,n={}){this.log("FIREBASE","CONNECTION_STATE",{state:e,...n})}logRoomCreation(e,n,s,r={}){this.log("ROOM","CREATED",{roomId:e,isInitiator:n,creationTime:s.creationTime,listenerAttachTime:s.listenerAttachTime,timeDiff:s.listenerAttachTime-s.creationTime,...r})}logMemberJoinEvent(e,n,s,r={}){this.log("ROOM","MEMBER_JOINED",{roomId:e,memberId:n,joinedAt:s.joinedAt,role:s.role,...r})}logContactSave(e,n,s={}){this.log("CONTACT","SAVED",{contactId:e,roomId:n,...s})}logContactCall(e,n,s,r={}){this.log("CONTACT","CALL_INITIATED",{contactId:e,roomId:n,forceInitiator:s,...r})}logFreshnessValidation(e,n,s,r={}){this.log("FRESHNESS","VALIDATION",{roomId:e,method:n,result:{isFresh:s.isFresh,age:s.age,threshold:s.threshold,reason:s.reason},...r})}logRaceCondition(e,n,s,r={}){this.log("RACE_CONDITION",e,{roomId:n,events:s,...r})}getLogs(e={}){let n=[...this.logs];return e.category&&(n=n.filter(s=>s.category===e.category)),e.event&&(n=n.filter(s=>s.event===e.event)),e.roomId&&(n=n.filter(s=>s.data.roomId===e.roomId)),e.since&&(n=n.filter(s=>s.timestamp>=e.since)),e.until&&(n=n.filter(s=>s.timestamp<=e.until)),n}getCallFlowTrace(e){return this.getLogs({roomId:e}).sort((n,s)=>n.timestamp-s.timestamp)}getListenerDiagnostics(e=null){const n=this.getLogs({category:"LISTENER"});return e?n.filter(s=>s.data.roomId===e):n}getFailureAnalysis(){const e=this.logs.filter(n=>n.category==="FIREBASE"&&n.data.success===!1||n.category==="INCOMING_CALL"&&n.data.decision==="REJECT"||n.category==="LISTENER"&&n.event==="DUPLICATE_PREVENTED");return{totalFailures:e.length,firebaseFailures:e.filter(n=>n.category==="FIREBASE").length,rejectedCalls:e.filter(n=>n.category==="INCOMING_CALL"&&n.data.decision==="REJECT").length,duplicateListeners:e.filter(n=>n.event==="DUPLICATE_PREVENTED").length,failures:e}}exportDiagnostics(){return{sessionId:this.sessionId,exportTime:Date.now(),logCount:this.logs.length,logs:[...this.logs],summary:this.getFailureAnalysis()}}exportLogsAsJSON(){return JSON.stringify(this.exportDiagnostics(),null,2)}downloadLogs(e=null){e||(e=`diagnostic-logs-${this.sessionId}-${Date.now()}.json`);const n=this.exportLogsAsJSON(),s=new Blob([n],{type:"application/json"}),r=document.createElement("a");r.href=URL.createObjectURL(s),r.download=e,r.click(),URL.revokeObjectURL(r.href)}getLogsInTimeRange(e,n){return this.logs.filter(s=>s.timestamp>=e&&s.timestamp<=n)}getLogsSince(e){return this.logs.filter(n=>n.timestamp>=e)}clearOldLogs(e=1440*60*1e3){const n=Date.now()-e;this.logs=this.logs.filter(s=>s.timestamp>=n)}clearLogs(){this.logs=[]}persistLogs(){try{const e=`diagnostic-logs-${this.sessionId}`;return localStorage.setItem(e,this.exportLogsAsJSON()),e}catch(e){return console.warn("Failed to persist logs to localStorage:",e),null}}loadPersistedLogs(e){try{const n=localStorage.getItem(e);if(n){const s=JSON.parse(n);if(s.logs&&Array.isArray(s.logs)){const r=new Set(this.logs.map(o=>o.id)),i=s.logs.filter(o=>!r.has(o.id));return this.logs=[...this.logs,...i].sort((o,a)=>o.timestamp-a.timestamp),i.length}}return 0}catch(n){return console.warn("Failed to load persisted logs:",n),0}}static getPersistedLogKeys(){const e=[];for(let n=0;n<localStorage.length;n++){const s=localStorage.key(n);s&&s.startsWith("diagnostic-logs-")&&e.push(s)}return e}static cleanupPersistedLogs(e=1440*60*1e3){const n=Date.now()-e;cs.getPersistedLogKeys().forEach(r=>{try{const i=localStorage.getItem(r);if(i){const o=JSON.parse(i);o.exportTime&&o.exportTime<n&&localStorage.removeItem(r)}}catch{localStorage.removeItem(r)}})}enable(){this.isEnabled=!0}disable(){this.isEnabled=!1}generateSessionId(){return`session_${performance.now()}_${Math.random().toString(36).substr(2,9)}`}generateLogId(){return`log_${performance.now()}_${Math.random().toString(36).substr(2,9)}`}formatTimestamp(e){return new Date(e).toISOString()}startTiming(e){const n=`timing_${e}_${Date.now()}`;return this.log("TIMING","START",{operation:e,timingId:n}),n}endTiming(e,n={}){const s=this.logs.find(r=>r.category==="TIMING"&&r.event==="START"&&r.data.timingId===e);if(s){const r=Date.now()-s.timestamp;return this.log("TIMING","END",{timingId:e,duration:r,operation:s.data.operation,...n}),r}return null}}let ba=null;function y(){return ba||(ba=new cs),ba}typeof window<"u"&&(window.diagnosticLogger={getInstance:()=>y(),exportLogs:()=>{const e=y().exportLogsAsJSON();return console.log("Diagnostic logs exported:"),console.log(e),e},downloadLogs:t=>{y().downloadLogs(t),console.log("Diagnostic logs downloaded")},getRoomLogs:t=>{const n=y().getCallFlowTrace(t);return console.log(`Logs for room ${t}:`,n),n},getFailures:()=>{const e=y().getFailureAnalysis();return console.log("Failure analysis:",e),e},getListenerDiagnostics:t=>{const n=y().getListenerDiagnostics(t);return console.log("Listener diagnostics:",n),n},getLogsSince:t=>{const n=y().getLogsSince(t);return console.log(`Logs since ${new Date(t).toISOString()}:`,n),n},getLogsInRange:(t,e)=>{const s=y().getLogsInTimeRange(t,e);return console.log(`Logs from ${new Date(t).toISOString()} to ${new Date(e).toISOString()}:`,s),s},persistLogs:()=>{const e=y().persistLogs();return console.log(`Logs persisted with key: ${e}`),e},loadPersistedLogs:t=>{const n=y().loadPersistedLogs(t);return console.log(`Loaded ${n} persisted logs`),n},getPersistedKeys:()=>{const t=cs.getPersistedLogKeys();return console.log("Persisted log keys:",t),t},clearLogs:()=>{y().clearLogs(),console.log("Diagnostic logs cleared")},enable:()=>{y().enable(),console.log("Diagnostic logging enabled")},disable:()=>{y().disable(),console.log("Diagnostic logging disabled")},getSessionInfo:()=>{const t=y(),e={sessionId:t.sessionId,logCount:t.logs.length,isEnabled:t.isEnabled,maxLogs:t.maxLogs};return console.log("Session info:",e),e},help:()=>{console.log(`
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
      `)}},window.addEventListener("beforeunload",()=>{try{const t=y();t.logs.length>0&&t.persistLogs(),cs.cleanupPersistedLogs()}catch{}}),(window.location.hostname==="localhost"||window.location.hostname==="127.0.0.1")&&setTimeout(()=>{try{const t=y(),e=typeof localStorage<"u"&&localStorage.getItem("debug:console")==="1";if(!t.isEnabled||!e)return;const n=cs.getPersistedLogKeys();n.length>0&&(console.log(`Found ${n.length} persisted diagnostic log sessions. Use diagnosticLogger.loadPersistedLogs(key) to load them.`),console.log("Available keys:",n))}catch{}},1e3));class lP{constructor(){this.currentRoomId=null}async createNewRoom(e,n,s=null){const r=Date.now();s||(s=Math.random().toString(36).substring(2,15)),y().log("ROOM","CREATE_START",{roomId:s,userId:n,hasOffer:!!e,timestamp:r});const i=pn(s);try{return await re(i,{offer:{type:e.type,sdp:e.sdp},createdAt:Date.now(),createdBy:n}),y().logFirebaseOperation("create_room",!0,null,{roomId:s,userId:n,duration:Date.now()-r}),await this.joinRoom(s,n),y().log("ROOM","CREATE_COMPLETE",{roomId:s,userId:n,totalDuration:Date.now()-r}),s}catch(o){throw y().logFirebaseOperation("create_room",!1,o,{roomId:s,userId:n,duration:Date.now()-r}),o}}async checkRoomStatus(e){const n=pn(e),s=await et(n);if(!s.exists())return{exists:!1,hasMembers:!1,memberCount:0};const r=s.val(),i=r.members||{},o=Object.keys(i).length;return{exists:!0,hasMembers:o>0,memberCount:o,roomData:r}}async getRoomData(e){const n=pn(e),s=await et(n);if(!s.exists())throw new Error("Room does not exist");return s.val()}async saveAnswer(e,n){const s=pn(e);await Sn(s,{answer:n})}async joinRoom(e,n,s="Guest User"){const r=yh(e,n);await re(r,{displayName:s,joinedAt:Date.now()}),y().logFirebaseOperation("set","joinRoom",`rooms/${e}/members/${n}`)}async leaveRoom(e,n=null,{deleteRoomIfEmpty:s=!0}={}){const r=n||this.currentRoomId;if(!r||!e)return;const i=yh(r,e),o=oi(r),a=pn(r);try{await Ve(i)}catch(c){y().logFirebaseOperation("leave_room_remove_member",!1,c,{roomId:r,userId:e})}if(s)try{const c=await et(o),l=c.exists()?c.val():{};(l?Object.keys(l).length:0)===0&&await Ve(a).catch(d=>{y().logFirebaseOperation("delete_empty_room",!1,d,{roomId:r})})}catch(c){y().logFirebaseOperation("check_members_after_leave",!1,c,{roomId:r})}(!n||n===this.currentRoomId)&&(this.currentRoomId=null)}async rejectCall(e,n,s="user_rejected"){if(!e||!n)return;const r=pn(e),i={rejection:{by:n,reason:s,at:Date.now()}};try{await Sn(r,i),y().log("ROOM","REJECT_SET",{roomId:e,byUserId:n,reason:s})}catch(o){throw y().log("ROOM","REJECT_SET_FAILED",{roomId:e,byUserId:n,reason:s,error:String(o?.message||o)}),o}}async cancelCall(e,n,s="caller_cancelled"){if(!e||!n)return;const r=pn(e),i={cancellation:{by:n,reason:s,at:Date.now()}};try{await Sn(r,i),y().log("ROOM","CANCEL_SET",{roomId:e,byUserId:n,reason:s})}catch(o){throw y().log("ROOM","CANCEL_SET_FAILED",{roomId:e,byUserId:n,reason:s,error:String(o?.message||o)}),o}}onCallCancelled(e,n){const s=aR(e);En(s,"value",n,e),y().logFirebaseOperation("on","onCallCancelled",`rooms/${e}/cancellation`,{event:"value"})}onMemberJoined(e,n){const s=oi(e);En(s,"child_added",n,e),y().logFirebaseOperation("on","onMemberJoined",`rooms/${e}/members`,{event:"child_added"})}onMemberLeft(e,n){const s=oi(e);En(s,"child_removed",n,e),y().logFirebaseOperation("on","onMemberLeft",`rooms/${e}/members`,{event:"child_removed"})}onIncomingCall(e,n,s){const r=oi(e),i=a=>{s("join",a.key,a.val())},o=a=>{s("leave",a.key,a.val())};return En(r,"child_added",i,e,n),En(r,"child_removed",o,e,n),()=>oR(n,e)}get roomId(){return this.currentRoomId}}const ee=new lP;class uP{constructor(e,{loop:n=!1,volume:s=.5}={}){this.src=e,this.audio=new Audio(e),this.audio.loop=n,this.audio.volume=Math.max(0,Math.min(1,s)),this.isPlaying=!1,this.audio.onerror=r=>{console.error(`[AudioPlayer] Failed to load audio: ${e}`,r),this.isPlaying=!1},this.audio.onplay=()=>{this.isPlaying=!0},this.audio.onpause=()=>{this.isPlaying=!1},this.audio.onended=()=>{this.isPlaying=!1}}async play(){if(!this.audio)return!1;if(this.isPlaying)return!0;try{return await this.audio.play(),this.isPlaying=!0,!0}catch(e){return e.name==="NotAllowedError"?console.warn("[AudioPlayer] Autoplay blocked - user interaction required first",{src:this.src}):e.name==="NotSupportedError"?console.error("[AudioPlayer] Audio format not supported",{src:this.src}):console.error("[AudioPlayer] Playback error:",e),this.isPlaying=!1,!1}}stop(){this.audio&&(this.audio.pause(),this.audio.currentTime=0,this.isPlaying=!1)}pause(){this.audio&&(this.audio.pause(),this.isPlaying=!1)}setVolume(e){this.audio&&(this.audio.volume=Math.max(0,Math.min(1,e)))}getVolume(){return this.audio?.volume??0}dispose(){this.stop(),this.audio&&(this.audio.onerror=null,this.audio.onplay=null,this.audio.onpause=null,this.audio.onended=null,this.audio.src="",this.audio=null),this.isPlaying=!1}}class dP{constructor({incomingSrc:e,outgoingSrc:n,volume:s}={}){this.incomingSrc=e??"/sounds/incoming.mp3",this.outgoingSrc=n??"/sounds/outgoing.mp3",this.defaultVolume=s??.7,this.currentPlayer=null,this.currentType=null}configure({incomingSrc:e,outgoingSrc:n,volume:s}={}){e!==void 0&&(this.incomingSrc=e),n!==void 0&&(this.outgoingSrc=n),s!==void 0&&(this.defaultVolume=s)}setIncomingRingtone(e){this.incomingSrc=e}setOutgoingRingtone(e){this.outgoingSrc=e}setVolume(e){this.defaultVolume=Math.max(0,Math.min(1,e))}async playIncoming(){return this._play("incoming",this.incomingSrc)}async playOutgoing(){return this._play("outgoing",this.outgoingSrc)}async _play(e,n){this.stop();try{this.currentPlayer=new uP(n,{loop:!0,volume:this.defaultVolume}),this.currentType=e;const s=await this.currentPlayer.play();return s?console.log(`[Ringtone] Playing ${e} ringtone`):(console.warn(`[Ringtone] Failed to start ${e} ringtone (likely autoplay blocked)`),this.currentPlayer?.dispose(),this.currentPlayer=null,this.currentType=null),s}catch(s){return console.error(`[Ringtone] Error playing ${e} ringtone:`,s),this.currentPlayer?.dispose(),this.currentPlayer=null,this.currentType=null,!1}}stop(){this.currentPlayer&&(console.log(`[Ringtone] Stopping ${this.currentType} ringtone`),this.currentPlayer.stop(),this.currentPlayer.dispose(),this.currentPlayer=null,this.currentType=null)}isPlaying(){return this.currentPlayer?.isPlaying??!1}getCurrentType(){return this.currentType}}const ls=new dP,ro=3e4;let mt=null,Qs=null;async function hP(t,e=null){const n=_e(),s=q();if(!s)return;const r=Fl(s);await re(r,{roomId:t,targetContactName:e,initiatedAt:Date.now(),callerUserId:n})}async function io(){const t=q();if(!t)return;const e=Fl(t);await Ve(e).catch(()=>{})}async function a_(t,e){if(!t)return!1;try{const n=Fl(t),s=await et(n);if(!s.exists())return!1;const r=s.val();return r.roomId!==e?!1:Date.now()-r.initiatedAt<ro}catch(n){return console.warn("Failed to check outgoing call freshness",n),!1}}async function c_(t){if(!t)return!1;try{const e=k(R,`rooms/${t}/createdAt`),n=await et(e);if(!n.exists())return!1;const s=n.val();return typeof s!="number"?!1:Date.now()-s<ro}catch(e){return console.warn("Failed to check room freshness",e),!1}}async function l_(t,e,n){const s=y(),r=Date.now();kn(),await hP(t,e);const i=document.createElement("div");i.id="calling-modal",i.style.cssText=`
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
  `;const u=async()=>{s.logCallingUILifecycle("CANCEL",t,{contactName:e,reason:"user_cancelled",duration:Date.now()-r});try{await Promise.all([io(),ee.cancelCall(t,_e(),"caller_cancelled"),ee.leaveRoom(_e(),t)])}catch(d){s.log("ROOM","CALLER_CANCELLED_CLEANUP_FAIL",{roomId:t,error:String(d)})}ls.stop(),kn()};l.onclick=u,o.appendChild(a),o.appendChild(c),o.appendChild(l),i.appendChild(o),document.body.appendChild(i),i.dataset.roomId=t,mt=i,ls.playOutgoing(),Qs=setTimeout(async()=>{s.logCallingUILifecycle("TIMEOUT",t,{contactName:e,reason:"auto_timeout",duration:Date.now()-r,timeoutMs:ro});try{await Promise.all([io(),ee.cancelCall(t,_e(),"auto_timeout"),ee.leaveRoom(_e(),t)])}catch(d){s.log("ROOM","CALLER_TIMEOUT_CLEANUP_FAIL",{roomId:t,error:String(d)})}ls.stop(),kn()},ro)}function kn(){if(ls.stop(),mt){const t=mt.dataset?.roomId||"unknown";y().logCallingUILifecycle("HIDE",t,{reason:"hide_called",hadTimeout:!!Qs,timestamp:Date.now()})}Qs&&(clearTimeout(Qs),Qs=null),mt&&(mt.remove(),mt=null)}async function uu(){if(mt){const t=mt.dataset?.roomId||"unknown";y().logCallingUILifecycle("ANSWERED",t,{reason:"call_answered",timestamp:Date.now()})}await io(),kn()}async function fP(t="user_rejected"){const e=y(),n=mt?.dataset?.roomId||"unknown";e.logCallingUILifecycle("REJECTED",n,{reason:t,timestamp:Date.now()}),await io(),kn()}const pP=Object.freeze(Object.defineProperty({__proto__:null,hideCallingUI:kn,isOutgoingCallFresh:a_,isRoomCallFresh:c_,onCallAnswered:uu,onCallRejected:fP,showCallingUI:l_},Symbol.toStringTag,{value:"Module"}));let us=null;function qo(t,e={}){return new Promise(n=>{const s=document.createElement("dialog");s.innerHTML=`
      <p>${t}</p>
      <div class="confirm-dialog-actions">
        <button data-action="cancel">Cancel</button>
        <button data-action="confirm" autofocus>Confirm</button>
      </div>
    `,s.classList.add("confirm-dialog");const r=s.querySelector('[data-action="confirm"]'),i=s.querySelector('[data-action="cancel"]');if(!r||!i){console.error("dialog element not found!"),n(!1);return}let o=null;function a(c){o&&clearTimeout(o),s.close(),s.remove(),us===a&&(us=null),n(c)}r.addEventListener("click",()=>{a(!0)}),i.addEventListener("click",()=>{a(!1)}),s.addEventListener("cancel",()=>a(!1)),document.body.appendChild(s),s.showModal(),us=a,e.autoRemoveSeconds&&typeof e.autoRemoveSeconds=="number"&&e.autoRemoveSeconds>0&&(o=setTimeout(()=>{a(!1)},e.autoRemoveSeconds*1e3))})}function gP(){if(typeof us=="function"){try{us(!1)}catch{}return us=null,!0}return!1}const mP=Object.freeze(Object.defineProperty({__proto__:null,default:qo,dismissActiveConfirmDialog:gP},Symbol.toStringTag,{value:"Module"}));class _P{async send(e,n){throw new Error("MessagingTransport.send() must be implemented by subclass")}listen(e,n){throw new Error("MessagingTransport.listen() must be implemented by subclass")}async getUnreadCount(e){throw new Error("MessagingTransport.getUnreadCount() must be implemented by subclass")}async markAsRead(e){throw new Error("MessagingTransport.markAsRead() must be implemented by subclass")}listenToUnreadCount(e,n){throw new Error("MessagingTransport.listenToUnreadCount() must be implemented by subclass")}}const $h=100;class yP extends _P{_getConversationId(e,n){return[e,n].sort().join("_")}async send(e,n){const s=q();if(!s)throw new Error("Cannot send message: not logged in");const i=Un()?.displayName||"Guest User",o=this._getConversationId(s,e),a=zi(k(R,`conversations/${o}/messages`));await re(a,{text:n,from:s,fromName:i,sentAt:Tn(),read:!1}),this._cleanupOldMessages(o).catch(c=>{console.warn("[RTDBTransport] Failed to cleanup old messages:",c)})}listen(e,n){const s=q();if(!s)return console.warn("[RTDBTransport] Cannot listen to messages: not logged in"),()=>{};const r=this._getConversationId(s,e),i=k(R,`conversations/${r}/messages`),o=new Set,a=c=>{const l=c.key,u=c.val();if(!u||o.has(l))return;o.add(l);const d=u.from===s;n(u.text,u,d)};return bs(i,a),()=>{It(i,"child_added",a)}}async getUnreadCount(e){const n=q();if(!n)return 0;const s=this._getConversationId(n,e),r=k(R,`conversations/${s}/messages`),{get:i}=await lt(async()=>{const{get:o}=await Promise.resolve().then(()=>mk);return{get:o}},void 0);try{const o=await i(r);if(!o.exists())return 0;const a=o.val();return Object.values(a).filter(c=>!c.read&&c.from===e).length}catch(o){return console.warn("[RTDBTransport] Failed to get unread count:",o),0}}async markAsRead(e){const n=q();if(!n)return;const s=this._getConversationId(n,e),r=k(R,`conversations/${s}/messages`);try{const i=await et(r);if(!i.exists())return;const o=i.val(),a={};Object.entries(o).forEach(([c,l])=>{!l.read&&l.from===e&&(a[`conversations/${s}/messages/${c}/read`]=!0)}),Object.keys(a).length>0&&await Sn(k(R),a)}catch(i){console.warn("[RTDBTransport] Failed to mark messages as read:",i)}}listenToUnreadCount(e,n){const s=q();if(!s)return console.warn("[RTDBTransport] Cannot listen to unread count: not logged in"),()=>{};const r=this._getConversationId(s,e),i=k(R,`conversations/${r}/messages`),o=async()=>{try{const l=await this.getUnreadCount(e);n(l)}catch(l){console.warn("[RTDBTransport] Failed to get unread count:",l)}},a=async l=>{const u=l.val();u&&u.from===e&&!u.read&&await o()},c=async l=>{const u=l.val();u&&u.from===e&&await o()};return bs(i,a),Ng(i,c),()=>{It(i,"child_added",a),It(i,"child_changed",c)}}async _cleanupOldMessages(e){const n=k(R,`conversations/${e}/messages`),s=await et(n);if(!s.exists())return;const r=s.val(),i=Object.keys(r).length;if(i<=$h)return;const o=i-$h,a=Object.entries(r).sort((l,u)=>(l[1].sentAt||0)-(u[1].sentAt||0)),c={};for(let l=0;l<o;l++){const[u]=a[l];c[`conversations/${e}/messages/${u}`]=null}await Sn(k(R),c),console.log(`[RTDBTransport] Cleaned up ${o} old messages from conversation ${e}`)}}class vP{constructor(e,n=null){if(!e)throw new Error("MessagingController requires a transport implementation");this.transport=e,this.fileTransport=n,this.sessions=new Map}openSession(e,{onMessage:n,onUnreadChange:s}={}){if(!e||typeof e!="string")throw new Error("contactId must be a non-empty string");if(this.sessions.has(e))return console.info(`[MessagingController] Session already open for ${e}`),this.sessions.get(e);const r=this.transport.listen(e,(o,a,c)=>{n&&typeof n=="function"&&n(o,a,c),!c&&s&&typeof s=="function"&&this.transport.getUnreadCount(e).then(l=>s(l)).catch(l=>console.warn("[MessagingController] Failed to get unread count:",l))}),i={contactId:e,send:o=>!o||typeof o!="string"?Promise.reject(new Error("Message text must be a non-empty string")):this.transport.send(e,o),markAsRead:()=>this.transport.markAsRead(e),getUnreadCount:()=>this.transport.getUnreadCount(e),close:()=>{this.closeSession(e)},_unsubscribe:r};return this.sessions.set(e,i),i}closeSession(e){const n=this.sessions.get(e);n&&(n._unsubscribe&&typeof n._unsubscribe=="function"&&n._unsubscribe(),this.sessions.delete(e))}getSession(e){return this.sessions.get(e)}getAllSessions(){return Array.from(this.sessions.values())}closeAllSessions(){this.sessions.forEach(e=>{e._unsubscribe&&typeof e._unsubscribe=="function"&&e._unsubscribe()}),this.sessions.clear()}async getUnreadCount(e){if(!e||typeof e!="string")throw new Error("contactId must be a non-empty string");return this.transport.getUnreadCount(e)}listenToUnreadCount(e,n){if(!e||typeof e!="string")throw new Error("contactId must be a non-empty string");if(typeof n!="function")throw new Error("onCountChange must be a function");return this.transport.listenToUnreadCount(e,n)}setFileTransport(e){this.fileTransport=e}canSendFiles(){return this.fileTransport!==null&&this.fileTransport.isReady()}async sendFile(e,n){if(!this.fileTransport)throw new Error("File transport not available. Files can only be sent during active calls.");if(!this.fileTransport.isReady())throw new Error("File transport not ready");return this.fileTransport.sendFile(e,n)}onFileReceived(e){if(!this.fileTransport)throw new Error("File transport not available");if(typeof e!="function")throw new Error("onFileReceived callback must be a function");this.fileTransport.onFileReceived(e)}clearFileTransport(){this.fileTransport&&(this.fileTransport.cleanup(),this.fileTransport=null)}}const Qt=new vP(new yP);function oo(t,e,n={}){if(!t||typeof e!="function")throw new Error("closeOnClickOutside: valid element and onClose callback required");const{ignore:s=[],esc:r=!0,events:i=["mousedown","touchstart"]}=n,o=Array.isArray(s)?s.filter(Boolean):[],a=l=>{try{const u=l.target;if(t.contains(u))return;for(const d of o)if(d&&d.contains&&d.contains(u)||d===u)return;e(l)}catch(u){console.error("closeOnClickOutside handler error:",u)}},c=l=>{r&&l.key==="Escape"&&e(l)};return i.forEach(l=>document.addEventListener(l,a,{passive:!0})),r&&document.addEventListener("keydown",c),function(){i.forEach(u=>document.removeEventListener(u,a,{passive:!0})),r&&document.removeEventListener("keydown",c)}}function u_({parent:t,onToggle:e,icon:n="💬",initialUnreadCount:s=0,id:r=null,startHidden:i=!1}={}){if(!t)return console.error("createMessageToggle: parent element is required"),null;if(typeof e!="function")return console.error("createMessageToggle: onToggle callback is required"),null;const o=Jl({initialProps:{unreadCount:s},template:`
      <div class="messages-toggle-btn">
        <button onclick="handleToggle">
          ${n}
          <span class="notification-badge">
            \${unreadCount}
          </span>
        </button>
      </div>
    `,handlers:{handleToggle:c=>{c.preventDefault(),c.stopPropagation(),e()}},className:"messages-toggle-container"+(i?" hidden":""),autoAppend:!1});if(r&&o&&typeof r=="string")try{o.id=r}catch(c){console.warn("createMessageToggle: failed to set id on toggleContainer",c)}let a=o.querySelector(".notification-badge");return a&&(a.style.display=s>0?"flex":"none"),o.onPropUpdated("unreadCount",c=>{const l=o.querySelector(".notification-badge");if(l&&(l.style.display=c>0?"flex":"none"),c>0){const u=o.querySelector(".messages-toggle-btn");u&&(u.classList.add("new-message"),setTimeout(()=>{u.classList.remove("new-message")},4e3))}}),t.appendChild(o),{element:o,setUnreadCount(c){let l=Number(c);(!Number.isFinite(l)||l<0)&&(l=0),o.unreadCount=l},clearBadge(){this.setUnreadCount(0)},cleanup(){if(o&&typeof o.dispose=="function")try{o.dispose()}catch(c){console.warn("createMessageToggle: error during dispose()",c)}if(o&&o.parentNode)try{o.parentNode.removeChild(o)}catch{}}}}function Bh(t=!1){if(typeof window>"u"||typeof navigator>"u")return!1;const e=navigator.userAgent||navigator.vendor||"",n=/iPad|iPhone|iPod/.test(e),s=/Macintosh/.test(e)&&typeof navigator.maxTouchPoints=="number"&&navigator.maxTouchPoints>1,r=(n||s)&&!window.MSStream,i=/Android/i.test(e),o=r||i;return t&&console.table({"User Agent":e,isAndroid:i,isiOSUA:n,isiPadOSDesktopUA:s,isMobileDevice:o}),o}function EP(){const t=document.createElement("div");t.innerHTML=`
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
  `,document.body.appendChild(t);const e=t.querySelector("#messages-box"),n=t.querySelector("#messages"),s=t.querySelector("#messages-form"),r=t.querySelector("#messages-input");"virtualKeyboard"in navigator&&(navigator.virtualKeyboard.overlaysContent=!0);const i=CSS.supports?.("field-sizing","content");let o=null;if(r&&r.tagName==="TEXTAREA"&&!i){const a=()=>{r.style.height="auto",r.style.height=`${r.scrollHeight}px`};r.addEventListener("input",a,{passive:!0}),o=()=>{r.style.height=""},requestAnimationFrame(a)}return{messagesBoxContainer:t,messagesBox:e,messagesMessages:n,messagesForm:s,messagesInput:r,resetInputHeight:o}}const wP=CSS.supports?.("position-anchor: --msg-toggle")&&CSS.supports?.("right: anchor(right)")&&CSS.supports?.("bottom: anchor(top)");function bP(t){const e=t.getBoundingClientRect();return e.top>=0&&e.left>=0&&e.bottom<=window.innerHeight&&e.right<=window.innerWidth}function CP(){let t=!1,e=null,n=null,s=!1,r=new Map;const i=document.querySelector(".top-bar .top-right-menu")||document.querySelector(".top-right-menu"),o=u_({parent:i,onToggle:()=>zo(),icon:"💬",initialUnreadCount:0,id:"main-messages-toggle-btn",startHidden:!0});if(!o)return console.error("Messages UI: failed to initialize message toggle; aborting messages UI initialization."),null;const a=o.element,{messagesBoxContainer:c,messagesBox:l,messagesMessages:u,messagesForm:d,messagesInput:h,resetInputHeight:f}=EP();if(!a||!l||!u||!d||!h)return console.error("Messages UI elements not found."),null;const p=document.getElementById("attach-file-btn"),_=document.getElementById("file-input"),m=d.querySelector('button[type="submit"]');v(p),p.addEventListener("click",()=>{_.click()}),_.addEventListener("change",async b=>{const T=b.target.files[0];if(!T||!n){n||console.warn("[MessagesUI] FileTransfer not initialized");return}const O=m.textContent;m.textContent="Sending...";try{await n.sendFile(T,F=>{m.textContent=`${Math.round(F*100)}%`}),T.type.startsWith("video/")&&r.set(T.name,T),Ee(`📎 Sent: ${T.name}`,{isSentByMe:!0})}catch(F){console.error("[MessagesUI] File send failed:",F),Ee("❌ Failed to send file")}finally{m.textContent=O,_.value=""}});async function A(b){return new Promise(T=>{const O=document.createElement("div");O.className="file-action-overlay",O.style.cssText=`
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
      `,O.appendChild(F),document.body.appendChild(O);const le=F.querySelector("#file-name-display");le.textContent=b;const ue=F.querySelector("#download-file-btn"),oe=F.querySelector("#watch-together-btn");ue.addEventListener("mouseenter",()=>{ue.style.background="var(--bg-hover, #333)"}),ue.addEventListener("mouseleave",()=>{ue.style.background="var(--bg-secondary, #2a2a2a)"}),oe.addEventListener("mouseenter",()=>{oe.style.opacity="0.9"}),oe.addEventListener("mouseleave",()=>{oe.style.opacity="1"}),ue.addEventListener("click",()=>{O.remove(),T("download")}),oe.addEventListener("click",()=>{O.remove(),T("watch")}),O.addEventListener("click",xt=>{xt.target===O&&(O.remove(),T("download"))})})}async function B(b){return new Promise(T=>{const O=document.createElement("div");O.className="watch-request-overlay",O.style.cssText=`
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
      `,O.appendChild(F),document.body.appendChild(O);const le=F.querySelector("#watch-request-filename");le.textContent=b;const ue=F.querySelector("#decline-watch-btn"),oe=F.querySelector("#accept-watch-btn");ue.addEventListener("mouseenter",()=>{ue.style.background="var(--bg-hover, #333)"}),ue.addEventListener("mouseleave",()=>{ue.style.background="var(--bg-secondary, #2a2a2a)"}),oe.addEventListener("mouseenter",()=>{oe.style.opacity="0.9"}),oe.addEventListener("mouseleave",()=>{oe.style.opacity="1"}),ue.addEventListener("click",()=>{O.remove(),T(!1)}),oe.addEventListener("click",()=>{O.remove(),T(!0)}),O.addEventListener("click",xt=>{xt.target===O&&(O.remove(),T(!1))})})}window.onFileWatchRequestReceived=async b=>{const T=r.get(b);if(!T){Ee(`❌ File not available to watch together: ${b}`),await Ec();return}Ee(`🎬 Partner wants to watch: ${b}`),await B(b)?(Ee("✅ Joining watch together..."),await KN(T)||Ee("❌ Failed to load video")):(Ee("❌ Declined watch together request"),await Ec())};function x(){if(!a||!l||l.classList.contains("hidden"))return;const b=a.getBoundingClientRect(),T=l.getBoundingClientRect(),O=8;let F=b.top-T.height-O;F<8&&(F=b.bottom+O);let le=b.left+b.width/2-T.width/2;const ue=window.innerWidth-T.width-8;le<8&&(le=8),le>ue&&(le=ue),l.style.top=`${Math.round(F)}px`,l.style.left=`${Math.round(le)}px`}function w(){t||(t=!0,window.addEventListener("resize",x,{passive:!0}),window.addEventListener("scroll",x,{passive:!0}),window.addEventListener("orientationchange",x,{passive:!0}))}function ie(){t&&(t=!1,window.removeEventListener("resize",x),window.removeEventListener("scroll",x),window.removeEventListener("orientationchange",x))}let Me=null;const ze=new MutationObserver(b=>{b.forEach(T=>{T.type==="attributes"&&T.attributeName==="class"&&(l.classList.contains("hidden")||(o.clearBadge(),e?.toggle&&e.toggle.clearBadge()))})});ze.observe(l,{attributes:!0});function be(){return!l.classList.contains("hidden")}function Dt(){return document.activeElement===h}function Xr(){Dt()||h.focus()}function I_(){Dt()&&h.blur()}function zo(){l.classList.toggle("hidden"),be()?(Bh()||h.focus(),wP?requestAnimationFrame(()=>{bP(l)||(x(),w())}):(x(),w()),vu()):(document.activeElement===h&&h.blur(),ie(),l.style.top="",l.style.left="",l.style.bottom="",l.style.right="")}Bh()||(Me=oo(l,()=>{v(l),ie(),l.style.top="",l.style.left="",l.style.bottom="",l.style.right=""},{ignore:[o.element],esc:!0}));function k_(){D(o.element)}function yu(){v(o.element)}function Ee(b,T={}){const{isSentByMe:O,senderDisplay:F,fileDownload:le}=T,ue=F??(O===!0?"Me":""),oe=document.createElement("p");O===!0?oe.classList.add("message-local"):O===!1&&oe.classList.add("message-remote");const xt=document.createElement("span");xt.className="sender-avatar"+(O===!0?" sender-avatar--me":""),xt.textContent=ue,xt.setAttribute("aria-hidden","true");const Vs=document.createElement("span");if(Vs.className="message-text",!F&&typeof O>"u"&&oe.classList.add("message-system"),le){const{fileName:Yo,url:bu}=le,Cu=b.split(Yo)[0];Cu&&Vs.appendChild(document.createTextNode(Cu));const hn=document.createElement("a");hn.textContent=Yo,hn.href=bu,hn.download=Yo,hn.style.cursor="pointer",hn.style.textDecoration="underline",hn.addEventListener("click",()=>{setTimeout(()=>URL.revokeObjectURL(bu),100)}),Vs.appendChild(hn)}else Vs.appendChild(document.createTextNode(b));le&&oe.classList.add("message-system"),oe.appendChild(xt),oe.appendChild(Vs),u.appendChild(oe),vu()}let dn=null;function vu(){u&&(dn!==null&&cancelAnimationFrame(dn),dn=requestAnimationFrame(()=>{u.scrollTop=u.scrollHeight,dn=null}))}function R_(b,{isUnread:T=!0,senderDisplay:O="U"}={}){if(Ee(b,{isSentByMe:!1,senderDisplay:O}),Zi(l)&&T){const F=o.element.unreadCount||0;o.setUnreadCount(F+1)}}function Eu(){const b=h.value.trim();b&&(e?(e.send(b),h.value="",f&&f()):console.warn("[MessagesUI] No active session to send message"))}d.addEventListener("submit",b=>{b.preventDefault(),Eu()}),h.addEventListener("keydown",b=>{b.key==="Enter"&&!b.shiftKey&&(b.preventDefault(),Eu())});const A_=()=>{const b=document.activeElement;return b&&(b.tagName==="INPUT"||b.tagName==="TEXTAREA"||b.isContentEditable)},wu=b=>{(b.key==="m"||b.key==="M")&&!be()&&!A_()&&(b.preventDefault(),zo())};document.addEventListener("keydown",wu);function Go(){dn!==null&&(cancelAnimationFrame(dn),dn=null),u.innerHTML="",u.scrollTop=0}function N_(b){e!==null&&e!==b&&Go(),e=b}function P_(){return e}function L_(b){n=b,n?(D(p),n.onFileReceived=async T=>{const O=URL.createObjectURL(T);if(T.type.startsWith("video/"))if(await A(T.name)==="watch"){if(Ee(`📹 Received video: ${T.name}`,{isSentByMe:!1}),Ee("🎬 Requesting partner to join watch together..."),!await Nr(T)){Ee("❌ Failed to load video");return}const ue=await YN(T.name);Ee(ue?"⏳ Waiting for partner to join...":"❌ Failed to send watch request")}else{const le=document.createElement("a");le.href=O,le.download=T.name,le.click(),setTimeout(()=>URL.revokeObjectURL(O),1e3),Ee(`📎 Downloaded: ${T.name}`)}else Ee(`📎 Received: ${T.name}`,{isSentByMe:!1,fileDownload:{fileName:T.name,url:O}});if(Zi(l)){const F=o.element.unreadCount||0;o.setUnreadCount(F+1)}s&&(m.textContent="Send",s=!1)},n.onReceiveProgress=T=>{s=!0,m.textContent=`${Math.round(T*100)}%`}):v(p)}function O_(){Go(),e=null,n=null,s=!1,yu(),v(l),o.clearBadge(),h.value="",f&&f(),m&&(m.textContent="Send"),v(p),l.style.top="",l.style.left="",l.style.bottom="",l.style.right="",ie()}function D_(){if(o&&o.cleanup(),ie(),typeof Me=="function")try{Me()}catch(b){console.error("Error removing messages box outside click handler:",b)}ze.disconnect(),document.removeEventListener("keydown",wu),c&&c.parentNode&&c.parentNode.removeChild(c)}return{appendChatMessage:Ee,receiveMessage:R_,isMessagesUIOpen:be,toggleMessages:zo,showMessagesToggle:k_,hideMessagesToggle:yu,isMessageInputFocused:Dt,focusMessageInput:Xr,unfocusMessageInput:I_,setSession:N_,getCurrentSession:P_,clearMessages:Go,setFileTransfer:L_,reset:O_,cleanup:D_}}const Ce=CP();function ao(t,e){if(!t||!e)throw new Error("Both user IDs are required");if(t===e)throw new Error("Cannot create room ID for same user");const[n,s]=[t,e].sort(),r=`${n}_${s}`;let i=0;for(let u=0;u<r.length;u++){const d=r.charCodeAt(u);i=(i<<5)-i+d,i=i&i}let o=5381;for(let u=0;u<r.length;u++)o=(o<<5)+o+r.charCodeAt(u);const a=Math.abs(i).toString(36),c=Math.abs(o).toString(36);return(a+c).slice(0,16).padEnd(16,"0")}const Ca=new Map,Sa=new Map,Xn=new Map,Hh=14;async function Cc(t,e,n){const s=q();if(s){const r=k(R,`users/${s}/contacts/${t}`);await re(r,{contactId:t,contactName:e,roomId:n,savedAt:Date.now()});return}try{const r=localStorage.getItem("contacts")||"{}",i=JSON.parse(r);i[t]={contactId:t,contactName:e,roomId:n,savedAt:Date.now()},localStorage.setItem("contacts",JSON.stringify(i))}catch(r){console.warn("Failed to save contact to localStorage",r)}}async function Pr(){const t=q();if(t)try{const e=k(R,`users/${t}/contacts`),n=await et(e);return n.exists()?n.val():{}}catch(e){return console.warn("Failed to read contacts from RTDB",e),{}}try{const e=localStorage.getItem("contacts")||"{}";return JSON.parse(e)}catch(e){return console.warn("Failed to read contacts from localStorage",e),{}}}async function SP(t,e){if(!t)return e||"Unknown";try{const n=await Pr();for(const s of Object.values(n||{}))if(s?.roomId===t)return s.contactName||s.contactId||e}catch(n){console.warn("Failed to resolve caller name",n)}return e||"Unknown"}async function TP(t,e,n){if(!t||!e)return;const r=(await Pr())?.[t];if(r){r.roomId!==e&&(await Cc(t,r.contactName,e),await Hn(n)),Ss(e);return}if(!await qo("Save contact?",{autoRemoveSeconds:15}))return;const o=window.prompt("Enter a name for this contact:",t)||t;await Cc(t,o,e),Ss(e),await Hn(n)}async function Hn(t){if(!t)return;const e=await Pr(),n=Object.keys(e);let s=t.querySelector(".contacts-container");if(s||(s=document.createElement("div"),s.className="contacts-container",t.appendChild(s)),n.length===0){s.innerHTML="<p>No saved contacts yet.</p>",v(s);return}D(s),s.innerHTML=`
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
                ${i.contactName&&i.contactName.length>Hh?i.contactName.slice(0,Hh-2)+"..":i.contactName}
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
  `,IP(s,t),kP(n),await RP(s,n,e)}function IP(t,e){t.querySelectorAll(".contact-message-btn").forEach(n=>{n.onclick=s=>{s.stopPropagation();const r=n.getAttribute("data-contact-id"),i=n.getAttribute("data-contact-name");r&&du(r,i)}}),t.querySelectorAll(".contact-name").forEach(n=>{n.onclick=async()=>{let s=n.getAttribute("data-room-id");const r=n.getAttribute("data-contact-name"),i=n.getAttribute("data-contact-id");if(!s&&i){const o=q();if(o)try{s=ao(o,i),console.log("[CONTACTS] Generated deterministic room ID:",s),await Cc(i,r,s),n.setAttribute("data-room-id",s)}catch(a){console.error("[CONTACTS] Failed to generate or save room ID:",a);return}}s&&(Ss(s),await Jr(s,{forceInitiator:!0}).catch(a=>(console.warn("Failed to call contact:",a),!1))&&await l_(s,r))}}),t.querySelectorAll(".contact-delete-btn").forEach(n=>{n.onclick=async()=>{const s=n.getAttribute("data-contact-id");!s||!window.confirm("Delete this contact?")||(await AP(s),await Hn(e))}})}function du(t,e,n=!1){if(!q()){alert("Please sign in to send messages");return}if(Qt.getSession(t)){Ce.showMessagesToggle(),n&&!Ce.isMessagesUIOpen()&&Ce.toggleMessages();return}Qt.getAllSessions().forEach(a=>{a.close()}),Ce.clearMessages(),Ce.setSession(null);const i=Qt.openSession(t,{onMessage:(a,c,l)=>{if(l)Ce.appendChatMessage(`${a}`,{isSentByMe:!0});else{const u=!c.read;Ce.receiveMessage(a,{isUnread:u})}}});i.contactName=e,i.toggle=Xn.get(t),Ce.setSession(i),Ce.showMessagesToggle(),n&&!Ce.isMessagesUIOpen()&&Ce.toggleMessages(),i.markAsRead().catch(a=>{console.warn("Failed to mark messages as read:",a)});const o=Xn.get(t);o&&o.clearBadge()}function kP(t){Ca.forEach(({ref:e,callback:n})=>{It(e,"value",n)}),Ca.clear(),q()&&t.forEach(e=>{const n=k(R,`users/${e}/presence`),s=document.querySelector(`.presence-indicator[data-contact-id="${e}"]`);if(!s)return;const r=i=>{const a=i.val()?.state==="online";s.style.backgroundColor=a?"#00d26a":"#444",s.title=a?"Online":"Offline"};Al(n,r),Ca.set(e,{ref:n,callback:r})})}let Js=!1,Gn=null;async function RP(t,e,n){if(!q())return;const s=10;let r=0;for(;Js&&r<s;)await new Promise(i=>setTimeout(i,100)),r++;if(Js){console.debug("[CONTACTS] Toggle replacement still in progress after waiting, skipping");return}Js=!0,Gn&&clearTimeout(Gn),Gn=setTimeout(()=>{console.warn("[CONTACTS] Toggle replacement timeout - forcing flag reset"),Js=!1},5e3);try{Xn.forEach(o=>{o.cleanup()}),Xn.clear(),Sa.forEach(o=>{o()}),Sa.clear();const i=q();for(const o of e){const a=n[o],c=t.querySelector(`.contact-msg-toggle-container[data-contact-id="${o}"]`);if(!c){console.warn(`[CONTACTS] No toggle container found for contact ${o}`);continue}const l=u_({parent:c,onToggle:()=>du(o,a.contactName,!0),icon:"💬",initialUnreadCount:0});if(!l){console.error(`[CONTACTS] Failed to create toggle for contact ${o}`);continue}Xn.set(o,l);const u=Qt.listenToUnreadCount(o,d=>{l.setUnreadCount(d)});Sa.set(o,u)}Promise.all(e.map(o=>Qt.getUnreadCount(o).then(a=>{const c=Xn.get(o);c&&c.setUnreadCount(a)}).catch(a=>console.warn(`[CONTACTS] Failed to get unread count for ${o}:`,a))))}finally{Gn&&(clearTimeout(Gn),Gn=null),Js=!1}}async function AP(t){const e=q();if(e){try{await Ve(k(R,`users/${e}/contacts/${t}`))}catch(n){console.warn("Failed to delete contact from RTDB",n)}return}try{const n=localStorage.getItem("contacts")||"{}",s=JSON.parse(n);s[t]&&(delete s[t],localStorage.setItem("contacts",JSON.stringify(s)))}catch(n){console.warn("Failed to delete contact from localStorage",n)}}let wi=null,ct=null;async function d_(t,e="User"){const n=q(),s=Un();if(!n||!s)throw new Error("Must be logged in to send invites");if(!t)throw new Error("Recipient user ID is required");const r=ao(n,t),i=k(R,`users/${t}/incomingInvites/${n}`),o={fromUserId:n,fromName:s.displayName||"Anonymous",fromEmail:s.email||"",fromPhotoURL:s.photoURL||null,roomId:r,timestamp:Date.now(),status:"pending"};await re(i,o),console.log(`[INVITATIONS] Sent invite to ${e} (${t})`)}function NP(t){const e=q();if(!e)return console.warn("[INVITATIONS] Cannot listen for invites - not logged in"),()=>{};Sc();const n=k(R,`users/${e}/incomingInvites`);return wi=bs(n,s=>{const r=s.key,i=s.val();i&&i.status==="pending"&&(console.log(`[INVITATIONS] New invite from ${i.fromName}`),t(r,i))}),console.log("[INVITATIONS] Listening for incoming invites"),Sc}async function PP(t,e){const n=q(),s=Un();if(!n||!s)throw new Error("Must be logged in to accept invites");const r=k(R,`users/${n}/contacts/${t}`);await re(r,{contactId:t,contactName:e.fromName||"User",roomId:e.roomId,savedAt:Date.now()});const i=k(R,`users/${t}/acceptedInvites/${n}`);await re(i,{acceptedByUserId:n,acceptedByName:s.displayName||"User",acceptedByEmail:s.email||"",acceptedByPhotoURL:s.photoURL||null,roomId:e.roomId,timestamp:Date.now()});const o=k(R,`users/${n}/incomingInvites/${t}`);await Ve(o),console.log(`[INVITATIONS] Accepted invite from ${e.fromName} and notified sender`)}async function LP(t){const e=q();if(!e)throw new Error("Must be logged in to decline invites");const n=k(R,`users/${e}/incomingInvites/${t}`);await Ve(n),console.log(`[INVITATIONS] Declined invite from ${t}`)}function OP(t){const e=q();if(!e)return console.warn("[INVITATIONS] Cannot listen for accepted invites - not logged in"),()=>{};ct&&(ct(),ct=null);const n=k(R,`users/${e}/acceptedInvites`);return ct=bs(n,async s=>{const r=s.key,i=s.val();if(i)try{const o=k(R,`users/${e}/contacts/${r}`);await re(o,{contactId:r,contactName:i.acceptedByName||"User",roomId:i.roomId,savedAt:Date.now()}),console.log(`[INVITATIONS] Auto-saved contact: ${i.acceptedByName} (invite accepted)`);const a=k(R,`users/${e}/acceptedInvites/${r}`);await Ve(a),t&&t(r,i)}catch(o){console.error("[INVITATIONS] Failed to auto-save contact from accepted invite:",o)}}),console.log("[INVITATIONS] Listening for accepted invites"),()=>{ct&&(ct(),ct=null)}}function Sc(){wi&&(wi(),wi=null),ct&&(ct(),ct=null),console.log("[INVITATIONS] Cleaned up all invite listeners")}const DP="https://people.googleapis.com/v1/people/me/connections",xP="https://people.googleapis.com/v1/otherContacts";async function MP(t){if(!t)throw new Error("Access token is required");const e=[],n=await Wh(t,DP,"names,emailAddresses");console.log(`[GOOGLE CONTACTS] My Contacts: ${n.length}`),e.push(...n);const s=await Wh(t,xP,"names,emailAddresses");console.log(`[GOOGLE CONTACTS] Other Contacts: ${s.length}`),e.push(...s),console.log(`[GOOGLE CONTACTS] Total: ${e.length} contacts with email addresses`);const r=new Set;return e.filter(o=>r.has(o.email)?!1:(r.add(o.email),!0))}async function Wh(t,e,n){const s=[];let r=null;do{const i=new URL(e);i.searchParams.set("pageSize","100"),e.includes("otherContacts")?i.searchParams.set("readMask",n):i.searchParams.set("personFields",n),r&&i.searchParams.set("pageToken",r);const o=await fetch(i.toString(),{headers:{Authorization:`Bearer ${t}`}});if(!o.ok){const l=await o.json().catch(()=>({}));if(e.includes("otherContacts"))return console.warn("[GOOGLE CONTACTS] Other contacts fetch failed (may need additional scope):",l.error?.message),s;throw console.error("[GOOGLE CONTACTS] API error:",l),new Error(l.error?.message||`API error: ${o.status}`)}const a=await o.json(),c=a.connections||a.otherContacts||[];for(const l of c){const u=l.emailAddresses||[],h=(l.names||[])[0]?.displayName||"Unknown";for(const f of u)f.value&&s.push({email:f.value.toLowerCase().trim(),name:h})}r=a.nextPageToken}while(r);return s}async function FP(){return new Promise(t=>{const e=document.createElement("dialog");e.classList.add("add-contact-modal"),e.innerHTML=`
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
    `;const n=e.querySelector("#add-contact-form"),s=e.querySelector("#contact-email-input"),r=e.querySelector("#search-status"),i=e.querySelector('[data-action="cancel"]'),o=e.querySelector('[data-action="search"]'),a=e.querySelector("#import-google-btn"),c=e.querySelector("#import-status"),l=e.querySelector("#import-results");function u(){e.close(),e.remove(),t()}i.addEventListener("click",u),e.addEventListener("cancel",u),n.addEventListener("submit",async d=>{d.preventDefault();const h=s.value.trim();if(h){o.disabled=!0,s.disabled=!0,r.textContent="Searching...",r.className="search-status searching";try{const f=await Dm(h);if(!f){r.textContent=`${h} is not on HangVidU yet.`,r.className="search-status not-found",o.disabled=!1,s.disabled=!1;return}const p=Un();if(p&&f.uid===p.uid){r.textContent="That's your own email address!",r.className="search-status error",o.disabled=!1,s.disabled=!1;return}r.textContent=`Found ${f.displayName}! Sending invitation...`,r.className="search-status found",await d_(f.uid,f.displayName),r.textContent=`✓ Invitation sent to ${f.displayName}!`,r.className="search-status success",setTimeout(u,1500)}catch(f){console.error("[ADD CONTACT] Error searching for user:",f),r.textContent="Error searching for user. Please try again.",r.className="search-status error",o.disabled=!1,s.disabled=!1}}}),a.addEventListener("click",async()=>{a.disabled=!0,c.textContent="Requesting access...",c.className="import-status loading",l.innerHTML="";try{const d=await Hm();c.textContent="Fetching contacts...";const h=await MP(d);if(h.length===0){c.textContent="No contacts with email addresses found.",c.className="import-status not-found",a.disabled=!1;return}c.textContent=`Found ${h.length} contacts. Checking HangVidU...`;const f=h.map(B=>B.email),p=await mN(f),_=Un(),m=[],A=[];for(const B of h){const x=p[B.email];x&&x.uid!==_?.uid?m.push({...B,user:x}):x||A.push(B)}c.textContent=`${m.length} on HangVidU, ${A.length} not yet`,c.className="import-status success",UP(l,m,A),a.disabled=!1}catch(d){console.error("[ADD CONTACT] Import error:",d),d.message==="Authorization cancelled"?(c.textContent="Import cancelled.",c.className="import-status cancelled"):(c.textContent=`Error: ${d.message}`,c.className="import-status error"),a.disabled=!1}}),document.body.appendChild(e),e.showModal()})}function UP(t,e,n){if(t.innerHTML="",e.length>0){const s=document.createElement("div");s.className="results-section",s.innerHTML=`<h4>On HangVidU (${e.length})</h4>`;const r=document.createElement("ul");r.className="contact-list";for(const{name:i,email:o,user:a}of e){const c=document.createElement("li");c.className="contact-item",c.innerHTML=`
        <span class="contact-info">
          <strong>${li(i)}</strong>
          <small>${li(o)}</small>
        </span>
        <button type="button" class="invite-btn" data-uid="${li(a.uid)}" data-name="${li(a.displayName)}">
          Invite
        </button>
      `;const l=c.querySelector(".invite-btn");l.addEventListener("click",async()=>{l.disabled=!0,l.textContent="Sending...";try{await d_(a.uid,a.displayName),l.textContent="✓ Sent",l.classList.add("sent")}catch(u){console.error("[ADD CONTACT] Invite error:",u),l.textContent="Error",l.disabled=!1}}),r.appendChild(c)}s.appendChild(r),t.appendChild(s)}if(e.length===0&&n.length>0){const s=document.createElement("div");s.className="empty-state",s.innerHTML=`
      <p>None of your ${n.length} contacts are on HangVidU yet.</p>
      <p>Be the first to invite them!</p>
    `,t.appendChild(s)}if(n.length>0&&e.length>0){const s=document.createElement("div");s.className="results-section not-on-app",s.innerHTML=`<p class="muted-text">${n.length} contacts not on HangVidU yet</p>`,t.appendChild(s)}}function li(t){const e=document.createElement("div");return e.textContent=t||"",e.innerHTML.replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function $P(){const t=document.querySelector("link[rel~='icon']");return t?t.href:"/favicon.ico"}class BP{constructor(){this.originalTitle=document.title,this.originalFavicon=$P(),this.titleFlashInterval=null,this.isFlashing=!1,this.wakeLock=null,this.setupVisibilityListener()}setupVisibilityListener(){document.addEventListener("visibilitychange",()=>{!document.hidden&&this.isFlashing&&this.stopTitleFlashing()})}startCallIndicators(e){console.log(`[VisibilityManager] Starting call indicators for: ${e}`),this.startTitleFlashing(e),this.setFavicon("/icons/phone-ringing.svg"),this.setBadge(1),this.requestWakeLock()}stopCallIndicators(){console.log("[VisibilityManager] Stopping call indicators"),this.stopTitleFlashing(),this.restoreFavicon(),this.clearBadge(),this.releaseWakeLock()}startTitleFlashing(e){this.stopTitleFlashing();let n=!0;this.isFlashing=!0,document.title=`📞 Call from ${e}!`,this.titleFlashInterval=setInterval(()=>{this.isFlashing&&(document.title=n?`📞 Call from ${e}!`:this.originalTitle,n=!n)},1e3)}stopTitleFlashing(){this.titleFlashInterval&&(clearInterval(this.titleFlashInterval),this.titleFlashInterval=null),this.isFlashing=!1,document.title=this.originalTitle}setFavicon(e){const n=document.querySelector("link[rel~='icon']");n&&(n.href=e,console.log(`[VisibilityManager] Favicon changed to: ${e}`))}restoreFavicon(){this.setFavicon(this.originalFavicon)}setBadge(e){"setAppBadge"in navigator&&navigator.setAppBadge(e).then(()=>{console.log(`[VisibilityManager] Badge set to: ${e}`)}).catch(n=>{console.warn("[VisibilityManager] Badge not supported:",n)})}clearBadge(){"clearAppBadge"in navigator&&navigator.clearAppBadge().then(()=>{console.log("[VisibilityManager] Badge cleared")}).catch(e=>{console.warn("[VisibilityManager] Badge clear failed:",e)})}async requestWakeLock(){if("wakeLock"in navigator)try{this.wakeLock=await navigator.wakeLock.request("screen"),console.log("[VisibilityManager] Wake lock active"),this.wakeLock.addEventListener("release",()=>{console.log("[VisibilityManager] Wake lock released"),this.wakeLock=null},{once:!0})}catch(e){console.warn("[VisibilityManager] Wake lock failed:",e)}}releaseWakeLock(){if(this.wakeLock){const e=this.wakeLock;this.wakeLock=null,e.release().then(()=>{console.log("[VisibilityManager] Wake lock released manually")}).catch(n=>{console.warn("[VisibilityManager] Wake lock release failed:",n)})}}}const Vh=new BP,Lr=new WeakMap;function hu(t,e,n){if(!t||!n)throw new Error("setupIceCandidates: pc and roomId are required");if(Lr.has(t)||Lr.set(t,[]),e==="initiator")jh(t,"offerCandidates",n),qh(t,"answerCandidates",n);else if(e==="joiner")jh(t,"answerCandidates",n),qh(t,"offerCandidates",n);else throw new Error(`Invalid role: ${e} specified for ICE candidate setup.`)}function jh(t,e,n){t.onicecandidate=s=>{if(s.candidate){const r=zi(e==="offerCandidates"?Yg(n):Kg(n));re(r,s.candidate.toJSON())}}}function qh(t,e,n){const s=e==="offerCandidates"?Yg(n):Kg(n);let r=!1;const i=()=>{if(r)return;r=!0;const a=()=>{t.remoteDescription&&(fu(t),t.removeEventListener("signalingstatechange",a))};t.addEventListener("signalingstatechange",a)};En(s,"child_added",a=>{const c=a.val();if(!(!t||t.signalingState==="closed")&&c)if(t.remoteDescription)try{t.addIceCandidate(new RTCIceCandidate(c))}catch{}else{const l=Lr.get(t);l&&(l.push(c),l.length===1&&i())}},n)}function fu(t){if(!t||!Lr.has(t))return;const e=Lr.get(t);if(e.length!==0){$(`🔄 Draining ${e.length} queued ICE candidate(s)`);for(const n of e)try{t.addIceCandidate(new RTCIceCandidate(n)).catch(s=>{$("Error adding queued ICE candidate:",s)})}catch{}e.length=0}}const HP=Object.freeze(Object.defineProperty({__proto__:null,drainIceCandidateQueue:fu,setupIceCandidates:hu},Symbol.toStringTag,{value:"Module"}));let ot=null,zh=null;function h_(t){zh=t,t.onconnectionstatechange=()=>{$("onconnectionstatechange:",t.connectionState),t.connectionState==="connected"?(lu(),uu().catch(e=>console.warn("Failed to clear calling state on connect:",e)),ot&&(clearTimeout(ot),ot=null)):t.connectionState==="disconnected"?(ot&&clearTimeout(ot),ot=setTimeout(()=>{t===zh&&t.connectionState==="disconnected"&&ve.cleanupCall({reason:"connection_lost"}),ot=null},3e3)):t.connectionState==="failed"&&(Bo(),ot&&(clearTimeout(ot),ot=null),ve.cleanupCall({reason:"connection_failed"}))},t.addEventListener("iceconnectionstatechange",e=>{$("ICE iceconnectionstatechange:",t.iceConnectionState),t.iceConnectionState==="failed"&&(console.warn("ICE connection failed, restarting ICE..."),t.restartIce())})}const pu={iceServers:[{urls:"stun:stun.l.google.com:19302"}]},Ta=new WeakMap;function f_(t,e,n){Ta.has(t)||Ta.set(t,{});const s=Ta.get(t),r=e==="offer"?"lastOffer":"lastAnswer";return s[r]===n?!0:(s[r]=n,!1)}function p_(t,e){return t?e==="offer"?t.signalingState==="stable":t.signalingState==="have-local-offer"||t.signalingState==="stable":!1}function gu(t,e){e.getTracks().forEach(n=>{t.addTrack(n,e)})}async function g_(t){const e=await t.createOffer();return await t.setLocalDescription(e),e}async function m_(t){const e=await t.createAnswer();return await t.setLocalDescription(e),e}async function __(t,e,n){if(f_(t,e.type,e.sdp))return console.debug(`Ignoring duplicate ${e.type} - already processed`),!1;if(!p_(t,e.type))return console.warn(`Ignoring ${e.type} - unexpected signaling state:`,t.signalingState),!1;try{return await t.setRemoteDescription(new RTCSessionDescription(e)),n(t),console.debug(`Remote description set (${e.type})`),!0}catch(s){return console.error(`Failed to set remote description (${e.type}):`,s),!1}}function y_(){return Math.random().toString(36).substring(2,9)}const WP=Object.freeze(Object.defineProperty({__proto__:null,addLocalTracks:gu,createAnswer:m_,createOffer:g_,generateRoomId:y_,isDuplicateSdp:f_,isValidSignalingState:p_,rtcConfig:pu,setRemoteDescription:__},Symbol.toStringTag,{value:"Module"}));async function VP({localStream:t,remoteVideoEl:e,mutePartnerBtn:n,setupRemoteStream:s,setupWatchSync:r,targetRoomId:i=null}){if(!t)return{success:!1};const o=new RTCPeerConnection(pu),a="initiator",c=i||y_(),l=_e();gu(o,t);const u=o.createDataChannel("files");if(!s(o,e,n))return console.error("Error setting up remote stream"),o.close(),{success:!1};hu(o,a,c),h_(o);const h=await g_(o);await ee.createNewRoom(h,l,c),r(c,a,l);const f=`${window.location.origin}${window.location.pathname}?room=${c}`;return{success:!0,pc:o,roomId:c,roomLink:f,dataChannel:u,role:a}}async function jP({roomId:t,localStream:e,remoteVideoEl:n,mutePartnerBtn:s,setupRemoteStream:r,setupWatchSync:i,onMessagesUIReady:o=null}){if(!e)return{success:!1};if(!t)return{success:!1};const a=await ee.checkRoomStatus(t);if(!a.exists)return{success:!1};if(!a.hasMembers)return{success:!1};let c;try{c=await ee.getRoomData(t)}catch(m){return $("Error: "+m.message),{success:!1}}const l=c.offer;if(!l)return{success:!1};const u=new RTCPeerConnection(pu),d="joiner",h=_e();gu(u,e);let f=null;if(u.ondatachannel=m=>{f=m.channel,$("[Call Flow] DataChannel received by joiner",{label:f.label})},!r(u,n,s))return console.error("Error setting up remote stream for joiner"),u.close(),{success:!1};hu(u,d,t),h_(u),await __(u,l,fu);const _=await m_(u);try{await ee.saveAnswer(t,_)}catch(m){return console.error("Failed to save answer to Firebase:",m),u.close(),{success:!1}}return i(t,d,h),await ee.joinRoom(t,h),{success:!0,pc:u,roomId:t,dataChannel:f,role:d}}class qP{async sendFile(e,n){throw new Error("FileTransport.sendFile() must be implemented by subclass")}onFileReceived(e){throw new Error("FileTransport.onFileReceived() must be implemented by subclass")}onReceiveProgress(e){throw new Error("FileTransport.onReceiveProgress() must be implemented by subclass")}isReady(){throw new Error("FileTransport.isReady() must be implemented by subclass")}cleanup(){throw new Error("FileTransport.cleanup() must be implemented by subclass")}}const zP={FILE_CONFIG:{NETWORK_CHUNK_SIZE:65536}};async function GP(t){if(t instanceof ArrayBuffer)return t;if(t instanceof Blob)try{return await t.arrayBuffer()}catch(e){return console.error("[ChunkProcessor] Blob conversion failed:",e),null}else if(t instanceof Uint8Array||ArrayBuffer.isView(t))try{const e=t instanceof Uint8Array?t:new Uint8Array(t.buffer,t.byteOffset,t.byteLength),n=new ArrayBuffer(e.length);return new Uint8Array(n).set(e),n}catch(e){return console.error("[ChunkProcessor] TypedArray conversion failed:",e),null}else return console.error("[ChunkProcessor] Unknown data type:",Object.prototype.toString.call(t)),null}function YP(t){try{if(t.byteLength<4)return console.error("[ChunkProcessor] Invalid embedded packet - too small:",t.byteLength),null;const s=new DataView(t).getUint32(0,!0),r=4+s;if(t.byteLength<r)return console.error("[ChunkProcessor] Incomplete embedded packet - expected:",r,"got:",t.byteLength),null;const i=new Uint8Array(t,4,s),o=new TextDecoder().decode(i),a=JSON.parse(o),c=4+s,l=t.slice(c);return{chunkMeta:a,chunkData:l}}catch(e){return console.error("[ChunkProcessor] Failed to parse embedded packet:",e),null}}const KP=1024;function JP(t,e,n){let s=0,r=0;const i=[];t.forEach((c,l)=>{c instanceof ArrayBuffer?(r++,s+=c.byteLength):i.push(l)});const o=e-s;return{isComplete:r===n&&Math.abs(o)<=KP,validChunks:r,totalSize:s,missingChunks:i,sizeDifference:o}}const Ia=zP.FILE_CONFIG.NETWORK_CHUNK_SIZE,Gh=9e3*1024*1024;class XP{constructor(e){this.dataChannel=e,this.receivedChunks=new Map,this.fileMetadata=new Map,this.onFileError=null,this.onReceiveProgress=null}async sendFile(e,n){if(e.size>Gh)throw new Error(`File too large (max ${Gh/(1024*1024)} MB)`);if(this.dataChannel.readyState!=="open")throw new Error("DataChannel not ready");const s=`${e.name}-${e.size}-${Date.now()}`,r=Math.ceil(e.size/Ia);this.dataChannel.send(JSON.stringify({type:"FILE_META",fileId:s,name:e.name,size:e.size,mimeType:e.type,totalChunks:r}));for(let i=0;i<r;i++){const o=i*Ia,a=Math.min(o+Ia,e.size),c=await e.slice(o,a).arrayBuffer(),l={type:"FILE_CHUNK",fileId:s,chunkIndex:i,totalChunks:r},u=new TextEncoder().encode(JSON.stringify(l)),d=new ArrayBuffer(4+u.length+c.byteLength),h=new Uint8Array(d);for(new DataView(d).setUint32(0,u.length,!0),h.set(u,4),h.set(new Uint8Array(c),4+u.length),this.dataChannel.send(d),n&&n((i+1)/r);this.dataChannel.bufferedAmount>256*1024;)await new Promise(p=>setTimeout(p,10))}}async handleMessage(e){if(typeof e=="string"){const n=JSON.parse(e);n.type==="FILE_META"&&(this.fileMetadata.set(n.fileId,n),this.receivedChunks.set(n.fileId,[]),this.onFileMetaReceived?.(n))}else{const n=await GP(e);if(!n){console.error("[FileTransfer] Failed to convert binary data to ArrayBuffer");return}const s=YP(n);if(!s){console.error("[FileTransfer] Failed to parse embedded chunk packet");return}const{chunkMeta:r,chunkData:i}=s,o=this.receivedChunks.get(r.fileId);if(!o){console.error("[FileTransfer] Received chunk for unknown file:",r.fileId);return}if(o[r.chunkIndex]=i,this.onReceiveProgress){const a=o.filter(c=>c).length;this.onReceiveProgress(a/r.totalChunks)}o.filter(a=>a).length===r.totalChunks&&this.assembleFile(r.fileId)}}assembleFile(e){const n=this.fileMetadata.get(e),s=this.receivedChunks.get(e),r=JP(s,n.size,n.totalChunks);if(!r.isComplete){console.error("[FileTransfer] File assembly failed:",{fileId:e,fileName:n.name,...r}),this.onFileError&&this.onFileError({fileName:n.name,reason:"incomplete",details:r});return}const i=new Blob(s,{type:n.mimeType}),o=new File([i],n.name,{type:n.mimeType});this.onFileReceived?.(o),this.receivedChunks.delete(e),this.fileMetadata.delete(e)}}class QP extends qP{constructor(e){if(super(),!e)throw new Error("DataChannelFileTransport requires a DataChannel");this.dataChannel=e,this.fileTransfer=new XP(e),this._setupMessageHandling()}_setupMessageHandling(){this.dataChannel.onmessage=e=>{if(typeof e.data=="string")try{const n=JSON.parse(e.data);if(n.type==="FILE_META"||n.type==="FILE_CHUNK"){this.fileTransfer.handleMessage(e.data);return}}catch{}else this.fileTransfer.handleMessage(e.data)}}async sendFile(e,n){if(!this.isReady())throw new Error("DataChannel not ready");return this.fileTransfer.sendFile(e,n)}onFileReceived(e){if(typeof e!="function")throw new Error("onFileReceived callback must be a function");this.fileTransfer.onFileReceived=e}onReceiveProgress(e){if(typeof e!="function")throw new Error("onReceiveProgress callback must be a function");this.fileTransfer.onReceiveProgress=e}isReady(){return this.dataChannel&&this.dataChannel.readyState==="open"}cleanup(){this.dataChannel&&(this.dataChannel.onmessage=null),this.fileTransfer&&(this.fileTransfer.onFileReceived=null,this.fileTransfer.onFileMetaReceived=null),this.dataChannel=null,this.fileTransfer=null}}class ZP{constructor(){this.listeners=new Map}on(e,n){this.listeners.has(e)||this.listeners.set(e,new Set),this.listeners.get(e).add(n)}off(e,n){this.listeners.has(e)&&this.listeners.get(e).delete(n)}emit(e,n){if(this.listeners.has(e))for(const s of Array.from(this.listeners.get(e)))try{s(n)}catch(r){console.warn("CallController listener error",r)}}}class e0{constructor(){this.emitter=new ZP,this.resetState()}resetState(){this.state="idle",this.roomId=null,this.roomLink=null,this.role=null,this.partnerId=null,this.pc=null,this.dataChannel=null,this.messagesUI=null,this.localVideoEl=null,this.remoteVideoEl=null,this.isHangingUp=!1,this.isCleaningUp=!1,this.listeners=new Map}getState(){return{state:this.state,roomId:this.roomId,roomLink:this.roomLink,role:this.role,partnerId:this.partnerId,hasPc:!!this.pc,isHangingUp:this.isHangingUp,isCleaningUp:this.isCleaningUp}}on(e,n){this.emitter.on(e,n)}off(e,n){this.emitter.off(e,n)}setPartnerId(e){this.partnerId=e}setupCancellationListener(e){if(!e)return;const n=k(R,`rooms/${e}/cancellation`);let s=!1;const r=async i=>{const o=i.val();if(o&&!s){s=!0;try{this.remoteVideoEl&&(this.remoteVideoEl.srcObject=null)}catch(a){console.warn("Failed to clear remote video after cancellation",a)}try{this.pc&&this.pc.close()}catch{}try{await this.cleanupCall({reason:o.reason||"remote_cancelled"})}catch(a){console.warn("Failed to trigger CallController cleanup",a)}}};ir(n,r,e),this.listeners.has("cancellation")||this.listeners.set("cancellation",[]),this.listeners.get("cancellation").push({ref:n,callback:r,roomId:e})}setupAnswerListener(e,n,s){if(!e||!n)return;const r=k(R,`rooms/${e}/answer`),i=async o=>{const a=o.val();if(a){const{setRemoteDescription:c}=await lt(async()=>{const{setRemoteDescription:l}=await Promise.resolve().then(()=>WP);return{setRemoteDescription:l}},void 0);await c(n,a,s)}};ir(r,i,e),this.listeners.has("answer")||this.listeners.set("answer",[]),this.listeners.get("answer").push({ref:r,callback:i,roomId:e})}setupRejectionListener(e){if(!e)return;const n=k(R,`rooms/${e}/rejection`);let s=!1;const r=async i=>{const o=i.val();if(o&&!s&&(s=!0,this.pc?.connectionState!=="connected")){try{const{onCallRejected:a}=await lt(async()=>{const{onCallRejected:c}=await Promise.resolve().then(()=>pP);return{onCallRejected:c}},void 0);await a(o.reason||"user_rejected")}catch{}try{await ee.leaveRoom(_e(),e)}catch{}try{this.pc&&this.pc.close()}catch{}}};ir(n,r,e),this.listeners.has("rejection")||this.listeners.set("rejection",[]),this.listeners.get("rejection").push({ref:n,callback:r,roomId:e})}setupMemberJoinedListener(e){if(!e)return;const n=_e(),s=r=>{r.key!==n&&(this.setPartnerId(r.key),this.emitter.emit("memberJoined",{memberId:r.key,roomId:e}))};ee.onMemberJoined(e,s),this.listeners.has("member-joined")||this.listeners.set("member-joined",[]),this.listeners.get("member-joined").push({callback:s,roomId:e})}setupMemberLeftListener(e){if(!e)return;const n=_e(),s=r=>{r.key!==n&&this.pc?.connectionState==="connected"&&this.emitter.emit("memberLeft",{memberId:r.key,roomId:e})};ee.onMemberLeft(e,s),this.listeners.has("member-left")||this.listeners.set("member-left",[]),this.listeners.get("member-left").push({callback:s,roomId:e})}removeTrackedListeners(){try{for(const[e,n]of this.listeners.entries())for(const s of n)try{s.ref&&It(s.ref,"value",s.callback)}catch(r){console.warn(`Failed to remove ${e} listener`,r)}}catch(e){console.warn("Failed to remove tracked listeners",e)}finally{this.listeners.clear()}if(this.roomId)try{xo(this.roomId)}catch(e){console.warn("Failed to remove RTDB listeners for room",e)}}async createCall(e={}){this.state="creating";try{e.localVideoEl&&(this.localVideoEl=e.localVideoEl),e.remoteVideoEl&&(this.remoteVideoEl=e.remoteVideoEl);const n=await VP(e);if(!n||!n.success)return this.state="idle",this.emitter.emit("error",{phase:"createCall",detail:n}),this.emitCallFailed("createCall",n),n;this.pc=n.pc,this.roomId=n.roomId,this.roomLink=n.roomLink||null,this.role=n.role||"initiator",this.dataChannel=n.dataChannel||null,this.messagesUI=n.messagesUI||null,this.state="waiting",this.dataChannel&&this.setupFileTransport(this.dataChannel);const{drainIceCandidateQueue:s}=await lt(async()=>{const{drainIceCandidateQueue:r}=await Promise.resolve().then(()=>HP);return{drainIceCandidateQueue:r}},void 0);return this.setupAnswerListener(this.roomId,this.pc,s),this.setupCancellationListener(this.roomId),this.setupRejectionListener(this.roomId),this.setupMemberJoinedListener(this.roomId),this.setupMemberLeftListener(this.roomId),this.emitter.emit("created",{roomId:this.roomId,roomLink:this.roomLink,role:this.role}),n}catch(n){throw this.state="idle",this.emitter.emit("error",{phase:"createCall",error:n}),this.emitCallFailed("createCall",n),n}}async answerCall(e={}){this.state="joining";try{e.localVideoEl&&(this.localVideoEl=e.localVideoEl),e.remoteVideoEl&&(this.remoteVideoEl=e.remoteVideoEl);const s=await jP({...e,onMessagesUIReady:r=>{this.messagesUI=r}});return!s||!s.success?(this.state="idle",this.emitter.emit("error",{phase:"answerCall",detail:s}),this.emitCallFailed("answerCall",s),s):(this.pc=s.pc,this.roomId=s.roomId,this.role=s.role||"joiner",this.dataChannel=s.dataChannel||null,!this.messagesUI&&s.messagesUI&&(this.messagesUI=s.messagesUI),this.state="connected",this.dataChannel?this.setupFileTransport(this.dataChannel):this.role==="joiner"&&this.pc&&(this.pc.ondatachannel=r=>{this.dataChannel=r.channel,this.setupFileTransport(this.dataChannel)}),this.setupCancellationListener(this.roomId),this.setupMemberJoinedListener(this.roomId),this.setupMemberLeftListener(this.roomId),this.emitter.emit("answered",{roomId:this.roomId,role:this.role}),s)}catch(n){throw this.state="idle",this.emitter.emit("error",{phase:"answerCall",error:n}),this.emitCallFailed("answerCall",n),n}}setupFileTransport(e){if(!e)return;const n=()=>{try{const s=new QP(e);Qt.setFileTransport(s),Ce.setFileTransfer(s.fileTransfer),$("[CallController] File transport initialized")}catch(s){console.error("[CallController] Failed to setup file transport:",s)}};e.readyState==="open"?n():e.addEventListener("open",n,{once:!0})}async hangUp({emitCancel:e=!0,reason:n="user_hung_up"}={}){if(!this.isHangingUp){this.isHangingUp=!0;try{if(e&&this.roomId)try{await ee.cancelCall(this.roomId,_e(),n)}catch(s){console.warn("CallController: cancelCall failed (non-fatal)",s)}await this.cleanupCall({reason:n}),this.emitter.emit("hangup",{roomId:this.roomId,reason:n})}catch(s){throw this.emitter.emit("error",{phase:"hangUp",error:s}),s}finally{this.isHangingUp=!1}}}isRemoteHangup(e){return e?["remote","cancelled","partner_disconnected","connection_failed"].some(s=>e.includes(s)):!1}emitCallFailed(e,n){this.emitter.emit("callFailed",{phase:e,error:n?.message||n?.error||n||"Unknown error"})}async cleanupCall({reason:e}={}){if(!this.isCleaningUp){this.isCleaningUp=!0;try{const n=this.roomId,s=this.partnerId;this.removeTrackedListeners();try{await ee.leaveRoom(_e(),this.roomId)}catch{}try{if(this.pc){try{this.pc.close()}catch{}this.pc=null}}catch{}try{this.remoteVideoEl&&(this.remoteVideoEl.srcObject=null)}catch(r){console.warn("CallController: failed to clear remote video",r)}try{this.localVideoEl&&(this.localVideoEl.srcObject=null)}catch(r){console.warn("CallController: failed to clear local video",r)}try{const{cleanupLocalStream:r}=await lt(async()=>{const{cleanupLocalStream:i}=await Promise.resolve().then(()=>aP);return{cleanupLocalStream:i}},void 0);r()}catch(r){console.warn("CallController: failed to cleanup local stream",r)}try{const{resetLocalStreamInitFlag:r}=await lt(async()=>{const{resetLocalStreamInitFlag:i}=await Promise.resolve().then(()=>U0);return{resetLocalStreamInitFlag:i}},void 0);r()}catch{}this.isRemoteHangup(e)&&this.emitter.emit("remoteHangup",{roomId:n,partnerId:s,reason:e});try{Qt.clearFileTransport(),Ce.setFileTransfer(null)}catch(r){console.warn("CallController: failed to cleanup file transport",r)}if(this.messagesUI&&this.messagesUI.cleanup)try{this.messagesUI.cleanup()}catch(r){console.warn("CallController: failed to cleanup messages UI",r)}this.resetState(),this.emitter.emit("cleanup",{roomId:n,partnerId:s,reason:e})}catch(n){throw this.emitter.emit("error",{phase:"cleanupCall",error:n}),n}finally{this.isCleaningUp=!1}}}}const ve=new e0,Tc={default:{echoCancellation:!0,noiseSuppression:!0,autoGainControl:!0},withVoiceIsolationIfSupported:{echoCancellation:!0,noiseSuppression:!0,autoGainControl:!0,voiceIsolation:!0,restrictOwnAudio:!0,googHighpassFilter:!0,googTypingNoiseDetection:!0,highpassFilter:!0,typingNoiseDetection:!0}};function v_(){const t=navigator.mediaDevices.getSupportedConstraints();return["voiceIsolation","highpassFilter","typingNoiseDetection"].every(s=>t[s])?Tc.withVoiceIsolationIfSupported:Tc.default}const t0=()=>Tc.default,n0={desktop:{landscape:{width:{ideal:1920},height:{ideal:1080},frameRate:{min:10,ideal:30},aspectRatio:{ideal:16/9}},portrait:{width:{ideal:1080},height:{ideal:1920},frameRate:{min:10,ideal:30},aspectRatio:{ideal:9/16}}},mobile:{portrait:{width:{ideal:1080},height:{ideal:1920},aspectRatio:{ideal:9/16},frameRate:{ideal:30}},landscape:{width:{ideal:1920},height:{ideal:1080},aspectRatio:{ideal:16/9},frameRate:{ideal:30}}}},s0=()=>window.screen?.orientation?.type?.includes("portrait")||window.orientation===0||window.orientation===180;function mu(t){const e=s0()?"portrait":"landscape",s=/Mobi|Android/i.test(navigator.userAgent)?"mobile":"desktop",r=n0[s][e];return{facingMode:t,...r}}function r0(){return!!(navigator.mediaDevices&&navigator.mediaDevices.enumerateDevices)}async function i0(){return r0()?(await navigator.mediaDevices.enumerateDevices()).filter(e=>e.kind==="videoinput"):[]}async function o0(){const t=await i0();let e=!1,n=!1;return t.forEach(s=>{const r=s.label.toLowerCase();(r.includes("front")||r.includes("user"))&&(e=!0),(r.includes("back")||r.includes("rear")||r.includes("environment"))&&(n=!0)}),e&&n}async function a0({localStream:t,localVideo:e,currentFacingMode:n,peerConnection:s=null}){if(!t||!e)return console.error("switchCamera: missing localStream or localVideo"),null;const r=n==="user"?"environment":"user";try{const i=await navigator.mediaDevices.getUserMedia({video:mu(r),audio:v_()}),o=i.getVideoTracks()[0],a=i.getAudioTracks()[0],c=t.getVideoTracks()[0],l=c?c.enabled:!0,u=t.getAudioTracks()[0],d=u?!u.enabled:!1;if(o&&(o.enabled=l),a&&(a.enabled=!d),t.getTracks().forEach(h=>h.stop()),s){const h=s.getSenders().find(p=>p.track&&p.track.kind==="video");h&&await h.replaceTrack(o);const f=s.getSenders().find(p=>p.track&&p.track.kind==="audio");f&&a&&await f.replaceTrack(a)}return e.srcObject=new MediaStream([o].filter(Boolean)),{newStream:i,facingMode:r}}catch(i){return console.error("Failed to switch camera:",i),null}}let ka=!1,gn=null,mn=null;function c0({getLocalStream:t,getFacingMode:e}){return gn&&mn&&gn.removeEventListener("change",mn),gn=window.matchMedia("(orientation: portrait)"),mn=()=>{try{const n=typeof t=="function"?t():null,s=typeof e=="function"?e():"user";l0({localStream:n,currentFacingMode:s})}catch(n){console.error("Orientation handler failed:",n)}},gn.addEventListener("change",mn),()=>{gn&&mn&&gn.removeEventListener("change",mn),gn=null,mn=null}}async function l0({localStream:t,currentFacingMode:e}){if(!(ka||!t?.getVideoTracks()[0])){ka=!0;try{const n=t.getVideoTracks()[0],s=mu(e);$("Applying constraints:",s),await n.applyConstraints(s),$("Video constraints updated successfully")}catch(n){console.error("Failed to apply orientation constraints:",n)}finally{ka=!1}}}let Ic=[];function u0(t,e){const n=e.querySelector("i");n.className=t?"fa fa-microphone-slash":"fa fa-microphone"}function d0({getLocalStream:t,getLocalVideo:e,getRemoteVideo:n,getPeerConnection:s=()=>null,setLocalStream:r=null,micBtn:i,cameraBtn:o,switchCameraBtn:a,mutePartnerBtn:c,fullscreenPartnerBtn:l,remotePipBtn:u}){i&&(i.onclick=()=>{const h=t();if(!h)return;const f=h.getAudioTracks()[0];f&&(f.enabled=!f.enabled,u0(!f.enabled,i))}),o&&(o.onclick=()=>{const h=t();if(!h)return;const f=h.getVideoTracks()[0];if(f){f.enabled=!f.enabled;const p=o.querySelector("i");p.className=f.enabled?"fa fa-video":"fa fa-video-slash"}});const d=c0({getLocalStream:t,getFacingMode:wc});Ic.push(d),a&&(a.onclick=async()=>{const h=await a0({localStream:t(),localVideo:e(),currentFacingMode:wc(),peerConnection:s()||null});h?(e_(h.facingMode),console.log("Switched camera to facingMode:",h.facingMode),h.newStream&&typeof r=="function"&&r(h.newStream)):console.error("Camera switch failed.")},(async()=>await o0()?D(a):v(a))()),c&&(c.onclick=()=>{const h=n();if(!h)return;h.muted=!h.muted;const f=c.querySelector("i");f.className=h.muted?"fa fa-volume-mute":"fa fa-volume-up"}),l&&(l.onclick=()=>{const h=n();h.requestFullscreen?h.requestFullscreen():h.webkitRequestFullscreen&&h.webkitRequestFullscreen()}),u&&(u.onclick=async()=>{const h=n();if(h)try{document.pictureInPictureElement===h?await document.exitPictureInPicture():h.requestPictureInPicture&&await h.requestPictureInPicture()}catch(f){console.error("Picture-in-Picture failed:",f)}})}function h0(){Ic.forEach(t=>t()),Ic=[]}let Ra=null,Ht=null,K=null,Y=null,Yh=!1,ui=!1,dt=[],kc="",we=-1,Rc=[];const f0="AIzaSyBPUjW7ac277WIYTbN4M8dUomK39qRQjhA",p0="https://www.googleapis.com/youtube/v3";async function g0(){if(Yh||ui)return!1;ui=!0;const{initializeYouTubeElements:t}=await lt(async()=>{const{initializeYouTubeElements:o}=await Promise.resolve().then(()=>HN);return{initializeYouTubeElements:o}},void 0),e=await t();if(Ra=e.searchContainer,Ht=e.searchBtn,K=e.searchQuery,Y=e.searchResults,!Ra||!Ht||!K||!Y)return console.error("YouTube search elements not found in DOM"),ui=!1,!1;const n=o=>/^https?:\/\//i.test(o),s=o=>{(Y?.querySelectorAll(".search-result-item")||[]).forEach((c,l)=>{l===o?(c.classList.add("focused"),c.scrollIntoView({block:"nearest"})):c.classList.remove("focused")}),we=o??-1};Ht.onclick=async()=>{const o=K.value.trim();if(Zi(K)){D(K),K.focus();return}if(!o){bi(),v(K);return}if(Xh()&&o===kc)Ac(dt);else if(!n(o))await Kh(o);else{await Nr({url:o,title:o,channel:"",thumbnail:"",id:o}),v(Y),K.value="",v(K),we=-1;return}},Ra.addEventListener("keydown",async o=>{const a=Y.querySelectorAll(".search-result-item");if(a.length>0&&(o.key==="ArrowDown"||o.key==="ArrowUp")){if(o.key==="ArrowDown"){let c=we+1;c>=a.length&&(c=0),s(c)}else if(o.key==="ArrowUp"){let c=we-1;c<0&&(c=we===-1?0:a.length-1),s(c)}return}if(o.key==="Enter"){if(a.length>0&&we>=0){a[we].click(),v(K),v(Y),we=-1;return}const c=K.value.trim();if(c)if(Xh()&&c===kc)Ac(dt);else if(!n(c))await Kh(c);else{await Nr({url:c,title:c,channel:"",thumbnail:"",id:c}),v(Y),we=-1,K.value="",v(K);return}}else o.key==="Escape"&&(_0()?bi():K.value?K.value="":v(K))}),K.addEventListener("input",()=>{K.value.trim()===""&&bi(),we=-1});const r=oo(K,()=>v(K),{ignore:[Ht],esc:!1});Rc.push(r);const i=oo(Y,()=>v(Y),{ignore:[Ht],esc:!1});return Rc.push(i),ui=!1,Yh=!0,!0}async function Kh(t){if(!Ht||!Y){console.error("Search elements not initialized");return}dt=[],kc=t,Ht.disabled=!0,Y.innerHTML='<div class="search-loading">Searching YouTube...</div>',D(Y);try{const e=await fetch(`${p0}/search?part=snippet&maxResults=10&q=${encodeURIComponent(t)}&type=video&key=${f0}`);if(!e.ok)throw e.status===403?new Error("YouTube API quota exceeded. Please try again later."):e.status===400?new Error("Invalid API key or request."):new Error(`YouTube API error: ${e.status}`);const n=await e.json();if(!n.items||n.items.length===0){Jh("No videos found"),dt=[];return}dt=n.items.map(s=>({id:s.id.videoId,title:s.snippet.title,thumbnail:s.snippet.thumbnails.medium.url,channel:s.snippet.channelTitle,url:`https://www.youtube.com/watch?v=${s.id.videoId}`})),Ac(dt)}catch(e){console.error("YouTube search failed:",e),Jh(e.message||"Search failed. Please try again.")}finally{Ht.disabled=!1}}function Ac(t){if(!Y){console.error("Search results element not initialized");return}if(!t||t.length===0){Y.innerHTML='<div class="search-no-results">No results found</div>',dt=[],we=-1;return}Y.innerHTML="",t.forEach(n=>{const s=document.createElement("div");s.className="search-result-item",s.innerHTML=`
      <img src="${n.thumbnail}" alt="${n.title}" class="result-thumbnail">
      <div class="search-result-info">
        <div class="search-result-title">${n.title}</div>
        <div class="search-result-channel">${n.channel}</div>
      </div>
    `,s.onclick=async()=>{if(await Nr(n),v(Y),we=-1,!K){console.error("Search query element not initialized");return}K.value="",v(K)},Y.appendChild(s)}),D(Y),we=0,Y.querySelectorAll(".search-result-item").forEach((n,s)=>{s===we?(n.classList.add("focused"),n.scrollIntoView({block:"nearest"})):n.classList.remove("focused")})}function Jh(t){if(dt=[],we=-1,!Y){console.error("Search results element not initialized");return}Y.innerHTML=`<div class="search-error">${t}</div>`,D(Y)}function bi(){dt=[],we=-1,Y&&(Y.innerHTML="",v(Y))}function m0(){bi(),Rc.forEach(t=>t())}function _0(){return!Zi(Y)}function Xh(){return dt.length>0}function y0({parent:t,manager:e=null,onClick:n=null,hideWhenAllRead:s=!1}={}){let r=e;const i=Jl({initialProps:{unreadCount:0,isHidden:!0},template:`
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
    `,handlers:{handleClick:()=>{n?n():r&&r.toggleList()}},className:"notifications-toggle-container",parent:t});let o=i.querySelector(".notification-badge");return o&&(o.style.display="none"),i.onPropUpdated("unreadCount",a=>{const c=i.querySelector(".notification-badge");c&&(c.style.display=a>0?"flex":"none")}),i.show=()=>{i.isHidden=!1,i.style.display="block"},i.hide=()=>{i.isHidden=!0,i.style.display="none"},i.setUnread=a=>{i.unreadCount=a,a>0?i.show():s&&i.hide()},i.setManager=a=>{r=a},i.hide(),i}class v0{constructor(){this.notifications=new Map,this.toggle=null,this.container=null,this.clickOutsideCleanup=null}setToggle(e){this.toggle=e,this.toggle.setManager&&this.toggle.setManager(this),this.createContainer(),this.updateToggle()}createContainer(){this.container||(this.container=document.createElement("div"),this.container.className="notifications-list-container",this.container.style.display="none",document.body.appendChild(this.container))}showList(){this.container&&(this.container.style.display="flex",this.setupClickOutside())}hideList(){this.container&&(this.container.style.display="none",this.cleanupClickOutside())}setupClickOutside(){this.clickOutsideCleanup||(this.clickOutsideCleanup=oo(this.container,()=>this.hideList(),{ignore:this.toggle?[this.toggle]:[],esc:!0}))}cleanupClickOutside(){this.clickOutsideCleanup&&(this.clickOutsideCleanup(),this.clickOutsideCleanup=null)}toggleList(){this.container&&(this.container.style.display==="none"?this.showList():this.hideList())}isListVisible(){return this.container&&this.container.style.display!=="none"}add(e,n){this.notifications.has(e)&&this.remove(e),this.container||this.createContainer(),n.parentElement===document.body&&n.remove(),this.container.prepend(n),this.notifications.set(e,n),this.updateToggle(),n._originalDispose||(n._originalDispose=n.dispose);const s=n._originalDispose;n.dispose=()=>{s&&s.call(n),n.parentElement&&n.remove(),this.notifications.delete(e),this.updateToggle(),n.dispose=s,delete n._originalDispose}}remove(e){const n=this.notifications.get(e);n&&(n.dispose&&n.dispose(),this.notifications.delete(e),this.updateToggle())}getCount(){return this.notifications.size}has(e){return this.notifications.has(e)}clear(){this.notifications.forEach(e=>{e.dispose&&e.dispose()}),this.notifications.clear(),this.updateToggle()}updateToggle(){this.toggle&&this.toggle.setUnread(this.getCount())}}const E0=new v0;const w0=async()=>{if(s_())return console.debug("Reusing existing local MediaStream."),jo();const t=mu("user"),e=v_();try{const n=await navigator.mediaDevices.getUserMedia({video:t,audio:e});return no(n),n}catch(n){if(n.name==="OverconstrainedError"){console.warn(`❌ Constraint failed on property: ${n.constraint}, falling back to basic constraints`);const s=t0(),r=await navigator.mediaDevices.getUserMedia({video:!0,audio:s});return no(r),r}throw n}};async function b0(t){const e=await w0(),n=new MediaStream(e.getVideoTracks());return t.srcObject=n,!0}function C0(t,e,n){return t.ontrack=s=>{$(`REMOTE TRACK RECEIVED: ${s.track.kind}`);const r=Vo()?cu():null;let i;s.streams&&s.streams[0]&&s.streams[0]instanceof MediaStream?i=s.streams[0]:(console.warn("No stream in track event, using fallback track handling"),r?(r.addTrack(s.track),i=r):i=new MediaStream([s.track])),t_(i),e.srcObject=i,r!==i||$(`Added ${s.track.kind} track to existing remote stream`);try{const o=document.getElementById("remote-video-box")||e.parentElement;o&&(o.classList?.remove("hidden"),e.classList?.remove("hidden"),o.style.visibility="visible",o.style.opacity="1",o.style.position="",o.style.left="",o.style.top="",e.style.visibility="visible",e.style.opacity="1")}catch(o){console.warn("Visibility override failed:",o)}},!0}let Qh=!1;function S0(t,e){const n=document.createElement("dialog");n.className="copy-link-dialog";const s=document.createElement("div");s.className="copy-link-dialog__content";const r=document.createElement("h2");r.className="copy-link-dialog__title",r.textContent=e.title,s.appendChild(r);const i=document.createElement("div");i.className="copy-link-dialog__input-container";const o=document.createElement("input");o.type="text",o.className="copy-link-dialog__input",o.value=t,o.readOnly=!0,o.setAttribute("aria-label","Link to copy"),i.appendChild(o),s.appendChild(i);const a=document.createElement("div");a.className="copy-link-dialog__buttons";const c=document.createElement("button");c.className="copy-link-dialog__button copy-link-dialog__button--primary",c.textContent=e.buttonText,c.autofocus=!0;const l=document.createElement("button");l.className="copy-link-dialog__button copy-link-dialog__button--secondary",l.textContent=e.cancelText,a.appendChild(c),a.appendChild(l),s.appendChild(a);const u=document.createElement("p");return u.className="copy-link-dialog__feedback",u.setAttribute("aria-live","polite"),s.appendChild(u),n.appendChild(s),{dialog:n,input:o,copyButton:c,cancelButton:l,feedback:u}}function T0(t,e={}){const n={title:"Share this link",buttonText:"Copy",cancelText:"Cancel",successMessage:"✓ Copied to clipboard!",errorMessage:"Failed to copy. Click the link to select it manually.",autoClose:!0,autoCloseDelay:1200,onCopy:null,onError:null,onCancel:null,onClose:null,...e};I0();const{dialog:s,input:r,copyButton:i,cancelButton:o,feedback:a}=S0(t,n);k0(s);let c=!1;const l=async()=>{await R0(t,r)?(c=!0,a.textContent=n.successMessage,a.classList.remove("copy-link-dialog__feedback--error"),n.onCopy&&n.onCopy(t),n.autoClose&&setTimeout(()=>{s.close()},n.autoCloseDelay)):(a.textContent=n.errorMessage,a.classList.add("copy-link-dialog__feedback--error"),r.readOnly=!1,r.addEventListener("click",()=>{r.select()}),n.onError&&n.onError())};return i.addEventListener("click",l),o.addEventListener("click",()=>{n.onCancel&&n.onCancel(),s.close()}),s.addEventListener("keydown",u=>{u.key==="Enter"&&!u.shiftKey&&!u.ctrlKey&&!u.altKey&&!u.metaKey&&(u.preventDefault(),l())}),s.addEventListener("close",()=>{!c&&n.onCancel&&n.onCancel(),n.onClose&&n.onClose(),setTimeout(()=>{s.remove()},300)}),document.body.appendChild(s),s.showModal(),s}function I0(){if(Qh)return;const t=document.createElement("style");t.textContent=`
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
  `,document.head.appendChild(t),Qh=!0}function k0(t){t.showModal||(t.showModal=function(){this.setAttribute("open",""),this.style.display="block",this.style.position="fixed",this.style.top="50%",this.style.left="50%",this.style.transform="translate(-50%, -50%)";const e=getComputedStyle(document.documentElement).getPropertyValue("--z-ui-overlay").trim();this.style.zIndex=e||"1000"},t.close=function(){this.removeAttribute("open"),this.style.display="none"})}async function R0(t,e=null){if(navigator.clipboard&&navigator.clipboard.writeText)try{return await navigator.clipboard.writeText(t),!0}catch(n){return console.warn("Clipboard API failed, using fallback:",n),!1}if(!e)return!1;try{return e.select(),e.setSelectionRange(0,99999),document.execCommand("copy")}catch(n){return console.error("Fallback copy failed:",n),!1}}function A0(){const t=window.matchMedia&&window.matchMedia("(display-mode: standalone)").matches||navigator.standalone===!0,e=/iphone|ipad|ipod/i.test(navigator.userAgent||"");if(!t||!e||!window.location.hostname.includes("github.io"))return;const s="https://vidu-aae11.web.app",r=s.replace(/\/$/,"");let i;try{i=new URL(r).hostname}catch(l){console.error("[PWA Redirect] Invalid VITE_APP_HOSTING_URL:",s,l);return}if(window.location.hostname===i)return;const o="/HangVidU/";let a=window.location.pathname;a.startsWith(o)?a="/"+a.slice(o.length):a==="/HangVidU"&&(a="/");let c;try{c=new URL(a+window.location.search+window.location.hash,r).toString()}catch(l){console.error("[PWA Redirect] Failed to construct target URL:",l);return}console.log("[PWA Redirect] iOS standalone PWA on gh-pages → redirecting to Firebase Hosting:",c),window.location.replace(c)}aN(!0);y().disable();let _u=[];async function N0(){P0();const t=jm(),n=["localVideoEl","remoteVideoEl","localBoxEl","remoteBoxEl","chatControls","lobbyDiv","titleAuthBar"].filter(s=>!t[s]);if(n.length>0)return console.error("Critical elements missing:",n),!1;try{{const{setupPWA:i}=await lt(async()=>{const{setupPWA:o}=await import("./PWA-DdIaAQtD.js");return{setupPWA:o}},[]);await i()}g0(),D0(),await Mm;const s=$N(Ho);s&&_u.push(s.dispose);const r=document.querySelector(".top-right-menu");if(r){const i=y0({parent:r,hideWhenAllRead:!0});E0.setToggle(i)}return!0}catch(s){return console.error("Initialization error:",s),!1}}let Nc=!1;function E_(){Nc=!1}async function w_(){Nc||(Nc=!0,await b0(Fe),d0({getLocalStream:jo,getLocalVideo:()=>Fe,getRemoteVideo:()=>ne,getPeerConnection:()=>ve.getState().pc,setLocalStream:no,micBtn:Hs,cameraBtn:Ws,switchCameraBtn:Bs,mutePartnerBtn:st,fullscreenPartnerBtn:Wo,remotePipBtn:an}),Fe&&(Fe.addEventListener("enterpictureinpicture",()=>pe&&v(pe)),Fe.addEventListener("leavepictureinpicture",()=>{pe&&!(Bn()&&o_())&&D(pe)})))}function P0(){v(se),v(pe),v(Ie),v(Be)}function b_(t){(t?.name==="NotAllowedError"||t?.name==="PermissionDeniedError")&&alert('Camera/microphone access is required for video calls. Please click "Allow" when prompted, or check your browser settings.'),E_()}function Ci(t=null){return{localStream:jo(),localVideoEl:Fe,remoteVideoEl:ne,mutePartnerBtn:st,setupRemoteStream:C0,setupWatchSync:GN,targetRoomId:t}}function Si(t,e=!1){return t.success?(e&&t.roomLink&&T0(t.roomLink,{onCopy:()=>$("Link ready! Share with your partner."),onCancel:()=>$("Link ready! Use the copy button to use it, or create a new one.")}),!0):!1}async function Jr(t,{forceInitiator:e=!1}={}){try{await w_()}catch(i){return console.error("Failed to initialize local media stream:",i),b_(i),!1}const n=Date.now();if(e){y().logRoomCreation(t,!0,{creationTime:n,listenerAttachTime:n,timeDiff:0},{trigger:"force_initiator",reason:"calling_saved_contact"});const i=await ve.createCall(Ci(t));return Si(i,!1)}let s=await ee.checkRoomStatus(t);if(s.exists&&!s.hasMembers){let o=0;for(;o<3&&!s.hasMembers;)await new Promise(a=>setTimeout(a,250*(o+1))),s=await ee.checkRoomStatus(t),o++}if(!s.exists||!s.hasMembers){y().logRoomCreation(t,!0,{creationTime:n,listenerAttachTime:n,timeDiff:0},{trigger:"room_empty_or_nonexistent",roomExists:s.exists,memberCount:s.memberCount||0});const i=await ve.createCall(Ci(t));return Si(i,!0)}y().log("ROOM","JOINING_EXISTING",{roomId:t,memberCount:s.memberCount,roomExists:s.exists});const r=await ve.answerCall({roomId:t,...Ci()});return Si(r,!1)}const Oe=new Set,C_=new Map;function Zh(t){t&&(xo(t),Oe.delete(t),C_.delete(t),y().log("LISTENER","INCOMING_CLEANUP",{roomId:t,remainingListeners:Oe.size}))}function L0(){$(`[LISTENER] Removing all incoming listeners (${Oe.size} rooms)`);const t=Array.from(Oe);t.forEach(e=>{xo(e)}),Oe.clear(),C_.clear(),y().log("LISTENER","ALL_INCOMING_CLEANUP",{roomsCleared:t.length})}async function O0(t){const e=Date.now(),n=e+1440*60*1e3,s=q();if(s){const r=Ml(s,t);await re(r,{roomId:t,savedAt:e,expiresAt:n});return}try{const r=localStorage.getItem("recentCalls")||"{}",i=JSON.parse(r);i[t]={roomId:t,savedAt:e,expiresAt:n},localStorage.setItem("recentCalls",JSON.stringify(i))}catch(r){console.warn("Failed to save recent call to localStorage",r)}}async function Aa(t){const e=q();if(e){try{await Ve(Ml(e,t))}catch(n){console.warn("Failed to remove recent call from RTDB",n)}return}try{const n=localStorage.getItem("recentCalls")||"{}",s=JSON.parse(n);s[t]&&(delete s[t],localStorage.setItem("recentCalls",JSON.stringify(s)))}catch(n){console.warn("Failed to remove recent call from localStorage",n)}}function Ss(t){t&&(Oe.has(t)&&(Oe.delete(t),xo(t)),$(`[LISTENER] Attaching listener for room: ${t} (total: ${Oe.size+1})`),Oe.add(t),y().logListenerAttachment(t,"member_join",Oe.size,{action:"incoming_call_listener_attached"}),ee.onMemberJoined(t,async e=>{const n=e.key,s=e.val?e.val():null,r=_e();if(n&&n!==r){y().logMemberJoinEvent(t,n,s||{},{detectedBy:"incoming_call_listener",currentUserId:r});const i=s&&typeof s.joinedAt=="number"?s.joinedAt:null,o=2e4;let a=!1,c="none",l=0;if(i&&(l=Date.now()-i,a=l<o,c="joinedAt"),!a){const x=await a_(n,t),w=await c_(t);a=x||w,c=x?"outgoingState":w?"roomCreatedAt":"failed"}const u={isFresh:a,method:c,age:l,reason:a?"call_is_fresh":"call_is_stale"};if(y().logIncomingCallEvent(n,t,u,{memberData:s,joinedAt:i,CALL_FRESH_MS:o}),!a){y().logNotificationDecision("REJECT","stale_call",t,{age:l,validationMethod:c,joiningUserId:n});return}let d;try{d=await ee.getRoomData(t)}catch{return}if(!d||typeof d!="object")return;const h=!!d.offer,f=!!d.answer,p=d.createdBy;if(!h||f||p===r)return;const _=ve.getState();if(!!_.pc&&_.pc.connectionState==="connected"){y().logNotificationDecision("REJECT","already_in_call",t,{joiningUserId:n,currentCallState:_.pc?.connectionState});return}y().logNotificationDecision("SHOW","fresh_call_detected",t,{joiningUserId:n,freshnessResult:u});const A=await SP(t,n);ls.playIncoming(),Vh.startCallIndicators(A);let B=!1;try{B=await qo(`Incoming call from ${A}.

Accept?`)}finally{ls.stop(),Vh.stopCallIndicators()}if(B)Zh(t),y().logNotificationDecision("ACCEPT","user_accepted",t,{joiningUserId:n}),Jr(t).catch(x=>{console.warn("Failed to answer incoming call:",x),y().logFirebaseOperation("join_room_on_accept",!1,x,{roomId:t,joiningUserId:n})});else{y().logNotificationDecision("REJECT","user_rejected",t,{joiningUserId:n});try{await ee.rejectCall(t,_e(),"user_rejected")}catch(x){console.warn("Failed to signal rejection via RTDB:",x)}await Aa(t).catch(x=>{console.warn("Failed to remove recent call on rejection:",x)})}}}),ee.onCallCancelled(t,async e=>{if(e&&typeof e.val=="function"&&e.val()){try{const{dismissActiveConfirmDialog:s}=await lt(async()=>{const{dismissActiveConfirmDialog:r}=await Promise.resolve().then(()=>mP);return{dismissActiveConfirmDialog:r}},void 0);typeof s=="function"&&s()}catch{}await Aa(t).catch(()=>{})}}),ee.onMemberLeft(t,async e=>{const n=e.key,s=_e();if(!(!n||n===s))try{(await ee.checkRoomStatus(t)).hasMembers||(await Aa(t),Zh(t),$(`Removed saved recent call and listeners for room ${t} because it is now empty`))}catch(r){console.warn("Failed to evaluate room status on member leave",r)}}))}async function ef(){const t=Date.now();y().log("LISTENER","STARTUP_BEGIN",{timestamp:t,currentListenerCount:Oe.size});try{if(typeof window<"u"){const{getCurrentUserAsync:n}=await lt(async()=>{const{getCurrentUserAsync:s}=await Promise.resolve().then(()=>IN);return{getCurrentUserAsync:s}},void 0);await n()}}catch{}const e=q();if(y().log("LISTENER","AUTH_STATE_DETERMINED",{isLoggedIn:!!e,userId:e||"guest"}),e){const n=cR(e);try{const s=await et(n),r=s.exists()?s.val():null,i=new Set;if(r)for(const[o,a]of Object.entries(r)){if(!a||a.expiresAt&&a.expiresAt<Date.now()){await Ve(Ml(e,o)).catch(()=>{});continue}i.add(o)}try{const o=await Pr();Object.entries(o||{}).forEach(([a,c])=>{if(c?.roomId)i.add(c.roomId);else if(a&&e)try{const l=ao(e,a);i.add(l)}catch{}})}catch{}i.forEach(o=>Ss(o)),y().log("LISTENER","STARTUP_COMPLETE",{storage:"rtdb",roomsToListen:Array.from(i),totalListeners:Oe.size,duration:Date.now()-t})}catch(s){console.warn("Failed to read recent calls from RTDB",s),y().logFirebaseOperation("read_recent_calls",!1,s,{storage:"rtdb",userId:e})}return}try{const n=localStorage.getItem("recentCalls")||"{}",s=JSON.parse(n),r={},i=new Set;for(const[o,a]of Object.entries(s||{}))!a||a.expiresAt&&a.expiresAt<Date.now()||(r[o]=a,i.add(o));try{const o=await Pr(),a=_e();Object.entries(o||{}).forEach(([c,l])=>{if(l?.roomId)i.add(l.roomId);else if(c&&a)try{const u=ao(a,c);i.add(u)}catch{}})}catch{}i.forEach(o=>Ss(o)),localStorage.setItem("recentCalls",JSON.stringify(r)),y().log("LISTENER","STARTUP_COMPLETE",{storage:"localStorage",roomsToListen:Array.from(i),totalListeners:Oe.size,duration:Date.now()-t,expiredRoomsRemoved:Object.keys(s||{}).length-i.size})}catch(n){console.warn("Failed to read recent calls from localStorage",n),y().logFirebaseOperation("read_recent_calls",!1,n,{storage:"localStorage"})}}function di(){return M&&Ie&&!Ie.classList.contains("hidden")&&M.src&&M.src.trim()!==""}let tf=!1;function D0(){if(tf)return;const t=()=>{const e=document.activeElement;return e&&(e.tagName==="INPUT"||e.tagName==="TEXTAREA"||e.isContentEditable)};document.addEventListener("keydown",e=>{t()||(e.key==="w"||e.key==="W")&&(console.log("=== W KEY PRESSED ==="),console.log("lastWatched:",at()),console.log("isYTVisible():",Ea()),console.log("isSharedVideoVisible():",di()),console.log("isWatchModeActive():",Bn()),at()==="yt"?Ea()?(eo(),hr()):(Ym(),so()):(at()==="url"||at()==="file")&&(di()?(v(Ie),hr()):(D(Ie),so()))),e.key==="Escape"&&Bn()&&(at()==="yt"&&Ea()?(Kr(),eo()):(at()==="url"&&di()||at()==="file"&&di())&&(M.pause(),v(Ie)),hr())}),tf=!0}const S_=async()=>{try{await w_();const t=await ve.createCall(Ci());Si(t,!0)}catch(t){console.error("Failed to start call:",t),b_(t)}};qe.onclick=S_;un.onclick=S_;ss&&(navigator.clipboard&&navigator.clipboard.readText?ss.onclick=async()=>{try{const t=await navigator.clipboard.readText(),e=x0(t);if(!e){alert("No valid room link found in clipboard.");return}await Jr(e)}catch(t){t.name==="NotAllowedError"?alert("Clipboard access denied. Please allow clipboard access or paste the link manually."):(console.error("Paste & Join failed:",t),alert("Failed to read clipboard. Please try again."))}}:(ss.style.display="none",console.warn("Paste & Join button hidden: Clipboard API not available in this context (requires HTTPS).")));Ar&&(Ar.onclick=async()=>{await FP()});$n&&($n.onclick=()=>{at()==="yt"?(Kr(),eo()):(at()==="url"||at()==="file")&&(M.pause(),M.src.startsWith("blob:")&&URL.revokeObjectURL(M.src),v(Ie)),hr()});nt.onclick=async()=>{console.debug("Hanging up..."),await ve.hangUp({emitCancel:!0,reason:"user_hung_up"})};function x0(t){let e=t.trim();if(!e)return"";try{const n=new URL(e,window.location.origin),s=n.searchParams.get("room");if(s)return s;const r=n.hash.match(/room=([^&]+)/);return r?decodeURIComponent(r[1]):n.pathname.replace(/^\//,"")||e}catch{return e}}async function M0(){const e=new URLSearchParams(window.location.search).get("room");if(!e)return!1;const n=await Jr(e);return n||(Bo(),i_()),n}const Pc=[];let Na=!1;async function T_(){if(Na||Pc.length===0)return;Na=!0;const{fromUserId:t,inviteData:e}=Pc.shift();try{if(await qo(`${e.fromName||"Someone"} wants to connect.

Accept contact invitation?`))try{await PP(t,e),console.log("[INVITATIONS] Contact added:",e.fromName),await Hn(je).catch(()=>{}),alert(`Added ${e.fromName} to your contacts!`)}catch(s){console.error("[INVITATIONS] Failed to accept invite:",s),alert("Failed to add contact. Please try again.")}else try{await LP(t),console.log("[INVITATIONS] Invite declined")}catch(s){console.error("[INVITATIONS] Failed to decline invite:",s)}}finally{Na=!1,T_()}}function nf(){NP((t,e)=>{Pc.push({fromUserId:t,inviteData:e}),T_()}),OP(async(t,e)=>{console.log("[INVITATIONS] Your invite was accepted by:",e.acceptedByName),await Hn(je).catch(()=>{}),alert(`${e.acceptedByName} accepted your invitation!`)})}A0();window.onload=async()=>{if(!await N0()){qe.disabled=!0,console.error("Initialization failed. Cannot start chat.");return}await ef().catch(r=>console.warn("Failed to start saved-room listeners",r)),Hn(je).catch(r=>{console.warn("Failed to render contacts list:",r)});let e=null;const n=Kl(async({isLoggedIn:r,user:i})=>{try{const o=e===null,a=e===!0&&!r,c=e===!1&&r;e=r,await Hn(je),a?($("[AUTH] User logged out - cleaning up messaging and listeners"),Ce.reset(),Qt.closeAllSessions(),L0(),Sc()):c?($("[AUTH] User logged in - re-attaching incoming listeners"),await ef().catch(l=>console.warn("Failed to re-attach saved-room listeners on login",l)),nf()):o&&r&&($("[AUTH] Initial load with logged-in user"),nf())}catch(o){console.warn("Failed to handle auth change:",o)}});_u.push(()=>{try{typeof n=="function"&&n()}catch{}}),await M0()};window.addEventListener("beforeunload",async t=>{const e=ve.getState();if(e.pc&&e.pc.connectionState==="connected")return t.preventDefault(),t.returnValue="You are in an active call. Are you sure you want to leave?",t.returnValue;await F0()});ve.on("memberJoined",({memberId:t,roomId:e})=>{console.debug("CallController memberJoined event",{memberId:t,roomId:e}),ve.setPartnerId(t),Ce.showMessagesToggle(),du(t,t),lu(),uu().catch(n=>console.warn("Failed to clear calling state:",n)),O0(e).catch(n=>console.warn("Failed to save recent call:",n))});ve.on("memberLeft",({memberId:t})=>{console.info("Partner has left the call")});ve.on("cleanup",({roomId:t,partnerId:e,reason:n})=>{kn(),n_(),i_(),Bo();const s=ve.getState();s.messagesUI&&typeof s.messagesUI.cleanup=="function"&&(s.messagesUI.cleanup(),s.messagesUI=null),e&&t&&setTimeout(()=>{TP(e,t,je).catch(r=>{console.warn("Failed to save contact after cleanup:",r)})},500)});async function F0(){await ve.hangUp({emitCancel:!0,reason:"page_unload"}),h0(),iR(),document.pictureInPictureElement&&document.exitPictureInPicture().catch(e=>console.error(e));const t=ve.getState();t.messagesUI&&t.messagesUI.cleanup&&t.messagesUI.cleanup(),window.history.replaceState({},document.title,window.location.pathname),M.src="",r_(),Fe&&Fe.srcObject&&(Fe.srcObject=null),ne&&ne.srcObject&&(ne.srcObject=null),hr(),Bo(),zN("none"),ru(),Gm(!1),m0(),_u.forEach(e=>e())}const U0=Object.freeze(Object.defineProperty({__proto__:null,joinOrCreateRoomWithId:Jr,listenForIncomingOnRoom:Ss,resetLocalStreamInitFlag:E_},Symbol.toStringTag,{value:"Module"}));export{lt as _,Jl as c,$ as d,v as h,$0 as i,E0 as n,D as s};
