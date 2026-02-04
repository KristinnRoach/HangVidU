(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))i(s);new MutationObserver(s=>{for(const r of s)if(r.type==="childList")for(const o of r.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&i(o)}).observe(document,{childList:!0,subtree:!0});function n(s){const r={};return s.integrity&&(r.integrity=s.integrity),s.referrerPolicy&&(r.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?r.credentials="include":s.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function i(s){if(s.ep)return;s.ep=!0;const r=n(s);fetch(s.href,r)}})();const Gw="modulepreload",Kw=function(t){return"/HangVidU/"+t},$d={},ue=function(e,n,i){let s=Promise.resolve();if(n&&n.length>0){let c=function(l){return Promise.all(l.map(u=>Promise.resolve(u).then(d=>({status:"fulfilled",value:d}),d=>({status:"rejected",reason:d}))))};document.getElementsByTagName("link");const o=document.querySelector("meta[property=csp-nonce]"),a=o?.nonce||o?.getAttribute("nonce");s=c(n.map(l=>{if(l=Kw(l),l in $d)return;$d[l]=!0;const u=l.endsWith(".css"),d=u?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${l}"]${d}`))return;const h=document.createElement("link");if(h.rel=u?"stylesheet":Gw,u||(h.as="script"),h.crossOrigin="",h.href=l,a&&h.setAttribute("nonce",a),document.head.appendChild(h),u)return new Promise((f,p)=>{h.addEventListener("load",f),h.addEventListener("error",()=>p(new Error(`Unable to preload CSS for ${l}`)))})}))}function r(o){const a=new Event("vite:preloadError",{cancelable:!0});if(a.payload=o,window.dispatchEvent(a),!a.defaultPrevented)throw o}return s.then(o=>{for(const a of o||[])a.status==="rejected"&&r(a.reason);return e().catch(r)})},L=typeof __SENTRY_DEBUG__>"u"||__SENTRY_DEBUG__,W=globalThis,zn="10.36.0";function Wo(){return qo(W),W}function qo(t){const e=t.__SENTRY__=t.__SENTRY__||{};return e.version=e.version||zn,e[zn]=e[zn]||{}}function Xi(t,e,n=W){const i=n.__SENTRY__=n.__SENTRY__||{},s=i[zn]=i[zn]||{};return s[t]||(s[t]=e())}const Yw=["debug","info","warn","error","log","assert","trace"],Jw="Sentry Logger ",ao={};function Qi(t){if(!("console"in W))return t();const e=W.console,n={},i=Object.keys(ao);i.forEach(s=>{const r=ao[s];n[s]=e[s],e[s]=r});try{return t()}finally{i.forEach(s=>{e[s]=n[s]})}}function Xw(){Fl().enabled=!0}function Qw(){Fl().enabled=!1}function Dp(){return Fl().enabled}function Zw(...t){xl("log",...t)}function ev(...t){xl("warn",...t)}function tv(...t){xl("error",...t)}function xl(t,...e){L&&Dp()&&Qi(()=>{W.console[t](`${Jw}[${t}]:`,...e)})}function Fl(){return L?Xi("loggerSettings",()=>({enabled:!1})):{enabled:!1}}const I={enable:Xw,disable:Qw,isEnabled:Dp,log:Zw,warn:ev,error:tv},Mp=50,Qn="?",Bd=/\(error: (.*)\)/,Hd=/captureMessage|captureException/;function xp(...t){const e=t.sort((n,i)=>n[0]-i[0]).map(n=>n[1]);return(n,i=0,s=0)=>{const r=[],o=n.split(`
`);for(let a=i;a<o.length;a++){let c=o[a];c.length>1024&&(c=c.slice(0,1024));const l=Bd.test(c)?c.replace(Bd,"$1"):c;if(!l.match(/\S*Error: /)){for(const u of e){const d=u(l);if(d){r.push(d);break}}if(r.length>=Mp+s)break}}return iv(r.slice(s))}}function nv(t){return Array.isArray(t)?xp(...t):t}function iv(t){if(!t.length)return[];const e=Array.from(t);return/sentryWrapped/.test(Mr(e).function||"")&&e.pop(),e.reverse(),Hd.test(Mr(e).function||"")&&(e.pop(),Hd.test(Mr(e).function||"")&&e.pop()),e.slice(0,Mp).map(n=>({...n,filename:n.filename||Mr(e).filename,function:n.function||Qn}))}function Mr(t){return t[t.length-1]||{}}const Wa="<anonymous>";function En(t){try{return!t||typeof t!="function"?Wa:t.name||Wa}catch{return Wa}}function Vd(t){const e=t.exception;if(e){const n=[];try{return e.values.forEach(i=>{i.stacktrace.frames&&n.push(...i.stacktrace.frames)}),n}catch{return}}}function Fp(t){return"__v_isVNode"in t&&t.__v_isVNode?"[VueVNode]":"[VueViewModel]"}const zr={},jd={};function fi(t,e){zr[t]=zr[t]||[],zr[t].push(e)}function pi(t,e){if(!jd[t]){jd[t]=!0;try{e()}catch(n){L&&I.error(`Error while instrumenting ${t}`,n)}}}function ft(t,e){const n=t&&zr[t];if(n)for(const i of n)try{i(e)}catch(s){L&&I.error(`Error while triggering instrumentation handler.
Type: ${t}
Name: ${En(i)}
Error:`,s)}}let qa=null;function sv(t){const e="error";fi(e,t),pi(e,rv)}function rv(){qa=W.onerror,W.onerror=function(t,e,n,i,s){return ft("error",{column:i,error:s,line:n,msg:t,url:e}),qa?qa.apply(this,arguments):!1},W.onerror.__SENTRY_INSTRUMENTED__=!0}let za=null;function ov(t){const e="unhandledrejection";fi(e,t),pi(e,av)}function av(){za=W.onunhandledrejection,W.onunhandledrejection=function(t){return ft("unhandledrejection",t),za?za.apply(this,arguments):!0},W.onunhandledrejection.__SENTRY_INSTRUMENTED__=!0}const Up=Object.prototype.toString;function zo(t){switch(Up.call(t)){case"[object Error]":case"[object Exception]":case"[object DOMException]":case"[object WebAssembly.Exception]":return!0;default:return Cn(t,Error)}}function Zi(t,e){return Up.call(t)===`[object ${e}]`}function $p(t){return Zi(t,"ErrorEvent")}function Wd(t){return Zi(t,"DOMError")}function cv(t){return Zi(t,"DOMException")}function Vt(t){return Zi(t,"String")}function Ul(t){return typeof t=="object"&&t!==null&&"__sentry_template_string__"in t&&"__sentry_template_values__"in t}function Go(t){return t===null||Ul(t)||typeof t!="object"&&typeof t!="function"}function Vs(t){return Zi(t,"Object")}function Ko(t){return typeof Event<"u"&&Cn(t,Event)}function lv(t){return typeof Element<"u"&&Cn(t,Element)}function uv(t){return Zi(t,"RegExp")}function fr(t){return!!(t?.then&&typeof t.then=="function")}function dv(t){return Vs(t)&&"nativeEvent"in t&&"preventDefault"in t&&"stopPropagation"in t}function Cn(t,e){try{return t instanceof e}catch{return!1}}function Bp(t){return!!(typeof t=="object"&&t!==null&&(t.__isVue||t._isVue||t.__v_isVNode))}function Hp(t){return typeof Request<"u"&&Cn(t,Request)}const $l=W,hv=80;function Vp(t,e={}){if(!t)return"<unknown>";try{let n=t;const i=5,s=[];let r=0,o=0;const a=" > ",c=a.length;let l;const u=Array.isArray(e)?e:e.keyAttrs,d=!Array.isArray(e)&&e.maxStringLength||hv;for(;n&&r++<i&&(l=fv(n,u),!(l==="html"||r>1&&o+s.length*c+l.length>=d));)s.push(l),o+=l.length,n=n.parentNode;return s.reverse().join(a)}catch{return"<unknown>"}}function fv(t,e){const n=t,i=[];if(!n?.tagName)return"";if($l.HTMLElement&&n instanceof HTMLElement&&n.dataset){if(n.dataset.sentryComponent)return n.dataset.sentryComponent;if(n.dataset.sentryElement)return n.dataset.sentryElement}i.push(n.tagName.toLowerCase());const s=e?.length?e.filter(o=>n.getAttribute(o)).map(o=>[o,n.getAttribute(o)]):null;if(s?.length)s.forEach(o=>{i.push(`[${o[0]}="${o[1]}"]`)});else{n.id&&i.push(`#${n.id}`);const o=n.className;if(o&&Vt(o)){const a=o.split(/\s+/);for(const c of a)i.push(`.${c}`)}}const r=["aria-label","type","name","title","alt"];for(const o of r){const a=n.getAttribute(o);a&&i.push(`[${o}="${a}"]`)}return i.join("")}function Bl(){try{return $l.document.location.href}catch{return""}}function pv(t){if(!$l.HTMLElement)return null;let e=t;const n=5;for(let i=0;i<n;i++){if(!e)return null;if(e instanceof HTMLElement){if(e.dataset.sentryComponent)return e.dataset.sentryComponent;if(e.dataset.sentryElement)return e.dataset.sentryElement}e=e.parentNode}return null}function Ge(t,e,n){if(!(e in t))return;const i=t[e];if(typeof i!="function")return;const s=n(i);typeof s=="function"&&jp(s,i);try{t[e]=s}catch{L&&I.log(`Failed to replace method "${e}" in object`,t)}}function Tn(t,e,n){try{Object.defineProperty(t,e,{value:n,writable:!0,configurable:!0})}catch{L&&I.log(`Failed to add non-enumerable property "${e}" to object`,t)}}function jp(t,e){try{const n=e.prototype||{};t.prototype=e.prototype=n,Tn(t,"__sentry_original__",e)}catch{}}function Hl(t){return t.__sentry_original__}function Wp(t){if(zo(t))return{message:t.message,name:t.name,stack:t.stack,...zd(t)};if(Ko(t)){const e={type:t.type,target:qd(t.target),currentTarget:qd(t.currentTarget),...zd(t)};return typeof CustomEvent<"u"&&Cn(t,CustomEvent)&&(e.detail=t.detail),e}else return t}function qd(t){try{return lv(t)?Vp(t):Object.prototype.toString.call(t)}catch{return"<unknown>"}}function zd(t){if(typeof t=="object"&&t!==null){const e={};for(const n in t)Object.prototype.hasOwnProperty.call(t,n)&&(e[n]=t[n]);return e}else return{}}function gv(t){const e=Object.keys(Wp(t));return e.sort(),e[0]?e.join(", "):"[object has no keys]"}let _i;function Yo(t){if(_i!==void 0)return _i?_i(t):t();const e=Symbol.for("__SENTRY_SAFE_RANDOM_ID_WRAPPER__"),n=W;return e in n&&typeof n[e]=="function"?(_i=n[e],_i(t)):(_i=null,t())}function co(){return Yo(()=>Math.random())}function Jo(){return Yo(()=>Date.now())}function Nc(t,e=0){return typeof t!="string"||e===0||t.length<=e?t:`${t.slice(0,e)}...`}function Gd(t,e){if(!Array.isArray(t))return"";const n=[];for(let i=0;i<t.length;i++){const s=t[i];try{Bp(s)?n.push(Fp(s)):n.push(String(s))}catch{n.push("[value cannot be serialized]")}}return n.join(e)}function Gr(t,e,n=!1){return Vt(t)?uv(e)?e.test(t):Vt(e)?n?t===e:t.includes(e):!1:!1}function Xo(t,e=[],n=!1){return e.some(i=>Gr(t,i,n))}function mv(){const t=W;return t.crypto||t.msCrypto}let Ga;function _v(){return co()*16}function tt(t=mv()){try{if(t?.randomUUID)return Yo(()=>t.randomUUID()).replace(/-/g,"")}catch{}return Ga||(Ga="10000000100040008000"+1e11),Ga.replace(/[018]/g,e=>(e^(_v()&15)>>e/4).toString(16))}function qp(t){return t.exception?.values?.[0]}function Vn(t){const{message:e,event_id:n}=t;if(e)return e;const i=qp(t);return i?i.type&&i.value?`${i.type}: ${i.value}`:i.type||i.value||n||"<unknown>":n||"<unknown>"}function Pc(t,e,n){const i=t.exception=t.exception||{},s=i.values=i.values||[],r=s[0]=s[0]||{};r.value||(r.value=e||""),r.type||(r.type="Error")}function Fi(t,e){const n=qp(t);if(!n)return;const i={type:"generic",handled:!0},s=n.mechanism;if(n.mechanism={...i,...s,...e},e&&"data"in e){const r={...s?.data,...e.data};n.mechanism.data=r}}function Kd(t){if(yv(t))return!0;try{Tn(t,"__sentry_captured__",!0)}catch{}return!1}function yv(t){try{return t.__sentry_captured__}catch{}}const zp=1e3;function pr(){return Jo()/zp}function wv(){const{performance:t}=W;if(!t?.now||!t.timeOrigin)return pr;const e=t.timeOrigin;return()=>(e+Yo(()=>t.now()))/zp}let Yd;function jt(){return(Yd??(Yd=wv()))()}function vv(t){const e=jt(),n={sid:tt(),init:!0,timestamp:e,started:e,duration:0,status:"ok",errors:0,ignoreDuration:!1,toJSON:()=>Ev(n)};return t&&Ui(n,t),n}function Ui(t,e={}){if(e.user&&(!t.ipAddress&&e.user.ip_address&&(t.ipAddress=e.user.ip_address),!t.did&&!e.did&&(t.did=e.user.id||e.user.email||e.user.username)),t.timestamp=e.timestamp||jt(),e.abnormal_mechanism&&(t.abnormal_mechanism=e.abnormal_mechanism),e.ignoreDuration&&(t.ignoreDuration=e.ignoreDuration),e.sid&&(t.sid=e.sid.length===32?e.sid:tt()),e.init!==void 0&&(t.init=e.init),!t.did&&e.did&&(t.did=`${e.did}`),typeof e.started=="number"&&(t.started=e.started),t.ignoreDuration)t.duration=void 0;else if(typeof e.duration=="number")t.duration=e.duration;else{const n=t.timestamp-t.started;t.duration=n>=0?n:0}e.release&&(t.release=e.release),e.environment&&(t.environment=e.environment),!t.ipAddress&&e.ipAddress&&(t.ipAddress=e.ipAddress),!t.userAgent&&e.userAgent&&(t.userAgent=e.userAgent),typeof e.errors=="number"&&(t.errors=e.errors),e.status&&(t.status=e.status)}function bv(t,e){let n={};t.status==="ok"&&(n={status:"exited"}),Ui(t,n)}function Ev(t){return{sid:`${t.sid}`,init:t.init,started:new Date(t.started*1e3).toISOString(),timestamp:new Date(t.timestamp*1e3).toISOString(),status:t.status,errors:t.errors,did:typeof t.did=="number"||typeof t.did=="string"?`${t.did}`:void 0,duration:t.duration,abnormal_mechanism:t.abnormal_mechanism,attrs:{release:t.release,environment:t.environment,ip_address:t.ipAddress,user_agent:t.userAgent}}}function gr(t,e,n=2){if(!e||typeof e!="object"||n<=0)return e;if(t&&Object.keys(e).length===0)return t;const i={...t};for(const s in e)Object.prototype.hasOwnProperty.call(e,s)&&(i[s]=gr(i[s],e[s],n-1));return i}function Jd(){return tt()}function Gp(){return tt().substring(16)}const Lc="_sentrySpan";function Xd(t,e){e?Tn(t,Lc,e):delete t[Lc]}function Qd(t){return t[Lc]}const Cv=100;class zt{constructor(){this._notifyingListeners=!1,this._scopeListeners=[],this._eventProcessors=[],this._breadcrumbs=[],this._attachments=[],this._user={},this._tags={},this._attributes={},this._extra={},this._contexts={},this._sdkProcessingMetadata={},this._propagationContext={traceId:Jd(),sampleRand:co()}}clone(){const e=new zt;return e._breadcrumbs=[...this._breadcrumbs],e._tags={...this._tags},e._attributes={...this._attributes},e._extra={...this._extra},e._contexts={...this._contexts},this._contexts.flags&&(e._contexts.flags={values:[...this._contexts.flags.values]}),e._user=this._user,e._level=this._level,e._session=this._session,e._transactionName=this._transactionName,e._fingerprint=this._fingerprint,e._eventProcessors=[...this._eventProcessors],e._attachments=[...this._attachments],e._sdkProcessingMetadata={...this._sdkProcessingMetadata},e._propagationContext={...this._propagationContext},e._client=this._client,e._lastEventId=this._lastEventId,Xd(e,Qd(this)),e}setClient(e){this._client=e}setLastEventId(e){this._lastEventId=e}getClient(){return this._client}lastEventId(){return this._lastEventId}addScopeListener(e){this._scopeListeners.push(e)}addEventProcessor(e){return this._eventProcessors.push(e),this}setUser(e){return this._user=e||{email:void 0,id:void 0,ip_address:void 0,username:void 0},this._session&&Ui(this._session,{user:e}),this._notifyScopeListeners(),this}getUser(){return this._user}setTags(e){return this._tags={...this._tags,...e},this._notifyScopeListeners(),this}setTag(e,n){return this.setTags({[e]:n})}setAttributes(e){return this._attributes={...this._attributes,...e},this._notifyScopeListeners(),this}setAttribute(e,n){return this.setAttributes({[e]:n})}removeAttribute(e){return e in this._attributes&&(delete this._attributes[e],this._notifyScopeListeners()),this}setExtras(e){return this._extra={...this._extra,...e},this._notifyScopeListeners(),this}setExtra(e,n){return this._extra={...this._extra,[e]:n},this._notifyScopeListeners(),this}setFingerprint(e){return this._fingerprint=e,this._notifyScopeListeners(),this}setLevel(e){return this._level=e,this._notifyScopeListeners(),this}setTransactionName(e){return this._transactionName=e,this._notifyScopeListeners(),this}setContext(e,n){return n===null?delete this._contexts[e]:this._contexts[e]=n,this._notifyScopeListeners(),this}setSession(e){return e?this._session=e:delete this._session,this._notifyScopeListeners(),this}getSession(){return this._session}update(e){if(!e)return this;const n=typeof e=="function"?e(this):e,i=n instanceof zt?n.getScopeData():Vs(n)?e:void 0,{tags:s,attributes:r,extra:o,user:a,contexts:c,level:l,fingerprint:u=[],propagationContext:d}=i||{};return this._tags={...this._tags,...s},this._attributes={...this._attributes,...r},this._extra={...this._extra,...o},this._contexts={...this._contexts,...c},a&&Object.keys(a).length&&(this._user=a),l&&(this._level=l),u.length&&(this._fingerprint=u),d&&(this._propagationContext=d),this}clear(){return this._breadcrumbs=[],this._tags={},this._attributes={},this._extra={},this._user={},this._contexts={},this._level=void 0,this._transactionName=void 0,this._fingerprint=void 0,this._session=void 0,Xd(this,void 0),this._attachments=[],this.setPropagationContext({traceId:Jd(),sampleRand:co()}),this._notifyScopeListeners(),this}addBreadcrumb(e,n){const i=typeof n=="number"?n:Cv;if(i<=0)return this;const s={timestamp:pr(),...e,message:e.message?Nc(e.message,2048):e.message};return this._breadcrumbs.push(s),this._breadcrumbs.length>i&&(this._breadcrumbs=this._breadcrumbs.slice(-i),this._client?.recordDroppedEvent("buffer_overflow","log_item")),this._notifyScopeListeners(),this}getLastBreadcrumb(){return this._breadcrumbs[this._breadcrumbs.length-1]}clearBreadcrumbs(){return this._breadcrumbs=[],this._notifyScopeListeners(),this}addAttachment(e){return this._attachments.push(e),this}clearAttachments(){return this._attachments=[],this}getScopeData(){return{breadcrumbs:this._breadcrumbs,attachments:this._attachments,contexts:this._contexts,tags:this._tags,attributes:this._attributes,extra:this._extra,user:this._user,level:this._level,fingerprint:this._fingerprint||[],eventProcessors:this._eventProcessors,propagationContext:this._propagationContext,sdkProcessingMetadata:this._sdkProcessingMetadata,transactionName:this._transactionName,span:Qd(this)}}setSDKProcessingMetadata(e){return this._sdkProcessingMetadata=gr(this._sdkProcessingMetadata,e,2),this}setPropagationContext(e){return this._propagationContext=e,this}getPropagationContext(){return this._propagationContext}captureException(e,n){const i=n?.event_id||tt();if(!this._client)return L&&I.warn("No client configured on scope - will not capture exception!"),i;const s=new Error("Sentry syntheticException");return this._client.captureException(e,{originalException:e,syntheticException:s,...n,event_id:i},this),i}captureMessage(e,n,i){const s=i?.event_id||tt();if(!this._client)return L&&I.warn("No client configured on scope - will not capture message!"),s;const r=i?.syntheticException??new Error(e);return this._client.captureMessage(e,n,{originalException:e,syntheticException:r,...i,event_id:s},this),s}captureEvent(e,n){const i=n?.event_id||tt();return this._client?(this._client.captureEvent(e,{...n,event_id:i},this),i):(L&&I.warn("No client configured on scope - will not capture event!"),i)}_notifyScopeListeners(){this._notifyingListeners||(this._notifyingListeners=!0,this._scopeListeners.forEach(e=>{e(this)}),this._notifyingListeners=!1)}}function Tv(){return Xi("defaultCurrentScope",()=>new zt)}function Sv(){return Xi("defaultIsolationScope",()=>new zt)}class Iv{constructor(e,n){let i;e?i=e:i=new zt;let s;n?s=n:s=new zt,this._stack=[{scope:i}],this._isolationScope=s}withScope(e){const n=this._pushScope();let i;try{i=e(n)}catch(s){throw this._popScope(),s}return fr(i)?i.then(s=>(this._popScope(),s),s=>{throw this._popScope(),s}):(this._popScope(),i)}getClient(){return this.getStackTop().client}getScope(){return this.getStackTop().scope}getIsolationScope(){return this._isolationScope}getStackTop(){return this._stack[this._stack.length-1]}_pushScope(){const e=this.getScope().clone();return this._stack.push({client:this.getClient(),scope:e}),e}_popScope(){return this._stack.length<=1?!1:!!this._stack.pop()}}function $i(){const t=Wo(),e=qo(t);return e.stack=e.stack||new Iv(Tv(),Sv())}function kv(t){return $i().withScope(t)}function Rv(t,e){const n=$i();return n.withScope(()=>(n.getStackTop().scope=t,e(t)))}function Zd(t){return $i().withScope(()=>t($i().getIsolationScope()))}function Av(){return{withIsolationScope:Zd,withScope:kv,withSetScope:Rv,withSetIsolationScope:(t,e)=>Zd(e),getCurrentScope:()=>$i().getScope(),getIsolationScope:()=>$i().getIsolationScope()}}function Vl(t){const e=qo(t);return e.acs?e.acs:Av()}function Ln(){const t=Wo();return Vl(t).getCurrentScope()}function mr(){const t=Wo();return Vl(t).getIsolationScope()}function Nv(){return Xi("globalScope",()=>new zt)}function Pv(...t){const e=Wo(),n=Vl(e);if(t.length===2){const[i,s]=t;return i?n.withSetScope(i,s):n.withScope(s)}return n.withScope(t[0])}function Oe(){return Ln().getClient()}function Lv(t){const e=t.getPropagationContext(),{traceId:n,parentSpanId:i,propagationSpanId:s}=e,r={trace_id:n,span_id:s||Gp()};return i&&(r.parent_span_id=i),r}const Ov="sentry.source",Dv="sentry.sample_rate",Mv="sentry.previous_trace_sample_rate",xv="sentry.op",Fv="sentry.origin",Kp="sentry.profile_id",Yp="sentry.exclusive_time",Uv=0,$v=1,Bv="_sentryScope",Hv="_sentryIsolationScope";function Vv(t){if(t){if(typeof t=="object"&&"deref"in t&&typeof t.deref=="function")try{return t.deref()}catch{return}return t}}function Jp(t){const e=t;return{scope:e[Bv],isolationScope:Vv(e[Hv])}}const jv="sentry-",Wv=/^sentry-/;function qv(t){const e=zv(t);if(!e)return;const n=Object.entries(e).reduce((i,[s,r])=>{if(s.match(Wv)){const o=s.slice(jv.length);i[o]=r}return i},{});if(Object.keys(n).length>0)return n}function zv(t){if(!(!t||!Vt(t)&&!Array.isArray(t)))return Array.isArray(t)?t.reduce((e,n)=>{const i=eh(n);return Object.entries(i).forEach(([s,r])=>{e[s]=r}),e},{}):eh(t)}function eh(t){return t.split(",").map(e=>{const n=e.indexOf("=");if(n===-1)return[];const i=e.slice(0,n),s=e.slice(n+1);return[i,s].map(r=>{try{return decodeURIComponent(r.trim())}catch{return}})}).reduce((e,[n,i])=>(n&&i&&(e[n]=i),e),{})}const Gv=/^o(\d+)\./,Kv=/^(?:(\w+):)\/\/(?:(\w+)(?::(\w+)?)?@)((?:\[[:.%\w]+\]|[\w.-]+))(?::(\d+))?\/(.+)/;function Yv(t){return t==="http"||t==="https"}function _r(t,e=!1){const{host:n,path:i,pass:s,port:r,projectId:o,protocol:a,publicKey:c}=t;return`${a}://${c}${e&&s?`:${s}`:""}@${n}${r?`:${r}`:""}/${i&&`${i}/`}${o}`}function Jv(t){const e=Kv.exec(t);if(!e){Qi(()=>{console.error(`Invalid Sentry Dsn: ${t}`)});return}const[n,i,s="",r="",o="",a=""]=e.slice(1);let c="",l=a;const u=l.split("/");if(u.length>1&&(c=u.slice(0,-1).join("/"),l=u.pop()),l){const d=l.match(/^\d+/);d&&(l=d[0])}return Xp({host:r,pass:s,path:c,projectId:l,port:o,protocol:n,publicKey:i})}function Xp(t){return{protocol:t.protocol,publicKey:t.publicKey||"",pass:t.pass||"",host:t.host,port:t.port||"",path:t.path||"",projectId:t.projectId}}function Xv(t){if(!L)return!0;const{port:e,projectId:n,protocol:i}=t;return["protocol","publicKey","host","projectId"].find(o=>t[o]?!1:(I.error(`Invalid Sentry Dsn: ${o} missing`),!0))?!1:n.match(/^\d+$/)?Yv(i)?e&&isNaN(parseInt(e,10))?(I.error(`Invalid Sentry Dsn: Invalid port ${e}`),!1):!0:(I.error(`Invalid Sentry Dsn: Invalid protocol ${i}`),!1):(I.error(`Invalid Sentry Dsn: Invalid projectId ${n}`),!1)}function Qv(t){return t.match(Gv)?.[1]}function Zv(t){const e=t.getOptions(),{host:n}=t.getDsn()||{};let i;return e.orgId?i=String(e.orgId):n&&(i=Qv(n)),i}function eb(t){const e=typeof t=="string"?Jv(t):Xp(t);if(!(!e||!Xv(e)))return e}function tb(t){if(typeof t=="boolean")return Number(t);const e=typeof t=="string"?parseFloat(t):t;if(!(typeof e!="number"||isNaN(e)||e<0||e>1))return e}const Qp=1;let th=!1;function nb(t){const{spanId:e,traceId:n,isRemote:i}=t.spanContext(),s=i?e:jl(t).parent_span_id,r=Jp(t).scope,o=i?r?.getPropagationContext().propagationSpanId||Gp():e;return{parent_span_id:s,span_id:o,trace_id:n}}function ib(t){if(t&&t.length>0)return t.map(({context:{spanId:e,traceId:n,traceFlags:i,...s},attributes:r})=>({span_id:e,trace_id:n,sampled:i===Qp,attributes:r,...s}))}function nh(t){return typeof t=="number"?ih(t):Array.isArray(t)?t[0]+t[1]/1e9:t instanceof Date?ih(t.getTime()):jt()}function ih(t){return t>9999999999?t/1e3:t}function jl(t){if(rb(t))return t.getSpanJSON();const{spanId:e,traceId:n}=t.spanContext();if(sb(t)){const{attributes:i,startTime:s,name:r,endTime:o,status:a,links:c}=t,l="parentSpanId"in t?t.parentSpanId:"parentSpanContext"in t?t.parentSpanContext?.spanId:void 0;return{span_id:e,trace_id:n,data:i,description:r,parent_span_id:l,start_timestamp:nh(s),timestamp:nh(o)||void 0,status:ab(a),op:i[xv],origin:i[Fv],links:ib(c)}}return{span_id:e,trace_id:n,start_timestamp:0,data:{}}}function sb(t){const e=t;return!!e.attributes&&!!e.startTime&&!!e.name&&!!e.endTime&&!!e.status}function rb(t){return typeof t.getSpanJSON=="function"}function ob(t){const{traceFlags:e}=t.spanContext();return e===Qp}function ab(t){if(!(!t||t.code===Uv))return t.code===$v?"ok":t.message||"internal_error"}const cb="_sentryRootSpan";function Zp(t){return t[cb]||t}function sh(){th||(Qi(()=>{console.warn("[Sentry] Returning null from `beforeSendSpan` is disallowed. To drop certain spans, configure the respective integrations directly or use `ignoreSpans`.")}),th=!0)}function lb(t){if(typeof __SENTRY_TRACING__=="boolean"&&!__SENTRY_TRACING__)return!1;const e=Oe()?.getOptions();return!!e&&(e.tracesSampleRate!=null||!!e.tracesSampler)}function rh(t){I.log(`Ignoring span ${t.op} - ${t.description} because it matches \`ignoreSpans\`.`)}function oh(t,e){if(!e?.length||!t.description)return!1;for(const n of e){if(db(n)){if(Gr(t.description,n))return L&&rh(t),!0;continue}if(!n.name&&!n.op)continue;const i=n.name?Gr(t.description,n.name):!0,s=n.op?t.op&&Gr(t.op,n.op):!0;if(i&&s)return L&&rh(t),!0}return!1}function ub(t,e){const n=e.parent_span_id,i=e.span_id;if(n)for(const s of t)s.parent_span_id===i&&(s.parent_span_id=n)}function db(t){return typeof t=="string"||t instanceof RegExp}const Wl="production",hb="_frozenDsc";function eg(t,e){const n=e.getOptions(),{publicKey:i}=e.getDsn()||{},s={environment:n.environment||Wl,release:n.release,public_key:i,trace_id:t,org_id:Zv(e)};return e.emit("createDsc",s),s}function fb(t,e){const n=e.getPropagationContext();return n.dsc||eg(n.traceId,t)}function pb(t){const e=Oe();if(!e)return{};const n=Zp(t),i=jl(n),s=i.data,r=n.spanContext().traceState,o=r?.get("sentry.sample_rate")??s[Dv]??s[Mv];function a(p){return(typeof o=="number"||typeof o=="string")&&(p.sample_rate=`${o}`),p}const c=n[hb];if(c)return a(c);const l=r?.get("sentry.dsc"),u=l&&qv(l);if(u)return a(u);const d=eg(t.spanContext().traceId,e),h=s[Ov],f=i.description;return h!=="url"&&f&&(d.transaction=f),lb()&&(d.sampled=String(ob(n)),d.sample_rand=r?.get("sentry.sample_rand")??Jp(n).scope?.getPropagationContext().sampleRand.toString()),a(d),e.emit("createDsc",d,n),d}function Dt(t,e=100,n=1/0){try{return Oc("",t,e,n)}catch(i){return{ERROR:`**non-serializable** (${i})`}}}function tg(t,e=3,n=100*1024){const i=Dt(t,e);return yb(i)>n?tg(t,e-1,n):i}function Oc(t,e,n=1/0,i=1/0,s=wb()){const[r,o]=s;if(e==null||["boolean","string"].includes(typeof e)||typeof e=="number"&&Number.isFinite(e))return e;const a=gb(t,e);if(!a.startsWith("[object "))return a;if(e.__sentry_skip_normalization__)return e;const c=typeof e.__sentry_override_normalization_depth__=="number"?e.__sentry_override_normalization_depth__:n;if(c===0)return a.replace("object ","");if(r(e))return"[Circular ~]";const l=e;if(l&&typeof l.toJSON=="function")try{const f=l.toJSON();return Oc("",f,c-1,i,s)}catch{}const u=Array.isArray(e)?[]:{};let d=0;const h=Wp(e);for(const f in h){if(!Object.prototype.hasOwnProperty.call(h,f))continue;if(d>=i){u[f]="[MaxProperties ~]";break}const p=h[f];u[f]=Oc(f,p,c-1,i,s),d++}return o(e),u}function gb(t,e){try{if(t==="domain"&&e&&typeof e=="object"&&e._events)return"[Domain]";if(t==="domainEmitter")return"[DomainEmitter]";if(typeof global<"u"&&e===global)return"[Global]";if(typeof window<"u"&&e===window)return"[Window]";if(typeof document<"u"&&e===document)return"[Document]";if(Bp(e))return Fp(e);if(dv(e))return"[SyntheticEvent]";if(typeof e=="number"&&!Number.isFinite(e))return`[${e}]`;if(typeof e=="function")return`[Function: ${En(e)}]`;if(typeof e=="symbol")return`[${String(e)}]`;if(typeof e=="bigint")return`[BigInt: ${String(e)}]`;const n=mb(e);return/^HTML(\w*)Element$/.test(n)?`[HTMLElement: ${n}]`:`[object ${n}]`}catch(n){return`**non-serializable** (${n})`}}function mb(t){const e=Object.getPrototypeOf(t);return e?.constructor?e.constructor.name:"null prototype"}function _b(t){return~-encodeURI(t).split(/%..|./).length}function yb(t){return _b(JSON.stringify(t))}function wb(){const t=new WeakSet;function e(i){return t.has(i)?!0:(t.add(i),!1)}function n(i){t.delete(i)}return[e,n]}function es(t,e=[]){return[t,e]}function vb(t,e){const[n,i]=t;return[n,[...i,e]]}function Dc(t,e){const n=t[1];for(const i of n){const s=i[0].type;if(e(i,s))return!0}return!1}function bb(t,e){return Dc(t,(n,i)=>e.includes(i))}function Mc(t){const e=qo(W);return e.encodePolyfill?e.encodePolyfill(t):new TextEncoder().encode(t)}function Eb(t){const[e,n]=t;let i=JSON.stringify(e);function s(r){typeof i=="string"?i=typeof r=="string"?i+r:[Mc(i),r]:i.push(typeof r=="string"?Mc(r):r)}for(const r of n){const[o,a]=r;if(s(`
${JSON.stringify(o)}
`),typeof a=="string"||a instanceof Uint8Array)s(a);else{let c;try{c=JSON.stringify(a)}catch{c=JSON.stringify(Dt(a))}s(c)}}return typeof i=="string"?i:Cb(i)}function Cb(t){const e=t.reduce((s,r)=>s+r.length,0),n=new Uint8Array(e);let i=0;for(const s of t)n.set(s,i),i+=s.length;return n}function Tb(t){const e=typeof t.data=="string"?Mc(t.data):t.data;return[{type:"attachment",length:e.length,filename:t.filename,content_type:t.contentType,attachment_type:t.attachmentType},e]}const Sb={session:"session",sessions:"session",attachment:"attachment",transaction:"transaction",event:"error",client_report:"internal",user_report:"default",profile:"profile",profile_chunk:"profile",replay_event:"replay",replay_recording:"replay",check_in:"monitor",feedback:"feedback",span:"span",raw_security:"security",log:"log_item",metric:"metric",trace_metric:"metric"};function ah(t){return Sb[t]}function ng(t){if(!t?.sdk)return;const{name:e,version:n}=t.sdk;return{name:e,version:n}}function Ib(t,e,n,i){const s=t.sdkProcessingMetadata?.dynamicSamplingContext;return{event_id:t.event_id,sent_at:new Date().toISOString(),...e&&{sdk:e},...!!n&&i&&{dsn:_r(i)},...s&&{trace:s}}}function kb(t,e){if(!e)return t;const n=t.sdk||{};return t.sdk={...n,name:n.name||e.name,version:n.version||e.version,integrations:[...t.sdk?.integrations||[],...e.integrations||[]],packages:[...t.sdk?.packages||[],...e.packages||[]],settings:t.sdk?.settings||e.settings?{...t.sdk?.settings,...e.settings}:void 0},t}function Rb(t,e,n,i){const s=ng(n),r={sent_at:new Date().toISOString(),...s&&{sdk:s},...!!i&&e&&{dsn:_r(e)}},o="aggregates"in t?[{type:"sessions"},t]:[{type:"session"},t.toJSON()];return es(r,[o])}function Ab(t,e,n,i){const s=ng(n),r=t.type&&t.type!=="replay_event"?t.type:"event";kb(t,n?.sdk);const o=Ib(t,s,i,e);return delete t.sdkProcessingMetadata,es(o,[[{type:r},t]])}const Ka=0,ch=1,lh=2;function Qo(t){return new js(e=>{e(t)})}function ql(t){return new js((e,n)=>{n(t)})}class js{constructor(e){this._state=Ka,this._handlers=[],this._runExecutor(e)}then(e,n){return new js((i,s)=>{this._handlers.push([!1,r=>{if(!e)i(r);else try{i(e(r))}catch(o){s(o)}},r=>{if(!n)s(r);else try{i(n(r))}catch(o){s(o)}}]),this._executeHandlers()})}catch(e){return this.then(n=>n,e)}finally(e){return new js((n,i)=>{let s,r;return this.then(o=>{r=!1,s=o,e&&e()},o=>{r=!0,s=o,e&&e()}).then(()=>{if(r){i(s);return}n(s)})})}_executeHandlers(){if(this._state===Ka)return;const e=this._handlers.slice();this._handlers=[],e.forEach(n=>{n[0]||(this._state===ch&&n[1](this._value),this._state===lh&&n[2](this._value),n[0]=!0)})}_runExecutor(e){const n=(r,o)=>{if(this._state===Ka){if(fr(o)){o.then(i,s);return}this._state=r,this._value=o,this._executeHandlers()}},i=r=>{n(ch,r)},s=r=>{n(lh,r)};try{e(i,s)}catch(r){s(r)}}}function Nb(t,e,n,i=0){try{const s=xc(e,n,t,i);return fr(s)?s:Qo(s)}catch(s){return ql(s)}}function xc(t,e,n,i){const s=n[i];if(!t||!s)return t;const r=s({...t},e);return L&&r===null&&I.log(`Event processor "${s.id||"?"}" dropped event`),fr(r)?r.then(o=>xc(o,e,n,i+1)):xc(r,e,n,i+1)}let Un,uh,dh,nn;function Pb(t){const e=W._sentryDebugIds,n=W._debugIds;if(!e&&!n)return{};const i=e?Object.keys(e):[],s=n?Object.keys(n):[];if(nn&&i.length===uh&&s.length===dh)return nn;uh=i.length,dh=s.length,nn={},Un||(Un={});const r=(o,a)=>{for(const c of o){const l=a[c],u=Un?.[c];if(u&&nn&&l)nn[u[0]]=l,Un&&(Un[c]=[u[0],l]);else if(l){const d=t(c);for(let h=d.length-1;h>=0;h--){const p=d[h]?.filename;if(p&&nn&&Un){nn[p]=l,Un[c]=[p,l];break}}}}};return e&&r(i,e),n&&r(s,n),nn}function Lb(t,e){const{fingerprint:n,span:i,breadcrumbs:s,sdkProcessingMetadata:r}=e;Db(t,e),i&&Fb(t,i),Ub(t,n),Mb(t,s),xb(t,r)}function hh(t,e){const{extra:n,tags:i,attributes:s,user:r,contexts:o,level:a,sdkProcessingMetadata:c,breadcrumbs:l,fingerprint:u,eventProcessors:d,attachments:h,propagationContext:f,transactionName:p,span:g}=e;gs(t,"extra",n),gs(t,"tags",i),gs(t,"attributes",s),gs(t,"user",r),gs(t,"contexts",o),t.sdkProcessingMetadata=gr(t.sdkProcessingMetadata,c,2),a&&(t.level=a),p&&(t.transactionName=p),g&&(t.span=g),l.length&&(t.breadcrumbs=[...t.breadcrumbs,...l]),u.length&&(t.fingerprint=[...t.fingerprint,...u]),d.length&&(t.eventProcessors=[...t.eventProcessors,...d]),h.length&&(t.attachments=[...t.attachments,...h]),t.propagationContext={...t.propagationContext,...f}}function gs(t,e,n){t[e]=gr(t[e],n,1)}function Ob(t,e){const n=Nv().getScopeData();return t&&hh(n,t.getScopeData()),e&&hh(n,e.getScopeData()),n}function Db(t,e){const{extra:n,tags:i,user:s,contexts:r,level:o,transactionName:a}=e;Object.keys(n).length&&(t.extra={...n,...t.extra}),Object.keys(i).length&&(t.tags={...i,...t.tags}),Object.keys(s).length&&(t.user={...s,...t.user}),Object.keys(r).length&&(t.contexts={...r,...t.contexts}),o&&(t.level=o),a&&t.type!=="transaction"&&(t.transaction=a)}function Mb(t,e){const n=[...t.breadcrumbs||[],...e];t.breadcrumbs=n.length?n:void 0}function xb(t,e){t.sdkProcessingMetadata={...t.sdkProcessingMetadata,...e}}function Fb(t,e){t.contexts={trace:nb(e),...t.contexts},t.sdkProcessingMetadata={dynamicSamplingContext:pb(e),...t.sdkProcessingMetadata};const n=Zp(e),i=jl(n).description;i&&!t.transaction&&t.type==="transaction"&&(t.transaction=i)}function Ub(t,e){t.fingerprint=t.fingerprint?Array.isArray(t.fingerprint)?t.fingerprint:[t.fingerprint]:[],e&&(t.fingerprint=t.fingerprint.concat(e)),t.fingerprint.length||delete t.fingerprint}function $b(t,e,n,i,s,r){const{normalizeDepth:o=3,normalizeMaxBreadth:a=1e3}=t,c={...e,event_id:e.event_id||n.event_id||tt(),timestamp:e.timestamp||pr()},l=n.integrations||t.integrations.map(m=>m.name);Bb(c,t),jb(c,l),s&&s.emit("applyFrameMetadata",e),e.type===void 0&&Hb(c,t.stackParser);const u=qb(i,n.captureContext);n.mechanism&&Fi(c,n.mechanism);const d=s?s.getEventProcessors():[],h=Ob(r,u),f=[...n.attachments||[],...h.attachments];f.length&&(n.attachments=f),Lb(c,h);const p=[...d,...h.eventProcessors];return Nb(p,c,n).then(m=>(m&&Vb(m),typeof o=="number"&&o>0?Wb(m,o,a):m))}function Bb(t,e){const{environment:n,release:i,dist:s,maxValueLength:r}=e;t.environment=t.environment||n||Wl,!t.release&&i&&(t.release=i),!t.dist&&s&&(t.dist=s);const o=t.request;o?.url&&r&&(o.url=Nc(o.url,r)),r&&t.exception?.values?.forEach(a=>{a.value&&(a.value=Nc(a.value,r))})}function Hb(t,e){const n=Pb(e);t.exception?.values?.forEach(i=>{i.stacktrace?.frames?.forEach(s=>{s.filename&&(s.debug_id=n[s.filename])})})}function Vb(t){const e={};if(t.exception?.values?.forEach(i=>{i.stacktrace?.frames?.forEach(s=>{s.debug_id&&(s.abs_path?e[s.abs_path]=s.debug_id:s.filename&&(e[s.filename]=s.debug_id),delete s.debug_id)})}),Object.keys(e).length===0)return;t.debug_meta=t.debug_meta||{},t.debug_meta.images=t.debug_meta.images||[];const n=t.debug_meta.images;Object.entries(e).forEach(([i,s])=>{n.push({type:"sourcemap",code_file:i,debug_id:s})})}function jb(t,e){e.length>0&&(t.sdk=t.sdk||{},t.sdk.integrations=[...t.sdk.integrations||[],...e])}function Wb(t,e,n){if(!t)return null;const i={...t,...t.breadcrumbs&&{breadcrumbs:t.breadcrumbs.map(s=>({...s,...s.data&&{data:Dt(s.data,e,n)}}))},...t.user&&{user:Dt(t.user,e,n)},...t.contexts&&{contexts:Dt(t.contexts,e,n)},...t.extra&&{extra:Dt(t.extra,e,n)}};return t.contexts?.trace&&i.contexts&&(i.contexts.trace=t.contexts.trace,t.contexts.trace.data&&(i.contexts.trace.data=Dt(t.contexts.trace.data,e,n))),t.spans&&(i.spans=t.spans.map(s=>({...s,...s.data&&{data:Dt(s.data,e,n)}}))),t.contexts?.flags&&i.contexts&&(i.contexts.flags=Dt(t.contexts.flags,3,n)),i}function qb(t,e){if(!e)return t;const n=t?t.clone():new zt;return n.update(e),n}function zb(t,e){return Ln().captureException(t,void 0)}function ig(t,e){return Ln().captureEvent(t,e)}function fh(t){const e=mr(),n=Ln(),{userAgent:i}=W.navigator||{},s=vv({user:n.getUser()||e.getUser(),...i&&{userAgent:i},...t}),r=e.getSession();return r?.status==="ok"&&Ui(r,{status:"exited"}),sg(),e.setSession(s),s}function sg(){const t=mr(),n=Ln().getSession()||t.getSession();n&&bv(n),rg(),t.setSession()}function rg(){const t=mr(),e=Oe(),n=t.getSession();n&&e&&e.captureSession(n)}function ph(t=!1){if(t){sg();return}rg()}const Gb="7";function Kb(t){const e=t.protocol?`${t.protocol}:`:"",n=t.port?`:${t.port}`:"";return`${e}//${t.host}${n}${t.path?`/${t.path}`:""}/api/`}function Yb(t){return`${Kb(t)}${t.projectId}/envelope/`}function Jb(t,e){const n={sentry_version:Gb};return t.publicKey&&(n.sentry_key=t.publicKey),e&&(n.sentry_client=`${e.name}/${e.version}`),new URLSearchParams(n).toString()}function Xb(t,e,n){return e||`${Yb(t)}?${Jb(t,n)}`}const gh=[];function Qb(t){const e={};return t.forEach(n=>{const{name:i}=n,s=e[i];s&&!s.isDefaultInstance&&n.isDefaultInstance||(e[i]=n)}),Object.values(e)}function Zb(t){const e=t.defaultIntegrations||[],n=t.integrations;e.forEach(s=>{s.isDefaultInstance=!0});let i;if(Array.isArray(n))i=[...e,...n];else if(typeof n=="function"){const s=n(e);i=Array.isArray(s)?s:[s]}else i=e;return Qb(i)}function eE(t,e){const n={};return e.forEach(i=>{i&&og(t,i,n)}),n}function mh(t,e){for(const n of e)n?.afterAllSetup&&n.afterAllSetup(t)}function og(t,e,n){if(n[e.name]){L&&I.log(`Integration skipped because it was already installed: ${e.name}`);return}if(n[e.name]=e,!gh.includes(e.name)&&typeof e.setupOnce=="function"&&(e.setupOnce(),gh.push(e.name)),e.setup&&typeof e.setup=="function"&&e.setup(t),typeof e.preprocessEvent=="function"){const i=e.preprocessEvent.bind(e);t.on("preprocessEvent",(s,r)=>i(s,r,t))}if(typeof e.processEvent=="function"){const i=e.processEvent.bind(e),s=Object.assign((r,o)=>i(r,o,t),{id:e.name});t.addEventProcessor(s)}L&&I.log(`Integration installed: ${e.name}`)}function tE(t){return[{type:"log",item_count:t.length,content_type:"application/vnd.sentry.items.log+json"},{items:t}]}function nE(t,e,n,i){const s={};return e?.sdk&&(s.sdk={name:e.sdk.name,version:e.sdk.version}),n&&i&&(s.dsn=_r(i)),es(s,[tE(t)])}function ag(t,e){const n=e??iE(t)??[];if(n.length===0)return;const i=t.getOptions(),s=nE(n,i._metadata,i.tunnel,t.getDsn());cg().set(t,[]),t.emit("flushLogs"),t.sendEnvelope(s)}function iE(t){return cg().get(t)}function cg(){return Xi("clientToLogBufferMap",()=>new WeakMap)}function sE(t){return[{type:"trace_metric",item_count:t.length,content_type:"application/vnd.sentry.items.trace-metric+json"},{items:t}]}function rE(t,e,n,i){const s={};return e?.sdk&&(s.sdk={name:e.sdk.name,version:e.sdk.version}),n&&i&&(s.dsn=_r(i)),es(s,[sE(t)])}function lg(t,e){const n=e??oE(t)??[];if(n.length===0)return;const i=t.getOptions(),s=rE(n,i._metadata,i.tunnel,t.getDsn());ug().set(t,[]),t.emit("flushMetrics"),t.sendEnvelope(s)}function oE(t){return ug().get(t)}function ug(){return Xi("clientToMetricBufferMap",()=>new WeakMap)}const zl=Symbol.for("SentryBufferFullError");function Gl(t=100){const e=new Set;function n(){return e.size<t}function i(o){e.delete(o)}function s(o){if(!n())return ql(zl);const a=o();return e.add(a),a.then(()=>i(a),()=>i(a)),a}function r(o){if(!e.size)return Qo(!0);const a=Promise.allSettled(Array.from(e)).then(()=>!0);if(!o)return a;const c=[a,new Promise(l=>setTimeout(()=>l(!1),o))];return Promise.race(c)}return{get $(){return Array.from(e)},add:s,drain:r}}const aE=60*1e3;function cE(t,e=Jo()){const n=parseInt(`${t}`,10);if(!isNaN(n))return n*1e3;const i=Date.parse(`${t}`);return isNaN(i)?aE:i-e}function lE(t,e){return t[e]||t.all||0}function uE(t,e,n=Jo()){return lE(t,e)>n}function dE(t,{statusCode:e,headers:n},i=Jo()){const s={...t},r=n?.["x-sentry-rate-limits"],o=n?.["retry-after"];if(r)for(const a of r.trim().split(",")){const[c,l,,,u]=a.split(":",5),d=parseInt(c,10),h=(isNaN(d)?60:d)*1e3;if(!l)s.all=i+h;else for(const f of l.split(";"))f==="metric_bucket"?(!u||u.split(";").includes("custom"))&&(s[f]=i+h):s[f]=i+h}else o?s.all=i+cE(o,i):e===429&&(s.all=i+60*1e3);return s}const dg=64;function hE(t,e,n=Gl(t.bufferSize||dg)){let i={};const s=o=>n.drain(o);function r(o){const a=[];if(Dc(o,(d,h)=>{const f=ah(h);uE(i,f)?t.recordDroppedEvent("ratelimit_backoff",f):a.push(d)}),a.length===0)return Promise.resolve({});const c=es(o[0],a),l=d=>{if(bb(c,["client_report"])){L&&I.warn(`Dropping client report. Will not send outcomes (reason: ${d}).`);return}Dc(c,(h,f)=>{t.recordDroppedEvent(d,ah(f))})},u=()=>e({body:Eb(c)}).then(d=>(d.statusCode!==void 0&&(d.statusCode<200||d.statusCode>=300)&&L&&I.warn(`Sentry responded with status code ${d.statusCode} to sent event.`),i=dE(i,d),d),d=>{throw l("network_error"),L&&I.error("Encountered error running transport request:",d),d});return n.add(u).then(d=>d,d=>{if(d===zl)return L&&I.error("Skipped sending event because buffer is full."),l("queue_overflow"),Promise.resolve({});throw d})}return{send:r,flush:s}}function fE(t,e,n){const i=[{type:"client_report"},{timestamp:pr(),discarded_events:t}];return es(e?{dsn:e}:{},[i])}function hg(t){const e=[];t.message&&e.push(t.message);try{const n=t.exception.values[t.exception.values.length-1];n?.value&&(e.push(n.value),n.type&&e.push(`${n.type}: ${n.value}`))}catch{}return e}function pE(t){const{trace_id:e,parent_span_id:n,span_id:i,status:s,origin:r,data:o,op:a}=t.contexts?.trace??{};return{data:o??{},description:t.transaction,op:a,parent_span_id:n,span_id:i??"",start_timestamp:t.start_timestamp??0,status:s,timestamp:t.timestamp,trace_id:e??"",origin:r,profile_id:o?.[Kp],exclusive_time:o?.[Yp],measurements:t.measurements,is_segment:!0}}function gE(t){return{type:"transaction",timestamp:t.timestamp,start_timestamp:t.start_timestamp,transaction:t.description,contexts:{trace:{trace_id:t.trace_id,span_id:t.span_id,parent_span_id:t.parent_span_id,op:t.op,status:t.status,origin:t.origin,data:{...t.data,...t.profile_id&&{[Kp]:t.profile_id},...t.exclusive_time&&{[Yp]:t.exclusive_time}}}},measurements:t.measurements}}const _h="Not capturing exception because it's already been captured.",yh="Discarded session because of missing or non-string release",fg=Symbol.for("SentryInternalError"),pg=Symbol.for("SentryDoNotSendEventError"),mE=5e3;function Kr(t){return{message:t,[fg]:!0}}function Ya(t){return{message:t,[pg]:!0}}function wh(t){return!!t&&typeof t=="object"&&fg in t}function vh(t){return!!t&&typeof t=="object"&&pg in t}function bh(t,e,n,i,s){let r=0,o,a=!1;t.on(n,()=>{r=0,clearTimeout(o),a=!1}),t.on(e,c=>{r+=i(c),r>=8e5?s(t):a||(a=!0,o=setTimeout(()=>{s(t)},mE))}),t.on("flush",()=>{s(t)})}class _E{constructor(e){if(this._options=e,this._integrations={},this._numProcessing=0,this._outcomes={},this._hooks={},this._eventProcessors=[],this._promiseBuffer=Gl(e.transportOptions?.bufferSize??dg),e.dsn?this._dsn=eb(e.dsn):L&&I.warn("No DSN provided, client will not send events."),this._dsn){const i=Xb(this._dsn,e.tunnel,e._metadata?e._metadata.sdk:void 0);this._transport=e.transport({tunnel:this._options.tunnel,recordDroppedEvent:this.recordDroppedEvent.bind(this),...e.transportOptions,url:i})}this._options.enableLogs=this._options.enableLogs??this._options._experiments?.enableLogs,this._options.enableLogs&&bh(this,"afterCaptureLog","flushLogs",bE,ag),(this._options.enableMetrics??this._options._experiments?.enableMetrics??!0)&&bh(this,"afterCaptureMetric","flushMetrics",vE,lg)}captureException(e,n,i){const s=tt();if(Kd(e))return L&&I.log(_h),s;const r={event_id:s,...n};return this._process(()=>this.eventFromException(e,r).then(o=>this._captureEvent(o,r,i)).then(o=>o),"error"),r.event_id}captureMessage(e,n,i,s){const r={event_id:tt(),...i},o=Ul(e)?e:String(e),a=Go(e),c=a?this.eventFromMessage(o,n,r):this.eventFromException(e,r);return this._process(()=>c.then(l=>this._captureEvent(l,r,s)),a?"unknown":"error"),r.event_id}captureEvent(e,n,i){const s=tt();if(n?.originalException&&Kd(n.originalException))return L&&I.log(_h),s;const r={event_id:s,...n},o=e.sdkProcessingMetadata||{},a=o.capturedSpanScope,c=o.capturedSpanIsolationScope,l=Eh(e.type);return this._process(()=>this._captureEvent(e,r,a||i,c),l),r.event_id}captureSession(e){this.sendSession(e),Ui(e,{init:!1})}getDsn(){return this._dsn}getOptions(){return this._options}getSdkMetadata(){return this._options._metadata}getTransport(){return this._transport}async flush(e){const n=this._transport;if(!n)return!0;this.emit("flush");const i=await this._isClientDoneProcessing(e),s=await n.flush(e);return i&&s}async close(e){const n=await this.flush(e);return this.getOptions().enabled=!1,this.emit("close"),n}getEventProcessors(){return this._eventProcessors}addEventProcessor(e){this._eventProcessors.push(e)}init(){(this._isEnabled()||this._options.integrations.some(({name:e})=>e.startsWith("Spotlight")))&&this._setupIntegrations()}getIntegrationByName(e){return this._integrations[e]}addIntegration(e){const n=this._integrations[e.name];og(this,e,this._integrations),n||mh(this,[e])}sendEvent(e,n={}){this.emit("beforeSendEvent",e,n);let i=Ab(e,this._dsn,this._options._metadata,this._options.tunnel);for(const s of n.attachments||[])i=vb(i,Tb(s));this.sendEnvelope(i).then(s=>this.emit("afterSendEvent",e,s))}sendSession(e){const{release:n,environment:i=Wl}=this._options;if("aggregates"in e){const r=e.attrs||{};if(!r.release&&!n){L&&I.warn(yh);return}r.release=r.release||n,r.environment=r.environment||i,e.attrs=r}else{if(!e.release&&!n){L&&I.warn(yh);return}e.release=e.release||n,e.environment=e.environment||i}this.emit("beforeSendSession",e);const s=Rb(e,this._dsn,this._options._metadata,this._options.tunnel);this.sendEnvelope(s)}recordDroppedEvent(e,n,i=1){if(this._options.sendClientReports){const s=`${e}:${n}`;L&&I.log(`Recording outcome: "${s}"${i>1?` (${i} times)`:""}`),this._outcomes[s]=(this._outcomes[s]||0)+i}}on(e,n){const i=this._hooks[e]=this._hooks[e]||new Set,s=(...r)=>n(...r);return i.add(s),()=>{i.delete(s)}}emit(e,...n){const i=this._hooks[e];i&&i.forEach(s=>s(...n))}async sendEnvelope(e){if(this.emit("beforeEnvelope",e),this._isEnabled()&&this._transport)try{return await this._transport.send(e)}catch(n){return L&&I.error("Error while sending envelope:",n),{}}return L&&I.error("Transport disabled"),{}}_setupIntegrations(){const{integrations:e}=this._options;this._integrations=eE(this,e),mh(this,e)}_updateSessionFromEvent(e,n){let i=n.level==="fatal",s=!1;const r=n.exception?.values;if(r){s=!0,i=!1;for(const c of r)if(c.mechanism?.handled===!1){i=!0;break}}const o=e.status==="ok";(o&&e.errors===0||o&&i)&&(Ui(e,{...i&&{status:"crashed"},errors:e.errors||Number(s||i)}),this.captureSession(e))}async _isClientDoneProcessing(e){let n=0;for(;!e||n<e;){if(await new Promise(i=>setTimeout(i,1)),!this._numProcessing)return!0;n++}return!1}_isEnabled(){return this.getOptions().enabled!==!1&&this._transport!==void 0}_prepareEvent(e,n,i,s){const r=this.getOptions(),o=Object.keys(this._integrations);return!n.integrations&&o?.length&&(n.integrations=o),this.emit("preprocessEvent",e,n),e.type||s.setLastEventId(e.event_id||n.event_id),$b(r,e,n,i,this,s).then(a=>{if(a===null)return a;this.emit("postprocessEvent",a,n),a.contexts={trace:Lv(i),...a.contexts};const c=fb(this,i);return a.sdkProcessingMetadata={dynamicSamplingContext:c,...a.sdkProcessingMetadata},a})}_captureEvent(e,n={},i=Ln(),s=mr()){return L&&Fc(e)&&I.log(`Captured error event \`${hg(e)[0]||"<unknown>"}\``),this._processEvent(e,n,i,s).then(r=>r.event_id,r=>{L&&(vh(r)?I.log(r.message):wh(r)?I.warn(r.message):I.warn(r))})}_processEvent(e,n,i,s){const r=this.getOptions(),{sampleRate:o}=r,a=gg(e),c=Fc(e),u=`before send for type \`${e.type||"error"}\``,d=typeof o>"u"?void 0:tb(o);if(c&&typeof d=="number"&&co()>d)return this.recordDroppedEvent("sample_rate","error"),ql(Ya(`Discarding event because it's not included in the random sample (sampling rate = ${o})`));const h=Eh(e.type);return this._prepareEvent(e,n,i,s).then(f=>{if(f===null)throw this.recordDroppedEvent("event_processor",h),Ya("An event processor returned `null`, will not send event.");if(n.data&&n.data.__sentry__===!0)return f;const g=wE(this,r,f,n);return yE(g,u)}).then(f=>{if(f===null){if(this.recordDroppedEvent("before_send",h),a){const T=1+(e.spans||[]).length;this.recordDroppedEvent("before_send","span",T)}throw Ya(`${u} returned \`null\`, will not send event.`)}const p=i.getSession()||s.getSession();if(c&&p&&this._updateSessionFromEvent(p,f),a){const m=f.sdkProcessingMetadata?.spanCountBeforeProcessing||0,T=f.spans?f.spans.length:0,P=m-T;P>0&&this.recordDroppedEvent("before_send","span",P)}const g=f.transaction_info;if(a&&g&&f.transaction!==e.transaction){const m="custom";f.transaction_info={...g,source:m}}return this.sendEvent(f,n),f}).then(null,f=>{throw vh(f)||wh(f)?f:(this.captureException(f,{mechanism:{handled:!1,type:"internal"},data:{__sentry__:!0},originalException:f}),Kr(`Event processing pipeline threw an error, original event will not be sent. Details have been sent as a new event.
Reason: ${f}`))})}_process(e,n){this._numProcessing++,this._promiseBuffer.add(e).then(i=>(this._numProcessing--,i),i=>(this._numProcessing--,i===zl&&this.recordDroppedEvent("queue_overflow",n),i))}_clearOutcomes(){const e=this._outcomes;return this._outcomes={},Object.entries(e).map(([n,i])=>{const[s,r]=n.split(":");return{reason:s,category:r,quantity:i}})}_flushOutcomes(){L&&I.log("Flushing outcomes...");const e=this._clearOutcomes();if(e.length===0){L&&I.log("No outcomes to send");return}if(!this._dsn){L&&I.log("No dsn provided, will not send outcomes");return}L&&I.log("Sending outcomes:",e);const n=fE(e,this._options.tunnel&&_r(this._dsn));this.sendEnvelope(n)}}function Eh(t){return t==="replay_event"?"replay":t||"error"}function yE(t,e){const n=`${e} must return \`null\` or a valid event.`;if(fr(t))return t.then(i=>{if(!Vs(i)&&i!==null)throw Kr(n);return i},i=>{throw Kr(`${e} rejected with ${i}`)});if(!Vs(t)&&t!==null)throw Kr(n);return t}function wE(t,e,n,i){const{beforeSend:s,beforeSendTransaction:r,beforeSendSpan:o,ignoreSpans:a}=e;let c=n;if(Fc(c)&&s)return s(c,i);if(gg(c)){if(o||a){const l=pE(c);if(a?.length&&oh(l,a))return null;if(o){const u=o(l);u?c=gr(n,gE(u)):sh()}if(c.spans){const u=[],d=c.spans;for(const f of d){if(a?.length&&oh(f,a)){ub(d,f);continue}if(o){const p=o(f);p?u.push(p):(sh(),u.push(f))}else u.push(f)}const h=c.spans.length-u.length;h&&t.recordDroppedEvent("before_send","span",h),c.spans=u}}if(r){if(c.spans){const l=c.spans.length;c.sdkProcessingMetadata={...n.sdkProcessingMetadata,spanCountBeforeProcessing:l}}return r(c,i)}}return c}function Fc(t){return t.type===void 0}function gg(t){return t.type==="transaction"}function vE(t){let e=0;return t.name&&(e+=t.name.length*2),e+=8,e+mg(t.attributes)}function bE(t){let e=0;return t.message&&(e+=t.message.length*2),e+mg(t.attributes)}function mg(t){if(!t)return 0;let e=0;return Object.values(t).forEach(n=>{Array.isArray(n)?e+=n.length*Ch(n[0]):Go(n)?e+=Ch(n):e+=100}),e}function Ch(t){return typeof t=="string"?t.length*2:typeof t=="number"?8:typeof t=="boolean"?4:0}function EE(t){return zo(t)&&"__sentry_fetch_url_host__"in t&&typeof t.__sentry_fetch_url_host__=="string"}function Th(t){return EE(t)?`${t.message} (${t.__sentry_fetch_url_host__})`:t.message}function CE(t,e){e.debug===!0&&(L?I.enable():Qi(()=>{console.warn("[Sentry] Cannot initialize SDK with `debug` option using a non-debug bundle.")})),Ln().update(e.initialScope);const i=new t(e);return TE(i),i.init(),i}function TE(t){Ln().setClient(t)}function Ja(t){if(!t)return{};const e=t.match(/^(([^:/?#]+):)?(\/\/([^/?#]*))?([^?#]*)(\?([^#]*))?(#(.*))?$/);if(!e)return{};const n=e[6]||"",i=e[8]||"";return{host:e[4],path:e[5],protocol:e[2],search:n,hash:i,relative:e[5]+n+i}}function SE(t,e=!0){if(t.startsWith("data:")){const n=t.match(/^data:([^;,]+)/),i=n?n[1]:"text/plain",s=t.includes(";base64,"),r=t.indexOf(",");let o="";if(e&&r!==-1){const a=t.slice(r+1);o=a.length>10?`${a.slice(0,10)}... [truncated]`:a}return`data:${i}${s?",base64":""}${o?`,${o}`:""}`}return t}function IE(t){"aggregates"in t?t.attrs?.ip_address===void 0&&(t.attrs={...t.attrs,ip_address:"{{auto}}"}):t.ipAddress===void 0&&(t.ipAddress="{{auto}}")}function kE(t,e,n=[e],i="npm"){const s=t._metadata||{};s.sdk||(s.sdk={name:`sentry.javascript.${e}`,packages:n.map(r=>({name:`${i}:@sentry/${r}`,version:zn})),version:zn}),t._metadata=s}const RE=100;function Zn(t,e){const n=Oe(),i=mr();if(!n)return;const{beforeBreadcrumb:s=null,maxBreadcrumbs:r=RE}=n.getOptions();if(r<=0)return;const a={timestamp:pr(),...t},c=s?Qi(()=>s(a,e)):a;c!==null&&(n.emit&&n.emit("beforeAddBreadcrumb",c,e),i.addBreadcrumb(c,r))}let Sh;const AE="FunctionToString",Ih=new WeakMap,NE=(()=>({name:AE,setupOnce(){Sh=Function.prototype.toString;try{Function.prototype.toString=function(...t){const e=Hl(this),n=Ih.has(Oe())&&e!==void 0?e:this;return Sh.apply(n,t)}}catch{}},setup(t){Ih.set(t,!0)}})),PE=NE,LE=[/^Script error\.?$/,/^Javascript error: Script error\.? on line 0$/,/^ResizeObserver loop completed with undelivered notifications.$/,/^Cannot redefine property: googletag$/,/^Can't find variable: gmo$/,/^undefined is not an object \(evaluating 'a\.[A-Z]'\)$/,`can't redefine non-configurable property "solana"`,"vv().getRestrictions is not a function. (In 'vv().getRestrictions(1,a)', 'vv().getRestrictions' is undefined)","Can't find variable: _AutofillCallbackHandler",/^Non-Error promise rejection captured with value: Object Not Found Matching Id:\d+, MethodName:simulateEvent, ParamCount:\d+$/,/^Java exception was raised during method invocation$/],OE="EventFilters",DE=(t={})=>{let e;return{name:OE,setup(n){const i=n.getOptions();e=kh(t,i)},processEvent(n,i,s){if(!e){const r=s.getOptions();e=kh(t,r)}return xE(n,e)?null:n}}},ME=((t={})=>({...DE(t),name:"InboundFilters"}));function kh(t={},e={}){return{allowUrls:[...t.allowUrls||[],...e.allowUrls||[]],denyUrls:[...t.denyUrls||[],...e.denyUrls||[]],ignoreErrors:[...t.ignoreErrors||[],...e.ignoreErrors||[],...t.disableErrorDefaults?[]:LE],ignoreTransactions:[...t.ignoreTransactions||[],...e.ignoreTransactions||[]]}}function xE(t,e){if(t.type){if(t.type==="transaction"&&UE(t,e.ignoreTransactions))return L&&I.warn(`Event dropped due to being matched by \`ignoreTransactions\` option.
Event: ${Vn(t)}`),!0}else{if(FE(t,e.ignoreErrors))return L&&I.warn(`Event dropped due to being matched by \`ignoreErrors\` option.
Event: ${Vn(t)}`),!0;if(VE(t))return L&&I.warn(`Event dropped due to not having an error message, error type or stacktrace.
Event: ${Vn(t)}`),!0;if($E(t,e.denyUrls))return L&&I.warn(`Event dropped due to being matched by \`denyUrls\` option.
Event: ${Vn(t)}.
Url: ${lo(t)}`),!0;if(!BE(t,e.allowUrls))return L&&I.warn(`Event dropped due to not being matched by \`allowUrls\` option.
Event: ${Vn(t)}.
Url: ${lo(t)}`),!0}return!1}function FE(t,e){return e?.length?hg(t).some(n=>Xo(n,e)):!1}function UE(t,e){if(!e?.length)return!1;const n=t.transaction;return n?Xo(n,e):!1}function $E(t,e){if(!e?.length)return!1;const n=lo(t);return n?Xo(n,e):!1}function BE(t,e){if(!e?.length)return!0;const n=lo(t);return n?Xo(n,e):!0}function HE(t=[]){for(let e=t.length-1;e>=0;e--){const n=t[e];if(n&&n.filename!=="<anonymous>"&&n.filename!=="[native code]")return n.filename||null}return null}function lo(t){try{const n=[...t.exception?.values??[]].reverse().find(i=>i.mechanism?.parent_id===void 0&&i.stacktrace?.frames?.length)?.stacktrace?.frames;return n?HE(n):null}catch{return L&&I.error(`Cannot extract url for event ${Vn(t)}`),null}}function VE(t){return t.exception?.values?.length?!t.message&&!t.exception.values.some(e=>e.stacktrace||e.type&&e.type!=="Error"||e.value):!1}function jE(t,e,n,i,s,r){if(!s.exception?.values||!r||!Cn(r.originalException,Error))return;const o=s.exception.values.length>0?s.exception.values[s.exception.values.length-1]:void 0;o&&(s.exception.values=Uc(t,e,i,r.originalException,n,s.exception.values,o,0))}function Uc(t,e,n,i,s,r,o,a){if(r.length>=n+1)return r;let c=[...r];if(Cn(i[s],Error)){Rh(o,a);const l=t(e,i[s]),u=c.length;Ah(l,s,u,a),c=Uc(t,e,n,i[s],s,[l,...c],l,u)}return Array.isArray(i.errors)&&i.errors.forEach((l,u)=>{if(Cn(l,Error)){Rh(o,a);const d=t(e,l),h=c.length;Ah(d,`errors[${u}]`,h,a),c=Uc(t,e,n,l,s,[d,...c],d,h)}}),c}function Rh(t,e){t.mechanism={handled:!0,type:"auto.core.linked_errors",...t.mechanism,...t.type==="AggregateError"&&{is_exception_group:!0},exception_id:e}}function Ah(t,e,n,i){t.mechanism={handled:!0,...t.mechanism,type:"chained",source:e,exception_id:n,parent_id:i}}function WE(t){const e="console";fi(e,t),pi(e,qE)}function qE(){"console"in W&&Yw.forEach(function(t){t in W.console&&Ge(W.console,t,function(e){return ao[t]=e,function(...n){ft("console",{args:n,level:t}),ao[t]?.apply(W.console,n)}})})}function zE(t){return t==="warn"?"warning":["fatal","error","warning","log","info","debug"].includes(t)?t:"log"}const GE="Dedupe",KE=(()=>{let t;return{name:GE,processEvent(e){if(e.type)return e;try{if(JE(e,t))return L&&I.warn("Event dropped due to being a duplicate of previously captured event."),null}catch{}return t=e}}}),YE=KE;function JE(t,e){return e?!!(XE(t,e)||QE(t,e)):!1}function XE(t,e){const n=t.message,i=e.message;return!(!n&&!i||n&&!i||!n&&i||n!==i||!yg(t,e)||!_g(t,e))}function QE(t,e){const n=Nh(e),i=Nh(t);return!(!n||!i||n.type!==i.type||n.value!==i.value||!yg(t,e)||!_g(t,e))}function _g(t,e){let n=Vd(t),i=Vd(e);if(!n&&!i)return!0;if(n&&!i||!n&&i||(n=n,i=i,i.length!==n.length))return!1;for(let s=0;s<i.length;s++){const r=i[s],o=n[s];if(r.filename!==o.filename||r.lineno!==o.lineno||r.colno!==o.colno||r.function!==o.function)return!1}return!0}function yg(t,e){let n=t.fingerprint,i=e.fingerprint;if(!n&&!i)return!0;if(n&&!i||!n&&i)return!1;n=n,i=i;try{return n.join("")===i.join("")}catch{return!1}}function Nh(t){return t.exception?.values?.[0]}function wg(t){if(t!==void 0)return t>=400&&t<500?"warning":t>=500?"error":void 0}const Ws=W;function ZE(){return"history"in Ws&&!!Ws.history}function eC(){if(!("fetch"in Ws))return!1;try{return new Headers,new Request("data:,"),new Response,!0}catch{return!1}}function $c(t){return t&&/^function\s+\w+\(\)\s+\{\s+\[native code\]\s+\}$/.test(t.toString())}function tC(){if(typeof EdgeRuntime=="string")return!0;if(!eC())return!1;if($c(Ws.fetch))return!0;let t=!1;const e=Ws.document;if(e&&typeof e.createElement=="function")try{const n=e.createElement("iframe");n.hidden=!0,e.head.appendChild(n),n.contentWindow?.fetch&&(t=$c(n.contentWindow.fetch)),e.head.removeChild(n)}catch(n){L&&I.warn("Could not create sandbox iframe for pure fetch check, bailing to window.fetch: ",n)}return t}function nC(t,e){const n="fetch";fi(n,t),pi(n,()=>iC(void 0,e))}function iC(t,e=!1){e&&!tC()||Ge(W,"fetch",function(n){return function(...i){const s=new Error,{method:r,url:o}=sC(i),a={args:i,fetchData:{method:r,url:o},startTimestamp:jt()*1e3,virtualError:s,headers:rC(i)};return ft("fetch",{...a}),n.apply(W,i).then(async c=>(ft("fetch",{...a,endTimestamp:jt()*1e3,response:c}),c),c=>{ft("fetch",{...a,endTimestamp:jt()*1e3,error:c}),zo(c)&&c.stack===void 0&&(c.stack=s.stack,Tn(c,"framesToPop",1));const u=Oe()?.getOptions().enhanceFetchErrorMessages??"always";if(u!==!1&&c instanceof TypeError&&(c.message==="Failed to fetch"||c.message==="Load failed"||c.message==="NetworkError when attempting to fetch resource."))try{const f=new URL(a.fetchData.url).host;u==="always"?c.message=`${c.message} (${f})`:Tn(c,"__sentry_fetch_url_host__",f)}catch{}throw c})}})}function Yr(t,e){return!!t&&typeof t=="object"&&!!t[e]}function Ph(t){return typeof t=="string"?t:t?Yr(t,"url")?t.url:t.toString?t.toString():"":""}function sC(t){if(t.length===0)return{method:"GET",url:""};if(t.length===2){const[n,i]=t;return{url:Ph(n),method:Yr(i,"method")?String(i.method).toUpperCase():Hp(n)&&Yr(n,"method")?String(n.method).toUpperCase():"GET"}}const e=t[0];return{url:Ph(e),method:Yr(e,"method")?String(e.method).toUpperCase():"GET"}}function rC(t){const[e,n]=t;try{if(typeof n=="object"&&n!==null&&"headers"in n&&n.headers)return new Headers(n.headers);if(Hp(e))return new Headers(e.headers)}catch{}}function oC(){return"npm"}const de=W;let Bc=0;function vg(){return Bc>0}function aC(){Bc++,setTimeout(()=>{Bc--})}function Bi(t,e={}){function n(s){return typeof s=="function"}if(!n(t))return t;try{const s=t.__sentry_wrapped__;if(s)return typeof s=="function"?s:t;if(Hl(t))return t}catch{return t}const i=function(...s){try{const r=s.map(o=>Bi(o,e));return t.apply(this,r)}catch(r){throw aC(),Pv(o=>{o.addEventProcessor(a=>(e.mechanism&&(Pc(a,void 0),Fi(a,e.mechanism)),a.extra={...a.extra,arguments:s},a)),zb(r)}),r}};try{for(const s in t)Object.prototype.hasOwnProperty.call(t,s)&&(i[s]=t[s])}catch{}jp(i,t),Tn(t,"__sentry_wrapped__",i);try{Object.getOwnPropertyDescriptor(i,"name").configurable&&Object.defineProperty(i,"name",{get(){return t.name}})}catch{}return i}function cC(){const t=Bl(),{referrer:e}=de.document||{},{userAgent:n}=de.navigator||{},i={...e&&{Referer:e},...n&&{"User-Agent":n}};return{url:t,headers:i}}function Kl(t,e){const n=Yl(t,e),i={type:fC(e),value:pC(e)};return n.length&&(i.stacktrace={frames:n}),i.type===void 0&&i.value===""&&(i.value="Unrecoverable error caught"),i}function lC(t,e,n,i){const r=Oe()?.getOptions().normalizeDepth,o=wC(e),a={__serialized__:tg(e,r)};if(o)return{exception:{values:[Kl(t,o)]},extra:a};const c={exception:{values:[{type:Ko(e)?e.constructor.name:i?"UnhandledRejection":"Error",value:_C(e,{isUnhandledRejection:i})}]},extra:a};if(n){const l=Yl(t,n);l.length&&(c.exception.values[0].stacktrace={frames:l})}return c}function Xa(t,e){return{exception:{values:[Kl(t,e)]}}}function Yl(t,e){const n=e.stacktrace||e.stack||"",i=dC(e),s=hC(e);try{return t(n,i,s)}catch{}return[]}const uC=/Minified React error #\d+;/i;function dC(t){return t&&uC.test(t.message)?1:0}function hC(t){return typeof t.framesToPop=="number"?t.framesToPop:0}function bg(t){return typeof WebAssembly<"u"&&typeof WebAssembly.Exception<"u"?t instanceof WebAssembly.Exception:!1}function fC(t){const e=t?.name;return!e&&bg(t)?t.message&&Array.isArray(t.message)&&t.message.length==2?t.message[0]:"WebAssembly.Exception":e}function pC(t){const e=t?.message;return bg(t)?Array.isArray(t.message)&&t.message.length==2?t.message[1]:"wasm exception":e?e.error&&typeof e.error.message=="string"?Th(e.error):Th(t):"No error message"}function gC(t,e,n,i){const s=n?.syntheticException||void 0,r=Jl(t,e,s,i);return Fi(r),r.level="error",n?.event_id&&(r.event_id=n.event_id),Qo(r)}function mC(t,e,n="info",i,s){const r=i?.syntheticException||void 0,o=Hc(t,e,r,s);return o.level=n,i?.event_id&&(o.event_id=i.event_id),Qo(o)}function Jl(t,e,n,i,s){let r;if($p(e)&&e.error)return Xa(t,e.error);if(Wd(e)||cv(e)){const o=e;if("stack"in e)r=Xa(t,e);else{const a=o.name||(Wd(o)?"DOMError":"DOMException"),c=o.message?`${a}: ${o.message}`:a;r=Hc(t,c,n,i),Pc(r,c)}return"code"in o&&(r.tags={...r.tags,"DOMException.code":`${o.code}`}),r}return zo(e)?Xa(t,e):Vs(e)||Ko(e)?(r=lC(t,e,n,s),Fi(r,{synthetic:!0}),r):(r=Hc(t,e,n,i),Pc(r,`${e}`),Fi(r,{synthetic:!0}),r)}function Hc(t,e,n,i){const s={};if(i&&n){const r=Yl(t,n);r.length&&(s.exception={values:[{value:e,stacktrace:{frames:r}}]}),Fi(s,{synthetic:!0})}if(Ul(e)){const{__sentry_template_string__:r,__sentry_template_values__:o}=e;return s.logentry={message:r,params:o},s}return s.message=e,s}function _C(t,{isUnhandledRejection:e}){const n=gv(t),i=e?"promise rejection":"exception";return $p(t)?`Event \`ErrorEvent\` captured as ${i} with message \`${t.message}\``:Ko(t)?`Event \`${yC(t)}\` (type=${t.type}) captured as ${i}`:`Object captured as ${i} with keys: ${n}`}function yC(t){try{const e=Object.getPrototypeOf(t);return e?e.constructor.name:void 0}catch{}}function wC(t){for(const e in t)if(Object.prototype.hasOwnProperty.call(t,e)){const n=t[e];if(n instanceof Error)return n}}class vC extends _E{constructor(e){const n=bC(e),i=de.SENTRY_SDK_SOURCE||oC();kE(n,"browser",["browser"],i),n._metadata?.sdk&&(n._metadata.sdk.settings={infer_ip:n.sendDefaultPii?"auto":"never",...n._metadata.sdk.settings}),super(n);const{sendDefaultPii:s,sendClientReports:r,enableLogs:o,_experiments:a,enableMetrics:c}=this._options,l=c??a?.enableMetrics??!0;de.document&&(r||o||l)&&de.document.addEventListener("visibilitychange",()=>{de.document.visibilityState==="hidden"&&(r&&this._flushOutcomes(),o&&ag(this),l&&lg(this))}),s&&this.on("beforeSendSession",IE)}eventFromException(e,n){return gC(this._options.stackParser,e,n,this._options.attachStacktrace)}eventFromMessage(e,n="info",i){return mC(this._options.stackParser,e,n,i,this._options.attachStacktrace)}_prepareEvent(e,n,i,s){return e.platform=e.platform||"javascript",super._prepareEvent(e,n,i,s)}}function bC(t){return{release:typeof __SENTRY_RELEASE__=="string"?__SENTRY_RELEASE__:de.SENTRY_RELEASE?.id,sendClientReports:!0,parentSpanIsAlwaysRootSpan:!0,...t}}const EC=typeof __SENTRY_DEBUG__>"u"||__SENTRY_DEBUG__,xe=W,CC=1e3;let Lh,Vc,jc;function TC(t){fi("dom",t),pi("dom",SC)}function SC(){if(!xe.document)return;const t=ft.bind(null,"dom"),e=Oh(t,!0);xe.document.addEventListener("click",e,!1),xe.document.addEventListener("keypress",e,!1),["EventTarget","Node"].forEach(n=>{const s=xe[n]?.prototype;s?.hasOwnProperty?.("addEventListener")&&(Ge(s,"addEventListener",function(r){return function(o,a,c){if(o==="click"||o=="keypress")try{const l=this.__sentry_instrumentation_handlers__=this.__sentry_instrumentation_handlers__||{},u=l[o]=l[o]||{refCount:0};if(!u.handler){const d=Oh(t);u.handler=d,r.call(this,o,d,c)}u.refCount++}catch{}return r.call(this,o,a,c)}}),Ge(s,"removeEventListener",function(r){return function(o,a,c){if(o==="click"||o=="keypress")try{const l=this.__sentry_instrumentation_handlers__||{},u=l[o];u&&(u.refCount--,u.refCount<=0&&(r.call(this,o,u.handler,c),u.handler=void 0,delete l[o]),Object.keys(l).length===0&&delete this.__sentry_instrumentation_handlers__)}catch{}return r.call(this,o,a,c)}}))})}function IC(t){if(t.type!==Vc)return!1;try{if(!t.target||t.target._sentryId!==jc)return!1}catch{}return!0}function kC(t,e){return t!=="keypress"?!1:e?.tagName?!(e.tagName==="INPUT"||e.tagName==="TEXTAREA"||e.isContentEditable):!0}function Oh(t,e=!1){return n=>{if(!n||n._sentryCaptured)return;const i=RC(n);if(kC(n.type,i))return;Tn(n,"_sentryCaptured",!0),i&&!i._sentryId&&Tn(i,"_sentryId",tt());const s=n.type==="keypress"?"input":n.type;IC(n)||(t({event:n,name:s,global:e}),Vc=n.type,jc=i?i._sentryId:void 0),clearTimeout(Lh),Lh=xe.setTimeout(()=>{jc=void 0,Vc=void 0},CC)}}function RC(t){try{return t.target}catch{return null}}let xr;function Eg(t){const e="history";fi(e,t),pi(e,AC)}function AC(){if(xe.addEventListener("popstate",()=>{const e=xe.location.href,n=xr;if(xr=e,n===e)return;ft("history",{from:n,to:e})}),!ZE())return;function t(e){return function(...n){const i=n.length>2?n[2]:void 0;if(i){const s=xr,r=NC(String(i));if(xr=r,s===r)return e.apply(this,n);ft("history",{from:s,to:r})}return e.apply(this,n)}}Ge(xe.history,"pushState",t),Ge(xe.history,"replaceState",t)}function NC(t){try{return new URL(t,xe.location.origin).toString()}catch{return t}}const Jr={};function PC(t){const e=Jr[t];if(e)return e;let n=xe[t];if($c(n))return Jr[t]=n.bind(xe);const i=xe.document;if(i&&typeof i.createElement=="function")try{const s=i.createElement("iframe");s.hidden=!0,i.head.appendChild(s);const r=s.contentWindow;r?.[t]&&(n=r[t]),i.head.removeChild(s)}catch(s){EC&&I.warn(`Could not create sandbox iframe for ${t} check, bailing to window.${t}: `,s)}return n&&(Jr[t]=n.bind(xe))}function LC(t){Jr[t]=void 0}const Ts="__sentry_xhr_v3__";function OC(t){fi("xhr",t),pi("xhr",DC)}function DC(){if(!xe.XMLHttpRequest)return;const t=XMLHttpRequest.prototype;t.open=new Proxy(t.open,{apply(e,n,i){const s=new Error,r=jt()*1e3,o=Vt(i[0])?i[0].toUpperCase():void 0,a=MC(i[1]);if(!o||!a)return e.apply(n,i);n[Ts]={method:o,url:a,request_headers:{}},o==="POST"&&a.match(/sentry_key/)&&(n.__sentry_own_request__=!0);const c=()=>{const l=n[Ts];if(l&&n.readyState===4){try{l.status_code=n.status}catch{}const u={endTimestamp:jt()*1e3,startTimestamp:r,xhr:n,virtualError:s};ft("xhr",u)}};return"onreadystatechange"in n&&typeof n.onreadystatechange=="function"?n.onreadystatechange=new Proxy(n.onreadystatechange,{apply(l,u,d){return c(),l.apply(u,d)}}):n.addEventListener("readystatechange",c),n.setRequestHeader=new Proxy(n.setRequestHeader,{apply(l,u,d){const[h,f]=d,p=u[Ts];return p&&Vt(h)&&Vt(f)&&(p.request_headers[h.toLowerCase()]=f),l.apply(u,d)}}),e.apply(n,i)}}),t.send=new Proxy(t.send,{apply(e,n,i){const s=n[Ts];if(!s)return e.apply(n,i);i[0]!==void 0&&(s.body=i[0]);const r={startTimestamp:jt()*1e3,xhr:n};return ft("xhr",r),e.apply(n,i)}})}function MC(t){if(Vt(t))return t;try{return t.toString()}catch{}}const xC=40;function FC(t,e=PC("fetch")){let n=0,i=0;async function s(r){const o=r.body.length;n+=o,i++;const a={body:r.body,method:"POST",referrerPolicy:"strict-origin",headers:t.headers,keepalive:n<=6e4&&i<15,...t.fetchOptions};try{const c=await e(t.url,a);return{statusCode:c.status,headers:{"x-sentry-rate-limits":c.headers.get("X-Sentry-Rate-Limits"),"retry-after":c.headers.get("Retry-After")}}}catch(c){throw LC("fetch"),c}finally{n-=o,i--}}return hE(t,s,Gl(t.bufferSize||xC))}const Zo=typeof __SENTRY_DEBUG__>"u"||__SENTRY_DEBUG__,UC=30,$C=50;function Wc(t,e,n,i){const s={filename:t,function:e==="<anonymous>"?Qn:e,in_app:!0};return n!==void 0&&(s.lineno=n),i!==void 0&&(s.colno=i),s}const BC=/^\s*at (\S+?)(?::(\d+))(?::(\d+))\s*$/i,HC=/^\s*at (?:(.+?\)(?: \[.+\])?|.*?) ?\((?:address at )?)?(?:async )?((?:<anonymous>|[-a-z]+:|.*bundle|\/)?.*?)(?::(\d+))?(?::(\d+))?\)?\s*$/i,VC=/\((\S*)(?::(\d+))(?::(\d+))\)/,jC=/at (.+?) ?\(data:(.+?),/,WC=t=>{const e=t.match(jC);if(e)return{filename:`<data:${e[2]}>`,function:e[1]};const n=BC.exec(t);if(n){const[,s,r,o]=n;return Wc(s,Qn,+r,+o)}const i=HC.exec(t);if(i){if(i[2]&&i[2].indexOf("eval")===0){const a=VC.exec(i[2]);a&&(i[2]=a[1],i[3]=a[2],i[4]=a[3])}const[r,o]=Cg(i[1]||Qn,i[2]);return Wc(o,r,i[3]?+i[3]:void 0,i[4]?+i[4]:void 0)}},qC=[UC,WC],zC=/^\s*(.*?)(?:\((.*?)\))?(?:^|@)?((?:[-a-z]+)?:\/.*?|\[native code\]|[^@]*(?:bundle|\d+\.js)|\/[\w\-. /=]+)(?::(\d+))?(?::(\d+))?\s*$/i,GC=/(\S+) line (\d+)(?: > eval line \d+)* > eval/i,KC=t=>{const e=zC.exec(t);if(e){if(e[3]&&e[3].indexOf(" > eval")>-1){const r=GC.exec(e[3]);r&&(e[1]=e[1]||"eval",e[3]=r[1],e[4]=r[2],e[5]="")}let i=e[3],s=e[1]||Qn;return[s,i]=Cg(s,i),Wc(i,s,e[4]?+e[4]:void 0,e[5]?+e[5]:void 0)}},YC=[$C,KC],JC=[qC,YC],XC=xp(...JC),Cg=(t,e)=>{const n=t.indexOf("safari-extension")!==-1,i=t.indexOf("safari-web-extension")!==-1;return n||i?[t.indexOf("@")!==-1?t.split("@")[0]:Qn,n?`safari-extension:${e}`:`safari-web-extension:${e}`]:[t,e]},Fr=1024,QC="Breadcrumbs",ZC=((t={})=>{const e={console:!0,dom:!0,fetch:!0,history:!0,sentry:!0,xhr:!0,...t};return{name:QC,setup(n){e.console&&WE(iT(n)),e.dom&&TC(nT(n,e.dom)),e.xhr&&OC(sT(n)),e.fetch&&nC(rT(n)),e.history&&Eg(oT(n)),e.sentry&&n.on("beforeSendEvent",tT(n))}}}),eT=ZC;function tT(t){return function(n){Oe()===t&&Zn({category:`sentry.${n.type==="transaction"?"transaction":"event"}`,event_id:n.event_id,level:n.level,message:Vn(n)},{event:n})}}function nT(t,e){return function(i){if(Oe()!==t)return;let s,r,o=typeof e=="object"?e.serializeAttribute:void 0,a=typeof e=="object"&&typeof e.maxStringLength=="number"?e.maxStringLength:void 0;a&&a>Fr&&(Zo&&I.warn(`\`dom.maxStringLength\` cannot exceed ${Fr}, but a value of ${a} was configured. Sentry will use ${Fr} instead.`),a=Fr),typeof o=="string"&&(o=[o]);try{const l=i.event,u=aT(l)?l.target:l;s=Vp(u,{keyAttrs:o,maxStringLength:a}),r=pv(u)}catch{s="<unknown>"}if(s.length===0)return;const c={category:`ui.${i.name}`,message:s};r&&(c.data={"ui.component_name":r}),Zn(c,{event:i.event,name:i.name,global:i.global})}}function iT(t){return function(n){if(Oe()!==t)return;const i={category:"console",data:{arguments:n.args,logger:"console"},level:zE(n.level),message:Gd(n.args," ")};if(n.level==="assert")if(n.args[0]===!1)i.message=`Assertion failed: ${Gd(n.args.slice(1)," ")||"console.assert"}`,i.data.arguments=n.args.slice(1);else return;Zn(i,{input:n.args,level:n.level})}}function sT(t){return function(n){if(Oe()!==t)return;const{startTimestamp:i,endTimestamp:s}=n,r=n.xhr[Ts];if(!i||!s||!r)return;const{method:o,url:a,status_code:c,body:l}=r,u={method:o,url:a,status_code:c},d={xhr:n.xhr,input:l,startTimestamp:i,endTimestamp:s},h={category:"xhr",data:u,type:"http",level:wg(c)};t.emit("beforeOutgoingRequestBreadcrumb",h,d),Zn(h,d)}}function rT(t){return function(n){if(Oe()!==t)return;const{startTimestamp:i,endTimestamp:s}=n;if(s&&!(n.fetchData.url.match(/sentry_key/)&&n.fetchData.method==="POST"))if(n.fetchData.method,n.fetchData.url,n.error){const r=n.fetchData,o={data:n.error,input:n.args,startTimestamp:i,endTimestamp:s},a={category:"fetch",data:r,level:"error",type:"http"};t.emit("beforeOutgoingRequestBreadcrumb",a,o),Zn(a,o)}else{const r=n.response,o={...n.fetchData,status_code:r?.status};n.fetchData.request_body_size,n.fetchData.response_body_size,r?.status;const a={input:n.args,response:r,startTimestamp:i,endTimestamp:s},c={category:"fetch",data:o,type:"http",level:wg(o.status_code)};t.emit("beforeOutgoingRequestBreadcrumb",c,a),Zn(c,a)}}}function oT(t){return function(n){if(Oe()!==t)return;let i=n.from,s=n.to;const r=Ja(de.location.href);let o=i?Ja(i):void 0;const a=Ja(s);o?.path||(o=r),r.protocol===a.protocol&&r.host===a.host&&(s=a.relative),r.protocol===o.protocol&&r.host===o.host&&(i=o.relative),Zn({category:"navigation",data:{from:i,to:s}})}}function aT(t){return!!t&&!!t.target}const cT=["EventTarget","Window","Node","ApplicationCache","AudioTrackList","BroadcastChannel","ChannelMergerNode","CryptoOperation","EventSource","FileReader","HTMLUnknownElement","IDBDatabase","IDBRequest","IDBTransaction","KeyOperation","MediaController","MessagePort","ModalWindow","Notification","SVGElementInstance","Screen","SharedWorker","TextTrack","TextTrackCue","TextTrackList","WebSocket","WebSocketWorker","Worker","XMLHttpRequest","XMLHttpRequestEventTarget","XMLHttpRequestUpload"],lT="BrowserApiErrors",uT=((t={})=>{const e={XMLHttpRequest:!0,eventTarget:!0,requestAnimationFrame:!0,setInterval:!0,setTimeout:!0,unregisterOriginalCallbacks:!1,...t};return{name:lT,setupOnce(){e.setTimeout&&Ge(de,"setTimeout",Dh),e.setInterval&&Ge(de,"setInterval",Dh),e.requestAnimationFrame&&Ge(de,"requestAnimationFrame",hT),e.XMLHttpRequest&&"XMLHttpRequest"in de&&Ge(XMLHttpRequest.prototype,"send",fT);const n=e.eventTarget;n&&(Array.isArray(n)?n:cT).forEach(s=>pT(s,e))}}}),dT=uT;function Dh(t){return function(...e){const n=e[0];return e[0]=Bi(n,{mechanism:{handled:!1,type:`auto.browser.browserapierrors.${En(t)}`}}),t.apply(this,e)}}function hT(t){return function(e){return t.apply(this,[Bi(e,{mechanism:{data:{handler:En(t)},handled:!1,type:"auto.browser.browserapierrors.requestAnimationFrame"}})])}}function fT(t){return function(...e){const n=this;return["onload","onerror","onprogress","onreadystatechange"].forEach(s=>{s in n&&typeof n[s]=="function"&&Ge(n,s,function(r){const o={mechanism:{data:{handler:En(r)},handled:!1,type:`auto.browser.browserapierrors.xhr.${s}`}},a=Hl(r);return a&&(o.mechanism.data.handler=En(a)),Bi(r,o)})}),t.apply(this,e)}}function pT(t,e){const i=de[t]?.prototype;i?.hasOwnProperty?.("addEventListener")&&(Ge(i,"addEventListener",function(s){return function(r,o,a){try{gT(o)&&(o.handleEvent=Bi(o.handleEvent,{mechanism:{data:{handler:En(o),target:t},handled:!1,type:"auto.browser.browserapierrors.handleEvent"}}))}catch{}return e.unregisterOriginalCallbacks&&mT(this,r,o),s.apply(this,[r,Bi(o,{mechanism:{data:{handler:En(o),target:t},handled:!1,type:"auto.browser.browserapierrors.addEventListener"}}),a])}}),Ge(i,"removeEventListener",function(s){return function(r,o,a){try{const c=o.__sentry_wrapped__;c&&s.call(this,r,c,a)}catch{}return s.call(this,r,o,a)}}))}function gT(t){return typeof t.handleEvent=="function"}function mT(t,e,n){t&&typeof t=="object"&&"removeEventListener"in t&&typeof t.removeEventListener=="function"&&t.removeEventListener(e,n)}const _T=()=>({name:"BrowserSession",setupOnce(){if(typeof de.document>"u"){Zo&&I.warn("Using the `browserSessionIntegration` in non-browser environments is not supported.");return}fh({ignoreDuration:!0}),ph(),Eg(({from:t,to:e})=>{t!==void 0&&t!==e&&(fh({ignoreDuration:!0}),ph())})}}),yT="GlobalHandlers",wT=((t={})=>{const e={onerror:!0,onunhandledrejection:!0,...t};return{name:yT,setupOnce(){Error.stackTraceLimit=50},setup(n){e.onerror&&(bT(n),Mh("onerror")),e.onunhandledrejection&&(ET(n),Mh("onunhandledrejection"))}}}),vT=wT;function bT(t){sv(e=>{const{stackParser:n,attachStacktrace:i}=Tg();if(Oe()!==t||vg())return;const{msg:s,url:r,line:o,column:a,error:c}=e,l=ST(Jl(n,c||s,void 0,i,!1),r,o,a);l.level="error",ig(l,{originalException:c,mechanism:{handled:!1,type:"auto.browser.global_handlers.onerror"}})})}function ET(t){ov(e=>{const{stackParser:n,attachStacktrace:i}=Tg();if(Oe()!==t||vg())return;const s=CT(e),r=Go(s)?TT(s):Jl(n,s,void 0,i,!0);r.level="error",ig(r,{originalException:s,mechanism:{handled:!1,type:"auto.browser.global_handlers.onunhandledrejection"}})})}function CT(t){if(Go(t))return t;try{if("reason"in t)return t.reason;if("detail"in t&&"reason"in t.detail)return t.detail.reason}catch{}return t}function TT(t){return{exception:{values:[{type:"UnhandledRejection",value:`Non-Error promise rejection captured with value: ${String(t)}`}]}}}function ST(t,e,n,i){const s=t.exception=t.exception||{},r=s.values=s.values||[],o=r[0]=r[0]||{},a=o.stacktrace=o.stacktrace||{},c=a.frames=a.frames||[],l=i,u=n,d=IT(e)??Bl();return c.length===0&&c.push({colno:l,filename:d,function:Qn,in_app:!0,lineno:u}),t}function Mh(t){Zo&&I.log(`Global Handler attached: ${t}`)}function Tg(){return Oe()?.getOptions()||{stackParser:()=>[],attachStacktrace:!1}}function IT(t){if(!(!Vt(t)||t.length===0))return t.startsWith("data:")?`<${SE(t,!1)}>`:t}const kT=()=>({name:"HttpContext",preprocessEvent(t){if(!de.navigator&&!de.location&&!de.document)return;const e=cC(),n={...e.headers,...t.request?.headers};t.request={...e,...t.request,headers:n}}}),RT="cause",AT=5,NT="LinkedErrors",PT=((t={})=>{const e=t.limit||AT,n=t.key||RT;return{name:NT,preprocessEvent(i,s,r){const o=r.getOptions();jE(Kl,o.stackParser,n,e,i,s)}}}),LT=PT;function OT(){return DT()?(Zo&&Qi(()=>{console.error("[Sentry] You cannot use Sentry.init() in a browser extension, see: https://docs.sentry.io/platforms/javascript/best-practices/browser-extensions/")}),!0):!1}function DT(){if(typeof de.window>"u")return!1;const t=de;if(t.nw||!(t.chrome||t.browser)?.runtime?.id)return!1;const n=Bl(),i=["chrome-extension","moz-extension","ms-browser-extension","safari-web-extension"];return!(de===de.top&&i.some(r=>n.startsWith(`${r}://`)))}function MT(t){return[ME(),PE(),dT(),eT(),vT(),LT(),YE(),kT(),_T()]}function xT(t={}){const e=!t.skipBrowserExtensionCheck&&OT();let n=t.defaultIntegrations==null?MT():t.defaultIntegrations;const i={...t,enabled:e?!1:t.enabled,stackParser:nv(t.stackParser||XC),integrations:Zb({integrations:t.integrations,defaultIntegrations:n}),transport:t.transport||FC};return CE(vC,i)}const FT="https://adc1b5518c6a55273a1398d1b8b9cd3e@o4510415124496384.ingest.de.sentry.io/4510415129083984";xT({dsn:FT,sendDefaultPii:!0});/**
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
 */const UT=()=>{};var xh={};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Sg={NODE_ADMIN:!1,SDK_VERSION:"${JSCORE_VERSION}"};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const _=function(t,e){if(!t)throw ts(e)},ts=function(t){return new Error("Firebase Database ("+Sg.SDK_VERSION+") INTERNAL ASSERT FAILED: "+t)};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ig=function(t){const e=[];let n=0;for(let i=0;i<t.length;i++){let s=t.charCodeAt(i);s<128?e[n++]=s:s<2048?(e[n++]=s>>6|192,e[n++]=s&63|128):(s&64512)===55296&&i+1<t.length&&(t.charCodeAt(i+1)&64512)===56320?(s=65536+((s&1023)<<10)+(t.charCodeAt(++i)&1023),e[n++]=s>>18|240,e[n++]=s>>12&63|128,e[n++]=s>>6&63|128,e[n++]=s&63|128):(e[n++]=s>>12|224,e[n++]=s>>6&63|128,e[n++]=s&63|128)}return e},$T=function(t){const e=[];let n=0,i=0;for(;n<t.length;){const s=t[n++];if(s<128)e[i++]=String.fromCharCode(s);else if(s>191&&s<224){const r=t[n++];e[i++]=String.fromCharCode((s&31)<<6|r&63)}else if(s>239&&s<365){const r=t[n++],o=t[n++],a=t[n++],c=((s&7)<<18|(r&63)<<12|(o&63)<<6|a&63)-65536;e[i++]=String.fromCharCode(55296+(c>>10)),e[i++]=String.fromCharCode(56320+(c&1023))}else{const r=t[n++],o=t[n++];e[i++]=String.fromCharCode((s&15)<<12|(r&63)<<6|o&63)}}return e.join("")},ea={byteToCharMap_:null,charToByteMap_:null,byteToCharMapWebSafe_:null,charToByteMapWebSafe_:null,ENCODED_VALS_BASE:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",get ENCODED_VALS(){return this.ENCODED_VALS_BASE+"+/="},get ENCODED_VALS_WEBSAFE(){return this.ENCODED_VALS_BASE+"-_."},HAS_NATIVE_SUPPORT:typeof atob=="function",encodeByteArray(t,e){if(!Array.isArray(t))throw Error("encodeByteArray takes an array as a parameter");this.init_();const n=e?this.byteToCharMapWebSafe_:this.byteToCharMap_,i=[];for(let s=0;s<t.length;s+=3){const r=t[s],o=s+1<t.length,a=o?t[s+1]:0,c=s+2<t.length,l=c?t[s+2]:0,u=r>>2,d=(r&3)<<4|a>>4;let h=(a&15)<<2|l>>6,f=l&63;c||(f=64,o||(h=64)),i.push(n[u],n[d],n[h],n[f])}return i.join("")},encodeString(t,e){return this.HAS_NATIVE_SUPPORT&&!e?btoa(t):this.encodeByteArray(Ig(t),e)},decodeString(t,e){return this.HAS_NATIVE_SUPPORT&&!e?atob(t):$T(this.decodeStringToByteArray(t,e))},decodeStringToByteArray(t,e){this.init_();const n=e?this.charToByteMapWebSafe_:this.charToByteMap_,i=[];for(let s=0;s<t.length;){const r=n[t.charAt(s++)],a=s<t.length?n[t.charAt(s)]:0;++s;const l=s<t.length?n[t.charAt(s)]:64;++s;const d=s<t.length?n[t.charAt(s)]:64;if(++s,r==null||a==null||l==null||d==null)throw new BT;const h=r<<2|a>>4;if(i.push(h),l!==64){const f=a<<4&240|l>>2;if(i.push(f),d!==64){const p=l<<6&192|d;i.push(p)}}}return i},init_(){if(!this.byteToCharMap_){this.byteToCharMap_={},this.charToByteMap_={},this.byteToCharMapWebSafe_={},this.charToByteMapWebSafe_={};for(let t=0;t<this.ENCODED_VALS.length;t++)this.byteToCharMap_[t]=this.ENCODED_VALS.charAt(t),this.charToByteMap_[this.byteToCharMap_[t]]=t,this.byteToCharMapWebSafe_[t]=this.ENCODED_VALS_WEBSAFE.charAt(t),this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[t]]=t,t>=this.ENCODED_VALS_BASE.length&&(this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(t)]=t,this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(t)]=t)}}};class BT extends Error{constructor(){super(...arguments),this.name="DecodeBase64StringError"}}const kg=function(t){const e=Ig(t);return ea.encodeByteArray(e,!0)},uo=function(t){return kg(t).replace(/\./g,"")},ho=function(t){try{return ea.decodeString(t,!0)}catch(e){console.error("base64Decode failed: ",e)}return null};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function HT(t){return Rg(void 0,t)}function Rg(t,e){if(!(e instanceof Object))return e;switch(e.constructor){case Date:const n=e;return new Date(n.getTime());case Object:t===void 0&&(t={});break;case Array:t=[];break;default:return e}for(const n in e)!e.hasOwnProperty(n)||!VT(n)||(t[n]=Rg(t[n],e[n]));return t}function VT(t){return t!=="__proto__"}/**
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
 */function Ag(){if(typeof self<"u")return self;if(typeof window<"u")return window;if(typeof global<"u")return global;throw new Error("Unable to locate global object.")}/**
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
 */const jT=()=>Ag().__FIREBASE_DEFAULTS__,WT=()=>{if(typeof process>"u"||typeof xh>"u")return;const t=xh.__FIREBASE_DEFAULTS__;if(t)return JSON.parse(t)},qT=()=>{if(typeof document>"u")return;let t;try{t=document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/)}catch{return}const e=t&&ho(t[1]);return e&&JSON.parse(e)},Xl=()=>{try{return UT()||jT()||WT()||qT()}catch(t){console.info(`Unable to get __FIREBASE_DEFAULTS__ due to: ${t}`);return}},Ng=t=>Xl()?.emulatorHosts?.[t],zT=t=>{const e=Ng(t);if(!e)return;const n=e.lastIndexOf(":");if(n<=0||n+1===e.length)throw new Error(`Invalid host ${e} with no separate hostname and port!`);const i=parseInt(e.substring(n+1),10);return e[0]==="["?[e.substring(1,n-1),i]:[e.substring(0,n),i]},Pg=()=>Xl()?.config,Lg=t=>Xl()?.[`_${t}`];/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ve{constructor(){this.reject=()=>{},this.resolve=()=>{},this.promise=new Promise((e,n)=>{this.resolve=e,this.reject=n})}wrapCallback(e){return(n,i)=>{n?this.reject(n):this.resolve(i),typeof e=="function"&&(this.promise.catch(()=>{}),e.length===1?e(n):e(n,i))}}}/**
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
 */function ns(t){try{return(t.startsWith("http://")||t.startsWith("https://")?new URL(t).hostname:t).endsWith(".cloudworkstations.dev")}catch{return!1}}async function Og(t){return(await fetch(t,{credentials:"include"})).ok}/**
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
 */function GT(t,e){if(t.uid)throw new Error('The "uid" field is no longer supported by mockUserToken. Please use "sub" instead for Firebase Auth User ID.');const n={alg:"none",type:"JWT"},i=e||"demo-project",s=t.iat||0,r=t.sub||t.user_id;if(!r)throw new Error("mockUserToken must contain 'sub' or 'user_id' field!");const o={iss:`https://securetoken.google.com/${i}`,aud:i,iat:s,exp:s+3600,auth_time:s,sub:r,user_id:r,firebase:{sign_in_provider:"custom",identities:{}},...t};return[uo(JSON.stringify(n)),uo(JSON.stringify(o)),""].join(".")}const ks={};function KT(){const t={prod:[],emulator:[]};for(const e of Object.keys(ks))ks[e]?t.emulator.push(e):t.prod.push(e);return t}function YT(t){let e=document.getElementById(t),n=!1;return e||(e=document.createElement("div"),e.setAttribute("id",t),n=!0),{created:n,element:e}}let Fh=!1;function Dg(t,e){if(typeof window>"u"||typeof document>"u"||!ns(window.location.host)||ks[t]===e||ks[t]||Fh)return;ks[t]=e;function n(h){return`__firebase__banner__${h}`}const i="__firebase__banner",r=KT().prod.length>0;function o(){const h=document.getElementById(i);h&&h.remove()}function a(h){h.style.display="flex",h.style.background="#7faaf0",h.style.position="fixed",h.style.bottom="5px",h.style.left="5px",h.style.padding=".5em",h.style.borderRadius="5px",h.style.alignItems="center"}function c(h,f){h.setAttribute("width","24"),h.setAttribute("id",f),h.setAttribute("height","24"),h.setAttribute("viewBox","0 0 24 24"),h.setAttribute("fill","none"),h.style.marginLeft="-6px"}function l(){const h=document.createElement("span");return h.style.cursor="pointer",h.style.marginLeft="16px",h.style.fontSize="24px",h.innerHTML=" &times;",h.onclick=()=>{Fh=!0,o()},h}function u(h,f){h.setAttribute("id",f),h.innerText="Learn more",h.href="https://firebase.google.com/docs/studio/preview-apps#preview-backend",h.setAttribute("target","__blank"),h.style.paddingLeft="5px",h.style.textDecoration="underline"}function d(){const h=YT(i),f=n("text"),p=document.getElementById(f)||document.createElement("span"),g=n("learnmore"),m=document.getElementById(g)||document.createElement("a"),T=n("preprendIcon"),P=document.getElementById(T)||document.createElementNS("http://www.w3.org/2000/svg","svg");if(h.created){const $=h.element;a($),u(m,g);const y=l();c(P,T),$.append(P,p,m,y),document.body.appendChild($)}r?(p.innerText="Preview backend disconnected.",P.innerHTML=`<g clip-path="url(#clip0_6013_33858)">
<path d="M4.8 17.6L12 5.6L19.2 17.6H4.8ZM6.91667 16.4H17.0833L12 7.93333L6.91667 16.4ZM12 15.6C12.1667 15.6 12.3056 15.5444 12.4167 15.4333C12.5389 15.3111 12.6 15.1667 12.6 15C12.6 14.8333 12.5389 14.6944 12.4167 14.5833C12.3056 14.4611 12.1667 14.4 12 14.4C11.8333 14.4 11.6889 14.4611 11.5667 14.5833C11.4556 14.6944 11.4 14.8333 11.4 15C11.4 15.1667 11.4556 15.3111 11.5667 15.4333C11.6889 15.5444 11.8333 15.6 12 15.6ZM11.4 13.6H12.6V10.4H11.4V13.6Z" fill="#212121"/>
</g>
<defs>
<clipPath id="clip0_6013_33858">
<rect width="24" height="24" fill="white"/>
</clipPath>
</defs>`):(P.innerHTML=`<g clip-path="url(#clip0_6083_34804)">
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
 */function He(){return typeof navigator<"u"&&typeof navigator.userAgent=="string"?navigator.userAgent:""}function Ql(){return typeof window<"u"&&!!(window.cordova||window.phonegap||window.PhoneGap)&&/ios|iphone|ipod|ipad|android|blackberry|iemobile/i.test(He())}function JT(){return typeof navigator<"u"&&navigator.userAgent==="Cloudflare-Workers"}function XT(){const t=typeof chrome=="object"?chrome.runtime:typeof browser=="object"?browser.runtime:void 0;return typeof t=="object"&&t.id!==void 0}function Mg(){return typeof navigator=="object"&&navigator.product==="ReactNative"}function QT(){const t=He();return t.indexOf("MSIE ")>=0||t.indexOf("Trident/")>=0}function ZT(){return Sg.NODE_ADMIN===!0}function ta(){try{return typeof indexedDB=="object"}catch{return!1}}function xg(){return new Promise((t,e)=>{try{let n=!0;const i="validate-browser-context-for-indexeddb-analytics-module",s=self.indexedDB.open(i);s.onsuccess=()=>{s.result.close(),n||self.indexedDB.deleteDatabase(i),t(!0)},s.onupgradeneeded=()=>{n=!1},s.onerror=()=>{e(s.error?.message||"")}}catch(n){e(n)}})}function eS(){return!(typeof navigator>"u"||!navigator.cookieEnabled)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const tS="FirebaseError";class Zt extends Error{constructor(e,n,i){super(n),this.code=e,this.customData=i,this.name=tS,Object.setPrototypeOf(this,Zt.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,On.prototype.create)}}class On{constructor(e,n,i){this.service=e,this.serviceName=n,this.errors=i}create(e,...n){const i=n[0]||{},s=`${this.service}/${e}`,r=this.errors[e],o=r?nS(r,i):"Error",a=`${this.serviceName}: ${o} (${s}).`;return new Zt(s,a,i)}}function nS(t,e){return t.replace(iS,(n,i)=>{const s=e[i];return s!=null?String(s):`<${i}?>`})}const iS=/\{\$([^}]+)}/g;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function qs(t){return JSON.parse(t)}function me(t){return JSON.stringify(t)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Fg=function(t){let e={},n={},i={},s="";try{const r=t.split(".");e=qs(ho(r[0])||""),n=qs(ho(r[1])||""),s=r[2],i=n.d||{},delete n.d}catch{}return{header:e,claims:n,data:i,signature:s}},sS=function(t){const e=Fg(t),n=e.claims;return!!n&&typeof n=="object"&&n.hasOwnProperty("iat")},rS=function(t){const e=Fg(t).claims;return typeof e=="object"&&e.admin===!0};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Lt(t,e){return Object.prototype.hasOwnProperty.call(t,e)}function Hi(t,e){if(Object.prototype.hasOwnProperty.call(t,e))return t[e]}function fo(t){for(const e in t)if(Object.prototype.hasOwnProperty.call(t,e))return!1;return!0}function po(t,e,n){const i={};for(const s in t)Object.prototype.hasOwnProperty.call(t,s)&&(i[s]=e.call(n,t[s],s,t));return i}function ei(t,e){if(t===e)return!0;const n=Object.keys(t),i=Object.keys(e);for(const s of n){if(!i.includes(s))return!1;const r=t[s],o=e[s];if(Uh(r)&&Uh(o)){if(!ei(r,o))return!1}else if(r!==o)return!1}for(const s of i)if(!n.includes(s))return!1;return!0}function Uh(t){return t!==null&&typeof t=="object"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function is(t){const e=[];for(const[n,i]of Object.entries(t))Array.isArray(i)?i.forEach(s=>{e.push(encodeURIComponent(n)+"="+encodeURIComponent(s))}):e.push(encodeURIComponent(n)+"="+encodeURIComponent(i));return e.length?"&"+e.join("&"):""}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class oS{constructor(){this.chain_=[],this.buf_=[],this.W_=[],this.pad_=[],this.inbuf_=0,this.total_=0,this.blockSize=512/8,this.pad_[0]=128;for(let e=1;e<this.blockSize;++e)this.pad_[e]=0;this.reset()}reset(){this.chain_[0]=1732584193,this.chain_[1]=4023233417,this.chain_[2]=2562383102,this.chain_[3]=271733878,this.chain_[4]=3285377520,this.inbuf_=0,this.total_=0}compress_(e,n){n||(n=0);const i=this.W_;if(typeof e=="string")for(let d=0;d<16;d++)i[d]=e.charCodeAt(n)<<24|e.charCodeAt(n+1)<<16|e.charCodeAt(n+2)<<8|e.charCodeAt(n+3),n+=4;else for(let d=0;d<16;d++)i[d]=e[n]<<24|e[n+1]<<16|e[n+2]<<8|e[n+3],n+=4;for(let d=16;d<80;d++){const h=i[d-3]^i[d-8]^i[d-14]^i[d-16];i[d]=(h<<1|h>>>31)&4294967295}let s=this.chain_[0],r=this.chain_[1],o=this.chain_[2],a=this.chain_[3],c=this.chain_[4],l,u;for(let d=0;d<80;d++){d<40?d<20?(l=a^r&(o^a),u=1518500249):(l=r^o^a,u=1859775393):d<60?(l=r&o|a&(r|o),u=2400959708):(l=r^o^a,u=3395469782);const h=(s<<5|s>>>27)+l+c+u+i[d]&4294967295;c=a,a=o,o=(r<<30|r>>>2)&4294967295,r=s,s=h}this.chain_[0]=this.chain_[0]+s&4294967295,this.chain_[1]=this.chain_[1]+r&4294967295,this.chain_[2]=this.chain_[2]+o&4294967295,this.chain_[3]=this.chain_[3]+a&4294967295,this.chain_[4]=this.chain_[4]+c&4294967295}update(e,n){if(e==null)return;n===void 0&&(n=e.length);const i=n-this.blockSize;let s=0;const r=this.buf_;let o=this.inbuf_;for(;s<n;){if(o===0)for(;s<=i;)this.compress_(e,s),s+=this.blockSize;if(typeof e=="string"){for(;s<n;)if(r[o]=e.charCodeAt(s),++o,++s,o===this.blockSize){this.compress_(r),o=0;break}}else for(;s<n;)if(r[o]=e[s],++o,++s,o===this.blockSize){this.compress_(r),o=0;break}}this.inbuf_=o,this.total_+=n}digest(){const e=[];let n=this.total_*8;this.inbuf_<56?this.update(this.pad_,56-this.inbuf_):this.update(this.pad_,this.blockSize-(this.inbuf_-56));for(let s=this.blockSize-1;s>=56;s--)this.buf_[s]=n&255,n/=256;this.compress_(this.buf_);let i=0;for(let s=0;s<5;s++)for(let r=24;r>=0;r-=8)e[i]=this.chain_[s]>>r&255,++i;return e}}function aS(t,e){const n=new cS(t,e);return n.subscribe.bind(n)}class cS{constructor(e,n){this.observers=[],this.unsubscribes=[],this.observerCount=0,this.task=Promise.resolve(),this.finalized=!1,this.onNoObservers=n,this.task.then(()=>{e(this)}).catch(i=>{this.error(i)})}next(e){this.forEachObserver(n=>{n.next(e)})}error(e){this.forEachObserver(n=>{n.error(e)}),this.close(e)}complete(){this.forEachObserver(e=>{e.complete()}),this.close()}subscribe(e,n,i){let s;if(e===void 0&&n===void 0&&i===void 0)throw new Error("Missing Observer.");lS(e,["next","error","complete"])?s=e:s={next:e,error:n,complete:i},s.next===void 0&&(s.next=Qa),s.error===void 0&&(s.error=Qa),s.complete===void 0&&(s.complete=Qa);const r=this.unsubscribeOne.bind(this,this.observers.length);return this.finalized&&this.task.then(()=>{try{this.finalError?s.error(this.finalError):s.complete()}catch{}}),this.observers.push(s),r}unsubscribeOne(e){this.observers===void 0||this.observers[e]===void 0||(delete this.observers[e],this.observerCount-=1,this.observerCount===0&&this.onNoObservers!==void 0&&this.onNoObservers(this))}forEachObserver(e){if(!this.finalized)for(let n=0;n<this.observers.length;n++)this.sendOne(n,e)}sendOne(e,n){this.task.then(()=>{if(this.observers!==void 0&&this.observers[e]!==void 0)try{n(this.observers[e])}catch(i){typeof console<"u"&&console.error&&console.error(i)}})}close(e){this.finalized||(this.finalized=!0,e!==void 0&&(this.finalError=e),this.task.then(()=>{this.observers=void 0,this.onNoObservers=void 0}))}}function lS(t,e){if(typeof t!="object"||t===null)return!1;for(const n of e)if(n in t&&typeof t[n]=="function")return!0;return!1}function Qa(){}function Vi(t,e){return`${t} failed: ${e} argument `}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const uS=function(t){const e=[];let n=0;for(let i=0;i<t.length;i++){let s=t.charCodeAt(i);if(s>=55296&&s<=56319){const r=s-55296;i++,_(i<t.length,"Surrogate pair missing trail surrogate.");const o=t.charCodeAt(i)-56320;s=65536+(r<<10)+o}s<128?e[n++]=s:s<2048?(e[n++]=s>>6|192,e[n++]=s&63|128):s<65536?(e[n++]=s>>12|224,e[n++]=s>>6&63|128,e[n++]=s&63|128):(e[n++]=s>>18|240,e[n++]=s>>12&63|128,e[n++]=s>>6&63|128,e[n++]=s&63|128)}return e},na=function(t){let e=0;for(let n=0;n<t.length;n++){const i=t.charCodeAt(n);i<128?e++:i<2048?e+=2:i>=55296&&i<=56319?(e+=4,n++):e+=3}return e};/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const dS=1e3,hS=2,fS=14400*1e3,pS=.5;function gS(t,e=dS,n=hS){const i=e*Math.pow(n,t),s=Math.round(pS*i*(Math.random()-.5)*2);return Math.min(fS,i+s)}/**
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
 */function re(t){return t&&t._delegate?t._delegate:t}class Je{constructor(e,n,i){this.name=e,this.instanceFactory=n,this.type=i,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}setInstantiationMode(e){return this.instantiationMode=e,this}setMultipleInstances(e){return this.multipleInstances=e,this}setServiceProps(e){return this.serviceProps=e,this}setInstanceCreatedCallback(e){return this.onInstanceCreated=e,this}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
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
 */class mS{constructor(e,n){this.name=e,this.container=n,this.component=null,this.instances=new Map,this.instancesDeferred=new Map,this.instancesOptions=new Map,this.onInitCallbacks=new Map}get(e){const n=this.normalizeInstanceIdentifier(e);if(!this.instancesDeferred.has(n)){const i=new Ve;if(this.instancesDeferred.set(n,i),this.isInitialized(n)||this.shouldAutoInitialize())try{const s=this.getOrInitializeService({instanceIdentifier:n});s&&i.resolve(s)}catch{}}return this.instancesDeferred.get(n).promise}getImmediate(e){const n=this.normalizeInstanceIdentifier(e?.identifier),i=e?.optional??!1;if(this.isInitialized(n)||this.shouldAutoInitialize())try{return this.getOrInitializeService({instanceIdentifier:n})}catch(s){if(i)return null;throw s}else{if(i)return null;throw Error(`Service ${this.name} is not available`)}}getComponent(){return this.component}setComponent(e){if(e.name!==this.name)throw Error(`Mismatching Component ${e.name} for Provider ${this.name}.`);if(this.component)throw Error(`Component for ${this.name} has already been provided`);if(this.component=e,!!this.shouldAutoInitialize()){if(yS(e))try{this.getOrInitializeService({instanceIdentifier:$n})}catch{}for(const[n,i]of this.instancesDeferred.entries()){const s=this.normalizeInstanceIdentifier(n);try{const r=this.getOrInitializeService({instanceIdentifier:s});i.resolve(r)}catch{}}}}clearInstance(e=$n){this.instancesDeferred.delete(e),this.instancesOptions.delete(e),this.instances.delete(e)}async delete(){const e=Array.from(this.instances.values());await Promise.all([...e.filter(n=>"INTERNAL"in n).map(n=>n.INTERNAL.delete()),...e.filter(n=>"_delete"in n).map(n=>n._delete())])}isComponentSet(){return this.component!=null}isInitialized(e=$n){return this.instances.has(e)}getOptions(e=$n){return this.instancesOptions.get(e)||{}}initialize(e={}){const{options:n={}}=e,i=this.normalizeInstanceIdentifier(e.instanceIdentifier);if(this.isInitialized(i))throw Error(`${this.name}(${i}) has already been initialized`);if(!this.isComponentSet())throw Error(`Component ${this.name} has not been registered yet`);const s=this.getOrInitializeService({instanceIdentifier:i,options:n});for(const[r,o]of this.instancesDeferred.entries()){const a=this.normalizeInstanceIdentifier(r);i===a&&o.resolve(s)}return s}onInit(e,n){const i=this.normalizeInstanceIdentifier(n),s=this.onInitCallbacks.get(i)??new Set;s.add(e),this.onInitCallbacks.set(i,s);const r=this.instances.get(i);return r&&e(r,i),()=>{s.delete(e)}}invokeOnInitCallbacks(e,n){const i=this.onInitCallbacks.get(n);if(i)for(const s of i)try{s(e,n)}catch{}}getOrInitializeService({instanceIdentifier:e,options:n={}}){let i=this.instances.get(e);if(!i&&this.component&&(i=this.component.instanceFactory(this.container,{instanceIdentifier:_S(e),options:n}),this.instances.set(e,i),this.instancesOptions.set(e,n),this.invokeOnInitCallbacks(i,e),this.component.onInstanceCreated))try{this.component.onInstanceCreated(this.container,e,i)}catch{}return i||null}normalizeInstanceIdentifier(e=$n){return this.component?this.component.multipleInstances?e:$n:e}shouldAutoInitialize(){return!!this.component&&this.component.instantiationMode!=="EXPLICIT"}}function _S(t){return t===$n?void 0:t}function yS(t){return t.instantiationMode==="EAGER"}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class wS{constructor(e){this.name=e,this.providers=new Map}addComponent(e){const n=this.getProvider(e.name);if(n.isComponentSet())throw new Error(`Component ${e.name} has already been registered with ${this.name}`);n.setComponent(e)}addOrOverwriteComponent(e){this.getProvider(e.name).isComponentSet()&&this.providers.delete(e.name),this.addComponent(e)}getProvider(e){if(this.providers.has(e))return this.providers.get(e);const n=new mS(e,this);return this.providers.set(e,n),n}getProviders(){return Array.from(this.providers.values())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var G;(function(t){t[t.DEBUG=0]="DEBUG",t[t.VERBOSE=1]="VERBOSE",t[t.INFO=2]="INFO",t[t.WARN=3]="WARN",t[t.ERROR=4]="ERROR",t[t.SILENT=5]="SILENT"})(G||(G={}));const vS={debug:G.DEBUG,verbose:G.VERBOSE,info:G.INFO,warn:G.WARN,error:G.ERROR,silent:G.SILENT},bS=G.INFO,ES={[G.DEBUG]:"log",[G.VERBOSE]:"log",[G.INFO]:"info",[G.WARN]:"warn",[G.ERROR]:"error"},CS=(t,e,...n)=>{if(e<t.logLevel)return;const i=new Date().toISOString(),s=ES[e];if(s)console[s](`[${i}]  ${t.name}:`,...n);else throw new Error(`Attempted to log a message with an invalid logType (value: ${e})`)};class ia{constructor(e){this.name=e,this._logLevel=bS,this._logHandler=CS,this._userLogHandler=null}get logLevel(){return this._logLevel}set logLevel(e){if(!(e in G))throw new TypeError(`Invalid value "${e}" assigned to \`logLevel\``);this._logLevel=e}setLogLevel(e){this._logLevel=typeof e=="string"?vS[e]:e}get logHandler(){return this._logHandler}set logHandler(e){if(typeof e!="function")throw new TypeError("Value assigned to `logHandler` must be a function");this._logHandler=e}get userLogHandler(){return this._userLogHandler}set userLogHandler(e){this._userLogHandler=e}debug(...e){this._userLogHandler&&this._userLogHandler(this,G.DEBUG,...e),this._logHandler(this,G.DEBUG,...e)}log(...e){this._userLogHandler&&this._userLogHandler(this,G.VERBOSE,...e),this._logHandler(this,G.VERBOSE,...e)}info(...e){this._userLogHandler&&this._userLogHandler(this,G.INFO,...e),this._logHandler(this,G.INFO,...e)}warn(...e){this._userLogHandler&&this._userLogHandler(this,G.WARN,...e),this._logHandler(this,G.WARN,...e)}error(...e){this._userLogHandler&&this._userLogHandler(this,G.ERROR,...e),this._logHandler(this,G.ERROR,...e)}}const TS=(t,e)=>e.some(n=>t instanceof n);let $h,Bh;function SS(){return $h||($h=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])}function IS(){return Bh||(Bh=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])}const Ug=new WeakMap,qc=new WeakMap,$g=new WeakMap,Za=new WeakMap,Zl=new WeakMap;function kS(t){const e=new Promise((n,i)=>{const s=()=>{t.removeEventListener("success",r),t.removeEventListener("error",o)},r=()=>{n(Wt(t.result)),s()},o=()=>{i(t.error),s()};t.addEventListener("success",r),t.addEventListener("error",o)});return e.then(n=>{n instanceof IDBCursor&&Ug.set(n,t)}).catch(()=>{}),Zl.set(e,t),e}function RS(t){if(qc.has(t))return;const e=new Promise((n,i)=>{const s=()=>{t.removeEventListener("complete",r),t.removeEventListener("error",o),t.removeEventListener("abort",o)},r=()=>{n(),s()},o=()=>{i(t.error||new DOMException("AbortError","AbortError")),s()};t.addEventListener("complete",r),t.addEventListener("error",o),t.addEventListener("abort",o)});qc.set(t,e)}let zc={get(t,e,n){if(t instanceof IDBTransaction){if(e==="done")return qc.get(t);if(e==="objectStoreNames")return t.objectStoreNames||$g.get(t);if(e==="store")return n.objectStoreNames[1]?void 0:n.objectStore(n.objectStoreNames[0])}return Wt(t[e])},set(t,e,n){return t[e]=n,!0},has(t,e){return t instanceof IDBTransaction&&(e==="done"||e==="store")?!0:e in t}};function AS(t){zc=t(zc)}function NS(t){return t===IDBDatabase.prototype.transaction&&!("objectStoreNames"in IDBTransaction.prototype)?function(e,...n){const i=t.call(ec(this),e,...n);return $g.set(i,e.sort?e.sort():[e]),Wt(i)}:IS().includes(t)?function(...e){return t.apply(ec(this),e),Wt(Ug.get(this))}:function(...e){return Wt(t.apply(ec(this),e))}}function PS(t){return typeof t=="function"?NS(t):(t instanceof IDBTransaction&&RS(t),TS(t,SS())?new Proxy(t,zc):t)}function Wt(t){if(t instanceof IDBRequest)return kS(t);if(Za.has(t))return Za.get(t);const e=PS(t);return e!==t&&(Za.set(t,e),Zl.set(e,t)),e}const ec=t=>Zl.get(t);function sa(t,e,{blocked:n,upgrade:i,blocking:s,terminated:r}={}){const o=indexedDB.open(t,e),a=Wt(o);return i&&o.addEventListener("upgradeneeded",c=>{i(Wt(o.result),c.oldVersion,c.newVersion,Wt(o.transaction),c)}),n&&o.addEventListener("blocked",c=>n(c.oldVersion,c.newVersion,c)),a.then(c=>{r&&c.addEventListener("close",()=>r()),s&&c.addEventListener("versionchange",l=>s(l.oldVersion,l.newVersion,l))}).catch(()=>{}),a}function tc(t,{blocked:e}={}){const n=indexedDB.deleteDatabase(t);return e&&n.addEventListener("blocked",i=>e(i.oldVersion,i)),Wt(n).then(()=>{})}const LS=["get","getKey","getAll","getAllKeys","count"],OS=["put","add","delete","clear"],nc=new Map;function Hh(t,e){if(!(t instanceof IDBDatabase&&!(e in t)&&typeof e=="string"))return;if(nc.get(e))return nc.get(e);const n=e.replace(/FromIndex$/,""),i=e!==n,s=OS.includes(n);if(!(n in(i?IDBIndex:IDBObjectStore).prototype)||!(s||LS.includes(n)))return;const r=async function(o,...a){const c=this.transaction(o,s?"readwrite":"readonly");let l=c.store;return i&&(l=l.index(a.shift())),(await Promise.all([l[n](...a),s&&c.done]))[0]};return nc.set(e,r),r}AS(t=>({...t,get:(e,n,i)=>Hh(e,n)||t.get(e,n,i),has:(e,n)=>!!Hh(e,n)||t.has(e,n)}));/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class DS{constructor(e){this.container=e}getPlatformInfoString(){return this.container.getProviders().map(n=>{if(MS(n)){const i=n.getImmediate();return`${i.library}/${i.version}`}else return null}).filter(n=>n).join(" ")}}function MS(t){return t.getComponent()?.type==="VERSION"}const Gc="@firebase/app",Vh="0.14.7";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Gt=new ia("@firebase/app"),xS="@firebase/app-compat",FS="@firebase/analytics-compat",US="@firebase/analytics",$S="@firebase/app-check-compat",BS="@firebase/app-check",HS="@firebase/auth",VS="@firebase/auth-compat",jS="@firebase/database",WS="@firebase/data-connect",qS="@firebase/database-compat",zS="@firebase/functions",GS="@firebase/functions-compat",KS="@firebase/installations",YS="@firebase/installations-compat",JS="@firebase/messaging",XS="@firebase/messaging-compat",QS="@firebase/performance",ZS="@firebase/performance-compat",eI="@firebase/remote-config",tI="@firebase/remote-config-compat",nI="@firebase/storage",iI="@firebase/storage-compat",sI="@firebase/firestore",rI="@firebase/ai",oI="@firebase/firestore-compat",aI="firebase",cI="12.8.0";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Kc="[DEFAULT]",lI={[Gc]:"fire-core",[xS]:"fire-core-compat",[US]:"fire-analytics",[FS]:"fire-analytics-compat",[BS]:"fire-app-check",[$S]:"fire-app-check-compat",[HS]:"fire-auth",[VS]:"fire-auth-compat",[jS]:"fire-rtdb",[WS]:"fire-data-connect",[qS]:"fire-rtdb-compat",[zS]:"fire-fn",[GS]:"fire-fn-compat",[KS]:"fire-iid",[YS]:"fire-iid-compat",[JS]:"fire-fcm",[XS]:"fire-fcm-compat",[QS]:"fire-perf",[ZS]:"fire-perf-compat",[eI]:"fire-rc",[tI]:"fire-rc-compat",[nI]:"fire-gcs",[iI]:"fire-gcs-compat",[sI]:"fire-fst",[oI]:"fire-fst-compat",[rI]:"fire-vertex","fire-js":"fire-js",[aI]:"fire-js-all"};/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const go=new Map,uI=new Map,Yc=new Map;function jh(t,e){try{t.container.addComponent(e)}catch(n){Gt.debug(`Component ${e.name} failed to register with FirebaseApp ${t.name}`,n)}}function st(t){const e=t.name;if(Yc.has(e))return Gt.debug(`There were multiple attempts to register component ${e}.`),!1;Yc.set(e,t);for(const n of go.values())jh(n,t);for(const n of uI.values())jh(n,t);return!0}function Dn(t,e){const n=t.container.getProvider("heartbeat").getImmediate({optional:!0});return n&&n.triggerHeartbeat(),t.container.getProvider(e)}function at(t){return t==null?!1:t.settings!==void 0}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const dI={"no-app":"No Firebase App '{$appName}' has been created - call initializeApp() first","bad-app-name":"Illegal App name: '{$appName}'","duplicate-app":"Firebase App named '{$appName}' already exists with different options or config","app-deleted":"Firebase App named '{$appName}' already deleted","server-app-deleted":"Firebase Server App has been deleted","no-options":"Need to provide options, when not being deployed to hosting via source.","invalid-app-argument":"firebase.{$appName}() takes either no argument or a Firebase App instance.","invalid-log-argument":"First argument to `onLog` must be null or a function.","idb-open":"Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.","idb-get":"Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.","idb-set":"Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.","idb-delete":"Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}.","finalization-registry-not-supported":"FirebaseServerApp deleteOnDeref field defined but the JS runtime does not support FinalizationRegistry.","invalid-server-app-environment":"FirebaseServerApp is not for use in browser environments."},_n=new On("app","Firebase",dI);/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class hI{constructor(e,n,i){this._isDeleted=!1,this._options={...e},this._config={...n},this._name=n.name,this._automaticDataCollectionEnabled=n.automaticDataCollectionEnabled,this._container=i,this.container.addComponent(new Je("app",()=>this,"PUBLIC"))}get automaticDataCollectionEnabled(){return this.checkDestroyed(),this._automaticDataCollectionEnabled}set automaticDataCollectionEnabled(e){this.checkDestroyed(),this._automaticDataCollectionEnabled=e}get name(){return this.checkDestroyed(),this._name}get options(){return this.checkDestroyed(),this._options}get config(){return this.checkDestroyed(),this._config}get container(){return this._container}get isDeleted(){return this._isDeleted}set isDeleted(e){this._isDeleted=e}checkDestroyed(){if(this.isDeleted)throw _n.create("app-deleted",{appName:this._name})}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ss=cI;function Bg(t,e={}){let n=t;typeof e!="object"&&(e={name:e});const i={name:Kc,automaticDataCollectionEnabled:!0,...e},s=i.name;if(typeof s!="string"||!s)throw _n.create("bad-app-name",{appName:String(s)});if(n||(n=Pg()),!n)throw _n.create("no-options");const r=go.get(s);if(r){if(ei(n,r.options)&&ei(i,r.config))return r;throw _n.create("duplicate-app",{appName:s})}const o=new wS(s);for(const c of Yc.values())o.addComponent(c);const a=new hI(n,i,o);return go.set(s,a),a}function ra(t=Kc){const e=go.get(t);if(!e&&t===Kc&&Pg())return Bg();if(!e)throw _n.create("no-app",{appName:t});return e}function Ke(t,e,n){let i=lI[t]??t;n&&(i+=`-${n}`);const s=i.match(/\s|\//),r=e.match(/\s|\//);if(s||r){const o=[`Unable to register library "${i}" with version "${e}":`];s&&o.push(`library name "${i}" contains illegal characters (whitespace or "/")`),s&&r&&o.push("and"),r&&o.push(`version name "${e}" contains illegal characters (whitespace or "/")`),Gt.warn(o.join(" "));return}st(new Je(`${i}-version`,()=>({library:i,version:e}),"VERSION"))}/**
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
 */const fI="firebase-heartbeat-database",pI=1,zs="firebase-heartbeat-store";let ic=null;function Hg(){return ic||(ic=sa(fI,pI,{upgrade:(t,e)=>{switch(e){case 0:try{t.createObjectStore(zs)}catch(n){console.warn(n)}}}}).catch(t=>{throw _n.create("idb-open",{originalErrorMessage:t.message})})),ic}async function gI(t){try{const n=(await Hg()).transaction(zs),i=await n.objectStore(zs).get(Vg(t));return await n.done,i}catch(e){if(e instanceof Zt)Gt.warn(e.message);else{const n=_n.create("idb-get",{originalErrorMessage:e?.message});Gt.warn(n.message)}}}async function Wh(t,e){try{const i=(await Hg()).transaction(zs,"readwrite");await i.objectStore(zs).put(e,Vg(t)),await i.done}catch(n){if(n instanceof Zt)Gt.warn(n.message);else{const i=_n.create("idb-set",{originalErrorMessage:n?.message});Gt.warn(i.message)}}}function Vg(t){return`${t.name}!${t.options.appId}`}/**
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
 */const mI=1024,_I=30;class yI{constructor(e){this.container=e,this._heartbeatsCache=null;const n=this.container.getProvider("app").getImmediate();this._storage=new vI(n),this._heartbeatsCachePromise=this._storage.read().then(i=>(this._heartbeatsCache=i,i))}async triggerHeartbeat(){try{const n=this.container.getProvider("platform-logger").getImmediate().getPlatformInfoString(),i=qh();if(this._heartbeatsCache?.heartbeats==null&&(this._heartbeatsCache=await this._heartbeatsCachePromise,this._heartbeatsCache?.heartbeats==null)||this._heartbeatsCache.lastSentHeartbeatDate===i||this._heartbeatsCache.heartbeats.some(s=>s.date===i))return;if(this._heartbeatsCache.heartbeats.push({date:i,agent:n}),this._heartbeatsCache.heartbeats.length>_I){const s=bI(this._heartbeatsCache.heartbeats);this._heartbeatsCache.heartbeats.splice(s,1)}return this._storage.overwrite(this._heartbeatsCache)}catch(e){Gt.warn(e)}}async getHeartbeatsHeader(){try{if(this._heartbeatsCache===null&&await this._heartbeatsCachePromise,this._heartbeatsCache?.heartbeats==null||this._heartbeatsCache.heartbeats.length===0)return"";const e=qh(),{heartbeatsToSend:n,unsentEntries:i}=wI(this._heartbeatsCache.heartbeats),s=uo(JSON.stringify({version:2,heartbeats:n}));return this._heartbeatsCache.lastSentHeartbeatDate=e,i.length>0?(this._heartbeatsCache.heartbeats=i,await this._storage.overwrite(this._heartbeatsCache)):(this._heartbeatsCache.heartbeats=[],this._storage.overwrite(this._heartbeatsCache)),s}catch(e){return Gt.warn(e),""}}}function qh(){return new Date().toISOString().substring(0,10)}function wI(t,e=mI){const n=[];let i=t.slice();for(const s of t){const r=n.find(o=>o.agent===s.agent);if(r){if(r.dates.push(s.date),zh(n)>e){r.dates.pop();break}}else if(n.push({agent:s.agent,dates:[s.date]}),zh(n)>e){n.pop();break}i=i.slice(1)}return{heartbeatsToSend:n,unsentEntries:i}}class vI{constructor(e){this.app=e,this._canUseIndexedDBPromise=this.runIndexedDBEnvironmentCheck()}async runIndexedDBEnvironmentCheck(){return ta()?xg().then(()=>!0).catch(()=>!1):!1}async read(){if(await this._canUseIndexedDBPromise){const n=await gI(this.app);return n?.heartbeats?n:{heartbeats:[]}}else return{heartbeats:[]}}async overwrite(e){if(await this._canUseIndexedDBPromise){const i=await this.read();return Wh(this.app,{lastSentHeartbeatDate:e.lastSentHeartbeatDate??i.lastSentHeartbeatDate,heartbeats:e.heartbeats})}else return}async add(e){if(await this._canUseIndexedDBPromise){const i=await this.read();return Wh(this.app,{lastSentHeartbeatDate:e.lastSentHeartbeatDate??i.lastSentHeartbeatDate,heartbeats:[...i.heartbeats,...e.heartbeats]})}else return}}function zh(t){return uo(JSON.stringify({version:2,heartbeats:t})).length}function bI(t){if(t.length===0)return-1;let e=0,n=t[0].date;for(let i=1;i<t.length;i++)t[i].date<n&&(n=t[i].date,e=i);return e}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function EI(t){st(new Je("platform-logger",e=>new DS(e),"PRIVATE")),st(new Je("heartbeat",e=>new yI(e),"PRIVATE")),Ke(Gc,Vh,t),Ke(Gc,Vh,"esm2020"),Ke("fire-js","")}EI("");var Gh={};const Kh="@firebase/database",Yh="1.1.0";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let jg="";function Wg(t){jg=t}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class CI{constructor(e){this.domStorage_=e,this.prefix_="firebase:"}set(e,n){n==null?this.domStorage_.removeItem(this.prefixedName_(e)):this.domStorage_.setItem(this.prefixedName_(e),me(n))}get(e){const n=this.domStorage_.getItem(this.prefixedName_(e));return n==null?null:qs(n)}remove(e){this.domStorage_.removeItem(this.prefixedName_(e))}prefixedName_(e){return this.prefix_+e}toString(){return this.domStorage_.toString()}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class TI{constructor(){this.cache_={},this.isInMemoryStorage=!0}set(e,n){n==null?delete this.cache_[e]:this.cache_[e]=n}get(e){return Lt(this.cache_,e)?this.cache_[e]:null}remove(e){delete this.cache_[e]}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const qg=function(t){try{if(typeof window<"u"&&typeof window[t]<"u"){const e=window[t];return e.setItem("firebase:sentinel","cache"),e.removeItem("firebase:sentinel"),new CI(e)}}catch{}return new TI},jn=qg("localStorage"),SI=qg("sessionStorage");/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ti=new ia("@firebase/database"),II=(function(){let t=1;return function(){return t++}})(),zg=function(t){const e=uS(t),n=new oS;n.update(e);const i=n.digest();return ea.encodeByteArray(i)},yr=function(...t){let e="";for(let n=0;n<t.length;n++){const i=t[n];Array.isArray(i)||i&&typeof i=="object"&&typeof i.length=="number"?e+=yr.apply(null,i):typeof i=="object"?e+=me(i):e+=i,e+=" "}return e};let Rs=null,Jh=!0;const kI=function(t,e){_(!0,"Can't turn on custom loggers persistently."),Ti.logLevel=G.VERBOSE,Rs=Ti.log.bind(Ti)},be=function(...t){if(Jh===!0&&(Jh=!1,Rs===null&&SI.get("logging_enabled")===!0&&kI()),Rs){const e=yr.apply(null,t);Rs(e)}},wr=function(t){return function(...e){be(t,...e)}},Jc=function(...t){const e="FIREBASE INTERNAL ERROR: "+yr(...t);Ti.error(e)},Kt=function(...t){const e=`FIREBASE FATAL ERROR: ${yr(...t)}`;throw Ti.error(e),new Error(e)},Be=function(...t){const e="FIREBASE WARNING: "+yr(...t);Ti.warn(e)},RI=function(){typeof window<"u"&&window.location&&window.location.protocol&&window.location.protocol.indexOf("https:")!==-1&&Be("Insecure Firebase access from a secure page. Please use https in calls to new Firebase().")},oa=function(t){return typeof t=="number"&&(t!==t||t===Number.POSITIVE_INFINITY||t===Number.NEGATIVE_INFINITY)},AI=function(t){if(document.readyState==="complete")t();else{let e=!1;const n=function(){if(!document.body){setTimeout(n,Math.floor(10));return}e||(e=!0,t())};document.addEventListener?(document.addEventListener("DOMContentLoaded",n,!1),window.addEventListener("load",n,!1)):document.attachEvent&&(document.attachEvent("onreadystatechange",()=>{document.readyState==="complete"&&n()}),window.attachEvent("onload",n))}},ji="[MIN_NAME]",ti="[MAX_NAME]",gi=function(t,e){if(t===e)return 0;if(t===ji||e===ti)return-1;if(e===ji||t===ti)return 1;{const n=Xh(t),i=Xh(e);return n!==null?i!==null?n-i===0?t.length-e.length:n-i:-1:i!==null?1:t<e?-1:1}},NI=function(t,e){return t===e?0:t<e?-1:1},ms=function(t,e){if(e&&t in e)return e[t];throw new Error("Missing required key ("+t+") in object: "+me(e))},eu=function(t){if(typeof t!="object"||t===null)return me(t);const e=[];for(const i in t)e.push(i);e.sort();let n="{";for(let i=0;i<e.length;i++)i!==0&&(n+=","),n+=me(e[i]),n+=":",n+=eu(t[e[i]]);return n+="}",n},Gg=function(t,e){const n=t.length;if(n<=e)return[t];const i=[];for(let s=0;s<n;s+=e)s+e>n?i.push(t.substring(s,n)):i.push(t.substring(s,s+e));return i};function Te(t,e){for(const n in t)t.hasOwnProperty(n)&&e(n,t[n])}const Kg=function(t){_(!oa(t),"Invalid JSON number");const e=11,n=52,i=(1<<e-1)-1;let s,r,o,a,c;t===0?(r=0,o=0,s=1/t===-1/0?1:0):(s=t<0,t=Math.abs(t),t>=Math.pow(2,1-i)?(a=Math.min(Math.floor(Math.log(t)/Math.LN2),i),r=a+i,o=Math.round(t*Math.pow(2,n-a)-Math.pow(2,n))):(r=0,o=Math.round(t/Math.pow(2,1-i-n))));const l=[];for(c=n;c;c-=1)l.push(o%2?1:0),o=Math.floor(o/2);for(c=e;c;c-=1)l.push(r%2?1:0),r=Math.floor(r/2);l.push(s?1:0),l.reverse();const u=l.join("");let d="";for(c=0;c<64;c+=8){let h=parseInt(u.substr(c,8),2).toString(16);h.length===1&&(h="0"+h),d=d+h}return d.toLowerCase()},PI=function(){return!!(typeof window=="object"&&window.chrome&&window.chrome.extension&&!/^chrome/.test(window.location.href))},LI=function(){return typeof Windows=="object"&&typeof Windows.UI=="object"};function OI(t,e){let n="Unknown Error";t==="too_big"?n="The data requested exceeds the maximum size that can be accessed with a single request.":t==="permission_denied"?n="Client doesn't have permission to access the desired data.":t==="unavailable"&&(n="The service is unavailable");const i=new Error(t+" at "+e._path.toString()+": "+n);return i.code=t.toUpperCase(),i}const DI=new RegExp("^-?(0*)\\d{1,10}$"),MI=-2147483648,xI=2147483647,Xh=function(t){if(DI.test(t)){const e=Number(t);if(e>=MI&&e<=xI)return e}return null},rs=function(t){try{t()}catch(e){setTimeout(()=>{const n=e.stack||"";throw Be("Exception was thrown by user callback.",n),e},Math.floor(0))}},FI=function(){return(typeof window=="object"&&window.navigator&&window.navigator.userAgent||"").search(/googlebot|google webmaster tools|bingbot|yahoo! slurp|baiduspider|yandexbot|duckduckbot/i)>=0},As=function(t,e){const n=setTimeout(t,e);return typeof n=="number"&&typeof Deno<"u"&&Deno.unrefTimer?Deno.unrefTimer(n):typeof n=="object"&&n.unref&&n.unref(),n};/**
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
 */class UI{constructor(e,n){this.appCheckProvider=n,this.appName=e.name,at(e)&&e.settings.appCheckToken&&(this.serverAppAppCheckToken=e.settings.appCheckToken),this.appCheck=n?.getImmediate({optional:!0}),this.appCheck||n?.get().then(i=>this.appCheck=i)}getToken(e){if(this.serverAppAppCheckToken){if(e)throw new Error("Attempted reuse of `FirebaseServerApp.appCheckToken` after previous usage failed.");return Promise.resolve({token:this.serverAppAppCheckToken})}return this.appCheck?this.appCheck.getToken(e):new Promise((n,i)=>{setTimeout(()=>{this.appCheck?this.getToken(e).then(n,i):n(null)},0)})}addTokenChangeListener(e){this.appCheckProvider?.get().then(n=>n.addTokenListener(e))}notifyForInvalidToken(){Be(`Provided AppCheck credentials for the app named "${this.appName}" are invalid. This usually indicates your app was not initialized correctly.`)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class $I{constructor(e,n,i){this.appName_=e,this.firebaseOptions_=n,this.authProvider_=i,this.auth_=null,this.auth_=i.getImmediate({optional:!0}),this.auth_||i.onInit(s=>this.auth_=s)}getToken(e){return this.auth_?this.auth_.getToken(e).catch(n=>n&&n.code==="auth/token-not-initialized"?(be("Got auth/token-not-initialized error.  Treating as null token."),null):Promise.reject(n)):new Promise((n,i)=>{setTimeout(()=>{this.auth_?this.getToken(e).then(n,i):n(null)},0)})}addTokenChangeListener(e){this.auth_?this.auth_.addAuthTokenListener(e):this.authProvider_.get().then(n=>n.addAuthTokenListener(e))}removeTokenChangeListener(e){this.authProvider_.get().then(n=>n.removeAuthTokenListener(e))}notifyForInvalidToken(){let e='Provided authentication credentials for the app named "'+this.appName_+'" are invalid. This usually indicates your app was not initialized correctly. ';"credential"in this.firebaseOptions_?e+='Make sure the "credential" property provided to initializeApp() is authorized to access the specified "databaseURL" and is from the correct project.':"serviceAccount"in this.firebaseOptions_?e+='Make sure the "serviceAccount" property provided to initializeApp() is authorized to access the specified "databaseURL" and is from the correct project.':e+='Make sure the "apiKey" and "databaseURL" properties provided to initializeApp() match the values provided for your app at https://console.firebase.google.com/.',Be(e)}}class Xr{constructor(e){this.accessToken=e}getToken(e){return Promise.resolve({accessToken:this.accessToken})}addTokenChangeListener(e){e(this.accessToken)}removeTokenChangeListener(e){}notifyForInvalidToken(){}}Xr.OWNER="owner";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const tu="5",Yg="v",Jg="s",Xg="r",Qg="f",Zg=/(console\.firebase|firebase-console-\w+\.corp|firebase\.corp)\.google\.com/,em="ls",tm="p",Xc="ac",nm="websocket",im="long_polling";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class sm{constructor(e,n,i,s,r=!1,o="",a=!1,c=!1,l=null){this.secure=n,this.namespace=i,this.webSocketOnly=s,this.nodeAdmin=r,this.persistenceKey=o,this.includeNamespaceInQueryParams=a,this.isUsingEmulator=c,this.emulatorOptions=l,this._host=e.toLowerCase(),this._domain=this._host.substr(this._host.indexOf(".")+1),this.internalHost=jn.get("host:"+e)||this._host}isCacheableHost(){return this.internalHost.substr(0,2)==="s-"}isCustomHost(){return this._domain!=="firebaseio.com"&&this._domain!=="firebaseio-demo.com"}get host(){return this._host}set host(e){e!==this.internalHost&&(this.internalHost=e,this.isCacheableHost()&&jn.set("host:"+this._host,this.internalHost))}toString(){let e=this.toURLString();return this.persistenceKey&&(e+="<"+this.persistenceKey+">"),e}toURLString(){const e=this.secure?"https://":"http://",n=this.includeNamespaceInQueryParams?`?ns=${this.namespace}`:"";return`${e}${this.host}/${n}`}}function BI(t){return t.host!==t.internalHost||t.isCustomHost()||t.includeNamespaceInQueryParams}function rm(t,e,n){_(typeof e=="string","typeof type must == string"),_(typeof n=="object","typeof params must == object");let i;if(e===nm)i=(t.secure?"wss://":"ws://")+t.internalHost+"/.ws?";else if(e===im)i=(t.secure?"https://":"http://")+t.internalHost+"/.lp?";else throw new Error("Unknown connection type: "+e);BI(t)&&(n.ns=t.namespace);const s=[];return Te(n,(r,o)=>{s.push(r+"="+o)}),i+s.join("&")}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class HI{constructor(){this.counters_={}}incrementCounter(e,n=1){Lt(this.counters_,e)||(this.counters_[e]=0),this.counters_[e]+=n}get(){return HT(this.counters_)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const sc={},rc={};function nu(t){const e=t.toString();return sc[e]||(sc[e]=new HI),sc[e]}function VI(t,e){const n=t.toString();return rc[n]||(rc[n]=e()),rc[n]}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class jI{constructor(e){this.onMessage_=e,this.pendingResponses=[],this.currentResponseNum=0,this.closeAfterResponse=-1,this.onClose=null}closeAfter(e,n){this.closeAfterResponse=e,this.onClose=n,this.closeAfterResponse<this.currentResponseNum&&(this.onClose(),this.onClose=null)}handleResponse(e,n){for(this.pendingResponses[e]=n;this.pendingResponses[this.currentResponseNum];){const i=this.pendingResponses[this.currentResponseNum];delete this.pendingResponses[this.currentResponseNum];for(let s=0;s<i.length;++s)i[s]&&rs(()=>{this.onMessage_(i[s])});if(this.currentResponseNum===this.closeAfterResponse){this.onClose&&(this.onClose(),this.onClose=null);break}this.currentResponseNum++}}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Qh="start",WI="close",qI="pLPCommand",zI="pRTLPCB",om="id",am="pw",cm="ser",GI="cb",KI="seg",YI="ts",JI="d",XI="dframe",lm=1870,um=30,QI=lm-um,ZI=25e3,ek=3e4;class Ei{constructor(e,n,i,s,r,o,a){this.connId=e,this.repoInfo=n,this.applicationId=i,this.appCheckToken=s,this.authToken=r,this.transportSessionId=o,this.lastSessionId=a,this.bytesSent=0,this.bytesReceived=0,this.everConnected_=!1,this.log_=wr(e),this.stats_=nu(n),this.urlFn=c=>(this.appCheckToken&&(c[Xc]=this.appCheckToken),rm(n,im,c))}open(e,n){this.curSegmentNum=0,this.onDisconnect_=n,this.myPacketOrderer=new jI(e),this.isClosed_=!1,this.connectTimeoutTimer_=setTimeout(()=>{this.log_("Timed out trying to connect."),this.onClosed_(),this.connectTimeoutTimer_=null},Math.floor(ek)),AI(()=>{if(this.isClosed_)return;this.scriptTagHolder=new iu((...r)=>{const[o,a,c,l,u]=r;if(this.incrementIncomingBytes_(r),!!this.scriptTagHolder)if(this.connectTimeoutTimer_&&(clearTimeout(this.connectTimeoutTimer_),this.connectTimeoutTimer_=null),this.everConnected_=!0,o===Qh)this.id=a,this.password=c;else if(o===WI)a?(this.scriptTagHolder.sendNewPolls=!1,this.myPacketOrderer.closeAfter(a,()=>{this.onClosed_()})):this.onClosed_();else throw new Error("Unrecognized command received: "+o)},(...r)=>{const[o,a]=r;this.incrementIncomingBytes_(r),this.myPacketOrderer.handleResponse(o,a)},()=>{this.onClosed_()},this.urlFn);const i={};i[Qh]="t",i[cm]=Math.floor(Math.random()*1e8),this.scriptTagHolder.uniqueCallbackIdentifier&&(i[GI]=this.scriptTagHolder.uniqueCallbackIdentifier),i[Yg]=tu,this.transportSessionId&&(i[Jg]=this.transportSessionId),this.lastSessionId&&(i[em]=this.lastSessionId),this.applicationId&&(i[tm]=this.applicationId),this.appCheckToken&&(i[Xc]=this.appCheckToken),typeof location<"u"&&location.hostname&&Zg.test(location.hostname)&&(i[Xg]=Qg);const s=this.urlFn(i);this.log_("Connecting via long-poll to "+s),this.scriptTagHolder.addTag(s,()=>{})})}start(){this.scriptTagHolder.startLongPoll(this.id,this.password),this.addDisconnectPingFrame(this.id,this.password)}static forceAllow(){Ei.forceAllow_=!0}static forceDisallow(){Ei.forceDisallow_=!0}static isAvailable(){return Ei.forceAllow_?!0:!Ei.forceDisallow_&&typeof document<"u"&&document.createElement!=null&&!PI()&&!LI()}markConnectionHealthy(){}shutdown_(){this.isClosed_=!0,this.scriptTagHolder&&(this.scriptTagHolder.close(),this.scriptTagHolder=null),this.myDisconnFrame&&(document.body.removeChild(this.myDisconnFrame),this.myDisconnFrame=null),this.connectTimeoutTimer_&&(clearTimeout(this.connectTimeoutTimer_),this.connectTimeoutTimer_=null)}onClosed_(){this.isClosed_||(this.log_("Longpoll is closing itself"),this.shutdown_(),this.onDisconnect_&&(this.onDisconnect_(this.everConnected_),this.onDisconnect_=null))}close(){this.isClosed_||(this.log_("Longpoll is being closed."),this.shutdown_())}send(e){const n=me(e);this.bytesSent+=n.length,this.stats_.incrementCounter("bytes_sent",n.length);const i=kg(n),s=Gg(i,QI);for(let r=0;r<s.length;r++)this.scriptTagHolder.enqueueSegment(this.curSegmentNum,s.length,s[r]),this.curSegmentNum++}addDisconnectPingFrame(e,n){this.myDisconnFrame=document.createElement("iframe");const i={};i[XI]="t",i[om]=e,i[am]=n,this.myDisconnFrame.src=this.urlFn(i),this.myDisconnFrame.style.display="none",document.body.appendChild(this.myDisconnFrame)}incrementIncomingBytes_(e){const n=me(e).length;this.bytesReceived+=n,this.stats_.incrementCounter("bytes_received",n)}}class iu{constructor(e,n,i,s){this.onDisconnect=i,this.urlFn=s,this.outstandingRequests=new Set,this.pendingSegs=[],this.currentSerial=Math.floor(Math.random()*1e8),this.sendNewPolls=!0;{this.uniqueCallbackIdentifier=II(),window[qI+this.uniqueCallbackIdentifier]=e,window[zI+this.uniqueCallbackIdentifier]=n,this.myIFrame=iu.createIFrame_();let r="";this.myIFrame.src&&this.myIFrame.src.substr(0,11)==="javascript:"&&(r='<script>document.domain="'+document.domain+'";<\/script>');const o="<html><body>"+r+"</body></html>";try{this.myIFrame.doc.open(),this.myIFrame.doc.write(o),this.myIFrame.doc.close()}catch(a){be("frame writing exception"),a.stack&&be(a.stack),be(a)}}}static createIFrame_(){const e=document.createElement("iframe");if(e.style.display="none",document.body){document.body.appendChild(e);try{e.contentWindow.document||be("No IE domain setting required")}catch{const i=document.domain;e.src="javascript:void((function(){document.open();document.domain='"+i+"';document.close();})())"}}else throw"Document body has not initialized. Wait to initialize Firebase until after the document is ready.";return e.contentDocument?e.doc=e.contentDocument:e.contentWindow?e.doc=e.contentWindow.document:e.document&&(e.doc=e.document),e}close(){this.alive=!1,this.myIFrame&&(this.myIFrame.doc.body.textContent="",setTimeout(()=>{this.myIFrame!==null&&(document.body.removeChild(this.myIFrame),this.myIFrame=null)},Math.floor(0)));const e=this.onDisconnect;e&&(this.onDisconnect=null,e())}startLongPoll(e,n){for(this.myID=e,this.myPW=n,this.alive=!0;this.newRequest_(););}newRequest_(){if(this.alive&&this.sendNewPolls&&this.outstandingRequests.size<(this.pendingSegs.length>0?2:1)){this.currentSerial++;const e={};e[om]=this.myID,e[am]=this.myPW,e[cm]=this.currentSerial;let n=this.urlFn(e),i="",s=0;for(;this.pendingSegs.length>0&&this.pendingSegs[0].d.length+um+i.length<=lm;){const o=this.pendingSegs.shift();i=i+"&"+KI+s+"="+o.seg+"&"+YI+s+"="+o.ts+"&"+JI+s+"="+o.d,s++}return n=n+i,this.addLongPollTag_(n,this.currentSerial),!0}else return!1}enqueueSegment(e,n,i){this.pendingSegs.push({seg:e,ts:n,d:i}),this.alive&&this.newRequest_()}addLongPollTag_(e,n){this.outstandingRequests.add(n);const i=()=>{this.outstandingRequests.delete(n),this.newRequest_()},s=setTimeout(i,Math.floor(ZI)),r=()=>{clearTimeout(s),i()};this.addTag(e,r)}addTag(e,n){setTimeout(()=>{try{if(!this.sendNewPolls)return;const i=this.myIFrame.doc.createElement("script");i.type="text/javascript",i.async=!0,i.src=e,i.onload=i.onreadystatechange=function(){const s=i.readyState;(!s||s==="loaded"||s==="complete")&&(i.onload=i.onreadystatechange=null,i.parentNode&&i.parentNode.removeChild(i),n())},i.onerror=()=>{be("Long-poll script failed to load: "+e),this.sendNewPolls=!1,this.close()},this.myIFrame.doc.body.appendChild(i)}catch{}},Math.floor(1))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const tk=16384,nk=45e3;let mo=null;typeof MozWebSocket<"u"?mo=MozWebSocket:typeof WebSocket<"u"&&(mo=WebSocket);class ct{constructor(e,n,i,s,r,o,a){this.connId=e,this.applicationId=i,this.appCheckToken=s,this.authToken=r,this.keepaliveTimer=null,this.frames=null,this.totalFrames=0,this.bytesSent=0,this.bytesReceived=0,this.log_=wr(this.connId),this.stats_=nu(n),this.connURL=ct.connectionURL_(n,o,a,s,i),this.nodeAdmin=n.nodeAdmin}static connectionURL_(e,n,i,s,r){const o={};return o[Yg]=tu,typeof location<"u"&&location.hostname&&Zg.test(location.hostname)&&(o[Xg]=Qg),n&&(o[Jg]=n),i&&(o[em]=i),s&&(o[Xc]=s),r&&(o[tm]=r),rm(e,nm,o)}open(e,n){this.onDisconnect=n,this.onMessage=e,this.log_("Websocket connecting to "+this.connURL),this.everConnected_=!1,jn.set("previous_websocket_failure",!0);try{let i;ZT(),this.mySock=new mo(this.connURL,[],i)}catch(i){this.log_("Error instantiating WebSocket.");const s=i.message||i.data;s&&this.log_(s),this.onClosed_();return}this.mySock.onopen=()=>{this.log_("Websocket connected."),this.everConnected_=!0},this.mySock.onclose=()=>{this.log_("Websocket connection was disconnected."),this.mySock=null,this.onClosed_()},this.mySock.onmessage=i=>{this.handleIncomingFrame(i)},this.mySock.onerror=i=>{this.log_("WebSocket error.  Closing connection.");const s=i.message||i.data;s&&this.log_(s),this.onClosed_()}}start(){}static forceDisallow(){ct.forceDisallow_=!0}static isAvailable(){let e=!1;if(typeof navigator<"u"&&navigator.userAgent){const n=/Android ([0-9]{0,}\.[0-9]{0,})/,i=navigator.userAgent.match(n);i&&i.length>1&&parseFloat(i[1])<4.4&&(e=!0)}return!e&&mo!==null&&!ct.forceDisallow_}static previouslyFailed(){return jn.isInMemoryStorage||jn.get("previous_websocket_failure")===!0}markConnectionHealthy(){jn.remove("previous_websocket_failure")}appendFrame_(e){if(this.frames.push(e),this.frames.length===this.totalFrames){const n=this.frames.join("");this.frames=null;const i=qs(n);this.onMessage(i)}}handleNewFrameCount_(e){this.totalFrames=e,this.frames=[]}extractFrameCount_(e){if(_(this.frames===null,"We already have a frame buffer"),e.length<=6){const n=Number(e);if(!isNaN(n))return this.handleNewFrameCount_(n),null}return this.handleNewFrameCount_(1),e}handleIncomingFrame(e){if(this.mySock===null)return;const n=e.data;if(this.bytesReceived+=n.length,this.stats_.incrementCounter("bytes_received",n.length),this.resetKeepAlive(),this.frames!==null)this.appendFrame_(n);else{const i=this.extractFrameCount_(n);i!==null&&this.appendFrame_(i)}}send(e){this.resetKeepAlive();const n=me(e);this.bytesSent+=n.length,this.stats_.incrementCounter("bytes_sent",n.length);const i=Gg(n,tk);i.length>1&&this.sendString_(String(i.length));for(let s=0;s<i.length;s++)this.sendString_(i[s])}shutdown_(){this.isClosed_=!0,this.keepaliveTimer&&(clearInterval(this.keepaliveTimer),this.keepaliveTimer=null),this.mySock&&(this.mySock.close(),this.mySock=null)}onClosed_(){this.isClosed_||(this.log_("WebSocket is closing itself"),this.shutdown_(),this.onDisconnect&&(this.onDisconnect(this.everConnected_),this.onDisconnect=null))}close(){this.isClosed_||(this.log_("WebSocket is being closed"),this.shutdown_())}resetKeepAlive(){clearInterval(this.keepaliveTimer),this.keepaliveTimer=setInterval(()=>{this.mySock&&this.sendString_("0"),this.resetKeepAlive()},Math.floor(nk))}sendString_(e){try{this.mySock.send(e)}catch(n){this.log_("Exception thrown from WebSocket.send():",n.message||n.data,"Closing connection."),setTimeout(this.onClosed_.bind(this),0)}}}ct.responsesRequiredToBeHealthy=2;ct.healthyTimeout=3e4;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Gs{static get ALL_TRANSPORTS(){return[Ei,ct]}static get IS_TRANSPORT_INITIALIZED(){return this.globalTransportInitialized_}constructor(e){this.initTransports_(e)}initTransports_(e){const n=ct&&ct.isAvailable();let i=n&&!ct.previouslyFailed();if(e.webSocketOnly&&(n||Be("wss:// URL used, but browser isn't known to support websockets.  Trying anyway."),i=!0),i)this.transports_=[ct];else{const s=this.transports_=[];for(const r of Gs.ALL_TRANSPORTS)r&&r.isAvailable()&&s.push(r);Gs.globalTransportInitialized_=!0}}initialTransport(){if(this.transports_.length>0)return this.transports_[0];throw new Error("No transports available")}upgradeTransport(){return this.transports_.length>1?this.transports_[1]:null}}Gs.globalTransportInitialized_=!1;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ik=6e4,sk=5e3,rk=10*1024,ok=100*1024,oc="t",Zh="d",ak="s",ef="r",ck="e",tf="o",nf="a",sf="n",rf="p",lk="h";class uk{constructor(e,n,i,s,r,o,a,c,l,u){this.id=e,this.repoInfo_=n,this.applicationId_=i,this.appCheckToken_=s,this.authToken_=r,this.onMessage_=o,this.onReady_=a,this.onDisconnect_=c,this.onKill_=l,this.lastSessionId=u,this.connectionCount=0,this.pendingDataMessages=[],this.state_=0,this.log_=wr("c:"+this.id+":"),this.transportManager_=new Gs(n),this.log_("Connection created"),this.start_()}start_(){const e=this.transportManager_.initialTransport();this.conn_=new e(this.nextTransportId_(),this.repoInfo_,this.applicationId_,this.appCheckToken_,this.authToken_,null,this.lastSessionId),this.primaryResponsesRequired_=e.responsesRequiredToBeHealthy||0;const n=this.connReceiver_(this.conn_),i=this.disconnReceiver_(this.conn_);this.tx_=this.conn_,this.rx_=this.conn_,this.secondaryConn_=null,this.isHealthy_=!1,setTimeout(()=>{this.conn_&&this.conn_.open(n,i)},Math.floor(0));const s=e.healthyTimeout||0;s>0&&(this.healthyTimeout_=As(()=>{this.healthyTimeout_=null,this.isHealthy_||(this.conn_&&this.conn_.bytesReceived>ok?(this.log_("Connection exceeded healthy timeout but has received "+this.conn_.bytesReceived+" bytes.  Marking connection healthy."),this.isHealthy_=!0,this.conn_.markConnectionHealthy()):this.conn_&&this.conn_.bytesSent>rk?this.log_("Connection exceeded healthy timeout but has sent "+this.conn_.bytesSent+" bytes.  Leaving connection alive."):(this.log_("Closing unhealthy connection after timeout."),this.close()))},Math.floor(s)))}nextTransportId_(){return"c:"+this.id+":"+this.connectionCount++}disconnReceiver_(e){return n=>{e===this.conn_?this.onConnectionLost_(n):e===this.secondaryConn_?(this.log_("Secondary connection lost."),this.onSecondaryConnectionLost_()):this.log_("closing an old connection")}}connReceiver_(e){return n=>{this.state_!==2&&(e===this.rx_?this.onPrimaryMessageReceived_(n):e===this.secondaryConn_?this.onSecondaryMessageReceived_(n):this.log_("message on old connection"))}}sendRequest(e){const n={t:"d",d:e};this.sendData_(n)}tryCleanupConnection(){this.tx_===this.secondaryConn_&&this.rx_===this.secondaryConn_&&(this.log_("cleaning up and promoting a connection: "+this.secondaryConn_.connId),this.conn_=this.secondaryConn_,this.secondaryConn_=null)}onSecondaryControl_(e){if(oc in e){const n=e[oc];n===nf?this.upgradeIfSecondaryHealthy_():n===ef?(this.log_("Got a reset on secondary, closing it"),this.secondaryConn_.close(),(this.tx_===this.secondaryConn_||this.rx_===this.secondaryConn_)&&this.close()):n===tf&&(this.log_("got pong on secondary."),this.secondaryResponsesRequired_--,this.upgradeIfSecondaryHealthy_())}}onSecondaryMessageReceived_(e){const n=ms("t",e),i=ms("d",e);if(n==="c")this.onSecondaryControl_(i);else if(n==="d")this.pendingDataMessages.push(i);else throw new Error("Unknown protocol layer: "+n)}upgradeIfSecondaryHealthy_(){this.secondaryResponsesRequired_<=0?(this.log_("Secondary connection is healthy."),this.isHealthy_=!0,this.secondaryConn_.markConnectionHealthy(),this.proceedWithUpgrade_()):(this.log_("sending ping on secondary."),this.secondaryConn_.send({t:"c",d:{t:rf,d:{}}}))}proceedWithUpgrade_(){this.secondaryConn_.start(),this.log_("sending client ack on secondary"),this.secondaryConn_.send({t:"c",d:{t:nf,d:{}}}),this.log_("Ending transmission on primary"),this.conn_.send({t:"c",d:{t:sf,d:{}}}),this.tx_=this.secondaryConn_,this.tryCleanupConnection()}onPrimaryMessageReceived_(e){const n=ms("t",e),i=ms("d",e);n==="c"?this.onControl_(i):n==="d"&&this.onDataMessage_(i)}onDataMessage_(e){this.onPrimaryResponse_(),this.onMessage_(e)}onPrimaryResponse_(){this.isHealthy_||(this.primaryResponsesRequired_--,this.primaryResponsesRequired_<=0&&(this.log_("Primary connection is healthy."),this.isHealthy_=!0,this.conn_.markConnectionHealthy()))}onControl_(e){const n=ms(oc,e);if(Zh in e){const i=e[Zh];if(n===lk){const s={...i};this.repoInfo_.isUsingEmulator&&(s.h=this.repoInfo_.host),this.onHandshake_(s)}else if(n===sf){this.log_("recvd end transmission on primary"),this.rx_=this.secondaryConn_;for(let s=0;s<this.pendingDataMessages.length;++s)this.onDataMessage_(this.pendingDataMessages[s]);this.pendingDataMessages=[],this.tryCleanupConnection()}else n===ak?this.onConnectionShutdown_(i):n===ef?this.onReset_(i):n===ck?Jc("Server Error: "+i):n===tf?(this.log_("got pong on primary."),this.onPrimaryResponse_(),this.sendPingOnPrimaryIfNecessary_()):Jc("Unknown control packet command: "+n)}}onHandshake_(e){const n=e.ts,i=e.v,s=e.h;this.sessionId=e.s,this.repoInfo_.host=s,this.state_===0&&(this.conn_.start(),this.onConnectionEstablished_(this.conn_,n),tu!==i&&Be("Protocol version mismatch detected"),this.tryStartUpgrade_())}tryStartUpgrade_(){const e=this.transportManager_.upgradeTransport();e&&this.startUpgrade_(e)}startUpgrade_(e){this.secondaryConn_=new e(this.nextTransportId_(),this.repoInfo_,this.applicationId_,this.appCheckToken_,this.authToken_,this.sessionId),this.secondaryResponsesRequired_=e.responsesRequiredToBeHealthy||0;const n=this.connReceiver_(this.secondaryConn_),i=this.disconnReceiver_(this.secondaryConn_);this.secondaryConn_.open(n,i),As(()=>{this.secondaryConn_&&(this.log_("Timed out trying to upgrade."),this.secondaryConn_.close())},Math.floor(ik))}onReset_(e){this.log_("Reset packet received.  New host: "+e),this.repoInfo_.host=e,this.state_===1?this.close():(this.closeConnections_(),this.start_())}onConnectionEstablished_(e,n){this.log_("Realtime connection established."),this.conn_=e,this.state_=1,this.onReady_&&(this.onReady_(n,this.sessionId),this.onReady_=null),this.primaryResponsesRequired_===0?(this.log_("Primary connection is healthy."),this.isHealthy_=!0):As(()=>{this.sendPingOnPrimaryIfNecessary_()},Math.floor(sk))}sendPingOnPrimaryIfNecessary_(){!this.isHealthy_&&this.state_===1&&(this.log_("sending ping on primary."),this.sendData_({t:"c",d:{t:rf,d:{}}}))}onSecondaryConnectionLost_(){const e=this.secondaryConn_;this.secondaryConn_=null,(this.tx_===e||this.rx_===e)&&this.close()}onConnectionLost_(e){this.conn_=null,!e&&this.state_===0?(this.log_("Realtime connection failed."),this.repoInfo_.isCacheableHost()&&(jn.remove("host:"+this.repoInfo_.host),this.repoInfo_.internalHost=this.repoInfo_.host)):this.state_===1&&this.log_("Realtime connection lost."),this.close()}onConnectionShutdown_(e){this.log_("Connection shutdown command received. Shutting down..."),this.onKill_&&(this.onKill_(e),this.onKill_=null),this.onDisconnect_=null,this.close()}sendData_(e){if(this.state_!==1)throw"Connection is not connected";this.tx_.send(e)}close(){this.state_!==2&&(this.log_("Closing realtime connection."),this.state_=2,this.closeConnections_(),this.onDisconnect_&&(this.onDisconnect_(),this.onDisconnect_=null))}closeConnections_(){this.log_("Shutting down all connections"),this.conn_&&(this.conn_.close(),this.conn_=null),this.secondaryConn_&&(this.secondaryConn_.close(),this.secondaryConn_=null),this.healthyTimeout_&&(clearTimeout(this.healthyTimeout_),this.healthyTimeout_=null)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class dm{put(e,n,i,s){}merge(e,n,i,s){}refreshAuthToken(e){}refreshAppCheckToken(e){}onDisconnectPut(e,n,i){}onDisconnectMerge(e,n,i){}onDisconnectCancel(e,n){}reportStats(e){}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class hm{constructor(e){this.allowedEvents_=e,this.listeners_={},_(Array.isArray(e)&&e.length>0,"Requires a non-empty array")}trigger(e,...n){if(Array.isArray(this.listeners_[e])){const i=[...this.listeners_[e]];for(let s=0;s<i.length;s++)i[s].callback.apply(i[s].context,n)}}on(e,n,i){this.validateEventType_(e),this.listeners_[e]=this.listeners_[e]||[],this.listeners_[e].push({callback:n,context:i});const s=this.getInitialEvent(e);s&&n.apply(i,s)}off(e,n,i){this.validateEventType_(e);const s=this.listeners_[e]||[];for(let r=0;r<s.length;r++)if(s[r].callback===n&&(!i||i===s[r].context)){s.splice(r,1);return}}validateEventType_(e){_(this.allowedEvents_.find(n=>n===e),"Unknown event: "+e)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class _o extends hm{static getInstance(){return new _o}constructor(){super(["online"]),this.online_=!0,typeof window<"u"&&typeof window.addEventListener<"u"&&!Ql()&&(window.addEventListener("online",()=>{this.online_||(this.online_=!0,this.trigger("online",!0))},!1),window.addEventListener("offline",()=>{this.online_&&(this.online_=!1,this.trigger("online",!1))},!1))}getInitialEvent(e){return _(e==="online","Unknown event type: "+e),[this.online_]}currentlyOnline(){return this.online_}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const of=32,af=768;class z{constructor(e,n){if(n===void 0){this.pieces_=e.split("/");let i=0;for(let s=0;s<this.pieces_.length;s++)this.pieces_[s].length>0&&(this.pieces_[i]=this.pieces_[s],i++);this.pieces_.length=i,this.pieceNum_=0}else this.pieces_=e,this.pieceNum_=n}toString(){let e="";for(let n=this.pieceNum_;n<this.pieces_.length;n++)this.pieces_[n]!==""&&(e+="/"+this.pieces_[n]);return e||"/"}}function H(){return new z("")}function M(t){return t.pieceNum_>=t.pieces_.length?null:t.pieces_[t.pieceNum_]}function Sn(t){return t.pieces_.length-t.pieceNum_}function Y(t){let e=t.pieceNum_;return e<t.pieces_.length&&e++,new z(t.pieces_,e)}function su(t){return t.pieceNum_<t.pieces_.length?t.pieces_[t.pieces_.length-1]:null}function dk(t){let e="";for(let n=t.pieceNum_;n<t.pieces_.length;n++)t.pieces_[n]!==""&&(e+="/"+encodeURIComponent(String(t.pieces_[n])));return e||"/"}function Ks(t,e=0){return t.pieces_.slice(t.pieceNum_+e)}function fm(t){if(t.pieceNum_>=t.pieces_.length)return null;const e=[];for(let n=t.pieceNum_;n<t.pieces_.length-1;n++)e.push(t.pieces_[n]);return new z(e,0)}function ie(t,e){const n=[];for(let i=t.pieceNum_;i<t.pieces_.length;i++)n.push(t.pieces_[i]);if(e instanceof z)for(let i=e.pieceNum_;i<e.pieces_.length;i++)n.push(e.pieces_[i]);else{const i=e.split("/");for(let s=0;s<i.length;s++)i[s].length>0&&n.push(i[s])}return new z(n,0)}function x(t){return t.pieceNum_>=t.pieces_.length}function Fe(t,e){const n=M(t),i=M(e);if(n===null)return e;if(n===i)return Fe(Y(t),Y(e));throw new Error("INTERNAL ERROR: innerPath ("+e+") is not within outerPath ("+t+")")}function hk(t,e){const n=Ks(t,0),i=Ks(e,0);for(let s=0;s<n.length&&s<i.length;s++){const r=gi(n[s],i[s]);if(r!==0)return r}return n.length===i.length?0:n.length<i.length?-1:1}function ru(t,e){if(Sn(t)!==Sn(e))return!1;for(let n=t.pieceNum_,i=e.pieceNum_;n<=t.pieces_.length;n++,i++)if(t.pieces_[n]!==e.pieces_[i])return!1;return!0}function et(t,e){let n=t.pieceNum_,i=e.pieceNum_;if(Sn(t)>Sn(e))return!1;for(;n<t.pieces_.length;){if(t.pieces_[n]!==e.pieces_[i])return!1;++n,++i}return!0}class fk{constructor(e,n){this.errorPrefix_=n,this.parts_=Ks(e,0),this.byteLength_=Math.max(1,this.parts_.length);for(let i=0;i<this.parts_.length;i++)this.byteLength_+=na(this.parts_[i]);pm(this)}}function pk(t,e){t.parts_.length>0&&(t.byteLength_+=1),t.parts_.push(e),t.byteLength_+=na(e),pm(t)}function gk(t){const e=t.parts_.pop();t.byteLength_-=na(e),t.parts_.length>0&&(t.byteLength_-=1)}function pm(t){if(t.byteLength_>af)throw new Error(t.errorPrefix_+"has a key path longer than "+af+" bytes ("+t.byteLength_+").");if(t.parts_.length>of)throw new Error(t.errorPrefix_+"path specified exceeds the maximum depth that can be written ("+of+") or object contains a cycle "+Bn(t))}function Bn(t){return t.parts_.length===0?"":"in property '"+t.parts_.join(".")+"'"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ou extends hm{static getInstance(){return new ou}constructor(){super(["visible"]);let e,n;typeof document<"u"&&typeof document.addEventListener<"u"&&(typeof document.hidden<"u"?(n="visibilitychange",e="hidden"):typeof document.mozHidden<"u"?(n="mozvisibilitychange",e="mozHidden"):typeof document.msHidden<"u"?(n="msvisibilitychange",e="msHidden"):typeof document.webkitHidden<"u"&&(n="webkitvisibilitychange",e="webkitHidden")),this.visible_=!0,n&&document.addEventListener(n,()=>{const i=!document[e];i!==this.visible_&&(this.visible_=i,this.trigger("visible",i))},!1)}getInitialEvent(e){return _(e==="visible","Unknown event type: "+e),[this.visible_]}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const _s=1e3,mk=300*1e3,cf=30*1e3,_k=1.3,yk=3e4,wk="server_kill",lf=3;class qt extends dm{constructor(e,n,i,s,r,o,a,c){if(super(),this.repoInfo_=e,this.applicationId_=n,this.onDataUpdate_=i,this.onConnectStatus_=s,this.onServerInfoUpdate_=r,this.authTokenProvider_=o,this.appCheckTokenProvider_=a,this.authOverride_=c,this.id=qt.nextPersistentConnectionId_++,this.log_=wr("p:"+this.id+":"),this.interruptReasons_={},this.listens=new Map,this.outstandingPuts_=[],this.outstandingGets_=[],this.outstandingPutCount_=0,this.outstandingGetCount_=0,this.onDisconnectRequestQueue_=[],this.connected_=!1,this.reconnectDelay_=_s,this.maxReconnectDelay_=mk,this.securityDebugCallback_=null,this.lastSessionId=null,this.establishConnectionTimer_=null,this.visible_=!1,this.requestCBHash_={},this.requestNumber_=0,this.realtime_=null,this.authToken_=null,this.appCheckToken_=null,this.forceTokenRefresh_=!1,this.invalidAuthTokenCount_=0,this.invalidAppCheckTokenCount_=0,this.firstConnection_=!0,this.lastConnectionAttemptTime_=null,this.lastConnectionEstablishedTime_=null,c)throw new Error("Auth override specified in options, but not supported on non Node.js platforms");ou.getInstance().on("visible",this.onVisible_,this),e.host.indexOf("fblocal")===-1&&_o.getInstance().on("online",this.onOnline_,this)}sendRequest(e,n,i){const s=++this.requestNumber_,r={r:s,a:e,b:n};this.log_(me(r)),_(this.connected_,"sendRequest call when we're not connected not allowed."),this.realtime_.sendRequest(r),i&&(this.requestCBHash_[s]=i)}get(e){this.initConnection_();const n=new Ve,s={action:"g",request:{p:e._path.toString(),q:e._queryObject},onComplete:o=>{const a=o.d;o.s==="ok"?n.resolve(a):n.reject(a)}};this.outstandingGets_.push(s),this.outstandingGetCount_++;const r=this.outstandingGets_.length-1;return this.connected_&&this.sendGet_(r),n.promise}listen(e,n,i,s){this.initConnection_();const r=e._queryIdentifier,o=e._path.toString();this.log_("Listen called for "+o+" "+r),this.listens.has(o)||this.listens.set(o,new Map),_(e._queryParams.isDefault()||!e._queryParams.loadsAllData(),"listen() called for non-default but complete query"),_(!this.listens.get(o).has(r),"listen() called twice for same path/queryId.");const a={onComplete:s,hashFn:n,query:e,tag:i};this.listens.get(o).set(r,a),this.connected_&&this.sendListen_(a)}sendGet_(e){const n=this.outstandingGets_[e];this.sendRequest("g",n.request,i=>{delete this.outstandingGets_[e],this.outstandingGetCount_--,this.outstandingGetCount_===0&&(this.outstandingGets_=[]),n.onComplete&&n.onComplete(i)})}sendListen_(e){const n=e.query,i=n._path.toString(),s=n._queryIdentifier;this.log_("Listen on "+i+" for "+s);const r={p:i},o="q";e.tag&&(r.q=n._queryObject,r.t=e.tag),r.h=e.hashFn(),this.sendRequest(o,r,a=>{const c=a.d,l=a.s;qt.warnOnListenWarnings_(c,n),(this.listens.get(i)&&this.listens.get(i).get(s))===e&&(this.log_("listen response",a),l!=="ok"&&this.removeListen_(i,s),e.onComplete&&e.onComplete(l,c))})}static warnOnListenWarnings_(e,n){if(e&&typeof e=="object"&&Lt(e,"w")){const i=Hi(e,"w");if(Array.isArray(i)&&~i.indexOf("no_index")){const s='".indexOn": "'+n._queryParams.getIndex().toString()+'"',r=n._path.toString();Be(`Using an unspecified index. Your data will be downloaded and filtered on the client. Consider adding ${s} at ${r} to your security rules for better performance.`)}}}refreshAuthToken(e){this.authToken_=e,this.log_("Auth token refreshed"),this.authToken_?this.tryAuth():this.connected_&&this.sendRequest("unauth",{},()=>{}),this.reduceReconnectDelayIfAdminCredential_(e)}reduceReconnectDelayIfAdminCredential_(e){(e&&e.length===40||rS(e))&&(this.log_("Admin auth credential detected.  Reducing max reconnect time."),this.maxReconnectDelay_=cf)}refreshAppCheckToken(e){this.appCheckToken_=e,this.log_("App check token refreshed"),this.appCheckToken_?this.tryAppCheck():this.connected_&&this.sendRequest("unappeck",{},()=>{})}tryAuth(){if(this.connected_&&this.authToken_){const e=this.authToken_,n=sS(e)?"auth":"gauth",i={cred:e};this.authOverride_===null?i.noauth=!0:typeof this.authOverride_=="object"&&(i.authvar=this.authOverride_),this.sendRequest(n,i,s=>{const r=s.s,o=s.d||"error";this.authToken_===e&&(r==="ok"?this.invalidAuthTokenCount_=0:this.onAuthRevoked_(r,o))})}}tryAppCheck(){this.connected_&&this.appCheckToken_&&this.sendRequest("appcheck",{token:this.appCheckToken_},e=>{const n=e.s,i=e.d||"error";n==="ok"?this.invalidAppCheckTokenCount_=0:this.onAppCheckRevoked_(n,i)})}unlisten(e,n){const i=e._path.toString(),s=e._queryIdentifier;this.log_("Unlisten called for "+i+" "+s),_(e._queryParams.isDefault()||!e._queryParams.loadsAllData(),"unlisten() called for non-default but complete query"),this.removeListen_(i,s)&&this.connected_&&this.sendUnlisten_(i,s,e._queryObject,n)}sendUnlisten_(e,n,i,s){this.log_("Unlisten on "+e+" for "+n);const r={p:e},o="n";s&&(r.q=i,r.t=s),this.sendRequest(o,r)}onDisconnectPut(e,n,i){this.initConnection_(),this.connected_?this.sendOnDisconnect_("o",e,n,i):this.onDisconnectRequestQueue_.push({pathString:e,action:"o",data:n,onComplete:i})}onDisconnectMerge(e,n,i){this.initConnection_(),this.connected_?this.sendOnDisconnect_("om",e,n,i):this.onDisconnectRequestQueue_.push({pathString:e,action:"om",data:n,onComplete:i})}onDisconnectCancel(e,n){this.initConnection_(),this.connected_?this.sendOnDisconnect_("oc",e,null,n):this.onDisconnectRequestQueue_.push({pathString:e,action:"oc",data:null,onComplete:n})}sendOnDisconnect_(e,n,i,s){const r={p:n,d:i};this.log_("onDisconnect "+e,r),this.sendRequest(e,r,o=>{s&&setTimeout(()=>{s(o.s,o.d)},Math.floor(0))})}put(e,n,i,s){this.putInternal("p",e,n,i,s)}merge(e,n,i,s){this.putInternal("m",e,n,i,s)}putInternal(e,n,i,s,r){this.initConnection_();const o={p:n,d:i};r!==void 0&&(o.h=r),this.outstandingPuts_.push({action:e,request:o,onComplete:s}),this.outstandingPutCount_++;const a=this.outstandingPuts_.length-1;this.connected_?this.sendPut_(a):this.log_("Buffering put: "+n)}sendPut_(e){const n=this.outstandingPuts_[e].action,i=this.outstandingPuts_[e].request,s=this.outstandingPuts_[e].onComplete;this.outstandingPuts_[e].queued=this.connected_,this.sendRequest(n,i,r=>{this.log_(n+" response",r),delete this.outstandingPuts_[e],this.outstandingPutCount_--,this.outstandingPutCount_===0&&(this.outstandingPuts_=[]),s&&s(r.s,r.d)})}reportStats(e){if(this.connected_){const n={c:e};this.log_("reportStats",n),this.sendRequest("s",n,i=>{if(i.s!=="ok"){const r=i.d;this.log_("reportStats","Error sending stats: "+r)}})}}onDataMessage_(e){if("r"in e){this.log_("from server: "+me(e));const n=e.r,i=this.requestCBHash_[n];i&&(delete this.requestCBHash_[n],i(e.b))}else{if("error"in e)throw"A server-side error has occurred: "+e.error;"a"in e&&this.onDataPush_(e.a,e.b)}}onDataPush_(e,n){this.log_("handleServerMessage",e,n),e==="d"?this.onDataUpdate_(n.p,n.d,!1,n.t):e==="m"?this.onDataUpdate_(n.p,n.d,!0,n.t):e==="c"?this.onListenRevoked_(n.p,n.q):e==="ac"?this.onAuthRevoked_(n.s,n.d):e==="apc"?this.onAppCheckRevoked_(n.s,n.d):e==="sd"?this.onSecurityDebugPacket_(n):Jc("Unrecognized action received from server: "+me(e)+`
Are you using the latest client?`)}onReady_(e,n){this.log_("connection ready"),this.connected_=!0,this.lastConnectionEstablishedTime_=new Date().getTime(),this.handleTimestamp_(e),this.lastSessionId=n,this.firstConnection_&&this.sendConnectStats_(),this.restoreState_(),this.firstConnection_=!1,this.onConnectStatus_(!0)}scheduleConnect_(e){_(!this.realtime_,"Scheduling a connect when we're already connected/ing?"),this.establishConnectionTimer_&&clearTimeout(this.establishConnectionTimer_),this.establishConnectionTimer_=setTimeout(()=>{this.establishConnectionTimer_=null,this.establishConnection_()},Math.floor(e))}initConnection_(){!this.realtime_&&this.firstConnection_&&this.scheduleConnect_(0)}onVisible_(e){e&&!this.visible_&&this.reconnectDelay_===this.maxReconnectDelay_&&(this.log_("Window became visible.  Reducing delay."),this.reconnectDelay_=_s,this.realtime_||this.scheduleConnect_(0)),this.visible_=e}onOnline_(e){e?(this.log_("Browser went online."),this.reconnectDelay_=_s,this.realtime_||this.scheduleConnect_(0)):(this.log_("Browser went offline.  Killing connection."),this.realtime_&&this.realtime_.close())}onRealtimeDisconnect_(){if(this.log_("data client disconnected"),this.connected_=!1,this.realtime_=null,this.cancelSentTransactions_(),this.requestCBHash_={},this.shouldReconnect_()){this.visible_?this.lastConnectionEstablishedTime_&&(new Date().getTime()-this.lastConnectionEstablishedTime_>yk&&(this.reconnectDelay_=_s),this.lastConnectionEstablishedTime_=null):(this.log_("Window isn't visible.  Delaying reconnect."),this.reconnectDelay_=this.maxReconnectDelay_,this.lastConnectionAttemptTime_=new Date().getTime());const e=Math.max(0,new Date().getTime()-this.lastConnectionAttemptTime_);let n=Math.max(0,this.reconnectDelay_-e);n=Math.random()*n,this.log_("Trying to reconnect in "+n+"ms"),this.scheduleConnect_(n),this.reconnectDelay_=Math.min(this.maxReconnectDelay_,this.reconnectDelay_*_k)}this.onConnectStatus_(!1)}async establishConnection_(){if(this.shouldReconnect_()){this.log_("Making a connection attempt"),this.lastConnectionAttemptTime_=new Date().getTime(),this.lastConnectionEstablishedTime_=null;const e=this.onDataMessage_.bind(this),n=this.onReady_.bind(this),i=this.onRealtimeDisconnect_.bind(this),s=this.id+":"+qt.nextConnectionId_++,r=this.lastSessionId;let o=!1,a=null;const c=function(){a?a.close():(o=!0,i())},l=function(d){_(a,"sendRequest call when we're not connected not allowed."),a.sendRequest(d)};this.realtime_={close:c,sendRequest:l};const u=this.forceTokenRefresh_;this.forceTokenRefresh_=!1;try{const[d,h]=await Promise.all([this.authTokenProvider_.getToken(u),this.appCheckTokenProvider_.getToken(u)]);o?be("getToken() completed but was canceled"):(be("getToken() completed. Creating connection."),this.authToken_=d&&d.accessToken,this.appCheckToken_=h&&h.token,a=new uk(s,this.repoInfo_,this.applicationId_,this.appCheckToken_,this.authToken_,e,n,i,f=>{Be(f+" ("+this.repoInfo_.toString()+")"),this.interrupt(wk)},r))}catch(d){this.log_("Failed to get token: "+d),o||(this.repoInfo_.nodeAdmin&&Be(d),c())}}}interrupt(e){be("Interrupting connection for reason: "+e),this.interruptReasons_[e]=!0,this.realtime_?this.realtime_.close():(this.establishConnectionTimer_&&(clearTimeout(this.establishConnectionTimer_),this.establishConnectionTimer_=null),this.connected_&&this.onRealtimeDisconnect_())}resume(e){be("Resuming connection for reason: "+e),delete this.interruptReasons_[e],fo(this.interruptReasons_)&&(this.reconnectDelay_=_s,this.realtime_||this.scheduleConnect_(0))}handleTimestamp_(e){const n=e-new Date().getTime();this.onServerInfoUpdate_({serverTimeOffset:n})}cancelSentTransactions_(){for(let e=0;e<this.outstandingPuts_.length;e++){const n=this.outstandingPuts_[e];n&&"h"in n.request&&n.queued&&(n.onComplete&&n.onComplete("disconnect"),delete this.outstandingPuts_[e],this.outstandingPutCount_--)}this.outstandingPutCount_===0&&(this.outstandingPuts_=[])}onListenRevoked_(e,n){let i;n?i=n.map(r=>eu(r)).join("$"):i="default";const s=this.removeListen_(e,i);s&&s.onComplete&&s.onComplete("permission_denied")}removeListen_(e,n){const i=new z(e).toString();let s;if(this.listens.has(i)){const r=this.listens.get(i);s=r.get(n),r.delete(n),r.size===0&&this.listens.delete(i)}else s=void 0;return s}onAuthRevoked_(e,n){be("Auth token revoked: "+e+"/"+n),this.authToken_=null,this.forceTokenRefresh_=!0,this.realtime_.close(),(e==="invalid_token"||e==="permission_denied")&&(this.invalidAuthTokenCount_++,this.invalidAuthTokenCount_>=lf&&(this.reconnectDelay_=cf,this.authTokenProvider_.notifyForInvalidToken()))}onAppCheckRevoked_(e,n){be("App check token revoked: "+e+"/"+n),this.appCheckToken_=null,this.forceTokenRefresh_=!0,(e==="invalid_token"||e==="permission_denied")&&(this.invalidAppCheckTokenCount_++,this.invalidAppCheckTokenCount_>=lf&&this.appCheckTokenProvider_.notifyForInvalidToken())}onSecurityDebugPacket_(e){this.securityDebugCallback_?this.securityDebugCallback_(e):"msg"in e&&console.log("FIREBASE: "+e.msg.replace(`
`,`
FIREBASE: `))}restoreState_(){this.tryAuth(),this.tryAppCheck();for(const e of this.listens.values())for(const n of e.values())this.sendListen_(n);for(let e=0;e<this.outstandingPuts_.length;e++)this.outstandingPuts_[e]&&this.sendPut_(e);for(;this.onDisconnectRequestQueue_.length;){const e=this.onDisconnectRequestQueue_.shift();this.sendOnDisconnect_(e.action,e.pathString,e.data,e.onComplete)}for(let e=0;e<this.outstandingGets_.length;e++)this.outstandingGets_[e]&&this.sendGet_(e)}sendConnectStats_(){const e={};let n="js";e["sdk."+n+"."+jg.replace(/\./g,"-")]=1,Ql()?e["framework.cordova"]=1:Mg()&&(e["framework.reactnative"]=1),this.reportStats(e)}shouldReconnect_(){const e=_o.getInstance().currentlyOnline();return fo(this.interruptReasons_)&&e}}qt.nextPersistentConnectionId_=0;qt.nextConnectionId_=0;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class F{constructor(e,n){this.name=e,this.node=n}static Wrap(e,n){return new F(e,n)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class aa{getCompare(){return this.compare.bind(this)}indexedValueChanged(e,n){const i=new F(ji,e),s=new F(ji,n);return this.compare(i,s)!==0}minPost(){return F.MIN}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Ur;class gm extends aa{static get __EMPTY_NODE(){return Ur}static set __EMPTY_NODE(e){Ur=e}compare(e,n){return gi(e.name,n.name)}isDefinedOn(e){throw ts("KeyIndex.isDefinedOn not expected to be called.")}indexedValueChanged(e,n){return!1}minPost(){return F.MIN}maxPost(){return new F(ti,Ur)}makePost(e,n){return _(typeof e=="string","KeyIndex indexValue must always be a string."),new F(e,Ur)}toString(){return".key"}}const Si=new gm;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class $r{constructor(e,n,i,s,r=null){this.isReverse_=s,this.resultGenerator_=r,this.nodeStack_=[];let o=1;for(;!e.isEmpty();)if(e=e,o=n?i(e.key,n):1,s&&(o*=-1),o<0)this.isReverse_?e=e.left:e=e.right;else if(o===0){this.nodeStack_.push(e);break}else this.nodeStack_.push(e),this.isReverse_?e=e.right:e=e.left}getNext(){if(this.nodeStack_.length===0)return null;let e=this.nodeStack_.pop(),n;if(this.resultGenerator_?n=this.resultGenerator_(e.key,e.value):n={key:e.key,value:e.value},this.isReverse_)for(e=e.left;!e.isEmpty();)this.nodeStack_.push(e),e=e.right;else for(e=e.right;!e.isEmpty();)this.nodeStack_.push(e),e=e.left;return n}hasNext(){return this.nodeStack_.length>0}peek(){if(this.nodeStack_.length===0)return null;const e=this.nodeStack_[this.nodeStack_.length-1];return this.resultGenerator_?this.resultGenerator_(e.key,e.value):{key:e.key,value:e.value}}}class ve{constructor(e,n,i,s,r){this.key=e,this.value=n,this.color=i??ve.RED,this.left=s??je.EMPTY_NODE,this.right=r??je.EMPTY_NODE}copy(e,n,i,s,r){return new ve(e??this.key,n??this.value,i??this.color,s??this.left,r??this.right)}count(){return this.left.count()+1+this.right.count()}isEmpty(){return!1}inorderTraversal(e){return this.left.inorderTraversal(e)||!!e(this.key,this.value)||this.right.inorderTraversal(e)}reverseTraversal(e){return this.right.reverseTraversal(e)||e(this.key,this.value)||this.left.reverseTraversal(e)}min_(){return this.left.isEmpty()?this:this.left.min_()}minKey(){return this.min_().key}maxKey(){return this.right.isEmpty()?this.key:this.right.maxKey()}insert(e,n,i){let s=this;const r=i(e,s.key);return r<0?s=s.copy(null,null,null,s.left.insert(e,n,i),null):r===0?s=s.copy(null,n,null,null,null):s=s.copy(null,null,null,null,s.right.insert(e,n,i)),s.fixUp_()}removeMin_(){if(this.left.isEmpty())return je.EMPTY_NODE;let e=this;return!e.left.isRed_()&&!e.left.left.isRed_()&&(e=e.moveRedLeft_()),e=e.copy(null,null,null,e.left.removeMin_(),null),e.fixUp_()}remove(e,n){let i,s;if(i=this,n(e,i.key)<0)!i.left.isEmpty()&&!i.left.isRed_()&&!i.left.left.isRed_()&&(i=i.moveRedLeft_()),i=i.copy(null,null,null,i.left.remove(e,n),null);else{if(i.left.isRed_()&&(i=i.rotateRight_()),!i.right.isEmpty()&&!i.right.isRed_()&&!i.right.left.isRed_()&&(i=i.moveRedRight_()),n(e,i.key)===0){if(i.right.isEmpty())return je.EMPTY_NODE;s=i.right.min_(),i=i.copy(s.key,s.value,null,null,i.right.removeMin_())}i=i.copy(null,null,null,null,i.right.remove(e,n))}return i.fixUp_()}isRed_(){return this.color}fixUp_(){let e=this;return e.right.isRed_()&&!e.left.isRed_()&&(e=e.rotateLeft_()),e.left.isRed_()&&e.left.left.isRed_()&&(e=e.rotateRight_()),e.left.isRed_()&&e.right.isRed_()&&(e=e.colorFlip_()),e}moveRedLeft_(){let e=this.colorFlip_();return e.right.left.isRed_()&&(e=e.copy(null,null,null,null,e.right.rotateRight_()),e=e.rotateLeft_(),e=e.colorFlip_()),e}moveRedRight_(){let e=this.colorFlip_();return e.left.left.isRed_()&&(e=e.rotateRight_(),e=e.colorFlip_()),e}rotateLeft_(){const e=this.copy(null,null,ve.RED,null,this.right.left);return this.right.copy(null,null,this.color,e,null)}rotateRight_(){const e=this.copy(null,null,ve.RED,this.left.right,null);return this.left.copy(null,null,this.color,null,e)}colorFlip_(){const e=this.left.copy(null,null,!this.left.color,null,null),n=this.right.copy(null,null,!this.right.color,null,null);return this.copy(null,null,!this.color,e,n)}checkMaxDepth_(){const e=this.check_();return Math.pow(2,e)<=this.count()+1}check_(){if(this.isRed_()&&this.left.isRed_())throw new Error("Red node has red child("+this.key+","+this.value+")");if(this.right.isRed_())throw new Error("Right child of ("+this.key+","+this.value+") is red");const e=this.left.check_();if(e!==this.right.check_())throw new Error("Black depths differ");return e+(this.isRed_()?0:1)}}ve.RED=!0;ve.BLACK=!1;class vk{copy(e,n,i,s,r){return this}insert(e,n,i){return new ve(e,n,null)}remove(e,n){return this}count(){return 0}isEmpty(){return!0}inorderTraversal(e){return!1}reverseTraversal(e){return!1}minKey(){return null}maxKey(){return null}check_(){return 0}isRed_(){return!1}}class je{constructor(e,n=je.EMPTY_NODE){this.comparator_=e,this.root_=n}insert(e,n){return new je(this.comparator_,this.root_.insert(e,n,this.comparator_).copy(null,null,ve.BLACK,null,null))}remove(e){return new je(this.comparator_,this.root_.remove(e,this.comparator_).copy(null,null,ve.BLACK,null,null))}get(e){let n,i=this.root_;for(;!i.isEmpty();){if(n=this.comparator_(e,i.key),n===0)return i.value;n<0?i=i.left:n>0&&(i=i.right)}return null}getPredecessorKey(e){let n,i=this.root_,s=null;for(;!i.isEmpty();)if(n=this.comparator_(e,i.key),n===0){if(i.left.isEmpty())return s?s.key:null;for(i=i.left;!i.right.isEmpty();)i=i.right;return i.key}else n<0?i=i.left:n>0&&(s=i,i=i.right);throw new Error("Attempted to find predecessor key for a nonexistent key.  What gives?")}isEmpty(){return this.root_.isEmpty()}count(){return this.root_.count()}minKey(){return this.root_.minKey()}maxKey(){return this.root_.maxKey()}inorderTraversal(e){return this.root_.inorderTraversal(e)}reverseTraversal(e){return this.root_.reverseTraversal(e)}getIterator(e){return new $r(this.root_,null,this.comparator_,!1,e)}getIteratorFrom(e,n){return new $r(this.root_,e,this.comparator_,!1,n)}getReverseIteratorFrom(e,n){return new $r(this.root_,e,this.comparator_,!0,n)}getReverseIterator(e){return new $r(this.root_,null,this.comparator_,!0,e)}}je.EMPTY_NODE=new vk;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function bk(t,e){return gi(t.name,e.name)}function au(t,e){return gi(t,e)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Qc;function Ek(t){Qc=t}const mm=function(t){return typeof t=="number"?"number:"+Kg(t):"string:"+t},_m=function(t){if(t.isLeafNode()){const e=t.val();_(typeof e=="string"||typeof e=="number"||typeof e=="object"&&Lt(e,".sv"),"Priority must be a string or number.")}else _(t===Qc||t.isEmpty(),"priority of unexpected type.");_(t===Qc||t.getPriority().isEmpty(),"Priority nodes can't have a priority of their own.")};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let uf;class we{static set __childrenNodeConstructor(e){uf=e}static get __childrenNodeConstructor(){return uf}constructor(e,n=we.__childrenNodeConstructor.EMPTY_NODE){this.value_=e,this.priorityNode_=n,this.lazyHash_=null,_(this.value_!==void 0&&this.value_!==null,"LeafNode shouldn't be created with null/undefined value."),_m(this.priorityNode_)}isLeafNode(){return!0}getPriority(){return this.priorityNode_}updatePriority(e){return new we(this.value_,e)}getImmediateChild(e){return e===".priority"?this.priorityNode_:we.__childrenNodeConstructor.EMPTY_NODE}getChild(e){return x(e)?this:M(e)===".priority"?this.priorityNode_:we.__childrenNodeConstructor.EMPTY_NODE}hasChild(){return!1}getPredecessorChildName(e,n){return null}updateImmediateChild(e,n){return e===".priority"?this.updatePriority(n):n.isEmpty()&&e!==".priority"?this:we.__childrenNodeConstructor.EMPTY_NODE.updateImmediateChild(e,n).updatePriority(this.priorityNode_)}updateChild(e,n){const i=M(e);return i===null?n:n.isEmpty()&&i!==".priority"?this:(_(i!==".priority"||Sn(e)===1,".priority must be the last token in a path"),this.updateImmediateChild(i,we.__childrenNodeConstructor.EMPTY_NODE.updateChild(Y(e),n)))}isEmpty(){return!1}numChildren(){return 0}forEachChild(e,n){return!1}val(e){return e&&!this.getPriority().isEmpty()?{".value":this.getValue(),".priority":this.getPriority().val()}:this.getValue()}hash(){if(this.lazyHash_===null){let e="";this.priorityNode_.isEmpty()||(e+="priority:"+mm(this.priorityNode_.val())+":");const n=typeof this.value_;e+=n+":",n==="number"?e+=Kg(this.value_):e+=this.value_,this.lazyHash_=zg(e)}return this.lazyHash_}getValue(){return this.value_}compareTo(e){return e===we.__childrenNodeConstructor.EMPTY_NODE?1:e instanceof we.__childrenNodeConstructor?-1:(_(e.isLeafNode(),"Unknown node type"),this.compareToLeafNode_(e))}compareToLeafNode_(e){const n=typeof e.value_,i=typeof this.value_,s=we.VALUE_TYPE_ORDER.indexOf(n),r=we.VALUE_TYPE_ORDER.indexOf(i);return _(s>=0,"Unknown leaf type: "+n),_(r>=0,"Unknown leaf type: "+i),s===r?i==="object"?0:this.value_<e.value_?-1:this.value_===e.value_?0:1:r-s}withIndex(){return this}isIndexed(){return!0}equals(e){if(e===this)return!0;if(e.isLeafNode()){const n=e;return this.value_===n.value_&&this.priorityNode_.equals(n.priorityNode_)}else return!1}}we.VALUE_TYPE_ORDER=["object","boolean","number","string"];/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let ym,wm;function Ck(t){ym=t}function Tk(t){wm=t}class Sk extends aa{compare(e,n){const i=e.node.getPriority(),s=n.node.getPriority(),r=i.compareTo(s);return r===0?gi(e.name,n.name):r}isDefinedOn(e){return!e.getPriority().isEmpty()}indexedValueChanged(e,n){return!e.getPriority().equals(n.getPriority())}minPost(){return F.MIN}maxPost(){return new F(ti,new we("[PRIORITY-POST]",wm))}makePost(e,n){const i=ym(e);return new F(n,new we("[PRIORITY-POST]",i))}toString(){return".priority"}}const se=new Sk;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ik=Math.log(2);class kk{constructor(e){const n=r=>parseInt(Math.log(r)/Ik,10),i=r=>parseInt(Array(r+1).join("1"),2);this.count=n(e+1),this.current_=this.count-1;const s=i(this.count);this.bits_=e+1&s}nextBitIsOne(){const e=!(this.bits_&1<<this.current_);return this.current_--,e}}const yo=function(t,e,n,i){t.sort(e);const s=function(c,l){const u=l-c;let d,h;if(u===0)return null;if(u===1)return d=t[c],h=n?n(d):d,new ve(h,d.node,ve.BLACK,null,null);{const f=parseInt(u/2,10)+c,p=s(c,f),g=s(f+1,l);return d=t[f],h=n?n(d):d,new ve(h,d.node,ve.BLACK,p,g)}},r=function(c){let l=null,u=null,d=t.length;const h=function(p,g){const m=d-p,T=d;d-=p;const P=s(m+1,T),$=t[m],y=n?n($):$;f(new ve(y,$.node,g,null,P))},f=function(p){l?(l.left=p,l=p):(u=p,l=p)};for(let p=0;p<c.count;++p){const g=c.nextBitIsOne(),m=Math.pow(2,c.count-(p+1));g?h(m,ve.BLACK):(h(m,ve.BLACK),h(m,ve.RED))}return u},o=new kk(t.length),a=r(o);return new je(i||e,a)};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let ac;const yi={};class Ft{static get Default(){return _(yi&&se,"ChildrenNode.ts has not been loaded"),ac=ac||new Ft({".priority":yi},{".priority":se}),ac}constructor(e,n){this.indexes_=e,this.indexSet_=n}get(e){const n=Hi(this.indexes_,e);if(!n)throw new Error("No index defined for "+e);return n instanceof je?n:null}hasIndex(e){return Lt(this.indexSet_,e.toString())}addIndex(e,n){_(e!==Si,"KeyIndex always exists and isn't meant to be added to the IndexMap.");const i=[];let s=!1;const r=n.getIterator(F.Wrap);let o=r.getNext();for(;o;)s=s||e.isDefinedOn(o.node),i.push(o),o=r.getNext();let a;s?a=yo(i,e.getCompare()):a=yi;const c=e.toString(),l={...this.indexSet_};l[c]=e;const u={...this.indexes_};return u[c]=a,new Ft(u,l)}addToIndexes(e,n){const i=po(this.indexes_,(s,r)=>{const o=Hi(this.indexSet_,r);if(_(o,"Missing index implementation for "+r),s===yi)if(o.isDefinedOn(e.node)){const a=[],c=n.getIterator(F.Wrap);let l=c.getNext();for(;l;)l.name!==e.name&&a.push(l),l=c.getNext();return a.push(e),yo(a,o.getCompare())}else return yi;else{const a=n.get(e.name);let c=s;return a&&(c=c.remove(new F(e.name,a))),c.insert(e,e.node)}});return new Ft(i,this.indexSet_)}removeFromIndexes(e,n){const i=po(this.indexes_,s=>{if(s===yi)return s;{const r=n.get(e.name);return r?s.remove(new F(e.name,r)):s}});return new Ft(i,this.indexSet_)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let ys;class S{static get EMPTY_NODE(){return ys||(ys=new S(new je(au),null,Ft.Default))}constructor(e,n,i){this.children_=e,this.priorityNode_=n,this.indexMap_=i,this.lazyHash_=null,this.priorityNode_&&_m(this.priorityNode_),this.children_.isEmpty()&&_(!this.priorityNode_||this.priorityNode_.isEmpty(),"An empty node cannot have a priority")}isLeafNode(){return!1}getPriority(){return this.priorityNode_||ys}updatePriority(e){return this.children_.isEmpty()?this:new S(this.children_,e,this.indexMap_)}getImmediateChild(e){if(e===".priority")return this.getPriority();{const n=this.children_.get(e);return n===null?ys:n}}getChild(e){const n=M(e);return n===null?this:this.getImmediateChild(n).getChild(Y(e))}hasChild(e){return this.children_.get(e)!==null}updateImmediateChild(e,n){if(_(n,"We should always be passing snapshot nodes"),e===".priority")return this.updatePriority(n);{const i=new F(e,n);let s,r;n.isEmpty()?(s=this.children_.remove(e),r=this.indexMap_.removeFromIndexes(i,this.children_)):(s=this.children_.insert(e,n),r=this.indexMap_.addToIndexes(i,this.children_));const o=s.isEmpty()?ys:this.priorityNode_;return new S(s,o,r)}}updateChild(e,n){const i=M(e);if(i===null)return n;{_(M(e)!==".priority"||Sn(e)===1,".priority must be the last token in a path");const s=this.getImmediateChild(i).updateChild(Y(e),n);return this.updateImmediateChild(i,s)}}isEmpty(){return this.children_.isEmpty()}numChildren(){return this.children_.count()}val(e){if(this.isEmpty())return null;const n={};let i=0,s=0,r=!0;if(this.forEachChild(se,(o,a)=>{n[o]=a.val(e),i++,r&&S.INTEGER_REGEXP_.test(o)?s=Math.max(s,Number(o)):r=!1}),!e&&r&&s<2*i){const o=[];for(const a in n)o[a]=n[a];return o}else return e&&!this.getPriority().isEmpty()&&(n[".priority"]=this.getPriority().val()),n}hash(){if(this.lazyHash_===null){let e="";this.getPriority().isEmpty()||(e+="priority:"+mm(this.getPriority().val())+":"),this.forEachChild(se,(n,i)=>{const s=i.hash();s!==""&&(e+=":"+n+":"+s)}),this.lazyHash_=e===""?"":zg(e)}return this.lazyHash_}getPredecessorChildName(e,n,i){const s=this.resolveIndex_(i);if(s){const r=s.getPredecessorKey(new F(e,n));return r?r.name:null}else return this.children_.getPredecessorKey(e)}getFirstChildName(e){const n=this.resolveIndex_(e);if(n){const i=n.minKey();return i&&i.name}else return this.children_.minKey()}getFirstChild(e){const n=this.getFirstChildName(e);return n?new F(n,this.children_.get(n)):null}getLastChildName(e){const n=this.resolveIndex_(e);if(n){const i=n.maxKey();return i&&i.name}else return this.children_.maxKey()}getLastChild(e){const n=this.getLastChildName(e);return n?new F(n,this.children_.get(n)):null}forEachChild(e,n){const i=this.resolveIndex_(e);return i?i.inorderTraversal(s=>n(s.name,s.node)):this.children_.inorderTraversal(n)}getIterator(e){return this.getIteratorFrom(e.minPost(),e)}getIteratorFrom(e,n){const i=this.resolveIndex_(n);if(i)return i.getIteratorFrom(e,s=>s);{const s=this.children_.getIteratorFrom(e.name,F.Wrap);let r=s.peek();for(;r!=null&&n.compare(r,e)<0;)s.getNext(),r=s.peek();return s}}getReverseIterator(e){return this.getReverseIteratorFrom(e.maxPost(),e)}getReverseIteratorFrom(e,n){const i=this.resolveIndex_(n);if(i)return i.getReverseIteratorFrom(e,s=>s);{const s=this.children_.getReverseIteratorFrom(e.name,F.Wrap);let r=s.peek();for(;r!=null&&n.compare(r,e)>0;)s.getNext(),r=s.peek();return s}}compareTo(e){return this.isEmpty()?e.isEmpty()?0:-1:e.isLeafNode()||e.isEmpty()?1:e===vr?-1:0}withIndex(e){if(e===Si||this.indexMap_.hasIndex(e))return this;{const n=this.indexMap_.addIndex(e,this.children_);return new S(this.children_,this.priorityNode_,n)}}isIndexed(e){return e===Si||this.indexMap_.hasIndex(e)}equals(e){if(e===this)return!0;if(e.isLeafNode())return!1;{const n=e;if(this.getPriority().equals(n.getPriority()))if(this.children_.count()===n.children_.count()){const i=this.getIterator(se),s=n.getIterator(se);let r=i.getNext(),o=s.getNext();for(;r&&o;){if(r.name!==o.name||!r.node.equals(o.node))return!1;r=i.getNext(),o=s.getNext()}return r===null&&o===null}else return!1;else return!1}}resolveIndex_(e){return e===Si?null:this.indexMap_.get(e.toString())}}S.INTEGER_REGEXP_=/^(0|[1-9]\d*)$/;class Rk extends S{constructor(){super(new je(au),S.EMPTY_NODE,Ft.Default)}compareTo(e){return e===this?0:1}equals(e){return e===this}getPriority(){return this}getImmediateChild(e){return S.EMPTY_NODE}isEmpty(){return!1}}const vr=new Rk;Object.defineProperties(F,{MIN:{value:new F(ji,S.EMPTY_NODE)},MAX:{value:new F(ti,vr)}});gm.__EMPTY_NODE=S.EMPTY_NODE;we.__childrenNodeConstructor=S;Ek(vr);Tk(vr);/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ak=!0;function ae(t,e=null){if(t===null)return S.EMPTY_NODE;if(typeof t=="object"&&".priority"in t&&(e=t[".priority"]),_(e===null||typeof e=="string"||typeof e=="number"||typeof e=="object"&&".sv"in e,"Invalid priority type found: "+typeof e),typeof t=="object"&&".value"in t&&t[".value"]!==null&&(t=t[".value"]),typeof t!="object"||".sv"in t){const n=t;return new we(n,ae(e))}if(!(t instanceof Array)&&Ak){const n=[];let i=!1;if(Te(t,(o,a)=>{if(o.substring(0,1)!=="."){const c=ae(a);c.isEmpty()||(i=i||!c.getPriority().isEmpty(),n.push(new F(o,c)))}}),n.length===0)return S.EMPTY_NODE;const r=yo(n,bk,o=>o.name,au);if(i){const o=yo(n,se.getCompare());return new S(r,ae(e),new Ft({".priority":o},{".priority":se}))}else return new S(r,ae(e),Ft.Default)}else{let n=S.EMPTY_NODE;return Te(t,(i,s)=>{if(Lt(t,i)&&i.substring(0,1)!=="."){const r=ae(s);(r.isLeafNode()||!r.isEmpty())&&(n=n.updateImmediateChild(i,r))}}),n.updatePriority(ae(e))}}Ck(ae);/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Nk extends aa{constructor(e){super(),this.indexPath_=e,_(!x(e)&&M(e)!==".priority","Can't create PathIndex with empty path or .priority key")}extractChild(e){return e.getChild(this.indexPath_)}isDefinedOn(e){return!e.getChild(this.indexPath_).isEmpty()}compare(e,n){const i=this.extractChild(e.node),s=this.extractChild(n.node),r=i.compareTo(s);return r===0?gi(e.name,n.name):r}makePost(e,n){const i=ae(e),s=S.EMPTY_NODE.updateChild(this.indexPath_,i);return new F(n,s)}maxPost(){const e=S.EMPTY_NODE.updateChild(this.indexPath_,vr);return new F(ti,e)}toString(){return Ks(this.indexPath_,0).join("/")}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Pk extends aa{compare(e,n){const i=e.node.compareTo(n.node);return i===0?gi(e.name,n.name):i}isDefinedOn(e){return!0}indexedValueChanged(e,n){return!e.equals(n)}minPost(){return F.MIN}maxPost(){return F.MAX}makePost(e,n){const i=ae(e);return new F(n,i)}toString(){return".value"}}const Lk=new Pk;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function vm(t){return{type:"value",snapshotNode:t}}function Wi(t,e){return{type:"child_added",snapshotNode:e,childName:t}}function Ys(t,e){return{type:"child_removed",snapshotNode:e,childName:t}}function Js(t,e,n){return{type:"child_changed",snapshotNode:e,childName:t,oldSnap:n}}function Ok(t,e){return{type:"child_moved",snapshotNode:e,childName:t}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class cu{constructor(e){this.index_=e}updateChild(e,n,i,s,r,o){_(e.isIndexed(this.index_),"A node must be indexed if only a child is updated");const a=e.getImmediateChild(n);return a.getChild(s).equals(i.getChild(s))&&a.isEmpty()===i.isEmpty()||(o!=null&&(i.isEmpty()?e.hasChild(n)?o.trackChildChange(Ys(n,a)):_(e.isLeafNode(),"A child remove without an old child only makes sense on a leaf node"):a.isEmpty()?o.trackChildChange(Wi(n,i)):o.trackChildChange(Js(n,i,a))),e.isLeafNode()&&i.isEmpty())?e:e.updateImmediateChild(n,i).withIndex(this.index_)}updateFullNode(e,n,i){return i!=null&&(e.isLeafNode()||e.forEachChild(se,(s,r)=>{n.hasChild(s)||i.trackChildChange(Ys(s,r))}),n.isLeafNode()||n.forEachChild(se,(s,r)=>{if(e.hasChild(s)){const o=e.getImmediateChild(s);o.equals(r)||i.trackChildChange(Js(s,r,o))}else i.trackChildChange(Wi(s,r))})),n.withIndex(this.index_)}updatePriority(e,n){return e.isEmpty()?S.EMPTY_NODE:e.updatePriority(n)}filtersNodes(){return!1}getIndexedFilter(){return this}getIndex(){return this.index_}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Xs{constructor(e){this.indexedFilter_=new cu(e.getIndex()),this.index_=e.getIndex(),this.startPost_=Xs.getStartPost_(e),this.endPost_=Xs.getEndPost_(e),this.startIsInclusive_=!e.startAfterSet_,this.endIsInclusive_=!e.endBeforeSet_}getStartPost(){return this.startPost_}getEndPost(){return this.endPost_}matches(e){const n=this.startIsInclusive_?this.index_.compare(this.getStartPost(),e)<=0:this.index_.compare(this.getStartPost(),e)<0,i=this.endIsInclusive_?this.index_.compare(e,this.getEndPost())<=0:this.index_.compare(e,this.getEndPost())<0;return n&&i}updateChild(e,n,i,s,r,o){return this.matches(new F(n,i))||(i=S.EMPTY_NODE),this.indexedFilter_.updateChild(e,n,i,s,r,o)}updateFullNode(e,n,i){n.isLeafNode()&&(n=S.EMPTY_NODE);let s=n.withIndex(this.index_);s=s.updatePriority(S.EMPTY_NODE);const r=this;return n.forEachChild(se,(o,a)=>{r.matches(new F(o,a))||(s=s.updateImmediateChild(o,S.EMPTY_NODE))}),this.indexedFilter_.updateFullNode(e,s,i)}updatePriority(e,n){return e}filtersNodes(){return!0}getIndexedFilter(){return this.indexedFilter_}getIndex(){return this.index_}static getStartPost_(e){if(e.hasStart()){const n=e.getIndexStartName();return e.getIndex().makePost(e.getIndexStartValue(),n)}else return e.getIndex().minPost()}static getEndPost_(e){if(e.hasEnd()){const n=e.getIndexEndName();return e.getIndex().makePost(e.getIndexEndValue(),n)}else return e.getIndex().maxPost()}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Dk{constructor(e){this.withinDirectionalStart=n=>this.reverse_?this.withinEndPost(n):this.withinStartPost(n),this.withinDirectionalEnd=n=>this.reverse_?this.withinStartPost(n):this.withinEndPost(n),this.withinStartPost=n=>{const i=this.index_.compare(this.rangedFilter_.getStartPost(),n);return this.startIsInclusive_?i<=0:i<0},this.withinEndPost=n=>{const i=this.index_.compare(n,this.rangedFilter_.getEndPost());return this.endIsInclusive_?i<=0:i<0},this.rangedFilter_=new Xs(e),this.index_=e.getIndex(),this.limit_=e.getLimit(),this.reverse_=!e.isViewFromLeft(),this.startIsInclusive_=!e.startAfterSet_,this.endIsInclusive_=!e.endBeforeSet_}updateChild(e,n,i,s,r,o){return this.rangedFilter_.matches(new F(n,i))||(i=S.EMPTY_NODE),e.getImmediateChild(n).equals(i)?e:e.numChildren()<this.limit_?this.rangedFilter_.getIndexedFilter().updateChild(e,n,i,s,r,o):this.fullLimitUpdateChild_(e,n,i,r,o)}updateFullNode(e,n,i){let s;if(n.isLeafNode()||n.isEmpty())s=S.EMPTY_NODE.withIndex(this.index_);else if(this.limit_*2<n.numChildren()&&n.isIndexed(this.index_)){s=S.EMPTY_NODE.withIndex(this.index_);let r;this.reverse_?r=n.getReverseIteratorFrom(this.rangedFilter_.getEndPost(),this.index_):r=n.getIteratorFrom(this.rangedFilter_.getStartPost(),this.index_);let o=0;for(;r.hasNext()&&o<this.limit_;){const a=r.getNext();if(this.withinDirectionalStart(a))if(this.withinDirectionalEnd(a))s=s.updateImmediateChild(a.name,a.node),o++;else break;else continue}}else{s=n.withIndex(this.index_),s=s.updatePriority(S.EMPTY_NODE);let r;this.reverse_?r=s.getReverseIterator(this.index_):r=s.getIterator(this.index_);let o=0;for(;r.hasNext();){const a=r.getNext();o<this.limit_&&this.withinDirectionalStart(a)&&this.withinDirectionalEnd(a)?o++:s=s.updateImmediateChild(a.name,S.EMPTY_NODE)}}return this.rangedFilter_.getIndexedFilter().updateFullNode(e,s,i)}updatePriority(e,n){return e}filtersNodes(){return!0}getIndexedFilter(){return this.rangedFilter_.getIndexedFilter()}getIndex(){return this.index_}fullLimitUpdateChild_(e,n,i,s,r){let o;if(this.reverse_){const d=this.index_.getCompare();o=(h,f)=>d(f,h)}else o=this.index_.getCompare();const a=e;_(a.numChildren()===this.limit_,"");const c=new F(n,i),l=this.reverse_?a.getFirstChild(this.index_):a.getLastChild(this.index_),u=this.rangedFilter_.matches(c);if(a.hasChild(n)){const d=a.getImmediateChild(n);let h=s.getChildAfterChild(this.index_,l,this.reverse_);for(;h!=null&&(h.name===n||a.hasChild(h.name));)h=s.getChildAfterChild(this.index_,h,this.reverse_);const f=h==null?1:o(h,c);if(u&&!i.isEmpty()&&f>=0)return r?.trackChildChange(Js(n,i,d)),a.updateImmediateChild(n,i);{r?.trackChildChange(Ys(n,d));const g=a.updateImmediateChild(n,S.EMPTY_NODE);return h!=null&&this.rangedFilter_.matches(h)?(r?.trackChildChange(Wi(h.name,h.node)),g.updateImmediateChild(h.name,h.node)):g}}else return i.isEmpty()?e:u&&o(l,c)>=0?(r!=null&&(r.trackChildChange(Ys(l.name,l.node)),r.trackChildChange(Wi(n,i))),a.updateImmediateChild(n,i).updateImmediateChild(l.name,S.EMPTY_NODE)):e}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ca{constructor(){this.limitSet_=!1,this.startSet_=!1,this.startNameSet_=!1,this.startAfterSet_=!1,this.endSet_=!1,this.endNameSet_=!1,this.endBeforeSet_=!1,this.limit_=0,this.viewFrom_="",this.indexStartValue_=null,this.indexStartName_="",this.indexEndValue_=null,this.indexEndName_="",this.index_=se}hasStart(){return this.startSet_}isViewFromLeft(){return this.viewFrom_===""?this.startSet_:this.viewFrom_==="l"}getIndexStartValue(){return _(this.startSet_,"Only valid if start has been set"),this.indexStartValue_}getIndexStartName(){return _(this.startSet_,"Only valid if start has been set"),this.startNameSet_?this.indexStartName_:ji}hasEnd(){return this.endSet_}getIndexEndValue(){return _(this.endSet_,"Only valid if end has been set"),this.indexEndValue_}getIndexEndName(){return _(this.endSet_,"Only valid if end has been set"),this.endNameSet_?this.indexEndName_:ti}hasLimit(){return this.limitSet_}hasAnchoredLimit(){return this.limitSet_&&this.viewFrom_!==""}getLimit(){return _(this.limitSet_,"Only valid if limit has been set"),this.limit_}getIndex(){return this.index_}loadsAllData(){return!(this.startSet_||this.endSet_||this.limitSet_)}isDefault(){return this.loadsAllData()&&this.index_===se}copy(){const e=new ca;return e.limitSet_=this.limitSet_,e.limit_=this.limit_,e.startSet_=this.startSet_,e.startAfterSet_=this.startAfterSet_,e.indexStartValue_=this.indexStartValue_,e.startNameSet_=this.startNameSet_,e.indexStartName_=this.indexStartName_,e.endSet_=this.endSet_,e.endBeforeSet_=this.endBeforeSet_,e.indexEndValue_=this.indexEndValue_,e.endNameSet_=this.endNameSet_,e.indexEndName_=this.indexEndName_,e.index_=this.index_,e.viewFrom_=this.viewFrom_,e}}function Mk(t){return t.loadsAllData()?new cu(t.getIndex()):t.hasLimit()?new Dk(t):new Xs(t)}function df(t){const e={};if(t.isDefault())return e;let n;if(t.index_===se?n="$priority":t.index_===Lk?n="$value":t.index_===Si?n="$key":(_(t.index_ instanceof Nk,"Unrecognized index type!"),n=t.index_.toString()),e.orderBy=me(n),t.startSet_){const i=t.startAfterSet_?"startAfter":"startAt";e[i]=me(t.indexStartValue_),t.startNameSet_&&(e[i]+=","+me(t.indexStartName_))}if(t.endSet_){const i=t.endBeforeSet_?"endBefore":"endAt";e[i]=me(t.indexEndValue_),t.endNameSet_&&(e[i]+=","+me(t.indexEndName_))}return t.limitSet_&&(t.isViewFromLeft()?e.limitToFirst=t.limit_:e.limitToLast=t.limit_),e}function hf(t){const e={};if(t.startSet_&&(e.sp=t.indexStartValue_,t.startNameSet_&&(e.sn=t.indexStartName_),e.sin=!t.startAfterSet_),t.endSet_&&(e.ep=t.indexEndValue_,t.endNameSet_&&(e.en=t.indexEndName_),e.ein=!t.endBeforeSet_),t.limitSet_){e.l=t.limit_;let n=t.viewFrom_;n===""&&(t.isViewFromLeft()?n="l":n="r"),e.vf=n}return t.index_!==se&&(e.i=t.index_.toString()),e}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class wo extends dm{reportStats(e){throw new Error("Method not implemented.")}static getListenId_(e,n){return n!==void 0?"tag$"+n:(_(e._queryParams.isDefault(),"should have a tag if it's not a default query."),e._path.toString())}constructor(e,n,i,s){super(),this.repoInfo_=e,this.onDataUpdate_=n,this.authTokenProvider_=i,this.appCheckTokenProvider_=s,this.log_=wr("p:rest:"),this.listens_={}}listen(e,n,i,s){const r=e._path.toString();this.log_("Listen called for "+r+" "+e._queryIdentifier);const o=wo.getListenId_(e,i),a={};this.listens_[o]=a;const c=df(e._queryParams);this.restRequest_(r+".json",c,(l,u)=>{let d=u;if(l===404&&(d=null,l=null),l===null&&this.onDataUpdate_(r,d,!1,i),Hi(this.listens_,o)===a){let h;l?l===401?h="permission_denied":h="rest_error:"+l:h="ok",s(h,null)}})}unlisten(e,n){const i=wo.getListenId_(e,n);delete this.listens_[i]}get(e){const n=df(e._queryParams),i=e._path.toString(),s=new Ve;return this.restRequest_(i+".json",n,(r,o)=>{let a=o;r===404&&(a=null,r=null),r===null?(this.onDataUpdate_(i,a,!1,null),s.resolve(a)):s.reject(new Error(a))}),s.promise}refreshAuthToken(e){}restRequest_(e,n={},i){return n.format="export",Promise.all([this.authTokenProvider_.getToken(!1),this.appCheckTokenProvider_.getToken(!1)]).then(([s,r])=>{s&&s.accessToken&&(n.auth=s.accessToken),r&&r.token&&(n.ac=r.token);const o=(this.repoInfo_.secure?"https://":"http://")+this.repoInfo_.host+e+"?ns="+this.repoInfo_.namespace+is(n);this.log_("Sending REST request for "+o);const a=new XMLHttpRequest;a.onreadystatechange=()=>{if(i&&a.readyState===4){this.log_("REST Response for "+o+" received. status:",a.status,"response:",a.responseText);let c=null;if(a.status>=200&&a.status<300){try{c=qs(a.responseText)}catch{Be("Failed to parse JSON response for "+o+": "+a.responseText)}i(null,c)}else a.status!==401&&a.status!==404&&Be("Got unsuccessful REST response for "+o+" Status: "+a.status),i(a.status);i=null}},a.open("GET",o,!0),a.send()})}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class xk{constructor(){this.rootNode_=S.EMPTY_NODE}getNode(e){return this.rootNode_.getChild(e)}updateSnapshot(e,n){this.rootNode_=this.rootNode_.updateChild(e,n)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function vo(){return{value:null,children:new Map}}function os(t,e,n){if(x(e))t.value=n,t.children.clear();else if(t.value!==null)t.value=t.value.updateChild(e,n);else{const i=M(e);t.children.has(i)||t.children.set(i,vo());const s=t.children.get(i);e=Y(e),os(s,e,n)}}function Zc(t,e){if(x(e))return t.value=null,t.children.clear(),!0;if(t.value!==null){if(t.value.isLeafNode())return!1;{const n=t.value;return t.value=null,n.forEachChild(se,(i,s)=>{os(t,new z(i),s)}),Zc(t,e)}}else if(t.children.size>0){const n=M(e);return e=Y(e),t.children.has(n)&&Zc(t.children.get(n),e)&&t.children.delete(n),t.children.size===0}else return!0}function el(t,e,n){t.value!==null?n(e,t.value):Fk(t,(i,s)=>{const r=new z(e.toString()+"/"+i);el(s,r,n)})}function Fk(t,e){t.children.forEach((n,i)=>{e(i,n)})}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Uk{constructor(e){this.collection_=e,this.last_=null}get(){const e=this.collection_.get(),n={...e};return this.last_&&Te(this.last_,(i,s)=>{n[i]=n[i]-s}),this.last_=e,n}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ff=10*1e3,$k=30*1e3,Bk=300*1e3;class Hk{constructor(e,n){this.server_=n,this.statsToReport_={},this.statsListener_=new Uk(e);const i=ff+($k-ff)*Math.random();As(this.reportStats_.bind(this),Math.floor(i))}reportStats_(){const e=this.statsListener_.get(),n={};let i=!1;Te(e,(s,r)=>{r>0&&Lt(this.statsToReport_,s)&&(n[s]=r,i=!0)}),i&&this.server_.reportStats(n),As(this.reportStats_.bind(this),Math.floor(Math.random()*2*Bk))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var lt;(function(t){t[t.OVERWRITE=0]="OVERWRITE",t[t.MERGE=1]="MERGE",t[t.ACK_USER_WRITE=2]="ACK_USER_WRITE",t[t.LISTEN_COMPLETE=3]="LISTEN_COMPLETE"})(lt||(lt={}));function lu(){return{fromUser:!0,fromServer:!1,queryId:null,tagged:!1}}function uu(){return{fromUser:!1,fromServer:!0,queryId:null,tagged:!1}}function du(t){return{fromUser:!1,fromServer:!0,queryId:t,tagged:!0}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class bo{constructor(e,n,i){this.path=e,this.affectedTree=n,this.revert=i,this.type=lt.ACK_USER_WRITE,this.source=lu()}operationForChild(e){if(x(this.path)){if(this.affectedTree.value!=null)return _(this.affectedTree.children.isEmpty(),"affectedTree should not have overlapping affected paths."),this;{const n=this.affectedTree.subtree(new z(e));return new bo(H(),n,this.revert)}}else return _(M(this.path)===e,"operationForChild called for unrelated child."),new bo(Y(this.path),this.affectedTree,this.revert)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Qs{constructor(e,n){this.source=e,this.path=n,this.type=lt.LISTEN_COMPLETE}operationForChild(e){return x(this.path)?new Qs(this.source,H()):new Qs(this.source,Y(this.path))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ni{constructor(e,n,i){this.source=e,this.path=n,this.snap=i,this.type=lt.OVERWRITE}operationForChild(e){return x(this.path)?new ni(this.source,H(),this.snap.getImmediateChild(e)):new ni(this.source,Y(this.path),this.snap)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class qi{constructor(e,n,i){this.source=e,this.path=n,this.children=i,this.type=lt.MERGE}operationForChild(e){if(x(this.path)){const n=this.children.subtree(new z(e));return n.isEmpty()?null:n.value?new ni(this.source,H(),n.value):new qi(this.source,H(),n)}else return _(M(this.path)===e,"Can't get a merge for a child not on the path of the operation"),new qi(this.source,Y(this.path),this.children)}toString(){return"Operation("+this.path+": "+this.source.toString()+" merge: "+this.children.toString()+")"}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class In{constructor(e,n,i){this.node_=e,this.fullyInitialized_=n,this.filtered_=i}isFullyInitialized(){return this.fullyInitialized_}isFiltered(){return this.filtered_}isCompleteForPath(e){if(x(e))return this.isFullyInitialized()&&!this.filtered_;const n=M(e);return this.isCompleteForChild(n)}isCompleteForChild(e){return this.isFullyInitialized()&&!this.filtered_||this.node_.hasChild(e)}getNode(){return this.node_}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Vk{constructor(e){this.query_=e,this.index_=this.query_._queryParams.getIndex()}}function jk(t,e,n,i){const s=[],r=[];return e.forEach(o=>{o.type==="child_changed"&&t.index_.indexedValueChanged(o.oldSnap,o.snapshotNode)&&r.push(Ok(o.childName,o.snapshotNode))}),ws(t,s,"child_removed",e,i,n),ws(t,s,"child_added",e,i,n),ws(t,s,"child_moved",r,i,n),ws(t,s,"child_changed",e,i,n),ws(t,s,"value",e,i,n),s}function ws(t,e,n,i,s,r){const o=i.filter(a=>a.type===n);o.sort((a,c)=>qk(t,a,c)),o.forEach(a=>{const c=Wk(t,a,r);s.forEach(l=>{l.respondsTo(a.type)&&e.push(l.createEvent(c,t.query_))})})}function Wk(t,e,n){return e.type==="value"||e.type==="child_removed"||(e.prevName=n.getPredecessorChildName(e.childName,e.snapshotNode,t.index_)),e}function qk(t,e,n){if(e.childName==null||n.childName==null)throw ts("Should only compare child_ events.");const i=new F(e.childName,e.snapshotNode),s=new F(n.childName,n.snapshotNode);return t.index_.compare(i,s)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function la(t,e){return{eventCache:t,serverCache:e}}function Ns(t,e,n,i){return la(new In(e,n,i),t.serverCache)}function bm(t,e,n,i){return la(t.eventCache,new In(e,n,i))}function Eo(t){return t.eventCache.isFullyInitialized()?t.eventCache.getNode():null}function ii(t){return t.serverCache.isFullyInitialized()?t.serverCache.getNode():null}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let cc;const zk=()=>(cc||(cc=new je(NI)),cc);class X{static fromObject(e){let n=new X(null);return Te(e,(i,s)=>{n=n.set(new z(i),s)}),n}constructor(e,n=zk()){this.value=e,this.children=n}isEmpty(){return this.value===null&&this.children.isEmpty()}findRootMostMatchingPathAndValue(e,n){if(this.value!=null&&n(this.value))return{path:H(),value:this.value};if(x(e))return null;{const i=M(e),s=this.children.get(i);if(s!==null){const r=s.findRootMostMatchingPathAndValue(Y(e),n);return r!=null?{path:ie(new z(i),r.path),value:r.value}:null}else return null}}findRootMostValueAndPath(e){return this.findRootMostMatchingPathAndValue(e,()=>!0)}subtree(e){if(x(e))return this;{const n=M(e),i=this.children.get(n);return i!==null?i.subtree(Y(e)):new X(null)}}set(e,n){if(x(e))return new X(n,this.children);{const i=M(e),r=(this.children.get(i)||new X(null)).set(Y(e),n),o=this.children.insert(i,r);return new X(this.value,o)}}remove(e){if(x(e))return this.children.isEmpty()?new X(null):new X(null,this.children);{const n=M(e),i=this.children.get(n);if(i){const s=i.remove(Y(e));let r;return s.isEmpty()?r=this.children.remove(n):r=this.children.insert(n,s),this.value===null&&r.isEmpty()?new X(null):new X(this.value,r)}else return this}}get(e){if(x(e))return this.value;{const n=M(e),i=this.children.get(n);return i?i.get(Y(e)):null}}setTree(e,n){if(x(e))return n;{const i=M(e),r=(this.children.get(i)||new X(null)).setTree(Y(e),n);let o;return r.isEmpty()?o=this.children.remove(i):o=this.children.insert(i,r),new X(this.value,o)}}fold(e){return this.fold_(H(),e)}fold_(e,n){const i={};return this.children.inorderTraversal((s,r)=>{i[s]=r.fold_(ie(e,s),n)}),n(e,this.value,i)}findOnPath(e,n){return this.findOnPath_(e,H(),n)}findOnPath_(e,n,i){const s=this.value?i(n,this.value):!1;if(s)return s;if(x(e))return null;{const r=M(e),o=this.children.get(r);return o?o.findOnPath_(Y(e),ie(n,r),i):null}}foreachOnPath(e,n){return this.foreachOnPath_(e,H(),n)}foreachOnPath_(e,n,i){if(x(e))return this;{this.value&&i(n,this.value);const s=M(e),r=this.children.get(s);return r?r.foreachOnPath_(Y(e),ie(n,s),i):new X(null)}}foreach(e){this.foreach_(H(),e)}foreach_(e,n){this.children.inorderTraversal((i,s)=>{s.foreach_(ie(e,i),n)}),this.value&&n(e,this.value)}foreachChild(e){this.children.inorderTraversal((n,i)=>{i.value&&e(n,i.value)})}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class pt{constructor(e){this.writeTree_=e}static empty(){return new pt(new X(null))}}function Ps(t,e,n){if(x(e))return new pt(new X(n));{const i=t.writeTree_.findRootMostValueAndPath(e);if(i!=null){const s=i.path;let r=i.value;const o=Fe(s,e);return r=r.updateChild(o,n),new pt(t.writeTree_.set(s,r))}else{const s=new X(n),r=t.writeTree_.setTree(e,s);return new pt(r)}}}function tl(t,e,n){let i=t;return Te(n,(s,r)=>{i=Ps(i,ie(e,s),r)}),i}function pf(t,e){if(x(e))return pt.empty();{const n=t.writeTree_.setTree(e,new X(null));return new pt(n)}}function nl(t,e){return mi(t,e)!=null}function mi(t,e){const n=t.writeTree_.findRootMostValueAndPath(e);return n!=null?t.writeTree_.get(n.path).getChild(Fe(n.path,e)):null}function gf(t){const e=[],n=t.writeTree_.value;return n!=null?n.isLeafNode()||n.forEachChild(se,(i,s)=>{e.push(new F(i,s))}):t.writeTree_.children.inorderTraversal((i,s)=>{s.value!=null&&e.push(new F(i,s.value))}),e}function yn(t,e){if(x(e))return t;{const n=mi(t,e);return n!=null?new pt(new X(n)):new pt(t.writeTree_.subtree(e))}}function il(t){return t.writeTree_.isEmpty()}function zi(t,e){return Em(H(),t.writeTree_,e)}function Em(t,e,n){if(e.value!=null)return n.updateChild(t,e.value);{let i=null;return e.children.inorderTraversal((s,r)=>{s===".priority"?(_(r.value!==null,"Priority writes must always be leaf nodes"),i=r.value):n=Em(ie(t,s),r,n)}),!n.getChild(t).isEmpty()&&i!==null&&(n=n.updateChild(ie(t,".priority"),i)),n}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ua(t,e){return Im(e,t)}function Gk(t,e,n,i,s){_(i>t.lastWriteId,"Stacking an older write on top of newer ones"),s===void 0&&(s=!0),t.allWrites.push({path:e,snap:n,writeId:i,visible:s}),s&&(t.visibleWrites=Ps(t.visibleWrites,e,n)),t.lastWriteId=i}function Kk(t,e,n,i){_(i>t.lastWriteId,"Stacking an older merge on top of newer ones"),t.allWrites.push({path:e,children:n,writeId:i,visible:!0}),t.visibleWrites=tl(t.visibleWrites,e,n),t.lastWriteId=i}function Yk(t,e){for(let n=0;n<t.allWrites.length;n++){const i=t.allWrites[n];if(i.writeId===e)return i}return null}function Jk(t,e){const n=t.allWrites.findIndex(a=>a.writeId===e);_(n>=0,"removeWrite called with nonexistent writeId.");const i=t.allWrites[n];t.allWrites.splice(n,1);let s=i.visible,r=!1,o=t.allWrites.length-1;for(;s&&o>=0;){const a=t.allWrites[o];a.visible&&(o>=n&&Xk(a,i.path)?s=!1:et(i.path,a.path)&&(r=!0)),o--}if(s){if(r)return Qk(t),!0;if(i.snap)t.visibleWrites=pf(t.visibleWrites,i.path);else{const a=i.children;Te(a,c=>{t.visibleWrites=pf(t.visibleWrites,ie(i.path,c))})}return!0}else return!1}function Xk(t,e){if(t.snap)return et(t.path,e);for(const n in t.children)if(t.children.hasOwnProperty(n)&&et(ie(t.path,n),e))return!0;return!1}function Qk(t){t.visibleWrites=Cm(t.allWrites,Zk,H()),t.allWrites.length>0?t.lastWriteId=t.allWrites[t.allWrites.length-1].writeId:t.lastWriteId=-1}function Zk(t){return t.visible}function Cm(t,e,n){let i=pt.empty();for(let s=0;s<t.length;++s){const r=t[s];if(e(r)){const o=r.path;let a;if(r.snap)et(n,o)?(a=Fe(n,o),i=Ps(i,a,r.snap)):et(o,n)&&(a=Fe(o,n),i=Ps(i,H(),r.snap.getChild(a)));else if(r.children){if(et(n,o))a=Fe(n,o),i=tl(i,a,r.children);else if(et(o,n))if(a=Fe(o,n),x(a))i=tl(i,H(),r.children);else{const c=Hi(r.children,M(a));if(c){const l=c.getChild(Y(a));i=Ps(i,H(),l)}}}else throw ts("WriteRecord should have .snap or .children")}}return i}function Tm(t,e,n,i,s){if(!i&&!s){const r=mi(t.visibleWrites,e);if(r!=null)return r;{const o=yn(t.visibleWrites,e);if(il(o))return n;if(n==null&&!nl(o,H()))return null;{const a=n||S.EMPTY_NODE;return zi(o,a)}}}else{const r=yn(t.visibleWrites,e);if(!s&&il(r))return n;if(!s&&n==null&&!nl(r,H()))return null;{const o=function(l){return(l.visible||s)&&(!i||!~i.indexOf(l.writeId))&&(et(l.path,e)||et(e,l.path))},a=Cm(t.allWrites,o,e),c=n||S.EMPTY_NODE;return zi(a,c)}}}function eR(t,e,n){let i=S.EMPTY_NODE;const s=mi(t.visibleWrites,e);if(s)return s.isLeafNode()||s.forEachChild(se,(r,o)=>{i=i.updateImmediateChild(r,o)}),i;if(n){const r=yn(t.visibleWrites,e);return n.forEachChild(se,(o,a)=>{const c=zi(yn(r,new z(o)),a);i=i.updateImmediateChild(o,c)}),gf(r).forEach(o=>{i=i.updateImmediateChild(o.name,o.node)}),i}else{const r=yn(t.visibleWrites,e);return gf(r).forEach(o=>{i=i.updateImmediateChild(o.name,o.node)}),i}}function tR(t,e,n,i,s){_(i||s,"Either existingEventSnap or existingServerSnap must exist");const r=ie(e,n);if(nl(t.visibleWrites,r))return null;{const o=yn(t.visibleWrites,r);return il(o)?s.getChild(n):zi(o,s.getChild(n))}}function nR(t,e,n,i){const s=ie(e,n),r=mi(t.visibleWrites,s);if(r!=null)return r;if(i.isCompleteForChild(n)){const o=yn(t.visibleWrites,s);return zi(o,i.getNode().getImmediateChild(n))}else return null}function iR(t,e){return mi(t.visibleWrites,e)}function sR(t,e,n,i,s,r,o){let a;const c=yn(t.visibleWrites,e),l=mi(c,H());if(l!=null)a=l;else if(n!=null)a=zi(c,n);else return[];if(a=a.withIndex(o),!a.isEmpty()&&!a.isLeafNode()){const u=[],d=o.getCompare(),h=r?a.getReverseIteratorFrom(i,o):a.getIteratorFrom(i,o);let f=h.getNext();for(;f&&u.length<s;)d(f,i)!==0&&u.push(f),f=h.getNext();return u}else return[]}function rR(){return{visibleWrites:pt.empty(),allWrites:[],lastWriteId:-1}}function Co(t,e,n,i){return Tm(t.writeTree,t.treePath,e,n,i)}function hu(t,e){return eR(t.writeTree,t.treePath,e)}function mf(t,e,n,i){return tR(t.writeTree,t.treePath,e,n,i)}function To(t,e){return iR(t.writeTree,ie(t.treePath,e))}function oR(t,e,n,i,s,r){return sR(t.writeTree,t.treePath,e,n,i,s,r)}function fu(t,e,n){return nR(t.writeTree,t.treePath,e,n)}function Sm(t,e){return Im(ie(t.treePath,e),t.writeTree)}function Im(t,e){return{treePath:t,writeTree:e}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class aR{constructor(){this.changeMap=new Map}trackChildChange(e){const n=e.type,i=e.childName;_(n==="child_added"||n==="child_changed"||n==="child_removed","Only child changes supported for tracking"),_(i!==".priority","Only non-priority child changes can be tracked.");const s=this.changeMap.get(i);if(s){const r=s.type;if(n==="child_added"&&r==="child_removed")this.changeMap.set(i,Js(i,e.snapshotNode,s.snapshotNode));else if(n==="child_removed"&&r==="child_added")this.changeMap.delete(i);else if(n==="child_removed"&&r==="child_changed")this.changeMap.set(i,Ys(i,s.oldSnap));else if(n==="child_changed"&&r==="child_added")this.changeMap.set(i,Wi(i,e.snapshotNode));else if(n==="child_changed"&&r==="child_changed")this.changeMap.set(i,Js(i,e.snapshotNode,s.oldSnap));else throw ts("Illegal combination of changes: "+e+" occurred after "+s)}else this.changeMap.set(i,e)}getChanges(){return Array.from(this.changeMap.values())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class cR{getCompleteChild(e){return null}getChildAfterChild(e,n,i){return null}}const km=new cR;class pu{constructor(e,n,i=null){this.writes_=e,this.viewCache_=n,this.optCompleteServerCache_=i}getCompleteChild(e){const n=this.viewCache_.eventCache;if(n.isCompleteForChild(e))return n.getNode().getImmediateChild(e);{const i=this.optCompleteServerCache_!=null?new In(this.optCompleteServerCache_,!0,!1):this.viewCache_.serverCache;return fu(this.writes_,e,i)}}getChildAfterChild(e,n,i){const s=this.optCompleteServerCache_!=null?this.optCompleteServerCache_:ii(this.viewCache_),r=oR(this.writes_,s,n,1,i,e);return r.length===0?null:r[0]}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function lR(t){return{filter:t}}function uR(t,e){_(e.eventCache.getNode().isIndexed(t.filter.getIndex()),"Event snap not indexed"),_(e.serverCache.getNode().isIndexed(t.filter.getIndex()),"Server snap not indexed")}function dR(t,e,n,i,s){const r=new aR;let o,a;if(n.type===lt.OVERWRITE){const l=n;l.source.fromUser?o=sl(t,e,l.path,l.snap,i,s,r):(_(l.source.fromServer,"Unknown source."),a=l.source.tagged||e.serverCache.isFiltered()&&!x(l.path),o=So(t,e,l.path,l.snap,i,s,a,r))}else if(n.type===lt.MERGE){const l=n;l.source.fromUser?o=fR(t,e,l.path,l.children,i,s,r):(_(l.source.fromServer,"Unknown source."),a=l.source.tagged||e.serverCache.isFiltered(),o=rl(t,e,l.path,l.children,i,s,a,r))}else if(n.type===lt.ACK_USER_WRITE){const l=n;l.revert?o=mR(t,e,l.path,i,s,r):o=pR(t,e,l.path,l.affectedTree,i,s,r)}else if(n.type===lt.LISTEN_COMPLETE)o=gR(t,e,n.path,i,r);else throw ts("Unknown operation type: "+n.type);const c=r.getChanges();return hR(e,o,c),{viewCache:o,changes:c}}function hR(t,e,n){const i=e.eventCache;if(i.isFullyInitialized()){const s=i.getNode().isLeafNode()||i.getNode().isEmpty(),r=Eo(t);(n.length>0||!t.eventCache.isFullyInitialized()||s&&!i.getNode().equals(r)||!i.getNode().getPriority().equals(r.getPriority()))&&n.push(vm(Eo(e)))}}function Rm(t,e,n,i,s,r){const o=e.eventCache;if(To(i,n)!=null)return e;{let a,c;if(x(n))if(_(e.serverCache.isFullyInitialized(),"If change path is empty, we must have complete server data"),e.serverCache.isFiltered()){const l=ii(e),u=l instanceof S?l:S.EMPTY_NODE,d=hu(i,u);a=t.filter.updateFullNode(e.eventCache.getNode(),d,r)}else{const l=Co(i,ii(e));a=t.filter.updateFullNode(e.eventCache.getNode(),l,r)}else{const l=M(n);if(l===".priority"){_(Sn(n)===1,"Can't have a priority with additional path components");const u=o.getNode();c=e.serverCache.getNode();const d=mf(i,n,u,c);d!=null?a=t.filter.updatePriority(u,d):a=o.getNode()}else{const u=Y(n);let d;if(o.isCompleteForChild(l)){c=e.serverCache.getNode();const h=mf(i,n,o.getNode(),c);h!=null?d=o.getNode().getImmediateChild(l).updateChild(u,h):d=o.getNode().getImmediateChild(l)}else d=fu(i,l,e.serverCache);d!=null?a=t.filter.updateChild(o.getNode(),l,d,u,s,r):a=o.getNode()}}return Ns(e,a,o.isFullyInitialized()||x(n),t.filter.filtersNodes())}}function So(t,e,n,i,s,r,o,a){const c=e.serverCache;let l;const u=o?t.filter:t.filter.getIndexedFilter();if(x(n))l=u.updateFullNode(c.getNode(),i,null);else if(u.filtersNodes()&&!c.isFiltered()){const f=c.getNode().updateChild(n,i);l=u.updateFullNode(c.getNode(),f,null)}else{const f=M(n);if(!c.isCompleteForPath(n)&&Sn(n)>1)return e;const p=Y(n),m=c.getNode().getImmediateChild(f).updateChild(p,i);f===".priority"?l=u.updatePriority(c.getNode(),m):l=u.updateChild(c.getNode(),f,m,p,km,null)}const d=bm(e,l,c.isFullyInitialized()||x(n),u.filtersNodes()),h=new pu(s,d,r);return Rm(t,d,n,s,h,a)}function sl(t,e,n,i,s,r,o){const a=e.eventCache;let c,l;const u=new pu(s,e,r);if(x(n))l=t.filter.updateFullNode(e.eventCache.getNode(),i,o),c=Ns(e,l,!0,t.filter.filtersNodes());else{const d=M(n);if(d===".priority")l=t.filter.updatePriority(e.eventCache.getNode(),i),c=Ns(e,l,a.isFullyInitialized(),a.isFiltered());else{const h=Y(n),f=a.getNode().getImmediateChild(d);let p;if(x(h))p=i;else{const g=u.getCompleteChild(d);g!=null?su(h)===".priority"&&g.getChild(fm(h)).isEmpty()?p=g:p=g.updateChild(h,i):p=S.EMPTY_NODE}if(f.equals(p))c=e;else{const g=t.filter.updateChild(a.getNode(),d,p,h,u,o);c=Ns(e,g,a.isFullyInitialized(),t.filter.filtersNodes())}}}return c}function _f(t,e){return t.eventCache.isCompleteForChild(e)}function fR(t,e,n,i,s,r,o){let a=e;return i.foreach((c,l)=>{const u=ie(n,c);_f(e,M(u))&&(a=sl(t,a,u,l,s,r,o))}),i.foreach((c,l)=>{const u=ie(n,c);_f(e,M(u))||(a=sl(t,a,u,l,s,r,o))}),a}function yf(t,e,n){return n.foreach((i,s)=>{e=e.updateChild(i,s)}),e}function rl(t,e,n,i,s,r,o,a){if(e.serverCache.getNode().isEmpty()&&!e.serverCache.isFullyInitialized())return e;let c=e,l;x(n)?l=i:l=new X(null).setTree(n,i);const u=e.serverCache.getNode();return l.children.inorderTraversal((d,h)=>{if(u.hasChild(d)){const f=e.serverCache.getNode().getImmediateChild(d),p=yf(t,f,h);c=So(t,c,new z(d),p,s,r,o,a)}}),l.children.inorderTraversal((d,h)=>{const f=!e.serverCache.isCompleteForChild(d)&&h.value===null;if(!u.hasChild(d)&&!f){const p=e.serverCache.getNode().getImmediateChild(d),g=yf(t,p,h);c=So(t,c,new z(d),g,s,r,o,a)}}),c}function pR(t,e,n,i,s,r,o){if(To(s,n)!=null)return e;const a=e.serverCache.isFiltered(),c=e.serverCache;if(i.value!=null){if(x(n)&&c.isFullyInitialized()||c.isCompleteForPath(n))return So(t,e,n,c.getNode().getChild(n),s,r,a,o);if(x(n)){let l=new X(null);return c.getNode().forEachChild(Si,(u,d)=>{l=l.set(new z(u),d)}),rl(t,e,n,l,s,r,a,o)}else return e}else{let l=new X(null);return i.foreach((u,d)=>{const h=ie(n,u);c.isCompleteForPath(h)&&(l=l.set(u,c.getNode().getChild(h)))}),rl(t,e,n,l,s,r,a,o)}}function gR(t,e,n,i,s){const r=e.serverCache,o=bm(e,r.getNode(),r.isFullyInitialized()||x(n),r.isFiltered());return Rm(t,o,n,i,km,s)}function mR(t,e,n,i,s,r){let o;if(To(i,n)!=null)return e;{const a=new pu(i,e,s),c=e.eventCache.getNode();let l;if(x(n)||M(n)===".priority"){let u;if(e.serverCache.isFullyInitialized())u=Co(i,ii(e));else{const d=e.serverCache.getNode();_(d instanceof S,"serverChildren would be complete if leaf node"),u=hu(i,d)}u=u,l=t.filter.updateFullNode(c,u,r)}else{const u=M(n);let d=fu(i,u,e.serverCache);d==null&&e.serverCache.isCompleteForChild(u)&&(d=c.getImmediateChild(u)),d!=null?l=t.filter.updateChild(c,u,d,Y(n),a,r):e.eventCache.getNode().hasChild(u)?l=t.filter.updateChild(c,u,S.EMPTY_NODE,Y(n),a,r):l=c,l.isEmpty()&&e.serverCache.isFullyInitialized()&&(o=Co(i,ii(e)),o.isLeafNode()&&(l=t.filter.updateFullNode(l,o,r)))}return o=e.serverCache.isFullyInitialized()||To(i,H())!=null,Ns(e,l,o,t.filter.filtersNodes())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class _R{constructor(e,n){this.query_=e,this.eventRegistrations_=[];const i=this.query_._queryParams,s=new cu(i.getIndex()),r=Mk(i);this.processor_=lR(r);const o=n.serverCache,a=n.eventCache,c=s.updateFullNode(S.EMPTY_NODE,o.getNode(),null),l=r.updateFullNode(S.EMPTY_NODE,a.getNode(),null),u=new In(c,o.isFullyInitialized(),s.filtersNodes()),d=new In(l,a.isFullyInitialized(),r.filtersNodes());this.viewCache_=la(d,u),this.eventGenerator_=new Vk(this.query_)}get query(){return this.query_}}function yR(t){return t.viewCache_.serverCache.getNode()}function wR(t){return Eo(t.viewCache_)}function vR(t,e){const n=ii(t.viewCache_);return n&&(t.query._queryParams.loadsAllData()||!x(e)&&!n.getImmediateChild(M(e)).isEmpty())?n.getChild(e):null}function wf(t){return t.eventRegistrations_.length===0}function bR(t,e){t.eventRegistrations_.push(e)}function vf(t,e,n){const i=[];if(n){_(e==null,"A cancel should cancel all event registrations.");const s=t.query._path;t.eventRegistrations_.forEach(r=>{const o=r.createCancelEvent(n,s);o&&i.push(o)})}if(e){let s=[];for(let r=0;r<t.eventRegistrations_.length;++r){const o=t.eventRegistrations_[r];if(!o.matches(e))s.push(o);else if(e.hasAnyCallback()){s=s.concat(t.eventRegistrations_.slice(r+1));break}}t.eventRegistrations_=s}else t.eventRegistrations_=[];return i}function bf(t,e,n,i){e.type===lt.MERGE&&e.source.queryId!==null&&(_(ii(t.viewCache_),"We should always have a full cache before handling merges"),_(Eo(t.viewCache_),"Missing event cache, even though we have a server cache"));const s=t.viewCache_,r=dR(t.processor_,s,e,n,i);return uR(t.processor_,r.viewCache),_(r.viewCache.serverCache.isFullyInitialized()||!s.serverCache.isFullyInitialized(),"Once a server snap is complete, it should never go back"),t.viewCache_=r.viewCache,Am(t,r.changes,r.viewCache.eventCache.getNode(),null)}function ER(t,e){const n=t.viewCache_.eventCache,i=[];return n.getNode().isLeafNode()||n.getNode().forEachChild(se,(r,o)=>{i.push(Wi(r,o))}),n.isFullyInitialized()&&i.push(vm(n.getNode())),Am(t,i,n.getNode(),e)}function Am(t,e,n,i){const s=i?[i]:t.eventRegistrations_;return jk(t.eventGenerator_,e,n,s)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Io;class Nm{constructor(){this.views=new Map}}function CR(t){_(!Io,"__referenceConstructor has already been defined"),Io=t}function TR(){return _(Io,"Reference.ts has not been loaded"),Io}function SR(t){return t.views.size===0}function gu(t,e,n,i){const s=e.source.queryId;if(s!==null){const r=t.views.get(s);return _(r!=null,"SyncTree gave us an op for an invalid query."),bf(r,e,n,i)}else{let r=[];for(const o of t.views.values())r=r.concat(bf(o,e,n,i));return r}}function Pm(t,e,n,i,s){const r=e._queryIdentifier,o=t.views.get(r);if(!o){let a=Co(n,s?i:null),c=!1;a?c=!0:i instanceof S?(a=hu(n,i),c=!1):(a=S.EMPTY_NODE,c=!1);const l=la(new In(a,c,!1),new In(i,s,!1));return new _R(e,l)}return o}function IR(t,e,n,i,s,r){const o=Pm(t,e,i,s,r);return t.views.has(e._queryIdentifier)||t.views.set(e._queryIdentifier,o),bR(o,n),ER(o,n)}function kR(t,e,n,i){const s=e._queryIdentifier,r=[];let o=[];const a=kn(t);if(s==="default")for(const[c,l]of t.views.entries())o=o.concat(vf(l,n,i)),wf(l)&&(t.views.delete(c),l.query._queryParams.loadsAllData()||r.push(l.query));else{const c=t.views.get(s);c&&(o=o.concat(vf(c,n,i)),wf(c)&&(t.views.delete(s),c.query._queryParams.loadsAllData()||r.push(c.query)))}return a&&!kn(t)&&r.push(new(TR())(e._repo,e._path)),{removed:r,events:o}}function Lm(t){const e=[];for(const n of t.views.values())n.query._queryParams.loadsAllData()||e.push(n);return e}function wn(t,e){let n=null;for(const i of t.views.values())n=n||vR(i,e);return n}function Om(t,e){if(e._queryParams.loadsAllData())return da(t);{const i=e._queryIdentifier;return t.views.get(i)}}function Dm(t,e){return Om(t,e)!=null}function kn(t){return da(t)!=null}function da(t){for(const e of t.views.values())if(e.query._queryParams.loadsAllData())return e;return null}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let ko;function RR(t){_(!ko,"__referenceConstructor has already been defined"),ko=t}function AR(){return _(ko,"Reference.ts has not been loaded"),ko}let NR=1;class Ef{constructor(e){this.listenProvider_=e,this.syncPointTree_=new X(null),this.pendingWriteTree_=rR(),this.tagToQueryMap=new Map,this.queryToTagMap=new Map}}function Mm(t,e,n,i,s){return Gk(t.pendingWriteTree_,e,n,i,s),s?as(t,new ni(lu(),e,n)):[]}function PR(t,e,n,i){Kk(t.pendingWriteTree_,e,n,i);const s=X.fromObject(n);return as(t,new qi(lu(),e,s))}function hn(t,e,n=!1){const i=Yk(t.pendingWriteTree_,e);if(Jk(t.pendingWriteTree_,e)){let r=new X(null);return i.snap!=null?r=r.set(H(),!0):Te(i.children,o=>{r=r.set(new z(o),!0)}),as(t,new bo(i.path,r,n))}else return[]}function br(t,e,n){return as(t,new ni(uu(),e,n))}function LR(t,e,n){const i=X.fromObject(n);return as(t,new qi(uu(),e,i))}function OR(t,e){return as(t,new Qs(uu(),e))}function DR(t,e,n){const i=_u(t,n);if(i){const s=yu(i),r=s.path,o=s.queryId,a=Fe(r,e),c=new Qs(du(o),a);return wu(t,r,c)}else return[]}function Ro(t,e,n,i,s=!1){const r=e._path,o=t.syncPointTree_.get(r);let a=[];if(o&&(e._queryIdentifier==="default"||Dm(o,e))){const c=kR(o,e,n,i);SR(o)&&(t.syncPointTree_=t.syncPointTree_.remove(r));const l=c.removed;if(a=c.events,!s){const u=l.findIndex(h=>h._queryParams.loadsAllData())!==-1,d=t.syncPointTree_.findOnPath(r,(h,f)=>kn(f));if(u&&!d){const h=t.syncPointTree_.subtree(r);if(!h.isEmpty()){const f=FR(h);for(let p=0;p<f.length;++p){const g=f[p],m=g.query,T=$m(t,g);t.listenProvider_.startListening(Ls(m),Zs(t,m),T.hashFn,T.onComplete)}}}!d&&l.length>0&&!i&&(u?t.listenProvider_.stopListening(Ls(e),null):l.forEach(h=>{const f=t.queryToTagMap.get(ha(h));t.listenProvider_.stopListening(Ls(h),f)}))}UR(t,l)}return a}function xm(t,e,n,i){const s=_u(t,i);if(s!=null){const r=yu(s),o=r.path,a=r.queryId,c=Fe(o,e),l=new ni(du(a),c,n);return wu(t,o,l)}else return[]}function MR(t,e,n,i){const s=_u(t,i);if(s){const r=yu(s),o=r.path,a=r.queryId,c=Fe(o,e),l=X.fromObject(n),u=new qi(du(a),c,l);return wu(t,o,u)}else return[]}function ol(t,e,n,i=!1){const s=e._path;let r=null,o=!1;t.syncPointTree_.foreachOnPath(s,(h,f)=>{const p=Fe(h,s);r=r||wn(f,p),o=o||kn(f)});let a=t.syncPointTree_.get(s);a?(o=o||kn(a),r=r||wn(a,H())):(a=new Nm,t.syncPointTree_=t.syncPointTree_.set(s,a));let c;r!=null?c=!0:(c=!1,r=S.EMPTY_NODE,t.syncPointTree_.subtree(s).foreachChild((f,p)=>{const g=wn(p,H());g&&(r=r.updateImmediateChild(f,g))}));const l=Dm(a,e);if(!l&&!e._queryParams.loadsAllData()){const h=ha(e);_(!t.queryToTagMap.has(h),"View does not exist, but we have a tag");const f=$R();t.queryToTagMap.set(h,f),t.tagToQueryMap.set(f,h)}const u=ua(t.pendingWriteTree_,s);let d=IR(a,e,n,u,r,c);if(!l&&!o&&!i){const h=Om(a,e);d=d.concat(BR(t,e,h))}return d}function mu(t,e,n){const s=t.pendingWriteTree_,r=t.syncPointTree_.findOnPath(e,(o,a)=>{const c=Fe(o,e),l=wn(a,c);if(l)return l});return Tm(s,e,r,n,!0)}function xR(t,e){const n=e._path;let i=null;t.syncPointTree_.foreachOnPath(n,(l,u)=>{const d=Fe(l,n);i=i||wn(u,d)});let s=t.syncPointTree_.get(n);s?i=i||wn(s,H()):(s=new Nm,t.syncPointTree_=t.syncPointTree_.set(n,s));const r=i!=null,o=r?new In(i,!0,!1):null,a=ua(t.pendingWriteTree_,e._path),c=Pm(s,e,a,r?o.getNode():S.EMPTY_NODE,r);return wR(c)}function as(t,e){return Fm(e,t.syncPointTree_,null,ua(t.pendingWriteTree_,H()))}function Fm(t,e,n,i){if(x(t.path))return Um(t,e,n,i);{const s=e.get(H());n==null&&s!=null&&(n=wn(s,H()));let r=[];const o=M(t.path),a=t.operationForChild(o),c=e.children.get(o);if(c&&a){const l=n?n.getImmediateChild(o):null,u=Sm(i,o);r=r.concat(Fm(a,c,l,u))}return s&&(r=r.concat(gu(s,t,i,n))),r}}function Um(t,e,n,i){const s=e.get(H());n==null&&s!=null&&(n=wn(s,H()));let r=[];return e.children.inorderTraversal((o,a)=>{const c=n?n.getImmediateChild(o):null,l=Sm(i,o),u=t.operationForChild(o);u&&(r=r.concat(Um(u,a,c,l)))}),s&&(r=r.concat(gu(s,t,i,n))),r}function $m(t,e){const n=e.query,i=Zs(t,n);return{hashFn:()=>(yR(e)||S.EMPTY_NODE).hash(),onComplete:s=>{if(s==="ok")return i?DR(t,n._path,i):OR(t,n._path);{const r=OI(s,n);return Ro(t,n,null,r)}}}}function Zs(t,e){const n=ha(e);return t.queryToTagMap.get(n)}function ha(t){return t._path.toString()+"$"+t._queryIdentifier}function _u(t,e){return t.tagToQueryMap.get(e)}function yu(t){const e=t.indexOf("$");return _(e!==-1&&e<t.length-1,"Bad queryKey."),{queryId:t.substr(e+1),path:new z(t.substr(0,e))}}function wu(t,e,n){const i=t.syncPointTree_.get(e);_(i,"Missing sync point for query tag that we're tracking");const s=ua(t.pendingWriteTree_,e);return gu(i,n,s,null)}function FR(t){return t.fold((e,n,i)=>{if(n&&kn(n))return[da(n)];{let s=[];return n&&(s=Lm(n)),Te(i,(r,o)=>{s=s.concat(o)}),s}})}function Ls(t){return t._queryParams.loadsAllData()&&!t._queryParams.isDefault()?new(AR())(t._repo,t._path):t}function UR(t,e){for(let n=0;n<e.length;++n){const i=e[n];if(!i._queryParams.loadsAllData()){const s=ha(i),r=t.queryToTagMap.get(s);t.queryToTagMap.delete(s),t.tagToQueryMap.delete(r)}}}function $R(){return NR++}function BR(t,e,n){const i=e._path,s=Zs(t,e),r=$m(t,n),o=t.listenProvider_.startListening(Ls(e),s,r.hashFn,r.onComplete),a=t.syncPointTree_.subtree(i);if(s)_(!kn(a.value),"If we're adding a query, it shouldn't be shadowed");else{const c=a.fold((l,u,d)=>{if(!x(l)&&u&&kn(u))return[da(u).query];{let h=[];return u&&(h=h.concat(Lm(u).map(f=>f.query))),Te(d,(f,p)=>{h=h.concat(p)}),h}});for(let l=0;l<c.length;++l){const u=c[l];t.listenProvider_.stopListening(Ls(u),Zs(t,u))}}return o}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class vu{constructor(e){this.node_=e}getImmediateChild(e){const n=this.node_.getImmediateChild(e);return new vu(n)}node(){return this.node_}}class bu{constructor(e,n){this.syncTree_=e,this.path_=n}getImmediateChild(e){const n=ie(this.path_,e);return new bu(this.syncTree_,n)}node(){return mu(this.syncTree_,this.path_)}}const HR=function(t){return t=t||{},t.timestamp=t.timestamp||new Date().getTime(),t},Cf=function(t,e,n){if(!t||typeof t!="object")return t;if(_(".sv"in t,"Unexpected leaf node or priority contents"),typeof t[".sv"]=="string")return VR(t[".sv"],e,n);if(typeof t[".sv"]=="object")return jR(t[".sv"],e);_(!1,"Unexpected server value: "+JSON.stringify(t,null,2))},VR=function(t,e,n){switch(t){case"timestamp":return n.timestamp;default:_(!1,"Unexpected server value: "+t)}},jR=function(t,e,n){t.hasOwnProperty("increment")||_(!1,"Unexpected server value: "+JSON.stringify(t,null,2));const i=t.increment;typeof i!="number"&&_(!1,"Unexpected increment value: "+i);const s=e.node();if(_(s!==null&&typeof s<"u","Expected ChildrenNode.EMPTY_NODE for nulls"),!s.isLeafNode())return i;const o=s.getValue();return typeof o!="number"?i:o+i},Bm=function(t,e,n,i){return Eu(e,new bu(n,t),i)},Hm=function(t,e,n){return Eu(t,new vu(e),n)};function Eu(t,e,n){const i=t.getPriority().val(),s=Cf(i,e.getImmediateChild(".priority"),n);let r;if(t.isLeafNode()){const o=t,a=Cf(o.getValue(),e,n);return a!==o.getValue()||s!==o.getPriority().val()?new we(a,ae(s)):t}else{const o=t;return r=o,s!==o.getPriority().val()&&(r=r.updatePriority(new we(s))),o.forEachChild(se,(a,c)=>{const l=Eu(c,e.getImmediateChild(a),n);l!==c&&(r=r.updateImmediateChild(a,l))}),r}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Cu{constructor(e="",n=null,i={children:{},childCount:0}){this.name=e,this.parent=n,this.node=i}}function Tu(t,e){let n=e instanceof z?e:new z(e),i=t,s=M(n);for(;s!==null;){const r=Hi(i.node.children,s)||{children:{},childCount:0};i=new Cu(s,i,r),n=Y(n),s=M(n)}return i}function cs(t){return t.node.value}function Vm(t,e){t.node.value=e,al(t)}function jm(t){return t.node.childCount>0}function WR(t){return cs(t)===void 0&&!jm(t)}function fa(t,e){Te(t.node.children,(n,i)=>{e(new Cu(n,t,i))})}function Wm(t,e,n,i){n&&e(t),fa(t,s=>{Wm(s,e,!0)})}function qR(t,e,n){let i=t.parent;for(;i!==null;){if(e(i))return!0;i=i.parent}return!1}function Er(t){return new z(t.parent===null?t.name:Er(t.parent)+"/"+t.name)}function al(t){t.parent!==null&&zR(t.parent,t.name,t)}function zR(t,e,n){const i=WR(n),s=Lt(t.node.children,e);i&&s?(delete t.node.children[e],t.node.childCount--,al(t)):!i&&!s&&(t.node.children[e]=n.node,t.node.childCount++,al(t))}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const GR=/[\[\].#$\/\u0000-\u001F\u007F]/,KR=/[\[\].#$\u0000-\u001F\u007F]/,lc=10*1024*1024,Su=function(t){return typeof t=="string"&&t.length!==0&&!GR.test(t)},qm=function(t){return typeof t=="string"&&t.length!==0&&!KR.test(t)},YR=function(t){return t&&(t=t.replace(/^\/*\.info(\/|$)/,"/")),qm(t)},zm=function(t){return t===null||typeof t=="string"||typeof t=="number"&&!oa(t)||t&&typeof t=="object"&&Lt(t,".sv")},Ao=function(t,e,n,i){i&&e===void 0||pa(Vi(t,"value"),e,n)},pa=function(t,e,n){const i=n instanceof z?new fk(n,t):n;if(e===void 0)throw new Error(t+"contains undefined "+Bn(i));if(typeof e=="function")throw new Error(t+"contains a function "+Bn(i)+" with contents = "+e.toString());if(oa(e))throw new Error(t+"contains "+e.toString()+" "+Bn(i));if(typeof e=="string"&&e.length>lc/3&&na(e)>lc)throw new Error(t+"contains a string greater than "+lc+" utf8 bytes "+Bn(i)+" ('"+e.substring(0,50)+"...')");if(e&&typeof e=="object"){let s=!1,r=!1;if(Te(e,(o,a)=>{if(o===".value")s=!0;else if(o!==".priority"&&o!==".sv"&&(r=!0,!Su(o)))throw new Error(t+" contains an invalid key ("+o+") "+Bn(i)+`.  Keys must be non-empty strings and can't contain ".", "#", "$", "/", "[", or "]"`);pk(i,o),pa(t,a,i),gk(i)}),s&&r)throw new Error(t+' contains ".value" child '+Bn(i)+" in addition to actual children.")}},JR=function(t,e){let n,i;for(n=0;n<e.length;n++){i=e[n];const r=Ks(i);for(let o=0;o<r.length;o++)if(!(r[o]===".priority"&&o===r.length-1)){if(!Su(r[o]))throw new Error(t+"contains an invalid key ("+r[o]+") in path "+i.toString()+`. Keys must be non-empty strings and can't contain ".", "#", "$", "/", "[", or "]"`)}}e.sort(hk);let s=null;for(n=0;n<e.length;n++){if(i=e[n],s!==null&&et(s,i))throw new Error(t+"contains a path "+s.toString()+" that is ancestor of another path "+i.toString());s=i}},Gm=function(t,e,n,i){const s=Vi(t,"values");if(!(e&&typeof e=="object")||Array.isArray(e))throw new Error(s+" must be an object containing the children to replace.");const r=[];Te(e,(o,a)=>{const c=new z(o);if(pa(s,a,ie(n,c)),su(c)===".priority"&&!zm(a))throw new Error(s+"contains an invalid value for '"+c.toString()+"', which must be a valid Firebase priority (a string, finite number, server value, or null).");r.push(c)}),JR(s,r)},XR=function(t,e,n){if(oa(e))throw new Error(Vi(t,"priority")+"is "+e.toString()+", but must be a valid Firebase priority (a string, finite number, server value, or null).");if(!zm(e))throw new Error(Vi(t,"priority")+"must be a valid Firebase priority (a string, finite number, server value, or null).")},Iu=function(t,e,n,i){if(!qm(n))throw new Error(Vi(t,e)+'was an invalid path = "'+n+`". Paths must be non-empty strings and can't contain ".", "#", "$", "[", or "]"`)},QR=function(t,e,n,i){n&&(n=n.replace(/^\/*\.info(\/|$)/,"/")),Iu(t,e,n)},fn=function(t,e){if(M(e)===".info")throw new Error(t+" failed = Can't modify data under /.info/")},ZR=function(t,e){const n=e.path.toString();if(typeof e.repoInfo.host!="string"||e.repoInfo.host.length===0||!Su(e.repoInfo.namespace)&&e.repoInfo.host.split(":")[0]!=="localhost"||n.length!==0&&!YR(n))throw new Error(Vi(t,"url")+`must be a valid firebase URL and the path can't contain ".", "#", "$", "[", or "]".`)};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class eA{constructor(){this.eventLists_=[],this.recursionDepth_=0}}function ga(t,e){let n=null;for(let i=0;i<e.length;i++){const s=e[i],r=s.getPath();n!==null&&!ru(r,n.path)&&(t.eventLists_.push(n),n=null),n===null&&(n={events:[],path:r}),n.events.push(s)}n&&t.eventLists_.push(n)}function Km(t,e,n){ga(t,n),Ym(t,i=>ru(i,e))}function rt(t,e,n){ga(t,n),Ym(t,i=>et(i,e)||et(e,i))}function Ym(t,e){t.recursionDepth_++;let n=!0;for(let i=0;i<t.eventLists_.length;i++){const s=t.eventLists_[i];if(s){const r=s.path;e(r)?(tA(t.eventLists_[i]),t.eventLists_[i]=null):n=!1}}n&&(t.eventLists_=[]),t.recursionDepth_--}function tA(t){for(let e=0;e<t.events.length;e++){const n=t.events[e];if(n!==null){t.events[e]=null;const i=n.getEventRunner();Rs&&be("event: "+n.toString()),rs(i)}}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const nA="repo_interrupt",iA=25;class sA{constructor(e,n,i,s){this.repoInfo_=e,this.forceRestClient_=n,this.authTokenProvider_=i,this.appCheckProvider_=s,this.dataUpdateCount=0,this.statsListener_=null,this.eventQueue_=new eA,this.nextWriteId_=1,this.interceptServerDataCallback_=null,this.onDisconnect_=vo(),this.transactionQueueTree_=new Cu,this.persistentConnection_=null,this.key=this.repoInfo_.toURLString()}toString(){return(this.repoInfo_.secure?"https://":"http://")+this.repoInfo_.host}}function rA(t,e,n){if(t.stats_=nu(t.repoInfo_),t.forceRestClient_||FI())t.server_=new wo(t.repoInfo_,(i,s,r,o)=>{Tf(t,i,s,r,o)},t.authTokenProvider_,t.appCheckProvider_),setTimeout(()=>Sf(t,!0),0);else{if(typeof n<"u"&&n!==null){if(typeof n!="object")throw new Error("Only objects are supported for option databaseAuthVariableOverride");try{me(n)}catch(i){throw new Error("Invalid authOverride provided: "+i)}}t.persistentConnection_=new qt(t.repoInfo_,e,(i,s,r,o)=>{Tf(t,i,s,r,o)},i=>{Sf(t,i)},i=>{oA(t,i)},t.authTokenProvider_,t.appCheckProvider_,n),t.server_=t.persistentConnection_}t.authTokenProvider_.addTokenChangeListener(i=>{t.server_.refreshAuthToken(i)}),t.appCheckProvider_.addTokenChangeListener(i=>{t.server_.refreshAppCheckToken(i.token)}),t.statsReporter_=VI(t.repoInfo_,()=>new Hk(t.stats_,t.server_)),t.infoData_=new xk,t.infoSyncTree_=new Ef({startListening:(i,s,r,o)=>{let a=[];const c=t.infoData_.getNode(i._path);return c.isEmpty()||(a=br(t.infoSyncTree_,i._path,c),setTimeout(()=>{o("ok")},0)),a},stopListening:()=>{}}),ku(t,"connected",!1),t.serverSyncTree_=new Ef({startListening:(i,s,r,o)=>(t.server_.listen(i,r,s,(a,c)=>{const l=o(a,c);rt(t.eventQueue_,i._path,l)}),[]),stopListening:(i,s)=>{t.server_.unlisten(i,s)}})}function Jm(t){const n=t.infoData_.getNode(new z(".info/serverTimeOffset")).val()||0;return new Date().getTime()+n}function ma(t){return HR({timestamp:Jm(t)})}function Tf(t,e,n,i,s){t.dataUpdateCount++;const r=new z(e);n=t.interceptServerDataCallback_?t.interceptServerDataCallback_(e,n):n;let o=[];if(s)if(i){const c=po(n,l=>ae(l));o=MR(t.serverSyncTree_,r,c,s)}else{const c=ae(n);o=xm(t.serverSyncTree_,r,c,s)}else if(i){const c=po(n,l=>ae(l));o=LR(t.serverSyncTree_,r,c)}else{const c=ae(n);o=br(t.serverSyncTree_,r,c)}let a=r;o.length>0&&(a=Gi(t,r)),rt(t.eventQueue_,a,o)}function Sf(t,e){ku(t,"connected",e),e===!1&&uA(t)}function oA(t,e){Te(e,(n,i)=>{ku(t,n,i)})}function ku(t,e,n){const i=new z("/.info/"+e),s=ae(n);t.infoData_.updateSnapshot(i,s);const r=br(t.infoSyncTree_,i,s);rt(t.eventQueue_,i,r)}function Ru(t){return t.nextWriteId_++}function aA(t,e,n){const i=xR(t.serverSyncTree_,e);return i!=null?Promise.resolve(i):t.server_.get(e).then(s=>{const r=ae(s).withIndex(e._queryParams.getIndex());ol(t.serverSyncTree_,e,n,!0);let o;if(e._queryParams.loadsAllData())o=br(t.serverSyncTree_,e._path,r);else{const a=Zs(t.serverSyncTree_,e);o=xm(t.serverSyncTree_,e._path,r,a)}return rt(t.eventQueue_,e._path,o),Ro(t.serverSyncTree_,e,n,null,!0),r},s=>(Cr(t,"get for query "+me(e)+" failed: "+s),Promise.reject(new Error(s))))}function cA(t,e,n,i,s){Cr(t,"set",{path:e.toString(),value:n,priority:i});const r=ma(t),o=ae(n,i),a=mu(t.serverSyncTree_,e),c=Hm(o,a,r),l=Ru(t),u=Mm(t.serverSyncTree_,e,c,l,!0);ga(t.eventQueue_,u),t.server_.put(e.toString(),o.val(!0),(h,f)=>{const p=h==="ok";p||Be("set at "+e+" failed: "+h);const g=hn(t.serverSyncTree_,l,!p);rt(t.eventQueue_,e,g),Rn(t,s,h,f)});const d=Nu(t,e);Gi(t,d),rt(t.eventQueue_,d,[])}function lA(t,e,n,i){Cr(t,"update",{path:e.toString(),value:n});let s=!0;const r=ma(t),o={};if(Te(n,(a,c)=>{s=!1,o[a]=Bm(ie(e,a),ae(c),t.serverSyncTree_,r)}),s)be("update() called with empty data.  Don't do anything."),Rn(t,i,"ok",void 0);else{const a=Ru(t),c=PR(t.serverSyncTree_,e,o,a);ga(t.eventQueue_,c),t.server_.merge(e.toString(),n,(l,u)=>{const d=l==="ok";d||Be("update at "+e+" failed: "+l);const h=hn(t.serverSyncTree_,a,!d),f=h.length>0?Gi(t,e):e;rt(t.eventQueue_,f,h),Rn(t,i,l,u)}),Te(n,l=>{const u=Nu(t,ie(e,l));Gi(t,u)}),rt(t.eventQueue_,e,[])}}function uA(t){Cr(t,"onDisconnectEvents");const e=ma(t),n=vo();el(t.onDisconnect_,H(),(s,r)=>{const o=Bm(s,r,t.serverSyncTree_,e);os(n,s,o)});let i=[];el(n,H(),(s,r)=>{i=i.concat(br(t.serverSyncTree_,s,r));const o=Nu(t,s);Gi(t,o)}),t.onDisconnect_=vo(),rt(t.eventQueue_,H(),i)}function dA(t,e,n){t.server_.onDisconnectCancel(e.toString(),(i,s)=>{i==="ok"&&Zc(t.onDisconnect_,e),Rn(t,n,i,s)})}function If(t,e,n,i){const s=ae(n);t.server_.onDisconnectPut(e.toString(),s.val(!0),(r,o)=>{r==="ok"&&os(t.onDisconnect_,e,s),Rn(t,i,r,o)})}function hA(t,e,n,i,s){const r=ae(n,i);t.server_.onDisconnectPut(e.toString(),r.val(!0),(o,a)=>{o==="ok"&&os(t.onDisconnect_,e,r),Rn(t,s,o,a)})}function fA(t,e,n,i){if(fo(n)){be("onDisconnect().update() called with empty data.  Don't do anything."),Rn(t,i,"ok",void 0);return}t.server_.onDisconnectMerge(e.toString(),n,(s,r)=>{s==="ok"&&Te(n,(o,a)=>{const c=ae(a);os(t.onDisconnect_,ie(e,o),c)}),Rn(t,i,s,r)})}function pA(t,e,n){let i;M(e._path)===".info"?i=ol(t.infoSyncTree_,e,n):i=ol(t.serverSyncTree_,e,n),Km(t.eventQueue_,e._path,i)}function Xm(t,e,n){let i;M(e._path)===".info"?i=Ro(t.infoSyncTree_,e,n):i=Ro(t.serverSyncTree_,e,n),Km(t.eventQueue_,e._path,i)}function gA(t){t.persistentConnection_&&t.persistentConnection_.interrupt(nA)}function Cr(t,...e){let n="";t.persistentConnection_&&(n=t.persistentConnection_.id+":"),be(n,...e)}function Rn(t,e,n,i){e&&rs(()=>{if(n==="ok")e(null);else{const s=(n||"error").toUpperCase();let r=s;i&&(r+=": "+i);const o=new Error(r);o.code=s,e(o)}})}function Qm(t,e,n){return mu(t.serverSyncTree_,e,n)||S.EMPTY_NODE}function Au(t,e=t.transactionQueueTree_){if(e||_a(t,e),cs(e)){const n=e_(t,e);_(n.length>0,"Sending zero length transaction queue"),n.every(s=>s.status===0)&&mA(t,Er(e),n)}else jm(e)&&fa(e,n=>{Au(t,n)})}function mA(t,e,n){const i=n.map(l=>l.currentWriteId),s=Qm(t,e,i);let r=s;const o=s.hash();for(let l=0;l<n.length;l++){const u=n[l];_(u.status===0,"tryToSendTransactionQueue_: items in queue should all be run."),u.status=1,u.retryCount++;const d=Fe(e,u.path);r=r.updateChild(d,u.currentOutputSnapshotRaw)}const a=r.val(!0),c=e;t.server_.put(c.toString(),a,l=>{Cr(t,"transaction put response",{path:c.toString(),status:l});let u=[];if(l==="ok"){const d=[];for(let h=0;h<n.length;h++)n[h].status=2,u=u.concat(hn(t.serverSyncTree_,n[h].currentWriteId)),n[h].onComplete&&d.push(()=>n[h].onComplete(null,!0,n[h].currentOutputSnapshotResolved)),n[h].unwatcher();_a(t,Tu(t.transactionQueueTree_,e)),Au(t,t.transactionQueueTree_),rt(t.eventQueue_,e,u);for(let h=0;h<d.length;h++)rs(d[h])}else{if(l==="datastale")for(let d=0;d<n.length;d++)n[d].status===3?n[d].status=4:n[d].status=0;else{Be("transaction at "+c.toString()+" failed: "+l);for(let d=0;d<n.length;d++)n[d].status=4,n[d].abortReason=l}Gi(t,e)}},o)}function Gi(t,e){const n=Zm(t,e),i=Er(n),s=e_(t,n);return _A(t,s,i),i}function _A(t,e,n){if(e.length===0)return;const i=[];let s=[];const o=e.filter(a=>a.status===0).map(a=>a.currentWriteId);for(let a=0;a<e.length;a++){const c=e[a],l=Fe(n,c.path);let u=!1,d;if(_(l!==null,"rerunTransactionsUnderNode_: relativePath should not be null."),c.status===4)u=!0,d=c.abortReason,s=s.concat(hn(t.serverSyncTree_,c.currentWriteId,!0));else if(c.status===0)if(c.retryCount>=iA)u=!0,d="maxretry",s=s.concat(hn(t.serverSyncTree_,c.currentWriteId,!0));else{const h=Qm(t,c.path,o);c.currentInputSnapshot=h;const f=e[a].update(h.val());if(f!==void 0){pa("transaction failed: Data returned ",f,c.path);let p=ae(f);typeof f=="object"&&f!=null&&Lt(f,".priority")||(p=p.updatePriority(h.getPriority()));const m=c.currentWriteId,T=ma(t),P=Hm(p,h,T);c.currentOutputSnapshotRaw=p,c.currentOutputSnapshotResolved=P,c.currentWriteId=Ru(t),o.splice(o.indexOf(m),1),s=s.concat(Mm(t.serverSyncTree_,c.path,P,c.currentWriteId,c.applyLocally)),s=s.concat(hn(t.serverSyncTree_,m,!0))}else u=!0,d="nodata",s=s.concat(hn(t.serverSyncTree_,c.currentWriteId,!0))}rt(t.eventQueue_,n,s),s=[],u&&(e[a].status=2,(function(h){setTimeout(h,Math.floor(0))})(e[a].unwatcher),e[a].onComplete&&(d==="nodata"?i.push(()=>e[a].onComplete(null,!1,e[a].currentInputSnapshot)):i.push(()=>e[a].onComplete(new Error(d),!1,null))))}_a(t,t.transactionQueueTree_);for(let a=0;a<i.length;a++)rs(i[a]);Au(t,t.transactionQueueTree_)}function Zm(t,e){let n,i=t.transactionQueueTree_;for(n=M(e);n!==null&&cs(i)===void 0;)i=Tu(i,n),e=Y(e),n=M(e);return i}function e_(t,e){const n=[];return t_(t,e,n),n.sort((i,s)=>i.order-s.order),n}function t_(t,e,n){const i=cs(e);if(i)for(let s=0;s<i.length;s++)n.push(i[s]);fa(e,s=>{t_(t,s,n)})}function _a(t,e){const n=cs(e);if(n){let i=0;for(let s=0;s<n.length;s++)n[s].status!==2&&(n[i]=n[s],i++);n.length=i,Vm(e,n.length>0?n:void 0)}fa(e,i=>{_a(t,i)})}function Nu(t,e){const n=Er(Zm(t,e)),i=Tu(t.transactionQueueTree_,e);return qR(i,s=>{uc(t,s)}),uc(t,i),Wm(i,s=>{uc(t,s)}),n}function uc(t,e){const n=cs(e);if(n){const i=[];let s=[],r=-1;for(let o=0;o<n.length;o++)n[o].status===3||(n[o].status===1?(_(r===o-1,"All SENT items should be at beginning of queue."),r=o,n[o].status=3,n[o].abortReason="set"):(_(n[o].status===0,"Unexpected transaction status in abort"),n[o].unwatcher(),s=s.concat(hn(t.serverSyncTree_,n[o].currentWriteId,!0)),n[o].onComplete&&i.push(n[o].onComplete.bind(null,new Error("set"),!1,null))));r===-1?Vm(e,void 0):n.length=r+1,rt(t.eventQueue_,Er(e),s);for(let o=0;o<i.length;o++)rs(i[o])}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function yA(t){let e="";const n=t.split("/");for(let i=0;i<n.length;i++)if(n[i].length>0){let s=n[i];try{s=decodeURIComponent(s.replace(/\+/g," "))}catch{}e+="/"+s}return e}function wA(t){const e={};t.charAt(0)==="?"&&(t=t.substring(1));for(const n of t.split("&")){if(n.length===0)continue;const i=n.split("=");i.length===2?e[decodeURIComponent(i[0])]=decodeURIComponent(i[1]):Be(`Invalid query segment '${n}' in query '${t}'`)}return e}const kf=function(t,e){const n=vA(t),i=n.namespace;n.domain==="firebase.com"&&Kt(n.host+" is no longer supported. Please use <YOUR FIREBASE>.firebaseio.com instead"),(!i||i==="undefined")&&n.domain!=="localhost"&&Kt("Cannot parse Firebase url. Please use https://<YOUR FIREBASE>.firebaseio.com"),n.secure||RI();const s=n.scheme==="ws"||n.scheme==="wss";return{repoInfo:new sm(n.host,n.secure,i,s,e,"",i!==n.subdomain),path:new z(n.pathString)}},vA=function(t){let e="",n="",i="",s="",r="",o=!0,a="https",c=443;if(typeof t=="string"){let l=t.indexOf("//");l>=0&&(a=t.substring(0,l-1),t=t.substring(l+2));let u=t.indexOf("/");u===-1&&(u=t.length);let d=t.indexOf("?");d===-1&&(d=t.length),e=t.substring(0,Math.min(u,d)),u<d&&(s=yA(t.substring(u,d)));const h=wA(t.substring(Math.min(t.length,d)));l=e.indexOf(":"),l>=0?(o=a==="https"||a==="wss",c=parseInt(e.substring(l+1),10)):l=e.length;const f=e.slice(0,l);if(f.toLowerCase()==="localhost")n="localhost";else if(f.split(".").length<=2)n=f;else{const p=e.indexOf(".");i=e.substring(0,p).toLowerCase(),n=e.substring(p+1),r=i}"ns"in h&&(r=h.ns)}return{host:e,port:c,domain:n,subdomain:i,secure:o,scheme:a,pathString:s,namespace:r}};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Rf="-0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ_abcdefghijklmnopqrstuvwxyz",bA=(function(){let t=0;const e=[];return function(n){const i=n===t;t=n;let s;const r=new Array(8);for(s=7;s>=0;s--)r[s]=Rf.charAt(n%64),n=Math.floor(n/64);_(n===0,"Cannot push at time == 0");let o=r.join("");if(i){for(s=11;s>=0&&e[s]===63;s--)e[s]=0;e[s]++}else for(s=0;s<12;s++)e[s]=Math.floor(Math.random()*64);for(s=0;s<12;s++)o+=Rf.charAt(e[s]);return _(o.length===20,"nextPushId: Length should be 20."),o}})();/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class n_{constructor(e,n,i,s){this.eventType=e,this.eventRegistration=n,this.snapshot=i,this.prevName=s}getPath(){const e=this.snapshot.ref;return this.eventType==="value"?e._path:e.parent._path}getEventType(){return this.eventType}getEventRunner(){return this.eventRegistration.getEventRunner(this)}toString(){return this.getPath().toString()+":"+this.eventType+":"+me(this.snapshot.exportVal())}}class i_{constructor(e,n,i){this.eventRegistration=e,this.error=n,this.path=i}getPath(){return this.path}getEventType(){return"cancel"}getEventRunner(){return this.eventRegistration.getEventRunner(this)}toString(){return this.path.toString()+":cancel"}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Pu{constructor(e,n){this.snapshotCallback=e,this.cancelCallback=n}onValue(e,n){this.snapshotCallback.call(null,e,n)}onCancel(e){return _(this.hasCancelCallback,"Raising a cancel event on a listener with no cancel callback"),this.cancelCallback.call(null,e)}get hasCancelCallback(){return!!this.cancelCallback}matches(e){return this.snapshotCallback===e.snapshotCallback||this.snapshotCallback.userCallback!==void 0&&this.snapshotCallback.userCallback===e.snapshotCallback.userCallback&&this.snapshotCallback.context===e.snapshotCallback.context}}/**
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
 */class s_{constructor(e,n){this._repo=e,this._path=n}cancel(){const e=new Ve;return dA(this._repo,this._path,e.wrapCallback(()=>{})),e.promise}remove(){fn("OnDisconnect.remove",this._path);const e=new Ve;return If(this._repo,this._path,null,e.wrapCallback(()=>{})),e.promise}set(e){fn("OnDisconnect.set",this._path),Ao("OnDisconnect.set",e,this._path,!1);const n=new Ve;return If(this._repo,this._path,e,n.wrapCallback(()=>{})),n.promise}setWithPriority(e,n){fn("OnDisconnect.setWithPriority",this._path),Ao("OnDisconnect.setWithPriority",e,this._path,!1),XR("OnDisconnect.setWithPriority",n);const i=new Ve;return hA(this._repo,this._path,e,n,i.wrapCallback(()=>{})),i.promise}update(e){fn("OnDisconnect.update",this._path),Gm("OnDisconnect.update",e,this._path);const n=new Ve;return fA(this._repo,this._path,e,n.wrapCallback(()=>{})),n.promise}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ya{constructor(e,n,i,s){this._repo=e,this._path=n,this._queryParams=i,this._orderByCalled=s}get key(){return x(this._path)?null:su(this._path)}get ref(){return new wt(this._repo,this._path)}get _queryIdentifier(){const e=hf(this._queryParams),n=eu(e);return n==="{}"?"default":n}get _queryObject(){return hf(this._queryParams)}isEqual(e){if(e=re(e),!(e instanceof ya))return!1;const n=this._repo===e._repo,i=ru(this._path,e._path),s=this._queryIdentifier===e._queryIdentifier;return n&&i&&s}toJSON(){return this.toString()}toString(){return this._repo.toString()+dk(this._path)}}class wt extends ya{constructor(e,n){super(e,n,new ca,!1)}get parent(){const e=fm(this._path);return e===null?null:new wt(this._repo,e)}get root(){let e=this;for(;e.parent!==null;)e=e.parent;return e}}class si{constructor(e,n,i){this._node=e,this.ref=n,this._index=i}get priority(){return this._node.getPriority().val()}get key(){return this.ref.key}get size(){return this._node.numChildren()}child(e){const n=new z(e),i=ri(this.ref,e);return new si(this._node.getChild(n),i,se)}exists(){return!this._node.isEmpty()}exportVal(){return this._node.val(!0)}forEach(e){return this._node.isLeafNode()?!1:!!this._node.forEachChild(this._index,(i,s)=>e(new si(s,ri(this.ref,i),se)))}hasChild(e){const n=new z(e);return!this._node.getChild(n).isEmpty()}hasChildren(){return this._node.isLeafNode()?!1:!this._node.isEmpty()}toJSON(){return this.exportVal()}val(){return this._node.val()}}function b(t,e){return t=re(t),t._checkNotDeleted("ref"),e!==void 0?ri(t._root,e):t._root}function ri(t,e){return t=re(t),M(t._path)===null?QR("child","path",e):Iu("child","path",e),new wt(t._repo,ie(t._path,e))}function r_(t){return t=re(t),new s_(t._repo,t._path)}function er(t,e){t=re(t),fn("push",t._path),Ao("push",e,t._path,!0);const n=Jm(t._repo),i=bA(n),s=ri(t,i),r=ri(t,i);let o;return o=Promise.resolve(r),s.then=o.then.bind(o),s.catch=o.then.bind(o,void 0),s}function Xe(t){return fn("remove",t._path),ee(t,null)}function ee(t,e){t=re(t),fn("set",t._path),Ao("set",e,t._path,!1);const n=new Ve;return cA(t._repo,t._path,e,null,n.wrapCallback(()=>{})),n.promise}function vn(t,e){Gm("update",e,t._path);const n=new Ve;return lA(t._repo,t._path,e,n.wrapCallback(()=>{})),n.promise}function Le(t){t=re(t);const e=new Pu(()=>{}),n=new Tr(e);return aA(t._repo,t,n).then(i=>new si(i,new wt(t._repo,t._path),t._queryParams.getIndex()))}class Tr{constructor(e){this.callbackContext=e}respondsTo(e){return e==="value"}createEvent(e,n){const i=n._queryParams.getIndex();return new n_("value",this,new si(e.snapshotNode,new wt(n._repo,n._path),i))}getEventRunner(e){return e.getEventType()==="cancel"?()=>this.callbackContext.onCancel(e.error):()=>this.callbackContext.onValue(e.snapshot,null)}createCancelEvent(e,n){return this.callbackContext.hasCancelCallback?new i_(this,e,n):null}matches(e){return e instanceof Tr?!e.callbackContext||!this.callbackContext?!0:e.callbackContext.matches(this.callbackContext):!1}hasAnyCallback(){return this.callbackContext!==null}}class wa{constructor(e,n){this.eventType=e,this.callbackContext=n}respondsTo(e){let n=e==="children_added"?"child_added":e;return n=n==="children_removed"?"child_removed":n,this.eventType===n}createCancelEvent(e,n){return this.callbackContext.hasCancelCallback?new i_(this,e,n):null}createEvent(e,n){_(e.childName!=null,"Child events should have a childName.");const i=ri(new wt(n._repo,n._path),e.childName),s=n._queryParams.getIndex();return new n_(e.type,this,new si(e.snapshotNode,i,s),e.prevName)}getEventRunner(e){return e.getEventType()==="cancel"?()=>this.callbackContext.onCancel(e.error):()=>this.callbackContext.onValue(e.snapshot,e.prevName)}matches(e){return e instanceof wa?this.eventType===e.eventType&&(!this.callbackContext||!e.callbackContext||this.callbackContext.matches(e.callbackContext)):!1}hasAnyCallback(){return!!this.callbackContext}}function va(t,e,n,i,s){const r=new Pu(n,void 0),o=e==="value"?new Tr(r):new wa(e,r);return pA(t._repo,t,o),()=>Xm(t._repo,t,o)}function Lu(t,e,n,i){return va(t,"value",e)}function Ki(t,e,n,i){return va(t,"child_added",e)}function cl(t,e,n,i){return va(t,"child_changed",e)}function o_(t,e,n,i){return va(t,"child_removed",e)}function ut(t,e,n){let i=null;const s=n?new Pu(n):null;e==="value"?i=new Tr(s):e&&(i=new wa(e,s)),Xm(t._repo,t,i)}CR(wt);RR(wt);/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const EA="FIREBASE_DATABASE_EMULATOR_HOST",ll={};let CA=!1;function TA(t,e,n,i){const s=e.lastIndexOf(":"),r=e.substring(0,s),o=ns(r);t.repoInfo_=new sm(e,o,t.repoInfo_.namespace,t.repoInfo_.webSocketOnly,t.repoInfo_.nodeAdmin,t.repoInfo_.persistenceKey,t.repoInfo_.includeNamespaceInQueryParams,!0,n),i&&(t.authTokenProvider_=i)}function a_(t,e,n,i,s){let r=i||t.options.databaseURL;r===void 0&&(t.options.projectId||Kt("Can't determine Firebase Database URL. Be sure to include  a Project ID when calling firebase.initializeApp()."),be("Using default host for project ",t.options.projectId),r=`${t.options.projectId}-default-rtdb.firebaseio.com`);let o=kf(r,s),a=o.repoInfo,c;typeof process<"u"&&Gh&&(c=Gh[EA]),c?(r=`http://${c}?ns=${a.namespace}`,o=kf(r,s),a=o.repoInfo):o.repoInfo.secure;const l=new $I(t.name,t.options,e);ZR("Invalid Firebase Database URL",o),x(o.path)||Kt("Database URL must point to the root of a Firebase Database (not including a child path).");const u=IA(a,t,l,new UI(t,n));return new c_(u,t)}function SA(t,e){const n=ll[e];(!n||n[t.key]!==t)&&Kt(`Database ${e}(${t.repoInfo_}) has already been deleted.`),gA(t),delete n[t.key]}function IA(t,e,n,i){let s=ll[e.name];s||(s={},ll[e.name]=s);let r=s[t.toURLString()];return r&&Kt("Database initialized multiple times. Please make sure the format of the database URL matches with each database() call."),r=new sA(t,CA,n,i),s[t.toURLString()]=r,r}class c_{constructor(e,n){this._repoInternal=e,this.app=n,this.type="database",this._instanceStarted=!1}get _repo(){return this._instanceStarted||(rA(this._repoInternal,this.app.options.appId,this.app.options.databaseAuthVariableOverride),this._instanceStarted=!0),this._repoInternal}get _root(){return this._rootInternal||(this._rootInternal=new wt(this._repo,H())),this._rootInternal}_delete(){return this._rootInternal!==null&&(SA(this._repo,this.app.name),this._repoInternal=null,this._rootInternal=null),Promise.resolve()}_checkNotDeleted(e){this._rootInternal===null&&Kt("Cannot call "+e+" on a deleted database.")}}function l_(t=ra(),e){const n=Dn(t,"database").getImmediate({identifier:e});if(!n._instanceStarted){const i=zT("database");i&&u_(n,...i)}return n}function u_(t,e,n,i={}){t=re(t),t._checkNotDeleted("useEmulator");const s=`${e}:${n}`,r=t._repoInternal;if(t._instanceStarted){if(s===t._repoInternal.repoInfo_.host&&ei(i,r.repoInfo_.emulatorOptions))return;Kt("connectDatabaseEmulator() cannot initialize or alter the emulator configuration after the database instance has started.")}let o;if(r.repoInfo_.nodeAdmin)i.mockUserToken&&Kt('mockUserToken is not supported by the Admin SDK. For client access with mock users, please use the "firebase" package instead of "firebase-admin".'),o=new Xr(Xr.OWNER);else if(i.mockUserToken){const a=typeof i.mockUserToken=="string"?i.mockUserToken:GT(i.mockUserToken,t.app.options.projectId);o=new Xr(a)}ns(e)&&(Og(e),Dg("Database",!0)),TA(r,s,i,o)}/**
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
 */function kA(t){Wg(ss),st(new Je("database",(e,{instanceIdentifier:n})=>{const i=e.getProvider("app").getImmediate(),s=e.getProvider("auth-internal"),r=e.getProvider("app-check-internal");return a_(i,s,r,n)},"PUBLIC").setMultipleInstances(!0)),Ke(Kh,Yh,t),Ke(Kh,Yh,"esm2020")}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const RA={".sv":"timestamp"};function Gn(){return RA}qt.prototype.simpleListen=function(t,e){this.sendRequest("q",{p:t},e)};qt.prototype.echo=function(t,e){this.sendRequest("echo",{d:t},e)};kA();const d_=Object.freeze(Object.defineProperty({__proto__:null,DataSnapshot:si,Database:c_,OnDisconnect:s_,_QueryImpl:ya,_QueryParams:ca,_ReferenceImpl:wt,_repoManagerDatabaseFromApp:a_,_setSDKVersion:Wg,_validatePathString:Iu,_validateWritablePath:fn,child:ri,connectDatabaseEmulator:u_,get:Le,getDatabase:l_,off:ut,onChildAdded:Ki,onChildChanged:cl,onChildRemoved:o_,onDisconnect:r_,onValue:Lu,push:er,ref:b,remove:Xe,serverTimestamp:Gn,set:ee,update:vn},Symbol.toStringTag,{value:"Module"}));var AA="firebase",NA="12.8.0";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */Ke(AA,NA,"app");/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ul=new Map,h_={activated:!1,tokenObservers:[]},PA={initialized:!1,enabled:!1};function _e(t){return ul.get(t)||{...h_}}function LA(t,e){return ul.set(t,e),ul.get(t)}function ba(){return PA}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const f_="https://content-firebaseappcheck.googleapis.com/v1",OA="exchangeRecaptchaEnterpriseToken",DA="exchangeDebugToken",Af={RETRIAL_MIN_WAIT:30*1e3,RETRIAL_MAX_WAIT:960*1e3},MA=1440*60*1e3;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class xA{constructor(e,n,i,s,r){if(this.operation=e,this.retryPolicy=n,this.getWaitDuration=i,this.lowerBound=s,this.upperBound=r,this.pending=null,this.nextErrorWaitInterval=s,s>r)throw new Error("Proactive refresh lower bound greater than upper bound!")}start(){this.nextErrorWaitInterval=this.lowerBound,this.process(!0).catch(()=>{})}stop(){this.pending&&(this.pending.reject("cancelled"),this.pending=null)}isRunning(){return!!this.pending}async process(e){this.stop();try{this.pending=new Ve,this.pending.promise.catch(n=>{}),await FA(this.getNextRun(e)),this.pending.resolve(),await this.pending.promise,this.pending=new Ve,this.pending.promise.catch(n=>{}),await this.operation(),this.pending.resolve(),await this.pending.promise,this.process(!0).catch(()=>{})}catch(n){this.retryPolicy(n)?this.process(!1).catch(()=>{}):this.stop()}}getNextRun(e){if(e)return this.nextErrorWaitInterval=this.lowerBound,this.getWaitDuration();{const n=this.nextErrorWaitInterval;return this.nextErrorWaitInterval*=2,this.nextErrorWaitInterval>this.upperBound&&(this.nextErrorWaitInterval=this.upperBound),n}}}function FA(t){return new Promise(e=>{setTimeout(e,t)})}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const UA={"already-initialized":"You have already called initializeAppCheck() for FirebaseApp {$appName} with different options. To avoid this error, call initializeAppCheck() with the same options as when it was originally called. This will return the already initialized instance.","use-before-activation":"App Check is being used before initializeAppCheck() is called for FirebaseApp {$appName}. Call initializeAppCheck() before instantiating other Firebase services.","fetch-network-error":"Fetch failed to connect to a network. Check Internet connection. Original error: {$originalErrorMessage}.","fetch-parse-error":"Fetch client could not parse response. Original error: {$originalErrorMessage}.","fetch-status-error":"Fetch server returned an HTTP error status. HTTP status: {$httpStatus}.","storage-open":"Error thrown when opening storage. Original error: {$originalErrorMessage}.","storage-get":"Error thrown when reading from storage. Original error: {$originalErrorMessage}.","storage-set":"Error thrown when writing to storage. Original error: {$originalErrorMessage}.","recaptcha-error":"ReCAPTCHA error.","initial-throttle":"{$httpStatus} error. Attempts allowed again after {$time}",throttled:"Requests throttled due to previous {$httpStatus} error. Attempts allowed again after {$time}"},We=new On("appCheck","AppCheck",UA);/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Nf(t=!1){return t?self.grecaptcha?.enterprise:self.grecaptcha}function Ou(t){if(!_e(t).activated)throw We.create("use-before-activation",{appName:t.name})}function p_(t){const e=Math.round(t/1e3),n=Math.floor(e/(3600*24)),i=Math.floor((e-n*3600*24)/3600),s=Math.floor((e-n*3600*24-i*3600)/60),r=e-n*3600*24-i*3600-s*60;let o="";return n&&(o+=Br(n)+"d:"),i&&(o+=Br(i)+"h:"),o+=Br(s)+"m:"+Br(r)+"s",o}function Br(t){return t===0?"00":t>=10?t.toString():"0"+t}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Du({url:t,body:e},n){const i={"Content-Type":"application/json"},s=n.getImmediate({optional:!0});if(s){const d=await s.getHeartbeatsHeader();d&&(i["X-Firebase-Client"]=d)}const r={method:"POST",body:JSON.stringify(e),headers:i};let o;try{o=await fetch(t,r)}catch(d){throw We.create("fetch-network-error",{originalErrorMessage:d?.message})}if(o.status!==200)throw We.create("fetch-status-error",{httpStatus:o.status});let a;try{a=await o.json()}catch(d){throw We.create("fetch-parse-error",{originalErrorMessage:d?.message})}const c=a.ttl.match(/^([\d.]+)(s)$/);if(!c||!c[2]||isNaN(Number(c[1])))throw We.create("fetch-parse-error",{originalErrorMessage:`ttl field (timeToLive) is not in standard Protobuf Duration format: ${a.ttl}`});const l=Number(c[1])*1e3,u=Date.now();return{token:a.token,expireTimeMillis:u+l,issuedAtTimeMillis:u}}function $A(t,e){const{projectId:n,appId:i,apiKey:s}=t.options;return{url:`${f_}/projects/${n}/apps/${i}:${OA}?key=${s}`,body:{recaptcha_enterprise_token:e}}}function g_(t,e){const{projectId:n,appId:i,apiKey:s}=t.options;return{url:`${f_}/projects/${n}/apps/${i}:${DA}?key=${s}`,body:{debug_token:e}}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const BA="firebase-app-check-database",HA=1,tr="firebase-app-check-store",m_="debug-token";let Hr=null;function __(){return Hr||(Hr=new Promise((t,e)=>{try{const n=indexedDB.open(BA,HA);n.onsuccess=i=>{t(i.target.result)},n.onerror=i=>{e(We.create("storage-open",{originalErrorMessage:i.target.error?.message}))},n.onupgradeneeded=i=>{const s=i.target.result;switch(i.oldVersion){case 0:s.createObjectStore(tr,{keyPath:"compositeKey"})}}}catch(n){e(We.create("storage-open",{originalErrorMessage:n?.message}))}}),Hr)}function VA(t){return w_(v_(t))}function jA(t,e){return y_(v_(t),e)}function WA(t){return y_(m_,t)}function qA(){return w_(m_)}async function y_(t,e){const i=(await __()).transaction(tr,"readwrite"),r=i.objectStore(tr).put({compositeKey:t,value:e});return new Promise((o,a)=>{r.onsuccess=c=>{o()},i.onerror=c=>{a(We.create("storage-set",{originalErrorMessage:c.target.error?.message}))}})}async function w_(t){const n=(await __()).transaction(tr,"readonly"),s=n.objectStore(tr).get(t);return new Promise((r,o)=>{s.onsuccess=a=>{const c=a.target.result;r(c?c.value:void 0)},n.onerror=a=>{o(We.create("storage-get",{originalErrorMessage:a.target.error?.message}))}})}function v_(t){return`${t.options.appId}-${t.name}`}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const pn=new ia("@firebase/app-check");/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function zA(t){if(ta()){let e;try{e=await VA(t)}catch(n){pn.warn(`Failed to read token from IndexedDB. Error: ${n}`)}return e}}function dc(t,e){return ta()?jA(t,e).catch(n=>{pn.warn(`Failed to write token to IndexedDB. Error: ${n}`)}):Promise.resolve()}async function GA(){let t;try{t=await qA()}catch{}if(t)return t;{const e=crypto.randomUUID();return WA(e).catch(n=>pn.warn(`Failed to persist debug token to IndexedDB. Error: ${n}`)),e}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Mu(){return ba().enabled}async function xu(){const t=ba();if(t.enabled&&t.token)return t.token.promise;throw Error(`
            Can't get debug token in production mode.
        `)}function KA(){const t=Ag(),e=ba();if(e.initialized=!0,typeof t.FIREBASE_APPCHECK_DEBUG_TOKEN!="string"&&t.FIREBASE_APPCHECK_DEBUG_TOKEN!==!0)return;e.enabled=!0;const n=new Ve;e.token=n,typeof t.FIREBASE_APPCHECK_DEBUG_TOKEN=="string"?n.resolve(t.FIREBASE_APPCHECK_DEBUG_TOKEN):n.resolve(GA())}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const YA={error:"UNKNOWN_ERROR"};function JA(t){return ea.encodeString(JSON.stringify(t),!1)}async function dl(t,e=!1,n=!1){const i=t.app;Ou(i);const s=_e(i);let r=s.token,o;if(r&&!Ci(r)&&(s.token=void 0,r=void 0),!r){const l=await s.cachedTokenPromise;l&&(Ci(l)?r=l:await dc(i,void 0))}if(!e&&r&&Ci(r))return{token:r.token};let a=!1;if(Mu())try{s.exchangeTokenPromise||(s.exchangeTokenPromise=Du(g_(i,await xu()),t.heartbeatServiceProvider).finally(()=>{s.exchangeTokenPromise=void 0}),a=!0);const l=await s.exchangeTokenPromise;return await dc(i,l),s.token=l,{token:l.token}}catch(l){return l.code==="appCheck/throttled"||l.code==="appCheck/initial-throttle"?pn.warn(l.message):n&&pn.error(l),hc(l)}try{s.exchangeTokenPromise||(s.exchangeTokenPromise=s.provider.getToken().finally(()=>{s.exchangeTokenPromise=void 0}),a=!0),r=await _e(i).exchangeTokenPromise}catch(l){l.code==="appCheck/throttled"||l.code==="appCheck/initial-throttle"?pn.warn(l.message):n&&pn.error(l),o=l}let c;return r?o?Ci(r)?c={token:r.token,internalError:o}:c=hc(o):(c={token:r.token},s.token=r,await dc(i,r)):c=hc(o),a&&C_(i,c),c}async function XA(t){const e=t.app;Ou(e);const{provider:n}=_e(e);if(Mu()){const i=await xu(),{token:s}=await Du(g_(e,i),t.heartbeatServiceProvider);return{token:s}}else{const{token:i}=await n.getToken();return{token:i}}}function b_(t,e,n,i){const{app:s}=t,r=_e(s),o={next:n,error:i,type:e};if(r.tokenObservers=[...r.tokenObservers,o],r.token&&Ci(r.token)){const a=r.token;Promise.resolve().then(()=>{n({token:a.token}),Pf(t)}).catch(()=>{})}r.cachedTokenPromise.then(()=>Pf(t))}function E_(t,e){const n=_e(t),i=n.tokenObservers.filter(s=>s.next!==e);i.length===0&&n.tokenRefresher&&n.tokenRefresher.isRunning()&&n.tokenRefresher.stop(),n.tokenObservers=i}function Pf(t){const{app:e}=t,n=_e(e);let i=n.tokenRefresher;i||(i=QA(t),n.tokenRefresher=i),!i.isRunning()&&n.isTokenAutoRefreshEnabled&&i.start()}function QA(t){const{app:e}=t;return new xA(async()=>{const n=_e(e);let i;if(n.token?i=await dl(t,!0):i=await dl(t),i.error)throw i.error;if(i.internalError)throw i.internalError},()=>!0,()=>{const n=_e(e);if(n.token){let i=n.token.issuedAtTimeMillis+(n.token.expireTimeMillis-n.token.issuedAtTimeMillis)*.5+3e5;const s=n.token.expireTimeMillis-300*1e3;return i=Math.min(i,s),Math.max(0,i-Date.now())}else return 0},Af.RETRIAL_MIN_WAIT,Af.RETRIAL_MAX_WAIT)}function C_(t,e){const n=_e(t).tokenObservers;for(const i of n)try{i.type==="EXTERNAL"&&e.error!=null?i.error(e.error):i.next(e)}catch{}}function Ci(t){return t.expireTimeMillis-Date.now()>0}function hc(t){return{token:JA(YA),error:t}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ZA{constructor(e,n){this.app=e,this.heartbeatServiceProvider=n}_delete(){const{tokenObservers:e}=_e(this.app);for(const n of e)E_(this.app,n.next);return Promise.resolve()}}function eN(t,e){return new ZA(t,e)}function tN(t){return{getToken:e=>dl(t,e),getLimitedUseToken:()=>XA(t),addTokenListener:e=>b_(t,"INTERNAL",e),removeTokenListener:e=>E_(t.app,e)}}const nN="@firebase/app-check",iN="0.11.0",sN="https://www.google.com/recaptcha/enterprise.js";function rN(t,e){const n=new Ve,i=_e(t);i.reCAPTCHAState={initialized:n};const s=oN(t),r=Nf(!0);return r?Lf(t,e,r,s,n):lN(()=>{const o=Nf(!0);if(!o)throw new Error("no recaptcha");Lf(t,e,o,s,n)}),n.promise}function Lf(t,e,n,i,s){n.ready(()=>{cN(t,e,n,i),s.resolve(n)})}function oN(t){const e=`fire_app_check_${t.name}`,n=document.createElement("div");return n.id=e,n.style.display="none",document.body.appendChild(n),e}async function aN(t){Ou(t);const n=await _e(t).reCAPTCHAState.initialized.promise;return new Promise((i,s)=>{const r=_e(t).reCAPTCHAState;n.ready(()=>{i(n.execute(r.widgetId,{action:"fire_app_check"}))})})}function cN(t,e,n,i){const s=n.render(i,{sitekey:e,size:"invisible",callback:()=>{_e(t).reCAPTCHAState.succeeded=!0},"error-callback":()=>{_e(t).reCAPTCHAState.succeeded=!1}}),r=_e(t);r.reCAPTCHAState={...r.reCAPTCHAState,widgetId:s}}function lN(t){const e=document.createElement("script");e.src=sN,e.onload=t,document.head.appendChild(e)}class Fu{constructor(e){this._siteKey=e,this._throttleData=null}async getToken(){dN(this._throttleData);const e=await aN(this._app).catch(i=>{throw We.create("recaptcha-error")});if(!_e(this._app).reCAPTCHAState?.succeeded)throw We.create("recaptcha-error");let n;try{n=await Du($A(this._app,e),this._heartbeatServiceProvider)}catch(i){throw i.code?.includes("fetch-status-error")?(this._throttleData=uN(Number(i.customData?.httpStatus),this._throttleData),We.create("initial-throttle",{time:p_(this._throttleData.allowRequestsAfter-Date.now()),httpStatus:this._throttleData.httpStatus})):i}return this._throttleData=null,n}initialize(e){this._app=e,this._heartbeatServiceProvider=Dn(e,"heartbeat"),rN(e,this._siteKey).catch(()=>{})}isEqual(e){return e instanceof Fu?this._siteKey===e._siteKey:!1}}function uN(t,e){if(t===404||t===403)return{backoffCount:1,allowRequestsAfter:Date.now()+MA,httpStatus:t};{const n=e?e.backoffCount:0,i=gS(n,1e3,2);return{backoffCount:n+1,allowRequestsAfter:Date.now()+i,httpStatus:t}}}function dN(t){if(t&&Date.now()-t.allowRequestsAfter<=0)throw We.create("throttled",{time:p_(t.allowRequestsAfter-Date.now()),httpStatus:t.httpStatus})}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function hN(t=ra(),e){t=re(t);const n=Dn(t,"app-check");if(ba().initialized||KA(),Mu()&&xu().then(s=>console.log(`App Check debug token: ${s}. You will need to add it to your app's App Check settings in the Firebase console for it to work.`)),n.isInitialized()){const s=n.getImmediate(),r=n.getOptions();if(r.isTokenAutoRefreshEnabled===e.isTokenAutoRefreshEnabled&&r.provider.isEqual(e.provider))return s;throw We.create("already-initialized",{appName:t.name})}const i=n.initialize({options:e});return fN(t,e.provider,e.isTokenAutoRefreshEnabled),_e(t).isTokenAutoRefreshEnabled&&b_(i,"INTERNAL",()=>{}),i}function fN(t,e,n=!1){const i=LA(t,{...h_});i.activated=!0,i.provider=e,i.cachedTokenPromise=zA(t).then(s=>(s&&Ci(s)&&(i.token=s,C_(t,{token:s.token})),s)),i.isTokenAutoRefreshEnabled=n&&t.automaticDataCollectionEnabled,!t.automaticDataCollectionEnabled&&n&&pn.warn("`isTokenAutoRefreshEnabled` is true but `automaticDataCollectionEnabled` was set to false during `initializeApp()`. This blocks automatic token refresh."),i.provider.initialize(t)}const pN="app-check",Of="app-check-internal";function gN(){st(new Je(pN,t=>{const e=t.getProvider("app").getImmediate(),n=t.getProvider("heartbeat");return eN(e,n)},"PUBLIC").setInstantiationMode("EXPLICIT").setInstanceCreatedCallback((t,e,n)=>{t.getProvider(Of).initialize()})),st(new Je(Of,t=>{const e=t.getProvider("app-check").getImmediate();return tN(e)},"PUBLIC").setInstantiationMode("EXPLICIT")),Ke(nN,iN)}gN();const mN={apiKey:"AIzaSyA-fvCaKCjyEFX__YAVr1oPGdVsUEhFehA",authDomain:"vidu-aae11.web.app",projectId:"vidu-aae11",databaseURL:"https://vidu-aae11-default-rtdb.europe-west1.firebasedatabase.app",storageBucket:"vidu-aae11.firebasestorage.app",messagingSenderId:"765724787439",appId:"1:765724787439:web:61a3b5dd538149564c911a",measurementId:"G-EGJ53HLGY4"},Ea=Bg(mN),_N=void 0;console.error("Missing VITE_FCM_VAPID_KEY: required for FCM web push");const Df="6LdBIBgsAAAAAB4zIcXaZI-FD4kt21TWs9Zx9_fp";let hl;if(Df.trim()!=="")hl=new Fu(Df),console.info("[Firebase App Check: PROD] Initializing with ReCAPTCHA Enterprise (invisible mode).");else throw console.error("[Firebase App Check: PROD] VITE_RECAPTCHA_ENTERPRISE_SITE_KEY is missing or empty. App Check will NOT be initialized, leaving Firebase services unprotected!"),new Error("Firebase App Check configuration missing in production.");if(hl)try{hN(Ea,{provider:hl,isTokenAutoRefreshEnabled:!0})}catch(t){console.error("[Firebase App Check] initializeAppCheck call failed:",t)}const E=l_(Ea),dt=[];function on(t,e,n,i=null,s=null,r=null){e==="value"?Lu(t,n):e==="child_added"?Ki(t,n):e==="child_removed"?o_(t,n):console.warn(`Unknown listener type: ${e}`),dt.push({ref:t,type:e,callback:n,roomId:i,userId:s,category:r})}function T_(){dt.forEach(({ref:t,type:e,callback:n})=>{try{ut(t,e,n)}catch(i){console.warn("Failed to remove firebase rtdb listener",i)}}),dt.length=0}function Sr(t){if(!t)return;dt.filter(i=>i.roomId===t).forEach(({ref:i,type:s,callback:r})=>{try{ut(i,s,r)}catch(o){console.warn(`Failed to remove listener for room ${t}`,o)}});const n=dt.filter(i=>i.roomId!==t);dt.length=0,dt.push(...n)}function S_(t,e){if(!t||!e)return;const n=r=>r.userId===t&&r.roomId===e;dt.filter(n).forEach(({ref:r,type:o,callback:a})=>{try{ut(r,o,a)}catch(c){console.warn(`Failed to remove listener for user ${t} in room ${e}`,c)}});const s=dt.filter(r=>!n(r));dt.length=0,dt.push(...s)}function Ii(t,e,n=null){on(t,"value",e,n)}const rn=t=>b(E,`rooms/${t}`),Ss=t=>b(E,`rooms/${t}/members`),fl=(t,e)=>b(E,`rooms/${t}/members/${e}`),I_=t=>b(E,`rooms/${t}/cancellation`),Ir=t=>b(E,`rooms/${t}/watch`),kr=t=>b(E,`rooms/${t}/watch/fileRequest`),k_=t=>b(E,`users/${t}/recentCalls`),Ca=(t,e)=>b(E,`users/${t}/recentCalls/${e}`),Uu=t=>b(E,`users/${t}/outgoingCall`),$u=t=>b(E,`rooms/${t}/offerCandidates`),Bu=t=>b(E,`rooms/${t}/answerCandidates`),yN=Object.freeze(Object.defineProperty({__proto__:null,addRTDBListener:on,getAnswerCandidatesRef:Bu,getOfferCandidatesRef:$u,getRoomCancellationRef:I_,getRoomMemberRef:fl,getRoomMembersRef:Ss,getRoomRef:rn,getUserOutgoingCallRef:Uu,getUserRecentCallRef:Ca,getUserRecentCallsRef:k_,getWatchRef:Ir,getWatchRequestRef:kr,onDataChange:Ii,removeAllRTDBListeners:T_,removeRTDBListenersForRoom:Sr,removeRTDBListenersForUser:S_,rtdb:E},Symbol.toStringTag,{value:"Module"}));function R_(){return{"dependent-sdk-initialized-before-auth":"Another Firebase SDK was initialized and is trying to use Auth before Auth is initialized. Please be sure to call `initializeAuth` or `getAuth` before starting any other Firebase SDK."}}const wN=R_,A_=new On("auth","Firebase",R_());/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const No=new ia("@firebase/auth");function vN(t,...e){No.logLevel<=G.WARN&&No.warn(`Auth (${ss}): ${t}`,...e)}function Qr(t,...e){No.logLevel<=G.ERROR&&No.error(`Auth (${ss}): ${t}`,...e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Pt(t,...e){throw Vu(t,...e)}function gt(t,...e){return Vu(t,...e)}function Hu(t,e,n){const i={...wN(),[e]:n};return new On("auth","Firebase",i).create(e,{appName:t.name})}function Kn(t){return Hu(t,"operation-not-supported-in-this-environment","Operations that alter the current user are not supported in conjunction with FirebaseServerApp")}function bN(t,e,n){const i=n;if(!(e instanceof i))throw i.name!==e.constructor.name&&Pt(t,"argument-error"),Hu(t,"argument-error",`Type of ${e.constructor.name} does not match expected instance.Did you pass a reference from a different Auth SDK?`)}function Vu(t,...e){if(typeof t!="string"){const n=e[0],i=[...e.slice(1)];return i[0]&&(i[0].appName=t.name),t._errorFactory.create(n,...i)}return A_.create(t,...e)}function k(t,e,...n){if(!t)throw Vu(e,...n)}function Ut(t){const e="INTERNAL ASSERTION FAILED: "+t;throw Qr(e),new Error(e)}function Yt(t,e){t||Ut(e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function pl(){return typeof self<"u"&&self.location?.href||""}function EN(){return Mf()==="http:"||Mf()==="https:"}function Mf(){return typeof self<"u"&&self.location?.protocol||null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function CN(){return typeof navigator<"u"&&navigator&&"onLine"in navigator&&typeof navigator.onLine=="boolean"&&(EN()||XT()||"connection"in navigator)?navigator.onLine:!0}function TN(){if(typeof navigator>"u")return null;const t=navigator;return t.languages&&t.languages[0]||t.language||null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Rr{constructor(e,n){this.shortDelay=e,this.longDelay=n,Yt(n>e,"Short delay should be less than long delay!"),this.isMobile=Ql()||Mg()}get(){return CN()?this.isMobile?this.longDelay:this.shortDelay:Math.min(5e3,this.shortDelay)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ju(t,e){Yt(t.emulator,"Emulator should always be set here");const{url:n}=t.emulator;return e?`${n}${e.startsWith("/")?e.slice(1):e}`:n}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class N_{static initialize(e,n,i){this.fetchImpl=e,n&&(this.headersImpl=n),i&&(this.responseImpl=i)}static fetch(){if(this.fetchImpl)return this.fetchImpl;if(typeof self<"u"&&"fetch"in self)return self.fetch;if(typeof globalThis<"u"&&globalThis.fetch)return globalThis.fetch;if(typeof fetch<"u")return fetch;Ut("Could not find fetch implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static headers(){if(this.headersImpl)return this.headersImpl;if(typeof self<"u"&&"Headers"in self)return self.Headers;if(typeof globalThis<"u"&&globalThis.Headers)return globalThis.Headers;if(typeof Headers<"u")return Headers;Ut("Could not find Headers implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static response(){if(this.responseImpl)return this.responseImpl;if(typeof self<"u"&&"Response"in self)return self.Response;if(typeof globalThis<"u"&&globalThis.Response)return globalThis.Response;if(typeof Response<"u")return Response;Ut("Could not find Response implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const SN={CREDENTIAL_MISMATCH:"custom-token-mismatch",MISSING_CUSTOM_TOKEN:"internal-error",INVALID_IDENTIFIER:"invalid-email",MISSING_CONTINUE_URI:"internal-error",INVALID_PASSWORD:"wrong-password",MISSING_PASSWORD:"missing-password",INVALID_LOGIN_CREDENTIALS:"invalid-credential",EMAIL_EXISTS:"email-already-in-use",PASSWORD_LOGIN_DISABLED:"operation-not-allowed",INVALID_IDP_RESPONSE:"invalid-credential",INVALID_PENDING_TOKEN:"invalid-credential",FEDERATED_USER_ID_ALREADY_LINKED:"credential-already-in-use",MISSING_REQ_TYPE:"internal-error",EMAIL_NOT_FOUND:"user-not-found",RESET_PASSWORD_EXCEED_LIMIT:"too-many-requests",EXPIRED_OOB_CODE:"expired-action-code",INVALID_OOB_CODE:"invalid-action-code",MISSING_OOB_CODE:"internal-error",CREDENTIAL_TOO_OLD_LOGIN_AGAIN:"requires-recent-login",INVALID_ID_TOKEN:"invalid-user-token",TOKEN_EXPIRED:"user-token-expired",USER_NOT_FOUND:"user-token-expired",TOO_MANY_ATTEMPTS_TRY_LATER:"too-many-requests",PASSWORD_DOES_NOT_MEET_REQUIREMENTS:"password-does-not-meet-requirements",INVALID_CODE:"invalid-verification-code",INVALID_SESSION_INFO:"invalid-verification-id",INVALID_TEMPORARY_PROOF:"invalid-credential",MISSING_SESSION_INFO:"missing-verification-id",SESSION_EXPIRED:"code-expired",MISSING_ANDROID_PACKAGE_NAME:"missing-android-pkg-name",UNAUTHORIZED_DOMAIN:"unauthorized-continue-uri",INVALID_OAUTH_CLIENT_ID:"invalid-oauth-client-id",ADMIN_ONLY_OPERATION:"admin-restricted-operation",INVALID_MFA_PENDING_CREDENTIAL:"invalid-multi-factor-session",MFA_ENROLLMENT_NOT_FOUND:"multi-factor-info-not-found",MISSING_MFA_ENROLLMENT_ID:"missing-multi-factor-info",MISSING_MFA_PENDING_CREDENTIAL:"missing-multi-factor-session",SECOND_FACTOR_EXISTS:"second-factor-already-in-use",SECOND_FACTOR_LIMIT_EXCEEDED:"maximum-second-factor-count-exceeded",BLOCKING_FUNCTION_ERROR_RESPONSE:"internal-error",RECAPTCHA_NOT_ENABLED:"recaptcha-not-enabled",MISSING_RECAPTCHA_TOKEN:"missing-recaptcha-token",INVALID_RECAPTCHA_TOKEN:"invalid-recaptcha-token",INVALID_RECAPTCHA_ACTION:"invalid-recaptcha-action",MISSING_CLIENT_TYPE:"missing-client-type",MISSING_RECAPTCHA_VERSION:"missing-recaptcha-version",INVALID_RECAPTCHA_VERSION:"invalid-recaptcha-version",INVALID_REQ_TYPE:"invalid-req-type"};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const IN=["/v1/accounts:signInWithCustomToken","/v1/accounts:signInWithEmailLink","/v1/accounts:signInWithIdp","/v1/accounts:signInWithPassword","/v1/accounts:signInWithPhoneNumber","/v1/token"],kN=new Rr(3e4,6e4);function Wu(t,e){return t.tenantId&&!e.tenantId?{...e,tenantId:t.tenantId}:e}async function ls(t,e,n,i,s={}){return P_(t,s,async()=>{let r={},o={};i&&(e==="GET"?o=i:r={body:JSON.stringify(i)});const a=is({key:t.config.apiKey,...o}).slice(1),c=await t._getAdditionalHeaders();c["Content-Type"]="application/json",t.languageCode&&(c["X-Firebase-Locale"]=t.languageCode);const l={method:e,headers:c,...r};return JT()||(l.referrerPolicy="no-referrer"),t.emulatorConfig&&ns(t.emulatorConfig.host)&&(l.credentials="include"),N_.fetch()(await L_(t,t.config.apiHost,n,a),l)})}async function P_(t,e,n){t._canInitEmulator=!1;const i={...SN,...e};try{const s=new AN(t),r=await Promise.race([n(),s.promise]);s.clearNetworkTimeout();const o=await r.json();if("needConfirmation"in o)throw Vr(t,"account-exists-with-different-credential",o);if(r.ok&&!("errorMessage"in o))return o;{const a=r.ok?o.errorMessage:o.error.message,[c,l]=a.split(" : ");if(c==="FEDERATED_USER_ID_ALREADY_LINKED")throw Vr(t,"credential-already-in-use",o);if(c==="EMAIL_EXISTS")throw Vr(t,"email-already-in-use",o);if(c==="USER_DISABLED")throw Vr(t,"user-disabled",o);const u=i[c]||c.toLowerCase().replace(/[_\s]+/g,"-");if(l)throw Hu(t,u,l);Pt(t,u)}}catch(s){if(s instanceof Zt)throw s;Pt(t,"network-request-failed",{message:String(s)})}}async function RN(t,e,n,i,s={}){const r=await ls(t,e,n,i,s);return"mfaPendingCredential"in r&&Pt(t,"multi-factor-auth-required",{_serverResponse:r}),r}async function L_(t,e,n,i){const s=`${e}${n}?${i}`,r=t,o=r.config.emulator?ju(t.config,s):`${t.config.apiScheme}://${s}`;return IN.includes(n)&&(await r._persistenceManagerAvailable,r._getPersistenceType()==="COOKIE")?r._getPersistence()._getFinalTarget(o).toString():o}class AN{clearNetworkTimeout(){clearTimeout(this.timer)}constructor(e){this.auth=e,this.timer=null,this.promise=new Promise((n,i)=>{this.timer=setTimeout(()=>i(gt(this.auth,"network-request-failed")),kN.get())})}}function Vr(t,e,n){const i={appName:t.name};n.email&&(i.email=n.email),n.phoneNumber&&(i.phoneNumber=n.phoneNumber);const s=gt(t,e,i);return s.customData._tokenResponse=n,s}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function NN(t,e){return ls(t,"POST","/v1/accounts:delete",e)}async function Po(t,e){return ls(t,"POST","/v1/accounts:lookup",e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Os(t){if(t)try{const e=new Date(Number(t));if(!isNaN(e.getTime()))return e.toUTCString()}catch{}}async function PN(t,e=!1){const n=re(t),i=await n.getIdToken(e),s=qu(i);k(s&&s.exp&&s.auth_time&&s.iat,n.auth,"internal-error");const r=typeof s.firebase=="object"?s.firebase:void 0,o=r?.sign_in_provider;return{claims:s,token:i,authTime:Os(fc(s.auth_time)),issuedAtTime:Os(fc(s.iat)),expirationTime:Os(fc(s.exp)),signInProvider:o||null,signInSecondFactor:r?.sign_in_second_factor||null}}function fc(t){return Number(t)*1e3}function qu(t){const[e,n,i]=t.split(".");if(e===void 0||n===void 0||i===void 0)return Qr("JWT malformed, contained fewer than 3 sections"),null;try{const s=ho(n);return s?JSON.parse(s):(Qr("Failed to decode base64 JWT payload"),null)}catch(s){return Qr("Caught error parsing JWT payload as JSON",s?.toString()),null}}function xf(t){const e=qu(t);return k(e,"internal-error"),k(typeof e.exp<"u","internal-error"),k(typeof e.iat<"u","internal-error"),Number(e.exp)-Number(e.iat)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function nr(t,e,n=!1){if(n)return e;try{return await e}catch(i){throw i instanceof Zt&&LN(i)&&t.auth.currentUser===t&&await t.auth.signOut(),i}}function LN({code:t}){return t==="auth/user-disabled"||t==="auth/user-token-expired"}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ON{constructor(e){this.user=e,this.isRunning=!1,this.timerId=null,this.errorBackoff=3e4}_start(){this.isRunning||(this.isRunning=!0,this.schedule())}_stop(){this.isRunning&&(this.isRunning=!1,this.timerId!==null&&clearTimeout(this.timerId))}getInterval(e){if(e){const n=this.errorBackoff;return this.errorBackoff=Math.min(this.errorBackoff*2,96e4),n}else{this.errorBackoff=3e4;const i=(this.user.stsTokenManager.expirationTime??0)-Date.now()-3e5;return Math.max(0,i)}}schedule(e=!1){if(!this.isRunning)return;const n=this.getInterval(e);this.timerId=setTimeout(async()=>{await this.iteration()},n)}async iteration(){try{await this.user.getIdToken(!0)}catch(e){e?.code==="auth/network-request-failed"&&this.schedule(!0);return}this.schedule()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class gl{constructor(e,n){this.createdAt=e,this.lastLoginAt=n,this._initializeTime()}_initializeTime(){this.lastSignInTime=Os(this.lastLoginAt),this.creationTime=Os(this.createdAt)}_copy(e){this.createdAt=e.createdAt,this.lastLoginAt=e.lastLoginAt,this._initializeTime()}toJSON(){return{createdAt:this.createdAt,lastLoginAt:this.lastLoginAt}}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Lo(t){const e=t.auth,n=await t.getIdToken(),i=await nr(t,Po(e,{idToken:n}));k(i?.users.length,e,"internal-error");const s=i.users[0];t._notifyReloadListener(s);const r=s.providerUserInfo?.length?O_(s.providerUserInfo):[],o=MN(t.providerData,r),a=t.isAnonymous,c=!(t.email&&s.passwordHash)&&!o?.length,l=a?c:!1,u={uid:s.localId,displayName:s.displayName||null,photoURL:s.photoUrl||null,email:s.email||null,emailVerified:s.emailVerified||!1,phoneNumber:s.phoneNumber||null,tenantId:s.tenantId||null,providerData:o,metadata:new gl(s.createdAt,s.lastLoginAt),isAnonymous:l};Object.assign(t,u)}async function DN(t){const e=re(t);await Lo(e),await e.auth._persistUserIfCurrent(e),e.auth._notifyListenersIfCurrent(e)}function MN(t,e){return[...t.filter(i=>!e.some(s=>s.providerId===i.providerId)),...e]}function O_(t){return t.map(({providerId:e,...n})=>({providerId:e,uid:n.rawId||"",displayName:n.displayName||null,email:n.email||null,phoneNumber:n.phoneNumber||null,photoURL:n.photoUrl||null}))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function xN(t,e){const n=await P_(t,{},async()=>{const i=is({grant_type:"refresh_token",refresh_token:e}).slice(1),{tokenApiHost:s,apiKey:r}=t.config,o=await L_(t,s,"/v1/token",`key=${r}`),a=await t._getAdditionalHeaders();a["Content-Type"]="application/x-www-form-urlencoded";const c={method:"POST",headers:a,body:i};return t.emulatorConfig&&ns(t.emulatorConfig.host)&&(c.credentials="include"),N_.fetch()(o,c)});return{accessToken:n.access_token,expiresIn:n.expires_in,refreshToken:n.refresh_token}}async function FN(t,e){return ls(t,"POST","/v2/accounts:revokeToken",Wu(t,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ki{constructor(){this.refreshToken=null,this.accessToken=null,this.expirationTime=null}get isExpired(){return!this.expirationTime||Date.now()>this.expirationTime-3e4}updateFromServerResponse(e){k(e.idToken,"internal-error"),k(typeof e.idToken<"u","internal-error"),k(typeof e.refreshToken<"u","internal-error");const n="expiresIn"in e&&typeof e.expiresIn<"u"?Number(e.expiresIn):xf(e.idToken);this.updateTokensAndExpiration(e.idToken,e.refreshToken,n)}updateFromIdToken(e){k(e.length!==0,"internal-error");const n=xf(e);this.updateTokensAndExpiration(e,null,n)}async getToken(e,n=!1){return!n&&this.accessToken&&!this.isExpired?this.accessToken:(k(this.refreshToken,e,"user-token-expired"),this.refreshToken?(await this.refresh(e,this.refreshToken),this.accessToken):null)}clearRefreshToken(){this.refreshToken=null}async refresh(e,n){const{accessToken:i,refreshToken:s,expiresIn:r}=await xN(e,n);this.updateTokensAndExpiration(i,s,Number(r))}updateTokensAndExpiration(e,n,i){this.refreshToken=n||null,this.accessToken=e||null,this.expirationTime=Date.now()+i*1e3}static fromJSON(e,n){const{refreshToken:i,accessToken:s,expirationTime:r}=n,o=new ki;return i&&(k(typeof i=="string","internal-error",{appName:e}),o.refreshToken=i),s&&(k(typeof s=="string","internal-error",{appName:e}),o.accessToken=s),r&&(k(typeof r=="number","internal-error",{appName:e}),o.expirationTime=r),o}toJSON(){return{refreshToken:this.refreshToken,accessToken:this.accessToken,expirationTime:this.expirationTime}}_assign(e){this.accessToken=e.accessToken,this.refreshToken=e.refreshToken,this.expirationTime=e.expirationTime}_clone(){return Object.assign(new ki,this.toJSON())}_performRefresh(){return Ut("not implemented")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function sn(t,e){k(typeof t=="string"||typeof t>"u","internal-error",{appName:e})}class ht{constructor({uid:e,auth:n,stsTokenManager:i,...s}){this.providerId="firebase",this.proactiveRefresh=new ON(this),this.reloadUserInfo=null,this.reloadListener=null,this.uid=e,this.auth=n,this.stsTokenManager=i,this.accessToken=i.accessToken,this.displayName=s.displayName||null,this.email=s.email||null,this.emailVerified=s.emailVerified||!1,this.phoneNumber=s.phoneNumber||null,this.photoURL=s.photoURL||null,this.isAnonymous=s.isAnonymous||!1,this.tenantId=s.tenantId||null,this.providerData=s.providerData?[...s.providerData]:[],this.metadata=new gl(s.createdAt||void 0,s.lastLoginAt||void 0)}async getIdToken(e){const n=await nr(this,this.stsTokenManager.getToken(this.auth,e));return k(n,this.auth,"internal-error"),this.accessToken!==n&&(this.accessToken=n,await this.auth._persistUserIfCurrent(this),this.auth._notifyListenersIfCurrent(this)),n}getIdTokenResult(e){return PN(this,e)}reload(){return DN(this)}_assign(e){this!==e&&(k(this.uid===e.uid,this.auth,"internal-error"),this.displayName=e.displayName,this.photoURL=e.photoURL,this.email=e.email,this.emailVerified=e.emailVerified,this.phoneNumber=e.phoneNumber,this.isAnonymous=e.isAnonymous,this.tenantId=e.tenantId,this.providerData=e.providerData.map(n=>({...n})),this.metadata._copy(e.metadata),this.stsTokenManager._assign(e.stsTokenManager))}_clone(e){const n=new ht({...this,auth:e,stsTokenManager:this.stsTokenManager._clone()});return n.metadata._copy(this.metadata),n}_onReload(e){k(!this.reloadListener,this.auth,"internal-error"),this.reloadListener=e,this.reloadUserInfo&&(this._notifyReloadListener(this.reloadUserInfo),this.reloadUserInfo=null)}_notifyReloadListener(e){this.reloadListener?this.reloadListener(e):this.reloadUserInfo=e}_startProactiveRefresh(){this.proactiveRefresh._start()}_stopProactiveRefresh(){this.proactiveRefresh._stop()}async _updateTokensIfNecessary(e,n=!1){let i=!1;e.idToken&&e.idToken!==this.stsTokenManager.accessToken&&(this.stsTokenManager.updateFromServerResponse(e),i=!0),n&&await Lo(this),await this.auth._persistUserIfCurrent(this),i&&this.auth._notifyListenersIfCurrent(this)}async delete(){if(at(this.auth.app))return Promise.reject(Kn(this.auth));const e=await this.getIdToken();return await nr(this,NN(this.auth,{idToken:e})),this.stsTokenManager.clearRefreshToken(),this.auth.signOut()}toJSON(){return{uid:this.uid,email:this.email||void 0,emailVerified:this.emailVerified,displayName:this.displayName||void 0,isAnonymous:this.isAnonymous,photoURL:this.photoURL||void 0,phoneNumber:this.phoneNumber||void 0,tenantId:this.tenantId||void 0,providerData:this.providerData.map(e=>({...e})),stsTokenManager:this.stsTokenManager.toJSON(),_redirectEventId:this._redirectEventId,...this.metadata.toJSON(),apiKey:this.auth.config.apiKey,appName:this.auth.name}}get refreshToken(){return this.stsTokenManager.refreshToken||""}static _fromJSON(e,n){const i=n.displayName??void 0,s=n.email??void 0,r=n.phoneNumber??void 0,o=n.photoURL??void 0,a=n.tenantId??void 0,c=n._redirectEventId??void 0,l=n.createdAt??void 0,u=n.lastLoginAt??void 0,{uid:d,emailVerified:h,isAnonymous:f,providerData:p,stsTokenManager:g}=n;k(d&&g,e,"internal-error");const m=ki.fromJSON(this.name,g);k(typeof d=="string",e,"internal-error"),sn(i,e.name),sn(s,e.name),k(typeof h=="boolean",e,"internal-error"),k(typeof f=="boolean",e,"internal-error"),sn(r,e.name),sn(o,e.name),sn(a,e.name),sn(c,e.name),sn(l,e.name),sn(u,e.name);const T=new ht({uid:d,auth:e,email:s,emailVerified:h,displayName:i,isAnonymous:f,photoURL:o,phoneNumber:r,tenantId:a,stsTokenManager:m,createdAt:l,lastLoginAt:u});return p&&Array.isArray(p)&&(T.providerData=p.map(P=>({...P}))),c&&(T._redirectEventId=c),T}static async _fromIdTokenResponse(e,n,i=!1){const s=new ki;s.updateFromServerResponse(n);const r=new ht({uid:n.localId,auth:e,stsTokenManager:s,isAnonymous:i});return await Lo(r),r}static async _fromGetAccountInfoResponse(e,n,i){const s=n.users[0];k(s.localId!==void 0,"internal-error");const r=s.providerUserInfo!==void 0?O_(s.providerUserInfo):[],o=!(s.email&&s.passwordHash)&&!r?.length,a=new ki;a.updateFromIdToken(i);const c=new ht({uid:s.localId,auth:e,stsTokenManager:a,isAnonymous:o}),l={uid:s.localId,displayName:s.displayName||null,photoURL:s.photoUrl||null,email:s.email||null,emailVerified:s.emailVerified||!1,phoneNumber:s.phoneNumber||null,tenantId:s.tenantId||null,providerData:r,metadata:new gl(s.createdAt,s.lastLoginAt),isAnonymous:!(s.email&&s.passwordHash)&&!r?.length};return Object.assign(c,l),c}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ff=new Map;function $t(t){Yt(t instanceof Function,"Expected a class definition");let e=Ff.get(t);return e?(Yt(e instanceof t,"Instance stored in cache mismatched with class"),e):(e=new t,Ff.set(t,e),e)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class D_{constructor(){this.type="NONE",this.storage={}}async _isAvailable(){return!0}async _set(e,n){this.storage[e]=n}async _get(e){const n=this.storage[e];return n===void 0?null:n}async _remove(e){delete this.storage[e]}_addListener(e,n){}_removeListener(e,n){}}D_.type="NONE";const ml=D_;/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Zr(t,e,n){return`firebase:${t}:${e}:${n}`}class Ri{constructor(e,n,i){this.persistence=e,this.auth=n,this.userKey=i;const{config:s,name:r}=this.auth;this.fullUserKey=Zr(this.userKey,s.apiKey,r),this.fullPersistenceKey=Zr("persistence",s.apiKey,r),this.boundEventHandler=n._onStorageEvent.bind(n),this.persistence._addListener(this.fullUserKey,this.boundEventHandler)}setCurrentUser(e){return this.persistence._set(this.fullUserKey,e.toJSON())}async getCurrentUser(){const e=await this.persistence._get(this.fullUserKey);if(!e)return null;if(typeof e=="string"){const n=await Po(this.auth,{idToken:e}).catch(()=>{});return n?ht._fromGetAccountInfoResponse(this.auth,n,e):null}return ht._fromJSON(this.auth,e)}removeCurrentUser(){return this.persistence._remove(this.fullUserKey)}savePersistenceForRedirect(){return this.persistence._set(this.fullPersistenceKey,this.persistence.type)}async setPersistence(e){if(this.persistence===e)return;const n=await this.getCurrentUser();if(await this.removeCurrentUser(),this.persistence=e,n)return this.setCurrentUser(n)}delete(){this.persistence._removeListener(this.fullUserKey,this.boundEventHandler)}static async create(e,n,i="authUser"){if(!n.length)return new Ri($t(ml),e,i);const s=(await Promise.all(n.map(async l=>{if(await l._isAvailable())return l}))).filter(l=>l);let r=s[0]||$t(ml);const o=Zr(i,e.config.apiKey,e.name);let a=null;for(const l of n)try{const u=await l._get(o);if(u){let d;if(typeof u=="string"){const h=await Po(e,{idToken:u}).catch(()=>{});if(!h)break;d=await ht._fromGetAccountInfoResponse(e,h,u)}else d=ht._fromJSON(e,u);l!==r&&(a=d),r=l;break}}catch{}const c=s.filter(l=>l._shouldAllowMigration);return!r._shouldAllowMigration||!c.length?new Ri(r,e,i):(r=c[0],a&&await r._set(o,a.toJSON()),await Promise.all(n.map(async l=>{if(l!==r)try{await l._remove(o)}catch{}})),new Ri(r,e,i))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Uf(t){const e=t.toLowerCase();if(e.includes("opera/")||e.includes("opr/")||e.includes("opios/"))return"Opera";if(U_(e))return"IEMobile";if(e.includes("msie")||e.includes("trident/"))return"IE";if(e.includes("edge/"))return"Edge";if(M_(e))return"Firefox";if(e.includes("silk/"))return"Silk";if(B_(e))return"Blackberry";if(H_(e))return"Webos";if(x_(e))return"Safari";if((e.includes("chrome/")||F_(e))&&!e.includes("edge/"))return"Chrome";if($_(e))return"Android";{const n=/([a-zA-Z\d\.]+)\/[a-zA-Z\d\.]*$/,i=t.match(n);if(i?.length===2)return i[1]}return"Other"}function M_(t=He()){return/firefox\//i.test(t)}function x_(t=He()){const e=t.toLowerCase();return e.includes("safari/")&&!e.includes("chrome/")&&!e.includes("crios/")&&!e.includes("android")}function F_(t=He()){return/crios\//i.test(t)}function U_(t=He()){return/iemobile/i.test(t)}function $_(t=He()){return/android/i.test(t)}function B_(t=He()){return/blackberry/i.test(t)}function H_(t=He()){return/webos/i.test(t)}function zu(t=He()){return/iphone|ipad|ipod/i.test(t)||/macintosh/i.test(t)&&/mobile/i.test(t)}function UN(t=He()){return zu(t)&&!!window.navigator?.standalone}function $N(){return QT()&&document.documentMode===10}function V_(t=He()){return zu(t)||$_(t)||H_(t)||B_(t)||/windows phone/i.test(t)||U_(t)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function j_(t,e=[]){let n;switch(t){case"Browser":n=Uf(He());break;case"Worker":n=`${Uf(He())}-${t}`;break;default:n=t}const i=e.length?e.join(","):"FirebaseCore-web";return`${n}/JsCore/${ss}/${i}`}/**
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
 */class BN{constructor(e){this.auth=e,this.queue=[]}pushCallback(e,n){const i=r=>new Promise((o,a)=>{try{const c=e(r);o(c)}catch(c){a(c)}});i.onAbort=n,this.queue.push(i);const s=this.queue.length-1;return()=>{this.queue[s]=()=>Promise.resolve()}}async runMiddleware(e){if(this.auth.currentUser===e)return;const n=[];try{for(const i of this.queue)await i(e),i.onAbort&&n.push(i.onAbort)}catch(i){n.reverse();for(const s of n)try{s()}catch{}throw this.auth._errorFactory.create("login-blocked",{originalMessage:i?.message})}}}/**
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
 */async function HN(t,e={}){return ls(t,"GET","/v2/passwordPolicy",Wu(t,e))}/**
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
 */const VN=6;class jN{constructor(e){const n=e.customStrengthOptions;this.customStrengthOptions={},this.customStrengthOptions.minPasswordLength=n.minPasswordLength??VN,n.maxPasswordLength&&(this.customStrengthOptions.maxPasswordLength=n.maxPasswordLength),n.containsLowercaseCharacter!==void 0&&(this.customStrengthOptions.containsLowercaseLetter=n.containsLowercaseCharacter),n.containsUppercaseCharacter!==void 0&&(this.customStrengthOptions.containsUppercaseLetter=n.containsUppercaseCharacter),n.containsNumericCharacter!==void 0&&(this.customStrengthOptions.containsNumericCharacter=n.containsNumericCharacter),n.containsNonAlphanumericCharacter!==void 0&&(this.customStrengthOptions.containsNonAlphanumericCharacter=n.containsNonAlphanumericCharacter),this.enforcementState=e.enforcementState,this.enforcementState==="ENFORCEMENT_STATE_UNSPECIFIED"&&(this.enforcementState="OFF"),this.allowedNonAlphanumericCharacters=e.allowedNonAlphanumericCharacters?.join("")??"",this.forceUpgradeOnSignin=e.forceUpgradeOnSignin??!1,this.schemaVersion=e.schemaVersion}validatePassword(e){const n={isValid:!0,passwordPolicy:this};return this.validatePasswordLengthOptions(e,n),this.validatePasswordCharacterOptions(e,n),n.isValid&&(n.isValid=n.meetsMinPasswordLength??!0),n.isValid&&(n.isValid=n.meetsMaxPasswordLength??!0),n.isValid&&(n.isValid=n.containsLowercaseLetter??!0),n.isValid&&(n.isValid=n.containsUppercaseLetter??!0),n.isValid&&(n.isValid=n.containsNumericCharacter??!0),n.isValid&&(n.isValid=n.containsNonAlphanumericCharacter??!0),n}validatePasswordLengthOptions(e,n){const i=this.customStrengthOptions.minPasswordLength,s=this.customStrengthOptions.maxPasswordLength;i&&(n.meetsMinPasswordLength=e.length>=i),s&&(n.meetsMaxPasswordLength=e.length<=s)}validatePasswordCharacterOptions(e,n){this.updatePasswordCharacterOptionsStatuses(n,!1,!1,!1,!1);let i;for(let s=0;s<e.length;s++)i=e.charAt(s),this.updatePasswordCharacterOptionsStatuses(n,i>="a"&&i<="z",i>="A"&&i<="Z",i>="0"&&i<="9",this.allowedNonAlphanumericCharacters.includes(i))}updatePasswordCharacterOptionsStatuses(e,n,i,s,r){this.customStrengthOptions.containsLowercaseLetter&&(e.containsLowercaseLetter||(e.containsLowercaseLetter=n)),this.customStrengthOptions.containsUppercaseLetter&&(e.containsUppercaseLetter||(e.containsUppercaseLetter=i)),this.customStrengthOptions.containsNumericCharacter&&(e.containsNumericCharacter||(e.containsNumericCharacter=s)),this.customStrengthOptions.containsNonAlphanumericCharacter&&(e.containsNonAlphanumericCharacter||(e.containsNonAlphanumericCharacter=r))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class WN{constructor(e,n,i,s){this.app=e,this.heartbeatServiceProvider=n,this.appCheckServiceProvider=i,this.config=s,this.currentUser=null,this.emulatorConfig=null,this.operations=Promise.resolve(),this.authStateSubscription=new $f(this),this.idTokenSubscription=new $f(this),this.beforeStateQueue=new BN(this),this.redirectUser=null,this.isProactiveRefreshEnabled=!1,this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION=1,this._canInitEmulator=!0,this._isInitialized=!1,this._deleted=!1,this._initializationPromise=null,this._popupRedirectResolver=null,this._errorFactory=A_,this._agentRecaptchaConfig=null,this._tenantRecaptchaConfigs={},this._projectPasswordPolicy=null,this._tenantPasswordPolicies={},this._resolvePersistenceManagerAvailable=void 0,this.lastNotifiedUid=void 0,this.languageCode=null,this.tenantId=null,this.settings={appVerificationDisabledForTesting:!1},this.frameworks=[],this.name=e.name,this.clientVersion=s.sdkClientVersion,this._persistenceManagerAvailable=new Promise(r=>this._resolvePersistenceManagerAvailable=r)}_initializeWithPersistence(e,n){return n&&(this._popupRedirectResolver=$t(n)),this._initializationPromise=this.queue(async()=>{if(!this._deleted&&(this.persistenceManager=await Ri.create(this,e),this._resolvePersistenceManagerAvailable?.(),!this._deleted)){if(this._popupRedirectResolver?._shouldInitProactively)try{await this._popupRedirectResolver._initialize(this)}catch{}await this.initializeCurrentUser(n),this.lastNotifiedUid=this.currentUser?.uid||null,!this._deleted&&(this._isInitialized=!0)}}),this._initializationPromise}async _onStorageEvent(){if(this._deleted)return;const e=await this.assertedPersistence.getCurrentUser();if(!(!this.currentUser&&!e)){if(this.currentUser&&e&&this.currentUser.uid===e.uid){this._currentUser._assign(e),await this.currentUser.getIdToken();return}await this._updateCurrentUser(e,!0)}}async initializeCurrentUserFromIdToken(e){try{const n=await Po(this,{idToken:e}),i=await ht._fromGetAccountInfoResponse(this,n,e);await this.directlySetCurrentUser(i)}catch(n){console.warn("FirebaseServerApp could not login user with provided authIdToken: ",n),await this.directlySetCurrentUser(null)}}async initializeCurrentUser(e){if(at(this.app)){const r=this.app.settings.authIdToken;return r?new Promise(o=>{setTimeout(()=>this.initializeCurrentUserFromIdToken(r).then(o,o))}):this.directlySetCurrentUser(null)}const n=await this.assertedPersistence.getCurrentUser();let i=n,s=!1;if(e&&this.config.authDomain){await this.getOrInitRedirectPersistenceManager();const r=this.redirectUser?._redirectEventId,o=i?._redirectEventId,a=await this.tryRedirectSignIn(e);(!r||r===o)&&a?.user&&(i=a.user,s=!0)}if(!i)return this.directlySetCurrentUser(null);if(!i._redirectEventId){if(s)try{await this.beforeStateQueue.runMiddleware(i)}catch(r){i=n,this._popupRedirectResolver._overrideRedirectResult(this,()=>Promise.reject(r))}return i?this.reloadAndSetCurrentUserOrClear(i):this.directlySetCurrentUser(null)}return k(this._popupRedirectResolver,this,"argument-error"),await this.getOrInitRedirectPersistenceManager(),this.redirectUser&&this.redirectUser._redirectEventId===i._redirectEventId?this.directlySetCurrentUser(i):this.reloadAndSetCurrentUserOrClear(i)}async tryRedirectSignIn(e){let n=null;try{n=await this._popupRedirectResolver._completeRedirectFn(this,e,!0)}catch{await this._setRedirectUser(null)}return n}async reloadAndSetCurrentUserOrClear(e){try{await Lo(e)}catch(n){if(n?.code!=="auth/network-request-failed")return this.directlySetCurrentUser(null)}return this.directlySetCurrentUser(e)}useDeviceLanguage(){this.languageCode=TN()}async _delete(){this._deleted=!0}async updateCurrentUser(e){if(at(this.app))return Promise.reject(Kn(this));const n=e?re(e):null;return n&&k(n.auth.config.apiKey===this.config.apiKey,this,"invalid-user-token"),this._updateCurrentUser(n&&n._clone(this))}async _updateCurrentUser(e,n=!1){if(!this._deleted)return e&&k(this.tenantId===e.tenantId,this,"tenant-id-mismatch"),n||await this.beforeStateQueue.runMiddleware(e),this.queue(async()=>{await this.directlySetCurrentUser(e),this.notifyAuthListeners()})}async signOut(){return at(this.app)?Promise.reject(Kn(this)):(await this.beforeStateQueue.runMiddleware(null),(this.redirectPersistenceManager||this._popupRedirectResolver)&&await this._setRedirectUser(null),this._updateCurrentUser(null,!0))}setPersistence(e){return at(this.app)?Promise.reject(Kn(this)):this.queue(async()=>{await this.assertedPersistence.setPersistence($t(e))})}_getRecaptchaConfig(){return this.tenantId==null?this._agentRecaptchaConfig:this._tenantRecaptchaConfigs[this.tenantId]}async validatePassword(e){this._getPasswordPolicyInternal()||await this._updatePasswordPolicy();const n=this._getPasswordPolicyInternal();return n.schemaVersion!==this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION?Promise.reject(this._errorFactory.create("unsupported-password-policy-schema-version",{})):n.validatePassword(e)}_getPasswordPolicyInternal(){return this.tenantId===null?this._projectPasswordPolicy:this._tenantPasswordPolicies[this.tenantId]}async _updatePasswordPolicy(){const e=await HN(this),n=new jN(e);this.tenantId===null?this._projectPasswordPolicy=n:this._tenantPasswordPolicies[this.tenantId]=n}_getPersistenceType(){return this.assertedPersistence.persistence.type}_getPersistence(){return this.assertedPersistence.persistence}_updateErrorMap(e){this._errorFactory=new On("auth","Firebase",e())}onAuthStateChanged(e,n,i){return this.registerStateListener(this.authStateSubscription,e,n,i)}beforeAuthStateChanged(e,n){return this.beforeStateQueue.pushCallback(e,n)}onIdTokenChanged(e,n,i){return this.registerStateListener(this.idTokenSubscription,e,n,i)}authStateReady(){return new Promise((e,n)=>{if(this.currentUser)e();else{const i=this.onAuthStateChanged(()=>{i(),e()},n)}})}async revokeAccessToken(e){if(this.currentUser){const n=await this.currentUser.getIdToken(),i={providerId:"apple.com",tokenType:"ACCESS_TOKEN",token:e,idToken:n};this.tenantId!=null&&(i.tenantId=this.tenantId),await FN(this,i)}}toJSON(){return{apiKey:this.config.apiKey,authDomain:this.config.authDomain,appName:this.name,currentUser:this._currentUser?.toJSON()}}async _setRedirectUser(e,n){const i=await this.getOrInitRedirectPersistenceManager(n);return e===null?i.removeCurrentUser():i.setCurrentUser(e)}async getOrInitRedirectPersistenceManager(e){if(!this.redirectPersistenceManager){const n=e&&$t(e)||this._popupRedirectResolver;k(n,this,"argument-error"),this.redirectPersistenceManager=await Ri.create(this,[$t(n._redirectPersistence)],"redirectUser"),this.redirectUser=await this.redirectPersistenceManager.getCurrentUser()}return this.redirectPersistenceManager}async _redirectUserForId(e){return this._isInitialized&&await this.queue(async()=>{}),this._currentUser?._redirectEventId===e?this._currentUser:this.redirectUser?._redirectEventId===e?this.redirectUser:null}async _persistUserIfCurrent(e){if(e===this.currentUser)return this.queue(async()=>this.directlySetCurrentUser(e))}_notifyListenersIfCurrent(e){e===this.currentUser&&this.notifyAuthListeners()}_key(){return`${this.config.authDomain}:${this.config.apiKey}:${this.name}`}_startProactiveRefresh(){this.isProactiveRefreshEnabled=!0,this.currentUser&&this._currentUser._startProactiveRefresh()}_stopProactiveRefresh(){this.isProactiveRefreshEnabled=!1,this.currentUser&&this._currentUser._stopProactiveRefresh()}get _currentUser(){return this.currentUser}notifyAuthListeners(){if(!this._isInitialized)return;this.idTokenSubscription.next(this.currentUser);const e=this.currentUser?.uid??null;this.lastNotifiedUid!==e&&(this.lastNotifiedUid=e,this.authStateSubscription.next(this.currentUser))}registerStateListener(e,n,i,s){if(this._deleted)return()=>{};const r=typeof n=="function"?n:n.next.bind(n);let o=!1;const a=this._isInitialized?Promise.resolve():this._initializationPromise;if(k(a,this,"internal-error"),a.then(()=>{o||r(this.currentUser)}),typeof n=="function"){const c=e.addObserver(n,i,s);return()=>{o=!0,c()}}else{const c=e.addObserver(n);return()=>{o=!0,c()}}}async directlySetCurrentUser(e){this.currentUser&&this.currentUser!==e&&this._currentUser._stopProactiveRefresh(),e&&this.isProactiveRefreshEnabled&&e._startProactiveRefresh(),this.currentUser=e,e?await this.assertedPersistence.setCurrentUser(e):await this.assertedPersistence.removeCurrentUser()}queue(e){return this.operations=this.operations.then(e,e),this.operations}get assertedPersistence(){return k(this.persistenceManager,this,"internal-error"),this.persistenceManager}_logFramework(e){!e||this.frameworks.includes(e)||(this.frameworks.push(e),this.frameworks.sort(),this.clientVersion=j_(this.config.clientPlatform,this._getFrameworks()))}_getFrameworks(){return this.frameworks}async _getAdditionalHeaders(){const e={"X-Client-Version":this.clientVersion};this.app.options.appId&&(e["X-Firebase-gmpid"]=this.app.options.appId);const n=await this.heartbeatServiceProvider.getImmediate({optional:!0})?.getHeartbeatsHeader();n&&(e["X-Firebase-Client"]=n);const i=await this._getAppCheckToken();return i&&(e["X-Firebase-AppCheck"]=i),e}async _getAppCheckToken(){if(at(this.app)&&this.app.settings.appCheckToken)return this.app.settings.appCheckToken;const e=await this.appCheckServiceProvider.getImmediate({optional:!0})?.getToken();return e?.error&&vN(`Error while retrieving App Check token: ${e.error}`),e?.token}}function us(t){return re(t)}class $f{constructor(e){this.auth=e,this.observer=null,this.addObserver=aS(n=>this.observer=n)}get next(){return k(this.observer,this.auth,"internal-error"),this.observer.next.bind(this.observer)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Gu={async loadJS(){throw new Error("Unable to load external scripts")},recaptchaV2Script:"",recaptchaEnterpriseScript:"",gapiScript:""};function qN(t){Gu=t}function zN(t){return Gu.loadJS(t)}function GN(){return Gu.gapiScript}function KN(t){return`__${t}${Math.floor(Math.random()*1e6)}`}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function YN(t,e){const n=Dn(t,"auth");if(n.isInitialized()){const s=n.getImmediate(),r=n.getOptions();if(ei(r,e??{}))return s;Pt(s,"already-initialized")}return n.initialize({options:e})}function JN(t,e){const n=e?.persistence||[],i=(Array.isArray(n)?n:[n]).map($t);e?.errorMap&&t._updateErrorMap(e.errorMap),t._initializeWithPersistence(i,e?.popupRedirectResolver)}function XN(t,e,n){const i=us(t);k(/^https?:\/\//.test(e),i,"invalid-emulator-scheme");const s=!1,r=W_(e),{host:o,port:a}=QN(e),c=a===null?"":`:${a}`,l={url:`${r}//${o}${c}/`},u=Object.freeze({host:o,port:a,protocol:r.replace(":",""),options:Object.freeze({disableWarnings:s})});if(!i._canInitEmulator){k(i.config.emulator&&i.emulatorConfig,i,"emulator-config-failed"),k(ei(l,i.config.emulator)&&ei(u,i.emulatorConfig),i,"emulator-config-failed");return}i.config.emulator=l,i.emulatorConfig=u,i.settings.appVerificationDisabledForTesting=!0,ns(o)?(Og(`${r}//${o}${c}`),Dg("Auth",!0)):ZN()}function W_(t){const e=t.indexOf(":");return e<0?"":t.substr(0,e+1)}function QN(t){const e=W_(t),n=/(\/\/)?([^?#/]+)/.exec(t.substr(e.length));if(!n)return{host:"",port:null};const i=n[2].split("@").pop()||"",s=/^(\[[^\]]+\])(:|$)/.exec(i);if(s){const r=s[1];return{host:r,port:Bf(i.substr(r.length+1))}}else{const[r,o]=i.split(":");return{host:r,port:Bf(o)}}}function Bf(t){if(!t)return null;const e=Number(t);return isNaN(e)?null:e}function ZN(){function t(){const e=document.createElement("p"),n=e.style;e.innerText="Running in emulator mode. Do not use with production credentials.",n.position="fixed",n.width="100%",n.backgroundColor="#ffffff",n.border=".1em solid #000000",n.color="#b50000",n.bottom="0px",n.left="0px",n.margin="0px",n.zIndex="10000",n.textAlign="center",e.classList.add("firebase-emulator-warning"),document.body.appendChild(e)}typeof console<"u"&&typeof console.info=="function"&&console.info("WARNING: You are using the Auth Emulator, which is intended for local testing only.  Do not use with production credentials."),typeof window<"u"&&typeof document<"u"&&(document.readyState==="loading"?window.addEventListener("DOMContentLoaded",t):t())}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class q_{constructor(e,n){this.providerId=e,this.signInMethod=n}toJSON(){return Ut("not implemented")}_getIdTokenResponse(e){return Ut("not implemented")}_linkToIdToken(e,n){return Ut("not implemented")}_getReauthenticationResolver(e){return Ut("not implemented")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Ai(t,e){return RN(t,"POST","/v1/accounts:signInWithIdp",Wu(t,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const eP="http://localhost";class oi extends q_{constructor(){super(...arguments),this.pendingToken=null}static _fromParams(e){const n=new oi(e.providerId,e.signInMethod);return e.idToken||e.accessToken?(e.idToken&&(n.idToken=e.idToken),e.accessToken&&(n.accessToken=e.accessToken),e.nonce&&!e.pendingToken&&(n.nonce=e.nonce),e.pendingToken&&(n.pendingToken=e.pendingToken)):e.oauthToken&&e.oauthTokenSecret?(n.accessToken=e.oauthToken,n.secret=e.oauthTokenSecret):Pt("argument-error"),n}toJSON(){return{idToken:this.idToken,accessToken:this.accessToken,secret:this.secret,nonce:this.nonce,pendingToken:this.pendingToken,providerId:this.providerId,signInMethod:this.signInMethod}}static fromJSON(e){const n=typeof e=="string"?JSON.parse(e):e,{providerId:i,signInMethod:s,...r}=n;if(!i||!s)return null;const o=new oi(i,s);return o.idToken=r.idToken||void 0,o.accessToken=r.accessToken||void 0,o.secret=r.secret,o.nonce=r.nonce,o.pendingToken=r.pendingToken||null,o}_getIdTokenResponse(e){const n=this.buildRequest();return Ai(e,n)}_linkToIdToken(e,n){const i=this.buildRequest();return i.idToken=n,Ai(e,i)}_getReauthenticationResolver(e){const n=this.buildRequest();return n.autoCreate=!1,Ai(e,n)}buildRequest(){const e={requestUri:eP,returnSecureToken:!0};if(this.pendingToken)e.pendingToken=this.pendingToken;else{const n={};this.idToken&&(n.id_token=this.idToken),this.accessToken&&(n.access_token=this.accessToken),this.secret&&(n.oauth_token_secret=this.secret),n.providerId=this.providerId,this.nonce&&!this.pendingToken&&(n.nonce=this.nonce),e.postBody=is(n)}return e}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ku{constructor(e){this.providerId=e,this.defaultLanguageCode=null,this.customParameters={}}setDefaultLanguage(e){this.defaultLanguageCode=e}setCustomParameters(e){return this.customParameters=e,this}getCustomParameters(){return this.customParameters}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ar extends Ku{constructor(){super(...arguments),this.scopes=[]}addScope(e){return this.scopes.includes(e)||this.scopes.push(e),this}getScopes(){return[...this.scopes]}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class an extends Ar{constructor(){super("facebook.com")}static credential(e){return oi._fromParams({providerId:an.PROVIDER_ID,signInMethod:an.FACEBOOK_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return an.credentialFromTaggedObject(e)}static credentialFromError(e){return an.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return an.credential(e.oauthAccessToken)}catch{return null}}}an.FACEBOOK_SIGN_IN_METHOD="facebook.com";an.PROVIDER_ID="facebook.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class kt extends Ar{constructor(){super("google.com"),this.addScope("profile")}static credential(e,n){return oi._fromParams({providerId:kt.PROVIDER_ID,signInMethod:kt.GOOGLE_SIGN_IN_METHOD,idToken:e,accessToken:n})}static credentialFromResult(e){return kt.credentialFromTaggedObject(e)}static credentialFromError(e){return kt.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthIdToken:n,oauthAccessToken:i}=e;if(!n&&!i)return null;try{return kt.credential(n,i)}catch{return null}}}kt.GOOGLE_SIGN_IN_METHOD="google.com";kt.PROVIDER_ID="google.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class cn extends Ar{constructor(){super("github.com")}static credential(e){return oi._fromParams({providerId:cn.PROVIDER_ID,signInMethod:cn.GITHUB_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return cn.credentialFromTaggedObject(e)}static credentialFromError(e){return cn.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return cn.credential(e.oauthAccessToken)}catch{return null}}}cn.GITHUB_SIGN_IN_METHOD="github.com";cn.PROVIDER_ID="github.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ln extends Ar{constructor(){super("twitter.com")}static credential(e,n){return oi._fromParams({providerId:ln.PROVIDER_ID,signInMethod:ln.TWITTER_SIGN_IN_METHOD,oauthToken:e,oauthTokenSecret:n})}static credentialFromResult(e){return ln.credentialFromTaggedObject(e)}static credentialFromError(e){return ln.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthAccessToken:n,oauthTokenSecret:i}=e;if(!n||!i)return null;try{return ln.credential(n,i)}catch{return null}}}ln.TWITTER_SIGN_IN_METHOD="twitter.com";ln.PROVIDER_ID="twitter.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Yi{constructor(e){this.user=e.user,this.providerId=e.providerId,this._tokenResponse=e._tokenResponse,this.operationType=e.operationType}static async _fromIdTokenResponse(e,n,i,s=!1){const r=await ht._fromIdTokenResponse(e,i,s),o=Hf(i);return new Yi({user:r,providerId:o,_tokenResponse:i,operationType:n})}static async _forOperation(e,n,i){await e._updateTokensIfNecessary(i,!0);const s=Hf(i);return new Yi({user:e,providerId:s,_tokenResponse:i,operationType:n})}}function Hf(t){return t.providerId?t.providerId:"phoneNumber"in t?"phone":null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Oo extends Zt{constructor(e,n,i,s){super(n.code,n.message),this.operationType=i,this.user=s,Object.setPrototypeOf(this,Oo.prototype),this.customData={appName:e.name,tenantId:e.tenantId??void 0,_serverResponse:n.customData._serverResponse,operationType:i}}static _fromErrorAndOperation(e,n,i,s){return new Oo(e,n,i,s)}}function z_(t,e,n,i){return(e==="reauthenticate"?n._getReauthenticationResolver(t):n._getIdTokenResponse(t)).catch(r=>{throw r.code==="auth/multi-factor-auth-required"?Oo._fromErrorAndOperation(t,r,e,i):r})}async function tP(t,e,n=!1){const i=await nr(t,e._linkToIdToken(t.auth,await t.getIdToken()),n);return Yi._forOperation(t,"link",i)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function nP(t,e,n=!1){const{auth:i}=t;if(at(i.app))return Promise.reject(Kn(i));const s="reauthenticate";try{const r=await nr(t,z_(i,s,e,t),n);k(r.idToken,i,"internal-error");const o=qu(r.idToken);k(o,i,"internal-error");const{sub:a}=o;return k(t.uid===a,i,"user-mismatch"),Yi._forOperation(t,s,r)}catch(r){throw r?.code==="auth/user-not-found"&&Pt(i,"user-mismatch"),r}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function G_(t,e,n=!1){if(at(t.app))return Promise.reject(Kn(t));const i="signIn",s=await z_(t,i,e),r=await Yi._fromIdTokenResponse(t,i,s);return n||await t._updateCurrentUser(r.user),r}async function iP(t,e){return G_(us(t),e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function pc(t,e){return re(t).setPersistence(e)}function sP(t,e,n,i){return re(t).onIdTokenChanged(e,n,i)}function rP(t,e,n){return re(t).beforeAuthStateChanged(e,n)}function K_(t,e,n,i){return re(t).onAuthStateChanged(e,n,i)}function oP(t){return re(t).signOut()}async function aP(t){return re(t).delete()}const Do="__sak";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Y_{constructor(e,n){this.storageRetriever=e,this.type=n}_isAvailable(){try{return this.storage?(this.storage.setItem(Do,"1"),this.storage.removeItem(Do),Promise.resolve(!0)):Promise.resolve(!1)}catch{return Promise.resolve(!1)}}_set(e,n){return this.storage.setItem(e,JSON.stringify(n)),Promise.resolve()}_get(e){const n=this.storage.getItem(e);return Promise.resolve(n?JSON.parse(n):null)}_remove(e){return this.storage.removeItem(e),Promise.resolve()}get storage(){return this.storageRetriever()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const cP=1e3,lP=10;class J_ extends Y_{constructor(){super(()=>window.localStorage,"LOCAL"),this.boundEventHandler=(e,n)=>this.onStorageEvent(e,n),this.listeners={},this.localCache={},this.pollTimer=null,this.fallbackToPolling=V_(),this._shouldAllowMigration=!0}forAllChangedKeys(e){for(const n of Object.keys(this.listeners)){const i=this.storage.getItem(n),s=this.localCache[n];i!==s&&e(n,s,i)}}onStorageEvent(e,n=!1){if(!e.key){this.forAllChangedKeys((o,a,c)=>{this.notifyListeners(o,c)});return}const i=e.key;n?this.detachListener():this.stopPolling();const s=()=>{const o=this.storage.getItem(i);!n&&this.localCache[i]===o||this.notifyListeners(i,o)},r=this.storage.getItem(i);$N()&&r!==e.newValue&&e.newValue!==e.oldValue?setTimeout(s,lP):s()}notifyListeners(e,n){this.localCache[e]=n;const i=this.listeners[e];if(i)for(const s of Array.from(i))s(n&&JSON.parse(n))}startPolling(){this.stopPolling(),this.pollTimer=setInterval(()=>{this.forAllChangedKeys((e,n,i)=>{this.onStorageEvent(new StorageEvent("storage",{key:e,oldValue:n,newValue:i}),!0)})},cP)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}attachListener(){window.addEventListener("storage",this.boundEventHandler)}detachListener(){window.removeEventListener("storage",this.boundEventHandler)}_addListener(e,n){Object.keys(this.listeners).length===0&&(this.fallbackToPolling?this.startPolling():this.attachListener()),this.listeners[e]||(this.listeners[e]=new Set,this.localCache[e]=this.storage.getItem(e)),this.listeners[e].add(n)}_removeListener(e,n){this.listeners[e]&&(this.listeners[e].delete(n),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&(this.detachListener(),this.stopPolling())}async _set(e,n){await super._set(e,n),this.localCache[e]=JSON.stringify(n)}async _get(e){const n=await super._get(e);return this.localCache[e]=JSON.stringify(n),n}async _remove(e){await super._remove(e),delete this.localCache[e]}}J_.type="LOCAL";const X_=J_;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Q_ extends Y_{constructor(){super(()=>window.sessionStorage,"SESSION")}_addListener(e,n){}_removeListener(e,n){}}Q_.type="SESSION";const Z_=Q_;/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function uP(t){return Promise.all(t.map(async e=>{try{return{fulfilled:!0,value:await e}}catch(n){return{fulfilled:!1,reason:n}}}))}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ta{constructor(e){this.eventTarget=e,this.handlersMap={},this.boundEventHandler=this.handleEvent.bind(this)}static _getInstance(e){const n=this.receivers.find(s=>s.isListeningto(e));if(n)return n;const i=new Ta(e);return this.receivers.push(i),i}isListeningto(e){return this.eventTarget===e}async handleEvent(e){const n=e,{eventId:i,eventType:s,data:r}=n.data,o=this.handlersMap[s];if(!o?.size)return;n.ports[0].postMessage({status:"ack",eventId:i,eventType:s});const a=Array.from(o).map(async l=>l(n.origin,r)),c=await uP(a);n.ports[0].postMessage({status:"done",eventId:i,eventType:s,response:c})}_subscribe(e,n){Object.keys(this.handlersMap).length===0&&this.eventTarget.addEventListener("message",this.boundEventHandler),this.handlersMap[e]||(this.handlersMap[e]=new Set),this.handlersMap[e].add(n)}_unsubscribe(e,n){this.handlersMap[e]&&n&&this.handlersMap[e].delete(n),(!n||this.handlersMap[e].size===0)&&delete this.handlersMap[e],Object.keys(this.handlersMap).length===0&&this.eventTarget.removeEventListener("message",this.boundEventHandler)}}Ta.receivers=[];/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Yu(t="",e=10){let n="";for(let i=0;i<e;i++)n+=Math.floor(Math.random()*10);return t+n}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class dP{constructor(e){this.target=e,this.handlers=new Set}removeMessageHandler(e){e.messageChannel&&(e.messageChannel.port1.removeEventListener("message",e.onMessage),e.messageChannel.port1.close()),this.handlers.delete(e)}async _send(e,n,i=50){const s=typeof MessageChannel<"u"?new MessageChannel:null;if(!s)throw new Error("connection_unavailable");let r,o;return new Promise((a,c)=>{const l=Yu("",20);s.port1.start();const u=setTimeout(()=>{c(new Error("unsupported_event"))},i);o={messageChannel:s,onMessage(d){const h=d;if(h.data.eventId===l)switch(h.data.status){case"ack":clearTimeout(u),r=setTimeout(()=>{c(new Error("timeout"))},3e3);break;case"done":clearTimeout(r),a(h.data.response);break;default:clearTimeout(u),clearTimeout(r),c(new Error("invalid_response"));break}}},this.handlers.add(o),s.port1.addEventListener("message",o.onMessage),this.target.postMessage({eventType:e,eventId:l,data:n},[s.port2])}).finally(()=>{o&&this.removeMessageHandler(o)})}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function At(){return window}function hP(t){At().location.href=t}/**
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
 */function ey(){return typeof At().WorkerGlobalScope<"u"&&typeof At().importScripts=="function"}async function fP(){if(!navigator?.serviceWorker)return null;try{return(await navigator.serviceWorker.ready).active}catch{return null}}function pP(){return navigator?.serviceWorker?.controller||null}function gP(){return ey()?self:null}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ty="firebaseLocalStorageDb",mP=1,Mo="firebaseLocalStorage",ny="fbase_key";class Nr{constructor(e){this.request=e}toPromise(){return new Promise((e,n)=>{this.request.addEventListener("success",()=>{e(this.request.result)}),this.request.addEventListener("error",()=>{n(this.request.error)})})}}function Sa(t,e){return t.transaction([Mo],e?"readwrite":"readonly").objectStore(Mo)}function _P(){const t=indexedDB.deleteDatabase(ty);return new Nr(t).toPromise()}function _l(){const t=indexedDB.open(ty,mP);return new Promise((e,n)=>{t.addEventListener("error",()=>{n(t.error)}),t.addEventListener("upgradeneeded",()=>{const i=t.result;try{i.createObjectStore(Mo,{keyPath:ny})}catch(s){n(s)}}),t.addEventListener("success",async()=>{const i=t.result;i.objectStoreNames.contains(Mo)?e(i):(i.close(),await _P(),e(await _l()))})})}async function Vf(t,e,n){const i=Sa(t,!0).put({[ny]:e,value:n});return new Nr(i).toPromise()}async function yP(t,e){const n=Sa(t,!1).get(e),i=await new Nr(n).toPromise();return i===void 0?null:i.value}function jf(t,e){const n=Sa(t,!0).delete(e);return new Nr(n).toPromise()}const wP=800,vP=3;class iy{constructor(){this.type="LOCAL",this._shouldAllowMigration=!0,this.listeners={},this.localCache={},this.pollTimer=null,this.pendingWrites=0,this.receiver=null,this.sender=null,this.serviceWorkerReceiverAvailable=!1,this.activeServiceWorker=null,this._workerInitializationPromise=this.initializeServiceWorkerMessaging().then(()=>{},()=>{})}async _openDb(){return this.db?this.db:(this.db=await _l(),this.db)}async _withRetries(e){let n=0;for(;;)try{const i=await this._openDb();return await e(i)}catch(i){if(n++>vP)throw i;this.db&&(this.db.close(),this.db=void 0)}}async initializeServiceWorkerMessaging(){return ey()?this.initializeReceiver():this.initializeSender()}async initializeReceiver(){this.receiver=Ta._getInstance(gP()),this.receiver._subscribe("keyChanged",async(e,n)=>({keyProcessed:(await this._poll()).includes(n.key)})),this.receiver._subscribe("ping",async(e,n)=>["keyChanged"])}async initializeSender(){if(this.activeServiceWorker=await fP(),!this.activeServiceWorker)return;this.sender=new dP(this.activeServiceWorker);const e=await this.sender._send("ping",{},800);e&&e[0]?.fulfilled&&e[0]?.value.includes("keyChanged")&&(this.serviceWorkerReceiverAvailable=!0)}async notifyServiceWorker(e){if(!(!this.sender||!this.activeServiceWorker||pP()!==this.activeServiceWorker))try{await this.sender._send("keyChanged",{key:e},this.serviceWorkerReceiverAvailable?800:50)}catch{}}async _isAvailable(){try{if(!indexedDB)return!1;const e=await _l();return await Vf(e,Do,"1"),await jf(e,Do),!0}catch{}return!1}async _withPendingWrite(e){this.pendingWrites++;try{await e()}finally{this.pendingWrites--}}async _set(e,n){return this._withPendingWrite(async()=>(await this._withRetries(i=>Vf(i,e,n)),this.localCache[e]=n,this.notifyServiceWorker(e)))}async _get(e){const n=await this._withRetries(i=>yP(i,e));return this.localCache[e]=n,n}async _remove(e){return this._withPendingWrite(async()=>(await this._withRetries(n=>jf(n,e)),delete this.localCache[e],this.notifyServiceWorker(e)))}async _poll(){const e=await this._withRetries(s=>{const r=Sa(s,!1).getAll();return new Nr(r).toPromise()});if(!e)return[];if(this.pendingWrites!==0)return[];const n=[],i=new Set;if(e.length!==0)for(const{fbase_key:s,value:r}of e)i.add(s),JSON.stringify(this.localCache[s])!==JSON.stringify(r)&&(this.notifyListeners(s,r),n.push(s));for(const s of Object.keys(this.localCache))this.localCache[s]&&!i.has(s)&&(this.notifyListeners(s,null),n.push(s));return n}notifyListeners(e,n){this.localCache[e]=n;const i=this.listeners[e];if(i)for(const s of Array.from(i))s(n)}startPolling(){this.stopPolling(),this.pollTimer=setInterval(async()=>this._poll(),wP)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}_addListener(e,n){Object.keys(this.listeners).length===0&&this.startPolling(),this.listeners[e]||(this.listeners[e]=new Set,this._get(e)),this.listeners[e].add(n)}_removeListener(e,n){this.listeners[e]&&(this.listeners[e].delete(n),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&this.stopPolling()}}iy.type="LOCAL";const sy=iy;new Rr(3e4,6e4);/**
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
 */function ry(t,e){return e?$t(e):(k(t._popupRedirectResolver,t,"argument-error"),t._popupRedirectResolver)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ju extends q_{constructor(e){super("custom","custom"),this.params=e}_getIdTokenResponse(e){return Ai(e,this._buildIdpRequest())}_linkToIdToken(e,n){return Ai(e,this._buildIdpRequest(n))}_getReauthenticationResolver(e){return Ai(e,this._buildIdpRequest())}_buildIdpRequest(e){const n={requestUri:this.params.requestUri,sessionId:this.params.sessionId,postBody:this.params.postBody,tenantId:this.params.tenantId,pendingToken:this.params.pendingToken,returnSecureToken:!0,returnIdpCredential:!0};return e&&(n.idToken=e),n}}function bP(t){return G_(t.auth,new Ju(t),t.bypassAuthState)}function EP(t){const{auth:e,user:n}=t;return k(n,e,"internal-error"),nP(n,new Ju(t),t.bypassAuthState)}async function CP(t){const{auth:e,user:n}=t;return k(n,e,"internal-error"),tP(n,new Ju(t),t.bypassAuthState)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class oy{constructor(e,n,i,s,r=!1){this.auth=e,this.resolver=i,this.user=s,this.bypassAuthState=r,this.pendingPromise=null,this.eventManager=null,this.filter=Array.isArray(n)?n:[n]}execute(){return new Promise(async(e,n)=>{this.pendingPromise={resolve:e,reject:n};try{this.eventManager=await this.resolver._initialize(this.auth),await this.onExecution(),this.eventManager.registerConsumer(this)}catch(i){this.reject(i)}})}async onAuthEvent(e){const{urlResponse:n,sessionId:i,postBody:s,tenantId:r,error:o,type:a}=e;if(o){this.reject(o);return}const c={auth:this.auth,requestUri:n,sessionId:i,tenantId:r||void 0,postBody:s||void 0,user:this.user,bypassAuthState:this.bypassAuthState};try{this.resolve(await this.getIdpTask(a)(c))}catch(l){this.reject(l)}}onError(e){this.reject(e)}getIdpTask(e){switch(e){case"signInViaPopup":case"signInViaRedirect":return bP;case"linkViaPopup":case"linkViaRedirect":return CP;case"reauthViaPopup":case"reauthViaRedirect":return EP;default:Pt(this.auth,"internal-error")}}resolve(e){Yt(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.resolve(e),this.unregisterAndCleanUp()}reject(e){Yt(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.reject(e),this.unregisterAndCleanUp()}unregisterAndCleanUp(){this.eventManager&&this.eventManager.unregisterConsumer(this),this.pendingPromise=null,this.cleanUp()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const TP=new Rr(2e3,1e4);async function SP(t,e,n){if(at(t.app))return Promise.reject(gt(t,"operation-not-supported-in-this-environment"));const i=us(t);bN(t,e,Ku);const s=ry(i,n);return new Wn(i,"signInViaPopup",e,s).executeNotNull()}class Wn extends oy{constructor(e,n,i,s,r){super(e,n,s,r),this.provider=i,this.authWindow=null,this.pollId=null,Wn.currentPopupAction&&Wn.currentPopupAction.cancel(),Wn.currentPopupAction=this}async executeNotNull(){const e=await this.execute();return k(e,this.auth,"internal-error"),e}async onExecution(){Yt(this.filter.length===1,"Popup operations only handle one event");const e=Yu();this.authWindow=await this.resolver._openPopup(this.auth,this.provider,this.filter[0],e),this.authWindow.associatedEvent=e,this.resolver._originValidation(this.auth).catch(n=>{this.reject(n)}),this.resolver._isIframeWebStorageSupported(this.auth,n=>{n||this.reject(gt(this.auth,"web-storage-unsupported"))}),this.pollUserCancellation()}get eventId(){return this.authWindow?.associatedEvent||null}cancel(){this.reject(gt(this.auth,"cancelled-popup-request"))}cleanUp(){this.authWindow&&this.authWindow.close(),this.pollId&&window.clearTimeout(this.pollId),this.authWindow=null,this.pollId=null,Wn.currentPopupAction=null}pollUserCancellation(){const e=()=>{if(this.authWindow?.window?.closed){this.pollId=window.setTimeout(()=>{this.pollId=null,this.reject(gt(this.auth,"popup-closed-by-user"))},8e3);return}this.pollId=window.setTimeout(e,TP.get())};e()}}Wn.currentPopupAction=null;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const IP="pendingRedirect",eo=new Map;class kP extends oy{constructor(e,n,i=!1){super(e,["signInViaRedirect","linkViaRedirect","reauthViaRedirect","unknown"],n,void 0,i),this.eventId=null}async execute(){let e=eo.get(this.auth._key());if(!e){try{const i=await RP(this.resolver,this.auth)?await super.execute():null;e=()=>Promise.resolve(i)}catch(n){e=()=>Promise.reject(n)}eo.set(this.auth._key(),e)}return this.bypassAuthState||eo.set(this.auth._key(),()=>Promise.resolve(null)),e()}async onAuthEvent(e){if(e.type==="signInViaRedirect")return super.onAuthEvent(e);if(e.type==="unknown"){this.resolve(null);return}if(e.eventId){const n=await this.auth._redirectUserForId(e.eventId);if(n)return this.user=n,super.onAuthEvent(e);this.resolve(null)}}async onExecution(){}cleanUp(){}}async function RP(t,e){const n=PP(e),i=NP(t);if(!await i._isAvailable())return!1;const s=await i._get(n)==="true";return await i._remove(n),s}function AP(t,e){eo.set(t._key(),e)}function NP(t){return $t(t._redirectPersistence)}function PP(t){return Zr(IP,t.config.apiKey,t.name)}async function LP(t,e){return await us(t)._initializationPromise,ay(t,e,!1)}async function ay(t,e,n=!1){if(at(t.app))return Promise.reject(Kn(t));const i=us(t),s=ry(i,e),o=await new kP(i,s,n).execute();return o&&!n&&(delete o.user._redirectEventId,await i._persistUserIfCurrent(o.user),await i._setRedirectUser(null,e)),o}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const OP=600*1e3;class DP{constructor(e){this.auth=e,this.cachedEventUids=new Set,this.consumers=new Set,this.queuedRedirectEvent=null,this.hasHandledPotentialRedirect=!1,this.lastProcessedEventTime=Date.now()}registerConsumer(e){this.consumers.add(e),this.queuedRedirectEvent&&this.isEventForConsumer(this.queuedRedirectEvent,e)&&(this.sendToConsumer(this.queuedRedirectEvent,e),this.saveEventToCache(this.queuedRedirectEvent),this.queuedRedirectEvent=null)}unregisterConsumer(e){this.consumers.delete(e)}onEvent(e){if(this.hasEventBeenHandled(e))return!1;let n=!1;return this.consumers.forEach(i=>{this.isEventForConsumer(e,i)&&(n=!0,this.sendToConsumer(e,i),this.saveEventToCache(e))}),this.hasHandledPotentialRedirect||!MP(e)||(this.hasHandledPotentialRedirect=!0,n||(this.queuedRedirectEvent=e,n=!0)),n}sendToConsumer(e,n){if(e.error&&!cy(e)){const i=e.error.code?.split("auth/")[1]||"internal-error";n.onError(gt(this.auth,i))}else n.onAuthEvent(e)}isEventForConsumer(e,n){const i=n.eventId===null||!!e.eventId&&e.eventId===n.eventId;return n.filter.includes(e.type)&&i}hasEventBeenHandled(e){return Date.now()-this.lastProcessedEventTime>=OP&&this.cachedEventUids.clear(),this.cachedEventUids.has(Wf(e))}saveEventToCache(e){this.cachedEventUids.add(Wf(e)),this.lastProcessedEventTime=Date.now()}}function Wf(t){return[t.type,t.eventId,t.sessionId,t.tenantId].filter(e=>e).join("-")}function cy({type:t,error:e}){return t==="unknown"&&e?.code==="auth/no-auth-event"}function MP(t){switch(t.type){case"signInViaRedirect":case"linkViaRedirect":case"reauthViaRedirect":return!0;case"unknown":return cy(t);default:return!1}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function xP(t,e={}){return ls(t,"GET","/v1/projects",e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const FP=/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/,UP=/^https?/;async function $P(t){if(t.config.emulator)return;const{authorizedDomains:e}=await xP(t);for(const n of e)try{if(BP(n))return}catch{}Pt(t,"unauthorized-domain")}function BP(t){const e=pl(),{protocol:n,hostname:i}=new URL(e);if(t.startsWith("chrome-extension://")){const o=new URL(t);return o.hostname===""&&i===""?n==="chrome-extension:"&&t.replace("chrome-extension://","")===e.replace("chrome-extension://",""):n==="chrome-extension:"&&o.hostname===i}if(!UP.test(n))return!1;if(FP.test(t))return i===t;const s=t.replace(/\./g,"\\.");return new RegExp("^(.+\\."+s+"|"+s+")$","i").test(i)}/**
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
 */const HP=new Rr(3e4,6e4);function qf(){const t=At().___jsl;if(t?.H){for(const e of Object.keys(t.H))if(t.H[e].r=t.H[e].r||[],t.H[e].L=t.H[e].L||[],t.H[e].r=[...t.H[e].L],t.CP)for(let n=0;n<t.CP.length;n++)t.CP[n]=null}}function VP(t){return new Promise((e,n)=>{function i(){qf(),gapi.load("gapi.iframes",{callback:()=>{e(gapi.iframes.getContext())},ontimeout:()=>{qf(),n(gt(t,"network-request-failed"))},timeout:HP.get()})}if(At().gapi?.iframes?.Iframe)e(gapi.iframes.getContext());else if(At().gapi?.load)i();else{const s=KN("iframefcb");return At()[s]=()=>{gapi.load?i():n(gt(t,"network-request-failed"))},zN(`${GN()}?onload=${s}`).catch(r=>n(r))}}).catch(e=>{throw to=null,e})}let to=null;function jP(t){return to=to||VP(t),to}/**
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
 */const WP=new Rr(5e3,15e3),qP="__/auth/iframe",zP="emulator/auth/iframe",GP={style:{position:"absolute",top:"-100px",width:"1px",height:"1px"},"aria-hidden":"true",tabindex:"-1"},KP=new Map([["identitytoolkit.googleapis.com","p"],["staging-identitytoolkit.sandbox.googleapis.com","s"],["test-identitytoolkit.sandbox.googleapis.com","t"]]);function YP(t){const e=t.config;k(e.authDomain,t,"auth-domain-config-required");const n=e.emulator?ju(e,zP):`https://${t.config.authDomain}/${qP}`,i={apiKey:e.apiKey,appName:t.name,v:ss},s=KP.get(t.config.apiHost);s&&(i.eid=s);const r=t._getFrameworks();return r.length&&(i.fw=r.join(",")),`${n}?${is(i).slice(1)}`}async function JP(t){const e=await jP(t),n=At().gapi;return k(n,t,"internal-error"),e.open({where:document.body,url:YP(t),messageHandlersFilter:n.iframes.CROSS_ORIGIN_IFRAMES_FILTER,attributes:GP,dontclear:!0},i=>new Promise(async(s,r)=>{await i.restyle({setHideOnLeave:!1});const o=gt(t,"network-request-failed"),a=At().setTimeout(()=>{r(o)},WP.get());function c(){At().clearTimeout(a),s(i)}i.ping(c).then(c,()=>{r(o)})}))}/**
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
 */const XP={location:"yes",resizable:"yes",statusbar:"yes",toolbar:"no"},QP=500,ZP=600,e0="_blank",t0="http://localhost";class zf{constructor(e){this.window=e,this.associatedEvent=null}close(){if(this.window)try{this.window.close()}catch{}}}function n0(t,e,n,i=QP,s=ZP){const r=Math.max((window.screen.availHeight-s)/2,0).toString(),o=Math.max((window.screen.availWidth-i)/2,0).toString();let a="";const c={...XP,width:i.toString(),height:s.toString(),top:r,left:o},l=He().toLowerCase();n&&(a=F_(l)?e0:n),M_(l)&&(e=e||t0,c.scrollbars="yes");const u=Object.entries(c).reduce((h,[f,p])=>`${h}${f}=${p},`,"");if(UN(l)&&a!=="_self")return i0(e||"",a),new zf(null);const d=window.open(e||"",a,u);k(d,t,"popup-blocked");try{d.focus()}catch{}return new zf(d)}function i0(t,e){const n=document.createElement("a");n.href=t,n.target=e;const i=document.createEvent("MouseEvent");i.initMouseEvent("click",!0,!0,window,1,0,0,0,0,!1,!1,!1,!1,1,null),n.dispatchEvent(i)}/**
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
 */const s0="__/auth/handler",r0="emulator/auth/handler",o0=encodeURIComponent("fac");async function Gf(t,e,n,i,s,r){k(t.config.authDomain,t,"auth-domain-config-required"),k(t.config.apiKey,t,"invalid-api-key");const o={apiKey:t.config.apiKey,appName:t.name,authType:n,redirectUrl:i,v:ss,eventId:s};if(e instanceof Ku){e.setDefaultLanguage(t.languageCode),o.providerId=e.providerId||"",fo(e.getCustomParameters())||(o.customParameters=JSON.stringify(e.getCustomParameters()));for(const[u,d]of Object.entries({}))o[u]=d}if(e instanceof Ar){const u=e.getScopes().filter(d=>d!=="");u.length>0&&(o.scopes=u.join(","))}t.tenantId&&(o.tid=t.tenantId);const a=o;for(const u of Object.keys(a))a[u]===void 0&&delete a[u];const c=await t._getAppCheckToken(),l=c?`#${o0}=${encodeURIComponent(c)}`:"";return`${a0(t)}?${is(a).slice(1)}${l}`}function a0({config:t}){return t.emulator?ju(t,r0):`https://${t.authDomain}/${s0}`}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const gc="webStorageSupport";class c0{constructor(){this.eventManagers={},this.iframes={},this.originValidationPromises={},this._redirectPersistence=Z_,this._completeRedirectFn=ay,this._overrideRedirectResult=AP}async _openPopup(e,n,i,s){Yt(this.eventManagers[e._key()]?.manager,"_initialize() not called before _openPopup()");const r=await Gf(e,n,i,pl(),s);return n0(e,r,Yu())}async _openRedirect(e,n,i,s){await this._originValidation(e);const r=await Gf(e,n,i,pl(),s);return hP(r),new Promise(()=>{})}_initialize(e){const n=e._key();if(this.eventManagers[n]){const{manager:s,promise:r}=this.eventManagers[n];return s?Promise.resolve(s):(Yt(r,"If manager is not set, promise should be"),r)}const i=this.initAndGetManager(e);return this.eventManagers[n]={promise:i},i.catch(()=>{delete this.eventManagers[n]}),i}async initAndGetManager(e){const n=await JP(e),i=new DP(e);return n.register("authEvent",s=>(k(s?.authEvent,e,"invalid-auth-event"),{status:i.onEvent(s.authEvent)?"ACK":"ERROR"}),gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER),this.eventManagers[e._key()]={manager:i},this.iframes[e._key()]=n,i}_isIframeWebStorageSupported(e,n){this.iframes[e._key()].send(gc,{type:gc},s=>{const r=s?.[0]?.[gc];r!==void 0&&n(!!r),Pt(e,"internal-error")},gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER)}_originValidation(e){const n=e._key();return this.originValidationPromises[n]||(this.originValidationPromises[n]=$P(e)),this.originValidationPromises[n]}get _shouldInitProactively(){return V_()||x_()||zu()}}const l0=c0;var Kf="@firebase/auth",Yf="1.12.0";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class u0{constructor(e){this.auth=e,this.internalListeners=new Map}getUid(){return this.assertAuthConfigured(),this.auth.currentUser?.uid||null}async getToken(e){return this.assertAuthConfigured(),await this.auth._initializationPromise,this.auth.currentUser?{accessToken:await this.auth.currentUser.getIdToken(e)}:null}addAuthTokenListener(e){if(this.assertAuthConfigured(),this.internalListeners.has(e))return;const n=this.auth.onIdTokenChanged(i=>{e(i?.stsTokenManager.accessToken||null)});this.internalListeners.set(e,n),this.updateProactiveRefresh()}removeAuthTokenListener(e){this.assertAuthConfigured();const n=this.internalListeners.get(e);n&&(this.internalListeners.delete(e),n(),this.updateProactiveRefresh())}assertAuthConfigured(){k(this.auth._initializationPromise,"dependent-sdk-initialized-before-auth")}updateProactiveRefresh(){this.internalListeners.size>0?this.auth._startProactiveRefresh():this.auth._stopProactiveRefresh()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function d0(t){switch(t){case"Node":return"node";case"ReactNative":return"rn";case"Worker":return"webworker";case"Cordova":return"cordova";case"WebExtension":return"web-extension";default:return}}function h0(t){st(new Je("auth",(e,{options:n})=>{const i=e.getProvider("app").getImmediate(),s=e.getProvider("heartbeat"),r=e.getProvider("app-check-internal"),{apiKey:o,authDomain:a}=i.options;k(o&&!o.includes(":"),"invalid-api-key",{appName:i.name});const c={apiKey:o,authDomain:a,clientPlatform:t,apiHost:"identitytoolkit.googleapis.com",tokenApiHost:"securetoken.googleapis.com",apiScheme:"https",sdkClientVersion:j_(t)},l=new WN(i,s,r,c);return JN(l,n),l},"PUBLIC").setInstantiationMode("EXPLICIT").setInstanceCreatedCallback((e,n,i)=>{e.getProvider("auth-internal").initialize()})),st(new Je("auth-internal",e=>{const n=us(e.getProvider("auth").getImmediate());return(i=>new u0(i))(n)},"PRIVATE").setInstantiationMode("EXPLICIT")),Ke(Kf,Yf,d0(t)),Ke(Kf,Yf,"esm2020")}/**
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
 */const f0=300,p0=Lg("authIdTokenMaxAge")||f0;let Jf=null;const g0=t=>async e=>{const n=e&&await e.getIdTokenResult(),i=n&&(new Date().getTime()-Date.parse(n.issuedAtTime))/1e3;if(i&&i>p0)return;const s=n?.token;Jf!==s&&(Jf=s,await fetch(t,{method:s?"POST":"DELETE",headers:s?{Authorization:`Bearer ${s}`}:{}}))};function m0(t=ra()){const e=Dn(t,"auth");if(e.isInitialized())return e.getImmediate();const n=YN(t,{popupRedirectResolver:l0,persistence:[sy,X_,Z_]}),i=Lg("authTokenSyncURL");if(i&&typeof isSecureContext=="boolean"&&isSecureContext){const r=new URL(i,location.origin);if(location.origin===r.origin){const o=g0(r.toString());rP(n,o,()=>o(n.currentUser)),sP(n,a=>o(a))}}const s=Ng("auth");return s&&XN(n,`http://${s}`),n}function _0(){return document.getElementsByTagName("head")?.[0]??document}qN({loadJS(t){return new Promise((e,n)=>{const i=document.createElement("script");i.setAttribute("src",t),i.onload=e,i.onerror=s=>{const r=gt("internal-error");r.customData=s,n(r)},i.type="text/javascript",i.charset="UTF-8",_0().appendChild(i)})},gapiScript:"https://apis.google.com/js/api.js",recaptchaV2Script:"https://www.google.com/recaptcha/api.js",recaptchaEnterpriseScript:"https://www.google.com/recaptcha/enterprise.js?render="});h0("Browser");const y0=()=>!1,w0=t=>{try{t&&localStorage.setItem("debug:console","1")}catch{}},q=(...t)=>{},v0=(...t)=>{localStorage.getItem("debug:console")},b0="765724787439-21p8n3e2tsfq2qk4oriq7ipp7m4o50ad.apps.googleusercontent.com",Ds=new Set;function E0(){const t=console.error;console.error=(...e)=>{const n=e.join(" ");n.includes("FedCM")&&n.includes("AbortError")&&n.includes("signal is aborted without reason")||e.length===1&&typeof e[0]=="string"&&e[0].trim()==="The request has been aborted."||t.apply(console,e)}}function C0(t){return q("[ONE TAP] Callback registered, total callbacks:",Ds.size+1),Ds.add(t),()=>Ds.delete(t)}function bi(t){q("[ONE TAP] Notifying status:",t,"to",Ds.size,"callbacks"),Ds.forEach(e=>{try{e(t)}catch{}})}function Hn(){if(Hn.retryCount||(Hn.retryCount=0),typeof google>"u"||!google.accounts?.id){if(Hn.retryCount++,Hn.retryCount>50)return;setTimeout(()=>Hn(),100);return}Hn.retryCount=0,E0(),google.accounts.id.initialize({client_id:b0,callback:T0,auto_select:!1,cancel_on_tap_outside:!1,context:"signin",use_fedcm_for_prompt:!0,itp_support:!0})}function Xu(){if(Zu()){bi("not_needed");return}window.google?.accounts?.id&&(bi("prompting"),window.google.accounts.id.prompt(t=>{const e=t.getMomentType();e==="skipped"?bi("skipped"):e==="dismissed"?bi("dismissed"):e==="display"&&bi("displayed")}))}async function T0(t){try{q("[ONE TAP] Received credential, signing in with Firebase..."),bi("signing_in");const e=kt.credential(t.credential),n=await iP(Ue,e);q("[ONE TAP] ✅ Successfully signed in:",n.user.email),ir(!1)}catch(e){const n=e?.code||"unknown",i=e?.message||String(e);alert(n==="auth/account-exists-with-different-credential"?"An account already exists with the same email but different sign-in credentials.":`One Tap sign-in failed: ${i}`)}}function S0(){typeof google<"u"&&google.accounts?.id&&google.accounts.id.cancel()}let yl=!1;async function I0(){const t=D();if(!t||yl)return;const e=b(E,`users/${t}/presence`);try{await ee(e,{state:"online",lastChanged:Gn()}),await r_(e).set({state:"offline",lastSeen:Gn(),lastChanged:Gn()}),yl=!0,console.log("Presence initialized for user:",t)}catch(n){console.error("Failed to initialize presence:",n)}}async function ly(){const t=D();if(!t)return;const e=b(E,`users/${t}/presence`);try{await ee(e,{state:"offline",lastSeen:Gn(),lastChanged:Gn()}),yl=!1}catch(n){console.error("Failed to set offline:",n)}}function Ia(t){if(!t||typeof t!="string")throw new Error("Invalid email: must be a non-empty string");const e=t.toLowerCase().trim();let n="";for(const s of new TextEncoder().encode(e))n+=String.fromCharCode(s);return btoa(n).replace(/\//g,"-")}async function uy(t){if(!t||!t.uid||!t.email)throw new Error("Invalid user: must have uid and email");const e=Ia(t.email),n=b(E,`usersByEmail/${e}`),i={uid:t.uid,displayName:t.displayName||"Anonymous",photoURL:t.photoURL||null,registeredAt:Date.now()};try{await ee(n,i),console.log("[USER DISCOVERY] Registered user in directory:",t.email)}catch(s){throw console.error("[USER DISCOVERY] Failed to register user:",s),s}}async function dy(t){if(!t||typeof t!="string")return null;try{const e=Ia(t),n=b(E,`usersByEmail/${e}`),i=await Le(n);return i.exists()?i.val():null}catch(e){return console.error("[USER DISCOVERY] Failed to find user by email:",e),null}}async function hy(t){if(!Array.isArray(t))throw new Error("Invalid emails: must be an array");const e={},n=t.map(async i=>{const s=await dy(i);e[i]=s});return await Promise.all(n),e}async function k0(t){if(!t||typeof t!="string")throw new Error("Invalid email: must be a non-empty string");try{const e=Ia(t),n=b(E,`usersByEmail/${e}`),{remove:i}=await ue(async()=>{const{remove:s}=await Promise.resolve().then(()=>d_);return{remove:s}},void 0);await i(n),console.log("[USER DISCOVERY] Removed user from directory:",t)}catch(e){throw console.error("[USER DISCOVERY] Failed to remove user from directory:",e),e}}const R0=Object.freeze(Object.defineProperty({__proto__:null,findUserByEmail:dy,findUsersByEmails:hy,hashEmail:Ia,registerUserInDirectory:uy,removeUserFromDirectory:k0},Symbol.toStringTag,{value:"Module"}));async function A0(t){if(!t?.uid)return;const e=b(E,`users/${t.uid}/profile`);try{await ee(e,{displayName:t.displayName||null,photoURL:t.photoURL||null})}catch(n){console.error("Failed to save user profile:",n)}}async function fy(t){if(!t)return null;try{const e=await Le(b(E,`users/${t}/profile`));return e.exists()?e.val():null}catch(e){return console.error("Failed to fetch user profile:",e),null}}const Ue=m0(Ea);async function N0(){const t=Ue.currentUser;return t?t.getIdToken(!1):null}const P0=typeof import.meta<"u"&&!0;function Qu(t,e,n={}){const i=typeof window<"u"?window.location.origin:"n/a";P0?console.error(`[AUTH] ${t}:`,{code:e?.code||"unknown",message:e?.message||String(e),origin:i,...n}):console.error(`[AUTH] ${t}:`,e,n,{origin:i})}const py=(async()=>{try{await pc(Ue,sy)}catch{try{await pc(Ue,X_)}catch{await pc(Ue,ml)}}try{(await LP(Ue))?.user&&q("[AUTH] ✅ Sign-in completed (via Safari fallback)")}catch(t){q("[AUTH] No redirect result:",t.code)}setTimeout(()=>{Hn(),Xu()},500)})();let gy=!1;function ir(t){gy=t}function L0(){try{const t=document.createElement("a");t.href=window.location.href,t.target="_blank",t.rel="noopener noreferrer external",document.body.appendChild(t),t.click(),document.body.removeChild(t)}catch{}}function my(){const t=typeof window<"u"&&window.matchMedia?.("(display-mode: standalone)").matches,e=typeof navigator<"u"&&navigator.standalone===!0,n=t||e,i=/iphone|ipad|ipod/i.test(navigator.userAgent||"");return{isStandalonePWA:n,isIOS:i,isIOSStandalone:n&&i}}function O0(t){const e=t?.code||"unknown",n=t?.message||String(t);if(e==="auth/popup-closed-by-user"||e==="auth/cancelled-popup-request"){console.log("Sign-in cancelled by user");return}const{isIOSStandalone:i}=my();if((e==="auth/network-request-failed"||e==="auth/popup-blocked")&&i){console.warn(`[AUTH] ${e} inside iOS standalone PWA. Arming Safari fallback.`),ir(!0),alert(`Sign-in is blocked in the installed app on iOS.

Tap the Login button again to open in Safari and complete sign-in.`);return}if(e==="auth/popup-blocked"){alert("Pop-up blocked. Please enable pop-ups for this site in your browser settings, or try signing in from a desktop browser.");return}const s=t?.customData?.email;if(Qu("Google sign-in",t,{email:s?"<redacted>":void 0}),e==="auth/unauthorized-domain"){const r=typeof window<"u"?window.location.origin:"",o=["This app's host is not whitelisted in Firebase Authentication.","Fix: In Firebase Console, go to Build → Authentication → Settings → Authorized domains and add this origin:",r?`• ${r}`:"• <your dev origin>","","Common dev hosts to add:","• http://localhost (covers any port)","• http://127.0.0.1","• http://[::1] (IPv6 localhost)","• Your LAN IP, e.g. http://192.168.x.y","","Tip: avoid opening index.html directly from the filesystem (file://). Use a dev server instead."];r&&typeof navigator<"u"&&navigator.clipboard?.writeText&&navigator.clipboard.writeText(r).catch(()=>{}),alert(`Sign-in failed: Unauthorized domain.

${o.join(`
`)}`);return}alert(`Sign-in failed: ${n}`)}let vs=null;const D0=()=>Math.random().toString(36).substring(2,15),wl="guestUser",M0=2880*60*1e3;function x0(){try{const t=typeof localStorage<"u"?localStorage.getItem(wl):null;if(!t)return null;const e=JSON.parse(t);if(!e||typeof e!="object"||!e.id)return null;if(e.expiresAt&&Date.now()>e.expiresAt){try{localStorage.removeItem(wl)}catch{}return null}return e}catch{return null}}function F0(t,e=M0){const n=Date.now(),i={id:t,createdAt:n,expiresAt:n+e};try{typeof localStorage<"u"&&localStorage.setItem(wl,JSON.stringify(i))}catch{}return i}function fe(){const t=D();if(t)return t;if(!vs){const e=x0();e&&e.id?vs=e.id:(vs=D0(),F0(vs))}return vs}function An(){return Ue.currentUser}function Zu(){return Ue.currentUser!==null}function D(){return Ue.currentUser?.uid??null}function _y(){return new Promise(t=>{const e=K_(Ue,n=>{e(),t(n)})})}function ed(t,{truncate:e=7}={}){return K_(Ue,n=>{const i=!!n,s=n?.displayName||"Guest User",r=typeof s=="string"&&s.length>e?s.slice(0,e)+"...":s;i?(I0().catch(o=>{console.warn("Failed to initialize presence:",o)}),A0(n).catch(o=>{console.warn("Failed to save user profile:",o)}),uy(n).catch(o=>{console.warn("Failed to register user in directory:",o)})):ka();try{t({user:n,isLoggedIn:i,userName:r})}catch{}})}const xo=async()=>{const t=new kt;t.setCustomParameters({prompt:"select_account"});const{isIOSStandalone:e}=my();try{if(e&&gy){q("[AUTH] Using Safari external fallback"),ir(!1),L0();return}q("[AUTH] Starting popup sign-in flow...");const n=await SP(Ue,t);return q("[AUTH] Popup sign-in successful:",n.user.email),ir(!1),n}catch(n){O0(n)}};async function yy(){try{await ly(),ka(),await oP(Ue),console.info("User signed out"),setTimeout(()=>Xu(),1500)}catch(t){throw Qu("Sign out",t),t}}async function wy(){const t=Ue.currentUser;if(!t)throw new Error("No user logged in");const e=t.uid;try{console.info("[AUTH] Starting account deletion for user:",e),await ly(),ka();const{ref:n,remove:i}=await ue(async()=>{const{ref:r,remove:o}=await Promise.resolve().then(()=>d_);return{ref:r,remove:o}},void 0),{rtdb:s}=await ue(async()=>{const{rtdb:r}=await Promise.resolve().then(()=>yN);return{rtdb:r}},void 0);console.info("[AUTH] Cleaning up user data from RTDB...");try{await i(n(s,`users/${e}`))}catch(r){console.warn("[AUTH] Failed to remove user node from RTDB:",r)}try{const{FCMTransport:r}=await ue(async()=>{const{FCMTransport:a}=await Promise.resolve().then(()=>KD);return{FCMTransport:a}},void 0);await new r().deleteToken()}catch(r){console.warn("[AUTH] Failed to delete FCM token:",r)}if(t.email)try{const{removeUserFromDirectory:r}=await ue(async()=>{const{removeUserFromDirectory:o}=await Promise.resolve().then(()=>R0);return{removeUserFromDirectory:o}},void 0);await r(t.email)}catch(r){console.warn("[AUTH] Failed to remove user from discovery directory:",r)}console.info("[AUTH] Deleting Firebase Auth account..."),await aP(t),console.info("[AUTH] Account deleted successfully"),setTimeout(()=>Xu(),1500)}catch(n){throw Qu("Delete account",n),n.code==="auth/requires-recent-login"?new Error("For security, please sign out and sign in again before deleting your account."):n}}const Xf="765724787439-21p8n3e2tsfq2qk4oriq7ipp7m4o50ad.apps.googleusercontent.com",U0=6e4,sr={};function $0(t){const e=sr[t];return e&&Date.now()<e.expiresAt?e.token:(delete sr[t],null)}function B0(t,e,n){const i=n>0?n:3600;sr[t]={token:e,expiresAt:Date.now()+i*1e3-U0}}function ka(){for(const t in sr)delete sr[t]}function vy(t,e,{interactive:n=!1}={}){const i=$0(t);return i?(console.log(`[AUTH] Using cached ${t} token`),Promise.resolve(i)):new Promise((s,r)=>{if(typeof google>"u"||!google.accounts?.oauth2){r(new Error("Google Identity Services not loaded"));return}const a=An()?.email||void 0;function c(d,h){if(d.error){if(h){console.log(`[AUTH] Silent ${t} token failed (${d.error}), trying interactive...`),h();return}console.error(`[AUTH] ${t} token request error:`,d.error),d.error==="access_denied"?r(new Error("Authorization cancelled")):r(new Error(d.error_description||d.error));return}if(!d.access_token){r(new Error("No access token received"));return}console.log(`[AUTH] ${t} access granted`),B0(t,d.access_token,d.expires_in||3600),s(d.access_token)}function l(){console.log(`[AUTH] Requesting ${t} access via interactive popup...`),google.accounts.oauth2.initTokenClient({client_id:Xf,scope:e,hint:a,callback:h=>c(h,null),error_callback:h=>{console.error(`[AUTH] ${t} interactive error:`,h),h.type==="popup_closed"?r(new Error("Authorization cancelled")):r(new Error(h.message||"Authorization failed"))}}).requestAccessToken()}if(n){l();return}console.log(`[AUTH] Attempting silent ${t} token acquisition...`),google.accounts.oauth2.initTokenClient({client_id:Xf,scope:e,hint:a,callback:d=>c(d,l),error_callback:()=>{console.log(`[AUTH] Silent ${t} error_callback, trying interactive...`),l()}}).requestAccessToken({prompt:"none"})})}function by(){return vy("contacts","https://www.googleapis.com/auth/contacts.readonly https://www.googleapis.com/auth/contacts.other.readonly")}function Ey(){return vy("gmail-send","https://www.googleapis.com/auth/gmail.send",{interactive:!0})}const td=Object.freeze(Object.defineProperty({__proto__:null,auth:Ue,authReady:py,clearGISTokenCache:ka,deleteAccount:wy,getCurrentUser:An,getCurrentUserAsync:_y,getLoggedInUserId:D,getLoggedInUserToken:N0,getUserId:fe,isLoggedIn:Zu,onAuthChange:ed,requestContactsAccess:by,requestGmailSendAccess:Ey,setSafariExternalOpenArmed:ir,signInWithAccountSelection:xo,signOutUser:yy},Symbol.toStringTag,{value:"Module"}));function Ra(t="room"){const e=new URL(window.location);e.searchParams.delete(t),window.history.replaceState({},"",e)}class H0{async send(e,n){throw new Error("MessagingTransport.send() must be implemented by subclass")}listen(e,n){throw new Error("MessagingTransport.listen() must be implemented by subclass")}async getUnreadCount(e){throw new Error("MessagingTransport.getUnreadCount() must be implemented by subclass")}async markAsRead(e){throw new Error("MessagingTransport.markAsRead() must be implemented by subclass")}listenToUnreadCount(e,n){throw new Error("MessagingTransport.listenToUnreadCount() must be implemented by subclass")}async addReaction(e,n,i){throw new Error("MessagingTransport.addReaction() must be implemented by subclass")}async removeReaction(e,n,i){throw new Error("MessagingTransport.removeReaction() must be implemented by subclass")}async getReactions(e,n){throw new Error("MessagingTransport.getReactions() must be implemented by subclass")}}const Qf=100;class V0 extends H0{_getConversationId(e,n){return[e,n].sort().join("_")}async send(e,n){const i=D();if(!i)throw new Error("Cannot send message: not logged in");const r=An()?.displayName||"Guest User",o=this._getConversationId(i,e),a=er(b(E,`conversations/${o}/messages`));await ee(a,{text:n,from:i,fromName:r,sentAt:Gn(),read:!1}),this._cleanupOldMessages(o).catch(c=>{console.warn("[RTDBTransport] Failed to cleanup old messages:",c)})}listen(e,n){const i=D();if(!i)return console.warn("[RTDBTransport] Cannot listen to messages: not logged in"),()=>{};const s=this._getConversationId(i,e),r=b(E,`conversations/${s}/messages`),o=new Set,a=l=>{const u=l.key,d=l.val();if(!d||o.has(u))return;o.add(u);const h=d.from===i,f={...d,messageId:u};n(d.text,f,h)},c=l=>{const u=l.key,d=l.val();if(!(!d||!o.has(u))&&d.reactions!==void 0){const h=d.from===i,f={...d,messageId:u,_reactionUpdate:!0};n(d.text,f,h)}};return Ki(r,a),cl(r,c),()=>{ut(r,"child_added",a),ut(r,"child_changed",c)}}async getUnreadCount(e){const n=D();if(!n)return 0;const i=this._getConversationId(n,e),s=b(E,`conversations/${i}/messages`);try{const r=await Le(s);if(!r.exists())return 0;const o=r.val();return Object.values(o).filter(a=>!a.read&&a.from===e).length}catch(r){return console.warn("[RTDBTransport] Failed to get unread count:",r),0}}async markAsRead(e){const n=D();if(!n)return;const i=this._getConversationId(n,e),s=b(E,`conversations/${i}/messages`);try{const r=await Le(s);if(!r.exists())return;const o=r.val(),a={};Object.entries(o).forEach(([c,l])=>{!l.read&&l.from===e&&(a[`conversations/${i}/messages/${c}/read`]=!0)}),Object.keys(a).length>0&&await vn(b(E),a)}catch(r){console.warn("[RTDBTransport] Failed to mark messages as read:",r)}}listenToUnreadCount(e,n){const i=D();if(!i)return console.warn("[RTDBTransport] Cannot listen to unread count: not logged in"),()=>{};const s=this._getConversationId(i,e),r=b(E,`conversations/${s}/messages`),o=async()=>{try{const l=await this.getUnreadCount(e);n(l)}catch(l){console.warn("[RTDBTransport] Failed to get unread count:",l)}},a=async l=>{const u=l.val();u&&u.from===e&&!u.read&&await o()},c=async l=>{const u=l.val();u&&u.from===e&&await o()};return Ki(r,a),cl(r,c),()=>{ut(r,"child_added",a),ut(r,"child_changed",c)}}async _cleanupOldMessages(e){const n=b(E,`conversations/${e}/messages`),i=await Le(n);if(!i.exists())return;const s=i.val(),r=Object.keys(s).length;if(r<=Qf)return;const o=r-Qf,a=Object.entries(s).sort((l,u)=>(l[1].sentAt||0)-(u[1].sentAt||0)),c={};for(let l=0;l<o;l++){const[u]=a[l];c[`conversations/${e}/messages/${u}`]=null}await vn(b(E),c),console.log(`[RTDBTransport] Cleaned up ${o} old messages from conversation ${e}`)}async addReaction(e,n,i){const s=D();if(!s)throw new Error("Cannot add reaction: not logged in");const o=`conversations/${this._getConversationId(s,e)}/messages/${n}/reactions/${i}/${s}`;await ee(b(E,o),!0)}async removeReaction(e,n,i){const s=D();if(!s)throw new Error("Cannot remove reaction: not logged in");const o=`conversations/${this._getConversationId(s,e)}/messages/${n}/reactions/${i}/${s}`;await ee(b(E,o),null)}async getReactions(e,n){const i=D();if(!i)return{};const s=this._getConversationId(i,e),r=b(E,`conversations/${s}/messages/${n}/reactions`);try{const o=await Le(r);if(!o.exists())return{};const a=o.val(),c={};for(const[l,u]of Object.entries(a))c[l]=Object.keys(u);return c}catch(o){return console.warn("[RTDBTransport] Failed to get reactions:",o),{}}}async hasMyReaction(e,n,i){const s=D();if(!s)return!1;const o=`conversations/${this._getConversationId(s,e)}/messages/${n}/reactions/${i}/${s}`;try{return(await Le(b(E,o))).exists()}catch{return!1}}}class j0{constructor(e,n=null){if(!e)throw new Error("MessagingController requires a transport implementation");this.transport=e,this.fileTransport=n,this.sessions=new Map}openSession(e,{onMessage:n,onUnreadChange:i}={}){if(!e||typeof e!="string")throw new Error("contactId must be a non-empty string");if(this.sessions.has(e))return console.info(`[MessagingController] Session already open for ${e}`),this.sessions.get(e);const s=this.transport.listen(e,(o,a,c)=>{n&&typeof n=="function"&&n(o,a,c),!c&&i&&typeof i=="function"&&this.transport.getUnreadCount(e).then(l=>i(l)).catch(l=>console.warn("[MessagingController] Failed to get unread count:",l))}),r={contactId:e,send:o=>!o||typeof o!="string"?Promise.reject(new Error("Message text must be a non-empty string")):this.transport.send(e,o),markAsRead:()=>this.transport.markAsRead(e),getUnreadCount:()=>this.transport.getUnreadCount(e),close:()=>{this.closeSession(e)},addReaction:(o,a)=>this.transport.addReaction(e,o,a),removeReaction:(o,a)=>this.transport.removeReaction(e,o,a),hasMyReaction:(o,a)=>this.transport.hasMyReaction(e,o,a),getReactions:o=>this.transport.getReactions(e,o),_unsubscribe:s};return this.sessions.set(e,r),r}closeSession(e){const n=this.sessions.get(e);n&&(n._unsubscribe&&typeof n._unsubscribe=="function"&&n._unsubscribe(),this.sessions.delete(e))}getSession(e){return this.sessions.get(e)}getAllSessions(){return Array.from(this.sessions.values())}closeAllSessions(){this.sessions.forEach(e=>{e._unsubscribe&&typeof e._unsubscribe=="function"&&e._unsubscribe()}),this.sessions.clear()}async getUnreadCount(e){if(!e||typeof e!="string")throw new Error("contactId must be a non-empty string");return this.transport.getUnreadCount(e)}listenToUnreadCount(e,n){if(!e||typeof e!="string")throw new Error("contactId must be a non-empty string");if(typeof n!="function")throw new Error("onCountChange must be a function");return this.transport.listenToUnreadCount(e,n)}setFileTransport(e){this.fileTransport=e}canSendFiles(){return this.fileTransport!==null&&this.fileTransport.isReady()}async sendFile(e,n){if(!this.fileTransport)throw new Error("File transport not available. Files can only be sent during active calls.");if(!this.fileTransport.isReady())throw new Error("File transport not ready");return this.fileTransport.sendFile(e,n)}onFileReceived(e){if(!this.fileTransport)throw new Error("File transport not available");if(typeof e!="function")throw new Error("onFileReceived callback must be a function");this.fileTransport.onFileReceived(e)}clearFileTransport(){this.fileTransport&&(this.fileTransport.cleanup(),this.fileTransport=null)}}const bn=new j0(new V0);function rr(t,e){if(!t||!e)throw new Error("Both user IDs are required");if(t===e)throw new Error("Cannot create room ID for same user");const[n,i]=[t,e].sort(),s=`${n}_${i}`;let r=0;for(let u=0;u<s.length;u++){const d=s.charCodeAt(u);r=(r<<5)-r+d,r=r&r}let o=5381;for(let u=0;u<s.length;u++)o=(o<<5)+o+s.charCodeAt(u);const a=Math.abs(r).toString(36),c=Math.abs(o).toString(36);return(a+c).slice(0,16).padEnd(16,"0")}class W0{constructor(e,{loop:n=!1,volume:i=.5}={}){this.src=e,this.audio=new Audio(e),this.audio.loop=n,this.audio.volume=Math.max(0,Math.min(1,i)),this.isPlaying=!1,this.audio.onerror=s=>{console.error(`[AudioPlayer] Failed to load audio: ${e}`,s),this.isPlaying=!1},this.audio.onplay=()=>{this.isPlaying=!0},this.audio.onpause=()=>{this.isPlaying=!1},this.audio.onended=()=>{this.isPlaying=!1}}async play(){if(!this.audio)return!1;if(this.isPlaying)return!0;try{return await this.audio.play(),this.isPlaying=!0,!0}catch(e){return e.name==="NotAllowedError"?console.warn("[AudioPlayer] Autoplay blocked - user interaction required first",{src:this.src}):e.name==="NotSupportedError"?console.error("[AudioPlayer] Audio format not supported",{src:this.src}):console.error("[AudioPlayer] Playback error:",e),this.isPlaying=!1,!1}}stop(){this.audio&&(this.audio.pause(),this.audio.currentTime=0,this.isPlaying=!1)}pause(){this.audio&&(this.audio.pause(),this.isPlaying=!1)}setVolume(e){this.audio&&(this.audio.volume=Math.max(0,Math.min(1,e)))}getVolume(){return this.audio?.volume??0}dispose(){this.stop(),this.audio&&(this.audio.onerror=null,this.audio.onplay=null,this.audio.onpause=null,this.audio.onended=null,this.audio.src="",this.audio=null),this.isPlaying=!1}}class q0{constructor({incomingSrc:e,outgoingSrc:n,volume:i}={}){const s="/HangVidU/";this.incomingSrc=e??`${s}sounds/incoming.mp3`,this.outgoingSrc=n??`${s}sounds/outgoing.mp3`,this.defaultVolume=i??.7,this.currentPlayer=null,this.currentType=null}configure({incomingSrc:e,outgoingSrc:n,volume:i}={}){e!==void 0&&(this.incomingSrc=e),n!==void 0&&(this.outgoingSrc=n),i!==void 0&&(this.defaultVolume=i)}setIncomingRingtone(e){this.incomingSrc=e}setOutgoingRingtone(e){this.outgoingSrc=e}setVolume(e){this.defaultVolume=Math.max(0,Math.min(1,e))}async playIncoming(){return this._play("incoming",this.incomingSrc)}async playOutgoing(){return this._play("outgoing",this.outgoingSrc)}async _play(e,n){this.stop();try{this.currentPlayer=new W0(n,{loop:!0,volume:this.defaultVolume}),this.currentType=e;const i=await this.currentPlayer.play();return i?console.log(`[Ringtone] Playing ${e} ringtone`):(console.warn(`[Ringtone] Failed to start ${e} ringtone (likely autoplay blocked)`),this.currentPlayer?.dispose(),this.currentPlayer=null,this.currentType=null),i}catch(i){return console.error(`[Ringtone] Error playing ${e} ringtone:`,i),this.currentPlayer?.dispose(),this.currentPlayer=null,this.currentType=null,!1}}stop(){this.currentPlayer&&(console.log(`[Ringtone] Stopping ${this.currentType} ringtone`),this.currentPlayer.stop(),this.currentPlayer.dispose(),this.currentPlayer=null,this.currentType=null)}isPlaying(){return this.currentPlayer?.isPlaying??!1}getCurrentType(){return this.currentType}}const Yn=new q0,or=new WeakMap;function nd(t,e,n){if(!t||!n)throw new Error("setupIceCandidates: pc and roomId are required");if(or.has(t)||or.set(t,[]),e==="initiator")Zf(t,"offerCandidates",n),ep(t,"answerCandidates",n);else if(e==="joiner")Zf(t,"answerCandidates",n),ep(t,"offerCandidates",n);else throw new Error(`Invalid role: ${e} specified for ICE candidate setup.`)}function Zf(t,e,n){t.onicecandidate=i=>{if(i.candidate){const s=er(e==="offerCandidates"?$u(n):Bu(n));ee(s,i.candidate.toJSON())}}}function ep(t,e,n){const i=e==="offerCandidates"?$u(n):Bu(n);let s=!1;const r=()=>{if(s)return;s=!0;const a=()=>{t.remoteDescription&&(id(t),t.removeEventListener("signalingstatechange",a))};t.addEventListener("signalingstatechange",a)};on(i,"child_added",a=>{const c=a.val();if(!(!t||t.signalingState==="closed")&&c)if(t.remoteDescription)try{t.addIceCandidate(new RTCIceCandidate(c))}catch{}else{const l=or.get(t);l&&(l.push(c),l.length===1&&r())}},n)}function id(t){if(!t||!or.has(t))return;const e=or.get(t);if(e.length!==0){q(`🔄 Draining ${e.length} queued ICE candidate(s)`);for(const n of e)try{t.addIceCandidate(new RTCIceCandidate(n)).catch(i=>{q("Error adding queued ICE candidate:",i)})}catch{}e.length=0}}const z0=Object.freeze(Object.defineProperty({__proto__:null,drainIceCandidateQueue:id,setupIceCandidates:nd},Symbol.toStringTag,{value:"Module"}));class Ni{constructor(){this.logs=[],this.isEnabled=!0,this.maxLogs=1e3,this.sessionId=this.generateSessionId()}log(e,n,i={}){if(!this.isEnabled)return;const s={timestamp:performance.now(),sessionId:this.sessionId,category:e,event:n,data:{...i},id:this.generateLogId()};this.logs.push(s),this.logs.length>this.maxLogs&&(this.logs=this.logs.slice(-this.maxLogs)),typeof window<"u"&&window.location?.hostname==="localhost"&&console.log(`[DIAG] ${e}:${n}`,i)}logListenerAttachment(e,n,i,s={}){this.log("LISTENER","ATTACHED",{roomId:e,listenerType:n,currentCount:i,...s})}logListenerCleanup(e,n,i={}){this.log("LISTENER","CLEANUP",{removedCount:e.length,preservedCount:n.length,removedRoomIds:e,preservedRoomIds:n,...i})}logDuplicateListener(e,n,i={}){this.log("LISTENER","DUPLICATE_PREVENTED",{roomId:e,listenerType:n,...i})}logIncomingCallEvent(e,n,i,s={}){this.log("INCOMING_CALL","DETECTED",{callerId:e,roomId:n,isFresh:i.isFresh,validationMethod:i.method,age:i.age,reason:i.reason,...s})}logNotificationDecision(e,n,i,s={}){this.log("INCOMING_CALL","NOTIFICATION_DECISION",{decision:e,reason:n,roomId:i,...s})}logCallingUILifecycle(e,n,i={}){this.log("CALLING_UI",e,{roomId:n,...i})}logFirebaseOperation(e,n,i=null,s={}){this.log("FIREBASE","OPERATION",{operation:e,success:n,error:i?{message:i.message,code:i.code,stack:i.stack}:null,...s})}logFirebaseConnectionState(e,n={}){this.log("FIREBASE","CONNECTION_STATE",{state:e,...n})}logRoomCreation(e,n,i,s={}){this.log("ROOM","CREATED",{roomId:e,isInitiator:n,creationTime:i.creationTime,listenerAttachTime:i.listenerAttachTime,timeDiff:i.listenerAttachTime-i.creationTime,...s})}logMemberJoinEvent(e,n,i,s={}){this.log("ROOM","MEMBER_JOINED",{roomId:e,memberId:n,joinedAt:i.joinedAt,role:i.role,...s})}logContactSave(e,n,i={}){this.log("CONTACT","SAVED",{contactId:e,roomId:n,...i})}logContactCall(e,n,i,s={}){this.log("CONTACT","CALL_INITIATED",{contactId:e,roomId:n,forceInitiator:i,...s})}logFreshnessValidation(e,n,i,s={}){this.log("FRESHNESS","VALIDATION",{roomId:e,method:n,result:{isFresh:i.isFresh,age:i.age,threshold:i.threshold,reason:i.reason},...s})}logRaceCondition(e,n,i,s={}){this.log("RACE_CONDITION",e,{roomId:n,events:i,...s})}getLogs(e={}){let n=[...this.logs];return e.category&&(n=n.filter(i=>i.category===e.category)),e.event&&(n=n.filter(i=>i.event===e.event)),e.roomId&&(n=n.filter(i=>i.data.roomId===e.roomId)),e.since&&(n=n.filter(i=>i.timestamp>=e.since)),e.until&&(n=n.filter(i=>i.timestamp<=e.until)),n}getCallFlowTrace(e){return this.getLogs({roomId:e}).sort((n,i)=>n.timestamp-i.timestamp)}getListenerDiagnostics(e=null){const n=this.getLogs({category:"LISTENER"});return e?n.filter(i=>i.data.roomId===e):n}getFailureAnalysis(){const e=this.logs.filter(n=>n.category==="FIREBASE"&&n.data.success===!1||n.category==="INCOMING_CALL"&&n.data.decision==="REJECT"||n.category==="LISTENER"&&n.event==="DUPLICATE_PREVENTED");return{totalFailures:e.length,firebaseFailures:e.filter(n=>n.category==="FIREBASE").length,rejectedCalls:e.filter(n=>n.category==="INCOMING_CALL"&&n.data.decision==="REJECT").length,duplicateListeners:e.filter(n=>n.event==="DUPLICATE_PREVENTED").length,failures:e}}exportDiagnostics(){return{sessionId:this.sessionId,exportTime:Date.now(),logCount:this.logs.length,logs:[...this.logs],summary:this.getFailureAnalysis()}}exportLogsAsJSON(){return JSON.stringify(this.exportDiagnostics(),null,2)}downloadLogs(e=null){e||(e=`diagnostic-logs-${this.sessionId}-${Date.now()}.json`);const n=this.exportLogsAsJSON(),i=new Blob([n],{type:"application/json"}),s=document.createElement("a");s.href=URL.createObjectURL(i),s.download=e,s.click(),URL.revokeObjectURL(s.href)}getLogsInTimeRange(e,n){return this.logs.filter(i=>i.timestamp>=e&&i.timestamp<=n)}getLogsSince(e){return this.logs.filter(n=>n.timestamp>=e)}clearOldLogs(e=1440*60*1e3){const n=Date.now()-e;this.logs=this.logs.filter(i=>i.timestamp>=n)}clearLogs(){this.logs=[]}persistLogs(){try{const e=`diagnostic-logs-${this.sessionId}`;return localStorage.setItem(e,this.exportLogsAsJSON()),e}catch(e){return console.warn("Failed to persist logs to localStorage:",e),null}}loadPersistedLogs(e){try{const n=localStorage.getItem(e);if(n){const i=JSON.parse(n);if(i.logs&&Array.isArray(i.logs)){const s=new Set(this.logs.map(o=>o.id)),r=i.logs.filter(o=>!s.has(o.id));return this.logs=[...this.logs,...r].sort((o,a)=>o.timestamp-a.timestamp),r.length}}return 0}catch(n){return console.warn("Failed to load persisted logs:",n),0}}static getPersistedLogKeys(){const e=[];for(let n=0;n<localStorage.length;n++){const i=localStorage.key(n);i&&i.startsWith("diagnostic-logs-")&&e.push(i)}return e}static cleanupPersistedLogs(e=1440*60*1e3){const n=Date.now()-e;Ni.getPersistedLogKeys().forEach(s=>{try{const r=localStorage.getItem(s);if(r){const o=JSON.parse(r);o.exportTime&&o.exportTime<n&&localStorage.removeItem(s)}}catch{localStorage.removeItem(s)}})}enable(){this.isEnabled=!0}disable(){this.isEnabled=!1}generateSessionId(){return`session_${performance.now()}_${Math.random().toString(36).substr(2,9)}`}generateLogId(){return`log_${performance.now()}_${Math.random().toString(36).substr(2,9)}`}formatTimestamp(e){return new Date(e).toISOString()}startTiming(e){const n=`timing_${e}_${Date.now()}`;return this.log("TIMING","START",{operation:e,timingId:n}),n}endTiming(e,n={}){const i=this.logs.find(s=>s.category==="TIMING"&&s.event==="START"&&s.data.timingId===e);if(i){const s=Date.now()-i.timestamp;return this.log("TIMING","END",{timingId:e,duration:s,operation:i.data.operation,...n}),s}return null}}let mc=null;function v(){return mc||(mc=new Ni),mc}typeof window<"u"&&(window.diagnosticLogger={getInstance:()=>v(),exportLogs:()=>{const e=v().exportLogsAsJSON();return console.log("Diagnostic logs exported:"),console.log(e),e},downloadLogs:t=>{v().downloadLogs(t),console.log("Diagnostic logs downloaded")},getRoomLogs:t=>{const n=v().getCallFlowTrace(t);return console.log(`Logs for room ${t}:`,n),n},getFailures:()=>{const e=v().getFailureAnalysis();return console.log("Failure analysis:",e),e},getListenerDiagnostics:t=>{const n=v().getListenerDiagnostics(t);return console.log("Listener diagnostics:",n),n},getLogsSince:t=>{const n=v().getLogsSince(t);return console.log(`Logs since ${new Date(t).toISOString()}:`,n),n},getLogsInRange:(t,e)=>{const i=v().getLogsInTimeRange(t,e);return console.log(`Logs from ${new Date(t).toISOString()} to ${new Date(e).toISOString()}:`,i),i},persistLogs:()=>{const e=v().persistLogs();return console.log(`Logs persisted with key: ${e}`),e},loadPersistedLogs:t=>{const n=v().loadPersistedLogs(t);return console.log(`Loaded ${n} persisted logs`),n},getPersistedKeys:()=>{const t=Ni.getPersistedLogKeys();return console.log("Persisted log keys:",t),t},clearLogs:()=>{v().clearLogs(),console.log("Diagnostic logs cleared")},enable:()=>{v().enable(),console.log("Diagnostic logging enabled")},disable:()=>{v().disable(),console.log("Diagnostic logging disabled")},getSessionInfo:()=>{const t=v(),e={sessionId:t.sessionId,logCount:t.logs.length,isEnabled:t.isEnabled,maxLogs:t.maxLogs};return console.log("Session info:",e),e},help:()=>{console.log(`
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
      `)}},window.addEventListener("beforeunload",()=>{try{const t=v();t.logs.length>0&&t.persistLogs(),Ni.cleanupPersistedLogs()}catch{}}),(window.location.hostname==="localhost"||window.location.hostname==="127.0.0.1")&&setTimeout(()=>{try{const t=v(),e=typeof localStorage<"u"&&localStorage.getItem("debug:console")==="1";if(!t.isEnabled||!e)return;const n=Ni.getPersistedLogKeys();n.length>0&&(console.log(`Found ${n.length} persisted diagnostic log sessions. Use diagnosticLogger.loadPersistedLogs(key) to load them.`),console.log("Available keys:",n))}catch{}},1e3));class G0{constructor(){this.currentRoomId=null}async createNewRoom(e,n,i=null){const s=Date.now();i||(i=Math.random().toString(36).substring(2,15)),v().log("ROOM","CREATE_START",{roomId:i,userId:n,hasOffer:!!e,timestamp:s});const r=rn(i);try{return await ee(r,{offer:{type:e.type,sdp:e.sdp},createdAt:Date.now(),createdBy:n}),v().logFirebaseOperation("create_room",!0,null,{roomId:i,userId:n,duration:Date.now()-s}),await this.joinRoom(i,n),v().log("ROOM","CREATE_COMPLETE",{roomId:i,userId:n,totalDuration:Date.now()-s}),i}catch(o){throw v().logFirebaseOperation("create_room",!1,o,{roomId:i,userId:n,duration:Date.now()-s}),o}}async checkRoomStatus(e){const n=rn(e),i=await Le(n);if(!i.exists())return{exists:!1,hasMembers:!1,memberCount:0};const s=i.val(),r=s.members||{},o=Object.keys(r).length;return{exists:!0,hasMembers:o>0,memberCount:o,roomData:s}}async getRoomData(e){const n=rn(e),i=await Le(n);if(!i.exists())throw new Error("Room does not exist");return i.val()}async saveAnswer(e,n){const i=rn(e);await vn(i,{answer:n})}async joinRoom(e,n,i="Guest User"){const s=fl(e,n);await ee(s,{displayName:i,joinedAt:Date.now()}),v().logFirebaseOperation("set","joinRoom",`rooms/${e}/members/${n}`)}async leaveRoom(e,n=null,{deleteRoomIfEmpty:i=!0}={}){const s=n||this.currentRoomId;if(!s||!e)return;const r=fl(s,e),o=Ss(s),a=rn(s);try{await Xe(r)}catch(c){v().logFirebaseOperation("leave_room_remove_member",!1,c,{roomId:s,userId:e})}if(i)try{const c=await Le(o),l=c.exists()?c.val():{};(l?Object.keys(l).length:0)===0&&await Xe(a).catch(d=>{v().logFirebaseOperation("delete_empty_room",!1,d,{roomId:s})})}catch(c){v().logFirebaseOperation("check_members_after_leave",!1,c,{roomId:s})}(!n||n===this.currentRoomId)&&(this.currentRoomId=null)}async rejectCall(e,n,i="user_rejected"){if(!e||!n)return;const s=rn(e),r={rejection:{by:n,reason:i,at:Date.now()}};try{await vn(s,r),v().log("ROOM","REJECT_SET",{roomId:e,byUserId:n,reason:i})}catch(o){throw v().log("ROOM","REJECT_SET_FAILED",{roomId:e,byUserId:n,reason:i,error:String(o?.message||o)}),o}}async cancelCall(e,n,i="caller_cancelled"){if(!e||!n)return;const s=rn(e),r={cancellation:{by:n,reason:i,at:Date.now()}};try{await vn(s,r),v().log("ROOM","CANCEL_SET",{roomId:e,byUserId:n,reason:i})}catch(o){throw v().log("ROOM","CANCEL_SET_FAILED",{roomId:e,byUserId:n,reason:i,error:String(o?.message||o)}),o}}onCallCancelled(e,n){const i=I_(e);on(i,"value",n,e),v().logFirebaseOperation("on","onCallCancelled",`rooms/${e}/cancellation`,{event:"value"})}onMemberJoined(e,n){const i=Ss(e);on(i,"child_added",n,e),v().logFirebaseOperation("on","onMemberJoined",`rooms/${e}/members`,{event:"child_added"})}onMemberLeft(e,n){const i=Ss(e);on(i,"child_removed",n,e),v().logFirebaseOperation("on","onMemberLeft",`rooms/${e}/members`,{event:"child_removed"})}onIncomingCall(e,n,i){const s=Ss(e),r=a=>{i("join",a.key,a.val())},o=a=>{i("leave",a.key,a.val())};return on(s,"child_added",r,e,n),on(s,"child_removed",o,e,n),()=>S_(n,e)}get roomId(){return this.currentRoomId}}const ce=new G0,Jt={view:"lobby",currentMedia:"none",setView(t){t!==this.view&&(this.view=t,document.body.dataset.view=t)},setMainContent(t){t!==this.currentMedia&&(this.currentMedia=t,document.body.dataset.mainContent=t)}};document.body.dataset.view=Jt.view;document.body.dataset.mainContent=Jt.currentMedia;const vl=3e4;let xt=null,Is=null;async function K0(t,e=null){const n=fe(),i=D();if(!i)return;const s=Uu(i);await ee(s,{roomId:t,targetContactName:e,initiatedAt:Date.now(),callerUserId:n})}async function Fo(){const t=D();if(!t)return;const e=Uu(t);await Xe(e).catch(()=>{})}async function Cy(t){if(!t)return!1;try{const e=b(E,`rooms/${t}/createdAt`),n=await Le(e);if(!n.exists())return!1;const i=n.val();return typeof i!="number"?!1:Date.now()-i<vl}catch(e){return console.warn("Failed to check room freshness",e),!1}}async function Y0(t,e,n){const i=v(),s=Date.now();Jn(),await K0(t,e),Jt.setView("calling");const r=document.createElement("div");r.id="calling-modal",r.style.cssText=`
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
  `;const u=async()=>{i.logCallingUILifecycle("CANCEL",t,{contactName:e,reason:"user_cancelled",duration:Date.now()-s});try{await Promise.all([Fo(),ce.cancelCall(t,fe(),"caller_cancelled"),ce.leaveRoom(fe(),t)])}catch(d){i.log("ROOM","CALLER_CANCELLED_CLEANUP_FAIL",{roomId:t,error:String(d)})}Yn.stop(),Jn(),n&&n()};l.onclick=u,o.appendChild(a),o.appendChild(c),o.appendChild(l),r.appendChild(o),document.body.appendChild(r),r.dataset.roomId=t,xt=r,Yn.playOutgoing(),Is=setTimeout(async()=>{i.logCallingUILifecycle("TIMEOUT",t,{contactName:e,reason:"auto_timeout",duration:Date.now()-s,timeoutMs:vl});try{await Promise.all([Fo(),ce.cancelCall(t,fe(),"auto_timeout"),ce.leaveRoom(fe(),t)])}catch(d){i.log("ROOM","CALLER_TIMEOUT_CLEANUP_FAIL",{roomId:t,error:String(d)})}Yn.stop(),Jn(),n&&n()},vl)}function Jn(){if(Yn.stop(),Jt.view==="calling"&&Jt.setView("lobby"),xt){const t=xt.dataset?.roomId||"unknown";v().logCallingUILifecycle("HIDE",t,{reason:"hide_called",hadTimeout:!!Is,timestamp:Date.now()})}Is&&(clearTimeout(Is),Is=null),xt&&(xt.remove(),xt=null)}async function sd(){if(xt){const t=xt.dataset?.roomId||"unknown";v().logCallingUILifecycle("ANSWERED",t,{reason:"call_answered",timestamp:Date.now()})}await Fo(),Jn()}async function J0(t="user_rejected"){const e=v(),n=xt?.dataset?.roomId||"unknown";e.logCallingUILifecycle("REJECTED",n,{reason:t,timestamp:Date.now()}),await Fo(),Jn()}const Ty=Object.freeze(Object.defineProperty({__proto__:null,hideCallingUI:Jn,isRoomCallFresh:Cy,onCallAnswered:sd,onCallRejected:J0,showCallingUI:Y0},Symbol.toStringTag,{value:"Module"})),K=t=>{const e=document.getElementById(t);return e||(console.warn(`Element with id: ${t} not found.`),null)};let Ye=null,Mn=null,Aa=null,rd=null,Qe=null,Ee=null,pe=null,Me=null,B=null,$e=null,nt=null,qe=null,mt=null,ds=null,Sy=null,_t=null,Na=null,Nn=null,hs=null,fs=null,ai=null,od=null,ad=null,cd=null,ld=null,Pi=null,ar=null,ud=null;function tp(){Ye=K("lobby"),Mn=K("lobby-call-btn"),Aa=K("title-auth-bar"),rd=K("videos"),Qe=K("local-video-el"),Ee=K("local-video-box"),pe=K("remote-video-el"),Me=K("remote-video-box"),B=K("shared-video-el"),$e=K("shared-video-box"),nt=K("chat-controls"),qe=K("call-btn"),mt=K("hang-up-btn"),ds=K("switch-camera-btn"),_t=K("mute-btn"),Na=K("fullscreen-partner-btn"),Nn=K("remote-pip-btn"),hs=K("mic-btn"),fs=K("camera-btn"),ai=K("exit-watch-mode-btn"),od=K("app-pip-btn"),ad=K("app-title-h1"),cd=K("app-title-a"),ld=K("app-title-span"),Pi=K("paste-join-btn"),ar=K("add-contact-btn"),ud=K("test-notifications-btn")}document.readyState==="loading"?document.addEventListener("DOMContentLoaded",tp):tp();const Iy=()=>({lobbyDiv:Ye,lobbyCallBtn:Mn,titleAuthBar:Aa,videosWrapper:rd,localVideoEl:Qe,localBoxEl:Ee,remoteVideoEl:pe,remoteBoxEl:Me,sharedVideoEl:B,sharedBoxEl:$e,chatControls:nt,callBtn:qe,hangUpBtn:mt,switchCameraBtn:ds,installBtn:Sy,mutePartnerBtn:_t,fullscreenPartnerBtn:Na,remotePipBtn:Nn,micBtn:hs,cameraBtn:fs,exitWatchModeBtn:ai,appPipBtn:od,appTitleH1:ad,appTitleA:cd,appTitleSpan:ld,pasteJoinBtn:Pi,addContactBtn:ar,testNotificationsBtn:ud});function ky(t,e=3,n=100){return new Promise(i=>{let s=0;const r=()=>{const o=document.getElementById(t);if(o){i(o);return}if(s++,s>=e){console.warn(`Element ${t} not found after ${e} attempts`),i(null);return}setTimeout(r,n)};r()})}async function Ry(t,e=3,n=100){const i={},s=t.map(async r=>{const o=await ky(r,e,n);return i[r]=o,o});return await Promise.all(s),i}async function X0(){const t=await Ry(["searchBtn","searchQuery","searchResults"],5,200),e=document.querySelector(".search-section");t.searchContainer=e;const n=Object.entries(t).filter(([i,s])=>!s).map(([i])=>i);return n.length>0&&console.warn("Some YouTube elements not found:",n),t}const Q0=Object.freeze(Object.defineProperty({__proto__:null,get addContactBtn(){return ar},get appPipBtn(){return od},get appTitleA(){return cd},get appTitleH1(){return ad},get appTitleSpan(){return ld},get callBtn(){return qe},get cameraBtn(){return fs},get chatControls(){return nt},get exitWatchModeBtn(){return ai},get fullscreenPartnerBtn(){return Na},getElements:Iy,get hangUpBtn(){return mt},initializeYouTubeElements:X0,installBtn:Sy,get lobbyCallBtn(){return Mn},get lobbyDiv(){return Ye},get localBoxEl(){return Ee},get localVideoEl(){return Qe},get micBtn(){return hs},get mutePartnerBtn(){return _t},get pasteJoinBtn(){return Pi},get remoteBoxEl(){return Me},get remotePipBtn(){return Nn},get remoteVideoEl(){return pe},robustElementAccess:ky,get sharedBoxEl(){return $e},get sharedVideoEl(){return B},get switchCameraBtn(){return ds},get testNotificationsBtn(){return ud},get titleAuthBar(){return Aa},get videosWrapper(){return rd},waitForElements:Ry},Symbol.toStringTag,{value:"Module"})),dd=t=>t?!0:(console.warn("Element not found. el.id: =>",t?.id??"(no id)","el: =>",t),console.trace(),!1),Uo=t=>{if(dd(t))return t.classList.contains("hidden")},U=t=>{dd(t)&&t.classList.contains("hidden")&&t.classList.remove("hidden")},C=t=>{dd(t)&&!t.classList.contains("hidden")&&t.classList.add("hidden")},Ay=t=>t.classList.contains("small-frame"),cr=t=>{if(t&&!Ay(t)){t.classList.add("small-frame");const e=document.createElement("div");e.classList.add("small-frame-toggle-div");const n=document.createElement("span");n.classList.add("small-frame-toggle-icon"),n.textContent="❮",e.appendChild(n),t.appendChild(e),e.addEventListener("click",()=>{t.classList.contains("closed")?(t.classList.remove("closed"),e.classList.remove("closed"),n.classList.remove("closed")):(t.classList.add("closed"),e.classList.add("closed"),n.classList.add("closed"))})}},Pn=t=>{if(Ay(t)){t.classList.remove("small-frame"),t.classList.remove("closed");const e=t.querySelector(".small-frame-toggle-div");e&&e.remove()}};function hd(t){return document.pictureInPictureElement===t}function Z0(){return"pictureInPictureEnabled"in document&&typeof document.pictureInPictureEnabled=="boolean"&&document.pictureInPictureEnabled}async function Ny(t,e){if(!t||!e)return"small-frame";if(hd(t))return Pn(e),"already-pip";if(!Z0())return cr(e),U(e),"small-frame";try{return await t.requestPictureInPicture(),Pn(e),"pip"}catch(n){return console.warn("Failed to enter Picture-in-Picture:",n),cr(e),U(e),"small-frame"}}async function Pa(t){try{if(t&&!hd(t))return;document.pictureInPictureElement&&await document.exitPictureInPicture()}catch(e){console.warn("Failed to exit Picture-in-Picture:",e)}}function eL(t,{inactivityMs:e=3e3,listenTarget:n=document,onShow:i=null,onHide:s=null,hideOnEsc:r=!1,excludeEvents:o=["keydown"]}={}){if(!t)return()=>{};let a=null;const l=["pointermove","pointerdown","pointerup","touchstart","touchmove","mousemove","mousedown","keydown"].filter(m=>!Array.isArray(o)||!o.includes(m));function u(){U(t);try{typeof i=="function"&&i()}catch(m){console.warn("showHideOnInactivity onShow callback error:",m)}a&&clearTimeout(a),a=setTimeout(()=>{C(t);try{typeof s=="function"&&s()}catch(m){console.warn("showHideOnInactivity onHide callback error:",m)}a=null},e)}l.forEach(m=>n.addEventListener(m,u,{passive:!0}));function d(){if(document.hidden){a&&(clearTimeout(a),a=null);try{C(t)}catch(m){console.warn("showHideOnInactivity onHide (visibilitychange) callback error:",m)}}else u()}document.addEventListener("visibilitychange",d);function h(m){if(!m.relatedTarget){a&&(clearTimeout(a),a=null),C(t);try{typeof s=="function"&&s()}catch(T){console.warn("showHideOnInactivity onHide (visibilitychange) callback error:",T)}}}n.addEventListener("mouseout",h);function f(m){if(r&&(m.key==="Escape"||m.key==="Esc")){a&&(clearTimeout(a),a=null),C(t);try{typeof s=="function"&&s()}catch(T){console.warn("showHideOnInactivity onHide (esc) callback error:",T)}}}document.addEventListener("keydown",f);function p(){a||u()}n.addEventListener("touchend",p,{passive:!0}),C(t);function g(){l.forEach(m=>n.removeEventListener(m,u)),document.removeEventListener("visibilitychange",d),n.removeEventListener("mouseout",h),n.removeEventListener("touchend",p),document.removeEventListener("keydown",f),a&&(clearTimeout(a),a=null)}return g}let Bt=null,Ht=null,Py="user";function Ly(){return Py}function Oy(t){Py=t}function La(){return Bt instanceof MediaStream}function fd(){return!Bt||!(Bt instanceof MediaStream)?(console.error("Invalid remote MediaStream accessed:",Bt),null):Bt}function Dy(t){Bt=t}function My(){Bt&&(Bt.getTracks().forEach(t=>t.stop()),Bt=null)}function xy(){return Ht instanceof MediaStream}function Oa(){return!Ht||!(Ht instanceof MediaStream)?(console.error("Invalid local MediaStream accessed:",Ht),console.error("Call createLocalStream() before accessing local stream."),null):Ht}function $o(t){Ht=t}function Fy(){Ht&&(Ht.getTracks().forEach(t=>t.stop()),Ht=null)}const tL=Object.freeze(Object.defineProperty({__proto__:null,cleanupLocalStream:Fy,cleanupRemoteStream:My,getFacingMode:Ly,getLocalStream:Oa,getRemoteStream:fd,hasLocalStream:xy,hasRemoteStream:La,setFacingMode:Oy,setLocalStream:$o,setRemoteStream:Dy},Symbol.toStringTag,{value:"Module"})),np="yt-video-box",bl="yt-player-root";let ne=null,en=!1;const Ms=()=>ne,nL=()=>en,Uy=t=>en=t,Li=()=>{const t=document.getElementById(np);if(!t)throw new Error(`Container #${np} not found`);return t};function iL(){return new Promise(t=>{window.YT&&window.YT.Player?t():window.onYouTubeIframeAPIReady=()=>{t()}})}function $y(){const t=Li();if(!document.getElementById(bl)){const e=document.createElement("div");e.id=bl,t.appendChild(e)}U(t)}function Bo(){const t=Li();C(t)}function _c(){const t=Li();return t&&!t.classList.contains("hidden")}function El(t){return t?t.includes("youtube.com")||t.includes("youtu.be"):!1}function By(t){if(!t)return null;const e=[/(?:youtube\.com\/watch\?v=)([\w-]+)/,/(?:youtu\.be\/)([\w-]+)/,/(?:youtube\.com\/embed\/)([\w-]+)/,/(?:youtube\.com\/shorts\/)([\w-]+)/];for(const n of e){const i=t.match(n);if(i&&i[1])return i[1]}return null}async function sL({url:t,onReady:e,onStateChange:n}){const i=By(t);if(!i)throw new Error("Invalid YouTube URL");if(await iL(),ne){try{ne.destroy()}catch(o){console.warn("Error destroying previous YouTube player:",o)}ne=null}const s=(o=!0)=>{const a=Li(),c=ne.getIframe();if(c&&a){try{a.tabIndex=-1,a.focus({preventScroll:!0})}catch{if(document.activeElement===c)try{c.blur()}catch{}}if(o){const l=u=>{if(u.code==="Space"){const d=Li(),h=ne.getIframe();if(document.activeElement===h||document.activeElement===d)return;u.preventDefault(),console.debug("Space pressed, refocusing iframe"),ne.getPlayerState()!==window.YT.PlayerState.PLAYING?gd():Pr()}};document.addEventListener("keydown",l,{once:!0})}}},r=()=>{const o=Li(),a=ne.getIframe();if(o&&a&&document.activeElement!==a)try{a.focus()}catch{}};return $y(),new Promise((o,a)=>{try{ne=new window.YT.Player(bl,{videoId:i,playerVars:{autoplay:1,mute:0,controls:1,fs:1,rel:0,modestbranding:1,disablekb:0,origin:window.location.origin},events:{onReady:c=>{en=!0,e&&e(c),o(ne)},onStateChange:c=>{c.data===window.YT.PlayerState.ENDED&&s(!1),c.data===window.YT.PlayerState.PAUSED&&s(),c.data===window.YT.PlayerState.PLAYING&&r(),n&&n(c)},onError:c=>{console.error("YouTube player error:",c.data),a(new Error(`YouTube error: ${c.data}`))}}})}catch(c){a(c)}})}function pd(){if(ne){try{Bo(),ne.destroy()}catch(t){console.warn("Error destroying YouTube player:",t)}ne=null,en=!1}}function gd(){ne&&en&&ne.playVideo()}function Pr(){ne&&en&&ne.pauseVideo()}function rL(t){ne&&en&&ne.seekTo(t,!0)}function Ho(){return ne&&en?ne.getCurrentTime():0}function md(){return ne&&en?ne.getPlayerState():-1}const gn={UNSTARTED:-1,ENDED:0,PLAYING:1,PAUSED:2,BUFFERING:3,CUED:5},Hy=()=>{if(!La())return!1;const t=fd();return t&&t.getVideoTracks().length>0&&t.getVideoTracks()[0].enabled&&t.getVideoTracks()[0].readyState==="live"};function oL(){ci()||(jy(!0),C(Ye),C(Mn),nt.classList.remove("bottom"),nt.classList.add("watch-mode"),Tl()?(C(qe),U(mt)):(C(mt),C(hs),C(_t),U(qe)),C(fs),C(ds),U(ai),U(nt),Tl()&&(C(Ee),Pn(Ee),C(Me),Ny(pe,Me)))}function aL(){ci()&&(C(ai),U(qe),U(mt),U(hs),U(_t),U(fs),U(ds),nt.classList.remove("watch-mode"),nt.classList.add("bottom"),U(nt),Hy()&&(Pa(pe),Pn(Me),U(Me)),Tl()?(cr(Ee),U(Ee)):(U(Ye),U(Mn),Pn(Ee),C(Ee)),jy(!1))}function Vo(){Jt.setMainContent("ytVideo"),oL()}function xs(){Jt.setMainContent("remoteStream"),aL()}let Re=null,Xt=null,Vy=!1,yt="none",Fs=null,it=null;const ci=()=>Vy,jy=t=>Vy=t,St=()=>yt,cL=t=>{["yt","url","file","none"].includes(t)?yt=t:console.warn("Invalid lastWatched platform:",t)};let mn=!1,Us=null,Oi=0,yc=!1;async function Di(t){if(!Re)return;console.debug("Updating watch sync state, roomId:",Re);const e=Ir(Re);try{await vn(e,{...t,updatedBy:Xt})}catch(n){console.error("Failed to update watch state:",n)}}function lL(t,e,n){if(!t)return;Re=t,Xt=n;const i=Ir(t),s=kr(t);Ii(i,fL,t),Ii(s,hL,t),vL()}function _d(t){return typeof t=="string"&&t.startsWith("blob:")}async function uL(t,e){if(!Re||!Xt)return!1;const n=kr(Re);try{return await ee(n,{fileName:t,requestedBy:Xt,timestamp:Date.now()}),it&&clearTimeout(it),it=setTimeout(()=>{Cl()},300*1e3),!0}catch(i){return console.error("Failed to create watch request:",i),!1}}async function dL(t){if(!Re)return!1;const e=kr(Re);try{await Xe(e)}catch(n){console.warn("Failed to remove watch request:",n)}return it&&(clearTimeout(it),it=null),await lr(t)}async function Cl(){if(!Re)return;it&&(clearTimeout(it),it=null);const t=kr(Re);try{await Xe(t)}catch(e){console.warn("Failed to cancel watch request:",e)}}function hL(t){const e=t.val();if(!e){it&&(clearTimeout(it),it=null);return}e.requestedBy!==Xt&&window.onFileWatchRequestReceived&&window.onFileWatchRequestReceived(e.fileName)}function fL(t){const e=t.val();e&&e.updatedBy!==Xt&&(Date.now()-Oi<500||(e.url&&e.url!==Fs&&!_d(e.url)&&pL(e.url),e.isYouTube?gL(e):wL(e)))}function pL(t){Fs=t,El(t)?(C($e),Wy(t),yt="yt"):(pd(),U($e),B.src=t,yt="url"),Vo()}function gL(t){!Ms()||!nL()||(mL(t),_L(t))}function mL(t){const e=md(),n=e===gn.PLAYING;if([gn.BUFFERING,gn.UNSTARTED].includes(e)){yL();return}mn||(t.playing&&!n?(gd(),yt="yt"):!t.playing&&n&&(Pr(),yt="yt"))}function _L(t){if(t.currentTime===void 0)return;const e=Ho();Math.abs(e-t.currentTime)>.3&&!mn&&(rL(t.currentTime),setTimeout(()=>{t.playing?gd():Pr(),yt="yt"},500))}function yL(){mn=!0,clearTimeout(Us),Us=setTimeout(async()=>{mn=!1;const t=md()===gn.PLAYING;await Di({playing:t,currentTime:Ho()})},700)}function wL(t){Oi=Date.now(),t.playing!==void 0&&(t.playing&&B.paused?B.play().catch(e=>console.warn("Play failed:",e)):!t.playing&&!B.paused&&B.pause()),t.currentTime!==void 0&&Math.abs(B.currentTime-t.currentTime)>1&&(B.currentTime=t.currentTime,t.playing?B.play().catch(n=>console.warn("Play failed:",n)):B.pause())}function vL(){const t=()=>{yt!=="file"&&(yt="url")};B.addEventListener("play",async()=>{!Ms()&&Re&&(Oi=Date.now(),await Di({playing:!0,currentTime:B.currentTime,isYouTube:!1})),t()}),B.addEventListener("pause",async()=>{B.seeking||(!Ms()&&Re&&(Oi=Date.now(),console.log("[SYNC DEBUG] Local pause event:",{currentTime:B.currentTime}),await Di({playing:!1,currentTime:B.currentTime,isYouTube:!1})),t())}),B.addEventListener("playing",()=>{yc=!0}),B.addEventListener("pause",()=>{B.seeking||(yc=!1)},!0),B.addEventListener("seeked",async()=>{!Ms()&&Re&&(Oi=Date.now(),await Di({currentTime:B.currentTime,playing:yc,isYouTube:!1})),t()})}async function bL(t){if(!t)return!1;Oi=Date.now();const e=_d(t);if(El(t)){if(C($e),!await Wy(t))return!1;yt="yt"}else pd(),U($e),B.src=t,yt=e?"file":"url";if(Re){const n=Ir(Re);e?await ee(n,{playing:!1,currentTime:0,isYouTube:!1,updatedBy:Xt}):ee(n,{url:t,playing:!1,currentTime:0,isYouTube:El(t),updatedBy:Xt})}return Vo(),!0}async function lr(t){let e;if(t instanceof File){if(!t.type.startsWith("video/"))return console.warn("Invalid file type:",t.type),!1;e=URL.createObjectURL(t)}else if(typeof t=="string")e=t;else if(t?.url)e=t.url;else return console.warn("Invalid video source:",t),!1;Fs=e;const n=await bL(e);return n||_d(Fs)&&t instanceof File&&(URL.revokeObjectURL(e),Fs=null),n}async function Wy(t){if(!By(t))return console.error("Invalid YouTube URL:",t),!1;try{return await sL({url:t,onReady:n=>{if(Uy(!0),Re){const i=Ir(Re);ee(i,{url:t,playing:!1,currentTime:0,isYouTube:!0,updatedBy:Xt})}},onStateChange:async n=>{if(!Ms())return;const s=n.data===gn.PLAYING,r=n.data===gn.PAUSED;if(n.data===gn.BUFFERING){mn=!0,Us&&clearTimeout(Us),Us=setTimeout(async()=>{mn=!1;const c=md()===gn.PLAYING;await Di({playing:c,currentTime:Ho()})},700);return}r&&mn||!mn&&(s||r)&&await Di({playing:s,currentTime:Ho()})}}),!0}catch(n){return console.error("Failed to load YouTube video:",n),!1}}let Mi=!1,jr=!1,ip=null,sp=null,$s=null;const Tl=()=>Mi,qy=()=>{if(!Mi){if(!pe||!La()||pe.paused||pe.readyState<2){jr||(jr=!0,pe.addEventListener("playing",()=>{jr=!1,qy()},{once:!0}));return}if(jr=!1,Mi=!0,U(Me),U(Ee),cr(Ee),C(Ye),C(Mn),qe.disabled=!0,qe.classList.add("disabled"),mt.disabled=!1,mt.classList.remove("disabled"),_t.disabled=!1,_t.classList.remove("disabled"),Nn.disabled=!1,Nn.classList.remove("disabled"),$s||($s=eL(nt,{inactivityMs:2500,hideOnEsc:!0})),!ip){const t=()=>{Mi&&(ci()?cr(Me):Pn(Me),U(Me))};pe.addEventListener("leavepictureinpicture",t),ip=()=>pe.removeEventListener("leavepictureinpicture",t)}if(!sp){const t=()=>C(Me);pe.addEventListener("enterpictureinpicture",t),sp=()=>pe.removeEventListener("enterpictureinpicture",t)}}},EL=()=>{Mi&&(Mi=!1,Pa(pe),Pn(Ee),C(Ee),Pn(Me),C(Me),qe.disabled=!1,qe.classList.remove("disabled"),mt.disabled=!0,mt.classList.add("disabled"),_t.disabled=!0,_t.classList.add("disabled"),Nn.disabled=!0,Nn.classList.add("disabled"),$s&&($s(),$s=null),ci()||(U(Mn),U(Ye),U(nt)))};function zy(){Jt.setView("connected"),qy()}function Gy(){Jt.setView("lobby"),EL()}let Tt=null,rp=null;function Ky(t){rp=t,t.onconnectionstatechange=()=>{q("onconnectionstatechange:",t.connectionState),t.connectionState==="connected"?(zy(),sd().catch(e=>console.warn("Failed to clear calling state on connect:",e)),Tt&&(clearTimeout(Tt),Tt=null)):t.connectionState==="disconnected"?(Tt&&clearTimeout(Tt),Tt=setTimeout(()=>{t===rp&&t.connectionState==="disconnected"&&Ce.cleanupCall({reason:"connection_lost"}),Tt=null},3e3)):t.connectionState==="failed"&&(Ra(),Tt&&(clearTimeout(Tt),Tt=null),Ce.cleanupCall({reason:"connection_failed"}))},t.addEventListener("iceconnectionstatechange",e=>{q("ICE iceconnectionstatechange:",t.iceConnectionState),t.iceConnectionState==="failed"&&(console.warn("ICE connection failed, restarting ICE..."),t.restartIce())})}const yd={iceServers:[{urls:"stun:stun.l.google.com:19302"}]},wc=new WeakMap;function Yy(t,e,n){wc.has(t)||wc.set(t,{});const i=wc.get(t),s=e==="offer"?"lastOffer":"lastAnswer";return i[s]===n?!0:(i[s]=n,!1)}function Jy(t,e){return t?e==="offer"?t.signalingState==="stable":t.signalingState==="have-local-offer"||t.signalingState==="stable":!1}function wd(t,e){e.getTracks().forEach(n=>{t.addTrack(n,e)})}async function Xy(t){const e=await t.createOffer();return await t.setLocalDescription(e),e}async function Qy(t){const e=await t.createAnswer();return await t.setLocalDescription(e),e}async function Zy(t,e,n){if(Yy(t,e.type,e.sdp))return console.debug(`Ignoring duplicate ${e.type} - already processed`),!1;if(!Jy(t,e.type))return console.warn(`Ignoring ${e.type} - unexpected signaling state:`,t.signalingState),!1;try{return await t.setRemoteDescription(new RTCSessionDescription(e)),n(t),console.debug(`Remote description set (${e.type})`),!0}catch(i){return console.error(`Failed to set remote description (${e.type}):`,i),!1}}function ew(){return Math.random().toString(36).substring(2,9)}const CL=Object.freeze(Object.defineProperty({__proto__:null,addLocalTracks:wd,createAnswer:Qy,createOffer:Xy,generateRoomId:ew,isDuplicateSdp:Yy,isValidSignalingState:Jy,rtcConfig:yd,setRemoteDescription:Zy},Symbol.toStringTag,{value:"Module"}));async function TL({localStream:t,remoteVideoEl:e,mutePartnerBtn:n,setupRemoteStream:i,setupWatchSync:s,targetRoomId:r=null}){if(!t)return{success:!1};const o=new RTCPeerConnection(yd),a="initiator",c=r||ew(),l=fe();wd(o,t);const u=o.createDataChannel("files");if(!i(o,e,n))return console.error("Error setting up remote stream"),o.close(),{success:!1};nd(o,a,c),Ky(o);const h=await Xy(o);await ce.createNewRoom(h,l,c),s(c,a,l);const f=`${window.location.origin}${window.location.pathname}?room=${c}`;return{success:!0,pc:o,roomId:c,roomLink:f,dataChannel:u,role:a}}async function SL({roomId:t,localStream:e,remoteVideoEl:n,mutePartnerBtn:i,setupRemoteStream:s,setupWatchSync:r,onMessagesUIReady:o=null}){if(!e)return{success:!1};if(!t)return{success:!1};const a=await ce.checkRoomStatus(t);if(!a.exists)return{success:!1};if(!a.hasMembers)return{success:!1};let c;try{c=await ce.getRoomData(t)}catch(m){return q("Error: "+m.message),{success:!1}}const l=c.offer;if(!l)return{success:!1};const u=new RTCPeerConnection(yd),d="joiner",h=fe();wd(u,e);let f=null;if(u.ondatachannel=m=>{f=m.channel,q("[Call Flow] DataChannel received by joiner",{label:f.label})},!s(u,n,i))return console.error("Error setting up remote stream for joiner"),u.close(),{success:!1};nd(u,d,t),Ky(u),await Zy(u,l,id);const g=await Qy(u);try{await ce.saveAnswer(t,g)}catch(m){return console.error("Failed to save answer to Firebase:",m),u.close(),{success:!1}}return r(t,d,h),await ce.joinRoom(t,h),{success:!0,pc:u,roomId:t,dataChannel:f,role:d}}class IL{async sendFile(e,n){throw new Error("FileTransport.sendFile() must be implemented by subclass")}onFileReceived(e){throw new Error("FileTransport.onFileReceived() must be implemented by subclass")}onReceiveProgress(e){throw new Error("FileTransport.onReceiveProgress() must be implemented by subclass")}isReady(){throw new Error("FileTransport.isReady() must be implemented by subclass")}cleanup(){throw new Error("FileTransport.cleanup() must be implemented by subclass")}}const kL={FILE_CONFIG:{NETWORK_CHUNK_SIZE:65536}};async function RL(t){if(t instanceof ArrayBuffer)return t;if(t instanceof Blob)try{return await t.arrayBuffer()}catch(e){return console.error("[ChunkProcessor] Blob conversion failed:",e),null}else if(t instanceof Uint8Array||ArrayBuffer.isView(t))try{const e=t instanceof Uint8Array?t:new Uint8Array(t.buffer,t.byteOffset,t.byteLength),n=new ArrayBuffer(e.length);return new Uint8Array(n).set(e),n}catch(e){return console.error("[ChunkProcessor] TypedArray conversion failed:",e),null}else return console.error("[ChunkProcessor] Unknown data type:",Object.prototype.toString.call(t)),null}function AL(t){try{if(t.byteLength<4)return console.error("[ChunkProcessor] Invalid embedded packet - too small:",t.byteLength),null;const i=new DataView(t).getUint32(0,!0),s=4+i;if(t.byteLength<s)return console.error("[ChunkProcessor] Incomplete embedded packet - expected:",s,"got:",t.byteLength),null;const r=new Uint8Array(t,4,i),o=new TextDecoder().decode(r),a=JSON.parse(o),c=4+i,l=t.slice(c);return{chunkMeta:a,chunkData:l}}catch(e){return console.error("[ChunkProcessor] Failed to parse embedded packet:",e),null}}const NL=1024;function PL(t,e,n){let i=0,s=0;const r=[];t.forEach((c,l)=>{c instanceof ArrayBuffer?(s++,i+=c.byteLength):r.push(l)});const o=e-i;return{isComplete:s===n&&Math.abs(o)<=NL,validChunks:s,totalSize:i,missingChunks:r,sizeDifference:o}}const vc=kL.FILE_CONFIG.NETWORK_CHUNK_SIZE,op=5e3;class LL{constructor(e){this.dataChannel=e,this.receivedChunks=new Map,this.fileMetadata=new Map,this.onFileError=null,this.onReceiveProgress=null}async sendFile(e,n){if(e.size>op*1024*1024)throw new Error(`File too large (max ${op} MB)`);if(this.dataChannel.readyState!=="open")throw new Error("DataChannel not ready");const i=`${e.name}-${e.size}-${Date.now()}`,s=Math.ceil(e.size/vc);this.dataChannel.send(JSON.stringify({type:"FILE_META",fileId:i,name:e.name,size:e.size,mimeType:e.type,totalChunks:s}));for(let r=0;r<s;r++){const o=r*vc,a=Math.min(o+vc,e.size),c=await e.slice(o,a).arrayBuffer(),l={type:"FILE_CHUNK",fileId:i,chunkIndex:r,totalChunks:s},u=new TextEncoder().encode(JSON.stringify(l)),d=new ArrayBuffer(4+u.length+c.byteLength),h=new Uint8Array(d);for(new DataView(d).setUint32(0,u.length,!0),h.set(u,4),h.set(new Uint8Array(c),4+u.length),this.dataChannel.send(d),n&&n((r+1)/s);this.dataChannel.bufferedAmount>256*1024;)await new Promise(p=>setTimeout(p,10))}}async handleMessage(e){if(typeof e=="string"){const n=JSON.parse(e);n.type==="FILE_META"&&(this.fileMetadata.set(n.fileId,n),this.receivedChunks.set(n.fileId,[]),this.onFileMetaReceived?.(n))}else{const n=await RL(e);if(!n){console.error("[FileTransfer] Failed to convert binary data to ArrayBuffer");return}const i=AL(n);if(!i){console.error("[FileTransfer] Failed to parse embedded chunk packet");return}const{chunkMeta:s,chunkData:r}=i,o=this.receivedChunks.get(s.fileId);if(!o){console.error("[FileTransfer] Received chunk for unknown file:",s.fileId);return}if(o[s.chunkIndex]=r,this.onReceiveProgress){const a=o.filter(c=>c).length;this.onReceiveProgress(a/s.totalChunks)}o.filter(a=>a).length===s.totalChunks&&this.assembleFile(s.fileId)}}assembleFile(e){const n=this.fileMetadata.get(e),i=this.receivedChunks.get(e),s=PL(i,n.size,n.totalChunks);if(!s.isComplete){console.error("[FileTransfer] File assembly failed:",{fileId:e,fileName:n.name,...s}),this.onFileError&&this.onFileError({fileName:n.name,reason:"incomplete",details:s});return}const r=new Blob(i,{type:n.mimeType}),o=new File([r],n.name,{type:n.mimeType});this.onFileReceived?.(o),this.receivedChunks.delete(e),this.fileMetadata.delete(e)}}class OL extends IL{constructor(e){if(super(),!e)throw new Error("WebRTCFileTransport requires a DataChannel");this.dataChannel=e,this.fileTransfer=new LL(e),this._setupMessageHandling()}_setupMessageHandling(){this.dataChannel.onmessage=e=>{if(typeof e.data=="string")try{const n=JSON.parse(e.data);if(n.type==="FILE_META"||n.type==="FILE_CHUNK"){this.fileTransfer.handleMessage(e.data);return}}catch{}else this.fileTransfer.handleMessage(e.data)}}async sendFile(e,n){if(!this.isReady())throw new Error("DataChannel not ready");return this.fileTransfer.sendFile(e,n)}onFileReceived(e){if(typeof e!="function")throw new Error("onFileReceived callback must be a function");this.fileTransfer.onFileReceived=e}onReceiveProgress(e){if(typeof e!="function")throw new Error("onReceiveProgress callback must be a function");this.fileTransfer.onReceiveProgress=e}isReady(){return this.dataChannel&&this.dataChannel.readyState==="open"}cleanup(){this.dataChannel&&(this.dataChannel.onmessage=null),this.fileTransfer&&(this.fileTransfer.onFileReceived=null,this.fileTransfer.onFileMetaReceived=null),this.dataChannel=null,this.fileTransfer=null}}function ur(t,e,n={}){if(!t||typeof e!="function")throw new Error("closeOnClickOutside: valid element and onClose callback required");const{ignore:i=[],esc:s=!0,events:r=["mousedown","touchstart"],ignoreInputBlur:o=!1}=n,a=()=>{let f=n.ignore||[];return typeof f=="function"&&(f=f()),Array.isArray(f)?f.filter(Boolean):[]};let c=!1;const l=f=>{try{const p=f.target;if(t.contains(p))return;const g=a();for(const m of g)if(m&&m.contains&&m.contains(p)||m===p)return;if(o&&c&&!(p.tagName==="INPUT"||p.tagName==="TEXTAREA"||p.isContentEditable)){c=!1;return}e(f)}catch(p){console.error("closeOnClickOutside handler error:",p)}},u=f=>{s&&f.key==="Escape"&&e(f)},d=()=>{c=!0},h=()=>{setTimeout(()=>{c=!1},0)};return r.forEach(f=>document.addEventListener(f,l,{passive:!0})),s&&document.addEventListener("keydown",u),o&&t.querySelectorAll("input, textarea, [contenteditable]").forEach(p=>{p.addEventListener("focus",d),p.addEventListener("blur",h)}),function(){r.forEach(p=>document.removeEventListener(p,l,{passive:!0})),s&&document.removeEventListener("keydown",u),o&&t.querySelectorAll("input, textarea, [contenteditable]").forEach(g=>{g.removeEventListener("focus",d),g.removeEventListener("blur",h)})}}const DL=t=>String(t).replace(/[&<>"'`=\/]/g,n=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;","`":"&#x60;","=":"&#x3D;","/":"&#x2F;"})[n]),ML=/\[\[([^\]]+)\]\]|\$\{([^}]+)\}/g,xL=(t,e)=>t.replace(ML,(n,i,s)=>{const r=(i??s).trim(),o=r.split(".").reduce((c,l)=>c?.[l],e);return o==null?"":r.endsWith("Html")?String(o):DL(String(o))}),FL=(t,e={})=>{const n=document.createElement("template");return n.innerHTML=xL(t,e),n.content.cloneNode(!0)},UL=(t,e)=>{const n=[];let i=e;for(;i&&i!==t;){const s=i.parentElement;if(!s)break;const r=Array.prototype.indexOf.call(s.children,i);n.push(r),i=s}return n.reverse()},$L=(t,e)=>e.reduce((n,i)=>n&&n.children?n.children[i]:null,t),BL=t=>Array.from(t.querySelectorAll("input, textarea, select")).map(e=>({name:e.name,id:e.id,path:UL(t,e),value:e.value,checked:e.checked,selectionStart:e.selectionStart,selectionEnd:e.selectionEnd,wasFocused:document.activeElement===e})),HL=t=>typeof CSS<"u"&&typeof CSS.escape=="function"?CSS.escape(String(t)):String(t).replace(/[^_a-zA-Z0-9-]/g,e=>"\\"+e),VL=(t,e)=>{e.forEach(n=>{let i=null;if(n.name){const s=t.querySelectorAll("input[name], textarea[name], select[name]");for(const r of s)if(r.getAttribute("name")===n.name){i=r;break}}else if(n.id)try{i=t.querySelector("#"+HL(n.id))}catch{i=t.querySelector(`#${n.id}`)}else n.path&&(i=$L(t,n.path));if(i){if(i.value=n.value,n.checked!==void 0&&(i.checked=n.checked),n.selectionStart!=null&&i.setSelectionRange)try{i.setSelectionRange(n.selectionStart,n.selectionEnd)}catch{}if(n.wasFocused)try{i.focus()}catch{}}})},jL=t=>Array.from(t.querySelectorAll("video, audio")).map(e=>({src:e.currentSrc||e.src,currentTime:e.currentTime,paused:e.paused,volume:e.volume,playbackRate:e.playbackRate,muted:e.muted})),WL=(t,e)=>{const n=t.querySelectorAll("video, audio");for(const i of n)if(i.currentSrc===e||i.src===e)return i;return null},qL=(t,e)=>{e.forEach(n=>{if(!n.src)return;const i=WL(t,n.src);i&&(i.currentTime=n.currentTime,i.volume=n.volume,i.playbackRate=n.playbackRate,i.muted=n.muted,n.paused||i.play().catch(()=>{}))})},zL=()=>document.readyState!=="loading";function Ze(t){const e=document.createElement("div");return e.textContent=t||"",e.innerHTML.replace(/"/g,"&quot;").replace(/'/g,"&#39;")}const Da=({initialProps:t={},template:e="",handlers:n={},parent:i=null,containerTag:s="div",className:r="",onMount:o=null,onCleanup:a=null,autoAppend:c=!0,preserveInputState:l=!0}={})=>{if(!zL())return console.error("createComponent: DOM must be ready before creating components."),null;const u=document.createElement(s);r&&(u.className=r);let d={...t};const h=new Set,f=/\[\[([^\]]+)\]\]|\$\{([^}]+)\}/g;let p;for(;(p=f.exec(e))!==null;){const y=(p[1]||p[2]).trim().split(".")[0];h.add(y)}const g=[],m=[],T={},P=()=>{let y=[],N=[];l&&(y=BL(u),N=jL(u)),u.textContent="";const oe=FL(e,d);u.appendChild(oe),Object.keys(n).forEach(ye=>{const J=u.querySelectorAll(`[onclick="${ye}"]`),vt=n[ye];J.forEach(ot=>{ot.removeAttribute("onclick"),typeof vt=="function"&&ot.addEventListener("click",vt)})}),l&&(VL(u,y),qL(u,N)),g.forEach(ye=>ye({...d}))},$=y=>{if(!Array.isArray(y)||y.length===0)return;const N={props:{...d},changedKeys:y};m.forEach(oe=>oe(N))};for(const y of Object.keys(t))T[y]=[],Object.defineProperty(u,y,{get(){return d[y]},set(N){d[y]!==N&&(d[y]=N,h.has(y)&&P(),T[y].forEach(oe=>oe(N)),$([y]))},configurable:!0,enumerable:!0});if(u.update=y=>{let N=!1,oe=!1;const ye=[];for(const J in y)y[J]!==d[J]&&(d[J]=y[J],h.has(J)&&(oe=!0),T[J]&&T[J].forEach(vt=>vt(y[J])),N=!0,ye.push(J));N&&oe&&P(),ye.length>0&&$(ye)},u.onRender=y=>{typeof y=="function"&&g.push(y)},u.onAnyPropUpdated=y=>{typeof y=="function"&&m.push(y)},u.onPropUpdated=(y,N)=>{typeof N=="function"&&T[y]&&T[y].push(N)},u.dispose=()=>{a&&(Array.isArray(a)?a.forEach(y=>{typeof y=="function"&&y()}):typeof a=="function"&&a()),g.length=0,m.length=0;for(const y in T)T[y].length=0;u.remove()},P(),c&&i&&!i.contains(u)&&i.appendChild(u),typeof o=="function")try{o(u)}catch(y){v0("[createComponent]: Error in onMount handler of component",y)}return u};function tw({parent:t,onToggle:e,icon:n="💬",initialUnreadCount:i=0,id:s=null,startHidden:r=!1}={}){if(!t)return console.error("createMessageToggle: parent element is required"),null;if(typeof e!="function")return console.error("createMessageToggle: onToggle callback is required"),null;const o=Da({initialProps:{icon:n,unreadCount:i},template:`
      <div class="messages-toggle-btn">
        <button onclick="handleToggle">
          [[icon]]
          <span class="notification-badge">
            [[unreadCount]]
          </span>
        </button>
      </div>
    `,handlers:{handleToggle:c=>{c.preventDefault(),c.stopPropagation(),e()}},className:"messages-toggle-container"+(r?" hidden":""),autoAppend:!1});if(s&&o&&typeof s=="string")try{o.id=s}catch(c){console.warn("createMessageToggle: failed to set id on toggleContainer",c)}let a=o.querySelector(".notification-badge");return a&&(a.style.display=i>0?"flex":"none"),o.onPropUpdated("unreadCount",c=>{const l=o.querySelector(".notification-badge");if(l&&(l.style.display=c>0?"flex":"none"),c>0){const u=o.querySelector(".messages-toggle-btn");u&&(u.classList.add("new-message"),setTimeout(()=>{u.classList.remove("new-message")},4e3))}}),t.appendChild(o),{element:o,setUnreadCount(c){let l=Number(c);(!Number.isFinite(l)||l<0)&&(l=0),o.unreadCount=l},clearBadge(){this.setUnreadCount(0)},cleanup(){if(o&&typeof o.dispose=="function")try{o.dispose()}catch(c){console.warn("createMessageToggle: error during dispose()",c)}if(o&&o.parentNode)try{o.parentNode.removeChild(o)}catch{}}}}function ap(t=!1){if(typeof window>"u"||typeof navigator>"u")return!1;const e=navigator.userAgent||navigator.vendor||"",n=/iPad|iPhone|iPod/.test(e),i=/Macintosh/.test(e)&&typeof navigator.maxTouchPoints=="number"&&navigator.maxTouchPoints>1,s=(n||i)&&!window.MSStream,r=/Android/i.test(e),o=s||r;return t&&console.table({"User Agent":e,isAndroid:r,isiOSUA:n,isiPadOSDesktopUA:i,isMobileDevice:o}),o}function GL(t){if(!t)return null;let e=String(t).trim();if(!e)return null;/^[a-zA-Z][a-zA-Z0-9+.-]*:\/\//.test(e)||(e="http://"+e);let n="",i=null;try{i=new URL(e,window.location&&window.location.origin?window.location.origin:void 0),n=i.protocol}catch{const o=e.match(/^([a-zA-Z][a-zA-Z0-9+.-]*:)/);n=o?o[1].toLowerCase():""}if(i&&!i.hostname)return null;const s=n.toLowerCase();return s!=="http:"&&s!=="https:"?null:e}function KL(t){const e=document.createDocumentFragment();if(!t)return e;const n=/((?:https?:\/\/|www\.)[^\s<>]+\.[^\s<>]+)/g;let i=0,s;for(;(s=n.exec(t))!==null;){const r=s[0],o=s.index;o>i&&e.appendChild(document.createTextNode(t.slice(i,o)));const a=r.replace(/[.,!?:;\)\]\}]+$/g,""),c=r.slice(a.length),l=GL(a);if(!l)e.appendChild(document.createTextNode(r));else{const u=document.createElement("a");u.href=l,u.textContent=a,u.target="_blank",u.rel="noopener noreferrer",u.className="message-link",e.appendChild(u),c&&e.appendChild(document.createTextNode(c))}i=o+r.length}return i<t.length&&e.appendChild(document.createTextNode(t.slice(i))),e}const Sl={heart:"❤️",thumbsUp:"👍",laugh:"😂"},Xn={doubleTapDelay:300,longPressDelay:500,defaultReaction:"heart",maxReactionsPerMessage:0,enableAnimations:!0};function cp(t){return Sl[t]||Sl.heart}function YL(){return{...Sl}}class JL{constructor(){this.reactions=new Map}addReaction(e,n=Xn.defaultReaction,i){if(!e)throw new Error("messageId is required");this.reactions.has(e)||this.reactions.set(e,{});const s=this.reactions.get(e);return s[n]||(s[n]=new Set),i?s[n].add(i):s[n].add(`_anon_${Date.now()}_${Math.random()}`),this.getReactions(e)}removeReaction(e,n=Xn.defaultReaction,i){if(!e)throw new Error("messageId is required");const s=this.reactions.get(e);if(!s)return{};const r=s[n];if(!r||r.size===0)return this.getReactions(e);if(i)r.delete(i);else{console.debug("[ReactionManager] removeReaction called without userId - using legacy fallback");const o=r.values().next().value;o&&r.delete(o)}return r.size===0&&delete s[n],Object.keys(s).length===0&&this.reactions.delete(e),this.getReactions(e)}hasUserReaction(e,n,i){const s=this.reactions.get(e);return!s||!s[n]?!1:s[n].has(i)}getUserReactionType(e,n){const i=this.reactions.get(e);if(!i)return null;for(const[s,r]of Object.entries(i))if(r.has(n))return s;return null}getReactions(e){const n=this.reactions.get(e);if(!n)return{};const i={};for(const[s,r]of Object.entries(n))i[s]=r.size;return i}syncFromRemote(e,n){if(!e)throw new Error("messageId is required");if(this.reactions.delete(e),!n||Object.keys(n).length===0)return;const i={};for(const[s,r]of Object.entries(n))Array.isArray(r)&&r.length>0&&(i[s]=new Set(r));Object.keys(i).length>0&&this.reactions.set(e,i)}hasReactions(e){const n=this.reactions.get(e);return!!(n&&Object.keys(n).length>0)}getReactionCount(e,n){const i=this.reactions.get(e);return!i||!i[n]?0:i[n].size}clearReactions(e){this.reactions.delete(e)}clearAll(){this.reactions.clear()}}class XL{constructor(e){this.reactionManager=e,this.doubleTapTimers=new Map,this.longPressTimers=new Map,this.activePicker=null,this.activePickerMessageElement=null,this.pickerJustShown=!1}enableDoubleTap(e,n,i){if(!e||!n){console.warn("[ReactionUI] Invalid parameters for enableDoubleTap");return}const s="ontouchstart"in window,r=s?"touchend":"click",o=l=>{if(l.target.tagName==="A"||l.target.tagName==="BUTTON")return;const u=Date.now(),d=this.doubleTapTimers.get(e);d&&u-d<Xn.doubleTapDelay?(l.preventDefault(),this.handleDoubleTap(e,n,i),this.doubleTapTimers.delete(e)):this.doubleTapTimers.set(e,u)},a=l=>{if(l.target.tagName==="A"||l.target.tagName==="BUTTON")return;const u=setTimeout(()=>{this.showPicker(e,n,i)},Xn.longPressDelay);this.longPressTimers.set(e,u)},c=()=>{const l=this.longPressTimers.get(e);l&&(clearTimeout(l),this.longPressTimers.delete(e),this.activePicker||(e.style.userSelect="",e.style.webkitUserSelect=""))};e.addEventListener(r,o,{passive:!1}),s?(e.addEventListener("touchstart",a,{passive:!0}),e.addEventListener("touchend",c,{passive:!0}),e.addEventListener("touchmove",c,{passive:!0}),e.addEventListener("touchcancel",c,{passive:!0})):(e.addEventListener("mousedown",a),e.addEventListener("mouseup",c),e.addEventListener("mouseleave",c)),e._reactionCleanup=()=>{e.removeEventListener(r,o),s?(e.removeEventListener("touchstart",a),e.removeEventListener("touchend",c),e.removeEventListener("touchmove",c),e.removeEventListener("touchcancel",c)):(e.removeEventListener("mousedown",a),e.removeEventListener("mouseup",c),e.removeEventListener("mouseleave",c)),this.doubleTapTimers.delete(e),c()}}async handleDoubleTap(e,n,i){const s=Xn.defaultReaction;i&&await i(s,e,n,"doubleTap")}renderReactions(e,n,i){let s=e.querySelector(".message-reactions");if(!s){s=document.createElement("div"),s.className="message-reactions";const o=e.querySelector(".message-text");o?o.appendChild(s):e.appendChild(s)}if(s.innerHTML="",!Object.values(i).some(o=>o>0)){s.style.display="none";return}s.style.display="";for(const[o,a]of Object.entries(i))if(a>0){const c=this.createReactionBadge(o);s.appendChild(c)}}createReactionBadge(e){const n=document.createElement("span");return n.className="reaction-badge",n.dataset.reactionType=e,n.textContent=cp(e),n}showReactionAnimation(e,n){const i=cp(n),s=document.createElement("div");s.className="reaction-animation",s.textContent=i;const r=e.getBoundingClientRect();s.style.position="fixed",s.style.left=`${r.left+r.width/2}px`,s.style.top=`${r.top+r.height/2}px`,document.body.appendChild(s),setTimeout(()=>{s.remove()},1e3)}showPicker(e,n,i){this.hidePicker();const s=document.createElement("div");s.className="reaction-picker";const r=YL();for(const[a,c]of Object.entries(r)){const l=document.createElement("button");l.type="button",l.className="reaction-picker-btn",l.textContent=c,l.dataset.reactionType=a,l.addEventListener("click",async u=>{u.stopPropagation(),i&&await i(a,e,n,"picker"),this.hidePicker()}),s.appendChild(l)}const o=e.getBoundingClientRect();s.style.position="fixed",s.style.left=`${o.left+o.width/2}px`,s.style.top=`${o.top-8}px`,document.body.appendChild(s),this.activePicker=s,this.activePickerMessageElement=e,this.pickerJustShown=!0,setTimeout(()=>{this.pickerCleanup=ur(s,()=>{if(this.pickerJustShown){this.pickerJustShown=!1;return}this.hidePicker()})},0)}hidePicker(){this.activePicker&&(this.activePicker.remove(),this.activePicker=null,this.activePickerMessageElement&&(this.activePickerMessageElement.style.userSelect="",this.activePickerMessageElement.style.webkitUserSelect="",this.activePickerMessageElement=null)),this.pickerCleanup&&(this.pickerCleanup(),this.pickerCleanup=null),this.pickerJustShown=!1}cleanup(e){e._reactionCleanup&&e._reactionCleanup()}}function Ma(t,e={}){const{duration:n=3e3,type:i="info",position:s="bottom",onClick:r}=e,o=document.createElement("div");o.className=`toast toast-${i} toast-${s}`,o.textContent=t,r&&(o.classList.add("toast-clickable"),o.addEventListener("click",()=>{r(),c()})),document.body.appendChild(o),requestAnimationFrame(()=>{o.classList.add("toast-show")});let a=!1;function c(){a||(a=!0,o.classList.remove("toast-show"),setTimeout(()=>o.remove(),300))}setTimeout(c,n)}function xa(t,e={}){Ma(t,{...e,type:"success"})}function QL(t,e={}){Ma(t,{...e,type:"error"})}function nw(t,e={}){Ma(t,{...e,type:"info"})}function ZL(t,e={}){Ma(t,{...e,type:"warning"})}function eO(){const t=document.createElement("div");t.innerHTML=`
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
  `,document.body.appendChild(t);const e=t.querySelector("#messages-box"),n=t.querySelector("#messages"),i=t.querySelector("#messages-form"),s=t.querySelector("#messages-input");"virtualKeyboard"in navigator&&(navigator.virtualKeyboard.overlaysContent=!0);const r=CSS.supports?.("field-sizing","content");let o=null;if(s&&s.tagName==="TEXTAREA"&&!r){const a=()=>{s.style.height="auto",s.style.height=`${s.scrollHeight}px`};s.addEventListener("input",a,{passive:!0}),o=()=>{s.style.height=""},requestAnimationFrame(a)}return{messagesBoxContainer:t,messagesBox:e,messagesMessages:n,messagesForm:i,messagesInput:s,resetInputHeight:o}}const tO=CSS.supports?.("position-anchor: --msg-toggle")&&CSS.supports?.("right: anchor(right)")&&CSS.supports?.("bottom: anchor(top)");function nO(t){const e=t.getBoundingClientRect();return e.top>=0&&e.left>=0&&e.bottom<=window.innerHeight&&e.right<=window.innerWidth}function iO(){let t=!1,e=null,n=null,i=!1,s=new Map;const r=new JL,o=new XL(r),a=document.querySelector(".top-bar .top-right-menu")||document.querySelector(".top-right-menu"),c=tw({parent:a,onToggle:()=>ps(),icon:"💬",initialUnreadCount:0,id:"main-messages-toggle-btn",startHidden:!0});if(!c)return console.error("Messages UI: failed to initialize message toggle; aborting messages UI initialization."),null;const l=c.element,{messagesBoxContainer:u,messagesBox:d,messagesMessages:h,messagesForm:f,messagesInput:p,resetInputHeight:g}=eO();if(!l||!d||!h||!f||!p)return console.error("Messages UI elements not found."),null;const m=document.getElementById("attach-file-btn"),T=document.getElementById("file-input"),P=f.querySelector('button[type="submit"]');C(m),m.addEventListener("click",()=>{T.click()}),T.addEventListener("change",async w=>{const R=w.target.files[0];if(!R||!n){n||console.warn("[MessagesUI] FileTransfer not initialized");return}const A=P.textContent;P.textContent="Sending...";try{await n.sendFile(R,O=>{P.textContent=`${Math.round(O*100)}%`}),R.type.startsWith("video/")&&s.set(R.name,R),Se(`📎 Sent: ${R.name}`,{isSentByMe:!0})}catch(O){console.error("[MessagesUI] File send failed:",O),Se("❌ Failed to send file")}finally{P.textContent=A,T.value=""}});async function $(w){return new Promise(R=>{const A=document.createElement("div");A.className="file-action-overlay",A.style.cssText=`
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
      `;const O=document.createElement("div");O.className="file-action-prompt",O.style.cssText=`
        background: var(--bg-primary, #1a1a1a);
        border: 1px solid var(--border-color, #333);
        border-radius: 12px;
        padding: 24px;
        max-width: 400px;
        width: 90%;
        box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);
      `,O.innerHTML=`
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
      `,A.appendChild(O),document.body.appendChild(A);const Z=O.querySelector("#file-name-display");Z.textContent=w;const V=O.querySelector("#download-file-btn"),j=O.querySelector("#watch-together-btn");V.addEventListener("mouseenter",()=>{V.style.background="var(--bg-hover, #333)"}),V.addEventListener("mouseleave",()=>{V.style.background="var(--bg-secondary, #2a2a2a)"}),j.addEventListener("mouseenter",()=>{j.style.opacity="0.9"}),j.addEventListener("mouseleave",()=>{j.style.opacity="1"}),V.addEventListener("click",()=>{A.remove(),R("download")}),j.addEventListener("click",()=>{A.remove(),R("watch")}),A.addEventListener("click",he=>{he.target===A&&(A.remove(),R("download"))})})}async function y(w){return new Promise(R=>{const A=document.createElement("div");A.className="watch-request-overlay",A.style.cssText=`
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
      `;const O=document.createElement("div");O.className="watch-request-prompt",O.style.cssText=`
        background: var(--bg-primary, #1a1a1a);
        border: 1px solid var(--border-color, #333);
        border-radius: 12px;
        padding: 24px;
        max-width: 400px;
        width: 90%;
        box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);
      `,O.innerHTML=`
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
      `,A.appendChild(O),document.body.appendChild(A);const Z=O.querySelector("#watch-request-filename");Z.textContent=w;const V=O.querySelector("#decline-watch-btn"),j=O.querySelector("#accept-watch-btn");V.addEventListener("mouseenter",()=>{V.style.background="var(--bg-hover, #333)"}),V.addEventListener("mouseleave",()=>{V.style.background="var(--bg-secondary, #2a2a2a)"}),j.addEventListener("mouseenter",()=>{j.style.opacity="0.9"}),j.addEventListener("mouseleave",()=>{j.style.opacity="1"}),V.addEventListener("click",()=>{A.remove(),R(!1)}),j.addEventListener("click",()=>{A.remove(),R(!0)}),A.addEventListener("click",he=>{he.target===A&&(A.remove(),R(!1))})})}window.onFileWatchRequestReceived=async w=>{const R=s.get(w);if(!R){Se(`❌ File not available to watch together: ${w}`),await Cl();return}Se(`🎬 Partner wants to watch: ${w}`),await y(w)?(Se("✅ Joining watch together..."),await dL(R)||Se("❌ Failed to load video")):(Se("❌ Declined watch together request"),await Cl())};function N(){if(!l||!d||d.classList.contains("hidden"))return;const w=l.getBoundingClientRect(),R=d.getBoundingClientRect(),A=8;let O=w.top-R.height-A;O<8&&(O=w.bottom+A);let Z=w.left+w.width/2-R.width/2;const V=window.innerWidth-R.width-8;Z<8&&(Z=8),Z>V&&(Z=V),d.style.top=`${Math.round(O)}px`,d.style.left=`${Math.round(Z)}px`}function oe(){t||(t=!0,window.addEventListener("resize",N,{passive:!0}),window.addEventListener("scroll",N,{passive:!0}),window.addEventListener("orientationchange",N,{passive:!0}))}function ye(){t&&(t=!1,window.removeEventListener("resize",N),window.removeEventListener("scroll",N),window.removeEventListener("orientationchange",N))}let J=null;const vt=new MutationObserver(w=>{w.forEach(R=>{R.type==="attributes"&&R.attributeName==="class"&&(d.classList.contains("hidden")||c.clearBadge())})});vt.observe(d,{attributes:!0});function ot(){return!d.classList.contains("hidden")}function Ha(){return document.activeElement===p}function $w(){Ha()||p.focus()}function Bw(){Ha()&&p.blur()}function ps(){d.classList.toggle("hidden"),ot()?(ap()||p.focus(),tO?requestAnimationFrame(()=>{nO(d)||(N(),oe())}):(N(),oe()),Dd(),J=ur(d,()=>{C(d),ye(),d.style.top="",d.style.left="",d.style.bottom="",d.style.right="",J&&(J(),J=null)},{ignore:()=>[c.element,o.activePicker].filter(Boolean),esc:!0,ignoreInputBlur:ap()})):(document.activeElement===p&&p.blur(),ye(),d.style.top="",d.style.left="",d.style.bottom="",d.style.right="",J&&(J(),J=null))}function Va(){U(c.element)}function Od(){C(c.element)}const ja=new Map;function Se(w,R={}){const{isSentByMe:A,senderDisplay:O,fileDownload:Z,messageId:V,reactions:j}=R,he=O??(A===!0?"Me":""),Ne=document.createElement("p");A===!0?Ne.classList.add("message-local"):A===!1&&Ne.classList.add("message-remote");const bt=document.createElement("span");bt.className="sender-avatar"+(A===!0?" sender-avatar--me":""),bt.textContent=he,bt.setAttribute("aria-hidden","true");const De=document.createElement("span");if(De.className="message-text",!O&&typeof A>"u"&&Ne.classList.add("message-system"),Z){const{fileName:le,url:Ot}=Z,Ie=w.split(le)[0];Ie&&De.appendChild(document.createTextNode(Ie));const Et=document.createElement("a");Et.textContent=le,Et.href=Ot,Et.download=le,Et.style.cursor="pointer",Et.style.textDecoration="underline",Et.addEventListener("click",()=>{setTimeout(()=>URL.revokeObjectURL(Ot),100)}),De.appendChild(Et)}else{const le=KL(w);De.appendChild(le)}if(Z&&Ne.classList.add("message-system"),Ne.appendChild(bt),Ne.appendChild(De),typeof A<"u"&&!Z&&V){if(Ne.dataset.messageId=V,ja.set(V,Ne),j&&Object.keys(j).length>0){r.syncFromRemote(V,j);const le=r.getReactions(V);o.renderReactions(Ne,V,le)}o.enableDoubleTap(Ne,V,async(le,Ot,Ie,Et)=>{if(!e){console.warn("[MessagesUI] No current session for reaction");return}const tn=D();if(!tn){console.warn("[MessagesUI] No userId available for reaction");return}try{if(Et==="doubleTap"){const Ct=r.getUserReactionType(Ie,tn);let Fn;Ct?(await e.removeReaction(Ie,Ct),Fn=r.removeReaction(Ie,Ct,tn)):(await e.addReaction(Ie,le),Fn=r.addReaction(Ie,le,tn),Xn.enableAnimations&&o.showReactionAnimation(Ot,le)),o.renderReactions(Ot,Ie,Fn)}else if(Et==="picker"){const Ct=r.getUserReactionType(Ie,tn);let Fn;Ct===le?(await e.removeReaction(Ie,le),Fn=r.removeReaction(Ie,le,tn)):(Ct&&(await e.removeReaction(Ie,Ct),r.removeReaction(Ie,Ct,tn)),await e.addReaction(Ie,le),Fn=r.addReaction(Ie,le,tn),Xn.enableAnimations&&o.showReactionAnimation(Ot,le)),o.renderReactions(Ot,Ie,Fn)}}catch(Ct){console.warn("[MessagesUI] Failed to handle reaction:",Ct)}})}h.appendChild(Ne),Dd()}let xn=null;function Dd(){h&&(xn!==null&&cancelAnimationFrame(xn),xn=requestAnimationFrame(()=>{h.scrollTop=h.scrollHeight,xn=null}))}function Md(w,{isUnread:R=!0,senderDisplay:A="U",messageId:O,reactions:Z}={}){if(Se(w,{isSentByMe:!1,senderDisplay:A,messageId:O,reactions:Z}),Uo(d)&&R){const V=c.element.unreadCount||0;c.setUnreadCount(V+1)}}function xd(){const w=p.value.trim();w&&(e?(e.send(w),p.value="",g&&g()):console.warn("[MessagesUI] No active session to send message"))}f.addEventListener("submit",w=>{w.preventDefault(),xd()}),p.addEventListener("keydown",w=>{w.key==="Enter"&&!w.shiftKey&&(w.preventDefault(),xd())});const Hw=()=>{const w=document.activeElement;return w&&(w.tagName==="INPUT"||w.tagName==="TEXTAREA"||w.isContentEditable)},Fd=w=>{(w.key==="m"||w.key==="M")&&!ot()&&!Hw()&&(w.preventDefault(),ps())};document.addEventListener("keydown",Fd);function Or(){xn!==null&&(cancelAnimationFrame(xn),xn=null),h.innerHTML="",h.scrollTop=0}function Dr(w){e!==null&&e!==w&&Or(),e=w}function Vw(){return e}function jw(w){n=w,n?(U(m),n.onFileReceived=async R=>{const A=URL.createObjectURL(R);if(R.type.startsWith("video/"))if(await $(R.name)==="watch"){if(Se(`📹 Received video: ${R.name}`,{isSentByMe:!1}),Se("🎬 Requesting partner to join watch together..."),!await lr(R)){Se("❌ Failed to load video");return}const V=await uL(R.name);Se(V?"⏳ Waiting for partner to join...":"❌ Failed to send watch request")}else{const Z=document.createElement("a");Z.href=A,Z.download=R.name,Z.click(),setTimeout(()=>URL.revokeObjectURL(A),1e3),Se(`📎 Downloaded: ${R.name}`)}else Se(`📎 Received: ${R.name}`,{isSentByMe:!1,fileDownload:{fileName:R.name,url:A}});if(Uo(d)){const O=c.element.unreadCount||0;c.setUnreadCount(O+1)}i&&(P.textContent="Send",i=!1)},n.onReceiveProgress=R=>{i=!0,P.textContent=`${Math.round(R*100)}%`}):C(m)}function Ww(){Or(),e=null,n=null,i=!1,Od(),C(d),c.clearBadge(),p.value="",g&&g(),P&&(P.textContent="Send"),C(m),d.style.top="",d.style.left="",d.style.bottom="",d.style.right="",ye(),ja.clear(),r.clearAll()}function Ud(w,R){const A=ja.get(w);if(!A)return;const O={};for(const[j,he]of Object.entries(R||{}))O[j]=he.length;const Z=r.getReactions(w);((j,he)=>{const Ne=Object.keys(j),bt=Object.keys(he);return Ne.length===bt.length&&Ne.every(De=>j[De]===he[De])})(O,Z)||(console.debug(`[MessagesUI] Syncing reaction state for ${w}:`,{local:Z,remote:O}),r.syncFromRemote(w,R),o.renderReactions(A,w,O))}function qw(){if(c&&c.cleanup(),ye(),typeof J=="function")try{J()}catch(w){console.error("Error removing messages box outside click handler:",w)}vt.disconnect(),document.removeEventListener("keydown",Fd),u&&u.parentNode&&u.parentNode.removeChild(u)}function zw(w,R,A=!1){if(!D()){nw("Please sign in to send messages");return}const O=bn.getSession(w);if(O){Dr(O),Va(),A&&!ot()&&ps(),O.markAsRead().catch(j=>{console.warn("Failed to mark messages as read:",j)});return}bn.getAllSessions().forEach(j=>{j.close()}),Or(),Dr(null);const V=bn.openSession(w,{onMessage:(j,he,Ne)=>{if(he._reactionUpdate){const De={};if(he.reactions)for(const[le,Ot]of Object.entries(he.reactions))De[le]=Object.keys(Ot);Ud(he.messageId,De);return}const bt={};if(he.reactions)for(const[De,le]of Object.entries(he.reactions))bt[De]=Object.keys(le);if(Ne)Se(j,{isSentByMe:!0,messageId:he.messageId,reactions:bt});else{const De=!he.read;Md(j,{isUnread:De,messageId:he.messageId,reactions:bt})}}});V.contactName=R,Dr(V),Va(),A&&!ot()&&ps(),V.markAsRead().catch(j=>{console.warn("Failed to mark messages as read:",j)})}return{appendChatMessage:Se,receiveMessage:Md,updateMessageReactions:Ud,isMessagesUIOpen:ot,toggleMessages:ps,showMessagesToggle:Va,hideMessagesToggle:Od,isMessageInputFocused:Ha,focusMessageInput:$w,unfocusMessageInput:Bw,setSession:Dr,getCurrentSession:Vw,clearMessages:Or,setFileTransfer:jw,openContactMessages:zw,reset:Ww,cleanup:qw}}const li=iO();class sO{constructor(){this.listeners=new Map}on(e,n){this.listeners.has(e)||this.listeners.set(e,new Set),this.listeners.get(e).add(n)}off(e,n){this.listeners.has(e)&&this.listeners.get(e).delete(n)}emit(e,n){if(this.listeners.has(e))for(const i of Array.from(this.listeners.get(e)))try{i(n)}catch(s){console.warn("CallController listener error",s)}}}class rO{constructor(){this.emitter=new sO,this.resetState()}resetState(){this.state="idle",this.roomId=null,this.roomLink=null,this.role=null,this.partnerId=null,this.pc=null,this.dataChannel=null,this.messagesUI=null,this.localVideoEl=null,this.remoteVideoEl=null,this.isHangingUp=!1,this.isCleaningUp=!1,this.listeners=new Map,this.wasConnected=!1}getState(){return{state:this.state,roomId:this.roomId,roomLink:this.roomLink,role:this.role,partnerId:this.partnerId,hasPc:!!this.pc,isHangingUp:this.isHangingUp,isCleaningUp:this.isCleaningUp}}getPeerConnection(){if(!this.pc)return console.warn("CallController.getPeerConnection: pc is null",{state:this.state,roomId:this.roomId,role:this.role,isHangingUp:this.isHangingUp,isCleaningUp:this.isCleaningUp}),null;const{connectionState:e,iceConnectionState:n,signalingState:i}=this.pc;return(e==="closed"||n==="closed")&&console.warn("CallController.getPeerConnection: pc is closed",{connectionState:e,iceConnectionState:n,signalingState:i}),this.pc}on(e,n){this.emitter.on(e,n)}off(e,n){this.emitter.off(e,n)}setPartnerId(e){this.partnerId=e}setupCancellationListener(e){if(!e)return;const n=b(E,`rooms/${e}/cancellation`);let i=!1;const s=async r=>{const o=r.val();if(!o||i)return;const a=fe();if(o.by!==a){i=!0;try{this.remoteVideoEl&&(this.remoteVideoEl.srcObject=null)}catch(c){console.warn("Failed to clear remote video after cancellation",c)}try{this.pc&&this.pc.close()}catch{}try{await this.cleanupCall({reason:o.reason||"remote_cancelled"})}catch(c){console.warn("Failed to trigger CallController cleanup",c)}}};Ii(n,s,e),this.listeners.has("cancellation")||this.listeners.set("cancellation",[]),this.listeners.get("cancellation").push({ref:n,callback:s,roomId:e})}setupAnswerListener(e,n,i){if(!e||!n)return;const s=b(E,`rooms/${e}/answer`),r=async o=>{const a=o.val();if(a){const{setRemoteDescription:c}=await ue(async()=>{const{setRemoteDescription:l}=await Promise.resolve().then(()=>CL);return{setRemoteDescription:l}},void 0);await c(n,a,i)}};Ii(s,r,e),this.listeners.has("answer")||this.listeners.set("answer",[]),this.listeners.get("answer").push({ref:s,callback:r,roomId:e})}setupRejectionListener(e){if(!e)return;const n=b(E,`rooms/${e}/rejection`);let i=!1;const s=async r=>{const o=r.val();if(o&&!i&&(i=!0,this.pc?.connectionState!=="connected")){try{const{onCallRejected:a}=await ue(async()=>{const{onCallRejected:c}=await Promise.resolve().then(()=>Ty);return{onCallRejected:c}},void 0);await a(o.reason||"user_rejected")}catch{}try{await ce.leaveRoom(fe(),e)}catch{}try{this.pc&&this.pc.close()}catch{}}};Ii(n,s,e),this.listeners.has("rejection")||this.listeners.set("rejection",[]),this.listeners.get("rejection").push({ref:n,callback:s,roomId:e})}setupMemberJoinedListener(e){if(!e)return;const n=fe(),i=s=>{s.key!==n&&(this.setPartnerId(s.key),this.emitter.emit("memberJoined",{memberId:s.key,roomId:e}))};ce.onMemberJoined(e,i),this.listeners.has("member-joined")||this.listeners.set("member-joined",[]),this.listeners.get("member-joined").push({callback:i,roomId:e})}setupMemberLeftListener(e){if(!e)return;const n=fe(),i=s=>{s.key!==n&&this.pc?.connectionState==="connected"&&this.emitter.emit("memberLeft",{memberId:s.key,roomId:e})};ce.onMemberLeft(e,i),this.listeners.has("member-left")||this.listeners.set("member-left",[]),this.listeners.get("member-left").push({callback:i,roomId:e})}removeTrackedListeners(){try{for(const[e,n]of this.listeners.entries())for(const i of n)try{i.ref&&ut(i.ref,"value",i.callback)}catch(s){console.warn(`Failed to remove ${e} listener`,s)}}catch(e){console.warn("Failed to remove tracked listeners",e)}finally{this.listeners.clear()}if(this.roomId)try{Sr(this.roomId)}catch(e){console.warn("Failed to remove RTDB listeners for room",e)}}async createCall(e={}){this.state="creating";try{e.localVideoEl&&(this.localVideoEl=e.localVideoEl),e.remoteVideoEl&&(this.remoteVideoEl=e.remoteVideoEl);const n=await TL(e);if(!n||!n.success)return this.state="idle",this.emitter.emit("error",{phase:"createCall",detail:n}),this.emitCallFailed("createCall",n),n;this.pc=n.pc,this.roomId=n.roomId,this.roomLink=n.roomLink||null,this.role=n.role||"initiator",this.dataChannel=n.dataChannel||null,this.messagesUI=n.messagesUI||null,this.state="waiting",this.pc&&typeof this.pc.addEventListener=="function"&&this.pc.addEventListener("connectionstatechange",()=>{this.pc.connectionState==="connected"&&(this.wasConnected=!0,this.state!=="connected"&&(this.state="connected"))}),this.dataChannel&&this.setupFileTransport(this.dataChannel);const{drainIceCandidateQueue:i}=await ue(async()=>{const{drainIceCandidateQueue:s}=await Promise.resolve().then(()=>z0);return{drainIceCandidateQueue:s}},void 0);return this.setupAnswerListener(this.roomId,this.pc,i),this.setupCancellationListener(this.roomId),this.setupRejectionListener(this.roomId),this.setupMemberJoinedListener(this.roomId),this.setupMemberLeftListener(this.roomId),this.emitter.emit("created",{roomId:this.roomId,roomLink:this.roomLink,role:this.role}),n}catch(n){throw this.state="idle",this.emitter.emit("error",{phase:"createCall",error:n}),this.emitCallFailed("createCall",n),n}}async answerCall(e={}){this.state="joining";try{e.localVideoEl&&(this.localVideoEl=e.localVideoEl),e.remoteVideoEl&&(this.remoteVideoEl=e.remoteVideoEl);const i=await SL({...e,onMessagesUIReady:s=>{this.messagesUI=s}});return!i||!i.success?(this.state="idle",this.emitter.emit("error",{phase:"answerCall",detail:i}),this.emitCallFailed("answerCall",i),i):(this.pc=i.pc,this.roomId=i.roomId,this.role=i.role||"joiner",this.dataChannel=i.dataChannel||null,!this.messagesUI&&i.messagesUI&&(this.messagesUI=i.messagesUI),this.state="connected",this.wasConnected=!0,this.dataChannel?this.setupFileTransport(this.dataChannel):this.role==="joiner"&&this.pc&&(this.pc.ondatachannel=s=>{this.dataChannel=s.channel,this.setupFileTransport(this.dataChannel)}),this.setupCancellationListener(this.roomId),this.setupMemberJoinedListener(this.roomId),this.setupMemberLeftListener(this.roomId),this.emitter.emit("answered",{roomId:this.roomId,role:this.role}),i)}catch(n){throw this.state="idle",this.emitter.emit("error",{phase:"answerCall",error:n}),this.emitCallFailed("answerCall",n),n}}setupFileTransport(e){if(!e)return;const n=()=>{try{const i=new OL(e);bn.setFileTransport(i),li.setFileTransfer(i.fileTransfer),q("[CallController] File transport initialized")}catch(i){console.error("[CallController] Failed to setup file transport:",i)}};e.readyState==="open"?n():e.addEventListener("open",n,{once:!0})}async hangUp({emitCancel:e=!0,reason:n="user_hung_up"}={}){if(!this.isHangingUp){this.isHangingUp=!0;try{if(e&&this.roomId)try{await ce.cancelCall(this.roomId,fe(),n)}catch(i){console.warn("CallController: cancelCall failed (non-fatal)",i)}await this.cleanupCall({reason:n}),this.emitter.emit("hangup",{roomId:this.roomId,reason:n})}catch(i){throw this.emitter.emit("error",{phase:"hangUp",error:i}),i}finally{this.isHangingUp=!1}}}isRemoteHangup(e){return e?["remote","cancelled","partner_disconnected","connection_failed"].some(i=>e.includes(i)):!1}emitCallFailed(e,n){this.emitter.emit("callFailed",{phase:e,error:n?.message||n?.error||n||"Unknown error"})}async cleanupCall({reason:e}={}){if(!this.isCleaningUp){this.isCleaningUp=!0;try{const n=this.roomId,i=this.partnerId,s=this.role,r=this.wasConnected;this.removeTrackedListeners();try{await ce.leaveRoom(fe(),this.roomId)}catch{}try{if(this.pc){try{this.pc.close()}catch{}this.pc=null}}catch{}try{this.remoteVideoEl&&(this.remoteVideoEl.srcObject=null)}catch(o){console.warn("CallController: failed to clear remote video",o)}try{this.localVideoEl&&(this.localVideoEl.srcObject=null)}catch(o){console.warn("CallController: failed to clear local video",o)}try{const{cleanupLocalStream:o}=await ue(async()=>{const{cleanupLocalStream:a}=await Promise.resolve().then(()=>tL);return{cleanupLocalStream:a}},void 0);o()}catch(o){console.warn("CallController: failed to cleanup local stream",o)}try{const{resetLocalStreamInitFlag:o}=await ue(async()=>{const{resetLocalStreamInitFlag:a}=await Promise.resolve().then(()=>VM);return{resetLocalStreamInitFlag:a}},void 0);o()}catch{}this.isRemoteHangup(e)&&this.emitter.emit("remoteHangup",{roomId:n,partnerId:i,reason:e});try{bn.clearFileTransport(),li.setFileTransfer(null)}catch(o){console.warn("CallController: failed to cleanup file transport",o)}if(this.messagesUI&&this.messagesUI.cleanup)try{this.messagesUI.cleanup()}catch(o){console.warn("CallController: failed to cleanup messages UI",o)}this.resetState(),this.emitter.emit("cleanup",{roomId:n,role:s,wasConnected:r,partnerId:i,reason:e})}catch(n){throw this.emitter.emit("error",{phase:"cleanupCall",error:n}),n}finally{this.isCleaningUp=!1}}}}const Ce=new rO,Il={default:{echoCancellation:!0,noiseSuppression:!0,autoGainControl:!0},withVoiceIsolationIfSupported:{echoCancellation:!0,noiseSuppression:!0,autoGainControl:!0,voiceIsolation:!0,restrictOwnAudio:!0,googHighpassFilter:!0,googTypingNoiseDetection:!0,highpassFilter:!0,typingNoiseDetection:!0}};function iw(){const t=navigator.mediaDevices.getSupportedConstraints();return["voiceIsolation","highpassFilter","typingNoiseDetection"].every(i=>t[i])?Il.withVoiceIsolationIfSupported:Il.default}const oO=()=>Il.default,aO={landscape:{width:{ideal:1920},height:{ideal:1080},frameRate:{min:10,ideal:30}},portrait:{width:{ideal:1080},height:{ideal:1920},frameRate:{min:10,ideal:30}}},cO=()=>{const t=window.matchMedia?.("(orientation: portrait)");if(t)return t.matches;const e=window.screen?.orientation?.type;return typeof e=="string"?e.includes("portrait"):window.innerHeight>=window.innerWidth};function sw(t,e=null){if(e===null&&(e=cO()?"portrait":"landscape"),/Mobi|Android/i.test(navigator.userAgent))return{facingMode:t};const i=aO[e];return{facingMode:t,...i}}const lO=async()=>{if(xy())return console.debug("Reusing existing local MediaStream."),Oa();const t=sw("user"),e=iw();try{const n=await navigator.mediaDevices.getUserMedia({video:t,audio:e});return $o(n),n}catch(n){if(n.name==="OverconstrainedError"){console.warn(`❌ Constraint failed on property: ${n.constraint}, falling back to basic constraints`);const i=oO(),s=await navigator.mediaDevices.getUserMedia({video:!0,audio:i});return $o(s),s}throw n}};async function uO(t){const e=await lO(),n=new MediaStream(e.getVideoTracks());return t.srcObject=n,!0}function dO(t,e,n){return t.ontrack=i=>{q(`REMOTE TRACK RECEIVED: ${i.track.kind}`);const s=La()?fd():null;let r;i.streams&&i.streams[0]&&i.streams[0]instanceof MediaStream?r=i.streams[0]:(console.warn("No stream in track event, using fallback track handling"),s?(s.addTrack(i.track),r=s):r=new MediaStream([i.track])),Dy(r),e.srcObject=r,i.track.kind==="video"&&(e.readyState>=1?e.style.opacity="1":(e.style.opacity="0",e.addEventListener("loadedmetadata",()=>{e.style.opacity="1"},{once:!0}))),s!==r||q(`Added ${i.track.kind} track to existing remote stream`);try{const o=document.getElementById("remote-video-box")||e.parentElement;o&&(o.classList?.remove("hidden"),e.classList?.remove("hidden"),o.style.visibility="visible",o.style.opacity="1",o.style.position="",o.style.left="",o.style.top="",e.style.visibility="visible")}catch(o){console.warn("Visibility override failed:",o)}},!0}let no=null,It=null;async function lp(t,e="User"){const n=D(),i=An();if(!n||!i)throw new Error("Must be logged in to send invites");if(!t)throw new Error("Recipient user ID is required");const s=rr(n,t),r=b(E,`users/${t}/incomingInvites/${n}`),o={fromUserId:n,fromName:i.displayName||"Anonymous",fromEmail:i.email||"",fromPhotoURL:i.photoURL||null,roomId:s,timestamp:Date.now(),status:"pending"};await ee(r,o),console.log(`[INVITATIONS] Sent invite to ${e} (${t})`)}function hO(t){const e=D();if(!e)return console.warn("[INVITATIONS] Cannot listen for invites - not logged in"),()=>{};kl();const n=b(E,`users/${e}/incomingInvites`);return no=Ki(n,i=>{const s=i.key,r=i.val();r&&r.status==="pending"&&(console.log(`[INVITATIONS] New invite from ${r.fromName}`),t(s,r))}),console.log("[INVITATIONS] Listening for incoming invites"),kl}async function rw(t,e){const n=D(),i=An();if(!n||!i)throw new Error("Must be logged in to accept invites");const s=b(E,`users/${n}/contacts/${t}`);await ee(s,{contactId:t,contactName:e.fromName||"User",roomId:e.roomId,savedAt:Date.now()});const r=b(E,`users/${t}/acceptedInvites/${n}`);await ee(r,{acceptedByUserId:n,acceptedByName:i.displayName||"User",acceptedByEmail:i.email||"",acceptedByPhotoURL:i.photoURL||null,roomId:e.roomId,timestamp:Date.now()});const o=b(E,`users/${n}/incomingInvites/${t}`);await Xe(o),console.log(`[INVITATIONS] Accepted invite from ${e.fromName} and notified sender`)}async function fO(t){const e=D();if(!e)throw new Error("Must be logged in to decline invites");const n=b(E,`users/${e}/incomingInvites/${t}`);await Xe(n),console.log(`[INVITATIONS] Declined invite from ${t}`)}function pO(t){const e=D();if(!e)return console.warn("[INVITATIONS] Cannot listen for accepted invites - not logged in"),()=>{};It&&(It(),It=null);const n=b(E,`users/${e}/acceptedInvites`);return It=Ki(n,async i=>{const s=i.key,r=i.val();if(r)try{const o=b(E,`users/${e}/contacts/${s}`);await ee(o,{contactId:s,contactName:r.acceptedByName||"User",roomId:r.roomId,savedAt:Date.now()}),console.log(`[INVITATIONS] Auto-saved contact: ${r.acceptedByName} (invite accepted)`);const a=b(E,`users/${e}/acceptedInvites/${s}`);await Xe(a),t&&t(s,r)}catch(o){console.error("[INVITATIONS] Failed to auto-save contact from accepted invite:",o)}}),console.log("[INVITATIONS] Listening for accepted invites"),()=>{It&&(It(),It=null)}}function kl(){no&&(no(),no=null),It&&(It(),It=null),console.log("[INVITATIONS] Cleaned up all invite listeners")}function vd({template:t,handlers:e={},className:n="notification",parent:i=document.body,initialProps:s={},...r}){return Da({template:t,handlers:e,className:n,parent:i,initialProps:s,containerTag:"div",autoAppend:!1,...r})}function gO({referrerName:t,referrerPhotoURL:e,onSignIn:n}){const i=t||"Someone",s=e?`<img src="${Ze(e)}" alt="${Ze(i)}" class="notification-avatar" />`:'<span class="notification-icon">👤</span>';return vd({template:`
      <div class="notification-content">
        <div class="notification-header">
          ${s}
          <span class="notification-title">You've been invited</span>
        </div>
        <div class="notification-body">
          <p class="notification-message">
            <strong>${Ze(i)}</strong> invited you to connect
          </p>
          <p class="notification-detail">Sign in to add them as a contact</p>
        </div>
        <div class="notification-actions">
          <button class="notification-btn notification-btn-accept" onclick="handleSignIn">
            Sign in
          </button>
        </div>
      </div>
    `,className:"notification referral-notification",handlers:{handleSignIn:async r=>{const o=r.target;o.disabled=!0,o.textContent="Signing in...";try{n&&await n()}catch(a){console.error("[REFERRAL NOTIFICATION] Sign-in failed:",a),o.disabled=!1,o.textContent="Sign in"}}}})}class mO{constructor(){this.notifications=new Map,this.toggle=null,this.container=null,this.clickOutsideCleanup=null}setToggle(e){this.toggle=e,this.toggle.setManager&&this.toggle.setManager(this),this.createContainer(),this.updateToggle()}createContainer(){this.container||(this.container=document.createElement("div"),this.container.className="notifications-list-container",this.container.style.display="none",document.body.appendChild(this.container))}showList(){this.container&&(this.container.style.display="flex",this.setupClickOutside())}hideList(){this.container&&(this.container.style.display="none",this.cleanupClickOutside())}setupClickOutside(){this.clickOutsideCleanup||(this.clickOutsideCleanup=ur(this.container,()=>this.hideList(),{ignore:this.toggle?[this.toggle]:[],esc:!0}))}cleanupClickOutside(){this.clickOutsideCleanup&&(this.clickOutsideCleanup(),this.clickOutsideCleanup=null)}toggleList(){this.container&&(this.container.style.display==="none"?this.showList():this.hideList())}isListVisible(){return this.container&&this.container.style.display!=="none"}add(e,n){this.notifications.has(e)&&this.remove(e),this.container||this.createContainer(),n.parentElement===document.body&&n.remove(),this.container.prepend(n),this.notifications.set(e,n),this.updateToggle(),n._originalDispose||(n._originalDispose=n.dispose);const i=n._originalDispose;n.dispose=()=>{i&&i.call(n),n.parentElement&&n.remove(),this.notifications.delete(e),this.updateToggle(),n.dispose=i,delete n._originalDispose}}remove(e){const n=this.notifications.get(e);n&&(n.dispose&&n.dispose(),this.notifications.delete(e),this.updateToggle())}getCount(){return this.notifications.size}has(e){return this.notifications.has(e)}clear(){this.notifications.forEach(e=>{e.dispose&&e.dispose()}),this.notifications.clear(),this.updateToggle()}updateToggle(){this.toggle&&this.toggle.setUnread(this.getCount())}}const ke=new mO;async function _O(){const e=new URLSearchParams(window.location.search).get("ref");if(e){console.log("[REFERRAL] Captured referrer ID:",e),localStorage.setItem("referredBy",e);const n=new URL(window.location.href);n.searchParams.delete("ref"),window.history.replaceState({},"",n.toString());const i=await fy(e),s=i?.displayName||null,r=i?.photoURL||null,o=s?`${s} invited you — tap here to sign in and connect`:"Tap here to sign in and connect with your inviter";nw(o,{duration:8e3,onClick:()=>xo()});const a=gO({referrerName:s,referrerPhotoURL:r,onSignIn:()=>xo()});ke.add(`referral-${e}`,a)}}async function up(){const t=localStorage.getItem("referredBy"),e=D();if(!(!t||!e)){if(t===e){console.log("[REFERRAL] Self-referral detected, skipping"),localStorage.removeItem("referredBy");return}try{console.log("[REFERRAL] Processing referral from:",t);const n=await fy(t),i=n?.displayName||t,s=n?.photoURL||null,r=rr(e,t),o={fromUserId:t,fromName:i,fromEmail:"",fromPhotoURL:s,roomId:r,timestamp:Date.now(),status:"pending"};await rw(t,o),console.log(`[REFERRAL] ✅ Connected with ${i} via referral link!`),xa(`✅ Connected with ${i}!`),ke.remove(`referral-${t}`),localStorage.removeItem("referredBy")}catch(n){console.error("[REFERRAL] Failed to process referral:",n)}}}let xi=null;function Fa(t,e={}){return new Promise(n=>{const i=document.createElement("dialog");i.innerHTML=`
      <p>${t}</p>
      <div class="confirm-dialog-actions">
        <button data-action="cancel">Cancel</button>
        <button data-action="confirm" autofocus>Confirm</button>
      </div>
    `,i.classList.add("confirm-dialog");const s=i.querySelector('[data-action="confirm"]'),r=i.querySelector('[data-action="cancel"]');if(!s||!r){console.error("dialog element not found!"),n(!1);return}let o=null;function a(c){o&&clearTimeout(o),i.close(),i.remove(),xi===a&&(xi=null),n(c)}s.addEventListener("click",()=>{a(!0)}),r.addEventListener("click",()=>{a(!1)}),i.addEventListener("cancel",()=>a(!1)),document.body.appendChild(i),i.showModal(),xi=a,e.autoRemoveSeconds&&typeof e.autoRemoveSeconds=="number"&&e.autoRemoveSeconds>0&&(o=setTimeout(()=>{a(!1)},e.autoRemoveSeconds*1e3))})}function yO(){if(typeof xi=="function"){try{xi(!1)}catch{}return xi=null,!0}return!1}const wO=Object.freeze(Object.defineProperty({__proto__:null,default:Fa,dismissActiveConfirmDialog:yO},Symbol.toStringTag,{value:"Module"})),ow="@firebase/installations",bd="0.6.19";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const aw=1e4,cw=`w:${bd}`,lw="FIS_v2",vO="https://firebaseinstallations.googleapis.com/v1",bO=3600*1e3,EO="installations",CO="Installations";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const TO={"missing-app-config-values":'Missing App configuration value: "{$valueName}"',"not-registered":"Firebase Installation is not registered.","installation-not-found":"Firebase Installation not found.","request-failed":'{$requestName} request failed with error "{$serverCode} {$serverStatus}: {$serverMessage}"',"app-offline":"Could not process request. Application offline.","delete-pending-registration":"Can't delete installation while there is a pending registration request."},ui=new On(EO,CO,TO);function uw(t){return t instanceof Zt&&t.code.includes("request-failed")}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function dw({projectId:t}){return`${vO}/projects/${t}/installations`}function hw(t){return{token:t.token,requestStatus:2,expiresIn:IO(t.expiresIn),creationTime:Date.now()}}async function fw(t,e){const i=(await e.json()).error;return ui.create("request-failed",{requestName:t,serverCode:i.code,serverMessage:i.message,serverStatus:i.status})}function pw({apiKey:t}){return new Headers({"Content-Type":"application/json",Accept:"application/json","x-goog-api-key":t})}function SO(t,{refreshToken:e}){const n=pw(t);return n.append("Authorization",kO(e)),n}async function gw(t){const e=await t();return e.status>=500&&e.status<600?t():e}function IO(t){return Number(t.replace("s","000"))}function kO(t){return`${lw} ${t}`}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function RO({appConfig:t,heartbeatServiceProvider:e},{fid:n}){const i=dw(t),s=pw(t),r=e.getImmediate({optional:!0});if(r){const l=await r.getHeartbeatsHeader();l&&s.append("x-firebase-client",l)}const o={fid:n,authVersion:lw,appId:t.appId,sdkVersion:cw},a={method:"POST",headers:s,body:JSON.stringify(o)},c=await gw(()=>fetch(i,a));if(c.ok){const l=await c.json();return{fid:l.fid||n,registrationStatus:2,refreshToken:l.refreshToken,authToken:hw(l.authToken)}}else throw await fw("Create Installation",c)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function mw(t){return new Promise(e=>{setTimeout(e,t)})}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function AO(t){return btoa(String.fromCharCode(...t)).replace(/\+/g,"-").replace(/\//g,"_")}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const NO=/^[cdef][\w-]{21}$/,Rl="";function PO(){try{const t=new Uint8Array(17);(self.crypto||self.msCrypto).getRandomValues(t),t[0]=112+t[0]%16;const n=LO(t);return NO.test(n)?n:Rl}catch{return Rl}}function LO(t){return AO(t).substr(0,22)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ua(t){return`${t.appName}!${t.appId}`}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const _w=new Map;function yw(t,e){const n=Ua(t);ww(n,e),OO(n,e)}function ww(t,e){const n=_w.get(t);if(n)for(const i of n)i(e)}function OO(t,e){const n=DO();n&&n.postMessage({key:t,fid:e}),MO()}let qn=null;function DO(){return!qn&&"BroadcastChannel"in self&&(qn=new BroadcastChannel("[Firebase] FID Change"),qn.onmessage=t=>{ww(t.data.key,t.data.fid)}),qn}function MO(){_w.size===0&&qn&&(qn.close(),qn=null)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const xO="firebase-installations-database",FO=1,di="firebase-installations-store";let bc=null;function Ed(){return bc||(bc=sa(xO,FO,{upgrade:(t,e)=>{switch(e){case 0:t.createObjectStore(di)}}})),bc}async function jo(t,e){const n=Ua(t),s=(await Ed()).transaction(di,"readwrite"),r=s.objectStore(di),o=await r.get(n);return await r.put(e,n),await s.done,(!o||o.fid!==e.fid)&&yw(t,e.fid),e}async function vw(t){const e=Ua(t),i=(await Ed()).transaction(di,"readwrite");await i.objectStore(di).delete(e),await i.done}async function $a(t,e){const n=Ua(t),s=(await Ed()).transaction(di,"readwrite"),r=s.objectStore(di),o=await r.get(n),a=e(o);return a===void 0?await r.delete(n):await r.put(a,n),await s.done,a&&(!o||o.fid!==a.fid)&&yw(t,a.fid),a}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Cd(t){let e;const n=await $a(t.appConfig,i=>{const s=UO(i),r=$O(t,s);return e=r.registrationPromise,r.installationEntry});return n.fid===Rl?{installationEntry:await e}:{installationEntry:n,registrationPromise:e}}function UO(t){const e=t||{fid:PO(),registrationStatus:0};return bw(e)}function $O(t,e){if(e.registrationStatus===0){if(!navigator.onLine){const s=Promise.reject(ui.create("app-offline"));return{installationEntry:e,registrationPromise:s}}const n={fid:e.fid,registrationStatus:1,registrationTime:Date.now()},i=BO(t,n);return{installationEntry:n,registrationPromise:i}}else return e.registrationStatus===1?{installationEntry:e,registrationPromise:HO(t)}:{installationEntry:e}}async function BO(t,e){try{const n=await RO(t,e);return jo(t.appConfig,n)}catch(n){throw uw(n)&&n.customData.serverCode===409?await vw(t.appConfig):await jo(t.appConfig,{fid:e.fid,registrationStatus:0}),n}}async function HO(t){let e=await dp(t.appConfig);for(;e.registrationStatus===1;)await mw(100),e=await dp(t.appConfig);if(e.registrationStatus===0){const{installationEntry:n,registrationPromise:i}=await Cd(t);return i||n}return e}function dp(t){return $a(t,e=>{if(!e)throw ui.create("installation-not-found");return bw(e)})}function bw(t){return VO(t)?{fid:t.fid,registrationStatus:0}:t}function VO(t){return t.registrationStatus===1&&t.registrationTime+aw<Date.now()}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function jO({appConfig:t,heartbeatServiceProvider:e},n){const i=WO(t,n),s=SO(t,n),r=e.getImmediate({optional:!0});if(r){const l=await r.getHeartbeatsHeader();l&&s.append("x-firebase-client",l)}const o={installation:{sdkVersion:cw,appId:t.appId}},a={method:"POST",headers:s,body:JSON.stringify(o)},c=await gw(()=>fetch(i,a));if(c.ok){const l=await c.json();return hw(l)}else throw await fw("Generate Auth Token",c)}function WO(t,{fid:e}){return`${dw(t)}/${e}/authTokens:generate`}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Td(t,e=!1){let n;const i=await $a(t.appConfig,r=>{if(!Ew(r))throw ui.create("not-registered");const o=r.authToken;if(!e&&GO(o))return r;if(o.requestStatus===1)return n=qO(t,e),r;{if(!navigator.onLine)throw ui.create("app-offline");const a=YO(r);return n=zO(t,a),a}});return n?await n:i.authToken}async function qO(t,e){let n=await hp(t.appConfig);for(;n.authToken.requestStatus===1;)await mw(100),n=await hp(t.appConfig);const i=n.authToken;return i.requestStatus===0?Td(t,e):i}function hp(t){return $a(t,e=>{if(!Ew(e))throw ui.create("not-registered");const n=e.authToken;return JO(n)?{...e,authToken:{requestStatus:0}}:e})}async function zO(t,e){try{const n=await jO(t,e),i={...e,authToken:n};return await jo(t.appConfig,i),n}catch(n){if(uw(n)&&(n.customData.serverCode===401||n.customData.serverCode===404))await vw(t.appConfig);else{const i={...e,authToken:{requestStatus:0}};await jo(t.appConfig,i)}throw n}}function Ew(t){return t!==void 0&&t.registrationStatus===2}function GO(t){return t.requestStatus===2&&!KO(t)}function KO(t){const e=Date.now();return e<t.creationTime||t.creationTime+t.expiresIn<e+bO}function YO(t){const e={requestStatus:1,requestTime:Date.now()};return{...t,authToken:e}}function JO(t){return t.requestStatus===1&&t.requestTime+aw<Date.now()}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function XO(t){const e=t,{installationEntry:n,registrationPromise:i}=await Cd(e);return i?i.catch(console.error):Td(e).catch(console.error),n.fid}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function QO(t,e=!1){const n=t;return await ZO(n),(await Td(n,e)).token}async function ZO(t){const{registrationPromise:e}=await Cd(t);e&&await e}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function eD(t){if(!t||!t.options)throw Ec("App Configuration");if(!t.name)throw Ec("App Name");const e=["projectId","apiKey","appId"];for(const n of e)if(!t.options[n])throw Ec(n);return{appName:t.name,projectId:t.options.projectId,apiKey:t.options.apiKey,appId:t.options.appId}}function Ec(t){return ui.create("missing-app-config-values",{valueName:t})}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Cw="installations",tD="installations-internal",nD=t=>{const e=t.getProvider("app").getImmediate(),n=eD(e),i=Dn(e,"heartbeat");return{app:e,appConfig:n,heartbeatServiceProvider:i,_delete:()=>Promise.resolve()}},iD=t=>{const e=t.getProvider("app").getImmediate(),n=Dn(e,Cw).getImmediate();return{getId:()=>XO(n),getToken:s=>QO(n,s)}};function sD(){st(new Je(Cw,nD,"PUBLIC")),st(new Je(tD,iD,"PRIVATE"))}sD();Ke(ow,bd);Ke(ow,bd,"esm2020");/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const rD="/firebase-messaging-sw.js",oD="/firebase-cloud-messaging-push-scope",Tw="BDOU99-h67HcA6JeFXHbSNMu7e2yNNu3RzoMj8TM4W88jITfq7ZmPvIM1Iv-4_l2LxQcYwhqby2xGpWwzjfAnG4",aD="https://fcmregistrations.googleapis.com/v1",Sw="google.c.a.c_id",cD="google.c.a.c_l",lD="google.c.a.ts",uD="google.c.a.e",fp=1e4;var pp;(function(t){t[t.DATA_MESSAGE=1]="DATA_MESSAGE",t[t.DISPLAY_NOTIFICATION=3]="DISPLAY_NOTIFICATION"})(pp||(pp={}));/**
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
 */var dr;(function(t){t.PUSH_RECEIVED="push-received",t.NOTIFICATION_CLICKED="notification-clicked"})(dr||(dr={}));/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Mt(t){const e=new Uint8Array(t);return btoa(String.fromCharCode(...e)).replace(/=/g,"").replace(/\+/g,"-").replace(/\//g,"_")}function dD(t){const e="=".repeat((4-t.length%4)%4),n=(t+e).replace(/\-/g,"+").replace(/_/g,"/"),i=atob(n),s=new Uint8Array(i.length);for(let r=0;r<i.length;++r)s[r]=i.charCodeAt(r);return s}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Cc="fcm_token_details_db",hD=5,gp="fcm_token_object_Store";async function fD(t){if("databases"in indexedDB&&!(await indexedDB.databases()).map(r=>r.name).includes(Cc))return null;let e=null;return(await sa(Cc,hD,{upgrade:async(i,s,r,o)=>{if(s<2||!i.objectStoreNames.contains(gp))return;const a=o.objectStore(gp),c=await a.index("fcmSenderId").get(t);if(await a.clear(),!!c){if(s===2){const l=c;if(!l.auth||!l.p256dh||!l.endpoint)return;e={token:l.fcmToken,createTime:l.createTime??Date.now(),subscriptionOptions:{auth:l.auth,p256dh:l.p256dh,endpoint:l.endpoint,swScope:l.swScope,vapidKey:typeof l.vapidKey=="string"?l.vapidKey:Mt(l.vapidKey)}}}else if(s===3){const l=c;e={token:l.fcmToken,createTime:l.createTime,subscriptionOptions:{auth:Mt(l.auth),p256dh:Mt(l.p256dh),endpoint:l.endpoint,swScope:l.swScope,vapidKey:Mt(l.vapidKey)}}}else if(s===4){const l=c;e={token:l.fcmToken,createTime:l.createTime,subscriptionOptions:{auth:Mt(l.auth),p256dh:Mt(l.p256dh),endpoint:l.endpoint,swScope:l.swScope,vapidKey:Mt(l.vapidKey)}}}}}})).close(),await tc(Cc),await tc("fcm_vapid_details_db"),await tc("undefined"),pD(e)?e:null}function pD(t){if(!t||!t.subscriptionOptions)return!1;const{subscriptionOptions:e}=t;return typeof t.createTime=="number"&&t.createTime>0&&typeof t.token=="string"&&t.token.length>0&&typeof e.auth=="string"&&e.auth.length>0&&typeof e.p256dh=="string"&&e.p256dh.length>0&&typeof e.endpoint=="string"&&e.endpoint.length>0&&typeof e.swScope=="string"&&e.swScope.length>0&&typeof e.vapidKey=="string"&&e.vapidKey.length>0}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const gD="firebase-messaging-database",mD=1,hi="firebase-messaging-store";let Tc=null;function Sd(){return Tc||(Tc=sa(gD,mD,{upgrade:(t,e)=>{switch(e){case 0:t.createObjectStore(hi)}}})),Tc}async function Iw(t){const e=kd(t),i=await(await Sd()).transaction(hi).objectStore(hi).get(e);if(i)return i;{const s=await fD(t.appConfig.senderId);if(s)return await Id(t,s),s}}async function Id(t,e){const n=kd(t),s=(await Sd()).transaction(hi,"readwrite");return await s.objectStore(hi).put(e,n),await s.done,e}async function _D(t){const e=kd(t),i=(await Sd()).transaction(hi,"readwrite");await i.objectStore(hi).delete(e),await i.done}function kd({appConfig:t}){return t.appId}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const yD={"missing-app-config-values":'Missing App configuration value: "{$valueName}"',"only-available-in-window":"This method is available in a Window context.","only-available-in-sw":"This method is available in a service worker context.","permission-default":"The notification permission was not granted and dismissed instead.","permission-blocked":"The notification permission was not granted and blocked instead.","unsupported-browser":"This browser doesn't support the API's required to use the Firebase SDK.","indexed-db-unsupported":"This browser doesn't support indexedDb.open() (ex. Safari iFrame, Firefox Private Browsing, etc)","failed-service-worker-registration":"We are unable to register the default service worker. {$browserErrorMessage}","token-subscribe-failed":"A problem occurred while subscribing the user to FCM: {$errorInfo}","token-subscribe-no-token":"FCM returned no token when subscribing the user to push.","token-unsubscribe-failed":"A problem occurred while unsubscribing the user from FCM: {$errorInfo}","token-update-failed":"A problem occurred while updating the user from FCM: {$errorInfo}","token-update-no-token":"FCM returned no token when updating the user to push.","use-sw-after-get-token":"The useServiceWorker() method may only be called once and must be called before calling getToken() to ensure your service worker is used.","invalid-sw-registration":"The input to useServiceWorker() must be a ServiceWorkerRegistration.","invalid-bg-handler":"The input to setBackgroundMessageHandler() must be a function.","invalid-vapid-key":"The public VAPID key must be a string.","use-vapid-key-after-get-token":"The usePublicVapidKey() method may only be called once and must be called before calling getToken() to ensure your VAPID key is used."},Ae=new On("messaging","Messaging",yD);/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function wD(t,e){const n=await Ad(t),i=Rw(e),s={method:"POST",headers:n,body:JSON.stringify(i)};let r;try{r=await(await fetch(Rd(t.appConfig),s)).json()}catch(o){throw Ae.create("token-subscribe-failed",{errorInfo:o?.toString()})}if(r.error){const o=r.error.message;throw Ae.create("token-subscribe-failed",{errorInfo:o})}if(!r.token)throw Ae.create("token-subscribe-no-token");return r.token}async function vD(t,e){const n=await Ad(t),i=Rw(e.subscriptionOptions),s={method:"PATCH",headers:n,body:JSON.stringify(i)};let r;try{r=await(await fetch(`${Rd(t.appConfig)}/${e.token}`,s)).json()}catch(o){throw Ae.create("token-update-failed",{errorInfo:o?.toString()})}if(r.error){const o=r.error.message;throw Ae.create("token-update-failed",{errorInfo:o})}if(!r.token)throw Ae.create("token-update-no-token");return r.token}async function kw(t,e){const i={method:"DELETE",headers:await Ad(t)};try{const r=await(await fetch(`${Rd(t.appConfig)}/${e}`,i)).json();if(r.error){const o=r.error.message;throw Ae.create("token-unsubscribe-failed",{errorInfo:o})}}catch(s){throw Ae.create("token-unsubscribe-failed",{errorInfo:s?.toString()})}}function Rd({projectId:t}){return`${aD}/projects/${t}/registrations`}async function Ad({appConfig:t,installations:e}){const n=await e.getToken();return new Headers({"Content-Type":"application/json",Accept:"application/json","x-goog-api-key":t.apiKey,"x-goog-firebase-installations-auth":`FIS ${n}`})}function Rw({p256dh:t,auth:e,endpoint:n,vapidKey:i}){const s={web:{endpoint:n,auth:e,p256dh:t}};return i!==Tw&&(s.web.applicationPubKey=i),s}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const bD=10080*60*1e3;async function ED(t){const e=await SD(t.swRegistration,t.vapidKey),n={vapidKey:t.vapidKey,swScope:t.swRegistration.scope,endpoint:e.endpoint,auth:Mt(e.getKey("auth")),p256dh:Mt(e.getKey("p256dh"))},i=await Iw(t.firebaseDependencies);if(i){if(ID(i.subscriptionOptions,n))return Date.now()>=i.createTime+bD?TD(t,{token:i.token,createTime:Date.now(),subscriptionOptions:n}):i.token;try{await kw(t.firebaseDependencies,i.token)}catch(s){console.warn(s)}return mp(t.firebaseDependencies,n)}else return mp(t.firebaseDependencies,n)}async function CD(t){const e=await Iw(t.firebaseDependencies);e&&(await kw(t.firebaseDependencies,e.token),await _D(t.firebaseDependencies));const n=await t.swRegistration.pushManager.getSubscription();return n?n.unsubscribe():!0}async function TD(t,e){try{const n=await vD(t.firebaseDependencies,e),i={...e,token:n,createTime:Date.now()};return await Id(t.firebaseDependencies,i),n}catch(n){throw n}}async function mp(t,e){const i={token:await wD(t,e),createTime:Date.now(),subscriptionOptions:e};return await Id(t,i),i.token}async function SD(t,e){const n=await t.pushManager.getSubscription();return n||t.pushManager.subscribe({userVisibleOnly:!0,applicationServerKey:dD(e)})}function ID(t,e){const n=e.vapidKey===t.vapidKey,i=e.endpoint===t.endpoint,s=e.auth===t.auth,r=e.p256dh===t.p256dh;return n&&i&&s&&r}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function _p(t){const e={from:t.from,collapseKey:t.collapse_key,messageId:t.fcmMessageId};return kD(e,t),RD(e,t),AD(e,t),e}function kD(t,e){if(!e.notification)return;t.notification={};const n=e.notification.title;n&&(t.notification.title=n);const i=e.notification.body;i&&(t.notification.body=i);const s=e.notification.image;s&&(t.notification.image=s);const r=e.notification.icon;r&&(t.notification.icon=r)}function RD(t,e){e.data&&(t.data=e.data)}function AD(t,e){if(!e.fcmOptions&&!e.notification?.click_action)return;t.fcmOptions={};const n=e.fcmOptions?.link??e.notification?.click_action;n&&(t.fcmOptions.link=n);const i=e.fcmOptions?.analytics_label;i&&(t.fcmOptions.analyticsLabel=i)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ND(t){return typeof t=="object"&&!!t&&Sw in t}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function PD(t){if(!t||!t.options)throw Sc("App Configuration Object");if(!t.name)throw Sc("App Name");const e=["projectId","apiKey","appId","messagingSenderId"],{options:n}=t;for(const i of e)if(!n[i])throw Sc(i);return{appName:t.name,projectId:n.projectId,apiKey:n.apiKey,appId:n.appId,senderId:n.messagingSenderId}}function Sc(t){return Ae.create("missing-app-config-values",{valueName:t})}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class LD{constructor(e,n,i){this.deliveryMetricsExportedToBigQueryEnabled=!1,this.onBackgroundMessageHandler=null,this.onMessageHandler=null,this.logEvents=[],this.isLogServiceStarted=!1;const s=PD(e);this.firebaseDependencies={app:e,appConfig:s,installations:n,analyticsProvider:i}}_delete(){return Promise.resolve()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Aw(t){try{t.swRegistration=await navigator.serviceWorker.register(rD,{scope:oD}),t.swRegistration.update().catch(()=>{}),await OD(t.swRegistration)}catch(e){throw Ae.create("failed-service-worker-registration",{browserErrorMessage:e?.message})}}async function OD(t){return new Promise((e,n)=>{const i=setTimeout(()=>n(new Error(`Service worker not registered after ${fp} ms`)),fp),s=t.installing||t.waiting;t.active?(clearTimeout(i),e()):s?s.onstatechange=r=>{r.target?.state==="activated"&&(s.onstatechange=null,clearTimeout(i),e())}:(clearTimeout(i),n(new Error("No incoming service worker found.")))})}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function DD(t,e){if(!e&&!t.swRegistration&&await Aw(t),!(!e&&t.swRegistration)){if(!(e instanceof ServiceWorkerRegistration))throw Ae.create("invalid-sw-registration");t.swRegistration=e}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function MD(t,e){e?t.vapidKey=e:t.vapidKey||(t.vapidKey=Tw)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Nw(t,e){if(!navigator)throw Ae.create("only-available-in-window");if(Notification.permission==="default"&&await Notification.requestPermission(),Notification.permission!=="granted")throw Ae.create("permission-blocked");return await MD(t,e?.vapidKey),await DD(t,e?.serviceWorkerRegistration),ED(t)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function xD(t,e,n){const i=FD(e);(await t.firebaseDependencies.analyticsProvider.get()).logEvent(i,{message_id:n[Sw],message_name:n[cD],message_time:n[lD],message_device_time:Math.floor(Date.now()/1e3)})}function FD(t){switch(t){case dr.NOTIFICATION_CLICKED:return"notification_open";case dr.PUSH_RECEIVED:return"notification_foreground";default:throw new Error}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function UD(t,e){const n=e.data;if(!n.isFirebaseMessaging)return;t.onMessageHandler&&n.messageType===dr.PUSH_RECEIVED&&(typeof t.onMessageHandler=="function"?t.onMessageHandler(_p(n)):t.onMessageHandler.next(_p(n)));const i=n.data;ND(i)&&i[uD]==="1"&&await xD(t,n.messageType,i)}const yp="@firebase/messaging",wp="0.12.23";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const $D=t=>{const e=new LD(t.getProvider("app").getImmediate(),t.getProvider("installations-internal").getImmediate(),t.getProvider("analytics-internal"));return navigator.serviceWorker.addEventListener("message",n=>UD(e,n)),e},BD=t=>{const e=t.getProvider("messaging").getImmediate();return{getToken:i=>Nw(e,i)}};function HD(){st(new Je("messaging",$D,"PUBLIC")),st(new Je("messaging-internal",BD,"PRIVATE")),Ke(yp,wp),Ke(yp,wp,"esm2020")}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function VD(){try{await xg()}catch{return!1}return typeof window<"u"&&ta()&&eS()&&"serviceWorker"in navigator&&"PushManager"in window&&"Notification"in window&&"fetch"in window&&ServiceWorkerRegistration.prototype.hasOwnProperty("showNotification")&&PushSubscription.prototype.hasOwnProperty("getKey")}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function jD(t){if(!navigator)throw Ae.create("only-available-in-window");return t.swRegistration||await Aw(t),CD(t)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function WD(t,e){if(!navigator)throw Ae.create("only-available-in-window");return t.onMessageHandler=e,()=>{t.onMessageHandler=null}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function qD(t=ra()){return VD().then(e=>{if(!e)throw Ae.create("unsupported-browser")},e=>{throw Ae.create("indexed-db-unsupported")}),Dn(re(t),"messaging").getImmediate()}async function zD(t,e){return t=re(t),Nw(t,e)}function vp(t){return t=re(t),jD(t)}function GD(t,e){return t=re(t),WD(t,e)}HD();class Ba{constructor(){this.messaging=null,this.currentToken=null,this.vapidKey=_N,this.isInitialized=!1,this.messageCallbacks=new Set,this.tokenRefreshCallbacks=new Set}async initialize(){if(this.isInitialized)return!0;try{return Ba.isSupported()?this.vapidKey?(this.messaging=qD(Ea),GD(this.messaging,e=>{console.log("[FCMTransport] Foreground message received:",e),this.messageCallbacks.forEach(n=>{try{n(e)}catch(i){console.error("[FCMTransport] Error in message callback:",i)}})}),this.isInitialized=!0,console.log("[FCMTransport] Initialized successfully"),!0):(console.warn("[FCMTransport] VAPID key not configured"),!1):(console.warn("[FCMTransport] FCM not supported in this environment"),!1)}catch(e){return console.error("[FCMTransport] Initialization failed:",e),!1}}async getToken(){if(!this.isInitialized&&(console.log("[FCMTransport] Not initialized, initializing now..."),!await this.initialize()))return console.error("[FCMTransport] Initialization failed, cannot get token"),null;try{console.log("[FCMTransport] Requesting FCM token..."),console.log("[FCMTransport] VAPID key present:",!!this.vapidKey),console.log("[FCMTransport] Messaging instance:",!!this.messaging);const e=await zD(this.messaging,{vapidKey:this.vapidKey});return e?(this.currentToken=e,console.log("[FCMTransport] Token obtained successfully"),console.log("[FCMTransport] Token (truncated):",e.substring(0,20)+"..."),await this.storeUserToken(e),e):(console.warn("[FCMTransport] No registration token available"),console.warn("[FCMTransport] This usually means:"),console.warn("[FCMTransport]   1. Service worker is not registered"),console.warn("[FCMTransport]   2. Notification permission not granted"),console.warn("[FCMTransport]   3. VAPID key is incorrect"),null)}catch(e){return console.error("[FCMTransport] Failed to get token:",e),console.error("[FCMTransport] Error name:",e.name),console.error("[FCMTransport] Error code:",e.code),console.error("[FCMTransport] Error message:",e.message),e.code==="messaging/unsupported-browser"?console.error("[FCMTransport] Browser does not support FCM"):e.code==="messaging/permission-blocked"?console.error("[FCMTransport] Notification permission is blocked"):e.code==="messaging/failed-service-worker-registration"&&(console.error("[FCMTransport] Service worker registration failed"),console.error("[FCMTransport] Make sure service worker is registered before calling getToken()")),null}}async refreshToken(){if(console.log("[FCMTransport] Refreshing token..."),this.currentToken)try{await vp(this.messaging),await this.removeUserToken(this.currentToken)}catch(n){console.warn("[FCMTransport] Failed to delete old token:",n)}this.currentToken=null;const e=await this.getToken();return e&&this.tokenRefreshCallbacks.forEach(n=>{try{n(e)}catch(i){console.error("[FCMTransport] Error in token refresh callback:",i)}}),e}async deleteToken(){if(!this.messaging||!this.currentToken)return!0;try{return await vp(this.messaging),await this.removeUserToken(this.currentToken),this.currentToken=null,console.log("[FCMTransport] Token deleted successfully"),!0}catch(e){return console.error("[FCMTransport] Failed to delete token:",e),!1}}async storeUserToken(e){const n=D();if(!n){console.warn("[FCMTransport] Cannot store token: user not logged in");return}try{const i=b(E,`users/${n}/fcmTokens/${this.getTokenId(e)}`),s={token:e,deviceInfo:{platform:this.getPlatform(),timestamp:Date.now()},createdAt:Date.now(),lastUsed:Date.now()};await ee(i,s),console.log("[FCMTransport] Token stored in RTDB")}catch(i){console.error("[FCMTransport] Failed to store token in RTDB:",i)}}async removeUserToken(e){const n=D();if(n)try{const i=b(E,`users/${n}/fcmTokens/${this.getTokenId(e)}`);await Xe(i),console.log("[FCMTransport] Token removed from RTDB")}catch(i){console.error("[FCMTransport] Failed to remove token from RTDB:",i)}}async getUserTokens(e){try{const n=b(E,`users/${e}/fcmTokens`),i=await Le(n);if(i.exists()){const s=i.val();return Object.values(s)}return[]}catch(n){return console.error("[FCMTransport] Failed to get user tokens:",n),[]}}async sendCallNotification(e,n){const{roomId:i,callerId:s,callerName:r}=n,o={type:"call",roomId:i,callerId:s,callerName:r,timestamp:Date.now().toString()},a="/HangVidU/",c={notification:{title:`Incoming call from ${r}`,body:"Tap to answer or decline",icon:`${a}icons/play-arrows-v1/icon-192.png`,badge:`${a}icons/play-arrows-v1/icon-192.png`},data:o};return this.sendNotification(e,c)}async sendMissedCallNotification(e,n){const{roomId:i,callerId:s,callerName:r}=n,o={type:"missed_call",roomId:i,callerId:s,callerName:r,timestamp:Date.now().toString()},a="/HangVidU/",c={notification:{title:`Missed call from ${r}`,body:"Tap to call back",icon:`${a}icons/play-arrows-v1/icon-192.png`,badge:`${a}icons/play-arrows-v1/icon-192.png`},data:o};return this.sendNotification(e,c)}async sendMessageNotification(e,n){const{senderId:i,senderName:s,messageText:r}=n,o=typeof r=="string"?r:String(r||""),a=o.length>50?o.substring(0,47)+"...":o,c={type:"message",senderId:i,senderName:s,messagePreview:a,timestamp:Date.now().toString()},l="/HangVidU/",u={notification:{title:`New message from ${s}`,body:a,icon:`${l}icons/play-arrows-v1/icon-192.png`,badge:`${l}icons/play-arrows-v1/icon-192.png`},data:c};return this.sendNotification(e,u)}async sendNotification(e,n){try{{let o=null;try{const{getLoggedInUserToken:l}=await ue(async()=>{const{getLoggedInUserToken:u}=await Promise.resolve().then(()=>td);return{getLoggedInUserToken:u}},void 0);o=await l()}catch(l){console.warn("[FCMTransport] Failed to get auth token:",l)}const a={"Content-Type":"application/json"};o&&(a.Authorization=`Bearer ${o}`);const c=await fetch("https://europe-west1-vidu-aae11.cloudfunctions.net/sendCallNotification",{method:"POST",headers:a,body:JSON.stringify({targetUserId:e,callData:n.data})});if(c.ok){const l=await c.json();return console.log(`[FCMTransport] FCM notification sent to ${e}:`,l),!0}else return console.error("[FCMTransport] FCM function failed:",c.status),!1}const i=b(E,`notifications/${e}`),s=er(i).key,r={id:s,payload:n,createdAt:Date.now(),delivered:!1};return await ee(b(E,`notifications/${e}/${s}`),r),console.log(`[FCMTransport] Notification queued for user ${e} (dev mode)`),!0}catch(i){return console.error("[FCMTransport] Failed to send notification:",i),!1}}onMessage(e){return this.messageCallbacks.add(e),()=>this.messageCallbacks.delete(e)}onTokenRefresh(e){return this.tokenRefreshCallbacks.add(e),()=>this.tokenRefreshCallbacks.delete(e)}getTokenId(e){return btoa(e).replace(/[^a-zA-Z0-9]/g,"").substring(0,20)}getPlatform(){const e=navigator.userAgent;return/iPhone|iPad|iPod/.test(e)?"ios":/Android/.test(e)?"android":/Macintosh/.test(e)?"macos":/Windows/.test(e)?"windows":"unknown"}static isSupported(){return"serviceWorker"in navigator&&"Notification"in window&&"PushManager"in window}}const KD=Object.freeze(Object.defineProperty({__proto__:null,FCMTransport:Ba},Symbol.toStringTag,{value:"Module"}));class YD{constructor(e=null,n={}){this.transport=e||new Ba,this.isEnabled=!1,this.permissionState="default",this.options={enableCallNotifications:!0,enableMessageNotifications:!0,privacyMode:!1,autoHideSuccessMs:6e3,...n},this.activeNotifications=new Map,this.permissionCallbacks=new Set,this.notificationCallbacks=new Set}async initialize(){try{return await this.transport.initialize()?(this.permissionState=this.getPermissionState(),this.transport.onMessage(n=>{this.handleForegroundMessage(n)}),console.log("[PushNotificationController] Initialized successfully"),!0):(console.warn("[PushNotificationController] Transport initialization failed"),!1)}catch(e){return console.error("[PushNotificationController] Initialization failed:",e),!1}}async requestPermission(e={}){const{title:n="Enable notifications",explain:i="Get notified of incoming calls and messages even when the app is closed.",onGranted:s=null,onDenied:r=null,onDismissed:o=null}=e;if(!this.isNotificationSupported())return console.warn("[PushNotificationController] Notifications not supported"),{state:"denied",reason:"unsupported"};this.detectBrowser();const a=Notification.permission;if(this.permissionState=a,a==="granted")return await this.enable(),s?.(),{state:"granted"};if(a==="denied")return r?.("already-denied"),{state:"denied",reason:"already-denied"};let c;try{c=await Notification.requestPermission()}catch(l){console.error("[PushNotificationController] Permission request failed:",l),c=Notification.permission}return this.permissionState=c,c==="granted"?(await this.enable(),s?.(),{state:"granted"}):a==="default"&&c==="denied"?(r?.("silent-block"),{state:"denied",reason:"silent-block"}):c==="default"?(o?.(),{state:"dismissed"}):(r?.(),{state:"denied"})}async enableIfGranted(){return this.isNotificationSupported()?(this.permissionState=Notification.permission,this.permissionState==="granted"?await this.enable()?{state:"enabled"}:{state:"error",reason:"enable-failed"}:this.permissionState==="denied"?{state:"denied"}:{state:"prompt-needed"}):{state:"unsupported"}}async enable(){if(this.permissionState!=="granted")return console.warn("[PushNotificationController] Cannot enable: permission not granted"),!1;try{return await this.transport.getToken()?(this.isEnabled=!0,console.log("[PushNotificationController] Notifications enabled"),this.permissionCallbacks.forEach(n=>{try{n("enabled")}catch(i){console.error("[PushNotificationController] Error in permission callback:",i)}}),!0):(console.warn("[PushNotificationController] Failed to get FCM token"),!1)}catch(e){return console.error("[PushNotificationController] Failed to enable notifications:",e),!1}}async disable(){try{return await this.transport.deleteToken(),this.isEnabled=!1,this.activeNotifications.clear(),console.log("[PushNotificationController] Notifications disabled"),this.permissionCallbacks.forEach(e=>{try{e("disabled")}catch(n){console.error("[PushNotificationController] Error in permission callback:",n)}}),!0}catch(e){return console.error("[PushNotificationController] Failed to disable notifications:",e),!1}}async sendCallNotification(e,n){if(!this.options.enableCallNotifications)return console.log("[PushNotificationController] Call notifications disabled"),!1;try{const i=await this.transport.sendCallNotification(e,n);if(i){const s=`call_${n.roomId}_${Date.now()}`;this.activeNotifications.set(s,{type:"call",roomId:n.roomId,targetUserId:e,timestamp:Date.now()}),console.log(`[PushNotificationController] Call notification sent to ${e}`)}return i}catch(i){return console.error("[PushNotificationController] Failed to send call notification:",i),!1}}async sendMissedCallNotification(e,n){if(!this.options.enableCallNotifications)return console.log("[PushNotificationController] Call notifications disabled (missed call masked)"),!1;try{const i=await this.transport.sendMissedCallNotification(e,n);return i&&console.log(`[PushNotificationController] Missed call notification sent to ${e}`),i}catch(i){return console.error("[PushNotificationController] Failed to send missed call notification:",i),!1}}async sendMessageNotification(e,n){if(!this.options.enableMessageNotifications)return console.log("[PushNotificationController] Message notifications disabled"),!1;if(!this.shouldSendNotification())return console.log("[PushNotificationController] Not sending message notification (app in foreground)"),!1;try{const i=await this.transport.sendMessageNotification(e,n);if(i){const s=`message_${e}_${Date.now()}`;this.activeNotifications.set(s,{type:"message",senderId:n.senderId,targetUserId:e,timestamp:Date.now()}),console.log(`[PushNotificationController] Message notification sent to ${e}`)}return i}catch(i){return console.error("[PushNotificationController] Failed to send message notification:",i),!1}}async dismissCallNotifications(e){try{const n=[];for(const[i,s]of this.activeNotifications)s.type==="call"&&s.roomId===e&&n.push(i);n.forEach(i=>this.activeNotifications.delete(i)),n.length>0&&console.log(`[PushNotificationController] Dismissed ${n.length} call notifications for room ${e}`)}catch(n){console.error("[PushNotificationController] Failed to dismiss call notifications:",n)}}async dismissMessageNotifications(e){try{const n=[];for(const[i,s]of this.activeNotifications)s.type==="message"&&s.senderId===e&&n.push(i);n.forEach(i=>this.activeNotifications.delete(i)),n.length>0&&console.log(`[PushNotificationController] Dismissed ${n.length} message notifications from ${e}`)}catch(n){console.error("[PushNotificationController] Failed to dismiss message notifications:",n)}}async cleanupOldNotifications(){const e=Date.now(),n=1440*60*1e3,i=[];for(const[s,r]of this.activeNotifications)e-r.timestamp>n&&i.push(s);i.forEach(s=>this.activeNotifications.delete(s)),i.length>0&&console.log(`[PushNotificationController] Cleaned up ${i.length} old notifications`)}handleForegroundMessage(e){console.log("[PushNotificationController] Foreground message received:",e);const n=e?.data?.senderId||e?.data?.callerId,i=D();if(n&&i&&n===i){console.log("[PushNotificationController] Ignoring self-notification");return}this.notificationCallbacks.forEach(s=>{try{s(e)}catch(r){console.error("[PushNotificationController] Error in notification callback:",r)}})}shouldSendNotification(){return document.hidden||!document.hasFocus()}getPermissionState(){return this.isNotificationSupported()?Notification.permission:"unsupported"}isNotificationEnabled(){return this.isEnabled&&this.permissionState==="granted"}isNotificationSupported(){const e=this.transport?.constructor;return typeof e?.isSupported=="function"?e.isSupported():"Notification"in window&&"serviceWorker"in navigator}updateOptions(e){this.options={...this.options,...e},console.log("[PushNotificationController] Options updated:",this.options)}onPermissionChange(e){return this.permissionCallbacks.add(e),()=>this.permissionCallbacks.delete(e)}onNotification(e){return this.notificationCallbacks.add(e),()=>this.notificationCallbacks.delete(e)}detectBrowser(){if(navigator.userAgentData&&navigator.userAgentData.brands){const n=navigator.userAgentData.brands.map(i=>i.brand);if(n.some(i=>i.includes("Microsoft Edge")))return"Edge";if(n.some(i=>i.includes("Google Chrome")))return"Chrome";if(n.some(i=>i.includes("Chromium")))return"Chromium"}const e=navigator.userAgent;return e.includes("Edg/")?"Edge":e.includes("Chrome/")?"Chrome":e.includes("Safari/")&&!e.includes("Chrome")?"Safari":e.includes("Firefox/")?"Firefox":"Your browser"}async formatCallNotification(e){const{roomId:n,callerId:i,callerName:s}=e;let r=s||i||"Unknown caller";if(!s)try{const{resolveCallerName:o}=await ue(async()=>{const{resolveCallerName:a}=await Promise.resolve().then(()=>Nl);return{resolveCallerName:a}},void 0);r=await o(n,i)}catch(o){console.warn("[PushNotificationController] Failed to resolve caller name:",o)}return this.options.privacyMode&&(r="Someone"),{...e,callerName:r}}async formatMessageNotification(e){const{senderId:n,senderName:i,messageText:s}=e;let r=i,o=s;try{const{getContacts:a}=await ue(async()=>{const{getContacts:l}=await Promise.resolve().then(()=>Nl);return{getContacts:l}},void 0),c=await a();c&&c[n]&&(r=c[n].name||i)}catch(a){console.warn("[PushNotificationController] Failed to resolve sender name:",a),r=i||n||"Unknown sender"}return this.options.privacyMode?(r="Someone",o="New message"):o&&o.length>50&&(o=o.substring(0,47)+"..."),{...e,senderName:r,messageText:o}}}const ge=new YD,Bs=new Map,Hs=new Map,un=new Map,bp=14;function JD(t){return Object.keys(t).sort((e,n)=>{const i=t[e]?.lastInteractionAt||t[e]?.savedAt||0;return(t[n]?.lastInteractionAt||t[n]?.savedAt||0)-i})}async function hr(t,e,n){const i=D(),s=Date.now();if(i){const r=b(E,`users/${i}/contacts/${t}`);await ee(r,{contactId:t,contactName:e,roomId:n,savedAt:s,lastInteractionAt:s});return}try{const r=localStorage.getItem("contacts")||"{}",o=JSON.parse(r);o[t]={contactId:t,contactName:e,roomId:n,savedAt:s,lastInteractionAt:s},localStorage.setItem("contacts",JSON.stringify(o))}catch(r){console.warn("Failed to save contact to localStorage",r)}}async function Nd(t){const e=D();if(e)try{const n=b(E,`users/${e}/contacts/${t}`);await vn(n,{lastInteractionAt:Date.now()})}catch(n){console.warn("Failed to update lastInteractionAt",n)}}async function Qt(){const t=D();if(t)try{const e=b(E,`users/${t}/contacts`),n=await Le(e);return n.exists()?n.val():{}}catch(e){return console.warn("Failed to read contacts from RTDB",e),{}}try{const e=localStorage.getItem("contacts")||"{}";return JSON.parse(e)}catch(e){return console.warn("Failed to read contacts from localStorage",e),{}}}async function Al(t){if(!t)return null;try{const e=await Qt();for(const n of Object.values(e||{}))if(n?.roomId===t)return n}catch(e){console.warn("Failed to get contact by roomId",e)}return null}async function Pw(t,e){if(!t)return e||"Unknown";try{const n=await Qt();for(const i of Object.values(n||{}))if(i?.roomId===t)return i.contactName||i.contactId||e}catch(n){console.warn("Failed to resolve caller name",n)}return e||"Unknown"}async function Lw(t,e,n){if(!t||!e)return;const s=(await Qt())?.[t];if(s){s.roomId!==e&&(await hr(t,s.contactName,e),await Nt(n)),document.dispatchEvent(new CustomEvent("contact:saved",{detail:{roomId:e}}));return}if(!await Fa("Save contact?",{autoRemoveSeconds:15}))return;const o=window.prompt("Enter a name for this contact:",t)||t;await hr(t,o,e),document.dispatchEvent(new CustomEvent("contact:saved",{detail:{roomId:e}})),await Nt(n)}async function Nt(t){if(!t)return;const e=await Qt(),n=JD(e);let i=t.querySelector(".contacts-container");if(i||(i=document.createElement("div"),i.className="contacts-container",t.appendChild(i)),n.length===0){i.innerHTML="<p>No saved contacts yet.</p>",C(i);return}U(i),i.innerHTML=`
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
                ${r.contactName&&r.contactName.length>bp?r.contactName.slice(0,bp-2)+"..":r.contactName}
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
  `,XD(i,t),QD(n),await ZD(i,n,e),D()&&Promise.all(n.map(async s=>{if(!(await Le(b(E,`users/${s}/presence`))).exists()){const o=i.querySelector(`.contact-entry:has([data-contact-id="${s}"])`);o&&o.remove()}})).catch(s=>console.warn("[CONTACTS] Background presence check failed:",s))}function XD(t,e){t.querySelectorAll(".contact-message-btn").forEach(n=>{n.onclick=i=>{i.stopPropagation();const s=n.getAttribute("data-contact-id"),r=n.getAttribute("data-contact-name");if(s){li.openContactMessages(s,r);const o=un.get(s);o&&o.clearBadge()}}}),t.querySelectorAll(".contact-name").forEach(n=>{n.onclick=async()=>{let i=n.getAttribute("data-room-id");const s=n.getAttribute("data-contact-name"),r=n.getAttribute("data-contact-id");(i||r)&&document.dispatchEvent(new CustomEvent("contact:call",{detail:{contactId:r,contactName:s,roomId:i}}))}}),t.querySelectorAll(".contact-delete-btn").forEach(n=>{n.onclick=async()=>{const i=n.getAttribute("data-contact-id");!i||!await Fa("Delete this contact?")||(await eM(i),await Nt(e))}}),t.querySelectorAll(".contact-edit-btn").forEach(n=>{n.onclick=async()=>{const i=n.getAttribute("data-contact-id");if(!i)return;const r=(await Qt())[i];if(!r)return;const o=prompt("Enter new name for this contact:",r.contactName);o&&o.trim()&&o.trim()!==r.contactName&&(await hr(i,o.trim(),r.roomId),await Nt(e))}})}function QD(t){Bs.forEach(({ref:e,callback:n})=>{ut(e,"value",n)}),Bs.clear(),D()&&t.forEach(e=>{const n=b(E,`users/${e}/presence`),i=document.querySelector(`.presence-indicator[data-contact-id="${e}"]`);if(!i)return;const s=r=>{const a=r.val()?.state==="online";i.classList.toggle("online",a),i.title=a?"Online":"Offline"};Lu(n,s),Bs.set(e,{ref:n,callback:s})})}let bs=!1,wi=null;async function ZD(t,e,n){if(!D())return;const i=10;let s=0;for(;bs&&s<i;)await new Promise(r=>setTimeout(r,100)),s++;if(bs){console.debug("[CONTACTS] Toggle replacement still in progress after waiting, skipping");return}bs=!0,wi&&clearTimeout(wi),wi=setTimeout(()=>{console.warn("[CONTACTS] Toggle replacement timeout - forcing flag reset"),bs=!1},5e3);try{un.forEach(o=>{o.cleanup()}),un.clear(),Hs.forEach(o=>{o()}),Hs.clear();const r=D();for(const o of e){const a=n[o],c=t.querySelector(`.contact-msg-toggle-container[data-contact-id="${o}"]`);if(!c){console.warn(`[CONTACTS] No toggle container found for contact ${o}`);continue}const l=tw({parent:c,onToggle:()=>{li.openContactMessages(o,a.contactName,!0);const d=un.get(o);d&&d.clearBadge()},icon:"💬",initialUnreadCount:0});if(!l){console.error(`[CONTACTS] Failed to create toggle for contact ${o}`);continue}un.set(o,l);const u=bn.listenToUnreadCount(o,d=>{l.setUnreadCount(d),d>0&&Nd(o)});Hs.set(o,u)}Promise.all(e.map(o=>bn.getUnreadCount(o).then(a=>{const c=un.get(o);c&&c.setUnreadCount(a)}).catch(a=>console.warn(`[CONTACTS] Failed to get unread count for ${o}:`,a))))}finally{wi&&(clearTimeout(wi),wi=null),bs=!1}}async function eM(t){const e=D();if(e){try{await Xe(b(E,`users/${e}/contacts/${t}`))}catch(n){console.warn("Failed to delete contact from RTDB",n)}return}try{const n=localStorage.getItem("contacts")||"{}",i=JSON.parse(n);i[t]&&(delete i[t],localStorage.setItem("contacts",JSON.stringify(i)))}catch(n){console.warn("Failed to delete contact from localStorage",n)}}function Ow(){Bs.forEach(({ref:t,callback:e})=>{ut(t,"value",e)}),Bs.clear(),Hs.forEach(t=>t()),Hs.clear(),un.forEach(t=>t.cleanup()),un.clear()}const Nl=Object.freeze(Object.defineProperty({__proto__:null,cleanupContacts:Ow,getContactByRoomId:Al,getContacts:Qt,renderContactsList:Nt,resolveCallerName:Pw,saveContact:Lw,saveContactData:hr,updateLastInteraction:Nd},Symbol.toStringTag,{value:"Module"})),vi="enable-notifications";function Ep(){if(ke.has(vi))return ke.notifications.get(vi);const t=vd({template:`
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
    `,className:"notification enable-notifications-notification",handlers:{handleEnable:async e=>{const n=e.target;n.disabled=!0,n.textContent="Enabling...";try{const i=await ge.requestPermission();i.state==="granted"?(xa("Notifications enabled"),ke.remove(vi)):i.state==="denied"?(ZL("Notifications blocked. Check browser settings."),ke.remove(vi)):(n.disabled=!1,n.textContent="Enable")}catch(i){console.error("[ENABLE NOTIFICATIONS] Failed:",i),n.disabled=!1,n.textContent="Enable"}},handleDismiss:()=>{ke.remove(vi)}}});return ke.add(vi,t),t}function tM(){C(Me),C(Ee),C($e),C(nt)}function nM(t){t.on("memberJoined",zy),t.on("cleanup",()=>{Jn(),Gy()})}function iM(){return!!(navigator.mediaDevices&&navigator.mediaDevices.enumerateDevices)}async function sM(){return iM()?(await navigator.mediaDevices.enumerateDevices()).filter(e=>e.kind==="videoinput"):[]}async function rM(){const t=await sM();let e=!1,n=!1;return t.forEach(i=>{const s=i.label.toLowerCase();(s.includes("front")||s.includes("user"))&&(e=!0),(s.includes("back")||s.includes("rear")||s.includes("environment"))&&(n=!0)}),e&&n}async function oM({localStream:t,localVideo:e,currentFacingMode:n,peerConnection:i=null}){if(!t||!e)return console.error("switchCamera: missing localStream or localVideo"),null;const s=n==="user"?"environment":"user";try{const r=await navigator.mediaDevices.getUserMedia({video:sw(s),audio:iw()}),o=r.getVideoTracks()[0],a=r.getAudioTracks()[0],c=t.getVideoTracks()[0],l=c?c.enabled:!0,u=t.getAudioTracks()[0],d=u?!u.enabled:!1;if(o&&(o.enabled=l),a&&(a.enabled=!d),t.getTracks().forEach(h=>h.stop()),i){const h=i.getSenders().find(p=>p.track&&p.track.kind==="video");h&&await h.replaceTrack(o);const f=i.getSenders().find(p=>p.track&&p.track.kind==="audio");f&&a&&await f.replaceTrack(a)}return e.srcObject=new MediaStream([o].filter(Boolean)),{newStream:r,facingMode:s}}catch(r){return console.error("Failed to switch camera:",r),null}}let Cp=[];function aM(t,e){const n=e.querySelector("i");n.className=t?"fa fa-microphone-slash":"fa fa-microphone"}function cM({getLocalStream:t,getLocalVideo:e,getRemoteVideo:n,getPeerConnection:i=()=>null,setLocalStream:s=null,micBtn:r,cameraBtn:o,switchCameraBtn:a,mutePartnerBtn:c,fullscreenPartnerBtn:l,remotePipBtn:u}){r&&(r.onclick=()=>{const d=t();if(!d)return;const h=d.getAudioTracks()[0];h&&(h.enabled=!h.enabled,aM(!h.enabled,r))}),o&&(o.onclick=()=>{const d=t();if(!d)return;const h=d.getVideoTracks()[0];if(h){h.enabled=!h.enabled;const f=o.querySelector("i");f.className=h.enabled?"fa fa-video":"fa fa-video-slash"}}),a&&(a.onclick=async()=>{const d=await oM({localStream:t(),localVideo:e(),currentFacingMode:Ly(),peerConnection:i()||null});d?(Oy(d.facingMode),console.log("Switched camera to facingMode:",d.facingMode),d.newStream&&typeof s=="function"&&s(d.newStream)):console.error("Camera switch failed.")},(async()=>await rM()?U(a):C(a))()),c&&(c.onclick=()=>{const d=n();if(!d)return;d.muted=!d.muted;const h=c.querySelector("i");h.className=d.muted?"fa fa-volume-mute":"fa fa-volume-up"}),l&&(l.onclick=()=>{const d=n();d.requestFullscreen?d.requestFullscreen():d.webkitRequestFullscreen&&d.webkitRequestFullscreen()}),u&&(u.onclick=async()=>{const d=n();d&&(hd(d)?await Pa(d):await Ny(d,d.parentElement))})}function lM(){Cp.forEach(t=>t()),Cp=[]}let Ic=null,dn=null,te=null,Q=null,Tp=!1,Wr=!1,Rt=[],Pl="",Pe=-1,Ll=[];const uM="AIzaSyBPUjW7ac277WIYTbN4M8dUomK39qRQjhA",dM="https://www.googleapis.com/youtube/v3";async function hM(){if(Tp||Wr)return!1;Wr=!0;const{initializeYouTubeElements:t}=await ue(async()=>{const{initializeYouTubeElements:o}=await Promise.resolve().then(()=>Q0);return{initializeYouTubeElements:o}},void 0),e=await t();if(Ic=e.searchContainer,dn=e.searchBtn,te=e.searchQuery,Q=e.searchResults,!Ic||!dn||!te||!Q)return console.error("YouTube search elements not found in DOM"),Wr=!1,!1;const n=o=>/^https?:\/\//i.test(o),i=o=>{(Q?.querySelectorAll(".search-result-item")||[]).forEach((c,l)=>{l===o?(c.classList.add("focused"),c.scrollIntoView({block:"nearest"})):c.classList.remove("focused")}),Pe=o??-1};dn.onclick=async()=>{const o=te.value.trim();if(Uo(te)){U(te),te.focus();return}if(!o){io(),C(te);return}if(kp()&&o===Pl)Ol(Rt);else if(!n(o))await Sp(o);else{await lr({url:o,title:o,channel:"",thumbnail:"",id:o}),C(Q),te.value="",C(te),Pe=-1;return}},Ic.addEventListener("keydown",async o=>{const a=Q.querySelectorAll(".search-result-item");if(a.length>0&&(o.key==="ArrowDown"||o.key==="ArrowUp")){if(o.key==="ArrowDown"){let c=Pe+1;c>=a.length&&(c=0),i(c)}else if(o.key==="ArrowUp"){let c=Pe-1;c<0&&(c=Pe===-1?0:a.length-1),i(c)}return}if(o.key==="Enter"){if(a.length>0&&Pe>=0){a[Pe].click(),C(te),C(Q),Pe=-1;return}const c=te.value.trim();if(c)if(kp()&&c===Pl)Ol(Rt);else if(!n(c))await Sp(c);else{await lr({url:c,title:c,channel:"",thumbnail:"",id:c}),C(Q),Pe=-1,te.value="",C(te);return}}else o.key==="Escape"&&(pM()?io():te.value?te.value="":C(te))}),te.addEventListener("input",()=>{te.value.trim()===""&&io(),Pe=-1});const s=ur(te,()=>C(te),{ignore:[dn],esc:!1});Ll.push(s);const r=ur(Q,()=>C(Q),{ignore:[dn],esc:!1});return Ll.push(r),Wr=!1,Tp=!0,!0}async function Sp(t){if(!dn||!Q){console.error("Search elements not initialized");return}Rt=[],Pl=t,dn.disabled=!0,Q.innerHTML='<div class="search-loading">Searching YouTube...</div>',U(Q);try{const e=await fetch(`${dM}/search?part=snippet&maxResults=10&q=${encodeURIComponent(t)}&type=video&key=${uM}`);if(!e.ok)throw e.status===403?new Error("YouTube API quota exceeded. Please try again later."):e.status===400?new Error("Invalid API key or request."):new Error(`YouTube API error: ${e.status}`);const n=await e.json();if(!n.items||n.items.length===0){Ip("No videos found"),Rt=[];return}Rt=n.items.map(i=>({id:i.id.videoId,title:i.snippet.title,thumbnail:i.snippet.thumbnails.medium.url,channel:i.snippet.channelTitle,url:`https://www.youtube.com/watch?v=${i.id.videoId}`})),Ol(Rt)}catch(e){console.error("YouTube search failed:",e),Ip(e.message||"Search failed. Please try again.")}finally{dn.disabled=!1}}function Ol(t){if(!Q){console.error("Search results element not initialized");return}if(!t||t.length===0){Q.innerHTML='<div class="search-no-results">No results found</div>',Rt=[],Pe=-1;return}Q.innerHTML="",t.forEach(n=>{const i=document.createElement("div");i.className="search-result-item",i.innerHTML=`
      <img src="${n.thumbnail}" alt="${n.title}" class="result-thumbnail">
      <div class="search-result-info">
        <div class="search-result-title">${n.title}</div>
        <div class="search-result-channel">${n.channel}</div>
      </div>
    `,i.onclick=async()=>{if(await lr(n),C(Q),Pe=-1,!te){console.error("Search query element not initialized");return}te.value="",C(te)},Q.appendChild(i)}),U(Q),Pe=0,Q.querySelectorAll(".search-result-item").forEach((n,i)=>{i===Pe?(n.classList.add("focused"),n.scrollIntoView({block:"nearest"})):n.classList.remove("focused")})}function Ip(t){if(Rt=[],Pe=-1,!Q){console.error("Search results element not initialized");return}Q.innerHTML=`<div class="search-error">${t}</div>`,U(Q)}function io(){Rt=[],Pe=-1,Q&&(Q.innerHTML="",C(Q))}function fM(){io(),Ll.forEach(t=>t())}function pM(){return!Uo(Q)}function kp(){return Rt.length>0}function gM({parent:t,manager:e=null,onClick:n=null,hideWhenAllRead:i=!1}={}){let s=e;const r=Da({initialProps:{unreadCount:0,isHidden:!0},template:`
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
    `,handlers:{handleClick:()=>{n?n():s&&s.toggleList()}},className:"notifications-toggle-container",parent:t});let o=r.querySelector(".notification-badge");return o&&(o.style.display="none"),r.onPropUpdated("unreadCount",a=>{const c=r.querySelector(".notification-badge");c&&(c.style.display=a>0?"flex":"none")}),r.show=()=>{r.isHidden=!1,r.style.display="block"},r.hide=()=>{r.isHidden=!0,r.style.display="none"},r.setUnread=a=>{r.unreadCount=a,a>0?r.show():i&&r.hide()},r.setManager=a=>{s=a},r}function mM({fromUserId:t,inviteData:e,onAccept:n,onDecline:i}){const s=e.fromName||"Someone",r=e.fromEmail||"",o=e.fromPhotoURL,a=o?`<img src="${Ze(o)}" alt="${Ze(s)}" class="notification-avatar" />`:'<span class="notification-icon">👤</span>';return vd({template:`
      <div class="notification-content">
        <div class="notification-header">
          ${a}
          <span class="notification-title">Contact Invitation</span>
        </div>
        <div class="notification-body">
          <p class="notification-message">
            <strong>${Ze(s)}</strong> wants to connect
          </p>
          ${r?`<p class="notification-detail">${Ze(r)}</p>`:""}
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
    `,className:"notification invite-notification",handlers:{handleAccept:async l=>{const u=l.target;u.disabled=!0,u.textContent="Accepting...";try{n&&await n()}catch(d){console.error("[INVITE NOTIFICATION] Accept failed:",d),u.disabled=!1,u.textContent="Accept"}},handleDecline:async l=>{const u=l.target;u.disabled=!0,u.textContent="Declining...";try{i&&await i()}catch(d){console.error("[INVITE NOTIFICATION] Decline failed:",d),u.disabled=!1,u.textContent="Decline"}}}})}let Es=null;const _M=!1;function yM(t,e=20){if(!t||t.length<=e)return t;const i=t.split(" ")[0];return i.length<=e?i:i.slice(0,e-3)+"..."}const wM=(t,e=null)=>{if(Es)return Es;if(!t)return console.error("Auth UI: Parent element is required"),null;let n=null,i=null,s=10;typeof e=="number"&&(s=e);const r=Zu();return Es=Da({initialProps:{isLoggedIn:r,userName:"Guest User",userPhotoURL:"",userPhotoDisplay:"none",userInfoDisplay:"none",avatarDisplay:"none",signingInDisplay:"none",loginBtnMarginRightPx:s,loginBtnDisplay:r?"none":"inline-block",logoutBtnDisplay:r?"inline-block":"none"},template:`
      <button style="margin-right: [[loginBtnMarginRightPx]]px; display: [[loginBtnDisplay]]" id="goog-login-btn" class="login-btn" onclick="handleLogin">Login</button>
      <button style="display: [[logoutBtnDisplay]]" id="goog-logout-btn" class="logout-btn" onclick="handleLogout">Logout</button>
      ${y0()&&_M?'<button id="delete-account-btn" class="delete-account-btn" onclick="handleDeleteAccount">Delete Account</button>':""}
      <span class="signing-in-indicator" style="display: [[signingInDisplay]]; color: var(--text-secondary, #888); font-size: 0.9rem;">Signing in...</span>
      <div class="user-info" style="display: [[userInfoDisplay]]">
        <img src="[[userPhotoURL]]" alt="[[userName]]" class="user-avatar" style="display: [[userPhotoDisplay]]" />
        <span class="user-avatar-placeholder" style="display: [[avatarDisplay]]">👤</span>
        <span class="user-name">[[userName]]</span>
      </div>
    `,handlers:{handleLogin:async o=>{try{await xo(o)}catch(a){console.error("[AuthComponent] Handle login error:",a),alert("Login failed. Please refresh the page, check your connection and try again.")}},handleLogout:yy,handleDeleteAccount:async()=>{if(confirm(`Are you sure you want to delete your account?

This will permanently delete:
• Your account
• All contacts
• Call history
• All associated data

This action cannot be undone.`))try{await wy(),alert("Your account has been deleted successfully.")}catch(a){console.error("[AuthComponent] Delete account error:",a),alert(a.message||"Failed to delete account. Please try again.")}}},onMount:o=>{const a=c=>{const l=o.querySelector("#goog-login-btn"),u=o.querySelector("#goog-logout-btn");l&&u&&(l.style.display=c?"none":"inline-block",u.style.display=c?"inline-block":"none");const d=o.querySelector("#delete-account-btn");d&&(d.style.display=c?"inline-block":"none")};a(r),n=ed(({isLoggedIn:c,userName:l,user:u})=>{const d=yM(u?.displayName||l),h=u?.photoURL||"";q("[AuthComponent] Auth state changed:",{isLoggedIn:c,userName:d,photoURL:h}),c&&S0(),a(c),o.update({isLoggedIn:c,userName:d,userPhotoURL:h,userPhotoDisplay:h?"block":"none",userInfoDisplay:c?"flex":"none",avatarDisplay:h?"none":"flex",signingInDisplay:"none",loginBtnDisplay:c?"none":"inline-block",logoutBtnDisplay:c?"inline-block":"none"})}),i=C0(c=>{q("[AuthComponent] One Tap status:",c),c==="signing_in"?o.update({signingInDisplay:"inline-block"}):o.update({signingInDisplay:"none"})})},onCleanup:()=>{n&&(n(),n=null),i&&(i(),i=null),Es=null},className:"auth-component",parent:t}),Es},vM="https://people.googleapis.com/v1/people/me/connections",bM="https://people.googleapis.com/v1/otherContacts";async function EM(t){if(!t)throw new Error("Access token is required");const e=[],n=await Rp(t,vM,"names,emailAddresses");console.log(`[GOOGLE CONTACTS] My Contacts: ${n.length}`),e.push(...n);const i=await Rp(t,bM,"names,emailAddresses");console.log(`[GOOGLE CONTACTS] Other Contacts: ${i.length}`),e.push(...i),console.log(`[GOOGLE CONTACTS] Total: ${e.length} contacts with email addresses`);const s=new Set;return e.filter(o=>s.has(o.email)?!1:(s.add(o.email),!0))}async function Rp(t,e,n){const i=[];let s=null;do{const r=new URL(e);r.searchParams.set("pageSize","100"),e.includes("otherContacts")?r.searchParams.set("readMask",n):r.searchParams.set("personFields",n),s&&r.searchParams.set("pageToken",s);const o=await fetch(r.toString(),{headers:{Authorization:`Bearer ${t}`}});if(!o.ok){const l=await o.json().catch(()=>({}));if(e.includes("otherContacts"))return console.warn("[GOOGLE CONTACTS] Other contacts fetch failed (may need additional scope):",l.error?.message),i;throw console.error("[GOOGLE CONTACTS] API error:",l),new Error(l.error?.message||`API error: ${o.status}`)}const a=await o.json(),c=a.connections||a.otherContacts||[];for(const l of c){const u=l.emailAddresses||[],h=(l.names||[])[0]?.displayName||"Unknown";for(const f of u)f.value&&i.push({email:f.value.toLowerCase().trim(),name:h})}s=a.nextPageToken}while(s);return i}function CM(t){let e="";for(const n of t)e+=String.fromCharCode(n);return btoa(e).replace(/\+/g,"-").replace(/\//g,"_").replace(/=+$/,"")}async function TM(t,e,n,i){const r=[`To: ${(Array.isArray(e)?e:[e]).join(", ")}`,`Subject: ${n}`,"Content-Type: text/plain; charset=utf-8","",i].join(`\r
`),o=CM(new TextEncoder().encode(r)),a=await fetch("https://gmail.googleapis.com/gmail/v1/users/me/messages/send",{method:"POST",headers:{Authorization:`Bearer ${t}`,"Content-Type":"application/json"},body:JSON.stringify({raw:o})});if(!a.ok){const l=await a.json().catch(()=>({}));throw new Error(l.error?.message||`Gmail API error: ${a.status}`)}const c=await a.json();return console.log("[GMAIL] Email sent successfully:",c.id),c}async function SM(t,e,n,i){const s={sent:0,failed:0,errors:[]};for(let r=0;r<e.length;r++){const o=e[r];try{await TM(t,o.email,n,i),s.sent++,console.log(`[GMAIL] Sent to ${o.name} (${o.email})`)}catch(a){s.failed++;const c=a&&a.message||String(a);s.errors.push({email:o.email,name:o.name,error:c}),console.error(`[GMAIL] Failed to send to ${o.name}:`,c)}r<e.length-1&&await new Promise(a=>setTimeout(a,150))}return console.log(`[GMAIL] Bulk send complete: ${s.sent} sent, ${s.failed} failed`),s}async function IM(){return new Promise(t=>{const e=document.createElement("dialog");e.classList.add("add-contact-modal"),e.innerHTML=`
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
    `;const n=e.querySelector('[data-action="cancel"]'),i=e.querySelector("#contact-search-input"),s=e.querySelector("#import-status"),r=e.querySelector("#contacts-container"),o=e.querySelector("#bulk-actions-container"),a=e.querySelectorAll(".platform-btn");let c="google",l=[],u=[];const d=new Set;function h(){e.close(),e.remove(),t()}n.addEventListener("click",h),e.addEventListener("cancel",h),a.forEach(p=>{p.addEventListener("click",async()=>{if(p.disabled)return;const g=p.getAttribute("data-platform");a.forEach(m=>m.classList.remove("active")),p.classList.add("active"),c=g,g==="google"&&await f()})}),i.addEventListener("input",()=>{const p=i.value.trim().toLowerCase();p?u=l.filter(g=>{const m=(g.name||"").toLowerCase().includes(p),T=(g.email||"").toLowerCase().includes(p);return m||T}):u=l,Ap(r,o,u,d)});async function f(){s.textContent="Requesting access...",s.className="import-status loading",r.innerHTML="",l=[],u=[];try{const p=await by();s.textContent="Fetching contacts...";const g=await EM(p);if(g.length===0){s.textContent="No contacts with email addresses found.",s.className="import-status not-found",r.innerHTML='<p class="empty-state">No contacts found.</p>';return}s.textContent=`Found ${g.length} contacts. Checking HangVidU...`;const m=await Qt(),T=new Set(Object.keys(m||{})),P=g.map(N=>N.email),$=await hy(P),y=An();l=[];for(const N of g){const oe=$[N.email],ye=oe&&oe.uid===y?.uid,J=oe&&T.has(oe.uid);ye||l.push({...N,user:oe,isAlreadySaved:J})}l.sort((N,oe)=>{const ye=ot=>ot.user&&!ot.isAlreadySaved?1:2,J=ye(N),vt=ye(oe);return J!==vt?J-vt:(N.name||"").localeCompare(oe.name||"",void 0,{sensitivity:"base"})}),u=l,s.textContent=`Found ${l.length} contacts`,s.className="import-status success",Ap(r,o,u,d)}catch(p){console.error("[ADD CONTACT] Import error:",p),p.message==="Authorization cancelled"?(s.textContent="Import cancelled.",s.className="import-status cancelled"):(s.textContent=`Error: ${p.message}`,s.className="import-status error"),r.innerHTML='<p class="empty-state">Failed to load contacts.</p>'}}document.body.appendChild(e),e.showModal(),c==="google"&&f()})}function Ap(t,e,n,i){if(t.innerHTML="",n.length===0){t.innerHTML='<p class="empty-state">No contacts found.</p>';return}const s=document.createElement("div");s.className="results-header",s.innerHTML=`
    <label class="select-all-label">
      <input type="checkbox" id="select-all-checkbox" />
      <span>Select All (${n.length})</span>
    </label>
  `,t.appendChild(s);const r=document.createElement("div");r.className="contacts-scroll-list";const o=document.createElement("ul");o.className="contact-list";for(const h of n){const{name:f,email:p,user:g,isAlreadySaved:m}=h,T=document.createElement("li");T.className="contact-item";let P="",$="";if(m?(P='<span class="status-badge saved">✓ Saved</span>',$=""):g?(P='<span class="status-badge on-app">On HangVidU</span>',$=`
        <button type="button" class="invite-btn" data-uid="${Ze(g.uid)}" data-name="${Ze(g.displayName)}">
          Invite
        </button>
      `):(P='<span class="status-badge not-on-app">Not on app</span>',$=""),T.innerHTML=`
      <label class="contact-item-label">
        <input type="checkbox" class="contact-checkbox" data-email="${Ze(p)}" ${m?"disabled":""} />
        <span class="contact-info">
          <strong class="contact-name">${Ze(f)}</strong>
          <small class="contact-email">${Ze(p)}</small>
        </span>
        ${P}
      </label>
      ${$}
    `,g&&!m){const N=T.querySelector(".invite-btn");N.addEventListener("click",async()=>{N.disabled=!0,N.textContent="Sending...";try{await lp(g.uid,g.displayName),N.textContent="✓ Sent",N.classList.add("sent")}catch(oe){console.error("[ADD CONTACT] Invite error:",oe),N.textContent="Error",N.disabled=!1}})}const y=T.querySelector(".contact-checkbox");y&&!m&&(y.checked=i.has(h),y.addEventListener("change",()=>{y.checked?i.add(h):i.delete(h),u()})),o.appendChild(T)}r.appendChild(o),t.appendChild(r);const a=s.querySelector("#select-all-checkbox");a.addEventListener("change",()=>{o.querySelectorAll(".contact-checkbox:not([disabled])").forEach(f=>{f.checked=a.checked;const p=f.getAttribute("data-email"),g=n.find(m=>m.email===p);g&&(a.checked?i.add(g):i.delete(g))}),u()}),e.innerHTML=`
    <div class="bulk-actions">
      <button type="button" id="invite-selected-btn" class="action-btn" disabled>
        Invite Selected (0)
      </button>
      <button type="button" id="share-link-btn" class="action-btn secondary" disabled>
        Email Invite (0)
      </button>
    </div>
  `;const c=e.querySelector("#invite-selected-btn"),l=e.querySelector("#share-link-btn");function u(){const h=Array.from(i),f=h.filter(g=>g.user&&!g.isAlreadySaved).length,p=h.filter(g=>!g.user).length;c.disabled=f===0,c.textContent=`Invite Selected (${f})`,l.disabled=p===0,l.textContent=`Email Invite (${p})`}c.addEventListener("click",async()=>{const h=Array.from(i).filter(p=>p.user&&!p.isAlreadySaved);if(h.length===0)return;c.disabled=!0,c.textContent="Sending invites...";let f=0;for(const p of h)try{await lp(p.user.uid,p.user.displayName),f++}catch(g){console.error("[ADD CONTACT] Failed to invite:",p.name,g)}c.textContent=`✓ Sent ${f} invite${f!==1?"s":""}`,setTimeout(()=>{i.clear(),u(),o.querySelectorAll(".contact-checkbox").forEach(p=>p.checked=!1),a.checked=!1},2e3)}),l.addEventListener("click",async()=>{const h=Array.from(i).filter(f=>!f.user);if(h.length!==0){l.disabled=!0,l.textContent="Requesting permission...";try{const f=await Ey();l.textContent="Sending emails...";const p=D(),g=p?`${window.location.origin}/?ref=${p}`:window.location.origin,T=An()?.displayName||"A friend",P="Join me on HangVidU!",$=`Hi!

${T} invited you to join HangVidU - an app for text messaging, video calls and video sharing.

Click here to get started:
${g}

See you there!`,y=await SM(f,h,P,$);y.sent>0?(l.textContent=`✓ Sent ${y.sent} email${y.sent!==1?"s":""}!`,l.classList.add("success"),setTimeout(()=>{i.clear(),u(),o.querySelectorAll(".contact-checkbox").forEach(N=>N.checked=!1),a.checked=!1,l.classList.remove("success")},3e3)):(l.textContent="Failed to send emails",l.disabled=!1),y.failed>0&&console.warn(`[ADD CONTACT] ${y.failed} emails failed:`,y.errors)}catch(f){console.error("[ADD CONTACT] Gmail send error:",f),f.message==="Authorization cancelled"?(l.textContent="Permission denied - using email client...",setTimeout(()=>{d(h),l.textContent=`Email Invite (${h.length})`,l.disabled=!1},1500)):(l.textContent="Error - try again",l.disabled=!1,alert(`Failed to send emails: ${f.message}

Please try again or use your email client.`))}}});function d(h){const f=D(),p=f?`${window.location.origin}/?ref=${f}`:window.location.origin,m=An()?.displayName||"A friend",T=encodeURIComponent("Join me on HangVidU!"),P=encodeURIComponent(`Hi!

${m} invited you to join HangVidU - an app for text messaging, video calls and video sharing.

Click here to get started:
${p}

See you there!
`);let $;h.length===1?$=`mailto:${h[0].email}?subject=${T}&body=${P}`:$=`mailto:?bcc=${h.map(N=>N.email).join(",")}&subject=${T}&body=${P}`,window.location.href=$}}function kM(){const t=document.querySelector("link[rel~='icon']");return t?t.href:"/favicon.ico"}class RM{constructor(){this.originalTitle=document.title,this.originalFavicon=kM(),this.titleFlashInterval=null,this.isFlashing=!1,this.wakeLock=null,this.setupVisibilityListener()}setupVisibilityListener(){document.addEventListener("visibilitychange",()=>{!document.hidden&&this.isFlashing&&this.stopTitleFlashing()})}startCallIndicators(e){console.log(`[CallIndicators] Starting call indicators for: ${e}`),this.startTitleFlashing(e),this.setFavicon("/HangVidU/icons/phone-ringing.svg"),this.setBadge(1),this.requestWakeLock()}stopCallIndicators(){console.log("[CallIndicators] Stopping call indicators"),this.stopTitleFlashing(),this.restoreFavicon(),this.clearBadge(),this.releaseWakeLock()}startTitleFlashing(e){this.stopTitleFlashing();let n=!0;this.isFlashing=!0,document.title=`📞 Call from ${e}!`,this.titleFlashInterval=setInterval(()=>{this.isFlashing&&(document.title=n?`📞 Call from ${e}!`:this.originalTitle,n=!n)},1e3)}stopTitleFlashing(){this.titleFlashInterval&&(clearInterval(this.titleFlashInterval),this.titleFlashInterval=null),this.isFlashing=!1,document.title=this.originalTitle}setFavicon(e){const n=document.querySelector("link[rel~='icon']");n&&(n.href=e,console.log(`[CallIndicators] Favicon changed to: ${e}`))}restoreFavicon(){this.setFavicon(this.originalFavicon)}setBadge(e){"setAppBadge"in navigator&&navigator.setAppBadge(e).then(()=>{console.log(`[CallIndicators] Badge set to: ${e}`)}).catch(n=>{console.warn("[CallIndicators] Badge not supported:",n)})}clearBadge(){"clearAppBadge"in navigator&&navigator.clearAppBadge().then(()=>{console.log("[CallIndicators] Badge cleared")}).catch(e=>{console.warn("[CallIndicators] Badge clear failed:",e)})}async requestWakeLock(){if("wakeLock"in navigator)try{this.wakeLock=await navigator.wakeLock.request("screen"),console.log("[CallIndicators] Wake lock active"),this.wakeLock.addEventListener("release",()=>{console.log("[CallIndicators] Wake lock released"),this.wakeLock=null},{once:!0})}catch(e){console.warn("[CallIndicators] Wake lock failed:",e)}}releaseWakeLock(){if(this.wakeLock){const e=this.wakeLock;this.wakeLock=null,e.release().then(()=>{console.log("[CallIndicators] Wake lock released manually")}).catch(n=>{console.warn("[CallIndicators] Wake lock release failed:",n)})}}}const kc=new RM;let Np=!1;function AM(t,e){const n=document.createElement("dialog");n.className="copy-link-dialog";const i=document.createElement("div");i.className="copy-link-dialog__content";const s=document.createElement("h2");s.className="copy-link-dialog__title",s.textContent=e.title,i.appendChild(s);const r=document.createElement("div");r.className="copy-link-dialog__input-container";const o=document.createElement("input");o.type="text",o.className="copy-link-dialog__input",o.value=t,o.readOnly=!0,o.setAttribute("aria-label","Link to copy"),r.appendChild(o),i.appendChild(r);const a=document.createElement("div");a.className="copy-link-dialog__buttons";const c=document.createElement("button");c.className="copy-link-dialog__button copy-link-dialog__button--primary",c.textContent=e.buttonText,c.autofocus=!0;const l=document.createElement("button");l.className="copy-link-dialog__button copy-link-dialog__button--secondary",l.textContent=e.cancelText,a.appendChild(c),a.appendChild(l),i.appendChild(a);const u=document.createElement("p");return u.className="copy-link-dialog__feedback",u.setAttribute("aria-live","polite"),i.appendChild(u),n.appendChild(i),{dialog:n,input:o,copyButton:c,cancelButton:l,feedback:u}}function NM(t,e={}){const n={title:"Share this link",buttonText:"Copy",cancelText:"Cancel",successMessage:"✓ Copied to clipboard!",errorMessage:"Failed to copy. Click the link to select it manually.",autoClose:!0,autoCloseDelay:1200,onCopy:null,onError:null,onCancel:null,onClose:null,...e};PM();const{dialog:i,input:s,copyButton:r,cancelButton:o,feedback:a}=AM(t,n);LM(i);let c=!1;const l=async()=>{await OM(t,s)?(c=!0,a.textContent=n.successMessage,a.classList.remove("copy-link-dialog__feedback--error"),n.onCopy&&n.onCopy(t),n.autoClose&&setTimeout(()=>{i.close()},n.autoCloseDelay)):(a.textContent=n.errorMessage,a.classList.add("copy-link-dialog__feedback--error"),s.readOnly=!1,s.addEventListener("click",()=>{s.select()}),n.onError&&n.onError())};return r.addEventListener("click",l),o.addEventListener("click",()=>{n.onCancel&&n.onCancel(),i.close()}),i.addEventListener("keydown",u=>{u.key==="Enter"&&!u.shiftKey&&!u.ctrlKey&&!u.altKey&&!u.metaKey&&(u.preventDefault(),l())}),i.addEventListener("close",()=>{!c&&n.onCancel&&n.onCancel(),n.onClose&&n.onClose(),setTimeout(()=>{i.remove()},300)}),document.body.appendChild(i),i.showModal(),i}function PM(){if(Np)return;const t=document.createElement("style");t.textContent=`
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
  `,document.head.appendChild(t),Np=!0}function LM(t){t.showModal||(t.showModal=function(){this.setAttribute("open",""),this.style.display="block",this.style.position="fixed",this.style.top="50%",this.style.left="50%",this.style.transform="translate(-50%, -50%)";const e=getComputedStyle(document.documentElement).getPropertyValue("--z-ui-overlay").trim();this.style.zIndex=e||"1000"},t.close=function(){this.removeAttribute("open"),this.style.display="none"})}async function OM(t,e=null){if(navigator.clipboard&&navigator.clipboard.writeText)try{return await navigator.clipboard.writeText(t),!0}catch(n){return console.warn("Clipboard API failed, using fallback:",n),!1}if(!e)return!1;try{return e.select(),e.setSelectionRange(0,99999),document.execCommand("copy")}catch(n){return console.error("Fallback copy failed:",n),!1}}function DM(){const t=window.matchMedia&&window.matchMedia("(display-mode: standalone)").matches||navigator.standalone===!0,e=/iphone|ipad|ipod/i.test(navigator.userAgent||"");if(!t||!e||!window.location.hostname.includes("github.io"))return;const i="https://vidu-aae11.web.app",s=i.replace(/\/$/,"");let r;try{r=new URL(s).hostname}catch(l){console.error("[PWA Redirect] Invalid VITE_APP_HOSTING_URL:",i,l);return}if(window.location.hostname===r)return;const o="/HangVidU/";let a=window.location.pathname;a.startsWith(o)?a="/"+a.slice(o.length):a==="/HangVidU"&&(a="/");let c;try{c=new URL(a+window.location.search+window.location.hash,s).toString()}catch(l){console.error("[PWA Redirect] Failed to construct target URL:",l);return}console.log("[PWA Redirect] iOS standalone PWA on gh-pages → redirecting to Firebase Hosting:",c),window.location.replace(c)}DM();w0(!0);v().disable();let Pd=[];async function MM(){tM();const t=Iy(),n=["localVideoEl","remoteVideoEl","localBoxEl","remoteBoxEl","chatControls","lobbyDiv","titleAuthBar"].filter(i=>!t[i]);if(n.length>0)return console.error("Critical elements missing:",n),!1;try{hM(),UM(),await py;const i=wM(Aa);i&&Pd.push(i.dispose);const s=document.querySelector(".top-right-menu");if(s){const r=gM({parent:s,hideWhenAllRead:!0});ke.setToggle(r)}try{if(await ge.initialize())console.log("[MAIN] FCM notifications initialized successfully");else if(console.warn("[MAIN] FCM notifications failed to initialize"),!ge.isNotificationSupported()){const{showPushUnsupportedNotification:o}=await ue(async()=>{const{showPushUnsupportedNotification:a}=await import("./push-unsupported-notification-BCGIf6zX.js");return{showPushUnsupportedNotification:a}},[]);o()}}catch(r){console.error("[MAIN] FCM initialization error:",r)}return window.pushNotificationController=ge,window.notificationController=ge,window.getLoggedInUserId=D,!0}catch(i){return console.error("Initialization error:",i,i&&i.stack),!1}}let Dl=!1;function Dw(){Dl=!1}async function Mw(){Dl||(Dl=!0,await uO(Qe),cM({getLocalStream:Oa,getLocalVideo:()=>Qe,getRemoteVideo:()=>pe,getPeerConnection:()=>Ce.getPeerConnection(),setLocalStream:$o,micBtn:hs,cameraBtn:fs,switchCameraBtn:ds,mutePartnerBtn:_t,fullscreenPartnerBtn:Na,remotePipBtn:Nn}),Qe&&(Qe.addEventListener("enterpictureinpicture",()=>Ee&&C(Ee)),Qe.addEventListener("leavepictureinpicture",()=>{Ee&&!(ci()&&Hy())&&U(Ee)})))}function xw(t){(t?.name==="NotAllowedError"||t?.name==="PermissionDeniedError")&&alert('Camera/microphone access is required for video calls. Please click "Allow" when prompted, or check your browser settings.'),Dw()}function so(t=null){return{localStream:Oa(),localVideoEl:Qe,remoteVideoEl:pe,mutePartnerBtn:_t,setupRemoteStream:dO,setupWatchSync:lL,targetRoomId:t}}function ro(t,e=!1){return t.success?(e&&t.roomLink&&NM(t.roomLink,{onCopy:()=>q("Link ready! Share with your partner."),onCancel:()=>q("Link ready! Use the copy button to use it, or create a new one.")}),!0):!1}async function Lr(t,{forceInitiator:e=!1}={}){try{await Mw()}catch(r){return console.error("Failed to initialize local media stream:",r),xw(r),!1}const n=Date.now();if(e){v().logRoomCreation(t,!0,{creationTime:n,listenerAttachTime:n,timeDiff:0},{trigger:"force_initiator",reason:"calling_saved_contact"});const r=await Ce.createCall(so(t));return ro(r,!1)}let i=await ce.checkRoomStatus(t);if(i.exists&&!i.hasMembers){let o=0;for(;o<3&&!i.hasMembers;)await new Promise(a=>setTimeout(a,250*(o+1))),i=await ce.checkRoomStatus(t),o++}if(!i.exists||!i.hasMembers){v().logRoomCreation(t,!0,{creationTime:n,listenerAttachTime:n,timeDiff:0},{trigger:"room_empty_or_nonexistent",roomExists:i.exists,memberCount:i.memberCount||0});const r=await Ce.createCall(so(t));return ro(r,!0)}v().log("ROOM","JOINING_EXISTING",{roomId:t,memberCount:i.memberCount,roomExists:i.exists});const s=await Ce.answerCall({roomId:t,...so()});return ro(s,!1)}async function Ld(t,e,n=null){const i=fe();if(t&&i===t)return console.warn("[CALL] Cannot call yourself"),!1;if(!n&&t&&i){try{n=rr(i,t),console.log("[CALL] Generated deterministic room ID:",n)}catch(r){return console.error("[CALL] Failed to generate room ID:",r),!1}try{await hr(t,e,n)}catch(r){console.warn("[CALL] Failed to persist room ID (continuing):",r)}}if(!n)return console.error("[CALL] Cannot initiate call: No Room ID available"),!1;Ji(n);const s=await Lr(n,{forceInitiator:!0}).catch(r=>(console.warn("[CALL] Failed to join or create room:",r),!1));if(s){Nd(t).catch(()=>{});const{showCallingUI:r}=await ue(async()=>{const{showCallingUI:o}=await Promise.resolve().then(()=>Ty);return{showCallingUI:o}},void 0);await r(n,e);try{const o=await _y(),a=o?.displayName||o?.email||i;await ge.sendCallNotification(t,{roomId:n,callerId:i,callerName:a}),console.log("[CALL] Push notification sent to:",e)}catch(o){console.warn("[CALL] Failed to send push notification:",o)}}return s}const ze=new Set,Fw=new Map;function Rc(t){t&&(Sr(t),ze.delete(t),Fw.delete(t),v().log("LISTENER","INCOMING_CLEANUP",{roomId:t,remainingListeners:ze.size}))}function xM(){q(`[LISTENER] Removing all incoming listeners (${ze.size} rooms)`);const t=Array.from(ze);t.forEach(e=>{Sr(e)}),ze.clear(),Fw.clear(),v().log("LISTENER","ALL_INCOMING_CLEANUP",{roomsCleared:t.length})}async function FM(t){const e=Date.now(),n=e+1440*60*1e3,i=D();if(i){const s=Ca(i,t);await ee(s,{roomId:t,savedAt:e,expiresAt:n});return}try{const s=localStorage.getItem("recentCalls")||"{}",r=JSON.parse(s);r[t]={roomId:t,savedAt:e,expiresAt:n},localStorage.setItem("recentCalls",JSON.stringify(r))}catch(s){console.warn("Failed to save recent call to localStorage",s)}}async function Ac(t){const e=D();if(e){try{await Xe(Ca(e,t))}catch(n){console.warn("Failed to remove recent call from RTDB",n)}return}try{const n=localStorage.getItem("recentCalls")||"{}",i=JSON.parse(n);i[t]&&(delete i[t],localStorage.setItem("recentCalls",JSON.stringify(i)))}catch(n){console.warn("Failed to remove recent call from localStorage",n)}}function Ji(t){t&&(ze.has(t)&&(ze.delete(t),Sr(t)),q(`[LISTENER] Attaching listener for room: ${t} (total: ${ze.size+1})`),ze.add(t),v().logListenerAttachment(t,"member_join",ze.size,{action:"incoming_call_listener_attached"}),ce.onMemberJoined(t,async e=>{const n=e.key,i=e.val?e.val():null,s=fe();if(n&&n!==s){v().logMemberJoinEvent(t,n,i||{},{detectedBy:"incoming_call_listener",currentUserId:s});const r=i&&typeof i.joinedAt=="number"?i.joinedAt:null,o=2e4;let a=!1,c="none",l=0;if(r&&(l=Date.now()-r,a=l<o,c="joinedAt"),!a){const $=await Cy(t);a=$,c=$?"roomCreatedAt":"failed",l=null}const u={isFresh:a,method:c,age:l,reason:a?"call_is_fresh":"call_is_stale"};if(v().logIncomingCallEvent(n,t,u,{memberData:i,joinedAt:r,CALL_FRESH_MS:o}),!a){v().logNotificationDecision("REJECT","stale_call",t,{age:l,validationMethod:c,joiningUserId:n});return}let d;try{d=await ce.getRoomData(t)}catch{return}if(!d||typeof d!="object")return;const h=!!d.offer,f=!!d.answer,p=d.createdBy;if(!h||f||p===s)return;const g=Ce.getState();if(!!g.pc&&g.pc.connectionState==="connected"){v().logNotificationDecision("REJECT","already_in_call",t,{joiningUserId:n,currentCallState:g.pc?.connectionState});return}v().logNotificationDecision("SHOW","fresh_call_detected",t,{joiningUserId:n,freshnessResult:u});const T=await Pw(t,n);Yn.playIncoming(),kc.startCallIndicators(T);let P=!1;try{P=await Fa(`Incoming call from ${T}.

Accept?`)}finally{Yn.stop(),kc.stopCallIndicators()}if(P)Rc(t),ge.isNotificationEnabled()&&await ge.dismissCallNotifications(t),v().logNotificationDecision("ACCEPT","user_accepted",t,{joiningUserId:n}),Lr(t).catch($=>{console.warn("Failed to answer incoming call:",$),v().logFirebaseOperation("join_room_on_accept",!1,$,{roomId:t,joiningUserId:n})});else{ge.isNotificationEnabled()&&await ge.dismissCallNotifications(t),v().logNotificationDecision("REJECT","user_rejected",t,{joiningUserId:n});try{await ce.rejectCall(t,fe(),"user_rejected")}catch($){console.warn("Failed to signal rejection via RTDB:",$)}await Ac(t).catch($=>{console.warn("Failed to remove recent call on rejection:",$)})}}}),ce.onCallCancelled(t,async e=>{if(!(e&&typeof e.val=="function"?e.val():null))return;Yn.stop(),kc.stopCallIndicators(),ge.isNotificationEnabled()&&await ge.dismissCallNotifications(t).catch(()=>{});try{const{dismissActiveConfirmDialog:s}=await ue(async()=>{const{dismissActiveConfirmDialog:r}=await Promise.resolve().then(()=>wO);return{dismissActiveConfirmDialog:r}},void 0);typeof s=="function"&&s()}catch{}await Ac(t).catch(()=>{});let i=null;try{i=await Al(t)}catch(s){console.warn("[LISTENER] Failed to check saved contact:",s)}i||Rc(t)}),ce.onMemberLeft(t,async e=>{const n=e.key,i=fe();if(!(!n||n===i))try{(await ce.checkRoomStatus(t)).hasMembers||(await Ac(t),await Al(t)?q(`Removed recent call but PRESERVED listeners for saved contact room ${t}`):(Rc(t),q(`Removed saved recent call and listeners for room ${t} because it is now empty`)))}catch(s){console.warn("Failed to evaluate room status on member leave",s)}}))}async function Pp(){const t=Date.now();v().log("LISTENER","STARTUP_BEGIN",{timestamp:t,currentListenerCount:ze.size});try{if(typeof window<"u"){const{getCurrentUserAsync:n}=await ue(async()=>{const{getCurrentUserAsync:i}=await Promise.resolve().then(()=>td);return{getCurrentUserAsync:i}},void 0);await n()}}catch{}const e=D();if(v().log("LISTENER","AUTH_STATE_DETERMINED",{isLoggedIn:!!e,userId:e||"guest"}),e){const n=k_(e);try{const i=await Le(n),s=i.exists()?i.val():null,r=new Set;if(s)for(const[o,a]of Object.entries(s)){if(!a||a.expiresAt&&a.expiresAt<Date.now()){await Xe(Ca(e,o)).catch(()=>{});continue}r.add(o)}try{const o=await Qt();Object.entries(o||{}).forEach(([a,c])=>{if(c?.roomId)r.add(c.roomId);else if(a&&e)try{const l=rr(e,a);r.add(l)}catch{}})}catch{}r.forEach(o=>Ji(o)),v().log("LISTENER","STARTUP_COMPLETE",{storage:"rtdb",roomsToListen:Array.from(r),totalListeners:ze.size,duration:Date.now()-t})}catch(i){console.warn("Failed to read recent calls from RTDB",i),v().logFirebaseOperation("read_recent_calls",!1,i,{storage:"rtdb",userId:e})}return}try{const n=localStorage.getItem("recentCalls")||"{}",i=JSON.parse(n),s={},r=new Set;for(const[o,a]of Object.entries(i||{}))!a||a.expiresAt&&a.expiresAt<Date.now()||(s[o]=a,r.add(o));try{const o=await Qt(),a=fe();Object.entries(o||{}).forEach(([c,l])=>{if(l?.roomId)r.add(l.roomId);else if(c&&a)try{const u=rr(a,c);r.add(u)}catch{}})}catch{}r.forEach(o=>Ji(o)),localStorage.setItem("recentCalls",JSON.stringify(s)),v().log("LISTENER","STARTUP_COMPLETE",{storage:"localStorage",roomsToListen:Array.from(r),totalListeners:ze.size,duration:Date.now()-t,expiredRoomsRemoved:Object.keys(i||{}).length-r.size})}catch(n){console.warn("Failed to read recent calls from localStorage",n),v().logFirebaseOperation("read_recent_calls",!1,n,{storage:"localStorage"})}}function qr(){return B&&$e&&!$e.classList.contains("hidden")&&B.src&&B.src.trim()!==""}let Lp=!1;function UM(){if(Lp)return;const t=()=>{const e=document.activeElement;return e&&(e.tagName==="INPUT"||e.tagName==="TEXTAREA"||e.isContentEditable)};document.addEventListener("keydown",e=>{t()||(e.key==="w"||e.key==="W")&&(console.log("=== W KEY PRESSED ==="),console.log("lastWatched:",St()),console.log("isYTVisible():",_c()),console.log("isSharedVideoVisible():",qr()),console.log("isWatchModeActive():",ci()),St()==="yt"?_c()?(Bo(),xs()):($y(),Vo()):(St()==="url"||St()==="file")&&(qr()?(C($e),xs()):(U($e),Vo()))),e.key==="Escape"&&ci()&&(St()==="yt"&&_c()?(Pr(),Bo()):(St()==="url"&&qr()||St()==="file"&&qr())&&(B.pause(),C($e)),xs())}),Lp=!0}const Uw=async()=>{try{await Mw();const t=await Ce.createCall(so());ro(t,!0)}catch(t){console.error("Failed to start call:",t),xw(t)}};qe.onclick=Uw;Mn.onclick=Uw;Pi&&(navigator.clipboard&&navigator.clipboard.readText?Pi.onclick=async()=>{try{const t=await navigator.clipboard.readText(),e=$M(t);if(!e){alert("No valid room link found in clipboard.");return}await Lr(e)}catch(t){t.name==="NotAllowedError"?alert("Clipboard access denied. Please allow clipboard access or paste the link manually."):(console.error("Paste & Join failed:",t),alert("Failed to read clipboard. Please try again."))}}:(Pi.style.display="none",console.warn("Paste & Join button hidden: Clipboard API not available in this context (requires HTTPS).")));ar&&(ar.onclick=async()=>{await IM()});ai&&(ai.onclick=()=>{St()==="yt"?(Pr(),Bo()):(St()==="url"||St()==="file")&&(B.pause(),B.src.startsWith("blob:")&&URL.revokeObjectURL(B.src),C($e)),xs()});mt.onclick=async()=>{console.debug("Hanging up..."),await Ce.hangUp({emitCancel:!0,reason:"user_hung_up"})};function $M(t){let e=t.trim();if(!e)return"";try{const n=new URL(e,window.location.origin),i=n.searchParams.get("room");if(i)return i;const s=n.hash.match(/room=([^&]+)/);return s?decodeURIComponent(s[1]):n.pathname.replace(/^\//,"")||e}catch{return e}}async function BM(){const e=new URLSearchParams(window.location.search).get("room");if(!e)return!1;const n=await Lr(e);return n||(Ra(),Gy()),n}const Ml=[];let Cs=!1;async function oo(){if(Cs||Ml.length===0)return;Cs=!0;const{fromUserId:t,inviteData:e}=Ml.shift();try{const n=mM({fromUserId:t,inviteData:e,onAccept:async()=>{try{await rw(t,e),console.log("[INVITATIONS] Contact added:",e.fromName),await Nt(Ye).catch(()=>{}),xa(`✅ ${e.fromName} added to contacts!`),ke.remove(`invite-${t}`)}catch(i){console.error("[INVITATIONS] Failed to accept invite:",i),QL("Failed to add contact. Please try again.")}finally{Cs=!1,oo()}},onDecline:async()=>{try{await fO(t),console.log("[INVITATIONS] Invite declined"),ke.remove(`invite-${t}`)}catch(i){console.error("[INVITATIONS] Failed to decline invite:",i)}finally{Cs=!1,oo()}}});ke.add(`invite-${t}`,n),ke.isListVisible()||ke.showList()}catch(n){console.error("[INVITATIONS] Failed to process invite:",n),Cs=!1,oo()}}function Op(){hO((t,e)=>{Ml.push({fromUserId:t,inviteData:e}),oo()}),pO(async(t,e)=>{console.log("[INVITATIONS] Your invite was accepted by:",e.acceptedByName),await Nt(Ye).catch(()=>{}),xa(`✅ ${e.acceptedByName} is now in your contacts!`)})}window.onload=async()=>{if(await _O(),!await MM()){qe&&(qe.disabled=!0,qe.title="Initialization failed. Please reload the page or check your camera/microphone permissions."),console.error("Initialization failed. Call functionality disabled. Please reload the page."),alert(`Hangvidu could not initialize properly.

Please check your camera/microphone permissions and reload the page.`);return}nM(Ce),document.addEventListener("contact:call",s=>{const{contactId:r,contactName:o,roomId:a}=s.detail;Ld(r,o,a)}),document.addEventListener("contact:saved",s=>{Ji(s.detail.roomId)}),await Pp().catch(s=>console.warn("Failed to start saved-room listeners",s)),Nt(Ye).catch(s=>{console.warn("Failed to render contacts list:",s)});let e=null;const n=ed(async({isLoggedIn:s,user:r})=>{try{const o=e===null,a=e===!0&&!s,c=e===!1&&s;e=s,await Nt(Ye),a?(q("[AUTH] User logged out - cleaning up messaging and listeners"),li.reset(),bn.closeAllSessions(),ge.isNotificationEnabled()&&await ge.disable().catch(l=>{console.warn("[AUTH] Failed to disable notifications on logout:",l)}),xM(),kl()):c?(q("[AUTH] User logged in - re-attaching incoming listeners"),await up().catch(u=>console.warn("[REFERRAL] Failed to process referral on login:",u)),await Nt(Ye).catch(()=>{}),await Pp().catch(u=>console.warn("Failed to re-attach saved-room listeners on login",u)),Op(),(await ge.enableIfGranted().catch(u=>(console.warn("[AUTH] Push notification setup failed:",u),{state:"error"}))).state==="prompt-needed"&&Ep()):o&&s&&(q("[AUTH] Initial load with logged-in user"),await up().catch(u=>console.warn("[REFERRAL] Failed to process referral on initial load:",u)),Op(),(await ge.enableIfGranted().catch(u=>(console.warn("[AUTH] Push notification setup failed:",u),{state:"error"}))).state==="prompt-needed"&&Ep())}catch(o){console.warn("Failed to handle auth change:",o)}});Pd.push(()=>{try{typeof n=="function"&&n()}catch{}}),await BM()};window.addEventListener("beforeunload",async t=>{const e=Ce.getState();if(e.pc&&e.pc.connectionState==="connected")return t.preventDefault(),t.returnValue="You are in an active call. Are you sure you want to leave?",t.returnValue;await HM()});Ce.on("memberJoined",({memberId:t,roomId:e})=>{console.debug("CallController memberJoined event",{memberId:t,roomId:e}),Ce.setPartnerId(t),li.showMessagesToggle(),li.openContactMessages(t,t),sd().catch(n=>console.warn("Failed to clear calling state:",n)),FM(e).catch(n=>console.warn("Failed to save recent call:",n))});Ce.on("memberLeft",({memberId:t})=>{console.info("Partner has left the call")});Ce.on("cleanup",async({roomId:t,partnerId:e,reason:n,role:i,wasConnected:s})=>{if(i==="initiator"&&!e&&!s&&t){console.log("[MAIN] Potential missed call detected for room:",t);try{const{getContactByRoomId:a}=await ue(async()=>{const{getContactByRoomId:l}=await Promise.resolve().then(()=>Nl);return{getContactByRoomId:l}},void 0),c=await a(t);if(c&&c.contactId){const{getCurrentUser:l}=await ue(async()=>{const{getCurrentUser:g}=await Promise.resolve().then(()=>td);return{getCurrentUser:g}},void 0),d=l()?.displayName||"Friend";console.log(`[MAIN] Sending missed call push notification to ${c.contactName} (${c.contactId})`),await ge.sendMissedCallNotification(c.contactId,{roomId:t,callerId:fe(),callerName:d});const{createMissedCallNotification:h}=await ue(async()=>{const{createMissedCallNotification:g}=await import("./missed-call-notification-DvuXi_WX.js");return{createMissedCallNotification:g}},[]),f=`missed-call-${c.contactId}-${Date.now()}`,p=h({callerId:c.contactId,callerName:c.contactName,roomId:t,onCallBack:async()=>{await Ld(c.contactId,c.contactName),ke.remove(f)},onDismiss:()=>{ke.remove(f)}});ke.add(f,p),console.log("[MAIN] In-app missed call notification added")}else console.log("[MAIN] No saved contact found for room, skipping missed call notification")}catch(a){console.warn("[MAIN] Failed to handle missed call:",a)}}t&&ge.isNotificationEnabled()&&ge.dismissCallNotifications(t).catch(a=>{console.warn("[MAIN] Failed to dismiss call notifications:",a)});const o=Ce.getState();o.messagesUI&&typeof o.messagesUI.cleanup=="function"&&(o.messagesUI.cleanup(),o.messagesUI=null),My(),Ra(),t&&n!=="page_unload"&&Ji(t),e&&t&&setTimeout(()=>{Lw(e,t,Ye).catch(a=>{console.warn("Failed to save contact after cleanup:",a)})},500)});async function HM(){await Ce.hangUp({emitCancel:!0,reason:"page_unload"}),lM(),T_(),Ow(),Pa();const t=Ce.getState();t.messagesUI&&t.messagesUI.cleanup&&t.messagesUI.cleanup(),window.history.replaceState({},document.title,window.location.pathname),B.src="",Fy(),Qe&&Qe.srcObject&&(Qe.srcObject=null),pe&&pe.srcObject&&(pe.srcObject=null),xs(),cL("none"),pd(),fM(),Ra(),Uy(!1),Pd.forEach(e=>e())}const VM=Object.freeze(Object.defineProperty({__proto__:null,callContact:Ld,joinOrCreateRoomWithId:Lr,listenForIncomingOnRoom:Ji,resetLocalStreamInitFlag:Dw},Symbol.toStringTag,{value:"Module"}));export{Da as a,y0 as b,vd as c,q as d,Ze as e,C as h,ke as i,U as s};
