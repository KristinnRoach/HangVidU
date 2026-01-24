(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))i(s);new MutationObserver(s=>{for(const r of s)if(r.type==="childList")for(const o of r.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&i(o)}).observe(document,{childList:!0,subtree:!0});function n(s){const r={};return s.integrity&&(r.integrity=s.integrity),s.referrerPolicy&&(r.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?r.credentials="include":s.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function i(s){if(s.ep)return;s.ep=!0;const r=n(s);fetch(s.href,r)}})();const aw="modulepreload",cw=function(t){return"/HangVidU/"+t},fd={},Pe=function(e,n,i){let s=Promise.resolve();if(n&&n.length>0){let c=function(l){return Promise.all(l.map(u=>Promise.resolve(u).then(d=>({status:"fulfilled",value:d}),d=>({status:"rejected",reason:d}))))};document.getElementsByTagName("link");const o=document.querySelector("meta[property=csp-nonce]"),a=o?.nonce||o?.getAttribute("nonce");s=c(n.map(l=>{if(l=cw(l),l in fd)return;fd[l]=!0;const u=l.endsWith(".css"),d=u?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${l}"]${d}`))return;const h=document.createElement("link");if(h.rel=u?"stylesheet":aw,u||(h.as="script"),h.crossOrigin="",h.href=l,a&&h.setAttribute("nonce",a),document.head.appendChild(h),u)return new Promise((f,p)=>{h.addEventListener("load",f),h.addEventListener("error",()=>p(new Error(`Unable to preload CSS for ${l}`)))})}))}function r(o){const a=new Event("vite:preloadError",{cancelable:!0});if(a.payload=o,window.dispatchEvent(a),!a.defaultPrevented)throw o}return s.then(o=>{for(const a of o||[])a.status==="rejected"&&r(a.reason);return e().catch(r)})},A=typeof __SENTRY_DEBUG__>"u"||__SENTRY_DEBUG__,W=globalThis,On="10.34.0";function Ro(){return Ao(W),W}function Ao(t){const e=t.__SENTRY__=t.__SENTRY__||{};return e.version=e.version||On,e[On]=e[On]||{}}function Hi(t,e,n=W){const i=n.__SENTRY__=n.__SENTRY__||{},s=i[On]=i[On]||{};return s[t]||(s[t]=e())}const lw=["debug","info","warn","error","log","assert","trace"],uw="Sentry Logger ",Vr={};function Vi(t){if(!("console"in W))return t();const e=W.console,n={},i=Object.keys(Vr);i.forEach(s=>{const r=Vr[s];n[s]=e[s],e[s]=r});try{return t()}finally{i.forEach(s=>{e[s]=n[s]})}}function dw(){_l().enabled=!0}function hw(){_l().enabled=!1}function op(){return _l().enabled}function fw(...t){ml("log",...t)}function pw(...t){ml("warn",...t)}function gw(...t){ml("error",...t)}function ml(t,...e){A&&op()&&Vi(()=>{W.console[t](`${uw}[${t}]:`,...e)})}function _l(){return A?Hi("loggerSettings",()=>({enabled:!1})):{enabled:!1}}const T={enable:dw,disable:hw,isEnabled:op,log:fw,warn:pw,error:gw},ap=50,xn="?",pd=/\(error: (.*)\)/,gd=/captureMessage|captureException/;function cp(...t){const e=t.sort((n,i)=>n[0]-i[0]).map(n=>n[1]);return(n,i=0,s=0)=>{const r=[],o=n.split(`
`);for(let a=i;a<o.length;a++){let c=o[a];c.length>1024&&(c=c.slice(0,1024));const l=pd.test(c)?c.replace(pd,"$1"):c;if(!l.match(/\S*Error: /)){for(const u of e){const d=u(l);if(d){r.push(d);break}}if(r.length>=ap+s)break}}return _w(r.slice(s))}}function mw(t){return Array.isArray(t)?cp(...t):t}function _w(t){if(!t.length)return[];const e=Array.from(t);return/sentryWrapped/.test(gr(e).function||"")&&e.pop(),e.reverse(),gd.test(gr(e).function||"")&&(e.pop(),gd.test(gr(e).function||"")&&e.pop()),e.slice(0,ap).map(n=>({...n,filename:n.filename||gr(e).filename,function:n.function||xn}))}function gr(t){return t[t.length-1]||{}}const Ca="<anonymous>";function on(t){try{return!t||typeof t!="function"?Ca:t.name||Ca}catch{return Ca}}function md(t){const e=t.exception;if(e){const n=[];try{return e.values.forEach(i=>{i.stacktrace.frames&&n.push(...i.stacktrace.frames)}),n}catch{return}}}function lp(t){return"__v_isVNode"in t&&t.__v_isVNode?"[VueVNode]":"[VueViewModel]"}const Rr={},_d={};function Jn(t,e){Rr[t]=Rr[t]||[],Rr[t].push(e)}function Xn(t,e){if(!_d[t]){_d[t]=!0;try{e()}catch(n){A&&T.error(`Error while instrumenting ${t}`,n)}}}function ot(t,e){const n=t&&Rr[t];if(n)for(const i of n)try{i(e)}catch(s){A&&T.error(`Error while triggering instrumentation handler.
Type: ${t}
Name: ${on(i)}
Error:`,s)}}let Ta=null;function yw(t){const e="error";Jn(e,t),Xn(e,ww)}function ww(){Ta=W.onerror,W.onerror=function(t,e,n,i,s){return ot("error",{column:i,error:s,line:n,msg:t,url:e}),Ta?Ta.apply(this,arguments):!1},W.onerror.__SENTRY_INSTRUMENTED__=!0}let Sa=null;function vw(t){const e="unhandledrejection";Jn(e,t),Xn(e,bw)}function bw(){Sa=W.onunhandledrejection,W.onunhandledrejection=function(t){return ot("unhandledrejection",t),Sa?Sa.apply(this,arguments):!0},W.onunhandledrejection.__SENTRY_INSTRUMENTED__=!0}const up=Object.prototype.toString;function No(t){switch(up.call(t)){case"[object Error]":case"[object Exception]":case"[object DOMException]":case"[object WebAssembly.Exception]":return!0;default:return an(t,Error)}}function Wi(t,e){return up.call(t)===`[object ${e}]`}function dp(t){return Wi(t,"ErrorEvent")}function yd(t){return Wi(t,"DOMError")}function Ew(t){return Wi(t,"DOMException")}function Lt(t){return Wi(t,"String")}function yl(t){return typeof t=="object"&&t!==null&&"__sentry_template_string__"in t&&"__sentry_template_values__"in t}function Po(t){return t===null||yl(t)||typeof t!="object"&&typeof t!="function"}function Ns(t){return Wi(t,"Object")}function Lo(t){return typeof Event<"u"&&an(t,Event)}function Cw(t){return typeof Element<"u"&&an(t,Element)}function Tw(t){return Wi(t,"RegExp")}function Xs(t){return!!(t?.then&&typeof t.then=="function")}function Sw(t){return Ns(t)&&"nativeEvent"in t&&"preventDefault"in t&&"stopPropagation"in t}function an(t,e){try{return t instanceof e}catch{return!1}}function hp(t){return!!(typeof t=="object"&&t!==null&&(t.__isVue||t._isVue||t.__v_isVNode))}function fp(t){return typeof Request<"u"&&an(t,Request)}const wl=W,Iw=80;function pp(t,e={}){if(!t)return"<unknown>";try{let n=t;const i=5,s=[];let r=0,o=0;const a=" > ",c=a.length;let l;const u=Array.isArray(e)?e:e.keyAttrs,d=!Array.isArray(e)&&e.maxStringLength||Iw;for(;n&&r++<i&&(l=kw(n,u),!(l==="html"||r>1&&o+s.length*c+l.length>=d));)s.push(l),o+=l.length,n=n.parentNode;return s.reverse().join(a)}catch{return"<unknown>"}}function kw(t,e){const n=t,i=[];if(!n?.tagName)return"";if(wl.HTMLElement&&n instanceof HTMLElement&&n.dataset){if(n.dataset.sentryComponent)return n.dataset.sentryComponent;if(n.dataset.sentryElement)return n.dataset.sentryElement}i.push(n.tagName.toLowerCase());const s=e?.length?e.filter(o=>n.getAttribute(o)).map(o=>[o,n.getAttribute(o)]):null;if(s?.length)s.forEach(o=>{i.push(`[${o[0]}="${o[1]}"]`)});else{n.id&&i.push(`#${n.id}`);const o=n.className;if(o&&Lt(o)){const a=o.split(/\s+/);for(const c of a)i.push(`.${c}`)}}const r=["aria-label","type","name","title","alt"];for(const o of r){const a=n.getAttribute(o);a&&i.push(`[${o}="${a}"]`)}return i.join("")}function vl(){try{return wl.document.location.href}catch{return""}}function Rw(t){if(!wl.HTMLElement)return null;let e=t;const n=5;for(let i=0;i<n;i++){if(!e)return null;if(e instanceof HTMLElement){if(e.dataset.sentryComponent)return e.dataset.sentryComponent;if(e.dataset.sentryElement)return e.dataset.sentryElement}e=e.parentNode}return null}function He(t,e,n){if(!(e in t))return;const i=t[e];if(typeof i!="function")return;const s=n(i);typeof s=="function"&&gp(s,i);try{t[e]=s}catch{A&&T.log(`Failed to replace method "${e}" in object`,t)}}function cn(t,e,n){try{Object.defineProperty(t,e,{value:n,writable:!0,configurable:!0})}catch{A&&T.log(`Failed to add non-enumerable property "${e}" to object`,t)}}function gp(t,e){try{const n=e.prototype||{};t.prototype=e.prototype=n,cn(t,"__sentry_original__",e)}catch{}}function bl(t){return t.__sentry_original__}function mp(t){if(No(t))return{message:t.message,name:t.name,stack:t.stack,...vd(t)};if(Lo(t)){const e={type:t.type,target:wd(t.target),currentTarget:wd(t.currentTarget),...vd(t)};return typeof CustomEvent<"u"&&an(t,CustomEvent)&&(e.detail=t.detail),e}else return t}function wd(t){try{return Cw(t)?pp(t):Object.prototype.toString.call(t)}catch{return"<unknown>"}}function vd(t){if(typeof t=="object"&&t!==null){const e={};for(const n in t)Object.prototype.hasOwnProperty.call(t,n)&&(e[n]=t[n]);return e}else return{}}function Aw(t){const e=Object.keys(mp(t));return e.sort(),e[0]?e.join(", "):"[object has no keys]"}let ii;function Oo(t){if(ii!==void 0)return ii?ii(t):t();const e=Symbol.for("__SENTRY_SAFE_RANDOM_ID_WRAPPER__"),n=W;return e in n&&typeof n[e]=="function"?(ii=n[e],ii(t)):(ii=null,t())}function Wr(){return Oo(()=>Math.random())}function Do(){return Oo(()=>Date.now())}function dc(t,e=0){return typeof t!="string"||e===0||t.length<=e?t:`${t.slice(0,e)}...`}function bd(t,e){if(!Array.isArray(t))return"";const n=[];for(let i=0;i<t.length;i++){const s=t[i];try{hp(s)?n.push(lp(s)):n.push(String(s))}catch{n.push("[value cannot be serialized]")}}return n.join(e)}function Ar(t,e,n=!1){return Lt(t)?Tw(e)?e.test(t):Lt(e)?n?t===e:t.includes(e):!1:!1}function Mo(t,e=[],n=!1){return e.some(i=>Ar(t,i,n))}function Nw(){const t=W;return t.crypto||t.msCrypto}let Ia;function Pw(){return Wr()*16}function ze(t=Nw()){try{if(t?.randomUUID)return Oo(()=>t.randomUUID()).replace(/-/g,"")}catch{}return Ia||(Ia="10000000100040008000"+1e11),Ia.replace(/[018]/g,e=>(e^(Pw()&15)>>e/4).toString(16))}function _p(t){return t.exception?.values?.[0]}function kn(t){const{message:e,event_id:n}=t;if(e)return e;const i=_p(t);return i?i.type&&i.value?`${i.type}: ${i.value}`:i.type||i.value||n||"<unknown>":n||"<unknown>"}function hc(t,e,n){const i=t.exception=t.exception||{},s=i.values=i.values||[],r=s[0]=s[0]||{};r.value||(r.value=e||""),r.type||(r.type="Error")}function Ii(t,e){const n=_p(t);if(!n)return;const i={type:"generic",handled:!0},s=n.mechanism;if(n.mechanism={...i,...s,...e},e&&"data"in e){const r={...s?.data,...e.data};n.mechanism.data=r}}function Ed(t){if(Lw(t))return!0;try{cn(t,"__sentry_captured__",!0)}catch{}return!1}function Lw(t){try{return t.__sentry_captured__}catch{}}const yp=1e3;function Qs(){return Do()/yp}function Ow(){const{performance:t}=W;if(!t?.now||!t.timeOrigin)return Qs;const e=t.timeOrigin;return()=>(e+Oo(()=>t.now()))/yp}let Cd;function Ot(){return(Cd??(Cd=Ow()))()}function Dw(t){const e=Ot(),n={sid:ze(),init:!0,timestamp:e,started:e,duration:0,status:"ok",errors:0,ignoreDuration:!1,toJSON:()=>xw(n)};return t&&ki(n,t),n}function ki(t,e={}){if(e.user&&(!t.ipAddress&&e.user.ip_address&&(t.ipAddress=e.user.ip_address),!t.did&&!e.did&&(t.did=e.user.id||e.user.email||e.user.username)),t.timestamp=e.timestamp||Ot(),e.abnormal_mechanism&&(t.abnormal_mechanism=e.abnormal_mechanism),e.ignoreDuration&&(t.ignoreDuration=e.ignoreDuration),e.sid&&(t.sid=e.sid.length===32?e.sid:ze()),e.init!==void 0&&(t.init=e.init),!t.did&&e.did&&(t.did=`${e.did}`),typeof e.started=="number"&&(t.started=e.started),t.ignoreDuration)t.duration=void 0;else if(typeof e.duration=="number")t.duration=e.duration;else{const n=t.timestamp-t.started;t.duration=n>=0?n:0}e.release&&(t.release=e.release),e.environment&&(t.environment=e.environment),!t.ipAddress&&e.ipAddress&&(t.ipAddress=e.ipAddress),!t.userAgent&&e.userAgent&&(t.userAgent=e.userAgent),typeof e.errors=="number"&&(t.errors=e.errors),e.status&&(t.status=e.status)}function Mw(t,e){let n={};t.status==="ok"&&(n={status:"exited"}),ki(t,n)}function xw(t){return{sid:`${t.sid}`,init:t.init,started:new Date(t.started*1e3).toISOString(),timestamp:new Date(t.timestamp*1e3).toISOString(),status:t.status,errors:t.errors,did:typeof t.did=="number"||typeof t.did=="string"?`${t.did}`:void 0,duration:t.duration,abnormal_mechanism:t.abnormal_mechanism,attrs:{release:t.release,environment:t.environment,ip_address:t.ipAddress,user_agent:t.userAgent}}}function Zs(t,e,n=2){if(!e||typeof e!="object"||n<=0)return e;if(t&&Object.keys(e).length===0)return t;const i={...t};for(const s in e)Object.prototype.hasOwnProperty.call(e,s)&&(i[s]=Zs(i[s],e[s],n-1));return i}function Td(){return ze()}function wp(){return ze().substring(16)}const fc="_sentrySpan";function Sd(t,e){e?cn(t,fc,e):delete t[fc]}function Id(t){return t[fc]}const Fw=100;class xt{constructor(){this._notifyingListeners=!1,this._scopeListeners=[],this._eventProcessors=[],this._breadcrumbs=[],this._attachments=[],this._user={},this._tags={},this._attributes={},this._extra={},this._contexts={},this._sdkProcessingMetadata={},this._propagationContext={traceId:Td(),sampleRand:Wr()}}clone(){const e=new xt;return e._breadcrumbs=[...this._breadcrumbs],e._tags={...this._tags},e._attributes={...this._attributes},e._extra={...this._extra},e._contexts={...this._contexts},this._contexts.flags&&(e._contexts.flags={values:[...this._contexts.flags.values]}),e._user=this._user,e._level=this._level,e._session=this._session,e._transactionName=this._transactionName,e._fingerprint=this._fingerprint,e._eventProcessors=[...this._eventProcessors],e._attachments=[...this._attachments],e._sdkProcessingMetadata={...this._sdkProcessingMetadata},e._propagationContext={...this._propagationContext},e._client=this._client,e._lastEventId=this._lastEventId,Sd(e,Id(this)),e}setClient(e){this._client=e}setLastEventId(e){this._lastEventId=e}getClient(){return this._client}lastEventId(){return this._lastEventId}addScopeListener(e){this._scopeListeners.push(e)}addEventProcessor(e){return this._eventProcessors.push(e),this}setUser(e){return this._user=e||{email:void 0,id:void 0,ip_address:void 0,username:void 0},this._session&&ki(this._session,{user:e}),this._notifyScopeListeners(),this}getUser(){return this._user}setTags(e){return this._tags={...this._tags,...e},this._notifyScopeListeners(),this}setTag(e,n){return this.setTags({[e]:n})}setAttributes(e){return this._attributes={...this._attributes,...e},this._notifyScopeListeners(),this}setAttribute(e,n){return this.setAttributes({[e]:n})}removeAttribute(e){return e in this._attributes&&(delete this._attributes[e],this._notifyScopeListeners()),this}setExtras(e){return this._extra={...this._extra,...e},this._notifyScopeListeners(),this}setExtra(e,n){return this._extra={...this._extra,[e]:n},this._notifyScopeListeners(),this}setFingerprint(e){return this._fingerprint=e,this._notifyScopeListeners(),this}setLevel(e){return this._level=e,this._notifyScopeListeners(),this}setTransactionName(e){return this._transactionName=e,this._notifyScopeListeners(),this}setContext(e,n){return n===null?delete this._contexts[e]:this._contexts[e]=n,this._notifyScopeListeners(),this}setSession(e){return e?this._session=e:delete this._session,this._notifyScopeListeners(),this}getSession(){return this._session}update(e){if(!e)return this;const n=typeof e=="function"?e(this):e,i=n instanceof xt?n.getScopeData():Ns(n)?e:void 0,{tags:s,attributes:r,extra:o,user:a,contexts:c,level:l,fingerprint:u=[],propagationContext:d}=i||{};return this._tags={...this._tags,...s},this._attributes={...this._attributes,...r},this._extra={...this._extra,...o},this._contexts={...this._contexts,...c},a&&Object.keys(a).length&&(this._user=a),l&&(this._level=l),u.length&&(this._fingerprint=u),d&&(this._propagationContext=d),this}clear(){return this._breadcrumbs=[],this._tags={},this._attributes={},this._extra={},this._user={},this._contexts={},this._level=void 0,this._transactionName=void 0,this._fingerprint=void 0,this._session=void 0,Sd(this,void 0),this._attachments=[],this.setPropagationContext({traceId:Td(),sampleRand:Wr()}),this._notifyScopeListeners(),this}addBreadcrumb(e,n){const i=typeof n=="number"?n:Fw;if(i<=0)return this;const s={timestamp:Qs(),...e,message:e.message?dc(e.message,2048):e.message};return this._breadcrumbs.push(s),this._breadcrumbs.length>i&&(this._breadcrumbs=this._breadcrumbs.slice(-i),this._client?.recordDroppedEvent("buffer_overflow","log_item")),this._notifyScopeListeners(),this}getLastBreadcrumb(){return this._breadcrumbs[this._breadcrumbs.length-1]}clearBreadcrumbs(){return this._breadcrumbs=[],this._notifyScopeListeners(),this}addAttachment(e){return this._attachments.push(e),this}clearAttachments(){return this._attachments=[],this}getScopeData(){return{breadcrumbs:this._breadcrumbs,attachments:this._attachments,contexts:this._contexts,tags:this._tags,attributes:this._attributes,extra:this._extra,user:this._user,level:this._level,fingerprint:this._fingerprint||[],eventProcessors:this._eventProcessors,propagationContext:this._propagationContext,sdkProcessingMetadata:this._sdkProcessingMetadata,transactionName:this._transactionName,span:Id(this)}}setSDKProcessingMetadata(e){return this._sdkProcessingMetadata=Zs(this._sdkProcessingMetadata,e,2),this}setPropagationContext(e){return this._propagationContext=e,this}getPropagationContext(){return this._propagationContext}captureException(e,n){const i=n?.event_id||ze();if(!this._client)return A&&T.warn("No client configured on scope - will not capture exception!"),i;const s=new Error("Sentry syntheticException");return this._client.captureException(e,{originalException:e,syntheticException:s,...n,event_id:i},this),i}captureMessage(e,n,i){const s=i?.event_id||ze();if(!this._client)return A&&T.warn("No client configured on scope - will not capture message!"),s;const r=i?.syntheticException??new Error(e);return this._client.captureMessage(e,n,{originalException:e,syntheticException:r,...i,event_id:s},this),s}captureEvent(e,n){const i=n?.event_id||ze();return this._client?(this._client.captureEvent(e,{...n,event_id:i},this),i):(A&&T.warn("No client configured on scope - will not capture event!"),i)}_notifyScopeListeners(){this._notifyingListeners||(this._notifyingListeners=!0,this._scopeListeners.forEach(e=>{e(this)}),this._notifyingListeners=!1)}}function Uw(){return Hi("defaultCurrentScope",()=>new xt)}function $w(){return Hi("defaultIsolationScope",()=>new xt)}class Bw{constructor(e,n){let i;e?i=e:i=new xt;let s;n?s=n:s=new xt,this._stack=[{scope:i}],this._isolationScope=s}withScope(e){const n=this._pushScope();let i;try{i=e(n)}catch(s){throw this._popScope(),s}return Xs(i)?i.then(s=>(this._popScope(),s),s=>{throw this._popScope(),s}):(this._popScope(),i)}getClient(){return this.getStackTop().client}getScope(){return this.getStackTop().scope}getIsolationScope(){return this._isolationScope}getStackTop(){return this._stack[this._stack.length-1]}_pushScope(){const e=this.getScope().clone();return this._stack.push({client:this.getClient(),scope:e}),e}_popScope(){return this._stack.length<=1?!1:!!this._stack.pop()}}function Ri(){const t=Ro(),e=Ao(t);return e.stack=e.stack||new Bw(Uw(),$w())}function Hw(t){return Ri().withScope(t)}function Vw(t,e){const n=Ri();return n.withScope(()=>(n.getStackTop().scope=t,e(t)))}function kd(t){return Ri().withScope(()=>t(Ri().getIsolationScope()))}function Ww(){return{withIsolationScope:kd,withScope:Hw,withSetScope:Vw,withSetIsolationScope:(t,e)=>kd(e),getCurrentScope:()=>Ri().getScope(),getIsolationScope:()=>Ri().getIsolationScope()}}function El(t){const e=Ao(t);return e.acs?e.acs:Ww()}function gn(){const t=Ro();return El(t).getCurrentScope()}function er(){const t=Ro();return El(t).getIsolationScope()}function jw(){return Hi("globalScope",()=>new xt)}function qw(...t){const e=Ro(),n=El(e);if(t.length===2){const[i,s]=t;return i?n.withSetScope(i,s):n.withScope(s)}return n.withScope(t[0])}function Te(){return gn().getClient()}function zw(t){const e=t.getPropagationContext(),{traceId:n,parentSpanId:i,propagationSpanId:s}=e,r={trace_id:n,span_id:s||wp()};return i&&(r.parent_span_id=i),r}const Gw="sentry.source",Kw="sentry.sample_rate",Yw="sentry.previous_trace_sample_rate",Jw="sentry.op",Xw="sentry.origin",vp="sentry.profile_id",bp="sentry.exclusive_time",Qw=0,Zw=1,ev="_sentryScope",tv="_sentryIsolationScope";function nv(t){if(t){if(typeof t=="object"&&"deref"in t&&typeof t.deref=="function")try{return t.deref()}catch{return}return t}}function Ep(t){const e=t;return{scope:e[ev],isolationScope:nv(e[tv])}}const iv="sentry-",sv=/^sentry-/;function rv(t){const e=ov(t);if(!e)return;const n=Object.entries(e).reduce((i,[s,r])=>{if(s.match(sv)){const o=s.slice(iv.length);i[o]=r}return i},{});if(Object.keys(n).length>0)return n}function ov(t){if(!(!t||!Lt(t)&&!Array.isArray(t)))return Array.isArray(t)?t.reduce((e,n)=>{const i=Rd(n);return Object.entries(i).forEach(([s,r])=>{e[s]=r}),e},{}):Rd(t)}function Rd(t){return t.split(",").map(e=>{const n=e.indexOf("=");if(n===-1)return[];const i=e.slice(0,n),s=e.slice(n+1);return[i,s].map(r=>{try{return decodeURIComponent(r.trim())}catch{return}})}).reduce((e,[n,i])=>(n&&i&&(e[n]=i),e),{})}const av=/^o(\d+)\./,cv=/^(?:(\w+):)\/\/(?:(\w+)(?::(\w+)?)?@)((?:\[[:.%\w]+\]|[\w.-]+))(?::(\d+))?\/(.+)/;function lv(t){return t==="http"||t==="https"}function tr(t,e=!1){const{host:n,path:i,pass:s,port:r,projectId:o,protocol:a,publicKey:c}=t;return`${a}://${c}${e&&s?`:${s}`:""}@${n}${r?`:${r}`:""}/${i&&`${i}/`}${o}`}function uv(t){const e=cv.exec(t);if(!e){Vi(()=>{console.error(`Invalid Sentry Dsn: ${t}`)});return}const[n,i,s="",r="",o="",a=""]=e.slice(1);let c="",l=a;const u=l.split("/");if(u.length>1&&(c=u.slice(0,-1).join("/"),l=u.pop()),l){const d=l.match(/^\d+/);d&&(l=d[0])}return Cp({host:r,pass:s,path:c,projectId:l,port:o,protocol:n,publicKey:i})}function Cp(t){return{protocol:t.protocol,publicKey:t.publicKey||"",pass:t.pass||"",host:t.host,port:t.port||"",path:t.path||"",projectId:t.projectId}}function dv(t){if(!A)return!0;const{port:e,projectId:n,protocol:i}=t;return["protocol","publicKey","host","projectId"].find(o=>t[o]?!1:(T.error(`Invalid Sentry Dsn: ${o} missing`),!0))?!1:n.match(/^\d+$/)?lv(i)?e&&isNaN(parseInt(e,10))?(T.error(`Invalid Sentry Dsn: Invalid port ${e}`),!1):!0:(T.error(`Invalid Sentry Dsn: Invalid protocol ${i}`),!1):(T.error(`Invalid Sentry Dsn: Invalid projectId ${n}`),!1)}function hv(t){return t.match(av)?.[1]}function fv(t){const e=t.getOptions(),{host:n}=t.getDsn()||{};let i;return e.orgId?i=String(e.orgId):n&&(i=hv(n)),i}function pv(t){const e=typeof t=="string"?uv(t):Cp(t);if(!(!e||!dv(e)))return e}function gv(t){if(typeof t=="boolean")return Number(t);const e=typeof t=="string"?parseFloat(t):t;if(!(typeof e!="number"||isNaN(e)||e<0||e>1))return e}const Tp=1;let Ad=!1;function mv(t){const{spanId:e,traceId:n,isRemote:i}=t.spanContext(),s=i?e:Cl(t).parent_span_id,r=Ep(t).scope,o=i?r?.getPropagationContext().propagationSpanId||wp():e;return{parent_span_id:s,span_id:o,trace_id:n}}function _v(t){if(t&&t.length>0)return t.map(({context:{spanId:e,traceId:n,traceFlags:i,...s},attributes:r})=>({span_id:e,trace_id:n,sampled:i===Tp,attributes:r,...s}))}function Nd(t){return typeof t=="number"?Pd(t):Array.isArray(t)?t[0]+t[1]/1e9:t instanceof Date?Pd(t.getTime()):Ot()}function Pd(t){return t>9999999999?t/1e3:t}function Cl(t){if(wv(t))return t.getSpanJSON();const{spanId:e,traceId:n}=t.spanContext();if(yv(t)){const{attributes:i,startTime:s,name:r,endTime:o,status:a,links:c}=t,l="parentSpanId"in t?t.parentSpanId:"parentSpanContext"in t?t.parentSpanContext?.spanId:void 0;return{span_id:e,trace_id:n,data:i,description:r,parent_span_id:l,start_timestamp:Nd(s),timestamp:Nd(o)||void 0,status:bv(a),op:i[Jw],origin:i[Xw],links:_v(c)}}return{span_id:e,trace_id:n,start_timestamp:0,data:{}}}function yv(t){const e=t;return!!e.attributes&&!!e.startTime&&!!e.name&&!!e.endTime&&!!e.status}function wv(t){return typeof t.getSpanJSON=="function"}function vv(t){const{traceFlags:e}=t.spanContext();return e===Tp}function bv(t){if(!(!t||t.code===Qw))return t.code===Zw?"ok":t.message||"internal_error"}const Ev="_sentryRootSpan";function Sp(t){return t[Ev]||t}function Ld(){Ad||(Vi(()=>{console.warn("[Sentry] Returning null from `beforeSendSpan` is disallowed. To drop certain spans, configure the respective integrations directly or use `ignoreSpans`.")}),Ad=!0)}function Cv(t){if(typeof __SENTRY_TRACING__=="boolean"&&!__SENTRY_TRACING__)return!1;const e=Te()?.getOptions();return!!e&&(e.tracesSampleRate!=null||!!e.tracesSampler)}function Od(t){T.log(`Ignoring span ${t.op} - ${t.description} because it matches \`ignoreSpans\`.`)}function Dd(t,e){if(!e?.length||!t.description)return!1;for(const n of e){if(Sv(n)){if(Ar(t.description,n))return A&&Od(t),!0;continue}if(!n.name&&!n.op)continue;const i=n.name?Ar(t.description,n.name):!0,s=n.op?t.op&&Ar(t.op,n.op):!0;if(i&&s)return A&&Od(t),!0}return!1}function Tv(t,e){const n=e.parent_span_id,i=e.span_id;if(n)for(const s of t)s.parent_span_id===i&&(s.parent_span_id=n)}function Sv(t){return typeof t=="string"||t instanceof RegExp}const Tl="production",Iv="_frozenDsc";function Ip(t,e){const n=e.getOptions(),{publicKey:i}=e.getDsn()||{},s={environment:n.environment||Tl,release:n.release,public_key:i,trace_id:t,org_id:fv(e)};return e.emit("createDsc",s),s}function kv(t,e){const n=e.getPropagationContext();return n.dsc||Ip(n.traceId,t)}function Rv(t){const e=Te();if(!e)return{};const n=Sp(t),i=Cl(n),s=i.data,r=n.spanContext().traceState,o=r?.get("sentry.sample_rate")??s[Kw]??s[Yw];function a(p){return(typeof o=="number"||typeof o=="string")&&(p.sample_rate=`${o}`),p}const c=n[Iv];if(c)return a(c);const l=r?.get("sentry.dsc"),u=l&&rv(l);if(u)return a(u);const d=Ip(t.spanContext().traceId,e),h=s[Gw],f=i.description;return h!=="url"&&f&&(d.transaction=f),Cv()&&(d.sampled=String(vv(n)),d.sample_rand=r?.get("sentry.sample_rand")??Ep(n).scope?.getPropagationContext().sampleRand.toString()),a(d),e.emit("createDsc",d,n),d}function Ct(t,e=100,n=1/0){try{return pc("",t,e,n)}catch(i){return{ERROR:`**non-serializable** (${i})`}}}function kp(t,e=3,n=100*1024){const i=Ct(t,e);return Lv(i)>n?kp(t,e-1,n):i}function pc(t,e,n=1/0,i=1/0,s=Ov()){const[r,o]=s;if(e==null||["boolean","string"].includes(typeof e)||typeof e=="number"&&Number.isFinite(e))return e;const a=Av(t,e);if(!a.startsWith("[object "))return a;if(e.__sentry_skip_normalization__)return e;const c=typeof e.__sentry_override_normalization_depth__=="number"?e.__sentry_override_normalization_depth__:n;if(c===0)return a.replace("object ","");if(r(e))return"[Circular ~]";const l=e;if(l&&typeof l.toJSON=="function")try{const f=l.toJSON();return pc("",f,c-1,i,s)}catch{}const u=Array.isArray(e)?[]:{};let d=0;const h=mp(e);for(const f in h){if(!Object.prototype.hasOwnProperty.call(h,f))continue;if(d>=i){u[f]="[MaxProperties ~]";break}const p=h[f];u[f]=pc(f,p,c-1,i,s),d++}return o(e),u}function Av(t,e){try{if(t==="domain"&&e&&typeof e=="object"&&e._events)return"[Domain]";if(t==="domainEmitter")return"[DomainEmitter]";if(typeof global<"u"&&e===global)return"[Global]";if(typeof window<"u"&&e===window)return"[Window]";if(typeof document<"u"&&e===document)return"[Document]";if(hp(e))return lp(e);if(Sw(e))return"[SyntheticEvent]";if(typeof e=="number"&&!Number.isFinite(e))return`[${e}]`;if(typeof e=="function")return`[Function: ${on(e)}]`;if(typeof e=="symbol")return`[${String(e)}]`;if(typeof e=="bigint")return`[BigInt: ${String(e)}]`;const n=Nv(e);return/^HTML(\w*)Element$/.test(n)?`[HTMLElement: ${n}]`:`[object ${n}]`}catch(n){return`**non-serializable** (${n})`}}function Nv(t){const e=Object.getPrototypeOf(t);return e?.constructor?e.constructor.name:"null prototype"}function Pv(t){return~-encodeURI(t).split(/%..|./).length}function Lv(t){return Pv(JSON.stringify(t))}function Ov(){const t=new WeakSet;function e(i){return t.has(i)?!0:(t.add(i),!1)}function n(i){t.delete(i)}return[e,n]}function ji(t,e=[]){return[t,e]}function Dv(t,e){const[n,i]=t;return[n,[...i,e]]}function gc(t,e){const n=t[1];for(const i of n){const s=i[0].type;if(e(i,s))return!0}return!1}function Mv(t,e){return gc(t,(n,i)=>e.includes(i))}function mc(t){const e=Ao(W);return e.encodePolyfill?e.encodePolyfill(t):new TextEncoder().encode(t)}function xv(t){const[e,n]=t;let i=JSON.stringify(e);function s(r){typeof i=="string"?i=typeof r=="string"?i+r:[mc(i),r]:i.push(typeof r=="string"?mc(r):r)}for(const r of n){const[o,a]=r;if(s(`
${JSON.stringify(o)}
`),typeof a=="string"||a instanceof Uint8Array)s(a);else{let c;try{c=JSON.stringify(a)}catch{c=JSON.stringify(Ct(a))}s(c)}}return typeof i=="string"?i:Fv(i)}function Fv(t){const e=t.reduce((s,r)=>s+r.length,0),n=new Uint8Array(e);let i=0;for(const s of t)n.set(s,i),i+=s.length;return n}function Uv(t){const e=typeof t.data=="string"?mc(t.data):t.data;return[{type:"attachment",length:e.length,filename:t.filename,content_type:t.contentType,attachment_type:t.attachmentType},e]}const $v={session:"session",sessions:"session",attachment:"attachment",transaction:"transaction",event:"error",client_report:"internal",user_report:"default",profile:"profile",profile_chunk:"profile",replay_event:"replay",replay_recording:"replay",check_in:"monitor",feedback:"feedback",span:"span",raw_security:"security",log:"log_item",metric:"metric",trace_metric:"metric"};function Md(t){return $v[t]}function Rp(t){if(!t?.sdk)return;const{name:e,version:n}=t.sdk;return{name:e,version:n}}function Bv(t,e,n,i){const s=t.sdkProcessingMetadata?.dynamicSamplingContext;return{event_id:t.event_id,sent_at:new Date().toISOString(),...e&&{sdk:e},...!!n&&i&&{dsn:tr(i)},...s&&{trace:s}}}function Hv(t,e){if(!e)return t;const n=t.sdk||{};return t.sdk={...n,name:n.name||e.name,version:n.version||e.version,integrations:[...t.sdk?.integrations||[],...e.integrations||[]],packages:[...t.sdk?.packages||[],...e.packages||[]],settings:t.sdk?.settings||e.settings?{...t.sdk?.settings,...e.settings}:void 0},t}function Vv(t,e,n,i){const s=Rp(n),r={sent_at:new Date().toISOString(),...s&&{sdk:s},...!!i&&e&&{dsn:tr(e)}},o="aggregates"in t?[{type:"sessions"},t]:[{type:"session"},t.toJSON()];return ji(r,[o])}function Wv(t,e,n,i){const s=Rp(n),r=t.type&&t.type!=="replay_event"?t.type:"event";Hv(t,n?.sdk);const o=Bv(t,s,i,e);return delete t.sdkProcessingMetadata,ji(o,[[{type:r},t]])}const ka=0,xd=1,Fd=2;function xo(t){return new Ps(e=>{e(t)})}function Sl(t){return new Ps((e,n)=>{n(t)})}class Ps{constructor(e){this._state=ka,this._handlers=[],this._runExecutor(e)}then(e,n){return new Ps((i,s)=>{this._handlers.push([!1,r=>{if(!e)i(r);else try{i(e(r))}catch(o){s(o)}},r=>{if(!n)s(r);else try{i(n(r))}catch(o){s(o)}}]),this._executeHandlers()})}catch(e){return this.then(n=>n,e)}finally(e){return new Ps((n,i)=>{let s,r;return this.then(o=>{r=!1,s=o,e&&e()},o=>{r=!0,s=o,e&&e()}).then(()=>{if(r){i(s);return}n(s)})})}_executeHandlers(){if(this._state===ka)return;const e=this._handlers.slice();this._handlers=[],e.forEach(n=>{n[0]||(this._state===xd&&n[1](this._value),this._state===Fd&&n[2](this._value),n[0]=!0)})}_runExecutor(e){const n=(r,o)=>{if(this._state===ka){if(Xs(o)){o.then(i,s);return}this._state=r,this._value=o,this._executeHandlers()}},i=r=>{n(xd,r)},s=r=>{n(Fd,r)};try{e(i,s)}catch(r){s(r)}}}function jv(t,e,n,i=0){try{const s=_c(e,n,t,i);return Xs(s)?s:xo(s)}catch(s){return Sl(s)}}function _c(t,e,n,i){const s=n[i];if(!t||!s)return t;const r=s({...t},e);return A&&r===null&&T.log(`Event processor "${s.id||"?"}" dropped event`),Xs(r)?r.then(o=>_c(o,e,n,i+1)):_c(r,e,n,i+1)}let bn,Ud,$d,jt;function qv(t){const e=W._sentryDebugIds,n=W._debugIds;if(!e&&!n)return{};const i=e?Object.keys(e):[],s=n?Object.keys(n):[];if(jt&&i.length===Ud&&s.length===$d)return jt;Ud=i.length,$d=s.length,jt={},bn||(bn={});const r=(o,a)=>{for(const c of o){const l=a[c],u=bn?.[c];if(u&&jt&&l)jt[u[0]]=l,bn&&(bn[c]=[u[0],l]);else if(l){const d=t(c);for(let h=d.length-1;h>=0;h--){const p=d[h]?.filename;if(p&&jt&&bn){jt[p]=l,bn[c]=[p,l];break}}}}};return e&&r(i,e),n&&r(s,n),jt}function zv(t,e){const{fingerprint:n,span:i,breadcrumbs:s,sdkProcessingMetadata:r}=e;Kv(t,e),i&&Xv(t,i),Qv(t,n),Yv(t,s),Jv(t,r)}function Bd(t,e){const{extra:n,tags:i,attributes:s,user:r,contexts:o,level:a,sdkProcessingMetadata:c,breadcrumbs:l,fingerprint:u,eventProcessors:d,attachments:h,propagationContext:f,transactionName:p,span:_}=e;os(t,"extra",n),os(t,"tags",i),os(t,"attributes",s),os(t,"user",r),os(t,"contexts",o),t.sdkProcessingMetadata=Zs(t.sdkProcessingMetadata,c,2),a&&(t.level=a),p&&(t.transactionName=p),_&&(t.span=_),l.length&&(t.breadcrumbs=[...t.breadcrumbs,...l]),u.length&&(t.fingerprint=[...t.fingerprint,...u]),d.length&&(t.eventProcessors=[...t.eventProcessors,...d]),h.length&&(t.attachments=[...t.attachments,...h]),t.propagationContext={...t.propagationContext,...f}}function os(t,e,n){t[e]=Zs(t[e],n,1)}function Gv(t,e){const n=jw().getScopeData();return t&&Bd(n,t.getScopeData()),e&&Bd(n,e.getScopeData()),n}function Kv(t,e){const{extra:n,tags:i,user:s,contexts:r,level:o,transactionName:a}=e;Object.keys(n).length&&(t.extra={...n,...t.extra}),Object.keys(i).length&&(t.tags={...i,...t.tags}),Object.keys(s).length&&(t.user={...s,...t.user}),Object.keys(r).length&&(t.contexts={...r,...t.contexts}),o&&(t.level=o),a&&t.type!=="transaction"&&(t.transaction=a)}function Yv(t,e){const n=[...t.breadcrumbs||[],...e];t.breadcrumbs=n.length?n:void 0}function Jv(t,e){t.sdkProcessingMetadata={...t.sdkProcessingMetadata,...e}}function Xv(t,e){t.contexts={trace:mv(e),...t.contexts},t.sdkProcessingMetadata={dynamicSamplingContext:Rv(e),...t.sdkProcessingMetadata};const n=Sp(e),i=Cl(n).description;i&&!t.transaction&&t.type==="transaction"&&(t.transaction=i)}function Qv(t,e){t.fingerprint=t.fingerprint?Array.isArray(t.fingerprint)?t.fingerprint:[t.fingerprint]:[],e&&(t.fingerprint=t.fingerprint.concat(e)),t.fingerprint.length||delete t.fingerprint}function Zv(t,e,n,i,s,r){const{normalizeDepth:o=3,normalizeMaxBreadth:a=1e3}=t,c={...e,event_id:e.event_id||n.event_id||ze(),timestamp:e.timestamp||Qs()},l=n.integrations||t.integrations.map(m=>m.name);eb(c,t),ib(c,l),s&&s.emit("applyFrameMetadata",e),e.type===void 0&&tb(c,t.stackParser);const u=rb(i,n.captureContext);n.mechanism&&Ii(c,n.mechanism);const d=s?s.getEventProcessors():[],h=Gv(r,u),f=[...n.attachments||[],...h.attachments];f.length&&(n.attachments=f),zv(c,h);const p=[...d,...h.eventProcessors];return jv(p,c,n).then(m=>(m&&nb(m),typeof o=="number"&&o>0?sb(m,o,a):m))}function eb(t,e){const{environment:n,release:i,dist:s,maxValueLength:r}=e;t.environment=t.environment||n||Tl,!t.release&&i&&(t.release=i),!t.dist&&s&&(t.dist=s);const o=t.request;o?.url&&r&&(o.url=dc(o.url,r)),r&&t.exception?.values?.forEach(a=>{a.value&&(a.value=dc(a.value,r))})}function tb(t,e){const n=qv(e);t.exception?.values?.forEach(i=>{i.stacktrace?.frames?.forEach(s=>{s.filename&&(s.debug_id=n[s.filename])})})}function nb(t){const e={};if(t.exception?.values?.forEach(i=>{i.stacktrace?.frames?.forEach(s=>{s.debug_id&&(s.abs_path?e[s.abs_path]=s.debug_id:s.filename&&(e[s.filename]=s.debug_id),delete s.debug_id)})}),Object.keys(e).length===0)return;t.debug_meta=t.debug_meta||{},t.debug_meta.images=t.debug_meta.images||[];const n=t.debug_meta.images;Object.entries(e).forEach(([i,s])=>{n.push({type:"sourcemap",code_file:i,debug_id:s})})}function ib(t,e){e.length>0&&(t.sdk=t.sdk||{},t.sdk.integrations=[...t.sdk.integrations||[],...e])}function sb(t,e,n){if(!t)return null;const i={...t,...t.breadcrumbs&&{breadcrumbs:t.breadcrumbs.map(s=>({...s,...s.data&&{data:Ct(s.data,e,n)}}))},...t.user&&{user:Ct(t.user,e,n)},...t.contexts&&{contexts:Ct(t.contexts,e,n)},...t.extra&&{extra:Ct(t.extra,e,n)}};return t.contexts?.trace&&i.contexts&&(i.contexts.trace=t.contexts.trace,t.contexts.trace.data&&(i.contexts.trace.data=Ct(t.contexts.trace.data,e,n))),t.spans&&(i.spans=t.spans.map(s=>({...s,...s.data&&{data:Ct(s.data,e,n)}}))),t.contexts?.flags&&i.contexts&&(i.contexts.flags=Ct(t.contexts.flags,3,n)),i}function rb(t,e){if(!e)return t;const n=t?t.clone():new xt;return n.update(e),n}function ob(t,e){return gn().captureException(t,void 0)}function Ap(t,e){return gn().captureEvent(t,e)}function Hd(t){const e=er(),n=gn(),{userAgent:i}=W.navigator||{},s=Dw({user:n.getUser()||e.getUser(),...i&&{userAgent:i},...t}),r=e.getSession();return r?.status==="ok"&&ki(r,{status:"exited"}),Np(),e.setSession(s),s}function Np(){const t=er(),n=gn().getSession()||t.getSession();n&&Mw(n),Pp(),t.setSession()}function Pp(){const t=er(),e=Te(),n=t.getSession();n&&e&&e.captureSession(n)}function Vd(t=!1){if(t){Np();return}Pp()}const ab="7";function cb(t){const e=t.protocol?`${t.protocol}:`:"",n=t.port?`:${t.port}`:"";return`${e}//${t.host}${n}${t.path?`/${t.path}`:""}/api/`}function lb(t){return`${cb(t)}${t.projectId}/envelope/`}function ub(t,e){const n={sentry_version:ab};return t.publicKey&&(n.sentry_key=t.publicKey),e&&(n.sentry_client=`${e.name}/${e.version}`),new URLSearchParams(n).toString()}function db(t,e,n){return e||`${lb(t)}?${ub(t,n)}`}const Wd=[];function hb(t){const e={};return t.forEach(n=>{const{name:i}=n,s=e[i];s&&!s.isDefaultInstance&&n.isDefaultInstance||(e[i]=n)}),Object.values(e)}function fb(t){const e=t.defaultIntegrations||[],n=t.integrations;e.forEach(s=>{s.isDefaultInstance=!0});let i;if(Array.isArray(n))i=[...e,...n];else if(typeof n=="function"){const s=n(e);i=Array.isArray(s)?s:[s]}else i=e;return hb(i)}function pb(t,e){const n={};return e.forEach(i=>{i&&Lp(t,i,n)}),n}function jd(t,e){for(const n of e)n?.afterAllSetup&&n.afterAllSetup(t)}function Lp(t,e,n){if(n[e.name]){A&&T.log(`Integration skipped because it was already installed: ${e.name}`);return}if(n[e.name]=e,!Wd.includes(e.name)&&typeof e.setupOnce=="function"&&(e.setupOnce(),Wd.push(e.name)),e.setup&&typeof e.setup=="function"&&e.setup(t),typeof e.preprocessEvent=="function"){const i=e.preprocessEvent.bind(e);t.on("preprocessEvent",(s,r)=>i(s,r,t))}if(typeof e.processEvent=="function"){const i=e.processEvent.bind(e),s=Object.assign((r,o)=>i(r,o,t),{id:e.name});t.addEventProcessor(s)}A&&T.log(`Integration installed: ${e.name}`)}function gb(t){return[{type:"log",item_count:t.length,content_type:"application/vnd.sentry.items.log+json"},{items:t}]}function mb(t,e,n,i){const s={};return e?.sdk&&(s.sdk={name:e.sdk.name,version:e.sdk.version}),n&&i&&(s.dsn=tr(i)),ji(s,[gb(t)])}function Op(t,e){const n=e??_b(t)??[];if(n.length===0)return;const i=t.getOptions(),s=mb(n,i._metadata,i.tunnel,t.getDsn());Dp().set(t,[]),t.emit("flushLogs"),t.sendEnvelope(s)}function _b(t){return Dp().get(t)}function Dp(){return Hi("clientToLogBufferMap",()=>new WeakMap)}function yb(t){return[{type:"trace_metric",item_count:t.length,content_type:"application/vnd.sentry.items.trace-metric+json"},{items:t}]}function wb(t,e,n,i){const s={};return e?.sdk&&(s.sdk={name:e.sdk.name,version:e.sdk.version}),n&&i&&(s.dsn=tr(i)),ji(s,[yb(t)])}function Mp(t,e){const n=e??vb(t)??[];if(n.length===0)return;const i=t.getOptions(),s=wb(n,i._metadata,i.tunnel,t.getDsn());xp().set(t,[]),t.emit("flushMetrics"),t.sendEnvelope(s)}function vb(t){return xp().get(t)}function xp(){return Hi("clientToMetricBufferMap",()=>new WeakMap)}const Il=Symbol.for("SentryBufferFullError");function kl(t=100){const e=new Set;function n(){return e.size<t}function i(o){e.delete(o)}function s(o){if(!n())return Sl(Il);const a=o();return e.add(a),a.then(()=>i(a),()=>i(a)),a}function r(o){if(!e.size)return xo(!0);const a=Promise.allSettled(Array.from(e)).then(()=>!0);if(!o)return a;const c=[a,new Promise(l=>setTimeout(()=>l(!1),o))];return Promise.race(c)}return{get $(){return Array.from(e)},add:s,drain:r}}const bb=60*1e3;function Eb(t,e=Do()){const n=parseInt(`${t}`,10);if(!isNaN(n))return n*1e3;const i=Date.parse(`${t}`);return isNaN(i)?bb:i-e}function Cb(t,e){return t[e]||t.all||0}function Tb(t,e,n=Do()){return Cb(t,e)>n}function Sb(t,{statusCode:e,headers:n},i=Do()){const s={...t},r=n?.["x-sentry-rate-limits"],o=n?.["retry-after"];if(r)for(const a of r.trim().split(",")){const[c,l,,,u]=a.split(":",5),d=parseInt(c,10),h=(isNaN(d)?60:d)*1e3;if(!l)s.all=i+h;else for(const f of l.split(";"))f==="metric_bucket"?(!u||u.split(";").includes("custom"))&&(s[f]=i+h):s[f]=i+h}else o?s.all=i+Eb(o,i):e===429&&(s.all=i+60*1e3);return s}const Fp=64;function Ib(t,e,n=kl(t.bufferSize||Fp)){let i={};const s=o=>n.drain(o);function r(o){const a=[];if(gc(o,(d,h)=>{const f=Md(h);Tb(i,f)?t.recordDroppedEvent("ratelimit_backoff",f):a.push(d)}),a.length===0)return Promise.resolve({});const c=ji(o[0],a),l=d=>{if(Mv(c,["client_report"])){A&&T.warn(`Dropping client report. Will not send outcomes (reason: ${d}).`);return}gc(c,(h,f)=>{t.recordDroppedEvent(d,Md(f))})},u=()=>e({body:xv(c)}).then(d=>(d.statusCode!==void 0&&(d.statusCode<200||d.statusCode>=300)&&A&&T.warn(`Sentry responded with status code ${d.statusCode} to sent event.`),i=Sb(i,d),d),d=>{throw l("network_error"),A&&T.error("Encountered error running transport request:",d),d});return n.add(u).then(d=>d,d=>{if(d===Il)return A&&T.error("Skipped sending event because buffer is full."),l("queue_overflow"),Promise.resolve({});throw d})}return{send:r,flush:s}}function kb(t,e,n){const i=[{type:"client_report"},{timestamp:Qs(),discarded_events:t}];return ji(e?{dsn:e}:{},[i])}function Up(t){const e=[];t.message&&e.push(t.message);try{const n=t.exception.values[t.exception.values.length-1];n?.value&&(e.push(n.value),n.type&&e.push(`${n.type}: ${n.value}`))}catch{}return e}function Rb(t){const{trace_id:e,parent_span_id:n,span_id:i,status:s,origin:r,data:o,op:a}=t.contexts?.trace??{};return{data:o??{},description:t.transaction,op:a,parent_span_id:n,span_id:i??"",start_timestamp:t.start_timestamp??0,status:s,timestamp:t.timestamp,trace_id:e??"",origin:r,profile_id:o?.[vp],exclusive_time:o?.[bp],measurements:t.measurements,is_segment:!0}}function Ab(t){return{type:"transaction",timestamp:t.timestamp,start_timestamp:t.start_timestamp,transaction:t.description,contexts:{trace:{trace_id:t.trace_id,span_id:t.span_id,parent_span_id:t.parent_span_id,op:t.op,status:t.status,origin:t.origin,data:{...t.data,...t.profile_id&&{[vp]:t.profile_id},...t.exclusive_time&&{[bp]:t.exclusive_time}}}},measurements:t.measurements}}const qd="Not capturing exception because it's already been captured.",zd="Discarded session because of missing or non-string release",$p=Symbol.for("SentryInternalError"),Bp=Symbol.for("SentryDoNotSendEventError"),Nb=5e3;function Nr(t){return{message:t,[$p]:!0}}function Ra(t){return{message:t,[Bp]:!0}}function Gd(t){return!!t&&typeof t=="object"&&$p in t}function Kd(t){return!!t&&typeof t=="object"&&Bp in t}function Yd(t,e,n,i,s){let r=0,o,a=!1;t.on(n,()=>{r=0,clearTimeout(o),a=!1}),t.on(e,c=>{r+=i(c),r>=8e5?s(t):a||(a=!0,o=setTimeout(()=>{s(t)},Nb))}),t.on("flush",()=>{s(t)})}class Pb{constructor(e){if(this._options=e,this._integrations={},this._numProcessing=0,this._outcomes={},this._hooks={},this._eventProcessors=[],this._promiseBuffer=kl(e.transportOptions?.bufferSize??Fp),e.dsn?this._dsn=pv(e.dsn):A&&T.warn("No DSN provided, client will not send events."),this._dsn){const i=db(this._dsn,e.tunnel,e._metadata?e._metadata.sdk:void 0);this._transport=e.transport({tunnel:this._options.tunnel,recordDroppedEvent:this.recordDroppedEvent.bind(this),...e.transportOptions,url:i})}this._options.enableLogs=this._options.enableLogs??this._options._experiments?.enableLogs,this._options.enableLogs&&Yd(this,"afterCaptureLog","flushLogs",Mb,Op),(this._options.enableMetrics??this._options._experiments?.enableMetrics??!0)&&Yd(this,"afterCaptureMetric","flushMetrics",Db,Mp)}captureException(e,n,i){const s=ze();if(Ed(e))return A&&T.log(qd),s;const r={event_id:s,...n};return this._process(()=>this.eventFromException(e,r).then(o=>this._captureEvent(o,r,i)).then(o=>o),"error"),r.event_id}captureMessage(e,n,i,s){const r={event_id:ze(),...i},o=yl(e)?e:String(e),a=Po(e),c=a?this.eventFromMessage(o,n,r):this.eventFromException(e,r);return this._process(()=>c.then(l=>this._captureEvent(l,r,s)),a?"unknown":"error"),r.event_id}captureEvent(e,n,i){const s=ze();if(n?.originalException&&Ed(n.originalException))return A&&T.log(qd),s;const r={event_id:s,...n},o=e.sdkProcessingMetadata||{},a=o.capturedSpanScope,c=o.capturedSpanIsolationScope,l=Jd(e.type);return this._process(()=>this._captureEvent(e,r,a||i,c),l),r.event_id}captureSession(e){this.sendSession(e),ki(e,{init:!1})}getDsn(){return this._dsn}getOptions(){return this._options}getSdkMetadata(){return this._options._metadata}getTransport(){return this._transport}async flush(e){const n=this._transport;if(!n)return!0;this.emit("flush");const i=await this._isClientDoneProcessing(e),s=await n.flush(e);return i&&s}async close(e){const n=await this.flush(e);return this.getOptions().enabled=!1,this.emit("close"),n}getEventProcessors(){return this._eventProcessors}addEventProcessor(e){this._eventProcessors.push(e)}init(){(this._isEnabled()||this._options.integrations.some(({name:e})=>e.startsWith("Spotlight")))&&this._setupIntegrations()}getIntegrationByName(e){return this._integrations[e]}addIntegration(e){const n=this._integrations[e.name];Lp(this,e,this._integrations),n||jd(this,[e])}sendEvent(e,n={}){this.emit("beforeSendEvent",e,n);let i=Wv(e,this._dsn,this._options._metadata,this._options.tunnel);for(const s of n.attachments||[])i=Dv(i,Uv(s));this.sendEnvelope(i).then(s=>this.emit("afterSendEvent",e,s))}sendSession(e){const{release:n,environment:i=Tl}=this._options;if("aggregates"in e){const r=e.attrs||{};if(!r.release&&!n){A&&T.warn(zd);return}r.release=r.release||n,r.environment=r.environment||i,e.attrs=r}else{if(!e.release&&!n){A&&T.warn(zd);return}e.release=e.release||n,e.environment=e.environment||i}this.emit("beforeSendSession",e);const s=Vv(e,this._dsn,this._options._metadata,this._options.tunnel);this.sendEnvelope(s)}recordDroppedEvent(e,n,i=1){if(this._options.sendClientReports){const s=`${e}:${n}`;A&&T.log(`Recording outcome: "${s}"${i>1?` (${i} times)`:""}`),this._outcomes[s]=(this._outcomes[s]||0)+i}}on(e,n){const i=this._hooks[e]=this._hooks[e]||new Set,s=(...r)=>n(...r);return i.add(s),()=>{i.delete(s)}}emit(e,...n){const i=this._hooks[e];i&&i.forEach(s=>s(...n))}async sendEnvelope(e){if(this.emit("beforeEnvelope",e),this._isEnabled()&&this._transport)try{return await this._transport.send(e)}catch(n){return A&&T.error("Error while sending envelope:",n),{}}return A&&T.error("Transport disabled"),{}}_setupIntegrations(){const{integrations:e}=this._options;this._integrations=pb(this,e),jd(this,e)}_updateSessionFromEvent(e,n){let i=n.level==="fatal",s=!1;const r=n.exception?.values;if(r){s=!0,i=!1;for(const c of r)if(c.mechanism?.handled===!1){i=!0;break}}const o=e.status==="ok";(o&&e.errors===0||o&&i)&&(ki(e,{...i&&{status:"crashed"},errors:e.errors||Number(s||i)}),this.captureSession(e))}async _isClientDoneProcessing(e){let n=0;for(;!e||n<e;){if(await new Promise(i=>setTimeout(i,1)),!this._numProcessing)return!0;n++}return!1}_isEnabled(){return this.getOptions().enabled!==!1&&this._transport!==void 0}_prepareEvent(e,n,i,s){const r=this.getOptions(),o=Object.keys(this._integrations);return!n.integrations&&o?.length&&(n.integrations=o),this.emit("preprocessEvent",e,n),e.type||s.setLastEventId(e.event_id||n.event_id),Zv(r,e,n,i,this,s).then(a=>{if(a===null)return a;this.emit("postprocessEvent",a,n),a.contexts={trace:zw(i),...a.contexts};const c=kv(this,i);return a.sdkProcessingMetadata={dynamicSamplingContext:c,...a.sdkProcessingMetadata},a})}_captureEvent(e,n={},i=gn(),s=er()){return A&&yc(e)&&T.log(`Captured error event \`${Up(e)[0]||"<unknown>"}\``),this._processEvent(e,n,i,s).then(r=>r.event_id,r=>{A&&(Kd(r)?T.log(r.message):Gd(r)?T.warn(r.message):T.warn(r))})}_processEvent(e,n,i,s){const r=this.getOptions(),{sampleRate:o}=r,a=Hp(e),c=yc(e),u=`before send for type \`${e.type||"error"}\``,d=typeof o>"u"?void 0:gv(o);if(c&&typeof d=="number"&&Wr()>d)return this.recordDroppedEvent("sample_rate","error"),Sl(Ra(`Discarding event because it's not included in the random sample (sampling rate = ${o})`));const h=Jd(e.type);return this._prepareEvent(e,n,i,s).then(f=>{if(f===null)throw this.recordDroppedEvent("event_processor",h),Ra("An event processor returned `null`, will not send event.");if(n.data&&n.data.__sentry__===!0)return f;const _=Ob(this,r,f,n);return Lb(_,u)}).then(f=>{if(f===null){if(this.recordDroppedEvent("before_send",h),a){const R=1+(e.spans||[]).length;this.recordDroppedEvent("before_send","span",R)}throw Ra(`${u} returned \`null\`, will not send event.`)}const p=i.getSession()||s.getSession();if(c&&p&&this._updateSessionFromEvent(p,f),a){const m=f.sdkProcessingMetadata?.spanCountBeforeProcessing||0,R=f.spans?f.spans.length:0,M=m-R;M>0&&this.recordDroppedEvent("before_send","span",M)}const _=f.transaction_info;if(a&&_&&f.transaction!==e.transaction){const m="custom";f.transaction_info={..._,source:m}}return this.sendEvent(f,n),f}).then(null,f=>{throw Kd(f)||Gd(f)?f:(this.captureException(f,{mechanism:{handled:!1,type:"internal"},data:{__sentry__:!0},originalException:f}),Nr(`Event processing pipeline threw an error, original event will not be sent. Details have been sent as a new event.
Reason: ${f}`))})}_process(e,n){this._numProcessing++,this._promiseBuffer.add(e).then(i=>(this._numProcessing--,i),i=>(this._numProcessing--,i===Il&&this.recordDroppedEvent("queue_overflow",n),i))}_clearOutcomes(){const e=this._outcomes;return this._outcomes={},Object.entries(e).map(([n,i])=>{const[s,r]=n.split(":");return{reason:s,category:r,quantity:i}})}_flushOutcomes(){A&&T.log("Flushing outcomes...");const e=this._clearOutcomes();if(e.length===0){A&&T.log("No outcomes to send");return}if(!this._dsn){A&&T.log("No dsn provided, will not send outcomes");return}A&&T.log("Sending outcomes:",e);const n=kb(e,this._options.tunnel&&tr(this._dsn));this.sendEnvelope(n)}}function Jd(t){return t==="replay_event"?"replay":t||"error"}function Lb(t,e){const n=`${e} must return \`null\` or a valid event.`;if(Xs(t))return t.then(i=>{if(!Ns(i)&&i!==null)throw Nr(n);return i},i=>{throw Nr(`${e} rejected with ${i}`)});if(!Ns(t)&&t!==null)throw Nr(n);return t}function Ob(t,e,n,i){const{beforeSend:s,beforeSendTransaction:r,beforeSendSpan:o,ignoreSpans:a}=e;let c=n;if(yc(c)&&s)return s(c,i);if(Hp(c)){if(o||a){const l=Rb(c);if(a?.length&&Dd(l,a))return null;if(o){const u=o(l);u?c=Zs(n,Ab(u)):Ld()}if(c.spans){const u=[],d=c.spans;for(const f of d){if(a?.length&&Dd(f,a)){Tv(d,f);continue}if(o){const p=o(f);p?u.push(p):(Ld(),u.push(f))}else u.push(f)}const h=c.spans.length-u.length;h&&t.recordDroppedEvent("before_send","span",h),c.spans=u}}if(r){if(c.spans){const l=c.spans.length;c.sdkProcessingMetadata={...n.sdkProcessingMetadata,spanCountBeforeProcessing:l}}return r(c,i)}}return c}function yc(t){return t.type===void 0}function Hp(t){return t.type==="transaction"}function Db(t){let e=0;return t.name&&(e+=t.name.length*2),e+=8,e+Vp(t.attributes)}function Mb(t){let e=0;return t.message&&(e+=t.message.length*2),e+Vp(t.attributes)}function Vp(t){if(!t)return 0;let e=0;return Object.values(t).forEach(n=>{Array.isArray(n)?e+=n.length*Xd(n[0]):Po(n)?e+=Xd(n):e+=100}),e}function Xd(t){return typeof t=="string"?t.length*2:typeof t=="number"?8:typeof t=="boolean"?4:0}function xb(t){return No(t)&&"__sentry_fetch_url_host__"in t&&typeof t.__sentry_fetch_url_host__=="string"}function Qd(t){return xb(t)?`${t.message} (${t.__sentry_fetch_url_host__})`:t.message}function Fb(t,e){e.debug===!0&&(A?T.enable():Vi(()=>{console.warn("[Sentry] Cannot initialize SDK with `debug` option using a non-debug bundle.")})),gn().update(e.initialScope);const i=new t(e);return Ub(i),i.init(),i}function Ub(t){gn().setClient(t)}function Aa(t){if(!t)return{};const e=t.match(/^(([^:/?#]+):)?(\/\/([^/?#]*))?([^?#]*)(\?([^#]*))?(#(.*))?$/);if(!e)return{};const n=e[6]||"",i=e[8]||"";return{host:e[4],path:e[5],protocol:e[2],search:n,hash:i,relative:e[5]+n+i}}function $b(t){"aggregates"in t?t.attrs?.ip_address===void 0&&(t.attrs={...t.attrs,ip_address:"{{auto}}"}):t.ipAddress===void 0&&(t.ipAddress="{{auto}}")}function Bb(t,e,n=[e],i="npm"){const s=t._metadata||{};s.sdk||(s.sdk={name:`sentry.javascript.${e}`,packages:n.map(r=>({name:`${i}:@sentry/${r}`,version:On})),version:On}),t._metadata=s}const Hb=100;function Fn(t,e){const n=Te(),i=er();if(!n)return;const{beforeBreadcrumb:s=null,maxBreadcrumbs:r=Hb}=n.getOptions();if(r<=0)return;const a={timestamp:Qs(),...t},c=s?Vi(()=>s(a,e)):a;c!==null&&(n.emit&&n.emit("beforeAddBreadcrumb",c,e),i.addBreadcrumb(c,r))}let Zd;const Vb="FunctionToString",eh=new WeakMap,Wb=(()=>({name:Vb,setupOnce(){Zd=Function.prototype.toString;try{Function.prototype.toString=function(...t){const e=bl(this),n=eh.has(Te())&&e!==void 0?e:this;return Zd.apply(n,t)}}catch{}},setup(t){eh.set(t,!0)}})),jb=Wb,qb=[/^Script error\.?$/,/^Javascript error: Script error\.? on line 0$/,/^ResizeObserver loop completed with undelivered notifications.$/,/^Cannot redefine property: googletag$/,/^Can't find variable: gmo$/,/^undefined is not an object \(evaluating 'a\.[A-Z]'\)$/,`can't redefine non-configurable property "solana"`,"vv().getRestrictions is not a function. (In 'vv().getRestrictions(1,a)', 'vv().getRestrictions' is undefined)","Can't find variable: _AutofillCallbackHandler",/^Non-Error promise rejection captured with value: Object Not Found Matching Id:\d+, MethodName:simulateEvent, ParamCount:\d+$/,/^Java exception was raised during method invocation$/],zb="EventFilters",Gb=(t={})=>{let e;return{name:zb,setup(n){const i=n.getOptions();e=th(t,i)},processEvent(n,i,s){if(!e){const r=s.getOptions();e=th(t,r)}return Yb(n,e)?null:n}}},Kb=((t={})=>({...Gb(t),name:"InboundFilters"}));function th(t={},e={}){return{allowUrls:[...t.allowUrls||[],...e.allowUrls||[]],denyUrls:[...t.denyUrls||[],...e.denyUrls||[]],ignoreErrors:[...t.ignoreErrors||[],...e.ignoreErrors||[],...t.disableErrorDefaults?[]:qb],ignoreTransactions:[...t.ignoreTransactions||[],...e.ignoreTransactions||[]]}}function Yb(t,e){if(t.type){if(t.type==="transaction"&&Xb(t,e.ignoreTransactions))return A&&T.warn(`Event dropped due to being matched by \`ignoreTransactions\` option.
Event: ${kn(t)}`),!0}else{if(Jb(t,e.ignoreErrors))return A&&T.warn(`Event dropped due to being matched by \`ignoreErrors\` option.
Event: ${kn(t)}`),!0;if(tE(t))return A&&T.warn(`Event dropped due to not having an error message, error type or stacktrace.
Event: ${kn(t)}`),!0;if(Qb(t,e.denyUrls))return A&&T.warn(`Event dropped due to being matched by \`denyUrls\` option.
Event: ${kn(t)}.
Url: ${jr(t)}`),!0;if(!Zb(t,e.allowUrls))return A&&T.warn(`Event dropped due to not being matched by \`allowUrls\` option.
Event: ${kn(t)}.
Url: ${jr(t)}`),!0}return!1}function Jb(t,e){return e?.length?Up(t).some(n=>Mo(n,e)):!1}function Xb(t,e){if(!e?.length)return!1;const n=t.transaction;return n?Mo(n,e):!1}function Qb(t,e){if(!e?.length)return!1;const n=jr(t);return n?Mo(n,e):!1}function Zb(t,e){if(!e?.length)return!0;const n=jr(t);return n?Mo(n,e):!0}function eE(t=[]){for(let e=t.length-1;e>=0;e--){const n=t[e];if(n&&n.filename!=="<anonymous>"&&n.filename!=="[native code]")return n.filename||null}return null}function jr(t){try{const n=[...t.exception?.values??[]].reverse().find(i=>i.mechanism?.parent_id===void 0&&i.stacktrace?.frames?.length)?.stacktrace?.frames;return n?eE(n):null}catch{return A&&T.error(`Cannot extract url for event ${kn(t)}`),null}}function tE(t){return t.exception?.values?.length?!t.message&&!t.exception.values.some(e=>e.stacktrace||e.type&&e.type!=="Error"||e.value):!1}function nE(t,e,n,i,s,r){if(!s.exception?.values||!r||!an(r.originalException,Error))return;const o=s.exception.values.length>0?s.exception.values[s.exception.values.length-1]:void 0;o&&(s.exception.values=wc(t,e,i,r.originalException,n,s.exception.values,o,0))}function wc(t,e,n,i,s,r,o,a){if(r.length>=n+1)return r;let c=[...r];if(an(i[s],Error)){nh(o,a);const l=t(e,i[s]),u=c.length;ih(l,s,u,a),c=wc(t,e,n,i[s],s,[l,...c],l,u)}return Array.isArray(i.errors)&&i.errors.forEach((l,u)=>{if(an(l,Error)){nh(o,a);const d=t(e,l),h=c.length;ih(d,`errors[${u}]`,h,a),c=wc(t,e,n,l,s,[d,...c],d,h)}}),c}function nh(t,e){t.mechanism={handled:!0,type:"auto.core.linked_errors",...t.mechanism,...t.type==="AggregateError"&&{is_exception_group:!0},exception_id:e}}function ih(t,e,n,i){t.mechanism={handled:!0,...t.mechanism,type:"chained",source:e,exception_id:n,parent_id:i}}function iE(t){const e="console";Jn(e,t),Xn(e,sE)}function sE(){"console"in W&&lw.forEach(function(t){t in W.console&&He(W.console,t,function(e){return Vr[t]=e,function(...n){ot("console",{args:n,level:t}),Vr[t]?.apply(W.console,n)}})})}function rE(t){return t==="warn"?"warning":["fatal","error","warning","log","info","debug"].includes(t)?t:"log"}const oE="Dedupe",aE=(()=>{let t;return{name:oE,processEvent(e){if(e.type)return e;try{if(lE(e,t))return A&&T.warn("Event dropped due to being a duplicate of previously captured event."),null}catch{}return t=e}}}),cE=aE;function lE(t,e){return e?!!(uE(t,e)||dE(t,e)):!1}function uE(t,e){const n=t.message,i=e.message;return!(!n&&!i||n&&!i||!n&&i||n!==i||!jp(t,e)||!Wp(t,e))}function dE(t,e){const n=sh(e),i=sh(t);return!(!n||!i||n.type!==i.type||n.value!==i.value||!jp(t,e)||!Wp(t,e))}function Wp(t,e){let n=md(t),i=md(e);if(!n&&!i)return!0;if(n&&!i||!n&&i||(n=n,i=i,i.length!==n.length))return!1;for(let s=0;s<i.length;s++){const r=i[s],o=n[s];if(r.filename!==o.filename||r.lineno!==o.lineno||r.colno!==o.colno||r.function!==o.function)return!1}return!0}function jp(t,e){let n=t.fingerprint,i=e.fingerprint;if(!n&&!i)return!0;if(n&&!i||!n&&i)return!1;n=n,i=i;try{return n.join("")===i.join("")}catch{return!1}}function sh(t){return t.exception?.values?.[0]}function qp(t){if(t!==void 0)return t>=400&&t<500?"warning":t>=500?"error":void 0}const Ls=W;function hE(){return"history"in Ls&&!!Ls.history}function fE(){if(!("fetch"in Ls))return!1;try{return new Headers,new Request("data:,"),new Response,!0}catch{return!1}}function vc(t){return t&&/^function\s+\w+\(\)\s+\{\s+\[native code\]\s+\}$/.test(t.toString())}function pE(){if(typeof EdgeRuntime=="string")return!0;if(!fE())return!1;if(vc(Ls.fetch))return!0;let t=!1;const e=Ls.document;if(e&&typeof e.createElement=="function")try{const n=e.createElement("iframe");n.hidden=!0,e.head.appendChild(n),n.contentWindow?.fetch&&(t=vc(n.contentWindow.fetch)),e.head.removeChild(n)}catch(n){A&&T.warn("Could not create sandbox iframe for pure fetch check, bailing to window.fetch: ",n)}return t}function gE(t,e){const n="fetch";Jn(n,t),Xn(n,()=>mE(void 0,e))}function mE(t,e=!1){e&&!pE()||He(W,"fetch",function(n){return function(...i){const s=new Error,{method:r,url:o}=_E(i),a={args:i,fetchData:{method:r,url:o},startTimestamp:Ot()*1e3,virtualError:s,headers:yE(i)};return ot("fetch",{...a}),n.apply(W,i).then(async c=>(ot("fetch",{...a,endTimestamp:Ot()*1e3,response:c}),c),c=>{ot("fetch",{...a,endTimestamp:Ot()*1e3,error:c}),No(c)&&c.stack===void 0&&(c.stack=s.stack,cn(c,"framesToPop",1));const u=Te()?.getOptions().enhanceFetchErrorMessages??"always";if(u!==!1&&c instanceof TypeError&&(c.message==="Failed to fetch"||c.message==="Load failed"||c.message==="NetworkError when attempting to fetch resource."))try{const f=new URL(a.fetchData.url).host;u==="always"?c.message=`${c.message} (${f})`:cn(c,"__sentry_fetch_url_host__",f)}catch{}throw c})}})}function Pr(t,e){return!!t&&typeof t=="object"&&!!t[e]}function rh(t){return typeof t=="string"?t:t?Pr(t,"url")?t.url:t.toString?t.toString():"":""}function _E(t){if(t.length===0)return{method:"GET",url:""};if(t.length===2){const[n,i]=t;return{url:rh(n),method:Pr(i,"method")?String(i.method).toUpperCase():fp(n)&&Pr(n,"method")?String(n.method).toUpperCase():"GET"}}const e=t[0];return{url:rh(e),method:Pr(e,"method")?String(e.method).toUpperCase():"GET"}}function yE(t){const[e,n]=t;try{if(typeof n=="object"&&n!==null&&"headers"in n&&n.headers)return new Headers(n.headers);if(fp(e))return new Headers(e.headers)}catch{}}function wE(){return"npm"}const oe=W;let bc=0;function zp(){return bc>0}function vE(){bc++,setTimeout(()=>{bc--})}function Ai(t,e={}){function n(s){return typeof s=="function"}if(!n(t))return t;try{const s=t.__sentry_wrapped__;if(s)return typeof s=="function"?s:t;if(bl(t))return t}catch{return t}const i=function(...s){try{const r=s.map(o=>Ai(o,e));return t.apply(this,r)}catch(r){throw vE(),qw(o=>{o.addEventProcessor(a=>(e.mechanism&&(hc(a,void 0),Ii(a,e.mechanism)),a.extra={...a.extra,arguments:s},a)),ob(r)}),r}};try{for(const s in t)Object.prototype.hasOwnProperty.call(t,s)&&(i[s]=t[s])}catch{}gp(i,t),cn(t,"__sentry_wrapped__",i);try{Object.getOwnPropertyDescriptor(i,"name").configurable&&Object.defineProperty(i,"name",{get(){return t.name}})}catch{}return i}function bE(){const t=vl(),{referrer:e}=oe.document||{},{userAgent:n}=oe.navigator||{},i={...e&&{Referer:e},...n&&{"User-Agent":n}};return{url:t,headers:i}}function Rl(t,e){const n=Al(t,e),i={type:IE(e),value:kE(e)};return n.length&&(i.stacktrace={frames:n}),i.type===void 0&&i.value===""&&(i.value="Unrecoverable error caught"),i}function EE(t,e,n,i){const r=Te()?.getOptions().normalizeDepth,o=LE(e),a={__serialized__:kp(e,r)};if(o)return{exception:{values:[Rl(t,o)]},extra:a};const c={exception:{values:[{type:Lo(e)?e.constructor.name:i?"UnhandledRejection":"Error",value:NE(e,{isUnhandledRejection:i})}]},extra:a};if(n){const l=Al(t,n);l.length&&(c.exception.values[0].stacktrace={frames:l})}return c}function Na(t,e){return{exception:{values:[Rl(t,e)]}}}function Al(t,e){const n=e.stacktrace||e.stack||"",i=TE(e),s=SE(e);try{return t(n,i,s)}catch{}return[]}const CE=/Minified React error #\d+;/i;function TE(t){return t&&CE.test(t.message)?1:0}function SE(t){return typeof t.framesToPop=="number"?t.framesToPop:0}function Gp(t){return typeof WebAssembly<"u"&&typeof WebAssembly.Exception<"u"?t instanceof WebAssembly.Exception:!1}function IE(t){const e=t?.name;return!e&&Gp(t)?t.message&&Array.isArray(t.message)&&t.message.length==2?t.message[0]:"WebAssembly.Exception":e}function kE(t){const e=t?.message;return Gp(t)?Array.isArray(t.message)&&t.message.length==2?t.message[1]:"wasm exception":e?e.error&&typeof e.error.message=="string"?Qd(e.error):Qd(t):"No error message"}function RE(t,e,n,i){const s=n?.syntheticException||void 0,r=Nl(t,e,s,i);return Ii(r),r.level="error",n?.event_id&&(r.event_id=n.event_id),xo(r)}function AE(t,e,n="info",i,s){const r=i?.syntheticException||void 0,o=Ec(t,e,r,s);return o.level=n,i?.event_id&&(o.event_id=i.event_id),xo(o)}function Nl(t,e,n,i,s){let r;if(dp(e)&&e.error)return Na(t,e.error);if(yd(e)||Ew(e)){const o=e;if("stack"in e)r=Na(t,e);else{const a=o.name||(yd(o)?"DOMError":"DOMException"),c=o.message?`${a}: ${o.message}`:a;r=Ec(t,c,n,i),hc(r,c)}return"code"in o&&(r.tags={...r.tags,"DOMException.code":`${o.code}`}),r}return No(e)?Na(t,e):Ns(e)||Lo(e)?(r=EE(t,e,n,s),Ii(r,{synthetic:!0}),r):(r=Ec(t,e,n,i),hc(r,`${e}`),Ii(r,{synthetic:!0}),r)}function Ec(t,e,n,i){const s={};if(i&&n){const r=Al(t,n);r.length&&(s.exception={values:[{value:e,stacktrace:{frames:r}}]}),Ii(s,{synthetic:!0})}if(yl(e)){const{__sentry_template_string__:r,__sentry_template_values__:o}=e;return s.logentry={message:r,params:o},s}return s.message=e,s}function NE(t,{isUnhandledRejection:e}){const n=Aw(t),i=e?"promise rejection":"exception";return dp(t)?`Event \`ErrorEvent\` captured as ${i} with message \`${t.message}\``:Lo(t)?`Event \`${PE(t)}\` (type=${t.type}) captured as ${i}`:`Object captured as ${i} with keys: ${n}`}function PE(t){try{const e=Object.getPrototypeOf(t);return e?e.constructor.name:void 0}catch{}}function LE(t){for(const e in t)if(Object.prototype.hasOwnProperty.call(t,e)){const n=t[e];if(n instanceof Error)return n}}class OE extends Pb{constructor(e){const n=DE(e),i=oe.SENTRY_SDK_SOURCE||wE();Bb(n,"browser",["browser"],i),n._metadata?.sdk&&(n._metadata.sdk.settings={infer_ip:n.sendDefaultPii?"auto":"never",...n._metadata.sdk.settings}),super(n);const{sendDefaultPii:s,sendClientReports:r,enableLogs:o,_experiments:a,enableMetrics:c}=this._options,l=c??a?.enableMetrics??!0;oe.document&&(r||o||l)&&oe.document.addEventListener("visibilitychange",()=>{oe.document.visibilityState==="hidden"&&(r&&this._flushOutcomes(),o&&Op(this),l&&Mp(this))}),s&&this.on("beforeSendSession",$b)}eventFromException(e,n){return RE(this._options.stackParser,e,n,this._options.attachStacktrace)}eventFromMessage(e,n="info",i){return AE(this._options.stackParser,e,n,i,this._options.attachStacktrace)}_prepareEvent(e,n,i,s){return e.platform=e.platform||"javascript",super._prepareEvent(e,n,i,s)}}function DE(t){return{release:typeof __SENTRY_RELEASE__=="string"?__SENTRY_RELEASE__:oe.SENTRY_RELEASE?.id,sendClientReports:!0,parentSpanIsAlwaysRootSpan:!0,...t}}const ME=typeof __SENTRY_DEBUG__>"u"||__SENTRY_DEBUG__,Ie=W,xE=1e3;let oh,Cc,Tc;function FE(t){Jn("dom",t),Xn("dom",UE)}function UE(){if(!Ie.document)return;const t=ot.bind(null,"dom"),e=ah(t,!0);Ie.document.addEventListener("click",e,!1),Ie.document.addEventListener("keypress",e,!1),["EventTarget","Node"].forEach(n=>{const s=Ie[n]?.prototype;s?.hasOwnProperty?.("addEventListener")&&(He(s,"addEventListener",function(r){return function(o,a,c){if(o==="click"||o=="keypress")try{const l=this.__sentry_instrumentation_handlers__=this.__sentry_instrumentation_handlers__||{},u=l[o]=l[o]||{refCount:0};if(!u.handler){const d=ah(t);u.handler=d,r.call(this,o,d,c)}u.refCount++}catch{}return r.call(this,o,a,c)}}),He(s,"removeEventListener",function(r){return function(o,a,c){if(o==="click"||o=="keypress")try{const l=this.__sentry_instrumentation_handlers__||{},u=l[o];u&&(u.refCount--,u.refCount<=0&&(r.call(this,o,u.handler,c),u.handler=void 0,delete l[o]),Object.keys(l).length===0&&delete this.__sentry_instrumentation_handlers__)}catch{}return r.call(this,o,a,c)}}))})}function $E(t){if(t.type!==Cc)return!1;try{if(!t.target||t.target._sentryId!==Tc)return!1}catch{}return!0}function BE(t,e){return t!=="keypress"?!1:e?.tagName?!(e.tagName==="INPUT"||e.tagName==="TEXTAREA"||e.isContentEditable):!0}function ah(t,e=!1){return n=>{if(!n||n._sentryCaptured)return;const i=HE(n);if(BE(n.type,i))return;cn(n,"_sentryCaptured",!0),i&&!i._sentryId&&cn(i,"_sentryId",ze());const s=n.type==="keypress"?"input":n.type;$E(n)||(t({event:n,name:s,global:e}),Cc=n.type,Tc=i?i._sentryId:void 0),clearTimeout(oh),oh=Ie.setTimeout(()=>{Tc=void 0,Cc=void 0},xE)}}function HE(t){try{return t.target}catch{return null}}let mr;function Kp(t){const e="history";Jn(e,t),Xn(e,VE)}function VE(){if(Ie.addEventListener("popstate",()=>{const e=Ie.location.href,n=mr;if(mr=e,n===e)return;ot("history",{from:n,to:e})}),!hE())return;function t(e){return function(...n){const i=n.length>2?n[2]:void 0;if(i){const s=mr,r=WE(String(i));if(mr=r,s===r)return e.apply(this,n);ot("history",{from:s,to:r})}return e.apply(this,n)}}He(Ie.history,"pushState",t),He(Ie.history,"replaceState",t)}function WE(t){try{return new URL(t,Ie.location.origin).toString()}catch{return t}}const Lr={};function jE(t){const e=Lr[t];if(e)return e;let n=Ie[t];if(vc(n))return Lr[t]=n.bind(Ie);const i=Ie.document;if(i&&typeof i.createElement=="function")try{const s=i.createElement("iframe");s.hidden=!0,i.head.appendChild(s);const r=s.contentWindow;r?.[t]&&(n=r[t]),i.head.removeChild(s)}catch(s){ME&&T.warn(`Could not create sandbox iframe for ${t} check, bailing to window.${t}: `,s)}return n&&(Lr[t]=n.bind(Ie))}function qE(t){Lr[t]=void 0}const ps="__sentry_xhr_v3__";function zE(t){Jn("xhr",t),Xn("xhr",GE)}function GE(){if(!Ie.XMLHttpRequest)return;const t=XMLHttpRequest.prototype;t.open=new Proxy(t.open,{apply(e,n,i){const s=new Error,r=Ot()*1e3,o=Lt(i[0])?i[0].toUpperCase():void 0,a=KE(i[1]);if(!o||!a)return e.apply(n,i);n[ps]={method:o,url:a,request_headers:{}},o==="POST"&&a.match(/sentry_key/)&&(n.__sentry_own_request__=!0);const c=()=>{const l=n[ps];if(l&&n.readyState===4){try{l.status_code=n.status}catch{}const u={endTimestamp:Ot()*1e3,startTimestamp:r,xhr:n,virtualError:s};ot("xhr",u)}};return"onreadystatechange"in n&&typeof n.onreadystatechange=="function"?n.onreadystatechange=new Proxy(n.onreadystatechange,{apply(l,u,d){return c(),l.apply(u,d)}}):n.addEventListener("readystatechange",c),n.setRequestHeader=new Proxy(n.setRequestHeader,{apply(l,u,d){const[h,f]=d,p=u[ps];return p&&Lt(h)&&Lt(f)&&(p.request_headers[h.toLowerCase()]=f),l.apply(u,d)}}),e.apply(n,i)}}),t.send=new Proxy(t.send,{apply(e,n,i){const s=n[ps];if(!s)return e.apply(n,i);i[0]!==void 0&&(s.body=i[0]);const r={startTimestamp:Ot()*1e3,xhr:n};return ot("xhr",r),e.apply(n,i)}})}function KE(t){if(Lt(t))return t;try{return t.toString()}catch{}}const YE=40;function JE(t,e=jE("fetch")){let n=0,i=0;async function s(r){const o=r.body.length;n+=o,i++;const a={body:r.body,method:"POST",referrerPolicy:"strict-origin",headers:t.headers,keepalive:n<=6e4&&i<15,...t.fetchOptions};try{const c=await e(t.url,a);return{statusCode:c.status,headers:{"x-sentry-rate-limits":c.headers.get("X-Sentry-Rate-Limits"),"retry-after":c.headers.get("Retry-After")}}}catch(c){throw qE("fetch"),c}finally{n-=o,i--}}return Ib(t,s,kl(t.bufferSize||YE))}const Fo=typeof __SENTRY_DEBUG__>"u"||__SENTRY_DEBUG__,XE=30,QE=50;function Sc(t,e,n,i){const s={filename:t,function:e==="<anonymous>"?xn:e,in_app:!0};return n!==void 0&&(s.lineno=n),i!==void 0&&(s.colno=i),s}const ZE=/^\s*at (\S+?)(?::(\d+))(?::(\d+))\s*$/i,eC=/^\s*at (?:(.+?\)(?: \[.+\])?|.*?) ?\((?:address at )?)?(?:async )?((?:<anonymous>|[-a-z]+:|.*bundle|\/)?.*?)(?::(\d+))?(?::(\d+))?\)?\s*$/i,tC=/\((\S*)(?::(\d+))(?::(\d+))\)/,nC=/at (.+?) ?\(data:(.+?),/,iC=t=>{const e=t.match(nC);if(e)return{filename:`<data:${e[2]}>`,function:e[1]};const n=ZE.exec(t);if(n){const[,s,r,o]=n;return Sc(s,xn,+r,+o)}const i=eC.exec(t);if(i){if(i[2]&&i[2].indexOf("eval")===0){const a=tC.exec(i[2]);a&&(i[2]=a[1],i[3]=a[2],i[4]=a[3])}const[r,o]=Yp(i[1]||xn,i[2]);return Sc(o,r,i[3]?+i[3]:void 0,i[4]?+i[4]:void 0)}},sC=[XE,iC],rC=/^\s*(.*?)(?:\((.*?)\))?(?:^|@)?((?:[-a-z]+)?:\/.*?|\[native code\]|[^@]*(?:bundle|\d+\.js)|\/[\w\-. /=]+)(?::(\d+))?(?::(\d+))?\s*$/i,oC=/(\S+) line (\d+)(?: > eval line \d+)* > eval/i,aC=t=>{const e=rC.exec(t);if(e){if(e[3]&&e[3].indexOf(" > eval")>-1){const r=oC.exec(e[3]);r&&(e[1]=e[1]||"eval",e[3]=r[1],e[4]=r[2],e[5]="")}let i=e[3],s=e[1]||xn;return[s,i]=Yp(s,i),Sc(i,s,e[4]?+e[4]:void 0,e[5]?+e[5]:void 0)}},cC=[QE,aC],lC=[sC,cC],uC=cp(...lC),Yp=(t,e)=>{const n=t.indexOf("safari-extension")!==-1,i=t.indexOf("safari-web-extension")!==-1;return n||i?[t.indexOf("@")!==-1?t.split("@")[0]:xn,n?`safari-extension:${e}`:`safari-web-extension:${e}`]:[t,e]},_r=1024,dC="Breadcrumbs",hC=((t={})=>{const e={console:!0,dom:!0,fetch:!0,history:!0,sentry:!0,xhr:!0,...t};return{name:dC,setup(n){e.console&&iE(mC(n)),e.dom&&FE(gC(n,e.dom)),e.xhr&&zE(_C(n)),e.fetch&&gE(yC(n)),e.history&&Kp(wC(n)),e.sentry&&n.on("beforeSendEvent",pC(n))}}}),fC=hC;function pC(t){return function(n){Te()===t&&Fn({category:`sentry.${n.type==="transaction"?"transaction":"event"}`,event_id:n.event_id,level:n.level,message:kn(n)},{event:n})}}function gC(t,e){return function(i){if(Te()!==t)return;let s,r,o=typeof e=="object"?e.serializeAttribute:void 0,a=typeof e=="object"&&typeof e.maxStringLength=="number"?e.maxStringLength:void 0;a&&a>_r&&(Fo&&T.warn(`\`dom.maxStringLength\` cannot exceed ${_r}, but a value of ${a} was configured. Sentry will use ${_r} instead.`),a=_r),typeof o=="string"&&(o=[o]);try{const l=i.event,u=vC(l)?l.target:l;s=pp(u,{keyAttrs:o,maxStringLength:a}),r=Rw(u)}catch{s="<unknown>"}if(s.length===0)return;const c={category:`ui.${i.name}`,message:s};r&&(c.data={"ui.component_name":r}),Fn(c,{event:i.event,name:i.name,global:i.global})}}function mC(t){return function(n){if(Te()!==t)return;const i={category:"console",data:{arguments:n.args,logger:"console"},level:rE(n.level),message:bd(n.args," ")};if(n.level==="assert")if(n.args[0]===!1)i.message=`Assertion failed: ${bd(n.args.slice(1)," ")||"console.assert"}`,i.data.arguments=n.args.slice(1);else return;Fn(i,{input:n.args,level:n.level})}}function _C(t){return function(n){if(Te()!==t)return;const{startTimestamp:i,endTimestamp:s}=n,r=n.xhr[ps];if(!i||!s||!r)return;const{method:o,url:a,status_code:c,body:l}=r,u={method:o,url:a,status_code:c},d={xhr:n.xhr,input:l,startTimestamp:i,endTimestamp:s},h={category:"xhr",data:u,type:"http",level:qp(c)};t.emit("beforeOutgoingRequestBreadcrumb",h,d),Fn(h,d)}}function yC(t){return function(n){if(Te()!==t)return;const{startTimestamp:i,endTimestamp:s}=n;if(s&&!(n.fetchData.url.match(/sentry_key/)&&n.fetchData.method==="POST"))if(n.fetchData.method,n.fetchData.url,n.error){const r=n.fetchData,o={data:n.error,input:n.args,startTimestamp:i,endTimestamp:s},a={category:"fetch",data:r,level:"error",type:"http"};t.emit("beforeOutgoingRequestBreadcrumb",a,o),Fn(a,o)}else{const r=n.response,o={...n.fetchData,status_code:r?.status};n.fetchData.request_body_size,n.fetchData.response_body_size,r?.status;const a={input:n.args,response:r,startTimestamp:i,endTimestamp:s},c={category:"fetch",data:o,type:"http",level:qp(o.status_code)};t.emit("beforeOutgoingRequestBreadcrumb",c,a),Fn(c,a)}}}function wC(t){return function(n){if(Te()!==t)return;let i=n.from,s=n.to;const r=Aa(oe.location.href);let o=i?Aa(i):void 0;const a=Aa(s);o?.path||(o=r),r.protocol===a.protocol&&r.host===a.host&&(s=a.relative),r.protocol===o.protocol&&r.host===o.host&&(i=o.relative),Fn({category:"navigation",data:{from:i,to:s}})}}function vC(t){return!!t&&!!t.target}const bC=["EventTarget","Window","Node","ApplicationCache","AudioTrackList","BroadcastChannel","ChannelMergerNode","CryptoOperation","EventSource","FileReader","HTMLUnknownElement","IDBDatabase","IDBRequest","IDBTransaction","KeyOperation","MediaController","MessagePort","ModalWindow","Notification","SVGElementInstance","Screen","SharedWorker","TextTrack","TextTrackCue","TextTrackList","WebSocket","WebSocketWorker","Worker","XMLHttpRequest","XMLHttpRequestEventTarget","XMLHttpRequestUpload"],EC="BrowserApiErrors",CC=((t={})=>{const e={XMLHttpRequest:!0,eventTarget:!0,requestAnimationFrame:!0,setInterval:!0,setTimeout:!0,unregisterOriginalCallbacks:!1,...t};return{name:EC,setupOnce(){e.setTimeout&&He(oe,"setTimeout",ch),e.setInterval&&He(oe,"setInterval",ch),e.requestAnimationFrame&&He(oe,"requestAnimationFrame",SC),e.XMLHttpRequest&&"XMLHttpRequest"in oe&&He(XMLHttpRequest.prototype,"send",IC);const n=e.eventTarget;n&&(Array.isArray(n)?n:bC).forEach(s=>kC(s,e))}}}),TC=CC;function ch(t){return function(...e){const n=e[0];return e[0]=Ai(n,{mechanism:{handled:!1,type:`auto.browser.browserapierrors.${on(t)}`}}),t.apply(this,e)}}function SC(t){return function(e){return t.apply(this,[Ai(e,{mechanism:{data:{handler:on(t)},handled:!1,type:"auto.browser.browserapierrors.requestAnimationFrame"}})])}}function IC(t){return function(...e){const n=this;return["onload","onerror","onprogress","onreadystatechange"].forEach(s=>{s in n&&typeof n[s]=="function"&&He(n,s,function(r){const o={mechanism:{data:{handler:on(r)},handled:!1,type:`auto.browser.browserapierrors.xhr.${s}`}},a=bl(r);return a&&(o.mechanism.data.handler=on(a)),Ai(r,o)})}),t.apply(this,e)}}function kC(t,e){const i=oe[t]?.prototype;i?.hasOwnProperty?.("addEventListener")&&(He(i,"addEventListener",function(s){return function(r,o,a){try{RC(o)&&(o.handleEvent=Ai(o.handleEvent,{mechanism:{data:{handler:on(o),target:t},handled:!1,type:"auto.browser.browserapierrors.handleEvent"}}))}catch{}return e.unregisterOriginalCallbacks&&AC(this,r,o),s.apply(this,[r,Ai(o,{mechanism:{data:{handler:on(o),target:t},handled:!1,type:"auto.browser.browserapierrors.addEventListener"}}),a])}}),He(i,"removeEventListener",function(s){return function(r,o,a){try{const c=o.__sentry_wrapped__;c&&s.call(this,r,c,a)}catch{}return s.call(this,r,o,a)}}))}function RC(t){return typeof t.handleEvent=="function"}function AC(t,e,n){t&&typeof t=="object"&&"removeEventListener"in t&&typeof t.removeEventListener=="function"&&t.removeEventListener(e,n)}const NC=()=>({name:"BrowserSession",setupOnce(){if(typeof oe.document>"u"){Fo&&T.warn("Using the `browserSessionIntegration` in non-browser environments is not supported.");return}Hd({ignoreDuration:!0}),Vd(),Kp(({from:t,to:e})=>{t!==void 0&&t!==e&&(Hd({ignoreDuration:!0}),Vd())})}}),PC="GlobalHandlers",LC=((t={})=>{const e={onerror:!0,onunhandledrejection:!0,...t};return{name:PC,setupOnce(){Error.stackTraceLimit=50},setup(n){e.onerror&&(DC(n),lh("onerror")),e.onunhandledrejection&&(MC(n),lh("onunhandledrejection"))}}}),OC=LC;function DC(t){yw(e=>{const{stackParser:n,attachStacktrace:i}=Jp();if(Te()!==t||zp())return;const{msg:s,url:r,line:o,column:a,error:c}=e,l=UC(Nl(n,c||s,void 0,i,!1),r,o,a);l.level="error",Ap(l,{originalException:c,mechanism:{handled:!1,type:"auto.browser.global_handlers.onerror"}})})}function MC(t){vw(e=>{const{stackParser:n,attachStacktrace:i}=Jp();if(Te()!==t||zp())return;const s=xC(e),r=Po(s)?FC(s):Nl(n,s,void 0,i,!0);r.level="error",Ap(r,{originalException:s,mechanism:{handled:!1,type:"auto.browser.global_handlers.onunhandledrejection"}})})}function xC(t){if(Po(t))return t;try{if("reason"in t)return t.reason;if("detail"in t&&"reason"in t.detail)return t.detail.reason}catch{}return t}function FC(t){return{exception:{values:[{type:"UnhandledRejection",value:`Non-Error promise rejection captured with value: ${String(t)}`}]}}}function UC(t,e,n,i){const s=t.exception=t.exception||{},r=s.values=s.values||[],o=r[0]=r[0]||{},a=o.stacktrace=o.stacktrace||{},c=a.frames=a.frames||[],l=i,u=n,d=$C(e)??vl();return c.length===0&&c.push({colno:l,filename:d,function:xn,in_app:!0,lineno:u}),t}function lh(t){Fo&&T.log(`Global Handler attached: ${t}`)}function Jp(){return Te()?.getOptions()||{stackParser:()=>[],attachStacktrace:!1}}function $C(t){if(!(!Lt(t)||t.length===0)){if(t.startsWith("data:")){const e=t.match(/^data:([^;]+)/),n=e?e[1]:"text/javascript",i=t.includes("base64,");return`<data:${n}${i?",base64":""}>`}return t}}const BC=()=>({name:"HttpContext",preprocessEvent(t){if(!oe.navigator&&!oe.location&&!oe.document)return;const e=bE(),n={...e.headers,...t.request?.headers};t.request={...e,...t.request,headers:n}}}),HC="cause",VC=5,WC="LinkedErrors",jC=((t={})=>{const e=t.limit||VC,n=t.key||HC;return{name:WC,preprocessEvent(i,s,r){const o=r.getOptions();nE(Rl,o.stackParser,n,e,i,s)}}}),qC=jC;function zC(){return GC()?(Fo&&Vi(()=>{console.error("[Sentry] You cannot use Sentry.init() in a browser extension, see: https://docs.sentry.io/platforms/javascript/best-practices/browser-extensions/")}),!0):!1}function GC(){if(typeof oe.window>"u")return!1;const t=oe;if(t.nw||!(t.chrome||t.browser)?.runtime?.id)return!1;const n=vl(),i=["chrome-extension","moz-extension","ms-browser-extension","safari-web-extension"];return!(oe===oe.top&&i.some(r=>n.startsWith(`${r}://`)))}function KC(t){return[Kb(),jb(),TC(),fC(),OC(),qC(),cE(),BC(),NC()]}function YC(t={}){const e=!t.skipBrowserExtensionCheck&&zC();let n=t.defaultIntegrations==null?KC():t.defaultIntegrations;const i={...t,enabled:e?!1:t.enabled,stackParser:mw(t.stackParser||uC),integrations:fb({integrations:t.integrations,defaultIntegrations:n}),transport:t.transport||JE};return Fb(OE,i)}const JC="https://adc1b5518c6a55273a1398d1b8b9cd3e@o4510415124496384.ingest.de.sentry.io/4510415129083984";YC({dsn:JC,sendDefaultPii:!0});/**
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
 */const XC=()=>{};var uh={};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Xp={NODE_ADMIN:!1,SDK_VERSION:"${JSCORE_VERSION}"};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const g=function(t,e){if(!t)throw qi(e)},qi=function(t){return new Error("Firebase Database ("+Xp.SDK_VERSION+") INTERNAL ASSERT FAILED: "+t)};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Qp=function(t){const e=[];let n=0;for(let i=0;i<t.length;i++){let s=t.charCodeAt(i);s<128?e[n++]=s:s<2048?(e[n++]=s>>6|192,e[n++]=s&63|128):(s&64512)===55296&&i+1<t.length&&(t.charCodeAt(i+1)&64512)===56320?(s=65536+((s&1023)<<10)+(t.charCodeAt(++i)&1023),e[n++]=s>>18|240,e[n++]=s>>12&63|128,e[n++]=s>>6&63|128,e[n++]=s&63|128):(e[n++]=s>>12|224,e[n++]=s>>6&63|128,e[n++]=s&63|128)}return e},QC=function(t){const e=[];let n=0,i=0;for(;n<t.length;){const s=t[n++];if(s<128)e[i++]=String.fromCharCode(s);else if(s>191&&s<224){const r=t[n++];e[i++]=String.fromCharCode((s&31)<<6|r&63)}else if(s>239&&s<365){const r=t[n++],o=t[n++],a=t[n++],c=((s&7)<<18|(r&63)<<12|(o&63)<<6|a&63)-65536;e[i++]=String.fromCharCode(55296+(c>>10)),e[i++]=String.fromCharCode(56320+(c&1023))}else{const r=t[n++],o=t[n++];e[i++]=String.fromCharCode((s&15)<<12|(r&63)<<6|o&63)}}return e.join("")},Uo={byteToCharMap_:null,charToByteMap_:null,byteToCharMapWebSafe_:null,charToByteMapWebSafe_:null,ENCODED_VALS_BASE:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",get ENCODED_VALS(){return this.ENCODED_VALS_BASE+"+/="},get ENCODED_VALS_WEBSAFE(){return this.ENCODED_VALS_BASE+"-_."},HAS_NATIVE_SUPPORT:typeof atob=="function",encodeByteArray(t,e){if(!Array.isArray(t))throw Error("encodeByteArray takes an array as a parameter");this.init_();const n=e?this.byteToCharMapWebSafe_:this.byteToCharMap_,i=[];for(let s=0;s<t.length;s+=3){const r=t[s],o=s+1<t.length,a=o?t[s+1]:0,c=s+2<t.length,l=c?t[s+2]:0,u=r>>2,d=(r&3)<<4|a>>4;let h=(a&15)<<2|l>>6,f=l&63;c||(f=64,o||(h=64)),i.push(n[u],n[d],n[h],n[f])}return i.join("")},encodeString(t,e){return this.HAS_NATIVE_SUPPORT&&!e?btoa(t):this.encodeByteArray(Qp(t),e)},decodeString(t,e){return this.HAS_NATIVE_SUPPORT&&!e?atob(t):QC(this.decodeStringToByteArray(t,e))},decodeStringToByteArray(t,e){this.init_();const n=e?this.charToByteMapWebSafe_:this.charToByteMap_,i=[];for(let s=0;s<t.length;){const r=n[t.charAt(s++)],a=s<t.length?n[t.charAt(s)]:0;++s;const l=s<t.length?n[t.charAt(s)]:64;++s;const d=s<t.length?n[t.charAt(s)]:64;if(++s,r==null||a==null||l==null||d==null)throw new ZC;const h=r<<2|a>>4;if(i.push(h),l!==64){const f=a<<4&240|l>>2;if(i.push(f),d!==64){const p=l<<6&192|d;i.push(p)}}}return i},init_(){if(!this.byteToCharMap_){this.byteToCharMap_={},this.charToByteMap_={},this.byteToCharMapWebSafe_={},this.charToByteMapWebSafe_={};for(let t=0;t<this.ENCODED_VALS.length;t++)this.byteToCharMap_[t]=this.ENCODED_VALS.charAt(t),this.charToByteMap_[this.byteToCharMap_[t]]=t,this.byteToCharMapWebSafe_[t]=this.ENCODED_VALS_WEBSAFE.charAt(t),this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[t]]=t,t>=this.ENCODED_VALS_BASE.length&&(this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(t)]=t,this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(t)]=t)}}};class ZC extends Error{constructor(){super(...arguments),this.name="DecodeBase64StringError"}}const Zp=function(t){const e=Qp(t);return Uo.encodeByteArray(e,!0)},qr=function(t){return Zp(t).replace(/\./g,"")},zr=function(t){try{return Uo.decodeString(t,!0)}catch(e){console.error("base64Decode failed: ",e)}return null};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function eT(t){return eg(void 0,t)}function eg(t,e){if(!(e instanceof Object))return e;switch(e.constructor){case Date:const n=e;return new Date(n.getTime());case Object:t===void 0&&(t={});break;case Array:t=[];break;default:return e}for(const n in e)!e.hasOwnProperty(n)||!tT(n)||(t[n]=eg(t[n],e[n]));return t}function tT(t){return t!=="__proto__"}/**
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
 */function tg(){if(typeof self<"u")return self;if(typeof window<"u")return window;if(typeof global<"u")return global;throw new Error("Unable to locate global object.")}/**
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
 */const nT=()=>tg().__FIREBASE_DEFAULTS__,iT=()=>{if(typeof process>"u"||typeof uh>"u")return;const t=uh.__FIREBASE_DEFAULTS__;if(t)return JSON.parse(t)},sT=()=>{if(typeof document>"u")return;let t;try{t=document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/)}catch{return}const e=t&&zr(t[1]);return e&&JSON.parse(e)},Pl=()=>{try{return XC()||nT()||iT()||sT()}catch(t){console.info(`Unable to get __FIREBASE_DEFAULTS__ due to: ${t}`);return}},ng=t=>Pl()?.emulatorHosts?.[t],rT=t=>{const e=ng(t);if(!e)return;const n=e.lastIndexOf(":");if(n<=0||n+1===e.length)throw new Error(`Invalid host ${e} with no separate hostname and port!`);const i=parseInt(e.substring(n+1),10);return e[0]==="["?[e.substring(1,n-1),i]:[e.substring(0,n),i]},ig=()=>Pl()?.config,sg=t=>Pl()?.[`_${t}`];/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Le{constructor(){this.reject=()=>{},this.resolve=()=>{},this.promise=new Promise((e,n)=>{this.resolve=e,this.reject=n})}wrapCallback(e){return(n,i)=>{n?this.reject(n):this.resolve(i),typeof e=="function"&&(this.promise.catch(()=>{}),e.length===1?e(n):e(n,i))}}}/**
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
 */function zi(t){try{return(t.startsWith("http://")||t.startsWith("https://")?new URL(t).hostname:t).endsWith(".cloudworkstations.dev")}catch{return!1}}async function rg(t){return(await fetch(t,{credentials:"include"})).ok}/**
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
 */function oT(t,e){if(t.uid)throw new Error('The "uid" field is no longer supported by mockUserToken. Please use "sub" instead for Firebase Auth User ID.');const n={alg:"none",type:"JWT"},i=e||"demo-project",s=t.iat||0,r=t.sub||t.user_id;if(!r)throw new Error("mockUserToken must contain 'sub' or 'user_id' field!");const o={iss:`https://securetoken.google.com/${i}`,aud:i,iat:s,exp:s+3600,auth_time:s,sub:r,user_id:r,firebase:{sign_in_provider:"custom",identities:{}},...t};return[qr(JSON.stringify(n)),qr(JSON.stringify(o)),""].join(".")}const ms={};function aT(){const t={prod:[],emulator:[]};for(const e of Object.keys(ms))ms[e]?t.emulator.push(e):t.prod.push(e);return t}function cT(t){let e=document.getElementById(t),n=!1;return e||(e=document.createElement("div"),e.setAttribute("id",t),n=!0),{created:n,element:e}}let dh=!1;function og(t,e){if(typeof window>"u"||typeof document>"u"||!zi(window.location.host)||ms[t]===e||ms[t]||dh)return;ms[t]=e;function n(h){return`__firebase__banner__${h}`}const i="__firebase__banner",r=aT().prod.length>0;function o(){const h=document.getElementById(i);h&&h.remove()}function a(h){h.style.display="flex",h.style.background="#7faaf0",h.style.position="fixed",h.style.bottom="5px",h.style.left="5px",h.style.padding=".5em",h.style.borderRadius="5px",h.style.alignItems="center"}function c(h,f){h.setAttribute("width","24"),h.setAttribute("id",f),h.setAttribute("height","24"),h.setAttribute("viewBox","0 0 24 24"),h.setAttribute("fill","none"),h.style.marginLeft="-6px"}function l(){const h=document.createElement("span");return h.style.cursor="pointer",h.style.marginLeft="16px",h.style.fontSize="24px",h.innerHTML=" &times;",h.onclick=()=>{dh=!0,o()},h}function u(h,f){h.setAttribute("id",f),h.innerText="Learn more",h.href="https://firebase.google.com/docs/studio/preview-apps#preview-backend",h.setAttribute("target","__blank"),h.style.paddingLeft="5px",h.style.textDecoration="underline"}function d(){const h=cT(i),f=n("text"),p=document.getElementById(f)||document.createElement("span"),_=n("learnmore"),m=document.getElementById(_)||document.createElement("a"),R=n("preprendIcon"),M=document.getElementById(R)||document.createElementNS("http://www.w3.org/2000/svg","svg");if(h.created){const $=h.element;a($),u(m,_);const S=l();c(M,R),$.append(M,p,m,S),document.body.appendChild($)}r?(p.innerText="Preview backend disconnected.",M.innerHTML=`<g clip-path="url(#clip0_6013_33858)">
<path d="M4.8 17.6L12 5.6L19.2 17.6H4.8ZM6.91667 16.4H17.0833L12 7.93333L6.91667 16.4ZM12 15.6C12.1667 15.6 12.3056 15.5444 12.4167 15.4333C12.5389 15.3111 12.6 15.1667 12.6 15C12.6 14.8333 12.5389 14.6944 12.4167 14.5833C12.3056 14.4611 12.1667 14.4 12 14.4C11.8333 14.4 11.6889 14.4611 11.5667 14.5833C11.4556 14.6944 11.4 14.8333 11.4 15C11.4 15.1667 11.4556 15.3111 11.5667 15.4333C11.6889 15.5444 11.8333 15.6 12 15.6ZM11.4 13.6H12.6V10.4H11.4V13.6Z" fill="#212121"/>
</g>
<defs>
<clipPath id="clip0_6013_33858">
<rect width="24" height="24" fill="white"/>
</clipPath>
</defs>`):(M.innerHTML=`<g clip-path="url(#clip0_6083_34804)">
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
 */function Ne(){return typeof navigator<"u"&&typeof navigator.userAgent=="string"?navigator.userAgent:""}function Ll(){return typeof window<"u"&&!!(window.cordova||window.phonegap||window.PhoneGap)&&/ios|iphone|ipod|ipad|android|blackberry|iemobile/i.test(Ne())}function lT(){return typeof navigator<"u"&&navigator.userAgent==="Cloudflare-Workers"}function uT(){const t=typeof chrome=="object"?chrome.runtime:typeof browser=="object"?browser.runtime:void 0;return typeof t=="object"&&t.id!==void 0}function ag(){return typeof navigator=="object"&&navigator.product==="ReactNative"}function dT(){const t=Ne();return t.indexOf("MSIE ")>=0||t.indexOf("Trident/")>=0}function hT(){return Xp.NODE_ADMIN===!0}function $o(){try{return typeof indexedDB=="object"}catch{return!1}}function cg(){return new Promise((t,e)=>{try{let n=!0;const i="validate-browser-context-for-indexeddb-analytics-module",s=self.indexedDB.open(i);s.onsuccess=()=>{s.result.close(),n||self.indexedDB.deleteDatabase(i),t(!0)},s.onupgradeneeded=()=>{n=!1},s.onerror=()=>{e(s.error?.message||"")}}catch(n){e(n)}})}function fT(){return!(typeof navigator>"u"||!navigator.cookieEnabled)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const pT="FirebaseError";class Vt extends Error{constructor(e,n,i){super(n),this.code=e,this.customData=i,this.name=pT,Object.setPrototypeOf(this,Vt.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,mn.prototype.create)}}class mn{constructor(e,n,i){this.service=e,this.serviceName=n,this.errors=i}create(e,...n){const i=n[0]||{},s=`${this.service}/${e}`,r=this.errors[e],o=r?gT(r,i):"Error",a=`${this.serviceName}: ${o} (${s}).`;return new Vt(s,a,i)}}function gT(t,e){return t.replace(mT,(n,i)=>{const s=e[i];return s!=null?String(s):`<${i}?>`})}const mT=/\{\$([^}]+)}/g;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Os(t){return JSON.parse(t)}function le(t){return JSON.stringify(t)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const lg=function(t){let e={},n={},i={},s="";try{const r=t.split(".");e=Os(zr(r[0])||""),n=Os(zr(r[1])||""),s=r[2],i=n.d||{},delete n.d}catch{}return{header:e,claims:n,data:i,signature:s}},_T=function(t){const e=lg(t),n=e.claims;return!!n&&typeof n=="object"&&n.hasOwnProperty("iat")},yT=function(t){const e=lg(t).claims;return typeof e=="object"&&e.admin===!0};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function vt(t,e){return Object.prototype.hasOwnProperty.call(t,e)}function Ni(t,e){if(Object.prototype.hasOwnProperty.call(t,e))return t[e]}function Gr(t){for(const e in t)if(Object.prototype.hasOwnProperty.call(t,e))return!1;return!0}function Kr(t,e,n){const i={};for(const s in t)Object.prototype.hasOwnProperty.call(t,s)&&(i[s]=e.call(n,t[s],s,t));return i}function Un(t,e){if(t===e)return!0;const n=Object.keys(t),i=Object.keys(e);for(const s of n){if(!i.includes(s))return!1;const r=t[s],o=e[s];if(hh(r)&&hh(o)){if(!Un(r,o))return!1}else if(r!==o)return!1}for(const s of i)if(!n.includes(s))return!1;return!0}function hh(t){return t!==null&&typeof t=="object"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Gi(t){const e=[];for(const[n,i]of Object.entries(t))Array.isArray(i)?i.forEach(s=>{e.push(encodeURIComponent(n)+"="+encodeURIComponent(s))}):e.push(encodeURIComponent(n)+"="+encodeURIComponent(i));return e.length?"&"+e.join("&"):""}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class wT{constructor(){this.chain_=[],this.buf_=[],this.W_=[],this.pad_=[],this.inbuf_=0,this.total_=0,this.blockSize=512/8,this.pad_[0]=128;for(let e=1;e<this.blockSize;++e)this.pad_[e]=0;this.reset()}reset(){this.chain_[0]=1732584193,this.chain_[1]=4023233417,this.chain_[2]=2562383102,this.chain_[3]=271733878,this.chain_[4]=3285377520,this.inbuf_=0,this.total_=0}compress_(e,n){n||(n=0);const i=this.W_;if(typeof e=="string")for(let d=0;d<16;d++)i[d]=e.charCodeAt(n)<<24|e.charCodeAt(n+1)<<16|e.charCodeAt(n+2)<<8|e.charCodeAt(n+3),n+=4;else for(let d=0;d<16;d++)i[d]=e[n]<<24|e[n+1]<<16|e[n+2]<<8|e[n+3],n+=4;for(let d=16;d<80;d++){const h=i[d-3]^i[d-8]^i[d-14]^i[d-16];i[d]=(h<<1|h>>>31)&4294967295}let s=this.chain_[0],r=this.chain_[1],o=this.chain_[2],a=this.chain_[3],c=this.chain_[4],l,u;for(let d=0;d<80;d++){d<40?d<20?(l=a^r&(o^a),u=1518500249):(l=r^o^a,u=1859775393):d<60?(l=r&o|a&(r|o),u=2400959708):(l=r^o^a,u=3395469782);const h=(s<<5|s>>>27)+l+c+u+i[d]&4294967295;c=a,a=o,o=(r<<30|r>>>2)&4294967295,r=s,s=h}this.chain_[0]=this.chain_[0]+s&4294967295,this.chain_[1]=this.chain_[1]+r&4294967295,this.chain_[2]=this.chain_[2]+o&4294967295,this.chain_[3]=this.chain_[3]+a&4294967295,this.chain_[4]=this.chain_[4]+c&4294967295}update(e,n){if(e==null)return;n===void 0&&(n=e.length);const i=n-this.blockSize;let s=0;const r=this.buf_;let o=this.inbuf_;for(;s<n;){if(o===0)for(;s<=i;)this.compress_(e,s),s+=this.blockSize;if(typeof e=="string"){for(;s<n;)if(r[o]=e.charCodeAt(s),++o,++s,o===this.blockSize){this.compress_(r),o=0;break}}else for(;s<n;)if(r[o]=e[s],++o,++s,o===this.blockSize){this.compress_(r),o=0;break}}this.inbuf_=o,this.total_+=n}digest(){const e=[];let n=this.total_*8;this.inbuf_<56?this.update(this.pad_,56-this.inbuf_):this.update(this.pad_,this.blockSize-(this.inbuf_-56));for(let s=this.blockSize-1;s>=56;s--)this.buf_[s]=n&255,n/=256;this.compress_(this.buf_);let i=0;for(let s=0;s<5;s++)for(let r=24;r>=0;r-=8)e[i]=this.chain_[s]>>r&255,++i;return e}}function vT(t,e){const n=new bT(t,e);return n.subscribe.bind(n)}class bT{constructor(e,n){this.observers=[],this.unsubscribes=[],this.observerCount=0,this.task=Promise.resolve(),this.finalized=!1,this.onNoObservers=n,this.task.then(()=>{e(this)}).catch(i=>{this.error(i)})}next(e){this.forEachObserver(n=>{n.next(e)})}error(e){this.forEachObserver(n=>{n.error(e)}),this.close(e)}complete(){this.forEachObserver(e=>{e.complete()}),this.close()}subscribe(e,n,i){let s;if(e===void 0&&n===void 0&&i===void 0)throw new Error("Missing Observer.");ET(e,["next","error","complete"])?s=e:s={next:e,error:n,complete:i},s.next===void 0&&(s.next=Pa),s.error===void 0&&(s.error=Pa),s.complete===void 0&&(s.complete=Pa);const r=this.unsubscribeOne.bind(this,this.observers.length);return this.finalized&&this.task.then(()=>{try{this.finalError?s.error(this.finalError):s.complete()}catch{}}),this.observers.push(s),r}unsubscribeOne(e){this.observers===void 0||this.observers[e]===void 0||(delete this.observers[e],this.observerCount-=1,this.observerCount===0&&this.onNoObservers!==void 0&&this.onNoObservers(this))}forEachObserver(e){if(!this.finalized)for(let n=0;n<this.observers.length;n++)this.sendOne(n,e)}sendOne(e,n){this.task.then(()=>{if(this.observers!==void 0&&this.observers[e]!==void 0)try{n(this.observers[e])}catch(i){typeof console<"u"&&console.error&&console.error(i)}})}close(e){this.finalized||(this.finalized=!0,e!==void 0&&(this.finalError=e),this.task.then(()=>{this.observers=void 0,this.onNoObservers=void 0}))}}function ET(t,e){if(typeof t!="object"||t===null)return!1;for(const n of e)if(n in t&&typeof t[n]=="function")return!0;return!1}function Pa(){}function Pi(t,e){return`${t} failed: ${e} argument `}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const CT=function(t){const e=[];let n=0;for(let i=0;i<t.length;i++){let s=t.charCodeAt(i);if(s>=55296&&s<=56319){const r=s-55296;i++,g(i<t.length,"Surrogate pair missing trail surrogate.");const o=t.charCodeAt(i)-56320;s=65536+(r<<10)+o}s<128?e[n++]=s:s<2048?(e[n++]=s>>6|192,e[n++]=s&63|128):s<65536?(e[n++]=s>>12|224,e[n++]=s>>6&63|128,e[n++]=s&63|128):(e[n++]=s>>18|240,e[n++]=s>>12&63|128,e[n++]=s>>6&63|128,e[n++]=s&63|128)}return e},Bo=function(t){let e=0;for(let n=0;n<t.length;n++){const i=t.charCodeAt(n);i<128?e++:i<2048?e+=2:i>=55296&&i<=56319?(e+=4,n++):e+=3}return e};/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const TT=1e3,ST=2,IT=14400*1e3,kT=.5;function RT(t,e=TT,n=ST){const i=e*Math.pow(n,t),s=Math.round(kT*i*(Math.random()-.5)*2);return Math.min(IT,i+s)}/**
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
 */function re(t){return t&&t._delegate?t._delegate:t}class We{constructor(e,n,i){this.name=e,this.instanceFactory=n,this.type=i,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}setInstantiationMode(e){return this.instantiationMode=e,this}setMultipleInstances(e){return this.multipleInstances=e,this}setServiceProps(e){return this.serviceProps=e,this}setInstanceCreatedCallback(e){return this.onInstanceCreated=e,this}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
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
 */class AT{constructor(e,n){this.name=e,this.container=n,this.component=null,this.instances=new Map,this.instancesDeferred=new Map,this.instancesOptions=new Map,this.onInitCallbacks=new Map}get(e){const n=this.normalizeInstanceIdentifier(e);if(!this.instancesDeferred.has(n)){const i=new Le;if(this.instancesDeferred.set(n,i),this.isInitialized(n)||this.shouldAutoInitialize())try{const s=this.getOrInitializeService({instanceIdentifier:n});s&&i.resolve(s)}catch{}}return this.instancesDeferred.get(n).promise}getImmediate(e){const n=this.normalizeInstanceIdentifier(e?.identifier),i=e?.optional??!1;if(this.isInitialized(n)||this.shouldAutoInitialize())try{return this.getOrInitializeService({instanceIdentifier:n})}catch(s){if(i)return null;throw s}else{if(i)return null;throw Error(`Service ${this.name} is not available`)}}getComponent(){return this.component}setComponent(e){if(e.name!==this.name)throw Error(`Mismatching Component ${e.name} for Provider ${this.name}.`);if(this.component)throw Error(`Component for ${this.name} has already been provided`);if(this.component=e,!!this.shouldAutoInitialize()){if(PT(e))try{this.getOrInitializeService({instanceIdentifier:Sn})}catch{}for(const[n,i]of this.instancesDeferred.entries()){const s=this.normalizeInstanceIdentifier(n);try{const r=this.getOrInitializeService({instanceIdentifier:s});i.resolve(r)}catch{}}}}clearInstance(e=Sn){this.instancesDeferred.delete(e),this.instancesOptions.delete(e),this.instances.delete(e)}async delete(){const e=Array.from(this.instances.values());await Promise.all([...e.filter(n=>"INTERNAL"in n).map(n=>n.INTERNAL.delete()),...e.filter(n=>"_delete"in n).map(n=>n._delete())])}isComponentSet(){return this.component!=null}isInitialized(e=Sn){return this.instances.has(e)}getOptions(e=Sn){return this.instancesOptions.get(e)||{}}initialize(e={}){const{options:n={}}=e,i=this.normalizeInstanceIdentifier(e.instanceIdentifier);if(this.isInitialized(i))throw Error(`${this.name}(${i}) has already been initialized`);if(!this.isComponentSet())throw Error(`Component ${this.name} has not been registered yet`);const s=this.getOrInitializeService({instanceIdentifier:i,options:n});for(const[r,o]of this.instancesDeferred.entries()){const a=this.normalizeInstanceIdentifier(r);i===a&&o.resolve(s)}return s}onInit(e,n){const i=this.normalizeInstanceIdentifier(n),s=this.onInitCallbacks.get(i)??new Set;s.add(e),this.onInitCallbacks.set(i,s);const r=this.instances.get(i);return r&&e(r,i),()=>{s.delete(e)}}invokeOnInitCallbacks(e,n){const i=this.onInitCallbacks.get(n);if(i)for(const s of i)try{s(e,n)}catch{}}getOrInitializeService({instanceIdentifier:e,options:n={}}){let i=this.instances.get(e);if(!i&&this.component&&(i=this.component.instanceFactory(this.container,{instanceIdentifier:NT(e),options:n}),this.instances.set(e,i),this.instancesOptions.set(e,n),this.invokeOnInitCallbacks(i,e),this.component.onInstanceCreated))try{this.component.onInstanceCreated(this.container,e,i)}catch{}return i||null}normalizeInstanceIdentifier(e=Sn){return this.component?this.component.multipleInstances?e:Sn:e}shouldAutoInitialize(){return!!this.component&&this.component.instantiationMode!=="EXPLICIT"}}function NT(t){return t===Sn?void 0:t}function PT(t){return t.instantiationMode==="EAGER"}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class LT{constructor(e){this.name=e,this.providers=new Map}addComponent(e){const n=this.getProvider(e.name);if(n.isComponentSet())throw new Error(`Component ${e.name} has already been registered with ${this.name}`);n.setComponent(e)}addOrOverwriteComponent(e){this.getProvider(e.name).isComponentSet()&&this.providers.delete(e.name),this.addComponent(e)}getProvider(e){if(this.providers.has(e))return this.providers.get(e);const n=new AT(e,this);return this.providers.set(e,n),n}getProviders(){return Array.from(this.providers.values())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var q;(function(t){t[t.DEBUG=0]="DEBUG",t[t.VERBOSE=1]="VERBOSE",t[t.INFO=2]="INFO",t[t.WARN=3]="WARN",t[t.ERROR=4]="ERROR",t[t.SILENT=5]="SILENT"})(q||(q={}));const OT={debug:q.DEBUG,verbose:q.VERBOSE,info:q.INFO,warn:q.WARN,error:q.ERROR,silent:q.SILENT},DT=q.INFO,MT={[q.DEBUG]:"log",[q.VERBOSE]:"log",[q.INFO]:"info",[q.WARN]:"warn",[q.ERROR]:"error"},xT=(t,e,...n)=>{if(e<t.logLevel)return;const i=new Date().toISOString(),s=MT[e];if(s)console[s](`[${i}]  ${t.name}:`,...n);else throw new Error(`Attempted to log a message with an invalid logType (value: ${e})`)};class Ho{constructor(e){this.name=e,this._logLevel=DT,this._logHandler=xT,this._userLogHandler=null}get logLevel(){return this._logLevel}set logLevel(e){if(!(e in q))throw new TypeError(`Invalid value "${e}" assigned to \`logLevel\``);this._logLevel=e}setLogLevel(e){this._logLevel=typeof e=="string"?OT[e]:e}get logHandler(){return this._logHandler}set logHandler(e){if(typeof e!="function")throw new TypeError("Value assigned to `logHandler` must be a function");this._logHandler=e}get userLogHandler(){return this._userLogHandler}set userLogHandler(e){this._userLogHandler=e}debug(...e){this._userLogHandler&&this._userLogHandler(this,q.DEBUG,...e),this._logHandler(this,q.DEBUG,...e)}log(...e){this._userLogHandler&&this._userLogHandler(this,q.VERBOSE,...e),this._logHandler(this,q.VERBOSE,...e)}info(...e){this._userLogHandler&&this._userLogHandler(this,q.INFO,...e),this._logHandler(this,q.INFO,...e)}warn(...e){this._userLogHandler&&this._userLogHandler(this,q.WARN,...e),this._logHandler(this,q.WARN,...e)}error(...e){this._userLogHandler&&this._userLogHandler(this,q.ERROR,...e),this._logHandler(this,q.ERROR,...e)}}const FT=(t,e)=>e.some(n=>t instanceof n);let fh,ph;function UT(){return fh||(fh=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])}function $T(){return ph||(ph=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])}const ug=new WeakMap,Ic=new WeakMap,dg=new WeakMap,La=new WeakMap,Ol=new WeakMap;function BT(t){const e=new Promise((n,i)=>{const s=()=>{t.removeEventListener("success",r),t.removeEventListener("error",o)},r=()=>{n(Dt(t.result)),s()},o=()=>{i(t.error),s()};t.addEventListener("success",r),t.addEventListener("error",o)});return e.then(n=>{n instanceof IDBCursor&&ug.set(n,t)}).catch(()=>{}),Ol.set(e,t),e}function HT(t){if(Ic.has(t))return;const e=new Promise((n,i)=>{const s=()=>{t.removeEventListener("complete",r),t.removeEventListener("error",o),t.removeEventListener("abort",o)},r=()=>{n(),s()},o=()=>{i(t.error||new DOMException("AbortError","AbortError")),s()};t.addEventListener("complete",r),t.addEventListener("error",o),t.addEventListener("abort",o)});Ic.set(t,e)}let kc={get(t,e,n){if(t instanceof IDBTransaction){if(e==="done")return Ic.get(t);if(e==="objectStoreNames")return t.objectStoreNames||dg.get(t);if(e==="store")return n.objectStoreNames[1]?void 0:n.objectStore(n.objectStoreNames[0])}return Dt(t[e])},set(t,e,n){return t[e]=n,!0},has(t,e){return t instanceof IDBTransaction&&(e==="done"||e==="store")?!0:e in t}};function VT(t){kc=t(kc)}function WT(t){return t===IDBDatabase.prototype.transaction&&!("objectStoreNames"in IDBTransaction.prototype)?function(e,...n){const i=t.call(Oa(this),e,...n);return dg.set(i,e.sort?e.sort():[e]),Dt(i)}:$T().includes(t)?function(...e){return t.apply(Oa(this),e),Dt(ug.get(this))}:function(...e){return Dt(t.apply(Oa(this),e))}}function jT(t){return typeof t=="function"?WT(t):(t instanceof IDBTransaction&&HT(t),FT(t,UT())?new Proxy(t,kc):t)}function Dt(t){if(t instanceof IDBRequest)return BT(t);if(La.has(t))return La.get(t);const e=jT(t);return e!==t&&(La.set(t,e),Ol.set(e,t)),e}const Oa=t=>Ol.get(t);function Vo(t,e,{blocked:n,upgrade:i,blocking:s,terminated:r}={}){const o=indexedDB.open(t,e),a=Dt(o);return i&&o.addEventListener("upgradeneeded",c=>{i(Dt(o.result),c.oldVersion,c.newVersion,Dt(o.transaction),c)}),n&&o.addEventListener("blocked",c=>n(c.oldVersion,c.newVersion,c)),a.then(c=>{r&&c.addEventListener("close",()=>r()),s&&c.addEventListener("versionchange",l=>s(l.oldVersion,l.newVersion,l))}).catch(()=>{}),a}function Da(t,{blocked:e}={}){const n=indexedDB.deleteDatabase(t);return e&&n.addEventListener("blocked",i=>e(i.oldVersion,i)),Dt(n).then(()=>{})}const qT=["get","getKey","getAll","getAllKeys","count"],zT=["put","add","delete","clear"],Ma=new Map;function gh(t,e){if(!(t instanceof IDBDatabase&&!(e in t)&&typeof e=="string"))return;if(Ma.get(e))return Ma.get(e);const n=e.replace(/FromIndex$/,""),i=e!==n,s=zT.includes(n);if(!(n in(i?IDBIndex:IDBObjectStore).prototype)||!(s||qT.includes(n)))return;const r=async function(o,...a){const c=this.transaction(o,s?"readwrite":"readonly");let l=c.store;return i&&(l=l.index(a.shift())),(await Promise.all([l[n](...a),s&&c.done]))[0]};return Ma.set(e,r),r}VT(t=>({...t,get:(e,n,i)=>gh(e,n)||t.get(e,n,i),has:(e,n)=>!!gh(e,n)||t.has(e,n)}));/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class GT{constructor(e){this.container=e}getPlatformInfoString(){return this.container.getProviders().map(n=>{if(KT(n)){const i=n.getImmediate();return`${i.library}/${i.version}`}else return null}).filter(n=>n).join(" ")}}function KT(t){return t.getComponent()?.type==="VERSION"}const Rc="@firebase/app",mh="0.14.7";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ft=new Ho("@firebase/app"),YT="@firebase/app-compat",JT="@firebase/analytics-compat",XT="@firebase/analytics",QT="@firebase/app-check-compat",ZT="@firebase/app-check",eS="@firebase/auth",tS="@firebase/auth-compat",nS="@firebase/database",iS="@firebase/data-connect",sS="@firebase/database-compat",rS="@firebase/functions",oS="@firebase/functions-compat",aS="@firebase/installations",cS="@firebase/installations-compat",lS="@firebase/messaging",uS="@firebase/messaging-compat",dS="@firebase/performance",hS="@firebase/performance-compat",fS="@firebase/remote-config",pS="@firebase/remote-config-compat",gS="@firebase/storage",mS="@firebase/storage-compat",_S="@firebase/firestore",yS="@firebase/ai",wS="@firebase/firestore-compat",vS="firebase",bS="12.8.0";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ac="[DEFAULT]",ES={[Rc]:"fire-core",[YT]:"fire-core-compat",[XT]:"fire-analytics",[JT]:"fire-analytics-compat",[ZT]:"fire-app-check",[QT]:"fire-app-check-compat",[eS]:"fire-auth",[tS]:"fire-auth-compat",[nS]:"fire-rtdb",[iS]:"fire-data-connect",[sS]:"fire-rtdb-compat",[rS]:"fire-fn",[oS]:"fire-fn-compat",[aS]:"fire-iid",[cS]:"fire-iid-compat",[lS]:"fire-fcm",[uS]:"fire-fcm-compat",[dS]:"fire-perf",[hS]:"fire-perf-compat",[fS]:"fire-rc",[pS]:"fire-rc-compat",[gS]:"fire-gcs",[mS]:"fire-gcs-compat",[_S]:"fire-fst",[wS]:"fire-fst-compat",[yS]:"fire-vertex","fire-js":"fire-js",[vS]:"fire-js-all"};/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Yr=new Map,CS=new Map,Nc=new Map;function _h(t,e){try{t.container.addComponent(e)}catch(n){Ft.debug(`Component ${e.name} failed to register with FirebaseApp ${t.name}`,n)}}function Ye(t){const e=t.name;if(Nc.has(e))return Ft.debug(`There were multiple attempts to register component ${e}.`),!1;Nc.set(e,t);for(const n of Yr.values())_h(n,t);for(const n of CS.values())_h(n,t);return!0}function _n(t,e){const n=t.container.getProvider("heartbeat").getImmediate({optional:!0});return n&&n.triggerHeartbeat(),t.container.getProvider(e)}function tt(t){return t==null?!1:t.settings!==void 0}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
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
 */class SS{constructor(e,n,i){this._isDeleted=!1,this._options={...e},this._config={...n},this._name=n.name,this._automaticDataCollectionEnabled=n.automaticDataCollectionEnabled,this._container=i,this.container.addComponent(new We("app",()=>this,"PUBLIC"))}get automaticDataCollectionEnabled(){return this.checkDestroyed(),this._automaticDataCollectionEnabled}set automaticDataCollectionEnabled(e){this.checkDestroyed(),this._automaticDataCollectionEnabled=e}get name(){return this.checkDestroyed(),this._name}get options(){return this.checkDestroyed(),this._options}get config(){return this.checkDestroyed(),this._config}get container(){return this._container}get isDeleted(){return this._isDeleted}set isDeleted(e){this._isDeleted=e}checkDestroyed(){if(this.isDeleted)throw en.create("app-deleted",{appName:this._name})}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ki=bS;function hg(t,e={}){let n=t;typeof e!="object"&&(e={name:e});const i={name:Ac,automaticDataCollectionEnabled:!0,...e},s=i.name;if(typeof s!="string"||!s)throw en.create("bad-app-name",{appName:String(s)});if(n||(n=ig()),!n)throw en.create("no-options");const r=Yr.get(s);if(r){if(Un(n,r.options)&&Un(i,r.config))return r;throw en.create("duplicate-app",{appName:s})}const o=new LT(s);for(const c of Nc.values())o.addComponent(c);const a=new SS(n,i,o);return Yr.set(s,a),a}function Wo(t=Ac){const e=Yr.get(t);if(!e&&t===Ac&&ig())return hg();if(!e)throw en.create("no-app",{appName:t});return e}function Ve(t,e,n){let i=ES[t]??t;n&&(i+=`-${n}`);const s=i.match(/\s|\//),r=e.match(/\s|\//);if(s||r){const o=[`Unable to register library "${i}" with version "${e}":`];s&&o.push(`library name "${i}" contains illegal characters (whitespace or "/")`),s&&r&&o.push("and"),r&&o.push(`version name "${e}" contains illegal characters (whitespace or "/")`),Ft.warn(o.join(" "));return}Ye(new We(`${i}-version`,()=>({library:i,version:e}),"VERSION"))}/**
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
 */const IS="firebase-heartbeat-database",kS=1,Ds="firebase-heartbeat-store";let xa=null;function fg(){return xa||(xa=Vo(IS,kS,{upgrade:(t,e)=>{switch(e){case 0:try{t.createObjectStore(Ds)}catch(n){console.warn(n)}}}}).catch(t=>{throw en.create("idb-open",{originalErrorMessage:t.message})})),xa}async function RS(t){try{const n=(await fg()).transaction(Ds),i=await n.objectStore(Ds).get(pg(t));return await n.done,i}catch(e){if(e instanceof Vt)Ft.warn(e.message);else{const n=en.create("idb-get",{originalErrorMessage:e?.message});Ft.warn(n.message)}}}async function yh(t,e){try{const i=(await fg()).transaction(Ds,"readwrite");await i.objectStore(Ds).put(e,pg(t)),await i.done}catch(n){if(n instanceof Vt)Ft.warn(n.message);else{const i=en.create("idb-set",{originalErrorMessage:n?.message});Ft.warn(i.message)}}}function pg(t){return`${t.name}!${t.options.appId}`}/**
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
 */const AS=1024,NS=30;class PS{constructor(e){this.container=e,this._heartbeatsCache=null;const n=this.container.getProvider("app").getImmediate();this._storage=new OS(n),this._heartbeatsCachePromise=this._storage.read().then(i=>(this._heartbeatsCache=i,i))}async triggerHeartbeat(){try{const n=this.container.getProvider("platform-logger").getImmediate().getPlatformInfoString(),i=wh();if(this._heartbeatsCache?.heartbeats==null&&(this._heartbeatsCache=await this._heartbeatsCachePromise,this._heartbeatsCache?.heartbeats==null)||this._heartbeatsCache.lastSentHeartbeatDate===i||this._heartbeatsCache.heartbeats.some(s=>s.date===i))return;if(this._heartbeatsCache.heartbeats.push({date:i,agent:n}),this._heartbeatsCache.heartbeats.length>NS){const s=DS(this._heartbeatsCache.heartbeats);this._heartbeatsCache.heartbeats.splice(s,1)}return this._storage.overwrite(this._heartbeatsCache)}catch(e){Ft.warn(e)}}async getHeartbeatsHeader(){try{if(this._heartbeatsCache===null&&await this._heartbeatsCachePromise,this._heartbeatsCache?.heartbeats==null||this._heartbeatsCache.heartbeats.length===0)return"";const e=wh(),{heartbeatsToSend:n,unsentEntries:i}=LS(this._heartbeatsCache.heartbeats),s=qr(JSON.stringify({version:2,heartbeats:n}));return this._heartbeatsCache.lastSentHeartbeatDate=e,i.length>0?(this._heartbeatsCache.heartbeats=i,await this._storage.overwrite(this._heartbeatsCache)):(this._heartbeatsCache.heartbeats=[],this._storage.overwrite(this._heartbeatsCache)),s}catch(e){return Ft.warn(e),""}}}function wh(){return new Date().toISOString().substring(0,10)}function LS(t,e=AS){const n=[];let i=t.slice();for(const s of t){const r=n.find(o=>o.agent===s.agent);if(r){if(r.dates.push(s.date),vh(n)>e){r.dates.pop();break}}else if(n.push({agent:s.agent,dates:[s.date]}),vh(n)>e){n.pop();break}i=i.slice(1)}return{heartbeatsToSend:n,unsentEntries:i}}class OS{constructor(e){this.app=e,this._canUseIndexedDBPromise=this.runIndexedDBEnvironmentCheck()}async runIndexedDBEnvironmentCheck(){return $o()?cg().then(()=>!0).catch(()=>!1):!1}async read(){if(await this._canUseIndexedDBPromise){const n=await RS(this.app);return n?.heartbeats?n:{heartbeats:[]}}else return{heartbeats:[]}}async overwrite(e){if(await this._canUseIndexedDBPromise){const i=await this.read();return yh(this.app,{lastSentHeartbeatDate:e.lastSentHeartbeatDate??i.lastSentHeartbeatDate,heartbeats:e.heartbeats})}else return}async add(e){if(await this._canUseIndexedDBPromise){const i=await this.read();return yh(this.app,{lastSentHeartbeatDate:e.lastSentHeartbeatDate??i.lastSentHeartbeatDate,heartbeats:[...i.heartbeats,...e.heartbeats]})}else return}}function vh(t){return qr(JSON.stringify({version:2,heartbeats:t})).length}function DS(t){if(t.length===0)return-1;let e=0,n=t[0].date;for(let i=1;i<t.length;i++)t[i].date<n&&(n=t[i].date,e=i);return e}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function MS(t){Ye(new We("platform-logger",e=>new GT(e),"PRIVATE")),Ye(new We("heartbeat",e=>new PS(e),"PRIVATE")),Ve(Rc,mh,t),Ve(Rc,mh,"esm2020"),Ve("fire-js","")}MS("");var bh={};const Eh="@firebase/database",Ch="1.1.0";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let gg="";function xS(t){gg=t}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class FS{constructor(e){this.domStorage_=e,this.prefix_="firebase:"}set(e,n){n==null?this.domStorage_.removeItem(this.prefixedName_(e)):this.domStorage_.setItem(this.prefixedName_(e),le(n))}get(e){const n=this.domStorage_.getItem(this.prefixedName_(e));return n==null?null:Os(n)}remove(e){this.domStorage_.removeItem(this.prefixedName_(e))}prefixedName_(e){return this.prefix_+e}toString(){return this.domStorage_.toString()}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class US{constructor(){this.cache_={},this.isInMemoryStorage=!0}set(e,n){n==null?delete this.cache_[e]:this.cache_[e]=n}get(e){return vt(this.cache_,e)?this.cache_[e]:null}remove(e){delete this.cache_[e]}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const mg=function(t){try{if(typeof window<"u"&&typeof window[t]<"u"){const e=window[t];return e.setItem("firebase:sentinel","cache"),e.removeItem("firebase:sentinel"),new FS(e)}}catch{}return new US},An=mg("localStorage"),$S=mg("sessionStorage");/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const di=new Ho("@firebase/database"),BS=(function(){let t=1;return function(){return t++}})(),_g=function(t){const e=CT(t),n=new wT;n.update(e);const i=n.digest();return Uo.encodeByteArray(i)},nr=function(...t){let e="";for(let n=0;n<t.length;n++){const i=t[n];Array.isArray(i)||i&&typeof i=="object"&&typeof i.length=="number"?e+=nr.apply(null,i):typeof i=="object"?e+=le(i):e+=i,e+=" "}return e};let _s=null,Th=!0;const HS=function(t,e){g(!0,"Can't turn on custom loggers persistently."),di.logLevel=q.VERBOSE,_s=di.log.bind(di)},pe=function(...t){if(Th===!0&&(Th=!1,_s===null&&$S.get("logging_enabled")===!0&&HS()),_s){const e=nr.apply(null,t);_s(e)}},ir=function(t){return function(...e){pe(t,...e)}},Pc=function(...t){const e="FIREBASE INTERNAL ERROR: "+nr(...t);di.error(e)},Ut=function(...t){const e=`FIREBASE FATAL ERROR: ${nr(...t)}`;throw di.error(e),new Error(e)},Ae=function(...t){const e="FIREBASE WARNING: "+nr(...t);di.warn(e)},VS=function(){typeof window<"u"&&window.location&&window.location.protocol&&window.location.protocol.indexOf("https:")!==-1&&Ae("Insecure Firebase access from a secure page. Please use https in calls to new Firebase().")},jo=function(t){return typeof t=="number"&&(t!==t||t===Number.POSITIVE_INFINITY||t===Number.NEGATIVE_INFINITY)},WS=function(t){if(document.readyState==="complete")t();else{let e=!1;const n=function(){if(!document.body){setTimeout(n,Math.floor(10));return}e||(e=!0,t())};document.addEventListener?(document.addEventListener("DOMContentLoaded",n,!1),window.addEventListener("load",n,!1)):document.attachEvent&&(document.attachEvent("onreadystatechange",()=>{document.readyState==="complete"&&n()}),window.attachEvent("onload",n))}},Li="[MIN_NAME]",$n="[MAX_NAME]",Qn=function(t,e){if(t===e)return 0;if(t===Li||e===$n)return-1;if(e===Li||t===$n)return 1;{const n=Sh(t),i=Sh(e);return n!==null?i!==null?n-i===0?t.length-e.length:n-i:-1:i!==null?1:t<e?-1:1}},jS=function(t,e){return t===e?0:t<e?-1:1},as=function(t,e){if(e&&t in e)return e[t];throw new Error("Missing required key ("+t+") in object: "+le(e))},Dl=function(t){if(typeof t!="object"||t===null)return le(t);const e=[];for(const i in t)e.push(i);e.sort();let n="{";for(let i=0;i<e.length;i++)i!==0&&(n+=","),n+=le(e[i]),n+=":",n+=Dl(t[e[i]]);return n+="}",n},yg=function(t,e){const n=t.length;if(n<=e)return[t];const i=[];for(let s=0;s<n;s+=e)s+e>n?i.push(t.substring(s,n)):i.push(t.substring(s,s+e));return i};function ye(t,e){for(const n in t)t.hasOwnProperty(n)&&e(n,t[n])}const wg=function(t){g(!jo(t),"Invalid JSON number");const e=11,n=52,i=(1<<e-1)-1;let s,r,o,a,c;t===0?(r=0,o=0,s=1/t===-1/0?1:0):(s=t<0,t=Math.abs(t),t>=Math.pow(2,1-i)?(a=Math.min(Math.floor(Math.log(t)/Math.LN2),i),r=a+i,o=Math.round(t*Math.pow(2,n-a)-Math.pow(2,n))):(r=0,o=Math.round(t/Math.pow(2,1-i-n))));const l=[];for(c=n;c;c-=1)l.push(o%2?1:0),o=Math.floor(o/2);for(c=e;c;c-=1)l.push(r%2?1:0),r=Math.floor(r/2);l.push(s?1:0),l.reverse();const u=l.join("");let d="";for(c=0;c<64;c+=8){let h=parseInt(u.substr(c,8),2).toString(16);h.length===1&&(h="0"+h),d=d+h}return d.toLowerCase()},qS=function(){return!!(typeof window=="object"&&window.chrome&&window.chrome.extension&&!/^chrome/.test(window.location.href))},zS=function(){return typeof Windows=="object"&&typeof Windows.UI=="object"};function GS(t,e){let n="Unknown Error";t==="too_big"?n="The data requested exceeds the maximum size that can be accessed with a single request.":t==="permission_denied"?n="Client doesn't have permission to access the desired data.":t==="unavailable"&&(n="The service is unavailable");const i=new Error(t+" at "+e._path.toString()+": "+n);return i.code=t.toUpperCase(),i}const KS=new RegExp("^-?(0*)\\d{1,10}$"),YS=-2147483648,JS=2147483647,Sh=function(t){if(KS.test(t)){const e=Number(t);if(e>=YS&&e<=JS)return e}return null},Yi=function(t){try{t()}catch(e){setTimeout(()=>{const n=e.stack||"";throw Ae("Exception was thrown by user callback.",n),e},Math.floor(0))}},XS=function(){return(typeof window=="object"&&window.navigator&&window.navigator.userAgent||"").search(/googlebot|google webmaster tools|bingbot|yahoo! slurp|baiduspider|yandexbot|duckduckbot/i)>=0},ys=function(t,e){const n=setTimeout(t,e);return typeof n=="number"&&typeof Deno<"u"&&Deno.unrefTimer?Deno.unrefTimer(n):typeof n=="object"&&n.unref&&n.unref(),n};/**
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
 */class QS{constructor(e,n){this.appCheckProvider=n,this.appName=e.name,tt(e)&&e.settings.appCheckToken&&(this.serverAppAppCheckToken=e.settings.appCheckToken),this.appCheck=n?.getImmediate({optional:!0}),this.appCheck||n?.get().then(i=>this.appCheck=i)}getToken(e){if(this.serverAppAppCheckToken){if(e)throw new Error("Attempted reuse of `FirebaseServerApp.appCheckToken` after previous usage failed.");return Promise.resolve({token:this.serverAppAppCheckToken})}return this.appCheck?this.appCheck.getToken(e):new Promise((n,i)=>{setTimeout(()=>{this.appCheck?this.getToken(e).then(n,i):n(null)},0)})}addTokenChangeListener(e){this.appCheckProvider?.get().then(n=>n.addTokenListener(e))}notifyForInvalidToken(){Ae(`Provided AppCheck credentials for the app named "${this.appName}" are invalid. This usually indicates your app was not initialized correctly.`)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ZS{constructor(e,n,i){this.appName_=e,this.firebaseOptions_=n,this.authProvider_=i,this.auth_=null,this.auth_=i.getImmediate({optional:!0}),this.auth_||i.onInit(s=>this.auth_=s)}getToken(e){return this.auth_?this.auth_.getToken(e).catch(n=>n&&n.code==="auth/token-not-initialized"?(pe("Got auth/token-not-initialized error.  Treating as null token."),null):Promise.reject(n)):new Promise((n,i)=>{setTimeout(()=>{this.auth_?this.getToken(e).then(n,i):n(null)},0)})}addTokenChangeListener(e){this.auth_?this.auth_.addAuthTokenListener(e):this.authProvider_.get().then(n=>n.addAuthTokenListener(e))}removeTokenChangeListener(e){this.authProvider_.get().then(n=>n.removeAuthTokenListener(e))}notifyForInvalidToken(){let e='Provided authentication credentials for the app named "'+this.appName_+'" are invalid. This usually indicates your app was not initialized correctly. ';"credential"in this.firebaseOptions_?e+='Make sure the "credential" property provided to initializeApp() is authorized to access the specified "databaseURL" and is from the correct project.':"serviceAccount"in this.firebaseOptions_?e+='Make sure the "serviceAccount" property provided to initializeApp() is authorized to access the specified "databaseURL" and is from the correct project.':e+='Make sure the "apiKey" and "databaseURL" properties provided to initializeApp() match the values provided for your app at https://console.firebase.google.com/.',Ae(e)}}class Or{constructor(e){this.accessToken=e}getToken(e){return Promise.resolve({accessToken:this.accessToken})}addTokenChangeListener(e){e(this.accessToken)}removeTokenChangeListener(e){}notifyForInvalidToken(){}}Or.OWNER="owner";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ml="5",vg="v",bg="s",Eg="r",Cg="f",Tg=/(console\.firebase|firebase-console-\w+\.corp|firebase\.corp)\.google\.com/,Sg="ls",Ig="p",Lc="ac",kg="websocket",Rg="long_polling";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ag{constructor(e,n,i,s,r=!1,o="",a=!1,c=!1,l=null){this.secure=n,this.namespace=i,this.webSocketOnly=s,this.nodeAdmin=r,this.persistenceKey=o,this.includeNamespaceInQueryParams=a,this.isUsingEmulator=c,this.emulatorOptions=l,this._host=e.toLowerCase(),this._domain=this._host.substr(this._host.indexOf(".")+1),this.internalHost=An.get("host:"+e)||this._host}isCacheableHost(){return this.internalHost.substr(0,2)==="s-"}isCustomHost(){return this._domain!=="firebaseio.com"&&this._domain!=="firebaseio-demo.com"}get host(){return this._host}set host(e){e!==this.internalHost&&(this.internalHost=e,this.isCacheableHost()&&An.set("host:"+this._host,this.internalHost))}toString(){let e=this.toURLString();return this.persistenceKey&&(e+="<"+this.persistenceKey+">"),e}toURLString(){const e=this.secure?"https://":"http://",n=this.includeNamespaceInQueryParams?`?ns=${this.namespace}`:"";return`${e}${this.host}/${n}`}}function eI(t){return t.host!==t.internalHost||t.isCustomHost()||t.includeNamespaceInQueryParams}function Ng(t,e,n){g(typeof e=="string","typeof type must == string"),g(typeof n=="object","typeof params must == object");let i;if(e===kg)i=(t.secure?"wss://":"ws://")+t.internalHost+"/.ws?";else if(e===Rg)i=(t.secure?"https://":"http://")+t.internalHost+"/.lp?";else throw new Error("Unknown connection type: "+e);eI(t)&&(n.ns=t.namespace);const s=[];return ye(n,(r,o)=>{s.push(r+"="+o)}),i+s.join("&")}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class tI{constructor(){this.counters_={}}incrementCounter(e,n=1){vt(this.counters_,e)||(this.counters_[e]=0),this.counters_[e]+=n}get(){return eT(this.counters_)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Fa={},Ua={};function xl(t){const e=t.toString();return Fa[e]||(Fa[e]=new tI),Fa[e]}function nI(t,e){const n=t.toString();return Ua[n]||(Ua[n]=e()),Ua[n]}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class iI{constructor(e){this.onMessage_=e,this.pendingResponses=[],this.currentResponseNum=0,this.closeAfterResponse=-1,this.onClose=null}closeAfter(e,n){this.closeAfterResponse=e,this.onClose=n,this.closeAfterResponse<this.currentResponseNum&&(this.onClose(),this.onClose=null)}handleResponse(e,n){for(this.pendingResponses[e]=n;this.pendingResponses[this.currentResponseNum];){const i=this.pendingResponses[this.currentResponseNum];delete this.pendingResponses[this.currentResponseNum];for(let s=0;s<i.length;++s)i[s]&&Yi(()=>{this.onMessage_(i[s])});if(this.currentResponseNum===this.closeAfterResponse){this.onClose&&(this.onClose(),this.onClose=null);break}this.currentResponseNum++}}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ih="start",sI="close",rI="pLPCommand",oI="pRTLPCB",Pg="id",Lg="pw",Og="ser",aI="cb",cI="seg",lI="ts",uI="d",dI="dframe",Dg=1870,Mg=30,hI=Dg-Mg,fI=25e3,pI=3e4;class ai{constructor(e,n,i,s,r,o,a){this.connId=e,this.repoInfo=n,this.applicationId=i,this.appCheckToken=s,this.authToken=r,this.transportSessionId=o,this.lastSessionId=a,this.bytesSent=0,this.bytesReceived=0,this.everConnected_=!1,this.log_=ir(e),this.stats_=xl(n),this.urlFn=c=>(this.appCheckToken&&(c[Lc]=this.appCheckToken),Ng(n,Rg,c))}open(e,n){this.curSegmentNum=0,this.onDisconnect_=n,this.myPacketOrderer=new iI(e),this.isClosed_=!1,this.connectTimeoutTimer_=setTimeout(()=>{this.log_("Timed out trying to connect."),this.onClosed_(),this.connectTimeoutTimer_=null},Math.floor(pI)),WS(()=>{if(this.isClosed_)return;this.scriptTagHolder=new Fl((...r)=>{const[o,a,c,l,u]=r;if(this.incrementIncomingBytes_(r),!!this.scriptTagHolder)if(this.connectTimeoutTimer_&&(clearTimeout(this.connectTimeoutTimer_),this.connectTimeoutTimer_=null),this.everConnected_=!0,o===Ih)this.id=a,this.password=c;else if(o===sI)a?(this.scriptTagHolder.sendNewPolls=!1,this.myPacketOrderer.closeAfter(a,()=>{this.onClosed_()})):this.onClosed_();else throw new Error("Unrecognized command received: "+o)},(...r)=>{const[o,a]=r;this.incrementIncomingBytes_(r),this.myPacketOrderer.handleResponse(o,a)},()=>{this.onClosed_()},this.urlFn);const i={};i[Ih]="t",i[Og]=Math.floor(Math.random()*1e8),this.scriptTagHolder.uniqueCallbackIdentifier&&(i[aI]=this.scriptTagHolder.uniqueCallbackIdentifier),i[vg]=Ml,this.transportSessionId&&(i[bg]=this.transportSessionId),this.lastSessionId&&(i[Sg]=this.lastSessionId),this.applicationId&&(i[Ig]=this.applicationId),this.appCheckToken&&(i[Lc]=this.appCheckToken),typeof location<"u"&&location.hostname&&Tg.test(location.hostname)&&(i[Eg]=Cg);const s=this.urlFn(i);this.log_("Connecting via long-poll to "+s),this.scriptTagHolder.addTag(s,()=>{})})}start(){this.scriptTagHolder.startLongPoll(this.id,this.password),this.addDisconnectPingFrame(this.id,this.password)}static forceAllow(){ai.forceAllow_=!0}static forceDisallow(){ai.forceDisallow_=!0}static isAvailable(){return ai.forceAllow_?!0:!ai.forceDisallow_&&typeof document<"u"&&document.createElement!=null&&!qS()&&!zS()}markConnectionHealthy(){}shutdown_(){this.isClosed_=!0,this.scriptTagHolder&&(this.scriptTagHolder.close(),this.scriptTagHolder=null),this.myDisconnFrame&&(document.body.removeChild(this.myDisconnFrame),this.myDisconnFrame=null),this.connectTimeoutTimer_&&(clearTimeout(this.connectTimeoutTimer_),this.connectTimeoutTimer_=null)}onClosed_(){this.isClosed_||(this.log_("Longpoll is closing itself"),this.shutdown_(),this.onDisconnect_&&(this.onDisconnect_(this.everConnected_),this.onDisconnect_=null))}close(){this.isClosed_||(this.log_("Longpoll is being closed."),this.shutdown_())}send(e){const n=le(e);this.bytesSent+=n.length,this.stats_.incrementCounter("bytes_sent",n.length);const i=Zp(n),s=yg(i,hI);for(let r=0;r<s.length;r++)this.scriptTagHolder.enqueueSegment(this.curSegmentNum,s.length,s[r]),this.curSegmentNum++}addDisconnectPingFrame(e,n){this.myDisconnFrame=document.createElement("iframe");const i={};i[dI]="t",i[Pg]=e,i[Lg]=n,this.myDisconnFrame.src=this.urlFn(i),this.myDisconnFrame.style.display="none",document.body.appendChild(this.myDisconnFrame)}incrementIncomingBytes_(e){const n=le(e).length;this.bytesReceived+=n,this.stats_.incrementCounter("bytes_received",n)}}class Fl{constructor(e,n,i,s){this.onDisconnect=i,this.urlFn=s,this.outstandingRequests=new Set,this.pendingSegs=[],this.currentSerial=Math.floor(Math.random()*1e8),this.sendNewPolls=!0;{this.uniqueCallbackIdentifier=BS(),window[rI+this.uniqueCallbackIdentifier]=e,window[oI+this.uniqueCallbackIdentifier]=n,this.myIFrame=Fl.createIFrame_();let r="";this.myIFrame.src&&this.myIFrame.src.substr(0,11)==="javascript:"&&(r='<script>document.domain="'+document.domain+'";<\/script>');const o="<html><body>"+r+"</body></html>";try{this.myIFrame.doc.open(),this.myIFrame.doc.write(o),this.myIFrame.doc.close()}catch(a){pe("frame writing exception"),a.stack&&pe(a.stack),pe(a)}}}static createIFrame_(){const e=document.createElement("iframe");if(e.style.display="none",document.body){document.body.appendChild(e);try{e.contentWindow.document||pe("No IE domain setting required")}catch{const i=document.domain;e.src="javascript:void((function(){document.open();document.domain='"+i+"';document.close();})())"}}else throw"Document body has not initialized. Wait to initialize Firebase until after the document is ready.";return e.contentDocument?e.doc=e.contentDocument:e.contentWindow?e.doc=e.contentWindow.document:e.document&&(e.doc=e.document),e}close(){this.alive=!1,this.myIFrame&&(this.myIFrame.doc.body.textContent="",setTimeout(()=>{this.myIFrame!==null&&(document.body.removeChild(this.myIFrame),this.myIFrame=null)},Math.floor(0)));const e=this.onDisconnect;e&&(this.onDisconnect=null,e())}startLongPoll(e,n){for(this.myID=e,this.myPW=n,this.alive=!0;this.newRequest_(););}newRequest_(){if(this.alive&&this.sendNewPolls&&this.outstandingRequests.size<(this.pendingSegs.length>0?2:1)){this.currentSerial++;const e={};e[Pg]=this.myID,e[Lg]=this.myPW,e[Og]=this.currentSerial;let n=this.urlFn(e),i="",s=0;for(;this.pendingSegs.length>0&&this.pendingSegs[0].d.length+Mg+i.length<=Dg;){const o=this.pendingSegs.shift();i=i+"&"+cI+s+"="+o.seg+"&"+lI+s+"="+o.ts+"&"+uI+s+"="+o.d,s++}return n=n+i,this.addLongPollTag_(n,this.currentSerial),!0}else return!1}enqueueSegment(e,n,i){this.pendingSegs.push({seg:e,ts:n,d:i}),this.alive&&this.newRequest_()}addLongPollTag_(e,n){this.outstandingRequests.add(n);const i=()=>{this.outstandingRequests.delete(n),this.newRequest_()},s=setTimeout(i,Math.floor(fI)),r=()=>{clearTimeout(s),i()};this.addTag(e,r)}addTag(e,n){setTimeout(()=>{try{if(!this.sendNewPolls)return;const i=this.myIFrame.doc.createElement("script");i.type="text/javascript",i.async=!0,i.src=e,i.onload=i.onreadystatechange=function(){const s=i.readyState;(!s||s==="loaded"||s==="complete")&&(i.onload=i.onreadystatechange=null,i.parentNode&&i.parentNode.removeChild(i),n())},i.onerror=()=>{pe("Long-poll script failed to load: "+e),this.sendNewPolls=!1,this.close()},this.myIFrame.doc.body.appendChild(i)}catch{}},Math.floor(1))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const gI=16384,mI=45e3;let Jr=null;typeof MozWebSocket<"u"?Jr=MozWebSocket:typeof WebSocket<"u"&&(Jr=WebSocket);class nt{constructor(e,n,i,s,r,o,a){this.connId=e,this.applicationId=i,this.appCheckToken=s,this.authToken=r,this.keepaliveTimer=null,this.frames=null,this.totalFrames=0,this.bytesSent=0,this.bytesReceived=0,this.log_=ir(this.connId),this.stats_=xl(n),this.connURL=nt.connectionURL_(n,o,a,s,i),this.nodeAdmin=n.nodeAdmin}static connectionURL_(e,n,i,s,r){const o={};return o[vg]=Ml,typeof location<"u"&&location.hostname&&Tg.test(location.hostname)&&(o[Eg]=Cg),n&&(o[bg]=n),i&&(o[Sg]=i),s&&(o[Lc]=s),r&&(o[Ig]=r),Ng(e,kg,o)}open(e,n){this.onDisconnect=n,this.onMessage=e,this.log_("Websocket connecting to "+this.connURL),this.everConnected_=!1,An.set("previous_websocket_failure",!0);try{let i;hT(),this.mySock=new Jr(this.connURL,[],i)}catch(i){this.log_("Error instantiating WebSocket.");const s=i.message||i.data;s&&this.log_(s),this.onClosed_();return}this.mySock.onopen=()=>{this.log_("Websocket connected."),this.everConnected_=!0},this.mySock.onclose=()=>{this.log_("Websocket connection was disconnected."),this.mySock=null,this.onClosed_()},this.mySock.onmessage=i=>{this.handleIncomingFrame(i)},this.mySock.onerror=i=>{this.log_("WebSocket error.  Closing connection.");const s=i.message||i.data;s&&this.log_(s),this.onClosed_()}}start(){}static forceDisallow(){nt.forceDisallow_=!0}static isAvailable(){let e=!1;if(typeof navigator<"u"&&navigator.userAgent){const n=/Android ([0-9]{0,}\.[0-9]{0,})/,i=navigator.userAgent.match(n);i&&i.length>1&&parseFloat(i[1])<4.4&&(e=!0)}return!e&&Jr!==null&&!nt.forceDisallow_}static previouslyFailed(){return An.isInMemoryStorage||An.get("previous_websocket_failure")===!0}markConnectionHealthy(){An.remove("previous_websocket_failure")}appendFrame_(e){if(this.frames.push(e),this.frames.length===this.totalFrames){const n=this.frames.join("");this.frames=null;const i=Os(n);this.onMessage(i)}}handleNewFrameCount_(e){this.totalFrames=e,this.frames=[]}extractFrameCount_(e){if(g(this.frames===null,"We already have a frame buffer"),e.length<=6){const n=Number(e);if(!isNaN(n))return this.handleNewFrameCount_(n),null}return this.handleNewFrameCount_(1),e}handleIncomingFrame(e){if(this.mySock===null)return;const n=e.data;if(this.bytesReceived+=n.length,this.stats_.incrementCounter("bytes_received",n.length),this.resetKeepAlive(),this.frames!==null)this.appendFrame_(n);else{const i=this.extractFrameCount_(n);i!==null&&this.appendFrame_(i)}}send(e){this.resetKeepAlive();const n=le(e);this.bytesSent+=n.length,this.stats_.incrementCounter("bytes_sent",n.length);const i=yg(n,gI);i.length>1&&this.sendString_(String(i.length));for(let s=0;s<i.length;s++)this.sendString_(i[s])}shutdown_(){this.isClosed_=!0,this.keepaliveTimer&&(clearInterval(this.keepaliveTimer),this.keepaliveTimer=null),this.mySock&&(this.mySock.close(),this.mySock=null)}onClosed_(){this.isClosed_||(this.log_("WebSocket is closing itself"),this.shutdown_(),this.onDisconnect&&(this.onDisconnect(this.everConnected_),this.onDisconnect=null))}close(){this.isClosed_||(this.log_("WebSocket is being closed"),this.shutdown_())}resetKeepAlive(){clearInterval(this.keepaliveTimer),this.keepaliveTimer=setInterval(()=>{this.mySock&&this.sendString_("0"),this.resetKeepAlive()},Math.floor(mI))}sendString_(e){try{this.mySock.send(e)}catch(n){this.log_("Exception thrown from WebSocket.send():",n.message||n.data,"Closing connection."),setTimeout(this.onClosed_.bind(this),0)}}}nt.responsesRequiredToBeHealthy=2;nt.healthyTimeout=3e4;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ms{static get ALL_TRANSPORTS(){return[ai,nt]}static get IS_TRANSPORT_INITIALIZED(){return this.globalTransportInitialized_}constructor(e){this.initTransports_(e)}initTransports_(e){const n=nt&&nt.isAvailable();let i=n&&!nt.previouslyFailed();if(e.webSocketOnly&&(n||Ae("wss:// URL used, but browser isn't known to support websockets.  Trying anyway."),i=!0),i)this.transports_=[nt];else{const s=this.transports_=[];for(const r of Ms.ALL_TRANSPORTS)r&&r.isAvailable()&&s.push(r);Ms.globalTransportInitialized_=!0}}initialTransport(){if(this.transports_.length>0)return this.transports_[0];throw new Error("No transports available")}upgradeTransport(){return this.transports_.length>1?this.transports_[1]:null}}Ms.globalTransportInitialized_=!1;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const _I=6e4,yI=5e3,wI=10*1024,vI=100*1024,$a="t",kh="d",bI="s",Rh="r",EI="e",Ah="o",Nh="a",Ph="n",Lh="p",CI="h";class TI{constructor(e,n,i,s,r,o,a,c,l,u){this.id=e,this.repoInfo_=n,this.applicationId_=i,this.appCheckToken_=s,this.authToken_=r,this.onMessage_=o,this.onReady_=a,this.onDisconnect_=c,this.onKill_=l,this.lastSessionId=u,this.connectionCount=0,this.pendingDataMessages=[],this.state_=0,this.log_=ir("c:"+this.id+":"),this.transportManager_=new Ms(n),this.log_("Connection created"),this.start_()}start_(){const e=this.transportManager_.initialTransport();this.conn_=new e(this.nextTransportId_(),this.repoInfo_,this.applicationId_,this.appCheckToken_,this.authToken_,null,this.lastSessionId),this.primaryResponsesRequired_=e.responsesRequiredToBeHealthy||0;const n=this.connReceiver_(this.conn_),i=this.disconnReceiver_(this.conn_);this.tx_=this.conn_,this.rx_=this.conn_,this.secondaryConn_=null,this.isHealthy_=!1,setTimeout(()=>{this.conn_&&this.conn_.open(n,i)},Math.floor(0));const s=e.healthyTimeout||0;s>0&&(this.healthyTimeout_=ys(()=>{this.healthyTimeout_=null,this.isHealthy_||(this.conn_&&this.conn_.bytesReceived>vI?(this.log_("Connection exceeded healthy timeout but has received "+this.conn_.bytesReceived+" bytes.  Marking connection healthy."),this.isHealthy_=!0,this.conn_.markConnectionHealthy()):this.conn_&&this.conn_.bytesSent>wI?this.log_("Connection exceeded healthy timeout but has sent "+this.conn_.bytesSent+" bytes.  Leaving connection alive."):(this.log_("Closing unhealthy connection after timeout."),this.close()))},Math.floor(s)))}nextTransportId_(){return"c:"+this.id+":"+this.connectionCount++}disconnReceiver_(e){return n=>{e===this.conn_?this.onConnectionLost_(n):e===this.secondaryConn_?(this.log_("Secondary connection lost."),this.onSecondaryConnectionLost_()):this.log_("closing an old connection")}}connReceiver_(e){return n=>{this.state_!==2&&(e===this.rx_?this.onPrimaryMessageReceived_(n):e===this.secondaryConn_?this.onSecondaryMessageReceived_(n):this.log_("message on old connection"))}}sendRequest(e){const n={t:"d",d:e};this.sendData_(n)}tryCleanupConnection(){this.tx_===this.secondaryConn_&&this.rx_===this.secondaryConn_&&(this.log_("cleaning up and promoting a connection: "+this.secondaryConn_.connId),this.conn_=this.secondaryConn_,this.secondaryConn_=null)}onSecondaryControl_(e){if($a in e){const n=e[$a];n===Nh?this.upgradeIfSecondaryHealthy_():n===Rh?(this.log_("Got a reset on secondary, closing it"),this.secondaryConn_.close(),(this.tx_===this.secondaryConn_||this.rx_===this.secondaryConn_)&&this.close()):n===Ah&&(this.log_("got pong on secondary."),this.secondaryResponsesRequired_--,this.upgradeIfSecondaryHealthy_())}}onSecondaryMessageReceived_(e){const n=as("t",e),i=as("d",e);if(n==="c")this.onSecondaryControl_(i);else if(n==="d")this.pendingDataMessages.push(i);else throw new Error("Unknown protocol layer: "+n)}upgradeIfSecondaryHealthy_(){this.secondaryResponsesRequired_<=0?(this.log_("Secondary connection is healthy."),this.isHealthy_=!0,this.secondaryConn_.markConnectionHealthy(),this.proceedWithUpgrade_()):(this.log_("sending ping on secondary."),this.secondaryConn_.send({t:"c",d:{t:Lh,d:{}}}))}proceedWithUpgrade_(){this.secondaryConn_.start(),this.log_("sending client ack on secondary"),this.secondaryConn_.send({t:"c",d:{t:Nh,d:{}}}),this.log_("Ending transmission on primary"),this.conn_.send({t:"c",d:{t:Ph,d:{}}}),this.tx_=this.secondaryConn_,this.tryCleanupConnection()}onPrimaryMessageReceived_(e){const n=as("t",e),i=as("d",e);n==="c"?this.onControl_(i):n==="d"&&this.onDataMessage_(i)}onDataMessage_(e){this.onPrimaryResponse_(),this.onMessage_(e)}onPrimaryResponse_(){this.isHealthy_||(this.primaryResponsesRequired_--,this.primaryResponsesRequired_<=0&&(this.log_("Primary connection is healthy."),this.isHealthy_=!0,this.conn_.markConnectionHealthy()))}onControl_(e){const n=as($a,e);if(kh in e){const i=e[kh];if(n===CI){const s={...i};this.repoInfo_.isUsingEmulator&&(s.h=this.repoInfo_.host),this.onHandshake_(s)}else if(n===Ph){this.log_("recvd end transmission on primary"),this.rx_=this.secondaryConn_;for(let s=0;s<this.pendingDataMessages.length;++s)this.onDataMessage_(this.pendingDataMessages[s]);this.pendingDataMessages=[],this.tryCleanupConnection()}else n===bI?this.onConnectionShutdown_(i):n===Rh?this.onReset_(i):n===EI?Pc("Server Error: "+i):n===Ah?(this.log_("got pong on primary."),this.onPrimaryResponse_(),this.sendPingOnPrimaryIfNecessary_()):Pc("Unknown control packet command: "+n)}}onHandshake_(e){const n=e.ts,i=e.v,s=e.h;this.sessionId=e.s,this.repoInfo_.host=s,this.state_===0&&(this.conn_.start(),this.onConnectionEstablished_(this.conn_,n),Ml!==i&&Ae("Protocol version mismatch detected"),this.tryStartUpgrade_())}tryStartUpgrade_(){const e=this.transportManager_.upgradeTransport();e&&this.startUpgrade_(e)}startUpgrade_(e){this.secondaryConn_=new e(this.nextTransportId_(),this.repoInfo_,this.applicationId_,this.appCheckToken_,this.authToken_,this.sessionId),this.secondaryResponsesRequired_=e.responsesRequiredToBeHealthy||0;const n=this.connReceiver_(this.secondaryConn_),i=this.disconnReceiver_(this.secondaryConn_);this.secondaryConn_.open(n,i),ys(()=>{this.secondaryConn_&&(this.log_("Timed out trying to upgrade."),this.secondaryConn_.close())},Math.floor(_I))}onReset_(e){this.log_("Reset packet received.  New host: "+e),this.repoInfo_.host=e,this.state_===1?this.close():(this.closeConnections_(),this.start_())}onConnectionEstablished_(e,n){this.log_("Realtime connection established."),this.conn_=e,this.state_=1,this.onReady_&&(this.onReady_(n,this.sessionId),this.onReady_=null),this.primaryResponsesRequired_===0?(this.log_("Primary connection is healthy."),this.isHealthy_=!0):ys(()=>{this.sendPingOnPrimaryIfNecessary_()},Math.floor(yI))}sendPingOnPrimaryIfNecessary_(){!this.isHealthy_&&this.state_===1&&(this.log_("sending ping on primary."),this.sendData_({t:"c",d:{t:Lh,d:{}}}))}onSecondaryConnectionLost_(){const e=this.secondaryConn_;this.secondaryConn_=null,(this.tx_===e||this.rx_===e)&&this.close()}onConnectionLost_(e){this.conn_=null,!e&&this.state_===0?(this.log_("Realtime connection failed."),this.repoInfo_.isCacheableHost()&&(An.remove("host:"+this.repoInfo_.host),this.repoInfo_.internalHost=this.repoInfo_.host)):this.state_===1&&this.log_("Realtime connection lost."),this.close()}onConnectionShutdown_(e){this.log_("Connection shutdown command received. Shutting down..."),this.onKill_&&(this.onKill_(e),this.onKill_=null),this.onDisconnect_=null,this.close()}sendData_(e){if(this.state_!==1)throw"Connection is not connected";this.tx_.send(e)}close(){this.state_!==2&&(this.log_("Closing realtime connection."),this.state_=2,this.closeConnections_(),this.onDisconnect_&&(this.onDisconnect_(),this.onDisconnect_=null))}closeConnections_(){this.log_("Shutting down all connections"),this.conn_&&(this.conn_.close(),this.conn_=null),this.secondaryConn_&&(this.secondaryConn_.close(),this.secondaryConn_=null),this.healthyTimeout_&&(clearTimeout(this.healthyTimeout_),this.healthyTimeout_=null)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class xg{put(e,n,i,s){}merge(e,n,i,s){}refreshAuthToken(e){}refreshAppCheckToken(e){}onDisconnectPut(e,n,i){}onDisconnectMerge(e,n,i){}onDisconnectCancel(e,n){}reportStats(e){}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Fg{constructor(e){this.allowedEvents_=e,this.listeners_={},g(Array.isArray(e)&&e.length>0,"Requires a non-empty array")}trigger(e,...n){if(Array.isArray(this.listeners_[e])){const i=[...this.listeners_[e]];for(let s=0;s<i.length;s++)i[s].callback.apply(i[s].context,n)}}on(e,n,i){this.validateEventType_(e),this.listeners_[e]=this.listeners_[e]||[],this.listeners_[e].push({callback:n,context:i});const s=this.getInitialEvent(e);s&&n.apply(i,s)}off(e,n,i){this.validateEventType_(e);const s=this.listeners_[e]||[];for(let r=0;r<s.length;r++)if(s[r].callback===n&&(!i||i===s[r].context)){s.splice(r,1);return}}validateEventType_(e){g(this.allowedEvents_.find(n=>n===e),"Unknown event: "+e)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Xr extends Fg{static getInstance(){return new Xr}constructor(){super(["online"]),this.online_=!0,typeof window<"u"&&typeof window.addEventListener<"u"&&!Ll()&&(window.addEventListener("online",()=>{this.online_||(this.online_=!0,this.trigger("online",!0))},!1),window.addEventListener("offline",()=>{this.online_&&(this.online_=!1,this.trigger("online",!1))},!1))}getInitialEvent(e){return g(e==="online","Unknown event type: "+e),[this.online_]}currentlyOnline(){return this.online_}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Oh=32,Dh=768;class j{constructor(e,n){if(n===void 0){this.pieces_=e.split("/");let i=0;for(let s=0;s<this.pieces_.length;s++)this.pieces_[s].length>0&&(this.pieces_[i]=this.pieces_[s],i++);this.pieces_.length=i,this.pieceNum_=0}else this.pieces_=e,this.pieceNum_=n}toString(){let e="";for(let n=this.pieceNum_;n<this.pieces_.length;n++)this.pieces_[n]!==""&&(e+="/"+this.pieces_[n]);return e||"/"}}function B(){return new j("")}function P(t){return t.pieceNum_>=t.pieces_.length?null:t.pieces_[t.pieceNum_]}function ln(t){return t.pieces_.length-t.pieceNum_}function G(t){let e=t.pieceNum_;return e<t.pieces_.length&&e++,new j(t.pieces_,e)}function Ul(t){return t.pieceNum_<t.pieces_.length?t.pieces_[t.pieces_.length-1]:null}function SI(t){let e="";for(let n=t.pieceNum_;n<t.pieces_.length;n++)t.pieces_[n]!==""&&(e+="/"+encodeURIComponent(String(t.pieces_[n])));return e||"/"}function xs(t,e=0){return t.pieces_.slice(t.pieceNum_+e)}function Ug(t){if(t.pieceNum_>=t.pieces_.length)return null;const e=[];for(let n=t.pieceNum_;n<t.pieces_.length-1;n++)e.push(t.pieces_[n]);return new j(e,0)}function ee(t,e){const n=[];for(let i=t.pieceNum_;i<t.pieces_.length;i++)n.push(t.pieces_[i]);if(e instanceof j)for(let i=e.pieceNum_;i<e.pieces_.length;i++)n.push(e.pieces_[i]);else{const i=e.split("/");for(let s=0;s<i.length;s++)i[s].length>0&&n.push(i[s])}return new j(n,0)}function L(t){return t.pieceNum_>=t.pieces_.length}function ke(t,e){const n=P(t),i=P(e);if(n===null)return e;if(n===i)return ke(G(t),G(e));throw new Error("INTERNAL ERROR: innerPath ("+e+") is not within outerPath ("+t+")")}function II(t,e){const n=xs(t,0),i=xs(e,0);for(let s=0;s<n.length&&s<i.length;s++){const r=Qn(n[s],i[s]);if(r!==0)return r}return n.length===i.length?0:n.length<i.length?-1:1}function $l(t,e){if(ln(t)!==ln(e))return!1;for(let n=t.pieceNum_,i=e.pieceNum_;n<=t.pieces_.length;n++,i++)if(t.pieces_[n]!==e.pieces_[i])return!1;return!0}function qe(t,e){let n=t.pieceNum_,i=e.pieceNum_;if(ln(t)>ln(e))return!1;for(;n<t.pieces_.length;){if(t.pieces_[n]!==e.pieces_[i])return!1;++n,++i}return!0}class kI{constructor(e,n){this.errorPrefix_=n,this.parts_=xs(e,0),this.byteLength_=Math.max(1,this.parts_.length);for(let i=0;i<this.parts_.length;i++)this.byteLength_+=Bo(this.parts_[i]);$g(this)}}function RI(t,e){t.parts_.length>0&&(t.byteLength_+=1),t.parts_.push(e),t.byteLength_+=Bo(e),$g(t)}function AI(t){const e=t.parts_.pop();t.byteLength_-=Bo(e),t.parts_.length>0&&(t.byteLength_-=1)}function $g(t){if(t.byteLength_>Dh)throw new Error(t.errorPrefix_+"has a key path longer than "+Dh+" bytes ("+t.byteLength_+").");if(t.parts_.length>Oh)throw new Error(t.errorPrefix_+"path specified exceeds the maximum depth that can be written ("+Oh+") or object contains a cycle "+In(t))}function In(t){return t.parts_.length===0?"":"in property '"+t.parts_.join(".")+"'"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Bl extends Fg{static getInstance(){return new Bl}constructor(){super(["visible"]);let e,n;typeof document<"u"&&typeof document.addEventListener<"u"&&(typeof document.hidden<"u"?(n="visibilitychange",e="hidden"):typeof document.mozHidden<"u"?(n="mozvisibilitychange",e="mozHidden"):typeof document.msHidden<"u"?(n="msvisibilitychange",e="msHidden"):typeof document.webkitHidden<"u"&&(n="webkitvisibilitychange",e="webkitHidden")),this.visible_=!0,n&&document.addEventListener(n,()=>{const i=!document[e];i!==this.visible_&&(this.visible_=i,this.trigger("visible",i))},!1)}getInitialEvent(e){return g(e==="visible","Unknown event type: "+e),[this.visible_]}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const cs=1e3,NI=300*1e3,Mh=30*1e3,PI=1.3,LI=3e4,OI="server_kill",xh=3;class Mt extends xg{constructor(e,n,i,s,r,o,a,c){if(super(),this.repoInfo_=e,this.applicationId_=n,this.onDataUpdate_=i,this.onConnectStatus_=s,this.onServerInfoUpdate_=r,this.authTokenProvider_=o,this.appCheckTokenProvider_=a,this.authOverride_=c,this.id=Mt.nextPersistentConnectionId_++,this.log_=ir("p:"+this.id+":"),this.interruptReasons_={},this.listens=new Map,this.outstandingPuts_=[],this.outstandingGets_=[],this.outstandingPutCount_=0,this.outstandingGetCount_=0,this.onDisconnectRequestQueue_=[],this.connected_=!1,this.reconnectDelay_=cs,this.maxReconnectDelay_=NI,this.securityDebugCallback_=null,this.lastSessionId=null,this.establishConnectionTimer_=null,this.visible_=!1,this.requestCBHash_={},this.requestNumber_=0,this.realtime_=null,this.authToken_=null,this.appCheckToken_=null,this.forceTokenRefresh_=!1,this.invalidAuthTokenCount_=0,this.invalidAppCheckTokenCount_=0,this.firstConnection_=!0,this.lastConnectionAttemptTime_=null,this.lastConnectionEstablishedTime_=null,c)throw new Error("Auth override specified in options, but not supported on non Node.js platforms");Bl.getInstance().on("visible",this.onVisible_,this),e.host.indexOf("fblocal")===-1&&Xr.getInstance().on("online",this.onOnline_,this)}sendRequest(e,n,i){const s=++this.requestNumber_,r={r:s,a:e,b:n};this.log_(le(r)),g(this.connected_,"sendRequest call when we're not connected not allowed."),this.realtime_.sendRequest(r),i&&(this.requestCBHash_[s]=i)}get(e){this.initConnection_();const n=new Le,s={action:"g",request:{p:e._path.toString(),q:e._queryObject},onComplete:o=>{const a=o.d;o.s==="ok"?n.resolve(a):n.reject(a)}};this.outstandingGets_.push(s),this.outstandingGetCount_++;const r=this.outstandingGets_.length-1;return this.connected_&&this.sendGet_(r),n.promise}listen(e,n,i,s){this.initConnection_();const r=e._queryIdentifier,o=e._path.toString();this.log_("Listen called for "+o+" "+r),this.listens.has(o)||this.listens.set(o,new Map),g(e._queryParams.isDefault()||!e._queryParams.loadsAllData(),"listen() called for non-default but complete query"),g(!this.listens.get(o).has(r),"listen() called twice for same path/queryId.");const a={onComplete:s,hashFn:n,query:e,tag:i};this.listens.get(o).set(r,a),this.connected_&&this.sendListen_(a)}sendGet_(e){const n=this.outstandingGets_[e];this.sendRequest("g",n.request,i=>{delete this.outstandingGets_[e],this.outstandingGetCount_--,this.outstandingGetCount_===0&&(this.outstandingGets_=[]),n.onComplete&&n.onComplete(i)})}sendListen_(e){const n=e.query,i=n._path.toString(),s=n._queryIdentifier;this.log_("Listen on "+i+" for "+s);const r={p:i},o="q";e.tag&&(r.q=n._queryObject,r.t=e.tag),r.h=e.hashFn(),this.sendRequest(o,r,a=>{const c=a.d,l=a.s;Mt.warnOnListenWarnings_(c,n),(this.listens.get(i)&&this.listens.get(i).get(s))===e&&(this.log_("listen response",a),l!=="ok"&&this.removeListen_(i,s),e.onComplete&&e.onComplete(l,c))})}static warnOnListenWarnings_(e,n){if(e&&typeof e=="object"&&vt(e,"w")){const i=Ni(e,"w");if(Array.isArray(i)&&~i.indexOf("no_index")){const s='".indexOn": "'+n._queryParams.getIndex().toString()+'"',r=n._path.toString();Ae(`Using an unspecified index. Your data will be downloaded and filtered on the client. Consider adding ${s} at ${r} to your security rules for better performance.`)}}}refreshAuthToken(e){this.authToken_=e,this.log_("Auth token refreshed"),this.authToken_?this.tryAuth():this.connected_&&this.sendRequest("unauth",{},()=>{}),this.reduceReconnectDelayIfAdminCredential_(e)}reduceReconnectDelayIfAdminCredential_(e){(e&&e.length===40||yT(e))&&(this.log_("Admin auth credential detected.  Reducing max reconnect time."),this.maxReconnectDelay_=Mh)}refreshAppCheckToken(e){this.appCheckToken_=e,this.log_("App check token refreshed"),this.appCheckToken_?this.tryAppCheck():this.connected_&&this.sendRequest("unappeck",{},()=>{})}tryAuth(){if(this.connected_&&this.authToken_){const e=this.authToken_,n=_T(e)?"auth":"gauth",i={cred:e};this.authOverride_===null?i.noauth=!0:typeof this.authOverride_=="object"&&(i.authvar=this.authOverride_),this.sendRequest(n,i,s=>{const r=s.s,o=s.d||"error";this.authToken_===e&&(r==="ok"?this.invalidAuthTokenCount_=0:this.onAuthRevoked_(r,o))})}}tryAppCheck(){this.connected_&&this.appCheckToken_&&this.sendRequest("appcheck",{token:this.appCheckToken_},e=>{const n=e.s,i=e.d||"error";n==="ok"?this.invalidAppCheckTokenCount_=0:this.onAppCheckRevoked_(n,i)})}unlisten(e,n){const i=e._path.toString(),s=e._queryIdentifier;this.log_("Unlisten called for "+i+" "+s),g(e._queryParams.isDefault()||!e._queryParams.loadsAllData(),"unlisten() called for non-default but complete query"),this.removeListen_(i,s)&&this.connected_&&this.sendUnlisten_(i,s,e._queryObject,n)}sendUnlisten_(e,n,i,s){this.log_("Unlisten on "+e+" for "+n);const r={p:e},o="n";s&&(r.q=i,r.t=s),this.sendRequest(o,r)}onDisconnectPut(e,n,i){this.initConnection_(),this.connected_?this.sendOnDisconnect_("o",e,n,i):this.onDisconnectRequestQueue_.push({pathString:e,action:"o",data:n,onComplete:i})}onDisconnectMerge(e,n,i){this.initConnection_(),this.connected_?this.sendOnDisconnect_("om",e,n,i):this.onDisconnectRequestQueue_.push({pathString:e,action:"om",data:n,onComplete:i})}onDisconnectCancel(e,n){this.initConnection_(),this.connected_?this.sendOnDisconnect_("oc",e,null,n):this.onDisconnectRequestQueue_.push({pathString:e,action:"oc",data:null,onComplete:n})}sendOnDisconnect_(e,n,i,s){const r={p:n,d:i};this.log_("onDisconnect "+e,r),this.sendRequest(e,r,o=>{s&&setTimeout(()=>{s(o.s,o.d)},Math.floor(0))})}put(e,n,i,s){this.putInternal("p",e,n,i,s)}merge(e,n,i,s){this.putInternal("m",e,n,i,s)}putInternal(e,n,i,s,r){this.initConnection_();const o={p:n,d:i};r!==void 0&&(o.h=r),this.outstandingPuts_.push({action:e,request:o,onComplete:s}),this.outstandingPutCount_++;const a=this.outstandingPuts_.length-1;this.connected_?this.sendPut_(a):this.log_("Buffering put: "+n)}sendPut_(e){const n=this.outstandingPuts_[e].action,i=this.outstandingPuts_[e].request,s=this.outstandingPuts_[e].onComplete;this.outstandingPuts_[e].queued=this.connected_,this.sendRequest(n,i,r=>{this.log_(n+" response",r),delete this.outstandingPuts_[e],this.outstandingPutCount_--,this.outstandingPutCount_===0&&(this.outstandingPuts_=[]),s&&s(r.s,r.d)})}reportStats(e){if(this.connected_){const n={c:e};this.log_("reportStats",n),this.sendRequest("s",n,i=>{if(i.s!=="ok"){const r=i.d;this.log_("reportStats","Error sending stats: "+r)}})}}onDataMessage_(e){if("r"in e){this.log_("from server: "+le(e));const n=e.r,i=this.requestCBHash_[n];i&&(delete this.requestCBHash_[n],i(e.b))}else{if("error"in e)throw"A server-side error has occurred: "+e.error;"a"in e&&this.onDataPush_(e.a,e.b)}}onDataPush_(e,n){this.log_("handleServerMessage",e,n),e==="d"?this.onDataUpdate_(n.p,n.d,!1,n.t):e==="m"?this.onDataUpdate_(n.p,n.d,!0,n.t):e==="c"?this.onListenRevoked_(n.p,n.q):e==="ac"?this.onAuthRevoked_(n.s,n.d):e==="apc"?this.onAppCheckRevoked_(n.s,n.d):e==="sd"?this.onSecurityDebugPacket_(n):Pc("Unrecognized action received from server: "+le(e)+`
Are you using the latest client?`)}onReady_(e,n){this.log_("connection ready"),this.connected_=!0,this.lastConnectionEstablishedTime_=new Date().getTime(),this.handleTimestamp_(e),this.lastSessionId=n,this.firstConnection_&&this.sendConnectStats_(),this.restoreState_(),this.firstConnection_=!1,this.onConnectStatus_(!0)}scheduleConnect_(e){g(!this.realtime_,"Scheduling a connect when we're already connected/ing?"),this.establishConnectionTimer_&&clearTimeout(this.establishConnectionTimer_),this.establishConnectionTimer_=setTimeout(()=>{this.establishConnectionTimer_=null,this.establishConnection_()},Math.floor(e))}initConnection_(){!this.realtime_&&this.firstConnection_&&this.scheduleConnect_(0)}onVisible_(e){e&&!this.visible_&&this.reconnectDelay_===this.maxReconnectDelay_&&(this.log_("Window became visible.  Reducing delay."),this.reconnectDelay_=cs,this.realtime_||this.scheduleConnect_(0)),this.visible_=e}onOnline_(e){e?(this.log_("Browser went online."),this.reconnectDelay_=cs,this.realtime_||this.scheduleConnect_(0)):(this.log_("Browser went offline.  Killing connection."),this.realtime_&&this.realtime_.close())}onRealtimeDisconnect_(){if(this.log_("data client disconnected"),this.connected_=!1,this.realtime_=null,this.cancelSentTransactions_(),this.requestCBHash_={},this.shouldReconnect_()){this.visible_?this.lastConnectionEstablishedTime_&&(new Date().getTime()-this.lastConnectionEstablishedTime_>LI&&(this.reconnectDelay_=cs),this.lastConnectionEstablishedTime_=null):(this.log_("Window isn't visible.  Delaying reconnect."),this.reconnectDelay_=this.maxReconnectDelay_,this.lastConnectionAttemptTime_=new Date().getTime());const e=Math.max(0,new Date().getTime()-this.lastConnectionAttemptTime_);let n=Math.max(0,this.reconnectDelay_-e);n=Math.random()*n,this.log_("Trying to reconnect in "+n+"ms"),this.scheduleConnect_(n),this.reconnectDelay_=Math.min(this.maxReconnectDelay_,this.reconnectDelay_*PI)}this.onConnectStatus_(!1)}async establishConnection_(){if(this.shouldReconnect_()){this.log_("Making a connection attempt"),this.lastConnectionAttemptTime_=new Date().getTime(),this.lastConnectionEstablishedTime_=null;const e=this.onDataMessage_.bind(this),n=this.onReady_.bind(this),i=this.onRealtimeDisconnect_.bind(this),s=this.id+":"+Mt.nextConnectionId_++,r=this.lastSessionId;let o=!1,a=null;const c=function(){a?a.close():(o=!0,i())},l=function(d){g(a,"sendRequest call when we're not connected not allowed."),a.sendRequest(d)};this.realtime_={close:c,sendRequest:l};const u=this.forceTokenRefresh_;this.forceTokenRefresh_=!1;try{const[d,h]=await Promise.all([this.authTokenProvider_.getToken(u),this.appCheckTokenProvider_.getToken(u)]);o?pe("getToken() completed but was canceled"):(pe("getToken() completed. Creating connection."),this.authToken_=d&&d.accessToken,this.appCheckToken_=h&&h.token,a=new TI(s,this.repoInfo_,this.applicationId_,this.appCheckToken_,this.authToken_,e,n,i,f=>{Ae(f+" ("+this.repoInfo_.toString()+")"),this.interrupt(OI)},r))}catch(d){this.log_("Failed to get token: "+d),o||(this.repoInfo_.nodeAdmin&&Ae(d),c())}}}interrupt(e){pe("Interrupting connection for reason: "+e),this.interruptReasons_[e]=!0,this.realtime_?this.realtime_.close():(this.establishConnectionTimer_&&(clearTimeout(this.establishConnectionTimer_),this.establishConnectionTimer_=null),this.connected_&&this.onRealtimeDisconnect_())}resume(e){pe("Resuming connection for reason: "+e),delete this.interruptReasons_[e],Gr(this.interruptReasons_)&&(this.reconnectDelay_=cs,this.realtime_||this.scheduleConnect_(0))}handleTimestamp_(e){const n=e-new Date().getTime();this.onServerInfoUpdate_({serverTimeOffset:n})}cancelSentTransactions_(){for(let e=0;e<this.outstandingPuts_.length;e++){const n=this.outstandingPuts_[e];n&&"h"in n.request&&n.queued&&(n.onComplete&&n.onComplete("disconnect"),delete this.outstandingPuts_[e],this.outstandingPutCount_--)}this.outstandingPutCount_===0&&(this.outstandingPuts_=[])}onListenRevoked_(e,n){let i;n?i=n.map(r=>Dl(r)).join("$"):i="default";const s=this.removeListen_(e,i);s&&s.onComplete&&s.onComplete("permission_denied")}removeListen_(e,n){const i=new j(e).toString();let s;if(this.listens.has(i)){const r=this.listens.get(i);s=r.get(n),r.delete(n),r.size===0&&this.listens.delete(i)}else s=void 0;return s}onAuthRevoked_(e,n){pe("Auth token revoked: "+e+"/"+n),this.authToken_=null,this.forceTokenRefresh_=!0,this.realtime_.close(),(e==="invalid_token"||e==="permission_denied")&&(this.invalidAuthTokenCount_++,this.invalidAuthTokenCount_>=xh&&(this.reconnectDelay_=Mh,this.authTokenProvider_.notifyForInvalidToken()))}onAppCheckRevoked_(e,n){pe("App check token revoked: "+e+"/"+n),this.appCheckToken_=null,this.forceTokenRefresh_=!0,(e==="invalid_token"||e==="permission_denied")&&(this.invalidAppCheckTokenCount_++,this.invalidAppCheckTokenCount_>=xh&&this.appCheckTokenProvider_.notifyForInvalidToken())}onSecurityDebugPacket_(e){this.securityDebugCallback_?this.securityDebugCallback_(e):"msg"in e&&console.log("FIREBASE: "+e.msg.replace(`
`,`
FIREBASE: `))}restoreState_(){this.tryAuth(),this.tryAppCheck();for(const e of this.listens.values())for(const n of e.values())this.sendListen_(n);for(let e=0;e<this.outstandingPuts_.length;e++)this.outstandingPuts_[e]&&this.sendPut_(e);for(;this.onDisconnectRequestQueue_.length;){const e=this.onDisconnectRequestQueue_.shift();this.sendOnDisconnect_(e.action,e.pathString,e.data,e.onComplete)}for(let e=0;e<this.outstandingGets_.length;e++)this.outstandingGets_[e]&&this.sendGet_(e)}sendConnectStats_(){const e={};let n="js";e["sdk."+n+"."+gg.replace(/\./g,"-")]=1,Ll()?e["framework.cordova"]=1:ag()&&(e["framework.reactnative"]=1),this.reportStats(e)}shouldReconnect_(){const e=Xr.getInstance().currentlyOnline();return Gr(this.interruptReasons_)&&e}}Mt.nextPersistentConnectionId_=0;Mt.nextConnectionId_=0;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
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
 */class qo{getCompare(){return this.compare.bind(this)}indexedValueChanged(e,n){const i=new O(Li,e),s=new O(Li,n);return this.compare(i,s)!==0}minPost(){return O.MIN}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let yr;class Bg extends qo{static get __EMPTY_NODE(){return yr}static set __EMPTY_NODE(e){yr=e}compare(e,n){return Qn(e.name,n.name)}isDefinedOn(e){throw qi("KeyIndex.isDefinedOn not expected to be called.")}indexedValueChanged(e,n){return!1}minPost(){return O.MIN}maxPost(){return new O($n,yr)}makePost(e,n){return g(typeof e=="string","KeyIndex indexValue must always be a string."),new O(e,yr)}toString(){return".key"}}const hi=new Bg;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class wr{constructor(e,n,i,s,r=null){this.isReverse_=s,this.resultGenerator_=r,this.nodeStack_=[];let o=1;for(;!e.isEmpty();)if(e=e,o=n?i(e.key,n):1,s&&(o*=-1),o<0)this.isReverse_?e=e.left:e=e.right;else if(o===0){this.nodeStack_.push(e);break}else this.nodeStack_.push(e),this.isReverse_?e=e.right:e=e.left}getNext(){if(this.nodeStack_.length===0)return null;let e=this.nodeStack_.pop(),n;if(this.resultGenerator_?n=this.resultGenerator_(e.key,e.value):n={key:e.key,value:e.value},this.isReverse_)for(e=e.left;!e.isEmpty();)this.nodeStack_.push(e),e=e.right;else for(e=e.right;!e.isEmpty();)this.nodeStack_.push(e),e=e.left;return n}hasNext(){return this.nodeStack_.length>0}peek(){if(this.nodeStack_.length===0)return null;const e=this.nodeStack_[this.nodeStack_.length-1];return this.resultGenerator_?this.resultGenerator_(e.key,e.value):{key:e.key,value:e.value}}}class fe{constructor(e,n,i,s,r){this.key=e,this.value=n,this.color=i??fe.RED,this.left=s??De.EMPTY_NODE,this.right=r??De.EMPTY_NODE}copy(e,n,i,s,r){return new fe(e??this.key,n??this.value,i??this.color,s??this.left,r??this.right)}count(){return this.left.count()+1+this.right.count()}isEmpty(){return!1}inorderTraversal(e){return this.left.inorderTraversal(e)||!!e(this.key,this.value)||this.right.inorderTraversal(e)}reverseTraversal(e){return this.right.reverseTraversal(e)||e(this.key,this.value)||this.left.reverseTraversal(e)}min_(){return this.left.isEmpty()?this:this.left.min_()}minKey(){return this.min_().key}maxKey(){return this.right.isEmpty()?this.key:this.right.maxKey()}insert(e,n,i){let s=this;const r=i(e,s.key);return r<0?s=s.copy(null,null,null,s.left.insert(e,n,i),null):r===0?s=s.copy(null,n,null,null,null):s=s.copy(null,null,null,null,s.right.insert(e,n,i)),s.fixUp_()}removeMin_(){if(this.left.isEmpty())return De.EMPTY_NODE;let e=this;return!e.left.isRed_()&&!e.left.left.isRed_()&&(e=e.moveRedLeft_()),e=e.copy(null,null,null,e.left.removeMin_(),null),e.fixUp_()}remove(e,n){let i,s;if(i=this,n(e,i.key)<0)!i.left.isEmpty()&&!i.left.isRed_()&&!i.left.left.isRed_()&&(i=i.moveRedLeft_()),i=i.copy(null,null,null,i.left.remove(e,n),null);else{if(i.left.isRed_()&&(i=i.rotateRight_()),!i.right.isEmpty()&&!i.right.isRed_()&&!i.right.left.isRed_()&&(i=i.moveRedRight_()),n(e,i.key)===0){if(i.right.isEmpty())return De.EMPTY_NODE;s=i.right.min_(),i=i.copy(s.key,s.value,null,null,i.right.removeMin_())}i=i.copy(null,null,null,null,i.right.remove(e,n))}return i.fixUp_()}isRed_(){return this.color}fixUp_(){let e=this;return e.right.isRed_()&&!e.left.isRed_()&&(e=e.rotateLeft_()),e.left.isRed_()&&e.left.left.isRed_()&&(e=e.rotateRight_()),e.left.isRed_()&&e.right.isRed_()&&(e=e.colorFlip_()),e}moveRedLeft_(){let e=this.colorFlip_();return e.right.left.isRed_()&&(e=e.copy(null,null,null,null,e.right.rotateRight_()),e=e.rotateLeft_(),e=e.colorFlip_()),e}moveRedRight_(){let e=this.colorFlip_();return e.left.left.isRed_()&&(e=e.rotateRight_(),e=e.colorFlip_()),e}rotateLeft_(){const e=this.copy(null,null,fe.RED,null,this.right.left);return this.right.copy(null,null,this.color,e,null)}rotateRight_(){const e=this.copy(null,null,fe.RED,this.left.right,null);return this.left.copy(null,null,this.color,null,e)}colorFlip_(){const e=this.left.copy(null,null,!this.left.color,null,null),n=this.right.copy(null,null,!this.right.color,null,null);return this.copy(null,null,!this.color,e,n)}checkMaxDepth_(){const e=this.check_();return Math.pow(2,e)<=this.count()+1}check_(){if(this.isRed_()&&this.left.isRed_())throw new Error("Red node has red child("+this.key+","+this.value+")");if(this.right.isRed_())throw new Error("Right child of ("+this.key+","+this.value+") is red");const e=this.left.check_();if(e!==this.right.check_())throw new Error("Black depths differ");return e+(this.isRed_()?0:1)}}fe.RED=!0;fe.BLACK=!1;class DI{copy(e,n,i,s,r){return this}insert(e,n,i){return new fe(e,n,null)}remove(e,n){return this}count(){return 0}isEmpty(){return!0}inorderTraversal(e){return!1}reverseTraversal(e){return!1}minKey(){return null}maxKey(){return null}check_(){return 0}isRed_(){return!1}}class De{constructor(e,n=De.EMPTY_NODE){this.comparator_=e,this.root_=n}insert(e,n){return new De(this.comparator_,this.root_.insert(e,n,this.comparator_).copy(null,null,fe.BLACK,null,null))}remove(e){return new De(this.comparator_,this.root_.remove(e,this.comparator_).copy(null,null,fe.BLACK,null,null))}get(e){let n,i=this.root_;for(;!i.isEmpty();){if(n=this.comparator_(e,i.key),n===0)return i.value;n<0?i=i.left:n>0&&(i=i.right)}return null}getPredecessorKey(e){let n,i=this.root_,s=null;for(;!i.isEmpty();)if(n=this.comparator_(e,i.key),n===0){if(i.left.isEmpty())return s?s.key:null;for(i=i.left;!i.right.isEmpty();)i=i.right;return i.key}else n<0?i=i.left:n>0&&(s=i,i=i.right);throw new Error("Attempted to find predecessor key for a nonexistent key.  What gives?")}isEmpty(){return this.root_.isEmpty()}count(){return this.root_.count()}minKey(){return this.root_.minKey()}maxKey(){return this.root_.maxKey()}inorderTraversal(e){return this.root_.inorderTraversal(e)}reverseTraversal(e){return this.root_.reverseTraversal(e)}getIterator(e){return new wr(this.root_,null,this.comparator_,!1,e)}getIteratorFrom(e,n){return new wr(this.root_,e,this.comparator_,!1,n)}getReverseIteratorFrom(e,n){return new wr(this.root_,e,this.comparator_,!0,n)}getReverseIterator(e){return new wr(this.root_,null,this.comparator_,!0,e)}}De.EMPTY_NODE=new DI;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function MI(t,e){return Qn(t.name,e.name)}function Hl(t,e){return Qn(t,e)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Oc;function xI(t){Oc=t}const Hg=function(t){return typeof t=="number"?"number:"+wg(t):"string:"+t},Vg=function(t){if(t.isLeafNode()){const e=t.val();g(typeof e=="string"||typeof e=="number"||typeof e=="object"&&vt(e,".sv"),"Priority must be a string or number.")}else g(t===Oc||t.isEmpty(),"priority of unexpected type.");g(t===Oc||t.getPriority().isEmpty(),"Priority nodes can't have a priority of their own.")};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Fh;class he{static set __childrenNodeConstructor(e){Fh=e}static get __childrenNodeConstructor(){return Fh}constructor(e,n=he.__childrenNodeConstructor.EMPTY_NODE){this.value_=e,this.priorityNode_=n,this.lazyHash_=null,g(this.value_!==void 0&&this.value_!==null,"LeafNode shouldn't be created with null/undefined value."),Vg(this.priorityNode_)}isLeafNode(){return!0}getPriority(){return this.priorityNode_}updatePriority(e){return new he(this.value_,e)}getImmediateChild(e){return e===".priority"?this.priorityNode_:he.__childrenNodeConstructor.EMPTY_NODE}getChild(e){return L(e)?this:P(e)===".priority"?this.priorityNode_:he.__childrenNodeConstructor.EMPTY_NODE}hasChild(){return!1}getPredecessorChildName(e,n){return null}updateImmediateChild(e,n){return e===".priority"?this.updatePriority(n):n.isEmpty()&&e!==".priority"?this:he.__childrenNodeConstructor.EMPTY_NODE.updateImmediateChild(e,n).updatePriority(this.priorityNode_)}updateChild(e,n){const i=P(e);return i===null?n:n.isEmpty()&&i!==".priority"?this:(g(i!==".priority"||ln(e)===1,".priority must be the last token in a path"),this.updateImmediateChild(i,he.__childrenNodeConstructor.EMPTY_NODE.updateChild(G(e),n)))}isEmpty(){return!1}numChildren(){return 0}forEachChild(e,n){return!1}val(e){return e&&!this.getPriority().isEmpty()?{".value":this.getValue(),".priority":this.getPriority().val()}:this.getValue()}hash(){if(this.lazyHash_===null){let e="";this.priorityNode_.isEmpty()||(e+="priority:"+Hg(this.priorityNode_.val())+":");const n=typeof this.value_;e+=n+":",n==="number"?e+=wg(this.value_):e+=this.value_,this.lazyHash_=_g(e)}return this.lazyHash_}getValue(){return this.value_}compareTo(e){return e===he.__childrenNodeConstructor.EMPTY_NODE?1:e instanceof he.__childrenNodeConstructor?-1:(g(e.isLeafNode(),"Unknown node type"),this.compareToLeafNode_(e))}compareToLeafNode_(e){const n=typeof e.value_,i=typeof this.value_,s=he.VALUE_TYPE_ORDER.indexOf(n),r=he.VALUE_TYPE_ORDER.indexOf(i);return g(s>=0,"Unknown leaf type: "+n),g(r>=0,"Unknown leaf type: "+i),s===r?i==="object"?0:this.value_<e.value_?-1:this.value_===e.value_?0:1:r-s}withIndex(){return this}isIndexed(){return!0}equals(e){if(e===this)return!0;if(e.isLeafNode()){const n=e;return this.value_===n.value_&&this.priorityNode_.equals(n.priorityNode_)}else return!1}}he.VALUE_TYPE_ORDER=["object","boolean","number","string"];/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Wg,jg;function FI(t){Wg=t}function UI(t){jg=t}class $I extends qo{compare(e,n){const i=e.node.getPriority(),s=n.node.getPriority(),r=i.compareTo(s);return r===0?Qn(e.name,n.name):r}isDefinedOn(e){return!e.getPriority().isEmpty()}indexedValueChanged(e,n){return!e.getPriority().equals(n.getPriority())}minPost(){return O.MIN}maxPost(){return new O($n,new he("[PRIORITY-POST]",jg))}makePost(e,n){const i=Wg(e);return new O(n,new he("[PRIORITY-POST]",i))}toString(){return".priority"}}const te=new $I;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const BI=Math.log(2);class HI{constructor(e){const n=r=>parseInt(Math.log(r)/BI,10),i=r=>parseInt(Array(r+1).join("1"),2);this.count=n(e+1),this.current_=this.count-1;const s=i(this.count);this.bits_=e+1&s}nextBitIsOne(){const e=!(this.bits_&1<<this.current_);return this.current_--,e}}const Qr=function(t,e,n,i){t.sort(e);const s=function(c,l){const u=l-c;let d,h;if(u===0)return null;if(u===1)return d=t[c],h=n?n(d):d,new fe(h,d.node,fe.BLACK,null,null);{const f=parseInt(u/2,10)+c,p=s(c,f),_=s(f+1,l);return d=t[f],h=n?n(d):d,new fe(h,d.node,fe.BLACK,p,_)}},r=function(c){let l=null,u=null,d=t.length;const h=function(p,_){const m=d-p,R=d;d-=p;const M=s(m+1,R),$=t[m],S=n?n($):$;f(new fe(S,$.node,_,null,M))},f=function(p){l?(l.left=p,l=p):(u=p,l=p)};for(let p=0;p<c.count;++p){const _=c.nextBitIsOne(),m=Math.pow(2,c.count-(p+1));_?h(m,fe.BLACK):(h(m,fe.BLACK),h(m,fe.RED))}return u},o=new HI(t.length),a=r(o);return new De(i||e,a)};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Ba;const si={};class It{static get Default(){return g(si&&te,"ChildrenNode.ts has not been loaded"),Ba=Ba||new It({".priority":si},{".priority":te}),Ba}constructor(e,n){this.indexes_=e,this.indexSet_=n}get(e){const n=Ni(this.indexes_,e);if(!n)throw new Error("No index defined for "+e);return n instanceof De?n:null}hasIndex(e){return vt(this.indexSet_,e.toString())}addIndex(e,n){g(e!==hi,"KeyIndex always exists and isn't meant to be added to the IndexMap.");const i=[];let s=!1;const r=n.getIterator(O.Wrap);let o=r.getNext();for(;o;)s=s||e.isDefinedOn(o.node),i.push(o),o=r.getNext();let a;s?a=Qr(i,e.getCompare()):a=si;const c=e.toString(),l={...this.indexSet_};l[c]=e;const u={...this.indexes_};return u[c]=a,new It(u,l)}addToIndexes(e,n){const i=Kr(this.indexes_,(s,r)=>{const o=Ni(this.indexSet_,r);if(g(o,"Missing index implementation for "+r),s===si)if(o.isDefinedOn(e.node)){const a=[],c=n.getIterator(O.Wrap);let l=c.getNext();for(;l;)l.name!==e.name&&a.push(l),l=c.getNext();return a.push(e),Qr(a,o.getCompare())}else return si;else{const a=n.get(e.name);let c=s;return a&&(c=c.remove(new O(e.name,a))),c.insert(e,e.node)}});return new It(i,this.indexSet_)}removeFromIndexes(e,n){const i=Kr(this.indexes_,s=>{if(s===si)return s;{const r=n.get(e.name);return r?s.remove(new O(e.name,r)):s}});return new It(i,this.indexSet_)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let ls;class C{static get EMPTY_NODE(){return ls||(ls=new C(new De(Hl),null,It.Default))}constructor(e,n,i){this.children_=e,this.priorityNode_=n,this.indexMap_=i,this.lazyHash_=null,this.priorityNode_&&Vg(this.priorityNode_),this.children_.isEmpty()&&g(!this.priorityNode_||this.priorityNode_.isEmpty(),"An empty node cannot have a priority")}isLeafNode(){return!1}getPriority(){return this.priorityNode_||ls}updatePriority(e){return this.children_.isEmpty()?this:new C(this.children_,e,this.indexMap_)}getImmediateChild(e){if(e===".priority")return this.getPriority();{const n=this.children_.get(e);return n===null?ls:n}}getChild(e){const n=P(e);return n===null?this:this.getImmediateChild(n).getChild(G(e))}hasChild(e){return this.children_.get(e)!==null}updateImmediateChild(e,n){if(g(n,"We should always be passing snapshot nodes"),e===".priority")return this.updatePriority(n);{const i=new O(e,n);let s,r;n.isEmpty()?(s=this.children_.remove(e),r=this.indexMap_.removeFromIndexes(i,this.children_)):(s=this.children_.insert(e,n),r=this.indexMap_.addToIndexes(i,this.children_));const o=s.isEmpty()?ls:this.priorityNode_;return new C(s,o,r)}}updateChild(e,n){const i=P(e);if(i===null)return n;{g(P(e)!==".priority"||ln(e)===1,".priority must be the last token in a path");const s=this.getImmediateChild(i).updateChild(G(e),n);return this.updateImmediateChild(i,s)}}isEmpty(){return this.children_.isEmpty()}numChildren(){return this.children_.count()}val(e){if(this.isEmpty())return null;const n={};let i=0,s=0,r=!0;if(this.forEachChild(te,(o,a)=>{n[o]=a.val(e),i++,r&&C.INTEGER_REGEXP_.test(o)?s=Math.max(s,Number(o)):r=!1}),!e&&r&&s<2*i){const o=[];for(const a in n)o[a]=n[a];return o}else return e&&!this.getPriority().isEmpty()&&(n[".priority"]=this.getPriority().val()),n}hash(){if(this.lazyHash_===null){let e="";this.getPriority().isEmpty()||(e+="priority:"+Hg(this.getPriority().val())+":"),this.forEachChild(te,(n,i)=>{const s=i.hash();s!==""&&(e+=":"+n+":"+s)}),this.lazyHash_=e===""?"":_g(e)}return this.lazyHash_}getPredecessorChildName(e,n,i){const s=this.resolveIndex_(i);if(s){const r=s.getPredecessorKey(new O(e,n));return r?r.name:null}else return this.children_.getPredecessorKey(e)}getFirstChildName(e){const n=this.resolveIndex_(e);if(n){const i=n.minKey();return i&&i.name}else return this.children_.minKey()}getFirstChild(e){const n=this.getFirstChildName(e);return n?new O(n,this.children_.get(n)):null}getLastChildName(e){const n=this.resolveIndex_(e);if(n){const i=n.maxKey();return i&&i.name}else return this.children_.maxKey()}getLastChild(e){const n=this.getLastChildName(e);return n?new O(n,this.children_.get(n)):null}forEachChild(e,n){const i=this.resolveIndex_(e);return i?i.inorderTraversal(s=>n(s.name,s.node)):this.children_.inorderTraversal(n)}getIterator(e){return this.getIteratorFrom(e.minPost(),e)}getIteratorFrom(e,n){const i=this.resolveIndex_(n);if(i)return i.getIteratorFrom(e,s=>s);{const s=this.children_.getIteratorFrom(e.name,O.Wrap);let r=s.peek();for(;r!=null&&n.compare(r,e)<0;)s.getNext(),r=s.peek();return s}}getReverseIterator(e){return this.getReverseIteratorFrom(e.maxPost(),e)}getReverseIteratorFrom(e,n){const i=this.resolveIndex_(n);if(i)return i.getReverseIteratorFrom(e,s=>s);{const s=this.children_.getReverseIteratorFrom(e.name,O.Wrap);let r=s.peek();for(;r!=null&&n.compare(r,e)>0;)s.getNext(),r=s.peek();return s}}compareTo(e){return this.isEmpty()?e.isEmpty()?0:-1:e.isLeafNode()||e.isEmpty()?1:e===sr?-1:0}withIndex(e){if(e===hi||this.indexMap_.hasIndex(e))return this;{const n=this.indexMap_.addIndex(e,this.children_);return new C(this.children_,this.priorityNode_,n)}}isIndexed(e){return e===hi||this.indexMap_.hasIndex(e)}equals(e){if(e===this)return!0;if(e.isLeafNode())return!1;{const n=e;if(this.getPriority().equals(n.getPriority()))if(this.children_.count()===n.children_.count()){const i=this.getIterator(te),s=n.getIterator(te);let r=i.getNext(),o=s.getNext();for(;r&&o;){if(r.name!==o.name||!r.node.equals(o.node))return!1;r=i.getNext(),o=s.getNext()}return r===null&&o===null}else return!1;else return!1}}resolveIndex_(e){return e===hi?null:this.indexMap_.get(e.toString())}}C.INTEGER_REGEXP_=/^(0|[1-9]\d*)$/;class VI extends C{constructor(){super(new De(Hl),C.EMPTY_NODE,It.Default)}compareTo(e){return e===this?0:1}equals(e){return e===this}getPriority(){return this}getImmediateChild(e){return C.EMPTY_NODE}isEmpty(){return!1}}const sr=new VI;Object.defineProperties(O,{MIN:{value:new O(Li,C.EMPTY_NODE)},MAX:{value:new O($n,sr)}});Bg.__EMPTY_NODE=C.EMPTY_NODE;he.__childrenNodeConstructor=C;xI(sr);UI(sr);/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const WI=!0;function ie(t,e=null){if(t===null)return C.EMPTY_NODE;if(typeof t=="object"&&".priority"in t&&(e=t[".priority"]),g(e===null||typeof e=="string"||typeof e=="number"||typeof e=="object"&&".sv"in e,"Invalid priority type found: "+typeof e),typeof t=="object"&&".value"in t&&t[".value"]!==null&&(t=t[".value"]),typeof t!="object"||".sv"in t){const n=t;return new he(n,ie(e))}if(!(t instanceof Array)&&WI){const n=[];let i=!1;if(ye(t,(o,a)=>{if(o.substring(0,1)!=="."){const c=ie(a);c.isEmpty()||(i=i||!c.getPriority().isEmpty(),n.push(new O(o,c)))}}),n.length===0)return C.EMPTY_NODE;const r=Qr(n,MI,o=>o.name,Hl);if(i){const o=Qr(n,te.getCompare());return new C(r,ie(e),new It({".priority":o},{".priority":te}))}else return new C(r,ie(e),It.Default)}else{let n=C.EMPTY_NODE;return ye(t,(i,s)=>{if(vt(t,i)&&i.substring(0,1)!=="."){const r=ie(s);(r.isLeafNode()||!r.isEmpty())&&(n=n.updateImmediateChild(i,r))}}),n.updatePriority(ie(e))}}FI(ie);/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class jI extends qo{constructor(e){super(),this.indexPath_=e,g(!L(e)&&P(e)!==".priority","Can't create PathIndex with empty path or .priority key")}extractChild(e){return e.getChild(this.indexPath_)}isDefinedOn(e){return!e.getChild(this.indexPath_).isEmpty()}compare(e,n){const i=this.extractChild(e.node),s=this.extractChild(n.node),r=i.compareTo(s);return r===0?Qn(e.name,n.name):r}makePost(e,n){const i=ie(e),s=C.EMPTY_NODE.updateChild(this.indexPath_,i);return new O(n,s)}maxPost(){const e=C.EMPTY_NODE.updateChild(this.indexPath_,sr);return new O($n,e)}toString(){return xs(this.indexPath_,0).join("/")}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class qI extends qo{compare(e,n){const i=e.node.compareTo(n.node);return i===0?Qn(e.name,n.name):i}isDefinedOn(e){return!0}indexedValueChanged(e,n){return!e.equals(n)}minPost(){return O.MIN}maxPost(){return O.MAX}makePost(e,n){const i=ie(e);return new O(n,i)}toString(){return".value"}}const zI=new qI;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function qg(t){return{type:"value",snapshotNode:t}}function Oi(t,e){return{type:"child_added",snapshotNode:e,childName:t}}function Fs(t,e){return{type:"child_removed",snapshotNode:e,childName:t}}function Us(t,e,n){return{type:"child_changed",snapshotNode:e,childName:t,oldSnap:n}}function GI(t,e){return{type:"child_moved",snapshotNode:e,childName:t}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Vl{constructor(e){this.index_=e}updateChild(e,n,i,s,r,o){g(e.isIndexed(this.index_),"A node must be indexed if only a child is updated");const a=e.getImmediateChild(n);return a.getChild(s).equals(i.getChild(s))&&a.isEmpty()===i.isEmpty()||(o!=null&&(i.isEmpty()?e.hasChild(n)?o.trackChildChange(Fs(n,a)):g(e.isLeafNode(),"A child remove without an old child only makes sense on a leaf node"):a.isEmpty()?o.trackChildChange(Oi(n,i)):o.trackChildChange(Us(n,i,a))),e.isLeafNode()&&i.isEmpty())?e:e.updateImmediateChild(n,i).withIndex(this.index_)}updateFullNode(e,n,i){return i!=null&&(e.isLeafNode()||e.forEachChild(te,(s,r)=>{n.hasChild(s)||i.trackChildChange(Fs(s,r))}),n.isLeafNode()||n.forEachChild(te,(s,r)=>{if(e.hasChild(s)){const o=e.getImmediateChild(s);o.equals(r)||i.trackChildChange(Us(s,r,o))}else i.trackChildChange(Oi(s,r))})),n.withIndex(this.index_)}updatePriority(e,n){return e.isEmpty()?C.EMPTY_NODE:e.updatePriority(n)}filtersNodes(){return!1}getIndexedFilter(){return this}getIndex(){return this.index_}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class $s{constructor(e){this.indexedFilter_=new Vl(e.getIndex()),this.index_=e.getIndex(),this.startPost_=$s.getStartPost_(e),this.endPost_=$s.getEndPost_(e),this.startIsInclusive_=!e.startAfterSet_,this.endIsInclusive_=!e.endBeforeSet_}getStartPost(){return this.startPost_}getEndPost(){return this.endPost_}matches(e){const n=this.startIsInclusive_?this.index_.compare(this.getStartPost(),e)<=0:this.index_.compare(this.getStartPost(),e)<0,i=this.endIsInclusive_?this.index_.compare(e,this.getEndPost())<=0:this.index_.compare(e,this.getEndPost())<0;return n&&i}updateChild(e,n,i,s,r,o){return this.matches(new O(n,i))||(i=C.EMPTY_NODE),this.indexedFilter_.updateChild(e,n,i,s,r,o)}updateFullNode(e,n,i){n.isLeafNode()&&(n=C.EMPTY_NODE);let s=n.withIndex(this.index_);s=s.updatePriority(C.EMPTY_NODE);const r=this;return n.forEachChild(te,(o,a)=>{r.matches(new O(o,a))||(s=s.updateImmediateChild(o,C.EMPTY_NODE))}),this.indexedFilter_.updateFullNode(e,s,i)}updatePriority(e,n){return e}filtersNodes(){return!0}getIndexedFilter(){return this.indexedFilter_}getIndex(){return this.index_}static getStartPost_(e){if(e.hasStart()){const n=e.getIndexStartName();return e.getIndex().makePost(e.getIndexStartValue(),n)}else return e.getIndex().minPost()}static getEndPost_(e){if(e.hasEnd()){const n=e.getIndexEndName();return e.getIndex().makePost(e.getIndexEndValue(),n)}else return e.getIndex().maxPost()}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class KI{constructor(e){this.withinDirectionalStart=n=>this.reverse_?this.withinEndPost(n):this.withinStartPost(n),this.withinDirectionalEnd=n=>this.reverse_?this.withinStartPost(n):this.withinEndPost(n),this.withinStartPost=n=>{const i=this.index_.compare(this.rangedFilter_.getStartPost(),n);return this.startIsInclusive_?i<=0:i<0},this.withinEndPost=n=>{const i=this.index_.compare(n,this.rangedFilter_.getEndPost());return this.endIsInclusive_?i<=0:i<0},this.rangedFilter_=new $s(e),this.index_=e.getIndex(),this.limit_=e.getLimit(),this.reverse_=!e.isViewFromLeft(),this.startIsInclusive_=!e.startAfterSet_,this.endIsInclusive_=!e.endBeforeSet_}updateChild(e,n,i,s,r,o){return this.rangedFilter_.matches(new O(n,i))||(i=C.EMPTY_NODE),e.getImmediateChild(n).equals(i)?e:e.numChildren()<this.limit_?this.rangedFilter_.getIndexedFilter().updateChild(e,n,i,s,r,o):this.fullLimitUpdateChild_(e,n,i,r,o)}updateFullNode(e,n,i){let s;if(n.isLeafNode()||n.isEmpty())s=C.EMPTY_NODE.withIndex(this.index_);else if(this.limit_*2<n.numChildren()&&n.isIndexed(this.index_)){s=C.EMPTY_NODE.withIndex(this.index_);let r;this.reverse_?r=n.getReverseIteratorFrom(this.rangedFilter_.getEndPost(),this.index_):r=n.getIteratorFrom(this.rangedFilter_.getStartPost(),this.index_);let o=0;for(;r.hasNext()&&o<this.limit_;){const a=r.getNext();if(this.withinDirectionalStart(a))if(this.withinDirectionalEnd(a))s=s.updateImmediateChild(a.name,a.node),o++;else break;else continue}}else{s=n.withIndex(this.index_),s=s.updatePriority(C.EMPTY_NODE);let r;this.reverse_?r=s.getReverseIterator(this.index_):r=s.getIterator(this.index_);let o=0;for(;r.hasNext();){const a=r.getNext();o<this.limit_&&this.withinDirectionalStart(a)&&this.withinDirectionalEnd(a)?o++:s=s.updateImmediateChild(a.name,C.EMPTY_NODE)}}return this.rangedFilter_.getIndexedFilter().updateFullNode(e,s,i)}updatePriority(e,n){return e}filtersNodes(){return!0}getIndexedFilter(){return this.rangedFilter_.getIndexedFilter()}getIndex(){return this.index_}fullLimitUpdateChild_(e,n,i,s,r){let o;if(this.reverse_){const d=this.index_.getCompare();o=(h,f)=>d(f,h)}else o=this.index_.getCompare();const a=e;g(a.numChildren()===this.limit_,"");const c=new O(n,i),l=this.reverse_?a.getFirstChild(this.index_):a.getLastChild(this.index_),u=this.rangedFilter_.matches(c);if(a.hasChild(n)){const d=a.getImmediateChild(n);let h=s.getChildAfterChild(this.index_,l,this.reverse_);for(;h!=null&&(h.name===n||a.hasChild(h.name));)h=s.getChildAfterChild(this.index_,h,this.reverse_);const f=h==null?1:o(h,c);if(u&&!i.isEmpty()&&f>=0)return r?.trackChildChange(Us(n,i,d)),a.updateImmediateChild(n,i);{r?.trackChildChange(Fs(n,d));const _=a.updateImmediateChild(n,C.EMPTY_NODE);return h!=null&&this.rangedFilter_.matches(h)?(r?.trackChildChange(Oi(h.name,h.node)),_.updateImmediateChild(h.name,h.node)):_}}else return i.isEmpty()?e:u&&o(l,c)>=0?(r!=null&&(r.trackChildChange(Fs(l.name,l.node)),r.trackChildChange(Oi(n,i))),a.updateImmediateChild(n,i).updateImmediateChild(l.name,C.EMPTY_NODE)):e}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Wl{constructor(){this.limitSet_=!1,this.startSet_=!1,this.startNameSet_=!1,this.startAfterSet_=!1,this.endSet_=!1,this.endNameSet_=!1,this.endBeforeSet_=!1,this.limit_=0,this.viewFrom_="",this.indexStartValue_=null,this.indexStartName_="",this.indexEndValue_=null,this.indexEndName_="",this.index_=te}hasStart(){return this.startSet_}isViewFromLeft(){return this.viewFrom_===""?this.startSet_:this.viewFrom_==="l"}getIndexStartValue(){return g(this.startSet_,"Only valid if start has been set"),this.indexStartValue_}getIndexStartName(){return g(this.startSet_,"Only valid if start has been set"),this.startNameSet_?this.indexStartName_:Li}hasEnd(){return this.endSet_}getIndexEndValue(){return g(this.endSet_,"Only valid if end has been set"),this.indexEndValue_}getIndexEndName(){return g(this.endSet_,"Only valid if end has been set"),this.endNameSet_?this.indexEndName_:$n}hasLimit(){return this.limitSet_}hasAnchoredLimit(){return this.limitSet_&&this.viewFrom_!==""}getLimit(){return g(this.limitSet_,"Only valid if limit has been set"),this.limit_}getIndex(){return this.index_}loadsAllData(){return!(this.startSet_||this.endSet_||this.limitSet_)}isDefault(){return this.loadsAllData()&&this.index_===te}copy(){const e=new Wl;return e.limitSet_=this.limitSet_,e.limit_=this.limit_,e.startSet_=this.startSet_,e.startAfterSet_=this.startAfterSet_,e.indexStartValue_=this.indexStartValue_,e.startNameSet_=this.startNameSet_,e.indexStartName_=this.indexStartName_,e.endSet_=this.endSet_,e.endBeforeSet_=this.endBeforeSet_,e.indexEndValue_=this.indexEndValue_,e.endNameSet_=this.endNameSet_,e.indexEndName_=this.indexEndName_,e.index_=this.index_,e.viewFrom_=this.viewFrom_,e}}function YI(t){return t.loadsAllData()?new Vl(t.getIndex()):t.hasLimit()?new KI(t):new $s(t)}function Uh(t){const e={};if(t.isDefault())return e;let n;if(t.index_===te?n="$priority":t.index_===zI?n="$value":t.index_===hi?n="$key":(g(t.index_ instanceof jI,"Unrecognized index type!"),n=t.index_.toString()),e.orderBy=le(n),t.startSet_){const i=t.startAfterSet_?"startAfter":"startAt";e[i]=le(t.indexStartValue_),t.startNameSet_&&(e[i]+=","+le(t.indexStartName_))}if(t.endSet_){const i=t.endBeforeSet_?"endBefore":"endAt";e[i]=le(t.indexEndValue_),t.endNameSet_&&(e[i]+=","+le(t.indexEndName_))}return t.limitSet_&&(t.isViewFromLeft()?e.limitToFirst=t.limit_:e.limitToLast=t.limit_),e}function $h(t){const e={};if(t.startSet_&&(e.sp=t.indexStartValue_,t.startNameSet_&&(e.sn=t.indexStartName_),e.sin=!t.startAfterSet_),t.endSet_&&(e.ep=t.indexEndValue_,t.endNameSet_&&(e.en=t.indexEndName_),e.ein=!t.endBeforeSet_),t.limitSet_){e.l=t.limit_;let n=t.viewFrom_;n===""&&(t.isViewFromLeft()?n="l":n="r"),e.vf=n}return t.index_!==te&&(e.i=t.index_.toString()),e}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Zr extends xg{reportStats(e){throw new Error("Method not implemented.")}static getListenId_(e,n){return n!==void 0?"tag$"+n:(g(e._queryParams.isDefault(),"should have a tag if it's not a default query."),e._path.toString())}constructor(e,n,i,s){super(),this.repoInfo_=e,this.onDataUpdate_=n,this.authTokenProvider_=i,this.appCheckTokenProvider_=s,this.log_=ir("p:rest:"),this.listens_={}}listen(e,n,i,s){const r=e._path.toString();this.log_("Listen called for "+r+" "+e._queryIdentifier);const o=Zr.getListenId_(e,i),a={};this.listens_[o]=a;const c=Uh(e._queryParams);this.restRequest_(r+".json",c,(l,u)=>{let d=u;if(l===404&&(d=null,l=null),l===null&&this.onDataUpdate_(r,d,!1,i),Ni(this.listens_,o)===a){let h;l?l===401?h="permission_denied":h="rest_error:"+l:h="ok",s(h,null)}})}unlisten(e,n){const i=Zr.getListenId_(e,n);delete this.listens_[i]}get(e){const n=Uh(e._queryParams),i=e._path.toString(),s=new Le;return this.restRequest_(i+".json",n,(r,o)=>{let a=o;r===404&&(a=null,r=null),r===null?(this.onDataUpdate_(i,a,!1,null),s.resolve(a)):s.reject(new Error(a))}),s.promise}refreshAuthToken(e){}restRequest_(e,n={},i){return n.format="export",Promise.all([this.authTokenProvider_.getToken(!1),this.appCheckTokenProvider_.getToken(!1)]).then(([s,r])=>{s&&s.accessToken&&(n.auth=s.accessToken),r&&r.token&&(n.ac=r.token);const o=(this.repoInfo_.secure?"https://":"http://")+this.repoInfo_.host+e+"?ns="+this.repoInfo_.namespace+Gi(n);this.log_("Sending REST request for "+o);const a=new XMLHttpRequest;a.onreadystatechange=()=>{if(i&&a.readyState===4){this.log_("REST Response for "+o+" received. status:",a.status,"response:",a.responseText);let c=null;if(a.status>=200&&a.status<300){try{c=Os(a.responseText)}catch{Ae("Failed to parse JSON response for "+o+": "+a.responseText)}i(null,c)}else a.status!==401&&a.status!==404&&Ae("Got unsuccessful REST response for "+o+" Status: "+a.status),i(a.status);i=null}},a.open("GET",o,!0),a.send()})}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class JI{constructor(){this.rootNode_=C.EMPTY_NODE}getNode(e){return this.rootNode_.getChild(e)}updateSnapshot(e,n){this.rootNode_=this.rootNode_.updateChild(e,n)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function eo(){return{value:null,children:new Map}}function Ji(t,e,n){if(L(e))t.value=n,t.children.clear();else if(t.value!==null)t.value=t.value.updateChild(e,n);else{const i=P(e);t.children.has(i)||t.children.set(i,eo());const s=t.children.get(i);e=G(e),Ji(s,e,n)}}function Dc(t,e){if(L(e))return t.value=null,t.children.clear(),!0;if(t.value!==null){if(t.value.isLeafNode())return!1;{const n=t.value;return t.value=null,n.forEachChild(te,(i,s)=>{Ji(t,new j(i),s)}),Dc(t,e)}}else if(t.children.size>0){const n=P(e);return e=G(e),t.children.has(n)&&Dc(t.children.get(n),e)&&t.children.delete(n),t.children.size===0}else return!0}function Mc(t,e,n){t.value!==null?n(e,t.value):XI(t,(i,s)=>{const r=new j(e.toString()+"/"+i);Mc(s,r,n)})}function XI(t,e){t.children.forEach((n,i)=>{e(i,n)})}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class QI{constructor(e){this.collection_=e,this.last_=null}get(){const e=this.collection_.get(),n={...e};return this.last_&&ye(this.last_,(i,s)=>{n[i]=n[i]-s}),this.last_=e,n}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Bh=10*1e3,ZI=30*1e3,ek=300*1e3;class tk{constructor(e,n){this.server_=n,this.statsToReport_={},this.statsListener_=new QI(e);const i=Bh+(ZI-Bh)*Math.random();ys(this.reportStats_.bind(this),Math.floor(i))}reportStats_(){const e=this.statsListener_.get(),n={};let i=!1;ye(e,(s,r)=>{r>0&&vt(this.statsToReport_,s)&&(n[s]=r,i=!0)}),i&&this.server_.reportStats(n),ys(this.reportStats_.bind(this),Math.floor(Math.random()*2*ek))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var it;(function(t){t[t.OVERWRITE=0]="OVERWRITE",t[t.MERGE=1]="MERGE",t[t.ACK_USER_WRITE=2]="ACK_USER_WRITE",t[t.LISTEN_COMPLETE=3]="LISTEN_COMPLETE"})(it||(it={}));function jl(){return{fromUser:!0,fromServer:!1,queryId:null,tagged:!1}}function ql(){return{fromUser:!1,fromServer:!0,queryId:null,tagged:!1}}function zl(t){return{fromUser:!1,fromServer:!0,queryId:t,tagged:!0}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class to{constructor(e,n,i){this.path=e,this.affectedTree=n,this.revert=i,this.type=it.ACK_USER_WRITE,this.source=jl()}operationForChild(e){if(L(this.path)){if(this.affectedTree.value!=null)return g(this.affectedTree.children.isEmpty(),"affectedTree should not have overlapping affected paths."),this;{const n=this.affectedTree.subtree(new j(e));return new to(B(),n,this.revert)}}else return g(P(this.path)===e,"operationForChild called for unrelated child."),new to(G(this.path),this.affectedTree,this.revert)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Bs{constructor(e,n){this.source=e,this.path=n,this.type=it.LISTEN_COMPLETE}operationForChild(e){return L(this.path)?new Bs(this.source,B()):new Bs(this.source,G(this.path))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Bn{constructor(e,n,i){this.source=e,this.path=n,this.snap=i,this.type=it.OVERWRITE}operationForChild(e){return L(this.path)?new Bn(this.source,B(),this.snap.getImmediateChild(e)):new Bn(this.source,G(this.path),this.snap)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Di{constructor(e,n,i){this.source=e,this.path=n,this.children=i,this.type=it.MERGE}operationForChild(e){if(L(this.path)){const n=this.children.subtree(new j(e));return n.isEmpty()?null:n.value?new Bn(this.source,B(),n.value):new Di(this.source,B(),n)}else return g(P(this.path)===e,"Can't get a merge for a child not on the path of the operation"),new Di(this.source,G(this.path),this.children)}toString(){return"Operation("+this.path+": "+this.source.toString()+" merge: "+this.children.toString()+")"}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class un{constructor(e,n,i){this.node_=e,this.fullyInitialized_=n,this.filtered_=i}isFullyInitialized(){return this.fullyInitialized_}isFiltered(){return this.filtered_}isCompleteForPath(e){if(L(e))return this.isFullyInitialized()&&!this.filtered_;const n=P(e);return this.isCompleteForChild(n)}isCompleteForChild(e){return this.isFullyInitialized()&&!this.filtered_||this.node_.hasChild(e)}getNode(){return this.node_}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class nk{constructor(e){this.query_=e,this.index_=this.query_._queryParams.getIndex()}}function ik(t,e,n,i){const s=[],r=[];return e.forEach(o=>{o.type==="child_changed"&&t.index_.indexedValueChanged(o.oldSnap,o.snapshotNode)&&r.push(GI(o.childName,o.snapshotNode))}),us(t,s,"child_removed",e,i,n),us(t,s,"child_added",e,i,n),us(t,s,"child_moved",r,i,n),us(t,s,"child_changed",e,i,n),us(t,s,"value",e,i,n),s}function us(t,e,n,i,s,r){const o=i.filter(a=>a.type===n);o.sort((a,c)=>rk(t,a,c)),o.forEach(a=>{const c=sk(t,a,r);s.forEach(l=>{l.respondsTo(a.type)&&e.push(l.createEvent(c,t.query_))})})}function sk(t,e,n){return e.type==="value"||e.type==="child_removed"||(e.prevName=n.getPredecessorChildName(e.childName,e.snapshotNode,t.index_)),e}function rk(t,e,n){if(e.childName==null||n.childName==null)throw qi("Should only compare child_ events.");const i=new O(e.childName,e.snapshotNode),s=new O(n.childName,n.snapshotNode);return t.index_.compare(i,s)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function zo(t,e){return{eventCache:t,serverCache:e}}function ws(t,e,n,i){return zo(new un(e,n,i),t.serverCache)}function zg(t,e,n,i){return zo(t.eventCache,new un(e,n,i))}function no(t){return t.eventCache.isFullyInitialized()?t.eventCache.getNode():null}function Hn(t){return t.serverCache.isFullyInitialized()?t.serverCache.getNode():null}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Ha;const ok=()=>(Ha||(Ha=new De(jS)),Ha);class K{static fromObject(e){let n=new K(null);return ye(e,(i,s)=>{n=n.set(new j(i),s)}),n}constructor(e,n=ok()){this.value=e,this.children=n}isEmpty(){return this.value===null&&this.children.isEmpty()}findRootMostMatchingPathAndValue(e,n){if(this.value!=null&&n(this.value))return{path:B(),value:this.value};if(L(e))return null;{const i=P(e),s=this.children.get(i);if(s!==null){const r=s.findRootMostMatchingPathAndValue(G(e),n);return r!=null?{path:ee(new j(i),r.path),value:r.value}:null}else return null}}findRootMostValueAndPath(e){return this.findRootMostMatchingPathAndValue(e,()=>!0)}subtree(e){if(L(e))return this;{const n=P(e),i=this.children.get(n);return i!==null?i.subtree(G(e)):new K(null)}}set(e,n){if(L(e))return new K(n,this.children);{const i=P(e),r=(this.children.get(i)||new K(null)).set(G(e),n),o=this.children.insert(i,r);return new K(this.value,o)}}remove(e){if(L(e))return this.children.isEmpty()?new K(null):new K(null,this.children);{const n=P(e),i=this.children.get(n);if(i){const s=i.remove(G(e));let r;return s.isEmpty()?r=this.children.remove(n):r=this.children.insert(n,s),this.value===null&&r.isEmpty()?new K(null):new K(this.value,r)}else return this}}get(e){if(L(e))return this.value;{const n=P(e),i=this.children.get(n);return i?i.get(G(e)):null}}setTree(e,n){if(L(e))return n;{const i=P(e),r=(this.children.get(i)||new K(null)).setTree(G(e),n);let o;return r.isEmpty()?o=this.children.remove(i):o=this.children.insert(i,r),new K(this.value,o)}}fold(e){return this.fold_(B(),e)}fold_(e,n){const i={};return this.children.inorderTraversal((s,r)=>{i[s]=r.fold_(ee(e,s),n)}),n(e,this.value,i)}findOnPath(e,n){return this.findOnPath_(e,B(),n)}findOnPath_(e,n,i){const s=this.value?i(n,this.value):!1;if(s)return s;if(L(e))return null;{const r=P(e),o=this.children.get(r);return o?o.findOnPath_(G(e),ee(n,r),i):null}}foreachOnPath(e,n){return this.foreachOnPath_(e,B(),n)}foreachOnPath_(e,n,i){if(L(e))return this;{this.value&&i(n,this.value);const s=P(e),r=this.children.get(s);return r?r.foreachOnPath_(G(e),ee(n,s),i):new K(null)}}foreach(e){this.foreach_(B(),e)}foreach_(e,n){this.children.inorderTraversal((i,s)=>{s.foreach_(ee(e,i),n)}),this.value&&n(e,this.value)}foreachChild(e){this.children.inorderTraversal((n,i)=>{i.value&&e(n,i.value)})}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class at{constructor(e){this.writeTree_=e}static empty(){return new at(new K(null))}}function vs(t,e,n){if(L(e))return new at(new K(n));{const i=t.writeTree_.findRootMostValueAndPath(e);if(i!=null){const s=i.path;let r=i.value;const o=ke(s,e);return r=r.updateChild(o,n),new at(t.writeTree_.set(s,r))}else{const s=new K(n),r=t.writeTree_.setTree(e,s);return new at(r)}}}function xc(t,e,n){let i=t;return ye(n,(s,r)=>{i=vs(i,ee(e,s),r)}),i}function Hh(t,e){if(L(e))return at.empty();{const n=t.writeTree_.setTree(e,new K(null));return new at(n)}}function Fc(t,e){return Zn(t,e)!=null}function Zn(t,e){const n=t.writeTree_.findRootMostValueAndPath(e);return n!=null?t.writeTree_.get(n.path).getChild(ke(n.path,e)):null}function Vh(t){const e=[],n=t.writeTree_.value;return n!=null?n.isLeafNode()||n.forEachChild(te,(i,s)=>{e.push(new O(i,s))}):t.writeTree_.children.inorderTraversal((i,s)=>{s.value!=null&&e.push(new O(i,s.value))}),e}function tn(t,e){if(L(e))return t;{const n=Zn(t,e);return n!=null?new at(new K(n)):new at(t.writeTree_.subtree(e))}}function Uc(t){return t.writeTree_.isEmpty()}function Mi(t,e){return Gg(B(),t.writeTree_,e)}function Gg(t,e,n){if(e.value!=null)return n.updateChild(t,e.value);{let i=null;return e.children.inorderTraversal((s,r)=>{s===".priority"?(g(r.value!==null,"Priority writes must always be leaf nodes"),i=r.value):n=Gg(ee(t,s),r,n)}),!n.getChild(t).isEmpty()&&i!==null&&(n=n.updateChild(ee(t,".priority"),i)),n}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Go(t,e){return Xg(e,t)}function ak(t,e,n,i,s){g(i>t.lastWriteId,"Stacking an older write on top of newer ones"),s===void 0&&(s=!0),t.allWrites.push({path:e,snap:n,writeId:i,visible:s}),s&&(t.visibleWrites=vs(t.visibleWrites,e,n)),t.lastWriteId=i}function ck(t,e,n,i){g(i>t.lastWriteId,"Stacking an older merge on top of newer ones"),t.allWrites.push({path:e,children:n,writeId:i,visible:!0}),t.visibleWrites=xc(t.visibleWrites,e,n),t.lastWriteId=i}function lk(t,e){for(let n=0;n<t.allWrites.length;n++){const i=t.allWrites[n];if(i.writeId===e)return i}return null}function uk(t,e){const n=t.allWrites.findIndex(a=>a.writeId===e);g(n>=0,"removeWrite called with nonexistent writeId.");const i=t.allWrites[n];t.allWrites.splice(n,1);let s=i.visible,r=!1,o=t.allWrites.length-1;for(;s&&o>=0;){const a=t.allWrites[o];a.visible&&(o>=n&&dk(a,i.path)?s=!1:qe(i.path,a.path)&&(r=!0)),o--}if(s){if(r)return hk(t),!0;if(i.snap)t.visibleWrites=Hh(t.visibleWrites,i.path);else{const a=i.children;ye(a,c=>{t.visibleWrites=Hh(t.visibleWrites,ee(i.path,c))})}return!0}else return!1}function dk(t,e){if(t.snap)return qe(t.path,e);for(const n in t.children)if(t.children.hasOwnProperty(n)&&qe(ee(t.path,n),e))return!0;return!1}function hk(t){t.visibleWrites=Kg(t.allWrites,fk,B()),t.allWrites.length>0?t.lastWriteId=t.allWrites[t.allWrites.length-1].writeId:t.lastWriteId=-1}function fk(t){return t.visible}function Kg(t,e,n){let i=at.empty();for(let s=0;s<t.length;++s){const r=t[s];if(e(r)){const o=r.path;let a;if(r.snap)qe(n,o)?(a=ke(n,o),i=vs(i,a,r.snap)):qe(o,n)&&(a=ke(o,n),i=vs(i,B(),r.snap.getChild(a)));else if(r.children){if(qe(n,o))a=ke(n,o),i=xc(i,a,r.children);else if(qe(o,n))if(a=ke(o,n),L(a))i=xc(i,B(),r.children);else{const c=Ni(r.children,P(a));if(c){const l=c.getChild(G(a));i=vs(i,B(),l)}}}else throw qi("WriteRecord should have .snap or .children")}}return i}function Yg(t,e,n,i,s){if(!i&&!s){const r=Zn(t.visibleWrites,e);if(r!=null)return r;{const o=tn(t.visibleWrites,e);if(Uc(o))return n;if(n==null&&!Fc(o,B()))return null;{const a=n||C.EMPTY_NODE;return Mi(o,a)}}}else{const r=tn(t.visibleWrites,e);if(!s&&Uc(r))return n;if(!s&&n==null&&!Fc(r,B()))return null;{const o=function(l){return(l.visible||s)&&(!i||!~i.indexOf(l.writeId))&&(qe(l.path,e)||qe(e,l.path))},a=Kg(t.allWrites,o,e),c=n||C.EMPTY_NODE;return Mi(a,c)}}}function pk(t,e,n){let i=C.EMPTY_NODE;const s=Zn(t.visibleWrites,e);if(s)return s.isLeafNode()||s.forEachChild(te,(r,o)=>{i=i.updateImmediateChild(r,o)}),i;if(n){const r=tn(t.visibleWrites,e);return n.forEachChild(te,(o,a)=>{const c=Mi(tn(r,new j(o)),a);i=i.updateImmediateChild(o,c)}),Vh(r).forEach(o=>{i=i.updateImmediateChild(o.name,o.node)}),i}else{const r=tn(t.visibleWrites,e);return Vh(r).forEach(o=>{i=i.updateImmediateChild(o.name,o.node)}),i}}function gk(t,e,n,i,s){g(i||s,"Either existingEventSnap or existingServerSnap must exist");const r=ee(e,n);if(Fc(t.visibleWrites,r))return null;{const o=tn(t.visibleWrites,r);return Uc(o)?s.getChild(n):Mi(o,s.getChild(n))}}function mk(t,e,n,i){const s=ee(e,n),r=Zn(t.visibleWrites,s);if(r!=null)return r;if(i.isCompleteForChild(n)){const o=tn(t.visibleWrites,s);return Mi(o,i.getNode().getImmediateChild(n))}else return null}function _k(t,e){return Zn(t.visibleWrites,e)}function yk(t,e,n,i,s,r,o){let a;const c=tn(t.visibleWrites,e),l=Zn(c,B());if(l!=null)a=l;else if(n!=null)a=Mi(c,n);else return[];if(a=a.withIndex(o),!a.isEmpty()&&!a.isLeafNode()){const u=[],d=o.getCompare(),h=r?a.getReverseIteratorFrom(i,o):a.getIteratorFrom(i,o);let f=h.getNext();for(;f&&u.length<s;)d(f,i)!==0&&u.push(f),f=h.getNext();return u}else return[]}function wk(){return{visibleWrites:at.empty(),allWrites:[],lastWriteId:-1}}function io(t,e,n,i){return Yg(t.writeTree,t.treePath,e,n,i)}function Gl(t,e){return pk(t.writeTree,t.treePath,e)}function Wh(t,e,n,i){return gk(t.writeTree,t.treePath,e,n,i)}function so(t,e){return _k(t.writeTree,ee(t.treePath,e))}function vk(t,e,n,i,s,r){return yk(t.writeTree,t.treePath,e,n,i,s,r)}function Kl(t,e,n){return mk(t.writeTree,t.treePath,e,n)}function Jg(t,e){return Xg(ee(t.treePath,e),t.writeTree)}function Xg(t,e){return{treePath:t,writeTree:e}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class bk{constructor(){this.changeMap=new Map}trackChildChange(e){const n=e.type,i=e.childName;g(n==="child_added"||n==="child_changed"||n==="child_removed","Only child changes supported for tracking"),g(i!==".priority","Only non-priority child changes can be tracked.");const s=this.changeMap.get(i);if(s){const r=s.type;if(n==="child_added"&&r==="child_removed")this.changeMap.set(i,Us(i,e.snapshotNode,s.snapshotNode));else if(n==="child_removed"&&r==="child_added")this.changeMap.delete(i);else if(n==="child_removed"&&r==="child_changed")this.changeMap.set(i,Fs(i,s.oldSnap));else if(n==="child_changed"&&r==="child_added")this.changeMap.set(i,Oi(i,e.snapshotNode));else if(n==="child_changed"&&r==="child_changed")this.changeMap.set(i,Us(i,e.snapshotNode,s.oldSnap));else throw qi("Illegal combination of changes: "+e+" occurred after "+s)}else this.changeMap.set(i,e)}getChanges(){return Array.from(this.changeMap.values())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ek{getCompleteChild(e){return null}getChildAfterChild(e,n,i){return null}}const Qg=new Ek;class Yl{constructor(e,n,i=null){this.writes_=e,this.viewCache_=n,this.optCompleteServerCache_=i}getCompleteChild(e){const n=this.viewCache_.eventCache;if(n.isCompleteForChild(e))return n.getNode().getImmediateChild(e);{const i=this.optCompleteServerCache_!=null?new un(this.optCompleteServerCache_,!0,!1):this.viewCache_.serverCache;return Kl(this.writes_,e,i)}}getChildAfterChild(e,n,i){const s=this.optCompleteServerCache_!=null?this.optCompleteServerCache_:Hn(this.viewCache_),r=vk(this.writes_,s,n,1,i,e);return r.length===0?null:r[0]}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ck(t){return{filter:t}}function Tk(t,e){g(e.eventCache.getNode().isIndexed(t.filter.getIndex()),"Event snap not indexed"),g(e.serverCache.getNode().isIndexed(t.filter.getIndex()),"Server snap not indexed")}function Sk(t,e,n,i,s){const r=new bk;let o,a;if(n.type===it.OVERWRITE){const l=n;l.source.fromUser?o=$c(t,e,l.path,l.snap,i,s,r):(g(l.source.fromServer,"Unknown source."),a=l.source.tagged||e.serverCache.isFiltered()&&!L(l.path),o=ro(t,e,l.path,l.snap,i,s,a,r))}else if(n.type===it.MERGE){const l=n;l.source.fromUser?o=kk(t,e,l.path,l.children,i,s,r):(g(l.source.fromServer,"Unknown source."),a=l.source.tagged||e.serverCache.isFiltered(),o=Bc(t,e,l.path,l.children,i,s,a,r))}else if(n.type===it.ACK_USER_WRITE){const l=n;l.revert?o=Nk(t,e,l.path,i,s,r):o=Rk(t,e,l.path,l.affectedTree,i,s,r)}else if(n.type===it.LISTEN_COMPLETE)o=Ak(t,e,n.path,i,r);else throw qi("Unknown operation type: "+n.type);const c=r.getChanges();return Ik(e,o,c),{viewCache:o,changes:c}}function Ik(t,e,n){const i=e.eventCache;if(i.isFullyInitialized()){const s=i.getNode().isLeafNode()||i.getNode().isEmpty(),r=no(t);(n.length>0||!t.eventCache.isFullyInitialized()||s&&!i.getNode().equals(r)||!i.getNode().getPriority().equals(r.getPriority()))&&n.push(qg(no(e)))}}function Zg(t,e,n,i,s,r){const o=e.eventCache;if(so(i,n)!=null)return e;{let a,c;if(L(n))if(g(e.serverCache.isFullyInitialized(),"If change path is empty, we must have complete server data"),e.serverCache.isFiltered()){const l=Hn(e),u=l instanceof C?l:C.EMPTY_NODE,d=Gl(i,u);a=t.filter.updateFullNode(e.eventCache.getNode(),d,r)}else{const l=io(i,Hn(e));a=t.filter.updateFullNode(e.eventCache.getNode(),l,r)}else{const l=P(n);if(l===".priority"){g(ln(n)===1,"Can't have a priority with additional path components");const u=o.getNode();c=e.serverCache.getNode();const d=Wh(i,n,u,c);d!=null?a=t.filter.updatePriority(u,d):a=o.getNode()}else{const u=G(n);let d;if(o.isCompleteForChild(l)){c=e.serverCache.getNode();const h=Wh(i,n,o.getNode(),c);h!=null?d=o.getNode().getImmediateChild(l).updateChild(u,h):d=o.getNode().getImmediateChild(l)}else d=Kl(i,l,e.serverCache);d!=null?a=t.filter.updateChild(o.getNode(),l,d,u,s,r):a=o.getNode()}}return ws(e,a,o.isFullyInitialized()||L(n),t.filter.filtersNodes())}}function ro(t,e,n,i,s,r,o,a){const c=e.serverCache;let l;const u=o?t.filter:t.filter.getIndexedFilter();if(L(n))l=u.updateFullNode(c.getNode(),i,null);else if(u.filtersNodes()&&!c.isFiltered()){const f=c.getNode().updateChild(n,i);l=u.updateFullNode(c.getNode(),f,null)}else{const f=P(n);if(!c.isCompleteForPath(n)&&ln(n)>1)return e;const p=G(n),m=c.getNode().getImmediateChild(f).updateChild(p,i);f===".priority"?l=u.updatePriority(c.getNode(),m):l=u.updateChild(c.getNode(),f,m,p,Qg,null)}const d=zg(e,l,c.isFullyInitialized()||L(n),u.filtersNodes()),h=new Yl(s,d,r);return Zg(t,d,n,s,h,a)}function $c(t,e,n,i,s,r,o){const a=e.eventCache;let c,l;const u=new Yl(s,e,r);if(L(n))l=t.filter.updateFullNode(e.eventCache.getNode(),i,o),c=ws(e,l,!0,t.filter.filtersNodes());else{const d=P(n);if(d===".priority")l=t.filter.updatePriority(e.eventCache.getNode(),i),c=ws(e,l,a.isFullyInitialized(),a.isFiltered());else{const h=G(n),f=a.getNode().getImmediateChild(d);let p;if(L(h))p=i;else{const _=u.getCompleteChild(d);_!=null?Ul(h)===".priority"&&_.getChild(Ug(h)).isEmpty()?p=_:p=_.updateChild(h,i):p=C.EMPTY_NODE}if(f.equals(p))c=e;else{const _=t.filter.updateChild(a.getNode(),d,p,h,u,o);c=ws(e,_,a.isFullyInitialized(),t.filter.filtersNodes())}}}return c}function jh(t,e){return t.eventCache.isCompleteForChild(e)}function kk(t,e,n,i,s,r,o){let a=e;return i.foreach((c,l)=>{const u=ee(n,c);jh(e,P(u))&&(a=$c(t,a,u,l,s,r,o))}),i.foreach((c,l)=>{const u=ee(n,c);jh(e,P(u))||(a=$c(t,a,u,l,s,r,o))}),a}function qh(t,e,n){return n.foreach((i,s)=>{e=e.updateChild(i,s)}),e}function Bc(t,e,n,i,s,r,o,a){if(e.serverCache.getNode().isEmpty()&&!e.serverCache.isFullyInitialized())return e;let c=e,l;L(n)?l=i:l=new K(null).setTree(n,i);const u=e.serverCache.getNode();return l.children.inorderTraversal((d,h)=>{if(u.hasChild(d)){const f=e.serverCache.getNode().getImmediateChild(d),p=qh(t,f,h);c=ro(t,c,new j(d),p,s,r,o,a)}}),l.children.inorderTraversal((d,h)=>{const f=!e.serverCache.isCompleteForChild(d)&&h.value===null;if(!u.hasChild(d)&&!f){const p=e.serverCache.getNode().getImmediateChild(d),_=qh(t,p,h);c=ro(t,c,new j(d),_,s,r,o,a)}}),c}function Rk(t,e,n,i,s,r,o){if(so(s,n)!=null)return e;const a=e.serverCache.isFiltered(),c=e.serverCache;if(i.value!=null){if(L(n)&&c.isFullyInitialized()||c.isCompleteForPath(n))return ro(t,e,n,c.getNode().getChild(n),s,r,a,o);if(L(n)){let l=new K(null);return c.getNode().forEachChild(hi,(u,d)=>{l=l.set(new j(u),d)}),Bc(t,e,n,l,s,r,a,o)}else return e}else{let l=new K(null);return i.foreach((u,d)=>{const h=ee(n,u);c.isCompleteForPath(h)&&(l=l.set(u,c.getNode().getChild(h)))}),Bc(t,e,n,l,s,r,a,o)}}function Ak(t,e,n,i,s){const r=e.serverCache,o=zg(e,r.getNode(),r.isFullyInitialized()||L(n),r.isFiltered());return Zg(t,o,n,i,Qg,s)}function Nk(t,e,n,i,s,r){let o;if(so(i,n)!=null)return e;{const a=new Yl(i,e,s),c=e.eventCache.getNode();let l;if(L(n)||P(n)===".priority"){let u;if(e.serverCache.isFullyInitialized())u=io(i,Hn(e));else{const d=e.serverCache.getNode();g(d instanceof C,"serverChildren would be complete if leaf node"),u=Gl(i,d)}u=u,l=t.filter.updateFullNode(c,u,r)}else{const u=P(n);let d=Kl(i,u,e.serverCache);d==null&&e.serverCache.isCompleteForChild(u)&&(d=c.getImmediateChild(u)),d!=null?l=t.filter.updateChild(c,u,d,G(n),a,r):e.eventCache.getNode().hasChild(u)?l=t.filter.updateChild(c,u,C.EMPTY_NODE,G(n),a,r):l=c,l.isEmpty()&&e.serverCache.isFullyInitialized()&&(o=io(i,Hn(e)),o.isLeafNode()&&(l=t.filter.updateFullNode(l,o,r)))}return o=e.serverCache.isFullyInitialized()||so(i,B())!=null,ws(e,l,o,t.filter.filtersNodes())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Pk{constructor(e,n){this.query_=e,this.eventRegistrations_=[];const i=this.query_._queryParams,s=new Vl(i.getIndex()),r=YI(i);this.processor_=Ck(r);const o=n.serverCache,a=n.eventCache,c=s.updateFullNode(C.EMPTY_NODE,o.getNode(),null),l=r.updateFullNode(C.EMPTY_NODE,a.getNode(),null),u=new un(c,o.isFullyInitialized(),s.filtersNodes()),d=new un(l,a.isFullyInitialized(),r.filtersNodes());this.viewCache_=zo(d,u),this.eventGenerator_=new nk(this.query_)}get query(){return this.query_}}function Lk(t){return t.viewCache_.serverCache.getNode()}function Ok(t){return no(t.viewCache_)}function Dk(t,e){const n=Hn(t.viewCache_);return n&&(t.query._queryParams.loadsAllData()||!L(e)&&!n.getImmediateChild(P(e)).isEmpty())?n.getChild(e):null}function zh(t){return t.eventRegistrations_.length===0}function Mk(t,e){t.eventRegistrations_.push(e)}function Gh(t,e,n){const i=[];if(n){g(e==null,"A cancel should cancel all event registrations.");const s=t.query._path;t.eventRegistrations_.forEach(r=>{const o=r.createCancelEvent(n,s);o&&i.push(o)})}if(e){let s=[];for(let r=0;r<t.eventRegistrations_.length;++r){const o=t.eventRegistrations_[r];if(!o.matches(e))s.push(o);else if(e.hasAnyCallback()){s=s.concat(t.eventRegistrations_.slice(r+1));break}}t.eventRegistrations_=s}else t.eventRegistrations_=[];return i}function Kh(t,e,n,i){e.type===it.MERGE&&e.source.queryId!==null&&(g(Hn(t.viewCache_),"We should always have a full cache before handling merges"),g(no(t.viewCache_),"Missing event cache, even though we have a server cache"));const s=t.viewCache_,r=Sk(t.processor_,s,e,n,i);return Tk(t.processor_,r.viewCache),g(r.viewCache.serverCache.isFullyInitialized()||!s.serverCache.isFullyInitialized(),"Once a server snap is complete, it should never go back"),t.viewCache_=r.viewCache,em(t,r.changes,r.viewCache.eventCache.getNode(),null)}function xk(t,e){const n=t.viewCache_.eventCache,i=[];return n.getNode().isLeafNode()||n.getNode().forEachChild(te,(r,o)=>{i.push(Oi(r,o))}),n.isFullyInitialized()&&i.push(qg(n.getNode())),em(t,i,n.getNode(),e)}function em(t,e,n,i){const s=i?[i]:t.eventRegistrations_;return ik(t.eventGenerator_,e,n,s)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let oo;class tm{constructor(){this.views=new Map}}function Fk(t){g(!oo,"__referenceConstructor has already been defined"),oo=t}function Uk(){return g(oo,"Reference.ts has not been loaded"),oo}function $k(t){return t.views.size===0}function Jl(t,e,n,i){const s=e.source.queryId;if(s!==null){const r=t.views.get(s);return g(r!=null,"SyncTree gave us an op for an invalid query."),Kh(r,e,n,i)}else{let r=[];for(const o of t.views.values())r=r.concat(Kh(o,e,n,i));return r}}function nm(t,e,n,i,s){const r=e._queryIdentifier,o=t.views.get(r);if(!o){let a=io(n,s?i:null),c=!1;a?c=!0:i instanceof C?(a=Gl(n,i),c=!1):(a=C.EMPTY_NODE,c=!1);const l=zo(new un(a,c,!1),new un(i,s,!1));return new Pk(e,l)}return o}function Bk(t,e,n,i,s,r){const o=nm(t,e,i,s,r);return t.views.has(e._queryIdentifier)||t.views.set(e._queryIdentifier,o),Mk(o,n),xk(o,n)}function Hk(t,e,n,i){const s=e._queryIdentifier,r=[];let o=[];const a=dn(t);if(s==="default")for(const[c,l]of t.views.entries())o=o.concat(Gh(l,n,i)),zh(l)&&(t.views.delete(c),l.query._queryParams.loadsAllData()||r.push(l.query));else{const c=t.views.get(s);c&&(o=o.concat(Gh(c,n,i)),zh(c)&&(t.views.delete(s),c.query._queryParams.loadsAllData()||r.push(c.query)))}return a&&!dn(t)&&r.push(new(Uk())(e._repo,e._path)),{removed:r,events:o}}function im(t){const e=[];for(const n of t.views.values())n.query._queryParams.loadsAllData()||e.push(n);return e}function nn(t,e){let n=null;for(const i of t.views.values())n=n||Dk(i,e);return n}function sm(t,e){if(e._queryParams.loadsAllData())return Ko(t);{const i=e._queryIdentifier;return t.views.get(i)}}function rm(t,e){return sm(t,e)!=null}function dn(t){return Ko(t)!=null}function Ko(t){for(const e of t.views.values())if(e.query._queryParams.loadsAllData())return e;return null}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let ao;function Vk(t){g(!ao,"__referenceConstructor has already been defined"),ao=t}function Wk(){return g(ao,"Reference.ts has not been loaded"),ao}let jk=1;class Yh{constructor(e){this.listenProvider_=e,this.syncPointTree_=new K(null),this.pendingWriteTree_=wk(),this.tagToQueryMap=new Map,this.queryToTagMap=new Map}}function om(t,e,n,i,s){return ak(t.pendingWriteTree_,e,n,i,s),s?Xi(t,new Bn(jl(),e,n)):[]}function qk(t,e,n,i){ck(t.pendingWriteTree_,e,n,i);const s=K.fromObject(n);return Xi(t,new Di(jl(),e,s))}function Jt(t,e,n=!1){const i=lk(t.pendingWriteTree_,e);if(uk(t.pendingWriteTree_,e)){let r=new K(null);return i.snap!=null?r=r.set(B(),!0):ye(i.children,o=>{r=r.set(new j(o),!0)}),Xi(t,new to(i.path,r,n))}else return[]}function rr(t,e,n){return Xi(t,new Bn(ql(),e,n))}function zk(t,e,n){const i=K.fromObject(n);return Xi(t,new Di(ql(),e,i))}function Gk(t,e){return Xi(t,new Bs(ql(),e))}function Kk(t,e,n){const i=Ql(t,n);if(i){const s=Zl(i),r=s.path,o=s.queryId,a=ke(r,e),c=new Bs(zl(o),a);return eu(t,r,c)}else return[]}function co(t,e,n,i,s=!1){const r=e._path,o=t.syncPointTree_.get(r);let a=[];if(o&&(e._queryIdentifier==="default"||rm(o,e))){const c=Hk(o,e,n,i);$k(o)&&(t.syncPointTree_=t.syncPointTree_.remove(r));const l=c.removed;if(a=c.events,!s){const u=l.findIndex(h=>h._queryParams.loadsAllData())!==-1,d=t.syncPointTree_.findOnPath(r,(h,f)=>dn(f));if(u&&!d){const h=t.syncPointTree_.subtree(r);if(!h.isEmpty()){const f=Xk(h);for(let p=0;p<f.length;++p){const _=f[p],m=_.query,R=um(t,_);t.listenProvider_.startListening(bs(m),Hs(t,m),R.hashFn,R.onComplete)}}}!d&&l.length>0&&!i&&(u?t.listenProvider_.stopListening(bs(e),null):l.forEach(h=>{const f=t.queryToTagMap.get(Yo(h));t.listenProvider_.stopListening(bs(h),f)}))}Qk(t,l)}return a}function am(t,e,n,i){const s=Ql(t,i);if(s!=null){const r=Zl(s),o=r.path,a=r.queryId,c=ke(o,e),l=new Bn(zl(a),c,n);return eu(t,o,l)}else return[]}function Yk(t,e,n,i){const s=Ql(t,i);if(s){const r=Zl(s),o=r.path,a=r.queryId,c=ke(o,e),l=K.fromObject(n),u=new Di(zl(a),c,l);return eu(t,o,u)}else return[]}function Hc(t,e,n,i=!1){const s=e._path;let r=null,o=!1;t.syncPointTree_.foreachOnPath(s,(h,f)=>{const p=ke(h,s);r=r||nn(f,p),o=o||dn(f)});let a=t.syncPointTree_.get(s);a?(o=o||dn(a),r=r||nn(a,B())):(a=new tm,t.syncPointTree_=t.syncPointTree_.set(s,a));let c;r!=null?c=!0:(c=!1,r=C.EMPTY_NODE,t.syncPointTree_.subtree(s).foreachChild((f,p)=>{const _=nn(p,B());_&&(r=r.updateImmediateChild(f,_))}));const l=rm(a,e);if(!l&&!e._queryParams.loadsAllData()){const h=Yo(e);g(!t.queryToTagMap.has(h),"View does not exist, but we have a tag");const f=Zk();t.queryToTagMap.set(h,f),t.tagToQueryMap.set(f,h)}const u=Go(t.pendingWriteTree_,s);let d=Bk(a,e,n,u,r,c);if(!l&&!o&&!i){const h=sm(a,e);d=d.concat(eR(t,e,h))}return d}function Xl(t,e,n){const s=t.pendingWriteTree_,r=t.syncPointTree_.findOnPath(e,(o,a)=>{const c=ke(o,e),l=nn(a,c);if(l)return l});return Yg(s,e,r,n,!0)}function Jk(t,e){const n=e._path;let i=null;t.syncPointTree_.foreachOnPath(n,(l,u)=>{const d=ke(l,n);i=i||nn(u,d)});let s=t.syncPointTree_.get(n);s?i=i||nn(s,B()):(s=new tm,t.syncPointTree_=t.syncPointTree_.set(n,s));const r=i!=null,o=r?new un(i,!0,!1):null,a=Go(t.pendingWriteTree_,e._path),c=nm(s,e,a,r?o.getNode():C.EMPTY_NODE,r);return Ok(c)}function Xi(t,e){return cm(e,t.syncPointTree_,null,Go(t.pendingWriteTree_,B()))}function cm(t,e,n,i){if(L(t.path))return lm(t,e,n,i);{const s=e.get(B());n==null&&s!=null&&(n=nn(s,B()));let r=[];const o=P(t.path),a=t.operationForChild(o),c=e.children.get(o);if(c&&a){const l=n?n.getImmediateChild(o):null,u=Jg(i,o);r=r.concat(cm(a,c,l,u))}return s&&(r=r.concat(Jl(s,t,i,n))),r}}function lm(t,e,n,i){const s=e.get(B());n==null&&s!=null&&(n=nn(s,B()));let r=[];return e.children.inorderTraversal((o,a)=>{const c=n?n.getImmediateChild(o):null,l=Jg(i,o),u=t.operationForChild(o);u&&(r=r.concat(lm(u,a,c,l)))}),s&&(r=r.concat(Jl(s,t,i,n))),r}function um(t,e){const n=e.query,i=Hs(t,n);return{hashFn:()=>(Lk(e)||C.EMPTY_NODE).hash(),onComplete:s=>{if(s==="ok")return i?Kk(t,n._path,i):Gk(t,n._path);{const r=GS(s,n);return co(t,n,null,r)}}}}function Hs(t,e){const n=Yo(e);return t.queryToTagMap.get(n)}function Yo(t){return t._path.toString()+"$"+t._queryIdentifier}function Ql(t,e){return t.tagToQueryMap.get(e)}function Zl(t){const e=t.indexOf("$");return g(e!==-1&&e<t.length-1,"Bad queryKey."),{queryId:t.substr(e+1),path:new j(t.substr(0,e))}}function eu(t,e,n){const i=t.syncPointTree_.get(e);g(i,"Missing sync point for query tag that we're tracking");const s=Go(t.pendingWriteTree_,e);return Jl(i,n,s,null)}function Xk(t){return t.fold((e,n,i)=>{if(n&&dn(n))return[Ko(n)];{let s=[];return n&&(s=im(n)),ye(i,(r,o)=>{s=s.concat(o)}),s}})}function bs(t){return t._queryParams.loadsAllData()&&!t._queryParams.isDefault()?new(Wk())(t._repo,t._path):t}function Qk(t,e){for(let n=0;n<e.length;++n){const i=e[n];if(!i._queryParams.loadsAllData()){const s=Yo(i),r=t.queryToTagMap.get(s);t.queryToTagMap.delete(s),t.tagToQueryMap.delete(r)}}}function Zk(){return jk++}function eR(t,e,n){const i=e._path,s=Hs(t,e),r=um(t,n),o=t.listenProvider_.startListening(bs(e),s,r.hashFn,r.onComplete),a=t.syncPointTree_.subtree(i);if(s)g(!dn(a.value),"If we're adding a query, it shouldn't be shadowed");else{const c=a.fold((l,u,d)=>{if(!L(l)&&u&&dn(u))return[Ko(u).query];{let h=[];return u&&(h=h.concat(im(u).map(f=>f.query))),ye(d,(f,p)=>{h=h.concat(p)}),h}});for(let l=0;l<c.length;++l){const u=c[l];t.listenProvider_.stopListening(bs(u),Hs(t,u))}}return o}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class tu{constructor(e){this.node_=e}getImmediateChild(e){const n=this.node_.getImmediateChild(e);return new tu(n)}node(){return this.node_}}class nu{constructor(e,n){this.syncTree_=e,this.path_=n}getImmediateChild(e){const n=ee(this.path_,e);return new nu(this.syncTree_,n)}node(){return Xl(this.syncTree_,this.path_)}}const tR=function(t){return t=t||{},t.timestamp=t.timestamp||new Date().getTime(),t},Jh=function(t,e,n){if(!t||typeof t!="object")return t;if(g(".sv"in t,"Unexpected leaf node or priority contents"),typeof t[".sv"]=="string")return nR(t[".sv"],e,n);if(typeof t[".sv"]=="object")return iR(t[".sv"],e);g(!1,"Unexpected server value: "+JSON.stringify(t,null,2))},nR=function(t,e,n){switch(t){case"timestamp":return n.timestamp;default:g(!1,"Unexpected server value: "+t)}},iR=function(t,e,n){t.hasOwnProperty("increment")||g(!1,"Unexpected server value: "+JSON.stringify(t,null,2));const i=t.increment;typeof i!="number"&&g(!1,"Unexpected increment value: "+i);const s=e.node();if(g(s!==null&&typeof s<"u","Expected ChildrenNode.EMPTY_NODE for nulls"),!s.isLeafNode())return i;const o=s.getValue();return typeof o!="number"?i:o+i},dm=function(t,e,n,i){return iu(e,new nu(n,t),i)},hm=function(t,e,n){return iu(t,new tu(e),n)};function iu(t,e,n){const i=t.getPriority().val(),s=Jh(i,e.getImmediateChild(".priority"),n);let r;if(t.isLeafNode()){const o=t,a=Jh(o.getValue(),e,n);return a!==o.getValue()||s!==o.getPriority().val()?new he(a,ie(s)):t}else{const o=t;return r=o,s!==o.getPriority().val()&&(r=r.updatePriority(new he(s))),o.forEachChild(te,(a,c)=>{const l=iu(c,e.getImmediateChild(a),n);l!==c&&(r=r.updateImmediateChild(a,l))}),r}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class su{constructor(e="",n=null,i={children:{},childCount:0}){this.name=e,this.parent=n,this.node=i}}function ru(t,e){let n=e instanceof j?e:new j(e),i=t,s=P(n);for(;s!==null;){const r=Ni(i.node.children,s)||{children:{},childCount:0};i=new su(s,i,r),n=G(n),s=P(n)}return i}function Qi(t){return t.node.value}function fm(t,e){t.node.value=e,Vc(t)}function pm(t){return t.node.childCount>0}function sR(t){return Qi(t)===void 0&&!pm(t)}function Jo(t,e){ye(t.node.children,(n,i)=>{e(new su(n,t,i))})}function gm(t,e,n,i){n&&e(t),Jo(t,s=>{gm(s,e,!0)})}function rR(t,e,n){let i=t.parent;for(;i!==null;){if(e(i))return!0;i=i.parent}return!1}function or(t){return new j(t.parent===null?t.name:or(t.parent)+"/"+t.name)}function Vc(t){t.parent!==null&&oR(t.parent,t.name,t)}function oR(t,e,n){const i=sR(n),s=vt(t.node.children,e);i&&s?(delete t.node.children[e],t.node.childCount--,Vc(t)):!i&&!s&&(t.node.children[e]=n.node,t.node.childCount++,Vc(t))}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const aR=/[\[\].#$\/\u0000-\u001F\u007F]/,cR=/[\[\].#$\u0000-\u001F\u007F]/,Va=10*1024*1024,ou=function(t){return typeof t=="string"&&t.length!==0&&!aR.test(t)},mm=function(t){return typeof t=="string"&&t.length!==0&&!cR.test(t)},lR=function(t){return t&&(t=t.replace(/^\/*\.info(\/|$)/,"/")),mm(t)},_m=function(t){return t===null||typeof t=="string"||typeof t=="number"&&!jo(t)||t&&typeof t=="object"&&vt(t,".sv")},lo=function(t,e,n,i){i&&e===void 0||Xo(Pi(t,"value"),e,n)},Xo=function(t,e,n){const i=n instanceof j?new kI(n,t):n;if(e===void 0)throw new Error(t+"contains undefined "+In(i));if(typeof e=="function")throw new Error(t+"contains a function "+In(i)+" with contents = "+e.toString());if(jo(e))throw new Error(t+"contains "+e.toString()+" "+In(i));if(typeof e=="string"&&e.length>Va/3&&Bo(e)>Va)throw new Error(t+"contains a string greater than "+Va+" utf8 bytes "+In(i)+" ('"+e.substring(0,50)+"...')");if(e&&typeof e=="object"){let s=!1,r=!1;if(ye(e,(o,a)=>{if(o===".value")s=!0;else if(o!==".priority"&&o!==".sv"&&(r=!0,!ou(o)))throw new Error(t+" contains an invalid key ("+o+") "+In(i)+`.  Keys must be non-empty strings and can't contain ".", "#", "$", "/", "[", or "]"`);RI(i,o),Xo(t,a,i),AI(i)}),s&&r)throw new Error(t+' contains ".value" child '+In(i)+" in addition to actual children.")}},uR=function(t,e){let n,i;for(n=0;n<e.length;n++){i=e[n];const r=xs(i);for(let o=0;o<r.length;o++)if(!(r[o]===".priority"&&o===r.length-1)){if(!ou(r[o]))throw new Error(t+"contains an invalid key ("+r[o]+") in path "+i.toString()+`. Keys must be non-empty strings and can't contain ".", "#", "$", "/", "[", or "]"`)}}e.sort(II);let s=null;for(n=0;n<e.length;n++){if(i=e[n],s!==null&&qe(s,i))throw new Error(t+"contains a path "+s.toString()+" that is ancestor of another path "+i.toString());s=i}},ym=function(t,e,n,i){const s=Pi(t,"values");if(!(e&&typeof e=="object")||Array.isArray(e))throw new Error(s+" must be an object containing the children to replace.");const r=[];ye(e,(o,a)=>{const c=new j(o);if(Xo(s,a,ee(n,c)),Ul(c)===".priority"&&!_m(a))throw new Error(s+"contains an invalid value for '"+c.toString()+"', which must be a valid Firebase priority (a string, finite number, server value, or null).");r.push(c)}),uR(s,r)},dR=function(t,e,n){if(jo(e))throw new Error(Pi(t,"priority")+"is "+e.toString()+", but must be a valid Firebase priority (a string, finite number, server value, or null).");if(!_m(e))throw new Error(Pi(t,"priority")+"must be a valid Firebase priority (a string, finite number, server value, or null).")},wm=function(t,e,n,i){if(!mm(n))throw new Error(Pi(t,e)+'was an invalid path = "'+n+`". Paths must be non-empty strings and can't contain ".", "#", "$", "[", or "]"`)},hR=function(t,e,n,i){n&&(n=n.replace(/^\/*\.info(\/|$)/,"/")),wm(t,e,n)},Nn=function(t,e){if(P(e)===".info")throw new Error(t+" failed = Can't modify data under /.info/")},fR=function(t,e){const n=e.path.toString();if(typeof e.repoInfo.host!="string"||e.repoInfo.host.length===0||!ou(e.repoInfo.namespace)&&e.repoInfo.host.split(":")[0]!=="localhost"||n.length!==0&&!lR(n))throw new Error(Pi(t,"url")+`must be a valid firebase URL and the path can't contain ".", "#", "$", "[", or "]".`)};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class pR{constructor(){this.eventLists_=[],this.recursionDepth_=0}}function Qo(t,e){let n=null;for(let i=0;i<e.length;i++){const s=e[i],r=s.getPath();n!==null&&!$l(r,n.path)&&(t.eventLists_.push(n),n=null),n===null&&(n={events:[],path:r}),n.events.push(s)}n&&t.eventLists_.push(n)}function vm(t,e,n){Qo(t,n),bm(t,i=>$l(i,e))}function Je(t,e,n){Qo(t,n),bm(t,i=>qe(i,e)||qe(e,i))}function bm(t,e){t.recursionDepth_++;let n=!0;for(let i=0;i<t.eventLists_.length;i++){const s=t.eventLists_[i];if(s){const r=s.path;e(r)?(gR(t.eventLists_[i]),t.eventLists_[i]=null):n=!1}}n&&(t.eventLists_=[]),t.recursionDepth_--}function gR(t){for(let e=0;e<t.events.length;e++){const n=t.events[e];if(n!==null){t.events[e]=null;const i=n.getEventRunner();_s&&pe("event: "+n.toString()),Yi(i)}}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const mR="repo_interrupt",_R=25;class yR{constructor(e,n,i,s){this.repoInfo_=e,this.forceRestClient_=n,this.authTokenProvider_=i,this.appCheckProvider_=s,this.dataUpdateCount=0,this.statsListener_=null,this.eventQueue_=new pR,this.nextWriteId_=1,this.interceptServerDataCallback_=null,this.onDisconnect_=eo(),this.transactionQueueTree_=new su,this.persistentConnection_=null,this.key=this.repoInfo_.toURLString()}toString(){return(this.repoInfo_.secure?"https://":"http://")+this.repoInfo_.host}}function wR(t,e,n){if(t.stats_=xl(t.repoInfo_),t.forceRestClient_||XS())t.server_=new Zr(t.repoInfo_,(i,s,r,o)=>{Xh(t,i,s,r,o)},t.authTokenProvider_,t.appCheckProvider_),setTimeout(()=>Qh(t,!0),0);else{if(typeof n<"u"&&n!==null){if(typeof n!="object")throw new Error("Only objects are supported for option databaseAuthVariableOverride");try{le(n)}catch(i){throw new Error("Invalid authOverride provided: "+i)}}t.persistentConnection_=new Mt(t.repoInfo_,e,(i,s,r,o)=>{Xh(t,i,s,r,o)},i=>{Qh(t,i)},i=>{vR(t,i)},t.authTokenProvider_,t.appCheckProvider_,n),t.server_=t.persistentConnection_}t.authTokenProvider_.addTokenChangeListener(i=>{t.server_.refreshAuthToken(i)}),t.appCheckProvider_.addTokenChangeListener(i=>{t.server_.refreshAppCheckToken(i.token)}),t.statsReporter_=nI(t.repoInfo_,()=>new tk(t.stats_,t.server_)),t.infoData_=new JI,t.infoSyncTree_=new Yh({startListening:(i,s,r,o)=>{let a=[];const c=t.infoData_.getNode(i._path);return c.isEmpty()||(a=rr(t.infoSyncTree_,i._path,c),setTimeout(()=>{o("ok")},0)),a},stopListening:()=>{}}),au(t,"connected",!1),t.serverSyncTree_=new Yh({startListening:(i,s,r,o)=>(t.server_.listen(i,r,s,(a,c)=>{const l=o(a,c);Je(t.eventQueue_,i._path,l)}),[]),stopListening:(i,s)=>{t.server_.unlisten(i,s)}})}function Em(t){const n=t.infoData_.getNode(new j(".info/serverTimeOffset")).val()||0;return new Date().getTime()+n}function Zo(t){return tR({timestamp:Em(t)})}function Xh(t,e,n,i,s){t.dataUpdateCount++;const r=new j(e);n=t.interceptServerDataCallback_?t.interceptServerDataCallback_(e,n):n;let o=[];if(s)if(i){const c=Kr(n,l=>ie(l));o=Yk(t.serverSyncTree_,r,c,s)}else{const c=ie(n);o=am(t.serverSyncTree_,r,c,s)}else if(i){const c=Kr(n,l=>ie(l));o=zk(t.serverSyncTree_,r,c)}else{const c=ie(n);o=rr(t.serverSyncTree_,r,c)}let a=r;o.length>0&&(a=xi(t,r)),Je(t.eventQueue_,a,o)}function Qh(t,e){au(t,"connected",e),e===!1&&TR(t)}function vR(t,e){ye(e,(n,i)=>{au(t,n,i)})}function au(t,e,n){const i=new j("/.info/"+e),s=ie(n);t.infoData_.updateSnapshot(i,s);const r=rr(t.infoSyncTree_,i,s);Je(t.eventQueue_,i,r)}function cu(t){return t.nextWriteId_++}function bR(t,e,n){const i=Jk(t.serverSyncTree_,e);return i!=null?Promise.resolve(i):t.server_.get(e).then(s=>{const r=ie(s).withIndex(e._queryParams.getIndex());Hc(t.serverSyncTree_,e,n,!0);let o;if(e._queryParams.loadsAllData())o=rr(t.serverSyncTree_,e._path,r);else{const a=Hs(t.serverSyncTree_,e);o=am(t.serverSyncTree_,e._path,r,a)}return Je(t.eventQueue_,e._path,o),co(t.serverSyncTree_,e,n,null,!0),r},s=>(ar(t,"get for query "+le(e)+" failed: "+s),Promise.reject(new Error(s))))}function ER(t,e,n,i,s){ar(t,"set",{path:e.toString(),value:n,priority:i});const r=Zo(t),o=ie(n,i),a=Xl(t.serverSyncTree_,e),c=hm(o,a,r),l=cu(t),u=om(t.serverSyncTree_,e,c,l,!0);Qo(t.eventQueue_,u),t.server_.put(e.toString(),o.val(!0),(h,f)=>{const p=h==="ok";p||Ae("set at "+e+" failed: "+h);const _=Jt(t.serverSyncTree_,l,!p);Je(t.eventQueue_,e,_),hn(t,s,h,f)});const d=uu(t,e);xi(t,d),Je(t.eventQueue_,d,[])}function CR(t,e,n,i){ar(t,"update",{path:e.toString(),value:n});let s=!0;const r=Zo(t),o={};if(ye(n,(a,c)=>{s=!1,o[a]=dm(ee(e,a),ie(c),t.serverSyncTree_,r)}),s)pe("update() called with empty data.  Don't do anything."),hn(t,i,"ok",void 0);else{const a=cu(t),c=qk(t.serverSyncTree_,e,o,a);Qo(t.eventQueue_,c),t.server_.merge(e.toString(),n,(l,u)=>{const d=l==="ok";d||Ae("update at "+e+" failed: "+l);const h=Jt(t.serverSyncTree_,a,!d),f=h.length>0?xi(t,e):e;Je(t.eventQueue_,f,h),hn(t,i,l,u)}),ye(n,l=>{const u=uu(t,ee(e,l));xi(t,u)}),Je(t.eventQueue_,e,[])}}function TR(t){ar(t,"onDisconnectEvents");const e=Zo(t),n=eo();Mc(t.onDisconnect_,B(),(s,r)=>{const o=dm(s,r,t.serverSyncTree_,e);Ji(n,s,o)});let i=[];Mc(n,B(),(s,r)=>{i=i.concat(rr(t.serverSyncTree_,s,r));const o=uu(t,s);xi(t,o)}),t.onDisconnect_=eo(),Je(t.eventQueue_,B(),i)}function SR(t,e,n){t.server_.onDisconnectCancel(e.toString(),(i,s)=>{i==="ok"&&Dc(t.onDisconnect_,e),hn(t,n,i,s)})}function Zh(t,e,n,i){const s=ie(n);t.server_.onDisconnectPut(e.toString(),s.val(!0),(r,o)=>{r==="ok"&&Ji(t.onDisconnect_,e,s),hn(t,i,r,o)})}function IR(t,e,n,i,s){const r=ie(n,i);t.server_.onDisconnectPut(e.toString(),r.val(!0),(o,a)=>{o==="ok"&&Ji(t.onDisconnect_,e,r),hn(t,s,o,a)})}function kR(t,e,n,i){if(Gr(n)){pe("onDisconnect().update() called with empty data.  Don't do anything."),hn(t,i,"ok",void 0);return}t.server_.onDisconnectMerge(e.toString(),n,(s,r)=>{s==="ok"&&ye(n,(o,a)=>{const c=ie(a);Ji(t.onDisconnect_,ee(e,o),c)}),hn(t,i,s,r)})}function RR(t,e,n){let i;P(e._path)===".info"?i=Hc(t.infoSyncTree_,e,n):i=Hc(t.serverSyncTree_,e,n),vm(t.eventQueue_,e._path,i)}function Cm(t,e,n){let i;P(e._path)===".info"?i=co(t.infoSyncTree_,e,n):i=co(t.serverSyncTree_,e,n),vm(t.eventQueue_,e._path,i)}function AR(t){t.persistentConnection_&&t.persistentConnection_.interrupt(mR)}function ar(t,...e){let n="";t.persistentConnection_&&(n=t.persistentConnection_.id+":"),pe(n,...e)}function hn(t,e,n,i){e&&Yi(()=>{if(n==="ok")e(null);else{const s=(n||"error").toUpperCase();let r=s;i&&(r+=": "+i);const o=new Error(r);o.code=s,e(o)}})}function Tm(t,e,n){return Xl(t.serverSyncTree_,e,n)||C.EMPTY_NODE}function lu(t,e=t.transactionQueueTree_){if(e||ea(t,e),Qi(e)){const n=Im(t,e);g(n.length>0,"Sending zero length transaction queue"),n.every(s=>s.status===0)&&NR(t,or(e),n)}else pm(e)&&Jo(e,n=>{lu(t,n)})}function NR(t,e,n){const i=n.map(l=>l.currentWriteId),s=Tm(t,e,i);let r=s;const o=s.hash();for(let l=0;l<n.length;l++){const u=n[l];g(u.status===0,"tryToSendTransactionQueue_: items in queue should all be run."),u.status=1,u.retryCount++;const d=ke(e,u.path);r=r.updateChild(d,u.currentOutputSnapshotRaw)}const a=r.val(!0),c=e;t.server_.put(c.toString(),a,l=>{ar(t,"transaction put response",{path:c.toString(),status:l});let u=[];if(l==="ok"){const d=[];for(let h=0;h<n.length;h++)n[h].status=2,u=u.concat(Jt(t.serverSyncTree_,n[h].currentWriteId)),n[h].onComplete&&d.push(()=>n[h].onComplete(null,!0,n[h].currentOutputSnapshotResolved)),n[h].unwatcher();ea(t,ru(t.transactionQueueTree_,e)),lu(t,t.transactionQueueTree_),Je(t.eventQueue_,e,u);for(let h=0;h<d.length;h++)Yi(d[h])}else{if(l==="datastale")for(let d=0;d<n.length;d++)n[d].status===3?n[d].status=4:n[d].status=0;else{Ae("transaction at "+c.toString()+" failed: "+l);for(let d=0;d<n.length;d++)n[d].status=4,n[d].abortReason=l}xi(t,e)}},o)}function xi(t,e){const n=Sm(t,e),i=or(n),s=Im(t,n);return PR(t,s,i),i}function PR(t,e,n){if(e.length===0)return;const i=[];let s=[];const o=e.filter(a=>a.status===0).map(a=>a.currentWriteId);for(let a=0;a<e.length;a++){const c=e[a],l=ke(n,c.path);let u=!1,d;if(g(l!==null,"rerunTransactionsUnderNode_: relativePath should not be null."),c.status===4)u=!0,d=c.abortReason,s=s.concat(Jt(t.serverSyncTree_,c.currentWriteId,!0));else if(c.status===0)if(c.retryCount>=_R)u=!0,d="maxretry",s=s.concat(Jt(t.serverSyncTree_,c.currentWriteId,!0));else{const h=Tm(t,c.path,o);c.currentInputSnapshot=h;const f=e[a].update(h.val());if(f!==void 0){Xo("transaction failed: Data returned ",f,c.path);let p=ie(f);typeof f=="object"&&f!=null&&vt(f,".priority")||(p=p.updatePriority(h.getPriority()));const m=c.currentWriteId,R=Zo(t),M=hm(p,h,R);c.currentOutputSnapshotRaw=p,c.currentOutputSnapshotResolved=M,c.currentWriteId=cu(t),o.splice(o.indexOf(m),1),s=s.concat(om(t.serverSyncTree_,c.path,M,c.currentWriteId,c.applyLocally)),s=s.concat(Jt(t.serverSyncTree_,m,!0))}else u=!0,d="nodata",s=s.concat(Jt(t.serverSyncTree_,c.currentWriteId,!0))}Je(t.eventQueue_,n,s),s=[],u&&(e[a].status=2,(function(h){setTimeout(h,Math.floor(0))})(e[a].unwatcher),e[a].onComplete&&(d==="nodata"?i.push(()=>e[a].onComplete(null,!1,e[a].currentInputSnapshot)):i.push(()=>e[a].onComplete(new Error(d),!1,null))))}ea(t,t.transactionQueueTree_);for(let a=0;a<i.length;a++)Yi(i[a]);lu(t,t.transactionQueueTree_)}function Sm(t,e){let n,i=t.transactionQueueTree_;for(n=P(e);n!==null&&Qi(i)===void 0;)i=ru(i,n),e=G(e),n=P(e);return i}function Im(t,e){const n=[];return km(t,e,n),n.sort((i,s)=>i.order-s.order),n}function km(t,e,n){const i=Qi(e);if(i)for(let s=0;s<i.length;s++)n.push(i[s]);Jo(e,s=>{km(t,s,n)})}function ea(t,e){const n=Qi(e);if(n){let i=0;for(let s=0;s<n.length;s++)n[s].status!==2&&(n[i]=n[s],i++);n.length=i,fm(e,n.length>0?n:void 0)}Jo(e,i=>{ea(t,i)})}function uu(t,e){const n=or(Sm(t,e)),i=ru(t.transactionQueueTree_,e);return rR(i,s=>{Wa(t,s)}),Wa(t,i),gm(i,s=>{Wa(t,s)}),n}function Wa(t,e){const n=Qi(e);if(n){const i=[];let s=[],r=-1;for(let o=0;o<n.length;o++)n[o].status===3||(n[o].status===1?(g(r===o-1,"All SENT items should be at beginning of queue."),r=o,n[o].status=3,n[o].abortReason="set"):(g(n[o].status===0,"Unexpected transaction status in abort"),n[o].unwatcher(),s=s.concat(Jt(t.serverSyncTree_,n[o].currentWriteId,!0)),n[o].onComplete&&i.push(n[o].onComplete.bind(null,new Error("set"),!1,null))));r===-1?fm(e,void 0):n.length=r+1,Je(t.eventQueue_,or(e),s);for(let o=0;o<i.length;o++)Yi(i[o])}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function LR(t){let e="";const n=t.split("/");for(let i=0;i<n.length;i++)if(n[i].length>0){let s=n[i];try{s=decodeURIComponent(s.replace(/\+/g," "))}catch{}e+="/"+s}return e}function OR(t){const e={};t.charAt(0)==="?"&&(t=t.substring(1));for(const n of t.split("&")){if(n.length===0)continue;const i=n.split("=");i.length===2?e[decodeURIComponent(i[0])]=decodeURIComponent(i[1]):Ae(`Invalid query segment '${n}' in query '${t}'`)}return e}const ef=function(t,e){const n=DR(t),i=n.namespace;n.domain==="firebase.com"&&Ut(n.host+" is no longer supported. Please use <YOUR FIREBASE>.firebaseio.com instead"),(!i||i==="undefined")&&n.domain!=="localhost"&&Ut("Cannot parse Firebase url. Please use https://<YOUR FIREBASE>.firebaseio.com"),n.secure||VS();const s=n.scheme==="ws"||n.scheme==="wss";return{repoInfo:new Ag(n.host,n.secure,i,s,e,"",i!==n.subdomain),path:new j(n.pathString)}},DR=function(t){let e="",n="",i="",s="",r="",o=!0,a="https",c=443;if(typeof t=="string"){let l=t.indexOf("//");l>=0&&(a=t.substring(0,l-1),t=t.substring(l+2));let u=t.indexOf("/");u===-1&&(u=t.length);let d=t.indexOf("?");d===-1&&(d=t.length),e=t.substring(0,Math.min(u,d)),u<d&&(s=LR(t.substring(u,d)));const h=OR(t.substring(Math.min(t.length,d)));l=e.indexOf(":"),l>=0?(o=a==="https"||a==="wss",c=parseInt(e.substring(l+1),10)):l=e.length;const f=e.slice(0,l);if(f.toLowerCase()==="localhost")n="localhost";else if(f.split(".").length<=2)n=f;else{const p=e.indexOf(".");i=e.substring(0,p).toLowerCase(),n=e.substring(p+1),r=i}"ns"in h&&(r=h.ns)}return{host:e,port:c,domain:n,subdomain:i,secure:o,scheme:a,pathString:s,namespace:r}};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const tf="-0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ_abcdefghijklmnopqrstuvwxyz",MR=(function(){let t=0;const e=[];return function(n){const i=n===t;t=n;let s;const r=new Array(8);for(s=7;s>=0;s--)r[s]=tf.charAt(n%64),n=Math.floor(n/64);g(n===0,"Cannot push at time == 0");let o=r.join("");if(i){for(s=11;s>=0&&e[s]===63;s--)e[s]=0;e[s]++}else for(s=0;s<12;s++)e[s]=Math.floor(Math.random()*64);for(s=0;s<12;s++)o+=tf.charAt(e[s]);return g(o.length===20,"nextPushId: Length should be 20."),o}})();/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Rm{constructor(e,n,i,s){this.eventType=e,this.eventRegistration=n,this.snapshot=i,this.prevName=s}getPath(){const e=this.snapshot.ref;return this.eventType==="value"?e._path:e.parent._path}getEventType(){return this.eventType}getEventRunner(){return this.eventRegistration.getEventRunner(this)}toString(){return this.getPath().toString()+":"+this.eventType+":"+le(this.snapshot.exportVal())}}class Am{constructor(e,n,i){this.eventRegistration=e,this.error=n,this.path=i}getPath(){return this.path}getEventType(){return"cancel"}getEventRunner(){return this.eventRegistration.getEventRunner(this)}toString(){return this.path.toString()+":cancel"}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class du{constructor(e,n){this.snapshotCallback=e,this.cancelCallback=n}onValue(e,n){this.snapshotCallback.call(null,e,n)}onCancel(e){return g(this.hasCancelCallback,"Raising a cancel event on a listener with no cancel callback"),this.cancelCallback.call(null,e)}get hasCancelCallback(){return!!this.cancelCallback}matches(e){return this.snapshotCallback===e.snapshotCallback||this.snapshotCallback.userCallback!==void 0&&this.snapshotCallback.userCallback===e.snapshotCallback.userCallback&&this.snapshotCallback.context===e.snapshotCallback.context}}/**
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
 */class xR{constructor(e,n){this._repo=e,this._path=n}cancel(){const e=new Le;return SR(this._repo,this._path,e.wrapCallback(()=>{})),e.promise}remove(){Nn("OnDisconnect.remove",this._path);const e=new Le;return Zh(this._repo,this._path,null,e.wrapCallback(()=>{})),e.promise}set(e){Nn("OnDisconnect.set",this._path),lo("OnDisconnect.set",e,this._path,!1);const n=new Le;return Zh(this._repo,this._path,e,n.wrapCallback(()=>{})),n.promise}setWithPriority(e,n){Nn("OnDisconnect.setWithPriority",this._path),lo("OnDisconnect.setWithPriority",e,this._path,!1),dR("OnDisconnect.setWithPriority",n);const i=new Le;return IR(this._repo,this._path,e,n,i.wrapCallback(()=>{})),i.promise}update(e){Nn("OnDisconnect.update",this._path),ym("OnDisconnect.update",e,this._path);const n=new Le;return kR(this._repo,this._path,e,n.wrapCallback(()=>{})),n.promise}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class hu{constructor(e,n,i,s){this._repo=e,this._path=n,this._queryParams=i,this._orderByCalled=s}get key(){return L(this._path)?null:Ul(this._path)}get ref(){return new bt(this._repo,this._path)}get _queryIdentifier(){const e=$h(this._queryParams),n=Dl(e);return n==="{}"?"default":n}get _queryObject(){return $h(this._queryParams)}isEqual(e){if(e=re(e),!(e instanceof hu))return!1;const n=this._repo===e._repo,i=$l(this._path,e._path),s=this._queryIdentifier===e._queryIdentifier;return n&&i&&s}toJSON(){return this.toString()}toString(){return this._repo.toString()+SI(this._path)}}class bt extends hu{constructor(e,n){super(e,n,new Wl,!1)}get parent(){const e=Ug(this._path);return e===null?null:new bt(this._repo,e)}get root(){let e=this;for(;e.parent!==null;)e=e.parent;return e}}class Fi{constructor(e,n,i){this._node=e,this.ref=n,this._index=i}get priority(){return this._node.getPriority().val()}get key(){return this.ref.key}get size(){return this._node.numChildren()}child(e){const n=new j(e),i=Ui(this.ref,e);return new Fi(this._node.getChild(n),i,te)}exists(){return!this._node.isEmpty()}exportVal(){return this._node.val(!0)}forEach(e){return this._node.isLeafNode()?!1:!!this._node.forEachChild(this._index,(i,s)=>e(new Fi(s,Ui(this.ref,i),te)))}hasChild(e){const n=new j(e);return!this._node.getChild(n).isEmpty()}hasChildren(){return this._node.isLeafNode()?!1:!this._node.isEmpty()}toJSON(){return this.exportVal()}val(){return this._node.val()}}function b(t,e){return t=re(t),t._checkNotDeleted("ref"),e!==void 0?Ui(t._root,e):t._root}function Ui(t,e){return t=re(t),P(t._path)===null?hR("child","path",e):wm("child","path",e),new bt(t._repo,ee(t._path,e))}function FR(t){return t=re(t),new xR(t._repo,t._path)}function uo(t,e){t=re(t),Nn("push",t._path),lo("push",e,t._path,!0);const n=Em(t._repo),i=MR(n),s=Ui(t,i),r=Ui(t,i);let o;return o=Promise.resolve(r),s.then=o.then.bind(o),s.catch=o.then.bind(o,void 0),s}function Xe(t){return Nn("remove",t._path),ne(t,null)}function ne(t,e){t=re(t),Nn("set",t._path),lo("set",e,t._path,!1);const n=new Le;return ER(t._repo,t._path,e,null,n.wrapCallback(()=>{})),n.promise}function fi(t,e){ym("update",e,t._path);const n=new Le;return CR(t._repo,t._path,e,n.wrapCallback(()=>{})),n.promise}function Oe(t){t=re(t);const e=new du(()=>{}),n=new cr(e);return bR(t._repo,t,n).then(i=>new Fi(i,new bt(t._repo,t._path),t._queryParams.getIndex()))}class cr{constructor(e){this.callbackContext=e}respondsTo(e){return e==="value"}createEvent(e,n){const i=n._queryParams.getIndex();return new Rm("value",this,new Fi(e.snapshotNode,new bt(n._repo,n._path),i))}getEventRunner(e){return e.getEventType()==="cancel"?()=>this.callbackContext.onCancel(e.error):()=>this.callbackContext.onValue(e.snapshot,null)}createCancelEvent(e,n){return this.callbackContext.hasCancelCallback?new Am(this,e,n):null}matches(e){return e instanceof cr?!e.callbackContext||!this.callbackContext?!0:e.callbackContext.matches(this.callbackContext):!1}hasAnyCallback(){return this.callbackContext!==null}}class ta{constructor(e,n){this.eventType=e,this.callbackContext=n}respondsTo(e){let n=e==="children_added"?"child_added":e;return n=n==="children_removed"?"child_removed":n,this.eventType===n}createCancelEvent(e,n){return this.callbackContext.hasCancelCallback?new Am(this,e,n):null}createEvent(e,n){g(e.childName!=null,"Child events should have a childName.");const i=Ui(new bt(n._repo,n._path),e.childName),s=n._queryParams.getIndex();return new Rm(e.type,this,new Fi(e.snapshotNode,i,s),e.prevName)}getEventRunner(e){return e.getEventType()==="cancel"?()=>this.callbackContext.onCancel(e.error):()=>this.callbackContext.onValue(e.snapshot,e.prevName)}matches(e){return e instanceof ta?this.eventType===e.eventType&&(!this.callbackContext||!e.callbackContext||this.callbackContext.matches(e.callbackContext)):!1}hasAnyCallback(){return!!this.callbackContext}}function na(t,e,n,i,s){const r=new du(n,void 0),o=e==="value"?new cr(r):new ta(e,r);return RR(t._repo,t,o),()=>Cm(t._repo,t,o)}function Nm(t,e,n,i){return na(t,"value",e)}function Vs(t,e,n,i){return na(t,"child_added",e)}function nf(t,e,n,i){return na(t,"child_changed",e)}function UR(t,e,n,i){return na(t,"child_removed",e)}function kt(t,e,n){let i=null;const s=n?new du(n):null;e==="value"?i=new cr(s):e&&(i=new ta(e,s)),Cm(t._repo,t,i)}Fk(bt);Vk(bt);/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const $R="FIREBASE_DATABASE_EMULATOR_HOST",Wc={};let BR=!1;function HR(t,e,n,i){const s=e.lastIndexOf(":"),r=e.substring(0,s),o=zi(r);t.repoInfo_=new Ag(e,o,t.repoInfo_.namespace,t.repoInfo_.webSocketOnly,t.repoInfo_.nodeAdmin,t.repoInfo_.persistenceKey,t.repoInfo_.includeNamespaceInQueryParams,!0,n),i&&(t.authTokenProvider_=i)}function VR(t,e,n,i,s){let r=i||t.options.databaseURL;r===void 0&&(t.options.projectId||Ut("Can't determine Firebase Database URL. Be sure to include  a Project ID when calling firebase.initializeApp()."),pe("Using default host for project ",t.options.projectId),r=`${t.options.projectId}-default-rtdb.firebaseio.com`);let o=ef(r,s),a=o.repoInfo,c;typeof process<"u"&&bh&&(c=bh[$R]),c?(r=`http://${c}?ns=${a.namespace}`,o=ef(r,s),a=o.repoInfo):o.repoInfo.secure;const l=new ZS(t.name,t.options,e);fR("Invalid Firebase Database URL",o),L(o.path)||Ut("Database URL must point to the root of a Firebase Database (not including a child path).");const u=jR(a,t,l,new QS(t,n));return new qR(u,t)}function WR(t,e){const n=Wc[e];(!n||n[t.key]!==t)&&Ut(`Database ${e}(${t.repoInfo_}) has already been deleted.`),AR(t),delete n[t.key]}function jR(t,e,n,i){let s=Wc[e.name];s||(s={},Wc[e.name]=s);let r=s[t.toURLString()];return r&&Ut("Database initialized multiple times. Please make sure the format of the database URL matches with each database() call."),r=new yR(t,BR,n,i),s[t.toURLString()]=r,r}class qR{constructor(e,n){this._repoInternal=e,this.app=n,this.type="database",this._instanceStarted=!1}get _repo(){return this._instanceStarted||(wR(this._repoInternal,this.app.options.appId,this.app.options.databaseAuthVariableOverride),this._instanceStarted=!0),this._repoInternal}get _root(){return this._rootInternal||(this._rootInternal=new bt(this._repo,B())),this._rootInternal}_delete(){return this._rootInternal!==null&&(WR(this._repo,this.app.name),this._repoInternal=null,this._rootInternal=null),Promise.resolve()}_checkNotDeleted(e){this._rootInternal===null&&Ut("Cannot call "+e+" on a deleted database.")}}function zR(t=Wo(),e){const n=_n(t,"database").getImmediate({identifier:e});if(!n._instanceStarted){const i=rT("database");i&&GR(n,...i)}return n}function GR(t,e,n,i={}){t=re(t),t._checkNotDeleted("useEmulator");const s=`${e}:${n}`,r=t._repoInternal;if(t._instanceStarted){if(s===t._repoInternal.repoInfo_.host&&Un(i,r.repoInfo_.emulatorOptions))return;Ut("connectDatabaseEmulator() cannot initialize or alter the emulator configuration after the database instance has started.")}let o;if(r.repoInfo_.nodeAdmin)i.mockUserToken&&Ut('mockUserToken is not supported by the Admin SDK. For client access with mock users, please use the "firebase" package instead of "firebase-admin".'),o=new Or(Or.OWNER);else if(i.mockUserToken){const a=typeof i.mockUserToken=="string"?i.mockUserToken:oT(i.mockUserToken,t.app.options.projectId);o=new Or(a)}zi(e)&&(rg(e),og("Database",!0)),HR(r,s,i,o)}/**
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
 */function KR(t){xS(Ki),Ye(new We("database",(e,{instanceIdentifier:n})=>{const i=e.getProvider("app").getImmediate(),s=e.getProvider("auth-internal"),r=e.getProvider("app-check-internal");return VR(i,s,r,n)},"PUBLIC").setMultipleInstances(!0)),Ve(Eh,Ch,t),Ve(Eh,Ch,"esm2020")}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const YR={".sv":"timestamp"};function pi(){return YR}Mt.prototype.simpleListen=function(t,e){this.sendRequest("q",{p:t},e)};Mt.prototype.echo=function(t,e){this.sendRequest("echo",{d:t},e)};KR();var JR="firebase",XR="12.8.0";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */Ve(JR,XR,"app");/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const jc=new Map,Pm={activated:!1,tokenObservers:[]},QR={initialized:!1,enabled:!1};function ue(t){return jc.get(t)||{...Pm}}function ZR(t,e){return jc.set(t,e),jc.get(t)}function ia(){return QR}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Lm="https://content-firebaseappcheck.googleapis.com/v1",eA="exchangeRecaptchaEnterpriseToken",tA="exchangeDebugToken",sf={RETRIAL_MIN_WAIT:30*1e3,RETRIAL_MAX_WAIT:960*1e3},nA=1440*60*1e3;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class iA{constructor(e,n,i,s,r){if(this.operation=e,this.retryPolicy=n,this.getWaitDuration=i,this.lowerBound=s,this.upperBound=r,this.pending=null,this.nextErrorWaitInterval=s,s>r)throw new Error("Proactive refresh lower bound greater than upper bound!")}start(){this.nextErrorWaitInterval=this.lowerBound,this.process(!0).catch(()=>{})}stop(){this.pending&&(this.pending.reject("cancelled"),this.pending=null)}isRunning(){return!!this.pending}async process(e){this.stop();try{this.pending=new Le,this.pending.promise.catch(n=>{}),await sA(this.getNextRun(e)),this.pending.resolve(),await this.pending.promise,this.pending=new Le,this.pending.promise.catch(n=>{}),await this.operation(),this.pending.resolve(),await this.pending.promise,this.process(!0).catch(()=>{})}catch(n){this.retryPolicy(n)?this.process(!1).catch(()=>{}):this.stop()}}getNextRun(e){if(e)return this.nextErrorWaitInterval=this.lowerBound,this.getWaitDuration();{const n=this.nextErrorWaitInterval;return this.nextErrorWaitInterval*=2,this.nextErrorWaitInterval>this.upperBound&&(this.nextErrorWaitInterval=this.upperBound),n}}}function sA(t){return new Promise(e=>{setTimeout(e,t)})}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const rA={"already-initialized":"You have already called initializeAppCheck() for FirebaseApp {$appName} with different options. To avoid this error, call initializeAppCheck() with the same options as when it was originally called. This will return the already initialized instance.","use-before-activation":"App Check is being used before initializeAppCheck() is called for FirebaseApp {$appName}. Call initializeAppCheck() before instantiating other Firebase services.","fetch-network-error":"Fetch failed to connect to a network. Check Internet connection. Original error: {$originalErrorMessage}.","fetch-parse-error":"Fetch client could not parse response. Original error: {$originalErrorMessage}.","fetch-status-error":"Fetch server returned an HTTP error status. HTTP status: {$httpStatus}.","storage-open":"Error thrown when opening storage. Original error: {$originalErrorMessage}.","storage-get":"Error thrown when reading from storage. Original error: {$originalErrorMessage}.","storage-set":"Error thrown when writing to storage. Original error: {$originalErrorMessage}.","recaptcha-error":"ReCAPTCHA error.","initial-throttle":"{$httpStatus} error. Attempts allowed again after {$time}",throttled:"Requests throttled due to previous {$httpStatus} error. Attempts allowed again after {$time}"},Me=new mn("appCheck","AppCheck",rA);/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function rf(t=!1){return t?self.grecaptcha?.enterprise:self.grecaptcha}function fu(t){if(!ue(t).activated)throw Me.create("use-before-activation",{appName:t.name})}function Om(t){const e=Math.round(t/1e3),n=Math.floor(e/(3600*24)),i=Math.floor((e-n*3600*24)/3600),s=Math.floor((e-n*3600*24-i*3600)/60),r=e-n*3600*24-i*3600-s*60;let o="";return n&&(o+=vr(n)+"d:"),i&&(o+=vr(i)+"h:"),o+=vr(s)+"m:"+vr(r)+"s",o}function vr(t){return t===0?"00":t>=10?t.toString():"0"+t}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function pu({url:t,body:e},n){const i={"Content-Type":"application/json"},s=n.getImmediate({optional:!0});if(s){const d=await s.getHeartbeatsHeader();d&&(i["X-Firebase-Client"]=d)}const r={method:"POST",body:JSON.stringify(e),headers:i};let o;try{o=await fetch(t,r)}catch(d){throw Me.create("fetch-network-error",{originalErrorMessage:d?.message})}if(o.status!==200)throw Me.create("fetch-status-error",{httpStatus:o.status});let a;try{a=await o.json()}catch(d){throw Me.create("fetch-parse-error",{originalErrorMessage:d?.message})}const c=a.ttl.match(/^([\d.]+)(s)$/);if(!c||!c[2]||isNaN(Number(c[1])))throw Me.create("fetch-parse-error",{originalErrorMessage:`ttl field (timeToLive) is not in standard Protobuf Duration format: ${a.ttl}`});const l=Number(c[1])*1e3,u=Date.now();return{token:a.token,expireTimeMillis:u+l,issuedAtTimeMillis:u}}function oA(t,e){const{projectId:n,appId:i,apiKey:s}=t.options;return{url:`${Lm}/projects/${n}/apps/${i}:${eA}?key=${s}`,body:{recaptcha_enterprise_token:e}}}function Dm(t,e){const{projectId:n,appId:i,apiKey:s}=t.options;return{url:`${Lm}/projects/${n}/apps/${i}:${tA}?key=${s}`,body:{debug_token:e}}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const aA="firebase-app-check-database",cA=1,Ws="firebase-app-check-store",Mm="debug-token";let br=null;function xm(){return br||(br=new Promise((t,e)=>{try{const n=indexedDB.open(aA,cA);n.onsuccess=i=>{t(i.target.result)},n.onerror=i=>{e(Me.create("storage-open",{originalErrorMessage:i.target.error?.message}))},n.onupgradeneeded=i=>{const s=i.target.result;switch(i.oldVersion){case 0:s.createObjectStore(Ws,{keyPath:"compositeKey"})}}}catch(n){e(Me.create("storage-open",{originalErrorMessage:n?.message}))}}),br)}function lA(t){return Um($m(t))}function uA(t,e){return Fm($m(t),e)}function dA(t){return Fm(Mm,t)}function hA(){return Um(Mm)}async function Fm(t,e){const i=(await xm()).transaction(Ws,"readwrite"),r=i.objectStore(Ws).put({compositeKey:t,value:e});return new Promise((o,a)=>{r.onsuccess=c=>{o()},i.onerror=c=>{a(Me.create("storage-set",{originalErrorMessage:c.target.error?.message}))}})}async function Um(t){const n=(await xm()).transaction(Ws,"readonly"),s=n.objectStore(Ws).get(t);return new Promise((r,o)=>{s.onsuccess=a=>{const c=a.target.result;r(c?c.value:void 0)},n.onerror=a=>{o(Me.create("storage-get",{originalErrorMessage:a.target.error?.message}))}})}function $m(t){return`${t.options.appId}-${t.name}`}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Xt=new Ho("@firebase/app-check");/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function fA(t){if($o()){let e;try{e=await lA(t)}catch(n){Xt.warn(`Failed to read token from IndexedDB. Error: ${n}`)}return e}}function ja(t,e){return $o()?uA(t,e).catch(n=>{Xt.warn(`Failed to write token to IndexedDB. Error: ${n}`)}):Promise.resolve()}async function pA(){let t;try{t=await hA()}catch{}if(t)return t;{const e=crypto.randomUUID();return dA(e).catch(n=>Xt.warn(`Failed to persist debug token to IndexedDB. Error: ${n}`)),e}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function gu(){return ia().enabled}async function mu(){const t=ia();if(t.enabled&&t.token)return t.token.promise;throw Error(`
            Can't get debug token in production mode.
        `)}function gA(){const t=tg(),e=ia();if(e.initialized=!0,typeof t.FIREBASE_APPCHECK_DEBUG_TOKEN!="string"&&t.FIREBASE_APPCHECK_DEBUG_TOKEN!==!0)return;e.enabled=!0;const n=new Le;e.token=n,typeof t.FIREBASE_APPCHECK_DEBUG_TOKEN=="string"?n.resolve(t.FIREBASE_APPCHECK_DEBUG_TOKEN):n.resolve(pA())}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const mA={error:"UNKNOWN_ERROR"};function _A(t){return Uo.encodeString(JSON.stringify(t),!1)}async function qc(t,e=!1,n=!1){const i=t.app;fu(i);const s=ue(i);let r=s.token,o;if(r&&!ci(r)&&(s.token=void 0,r=void 0),!r){const l=await s.cachedTokenPromise;l&&(ci(l)?r=l:await ja(i,void 0))}if(!e&&r&&ci(r))return{token:r.token};let a=!1;if(gu())try{s.exchangeTokenPromise||(s.exchangeTokenPromise=pu(Dm(i,await mu()),t.heartbeatServiceProvider).finally(()=>{s.exchangeTokenPromise=void 0}),a=!0);const l=await s.exchangeTokenPromise;return await ja(i,l),s.token=l,{token:l.token}}catch(l){return l.code==="appCheck/throttled"||l.code==="appCheck/initial-throttle"?Xt.warn(l.message):n&&Xt.error(l),qa(l)}try{s.exchangeTokenPromise||(s.exchangeTokenPromise=s.provider.getToken().finally(()=>{s.exchangeTokenPromise=void 0}),a=!0),r=await ue(i).exchangeTokenPromise}catch(l){l.code==="appCheck/throttled"||l.code==="appCheck/initial-throttle"?Xt.warn(l.message):n&&Xt.error(l),o=l}let c;return r?o?ci(r)?c={token:r.token,internalError:o}:c=qa(o):(c={token:r.token},s.token=r,await ja(i,r)):c=qa(o),a&&Vm(i,c),c}async function yA(t){const e=t.app;fu(e);const{provider:n}=ue(e);if(gu()){const i=await mu(),{token:s}=await pu(Dm(e,i),t.heartbeatServiceProvider);return{token:s}}else{const{token:i}=await n.getToken();return{token:i}}}function Bm(t,e,n,i){const{app:s}=t,r=ue(s),o={next:n,error:i,type:e};if(r.tokenObservers=[...r.tokenObservers,o],r.token&&ci(r.token)){const a=r.token;Promise.resolve().then(()=>{n({token:a.token}),of(t)}).catch(()=>{})}r.cachedTokenPromise.then(()=>of(t))}function Hm(t,e){const n=ue(t),i=n.tokenObservers.filter(s=>s.next!==e);i.length===0&&n.tokenRefresher&&n.tokenRefresher.isRunning()&&n.tokenRefresher.stop(),n.tokenObservers=i}function of(t){const{app:e}=t,n=ue(e);let i=n.tokenRefresher;i||(i=wA(t),n.tokenRefresher=i),!i.isRunning()&&n.isTokenAutoRefreshEnabled&&i.start()}function wA(t){const{app:e}=t;return new iA(async()=>{const n=ue(e);let i;if(n.token?i=await qc(t,!0):i=await qc(t),i.error)throw i.error;if(i.internalError)throw i.internalError},()=>!0,()=>{const n=ue(e);if(n.token){let i=n.token.issuedAtTimeMillis+(n.token.expireTimeMillis-n.token.issuedAtTimeMillis)*.5+3e5;const s=n.token.expireTimeMillis-300*1e3;return i=Math.min(i,s),Math.max(0,i-Date.now())}else return 0},sf.RETRIAL_MIN_WAIT,sf.RETRIAL_MAX_WAIT)}function Vm(t,e){const n=ue(t).tokenObservers;for(const i of n)try{i.type==="EXTERNAL"&&e.error!=null?i.error(e.error):i.next(e)}catch{}}function ci(t){return t.expireTimeMillis-Date.now()>0}function qa(t){return{token:_A(mA),error:t}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class vA{constructor(e,n){this.app=e,this.heartbeatServiceProvider=n}_delete(){const{tokenObservers:e}=ue(this.app);for(const n of e)Hm(this.app,n.next);return Promise.resolve()}}function bA(t,e){return new vA(t,e)}function EA(t){return{getToken:e=>qc(t,e),getLimitedUseToken:()=>yA(t),addTokenListener:e=>Bm(t,"INTERNAL",e),removeTokenListener:e=>Hm(t.app,e)}}const CA="@firebase/app-check",TA="0.11.0",SA="https://www.google.com/recaptcha/enterprise.js";function IA(t,e){const n=new Le,i=ue(t);i.reCAPTCHAState={initialized:n};const s=kA(t),r=rf(!0);return r?af(t,e,r,s,n):NA(()=>{const o=rf(!0);if(!o)throw new Error("no recaptcha");af(t,e,o,s,n)}),n.promise}function af(t,e,n,i,s){n.ready(()=>{AA(t,e,n,i),s.resolve(n)})}function kA(t){const e=`fire_app_check_${t.name}`,n=document.createElement("div");return n.id=e,n.style.display="none",document.body.appendChild(n),e}async function RA(t){fu(t);const n=await ue(t).reCAPTCHAState.initialized.promise;return new Promise((i,s)=>{const r=ue(t).reCAPTCHAState;n.ready(()=>{i(n.execute(r.widgetId,{action:"fire_app_check"}))})})}function AA(t,e,n,i){const s=n.render(i,{sitekey:e,size:"invisible",callback:()=>{ue(t).reCAPTCHAState.succeeded=!0},"error-callback":()=>{ue(t).reCAPTCHAState.succeeded=!1}}),r=ue(t);r.reCAPTCHAState={...r.reCAPTCHAState,widgetId:s}}function NA(t){const e=document.createElement("script");e.src=SA,e.onload=t,document.head.appendChild(e)}class _u{constructor(e){this._siteKey=e,this._throttleData=null}async getToken(){LA(this._throttleData);const e=await RA(this._app).catch(i=>{throw Me.create("recaptcha-error")});if(!ue(this._app).reCAPTCHAState?.succeeded)throw Me.create("recaptcha-error");let n;try{n=await pu(oA(this._app,e),this._heartbeatServiceProvider)}catch(i){throw i.code?.includes("fetch-status-error")?(this._throttleData=PA(Number(i.customData?.httpStatus),this._throttleData),Me.create("initial-throttle",{time:Om(this._throttleData.allowRequestsAfter-Date.now()),httpStatus:this._throttleData.httpStatus})):i}return this._throttleData=null,n}initialize(e){this._app=e,this._heartbeatServiceProvider=_n(e,"heartbeat"),IA(e,this._siteKey).catch(()=>{})}isEqual(e){return e instanceof _u?this._siteKey===e._siteKey:!1}}function PA(t,e){if(t===404||t===403)return{backoffCount:1,allowRequestsAfter:Date.now()+nA,httpStatus:t};{const n=e?e.backoffCount:0,i=RT(n,1e3,2);return{backoffCount:n+1,allowRequestsAfter:Date.now()+i,httpStatus:t}}}function LA(t){if(t&&Date.now()-t.allowRequestsAfter<=0)throw Me.create("throttled",{time:Om(t.allowRequestsAfter-Date.now()),httpStatus:t.httpStatus})}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function OA(t=Wo(),e){t=re(t);const n=_n(t,"app-check");if(ia().initialized||gA(),gu()&&mu().then(s=>console.log(`App Check debug token: ${s}. You will need to add it to your app's App Check settings in the Firebase console for it to work.`)),n.isInitialized()){const s=n.getImmediate(),r=n.getOptions();if(r.isTokenAutoRefreshEnabled===e.isTokenAutoRefreshEnabled&&r.provider.isEqual(e.provider))return s;throw Me.create("already-initialized",{appName:t.name})}const i=n.initialize({options:e});return DA(t,e.provider,e.isTokenAutoRefreshEnabled),ue(t).isTokenAutoRefreshEnabled&&Bm(i,"INTERNAL",()=>{}),i}function DA(t,e,n=!1){const i=ZR(t,{...Pm});i.activated=!0,i.provider=e,i.cachedTokenPromise=fA(t).then(s=>(s&&ci(s)&&(i.token=s,Vm(t,{token:s.token})),s)),i.isTokenAutoRefreshEnabled=n&&t.automaticDataCollectionEnabled,!t.automaticDataCollectionEnabled&&n&&Xt.warn("`isTokenAutoRefreshEnabled` is true but `automaticDataCollectionEnabled` was set to false during `initializeApp()`. This blocks automatic token refresh."),i.provider.initialize(t)}const MA="app-check",cf="app-check-internal";function xA(){Ye(new We(MA,t=>{const e=t.getProvider("app").getImmediate(),n=t.getProvider("heartbeat");return bA(e,n)},"PUBLIC").setInstantiationMode("EXPLICIT").setInstanceCreatedCallback((t,e,n)=>{t.getProvider(cf).initialize()})),Ye(new We(cf,t=>{const e=t.getProvider("app-check").getImmediate();return EA(e)},"PUBLIC").setInstantiationMode("EXPLICIT")),Ve(CA,TA)}xA();const FA={apiKey:"AIzaSyA-fvCaKCjyEFX__YAVr1oPGdVsUEhFehA",authDomain:"vidu-aae11.web.app",projectId:"vidu-aae11",databaseURL:"https://vidu-aae11-default-rtdb.europe-west1.firebasedatabase.app",storageBucket:"vidu-aae11.firebasestorage.app",messagingSenderId:"765724787439",appId:"1:765724787439:web:61a3b5dd538149564c911a",measurementId:"G-EGJ53HLGY4"},sa=hg(FA),UA=void 0;console.error("Missing VITE_FCM_VAPID_KEY: required for FCM web push");const lf="6LdBIBgsAAAAAB4zIcXaZI-FD4kt21TWs9Zx9_fp";let zc;if(lf.trim()!=="")zc=new _u(lf),console.info("[Firebase App Check: PROD] Initializing with ReCAPTCHA Enterprise (invisible mode).");else throw console.error("[Firebase App Check: PROD] VITE_RECAPTCHA_ENTERPRISE_SITE_KEY is missing or empty. App Check will NOT be initialized, leaving Firebase services unprotected!"),new Error("Firebase App Check configuration missing in production.");if(zc)try{OA(sa,{provider:zc,isTokenAutoRefreshEnabled:!0})}catch(t){console.error("[Firebase App Check] initializeAppCheck call failed:",t)}const E=zR(sa),st=[];function Rn(t,e,n,i=null,s=null,r=null){e==="value"?Nm(t,n):e==="child_added"?Vs(t,n):e==="child_removed"?UR(t,n):console.warn(`Unknown listener type: ${e}`),st.push({ref:t,type:e,callback:n,roomId:i,userId:s,category:r})}function $A(){st.forEach(({ref:t,type:e,callback:n})=>{try{kt(t,e,n)}catch(i){console.warn("Failed to remove firebase rtdb listener",i)}}),st.length=0}function ra(t){if(!t)return;st.filter(i=>i.roomId===t).forEach(({ref:i,type:s,callback:r})=>{try{kt(i,s,r)}catch(o){console.warn(`Failed to remove listener for room ${t}`,o)}});const n=st.filter(i=>i.roomId!==t);st.length=0,st.push(...n)}function BA(t,e){if(!t||!e)return;const n=r=>r.userId===t&&r.roomId===e;st.filter(n).forEach(({ref:r,type:o,callback:a})=>{try{kt(r,o,a)}catch(c){console.warn(`Failed to remove listener for user ${t} in room ${e}`,c)}});const s=st.filter(r=>!n(r));st.length=0,st.push(...s)}function Es(t,e,n=null){Rn(t,"value",e,n)}const En=t=>b(E,`rooms/${t}`),Er=t=>b(E,`rooms/${t}/members`),uf=(t,e)=>b(E,`rooms/${t}/members/${e}`),HA=t=>b(E,`rooms/${t}/cancellation`),oa=t=>b(E,`rooms/${t}/watch`),aa=t=>b(E,`rooms/${t}/watch/fileRequest`),VA=t=>b(E,`users/${t}/recentCalls`),yu=(t,e)=>b(E,`users/${t}/recentCalls/${e}`),wu=t=>b(E,`users/${t}/outgoingCall`),Wm=t=>b(E,`rooms/${t}/offerCandidates`),jm=t=>b(E,`rooms/${t}/answerCandidates`);function qm(){return{"dependent-sdk-initialized-before-auth":"Another Firebase SDK was initialized and is trying to use Auth before Auth is initialized. Please be sure to call `initializeAuth` or `getAuth` before starting any other Firebase SDK."}}const WA=qm,zm=new mn("auth","Firebase",qm());/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ho=new Ho("@firebase/auth");function jA(t,...e){ho.logLevel<=q.WARN&&ho.warn(`Auth (${Ki}): ${t}`,...e)}function Dr(t,...e){ho.logLevel<=q.ERROR&&ho.error(`Auth (${Ki}): ${t}`,...e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function wt(t,...e){throw bu(t,...e)}function ct(t,...e){return bu(t,...e)}function vu(t,e,n){const i={...WA(),[e]:n};return new mn("auth","Firebase",i).create(e,{appName:t.name})}function Dn(t){return vu(t,"operation-not-supported-in-this-environment","Operations that alter the current user are not supported in conjunction with FirebaseServerApp")}function qA(t,e,n){const i=n;if(!(e instanceof i))throw i.name!==e.constructor.name&&wt(t,"argument-error"),vu(t,"argument-error",`Type of ${e.constructor.name} does not match expected instance.Did you pass a reference from a different Auth SDK?`)}function bu(t,...e){if(typeof t!="string"){const n=e[0],i=[...e.slice(1)];return i[0]&&(i[0].appName=t.name),t._errorFactory.create(n,...i)}return zm.create(t,...e)}function I(t,e,...n){if(!t)throw bu(e,...n)}function Rt(t){const e="INTERNAL ASSERTION FAILED: "+t;throw Dr(e),new Error(e)}function $t(t,e){t||Rt(e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Gc(){return typeof self<"u"&&self.location?.href||""}function zA(){return df()==="http:"||df()==="https:"}function df(){return typeof self<"u"&&self.location?.protocol||null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function GA(){return typeof navigator<"u"&&navigator&&"onLine"in navigator&&typeof navigator.onLine=="boolean"&&(zA()||uT()||"connection"in navigator)?navigator.onLine:!0}function KA(){if(typeof navigator>"u")return null;const t=navigator;return t.languages&&t.languages[0]||t.language||null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class lr{constructor(e,n){this.shortDelay=e,this.longDelay=n,$t(n>e,"Short delay should be less than long delay!"),this.isMobile=Ll()||ag()}get(){return GA()?this.isMobile?this.longDelay:this.shortDelay:Math.min(5e3,this.shortDelay)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Eu(t,e){$t(t.emulator,"Emulator should always be set here");const{url:n}=t.emulator;return e?`${n}${e.startsWith("/")?e.slice(1):e}`:n}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Gm{static initialize(e,n,i){this.fetchImpl=e,n&&(this.headersImpl=n),i&&(this.responseImpl=i)}static fetch(){if(this.fetchImpl)return this.fetchImpl;if(typeof self<"u"&&"fetch"in self)return self.fetch;if(typeof globalThis<"u"&&globalThis.fetch)return globalThis.fetch;if(typeof fetch<"u")return fetch;Rt("Could not find fetch implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static headers(){if(this.headersImpl)return this.headersImpl;if(typeof self<"u"&&"Headers"in self)return self.Headers;if(typeof globalThis<"u"&&globalThis.Headers)return globalThis.Headers;if(typeof Headers<"u")return Headers;Rt("Could not find Headers implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static response(){if(this.responseImpl)return this.responseImpl;if(typeof self<"u"&&"Response"in self)return self.Response;if(typeof globalThis<"u"&&globalThis.Response)return globalThis.Response;if(typeof Response<"u")return Response;Rt("Could not find Response implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const YA={CREDENTIAL_MISMATCH:"custom-token-mismatch",MISSING_CUSTOM_TOKEN:"internal-error",INVALID_IDENTIFIER:"invalid-email",MISSING_CONTINUE_URI:"internal-error",INVALID_PASSWORD:"wrong-password",MISSING_PASSWORD:"missing-password",INVALID_LOGIN_CREDENTIALS:"invalid-credential",EMAIL_EXISTS:"email-already-in-use",PASSWORD_LOGIN_DISABLED:"operation-not-allowed",INVALID_IDP_RESPONSE:"invalid-credential",INVALID_PENDING_TOKEN:"invalid-credential",FEDERATED_USER_ID_ALREADY_LINKED:"credential-already-in-use",MISSING_REQ_TYPE:"internal-error",EMAIL_NOT_FOUND:"user-not-found",RESET_PASSWORD_EXCEED_LIMIT:"too-many-requests",EXPIRED_OOB_CODE:"expired-action-code",INVALID_OOB_CODE:"invalid-action-code",MISSING_OOB_CODE:"internal-error",CREDENTIAL_TOO_OLD_LOGIN_AGAIN:"requires-recent-login",INVALID_ID_TOKEN:"invalid-user-token",TOKEN_EXPIRED:"user-token-expired",USER_NOT_FOUND:"user-token-expired",TOO_MANY_ATTEMPTS_TRY_LATER:"too-many-requests",PASSWORD_DOES_NOT_MEET_REQUIREMENTS:"password-does-not-meet-requirements",INVALID_CODE:"invalid-verification-code",INVALID_SESSION_INFO:"invalid-verification-id",INVALID_TEMPORARY_PROOF:"invalid-credential",MISSING_SESSION_INFO:"missing-verification-id",SESSION_EXPIRED:"code-expired",MISSING_ANDROID_PACKAGE_NAME:"missing-android-pkg-name",UNAUTHORIZED_DOMAIN:"unauthorized-continue-uri",INVALID_OAUTH_CLIENT_ID:"invalid-oauth-client-id",ADMIN_ONLY_OPERATION:"admin-restricted-operation",INVALID_MFA_PENDING_CREDENTIAL:"invalid-multi-factor-session",MFA_ENROLLMENT_NOT_FOUND:"multi-factor-info-not-found",MISSING_MFA_ENROLLMENT_ID:"missing-multi-factor-info",MISSING_MFA_PENDING_CREDENTIAL:"missing-multi-factor-session",SECOND_FACTOR_EXISTS:"second-factor-already-in-use",SECOND_FACTOR_LIMIT_EXCEEDED:"maximum-second-factor-count-exceeded",BLOCKING_FUNCTION_ERROR_RESPONSE:"internal-error",RECAPTCHA_NOT_ENABLED:"recaptcha-not-enabled",MISSING_RECAPTCHA_TOKEN:"missing-recaptcha-token",INVALID_RECAPTCHA_TOKEN:"invalid-recaptcha-token",INVALID_RECAPTCHA_ACTION:"invalid-recaptcha-action",MISSING_CLIENT_TYPE:"missing-client-type",MISSING_RECAPTCHA_VERSION:"missing-recaptcha-version",INVALID_RECAPTCHA_VERSION:"invalid-recaptcha-version",INVALID_REQ_TYPE:"invalid-req-type"};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const JA=["/v1/accounts:signInWithCustomToken","/v1/accounts:signInWithEmailLink","/v1/accounts:signInWithIdp","/v1/accounts:signInWithPassword","/v1/accounts:signInWithPhoneNumber","/v1/token"],XA=new lr(3e4,6e4);function Cu(t,e){return t.tenantId&&!e.tenantId?{...e,tenantId:t.tenantId}:e}async function Zi(t,e,n,i,s={}){return Km(t,s,async()=>{let r={},o={};i&&(e==="GET"?o=i:r={body:JSON.stringify(i)});const a=Gi({key:t.config.apiKey,...o}).slice(1),c=await t._getAdditionalHeaders();c["Content-Type"]="application/json",t.languageCode&&(c["X-Firebase-Locale"]=t.languageCode);const l={method:e,headers:c,...r};return lT()||(l.referrerPolicy="no-referrer"),t.emulatorConfig&&zi(t.emulatorConfig.host)&&(l.credentials="include"),Gm.fetch()(await Ym(t,t.config.apiHost,n,a),l)})}async function Km(t,e,n){t._canInitEmulator=!1;const i={...YA,...e};try{const s=new ZA(t),r=await Promise.race([n(),s.promise]);s.clearNetworkTimeout();const o=await r.json();if("needConfirmation"in o)throw Cr(t,"account-exists-with-different-credential",o);if(r.ok&&!("errorMessage"in o))return o;{const a=r.ok?o.errorMessage:o.error.message,[c,l]=a.split(" : ");if(c==="FEDERATED_USER_ID_ALREADY_LINKED")throw Cr(t,"credential-already-in-use",o);if(c==="EMAIL_EXISTS")throw Cr(t,"email-already-in-use",o);if(c==="USER_DISABLED")throw Cr(t,"user-disabled",o);const u=i[c]||c.toLowerCase().replace(/[_\s]+/g,"-");if(l)throw vu(t,u,l);wt(t,u)}}catch(s){if(s instanceof Vt)throw s;wt(t,"network-request-failed",{message:String(s)})}}async function QA(t,e,n,i,s={}){const r=await Zi(t,e,n,i,s);return"mfaPendingCredential"in r&&wt(t,"multi-factor-auth-required",{_serverResponse:r}),r}async function Ym(t,e,n,i){const s=`${e}${n}?${i}`,r=t,o=r.config.emulator?Eu(t.config,s):`${t.config.apiScheme}://${s}`;return JA.includes(n)&&(await r._persistenceManagerAvailable,r._getPersistenceType()==="COOKIE")?r._getPersistence()._getFinalTarget(o).toString():o}class ZA{clearNetworkTimeout(){clearTimeout(this.timer)}constructor(e){this.auth=e,this.timer=null,this.promise=new Promise((n,i)=>{this.timer=setTimeout(()=>i(ct(this.auth,"network-request-failed")),XA.get())})}}function Cr(t,e,n){const i={appName:t.name};n.email&&(i.email=n.email),n.phoneNumber&&(i.phoneNumber=n.phoneNumber);const s=ct(t,e,i);return s.customData._tokenResponse=n,s}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function eN(t,e){return Zi(t,"POST","/v1/accounts:delete",e)}async function fo(t,e){return Zi(t,"POST","/v1/accounts:lookup",e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Cs(t){if(t)try{const e=new Date(Number(t));if(!isNaN(e.getTime()))return e.toUTCString()}catch{}}async function tN(t,e=!1){const n=re(t),i=await n.getIdToken(e),s=Tu(i);I(s&&s.exp&&s.auth_time&&s.iat,n.auth,"internal-error");const r=typeof s.firebase=="object"?s.firebase:void 0,o=r?.sign_in_provider;return{claims:s,token:i,authTime:Cs(za(s.auth_time)),issuedAtTime:Cs(za(s.iat)),expirationTime:Cs(za(s.exp)),signInProvider:o||null,signInSecondFactor:r?.sign_in_second_factor||null}}function za(t){return Number(t)*1e3}function Tu(t){const[e,n,i]=t.split(".");if(e===void 0||n===void 0||i===void 0)return Dr("JWT malformed, contained fewer than 3 sections"),null;try{const s=zr(n);return s?JSON.parse(s):(Dr("Failed to decode base64 JWT payload"),null)}catch(s){return Dr("Caught error parsing JWT payload as JSON",s?.toString()),null}}function hf(t){const e=Tu(t);return I(e,"internal-error"),I(typeof e.exp<"u","internal-error"),I(typeof e.iat<"u","internal-error"),Number(e.exp)-Number(e.iat)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function js(t,e,n=!1){if(n)return e;try{return await e}catch(i){throw i instanceof Vt&&nN(i)&&t.auth.currentUser===t&&await t.auth.signOut(),i}}function nN({code:t}){return t==="auth/user-disabled"||t==="auth/user-token-expired"}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class iN{constructor(e){this.user=e,this.isRunning=!1,this.timerId=null,this.errorBackoff=3e4}_start(){this.isRunning||(this.isRunning=!0,this.schedule())}_stop(){this.isRunning&&(this.isRunning=!1,this.timerId!==null&&clearTimeout(this.timerId))}getInterval(e){if(e){const n=this.errorBackoff;return this.errorBackoff=Math.min(this.errorBackoff*2,96e4),n}else{this.errorBackoff=3e4;const i=(this.user.stsTokenManager.expirationTime??0)-Date.now()-3e5;return Math.max(0,i)}}schedule(e=!1){if(!this.isRunning)return;const n=this.getInterval(e);this.timerId=setTimeout(async()=>{await this.iteration()},n)}async iteration(){try{await this.user.getIdToken(!0)}catch(e){e?.code==="auth/network-request-failed"&&this.schedule(!0);return}this.schedule()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Kc{constructor(e,n){this.createdAt=e,this.lastLoginAt=n,this._initializeTime()}_initializeTime(){this.lastSignInTime=Cs(this.lastLoginAt),this.creationTime=Cs(this.createdAt)}_copy(e){this.createdAt=e.createdAt,this.lastLoginAt=e.lastLoginAt,this._initializeTime()}toJSON(){return{createdAt:this.createdAt,lastLoginAt:this.lastLoginAt}}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function po(t){const e=t.auth,n=await t.getIdToken(),i=await js(t,fo(e,{idToken:n}));I(i?.users.length,e,"internal-error");const s=i.users[0];t._notifyReloadListener(s);const r=s.providerUserInfo?.length?Jm(s.providerUserInfo):[],o=rN(t.providerData,r),a=t.isAnonymous,c=!(t.email&&s.passwordHash)&&!o?.length,l=a?c:!1,u={uid:s.localId,displayName:s.displayName||null,photoURL:s.photoUrl||null,email:s.email||null,emailVerified:s.emailVerified||!1,phoneNumber:s.phoneNumber||null,tenantId:s.tenantId||null,providerData:o,metadata:new Kc(s.createdAt,s.lastLoginAt),isAnonymous:l};Object.assign(t,u)}async function sN(t){const e=re(t);await po(e),await e.auth._persistUserIfCurrent(e),e.auth._notifyListenersIfCurrent(e)}function rN(t,e){return[...t.filter(i=>!e.some(s=>s.providerId===i.providerId)),...e]}function Jm(t){return t.map(({providerId:e,...n})=>({providerId:e,uid:n.rawId||"",displayName:n.displayName||null,email:n.email||null,phoneNumber:n.phoneNumber||null,photoURL:n.photoUrl||null}))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function oN(t,e){const n=await Km(t,{},async()=>{const i=Gi({grant_type:"refresh_token",refresh_token:e}).slice(1),{tokenApiHost:s,apiKey:r}=t.config,o=await Ym(t,s,"/v1/token",`key=${r}`),a=await t._getAdditionalHeaders();a["Content-Type"]="application/x-www-form-urlencoded";const c={method:"POST",headers:a,body:i};return t.emulatorConfig&&zi(t.emulatorConfig.host)&&(c.credentials="include"),Gm.fetch()(o,c)});return{accessToken:n.access_token,expiresIn:n.expires_in,refreshToken:n.refresh_token}}async function aN(t,e){return Zi(t,"POST","/v2/accounts:revokeToken",Cu(t,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class gi{constructor(){this.refreshToken=null,this.accessToken=null,this.expirationTime=null}get isExpired(){return!this.expirationTime||Date.now()>this.expirationTime-3e4}updateFromServerResponse(e){I(e.idToken,"internal-error"),I(typeof e.idToken<"u","internal-error"),I(typeof e.refreshToken<"u","internal-error");const n="expiresIn"in e&&typeof e.expiresIn<"u"?Number(e.expiresIn):hf(e.idToken);this.updateTokensAndExpiration(e.idToken,e.refreshToken,n)}updateFromIdToken(e){I(e.length!==0,"internal-error");const n=hf(e);this.updateTokensAndExpiration(e,null,n)}async getToken(e,n=!1){return!n&&this.accessToken&&!this.isExpired?this.accessToken:(I(this.refreshToken,e,"user-token-expired"),this.refreshToken?(await this.refresh(e,this.refreshToken),this.accessToken):null)}clearRefreshToken(){this.refreshToken=null}async refresh(e,n){const{accessToken:i,refreshToken:s,expiresIn:r}=await oN(e,n);this.updateTokensAndExpiration(i,s,Number(r))}updateTokensAndExpiration(e,n,i){this.refreshToken=n||null,this.accessToken=e||null,this.expirationTime=Date.now()+i*1e3}static fromJSON(e,n){const{refreshToken:i,accessToken:s,expirationTime:r}=n,o=new gi;return i&&(I(typeof i=="string","internal-error",{appName:e}),o.refreshToken=i),s&&(I(typeof s=="string","internal-error",{appName:e}),o.accessToken=s),r&&(I(typeof r=="number","internal-error",{appName:e}),o.expirationTime=r),o}toJSON(){return{refreshToken:this.refreshToken,accessToken:this.accessToken,expirationTime:this.expirationTime}}_assign(e){this.accessToken=e.accessToken,this.refreshToken=e.refreshToken,this.expirationTime=e.expirationTime}_clone(){return Object.assign(new gi,this.toJSON())}_performRefresh(){return Rt("not implemented")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function qt(t,e){I(typeof t=="string"||typeof t>"u","internal-error",{appName:e})}class rt{constructor({uid:e,auth:n,stsTokenManager:i,...s}){this.providerId="firebase",this.proactiveRefresh=new iN(this),this.reloadUserInfo=null,this.reloadListener=null,this.uid=e,this.auth=n,this.stsTokenManager=i,this.accessToken=i.accessToken,this.displayName=s.displayName||null,this.email=s.email||null,this.emailVerified=s.emailVerified||!1,this.phoneNumber=s.phoneNumber||null,this.photoURL=s.photoURL||null,this.isAnonymous=s.isAnonymous||!1,this.tenantId=s.tenantId||null,this.providerData=s.providerData?[...s.providerData]:[],this.metadata=new Kc(s.createdAt||void 0,s.lastLoginAt||void 0)}async getIdToken(e){const n=await js(this,this.stsTokenManager.getToken(this.auth,e));return I(n,this.auth,"internal-error"),this.accessToken!==n&&(this.accessToken=n,await this.auth._persistUserIfCurrent(this),this.auth._notifyListenersIfCurrent(this)),n}getIdTokenResult(e){return tN(this,e)}reload(){return sN(this)}_assign(e){this!==e&&(I(this.uid===e.uid,this.auth,"internal-error"),this.displayName=e.displayName,this.photoURL=e.photoURL,this.email=e.email,this.emailVerified=e.emailVerified,this.phoneNumber=e.phoneNumber,this.isAnonymous=e.isAnonymous,this.tenantId=e.tenantId,this.providerData=e.providerData.map(n=>({...n})),this.metadata._copy(e.metadata),this.stsTokenManager._assign(e.stsTokenManager))}_clone(e){const n=new rt({...this,auth:e,stsTokenManager:this.stsTokenManager._clone()});return n.metadata._copy(this.metadata),n}_onReload(e){I(!this.reloadListener,this.auth,"internal-error"),this.reloadListener=e,this.reloadUserInfo&&(this._notifyReloadListener(this.reloadUserInfo),this.reloadUserInfo=null)}_notifyReloadListener(e){this.reloadListener?this.reloadListener(e):this.reloadUserInfo=e}_startProactiveRefresh(){this.proactiveRefresh._start()}_stopProactiveRefresh(){this.proactiveRefresh._stop()}async _updateTokensIfNecessary(e,n=!1){let i=!1;e.idToken&&e.idToken!==this.stsTokenManager.accessToken&&(this.stsTokenManager.updateFromServerResponse(e),i=!0),n&&await po(this),await this.auth._persistUserIfCurrent(this),i&&this.auth._notifyListenersIfCurrent(this)}async delete(){if(tt(this.auth.app))return Promise.reject(Dn(this.auth));const e=await this.getIdToken();return await js(this,eN(this.auth,{idToken:e})),this.stsTokenManager.clearRefreshToken(),this.auth.signOut()}toJSON(){return{uid:this.uid,email:this.email||void 0,emailVerified:this.emailVerified,displayName:this.displayName||void 0,isAnonymous:this.isAnonymous,photoURL:this.photoURL||void 0,phoneNumber:this.phoneNumber||void 0,tenantId:this.tenantId||void 0,providerData:this.providerData.map(e=>({...e})),stsTokenManager:this.stsTokenManager.toJSON(),_redirectEventId:this._redirectEventId,...this.metadata.toJSON(),apiKey:this.auth.config.apiKey,appName:this.auth.name}}get refreshToken(){return this.stsTokenManager.refreshToken||""}static _fromJSON(e,n){const i=n.displayName??void 0,s=n.email??void 0,r=n.phoneNumber??void 0,o=n.photoURL??void 0,a=n.tenantId??void 0,c=n._redirectEventId??void 0,l=n.createdAt??void 0,u=n.lastLoginAt??void 0,{uid:d,emailVerified:h,isAnonymous:f,providerData:p,stsTokenManager:_}=n;I(d&&_,e,"internal-error");const m=gi.fromJSON(this.name,_);I(typeof d=="string",e,"internal-error"),qt(i,e.name),qt(s,e.name),I(typeof h=="boolean",e,"internal-error"),I(typeof f=="boolean",e,"internal-error"),qt(r,e.name),qt(o,e.name),qt(a,e.name),qt(c,e.name),qt(l,e.name),qt(u,e.name);const R=new rt({uid:d,auth:e,email:s,emailVerified:h,displayName:i,isAnonymous:f,photoURL:o,phoneNumber:r,tenantId:a,stsTokenManager:m,createdAt:l,lastLoginAt:u});return p&&Array.isArray(p)&&(R.providerData=p.map(M=>({...M}))),c&&(R._redirectEventId=c),R}static async _fromIdTokenResponse(e,n,i=!1){const s=new gi;s.updateFromServerResponse(n);const r=new rt({uid:n.localId,auth:e,stsTokenManager:s,isAnonymous:i});return await po(r),r}static async _fromGetAccountInfoResponse(e,n,i){const s=n.users[0];I(s.localId!==void 0,"internal-error");const r=s.providerUserInfo!==void 0?Jm(s.providerUserInfo):[],o=!(s.email&&s.passwordHash)&&!r?.length,a=new gi;a.updateFromIdToken(i);const c=new rt({uid:s.localId,auth:e,stsTokenManager:a,isAnonymous:o}),l={uid:s.localId,displayName:s.displayName||null,photoURL:s.photoUrl||null,email:s.email||null,emailVerified:s.emailVerified||!1,phoneNumber:s.phoneNumber||null,tenantId:s.tenantId||null,providerData:r,metadata:new Kc(s.createdAt,s.lastLoginAt),isAnonymous:!(s.email&&s.passwordHash)&&!r?.length};return Object.assign(c,l),c}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ff=new Map;function At(t){$t(t instanceof Function,"Expected a class definition");let e=ff.get(t);return e?($t(e instanceof t,"Instance stored in cache mismatched with class"),e):(e=new t,ff.set(t,e),e)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Xm{constructor(){this.type="NONE",this.storage={}}async _isAvailable(){return!0}async _set(e,n){this.storage[e]=n}async _get(e){const n=this.storage[e];return n===void 0?null:n}async _remove(e){delete this.storage[e]}_addListener(e,n){}_removeListener(e,n){}}Xm.type="NONE";const Yc=Xm;/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Mr(t,e,n){return`firebase:${t}:${e}:${n}`}class mi{constructor(e,n,i){this.persistence=e,this.auth=n,this.userKey=i;const{config:s,name:r}=this.auth;this.fullUserKey=Mr(this.userKey,s.apiKey,r),this.fullPersistenceKey=Mr("persistence",s.apiKey,r),this.boundEventHandler=n._onStorageEvent.bind(n),this.persistence._addListener(this.fullUserKey,this.boundEventHandler)}setCurrentUser(e){return this.persistence._set(this.fullUserKey,e.toJSON())}async getCurrentUser(){const e=await this.persistence._get(this.fullUserKey);if(!e)return null;if(typeof e=="string"){const n=await fo(this.auth,{idToken:e}).catch(()=>{});return n?rt._fromGetAccountInfoResponse(this.auth,n,e):null}return rt._fromJSON(this.auth,e)}removeCurrentUser(){return this.persistence._remove(this.fullUserKey)}savePersistenceForRedirect(){return this.persistence._set(this.fullPersistenceKey,this.persistence.type)}async setPersistence(e){if(this.persistence===e)return;const n=await this.getCurrentUser();if(await this.removeCurrentUser(),this.persistence=e,n)return this.setCurrentUser(n)}delete(){this.persistence._removeListener(this.fullUserKey,this.boundEventHandler)}static async create(e,n,i="authUser"){if(!n.length)return new mi(At(Yc),e,i);const s=(await Promise.all(n.map(async l=>{if(await l._isAvailable())return l}))).filter(l=>l);let r=s[0]||At(Yc);const o=Mr(i,e.config.apiKey,e.name);let a=null;for(const l of n)try{const u=await l._get(o);if(u){let d;if(typeof u=="string"){const h=await fo(e,{idToken:u}).catch(()=>{});if(!h)break;d=await rt._fromGetAccountInfoResponse(e,h,u)}else d=rt._fromJSON(e,u);l!==r&&(a=d),r=l;break}}catch{}const c=s.filter(l=>l._shouldAllowMigration);return!r._shouldAllowMigration||!c.length?new mi(r,e,i):(r=c[0],a&&await r._set(o,a.toJSON()),await Promise.all(n.map(async l=>{if(l!==r)try{await l._remove(o)}catch{}})),new mi(r,e,i))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function pf(t){const e=t.toLowerCase();if(e.includes("opera/")||e.includes("opr/")||e.includes("opios/"))return"Opera";if(t_(e))return"IEMobile";if(e.includes("msie")||e.includes("trident/"))return"IE";if(e.includes("edge/"))return"Edge";if(Qm(e))return"Firefox";if(e.includes("silk/"))return"Silk";if(i_(e))return"Blackberry";if(s_(e))return"Webos";if(Zm(e))return"Safari";if((e.includes("chrome/")||e_(e))&&!e.includes("edge/"))return"Chrome";if(n_(e))return"Android";{const n=/([a-zA-Z\d\.]+)\/[a-zA-Z\d\.]*$/,i=t.match(n);if(i?.length===2)return i[1]}return"Other"}function Qm(t=Ne()){return/firefox\//i.test(t)}function Zm(t=Ne()){const e=t.toLowerCase();return e.includes("safari/")&&!e.includes("chrome/")&&!e.includes("crios/")&&!e.includes("android")}function e_(t=Ne()){return/crios\//i.test(t)}function t_(t=Ne()){return/iemobile/i.test(t)}function n_(t=Ne()){return/android/i.test(t)}function i_(t=Ne()){return/blackberry/i.test(t)}function s_(t=Ne()){return/webos/i.test(t)}function Su(t=Ne()){return/iphone|ipad|ipod/i.test(t)||/macintosh/i.test(t)&&/mobile/i.test(t)}function cN(t=Ne()){return Su(t)&&!!window.navigator?.standalone}function lN(){return dT()&&document.documentMode===10}function r_(t=Ne()){return Su(t)||n_(t)||s_(t)||i_(t)||/windows phone/i.test(t)||t_(t)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function o_(t,e=[]){let n;switch(t){case"Browser":n=pf(Ne());break;case"Worker":n=`${pf(Ne())}-${t}`;break;default:n=t}const i=e.length?e.join(","):"FirebaseCore-web";return`${n}/JsCore/${Ki}/${i}`}/**
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
 */class uN{constructor(e){this.auth=e,this.queue=[]}pushCallback(e,n){const i=r=>new Promise((o,a)=>{try{const c=e(r);o(c)}catch(c){a(c)}});i.onAbort=n,this.queue.push(i);const s=this.queue.length-1;return()=>{this.queue[s]=()=>Promise.resolve()}}async runMiddleware(e){if(this.auth.currentUser===e)return;const n=[];try{for(const i of this.queue)await i(e),i.onAbort&&n.push(i.onAbort)}catch(i){n.reverse();for(const s of n)try{s()}catch{}throw this.auth._errorFactory.create("login-blocked",{originalMessage:i?.message})}}}/**
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
 */async function dN(t,e={}){return Zi(t,"GET","/v2/passwordPolicy",Cu(t,e))}/**
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
 */const hN=6;class fN{constructor(e){const n=e.customStrengthOptions;this.customStrengthOptions={},this.customStrengthOptions.minPasswordLength=n.minPasswordLength??hN,n.maxPasswordLength&&(this.customStrengthOptions.maxPasswordLength=n.maxPasswordLength),n.containsLowercaseCharacter!==void 0&&(this.customStrengthOptions.containsLowercaseLetter=n.containsLowercaseCharacter),n.containsUppercaseCharacter!==void 0&&(this.customStrengthOptions.containsUppercaseLetter=n.containsUppercaseCharacter),n.containsNumericCharacter!==void 0&&(this.customStrengthOptions.containsNumericCharacter=n.containsNumericCharacter),n.containsNonAlphanumericCharacter!==void 0&&(this.customStrengthOptions.containsNonAlphanumericCharacter=n.containsNonAlphanumericCharacter),this.enforcementState=e.enforcementState,this.enforcementState==="ENFORCEMENT_STATE_UNSPECIFIED"&&(this.enforcementState="OFF"),this.allowedNonAlphanumericCharacters=e.allowedNonAlphanumericCharacters?.join("")??"",this.forceUpgradeOnSignin=e.forceUpgradeOnSignin??!1,this.schemaVersion=e.schemaVersion}validatePassword(e){const n={isValid:!0,passwordPolicy:this};return this.validatePasswordLengthOptions(e,n),this.validatePasswordCharacterOptions(e,n),n.isValid&&(n.isValid=n.meetsMinPasswordLength??!0),n.isValid&&(n.isValid=n.meetsMaxPasswordLength??!0),n.isValid&&(n.isValid=n.containsLowercaseLetter??!0),n.isValid&&(n.isValid=n.containsUppercaseLetter??!0),n.isValid&&(n.isValid=n.containsNumericCharacter??!0),n.isValid&&(n.isValid=n.containsNonAlphanumericCharacter??!0),n}validatePasswordLengthOptions(e,n){const i=this.customStrengthOptions.minPasswordLength,s=this.customStrengthOptions.maxPasswordLength;i&&(n.meetsMinPasswordLength=e.length>=i),s&&(n.meetsMaxPasswordLength=e.length<=s)}validatePasswordCharacterOptions(e,n){this.updatePasswordCharacterOptionsStatuses(n,!1,!1,!1,!1);let i;for(let s=0;s<e.length;s++)i=e.charAt(s),this.updatePasswordCharacterOptionsStatuses(n,i>="a"&&i<="z",i>="A"&&i<="Z",i>="0"&&i<="9",this.allowedNonAlphanumericCharacters.includes(i))}updatePasswordCharacterOptionsStatuses(e,n,i,s,r){this.customStrengthOptions.containsLowercaseLetter&&(e.containsLowercaseLetter||(e.containsLowercaseLetter=n)),this.customStrengthOptions.containsUppercaseLetter&&(e.containsUppercaseLetter||(e.containsUppercaseLetter=i)),this.customStrengthOptions.containsNumericCharacter&&(e.containsNumericCharacter||(e.containsNumericCharacter=s)),this.customStrengthOptions.containsNonAlphanumericCharacter&&(e.containsNonAlphanumericCharacter||(e.containsNonAlphanumericCharacter=r))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class pN{constructor(e,n,i,s){this.app=e,this.heartbeatServiceProvider=n,this.appCheckServiceProvider=i,this.config=s,this.currentUser=null,this.emulatorConfig=null,this.operations=Promise.resolve(),this.authStateSubscription=new gf(this),this.idTokenSubscription=new gf(this),this.beforeStateQueue=new uN(this),this.redirectUser=null,this.isProactiveRefreshEnabled=!1,this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION=1,this._canInitEmulator=!0,this._isInitialized=!1,this._deleted=!1,this._initializationPromise=null,this._popupRedirectResolver=null,this._errorFactory=zm,this._agentRecaptchaConfig=null,this._tenantRecaptchaConfigs={},this._projectPasswordPolicy=null,this._tenantPasswordPolicies={},this._resolvePersistenceManagerAvailable=void 0,this.lastNotifiedUid=void 0,this.languageCode=null,this.tenantId=null,this.settings={appVerificationDisabledForTesting:!1},this.frameworks=[],this.name=e.name,this.clientVersion=s.sdkClientVersion,this._persistenceManagerAvailable=new Promise(r=>this._resolvePersistenceManagerAvailable=r)}_initializeWithPersistence(e,n){return n&&(this._popupRedirectResolver=At(n)),this._initializationPromise=this.queue(async()=>{if(!this._deleted&&(this.persistenceManager=await mi.create(this,e),this._resolvePersistenceManagerAvailable?.(),!this._deleted)){if(this._popupRedirectResolver?._shouldInitProactively)try{await this._popupRedirectResolver._initialize(this)}catch{}await this.initializeCurrentUser(n),this.lastNotifiedUid=this.currentUser?.uid||null,!this._deleted&&(this._isInitialized=!0)}}),this._initializationPromise}async _onStorageEvent(){if(this._deleted)return;const e=await this.assertedPersistence.getCurrentUser();if(!(!this.currentUser&&!e)){if(this.currentUser&&e&&this.currentUser.uid===e.uid){this._currentUser._assign(e),await this.currentUser.getIdToken();return}await this._updateCurrentUser(e,!0)}}async initializeCurrentUserFromIdToken(e){try{const n=await fo(this,{idToken:e}),i=await rt._fromGetAccountInfoResponse(this,n,e);await this.directlySetCurrentUser(i)}catch(n){console.warn("FirebaseServerApp could not login user with provided authIdToken: ",n),await this.directlySetCurrentUser(null)}}async initializeCurrentUser(e){if(tt(this.app)){const r=this.app.settings.authIdToken;return r?new Promise(o=>{setTimeout(()=>this.initializeCurrentUserFromIdToken(r).then(o,o))}):this.directlySetCurrentUser(null)}const n=await this.assertedPersistence.getCurrentUser();let i=n,s=!1;if(e&&this.config.authDomain){await this.getOrInitRedirectPersistenceManager();const r=this.redirectUser?._redirectEventId,o=i?._redirectEventId,a=await this.tryRedirectSignIn(e);(!r||r===o)&&a?.user&&(i=a.user,s=!0)}if(!i)return this.directlySetCurrentUser(null);if(!i._redirectEventId){if(s)try{await this.beforeStateQueue.runMiddleware(i)}catch(r){i=n,this._popupRedirectResolver._overrideRedirectResult(this,()=>Promise.reject(r))}return i?this.reloadAndSetCurrentUserOrClear(i):this.directlySetCurrentUser(null)}return I(this._popupRedirectResolver,this,"argument-error"),await this.getOrInitRedirectPersistenceManager(),this.redirectUser&&this.redirectUser._redirectEventId===i._redirectEventId?this.directlySetCurrentUser(i):this.reloadAndSetCurrentUserOrClear(i)}async tryRedirectSignIn(e){let n=null;try{n=await this._popupRedirectResolver._completeRedirectFn(this,e,!0)}catch{await this._setRedirectUser(null)}return n}async reloadAndSetCurrentUserOrClear(e){try{await po(e)}catch(n){if(n?.code!=="auth/network-request-failed")return this.directlySetCurrentUser(null)}return this.directlySetCurrentUser(e)}useDeviceLanguage(){this.languageCode=KA()}async _delete(){this._deleted=!0}async updateCurrentUser(e){if(tt(this.app))return Promise.reject(Dn(this));const n=e?re(e):null;return n&&I(n.auth.config.apiKey===this.config.apiKey,this,"invalid-user-token"),this._updateCurrentUser(n&&n._clone(this))}async _updateCurrentUser(e,n=!1){if(!this._deleted)return e&&I(this.tenantId===e.tenantId,this,"tenant-id-mismatch"),n||await this.beforeStateQueue.runMiddleware(e),this.queue(async()=>{await this.directlySetCurrentUser(e),this.notifyAuthListeners()})}async signOut(){return tt(this.app)?Promise.reject(Dn(this)):(await this.beforeStateQueue.runMiddleware(null),(this.redirectPersistenceManager||this._popupRedirectResolver)&&await this._setRedirectUser(null),this._updateCurrentUser(null,!0))}setPersistence(e){return tt(this.app)?Promise.reject(Dn(this)):this.queue(async()=>{await this.assertedPersistence.setPersistence(At(e))})}_getRecaptchaConfig(){return this.tenantId==null?this._agentRecaptchaConfig:this._tenantRecaptchaConfigs[this.tenantId]}async validatePassword(e){this._getPasswordPolicyInternal()||await this._updatePasswordPolicy();const n=this._getPasswordPolicyInternal();return n.schemaVersion!==this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION?Promise.reject(this._errorFactory.create("unsupported-password-policy-schema-version",{})):n.validatePassword(e)}_getPasswordPolicyInternal(){return this.tenantId===null?this._projectPasswordPolicy:this._tenantPasswordPolicies[this.tenantId]}async _updatePasswordPolicy(){const e=await dN(this),n=new fN(e);this.tenantId===null?this._projectPasswordPolicy=n:this._tenantPasswordPolicies[this.tenantId]=n}_getPersistenceType(){return this.assertedPersistence.persistence.type}_getPersistence(){return this.assertedPersistence.persistence}_updateErrorMap(e){this._errorFactory=new mn("auth","Firebase",e())}onAuthStateChanged(e,n,i){return this.registerStateListener(this.authStateSubscription,e,n,i)}beforeAuthStateChanged(e,n){return this.beforeStateQueue.pushCallback(e,n)}onIdTokenChanged(e,n,i){return this.registerStateListener(this.idTokenSubscription,e,n,i)}authStateReady(){return new Promise((e,n)=>{if(this.currentUser)e();else{const i=this.onAuthStateChanged(()=>{i(),e()},n)}})}async revokeAccessToken(e){if(this.currentUser){const n=await this.currentUser.getIdToken(),i={providerId:"apple.com",tokenType:"ACCESS_TOKEN",token:e,idToken:n};this.tenantId!=null&&(i.tenantId=this.tenantId),await aN(this,i)}}toJSON(){return{apiKey:this.config.apiKey,authDomain:this.config.authDomain,appName:this.name,currentUser:this._currentUser?.toJSON()}}async _setRedirectUser(e,n){const i=await this.getOrInitRedirectPersistenceManager(n);return e===null?i.removeCurrentUser():i.setCurrentUser(e)}async getOrInitRedirectPersistenceManager(e){if(!this.redirectPersistenceManager){const n=e&&At(e)||this._popupRedirectResolver;I(n,this,"argument-error"),this.redirectPersistenceManager=await mi.create(this,[At(n._redirectPersistence)],"redirectUser"),this.redirectUser=await this.redirectPersistenceManager.getCurrentUser()}return this.redirectPersistenceManager}async _redirectUserForId(e){return this._isInitialized&&await this.queue(async()=>{}),this._currentUser?._redirectEventId===e?this._currentUser:this.redirectUser?._redirectEventId===e?this.redirectUser:null}async _persistUserIfCurrent(e){if(e===this.currentUser)return this.queue(async()=>this.directlySetCurrentUser(e))}_notifyListenersIfCurrent(e){e===this.currentUser&&this.notifyAuthListeners()}_key(){return`${this.config.authDomain}:${this.config.apiKey}:${this.name}`}_startProactiveRefresh(){this.isProactiveRefreshEnabled=!0,this.currentUser&&this._currentUser._startProactiveRefresh()}_stopProactiveRefresh(){this.isProactiveRefreshEnabled=!1,this.currentUser&&this._currentUser._stopProactiveRefresh()}get _currentUser(){return this.currentUser}notifyAuthListeners(){if(!this._isInitialized)return;this.idTokenSubscription.next(this.currentUser);const e=this.currentUser?.uid??null;this.lastNotifiedUid!==e&&(this.lastNotifiedUid=e,this.authStateSubscription.next(this.currentUser))}registerStateListener(e,n,i,s){if(this._deleted)return()=>{};const r=typeof n=="function"?n:n.next.bind(n);let o=!1;const a=this._isInitialized?Promise.resolve():this._initializationPromise;if(I(a,this,"internal-error"),a.then(()=>{o||r(this.currentUser)}),typeof n=="function"){const c=e.addObserver(n,i,s);return()=>{o=!0,c()}}else{const c=e.addObserver(n);return()=>{o=!0,c()}}}async directlySetCurrentUser(e){this.currentUser&&this.currentUser!==e&&this._currentUser._stopProactiveRefresh(),e&&this.isProactiveRefreshEnabled&&e._startProactiveRefresh(),this.currentUser=e,e?await this.assertedPersistence.setCurrentUser(e):await this.assertedPersistence.removeCurrentUser()}queue(e){return this.operations=this.operations.then(e,e),this.operations}get assertedPersistence(){return I(this.persistenceManager,this,"internal-error"),this.persistenceManager}_logFramework(e){!e||this.frameworks.includes(e)||(this.frameworks.push(e),this.frameworks.sort(),this.clientVersion=o_(this.config.clientPlatform,this._getFrameworks()))}_getFrameworks(){return this.frameworks}async _getAdditionalHeaders(){const e={"X-Client-Version":this.clientVersion};this.app.options.appId&&(e["X-Firebase-gmpid"]=this.app.options.appId);const n=await this.heartbeatServiceProvider.getImmediate({optional:!0})?.getHeartbeatsHeader();n&&(e["X-Firebase-Client"]=n);const i=await this._getAppCheckToken();return i&&(e["X-Firebase-AppCheck"]=i),e}async _getAppCheckToken(){if(tt(this.app)&&this.app.settings.appCheckToken)return this.app.settings.appCheckToken;const e=await this.appCheckServiceProvider.getImmediate({optional:!0})?.getToken();return e?.error&&jA(`Error while retrieving App Check token: ${e.error}`),e?.token}}function es(t){return re(t)}class gf{constructor(e){this.auth=e,this.observer=null,this.addObserver=vT(n=>this.observer=n)}get next(){return I(this.observer,this.auth,"internal-error"),this.observer.next.bind(this.observer)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Iu={async loadJS(){throw new Error("Unable to load external scripts")},recaptchaV2Script:"",recaptchaEnterpriseScript:"",gapiScript:""};function gN(t){Iu=t}function mN(t){return Iu.loadJS(t)}function _N(){return Iu.gapiScript}function yN(t){return`__${t}${Math.floor(Math.random()*1e6)}`}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function wN(t,e){const n=_n(t,"auth");if(n.isInitialized()){const s=n.getImmediate(),r=n.getOptions();if(Un(r,e??{}))return s;wt(s,"already-initialized")}return n.initialize({options:e})}function vN(t,e){const n=e?.persistence||[],i=(Array.isArray(n)?n:[n]).map(At);e?.errorMap&&t._updateErrorMap(e.errorMap),t._initializeWithPersistence(i,e?.popupRedirectResolver)}function bN(t,e,n){const i=es(t);I(/^https?:\/\//.test(e),i,"invalid-emulator-scheme");const s=!1,r=a_(e),{host:o,port:a}=EN(e),c=a===null?"":`:${a}`,l={url:`${r}//${o}${c}/`},u=Object.freeze({host:o,port:a,protocol:r.replace(":",""),options:Object.freeze({disableWarnings:s})});if(!i._canInitEmulator){I(i.config.emulator&&i.emulatorConfig,i,"emulator-config-failed"),I(Un(l,i.config.emulator)&&Un(u,i.emulatorConfig),i,"emulator-config-failed");return}i.config.emulator=l,i.emulatorConfig=u,i.settings.appVerificationDisabledForTesting=!0,zi(o)?(rg(`${r}//${o}${c}`),og("Auth",!0)):CN()}function a_(t){const e=t.indexOf(":");return e<0?"":t.substr(0,e+1)}function EN(t){const e=a_(t),n=/(\/\/)?([^?#/]+)/.exec(t.substr(e.length));if(!n)return{host:"",port:null};const i=n[2].split("@").pop()||"",s=/^(\[[^\]]+\])(:|$)/.exec(i);if(s){const r=s[1];return{host:r,port:mf(i.substr(r.length+1))}}else{const[r,o]=i.split(":");return{host:r,port:mf(o)}}}function mf(t){if(!t)return null;const e=Number(t);return isNaN(e)?null:e}function CN(){function t(){const e=document.createElement("p"),n=e.style;e.innerText="Running in emulator mode. Do not use with production credentials.",n.position="fixed",n.width="100%",n.backgroundColor="#ffffff",n.border=".1em solid #000000",n.color="#b50000",n.bottom="0px",n.left="0px",n.margin="0px",n.zIndex="10000",n.textAlign="center",e.classList.add("firebase-emulator-warning"),document.body.appendChild(e)}typeof console<"u"&&typeof console.info=="function"&&console.info("WARNING: You are using the Auth Emulator, which is intended for local testing only.  Do not use with production credentials."),typeof window<"u"&&typeof document<"u"&&(document.readyState==="loading"?window.addEventListener("DOMContentLoaded",t):t())}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class c_{constructor(e,n){this.providerId=e,this.signInMethod=n}toJSON(){return Rt("not implemented")}_getIdTokenResponse(e){return Rt("not implemented")}_linkToIdToken(e,n){return Rt("not implemented")}_getReauthenticationResolver(e){return Rt("not implemented")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function _i(t,e){return QA(t,"POST","/v1/accounts:signInWithIdp",Cu(t,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const TN="http://localhost";class Vn extends c_{constructor(){super(...arguments),this.pendingToken=null}static _fromParams(e){const n=new Vn(e.providerId,e.signInMethod);return e.idToken||e.accessToken?(e.idToken&&(n.idToken=e.idToken),e.accessToken&&(n.accessToken=e.accessToken),e.nonce&&!e.pendingToken&&(n.nonce=e.nonce),e.pendingToken&&(n.pendingToken=e.pendingToken)):e.oauthToken&&e.oauthTokenSecret?(n.accessToken=e.oauthToken,n.secret=e.oauthTokenSecret):wt("argument-error"),n}toJSON(){return{idToken:this.idToken,accessToken:this.accessToken,secret:this.secret,nonce:this.nonce,pendingToken:this.pendingToken,providerId:this.providerId,signInMethod:this.signInMethod}}static fromJSON(e){const n=typeof e=="string"?JSON.parse(e):e,{providerId:i,signInMethod:s,...r}=n;if(!i||!s)return null;const o=new Vn(i,s);return o.idToken=r.idToken||void 0,o.accessToken=r.accessToken||void 0,o.secret=r.secret,o.nonce=r.nonce,o.pendingToken=r.pendingToken||null,o}_getIdTokenResponse(e){const n=this.buildRequest();return _i(e,n)}_linkToIdToken(e,n){const i=this.buildRequest();return i.idToken=n,_i(e,i)}_getReauthenticationResolver(e){const n=this.buildRequest();return n.autoCreate=!1,_i(e,n)}buildRequest(){const e={requestUri:TN,returnSecureToken:!0};if(this.pendingToken)e.pendingToken=this.pendingToken;else{const n={};this.idToken&&(n.id_token=this.idToken),this.accessToken&&(n.access_token=this.accessToken),this.secret&&(n.oauth_token_secret=this.secret),n.providerId=this.providerId,this.nonce&&!this.pendingToken&&(n.nonce=this.nonce),e.postBody=Gi(n)}return e}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ku{constructor(e){this.providerId=e,this.defaultLanguageCode=null,this.customParameters={}}setDefaultLanguage(e){this.defaultLanguageCode=e}setCustomParameters(e){return this.customParameters=e,this}getCustomParameters(){return this.customParameters}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ur extends ku{constructor(){super(...arguments),this.scopes=[]}addScope(e){return this.scopes.includes(e)||this.scopes.push(e),this}getScopes(){return[...this.scopes]}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class zt extends ur{constructor(){super("facebook.com")}static credential(e){return Vn._fromParams({providerId:zt.PROVIDER_ID,signInMethod:zt.FACEBOOK_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return zt.credentialFromTaggedObject(e)}static credentialFromError(e){return zt.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return zt.credential(e.oauthAccessToken)}catch{return null}}}zt.FACEBOOK_SIGN_IN_METHOD="facebook.com";zt.PROVIDER_ID="facebook.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class mt extends ur{constructor(){super("google.com"),this.addScope("profile")}static credential(e,n){return Vn._fromParams({providerId:mt.PROVIDER_ID,signInMethod:mt.GOOGLE_SIGN_IN_METHOD,idToken:e,accessToken:n})}static credentialFromResult(e){return mt.credentialFromTaggedObject(e)}static credentialFromError(e){return mt.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthIdToken:n,oauthAccessToken:i}=e;if(!n&&!i)return null;try{return mt.credential(n,i)}catch{return null}}}mt.GOOGLE_SIGN_IN_METHOD="google.com";mt.PROVIDER_ID="google.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Gt extends ur{constructor(){super("github.com")}static credential(e){return Vn._fromParams({providerId:Gt.PROVIDER_ID,signInMethod:Gt.GITHUB_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return Gt.credentialFromTaggedObject(e)}static credentialFromError(e){return Gt.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return Gt.credential(e.oauthAccessToken)}catch{return null}}}Gt.GITHUB_SIGN_IN_METHOD="github.com";Gt.PROVIDER_ID="github.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Kt extends ur{constructor(){super("twitter.com")}static credential(e,n){return Vn._fromParams({providerId:Kt.PROVIDER_ID,signInMethod:Kt.TWITTER_SIGN_IN_METHOD,oauthToken:e,oauthTokenSecret:n})}static credentialFromResult(e){return Kt.credentialFromTaggedObject(e)}static credentialFromError(e){return Kt.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthAccessToken:n,oauthTokenSecret:i}=e;if(!n||!i)return null;try{return Kt.credential(n,i)}catch{return null}}}Kt.TWITTER_SIGN_IN_METHOD="twitter.com";Kt.PROVIDER_ID="twitter.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class $i{constructor(e){this.user=e.user,this.providerId=e.providerId,this._tokenResponse=e._tokenResponse,this.operationType=e.operationType}static async _fromIdTokenResponse(e,n,i,s=!1){const r=await rt._fromIdTokenResponse(e,i,s),o=_f(i);return new $i({user:r,providerId:o,_tokenResponse:i,operationType:n})}static async _forOperation(e,n,i){await e._updateTokensIfNecessary(i,!0);const s=_f(i);return new $i({user:e,providerId:s,_tokenResponse:i,operationType:n})}}function _f(t){return t.providerId?t.providerId:"phoneNumber"in t?"phone":null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class go extends Vt{constructor(e,n,i,s){super(n.code,n.message),this.operationType=i,this.user=s,Object.setPrototypeOf(this,go.prototype),this.customData={appName:e.name,tenantId:e.tenantId??void 0,_serverResponse:n.customData._serverResponse,operationType:i}}static _fromErrorAndOperation(e,n,i,s){return new go(e,n,i,s)}}function l_(t,e,n,i){return(e==="reauthenticate"?n._getReauthenticationResolver(t):n._getIdTokenResponse(t)).catch(r=>{throw r.code==="auth/multi-factor-auth-required"?go._fromErrorAndOperation(t,r,e,i):r})}async function SN(t,e,n=!1){const i=await js(t,e._linkToIdToken(t.auth,await t.getIdToken()),n);return $i._forOperation(t,"link",i)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function IN(t,e,n=!1){const{auth:i}=t;if(tt(i.app))return Promise.reject(Dn(i));const s="reauthenticate";try{const r=await js(t,l_(i,s,e,t),n);I(r.idToken,i,"internal-error");const o=Tu(r.idToken);I(o,i,"internal-error");const{sub:a}=o;return I(t.uid===a,i,"user-mismatch"),$i._forOperation(t,s,r)}catch(r){throw r?.code==="auth/user-not-found"&&wt(i,"user-mismatch"),r}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function u_(t,e,n=!1){if(tt(t.app))return Promise.reject(Dn(t));const i="signIn",s=await l_(t,i,e),r=await $i._fromIdTokenResponse(t,i,s);return n||await t._updateCurrentUser(r.user),r}async function kN(t,e){return u_(es(t),e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ga(t,e){return re(t).setPersistence(e)}function RN(t,e,n,i){return re(t).onIdTokenChanged(e,n,i)}function AN(t,e,n){return re(t).beforeAuthStateChanged(e,n)}function d_(t,e,n,i){return re(t).onAuthStateChanged(e,n,i)}function NN(t){return re(t).signOut()}const mo="__sak";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class h_{constructor(e,n){this.storageRetriever=e,this.type=n}_isAvailable(){try{return this.storage?(this.storage.setItem(mo,"1"),this.storage.removeItem(mo),Promise.resolve(!0)):Promise.resolve(!1)}catch{return Promise.resolve(!1)}}_set(e,n){return this.storage.setItem(e,JSON.stringify(n)),Promise.resolve()}_get(e){const n=this.storage.getItem(e);return Promise.resolve(n?JSON.parse(n):null)}_remove(e){return this.storage.removeItem(e),Promise.resolve()}get storage(){return this.storageRetriever()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const PN=1e3,LN=10;class f_ extends h_{constructor(){super(()=>window.localStorage,"LOCAL"),this.boundEventHandler=(e,n)=>this.onStorageEvent(e,n),this.listeners={},this.localCache={},this.pollTimer=null,this.fallbackToPolling=r_(),this._shouldAllowMigration=!0}forAllChangedKeys(e){for(const n of Object.keys(this.listeners)){const i=this.storage.getItem(n),s=this.localCache[n];i!==s&&e(n,s,i)}}onStorageEvent(e,n=!1){if(!e.key){this.forAllChangedKeys((o,a,c)=>{this.notifyListeners(o,c)});return}const i=e.key;n?this.detachListener():this.stopPolling();const s=()=>{const o=this.storage.getItem(i);!n&&this.localCache[i]===o||this.notifyListeners(i,o)},r=this.storage.getItem(i);lN()&&r!==e.newValue&&e.newValue!==e.oldValue?setTimeout(s,LN):s()}notifyListeners(e,n){this.localCache[e]=n;const i=this.listeners[e];if(i)for(const s of Array.from(i))s(n&&JSON.parse(n))}startPolling(){this.stopPolling(),this.pollTimer=setInterval(()=>{this.forAllChangedKeys((e,n,i)=>{this.onStorageEvent(new StorageEvent("storage",{key:e,oldValue:n,newValue:i}),!0)})},PN)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}attachListener(){window.addEventListener("storage",this.boundEventHandler)}detachListener(){window.removeEventListener("storage",this.boundEventHandler)}_addListener(e,n){Object.keys(this.listeners).length===0&&(this.fallbackToPolling?this.startPolling():this.attachListener()),this.listeners[e]||(this.listeners[e]=new Set,this.localCache[e]=this.storage.getItem(e)),this.listeners[e].add(n)}_removeListener(e,n){this.listeners[e]&&(this.listeners[e].delete(n),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&(this.detachListener(),this.stopPolling())}async _set(e,n){await super._set(e,n),this.localCache[e]=JSON.stringify(n)}async _get(e){const n=await super._get(e);return this.localCache[e]=JSON.stringify(n),n}async _remove(e){await super._remove(e),delete this.localCache[e]}}f_.type="LOCAL";const p_=f_;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
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
 */function ON(t){return Promise.all(t.map(async e=>{try{return{fulfilled:!0,value:await e}}catch(n){return{fulfilled:!1,reason:n}}}))}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ca{constructor(e){this.eventTarget=e,this.handlersMap={},this.boundEventHandler=this.handleEvent.bind(this)}static _getInstance(e){const n=this.receivers.find(s=>s.isListeningto(e));if(n)return n;const i=new ca(e);return this.receivers.push(i),i}isListeningto(e){return this.eventTarget===e}async handleEvent(e){const n=e,{eventId:i,eventType:s,data:r}=n.data,o=this.handlersMap[s];if(!o?.size)return;n.ports[0].postMessage({status:"ack",eventId:i,eventType:s});const a=Array.from(o).map(async l=>l(n.origin,r)),c=await ON(a);n.ports[0].postMessage({status:"done",eventId:i,eventType:s,response:c})}_subscribe(e,n){Object.keys(this.handlersMap).length===0&&this.eventTarget.addEventListener("message",this.boundEventHandler),this.handlersMap[e]||(this.handlersMap[e]=new Set),this.handlersMap[e].add(n)}_unsubscribe(e,n){this.handlersMap[e]&&n&&this.handlersMap[e].delete(n),(!n||this.handlersMap[e].size===0)&&delete this.handlersMap[e],Object.keys(this.handlersMap).length===0&&this.eventTarget.removeEventListener("message",this.boundEventHandler)}}ca.receivers=[];/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ru(t="",e=10){let n="";for(let i=0;i<e;i++)n+=Math.floor(Math.random()*10);return t+n}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class DN{constructor(e){this.target=e,this.handlers=new Set}removeMessageHandler(e){e.messageChannel&&(e.messageChannel.port1.removeEventListener("message",e.onMessage),e.messageChannel.port1.close()),this.handlers.delete(e)}async _send(e,n,i=50){const s=typeof MessageChannel<"u"?new MessageChannel:null;if(!s)throw new Error("connection_unavailable");let r,o;return new Promise((a,c)=>{const l=Ru("",20);s.port1.start();const u=setTimeout(()=>{c(new Error("unsupported_event"))},i);o={messageChannel:s,onMessage(d){const h=d;if(h.data.eventId===l)switch(h.data.status){case"ack":clearTimeout(u),r=setTimeout(()=>{c(new Error("timeout"))},3e3);break;case"done":clearTimeout(r),a(h.data.response);break;default:clearTimeout(u),clearTimeout(r),c(new Error("invalid_response"));break}}},this.handlers.add(o),s.port1.addEventListener("message",o.onMessage),this.target.postMessage({eventType:e,eventId:l,data:n},[s.port2])}).finally(()=>{o&&this.removeMessageHandler(o)})}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function yt(){return window}function MN(t){yt().location.href=t}/**
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
 */function __(){return typeof yt().WorkerGlobalScope<"u"&&typeof yt().importScripts=="function"}async function xN(){if(!navigator?.serviceWorker)return null;try{return(await navigator.serviceWorker.ready).active}catch{return null}}function FN(){return navigator?.serviceWorker?.controller||null}function UN(){return __()?self:null}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const y_="firebaseLocalStorageDb",$N=1,_o="firebaseLocalStorage",w_="fbase_key";class dr{constructor(e){this.request=e}toPromise(){return new Promise((e,n)=>{this.request.addEventListener("success",()=>{e(this.request.result)}),this.request.addEventListener("error",()=>{n(this.request.error)})})}}function la(t,e){return t.transaction([_o],e?"readwrite":"readonly").objectStore(_o)}function BN(){const t=indexedDB.deleteDatabase(y_);return new dr(t).toPromise()}function Jc(){const t=indexedDB.open(y_,$N);return new Promise((e,n)=>{t.addEventListener("error",()=>{n(t.error)}),t.addEventListener("upgradeneeded",()=>{const i=t.result;try{i.createObjectStore(_o,{keyPath:w_})}catch(s){n(s)}}),t.addEventListener("success",async()=>{const i=t.result;i.objectStoreNames.contains(_o)?e(i):(i.close(),await BN(),e(await Jc()))})})}async function yf(t,e,n){const i=la(t,!0).put({[w_]:e,value:n});return new dr(i).toPromise()}async function HN(t,e){const n=la(t,!1).get(e),i=await new dr(n).toPromise();return i===void 0?null:i.value}function wf(t,e){const n=la(t,!0).delete(e);return new dr(n).toPromise()}const VN=800,WN=3;class v_{constructor(){this.type="LOCAL",this._shouldAllowMigration=!0,this.listeners={},this.localCache={},this.pollTimer=null,this.pendingWrites=0,this.receiver=null,this.sender=null,this.serviceWorkerReceiverAvailable=!1,this.activeServiceWorker=null,this._workerInitializationPromise=this.initializeServiceWorkerMessaging().then(()=>{},()=>{})}async _openDb(){return this.db?this.db:(this.db=await Jc(),this.db)}async _withRetries(e){let n=0;for(;;)try{const i=await this._openDb();return await e(i)}catch(i){if(n++>WN)throw i;this.db&&(this.db.close(),this.db=void 0)}}async initializeServiceWorkerMessaging(){return __()?this.initializeReceiver():this.initializeSender()}async initializeReceiver(){this.receiver=ca._getInstance(UN()),this.receiver._subscribe("keyChanged",async(e,n)=>({keyProcessed:(await this._poll()).includes(n.key)})),this.receiver._subscribe("ping",async(e,n)=>["keyChanged"])}async initializeSender(){if(this.activeServiceWorker=await xN(),!this.activeServiceWorker)return;this.sender=new DN(this.activeServiceWorker);const e=await this.sender._send("ping",{},800);e&&e[0]?.fulfilled&&e[0]?.value.includes("keyChanged")&&(this.serviceWorkerReceiverAvailable=!0)}async notifyServiceWorker(e){if(!(!this.sender||!this.activeServiceWorker||FN()!==this.activeServiceWorker))try{await this.sender._send("keyChanged",{key:e},this.serviceWorkerReceiverAvailable?800:50)}catch{}}async _isAvailable(){try{if(!indexedDB)return!1;const e=await Jc();return await yf(e,mo,"1"),await wf(e,mo),!0}catch{}return!1}async _withPendingWrite(e){this.pendingWrites++;try{await e()}finally{this.pendingWrites--}}async _set(e,n){return this._withPendingWrite(async()=>(await this._withRetries(i=>yf(i,e,n)),this.localCache[e]=n,this.notifyServiceWorker(e)))}async _get(e){const n=await this._withRetries(i=>HN(i,e));return this.localCache[e]=n,n}async _remove(e){return this._withPendingWrite(async()=>(await this._withRetries(n=>wf(n,e)),delete this.localCache[e],this.notifyServiceWorker(e)))}async _poll(){const e=await this._withRetries(s=>{const r=la(s,!1).getAll();return new dr(r).toPromise()});if(!e)return[];if(this.pendingWrites!==0)return[];const n=[],i=new Set;if(e.length!==0)for(const{fbase_key:s,value:r}of e)i.add(s),JSON.stringify(this.localCache[s])!==JSON.stringify(r)&&(this.notifyListeners(s,r),n.push(s));for(const s of Object.keys(this.localCache))this.localCache[s]&&!i.has(s)&&(this.notifyListeners(s,null),n.push(s));return n}notifyListeners(e,n){this.localCache[e]=n;const i=this.listeners[e];if(i)for(const s of Array.from(i))s(n)}startPolling(){this.stopPolling(),this.pollTimer=setInterval(async()=>this._poll(),VN)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}_addListener(e,n){Object.keys(this.listeners).length===0&&this.startPolling(),this.listeners[e]||(this.listeners[e]=new Set,this._get(e)),this.listeners[e].add(n)}_removeListener(e,n){this.listeners[e]&&(this.listeners[e].delete(n),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&this.stopPolling()}}v_.type="LOCAL";const b_=v_;new lr(3e4,6e4);/**
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
 */function E_(t,e){return e?At(e):(I(t._popupRedirectResolver,t,"argument-error"),t._popupRedirectResolver)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Au extends c_{constructor(e){super("custom","custom"),this.params=e}_getIdTokenResponse(e){return _i(e,this._buildIdpRequest())}_linkToIdToken(e,n){return _i(e,this._buildIdpRequest(n))}_getReauthenticationResolver(e){return _i(e,this._buildIdpRequest())}_buildIdpRequest(e){const n={requestUri:this.params.requestUri,sessionId:this.params.sessionId,postBody:this.params.postBody,tenantId:this.params.tenantId,pendingToken:this.params.pendingToken,returnSecureToken:!0,returnIdpCredential:!0};return e&&(n.idToken=e),n}}function jN(t){return u_(t.auth,new Au(t),t.bypassAuthState)}function qN(t){const{auth:e,user:n}=t;return I(n,e,"internal-error"),IN(n,new Au(t),t.bypassAuthState)}async function zN(t){const{auth:e,user:n}=t;return I(n,e,"internal-error"),SN(n,new Au(t),t.bypassAuthState)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class C_{constructor(e,n,i,s,r=!1){this.auth=e,this.resolver=i,this.user=s,this.bypassAuthState=r,this.pendingPromise=null,this.eventManager=null,this.filter=Array.isArray(n)?n:[n]}execute(){return new Promise(async(e,n)=>{this.pendingPromise={resolve:e,reject:n};try{this.eventManager=await this.resolver._initialize(this.auth),await this.onExecution(),this.eventManager.registerConsumer(this)}catch(i){this.reject(i)}})}async onAuthEvent(e){const{urlResponse:n,sessionId:i,postBody:s,tenantId:r,error:o,type:a}=e;if(o){this.reject(o);return}const c={auth:this.auth,requestUri:n,sessionId:i,tenantId:r||void 0,postBody:s||void 0,user:this.user,bypassAuthState:this.bypassAuthState};try{this.resolve(await this.getIdpTask(a)(c))}catch(l){this.reject(l)}}onError(e){this.reject(e)}getIdpTask(e){switch(e){case"signInViaPopup":case"signInViaRedirect":return jN;case"linkViaPopup":case"linkViaRedirect":return zN;case"reauthViaPopup":case"reauthViaRedirect":return qN;default:wt(this.auth,"internal-error")}}resolve(e){$t(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.resolve(e),this.unregisterAndCleanUp()}reject(e){$t(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.reject(e),this.unregisterAndCleanUp()}unregisterAndCleanUp(){this.eventManager&&this.eventManager.unregisterConsumer(this),this.pendingPromise=null,this.cleanUp()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const GN=new lr(2e3,1e4);async function KN(t,e,n){if(tt(t.app))return Promise.reject(ct(t,"operation-not-supported-in-this-environment"));const i=es(t);qA(t,e,ku);const s=E_(i,n);return new Pn(i,"signInViaPopup",e,s).executeNotNull()}class Pn extends C_{constructor(e,n,i,s,r){super(e,n,s,r),this.provider=i,this.authWindow=null,this.pollId=null,Pn.currentPopupAction&&Pn.currentPopupAction.cancel(),Pn.currentPopupAction=this}async executeNotNull(){const e=await this.execute();return I(e,this.auth,"internal-error"),e}async onExecution(){$t(this.filter.length===1,"Popup operations only handle one event");const e=Ru();this.authWindow=await this.resolver._openPopup(this.auth,this.provider,this.filter[0],e),this.authWindow.associatedEvent=e,this.resolver._originValidation(this.auth).catch(n=>{this.reject(n)}),this.resolver._isIframeWebStorageSupported(this.auth,n=>{n||this.reject(ct(this.auth,"web-storage-unsupported"))}),this.pollUserCancellation()}get eventId(){return this.authWindow?.associatedEvent||null}cancel(){this.reject(ct(this.auth,"cancelled-popup-request"))}cleanUp(){this.authWindow&&this.authWindow.close(),this.pollId&&window.clearTimeout(this.pollId),this.authWindow=null,this.pollId=null,Pn.currentPopupAction=null}pollUserCancellation(){const e=()=>{if(this.authWindow?.window?.closed){this.pollId=window.setTimeout(()=>{this.pollId=null,this.reject(ct(this.auth,"popup-closed-by-user"))},8e3);return}this.pollId=window.setTimeout(e,GN.get())};e()}}Pn.currentPopupAction=null;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const YN="pendingRedirect",xr=new Map;class JN extends C_{constructor(e,n,i=!1){super(e,["signInViaRedirect","linkViaRedirect","reauthViaRedirect","unknown"],n,void 0,i),this.eventId=null}async execute(){let e=xr.get(this.auth._key());if(!e){try{const i=await XN(this.resolver,this.auth)?await super.execute():null;e=()=>Promise.resolve(i)}catch(n){e=()=>Promise.reject(n)}xr.set(this.auth._key(),e)}return this.bypassAuthState||xr.set(this.auth._key(),()=>Promise.resolve(null)),e()}async onAuthEvent(e){if(e.type==="signInViaRedirect")return super.onAuthEvent(e);if(e.type==="unknown"){this.resolve(null);return}if(e.eventId){const n=await this.auth._redirectUserForId(e.eventId);if(n)return this.user=n,super.onAuthEvent(e);this.resolve(null)}}async onExecution(){}cleanUp(){}}async function XN(t,e){const n=eP(e),i=ZN(t);if(!await i._isAvailable())return!1;const s=await i._get(n)==="true";return await i._remove(n),s}function QN(t,e){xr.set(t._key(),e)}function ZN(t){return At(t._redirectPersistence)}function eP(t){return Mr(YN,t.config.apiKey,t.name)}async function tP(t,e){return await es(t)._initializationPromise,T_(t,e,!1)}async function T_(t,e,n=!1){if(tt(t.app))return Promise.reject(Dn(t));const i=es(t),s=E_(i,e),o=await new JN(i,s,n).execute();return o&&!n&&(delete o.user._redirectEventId,await i._persistUserIfCurrent(o.user),await i._setRedirectUser(null,e)),o}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const nP=600*1e3;class iP{constructor(e){this.auth=e,this.cachedEventUids=new Set,this.consumers=new Set,this.queuedRedirectEvent=null,this.hasHandledPotentialRedirect=!1,this.lastProcessedEventTime=Date.now()}registerConsumer(e){this.consumers.add(e),this.queuedRedirectEvent&&this.isEventForConsumer(this.queuedRedirectEvent,e)&&(this.sendToConsumer(this.queuedRedirectEvent,e),this.saveEventToCache(this.queuedRedirectEvent),this.queuedRedirectEvent=null)}unregisterConsumer(e){this.consumers.delete(e)}onEvent(e){if(this.hasEventBeenHandled(e))return!1;let n=!1;return this.consumers.forEach(i=>{this.isEventForConsumer(e,i)&&(n=!0,this.sendToConsumer(e,i),this.saveEventToCache(e))}),this.hasHandledPotentialRedirect||!sP(e)||(this.hasHandledPotentialRedirect=!0,n||(this.queuedRedirectEvent=e,n=!0)),n}sendToConsumer(e,n){if(e.error&&!S_(e)){const i=e.error.code?.split("auth/")[1]||"internal-error";n.onError(ct(this.auth,i))}else n.onAuthEvent(e)}isEventForConsumer(e,n){const i=n.eventId===null||!!e.eventId&&e.eventId===n.eventId;return n.filter.includes(e.type)&&i}hasEventBeenHandled(e){return Date.now()-this.lastProcessedEventTime>=nP&&this.cachedEventUids.clear(),this.cachedEventUids.has(vf(e))}saveEventToCache(e){this.cachedEventUids.add(vf(e)),this.lastProcessedEventTime=Date.now()}}function vf(t){return[t.type,t.eventId,t.sessionId,t.tenantId].filter(e=>e).join("-")}function S_({type:t,error:e}){return t==="unknown"&&e?.code==="auth/no-auth-event"}function sP(t){switch(t.type){case"signInViaRedirect":case"linkViaRedirect":case"reauthViaRedirect":return!0;case"unknown":return S_(t);default:return!1}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function rP(t,e={}){return Zi(t,"GET","/v1/projects",e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const oP=/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/,aP=/^https?/;async function cP(t){if(t.config.emulator)return;const{authorizedDomains:e}=await rP(t);for(const n of e)try{if(lP(n))return}catch{}wt(t,"unauthorized-domain")}function lP(t){const e=Gc(),{protocol:n,hostname:i}=new URL(e);if(t.startsWith("chrome-extension://")){const o=new URL(t);return o.hostname===""&&i===""?n==="chrome-extension:"&&t.replace("chrome-extension://","")===e.replace("chrome-extension://",""):n==="chrome-extension:"&&o.hostname===i}if(!aP.test(n))return!1;if(oP.test(t))return i===t;const s=t.replace(/\./g,"\\.");return new RegExp("^(.+\\."+s+"|"+s+")$","i").test(i)}/**
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
 */const uP=new lr(3e4,6e4);function bf(){const t=yt().___jsl;if(t?.H){for(const e of Object.keys(t.H))if(t.H[e].r=t.H[e].r||[],t.H[e].L=t.H[e].L||[],t.H[e].r=[...t.H[e].L],t.CP)for(let n=0;n<t.CP.length;n++)t.CP[n]=null}}function dP(t){return new Promise((e,n)=>{function i(){bf(),gapi.load("gapi.iframes",{callback:()=>{e(gapi.iframes.getContext())},ontimeout:()=>{bf(),n(ct(t,"network-request-failed"))},timeout:uP.get()})}if(yt().gapi?.iframes?.Iframe)e(gapi.iframes.getContext());else if(yt().gapi?.load)i();else{const s=yN("iframefcb");return yt()[s]=()=>{gapi.load?i():n(ct(t,"network-request-failed"))},mN(`${_N()}?onload=${s}`).catch(r=>n(r))}}).catch(e=>{throw Fr=null,e})}let Fr=null;function hP(t){return Fr=Fr||dP(t),Fr}/**
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
 */const fP=new lr(5e3,15e3),pP="__/auth/iframe",gP="emulator/auth/iframe",mP={style:{position:"absolute",top:"-100px",width:"1px",height:"1px"},"aria-hidden":"true",tabindex:"-1"},_P=new Map([["identitytoolkit.googleapis.com","p"],["staging-identitytoolkit.sandbox.googleapis.com","s"],["test-identitytoolkit.sandbox.googleapis.com","t"]]);function yP(t){const e=t.config;I(e.authDomain,t,"auth-domain-config-required");const n=e.emulator?Eu(e,gP):`https://${t.config.authDomain}/${pP}`,i={apiKey:e.apiKey,appName:t.name,v:Ki},s=_P.get(t.config.apiHost);s&&(i.eid=s);const r=t._getFrameworks();return r.length&&(i.fw=r.join(",")),`${n}?${Gi(i).slice(1)}`}async function wP(t){const e=await hP(t),n=yt().gapi;return I(n,t,"internal-error"),e.open({where:document.body,url:yP(t),messageHandlersFilter:n.iframes.CROSS_ORIGIN_IFRAMES_FILTER,attributes:mP,dontclear:!0},i=>new Promise(async(s,r)=>{await i.restyle({setHideOnLeave:!1});const o=ct(t,"network-request-failed"),a=yt().setTimeout(()=>{r(o)},fP.get());function c(){yt().clearTimeout(a),s(i)}i.ping(c).then(c,()=>{r(o)})}))}/**
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
 */const vP={location:"yes",resizable:"yes",statusbar:"yes",toolbar:"no"},bP=500,EP=600,CP="_blank",TP="http://localhost";class Ef{constructor(e){this.window=e,this.associatedEvent=null}close(){if(this.window)try{this.window.close()}catch{}}}function SP(t,e,n,i=bP,s=EP){const r=Math.max((window.screen.availHeight-s)/2,0).toString(),o=Math.max((window.screen.availWidth-i)/2,0).toString();let a="";const c={...vP,width:i.toString(),height:s.toString(),top:r,left:o},l=Ne().toLowerCase();n&&(a=e_(l)?CP:n),Qm(l)&&(e=e||TP,c.scrollbars="yes");const u=Object.entries(c).reduce((h,[f,p])=>`${h}${f}=${p},`,"");if(cN(l)&&a!=="_self")return IP(e||"",a),new Ef(null);const d=window.open(e||"",a,u);I(d,t,"popup-blocked");try{d.focus()}catch{}return new Ef(d)}function IP(t,e){const n=document.createElement("a");n.href=t,n.target=e;const i=document.createEvent("MouseEvent");i.initMouseEvent("click",!0,!0,window,1,0,0,0,0,!1,!1,!1,!1,1,null),n.dispatchEvent(i)}/**
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
 */const kP="__/auth/handler",RP="emulator/auth/handler",AP=encodeURIComponent("fac");async function Cf(t,e,n,i,s,r){I(t.config.authDomain,t,"auth-domain-config-required"),I(t.config.apiKey,t,"invalid-api-key");const o={apiKey:t.config.apiKey,appName:t.name,authType:n,redirectUrl:i,v:Ki,eventId:s};if(e instanceof ku){e.setDefaultLanguage(t.languageCode),o.providerId=e.providerId||"",Gr(e.getCustomParameters())||(o.customParameters=JSON.stringify(e.getCustomParameters()));for(const[u,d]of Object.entries({}))o[u]=d}if(e instanceof ur){const u=e.getScopes().filter(d=>d!=="");u.length>0&&(o.scopes=u.join(","))}t.tenantId&&(o.tid=t.tenantId);const a=o;for(const u of Object.keys(a))a[u]===void 0&&delete a[u];const c=await t._getAppCheckToken(),l=c?`#${AP}=${encodeURIComponent(c)}`:"";return`${NP(t)}?${Gi(a).slice(1)}${l}`}function NP({config:t}){return t.emulator?Eu(t,RP):`https://${t.authDomain}/${kP}`}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ka="webStorageSupport";class PP{constructor(){this.eventManagers={},this.iframes={},this.originValidationPromises={},this._redirectPersistence=m_,this._completeRedirectFn=T_,this._overrideRedirectResult=QN}async _openPopup(e,n,i,s){$t(this.eventManagers[e._key()]?.manager,"_initialize() not called before _openPopup()");const r=await Cf(e,n,i,Gc(),s);return SP(e,r,Ru())}async _openRedirect(e,n,i,s){await this._originValidation(e);const r=await Cf(e,n,i,Gc(),s);return MN(r),new Promise(()=>{})}_initialize(e){const n=e._key();if(this.eventManagers[n]){const{manager:s,promise:r}=this.eventManagers[n];return s?Promise.resolve(s):($t(r,"If manager is not set, promise should be"),r)}const i=this.initAndGetManager(e);return this.eventManagers[n]={promise:i},i.catch(()=>{delete this.eventManagers[n]}),i}async initAndGetManager(e){const n=await wP(e),i=new iP(e);return n.register("authEvent",s=>(I(s?.authEvent,e,"invalid-auth-event"),{status:i.onEvent(s.authEvent)?"ACK":"ERROR"}),gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER),this.eventManagers[e._key()]={manager:i},this.iframes[e._key()]=n,i}_isIframeWebStorageSupported(e,n){this.iframes[e._key()].send(Ka,{type:Ka},s=>{const r=s?.[0]?.[Ka];r!==void 0&&n(!!r),wt(e,"internal-error")},gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER)}_originValidation(e){const n=e._key();return this.originValidationPromises[n]||(this.originValidationPromises[n]=cP(e)),this.originValidationPromises[n]}get _shouldInitProactively(){return r_()||Zm()||Su()}}const LP=PP;var Tf="@firebase/auth",Sf="1.12.0";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class OP{constructor(e){this.auth=e,this.internalListeners=new Map}getUid(){return this.assertAuthConfigured(),this.auth.currentUser?.uid||null}async getToken(e){return this.assertAuthConfigured(),await this.auth._initializationPromise,this.auth.currentUser?{accessToken:await this.auth.currentUser.getIdToken(e)}:null}addAuthTokenListener(e){if(this.assertAuthConfigured(),this.internalListeners.has(e))return;const n=this.auth.onIdTokenChanged(i=>{e(i?.stsTokenManager.accessToken||null)});this.internalListeners.set(e,n),this.updateProactiveRefresh()}removeAuthTokenListener(e){this.assertAuthConfigured();const n=this.internalListeners.get(e);n&&(this.internalListeners.delete(e),n(),this.updateProactiveRefresh())}assertAuthConfigured(){I(this.auth._initializationPromise,"dependent-sdk-initialized-before-auth")}updateProactiveRefresh(){this.internalListeners.size>0?this.auth._startProactiveRefresh():this.auth._stopProactiveRefresh()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function DP(t){switch(t){case"Node":return"node";case"ReactNative":return"rn";case"Worker":return"webworker";case"Cordova":return"cordova";case"WebExtension":return"web-extension";default:return}}function MP(t){Ye(new We("auth",(e,{options:n})=>{const i=e.getProvider("app").getImmediate(),s=e.getProvider("heartbeat"),r=e.getProvider("app-check-internal"),{apiKey:o,authDomain:a}=i.options;I(o&&!o.includes(":"),"invalid-api-key",{appName:i.name});const c={apiKey:o,authDomain:a,clientPlatform:t,apiHost:"identitytoolkit.googleapis.com",tokenApiHost:"securetoken.googleapis.com",apiScheme:"https",sdkClientVersion:o_(t)},l=new pN(i,s,r,c);return vN(l,n),l},"PUBLIC").setInstantiationMode("EXPLICIT").setInstanceCreatedCallback((e,n,i)=>{e.getProvider("auth-internal").initialize()})),Ye(new We("auth-internal",e=>{const n=es(e.getProvider("auth").getImmediate());return(i=>new OP(i))(n)},"PRIVATE").setInstantiationMode("EXPLICIT")),Ve(Tf,Sf,DP(t)),Ve(Tf,Sf,"esm2020")}/**
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
 */const xP=300,FP=sg("authIdTokenMaxAge")||xP;let If=null;const UP=t=>async e=>{const n=e&&await e.getIdTokenResult(),i=n&&(new Date().getTime()-Date.parse(n.issuedAtTime))/1e3;if(i&&i>FP)return;const s=n?.token;If!==s&&(If=s,await fetch(t,{method:s?"POST":"DELETE",headers:s?{Authorization:`Bearer ${s}`}:{}}))};function $P(t=Wo()){const e=_n(t,"auth");if(e.isInitialized())return e.getImmediate();const n=wN(t,{popupRedirectResolver:LP,persistence:[b_,p_,m_]}),i=sg("authTokenSyncURL");if(i&&typeof isSecureContext=="boolean"&&isSecureContext){const r=new URL(i,location.origin);if(location.origin===r.origin){const o=UP(r.toString());AN(n,o,()=>o(n.currentUser)),RN(n,a=>o(a))}}const s=ng("auth");return s&&bN(n,`http://${s}`),n}function BP(){return document.getElementsByTagName("head")?.[0]??document}gN({loadJS(t){return new Promise((e,n)=>{const i=document.createElement("script");i.setAttribute("src",t),i.onload=e,i.onerror=s=>{const r=ct("internal-error");r.customData=s,n(r)},i.type="text/javascript",i.charset="UTF-8",BP().appendChild(i)})},gapiScript:"https://apis.google.com/js/api.js",recaptchaV2Script:"https://www.google.com/recaptcha/api.js",recaptchaEnterpriseScript:"https://www.google.com/recaptcha/enterprise.js?render="});MP("Browser");const iM=()=>!1,HP=t=>{try{t&&localStorage.setItem("debug:console","1")}catch{}},H=(...t)=>{},VP=(...t)=>{localStorage.getItem("debug:console")},WP="765724787439-21p8n3e2tsfq2qk4oriq7ipp7m4o50ad.apps.googleusercontent.com",Ts=new Set;function jP(){const t=console.error;console.error=(...e)=>{const n=e.join(" ");n.includes("FedCM")&&n.includes("AbortError")&&n.includes("signal is aborted without reason")||e.length===1&&typeof e[0]=="string"&&e[0].trim()==="The request has been aborted."||t.apply(console,e)}}function qP(t){return H("[ONE TAP] Callback registered, total callbacks:",Ts.size+1),Ts.add(t),()=>Ts.delete(t)}function oi(t){H("[ONE TAP] Notifying status:",t,"to",Ts.size,"callbacks"),Ts.forEach(e=>{try{e(t)}catch{}})}function I_(){if(typeof google>"u"||!google.accounts?.id){setTimeout(()=>I_(),100);return}jP(),google.accounts.id.initialize({client_id:WP,callback:zP,auto_select:!1,cancel_on_tap_outside:!1,context:"signin",use_fedcm_for_prompt:!0,itp_support:!0})}function k_(){if(Nu()){oi("not_needed");return}window.google?.accounts?.id&&(oi("prompting"),window.google.accounts.id.prompt(t=>{const e=t.getMomentType();e==="skipped"?oi("skipped"):e==="dismissed"?oi("dismissed"):e==="display"&&oi("displayed")}))}async function zP(t){try{H("[ONE TAP] Received credential, signing in with Firebase..."),oi("signing_in");const e=mt.credential(t.credential),n=await kN(xe,e);H("[ONE TAP] ✅ Successfully signed in:",n.user.email),qs(!1)}catch(e){const n=e?.code||"unknown",i=e?.message||String(e);alert(n==="auth/account-exists-with-different-credential"?"An account already exists with the same email but different sign-in credentials.":`One Tap sign-in failed: ${i}`)}}let Xc=!1;async function GP(){const t=U();if(!t||Xc)return;const e=b(E,`users/${t}/presence`);try{await ne(e,{state:"online",lastChanged:pi()}),await FR(e).set({state:"offline",lastSeen:pi(),lastChanged:pi()}),Xc=!0,console.log("Presence initialized for user:",t)}catch(n){console.error("Failed to initialize presence:",n)}}async function KP(){const t=U();if(!t)return;const e=b(E,`users/${t}/presence`);try{await ne(e,{state:"offline",lastSeen:pi(),lastChanged:pi()}),Xc=!1}catch(n){console.error("Failed to set offline:",n)}}function R_(t){if(!t||typeof t!="string")throw new Error("Invalid email: must be a non-empty string");const e=t.toLowerCase().trim();return btoa(unescape(encodeURIComponent(e))).replace(/\//g,"-")}async function YP(t){if(!t||!t.uid||!t.email)throw new Error("Invalid user: must have uid and email");const e=R_(t.email),n=b(E,`usersByEmail/${e}`),i={uid:t.uid,displayName:t.displayName||"Anonymous",photoURL:t.photoURL||null,registeredAt:Date.now()};try{await ne(n,i),console.log("[USER DISCOVERY] Registered user in directory:",t.email)}catch(s){throw console.error("[USER DISCOVERY] Failed to register user:",s),s}}async function A_(t){if(!t||typeof t!="string")return null;try{const e=R_(t),n=b(E,`usersByEmail/${e}`),i=await Oe(n);return i.exists()?i.val():null}catch(e){return console.error("[USER DISCOVERY] Failed to find user by email:",e),null}}async function JP(t){if(!Array.isArray(t))throw new Error("Invalid emails: must be an array");const e={},n=t.map(async i=>{const s=await A_(i);e[i]=s});return await Promise.all(n),e}const xe=$P(sa);async function XP(){const t=xe.currentUser;return t?t.getIdToken(!1):null}const QP=typeof import.meta<"u"&&!0;function N_(t,e,n={}){const i=typeof window<"u"?window.location.origin:"n/a";QP?console.error(`[AUTH] ${t}:`,{code:e?.code||"unknown",message:e?.message||String(e),origin:i,...n}):console.error(`[AUTH] ${t}:`,e,n,{origin:i})}const P_=(async()=>{try{await Ga(xe,b_)}catch{try{await Ga(xe,p_)}catch{await Ga(xe,Yc)}}try{(await tP(xe))?.user&&H("[AUTH] ✅ Sign-in completed (via Safari fallback)")}catch(t){H("[AUTH] No redirect result:",t.code)}setTimeout(()=>{I_(),k_()},500)})();let L_=!1;function qs(t){L_=t}function ZP(){try{const t=document.createElement("a");t.href=window.location.href,t.target="_blank",t.rel="noopener noreferrer external",document.body.appendChild(t),t.click(),document.body.removeChild(t)}catch{}}function O_(){const t=typeof window<"u"&&window.matchMedia?.("(display-mode: standalone)").matches,e=typeof navigator<"u"&&navigator.standalone===!0,n=t||e,i=/iphone|ipad|ipod/i.test(navigator.userAgent||"");return{isStandalonePWA:n,isIOS:i,isIOSStandalone:n&&i}}function e0(t){const e=t?.code||"unknown",n=t?.message||String(t);if(e==="auth/popup-closed-by-user"||e==="auth/cancelled-popup-request"){console.log("Sign-in cancelled by user");return}const{isIOSStandalone:i}=O_();if((e==="auth/network-request-failed"||e==="auth/popup-blocked")&&i){console.warn(`[AUTH] ${e} inside iOS standalone PWA. Arming Safari fallback.`),qs(!0),alert(`Sign-in is blocked in the installed app on iOS.

Tap the Login button again to open in Safari and complete sign-in.`);return}if(e==="auth/popup-blocked"){alert("Pop-up blocked. Please enable pop-ups for this site in your browser settings, or try signing in from a desktop browser.");return}const s=t?.customData?.email;if(N_("Google sign-in",t,{email:s?"<redacted>":void 0}),e==="auth/unauthorized-domain"){const r=typeof window<"u"?window.location.origin:"",o=["This app's host is not whitelisted in Firebase Authentication.","Fix: In Firebase Console, go to Build → Authentication → Settings → Authorized domains and add this origin:",r?`• ${r}`:"• <your dev origin>","","Common dev hosts to add:","• http://localhost (covers any port)","• http://127.0.0.1","• http://[::1] (IPv6 localhost)","• Your LAN IP, e.g. http://192.168.x.y","","Tip: avoid opening index.html directly from the filesystem (file://). Use a dev server instead."];r&&typeof navigator<"u"&&navigator.clipboard?.writeText&&navigator.clipboard.writeText(r).catch(()=>{}),alert(`Sign-in failed: Unauthorized domain.

${o.join(`
`)}`);return}alert(`Sign-in failed: ${n}`)}let ds=null;const t0=()=>Math.random().toString(36).substring(2,15),Qc="guestUser",n0=2880*60*1e3;function i0(){try{const t=typeof localStorage<"u"?localStorage.getItem(Qc):null;if(!t)return null;const e=JSON.parse(t);if(!e||typeof e!="object"||!e.id)return null;if(e.expiresAt&&Date.now()>e.expiresAt){try{localStorage.removeItem(Qc)}catch{}return null}return e}catch{return null}}function s0(t,e=n0){const n=Date.now(),i={id:t,createdAt:n,expiresAt:n+e};try{typeof localStorage<"u"&&localStorage.setItem(Qc,JSON.stringify(i))}catch{}return i}function ge(){const t=U();if(t)return t;if(!ds){const e=i0();e&&e.id?ds=e.id:(ds=t0(),s0(ds))}return ds}function Wn(){return xe.currentUser}function Nu(){return xe.currentUser!==null}function U(){return xe.currentUser?.uid??null}function r0(){return new Promise(t=>{const e=d_(xe,n=>{e(),t(n)})})}function Pu(t,{truncate:e=7}={}){return d_(xe,n=>{const i=!!n,s=n?.displayName||"Guest User",r=typeof s=="string"&&s.length>e?s.slice(0,e)+"...":s;i&&(GP().catch(o=>{console.warn("Failed to initialize presence:",o)}),YP(n).catch(o=>{console.warn("Failed to register user in directory:",o)}));try{t({user:n,isLoggedIn:i,userName:r})}catch{}})}const D_=async()=>{const t=new mt;t.setCustomParameters({prompt:"select_account"});const{isIOSStandalone:e}=O_();try{if(e&&L_){H("[AUTH] Using Safari external fallback"),qs(!1),ZP();return}H("[AUTH] Starting popup sign-in flow...");const n=await KN(xe,t);return H("[AUTH] Popup sign-in successful:",n.user.email),qs(!1),n}catch(n){e0(n)}};async function M_(){try{await KP(),await NN(xe),console.info("User signed out"),setTimeout(()=>k_(),1500)}catch(t){throw N_("Sign out",t),t}}const o0="765724787439-21p8n3e2tsfq2qk4oriq7ipp7m4o50ad.apps.googleusercontent.com";function x_(){return new Promise((t,e)=>{if(typeof google>"u"||!google.accounts?.oauth2){e(new Error("Google Identity Services not loaded"));return}const n=Wn();console.log("[AUTH] Requesting contacts access via GIS Token Model..."),google.accounts.oauth2.initTokenClient({client_id:o0,scope:"https://www.googleapis.com/auth/contacts.readonly https://www.googleapis.com/auth/contacts.other.readonly",hint:n?.email||void 0,callback:s=>{if(s.error){console.error("[AUTH] Token request error:",s.error),s.error==="access_denied"?e(new Error("Authorization cancelled")):e(new Error(s.error_description||s.error));return}if(!s.access_token){e(new Error("No access token received"));return}console.log("[AUTH] Contacts access granted"),t(s.access_token)},error_callback:s=>{console.error("[AUTH] Token client error:",s),s.type==="popup_closed"?e(new Error("Authorization cancelled")):e(new Error(s.message||"Authorization failed"))}}).requestAccessToken()})}const Lu=Object.freeze(Object.defineProperty({__proto__:null,auth:xe,authReady:P_,getCurrentUser:Wn,getCurrentUserAsync:r0,getLoggedInUserId:U,getLoggedInUserToken:XP,getUserId:ge,isLoggedIn:Nu,onAuthChange:Pu,requestContactsAccess:x_,setSafariExternalOpenArmed:qs,signInWithAccountSelection:D_,signOutUser:M_},Symbol.toStringTag,{value:"Module"}));function ua(t="room"){const e=new URL(window.location);e.searchParams.delete(t),window.history.replaceState({},"",e)}class a0{async send(e,n){throw new Error("MessagingTransport.send() must be implemented by subclass")}listen(e,n){throw new Error("MessagingTransport.listen() must be implemented by subclass")}async getUnreadCount(e){throw new Error("MessagingTransport.getUnreadCount() must be implemented by subclass")}async markAsRead(e){throw new Error("MessagingTransport.markAsRead() must be implemented by subclass")}listenToUnreadCount(e,n){throw new Error("MessagingTransport.listenToUnreadCount() must be implemented by subclass")}async addReaction(e,n,i){throw new Error("MessagingTransport.addReaction() must be implemented by subclass")}async removeReaction(e,n,i){throw new Error("MessagingTransport.removeReaction() must be implemented by subclass")}async getReactions(e,n){throw new Error("MessagingTransport.getReactions() must be implemented by subclass")}}const kf=100;class c0 extends a0{_getConversationId(e,n){return[e,n].sort().join("_")}async send(e,n){const i=U();if(!i)throw new Error("Cannot send message: not logged in");const r=Wn()?.displayName||"Guest User",o=this._getConversationId(i,e),a=uo(b(E,`conversations/${o}/messages`));await ne(a,{text:n,from:i,fromName:r,sentAt:pi(),read:!1}),this._cleanupOldMessages(o).catch(c=>{console.warn("[RTDBTransport] Failed to cleanup old messages:",c)})}listen(e,n){const i=U();if(!i)return console.warn("[RTDBTransport] Cannot listen to messages: not logged in"),()=>{};const s=this._getConversationId(i,e),r=b(E,`conversations/${s}/messages`),o=new Set,a=l=>{const u=l.key,d=l.val();if(!d||o.has(u))return;o.add(u);const h=d.from===i,f={...d,messageId:u};n(d.text,f,h)},c=l=>{const u=l.key,d=l.val();if(!(!d||!o.has(u))&&d.reactions!==void 0){const h=d.from===i,f={...d,messageId:u,_reactionUpdate:!0};n(d.text,f,h)}};return Vs(r,a),nf(r,c),()=>{kt(r,"child_added",a),kt(r,"child_changed",c)}}async getUnreadCount(e){const n=U();if(!n)return 0;const i=this._getConversationId(n,e),s=b(E,`conversations/${i}/messages`);try{const r=await Oe(s);if(!r.exists())return 0;const o=r.val();return Object.values(o).filter(a=>!a.read&&a.from===e).length}catch(r){return console.warn("[RTDBTransport] Failed to get unread count:",r),0}}async markAsRead(e){const n=U();if(!n)return;const i=this._getConversationId(n,e),s=b(E,`conversations/${i}/messages`);try{const r=await Oe(s);if(!r.exists())return;const o=r.val(),a={};Object.entries(o).forEach(([c,l])=>{!l.read&&l.from===e&&(a[`conversations/${i}/messages/${c}/read`]=!0)}),Object.keys(a).length>0&&await fi(b(E),a)}catch(r){console.warn("[RTDBTransport] Failed to mark messages as read:",r)}}listenToUnreadCount(e,n){const i=U();if(!i)return console.warn("[RTDBTransport] Cannot listen to unread count: not logged in"),()=>{};const s=this._getConversationId(i,e),r=b(E,`conversations/${s}/messages`),o=async()=>{try{const l=await this.getUnreadCount(e);n(l)}catch(l){console.warn("[RTDBTransport] Failed to get unread count:",l)}},a=async l=>{const u=l.val();u&&u.from===e&&!u.read&&await o()},c=async l=>{const u=l.val();u&&u.from===e&&await o()};return Vs(r,a),nf(r,c),()=>{kt(r,"child_added",a),kt(r,"child_changed",c)}}async _cleanupOldMessages(e){const n=b(E,`conversations/${e}/messages`),i=await Oe(n);if(!i.exists())return;const s=i.val(),r=Object.keys(s).length;if(r<=kf)return;const o=r-kf,a=Object.entries(s).sort((l,u)=>(l[1].sentAt||0)-(u[1].sentAt||0)),c={};for(let l=0;l<o;l++){const[u]=a[l];c[`conversations/${e}/messages/${u}`]=null}await fi(b(E),c),console.log(`[RTDBTransport] Cleaned up ${o} old messages from conversation ${e}`)}async addReaction(e,n,i){const s=U();if(!s)throw new Error("Cannot add reaction: not logged in");const o=`conversations/${this._getConversationId(s,e)}/messages/${n}/reactions/${i}/${s}`;await ne(b(E,o),!0)}async removeReaction(e,n,i){const s=U();if(!s)throw new Error("Cannot remove reaction: not logged in");const o=`conversations/${this._getConversationId(s,e)}/messages/${n}/reactions/${i}/${s}`;await ne(b(E,o),null)}async getReactions(e,n){const i=U();if(!i)return{};const s=this._getConversationId(i,e),r=b(E,`conversations/${s}/messages/${n}/reactions`);try{const o=await Oe(r);if(!o.exists())return{};const a=o.val(),c={};for(const[l,u]of Object.entries(a))c[l]=Object.keys(u);return c}catch(o){return console.warn("[RTDBTransport] Failed to get reactions:",o),{}}}async hasMyReaction(e,n,i){const s=U();if(!s)return!1;const o=`conversations/${this._getConversationId(s,e)}/messages/${n}/reactions/${i}/${s}`;try{return(await Oe(b(E,o))).exists()}catch{return!1}}}class l0{constructor(e,n=null){if(!e)throw new Error("MessagingController requires a transport implementation");this.transport=e,this.fileTransport=n,this.sessions=new Map}openSession(e,{onMessage:n,onUnreadChange:i}={}){if(!e||typeof e!="string")throw new Error("contactId must be a non-empty string");if(this.sessions.has(e))return console.info(`[MessagingController] Session already open for ${e}`),this.sessions.get(e);const s=this.transport.listen(e,(o,a,c)=>{n&&typeof n=="function"&&n(o,a,c),!c&&i&&typeof i=="function"&&this.transport.getUnreadCount(e).then(l=>i(l)).catch(l=>console.warn("[MessagingController] Failed to get unread count:",l))}),r={contactId:e,send:o=>!o||typeof o!="string"?Promise.reject(new Error("Message text must be a non-empty string")):this.transport.send(e,o),markAsRead:()=>this.transport.markAsRead(e),getUnreadCount:()=>this.transport.getUnreadCount(e),close:()=>{this.closeSession(e)},addReaction:(o,a)=>this.transport.addReaction(e,o,a),removeReaction:(o,a)=>this.transport.removeReaction(e,o,a),hasMyReaction:(o,a)=>this.transport.hasMyReaction(e,o,a),_unsubscribe:s};return this.sessions.set(e,r),r}closeSession(e){const n=this.sessions.get(e);n&&(n._unsubscribe&&typeof n._unsubscribe=="function"&&n._unsubscribe(),this.sessions.delete(e))}getSession(e){return this.sessions.get(e)}getAllSessions(){return Array.from(this.sessions.values())}closeAllSessions(){this.sessions.forEach(e=>{e._unsubscribe&&typeof e._unsubscribe=="function"&&e._unsubscribe()}),this.sessions.clear()}async getUnreadCount(e){if(!e||typeof e!="string")throw new Error("contactId must be a non-empty string");return this.transport.getUnreadCount(e)}listenToUnreadCount(e,n){if(!e||typeof e!="string")throw new Error("contactId must be a non-empty string");if(typeof n!="function")throw new Error("onCountChange must be a function");return this.transport.listenToUnreadCount(e,n)}setFileTransport(e){this.fileTransport=e}canSendFiles(){return this.fileTransport!==null&&this.fileTransport.isReady()}async sendFile(e,n){if(!this.fileTransport)throw new Error("File transport not available. Files can only be sent during active calls.");if(!this.fileTransport.isReady())throw new Error("File transport not ready");return this.fileTransport.sendFile(e,n)}onFileReceived(e){if(!this.fileTransport)throw new Error("File transport not available");if(typeof e!="function")throw new Error("onFileReceived callback must be a function");this.fileTransport.onFileReceived(e)}clearFileTransport(){this.fileTransport&&(this.fileTransport.cleanup(),this.fileTransport=null)}}const sn=new l0(new c0);function yo(t,e){if(!t||!e)throw new Error("Both user IDs are required");if(t===e)throw new Error("Cannot create room ID for same user");const[n,i]=[t,e].sort(),s=`${n}_${i}`;let r=0;for(let u=0;u<s.length;u++){const d=s.charCodeAt(u);r=(r<<5)-r+d,r=r&r}let o=5381;for(let u=0;u<s.length;u++)o=(o<<5)+o+s.charCodeAt(u);const a=Math.abs(r).toString(36),c=Math.abs(o).toString(36);return(a+c).slice(0,16).padEnd(16,"0")}class u0{constructor(e,{loop:n=!1,volume:i=.5}={}){this.src=e,this.audio=new Audio(e),this.audio.loop=n,this.audio.volume=Math.max(0,Math.min(1,i)),this.isPlaying=!1,this.audio.onerror=s=>{console.error(`[AudioPlayer] Failed to load audio: ${e}`,s),this.isPlaying=!1},this.audio.onplay=()=>{this.isPlaying=!0},this.audio.onpause=()=>{this.isPlaying=!1},this.audio.onended=()=>{this.isPlaying=!1}}async play(){if(!this.audio)return!1;if(this.isPlaying)return!0;try{return await this.audio.play(),this.isPlaying=!0,!0}catch(e){return e.name==="NotAllowedError"?console.warn("[AudioPlayer] Autoplay blocked - user interaction required first",{src:this.src}):e.name==="NotSupportedError"?console.error("[AudioPlayer] Audio format not supported",{src:this.src}):console.error("[AudioPlayer] Playback error:",e),this.isPlaying=!1,!1}}stop(){this.audio&&(this.audio.pause(),this.audio.currentTime=0,this.isPlaying=!1)}pause(){this.audio&&(this.audio.pause(),this.isPlaying=!1)}setVolume(e){this.audio&&(this.audio.volume=Math.max(0,Math.min(1,e)))}getVolume(){return this.audio?.volume??0}dispose(){this.stop(),this.audio&&(this.audio.onerror=null,this.audio.onplay=null,this.audio.onpause=null,this.audio.onended=null,this.audio.src="",this.audio=null),this.isPlaying=!1}}class d0{constructor({incomingSrc:e,outgoingSrc:n,volume:i}={}){const s="/HangVidU/";this.incomingSrc=e??`${s}sounds/incoming.mp3`,this.outgoingSrc=n??`${s}sounds/outgoing.mp3`,this.defaultVolume=i??.7,this.currentPlayer=null,this.currentType=null}configure({incomingSrc:e,outgoingSrc:n,volume:i}={}){e!==void 0&&(this.incomingSrc=e),n!==void 0&&(this.outgoingSrc=n),i!==void 0&&(this.defaultVolume=i)}setIncomingRingtone(e){this.incomingSrc=e}setOutgoingRingtone(e){this.outgoingSrc=e}setVolume(e){this.defaultVolume=Math.max(0,Math.min(1,e))}async playIncoming(){return this._play("incoming",this.incomingSrc)}async playOutgoing(){return this._play("outgoing",this.outgoingSrc)}async _play(e,n){this.stop();try{this.currentPlayer=new u0(n,{loop:!0,volume:this.defaultVolume}),this.currentType=e;const i=await this.currentPlayer.play();return i?console.log(`[Ringtone] Playing ${e} ringtone`):(console.warn(`[Ringtone] Failed to start ${e} ringtone (likely autoplay blocked)`),this.currentPlayer?.dispose(),this.currentPlayer=null,this.currentType=null),i}catch(i){return console.error(`[Ringtone] Error playing ${e} ringtone:`,i),this.currentPlayer?.dispose(),this.currentPlayer=null,this.currentType=null,!1}}stop(){this.currentPlayer&&(console.log(`[Ringtone] Stopping ${this.currentType} ringtone`),this.currentPlayer.stop(),this.currentPlayer.dispose(),this.currentPlayer=null,this.currentType=null)}isPlaying(){return this.currentPlayer?.isPlaying??!1}getCurrentType(){return this.currentType}}const yi=new d0,zs=new WeakMap;function Ou(t,e,n){if(!t||!n)throw new Error("setupIceCandidates: pc and roomId are required");if(zs.has(t)||zs.set(t,[]),e==="initiator")Rf(t,"offerCandidates",n),Af(t,"answerCandidates",n);else if(e==="joiner")Rf(t,"answerCandidates",n),Af(t,"offerCandidates",n);else throw new Error(`Invalid role: ${e} specified for ICE candidate setup.`)}function Rf(t,e,n){t.onicecandidate=i=>{if(i.candidate){const s=uo(e==="offerCandidates"?Wm(n):jm(n));ne(s,i.candidate.toJSON())}}}function Af(t,e,n){const i=e==="offerCandidates"?Wm(n):jm(n);let s=!1;const r=()=>{if(s)return;s=!0;const a=()=>{t.remoteDescription&&(Du(t),t.removeEventListener("signalingstatechange",a))};t.addEventListener("signalingstatechange",a)};Rn(i,"child_added",a=>{const c=a.val();if(!(!t||t.signalingState==="closed")&&c)if(t.remoteDescription)try{t.addIceCandidate(new RTCIceCandidate(c))}catch{}else{const l=zs.get(t);l&&(l.push(c),l.length===1&&r())}},n)}function Du(t){if(!t||!zs.has(t))return;const e=zs.get(t);if(e.length!==0){H(`🔄 Draining ${e.length} queued ICE candidate(s)`);for(const n of e)try{t.addIceCandidate(new RTCIceCandidate(n)).catch(i=>{H("Error adding queued ICE candidate:",i)})}catch{}e.length=0}}const h0=Object.freeze(Object.defineProperty({__proto__:null,drainIceCandidateQueue:Du,setupIceCandidates:Ou},Symbol.toStringTag,{value:"Module"}));class wi{constructor(){this.logs=[],this.isEnabled=!0,this.maxLogs=1e3,this.sessionId=this.generateSessionId()}log(e,n,i={}){if(!this.isEnabled)return;const s={timestamp:performance.now(),sessionId:this.sessionId,category:e,event:n,data:{...i},id:this.generateLogId()};this.logs.push(s),this.logs.length>this.maxLogs&&(this.logs=this.logs.slice(-this.maxLogs)),typeof window<"u"&&window.location?.hostname==="localhost"&&console.log(`[DIAG] ${e}:${n}`,i)}logListenerAttachment(e,n,i,s={}){this.log("LISTENER","ATTACHED",{roomId:e,listenerType:n,currentCount:i,...s})}logListenerCleanup(e,n,i={}){this.log("LISTENER","CLEANUP",{removedCount:e.length,preservedCount:n.length,removedRoomIds:e,preservedRoomIds:n,...i})}logDuplicateListener(e,n,i={}){this.log("LISTENER","DUPLICATE_PREVENTED",{roomId:e,listenerType:n,...i})}logIncomingCallEvent(e,n,i,s={}){this.log("INCOMING_CALL","DETECTED",{callerId:e,roomId:n,isFresh:i.isFresh,validationMethod:i.method,age:i.age,reason:i.reason,...s})}logNotificationDecision(e,n,i,s={}){this.log("INCOMING_CALL","NOTIFICATION_DECISION",{decision:e,reason:n,roomId:i,...s})}logCallingUILifecycle(e,n,i={}){this.log("CALLING_UI",e,{roomId:n,...i})}logFirebaseOperation(e,n,i=null,s={}){this.log("FIREBASE","OPERATION",{operation:e,success:n,error:i?{message:i.message,code:i.code,stack:i.stack}:null,...s})}logFirebaseConnectionState(e,n={}){this.log("FIREBASE","CONNECTION_STATE",{state:e,...n})}logRoomCreation(e,n,i,s={}){this.log("ROOM","CREATED",{roomId:e,isInitiator:n,creationTime:i.creationTime,listenerAttachTime:i.listenerAttachTime,timeDiff:i.listenerAttachTime-i.creationTime,...s})}logMemberJoinEvent(e,n,i,s={}){this.log("ROOM","MEMBER_JOINED",{roomId:e,memberId:n,joinedAt:i.joinedAt,role:i.role,...s})}logContactSave(e,n,i={}){this.log("CONTACT","SAVED",{contactId:e,roomId:n,...i})}logContactCall(e,n,i,s={}){this.log("CONTACT","CALL_INITIATED",{contactId:e,roomId:n,forceInitiator:i,...s})}logFreshnessValidation(e,n,i,s={}){this.log("FRESHNESS","VALIDATION",{roomId:e,method:n,result:{isFresh:i.isFresh,age:i.age,threshold:i.threshold,reason:i.reason},...s})}logRaceCondition(e,n,i,s={}){this.log("RACE_CONDITION",e,{roomId:n,events:i,...s})}getLogs(e={}){let n=[...this.logs];return e.category&&(n=n.filter(i=>i.category===e.category)),e.event&&(n=n.filter(i=>i.event===e.event)),e.roomId&&(n=n.filter(i=>i.data.roomId===e.roomId)),e.since&&(n=n.filter(i=>i.timestamp>=e.since)),e.until&&(n=n.filter(i=>i.timestamp<=e.until)),n}getCallFlowTrace(e){return this.getLogs({roomId:e}).sort((n,i)=>n.timestamp-i.timestamp)}getListenerDiagnostics(e=null){const n=this.getLogs({category:"LISTENER"});return e?n.filter(i=>i.data.roomId===e):n}getFailureAnalysis(){const e=this.logs.filter(n=>n.category==="FIREBASE"&&n.data.success===!1||n.category==="INCOMING_CALL"&&n.data.decision==="REJECT"||n.category==="LISTENER"&&n.event==="DUPLICATE_PREVENTED");return{totalFailures:e.length,firebaseFailures:e.filter(n=>n.category==="FIREBASE").length,rejectedCalls:e.filter(n=>n.category==="INCOMING_CALL"&&n.data.decision==="REJECT").length,duplicateListeners:e.filter(n=>n.event==="DUPLICATE_PREVENTED").length,failures:e}}exportDiagnostics(){return{sessionId:this.sessionId,exportTime:Date.now(),logCount:this.logs.length,logs:[...this.logs],summary:this.getFailureAnalysis()}}exportLogsAsJSON(){return JSON.stringify(this.exportDiagnostics(),null,2)}downloadLogs(e=null){e||(e=`diagnostic-logs-${this.sessionId}-${Date.now()}.json`);const n=this.exportLogsAsJSON(),i=new Blob([n],{type:"application/json"}),s=document.createElement("a");s.href=URL.createObjectURL(i),s.download=e,s.click(),URL.revokeObjectURL(s.href)}getLogsInTimeRange(e,n){return this.logs.filter(i=>i.timestamp>=e&&i.timestamp<=n)}getLogsSince(e){return this.logs.filter(n=>n.timestamp>=e)}clearOldLogs(e=1440*60*1e3){const n=Date.now()-e;this.logs=this.logs.filter(i=>i.timestamp>=n)}clearLogs(){this.logs=[]}persistLogs(){try{const e=`diagnostic-logs-${this.sessionId}`;return localStorage.setItem(e,this.exportLogsAsJSON()),e}catch(e){return console.warn("Failed to persist logs to localStorage:",e),null}}loadPersistedLogs(e){try{const n=localStorage.getItem(e);if(n){const i=JSON.parse(n);if(i.logs&&Array.isArray(i.logs)){const s=new Set(this.logs.map(o=>o.id)),r=i.logs.filter(o=>!s.has(o.id));return this.logs=[...this.logs,...r].sort((o,a)=>o.timestamp-a.timestamp),r.length}}return 0}catch(n){return console.warn("Failed to load persisted logs:",n),0}}static getPersistedLogKeys(){const e=[];for(let n=0;n<localStorage.length;n++){const i=localStorage.key(n);i&&i.startsWith("diagnostic-logs-")&&e.push(i)}return e}static cleanupPersistedLogs(e=1440*60*1e3){const n=Date.now()-e;wi.getPersistedLogKeys().forEach(s=>{try{const r=localStorage.getItem(s);if(r){const o=JSON.parse(r);o.exportTime&&o.exportTime<n&&localStorage.removeItem(s)}}catch{localStorage.removeItem(s)}})}enable(){this.isEnabled=!0}disable(){this.isEnabled=!1}generateSessionId(){return`session_${performance.now()}_${Math.random().toString(36).substr(2,9)}`}generateLogId(){return`log_${performance.now()}_${Math.random().toString(36).substr(2,9)}`}formatTimestamp(e){return new Date(e).toISOString()}startTiming(e){const n=`timing_${e}_${Date.now()}`;return this.log("TIMING","START",{operation:e,timingId:n}),n}endTiming(e,n={}){const i=this.logs.find(s=>s.category==="TIMING"&&s.event==="START"&&s.data.timingId===e);if(i){const s=Date.now()-i.timestamp;return this.log("TIMING","END",{timingId:e,duration:s,operation:i.data.operation,...n}),s}return null}}let Ya=null;function y(){return Ya||(Ya=new wi),Ya}typeof window<"u"&&(window.diagnosticLogger={getInstance:()=>y(),exportLogs:()=>{const e=y().exportLogsAsJSON();return console.log("Diagnostic logs exported:"),console.log(e),e},downloadLogs:t=>{y().downloadLogs(t),console.log("Diagnostic logs downloaded")},getRoomLogs:t=>{const n=y().getCallFlowTrace(t);return console.log(`Logs for room ${t}:`,n),n},getFailures:()=>{const e=y().getFailureAnalysis();return console.log("Failure analysis:",e),e},getListenerDiagnostics:t=>{const n=y().getListenerDiagnostics(t);return console.log("Listener diagnostics:",n),n},getLogsSince:t=>{const n=y().getLogsSince(t);return console.log(`Logs since ${new Date(t).toISOString()}:`,n),n},getLogsInRange:(t,e)=>{const i=y().getLogsInTimeRange(t,e);return console.log(`Logs from ${new Date(t).toISOString()} to ${new Date(e).toISOString()}:`,i),i},persistLogs:()=>{const e=y().persistLogs();return console.log(`Logs persisted with key: ${e}`),e},loadPersistedLogs:t=>{const n=y().loadPersistedLogs(t);return console.log(`Loaded ${n} persisted logs`),n},getPersistedKeys:()=>{const t=wi.getPersistedLogKeys();return console.log("Persisted log keys:",t),t},clearLogs:()=>{y().clearLogs(),console.log("Diagnostic logs cleared")},enable:()=>{y().enable(),console.log("Diagnostic logging enabled")},disable:()=>{y().disable(),console.log("Diagnostic logging disabled")},getSessionInfo:()=>{const t=y(),e={sessionId:t.sessionId,logCount:t.logs.length,isEnabled:t.isEnabled,maxLogs:t.maxLogs};return console.log("Session info:",e),e},help:()=>{console.log(`
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
      `)}},window.addEventListener("beforeunload",()=>{try{const t=y();t.logs.length>0&&t.persistLogs(),wi.cleanupPersistedLogs()}catch{}}),(window.location.hostname==="localhost"||window.location.hostname==="127.0.0.1")&&setTimeout(()=>{try{const t=y(),e=typeof localStorage<"u"&&localStorage.getItem("debug:console")==="1";if(!t.isEnabled||!e)return;const n=wi.getPersistedLogKeys();n.length>0&&(console.log(`Found ${n.length} persisted diagnostic log sessions. Use diagnosticLogger.loadPersistedLogs(key) to load them.`),console.log("Available keys:",n))}catch{}},1e3));class f0{constructor(){this.currentRoomId=null}async createNewRoom(e,n,i=null){const s=Date.now();i||(i=Math.random().toString(36).substring(2,15)),y().log("ROOM","CREATE_START",{roomId:i,userId:n,hasOffer:!!e,timestamp:s});const r=En(i);try{return await ne(r,{offer:{type:e.type,sdp:e.sdp},createdAt:Date.now(),createdBy:n}),y().logFirebaseOperation("create_room",!0,null,{roomId:i,userId:n,duration:Date.now()-s}),await this.joinRoom(i,n),y().log("ROOM","CREATE_COMPLETE",{roomId:i,userId:n,totalDuration:Date.now()-s}),i}catch(o){throw y().logFirebaseOperation("create_room",!1,o,{roomId:i,userId:n,duration:Date.now()-s}),o}}async checkRoomStatus(e){const n=En(e),i=await Oe(n);if(!i.exists())return{exists:!1,hasMembers:!1,memberCount:0};const s=i.val(),r=s.members||{},o=Object.keys(r).length;return{exists:!0,hasMembers:o>0,memberCount:o,roomData:s}}async getRoomData(e){const n=En(e),i=await Oe(n);if(!i.exists())throw new Error("Room does not exist");return i.val()}async saveAnswer(e,n){const i=En(e);await fi(i,{answer:n})}async joinRoom(e,n,i="Guest User"){const s=uf(e,n);await ne(s,{displayName:i,joinedAt:Date.now()}),y().logFirebaseOperation("set","joinRoom",`rooms/${e}/members/${n}`)}async leaveRoom(e,n=null,{deleteRoomIfEmpty:i=!0}={}){const s=n||this.currentRoomId;if(!s||!e)return;const r=uf(s,e),o=Er(s),a=En(s);try{await Xe(r)}catch(c){y().logFirebaseOperation("leave_room_remove_member",!1,c,{roomId:s,userId:e})}if(i)try{const c=await Oe(o),l=c.exists()?c.val():{};(l?Object.keys(l).length:0)===0&&await Xe(a).catch(d=>{y().logFirebaseOperation("delete_empty_room",!1,d,{roomId:s})})}catch(c){y().logFirebaseOperation("check_members_after_leave",!1,c,{roomId:s})}(!n||n===this.currentRoomId)&&(this.currentRoomId=null)}async rejectCall(e,n,i="user_rejected"){if(!e||!n)return;const s=En(e),r={rejection:{by:n,reason:i,at:Date.now()}};try{await fi(s,r),y().log("ROOM","REJECT_SET",{roomId:e,byUserId:n,reason:i})}catch(o){throw y().log("ROOM","REJECT_SET_FAILED",{roomId:e,byUserId:n,reason:i,error:String(o?.message||o)}),o}}async cancelCall(e,n,i="caller_cancelled"){if(!e||!n)return;const s=En(e),r={cancellation:{by:n,reason:i,at:Date.now()}};try{await fi(s,r),y().log("ROOM","CANCEL_SET",{roomId:e,byUserId:n,reason:i})}catch(o){throw y().log("ROOM","CANCEL_SET_FAILED",{roomId:e,byUserId:n,reason:i,error:String(o?.message||o)}),o}}onCallCancelled(e,n){const i=HA(e);Rn(i,"value",n,e),y().logFirebaseOperation("on","onCallCancelled",`rooms/${e}/cancellation`,{event:"value"})}onMemberJoined(e,n){const i=Er(e);Rn(i,"child_added",n,e),y().logFirebaseOperation("on","onMemberJoined",`rooms/${e}/members`,{event:"child_added"})}onMemberLeft(e,n){const i=Er(e);Rn(i,"child_removed",n,e),y().logFirebaseOperation("on","onMemberLeft",`rooms/${e}/members`,{event:"child_removed"})}onIncomingCall(e,n,i){const s=Er(e),r=a=>{i("join",a.key,a.val())},o=a=>{i("leave",a.key,a.val())};return Rn(s,"child_added",r,e,n),Rn(s,"child_removed",o,e,n),()=>BA(n,e)}get roomId(){return this.currentRoomId}}const se=new f0,Bt={view:"lobby",currentMedia:"none",setView(t){t!==this.view&&(this.view=t,document.body.dataset.view=t)},setMainContent(t){t!==this.currentMedia&&(this.currentMedia=t,document.body.dataset.mainContent=t)}};document.body.dataset.view=Bt.view;document.body.dataset.mainContent=Bt.currentMedia;const wo=3e4;let St=null,gs=null;async function p0(t,e=null){const n=ge(),i=U();if(!i)return;const s=wu(i);await ne(s,{roomId:t,targetContactName:e,initiatedAt:Date.now(),callerUserId:n})}async function vo(){const t=U();if(!t)return;const e=wu(t);await Xe(e).catch(()=>{})}async function F_(t,e){if(!t)return!1;try{const n=wu(t),i=await Oe(n);if(!i.exists())return!1;const s=i.val();return s.roomId!==e?!1:Date.now()-s.initiatedAt<wo}catch(n){return console.warn("Failed to check outgoing call freshness",n),!1}}async function U_(t){if(!t)return!1;try{const e=b(E,`rooms/${t}/createdAt`),n=await Oe(e);if(!n.exists())return!1;const i=n.val();return typeof i!="number"?!1:Date.now()-i<wo}catch(e){return console.warn("Failed to check room freshness",e),!1}}async function $_(t,e,n){const i=y(),s=Date.now();Mn(),await p0(t,e),Bt.setView("calling");const r=document.createElement("div");r.id="calling-modal",r.style.cssText=`
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
  `;const u=async()=>{i.logCallingUILifecycle("CANCEL",t,{contactName:e,reason:"user_cancelled",duration:Date.now()-s});try{await Promise.all([vo(),se.cancelCall(t,ge(),"caller_cancelled"),se.leaveRoom(ge(),t)])}catch(d){i.log("ROOM","CALLER_CANCELLED_CLEANUP_FAIL",{roomId:t,error:String(d)})}yi.stop(),Mn()};l.onclick=u,o.appendChild(a),o.appendChild(c),o.appendChild(l),r.appendChild(o),document.body.appendChild(r),r.dataset.roomId=t,St=r,yi.playOutgoing(),gs=setTimeout(async()=>{i.logCallingUILifecycle("TIMEOUT",t,{contactName:e,reason:"auto_timeout",duration:Date.now()-s,timeoutMs:wo});try{await Promise.all([vo(),se.cancelCall(t,ge(),"auto_timeout"),se.leaveRoom(ge(),t)])}catch(d){i.log("ROOM","CALLER_TIMEOUT_CLEANUP_FAIL",{roomId:t,error:String(d)})}yi.stop(),Mn()},wo)}function Mn(){if(yi.stop(),Bt.view==="calling"&&Bt.setView("lobby"),St){const t=St.dataset?.roomId||"unknown";y().logCallingUILifecycle("HIDE",t,{reason:"hide_called",hadTimeout:!!gs,timestamp:Date.now()})}gs&&(clearTimeout(gs),gs=null),St&&(St.remove(),St=null)}async function Mu(){if(St){const t=St.dataset?.roomId||"unknown";y().logCallingUILifecycle("ANSWERED",t,{reason:"call_answered",timestamp:Date.now()})}await vo(),Mn()}async function g0(t="user_rejected"){const e=y(),n=St?.dataset?.roomId||"unknown";e.logCallingUILifecycle("REJECTED",n,{reason:t,timestamp:Date.now()}),await vo(),Mn()}const m0=Object.freeze(Object.defineProperty({__proto__:null,hideCallingUI:Mn,isOutgoingCallFresh:F_,isRoomCallFresh:U_,onCallAnswered:Mu,onCallRejected:g0,showCallingUI:$_},Symbol.toStringTag,{value:"Module"})),z=t=>{const e=document.getElementById(t);return e||(console.warn(`Element with id: ${t} not found.`),null)};let Qe=null,yn=null,da=null,xu=null,je=null,me=null,ae=null,ce=null,F=null,Re=null,Ge=null,Fe=null,lt=null,ts=null,B_=null,ut=null,ha=null,fn=null,ns=null,is=null,jn=null,Fu=null,Uu=null,$u=null,Bu=null,vi=null,Gs=null,Hu=null;function Nf(){Qe=z("lobby"),yn=z("lobby-call-btn"),da=z("title-auth-bar"),xu=z("videos"),je=z("local-video-el"),me=z("local-video-box"),ae=z("remote-video-el"),ce=z("remote-video-box"),F=z("shared-video-el"),Re=z("shared-video-box"),Ge=z("chat-controls"),Fe=z("call-btn"),lt=z("hang-up-btn"),ts=z("switch-camera-btn"),ut=z("mute-btn"),ha=z("fullscreen-partner-btn"),fn=z("remote-pip-btn"),ns=z("mic-btn"),is=z("camera-btn"),jn=z("exit-watch-mode-btn"),Fu=z("app-pip-btn"),Uu=z("app-title-h1"),$u=z("app-title-a"),Bu=z("app-title-span"),vi=z("paste-join-btn"),Gs=z("add-contact-btn"),Hu=z("test-notifications-btn")}document.readyState==="loading"?document.addEventListener("DOMContentLoaded",Nf):Nf();const H_=()=>({lobbyDiv:Qe,lobbyCallBtn:yn,titleAuthBar:da,videosWrapper:xu,localVideoEl:je,localBoxEl:me,remoteVideoEl:ae,remoteBoxEl:ce,sharedVideoEl:F,sharedBoxEl:Re,chatControls:Ge,callBtn:Fe,hangUpBtn:lt,switchCameraBtn:ts,installBtn:B_,mutePartnerBtn:ut,fullscreenPartnerBtn:ha,remotePipBtn:fn,micBtn:ns,cameraBtn:is,exitWatchModeBtn:jn,appPipBtn:Fu,appTitleH1:Uu,appTitleA:$u,appTitleSpan:Bu,pasteJoinBtn:vi,addContactBtn:Gs,testNotificationsBtn:Hu});function V_(t,e=3,n=100){return new Promise(i=>{let s=0;const r=()=>{const o=document.getElementById(t);if(o){i(o);return}if(s++,s>=e){console.warn(`Element ${t} not found after ${e} attempts`),i(null);return}setTimeout(r,n)};r()})}async function W_(t,e=3,n=100){const i={},s=t.map(async r=>{const o=await V_(r,e,n);return i[r]=o,o});return await Promise.all(s),i}async function _0(){const t=await W_(["searchBtn","searchQuery","searchResults"],5,200),e=document.querySelector(".search-section");t.searchContainer=e;const n=Object.entries(t).filter(([i,s])=>!s).map(([i])=>i);return n.length>0&&console.warn("Some YouTube elements not found:",n),t}const y0=Object.freeze(Object.defineProperty({__proto__:null,get addContactBtn(){return Gs},get appPipBtn(){return Fu},get appTitleA(){return $u},get appTitleH1(){return Uu},get appTitleSpan(){return Bu},get callBtn(){return Fe},get cameraBtn(){return is},get chatControls(){return Ge},get exitWatchModeBtn(){return jn},get fullscreenPartnerBtn(){return ha},getElements:H_,get hangUpBtn(){return lt},initializeYouTubeElements:_0,installBtn:B_,get lobbyCallBtn(){return yn},get lobbyDiv(){return Qe},get localBoxEl(){return me},get localVideoEl(){return je},get micBtn(){return ns},get mutePartnerBtn(){return ut},get pasteJoinBtn(){return vi},get remoteBoxEl(){return ce},get remotePipBtn(){return fn},get remoteVideoEl(){return ae},robustElementAccess:V_,get sharedBoxEl(){return Re},get sharedVideoEl(){return F},get switchCameraBtn(){return ts},get testNotificationsBtn(){return Hu},get titleAuthBar(){return da},get videosWrapper(){return xu},waitForElements:W_},Symbol.toStringTag,{value:"Module"})),Vu=t=>t?!0:(console.warn("Element not found. el.id: =>",t?.id??"(no id)","el: =>",t),console.trace(),!1),bo=t=>{if(Vu(t))return t.classList.contains("hidden")},D=t=>{Vu(t)&&t.classList.contains("hidden")&&t.classList.remove("hidden")},w=t=>{Vu(t)&&!t.classList.contains("hidden")&&t.classList.add("hidden")},j_=t=>t.classList.contains("small-frame"),Ks=t=>{if(t&&!j_(t)){t.classList.add("small-frame");const e=document.createElement("div");e.classList.add("small-frame-toggle-div");const n=document.createElement("span");n.classList.add("small-frame-toggle-icon"),n.textContent="❮",e.appendChild(n),t.appendChild(e),e.addEventListener("click",()=>{t.classList.contains("closed")?(t.classList.remove("closed"),e.classList.remove("closed"),n.classList.remove("closed")):(t.classList.add("closed"),e.classList.add("closed"),n.classList.add("closed"))})}},rn=t=>{if(j_(t)){t.classList.remove("small-frame"),t.classList.remove("closed");const e=t.querySelector(".small-frame-toggle-div");e&&e.remove()}};function Wu(t){return document.pictureInPictureElement===t}function w0(t,{inactivityMs:e=3e3,listenTarget:n=document,onShow:i=null,onHide:s=null,hideOnEsc:r=!1,excludeEvents:o=["keydown"]}={}){if(!t)return()=>{};let a=null;const l=["pointermove","pointerdown","pointerup","touchstart","touchmove","mousemove","mousedown","keydown"].filter(m=>!Array.isArray(o)||!o.includes(m));function u(){D(t);try{typeof i=="function"&&i()}catch(m){console.warn("showHideOnInactivity onShow callback error:",m)}a&&clearTimeout(a),a=setTimeout(()=>{w(t);try{typeof s=="function"&&s()}catch(m){console.warn("showHideOnInactivity onHide callback error:",m)}a=null},e)}l.forEach(m=>n.addEventListener(m,u,{passive:!0}));function d(){if(document.hidden){a&&(clearTimeout(a),a=null);try{w(t)}catch(m){console.warn("showHideOnInactivity onHide (visibilitychange) callback error:",m)}}else u()}document.addEventListener("visibilitychange",d);function h(m){if(!m.relatedTarget){a&&(clearTimeout(a),a=null),w(t);try{typeof s=="function"&&s()}catch(R){console.warn("showHideOnInactivity onHide (visibilitychange) callback error:",R)}}}n.addEventListener("mouseout",h);function f(m){if(r&&(m.key==="Escape"||m.key==="Esc")){a&&(clearTimeout(a),a=null),w(t);try{typeof s=="function"&&s()}catch(R){console.warn("showHideOnInactivity onHide (esc) callback error:",R)}}}document.addEventListener("keydown",f);function p(){a||u()}n.addEventListener("touchend",p,{passive:!0}),w(t);function _(){l.forEach(m=>n.removeEventListener(m,u)),document.removeEventListener("visibilitychange",d),n.removeEventListener("mouseout",h),n.removeEventListener("touchend",p),document.removeEventListener("keydown",f),a&&(clearTimeout(a),a=null)}return _}let Nt=null,Pt=null,q_="user";function Zc(){return q_}function z_(t){q_=t}function fa(){return Nt instanceof MediaStream}function ju(){return!Nt||!(Nt instanceof MediaStream)?(console.error("Invalid remote MediaStream accessed:",Nt),null):Nt}function G_(t){Nt=t}function K_(){Nt&&(Nt.getTracks().forEach(t=>t.stop()),Nt=null)}function Y_(){return Pt instanceof MediaStream}function pa(){return!Pt||!(Pt instanceof MediaStream)?(console.error("Invalid local MediaStream accessed:",Pt),console.error("Call createLocalStream() before accessing local stream."),null):Pt}function Eo(t){Pt=t}function J_(){Pt&&(Pt.getTracks().forEach(t=>t.stop()),Pt=null)}const v0=Object.freeze(Object.defineProperty({__proto__:null,cleanupLocalStream:J_,cleanupRemoteStream:K_,getFacingMode:Zc,getLocalStream:pa,getRemoteStream:ju,hasLocalStream:Y_,hasRemoteStream:fa,setFacingMode:z_,setLocalStream:Eo,setRemoteStream:G_},Symbol.toStringTag,{value:"Module"})),Pf="yt-video-box",el="yt-player-root";let Z=null,Wt=!1;const Ss=()=>Z,b0=()=>Wt,X_=t=>Wt=t,bi=()=>{const t=document.getElementById(Pf);if(!t)throw new Error(`Container #${Pf} not found`);return t};function E0(){return new Promise(t=>{window.YT&&window.YT.Player?t():window.onYouTubeIframeAPIReady=()=>{t()}})}function Q_(){const t=bi();if(!document.getElementById(el)){const e=document.createElement("div");e.id=el,t.appendChild(e)}D(t)}function Co(){const t=bi();w(t)}function Ja(){const t=bi();return t&&!t.classList.contains("hidden")}function tl(t){return t?t.includes("youtube.com")||t.includes("youtu.be"):!1}function Z_(t){if(!t)return null;const e=[/(?:youtube\.com\/watch\?v=)([\w-]+)/,/(?:youtu\.be\/)([\w-]+)/,/(?:youtube\.com\/embed\/)([\w-]+)/,/(?:youtube\.com\/shorts\/)([\w-]+)/];for(const n of e){const i=t.match(n);if(i&&i[1])return i[1]}return null}async function C0({url:t,onReady:e,onStateChange:n}){const i=Z_(t);if(!i)throw new Error("Invalid YouTube URL");if(await E0(),Z){try{Z.destroy()}catch(o){console.warn("Error destroying previous YouTube player:",o)}Z=null}const s=(o=!0)=>{const a=bi(),c=Z.getIframe();if(c&&a){try{a.tabIndex=-1,a.focus({preventScroll:!0})}catch{if(document.activeElement===c)try{c.blur()}catch{}}if(o){const l=u=>{if(u.code==="Space"){const d=bi(),h=Z.getIframe();if(document.activeElement===h||document.activeElement===d)return;u.preventDefault(),console.debug("Space pressed, refocusing iframe"),Z.getPlayerState()!==window.YT.PlayerState.PLAYING?zu():hr()}};document.addEventListener("keydown",l,{once:!0})}}},r=()=>{const o=bi(),a=Z.getIframe();if(o&&a&&document.activeElement!==a)try{a.focus()}catch{}};return Q_(),new Promise((o,a)=>{try{Z=new window.YT.Player(el,{videoId:i,playerVars:{autoplay:1,mute:0,controls:1,fs:1,rel:0,modestbranding:1,disablekb:0,origin:window.location.origin},events:{onReady:c=>{Wt=!0,e&&e(c),o(Z)},onStateChange:c=>{c.data===window.YT.PlayerState.ENDED&&s(!1),c.data===window.YT.PlayerState.PAUSED&&s(),c.data===window.YT.PlayerState.PLAYING&&r(),n&&n(c)},onError:c=>{console.error("YouTube player error:",c.data),a(new Error(`YouTube error: ${c.data}`))}}})}catch(c){a(c)}})}function qu(){if(Z){try{Co(),Z.destroy()}catch(t){console.warn("Error destroying YouTube player:",t)}Z=null,Wt=!1}}function zu(){Z&&Wt&&Z.playVideo()}function hr(){Z&&Wt&&Z.pauseVideo()}function T0(t){Z&&Wt&&Z.seekTo(t,!0)}function To(){return Z&&Wt?Z.getCurrentTime():0}function Gu(){return Z&&Wt?Z.getPlayerState():-1}const Qt={UNSTARTED:-1,ENDED:0,PLAYING:1,PAUSED:2,BUFFERING:3,CUED:5},ey=()=>{if(!fa())return!1;const t=ju();return t&&t.getVideoTracks().length>0&&t.getVideoTracks()[0].enabled&&t.getVideoTracks()[0].readyState==="live"};function S0(){return"pictureInPictureEnabled"in document&&typeof document.pictureInPictureEnabled=="boolean"&&document.pictureInPictureEnabled}function I0(){qn()||(ny(!0),w(Qe),w(yn),Ge.classList.remove("bottom"),Ge.classList.add("watch-mode"),il()?(w(Fe),D(lt)):(w(lt),w(ns),w(ut),D(Fe)),w(is),w(ts),D(jn),D(Ge),il()&&(w(me),rn(me),w(ce),Wu(ae)?rn(ce):S0()?ae.requestPictureInPicture().then(()=>{rn(ce)}).catch(t=>{console.warn("Failed to enter Picture-in-Picture:",t),Ks(ce),D(ce)}):(Ks(ce),D(ce))))}function k0(){qn()&&(w(jn),D(Fe),D(lt),D(ns),D(ut),D(is),D(ts),Ge.classList.remove("watch-mode"),Ge.classList.add("bottom"),D(Ge),ey()&&(Wu(ae)&&document.exitPictureInPicture().catch(t=>{console.error("Failed to exit Picture-in-Picture:",t)}),rn(ce),D(ce)),il()?(Ks(me),D(me)):(D(Qe),D(yn),rn(me),w(me)),ny(!1))}function So(){Bt.setMainContent("ytVideo"),I0()}function Is(){Bt.setMainContent("remoteStream"),k0()}let we=null,Ht=null,ty=!1,dt="none",ks=null,Ke=null;const qn=()=>ty,ny=t=>ty=t,pt=()=>dt,R0=t=>{["yt","url","file","none"].includes(t)?dt=t:console.warn("Invalid lastWatched platform:",t)};let Zt=!1,Rs=null,Ei=0,Xa=!1;async function Ci(t){if(!we)return;console.debug("Updating watch sync state, roomId:",we);const e=oa(we);try{await fi(e,{...t,updatedBy:Ht})}catch(n){console.error("Failed to update watch state:",n)}}function A0(t,e,n){if(!t)return;we=t,Ht=n;const i=oa(t),s=aa(t);Es(i,O0,t),Es(s,L0,t),B0()}function Ku(t){return typeof t=="string"&&t.startsWith("blob:")}async function N0(t,e){if(!we||!Ht)return!1;const n=aa(we);try{return await ne(n,{fileName:t,requestedBy:Ht,timestamp:Date.now()}),Ke&&clearTimeout(Ke),Ke=setTimeout(()=>{nl()},300*1e3),!0}catch(i){return console.error("Failed to create watch request:",i),!1}}async function P0(t){if(!we)return!1;const e=aa(we);try{await Xe(e)}catch(n){console.warn("Failed to remove watch request:",n)}return Ke&&(clearTimeout(Ke),Ke=null),await Ys(t)}async function nl(){if(!we)return;Ke&&(clearTimeout(Ke),Ke=null);const t=aa(we);try{await Xe(t)}catch(e){console.warn("Failed to cancel watch request:",e)}}function L0(t){const e=t.val();if(!e){Ke&&(clearTimeout(Ke),Ke=null);return}e.requestedBy!==Ht&&window.onFileWatchRequestReceived&&window.onFileWatchRequestReceived(e.fileName)}function O0(t){const e=t.val();e&&e.updatedBy!==Ht&&(Date.now()-Ei<500||(e.url&&e.url!==ks&&!Ku(e.url)&&D0(e.url),e.isYouTube?M0(e):$0(e)))}function D0(t){ks=t,tl(t)?(w(Re),iy(t),dt="yt"):(qu(),D(Re),F.src=t,dt="url"),So()}function M0(t){!Ss()||!b0()||(x0(t),F0(t))}function x0(t){const e=Gu(),n=e===Qt.PLAYING;if([Qt.BUFFERING,Qt.UNSTARTED].includes(e)){U0();return}Zt||(t.playing&&!n?(zu(),dt="yt"):!t.playing&&n&&(hr(),dt="yt"))}function F0(t){if(t.currentTime===void 0)return;const e=To();Math.abs(e-t.currentTime)>.3&&!Zt&&(T0(t.currentTime),setTimeout(()=>{t.playing?zu():hr(),dt="yt"},500))}function U0(){Zt=!0,clearTimeout(Rs),Rs=setTimeout(async()=>{Zt=!1;const t=Gu()===Qt.PLAYING;await Ci({playing:t,currentTime:To()})},700)}function $0(t){Ei=Date.now(),t.playing!==void 0&&(t.playing&&F.paused?F.play().catch(e=>console.warn("Play failed:",e)):!t.playing&&!F.paused&&F.pause()),t.currentTime!==void 0&&Math.abs(F.currentTime-t.currentTime)>1&&(F.currentTime=t.currentTime,t.playing?F.play().catch(n=>console.warn("Play failed:",n)):F.pause())}function B0(){const t=()=>{dt!=="file"&&(dt="url")};F.addEventListener("play",async()=>{!Ss()&&we&&(Ei=Date.now(),await Ci({playing:!0,currentTime:F.currentTime,isYouTube:!1})),t()}),F.addEventListener("pause",async()=>{F.seeking||(!Ss()&&we&&(Ei=Date.now(),console.log("[SYNC DEBUG] Local pause event:",{currentTime:F.currentTime}),await Ci({playing:!1,currentTime:F.currentTime,isYouTube:!1})),t())}),F.addEventListener("playing",()=>{Xa=!0}),F.addEventListener("pause",()=>{F.seeking||(Xa=!1)},!0),F.addEventListener("seeked",async()=>{!Ss()&&we&&(Ei=Date.now(),await Ci({currentTime:F.currentTime,playing:Xa,isYouTube:!1})),t()})}async function H0(t){if(!t)return!1;Ei=Date.now();const e=Ku(t);if(tl(t)){if(w(Re),!await iy(t))return!1;dt="yt"}else qu(),D(Re),F.src=t,dt=e?"file":"url";if(we){const n=oa(we);e?await ne(n,{playing:!1,currentTime:0,isYouTube:!1,updatedBy:Ht}):ne(n,{url:t,playing:!1,currentTime:0,isYouTube:tl(t),updatedBy:Ht})}return So(),!0}async function Ys(t){let e;if(t instanceof File){if(!t.type.startsWith("video/"))return console.warn("Invalid file type:",t.type),!1;e=URL.createObjectURL(t)}else if(typeof t=="string")e=t;else if(t?.url)e=t.url;else return console.warn("Invalid video source:",t),!1;ks=e;const n=await H0(e);return n||Ku(ks)&&t instanceof File&&(URL.revokeObjectURL(e),ks=null),n}async function iy(t){if(!Z_(t))return console.error("Invalid YouTube URL:",t),!1;try{return await C0({url:t,onReady:n=>{if(X_(!0),we){const i=oa(we);ne(i,{url:t,playing:!1,currentTime:0,isYouTube:!0,updatedBy:Ht})}},onStateChange:async n=>{if(!Ss())return;const s=n.data===Qt.PLAYING,r=n.data===Qt.PAUSED;if(n.data===Qt.BUFFERING){Zt=!0,Rs&&clearTimeout(Rs),Rs=setTimeout(async()=>{Zt=!1;const c=Gu()===Qt.PLAYING;await Ci({playing:c,currentTime:To()})},700);return}r&&Zt||!Zt&&(s||r)&&await Ci({playing:s,currentTime:To()})}}),!0}catch(n){return console.error("Failed to load YouTube video:",n),!1}}let Ti=!1,Tr=!1,Lf=null,Of=null,As=null;const il=()=>Ti,sy=()=>{if(!Ti){if(!ae||!fa()||ae.paused||ae.readyState<2){Tr||(Tr=!0,ae.addEventListener("playing",()=>{Tr=!1,sy()},{once:!0}));return}if(Tr=!1,Ti=!0,D(ce),D(me),Ks(me),w(Qe),w(yn),Fe.disabled=!0,Fe.classList.add("disabled"),lt.disabled=!1,lt.classList.remove("disabled"),ut.disabled=!1,ut.classList.remove("disabled"),fn.disabled=!1,fn.classList.remove("disabled"),As||(As=w0(Ge,{inactivityMs:2500,hideOnEsc:!0})),!Lf){const t=()=>{Ti&&(qn()?Ks(ce):rn(ce),D(ce))};ae.addEventListener("leavepictureinpicture",t),Lf=()=>ae.removeEventListener("leavepictureinpicture",t)}if(!Of){const t=()=>w(ce);ae.addEventListener("enterpictureinpicture",t),Of=()=>ae.removeEventListener("enterpictureinpicture",t)}}},V0=()=>{Ti&&(Ti=!1,Wu(ae)&&document.exitPictureInPicture().catch(()=>{}),rn(me),w(me),rn(ce),w(ce),Fe.disabled=!1,Fe.classList.remove("disabled"),lt.disabled=!0,lt.classList.add("disabled"),ut.disabled=!0,ut.classList.add("disabled"),fn.disabled=!0,fn.classList.add("disabled"),As&&(As(),As=null),qn()||(D(yn),D(Qe),D(Ge)))};function ry(){Bt.setView("connected"),sy()}function oy(){Bt.setView("lobby"),V0()}let ft=null,Df=null;function ay(t){Df=t,t.onconnectionstatechange=()=>{H("onconnectionstatechange:",t.connectionState),t.connectionState==="connected"?(ry(),Mu().catch(e=>console.warn("Failed to clear calling state on connect:",e)),ft&&(clearTimeout(ft),ft=null)):t.connectionState==="disconnected"?(ft&&clearTimeout(ft),ft=setTimeout(()=>{t===Df&&t.connectionState==="disconnected"&&_e.cleanupCall({reason:"connection_lost"}),ft=null},3e3)):t.connectionState==="failed"&&(ua(),ft&&(clearTimeout(ft),ft=null),_e.cleanupCall({reason:"connection_failed"}))},t.addEventListener("iceconnectionstatechange",e=>{H("ICE iceconnectionstatechange:",t.iceConnectionState),t.iceConnectionState==="failed"&&(console.warn("ICE connection failed, restarting ICE..."),t.restartIce())})}const Yu={iceServers:[{urls:"stun:stun.l.google.com:19302"}]},Qa=new WeakMap;function cy(t,e,n){Qa.has(t)||Qa.set(t,{});const i=Qa.get(t),s=e==="offer"?"lastOffer":"lastAnswer";return i[s]===n?!0:(i[s]=n,!1)}function ly(t,e){return t?e==="offer"?t.signalingState==="stable":t.signalingState==="have-local-offer"||t.signalingState==="stable":!1}function Ju(t,e){e.getTracks().forEach(n=>{t.addTrack(n,e)})}async function uy(t){const e=await t.createOffer();return await t.setLocalDescription(e),e}async function dy(t){const e=await t.createAnswer();return await t.setLocalDescription(e),e}async function hy(t,e,n){if(cy(t,e.type,e.sdp))return console.debug(`Ignoring duplicate ${e.type} - already processed`),!1;if(!ly(t,e.type))return console.warn(`Ignoring ${e.type} - unexpected signaling state:`,t.signalingState),!1;try{return await t.setRemoteDescription(new RTCSessionDescription(e)),n(t),console.debug(`Remote description set (${e.type})`),!0}catch(i){return console.error(`Failed to set remote description (${e.type}):`,i),!1}}function fy(){return Math.random().toString(36).substring(2,9)}const W0=Object.freeze(Object.defineProperty({__proto__:null,addLocalTracks:Ju,createAnswer:dy,createOffer:uy,generateRoomId:fy,isDuplicateSdp:cy,isValidSignalingState:ly,rtcConfig:Yu,setRemoteDescription:hy},Symbol.toStringTag,{value:"Module"}));async function j0({localStream:t,remoteVideoEl:e,mutePartnerBtn:n,setupRemoteStream:i,setupWatchSync:s,targetRoomId:r=null}){if(!t)return{success:!1};const o=new RTCPeerConnection(Yu),a="initiator",c=r||fy(),l=ge();Ju(o,t);const u=o.createDataChannel("files");if(!i(o,e,n))return console.error("Error setting up remote stream"),o.close(),{success:!1};Ou(o,a,c),ay(o);const h=await uy(o);await se.createNewRoom(h,l,c),s(c,a,l);const f=`${window.location.origin}${window.location.pathname}?room=${c}`;return{success:!0,pc:o,roomId:c,roomLink:f,dataChannel:u,role:a}}async function q0({roomId:t,localStream:e,remoteVideoEl:n,mutePartnerBtn:i,setupRemoteStream:s,setupWatchSync:r,onMessagesUIReady:o=null}){if(!e)return{success:!1};if(!t)return{success:!1};const a=await se.checkRoomStatus(t);if(!a.exists)return{success:!1};if(!a.hasMembers)return{success:!1};let c;try{c=await se.getRoomData(t)}catch(m){return H("Error: "+m.message),{success:!1}}const l=c.offer;if(!l)return{success:!1};const u=new RTCPeerConnection(Yu),d="joiner",h=ge();Ju(u,e);let f=null;if(u.ondatachannel=m=>{f=m.channel,H("[Call Flow] DataChannel received by joiner",{label:f.label})},!s(u,n,i))return console.error("Error setting up remote stream for joiner"),u.close(),{success:!1};Ou(u,d,t),ay(u),await hy(u,l,Du);const _=await dy(u);try{await se.saveAnswer(t,_)}catch(m){return console.error("Failed to save answer to Firebase:",m),u.close(),{success:!1}}return r(t,d,h),await se.joinRoom(t,h),{success:!0,pc:u,roomId:t,dataChannel:f,role:d}}class z0{async sendFile(e,n){throw new Error("FileTransport.sendFile() must be implemented by subclass")}onFileReceived(e){throw new Error("FileTransport.onFileReceived() must be implemented by subclass")}onReceiveProgress(e){throw new Error("FileTransport.onReceiveProgress() must be implemented by subclass")}isReady(){throw new Error("FileTransport.isReady() must be implemented by subclass")}cleanup(){throw new Error("FileTransport.cleanup() must be implemented by subclass")}}const G0={FILE_CONFIG:{NETWORK_CHUNK_SIZE:65536}};async function K0(t){if(t instanceof ArrayBuffer)return t;if(t instanceof Blob)try{return await t.arrayBuffer()}catch(e){return console.error("[ChunkProcessor] Blob conversion failed:",e),null}else if(t instanceof Uint8Array||ArrayBuffer.isView(t))try{const e=t instanceof Uint8Array?t:new Uint8Array(t.buffer,t.byteOffset,t.byteLength),n=new ArrayBuffer(e.length);return new Uint8Array(n).set(e),n}catch(e){return console.error("[ChunkProcessor] TypedArray conversion failed:",e),null}else return console.error("[ChunkProcessor] Unknown data type:",Object.prototype.toString.call(t)),null}function Y0(t){try{if(t.byteLength<4)return console.error("[ChunkProcessor] Invalid embedded packet - too small:",t.byteLength),null;const i=new DataView(t).getUint32(0,!0),s=4+i;if(t.byteLength<s)return console.error("[ChunkProcessor] Incomplete embedded packet - expected:",s,"got:",t.byteLength),null;const r=new Uint8Array(t,4,i),o=new TextDecoder().decode(r),a=JSON.parse(o),c=4+i,l=t.slice(c);return{chunkMeta:a,chunkData:l}}catch(e){return console.error("[ChunkProcessor] Failed to parse embedded packet:",e),null}}const J0=1024;function X0(t,e,n){let i=0,s=0;const r=[];t.forEach((c,l)=>{c instanceof ArrayBuffer?(s++,i+=c.byteLength):r.push(l)});const o=e-i;return{isComplete:s===n&&Math.abs(o)<=J0,validChunks:s,totalSize:i,missingChunks:r,sizeDifference:o}}const Za=G0.FILE_CONFIG.NETWORK_CHUNK_SIZE,Mf=9e3*1024*1024;class Q0{constructor(e){this.dataChannel=e,this.receivedChunks=new Map,this.fileMetadata=new Map,this.onFileError=null,this.onReceiveProgress=null}async sendFile(e,n){if(e.size>Mf)throw new Error(`File too large (max ${Mf/(1024*1024)} MB)`);if(this.dataChannel.readyState!=="open")throw new Error("DataChannel not ready");const i=`${e.name}-${e.size}-${Date.now()}`,s=Math.ceil(e.size/Za);this.dataChannel.send(JSON.stringify({type:"FILE_META",fileId:i,name:e.name,size:e.size,mimeType:e.type,totalChunks:s}));for(let r=0;r<s;r++){const o=r*Za,a=Math.min(o+Za,e.size),c=await e.slice(o,a).arrayBuffer(),l={type:"FILE_CHUNK",fileId:i,chunkIndex:r,totalChunks:s},u=new TextEncoder().encode(JSON.stringify(l)),d=new ArrayBuffer(4+u.length+c.byteLength),h=new Uint8Array(d);for(new DataView(d).setUint32(0,u.length,!0),h.set(u,4),h.set(new Uint8Array(c),4+u.length),this.dataChannel.send(d),n&&n((r+1)/s);this.dataChannel.bufferedAmount>256*1024;)await new Promise(p=>setTimeout(p,10))}}async handleMessage(e){if(typeof e=="string"){const n=JSON.parse(e);n.type==="FILE_META"&&(this.fileMetadata.set(n.fileId,n),this.receivedChunks.set(n.fileId,[]),this.onFileMetaReceived?.(n))}else{const n=await K0(e);if(!n){console.error("[FileTransfer] Failed to convert binary data to ArrayBuffer");return}const i=Y0(n);if(!i){console.error("[FileTransfer] Failed to parse embedded chunk packet");return}const{chunkMeta:s,chunkData:r}=i,o=this.receivedChunks.get(s.fileId);if(!o){console.error("[FileTransfer] Received chunk for unknown file:",s.fileId);return}if(o[s.chunkIndex]=r,this.onReceiveProgress){const a=o.filter(c=>c).length;this.onReceiveProgress(a/s.totalChunks)}o.filter(a=>a).length===s.totalChunks&&this.assembleFile(s.fileId)}}assembleFile(e){const n=this.fileMetadata.get(e),i=this.receivedChunks.get(e),s=X0(i,n.size,n.totalChunks);if(!s.isComplete){console.error("[FileTransfer] File assembly failed:",{fileId:e,fileName:n.name,...s}),this.onFileError&&this.onFileError({fileName:n.name,reason:"incomplete",details:s});return}const r=new Blob(i,{type:n.mimeType}),o=new File([r],n.name,{type:n.mimeType});this.onFileReceived?.(o),this.receivedChunks.delete(e),this.fileMetadata.delete(e)}}class Z0 extends z0{constructor(e){if(super(),!e)throw new Error("DataChannelFileTransport requires a DataChannel");this.dataChannel=e,this.fileTransfer=new Q0(e),this._setupMessageHandling()}_setupMessageHandling(){this.dataChannel.onmessage=e=>{if(typeof e.data=="string")try{const n=JSON.parse(e.data);if(n.type==="FILE_META"||n.type==="FILE_CHUNK"){this.fileTransfer.handleMessage(e.data);return}}catch{}else this.fileTransfer.handleMessage(e.data)}}async sendFile(e,n){if(!this.isReady())throw new Error("DataChannel not ready");return this.fileTransfer.sendFile(e,n)}onFileReceived(e){if(typeof e!="function")throw new Error("onFileReceived callback must be a function");this.fileTransfer.onFileReceived=e}onReceiveProgress(e){if(typeof e!="function")throw new Error("onReceiveProgress callback must be a function");this.fileTransfer.onReceiveProgress=e}isReady(){return this.dataChannel&&this.dataChannel.readyState==="open"}cleanup(){this.dataChannel&&(this.dataChannel.onmessage=null),this.fileTransfer&&(this.fileTransfer.onFileReceived=null,this.fileTransfer.onFileMetaReceived=null),this.dataChannel=null,this.fileTransfer=null}}function Io(t,e,n={}){if(!t||typeof e!="function")throw new Error("closeOnClickOutside: valid element and onClose callback required");const{ignore:i=[],esc:s=!0,events:r=["mousedown","touchstart"]}=n,o=Array.isArray(i)?i.filter(Boolean):[],a=l=>{try{const u=l.target;if(t.contains(u))return;for(const d of o)if(d&&d.contains&&d.contains(u)||d===u)return;e(l)}catch(u){console.error("closeOnClickOutside handler error:",u)}},c=l=>{s&&l.key==="Escape"&&e(l)};return r.forEach(l=>document.addEventListener(l,a,{passive:!0})),s&&document.addEventListener("keydown",c),function(){r.forEach(u=>document.removeEventListener(u,a,{passive:!0})),s&&document.removeEventListener("keydown",c)}}const eL=t=>String(t).replace(/[&<>"'`=\/]/g,n=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;","`":"&#x60;","=":"&#x3D;","/":"&#x2F;"})[n]),tL=(t,e)=>t.replace(/\$\{([^}]+)\}/g,(n,i)=>{const s=i.trim(),r=s.split(".").reduce((a,c)=>a?.[c],e);return r==null?"":s.endsWith("Html")?String(r):eL(String(r))}),nL=(t,e={})=>{const n=document.createElement("template");return n.innerHTML=tL(t,e),n.content.cloneNode(!0)},iL=(t,e)=>{const n=[];let i=e;for(;i&&i!==t;){const s=i.parentElement;if(!s)break;const r=Array.prototype.indexOf.call(s.children,i);n.push(r),i=s}return n.reverse()},sL=(t,e)=>e.reduce((n,i)=>n&&n.children?n.children[i]:null,t),rL=t=>Array.from(t.querySelectorAll("input, textarea, select")).map(e=>({name:e.name,id:e.id,path:iL(t,e),value:e.value,checked:e.checked,selectionStart:e.selectionStart,selectionEnd:e.selectionEnd,wasFocused:document.activeElement===e})),oL=t=>typeof CSS<"u"&&typeof CSS.escape=="function"?CSS.escape(String(t)):String(t).replace(/[^_a-zA-Z0-9-]/g,e=>"\\"+e),aL=(t,e)=>{e.forEach(n=>{let i=null;if(n.name){const s=t.querySelectorAll("input[name], textarea[name], select[name]");for(const r of s)if(r.getAttribute("name")===n.name){i=r;break}}else if(n.id)try{i=t.querySelector("#"+oL(n.id))}catch{i=t.querySelector(`#${n.id}`)}else n.path&&(i=sL(t,n.path));if(i){if(i.value=n.value,n.checked!==void 0&&(i.checked=n.checked),n.selectionStart!=null&&i.setSelectionRange)try{i.setSelectionRange(n.selectionStart,n.selectionEnd)}catch{}if(n.wasFocused)try{i.focus()}catch{}}})},cL=t=>Array.from(t.querySelectorAll("video, audio")).map(e=>({src:e.currentSrc||e.src,currentTime:e.currentTime,paused:e.paused,volume:e.volume,playbackRate:e.playbackRate,muted:e.muted})),lL=(t,e)=>{const n=t.querySelectorAll("video, audio");for(const i of n)if(i.currentSrc===e||i.src===e)return i;return null},uL=(t,e)=>{e.forEach(n=>{if(!n.src)return;const i=lL(t,n.src);i&&(i.currentTime=n.currentTime,i.volume=n.volume,i.playbackRate=n.playbackRate,i.muted=n.muted,n.paused||i.play().catch(()=>{}))})},dL=()=>document.readyState!=="loading",Xu=({initialProps:t={},template:e="",handlers:n={},parent:i=null,containerTag:s="div",className:r="",onMount:o=null,onCleanup:a=null,autoAppend:c=!0,preserveInputState:l=!0}={})=>{if(!dL())return console.error("createComponent: DOM must be ready before creating components."),null;const u=document.createElement(s);r&&(u.className=r);let d={...t};const h=new Set,f=/\$\{([^}]+)\}/g;let p;for(;(p=f.exec(e))!==null;){const S=p[1].trim().split(".")[0];h.add(S)}const _=[],m=[],R={},M=()=>{let S=[],X=[];l&&(S=rL(u),X=cL(u)),u.textContent="";const Ze=nL(e,d);u.appendChild(Ze),Object.keys(n).forEach(Ue=>{const Se=u.querySelectorAll(`[onclick="${Ue}"]`),wn=n[Ue];Se.forEach(ei=>{ei.removeAttribute("onclick"),typeof wn=="function"&&ei.addEventListener("click",wn)})}),l&&(aL(u,S),uL(u,X)),_.forEach(Ue=>Ue({...d}))},$=S=>{if(!Array.isArray(S)||S.length===0)return;const X={props:{...d},changedKeys:S};m.forEach(Ze=>Ze(X))};for(const S of Object.keys(t))R[S]=[],Object.defineProperty(u,S,{get(){return d[S]},set(X){d[S]!==X&&(d[S]=X,h.has(S)&&M(),R[S].forEach(Ze=>Ze(X)),$([S]))},configurable:!0,enumerable:!0});if(u.update=S=>{let X=!1,Ze=!1;const Ue=[];for(const Se in S)S[Se]!==d[Se]&&(d[Se]=S[Se],h.has(Se)&&(Ze=!0),R[Se]&&R[Se].forEach(wn=>wn(S[Se])),X=!0,Ue.push(Se));X&&Ze&&M(),Ue.length>0&&$(Ue)},u.onRender=S=>{typeof S=="function"&&_.push(S)},u.onAnyPropUpdated=S=>{typeof S=="function"&&m.push(S)},u.onPropUpdated=(S,X)=>{typeof X=="function"&&R[S]&&R[S].push(X)},u.dispose=()=>{a&&(Array.isArray(a)?a.forEach(S=>{typeof S=="function"&&S()}):typeof a=="function"&&a()),_.length=0,m.length=0;for(const S in R)R[S].length=0;u.remove()},M(),c&&i&&!i.contains(u)&&i.appendChild(u),typeof o=="function")try{o(u)}catch(S){VP("[createComponent]: Error in onMount handler of component",S)}return u};function py({parent:t,onToggle:e,icon:n="💬",initialUnreadCount:i=0,id:s=null,startHidden:r=!1}={}){if(!t)return console.error("createMessageToggle: parent element is required"),null;if(typeof e!="function")return console.error("createMessageToggle: onToggle callback is required"),null;const o=Xu({initialProps:{unreadCount:i},template:`
      <div class="messages-toggle-btn">
        <button onclick="handleToggle">
          ${n}
          <span class="notification-badge">
            \${unreadCount}
          </span>
        </button>
      </div>
    `,handlers:{handleToggle:c=>{c.preventDefault(),c.stopPropagation(),e()}},className:"messages-toggle-container"+(r?" hidden":""),autoAppend:!1});if(s&&o&&typeof s=="string")try{o.id=s}catch(c){console.warn("createMessageToggle: failed to set id on toggleContainer",c)}let a=o.querySelector(".notification-badge");return a&&(a.style.display=i>0?"flex":"none"),o.onPropUpdated("unreadCount",c=>{const l=o.querySelector(".notification-badge");if(l&&(l.style.display=c>0?"flex":"none"),c>0){const u=o.querySelector(".messages-toggle-btn");u&&(u.classList.add("new-message"),setTimeout(()=>{u.classList.remove("new-message")},4e3))}}),t.appendChild(o),{element:o,setUnreadCount(c){let l=Number(c);(!Number.isFinite(l)||l<0)&&(l=0),o.unreadCount=l},clearBadge(){this.setUnreadCount(0)},cleanup(){if(o&&typeof o.dispose=="function")try{o.dispose()}catch(c){console.warn("createMessageToggle: error during dispose()",c)}if(o&&o.parentNode)try{o.parentNode.removeChild(o)}catch{}}}}function xf(t=!1){if(typeof window>"u"||typeof navigator>"u")return!1;const e=navigator.userAgent||navigator.vendor||"",n=/iPad|iPhone|iPod/.test(e),i=/Macintosh/.test(e)&&typeof navigator.maxTouchPoints=="number"&&navigator.maxTouchPoints>1,s=(n||i)&&!window.MSStream,r=/Android/i.test(e),o=s||r;return t&&console.table({"User Agent":e,isAndroid:r,isiOSUA:n,isiPadOSDesktopUA:i,isMobileDevice:o}),o}function hL(t){if(!t)return null;let e=String(t).trim();if(!e)return null;/^[a-zA-Z][a-zA-Z0-9+.-]*:\/\//.test(e)||(e="http://"+e);let n="",i=null;try{i=new URL(e,window.location&&window.location.origin?window.location.origin:void 0),n=i.protocol}catch{const o=e.match(/^([a-zA-Z][a-zA-Z0-9+.-]*:)/);n=o?o[1].toLowerCase():""}if(i&&!i.hostname)return null;const s=n.toLowerCase();return s!=="http:"&&s!=="https:"?null:e}function fL(t){const e=document.createDocumentFragment();if(!t)return e;const n=/((?:https?:\/\/|www\.)[^\s<>]+\.[^\s<>]+)/g;let i=0,s;for(;(s=n.exec(t))!==null;){const r=s[0],o=s.index;o>i&&e.appendChild(document.createTextNode(t.slice(i,o)));const a=r.replace(/[.,!?:;\)\]\}]+$/g,""),c=r.slice(a.length),l=hL(a);if(!l)e.appendChild(document.createTextNode(r));else{const u=document.createElement("a");u.href=l,u.textContent=a,u.target="_blank",u.rel="noopener noreferrer",u.className="message-link",e.appendChild(u),c&&e.appendChild(document.createTextNode(c))}i=o+r.length}return i<t.length&&e.appendChild(document.createTextNode(t.slice(i))),e}const sl={heart:"❤️"},li={doubleTapDelay:300,longPressDelay:500,defaultReaction:"heart"};function Ff(t){return sl[t]||sl.heart}function pL(){return{...sl}}class gL{constructor(){this.reactions=new Map}addReaction(e,n=li.defaultReaction){if(!e)throw new Error("messageId is required");this.reactions.has(e)||this.reactions.set(e,{});const i=this.reactions.get(e);return i[n]=(i[n]||0)+1,this.getReactions(e)}removeReaction(e,n=li.defaultReaction){if(!e)throw new Error("messageId is required");const i=this.reactions.get(e);return i?(i[n]>0&&(i[n]--,i[n]===0&&delete i[n]),Object.keys(i).length===0&&this.reactions.delete(e),this.getReactions(e)):{}}getReactions(e){return this.reactions.get(e)||{}}hasReactions(e){const n=this.reactions.get(e);return!!(n&&Object.keys(n).length>0)}getReactionCount(e,n){const i=this.reactions.get(e);return i&&i[n]||0}clearReactions(e){this.reactions.delete(e)}clearAll(){this.reactions.clear()}}class mL{constructor(e){this.reactionManager=e,this.doubleTapTimers=new Map,this.longPressTimers=new Map,this.activePicker=null}enableDoubleTap(e,n,i){if(!e||!n){console.warn("[ReactionUI] Invalid parameters for enableDoubleTap");return}const s="ontouchstart"in window,r=s?"touchend":"click",o=l=>{if(l.target.tagName==="A"||l.target.tagName==="BUTTON")return;const u=Date.now(),d=this.doubleTapTimers.get(e);d&&u-d<li.doubleTapDelay?(l.preventDefault(),this.handleDoubleTap(e,n,i),this.doubleTapTimers.delete(e)):this.doubleTapTimers.set(e,u)},a=l=>{if(l.target.tagName==="A"||l.target.tagName==="BUTTON")return;const u=setTimeout(()=>{this.showPicker(e,n,i)},li.longPressDelay);this.longPressTimers.set(e,u)},c=()=>{const l=this.longPressTimers.get(e);l&&(clearTimeout(l),this.longPressTimers.delete(e))};e.addEventListener(r,o,{passive:!1}),s?(e.addEventListener("touchstart",a,{passive:!0}),e.addEventListener("touchend",c,{passive:!0}),e.addEventListener("touchmove",c,{passive:!0}),e.addEventListener("touchcancel",c,{passive:!0})):(e.addEventListener("mousedown",a),e.addEventListener("mouseup",c),e.addEventListener("mouseleave",c)),e._reactionCleanup=()=>{e.removeEventListener(r,o),s?(e.removeEventListener("touchstart",a),e.removeEventListener("touchend",c),e.removeEventListener("touchmove",c),e.removeEventListener("touchcancel",c)):(e.removeEventListener("mousedown",a),e.removeEventListener("mouseup",c),e.removeEventListener("mouseleave",c)),this.doubleTapTimers.delete(e),c()}}handleDoubleTap(e,n,i){const s=this.reactionManager.addReaction(n,li.defaultReaction);this.renderReactions(e,n,s),this.showReactionAnimation(e,li.defaultReaction),i&&i(s)}renderReactions(e,n,i){let s=e.querySelector(".message-reactions");if(!s){s=document.createElement("div"),s.className="message-reactions";const o=e.querySelector(".message-text");o?o.appendChild(s):e.appendChild(s)}if(s.innerHTML="",!Object.values(i).some(o=>o>0)){s.style.display="none";return}s.style.display="";for(const[o,a]of Object.entries(i))if(a>0){const c=this.createReactionBadge(o);s.appendChild(c)}}createReactionBadge(e){const n=document.createElement("span");return n.className="reaction-badge",n.dataset.reactionType=e,n.textContent=Ff(e),n}showReactionAnimation(e,n){const i=Ff(n),s=document.createElement("div");s.className="reaction-animation",s.textContent=i;const r=e.getBoundingClientRect();s.style.position="fixed",s.style.left=`${r.left+r.width/2}px`,s.style.top=`${r.top+r.height/2}px`,document.body.appendChild(s),setTimeout(()=>{s.remove()},1e3)}showPicker(e,n,i){this.hidePicker();const s=document.createElement("div");s.className="reaction-picker";const r=pL();for(const[c,l]of Object.entries(r)){const u=document.createElement("button");u.type="button",u.className="reaction-picker-btn",u.textContent=l,u.dataset.reactionType=c,u.addEventListener("click",d=>{d.stopPropagation();const h=this.reactionManager.addReaction(n,c);this.renderReactions(e,n,h),this.showReactionAnimation(e,c),i&&i(h),this.hidePicker()}),s.appendChild(u)}const o=e.getBoundingClientRect();s.style.position="fixed",s.style.left=`${o.left+o.width/2}px`,s.style.top=`${o.top-8}px`,document.body.appendChild(s),this.activePicker=s;const a=c=>{s.contains(c.target)||(this.hidePicker(),document.removeEventListener("click",a,!0))};setTimeout(()=>{document.addEventListener("click",a,!0)},0)}hidePicker(){this.activePicker&&(this.activePicker.remove(),this.activePicker=null)}cleanup(e){e._reactionCleanup&&e._reactionCleanup()}}function _L(){const t=document.createElement("div");t.innerHTML=`
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
  `,document.body.appendChild(t);const e=t.querySelector("#messages-box"),n=t.querySelector("#messages"),i=t.querySelector("#messages-form"),s=t.querySelector("#messages-input");"virtualKeyboard"in navigator&&(navigator.virtualKeyboard.overlaysContent=!0);const r=CSS.supports?.("field-sizing","content");let o=null;if(s&&s.tagName==="TEXTAREA"&&!r){const a=()=>{s.style.height="auto",s.style.height=`${s.scrollHeight}px`};s.addEventListener("input",a,{passive:!0}),o=()=>{s.style.height=""},requestAnimationFrame(a)}return{messagesBoxContainer:t,messagesBox:e,messagesMessages:n,messagesForm:i,messagesInput:s,resetInputHeight:o}}const yL=CSS.supports?.("position-anchor: --msg-toggle")&&CSS.supports?.("right: anchor(right)")&&CSS.supports?.("bottom: anchor(top)");function wL(t){const e=t.getBoundingClientRect();return e.top>=0&&e.left>=0&&e.bottom<=window.innerHeight&&e.right<=window.innerWidth}function vL(){let t=!1,e=null,n=null,i=!1,s=new Map;const r=new gL,o=new mL(r),a=document.querySelector(".top-bar .top-right-menu")||document.querySelector(".top-right-menu"),c=py({parent:a,onToggle:()=>va(),icon:"💬",initialUnreadCount:0,id:"main-messages-toggle-btn",startHidden:!0});if(!c)return console.error("Messages UI: failed to initialize message toggle; aborting messages UI initialization."),null;const l=c.element,{messagesBoxContainer:u,messagesBox:d,messagesMessages:h,messagesForm:f,messagesInput:p,resetInputHeight:_}=_L();if(!l||!d||!h||!f||!p)return console.error("Messages UI elements not found."),null;const m=document.getElementById("attach-file-btn"),R=document.getElementById("file-input"),M=f.querySelector('button[type="submit"]');w(m),m.addEventListener("click",()=>{R.click()}),R.addEventListener("change",async v=>{const k=v.target.files[0];if(!k||!n){n||console.warn("[MessagesUI] FileTransfer not initialized");return}const N=M.textContent;M.textContent="Sending...";try{await n.sendFile(k,x=>{M.textContent=`${Math.round(x*100)}%`}),k.type.startsWith("video/")&&s.set(k.name,k),be(`📎 Sent: ${k.name}`,{isSentByMe:!0})}catch(x){console.error("[MessagesUI] File send failed:",x),be("❌ Failed to send file")}finally{M.textContent=N,R.value=""}});async function $(v){return new Promise(k=>{const N=document.createElement("div");N.className="file-action-overlay",N.style.cssText=`
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
      `;const x=document.createElement("div");x.className="file-action-prompt",x.style.cssText=`
        background: var(--bg-primary, #1a1a1a);
        border: 1px solid var(--border-color, #333);
        border-radius: 12px;
        padding: 24px;
        max-width: 400px;
        width: 90%;
        box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);
      `,x.innerHTML=`
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
      `,N.appendChild(x),document.body.appendChild(N);const J=x.querySelector("#file-name-display");J.textContent=v;const V=x.querySelector("#download-file-btn"),de=x.querySelector("#watch-together-btn");V.addEventListener("mouseenter",()=>{V.style.background="var(--bg-hover, #333)"}),V.addEventListener("mouseleave",()=>{V.style.background="var(--bg-secondary, #2a2a2a)"}),de.addEventListener("mouseenter",()=>{de.style.opacity="0.9"}),de.addEventListener("mouseleave",()=>{de.style.opacity="1"}),V.addEventListener("click",()=>{N.remove(),k("download")}),de.addEventListener("click",()=>{N.remove(),k("watch")}),N.addEventListener("click",ss=>{ss.target===N&&(N.remove(),k("download"))})})}async function S(v){return new Promise(k=>{const N=document.createElement("div");N.className="watch-request-overlay",N.style.cssText=`
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
      `;const x=document.createElement("div");x.className="watch-request-prompt",x.style.cssText=`
        background: var(--bg-primary, #1a1a1a);
        border: 1px solid var(--border-color, #333);
        border-radius: 12px;
        padding: 24px;
        max-width: 400px;
        width: 90%;
        box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);
      `,x.innerHTML=`
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
      `,N.appendChild(x),document.body.appendChild(N);const J=x.querySelector("#watch-request-filename");J.textContent=v;const V=x.querySelector("#decline-watch-btn"),de=x.querySelector("#accept-watch-btn");V.addEventListener("mouseenter",()=>{V.style.background="var(--bg-hover, #333)"}),V.addEventListener("mouseleave",()=>{V.style.background="var(--bg-secondary, #2a2a2a)"}),de.addEventListener("mouseenter",()=>{de.style.opacity="0.9"}),de.addEventListener("mouseleave",()=>{de.style.opacity="1"}),V.addEventListener("click",()=>{N.remove(),k(!1)}),de.addEventListener("click",()=>{N.remove(),k(!0)}),N.addEventListener("click",ss=>{ss.target===N&&(N.remove(),k(!1))})})}window.onFileWatchRequestReceived=async v=>{const k=s.get(v);if(!k){be(`❌ File not available to watch together: ${v}`),await nl();return}be(`🎬 Partner wants to watch: ${v}`),await S(v)?(be("✅ Joining watch together..."),await P0(k)||be("❌ Failed to load video")):(be("❌ Declined watch together request"),await nl())};function X(){if(!l||!d||d.classList.contains("hidden"))return;const v=l.getBoundingClientRect(),k=d.getBoundingClientRect(),N=8;let x=v.top-k.height-N;x<8&&(x=v.bottom+N);let J=v.left+v.width/2-k.width/2;const V=window.innerWidth-k.width-8;J<8&&(J=8),J>V&&(J=V),d.style.top=`${Math.round(x)}px`,d.style.left=`${Math.round(J)}px`}function Ze(){t||(t=!0,window.addEventListener("resize",X,{passive:!0}),window.addEventListener("scroll",X,{passive:!0}),window.addEventListener("orientationchange",X,{passive:!0}))}function Ue(){t&&(t=!1,window.removeEventListener("resize",X),window.removeEventListener("scroll",X),window.removeEventListener("orientationchange",X))}let Se=null;const wn=new MutationObserver(v=>{v.forEach(k=>{k.type==="attributes"&&k.attributeName==="class"&&(d.classList.contains("hidden")||(c.clearBadge(),e?.toggle&&e.toggle.clearBadge()))})});wn.observe(d,{attributes:!0});function ei(){return!d.classList.contains("hidden")}function wa(){return document.activeElement===p}function Jy(){wa()||p.focus()}function Xy(){wa()&&p.blur()}function va(){d.classList.toggle("hidden"),ei()?(xf()||p.focus(),yL?requestAnimationFrame(()=>{wL(d)||(X(),Ze())}):(X(),Ze()),ud()):(document.activeElement===p&&p.blur(),Ue(),d.style.top="",d.style.left="",d.style.bottom="",d.style.right="")}xf()||(Se=Io(d,()=>{w(d),Ue(),d.style.top="",d.style.left="",d.style.bottom="",d.style.right=""},{ignore:[c.element],esc:!0}));function Qy(){D(c.element)}function ld(){w(c.element)}const ba=new Map;function be(v,k={}){const{isSentByMe:N,senderDisplay:x,fileDownload:J,messageId:V,reactions:de}=k,ss=x??(N===!0?"Me":""),et=document.createElement("p");N===!0?et.classList.add("message-local"):N===!1&&et.classList.add("message-remote");const pr=document.createElement("span");pr.className="sender-avatar"+(N===!0?" sender-avatar--me":""),pr.textContent=ss,pr.setAttribute("aria-hidden","true");const rs=document.createElement("span");if(rs.className="message-text",!x&&typeof N>"u"&&et.classList.add("message-system"),J){const{fileName:ht,url:ti}=J,ni=v.split(ht)[0];ni&&rs.appendChild(document.createTextNode(ni));const Et=document.createElement("a");Et.textContent=ht,Et.href=ti,Et.download=ht,Et.style.cursor="pointer",Et.style.textDecoration="underline",Et.addEventListener("click",()=>{setTimeout(()=>URL.revokeObjectURL(ti),100)}),rs.appendChild(Et)}else{const ht=fL(v);rs.appendChild(ht)}if(J&&et.classList.add("message-system"),et.appendChild(pr),et.appendChild(rs),typeof N<"u"&&!J&&V){if(et.dataset.messageId=V,ba.set(V,et),de&&Object.keys(de).length>0){const ht={};for(const[ti,ni]of Object.entries(de))ht[ti]=ni.length;o.renderReactions(et,V,ht)}o.enableDoubleTap(et,V,ht=>{if(e)for(const[ti,ni]of Object.entries(ht))ni>0&&e.addReaction(V,ti).catch(Et=>{console.warn("[MessagesUI] Failed to sync reaction:",Et)})})}h.appendChild(et),ud()}let vn=null;function ud(){h&&(vn!==null&&cancelAnimationFrame(vn),vn=requestAnimationFrame(()=>{h.scrollTop=h.scrollHeight,vn=null}))}function Zy(v,{isUnread:k=!0,senderDisplay:N="U",messageId:x,reactions:J}={}){if(be(v,{isSentByMe:!1,senderDisplay:N,messageId:x,reactions:J}),bo(d)&&k){const V=c.element.unreadCount||0;c.setUnreadCount(V+1)}}function dd(){const v=p.value.trim();v&&(e?(e.send(v),p.value="",_&&_()):console.warn("[MessagesUI] No active session to send message"))}f.addEventListener("submit",v=>{v.preventDefault(),dd()}),p.addEventListener("keydown",v=>{v.key==="Enter"&&!v.shiftKey&&(v.preventDefault(),dd())});const ew=()=>{const v=document.activeElement;return v&&(v.tagName==="INPUT"||v.tagName==="TEXTAREA"||v.isContentEditable)},hd=v=>{(v.key==="m"||v.key==="M")&&!ei()&&!ew()&&(v.preventDefault(),va())};document.addEventListener("keydown",hd);function Ea(){vn!==null&&(cancelAnimationFrame(vn),vn=null),h.innerHTML="",h.scrollTop=0}function tw(v){e!==null&&e!==v&&Ea(),e=v}function nw(){return e}function iw(v){n=v,n?(D(m),n.onFileReceived=async k=>{const N=URL.createObjectURL(k);if(k.type.startsWith("video/"))if(await $(k.name)==="watch"){if(be(`📹 Received video: ${k.name}`,{isSentByMe:!1}),be("🎬 Requesting partner to join watch together..."),!await Ys(k)){be("❌ Failed to load video");return}const V=await N0(k.name);be(V?"⏳ Waiting for partner to join...":"❌ Failed to send watch request")}else{const J=document.createElement("a");J.href=N,J.download=k.name,J.click(),setTimeout(()=>URL.revokeObjectURL(N),1e3),be(`📎 Downloaded: ${k.name}`)}else be(`📎 Received: ${k.name}`,{isSentByMe:!1,fileDownload:{fileName:k.name,url:N}});if(bo(d)){const x=c.element.unreadCount||0;c.setUnreadCount(x+1)}i&&(M.textContent="Send",i=!1)},n.onReceiveProgress=k=>{i=!0,M.textContent=`${Math.round(k*100)}%`}):w(m)}function sw(){Ea(),e=null,n=null,i=!1,ld(),w(d),c.clearBadge(),p.value="",_&&_(),M&&(M.textContent="Send"),w(m),d.style.top="",d.style.left="",d.style.bottom="",d.style.right="",Ue(),ba.clear(),r.clearAll()}function rw(v,k){const N=ba.get(v);if(!N)return;const x={};for(const[J,V]of Object.entries(k||{}))x[J]=V.length;r.clearReactions(v);for(const[J,V]of Object.entries(x))for(let de=0;de<V;de++)r.addReaction(v,J);o.renderReactions(N,v,x)}function ow(){if(c&&c.cleanup(),Ue(),typeof Se=="function")try{Se()}catch(v){console.error("Error removing messages box outside click handler:",v)}wn.disconnect(),document.removeEventListener("keydown",hd),u&&u.parentNode&&u.parentNode.removeChild(u)}return{appendChatMessage:be,receiveMessage:Zy,updateMessageReactions:rw,isMessagesUIOpen:ei,toggleMessages:va,showMessagesToggle:Qy,hideMessagesToggle:ld,isMessageInputFocused:wa,focusMessageInput:Jy,unfocusMessageInput:Xy,setSession:tw,getCurrentSession:nw,clearMessages:Ea,setFileTransfer:iw,reset:sw,cleanup:ow}}const Ee=vL();class bL{constructor(){this.listeners=new Map}on(e,n){this.listeners.has(e)||this.listeners.set(e,new Set),this.listeners.get(e).add(n)}off(e,n){this.listeners.has(e)&&this.listeners.get(e).delete(n)}emit(e,n){if(this.listeners.has(e))for(const i of Array.from(this.listeners.get(e)))try{i(n)}catch(s){console.warn("CallController listener error",s)}}}class EL{constructor(){this.emitter=new bL,this.resetState()}resetState(){this.state="idle",this.roomId=null,this.roomLink=null,this.role=null,this.partnerId=null,this.pc=null,this.dataChannel=null,this.messagesUI=null,this.localVideoEl=null,this.remoteVideoEl=null,this.isHangingUp=!1,this.isCleaningUp=!1,this.listeners=new Map,this.wasConnected=!1}getState(){return{state:this.state,roomId:this.roomId,roomLink:this.roomLink,role:this.role,partnerId:this.partnerId,hasPc:!!this.pc,isHangingUp:this.isHangingUp,isCleaningUp:this.isCleaningUp}}on(e,n){this.emitter.on(e,n)}off(e,n){this.emitter.off(e,n)}setPartnerId(e){this.partnerId=e}setupCancellationListener(e){if(!e)return;const n=b(E,`rooms/${e}/cancellation`);let i=!1;const s=async r=>{const o=r.val();if(o&&!i){i=!0;try{this.remoteVideoEl&&(this.remoteVideoEl.srcObject=null)}catch(a){console.warn("Failed to clear remote video after cancellation",a)}try{this.pc&&this.pc.close()}catch{}try{await this.cleanupCall({reason:o.reason||"remote_cancelled"})}catch(a){console.warn("Failed to trigger CallController cleanup",a)}}};Es(n,s,e),this.listeners.has("cancellation")||this.listeners.set("cancellation",[]),this.listeners.get("cancellation").push({ref:n,callback:s,roomId:e})}setupAnswerListener(e,n,i){if(!e||!n)return;const s=b(E,`rooms/${e}/answer`),r=async o=>{const a=o.val();if(a){const{setRemoteDescription:c}=await Pe(async()=>{const{setRemoteDescription:l}=await Promise.resolve().then(()=>W0);return{setRemoteDescription:l}},void 0);await c(n,a,i)}};Es(s,r,e),this.listeners.has("answer")||this.listeners.set("answer",[]),this.listeners.get("answer").push({ref:s,callback:r,roomId:e})}setupRejectionListener(e){if(!e)return;const n=b(E,`rooms/${e}/rejection`);let i=!1;const s=async r=>{const o=r.val();if(o&&!i&&(i=!0,this.pc?.connectionState!=="connected")){try{const{onCallRejected:a}=await Pe(async()=>{const{onCallRejected:c}=await Promise.resolve().then(()=>m0);return{onCallRejected:c}},void 0);await a(o.reason||"user_rejected")}catch{}try{await se.leaveRoom(ge(),e)}catch{}try{this.pc&&this.pc.close()}catch{}}};Es(n,s,e),this.listeners.has("rejection")||this.listeners.set("rejection",[]),this.listeners.get("rejection").push({ref:n,callback:s,roomId:e})}setupMemberJoinedListener(e){if(!e)return;const n=ge(),i=s=>{s.key!==n&&(this.setPartnerId(s.key),this.emitter.emit("memberJoined",{memberId:s.key,roomId:e}))};se.onMemberJoined(e,i),this.listeners.has("member-joined")||this.listeners.set("member-joined",[]),this.listeners.get("member-joined").push({callback:i,roomId:e})}setupMemberLeftListener(e){if(!e)return;const n=ge(),i=s=>{s.key!==n&&this.pc?.connectionState==="connected"&&this.emitter.emit("memberLeft",{memberId:s.key,roomId:e})};se.onMemberLeft(e,i),this.listeners.has("member-left")||this.listeners.set("member-left",[]),this.listeners.get("member-left").push({callback:i,roomId:e})}removeTrackedListeners(){try{for(const[e,n]of this.listeners.entries())for(const i of n)try{i.ref&&kt(i.ref,"value",i.callback)}catch(s){console.warn(`Failed to remove ${e} listener`,s)}}catch(e){console.warn("Failed to remove tracked listeners",e)}finally{this.listeners.clear()}if(this.roomId)try{ra(this.roomId)}catch(e){console.warn("Failed to remove RTDB listeners for room",e)}}async createCall(e={}){this.state="creating";try{e.localVideoEl&&(this.localVideoEl=e.localVideoEl),e.remoteVideoEl&&(this.remoteVideoEl=e.remoteVideoEl);const n=await j0(e);if(!n||!n.success)return this.state="idle",this.emitter.emit("error",{phase:"createCall",detail:n}),this.emitCallFailed("createCall",n),n;this.pc=n.pc,this.roomId=n.roomId,this.roomLink=n.roomLink||null,this.role=n.role||"initiator",this.dataChannel=n.dataChannel||null,this.messagesUI=n.messagesUI||null,this.state="waiting",this.pc&&typeof this.pc.addEventListener=="function"&&this.pc.addEventListener("connectionstatechange",()=>{this.pc.connectionState==="connected"&&(this.wasConnected=!0,this.state!=="connected"&&(this.state="connected"))}),this.dataChannel&&this.setupFileTransport(this.dataChannel);const{drainIceCandidateQueue:i}=await Pe(async()=>{const{drainIceCandidateQueue:s}=await Promise.resolve().then(()=>h0);return{drainIceCandidateQueue:s}},void 0);return this.setupAnswerListener(this.roomId,this.pc,i),this.setupCancellationListener(this.roomId),this.setupRejectionListener(this.roomId),this.setupMemberJoinedListener(this.roomId),this.setupMemberLeftListener(this.roomId),this.emitter.emit("created",{roomId:this.roomId,roomLink:this.roomLink,role:this.role}),n}catch(n){throw this.state="idle",this.emitter.emit("error",{phase:"createCall",error:n}),this.emitCallFailed("createCall",n),n}}async answerCall(e={}){this.state="joining";try{e.localVideoEl&&(this.localVideoEl=e.localVideoEl),e.remoteVideoEl&&(this.remoteVideoEl=e.remoteVideoEl);const i=await q0({...e,onMessagesUIReady:s=>{this.messagesUI=s}});return!i||!i.success?(this.state="idle",this.emitter.emit("error",{phase:"answerCall",detail:i}),this.emitCallFailed("answerCall",i),i):(this.pc=i.pc,this.roomId=i.roomId,this.role=i.role||"joiner",this.dataChannel=i.dataChannel||null,!this.messagesUI&&i.messagesUI&&(this.messagesUI=i.messagesUI),this.state="connected",this.wasConnected=!0,this.dataChannel?this.setupFileTransport(this.dataChannel):this.role==="joiner"&&this.pc&&(this.pc.ondatachannel=s=>{this.dataChannel=s.channel,this.setupFileTransport(this.dataChannel)}),this.setupCancellationListener(this.roomId),this.setupMemberJoinedListener(this.roomId),this.setupMemberLeftListener(this.roomId),this.emitter.emit("answered",{roomId:this.roomId,role:this.role}),i)}catch(n){throw this.state="idle",this.emitter.emit("error",{phase:"answerCall",error:n}),this.emitCallFailed("answerCall",n),n}}setupFileTransport(e){if(!e)return;const n=()=>{try{const i=new Z0(e);sn.setFileTransport(i),Ee.setFileTransfer(i.fileTransfer),H("[CallController] File transport initialized")}catch(i){console.error("[CallController] Failed to setup file transport:",i)}};e.readyState==="open"?n():e.addEventListener("open",n,{once:!0})}async hangUp({emitCancel:e=!0,reason:n="user_hung_up"}={}){if(!this.isHangingUp){this.isHangingUp=!0;try{if(e&&this.roomId)try{await se.cancelCall(this.roomId,ge(),n)}catch(i){console.warn("CallController: cancelCall failed (non-fatal)",i)}await this.cleanupCall({reason:n}),this.emitter.emit("hangup",{roomId:this.roomId,reason:n})}catch(i){throw this.emitter.emit("error",{phase:"hangUp",error:i}),i}finally{this.isHangingUp=!1}}}isRemoteHangup(e){return e?["remote","cancelled","partner_disconnected","connection_failed"].some(i=>e.includes(i)):!1}emitCallFailed(e,n){this.emitter.emit("callFailed",{phase:e,error:n?.message||n?.error||n||"Unknown error"})}async cleanupCall({reason:e}={}){if(!this.isCleaningUp){this.isCleaningUp=!0;try{const n=this.roomId,i=this.partnerId,s=this.role,r=this.wasConnected;this.removeTrackedListeners();try{await se.leaveRoom(ge(),this.roomId)}catch{}try{if(this.pc){try{this.pc.close()}catch{}this.pc=null}}catch{}try{this.remoteVideoEl&&(this.remoteVideoEl.srcObject=null)}catch(o){console.warn("CallController: failed to clear remote video",o)}try{this.localVideoEl&&(this.localVideoEl.srcObject=null)}catch(o){console.warn("CallController: failed to clear local video",o)}try{const{cleanupLocalStream:o}=await Pe(async()=>{const{cleanupLocalStream:a}=await Promise.resolve().then(()=>v0);return{cleanupLocalStream:a}},void 0);o()}catch(o){console.warn("CallController: failed to cleanup local stream",o)}try{const{resetLocalStreamInitFlag:o}=await Pe(async()=>{const{resetLocalStreamInitFlag:a}=await Promise.resolve().then(()=>nM);return{resetLocalStreamInitFlag:a}},void 0);o()}catch{}this.isRemoteHangup(e)&&this.emitter.emit("remoteHangup",{roomId:n,partnerId:i,reason:e});try{sn.clearFileTransport(),Ee.setFileTransfer(null)}catch(o){console.warn("CallController: failed to cleanup file transport",o)}if(this.messagesUI&&this.messagesUI.cleanup)try{this.messagesUI.cleanup()}catch(o){console.warn("CallController: failed to cleanup messages UI",o)}this.resetState(),this.emitter.emit("cleanup",{roomId:n,role:s,wasConnected:r,partnerId:i,reason:e})}catch(n){throw this.emitter.emit("error",{phase:"cleanupCall",error:n}),n}finally{this.isCleaningUp=!1}}}}const _e=new EL,rl={default:{echoCancellation:!0,noiseSuppression:!0,autoGainControl:!0},withVoiceIsolationIfSupported:{echoCancellation:!0,noiseSuppression:!0,autoGainControl:!0,voiceIsolation:!0,restrictOwnAudio:!0,googHighpassFilter:!0,googTypingNoiseDetection:!0,highpassFilter:!0,typingNoiseDetection:!0}};function gy(){const t=navigator.mediaDevices.getSupportedConstraints();return["voiceIsolation","highpassFilter","typingNoiseDetection"].every(i=>t[i])?rl.withVoiceIsolationIfSupported:rl.default}const CL=()=>rl.default,TL={desktop:{landscape:{width:{ideal:1920},height:{ideal:1080},frameRate:{min:10,ideal:30},aspectRatio:{ideal:16/9}},portrait:{width:{ideal:1080},height:{ideal:1920},frameRate:{min:10,ideal:30},aspectRatio:{ideal:9/16}}},mobile:{portrait:{width:{ideal:1080},height:{ideal:1920},aspectRatio:{ideal:9/16},frameRate:{ideal:30}},landscape:{width:{ideal:1920},height:{ideal:1080},aspectRatio:{ideal:16/9},frameRate:{ideal:30}}}},SL=()=>window.screen?.orientation?.type?.includes("portrait")||window.orientation===0||window.orientation===180;function Qu(t){const e=SL()?"portrait":"landscape",i=/Mobi|Android/i.test(navigator.userAgent)?"mobile":"desktop",s=TL[i][e];return{facingMode:t,...s}}function IL(){return!!(navigator.mediaDevices&&navigator.mediaDevices.enumerateDevices)}async function kL(){return IL()?(await navigator.mediaDevices.enumerateDevices()).filter(e=>e.kind==="videoinput"):[]}async function RL(){const t=await kL();let e=!1,n=!1;return t.forEach(i=>{const s=i.label.toLowerCase();(s.includes("front")||s.includes("user"))&&(e=!0),(s.includes("back")||s.includes("rear")||s.includes("environment"))&&(n=!0)}),e&&n}async function AL({localStream:t,localVideo:e,currentFacingMode:n,peerConnection:i=null}){if(!t||!e)return console.error("switchCamera: missing localStream or localVideo"),null;const s=n==="user"?"environment":"user";try{const r=await navigator.mediaDevices.getUserMedia({video:Qu(s),audio:gy()}),o=r.getVideoTracks()[0],a=r.getAudioTracks()[0],c=t.getVideoTracks()[0],l=c?c.enabled:!0,u=t.getAudioTracks()[0],d=u?!u.enabled:!1;if(o&&(o.enabled=l),a&&(a.enabled=!d),t.getTracks().forEach(h=>h.stop()),i){const h=i.getSenders().find(p=>p.track&&p.track.kind==="video");h&&await h.replaceTrack(o);const f=i.getSenders().find(p=>p.track&&p.track.kind==="audio");f&&a&&await f.replaceTrack(a)}return e.srcObject=new MediaStream([o].filter(Boolean)),{newStream:r,facingMode:s}}catch(r){return console.error("Failed to switch camera:",r),null}}let ec=!1,Cn=null,Tn=null;function NL({getLocalStream:t,getFacingMode:e}){return Cn&&Tn&&Cn.removeEventListener("change",Tn),Cn=window.matchMedia("(orientation: portrait)"),Tn=()=>{try{const n=typeof t=="function"?t():null,i=typeof e=="function"?e():"user";PL({localStream:n,currentFacingMode:i})}catch(n){console.error("Orientation handler failed:",n)}},Cn.addEventListener("change",Tn),()=>{Cn&&Tn&&Cn.removeEventListener("change",Tn),Cn=null,Tn=null}}async function PL({localStream:t,currentFacingMode:e}){if(!(ec||!t?.getVideoTracks()[0])){ec=!0;try{const n=t.getVideoTracks()[0],i=Qu(e);H("Applying constraints:",i),await n.applyConstraints(i),H("Video constraints updated successfully")}catch(n){console.error("Failed to apply orientation constraints:",n)}finally{ec=!1}}}let ol=[];function LL(t,e){const n=e.querySelector("i");n.className=t?"fa fa-microphone-slash":"fa fa-microphone"}function OL({getLocalStream:t,getLocalVideo:e,getRemoteVideo:n,getPeerConnection:i=()=>null,setLocalStream:s=null,micBtn:r,cameraBtn:o,switchCameraBtn:a,mutePartnerBtn:c,fullscreenPartnerBtn:l,remotePipBtn:u}){r&&(r.onclick=()=>{const h=t();if(!h)return;const f=h.getAudioTracks()[0];f&&(f.enabled=!f.enabled,LL(!f.enabled,r))}),o&&(o.onclick=()=>{const h=t();if(!h)return;const f=h.getVideoTracks()[0];if(f){f.enabled=!f.enabled;const p=o.querySelector("i");p.className=f.enabled?"fa fa-video":"fa fa-video-slash"}});const d=NL({getLocalStream:t,getFacingMode:Zc});ol.push(d),a&&(a.onclick=async()=>{const h=await AL({localStream:t(),localVideo:e(),currentFacingMode:Zc(),peerConnection:i()||null});h?(z_(h.facingMode),console.log("Switched camera to facingMode:",h.facingMode),h.newStream&&typeof s=="function"&&s(h.newStream)):console.error("Camera switch failed.")},(async()=>await RL()?D(a):w(a))()),c&&(c.onclick=()=>{const h=n();if(!h)return;h.muted=!h.muted;const f=c.querySelector("i");f.className=h.muted?"fa fa-volume-mute":"fa fa-volume-up"}),l&&(l.onclick=()=>{const h=n();h.requestFullscreen?h.requestFullscreen():h.webkitRequestFullscreen&&h.webkitRequestFullscreen()}),u&&(u.onclick=async()=>{const h=n();if(h)try{document.pictureInPictureElement===h?await document.exitPictureInPicture():h.requestPictureInPicture&&await h.requestPictureInPicture()}catch(f){console.error("Picture-in-Picture failed:",f)}})}function DL(){ol.forEach(t=>t()),ol=[]}const ML=async()=>{if(Y_())return console.debug("Reusing existing local MediaStream."),pa();const t=Qu("user"),e=gy();try{const n=await navigator.mediaDevices.getUserMedia({video:t,audio:e});return Eo(n),n}catch(n){if(n.name==="OverconstrainedError"){console.warn(`❌ Constraint failed on property: ${n.constraint}, falling back to basic constraints`);const i=CL(),s=await navigator.mediaDevices.getUserMedia({video:!0,audio:i});return Eo(s),s}throw n}};async function xL(t){const e=await ML(),n=new MediaStream(e.getVideoTracks());return t.srcObject=n,!0}function FL(t,e,n){return t.ontrack=i=>{H(`REMOTE TRACK RECEIVED: ${i.track.kind}`);const s=fa()?ju():null;let r;i.streams&&i.streams[0]&&i.streams[0]instanceof MediaStream?r=i.streams[0]:(console.warn("No stream in track event, using fallback track handling"),s?(s.addTrack(i.track),r=s):r=new MediaStream([i.track])),G_(r),e.srcObject=r,s!==r||H(`Added ${i.track.kind} track to existing remote stream`);try{const o=document.getElementById("remote-video-box")||e.parentElement;o&&(o.classList?.remove("hidden"),e.classList?.remove("hidden"),o.style.visibility="visible",o.style.opacity="1",o.style.position="",o.style.left="",o.style.top="",e.style.visibility="visible",e.style.opacity="1")}catch(o){console.warn("Visibility override failed:",o)}},!0}let Ur=null,gt=null;async function my(t,e="User"){const n=U(),i=Wn();if(!n||!i)throw new Error("Must be logged in to send invites");if(!t)throw new Error("Recipient user ID is required");const s=yo(n,t),r=b(E,`users/${t}/incomingInvites/${n}`),o={fromUserId:n,fromName:i.displayName||"Anonymous",fromEmail:i.email||"",fromPhotoURL:i.photoURL||null,roomId:s,timestamp:Date.now(),status:"pending"};await ne(r,o),console.log(`[INVITATIONS] Sent invite to ${e} (${t})`)}function UL(t){const e=U();if(!e)return console.warn("[INVITATIONS] Cannot listen for invites - not logged in"),()=>{};al();const n=b(E,`users/${e}/incomingInvites`);return Ur=Vs(n,i=>{const s=i.key,r=i.val();r&&r.status==="pending"&&(console.log(`[INVITATIONS] New invite from ${r.fromName}`),t(s,r))}),console.log("[INVITATIONS] Listening for incoming invites"),al}async function $L(t,e){const n=U(),i=Wn();if(!n||!i)throw new Error("Must be logged in to accept invites");const s=b(E,`users/${n}/contacts/${t}`);await ne(s,{contactId:t,contactName:e.fromName||"User",roomId:e.roomId,savedAt:Date.now()});const r=b(E,`users/${t}/acceptedInvites/${n}`);await ne(r,{acceptedByUserId:n,acceptedByName:i.displayName||"User",acceptedByEmail:i.email||"",acceptedByPhotoURL:i.photoURL||null,roomId:e.roomId,timestamp:Date.now()});const o=b(E,`users/${n}/incomingInvites/${t}`);await Xe(o),console.log(`[INVITATIONS] Accepted invite from ${e.fromName} and notified sender`)}async function BL(t){const e=U();if(!e)throw new Error("Must be logged in to decline invites");const n=b(E,`users/${e}/incomingInvites/${t}`);await Xe(n),console.log(`[INVITATIONS] Declined invite from ${t}`)}function HL(t){const e=U();if(!e)return console.warn("[INVITATIONS] Cannot listen for accepted invites - not logged in"),()=>{};gt&&(gt(),gt=null);const n=b(E,`users/${e}/acceptedInvites`);return gt=Vs(n,async i=>{const s=i.key,r=i.val();if(r)try{const o=b(E,`users/${e}/contacts/${s}`);await ne(o,{contactId:s,contactName:r.acceptedByName||"User",roomId:r.roomId,savedAt:Date.now()}),console.log(`[INVITATIONS] Auto-saved contact: ${r.acceptedByName} (invite accepted)`);const a=b(E,`users/${e}/acceptedInvites/${s}`);await Xe(a),t&&t(s,r)}catch(o){console.error("[INVITATIONS] Failed to auto-save contact from accepted invite:",o)}}),console.log("[INVITATIONS] Listening for accepted invites"),()=>{gt&&(gt(),gt=null)}}function al(){Ur&&(Ur(),Ur=null),gt&&(gt(),gt=null),console.log("[INVITATIONS] Cleaned up all invite listeners")}function VL(){w(ce),w(me),w(Re),w(Ge)}function WL(t){t.on("memberJoined",ry),t.on("cleanup",()=>{Mn(),oy()})}let Si=null;function ga(t,e={}){return new Promise(n=>{const i=document.createElement("dialog");i.innerHTML=`
      <p>${t}</p>
      <div class="confirm-dialog-actions">
        <button data-action="cancel">Cancel</button>
        <button data-action="confirm" autofocus>Confirm</button>
      </div>
    `,i.classList.add("confirm-dialog");const s=i.querySelector('[data-action="confirm"]'),r=i.querySelector('[data-action="cancel"]');if(!s||!r){console.error("dialog element not found!"),n(!1);return}let o=null;function a(c){o&&clearTimeout(o),i.close(),i.remove(),Si===a&&(Si=null),n(c)}s.addEventListener("click",()=>{a(!0)}),r.addEventListener("click",()=>{a(!1)}),i.addEventListener("cancel",()=>a(!1)),document.body.appendChild(i),i.showModal(),Si=a,e.autoRemoveSeconds&&typeof e.autoRemoveSeconds=="number"&&e.autoRemoveSeconds>0&&(o=setTimeout(()=>{a(!1)},e.autoRemoveSeconds*1e3))})}function jL(){if(typeof Si=="function"){try{Si(!1)}catch{}return Si=null,!0}return!1}const qL=Object.freeze(Object.defineProperty({__proto__:null,default:ga,dismissActiveConfirmDialog:jL},Symbol.toStringTag,{value:"Module"})),tc=new Map,nc=new Map,ui=new Map,Uf=14;async function cl(t,e,n){const i=U();if(i){const s=b(E,`users/${i}/contacts/${t}`);await ne(s,{contactId:t,contactName:e,roomId:n,savedAt:Date.now()});return}try{const s=localStorage.getItem("contacts")||"{}",r=JSON.parse(s);r[t]={contactId:t,contactName:e,roomId:n,savedAt:Date.now()},localStorage.setItem("contacts",JSON.stringify(r))}catch(s){console.warn("Failed to save contact to localStorage",s)}}async function zn(){const t=U();if(t)try{const e=b(E,`users/${t}/contacts`),n=await Oe(e);return n.exists()?n.val():{}}catch(e){return console.warn("Failed to read contacts from RTDB",e),{}}try{const e=localStorage.getItem("contacts")||"{}";return JSON.parse(e)}catch(e){return console.warn("Failed to read contacts from localStorage",e),{}}}async function zL(t){if(!t)return null;try{const e=await zn();for(const n of Object.values(e||{}))if(n?.roomId===t)return n}catch(e){console.warn("Failed to get contact by roomId",e)}return null}async function _y(t,e){if(!t)return e||"Unknown";try{const n=await zn();for(const i of Object.values(n||{}))if(i?.roomId===t)return i.contactName||i.contactId||e}catch(n){console.warn("Failed to resolve caller name",n)}return e||"Unknown"}async function yy(t,e,n){if(!t||!e)return;const s=(await zn())?.[t];if(s){s.roomId!==e&&(await cl(t,s.contactName,e),await pn(n)),Bi(e);return}if(!await ga("Save contact?",{autoRemoveSeconds:15}))return;const o=window.prompt("Enter a name for this contact:",t)||t;await cl(t,o,e),Bi(e),await pn(n)}async function pn(t){if(!t)return;const e=await zn(),n=Object.keys(e);let i=t.querySelector(".contacts-container");if(i||(i=document.createElement("div"),i.className="contacts-container",t.appendChild(i)),n.length===0){i.innerHTML="<p>No saved contacts yet.</p>",w(i);return}D(i),i.innerHTML=`
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
                ${r.contactName&&r.contactName.length>Uf?r.contactName.slice(0,Uf-2)+"..":r.contactName}
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
  `,GL(i,t),KL(n),await YL(i,n,e)}function GL(t,e){t.querySelectorAll(".contact-message-btn").forEach(n=>{n.onclick=i=>{i.stopPropagation();const s=n.getAttribute("data-contact-id"),r=n.getAttribute("data-contact-name");s&&ma(s,r)}}),t.querySelectorAll(".contact-name").forEach(n=>{n.onclick=async()=>{let i=n.getAttribute("data-room-id");const s=n.getAttribute("data-contact-name"),r=n.getAttribute("data-contact-id");if(!i&&r){const o=U();if(o)try{i=yo(o,r),console.log("[CONTACTS] Generated deterministic room ID:",i),await cl(r,s,i),n.setAttribute("data-room-id",i)}catch(a){console.error("[CONTACTS] Failed to generate or save room ID:",a);return}}i&&(Bi(i),await fr(i,{forceInitiator:!0}).catch(a=>(console.warn("Failed to call contact:",a),!1))&&await $_(i,s))}}),t.querySelectorAll(".contact-delete-btn").forEach(n=>{n.onclick=async()=>{const i=n.getAttribute("data-contact-id");!i||!window.confirm("Delete this contact?")||(await JL(i),await pn(e))}})}function ma(t,e,n=!1){if(!U()){alert("Please sign in to send messages");return}if(sn.getSession(t)){Ee.showMessagesToggle(),n&&!Ee.isMessagesUIOpen()&&Ee.toggleMessages();return}sn.getAllSessions().forEach(a=>{a.close()}),Ee.clearMessages(),Ee.setSession(null);const r=sn.openSession(t,{onMessage:(a,c,l)=>{if(c._reactionUpdate){const d={};if(c.reactions)for(const[h,f]of Object.entries(c.reactions))d[h]=Object.keys(f);Ee.updateMessageReactions(c.messageId,d);return}const u={};if(c.reactions)for(const[d,h]of Object.entries(c.reactions))u[d]=Object.keys(h);if(l)Ee.appendChatMessage(a,{isSentByMe:!0,messageId:c.messageId,reactions:u});else{const d=!c.read;Ee.receiveMessage(a,{isUnread:d,messageId:c.messageId,reactions:u})}}});r.contactName=e,r.toggle=ui.get(t),Ee.setSession(r),Ee.showMessagesToggle(),n&&!Ee.isMessagesUIOpen()&&Ee.toggleMessages(),r.markAsRead().catch(a=>{console.warn("Failed to mark messages as read:",a)});const o=ui.get(t);o&&o.clearBadge()}function KL(t){tc.forEach(({ref:e,callback:n})=>{kt(e,"value",n)}),tc.clear(),U()&&t.forEach(e=>{const n=b(E,`users/${e}/presence`),i=document.querySelector(`.presence-indicator[data-contact-id="${e}"]`);if(!i)return;const s=r=>{const a=r.val()?.state==="online";i.style.backgroundColor=a?"#00d26a":"#444",i.title=a?"Online":"Offline"};Nm(n,s),tc.set(e,{ref:n,callback:s})})}let hs=!1,ri=null;async function YL(t,e,n){if(!U())return;const i=10;let s=0;for(;hs&&s<i;)await new Promise(r=>setTimeout(r,100)),s++;if(hs){console.debug("[CONTACTS] Toggle replacement still in progress after waiting, skipping");return}hs=!0,ri&&clearTimeout(ri),ri=setTimeout(()=>{console.warn("[CONTACTS] Toggle replacement timeout - forcing flag reset"),hs=!1},5e3);try{ui.forEach(o=>{o.cleanup()}),ui.clear(),nc.forEach(o=>{o()}),nc.clear();const r=U();for(const o of e){const a=n[o],c=t.querySelector(`.contact-msg-toggle-container[data-contact-id="${o}"]`);if(!c){console.warn(`[CONTACTS] No toggle container found for contact ${o}`);continue}const l=py({parent:c,onToggle:()=>ma(o,a.contactName,!0),icon:"💬",initialUnreadCount:0});if(!l){console.error(`[CONTACTS] Failed to create toggle for contact ${o}`);continue}ui.set(o,l);const u=sn.listenToUnreadCount(o,d=>{l.setUnreadCount(d)});nc.set(o,u)}Promise.all(e.map(o=>sn.getUnreadCount(o).then(a=>{const c=ui.get(o);c&&c.setUnreadCount(a)}).catch(a=>console.warn(`[CONTACTS] Failed to get unread count for ${o}:`,a))))}finally{ri&&(clearTimeout(ri),ri=null),hs=!1}}async function JL(t){const e=U();if(e){try{await Xe(b(E,`users/${e}/contacts/${t}`))}catch(n){console.warn("Failed to delete contact from RTDB",n)}return}try{const n=localStorage.getItem("contacts")||"{}",i=JSON.parse(n);i[t]&&(delete i[t],localStorage.setItem("contacts",JSON.stringify(i)))}catch(n){console.warn("Failed to delete contact from localStorage",n)}}const ll=Object.freeze(Object.defineProperty({__proto__:null,getContactByRoomId:zL,getContacts:zn,openContactMessages:ma,renderContactsList:pn,resolveCallerName:_y,saveContact:yy},Symbol.toStringTag,{value:"Module"}));let ic=null,Yt=null,Q=null,Y=null,$f=!1,Sr=!1,_t=[],ul="",Ce=-1,dl=[];const XL="AIzaSyBPUjW7ac277WIYTbN4M8dUomK39qRQjhA",QL="https://www.googleapis.com/youtube/v3";async function ZL(){if($f||Sr)return!1;Sr=!0;const{initializeYouTubeElements:t}=await Pe(async()=>{const{initializeYouTubeElements:o}=await Promise.resolve().then(()=>y0);return{initializeYouTubeElements:o}},void 0),e=await t();if(ic=e.searchContainer,Yt=e.searchBtn,Q=e.searchQuery,Y=e.searchResults,!ic||!Yt||!Q||!Y)return console.error("YouTube search elements not found in DOM"),Sr=!1,!1;const n=o=>/^https?:\/\//i.test(o),i=o=>{(Y?.querySelectorAll(".search-result-item")||[]).forEach((c,l)=>{l===o?(c.classList.add("focused"),c.scrollIntoView({block:"nearest"})):c.classList.remove("focused")}),Ce=o??-1};Yt.onclick=async()=>{const o=Q.value.trim();if(bo(Q)){D(Q),Q.focus();return}if(!o){$r(),w(Q);return}if(Vf()&&o===ul)hl(_t);else if(!n(o))await Bf(o);else{await Ys({url:o,title:o,channel:"",thumbnail:"",id:o}),w(Y),Q.value="",w(Q),Ce=-1;return}},ic.addEventListener("keydown",async o=>{const a=Y.querySelectorAll(".search-result-item");if(a.length>0&&(o.key==="ArrowDown"||o.key==="ArrowUp")){if(o.key==="ArrowDown"){let c=Ce+1;c>=a.length&&(c=0),i(c)}else if(o.key==="ArrowUp"){let c=Ce-1;c<0&&(c=Ce===-1?0:a.length-1),i(c)}return}if(o.key==="Enter"){if(a.length>0&&Ce>=0){a[Ce].click(),w(Q),w(Y),Ce=-1;return}const c=Q.value.trim();if(c)if(Vf()&&c===ul)hl(_t);else if(!n(c))await Bf(c);else{await Ys({url:c,title:c,channel:"",thumbnail:"",id:c}),w(Y),Ce=-1,Q.value="",w(Q);return}}else o.key==="Escape"&&(tO()?$r():Q.value?Q.value="":w(Q))}),Q.addEventListener("input",()=>{Q.value.trim()===""&&$r(),Ce=-1});const s=Io(Q,()=>w(Q),{ignore:[Yt],esc:!1});dl.push(s);const r=Io(Y,()=>w(Y),{ignore:[Yt],esc:!1});return dl.push(r),Sr=!1,$f=!0,!0}async function Bf(t){if(!Yt||!Y){console.error("Search elements not initialized");return}_t=[],ul=t,Yt.disabled=!0,Y.innerHTML='<div class="search-loading">Searching YouTube...</div>',D(Y);try{const e=await fetch(`${QL}/search?part=snippet&maxResults=10&q=${encodeURIComponent(t)}&type=video&key=${XL}`);if(!e.ok)throw e.status===403?new Error("YouTube API quota exceeded. Please try again later."):e.status===400?new Error("Invalid API key or request."):new Error(`YouTube API error: ${e.status}`);const n=await e.json();if(!n.items||n.items.length===0){Hf("No videos found"),_t=[];return}_t=n.items.map(i=>({id:i.id.videoId,title:i.snippet.title,thumbnail:i.snippet.thumbnails.medium.url,channel:i.snippet.channelTitle,url:`https://www.youtube.com/watch?v=${i.id.videoId}`})),hl(_t)}catch(e){console.error("YouTube search failed:",e),Hf(e.message||"Search failed. Please try again.")}finally{Yt.disabled=!1}}function hl(t){if(!Y){console.error("Search results element not initialized");return}if(!t||t.length===0){Y.innerHTML='<div class="search-no-results">No results found</div>',_t=[],Ce=-1;return}Y.innerHTML="",t.forEach(n=>{const i=document.createElement("div");i.className="search-result-item",i.innerHTML=`
      <img src="${n.thumbnail}" alt="${n.title}" class="result-thumbnail">
      <div class="search-result-info">
        <div class="search-result-title">${n.title}</div>
        <div class="search-result-channel">${n.channel}</div>
      </div>
    `,i.onclick=async()=>{if(await Ys(n),w(Y),Ce=-1,!Q){console.error("Search query element not initialized");return}Q.value="",w(Q)},Y.appendChild(i)}),D(Y),Ce=0,Y.querySelectorAll(".search-result-item").forEach((n,i)=>{i===Ce?(n.classList.add("focused"),n.scrollIntoView({block:"nearest"})):n.classList.remove("focused")})}function Hf(t){if(_t=[],Ce=-1,!Y){console.error("Search results element not initialized");return}Y.innerHTML=`<div class="search-error">${t}</div>`,D(Y)}function $r(){_t=[],Ce=-1,Y&&(Y.innerHTML="",w(Y))}function eO(){$r(),dl.forEach(t=>t())}function tO(){return!bo(Y)}function Vf(){return _t.length>0}function nO({parent:t,manager:e=null,onClick:n=null,hideWhenAllRead:i=!1}={}){let s=e;const r=Xu({initialProps:{unreadCount:0,isHidden:!0},template:`
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
    `,handlers:{handleClick:()=>{n?n():s&&s.toggleList()}},className:"notifications-toggle-container",parent:t});let o=r.querySelector(".notification-badge");return o&&(o.style.display="none"),r.onPropUpdated("unreadCount",a=>{const c=r.querySelector(".notification-badge");c&&(c.style.display=a>0?"flex":"none")}),r.show=()=>{r.isHidden=!1,r.style.display="block"},r.hide=()=>{r.isHidden=!0,r.style.display="none"},r.setUnread=a=>{r.unreadCount=a,a>0?r.show():i&&r.hide()},r.setManager=a=>{s=a},r.hide(),r}class iO{constructor(){this.notifications=new Map,this.toggle=null,this.container=null,this.clickOutsideCleanup=null}setToggle(e){this.toggle=e,this.toggle.setManager&&this.toggle.setManager(this),this.createContainer(),this.updateToggle()}createContainer(){this.container||(this.container=document.createElement("div"),this.container.className="notifications-list-container",this.container.style.display="none",document.body.appendChild(this.container))}showList(){this.container&&(this.container.style.display="flex",this.setupClickOutside())}hideList(){this.container&&(this.container.style.display="none",this.cleanupClickOutside())}setupClickOutside(){this.clickOutsideCleanup||(this.clickOutsideCleanup=Io(this.container,()=>this.hideList(),{ignore:this.toggle?[this.toggle]:[],esc:!0}))}cleanupClickOutside(){this.clickOutsideCleanup&&(this.clickOutsideCleanup(),this.clickOutsideCleanup=null)}toggleList(){this.container&&(this.container.style.display==="none"?this.showList():this.hideList())}isListVisible(){return this.container&&this.container.style.display!=="none"}add(e,n){this.notifications.has(e)&&this.remove(e),this.container||this.createContainer(),n.parentElement===document.body&&n.remove(),this.container.prepend(n),this.notifications.set(e,n),this.updateToggle(),n._originalDispose||(n._originalDispose=n.dispose);const i=n._originalDispose;n.dispose=()=>{i&&i.call(n),n.parentElement&&n.remove(),this.notifications.delete(e),this.updateToggle(),n.dispose=i,delete n._originalDispose}}remove(e){const n=this.notifications.get(e);n&&(n.dispose&&n.dispose(),this.notifications.delete(e),this.updateToggle())}getCount(){return this.notifications.size}has(e){return this.notifications.has(e)}clear(){this.notifications.forEach(e=>{e.dispose&&e.dispose()}),this.notifications.clear(),this.updateToggle()}updateToggle(){this.toggle&&this.toggle.setUnread(this.getCount())}}const sO=new iO;const wy="@firebase/installations",Zu="0.6.19";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const vy=1e4,by=`w:${Zu}`,Ey="FIS_v2",rO="https://firebaseinstallations.googleapis.com/v1",oO=3600*1e3,aO="installations",cO="Installations";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const lO={"missing-app-config-values":'Missing App configuration value: "{$valueName}"',"not-registered":"Firebase Installation is not registered.","installation-not-found":"Firebase Installation not found.","request-failed":'{$requestName} request failed with error "{$serverCode} {$serverStatus}: {$serverMessage}"',"app-offline":"Could not process request. Application offline.","delete-pending-registration":"Can't delete installation while there is a pending registration request."},Gn=new mn(aO,cO,lO);function Cy(t){return t instanceof Vt&&t.code.includes("request-failed")}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ty({projectId:t}){return`${rO}/projects/${t}/installations`}function Sy(t){return{token:t.token,requestStatus:2,expiresIn:dO(t.expiresIn),creationTime:Date.now()}}async function Iy(t,e){const i=(await e.json()).error;return Gn.create("request-failed",{requestName:t,serverCode:i.code,serverMessage:i.message,serverStatus:i.status})}function ky({apiKey:t}){return new Headers({"Content-Type":"application/json",Accept:"application/json","x-goog-api-key":t})}function uO(t,{refreshToken:e}){const n=ky(t);return n.append("Authorization",hO(e)),n}async function Ry(t){const e=await t();return e.status>=500&&e.status<600?t():e}function dO(t){return Number(t.replace("s","000"))}function hO(t){return`${Ey} ${t}`}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function fO({appConfig:t,heartbeatServiceProvider:e},{fid:n}){const i=Ty(t),s=ky(t),r=e.getImmediate({optional:!0});if(r){const l=await r.getHeartbeatsHeader();l&&s.append("x-firebase-client",l)}const o={fid:n,authVersion:Ey,appId:t.appId,sdkVersion:by},a={method:"POST",headers:s,body:JSON.stringify(o)},c=await Ry(()=>fetch(i,a));if(c.ok){const l=await c.json();return{fid:l.fid||n,registrationStatus:2,refreshToken:l.refreshToken,authToken:Sy(l.authToken)}}else throw await Iy("Create Installation",c)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ay(t){return new Promise(e=>{setTimeout(e,t)})}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function pO(t){return btoa(String.fromCharCode(...t)).replace(/\+/g,"-").replace(/\//g,"_")}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const gO=/^[cdef][\w-]{21}$/,fl="";function mO(){try{const t=new Uint8Array(17);(self.crypto||self.msCrypto).getRandomValues(t),t[0]=112+t[0]%16;const n=_O(t);return gO.test(n)?n:fl}catch{return fl}}function _O(t){return pO(t).substr(0,22)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function _a(t){return`${t.appName}!${t.appId}`}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ny=new Map;function Py(t,e){const n=_a(t);Ly(n,e),yO(n,e)}function Ly(t,e){const n=Ny.get(t);if(n)for(const i of n)i(e)}function yO(t,e){const n=wO();n&&n.postMessage({key:t,fid:e}),vO()}let Ln=null;function wO(){return!Ln&&"BroadcastChannel"in self&&(Ln=new BroadcastChannel("[Firebase] FID Change"),Ln.onmessage=t=>{Ly(t.data.key,t.data.fid)}),Ln}function vO(){Ny.size===0&&Ln&&(Ln.close(),Ln=null)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const bO="firebase-installations-database",EO=1,Kn="firebase-installations-store";let sc=null;function ed(){return sc||(sc=Vo(bO,EO,{upgrade:(t,e)=>{switch(e){case 0:t.createObjectStore(Kn)}}})),sc}async function ko(t,e){const n=_a(t),s=(await ed()).transaction(Kn,"readwrite"),r=s.objectStore(Kn),o=await r.get(n);return await r.put(e,n),await s.done,(!o||o.fid!==e.fid)&&Py(t,e.fid),e}async function Oy(t){const e=_a(t),i=(await ed()).transaction(Kn,"readwrite");await i.objectStore(Kn).delete(e),await i.done}async function ya(t,e){const n=_a(t),s=(await ed()).transaction(Kn,"readwrite"),r=s.objectStore(Kn),o=await r.get(n),a=e(o);return a===void 0?await r.delete(n):await r.put(a,n),await s.done,a&&(!o||o.fid!==a.fid)&&Py(t,a.fid),a}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function td(t){let e;const n=await ya(t.appConfig,i=>{const s=CO(i),r=TO(t,s);return e=r.registrationPromise,r.installationEntry});return n.fid===fl?{installationEntry:await e}:{installationEntry:n,registrationPromise:e}}function CO(t){const e=t||{fid:mO(),registrationStatus:0};return Dy(e)}function TO(t,e){if(e.registrationStatus===0){if(!navigator.onLine){const s=Promise.reject(Gn.create("app-offline"));return{installationEntry:e,registrationPromise:s}}const n={fid:e.fid,registrationStatus:1,registrationTime:Date.now()},i=SO(t,n);return{installationEntry:n,registrationPromise:i}}else return e.registrationStatus===1?{installationEntry:e,registrationPromise:IO(t)}:{installationEntry:e}}async function SO(t,e){try{const n=await fO(t,e);return ko(t.appConfig,n)}catch(n){throw Cy(n)&&n.customData.serverCode===409?await Oy(t.appConfig):await ko(t.appConfig,{fid:e.fid,registrationStatus:0}),n}}async function IO(t){let e=await Wf(t.appConfig);for(;e.registrationStatus===1;)await Ay(100),e=await Wf(t.appConfig);if(e.registrationStatus===0){const{installationEntry:n,registrationPromise:i}=await td(t);return i||n}return e}function Wf(t){return ya(t,e=>{if(!e)throw Gn.create("installation-not-found");return Dy(e)})}function Dy(t){return kO(t)?{fid:t.fid,registrationStatus:0}:t}function kO(t){return t.registrationStatus===1&&t.registrationTime+vy<Date.now()}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function RO({appConfig:t,heartbeatServiceProvider:e},n){const i=AO(t,n),s=uO(t,n),r=e.getImmediate({optional:!0});if(r){const l=await r.getHeartbeatsHeader();l&&s.append("x-firebase-client",l)}const o={installation:{sdkVersion:by,appId:t.appId}},a={method:"POST",headers:s,body:JSON.stringify(o)},c=await Ry(()=>fetch(i,a));if(c.ok){const l=await c.json();return Sy(l)}else throw await Iy("Generate Auth Token",c)}function AO(t,{fid:e}){return`${Ty(t)}/${e}/authTokens:generate`}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function nd(t,e=!1){let n;const i=await ya(t.appConfig,r=>{if(!My(r))throw Gn.create("not-registered");const o=r.authToken;if(!e&&LO(o))return r;if(o.requestStatus===1)return n=NO(t,e),r;{if(!navigator.onLine)throw Gn.create("app-offline");const a=DO(r);return n=PO(t,a),a}});return n?await n:i.authToken}async function NO(t,e){let n=await jf(t.appConfig);for(;n.authToken.requestStatus===1;)await Ay(100),n=await jf(t.appConfig);const i=n.authToken;return i.requestStatus===0?nd(t,e):i}function jf(t){return ya(t,e=>{if(!My(e))throw Gn.create("not-registered");const n=e.authToken;return MO(n)?{...e,authToken:{requestStatus:0}}:e})}async function PO(t,e){try{const n=await RO(t,e),i={...e,authToken:n};return await ko(t.appConfig,i),n}catch(n){if(Cy(n)&&(n.customData.serverCode===401||n.customData.serverCode===404))await Oy(t.appConfig);else{const i={...e,authToken:{requestStatus:0}};await ko(t.appConfig,i)}throw n}}function My(t){return t!==void 0&&t.registrationStatus===2}function LO(t){return t.requestStatus===2&&!OO(t)}function OO(t){const e=Date.now();return e<t.creationTime||t.creationTime+t.expiresIn<e+oO}function DO(t){const e={requestStatus:1,requestTime:Date.now()};return{...t,authToken:e}}function MO(t){return t.requestStatus===1&&t.requestTime+vy<Date.now()}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function xO(t){const e=t,{installationEntry:n,registrationPromise:i}=await td(e);return i?i.catch(console.error):nd(e).catch(console.error),n.fid}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function FO(t,e=!1){const n=t;return await UO(n),(await nd(n,e)).token}async function UO(t){const{registrationPromise:e}=await td(t);e&&await e}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function $O(t){if(!t||!t.options)throw rc("App Configuration");if(!t.name)throw rc("App Name");const e=["projectId","apiKey","appId"];for(const n of e)if(!t.options[n])throw rc(n);return{appName:t.name,projectId:t.options.projectId,apiKey:t.options.apiKey,appId:t.options.appId}}function rc(t){return Gn.create("missing-app-config-values",{valueName:t})}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const xy="installations",BO="installations-internal",HO=t=>{const e=t.getProvider("app").getImmediate(),n=$O(e),i=_n(e,"heartbeat");return{app:e,appConfig:n,heartbeatServiceProvider:i,_delete:()=>Promise.resolve()}},VO=t=>{const e=t.getProvider("app").getImmediate(),n=_n(e,xy).getImmediate();return{getId:()=>xO(n),getToken:s=>FO(n,s)}};function WO(){Ye(new We(xy,HO,"PUBLIC")),Ye(new We(BO,VO,"PRIVATE"))}WO();Ve(wy,Zu);Ve(wy,Zu,"esm2020");/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const jO="/firebase-messaging-sw.js",qO="/firebase-cloud-messaging-push-scope",Fy="BDOU99-h67HcA6JeFXHbSNMu7e2yNNu3RzoMj8TM4W88jITfq7ZmPvIM1Iv-4_l2LxQcYwhqby2xGpWwzjfAnG4",zO="https://fcmregistrations.googleapis.com/v1",Uy="google.c.a.c_id",GO="google.c.a.c_l",KO="google.c.a.ts",YO="google.c.a.e",qf=1e4;var zf;(function(t){t[t.DATA_MESSAGE=1]="DATA_MESSAGE",t[t.DISPLAY_NOTIFICATION=3]="DISPLAY_NOTIFICATION"})(zf||(zf={}));/**
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
 */var Js;(function(t){t.PUSH_RECEIVED="push-received",t.NOTIFICATION_CLICKED="notification-clicked"})(Js||(Js={}));/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Tt(t){const e=new Uint8Array(t);return btoa(String.fromCharCode(...e)).replace(/=/g,"").replace(/\+/g,"-").replace(/\//g,"_")}function JO(t){const e="=".repeat((4-t.length%4)%4),n=(t+e).replace(/\-/g,"+").replace(/_/g,"/"),i=atob(n),s=new Uint8Array(i.length);for(let r=0;r<i.length;++r)s[r]=i.charCodeAt(r);return s}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const oc="fcm_token_details_db",XO=5,Gf="fcm_token_object_Store";async function QO(t){if("databases"in indexedDB&&!(await indexedDB.databases()).map(r=>r.name).includes(oc))return null;let e=null;return(await Vo(oc,XO,{upgrade:async(i,s,r,o)=>{if(s<2||!i.objectStoreNames.contains(Gf))return;const a=o.objectStore(Gf),c=await a.index("fcmSenderId").get(t);if(await a.clear(),!!c){if(s===2){const l=c;if(!l.auth||!l.p256dh||!l.endpoint)return;e={token:l.fcmToken,createTime:l.createTime??Date.now(),subscriptionOptions:{auth:l.auth,p256dh:l.p256dh,endpoint:l.endpoint,swScope:l.swScope,vapidKey:typeof l.vapidKey=="string"?l.vapidKey:Tt(l.vapidKey)}}}else if(s===3){const l=c;e={token:l.fcmToken,createTime:l.createTime,subscriptionOptions:{auth:Tt(l.auth),p256dh:Tt(l.p256dh),endpoint:l.endpoint,swScope:l.swScope,vapidKey:Tt(l.vapidKey)}}}else if(s===4){const l=c;e={token:l.fcmToken,createTime:l.createTime,subscriptionOptions:{auth:Tt(l.auth),p256dh:Tt(l.p256dh),endpoint:l.endpoint,swScope:l.swScope,vapidKey:Tt(l.vapidKey)}}}}}})).close(),await Da(oc),await Da("fcm_vapid_details_db"),await Da("undefined"),ZO(e)?e:null}function ZO(t){if(!t||!t.subscriptionOptions)return!1;const{subscriptionOptions:e}=t;return typeof t.createTime=="number"&&t.createTime>0&&typeof t.token=="string"&&t.token.length>0&&typeof e.auth=="string"&&e.auth.length>0&&typeof e.p256dh=="string"&&e.p256dh.length>0&&typeof e.endpoint=="string"&&e.endpoint.length>0&&typeof e.swScope=="string"&&e.swScope.length>0&&typeof e.vapidKey=="string"&&e.vapidKey.length>0}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const eD="firebase-messaging-database",tD=1,Yn="firebase-messaging-store";let ac=null;function id(){return ac||(ac=Vo(eD,tD,{upgrade:(t,e)=>{switch(e){case 0:t.createObjectStore(Yn)}}})),ac}async function $y(t){const e=rd(t),i=await(await id()).transaction(Yn).objectStore(Yn).get(e);if(i)return i;{const s=await QO(t.appConfig.senderId);if(s)return await sd(t,s),s}}async function sd(t,e){const n=rd(t),s=(await id()).transaction(Yn,"readwrite");return await s.objectStore(Yn).put(e,n),await s.done,e}async function nD(t){const e=rd(t),i=(await id()).transaction(Yn,"readwrite");await i.objectStore(Yn).delete(e),await i.done}function rd({appConfig:t}){return t.appId}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const iD={"missing-app-config-values":'Missing App configuration value: "{$valueName}"',"only-available-in-window":"This method is available in a Window context.","only-available-in-sw":"This method is available in a service worker context.","permission-default":"The notification permission was not granted and dismissed instead.","permission-blocked":"The notification permission was not granted and blocked instead.","unsupported-browser":"This browser doesn't support the API's required to use the Firebase SDK.","indexed-db-unsupported":"This browser doesn't support indexedDb.open() (ex. Safari iFrame, Firefox Private Browsing, etc)","failed-service-worker-registration":"We are unable to register the default service worker. {$browserErrorMessage}","token-subscribe-failed":"A problem occurred while subscribing the user to FCM: {$errorInfo}","token-subscribe-no-token":"FCM returned no token when subscribing the user to push.","token-unsubscribe-failed":"A problem occurred while unsubscribing the user from FCM: {$errorInfo}","token-update-failed":"A problem occurred while updating the user from FCM: {$errorInfo}","token-update-no-token":"FCM returned no token when updating the user to push.","use-sw-after-get-token":"The useServiceWorker() method may only be called once and must be called before calling getToken() to ensure your service worker is used.","invalid-sw-registration":"The input to useServiceWorker() must be a ServiceWorkerRegistration.","invalid-bg-handler":"The input to setBackgroundMessageHandler() must be a function.","invalid-vapid-key":"The public VAPID key must be a string.","use-vapid-key-after-get-token":"The usePublicVapidKey() method may only be called once and must be called before calling getToken() to ensure your VAPID key is used."},ve=new mn("messaging","Messaging",iD);/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function sD(t,e){const n=await ad(t),i=Hy(e),s={method:"POST",headers:n,body:JSON.stringify(i)};let r;try{r=await(await fetch(od(t.appConfig),s)).json()}catch(o){throw ve.create("token-subscribe-failed",{errorInfo:o?.toString()})}if(r.error){const o=r.error.message;throw ve.create("token-subscribe-failed",{errorInfo:o})}if(!r.token)throw ve.create("token-subscribe-no-token");return r.token}async function rD(t,e){const n=await ad(t),i=Hy(e.subscriptionOptions),s={method:"PATCH",headers:n,body:JSON.stringify(i)};let r;try{r=await(await fetch(`${od(t.appConfig)}/${e.token}`,s)).json()}catch(o){throw ve.create("token-update-failed",{errorInfo:o?.toString()})}if(r.error){const o=r.error.message;throw ve.create("token-update-failed",{errorInfo:o})}if(!r.token)throw ve.create("token-update-no-token");return r.token}async function By(t,e){const i={method:"DELETE",headers:await ad(t)};try{const r=await(await fetch(`${od(t.appConfig)}/${e}`,i)).json();if(r.error){const o=r.error.message;throw ve.create("token-unsubscribe-failed",{errorInfo:o})}}catch(s){throw ve.create("token-unsubscribe-failed",{errorInfo:s?.toString()})}}function od({projectId:t}){return`${zO}/projects/${t}/registrations`}async function ad({appConfig:t,installations:e}){const n=await e.getToken();return new Headers({"Content-Type":"application/json",Accept:"application/json","x-goog-api-key":t.apiKey,"x-goog-firebase-installations-auth":`FIS ${n}`})}function Hy({p256dh:t,auth:e,endpoint:n,vapidKey:i}){const s={web:{endpoint:n,auth:e,p256dh:t}};return i!==Fy&&(s.web.applicationPubKey=i),s}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const oD=10080*60*1e3;async function aD(t){const e=await uD(t.swRegistration,t.vapidKey),n={vapidKey:t.vapidKey,swScope:t.swRegistration.scope,endpoint:e.endpoint,auth:Tt(e.getKey("auth")),p256dh:Tt(e.getKey("p256dh"))},i=await $y(t.firebaseDependencies);if(i){if(dD(i.subscriptionOptions,n))return Date.now()>=i.createTime+oD?lD(t,{token:i.token,createTime:Date.now(),subscriptionOptions:n}):i.token;try{await By(t.firebaseDependencies,i.token)}catch(s){console.warn(s)}return Kf(t.firebaseDependencies,n)}else return Kf(t.firebaseDependencies,n)}async function cD(t){const e=await $y(t.firebaseDependencies);e&&(await By(t.firebaseDependencies,e.token),await nD(t.firebaseDependencies));const n=await t.swRegistration.pushManager.getSubscription();return n?n.unsubscribe():!0}async function lD(t,e){try{const n=await rD(t.firebaseDependencies,e),i={...e,token:n,createTime:Date.now()};return await sd(t.firebaseDependencies,i),n}catch(n){throw n}}async function Kf(t,e){const i={token:await sD(t,e),createTime:Date.now(),subscriptionOptions:e};return await sd(t,i),i.token}async function uD(t,e){const n=await t.pushManager.getSubscription();return n||t.pushManager.subscribe({userVisibleOnly:!0,applicationServerKey:JO(e)})}function dD(t,e){const n=e.vapidKey===t.vapidKey,i=e.endpoint===t.endpoint,s=e.auth===t.auth,r=e.p256dh===t.p256dh;return n&&i&&s&&r}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Yf(t){const e={from:t.from,collapseKey:t.collapse_key,messageId:t.fcmMessageId};return hD(e,t),fD(e,t),pD(e,t),e}function hD(t,e){if(!e.notification)return;t.notification={};const n=e.notification.title;n&&(t.notification.title=n);const i=e.notification.body;i&&(t.notification.body=i);const s=e.notification.image;s&&(t.notification.image=s);const r=e.notification.icon;r&&(t.notification.icon=r)}function fD(t,e){e.data&&(t.data=e.data)}function pD(t,e){if(!e.fcmOptions&&!e.notification?.click_action)return;t.fcmOptions={};const n=e.fcmOptions?.link??e.notification?.click_action;n&&(t.fcmOptions.link=n);const i=e.fcmOptions?.analytics_label;i&&(t.fcmOptions.analyticsLabel=i)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function gD(t){return typeof t=="object"&&!!t&&Uy in t}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function mD(t){if(!t||!t.options)throw cc("App Configuration Object");if(!t.name)throw cc("App Name");const e=["projectId","apiKey","appId","messagingSenderId"],{options:n}=t;for(const i of e)if(!n[i])throw cc(i);return{appName:t.name,projectId:n.projectId,apiKey:n.apiKey,appId:n.appId,senderId:n.messagingSenderId}}function cc(t){return ve.create("missing-app-config-values",{valueName:t})}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class _D{constructor(e,n,i){this.deliveryMetricsExportedToBigQueryEnabled=!1,this.onBackgroundMessageHandler=null,this.onMessageHandler=null,this.logEvents=[],this.isLogServiceStarted=!1;const s=mD(e);this.firebaseDependencies={app:e,appConfig:s,installations:n,analyticsProvider:i}}_delete(){return Promise.resolve()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Vy(t){try{t.swRegistration=await navigator.serviceWorker.register(jO,{scope:qO}),t.swRegistration.update().catch(()=>{}),await yD(t.swRegistration)}catch(e){throw ve.create("failed-service-worker-registration",{browserErrorMessage:e?.message})}}async function yD(t){return new Promise((e,n)=>{const i=setTimeout(()=>n(new Error(`Service worker not registered after ${qf} ms`)),qf),s=t.installing||t.waiting;t.active?(clearTimeout(i),e()):s?s.onstatechange=r=>{r.target?.state==="activated"&&(s.onstatechange=null,clearTimeout(i),e())}:(clearTimeout(i),n(new Error("No incoming service worker found.")))})}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function wD(t,e){if(!e&&!t.swRegistration&&await Vy(t),!(!e&&t.swRegistration)){if(!(e instanceof ServiceWorkerRegistration))throw ve.create("invalid-sw-registration");t.swRegistration=e}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function vD(t,e){e?t.vapidKey=e:t.vapidKey||(t.vapidKey=Fy)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Wy(t,e){if(!navigator)throw ve.create("only-available-in-window");if(Notification.permission==="default"&&await Notification.requestPermission(),Notification.permission!=="granted")throw ve.create("permission-blocked");return await vD(t,e?.vapidKey),await wD(t,e?.serviceWorkerRegistration),aD(t)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function bD(t,e,n){const i=ED(e);(await t.firebaseDependencies.analyticsProvider.get()).logEvent(i,{message_id:n[Uy],message_name:n[GO],message_time:n[KO],message_device_time:Math.floor(Date.now()/1e3)})}function ED(t){switch(t){case Js.NOTIFICATION_CLICKED:return"notification_open";case Js.PUSH_RECEIVED:return"notification_foreground";default:throw new Error}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function CD(t,e){const n=e.data;if(!n.isFirebaseMessaging)return;t.onMessageHandler&&n.messageType===Js.PUSH_RECEIVED&&(typeof t.onMessageHandler=="function"?t.onMessageHandler(Yf(n)):t.onMessageHandler.next(Yf(n)));const i=n.data;gD(i)&&i[YO]==="1"&&await bD(t,n.messageType,i)}const Jf="@firebase/messaging",Xf="0.12.23";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const TD=t=>{const e=new _D(t.getProvider("app").getImmediate(),t.getProvider("installations-internal").getImmediate(),t.getProvider("analytics-internal"));return navigator.serviceWorker.addEventListener("message",n=>CD(e,n)),e},SD=t=>{const e=t.getProvider("messaging").getImmediate();return{getToken:i=>Wy(e,i)}};function ID(){Ye(new We("messaging",TD,"PUBLIC")),Ye(new We("messaging-internal",SD,"PRIVATE")),Ve(Jf,Xf),Ve(Jf,Xf,"esm2020")}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function kD(){try{await cg()}catch{return!1}return typeof window<"u"&&$o()&&fT()&&"serviceWorker"in navigator&&"PushManager"in window&&"Notification"in window&&"fetch"in window&&ServiceWorkerRegistration.prototype.hasOwnProperty("showNotification")&&PushSubscription.prototype.hasOwnProperty("getKey")}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function RD(t){if(!navigator)throw ve.create("only-available-in-window");return t.swRegistration||await Vy(t),cD(t)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function AD(t,e){if(!navigator)throw ve.create("only-available-in-window");return t.onMessageHandler=e,()=>{t.onMessageHandler=null}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ND(t=Wo()){return kD().then(e=>{if(!e)throw ve.create("unsupported-browser")},e=>{throw ve.create("indexed-db-unsupported")}),_n(re(t),"messaging").getImmediate()}async function PD(t,e){return t=re(t),Wy(t,e)}function Qf(t){return t=re(t),RD(t)}function LD(t,e){return t=re(t),AD(t,e)}ID();class OD{constructor(){this.messaging=null,this.currentToken=null,this.vapidKey=UA,this.isInitialized=!1,this.messageCallbacks=new Set,this.tokenRefreshCallbacks=new Set}async initialize(){if(this.isInitialized)return!0;try{return!("serviceWorker"in navigator)||!("Notification"in window)?(console.warn("[FCMTransport] FCM not supported in this environment"),!1):this.vapidKey?(this.messaging=ND(sa),LD(this.messaging,e=>{console.log("[FCMTransport] Foreground message received:",e),this.messageCallbacks.forEach(n=>{try{n(e)}catch(i){console.error("[FCMTransport] Error in message callback:",i)}})}),this.isInitialized=!0,console.log("[FCMTransport] Initialized successfully"),!0):(console.warn("[FCMTransport] VAPID key not configured"),!1)}catch(e){return console.error("[FCMTransport] Initialization failed:",e),!1}}async getToken(){if(!this.isInitialized&&!await this.initialize())return null;try{const e=await PD(this.messaging,{vapidKey:this.vapidKey});return e?(this.currentToken=e,console.log("[FCMTransport] Token obtained"),await this.storeUserToken(e),e):(console.warn("[FCMTransport] No registration token available"),null)}catch(e){return console.error("[FCMTransport] Failed to get token:",e),null}}async refreshToken(){if(console.log("[FCMTransport] Refreshing token..."),this.currentToken)try{await Qf(this.messaging),await this.removeUserToken(this.currentToken)}catch(n){console.warn("[FCMTransport] Failed to delete old token:",n)}this.currentToken=null;const e=await this.getToken();return e&&this.tokenRefreshCallbacks.forEach(n=>{try{n(e)}catch(i){console.error("[FCMTransport] Error in token refresh callback:",i)}}),e}async deleteToken(){if(!this.messaging||!this.currentToken)return!0;try{return await Qf(this.messaging),await this.removeUserToken(this.currentToken),this.currentToken=null,console.log("[FCMTransport] Token deleted successfully"),!0}catch(e){return console.error("[FCMTransport] Failed to delete token:",e),!1}}async storeUserToken(e){const n=U();if(!n){console.warn("[FCMTransport] Cannot store token: user not logged in");return}try{const i=b(E,`users/${n}/fcmTokens/${this.getTokenId(e)}`),s={token:e,deviceInfo:{platform:this.getPlatform(),timestamp:Date.now()},createdAt:Date.now(),lastUsed:Date.now()};await ne(i,s),console.log("[FCMTransport] Token stored in RTDB")}catch(i){console.error("[FCMTransport] Failed to store token in RTDB:",i)}}async removeUserToken(e){const n=U();if(n)try{const i=b(E,`users/${n}/fcmTokens/${this.getTokenId(e)}`);await Xe(i),console.log("[FCMTransport] Token removed from RTDB")}catch(i){console.error("[FCMTransport] Failed to remove token from RTDB:",i)}}async getUserTokens(e){try{const n=b(E,`users/${e}/fcmTokens`),i=await Oe(n);if(i.exists()){const s=i.val();return Object.values(s)}return[]}catch(n){return console.error("[FCMTransport] Failed to get user tokens:",n),[]}}async sendCallNotification(e,n){const{roomId:i,callerId:s,callerName:r}=n,o={type:"call",roomId:i,callerId:s,callerName:r,timestamp:Date.now().toString()},a="/HangVidU/",c={notification:{title:`Incoming call from ${r}`,body:"Tap to answer or decline",icon:`${a}icons/play-arrows-v1/icon-192.png`,badge:`${a}icons/play-arrows-v1/icon-192.png`},data:o};return this.sendNotification(e,c)}async sendMissedCallNotification(e,n){const{roomId:i,callerId:s,callerName:r}=n,o={type:"missed_call",roomId:i,callerId:s,callerName:r,timestamp:Date.now().toString()},a="/HangVidU/",c={notification:{title:`Missed call from ${r}`,body:"Tap to call back",icon:`${a}icons/play-arrows-v1/icon-192.png`,badge:`${a}icons/play-arrows-v1/icon-192.png`},data:o};return this.sendNotification(e,c)}async sendMessageNotification(e,n){const{senderId:i,senderName:s,messageText:r}=n,o=typeof r=="string"?r:String(r||""),a=o.length>50?o.substring(0,47)+"...":o,c={type:"message",senderId:i,senderName:s,messagePreview:a,timestamp:Date.now().toString()},l="/HangVidU/",u={notification:{title:`New message from ${s}`,body:a,icon:`${l}icons/play-arrows-v1/icon-192.png`,badge:`${l}icons/play-arrows-v1/icon-192.png`},data:c};return this.sendNotification(e,u)}async sendNotification(e,n){try{{let o=null;try{const{getLoggedInUserToken:l}=await Pe(async()=>{const{getLoggedInUserToken:u}=await Promise.resolve().then(()=>Lu);return{getLoggedInUserToken:u}},void 0);o=await l()}catch(l){console.warn("[FCMTransport] Failed to get auth token:",l)}const a={"Content-Type":"application/json"};o&&(a.Authorization=`Bearer ${o}`);const c=await fetch("https://europe-west1-vidu-aae11.cloudfunctions.net/sendCallNotification",{method:"POST",headers:a,body:JSON.stringify({targetUserId:e,callData:n.data})});if(c.ok){const l=await c.json();return console.log(`[FCMTransport] FCM notification sent to ${e}:`,l),!0}else return console.error("[FCMTransport] FCM function failed:",c.status),!1}const i=b(E,`notifications/${e}`),s=uo(i).key,r={id:s,payload:n,createdAt:Date.now(),delivered:!1};return await ne(b(E,`notifications/${e}/${s}`),r),console.log(`[FCMTransport] Notification queued for user ${e} (dev mode)`),!0}catch(i){return console.error("[FCMTransport] Failed to send notification:",i),!1}}onMessage(e){return this.messageCallbacks.add(e),()=>this.messageCallbacks.delete(e)}onTokenRefresh(e){return this.tokenRefreshCallbacks.add(e),()=>this.tokenRefreshCallbacks.delete(e)}getTokenId(e){return btoa(e).replace(/[^a-zA-Z0-9]/g,"").substring(0,20)}getPlatform(){const e=navigator.userAgent;return/iPhone|iPad|iPod/.test(e)?"ios":/Android/.test(e)?"android":/Macintosh/.test(e)?"macos":/Windows/.test(e)?"windows":"unknown"}static isSupported(){return"serviceWorker"in navigator&&"Notification"in window}}class DD{constructor(e=null,n={}){this.transport=e||new OD,this.isEnabled=!1,this.permissionState="default",this.options={enableCallNotifications:!0,enableMessageNotifications:!0,privacyMode:!1,autoHideSuccessMs:6e3,...n},this.activeNotifications=new Map,this.permissionCallbacks=new Set,this.notificationCallbacks=new Set}async initialize(){try{return await this.transport.initialize()?(this.permissionState=this.getPermissionState(),this.transport.onMessage(n=>{this.handleForegroundMessage(n)}),console.log("[NotificationController] Initialized successfully"),!0):(console.warn("[NotificationController] Transport initialization failed"),!1)}catch(e){return console.error("[NotificationController] Initialization failed:",e),!1}}async requestPermission(e={}){const{title:n="Enable notifications",explain:i="Get notified of incoming calls and messages even when the app is closed.",onGranted:s=null,onDenied:r=null,onDismissed:o=null}=e;if(!this.isNotificationSupported())return console.warn("[NotificationController] Notifications not supported"),{state:"denied",reason:"unsupported"};this.detectBrowser();const a=Notification.permission;if(this.permissionState=a,a==="granted")return await this.enable(),s?.(),{state:"granted"};if(a==="denied")return r?.("already-denied"),{state:"denied",reason:"already-denied"};let c;try{c=await Notification.requestPermission()}catch(l){console.error("[NotificationController] Permission request failed:",l),c=Notification.permission}return this.permissionState=c,c==="granted"?(await this.enable(),s?.(),{state:"granted"}):a==="default"&&c==="denied"?(r?.("silent-block"),{state:"denied",reason:"silent-block"}):c==="default"?(o?.(),{state:"dismissed"}):(r?.(),{state:"denied"})}async enable(){if(this.permissionState!=="granted")return console.warn("[NotificationController] Cannot enable: permission not granted"),!1;try{return await this.transport.getToken()?(this.isEnabled=!0,console.log("[NotificationController] Notifications enabled"),this.permissionCallbacks.forEach(n=>{try{n("enabled")}catch(i){console.error("[NotificationController] Error in permission callback:",i)}}),!0):(console.warn("[NotificationController] Failed to get FCM token"),!1)}catch(e){return console.error("[NotificationController] Failed to enable notifications:",e),!1}}async disable(){try{return await this.transport.deleteToken(),this.isEnabled=!1,this.activeNotifications.clear(),console.log("[NotificationController] Notifications disabled"),this.permissionCallbacks.forEach(e=>{try{e("disabled")}catch(n){console.error("[NotificationController] Error in permission callback:",n)}}),!0}catch(e){return console.error("[NotificationController] Failed to disable notifications:",e),!1}}async sendCallNotification(e,n){if(!this.options.enableCallNotifications)return console.log("[NotificationController] Call notifications disabled"),!1;if(!this.shouldSendNotification())return console.log("[NotificationController] Not sending call notification (app in foreground)"),!1;try{const i=await this.transport.sendCallNotification(e,n);if(i){const s=`call_${n.roomId}_${Date.now()}`;this.activeNotifications.set(s,{type:"call",roomId:n.roomId,targetUserId:e,timestamp:Date.now()}),console.log(`[NotificationController] Call notification sent to ${e}`)}return i}catch(i){return console.error("[NotificationController] Failed to send call notification:",i),!1}}async sendMissedCallNotification(e,n){if(!this.options.enableCallNotifications)return console.log("[NotificationController] Call notifications disabled (missed call masked)"),!1;try{const i=await this.transport.sendMissedCallNotification(e,n);return i&&console.log(`[NotificationController] Missed call notification sent to ${e}`),i}catch(i){return console.error("[NotificationController] Failed to send missed call notification:",i),!1}}async sendMessageNotification(e,n){if(!this.options.enableMessageNotifications)return console.log("[NotificationController] Message notifications disabled"),!1;if(!this.shouldSendNotification())return console.log("[NotificationController] Not sending message notification (app in foreground)"),!1;try{const i=await this.transport.sendMessageNotification(e,n);if(i){const s=`message_${e}_${Date.now()}`;this.activeNotifications.set(s,{type:"message",senderId:n.senderId,targetUserId:e,timestamp:Date.now()}),console.log(`[NotificationController] Message notification sent to ${e}`)}return i}catch(i){return console.error("[NotificationController] Failed to send message notification:",i),!1}}async dismissCallNotifications(e){try{const n=[];for(const[i,s]of this.activeNotifications)s.type==="call"&&s.roomId===e&&n.push(i);n.forEach(i=>this.activeNotifications.delete(i)),n.length>0&&console.log(`[NotificationController] Dismissed ${n.length} call notifications for room ${e}`)}catch(n){console.error("[NotificationController] Failed to dismiss call notifications:",n)}}async dismissMessageNotifications(e){try{const n=[];for(const[i,s]of this.activeNotifications)s.type==="message"&&s.senderId===e&&n.push(i);n.forEach(i=>this.activeNotifications.delete(i)),n.length>0&&console.log(`[NotificationController] Dismissed ${n.length} message notifications from ${e}`)}catch(n){console.error("[NotificationController] Failed to dismiss message notifications:",n)}}async cleanupOldNotifications(){const e=Date.now(),n=1440*60*1e3,i=[];for(const[s,r]of this.activeNotifications)e-r.timestamp>n&&i.push(s);i.forEach(s=>this.activeNotifications.delete(s)),i.length>0&&console.log(`[NotificationController] Cleaned up ${i.length} old notifications`)}handleForegroundMessage(e){console.log("[NotificationController] Foreground message received:",e),this.notificationCallbacks.forEach(n=>{try{n(e)}catch(i){console.error("[NotificationController] Error in notification callback:",i)}})}shouldSendNotification(){return document.hidden||!document.hasFocus()}getPermissionState(){return this.isNotificationSupported()?Notification.permission:"unsupported"}isNotificationEnabled(){return this.isEnabled&&this.permissionState==="granted"}isNotificationSupported(){return"Notification"in window&&"serviceWorker"in navigator}updateOptions(e){this.options={...this.options,...e},console.log("[NotificationController] Options updated:",this.options)}onPermissionChange(e){return this.permissionCallbacks.add(e),()=>this.permissionCallbacks.delete(e)}onNotification(e){return this.notificationCallbacks.add(e),()=>this.notificationCallbacks.delete(e)}detectBrowser(){if(navigator.userAgentData&&navigator.userAgentData.brands){const n=navigator.userAgentData.brands.map(i=>i.brand);if(n.some(i=>i.includes("Microsoft Edge")))return"Edge";if(n.some(i=>i.includes("Google Chrome")))return"Chrome";if(n.some(i=>i.includes("Chromium")))return"Chromium"}const e=navigator.userAgent;return e.includes("Edg/")?"Edge":e.includes("Chrome/")?"Chrome":e.includes("Safari/")&&!e.includes("Chrome")?"Safari":e.includes("Firefox/")?"Firefox":"Your browser"}async formatCallNotification(e){const{roomId:n,callerId:i,callerName:s}=e;let r=s;try{const{resolveCallerName:o}=await Pe(async()=>{const{resolveCallerName:a}=await Promise.resolve().then(()=>ll);return{resolveCallerName:a}},void 0);r=await o(n,i)}catch(o){console.warn("[NotificationController] Failed to resolve caller name:",o),r=s||i||"Unknown caller"}return this.options.privacyMode&&(r="Someone"),{...e,callerName:r}}async formatMessageNotification(e){const{senderId:n,senderName:i,messageText:s}=e;let r=i,o=s;try{const{getContacts:a}=await Pe(async()=>{const{getContacts:l}=await Promise.resolve().then(()=>ll);return{getContacts:l}},void 0),c=await a();c&&c[n]&&(r=c[n].name||i)}catch(a){console.warn("[NotificationController] Failed to resolve sender name:",a),r=i||n||"Unknown sender"}return this.options.privacyMode?(r="Someone",o="New message"):o&&o.length>50&&(o=o.substring(0,47)+"..."),{...e,senderName:r,messageText:o}}}const $e=new DD;let fs=null;const MD=(t,e=null)=>{if(fs)return fs;if(!t)return console.error("Auth UI: Parent element is required"),null;let n=null,i=null,s=10;typeof e=="number"&&(s=e);const r=Nu();return fs=Xu({initialProps:{isLoggedIn:r,userName:"Guest User",signingInDisplay:"none",loginBtnMarginRightPx:s},template:`
      <button style="margin-right: \${loginBtnMarginRightPx}px" id="goog-login-btn" class="login-btn" onclick="handleLogin">Login</button>
      <button id="goog-logout-btn" class="logout-btn" onclick="handleLogout">Logout</button>
      <span class="signing-in-indicator" style="display: \${signingInDisplay}; color: var(--text-secondary, #888); font-size: 0.9rem;">Signing in...</span>
      <div class="user-info">\${isLoggedIn ? 'Logged in: ' + userName : 'Logged out'}</div>
    `,handlers:{handleLogin:async o=>{try{await D_(o)}catch(a){console.error("[AuthComponent] Handle login error:",a),alert("Login failed. Please refresh the page, check your connection and try again.")}},handleLogout:M_},onMount:o=>{const a=c=>{const l=o.querySelector("#goog-login-btn"),u=o.querySelector("#goog-logout-btn");l&&u&&(l.disabled=c,u.disabled=!c)};a(r),n=Pu(({isLoggedIn:c,userName:l})=>{H("[AuthComponent] Auth state changed:",{isLoggedIn:c,userName:l}),a(c),o.update({isLoggedIn:c,userName:l,signingInDisplay:"none"})}),i=qP(c=>{H("[AuthComponent] One Tap status:",c),c==="signing_in"?o.update({signingInDisplay:"inline-block"}):o.update({signingInDisplay:"none"})})},onCleanup:()=>{n&&(n(),n=null),i&&(i(),i=null),fs=null},className:"auth-component",parent:t}),fs},xD="https://people.googleapis.com/v1/people/me/connections",FD="https://people.googleapis.com/v1/otherContacts";async function UD(t){if(!t)throw new Error("Access token is required");const e=[],n=await Zf(t,xD,"names,emailAddresses");console.log(`[GOOGLE CONTACTS] My Contacts: ${n.length}`),e.push(...n);const i=await Zf(t,FD,"names,emailAddresses");console.log(`[GOOGLE CONTACTS] Other Contacts: ${i.length}`),e.push(...i),console.log(`[GOOGLE CONTACTS] Total: ${e.length} contacts with email addresses`);const s=new Set;return e.filter(o=>s.has(o.email)?!1:(s.add(o.email),!0))}async function Zf(t,e,n){const i=[];let s=null;do{const r=new URL(e);r.searchParams.set("pageSize","100"),e.includes("otherContacts")?r.searchParams.set("readMask",n):r.searchParams.set("personFields",n),s&&r.searchParams.set("pageToken",s);const o=await fetch(r.toString(),{headers:{Authorization:`Bearer ${t}`}});if(!o.ok){const l=await o.json().catch(()=>({}));if(e.includes("otherContacts"))return console.warn("[GOOGLE CONTACTS] Other contacts fetch failed (may need additional scope):",l.error?.message),i;throw console.error("[GOOGLE CONTACTS] API error:",l),new Error(l.error?.message||`API error: ${o.status}`)}const a=await o.json(),c=a.connections||a.otherContacts||[];for(const l of c){const u=l.emailAddresses||[],h=(l.names||[])[0]?.displayName||"Unknown";for(const f of u)f.value&&i.push({email:f.value.toLowerCase().trim(),name:h})}s=a.nextPageToken}while(s);return i}async function $D(){return new Promise(t=>{const e=document.createElement("dialog");e.classList.add("add-contact-modal"),e.innerHTML=`
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
    `;const n=e.querySelector("#add-contact-form"),i=e.querySelector("#contact-email-input"),s=e.querySelector("#search-status"),r=e.querySelector('[data-action="cancel"]'),o=e.querySelector('[data-action="search"]'),a=e.querySelector("#import-google-btn"),c=e.querySelector("#import-status"),l=e.querySelector("#import-results");function u(){e.close(),e.remove(),t()}r.addEventListener("click",u),e.addEventListener("cancel",u),n.addEventListener("submit",async d=>{d.preventDefault();const h=i.value.trim();if(h){o.disabled=!0,i.disabled=!0,s.textContent="Searching...",s.className="search-status searching";try{const f=await A_(h);if(!f){s.textContent=`${h} is not on HangVidU yet.`,s.className="search-status not-found",o.disabled=!1,i.disabled=!1;return}const p=Wn();if(p&&f.uid===p.uid){s.textContent="That's your own email address!",s.className="search-status error",o.disabled=!1,i.disabled=!1;return}s.textContent=`Found ${f.displayName}! Sending invitation...`,s.className="search-status found",await my(f.uid,f.displayName),s.textContent=`✓ Invitation sent to ${f.displayName}!`,s.className="search-status success",setTimeout(u,1500)}catch(f){console.error("[ADD CONTACT] Error searching for user:",f),s.textContent="Error searching for user. Please try again.",s.className="search-status error",o.disabled=!1,i.disabled=!1}}}),a.addEventListener("click",async()=>{a.disabled=!0,c.textContent="Requesting access...",c.className="import-status loading",l.innerHTML="";try{const d=await x_();c.textContent="Fetching contacts...";const h=await UD(d);if(h.length===0){c.textContent="No contacts with email addresses found.",c.className="import-status not-found",a.disabled=!1;return}c.textContent=`Found ${h.length} contacts. Checking HangVidU...`;const f=h.map(M=>M.email),p=await JP(f),_=Wn(),m=[],R=[];for(const M of h){const $=p[M.email];$&&$.uid!==_?.uid?m.push({...M,user:$}):$||R.push(M)}c.textContent=`${m.length} on HangVidU, ${R.length} not yet`,c.className="import-status success",BD(l,m,R),a.disabled=!1}catch(d){console.error("[ADD CONTACT] Import error:",d),d.message==="Authorization cancelled"?(c.textContent="Import cancelled.",c.className="import-status cancelled"):(c.textContent=`Error: ${d.message}`,c.className="import-status error"),a.disabled=!1}}),document.body.appendChild(e),e.showModal()})}function BD(t,e,n){if(t.innerHTML="",e.length>0){const i=document.createElement("div");i.className="results-section",i.innerHTML=`<h4>On HangVidU (${e.length})</h4>`;const s=document.createElement("ul");s.className="contact-list";for(const{name:r,email:o,user:a}of e){const c=document.createElement("li");c.className="contact-item",c.innerHTML=`
        <span class="contact-info">
          <strong>${Ir(r)}</strong>
          <small>${Ir(o)}</small>
        </span>
        <button type="button" class="invite-btn" data-uid="${Ir(a.uid)}" data-name="${Ir(a.displayName)}">
          Invite
        </button>
      `;const l=c.querySelector(".invite-btn");l.addEventListener("click",async()=>{l.disabled=!0,l.textContent="Sending...";try{await my(a.uid,a.displayName),l.textContent="✓ Sent",l.classList.add("sent")}catch(u){console.error("[ADD CONTACT] Invite error:",u),l.textContent="Error",l.disabled=!1}}),s.appendChild(c)}i.appendChild(s),t.appendChild(i)}if(e.length===0&&n.length>0){const i=document.createElement("div");i.className="empty-state",i.innerHTML=`
      <p>None of your ${n.length} contacts are on HangVidU yet.</p>
      <p>Be the first to invite them!</p>
    `,t.appendChild(i)}if(n.length>0&&e.length>0){const i=document.createElement("div");i.className="results-section not-on-app",i.innerHTML=`<p class="muted-text">${n.length} contacts not on HangVidU yet</p>`,t.appendChild(i)}}function Ir(t){const e=document.createElement("div");return e.textContent=t||"",e.innerHTML.replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function HD(){const t=document.querySelector("link[rel~='icon']");return t?t.href:"/favicon.ico"}class VD{constructor(){this.originalTitle=document.title,this.originalFavicon=HD(),this.titleFlashInterval=null,this.isFlashing=!1,this.wakeLock=null,this.setupVisibilityListener()}setupVisibilityListener(){document.addEventListener("visibilitychange",()=>{!document.hidden&&this.isFlashing&&this.stopTitleFlashing()})}startCallIndicators(e){console.log(`[CallIndicators] Starting call indicators for: ${e}`),this.startTitleFlashing(e),this.setFavicon("/HangVidU/icons/phone-ringing.svg"),this.setBadge(1),this.requestWakeLock()}stopCallIndicators(){console.log("[CallIndicators] Stopping call indicators"),this.stopTitleFlashing(),this.restoreFavicon(),this.clearBadge(),this.releaseWakeLock()}startTitleFlashing(e){this.stopTitleFlashing();let n=!0;this.isFlashing=!0,document.title=`📞 Call from ${e}!`,this.titleFlashInterval=setInterval(()=>{this.isFlashing&&(document.title=n?`📞 Call from ${e}!`:this.originalTitle,n=!n)},1e3)}stopTitleFlashing(){this.titleFlashInterval&&(clearInterval(this.titleFlashInterval),this.titleFlashInterval=null),this.isFlashing=!1,document.title=this.originalTitle}setFavicon(e){const n=document.querySelector("link[rel~='icon']");n&&(n.href=e,console.log(`[CallIndicators] Favicon changed to: ${e}`))}restoreFavicon(){this.setFavicon(this.originalFavicon)}setBadge(e){"setAppBadge"in navigator&&navigator.setAppBadge(e).then(()=>{console.log(`[CallIndicators] Badge set to: ${e}`)}).catch(n=>{console.warn("[CallIndicators] Badge not supported:",n)})}clearBadge(){"clearAppBadge"in navigator&&navigator.clearAppBadge().then(()=>{console.log("[CallIndicators] Badge cleared")}).catch(e=>{console.warn("[CallIndicators] Badge clear failed:",e)})}async requestWakeLock(){if("wakeLock"in navigator)try{this.wakeLock=await navigator.wakeLock.request("screen"),console.log("[CallIndicators] Wake lock active"),this.wakeLock.addEventListener("release",()=>{console.log("[CallIndicators] Wake lock released"),this.wakeLock=null},{once:!0})}catch(e){console.warn("[CallIndicators] Wake lock failed:",e)}}releaseWakeLock(){if(this.wakeLock){const e=this.wakeLock;this.wakeLock=null,e.release().then(()=>{console.log("[CallIndicators] Wake lock released manually")}).catch(n=>{console.warn("[CallIndicators] Wake lock release failed:",n)})}}}const ep=new VD;let tp=!1;function WD(t,e){const n=document.createElement("dialog");n.className="copy-link-dialog";const i=document.createElement("div");i.className="copy-link-dialog__content";const s=document.createElement("h2");s.className="copy-link-dialog__title",s.textContent=e.title,i.appendChild(s);const r=document.createElement("div");r.className="copy-link-dialog__input-container";const o=document.createElement("input");o.type="text",o.className="copy-link-dialog__input",o.value=t,o.readOnly=!0,o.setAttribute("aria-label","Link to copy"),r.appendChild(o),i.appendChild(r);const a=document.createElement("div");a.className="copy-link-dialog__buttons";const c=document.createElement("button");c.className="copy-link-dialog__button copy-link-dialog__button--primary",c.textContent=e.buttonText,c.autofocus=!0;const l=document.createElement("button");l.className="copy-link-dialog__button copy-link-dialog__button--secondary",l.textContent=e.cancelText,a.appendChild(c),a.appendChild(l),i.appendChild(a);const u=document.createElement("p");return u.className="copy-link-dialog__feedback",u.setAttribute("aria-live","polite"),i.appendChild(u),n.appendChild(i),{dialog:n,input:o,copyButton:c,cancelButton:l,feedback:u}}function jD(t,e={}){const n={title:"Share this link",buttonText:"Copy",cancelText:"Cancel",successMessage:"✓ Copied to clipboard!",errorMessage:"Failed to copy. Click the link to select it manually.",autoClose:!0,autoCloseDelay:1200,onCopy:null,onError:null,onCancel:null,onClose:null,...e};qD();const{dialog:i,input:s,copyButton:r,cancelButton:o,feedback:a}=WD(t,n);zD(i);let c=!1;const l=async()=>{await GD(t,s)?(c=!0,a.textContent=n.successMessage,a.classList.remove("copy-link-dialog__feedback--error"),n.onCopy&&n.onCopy(t),n.autoClose&&setTimeout(()=>{i.close()},n.autoCloseDelay)):(a.textContent=n.errorMessage,a.classList.add("copy-link-dialog__feedback--error"),s.readOnly=!1,s.addEventListener("click",()=>{s.select()}),n.onError&&n.onError())};return r.addEventListener("click",l),o.addEventListener("click",()=>{n.onCancel&&n.onCancel(),i.close()}),i.addEventListener("keydown",u=>{u.key==="Enter"&&!u.shiftKey&&!u.ctrlKey&&!u.altKey&&!u.metaKey&&(u.preventDefault(),l())}),i.addEventListener("close",()=>{!c&&n.onCancel&&n.onCancel(),n.onClose&&n.onClose(),setTimeout(()=>{i.remove()},300)}),document.body.appendChild(i),i.showModal(),i}function qD(){if(tp)return;const t=document.createElement("style");t.textContent=`
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
  `,document.head.appendChild(t),tp=!0}function zD(t){t.showModal||(t.showModal=function(){this.setAttribute("open",""),this.style.display="block",this.style.position="fixed",this.style.top="50%",this.style.left="50%",this.style.transform="translate(-50%, -50%)";const e=getComputedStyle(document.documentElement).getPropertyValue("--z-ui-overlay").trim();this.style.zIndex=e||"1000"},t.close=function(){this.removeAttribute("open"),this.style.display="none"})}async function GD(t,e=null){if(navigator.clipboard&&navigator.clipboard.writeText)try{return await navigator.clipboard.writeText(t),!0}catch(n){return console.warn("Clipboard API failed, using fallback:",n),!1}if(!e)return!1;try{return e.select(),e.setSelectionRange(0,99999),document.execCommand("copy")}catch(n){return console.error("Fallback copy failed:",n),!1}}function KD(){const t=window.matchMedia&&window.matchMedia("(display-mode: standalone)").matches||navigator.standalone===!0,e=/iphone|ipad|ipod/i.test(navigator.userAgent||"");if(!t||!e||!window.location.hostname.includes("github.io"))return;const i="https://vidu-aae11.web.app",s=i.replace(/\/$/,"");let r;try{r=new URL(s).hostname}catch(l){console.error("[PWA Redirect] Invalid VITE_APP_HOSTING_URL:",i,l);return}if(window.location.hostname===r)return;const o="/HangVidU/";let a=window.location.pathname;a.startsWith(o)?a="/"+a.slice(o.length):a==="/HangVidU"&&(a="/");let c;try{c=new URL(a+window.location.search+window.location.hash,s).toString()}catch(l){console.error("[PWA Redirect] Failed to construct target URL:",l);return}console.log("[PWA Redirect] iOS standalone PWA on gh-pages → redirecting to Firebase Hosting:",c),window.location.replace(c)}KD();HP(!0);y().disable();let cd=[];async function YD(){VL();const t=H_(),n=["localVideoEl","remoteVideoEl","localBoxEl","remoteBoxEl","chatControls","lobbyDiv","titleAuthBar"].filter(i=>!t[i]);if(n.length>0)return console.error("Critical elements missing:",n),!1;try{{const{setupPWA:r}=await Pe(async()=>{const{setupPWA:o}=await import("./PWA-GPLSDhGU.js");return{setupPWA:o}},[]);await r()}ZL(),QD(),await P_;const i=MD(da);i&&cd.push(i.dispose);const s=document.querySelector(".top-right-menu");if(s){const r=nO({parent:s,hideWhenAllRead:!0});sO.setToggle(r)}try{await $e.initialize()?console.log("[MAIN] FCM notifications initialized successfully"):console.warn("[MAIN] FCM notifications failed to initialize")}catch(r){console.error("[MAIN] FCM initialization error:",r)}return!0}catch(i){return console.error("Initialization error:",i),!1}}let pl=!1;function jy(){pl=!1}async function qy(){pl||(pl=!0,await xL(je),OL({getLocalStream:pa,getLocalVideo:()=>je,getRemoteVideo:()=>ae,getPeerConnection:()=>_e.getState().pc,setLocalStream:Eo,micBtn:ns,cameraBtn:is,switchCameraBtn:ts,mutePartnerBtn:ut,fullscreenPartnerBtn:ha,remotePipBtn:fn}),je&&(je.addEventListener("enterpictureinpicture",()=>me&&w(me)),je.addEventListener("leavepictureinpicture",()=>{me&&!(qn()&&ey())&&D(me)})))}function zy(t){(t?.name==="NotAllowedError"||t?.name==="PermissionDeniedError")&&alert('Camera/microphone access is required for video calls. Please click "Allow" when prompted, or check your browser settings.'),jy()}function Br(t=null){return{localStream:pa(),localVideoEl:je,remoteVideoEl:ae,mutePartnerBtn:ut,setupRemoteStream:FL,setupWatchSync:A0,targetRoomId:t}}function Hr(t,e=!1){return t.success?(e&&t.roomLink&&jD(t.roomLink,{onCopy:()=>H("Link ready! Share with your partner."),onCancel:()=>H("Link ready! Use the copy button to use it, or create a new one.")}),!0):!1}async function fr(t,{forceInitiator:e=!1}={}){try{await qy()}catch(r){return console.error("Failed to initialize local media stream:",r),zy(r),!1}const n=Date.now();if(e){y().logRoomCreation(t,!0,{creationTime:n,listenerAttachTime:n,timeDiff:0},{trigger:"force_initiator",reason:"calling_saved_contact"});const r=await _e.createCall(Br(t));return Hr(r,!1)}let i=await se.checkRoomStatus(t);if(i.exists&&!i.hasMembers){let o=0;for(;o<3&&!i.hasMembers;)await new Promise(a=>setTimeout(a,250*(o+1))),i=await se.checkRoomStatus(t),o++}if(!i.exists||!i.hasMembers){y().logRoomCreation(t,!0,{creationTime:n,listenerAttachTime:n,timeDiff:0},{trigger:"room_empty_or_nonexistent",roomExists:i.exists,memberCount:i.memberCount||0});const r=await _e.createCall(Br(t));return Hr(r,!0)}y().log("ROOM","JOINING_EXISTING",{roomId:t,memberCount:i.memberCount,roomExists:i.exists});const s=await _e.answerCall({roomId:t,...Br()});return Hr(s,!1)}const Be=new Set,Gy=new Map;function np(t){t&&(ra(t),Be.delete(t),Gy.delete(t),y().log("LISTENER","INCOMING_CLEANUP",{roomId:t,remainingListeners:Be.size}))}function JD(){H(`[LISTENER] Removing all incoming listeners (${Be.size} rooms)`);const t=Array.from(Be);t.forEach(e=>{ra(e)}),Be.clear(),Gy.clear(),y().log("LISTENER","ALL_INCOMING_CLEANUP",{roomsCleared:t.length})}async function XD(t){const e=Date.now(),n=e+1440*60*1e3,i=U();if(i){const s=yu(i,t);await ne(s,{roomId:t,savedAt:e,expiresAt:n});return}try{const s=localStorage.getItem("recentCalls")||"{}",r=JSON.parse(s);r[t]={roomId:t,savedAt:e,expiresAt:n},localStorage.setItem("recentCalls",JSON.stringify(r))}catch(s){console.warn("Failed to save recent call to localStorage",s)}}async function lc(t){const e=U();if(e){try{await Xe(yu(e,t))}catch(n){console.warn("Failed to remove recent call from RTDB",n)}return}try{const n=localStorage.getItem("recentCalls")||"{}",i=JSON.parse(n);i[t]&&(delete i[t],localStorage.setItem("recentCalls",JSON.stringify(i)))}catch(n){console.warn("Failed to remove recent call from localStorage",n)}}function Bi(t){t&&(Be.has(t)&&(Be.delete(t),ra(t)),H(`[LISTENER] Attaching listener for room: ${t} (total: ${Be.size+1})`),Be.add(t),y().logListenerAttachment(t,"member_join",Be.size,{action:"incoming_call_listener_attached"}),se.onMemberJoined(t,async e=>{const n=e.key,i=e.val?e.val():null,s=ge();if(n&&n!==s){y().logMemberJoinEvent(t,n,i||{},{detectedBy:"incoming_call_listener",currentUserId:s});const r=i&&typeof i.joinedAt=="number"?i.joinedAt:null,o=2e4;let a=!1,c="none",l=0;if(r&&(l=Date.now()-r,a=l<o,c="joinedAt"),!a){const $=await F_(n,t),S=await U_(t);a=$||S,c=$?"outgoingState":S?"roomCreatedAt":"failed"}const u={isFresh:a,method:c,age:l,reason:a?"call_is_fresh":"call_is_stale"};if(y().logIncomingCallEvent(n,t,u,{memberData:i,joinedAt:r,CALL_FRESH_MS:o}),!a){y().logNotificationDecision("REJECT","stale_call",t,{age:l,validationMethod:c,joiningUserId:n});return}let d;try{d=await se.getRoomData(t)}catch{return}if(!d||typeof d!="object")return;const h=!!d.offer,f=!!d.answer,p=d.createdBy;if(!h||f||p===s)return;const _=_e.getState();if(!!_.pc&&_.pc.connectionState==="connected"){y().logNotificationDecision("REJECT","already_in_call",t,{joiningUserId:n,currentCallState:_.pc?.connectionState});return}y().logNotificationDecision("SHOW","fresh_call_detected",t,{joiningUserId:n,freshnessResult:u});const R=await _y(t,n);if($e.isNotificationEnabled()&&$e.shouldSendNotification())try{const $=await $e.formatCallNotification({roomId:t,callerId:n,callerName:R});console.log("[MAIN] Would send call notification:",$)}catch($){console.warn("[MAIN] Failed to send call notification:",$)}yi.playIncoming(),ep.startCallIndicators(R);let M=!1;try{M=await ga(`Incoming call from ${R}.

Accept?`)}finally{yi.stop(),ep.stopCallIndicators()}if(M)np(t),$e.isNotificationEnabled()&&await $e.dismissCallNotifications(t),y().logNotificationDecision("ACCEPT","user_accepted",t,{joiningUserId:n}),fr(t).catch($=>{console.warn("Failed to answer incoming call:",$),y().logFirebaseOperation("join_room_on_accept",!1,$,{roomId:t,joiningUserId:n})});else{$e.isNotificationEnabled()&&await $e.dismissCallNotifications(t),y().logNotificationDecision("REJECT","user_rejected",t,{joiningUserId:n});try{await se.rejectCall(t,ge(),"user_rejected")}catch($){console.warn("Failed to signal rejection via RTDB:",$)}await lc(t).catch($=>{console.warn("Failed to remove recent call on rejection:",$)})}}}),se.onCallCancelled(t,async e=>{if(e&&typeof e.val=="function"&&e.val()){try{const{dismissActiveConfirmDialog:i}=await Pe(async()=>{const{dismissActiveConfirmDialog:s}=await Promise.resolve().then(()=>qL);return{dismissActiveConfirmDialog:s}},void 0);typeof i=="function"&&i()}catch{}await lc(t).catch(()=>{})}}),se.onMemberLeft(t,async e=>{const n=e.key,i=ge();if(!(!n||n===i))try{(await se.checkRoomStatus(t)).hasMembers||(await lc(t),np(t),H(`Removed saved recent call and listeners for room ${t} because it is now empty`))}catch(s){console.warn("Failed to evaluate room status on member leave",s)}}))}async function ip(){const t=Date.now();y().log("LISTENER","STARTUP_BEGIN",{timestamp:t,currentListenerCount:Be.size});try{if(typeof window<"u"){const{getCurrentUserAsync:n}=await Pe(async()=>{const{getCurrentUserAsync:i}=await Promise.resolve().then(()=>Lu);return{getCurrentUserAsync:i}},void 0);await n()}}catch{}const e=U();if(y().log("LISTENER","AUTH_STATE_DETERMINED",{isLoggedIn:!!e,userId:e||"guest"}),e){const n=VA(e);try{const i=await Oe(n),s=i.exists()?i.val():null,r=new Set;if(s)for(const[o,a]of Object.entries(s)){if(!a||a.expiresAt&&a.expiresAt<Date.now()){await Xe(yu(e,o)).catch(()=>{});continue}r.add(o)}try{const o=await zn();Object.entries(o||{}).forEach(([a,c])=>{if(c?.roomId)r.add(c.roomId);else if(a&&e)try{const l=yo(e,a);r.add(l)}catch{}})}catch{}r.forEach(o=>Bi(o)),y().log("LISTENER","STARTUP_COMPLETE",{storage:"rtdb",roomsToListen:Array.from(r),totalListeners:Be.size,duration:Date.now()-t})}catch(i){console.warn("Failed to read recent calls from RTDB",i),y().logFirebaseOperation("read_recent_calls",!1,i,{storage:"rtdb",userId:e})}return}try{const n=localStorage.getItem("recentCalls")||"{}",i=JSON.parse(n),s={},r=new Set;for(const[o,a]of Object.entries(i||{}))!a||a.expiresAt&&a.expiresAt<Date.now()||(s[o]=a,r.add(o));try{const o=await zn(),a=ge();Object.entries(o||{}).forEach(([c,l])=>{if(l?.roomId)r.add(l.roomId);else if(c&&a)try{const u=yo(a,c);r.add(u)}catch{}})}catch{}r.forEach(o=>Bi(o)),localStorage.setItem("recentCalls",JSON.stringify(s)),y().log("LISTENER","STARTUP_COMPLETE",{storage:"localStorage",roomsToListen:Array.from(r),totalListeners:Be.size,duration:Date.now()-t,expiredRoomsRemoved:Object.keys(i||{}).length-r.size})}catch(n){console.warn("Failed to read recent calls from localStorage",n),y().logFirebaseOperation("read_recent_calls",!1,n,{storage:"localStorage"})}}function kr(){return F&&Re&&!Re.classList.contains("hidden")&&F.src&&F.src.trim()!==""}let sp=!1;function QD(){if(sp)return;const t=()=>{const e=document.activeElement;return e&&(e.tagName==="INPUT"||e.tagName==="TEXTAREA"||e.isContentEditable)};document.addEventListener("keydown",e=>{t()||(e.key==="w"||e.key==="W")&&(console.log("=== W KEY PRESSED ==="),console.log("lastWatched:",pt()),console.log("isYTVisible():",Ja()),console.log("isSharedVideoVisible():",kr()),console.log("isWatchModeActive():",qn()),pt()==="yt"?Ja()?(Co(),Is()):(Q_(),So()):(pt()==="url"||pt()==="file")&&(kr()?(w(Re),Is()):(D(Re),So()))),e.key==="Escape"&&qn()&&(pt()==="yt"&&Ja()?(hr(),Co()):(pt()==="url"&&kr()||pt()==="file"&&kr())&&(F.pause(),w(Re)),Is())}),sp=!0}const Ky=async()=>{try{await qy();const t=await _e.createCall(Br());Hr(t,!0)}catch(t){console.error("Failed to start call:",t),zy(t)}};Fe.onclick=Ky;yn.onclick=Ky;vi&&(navigator.clipboard&&navigator.clipboard.readText?vi.onclick=async()=>{try{const t=await navigator.clipboard.readText(),e=ZD(t);if(!e){alert("No valid room link found in clipboard.");return}await fr(e)}catch(t){t.name==="NotAllowedError"?alert("Clipboard access denied. Please allow clipboard access or paste the link manually."):(console.error("Paste & Join failed:",t),alert("Failed to read clipboard. Please try again."))}}:(vi.style.display="none",console.warn("Paste & Join button hidden: Clipboard API not available in this context (requires HTTPS).")));Gs&&(Gs.onclick=async()=>{await $D()});jn&&(jn.onclick=()=>{pt()==="yt"?(hr(),Co()):(pt()==="url"||pt()==="file")&&(F.pause(),F.src.startsWith("blob:")&&URL.revokeObjectURL(F.src),w(Re)),Is()});lt.onclick=async()=>{console.debug("Hanging up..."),await _e.hangUp({emitCancel:!0,reason:"user_hung_up"})};function ZD(t){let e=t.trim();if(!e)return"";try{const n=new URL(e,window.location.origin),i=n.searchParams.get("room");if(i)return i;const s=n.hash.match(/room=([^&]+)/);return s?decodeURIComponent(s[1]):n.pathname.replace(/^\//,"")||e}catch{return e}}async function eM(){const e=new URLSearchParams(window.location.search).get("room");if(!e)return!1;const n=await fr(e);return n||(ua(),oy()),n}const gl=[];let uc=!1;async function Yy(){if(uc||gl.length===0)return;uc=!0;const{fromUserId:t,inviteData:e}=gl.shift();try{if(await ga(`${e.fromName||"Someone"} wants to connect.

Accept contact invitation?`))try{await $L(t,e),console.log("[INVITATIONS] Contact added:",e.fromName),await pn(Qe).catch(()=>{}),alert(`Added ${e.fromName} to your contacts!`)}catch(i){console.error("[INVITATIONS] Failed to accept invite:",i),alert("Failed to add contact. Please try again.")}else try{await BL(t),console.log("[INVITATIONS] Invite declined")}catch(i){console.error("[INVITATIONS] Failed to decline invite:",i)}}finally{uc=!1,Yy()}}function rp(){UL((t,e)=>{gl.push({fromUserId:t,inviteData:e}),Yy()}),HL(async(t,e)=>{console.log("[INVITATIONS] Your invite was accepted by:",e.acceptedByName),await pn(Qe).catch(()=>{}),alert(`${e.acceptedByName} accepted your invitation!`)})}window.onload=async()=>{if(!await YD()){Fe&&(Fe.disabled=!0,Fe.title="Initialization failed. Please reload the page or check your camera/microphone permissions."),console.error("Initialization failed. Call functionality disabled. Please reload the page."),alert(`Hangvidu could not initialize properly.

Please check your camera/microphone permissions and reload the page.`);return}WL(_e),await ip().catch(s=>console.warn("Failed to start saved-room listeners",s)),pn(Qe).catch(s=>{console.warn("Failed to render contacts list:",s)});let e=null;const n=Pu(async({isLoggedIn:s,user:r})=>{try{const o=e===null,a=e===!0&&!s,c=e===!1&&s;e=s,await pn(Qe),a?(H("[AUTH] User logged out - cleaning up messaging and listeners"),Ee.reset(),sn.closeAllSessions(),$e.isNotificationEnabled()&&await $e.disable().catch(l=>{console.warn("[AUTH] Failed to disable notifications on logout:",l)}),JD(),al()):c?(H("[AUTH] User logged in - re-attaching incoming listeners"),await ip().catch(l=>console.warn("Failed to re-attach saved-room listeners on login",l)),rp()):o&&s&&(H("[AUTH] Initial load with logged-in user"),rp())}catch(o){console.warn("Failed to handle auth change:",o)}});cd.push(()=>{try{typeof n=="function"&&n()}catch{}}),await eM()};window.addEventListener("beforeunload",async t=>{const e=_e.getState();if(e.pc&&e.pc.connectionState==="connected")return t.preventDefault(),t.returnValue="You are in an active call. Are you sure you want to leave?",t.returnValue;await tM()});_e.on("memberJoined",({memberId:t,roomId:e})=>{console.debug("CallController memberJoined event",{memberId:t,roomId:e}),_e.setPartnerId(t),Ee.showMessagesToggle(),ma(t,t),Mu().catch(n=>console.warn("Failed to clear calling state:",n)),XD(e).catch(n=>console.warn("Failed to save recent call:",n))});_e.on("memberLeft",({memberId:t})=>{console.info("Partner has left the call")});_e.on("cleanup",async({roomId:t,partnerId:e,reason:n,role:i,wasConnected:s})=>{if(i==="initiator"&&!e&&!s&&t){console.log("[MAIN] Potential missed call detected for room:",t);try{const{getContactByRoomId:a}=await Pe(async()=>{const{getContactByRoomId:l}=await Promise.resolve().then(()=>ll);return{getContactByRoomId:l}},void 0),c=await a(t);if(c&&c.contactId){const{getCurrentUser:l}=await Pe(async()=>{const{getCurrentUser:h}=await Promise.resolve().then(()=>Lu);return{getCurrentUser:h}},void 0),d=l()?.displayName||"Friend";console.log(`[MAIN] Sending missed call notification to ${c.contactName} (${c.contactId})`),await $e.sendMissedCallNotification(c.contactId,{roomId:t,callerId:ge(),callerName:d})}else console.log("[MAIN] No saved contact found for room, skipping missed call notification")}catch(a){console.warn("[MAIN] Failed to handle missed call:",a)}}t&&$e.isNotificationEnabled()&&$e.dismissCallNotifications(t).catch(a=>{console.warn("[MAIN] Failed to dismiss call notifications:",a)});const o=_e.getState();o.messagesUI&&typeof o.messagesUI.cleanup=="function"&&(o.messagesUI.cleanup(),o.messagesUI=null),K_(),ua(),e&&t&&setTimeout(()=>{yy(e,t,Qe).catch(a=>{console.warn("Failed to save contact after cleanup:",a)})},500)});async function tM(){await _e.hangUp({emitCancel:!0,reason:"page_unload"}),DL(),$A(),document.pictureInPictureElement&&document.exitPictureInPicture().catch(e=>console.error(e));const t=_e.getState();t.messagesUI&&t.messagesUI.cleanup&&t.messagesUI.cleanup(),window.history.replaceState({},document.title,window.location.pathname),F.src="",J_(),je&&je.srcObject&&(je.srcObject=null),ae&&ae.srcObject&&(ae.srcObject=null),Is(),R0("none"),qu(),eO(),ua(),X_(!1),cd.forEach(e=>e())}const nM=Object.freeze(Object.defineProperty({__proto__:null,joinOrCreateRoomWithId:fr,listenForIncomingOnRoom:Bi,resetLocalStreamInitFlag:jy},Symbol.toStringTag,{value:"Module"}));export{Pe as _,Xu as c,H as d,w as h,iM as i,sO as n,D as s};
