(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))i(s);new MutationObserver(s=>{for(const r of s)if(r.type==="childList")for(const o of r.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&i(o)}).observe(document,{childList:!0,subtree:!0});function n(s){const r={};return s.integrity&&(r.integrity=s.integrity),s.referrerPolicy&&(r.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?r.credentials="include":s.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function i(s){if(s.ep)return;s.ep=!0;const r=n(s);fetch(s.href,r)}})();const hw="modulepreload",fw=function(t){return"/HangVidU/"+t},md={},Le=function(e,n,i){let s=Promise.resolve();if(n&&n.length>0){let c=function(l){return Promise.all(l.map(u=>Promise.resolve(u).then(d=>({status:"fulfilled",value:d}),d=>({status:"rejected",reason:d}))))};document.getElementsByTagName("link");const o=document.querySelector("meta[property=csp-nonce]"),a=o?.nonce||o?.getAttribute("nonce");s=c(n.map(l=>{if(l=fw(l),l in md)return;md[l]=!0;const u=l.endsWith(".css"),d=u?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${l}"]${d}`))return;const h=document.createElement("link");if(h.rel=u?"stylesheet":hw,u||(h.as="script"),h.crossOrigin="",h.href=l,a&&h.setAttribute("nonce",a),document.head.appendChild(h),u)return new Promise((f,p)=>{h.addEventListener("load",f),h.addEventListener("error",()=>p(new Error(`Unable to preload CSS for ${l}`)))})}))}function r(o){const a=new Event("vite:preloadError",{cancelable:!0});if(a.payload=o,window.dispatchEvent(a),!a.defaultPrevented)throw o}return s.then(o=>{for(const a of o||[])a.status==="rejected"&&r(a.reason);return e().catch(r)})},R=typeof __SENTRY_DEBUG__>"u"||__SENTRY_DEBUG__,H=globalThis,Fn="10.34.0";function No(){return Po(H),H}function Po(t){const e=t.__SENTRY__=t.__SENTRY__||{};return e.version=e.version||Fn,e[Fn]=e[Fn]||{}}function Hi(t,e,n=H){const i=n.__SENTRY__=n.__SENTRY__||{},s=i[Fn]=i[Fn]||{};return s[t]||(s[t]=e())}const pw=["debug","info","warn","error","log","assert","trace"],gw="Sentry Logger ",Wr={};function Vi(t){if(!("console"in H))return t();const e=H.console,n={},i=Object.keys(Wr);i.forEach(s=>{const r=Wr[s];n[s]=e[s],e[s]=r});try{return t()}finally{i.forEach(s=>{e[s]=n[s]})}}function mw(){wl().enabled=!0}function _w(){wl().enabled=!1}function lp(){return wl().enabled}function yw(...t){yl("log",...t)}function ww(...t){yl("warn",...t)}function vw(...t){yl("error",...t)}function yl(t,...e){R&&lp()&&Vi(()=>{H.console[t](`${gw}[${t}]:`,...e)})}function wl(){return R?Hi("loggerSettings",()=>({enabled:!1})):{enabled:!1}}const T={enable:mw,disable:_w,isEnabled:lp,log:yw,warn:ww,error:vw},up=50,Bn="?",_d=/\(error: (.*)\)/,yd=/captureMessage|captureException/;function dp(...t){const e=t.sort((n,i)=>n[0]-i[0]).map(n=>n[1]);return(n,i=0,s=0)=>{const r=[],o=n.split(`
`);for(let a=i;a<o.length;a++){let c=o[a];c.length>1024&&(c=c.slice(0,1024));const l=_d.test(c)?c.replace(_d,"$1"):c;if(!l.match(/\S*Error: /)){for(const u of e){const d=u(l);if(d){r.push(d);break}}if(r.length>=up+s)break}}return Ew(r.slice(s))}}function bw(t){return Array.isArray(t)?dp(...t):t}function Ew(t){if(!t.length)return[];const e=Array.from(t);return/sentryWrapped/.test(mr(e).function||"")&&e.pop(),e.reverse(),yd.test(mr(e).function||"")&&(e.pop(),yd.test(mr(e).function||"")&&e.pop()),e.slice(0,up).map(n=>({...n,filename:n.filename||mr(e).filename,function:n.function||Bn}))}function mr(t){return t[t.length-1]||{}}const Ia="<anonymous>";function cn(t){try{return!t||typeof t!="function"?Ia:t.name||Ia}catch{return Ia}}function wd(t){const e=t.exception;if(e){const n=[];try{return e.values.forEach(i=>{i.stacktrace.frames&&n.push(...i.stacktrace.frames)}),n}catch{return}}}function hp(t){return"__v_isVNode"in t&&t.__v_isVNode?"[VueVNode]":"[VueViewModel]"}const Ar={},vd={};function Qn(t,e){Ar[t]=Ar[t]||[],Ar[t].push(e)}function Zn(t,e){if(!vd[t]){vd[t]=!0;try{e()}catch(n){R&&T.error(`Error while instrumenting ${t}`,n)}}}function lt(t,e){const n=t&&Ar[t];if(n)for(const i of n)try{i(e)}catch(s){R&&T.error(`Error while triggering instrumentation handler.
Type: ${t}
Name: ${cn(i)}
Error:`,s)}}let ka=null;function Cw(t){const e="error";Qn(e,t),Zn(e,Tw)}function Tw(){ka=H.onerror,H.onerror=function(t,e,n,i,s){return lt("error",{column:i,error:s,line:n,msg:t,url:e}),ka?ka.apply(this,arguments):!1},H.onerror.__SENTRY_INSTRUMENTED__=!0}let Ra=null;function Sw(t){const e="unhandledrejection";Qn(e,t),Zn(e,Iw)}function Iw(){Ra=H.onunhandledrejection,H.onunhandledrejection=function(t){return lt("unhandledrejection",t),Ra?Ra.apply(this,arguments):!0},H.onunhandledrejection.__SENTRY_INSTRUMENTED__=!0}const fp=Object.prototype.toString;function Lo(t){switch(fp.call(t)){case"[object Error]":case"[object Exception]":case"[object DOMException]":case"[object WebAssembly.Exception]":return!0;default:return ln(t,Error)}}function Wi(t,e){return fp.call(t)===`[object ${e}]`}function pp(t){return Wi(t,"ErrorEvent")}function bd(t){return Wi(t,"DOMError")}function kw(t){return Wi(t,"DOMException")}function Ot(t){return Wi(t,"String")}function vl(t){return typeof t=="object"&&t!==null&&"__sentry_template_string__"in t&&"__sentry_template_values__"in t}function Oo(t){return t===null||vl(t)||typeof t!="object"&&typeof t!="function"}function Ps(t){return Wi(t,"Object")}function Do(t){return typeof Event<"u"&&ln(t,Event)}function Rw(t){return typeof Element<"u"&&ln(t,Element)}function Aw(t){return Wi(t,"RegExp")}function Qs(t){return!!(t?.then&&typeof t.then=="function")}function Nw(t){return Ps(t)&&"nativeEvent"in t&&"preventDefault"in t&&"stopPropagation"in t}function ln(t,e){try{return t instanceof e}catch{return!1}}function gp(t){return!!(typeof t=="object"&&t!==null&&(t.__isVue||t._isVue||t.__v_isVNode))}function mp(t){return typeof Request<"u"&&ln(t,Request)}const bl=H,Pw=80;function _p(t,e={}){if(!t)return"<unknown>";try{let n=t;const i=5,s=[];let r=0,o=0;const a=" > ",c=a.length;let l;const u=Array.isArray(e)?e:e.keyAttrs,d=!Array.isArray(e)&&e.maxStringLength||Pw;for(;n&&r++<i&&(l=Lw(n,u),!(l==="html"||r>1&&o+s.length*c+l.length>=d));)s.push(l),o+=l.length,n=n.parentNode;return s.reverse().join(a)}catch{return"<unknown>"}}function Lw(t,e){const n=t,i=[];if(!n?.tagName)return"";if(bl.HTMLElement&&n instanceof HTMLElement&&n.dataset){if(n.dataset.sentryComponent)return n.dataset.sentryComponent;if(n.dataset.sentryElement)return n.dataset.sentryElement}i.push(n.tagName.toLowerCase());const s=e?.length?e.filter(o=>n.getAttribute(o)).map(o=>[o,n.getAttribute(o)]):null;if(s?.length)s.forEach(o=>{i.push(`[${o[0]}="${o[1]}"]`)});else{n.id&&i.push(`#${n.id}`);const o=n.className;if(o&&Ot(o)){const a=o.split(/\s+/);for(const c of a)i.push(`.${c}`)}}const r=["aria-label","type","name","title","alt"];for(const o of r){const a=n.getAttribute(o);a&&i.push(`[${o}="${a}"]`)}return i.join("")}function El(){try{return bl.document.location.href}catch{return""}}function Ow(t){if(!bl.HTMLElement)return null;let e=t;const n=5;for(let i=0;i<n;i++){if(!e)return null;if(e instanceof HTMLElement){if(e.dataset.sentryComponent)return e.dataset.sentryComponent;if(e.dataset.sentryElement)return e.dataset.sentryElement}e=e.parentNode}return null}function Ve(t,e,n){if(!(e in t))return;const i=t[e];if(typeof i!="function")return;const s=n(i);typeof s=="function"&&yp(s,i);try{t[e]=s}catch{R&&T.log(`Failed to replace method "${e}" in object`,t)}}function un(t,e,n){try{Object.defineProperty(t,e,{value:n,writable:!0,configurable:!0})}catch{R&&T.log(`Failed to add non-enumerable property "${e}" to object`,t)}}function yp(t,e){try{const n=e.prototype||{};t.prototype=e.prototype=n,un(t,"__sentry_original__",e)}catch{}}function Cl(t){return t.__sentry_original__}function wp(t){if(Lo(t))return{message:t.message,name:t.name,stack:t.stack,...Cd(t)};if(Do(t)){const e={type:t.type,target:Ed(t.target),currentTarget:Ed(t.currentTarget),...Cd(t)};return typeof CustomEvent<"u"&&ln(t,CustomEvent)&&(e.detail=t.detail),e}else return t}function Ed(t){try{return Rw(t)?_p(t):Object.prototype.toString.call(t)}catch{return"<unknown>"}}function Cd(t){if(typeof t=="object"&&t!==null){const e={};for(const n in t)Object.prototype.hasOwnProperty.call(t,n)&&(e[n]=t[n]);return e}else return{}}function Dw(t){const e=Object.keys(wp(t));return e.sort(),e[0]?e.join(", "):"[object has no keys]"}let ii;function Mo(t){if(ii!==void 0)return ii?ii(t):t();const e=Symbol.for("__SENTRY_SAFE_RANDOM_ID_WRAPPER__"),n=H;return e in n&&typeof n[e]=="function"?(ii=n[e],ii(t)):(ii=null,t())}function jr(){return Mo(()=>Math.random())}function xo(){return Mo(()=>Date.now())}function pc(t,e=0){return typeof t!="string"||e===0||t.length<=e?t:`${t.slice(0,e)}...`}function Td(t,e){if(!Array.isArray(t))return"";const n=[];for(let i=0;i<t.length;i++){const s=t[i];try{gp(s)?n.push(hp(s)):n.push(String(s))}catch{n.push("[value cannot be serialized]")}}return n.join(e)}function Nr(t,e,n=!1){return Ot(t)?Aw(e)?e.test(t):Ot(e)?n?t===e:t.includes(e):!1:!1}function Fo(t,e=[],n=!1){return e.some(i=>Nr(t,i,n))}function Mw(){const t=H;return t.crypto||t.msCrypto}let Aa;function xw(){return jr()*16}function Ke(t=Mw()){try{if(t?.randomUUID)return Mo(()=>t.randomUUID()).replace(/-/g,"")}catch{}return Aa||(Aa="10000000100040008000"+1e11),Aa.replace(/[018]/g,e=>(e^(xw()&15)>>e/4).toString(16))}function vp(t){return t.exception?.values?.[0]}function Pn(t){const{message:e,event_id:n}=t;if(e)return e;const i=vp(t);return i?i.type&&i.value?`${i.type}: ${i.value}`:i.type||i.value||n||"<unknown>":n||"<unknown>"}function gc(t,e,n){const i=t.exception=t.exception||{},s=i.values=i.values||[],r=s[0]=s[0]||{};r.value||(r.value=e||""),r.type||(r.type="Error")}function Ii(t,e){const n=vp(t);if(!n)return;const i={type:"generic",handled:!0},s=n.mechanism;if(n.mechanism={...i,...s,...e},e&&"data"in e){const r={...s?.data,...e.data};n.mechanism.data=r}}function Sd(t){if(Fw(t))return!0;try{un(t,"__sentry_captured__",!0)}catch{}return!1}function Fw(t){try{return t.__sentry_captured__}catch{}}const bp=1e3;function Zs(){return xo()/bp}function Uw(){const{performance:t}=H;if(!t?.now||!t.timeOrigin)return Zs;const e=t.timeOrigin;return()=>(e+Mo(()=>t.now()))/bp}let Id;function Dt(){return(Id??(Id=Uw()))()}function $w(t){const e=Dt(),n={sid:Ke(),init:!0,timestamp:e,started:e,duration:0,status:"ok",errors:0,ignoreDuration:!1,toJSON:()=>Hw(n)};return t&&ki(n,t),n}function ki(t,e={}){if(e.user&&(!t.ipAddress&&e.user.ip_address&&(t.ipAddress=e.user.ip_address),!t.did&&!e.did&&(t.did=e.user.id||e.user.email||e.user.username)),t.timestamp=e.timestamp||Dt(),e.abnormal_mechanism&&(t.abnormal_mechanism=e.abnormal_mechanism),e.ignoreDuration&&(t.ignoreDuration=e.ignoreDuration),e.sid&&(t.sid=e.sid.length===32?e.sid:Ke()),e.init!==void 0&&(t.init=e.init),!t.did&&e.did&&(t.did=`${e.did}`),typeof e.started=="number"&&(t.started=e.started),t.ignoreDuration)t.duration=void 0;else if(typeof e.duration=="number")t.duration=e.duration;else{const n=t.timestamp-t.started;t.duration=n>=0?n:0}e.release&&(t.release=e.release),e.environment&&(t.environment=e.environment),!t.ipAddress&&e.ipAddress&&(t.ipAddress=e.ipAddress),!t.userAgent&&e.userAgent&&(t.userAgent=e.userAgent),typeof e.errors=="number"&&(t.errors=e.errors),e.status&&(t.status=e.status)}function Bw(t,e){let n={};t.status==="ok"&&(n={status:"exited"}),ki(t,n)}function Hw(t){return{sid:`${t.sid}`,init:t.init,started:new Date(t.started*1e3).toISOString(),timestamp:new Date(t.timestamp*1e3).toISOString(),status:t.status,errors:t.errors,did:typeof t.did=="number"||typeof t.did=="string"?`${t.did}`:void 0,duration:t.duration,abnormal_mechanism:t.abnormal_mechanism,attrs:{release:t.release,environment:t.environment,ip_address:t.ipAddress,user_agent:t.userAgent}}}function er(t,e,n=2){if(!e||typeof e!="object"||n<=0)return e;if(t&&Object.keys(e).length===0)return t;const i={...t};for(const s in e)Object.prototype.hasOwnProperty.call(e,s)&&(i[s]=er(i[s],e[s],n-1));return i}function kd(){return Ke()}function Ep(){return Ke().substring(16)}const mc="_sentrySpan";function Rd(t,e){e?un(t,mc,e):delete t[mc]}function Ad(t){return t[mc]}const Vw=100;class Ft{constructor(){this._notifyingListeners=!1,this._scopeListeners=[],this._eventProcessors=[],this._breadcrumbs=[],this._attachments=[],this._user={},this._tags={},this._attributes={},this._extra={},this._contexts={},this._sdkProcessingMetadata={},this._propagationContext={traceId:kd(),sampleRand:jr()}}clone(){const e=new Ft;return e._breadcrumbs=[...this._breadcrumbs],e._tags={...this._tags},e._attributes={...this._attributes},e._extra={...this._extra},e._contexts={...this._contexts},this._contexts.flags&&(e._contexts.flags={values:[...this._contexts.flags.values]}),e._user=this._user,e._level=this._level,e._session=this._session,e._transactionName=this._transactionName,e._fingerprint=this._fingerprint,e._eventProcessors=[...this._eventProcessors],e._attachments=[...this._attachments],e._sdkProcessingMetadata={...this._sdkProcessingMetadata},e._propagationContext={...this._propagationContext},e._client=this._client,e._lastEventId=this._lastEventId,Rd(e,Ad(this)),e}setClient(e){this._client=e}setLastEventId(e){this._lastEventId=e}getClient(){return this._client}lastEventId(){return this._lastEventId}addScopeListener(e){this._scopeListeners.push(e)}addEventProcessor(e){return this._eventProcessors.push(e),this}setUser(e){return this._user=e||{email:void 0,id:void 0,ip_address:void 0,username:void 0},this._session&&ki(this._session,{user:e}),this._notifyScopeListeners(),this}getUser(){return this._user}setTags(e){return this._tags={...this._tags,...e},this._notifyScopeListeners(),this}setTag(e,n){return this.setTags({[e]:n})}setAttributes(e){return this._attributes={...this._attributes,...e},this._notifyScopeListeners(),this}setAttribute(e,n){return this.setAttributes({[e]:n})}removeAttribute(e){return e in this._attributes&&(delete this._attributes[e],this._notifyScopeListeners()),this}setExtras(e){return this._extra={...this._extra,...e},this._notifyScopeListeners(),this}setExtra(e,n){return this._extra={...this._extra,[e]:n},this._notifyScopeListeners(),this}setFingerprint(e){return this._fingerprint=e,this._notifyScopeListeners(),this}setLevel(e){return this._level=e,this._notifyScopeListeners(),this}setTransactionName(e){return this._transactionName=e,this._notifyScopeListeners(),this}setContext(e,n){return n===null?delete this._contexts[e]:this._contexts[e]=n,this._notifyScopeListeners(),this}setSession(e){return e?this._session=e:delete this._session,this._notifyScopeListeners(),this}getSession(){return this._session}update(e){if(!e)return this;const n=typeof e=="function"?e(this):e,i=n instanceof Ft?n.getScopeData():Ps(n)?e:void 0,{tags:s,attributes:r,extra:o,user:a,contexts:c,level:l,fingerprint:u=[],propagationContext:d}=i||{};return this._tags={...this._tags,...s},this._attributes={...this._attributes,...r},this._extra={...this._extra,...o},this._contexts={...this._contexts,...c},a&&Object.keys(a).length&&(this._user=a),l&&(this._level=l),u.length&&(this._fingerprint=u),d&&(this._propagationContext=d),this}clear(){return this._breadcrumbs=[],this._tags={},this._attributes={},this._extra={},this._user={},this._contexts={},this._level=void 0,this._transactionName=void 0,this._fingerprint=void 0,this._session=void 0,Rd(this,void 0),this._attachments=[],this.setPropagationContext({traceId:kd(),sampleRand:jr()}),this._notifyScopeListeners(),this}addBreadcrumb(e,n){const i=typeof n=="number"?n:Vw;if(i<=0)return this;const s={timestamp:Zs(),...e,message:e.message?pc(e.message,2048):e.message};return this._breadcrumbs.push(s),this._breadcrumbs.length>i&&(this._breadcrumbs=this._breadcrumbs.slice(-i),this._client?.recordDroppedEvent("buffer_overflow","log_item")),this._notifyScopeListeners(),this}getLastBreadcrumb(){return this._breadcrumbs[this._breadcrumbs.length-1]}clearBreadcrumbs(){return this._breadcrumbs=[],this._notifyScopeListeners(),this}addAttachment(e){return this._attachments.push(e),this}clearAttachments(){return this._attachments=[],this}getScopeData(){return{breadcrumbs:this._breadcrumbs,attachments:this._attachments,contexts:this._contexts,tags:this._tags,attributes:this._attributes,extra:this._extra,user:this._user,level:this._level,fingerprint:this._fingerprint||[],eventProcessors:this._eventProcessors,propagationContext:this._propagationContext,sdkProcessingMetadata:this._sdkProcessingMetadata,transactionName:this._transactionName,span:Ad(this)}}setSDKProcessingMetadata(e){return this._sdkProcessingMetadata=er(this._sdkProcessingMetadata,e,2),this}setPropagationContext(e){return this._propagationContext=e,this}getPropagationContext(){return this._propagationContext}captureException(e,n){const i=n?.event_id||Ke();if(!this._client)return R&&T.warn("No client configured on scope - will not capture exception!"),i;const s=new Error("Sentry syntheticException");return this._client.captureException(e,{originalException:e,syntheticException:s,...n,event_id:i},this),i}captureMessage(e,n,i){const s=i?.event_id||Ke();if(!this._client)return R&&T.warn("No client configured on scope - will not capture message!"),s;const r=i?.syntheticException??new Error(e);return this._client.captureMessage(e,n,{originalException:e,syntheticException:r,...i,event_id:s},this),s}captureEvent(e,n){const i=n?.event_id||Ke();return this._client?(this._client.captureEvent(e,{...n,event_id:i},this),i):(R&&T.warn("No client configured on scope - will not capture event!"),i)}_notifyScopeListeners(){this._notifyingListeners||(this._notifyingListeners=!0,this._scopeListeners.forEach(e=>{e(this)}),this._notifyingListeners=!1)}}function Ww(){return Hi("defaultCurrentScope",()=>new Ft)}function jw(){return Hi("defaultIsolationScope",()=>new Ft)}class qw{constructor(e,n){let i;e?i=e:i=new Ft;let s;n?s=n:s=new Ft,this._stack=[{scope:i}],this._isolationScope=s}withScope(e){const n=this._pushScope();let i;try{i=e(n)}catch(s){throw this._popScope(),s}return Qs(i)?i.then(s=>(this._popScope(),s),s=>{throw this._popScope(),s}):(this._popScope(),i)}getClient(){return this.getStackTop().client}getScope(){return this.getStackTop().scope}getIsolationScope(){return this._isolationScope}getStackTop(){return this._stack[this._stack.length-1]}_pushScope(){const e=this.getScope().clone();return this._stack.push({client:this.getClient(),scope:e}),e}_popScope(){return this._stack.length<=1?!1:!!this._stack.pop()}}function Ri(){const t=No(),e=Po(t);return e.stack=e.stack||new qw(Ww(),jw())}function zw(t){return Ri().withScope(t)}function Gw(t,e){const n=Ri();return n.withScope(()=>(n.getStackTop().scope=t,e(t)))}function Nd(t){return Ri().withScope(()=>t(Ri().getIsolationScope()))}function Kw(){return{withIsolationScope:Nd,withScope:zw,withSetScope:Gw,withSetIsolationScope:(t,e)=>Nd(e),getCurrentScope:()=>Ri().getScope(),getIsolationScope:()=>Ri().getIsolationScope()}}function Tl(t){const e=Po(t);return e.acs?e.acs:Kw()}function yn(){const t=No();return Tl(t).getCurrentScope()}function tr(){const t=No();return Tl(t).getIsolationScope()}function Yw(){return Hi("globalScope",()=>new Ft)}function Jw(...t){const e=No(),n=Tl(e);if(t.length===2){const[i,s]=t;return i?n.withSetScope(i,s):n.withScope(s)}return n.withScope(t[0])}function Te(){return yn().getClient()}function Xw(t){const e=t.getPropagationContext(),{traceId:n,parentSpanId:i,propagationSpanId:s}=e,r={trace_id:n,span_id:s||Ep()};return i&&(r.parent_span_id=i),r}const Qw="sentry.source",Zw="sentry.sample_rate",ev="sentry.previous_trace_sample_rate",tv="sentry.op",nv="sentry.origin",Cp="sentry.profile_id",Tp="sentry.exclusive_time",iv=0,sv=1,rv="_sentryScope",ov="_sentryIsolationScope";function av(t){if(t){if(typeof t=="object"&&"deref"in t&&typeof t.deref=="function")try{return t.deref()}catch{return}return t}}function Sp(t){const e=t;return{scope:e[rv],isolationScope:av(e[ov])}}const cv="sentry-",lv=/^sentry-/;function uv(t){const e=dv(t);if(!e)return;const n=Object.entries(e).reduce((i,[s,r])=>{if(s.match(lv)){const o=s.slice(cv.length);i[o]=r}return i},{});if(Object.keys(n).length>0)return n}function dv(t){if(!(!t||!Ot(t)&&!Array.isArray(t)))return Array.isArray(t)?t.reduce((e,n)=>{const i=Pd(n);return Object.entries(i).forEach(([s,r])=>{e[s]=r}),e},{}):Pd(t)}function Pd(t){return t.split(",").map(e=>{const n=e.indexOf("=");if(n===-1)return[];const i=e.slice(0,n),s=e.slice(n+1);return[i,s].map(r=>{try{return decodeURIComponent(r.trim())}catch{return}})}).reduce((e,[n,i])=>(n&&i&&(e[n]=i),e),{})}const hv=/^o(\d+)\./,fv=/^(?:(\w+):)\/\/(?:(\w+)(?::(\w+)?)?@)((?:\[[:.%\w]+\]|[\w.-]+))(?::(\d+))?\/(.+)/;function pv(t){return t==="http"||t==="https"}function nr(t,e=!1){const{host:n,path:i,pass:s,port:r,projectId:o,protocol:a,publicKey:c}=t;return`${a}://${c}${e&&s?`:${s}`:""}@${n}${r?`:${r}`:""}/${i&&`${i}/`}${o}`}function gv(t){const e=fv.exec(t);if(!e){Vi(()=>{console.error(`Invalid Sentry Dsn: ${t}`)});return}const[n,i,s="",r="",o="",a=""]=e.slice(1);let c="",l=a;const u=l.split("/");if(u.length>1&&(c=u.slice(0,-1).join("/"),l=u.pop()),l){const d=l.match(/^\d+/);d&&(l=d[0])}return Ip({host:r,pass:s,path:c,projectId:l,port:o,protocol:n,publicKey:i})}function Ip(t){return{protocol:t.protocol,publicKey:t.publicKey||"",pass:t.pass||"",host:t.host,port:t.port||"",path:t.path||"",projectId:t.projectId}}function mv(t){if(!R)return!0;const{port:e,projectId:n,protocol:i}=t;return["protocol","publicKey","host","projectId"].find(o=>t[o]?!1:(T.error(`Invalid Sentry Dsn: ${o} missing`),!0))?!1:n.match(/^\d+$/)?pv(i)?e&&isNaN(parseInt(e,10))?(T.error(`Invalid Sentry Dsn: Invalid port ${e}`),!1):!0:(T.error(`Invalid Sentry Dsn: Invalid protocol ${i}`),!1):(T.error(`Invalid Sentry Dsn: Invalid projectId ${n}`),!1)}function _v(t){return t.match(hv)?.[1]}function yv(t){const e=t.getOptions(),{host:n}=t.getDsn()||{};let i;return e.orgId?i=String(e.orgId):n&&(i=_v(n)),i}function wv(t){const e=typeof t=="string"?gv(t):Ip(t);if(!(!e||!mv(e)))return e}function vv(t){if(typeof t=="boolean")return Number(t);const e=typeof t=="string"?parseFloat(t):t;if(!(typeof e!="number"||isNaN(e)||e<0||e>1))return e}const kp=1;let Ld=!1;function bv(t){const{spanId:e,traceId:n,isRemote:i}=t.spanContext(),s=i?e:Sl(t).parent_span_id,r=Sp(t).scope,o=i?r?.getPropagationContext().propagationSpanId||Ep():e;return{parent_span_id:s,span_id:o,trace_id:n}}function Ev(t){if(t&&t.length>0)return t.map(({context:{spanId:e,traceId:n,traceFlags:i,...s},attributes:r})=>({span_id:e,trace_id:n,sampled:i===kp,attributes:r,...s}))}function Od(t){return typeof t=="number"?Dd(t):Array.isArray(t)?t[0]+t[1]/1e9:t instanceof Date?Dd(t.getTime()):Dt()}function Dd(t){return t>9999999999?t/1e3:t}function Sl(t){if(Tv(t))return t.getSpanJSON();const{spanId:e,traceId:n}=t.spanContext();if(Cv(t)){const{attributes:i,startTime:s,name:r,endTime:o,status:a,links:c}=t,l="parentSpanId"in t?t.parentSpanId:"parentSpanContext"in t?t.parentSpanContext?.spanId:void 0;return{span_id:e,trace_id:n,data:i,description:r,parent_span_id:l,start_timestamp:Od(s),timestamp:Od(o)||void 0,status:Iv(a),op:i[tv],origin:i[nv],links:Ev(c)}}return{span_id:e,trace_id:n,start_timestamp:0,data:{}}}function Cv(t){const e=t;return!!e.attributes&&!!e.startTime&&!!e.name&&!!e.endTime&&!!e.status}function Tv(t){return typeof t.getSpanJSON=="function"}function Sv(t){const{traceFlags:e}=t.spanContext();return e===kp}function Iv(t){if(!(!t||t.code===iv))return t.code===sv?"ok":t.message||"internal_error"}const kv="_sentryRootSpan";function Rp(t){return t[kv]||t}function Md(){Ld||(Vi(()=>{console.warn("[Sentry] Returning null from `beforeSendSpan` is disallowed. To drop certain spans, configure the respective integrations directly or use `ignoreSpans`.")}),Ld=!0)}function Rv(t){if(typeof __SENTRY_TRACING__=="boolean"&&!__SENTRY_TRACING__)return!1;const e=Te()?.getOptions();return!!e&&(e.tracesSampleRate!=null||!!e.tracesSampler)}function xd(t){T.log(`Ignoring span ${t.op} - ${t.description} because it matches \`ignoreSpans\`.`)}function Fd(t,e){if(!e?.length||!t.description)return!1;for(const n of e){if(Nv(n)){if(Nr(t.description,n))return R&&xd(t),!0;continue}if(!n.name&&!n.op)continue;const i=n.name?Nr(t.description,n.name):!0,s=n.op?t.op&&Nr(t.op,n.op):!0;if(i&&s)return R&&xd(t),!0}return!1}function Av(t,e){const n=e.parent_span_id,i=e.span_id;if(n)for(const s of t)s.parent_span_id===i&&(s.parent_span_id=n)}function Nv(t){return typeof t=="string"||t instanceof RegExp}const Il="production",Pv="_frozenDsc";function Ap(t,e){const n=e.getOptions(),{publicKey:i}=e.getDsn()||{},s={environment:n.environment||Il,release:n.release,public_key:i,trace_id:t,org_id:yv(e)};return e.emit("createDsc",s),s}function Lv(t,e){const n=e.getPropagationContext();return n.dsc||Ap(n.traceId,t)}function Ov(t){const e=Te();if(!e)return{};const n=Rp(t),i=Sl(n),s=i.data,r=n.spanContext().traceState,o=r?.get("sentry.sample_rate")??s[Zw]??s[ev];function a(p){return(typeof o=="number"||typeof o=="string")&&(p.sample_rate=`${o}`),p}const c=n[Pv];if(c)return a(c);const l=r?.get("sentry.dsc"),u=l&&uv(l);if(u)return a(u);const d=Ap(t.spanContext().traceId,e),h=s[Qw],f=i.description;return h!=="url"&&f&&(d.transaction=f),Rv()&&(d.sampled=String(Sv(n)),d.sample_rand=r?.get("sentry.sample_rand")??Sp(n).scope?.getPropagationContext().sampleRand.toString()),a(d),e.emit("createDsc",d,n),d}function Tt(t,e=100,n=1/0){try{return _c("",t,e,n)}catch(i){return{ERROR:`**non-serializable** (${i})`}}}function Np(t,e=3,n=100*1024){const i=Tt(t,e);return Fv(i)>n?Np(t,e-1,n):i}function _c(t,e,n=1/0,i=1/0,s=Uv()){const[r,o]=s;if(e==null||["boolean","string"].includes(typeof e)||typeof e=="number"&&Number.isFinite(e))return e;const a=Dv(t,e);if(!a.startsWith("[object "))return a;if(e.__sentry_skip_normalization__)return e;const c=typeof e.__sentry_override_normalization_depth__=="number"?e.__sentry_override_normalization_depth__:n;if(c===0)return a.replace("object ","");if(r(e))return"[Circular ~]";const l=e;if(l&&typeof l.toJSON=="function")try{const f=l.toJSON();return _c("",f,c-1,i,s)}catch{}const u=Array.isArray(e)?[]:{};let d=0;const h=wp(e);for(const f in h){if(!Object.prototype.hasOwnProperty.call(h,f))continue;if(d>=i){u[f]="[MaxProperties ~]";break}const p=h[f];u[f]=_c(f,p,c-1,i,s),d++}return o(e),u}function Dv(t,e){try{if(t==="domain"&&e&&typeof e=="object"&&e._events)return"[Domain]";if(t==="domainEmitter")return"[DomainEmitter]";if(typeof global<"u"&&e===global)return"[Global]";if(typeof window<"u"&&e===window)return"[Window]";if(typeof document<"u"&&e===document)return"[Document]";if(gp(e))return hp(e);if(Nw(e))return"[SyntheticEvent]";if(typeof e=="number"&&!Number.isFinite(e))return`[${e}]`;if(typeof e=="function")return`[Function: ${cn(e)}]`;if(typeof e=="symbol")return`[${String(e)}]`;if(typeof e=="bigint")return`[BigInt: ${String(e)}]`;const n=Mv(e);return/^HTML(\w*)Element$/.test(n)?`[HTMLElement: ${n}]`:`[object ${n}]`}catch(n){return`**non-serializable** (${n})`}}function Mv(t){const e=Object.getPrototypeOf(t);return e?.constructor?e.constructor.name:"null prototype"}function xv(t){return~-encodeURI(t).split(/%..|./).length}function Fv(t){return xv(JSON.stringify(t))}function Uv(){const t=new WeakSet;function e(i){return t.has(i)?!0:(t.add(i),!1)}function n(i){t.delete(i)}return[e,n]}function ji(t,e=[]){return[t,e]}function $v(t,e){const[n,i]=t;return[n,[...i,e]]}function yc(t,e){const n=t[1];for(const i of n){const s=i[0].type;if(e(i,s))return!0}return!1}function Bv(t,e){return yc(t,(n,i)=>e.includes(i))}function wc(t){const e=Po(H);return e.encodePolyfill?e.encodePolyfill(t):new TextEncoder().encode(t)}function Hv(t){const[e,n]=t;let i=JSON.stringify(e);function s(r){typeof i=="string"?i=typeof r=="string"?i+r:[wc(i),r]:i.push(typeof r=="string"?wc(r):r)}for(const r of n){const[o,a]=r;if(s(`
${JSON.stringify(o)}
`),typeof a=="string"||a instanceof Uint8Array)s(a);else{let c;try{c=JSON.stringify(a)}catch{c=JSON.stringify(Tt(a))}s(c)}}return typeof i=="string"?i:Vv(i)}function Vv(t){const e=t.reduce((s,r)=>s+r.length,0),n=new Uint8Array(e);let i=0;for(const s of t)n.set(s,i),i+=s.length;return n}function Wv(t){const e=typeof t.data=="string"?wc(t.data):t.data;return[{type:"attachment",length:e.length,filename:t.filename,content_type:t.contentType,attachment_type:t.attachmentType},e]}const jv={session:"session",sessions:"session",attachment:"attachment",transaction:"transaction",event:"error",client_report:"internal",user_report:"default",profile:"profile",profile_chunk:"profile",replay_event:"replay",replay_recording:"replay",check_in:"monitor",feedback:"feedback",span:"span",raw_security:"security",log:"log_item",metric:"metric",trace_metric:"metric"};function Ud(t){return jv[t]}function Pp(t){if(!t?.sdk)return;const{name:e,version:n}=t.sdk;return{name:e,version:n}}function qv(t,e,n,i){const s=t.sdkProcessingMetadata?.dynamicSamplingContext;return{event_id:t.event_id,sent_at:new Date().toISOString(),...e&&{sdk:e},...!!n&&i&&{dsn:nr(i)},...s&&{trace:s}}}function zv(t,e){if(!e)return t;const n=t.sdk||{};return t.sdk={...n,name:n.name||e.name,version:n.version||e.version,integrations:[...t.sdk?.integrations||[],...e.integrations||[]],packages:[...t.sdk?.packages||[],...e.packages||[]],settings:t.sdk?.settings||e.settings?{...t.sdk?.settings,...e.settings}:void 0},t}function Gv(t,e,n,i){const s=Pp(n),r={sent_at:new Date().toISOString(),...s&&{sdk:s},...!!i&&e&&{dsn:nr(e)}},o="aggregates"in t?[{type:"sessions"},t]:[{type:"session"},t.toJSON()];return ji(r,[o])}function Kv(t,e,n,i){const s=Pp(n),r=t.type&&t.type!=="replay_event"?t.type:"event";zv(t,n?.sdk);const o=qv(t,s,i,e);return delete t.sdkProcessingMetadata,ji(o,[[{type:r},t]])}const Na=0,$d=1,Bd=2;function Uo(t){return new Ls(e=>{e(t)})}function kl(t){return new Ls((e,n)=>{n(t)})}class Ls{constructor(e){this._state=Na,this._handlers=[],this._runExecutor(e)}then(e,n){return new Ls((i,s)=>{this._handlers.push([!1,r=>{if(!e)i(r);else try{i(e(r))}catch(o){s(o)}},r=>{if(!n)s(r);else try{i(n(r))}catch(o){s(o)}}]),this._executeHandlers()})}catch(e){return this.then(n=>n,e)}finally(e){return new Ls((n,i)=>{let s,r;return this.then(o=>{r=!1,s=o,e&&e()},o=>{r=!0,s=o,e&&e()}).then(()=>{if(r){i(s);return}n(s)})})}_executeHandlers(){if(this._state===Na)return;const e=this._handlers.slice();this._handlers=[],e.forEach(n=>{n[0]||(this._state===$d&&n[1](this._value),this._state===Bd&&n[2](this._value),n[0]=!0)})}_runExecutor(e){const n=(r,o)=>{if(this._state===Na){if(Qs(o)){o.then(i,s);return}this._state=r,this._value=o,this._executeHandlers()}},i=r=>{n($d,r)},s=r=>{n(Bd,r)};try{e(i,s)}catch(r){s(r)}}}function Yv(t,e,n,i=0){try{const s=vc(e,n,t,i);return Qs(s)?s:Uo(s)}catch(s){return kl(s)}}function vc(t,e,n,i){const s=n[i];if(!t||!s)return t;const r=s({...t},e);return R&&r===null&&T.log(`Event processor "${s.id||"?"}" dropped event`),Qs(r)?r.then(o=>vc(o,e,n,i+1)):vc(r,e,n,i+1)}let Sn,Hd,Vd,zt;function Jv(t){const e=H._sentryDebugIds,n=H._debugIds;if(!e&&!n)return{};const i=e?Object.keys(e):[],s=n?Object.keys(n):[];if(zt&&i.length===Hd&&s.length===Vd)return zt;Hd=i.length,Vd=s.length,zt={},Sn||(Sn={});const r=(o,a)=>{for(const c of o){const l=a[c],u=Sn?.[c];if(u&&zt&&l)zt[u[0]]=l,Sn&&(Sn[c]=[u[0],l]);else if(l){const d=t(c);for(let h=d.length-1;h>=0;h--){const p=d[h]?.filename;if(p&&zt&&Sn){zt[p]=l,Sn[c]=[p,l];break}}}}};return e&&r(i,e),n&&r(s,n),zt}function Xv(t,e){const{fingerprint:n,span:i,breadcrumbs:s,sdkProcessingMetadata:r}=e;Zv(t,e),i&&nb(t,i),ib(t,n),eb(t,s),tb(t,r)}function Wd(t,e){const{extra:n,tags:i,attributes:s,user:r,contexts:o,level:a,sdkProcessingMetadata:c,breadcrumbs:l,fingerprint:u,eventProcessors:d,attachments:h,propagationContext:f,transactionName:p,span:_}=e;as(t,"extra",n),as(t,"tags",i),as(t,"attributes",s),as(t,"user",r),as(t,"contexts",o),t.sdkProcessingMetadata=er(t.sdkProcessingMetadata,c,2),a&&(t.level=a),p&&(t.transactionName=p),_&&(t.span=_),l.length&&(t.breadcrumbs=[...t.breadcrumbs,...l]),u.length&&(t.fingerprint=[...t.fingerprint,...u]),d.length&&(t.eventProcessors=[...t.eventProcessors,...d]),h.length&&(t.attachments=[...t.attachments,...h]),t.propagationContext={...t.propagationContext,...f}}function as(t,e,n){t[e]=er(t[e],n,1)}function Qv(t,e){const n=Yw().getScopeData();return t&&Wd(n,t.getScopeData()),e&&Wd(n,e.getScopeData()),n}function Zv(t,e){const{extra:n,tags:i,user:s,contexts:r,level:o,transactionName:a}=e;Object.keys(n).length&&(t.extra={...n,...t.extra}),Object.keys(i).length&&(t.tags={...i,...t.tags}),Object.keys(s).length&&(t.user={...s,...t.user}),Object.keys(r).length&&(t.contexts={...r,...t.contexts}),o&&(t.level=o),a&&t.type!=="transaction"&&(t.transaction=a)}function eb(t,e){const n=[...t.breadcrumbs||[],...e];t.breadcrumbs=n.length?n:void 0}function tb(t,e){t.sdkProcessingMetadata={...t.sdkProcessingMetadata,...e}}function nb(t,e){t.contexts={trace:bv(e),...t.contexts},t.sdkProcessingMetadata={dynamicSamplingContext:Ov(e),...t.sdkProcessingMetadata};const n=Rp(e),i=Sl(n).description;i&&!t.transaction&&t.type==="transaction"&&(t.transaction=i)}function ib(t,e){t.fingerprint=t.fingerprint?Array.isArray(t.fingerprint)?t.fingerprint:[t.fingerprint]:[],e&&(t.fingerprint=t.fingerprint.concat(e)),t.fingerprint.length||delete t.fingerprint}function sb(t,e,n,i,s,r){const{normalizeDepth:o=3,normalizeMaxBreadth:a=1e3}=t,c={...e,event_id:e.event_id||n.event_id||Ke(),timestamp:e.timestamp||Zs()},l=n.integrations||t.integrations.map(m=>m.name);rb(c,t),cb(c,l),s&&s.emit("applyFrameMetadata",e),e.type===void 0&&ob(c,t.stackParser);const u=ub(i,n.captureContext);n.mechanism&&Ii(c,n.mechanism);const d=s?s.getEventProcessors():[],h=Qv(r,u),f=[...n.attachments||[],...h.attachments];f.length&&(n.attachments=f),Xv(c,h);const p=[...d,...h.eventProcessors];return Yv(p,c,n).then(m=>(m&&ab(m),typeof o=="number"&&o>0?lb(m,o,a):m))}function rb(t,e){const{environment:n,release:i,dist:s,maxValueLength:r}=e;t.environment=t.environment||n||Il,!t.release&&i&&(t.release=i),!t.dist&&s&&(t.dist=s);const o=t.request;o?.url&&r&&(o.url=pc(o.url,r)),r&&t.exception?.values?.forEach(a=>{a.value&&(a.value=pc(a.value,r))})}function ob(t,e){const n=Jv(e);t.exception?.values?.forEach(i=>{i.stacktrace?.frames?.forEach(s=>{s.filename&&(s.debug_id=n[s.filename])})})}function ab(t){const e={};if(t.exception?.values?.forEach(i=>{i.stacktrace?.frames?.forEach(s=>{s.debug_id&&(s.abs_path?e[s.abs_path]=s.debug_id:s.filename&&(e[s.filename]=s.debug_id),delete s.debug_id)})}),Object.keys(e).length===0)return;t.debug_meta=t.debug_meta||{},t.debug_meta.images=t.debug_meta.images||[];const n=t.debug_meta.images;Object.entries(e).forEach(([i,s])=>{n.push({type:"sourcemap",code_file:i,debug_id:s})})}function cb(t,e){e.length>0&&(t.sdk=t.sdk||{},t.sdk.integrations=[...t.sdk.integrations||[],...e])}function lb(t,e,n){if(!t)return null;const i={...t,...t.breadcrumbs&&{breadcrumbs:t.breadcrumbs.map(s=>({...s,...s.data&&{data:Tt(s.data,e,n)}}))},...t.user&&{user:Tt(t.user,e,n)},...t.contexts&&{contexts:Tt(t.contexts,e,n)},...t.extra&&{extra:Tt(t.extra,e,n)}};return t.contexts?.trace&&i.contexts&&(i.contexts.trace=t.contexts.trace,t.contexts.trace.data&&(i.contexts.trace.data=Tt(t.contexts.trace.data,e,n))),t.spans&&(i.spans=t.spans.map(s=>({...s,...s.data&&{data:Tt(s.data,e,n)}}))),t.contexts?.flags&&i.contexts&&(i.contexts.flags=Tt(t.contexts.flags,3,n)),i}function ub(t,e){if(!e)return t;const n=t?t.clone():new Ft;return n.update(e),n}function db(t,e){return yn().captureException(t,void 0)}function Lp(t,e){return yn().captureEvent(t,e)}function jd(t){const e=tr(),n=yn(),{userAgent:i}=H.navigator||{},s=$w({user:n.getUser()||e.getUser(),...i&&{userAgent:i},...t}),r=e.getSession();return r?.status==="ok"&&ki(r,{status:"exited"}),Op(),e.setSession(s),s}function Op(){const t=tr(),n=yn().getSession()||t.getSession();n&&Bw(n),Dp(),t.setSession()}function Dp(){const t=tr(),e=Te(),n=t.getSession();n&&e&&e.captureSession(n)}function qd(t=!1){if(t){Op();return}Dp()}const hb="7";function fb(t){const e=t.protocol?`${t.protocol}:`:"",n=t.port?`:${t.port}`:"";return`${e}//${t.host}${n}${t.path?`/${t.path}`:""}/api/`}function pb(t){return`${fb(t)}${t.projectId}/envelope/`}function gb(t,e){const n={sentry_version:hb};return t.publicKey&&(n.sentry_key=t.publicKey),e&&(n.sentry_client=`${e.name}/${e.version}`),new URLSearchParams(n).toString()}function mb(t,e,n){return e||`${pb(t)}?${gb(t,n)}`}const zd=[];function _b(t){const e={};return t.forEach(n=>{const{name:i}=n,s=e[i];s&&!s.isDefaultInstance&&n.isDefaultInstance||(e[i]=n)}),Object.values(e)}function yb(t){const e=t.defaultIntegrations||[],n=t.integrations;e.forEach(s=>{s.isDefaultInstance=!0});let i;if(Array.isArray(n))i=[...e,...n];else if(typeof n=="function"){const s=n(e);i=Array.isArray(s)?s:[s]}else i=e;return _b(i)}function wb(t,e){const n={};return e.forEach(i=>{i&&Mp(t,i,n)}),n}function Gd(t,e){for(const n of e)n?.afterAllSetup&&n.afterAllSetup(t)}function Mp(t,e,n){if(n[e.name]){R&&T.log(`Integration skipped because it was already installed: ${e.name}`);return}if(n[e.name]=e,!zd.includes(e.name)&&typeof e.setupOnce=="function"&&(e.setupOnce(),zd.push(e.name)),e.setup&&typeof e.setup=="function"&&e.setup(t),typeof e.preprocessEvent=="function"){const i=e.preprocessEvent.bind(e);t.on("preprocessEvent",(s,r)=>i(s,r,t))}if(typeof e.processEvent=="function"){const i=e.processEvent.bind(e),s=Object.assign((r,o)=>i(r,o,t),{id:e.name});t.addEventProcessor(s)}R&&T.log(`Integration installed: ${e.name}`)}function vb(t){return[{type:"log",item_count:t.length,content_type:"application/vnd.sentry.items.log+json"},{items:t}]}function bb(t,e,n,i){const s={};return e?.sdk&&(s.sdk={name:e.sdk.name,version:e.sdk.version}),n&&i&&(s.dsn=nr(i)),ji(s,[vb(t)])}function xp(t,e){const n=e??Eb(t)??[];if(n.length===0)return;const i=t.getOptions(),s=bb(n,i._metadata,i.tunnel,t.getDsn());Fp().set(t,[]),t.emit("flushLogs"),t.sendEnvelope(s)}function Eb(t){return Fp().get(t)}function Fp(){return Hi("clientToLogBufferMap",()=>new WeakMap)}function Cb(t){return[{type:"trace_metric",item_count:t.length,content_type:"application/vnd.sentry.items.trace-metric+json"},{items:t}]}function Tb(t,e,n,i){const s={};return e?.sdk&&(s.sdk={name:e.sdk.name,version:e.sdk.version}),n&&i&&(s.dsn=nr(i)),ji(s,[Cb(t)])}function Up(t,e){const n=e??Sb(t)??[];if(n.length===0)return;const i=t.getOptions(),s=Tb(n,i._metadata,i.tunnel,t.getDsn());$p().set(t,[]),t.emit("flushMetrics"),t.sendEnvelope(s)}function Sb(t){return $p().get(t)}function $p(){return Hi("clientToMetricBufferMap",()=>new WeakMap)}const Rl=Symbol.for("SentryBufferFullError");function Al(t=100){const e=new Set;function n(){return e.size<t}function i(o){e.delete(o)}function s(o){if(!n())return kl(Rl);const a=o();return e.add(a),a.then(()=>i(a),()=>i(a)),a}function r(o){if(!e.size)return Uo(!0);const a=Promise.allSettled(Array.from(e)).then(()=>!0);if(!o)return a;const c=[a,new Promise(l=>setTimeout(()=>l(!1),o))];return Promise.race(c)}return{get $(){return Array.from(e)},add:s,drain:r}}const Ib=60*1e3;function kb(t,e=xo()){const n=parseInt(`${t}`,10);if(!isNaN(n))return n*1e3;const i=Date.parse(`${t}`);return isNaN(i)?Ib:i-e}function Rb(t,e){return t[e]||t.all||0}function Ab(t,e,n=xo()){return Rb(t,e)>n}function Nb(t,{statusCode:e,headers:n},i=xo()){const s={...t},r=n?.["x-sentry-rate-limits"],o=n?.["retry-after"];if(r)for(const a of r.trim().split(",")){const[c,l,,,u]=a.split(":",5),d=parseInt(c,10),h=(isNaN(d)?60:d)*1e3;if(!l)s.all=i+h;else for(const f of l.split(";"))f==="metric_bucket"?(!u||u.split(";").includes("custom"))&&(s[f]=i+h):s[f]=i+h}else o?s.all=i+kb(o,i):e===429&&(s.all=i+60*1e3);return s}const Bp=64;function Pb(t,e,n=Al(t.bufferSize||Bp)){let i={};const s=o=>n.drain(o);function r(o){const a=[];if(yc(o,(d,h)=>{const f=Ud(h);Ab(i,f)?t.recordDroppedEvent("ratelimit_backoff",f):a.push(d)}),a.length===0)return Promise.resolve({});const c=ji(o[0],a),l=d=>{if(Bv(c,["client_report"])){R&&T.warn(`Dropping client report. Will not send outcomes (reason: ${d}).`);return}yc(c,(h,f)=>{t.recordDroppedEvent(d,Ud(f))})},u=()=>e({body:Hv(c)}).then(d=>(d.statusCode!==void 0&&(d.statusCode<200||d.statusCode>=300)&&R&&T.warn(`Sentry responded with status code ${d.statusCode} to sent event.`),i=Nb(i,d),d),d=>{throw l("network_error"),R&&T.error("Encountered error running transport request:",d),d});return n.add(u).then(d=>d,d=>{if(d===Rl)return R&&T.error("Skipped sending event because buffer is full."),l("queue_overflow"),Promise.resolve({});throw d})}return{send:r,flush:s}}function Lb(t,e,n){const i=[{type:"client_report"},{timestamp:Zs(),discarded_events:t}];return ji(e?{dsn:e}:{},[i])}function Hp(t){const e=[];t.message&&e.push(t.message);try{const n=t.exception.values[t.exception.values.length-1];n?.value&&(e.push(n.value),n.type&&e.push(`${n.type}: ${n.value}`))}catch{}return e}function Ob(t){const{trace_id:e,parent_span_id:n,span_id:i,status:s,origin:r,data:o,op:a}=t.contexts?.trace??{};return{data:o??{},description:t.transaction,op:a,parent_span_id:n,span_id:i??"",start_timestamp:t.start_timestamp??0,status:s,timestamp:t.timestamp,trace_id:e??"",origin:r,profile_id:o?.[Cp],exclusive_time:o?.[Tp],measurements:t.measurements,is_segment:!0}}function Db(t){return{type:"transaction",timestamp:t.timestamp,start_timestamp:t.start_timestamp,transaction:t.description,contexts:{trace:{trace_id:t.trace_id,span_id:t.span_id,parent_span_id:t.parent_span_id,op:t.op,status:t.status,origin:t.origin,data:{...t.data,...t.profile_id&&{[Cp]:t.profile_id},...t.exclusive_time&&{[Tp]:t.exclusive_time}}}},measurements:t.measurements}}const Kd="Not capturing exception because it's already been captured.",Yd="Discarded session because of missing or non-string release",Vp=Symbol.for("SentryInternalError"),Wp=Symbol.for("SentryDoNotSendEventError"),Mb=5e3;function Pr(t){return{message:t,[Vp]:!0}}function Pa(t){return{message:t,[Wp]:!0}}function Jd(t){return!!t&&typeof t=="object"&&Vp in t}function Xd(t){return!!t&&typeof t=="object"&&Wp in t}function Qd(t,e,n,i,s){let r=0,o,a=!1;t.on(n,()=>{r=0,clearTimeout(o),a=!1}),t.on(e,c=>{r+=i(c),r>=8e5?s(t):a||(a=!0,o=setTimeout(()=>{s(t)},Mb))}),t.on("flush",()=>{s(t)})}class xb{constructor(e){if(this._options=e,this._integrations={},this._numProcessing=0,this._outcomes={},this._hooks={},this._eventProcessors=[],this._promiseBuffer=Al(e.transportOptions?.bufferSize??Bp),e.dsn?this._dsn=wv(e.dsn):R&&T.warn("No DSN provided, client will not send events."),this._dsn){const i=mb(this._dsn,e.tunnel,e._metadata?e._metadata.sdk:void 0);this._transport=e.transport({tunnel:this._options.tunnel,recordDroppedEvent:this.recordDroppedEvent.bind(this),...e.transportOptions,url:i})}this._options.enableLogs=this._options.enableLogs??this._options._experiments?.enableLogs,this._options.enableLogs&&Qd(this,"afterCaptureLog","flushLogs",Bb,xp),(this._options.enableMetrics??this._options._experiments?.enableMetrics??!0)&&Qd(this,"afterCaptureMetric","flushMetrics",$b,Up)}captureException(e,n,i){const s=Ke();if(Sd(e))return R&&T.log(Kd),s;const r={event_id:s,...n};return this._process(()=>this.eventFromException(e,r).then(o=>this._captureEvent(o,r,i)).then(o=>o),"error"),r.event_id}captureMessage(e,n,i,s){const r={event_id:Ke(),...i},o=vl(e)?e:String(e),a=Oo(e),c=a?this.eventFromMessage(o,n,r):this.eventFromException(e,r);return this._process(()=>c.then(l=>this._captureEvent(l,r,s)),a?"unknown":"error"),r.event_id}captureEvent(e,n,i){const s=Ke();if(n?.originalException&&Sd(n.originalException))return R&&T.log(Kd),s;const r={event_id:s,...n},o=e.sdkProcessingMetadata||{},a=o.capturedSpanScope,c=o.capturedSpanIsolationScope,l=Zd(e.type);return this._process(()=>this._captureEvent(e,r,a||i,c),l),r.event_id}captureSession(e){this.sendSession(e),ki(e,{init:!1})}getDsn(){return this._dsn}getOptions(){return this._options}getSdkMetadata(){return this._options._metadata}getTransport(){return this._transport}async flush(e){const n=this._transport;if(!n)return!0;this.emit("flush");const i=await this._isClientDoneProcessing(e),s=await n.flush(e);return i&&s}async close(e){const n=await this.flush(e);return this.getOptions().enabled=!1,this.emit("close"),n}getEventProcessors(){return this._eventProcessors}addEventProcessor(e){this._eventProcessors.push(e)}init(){(this._isEnabled()||this._options.integrations.some(({name:e})=>e.startsWith("Spotlight")))&&this._setupIntegrations()}getIntegrationByName(e){return this._integrations[e]}addIntegration(e){const n=this._integrations[e.name];Mp(this,e,this._integrations),n||Gd(this,[e])}sendEvent(e,n={}){this.emit("beforeSendEvent",e,n);let i=Kv(e,this._dsn,this._options._metadata,this._options.tunnel);for(const s of n.attachments||[])i=$v(i,Wv(s));this.sendEnvelope(i).then(s=>this.emit("afterSendEvent",e,s))}sendSession(e){const{release:n,environment:i=Il}=this._options;if("aggregates"in e){const r=e.attrs||{};if(!r.release&&!n){R&&T.warn(Yd);return}r.release=r.release||n,r.environment=r.environment||i,e.attrs=r}else{if(!e.release&&!n){R&&T.warn(Yd);return}e.release=e.release||n,e.environment=e.environment||i}this.emit("beforeSendSession",e);const s=Gv(e,this._dsn,this._options._metadata,this._options.tunnel);this.sendEnvelope(s)}recordDroppedEvent(e,n,i=1){if(this._options.sendClientReports){const s=`${e}:${n}`;R&&T.log(`Recording outcome: "${s}"${i>1?` (${i} times)`:""}`),this._outcomes[s]=(this._outcomes[s]||0)+i}}on(e,n){const i=this._hooks[e]=this._hooks[e]||new Set,s=(...r)=>n(...r);return i.add(s),()=>{i.delete(s)}}emit(e,...n){const i=this._hooks[e];i&&i.forEach(s=>s(...n))}async sendEnvelope(e){if(this.emit("beforeEnvelope",e),this._isEnabled()&&this._transport)try{return await this._transport.send(e)}catch(n){return R&&T.error("Error while sending envelope:",n),{}}return R&&T.error("Transport disabled"),{}}_setupIntegrations(){const{integrations:e}=this._options;this._integrations=wb(this,e),Gd(this,e)}_updateSessionFromEvent(e,n){let i=n.level==="fatal",s=!1;const r=n.exception?.values;if(r){s=!0,i=!1;for(const c of r)if(c.mechanism?.handled===!1){i=!0;break}}const o=e.status==="ok";(o&&e.errors===0||o&&i)&&(ki(e,{...i&&{status:"crashed"},errors:e.errors||Number(s||i)}),this.captureSession(e))}async _isClientDoneProcessing(e){let n=0;for(;!e||n<e;){if(await new Promise(i=>setTimeout(i,1)),!this._numProcessing)return!0;n++}return!1}_isEnabled(){return this.getOptions().enabled!==!1&&this._transport!==void 0}_prepareEvent(e,n,i,s){const r=this.getOptions(),o=Object.keys(this._integrations);return!n.integrations&&o?.length&&(n.integrations=o),this.emit("preprocessEvent",e,n),e.type||s.setLastEventId(e.event_id||n.event_id),sb(r,e,n,i,this,s).then(a=>{if(a===null)return a;this.emit("postprocessEvent",a,n),a.contexts={trace:Xw(i),...a.contexts};const c=Lv(this,i);return a.sdkProcessingMetadata={dynamicSamplingContext:c,...a.sdkProcessingMetadata},a})}_captureEvent(e,n={},i=yn(),s=tr()){return R&&bc(e)&&T.log(`Captured error event \`${Hp(e)[0]||"<unknown>"}\``),this._processEvent(e,n,i,s).then(r=>r.event_id,r=>{R&&(Xd(r)?T.log(r.message):Jd(r)?T.warn(r.message):T.warn(r))})}_processEvent(e,n,i,s){const r=this.getOptions(),{sampleRate:o}=r,a=jp(e),c=bc(e),u=`before send for type \`${e.type||"error"}\``,d=typeof o>"u"?void 0:vv(o);if(c&&typeof d=="number"&&jr()>d)return this.recordDroppedEvent("sample_rate","error"),kl(Pa(`Discarding event because it's not included in the random sample (sampling rate = ${o})`));const h=Zd(e.type);return this._prepareEvent(e,n,i,s).then(f=>{if(f===null)throw this.recordDroppedEvent("event_processor",h),Pa("An event processor returned `null`, will not send event.");if(n.data&&n.data.__sentry__===!0)return f;const _=Ub(this,r,f,n);return Fb(_,u)}).then(f=>{if(f===null){if(this.recordDroppedEvent("before_send",h),a){const A=1+(e.spans||[]).length;this.recordDroppedEvent("before_send","span",A)}throw Pa(`${u} returned \`null\`, will not send event.`)}const p=i.getSession()||s.getSession();if(c&&p&&this._updateSessionFromEvent(p,f),a){const m=f.sdkProcessingMetadata?.spanCountBeforeProcessing||0,A=f.spans?f.spans.length:0,x=m-A;x>0&&this.recordDroppedEvent("before_send","span",x)}const _=f.transaction_info;if(a&&_&&f.transaction!==e.transaction){const m="custom";f.transaction_info={..._,source:m}}return this.sendEvent(f,n),f}).then(null,f=>{throw Xd(f)||Jd(f)?f:(this.captureException(f,{mechanism:{handled:!1,type:"internal"},data:{__sentry__:!0},originalException:f}),Pr(`Event processing pipeline threw an error, original event will not be sent. Details have been sent as a new event.
Reason: ${f}`))})}_process(e,n){this._numProcessing++,this._promiseBuffer.add(e).then(i=>(this._numProcessing--,i),i=>(this._numProcessing--,i===Rl&&this.recordDroppedEvent("queue_overflow",n),i))}_clearOutcomes(){const e=this._outcomes;return this._outcomes={},Object.entries(e).map(([n,i])=>{const[s,r]=n.split(":");return{reason:s,category:r,quantity:i}})}_flushOutcomes(){R&&T.log("Flushing outcomes...");const e=this._clearOutcomes();if(e.length===0){R&&T.log("No outcomes to send");return}if(!this._dsn){R&&T.log("No dsn provided, will not send outcomes");return}R&&T.log("Sending outcomes:",e);const n=Lb(e,this._options.tunnel&&nr(this._dsn));this.sendEnvelope(n)}}function Zd(t){return t==="replay_event"?"replay":t||"error"}function Fb(t,e){const n=`${e} must return \`null\` or a valid event.`;if(Qs(t))return t.then(i=>{if(!Ps(i)&&i!==null)throw Pr(n);return i},i=>{throw Pr(`${e} rejected with ${i}`)});if(!Ps(t)&&t!==null)throw Pr(n);return t}function Ub(t,e,n,i){const{beforeSend:s,beforeSendTransaction:r,beforeSendSpan:o,ignoreSpans:a}=e;let c=n;if(bc(c)&&s)return s(c,i);if(jp(c)){if(o||a){const l=Ob(c);if(a?.length&&Fd(l,a))return null;if(o){const u=o(l);u?c=er(n,Db(u)):Md()}if(c.spans){const u=[],d=c.spans;for(const f of d){if(a?.length&&Fd(f,a)){Av(d,f);continue}if(o){const p=o(f);p?u.push(p):(Md(),u.push(f))}else u.push(f)}const h=c.spans.length-u.length;h&&t.recordDroppedEvent("before_send","span",h),c.spans=u}}if(r){if(c.spans){const l=c.spans.length;c.sdkProcessingMetadata={...n.sdkProcessingMetadata,spanCountBeforeProcessing:l}}return r(c,i)}}return c}function bc(t){return t.type===void 0}function jp(t){return t.type==="transaction"}function $b(t){let e=0;return t.name&&(e+=t.name.length*2),e+=8,e+qp(t.attributes)}function Bb(t){let e=0;return t.message&&(e+=t.message.length*2),e+qp(t.attributes)}function qp(t){if(!t)return 0;let e=0;return Object.values(t).forEach(n=>{Array.isArray(n)?e+=n.length*eh(n[0]):Oo(n)?e+=eh(n):e+=100}),e}function eh(t){return typeof t=="string"?t.length*2:typeof t=="number"?8:typeof t=="boolean"?4:0}function Hb(t){return Lo(t)&&"__sentry_fetch_url_host__"in t&&typeof t.__sentry_fetch_url_host__=="string"}function th(t){return Hb(t)?`${t.message} (${t.__sentry_fetch_url_host__})`:t.message}function Vb(t,e){e.debug===!0&&(R?T.enable():Vi(()=>{console.warn("[Sentry] Cannot initialize SDK with `debug` option using a non-debug bundle.")})),yn().update(e.initialScope);const i=new t(e);return Wb(i),i.init(),i}function Wb(t){yn().setClient(t)}function La(t){if(!t)return{};const e=t.match(/^(([^:/?#]+):)?(\/\/([^/?#]*))?([^?#]*)(\?([^#]*))?(#(.*))?$/);if(!e)return{};const n=e[6]||"",i=e[8]||"";return{host:e[4],path:e[5],protocol:e[2],search:n,hash:i,relative:e[5]+n+i}}function jb(t){"aggregates"in t?t.attrs?.ip_address===void 0&&(t.attrs={...t.attrs,ip_address:"{{auto}}"}):t.ipAddress===void 0&&(t.ipAddress="{{auto}}")}function qb(t,e,n=[e],i="npm"){const s=t._metadata||{};s.sdk||(s.sdk={name:`sentry.javascript.${e}`,packages:n.map(r=>({name:`${i}:@sentry/${r}`,version:Fn})),version:Fn}),t._metadata=s}const zb=100;function Hn(t,e){const n=Te(),i=tr();if(!n)return;const{beforeBreadcrumb:s=null,maxBreadcrumbs:r=zb}=n.getOptions();if(r<=0)return;const a={timestamp:Zs(),...t},c=s?Vi(()=>s(a,e)):a;c!==null&&(n.emit&&n.emit("beforeAddBreadcrumb",c,e),i.addBreadcrumb(c,r))}let nh;const Gb="FunctionToString",ih=new WeakMap,Kb=(()=>({name:Gb,setupOnce(){nh=Function.prototype.toString;try{Function.prototype.toString=function(...t){const e=Cl(this),n=ih.has(Te())&&e!==void 0?e:this;return nh.apply(n,t)}}catch{}},setup(t){ih.set(t,!0)}})),Yb=Kb,Jb=[/^Script error\.?$/,/^Javascript error: Script error\.? on line 0$/,/^ResizeObserver loop completed with undelivered notifications.$/,/^Cannot redefine property: googletag$/,/^Can't find variable: gmo$/,/^undefined is not an object \(evaluating 'a\.[A-Z]'\)$/,`can't redefine non-configurable property "solana"`,"vv().getRestrictions is not a function. (In 'vv().getRestrictions(1,a)', 'vv().getRestrictions' is undefined)","Can't find variable: _AutofillCallbackHandler",/^Non-Error promise rejection captured with value: Object Not Found Matching Id:\d+, MethodName:simulateEvent, ParamCount:\d+$/,/^Java exception was raised during method invocation$/],Xb="EventFilters",Qb=(t={})=>{let e;return{name:Xb,setup(n){const i=n.getOptions();e=sh(t,i)},processEvent(n,i,s){if(!e){const r=s.getOptions();e=sh(t,r)}return eE(n,e)?null:n}}},Zb=((t={})=>({...Qb(t),name:"InboundFilters"}));function sh(t={},e={}){return{allowUrls:[...t.allowUrls||[],...e.allowUrls||[]],denyUrls:[...t.denyUrls||[],...e.denyUrls||[]],ignoreErrors:[...t.ignoreErrors||[],...e.ignoreErrors||[],...t.disableErrorDefaults?[]:Jb],ignoreTransactions:[...t.ignoreTransactions||[],...e.ignoreTransactions||[]]}}function eE(t,e){if(t.type){if(t.type==="transaction"&&nE(t,e.ignoreTransactions))return R&&T.warn(`Event dropped due to being matched by \`ignoreTransactions\` option.
Event: ${Pn(t)}`),!0}else{if(tE(t,e.ignoreErrors))return R&&T.warn(`Event dropped due to being matched by \`ignoreErrors\` option.
Event: ${Pn(t)}`),!0;if(oE(t))return R&&T.warn(`Event dropped due to not having an error message, error type or stacktrace.
Event: ${Pn(t)}`),!0;if(iE(t,e.denyUrls))return R&&T.warn(`Event dropped due to being matched by \`denyUrls\` option.
Event: ${Pn(t)}.
Url: ${qr(t)}`),!0;if(!sE(t,e.allowUrls))return R&&T.warn(`Event dropped due to not being matched by \`allowUrls\` option.
Event: ${Pn(t)}.
Url: ${qr(t)}`),!0}return!1}function tE(t,e){return e?.length?Hp(t).some(n=>Fo(n,e)):!1}function nE(t,e){if(!e?.length)return!1;const n=t.transaction;return n?Fo(n,e):!1}function iE(t,e){if(!e?.length)return!1;const n=qr(t);return n?Fo(n,e):!1}function sE(t,e){if(!e?.length)return!0;const n=qr(t);return n?Fo(n,e):!0}function rE(t=[]){for(let e=t.length-1;e>=0;e--){const n=t[e];if(n&&n.filename!=="<anonymous>"&&n.filename!=="[native code]")return n.filename||null}return null}function qr(t){try{const n=[...t.exception?.values??[]].reverse().find(i=>i.mechanism?.parent_id===void 0&&i.stacktrace?.frames?.length)?.stacktrace?.frames;return n?rE(n):null}catch{return R&&T.error(`Cannot extract url for event ${Pn(t)}`),null}}function oE(t){return t.exception?.values?.length?!t.message&&!t.exception.values.some(e=>e.stacktrace||e.type&&e.type!=="Error"||e.value):!1}function aE(t,e,n,i,s,r){if(!s.exception?.values||!r||!ln(r.originalException,Error))return;const o=s.exception.values.length>0?s.exception.values[s.exception.values.length-1]:void 0;o&&(s.exception.values=Ec(t,e,i,r.originalException,n,s.exception.values,o,0))}function Ec(t,e,n,i,s,r,o,a){if(r.length>=n+1)return r;let c=[...r];if(ln(i[s],Error)){rh(o,a);const l=t(e,i[s]),u=c.length;oh(l,s,u,a),c=Ec(t,e,n,i[s],s,[l,...c],l,u)}return Array.isArray(i.errors)&&i.errors.forEach((l,u)=>{if(ln(l,Error)){rh(o,a);const d=t(e,l),h=c.length;oh(d,`errors[${u}]`,h,a),c=Ec(t,e,n,l,s,[d,...c],d,h)}}),c}function rh(t,e){t.mechanism={handled:!0,type:"auto.core.linked_errors",...t.mechanism,...t.type==="AggregateError"&&{is_exception_group:!0},exception_id:e}}function oh(t,e,n,i){t.mechanism={handled:!0,...t.mechanism,type:"chained",source:e,exception_id:n,parent_id:i}}function cE(t){const e="console";Qn(e,t),Zn(e,lE)}function lE(){"console"in H&&pw.forEach(function(t){t in H.console&&Ve(H.console,t,function(e){return Wr[t]=e,function(...n){lt("console",{args:n,level:t}),Wr[t]?.apply(H.console,n)}})})}function uE(t){return t==="warn"?"warning":["fatal","error","warning","log","info","debug"].includes(t)?t:"log"}const dE="Dedupe",hE=(()=>{let t;return{name:dE,processEvent(e){if(e.type)return e;try{if(pE(e,t))return R&&T.warn("Event dropped due to being a duplicate of previously captured event."),null}catch{}return t=e}}}),fE=hE;function pE(t,e){return e?!!(gE(t,e)||mE(t,e)):!1}function gE(t,e){const n=t.message,i=e.message;return!(!n&&!i||n&&!i||!n&&i||n!==i||!Gp(t,e)||!zp(t,e))}function mE(t,e){const n=ah(e),i=ah(t);return!(!n||!i||n.type!==i.type||n.value!==i.value||!Gp(t,e)||!zp(t,e))}function zp(t,e){let n=wd(t),i=wd(e);if(!n&&!i)return!0;if(n&&!i||!n&&i||(n=n,i=i,i.length!==n.length))return!1;for(let s=0;s<i.length;s++){const r=i[s],o=n[s];if(r.filename!==o.filename||r.lineno!==o.lineno||r.colno!==o.colno||r.function!==o.function)return!1}return!0}function Gp(t,e){let n=t.fingerprint,i=e.fingerprint;if(!n&&!i)return!0;if(n&&!i||!n&&i)return!1;n=n,i=i;try{return n.join("")===i.join("")}catch{return!1}}function ah(t){return t.exception?.values?.[0]}function Kp(t){if(t!==void 0)return t>=400&&t<500?"warning":t>=500?"error":void 0}const Os=H;function _E(){return"history"in Os&&!!Os.history}function yE(){if(!("fetch"in Os))return!1;try{return new Headers,new Request("data:,"),new Response,!0}catch{return!1}}function Cc(t){return t&&/^function\s+\w+\(\)\s+\{\s+\[native code\]\s+\}$/.test(t.toString())}function wE(){if(typeof EdgeRuntime=="string")return!0;if(!yE())return!1;if(Cc(Os.fetch))return!0;let t=!1;const e=Os.document;if(e&&typeof e.createElement=="function")try{const n=e.createElement("iframe");n.hidden=!0,e.head.appendChild(n),n.contentWindow?.fetch&&(t=Cc(n.contentWindow.fetch)),e.head.removeChild(n)}catch(n){R&&T.warn("Could not create sandbox iframe for pure fetch check, bailing to window.fetch: ",n)}return t}function vE(t,e){const n="fetch";Qn(n,t),Zn(n,()=>bE(void 0,e))}function bE(t,e=!1){e&&!wE()||Ve(H,"fetch",function(n){return function(...i){const s=new Error,{method:r,url:o}=EE(i),a={args:i,fetchData:{method:r,url:o},startTimestamp:Dt()*1e3,virtualError:s,headers:CE(i)};return lt("fetch",{...a}),n.apply(H,i).then(async c=>(lt("fetch",{...a,endTimestamp:Dt()*1e3,response:c}),c),c=>{lt("fetch",{...a,endTimestamp:Dt()*1e3,error:c}),Lo(c)&&c.stack===void 0&&(c.stack=s.stack,un(c,"framesToPop",1));const u=Te()?.getOptions().enhanceFetchErrorMessages??"always";if(u!==!1&&c instanceof TypeError&&(c.message==="Failed to fetch"||c.message==="Load failed"||c.message==="NetworkError when attempting to fetch resource."))try{const f=new URL(a.fetchData.url).host;u==="always"?c.message=`${c.message} (${f})`:un(c,"__sentry_fetch_url_host__",f)}catch{}throw c})}})}function Lr(t,e){return!!t&&typeof t=="object"&&!!t[e]}function ch(t){return typeof t=="string"?t:t?Lr(t,"url")?t.url:t.toString?t.toString():"":""}function EE(t){if(t.length===0)return{method:"GET",url:""};if(t.length===2){const[n,i]=t;return{url:ch(n),method:Lr(i,"method")?String(i.method).toUpperCase():mp(n)&&Lr(n,"method")?String(n.method).toUpperCase():"GET"}}const e=t[0];return{url:ch(e),method:Lr(e,"method")?String(e.method).toUpperCase():"GET"}}function CE(t){const[e,n]=t;try{if(typeof n=="object"&&n!==null&&"headers"in n&&n.headers)return new Headers(n.headers);if(mp(e))return new Headers(e.headers)}catch{}}function TE(){return"npm"}const oe=H;let Tc=0;function Yp(){return Tc>0}function SE(){Tc++,setTimeout(()=>{Tc--})}function Ai(t,e={}){function n(s){return typeof s=="function"}if(!n(t))return t;try{const s=t.__sentry_wrapped__;if(s)return typeof s=="function"?s:t;if(Cl(t))return t}catch{return t}const i=function(...s){try{const r=s.map(o=>Ai(o,e));return t.apply(this,r)}catch(r){throw SE(),Jw(o=>{o.addEventProcessor(a=>(e.mechanism&&(gc(a,void 0),Ii(a,e.mechanism)),a.extra={...a.extra,arguments:s},a)),db(r)}),r}};try{for(const s in t)Object.prototype.hasOwnProperty.call(t,s)&&(i[s]=t[s])}catch{}yp(i,t),un(t,"__sentry_wrapped__",i);try{Object.getOwnPropertyDescriptor(i,"name").configurable&&Object.defineProperty(i,"name",{get(){return t.name}})}catch{}return i}function IE(){const t=El(),{referrer:e}=oe.document||{},{userAgent:n}=oe.navigator||{},i={...e&&{Referer:e},...n&&{"User-Agent":n}};return{url:t,headers:i}}function Nl(t,e){const n=Pl(t,e),i={type:PE(e),value:LE(e)};return n.length&&(i.stacktrace={frames:n}),i.type===void 0&&i.value===""&&(i.value="Unrecoverable error caught"),i}function kE(t,e,n,i){const r=Te()?.getOptions().normalizeDepth,o=FE(e),a={__serialized__:Np(e,r)};if(o)return{exception:{values:[Nl(t,o)]},extra:a};const c={exception:{values:[{type:Do(e)?e.constructor.name:i?"UnhandledRejection":"Error",value:ME(e,{isUnhandledRejection:i})}]},extra:a};if(n){const l=Pl(t,n);l.length&&(c.exception.values[0].stacktrace={frames:l})}return c}function Oa(t,e){return{exception:{values:[Nl(t,e)]}}}function Pl(t,e){const n=e.stacktrace||e.stack||"",i=AE(e),s=NE(e);try{return t(n,i,s)}catch{}return[]}const RE=/Minified React error #\d+;/i;function AE(t){return t&&RE.test(t.message)?1:0}function NE(t){return typeof t.framesToPop=="number"?t.framesToPop:0}function Jp(t){return typeof WebAssembly<"u"&&typeof WebAssembly.Exception<"u"?t instanceof WebAssembly.Exception:!1}function PE(t){const e=t?.name;return!e&&Jp(t)?t.message&&Array.isArray(t.message)&&t.message.length==2?t.message[0]:"WebAssembly.Exception":e}function LE(t){const e=t?.message;return Jp(t)?Array.isArray(t.message)&&t.message.length==2?t.message[1]:"wasm exception":e?e.error&&typeof e.error.message=="string"?th(e.error):th(t):"No error message"}function OE(t,e,n,i){const s=n?.syntheticException||void 0,r=Ll(t,e,s,i);return Ii(r),r.level="error",n?.event_id&&(r.event_id=n.event_id),Uo(r)}function DE(t,e,n="info",i,s){const r=i?.syntheticException||void 0,o=Sc(t,e,r,s);return o.level=n,i?.event_id&&(o.event_id=i.event_id),Uo(o)}function Ll(t,e,n,i,s){let r;if(pp(e)&&e.error)return Oa(t,e.error);if(bd(e)||kw(e)){const o=e;if("stack"in e)r=Oa(t,e);else{const a=o.name||(bd(o)?"DOMError":"DOMException"),c=o.message?`${a}: ${o.message}`:a;r=Sc(t,c,n,i),gc(r,c)}return"code"in o&&(r.tags={...r.tags,"DOMException.code":`${o.code}`}),r}return Lo(e)?Oa(t,e):Ps(e)||Do(e)?(r=kE(t,e,n,s),Ii(r,{synthetic:!0}),r):(r=Sc(t,e,n,i),gc(r,`${e}`),Ii(r,{synthetic:!0}),r)}function Sc(t,e,n,i){const s={};if(i&&n){const r=Pl(t,n);r.length&&(s.exception={values:[{value:e,stacktrace:{frames:r}}]}),Ii(s,{synthetic:!0})}if(vl(e)){const{__sentry_template_string__:r,__sentry_template_values__:o}=e;return s.logentry={message:r,params:o},s}return s.message=e,s}function ME(t,{isUnhandledRejection:e}){const n=Dw(t),i=e?"promise rejection":"exception";return pp(t)?`Event \`ErrorEvent\` captured as ${i} with message \`${t.message}\``:Do(t)?`Event \`${xE(t)}\` (type=${t.type}) captured as ${i}`:`Object captured as ${i} with keys: ${n}`}function xE(t){try{const e=Object.getPrototypeOf(t);return e?e.constructor.name:void 0}catch{}}function FE(t){for(const e in t)if(Object.prototype.hasOwnProperty.call(t,e)){const n=t[e];if(n instanceof Error)return n}}class UE extends xb{constructor(e){const n=$E(e),i=oe.SENTRY_SDK_SOURCE||TE();qb(n,"browser",["browser"],i),n._metadata?.sdk&&(n._metadata.sdk.settings={infer_ip:n.sendDefaultPii?"auto":"never",...n._metadata.sdk.settings}),super(n);const{sendDefaultPii:s,sendClientReports:r,enableLogs:o,_experiments:a,enableMetrics:c}=this._options,l=c??a?.enableMetrics??!0;oe.document&&(r||o||l)&&oe.document.addEventListener("visibilitychange",()=>{oe.document.visibilityState==="hidden"&&(r&&this._flushOutcomes(),o&&xp(this),l&&Up(this))}),s&&this.on("beforeSendSession",jb)}eventFromException(e,n){return OE(this._options.stackParser,e,n,this._options.attachStacktrace)}eventFromMessage(e,n="info",i){return DE(this._options.stackParser,e,n,i,this._options.attachStacktrace)}_prepareEvent(e,n,i,s){return e.platform=e.platform||"javascript",super._prepareEvent(e,n,i,s)}}function $E(t){return{release:typeof __SENTRY_RELEASE__=="string"?__SENTRY_RELEASE__:oe.SENTRY_RELEASE?.id,sendClientReports:!0,parentSpanIsAlwaysRootSpan:!0,...t}}const BE=typeof __SENTRY_DEBUG__>"u"||__SENTRY_DEBUG__,ke=H,HE=1e3;let lh,Ic,kc;function VE(t){Qn("dom",t),Zn("dom",WE)}function WE(){if(!ke.document)return;const t=lt.bind(null,"dom"),e=uh(t,!0);ke.document.addEventListener("click",e,!1),ke.document.addEventListener("keypress",e,!1),["EventTarget","Node"].forEach(n=>{const s=ke[n]?.prototype;s?.hasOwnProperty?.("addEventListener")&&(Ve(s,"addEventListener",function(r){return function(o,a,c){if(o==="click"||o=="keypress")try{const l=this.__sentry_instrumentation_handlers__=this.__sentry_instrumentation_handlers__||{},u=l[o]=l[o]||{refCount:0};if(!u.handler){const d=uh(t);u.handler=d,r.call(this,o,d,c)}u.refCount++}catch{}return r.call(this,o,a,c)}}),Ve(s,"removeEventListener",function(r){return function(o,a,c){if(o==="click"||o=="keypress")try{const l=this.__sentry_instrumentation_handlers__||{},u=l[o];u&&(u.refCount--,u.refCount<=0&&(r.call(this,o,u.handler,c),u.handler=void 0,delete l[o]),Object.keys(l).length===0&&delete this.__sentry_instrumentation_handlers__)}catch{}return r.call(this,o,a,c)}}))})}function jE(t){if(t.type!==Ic)return!1;try{if(!t.target||t.target._sentryId!==kc)return!1}catch{}return!0}function qE(t,e){return t!=="keypress"?!1:e?.tagName?!(e.tagName==="INPUT"||e.tagName==="TEXTAREA"||e.isContentEditable):!0}function uh(t,e=!1){return n=>{if(!n||n._sentryCaptured)return;const i=zE(n);if(qE(n.type,i))return;un(n,"_sentryCaptured",!0),i&&!i._sentryId&&un(i,"_sentryId",Ke());const s=n.type==="keypress"?"input":n.type;jE(n)||(t({event:n,name:s,global:e}),Ic=n.type,kc=i?i._sentryId:void 0),clearTimeout(lh),lh=ke.setTimeout(()=>{kc=void 0,Ic=void 0},HE)}}function zE(t){try{return t.target}catch{return null}}let _r;function Xp(t){const e="history";Qn(e,t),Zn(e,GE)}function GE(){if(ke.addEventListener("popstate",()=>{const e=ke.location.href,n=_r;if(_r=e,n===e)return;lt("history",{from:n,to:e})}),!_E())return;function t(e){return function(...n){const i=n.length>2?n[2]:void 0;if(i){const s=_r,r=KE(String(i));if(_r=r,s===r)return e.apply(this,n);lt("history",{from:s,to:r})}return e.apply(this,n)}}Ve(ke.history,"pushState",t),Ve(ke.history,"replaceState",t)}function KE(t){try{return new URL(t,ke.location.origin).toString()}catch{return t}}const Or={};function YE(t){const e=Or[t];if(e)return e;let n=ke[t];if(Cc(n))return Or[t]=n.bind(ke);const i=ke.document;if(i&&typeof i.createElement=="function")try{const s=i.createElement("iframe");s.hidden=!0,i.head.appendChild(s);const r=s.contentWindow;r?.[t]&&(n=r[t]),i.head.removeChild(s)}catch(s){BE&&T.warn(`Could not create sandbox iframe for ${t} check, bailing to window.${t}: `,s)}return n&&(Or[t]=n.bind(ke))}function JE(t){Or[t]=void 0}const gs="__sentry_xhr_v3__";function XE(t){Qn("xhr",t),Zn("xhr",QE)}function QE(){if(!ke.XMLHttpRequest)return;const t=XMLHttpRequest.prototype;t.open=new Proxy(t.open,{apply(e,n,i){const s=new Error,r=Dt()*1e3,o=Ot(i[0])?i[0].toUpperCase():void 0,a=ZE(i[1]);if(!o||!a)return e.apply(n,i);n[gs]={method:o,url:a,request_headers:{}},o==="POST"&&a.match(/sentry_key/)&&(n.__sentry_own_request__=!0);const c=()=>{const l=n[gs];if(l&&n.readyState===4){try{l.status_code=n.status}catch{}const u={endTimestamp:Dt()*1e3,startTimestamp:r,xhr:n,virtualError:s};lt("xhr",u)}};return"onreadystatechange"in n&&typeof n.onreadystatechange=="function"?n.onreadystatechange=new Proxy(n.onreadystatechange,{apply(l,u,d){return c(),l.apply(u,d)}}):n.addEventListener("readystatechange",c),n.setRequestHeader=new Proxy(n.setRequestHeader,{apply(l,u,d){const[h,f]=d,p=u[gs];return p&&Ot(h)&&Ot(f)&&(p.request_headers[h.toLowerCase()]=f),l.apply(u,d)}}),e.apply(n,i)}}),t.send=new Proxy(t.send,{apply(e,n,i){const s=n[gs];if(!s)return e.apply(n,i);i[0]!==void 0&&(s.body=i[0]);const r={startTimestamp:Dt()*1e3,xhr:n};return lt("xhr",r),e.apply(n,i)}})}function ZE(t){if(Ot(t))return t;try{return t.toString()}catch{}}const eC=40;function tC(t,e=YE("fetch")){let n=0,i=0;async function s(r){const o=r.body.length;n+=o,i++;const a={body:r.body,method:"POST",referrerPolicy:"strict-origin",headers:t.headers,keepalive:n<=6e4&&i<15,...t.fetchOptions};try{const c=await e(t.url,a);return{statusCode:c.status,headers:{"x-sentry-rate-limits":c.headers.get("X-Sentry-Rate-Limits"),"retry-after":c.headers.get("Retry-After")}}}catch(c){throw JE("fetch"),c}finally{n-=o,i--}}return Pb(t,s,Al(t.bufferSize||eC))}const $o=typeof __SENTRY_DEBUG__>"u"||__SENTRY_DEBUG__,nC=30,iC=50;function Rc(t,e,n,i){const s={filename:t,function:e==="<anonymous>"?Bn:e,in_app:!0};return n!==void 0&&(s.lineno=n),i!==void 0&&(s.colno=i),s}const sC=/^\s*at (\S+?)(?::(\d+))(?::(\d+))\s*$/i,rC=/^\s*at (?:(.+?\)(?: \[.+\])?|.*?) ?\((?:address at )?)?(?:async )?((?:<anonymous>|[-a-z]+:|.*bundle|\/)?.*?)(?::(\d+))?(?::(\d+))?\)?\s*$/i,oC=/\((\S*)(?::(\d+))(?::(\d+))\)/,aC=/at (.+?) ?\(data:(.+?),/,cC=t=>{const e=t.match(aC);if(e)return{filename:`<data:${e[2]}>`,function:e[1]};const n=sC.exec(t);if(n){const[,s,r,o]=n;return Rc(s,Bn,+r,+o)}const i=rC.exec(t);if(i){if(i[2]&&i[2].indexOf("eval")===0){const a=oC.exec(i[2]);a&&(i[2]=a[1],i[3]=a[2],i[4]=a[3])}const[r,o]=Qp(i[1]||Bn,i[2]);return Rc(o,r,i[3]?+i[3]:void 0,i[4]?+i[4]:void 0)}},lC=[nC,cC],uC=/^\s*(.*?)(?:\((.*?)\))?(?:^|@)?((?:[-a-z]+)?:\/.*?|\[native code\]|[^@]*(?:bundle|\d+\.js)|\/[\w\-. /=]+)(?::(\d+))?(?::(\d+))?\s*$/i,dC=/(\S+) line (\d+)(?: > eval line \d+)* > eval/i,hC=t=>{const e=uC.exec(t);if(e){if(e[3]&&e[3].indexOf(" > eval")>-1){const r=dC.exec(e[3]);r&&(e[1]=e[1]||"eval",e[3]=r[1],e[4]=r[2],e[5]="")}let i=e[3],s=e[1]||Bn;return[s,i]=Qp(s,i),Rc(i,s,e[4]?+e[4]:void 0,e[5]?+e[5]:void 0)}},fC=[iC,hC],pC=[lC,fC],gC=dp(...pC),Qp=(t,e)=>{const n=t.indexOf("safari-extension")!==-1,i=t.indexOf("safari-web-extension")!==-1;return n||i?[t.indexOf("@")!==-1?t.split("@")[0]:Bn,n?`safari-extension:${e}`:`safari-web-extension:${e}`]:[t,e]},yr=1024,mC="Breadcrumbs",_C=((t={})=>{const e={console:!0,dom:!0,fetch:!0,history:!0,sentry:!0,xhr:!0,...t};return{name:mC,setup(n){e.console&&cE(bC(n)),e.dom&&VE(vC(n,e.dom)),e.xhr&&XE(EC(n)),e.fetch&&vE(CC(n)),e.history&&Xp(TC(n)),e.sentry&&n.on("beforeSendEvent",wC(n))}}}),yC=_C;function wC(t){return function(n){Te()===t&&Hn({category:`sentry.${n.type==="transaction"?"transaction":"event"}`,event_id:n.event_id,level:n.level,message:Pn(n)},{event:n})}}function vC(t,e){return function(i){if(Te()!==t)return;let s,r,o=typeof e=="object"?e.serializeAttribute:void 0,a=typeof e=="object"&&typeof e.maxStringLength=="number"?e.maxStringLength:void 0;a&&a>yr&&($o&&T.warn(`\`dom.maxStringLength\` cannot exceed ${yr}, but a value of ${a} was configured. Sentry will use ${yr} instead.`),a=yr),typeof o=="string"&&(o=[o]);try{const l=i.event,u=SC(l)?l.target:l;s=_p(u,{keyAttrs:o,maxStringLength:a}),r=Ow(u)}catch{s="<unknown>"}if(s.length===0)return;const c={category:`ui.${i.name}`,message:s};r&&(c.data={"ui.component_name":r}),Hn(c,{event:i.event,name:i.name,global:i.global})}}function bC(t){return function(n){if(Te()!==t)return;const i={category:"console",data:{arguments:n.args,logger:"console"},level:uE(n.level),message:Td(n.args," ")};if(n.level==="assert")if(n.args[0]===!1)i.message=`Assertion failed: ${Td(n.args.slice(1)," ")||"console.assert"}`,i.data.arguments=n.args.slice(1);else return;Hn(i,{input:n.args,level:n.level})}}function EC(t){return function(n){if(Te()!==t)return;const{startTimestamp:i,endTimestamp:s}=n,r=n.xhr[gs];if(!i||!s||!r)return;const{method:o,url:a,status_code:c,body:l}=r,u={method:o,url:a,status_code:c},d={xhr:n.xhr,input:l,startTimestamp:i,endTimestamp:s},h={category:"xhr",data:u,type:"http",level:Kp(c)};t.emit("beforeOutgoingRequestBreadcrumb",h,d),Hn(h,d)}}function CC(t){return function(n){if(Te()!==t)return;const{startTimestamp:i,endTimestamp:s}=n;if(s&&!(n.fetchData.url.match(/sentry_key/)&&n.fetchData.method==="POST"))if(n.fetchData.method,n.fetchData.url,n.error){const r=n.fetchData,o={data:n.error,input:n.args,startTimestamp:i,endTimestamp:s},a={category:"fetch",data:r,level:"error",type:"http"};t.emit("beforeOutgoingRequestBreadcrumb",a,o),Hn(a,o)}else{const r=n.response,o={...n.fetchData,status_code:r?.status};n.fetchData.request_body_size,n.fetchData.response_body_size,r?.status;const a={input:n.args,response:r,startTimestamp:i,endTimestamp:s},c={category:"fetch",data:o,type:"http",level:Kp(o.status_code)};t.emit("beforeOutgoingRequestBreadcrumb",c,a),Hn(c,a)}}}function TC(t){return function(n){if(Te()!==t)return;let i=n.from,s=n.to;const r=La(oe.location.href);let o=i?La(i):void 0;const a=La(s);o?.path||(o=r),r.protocol===a.protocol&&r.host===a.host&&(s=a.relative),r.protocol===o.protocol&&r.host===o.host&&(i=o.relative),Hn({category:"navigation",data:{from:i,to:s}})}}function SC(t){return!!t&&!!t.target}const IC=["EventTarget","Window","Node","ApplicationCache","AudioTrackList","BroadcastChannel","ChannelMergerNode","CryptoOperation","EventSource","FileReader","HTMLUnknownElement","IDBDatabase","IDBRequest","IDBTransaction","KeyOperation","MediaController","MessagePort","ModalWindow","Notification","SVGElementInstance","Screen","SharedWorker","TextTrack","TextTrackCue","TextTrackList","WebSocket","WebSocketWorker","Worker","XMLHttpRequest","XMLHttpRequestEventTarget","XMLHttpRequestUpload"],kC="BrowserApiErrors",RC=((t={})=>{const e={XMLHttpRequest:!0,eventTarget:!0,requestAnimationFrame:!0,setInterval:!0,setTimeout:!0,unregisterOriginalCallbacks:!1,...t};return{name:kC,setupOnce(){e.setTimeout&&Ve(oe,"setTimeout",dh),e.setInterval&&Ve(oe,"setInterval",dh),e.requestAnimationFrame&&Ve(oe,"requestAnimationFrame",NC),e.XMLHttpRequest&&"XMLHttpRequest"in oe&&Ve(XMLHttpRequest.prototype,"send",PC);const n=e.eventTarget;n&&(Array.isArray(n)?n:IC).forEach(s=>LC(s,e))}}}),AC=RC;function dh(t){return function(...e){const n=e[0];return e[0]=Ai(n,{mechanism:{handled:!1,type:`auto.browser.browserapierrors.${cn(t)}`}}),t.apply(this,e)}}function NC(t){return function(e){return t.apply(this,[Ai(e,{mechanism:{data:{handler:cn(t)},handled:!1,type:"auto.browser.browserapierrors.requestAnimationFrame"}})])}}function PC(t){return function(...e){const n=this;return["onload","onerror","onprogress","onreadystatechange"].forEach(s=>{s in n&&typeof n[s]=="function"&&Ve(n,s,function(r){const o={mechanism:{data:{handler:cn(r)},handled:!1,type:`auto.browser.browserapierrors.xhr.${s}`}},a=Cl(r);return a&&(o.mechanism.data.handler=cn(a)),Ai(r,o)})}),t.apply(this,e)}}function LC(t,e){const i=oe[t]?.prototype;i?.hasOwnProperty?.("addEventListener")&&(Ve(i,"addEventListener",function(s){return function(r,o,a){try{OC(o)&&(o.handleEvent=Ai(o.handleEvent,{mechanism:{data:{handler:cn(o),target:t},handled:!1,type:"auto.browser.browserapierrors.handleEvent"}}))}catch{}return e.unregisterOriginalCallbacks&&DC(this,r,o),s.apply(this,[r,Ai(o,{mechanism:{data:{handler:cn(o),target:t},handled:!1,type:"auto.browser.browserapierrors.addEventListener"}}),a])}}),Ve(i,"removeEventListener",function(s){return function(r,o,a){try{const c=o.__sentry_wrapped__;c&&s.call(this,r,c,a)}catch{}return s.call(this,r,o,a)}}))}function OC(t){return typeof t.handleEvent=="function"}function DC(t,e,n){t&&typeof t=="object"&&"removeEventListener"in t&&typeof t.removeEventListener=="function"&&t.removeEventListener(e,n)}const MC=()=>({name:"BrowserSession",setupOnce(){if(typeof oe.document>"u"){$o&&T.warn("Using the `browserSessionIntegration` in non-browser environments is not supported.");return}jd({ignoreDuration:!0}),qd(),Xp(({from:t,to:e})=>{t!==void 0&&t!==e&&(jd({ignoreDuration:!0}),qd())})}}),xC="GlobalHandlers",FC=((t={})=>{const e={onerror:!0,onunhandledrejection:!0,...t};return{name:xC,setupOnce(){Error.stackTraceLimit=50},setup(n){e.onerror&&($C(n),hh("onerror")),e.onunhandledrejection&&(BC(n),hh("onunhandledrejection"))}}}),UC=FC;function $C(t){Cw(e=>{const{stackParser:n,attachStacktrace:i}=Zp();if(Te()!==t||Yp())return;const{msg:s,url:r,line:o,column:a,error:c}=e,l=WC(Ll(n,c||s,void 0,i,!1),r,o,a);l.level="error",Lp(l,{originalException:c,mechanism:{handled:!1,type:"auto.browser.global_handlers.onerror"}})})}function BC(t){Sw(e=>{const{stackParser:n,attachStacktrace:i}=Zp();if(Te()!==t||Yp())return;const s=HC(e),r=Oo(s)?VC(s):Ll(n,s,void 0,i,!0);r.level="error",Lp(r,{originalException:s,mechanism:{handled:!1,type:"auto.browser.global_handlers.onunhandledrejection"}})})}function HC(t){if(Oo(t))return t;try{if("reason"in t)return t.reason;if("detail"in t&&"reason"in t.detail)return t.detail.reason}catch{}return t}function VC(t){return{exception:{values:[{type:"UnhandledRejection",value:`Non-Error promise rejection captured with value: ${String(t)}`}]}}}function WC(t,e,n,i){const s=t.exception=t.exception||{},r=s.values=s.values||[],o=r[0]=r[0]||{},a=o.stacktrace=o.stacktrace||{},c=a.frames=a.frames||[],l=i,u=n,d=jC(e)??El();return c.length===0&&c.push({colno:l,filename:d,function:Bn,in_app:!0,lineno:u}),t}function hh(t){$o&&T.log(`Global Handler attached: ${t}`)}function Zp(){return Te()?.getOptions()||{stackParser:()=>[],attachStacktrace:!1}}function jC(t){if(!(!Ot(t)||t.length===0)){if(t.startsWith("data:")){const e=t.match(/^data:([^;]+)/),n=e?e[1]:"text/javascript",i=t.includes("base64,");return`<data:${n}${i?",base64":""}>`}return t}}const qC=()=>({name:"HttpContext",preprocessEvent(t){if(!oe.navigator&&!oe.location&&!oe.document)return;const e=IE(),n={...e.headers,...t.request?.headers};t.request={...e,...t.request,headers:n}}}),zC="cause",GC=5,KC="LinkedErrors",YC=((t={})=>{const e=t.limit||GC,n=t.key||zC;return{name:KC,preprocessEvent(i,s,r){const o=r.getOptions();aE(Nl,o.stackParser,n,e,i,s)}}}),JC=YC;function XC(){return QC()?($o&&Vi(()=>{console.error("[Sentry] You cannot use Sentry.init() in a browser extension, see: https://docs.sentry.io/platforms/javascript/best-practices/browser-extensions/")}),!0):!1}function QC(){if(typeof oe.window>"u")return!1;const t=oe;if(t.nw||!(t.chrome||t.browser)?.runtime?.id)return!1;const n=El(),i=["chrome-extension","moz-extension","ms-browser-extension","safari-web-extension"];return!(oe===oe.top&&i.some(r=>n.startsWith(`${r}://`)))}function ZC(t){return[Zb(),Yb(),AC(),yC(),UC(),JC(),fE(),qC(),MC()]}function eT(t={}){const e=!t.skipBrowserExtensionCheck&&XC();let n=t.defaultIntegrations==null?ZC():t.defaultIntegrations;const i={...t,enabled:e?!1:t.enabled,stackParser:bw(t.stackParser||gC),integrations:yb({integrations:t.integrations,defaultIntegrations:n}),transport:t.transport||tC};return Vb(UE,i)}const tT="https://adc1b5518c6a55273a1398d1b8b9cd3e@o4510415124496384.ingest.de.sentry.io/4510415129083984";eT({dsn:tT,sendDefaultPii:!0});/**
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
 */const nT=()=>{};var fh={};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const eg={NODE_ADMIN:!1,SDK_VERSION:"${JSCORE_VERSION}"};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const g=function(t,e){if(!t)throw qi(e)},qi=function(t){return new Error("Firebase Database ("+eg.SDK_VERSION+") INTERNAL ASSERT FAILED: "+t)};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const tg=function(t){const e=[];let n=0;for(let i=0;i<t.length;i++){let s=t.charCodeAt(i);s<128?e[n++]=s:s<2048?(e[n++]=s>>6|192,e[n++]=s&63|128):(s&64512)===55296&&i+1<t.length&&(t.charCodeAt(i+1)&64512)===56320?(s=65536+((s&1023)<<10)+(t.charCodeAt(++i)&1023),e[n++]=s>>18|240,e[n++]=s>>12&63|128,e[n++]=s>>6&63|128,e[n++]=s&63|128):(e[n++]=s>>12|224,e[n++]=s>>6&63|128,e[n++]=s&63|128)}return e},iT=function(t){const e=[];let n=0,i=0;for(;n<t.length;){const s=t[n++];if(s<128)e[i++]=String.fromCharCode(s);else if(s>191&&s<224){const r=t[n++];e[i++]=String.fromCharCode((s&31)<<6|r&63)}else if(s>239&&s<365){const r=t[n++],o=t[n++],a=t[n++],c=((s&7)<<18|(r&63)<<12|(o&63)<<6|a&63)-65536;e[i++]=String.fromCharCode(55296+(c>>10)),e[i++]=String.fromCharCode(56320+(c&1023))}else{const r=t[n++],o=t[n++];e[i++]=String.fromCharCode((s&15)<<12|(r&63)<<6|o&63)}}return e.join("")},Bo={byteToCharMap_:null,charToByteMap_:null,byteToCharMapWebSafe_:null,charToByteMapWebSafe_:null,ENCODED_VALS_BASE:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",get ENCODED_VALS(){return this.ENCODED_VALS_BASE+"+/="},get ENCODED_VALS_WEBSAFE(){return this.ENCODED_VALS_BASE+"-_."},HAS_NATIVE_SUPPORT:typeof atob=="function",encodeByteArray(t,e){if(!Array.isArray(t))throw Error("encodeByteArray takes an array as a parameter");this.init_();const n=e?this.byteToCharMapWebSafe_:this.byteToCharMap_,i=[];for(let s=0;s<t.length;s+=3){const r=t[s],o=s+1<t.length,a=o?t[s+1]:0,c=s+2<t.length,l=c?t[s+2]:0,u=r>>2,d=(r&3)<<4|a>>4;let h=(a&15)<<2|l>>6,f=l&63;c||(f=64,o||(h=64)),i.push(n[u],n[d],n[h],n[f])}return i.join("")},encodeString(t,e){return this.HAS_NATIVE_SUPPORT&&!e?btoa(t):this.encodeByteArray(tg(t),e)},decodeString(t,e){return this.HAS_NATIVE_SUPPORT&&!e?atob(t):iT(this.decodeStringToByteArray(t,e))},decodeStringToByteArray(t,e){this.init_();const n=e?this.charToByteMapWebSafe_:this.charToByteMap_,i=[];for(let s=0;s<t.length;){const r=n[t.charAt(s++)],a=s<t.length?n[t.charAt(s)]:0;++s;const l=s<t.length?n[t.charAt(s)]:64;++s;const d=s<t.length?n[t.charAt(s)]:64;if(++s,r==null||a==null||l==null||d==null)throw new sT;const h=r<<2|a>>4;if(i.push(h),l!==64){const f=a<<4&240|l>>2;if(i.push(f),d!==64){const p=l<<6&192|d;i.push(p)}}}return i},init_(){if(!this.byteToCharMap_){this.byteToCharMap_={},this.charToByteMap_={},this.byteToCharMapWebSafe_={},this.charToByteMapWebSafe_={};for(let t=0;t<this.ENCODED_VALS.length;t++)this.byteToCharMap_[t]=this.ENCODED_VALS.charAt(t),this.charToByteMap_[this.byteToCharMap_[t]]=t,this.byteToCharMapWebSafe_[t]=this.ENCODED_VALS_WEBSAFE.charAt(t),this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[t]]=t,t>=this.ENCODED_VALS_BASE.length&&(this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(t)]=t,this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(t)]=t)}}};class sT extends Error{constructor(){super(...arguments),this.name="DecodeBase64StringError"}}const ng=function(t){const e=tg(t);return Bo.encodeByteArray(e,!0)},zr=function(t){return ng(t).replace(/\./g,"")},Gr=function(t){try{return Bo.decodeString(t,!0)}catch(e){console.error("base64Decode failed: ",e)}return null};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function rT(t){return ig(void 0,t)}function ig(t,e){if(!(e instanceof Object))return e;switch(e.constructor){case Date:const n=e;return new Date(n.getTime());case Object:t===void 0&&(t={});break;case Array:t=[];break;default:return e}for(const n in e)!e.hasOwnProperty(n)||!oT(n)||(t[n]=ig(t[n],e[n]));return t}function oT(t){return t!=="__proto__"}/**
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
 */function sg(){if(typeof self<"u")return self;if(typeof window<"u")return window;if(typeof global<"u")return global;throw new Error("Unable to locate global object.")}/**
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
 */const aT=()=>sg().__FIREBASE_DEFAULTS__,cT=()=>{if(typeof process>"u"||typeof fh>"u")return;const t=fh.__FIREBASE_DEFAULTS__;if(t)return JSON.parse(t)},lT=()=>{if(typeof document>"u")return;let t;try{t=document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/)}catch{return}const e=t&&Gr(t[1]);return e&&JSON.parse(e)},Ol=()=>{try{return nT()||aT()||cT()||lT()}catch(t){console.info(`Unable to get __FIREBASE_DEFAULTS__ due to: ${t}`);return}},rg=t=>Ol()?.emulatorHosts?.[t],uT=t=>{const e=rg(t);if(!e)return;const n=e.lastIndexOf(":");if(n<=0||n+1===e.length)throw new Error(`Invalid host ${e} with no separate hostname and port!`);const i=parseInt(e.substring(n+1),10);return e[0]==="["?[e.substring(1,n-1),i]:[e.substring(0,n),i]},og=()=>Ol()?.config,ag=t=>Ol()?.[`_${t}`];/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Oe{constructor(){this.reject=()=>{},this.resolve=()=>{},this.promise=new Promise((e,n)=>{this.resolve=e,this.reject=n})}wrapCallback(e){return(n,i)=>{n?this.reject(n):this.resolve(i),typeof e=="function"&&(this.promise.catch(()=>{}),e.length===1?e(n):e(n,i))}}}/**
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
 */function zi(t){try{return(t.startsWith("http://")||t.startsWith("https://")?new URL(t).hostname:t).endsWith(".cloudworkstations.dev")}catch{return!1}}async function cg(t){return(await fetch(t,{credentials:"include"})).ok}/**
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
 */function dT(t,e){if(t.uid)throw new Error('The "uid" field is no longer supported by mockUserToken. Please use "sub" instead for Firebase Auth User ID.');const n={alg:"none",type:"JWT"},i=e||"demo-project",s=t.iat||0,r=t.sub||t.user_id;if(!r)throw new Error("mockUserToken must contain 'sub' or 'user_id' field!");const o={iss:`https://securetoken.google.com/${i}`,aud:i,iat:s,exp:s+3600,auth_time:s,sub:r,user_id:r,firebase:{sign_in_provider:"custom",identities:{}},...t};return[zr(JSON.stringify(n)),zr(JSON.stringify(o)),""].join(".")}const _s={};function hT(){const t={prod:[],emulator:[]};for(const e of Object.keys(_s))_s[e]?t.emulator.push(e):t.prod.push(e);return t}function fT(t){let e=document.getElementById(t),n=!1;return e||(e=document.createElement("div"),e.setAttribute("id",t),n=!0),{created:n,element:e}}let ph=!1;function lg(t,e){if(typeof window>"u"||typeof document>"u"||!zi(window.location.host)||_s[t]===e||_s[t]||ph)return;_s[t]=e;function n(h){return`__firebase__banner__${h}`}const i="__firebase__banner",r=hT().prod.length>0;function o(){const h=document.getElementById(i);h&&h.remove()}function a(h){h.style.display="flex",h.style.background="#7faaf0",h.style.position="fixed",h.style.bottom="5px",h.style.left="5px",h.style.padding=".5em",h.style.borderRadius="5px",h.style.alignItems="center"}function c(h,f){h.setAttribute("width","24"),h.setAttribute("id",f),h.setAttribute("height","24"),h.setAttribute("viewBox","0 0 24 24"),h.setAttribute("fill","none"),h.style.marginLeft="-6px"}function l(){const h=document.createElement("span");return h.style.cursor="pointer",h.style.marginLeft="16px",h.style.fontSize="24px",h.innerHTML=" &times;",h.onclick=()=>{ph=!0,o()},h}function u(h,f){h.setAttribute("id",f),h.innerText="Learn more",h.href="https://firebase.google.com/docs/studio/preview-apps#preview-backend",h.setAttribute("target","__blank"),h.style.paddingLeft="5px",h.style.textDecoration="underline"}function d(){const h=fT(i),f=n("text"),p=document.getElementById(f)||document.createElement("span"),_=n("learnmore"),m=document.getElementById(_)||document.createElement("a"),A=n("preprendIcon"),x=document.getElementById(A)||document.createElementNS("http://www.w3.org/2000/svg","svg");if(h.created){const W=h.element;a(W),u(m,_);const S=l();c(x,A),W.append(x,p,m,S),document.body.appendChild(W)}r?(p.innerText="Preview backend disconnected.",x.innerHTML=`<g clip-path="url(#clip0_6013_33858)">
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
 */function Pe(){return typeof navigator<"u"&&typeof navigator.userAgent=="string"?navigator.userAgent:""}function Dl(){return typeof window<"u"&&!!(window.cordova||window.phonegap||window.PhoneGap)&&/ios|iphone|ipod|ipad|android|blackberry|iemobile/i.test(Pe())}function pT(){return typeof navigator<"u"&&navigator.userAgent==="Cloudflare-Workers"}function gT(){const t=typeof chrome=="object"?chrome.runtime:typeof browser=="object"?browser.runtime:void 0;return typeof t=="object"&&t.id!==void 0}function ug(){return typeof navigator=="object"&&navigator.product==="ReactNative"}function mT(){const t=Pe();return t.indexOf("MSIE ")>=0||t.indexOf("Trident/")>=0}function _T(){return eg.NODE_ADMIN===!0}function Ho(){try{return typeof indexedDB=="object"}catch{return!1}}function dg(){return new Promise((t,e)=>{try{let n=!0;const i="validate-browser-context-for-indexeddb-analytics-module",s=self.indexedDB.open(i);s.onsuccess=()=>{s.result.close(),n||self.indexedDB.deleteDatabase(i),t(!0)},s.onupgradeneeded=()=>{n=!1},s.onerror=()=>{e(s.error?.message||"")}}catch(n){e(n)}})}function yT(){return!(typeof navigator>"u"||!navigator.cookieEnabled)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const wT="FirebaseError";class jt extends Error{constructor(e,n,i){super(n),this.code=e,this.customData=i,this.name=wT,Object.setPrototypeOf(this,jt.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,wn.prototype.create)}}class wn{constructor(e,n,i){this.service=e,this.serviceName=n,this.errors=i}create(e,...n){const i=n[0]||{},s=`${this.service}/${e}`,r=this.errors[e],o=r?vT(r,i):"Error",a=`${this.serviceName}: ${o} (${s}).`;return new jt(s,a,i)}}function vT(t,e){return t.replace(bT,(n,i)=>{const s=e[i];return s!=null?String(s):`<${i}?>`})}const bT=/\{\$([^}]+)}/g;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ds(t){return JSON.parse(t)}function le(t){return JSON.stringify(t)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const hg=function(t){let e={},n={},i={},s="";try{const r=t.split(".");e=Ds(Gr(r[0])||""),n=Ds(Gr(r[1])||""),s=r[2],i=n.d||{},delete n.d}catch{}return{header:e,claims:n,data:i,signature:s}},ET=function(t){const e=hg(t),n=e.claims;return!!n&&typeof n=="object"&&n.hasOwnProperty("iat")},CT=function(t){const e=hg(t).claims;return typeof e=="object"&&e.admin===!0};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Et(t,e){return Object.prototype.hasOwnProperty.call(t,e)}function Ni(t,e){if(Object.prototype.hasOwnProperty.call(t,e))return t[e]}function Kr(t){for(const e in t)if(Object.prototype.hasOwnProperty.call(t,e))return!1;return!0}function Yr(t,e,n){const i={};for(const s in t)Object.prototype.hasOwnProperty.call(t,s)&&(i[s]=e.call(n,t[s],s,t));return i}function Vn(t,e){if(t===e)return!0;const n=Object.keys(t),i=Object.keys(e);for(const s of n){if(!i.includes(s))return!1;const r=t[s],o=e[s];if(gh(r)&&gh(o)){if(!Vn(r,o))return!1}else if(r!==o)return!1}for(const s of i)if(!n.includes(s))return!1;return!0}function gh(t){return t!==null&&typeof t=="object"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
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
 */class TT{constructor(){this.chain_=[],this.buf_=[],this.W_=[],this.pad_=[],this.inbuf_=0,this.total_=0,this.blockSize=512/8,this.pad_[0]=128;for(let e=1;e<this.blockSize;++e)this.pad_[e]=0;this.reset()}reset(){this.chain_[0]=1732584193,this.chain_[1]=4023233417,this.chain_[2]=2562383102,this.chain_[3]=271733878,this.chain_[4]=3285377520,this.inbuf_=0,this.total_=0}compress_(e,n){n||(n=0);const i=this.W_;if(typeof e=="string")for(let d=0;d<16;d++)i[d]=e.charCodeAt(n)<<24|e.charCodeAt(n+1)<<16|e.charCodeAt(n+2)<<8|e.charCodeAt(n+3),n+=4;else for(let d=0;d<16;d++)i[d]=e[n]<<24|e[n+1]<<16|e[n+2]<<8|e[n+3],n+=4;for(let d=16;d<80;d++){const h=i[d-3]^i[d-8]^i[d-14]^i[d-16];i[d]=(h<<1|h>>>31)&4294967295}let s=this.chain_[0],r=this.chain_[1],o=this.chain_[2],a=this.chain_[3],c=this.chain_[4],l,u;for(let d=0;d<80;d++){d<40?d<20?(l=a^r&(o^a),u=1518500249):(l=r^o^a,u=1859775393):d<60?(l=r&o|a&(r|o),u=2400959708):(l=r^o^a,u=3395469782);const h=(s<<5|s>>>27)+l+c+u+i[d]&4294967295;c=a,a=o,o=(r<<30|r>>>2)&4294967295,r=s,s=h}this.chain_[0]=this.chain_[0]+s&4294967295,this.chain_[1]=this.chain_[1]+r&4294967295,this.chain_[2]=this.chain_[2]+o&4294967295,this.chain_[3]=this.chain_[3]+a&4294967295,this.chain_[4]=this.chain_[4]+c&4294967295}update(e,n){if(e==null)return;n===void 0&&(n=e.length);const i=n-this.blockSize;let s=0;const r=this.buf_;let o=this.inbuf_;for(;s<n;){if(o===0)for(;s<=i;)this.compress_(e,s),s+=this.blockSize;if(typeof e=="string"){for(;s<n;)if(r[o]=e.charCodeAt(s),++o,++s,o===this.blockSize){this.compress_(r),o=0;break}}else for(;s<n;)if(r[o]=e[s],++o,++s,o===this.blockSize){this.compress_(r),o=0;break}}this.inbuf_=o,this.total_+=n}digest(){const e=[];let n=this.total_*8;this.inbuf_<56?this.update(this.pad_,56-this.inbuf_):this.update(this.pad_,this.blockSize-(this.inbuf_-56));for(let s=this.blockSize-1;s>=56;s--)this.buf_[s]=n&255,n/=256;this.compress_(this.buf_);let i=0;for(let s=0;s<5;s++)for(let r=24;r>=0;r-=8)e[i]=this.chain_[s]>>r&255,++i;return e}}function ST(t,e){const n=new IT(t,e);return n.subscribe.bind(n)}class IT{constructor(e,n){this.observers=[],this.unsubscribes=[],this.observerCount=0,this.task=Promise.resolve(),this.finalized=!1,this.onNoObservers=n,this.task.then(()=>{e(this)}).catch(i=>{this.error(i)})}next(e){this.forEachObserver(n=>{n.next(e)})}error(e){this.forEachObserver(n=>{n.error(e)}),this.close(e)}complete(){this.forEachObserver(e=>{e.complete()}),this.close()}subscribe(e,n,i){let s;if(e===void 0&&n===void 0&&i===void 0)throw new Error("Missing Observer.");kT(e,["next","error","complete"])?s=e:s={next:e,error:n,complete:i},s.next===void 0&&(s.next=Da),s.error===void 0&&(s.error=Da),s.complete===void 0&&(s.complete=Da);const r=this.unsubscribeOne.bind(this,this.observers.length);return this.finalized&&this.task.then(()=>{try{this.finalError?s.error(this.finalError):s.complete()}catch{}}),this.observers.push(s),r}unsubscribeOne(e){this.observers===void 0||this.observers[e]===void 0||(delete this.observers[e],this.observerCount-=1,this.observerCount===0&&this.onNoObservers!==void 0&&this.onNoObservers(this))}forEachObserver(e){if(!this.finalized)for(let n=0;n<this.observers.length;n++)this.sendOne(n,e)}sendOne(e,n){this.task.then(()=>{if(this.observers!==void 0&&this.observers[e]!==void 0)try{n(this.observers[e])}catch(i){typeof console<"u"&&console.error&&console.error(i)}})}close(e){this.finalized||(this.finalized=!0,e!==void 0&&(this.finalError=e),this.task.then(()=>{this.observers=void 0,this.onNoObservers=void 0}))}}function kT(t,e){if(typeof t!="object"||t===null)return!1;for(const n of e)if(n in t&&typeof t[n]=="function")return!0;return!1}function Da(){}function Pi(t,e){return`${t} failed: ${e} argument `}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const RT=function(t){const e=[];let n=0;for(let i=0;i<t.length;i++){let s=t.charCodeAt(i);if(s>=55296&&s<=56319){const r=s-55296;i++,g(i<t.length,"Surrogate pair missing trail surrogate.");const o=t.charCodeAt(i)-56320;s=65536+(r<<10)+o}s<128?e[n++]=s:s<2048?(e[n++]=s>>6|192,e[n++]=s&63|128):s<65536?(e[n++]=s>>12|224,e[n++]=s>>6&63|128,e[n++]=s&63|128):(e[n++]=s>>18|240,e[n++]=s>>12&63|128,e[n++]=s>>6&63|128,e[n++]=s&63|128)}return e},Vo=function(t){let e=0;for(let n=0;n<t.length;n++){const i=t.charCodeAt(n);i<128?e++:i<2048?e+=2:i>=55296&&i<=56319?(e+=4,n++):e+=3}return e};/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const AT=1e3,NT=2,PT=14400*1e3,LT=.5;function OT(t,e=AT,n=NT){const i=e*Math.pow(n,t),s=Math.round(LT*i*(Math.random()-.5)*2);return Math.min(PT,i+s)}/**
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
 */function re(t){return t&&t._delegate?t._delegate:t}class qe{constructor(e,n,i){this.name=e,this.instanceFactory=n,this.type=i,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}setInstantiationMode(e){return this.instantiationMode=e,this}setMultipleInstances(e){return this.multipleInstances=e,this}setServiceProps(e){return this.serviceProps=e,this}setInstanceCreatedCallback(e){return this.onInstanceCreated=e,this}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const An="[DEFAULT]";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class DT{constructor(e,n){this.name=e,this.container=n,this.component=null,this.instances=new Map,this.instancesDeferred=new Map,this.instancesOptions=new Map,this.onInitCallbacks=new Map}get(e){const n=this.normalizeInstanceIdentifier(e);if(!this.instancesDeferred.has(n)){const i=new Oe;if(this.instancesDeferred.set(n,i),this.isInitialized(n)||this.shouldAutoInitialize())try{const s=this.getOrInitializeService({instanceIdentifier:n});s&&i.resolve(s)}catch{}}return this.instancesDeferred.get(n).promise}getImmediate(e){const n=this.normalizeInstanceIdentifier(e?.identifier),i=e?.optional??!1;if(this.isInitialized(n)||this.shouldAutoInitialize())try{return this.getOrInitializeService({instanceIdentifier:n})}catch(s){if(i)return null;throw s}else{if(i)return null;throw Error(`Service ${this.name} is not available`)}}getComponent(){return this.component}setComponent(e){if(e.name!==this.name)throw Error(`Mismatching Component ${e.name} for Provider ${this.name}.`);if(this.component)throw Error(`Component for ${this.name} has already been provided`);if(this.component=e,!!this.shouldAutoInitialize()){if(xT(e))try{this.getOrInitializeService({instanceIdentifier:An})}catch{}for(const[n,i]of this.instancesDeferred.entries()){const s=this.normalizeInstanceIdentifier(n);try{const r=this.getOrInitializeService({instanceIdentifier:s});i.resolve(r)}catch{}}}}clearInstance(e=An){this.instancesDeferred.delete(e),this.instancesOptions.delete(e),this.instances.delete(e)}async delete(){const e=Array.from(this.instances.values());await Promise.all([...e.filter(n=>"INTERNAL"in n).map(n=>n.INTERNAL.delete()),...e.filter(n=>"_delete"in n).map(n=>n._delete())])}isComponentSet(){return this.component!=null}isInitialized(e=An){return this.instances.has(e)}getOptions(e=An){return this.instancesOptions.get(e)||{}}initialize(e={}){const{options:n={}}=e,i=this.normalizeInstanceIdentifier(e.instanceIdentifier);if(this.isInitialized(i))throw Error(`${this.name}(${i}) has already been initialized`);if(!this.isComponentSet())throw Error(`Component ${this.name} has not been registered yet`);const s=this.getOrInitializeService({instanceIdentifier:i,options:n});for(const[r,o]of this.instancesDeferred.entries()){const a=this.normalizeInstanceIdentifier(r);i===a&&o.resolve(s)}return s}onInit(e,n){const i=this.normalizeInstanceIdentifier(n),s=this.onInitCallbacks.get(i)??new Set;s.add(e),this.onInitCallbacks.set(i,s);const r=this.instances.get(i);return r&&e(r,i),()=>{s.delete(e)}}invokeOnInitCallbacks(e,n){const i=this.onInitCallbacks.get(n);if(i)for(const s of i)try{s(e,n)}catch{}}getOrInitializeService({instanceIdentifier:e,options:n={}}){let i=this.instances.get(e);if(!i&&this.component&&(i=this.component.instanceFactory(this.container,{instanceIdentifier:MT(e),options:n}),this.instances.set(e,i),this.instancesOptions.set(e,n),this.invokeOnInitCallbacks(i,e),this.component.onInstanceCreated))try{this.component.onInstanceCreated(this.container,e,i)}catch{}return i||null}normalizeInstanceIdentifier(e=An){return this.component?this.component.multipleInstances?e:An:e}shouldAutoInitialize(){return!!this.component&&this.component.instantiationMode!=="EXPLICIT"}}function MT(t){return t===An?void 0:t}function xT(t){return t.instantiationMode==="EAGER"}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class FT{constructor(e){this.name=e,this.providers=new Map}addComponent(e){const n=this.getProvider(e.name);if(n.isComponentSet())throw new Error(`Component ${e.name} has already been registered with ${this.name}`);n.setComponent(e)}addOrOverwriteComponent(e){this.getProvider(e.name).isComponentSet()&&this.providers.delete(e.name),this.addComponent(e)}getProvider(e){if(this.providers.has(e))return this.providers.get(e);const n=new DT(e,this);return this.providers.set(e,n),n}getProviders(){return Array.from(this.providers.values())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var q;(function(t){t[t.DEBUG=0]="DEBUG",t[t.VERBOSE=1]="VERBOSE",t[t.INFO=2]="INFO",t[t.WARN=3]="WARN",t[t.ERROR=4]="ERROR",t[t.SILENT=5]="SILENT"})(q||(q={}));const UT={debug:q.DEBUG,verbose:q.VERBOSE,info:q.INFO,warn:q.WARN,error:q.ERROR,silent:q.SILENT},$T=q.INFO,BT={[q.DEBUG]:"log",[q.VERBOSE]:"log",[q.INFO]:"info",[q.WARN]:"warn",[q.ERROR]:"error"},HT=(t,e,...n)=>{if(e<t.logLevel)return;const i=new Date().toISOString(),s=BT[e];if(s)console[s](`[${i}]  ${t.name}:`,...n);else throw new Error(`Attempted to log a message with an invalid logType (value: ${e})`)};class Wo{constructor(e){this.name=e,this._logLevel=$T,this._logHandler=HT,this._userLogHandler=null}get logLevel(){return this._logLevel}set logLevel(e){if(!(e in q))throw new TypeError(`Invalid value "${e}" assigned to \`logLevel\``);this._logLevel=e}setLogLevel(e){this._logLevel=typeof e=="string"?UT[e]:e}get logHandler(){return this._logHandler}set logHandler(e){if(typeof e!="function")throw new TypeError("Value assigned to `logHandler` must be a function");this._logHandler=e}get userLogHandler(){return this._userLogHandler}set userLogHandler(e){this._userLogHandler=e}debug(...e){this._userLogHandler&&this._userLogHandler(this,q.DEBUG,...e),this._logHandler(this,q.DEBUG,...e)}log(...e){this._userLogHandler&&this._userLogHandler(this,q.VERBOSE,...e),this._logHandler(this,q.VERBOSE,...e)}info(...e){this._userLogHandler&&this._userLogHandler(this,q.INFO,...e),this._logHandler(this,q.INFO,...e)}warn(...e){this._userLogHandler&&this._userLogHandler(this,q.WARN,...e),this._logHandler(this,q.WARN,...e)}error(...e){this._userLogHandler&&this._userLogHandler(this,q.ERROR,...e),this._logHandler(this,q.ERROR,...e)}}const VT=(t,e)=>e.some(n=>t instanceof n);let mh,_h;function WT(){return mh||(mh=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])}function jT(){return _h||(_h=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])}const fg=new WeakMap,Ac=new WeakMap,pg=new WeakMap,Ma=new WeakMap,Ml=new WeakMap;function qT(t){const e=new Promise((n,i)=>{const s=()=>{t.removeEventListener("success",r),t.removeEventListener("error",o)},r=()=>{n(Mt(t.result)),s()},o=()=>{i(t.error),s()};t.addEventListener("success",r),t.addEventListener("error",o)});return e.then(n=>{n instanceof IDBCursor&&fg.set(n,t)}).catch(()=>{}),Ml.set(e,t),e}function zT(t){if(Ac.has(t))return;const e=new Promise((n,i)=>{const s=()=>{t.removeEventListener("complete",r),t.removeEventListener("error",o),t.removeEventListener("abort",o)},r=()=>{n(),s()},o=()=>{i(t.error||new DOMException("AbortError","AbortError")),s()};t.addEventListener("complete",r),t.addEventListener("error",o),t.addEventListener("abort",o)});Ac.set(t,e)}let Nc={get(t,e,n){if(t instanceof IDBTransaction){if(e==="done")return Ac.get(t);if(e==="objectStoreNames")return t.objectStoreNames||pg.get(t);if(e==="store")return n.objectStoreNames[1]?void 0:n.objectStore(n.objectStoreNames[0])}return Mt(t[e])},set(t,e,n){return t[e]=n,!0},has(t,e){return t instanceof IDBTransaction&&(e==="done"||e==="store")?!0:e in t}};function GT(t){Nc=t(Nc)}function KT(t){return t===IDBDatabase.prototype.transaction&&!("objectStoreNames"in IDBTransaction.prototype)?function(e,...n){const i=t.call(xa(this),e,...n);return pg.set(i,e.sort?e.sort():[e]),Mt(i)}:jT().includes(t)?function(...e){return t.apply(xa(this),e),Mt(fg.get(this))}:function(...e){return Mt(t.apply(xa(this),e))}}function YT(t){return typeof t=="function"?KT(t):(t instanceof IDBTransaction&&zT(t),VT(t,WT())?new Proxy(t,Nc):t)}function Mt(t){if(t instanceof IDBRequest)return qT(t);if(Ma.has(t))return Ma.get(t);const e=YT(t);return e!==t&&(Ma.set(t,e),Ml.set(e,t)),e}const xa=t=>Ml.get(t);function jo(t,e,{blocked:n,upgrade:i,blocking:s,terminated:r}={}){const o=indexedDB.open(t,e),a=Mt(o);return i&&o.addEventListener("upgradeneeded",c=>{i(Mt(o.result),c.oldVersion,c.newVersion,Mt(o.transaction),c)}),n&&o.addEventListener("blocked",c=>n(c.oldVersion,c.newVersion,c)),a.then(c=>{r&&c.addEventListener("close",()=>r()),s&&c.addEventListener("versionchange",l=>s(l.oldVersion,l.newVersion,l))}).catch(()=>{}),a}function Fa(t,{blocked:e}={}){const n=indexedDB.deleteDatabase(t);return e&&n.addEventListener("blocked",i=>e(i.oldVersion,i)),Mt(n).then(()=>{})}const JT=["get","getKey","getAll","getAllKeys","count"],XT=["put","add","delete","clear"],Ua=new Map;function yh(t,e){if(!(t instanceof IDBDatabase&&!(e in t)&&typeof e=="string"))return;if(Ua.get(e))return Ua.get(e);const n=e.replace(/FromIndex$/,""),i=e!==n,s=XT.includes(n);if(!(n in(i?IDBIndex:IDBObjectStore).prototype)||!(s||JT.includes(n)))return;const r=async function(o,...a){const c=this.transaction(o,s?"readwrite":"readonly");let l=c.store;return i&&(l=l.index(a.shift())),(await Promise.all([l[n](...a),s&&c.done]))[0]};return Ua.set(e,r),r}GT(t=>({...t,get:(e,n,i)=>yh(e,n)||t.get(e,n,i),has:(e,n)=>!!yh(e,n)||t.has(e,n)}));/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class QT{constructor(e){this.container=e}getPlatformInfoString(){return this.container.getProviders().map(n=>{if(ZT(n)){const i=n.getImmediate();return`${i.library}/${i.version}`}else return null}).filter(n=>n).join(" ")}}function ZT(t){return t.getComponent()?.type==="VERSION"}const Pc="@firebase/app",wh="0.14.7";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ut=new Wo("@firebase/app"),eS="@firebase/app-compat",tS="@firebase/analytics-compat",nS="@firebase/analytics",iS="@firebase/app-check-compat",sS="@firebase/app-check",rS="@firebase/auth",oS="@firebase/auth-compat",aS="@firebase/database",cS="@firebase/data-connect",lS="@firebase/database-compat",uS="@firebase/functions",dS="@firebase/functions-compat",hS="@firebase/installations",fS="@firebase/installations-compat",pS="@firebase/messaging",gS="@firebase/messaging-compat",mS="@firebase/performance",_S="@firebase/performance-compat",yS="@firebase/remote-config",wS="@firebase/remote-config-compat",vS="@firebase/storage",bS="@firebase/storage-compat",ES="@firebase/firestore",CS="@firebase/ai",TS="@firebase/firestore-compat",SS="firebase",IS="12.8.0";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Lc="[DEFAULT]",kS={[Pc]:"fire-core",[eS]:"fire-core-compat",[nS]:"fire-analytics",[tS]:"fire-analytics-compat",[sS]:"fire-app-check",[iS]:"fire-app-check-compat",[rS]:"fire-auth",[oS]:"fire-auth-compat",[aS]:"fire-rtdb",[cS]:"fire-data-connect",[lS]:"fire-rtdb-compat",[uS]:"fire-fn",[dS]:"fire-fn-compat",[hS]:"fire-iid",[fS]:"fire-iid-compat",[pS]:"fire-fcm",[gS]:"fire-fcm-compat",[mS]:"fire-perf",[_S]:"fire-perf-compat",[yS]:"fire-rc",[wS]:"fire-rc-compat",[vS]:"fire-gcs",[bS]:"fire-gcs-compat",[ES]:"fire-fst",[TS]:"fire-fst-compat",[CS]:"fire-vertex","fire-js":"fire-js",[SS]:"fire-js-all"};/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Jr=new Map,RS=new Map,Oc=new Map;function vh(t,e){try{t.container.addComponent(e)}catch(n){Ut.debug(`Component ${e.name} failed to register with FirebaseApp ${t.name}`,n)}}function Xe(t){const e=t.name;if(Oc.has(e))return Ut.debug(`There were multiple attempts to register component ${e}.`),!1;Oc.set(e,t);for(const n of Jr.values())vh(n,t);for(const n of RS.values())vh(n,t);return!0}function vn(t,e){const n=t.container.getProvider("heartbeat").getImmediate({optional:!0});return n&&n.triggerHeartbeat(),t.container.getProvider(e)}function st(t){return t==null?!1:t.settings!==void 0}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const AS={"no-app":"No Firebase App '{$appName}' has been created - call initializeApp() first","bad-app-name":"Illegal App name: '{$appName}'","duplicate-app":"Firebase App named '{$appName}' already exists with different options or config","app-deleted":"Firebase App named '{$appName}' already deleted","server-app-deleted":"Firebase Server App has been deleted","no-options":"Need to provide options, when not being deployed to hosting via source.","invalid-app-argument":"firebase.{$appName}() takes either no argument or a Firebase App instance.","invalid-log-argument":"First argument to `onLog` must be null or a function.","idb-open":"Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.","idb-get":"Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.","idb-set":"Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.","idb-delete":"Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}.","finalization-registry-not-supported":"FirebaseServerApp deleteOnDeref field defined but the JS runtime does not support FinalizationRegistry.","invalid-server-app-environment":"FirebaseServerApp is not for use in browser environments."},nn=new wn("app","Firebase",AS);/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class NS{constructor(e,n,i){this._isDeleted=!1,this._options={...e},this._config={...n},this._name=n.name,this._automaticDataCollectionEnabled=n.automaticDataCollectionEnabled,this._container=i,this.container.addComponent(new qe("app",()=>this,"PUBLIC"))}get automaticDataCollectionEnabled(){return this.checkDestroyed(),this._automaticDataCollectionEnabled}set automaticDataCollectionEnabled(e){this.checkDestroyed(),this._automaticDataCollectionEnabled=e}get name(){return this.checkDestroyed(),this._name}get options(){return this.checkDestroyed(),this._options}get config(){return this.checkDestroyed(),this._config}get container(){return this._container}get isDeleted(){return this._isDeleted}set isDeleted(e){this._isDeleted=e}checkDestroyed(){if(this.isDeleted)throw nn.create("app-deleted",{appName:this._name})}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ki=IS;function gg(t,e={}){let n=t;typeof e!="object"&&(e={name:e});const i={name:Lc,automaticDataCollectionEnabled:!0,...e},s=i.name;if(typeof s!="string"||!s)throw nn.create("bad-app-name",{appName:String(s)});if(n||(n=og()),!n)throw nn.create("no-options");const r=Jr.get(s);if(r){if(Vn(n,r.options)&&Vn(i,r.config))return r;throw nn.create("duplicate-app",{appName:s})}const o=new FT(s);for(const c of Oc.values())o.addComponent(c);const a=new NS(n,i,o);return Jr.set(s,a),a}function qo(t=Lc){const e=Jr.get(t);if(!e&&t===Lc&&og())return gg();if(!e)throw nn.create("no-app",{appName:t});return e}function je(t,e,n){let i=kS[t]??t;n&&(i+=`-${n}`);const s=i.match(/\s|\//),r=e.match(/\s|\//);if(s||r){const o=[`Unable to register library "${i}" with version "${e}":`];s&&o.push(`library name "${i}" contains illegal characters (whitespace or "/")`),s&&r&&o.push("and"),r&&o.push(`version name "${e}" contains illegal characters (whitespace or "/")`),Ut.warn(o.join(" "));return}Xe(new qe(`${i}-version`,()=>({library:i,version:e}),"VERSION"))}/**
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
 */const PS="firebase-heartbeat-database",LS=1,Ms="firebase-heartbeat-store";let $a=null;function mg(){return $a||($a=jo(PS,LS,{upgrade:(t,e)=>{switch(e){case 0:try{t.createObjectStore(Ms)}catch(n){console.warn(n)}}}}).catch(t=>{throw nn.create("idb-open",{originalErrorMessage:t.message})})),$a}async function OS(t){try{const n=(await mg()).transaction(Ms),i=await n.objectStore(Ms).get(_g(t));return await n.done,i}catch(e){if(e instanceof jt)Ut.warn(e.message);else{const n=nn.create("idb-get",{originalErrorMessage:e?.message});Ut.warn(n.message)}}}async function bh(t,e){try{const i=(await mg()).transaction(Ms,"readwrite");await i.objectStore(Ms).put(e,_g(t)),await i.done}catch(n){if(n instanceof jt)Ut.warn(n.message);else{const i=nn.create("idb-set",{originalErrorMessage:n?.message});Ut.warn(i.message)}}}function _g(t){return`${t.name}!${t.options.appId}`}/**
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
 */const DS=1024,MS=30;class xS{constructor(e){this.container=e,this._heartbeatsCache=null;const n=this.container.getProvider("app").getImmediate();this._storage=new US(n),this._heartbeatsCachePromise=this._storage.read().then(i=>(this._heartbeatsCache=i,i))}async triggerHeartbeat(){try{const n=this.container.getProvider("platform-logger").getImmediate().getPlatformInfoString(),i=Eh();if(this._heartbeatsCache?.heartbeats==null&&(this._heartbeatsCache=await this._heartbeatsCachePromise,this._heartbeatsCache?.heartbeats==null)||this._heartbeatsCache.lastSentHeartbeatDate===i||this._heartbeatsCache.heartbeats.some(s=>s.date===i))return;if(this._heartbeatsCache.heartbeats.push({date:i,agent:n}),this._heartbeatsCache.heartbeats.length>MS){const s=$S(this._heartbeatsCache.heartbeats);this._heartbeatsCache.heartbeats.splice(s,1)}return this._storage.overwrite(this._heartbeatsCache)}catch(e){Ut.warn(e)}}async getHeartbeatsHeader(){try{if(this._heartbeatsCache===null&&await this._heartbeatsCachePromise,this._heartbeatsCache?.heartbeats==null||this._heartbeatsCache.heartbeats.length===0)return"";const e=Eh(),{heartbeatsToSend:n,unsentEntries:i}=FS(this._heartbeatsCache.heartbeats),s=zr(JSON.stringify({version:2,heartbeats:n}));return this._heartbeatsCache.lastSentHeartbeatDate=e,i.length>0?(this._heartbeatsCache.heartbeats=i,await this._storage.overwrite(this._heartbeatsCache)):(this._heartbeatsCache.heartbeats=[],this._storage.overwrite(this._heartbeatsCache)),s}catch(e){return Ut.warn(e),""}}}function Eh(){return new Date().toISOString().substring(0,10)}function FS(t,e=DS){const n=[];let i=t.slice();for(const s of t){const r=n.find(o=>o.agent===s.agent);if(r){if(r.dates.push(s.date),Ch(n)>e){r.dates.pop();break}}else if(n.push({agent:s.agent,dates:[s.date]}),Ch(n)>e){n.pop();break}i=i.slice(1)}return{heartbeatsToSend:n,unsentEntries:i}}class US{constructor(e){this.app=e,this._canUseIndexedDBPromise=this.runIndexedDBEnvironmentCheck()}async runIndexedDBEnvironmentCheck(){return Ho()?dg().then(()=>!0).catch(()=>!1):!1}async read(){if(await this._canUseIndexedDBPromise){const n=await OS(this.app);return n?.heartbeats?n:{heartbeats:[]}}else return{heartbeats:[]}}async overwrite(e){if(await this._canUseIndexedDBPromise){const i=await this.read();return bh(this.app,{lastSentHeartbeatDate:e.lastSentHeartbeatDate??i.lastSentHeartbeatDate,heartbeats:e.heartbeats})}else return}async add(e){if(await this._canUseIndexedDBPromise){const i=await this.read();return bh(this.app,{lastSentHeartbeatDate:e.lastSentHeartbeatDate??i.lastSentHeartbeatDate,heartbeats:[...i.heartbeats,...e.heartbeats]})}else return}}function Ch(t){return zr(JSON.stringify({version:2,heartbeats:t})).length}function $S(t){if(t.length===0)return-1;let e=0,n=t[0].date;for(let i=1;i<t.length;i++)t[i].date<n&&(n=t[i].date,e=i);return e}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function BS(t){Xe(new qe("platform-logger",e=>new QT(e),"PRIVATE")),Xe(new qe("heartbeat",e=>new xS(e),"PRIVATE")),je(Pc,wh,t),je(Pc,wh,"esm2020"),je("fire-js","")}BS("");var Th={};const Sh="@firebase/database",Ih="1.1.0";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let yg="";function HS(t){yg=t}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class VS{constructor(e){this.domStorage_=e,this.prefix_="firebase:"}set(e,n){n==null?this.domStorage_.removeItem(this.prefixedName_(e)):this.domStorage_.setItem(this.prefixedName_(e),le(n))}get(e){const n=this.domStorage_.getItem(this.prefixedName_(e));return n==null?null:Ds(n)}remove(e){this.domStorage_.removeItem(this.prefixedName_(e))}prefixedName_(e){return this.prefix_+e}toString(){return this.domStorage_.toString()}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class WS{constructor(){this.cache_={},this.isInMemoryStorage=!0}set(e,n){n==null?delete this.cache_[e]:this.cache_[e]=n}get(e){return Et(this.cache_,e)?this.cache_[e]:null}remove(e){delete this.cache_[e]}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const wg=function(t){try{if(typeof window<"u"&&typeof window[t]<"u"){const e=window[t];return e.setItem("firebase:sentinel","cache"),e.removeItem("firebase:sentinel"),new VS(e)}}catch{}return new WS},On=wg("localStorage"),jS=wg("sessionStorage");/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ui=new Wo("@firebase/database"),qS=(function(){let t=1;return function(){return t++}})(),vg=function(t){const e=RT(t),n=new TT;n.update(e);const i=n.digest();return Bo.encodeByteArray(i)},ir=function(...t){let e="";for(let n=0;n<t.length;n++){const i=t[n];Array.isArray(i)||i&&typeof i=="object"&&typeof i.length=="number"?e+=ir.apply(null,i):typeof i=="object"?e+=le(i):e+=i,e+=" "}return e};let ys=null,kh=!0;const zS=function(t,e){g(!0,"Can't turn on custom loggers persistently."),ui.logLevel=q.VERBOSE,ys=ui.log.bind(ui)},pe=function(...t){if(kh===!0&&(kh=!1,ys===null&&jS.get("logging_enabled")===!0&&zS()),ys){const e=ir.apply(null,t);ys(e)}},sr=function(t){return function(...e){pe(t,...e)}},Dc=function(...t){const e="FIREBASE INTERNAL ERROR: "+ir(...t);ui.error(e)},$t=function(...t){const e=`FIREBASE FATAL ERROR: ${ir(...t)}`;throw ui.error(e),new Error(e)},Ne=function(...t){const e="FIREBASE WARNING: "+ir(...t);ui.warn(e)},GS=function(){typeof window<"u"&&window.location&&window.location.protocol&&window.location.protocol.indexOf("https:")!==-1&&Ne("Insecure Firebase access from a secure page. Please use https in calls to new Firebase().")},zo=function(t){return typeof t=="number"&&(t!==t||t===Number.POSITIVE_INFINITY||t===Number.NEGATIVE_INFINITY)},KS=function(t){if(document.readyState==="complete")t();else{let e=!1;const n=function(){if(!document.body){setTimeout(n,Math.floor(10));return}e||(e=!0,t())};document.addEventListener?(document.addEventListener("DOMContentLoaded",n,!1),window.addEventListener("load",n,!1)):document.attachEvent&&(document.attachEvent("onreadystatechange",()=>{document.readyState==="complete"&&n()}),window.attachEvent("onload",n))}},Li="[MIN_NAME]",Wn="[MAX_NAME]",ei=function(t,e){if(t===e)return 0;if(t===Li||e===Wn)return-1;if(e===Li||t===Wn)return 1;{const n=Rh(t),i=Rh(e);return n!==null?i!==null?n-i===0?t.length-e.length:n-i:-1:i!==null?1:t<e?-1:1}},YS=function(t,e){return t===e?0:t<e?-1:1},cs=function(t,e){if(e&&t in e)return e[t];throw new Error("Missing required key ("+t+") in object: "+le(e))},xl=function(t){if(typeof t!="object"||t===null)return le(t);const e=[];for(const i in t)e.push(i);e.sort();let n="{";for(let i=0;i<e.length;i++)i!==0&&(n+=","),n+=le(e[i]),n+=":",n+=xl(t[e[i]]);return n+="}",n},bg=function(t,e){const n=t.length;if(n<=e)return[t];const i=[];for(let s=0;s<n;s+=e)s+e>n?i.push(t.substring(s,n)):i.push(t.substring(s,s+e));return i};function ye(t,e){for(const n in t)t.hasOwnProperty(n)&&e(n,t[n])}const Eg=function(t){g(!zo(t),"Invalid JSON number");const e=11,n=52,i=(1<<e-1)-1;let s,r,o,a,c;t===0?(r=0,o=0,s=1/t===-1/0?1:0):(s=t<0,t=Math.abs(t),t>=Math.pow(2,1-i)?(a=Math.min(Math.floor(Math.log(t)/Math.LN2),i),r=a+i,o=Math.round(t*Math.pow(2,n-a)-Math.pow(2,n))):(r=0,o=Math.round(t/Math.pow(2,1-i-n))));const l=[];for(c=n;c;c-=1)l.push(o%2?1:0),o=Math.floor(o/2);for(c=e;c;c-=1)l.push(r%2?1:0),r=Math.floor(r/2);l.push(s?1:0),l.reverse();const u=l.join("");let d="";for(c=0;c<64;c+=8){let h=parseInt(u.substr(c,8),2).toString(16);h.length===1&&(h="0"+h),d=d+h}return d.toLowerCase()},JS=function(){return!!(typeof window=="object"&&window.chrome&&window.chrome.extension&&!/^chrome/.test(window.location.href))},XS=function(){return typeof Windows=="object"&&typeof Windows.UI=="object"};function QS(t,e){let n="Unknown Error";t==="too_big"?n="The data requested exceeds the maximum size that can be accessed with a single request.":t==="permission_denied"?n="Client doesn't have permission to access the desired data.":t==="unavailable"&&(n="The service is unavailable");const i=new Error(t+" at "+e._path.toString()+": "+n);return i.code=t.toUpperCase(),i}const ZS=new RegExp("^-?(0*)\\d{1,10}$"),eI=-2147483648,tI=2147483647,Rh=function(t){if(ZS.test(t)){const e=Number(t);if(e>=eI&&e<=tI)return e}return null},Yi=function(t){try{t()}catch(e){setTimeout(()=>{const n=e.stack||"";throw Ne("Exception was thrown by user callback.",n),e},Math.floor(0))}},nI=function(){return(typeof window=="object"&&window.navigator&&window.navigator.userAgent||"").search(/googlebot|google webmaster tools|bingbot|yahoo! slurp|baiduspider|yandexbot|duckduckbot/i)>=0},ws=function(t,e){const n=setTimeout(t,e);return typeof n=="number"&&typeof Deno<"u"&&Deno.unrefTimer?Deno.unrefTimer(n):typeof n=="object"&&n.unref&&n.unref(),n};/**
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
 */class iI{constructor(e,n){this.appCheckProvider=n,this.appName=e.name,st(e)&&e.settings.appCheckToken&&(this.serverAppAppCheckToken=e.settings.appCheckToken),this.appCheck=n?.getImmediate({optional:!0}),this.appCheck||n?.get().then(i=>this.appCheck=i)}getToken(e){if(this.serverAppAppCheckToken){if(e)throw new Error("Attempted reuse of `FirebaseServerApp.appCheckToken` after previous usage failed.");return Promise.resolve({token:this.serverAppAppCheckToken})}return this.appCheck?this.appCheck.getToken(e):new Promise((n,i)=>{setTimeout(()=>{this.appCheck?this.getToken(e).then(n,i):n(null)},0)})}addTokenChangeListener(e){this.appCheckProvider?.get().then(n=>n.addTokenListener(e))}notifyForInvalidToken(){Ne(`Provided AppCheck credentials for the app named "${this.appName}" are invalid. This usually indicates your app was not initialized correctly.`)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class sI{constructor(e,n,i){this.appName_=e,this.firebaseOptions_=n,this.authProvider_=i,this.auth_=null,this.auth_=i.getImmediate({optional:!0}),this.auth_||i.onInit(s=>this.auth_=s)}getToken(e){return this.auth_?this.auth_.getToken(e).catch(n=>n&&n.code==="auth/token-not-initialized"?(pe("Got auth/token-not-initialized error.  Treating as null token."),null):Promise.reject(n)):new Promise((n,i)=>{setTimeout(()=>{this.auth_?this.getToken(e).then(n,i):n(null)},0)})}addTokenChangeListener(e){this.auth_?this.auth_.addAuthTokenListener(e):this.authProvider_.get().then(n=>n.addAuthTokenListener(e))}removeTokenChangeListener(e){this.authProvider_.get().then(n=>n.removeAuthTokenListener(e))}notifyForInvalidToken(){let e='Provided authentication credentials for the app named "'+this.appName_+'" are invalid. This usually indicates your app was not initialized correctly. ';"credential"in this.firebaseOptions_?e+='Make sure the "credential" property provided to initializeApp() is authorized to access the specified "databaseURL" and is from the correct project.':"serviceAccount"in this.firebaseOptions_?e+='Make sure the "serviceAccount" property provided to initializeApp() is authorized to access the specified "databaseURL" and is from the correct project.':e+='Make sure the "apiKey" and "databaseURL" properties provided to initializeApp() match the values provided for your app at https://console.firebase.google.com/.',Ne(e)}}class Dr{constructor(e){this.accessToken=e}getToken(e){return Promise.resolve({accessToken:this.accessToken})}addTokenChangeListener(e){e(this.accessToken)}removeTokenChangeListener(e){}notifyForInvalidToken(){}}Dr.OWNER="owner";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Fl="5",Cg="v",Tg="s",Sg="r",Ig="f",kg=/(console\.firebase|firebase-console-\w+\.corp|firebase\.corp)\.google\.com/,Rg="ls",Ag="p",Mc="ac",Ng="websocket",Pg="long_polling";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Lg{constructor(e,n,i,s,r=!1,o="",a=!1,c=!1,l=null){this.secure=n,this.namespace=i,this.webSocketOnly=s,this.nodeAdmin=r,this.persistenceKey=o,this.includeNamespaceInQueryParams=a,this.isUsingEmulator=c,this.emulatorOptions=l,this._host=e.toLowerCase(),this._domain=this._host.substr(this._host.indexOf(".")+1),this.internalHost=On.get("host:"+e)||this._host}isCacheableHost(){return this.internalHost.substr(0,2)==="s-"}isCustomHost(){return this._domain!=="firebaseio.com"&&this._domain!=="firebaseio-demo.com"}get host(){return this._host}set host(e){e!==this.internalHost&&(this.internalHost=e,this.isCacheableHost()&&On.set("host:"+this._host,this.internalHost))}toString(){let e=this.toURLString();return this.persistenceKey&&(e+="<"+this.persistenceKey+">"),e}toURLString(){const e=this.secure?"https://":"http://",n=this.includeNamespaceInQueryParams?`?ns=${this.namespace}`:"";return`${e}${this.host}/${n}`}}function rI(t){return t.host!==t.internalHost||t.isCustomHost()||t.includeNamespaceInQueryParams}function Og(t,e,n){g(typeof e=="string","typeof type must == string"),g(typeof n=="object","typeof params must == object");let i;if(e===Ng)i=(t.secure?"wss://":"ws://")+t.internalHost+"/.ws?";else if(e===Pg)i=(t.secure?"https://":"http://")+t.internalHost+"/.lp?";else throw new Error("Unknown connection type: "+e);rI(t)&&(n.ns=t.namespace);const s=[];return ye(n,(r,o)=>{s.push(r+"="+o)}),i+s.join("&")}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class oI{constructor(){this.counters_={}}incrementCounter(e,n=1){Et(this.counters_,e)||(this.counters_[e]=0),this.counters_[e]+=n}get(){return rT(this.counters_)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ba={},Ha={};function Ul(t){const e=t.toString();return Ba[e]||(Ba[e]=new oI),Ba[e]}function aI(t,e){const n=t.toString();return Ha[n]||(Ha[n]=e()),Ha[n]}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class cI{constructor(e){this.onMessage_=e,this.pendingResponses=[],this.currentResponseNum=0,this.closeAfterResponse=-1,this.onClose=null}closeAfter(e,n){this.closeAfterResponse=e,this.onClose=n,this.closeAfterResponse<this.currentResponseNum&&(this.onClose(),this.onClose=null)}handleResponse(e,n){for(this.pendingResponses[e]=n;this.pendingResponses[this.currentResponseNum];){const i=this.pendingResponses[this.currentResponseNum];delete this.pendingResponses[this.currentResponseNum];for(let s=0;s<i.length;++s)i[s]&&Yi(()=>{this.onMessage_(i[s])});if(this.currentResponseNum===this.closeAfterResponse){this.onClose&&(this.onClose(),this.onClose=null);break}this.currentResponseNum++}}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ah="start",lI="close",uI="pLPCommand",dI="pRTLPCB",Dg="id",Mg="pw",xg="ser",hI="cb",fI="seg",pI="ts",gI="d",mI="dframe",Fg=1870,Ug=30,_I=Fg-Ug,yI=25e3,wI=3e4;class ai{constructor(e,n,i,s,r,o,a){this.connId=e,this.repoInfo=n,this.applicationId=i,this.appCheckToken=s,this.authToken=r,this.transportSessionId=o,this.lastSessionId=a,this.bytesSent=0,this.bytesReceived=0,this.everConnected_=!1,this.log_=sr(e),this.stats_=Ul(n),this.urlFn=c=>(this.appCheckToken&&(c[Mc]=this.appCheckToken),Og(n,Pg,c))}open(e,n){this.curSegmentNum=0,this.onDisconnect_=n,this.myPacketOrderer=new cI(e),this.isClosed_=!1,this.connectTimeoutTimer_=setTimeout(()=>{this.log_("Timed out trying to connect."),this.onClosed_(),this.connectTimeoutTimer_=null},Math.floor(wI)),KS(()=>{if(this.isClosed_)return;this.scriptTagHolder=new $l((...r)=>{const[o,a,c,l,u]=r;if(this.incrementIncomingBytes_(r),!!this.scriptTagHolder)if(this.connectTimeoutTimer_&&(clearTimeout(this.connectTimeoutTimer_),this.connectTimeoutTimer_=null),this.everConnected_=!0,o===Ah)this.id=a,this.password=c;else if(o===lI)a?(this.scriptTagHolder.sendNewPolls=!1,this.myPacketOrderer.closeAfter(a,()=>{this.onClosed_()})):this.onClosed_();else throw new Error("Unrecognized command received: "+o)},(...r)=>{const[o,a]=r;this.incrementIncomingBytes_(r),this.myPacketOrderer.handleResponse(o,a)},()=>{this.onClosed_()},this.urlFn);const i={};i[Ah]="t",i[xg]=Math.floor(Math.random()*1e8),this.scriptTagHolder.uniqueCallbackIdentifier&&(i[hI]=this.scriptTagHolder.uniqueCallbackIdentifier),i[Cg]=Fl,this.transportSessionId&&(i[Tg]=this.transportSessionId),this.lastSessionId&&(i[Rg]=this.lastSessionId),this.applicationId&&(i[Ag]=this.applicationId),this.appCheckToken&&(i[Mc]=this.appCheckToken),typeof location<"u"&&location.hostname&&kg.test(location.hostname)&&(i[Sg]=Ig);const s=this.urlFn(i);this.log_("Connecting via long-poll to "+s),this.scriptTagHolder.addTag(s,()=>{})})}start(){this.scriptTagHolder.startLongPoll(this.id,this.password),this.addDisconnectPingFrame(this.id,this.password)}static forceAllow(){ai.forceAllow_=!0}static forceDisallow(){ai.forceDisallow_=!0}static isAvailable(){return ai.forceAllow_?!0:!ai.forceDisallow_&&typeof document<"u"&&document.createElement!=null&&!JS()&&!XS()}markConnectionHealthy(){}shutdown_(){this.isClosed_=!0,this.scriptTagHolder&&(this.scriptTagHolder.close(),this.scriptTagHolder=null),this.myDisconnFrame&&(document.body.removeChild(this.myDisconnFrame),this.myDisconnFrame=null),this.connectTimeoutTimer_&&(clearTimeout(this.connectTimeoutTimer_),this.connectTimeoutTimer_=null)}onClosed_(){this.isClosed_||(this.log_("Longpoll is closing itself"),this.shutdown_(),this.onDisconnect_&&(this.onDisconnect_(this.everConnected_),this.onDisconnect_=null))}close(){this.isClosed_||(this.log_("Longpoll is being closed."),this.shutdown_())}send(e){const n=le(e);this.bytesSent+=n.length,this.stats_.incrementCounter("bytes_sent",n.length);const i=ng(n),s=bg(i,_I);for(let r=0;r<s.length;r++)this.scriptTagHolder.enqueueSegment(this.curSegmentNum,s.length,s[r]),this.curSegmentNum++}addDisconnectPingFrame(e,n){this.myDisconnFrame=document.createElement("iframe");const i={};i[mI]="t",i[Dg]=e,i[Mg]=n,this.myDisconnFrame.src=this.urlFn(i),this.myDisconnFrame.style.display="none",document.body.appendChild(this.myDisconnFrame)}incrementIncomingBytes_(e){const n=le(e).length;this.bytesReceived+=n,this.stats_.incrementCounter("bytes_received",n)}}class $l{constructor(e,n,i,s){this.onDisconnect=i,this.urlFn=s,this.outstandingRequests=new Set,this.pendingSegs=[],this.currentSerial=Math.floor(Math.random()*1e8),this.sendNewPolls=!0;{this.uniqueCallbackIdentifier=qS(),window[uI+this.uniqueCallbackIdentifier]=e,window[dI+this.uniqueCallbackIdentifier]=n,this.myIFrame=$l.createIFrame_();let r="";this.myIFrame.src&&this.myIFrame.src.substr(0,11)==="javascript:"&&(r='<script>document.domain="'+document.domain+'";<\/script>');const o="<html><body>"+r+"</body></html>";try{this.myIFrame.doc.open(),this.myIFrame.doc.write(o),this.myIFrame.doc.close()}catch(a){pe("frame writing exception"),a.stack&&pe(a.stack),pe(a)}}}static createIFrame_(){const e=document.createElement("iframe");if(e.style.display="none",document.body){document.body.appendChild(e);try{e.contentWindow.document||pe("No IE domain setting required")}catch{const i=document.domain;e.src="javascript:void((function(){document.open();document.domain='"+i+"';document.close();})())"}}else throw"Document body has not initialized. Wait to initialize Firebase until after the document is ready.";return e.contentDocument?e.doc=e.contentDocument:e.contentWindow?e.doc=e.contentWindow.document:e.document&&(e.doc=e.document),e}close(){this.alive=!1,this.myIFrame&&(this.myIFrame.doc.body.textContent="",setTimeout(()=>{this.myIFrame!==null&&(document.body.removeChild(this.myIFrame),this.myIFrame=null)},Math.floor(0)));const e=this.onDisconnect;e&&(this.onDisconnect=null,e())}startLongPoll(e,n){for(this.myID=e,this.myPW=n,this.alive=!0;this.newRequest_(););}newRequest_(){if(this.alive&&this.sendNewPolls&&this.outstandingRequests.size<(this.pendingSegs.length>0?2:1)){this.currentSerial++;const e={};e[Dg]=this.myID,e[Mg]=this.myPW,e[xg]=this.currentSerial;let n=this.urlFn(e),i="",s=0;for(;this.pendingSegs.length>0&&this.pendingSegs[0].d.length+Ug+i.length<=Fg;){const o=this.pendingSegs.shift();i=i+"&"+fI+s+"="+o.seg+"&"+pI+s+"="+o.ts+"&"+gI+s+"="+o.d,s++}return n=n+i,this.addLongPollTag_(n,this.currentSerial),!0}else return!1}enqueueSegment(e,n,i){this.pendingSegs.push({seg:e,ts:n,d:i}),this.alive&&this.newRequest_()}addLongPollTag_(e,n){this.outstandingRequests.add(n);const i=()=>{this.outstandingRequests.delete(n),this.newRequest_()},s=setTimeout(i,Math.floor(yI)),r=()=>{clearTimeout(s),i()};this.addTag(e,r)}addTag(e,n){setTimeout(()=>{try{if(!this.sendNewPolls)return;const i=this.myIFrame.doc.createElement("script");i.type="text/javascript",i.async=!0,i.src=e,i.onload=i.onreadystatechange=function(){const s=i.readyState;(!s||s==="loaded"||s==="complete")&&(i.onload=i.onreadystatechange=null,i.parentNode&&i.parentNode.removeChild(i),n())},i.onerror=()=>{pe("Long-poll script failed to load: "+e),this.sendNewPolls=!1,this.close()},this.myIFrame.doc.body.appendChild(i)}catch{}},Math.floor(1))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const vI=16384,bI=45e3;let Xr=null;typeof MozWebSocket<"u"?Xr=MozWebSocket:typeof WebSocket<"u"&&(Xr=WebSocket);class rt{constructor(e,n,i,s,r,o,a){this.connId=e,this.applicationId=i,this.appCheckToken=s,this.authToken=r,this.keepaliveTimer=null,this.frames=null,this.totalFrames=0,this.bytesSent=0,this.bytesReceived=0,this.log_=sr(this.connId),this.stats_=Ul(n),this.connURL=rt.connectionURL_(n,o,a,s,i),this.nodeAdmin=n.nodeAdmin}static connectionURL_(e,n,i,s,r){const o={};return o[Cg]=Fl,typeof location<"u"&&location.hostname&&kg.test(location.hostname)&&(o[Sg]=Ig),n&&(o[Tg]=n),i&&(o[Rg]=i),s&&(o[Mc]=s),r&&(o[Ag]=r),Og(e,Ng,o)}open(e,n){this.onDisconnect=n,this.onMessage=e,this.log_("Websocket connecting to "+this.connURL),this.everConnected_=!1,On.set("previous_websocket_failure",!0);try{let i;_T(),this.mySock=new Xr(this.connURL,[],i)}catch(i){this.log_("Error instantiating WebSocket.");const s=i.message||i.data;s&&this.log_(s),this.onClosed_();return}this.mySock.onopen=()=>{this.log_("Websocket connected."),this.everConnected_=!0},this.mySock.onclose=()=>{this.log_("Websocket connection was disconnected."),this.mySock=null,this.onClosed_()},this.mySock.onmessage=i=>{this.handleIncomingFrame(i)},this.mySock.onerror=i=>{this.log_("WebSocket error.  Closing connection.");const s=i.message||i.data;s&&this.log_(s),this.onClosed_()}}start(){}static forceDisallow(){rt.forceDisallow_=!0}static isAvailable(){let e=!1;if(typeof navigator<"u"&&navigator.userAgent){const n=/Android ([0-9]{0,}\.[0-9]{0,})/,i=navigator.userAgent.match(n);i&&i.length>1&&parseFloat(i[1])<4.4&&(e=!0)}return!e&&Xr!==null&&!rt.forceDisallow_}static previouslyFailed(){return On.isInMemoryStorage||On.get("previous_websocket_failure")===!0}markConnectionHealthy(){On.remove("previous_websocket_failure")}appendFrame_(e){if(this.frames.push(e),this.frames.length===this.totalFrames){const n=this.frames.join("");this.frames=null;const i=Ds(n);this.onMessage(i)}}handleNewFrameCount_(e){this.totalFrames=e,this.frames=[]}extractFrameCount_(e){if(g(this.frames===null,"We already have a frame buffer"),e.length<=6){const n=Number(e);if(!isNaN(n))return this.handleNewFrameCount_(n),null}return this.handleNewFrameCount_(1),e}handleIncomingFrame(e){if(this.mySock===null)return;const n=e.data;if(this.bytesReceived+=n.length,this.stats_.incrementCounter("bytes_received",n.length),this.resetKeepAlive(),this.frames!==null)this.appendFrame_(n);else{const i=this.extractFrameCount_(n);i!==null&&this.appendFrame_(i)}}send(e){this.resetKeepAlive();const n=le(e);this.bytesSent+=n.length,this.stats_.incrementCounter("bytes_sent",n.length);const i=bg(n,vI);i.length>1&&this.sendString_(String(i.length));for(let s=0;s<i.length;s++)this.sendString_(i[s])}shutdown_(){this.isClosed_=!0,this.keepaliveTimer&&(clearInterval(this.keepaliveTimer),this.keepaliveTimer=null),this.mySock&&(this.mySock.close(),this.mySock=null)}onClosed_(){this.isClosed_||(this.log_("WebSocket is closing itself"),this.shutdown_(),this.onDisconnect&&(this.onDisconnect(this.everConnected_),this.onDisconnect=null))}close(){this.isClosed_||(this.log_("WebSocket is being closed"),this.shutdown_())}resetKeepAlive(){clearInterval(this.keepaliveTimer),this.keepaliveTimer=setInterval(()=>{this.mySock&&this.sendString_("0"),this.resetKeepAlive()},Math.floor(bI))}sendString_(e){try{this.mySock.send(e)}catch(n){this.log_("Exception thrown from WebSocket.send():",n.message||n.data,"Closing connection."),setTimeout(this.onClosed_.bind(this),0)}}}rt.responsesRequiredToBeHealthy=2;rt.healthyTimeout=3e4;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class xs{static get ALL_TRANSPORTS(){return[ai,rt]}static get IS_TRANSPORT_INITIALIZED(){return this.globalTransportInitialized_}constructor(e){this.initTransports_(e)}initTransports_(e){const n=rt&&rt.isAvailable();let i=n&&!rt.previouslyFailed();if(e.webSocketOnly&&(n||Ne("wss:// URL used, but browser isn't known to support websockets.  Trying anyway."),i=!0),i)this.transports_=[rt];else{const s=this.transports_=[];for(const r of xs.ALL_TRANSPORTS)r&&r.isAvailable()&&s.push(r);xs.globalTransportInitialized_=!0}}initialTransport(){if(this.transports_.length>0)return this.transports_[0];throw new Error("No transports available")}upgradeTransport(){return this.transports_.length>1?this.transports_[1]:null}}xs.globalTransportInitialized_=!1;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const EI=6e4,CI=5e3,TI=10*1024,SI=100*1024,Va="t",Nh="d",II="s",Ph="r",kI="e",Lh="o",Oh="a",Dh="n",Mh="p",RI="h";class AI{constructor(e,n,i,s,r,o,a,c,l,u){this.id=e,this.repoInfo_=n,this.applicationId_=i,this.appCheckToken_=s,this.authToken_=r,this.onMessage_=o,this.onReady_=a,this.onDisconnect_=c,this.onKill_=l,this.lastSessionId=u,this.connectionCount=0,this.pendingDataMessages=[],this.state_=0,this.log_=sr("c:"+this.id+":"),this.transportManager_=new xs(n),this.log_("Connection created"),this.start_()}start_(){const e=this.transportManager_.initialTransport();this.conn_=new e(this.nextTransportId_(),this.repoInfo_,this.applicationId_,this.appCheckToken_,this.authToken_,null,this.lastSessionId),this.primaryResponsesRequired_=e.responsesRequiredToBeHealthy||0;const n=this.connReceiver_(this.conn_),i=this.disconnReceiver_(this.conn_);this.tx_=this.conn_,this.rx_=this.conn_,this.secondaryConn_=null,this.isHealthy_=!1,setTimeout(()=>{this.conn_&&this.conn_.open(n,i)},Math.floor(0));const s=e.healthyTimeout||0;s>0&&(this.healthyTimeout_=ws(()=>{this.healthyTimeout_=null,this.isHealthy_||(this.conn_&&this.conn_.bytesReceived>SI?(this.log_("Connection exceeded healthy timeout but has received "+this.conn_.bytesReceived+" bytes.  Marking connection healthy."),this.isHealthy_=!0,this.conn_.markConnectionHealthy()):this.conn_&&this.conn_.bytesSent>TI?this.log_("Connection exceeded healthy timeout but has sent "+this.conn_.bytesSent+" bytes.  Leaving connection alive."):(this.log_("Closing unhealthy connection after timeout."),this.close()))},Math.floor(s)))}nextTransportId_(){return"c:"+this.id+":"+this.connectionCount++}disconnReceiver_(e){return n=>{e===this.conn_?this.onConnectionLost_(n):e===this.secondaryConn_?(this.log_("Secondary connection lost."),this.onSecondaryConnectionLost_()):this.log_("closing an old connection")}}connReceiver_(e){return n=>{this.state_!==2&&(e===this.rx_?this.onPrimaryMessageReceived_(n):e===this.secondaryConn_?this.onSecondaryMessageReceived_(n):this.log_("message on old connection"))}}sendRequest(e){const n={t:"d",d:e};this.sendData_(n)}tryCleanupConnection(){this.tx_===this.secondaryConn_&&this.rx_===this.secondaryConn_&&(this.log_("cleaning up and promoting a connection: "+this.secondaryConn_.connId),this.conn_=this.secondaryConn_,this.secondaryConn_=null)}onSecondaryControl_(e){if(Va in e){const n=e[Va];n===Oh?this.upgradeIfSecondaryHealthy_():n===Ph?(this.log_("Got a reset on secondary, closing it"),this.secondaryConn_.close(),(this.tx_===this.secondaryConn_||this.rx_===this.secondaryConn_)&&this.close()):n===Lh&&(this.log_("got pong on secondary."),this.secondaryResponsesRequired_--,this.upgradeIfSecondaryHealthy_())}}onSecondaryMessageReceived_(e){const n=cs("t",e),i=cs("d",e);if(n==="c")this.onSecondaryControl_(i);else if(n==="d")this.pendingDataMessages.push(i);else throw new Error("Unknown protocol layer: "+n)}upgradeIfSecondaryHealthy_(){this.secondaryResponsesRequired_<=0?(this.log_("Secondary connection is healthy."),this.isHealthy_=!0,this.secondaryConn_.markConnectionHealthy(),this.proceedWithUpgrade_()):(this.log_("sending ping on secondary."),this.secondaryConn_.send({t:"c",d:{t:Mh,d:{}}}))}proceedWithUpgrade_(){this.secondaryConn_.start(),this.log_("sending client ack on secondary"),this.secondaryConn_.send({t:"c",d:{t:Oh,d:{}}}),this.log_("Ending transmission on primary"),this.conn_.send({t:"c",d:{t:Dh,d:{}}}),this.tx_=this.secondaryConn_,this.tryCleanupConnection()}onPrimaryMessageReceived_(e){const n=cs("t",e),i=cs("d",e);n==="c"?this.onControl_(i):n==="d"&&this.onDataMessage_(i)}onDataMessage_(e){this.onPrimaryResponse_(),this.onMessage_(e)}onPrimaryResponse_(){this.isHealthy_||(this.primaryResponsesRequired_--,this.primaryResponsesRequired_<=0&&(this.log_("Primary connection is healthy."),this.isHealthy_=!0,this.conn_.markConnectionHealthy()))}onControl_(e){const n=cs(Va,e);if(Nh in e){const i=e[Nh];if(n===RI){const s={...i};this.repoInfo_.isUsingEmulator&&(s.h=this.repoInfo_.host),this.onHandshake_(s)}else if(n===Dh){this.log_("recvd end transmission on primary"),this.rx_=this.secondaryConn_;for(let s=0;s<this.pendingDataMessages.length;++s)this.onDataMessage_(this.pendingDataMessages[s]);this.pendingDataMessages=[],this.tryCleanupConnection()}else n===II?this.onConnectionShutdown_(i):n===Ph?this.onReset_(i):n===kI?Dc("Server Error: "+i):n===Lh?(this.log_("got pong on primary."),this.onPrimaryResponse_(),this.sendPingOnPrimaryIfNecessary_()):Dc("Unknown control packet command: "+n)}}onHandshake_(e){const n=e.ts,i=e.v,s=e.h;this.sessionId=e.s,this.repoInfo_.host=s,this.state_===0&&(this.conn_.start(),this.onConnectionEstablished_(this.conn_,n),Fl!==i&&Ne("Protocol version mismatch detected"),this.tryStartUpgrade_())}tryStartUpgrade_(){const e=this.transportManager_.upgradeTransport();e&&this.startUpgrade_(e)}startUpgrade_(e){this.secondaryConn_=new e(this.nextTransportId_(),this.repoInfo_,this.applicationId_,this.appCheckToken_,this.authToken_,this.sessionId),this.secondaryResponsesRequired_=e.responsesRequiredToBeHealthy||0;const n=this.connReceiver_(this.secondaryConn_),i=this.disconnReceiver_(this.secondaryConn_);this.secondaryConn_.open(n,i),ws(()=>{this.secondaryConn_&&(this.log_("Timed out trying to upgrade."),this.secondaryConn_.close())},Math.floor(EI))}onReset_(e){this.log_("Reset packet received.  New host: "+e),this.repoInfo_.host=e,this.state_===1?this.close():(this.closeConnections_(),this.start_())}onConnectionEstablished_(e,n){this.log_("Realtime connection established."),this.conn_=e,this.state_=1,this.onReady_&&(this.onReady_(n,this.sessionId),this.onReady_=null),this.primaryResponsesRequired_===0?(this.log_("Primary connection is healthy."),this.isHealthy_=!0):ws(()=>{this.sendPingOnPrimaryIfNecessary_()},Math.floor(CI))}sendPingOnPrimaryIfNecessary_(){!this.isHealthy_&&this.state_===1&&(this.log_("sending ping on primary."),this.sendData_({t:"c",d:{t:Mh,d:{}}}))}onSecondaryConnectionLost_(){const e=this.secondaryConn_;this.secondaryConn_=null,(this.tx_===e||this.rx_===e)&&this.close()}onConnectionLost_(e){this.conn_=null,!e&&this.state_===0?(this.log_("Realtime connection failed."),this.repoInfo_.isCacheableHost()&&(On.remove("host:"+this.repoInfo_.host),this.repoInfo_.internalHost=this.repoInfo_.host)):this.state_===1&&this.log_("Realtime connection lost."),this.close()}onConnectionShutdown_(e){this.log_("Connection shutdown command received. Shutting down..."),this.onKill_&&(this.onKill_(e),this.onKill_=null),this.onDisconnect_=null,this.close()}sendData_(e){if(this.state_!==1)throw"Connection is not connected";this.tx_.send(e)}close(){this.state_!==2&&(this.log_("Closing realtime connection."),this.state_=2,this.closeConnections_(),this.onDisconnect_&&(this.onDisconnect_(),this.onDisconnect_=null))}closeConnections_(){this.log_("Shutting down all connections"),this.conn_&&(this.conn_.close(),this.conn_=null),this.secondaryConn_&&(this.secondaryConn_.close(),this.secondaryConn_=null),this.healthyTimeout_&&(clearTimeout(this.healthyTimeout_),this.healthyTimeout_=null)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class $g{put(e,n,i,s){}merge(e,n,i,s){}refreshAuthToken(e){}refreshAppCheckToken(e){}onDisconnectPut(e,n,i){}onDisconnectMerge(e,n,i){}onDisconnectCancel(e,n){}reportStats(e){}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Bg{constructor(e){this.allowedEvents_=e,this.listeners_={},g(Array.isArray(e)&&e.length>0,"Requires a non-empty array")}trigger(e,...n){if(Array.isArray(this.listeners_[e])){const i=[...this.listeners_[e]];for(let s=0;s<i.length;s++)i[s].callback.apply(i[s].context,n)}}on(e,n,i){this.validateEventType_(e),this.listeners_[e]=this.listeners_[e]||[],this.listeners_[e].push({callback:n,context:i});const s=this.getInitialEvent(e);s&&n.apply(i,s)}off(e,n,i){this.validateEventType_(e);const s=this.listeners_[e]||[];for(let r=0;r<s.length;r++)if(s[r].callback===n&&(!i||i===s[r].context)){s.splice(r,1);return}}validateEventType_(e){g(this.allowedEvents_.find(n=>n===e),"Unknown event: "+e)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Qr extends Bg{static getInstance(){return new Qr}constructor(){super(["online"]),this.online_=!0,typeof window<"u"&&typeof window.addEventListener<"u"&&!Dl()&&(window.addEventListener("online",()=>{this.online_||(this.online_=!0,this.trigger("online",!0))},!1),window.addEventListener("offline",()=>{this.online_&&(this.online_=!1,this.trigger("online",!1))},!1))}getInitialEvent(e){return g(e==="online","Unknown event type: "+e),[this.online_]}currentlyOnline(){return this.online_}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const xh=32,Fh=768;class V{constructor(e,n){if(n===void 0){this.pieces_=e.split("/");let i=0;for(let s=0;s<this.pieces_.length;s++)this.pieces_[s].length>0&&(this.pieces_[i]=this.pieces_[s],i++);this.pieces_.length=i,this.pieceNum_=0}else this.pieces_=e,this.pieceNum_=n}toString(){let e="";for(let n=this.pieceNum_;n<this.pieces_.length;n++)this.pieces_[n]!==""&&(e+="/"+this.pieces_[n]);return e||"/"}}function $(){return new V("")}function P(t){return t.pieceNum_>=t.pieces_.length?null:t.pieces_[t.pieceNum_]}function dn(t){return t.pieces_.length-t.pieceNum_}function G(t){let e=t.pieceNum_;return e<t.pieces_.length&&e++,new V(t.pieces_,e)}function Bl(t){return t.pieceNum_<t.pieces_.length?t.pieces_[t.pieces_.length-1]:null}function NI(t){let e="";for(let n=t.pieceNum_;n<t.pieces_.length;n++)t.pieces_[n]!==""&&(e+="/"+encodeURIComponent(String(t.pieces_[n])));return e||"/"}function Fs(t,e=0){return t.pieces_.slice(t.pieceNum_+e)}function Hg(t){if(t.pieceNum_>=t.pieces_.length)return null;const e=[];for(let n=t.pieceNum_;n<t.pieces_.length-1;n++)e.push(t.pieces_[n]);return new V(e,0)}function ee(t,e){const n=[];for(let i=t.pieceNum_;i<t.pieces_.length;i++)n.push(t.pieces_[i]);if(e instanceof V)for(let i=e.pieceNum_;i<e.pieces_.length;i++)n.push(e.pieces_[i]);else{const i=e.split("/");for(let s=0;s<i.length;s++)i[s].length>0&&n.push(i[s])}return new V(n,0)}function L(t){return t.pieceNum_>=t.pieces_.length}function Re(t,e){const n=P(t),i=P(e);if(n===null)return e;if(n===i)return Re(G(t),G(e));throw new Error("INTERNAL ERROR: innerPath ("+e+") is not within outerPath ("+t+")")}function PI(t,e){const n=Fs(t,0),i=Fs(e,0);for(let s=0;s<n.length&&s<i.length;s++){const r=ei(n[s],i[s]);if(r!==0)return r}return n.length===i.length?0:n.length<i.length?-1:1}function Hl(t,e){if(dn(t)!==dn(e))return!1;for(let n=t.pieceNum_,i=e.pieceNum_;n<=t.pieces_.length;n++,i++)if(t.pieces_[n]!==e.pieces_[i])return!1;return!0}function Ge(t,e){let n=t.pieceNum_,i=e.pieceNum_;if(dn(t)>dn(e))return!1;for(;n<t.pieces_.length;){if(t.pieces_[n]!==e.pieces_[i])return!1;++n,++i}return!0}class LI{constructor(e,n){this.errorPrefix_=n,this.parts_=Fs(e,0),this.byteLength_=Math.max(1,this.parts_.length);for(let i=0;i<this.parts_.length;i++)this.byteLength_+=Vo(this.parts_[i]);Vg(this)}}function OI(t,e){t.parts_.length>0&&(t.byteLength_+=1),t.parts_.push(e),t.byteLength_+=Vo(e),Vg(t)}function DI(t){const e=t.parts_.pop();t.byteLength_-=Vo(e),t.parts_.length>0&&(t.byteLength_-=1)}function Vg(t){if(t.byteLength_>Fh)throw new Error(t.errorPrefix_+"has a key path longer than "+Fh+" bytes ("+t.byteLength_+").");if(t.parts_.length>xh)throw new Error(t.errorPrefix_+"path specified exceeds the maximum depth that can be written ("+xh+") or object contains a cycle "+Nn(t))}function Nn(t){return t.parts_.length===0?"":"in property '"+t.parts_.join(".")+"'"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Vl extends Bg{static getInstance(){return new Vl}constructor(){super(["visible"]);let e,n;typeof document<"u"&&typeof document.addEventListener<"u"&&(typeof document.hidden<"u"?(n="visibilitychange",e="hidden"):typeof document.mozHidden<"u"?(n="mozvisibilitychange",e="mozHidden"):typeof document.msHidden<"u"?(n="msvisibilitychange",e="msHidden"):typeof document.webkitHidden<"u"&&(n="webkitvisibilitychange",e="webkitHidden")),this.visible_=!0,n&&document.addEventListener(n,()=>{const i=!document[e];i!==this.visible_&&(this.visible_=i,this.trigger("visible",i))},!1)}getInitialEvent(e){return g(e==="visible","Unknown event type: "+e),[this.visible_]}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ls=1e3,MI=300*1e3,Uh=30*1e3,xI=1.3,FI=3e4,UI="server_kill",$h=3;class xt extends $g{constructor(e,n,i,s,r,o,a,c){if(super(),this.repoInfo_=e,this.applicationId_=n,this.onDataUpdate_=i,this.onConnectStatus_=s,this.onServerInfoUpdate_=r,this.authTokenProvider_=o,this.appCheckTokenProvider_=a,this.authOverride_=c,this.id=xt.nextPersistentConnectionId_++,this.log_=sr("p:"+this.id+":"),this.interruptReasons_={},this.listens=new Map,this.outstandingPuts_=[],this.outstandingGets_=[],this.outstandingPutCount_=0,this.outstandingGetCount_=0,this.onDisconnectRequestQueue_=[],this.connected_=!1,this.reconnectDelay_=ls,this.maxReconnectDelay_=MI,this.securityDebugCallback_=null,this.lastSessionId=null,this.establishConnectionTimer_=null,this.visible_=!1,this.requestCBHash_={},this.requestNumber_=0,this.realtime_=null,this.authToken_=null,this.appCheckToken_=null,this.forceTokenRefresh_=!1,this.invalidAuthTokenCount_=0,this.invalidAppCheckTokenCount_=0,this.firstConnection_=!0,this.lastConnectionAttemptTime_=null,this.lastConnectionEstablishedTime_=null,c)throw new Error("Auth override specified in options, but not supported on non Node.js platforms");Vl.getInstance().on("visible",this.onVisible_,this),e.host.indexOf("fblocal")===-1&&Qr.getInstance().on("online",this.onOnline_,this)}sendRequest(e,n,i){const s=++this.requestNumber_,r={r:s,a:e,b:n};this.log_(le(r)),g(this.connected_,"sendRequest call when we're not connected not allowed."),this.realtime_.sendRequest(r),i&&(this.requestCBHash_[s]=i)}get(e){this.initConnection_();const n=new Oe,s={action:"g",request:{p:e._path.toString(),q:e._queryObject},onComplete:o=>{const a=o.d;o.s==="ok"?n.resolve(a):n.reject(a)}};this.outstandingGets_.push(s),this.outstandingGetCount_++;const r=this.outstandingGets_.length-1;return this.connected_&&this.sendGet_(r),n.promise}listen(e,n,i,s){this.initConnection_();const r=e._queryIdentifier,o=e._path.toString();this.log_("Listen called for "+o+" "+r),this.listens.has(o)||this.listens.set(o,new Map),g(e._queryParams.isDefault()||!e._queryParams.loadsAllData(),"listen() called for non-default but complete query"),g(!this.listens.get(o).has(r),"listen() called twice for same path/queryId.");const a={onComplete:s,hashFn:n,query:e,tag:i};this.listens.get(o).set(r,a),this.connected_&&this.sendListen_(a)}sendGet_(e){const n=this.outstandingGets_[e];this.sendRequest("g",n.request,i=>{delete this.outstandingGets_[e],this.outstandingGetCount_--,this.outstandingGetCount_===0&&(this.outstandingGets_=[]),n.onComplete&&n.onComplete(i)})}sendListen_(e){const n=e.query,i=n._path.toString(),s=n._queryIdentifier;this.log_("Listen on "+i+" for "+s);const r={p:i},o="q";e.tag&&(r.q=n._queryObject,r.t=e.tag),r.h=e.hashFn(),this.sendRequest(o,r,a=>{const c=a.d,l=a.s;xt.warnOnListenWarnings_(c,n),(this.listens.get(i)&&this.listens.get(i).get(s))===e&&(this.log_("listen response",a),l!=="ok"&&this.removeListen_(i,s),e.onComplete&&e.onComplete(l,c))})}static warnOnListenWarnings_(e,n){if(e&&typeof e=="object"&&Et(e,"w")){const i=Ni(e,"w");if(Array.isArray(i)&&~i.indexOf("no_index")){const s='".indexOn": "'+n._queryParams.getIndex().toString()+'"',r=n._path.toString();Ne(`Using an unspecified index. Your data will be downloaded and filtered on the client. Consider adding ${s} at ${r} to your security rules for better performance.`)}}}refreshAuthToken(e){this.authToken_=e,this.log_("Auth token refreshed"),this.authToken_?this.tryAuth():this.connected_&&this.sendRequest("unauth",{},()=>{}),this.reduceReconnectDelayIfAdminCredential_(e)}reduceReconnectDelayIfAdminCredential_(e){(e&&e.length===40||CT(e))&&(this.log_("Admin auth credential detected.  Reducing max reconnect time."),this.maxReconnectDelay_=Uh)}refreshAppCheckToken(e){this.appCheckToken_=e,this.log_("App check token refreshed"),this.appCheckToken_?this.tryAppCheck():this.connected_&&this.sendRequest("unappeck",{},()=>{})}tryAuth(){if(this.connected_&&this.authToken_){const e=this.authToken_,n=ET(e)?"auth":"gauth",i={cred:e};this.authOverride_===null?i.noauth=!0:typeof this.authOverride_=="object"&&(i.authvar=this.authOverride_),this.sendRequest(n,i,s=>{const r=s.s,o=s.d||"error";this.authToken_===e&&(r==="ok"?this.invalidAuthTokenCount_=0:this.onAuthRevoked_(r,o))})}}tryAppCheck(){this.connected_&&this.appCheckToken_&&this.sendRequest("appcheck",{token:this.appCheckToken_},e=>{const n=e.s,i=e.d||"error";n==="ok"?this.invalidAppCheckTokenCount_=0:this.onAppCheckRevoked_(n,i)})}unlisten(e,n){const i=e._path.toString(),s=e._queryIdentifier;this.log_("Unlisten called for "+i+" "+s),g(e._queryParams.isDefault()||!e._queryParams.loadsAllData(),"unlisten() called for non-default but complete query"),this.removeListen_(i,s)&&this.connected_&&this.sendUnlisten_(i,s,e._queryObject,n)}sendUnlisten_(e,n,i,s){this.log_("Unlisten on "+e+" for "+n);const r={p:e},o="n";s&&(r.q=i,r.t=s),this.sendRequest(o,r)}onDisconnectPut(e,n,i){this.initConnection_(),this.connected_?this.sendOnDisconnect_("o",e,n,i):this.onDisconnectRequestQueue_.push({pathString:e,action:"o",data:n,onComplete:i})}onDisconnectMerge(e,n,i){this.initConnection_(),this.connected_?this.sendOnDisconnect_("om",e,n,i):this.onDisconnectRequestQueue_.push({pathString:e,action:"om",data:n,onComplete:i})}onDisconnectCancel(e,n){this.initConnection_(),this.connected_?this.sendOnDisconnect_("oc",e,null,n):this.onDisconnectRequestQueue_.push({pathString:e,action:"oc",data:null,onComplete:n})}sendOnDisconnect_(e,n,i,s){const r={p:n,d:i};this.log_("onDisconnect "+e,r),this.sendRequest(e,r,o=>{s&&setTimeout(()=>{s(o.s,o.d)},Math.floor(0))})}put(e,n,i,s){this.putInternal("p",e,n,i,s)}merge(e,n,i,s){this.putInternal("m",e,n,i,s)}putInternal(e,n,i,s,r){this.initConnection_();const o={p:n,d:i};r!==void 0&&(o.h=r),this.outstandingPuts_.push({action:e,request:o,onComplete:s}),this.outstandingPutCount_++;const a=this.outstandingPuts_.length-1;this.connected_?this.sendPut_(a):this.log_("Buffering put: "+n)}sendPut_(e){const n=this.outstandingPuts_[e].action,i=this.outstandingPuts_[e].request,s=this.outstandingPuts_[e].onComplete;this.outstandingPuts_[e].queued=this.connected_,this.sendRequest(n,i,r=>{this.log_(n+" response",r),delete this.outstandingPuts_[e],this.outstandingPutCount_--,this.outstandingPutCount_===0&&(this.outstandingPuts_=[]),s&&s(r.s,r.d)})}reportStats(e){if(this.connected_){const n={c:e};this.log_("reportStats",n),this.sendRequest("s",n,i=>{if(i.s!=="ok"){const r=i.d;this.log_("reportStats","Error sending stats: "+r)}})}}onDataMessage_(e){if("r"in e){this.log_("from server: "+le(e));const n=e.r,i=this.requestCBHash_[n];i&&(delete this.requestCBHash_[n],i(e.b))}else{if("error"in e)throw"A server-side error has occurred: "+e.error;"a"in e&&this.onDataPush_(e.a,e.b)}}onDataPush_(e,n){this.log_("handleServerMessage",e,n),e==="d"?this.onDataUpdate_(n.p,n.d,!1,n.t):e==="m"?this.onDataUpdate_(n.p,n.d,!0,n.t):e==="c"?this.onListenRevoked_(n.p,n.q):e==="ac"?this.onAuthRevoked_(n.s,n.d):e==="apc"?this.onAppCheckRevoked_(n.s,n.d):e==="sd"?this.onSecurityDebugPacket_(n):Dc("Unrecognized action received from server: "+le(e)+`
Are you using the latest client?`)}onReady_(e,n){this.log_("connection ready"),this.connected_=!0,this.lastConnectionEstablishedTime_=new Date().getTime(),this.handleTimestamp_(e),this.lastSessionId=n,this.firstConnection_&&this.sendConnectStats_(),this.restoreState_(),this.firstConnection_=!1,this.onConnectStatus_(!0)}scheduleConnect_(e){g(!this.realtime_,"Scheduling a connect when we're already connected/ing?"),this.establishConnectionTimer_&&clearTimeout(this.establishConnectionTimer_),this.establishConnectionTimer_=setTimeout(()=>{this.establishConnectionTimer_=null,this.establishConnection_()},Math.floor(e))}initConnection_(){!this.realtime_&&this.firstConnection_&&this.scheduleConnect_(0)}onVisible_(e){e&&!this.visible_&&this.reconnectDelay_===this.maxReconnectDelay_&&(this.log_("Window became visible.  Reducing delay."),this.reconnectDelay_=ls,this.realtime_||this.scheduleConnect_(0)),this.visible_=e}onOnline_(e){e?(this.log_("Browser went online."),this.reconnectDelay_=ls,this.realtime_||this.scheduleConnect_(0)):(this.log_("Browser went offline.  Killing connection."),this.realtime_&&this.realtime_.close())}onRealtimeDisconnect_(){if(this.log_("data client disconnected"),this.connected_=!1,this.realtime_=null,this.cancelSentTransactions_(),this.requestCBHash_={},this.shouldReconnect_()){this.visible_?this.lastConnectionEstablishedTime_&&(new Date().getTime()-this.lastConnectionEstablishedTime_>FI&&(this.reconnectDelay_=ls),this.lastConnectionEstablishedTime_=null):(this.log_("Window isn't visible.  Delaying reconnect."),this.reconnectDelay_=this.maxReconnectDelay_,this.lastConnectionAttemptTime_=new Date().getTime());const e=Math.max(0,new Date().getTime()-this.lastConnectionAttemptTime_);let n=Math.max(0,this.reconnectDelay_-e);n=Math.random()*n,this.log_("Trying to reconnect in "+n+"ms"),this.scheduleConnect_(n),this.reconnectDelay_=Math.min(this.maxReconnectDelay_,this.reconnectDelay_*xI)}this.onConnectStatus_(!1)}async establishConnection_(){if(this.shouldReconnect_()){this.log_("Making a connection attempt"),this.lastConnectionAttemptTime_=new Date().getTime(),this.lastConnectionEstablishedTime_=null;const e=this.onDataMessage_.bind(this),n=this.onReady_.bind(this),i=this.onRealtimeDisconnect_.bind(this),s=this.id+":"+xt.nextConnectionId_++,r=this.lastSessionId;let o=!1,a=null;const c=function(){a?a.close():(o=!0,i())},l=function(d){g(a,"sendRequest call when we're not connected not allowed."),a.sendRequest(d)};this.realtime_={close:c,sendRequest:l};const u=this.forceTokenRefresh_;this.forceTokenRefresh_=!1;try{const[d,h]=await Promise.all([this.authTokenProvider_.getToken(u),this.appCheckTokenProvider_.getToken(u)]);o?pe("getToken() completed but was canceled"):(pe("getToken() completed. Creating connection."),this.authToken_=d&&d.accessToken,this.appCheckToken_=h&&h.token,a=new AI(s,this.repoInfo_,this.applicationId_,this.appCheckToken_,this.authToken_,e,n,i,f=>{Ne(f+" ("+this.repoInfo_.toString()+")"),this.interrupt(UI)},r))}catch(d){this.log_("Failed to get token: "+d),o||(this.repoInfo_.nodeAdmin&&Ne(d),c())}}}interrupt(e){pe("Interrupting connection for reason: "+e),this.interruptReasons_[e]=!0,this.realtime_?this.realtime_.close():(this.establishConnectionTimer_&&(clearTimeout(this.establishConnectionTimer_),this.establishConnectionTimer_=null),this.connected_&&this.onRealtimeDisconnect_())}resume(e){pe("Resuming connection for reason: "+e),delete this.interruptReasons_[e],Kr(this.interruptReasons_)&&(this.reconnectDelay_=ls,this.realtime_||this.scheduleConnect_(0))}handleTimestamp_(e){const n=e-new Date().getTime();this.onServerInfoUpdate_({serverTimeOffset:n})}cancelSentTransactions_(){for(let e=0;e<this.outstandingPuts_.length;e++){const n=this.outstandingPuts_[e];n&&"h"in n.request&&n.queued&&(n.onComplete&&n.onComplete("disconnect"),delete this.outstandingPuts_[e],this.outstandingPutCount_--)}this.outstandingPutCount_===0&&(this.outstandingPuts_=[])}onListenRevoked_(e,n){let i;n?i=n.map(r=>xl(r)).join("$"):i="default";const s=this.removeListen_(e,i);s&&s.onComplete&&s.onComplete("permission_denied")}removeListen_(e,n){const i=new V(e).toString();let s;if(this.listens.has(i)){const r=this.listens.get(i);s=r.get(n),r.delete(n),r.size===0&&this.listens.delete(i)}else s=void 0;return s}onAuthRevoked_(e,n){pe("Auth token revoked: "+e+"/"+n),this.authToken_=null,this.forceTokenRefresh_=!0,this.realtime_.close(),(e==="invalid_token"||e==="permission_denied")&&(this.invalidAuthTokenCount_++,this.invalidAuthTokenCount_>=$h&&(this.reconnectDelay_=Uh,this.authTokenProvider_.notifyForInvalidToken()))}onAppCheckRevoked_(e,n){pe("App check token revoked: "+e+"/"+n),this.appCheckToken_=null,this.forceTokenRefresh_=!0,(e==="invalid_token"||e==="permission_denied")&&(this.invalidAppCheckTokenCount_++,this.invalidAppCheckTokenCount_>=$h&&this.appCheckTokenProvider_.notifyForInvalidToken())}onSecurityDebugPacket_(e){this.securityDebugCallback_?this.securityDebugCallback_(e):"msg"in e&&console.log("FIREBASE: "+e.msg.replace(`
`,`
FIREBASE: `))}restoreState_(){this.tryAuth(),this.tryAppCheck();for(const e of this.listens.values())for(const n of e.values())this.sendListen_(n);for(let e=0;e<this.outstandingPuts_.length;e++)this.outstandingPuts_[e]&&this.sendPut_(e);for(;this.onDisconnectRequestQueue_.length;){const e=this.onDisconnectRequestQueue_.shift();this.sendOnDisconnect_(e.action,e.pathString,e.data,e.onComplete)}for(let e=0;e<this.outstandingGets_.length;e++)this.outstandingGets_[e]&&this.sendGet_(e)}sendConnectStats_(){const e={};let n="js";e["sdk."+n+"."+yg.replace(/\./g,"-")]=1,Dl()?e["framework.cordova"]=1:ug()&&(e["framework.reactnative"]=1),this.reportStats(e)}shouldReconnect_(){const e=Qr.getInstance().currentlyOnline();return Kr(this.interruptReasons_)&&e}}xt.nextPersistentConnectionId_=0;xt.nextConnectionId_=0;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
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
 */class Go{getCompare(){return this.compare.bind(this)}indexedValueChanged(e,n){const i=new O(Li,e),s=new O(Li,n);return this.compare(i,s)!==0}minPost(){return O.MIN}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let wr;class Wg extends Go{static get __EMPTY_NODE(){return wr}static set __EMPTY_NODE(e){wr=e}compare(e,n){return ei(e.name,n.name)}isDefinedOn(e){throw qi("KeyIndex.isDefinedOn not expected to be called.")}indexedValueChanged(e,n){return!1}minPost(){return O.MIN}maxPost(){return new O(Wn,wr)}makePost(e,n){return g(typeof e=="string","KeyIndex indexValue must always be a string."),new O(e,wr)}toString(){return".key"}}const di=new Wg;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class vr{constructor(e,n,i,s,r=null){this.isReverse_=s,this.resultGenerator_=r,this.nodeStack_=[];let o=1;for(;!e.isEmpty();)if(e=e,o=n?i(e.key,n):1,s&&(o*=-1),o<0)this.isReverse_?e=e.left:e=e.right;else if(o===0){this.nodeStack_.push(e);break}else this.nodeStack_.push(e),this.isReverse_?e=e.right:e=e.left}getNext(){if(this.nodeStack_.length===0)return null;let e=this.nodeStack_.pop(),n;if(this.resultGenerator_?n=this.resultGenerator_(e.key,e.value):n={key:e.key,value:e.value},this.isReverse_)for(e=e.left;!e.isEmpty();)this.nodeStack_.push(e),e=e.right;else for(e=e.right;!e.isEmpty();)this.nodeStack_.push(e),e=e.left;return n}hasNext(){return this.nodeStack_.length>0}peek(){if(this.nodeStack_.length===0)return null;const e=this.nodeStack_[this.nodeStack_.length-1];return this.resultGenerator_?this.resultGenerator_(e.key,e.value):{key:e.key,value:e.value}}}class fe{constructor(e,n,i,s,r){this.key=e,this.value=n,this.color=i??fe.RED,this.left=s??Me.EMPTY_NODE,this.right=r??Me.EMPTY_NODE}copy(e,n,i,s,r){return new fe(e??this.key,n??this.value,i??this.color,s??this.left,r??this.right)}count(){return this.left.count()+1+this.right.count()}isEmpty(){return!1}inorderTraversal(e){return this.left.inorderTraversal(e)||!!e(this.key,this.value)||this.right.inorderTraversal(e)}reverseTraversal(e){return this.right.reverseTraversal(e)||e(this.key,this.value)||this.left.reverseTraversal(e)}min_(){return this.left.isEmpty()?this:this.left.min_()}minKey(){return this.min_().key}maxKey(){return this.right.isEmpty()?this.key:this.right.maxKey()}insert(e,n,i){let s=this;const r=i(e,s.key);return r<0?s=s.copy(null,null,null,s.left.insert(e,n,i),null):r===0?s=s.copy(null,n,null,null,null):s=s.copy(null,null,null,null,s.right.insert(e,n,i)),s.fixUp_()}removeMin_(){if(this.left.isEmpty())return Me.EMPTY_NODE;let e=this;return!e.left.isRed_()&&!e.left.left.isRed_()&&(e=e.moveRedLeft_()),e=e.copy(null,null,null,e.left.removeMin_(),null),e.fixUp_()}remove(e,n){let i,s;if(i=this,n(e,i.key)<0)!i.left.isEmpty()&&!i.left.isRed_()&&!i.left.left.isRed_()&&(i=i.moveRedLeft_()),i=i.copy(null,null,null,i.left.remove(e,n),null);else{if(i.left.isRed_()&&(i=i.rotateRight_()),!i.right.isEmpty()&&!i.right.isRed_()&&!i.right.left.isRed_()&&(i=i.moveRedRight_()),n(e,i.key)===0){if(i.right.isEmpty())return Me.EMPTY_NODE;s=i.right.min_(),i=i.copy(s.key,s.value,null,null,i.right.removeMin_())}i=i.copy(null,null,null,null,i.right.remove(e,n))}return i.fixUp_()}isRed_(){return this.color}fixUp_(){let e=this;return e.right.isRed_()&&!e.left.isRed_()&&(e=e.rotateLeft_()),e.left.isRed_()&&e.left.left.isRed_()&&(e=e.rotateRight_()),e.left.isRed_()&&e.right.isRed_()&&(e=e.colorFlip_()),e}moveRedLeft_(){let e=this.colorFlip_();return e.right.left.isRed_()&&(e=e.copy(null,null,null,null,e.right.rotateRight_()),e=e.rotateLeft_(),e=e.colorFlip_()),e}moveRedRight_(){let e=this.colorFlip_();return e.left.left.isRed_()&&(e=e.rotateRight_(),e=e.colorFlip_()),e}rotateLeft_(){const e=this.copy(null,null,fe.RED,null,this.right.left);return this.right.copy(null,null,this.color,e,null)}rotateRight_(){const e=this.copy(null,null,fe.RED,this.left.right,null);return this.left.copy(null,null,this.color,null,e)}colorFlip_(){const e=this.left.copy(null,null,!this.left.color,null,null),n=this.right.copy(null,null,!this.right.color,null,null);return this.copy(null,null,!this.color,e,n)}checkMaxDepth_(){const e=this.check_();return Math.pow(2,e)<=this.count()+1}check_(){if(this.isRed_()&&this.left.isRed_())throw new Error("Red node has red child("+this.key+","+this.value+")");if(this.right.isRed_())throw new Error("Right child of ("+this.key+","+this.value+") is red");const e=this.left.check_();if(e!==this.right.check_())throw new Error("Black depths differ");return e+(this.isRed_()?0:1)}}fe.RED=!0;fe.BLACK=!1;class $I{copy(e,n,i,s,r){return this}insert(e,n,i){return new fe(e,n,null)}remove(e,n){return this}count(){return 0}isEmpty(){return!0}inorderTraversal(e){return!1}reverseTraversal(e){return!1}minKey(){return null}maxKey(){return null}check_(){return 0}isRed_(){return!1}}class Me{constructor(e,n=Me.EMPTY_NODE){this.comparator_=e,this.root_=n}insert(e,n){return new Me(this.comparator_,this.root_.insert(e,n,this.comparator_).copy(null,null,fe.BLACK,null,null))}remove(e){return new Me(this.comparator_,this.root_.remove(e,this.comparator_).copy(null,null,fe.BLACK,null,null))}get(e){let n,i=this.root_;for(;!i.isEmpty();){if(n=this.comparator_(e,i.key),n===0)return i.value;n<0?i=i.left:n>0&&(i=i.right)}return null}getPredecessorKey(e){let n,i=this.root_,s=null;for(;!i.isEmpty();)if(n=this.comparator_(e,i.key),n===0){if(i.left.isEmpty())return s?s.key:null;for(i=i.left;!i.right.isEmpty();)i=i.right;return i.key}else n<0?i=i.left:n>0&&(s=i,i=i.right);throw new Error("Attempted to find predecessor key for a nonexistent key.  What gives?")}isEmpty(){return this.root_.isEmpty()}count(){return this.root_.count()}minKey(){return this.root_.minKey()}maxKey(){return this.root_.maxKey()}inorderTraversal(e){return this.root_.inorderTraversal(e)}reverseTraversal(e){return this.root_.reverseTraversal(e)}getIterator(e){return new vr(this.root_,null,this.comparator_,!1,e)}getIteratorFrom(e,n){return new vr(this.root_,e,this.comparator_,!1,n)}getReverseIteratorFrom(e,n){return new vr(this.root_,e,this.comparator_,!0,n)}getReverseIterator(e){return new vr(this.root_,null,this.comparator_,!0,e)}}Me.EMPTY_NODE=new $I;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function BI(t,e){return ei(t.name,e.name)}function Wl(t,e){return ei(t,e)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let xc;function HI(t){xc=t}const jg=function(t){return typeof t=="number"?"number:"+Eg(t):"string:"+t},qg=function(t){if(t.isLeafNode()){const e=t.val();g(typeof e=="string"||typeof e=="number"||typeof e=="object"&&Et(e,".sv"),"Priority must be a string or number.")}else g(t===xc||t.isEmpty(),"priority of unexpected type.");g(t===xc||t.getPriority().isEmpty(),"Priority nodes can't have a priority of their own.")};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Bh;class he{static set __childrenNodeConstructor(e){Bh=e}static get __childrenNodeConstructor(){return Bh}constructor(e,n=he.__childrenNodeConstructor.EMPTY_NODE){this.value_=e,this.priorityNode_=n,this.lazyHash_=null,g(this.value_!==void 0&&this.value_!==null,"LeafNode shouldn't be created with null/undefined value."),qg(this.priorityNode_)}isLeafNode(){return!0}getPriority(){return this.priorityNode_}updatePriority(e){return new he(this.value_,e)}getImmediateChild(e){return e===".priority"?this.priorityNode_:he.__childrenNodeConstructor.EMPTY_NODE}getChild(e){return L(e)?this:P(e)===".priority"?this.priorityNode_:he.__childrenNodeConstructor.EMPTY_NODE}hasChild(){return!1}getPredecessorChildName(e,n){return null}updateImmediateChild(e,n){return e===".priority"?this.updatePriority(n):n.isEmpty()&&e!==".priority"?this:he.__childrenNodeConstructor.EMPTY_NODE.updateImmediateChild(e,n).updatePriority(this.priorityNode_)}updateChild(e,n){const i=P(e);return i===null?n:n.isEmpty()&&i!==".priority"?this:(g(i!==".priority"||dn(e)===1,".priority must be the last token in a path"),this.updateImmediateChild(i,he.__childrenNodeConstructor.EMPTY_NODE.updateChild(G(e),n)))}isEmpty(){return!1}numChildren(){return 0}forEachChild(e,n){return!1}val(e){return e&&!this.getPriority().isEmpty()?{".value":this.getValue(),".priority":this.getPriority().val()}:this.getValue()}hash(){if(this.lazyHash_===null){let e="";this.priorityNode_.isEmpty()||(e+="priority:"+jg(this.priorityNode_.val())+":");const n=typeof this.value_;e+=n+":",n==="number"?e+=Eg(this.value_):e+=this.value_,this.lazyHash_=vg(e)}return this.lazyHash_}getValue(){return this.value_}compareTo(e){return e===he.__childrenNodeConstructor.EMPTY_NODE?1:e instanceof he.__childrenNodeConstructor?-1:(g(e.isLeafNode(),"Unknown node type"),this.compareToLeafNode_(e))}compareToLeafNode_(e){const n=typeof e.value_,i=typeof this.value_,s=he.VALUE_TYPE_ORDER.indexOf(n),r=he.VALUE_TYPE_ORDER.indexOf(i);return g(s>=0,"Unknown leaf type: "+n),g(r>=0,"Unknown leaf type: "+i),s===r?i==="object"?0:this.value_<e.value_?-1:this.value_===e.value_?0:1:r-s}withIndex(){return this}isIndexed(){return!0}equals(e){if(e===this)return!0;if(e.isLeafNode()){const n=e;return this.value_===n.value_&&this.priorityNode_.equals(n.priorityNode_)}else return!1}}he.VALUE_TYPE_ORDER=["object","boolean","number","string"];/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let zg,Gg;function VI(t){zg=t}function WI(t){Gg=t}class jI extends Go{compare(e,n){const i=e.node.getPriority(),s=n.node.getPriority(),r=i.compareTo(s);return r===0?ei(e.name,n.name):r}isDefinedOn(e){return!e.getPriority().isEmpty()}indexedValueChanged(e,n){return!e.getPriority().equals(n.getPriority())}minPost(){return O.MIN}maxPost(){return new O(Wn,new he("[PRIORITY-POST]",Gg))}makePost(e,n){const i=zg(e);return new O(n,new he("[PRIORITY-POST]",i))}toString(){return".priority"}}const te=new jI;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const qI=Math.log(2);class zI{constructor(e){const n=r=>parseInt(Math.log(r)/qI,10),i=r=>parseInt(Array(r+1).join("1"),2);this.count=n(e+1),this.current_=this.count-1;const s=i(this.count);this.bits_=e+1&s}nextBitIsOne(){const e=!(this.bits_&1<<this.current_);return this.current_--,e}}const Zr=function(t,e,n,i){t.sort(e);const s=function(c,l){const u=l-c;let d,h;if(u===0)return null;if(u===1)return d=t[c],h=n?n(d):d,new fe(h,d.node,fe.BLACK,null,null);{const f=parseInt(u/2,10)+c,p=s(c,f),_=s(f+1,l);return d=t[f],h=n?n(d):d,new fe(h,d.node,fe.BLACK,p,_)}},r=function(c){let l=null,u=null,d=t.length;const h=function(p,_){const m=d-p,A=d;d-=p;const x=s(m+1,A),W=t[m],S=n?n(W):W;f(new fe(S,W.node,_,null,x))},f=function(p){l?(l.left=p,l=p):(u=p,l=p)};for(let p=0;p<c.count;++p){const _=c.nextBitIsOne(),m=Math.pow(2,c.count-(p+1));_?h(m,fe.BLACK):(h(m,fe.BLACK),h(m,fe.RED))}return u},o=new zI(t.length),a=r(o);return new Me(i||e,a)};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Wa;const si={};class kt{static get Default(){return g(si&&te,"ChildrenNode.ts has not been loaded"),Wa=Wa||new kt({".priority":si},{".priority":te}),Wa}constructor(e,n){this.indexes_=e,this.indexSet_=n}get(e){const n=Ni(this.indexes_,e);if(!n)throw new Error("No index defined for "+e);return n instanceof Me?n:null}hasIndex(e){return Et(this.indexSet_,e.toString())}addIndex(e,n){g(e!==di,"KeyIndex always exists and isn't meant to be added to the IndexMap.");const i=[];let s=!1;const r=n.getIterator(O.Wrap);let o=r.getNext();for(;o;)s=s||e.isDefinedOn(o.node),i.push(o),o=r.getNext();let a;s?a=Zr(i,e.getCompare()):a=si;const c=e.toString(),l={...this.indexSet_};l[c]=e;const u={...this.indexes_};return u[c]=a,new kt(u,l)}addToIndexes(e,n){const i=Yr(this.indexes_,(s,r)=>{const o=Ni(this.indexSet_,r);if(g(o,"Missing index implementation for "+r),s===si)if(o.isDefinedOn(e.node)){const a=[],c=n.getIterator(O.Wrap);let l=c.getNext();for(;l;)l.name!==e.name&&a.push(l),l=c.getNext();return a.push(e),Zr(a,o.getCompare())}else return si;else{const a=n.get(e.name);let c=s;return a&&(c=c.remove(new O(e.name,a))),c.insert(e,e.node)}});return new kt(i,this.indexSet_)}removeFromIndexes(e,n){const i=Yr(this.indexes_,s=>{if(s===si)return s;{const r=n.get(e.name);return r?s.remove(new O(e.name,r)):s}});return new kt(i,this.indexSet_)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let us;class C{static get EMPTY_NODE(){return us||(us=new C(new Me(Wl),null,kt.Default))}constructor(e,n,i){this.children_=e,this.priorityNode_=n,this.indexMap_=i,this.lazyHash_=null,this.priorityNode_&&qg(this.priorityNode_),this.children_.isEmpty()&&g(!this.priorityNode_||this.priorityNode_.isEmpty(),"An empty node cannot have a priority")}isLeafNode(){return!1}getPriority(){return this.priorityNode_||us}updatePriority(e){return this.children_.isEmpty()?this:new C(this.children_,e,this.indexMap_)}getImmediateChild(e){if(e===".priority")return this.getPriority();{const n=this.children_.get(e);return n===null?us:n}}getChild(e){const n=P(e);return n===null?this:this.getImmediateChild(n).getChild(G(e))}hasChild(e){return this.children_.get(e)!==null}updateImmediateChild(e,n){if(g(n,"We should always be passing snapshot nodes"),e===".priority")return this.updatePriority(n);{const i=new O(e,n);let s,r;n.isEmpty()?(s=this.children_.remove(e),r=this.indexMap_.removeFromIndexes(i,this.children_)):(s=this.children_.insert(e,n),r=this.indexMap_.addToIndexes(i,this.children_));const o=s.isEmpty()?us:this.priorityNode_;return new C(s,o,r)}}updateChild(e,n){const i=P(e);if(i===null)return n;{g(P(e)!==".priority"||dn(e)===1,".priority must be the last token in a path");const s=this.getImmediateChild(i).updateChild(G(e),n);return this.updateImmediateChild(i,s)}}isEmpty(){return this.children_.isEmpty()}numChildren(){return this.children_.count()}val(e){if(this.isEmpty())return null;const n={};let i=0,s=0,r=!0;if(this.forEachChild(te,(o,a)=>{n[o]=a.val(e),i++,r&&C.INTEGER_REGEXP_.test(o)?s=Math.max(s,Number(o)):r=!1}),!e&&r&&s<2*i){const o=[];for(const a in n)o[a]=n[a];return o}else return e&&!this.getPriority().isEmpty()&&(n[".priority"]=this.getPriority().val()),n}hash(){if(this.lazyHash_===null){let e="";this.getPriority().isEmpty()||(e+="priority:"+jg(this.getPriority().val())+":"),this.forEachChild(te,(n,i)=>{const s=i.hash();s!==""&&(e+=":"+n+":"+s)}),this.lazyHash_=e===""?"":vg(e)}return this.lazyHash_}getPredecessorChildName(e,n,i){const s=this.resolveIndex_(i);if(s){const r=s.getPredecessorKey(new O(e,n));return r?r.name:null}else return this.children_.getPredecessorKey(e)}getFirstChildName(e){const n=this.resolveIndex_(e);if(n){const i=n.minKey();return i&&i.name}else return this.children_.minKey()}getFirstChild(e){const n=this.getFirstChildName(e);return n?new O(n,this.children_.get(n)):null}getLastChildName(e){const n=this.resolveIndex_(e);if(n){const i=n.maxKey();return i&&i.name}else return this.children_.maxKey()}getLastChild(e){const n=this.getLastChildName(e);return n?new O(n,this.children_.get(n)):null}forEachChild(e,n){const i=this.resolveIndex_(e);return i?i.inorderTraversal(s=>n(s.name,s.node)):this.children_.inorderTraversal(n)}getIterator(e){return this.getIteratorFrom(e.minPost(),e)}getIteratorFrom(e,n){const i=this.resolveIndex_(n);if(i)return i.getIteratorFrom(e,s=>s);{const s=this.children_.getIteratorFrom(e.name,O.Wrap);let r=s.peek();for(;r!=null&&n.compare(r,e)<0;)s.getNext(),r=s.peek();return s}}getReverseIterator(e){return this.getReverseIteratorFrom(e.maxPost(),e)}getReverseIteratorFrom(e,n){const i=this.resolveIndex_(n);if(i)return i.getReverseIteratorFrom(e,s=>s);{const s=this.children_.getReverseIteratorFrom(e.name,O.Wrap);let r=s.peek();for(;r!=null&&n.compare(r,e)>0;)s.getNext(),r=s.peek();return s}}compareTo(e){return this.isEmpty()?e.isEmpty()?0:-1:e.isLeafNode()||e.isEmpty()?1:e===rr?-1:0}withIndex(e){if(e===di||this.indexMap_.hasIndex(e))return this;{const n=this.indexMap_.addIndex(e,this.children_);return new C(this.children_,this.priorityNode_,n)}}isIndexed(e){return e===di||this.indexMap_.hasIndex(e)}equals(e){if(e===this)return!0;if(e.isLeafNode())return!1;{const n=e;if(this.getPriority().equals(n.getPriority()))if(this.children_.count()===n.children_.count()){const i=this.getIterator(te),s=n.getIterator(te);let r=i.getNext(),o=s.getNext();for(;r&&o;){if(r.name!==o.name||!r.node.equals(o.node))return!1;r=i.getNext(),o=s.getNext()}return r===null&&o===null}else return!1;else return!1}}resolveIndex_(e){return e===di?null:this.indexMap_.get(e.toString())}}C.INTEGER_REGEXP_=/^(0|[1-9]\d*)$/;class GI extends C{constructor(){super(new Me(Wl),C.EMPTY_NODE,kt.Default)}compareTo(e){return e===this?0:1}equals(e){return e===this}getPriority(){return this}getImmediateChild(e){return C.EMPTY_NODE}isEmpty(){return!1}}const rr=new GI;Object.defineProperties(O,{MIN:{value:new O(Li,C.EMPTY_NODE)},MAX:{value:new O(Wn,rr)}});Wg.__EMPTY_NODE=C.EMPTY_NODE;he.__childrenNodeConstructor=C;HI(rr);WI(rr);/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const KI=!0;function ie(t,e=null){if(t===null)return C.EMPTY_NODE;if(typeof t=="object"&&".priority"in t&&(e=t[".priority"]),g(e===null||typeof e=="string"||typeof e=="number"||typeof e=="object"&&".sv"in e,"Invalid priority type found: "+typeof e),typeof t=="object"&&".value"in t&&t[".value"]!==null&&(t=t[".value"]),typeof t!="object"||".sv"in t){const n=t;return new he(n,ie(e))}if(!(t instanceof Array)&&KI){const n=[];let i=!1;if(ye(t,(o,a)=>{if(o.substring(0,1)!=="."){const c=ie(a);c.isEmpty()||(i=i||!c.getPriority().isEmpty(),n.push(new O(o,c)))}}),n.length===0)return C.EMPTY_NODE;const r=Zr(n,BI,o=>o.name,Wl);if(i){const o=Zr(n,te.getCompare());return new C(r,ie(e),new kt({".priority":o},{".priority":te}))}else return new C(r,ie(e),kt.Default)}else{let n=C.EMPTY_NODE;return ye(t,(i,s)=>{if(Et(t,i)&&i.substring(0,1)!=="."){const r=ie(s);(r.isLeafNode()||!r.isEmpty())&&(n=n.updateImmediateChild(i,r))}}),n.updatePriority(ie(e))}}VI(ie);/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class YI extends Go{constructor(e){super(),this.indexPath_=e,g(!L(e)&&P(e)!==".priority","Can't create PathIndex with empty path or .priority key")}extractChild(e){return e.getChild(this.indexPath_)}isDefinedOn(e){return!e.getChild(this.indexPath_).isEmpty()}compare(e,n){const i=this.extractChild(e.node),s=this.extractChild(n.node),r=i.compareTo(s);return r===0?ei(e.name,n.name):r}makePost(e,n){const i=ie(e),s=C.EMPTY_NODE.updateChild(this.indexPath_,i);return new O(n,s)}maxPost(){const e=C.EMPTY_NODE.updateChild(this.indexPath_,rr);return new O(Wn,e)}toString(){return Fs(this.indexPath_,0).join("/")}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class JI extends Go{compare(e,n){const i=e.node.compareTo(n.node);return i===0?ei(e.name,n.name):i}isDefinedOn(e){return!0}indexedValueChanged(e,n){return!e.equals(n)}minPost(){return O.MIN}maxPost(){return O.MAX}makePost(e,n){const i=ie(e);return new O(n,i)}toString(){return".value"}}const XI=new JI;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Kg(t){return{type:"value",snapshotNode:t}}function Oi(t,e){return{type:"child_added",snapshotNode:e,childName:t}}function Us(t,e){return{type:"child_removed",snapshotNode:e,childName:t}}function $s(t,e,n){return{type:"child_changed",snapshotNode:e,childName:t,oldSnap:n}}function QI(t,e){return{type:"child_moved",snapshotNode:e,childName:t}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class jl{constructor(e){this.index_=e}updateChild(e,n,i,s,r,o){g(e.isIndexed(this.index_),"A node must be indexed if only a child is updated");const a=e.getImmediateChild(n);return a.getChild(s).equals(i.getChild(s))&&a.isEmpty()===i.isEmpty()||(o!=null&&(i.isEmpty()?e.hasChild(n)?o.trackChildChange(Us(n,a)):g(e.isLeafNode(),"A child remove without an old child only makes sense on a leaf node"):a.isEmpty()?o.trackChildChange(Oi(n,i)):o.trackChildChange($s(n,i,a))),e.isLeafNode()&&i.isEmpty())?e:e.updateImmediateChild(n,i).withIndex(this.index_)}updateFullNode(e,n,i){return i!=null&&(e.isLeafNode()||e.forEachChild(te,(s,r)=>{n.hasChild(s)||i.trackChildChange(Us(s,r))}),n.isLeafNode()||n.forEachChild(te,(s,r)=>{if(e.hasChild(s)){const o=e.getImmediateChild(s);o.equals(r)||i.trackChildChange($s(s,r,o))}else i.trackChildChange(Oi(s,r))})),n.withIndex(this.index_)}updatePriority(e,n){return e.isEmpty()?C.EMPTY_NODE:e.updatePriority(n)}filtersNodes(){return!1}getIndexedFilter(){return this}getIndex(){return this.index_}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Bs{constructor(e){this.indexedFilter_=new jl(e.getIndex()),this.index_=e.getIndex(),this.startPost_=Bs.getStartPost_(e),this.endPost_=Bs.getEndPost_(e),this.startIsInclusive_=!e.startAfterSet_,this.endIsInclusive_=!e.endBeforeSet_}getStartPost(){return this.startPost_}getEndPost(){return this.endPost_}matches(e){const n=this.startIsInclusive_?this.index_.compare(this.getStartPost(),e)<=0:this.index_.compare(this.getStartPost(),e)<0,i=this.endIsInclusive_?this.index_.compare(e,this.getEndPost())<=0:this.index_.compare(e,this.getEndPost())<0;return n&&i}updateChild(e,n,i,s,r,o){return this.matches(new O(n,i))||(i=C.EMPTY_NODE),this.indexedFilter_.updateChild(e,n,i,s,r,o)}updateFullNode(e,n,i){n.isLeafNode()&&(n=C.EMPTY_NODE);let s=n.withIndex(this.index_);s=s.updatePriority(C.EMPTY_NODE);const r=this;return n.forEachChild(te,(o,a)=>{r.matches(new O(o,a))||(s=s.updateImmediateChild(o,C.EMPTY_NODE))}),this.indexedFilter_.updateFullNode(e,s,i)}updatePriority(e,n){return e}filtersNodes(){return!0}getIndexedFilter(){return this.indexedFilter_}getIndex(){return this.index_}static getStartPost_(e){if(e.hasStart()){const n=e.getIndexStartName();return e.getIndex().makePost(e.getIndexStartValue(),n)}else return e.getIndex().minPost()}static getEndPost_(e){if(e.hasEnd()){const n=e.getIndexEndName();return e.getIndex().makePost(e.getIndexEndValue(),n)}else return e.getIndex().maxPost()}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ZI{constructor(e){this.withinDirectionalStart=n=>this.reverse_?this.withinEndPost(n):this.withinStartPost(n),this.withinDirectionalEnd=n=>this.reverse_?this.withinStartPost(n):this.withinEndPost(n),this.withinStartPost=n=>{const i=this.index_.compare(this.rangedFilter_.getStartPost(),n);return this.startIsInclusive_?i<=0:i<0},this.withinEndPost=n=>{const i=this.index_.compare(n,this.rangedFilter_.getEndPost());return this.endIsInclusive_?i<=0:i<0},this.rangedFilter_=new Bs(e),this.index_=e.getIndex(),this.limit_=e.getLimit(),this.reverse_=!e.isViewFromLeft(),this.startIsInclusive_=!e.startAfterSet_,this.endIsInclusive_=!e.endBeforeSet_}updateChild(e,n,i,s,r,o){return this.rangedFilter_.matches(new O(n,i))||(i=C.EMPTY_NODE),e.getImmediateChild(n).equals(i)?e:e.numChildren()<this.limit_?this.rangedFilter_.getIndexedFilter().updateChild(e,n,i,s,r,o):this.fullLimitUpdateChild_(e,n,i,r,o)}updateFullNode(e,n,i){let s;if(n.isLeafNode()||n.isEmpty())s=C.EMPTY_NODE.withIndex(this.index_);else if(this.limit_*2<n.numChildren()&&n.isIndexed(this.index_)){s=C.EMPTY_NODE.withIndex(this.index_);let r;this.reverse_?r=n.getReverseIteratorFrom(this.rangedFilter_.getEndPost(),this.index_):r=n.getIteratorFrom(this.rangedFilter_.getStartPost(),this.index_);let o=0;for(;r.hasNext()&&o<this.limit_;){const a=r.getNext();if(this.withinDirectionalStart(a))if(this.withinDirectionalEnd(a))s=s.updateImmediateChild(a.name,a.node),o++;else break;else continue}}else{s=n.withIndex(this.index_),s=s.updatePriority(C.EMPTY_NODE);let r;this.reverse_?r=s.getReverseIterator(this.index_):r=s.getIterator(this.index_);let o=0;for(;r.hasNext();){const a=r.getNext();o<this.limit_&&this.withinDirectionalStart(a)&&this.withinDirectionalEnd(a)?o++:s=s.updateImmediateChild(a.name,C.EMPTY_NODE)}}return this.rangedFilter_.getIndexedFilter().updateFullNode(e,s,i)}updatePriority(e,n){return e}filtersNodes(){return!0}getIndexedFilter(){return this.rangedFilter_.getIndexedFilter()}getIndex(){return this.index_}fullLimitUpdateChild_(e,n,i,s,r){let o;if(this.reverse_){const d=this.index_.getCompare();o=(h,f)=>d(f,h)}else o=this.index_.getCompare();const a=e;g(a.numChildren()===this.limit_,"");const c=new O(n,i),l=this.reverse_?a.getFirstChild(this.index_):a.getLastChild(this.index_),u=this.rangedFilter_.matches(c);if(a.hasChild(n)){const d=a.getImmediateChild(n);let h=s.getChildAfterChild(this.index_,l,this.reverse_);for(;h!=null&&(h.name===n||a.hasChild(h.name));)h=s.getChildAfterChild(this.index_,h,this.reverse_);const f=h==null?1:o(h,c);if(u&&!i.isEmpty()&&f>=0)return r?.trackChildChange($s(n,i,d)),a.updateImmediateChild(n,i);{r?.trackChildChange(Us(n,d));const _=a.updateImmediateChild(n,C.EMPTY_NODE);return h!=null&&this.rangedFilter_.matches(h)?(r?.trackChildChange(Oi(h.name,h.node)),_.updateImmediateChild(h.name,h.node)):_}}else return i.isEmpty()?e:u&&o(l,c)>=0?(r!=null&&(r.trackChildChange(Us(l.name,l.node)),r.trackChildChange(Oi(n,i))),a.updateImmediateChild(n,i).updateImmediateChild(l.name,C.EMPTY_NODE)):e}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ql{constructor(){this.limitSet_=!1,this.startSet_=!1,this.startNameSet_=!1,this.startAfterSet_=!1,this.endSet_=!1,this.endNameSet_=!1,this.endBeforeSet_=!1,this.limit_=0,this.viewFrom_="",this.indexStartValue_=null,this.indexStartName_="",this.indexEndValue_=null,this.indexEndName_="",this.index_=te}hasStart(){return this.startSet_}isViewFromLeft(){return this.viewFrom_===""?this.startSet_:this.viewFrom_==="l"}getIndexStartValue(){return g(this.startSet_,"Only valid if start has been set"),this.indexStartValue_}getIndexStartName(){return g(this.startSet_,"Only valid if start has been set"),this.startNameSet_?this.indexStartName_:Li}hasEnd(){return this.endSet_}getIndexEndValue(){return g(this.endSet_,"Only valid if end has been set"),this.indexEndValue_}getIndexEndName(){return g(this.endSet_,"Only valid if end has been set"),this.endNameSet_?this.indexEndName_:Wn}hasLimit(){return this.limitSet_}hasAnchoredLimit(){return this.limitSet_&&this.viewFrom_!==""}getLimit(){return g(this.limitSet_,"Only valid if limit has been set"),this.limit_}getIndex(){return this.index_}loadsAllData(){return!(this.startSet_||this.endSet_||this.limitSet_)}isDefault(){return this.loadsAllData()&&this.index_===te}copy(){const e=new ql;return e.limitSet_=this.limitSet_,e.limit_=this.limit_,e.startSet_=this.startSet_,e.startAfterSet_=this.startAfterSet_,e.indexStartValue_=this.indexStartValue_,e.startNameSet_=this.startNameSet_,e.indexStartName_=this.indexStartName_,e.endSet_=this.endSet_,e.endBeforeSet_=this.endBeforeSet_,e.indexEndValue_=this.indexEndValue_,e.endNameSet_=this.endNameSet_,e.indexEndName_=this.indexEndName_,e.index_=this.index_,e.viewFrom_=this.viewFrom_,e}}function ek(t){return t.loadsAllData()?new jl(t.getIndex()):t.hasLimit()?new ZI(t):new Bs(t)}function Hh(t){const e={};if(t.isDefault())return e;let n;if(t.index_===te?n="$priority":t.index_===XI?n="$value":t.index_===di?n="$key":(g(t.index_ instanceof YI,"Unrecognized index type!"),n=t.index_.toString()),e.orderBy=le(n),t.startSet_){const i=t.startAfterSet_?"startAfter":"startAt";e[i]=le(t.indexStartValue_),t.startNameSet_&&(e[i]+=","+le(t.indexStartName_))}if(t.endSet_){const i=t.endBeforeSet_?"endBefore":"endAt";e[i]=le(t.indexEndValue_),t.endNameSet_&&(e[i]+=","+le(t.indexEndName_))}return t.limitSet_&&(t.isViewFromLeft()?e.limitToFirst=t.limit_:e.limitToLast=t.limit_),e}function Vh(t){const e={};if(t.startSet_&&(e.sp=t.indexStartValue_,t.startNameSet_&&(e.sn=t.indexStartName_),e.sin=!t.startAfterSet_),t.endSet_&&(e.ep=t.indexEndValue_,t.endNameSet_&&(e.en=t.indexEndName_),e.ein=!t.endBeforeSet_),t.limitSet_){e.l=t.limit_;let n=t.viewFrom_;n===""&&(t.isViewFromLeft()?n="l":n="r"),e.vf=n}return t.index_!==te&&(e.i=t.index_.toString()),e}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class eo extends $g{reportStats(e){throw new Error("Method not implemented.")}static getListenId_(e,n){return n!==void 0?"tag$"+n:(g(e._queryParams.isDefault(),"should have a tag if it's not a default query."),e._path.toString())}constructor(e,n,i,s){super(),this.repoInfo_=e,this.onDataUpdate_=n,this.authTokenProvider_=i,this.appCheckTokenProvider_=s,this.log_=sr("p:rest:"),this.listens_={}}listen(e,n,i,s){const r=e._path.toString();this.log_("Listen called for "+r+" "+e._queryIdentifier);const o=eo.getListenId_(e,i),a={};this.listens_[o]=a;const c=Hh(e._queryParams);this.restRequest_(r+".json",c,(l,u)=>{let d=u;if(l===404&&(d=null,l=null),l===null&&this.onDataUpdate_(r,d,!1,i),Ni(this.listens_,o)===a){let h;l?l===401?h="permission_denied":h="rest_error:"+l:h="ok",s(h,null)}})}unlisten(e,n){const i=eo.getListenId_(e,n);delete this.listens_[i]}get(e){const n=Hh(e._queryParams),i=e._path.toString(),s=new Oe;return this.restRequest_(i+".json",n,(r,o)=>{let a=o;r===404&&(a=null,r=null),r===null?(this.onDataUpdate_(i,a,!1,null),s.resolve(a)):s.reject(new Error(a))}),s.promise}refreshAuthToken(e){}restRequest_(e,n={},i){return n.format="export",Promise.all([this.authTokenProvider_.getToken(!1),this.appCheckTokenProvider_.getToken(!1)]).then(([s,r])=>{s&&s.accessToken&&(n.auth=s.accessToken),r&&r.token&&(n.ac=r.token);const o=(this.repoInfo_.secure?"https://":"http://")+this.repoInfo_.host+e+"?ns="+this.repoInfo_.namespace+Gi(n);this.log_("Sending REST request for "+o);const a=new XMLHttpRequest;a.onreadystatechange=()=>{if(i&&a.readyState===4){this.log_("REST Response for "+o+" received. status:",a.status,"response:",a.responseText);let c=null;if(a.status>=200&&a.status<300){try{c=Ds(a.responseText)}catch{Ne("Failed to parse JSON response for "+o+": "+a.responseText)}i(null,c)}else a.status!==401&&a.status!==404&&Ne("Got unsuccessful REST response for "+o+" Status: "+a.status),i(a.status);i=null}},a.open("GET",o,!0),a.send()})}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class tk{constructor(){this.rootNode_=C.EMPTY_NODE}getNode(e){return this.rootNode_.getChild(e)}updateSnapshot(e,n){this.rootNode_=this.rootNode_.updateChild(e,n)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function to(){return{value:null,children:new Map}}function Ji(t,e,n){if(L(e))t.value=n,t.children.clear();else if(t.value!==null)t.value=t.value.updateChild(e,n);else{const i=P(e);t.children.has(i)||t.children.set(i,to());const s=t.children.get(i);e=G(e),Ji(s,e,n)}}function Fc(t,e){if(L(e))return t.value=null,t.children.clear(),!0;if(t.value!==null){if(t.value.isLeafNode())return!1;{const n=t.value;return t.value=null,n.forEachChild(te,(i,s)=>{Ji(t,new V(i),s)}),Fc(t,e)}}else if(t.children.size>0){const n=P(e);return e=G(e),t.children.has(n)&&Fc(t.children.get(n),e)&&t.children.delete(n),t.children.size===0}else return!0}function Uc(t,e,n){t.value!==null?n(e,t.value):nk(t,(i,s)=>{const r=new V(e.toString()+"/"+i);Uc(s,r,n)})}function nk(t,e){t.children.forEach((n,i)=>{e(i,n)})}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ik{constructor(e){this.collection_=e,this.last_=null}get(){const e=this.collection_.get(),n={...e};return this.last_&&ye(this.last_,(i,s)=>{n[i]=n[i]-s}),this.last_=e,n}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Wh=10*1e3,sk=30*1e3,rk=300*1e3;class ok{constructor(e,n){this.server_=n,this.statsToReport_={},this.statsListener_=new ik(e);const i=Wh+(sk-Wh)*Math.random();ws(this.reportStats_.bind(this),Math.floor(i))}reportStats_(){const e=this.statsListener_.get(),n={};let i=!1;ye(e,(s,r)=>{r>0&&Et(this.statsToReport_,s)&&(n[s]=r,i=!0)}),i&&this.server_.reportStats(n),ws(this.reportStats_.bind(this),Math.floor(Math.random()*2*rk))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var ot;(function(t){t[t.OVERWRITE=0]="OVERWRITE",t[t.MERGE=1]="MERGE",t[t.ACK_USER_WRITE=2]="ACK_USER_WRITE",t[t.LISTEN_COMPLETE=3]="LISTEN_COMPLETE"})(ot||(ot={}));function zl(){return{fromUser:!0,fromServer:!1,queryId:null,tagged:!1}}function Gl(){return{fromUser:!1,fromServer:!0,queryId:null,tagged:!1}}function Kl(t){return{fromUser:!1,fromServer:!0,queryId:t,tagged:!0}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class no{constructor(e,n,i){this.path=e,this.affectedTree=n,this.revert=i,this.type=ot.ACK_USER_WRITE,this.source=zl()}operationForChild(e){if(L(this.path)){if(this.affectedTree.value!=null)return g(this.affectedTree.children.isEmpty(),"affectedTree should not have overlapping affected paths."),this;{const n=this.affectedTree.subtree(new V(e));return new no($(),n,this.revert)}}else return g(P(this.path)===e,"operationForChild called for unrelated child."),new no(G(this.path),this.affectedTree,this.revert)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Hs{constructor(e,n){this.source=e,this.path=n,this.type=ot.LISTEN_COMPLETE}operationForChild(e){return L(this.path)?new Hs(this.source,$()):new Hs(this.source,G(this.path))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class jn{constructor(e,n,i){this.source=e,this.path=n,this.snap=i,this.type=ot.OVERWRITE}operationForChild(e){return L(this.path)?new jn(this.source,$(),this.snap.getImmediateChild(e)):new jn(this.source,G(this.path),this.snap)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Di{constructor(e,n,i){this.source=e,this.path=n,this.children=i,this.type=ot.MERGE}operationForChild(e){if(L(this.path)){const n=this.children.subtree(new V(e));return n.isEmpty()?null:n.value?new jn(this.source,$(),n.value):new Di(this.source,$(),n)}else return g(P(this.path)===e,"Can't get a merge for a child not on the path of the operation"),new Di(this.source,G(this.path),this.children)}toString(){return"Operation("+this.path+": "+this.source.toString()+" merge: "+this.children.toString()+")"}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class hn{constructor(e,n,i){this.node_=e,this.fullyInitialized_=n,this.filtered_=i}isFullyInitialized(){return this.fullyInitialized_}isFiltered(){return this.filtered_}isCompleteForPath(e){if(L(e))return this.isFullyInitialized()&&!this.filtered_;const n=P(e);return this.isCompleteForChild(n)}isCompleteForChild(e){return this.isFullyInitialized()&&!this.filtered_||this.node_.hasChild(e)}getNode(){return this.node_}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ak{constructor(e){this.query_=e,this.index_=this.query_._queryParams.getIndex()}}function ck(t,e,n,i){const s=[],r=[];return e.forEach(o=>{o.type==="child_changed"&&t.index_.indexedValueChanged(o.oldSnap,o.snapshotNode)&&r.push(QI(o.childName,o.snapshotNode))}),ds(t,s,"child_removed",e,i,n),ds(t,s,"child_added",e,i,n),ds(t,s,"child_moved",r,i,n),ds(t,s,"child_changed",e,i,n),ds(t,s,"value",e,i,n),s}function ds(t,e,n,i,s,r){const o=i.filter(a=>a.type===n);o.sort((a,c)=>uk(t,a,c)),o.forEach(a=>{const c=lk(t,a,r);s.forEach(l=>{l.respondsTo(a.type)&&e.push(l.createEvent(c,t.query_))})})}function lk(t,e,n){return e.type==="value"||e.type==="child_removed"||(e.prevName=n.getPredecessorChildName(e.childName,e.snapshotNode,t.index_)),e}function uk(t,e,n){if(e.childName==null||n.childName==null)throw qi("Should only compare child_ events.");const i=new O(e.childName,e.snapshotNode),s=new O(n.childName,n.snapshotNode);return t.index_.compare(i,s)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ko(t,e){return{eventCache:t,serverCache:e}}function vs(t,e,n,i){return Ko(new hn(e,n,i),t.serverCache)}function Yg(t,e,n,i){return Ko(t.eventCache,new hn(e,n,i))}function io(t){return t.eventCache.isFullyInitialized()?t.eventCache.getNode():null}function qn(t){return t.serverCache.isFullyInitialized()?t.serverCache.getNode():null}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let ja;const dk=()=>(ja||(ja=new Me(YS)),ja);class K{static fromObject(e){let n=new K(null);return ye(e,(i,s)=>{n=n.set(new V(i),s)}),n}constructor(e,n=dk()){this.value=e,this.children=n}isEmpty(){return this.value===null&&this.children.isEmpty()}findRootMostMatchingPathAndValue(e,n){if(this.value!=null&&n(this.value))return{path:$(),value:this.value};if(L(e))return null;{const i=P(e),s=this.children.get(i);if(s!==null){const r=s.findRootMostMatchingPathAndValue(G(e),n);return r!=null?{path:ee(new V(i),r.path),value:r.value}:null}else return null}}findRootMostValueAndPath(e){return this.findRootMostMatchingPathAndValue(e,()=>!0)}subtree(e){if(L(e))return this;{const n=P(e),i=this.children.get(n);return i!==null?i.subtree(G(e)):new K(null)}}set(e,n){if(L(e))return new K(n,this.children);{const i=P(e),r=(this.children.get(i)||new K(null)).set(G(e),n),o=this.children.insert(i,r);return new K(this.value,o)}}remove(e){if(L(e))return this.children.isEmpty()?new K(null):new K(null,this.children);{const n=P(e),i=this.children.get(n);if(i){const s=i.remove(G(e));let r;return s.isEmpty()?r=this.children.remove(n):r=this.children.insert(n,s),this.value===null&&r.isEmpty()?new K(null):new K(this.value,r)}else return this}}get(e){if(L(e))return this.value;{const n=P(e),i=this.children.get(n);return i?i.get(G(e)):null}}setTree(e,n){if(L(e))return n;{const i=P(e),r=(this.children.get(i)||new K(null)).setTree(G(e),n);let o;return r.isEmpty()?o=this.children.remove(i):o=this.children.insert(i,r),new K(this.value,o)}}fold(e){return this.fold_($(),e)}fold_(e,n){const i={};return this.children.inorderTraversal((s,r)=>{i[s]=r.fold_(ee(e,s),n)}),n(e,this.value,i)}findOnPath(e,n){return this.findOnPath_(e,$(),n)}findOnPath_(e,n,i){const s=this.value?i(n,this.value):!1;if(s)return s;if(L(e))return null;{const r=P(e),o=this.children.get(r);return o?o.findOnPath_(G(e),ee(n,r),i):null}}foreachOnPath(e,n){return this.foreachOnPath_(e,$(),n)}foreachOnPath_(e,n,i){if(L(e))return this;{this.value&&i(n,this.value);const s=P(e),r=this.children.get(s);return r?r.foreachOnPath_(G(e),ee(n,s),i):new K(null)}}foreach(e){this.foreach_($(),e)}foreach_(e,n){this.children.inorderTraversal((i,s)=>{s.foreach_(ee(e,i),n)}),this.value&&n(e,this.value)}foreachChild(e){this.children.inorderTraversal((n,i)=>{i.value&&e(n,i.value)})}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ut{constructor(e){this.writeTree_=e}static empty(){return new ut(new K(null))}}function bs(t,e,n){if(L(e))return new ut(new K(n));{const i=t.writeTree_.findRootMostValueAndPath(e);if(i!=null){const s=i.path;let r=i.value;const o=Re(s,e);return r=r.updateChild(o,n),new ut(t.writeTree_.set(s,r))}else{const s=new K(n),r=t.writeTree_.setTree(e,s);return new ut(r)}}}function $c(t,e,n){let i=t;return ye(n,(s,r)=>{i=bs(i,ee(e,s),r)}),i}function jh(t,e){if(L(e))return ut.empty();{const n=t.writeTree_.setTree(e,new K(null));return new ut(n)}}function Bc(t,e){return ti(t,e)!=null}function ti(t,e){const n=t.writeTree_.findRootMostValueAndPath(e);return n!=null?t.writeTree_.get(n.path).getChild(Re(n.path,e)):null}function qh(t){const e=[],n=t.writeTree_.value;return n!=null?n.isLeafNode()||n.forEachChild(te,(i,s)=>{e.push(new O(i,s))}):t.writeTree_.children.inorderTraversal((i,s)=>{s.value!=null&&e.push(new O(i,s.value))}),e}function sn(t,e){if(L(e))return t;{const n=ti(t,e);return n!=null?new ut(new K(n)):new ut(t.writeTree_.subtree(e))}}function Hc(t){return t.writeTree_.isEmpty()}function Mi(t,e){return Jg($(),t.writeTree_,e)}function Jg(t,e,n){if(e.value!=null)return n.updateChild(t,e.value);{let i=null;return e.children.inorderTraversal((s,r)=>{s===".priority"?(g(r.value!==null,"Priority writes must always be leaf nodes"),i=r.value):n=Jg(ee(t,s),r,n)}),!n.getChild(t).isEmpty()&&i!==null&&(n=n.updateChild(ee(t,".priority"),i)),n}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Yo(t,e){return em(e,t)}function hk(t,e,n,i,s){g(i>t.lastWriteId,"Stacking an older write on top of newer ones"),s===void 0&&(s=!0),t.allWrites.push({path:e,snap:n,writeId:i,visible:s}),s&&(t.visibleWrites=bs(t.visibleWrites,e,n)),t.lastWriteId=i}function fk(t,e,n,i){g(i>t.lastWriteId,"Stacking an older merge on top of newer ones"),t.allWrites.push({path:e,children:n,writeId:i,visible:!0}),t.visibleWrites=$c(t.visibleWrites,e,n),t.lastWriteId=i}function pk(t,e){for(let n=0;n<t.allWrites.length;n++){const i=t.allWrites[n];if(i.writeId===e)return i}return null}function gk(t,e){const n=t.allWrites.findIndex(a=>a.writeId===e);g(n>=0,"removeWrite called with nonexistent writeId.");const i=t.allWrites[n];t.allWrites.splice(n,1);let s=i.visible,r=!1,o=t.allWrites.length-1;for(;s&&o>=0;){const a=t.allWrites[o];a.visible&&(o>=n&&mk(a,i.path)?s=!1:Ge(i.path,a.path)&&(r=!0)),o--}if(s){if(r)return _k(t),!0;if(i.snap)t.visibleWrites=jh(t.visibleWrites,i.path);else{const a=i.children;ye(a,c=>{t.visibleWrites=jh(t.visibleWrites,ee(i.path,c))})}return!0}else return!1}function mk(t,e){if(t.snap)return Ge(t.path,e);for(const n in t.children)if(t.children.hasOwnProperty(n)&&Ge(ee(t.path,n),e))return!0;return!1}function _k(t){t.visibleWrites=Xg(t.allWrites,yk,$()),t.allWrites.length>0?t.lastWriteId=t.allWrites[t.allWrites.length-1].writeId:t.lastWriteId=-1}function yk(t){return t.visible}function Xg(t,e,n){let i=ut.empty();for(let s=0;s<t.length;++s){const r=t[s];if(e(r)){const o=r.path;let a;if(r.snap)Ge(n,o)?(a=Re(n,o),i=bs(i,a,r.snap)):Ge(o,n)&&(a=Re(o,n),i=bs(i,$(),r.snap.getChild(a)));else if(r.children){if(Ge(n,o))a=Re(n,o),i=$c(i,a,r.children);else if(Ge(o,n))if(a=Re(o,n),L(a))i=$c(i,$(),r.children);else{const c=Ni(r.children,P(a));if(c){const l=c.getChild(G(a));i=bs(i,$(),l)}}}else throw qi("WriteRecord should have .snap or .children")}}return i}function Qg(t,e,n,i,s){if(!i&&!s){const r=ti(t.visibleWrites,e);if(r!=null)return r;{const o=sn(t.visibleWrites,e);if(Hc(o))return n;if(n==null&&!Bc(o,$()))return null;{const a=n||C.EMPTY_NODE;return Mi(o,a)}}}else{const r=sn(t.visibleWrites,e);if(!s&&Hc(r))return n;if(!s&&n==null&&!Bc(r,$()))return null;{const o=function(l){return(l.visible||s)&&(!i||!~i.indexOf(l.writeId))&&(Ge(l.path,e)||Ge(e,l.path))},a=Xg(t.allWrites,o,e),c=n||C.EMPTY_NODE;return Mi(a,c)}}}function wk(t,e,n){let i=C.EMPTY_NODE;const s=ti(t.visibleWrites,e);if(s)return s.isLeafNode()||s.forEachChild(te,(r,o)=>{i=i.updateImmediateChild(r,o)}),i;if(n){const r=sn(t.visibleWrites,e);return n.forEachChild(te,(o,a)=>{const c=Mi(sn(r,new V(o)),a);i=i.updateImmediateChild(o,c)}),qh(r).forEach(o=>{i=i.updateImmediateChild(o.name,o.node)}),i}else{const r=sn(t.visibleWrites,e);return qh(r).forEach(o=>{i=i.updateImmediateChild(o.name,o.node)}),i}}function vk(t,e,n,i,s){g(i||s,"Either existingEventSnap or existingServerSnap must exist");const r=ee(e,n);if(Bc(t.visibleWrites,r))return null;{const o=sn(t.visibleWrites,r);return Hc(o)?s.getChild(n):Mi(o,s.getChild(n))}}function bk(t,e,n,i){const s=ee(e,n),r=ti(t.visibleWrites,s);if(r!=null)return r;if(i.isCompleteForChild(n)){const o=sn(t.visibleWrites,s);return Mi(o,i.getNode().getImmediateChild(n))}else return null}function Ek(t,e){return ti(t.visibleWrites,e)}function Ck(t,e,n,i,s,r,o){let a;const c=sn(t.visibleWrites,e),l=ti(c,$());if(l!=null)a=l;else if(n!=null)a=Mi(c,n);else return[];if(a=a.withIndex(o),!a.isEmpty()&&!a.isLeafNode()){const u=[],d=o.getCompare(),h=r?a.getReverseIteratorFrom(i,o):a.getIteratorFrom(i,o);let f=h.getNext();for(;f&&u.length<s;)d(f,i)!==0&&u.push(f),f=h.getNext();return u}else return[]}function Tk(){return{visibleWrites:ut.empty(),allWrites:[],lastWriteId:-1}}function so(t,e,n,i){return Qg(t.writeTree,t.treePath,e,n,i)}function Yl(t,e){return wk(t.writeTree,t.treePath,e)}function zh(t,e,n,i){return vk(t.writeTree,t.treePath,e,n,i)}function ro(t,e){return Ek(t.writeTree,ee(t.treePath,e))}function Sk(t,e,n,i,s,r){return Ck(t.writeTree,t.treePath,e,n,i,s,r)}function Jl(t,e,n){return bk(t.writeTree,t.treePath,e,n)}function Zg(t,e){return em(ee(t.treePath,e),t.writeTree)}function em(t,e){return{treePath:t,writeTree:e}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ik{constructor(){this.changeMap=new Map}trackChildChange(e){const n=e.type,i=e.childName;g(n==="child_added"||n==="child_changed"||n==="child_removed","Only child changes supported for tracking"),g(i!==".priority","Only non-priority child changes can be tracked.");const s=this.changeMap.get(i);if(s){const r=s.type;if(n==="child_added"&&r==="child_removed")this.changeMap.set(i,$s(i,e.snapshotNode,s.snapshotNode));else if(n==="child_removed"&&r==="child_added")this.changeMap.delete(i);else if(n==="child_removed"&&r==="child_changed")this.changeMap.set(i,Us(i,s.oldSnap));else if(n==="child_changed"&&r==="child_added")this.changeMap.set(i,Oi(i,e.snapshotNode));else if(n==="child_changed"&&r==="child_changed")this.changeMap.set(i,$s(i,e.snapshotNode,s.oldSnap));else throw qi("Illegal combination of changes: "+e+" occurred after "+s)}else this.changeMap.set(i,e)}getChanges(){return Array.from(this.changeMap.values())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class kk{getCompleteChild(e){return null}getChildAfterChild(e,n,i){return null}}const tm=new kk;class Xl{constructor(e,n,i=null){this.writes_=e,this.viewCache_=n,this.optCompleteServerCache_=i}getCompleteChild(e){const n=this.viewCache_.eventCache;if(n.isCompleteForChild(e))return n.getNode().getImmediateChild(e);{const i=this.optCompleteServerCache_!=null?new hn(this.optCompleteServerCache_,!0,!1):this.viewCache_.serverCache;return Jl(this.writes_,e,i)}}getChildAfterChild(e,n,i){const s=this.optCompleteServerCache_!=null?this.optCompleteServerCache_:qn(this.viewCache_),r=Sk(this.writes_,s,n,1,i,e);return r.length===0?null:r[0]}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Rk(t){return{filter:t}}function Ak(t,e){g(e.eventCache.getNode().isIndexed(t.filter.getIndex()),"Event snap not indexed"),g(e.serverCache.getNode().isIndexed(t.filter.getIndex()),"Server snap not indexed")}function Nk(t,e,n,i,s){const r=new Ik;let o,a;if(n.type===ot.OVERWRITE){const l=n;l.source.fromUser?o=Vc(t,e,l.path,l.snap,i,s,r):(g(l.source.fromServer,"Unknown source."),a=l.source.tagged||e.serverCache.isFiltered()&&!L(l.path),o=oo(t,e,l.path,l.snap,i,s,a,r))}else if(n.type===ot.MERGE){const l=n;l.source.fromUser?o=Lk(t,e,l.path,l.children,i,s,r):(g(l.source.fromServer,"Unknown source."),a=l.source.tagged||e.serverCache.isFiltered(),o=Wc(t,e,l.path,l.children,i,s,a,r))}else if(n.type===ot.ACK_USER_WRITE){const l=n;l.revert?o=Mk(t,e,l.path,i,s,r):o=Ok(t,e,l.path,l.affectedTree,i,s,r)}else if(n.type===ot.LISTEN_COMPLETE)o=Dk(t,e,n.path,i,r);else throw qi("Unknown operation type: "+n.type);const c=r.getChanges();return Pk(e,o,c),{viewCache:o,changes:c}}function Pk(t,e,n){const i=e.eventCache;if(i.isFullyInitialized()){const s=i.getNode().isLeafNode()||i.getNode().isEmpty(),r=io(t);(n.length>0||!t.eventCache.isFullyInitialized()||s&&!i.getNode().equals(r)||!i.getNode().getPriority().equals(r.getPriority()))&&n.push(Kg(io(e)))}}function nm(t,e,n,i,s,r){const o=e.eventCache;if(ro(i,n)!=null)return e;{let a,c;if(L(n))if(g(e.serverCache.isFullyInitialized(),"If change path is empty, we must have complete server data"),e.serverCache.isFiltered()){const l=qn(e),u=l instanceof C?l:C.EMPTY_NODE,d=Yl(i,u);a=t.filter.updateFullNode(e.eventCache.getNode(),d,r)}else{const l=so(i,qn(e));a=t.filter.updateFullNode(e.eventCache.getNode(),l,r)}else{const l=P(n);if(l===".priority"){g(dn(n)===1,"Can't have a priority with additional path components");const u=o.getNode();c=e.serverCache.getNode();const d=zh(i,n,u,c);d!=null?a=t.filter.updatePriority(u,d):a=o.getNode()}else{const u=G(n);let d;if(o.isCompleteForChild(l)){c=e.serverCache.getNode();const h=zh(i,n,o.getNode(),c);h!=null?d=o.getNode().getImmediateChild(l).updateChild(u,h):d=o.getNode().getImmediateChild(l)}else d=Jl(i,l,e.serverCache);d!=null?a=t.filter.updateChild(o.getNode(),l,d,u,s,r):a=o.getNode()}}return vs(e,a,o.isFullyInitialized()||L(n),t.filter.filtersNodes())}}function oo(t,e,n,i,s,r,o,a){const c=e.serverCache;let l;const u=o?t.filter:t.filter.getIndexedFilter();if(L(n))l=u.updateFullNode(c.getNode(),i,null);else if(u.filtersNodes()&&!c.isFiltered()){const f=c.getNode().updateChild(n,i);l=u.updateFullNode(c.getNode(),f,null)}else{const f=P(n);if(!c.isCompleteForPath(n)&&dn(n)>1)return e;const p=G(n),m=c.getNode().getImmediateChild(f).updateChild(p,i);f===".priority"?l=u.updatePriority(c.getNode(),m):l=u.updateChild(c.getNode(),f,m,p,tm,null)}const d=Yg(e,l,c.isFullyInitialized()||L(n),u.filtersNodes()),h=new Xl(s,d,r);return nm(t,d,n,s,h,a)}function Vc(t,e,n,i,s,r,o){const a=e.eventCache;let c,l;const u=new Xl(s,e,r);if(L(n))l=t.filter.updateFullNode(e.eventCache.getNode(),i,o),c=vs(e,l,!0,t.filter.filtersNodes());else{const d=P(n);if(d===".priority")l=t.filter.updatePriority(e.eventCache.getNode(),i),c=vs(e,l,a.isFullyInitialized(),a.isFiltered());else{const h=G(n),f=a.getNode().getImmediateChild(d);let p;if(L(h))p=i;else{const _=u.getCompleteChild(d);_!=null?Bl(h)===".priority"&&_.getChild(Hg(h)).isEmpty()?p=_:p=_.updateChild(h,i):p=C.EMPTY_NODE}if(f.equals(p))c=e;else{const _=t.filter.updateChild(a.getNode(),d,p,h,u,o);c=vs(e,_,a.isFullyInitialized(),t.filter.filtersNodes())}}}return c}function Gh(t,e){return t.eventCache.isCompleteForChild(e)}function Lk(t,e,n,i,s,r,o){let a=e;return i.foreach((c,l)=>{const u=ee(n,c);Gh(e,P(u))&&(a=Vc(t,a,u,l,s,r,o))}),i.foreach((c,l)=>{const u=ee(n,c);Gh(e,P(u))||(a=Vc(t,a,u,l,s,r,o))}),a}function Kh(t,e,n){return n.foreach((i,s)=>{e=e.updateChild(i,s)}),e}function Wc(t,e,n,i,s,r,o,a){if(e.serverCache.getNode().isEmpty()&&!e.serverCache.isFullyInitialized())return e;let c=e,l;L(n)?l=i:l=new K(null).setTree(n,i);const u=e.serverCache.getNode();return l.children.inorderTraversal((d,h)=>{if(u.hasChild(d)){const f=e.serverCache.getNode().getImmediateChild(d),p=Kh(t,f,h);c=oo(t,c,new V(d),p,s,r,o,a)}}),l.children.inorderTraversal((d,h)=>{const f=!e.serverCache.isCompleteForChild(d)&&h.value===null;if(!u.hasChild(d)&&!f){const p=e.serverCache.getNode().getImmediateChild(d),_=Kh(t,p,h);c=oo(t,c,new V(d),_,s,r,o,a)}}),c}function Ok(t,e,n,i,s,r,o){if(ro(s,n)!=null)return e;const a=e.serverCache.isFiltered(),c=e.serverCache;if(i.value!=null){if(L(n)&&c.isFullyInitialized()||c.isCompleteForPath(n))return oo(t,e,n,c.getNode().getChild(n),s,r,a,o);if(L(n)){let l=new K(null);return c.getNode().forEachChild(di,(u,d)=>{l=l.set(new V(u),d)}),Wc(t,e,n,l,s,r,a,o)}else return e}else{let l=new K(null);return i.foreach((u,d)=>{const h=ee(n,u);c.isCompleteForPath(h)&&(l=l.set(u,c.getNode().getChild(h)))}),Wc(t,e,n,l,s,r,a,o)}}function Dk(t,e,n,i,s){const r=e.serverCache,o=Yg(e,r.getNode(),r.isFullyInitialized()||L(n),r.isFiltered());return nm(t,o,n,i,tm,s)}function Mk(t,e,n,i,s,r){let o;if(ro(i,n)!=null)return e;{const a=new Xl(i,e,s),c=e.eventCache.getNode();let l;if(L(n)||P(n)===".priority"){let u;if(e.serverCache.isFullyInitialized())u=so(i,qn(e));else{const d=e.serverCache.getNode();g(d instanceof C,"serverChildren would be complete if leaf node"),u=Yl(i,d)}u=u,l=t.filter.updateFullNode(c,u,r)}else{const u=P(n);let d=Jl(i,u,e.serverCache);d==null&&e.serverCache.isCompleteForChild(u)&&(d=c.getImmediateChild(u)),d!=null?l=t.filter.updateChild(c,u,d,G(n),a,r):e.eventCache.getNode().hasChild(u)?l=t.filter.updateChild(c,u,C.EMPTY_NODE,G(n),a,r):l=c,l.isEmpty()&&e.serverCache.isFullyInitialized()&&(o=so(i,qn(e)),o.isLeafNode()&&(l=t.filter.updateFullNode(l,o,r)))}return o=e.serverCache.isFullyInitialized()||ro(i,$())!=null,vs(e,l,o,t.filter.filtersNodes())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class xk{constructor(e,n){this.query_=e,this.eventRegistrations_=[];const i=this.query_._queryParams,s=new jl(i.getIndex()),r=ek(i);this.processor_=Rk(r);const o=n.serverCache,a=n.eventCache,c=s.updateFullNode(C.EMPTY_NODE,o.getNode(),null),l=r.updateFullNode(C.EMPTY_NODE,a.getNode(),null),u=new hn(c,o.isFullyInitialized(),s.filtersNodes()),d=new hn(l,a.isFullyInitialized(),r.filtersNodes());this.viewCache_=Ko(d,u),this.eventGenerator_=new ak(this.query_)}get query(){return this.query_}}function Fk(t){return t.viewCache_.serverCache.getNode()}function Uk(t){return io(t.viewCache_)}function $k(t,e){const n=qn(t.viewCache_);return n&&(t.query._queryParams.loadsAllData()||!L(e)&&!n.getImmediateChild(P(e)).isEmpty())?n.getChild(e):null}function Yh(t){return t.eventRegistrations_.length===0}function Bk(t,e){t.eventRegistrations_.push(e)}function Jh(t,e,n){const i=[];if(n){g(e==null,"A cancel should cancel all event registrations.");const s=t.query._path;t.eventRegistrations_.forEach(r=>{const o=r.createCancelEvent(n,s);o&&i.push(o)})}if(e){let s=[];for(let r=0;r<t.eventRegistrations_.length;++r){const o=t.eventRegistrations_[r];if(!o.matches(e))s.push(o);else if(e.hasAnyCallback()){s=s.concat(t.eventRegistrations_.slice(r+1));break}}t.eventRegistrations_=s}else t.eventRegistrations_=[];return i}function Xh(t,e,n,i){e.type===ot.MERGE&&e.source.queryId!==null&&(g(qn(t.viewCache_),"We should always have a full cache before handling merges"),g(io(t.viewCache_),"Missing event cache, even though we have a server cache"));const s=t.viewCache_,r=Nk(t.processor_,s,e,n,i);return Ak(t.processor_,r.viewCache),g(r.viewCache.serverCache.isFullyInitialized()||!s.serverCache.isFullyInitialized(),"Once a server snap is complete, it should never go back"),t.viewCache_=r.viewCache,im(t,r.changes,r.viewCache.eventCache.getNode(),null)}function Hk(t,e){const n=t.viewCache_.eventCache,i=[];return n.getNode().isLeafNode()||n.getNode().forEachChild(te,(r,o)=>{i.push(Oi(r,o))}),n.isFullyInitialized()&&i.push(Kg(n.getNode())),im(t,i,n.getNode(),e)}function im(t,e,n,i){const s=i?[i]:t.eventRegistrations_;return ck(t.eventGenerator_,e,n,s)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let ao;class sm{constructor(){this.views=new Map}}function Vk(t){g(!ao,"__referenceConstructor has already been defined"),ao=t}function Wk(){return g(ao,"Reference.ts has not been loaded"),ao}function jk(t){return t.views.size===0}function Ql(t,e,n,i){const s=e.source.queryId;if(s!==null){const r=t.views.get(s);return g(r!=null,"SyncTree gave us an op for an invalid query."),Xh(r,e,n,i)}else{let r=[];for(const o of t.views.values())r=r.concat(Xh(o,e,n,i));return r}}function rm(t,e,n,i,s){const r=e._queryIdentifier,o=t.views.get(r);if(!o){let a=so(n,s?i:null),c=!1;a?c=!0:i instanceof C?(a=Yl(n,i),c=!1):(a=C.EMPTY_NODE,c=!1);const l=Ko(new hn(a,c,!1),new hn(i,s,!1));return new xk(e,l)}return o}function qk(t,e,n,i,s,r){const o=rm(t,e,i,s,r);return t.views.has(e._queryIdentifier)||t.views.set(e._queryIdentifier,o),Bk(o,n),Hk(o,n)}function zk(t,e,n,i){const s=e._queryIdentifier,r=[];let o=[];const a=fn(t);if(s==="default")for(const[c,l]of t.views.entries())o=o.concat(Jh(l,n,i)),Yh(l)&&(t.views.delete(c),l.query._queryParams.loadsAllData()||r.push(l.query));else{const c=t.views.get(s);c&&(o=o.concat(Jh(c,n,i)),Yh(c)&&(t.views.delete(s),c.query._queryParams.loadsAllData()||r.push(c.query)))}return a&&!fn(t)&&r.push(new(Wk())(e._repo,e._path)),{removed:r,events:o}}function om(t){const e=[];for(const n of t.views.values())n.query._queryParams.loadsAllData()||e.push(n);return e}function rn(t,e){let n=null;for(const i of t.views.values())n=n||$k(i,e);return n}function am(t,e){if(e._queryParams.loadsAllData())return Jo(t);{const i=e._queryIdentifier;return t.views.get(i)}}function cm(t,e){return am(t,e)!=null}function fn(t){return Jo(t)!=null}function Jo(t){for(const e of t.views.values())if(e.query._queryParams.loadsAllData())return e;return null}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let co;function Gk(t){g(!co,"__referenceConstructor has already been defined"),co=t}function Kk(){return g(co,"Reference.ts has not been loaded"),co}let Yk=1;class Qh{constructor(e){this.listenProvider_=e,this.syncPointTree_=new K(null),this.pendingWriteTree_=Tk(),this.tagToQueryMap=new Map,this.queryToTagMap=new Map}}function lm(t,e,n,i,s){return hk(t.pendingWriteTree_,e,n,i,s),s?Xi(t,new jn(zl(),e,n)):[]}function Jk(t,e,n,i){fk(t.pendingWriteTree_,e,n,i);const s=K.fromObject(n);return Xi(t,new Di(zl(),e,s))}function Qt(t,e,n=!1){const i=pk(t.pendingWriteTree_,e);if(gk(t.pendingWriteTree_,e)){let r=new K(null);return i.snap!=null?r=r.set($(),!0):ye(i.children,o=>{r=r.set(new V(o),!0)}),Xi(t,new no(i.path,r,n))}else return[]}function or(t,e,n){return Xi(t,new jn(Gl(),e,n))}function Xk(t,e,n){const i=K.fromObject(n);return Xi(t,new Di(Gl(),e,i))}function Qk(t,e){return Xi(t,new Hs(Gl(),e))}function Zk(t,e,n){const i=eu(t,n);if(i){const s=tu(i),r=s.path,o=s.queryId,a=Re(r,e),c=new Hs(Kl(o),a);return nu(t,r,c)}else return[]}function lo(t,e,n,i,s=!1){const r=e._path,o=t.syncPointTree_.get(r);let a=[];if(o&&(e._queryIdentifier==="default"||cm(o,e))){const c=zk(o,e,n,i);jk(o)&&(t.syncPointTree_=t.syncPointTree_.remove(r));const l=c.removed;if(a=c.events,!s){const u=l.findIndex(h=>h._queryParams.loadsAllData())!==-1,d=t.syncPointTree_.findOnPath(r,(h,f)=>fn(f));if(u&&!d){const h=t.syncPointTree_.subtree(r);if(!h.isEmpty()){const f=nR(h);for(let p=0;p<f.length;++p){const _=f[p],m=_.query,A=fm(t,_);t.listenProvider_.startListening(Es(m),Vs(t,m),A.hashFn,A.onComplete)}}}!d&&l.length>0&&!i&&(u?t.listenProvider_.stopListening(Es(e),null):l.forEach(h=>{const f=t.queryToTagMap.get(Xo(h));t.listenProvider_.stopListening(Es(h),f)}))}iR(t,l)}return a}function um(t,e,n,i){const s=eu(t,i);if(s!=null){const r=tu(s),o=r.path,a=r.queryId,c=Re(o,e),l=new jn(Kl(a),c,n);return nu(t,o,l)}else return[]}function eR(t,e,n,i){const s=eu(t,i);if(s){const r=tu(s),o=r.path,a=r.queryId,c=Re(o,e),l=K.fromObject(n),u=new Di(Kl(a),c,l);return nu(t,o,u)}else return[]}function jc(t,e,n,i=!1){const s=e._path;let r=null,o=!1;t.syncPointTree_.foreachOnPath(s,(h,f)=>{const p=Re(h,s);r=r||rn(f,p),o=o||fn(f)});let a=t.syncPointTree_.get(s);a?(o=o||fn(a),r=r||rn(a,$())):(a=new sm,t.syncPointTree_=t.syncPointTree_.set(s,a));let c;r!=null?c=!0:(c=!1,r=C.EMPTY_NODE,t.syncPointTree_.subtree(s).foreachChild((f,p)=>{const _=rn(p,$());_&&(r=r.updateImmediateChild(f,_))}));const l=cm(a,e);if(!l&&!e._queryParams.loadsAllData()){const h=Xo(e);g(!t.queryToTagMap.has(h),"View does not exist, but we have a tag");const f=sR();t.queryToTagMap.set(h,f),t.tagToQueryMap.set(f,h)}const u=Yo(t.pendingWriteTree_,s);let d=qk(a,e,n,u,r,c);if(!l&&!o&&!i){const h=am(a,e);d=d.concat(rR(t,e,h))}return d}function Zl(t,e,n){const s=t.pendingWriteTree_,r=t.syncPointTree_.findOnPath(e,(o,a)=>{const c=Re(o,e),l=rn(a,c);if(l)return l});return Qg(s,e,r,n,!0)}function tR(t,e){const n=e._path;let i=null;t.syncPointTree_.foreachOnPath(n,(l,u)=>{const d=Re(l,n);i=i||rn(u,d)});let s=t.syncPointTree_.get(n);s?i=i||rn(s,$()):(s=new sm,t.syncPointTree_=t.syncPointTree_.set(n,s));const r=i!=null,o=r?new hn(i,!0,!1):null,a=Yo(t.pendingWriteTree_,e._path),c=rm(s,e,a,r?o.getNode():C.EMPTY_NODE,r);return Uk(c)}function Xi(t,e){return dm(e,t.syncPointTree_,null,Yo(t.pendingWriteTree_,$()))}function dm(t,e,n,i){if(L(t.path))return hm(t,e,n,i);{const s=e.get($());n==null&&s!=null&&(n=rn(s,$()));let r=[];const o=P(t.path),a=t.operationForChild(o),c=e.children.get(o);if(c&&a){const l=n?n.getImmediateChild(o):null,u=Zg(i,o);r=r.concat(dm(a,c,l,u))}return s&&(r=r.concat(Ql(s,t,i,n))),r}}function hm(t,e,n,i){const s=e.get($());n==null&&s!=null&&(n=rn(s,$()));let r=[];return e.children.inorderTraversal((o,a)=>{const c=n?n.getImmediateChild(o):null,l=Zg(i,o),u=t.operationForChild(o);u&&(r=r.concat(hm(u,a,c,l)))}),s&&(r=r.concat(Ql(s,t,i,n))),r}function fm(t,e){const n=e.query,i=Vs(t,n);return{hashFn:()=>(Fk(e)||C.EMPTY_NODE).hash(),onComplete:s=>{if(s==="ok")return i?Zk(t,n._path,i):Qk(t,n._path);{const r=QS(s,n);return lo(t,n,null,r)}}}}function Vs(t,e){const n=Xo(e);return t.queryToTagMap.get(n)}function Xo(t){return t._path.toString()+"$"+t._queryIdentifier}function eu(t,e){return t.tagToQueryMap.get(e)}function tu(t){const e=t.indexOf("$");return g(e!==-1&&e<t.length-1,"Bad queryKey."),{queryId:t.substr(e+1),path:new V(t.substr(0,e))}}function nu(t,e,n){const i=t.syncPointTree_.get(e);g(i,"Missing sync point for query tag that we're tracking");const s=Yo(t.pendingWriteTree_,e);return Ql(i,n,s,null)}function nR(t){return t.fold((e,n,i)=>{if(n&&fn(n))return[Jo(n)];{let s=[];return n&&(s=om(n)),ye(i,(r,o)=>{s=s.concat(o)}),s}})}function Es(t){return t._queryParams.loadsAllData()&&!t._queryParams.isDefault()?new(Kk())(t._repo,t._path):t}function iR(t,e){for(let n=0;n<e.length;++n){const i=e[n];if(!i._queryParams.loadsAllData()){const s=Xo(i),r=t.queryToTagMap.get(s);t.queryToTagMap.delete(s),t.tagToQueryMap.delete(r)}}}function sR(){return Yk++}function rR(t,e,n){const i=e._path,s=Vs(t,e),r=fm(t,n),o=t.listenProvider_.startListening(Es(e),s,r.hashFn,r.onComplete),a=t.syncPointTree_.subtree(i);if(s)g(!fn(a.value),"If we're adding a query, it shouldn't be shadowed");else{const c=a.fold((l,u,d)=>{if(!L(l)&&u&&fn(u))return[Jo(u).query];{let h=[];return u&&(h=h.concat(om(u).map(f=>f.query))),ye(d,(f,p)=>{h=h.concat(p)}),h}});for(let l=0;l<c.length;++l){const u=c[l];t.listenProvider_.stopListening(Es(u),Vs(t,u))}}return o}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class iu{constructor(e){this.node_=e}getImmediateChild(e){const n=this.node_.getImmediateChild(e);return new iu(n)}node(){return this.node_}}class su{constructor(e,n){this.syncTree_=e,this.path_=n}getImmediateChild(e){const n=ee(this.path_,e);return new su(this.syncTree_,n)}node(){return Zl(this.syncTree_,this.path_)}}const oR=function(t){return t=t||{},t.timestamp=t.timestamp||new Date().getTime(),t},Zh=function(t,e,n){if(!t||typeof t!="object")return t;if(g(".sv"in t,"Unexpected leaf node or priority contents"),typeof t[".sv"]=="string")return aR(t[".sv"],e,n);if(typeof t[".sv"]=="object")return cR(t[".sv"],e);g(!1,"Unexpected server value: "+JSON.stringify(t,null,2))},aR=function(t,e,n){switch(t){case"timestamp":return n.timestamp;default:g(!1,"Unexpected server value: "+t)}},cR=function(t,e,n){t.hasOwnProperty("increment")||g(!1,"Unexpected server value: "+JSON.stringify(t,null,2));const i=t.increment;typeof i!="number"&&g(!1,"Unexpected increment value: "+i);const s=e.node();if(g(s!==null&&typeof s<"u","Expected ChildrenNode.EMPTY_NODE for nulls"),!s.isLeafNode())return i;const o=s.getValue();return typeof o!="number"?i:o+i},pm=function(t,e,n,i){return ru(e,new su(n,t),i)},gm=function(t,e,n){return ru(t,new iu(e),n)};function ru(t,e,n){const i=t.getPriority().val(),s=Zh(i,e.getImmediateChild(".priority"),n);let r;if(t.isLeafNode()){const o=t,a=Zh(o.getValue(),e,n);return a!==o.getValue()||s!==o.getPriority().val()?new he(a,ie(s)):t}else{const o=t;return r=o,s!==o.getPriority().val()&&(r=r.updatePriority(new he(s))),o.forEachChild(te,(a,c)=>{const l=ru(c,e.getImmediateChild(a),n);l!==c&&(r=r.updateImmediateChild(a,l))}),r}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ou{constructor(e="",n=null,i={children:{},childCount:0}){this.name=e,this.parent=n,this.node=i}}function au(t,e){let n=e instanceof V?e:new V(e),i=t,s=P(n);for(;s!==null;){const r=Ni(i.node.children,s)||{children:{},childCount:0};i=new ou(s,i,r),n=G(n),s=P(n)}return i}function Qi(t){return t.node.value}function mm(t,e){t.node.value=e,qc(t)}function _m(t){return t.node.childCount>0}function lR(t){return Qi(t)===void 0&&!_m(t)}function Qo(t,e){ye(t.node.children,(n,i)=>{e(new ou(n,t,i))})}function ym(t,e,n,i){n&&e(t),Qo(t,s=>{ym(s,e,!0)})}function uR(t,e,n){let i=t.parent;for(;i!==null;){if(e(i))return!0;i=i.parent}return!1}function ar(t){return new V(t.parent===null?t.name:ar(t.parent)+"/"+t.name)}function qc(t){t.parent!==null&&dR(t.parent,t.name,t)}function dR(t,e,n){const i=lR(n),s=Et(t.node.children,e);i&&s?(delete t.node.children[e],t.node.childCount--,qc(t)):!i&&!s&&(t.node.children[e]=n.node,t.node.childCount++,qc(t))}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const hR=/[\[\].#$\/\u0000-\u001F\u007F]/,fR=/[\[\].#$\u0000-\u001F\u007F]/,qa=10*1024*1024,cu=function(t){return typeof t=="string"&&t.length!==0&&!hR.test(t)},wm=function(t){return typeof t=="string"&&t.length!==0&&!fR.test(t)},pR=function(t){return t&&(t=t.replace(/^\/*\.info(\/|$)/,"/")),wm(t)},vm=function(t){return t===null||typeof t=="string"||typeof t=="number"&&!zo(t)||t&&typeof t=="object"&&Et(t,".sv")},uo=function(t,e,n,i){i&&e===void 0||Zo(Pi(t,"value"),e,n)},Zo=function(t,e,n){const i=n instanceof V?new LI(n,t):n;if(e===void 0)throw new Error(t+"contains undefined "+Nn(i));if(typeof e=="function")throw new Error(t+"contains a function "+Nn(i)+" with contents = "+e.toString());if(zo(e))throw new Error(t+"contains "+e.toString()+" "+Nn(i));if(typeof e=="string"&&e.length>qa/3&&Vo(e)>qa)throw new Error(t+"contains a string greater than "+qa+" utf8 bytes "+Nn(i)+" ('"+e.substring(0,50)+"...')");if(e&&typeof e=="object"){let s=!1,r=!1;if(ye(e,(o,a)=>{if(o===".value")s=!0;else if(o!==".priority"&&o!==".sv"&&(r=!0,!cu(o)))throw new Error(t+" contains an invalid key ("+o+") "+Nn(i)+`.  Keys must be non-empty strings and can't contain ".", "#", "$", "/", "[", or "]"`);OI(i,o),Zo(t,a,i),DI(i)}),s&&r)throw new Error(t+' contains ".value" child '+Nn(i)+" in addition to actual children.")}},gR=function(t,e){let n,i;for(n=0;n<e.length;n++){i=e[n];const r=Fs(i);for(let o=0;o<r.length;o++)if(!(r[o]===".priority"&&o===r.length-1)){if(!cu(r[o]))throw new Error(t+"contains an invalid key ("+r[o]+") in path "+i.toString()+`. Keys must be non-empty strings and can't contain ".", "#", "$", "/", "[", or "]"`)}}e.sort(PI);let s=null;for(n=0;n<e.length;n++){if(i=e[n],s!==null&&Ge(s,i))throw new Error(t+"contains a path "+s.toString()+" that is ancestor of another path "+i.toString());s=i}},bm=function(t,e,n,i){const s=Pi(t,"values");if(!(e&&typeof e=="object")||Array.isArray(e))throw new Error(s+" must be an object containing the children to replace.");const r=[];ye(e,(o,a)=>{const c=new V(o);if(Zo(s,a,ee(n,c)),Bl(c)===".priority"&&!vm(a))throw new Error(s+"contains an invalid value for '"+c.toString()+"', which must be a valid Firebase priority (a string, finite number, server value, or null).");r.push(c)}),gR(s,r)},mR=function(t,e,n){if(zo(e))throw new Error(Pi(t,"priority")+"is "+e.toString()+", but must be a valid Firebase priority (a string, finite number, server value, or null).");if(!vm(e))throw new Error(Pi(t,"priority")+"must be a valid Firebase priority (a string, finite number, server value, or null).")},Em=function(t,e,n,i){if(!wm(n))throw new Error(Pi(t,e)+'was an invalid path = "'+n+`". Paths must be non-empty strings and can't contain ".", "#", "$", "[", or "]"`)},_R=function(t,e,n,i){n&&(n=n.replace(/^\/*\.info(\/|$)/,"/")),Em(t,e,n)},Dn=function(t,e){if(P(e)===".info")throw new Error(t+" failed = Can't modify data under /.info/")},yR=function(t,e){const n=e.path.toString();if(typeof e.repoInfo.host!="string"||e.repoInfo.host.length===0||!cu(e.repoInfo.namespace)&&e.repoInfo.host.split(":")[0]!=="localhost"||n.length!==0&&!pR(n))throw new Error(Pi(t,"url")+`must be a valid firebase URL and the path can't contain ".", "#", "$", "[", or "]".`)};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class wR{constructor(){this.eventLists_=[],this.recursionDepth_=0}}function ea(t,e){let n=null;for(let i=0;i<e.length;i++){const s=e[i],r=s.getPath();n!==null&&!Hl(r,n.path)&&(t.eventLists_.push(n),n=null),n===null&&(n={events:[],path:r}),n.events.push(s)}n&&t.eventLists_.push(n)}function Cm(t,e,n){ea(t,n),Tm(t,i=>Hl(i,e))}function Qe(t,e,n){ea(t,n),Tm(t,i=>Ge(i,e)||Ge(e,i))}function Tm(t,e){t.recursionDepth_++;let n=!0;for(let i=0;i<t.eventLists_.length;i++){const s=t.eventLists_[i];if(s){const r=s.path;e(r)?(vR(t.eventLists_[i]),t.eventLists_[i]=null):n=!1}}n&&(t.eventLists_=[]),t.recursionDepth_--}function vR(t){for(let e=0;e<t.events.length;e++){const n=t.events[e];if(n!==null){t.events[e]=null;const i=n.getEventRunner();ys&&pe("event: "+n.toString()),Yi(i)}}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const bR="repo_interrupt",ER=25;class CR{constructor(e,n,i,s){this.repoInfo_=e,this.forceRestClient_=n,this.authTokenProvider_=i,this.appCheckProvider_=s,this.dataUpdateCount=0,this.statsListener_=null,this.eventQueue_=new wR,this.nextWriteId_=1,this.interceptServerDataCallback_=null,this.onDisconnect_=to(),this.transactionQueueTree_=new ou,this.persistentConnection_=null,this.key=this.repoInfo_.toURLString()}toString(){return(this.repoInfo_.secure?"https://":"http://")+this.repoInfo_.host}}function TR(t,e,n){if(t.stats_=Ul(t.repoInfo_),t.forceRestClient_||nI())t.server_=new eo(t.repoInfo_,(i,s,r,o)=>{ef(t,i,s,r,o)},t.authTokenProvider_,t.appCheckProvider_),setTimeout(()=>tf(t,!0),0);else{if(typeof n<"u"&&n!==null){if(typeof n!="object")throw new Error("Only objects are supported for option databaseAuthVariableOverride");try{le(n)}catch(i){throw new Error("Invalid authOverride provided: "+i)}}t.persistentConnection_=new xt(t.repoInfo_,e,(i,s,r,o)=>{ef(t,i,s,r,o)},i=>{tf(t,i)},i=>{SR(t,i)},t.authTokenProvider_,t.appCheckProvider_,n),t.server_=t.persistentConnection_}t.authTokenProvider_.addTokenChangeListener(i=>{t.server_.refreshAuthToken(i)}),t.appCheckProvider_.addTokenChangeListener(i=>{t.server_.refreshAppCheckToken(i.token)}),t.statsReporter_=aI(t.repoInfo_,()=>new ok(t.stats_,t.server_)),t.infoData_=new tk,t.infoSyncTree_=new Qh({startListening:(i,s,r,o)=>{let a=[];const c=t.infoData_.getNode(i._path);return c.isEmpty()||(a=or(t.infoSyncTree_,i._path,c),setTimeout(()=>{o("ok")},0)),a},stopListening:()=>{}}),lu(t,"connected",!1),t.serverSyncTree_=new Qh({startListening:(i,s,r,o)=>(t.server_.listen(i,r,s,(a,c)=>{const l=o(a,c);Qe(t.eventQueue_,i._path,l)}),[]),stopListening:(i,s)=>{t.server_.unlisten(i,s)}})}function Sm(t){const n=t.infoData_.getNode(new V(".info/serverTimeOffset")).val()||0;return new Date().getTime()+n}function ta(t){return oR({timestamp:Sm(t)})}function ef(t,e,n,i,s){t.dataUpdateCount++;const r=new V(e);n=t.interceptServerDataCallback_?t.interceptServerDataCallback_(e,n):n;let o=[];if(s)if(i){const c=Yr(n,l=>ie(l));o=eR(t.serverSyncTree_,r,c,s)}else{const c=ie(n);o=um(t.serverSyncTree_,r,c,s)}else if(i){const c=Yr(n,l=>ie(l));o=Xk(t.serverSyncTree_,r,c)}else{const c=ie(n);o=or(t.serverSyncTree_,r,c)}let a=r;o.length>0&&(a=xi(t,r)),Qe(t.eventQueue_,a,o)}function tf(t,e){lu(t,"connected",e),e===!1&&AR(t)}function SR(t,e){ye(e,(n,i)=>{lu(t,n,i)})}function lu(t,e,n){const i=new V("/.info/"+e),s=ie(n);t.infoData_.updateSnapshot(i,s);const r=or(t.infoSyncTree_,i,s);Qe(t.eventQueue_,i,r)}function uu(t){return t.nextWriteId_++}function IR(t,e,n){const i=tR(t.serverSyncTree_,e);return i!=null?Promise.resolve(i):t.server_.get(e).then(s=>{const r=ie(s).withIndex(e._queryParams.getIndex());jc(t.serverSyncTree_,e,n,!0);let o;if(e._queryParams.loadsAllData())o=or(t.serverSyncTree_,e._path,r);else{const a=Vs(t.serverSyncTree_,e);o=um(t.serverSyncTree_,e._path,r,a)}return Qe(t.eventQueue_,e._path,o),lo(t.serverSyncTree_,e,n,null,!0),r},s=>(cr(t,"get for query "+le(e)+" failed: "+s),Promise.reject(new Error(s))))}function kR(t,e,n,i,s){cr(t,"set",{path:e.toString(),value:n,priority:i});const r=ta(t),o=ie(n,i),a=Zl(t.serverSyncTree_,e),c=gm(o,a,r),l=uu(t),u=lm(t.serverSyncTree_,e,c,l,!0);ea(t.eventQueue_,u),t.server_.put(e.toString(),o.val(!0),(h,f)=>{const p=h==="ok";p||Ne("set at "+e+" failed: "+h);const _=Qt(t.serverSyncTree_,l,!p);Qe(t.eventQueue_,e,_),pn(t,s,h,f)});const d=hu(t,e);xi(t,d),Qe(t.eventQueue_,d,[])}function RR(t,e,n,i){cr(t,"update",{path:e.toString(),value:n});let s=!0;const r=ta(t),o={};if(ye(n,(a,c)=>{s=!1,o[a]=pm(ee(e,a),ie(c),t.serverSyncTree_,r)}),s)pe("update() called with empty data.  Don't do anything."),pn(t,i,"ok",void 0);else{const a=uu(t),c=Jk(t.serverSyncTree_,e,o,a);ea(t.eventQueue_,c),t.server_.merge(e.toString(),n,(l,u)=>{const d=l==="ok";d||Ne("update at "+e+" failed: "+l);const h=Qt(t.serverSyncTree_,a,!d),f=h.length>0?xi(t,e):e;Qe(t.eventQueue_,f,h),pn(t,i,l,u)}),ye(n,l=>{const u=hu(t,ee(e,l));xi(t,u)}),Qe(t.eventQueue_,e,[])}}function AR(t){cr(t,"onDisconnectEvents");const e=ta(t),n=to();Uc(t.onDisconnect_,$(),(s,r)=>{const o=pm(s,r,t.serverSyncTree_,e);Ji(n,s,o)});let i=[];Uc(n,$(),(s,r)=>{i=i.concat(or(t.serverSyncTree_,s,r));const o=hu(t,s);xi(t,o)}),t.onDisconnect_=to(),Qe(t.eventQueue_,$(),i)}function NR(t,e,n){t.server_.onDisconnectCancel(e.toString(),(i,s)=>{i==="ok"&&Fc(t.onDisconnect_,e),pn(t,n,i,s)})}function nf(t,e,n,i){const s=ie(n);t.server_.onDisconnectPut(e.toString(),s.val(!0),(r,o)=>{r==="ok"&&Ji(t.onDisconnect_,e,s),pn(t,i,r,o)})}function PR(t,e,n,i,s){const r=ie(n,i);t.server_.onDisconnectPut(e.toString(),r.val(!0),(o,a)=>{o==="ok"&&Ji(t.onDisconnect_,e,r),pn(t,s,o,a)})}function LR(t,e,n,i){if(Kr(n)){pe("onDisconnect().update() called with empty data.  Don't do anything."),pn(t,i,"ok",void 0);return}t.server_.onDisconnectMerge(e.toString(),n,(s,r)=>{s==="ok"&&ye(n,(o,a)=>{const c=ie(a);Ji(t.onDisconnect_,ee(e,o),c)}),pn(t,i,s,r)})}function OR(t,e,n){let i;P(e._path)===".info"?i=jc(t.infoSyncTree_,e,n):i=jc(t.serverSyncTree_,e,n),Cm(t.eventQueue_,e._path,i)}function Im(t,e,n){let i;P(e._path)===".info"?i=lo(t.infoSyncTree_,e,n):i=lo(t.serverSyncTree_,e,n),Cm(t.eventQueue_,e._path,i)}function DR(t){t.persistentConnection_&&t.persistentConnection_.interrupt(bR)}function cr(t,...e){let n="";t.persistentConnection_&&(n=t.persistentConnection_.id+":"),pe(n,...e)}function pn(t,e,n,i){e&&Yi(()=>{if(n==="ok")e(null);else{const s=(n||"error").toUpperCase();let r=s;i&&(r+=": "+i);const o=new Error(r);o.code=s,e(o)}})}function km(t,e,n){return Zl(t.serverSyncTree_,e,n)||C.EMPTY_NODE}function du(t,e=t.transactionQueueTree_){if(e||na(t,e),Qi(e)){const n=Am(t,e);g(n.length>0,"Sending zero length transaction queue"),n.every(s=>s.status===0)&&MR(t,ar(e),n)}else _m(e)&&Qo(e,n=>{du(t,n)})}function MR(t,e,n){const i=n.map(l=>l.currentWriteId),s=km(t,e,i);let r=s;const o=s.hash();for(let l=0;l<n.length;l++){const u=n[l];g(u.status===0,"tryToSendTransactionQueue_: items in queue should all be run."),u.status=1,u.retryCount++;const d=Re(e,u.path);r=r.updateChild(d,u.currentOutputSnapshotRaw)}const a=r.val(!0),c=e;t.server_.put(c.toString(),a,l=>{cr(t,"transaction put response",{path:c.toString(),status:l});let u=[];if(l==="ok"){const d=[];for(let h=0;h<n.length;h++)n[h].status=2,u=u.concat(Qt(t.serverSyncTree_,n[h].currentWriteId)),n[h].onComplete&&d.push(()=>n[h].onComplete(null,!0,n[h].currentOutputSnapshotResolved)),n[h].unwatcher();na(t,au(t.transactionQueueTree_,e)),du(t,t.transactionQueueTree_),Qe(t.eventQueue_,e,u);for(let h=0;h<d.length;h++)Yi(d[h])}else{if(l==="datastale")for(let d=0;d<n.length;d++)n[d].status===3?n[d].status=4:n[d].status=0;else{Ne("transaction at "+c.toString()+" failed: "+l);for(let d=0;d<n.length;d++)n[d].status=4,n[d].abortReason=l}xi(t,e)}},o)}function xi(t,e){const n=Rm(t,e),i=ar(n),s=Am(t,n);return xR(t,s,i),i}function xR(t,e,n){if(e.length===0)return;const i=[];let s=[];const o=e.filter(a=>a.status===0).map(a=>a.currentWriteId);for(let a=0;a<e.length;a++){const c=e[a],l=Re(n,c.path);let u=!1,d;if(g(l!==null,"rerunTransactionsUnderNode_: relativePath should not be null."),c.status===4)u=!0,d=c.abortReason,s=s.concat(Qt(t.serverSyncTree_,c.currentWriteId,!0));else if(c.status===0)if(c.retryCount>=ER)u=!0,d="maxretry",s=s.concat(Qt(t.serverSyncTree_,c.currentWriteId,!0));else{const h=km(t,c.path,o);c.currentInputSnapshot=h;const f=e[a].update(h.val());if(f!==void 0){Zo("transaction failed: Data returned ",f,c.path);let p=ie(f);typeof f=="object"&&f!=null&&Et(f,".priority")||(p=p.updatePriority(h.getPriority()));const m=c.currentWriteId,A=ta(t),x=gm(p,h,A);c.currentOutputSnapshotRaw=p,c.currentOutputSnapshotResolved=x,c.currentWriteId=uu(t),o.splice(o.indexOf(m),1),s=s.concat(lm(t.serverSyncTree_,c.path,x,c.currentWriteId,c.applyLocally)),s=s.concat(Qt(t.serverSyncTree_,m,!0))}else u=!0,d="nodata",s=s.concat(Qt(t.serverSyncTree_,c.currentWriteId,!0))}Qe(t.eventQueue_,n,s),s=[],u&&(e[a].status=2,(function(h){setTimeout(h,Math.floor(0))})(e[a].unwatcher),e[a].onComplete&&(d==="nodata"?i.push(()=>e[a].onComplete(null,!1,e[a].currentInputSnapshot)):i.push(()=>e[a].onComplete(new Error(d),!1,null))))}na(t,t.transactionQueueTree_);for(let a=0;a<i.length;a++)Yi(i[a]);du(t,t.transactionQueueTree_)}function Rm(t,e){let n,i=t.transactionQueueTree_;for(n=P(e);n!==null&&Qi(i)===void 0;)i=au(i,n),e=G(e),n=P(e);return i}function Am(t,e){const n=[];return Nm(t,e,n),n.sort((i,s)=>i.order-s.order),n}function Nm(t,e,n){const i=Qi(e);if(i)for(let s=0;s<i.length;s++)n.push(i[s]);Qo(e,s=>{Nm(t,s,n)})}function na(t,e){const n=Qi(e);if(n){let i=0;for(let s=0;s<n.length;s++)n[s].status!==2&&(n[i]=n[s],i++);n.length=i,mm(e,n.length>0?n:void 0)}Qo(e,i=>{na(t,i)})}function hu(t,e){const n=ar(Rm(t,e)),i=au(t.transactionQueueTree_,e);return uR(i,s=>{za(t,s)}),za(t,i),ym(i,s=>{za(t,s)}),n}function za(t,e){const n=Qi(e);if(n){const i=[];let s=[],r=-1;for(let o=0;o<n.length;o++)n[o].status===3||(n[o].status===1?(g(r===o-1,"All SENT items should be at beginning of queue."),r=o,n[o].status=3,n[o].abortReason="set"):(g(n[o].status===0,"Unexpected transaction status in abort"),n[o].unwatcher(),s=s.concat(Qt(t.serverSyncTree_,n[o].currentWriteId,!0)),n[o].onComplete&&i.push(n[o].onComplete.bind(null,new Error("set"),!1,null))));r===-1?mm(e,void 0):n.length=r+1,Qe(t.eventQueue_,ar(e),s);for(let o=0;o<i.length;o++)Yi(i[o])}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function FR(t){let e="";const n=t.split("/");for(let i=0;i<n.length;i++)if(n[i].length>0){let s=n[i];try{s=decodeURIComponent(s.replace(/\+/g," "))}catch{}e+="/"+s}return e}function UR(t){const e={};t.charAt(0)==="?"&&(t=t.substring(1));for(const n of t.split("&")){if(n.length===0)continue;const i=n.split("=");i.length===2?e[decodeURIComponent(i[0])]=decodeURIComponent(i[1]):Ne(`Invalid query segment '${n}' in query '${t}'`)}return e}const sf=function(t,e){const n=$R(t),i=n.namespace;n.domain==="firebase.com"&&$t(n.host+" is no longer supported. Please use <YOUR FIREBASE>.firebaseio.com instead"),(!i||i==="undefined")&&n.domain!=="localhost"&&$t("Cannot parse Firebase url. Please use https://<YOUR FIREBASE>.firebaseio.com"),n.secure||GS();const s=n.scheme==="ws"||n.scheme==="wss";return{repoInfo:new Lg(n.host,n.secure,i,s,e,"",i!==n.subdomain),path:new V(n.pathString)}},$R=function(t){let e="",n="",i="",s="",r="",o=!0,a="https",c=443;if(typeof t=="string"){let l=t.indexOf("//");l>=0&&(a=t.substring(0,l-1),t=t.substring(l+2));let u=t.indexOf("/");u===-1&&(u=t.length);let d=t.indexOf("?");d===-1&&(d=t.length),e=t.substring(0,Math.min(u,d)),u<d&&(s=FR(t.substring(u,d)));const h=UR(t.substring(Math.min(t.length,d)));l=e.indexOf(":"),l>=0?(o=a==="https"||a==="wss",c=parseInt(e.substring(l+1),10)):l=e.length;const f=e.slice(0,l);if(f.toLowerCase()==="localhost")n="localhost";else if(f.split(".").length<=2)n=f;else{const p=e.indexOf(".");i=e.substring(0,p).toLowerCase(),n=e.substring(p+1),r=i}"ns"in h&&(r=h.ns)}return{host:e,port:c,domain:n,subdomain:i,secure:o,scheme:a,pathString:s,namespace:r}};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const rf="-0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ_abcdefghijklmnopqrstuvwxyz",BR=(function(){let t=0;const e=[];return function(n){const i=n===t;t=n;let s;const r=new Array(8);for(s=7;s>=0;s--)r[s]=rf.charAt(n%64),n=Math.floor(n/64);g(n===0,"Cannot push at time == 0");let o=r.join("");if(i){for(s=11;s>=0&&e[s]===63;s--)e[s]=0;e[s]++}else for(s=0;s<12;s++)e[s]=Math.floor(Math.random()*64);for(s=0;s<12;s++)o+=rf.charAt(e[s]);return g(o.length===20,"nextPushId: Length should be 20."),o}})();/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Pm{constructor(e,n,i,s){this.eventType=e,this.eventRegistration=n,this.snapshot=i,this.prevName=s}getPath(){const e=this.snapshot.ref;return this.eventType==="value"?e._path:e.parent._path}getEventType(){return this.eventType}getEventRunner(){return this.eventRegistration.getEventRunner(this)}toString(){return this.getPath().toString()+":"+this.eventType+":"+le(this.snapshot.exportVal())}}class Lm{constructor(e,n,i){this.eventRegistration=e,this.error=n,this.path=i}getPath(){return this.path}getEventType(){return"cancel"}getEventRunner(){return this.eventRegistration.getEventRunner(this)}toString(){return this.path.toString()+":cancel"}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class fu{constructor(e,n){this.snapshotCallback=e,this.cancelCallback=n}onValue(e,n){this.snapshotCallback.call(null,e,n)}onCancel(e){return g(this.hasCancelCallback,"Raising a cancel event on a listener with no cancel callback"),this.cancelCallback.call(null,e)}get hasCancelCallback(){return!!this.cancelCallback}matches(e){return this.snapshotCallback===e.snapshotCallback||this.snapshotCallback.userCallback!==void 0&&this.snapshotCallback.userCallback===e.snapshotCallback.userCallback&&this.snapshotCallback.context===e.snapshotCallback.context}}/**
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
 */class HR{constructor(e,n){this._repo=e,this._path=n}cancel(){const e=new Oe;return NR(this._repo,this._path,e.wrapCallback(()=>{})),e.promise}remove(){Dn("OnDisconnect.remove",this._path);const e=new Oe;return nf(this._repo,this._path,null,e.wrapCallback(()=>{})),e.promise}set(e){Dn("OnDisconnect.set",this._path),uo("OnDisconnect.set",e,this._path,!1);const n=new Oe;return nf(this._repo,this._path,e,n.wrapCallback(()=>{})),n.promise}setWithPriority(e,n){Dn("OnDisconnect.setWithPriority",this._path),uo("OnDisconnect.setWithPriority",e,this._path,!1),mR("OnDisconnect.setWithPriority",n);const i=new Oe;return PR(this._repo,this._path,e,n,i.wrapCallback(()=>{})),i.promise}update(e){Dn("OnDisconnect.update",this._path),bm("OnDisconnect.update",e,this._path);const n=new Oe;return LR(this._repo,this._path,e,n.wrapCallback(()=>{})),n.promise}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class pu{constructor(e,n,i,s){this._repo=e,this._path=n,this._queryParams=i,this._orderByCalled=s}get key(){return L(this._path)?null:Bl(this._path)}get ref(){return new Ct(this._repo,this._path)}get _queryIdentifier(){const e=Vh(this._queryParams),n=xl(e);return n==="{}"?"default":n}get _queryObject(){return Vh(this._queryParams)}isEqual(e){if(e=re(e),!(e instanceof pu))return!1;const n=this._repo===e._repo,i=Hl(this._path,e._path),s=this._queryIdentifier===e._queryIdentifier;return n&&i&&s}toJSON(){return this.toString()}toString(){return this._repo.toString()+NI(this._path)}}class Ct extends pu{constructor(e,n){super(e,n,new ql,!1)}get parent(){const e=Hg(this._path);return e===null?null:new Ct(this._repo,e)}get root(){let e=this;for(;e.parent!==null;)e=e.parent;return e}}class Fi{constructor(e,n,i){this._node=e,this.ref=n,this._index=i}get priority(){return this._node.getPriority().val()}get key(){return this.ref.key}get size(){return this._node.numChildren()}child(e){const n=new V(e),i=Ui(this.ref,e);return new Fi(this._node.getChild(n),i,te)}exists(){return!this._node.isEmpty()}exportVal(){return this._node.val(!0)}forEach(e){return this._node.isLeafNode()?!1:!!this._node.forEachChild(this._index,(i,s)=>e(new Fi(s,Ui(this.ref,i),te)))}hasChild(e){const n=new V(e);return!this._node.getChild(n).isEmpty()}hasChildren(){return this._node.isLeafNode()?!1:!this._node.isEmpty()}toJSON(){return this.exportVal()}val(){return this._node.val()}}function b(t,e){return t=re(t),t._checkNotDeleted("ref"),e!==void 0?Ui(t._root,e):t._root}function Ui(t,e){return t=re(t),P(t._path)===null?_R("child","path",e):Em("child","path",e),new Ct(t._repo,ee(t._path,e))}function VR(t){return t=re(t),new HR(t._repo,t._path)}function ho(t,e){t=re(t),Dn("push",t._path),uo("push",e,t._path,!0);const n=Sm(t._repo),i=BR(n),s=Ui(t,i),r=Ui(t,i);let o;return o=Promise.resolve(r),s.then=o.then.bind(o),s.catch=o.then.bind(o,void 0),s}function Ze(t){return Dn("remove",t._path),ne(t,null)}function ne(t,e){t=re(t),Dn("set",t._path),uo("set",e,t._path,!1);const n=new Oe;return kR(t._repo,t._path,e,null,n.wrapCallback(()=>{})),n.promise}function hi(t,e){bm("update",e,t._path);const n=new Oe;return RR(t._repo,t._path,e,n.wrapCallback(()=>{})),n.promise}function De(t){t=re(t);const e=new fu(()=>{}),n=new lr(e);return IR(t._repo,t,n).then(i=>new Fi(i,new Ct(t._repo,t._path),t._queryParams.getIndex()))}class lr{constructor(e){this.callbackContext=e}respondsTo(e){return e==="value"}createEvent(e,n){const i=n._queryParams.getIndex();return new Pm("value",this,new Fi(e.snapshotNode,new Ct(n._repo,n._path),i))}getEventRunner(e){return e.getEventType()==="cancel"?()=>this.callbackContext.onCancel(e.error):()=>this.callbackContext.onValue(e.snapshot,null)}createCancelEvent(e,n){return this.callbackContext.hasCancelCallback?new Lm(this,e,n):null}matches(e){return e instanceof lr?!e.callbackContext||!this.callbackContext?!0:e.callbackContext.matches(this.callbackContext):!1}hasAnyCallback(){return this.callbackContext!==null}}class ia{constructor(e,n){this.eventType=e,this.callbackContext=n}respondsTo(e){let n=e==="children_added"?"child_added":e;return n=n==="children_removed"?"child_removed":n,this.eventType===n}createCancelEvent(e,n){return this.callbackContext.hasCancelCallback?new Lm(this,e,n):null}createEvent(e,n){g(e.childName!=null,"Child events should have a childName.");const i=Ui(new Ct(n._repo,n._path),e.childName),s=n._queryParams.getIndex();return new Pm(e.type,this,new Fi(e.snapshotNode,i,s),e.prevName)}getEventRunner(e){return e.getEventType()==="cancel"?()=>this.callbackContext.onCancel(e.error):()=>this.callbackContext.onValue(e.snapshot,e.prevName)}matches(e){return e instanceof ia?this.eventType===e.eventType&&(!this.callbackContext||!e.callbackContext||this.callbackContext.matches(e.callbackContext)):!1}hasAnyCallback(){return!!this.callbackContext}}function sa(t,e,n,i,s){const r=new fu(n,void 0),o=e==="value"?new lr(r):new ia(e,r);return OR(t._repo,t,o),()=>Im(t._repo,t,o)}function Om(t,e,n,i){return sa(t,"value",e)}function Ws(t,e,n,i){return sa(t,"child_added",e)}function of(t,e,n,i){return sa(t,"child_changed",e)}function WR(t,e,n,i){return sa(t,"child_removed",e)}function Rt(t,e,n){let i=null;const s=n?new fu(n):null;e==="value"?i=new lr(s):e&&(i=new ia(e,s)),Im(t._repo,t,i)}Vk(Ct);Gk(Ct);/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const jR="FIREBASE_DATABASE_EMULATOR_HOST",zc={};let qR=!1;function zR(t,e,n,i){const s=e.lastIndexOf(":"),r=e.substring(0,s),o=zi(r);t.repoInfo_=new Lg(e,o,t.repoInfo_.namespace,t.repoInfo_.webSocketOnly,t.repoInfo_.nodeAdmin,t.repoInfo_.persistenceKey,t.repoInfo_.includeNamespaceInQueryParams,!0,n),i&&(t.authTokenProvider_=i)}function GR(t,e,n,i,s){let r=i||t.options.databaseURL;r===void 0&&(t.options.projectId||$t("Can't determine Firebase Database URL. Be sure to include  a Project ID when calling firebase.initializeApp()."),pe("Using default host for project ",t.options.projectId),r=`${t.options.projectId}-default-rtdb.firebaseio.com`);let o=sf(r,s),a=o.repoInfo,c;typeof process<"u"&&Th&&(c=Th[jR]),c?(r=`http://${c}?ns=${a.namespace}`,o=sf(r,s),a=o.repoInfo):o.repoInfo.secure;const l=new sI(t.name,t.options,e);yR("Invalid Firebase Database URL",o),L(o.path)||$t("Database URL must point to the root of a Firebase Database (not including a child path).");const u=YR(a,t,l,new iI(t,n));return new JR(u,t)}function KR(t,e){const n=zc[e];(!n||n[t.key]!==t)&&$t(`Database ${e}(${t.repoInfo_}) has already been deleted.`),DR(t),delete n[t.key]}function YR(t,e,n,i){let s=zc[e.name];s||(s={},zc[e.name]=s);let r=s[t.toURLString()];return r&&$t("Database initialized multiple times. Please make sure the format of the database URL matches with each database() call."),r=new CR(t,qR,n,i),s[t.toURLString()]=r,r}class JR{constructor(e,n){this._repoInternal=e,this.app=n,this.type="database",this._instanceStarted=!1}get _repo(){return this._instanceStarted||(TR(this._repoInternal,this.app.options.appId,this.app.options.databaseAuthVariableOverride),this._instanceStarted=!0),this._repoInternal}get _root(){return this._rootInternal||(this._rootInternal=new Ct(this._repo,$())),this._rootInternal}_delete(){return this._rootInternal!==null&&(KR(this._repo,this.app.name),this._repoInternal=null,this._rootInternal=null),Promise.resolve()}_checkNotDeleted(e){this._rootInternal===null&&$t("Cannot call "+e+" on a deleted database.")}}function XR(t=qo(),e){const n=vn(t,"database").getImmediate({identifier:e});if(!n._instanceStarted){const i=uT("database");i&&QR(n,...i)}return n}function QR(t,e,n,i={}){t=re(t),t._checkNotDeleted("useEmulator");const s=`${e}:${n}`,r=t._repoInternal;if(t._instanceStarted){if(s===t._repoInternal.repoInfo_.host&&Vn(i,r.repoInfo_.emulatorOptions))return;$t("connectDatabaseEmulator() cannot initialize or alter the emulator configuration after the database instance has started.")}let o;if(r.repoInfo_.nodeAdmin)i.mockUserToken&&$t('mockUserToken is not supported by the Admin SDK. For client access with mock users, please use the "firebase" package instead of "firebase-admin".'),o=new Dr(Dr.OWNER);else if(i.mockUserToken){const a=typeof i.mockUserToken=="string"?i.mockUserToken:dT(i.mockUserToken,t.app.options.projectId);o=new Dr(a)}zi(e)&&(cg(e),lg("Database",!0)),zR(r,s,i,o)}/**
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
 */function ZR(t){HS(Ki),Xe(new qe("database",(e,{instanceIdentifier:n})=>{const i=e.getProvider("app").getImmediate(),s=e.getProvider("auth-internal"),r=e.getProvider("app-check-internal");return GR(i,s,r,n)},"PUBLIC").setMultipleInstances(!0)),je(Sh,Ih,t),je(Sh,Ih,"esm2020")}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const eA={".sv":"timestamp"};function fi(){return eA}xt.prototype.simpleListen=function(t,e){this.sendRequest("q",{p:t},e)};xt.prototype.echo=function(t,e){this.sendRequest("echo",{d:t},e)};ZR();var tA="firebase",nA="12.8.0";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */je(tA,nA,"app");/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Gc=new Map,Dm={activated:!1,tokenObservers:[]},iA={initialized:!1,enabled:!1};function ue(t){return Gc.get(t)||{...Dm}}function sA(t,e){return Gc.set(t,e),Gc.get(t)}function ra(){return iA}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Mm="https://content-firebaseappcheck.googleapis.com/v1",rA="exchangeRecaptchaEnterpriseToken",oA="exchangeDebugToken",af={RETRIAL_MIN_WAIT:30*1e3,RETRIAL_MAX_WAIT:960*1e3},aA=1440*60*1e3;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class cA{constructor(e,n,i,s,r){if(this.operation=e,this.retryPolicy=n,this.getWaitDuration=i,this.lowerBound=s,this.upperBound=r,this.pending=null,this.nextErrorWaitInterval=s,s>r)throw new Error("Proactive refresh lower bound greater than upper bound!")}start(){this.nextErrorWaitInterval=this.lowerBound,this.process(!0).catch(()=>{})}stop(){this.pending&&(this.pending.reject("cancelled"),this.pending=null)}isRunning(){return!!this.pending}async process(e){this.stop();try{this.pending=new Oe,this.pending.promise.catch(n=>{}),await lA(this.getNextRun(e)),this.pending.resolve(),await this.pending.promise,this.pending=new Oe,this.pending.promise.catch(n=>{}),await this.operation(),this.pending.resolve(),await this.pending.promise,this.process(!0).catch(()=>{})}catch(n){this.retryPolicy(n)?this.process(!1).catch(()=>{}):this.stop()}}getNextRun(e){if(e)return this.nextErrorWaitInterval=this.lowerBound,this.getWaitDuration();{const n=this.nextErrorWaitInterval;return this.nextErrorWaitInterval*=2,this.nextErrorWaitInterval>this.upperBound&&(this.nextErrorWaitInterval=this.upperBound),n}}}function lA(t){return new Promise(e=>{setTimeout(e,t)})}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const uA={"already-initialized":"You have already called initializeAppCheck() for FirebaseApp {$appName} with different options. To avoid this error, call initializeAppCheck() with the same options as when it was originally called. This will return the already initialized instance.","use-before-activation":"App Check is being used before initializeAppCheck() is called for FirebaseApp {$appName}. Call initializeAppCheck() before instantiating other Firebase services.","fetch-network-error":"Fetch failed to connect to a network. Check Internet connection. Original error: {$originalErrorMessage}.","fetch-parse-error":"Fetch client could not parse response. Original error: {$originalErrorMessage}.","fetch-status-error":"Fetch server returned an HTTP error status. HTTP status: {$httpStatus}.","storage-open":"Error thrown when opening storage. Original error: {$originalErrorMessage}.","storage-get":"Error thrown when reading from storage. Original error: {$originalErrorMessage}.","storage-set":"Error thrown when writing to storage. Original error: {$originalErrorMessage}.","recaptcha-error":"ReCAPTCHA error.","initial-throttle":"{$httpStatus} error. Attempts allowed again after {$time}",throttled:"Requests throttled due to previous {$httpStatus} error. Attempts allowed again after {$time}"},xe=new wn("appCheck","AppCheck",uA);/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function cf(t=!1){return t?self.grecaptcha?.enterprise:self.grecaptcha}function gu(t){if(!ue(t).activated)throw xe.create("use-before-activation",{appName:t.name})}function xm(t){const e=Math.round(t/1e3),n=Math.floor(e/(3600*24)),i=Math.floor((e-n*3600*24)/3600),s=Math.floor((e-n*3600*24-i*3600)/60),r=e-n*3600*24-i*3600-s*60;let o="";return n&&(o+=br(n)+"d:"),i&&(o+=br(i)+"h:"),o+=br(s)+"m:"+br(r)+"s",o}function br(t){return t===0?"00":t>=10?t.toString():"0"+t}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function mu({url:t,body:e},n){const i={"Content-Type":"application/json"},s=n.getImmediate({optional:!0});if(s){const d=await s.getHeartbeatsHeader();d&&(i["X-Firebase-Client"]=d)}const r={method:"POST",body:JSON.stringify(e),headers:i};let o;try{o=await fetch(t,r)}catch(d){throw xe.create("fetch-network-error",{originalErrorMessage:d?.message})}if(o.status!==200)throw xe.create("fetch-status-error",{httpStatus:o.status});let a;try{a=await o.json()}catch(d){throw xe.create("fetch-parse-error",{originalErrorMessage:d?.message})}const c=a.ttl.match(/^([\d.]+)(s)$/);if(!c||!c[2]||isNaN(Number(c[1])))throw xe.create("fetch-parse-error",{originalErrorMessage:`ttl field (timeToLive) is not in standard Protobuf Duration format: ${a.ttl}`});const l=Number(c[1])*1e3,u=Date.now();return{token:a.token,expireTimeMillis:u+l,issuedAtTimeMillis:u}}function dA(t,e){const{projectId:n,appId:i,apiKey:s}=t.options;return{url:`${Mm}/projects/${n}/apps/${i}:${rA}?key=${s}`,body:{recaptcha_enterprise_token:e}}}function Fm(t,e){const{projectId:n,appId:i,apiKey:s}=t.options;return{url:`${Mm}/projects/${n}/apps/${i}:${oA}?key=${s}`,body:{debug_token:e}}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const hA="firebase-app-check-database",fA=1,js="firebase-app-check-store",Um="debug-token";let Er=null;function $m(){return Er||(Er=new Promise((t,e)=>{try{const n=indexedDB.open(hA,fA);n.onsuccess=i=>{t(i.target.result)},n.onerror=i=>{e(xe.create("storage-open",{originalErrorMessage:i.target.error?.message}))},n.onupgradeneeded=i=>{const s=i.target.result;switch(i.oldVersion){case 0:s.createObjectStore(js,{keyPath:"compositeKey"})}}}catch(n){e(xe.create("storage-open",{originalErrorMessage:n?.message}))}}),Er)}function pA(t){return Hm(Vm(t))}function gA(t,e){return Bm(Vm(t),e)}function mA(t){return Bm(Um,t)}function _A(){return Hm(Um)}async function Bm(t,e){const i=(await $m()).transaction(js,"readwrite"),r=i.objectStore(js).put({compositeKey:t,value:e});return new Promise((o,a)=>{r.onsuccess=c=>{o()},i.onerror=c=>{a(xe.create("storage-set",{originalErrorMessage:c.target.error?.message}))}})}async function Hm(t){const n=(await $m()).transaction(js,"readonly"),s=n.objectStore(js).get(t);return new Promise((r,o)=>{s.onsuccess=a=>{const c=a.target.result;r(c?c.value:void 0)},n.onerror=a=>{o(xe.create("storage-get",{originalErrorMessage:a.target.error?.message}))}})}function Vm(t){return`${t.options.appId}-${t.name}`}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Zt=new Wo("@firebase/app-check");/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function yA(t){if(Ho()){let e;try{e=await pA(t)}catch(n){Zt.warn(`Failed to read token from IndexedDB. Error: ${n}`)}return e}}function Ga(t,e){return Ho()?gA(t,e).catch(n=>{Zt.warn(`Failed to write token to IndexedDB. Error: ${n}`)}):Promise.resolve()}async function wA(){let t;try{t=await _A()}catch{}if(t)return t;{const e=crypto.randomUUID();return mA(e).catch(n=>Zt.warn(`Failed to persist debug token to IndexedDB. Error: ${n}`)),e}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function _u(){return ra().enabled}async function yu(){const t=ra();if(t.enabled&&t.token)return t.token.promise;throw Error(`
            Can't get debug token in production mode.
        `)}function vA(){const t=sg(),e=ra();if(e.initialized=!0,typeof t.FIREBASE_APPCHECK_DEBUG_TOKEN!="string"&&t.FIREBASE_APPCHECK_DEBUG_TOKEN!==!0)return;e.enabled=!0;const n=new Oe;e.token=n,typeof t.FIREBASE_APPCHECK_DEBUG_TOKEN=="string"?n.resolve(t.FIREBASE_APPCHECK_DEBUG_TOKEN):n.resolve(wA())}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const bA={error:"UNKNOWN_ERROR"};function EA(t){return Bo.encodeString(JSON.stringify(t),!1)}async function Kc(t,e=!1,n=!1){const i=t.app;gu(i);const s=ue(i);let r=s.token,o;if(r&&!ci(r)&&(s.token=void 0,r=void 0),!r){const l=await s.cachedTokenPromise;l&&(ci(l)?r=l:await Ga(i,void 0))}if(!e&&r&&ci(r))return{token:r.token};let a=!1;if(_u())try{s.exchangeTokenPromise||(s.exchangeTokenPromise=mu(Fm(i,await yu()),t.heartbeatServiceProvider).finally(()=>{s.exchangeTokenPromise=void 0}),a=!0);const l=await s.exchangeTokenPromise;return await Ga(i,l),s.token=l,{token:l.token}}catch(l){return l.code==="appCheck/throttled"||l.code==="appCheck/initial-throttle"?Zt.warn(l.message):n&&Zt.error(l),Ka(l)}try{s.exchangeTokenPromise||(s.exchangeTokenPromise=s.provider.getToken().finally(()=>{s.exchangeTokenPromise=void 0}),a=!0),r=await ue(i).exchangeTokenPromise}catch(l){l.code==="appCheck/throttled"||l.code==="appCheck/initial-throttle"?Zt.warn(l.message):n&&Zt.error(l),o=l}let c;return r?o?ci(r)?c={token:r.token,internalError:o}:c=Ka(o):(c={token:r.token},s.token=r,await Ga(i,r)):c=Ka(o),a&&qm(i,c),c}async function CA(t){const e=t.app;gu(e);const{provider:n}=ue(e);if(_u()){const i=await yu(),{token:s}=await mu(Fm(e,i),t.heartbeatServiceProvider);return{token:s}}else{const{token:i}=await n.getToken();return{token:i}}}function Wm(t,e,n,i){const{app:s}=t,r=ue(s),o={next:n,error:i,type:e};if(r.tokenObservers=[...r.tokenObservers,o],r.token&&ci(r.token)){const a=r.token;Promise.resolve().then(()=>{n({token:a.token}),lf(t)}).catch(()=>{})}r.cachedTokenPromise.then(()=>lf(t))}function jm(t,e){const n=ue(t),i=n.tokenObservers.filter(s=>s.next!==e);i.length===0&&n.tokenRefresher&&n.tokenRefresher.isRunning()&&n.tokenRefresher.stop(),n.tokenObservers=i}function lf(t){const{app:e}=t,n=ue(e);let i=n.tokenRefresher;i||(i=TA(t),n.tokenRefresher=i),!i.isRunning()&&n.isTokenAutoRefreshEnabled&&i.start()}function TA(t){const{app:e}=t;return new cA(async()=>{const n=ue(e);let i;if(n.token?i=await Kc(t,!0):i=await Kc(t),i.error)throw i.error;if(i.internalError)throw i.internalError},()=>!0,()=>{const n=ue(e);if(n.token){let i=n.token.issuedAtTimeMillis+(n.token.expireTimeMillis-n.token.issuedAtTimeMillis)*.5+3e5;const s=n.token.expireTimeMillis-300*1e3;return i=Math.min(i,s),Math.max(0,i-Date.now())}else return 0},af.RETRIAL_MIN_WAIT,af.RETRIAL_MAX_WAIT)}function qm(t,e){const n=ue(t).tokenObservers;for(const i of n)try{i.type==="EXTERNAL"&&e.error!=null?i.error(e.error):i.next(e)}catch{}}function ci(t){return t.expireTimeMillis-Date.now()>0}function Ka(t){return{token:EA(bA),error:t}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class SA{constructor(e,n){this.app=e,this.heartbeatServiceProvider=n}_delete(){const{tokenObservers:e}=ue(this.app);for(const n of e)jm(this.app,n.next);return Promise.resolve()}}function IA(t,e){return new SA(t,e)}function kA(t){return{getToken:e=>Kc(t,e),getLimitedUseToken:()=>CA(t),addTokenListener:e=>Wm(t,"INTERNAL",e),removeTokenListener:e=>jm(t.app,e)}}const RA="@firebase/app-check",AA="0.11.0",NA="https://www.google.com/recaptcha/enterprise.js";function PA(t,e){const n=new Oe,i=ue(t);i.reCAPTCHAState={initialized:n};const s=LA(t),r=cf(!0);return r?uf(t,e,r,s,n):MA(()=>{const o=cf(!0);if(!o)throw new Error("no recaptcha");uf(t,e,o,s,n)}),n.promise}function uf(t,e,n,i,s){n.ready(()=>{DA(t,e,n,i),s.resolve(n)})}function LA(t){const e=`fire_app_check_${t.name}`,n=document.createElement("div");return n.id=e,n.style.display="none",document.body.appendChild(n),e}async function OA(t){gu(t);const n=await ue(t).reCAPTCHAState.initialized.promise;return new Promise((i,s)=>{const r=ue(t).reCAPTCHAState;n.ready(()=>{i(n.execute(r.widgetId,{action:"fire_app_check"}))})})}function DA(t,e,n,i){const s=n.render(i,{sitekey:e,size:"invisible",callback:()=>{ue(t).reCAPTCHAState.succeeded=!0},"error-callback":()=>{ue(t).reCAPTCHAState.succeeded=!1}}),r=ue(t);r.reCAPTCHAState={...r.reCAPTCHAState,widgetId:s}}function MA(t){const e=document.createElement("script");e.src=NA,e.onload=t,document.head.appendChild(e)}class wu{constructor(e){this._siteKey=e,this._throttleData=null}async getToken(){FA(this._throttleData);const e=await OA(this._app).catch(i=>{throw xe.create("recaptcha-error")});if(!ue(this._app).reCAPTCHAState?.succeeded)throw xe.create("recaptcha-error");let n;try{n=await mu(dA(this._app,e),this._heartbeatServiceProvider)}catch(i){throw i.code?.includes("fetch-status-error")?(this._throttleData=xA(Number(i.customData?.httpStatus),this._throttleData),xe.create("initial-throttle",{time:xm(this._throttleData.allowRequestsAfter-Date.now()),httpStatus:this._throttleData.httpStatus})):i}return this._throttleData=null,n}initialize(e){this._app=e,this._heartbeatServiceProvider=vn(e,"heartbeat"),PA(e,this._siteKey).catch(()=>{})}isEqual(e){return e instanceof wu?this._siteKey===e._siteKey:!1}}function xA(t,e){if(t===404||t===403)return{backoffCount:1,allowRequestsAfter:Date.now()+aA,httpStatus:t};{const n=e?e.backoffCount:0,i=OT(n,1e3,2);return{backoffCount:n+1,allowRequestsAfter:Date.now()+i,httpStatus:t}}}function FA(t){if(t&&Date.now()-t.allowRequestsAfter<=0)throw xe.create("throttled",{time:xm(t.allowRequestsAfter-Date.now()),httpStatus:t.httpStatus})}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function UA(t=qo(),e){t=re(t);const n=vn(t,"app-check");if(ra().initialized||vA(),_u()&&yu().then(s=>console.log(`App Check debug token: ${s}. You will need to add it to your app's App Check settings in the Firebase console for it to work.`)),n.isInitialized()){const s=n.getImmediate(),r=n.getOptions();if(r.isTokenAutoRefreshEnabled===e.isTokenAutoRefreshEnabled&&r.provider.isEqual(e.provider))return s;throw xe.create("already-initialized",{appName:t.name})}const i=n.initialize({options:e});return $A(t,e.provider,e.isTokenAutoRefreshEnabled),ue(t).isTokenAutoRefreshEnabled&&Wm(i,"INTERNAL",()=>{}),i}function $A(t,e,n=!1){const i=sA(t,{...Dm});i.activated=!0,i.provider=e,i.cachedTokenPromise=yA(t).then(s=>(s&&ci(s)&&(i.token=s,qm(t,{token:s.token})),s)),i.isTokenAutoRefreshEnabled=n&&t.automaticDataCollectionEnabled,!t.automaticDataCollectionEnabled&&n&&Zt.warn("`isTokenAutoRefreshEnabled` is true but `automaticDataCollectionEnabled` was set to false during `initializeApp()`. This blocks automatic token refresh."),i.provider.initialize(t)}const BA="app-check",df="app-check-internal";function HA(){Xe(new qe(BA,t=>{const e=t.getProvider("app").getImmediate(),n=t.getProvider("heartbeat");return IA(e,n)},"PUBLIC").setInstantiationMode("EXPLICIT").setInstanceCreatedCallback((t,e,n)=>{t.getProvider(df).initialize()})),Xe(new qe(df,t=>{const e=t.getProvider("app-check").getImmediate();return kA(e)},"PUBLIC").setInstantiationMode("EXPLICIT")),je(RA,AA)}HA();const VA={apiKey:"AIzaSyA-fvCaKCjyEFX__YAVr1oPGdVsUEhFehA",authDomain:"vidu-aae11.web.app",projectId:"vidu-aae11",databaseURL:"https://vidu-aae11-default-rtdb.europe-west1.firebasedatabase.app",storageBucket:"vidu-aae11.firebasestorage.app",messagingSenderId:"765724787439",appId:"1:765724787439:web:61a3b5dd538149564c911a",measurementId:"G-EGJ53HLGY4"},oa=gg(VA),WA=void 0;console.error("Missing VITE_FCM_VAPID_KEY: required for FCM web push");const hf="6LdBIBgsAAAAAB4zIcXaZI-FD4kt21TWs9Zx9_fp";let Yc;if(hf.trim()!=="")Yc=new wu(hf),console.info("[Firebase App Check: PROD] Initializing with ReCAPTCHA Enterprise (invisible mode).");else throw console.error("[Firebase App Check: PROD] VITE_RECAPTCHA_ENTERPRISE_SITE_KEY is missing or empty. App Check will NOT be initialized, leaving Firebase services unprotected!"),new Error("Firebase App Check configuration missing in production.");if(Yc)try{UA(oa,{provider:Yc,isTokenAutoRefreshEnabled:!0})}catch(t){console.error("[Firebase App Check] initializeAppCheck call failed:",t)}const E=XR(oa),at=[];function Ln(t,e,n,i=null,s=null,r=null){e==="value"?Om(t,n):e==="child_added"?Ws(t,n):e==="child_removed"?WR(t,n):console.warn(`Unknown listener type: ${e}`),at.push({ref:t,type:e,callback:n,roomId:i,userId:s,category:r})}function jA(){at.forEach(({ref:t,type:e,callback:n})=>{try{Rt(t,e,n)}catch(i){console.warn("Failed to remove firebase rtdb listener",i)}}),at.length=0}function aa(t){if(!t)return;at.filter(i=>i.roomId===t).forEach(({ref:i,type:s,callback:r})=>{try{Rt(i,s,r)}catch(o){console.warn(`Failed to remove listener for room ${t}`,o)}});const n=at.filter(i=>i.roomId!==t);at.length=0,at.push(...n)}function qA(t,e){if(!t||!e)return;const n=r=>r.userId===t&&r.roomId===e;at.filter(n).forEach(({ref:r,type:o,callback:a})=>{try{Rt(r,o,a)}catch(c){console.warn(`Failed to remove listener for user ${t} in room ${e}`,c)}});const s=at.filter(r=>!n(r));at.length=0,at.push(...s)}function Cs(t,e,n=null){Ln(t,"value",e,n)}const In=t=>b(E,`rooms/${t}`),Cr=t=>b(E,`rooms/${t}/members`),ff=(t,e)=>b(E,`rooms/${t}/members/${e}`),zA=t=>b(E,`rooms/${t}/cancellation`),ca=t=>b(E,`rooms/${t}/watch`),la=t=>b(E,`rooms/${t}/watch/fileRequest`),GA=t=>b(E,`users/${t}/recentCalls`),vu=(t,e)=>b(E,`users/${t}/recentCalls/${e}`),bu=t=>b(E,`users/${t}/outgoingCall`),zm=t=>b(E,`rooms/${t}/offerCandidates`),Gm=t=>b(E,`rooms/${t}/answerCandidates`);function Km(){return{"dependent-sdk-initialized-before-auth":"Another Firebase SDK was initialized and is trying to use Auth before Auth is initialized. Please be sure to call `initializeAuth` or `getAuth` before starting any other Firebase SDK."}}const KA=Km,Ym=new wn("auth","Firebase",Km());/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const fo=new Wo("@firebase/auth");function YA(t,...e){fo.logLevel<=q.WARN&&fo.warn(`Auth (${Ki}): ${t}`,...e)}function Mr(t,...e){fo.logLevel<=q.ERROR&&fo.error(`Auth (${Ki}): ${t}`,...e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function bt(t,...e){throw Cu(t,...e)}function dt(t,...e){return Cu(t,...e)}function Eu(t,e,n){const i={...KA(),[e]:n};return new wn("auth","Firebase",i).create(e,{appName:t.name})}function Un(t){return Eu(t,"operation-not-supported-in-this-environment","Operations that alter the current user are not supported in conjunction with FirebaseServerApp")}function JA(t,e,n){const i=n;if(!(e instanceof i))throw i.name!==e.constructor.name&&bt(t,"argument-error"),Eu(t,"argument-error",`Type of ${e.constructor.name} does not match expected instance.Did you pass a reference from a different Auth SDK?`)}function Cu(t,...e){if(typeof t!="string"){const n=e[0],i=[...e.slice(1)];return i[0]&&(i[0].appName=t.name),t._errorFactory.create(n,...i)}return Ym.create(t,...e)}function I(t,e,...n){if(!t)throw Cu(e,...n)}function At(t){const e="INTERNAL ASSERTION FAILED: "+t;throw Mr(e),new Error(e)}function Bt(t,e){t||At(e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Jc(){return typeof self<"u"&&self.location?.href||""}function XA(){return pf()==="http:"||pf()==="https:"}function pf(){return typeof self<"u"&&self.location?.protocol||null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function QA(){return typeof navigator<"u"&&navigator&&"onLine"in navigator&&typeof navigator.onLine=="boolean"&&(XA()||gT()||"connection"in navigator)?navigator.onLine:!0}function ZA(){if(typeof navigator>"u")return null;const t=navigator;return t.languages&&t.languages[0]||t.language||null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ur{constructor(e,n){this.shortDelay=e,this.longDelay=n,Bt(n>e,"Short delay should be less than long delay!"),this.isMobile=Dl()||ug()}get(){return QA()?this.isMobile?this.longDelay:this.shortDelay:Math.min(5e3,this.shortDelay)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Tu(t,e){Bt(t.emulator,"Emulator should always be set here");const{url:n}=t.emulator;return e?`${n}${e.startsWith("/")?e.slice(1):e}`:n}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Jm{static initialize(e,n,i){this.fetchImpl=e,n&&(this.headersImpl=n),i&&(this.responseImpl=i)}static fetch(){if(this.fetchImpl)return this.fetchImpl;if(typeof self<"u"&&"fetch"in self)return self.fetch;if(typeof globalThis<"u"&&globalThis.fetch)return globalThis.fetch;if(typeof fetch<"u")return fetch;At("Could not find fetch implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static headers(){if(this.headersImpl)return this.headersImpl;if(typeof self<"u"&&"Headers"in self)return self.Headers;if(typeof globalThis<"u"&&globalThis.Headers)return globalThis.Headers;if(typeof Headers<"u")return Headers;At("Could not find Headers implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static response(){if(this.responseImpl)return this.responseImpl;if(typeof self<"u"&&"Response"in self)return self.Response;if(typeof globalThis<"u"&&globalThis.Response)return globalThis.Response;if(typeof Response<"u")return Response;At("Could not find Response implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const eN={CREDENTIAL_MISMATCH:"custom-token-mismatch",MISSING_CUSTOM_TOKEN:"internal-error",INVALID_IDENTIFIER:"invalid-email",MISSING_CONTINUE_URI:"internal-error",INVALID_PASSWORD:"wrong-password",MISSING_PASSWORD:"missing-password",INVALID_LOGIN_CREDENTIALS:"invalid-credential",EMAIL_EXISTS:"email-already-in-use",PASSWORD_LOGIN_DISABLED:"operation-not-allowed",INVALID_IDP_RESPONSE:"invalid-credential",INVALID_PENDING_TOKEN:"invalid-credential",FEDERATED_USER_ID_ALREADY_LINKED:"credential-already-in-use",MISSING_REQ_TYPE:"internal-error",EMAIL_NOT_FOUND:"user-not-found",RESET_PASSWORD_EXCEED_LIMIT:"too-many-requests",EXPIRED_OOB_CODE:"expired-action-code",INVALID_OOB_CODE:"invalid-action-code",MISSING_OOB_CODE:"internal-error",CREDENTIAL_TOO_OLD_LOGIN_AGAIN:"requires-recent-login",INVALID_ID_TOKEN:"invalid-user-token",TOKEN_EXPIRED:"user-token-expired",USER_NOT_FOUND:"user-token-expired",TOO_MANY_ATTEMPTS_TRY_LATER:"too-many-requests",PASSWORD_DOES_NOT_MEET_REQUIREMENTS:"password-does-not-meet-requirements",INVALID_CODE:"invalid-verification-code",INVALID_SESSION_INFO:"invalid-verification-id",INVALID_TEMPORARY_PROOF:"invalid-credential",MISSING_SESSION_INFO:"missing-verification-id",SESSION_EXPIRED:"code-expired",MISSING_ANDROID_PACKAGE_NAME:"missing-android-pkg-name",UNAUTHORIZED_DOMAIN:"unauthorized-continue-uri",INVALID_OAUTH_CLIENT_ID:"invalid-oauth-client-id",ADMIN_ONLY_OPERATION:"admin-restricted-operation",INVALID_MFA_PENDING_CREDENTIAL:"invalid-multi-factor-session",MFA_ENROLLMENT_NOT_FOUND:"multi-factor-info-not-found",MISSING_MFA_ENROLLMENT_ID:"missing-multi-factor-info",MISSING_MFA_PENDING_CREDENTIAL:"missing-multi-factor-session",SECOND_FACTOR_EXISTS:"second-factor-already-in-use",SECOND_FACTOR_LIMIT_EXCEEDED:"maximum-second-factor-count-exceeded",BLOCKING_FUNCTION_ERROR_RESPONSE:"internal-error",RECAPTCHA_NOT_ENABLED:"recaptcha-not-enabled",MISSING_RECAPTCHA_TOKEN:"missing-recaptcha-token",INVALID_RECAPTCHA_TOKEN:"invalid-recaptcha-token",INVALID_RECAPTCHA_ACTION:"invalid-recaptcha-action",MISSING_CLIENT_TYPE:"missing-client-type",MISSING_RECAPTCHA_VERSION:"missing-recaptcha-version",INVALID_RECAPTCHA_VERSION:"invalid-recaptcha-version",INVALID_REQ_TYPE:"invalid-req-type"};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const tN=["/v1/accounts:signInWithCustomToken","/v1/accounts:signInWithEmailLink","/v1/accounts:signInWithIdp","/v1/accounts:signInWithPassword","/v1/accounts:signInWithPhoneNumber","/v1/token"],nN=new ur(3e4,6e4);function Su(t,e){return t.tenantId&&!e.tenantId?{...e,tenantId:t.tenantId}:e}async function Zi(t,e,n,i,s={}){return Xm(t,s,async()=>{let r={},o={};i&&(e==="GET"?o=i:r={body:JSON.stringify(i)});const a=Gi({key:t.config.apiKey,...o}).slice(1),c=await t._getAdditionalHeaders();c["Content-Type"]="application/json",t.languageCode&&(c["X-Firebase-Locale"]=t.languageCode);const l={method:e,headers:c,...r};return pT()||(l.referrerPolicy="no-referrer"),t.emulatorConfig&&zi(t.emulatorConfig.host)&&(l.credentials="include"),Jm.fetch()(await Qm(t,t.config.apiHost,n,a),l)})}async function Xm(t,e,n){t._canInitEmulator=!1;const i={...eN,...e};try{const s=new sN(t),r=await Promise.race([n(),s.promise]);s.clearNetworkTimeout();const o=await r.json();if("needConfirmation"in o)throw Tr(t,"account-exists-with-different-credential",o);if(r.ok&&!("errorMessage"in o))return o;{const a=r.ok?o.errorMessage:o.error.message,[c,l]=a.split(" : ");if(c==="FEDERATED_USER_ID_ALREADY_LINKED")throw Tr(t,"credential-already-in-use",o);if(c==="EMAIL_EXISTS")throw Tr(t,"email-already-in-use",o);if(c==="USER_DISABLED")throw Tr(t,"user-disabled",o);const u=i[c]||c.toLowerCase().replace(/[_\s]+/g,"-");if(l)throw Eu(t,u,l);bt(t,u)}}catch(s){if(s instanceof jt)throw s;bt(t,"network-request-failed",{message:String(s)})}}async function iN(t,e,n,i,s={}){const r=await Zi(t,e,n,i,s);return"mfaPendingCredential"in r&&bt(t,"multi-factor-auth-required",{_serverResponse:r}),r}async function Qm(t,e,n,i){const s=`${e}${n}?${i}`,r=t,o=r.config.emulator?Tu(t.config,s):`${t.config.apiScheme}://${s}`;return tN.includes(n)&&(await r._persistenceManagerAvailable,r._getPersistenceType()==="COOKIE")?r._getPersistence()._getFinalTarget(o).toString():o}class sN{clearNetworkTimeout(){clearTimeout(this.timer)}constructor(e){this.auth=e,this.timer=null,this.promise=new Promise((n,i)=>{this.timer=setTimeout(()=>i(dt(this.auth,"network-request-failed")),nN.get())})}}function Tr(t,e,n){const i={appName:t.name};n.email&&(i.email=n.email),n.phoneNumber&&(i.phoneNumber=n.phoneNumber);const s=dt(t,e,i);return s.customData._tokenResponse=n,s}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function rN(t,e){return Zi(t,"POST","/v1/accounts:delete",e)}async function po(t,e){return Zi(t,"POST","/v1/accounts:lookup",e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ts(t){if(t)try{const e=new Date(Number(t));if(!isNaN(e.getTime()))return e.toUTCString()}catch{}}async function oN(t,e=!1){const n=re(t),i=await n.getIdToken(e),s=Iu(i);I(s&&s.exp&&s.auth_time&&s.iat,n.auth,"internal-error");const r=typeof s.firebase=="object"?s.firebase:void 0,o=r?.sign_in_provider;return{claims:s,token:i,authTime:Ts(Ya(s.auth_time)),issuedAtTime:Ts(Ya(s.iat)),expirationTime:Ts(Ya(s.exp)),signInProvider:o||null,signInSecondFactor:r?.sign_in_second_factor||null}}function Ya(t){return Number(t)*1e3}function Iu(t){const[e,n,i]=t.split(".");if(e===void 0||n===void 0||i===void 0)return Mr("JWT malformed, contained fewer than 3 sections"),null;try{const s=Gr(n);return s?JSON.parse(s):(Mr("Failed to decode base64 JWT payload"),null)}catch(s){return Mr("Caught error parsing JWT payload as JSON",s?.toString()),null}}function gf(t){const e=Iu(t);return I(e,"internal-error"),I(typeof e.exp<"u","internal-error"),I(typeof e.iat<"u","internal-error"),Number(e.exp)-Number(e.iat)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function qs(t,e,n=!1){if(n)return e;try{return await e}catch(i){throw i instanceof jt&&aN(i)&&t.auth.currentUser===t&&await t.auth.signOut(),i}}function aN({code:t}){return t==="auth/user-disabled"||t==="auth/user-token-expired"}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class cN{constructor(e){this.user=e,this.isRunning=!1,this.timerId=null,this.errorBackoff=3e4}_start(){this.isRunning||(this.isRunning=!0,this.schedule())}_stop(){this.isRunning&&(this.isRunning=!1,this.timerId!==null&&clearTimeout(this.timerId))}getInterval(e){if(e){const n=this.errorBackoff;return this.errorBackoff=Math.min(this.errorBackoff*2,96e4),n}else{this.errorBackoff=3e4;const i=(this.user.stsTokenManager.expirationTime??0)-Date.now()-3e5;return Math.max(0,i)}}schedule(e=!1){if(!this.isRunning)return;const n=this.getInterval(e);this.timerId=setTimeout(async()=>{await this.iteration()},n)}async iteration(){try{await this.user.getIdToken(!0)}catch(e){e?.code==="auth/network-request-failed"&&this.schedule(!0);return}this.schedule()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Xc{constructor(e,n){this.createdAt=e,this.lastLoginAt=n,this._initializeTime()}_initializeTime(){this.lastSignInTime=Ts(this.lastLoginAt),this.creationTime=Ts(this.createdAt)}_copy(e){this.createdAt=e.createdAt,this.lastLoginAt=e.lastLoginAt,this._initializeTime()}toJSON(){return{createdAt:this.createdAt,lastLoginAt:this.lastLoginAt}}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function go(t){const e=t.auth,n=await t.getIdToken(),i=await qs(t,po(e,{idToken:n}));I(i?.users.length,e,"internal-error");const s=i.users[0];t._notifyReloadListener(s);const r=s.providerUserInfo?.length?Zm(s.providerUserInfo):[],o=uN(t.providerData,r),a=t.isAnonymous,c=!(t.email&&s.passwordHash)&&!o?.length,l=a?c:!1,u={uid:s.localId,displayName:s.displayName||null,photoURL:s.photoUrl||null,email:s.email||null,emailVerified:s.emailVerified||!1,phoneNumber:s.phoneNumber||null,tenantId:s.tenantId||null,providerData:o,metadata:new Xc(s.createdAt,s.lastLoginAt),isAnonymous:l};Object.assign(t,u)}async function lN(t){const e=re(t);await go(e),await e.auth._persistUserIfCurrent(e),e.auth._notifyListenersIfCurrent(e)}function uN(t,e){return[...t.filter(i=>!e.some(s=>s.providerId===i.providerId)),...e]}function Zm(t){return t.map(({providerId:e,...n})=>({providerId:e,uid:n.rawId||"",displayName:n.displayName||null,email:n.email||null,phoneNumber:n.phoneNumber||null,photoURL:n.photoUrl||null}))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function dN(t,e){const n=await Xm(t,{},async()=>{const i=Gi({grant_type:"refresh_token",refresh_token:e}).slice(1),{tokenApiHost:s,apiKey:r}=t.config,o=await Qm(t,s,"/v1/token",`key=${r}`),a=await t._getAdditionalHeaders();a["Content-Type"]="application/x-www-form-urlencoded";const c={method:"POST",headers:a,body:i};return t.emulatorConfig&&zi(t.emulatorConfig.host)&&(c.credentials="include"),Jm.fetch()(o,c)});return{accessToken:n.access_token,expiresIn:n.expires_in,refreshToken:n.refresh_token}}async function hN(t,e){return Zi(t,"POST","/v2/accounts:revokeToken",Su(t,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class pi{constructor(){this.refreshToken=null,this.accessToken=null,this.expirationTime=null}get isExpired(){return!this.expirationTime||Date.now()>this.expirationTime-3e4}updateFromServerResponse(e){I(e.idToken,"internal-error"),I(typeof e.idToken<"u","internal-error"),I(typeof e.refreshToken<"u","internal-error");const n="expiresIn"in e&&typeof e.expiresIn<"u"?Number(e.expiresIn):gf(e.idToken);this.updateTokensAndExpiration(e.idToken,e.refreshToken,n)}updateFromIdToken(e){I(e.length!==0,"internal-error");const n=gf(e);this.updateTokensAndExpiration(e,null,n)}async getToken(e,n=!1){return!n&&this.accessToken&&!this.isExpired?this.accessToken:(I(this.refreshToken,e,"user-token-expired"),this.refreshToken?(await this.refresh(e,this.refreshToken),this.accessToken):null)}clearRefreshToken(){this.refreshToken=null}async refresh(e,n){const{accessToken:i,refreshToken:s,expiresIn:r}=await dN(e,n);this.updateTokensAndExpiration(i,s,Number(r))}updateTokensAndExpiration(e,n,i){this.refreshToken=n||null,this.accessToken=e||null,this.expirationTime=Date.now()+i*1e3}static fromJSON(e,n){const{refreshToken:i,accessToken:s,expirationTime:r}=n,o=new pi;return i&&(I(typeof i=="string","internal-error",{appName:e}),o.refreshToken=i),s&&(I(typeof s=="string","internal-error",{appName:e}),o.accessToken=s),r&&(I(typeof r=="number","internal-error",{appName:e}),o.expirationTime=r),o}toJSON(){return{refreshToken:this.refreshToken,accessToken:this.accessToken,expirationTime:this.expirationTime}}_assign(e){this.accessToken=e.accessToken,this.refreshToken=e.refreshToken,this.expirationTime=e.expirationTime}_clone(){return Object.assign(new pi,this.toJSON())}_performRefresh(){return At("not implemented")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Gt(t,e){I(typeof t=="string"||typeof t>"u","internal-error",{appName:e})}class ct{constructor({uid:e,auth:n,stsTokenManager:i,...s}){this.providerId="firebase",this.proactiveRefresh=new cN(this),this.reloadUserInfo=null,this.reloadListener=null,this.uid=e,this.auth=n,this.stsTokenManager=i,this.accessToken=i.accessToken,this.displayName=s.displayName||null,this.email=s.email||null,this.emailVerified=s.emailVerified||!1,this.phoneNumber=s.phoneNumber||null,this.photoURL=s.photoURL||null,this.isAnonymous=s.isAnonymous||!1,this.tenantId=s.tenantId||null,this.providerData=s.providerData?[...s.providerData]:[],this.metadata=new Xc(s.createdAt||void 0,s.lastLoginAt||void 0)}async getIdToken(e){const n=await qs(this,this.stsTokenManager.getToken(this.auth,e));return I(n,this.auth,"internal-error"),this.accessToken!==n&&(this.accessToken=n,await this.auth._persistUserIfCurrent(this),this.auth._notifyListenersIfCurrent(this)),n}getIdTokenResult(e){return oN(this,e)}reload(){return lN(this)}_assign(e){this!==e&&(I(this.uid===e.uid,this.auth,"internal-error"),this.displayName=e.displayName,this.photoURL=e.photoURL,this.email=e.email,this.emailVerified=e.emailVerified,this.phoneNumber=e.phoneNumber,this.isAnonymous=e.isAnonymous,this.tenantId=e.tenantId,this.providerData=e.providerData.map(n=>({...n})),this.metadata._copy(e.metadata),this.stsTokenManager._assign(e.stsTokenManager))}_clone(e){const n=new ct({...this,auth:e,stsTokenManager:this.stsTokenManager._clone()});return n.metadata._copy(this.metadata),n}_onReload(e){I(!this.reloadListener,this.auth,"internal-error"),this.reloadListener=e,this.reloadUserInfo&&(this._notifyReloadListener(this.reloadUserInfo),this.reloadUserInfo=null)}_notifyReloadListener(e){this.reloadListener?this.reloadListener(e):this.reloadUserInfo=e}_startProactiveRefresh(){this.proactiveRefresh._start()}_stopProactiveRefresh(){this.proactiveRefresh._stop()}async _updateTokensIfNecessary(e,n=!1){let i=!1;e.idToken&&e.idToken!==this.stsTokenManager.accessToken&&(this.stsTokenManager.updateFromServerResponse(e),i=!0),n&&await go(this),await this.auth._persistUserIfCurrent(this),i&&this.auth._notifyListenersIfCurrent(this)}async delete(){if(st(this.auth.app))return Promise.reject(Un(this.auth));const e=await this.getIdToken();return await qs(this,rN(this.auth,{idToken:e})),this.stsTokenManager.clearRefreshToken(),this.auth.signOut()}toJSON(){return{uid:this.uid,email:this.email||void 0,emailVerified:this.emailVerified,displayName:this.displayName||void 0,isAnonymous:this.isAnonymous,photoURL:this.photoURL||void 0,phoneNumber:this.phoneNumber||void 0,tenantId:this.tenantId||void 0,providerData:this.providerData.map(e=>({...e})),stsTokenManager:this.stsTokenManager.toJSON(),_redirectEventId:this._redirectEventId,...this.metadata.toJSON(),apiKey:this.auth.config.apiKey,appName:this.auth.name}}get refreshToken(){return this.stsTokenManager.refreshToken||""}static _fromJSON(e,n){const i=n.displayName??void 0,s=n.email??void 0,r=n.phoneNumber??void 0,o=n.photoURL??void 0,a=n.tenantId??void 0,c=n._redirectEventId??void 0,l=n.createdAt??void 0,u=n.lastLoginAt??void 0,{uid:d,emailVerified:h,isAnonymous:f,providerData:p,stsTokenManager:_}=n;I(d&&_,e,"internal-error");const m=pi.fromJSON(this.name,_);I(typeof d=="string",e,"internal-error"),Gt(i,e.name),Gt(s,e.name),I(typeof h=="boolean",e,"internal-error"),I(typeof f=="boolean",e,"internal-error"),Gt(r,e.name),Gt(o,e.name),Gt(a,e.name),Gt(c,e.name),Gt(l,e.name),Gt(u,e.name);const A=new ct({uid:d,auth:e,email:s,emailVerified:h,displayName:i,isAnonymous:f,photoURL:o,phoneNumber:r,tenantId:a,stsTokenManager:m,createdAt:l,lastLoginAt:u});return p&&Array.isArray(p)&&(A.providerData=p.map(x=>({...x}))),c&&(A._redirectEventId=c),A}static async _fromIdTokenResponse(e,n,i=!1){const s=new pi;s.updateFromServerResponse(n);const r=new ct({uid:n.localId,auth:e,stsTokenManager:s,isAnonymous:i});return await go(r),r}static async _fromGetAccountInfoResponse(e,n,i){const s=n.users[0];I(s.localId!==void 0,"internal-error");const r=s.providerUserInfo!==void 0?Zm(s.providerUserInfo):[],o=!(s.email&&s.passwordHash)&&!r?.length,a=new pi;a.updateFromIdToken(i);const c=new ct({uid:s.localId,auth:e,stsTokenManager:a,isAnonymous:o}),l={uid:s.localId,displayName:s.displayName||null,photoURL:s.photoUrl||null,email:s.email||null,emailVerified:s.emailVerified||!1,phoneNumber:s.phoneNumber||null,tenantId:s.tenantId||null,providerData:r,metadata:new Xc(s.createdAt,s.lastLoginAt),isAnonymous:!(s.email&&s.passwordHash)&&!r?.length};return Object.assign(c,l),c}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const mf=new Map;function Nt(t){Bt(t instanceof Function,"Expected a class definition");let e=mf.get(t);return e?(Bt(e instanceof t,"Instance stored in cache mismatched with class"),e):(e=new t,mf.set(t,e),e)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class e_{constructor(){this.type="NONE",this.storage={}}async _isAvailable(){return!0}async _set(e,n){this.storage[e]=n}async _get(e){const n=this.storage[e];return n===void 0?null:n}async _remove(e){delete this.storage[e]}_addListener(e,n){}_removeListener(e,n){}}e_.type="NONE";const Qc=e_;/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function xr(t,e,n){return`firebase:${t}:${e}:${n}`}class gi{constructor(e,n,i){this.persistence=e,this.auth=n,this.userKey=i;const{config:s,name:r}=this.auth;this.fullUserKey=xr(this.userKey,s.apiKey,r),this.fullPersistenceKey=xr("persistence",s.apiKey,r),this.boundEventHandler=n._onStorageEvent.bind(n),this.persistence._addListener(this.fullUserKey,this.boundEventHandler)}setCurrentUser(e){return this.persistence._set(this.fullUserKey,e.toJSON())}async getCurrentUser(){const e=await this.persistence._get(this.fullUserKey);if(!e)return null;if(typeof e=="string"){const n=await po(this.auth,{idToken:e}).catch(()=>{});return n?ct._fromGetAccountInfoResponse(this.auth,n,e):null}return ct._fromJSON(this.auth,e)}removeCurrentUser(){return this.persistence._remove(this.fullUserKey)}savePersistenceForRedirect(){return this.persistence._set(this.fullPersistenceKey,this.persistence.type)}async setPersistence(e){if(this.persistence===e)return;const n=await this.getCurrentUser();if(await this.removeCurrentUser(),this.persistence=e,n)return this.setCurrentUser(n)}delete(){this.persistence._removeListener(this.fullUserKey,this.boundEventHandler)}static async create(e,n,i="authUser"){if(!n.length)return new gi(Nt(Qc),e,i);const s=(await Promise.all(n.map(async l=>{if(await l._isAvailable())return l}))).filter(l=>l);let r=s[0]||Nt(Qc);const o=xr(i,e.config.apiKey,e.name);let a=null;for(const l of n)try{const u=await l._get(o);if(u){let d;if(typeof u=="string"){const h=await po(e,{idToken:u}).catch(()=>{});if(!h)break;d=await ct._fromGetAccountInfoResponse(e,h,u)}else d=ct._fromJSON(e,u);l!==r&&(a=d),r=l;break}}catch{}const c=s.filter(l=>l._shouldAllowMigration);return!r._shouldAllowMigration||!c.length?new gi(r,e,i):(r=c[0],a&&await r._set(o,a.toJSON()),await Promise.all(n.map(async l=>{if(l!==r)try{await l._remove(o)}catch{}})),new gi(r,e,i))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function _f(t){const e=t.toLowerCase();if(e.includes("opera/")||e.includes("opr/")||e.includes("opios/"))return"Opera";if(s_(e))return"IEMobile";if(e.includes("msie")||e.includes("trident/"))return"IE";if(e.includes("edge/"))return"Edge";if(t_(e))return"Firefox";if(e.includes("silk/"))return"Silk";if(o_(e))return"Blackberry";if(a_(e))return"Webos";if(n_(e))return"Safari";if((e.includes("chrome/")||i_(e))&&!e.includes("edge/"))return"Chrome";if(r_(e))return"Android";{const n=/([a-zA-Z\d\.]+)\/[a-zA-Z\d\.]*$/,i=t.match(n);if(i?.length===2)return i[1]}return"Other"}function t_(t=Pe()){return/firefox\//i.test(t)}function n_(t=Pe()){const e=t.toLowerCase();return e.includes("safari/")&&!e.includes("chrome/")&&!e.includes("crios/")&&!e.includes("android")}function i_(t=Pe()){return/crios\//i.test(t)}function s_(t=Pe()){return/iemobile/i.test(t)}function r_(t=Pe()){return/android/i.test(t)}function o_(t=Pe()){return/blackberry/i.test(t)}function a_(t=Pe()){return/webos/i.test(t)}function ku(t=Pe()){return/iphone|ipad|ipod/i.test(t)||/macintosh/i.test(t)&&/mobile/i.test(t)}function fN(t=Pe()){return ku(t)&&!!window.navigator?.standalone}function pN(){return mT()&&document.documentMode===10}function c_(t=Pe()){return ku(t)||r_(t)||a_(t)||o_(t)||/windows phone/i.test(t)||s_(t)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function l_(t,e=[]){let n;switch(t){case"Browser":n=_f(Pe());break;case"Worker":n=`${_f(Pe())}-${t}`;break;default:n=t}const i=e.length?e.join(","):"FirebaseCore-web";return`${n}/JsCore/${Ki}/${i}`}/**
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
 */class gN{constructor(e){this.auth=e,this.queue=[]}pushCallback(e,n){const i=r=>new Promise((o,a)=>{try{const c=e(r);o(c)}catch(c){a(c)}});i.onAbort=n,this.queue.push(i);const s=this.queue.length-1;return()=>{this.queue[s]=()=>Promise.resolve()}}async runMiddleware(e){if(this.auth.currentUser===e)return;const n=[];try{for(const i of this.queue)await i(e),i.onAbort&&n.push(i.onAbort)}catch(i){n.reverse();for(const s of n)try{s()}catch{}throw this.auth._errorFactory.create("login-blocked",{originalMessage:i?.message})}}}/**
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
 */async function mN(t,e={}){return Zi(t,"GET","/v2/passwordPolicy",Su(t,e))}/**
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
 */const _N=6;class yN{constructor(e){const n=e.customStrengthOptions;this.customStrengthOptions={},this.customStrengthOptions.minPasswordLength=n.minPasswordLength??_N,n.maxPasswordLength&&(this.customStrengthOptions.maxPasswordLength=n.maxPasswordLength),n.containsLowercaseCharacter!==void 0&&(this.customStrengthOptions.containsLowercaseLetter=n.containsLowercaseCharacter),n.containsUppercaseCharacter!==void 0&&(this.customStrengthOptions.containsUppercaseLetter=n.containsUppercaseCharacter),n.containsNumericCharacter!==void 0&&(this.customStrengthOptions.containsNumericCharacter=n.containsNumericCharacter),n.containsNonAlphanumericCharacter!==void 0&&(this.customStrengthOptions.containsNonAlphanumericCharacter=n.containsNonAlphanumericCharacter),this.enforcementState=e.enforcementState,this.enforcementState==="ENFORCEMENT_STATE_UNSPECIFIED"&&(this.enforcementState="OFF"),this.allowedNonAlphanumericCharacters=e.allowedNonAlphanumericCharacters?.join("")??"",this.forceUpgradeOnSignin=e.forceUpgradeOnSignin??!1,this.schemaVersion=e.schemaVersion}validatePassword(e){const n={isValid:!0,passwordPolicy:this};return this.validatePasswordLengthOptions(e,n),this.validatePasswordCharacterOptions(e,n),n.isValid&&(n.isValid=n.meetsMinPasswordLength??!0),n.isValid&&(n.isValid=n.meetsMaxPasswordLength??!0),n.isValid&&(n.isValid=n.containsLowercaseLetter??!0),n.isValid&&(n.isValid=n.containsUppercaseLetter??!0),n.isValid&&(n.isValid=n.containsNumericCharacter??!0),n.isValid&&(n.isValid=n.containsNonAlphanumericCharacter??!0),n}validatePasswordLengthOptions(e,n){const i=this.customStrengthOptions.minPasswordLength,s=this.customStrengthOptions.maxPasswordLength;i&&(n.meetsMinPasswordLength=e.length>=i),s&&(n.meetsMaxPasswordLength=e.length<=s)}validatePasswordCharacterOptions(e,n){this.updatePasswordCharacterOptionsStatuses(n,!1,!1,!1,!1);let i;for(let s=0;s<e.length;s++)i=e.charAt(s),this.updatePasswordCharacterOptionsStatuses(n,i>="a"&&i<="z",i>="A"&&i<="Z",i>="0"&&i<="9",this.allowedNonAlphanumericCharacters.includes(i))}updatePasswordCharacterOptionsStatuses(e,n,i,s,r){this.customStrengthOptions.containsLowercaseLetter&&(e.containsLowercaseLetter||(e.containsLowercaseLetter=n)),this.customStrengthOptions.containsUppercaseLetter&&(e.containsUppercaseLetter||(e.containsUppercaseLetter=i)),this.customStrengthOptions.containsNumericCharacter&&(e.containsNumericCharacter||(e.containsNumericCharacter=s)),this.customStrengthOptions.containsNonAlphanumericCharacter&&(e.containsNonAlphanumericCharacter||(e.containsNonAlphanumericCharacter=r))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class wN{constructor(e,n,i,s){this.app=e,this.heartbeatServiceProvider=n,this.appCheckServiceProvider=i,this.config=s,this.currentUser=null,this.emulatorConfig=null,this.operations=Promise.resolve(),this.authStateSubscription=new yf(this),this.idTokenSubscription=new yf(this),this.beforeStateQueue=new gN(this),this.redirectUser=null,this.isProactiveRefreshEnabled=!1,this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION=1,this._canInitEmulator=!0,this._isInitialized=!1,this._deleted=!1,this._initializationPromise=null,this._popupRedirectResolver=null,this._errorFactory=Ym,this._agentRecaptchaConfig=null,this._tenantRecaptchaConfigs={},this._projectPasswordPolicy=null,this._tenantPasswordPolicies={},this._resolvePersistenceManagerAvailable=void 0,this.lastNotifiedUid=void 0,this.languageCode=null,this.tenantId=null,this.settings={appVerificationDisabledForTesting:!1},this.frameworks=[],this.name=e.name,this.clientVersion=s.sdkClientVersion,this._persistenceManagerAvailable=new Promise(r=>this._resolvePersistenceManagerAvailable=r)}_initializeWithPersistence(e,n){return n&&(this._popupRedirectResolver=Nt(n)),this._initializationPromise=this.queue(async()=>{if(!this._deleted&&(this.persistenceManager=await gi.create(this,e),this._resolvePersistenceManagerAvailable?.(),!this._deleted)){if(this._popupRedirectResolver?._shouldInitProactively)try{await this._popupRedirectResolver._initialize(this)}catch{}await this.initializeCurrentUser(n),this.lastNotifiedUid=this.currentUser?.uid||null,!this._deleted&&(this._isInitialized=!0)}}),this._initializationPromise}async _onStorageEvent(){if(this._deleted)return;const e=await this.assertedPersistence.getCurrentUser();if(!(!this.currentUser&&!e)){if(this.currentUser&&e&&this.currentUser.uid===e.uid){this._currentUser._assign(e),await this.currentUser.getIdToken();return}await this._updateCurrentUser(e,!0)}}async initializeCurrentUserFromIdToken(e){try{const n=await po(this,{idToken:e}),i=await ct._fromGetAccountInfoResponse(this,n,e);await this.directlySetCurrentUser(i)}catch(n){console.warn("FirebaseServerApp could not login user with provided authIdToken: ",n),await this.directlySetCurrentUser(null)}}async initializeCurrentUser(e){if(st(this.app)){const r=this.app.settings.authIdToken;return r?new Promise(o=>{setTimeout(()=>this.initializeCurrentUserFromIdToken(r).then(o,o))}):this.directlySetCurrentUser(null)}const n=await this.assertedPersistence.getCurrentUser();let i=n,s=!1;if(e&&this.config.authDomain){await this.getOrInitRedirectPersistenceManager();const r=this.redirectUser?._redirectEventId,o=i?._redirectEventId,a=await this.tryRedirectSignIn(e);(!r||r===o)&&a?.user&&(i=a.user,s=!0)}if(!i)return this.directlySetCurrentUser(null);if(!i._redirectEventId){if(s)try{await this.beforeStateQueue.runMiddleware(i)}catch(r){i=n,this._popupRedirectResolver._overrideRedirectResult(this,()=>Promise.reject(r))}return i?this.reloadAndSetCurrentUserOrClear(i):this.directlySetCurrentUser(null)}return I(this._popupRedirectResolver,this,"argument-error"),await this.getOrInitRedirectPersistenceManager(),this.redirectUser&&this.redirectUser._redirectEventId===i._redirectEventId?this.directlySetCurrentUser(i):this.reloadAndSetCurrentUserOrClear(i)}async tryRedirectSignIn(e){let n=null;try{n=await this._popupRedirectResolver._completeRedirectFn(this,e,!0)}catch{await this._setRedirectUser(null)}return n}async reloadAndSetCurrentUserOrClear(e){try{await go(e)}catch(n){if(n?.code!=="auth/network-request-failed")return this.directlySetCurrentUser(null)}return this.directlySetCurrentUser(e)}useDeviceLanguage(){this.languageCode=ZA()}async _delete(){this._deleted=!0}async updateCurrentUser(e){if(st(this.app))return Promise.reject(Un(this));const n=e?re(e):null;return n&&I(n.auth.config.apiKey===this.config.apiKey,this,"invalid-user-token"),this._updateCurrentUser(n&&n._clone(this))}async _updateCurrentUser(e,n=!1){if(!this._deleted)return e&&I(this.tenantId===e.tenantId,this,"tenant-id-mismatch"),n||await this.beforeStateQueue.runMiddleware(e),this.queue(async()=>{await this.directlySetCurrentUser(e),this.notifyAuthListeners()})}async signOut(){return st(this.app)?Promise.reject(Un(this)):(await this.beforeStateQueue.runMiddleware(null),(this.redirectPersistenceManager||this._popupRedirectResolver)&&await this._setRedirectUser(null),this._updateCurrentUser(null,!0))}setPersistence(e){return st(this.app)?Promise.reject(Un(this)):this.queue(async()=>{await this.assertedPersistence.setPersistence(Nt(e))})}_getRecaptchaConfig(){return this.tenantId==null?this._agentRecaptchaConfig:this._tenantRecaptchaConfigs[this.tenantId]}async validatePassword(e){this._getPasswordPolicyInternal()||await this._updatePasswordPolicy();const n=this._getPasswordPolicyInternal();return n.schemaVersion!==this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION?Promise.reject(this._errorFactory.create("unsupported-password-policy-schema-version",{})):n.validatePassword(e)}_getPasswordPolicyInternal(){return this.tenantId===null?this._projectPasswordPolicy:this._tenantPasswordPolicies[this.tenantId]}async _updatePasswordPolicy(){const e=await mN(this),n=new yN(e);this.tenantId===null?this._projectPasswordPolicy=n:this._tenantPasswordPolicies[this.tenantId]=n}_getPersistenceType(){return this.assertedPersistence.persistence.type}_getPersistence(){return this.assertedPersistence.persistence}_updateErrorMap(e){this._errorFactory=new wn("auth","Firebase",e())}onAuthStateChanged(e,n,i){return this.registerStateListener(this.authStateSubscription,e,n,i)}beforeAuthStateChanged(e,n){return this.beforeStateQueue.pushCallback(e,n)}onIdTokenChanged(e,n,i){return this.registerStateListener(this.idTokenSubscription,e,n,i)}authStateReady(){return new Promise((e,n)=>{if(this.currentUser)e();else{const i=this.onAuthStateChanged(()=>{i(),e()},n)}})}async revokeAccessToken(e){if(this.currentUser){const n=await this.currentUser.getIdToken(),i={providerId:"apple.com",tokenType:"ACCESS_TOKEN",token:e,idToken:n};this.tenantId!=null&&(i.tenantId=this.tenantId),await hN(this,i)}}toJSON(){return{apiKey:this.config.apiKey,authDomain:this.config.authDomain,appName:this.name,currentUser:this._currentUser?.toJSON()}}async _setRedirectUser(e,n){const i=await this.getOrInitRedirectPersistenceManager(n);return e===null?i.removeCurrentUser():i.setCurrentUser(e)}async getOrInitRedirectPersistenceManager(e){if(!this.redirectPersistenceManager){const n=e&&Nt(e)||this._popupRedirectResolver;I(n,this,"argument-error"),this.redirectPersistenceManager=await gi.create(this,[Nt(n._redirectPersistence)],"redirectUser"),this.redirectUser=await this.redirectPersistenceManager.getCurrentUser()}return this.redirectPersistenceManager}async _redirectUserForId(e){return this._isInitialized&&await this.queue(async()=>{}),this._currentUser?._redirectEventId===e?this._currentUser:this.redirectUser?._redirectEventId===e?this.redirectUser:null}async _persistUserIfCurrent(e){if(e===this.currentUser)return this.queue(async()=>this.directlySetCurrentUser(e))}_notifyListenersIfCurrent(e){e===this.currentUser&&this.notifyAuthListeners()}_key(){return`${this.config.authDomain}:${this.config.apiKey}:${this.name}`}_startProactiveRefresh(){this.isProactiveRefreshEnabled=!0,this.currentUser&&this._currentUser._startProactiveRefresh()}_stopProactiveRefresh(){this.isProactiveRefreshEnabled=!1,this.currentUser&&this._currentUser._stopProactiveRefresh()}get _currentUser(){return this.currentUser}notifyAuthListeners(){if(!this._isInitialized)return;this.idTokenSubscription.next(this.currentUser);const e=this.currentUser?.uid??null;this.lastNotifiedUid!==e&&(this.lastNotifiedUid=e,this.authStateSubscription.next(this.currentUser))}registerStateListener(e,n,i,s){if(this._deleted)return()=>{};const r=typeof n=="function"?n:n.next.bind(n);let o=!1;const a=this._isInitialized?Promise.resolve():this._initializationPromise;if(I(a,this,"internal-error"),a.then(()=>{o||r(this.currentUser)}),typeof n=="function"){const c=e.addObserver(n,i,s);return()=>{o=!0,c()}}else{const c=e.addObserver(n);return()=>{o=!0,c()}}}async directlySetCurrentUser(e){this.currentUser&&this.currentUser!==e&&this._currentUser._stopProactiveRefresh(),e&&this.isProactiveRefreshEnabled&&e._startProactiveRefresh(),this.currentUser=e,e?await this.assertedPersistence.setCurrentUser(e):await this.assertedPersistence.removeCurrentUser()}queue(e){return this.operations=this.operations.then(e,e),this.operations}get assertedPersistence(){return I(this.persistenceManager,this,"internal-error"),this.persistenceManager}_logFramework(e){!e||this.frameworks.includes(e)||(this.frameworks.push(e),this.frameworks.sort(),this.clientVersion=l_(this.config.clientPlatform,this._getFrameworks()))}_getFrameworks(){return this.frameworks}async _getAdditionalHeaders(){const e={"X-Client-Version":this.clientVersion};this.app.options.appId&&(e["X-Firebase-gmpid"]=this.app.options.appId);const n=await this.heartbeatServiceProvider.getImmediate({optional:!0})?.getHeartbeatsHeader();n&&(e["X-Firebase-Client"]=n);const i=await this._getAppCheckToken();return i&&(e["X-Firebase-AppCheck"]=i),e}async _getAppCheckToken(){if(st(this.app)&&this.app.settings.appCheckToken)return this.app.settings.appCheckToken;const e=await this.appCheckServiceProvider.getImmediate({optional:!0})?.getToken();return e?.error&&YA(`Error while retrieving App Check token: ${e.error}`),e?.token}}function es(t){return re(t)}class yf{constructor(e){this.auth=e,this.observer=null,this.addObserver=ST(n=>this.observer=n)}get next(){return I(this.observer,this.auth,"internal-error"),this.observer.next.bind(this.observer)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Ru={async loadJS(){throw new Error("Unable to load external scripts")},recaptchaV2Script:"",recaptchaEnterpriseScript:"",gapiScript:""};function vN(t){Ru=t}function bN(t){return Ru.loadJS(t)}function EN(){return Ru.gapiScript}function CN(t){return`__${t}${Math.floor(Math.random()*1e6)}`}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function TN(t,e){const n=vn(t,"auth");if(n.isInitialized()){const s=n.getImmediate(),r=n.getOptions();if(Vn(r,e??{}))return s;bt(s,"already-initialized")}return n.initialize({options:e})}function SN(t,e){const n=e?.persistence||[],i=(Array.isArray(n)?n:[n]).map(Nt);e?.errorMap&&t._updateErrorMap(e.errorMap),t._initializeWithPersistence(i,e?.popupRedirectResolver)}function IN(t,e,n){const i=es(t);I(/^https?:\/\//.test(e),i,"invalid-emulator-scheme");const s=!1,r=u_(e),{host:o,port:a}=kN(e),c=a===null?"":`:${a}`,l={url:`${r}//${o}${c}/`},u=Object.freeze({host:o,port:a,protocol:r.replace(":",""),options:Object.freeze({disableWarnings:s})});if(!i._canInitEmulator){I(i.config.emulator&&i.emulatorConfig,i,"emulator-config-failed"),I(Vn(l,i.config.emulator)&&Vn(u,i.emulatorConfig),i,"emulator-config-failed");return}i.config.emulator=l,i.emulatorConfig=u,i.settings.appVerificationDisabledForTesting=!0,zi(o)?(cg(`${r}//${o}${c}`),lg("Auth",!0)):RN()}function u_(t){const e=t.indexOf(":");return e<0?"":t.substr(0,e+1)}function kN(t){const e=u_(t),n=/(\/\/)?([^?#/]+)/.exec(t.substr(e.length));if(!n)return{host:"",port:null};const i=n[2].split("@").pop()||"",s=/^(\[[^\]]+\])(:|$)/.exec(i);if(s){const r=s[1];return{host:r,port:wf(i.substr(r.length+1))}}else{const[r,o]=i.split(":");return{host:r,port:wf(o)}}}function wf(t){if(!t)return null;const e=Number(t);return isNaN(e)?null:e}function RN(){function t(){const e=document.createElement("p"),n=e.style;e.innerText="Running in emulator mode. Do not use with production credentials.",n.position="fixed",n.width="100%",n.backgroundColor="#ffffff",n.border=".1em solid #000000",n.color="#b50000",n.bottom="0px",n.left="0px",n.margin="0px",n.zIndex="10000",n.textAlign="center",e.classList.add("firebase-emulator-warning"),document.body.appendChild(e)}typeof console<"u"&&typeof console.info=="function"&&console.info("WARNING: You are using the Auth Emulator, which is intended for local testing only.  Do not use with production credentials."),typeof window<"u"&&typeof document<"u"&&(document.readyState==="loading"?window.addEventListener("DOMContentLoaded",t):t())}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class d_{constructor(e,n){this.providerId=e,this.signInMethod=n}toJSON(){return At("not implemented")}_getIdTokenResponse(e){return At("not implemented")}_linkToIdToken(e,n){return At("not implemented")}_getReauthenticationResolver(e){return At("not implemented")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function mi(t,e){return iN(t,"POST","/v1/accounts:signInWithIdp",Su(t,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const AN="http://localhost";class zn extends d_{constructor(){super(...arguments),this.pendingToken=null}static _fromParams(e){const n=new zn(e.providerId,e.signInMethod);return e.idToken||e.accessToken?(e.idToken&&(n.idToken=e.idToken),e.accessToken&&(n.accessToken=e.accessToken),e.nonce&&!e.pendingToken&&(n.nonce=e.nonce),e.pendingToken&&(n.pendingToken=e.pendingToken)):e.oauthToken&&e.oauthTokenSecret?(n.accessToken=e.oauthToken,n.secret=e.oauthTokenSecret):bt("argument-error"),n}toJSON(){return{idToken:this.idToken,accessToken:this.accessToken,secret:this.secret,nonce:this.nonce,pendingToken:this.pendingToken,providerId:this.providerId,signInMethod:this.signInMethod}}static fromJSON(e){const n=typeof e=="string"?JSON.parse(e):e,{providerId:i,signInMethod:s,...r}=n;if(!i||!s)return null;const o=new zn(i,s);return o.idToken=r.idToken||void 0,o.accessToken=r.accessToken||void 0,o.secret=r.secret,o.nonce=r.nonce,o.pendingToken=r.pendingToken||null,o}_getIdTokenResponse(e){const n=this.buildRequest();return mi(e,n)}_linkToIdToken(e,n){const i=this.buildRequest();return i.idToken=n,mi(e,i)}_getReauthenticationResolver(e){const n=this.buildRequest();return n.autoCreate=!1,mi(e,n)}buildRequest(){const e={requestUri:AN,returnSecureToken:!0};if(this.pendingToken)e.pendingToken=this.pendingToken;else{const n={};this.idToken&&(n.id_token=this.idToken),this.accessToken&&(n.access_token=this.accessToken),this.secret&&(n.oauth_token_secret=this.secret),n.providerId=this.providerId,this.nonce&&!this.pendingToken&&(n.nonce=this.nonce),e.postBody=Gi(n)}return e}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Au{constructor(e){this.providerId=e,this.defaultLanguageCode=null,this.customParameters={}}setDefaultLanguage(e){this.defaultLanguageCode=e}setCustomParameters(e){return this.customParameters=e,this}getCustomParameters(){return this.customParameters}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class dr extends Au{constructor(){super(...arguments),this.scopes=[]}addScope(e){return this.scopes.includes(e)||this.scopes.push(e),this}getScopes(){return[...this.scopes]}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Kt extends dr{constructor(){super("facebook.com")}static credential(e){return zn._fromParams({providerId:Kt.PROVIDER_ID,signInMethod:Kt.FACEBOOK_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return Kt.credentialFromTaggedObject(e)}static credentialFromError(e){return Kt.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return Kt.credential(e.oauthAccessToken)}catch{return null}}}Kt.FACEBOOK_SIGN_IN_METHOD="facebook.com";Kt.PROVIDER_ID="facebook.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class yt extends dr{constructor(){super("google.com"),this.addScope("profile")}static credential(e,n){return zn._fromParams({providerId:yt.PROVIDER_ID,signInMethod:yt.GOOGLE_SIGN_IN_METHOD,idToken:e,accessToken:n})}static credentialFromResult(e){return yt.credentialFromTaggedObject(e)}static credentialFromError(e){return yt.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthIdToken:n,oauthAccessToken:i}=e;if(!n&&!i)return null;try{return yt.credential(n,i)}catch{return null}}}yt.GOOGLE_SIGN_IN_METHOD="google.com";yt.PROVIDER_ID="google.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Yt extends dr{constructor(){super("github.com")}static credential(e){return zn._fromParams({providerId:Yt.PROVIDER_ID,signInMethod:Yt.GITHUB_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return Yt.credentialFromTaggedObject(e)}static credentialFromError(e){return Yt.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return Yt.credential(e.oauthAccessToken)}catch{return null}}}Yt.GITHUB_SIGN_IN_METHOD="github.com";Yt.PROVIDER_ID="github.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Jt extends dr{constructor(){super("twitter.com")}static credential(e,n){return zn._fromParams({providerId:Jt.PROVIDER_ID,signInMethod:Jt.TWITTER_SIGN_IN_METHOD,oauthToken:e,oauthTokenSecret:n})}static credentialFromResult(e){return Jt.credentialFromTaggedObject(e)}static credentialFromError(e){return Jt.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthAccessToken:n,oauthTokenSecret:i}=e;if(!n||!i)return null;try{return Jt.credential(n,i)}catch{return null}}}Jt.TWITTER_SIGN_IN_METHOD="twitter.com";Jt.PROVIDER_ID="twitter.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class $i{constructor(e){this.user=e.user,this.providerId=e.providerId,this._tokenResponse=e._tokenResponse,this.operationType=e.operationType}static async _fromIdTokenResponse(e,n,i,s=!1){const r=await ct._fromIdTokenResponse(e,i,s),o=vf(i);return new $i({user:r,providerId:o,_tokenResponse:i,operationType:n})}static async _forOperation(e,n,i){await e._updateTokensIfNecessary(i,!0);const s=vf(i);return new $i({user:e,providerId:s,_tokenResponse:i,operationType:n})}}function vf(t){return t.providerId?t.providerId:"phoneNumber"in t?"phone":null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class mo extends jt{constructor(e,n,i,s){super(n.code,n.message),this.operationType=i,this.user=s,Object.setPrototypeOf(this,mo.prototype),this.customData={appName:e.name,tenantId:e.tenantId??void 0,_serverResponse:n.customData._serverResponse,operationType:i}}static _fromErrorAndOperation(e,n,i,s){return new mo(e,n,i,s)}}function h_(t,e,n,i){return(e==="reauthenticate"?n._getReauthenticationResolver(t):n._getIdTokenResponse(t)).catch(r=>{throw r.code==="auth/multi-factor-auth-required"?mo._fromErrorAndOperation(t,r,e,i):r})}async function NN(t,e,n=!1){const i=await qs(t,e._linkToIdToken(t.auth,await t.getIdToken()),n);return $i._forOperation(t,"link",i)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function PN(t,e,n=!1){const{auth:i}=t;if(st(i.app))return Promise.reject(Un(i));const s="reauthenticate";try{const r=await qs(t,h_(i,s,e,t),n);I(r.idToken,i,"internal-error");const o=Iu(r.idToken);I(o,i,"internal-error");const{sub:a}=o;return I(t.uid===a,i,"user-mismatch"),$i._forOperation(t,s,r)}catch(r){throw r?.code==="auth/user-not-found"&&bt(i,"user-mismatch"),r}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function f_(t,e,n=!1){if(st(t.app))return Promise.reject(Un(t));const i="signIn",s=await h_(t,i,e),r=await $i._fromIdTokenResponse(t,i,s);return n||await t._updateCurrentUser(r.user),r}async function LN(t,e){return f_(es(t),e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ja(t,e){return re(t).setPersistence(e)}function ON(t,e,n,i){return re(t).onIdTokenChanged(e,n,i)}function DN(t,e,n){return re(t).beforeAuthStateChanged(e,n)}function p_(t,e,n,i){return re(t).onAuthStateChanged(e,n,i)}function MN(t){return re(t).signOut()}const _o="__sak";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class g_{constructor(e,n){this.storageRetriever=e,this.type=n}_isAvailable(){try{return this.storage?(this.storage.setItem(_o,"1"),this.storage.removeItem(_o),Promise.resolve(!0)):Promise.resolve(!1)}catch{return Promise.resolve(!1)}}_set(e,n){return this.storage.setItem(e,JSON.stringify(n)),Promise.resolve()}_get(e){const n=this.storage.getItem(e);return Promise.resolve(n?JSON.parse(n):null)}_remove(e){return this.storage.removeItem(e),Promise.resolve()}get storage(){return this.storageRetriever()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const xN=1e3,FN=10;class m_ extends g_{constructor(){super(()=>window.localStorage,"LOCAL"),this.boundEventHandler=(e,n)=>this.onStorageEvent(e,n),this.listeners={},this.localCache={},this.pollTimer=null,this.fallbackToPolling=c_(),this._shouldAllowMigration=!0}forAllChangedKeys(e){for(const n of Object.keys(this.listeners)){const i=this.storage.getItem(n),s=this.localCache[n];i!==s&&e(n,s,i)}}onStorageEvent(e,n=!1){if(!e.key){this.forAllChangedKeys((o,a,c)=>{this.notifyListeners(o,c)});return}const i=e.key;n?this.detachListener():this.stopPolling();const s=()=>{const o=this.storage.getItem(i);!n&&this.localCache[i]===o||this.notifyListeners(i,o)},r=this.storage.getItem(i);pN()&&r!==e.newValue&&e.newValue!==e.oldValue?setTimeout(s,FN):s()}notifyListeners(e,n){this.localCache[e]=n;const i=this.listeners[e];if(i)for(const s of Array.from(i))s(n&&JSON.parse(n))}startPolling(){this.stopPolling(),this.pollTimer=setInterval(()=>{this.forAllChangedKeys((e,n,i)=>{this.onStorageEvent(new StorageEvent("storage",{key:e,oldValue:n,newValue:i}),!0)})},xN)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}attachListener(){window.addEventListener("storage",this.boundEventHandler)}detachListener(){window.removeEventListener("storage",this.boundEventHandler)}_addListener(e,n){Object.keys(this.listeners).length===0&&(this.fallbackToPolling?this.startPolling():this.attachListener()),this.listeners[e]||(this.listeners[e]=new Set,this.localCache[e]=this.storage.getItem(e)),this.listeners[e].add(n)}_removeListener(e,n){this.listeners[e]&&(this.listeners[e].delete(n),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&(this.detachListener(),this.stopPolling())}async _set(e,n){await super._set(e,n),this.localCache[e]=JSON.stringify(n)}async _get(e){const n=await super._get(e);return this.localCache[e]=JSON.stringify(n),n}async _remove(e){await super._remove(e),delete this.localCache[e]}}m_.type="LOCAL";const __=m_;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class y_ extends g_{constructor(){super(()=>window.sessionStorage,"SESSION")}_addListener(e,n){}_removeListener(e,n){}}y_.type="SESSION";const w_=y_;/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function UN(t){return Promise.all(t.map(async e=>{try{return{fulfilled:!0,value:await e}}catch(n){return{fulfilled:!1,reason:n}}}))}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ua{constructor(e){this.eventTarget=e,this.handlersMap={},this.boundEventHandler=this.handleEvent.bind(this)}static _getInstance(e){const n=this.receivers.find(s=>s.isListeningto(e));if(n)return n;const i=new ua(e);return this.receivers.push(i),i}isListeningto(e){return this.eventTarget===e}async handleEvent(e){const n=e,{eventId:i,eventType:s,data:r}=n.data,o=this.handlersMap[s];if(!o?.size)return;n.ports[0].postMessage({status:"ack",eventId:i,eventType:s});const a=Array.from(o).map(async l=>l(n.origin,r)),c=await UN(a);n.ports[0].postMessage({status:"done",eventId:i,eventType:s,response:c})}_subscribe(e,n){Object.keys(this.handlersMap).length===0&&this.eventTarget.addEventListener("message",this.boundEventHandler),this.handlersMap[e]||(this.handlersMap[e]=new Set),this.handlersMap[e].add(n)}_unsubscribe(e,n){this.handlersMap[e]&&n&&this.handlersMap[e].delete(n),(!n||this.handlersMap[e].size===0)&&delete this.handlersMap[e],Object.keys(this.handlersMap).length===0&&this.eventTarget.removeEventListener("message",this.boundEventHandler)}}ua.receivers=[];/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Nu(t="",e=10){let n="";for(let i=0;i<e;i++)n+=Math.floor(Math.random()*10);return t+n}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class $N{constructor(e){this.target=e,this.handlers=new Set}removeMessageHandler(e){e.messageChannel&&(e.messageChannel.port1.removeEventListener("message",e.onMessage),e.messageChannel.port1.close()),this.handlers.delete(e)}async _send(e,n,i=50){const s=typeof MessageChannel<"u"?new MessageChannel:null;if(!s)throw new Error("connection_unavailable");let r,o;return new Promise((a,c)=>{const l=Nu("",20);s.port1.start();const u=setTimeout(()=>{c(new Error("unsupported_event"))},i);o={messageChannel:s,onMessage(d){const h=d;if(h.data.eventId===l)switch(h.data.status){case"ack":clearTimeout(u),r=setTimeout(()=>{c(new Error("timeout"))},3e3);break;case"done":clearTimeout(r),a(h.data.response);break;default:clearTimeout(u),clearTimeout(r),c(new Error("invalid_response"));break}}},this.handlers.add(o),s.port1.addEventListener("message",o.onMessage),this.target.postMessage({eventType:e,eventId:l,data:n},[s.port2])}).finally(()=>{o&&this.removeMessageHandler(o)})}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function vt(){return window}function BN(t){vt().location.href=t}/**
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
 */function v_(){return typeof vt().WorkerGlobalScope<"u"&&typeof vt().importScripts=="function"}async function HN(){if(!navigator?.serviceWorker)return null;try{return(await navigator.serviceWorker.ready).active}catch{return null}}function VN(){return navigator?.serviceWorker?.controller||null}function WN(){return v_()?self:null}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const b_="firebaseLocalStorageDb",jN=1,yo="firebaseLocalStorage",E_="fbase_key";class hr{constructor(e){this.request=e}toPromise(){return new Promise((e,n)=>{this.request.addEventListener("success",()=>{e(this.request.result)}),this.request.addEventListener("error",()=>{n(this.request.error)})})}}function da(t,e){return t.transaction([yo],e?"readwrite":"readonly").objectStore(yo)}function qN(){const t=indexedDB.deleteDatabase(b_);return new hr(t).toPromise()}function Zc(){const t=indexedDB.open(b_,jN);return new Promise((e,n)=>{t.addEventListener("error",()=>{n(t.error)}),t.addEventListener("upgradeneeded",()=>{const i=t.result;try{i.createObjectStore(yo,{keyPath:E_})}catch(s){n(s)}}),t.addEventListener("success",async()=>{const i=t.result;i.objectStoreNames.contains(yo)?e(i):(i.close(),await qN(),e(await Zc()))})})}async function bf(t,e,n){const i=da(t,!0).put({[E_]:e,value:n});return new hr(i).toPromise()}async function zN(t,e){const n=da(t,!1).get(e),i=await new hr(n).toPromise();return i===void 0?null:i.value}function Ef(t,e){const n=da(t,!0).delete(e);return new hr(n).toPromise()}const GN=800,KN=3;class C_{constructor(){this.type="LOCAL",this._shouldAllowMigration=!0,this.listeners={},this.localCache={},this.pollTimer=null,this.pendingWrites=0,this.receiver=null,this.sender=null,this.serviceWorkerReceiverAvailable=!1,this.activeServiceWorker=null,this._workerInitializationPromise=this.initializeServiceWorkerMessaging().then(()=>{},()=>{})}async _openDb(){return this.db?this.db:(this.db=await Zc(),this.db)}async _withRetries(e){let n=0;for(;;)try{const i=await this._openDb();return await e(i)}catch(i){if(n++>KN)throw i;this.db&&(this.db.close(),this.db=void 0)}}async initializeServiceWorkerMessaging(){return v_()?this.initializeReceiver():this.initializeSender()}async initializeReceiver(){this.receiver=ua._getInstance(WN()),this.receiver._subscribe("keyChanged",async(e,n)=>({keyProcessed:(await this._poll()).includes(n.key)})),this.receiver._subscribe("ping",async(e,n)=>["keyChanged"])}async initializeSender(){if(this.activeServiceWorker=await HN(),!this.activeServiceWorker)return;this.sender=new $N(this.activeServiceWorker);const e=await this.sender._send("ping",{},800);e&&e[0]?.fulfilled&&e[0]?.value.includes("keyChanged")&&(this.serviceWorkerReceiverAvailable=!0)}async notifyServiceWorker(e){if(!(!this.sender||!this.activeServiceWorker||VN()!==this.activeServiceWorker))try{await this.sender._send("keyChanged",{key:e},this.serviceWorkerReceiverAvailable?800:50)}catch{}}async _isAvailable(){try{if(!indexedDB)return!1;const e=await Zc();return await bf(e,_o,"1"),await Ef(e,_o),!0}catch{}return!1}async _withPendingWrite(e){this.pendingWrites++;try{await e()}finally{this.pendingWrites--}}async _set(e,n){return this._withPendingWrite(async()=>(await this._withRetries(i=>bf(i,e,n)),this.localCache[e]=n,this.notifyServiceWorker(e)))}async _get(e){const n=await this._withRetries(i=>zN(i,e));return this.localCache[e]=n,n}async _remove(e){return this._withPendingWrite(async()=>(await this._withRetries(n=>Ef(n,e)),delete this.localCache[e],this.notifyServiceWorker(e)))}async _poll(){const e=await this._withRetries(s=>{const r=da(s,!1).getAll();return new hr(r).toPromise()});if(!e)return[];if(this.pendingWrites!==0)return[];const n=[],i=new Set;if(e.length!==0)for(const{fbase_key:s,value:r}of e)i.add(s),JSON.stringify(this.localCache[s])!==JSON.stringify(r)&&(this.notifyListeners(s,r),n.push(s));for(const s of Object.keys(this.localCache))this.localCache[s]&&!i.has(s)&&(this.notifyListeners(s,null),n.push(s));return n}notifyListeners(e,n){this.localCache[e]=n;const i=this.listeners[e];if(i)for(const s of Array.from(i))s(n)}startPolling(){this.stopPolling(),this.pollTimer=setInterval(async()=>this._poll(),GN)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}_addListener(e,n){Object.keys(this.listeners).length===0&&this.startPolling(),this.listeners[e]||(this.listeners[e]=new Set,this._get(e)),this.listeners[e].add(n)}_removeListener(e,n){this.listeners[e]&&(this.listeners[e].delete(n),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&this.stopPolling()}}C_.type="LOCAL";const T_=C_;new ur(3e4,6e4);/**
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
 */function S_(t,e){return e?Nt(e):(I(t._popupRedirectResolver,t,"argument-error"),t._popupRedirectResolver)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Pu extends d_{constructor(e){super("custom","custom"),this.params=e}_getIdTokenResponse(e){return mi(e,this._buildIdpRequest())}_linkToIdToken(e,n){return mi(e,this._buildIdpRequest(n))}_getReauthenticationResolver(e){return mi(e,this._buildIdpRequest())}_buildIdpRequest(e){const n={requestUri:this.params.requestUri,sessionId:this.params.sessionId,postBody:this.params.postBody,tenantId:this.params.tenantId,pendingToken:this.params.pendingToken,returnSecureToken:!0,returnIdpCredential:!0};return e&&(n.idToken=e),n}}function YN(t){return f_(t.auth,new Pu(t),t.bypassAuthState)}function JN(t){const{auth:e,user:n}=t;return I(n,e,"internal-error"),PN(n,new Pu(t),t.bypassAuthState)}async function XN(t){const{auth:e,user:n}=t;return I(n,e,"internal-error"),NN(n,new Pu(t),t.bypassAuthState)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class I_{constructor(e,n,i,s,r=!1){this.auth=e,this.resolver=i,this.user=s,this.bypassAuthState=r,this.pendingPromise=null,this.eventManager=null,this.filter=Array.isArray(n)?n:[n]}execute(){return new Promise(async(e,n)=>{this.pendingPromise={resolve:e,reject:n};try{this.eventManager=await this.resolver._initialize(this.auth),await this.onExecution(),this.eventManager.registerConsumer(this)}catch(i){this.reject(i)}})}async onAuthEvent(e){const{urlResponse:n,sessionId:i,postBody:s,tenantId:r,error:o,type:a}=e;if(o){this.reject(o);return}const c={auth:this.auth,requestUri:n,sessionId:i,tenantId:r||void 0,postBody:s||void 0,user:this.user,bypassAuthState:this.bypassAuthState};try{this.resolve(await this.getIdpTask(a)(c))}catch(l){this.reject(l)}}onError(e){this.reject(e)}getIdpTask(e){switch(e){case"signInViaPopup":case"signInViaRedirect":return YN;case"linkViaPopup":case"linkViaRedirect":return XN;case"reauthViaPopup":case"reauthViaRedirect":return JN;default:bt(this.auth,"internal-error")}}resolve(e){Bt(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.resolve(e),this.unregisterAndCleanUp()}reject(e){Bt(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.reject(e),this.unregisterAndCleanUp()}unregisterAndCleanUp(){this.eventManager&&this.eventManager.unregisterConsumer(this),this.pendingPromise=null,this.cleanUp()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const QN=new ur(2e3,1e4);async function ZN(t,e,n){if(st(t.app))return Promise.reject(dt(t,"operation-not-supported-in-this-environment"));const i=es(t);JA(t,e,Au);const s=S_(i,n);return new Mn(i,"signInViaPopup",e,s).executeNotNull()}class Mn extends I_{constructor(e,n,i,s,r){super(e,n,s,r),this.provider=i,this.authWindow=null,this.pollId=null,Mn.currentPopupAction&&Mn.currentPopupAction.cancel(),Mn.currentPopupAction=this}async executeNotNull(){const e=await this.execute();return I(e,this.auth,"internal-error"),e}async onExecution(){Bt(this.filter.length===1,"Popup operations only handle one event");const e=Nu();this.authWindow=await this.resolver._openPopup(this.auth,this.provider,this.filter[0],e),this.authWindow.associatedEvent=e,this.resolver._originValidation(this.auth).catch(n=>{this.reject(n)}),this.resolver._isIframeWebStorageSupported(this.auth,n=>{n||this.reject(dt(this.auth,"web-storage-unsupported"))}),this.pollUserCancellation()}get eventId(){return this.authWindow?.associatedEvent||null}cancel(){this.reject(dt(this.auth,"cancelled-popup-request"))}cleanUp(){this.authWindow&&this.authWindow.close(),this.pollId&&window.clearTimeout(this.pollId),this.authWindow=null,this.pollId=null,Mn.currentPopupAction=null}pollUserCancellation(){const e=()=>{if(this.authWindow?.window?.closed){this.pollId=window.setTimeout(()=>{this.pollId=null,this.reject(dt(this.auth,"popup-closed-by-user"))},8e3);return}this.pollId=window.setTimeout(e,QN.get())};e()}}Mn.currentPopupAction=null;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const eP="pendingRedirect",Fr=new Map;class tP extends I_{constructor(e,n,i=!1){super(e,["signInViaRedirect","linkViaRedirect","reauthViaRedirect","unknown"],n,void 0,i),this.eventId=null}async execute(){let e=Fr.get(this.auth._key());if(!e){try{const i=await nP(this.resolver,this.auth)?await super.execute():null;e=()=>Promise.resolve(i)}catch(n){e=()=>Promise.reject(n)}Fr.set(this.auth._key(),e)}return this.bypassAuthState||Fr.set(this.auth._key(),()=>Promise.resolve(null)),e()}async onAuthEvent(e){if(e.type==="signInViaRedirect")return super.onAuthEvent(e);if(e.type==="unknown"){this.resolve(null);return}if(e.eventId){const n=await this.auth._redirectUserForId(e.eventId);if(n)return this.user=n,super.onAuthEvent(e);this.resolve(null)}}async onExecution(){}cleanUp(){}}async function nP(t,e){const n=rP(e),i=sP(t);if(!await i._isAvailable())return!1;const s=await i._get(n)==="true";return await i._remove(n),s}function iP(t,e){Fr.set(t._key(),e)}function sP(t){return Nt(t._redirectPersistence)}function rP(t){return xr(eP,t.config.apiKey,t.name)}async function oP(t,e){return await es(t)._initializationPromise,k_(t,e,!1)}async function k_(t,e,n=!1){if(st(t.app))return Promise.reject(Un(t));const i=es(t),s=S_(i,e),o=await new tP(i,s,n).execute();return o&&!n&&(delete o.user._redirectEventId,await i._persistUserIfCurrent(o.user),await i._setRedirectUser(null,e)),o}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const aP=600*1e3;class cP{constructor(e){this.auth=e,this.cachedEventUids=new Set,this.consumers=new Set,this.queuedRedirectEvent=null,this.hasHandledPotentialRedirect=!1,this.lastProcessedEventTime=Date.now()}registerConsumer(e){this.consumers.add(e),this.queuedRedirectEvent&&this.isEventForConsumer(this.queuedRedirectEvent,e)&&(this.sendToConsumer(this.queuedRedirectEvent,e),this.saveEventToCache(this.queuedRedirectEvent),this.queuedRedirectEvent=null)}unregisterConsumer(e){this.consumers.delete(e)}onEvent(e){if(this.hasEventBeenHandled(e))return!1;let n=!1;return this.consumers.forEach(i=>{this.isEventForConsumer(e,i)&&(n=!0,this.sendToConsumer(e,i),this.saveEventToCache(e))}),this.hasHandledPotentialRedirect||!lP(e)||(this.hasHandledPotentialRedirect=!0,n||(this.queuedRedirectEvent=e,n=!0)),n}sendToConsumer(e,n){if(e.error&&!R_(e)){const i=e.error.code?.split("auth/")[1]||"internal-error";n.onError(dt(this.auth,i))}else n.onAuthEvent(e)}isEventForConsumer(e,n){const i=n.eventId===null||!!e.eventId&&e.eventId===n.eventId;return n.filter.includes(e.type)&&i}hasEventBeenHandled(e){return Date.now()-this.lastProcessedEventTime>=aP&&this.cachedEventUids.clear(),this.cachedEventUids.has(Cf(e))}saveEventToCache(e){this.cachedEventUids.add(Cf(e)),this.lastProcessedEventTime=Date.now()}}function Cf(t){return[t.type,t.eventId,t.sessionId,t.tenantId].filter(e=>e).join("-")}function R_({type:t,error:e}){return t==="unknown"&&e?.code==="auth/no-auth-event"}function lP(t){switch(t.type){case"signInViaRedirect":case"linkViaRedirect":case"reauthViaRedirect":return!0;case"unknown":return R_(t);default:return!1}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function uP(t,e={}){return Zi(t,"GET","/v1/projects",e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const dP=/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/,hP=/^https?/;async function fP(t){if(t.config.emulator)return;const{authorizedDomains:e}=await uP(t);for(const n of e)try{if(pP(n))return}catch{}bt(t,"unauthorized-domain")}function pP(t){const e=Jc(),{protocol:n,hostname:i}=new URL(e);if(t.startsWith("chrome-extension://")){const o=new URL(t);return o.hostname===""&&i===""?n==="chrome-extension:"&&t.replace("chrome-extension://","")===e.replace("chrome-extension://",""):n==="chrome-extension:"&&o.hostname===i}if(!hP.test(n))return!1;if(dP.test(t))return i===t;const s=t.replace(/\./g,"\\.");return new RegExp("^(.+\\."+s+"|"+s+")$","i").test(i)}/**
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
 */const gP=new ur(3e4,6e4);function Tf(){const t=vt().___jsl;if(t?.H){for(const e of Object.keys(t.H))if(t.H[e].r=t.H[e].r||[],t.H[e].L=t.H[e].L||[],t.H[e].r=[...t.H[e].L],t.CP)for(let n=0;n<t.CP.length;n++)t.CP[n]=null}}function mP(t){return new Promise((e,n)=>{function i(){Tf(),gapi.load("gapi.iframes",{callback:()=>{e(gapi.iframes.getContext())},ontimeout:()=>{Tf(),n(dt(t,"network-request-failed"))},timeout:gP.get()})}if(vt().gapi?.iframes?.Iframe)e(gapi.iframes.getContext());else if(vt().gapi?.load)i();else{const s=CN("iframefcb");return vt()[s]=()=>{gapi.load?i():n(dt(t,"network-request-failed"))},bN(`${EN()}?onload=${s}`).catch(r=>n(r))}}).catch(e=>{throw Ur=null,e})}let Ur=null;function _P(t){return Ur=Ur||mP(t),Ur}/**
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
 */const yP=new ur(5e3,15e3),wP="__/auth/iframe",vP="emulator/auth/iframe",bP={style:{position:"absolute",top:"-100px",width:"1px",height:"1px"},"aria-hidden":"true",tabindex:"-1"},EP=new Map([["identitytoolkit.googleapis.com","p"],["staging-identitytoolkit.sandbox.googleapis.com","s"],["test-identitytoolkit.sandbox.googleapis.com","t"]]);function CP(t){const e=t.config;I(e.authDomain,t,"auth-domain-config-required");const n=e.emulator?Tu(e,vP):`https://${t.config.authDomain}/${wP}`,i={apiKey:e.apiKey,appName:t.name,v:Ki},s=EP.get(t.config.apiHost);s&&(i.eid=s);const r=t._getFrameworks();return r.length&&(i.fw=r.join(",")),`${n}?${Gi(i).slice(1)}`}async function TP(t){const e=await _P(t),n=vt().gapi;return I(n,t,"internal-error"),e.open({where:document.body,url:CP(t),messageHandlersFilter:n.iframes.CROSS_ORIGIN_IFRAMES_FILTER,attributes:bP,dontclear:!0},i=>new Promise(async(s,r)=>{await i.restyle({setHideOnLeave:!1});const o=dt(t,"network-request-failed"),a=vt().setTimeout(()=>{r(o)},yP.get());function c(){vt().clearTimeout(a),s(i)}i.ping(c).then(c,()=>{r(o)})}))}/**
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
 */const SP={location:"yes",resizable:"yes",statusbar:"yes",toolbar:"no"},IP=500,kP=600,RP="_blank",AP="http://localhost";class Sf{constructor(e){this.window=e,this.associatedEvent=null}close(){if(this.window)try{this.window.close()}catch{}}}function NP(t,e,n,i=IP,s=kP){const r=Math.max((window.screen.availHeight-s)/2,0).toString(),o=Math.max((window.screen.availWidth-i)/2,0).toString();let a="";const c={...SP,width:i.toString(),height:s.toString(),top:r,left:o},l=Pe().toLowerCase();n&&(a=i_(l)?RP:n),t_(l)&&(e=e||AP,c.scrollbars="yes");const u=Object.entries(c).reduce((h,[f,p])=>`${h}${f}=${p},`,"");if(fN(l)&&a!=="_self")return PP(e||"",a),new Sf(null);const d=window.open(e||"",a,u);I(d,t,"popup-blocked");try{d.focus()}catch{}return new Sf(d)}function PP(t,e){const n=document.createElement("a");n.href=t,n.target=e;const i=document.createEvent("MouseEvent");i.initMouseEvent("click",!0,!0,window,1,0,0,0,0,!1,!1,!1,!1,1,null),n.dispatchEvent(i)}/**
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
 */const LP="__/auth/handler",OP="emulator/auth/handler",DP=encodeURIComponent("fac");async function If(t,e,n,i,s,r){I(t.config.authDomain,t,"auth-domain-config-required"),I(t.config.apiKey,t,"invalid-api-key");const o={apiKey:t.config.apiKey,appName:t.name,authType:n,redirectUrl:i,v:Ki,eventId:s};if(e instanceof Au){e.setDefaultLanguage(t.languageCode),o.providerId=e.providerId||"",Kr(e.getCustomParameters())||(o.customParameters=JSON.stringify(e.getCustomParameters()));for(const[u,d]of Object.entries({}))o[u]=d}if(e instanceof dr){const u=e.getScopes().filter(d=>d!=="");u.length>0&&(o.scopes=u.join(","))}t.tenantId&&(o.tid=t.tenantId);const a=o;for(const u of Object.keys(a))a[u]===void 0&&delete a[u];const c=await t._getAppCheckToken(),l=c?`#${DP}=${encodeURIComponent(c)}`:"";return`${MP(t)}?${Gi(a).slice(1)}${l}`}function MP({config:t}){return t.emulator?Tu(t,OP):`https://${t.authDomain}/${LP}`}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Xa="webStorageSupport";class xP{constructor(){this.eventManagers={},this.iframes={},this.originValidationPromises={},this._redirectPersistence=w_,this._completeRedirectFn=k_,this._overrideRedirectResult=iP}async _openPopup(e,n,i,s){Bt(this.eventManagers[e._key()]?.manager,"_initialize() not called before _openPopup()");const r=await If(e,n,i,Jc(),s);return NP(e,r,Nu())}async _openRedirect(e,n,i,s){await this._originValidation(e);const r=await If(e,n,i,Jc(),s);return BN(r),new Promise(()=>{})}_initialize(e){const n=e._key();if(this.eventManagers[n]){const{manager:s,promise:r}=this.eventManagers[n];return s?Promise.resolve(s):(Bt(r,"If manager is not set, promise should be"),r)}const i=this.initAndGetManager(e);return this.eventManagers[n]={promise:i},i.catch(()=>{delete this.eventManagers[n]}),i}async initAndGetManager(e){const n=await TP(e),i=new cP(e);return n.register("authEvent",s=>(I(s?.authEvent,e,"invalid-auth-event"),{status:i.onEvent(s.authEvent)?"ACK":"ERROR"}),gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER),this.eventManagers[e._key()]={manager:i},this.iframes[e._key()]=n,i}_isIframeWebStorageSupported(e,n){this.iframes[e._key()].send(Xa,{type:Xa},s=>{const r=s?.[0]?.[Xa];r!==void 0&&n(!!r),bt(e,"internal-error")},gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER)}_originValidation(e){const n=e._key();return this.originValidationPromises[n]||(this.originValidationPromises[n]=fP(e)),this.originValidationPromises[n]}get _shouldInitProactively(){return c_()||n_()||ku()}}const FP=xP;var kf="@firebase/auth",Rf="1.12.0";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class UP{constructor(e){this.auth=e,this.internalListeners=new Map}getUid(){return this.assertAuthConfigured(),this.auth.currentUser?.uid||null}async getToken(e){return this.assertAuthConfigured(),await this.auth._initializationPromise,this.auth.currentUser?{accessToken:await this.auth.currentUser.getIdToken(e)}:null}addAuthTokenListener(e){if(this.assertAuthConfigured(),this.internalListeners.has(e))return;const n=this.auth.onIdTokenChanged(i=>{e(i?.stsTokenManager.accessToken||null)});this.internalListeners.set(e,n),this.updateProactiveRefresh()}removeAuthTokenListener(e){this.assertAuthConfigured();const n=this.internalListeners.get(e);n&&(this.internalListeners.delete(e),n(),this.updateProactiveRefresh())}assertAuthConfigured(){I(this.auth._initializationPromise,"dependent-sdk-initialized-before-auth")}updateProactiveRefresh(){this.internalListeners.size>0?this.auth._startProactiveRefresh():this.auth._stopProactiveRefresh()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function $P(t){switch(t){case"Node":return"node";case"ReactNative":return"rn";case"Worker":return"webworker";case"Cordova":return"cordova";case"WebExtension":return"web-extension";default:return}}function BP(t){Xe(new qe("auth",(e,{options:n})=>{const i=e.getProvider("app").getImmediate(),s=e.getProvider("heartbeat"),r=e.getProvider("app-check-internal"),{apiKey:o,authDomain:a}=i.options;I(o&&!o.includes(":"),"invalid-api-key",{appName:i.name});const c={apiKey:o,authDomain:a,clientPlatform:t,apiHost:"identitytoolkit.googleapis.com",tokenApiHost:"securetoken.googleapis.com",apiScheme:"https",sdkClientVersion:l_(t)},l=new wN(i,s,r,c);return SN(l,n),l},"PUBLIC").setInstantiationMode("EXPLICIT").setInstanceCreatedCallback((e,n,i)=>{e.getProvider("auth-internal").initialize()})),Xe(new qe("auth-internal",e=>{const n=es(e.getProvider("auth").getImmediate());return(i=>new UP(i))(n)},"PRIVATE").setInstantiationMode("EXPLICIT")),je(kf,Rf,$P(t)),je(kf,Rf,"esm2020")}/**
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
 */const HP=300,VP=ag("authIdTokenMaxAge")||HP;let Af=null;const WP=t=>async e=>{const n=e&&await e.getIdTokenResult(),i=n&&(new Date().getTime()-Date.parse(n.issuedAtTime))/1e3;if(i&&i>VP)return;const s=n?.token;Af!==s&&(Af=s,await fetch(t,{method:s?"POST":"DELETE",headers:s?{Authorization:`Bearer ${s}`}:{}}))};function jP(t=qo()){const e=vn(t,"auth");if(e.isInitialized())return e.getImmediate();const n=TN(t,{popupRedirectResolver:FP,persistence:[T_,__,w_]}),i=ag("authTokenSyncURL");if(i&&typeof isSecureContext=="boolean"&&isSecureContext){const r=new URL(i,location.origin);if(location.origin===r.origin){const o=WP(r.toString());DN(n,o,()=>o(n.currentUser)),ON(n,a=>o(a))}}const s=rg("auth");return s&&IN(n,`http://${s}`),n}function qP(){return document.getElementsByTagName("head")?.[0]??document}vN({loadJS(t){return new Promise((e,n)=>{const i=document.createElement("script");i.setAttribute("src",t),i.onload=e,i.onerror=s=>{const r=dt("internal-error");r.customData=s,n(r)},i.type="text/javascript",i.charset="UTF-8",qP().appendChild(i)})},gapiScript:"https://apis.google.com/js/api.js",recaptchaV2Script:"https://www.google.com/recaptcha/api.js",recaptchaEnterpriseScript:"https://www.google.com/recaptcha/enterprise.js?render="});BP("Browser");const cM=()=>!1,zP=t=>{try{t&&localStorage.setItem("debug:console","1")}catch{}},B=(...t)=>{},GP=(...t)=>{localStorage.getItem("debug:console")},KP="765724787439-21p8n3e2tsfq2qk4oriq7ipp7m4o50ad.apps.googleusercontent.com",Ss=new Set;function YP(){const t=console.error;console.error=(...e)=>{const n=e.join(" ");n.includes("FedCM")&&n.includes("AbortError")&&n.includes("signal is aborted without reason")||e.length===1&&typeof e[0]=="string"&&e[0].trim()==="The request has been aborted."||t.apply(console,e)}}function JP(t){return B("[ONE TAP] Callback registered, total callbacks:",Ss.size+1),Ss.add(t),()=>Ss.delete(t)}function oi(t){B("[ONE TAP] Notifying status:",t,"to",Ss.size,"callbacks"),Ss.forEach(e=>{try{e(t)}catch{}})}function A_(){if(typeof google>"u"||!google.accounts?.id){setTimeout(()=>A_(),100);return}YP(),google.accounts.id.initialize({client_id:KP,callback:XP,auto_select:!1,cancel_on_tap_outside:!1,context:"signin",use_fedcm_for_prompt:!0,itp_support:!0})}function N_(){if(Lu()){oi("not_needed");return}window.google?.accounts?.id&&(oi("prompting"),window.google.accounts.id.prompt(t=>{const e=t.getMomentType();e==="skipped"?oi("skipped"):e==="dismissed"?oi("dismissed"):e==="display"&&oi("displayed")}))}async function XP(t){try{B("[ONE TAP] Received credential, signing in with Firebase..."),oi("signing_in");const e=yt.credential(t.credential),n=await LN(Fe,e);B("[ONE TAP] ✅ Successfully signed in:",n.user.email),zs(!1)}catch(e){const n=e?.code||"unknown",i=e?.message||String(e);alert(n==="auth/account-exists-with-different-credential"?"An account already exists with the same email but different sign-in credentials.":`One Tap sign-in failed: ${i}`)}}let el=!1;async function QP(){const t=M();if(!t||el)return;const e=b(E,`users/${t}/presence`);try{await ne(e,{state:"online",lastChanged:fi()}),await VR(e).set({state:"offline",lastSeen:fi(),lastChanged:fi()}),el=!0,console.log("Presence initialized for user:",t)}catch(n){console.error("Failed to initialize presence:",n)}}async function ZP(){const t=M();if(!t)return;const e=b(E,`users/${t}/presence`);try{await ne(e,{state:"offline",lastSeen:fi(),lastChanged:fi()}),el=!1}catch(n){console.error("Failed to set offline:",n)}}function P_(t){if(!t||typeof t!="string")throw new Error("Invalid email: must be a non-empty string");const e=t.toLowerCase().trim();return btoa(unescape(encodeURIComponent(e))).replace(/\//g,"-")}async function e0(t){if(!t||!t.uid||!t.email)throw new Error("Invalid user: must have uid and email");const e=P_(t.email),n=b(E,`usersByEmail/${e}`),i={uid:t.uid,displayName:t.displayName||"Anonymous",photoURL:t.photoURL||null,registeredAt:Date.now()};try{await ne(n,i),console.log("[USER DISCOVERY] Registered user in directory:",t.email)}catch(s){throw console.error("[USER DISCOVERY] Failed to register user:",s),s}}async function L_(t){if(!t||typeof t!="string")return null;try{const e=P_(t),n=b(E,`usersByEmail/${e}`),i=await De(n);return i.exists()?i.val():null}catch(e){return console.error("[USER DISCOVERY] Failed to find user by email:",e),null}}async function t0(t){if(!Array.isArray(t))throw new Error("Invalid emails: must be an array");const e={},n=t.map(async i=>{const s=await L_(i);e[i]=s});return await Promise.all(n),e}const Fe=jP(oa);async function n0(){const t=Fe.currentUser;return t?t.getIdToken(!1):null}const i0=typeof import.meta<"u"&&!0;function O_(t,e,n={}){const i=typeof window<"u"?window.location.origin:"n/a";i0?console.error(`[AUTH] ${t}:`,{code:e?.code||"unknown",message:e?.message||String(e),origin:i,...n}):console.error(`[AUTH] ${t}:`,e,n,{origin:i})}const D_=(async()=>{try{await Ja(Fe,T_)}catch{try{await Ja(Fe,__)}catch{await Ja(Fe,Qc)}}try{(await oP(Fe))?.user&&B("[AUTH] ✅ Sign-in completed (via Safari fallback)")}catch(t){B("[AUTH] No redirect result:",t.code)}setTimeout(()=>{A_(),N_()},500)})();let M_=!1;function zs(t){M_=t}function s0(){try{const t=document.createElement("a");t.href=window.location.href,t.target="_blank",t.rel="noopener noreferrer external",document.body.appendChild(t),t.click(),document.body.removeChild(t)}catch{}}function x_(){const t=typeof window<"u"&&window.matchMedia?.("(display-mode: standalone)").matches,e=typeof navigator<"u"&&navigator.standalone===!0,n=t||e,i=/iphone|ipad|ipod/i.test(navigator.userAgent||"");return{isStandalonePWA:n,isIOS:i,isIOSStandalone:n&&i}}function r0(t){const e=t?.code||"unknown",n=t?.message||String(t);if(e==="auth/popup-closed-by-user"||e==="auth/cancelled-popup-request"){console.log("Sign-in cancelled by user");return}const{isIOSStandalone:i}=x_();if((e==="auth/network-request-failed"||e==="auth/popup-blocked")&&i){console.warn(`[AUTH] ${e} inside iOS standalone PWA. Arming Safari fallback.`),zs(!0),alert(`Sign-in is blocked in the installed app on iOS.

Tap the Login button again to open in Safari and complete sign-in.`);return}if(e==="auth/popup-blocked"){alert("Pop-up blocked. Please enable pop-ups for this site in your browser settings, or try signing in from a desktop browser.");return}const s=t?.customData?.email;if(O_("Google sign-in",t,{email:s?"<redacted>":void 0}),e==="auth/unauthorized-domain"){const r=typeof window<"u"?window.location.origin:"",o=["This app's host is not whitelisted in Firebase Authentication.","Fix: In Firebase Console, go to Build → Authentication → Settings → Authorized domains and add this origin:",r?`• ${r}`:"• <your dev origin>","","Common dev hosts to add:","• http://localhost (covers any port)","• http://127.0.0.1","• http://[::1] (IPv6 localhost)","• Your LAN IP, e.g. http://192.168.x.y","","Tip: avoid opening index.html directly from the filesystem (file://). Use a dev server instead."];r&&typeof navigator<"u"&&navigator.clipboard?.writeText&&navigator.clipboard.writeText(r).catch(()=>{}),alert(`Sign-in failed: Unauthorized domain.

${o.join(`
`)}`);return}alert(`Sign-in failed: ${n}`)}let hs=null;const o0=()=>Math.random().toString(36).substring(2,15),tl="guestUser",a0=2880*60*1e3;function c0(){try{const t=typeof localStorage<"u"?localStorage.getItem(tl):null;if(!t)return null;const e=JSON.parse(t);if(!e||typeof e!="object"||!e.id)return null;if(e.expiresAt&&Date.now()>e.expiresAt){try{localStorage.removeItem(tl)}catch{}return null}return e}catch{return null}}function l0(t,e=a0){const n=Date.now(),i={id:t,createdAt:n,expiresAt:n+e};try{typeof localStorage<"u"&&localStorage.setItem(tl,JSON.stringify(i))}catch{}return i}function ge(){const t=M();if(t)return t;if(!hs){const e=c0();e&&e.id?hs=e.id:(hs=o0(),l0(hs))}return hs}function gn(){return Fe.currentUser}function Lu(){return Fe.currentUser!==null}function M(){return Fe.currentUser?.uid??null}function u0(){return new Promise(t=>{const e=p_(Fe,n=>{e(),t(n)})})}function Ou(t,{truncate:e=7}={}){return p_(Fe,n=>{const i=!!n,s=n?.displayName||"Guest User",r=typeof s=="string"&&s.length>e?s.slice(0,e)+"...":s;i&&(QP().catch(o=>{console.warn("Failed to initialize presence:",o)}),e0(n).catch(o=>{console.warn("Failed to register user in directory:",o)}));try{t({user:n,isLoggedIn:i,userName:r})}catch{}})}const F_=async()=>{const t=new yt;t.setCustomParameters({prompt:"select_account"});const{isIOSStandalone:e}=x_();try{if(e&&M_){B("[AUTH] Using Safari external fallback"),zs(!1),s0();return}B("[AUTH] Starting popup sign-in flow...");const n=await ZN(Fe,t);return B("[AUTH] Popup sign-in successful:",n.user.email),zs(!1),n}catch(n){r0(n)}};async function U_(){try{await ZP(),await MN(Fe),console.info("User signed out"),setTimeout(()=>N_(),1500)}catch(t){throw O_("Sign out",t),t}}const d0="765724787439-21p8n3e2tsfq2qk4oriq7ipp7m4o50ad.apps.googleusercontent.com";function $_(){return new Promise((t,e)=>{if(typeof google>"u"||!google.accounts?.oauth2){e(new Error("Google Identity Services not loaded"));return}const n=gn();console.log("[AUTH] Requesting contacts access via GIS Token Model..."),google.accounts.oauth2.initTokenClient({client_id:d0,scope:"https://www.googleapis.com/auth/contacts.readonly https://www.googleapis.com/auth/contacts.other.readonly",hint:n?.email||void 0,callback:s=>{if(s.error){console.error("[AUTH] Token request error:",s.error),s.error==="access_denied"?e(new Error("Authorization cancelled")):e(new Error(s.error_description||s.error));return}if(!s.access_token){e(new Error("No access token received"));return}console.log("[AUTH] Contacts access granted"),t(s.access_token)},error_callback:s=>{console.error("[AUTH] Token client error:",s),s.type==="popup_closed"?e(new Error("Authorization cancelled")):e(new Error(s.message||"Authorization failed"))}}).requestAccessToken()})}const Du=Object.freeze(Object.defineProperty({__proto__:null,auth:Fe,authReady:D_,getCurrentUser:gn,getCurrentUserAsync:u0,getLoggedInUserId:M,getLoggedInUserToken:n0,getUserId:ge,isLoggedIn:Lu,onAuthChange:Ou,requestContactsAccess:$_,setSafariExternalOpenArmed:zs,signInWithAccountSelection:F_,signOutUser:U_},Symbol.toStringTag,{value:"Module"}));function ha(t="room"){const e=new URL(window.location);e.searchParams.delete(t),window.history.replaceState({},"",e)}class h0{async send(e,n){throw new Error("MessagingTransport.send() must be implemented by subclass")}listen(e,n){throw new Error("MessagingTransport.listen() must be implemented by subclass")}async getUnreadCount(e){throw new Error("MessagingTransport.getUnreadCount() must be implemented by subclass")}async markAsRead(e){throw new Error("MessagingTransport.markAsRead() must be implemented by subclass")}listenToUnreadCount(e,n){throw new Error("MessagingTransport.listenToUnreadCount() must be implemented by subclass")}async addReaction(e,n,i){throw new Error("MessagingTransport.addReaction() must be implemented by subclass")}async removeReaction(e,n,i){throw new Error("MessagingTransport.removeReaction() must be implemented by subclass")}async getReactions(e,n){throw new Error("MessagingTransport.getReactions() must be implemented by subclass")}}const Nf=100;class f0 extends h0{_getConversationId(e,n){return[e,n].sort().join("_")}async send(e,n){const i=M();if(!i)throw new Error("Cannot send message: not logged in");const r=gn()?.displayName||"Guest User",o=this._getConversationId(i,e),a=ho(b(E,`conversations/${o}/messages`));await ne(a,{text:n,from:i,fromName:r,sentAt:fi(),read:!1}),this._cleanupOldMessages(o).catch(c=>{console.warn("[RTDBTransport] Failed to cleanup old messages:",c)})}listen(e,n){const i=M();if(!i)return console.warn("[RTDBTransport] Cannot listen to messages: not logged in"),()=>{};const s=this._getConversationId(i,e),r=b(E,`conversations/${s}/messages`),o=new Set,a=l=>{const u=l.key,d=l.val();if(!d||o.has(u))return;o.add(u);const h=d.from===i,f={...d,messageId:u};n(d.text,f,h)},c=l=>{const u=l.key,d=l.val();if(!(!d||!o.has(u))&&d.reactions!==void 0){const h=d.from===i,f={...d,messageId:u,_reactionUpdate:!0};n(d.text,f,h)}};return Ws(r,a),of(r,c),()=>{Rt(r,"child_added",a),Rt(r,"child_changed",c)}}async getUnreadCount(e){const n=M();if(!n)return 0;const i=this._getConversationId(n,e),s=b(E,`conversations/${i}/messages`);try{const r=await De(s);if(!r.exists())return 0;const o=r.val();return Object.values(o).filter(a=>!a.read&&a.from===e).length}catch(r){return console.warn("[RTDBTransport] Failed to get unread count:",r),0}}async markAsRead(e){const n=M();if(!n)return;const i=this._getConversationId(n,e),s=b(E,`conversations/${i}/messages`);try{const r=await De(s);if(!r.exists())return;const o=r.val(),a={};Object.entries(o).forEach(([c,l])=>{!l.read&&l.from===e&&(a[`conversations/${i}/messages/${c}/read`]=!0)}),Object.keys(a).length>0&&await hi(b(E),a)}catch(r){console.warn("[RTDBTransport] Failed to mark messages as read:",r)}}listenToUnreadCount(e,n){const i=M();if(!i)return console.warn("[RTDBTransport] Cannot listen to unread count: not logged in"),()=>{};const s=this._getConversationId(i,e),r=b(E,`conversations/${s}/messages`),o=async()=>{try{const l=await this.getUnreadCount(e);n(l)}catch(l){console.warn("[RTDBTransport] Failed to get unread count:",l)}},a=async l=>{const u=l.val();u&&u.from===e&&!u.read&&await o()},c=async l=>{const u=l.val();u&&u.from===e&&await o()};return Ws(r,a),of(r,c),()=>{Rt(r,"child_added",a),Rt(r,"child_changed",c)}}async _cleanupOldMessages(e){const n=b(E,`conversations/${e}/messages`),i=await De(n);if(!i.exists())return;const s=i.val(),r=Object.keys(s).length;if(r<=Nf)return;const o=r-Nf,a=Object.entries(s).sort((l,u)=>(l[1].sentAt||0)-(u[1].sentAt||0)),c={};for(let l=0;l<o;l++){const[u]=a[l];c[`conversations/${e}/messages/${u}`]=null}await hi(b(E),c),console.log(`[RTDBTransport] Cleaned up ${o} old messages from conversation ${e}`)}async addReaction(e,n,i){const s=M();if(!s)throw new Error("Cannot add reaction: not logged in");const o=`conversations/${this._getConversationId(s,e)}/messages/${n}/reactions/${i}/${s}`;await ne(b(E,o),!0)}async removeReaction(e,n,i){const s=M();if(!s)throw new Error("Cannot remove reaction: not logged in");const o=`conversations/${this._getConversationId(s,e)}/messages/${n}/reactions/${i}/${s}`;await ne(b(E,o),null)}async getReactions(e,n){const i=M();if(!i)return{};const s=this._getConversationId(i,e),r=b(E,`conversations/${s}/messages/${n}/reactions`);try{const o=await De(r);if(!o.exists())return{};const a=o.val(),c={};for(const[l,u]of Object.entries(a))c[l]=Object.keys(u);return c}catch(o){return console.warn("[RTDBTransport] Failed to get reactions:",o),{}}}async hasMyReaction(e,n,i){const s=M();if(!s)return!1;const o=`conversations/${this._getConversationId(s,e)}/messages/${n}/reactions/${i}/${s}`;try{return(await De(b(E,o))).exists()}catch{return!1}}}class p0{constructor(e,n=null){if(!e)throw new Error("MessagingController requires a transport implementation");this.transport=e,this.fileTransport=n,this.sessions=new Map}openSession(e,{onMessage:n,onUnreadChange:i}={}){if(!e||typeof e!="string")throw new Error("contactId must be a non-empty string");if(this.sessions.has(e))return console.info(`[MessagingController] Session already open for ${e}`),this.sessions.get(e);const s=this.transport.listen(e,(o,a,c)=>{n&&typeof n=="function"&&n(o,a,c),!c&&i&&typeof i=="function"&&this.transport.getUnreadCount(e).then(l=>i(l)).catch(l=>console.warn("[MessagingController] Failed to get unread count:",l))}),r={contactId:e,send:o=>!o||typeof o!="string"?Promise.reject(new Error("Message text must be a non-empty string")):this.transport.send(e,o),markAsRead:()=>this.transport.markAsRead(e),getUnreadCount:()=>this.transport.getUnreadCount(e),close:()=>{this.closeSession(e)},addReaction:(o,a)=>this.transport.addReaction(e,o,a),removeReaction:(o,a)=>this.transport.removeReaction(e,o,a),hasMyReaction:(o,a)=>this.transport.hasMyReaction(e,o,a),getReactions:o=>this.transport.getReactions(e,o),_unsubscribe:s};return this.sessions.set(e,r),r}closeSession(e){const n=this.sessions.get(e);n&&(n._unsubscribe&&typeof n._unsubscribe=="function"&&n._unsubscribe(),this.sessions.delete(e))}getSession(e){return this.sessions.get(e)}getAllSessions(){return Array.from(this.sessions.values())}closeAllSessions(){this.sessions.forEach(e=>{e._unsubscribe&&typeof e._unsubscribe=="function"&&e._unsubscribe()}),this.sessions.clear()}async getUnreadCount(e){if(!e||typeof e!="string")throw new Error("contactId must be a non-empty string");return this.transport.getUnreadCount(e)}listenToUnreadCount(e,n){if(!e||typeof e!="string")throw new Error("contactId must be a non-empty string");if(typeof n!="function")throw new Error("onCountChange must be a function");return this.transport.listenToUnreadCount(e,n)}setFileTransport(e){this.fileTransport=e}canSendFiles(){return this.fileTransport!==null&&this.fileTransport.isReady()}async sendFile(e,n){if(!this.fileTransport)throw new Error("File transport not available. Files can only be sent during active calls.");if(!this.fileTransport.isReady())throw new Error("File transport not ready");return this.fileTransport.sendFile(e,n)}onFileReceived(e){if(!this.fileTransport)throw new Error("File transport not available");if(typeof e!="function")throw new Error("onFileReceived callback must be a function");this.fileTransport.onFileReceived(e)}clearFileTransport(){this.fileTransport&&(this.fileTransport.cleanup(),this.fileTransport=null)}}const on=new p0(new f0);function wo(t,e){if(!t||!e)throw new Error("Both user IDs are required");if(t===e)throw new Error("Cannot create room ID for same user");const[n,i]=[t,e].sort(),s=`${n}_${i}`;let r=0;for(let u=0;u<s.length;u++){const d=s.charCodeAt(u);r=(r<<5)-r+d,r=r&r}let o=5381;for(let u=0;u<s.length;u++)o=(o<<5)+o+s.charCodeAt(u);const a=Math.abs(r).toString(36),c=Math.abs(o).toString(36);return(a+c).slice(0,16).padEnd(16,"0")}class g0{constructor(e,{loop:n=!1,volume:i=.5}={}){this.src=e,this.audio=new Audio(e),this.audio.loop=n,this.audio.volume=Math.max(0,Math.min(1,i)),this.isPlaying=!1,this.audio.onerror=s=>{console.error(`[AudioPlayer] Failed to load audio: ${e}`,s),this.isPlaying=!1},this.audio.onplay=()=>{this.isPlaying=!0},this.audio.onpause=()=>{this.isPlaying=!1},this.audio.onended=()=>{this.isPlaying=!1}}async play(){if(!this.audio)return!1;if(this.isPlaying)return!0;try{return await this.audio.play(),this.isPlaying=!0,!0}catch(e){return e.name==="NotAllowedError"?console.warn("[AudioPlayer] Autoplay blocked - user interaction required first",{src:this.src}):e.name==="NotSupportedError"?console.error("[AudioPlayer] Audio format not supported",{src:this.src}):console.error("[AudioPlayer] Playback error:",e),this.isPlaying=!1,!1}}stop(){this.audio&&(this.audio.pause(),this.audio.currentTime=0,this.isPlaying=!1)}pause(){this.audio&&(this.audio.pause(),this.isPlaying=!1)}setVolume(e){this.audio&&(this.audio.volume=Math.max(0,Math.min(1,e)))}getVolume(){return this.audio?.volume??0}dispose(){this.stop(),this.audio&&(this.audio.onerror=null,this.audio.onplay=null,this.audio.onpause=null,this.audio.onended=null,this.audio.src="",this.audio=null),this.isPlaying=!1}}class m0{constructor({incomingSrc:e,outgoingSrc:n,volume:i}={}){const s="/HangVidU/";this.incomingSrc=e??`${s}sounds/incoming.mp3`,this.outgoingSrc=n??`${s}sounds/outgoing.mp3`,this.defaultVolume=i??.7,this.currentPlayer=null,this.currentType=null}configure({incomingSrc:e,outgoingSrc:n,volume:i}={}){e!==void 0&&(this.incomingSrc=e),n!==void 0&&(this.outgoingSrc=n),i!==void 0&&(this.defaultVolume=i)}setIncomingRingtone(e){this.incomingSrc=e}setOutgoingRingtone(e){this.outgoingSrc=e}setVolume(e){this.defaultVolume=Math.max(0,Math.min(1,e))}async playIncoming(){return this._play("incoming",this.incomingSrc)}async playOutgoing(){return this._play("outgoing",this.outgoingSrc)}async _play(e,n){this.stop();try{this.currentPlayer=new g0(n,{loop:!0,volume:this.defaultVolume}),this.currentType=e;const i=await this.currentPlayer.play();return i?console.log(`[Ringtone] Playing ${e} ringtone`):(console.warn(`[Ringtone] Failed to start ${e} ringtone (likely autoplay blocked)`),this.currentPlayer?.dispose(),this.currentPlayer=null,this.currentType=null),i}catch(i){return console.error(`[Ringtone] Error playing ${e} ringtone:`,i),this.currentPlayer?.dispose(),this.currentPlayer=null,this.currentType=null,!1}}stop(){this.currentPlayer&&(console.log(`[Ringtone] Stopping ${this.currentType} ringtone`),this.currentPlayer.stop(),this.currentPlayer.dispose(),this.currentPlayer=null,this.currentType=null)}isPlaying(){return this.currentPlayer?.isPlaying??!1}getCurrentType(){return this.currentType}}const _i=new m0,Gs=new WeakMap;function Mu(t,e,n){if(!t||!n)throw new Error("setupIceCandidates: pc and roomId are required");if(Gs.has(t)||Gs.set(t,[]),e==="initiator")Pf(t,"offerCandidates",n),Lf(t,"answerCandidates",n);else if(e==="joiner")Pf(t,"answerCandidates",n),Lf(t,"offerCandidates",n);else throw new Error(`Invalid role: ${e} specified for ICE candidate setup.`)}function Pf(t,e,n){t.onicecandidate=i=>{if(i.candidate){const s=ho(e==="offerCandidates"?zm(n):Gm(n));ne(s,i.candidate.toJSON())}}}function Lf(t,e,n){const i=e==="offerCandidates"?zm(n):Gm(n);let s=!1;const r=()=>{if(s)return;s=!0;const a=()=>{t.remoteDescription&&(xu(t),t.removeEventListener("signalingstatechange",a))};t.addEventListener("signalingstatechange",a)};Ln(i,"child_added",a=>{const c=a.val();if(!(!t||t.signalingState==="closed")&&c)if(t.remoteDescription)try{t.addIceCandidate(new RTCIceCandidate(c))}catch{}else{const l=Gs.get(t);l&&(l.push(c),l.length===1&&r())}},n)}function xu(t){if(!t||!Gs.has(t))return;const e=Gs.get(t);if(e.length!==0){B(`🔄 Draining ${e.length} queued ICE candidate(s)`);for(const n of e)try{t.addIceCandidate(new RTCIceCandidate(n)).catch(i=>{B("Error adding queued ICE candidate:",i)})}catch{}e.length=0}}const _0=Object.freeze(Object.defineProperty({__proto__:null,drainIceCandidateQueue:xu,setupIceCandidates:Mu},Symbol.toStringTag,{value:"Module"}));class yi{constructor(){this.logs=[],this.isEnabled=!0,this.maxLogs=1e3,this.sessionId=this.generateSessionId()}log(e,n,i={}){if(!this.isEnabled)return;const s={timestamp:performance.now(),sessionId:this.sessionId,category:e,event:n,data:{...i},id:this.generateLogId()};this.logs.push(s),this.logs.length>this.maxLogs&&(this.logs=this.logs.slice(-this.maxLogs)),typeof window<"u"&&window.location?.hostname==="localhost"&&console.log(`[DIAG] ${e}:${n}`,i)}logListenerAttachment(e,n,i,s={}){this.log("LISTENER","ATTACHED",{roomId:e,listenerType:n,currentCount:i,...s})}logListenerCleanup(e,n,i={}){this.log("LISTENER","CLEANUP",{removedCount:e.length,preservedCount:n.length,removedRoomIds:e,preservedRoomIds:n,...i})}logDuplicateListener(e,n,i={}){this.log("LISTENER","DUPLICATE_PREVENTED",{roomId:e,listenerType:n,...i})}logIncomingCallEvent(e,n,i,s={}){this.log("INCOMING_CALL","DETECTED",{callerId:e,roomId:n,isFresh:i.isFresh,validationMethod:i.method,age:i.age,reason:i.reason,...s})}logNotificationDecision(e,n,i,s={}){this.log("INCOMING_CALL","NOTIFICATION_DECISION",{decision:e,reason:n,roomId:i,...s})}logCallingUILifecycle(e,n,i={}){this.log("CALLING_UI",e,{roomId:n,...i})}logFirebaseOperation(e,n,i=null,s={}){this.log("FIREBASE","OPERATION",{operation:e,success:n,error:i?{message:i.message,code:i.code,stack:i.stack}:null,...s})}logFirebaseConnectionState(e,n={}){this.log("FIREBASE","CONNECTION_STATE",{state:e,...n})}logRoomCreation(e,n,i,s={}){this.log("ROOM","CREATED",{roomId:e,isInitiator:n,creationTime:i.creationTime,listenerAttachTime:i.listenerAttachTime,timeDiff:i.listenerAttachTime-i.creationTime,...s})}logMemberJoinEvent(e,n,i,s={}){this.log("ROOM","MEMBER_JOINED",{roomId:e,memberId:n,joinedAt:i.joinedAt,role:i.role,...s})}logContactSave(e,n,i={}){this.log("CONTACT","SAVED",{contactId:e,roomId:n,...i})}logContactCall(e,n,i,s={}){this.log("CONTACT","CALL_INITIATED",{contactId:e,roomId:n,forceInitiator:i,...s})}logFreshnessValidation(e,n,i,s={}){this.log("FRESHNESS","VALIDATION",{roomId:e,method:n,result:{isFresh:i.isFresh,age:i.age,threshold:i.threshold,reason:i.reason},...s})}logRaceCondition(e,n,i,s={}){this.log("RACE_CONDITION",e,{roomId:n,events:i,...s})}getLogs(e={}){let n=[...this.logs];return e.category&&(n=n.filter(i=>i.category===e.category)),e.event&&(n=n.filter(i=>i.event===e.event)),e.roomId&&(n=n.filter(i=>i.data.roomId===e.roomId)),e.since&&(n=n.filter(i=>i.timestamp>=e.since)),e.until&&(n=n.filter(i=>i.timestamp<=e.until)),n}getCallFlowTrace(e){return this.getLogs({roomId:e}).sort((n,i)=>n.timestamp-i.timestamp)}getListenerDiagnostics(e=null){const n=this.getLogs({category:"LISTENER"});return e?n.filter(i=>i.data.roomId===e):n}getFailureAnalysis(){const e=this.logs.filter(n=>n.category==="FIREBASE"&&n.data.success===!1||n.category==="INCOMING_CALL"&&n.data.decision==="REJECT"||n.category==="LISTENER"&&n.event==="DUPLICATE_PREVENTED");return{totalFailures:e.length,firebaseFailures:e.filter(n=>n.category==="FIREBASE").length,rejectedCalls:e.filter(n=>n.category==="INCOMING_CALL"&&n.data.decision==="REJECT").length,duplicateListeners:e.filter(n=>n.event==="DUPLICATE_PREVENTED").length,failures:e}}exportDiagnostics(){return{sessionId:this.sessionId,exportTime:Date.now(),logCount:this.logs.length,logs:[...this.logs],summary:this.getFailureAnalysis()}}exportLogsAsJSON(){return JSON.stringify(this.exportDiagnostics(),null,2)}downloadLogs(e=null){e||(e=`diagnostic-logs-${this.sessionId}-${Date.now()}.json`);const n=this.exportLogsAsJSON(),i=new Blob([n],{type:"application/json"}),s=document.createElement("a");s.href=URL.createObjectURL(i),s.download=e,s.click(),URL.revokeObjectURL(s.href)}getLogsInTimeRange(e,n){return this.logs.filter(i=>i.timestamp>=e&&i.timestamp<=n)}getLogsSince(e){return this.logs.filter(n=>n.timestamp>=e)}clearOldLogs(e=1440*60*1e3){const n=Date.now()-e;this.logs=this.logs.filter(i=>i.timestamp>=n)}clearLogs(){this.logs=[]}persistLogs(){try{const e=`diagnostic-logs-${this.sessionId}`;return localStorage.setItem(e,this.exportLogsAsJSON()),e}catch(e){return console.warn("Failed to persist logs to localStorage:",e),null}}loadPersistedLogs(e){try{const n=localStorage.getItem(e);if(n){const i=JSON.parse(n);if(i.logs&&Array.isArray(i.logs)){const s=new Set(this.logs.map(o=>o.id)),r=i.logs.filter(o=>!s.has(o.id));return this.logs=[...this.logs,...r].sort((o,a)=>o.timestamp-a.timestamp),r.length}}return 0}catch(n){return console.warn("Failed to load persisted logs:",n),0}}static getPersistedLogKeys(){const e=[];for(let n=0;n<localStorage.length;n++){const i=localStorage.key(n);i&&i.startsWith("diagnostic-logs-")&&e.push(i)}return e}static cleanupPersistedLogs(e=1440*60*1e3){const n=Date.now()-e;yi.getPersistedLogKeys().forEach(s=>{try{const r=localStorage.getItem(s);if(r){const o=JSON.parse(r);o.exportTime&&o.exportTime<n&&localStorage.removeItem(s)}}catch{localStorage.removeItem(s)}})}enable(){this.isEnabled=!0}disable(){this.isEnabled=!1}generateSessionId(){return`session_${performance.now()}_${Math.random().toString(36).substr(2,9)}`}generateLogId(){return`log_${performance.now()}_${Math.random().toString(36).substr(2,9)}`}formatTimestamp(e){return new Date(e).toISOString()}startTiming(e){const n=`timing_${e}_${Date.now()}`;return this.log("TIMING","START",{operation:e,timingId:n}),n}endTiming(e,n={}){const i=this.logs.find(s=>s.category==="TIMING"&&s.event==="START"&&s.data.timingId===e);if(i){const s=Date.now()-i.timestamp;return this.log("TIMING","END",{timingId:e,duration:s,operation:i.data.operation,...n}),s}return null}}let Qa=null;function y(){return Qa||(Qa=new yi),Qa}typeof window<"u"&&(window.diagnosticLogger={getInstance:()=>y(),exportLogs:()=>{const e=y().exportLogsAsJSON();return console.log("Diagnostic logs exported:"),console.log(e),e},downloadLogs:t=>{y().downloadLogs(t),console.log("Diagnostic logs downloaded")},getRoomLogs:t=>{const n=y().getCallFlowTrace(t);return console.log(`Logs for room ${t}:`,n),n},getFailures:()=>{const e=y().getFailureAnalysis();return console.log("Failure analysis:",e),e},getListenerDiagnostics:t=>{const n=y().getListenerDiagnostics(t);return console.log("Listener diagnostics:",n),n},getLogsSince:t=>{const n=y().getLogsSince(t);return console.log(`Logs since ${new Date(t).toISOString()}:`,n),n},getLogsInRange:(t,e)=>{const i=y().getLogsInTimeRange(t,e);return console.log(`Logs from ${new Date(t).toISOString()} to ${new Date(e).toISOString()}:`,i),i},persistLogs:()=>{const e=y().persistLogs();return console.log(`Logs persisted with key: ${e}`),e},loadPersistedLogs:t=>{const n=y().loadPersistedLogs(t);return console.log(`Loaded ${n} persisted logs`),n},getPersistedKeys:()=>{const t=yi.getPersistedLogKeys();return console.log("Persisted log keys:",t),t},clearLogs:()=>{y().clearLogs(),console.log("Diagnostic logs cleared")},enable:()=>{y().enable(),console.log("Diagnostic logging enabled")},disable:()=>{y().disable(),console.log("Diagnostic logging disabled")},getSessionInfo:()=>{const t=y(),e={sessionId:t.sessionId,logCount:t.logs.length,isEnabled:t.isEnabled,maxLogs:t.maxLogs};return console.log("Session info:",e),e},help:()=>{console.log(`
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
      `)}},window.addEventListener("beforeunload",()=>{try{const t=y();t.logs.length>0&&t.persistLogs(),yi.cleanupPersistedLogs()}catch{}}),(window.location.hostname==="localhost"||window.location.hostname==="127.0.0.1")&&setTimeout(()=>{try{const t=y(),e=typeof localStorage<"u"&&localStorage.getItem("debug:console")==="1";if(!t.isEnabled||!e)return;const n=yi.getPersistedLogKeys();n.length>0&&(console.log(`Found ${n.length} persisted diagnostic log sessions. Use diagnosticLogger.loadPersistedLogs(key) to load them.`),console.log("Available keys:",n))}catch{}},1e3));class y0{constructor(){this.currentRoomId=null}async createNewRoom(e,n,i=null){const s=Date.now();i||(i=Math.random().toString(36).substring(2,15)),y().log("ROOM","CREATE_START",{roomId:i,userId:n,hasOffer:!!e,timestamp:s});const r=In(i);try{return await ne(r,{offer:{type:e.type,sdp:e.sdp},createdAt:Date.now(),createdBy:n}),y().logFirebaseOperation("create_room",!0,null,{roomId:i,userId:n,duration:Date.now()-s}),await this.joinRoom(i,n),y().log("ROOM","CREATE_COMPLETE",{roomId:i,userId:n,totalDuration:Date.now()-s}),i}catch(o){throw y().logFirebaseOperation("create_room",!1,o,{roomId:i,userId:n,duration:Date.now()-s}),o}}async checkRoomStatus(e){const n=In(e),i=await De(n);if(!i.exists())return{exists:!1,hasMembers:!1,memberCount:0};const s=i.val(),r=s.members||{},o=Object.keys(r).length;return{exists:!0,hasMembers:o>0,memberCount:o,roomData:s}}async getRoomData(e){const n=In(e),i=await De(n);if(!i.exists())throw new Error("Room does not exist");return i.val()}async saveAnswer(e,n){const i=In(e);await hi(i,{answer:n})}async joinRoom(e,n,i="Guest User"){const s=ff(e,n);await ne(s,{displayName:i,joinedAt:Date.now()}),y().logFirebaseOperation("set","joinRoom",`rooms/${e}/members/${n}`)}async leaveRoom(e,n=null,{deleteRoomIfEmpty:i=!0}={}){const s=n||this.currentRoomId;if(!s||!e)return;const r=ff(s,e),o=Cr(s),a=In(s);try{await Ze(r)}catch(c){y().logFirebaseOperation("leave_room_remove_member",!1,c,{roomId:s,userId:e})}if(i)try{const c=await De(o),l=c.exists()?c.val():{};(l?Object.keys(l).length:0)===0&&await Ze(a).catch(d=>{y().logFirebaseOperation("delete_empty_room",!1,d,{roomId:s})})}catch(c){y().logFirebaseOperation("check_members_after_leave",!1,c,{roomId:s})}(!n||n===this.currentRoomId)&&(this.currentRoomId=null)}async rejectCall(e,n,i="user_rejected"){if(!e||!n)return;const s=In(e),r={rejection:{by:n,reason:i,at:Date.now()}};try{await hi(s,r),y().log("ROOM","REJECT_SET",{roomId:e,byUserId:n,reason:i})}catch(o){throw y().log("ROOM","REJECT_SET_FAILED",{roomId:e,byUserId:n,reason:i,error:String(o?.message||o)}),o}}async cancelCall(e,n,i="caller_cancelled"){if(!e||!n)return;const s=In(e),r={cancellation:{by:n,reason:i,at:Date.now()}};try{await hi(s,r),y().log("ROOM","CANCEL_SET",{roomId:e,byUserId:n,reason:i})}catch(o){throw y().log("ROOM","CANCEL_SET_FAILED",{roomId:e,byUserId:n,reason:i,error:String(o?.message||o)}),o}}onCallCancelled(e,n){const i=zA(e);Ln(i,"value",n,e),y().logFirebaseOperation("on","onCallCancelled",`rooms/${e}/cancellation`,{event:"value"})}onMemberJoined(e,n){const i=Cr(e);Ln(i,"child_added",n,e),y().logFirebaseOperation("on","onMemberJoined",`rooms/${e}/members`,{event:"child_added"})}onMemberLeft(e,n){const i=Cr(e);Ln(i,"child_removed",n,e),y().logFirebaseOperation("on","onMemberLeft",`rooms/${e}/members`,{event:"child_removed"})}onIncomingCall(e,n,i){const s=Cr(e),r=a=>{i("join",a.key,a.val())},o=a=>{i("leave",a.key,a.val())};return Ln(s,"child_added",r,e,n),Ln(s,"child_removed",o,e,n),()=>qA(n,e)}get roomId(){return this.currentRoomId}}const se=new y0,Ht={view:"lobby",currentMedia:"none",setView(t){t!==this.view&&(this.view=t,document.body.dataset.view=t)},setMainContent(t){t!==this.currentMedia&&(this.currentMedia=t,document.body.dataset.mainContent=t)}};document.body.dataset.view=Ht.view;document.body.dataset.mainContent=Ht.currentMedia;const vo=3e4;let It=null,ms=null;async function w0(t,e=null){const n=ge(),i=M();if(!i)return;const s=bu(i);await ne(s,{roomId:t,targetContactName:e,initiatedAt:Date.now(),callerUserId:n})}async function bo(){const t=M();if(!t)return;const e=bu(t);await Ze(e).catch(()=>{})}async function B_(t,e){if(!t)return!1;try{const n=bu(t),i=await De(n);if(!i.exists())return!1;const s=i.val();return s.roomId!==e?!1:Date.now()-s.initiatedAt<vo}catch(n){return console.warn("Failed to check outgoing call freshness",n),!1}}async function H_(t){if(!t)return!1;try{const e=b(E,`rooms/${t}/createdAt`),n=await De(e);if(!n.exists())return!1;const i=n.val();return typeof i!="number"?!1:Date.now()-i<vo}catch(e){return console.warn("Failed to check room freshness",e),!1}}async function V_(t,e,n){const i=y(),s=Date.now();$n(),await w0(t,e),Ht.setView("calling");const r=document.createElement("div");r.id="calling-modal",r.style.cssText=`
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
  `;const u=async()=>{i.logCallingUILifecycle("CANCEL",t,{contactName:e,reason:"user_cancelled",duration:Date.now()-s});try{await Promise.all([bo(),se.cancelCall(t,ge(),"caller_cancelled"),se.leaveRoom(ge(),t)])}catch(d){i.log("ROOM","CALLER_CANCELLED_CLEANUP_FAIL",{roomId:t,error:String(d)})}_i.stop(),$n()};l.onclick=u,o.appendChild(a),o.appendChild(c),o.appendChild(l),r.appendChild(o),document.body.appendChild(r),r.dataset.roomId=t,It=r,_i.playOutgoing(),ms=setTimeout(async()=>{i.logCallingUILifecycle("TIMEOUT",t,{contactName:e,reason:"auto_timeout",duration:Date.now()-s,timeoutMs:vo});try{await Promise.all([bo(),se.cancelCall(t,ge(),"auto_timeout"),se.leaveRoom(ge(),t)])}catch(d){i.log("ROOM","CALLER_TIMEOUT_CLEANUP_FAIL",{roomId:t,error:String(d)})}_i.stop(),$n()},vo)}function $n(){if(_i.stop(),Ht.view==="calling"&&Ht.setView("lobby"),It){const t=It.dataset?.roomId||"unknown";y().logCallingUILifecycle("HIDE",t,{reason:"hide_called",hadTimeout:!!ms,timestamp:Date.now()})}ms&&(clearTimeout(ms),ms=null),It&&(It.remove(),It=null)}async function Fu(){if(It){const t=It.dataset?.roomId||"unknown";y().logCallingUILifecycle("ANSWERED",t,{reason:"call_answered",timestamp:Date.now()})}await bo(),$n()}async function v0(t="user_rejected"){const e=y(),n=It?.dataset?.roomId||"unknown";e.logCallingUILifecycle("REJECTED",n,{reason:t,timestamp:Date.now()}),await bo(),$n()}const b0=Object.freeze(Object.defineProperty({__proto__:null,hideCallingUI:$n,isOutgoingCallFresh:B_,isRoomCallFresh:H_,onCallAnswered:Fu,onCallRejected:v0,showCallingUI:V_},Symbol.toStringTag,{value:"Module"})),z=t=>{const e=document.getElementById(t);return e||(console.warn(`Element with id: ${t} not found.`),null)};let et=null,bn=null,fa=null,Uu=null,ze=null,me=null,ae=null,ce=null,U=null,Ae=null,Ye=null,Ue=null,ht=null,ts=null,W_=null,ft=null,pa=null,mn=null,ns=null,is=null,Gn=null,$u=null,Bu=null,Hu=null,Vu=null,wi=null,Ks=null,Wu=null;function Of(){et=z("lobby"),bn=z("lobby-call-btn"),fa=z("title-auth-bar"),Uu=z("videos"),ze=z("local-video-el"),me=z("local-video-box"),ae=z("remote-video-el"),ce=z("remote-video-box"),U=z("shared-video-el"),Ae=z("shared-video-box"),Ye=z("chat-controls"),Ue=z("call-btn"),ht=z("hang-up-btn"),ts=z("switch-camera-btn"),ft=z("mute-btn"),pa=z("fullscreen-partner-btn"),mn=z("remote-pip-btn"),ns=z("mic-btn"),is=z("camera-btn"),Gn=z("exit-watch-mode-btn"),$u=z("app-pip-btn"),Bu=z("app-title-h1"),Hu=z("app-title-a"),Vu=z("app-title-span"),wi=z("paste-join-btn"),Ks=z("add-contact-btn"),Wu=z("test-notifications-btn")}document.readyState==="loading"?document.addEventListener("DOMContentLoaded",Of):Of();const j_=()=>({lobbyDiv:et,lobbyCallBtn:bn,titleAuthBar:fa,videosWrapper:Uu,localVideoEl:ze,localBoxEl:me,remoteVideoEl:ae,remoteBoxEl:ce,sharedVideoEl:U,sharedBoxEl:Ae,chatControls:Ye,callBtn:Ue,hangUpBtn:ht,switchCameraBtn:ts,installBtn:W_,mutePartnerBtn:ft,fullscreenPartnerBtn:pa,remotePipBtn:mn,micBtn:ns,cameraBtn:is,exitWatchModeBtn:Gn,appPipBtn:$u,appTitleH1:Bu,appTitleA:Hu,appTitleSpan:Vu,pasteJoinBtn:wi,addContactBtn:Ks,testNotificationsBtn:Wu});function q_(t,e=3,n=100){return new Promise(i=>{let s=0;const r=()=>{const o=document.getElementById(t);if(o){i(o);return}if(s++,s>=e){console.warn(`Element ${t} not found after ${e} attempts`),i(null);return}setTimeout(r,n)};r()})}async function z_(t,e=3,n=100){const i={},s=t.map(async r=>{const o=await q_(r,e,n);return i[r]=o,o});return await Promise.all(s),i}async function E0(){const t=await z_(["searchBtn","searchQuery","searchResults"],5,200),e=document.querySelector(".search-section");t.searchContainer=e;const n=Object.entries(t).filter(([i,s])=>!s).map(([i])=>i);return n.length>0&&console.warn("Some YouTube elements not found:",n),t}const C0=Object.freeze(Object.defineProperty({__proto__:null,get addContactBtn(){return Ks},get appPipBtn(){return $u},get appTitleA(){return Hu},get appTitleH1(){return Bu},get appTitleSpan(){return Vu},get callBtn(){return Ue},get cameraBtn(){return is},get chatControls(){return Ye},get exitWatchModeBtn(){return Gn},get fullscreenPartnerBtn(){return pa},getElements:j_,get hangUpBtn(){return ht},initializeYouTubeElements:E0,installBtn:W_,get lobbyCallBtn(){return bn},get lobbyDiv(){return et},get localBoxEl(){return me},get localVideoEl(){return ze},get micBtn(){return ns},get mutePartnerBtn(){return ft},get pasteJoinBtn(){return wi},get remoteBoxEl(){return ce},get remotePipBtn(){return mn},get remoteVideoEl(){return ae},robustElementAccess:q_,get sharedBoxEl(){return Ae},get sharedVideoEl(){return U},get switchCameraBtn(){return ts},get testNotificationsBtn(){return Wu},get titleAuthBar(){return fa},get videosWrapper(){return Uu},waitForElements:z_},Symbol.toStringTag,{value:"Module"})),ju=t=>t?!0:(console.warn("Element not found. el.id: =>",t?.id??"(no id)","el: =>",t),console.trace(),!1),Eo=t=>{if(ju(t))return t.classList.contains("hidden")},D=t=>{ju(t)&&t.classList.contains("hidden")&&t.classList.remove("hidden")},w=t=>{ju(t)&&!t.classList.contains("hidden")&&t.classList.add("hidden")},G_=t=>t.classList.contains("small-frame"),Ys=t=>{if(t&&!G_(t)){t.classList.add("small-frame");const e=document.createElement("div");e.classList.add("small-frame-toggle-div");const n=document.createElement("span");n.classList.add("small-frame-toggle-icon"),n.textContent="❮",e.appendChild(n),t.appendChild(e),e.addEventListener("click",()=>{t.classList.contains("closed")?(t.classList.remove("closed"),e.classList.remove("closed"),n.classList.remove("closed")):(t.classList.add("closed"),e.classList.add("closed"),n.classList.add("closed"))})}},an=t=>{if(G_(t)){t.classList.remove("small-frame"),t.classList.remove("closed");const e=t.querySelector(".small-frame-toggle-div");e&&e.remove()}};function qu(t){return document.pictureInPictureElement===t}function T0(t,{inactivityMs:e=3e3,listenTarget:n=document,onShow:i=null,onHide:s=null,hideOnEsc:r=!1,excludeEvents:o=["keydown"]}={}){if(!t)return()=>{};let a=null;const l=["pointermove","pointerdown","pointerup","touchstart","touchmove","mousemove","mousedown","keydown"].filter(m=>!Array.isArray(o)||!o.includes(m));function u(){D(t);try{typeof i=="function"&&i()}catch(m){console.warn("showHideOnInactivity onShow callback error:",m)}a&&clearTimeout(a),a=setTimeout(()=>{w(t);try{typeof s=="function"&&s()}catch(m){console.warn("showHideOnInactivity onHide callback error:",m)}a=null},e)}l.forEach(m=>n.addEventListener(m,u,{passive:!0}));function d(){if(document.hidden){a&&(clearTimeout(a),a=null);try{w(t)}catch(m){console.warn("showHideOnInactivity onHide (visibilitychange) callback error:",m)}}else u()}document.addEventListener("visibilitychange",d);function h(m){if(!m.relatedTarget){a&&(clearTimeout(a),a=null),w(t);try{typeof s=="function"&&s()}catch(A){console.warn("showHideOnInactivity onHide (visibilitychange) callback error:",A)}}}n.addEventListener("mouseout",h);function f(m){if(r&&(m.key==="Escape"||m.key==="Esc")){a&&(clearTimeout(a),a=null),w(t);try{typeof s=="function"&&s()}catch(A){console.warn("showHideOnInactivity onHide (esc) callback error:",A)}}}document.addEventListener("keydown",f);function p(){a||u()}n.addEventListener("touchend",p,{passive:!0}),w(t);function _(){l.forEach(m=>n.removeEventListener(m,u)),document.removeEventListener("visibilitychange",d),n.removeEventListener("mouseout",h),n.removeEventListener("touchend",p),document.removeEventListener("keydown",f),a&&(clearTimeout(a),a=null)}return _}let Pt=null,Lt=null,K_="user";function nl(){return K_}function Y_(t){K_=t}function ga(){return Pt instanceof MediaStream}function zu(){return!Pt||!(Pt instanceof MediaStream)?(console.error("Invalid remote MediaStream accessed:",Pt),null):Pt}function J_(t){Pt=t}function X_(){Pt&&(Pt.getTracks().forEach(t=>t.stop()),Pt=null)}function Q_(){return Lt instanceof MediaStream}function ma(){return!Lt||!(Lt instanceof MediaStream)?(console.error("Invalid local MediaStream accessed:",Lt),console.error("Call createLocalStream() before accessing local stream."),null):Lt}function Co(t){Lt=t}function Z_(){Lt&&(Lt.getTracks().forEach(t=>t.stop()),Lt=null)}const S0=Object.freeze(Object.defineProperty({__proto__:null,cleanupLocalStream:Z_,cleanupRemoteStream:X_,getFacingMode:nl,getLocalStream:ma,getRemoteStream:zu,hasLocalStream:Q_,hasRemoteStream:ga,setFacingMode:Y_,setLocalStream:Co,setRemoteStream:J_},Symbol.toStringTag,{value:"Module"})),Df="yt-video-box",il="yt-player-root";let Z=null,qt=!1;const Is=()=>Z,I0=()=>qt,ey=t=>qt=t,vi=()=>{const t=document.getElementById(Df);if(!t)throw new Error(`Container #${Df} not found`);return t};function k0(){return new Promise(t=>{window.YT&&window.YT.Player?t():window.onYouTubeIframeAPIReady=()=>{t()}})}function ty(){const t=vi();if(!document.getElementById(il)){const e=document.createElement("div");e.id=il,t.appendChild(e)}D(t)}function To(){const t=vi();w(t)}function Za(){const t=vi();return t&&!t.classList.contains("hidden")}function sl(t){return t?t.includes("youtube.com")||t.includes("youtu.be"):!1}function ny(t){if(!t)return null;const e=[/(?:youtube\.com\/watch\?v=)([\w-]+)/,/(?:youtu\.be\/)([\w-]+)/,/(?:youtube\.com\/embed\/)([\w-]+)/,/(?:youtube\.com\/shorts\/)([\w-]+)/];for(const n of e){const i=t.match(n);if(i&&i[1])return i[1]}return null}async function R0({url:t,onReady:e,onStateChange:n}){const i=ny(t);if(!i)throw new Error("Invalid YouTube URL");if(await k0(),Z){try{Z.destroy()}catch(o){console.warn("Error destroying previous YouTube player:",o)}Z=null}const s=(o=!0)=>{const a=vi(),c=Z.getIframe();if(c&&a){try{a.tabIndex=-1,a.focus({preventScroll:!0})}catch{if(document.activeElement===c)try{c.blur()}catch{}}if(o){const l=u=>{if(u.code==="Space"){const d=vi(),h=Z.getIframe();if(document.activeElement===h||document.activeElement===d)return;u.preventDefault(),console.debug("Space pressed, refocusing iframe"),Z.getPlayerState()!==window.YT.PlayerState.PLAYING?Ku():fr()}};document.addEventListener("keydown",l,{once:!0})}}},r=()=>{const o=vi(),a=Z.getIframe();if(o&&a&&document.activeElement!==a)try{a.focus()}catch{}};return ty(),new Promise((o,a)=>{try{Z=new window.YT.Player(il,{videoId:i,playerVars:{autoplay:1,mute:0,controls:1,fs:1,rel:0,modestbranding:1,disablekb:0,origin:window.location.origin},events:{onReady:c=>{qt=!0,e&&e(c),o(Z)},onStateChange:c=>{c.data===window.YT.PlayerState.ENDED&&s(!1),c.data===window.YT.PlayerState.PAUSED&&s(),c.data===window.YT.PlayerState.PLAYING&&r(),n&&n(c)},onError:c=>{console.error("YouTube player error:",c.data),a(new Error(`YouTube error: ${c.data}`))}}})}catch(c){a(c)}})}function Gu(){if(Z){try{To(),Z.destroy()}catch(t){console.warn("Error destroying YouTube player:",t)}Z=null,qt=!1}}function Ku(){Z&&qt&&Z.playVideo()}function fr(){Z&&qt&&Z.pauseVideo()}function A0(t){Z&&qt&&Z.seekTo(t,!0)}function So(){return Z&&qt?Z.getCurrentTime():0}function Yu(){return Z&&qt?Z.getPlayerState():-1}const en={UNSTARTED:-1,ENDED:0,PLAYING:1,PAUSED:2,BUFFERING:3,CUED:5},iy=()=>{if(!ga())return!1;const t=zu();return t&&t.getVideoTracks().length>0&&t.getVideoTracks()[0].enabled&&t.getVideoTracks()[0].readyState==="live"};function N0(){return"pictureInPictureEnabled"in document&&typeof document.pictureInPictureEnabled=="boolean"&&document.pictureInPictureEnabled}function P0(){Kn()||(ry(!0),w(et),w(bn),Ye.classList.remove("bottom"),Ye.classList.add("watch-mode"),ol()?(w(Ue),D(ht)):(w(ht),w(ns),w(ft),D(Ue)),w(is),w(ts),D(Gn),D(Ye),ol()&&(w(me),an(me),w(ce),qu(ae)?an(ce):N0()?ae.requestPictureInPicture().then(()=>{an(ce)}).catch(t=>{console.warn("Failed to enter Picture-in-Picture:",t),Ys(ce),D(ce)}):(Ys(ce),D(ce))))}function L0(){Kn()&&(w(Gn),D(Ue),D(ht),D(ns),D(ft),D(is),D(ts),Ye.classList.remove("watch-mode"),Ye.classList.add("bottom"),D(Ye),iy()&&(qu(ae)&&document.exitPictureInPicture().catch(t=>{console.error("Failed to exit Picture-in-Picture:",t)}),an(ce),D(ce)),ol()?(Ys(me),D(me)):(D(et),D(bn),an(me),w(me)),ry(!1))}function Io(){Ht.setMainContent("ytVideo"),P0()}function ks(){Ht.setMainContent("remoteStream"),L0()}let we=null,Vt=null,sy=!1,pt="none",Rs=null,Je=null;const Kn=()=>sy,ry=t=>sy=t,mt=()=>pt,O0=t=>{["yt","url","file","none"].includes(t)?pt=t:console.warn("Invalid lastWatched platform:",t)};let tn=!1,As=null,bi=0,ec=!1;async function Ei(t){if(!we)return;console.debug("Updating watch sync state, roomId:",we);const e=ca(we);try{await hi(e,{...t,updatedBy:Vt})}catch(n){console.error("Failed to update watch state:",n)}}function D0(t,e,n){if(!t)return;we=t,Vt=n;const i=ca(t),s=la(t);Cs(i,U0,t),Cs(s,F0,t),q0()}function Ju(t){return typeof t=="string"&&t.startsWith("blob:")}async function M0(t,e){if(!we||!Vt)return!1;const n=la(we);try{return await ne(n,{fileName:t,requestedBy:Vt,timestamp:Date.now()}),Je&&clearTimeout(Je),Je=setTimeout(()=>{rl()},300*1e3),!0}catch(i){return console.error("Failed to create watch request:",i),!1}}async function x0(t){if(!we)return!1;const e=la(we);try{await Ze(e)}catch(n){console.warn("Failed to remove watch request:",n)}return Je&&(clearTimeout(Je),Je=null),await Js(t)}async function rl(){if(!we)return;Je&&(clearTimeout(Je),Je=null);const t=la(we);try{await Ze(t)}catch(e){console.warn("Failed to cancel watch request:",e)}}function F0(t){const e=t.val();if(!e){Je&&(clearTimeout(Je),Je=null);return}e.requestedBy!==Vt&&window.onFileWatchRequestReceived&&window.onFileWatchRequestReceived(e.fileName)}function U0(t){const e=t.val();e&&e.updatedBy!==Vt&&(Date.now()-bi<500||(e.url&&e.url!==Rs&&!Ju(e.url)&&$0(e.url),e.isYouTube?B0(e):j0(e)))}function $0(t){Rs=t,sl(t)?(w(Ae),oy(t),pt="yt"):(Gu(),D(Ae),U.src=t,pt="url"),Io()}function B0(t){!Is()||!I0()||(H0(t),V0(t))}function H0(t){const e=Yu(),n=e===en.PLAYING;if([en.BUFFERING,en.UNSTARTED].includes(e)){W0();return}tn||(t.playing&&!n?(Ku(),pt="yt"):!t.playing&&n&&(fr(),pt="yt"))}function V0(t){if(t.currentTime===void 0)return;const e=So();Math.abs(e-t.currentTime)>.3&&!tn&&(A0(t.currentTime),setTimeout(()=>{t.playing?Ku():fr(),pt="yt"},500))}function W0(){tn=!0,clearTimeout(As),As=setTimeout(async()=>{tn=!1;const t=Yu()===en.PLAYING;await Ei({playing:t,currentTime:So()})},700)}function j0(t){bi=Date.now(),t.playing!==void 0&&(t.playing&&U.paused?U.play().catch(e=>console.warn("Play failed:",e)):!t.playing&&!U.paused&&U.pause()),t.currentTime!==void 0&&Math.abs(U.currentTime-t.currentTime)>1&&(U.currentTime=t.currentTime,t.playing?U.play().catch(n=>console.warn("Play failed:",n)):U.pause())}function q0(){const t=()=>{pt!=="file"&&(pt="url")};U.addEventListener("play",async()=>{!Is()&&we&&(bi=Date.now(),await Ei({playing:!0,currentTime:U.currentTime,isYouTube:!1})),t()}),U.addEventListener("pause",async()=>{U.seeking||(!Is()&&we&&(bi=Date.now(),console.log("[SYNC DEBUG] Local pause event:",{currentTime:U.currentTime}),await Ei({playing:!1,currentTime:U.currentTime,isYouTube:!1})),t())}),U.addEventListener("playing",()=>{ec=!0}),U.addEventListener("pause",()=>{U.seeking||(ec=!1)},!0),U.addEventListener("seeked",async()=>{!Is()&&we&&(bi=Date.now(),await Ei({currentTime:U.currentTime,playing:ec,isYouTube:!1})),t()})}async function z0(t){if(!t)return!1;bi=Date.now();const e=Ju(t);if(sl(t)){if(w(Ae),!await oy(t))return!1;pt="yt"}else Gu(),D(Ae),U.src=t,pt=e?"file":"url";if(we){const n=ca(we);e?await ne(n,{playing:!1,currentTime:0,isYouTube:!1,updatedBy:Vt}):ne(n,{url:t,playing:!1,currentTime:0,isYouTube:sl(t),updatedBy:Vt})}return Io(),!0}async function Js(t){let e;if(t instanceof File){if(!t.type.startsWith("video/"))return console.warn("Invalid file type:",t.type),!1;e=URL.createObjectURL(t)}else if(typeof t=="string")e=t;else if(t?.url)e=t.url;else return console.warn("Invalid video source:",t),!1;Rs=e;const n=await z0(e);return n||Ju(Rs)&&t instanceof File&&(URL.revokeObjectURL(e),Rs=null),n}async function oy(t){if(!ny(t))return console.error("Invalid YouTube URL:",t),!1;try{return await R0({url:t,onReady:n=>{if(ey(!0),we){const i=ca(we);ne(i,{url:t,playing:!1,currentTime:0,isYouTube:!0,updatedBy:Vt})}},onStateChange:async n=>{if(!Is())return;const s=n.data===en.PLAYING,r=n.data===en.PAUSED;if(n.data===en.BUFFERING){tn=!0,As&&clearTimeout(As),As=setTimeout(async()=>{tn=!1;const c=Yu()===en.PLAYING;await Ei({playing:c,currentTime:So()})},700);return}r&&tn||!tn&&(s||r)&&await Ei({playing:s,currentTime:So()})}}),!0}catch(n){return console.error("Failed to load YouTube video:",n),!1}}let Ci=!1,Sr=!1,Mf=null,xf=null,Ns=null;const ol=()=>Ci,ay=()=>{if(!Ci){if(!ae||!ga()||ae.paused||ae.readyState<2){Sr||(Sr=!0,ae.addEventListener("playing",()=>{Sr=!1,ay()},{once:!0}));return}if(Sr=!1,Ci=!0,D(ce),D(me),Ys(me),w(et),w(bn),Ue.disabled=!0,Ue.classList.add("disabled"),ht.disabled=!1,ht.classList.remove("disabled"),ft.disabled=!1,ft.classList.remove("disabled"),mn.disabled=!1,mn.classList.remove("disabled"),Ns||(Ns=T0(Ye,{inactivityMs:2500,hideOnEsc:!0})),!Mf){const t=()=>{Ci&&(Kn()?Ys(ce):an(ce),D(ce))};ae.addEventListener("leavepictureinpicture",t),Mf=()=>ae.removeEventListener("leavepictureinpicture",t)}if(!xf){const t=()=>w(ce);ae.addEventListener("enterpictureinpicture",t),xf=()=>ae.removeEventListener("enterpictureinpicture",t)}}},G0=()=>{Ci&&(Ci=!1,qu(ae)&&document.exitPictureInPicture().catch(()=>{}),an(me),w(me),an(ce),w(ce),Ue.disabled=!1,Ue.classList.remove("disabled"),ht.disabled=!0,ht.classList.add("disabled"),ft.disabled=!0,ft.classList.add("disabled"),mn.disabled=!0,mn.classList.add("disabled"),Ns&&(Ns(),Ns=null),Kn()||(D(bn),D(et),D(Ye)))};function cy(){Ht.setView("connected"),ay()}function ly(){Ht.setView("lobby"),G0()}let gt=null,Ff=null;function uy(t){Ff=t,t.onconnectionstatechange=()=>{B("onconnectionstatechange:",t.connectionState),t.connectionState==="connected"?(cy(),Fu().catch(e=>console.warn("Failed to clear calling state on connect:",e)),gt&&(clearTimeout(gt),gt=null)):t.connectionState==="disconnected"?(gt&&clearTimeout(gt),gt=setTimeout(()=>{t===Ff&&t.connectionState==="disconnected"&&_e.cleanupCall({reason:"connection_lost"}),gt=null},3e3)):t.connectionState==="failed"&&(ha(),gt&&(clearTimeout(gt),gt=null),_e.cleanupCall({reason:"connection_failed"}))},t.addEventListener("iceconnectionstatechange",e=>{B("ICE iceconnectionstatechange:",t.iceConnectionState),t.iceConnectionState==="failed"&&(console.warn("ICE connection failed, restarting ICE..."),t.restartIce())})}const Xu={iceServers:[{urls:"stun:stun.l.google.com:19302"}]},tc=new WeakMap;function dy(t,e,n){tc.has(t)||tc.set(t,{});const i=tc.get(t),s=e==="offer"?"lastOffer":"lastAnswer";return i[s]===n?!0:(i[s]=n,!1)}function hy(t,e){return t?e==="offer"?t.signalingState==="stable":t.signalingState==="have-local-offer"||t.signalingState==="stable":!1}function Qu(t,e){e.getTracks().forEach(n=>{t.addTrack(n,e)})}async function fy(t){const e=await t.createOffer();return await t.setLocalDescription(e),e}async function py(t){const e=await t.createAnswer();return await t.setLocalDescription(e),e}async function gy(t,e,n){if(dy(t,e.type,e.sdp))return console.debug(`Ignoring duplicate ${e.type} - already processed`),!1;if(!hy(t,e.type))return console.warn(`Ignoring ${e.type} - unexpected signaling state:`,t.signalingState),!1;try{return await t.setRemoteDescription(new RTCSessionDescription(e)),n(t),console.debug(`Remote description set (${e.type})`),!0}catch(i){return console.error(`Failed to set remote description (${e.type}):`,i),!1}}function my(){return Math.random().toString(36).substring(2,9)}const K0=Object.freeze(Object.defineProperty({__proto__:null,addLocalTracks:Qu,createAnswer:py,createOffer:fy,generateRoomId:my,isDuplicateSdp:dy,isValidSignalingState:hy,rtcConfig:Xu,setRemoteDescription:gy},Symbol.toStringTag,{value:"Module"}));async function Y0({localStream:t,remoteVideoEl:e,mutePartnerBtn:n,setupRemoteStream:i,setupWatchSync:s,targetRoomId:r=null}){if(!t)return{success:!1};const o=new RTCPeerConnection(Xu),a="initiator",c=r||my(),l=ge();Qu(o,t);const u=o.createDataChannel("files");if(!i(o,e,n))return console.error("Error setting up remote stream"),o.close(),{success:!1};Mu(o,a,c),uy(o);const h=await fy(o);await se.createNewRoom(h,l,c),s(c,a,l);const f=`${window.location.origin}${window.location.pathname}?room=${c}`;return{success:!0,pc:o,roomId:c,roomLink:f,dataChannel:u,role:a}}async function J0({roomId:t,localStream:e,remoteVideoEl:n,mutePartnerBtn:i,setupRemoteStream:s,setupWatchSync:r,onMessagesUIReady:o=null}){if(!e)return{success:!1};if(!t)return{success:!1};const a=await se.checkRoomStatus(t);if(!a.exists)return{success:!1};if(!a.hasMembers)return{success:!1};let c;try{c=await se.getRoomData(t)}catch(m){return B("Error: "+m.message),{success:!1}}const l=c.offer;if(!l)return{success:!1};const u=new RTCPeerConnection(Xu),d="joiner",h=ge();Qu(u,e);let f=null;if(u.ondatachannel=m=>{f=m.channel,B("[Call Flow] DataChannel received by joiner",{label:f.label})},!s(u,n,i))return console.error("Error setting up remote stream for joiner"),u.close(),{success:!1};Mu(u,d,t),uy(u),await gy(u,l,xu);const _=await py(u);try{await se.saveAnswer(t,_)}catch(m){return console.error("Failed to save answer to Firebase:",m),u.close(),{success:!1}}return r(t,d,h),await se.joinRoom(t,h),{success:!0,pc:u,roomId:t,dataChannel:f,role:d}}class X0{async sendFile(e,n){throw new Error("FileTransport.sendFile() must be implemented by subclass")}onFileReceived(e){throw new Error("FileTransport.onFileReceived() must be implemented by subclass")}onReceiveProgress(e){throw new Error("FileTransport.onReceiveProgress() must be implemented by subclass")}isReady(){throw new Error("FileTransport.isReady() must be implemented by subclass")}cleanup(){throw new Error("FileTransport.cleanup() must be implemented by subclass")}}const Q0={FILE_CONFIG:{NETWORK_CHUNK_SIZE:65536}};async function Z0(t){if(t instanceof ArrayBuffer)return t;if(t instanceof Blob)try{return await t.arrayBuffer()}catch(e){return console.error("[ChunkProcessor] Blob conversion failed:",e),null}else if(t instanceof Uint8Array||ArrayBuffer.isView(t))try{const e=t instanceof Uint8Array?t:new Uint8Array(t.buffer,t.byteOffset,t.byteLength),n=new ArrayBuffer(e.length);return new Uint8Array(n).set(e),n}catch(e){return console.error("[ChunkProcessor] TypedArray conversion failed:",e),null}else return console.error("[ChunkProcessor] Unknown data type:",Object.prototype.toString.call(t)),null}function eL(t){try{if(t.byteLength<4)return console.error("[ChunkProcessor] Invalid embedded packet - too small:",t.byteLength),null;const i=new DataView(t).getUint32(0,!0),s=4+i;if(t.byteLength<s)return console.error("[ChunkProcessor] Incomplete embedded packet - expected:",s,"got:",t.byteLength),null;const r=new Uint8Array(t,4,i),o=new TextDecoder().decode(r),a=JSON.parse(o),c=4+i,l=t.slice(c);return{chunkMeta:a,chunkData:l}}catch(e){return console.error("[ChunkProcessor] Failed to parse embedded packet:",e),null}}const tL=1024;function nL(t,e,n){let i=0,s=0;const r=[];t.forEach((c,l)=>{c instanceof ArrayBuffer?(s++,i+=c.byteLength):r.push(l)});const o=e-i;return{isComplete:s===n&&Math.abs(o)<=tL,validChunks:s,totalSize:i,missingChunks:r,sizeDifference:o}}const nc=Q0.FILE_CONFIG.NETWORK_CHUNK_SIZE,Uf=9e3*1024*1024;class iL{constructor(e){this.dataChannel=e,this.receivedChunks=new Map,this.fileMetadata=new Map,this.onFileError=null,this.onReceiveProgress=null}async sendFile(e,n){if(e.size>Uf)throw new Error(`File too large (max ${Uf/(1024*1024)} MB)`);if(this.dataChannel.readyState!=="open")throw new Error("DataChannel not ready");const i=`${e.name}-${e.size}-${Date.now()}`,s=Math.ceil(e.size/nc);this.dataChannel.send(JSON.stringify({type:"FILE_META",fileId:i,name:e.name,size:e.size,mimeType:e.type,totalChunks:s}));for(let r=0;r<s;r++){const o=r*nc,a=Math.min(o+nc,e.size),c=await e.slice(o,a).arrayBuffer(),l={type:"FILE_CHUNK",fileId:i,chunkIndex:r,totalChunks:s},u=new TextEncoder().encode(JSON.stringify(l)),d=new ArrayBuffer(4+u.length+c.byteLength),h=new Uint8Array(d);for(new DataView(d).setUint32(0,u.length,!0),h.set(u,4),h.set(new Uint8Array(c),4+u.length),this.dataChannel.send(d),n&&n((r+1)/s);this.dataChannel.bufferedAmount>256*1024;)await new Promise(p=>setTimeout(p,10))}}async handleMessage(e){if(typeof e=="string"){const n=JSON.parse(e);n.type==="FILE_META"&&(this.fileMetadata.set(n.fileId,n),this.receivedChunks.set(n.fileId,[]),this.onFileMetaReceived?.(n))}else{const n=await Z0(e);if(!n){console.error("[FileTransfer] Failed to convert binary data to ArrayBuffer");return}const i=eL(n);if(!i){console.error("[FileTransfer] Failed to parse embedded chunk packet");return}const{chunkMeta:s,chunkData:r}=i,o=this.receivedChunks.get(s.fileId);if(!o){console.error("[FileTransfer] Received chunk for unknown file:",s.fileId);return}if(o[s.chunkIndex]=r,this.onReceiveProgress){const a=o.filter(c=>c).length;this.onReceiveProgress(a/s.totalChunks)}o.filter(a=>a).length===s.totalChunks&&this.assembleFile(s.fileId)}}assembleFile(e){const n=this.fileMetadata.get(e),i=this.receivedChunks.get(e),s=nL(i,n.size,n.totalChunks);if(!s.isComplete){console.error("[FileTransfer] File assembly failed:",{fileId:e,fileName:n.name,...s}),this.onFileError&&this.onFileError({fileName:n.name,reason:"incomplete",details:s});return}const r=new Blob(i,{type:n.mimeType}),o=new File([r],n.name,{type:n.mimeType});this.onFileReceived?.(o),this.receivedChunks.delete(e),this.fileMetadata.delete(e)}}class sL extends X0{constructor(e){if(super(),!e)throw new Error("DataChannelFileTransport requires a DataChannel");this.dataChannel=e,this.fileTransfer=new iL(e),this._setupMessageHandling()}_setupMessageHandling(){this.dataChannel.onmessage=e=>{if(typeof e.data=="string")try{const n=JSON.parse(e.data);if(n.type==="FILE_META"||n.type==="FILE_CHUNK"){this.fileTransfer.handleMessage(e.data);return}}catch{}else this.fileTransfer.handleMessage(e.data)}}async sendFile(e,n){if(!this.isReady())throw new Error("DataChannel not ready");return this.fileTransfer.sendFile(e,n)}onFileReceived(e){if(typeof e!="function")throw new Error("onFileReceived callback must be a function");this.fileTransfer.onFileReceived=e}onReceiveProgress(e){if(typeof e!="function")throw new Error("onReceiveProgress callback must be a function");this.fileTransfer.onReceiveProgress=e}isReady(){return this.dataChannel&&this.dataChannel.readyState==="open"}cleanup(){this.dataChannel&&(this.dataChannel.onmessage=null),this.fileTransfer&&(this.fileTransfer.onFileReceived=null,this.fileTransfer.onFileMetaReceived=null),this.dataChannel=null,this.fileTransfer=null}}function ko(t,e,n={}){if(!t||typeof e!="function")throw new Error("closeOnClickOutside: valid element and onClose callback required");const{ignore:i=[],esc:s=!0,events:r=["mousedown","touchstart"],ignoreInputBlur:o=!1}=n,a=Array.isArray(i)?i.filter(Boolean):[];let c=!1;const l=f=>{try{const p=f.target;if(t.contains(p))return;for(const _ of a)if(_&&_.contains&&_.contains(p)||_===p)return;if(o&&c&&!(p.tagName==="INPUT"||p.tagName==="TEXTAREA"||p.isContentEditable)){c=!1;return}e(f)}catch(p){console.error("closeOnClickOutside handler error:",p)}},u=f=>{s&&f.key==="Escape"&&e(f)},d=()=>{c=!0},h=()=>{setTimeout(()=>{c=!1},100)};return r.forEach(f=>document.addEventListener(f,l,{passive:!0})),s&&document.addEventListener("keydown",u),o&&t.querySelectorAll("input, textarea, [contenteditable]").forEach(p=>{p.addEventListener("focus",d),p.addEventListener("blur",h)}),function(){r.forEach(p=>document.removeEventListener(p,l,{passive:!0})),s&&document.removeEventListener("keydown",u),o&&t.querySelectorAll("input, textarea, [contenteditable]").forEach(_=>{_.removeEventListener("focus",d),_.removeEventListener("blur",h)})}}const rL=t=>String(t).replace(/[&<>"'`=\/]/g,n=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;","`":"&#x60;","=":"&#x3D;","/":"&#x2F;"})[n]),oL=(t,e)=>t.replace(/\$\{([^}]+)\}/g,(n,i)=>{const s=i.trim(),r=s.split(".").reduce((a,c)=>a?.[c],e);return r==null?"":s.endsWith("Html")?String(r):rL(String(r))}),aL=(t,e={})=>{const n=document.createElement("template");return n.innerHTML=oL(t,e),n.content.cloneNode(!0)},cL=(t,e)=>{const n=[];let i=e;for(;i&&i!==t;){const s=i.parentElement;if(!s)break;const r=Array.prototype.indexOf.call(s.children,i);n.push(r),i=s}return n.reverse()},lL=(t,e)=>e.reduce((n,i)=>n&&n.children?n.children[i]:null,t),uL=t=>Array.from(t.querySelectorAll("input, textarea, select")).map(e=>({name:e.name,id:e.id,path:cL(t,e),value:e.value,checked:e.checked,selectionStart:e.selectionStart,selectionEnd:e.selectionEnd,wasFocused:document.activeElement===e})),dL=t=>typeof CSS<"u"&&typeof CSS.escape=="function"?CSS.escape(String(t)):String(t).replace(/[^_a-zA-Z0-9-]/g,e=>"\\"+e),hL=(t,e)=>{e.forEach(n=>{let i=null;if(n.name){const s=t.querySelectorAll("input[name], textarea[name], select[name]");for(const r of s)if(r.getAttribute("name")===n.name){i=r;break}}else if(n.id)try{i=t.querySelector("#"+dL(n.id))}catch{i=t.querySelector(`#${n.id}`)}else n.path&&(i=lL(t,n.path));if(i){if(i.value=n.value,n.checked!==void 0&&(i.checked=n.checked),n.selectionStart!=null&&i.setSelectionRange)try{i.setSelectionRange(n.selectionStart,n.selectionEnd)}catch{}if(n.wasFocused)try{i.focus()}catch{}}})},fL=t=>Array.from(t.querySelectorAll("video, audio")).map(e=>({src:e.currentSrc||e.src,currentTime:e.currentTime,paused:e.paused,volume:e.volume,playbackRate:e.playbackRate,muted:e.muted})),pL=(t,e)=>{const n=t.querySelectorAll("video, audio");for(const i of n)if(i.currentSrc===e||i.src===e)return i;return null},gL=(t,e)=>{e.forEach(n=>{if(!n.src)return;const i=pL(t,n.src);i&&(i.currentTime=n.currentTime,i.volume=n.volume,i.playbackRate=n.playbackRate,i.muted=n.muted,n.paused||i.play().catch(()=>{}))})},mL=()=>document.readyState!=="loading",Zu=({initialProps:t={},template:e="",handlers:n={},parent:i=null,containerTag:s="div",className:r="",onMount:o=null,onCleanup:a=null,autoAppend:c=!0,preserveInputState:l=!0}={})=>{if(!mL())return console.error("createComponent: DOM must be ready before creating components."),null;const u=document.createElement(s);r&&(u.className=r);let d={...t};const h=new Set,f=/\$\{([^}]+)\}/g;let p;for(;(p=f.exec(e))!==null;){const S=p[1].trim().split(".")[0];h.add(S)}const _=[],m=[],A={},x=()=>{let S=[],X=[];l&&(S=uL(u),X=fL(u)),u.textContent="";const tt=aL(e,d);u.appendChild(tt),Object.keys(n).forEach($e=>{const Se=u.querySelectorAll(`[onclick="${$e}"]`),En=n[$e];Se.forEach(ni=>{ni.removeAttribute("onclick"),typeof En=="function"&&ni.addEventListener("click",En)})}),l&&(hL(u,S),gL(u,X)),_.forEach($e=>$e({...d}))},W=S=>{if(!Array.isArray(S)||S.length===0)return;const X={props:{...d},changedKeys:S};m.forEach(tt=>tt(X))};for(const S of Object.keys(t))A[S]=[],Object.defineProperty(u,S,{get(){return d[S]},set(X){d[S]!==X&&(d[S]=X,h.has(S)&&x(),A[S].forEach(tt=>tt(X)),W([S]))},configurable:!0,enumerable:!0});if(u.update=S=>{let X=!1,tt=!1;const $e=[];for(const Se in S)S[Se]!==d[Se]&&(d[Se]=S[Se],h.has(Se)&&(tt=!0),A[Se]&&A[Se].forEach(En=>En(S[Se])),X=!0,$e.push(Se));X&&tt&&x(),$e.length>0&&W($e)},u.onRender=S=>{typeof S=="function"&&_.push(S)},u.onAnyPropUpdated=S=>{typeof S=="function"&&m.push(S)},u.onPropUpdated=(S,X)=>{typeof X=="function"&&A[S]&&A[S].push(X)},u.dispose=()=>{a&&(Array.isArray(a)?a.forEach(S=>{typeof S=="function"&&S()}):typeof a=="function"&&a()),_.length=0,m.length=0;for(const S in A)A[S].length=0;u.remove()},x(),c&&i&&!i.contains(u)&&i.appendChild(u),typeof o=="function")try{o(u)}catch(S){GP("[createComponent]: Error in onMount handler of component",S)}return u};function _y({parent:t,onToggle:e,icon:n="💬",initialUnreadCount:i=0,id:s=null,startHidden:r=!1}={}){if(!t)return console.error("createMessageToggle: parent element is required"),null;if(typeof e!="function")return console.error("createMessageToggle: onToggle callback is required"),null;const o=Zu({initialProps:{unreadCount:i},template:`
      <div class="messages-toggle-btn">
        <button onclick="handleToggle">
          ${n}
          <span class="notification-badge">
            \${unreadCount}
          </span>
        </button>
      </div>
    `,handlers:{handleToggle:c=>{c.preventDefault(),c.stopPropagation(),e()}},className:"messages-toggle-container"+(r?" hidden":""),autoAppend:!1});if(s&&o&&typeof s=="string")try{o.id=s}catch(c){console.warn("createMessageToggle: failed to set id on toggleContainer",c)}let a=o.querySelector(".notification-badge");return a&&(a.style.display=i>0?"flex":"none"),o.onPropUpdated("unreadCount",c=>{const l=o.querySelector(".notification-badge");if(l&&(l.style.display=c>0?"flex":"none"),c>0){const u=o.querySelector(".messages-toggle-btn");u&&(u.classList.add("new-message"),setTimeout(()=>{u.classList.remove("new-message")},4e3))}}),t.appendChild(o),{element:o,setUnreadCount(c){let l=Number(c);(!Number.isFinite(l)||l<0)&&(l=0),o.unreadCount=l},clearBadge(){this.setUnreadCount(0)},cleanup(){if(o&&typeof o.dispose=="function")try{o.dispose()}catch(c){console.warn("createMessageToggle: error during dispose()",c)}if(o&&o.parentNode)try{o.parentNode.removeChild(o)}catch{}}}}function $f(t=!1){if(typeof window>"u"||typeof navigator>"u")return!1;const e=navigator.userAgent||navigator.vendor||"",n=/iPad|iPhone|iPod/.test(e),i=/Macintosh/.test(e)&&typeof navigator.maxTouchPoints=="number"&&navigator.maxTouchPoints>1,s=(n||i)&&!window.MSStream,r=/Android/i.test(e),o=s||r;return t&&console.table({"User Agent":e,isAndroid:r,isiOSUA:n,isiPadOSDesktopUA:i,isMobileDevice:o}),o}function _L(t){if(!t)return null;let e=String(t).trim();if(!e)return null;/^[a-zA-Z][a-zA-Z0-9+.-]*:\/\//.test(e)||(e="http://"+e);let n="",i=null;try{i=new URL(e,window.location&&window.location.origin?window.location.origin:void 0),n=i.protocol}catch{const o=e.match(/^([a-zA-Z][a-zA-Z0-9+.-]*:)/);n=o?o[1].toLowerCase():""}if(i&&!i.hostname)return null;const s=n.toLowerCase();return s!=="http:"&&s!=="https:"?null:e}function yL(t){const e=document.createDocumentFragment();if(!t)return e;const n=/((?:https?:\/\/|www\.)[^\s<>]+\.[^\s<>]+)/g;let i=0,s;for(;(s=n.exec(t))!==null;){const r=s[0],o=s.index;o>i&&e.appendChild(document.createTextNode(t.slice(i,o)));const a=r.replace(/[.,!?:;\)\]\}]+$/g,""),c=r.slice(a.length),l=_L(a);if(!l)e.appendChild(document.createTextNode(r));else{const u=document.createElement("a");u.href=l,u.textContent=a,u.target="_blank",u.rel="noopener noreferrer",u.className="message-link",e.appendChild(u),c&&e.appendChild(document.createTextNode(c))}i=o+r.length}return i<t.length&&e.appendChild(document.createTextNode(t.slice(i))),e}const al={heart:"❤️",thumbsUp:"👍",laugh:"😂"},Ti={doubleTapDelay:300,longPressDelay:500,defaultReaction:"heart",maxReactionsPerMessage:0,enableAnimations:!0};function Bf(t){return al[t]||al.heart}function wL(){return{...al}}class vL{constructor(){this.reactions=new Map}addReaction(e,n=Ti.defaultReaction){if(!e)throw new Error("messageId is required");this.reactions.has(e)||this.reactions.set(e,{});const i=this.reactions.get(e);return i[n]=(i[n]||0)+1,this.getReactions(e)}removeReaction(e,n=Ti.defaultReaction){if(!e)throw new Error("messageId is required");const i=this.reactions.get(e);return i?(i[n]>0&&(i[n]--,i[n]===0&&delete i[n]),Object.keys(i).length===0&&this.reactions.delete(e),this.getReactions(e)):{}}getReactions(e){return this.reactions.get(e)||{}}hasReactions(e){const n=this.reactions.get(e);return!!(n&&Object.keys(n).length>0)}getReactionCount(e,n){const i=this.reactions.get(e);return i&&i[n]||0}clearReactions(e){this.reactions.delete(e)}clearAll(){this.reactions.clear()}}class bL{constructor(e){this.reactionManager=e,this.doubleTapTimers=new Map,this.longPressTimers=new Map,this.activePicker=null,this.activePickerMessageElement=null}enableDoubleTap(e,n,i){if(!e||!n){console.warn("[ReactionUI] Invalid parameters for enableDoubleTap");return}const s="ontouchstart"in window,r=s?"touchend":"click",o=l=>{if(l.target.tagName==="A"||l.target.tagName==="BUTTON")return;const u=Date.now(),d=this.doubleTapTimers.get(e);d&&u-d<Ti.doubleTapDelay?(l.preventDefault(),this.handleDoubleTap(e,n,i),this.doubleTapTimers.delete(e)):this.doubleTapTimers.set(e,u)},a=l=>{if(l.target.tagName==="A"||l.target.tagName==="BUTTON")return;const u=setTimeout(()=>{this.showPicker(e,n,i)},Ti.longPressDelay);this.longPressTimers.set(e,u)},c=()=>{const l=this.longPressTimers.get(e);l&&(clearTimeout(l),this.longPressTimers.delete(e),this.activePicker||(e.style.userSelect="",e.style.webkitUserSelect=""))};e.addEventListener(r,o,{passive:!1}),s?(e.addEventListener("touchstart",a,{passive:!0}),e.addEventListener("touchend",c,{passive:!0}),e.addEventListener("touchmove",c,{passive:!0}),e.addEventListener("touchcancel",c,{passive:!0})):(e.addEventListener("mousedown",a),e.addEventListener("mouseup",c),e.addEventListener("mouseleave",c)),e._reactionCleanup=()=>{e.removeEventListener(r,o),s?(e.removeEventListener("touchstart",a),e.removeEventListener("touchend",c),e.removeEventListener("touchmove",c),e.removeEventListener("touchcancel",c)):(e.removeEventListener("mousedown",a),e.removeEventListener("mouseup",c),e.removeEventListener("mouseleave",c)),this.doubleTapTimers.delete(e),c()}}async handleDoubleTap(e,n,i){const s=Ti.defaultReaction;i&&await i(s,e,n)}renderReactions(e,n,i){let s=e.querySelector(".message-reactions");if(!s){s=document.createElement("div"),s.className="message-reactions";const o=e.querySelector(".message-text");o?o.appendChild(s):e.appendChild(s)}if(s.innerHTML="",!Object.values(i).some(o=>o>0)){s.style.display="none";return}s.style.display="";for(const[o,a]of Object.entries(i))if(a>0){const c=this.createReactionBadge(o);s.appendChild(c)}}createReactionBadge(e){const n=document.createElement("span");return n.className="reaction-badge",n.dataset.reactionType=e,n.textContent=Bf(e),n}showReactionAnimation(e,n){const i=Bf(n),s=document.createElement("div");s.className="reaction-animation",s.textContent=i;const r=e.getBoundingClientRect();s.style.position="fixed",s.style.left=`${r.left+r.width/2}px`,s.style.top=`${r.top+r.height/2}px`,document.body.appendChild(s),setTimeout(()=>{s.remove()},1e3)}showPicker(e,n,i){this.hidePicker();const s=document.createElement("div");s.className="reaction-picker";const r=wL();for(const[c,l]of Object.entries(r)){const u=document.createElement("button");u.type="button",u.className="reaction-picker-btn",u.textContent=l,u.dataset.reactionType=c,u.addEventListener("click",async d=>{d.stopPropagation(),i&&await i(c,e,n),this.hidePicker()}),s.appendChild(u)}const o=e.getBoundingClientRect();s.style.position="fixed",s.style.left=`${o.left+o.width/2}px`,s.style.top=`${o.top-8}px`,document.body.appendChild(s),this.activePicker=s,this.activePickerMessageElement=e;const a=c=>{s.contains(c.target)||(this.hidePicker(),document.removeEventListener("click",a,!0))};setTimeout(()=>{document.addEventListener("click",a,!0)},0)}hidePicker(){this.activePicker&&(this.activePicker.remove(),this.activePicker=null,this.activePickerMessageElement&&(this.activePickerMessageElement.style.userSelect="",this.activePickerMessageElement.style.webkitUserSelect="",this.activePickerMessageElement=null))}cleanup(e){e._reactionCleanup&&e._reactionCleanup()}}function EL(){const t=document.createElement("div");t.innerHTML=`
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
  `,document.body.appendChild(t);const e=t.querySelector("#messages-box"),n=t.querySelector("#messages"),i=t.querySelector("#messages-form"),s=t.querySelector("#messages-input");"virtualKeyboard"in navigator&&(navigator.virtualKeyboard.overlaysContent=!0);const r=CSS.supports?.("field-sizing","content");let o=null;if(s&&s.tagName==="TEXTAREA"&&!r){const a=()=>{s.style.height="auto",s.style.height=`${s.scrollHeight}px`};s.addEventListener("input",a,{passive:!0}),o=()=>{s.style.height=""},requestAnimationFrame(a)}return{messagesBoxContainer:t,messagesBox:e,messagesMessages:n,messagesForm:i,messagesInput:s,resetInputHeight:o}}const CL=CSS.supports?.("position-anchor: --msg-toggle")&&CSS.supports?.("right: anchor(right)")&&CSS.supports?.("bottom: anchor(top)");function TL(t){const e=t.getBoundingClientRect();return e.top>=0&&e.left>=0&&e.bottom<=window.innerHeight&&e.right<=window.innerWidth}function SL(){let t=!1,e=null,n=null,i=!1,s=new Map;const r=new vL,o=new bL(r),a=document.querySelector(".top-bar .top-right-menu")||document.querySelector(".top-right-menu"),c=_y({parent:a,onToggle:()=>Ea(),icon:"💬",initialUnreadCount:0,id:"main-messages-toggle-btn",startHidden:!0});if(!c)return console.error("Messages UI: failed to initialize message toggle; aborting messages UI initialization."),null;const l=c.element,{messagesBoxContainer:u,messagesBox:d,messagesMessages:h,messagesForm:f,messagesInput:p,resetInputHeight:_}=EL();if(!l||!d||!h||!f||!p)return console.error("Messages UI elements not found."),null;const m=document.getElementById("attach-file-btn"),A=document.getElementById("file-input"),x=f.querySelector('button[type="submit"]');w(m),m.addEventListener("click",()=>{A.click()}),A.addEventListener("change",async v=>{const k=v.target.files[0];if(!k||!n){n||console.warn("[MessagesUI] FileTransfer not initialized");return}const N=x.textContent;x.textContent="Sending...";try{await n.sendFile(k,F=>{x.textContent=`${Math.round(F*100)}%`}),k.type.startsWith("video/")&&s.set(k.name,k),be(`📎 Sent: ${k.name}`,{isSentByMe:!0})}catch(F){console.error("[MessagesUI] File send failed:",F),be("❌ Failed to send file")}finally{x.textContent=N,A.value=""}});async function W(v){return new Promise(k=>{const N=document.createElement("div");N.className="file-action-overlay",N.style.cssText=`
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
      `,N.appendChild(F),document.body.appendChild(N);const J=F.querySelector("#file-name-display");J.textContent=v;const j=F.querySelector("#download-file-btn"),de=F.querySelector("#watch-together-btn");j.addEventListener("mouseenter",()=>{j.style.background="var(--bg-hover, #333)"}),j.addEventListener("mouseleave",()=>{j.style.background="var(--bg-secondary, #2a2a2a)"}),de.addEventListener("mouseenter",()=>{de.style.opacity="0.9"}),de.addEventListener("mouseleave",()=>{de.style.opacity="1"}),j.addEventListener("click",()=>{N.remove(),k("download")}),de.addEventListener("click",()=>{N.remove(),k("watch")}),N.addEventListener("click",ss=>{ss.target===N&&(N.remove(),k("download"))})})}async function S(v){return new Promise(k=>{const N=document.createElement("div");N.className="watch-request-overlay",N.style.cssText=`
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
      `,N.appendChild(F),document.body.appendChild(N);const J=F.querySelector("#watch-request-filename");J.textContent=v;const j=F.querySelector("#decline-watch-btn"),de=F.querySelector("#accept-watch-btn");j.addEventListener("mouseenter",()=>{j.style.background="var(--bg-hover, #333)"}),j.addEventListener("mouseleave",()=>{j.style.background="var(--bg-secondary, #2a2a2a)"}),de.addEventListener("mouseenter",()=>{de.style.opacity="0.9"}),de.addEventListener("mouseleave",()=>{de.style.opacity="1"}),j.addEventListener("click",()=>{N.remove(),k(!1)}),de.addEventListener("click",()=>{N.remove(),k(!0)}),N.addEventListener("click",ss=>{ss.target===N&&(N.remove(),k(!1))})})}window.onFileWatchRequestReceived=async v=>{const k=s.get(v);if(!k){be(`❌ File not available to watch together: ${v}`),await rl();return}be(`🎬 Partner wants to watch: ${v}`),await S(v)?(be("✅ Joining watch together..."),await x0(k)||be("❌ Failed to load video")):(be("❌ Declined watch together request"),await rl())};function X(){if(!l||!d||d.classList.contains("hidden"))return;const v=l.getBoundingClientRect(),k=d.getBoundingClientRect(),N=8;let F=v.top-k.height-N;F<8&&(F=v.bottom+N);let J=v.left+v.width/2-k.width/2;const j=window.innerWidth-k.width-8;J<8&&(J=8),J>j&&(J=j),d.style.top=`${Math.round(F)}px`,d.style.left=`${Math.round(J)}px`}function tt(){t||(t=!0,window.addEventListener("resize",X,{passive:!0}),window.addEventListener("scroll",X,{passive:!0}),window.addEventListener("orientationchange",X,{passive:!0}))}function $e(){t&&(t=!1,window.removeEventListener("resize",X),window.removeEventListener("scroll",X),window.removeEventListener("orientationchange",X))}let Se=null;const En=new MutationObserver(v=>{v.forEach(k=>{k.type==="attributes"&&k.attributeName==="class"&&(d.classList.contains("hidden")||(c.clearBadge(),e?.toggle&&e.toggle.clearBadge()))})});En.observe(d,{attributes:!0});function ni(){return!d.classList.contains("hidden")}function ba(){return document.activeElement===p}function Zy(){ba()||p.focus()}function ew(){ba()&&p.blur()}function Ea(){d.classList.toggle("hidden"),ni()?($f()||p.focus(),CL?requestAnimationFrame(()=>{TL(d)||(X(),tt())}):(X(),tt()),hd()):(document.activeElement===p&&p.blur(),$e(),d.style.top="",d.style.left="",d.style.bottom="",d.style.right="")}Se=ko(d,()=>{w(d),$e(),d.style.top="",d.style.left="",d.style.bottom="",d.style.right=""},{ignore:[c.element],esc:!0,ignoreInputBlur:$f()});function tw(){D(c.element)}function dd(){w(c.element)}const Ca=new Map;function be(v,k={}){const{isSentByMe:N,senderDisplay:F,fileDownload:J,messageId:j,reactions:de}=k,ss=F??(N===!0?"Me":""),nt=document.createElement("p");N===!0?nt.classList.add("message-local"):N===!1&&nt.classList.add("message-remote");const gr=document.createElement("span");gr.className="sender-avatar"+(N===!0?" sender-avatar--me":""),gr.textContent=ss,gr.setAttribute("aria-hidden","true");const rs=document.createElement("span");if(rs.className="message-text",!F&&typeof N>"u"&&nt.classList.add("message-system"),J){const{fileName:Ie,url:Tn}=J,Be=v.split(Ie)[0];Be&&rs.appendChild(document.createTextNode(Be));const it=document.createElement("a");it.textContent=Ie,it.href=Tn,it.download=Ie,it.style.cursor="pointer",it.style.textDecoration="underline",it.addEventListener("click",()=>{setTimeout(()=>URL.revokeObjectURL(Tn),100)}),rs.appendChild(it)}else{const Ie=yL(v);rs.appendChild(Ie)}if(J&&nt.classList.add("message-system"),nt.appendChild(gr),nt.appendChild(rs),typeof N<"u"&&!J&&j){if(nt.dataset.messageId=j,Ca.set(j,nt),de&&Object.keys(de).length>0){const Ie={};for(const[Tn,Be]of Object.entries(de))Ie[Tn]=Be.length;o.renderReactions(nt,j,Ie)}o.enableDoubleTap(nt,j,async(Ie,Tn,Be)=>{if(!e){console.warn("[MessagesUI] No current session for reaction");return}try{const it=await e.getReactions(Be),gd=M();if(!gd){console.warn("[MessagesUI] Cannot react: not logged in");return}let os=null;for(const[uw,dw]of Object.entries(it))if(dw.includes(gd)){os=uw;break}let Sa;os===Ie?(await e.removeReaction(Be,Ie),Sa=r.removeReaction(Be,Ie)):(os&&(await e.removeReaction(Be,os),r.removeReaction(Be,os)),await e.addReaction(Be,Ie),Sa=r.addReaction(Be,Ie),Ti.enableAnimations&&o.showReactionAnimation(Tn,Ie)),o.renderReactions(Tn,Be,Sa)}catch(it){console.warn("[MessagesUI] Failed to toggle reaction:",it)}})}h.appendChild(nt),hd()}let Cn=null;function hd(){h&&(Cn!==null&&cancelAnimationFrame(Cn),Cn=requestAnimationFrame(()=>{h.scrollTop=h.scrollHeight,Cn=null}))}function nw(v,{isUnread:k=!0,senderDisplay:N="U",messageId:F,reactions:J}={}){if(be(v,{isSentByMe:!1,senderDisplay:N,messageId:F,reactions:J}),Eo(d)&&k){const j=c.element.unreadCount||0;c.setUnreadCount(j+1)}}function fd(){const v=p.value.trim();v&&(e?(e.send(v),p.value="",_&&_()):console.warn("[MessagesUI] No active session to send message"))}f.addEventListener("submit",v=>{v.preventDefault(),fd()}),p.addEventListener("keydown",v=>{v.key==="Enter"&&!v.shiftKey&&(v.preventDefault(),fd())});const iw=()=>{const v=document.activeElement;return v&&(v.tagName==="INPUT"||v.tagName==="TEXTAREA"||v.isContentEditable)},pd=v=>{(v.key==="m"||v.key==="M")&&!ni()&&!iw()&&(v.preventDefault(),Ea())};document.addEventListener("keydown",pd);function Ta(){Cn!==null&&(cancelAnimationFrame(Cn),Cn=null),h.innerHTML="",h.scrollTop=0}function sw(v){e!==null&&e!==v&&Ta(),e=v}function rw(){return e}function ow(v){n=v,n?(D(m),n.onFileReceived=async k=>{const N=URL.createObjectURL(k);if(k.type.startsWith("video/"))if(await W(k.name)==="watch"){if(be(`📹 Received video: ${k.name}`,{isSentByMe:!1}),be("🎬 Requesting partner to join watch together..."),!await Js(k)){be("❌ Failed to load video");return}const j=await M0(k.name);be(j?"⏳ Waiting for partner to join...":"❌ Failed to send watch request")}else{const J=document.createElement("a");J.href=N,J.download=k.name,J.click(),setTimeout(()=>URL.revokeObjectURL(N),1e3),be(`📎 Downloaded: ${k.name}`)}else be(`📎 Received: ${k.name}`,{isSentByMe:!1,fileDownload:{fileName:k.name,url:N}});if(Eo(d)){const F=c.element.unreadCount||0;c.setUnreadCount(F+1)}i&&(x.textContent="Send",i=!1)},n.onReceiveProgress=k=>{i=!0,x.textContent=`${Math.round(k*100)}%`}):w(m)}function aw(){Ta(),e=null,n=null,i=!1,dd(),w(d),c.clearBadge(),p.value="",_&&_(),x&&(x.textContent="Send"),w(m),d.style.top="",d.style.left="",d.style.bottom="",d.style.right="",$e(),Ca.clear(),r.clearAll()}function cw(v,k){const N=Ca.get(v);if(!N)return;const F={};for(const[J,j]of Object.entries(k||{}))F[J]=j.length;r.clearReactions(v);for(const[J,j]of Object.entries(F))for(let de=0;de<j;de++)r.addReaction(v,J);o.renderReactions(N,v,F)}function lw(){if(c&&c.cleanup(),$e(),typeof Se=="function")try{Se()}catch(v){console.error("Error removing messages box outside click handler:",v)}En.disconnect(),document.removeEventListener("keydown",pd),u&&u.parentNode&&u.parentNode.removeChild(u)}return{appendChatMessage:be,receiveMessage:nw,updateMessageReactions:cw,isMessagesUIOpen:ni,toggleMessages:Ea,showMessagesToggle:tw,hideMessagesToggle:dd,isMessageInputFocused:ba,focusMessageInput:Zy,unfocusMessageInput:ew,setSession:sw,getCurrentSession:rw,clearMessages:Ta,setFileTransfer:ow,reset:aw,cleanup:lw}}const Ee=SL();class IL{constructor(){this.listeners=new Map}on(e,n){this.listeners.has(e)||this.listeners.set(e,new Set),this.listeners.get(e).add(n)}off(e,n){this.listeners.has(e)&&this.listeners.get(e).delete(n)}emit(e,n){if(this.listeners.has(e))for(const i of Array.from(this.listeners.get(e)))try{i(n)}catch(s){console.warn("CallController listener error",s)}}}class kL{constructor(){this.emitter=new IL,this.resetState()}resetState(){this.state="idle",this.roomId=null,this.roomLink=null,this.role=null,this.partnerId=null,this.pc=null,this.dataChannel=null,this.messagesUI=null,this.localVideoEl=null,this.remoteVideoEl=null,this.isHangingUp=!1,this.isCleaningUp=!1,this.listeners=new Map,this.wasConnected=!1}getState(){return{state:this.state,roomId:this.roomId,roomLink:this.roomLink,role:this.role,partnerId:this.partnerId,hasPc:!!this.pc,isHangingUp:this.isHangingUp,isCleaningUp:this.isCleaningUp}}on(e,n){this.emitter.on(e,n)}off(e,n){this.emitter.off(e,n)}setPartnerId(e){this.partnerId=e}setupCancellationListener(e){if(!e)return;const n=b(E,`rooms/${e}/cancellation`);let i=!1;const s=async r=>{const o=r.val();if(o&&!i){i=!0;try{this.remoteVideoEl&&(this.remoteVideoEl.srcObject=null)}catch(a){console.warn("Failed to clear remote video after cancellation",a)}try{this.pc&&this.pc.close()}catch{}try{await this.cleanupCall({reason:o.reason||"remote_cancelled"})}catch(a){console.warn("Failed to trigger CallController cleanup",a)}}};Cs(n,s,e),this.listeners.has("cancellation")||this.listeners.set("cancellation",[]),this.listeners.get("cancellation").push({ref:n,callback:s,roomId:e})}setupAnswerListener(e,n,i){if(!e||!n)return;const s=b(E,`rooms/${e}/answer`),r=async o=>{const a=o.val();if(a){const{setRemoteDescription:c}=await Le(async()=>{const{setRemoteDescription:l}=await Promise.resolve().then(()=>K0);return{setRemoteDescription:l}},void 0);await c(n,a,i)}};Cs(s,r,e),this.listeners.has("answer")||this.listeners.set("answer",[]),this.listeners.get("answer").push({ref:s,callback:r,roomId:e})}setupRejectionListener(e){if(!e)return;const n=b(E,`rooms/${e}/rejection`);let i=!1;const s=async r=>{const o=r.val();if(o&&!i&&(i=!0,this.pc?.connectionState!=="connected")){try{const{onCallRejected:a}=await Le(async()=>{const{onCallRejected:c}=await Promise.resolve().then(()=>b0);return{onCallRejected:c}},void 0);await a(o.reason||"user_rejected")}catch{}try{await se.leaveRoom(ge(),e)}catch{}try{this.pc&&this.pc.close()}catch{}}};Cs(n,s,e),this.listeners.has("rejection")||this.listeners.set("rejection",[]),this.listeners.get("rejection").push({ref:n,callback:s,roomId:e})}setupMemberJoinedListener(e){if(!e)return;const n=ge(),i=s=>{s.key!==n&&(this.setPartnerId(s.key),this.emitter.emit("memberJoined",{memberId:s.key,roomId:e}))};se.onMemberJoined(e,i),this.listeners.has("member-joined")||this.listeners.set("member-joined",[]),this.listeners.get("member-joined").push({callback:i,roomId:e})}setupMemberLeftListener(e){if(!e)return;const n=ge(),i=s=>{s.key!==n&&this.pc?.connectionState==="connected"&&this.emitter.emit("memberLeft",{memberId:s.key,roomId:e})};se.onMemberLeft(e,i),this.listeners.has("member-left")||this.listeners.set("member-left",[]),this.listeners.get("member-left").push({callback:i,roomId:e})}removeTrackedListeners(){try{for(const[e,n]of this.listeners.entries())for(const i of n)try{i.ref&&Rt(i.ref,"value",i.callback)}catch(s){console.warn(`Failed to remove ${e} listener`,s)}}catch(e){console.warn("Failed to remove tracked listeners",e)}finally{this.listeners.clear()}if(this.roomId)try{aa(this.roomId)}catch(e){console.warn("Failed to remove RTDB listeners for room",e)}}async createCall(e={}){this.state="creating";try{e.localVideoEl&&(this.localVideoEl=e.localVideoEl),e.remoteVideoEl&&(this.remoteVideoEl=e.remoteVideoEl);const n=await Y0(e);if(!n||!n.success)return this.state="idle",this.emitter.emit("error",{phase:"createCall",detail:n}),this.emitCallFailed("createCall",n),n;this.pc=n.pc,this.roomId=n.roomId,this.roomLink=n.roomLink||null,this.role=n.role||"initiator",this.dataChannel=n.dataChannel||null,this.messagesUI=n.messagesUI||null,this.state="waiting",this.pc&&typeof this.pc.addEventListener=="function"&&this.pc.addEventListener("connectionstatechange",()=>{this.pc.connectionState==="connected"&&(this.wasConnected=!0,this.state!=="connected"&&(this.state="connected"))}),this.dataChannel&&this.setupFileTransport(this.dataChannel);const{drainIceCandidateQueue:i}=await Le(async()=>{const{drainIceCandidateQueue:s}=await Promise.resolve().then(()=>_0);return{drainIceCandidateQueue:s}},void 0);return this.setupAnswerListener(this.roomId,this.pc,i),this.setupCancellationListener(this.roomId),this.setupRejectionListener(this.roomId),this.setupMemberJoinedListener(this.roomId),this.setupMemberLeftListener(this.roomId),this.emitter.emit("created",{roomId:this.roomId,roomLink:this.roomLink,role:this.role}),n}catch(n){throw this.state="idle",this.emitter.emit("error",{phase:"createCall",error:n}),this.emitCallFailed("createCall",n),n}}async answerCall(e={}){this.state="joining";try{e.localVideoEl&&(this.localVideoEl=e.localVideoEl),e.remoteVideoEl&&(this.remoteVideoEl=e.remoteVideoEl);const i=await J0({...e,onMessagesUIReady:s=>{this.messagesUI=s}});return!i||!i.success?(this.state="idle",this.emitter.emit("error",{phase:"answerCall",detail:i}),this.emitCallFailed("answerCall",i),i):(this.pc=i.pc,this.roomId=i.roomId,this.role=i.role||"joiner",this.dataChannel=i.dataChannel||null,!this.messagesUI&&i.messagesUI&&(this.messagesUI=i.messagesUI),this.state="connected",this.wasConnected=!0,this.dataChannel?this.setupFileTransport(this.dataChannel):this.role==="joiner"&&this.pc&&(this.pc.ondatachannel=s=>{this.dataChannel=s.channel,this.setupFileTransport(this.dataChannel)}),this.setupCancellationListener(this.roomId),this.setupMemberJoinedListener(this.roomId),this.setupMemberLeftListener(this.roomId),this.emitter.emit("answered",{roomId:this.roomId,role:this.role}),i)}catch(n){throw this.state="idle",this.emitter.emit("error",{phase:"answerCall",error:n}),this.emitCallFailed("answerCall",n),n}}setupFileTransport(e){if(!e)return;const n=()=>{try{const i=new sL(e);on.setFileTransport(i),Ee.setFileTransfer(i.fileTransfer),B("[CallController] File transport initialized")}catch(i){console.error("[CallController] Failed to setup file transport:",i)}};e.readyState==="open"?n():e.addEventListener("open",n,{once:!0})}async hangUp({emitCancel:e=!0,reason:n="user_hung_up"}={}){if(!this.isHangingUp){this.isHangingUp=!0;try{if(e&&this.roomId)try{await se.cancelCall(this.roomId,ge(),n)}catch(i){console.warn("CallController: cancelCall failed (non-fatal)",i)}await this.cleanupCall({reason:n}),this.emitter.emit("hangup",{roomId:this.roomId,reason:n})}catch(i){throw this.emitter.emit("error",{phase:"hangUp",error:i}),i}finally{this.isHangingUp=!1}}}isRemoteHangup(e){return e?["remote","cancelled","partner_disconnected","connection_failed"].some(i=>e.includes(i)):!1}emitCallFailed(e,n){this.emitter.emit("callFailed",{phase:e,error:n?.message||n?.error||n||"Unknown error"})}async cleanupCall({reason:e}={}){if(!this.isCleaningUp){this.isCleaningUp=!0;try{const n=this.roomId,i=this.partnerId,s=this.role,r=this.wasConnected;this.removeTrackedListeners();try{await se.leaveRoom(ge(),this.roomId)}catch{}try{if(this.pc){try{this.pc.close()}catch{}this.pc=null}}catch{}try{this.remoteVideoEl&&(this.remoteVideoEl.srcObject=null)}catch(o){console.warn("CallController: failed to clear remote video",o)}try{this.localVideoEl&&(this.localVideoEl.srcObject=null)}catch(o){console.warn("CallController: failed to clear local video",o)}try{const{cleanupLocalStream:o}=await Le(async()=>{const{cleanupLocalStream:a}=await Promise.resolve().then(()=>S0);return{cleanupLocalStream:a}},void 0);o()}catch(o){console.warn("CallController: failed to cleanup local stream",o)}try{const{resetLocalStreamInitFlag:o}=await Le(async()=>{const{resetLocalStreamInitFlag:a}=await Promise.resolve().then(()=>aM);return{resetLocalStreamInitFlag:a}},void 0);o()}catch{}this.isRemoteHangup(e)&&this.emitter.emit("remoteHangup",{roomId:n,partnerId:i,reason:e});try{on.clearFileTransport(),Ee.setFileTransfer(null)}catch(o){console.warn("CallController: failed to cleanup file transport",o)}if(this.messagesUI&&this.messagesUI.cleanup)try{this.messagesUI.cleanup()}catch(o){console.warn("CallController: failed to cleanup messages UI",o)}this.resetState(),this.emitter.emit("cleanup",{roomId:n,role:s,wasConnected:r,partnerId:i,reason:e})}catch(n){throw this.emitter.emit("error",{phase:"cleanupCall",error:n}),n}finally{this.isCleaningUp=!1}}}}const _e=new kL,cl={default:{echoCancellation:!0,noiseSuppression:!0,autoGainControl:!0},withVoiceIsolationIfSupported:{echoCancellation:!0,noiseSuppression:!0,autoGainControl:!0,voiceIsolation:!0,restrictOwnAudio:!0,googHighpassFilter:!0,googTypingNoiseDetection:!0,highpassFilter:!0,typingNoiseDetection:!0}};function yy(){const t=navigator.mediaDevices.getSupportedConstraints();return["voiceIsolation","highpassFilter","typingNoiseDetection"].every(i=>t[i])?cl.withVoiceIsolationIfSupported:cl.default}const RL=()=>cl.default,AL={desktop:{landscape:{width:{ideal:1920},height:{ideal:1080},frameRate:{min:10,ideal:30},aspectRatio:{ideal:16/9}},portrait:{width:{ideal:1080},height:{ideal:1920},frameRate:{min:10,ideal:30},aspectRatio:{ideal:9/16}}},mobile:{portrait:{width:{ideal:1080},height:{ideal:1920},aspectRatio:{ideal:9/16},frameRate:{ideal:30}},landscape:{width:{ideal:1920},height:{ideal:1080},aspectRatio:{ideal:16/9},frameRate:{ideal:30}}}},NL=()=>window.screen?.orientation?.type?.includes("portrait")||window.orientation===0||window.orientation===180;function ed(t){const e=NL()?"portrait":"landscape",i=/Mobi|Android/i.test(navigator.userAgent)?"mobile":"desktop",s=AL[i][e];return{facingMode:t,...s}}function PL(){return!!(navigator.mediaDevices&&navigator.mediaDevices.enumerateDevices)}async function LL(){return PL()?(await navigator.mediaDevices.enumerateDevices()).filter(e=>e.kind==="videoinput"):[]}async function OL(){const t=await LL();let e=!1,n=!1;return t.forEach(i=>{const s=i.label.toLowerCase();(s.includes("front")||s.includes("user"))&&(e=!0),(s.includes("back")||s.includes("rear")||s.includes("environment"))&&(n=!0)}),e&&n}async function DL({localStream:t,localVideo:e,currentFacingMode:n,peerConnection:i=null}){if(!t||!e)return console.error("switchCamera: missing localStream or localVideo"),null;const s=n==="user"?"environment":"user";try{const r=await navigator.mediaDevices.getUserMedia({video:ed(s),audio:yy()}),o=r.getVideoTracks()[0],a=r.getAudioTracks()[0],c=t.getVideoTracks()[0],l=c?c.enabled:!0,u=t.getAudioTracks()[0],d=u?!u.enabled:!1;if(o&&(o.enabled=l),a&&(a.enabled=!d),t.getTracks().forEach(h=>h.stop()),i){const h=i.getSenders().find(p=>p.track&&p.track.kind==="video");h&&await h.replaceTrack(o);const f=i.getSenders().find(p=>p.track&&p.track.kind==="audio");f&&a&&await f.replaceTrack(a)}return e.srcObject=new MediaStream([o].filter(Boolean)),{newStream:r,facingMode:s}}catch(r){return console.error("Failed to switch camera:",r),null}}let ic=!1,kn=null,Rn=null;function ML({getLocalStream:t,getFacingMode:e}){return kn&&Rn&&kn.removeEventListener("change",Rn),kn=window.matchMedia("(orientation: portrait)"),Rn=()=>{try{const n=typeof t=="function"?t():null,i=typeof e=="function"?e():"user";xL({localStream:n,currentFacingMode:i})}catch(n){console.error("Orientation handler failed:",n)}},kn.addEventListener("change",Rn),()=>{kn&&Rn&&kn.removeEventListener("change",Rn),kn=null,Rn=null}}async function xL({localStream:t,currentFacingMode:e}){if(!(ic||!t?.getVideoTracks()[0])){ic=!0;try{const n=t.getVideoTracks()[0],i=ed(e);B("Applying constraints:",i),await n.applyConstraints(i),B("Video constraints updated successfully")}catch(n){console.error("Failed to apply orientation constraints:",n)}finally{ic=!1}}}let ll=[];function FL(t,e){const n=e.querySelector("i");n.className=t?"fa fa-microphone-slash":"fa fa-microphone"}function UL({getLocalStream:t,getLocalVideo:e,getRemoteVideo:n,getPeerConnection:i=()=>null,setLocalStream:s=null,micBtn:r,cameraBtn:o,switchCameraBtn:a,mutePartnerBtn:c,fullscreenPartnerBtn:l,remotePipBtn:u}){r&&(r.onclick=()=>{const h=t();if(!h)return;const f=h.getAudioTracks()[0];f&&(f.enabled=!f.enabled,FL(!f.enabled,r))}),o&&(o.onclick=()=>{const h=t();if(!h)return;const f=h.getVideoTracks()[0];if(f){f.enabled=!f.enabled;const p=o.querySelector("i");p.className=f.enabled?"fa fa-video":"fa fa-video-slash"}});const d=ML({getLocalStream:t,getFacingMode:nl});ll.push(d),a&&(a.onclick=async()=>{const h=await DL({localStream:t(),localVideo:e(),currentFacingMode:nl(),peerConnection:i()||null});h?(Y_(h.facingMode),console.log("Switched camera to facingMode:",h.facingMode),h.newStream&&typeof s=="function"&&s(h.newStream)):console.error("Camera switch failed.")},(async()=>await OL()?D(a):w(a))()),c&&(c.onclick=()=>{const h=n();if(!h)return;h.muted=!h.muted;const f=c.querySelector("i");f.className=h.muted?"fa fa-volume-mute":"fa fa-volume-up"}),l&&(l.onclick=()=>{const h=n();h.requestFullscreen?h.requestFullscreen():h.webkitRequestFullscreen&&h.webkitRequestFullscreen()}),u&&(u.onclick=async()=>{const h=n();if(h)try{document.pictureInPictureElement===h?await document.exitPictureInPicture():h.requestPictureInPicture&&await h.requestPictureInPicture()}catch(f){console.error("Picture-in-Picture failed:",f)}})}function $L(){ll.forEach(t=>t()),ll=[]}const BL=async()=>{if(Q_())return console.debug("Reusing existing local MediaStream."),ma();const t=ed("user"),e=yy();try{const n=await navigator.mediaDevices.getUserMedia({video:t,audio:e});return Co(n),n}catch(n){if(n.name==="OverconstrainedError"){console.warn(`❌ Constraint failed on property: ${n.constraint}, falling back to basic constraints`);const i=RL(),s=await navigator.mediaDevices.getUserMedia({video:!0,audio:i});return Co(s),s}throw n}};async function HL(t){const e=await BL(),n=new MediaStream(e.getVideoTracks());return t.srcObject=n,!0}function VL(t,e,n){return t.ontrack=i=>{B(`REMOTE TRACK RECEIVED: ${i.track.kind}`);const s=ga()?zu():null;let r;i.streams&&i.streams[0]&&i.streams[0]instanceof MediaStream?r=i.streams[0]:(console.warn("No stream in track event, using fallback track handling"),s?(s.addTrack(i.track),r=s):r=new MediaStream([i.track])),J_(r),e.srcObject=r,s!==r||B(`Added ${i.track.kind} track to existing remote stream`);try{const o=document.getElementById("remote-video-box")||e.parentElement;o&&(o.classList?.remove("hidden"),e.classList?.remove("hidden"),o.style.visibility="visible",o.style.opacity="1",o.style.position="",o.style.left="",o.style.top="",e.style.visibility="visible",e.style.opacity="1")}catch(o){console.warn("Visibility override failed:",o)}},!0}let $r=null,_t=null;async function wy(t,e="User"){const n=M(),i=gn();if(!n||!i)throw new Error("Must be logged in to send invites");if(!t)throw new Error("Recipient user ID is required");const s=wo(n,t),r=b(E,`users/${t}/incomingInvites/${n}`),o={fromUserId:n,fromName:i.displayName||"Anonymous",fromEmail:i.email||"",fromPhotoURL:i.photoURL||null,roomId:s,timestamp:Date.now(),status:"pending"};await ne(r,o),console.log(`[INVITATIONS] Sent invite to ${e} (${t})`)}function WL(t){const e=M();if(!e)return console.warn("[INVITATIONS] Cannot listen for invites - not logged in"),()=>{};ul();const n=b(E,`users/${e}/incomingInvites`);return $r=Ws(n,i=>{const s=i.key,r=i.val();r&&r.status==="pending"&&(console.log(`[INVITATIONS] New invite from ${r.fromName}`),t(s,r))}),console.log("[INVITATIONS] Listening for incoming invites"),ul}async function jL(t,e){const n=M(),i=gn();if(!n||!i)throw new Error("Must be logged in to accept invites");const s=b(E,`users/${n}/contacts/${t}`);await ne(s,{contactId:t,contactName:e.fromName||"User",roomId:e.roomId,savedAt:Date.now()});const r=b(E,`users/${t}/acceptedInvites/${n}`);await ne(r,{acceptedByUserId:n,acceptedByName:i.displayName||"User",acceptedByEmail:i.email||"",acceptedByPhotoURL:i.photoURL||null,roomId:e.roomId,timestamp:Date.now()});const o=b(E,`users/${n}/incomingInvites/${t}`);await Ze(o),console.log(`[INVITATIONS] Accepted invite from ${e.fromName} and notified sender`)}async function qL(t){const e=M();if(!e)throw new Error("Must be logged in to decline invites");const n=b(E,`users/${e}/incomingInvites/${t}`);await Ze(n),console.log(`[INVITATIONS] Declined invite from ${t}`)}function zL(t){const e=M();if(!e)return console.warn("[INVITATIONS] Cannot listen for accepted invites - not logged in"),()=>{};_t&&(_t(),_t=null);const n=b(E,`users/${e}/acceptedInvites`);return _t=Ws(n,async i=>{const s=i.key,r=i.val();if(r)try{const o=b(E,`users/${e}/contacts/${s}`);await ne(o,{contactId:s,contactName:r.acceptedByName||"User",roomId:r.roomId,savedAt:Date.now()}),console.log(`[INVITATIONS] Auto-saved contact: ${r.acceptedByName} (invite accepted)`);const a=b(E,`users/${e}/acceptedInvites/${s}`);await Ze(a),t&&t(s,r)}catch(o){console.error("[INVITATIONS] Failed to auto-save contact from accepted invite:",o)}}),console.log("[INVITATIONS] Listening for accepted invites"),()=>{_t&&(_t(),_t=null)}}function ul(){$r&&($r(),$r=null),_t&&(_t(),_t=null),console.log("[INVITATIONS] Cleaned up all invite listeners")}function GL(){w(ce),w(me),w(Ae),w(Ye)}function KL(t){t.on("memberJoined",cy),t.on("cleanup",()=>{$n(),ly()})}let Si=null;function _a(t,e={}){return new Promise(n=>{const i=document.createElement("dialog");i.innerHTML=`
      <p>${t}</p>
      <div class="confirm-dialog-actions">
        <button data-action="cancel">Cancel</button>
        <button data-action="confirm" autofocus>Confirm</button>
      </div>
    `,i.classList.add("confirm-dialog");const s=i.querySelector('[data-action="confirm"]'),r=i.querySelector('[data-action="cancel"]');if(!s||!r){console.error("dialog element not found!"),n(!1);return}let o=null;function a(c){o&&clearTimeout(o),i.close(),i.remove(),Si===a&&(Si=null),n(c)}s.addEventListener("click",()=>{a(!0)}),r.addEventListener("click",()=>{a(!1)}),i.addEventListener("cancel",()=>a(!1)),document.body.appendChild(i),i.showModal(),Si=a,e.autoRemoveSeconds&&typeof e.autoRemoveSeconds=="number"&&e.autoRemoveSeconds>0&&(o=setTimeout(()=>{a(!1)},e.autoRemoveSeconds*1e3))})}function YL(){if(typeof Si=="function"){try{Si(!1)}catch{}return Si=null,!0}return!1}const JL=Object.freeze(Object.defineProperty({__proto__:null,default:_a,dismissActiveConfirmDialog:YL},Symbol.toStringTag,{value:"Module"})),vy="@firebase/installations",td="0.6.19";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const by=1e4,Ey=`w:${td}`,Cy="FIS_v2",XL="https://firebaseinstallations.googleapis.com/v1",QL=3600*1e3,ZL="installations",eO="Installations";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const tO={"missing-app-config-values":'Missing App configuration value: "{$valueName}"',"not-registered":"Firebase Installation is not registered.","installation-not-found":"Firebase Installation not found.","request-failed":'{$requestName} request failed with error "{$serverCode} {$serverStatus}: {$serverMessage}"',"app-offline":"Could not process request. Application offline.","delete-pending-registration":"Can't delete installation while there is a pending registration request."},Yn=new wn(ZL,eO,tO);function Ty(t){return t instanceof jt&&t.code.includes("request-failed")}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Sy({projectId:t}){return`${XL}/projects/${t}/installations`}function Iy(t){return{token:t.token,requestStatus:2,expiresIn:iO(t.expiresIn),creationTime:Date.now()}}async function ky(t,e){const i=(await e.json()).error;return Yn.create("request-failed",{requestName:t,serverCode:i.code,serverMessage:i.message,serverStatus:i.status})}function Ry({apiKey:t}){return new Headers({"Content-Type":"application/json",Accept:"application/json","x-goog-api-key":t})}function nO(t,{refreshToken:e}){const n=Ry(t);return n.append("Authorization",sO(e)),n}async function Ay(t){const e=await t();return e.status>=500&&e.status<600?t():e}function iO(t){return Number(t.replace("s","000"))}function sO(t){return`${Cy} ${t}`}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function rO({appConfig:t,heartbeatServiceProvider:e},{fid:n}){const i=Sy(t),s=Ry(t),r=e.getImmediate({optional:!0});if(r){const l=await r.getHeartbeatsHeader();l&&s.append("x-firebase-client",l)}const o={fid:n,authVersion:Cy,appId:t.appId,sdkVersion:Ey},a={method:"POST",headers:s,body:JSON.stringify(o)},c=await Ay(()=>fetch(i,a));if(c.ok){const l=await c.json();return{fid:l.fid||n,registrationStatus:2,refreshToken:l.refreshToken,authToken:Iy(l.authToken)}}else throw await ky("Create Installation",c)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ny(t){return new Promise(e=>{setTimeout(e,t)})}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function oO(t){return btoa(String.fromCharCode(...t)).replace(/\+/g,"-").replace(/\//g,"_")}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const aO=/^[cdef][\w-]{21}$/,dl="";function cO(){try{const t=new Uint8Array(17);(self.crypto||self.msCrypto).getRandomValues(t),t[0]=112+t[0]%16;const n=lO(t);return aO.test(n)?n:dl}catch{return dl}}function lO(t){return oO(t).substr(0,22)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ya(t){return`${t.appName}!${t.appId}`}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Py=new Map;function Ly(t,e){const n=ya(t);Oy(n,e),uO(n,e)}function Oy(t,e){const n=Py.get(t);if(n)for(const i of n)i(e)}function uO(t,e){const n=dO();n&&n.postMessage({key:t,fid:e}),hO()}let xn=null;function dO(){return!xn&&"BroadcastChannel"in self&&(xn=new BroadcastChannel("[Firebase] FID Change"),xn.onmessage=t=>{Oy(t.data.key,t.data.fid)}),xn}function hO(){Py.size===0&&xn&&(xn.close(),xn=null)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const fO="firebase-installations-database",pO=1,Jn="firebase-installations-store";let sc=null;function nd(){return sc||(sc=jo(fO,pO,{upgrade:(t,e)=>{switch(e){case 0:t.createObjectStore(Jn)}}})),sc}async function Ro(t,e){const n=ya(t),s=(await nd()).transaction(Jn,"readwrite"),r=s.objectStore(Jn),o=await r.get(n);return await r.put(e,n),await s.done,(!o||o.fid!==e.fid)&&Ly(t,e.fid),e}async function Dy(t){const e=ya(t),i=(await nd()).transaction(Jn,"readwrite");await i.objectStore(Jn).delete(e),await i.done}async function wa(t,e){const n=ya(t),s=(await nd()).transaction(Jn,"readwrite"),r=s.objectStore(Jn),o=await r.get(n),a=e(o);return a===void 0?await r.delete(n):await r.put(a,n),await s.done,a&&(!o||o.fid!==a.fid)&&Ly(t,a.fid),a}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function id(t){let e;const n=await wa(t.appConfig,i=>{const s=gO(i),r=mO(t,s);return e=r.registrationPromise,r.installationEntry});return n.fid===dl?{installationEntry:await e}:{installationEntry:n,registrationPromise:e}}function gO(t){const e=t||{fid:cO(),registrationStatus:0};return My(e)}function mO(t,e){if(e.registrationStatus===0){if(!navigator.onLine){const s=Promise.reject(Yn.create("app-offline"));return{installationEntry:e,registrationPromise:s}}const n={fid:e.fid,registrationStatus:1,registrationTime:Date.now()},i=_O(t,n);return{installationEntry:n,registrationPromise:i}}else return e.registrationStatus===1?{installationEntry:e,registrationPromise:yO(t)}:{installationEntry:e}}async function _O(t,e){try{const n=await rO(t,e);return Ro(t.appConfig,n)}catch(n){throw Ty(n)&&n.customData.serverCode===409?await Dy(t.appConfig):await Ro(t.appConfig,{fid:e.fid,registrationStatus:0}),n}}async function yO(t){let e=await Hf(t.appConfig);for(;e.registrationStatus===1;)await Ny(100),e=await Hf(t.appConfig);if(e.registrationStatus===0){const{installationEntry:n,registrationPromise:i}=await id(t);return i||n}return e}function Hf(t){return wa(t,e=>{if(!e)throw Yn.create("installation-not-found");return My(e)})}function My(t){return wO(t)?{fid:t.fid,registrationStatus:0}:t}function wO(t){return t.registrationStatus===1&&t.registrationTime+by<Date.now()}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function vO({appConfig:t,heartbeatServiceProvider:e},n){const i=bO(t,n),s=nO(t,n),r=e.getImmediate({optional:!0});if(r){const l=await r.getHeartbeatsHeader();l&&s.append("x-firebase-client",l)}const o={installation:{sdkVersion:Ey,appId:t.appId}},a={method:"POST",headers:s,body:JSON.stringify(o)},c=await Ay(()=>fetch(i,a));if(c.ok){const l=await c.json();return Iy(l)}else throw await ky("Generate Auth Token",c)}function bO(t,{fid:e}){return`${Sy(t)}/${e}/authTokens:generate`}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function sd(t,e=!1){let n;const i=await wa(t.appConfig,r=>{if(!xy(r))throw Yn.create("not-registered");const o=r.authToken;if(!e&&TO(o))return r;if(o.requestStatus===1)return n=EO(t,e),r;{if(!navigator.onLine)throw Yn.create("app-offline");const a=IO(r);return n=CO(t,a),a}});return n?await n:i.authToken}async function EO(t,e){let n=await Vf(t.appConfig);for(;n.authToken.requestStatus===1;)await Ny(100),n=await Vf(t.appConfig);const i=n.authToken;return i.requestStatus===0?sd(t,e):i}function Vf(t){return wa(t,e=>{if(!xy(e))throw Yn.create("not-registered");const n=e.authToken;return kO(n)?{...e,authToken:{requestStatus:0}}:e})}async function CO(t,e){try{const n=await vO(t,e),i={...e,authToken:n};return await Ro(t.appConfig,i),n}catch(n){if(Ty(n)&&(n.customData.serverCode===401||n.customData.serverCode===404))await Dy(t.appConfig);else{const i={...e,authToken:{requestStatus:0}};await Ro(t.appConfig,i)}throw n}}function xy(t){return t!==void 0&&t.registrationStatus===2}function TO(t){return t.requestStatus===2&&!SO(t)}function SO(t){const e=Date.now();return e<t.creationTime||t.creationTime+t.expiresIn<e+QL}function IO(t){const e={requestStatus:1,requestTime:Date.now()};return{...t,authToken:e}}function kO(t){return t.requestStatus===1&&t.requestTime+by<Date.now()}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function RO(t){const e=t,{installationEntry:n,registrationPromise:i}=await id(e);return i?i.catch(console.error):sd(e).catch(console.error),n.fid}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function AO(t,e=!1){const n=t;return await NO(n),(await sd(n,e)).token}async function NO(t){const{registrationPromise:e}=await id(t);e&&await e}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function PO(t){if(!t||!t.options)throw rc("App Configuration");if(!t.name)throw rc("App Name");const e=["projectId","apiKey","appId"];for(const n of e)if(!t.options[n])throw rc(n);return{appName:t.name,projectId:t.options.projectId,apiKey:t.options.apiKey,appId:t.options.appId}}function rc(t){return Yn.create("missing-app-config-values",{valueName:t})}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Fy="installations",LO="installations-internal",OO=t=>{const e=t.getProvider("app").getImmediate(),n=PO(e),i=vn(e,"heartbeat");return{app:e,appConfig:n,heartbeatServiceProvider:i,_delete:()=>Promise.resolve()}},DO=t=>{const e=t.getProvider("app").getImmediate(),n=vn(e,Fy).getImmediate();return{getId:()=>RO(n),getToken:s=>AO(n,s)}};function MO(){Xe(new qe(Fy,OO,"PUBLIC")),Xe(new qe(LO,DO,"PRIVATE"))}MO();je(vy,td);je(vy,td,"esm2020");/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const xO="/firebase-messaging-sw.js",FO="/firebase-cloud-messaging-push-scope",Uy="BDOU99-h67HcA6JeFXHbSNMu7e2yNNu3RzoMj8TM4W88jITfq7ZmPvIM1Iv-4_l2LxQcYwhqby2xGpWwzjfAnG4",UO="https://fcmregistrations.googleapis.com/v1",$y="google.c.a.c_id",$O="google.c.a.c_l",BO="google.c.a.ts",HO="google.c.a.e",Wf=1e4;var jf;(function(t){t[t.DATA_MESSAGE=1]="DATA_MESSAGE",t[t.DISPLAY_NOTIFICATION=3]="DISPLAY_NOTIFICATION"})(jf||(jf={}));/**
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
 */var Xs;(function(t){t.PUSH_RECEIVED="push-received",t.NOTIFICATION_CLICKED="notification-clicked"})(Xs||(Xs={}));/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function St(t){const e=new Uint8Array(t);return btoa(String.fromCharCode(...e)).replace(/=/g,"").replace(/\+/g,"-").replace(/\//g,"_")}function VO(t){const e="=".repeat((4-t.length%4)%4),n=(t+e).replace(/\-/g,"+").replace(/_/g,"/"),i=atob(n),s=new Uint8Array(i.length);for(let r=0;r<i.length;++r)s[r]=i.charCodeAt(r);return s}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const oc="fcm_token_details_db",WO=5,qf="fcm_token_object_Store";async function jO(t){if("databases"in indexedDB&&!(await indexedDB.databases()).map(r=>r.name).includes(oc))return null;let e=null;return(await jo(oc,WO,{upgrade:async(i,s,r,o)=>{if(s<2||!i.objectStoreNames.contains(qf))return;const a=o.objectStore(qf),c=await a.index("fcmSenderId").get(t);if(await a.clear(),!!c){if(s===2){const l=c;if(!l.auth||!l.p256dh||!l.endpoint)return;e={token:l.fcmToken,createTime:l.createTime??Date.now(),subscriptionOptions:{auth:l.auth,p256dh:l.p256dh,endpoint:l.endpoint,swScope:l.swScope,vapidKey:typeof l.vapidKey=="string"?l.vapidKey:St(l.vapidKey)}}}else if(s===3){const l=c;e={token:l.fcmToken,createTime:l.createTime,subscriptionOptions:{auth:St(l.auth),p256dh:St(l.p256dh),endpoint:l.endpoint,swScope:l.swScope,vapidKey:St(l.vapidKey)}}}else if(s===4){const l=c;e={token:l.fcmToken,createTime:l.createTime,subscriptionOptions:{auth:St(l.auth),p256dh:St(l.p256dh),endpoint:l.endpoint,swScope:l.swScope,vapidKey:St(l.vapidKey)}}}}}})).close(),await Fa(oc),await Fa("fcm_vapid_details_db"),await Fa("undefined"),qO(e)?e:null}function qO(t){if(!t||!t.subscriptionOptions)return!1;const{subscriptionOptions:e}=t;return typeof t.createTime=="number"&&t.createTime>0&&typeof t.token=="string"&&t.token.length>0&&typeof e.auth=="string"&&e.auth.length>0&&typeof e.p256dh=="string"&&e.p256dh.length>0&&typeof e.endpoint=="string"&&e.endpoint.length>0&&typeof e.swScope=="string"&&e.swScope.length>0&&typeof e.vapidKey=="string"&&e.vapidKey.length>0}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const zO="firebase-messaging-database",GO=1,Xn="firebase-messaging-store";let ac=null;function rd(){return ac||(ac=jo(zO,GO,{upgrade:(t,e)=>{switch(e){case 0:t.createObjectStore(Xn)}}})),ac}async function By(t){const e=ad(t),i=await(await rd()).transaction(Xn).objectStore(Xn).get(e);if(i)return i;{const s=await jO(t.appConfig.senderId);if(s)return await od(t,s),s}}async function od(t,e){const n=ad(t),s=(await rd()).transaction(Xn,"readwrite");return await s.objectStore(Xn).put(e,n),await s.done,e}async function KO(t){const e=ad(t),i=(await rd()).transaction(Xn,"readwrite");await i.objectStore(Xn).delete(e),await i.done}function ad({appConfig:t}){return t.appId}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const YO={"missing-app-config-values":'Missing App configuration value: "{$valueName}"',"only-available-in-window":"This method is available in a Window context.","only-available-in-sw":"This method is available in a service worker context.","permission-default":"The notification permission was not granted and dismissed instead.","permission-blocked":"The notification permission was not granted and blocked instead.","unsupported-browser":"This browser doesn't support the API's required to use the Firebase SDK.","indexed-db-unsupported":"This browser doesn't support indexedDb.open() (ex. Safari iFrame, Firefox Private Browsing, etc)","failed-service-worker-registration":"We are unable to register the default service worker. {$browserErrorMessage}","token-subscribe-failed":"A problem occurred while subscribing the user to FCM: {$errorInfo}","token-subscribe-no-token":"FCM returned no token when subscribing the user to push.","token-unsubscribe-failed":"A problem occurred while unsubscribing the user from FCM: {$errorInfo}","token-update-failed":"A problem occurred while updating the user from FCM: {$errorInfo}","token-update-no-token":"FCM returned no token when updating the user to push.","use-sw-after-get-token":"The useServiceWorker() method may only be called once and must be called before calling getToken() to ensure your service worker is used.","invalid-sw-registration":"The input to useServiceWorker() must be a ServiceWorkerRegistration.","invalid-bg-handler":"The input to setBackgroundMessageHandler() must be a function.","invalid-vapid-key":"The public VAPID key must be a string.","use-vapid-key-after-get-token":"The usePublicVapidKey() method may only be called once and must be called before calling getToken() to ensure your VAPID key is used."},ve=new wn("messaging","Messaging",YO);/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function JO(t,e){const n=await ld(t),i=Vy(e),s={method:"POST",headers:n,body:JSON.stringify(i)};let r;try{r=await(await fetch(cd(t.appConfig),s)).json()}catch(o){throw ve.create("token-subscribe-failed",{errorInfo:o?.toString()})}if(r.error){const o=r.error.message;throw ve.create("token-subscribe-failed",{errorInfo:o})}if(!r.token)throw ve.create("token-subscribe-no-token");return r.token}async function XO(t,e){const n=await ld(t),i=Vy(e.subscriptionOptions),s={method:"PATCH",headers:n,body:JSON.stringify(i)};let r;try{r=await(await fetch(`${cd(t.appConfig)}/${e.token}`,s)).json()}catch(o){throw ve.create("token-update-failed",{errorInfo:o?.toString()})}if(r.error){const o=r.error.message;throw ve.create("token-update-failed",{errorInfo:o})}if(!r.token)throw ve.create("token-update-no-token");return r.token}async function Hy(t,e){const i={method:"DELETE",headers:await ld(t)};try{const r=await(await fetch(`${cd(t.appConfig)}/${e}`,i)).json();if(r.error){const o=r.error.message;throw ve.create("token-unsubscribe-failed",{errorInfo:o})}}catch(s){throw ve.create("token-unsubscribe-failed",{errorInfo:s?.toString()})}}function cd({projectId:t}){return`${UO}/projects/${t}/registrations`}async function ld({appConfig:t,installations:e}){const n=await e.getToken();return new Headers({"Content-Type":"application/json",Accept:"application/json","x-goog-api-key":t.apiKey,"x-goog-firebase-installations-auth":`FIS ${n}`})}function Vy({p256dh:t,auth:e,endpoint:n,vapidKey:i}){const s={web:{endpoint:n,auth:e,p256dh:t}};return i!==Uy&&(s.web.applicationPubKey=i),s}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const QO=10080*60*1e3;async function ZO(t){const e=await nD(t.swRegistration,t.vapidKey),n={vapidKey:t.vapidKey,swScope:t.swRegistration.scope,endpoint:e.endpoint,auth:St(e.getKey("auth")),p256dh:St(e.getKey("p256dh"))},i=await By(t.firebaseDependencies);if(i){if(iD(i.subscriptionOptions,n))return Date.now()>=i.createTime+QO?tD(t,{token:i.token,createTime:Date.now(),subscriptionOptions:n}):i.token;try{await Hy(t.firebaseDependencies,i.token)}catch(s){console.warn(s)}return zf(t.firebaseDependencies,n)}else return zf(t.firebaseDependencies,n)}async function eD(t){const e=await By(t.firebaseDependencies);e&&(await Hy(t.firebaseDependencies,e.token),await KO(t.firebaseDependencies));const n=await t.swRegistration.pushManager.getSubscription();return n?n.unsubscribe():!0}async function tD(t,e){try{const n=await XO(t.firebaseDependencies,e),i={...e,token:n,createTime:Date.now()};return await od(t.firebaseDependencies,i),n}catch(n){throw n}}async function zf(t,e){const i={token:await JO(t,e),createTime:Date.now(),subscriptionOptions:e};return await od(t,i),i.token}async function nD(t,e){const n=await t.pushManager.getSubscription();return n||t.pushManager.subscribe({userVisibleOnly:!0,applicationServerKey:VO(e)})}function iD(t,e){const n=e.vapidKey===t.vapidKey,i=e.endpoint===t.endpoint,s=e.auth===t.auth,r=e.p256dh===t.p256dh;return n&&i&&s&&r}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Gf(t){const e={from:t.from,collapseKey:t.collapse_key,messageId:t.fcmMessageId};return sD(e,t),rD(e,t),oD(e,t),e}function sD(t,e){if(!e.notification)return;t.notification={};const n=e.notification.title;n&&(t.notification.title=n);const i=e.notification.body;i&&(t.notification.body=i);const s=e.notification.image;s&&(t.notification.image=s);const r=e.notification.icon;r&&(t.notification.icon=r)}function rD(t,e){e.data&&(t.data=e.data)}function oD(t,e){if(!e.fcmOptions&&!e.notification?.click_action)return;t.fcmOptions={};const n=e.fcmOptions?.link??e.notification?.click_action;n&&(t.fcmOptions.link=n);const i=e.fcmOptions?.analytics_label;i&&(t.fcmOptions.analyticsLabel=i)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function aD(t){return typeof t=="object"&&!!t&&$y in t}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function cD(t){if(!t||!t.options)throw cc("App Configuration Object");if(!t.name)throw cc("App Name");const e=["projectId","apiKey","appId","messagingSenderId"],{options:n}=t;for(const i of e)if(!n[i])throw cc(i);return{appName:t.name,projectId:n.projectId,apiKey:n.apiKey,appId:n.appId,senderId:n.messagingSenderId}}function cc(t){return ve.create("missing-app-config-values",{valueName:t})}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class lD{constructor(e,n,i){this.deliveryMetricsExportedToBigQueryEnabled=!1,this.onBackgroundMessageHandler=null,this.onMessageHandler=null,this.logEvents=[],this.isLogServiceStarted=!1;const s=cD(e);this.firebaseDependencies={app:e,appConfig:s,installations:n,analyticsProvider:i}}_delete(){return Promise.resolve()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Wy(t){try{t.swRegistration=await navigator.serviceWorker.register(xO,{scope:FO}),t.swRegistration.update().catch(()=>{}),await uD(t.swRegistration)}catch(e){throw ve.create("failed-service-worker-registration",{browserErrorMessage:e?.message})}}async function uD(t){return new Promise((e,n)=>{const i=setTimeout(()=>n(new Error(`Service worker not registered after ${Wf} ms`)),Wf),s=t.installing||t.waiting;t.active?(clearTimeout(i),e()):s?s.onstatechange=r=>{r.target?.state==="activated"&&(s.onstatechange=null,clearTimeout(i),e())}:(clearTimeout(i),n(new Error("No incoming service worker found.")))})}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function dD(t,e){if(!e&&!t.swRegistration&&await Wy(t),!(!e&&t.swRegistration)){if(!(e instanceof ServiceWorkerRegistration))throw ve.create("invalid-sw-registration");t.swRegistration=e}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function hD(t,e){e?t.vapidKey=e:t.vapidKey||(t.vapidKey=Uy)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function jy(t,e){if(!navigator)throw ve.create("only-available-in-window");if(Notification.permission==="default"&&await Notification.requestPermission(),Notification.permission!=="granted")throw ve.create("permission-blocked");return await hD(t,e?.vapidKey),await dD(t,e?.serviceWorkerRegistration),ZO(t)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function fD(t,e,n){const i=pD(e);(await t.firebaseDependencies.analyticsProvider.get()).logEvent(i,{message_id:n[$y],message_name:n[$O],message_time:n[BO],message_device_time:Math.floor(Date.now()/1e3)})}function pD(t){switch(t){case Xs.NOTIFICATION_CLICKED:return"notification_open";case Xs.PUSH_RECEIVED:return"notification_foreground";default:throw new Error}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function gD(t,e){const n=e.data;if(!n.isFirebaseMessaging)return;t.onMessageHandler&&n.messageType===Xs.PUSH_RECEIVED&&(typeof t.onMessageHandler=="function"?t.onMessageHandler(Gf(n)):t.onMessageHandler.next(Gf(n)));const i=n.data;aD(i)&&i[HO]==="1"&&await fD(t,n.messageType,i)}const Kf="@firebase/messaging",Yf="0.12.23";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const mD=t=>{const e=new lD(t.getProvider("app").getImmediate(),t.getProvider("installations-internal").getImmediate(),t.getProvider("analytics-internal"));return navigator.serviceWorker.addEventListener("message",n=>gD(e,n)),e},_D=t=>{const e=t.getProvider("messaging").getImmediate();return{getToken:i=>jy(e,i)}};function yD(){Xe(new qe("messaging",mD,"PUBLIC")),Xe(new qe("messaging-internal",_D,"PRIVATE")),je(Kf,Yf),je(Kf,Yf,"esm2020")}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function wD(){try{await dg()}catch{return!1}return typeof window<"u"&&Ho()&&yT()&&"serviceWorker"in navigator&&"PushManager"in window&&"Notification"in window&&"fetch"in window&&ServiceWorkerRegistration.prototype.hasOwnProperty("showNotification")&&PushSubscription.prototype.hasOwnProperty("getKey")}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function vD(t){if(!navigator)throw ve.create("only-available-in-window");return t.swRegistration||await Wy(t),eD(t)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function bD(t,e){if(!navigator)throw ve.create("only-available-in-window");return t.onMessageHandler=e,()=>{t.onMessageHandler=null}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ED(t=qo()){return wD().then(e=>{if(!e)throw ve.create("unsupported-browser")},e=>{throw ve.create("indexed-db-unsupported")}),vn(re(t),"messaging").getImmediate()}async function CD(t,e){return t=re(t),jy(t,e)}function Jf(t){return t=re(t),vD(t)}function TD(t,e){return t=re(t),bD(t,e)}yD();class SD{constructor(){this.messaging=null,this.currentToken=null,this.vapidKey=WA,this.isInitialized=!1,this.messageCallbacks=new Set,this.tokenRefreshCallbacks=new Set}async initialize(){if(this.isInitialized)return!0;try{return!("serviceWorker"in navigator)||!("Notification"in window)?(console.warn("[FCMTransport] FCM not supported in this environment"),!1):this.vapidKey?(this.messaging=ED(oa),TD(this.messaging,e=>{console.log("[FCMTransport] Foreground message received:",e),this.messageCallbacks.forEach(n=>{try{n(e)}catch(i){console.error("[FCMTransport] Error in message callback:",i)}})}),this.isInitialized=!0,console.log("[FCMTransport] Initialized successfully"),!0):(console.warn("[FCMTransport] VAPID key not configured"),!1)}catch(e){return console.error("[FCMTransport] Initialization failed:",e),!1}}async getToken(){if(!this.isInitialized&&!await this.initialize())return null;try{const e=await CD(this.messaging,{vapidKey:this.vapidKey});return e?(this.currentToken=e,console.log("[FCMTransport] Token obtained"),await this.storeUserToken(e),e):(console.warn("[FCMTransport] No registration token available"),null)}catch(e){return console.error("[FCMTransport] Failed to get token:",e),null}}async refreshToken(){if(console.log("[FCMTransport] Refreshing token..."),this.currentToken)try{await Jf(this.messaging),await this.removeUserToken(this.currentToken)}catch(n){console.warn("[FCMTransport] Failed to delete old token:",n)}this.currentToken=null;const e=await this.getToken();return e&&this.tokenRefreshCallbacks.forEach(n=>{try{n(e)}catch(i){console.error("[FCMTransport] Error in token refresh callback:",i)}}),e}async deleteToken(){if(!this.messaging||!this.currentToken)return!0;try{return await Jf(this.messaging),await this.removeUserToken(this.currentToken),this.currentToken=null,console.log("[FCMTransport] Token deleted successfully"),!0}catch(e){return console.error("[FCMTransport] Failed to delete token:",e),!1}}async storeUserToken(e){const n=M();if(!n){console.warn("[FCMTransport] Cannot store token: user not logged in");return}try{const i=b(E,`users/${n}/fcmTokens/${this.getTokenId(e)}`),s={token:e,deviceInfo:{platform:this.getPlatform(),timestamp:Date.now()},createdAt:Date.now(),lastUsed:Date.now()};await ne(i,s),console.log("[FCMTransport] Token stored in RTDB")}catch(i){console.error("[FCMTransport] Failed to store token in RTDB:",i)}}async removeUserToken(e){const n=M();if(n)try{const i=b(E,`users/${n}/fcmTokens/${this.getTokenId(e)}`);await Ze(i),console.log("[FCMTransport] Token removed from RTDB")}catch(i){console.error("[FCMTransport] Failed to remove token from RTDB:",i)}}async getUserTokens(e){try{const n=b(E,`users/${e}/fcmTokens`),i=await De(n);if(i.exists()){const s=i.val();return Object.values(s)}return[]}catch(n){return console.error("[FCMTransport] Failed to get user tokens:",n),[]}}async sendCallNotification(e,n){const{roomId:i,callerId:s,callerName:r}=n,o={type:"call",roomId:i,callerId:s,callerName:r,timestamp:Date.now().toString()},a="/HangVidU/",c={notification:{title:`Incoming call from ${r}`,body:"Tap to answer or decline",icon:`${a}icons/play-arrows-v1/icon-192.png`,badge:`${a}icons/play-arrows-v1/icon-192.png`},data:o};return this.sendNotification(e,c)}async sendMissedCallNotification(e,n){const{roomId:i,callerId:s,callerName:r}=n,o={type:"missed_call",roomId:i,callerId:s,callerName:r,timestamp:Date.now().toString()},a="/HangVidU/",c={notification:{title:`Missed call from ${r}`,body:"Tap to call back",icon:`${a}icons/play-arrows-v1/icon-192.png`,badge:`${a}icons/play-arrows-v1/icon-192.png`},data:o};return this.sendNotification(e,c)}async sendMessageNotification(e,n){const{senderId:i,senderName:s,messageText:r}=n,o=typeof r=="string"?r:String(r||""),a=o.length>50?o.substring(0,47)+"...":o,c={type:"message",senderId:i,senderName:s,messagePreview:a,timestamp:Date.now().toString()},l="/HangVidU/",u={notification:{title:`New message from ${s}`,body:a,icon:`${l}icons/play-arrows-v1/icon-192.png`,badge:`${l}icons/play-arrows-v1/icon-192.png`},data:c};return this.sendNotification(e,u)}async sendNotification(e,n){try{{let o=null;try{const{getLoggedInUserToken:l}=await Le(async()=>{const{getLoggedInUserToken:u}=await Promise.resolve().then(()=>Du);return{getLoggedInUserToken:u}},void 0);o=await l()}catch(l){console.warn("[FCMTransport] Failed to get auth token:",l)}const a={"Content-Type":"application/json"};o&&(a.Authorization=`Bearer ${o}`);const c=await fetch("https://europe-west1-vidu-aae11.cloudfunctions.net/sendCallNotification",{method:"POST",headers:a,body:JSON.stringify({targetUserId:e,callData:n.data})});if(c.ok){const l=await c.json();return console.log(`[FCMTransport] FCM notification sent to ${e}:`,l),!0}else return console.error("[FCMTransport] FCM function failed:",c.status),!1}const i=b(E,`notifications/${e}`),s=ho(i).key,r={id:s,payload:n,createdAt:Date.now(),delivered:!1};return await ne(b(E,`notifications/${e}/${s}`),r),console.log(`[FCMTransport] Notification queued for user ${e} (dev mode)`),!0}catch(i){return console.error("[FCMTransport] Failed to send notification:",i),!1}}onMessage(e){return this.messageCallbacks.add(e),()=>this.messageCallbacks.delete(e)}onTokenRefresh(e){return this.tokenRefreshCallbacks.add(e),()=>this.tokenRefreshCallbacks.delete(e)}getTokenId(e){return btoa(e).replace(/[^a-zA-Z0-9]/g,"").substring(0,20)}getPlatform(){const e=navigator.userAgent;return/iPhone|iPad|iPod/.test(e)?"ios":/Android/.test(e)?"android":/Macintosh/.test(e)?"macos":/Windows/.test(e)?"windows":"unknown"}static isSupported(){return"serviceWorker"in navigator&&"Notification"in window}}class ID{constructor(e=null,n={}){this.transport=e||new SD,this.isEnabled=!1,this.permissionState="default",this.options={enableCallNotifications:!0,enableMessageNotifications:!0,privacyMode:!1,autoHideSuccessMs:6e3,...n},this.activeNotifications=new Map,this.permissionCallbacks=new Set,this.notificationCallbacks=new Set}async initialize(){try{return await this.transport.initialize()?(this.permissionState=this.getPermissionState(),this.transport.onMessage(n=>{this.handleForegroundMessage(n)}),console.log("[NotificationController] Initialized successfully"),!0):(console.warn("[NotificationController] Transport initialization failed"),!1)}catch(e){return console.error("[NotificationController] Initialization failed:",e),!1}}async requestPermission(e={}){const{title:n="Enable notifications",explain:i="Get notified of incoming calls and messages even when the app is closed.",onGranted:s=null,onDenied:r=null,onDismissed:o=null}=e;if(!this.isNotificationSupported())return console.warn("[NotificationController] Notifications not supported"),{state:"denied",reason:"unsupported"};this.detectBrowser();const a=Notification.permission;if(this.permissionState=a,a==="granted")return await this.enable(),s?.(),{state:"granted"};if(a==="denied")return r?.("already-denied"),{state:"denied",reason:"already-denied"};let c;try{c=await Notification.requestPermission()}catch(l){console.error("[NotificationController] Permission request failed:",l),c=Notification.permission}return this.permissionState=c,c==="granted"?(await this.enable(),s?.(),{state:"granted"}):a==="default"&&c==="denied"?(r?.("silent-block"),{state:"denied",reason:"silent-block"}):c==="default"?(o?.(),{state:"dismissed"}):(r?.(),{state:"denied"})}async enable(){if(this.permissionState!=="granted")return console.warn("[NotificationController] Cannot enable: permission not granted"),!1;try{return await this.transport.getToken()?(this.isEnabled=!0,console.log("[NotificationController] Notifications enabled"),this.permissionCallbacks.forEach(n=>{try{n("enabled")}catch(i){console.error("[NotificationController] Error in permission callback:",i)}}),!0):(console.warn("[NotificationController] Failed to get FCM token"),!1)}catch(e){return console.error("[NotificationController] Failed to enable notifications:",e),!1}}async disable(){try{return await this.transport.deleteToken(),this.isEnabled=!1,this.activeNotifications.clear(),console.log("[NotificationController] Notifications disabled"),this.permissionCallbacks.forEach(e=>{try{e("disabled")}catch(n){console.error("[NotificationController] Error in permission callback:",n)}}),!0}catch(e){return console.error("[NotificationController] Failed to disable notifications:",e),!1}}async sendCallNotification(e,n){if(!this.options.enableCallNotifications)return console.log("[NotificationController] Call notifications disabled"),!1;if(!this.shouldSendNotification())return console.log("[NotificationController] Not sending call notification (app in foreground)"),!1;try{const i=await this.transport.sendCallNotification(e,n);if(i){const s=`call_${n.roomId}_${Date.now()}`;this.activeNotifications.set(s,{type:"call",roomId:n.roomId,targetUserId:e,timestamp:Date.now()}),console.log(`[NotificationController] Call notification sent to ${e}`)}return i}catch(i){return console.error("[NotificationController] Failed to send call notification:",i),!1}}async sendMissedCallNotification(e,n){if(!this.options.enableCallNotifications)return console.log("[NotificationController] Call notifications disabled (missed call masked)"),!1;try{const i=await this.transport.sendMissedCallNotification(e,n);return i&&console.log(`[NotificationController] Missed call notification sent to ${e}`),i}catch(i){return console.error("[NotificationController] Failed to send missed call notification:",i),!1}}async sendMessageNotification(e,n){if(!this.options.enableMessageNotifications)return console.log("[NotificationController] Message notifications disabled"),!1;if(!this.shouldSendNotification())return console.log("[NotificationController] Not sending message notification (app in foreground)"),!1;try{const i=await this.transport.sendMessageNotification(e,n);if(i){const s=`message_${e}_${Date.now()}`;this.activeNotifications.set(s,{type:"message",senderId:n.senderId,targetUserId:e,timestamp:Date.now()}),console.log(`[NotificationController] Message notification sent to ${e}`)}return i}catch(i){return console.error("[NotificationController] Failed to send message notification:",i),!1}}async dismissCallNotifications(e){try{const n=[];for(const[i,s]of this.activeNotifications)s.type==="call"&&s.roomId===e&&n.push(i);n.forEach(i=>this.activeNotifications.delete(i)),n.length>0&&console.log(`[NotificationController] Dismissed ${n.length} call notifications for room ${e}`)}catch(n){console.error("[NotificationController] Failed to dismiss call notifications:",n)}}async dismissMessageNotifications(e){try{const n=[];for(const[i,s]of this.activeNotifications)s.type==="message"&&s.senderId===e&&n.push(i);n.forEach(i=>this.activeNotifications.delete(i)),n.length>0&&console.log(`[NotificationController] Dismissed ${n.length} message notifications from ${e}`)}catch(n){console.error("[NotificationController] Failed to dismiss message notifications:",n)}}async cleanupOldNotifications(){const e=Date.now(),n=1440*60*1e3,i=[];for(const[s,r]of this.activeNotifications)e-r.timestamp>n&&i.push(s);i.forEach(s=>this.activeNotifications.delete(s)),i.length>0&&console.log(`[NotificationController] Cleaned up ${i.length} old notifications`)}handleForegroundMessage(e){console.log("[NotificationController] Foreground message received:",e),this.notificationCallbacks.forEach(n=>{try{n(e)}catch(i){console.error("[NotificationController] Error in notification callback:",i)}})}shouldSendNotification(){return document.hidden||!document.hasFocus()}getPermissionState(){return this.isNotificationSupported()?Notification.permission:"unsupported"}isNotificationEnabled(){return this.isEnabled&&this.permissionState==="granted"}isNotificationSupported(){return"Notification"in window&&"serviceWorker"in navigator}updateOptions(e){this.options={...this.options,...e},console.log("[NotificationController] Options updated:",this.options)}onPermissionChange(e){return this.permissionCallbacks.add(e),()=>this.permissionCallbacks.delete(e)}onNotification(e){return this.notificationCallbacks.add(e),()=>this.notificationCallbacks.delete(e)}detectBrowser(){if(navigator.userAgentData&&navigator.userAgentData.brands){const n=navigator.userAgentData.brands.map(i=>i.brand);if(n.some(i=>i.includes("Microsoft Edge")))return"Edge";if(n.some(i=>i.includes("Google Chrome")))return"Chrome";if(n.some(i=>i.includes("Chromium")))return"Chromium"}const e=navigator.userAgent;return e.includes("Edg/")?"Edge":e.includes("Chrome/")?"Chrome":e.includes("Safari/")&&!e.includes("Chrome")?"Safari":e.includes("Firefox/")?"Firefox":"Your browser"}async formatCallNotification(e){const{roomId:n,callerId:i,callerName:s}=e;let r=s||i||"Unknown caller";if(!s)try{const{resolveCallerName:o}=await Le(async()=>{const{resolveCallerName:a}=await Promise.resolve().then(()=>hl);return{resolveCallerName:a}},void 0);r=await o(n,i)}catch(o){console.warn("[NotificationController] Failed to resolve caller name:",o)}return this.options.privacyMode&&(r="Someone"),{...e,callerName:r}}async formatMessageNotification(e){const{senderId:n,senderName:i,messageText:s}=e;let r=i,o=s;try{const{getContacts:a}=await Le(async()=>{const{getContacts:l}=await Promise.resolve().then(()=>hl);return{getContacts:l}},void 0),c=await a();c&&c[n]&&(r=c[n].name||i)}catch(a){console.warn("[NotificationController] Failed to resolve sender name:",a),r=i||n||"Unknown sender"}return this.options.privacyMode?(r="Someone",o="New message"):o&&o.length>50&&(o=o.substring(0,47)+"..."),{...e,senderName:r,messageText:o}}}const We=new ID,lc=new Map,uc=new Map,li=new Map,Xf=14;async function Ao(t,e,n){const i=M();if(i){const s=b(E,`users/${i}/contacts/${t}`);await ne(s,{contactId:t,contactName:e,roomId:n,savedAt:Date.now()});return}try{const s=localStorage.getItem("contacts")||"{}",r=JSON.parse(s);r[t]={contactId:t,contactName:e,roomId:n,savedAt:Date.now()},localStorage.setItem("contacts",JSON.stringify(r))}catch(s){console.warn("Failed to save contact to localStorage",s)}}async function _n(){const t=M();if(t)try{const e=b(E,`users/${t}/contacts`),n=await De(e);return n.exists()?n.val():{}}catch(e){return console.warn("Failed to read contacts from RTDB",e),{}}try{const e=localStorage.getItem("contacts")||"{}";return JSON.parse(e)}catch(e){return console.warn("Failed to read contacts from localStorage",e),{}}}async function kD(t){if(!t)return null;try{const e=await _n();for(const n of Object.values(e||{}))if(n?.roomId===t)return n}catch(e){console.warn("Failed to get contact by roomId",e)}return null}async function qy(t,e){if(!t)return e||"Unknown";try{const n=await _n();for(const i of Object.values(n||{}))if(i?.roomId===t)return i.contactName||i.contactId||e}catch(n){console.warn("Failed to resolve caller name",n)}return e||"Unknown"}async function zy(t,e,n){if(!t||!e)return;const s=(await _n())?.[t];if(s){s.roomId!==e&&(await Ao(t,s.contactName,e),await Wt(n)),Bi(e);return}if(!await _a("Save contact?",{autoRemoveSeconds:15}))return;const o=window.prompt("Enter a name for this contact:",t)||t;await Ao(t,o,e),Bi(e),await Wt(n)}async function Wt(t){if(!t)return;const e=await _n(),n=Object.keys(e);let i=t.querySelector(".contacts-container");if(i||(i=document.createElement("div"),i.className="contacts-container",t.appendChild(i)),n.length===0){i.innerHTML="<p>No saved contacts yet.</p>",w(i);return}D(i),i.innerHTML=`
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
                ${r.contactName&&r.contactName.length>Xf?r.contactName.slice(0,Xf-2)+"..":r.contactName}
              </span>
              <button
                class="contact-delete-btn"
                data-contact-id="${s}"
                title="Delete contact"
              >
                ✕
              </button>
              <button
                class="contact-edit-btn"
                data-contact-id="${s}"
                title="Edit contact name"
              >
                ✏️
              </button>
            </div>
          `}).join("")}
    </div>
  `,RD(i,t),AD(n),await ND(i,n,e)}function RD(t,e){t.querySelectorAll(".contact-message-btn").forEach(n=>{n.onclick=i=>{i.stopPropagation();const s=n.getAttribute("data-contact-id"),r=n.getAttribute("data-contact-name");s&&va(s,r)}}),t.querySelectorAll(".contact-name").forEach(n=>{n.onclick=async()=>{let i=n.getAttribute("data-room-id");const s=n.getAttribute("data-contact-name"),r=n.getAttribute("data-contact-id");if(!i&&r){const o=M();if(o)try{i=wo(o,r),console.log("[CONTACTS] Generated deterministic room ID:",i),await Ao(r,s,i),n.setAttribute("data-room-id",i)}catch(a){console.error("[CONTACTS] Failed to generate or save room ID:",a);return}}if(i&&(Bi(i),await pr(i,{forceInitiator:!0}).catch(a=>(console.warn("Failed to call contact:",a),!1))&&(await V_(i,s),We.isNotificationEnabled())))try{const a=gn(),c=a?.displayName||a?.email||M();await We.sendCallNotification(r,{roomId:i,callerId:M(),callerName:c}),console.log("[CONTACTS] Call notification sent to:",s)}catch(a){console.warn("[CONTACTS] Failed to send call notification:",a)}}}),t.querySelectorAll(".contact-delete-btn").forEach(n=>{n.onclick=async()=>{const i=n.getAttribute("data-contact-id");!i||!window.confirm("Delete this contact?")||(await PD(i),await Wt(e))}}),t.querySelectorAll(".contact-edit-btn").forEach(n=>{n.onclick=async()=>{const i=n.getAttribute("data-contact-id");if(!i)return;const r=(await _n())[i];if(!r)return;const o=prompt("Enter new name for this contact:",r.contactName);o&&o.trim()&&o.trim()!==r.contactName&&(await Ao(i,o.trim(),r.roomId),await Wt(e))}})}function va(t,e,n=!1){if(!M()){alert("Please sign in to send messages");return}if(on.getSession(t)){Ee.showMessagesToggle(),n&&!Ee.isMessagesUIOpen()&&Ee.toggleMessages();return}on.getAllSessions().forEach(a=>{a.close()}),Ee.clearMessages(),Ee.setSession(null);const r=on.openSession(t,{onMessage:(a,c,l)=>{if(c._reactionUpdate){const d={};if(c.reactions)for(const[h,f]of Object.entries(c.reactions))d[h]=Object.keys(f);Ee.updateMessageReactions(c.messageId,d);return}const u={};if(c.reactions)for(const[d,h]of Object.entries(c.reactions))u[d]=Object.keys(h);if(l)Ee.appendChatMessage(a,{isSentByMe:!0,messageId:c.messageId,reactions:u});else{const d=!c.read;Ee.receiveMessage(a,{isUnread:d,messageId:c.messageId,reactions:u})}}});r.contactName=e,r.toggle=li.get(t),Ee.setSession(r),Ee.showMessagesToggle(),n&&!Ee.isMessagesUIOpen()&&Ee.toggleMessages(),r.markAsRead().catch(a=>{console.warn("Failed to mark messages as read:",a)});const o=li.get(t);o&&o.clearBadge()}function AD(t){lc.forEach(({ref:e,callback:n})=>{Rt(e,"value",n)}),lc.clear(),M()&&t.forEach(e=>{const n=b(E,`users/${e}/presence`),i=document.querySelector(`.presence-indicator[data-contact-id="${e}"]`);if(!i)return;const s=r=>{const a=r.val()?.state==="online";i.style.backgroundColor=a?"#00d26a":"#444",i.title=a?"Online":"Offline"};Om(n,s),lc.set(e,{ref:n,callback:s})})}let fs=!1,ri=null;async function ND(t,e,n){if(!M())return;const i=10;let s=0;for(;fs&&s<i;)await new Promise(r=>setTimeout(r,100)),s++;if(fs){console.debug("[CONTACTS] Toggle replacement still in progress after waiting, skipping");return}fs=!0,ri&&clearTimeout(ri),ri=setTimeout(()=>{console.warn("[CONTACTS] Toggle replacement timeout - forcing flag reset"),fs=!1},5e3);try{li.forEach(o=>{o.cleanup()}),li.clear(),uc.forEach(o=>{o()}),uc.clear();const r=M();for(const o of e){const a=n[o],c=t.querySelector(`.contact-msg-toggle-container[data-contact-id="${o}"]`);if(!c){console.warn(`[CONTACTS] No toggle container found for contact ${o}`);continue}const l=_y({parent:c,onToggle:()=>va(o,a.contactName,!0),icon:"💬",initialUnreadCount:0});if(!l){console.error(`[CONTACTS] Failed to create toggle for contact ${o}`);continue}li.set(o,l);const u=on.listenToUnreadCount(o,d=>{l.setUnreadCount(d)});uc.set(o,u)}Promise.all(e.map(o=>on.getUnreadCount(o).then(a=>{const c=li.get(o);c&&c.setUnreadCount(a)}).catch(a=>console.warn(`[CONTACTS] Failed to get unread count for ${o}:`,a))))}finally{ri&&(clearTimeout(ri),ri=null),fs=!1}}async function PD(t){const e=M();if(e){try{await Ze(b(E,`users/${e}/contacts/${t}`))}catch(n){console.warn("Failed to delete contact from RTDB",n)}return}try{const n=localStorage.getItem("contacts")||"{}",i=JSON.parse(n);i[t]&&(delete i[t],localStorage.setItem("contacts",JSON.stringify(i)))}catch(n){console.warn("Failed to delete contact from localStorage",n)}}const hl=Object.freeze(Object.defineProperty({__proto__:null,getContactByRoomId:kD,getContacts:_n,openContactMessages:va,renderContactsList:Wt,resolveCallerName:qy,saveContact:zy},Symbol.toStringTag,{value:"Module"}));let dc=null,Xt=null,Q=null,Y=null,Qf=!1,Ir=!1,wt=[],fl="",Ce=-1,pl=[];const LD="AIzaSyBPUjW7ac277WIYTbN4M8dUomK39qRQjhA",OD="https://www.googleapis.com/youtube/v3";async function DD(){if(Qf||Ir)return!1;Ir=!0;const{initializeYouTubeElements:t}=await Le(async()=>{const{initializeYouTubeElements:o}=await Promise.resolve().then(()=>C0);return{initializeYouTubeElements:o}},void 0),e=await t();if(dc=e.searchContainer,Xt=e.searchBtn,Q=e.searchQuery,Y=e.searchResults,!dc||!Xt||!Q||!Y)return console.error("YouTube search elements not found in DOM"),Ir=!1,!1;const n=o=>/^https?:\/\//i.test(o),i=o=>{(Y?.querySelectorAll(".search-result-item")||[]).forEach((c,l)=>{l===o?(c.classList.add("focused"),c.scrollIntoView({block:"nearest"})):c.classList.remove("focused")}),Ce=o??-1};Xt.onclick=async()=>{const o=Q.value.trim();if(Eo(Q)){D(Q),Q.focus();return}if(!o){Br(),w(Q);return}if(tp()&&o===fl)gl(wt);else if(!n(o))await Zf(o);else{await Js({url:o,title:o,channel:"",thumbnail:"",id:o}),w(Y),Q.value="",w(Q),Ce=-1;return}},dc.addEventListener("keydown",async o=>{const a=Y.querySelectorAll(".search-result-item");if(a.length>0&&(o.key==="ArrowDown"||o.key==="ArrowUp")){if(o.key==="ArrowDown"){let c=Ce+1;c>=a.length&&(c=0),i(c)}else if(o.key==="ArrowUp"){let c=Ce-1;c<0&&(c=Ce===-1?0:a.length-1),i(c)}return}if(o.key==="Enter"){if(a.length>0&&Ce>=0){a[Ce].click(),w(Q),w(Y),Ce=-1;return}const c=Q.value.trim();if(c)if(tp()&&c===fl)gl(wt);else if(!n(c))await Zf(c);else{await Js({url:c,title:c,channel:"",thumbnail:"",id:c}),w(Y),Ce=-1,Q.value="",w(Q);return}}else o.key==="Escape"&&(xD()?Br():Q.value?Q.value="":w(Q))}),Q.addEventListener("input",()=>{Q.value.trim()===""&&Br(),Ce=-1});const s=ko(Q,()=>w(Q),{ignore:[Xt],esc:!1});pl.push(s);const r=ko(Y,()=>w(Y),{ignore:[Xt],esc:!1});return pl.push(r),Ir=!1,Qf=!0,!0}async function Zf(t){if(!Xt||!Y){console.error("Search elements not initialized");return}wt=[],fl=t,Xt.disabled=!0,Y.innerHTML='<div class="search-loading">Searching YouTube...</div>',D(Y);try{const e=await fetch(`${OD}/search?part=snippet&maxResults=10&q=${encodeURIComponent(t)}&type=video&key=${LD}`);if(!e.ok)throw e.status===403?new Error("YouTube API quota exceeded. Please try again later."):e.status===400?new Error("Invalid API key or request."):new Error(`YouTube API error: ${e.status}`);const n=await e.json();if(!n.items||n.items.length===0){ep("No videos found"),wt=[];return}wt=n.items.map(i=>({id:i.id.videoId,title:i.snippet.title,thumbnail:i.snippet.thumbnails.medium.url,channel:i.snippet.channelTitle,url:`https://www.youtube.com/watch?v=${i.id.videoId}`})),gl(wt)}catch(e){console.error("YouTube search failed:",e),ep(e.message||"Search failed. Please try again.")}finally{Xt.disabled=!1}}function gl(t){if(!Y){console.error("Search results element not initialized");return}if(!t||t.length===0){Y.innerHTML='<div class="search-no-results">No results found</div>',wt=[],Ce=-1;return}Y.innerHTML="",t.forEach(n=>{const i=document.createElement("div");i.className="search-result-item",i.innerHTML=`
      <img src="${n.thumbnail}" alt="${n.title}" class="result-thumbnail">
      <div class="search-result-info">
        <div class="search-result-title">${n.title}</div>
        <div class="search-result-channel">${n.channel}</div>
      </div>
    `,i.onclick=async()=>{if(await Js(n),w(Y),Ce=-1,!Q){console.error("Search query element not initialized");return}Q.value="",w(Q)},Y.appendChild(i)}),D(Y),Ce=0,Y.querySelectorAll(".search-result-item").forEach((n,i)=>{i===Ce?(n.classList.add("focused"),n.scrollIntoView({block:"nearest"})):n.classList.remove("focused")})}function ep(t){if(wt=[],Ce=-1,!Y){console.error("Search results element not initialized");return}Y.innerHTML=`<div class="search-error">${t}</div>`,D(Y)}function Br(){wt=[],Ce=-1,Y&&(Y.innerHTML="",w(Y))}function MD(){Br(),pl.forEach(t=>t())}function xD(){return!Eo(Y)}function tp(){return wt.length>0}function FD({parent:t,manager:e=null,onClick:n=null,hideWhenAllRead:i=!1}={}){let s=e;const r=Zu({initialProps:{unreadCount:0,isHidden:!0},template:`
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
    `,handlers:{handleClick:()=>{n?n():s&&s.toggleList()}},className:"notifications-toggle-container",parent:t});let o=r.querySelector(".notification-badge");return o&&(o.style.display="none"),r.onPropUpdated("unreadCount",a=>{const c=r.querySelector(".notification-badge");c&&(c.style.display=a>0?"flex":"none")}),r.show=()=>{r.isHidden=!1,r.style.display="block"},r.hide=()=>{r.isHidden=!0,r.style.display="none"},r.setUnread=a=>{r.unreadCount=a,a>0?r.show():i&&r.hide()},r.setManager=a=>{s=a},r.hide(),r}class UD{constructor(){this.notifications=new Map,this.toggle=null,this.container=null,this.clickOutsideCleanup=null}setToggle(e){this.toggle=e,this.toggle.setManager&&this.toggle.setManager(this),this.createContainer(),this.updateToggle()}createContainer(){this.container||(this.container=document.createElement("div"),this.container.className="notifications-list-container",this.container.style.display="none",document.body.appendChild(this.container))}showList(){this.container&&(this.container.style.display="flex",this.setupClickOutside())}hideList(){this.container&&(this.container.style.display="none",this.cleanupClickOutside())}setupClickOutside(){this.clickOutsideCleanup||(this.clickOutsideCleanup=ko(this.container,()=>this.hideList(),{ignore:this.toggle?[this.toggle]:[],esc:!0}))}cleanupClickOutside(){this.clickOutsideCleanup&&(this.clickOutsideCleanup(),this.clickOutsideCleanup=null)}toggleList(){this.container&&(this.container.style.display==="none"?this.showList():this.hideList())}isListVisible(){return this.container&&this.container.style.display!=="none"}add(e,n){this.notifications.has(e)&&this.remove(e),this.container||this.createContainer(),n.parentElement===document.body&&n.remove(),this.container.prepend(n),this.notifications.set(e,n),this.updateToggle(),n._originalDispose||(n._originalDispose=n.dispose);const i=n._originalDispose;n.dispose=()=>{i&&i.call(n),n.parentElement&&n.remove(),this.notifications.delete(e),this.updateToggle(),n.dispose=i,delete n._originalDispose}}remove(e){const n=this.notifications.get(e);n&&(n.dispose&&n.dispose(),this.notifications.delete(e),this.updateToggle())}getCount(){return this.notifications.size}has(e){return this.notifications.has(e)}clear(){this.notifications.forEach(e=>{e.dispose&&e.dispose()}),this.notifications.clear(),this.updateToggle()}updateToggle(){this.toggle&&this.toggle.setUnread(this.getCount())}}const $D=new UD;let ps=null;const BD=(t,e=null)=>{if(ps)return ps;if(!t)return console.error("Auth UI: Parent element is required"),null;let n=null,i=null,s=10;typeof e=="number"&&(s=e);const r=Lu();return ps=Zu({initialProps:{isLoggedIn:r,userName:"Guest User",signingInDisplay:"none",loginBtnMarginRightPx:s},template:`
      <button style="margin-right: \${loginBtnMarginRightPx}px" id="goog-login-btn" class="login-btn" onclick="handleLogin">Login</button>
      <button id="goog-logout-btn" class="logout-btn" onclick="handleLogout">Logout</button>
      <span class="signing-in-indicator" style="display: \${signingInDisplay}; color: var(--text-secondary, #888); font-size: 0.9rem;">Signing in...</span>
      <div class="user-info">\${isLoggedIn ? 'Logged in: ' + userName : 'Logged out'}</div>
    `,handlers:{handleLogin:async o=>{try{await F_(o)}catch(a){console.error("[AuthComponent] Handle login error:",a),alert("Login failed. Please refresh the page, check your connection and try again.")}},handleLogout:U_},onMount:o=>{const a=c=>{const l=o.querySelector("#goog-login-btn"),u=o.querySelector("#goog-logout-btn");l&&u&&(l.disabled=c,u.disabled=!c)};a(r),n=Ou(({isLoggedIn:c,userName:l})=>{B("[AuthComponent] Auth state changed:",{isLoggedIn:c,userName:l}),a(c),o.update({isLoggedIn:c,userName:l,signingInDisplay:"none"})}),i=JP(c=>{B("[AuthComponent] One Tap status:",c),c==="signing_in"?o.update({signingInDisplay:"inline-block"}):o.update({signingInDisplay:"none"})})},onCleanup:()=>{n&&(n(),n=null),i&&(i(),i=null),ps=null},className:"auth-component",parent:t}),ps},HD="https://people.googleapis.com/v1/people/me/connections",VD="https://people.googleapis.com/v1/otherContacts";async function WD(t){if(!t)throw new Error("Access token is required");const e=[],n=await np(t,HD,"names,emailAddresses");console.log(`[GOOGLE CONTACTS] My Contacts: ${n.length}`),e.push(...n);const i=await np(t,VD,"names,emailAddresses");console.log(`[GOOGLE CONTACTS] Other Contacts: ${i.length}`),e.push(...i),console.log(`[GOOGLE CONTACTS] Total: ${e.length} contacts with email addresses`);const s=new Set;return e.filter(o=>s.has(o.email)?!1:(s.add(o.email),!0))}async function np(t,e,n){const i=[];let s=null;do{const r=new URL(e);r.searchParams.set("pageSize","100"),e.includes("otherContacts")?r.searchParams.set("readMask",n):r.searchParams.set("personFields",n),s&&r.searchParams.set("pageToken",s);const o=await fetch(r.toString(),{headers:{Authorization:`Bearer ${t}`}});if(!o.ok){const l=await o.json().catch(()=>({}));if(e.includes("otherContacts"))return console.warn("[GOOGLE CONTACTS] Other contacts fetch failed (may need additional scope):",l.error?.message),i;throw console.error("[GOOGLE CONTACTS] API error:",l),new Error(l.error?.message||`API error: ${o.status}`)}const a=await o.json(),c=a.connections||a.otherContacts||[];for(const l of c){const u=l.emailAddresses||[],h=(l.names||[])[0]?.displayName||"Unknown";for(const f of u)f.value&&i.push({email:f.value.toLowerCase().trim(),name:h})}s=a.nextPageToken}while(s);return i}async function jD(){return new Promise(t=>{const e=document.createElement("dialog");e.classList.add("add-contact-modal"),e.innerHTML=`
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
    `;const n=e.querySelector("#add-contact-form"),i=e.querySelector("#contact-email-input"),s=e.querySelector("#search-status"),r=e.querySelector('[data-action="cancel"]'),o=e.querySelector('[data-action="search"]'),a=e.querySelector("#import-google-btn"),c=e.querySelector("#import-status"),l=e.querySelector("#import-results");function u(){e.close(),e.remove(),t()}r.addEventListener("click",u),e.addEventListener("cancel",u),n.addEventListener("submit",async d=>{d.preventDefault();const h=i.value.trim();if(h){o.disabled=!0,i.disabled=!0,s.textContent="Searching...",s.className="search-status searching";try{const f=await L_(h);if(!f){s.textContent=`${h} is not on HangVidU yet.`,s.className="search-status not-found",o.disabled=!1,i.disabled=!1;return}const p=gn();if(p&&f.uid===p.uid){s.textContent="That's your own email address!",s.className="search-status error",o.disabled=!1,i.disabled=!1;return}s.textContent=`Found ${f.displayName}! Sending invitation...`,s.className="search-status found",await wy(f.uid,f.displayName),s.textContent=`✓ Invitation sent to ${f.displayName}!`,s.className="search-status success",setTimeout(u,1500)}catch(f){console.error("[ADD CONTACT] Error searching for user:",f),s.textContent="Error searching for user. Please try again.",s.className="search-status error",o.disabled=!1,i.disabled=!1}}}),a.addEventListener("click",async()=>{a.disabled=!0,c.textContent="Requesting access...",c.className="import-status loading",l.innerHTML="";try{const d=await $_();c.textContent="Fetching contacts...";const h=await WD(d);if(h.length===0){c.textContent="No contacts with email addresses found.",c.className="import-status not-found",a.disabled=!1;return}c.textContent=`Found ${h.length} contacts. Checking HangVidU...`;const f=h.map(x=>x.email),p=await t0(f),_=gn(),m=[],A=[];for(const x of h){const W=p[x.email];W&&W.uid!==_?.uid?m.push({...x,user:W}):W||A.push(x)}c.textContent=`${m.length} on HangVidU, ${A.length} not yet`,c.className="import-status success",qD(l,m,A),a.disabled=!1}catch(d){console.error("[ADD CONTACT] Import error:",d),d.message==="Authorization cancelled"?(c.textContent="Import cancelled.",c.className="import-status cancelled"):(c.textContent=`Error: ${d.message}`,c.className="import-status error"),a.disabled=!1}}),document.body.appendChild(e),e.showModal()})}function qD(t,e,n){if(t.innerHTML="",e.length>0){const i=document.createElement("div");i.className="results-section",i.innerHTML=`<h4>On HangVidU (${e.length})</h4>`;const s=document.createElement("ul");s.className="contact-list";for(const{name:r,email:o,user:a}of e){const c=document.createElement("li");c.className="contact-item",c.innerHTML=`
        <span class="contact-info">
          <strong>${kr(r)}</strong>
          <small>${kr(o)}</small>
        </span>
        <button type="button" class="invite-btn" data-uid="${kr(a.uid)}" data-name="${kr(a.displayName)}">
          Invite
        </button>
      `;const l=c.querySelector(".invite-btn");l.addEventListener("click",async()=>{l.disabled=!0,l.textContent="Sending...";try{await wy(a.uid,a.displayName),l.textContent="✓ Sent",l.classList.add("sent")}catch(u){console.error("[ADD CONTACT] Invite error:",u),l.textContent="Error",l.disabled=!1}}),s.appendChild(c)}i.appendChild(s),t.appendChild(i)}if(e.length===0&&n.length>0){const i=document.createElement("div");i.className="empty-state",i.innerHTML=`
      <p>None of your ${n.length} contacts are on HangVidU yet.</p>
      <p>Be the first to invite them!</p>
    `,t.appendChild(i)}if(n.length>0&&e.length>0){const i=document.createElement("div");i.className="results-section not-on-app",i.innerHTML=`<p class="muted-text">${n.length} contacts not on HangVidU yet</p>`,t.appendChild(i)}}function kr(t){const e=document.createElement("div");return e.textContent=t||"",e.innerHTML.replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function zD(){const t=document.querySelector("link[rel~='icon']");return t?t.href:"/favicon.ico"}class GD{constructor(){this.originalTitle=document.title,this.originalFavicon=zD(),this.titleFlashInterval=null,this.isFlashing=!1,this.wakeLock=null,this.setupVisibilityListener()}setupVisibilityListener(){document.addEventListener("visibilitychange",()=>{!document.hidden&&this.isFlashing&&this.stopTitleFlashing()})}startCallIndicators(e){console.log(`[CallIndicators] Starting call indicators for: ${e}`),this.startTitleFlashing(e),this.setFavicon("/HangVidU/icons/phone-ringing.svg"),this.setBadge(1),this.requestWakeLock()}stopCallIndicators(){console.log("[CallIndicators] Stopping call indicators"),this.stopTitleFlashing(),this.restoreFavicon(),this.clearBadge(),this.releaseWakeLock()}startTitleFlashing(e){this.stopTitleFlashing();let n=!0;this.isFlashing=!0,document.title=`📞 Call from ${e}!`,this.titleFlashInterval=setInterval(()=>{this.isFlashing&&(document.title=n?`📞 Call from ${e}!`:this.originalTitle,n=!n)},1e3)}stopTitleFlashing(){this.titleFlashInterval&&(clearInterval(this.titleFlashInterval),this.titleFlashInterval=null),this.isFlashing=!1,document.title=this.originalTitle}setFavicon(e){const n=document.querySelector("link[rel~='icon']");n&&(n.href=e,console.log(`[CallIndicators] Favicon changed to: ${e}`))}restoreFavicon(){this.setFavicon(this.originalFavicon)}setBadge(e){"setAppBadge"in navigator&&navigator.setAppBadge(e).then(()=>{console.log(`[CallIndicators] Badge set to: ${e}`)}).catch(n=>{console.warn("[CallIndicators] Badge not supported:",n)})}clearBadge(){"clearAppBadge"in navigator&&navigator.clearAppBadge().then(()=>{console.log("[CallIndicators] Badge cleared")}).catch(e=>{console.warn("[CallIndicators] Badge clear failed:",e)})}async requestWakeLock(){if("wakeLock"in navigator)try{this.wakeLock=await navigator.wakeLock.request("screen"),console.log("[CallIndicators] Wake lock active"),this.wakeLock.addEventListener("release",()=>{console.log("[CallIndicators] Wake lock released"),this.wakeLock=null},{once:!0})}catch(e){console.warn("[CallIndicators] Wake lock failed:",e)}}releaseWakeLock(){if(this.wakeLock){const e=this.wakeLock;this.wakeLock=null,e.release().then(()=>{console.log("[CallIndicators] Wake lock released manually")}).catch(n=>{console.warn("[CallIndicators] Wake lock release failed:",n)})}}}const ip=new GD;let sp=!1;function KD(t,e){const n=document.createElement("dialog");n.className="copy-link-dialog";const i=document.createElement("div");i.className="copy-link-dialog__content";const s=document.createElement("h2");s.className="copy-link-dialog__title",s.textContent=e.title,i.appendChild(s);const r=document.createElement("div");r.className="copy-link-dialog__input-container";const o=document.createElement("input");o.type="text",o.className="copy-link-dialog__input",o.value=t,o.readOnly=!0,o.setAttribute("aria-label","Link to copy"),r.appendChild(o),i.appendChild(r);const a=document.createElement("div");a.className="copy-link-dialog__buttons";const c=document.createElement("button");c.className="copy-link-dialog__button copy-link-dialog__button--primary",c.textContent=e.buttonText,c.autofocus=!0;const l=document.createElement("button");l.className="copy-link-dialog__button copy-link-dialog__button--secondary",l.textContent=e.cancelText,a.appendChild(c),a.appendChild(l),i.appendChild(a);const u=document.createElement("p");return u.className="copy-link-dialog__feedback",u.setAttribute("aria-live","polite"),i.appendChild(u),n.appendChild(i),{dialog:n,input:o,copyButton:c,cancelButton:l,feedback:u}}function YD(t,e={}){const n={title:"Share this link",buttonText:"Copy",cancelText:"Cancel",successMessage:"✓ Copied to clipboard!",errorMessage:"Failed to copy. Click the link to select it manually.",autoClose:!0,autoCloseDelay:1200,onCopy:null,onError:null,onCancel:null,onClose:null,...e};JD();const{dialog:i,input:s,copyButton:r,cancelButton:o,feedback:a}=KD(t,n);XD(i);let c=!1;const l=async()=>{await QD(t,s)?(c=!0,a.textContent=n.successMessage,a.classList.remove("copy-link-dialog__feedback--error"),n.onCopy&&n.onCopy(t),n.autoClose&&setTimeout(()=>{i.close()},n.autoCloseDelay)):(a.textContent=n.errorMessage,a.classList.add("copy-link-dialog__feedback--error"),s.readOnly=!1,s.addEventListener("click",()=>{s.select()}),n.onError&&n.onError())};return r.addEventListener("click",l),o.addEventListener("click",()=>{n.onCancel&&n.onCancel(),i.close()}),i.addEventListener("keydown",u=>{u.key==="Enter"&&!u.shiftKey&&!u.ctrlKey&&!u.altKey&&!u.metaKey&&(u.preventDefault(),l())}),i.addEventListener("close",()=>{!c&&n.onCancel&&n.onCancel(),n.onClose&&n.onClose(),setTimeout(()=>{i.remove()},300)}),document.body.appendChild(i),i.showModal(),i}function JD(){if(sp)return;const t=document.createElement("style");t.textContent=`
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
  `,document.head.appendChild(t),sp=!0}function XD(t){t.showModal||(t.showModal=function(){this.setAttribute("open",""),this.style.display="block",this.style.position="fixed",this.style.top="50%",this.style.left="50%",this.style.transform="translate(-50%, -50%)";const e=getComputedStyle(document.documentElement).getPropertyValue("--z-ui-overlay").trim();this.style.zIndex=e||"1000"},t.close=function(){this.removeAttribute("open"),this.style.display="none"})}async function QD(t,e=null){if(navigator.clipboard&&navigator.clipboard.writeText)try{return await navigator.clipboard.writeText(t),!0}catch(n){return console.warn("Clipboard API failed, using fallback:",n),!1}if(!e)return!1;try{return e.select(),e.setSelectionRange(0,99999),document.execCommand("copy")}catch(n){return console.error("Fallback copy failed:",n),!1}}function ZD(){const t=window.matchMedia&&window.matchMedia("(display-mode: standalone)").matches||navigator.standalone===!0,e=/iphone|ipad|ipod/i.test(navigator.userAgent||"");if(!t||!e||!window.location.hostname.includes("github.io"))return;const i="https://vidu-aae11.web.app",s=i.replace(/\/$/,"");let r;try{r=new URL(s).hostname}catch(l){console.error("[PWA Redirect] Invalid VITE_APP_HOSTING_URL:",i,l);return}if(window.location.hostname===r)return;const o="/HangVidU/";let a=window.location.pathname;a.startsWith(o)?a="/"+a.slice(o.length):a==="/HangVidU"&&(a="/");let c;try{c=new URL(a+window.location.search+window.location.hash,s).toString()}catch(l){console.error("[PWA Redirect] Failed to construct target URL:",l);return}console.log("[PWA Redirect] iOS standalone PWA on gh-pages → redirecting to Firebase Hosting:",c),window.location.replace(c)}ZD();zP(!0);y().disable();let ud=[];async function eM(){GL();const t=j_(),n=["localVideoEl","remoteVideoEl","localBoxEl","remoteBoxEl","chatControls","lobbyDiv","titleAuthBar"].filter(i=>!t[i]);if(n.length>0)return console.error("Critical elements missing:",n),!1;try{{const{setupPWA:r}=await Le(async()=>{const{setupPWA:o}=await import("./PWA-BribDqUs.js");return{setupPWA:o}},[]);await r()}DD(),iM(),await D_;const i=BD(fa);i&&ud.push(i.dispose);const s=document.querySelector(".top-right-menu");if(s){const r=FD({parent:s,hideWhenAllRead:!0});$D.setToggle(r)}try{await We.initialize()?console.log("[MAIN] FCM notifications initialized successfully"):console.warn("[MAIN] FCM notifications failed to initialize")}catch(r){console.error("[MAIN] FCM initialization error:",r)}return window.notificationController=We,window.getLoggedInUserId=M,!0}catch(i){return console.error("Initialization error:",i),!1}}let ml=!1;function Gy(){ml=!1}async function Ky(){ml||(ml=!0,await HL(ze),UL({getLocalStream:ma,getLocalVideo:()=>ze,getRemoteVideo:()=>ae,getPeerConnection:()=>_e.getState().pc,setLocalStream:Co,micBtn:ns,cameraBtn:is,switchCameraBtn:ts,mutePartnerBtn:ft,fullscreenPartnerBtn:pa,remotePipBtn:mn}),ze&&(ze.addEventListener("enterpictureinpicture",()=>me&&w(me)),ze.addEventListener("leavepictureinpicture",()=>{me&&!(Kn()&&iy())&&D(me)})))}function Yy(t){(t?.name==="NotAllowedError"||t?.name==="PermissionDeniedError")&&alert('Camera/microphone access is required for video calls. Please click "Allow" when prompted, or check your browser settings.'),Gy()}function Hr(t=null){return{localStream:ma(),localVideoEl:ze,remoteVideoEl:ae,mutePartnerBtn:ft,setupRemoteStream:VL,setupWatchSync:D0,targetRoomId:t}}function Vr(t,e=!1){return t.success?(e&&t.roomLink&&YD(t.roomLink,{onCopy:()=>B("Link ready! Share with your partner."),onCancel:()=>B("Link ready! Use the copy button to use it, or create a new one.")}),!0):!1}async function pr(t,{forceInitiator:e=!1}={}){try{await Ky()}catch(r){return console.error("Failed to initialize local media stream:",r),Yy(r),!1}const n=Date.now();if(e){y().logRoomCreation(t,!0,{creationTime:n,listenerAttachTime:n,timeDiff:0},{trigger:"force_initiator",reason:"calling_saved_contact"});const r=await _e.createCall(Hr(t));return Vr(r,!1)}let i=await se.checkRoomStatus(t);if(i.exists&&!i.hasMembers){let o=0;for(;o<3&&!i.hasMembers;)await new Promise(a=>setTimeout(a,250*(o+1))),i=await se.checkRoomStatus(t),o++}if(!i.exists||!i.hasMembers){y().logRoomCreation(t,!0,{creationTime:n,listenerAttachTime:n,timeDiff:0},{trigger:"room_empty_or_nonexistent",roomExists:i.exists,memberCount:i.memberCount||0});const r=await _e.createCall(Hr(t));return Vr(r,!0)}y().log("ROOM","JOINING_EXISTING",{roomId:t,memberCount:i.memberCount,roomExists:i.exists});const s=await _e.answerCall({roomId:t,...Hr()});return Vr(s,!1)}const He=new Set,Jy=new Map;function rp(t){t&&(aa(t),He.delete(t),Jy.delete(t),y().log("LISTENER","INCOMING_CLEANUP",{roomId:t,remainingListeners:He.size}))}function tM(){B(`[LISTENER] Removing all incoming listeners (${He.size} rooms)`);const t=Array.from(He);t.forEach(e=>{aa(e)}),He.clear(),Jy.clear(),y().log("LISTENER","ALL_INCOMING_CLEANUP",{roomsCleared:t.length})}async function nM(t){const e=Date.now(),n=e+1440*60*1e3,i=M();if(i){const s=vu(i,t);await ne(s,{roomId:t,savedAt:e,expiresAt:n});return}try{const s=localStorage.getItem("recentCalls")||"{}",r=JSON.parse(s);r[t]={roomId:t,savedAt:e,expiresAt:n},localStorage.setItem("recentCalls",JSON.stringify(r))}catch(s){console.warn("Failed to save recent call to localStorage",s)}}async function hc(t){const e=M();if(e){try{await Ze(vu(e,t))}catch(n){console.warn("Failed to remove recent call from RTDB",n)}return}try{const n=localStorage.getItem("recentCalls")||"{}",i=JSON.parse(n);i[t]&&(delete i[t],localStorage.setItem("recentCalls",JSON.stringify(i)))}catch(n){console.warn("Failed to remove recent call from localStorage",n)}}function Bi(t){t&&(He.has(t)&&(He.delete(t),aa(t)),B(`[LISTENER] Attaching listener for room: ${t} (total: ${He.size+1})`),He.add(t),y().logListenerAttachment(t,"member_join",He.size,{action:"incoming_call_listener_attached"}),se.onMemberJoined(t,async e=>{const n=e.key,i=e.val?e.val():null,s=ge();if(n&&n!==s){y().logMemberJoinEvent(t,n,i||{},{detectedBy:"incoming_call_listener",currentUserId:s});const r=i&&typeof i.joinedAt=="number"?i.joinedAt:null,o=2e4;let a=!1,c="none",l=0;if(r&&(l=Date.now()-r,a=l<o,c="joinedAt"),!a){const W=await B_(n,t),S=await H_(t);a=W||S,c=W?"outgoingState":S?"roomCreatedAt":"failed"}const u={isFresh:a,method:c,age:l,reason:a?"call_is_fresh":"call_is_stale"};if(y().logIncomingCallEvent(n,t,u,{memberData:i,joinedAt:r,CALL_FRESH_MS:o}),!a){y().logNotificationDecision("REJECT","stale_call",t,{age:l,validationMethod:c,joiningUserId:n});return}let d;try{d=await se.getRoomData(t)}catch{return}if(!d||typeof d!="object")return;const h=!!d.offer,f=!!d.answer,p=d.createdBy;if(!h||f||p===s)return;const _=_e.getState();if(!!_.pc&&_.pc.connectionState==="connected"){y().logNotificationDecision("REJECT","already_in_call",t,{joiningUserId:n,currentCallState:_.pc?.connectionState});return}y().logNotificationDecision("SHOW","fresh_call_detected",t,{joiningUserId:n,freshnessResult:u});const A=await qy(t,n);_i.playIncoming(),ip.startCallIndicators(A);let x=!1;try{x=await _a(`Incoming call from ${A}.

Accept?`)}finally{_i.stop(),ip.stopCallIndicators()}if(x)rp(t),We.isNotificationEnabled()&&await We.dismissCallNotifications(t),y().logNotificationDecision("ACCEPT","user_accepted",t,{joiningUserId:n}),pr(t).catch(W=>{console.warn("Failed to answer incoming call:",W),y().logFirebaseOperation("join_room_on_accept",!1,W,{roomId:t,joiningUserId:n})});else{We.isNotificationEnabled()&&await We.dismissCallNotifications(t),y().logNotificationDecision("REJECT","user_rejected",t,{joiningUserId:n});try{await se.rejectCall(t,ge(),"user_rejected")}catch(W){console.warn("Failed to signal rejection via RTDB:",W)}await hc(t).catch(W=>{console.warn("Failed to remove recent call on rejection:",W)})}}}),se.onCallCancelled(t,async e=>{if(e&&typeof e.val=="function"&&e.val()){try{const{dismissActiveConfirmDialog:i}=await Le(async()=>{const{dismissActiveConfirmDialog:s}=await Promise.resolve().then(()=>JL);return{dismissActiveConfirmDialog:s}},void 0);typeof i=="function"&&i()}catch{}await hc(t).catch(()=>{})}}),se.onMemberLeft(t,async e=>{const n=e.key,i=ge();if(!(!n||n===i))try{(await se.checkRoomStatus(t)).hasMembers||(await hc(t),rp(t),B(`Removed saved recent call and listeners for room ${t} because it is now empty`))}catch(s){console.warn("Failed to evaluate room status on member leave",s)}}))}async function op(){const t=Date.now();y().log("LISTENER","STARTUP_BEGIN",{timestamp:t,currentListenerCount:He.size});try{if(typeof window<"u"){const{getCurrentUserAsync:n}=await Le(async()=>{const{getCurrentUserAsync:i}=await Promise.resolve().then(()=>Du);return{getCurrentUserAsync:i}},void 0);await n()}}catch{}const e=M();if(y().log("LISTENER","AUTH_STATE_DETERMINED",{isLoggedIn:!!e,userId:e||"guest"}),e){const n=GA(e);try{const i=await De(n),s=i.exists()?i.val():null,r=new Set;if(s)for(const[o,a]of Object.entries(s)){if(!a||a.expiresAt&&a.expiresAt<Date.now()){await Ze(vu(e,o)).catch(()=>{});continue}r.add(o)}try{const o=await _n();Object.entries(o||{}).forEach(([a,c])=>{if(c?.roomId)r.add(c.roomId);else if(a&&e)try{const l=wo(e,a);r.add(l)}catch{}})}catch{}r.forEach(o=>Bi(o)),y().log("LISTENER","STARTUP_COMPLETE",{storage:"rtdb",roomsToListen:Array.from(r),totalListeners:He.size,duration:Date.now()-t})}catch(i){console.warn("Failed to read recent calls from RTDB",i),y().logFirebaseOperation("read_recent_calls",!1,i,{storage:"rtdb",userId:e})}return}try{const n=localStorage.getItem("recentCalls")||"{}",i=JSON.parse(n),s={},r=new Set;for(const[o,a]of Object.entries(i||{}))!a||a.expiresAt&&a.expiresAt<Date.now()||(s[o]=a,r.add(o));try{const o=await _n(),a=ge();Object.entries(o||{}).forEach(([c,l])=>{if(l?.roomId)r.add(l.roomId);else if(c&&a)try{const u=wo(a,c);r.add(u)}catch{}})}catch{}r.forEach(o=>Bi(o)),localStorage.setItem("recentCalls",JSON.stringify(s)),y().log("LISTENER","STARTUP_COMPLETE",{storage:"localStorage",roomsToListen:Array.from(r),totalListeners:He.size,duration:Date.now()-t,expiredRoomsRemoved:Object.keys(i||{}).length-r.size})}catch(n){console.warn("Failed to read recent calls from localStorage",n),y().logFirebaseOperation("read_recent_calls",!1,n,{storage:"localStorage"})}}function Rr(){return U&&Ae&&!Ae.classList.contains("hidden")&&U.src&&U.src.trim()!==""}let ap=!1;function iM(){if(ap)return;const t=()=>{const e=document.activeElement;return e&&(e.tagName==="INPUT"||e.tagName==="TEXTAREA"||e.isContentEditable)};document.addEventListener("keydown",e=>{t()||(e.key==="w"||e.key==="W")&&(console.log("=== W KEY PRESSED ==="),console.log("lastWatched:",mt()),console.log("isYTVisible():",Za()),console.log("isSharedVideoVisible():",Rr()),console.log("isWatchModeActive():",Kn()),mt()==="yt"?Za()?(To(),ks()):(ty(),Io()):(mt()==="url"||mt()==="file")&&(Rr()?(w(Ae),ks()):(D(Ae),Io()))),e.key==="Escape"&&Kn()&&(mt()==="yt"&&Za()?(fr(),To()):(mt()==="url"&&Rr()||mt()==="file"&&Rr())&&(U.pause(),w(Ae)),ks())}),ap=!0}const Xy=async()=>{try{await Ky();const t=await _e.createCall(Hr());Vr(t,!0)}catch(t){console.error("Failed to start call:",t),Yy(t)}};Ue.onclick=Xy;bn.onclick=Xy;wi&&(navigator.clipboard&&navigator.clipboard.readText?wi.onclick=async()=>{try{const t=await navigator.clipboard.readText(),e=sM(t);if(!e){alert("No valid room link found in clipboard.");return}await pr(e)}catch(t){t.name==="NotAllowedError"?alert("Clipboard access denied. Please allow clipboard access or paste the link manually."):(console.error("Paste & Join failed:",t),alert("Failed to read clipboard. Please try again."))}}:(wi.style.display="none",console.warn("Paste & Join button hidden: Clipboard API not available in this context (requires HTTPS).")));Ks&&(Ks.onclick=async()=>{await jD()});Gn&&(Gn.onclick=()=>{mt()==="yt"?(fr(),To()):(mt()==="url"||mt()==="file")&&(U.pause(),U.src.startsWith("blob:")&&URL.revokeObjectURL(U.src),w(Ae)),ks()});ht.onclick=async()=>{console.debug("Hanging up..."),await _e.hangUp({emitCancel:!0,reason:"user_hung_up"})};function sM(t){let e=t.trim();if(!e)return"";try{const n=new URL(e,window.location.origin),i=n.searchParams.get("room");if(i)return i;const s=n.hash.match(/room=([^&]+)/);return s?decodeURIComponent(s[1]):n.pathname.replace(/^\//,"")||e}catch{return e}}async function rM(){const e=new URLSearchParams(window.location.search).get("room");if(!e)return!1;const n=await pr(e);return n||(ha(),ly()),n}const _l=[];let fc=!1;async function Qy(){if(fc||_l.length===0)return;fc=!0;const{fromUserId:t,inviteData:e}=_l.shift();try{if(await _a(`${e.fromName||"Someone"} wants to connect.

Accept contact invitation?`))try{await jL(t,e),console.log("[INVITATIONS] Contact added:",e.fromName),await Wt(et).catch(()=>{}),alert(`Added ${e.fromName} to your contacts!`)}catch(i){console.error("[INVITATIONS] Failed to accept invite:",i),alert("Failed to add contact. Please try again.")}else try{await qL(t),console.log("[INVITATIONS] Invite declined")}catch(i){console.error("[INVITATIONS] Failed to decline invite:",i)}}finally{fc=!1,Qy()}}function cp(){WL((t,e)=>{_l.push({fromUserId:t,inviteData:e}),Qy()}),zL(async(t,e)=>{console.log("[INVITATIONS] Your invite was accepted by:",e.acceptedByName),await Wt(et).catch(()=>{}),alert(`${e.acceptedByName} accepted your invitation!`)})}window.onload=async()=>{if(!await eM()){Ue&&(Ue.disabled=!0,Ue.title="Initialization failed. Please reload the page or check your camera/microphone permissions."),console.error("Initialization failed. Call functionality disabled. Please reload the page."),alert(`Hangvidu could not initialize properly.

Please check your camera/microphone permissions and reload the page.`);return}KL(_e),await op().catch(s=>console.warn("Failed to start saved-room listeners",s)),Wt(et).catch(s=>{console.warn("Failed to render contacts list:",s)});let e=null;const n=Ou(async({isLoggedIn:s,user:r})=>{try{const o=e===null,a=e===!0&&!s,c=e===!1&&s;e=s,await Wt(et),a?(B("[AUTH] User logged out - cleaning up messaging and listeners"),Ee.reset(),on.closeAllSessions(),We.isNotificationEnabled()&&await We.disable().catch(l=>{console.warn("[AUTH] Failed to disable notifications on logout:",l)}),tM(),ul()):c?(B("[AUTH] User logged in - re-attaching incoming listeners"),await op().catch(l=>console.warn("Failed to re-attach saved-room listeners on login",l)),cp()):o&&s&&(B("[AUTH] Initial load with logged-in user"),cp())}catch(o){console.warn("Failed to handle auth change:",o)}});ud.push(()=>{try{typeof n=="function"&&n()}catch{}}),await rM()};window.addEventListener("beforeunload",async t=>{const e=_e.getState();if(e.pc&&e.pc.connectionState==="connected")return t.preventDefault(),t.returnValue="You are in an active call. Are you sure you want to leave?",t.returnValue;await oM()});_e.on("memberJoined",({memberId:t,roomId:e})=>{console.debug("CallController memberJoined event",{memberId:t,roomId:e}),_e.setPartnerId(t),Ee.showMessagesToggle(),va(t,t),Fu().catch(n=>console.warn("Failed to clear calling state:",n)),nM(e).catch(n=>console.warn("Failed to save recent call:",n))});_e.on("memberLeft",({memberId:t})=>{console.info("Partner has left the call")});_e.on("cleanup",async({roomId:t,partnerId:e,reason:n,role:i,wasConnected:s})=>{if(i==="initiator"&&!e&&!s&&t){console.log("[MAIN] Potential missed call detected for room:",t);try{const{getContactByRoomId:a}=await Le(async()=>{const{getContactByRoomId:l}=await Promise.resolve().then(()=>hl);return{getContactByRoomId:l}},void 0),c=await a(t);if(c&&c.contactId){const{getCurrentUser:l}=await Le(async()=>{const{getCurrentUser:h}=await Promise.resolve().then(()=>Du);return{getCurrentUser:h}},void 0),d=l()?.displayName||"Friend";console.log(`[MAIN] Sending missed call notification to ${c.contactName} (${c.contactId})`),await We.sendMissedCallNotification(c.contactId,{roomId:t,callerId:ge(),callerName:d})}else console.log("[MAIN] No saved contact found for room, skipping missed call notification")}catch(a){console.warn("[MAIN] Failed to handle missed call:",a)}}t&&We.isNotificationEnabled()&&We.dismissCallNotifications(t).catch(a=>{console.warn("[MAIN] Failed to dismiss call notifications:",a)});const o=_e.getState();o.messagesUI&&typeof o.messagesUI.cleanup=="function"&&(o.messagesUI.cleanup(),o.messagesUI=null),X_(),ha(),e&&t&&setTimeout(()=>{zy(e,t,et).catch(a=>{console.warn("Failed to save contact after cleanup:",a)})},500)});async function oM(){await _e.hangUp({emitCancel:!0,reason:"page_unload"}),$L(),jA(),document.pictureInPictureElement&&document.exitPictureInPicture().catch(e=>console.error(e));const t=_e.getState();t.messagesUI&&t.messagesUI.cleanup&&t.messagesUI.cleanup(),window.history.replaceState({},document.title,window.location.pathname),U.src="",Z_(),ze&&ze.srcObject&&(ze.srcObject=null),ae&&ae.srcObject&&(ae.srcObject=null),ks(),O0("none"),Gu(),MD(),ha(),ey(!1),ud.forEach(e=>e())}const aM=Object.freeze(Object.defineProperty({__proto__:null,joinOrCreateRoomWithId:pr,listenForIncomingOnRoom:Bi,resetLocalStreamInitFlag:Gy},Symbol.toStringTag,{value:"Module"}));export{Le as _,Zu as c,B as d,w as h,cM as i,$D as n,D as s};
