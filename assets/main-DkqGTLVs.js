(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))r(i);new MutationObserver(i=>{for(const s of i)if(s.type==="childList")for(const o of s.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&r(o)}).observe(document,{childList:!0,subtree:!0});function n(i){const s={};return i.integrity&&(s.integrity=i.integrity),i.referrerPolicy&&(s.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?s.credentials="include":i.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function r(i){if(i.ep)return;i.ep=!0;const s=n(i);fetch(i.href,s)}})();const rm="modulepreload",im=function(t){return"/HangVidU/"+t},Tl={},tt=function(e,n,r){let i=Promise.resolve();if(n&&n.length>0){let c=function(l){return Promise.all(l.map(u=>Promise.resolve(u).then(d=>({status:"fulfilled",value:d}),d=>({status:"rejected",reason:d}))))};document.getElementsByTagName("link");const o=document.querySelector("meta[property=csp-nonce]"),a=o?.nonce||o?.getAttribute("nonce");i=c(n.map(l=>{if(l=im(l),l in Tl)return;Tl[l]=!0;const u=l.endsWith(".css"),d=u?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${l}"]${d}`))return;const h=document.createElement("link");if(h.rel=u?"stylesheet":rm,u||(h.as="script"),h.crossOrigin="",h.href=l,a&&h.setAttribute("nonce",a),document.head.appendChild(h),u)return new Promise((f,p)=>{h.addEventListener("load",f),h.addEventListener("error",()=>p(new Error(`Unable to preload CSS for ${l}`)))})}))}function s(o){const a=new Event("vite:preloadError",{cancelable:!0});if(a.payload=o,window.dispatchEvent(a),!a.defaultPrevented)throw o}return i.then(o=>{for(const a of o||[])a.status==="rejected"&&s(a.reason);return e().catch(s)})},C=typeof __SENTRY_DEBUG__>"u"||__SENTRY_DEBUG__,O=globalThis,tn="10.26.0";function ws(){return bs(O),O}function bs(t){const e=t.__SENTRY__=t.__SENTRY__||{};return e.version=e.version||tn,e[tn]=e[tn]||{}}function Yn(t,e,n=O){const r=n.__SENTRY__=n.__SENTRY__||{},i=r[tn]=r[tn]||{};return i[t]||(i[t]=e())}const sm=["debug","info","warn","error","log","assert","trace"],om="Sentry Logger ",ji={};function Kn(t){if(!("console"in O))return t();const e=O.console,n={},r=Object.keys(ji);r.forEach(i=>{const s=ji[i];n[i]=e[i],e[i]=s});try{return t()}finally{r.forEach(i=>{e[i]=n[i]})}}function am(){Fa().enabled=!0}function cm(){Fa().enabled=!1}function Zd(){return Fa().enabled}function lm(...t){xa("log",...t)}function um(...t){xa("warn",...t)}function dm(...t){xa("error",...t)}function xa(t,...e){C&&Zd()&&Kn(()=>{O.console[t](`${om}[${t}]:`,...e)})}function Fa(){return C?Yn("loggerSettings",()=>({enabled:!1})):{enabled:!1}}const w={enable:am,disable:cm,isEnabled:Zd,log:lm,warn:um,error:dm},eh=50,sn="?",Il=/\(error: (.*)\)/,kl=/captureMessage|captureException/;function th(...t){const e=t.sort((n,r)=>n[0]-r[0]).map(n=>n[1]);return(n,r=0,i=0)=>{const s=[],o=n.split(`
`);for(let a=r;a<o.length;a++){let c=o[a];c.length>1024&&(c=c.slice(0,1024));const l=Il.test(c)?c.replace(Il,"$1"):c;if(!l.match(/\S*Error: /)){for(const u of e){const d=u(l);if(d){s.push(d);break}}if(s.length>=eh+i)break}}return fm(s.slice(i))}}function hm(t){return Array.isArray(t)?th(...t):t}function fm(t){if(!t.length)return[];const e=Array.from(t);return/sentryWrapped/.test(mi(e).function||"")&&e.pop(),e.reverse(),kl.test(mi(e).function||"")&&(e.pop(),kl.test(mi(e).function||"")&&e.pop()),e.slice(0,eh).map(n=>({...n,filename:n.filename||mi(e).filename,function:n.function||sn}))}function mi(t){return t[t.length-1]||{}}const ro="<anonymous>";function xt(t){try{return!t||typeof t!="function"?ro:t.name||ro}catch{return ro}}function Rl(t){const e=t.exception;if(e){const n=[];try{return e.values.forEach(r=>{r.stacktrace.frames&&n.push(...r.stacktrace.frames)}),n}catch{return}}}function nh(t){return"__v_isVNode"in t&&t.__v_isVNode?"[VueVNode]":"[VueViewModel]"}const Ri={},Al={};function fn(t,e){Ri[t]=Ri[t]||[],Ri[t].push(e)}function pn(t,e){if(!Al[t]){Al[t]=!0;try{e()}catch(n){C&&w.error(`Error while instrumenting ${t}`,n)}}}function $e(t,e){const n=t&&Ri[t];if(n)for(const r of n)try{r(e)}catch(i){C&&w.error(`Error while triggering instrumentation handler.
Type: ${t}
Name: ${xt(r)}
Error:`,i)}}let io=null;function pm(t){const e="error";fn(e,t),pn(e,gm)}function gm(){io=O.onerror,O.onerror=function(t,e,n,r,i){return $e("error",{column:r,error:i,line:n,msg:t,url:e}),io?io.apply(this,arguments):!1},O.onerror.__SENTRY_INSTRUMENTED__=!0}let so=null;function mm(t){const e="unhandledrejection";fn(e,t),pn(e,_m)}function _m(){so=O.onunhandledrejection,O.onunhandledrejection=function(t){return $e("unhandledrejection",t),so?so.apply(this,arguments):!0},O.onunhandledrejection.__SENTRY_INSTRUMENTED__=!0}const rh=Object.prototype.toString;function Ua(t){switch(rh.call(t)){case"[object Error]":case"[object Exception]":case"[object DOMException]":case"[object WebAssembly.Exception]":return!0;default:return Ft(t,Error)}}function Jn(t,e){return rh.call(t)===`[object ${e}]`}function ih(t){return Jn(t,"ErrorEvent")}function Nl(t){return Jn(t,"DOMError")}function ym(t){return Jn(t,"DOMException")}function ot(t){return Jn(t,"String")}function $a(t){return typeof t=="object"&&t!==null&&"__sentry_template_string__"in t&&"__sentry_template_values__"in t}function Ss(t){return t===null||$a(t)||typeof t!="object"&&typeof t!="function"}function Mr(t){return Jn(t,"Object")}function Cs(t){return typeof Event<"u"&&Ft(t,Event)}function Em(t){return typeof Element<"u"&&Ft(t,Element)}function vm(t){return Jn(t,"RegExp")}function Qr(t){return!!(t?.then&&typeof t.then=="function")}function wm(t){return Mr(t)&&"nativeEvent"in t&&"preventDefault"in t&&"stopPropagation"in t}function Ft(t,e){try{return t instanceof e}catch{return!1}}function sh(t){return!!(typeof t=="object"&&t!==null&&(t.__isVue||t._isVue||t.__v_isVNode))}function bm(t){return typeof Request<"u"&&Ft(t,Request)}const Ba=O,Sm=80;function oh(t,e={}){if(!t)return"<unknown>";try{let n=t;const r=5,i=[];let s=0,o=0;const a=" > ",c=a.length;let l;const u=Array.isArray(e)?e:e.keyAttrs,d=!Array.isArray(e)&&e.maxStringLength||Sm;for(;n&&s++<r&&(l=Cm(n,u),!(l==="html"||s>1&&o+i.length*c+l.length>=d));)i.push(l),o+=l.length,n=n.parentNode;return i.reverse().join(a)}catch{return"<unknown>"}}function Cm(t,e){const n=t,r=[];if(!n?.tagName)return"";if(Ba.HTMLElement&&n instanceof HTMLElement&&n.dataset){if(n.dataset.sentryComponent)return n.dataset.sentryComponent;if(n.dataset.sentryElement)return n.dataset.sentryElement}r.push(n.tagName.toLowerCase());const i=e?.length?e.filter(o=>n.getAttribute(o)).map(o=>[o,n.getAttribute(o)]):null;if(i?.length)i.forEach(o=>{r.push(`[${o[0]}="${o[1]}"]`)});else{n.id&&r.push(`#${n.id}`);const o=n.className;if(o&&ot(o)){const a=o.split(/\s+/);for(const c of a)r.push(`.${c}`)}}const s=["aria-label","type","name","title","alt"];for(const o of s){const a=n.getAttribute(o);a&&r.push(`[${o}="${a}"]`)}return r.join("")}function Ha(){try{return Ba.document.location.href}catch{return""}}function Tm(t){if(!Ba.HTMLElement)return null;let e=t;const n=5;for(let r=0;r<n;r++){if(!e)return null;if(e instanceof HTMLElement){if(e.dataset.sentryComponent)return e.dataset.sentryComponent;if(e.dataset.sentryElement)return e.dataset.sentryElement}e=e.parentNode}return null}function Ce(t,e,n){if(!(e in t))return;const r=t[e];if(typeof r!="function")return;const i=n(r);typeof i=="function"&&ah(i,r);try{t[e]=i}catch{C&&w.log(`Failed to replace method "${e}" in object`,t)}}function on(t,e,n){try{Object.defineProperty(t,e,{value:n,writable:!0,configurable:!0})}catch{C&&w.log(`Failed to add non-enumerable property "${e}" to object`,t)}}function ah(t,e){try{const n=e.prototype||{};t.prototype=e.prototype=n,on(t,"__sentry_original__",e)}catch{}}function Wa(t){return t.__sentry_original__}function ch(t){if(Ua(t))return{message:t.message,name:t.name,stack:t.stack,...Ll(t)};if(Cs(t)){const e={type:t.type,target:Pl(t.target),currentTarget:Pl(t.currentTarget),...Ll(t)};return typeof CustomEvent<"u"&&Ft(t,CustomEvent)&&(e.detail=t.detail),e}else return t}function Pl(t){try{return Em(t)?oh(t):Object.prototype.toString.call(t)}catch{return"<unknown>"}}function Ll(t){if(typeof t=="object"&&t!==null){const e={};for(const n in t)Object.prototype.hasOwnProperty.call(t,n)&&(e[n]=t[n]);return e}else return{}}function Im(t){const e=Object.keys(ch(t));return e.sort(),e[0]?e.join(", "):"[object has no keys]"}function lh(t,e=0){return typeof t!="string"||e===0||t.length<=e?t:`${t.slice(0,e)}...`}function Ol(t,e){if(!Array.isArray(t))return"";const n=[];for(let r=0;r<t.length;r++){const i=t[r];try{sh(i)?n.push(nh(i)):n.push(String(i))}catch{n.push("[value cannot be serialized]")}}return n.join(e)}function Ai(t,e,n=!1){return ot(t)?vm(e)?e.test(t):ot(e)?n?t===e:t.includes(e):!1:!1}function Ts(t,e=[],n=!1){return e.some(r=>Ai(t,r,n))}function km(){const t=O;return t.crypto||t.msCrypto}let oo;function Rm(){return Math.random()*16}function Re(t=km()){try{if(t?.randomUUID)return t.randomUUID().replace(/-/g,"")}catch{}return oo||(oo="10000000100040008000"+1e11),oo.replace(/[018]/g,e=>(e^(Rm()&15)>>e/4).toString(16))}function uh(t){return t.exception?.values?.[0]}function Xt(t){const{message:e,event_id:n}=t;if(e)return e;const r=uh(t);return r?r.type&&r.value?`${r.type}: ${r.value}`:r.type||r.value||n||"<unknown>":n||"<unknown>"}function xo(t,e,n){const r=t.exception=t.exception||{},i=r.values=r.values||[],s=i[0]=i[0]||{};s.value||(s.value=e||""),s.type||(s.type="Error")}function On(t,e){const n=uh(t);if(!n)return;const r={type:"generic",handled:!0},i=n.mechanism;if(n.mechanism={...r,...i,...e},e&&"data"in e){const s={...i?.data,...e.data};n.mechanism.data=s}}function Dl(t){if(Am(t))return!0;try{on(t,"__sentry_captured__",!0)}catch{}return!1}function Am(t){try{return t.__sentry_captured__}catch{}}const dh=1e3;function Zr(){return Date.now()/dh}function Nm(){const{performance:t}=O;if(!t?.now||!t.timeOrigin)return Zr;const e=t.timeOrigin;return()=>(e+t.now())/dh}let Ml;function at(){return(Ml??(Ml=Nm()))()}function Pm(t){const e=at(),n={sid:Re(),init:!0,timestamp:e,started:e,duration:0,status:"ok",errors:0,ignoreDuration:!1,toJSON:()=>Om(n)};return t&&Dn(n,t),n}function Dn(t,e={}){if(e.user&&(!t.ipAddress&&e.user.ip_address&&(t.ipAddress=e.user.ip_address),!t.did&&!e.did&&(t.did=e.user.id||e.user.email||e.user.username)),t.timestamp=e.timestamp||at(),e.abnormal_mechanism&&(t.abnormal_mechanism=e.abnormal_mechanism),e.ignoreDuration&&(t.ignoreDuration=e.ignoreDuration),e.sid&&(t.sid=e.sid.length===32?e.sid:Re()),e.init!==void 0&&(t.init=e.init),!t.did&&e.did&&(t.did=`${e.did}`),typeof e.started=="number"&&(t.started=e.started),t.ignoreDuration)t.duration=void 0;else if(typeof e.duration=="number")t.duration=e.duration;else{const n=t.timestamp-t.started;t.duration=n>=0?n:0}e.release&&(t.release=e.release),e.environment&&(t.environment=e.environment),!t.ipAddress&&e.ipAddress&&(t.ipAddress=e.ipAddress),!t.userAgent&&e.userAgent&&(t.userAgent=e.userAgent),typeof e.errors=="number"&&(t.errors=e.errors),e.status&&(t.status=e.status)}function Lm(t,e){let n={};t.status==="ok"&&(n={status:"exited"}),Dn(t,n)}function Om(t){return{sid:`${t.sid}`,init:t.init,started:new Date(t.started*1e3).toISOString(),timestamp:new Date(t.timestamp*1e3).toISOString(),status:t.status,errors:t.errors,did:typeof t.did=="number"||typeof t.did=="string"?`${t.did}`:void 0,duration:t.duration,abnormal_mechanism:t.abnormal_mechanism,attrs:{release:t.release,environment:t.environment,ip_address:t.ipAddress,user_agent:t.userAgent}}}function ei(t,e,n=2){if(!e||typeof e!="object"||n<=0)return e;if(t&&Object.keys(e).length===0)return t;const r={...t};for(const i in e)Object.prototype.hasOwnProperty.call(e,i)&&(r[i]=ei(r[i],e[i],n-1));return r}function xl(){return Re()}function hh(){return Re().substring(16)}const Fo="_sentrySpan";function Fl(t,e){e?on(t,Fo,e):delete t[Fo]}function Ul(t){return t[Fo]}const Dm=100;class ut{constructor(){this._notifyingListeners=!1,this._scopeListeners=[],this._eventProcessors=[],this._breadcrumbs=[],this._attachments=[],this._user={},this._tags={},this._extra={},this._contexts={},this._sdkProcessingMetadata={},this._propagationContext={traceId:xl(),sampleRand:Math.random()}}clone(){const e=new ut;return e._breadcrumbs=[...this._breadcrumbs],e._tags={...this._tags},e._extra={...this._extra},e._contexts={...this._contexts},this._contexts.flags&&(e._contexts.flags={values:[...this._contexts.flags.values]}),e._user=this._user,e._level=this._level,e._session=this._session,e._transactionName=this._transactionName,e._fingerprint=this._fingerprint,e._eventProcessors=[...this._eventProcessors],e._attachments=[...this._attachments],e._sdkProcessingMetadata={...this._sdkProcessingMetadata},e._propagationContext={...this._propagationContext},e._client=this._client,e._lastEventId=this._lastEventId,Fl(e,Ul(this)),e}setClient(e){this._client=e}setLastEventId(e){this._lastEventId=e}getClient(){return this._client}lastEventId(){return this._lastEventId}addScopeListener(e){this._scopeListeners.push(e)}addEventProcessor(e){return this._eventProcessors.push(e),this}setUser(e){return this._user=e||{email:void 0,id:void 0,ip_address:void 0,username:void 0},this._session&&Dn(this._session,{user:e}),this._notifyScopeListeners(),this}getUser(){return this._user}setTags(e){return this._tags={...this._tags,...e},this._notifyScopeListeners(),this}setTag(e,n){return this.setTags({[e]:n})}setExtras(e){return this._extra={...this._extra,...e},this._notifyScopeListeners(),this}setExtra(e,n){return this._extra={...this._extra,[e]:n},this._notifyScopeListeners(),this}setFingerprint(e){return this._fingerprint=e,this._notifyScopeListeners(),this}setLevel(e){return this._level=e,this._notifyScopeListeners(),this}setTransactionName(e){return this._transactionName=e,this._notifyScopeListeners(),this}setContext(e,n){return n===null?delete this._contexts[e]:this._contexts[e]=n,this._notifyScopeListeners(),this}setSession(e){return e?this._session=e:delete this._session,this._notifyScopeListeners(),this}getSession(){return this._session}update(e){if(!e)return this;const n=typeof e=="function"?e(this):e,r=n instanceof ut?n.getScopeData():Mr(n)?e:void 0,{tags:i,extra:s,user:o,contexts:a,level:c,fingerprint:l=[],propagationContext:u}=r||{};return this._tags={...this._tags,...i},this._extra={...this._extra,...s},this._contexts={...this._contexts,...a},o&&Object.keys(o).length&&(this._user=o),c&&(this._level=c),l.length&&(this._fingerprint=l),u&&(this._propagationContext=u),this}clear(){return this._breadcrumbs=[],this._tags={},this._extra={},this._user={},this._contexts={},this._level=void 0,this._transactionName=void 0,this._fingerprint=void 0,this._session=void 0,Fl(this,void 0),this._attachments=[],this.setPropagationContext({traceId:xl(),sampleRand:Math.random()}),this._notifyScopeListeners(),this}addBreadcrumb(e,n){const r=typeof n=="number"?n:Dm;if(r<=0)return this;const i={timestamp:Zr(),...e,message:e.message?lh(e.message,2048):e.message};return this._breadcrumbs.push(i),this._breadcrumbs.length>r&&(this._breadcrumbs=this._breadcrumbs.slice(-r),this._client?.recordDroppedEvent("buffer_overflow","log_item")),this._notifyScopeListeners(),this}getLastBreadcrumb(){return this._breadcrumbs[this._breadcrumbs.length-1]}clearBreadcrumbs(){return this._breadcrumbs=[],this._notifyScopeListeners(),this}addAttachment(e){return this._attachments.push(e),this}clearAttachments(){return this._attachments=[],this}getScopeData(){return{breadcrumbs:this._breadcrumbs,attachments:this._attachments,contexts:this._contexts,tags:this._tags,extra:this._extra,user:this._user,level:this._level,fingerprint:this._fingerprint||[],eventProcessors:this._eventProcessors,propagationContext:this._propagationContext,sdkProcessingMetadata:this._sdkProcessingMetadata,transactionName:this._transactionName,span:Ul(this)}}setSDKProcessingMetadata(e){return this._sdkProcessingMetadata=ei(this._sdkProcessingMetadata,e,2),this}setPropagationContext(e){return this._propagationContext=e,this}getPropagationContext(){return this._propagationContext}captureException(e,n){const r=n?.event_id||Re();if(!this._client)return C&&w.warn("No client configured on scope - will not capture exception!"),r;const i=new Error("Sentry syntheticException");return this._client.captureException(e,{originalException:e,syntheticException:i,...n,event_id:r},this),r}captureMessage(e,n,r){const i=r?.event_id||Re();if(!this._client)return C&&w.warn("No client configured on scope - will not capture message!"),i;const s=r?.syntheticException??new Error(e);return this._client.captureMessage(e,n,{originalException:e,syntheticException:s,...r,event_id:i},this),i}captureEvent(e,n){const r=n?.event_id||Re();return this._client?(this._client.captureEvent(e,{...n,event_id:r},this),r):(C&&w.warn("No client configured on scope - will not capture event!"),r)}_notifyScopeListeners(){this._notifyingListeners||(this._notifyingListeners=!0,this._scopeListeners.forEach(e=>{e(this)}),this._notifyingListeners=!1)}}function Mm(){return Yn("defaultCurrentScope",()=>new ut)}function xm(){return Yn("defaultIsolationScope",()=>new ut)}class Fm{constructor(e,n){let r;e?r=e:r=new ut;let i;n?i=n:i=new ut,this._stack=[{scope:r}],this._isolationScope=i}withScope(e){const n=this._pushScope();let r;try{r=e(n)}catch(i){throw this._popScope(),i}return Qr(r)?r.then(i=>(this._popScope(),i),i=>{throw this._popScope(),i}):(this._popScope(),r)}getClient(){return this.getStackTop().client}getScope(){return this.getStackTop().scope}getIsolationScope(){return this._isolationScope}getStackTop(){return this._stack[this._stack.length-1]}_pushScope(){const e=this.getScope().clone();return this._stack.push({client:this.getClient(),scope:e}),e}_popScope(){return this._stack.length<=1?!1:!!this._stack.pop()}}function Mn(){const t=ws(),e=bs(t);return e.stack=e.stack||new Fm(Mm(),xm())}function Um(t){return Mn().withScope(t)}function $m(t,e){const n=Mn();return n.withScope(()=>(n.getStackTop().scope=t,e(t)))}function $l(t){return Mn().withScope(()=>t(Mn().getIsolationScope()))}function Bm(){return{withIsolationScope:$l,withScope:Um,withSetScope:$m,withSetIsolationScope:(t,e)=>$l(e),getCurrentScope:()=>Mn().getScope(),getIsolationScope:()=>Mn().getIsolationScope()}}function ja(t){const e=bs(t);return e.acs?e.acs:Bm()}function Wt(){const t=ws();return ja(t).getCurrentScope()}function ti(){const t=ws();return ja(t).getIsolationScope()}function Hm(){return Yn("globalScope",()=>new ut)}function Wm(...t){const e=ws(),n=ja(e);if(t.length===2){const[r,i]=t;return r?n.withSetScope(r,i):n.withScope(i)}return n.withScope(t[0])}function _e(){return Wt().getClient()}function jm(t){const e=t.getPropagationContext(),{traceId:n,parentSpanId:r,propagationSpanId:i}=e,s={trace_id:n,span_id:i||hh()};return r&&(s.parent_span_id=r),s}const Vm="sentry.source",zm="sentry.sample_rate",Gm="sentry.previous_trace_sample_rate",qm="sentry.op",Ym="sentry.origin",fh="sentry.profile_id",ph="sentry.exclusive_time",Km=0,Jm=1,Xm="_sentryScope",Qm="_sentryIsolationScope";function Zm(t){if(t){if(typeof t=="object"&&"deref"in t&&typeof t.deref=="function")try{return t.deref()}catch{return}return t}}function gh(t){const e=t;return{scope:e[Xm],isolationScope:Zm(e[Qm])}}const e_="sentry-",t_=/^sentry-/;function n_(t){const e=r_(t);if(!e)return;const n=Object.entries(e).reduce((r,[i,s])=>{if(i.match(t_)){const o=i.slice(e_.length);r[o]=s}return r},{});if(Object.keys(n).length>0)return n}function r_(t){if(!(!t||!ot(t)&&!Array.isArray(t)))return Array.isArray(t)?t.reduce((e,n)=>{const r=Bl(n);return Object.entries(r).forEach(([i,s])=>{e[i]=s}),e},{}):Bl(t)}function Bl(t){return t.split(",").map(e=>{const n=e.indexOf("=");if(n===-1)return[];const r=e.slice(0,n),i=e.slice(n+1);return[r,i].map(s=>{try{return decodeURIComponent(s.trim())}catch{return}})}).reduce((e,[n,r])=>(n&&r&&(e[n]=r),e),{})}const i_=/^o(\d+)\./,s_=/^(?:(\w+):)\/\/(?:(\w+)(?::(\w+)?)?@)([\w.-]+)(?::(\d+))?\/(.+)/;function o_(t){return t==="http"||t==="https"}function ni(t,e=!1){const{host:n,path:r,pass:i,port:s,projectId:o,protocol:a,publicKey:c}=t;return`${a}://${c}${e&&i?`:${i}`:""}@${n}${s?`:${s}`:""}/${r&&`${r}/`}${o}`}function a_(t){const e=s_.exec(t);if(!e){Kn(()=>{console.error(`Invalid Sentry Dsn: ${t}`)});return}const[n,r,i="",s="",o="",a=""]=e.slice(1);let c="",l=a;const u=l.split("/");if(u.length>1&&(c=u.slice(0,-1).join("/"),l=u.pop()),l){const d=l.match(/^\d+/);d&&(l=d[0])}return mh({host:s,pass:i,path:c,projectId:l,port:o,protocol:n,publicKey:r})}function mh(t){return{protocol:t.protocol,publicKey:t.publicKey||"",pass:t.pass||"",host:t.host,port:t.port||"",path:t.path||"",projectId:t.projectId}}function c_(t){if(!C)return!0;const{port:e,projectId:n,protocol:r}=t;return["protocol","publicKey","host","projectId"].find(o=>t[o]?!1:(w.error(`Invalid Sentry Dsn: ${o} missing`),!0))?!1:n.match(/^\d+$/)?o_(r)?e&&isNaN(parseInt(e,10))?(w.error(`Invalid Sentry Dsn: Invalid port ${e}`),!1):!0:(w.error(`Invalid Sentry Dsn: Invalid protocol ${r}`),!1):(w.error(`Invalid Sentry Dsn: Invalid projectId ${n}`),!1)}function l_(t){return t.match(i_)?.[1]}function u_(t){const e=t.getOptions(),{host:n}=t.getDsn()||{};let r;return e.orgId?r=String(e.orgId):n&&(r=l_(n)),r}function d_(t){const e=typeof t=="string"?a_(t):mh(t);if(!(!e||!c_(e)))return e}function h_(t){if(typeof t=="boolean")return Number(t);const e=typeof t=="string"?parseFloat(t):t;if(!(typeof e!="number"||isNaN(e)||e<0||e>1))return e}const _h=1;let Hl=!1;function f_(t){const{spanId:e,traceId:n,isRemote:r}=t.spanContext(),i=r?e:Va(t).parent_span_id,s=gh(t).scope,o=r?s?.getPropagationContext().propagationSpanId||hh():e;return{parent_span_id:i,span_id:o,trace_id:n}}function p_(t){if(t&&t.length>0)return t.map(({context:{spanId:e,traceId:n,traceFlags:r,...i},attributes:s})=>({span_id:e,trace_id:n,sampled:r===_h,attributes:s,...i}))}function Wl(t){return typeof t=="number"?jl(t):Array.isArray(t)?t[0]+t[1]/1e9:t instanceof Date?jl(t.getTime()):at()}function jl(t){return t>9999999999?t/1e3:t}function Va(t){if(m_(t))return t.getSpanJSON();const{spanId:e,traceId:n}=t.spanContext();if(g_(t)){const{attributes:r,startTime:i,name:s,endTime:o,status:a,links:c}=t,l="parentSpanId"in t?t.parentSpanId:"parentSpanContext"in t?t.parentSpanContext?.spanId:void 0;return{span_id:e,trace_id:n,data:r,description:s,parent_span_id:l,start_timestamp:Wl(i),timestamp:Wl(o)||void 0,status:y_(a),op:r[qm],origin:r[Ym],links:p_(c)}}return{span_id:e,trace_id:n,start_timestamp:0,data:{}}}function g_(t){const e=t;return!!e.attributes&&!!e.startTime&&!!e.name&&!!e.endTime&&!!e.status}function m_(t){return typeof t.getSpanJSON=="function"}function __(t){const{traceFlags:e}=t.spanContext();return e===_h}function y_(t){if(!(!t||t.code===Km))return t.code===Jm?"ok":t.message||"internal_error"}const E_="_sentryRootSpan";function yh(t){return t[E_]||t}function Vl(){Hl||(Kn(()=>{console.warn("[Sentry] Returning null from `beforeSendSpan` is disallowed. To drop certain spans, configure the respective integrations directly or use `ignoreSpans`.")}),Hl=!0)}function v_(t){if(typeof __SENTRY_TRACING__=="boolean"&&!__SENTRY_TRACING__)return!1;const e=_e()?.getOptions();return!!e&&(e.tracesSampleRate!=null||!!e.tracesSampler)}function zl(t){w.log(`Ignoring span ${t.op} - ${t.description} because it matches \`ignoreSpans\`.`)}function Gl(t,e){if(!e?.length||!t.description)return!1;for(const n of e){if(b_(n)){if(Ai(t.description,n))return C&&zl(t),!0;continue}if(!n.name&&!n.op)continue;const r=n.name?Ai(t.description,n.name):!0,i=n.op?t.op&&Ai(t.op,n.op):!0;if(r&&i)return C&&zl(t),!0}return!1}function w_(t,e){const n=e.parent_span_id,r=e.span_id;if(n)for(const i of t)i.parent_span_id===r&&(i.parent_span_id=n)}function b_(t){return typeof t=="string"||t instanceof RegExp}const za="production",S_="_frozenDsc";function Eh(t,e){const n=e.getOptions(),{publicKey:r}=e.getDsn()||{},i={environment:n.environment||za,release:n.release,public_key:r,trace_id:t,org_id:u_(e)};return e.emit("createDsc",i),i}function C_(t,e){const n=e.getPropagationContext();return n.dsc||Eh(n.traceId,t)}function T_(t){const e=_e();if(!e)return{};const n=yh(t),r=Va(n),i=r.data,s=n.spanContext().traceState,o=s?.get("sentry.sample_rate")??i[zm]??i[Gm];function a(p){return(typeof o=="number"||typeof o=="string")&&(p.sample_rate=`${o}`),p}const c=n[S_];if(c)return a(c);const l=s?.get("sentry.dsc"),u=l&&n_(l);if(u)return a(u);const d=Eh(t.spanContext().traceId,e),h=i[Vm],f=r.description;return h!=="url"&&f&&(d.transaction=f),v_()&&(d.sampled=String(__(n)),d.sample_rand=s?.get("sentry.sample_rand")??gh(n).scope?.getPropagationContext().sampleRand.toString()),a(d),e.emit("createDsc",d,n),d}function et(t,e=100,n=1/0){try{return Uo("",t,e,n)}catch(r){return{ERROR:`**non-serializable** (${r})`}}}function vh(t,e=3,n=100*1024){const r=et(t,e);return A_(r)>n?vh(t,e-1,n):r}function Uo(t,e,n=1/0,r=1/0,i=N_()){const[s,o]=i;if(e==null||["boolean","string"].includes(typeof e)||typeof e=="number"&&Number.isFinite(e))return e;const a=I_(t,e);if(!a.startsWith("[object "))return a;if(e.__sentry_skip_normalization__)return e;const c=typeof e.__sentry_override_normalization_depth__=="number"?e.__sentry_override_normalization_depth__:n;if(c===0)return a.replace("object ","");if(s(e))return"[Circular ~]";const l=e;if(l&&typeof l.toJSON=="function")try{const f=l.toJSON();return Uo("",f,c-1,r,i)}catch{}const u=Array.isArray(e)?[]:{};let d=0;const h=ch(e);for(const f in h){if(!Object.prototype.hasOwnProperty.call(h,f))continue;if(d>=r){u[f]="[MaxProperties ~]";break}const p=h[f];u[f]=Uo(f,p,c-1,r,i),d++}return o(e),u}function I_(t,e){try{if(t==="domain"&&e&&typeof e=="object"&&e._events)return"[Domain]";if(t==="domainEmitter")return"[DomainEmitter]";if(typeof global<"u"&&e===global)return"[Global]";if(typeof window<"u"&&e===window)return"[Window]";if(typeof document<"u"&&e===document)return"[Document]";if(sh(e))return nh(e);if(wm(e))return"[SyntheticEvent]";if(typeof e=="number"&&!Number.isFinite(e))return`[${e}]`;if(typeof e=="function")return`[Function: ${xt(e)}]`;if(typeof e=="symbol")return`[${String(e)}]`;if(typeof e=="bigint")return`[BigInt: ${String(e)}]`;const n=k_(e);return/^HTML(\w*)Element$/.test(n)?`[HTMLElement: ${n}]`:`[object ${n}]`}catch(n){return`**non-serializable** (${n})`}}function k_(t){const e=Object.getPrototypeOf(t);return e?.constructor?e.constructor.name:"null prototype"}function R_(t){return~-encodeURI(t).split(/%..|./).length}function A_(t){return R_(JSON.stringify(t))}function N_(){const t=new WeakSet;function e(r){return t.has(r)?!0:(t.add(r),!1)}function n(r){t.delete(r)}return[e,n]}function Xn(t,e=[]){return[t,e]}function P_(t,e){const[n,r]=t;return[n,[...r,e]]}function ql(t,e){const n=t[1];for(const r of n){const i=r[0].type;if(e(r,i))return!0}return!1}function $o(t){const e=bs(O);return e.encodePolyfill?e.encodePolyfill(t):new TextEncoder().encode(t)}function L_(t){const[e,n]=t;let r=JSON.stringify(e);function i(s){typeof r=="string"?r=typeof s=="string"?r+s:[$o(r),s]:r.push(typeof s=="string"?$o(s):s)}for(const s of n){const[o,a]=s;if(i(`
${JSON.stringify(o)}
`),typeof a=="string"||a instanceof Uint8Array)i(a);else{let c;try{c=JSON.stringify(a)}catch{c=JSON.stringify(et(a))}i(c)}}return typeof r=="string"?r:O_(r)}function O_(t){const e=t.reduce((i,s)=>i+s.length,0),n=new Uint8Array(e);let r=0;for(const i of t)n.set(i,r),r+=i.length;return n}function D_(t){const e=typeof t.data=="string"?$o(t.data):t.data;return[{type:"attachment",length:e.length,filename:t.filename,content_type:t.contentType,attachment_type:t.attachmentType},e]}const M_={session:"session",sessions:"session",attachment:"attachment",transaction:"transaction",event:"error",client_report:"internal",user_report:"default",profile:"profile",profile_chunk:"profile",replay_event:"replay",replay_recording:"replay",check_in:"monitor",feedback:"feedback",span:"span",raw_security:"security",log:"log_item",metric:"metric",trace_metric:"metric"};function Yl(t){return M_[t]}function wh(t){if(!t?.sdk)return;const{name:e,version:n}=t.sdk;return{name:e,version:n}}function x_(t,e,n,r){const i=t.sdkProcessingMetadata?.dynamicSamplingContext;return{event_id:t.event_id,sent_at:new Date().toISOString(),...e&&{sdk:e},...!!n&&r&&{dsn:ni(r)},...i&&{trace:i}}}function F_(t,e){if(!e)return t;const n=t.sdk||{};return t.sdk={...n,name:n.name||e.name,version:n.version||e.version,integrations:[...t.sdk?.integrations||[],...e.integrations||[]],packages:[...t.sdk?.packages||[],...e.packages||[]],settings:t.sdk?.settings||e.settings?{...t.sdk?.settings,...e.settings}:void 0},t}function U_(t,e,n,r){const i=wh(n),s={sent_at:new Date().toISOString(),...i&&{sdk:i},...!!r&&e&&{dsn:ni(e)}},o="aggregates"in t?[{type:"sessions"},t]:[{type:"session"},t.toJSON()];return Xn(s,[o])}function $_(t,e,n,r){const i=wh(n),s=t.type&&t.type!=="replay_event"?t.type:"event";F_(t,n?.sdk);const o=x_(t,i,r,e);return delete t.sdkProcessingMetadata,Xn(o,[[{type:s},t]])}const ao=0,Kl=1,Jl=2;function Is(t){return new xr(e=>{e(t)})}function Ga(t){return new xr((e,n)=>{n(t)})}class xr{constructor(e){this._state=ao,this._handlers=[],this._runExecutor(e)}then(e,n){return new xr((r,i)=>{this._handlers.push([!1,s=>{if(!e)r(s);else try{r(e(s))}catch(o){i(o)}},s=>{if(!n)i(s);else try{r(n(s))}catch(o){i(o)}}]),this._executeHandlers()})}catch(e){return this.then(n=>n,e)}finally(e){return new xr((n,r)=>{let i,s;return this.then(o=>{s=!1,i=o,e&&e()},o=>{s=!0,i=o,e&&e()}).then(()=>{if(s){r(i);return}n(i)})})}_executeHandlers(){if(this._state===ao)return;const e=this._handlers.slice();this._handlers=[],e.forEach(n=>{n[0]||(this._state===Kl&&n[1](this._value),this._state===Jl&&n[2](this._value),n[0]=!0)})}_runExecutor(e){const n=(s,o)=>{if(this._state===ao){if(Qr(o)){o.then(r,i);return}this._state=s,this._value=o,this._executeHandlers()}},r=s=>{n(Kl,s)},i=s=>{n(Jl,s)};try{e(r,i)}catch(s){i(s)}}}function B_(t,e,n,r=0){try{const i=Bo(e,n,t,r);return Qr(i)?i:Is(i)}catch(i){return Ga(i)}}function Bo(t,e,n,r){const i=n[r];if(!t||!i)return t;const s=i({...t},e);return C&&s===null&&w.log(`Event processor "${i.id||"?"}" dropped event`),Qr(s)?s.then(o=>Bo(o,e,n,r+1)):Bo(s,e,n,r+1)}function H_(t,e){const{fingerprint:n,span:r,breadcrumbs:i,sdkProcessingMetadata:s}=e;W_(t,e),r&&z_(t,r),G_(t,n),j_(t,i),V_(t,s)}function Xl(t,e){const{extra:n,tags:r,user:i,contexts:s,level:o,sdkProcessingMetadata:a,breadcrumbs:c,fingerprint:l,eventProcessors:u,attachments:d,propagationContext:h,transactionName:f,span:p}=e;_i(t,"extra",n),_i(t,"tags",r),_i(t,"user",i),_i(t,"contexts",s),t.sdkProcessingMetadata=ei(t.sdkProcessingMetadata,a,2),o&&(t.level=o),f&&(t.transactionName=f),p&&(t.span=p),c.length&&(t.breadcrumbs=[...t.breadcrumbs,...c]),l.length&&(t.fingerprint=[...t.fingerprint,...l]),u.length&&(t.eventProcessors=[...t.eventProcessors,...u]),d.length&&(t.attachments=[...t.attachments,...d]),t.propagationContext={...t.propagationContext,...h}}function _i(t,e,n){t[e]=ei(t[e],n,1)}function W_(t,e){const{extra:n,tags:r,user:i,contexts:s,level:o,transactionName:a}=e;Object.keys(n).length&&(t.extra={...n,...t.extra}),Object.keys(r).length&&(t.tags={...r,...t.tags}),Object.keys(i).length&&(t.user={...i,...t.user}),Object.keys(s).length&&(t.contexts={...s,...t.contexts}),o&&(t.level=o),a&&t.type!=="transaction"&&(t.transaction=a)}function j_(t,e){const n=[...t.breadcrumbs||[],...e];t.breadcrumbs=n.length?n:void 0}function V_(t,e){t.sdkProcessingMetadata={...t.sdkProcessingMetadata,...e}}function z_(t,e){t.contexts={trace:f_(e),...t.contexts},t.sdkProcessingMetadata={dynamicSamplingContext:T_(e),...t.sdkProcessingMetadata};const n=yh(e),r=Va(n).description;r&&!t.transaction&&t.type==="transaction"&&(t.transaction=r)}function G_(t,e){t.fingerprint=t.fingerprint?Array.isArray(t.fingerprint)?t.fingerprint:[t.fingerprint]:[],e&&(t.fingerprint=t.fingerprint.concat(e)),t.fingerprint.length||delete t.fingerprint}let zt,Ql,Zl,yt;function q_(t){const e=O._sentryDebugIds,n=O._debugIds;if(!e&&!n)return{};const r=e?Object.keys(e):[],i=n?Object.keys(n):[];if(yt&&r.length===Ql&&i.length===Zl)return yt;Ql=r.length,Zl=i.length,yt={},zt||(zt={});const s=(o,a)=>{for(const c of o){const l=a[c],u=zt?.[c];if(u&&yt&&l)yt[u[0]]=l,zt&&(zt[c]=[u[0],l]);else if(l){const d=t(c);for(let h=d.length-1;h>=0;h--){const p=d[h]?.filename;if(p&&yt&&zt){yt[p]=l,zt[c]=[p,l];break}}}}};return e&&s(r,e),n&&s(i,n),yt}function Y_(t,e,n,r,i,s){const{normalizeDepth:o=3,normalizeMaxBreadth:a=1e3}=t,c={...e,event_id:e.event_id||n.event_id||Re(),timestamp:e.timestamp||Zr()},l=n.integrations||t.integrations.map(m=>m.name);K_(c,t),Q_(c,l),i&&i.emit("applyFrameMetadata",e),e.type===void 0&&J_(c,t.stackParser);const u=ey(r,n.captureContext);n.mechanism&&On(c,n.mechanism);const d=i?i.getEventProcessors():[],h=Hm().getScopeData();if(s){const m=s.getScopeData();Xl(h,m)}if(u){const m=u.getScopeData();Xl(h,m)}const f=[...n.attachments||[],...h.attachments];f.length&&(n.attachments=f),H_(c,h);const p=[...d,...h.eventProcessors];return B_(p,c,n).then(m=>(m&&X_(m),typeof o=="number"&&o>0?Z_(m,o,a):m))}function K_(t,e){const{environment:n,release:r,dist:i,maxValueLength:s}=e;t.environment=t.environment||n||za,!t.release&&r&&(t.release=r),!t.dist&&i&&(t.dist=i);const o=t.request;o?.url&&(o.url=s?lh(o.url,s):o.url)}function J_(t,e){const n=q_(e);t.exception?.values?.forEach(r=>{r.stacktrace?.frames?.forEach(i=>{i.filename&&(i.debug_id=n[i.filename])})})}function X_(t){const e={};if(t.exception?.values?.forEach(r=>{r.stacktrace?.frames?.forEach(i=>{i.debug_id&&(i.abs_path?e[i.abs_path]=i.debug_id:i.filename&&(e[i.filename]=i.debug_id),delete i.debug_id)})}),Object.keys(e).length===0)return;t.debug_meta=t.debug_meta||{},t.debug_meta.images=t.debug_meta.images||[];const n=t.debug_meta.images;Object.entries(e).forEach(([r,i])=>{n.push({type:"sourcemap",code_file:r,debug_id:i})})}function Q_(t,e){e.length>0&&(t.sdk=t.sdk||{},t.sdk.integrations=[...t.sdk.integrations||[],...e])}function Z_(t,e,n){if(!t)return null;const r={...t,...t.breadcrumbs&&{breadcrumbs:t.breadcrumbs.map(i=>({...i,...i.data&&{data:et(i.data,e,n)}}))},...t.user&&{user:et(t.user,e,n)},...t.contexts&&{contexts:et(t.contexts,e,n)},...t.extra&&{extra:et(t.extra,e,n)}};return t.contexts?.trace&&r.contexts&&(r.contexts.trace=t.contexts.trace,t.contexts.trace.data&&(r.contexts.trace.data=et(t.contexts.trace.data,e,n))),t.spans&&(r.spans=t.spans.map(i=>({...i,...i.data&&{data:et(i.data,e,n)}}))),t.contexts?.flags&&r.contexts&&(r.contexts.flags=et(t.contexts.flags,3,n)),r}function ey(t,e){if(!e)return t;const n=t?t.clone():new ut;return n.update(e),n}function ty(t,e){return Wt().captureException(t,void 0)}function bh(t,e){return Wt().captureEvent(t,e)}function eu(t){const e=ti(),n=Wt(),{userAgent:r}=O.navigator||{},i=Pm({user:n.getUser()||e.getUser(),...r&&{userAgent:r},...t}),s=e.getSession();return s?.status==="ok"&&Dn(s,{status:"exited"}),Sh(),e.setSession(i),i}function Sh(){const t=ti(),n=Wt().getSession()||t.getSession();n&&Lm(n),Ch(),t.setSession()}function Ch(){const t=ti(),e=_e(),n=t.getSession();n&&e&&e.captureSession(n)}function tu(t=!1){if(t){Sh();return}Ch()}const ny="7";function ry(t){const e=t.protocol?`${t.protocol}:`:"",n=t.port?`:${t.port}`:"";return`${e}//${t.host}${n}${t.path?`/${t.path}`:""}/api/`}function iy(t){return`${ry(t)}${t.projectId}/envelope/`}function sy(t,e){const n={sentry_version:ny};return t.publicKey&&(n.sentry_key=t.publicKey),e&&(n.sentry_client=`${e.name}/${e.version}`),new URLSearchParams(n).toString()}function oy(t,e,n){return e||`${iy(t)}?${sy(t,n)}`}const nu=[];function ay(t){const e={};return t.forEach(n=>{const{name:r}=n,i=e[r];i&&!i.isDefaultInstance&&n.isDefaultInstance||(e[r]=n)}),Object.values(e)}function cy(t){const e=t.defaultIntegrations||[],n=t.integrations;e.forEach(i=>{i.isDefaultInstance=!0});let r;if(Array.isArray(n))r=[...e,...n];else if(typeof n=="function"){const i=n(e);r=Array.isArray(i)?i:[i]}else r=e;return ay(r)}function ly(t,e){const n={};return e.forEach(r=>{r&&Th(t,r,n)}),n}function ru(t,e){for(const n of e)n?.afterAllSetup&&n.afterAllSetup(t)}function Th(t,e,n){if(n[e.name]){C&&w.log(`Integration skipped because it was already installed: ${e.name}`);return}if(n[e.name]=e,!nu.includes(e.name)&&typeof e.setupOnce=="function"&&(e.setupOnce(),nu.push(e.name)),e.setup&&typeof e.setup=="function"&&e.setup(t),typeof e.preprocessEvent=="function"){const r=e.preprocessEvent.bind(e);t.on("preprocessEvent",(i,s)=>r(i,s,t))}if(typeof e.processEvent=="function"){const r=e.processEvent.bind(e),i=Object.assign((s,o)=>r(s,o,t),{id:e.name});t.addEventProcessor(i)}C&&w.log(`Integration installed: ${e.name}`)}function uy(t){return[{type:"log",item_count:t.length,content_type:"application/vnd.sentry.items.log+json"},{items:t}]}function dy(t,e,n,r){const i={};return e?.sdk&&(i.sdk={name:e.sdk.name,version:e.sdk.version}),n&&r&&(i.dsn=ni(r)),Xn(i,[uy(t)])}function Ih(t,e){const n=e??hy(t)??[];if(n.length===0)return;const r=t.getOptions(),i=dy(n,r._metadata,r.tunnel,t.getDsn());kh().set(t,[]),t.emit("flushLogs"),t.sendEnvelope(i)}function hy(t){return kh().get(t)}function kh(){return Yn("clientToLogBufferMap",()=>new WeakMap)}function fy(t){return[{type:"trace_metric",item_count:t.length,content_type:"application/vnd.sentry.items.trace-metric+json"},{items:t}]}function py(t,e,n,r){const i={};return e?.sdk&&(i.sdk={name:e.sdk.name,version:e.sdk.version}),n&&r&&(i.dsn=ni(r)),Xn(i,[fy(t)])}function Rh(t,e){const n=e??gy(t)??[];if(n.length===0)return;const r=t.getOptions(),i=py(n,r._metadata,r.tunnel,t.getDsn());Ah().set(t,[]),t.emit("flushMetrics"),t.sendEnvelope(i)}function gy(t){return Ah().get(t)}function Ah(){return Yn("clientToMetricBufferMap",()=>new WeakMap)}function my(t,e,n){const r=[{type:"client_report"},{timestamp:Zr(),discarded_events:t}];return Xn(e?{dsn:e}:{},[r])}function Nh(t){const e=[];t.message&&e.push(t.message);try{const n=t.exception.values[t.exception.values.length-1];n?.value&&(e.push(n.value),n.type&&e.push(`${n.type}: ${n.value}`))}catch{}return e}function _y(t){const{trace_id:e,parent_span_id:n,span_id:r,status:i,origin:s,data:o,op:a}=t.contexts?.trace??{};return{data:o??{},description:t.transaction,op:a,parent_span_id:n,span_id:r??"",start_timestamp:t.start_timestamp??0,status:i,timestamp:t.timestamp,trace_id:e??"",origin:s,profile_id:o?.[fh],exclusive_time:o?.[ph],measurements:t.measurements,is_segment:!0}}function yy(t){return{type:"transaction",timestamp:t.timestamp,start_timestamp:t.start_timestamp,transaction:t.description,contexts:{trace:{trace_id:t.trace_id,span_id:t.span_id,parent_span_id:t.parent_span_id,op:t.op,status:t.status,origin:t.origin,data:{...t.data,...t.profile_id&&{[fh]:t.profile_id},...t.exclusive_time&&{[ph]:t.exclusive_time}}}},measurements:t.measurements}}const iu="Not capturing exception because it's already been captured.",su="Discarded session because of missing or non-string release",Ph=Symbol.for("SentryInternalError"),Lh=Symbol.for("SentryDoNotSendEventError"),Ey=5e3;function Ni(t){return{message:t,[Ph]:!0}}function co(t){return{message:t,[Lh]:!0}}function ou(t){return!!t&&typeof t=="object"&&Ph in t}function au(t){return!!t&&typeof t=="object"&&Lh in t}function cu(t,e,n,r,i){let s=0,o,a=!1;t.on(n,()=>{s=0,clearTimeout(o),a=!1}),t.on(e,c=>{s+=r(c),s>=8e5?i(t):a||(a=!0,o=setTimeout(()=>{i(t)},Ey))}),t.on("flush",()=>{i(t)})}class vy{constructor(e){if(this._options=e,this._integrations={},this._numProcessing=0,this._outcomes={},this._hooks={},this._eventProcessors=[],e.dsn?this._dsn=d_(e.dsn):C&&w.warn("No DSN provided, client will not send events."),this._dsn){const r=oy(this._dsn,e.tunnel,e._metadata?e._metadata.sdk:void 0);this._transport=e.transport({tunnel:this._options.tunnel,recordDroppedEvent:this.recordDroppedEvent.bind(this),...e.transportOptions,url:r})}this._options.enableLogs&&cu(this,"afterCaptureLog","flushLogs",Cy,Ih),(this._options.enableMetrics??this._options._experiments?.enableMetrics??!0)&&cu(this,"afterCaptureMetric","flushMetrics",Sy,Rh)}captureException(e,n,r){const i=Re();if(Dl(e))return C&&w.log(iu),i;const s={event_id:i,...n};return this._process(this.eventFromException(e,s).then(o=>this._captureEvent(o,s,r))),s.event_id}captureMessage(e,n,r,i){const s={event_id:Re(),...r},o=$a(e)?e:String(e),a=Ss(e)?this.eventFromMessage(o,n,s):this.eventFromException(e,s);return this._process(a.then(c=>this._captureEvent(c,s,i))),s.event_id}captureEvent(e,n,r){const i=Re();if(n?.originalException&&Dl(n.originalException))return C&&w.log(iu),i;const s={event_id:i,...n},o=e.sdkProcessingMetadata||{},a=o.capturedSpanScope,c=o.capturedSpanIsolationScope;return this._process(this._captureEvent(e,s,a||r,c)),s.event_id}captureSession(e){this.sendSession(e),Dn(e,{init:!1})}getDsn(){return this._dsn}getOptions(){return this._options}getSdkMetadata(){return this._options._metadata}getTransport(){return this._transport}async flush(e){const n=this._transport;if(!n)return!0;this.emit("flush");const r=await this._isClientDoneProcessing(e),i=await n.flush(e);return r&&i}async close(e){const n=await this.flush(e);return this.getOptions().enabled=!1,this.emit("close"),n}getEventProcessors(){return this._eventProcessors}addEventProcessor(e){this._eventProcessors.push(e)}init(){(this._isEnabled()||this._options.integrations.some(({name:e})=>e.startsWith("Spotlight")))&&this._setupIntegrations()}getIntegrationByName(e){return this._integrations[e]}addIntegration(e){const n=this._integrations[e.name];Th(this,e,this._integrations),n||ru(this,[e])}sendEvent(e,n={}){this.emit("beforeSendEvent",e,n);let r=$_(e,this._dsn,this._options._metadata,this._options.tunnel);for(const i of n.attachments||[])r=P_(r,D_(i));this.sendEnvelope(r).then(i=>this.emit("afterSendEvent",e,i))}sendSession(e){const{release:n,environment:r=za}=this._options;if("aggregates"in e){const s=e.attrs||{};if(!s.release&&!n){C&&w.warn(su);return}s.release=s.release||n,s.environment=s.environment||r,e.attrs=s}else{if(!e.release&&!n){C&&w.warn(su);return}e.release=e.release||n,e.environment=e.environment||r}this.emit("beforeSendSession",e);const i=U_(e,this._dsn,this._options._metadata,this._options.tunnel);this.sendEnvelope(i)}recordDroppedEvent(e,n,r=1){if(this._options.sendClientReports){const i=`${e}:${n}`;C&&w.log(`Recording outcome: "${i}"${r>1?` (${r} times)`:""}`),this._outcomes[i]=(this._outcomes[i]||0)+r}}on(e,n){const r=this._hooks[e]=this._hooks[e]||new Set,i=(...s)=>n(...s);return r.add(i),()=>{r.delete(i)}}emit(e,...n){const r=this._hooks[e];r&&r.forEach(i=>i(...n))}async sendEnvelope(e){if(this.emit("beforeEnvelope",e),this._isEnabled()&&this._transport)try{return await this._transport.send(e)}catch(n){return C&&w.error("Error while sending envelope:",n),{}}return C&&w.error("Transport disabled"),{}}_setupIntegrations(){const{integrations:e}=this._options;this._integrations=ly(this,e),ru(this,e)}_updateSessionFromEvent(e,n){let r=n.level==="fatal",i=!1;const s=n.exception?.values;if(s){i=!0,r=!1;for(const c of s)if(c.mechanism?.handled===!1){r=!0;break}}const o=e.status==="ok";(o&&e.errors===0||o&&r)&&(Dn(e,{...r&&{status:"crashed"},errors:e.errors||Number(i||r)}),this.captureSession(e))}async _isClientDoneProcessing(e){let n=0;for(;!e||n<e;){if(await new Promise(r=>setTimeout(r,1)),!this._numProcessing)return!0;n++}return!1}_isEnabled(){return this.getOptions().enabled!==!1&&this._transport!==void 0}_prepareEvent(e,n,r,i){const s=this.getOptions(),o=Object.keys(this._integrations);return!n.integrations&&o?.length&&(n.integrations=o),this.emit("preprocessEvent",e,n),e.type||i.setLastEventId(e.event_id||n.event_id),Y_(s,e,n,r,this,i).then(a=>{if(a===null)return a;this.emit("postprocessEvent",a,n),a.contexts={trace:jm(r),...a.contexts};const c=C_(this,r);return a.sdkProcessingMetadata={dynamicSamplingContext:c,...a.sdkProcessingMetadata},a})}_captureEvent(e,n={},r=Wt(),i=ti()){return C&&Ho(e)&&w.log(`Captured error event \`${Nh(e)[0]||"<unknown>"}\``),this._processEvent(e,n,r,i).then(s=>s.event_id,s=>{C&&(au(s)?w.log(s.message):ou(s)?w.warn(s.message):w.warn(s))})}_processEvent(e,n,r,i){const s=this.getOptions(),{sampleRate:o}=s,a=Oh(e),c=Ho(e),l=e.type||"error",u=`before send for type \`${l}\``,d=typeof o>"u"?void 0:h_(o);if(c&&typeof d=="number"&&Math.random()>d)return this.recordDroppedEvent("sample_rate","error"),Ga(co(`Discarding event because it's not included in the random sample (sampling rate = ${o})`));const h=l==="replay_event"?"replay":l;return this._prepareEvent(e,n,r,i).then(f=>{if(f===null)throw this.recordDroppedEvent("event_processor",h),co("An event processor returned `null`, will not send event.");if(n.data&&n.data.__sentry__===!0)return f;const y=by(this,s,f,n);return wy(y,u)}).then(f=>{if(f===null){if(this.recordDroppedEvent("before_send",h),a){const A=1+(e.spans||[]).length;this.recordDroppedEvent("before_send","span",A)}throw co(`${u} returned \`null\`, will not send event.`)}const p=r.getSession()||i.getSession();if(c&&p&&this._updateSessionFromEvent(p,f),a){const m=f.sdkProcessingMetadata?.spanCountBeforeProcessing||0,A=f.spans?f.spans.length:0,N=m-A;N>0&&this.recordDroppedEvent("before_send","span",N)}const y=f.transaction_info;if(a&&y&&f.transaction!==e.transaction){const m="custom";f.transaction_info={...y,source:m}}return this.sendEvent(f,n),f}).then(null,f=>{throw au(f)||ou(f)?f:(this.captureException(f,{mechanism:{handled:!1,type:"internal"},data:{__sentry__:!0},originalException:f}),Ni(`Event processing pipeline threw an error, original event will not be sent. Details have been sent as a new event.
Reason: ${f}`))})}_process(e){this._numProcessing++,e.then(n=>(this._numProcessing--,n),n=>(this._numProcessing--,n))}_clearOutcomes(){const e=this._outcomes;return this._outcomes={},Object.entries(e).map(([n,r])=>{const[i,s]=n.split(":");return{reason:i,category:s,quantity:r}})}_flushOutcomes(){C&&w.log("Flushing outcomes...");const e=this._clearOutcomes();if(e.length===0){C&&w.log("No outcomes to send");return}if(!this._dsn){C&&w.log("No dsn provided, will not send outcomes");return}C&&w.log("Sending outcomes:",e);const n=my(e,this._options.tunnel&&ni(this._dsn));this.sendEnvelope(n)}}function wy(t,e){const n=`${e} must return \`null\` or a valid event.`;if(Qr(t))return t.then(r=>{if(!Mr(r)&&r!==null)throw Ni(n);return r},r=>{throw Ni(`${e} rejected with ${r}`)});if(!Mr(t)&&t!==null)throw Ni(n);return t}function by(t,e,n,r){const{beforeSend:i,beforeSendTransaction:s,beforeSendSpan:o,ignoreSpans:a}=e;let c=n;if(Ho(c)&&i)return i(c,r);if(Oh(c)){if(o||a){const l=_y(c);if(a?.length&&Gl(l,a))return null;if(o){const u=o(l);u?c=ei(n,yy(u)):Vl()}if(c.spans){const u=[],d=c.spans;for(const f of d){if(a?.length&&Gl(f,a)){w_(d,f);continue}if(o){const p=o(f);p?u.push(p):(Vl(),u.push(f))}else u.push(f)}const h=c.spans.length-u.length;h&&t.recordDroppedEvent("before_send","span",h),c.spans=u}}if(s){if(c.spans){const l=c.spans.length;c.sdkProcessingMetadata={...n.sdkProcessingMetadata,spanCountBeforeProcessing:l}}return s(c,r)}}return c}function Ho(t){return t.type===void 0}function Oh(t){return t.type==="transaction"}function Sy(t){let e=0;return t.name&&(e+=t.name.length*2),e+=8,e+Dh(t.attributes)}function Cy(t){let e=0;return t.message&&(e+=t.message.length*2),e+Dh(t.attributes)}function Dh(t){if(!t)return 0;let e=0;return Object.values(t).forEach(n=>{Array.isArray(n)?e+=n.length*lu(n[0]):Ss(n)?e+=lu(n):e+=100}),e}function lu(t){return typeof t=="string"?t.length*2:typeof t=="number"?8:typeof t=="boolean"?4:0}function Ty(t,e){e.debug===!0&&(C?w.enable():Kn(()=>{console.warn("[Sentry] Cannot initialize SDK with `debug` option using a non-debug bundle.")})),Wt().update(e.initialScope);const r=new t(e);return Iy(r),r.init(),r}function Iy(t){Wt().setClient(t)}const Mh=Symbol.for("SentryBufferFullError");function xh(t=100){const e=new Set;function n(){return e.size<t}function r(o){e.delete(o)}function i(o){if(!n())return Ga(Mh);const a=o();return e.add(a),a.then(()=>r(a),()=>r(a)),a}function s(o){if(!e.size)return Is(!0);const a=Promise.allSettled(Array.from(e)).then(()=>!0);if(!o)return a;const c=[a,new Promise(l=>setTimeout(()=>l(!1),o))];return Promise.race(c)}return{get $(){return Array.from(e)},add:i,drain:s}}const ky=60*1e3;function Ry(t,e=Date.now()){const n=parseInt(`${t}`,10);if(!isNaN(n))return n*1e3;const r=Date.parse(`${t}`);return isNaN(r)?ky:r-e}function Ay(t,e){return t[e]||t.all||0}function Ny(t,e,n=Date.now()){return Ay(t,e)>n}function Py(t,{statusCode:e,headers:n},r=Date.now()){const i={...t},s=n?.["x-sentry-rate-limits"],o=n?.["retry-after"];if(s)for(const a of s.trim().split(",")){const[c,l,,,u]=a.split(":",5),d=parseInt(c,10),h=(isNaN(d)?60:d)*1e3;if(!l)i.all=r+h;else for(const f of l.split(";"))f==="metric_bucket"?(!u||u.split(";").includes("custom"))&&(i[f]=r+h):i[f]=r+h}else o?i.all=r+Ry(o,r):e===429&&(i.all=r+60*1e3);return i}const Ly=64;function Oy(t,e,n=xh(t.bufferSize||Ly)){let r={};const i=o=>n.drain(o);function s(o){const a=[];if(ql(o,(d,h)=>{const f=Yl(h);Ny(r,f)?t.recordDroppedEvent("ratelimit_backoff",f):a.push(d)}),a.length===0)return Promise.resolve({});const c=Xn(o[0],a),l=d=>{ql(c,(h,f)=>{t.recordDroppedEvent(d,Yl(f))})},u=()=>e({body:L_(c)}).then(d=>(d.statusCode!==void 0&&(d.statusCode<200||d.statusCode>=300)&&C&&w.warn(`Sentry responded with status code ${d.statusCode} to sent event.`),r=Py(r,d),d),d=>{throw l("network_error"),C&&w.error("Encountered error running transport request:",d),d});return n.add(u).then(d=>d,d=>{if(d===Mh)return C&&w.error("Skipped sending event because buffer is full."),l("queue_overflow"),Promise.resolve({});throw d})}return{send:s,flush:i}}function lo(t){if(!t)return{};const e=t.match(/^(([^:/?#]+):)?(\/\/([^/?#]*))?([^?#]*)(\?([^#]*))?(#(.*))?$/);if(!e)return{};const n=e[6]||"",r=e[8]||"";return{host:e[4],path:e[5],protocol:e[2],search:n,hash:r,relative:e[5]+n+r}}function Dy(t){"aggregates"in t?t.attrs?.ip_address===void 0&&(t.attrs={...t.attrs,ip_address:"{{auto}}"}):t.ipAddress===void 0&&(t.ipAddress="{{auto}}")}function My(t,e,n=[e],r="npm"){const i=t._metadata||{};i.sdk||(i.sdk={name:`sentry.javascript.${e}`,packages:n.map(s=>({name:`${r}:@sentry/${s}`,version:tn})),version:tn}),t._metadata=i}const xy=100;function an(t,e){const n=_e(),r=ti();if(!n)return;const{beforeBreadcrumb:i=null,maxBreadcrumbs:s=xy}=n.getOptions();if(s<=0)return;const a={timestamp:Zr(),...t},c=i?Kn(()=>i(a,e)):a;c!==null&&(n.emit&&n.emit("beforeAddBreadcrumb",c,e),r.addBreadcrumb(c,s))}let uu;const Fy="FunctionToString",du=new WeakMap,Uy=(()=>({name:Fy,setupOnce(){uu=Function.prototype.toString;try{Function.prototype.toString=function(...t){const e=Wa(this),n=du.has(_e())&&e!==void 0?e:this;return uu.apply(n,t)}}catch{}},setup(t){du.set(t,!0)}})),$y=Uy,By=[/^Script error\.?$/,/^Javascript error: Script error\.? on line 0$/,/^ResizeObserver loop completed with undelivered notifications.$/,/^Cannot redefine property: googletag$/,/^Can't find variable: gmo$/,/^undefined is not an object \(evaluating 'a\.[A-Z]'\)$/,`can't redefine non-configurable property "solana"`,"vv().getRestrictions is not a function. (In 'vv().getRestrictions(1,a)', 'vv().getRestrictions' is undefined)","Can't find variable: _AutofillCallbackHandler",/^Non-Error promise rejection captured with value: Object Not Found Matching Id:\d+, MethodName:simulateEvent, ParamCount:\d+$/,/^Java exception was raised during method invocation$/],Hy="EventFilters",Wy=(t={})=>{let e;return{name:Hy,setup(n){const r=n.getOptions();e=hu(t,r)},processEvent(n,r,i){if(!e){const s=i.getOptions();e=hu(t,s)}return Vy(n,e)?null:n}}},jy=((t={})=>({...Wy(t),name:"InboundFilters"}));function hu(t={},e={}){return{allowUrls:[...t.allowUrls||[],...e.allowUrls||[]],denyUrls:[...t.denyUrls||[],...e.denyUrls||[]],ignoreErrors:[...t.ignoreErrors||[],...e.ignoreErrors||[],...t.disableErrorDefaults?[]:By],ignoreTransactions:[...t.ignoreTransactions||[],...e.ignoreTransactions||[]]}}function Vy(t,e){if(t.type){if(t.type==="transaction"&&Gy(t,e.ignoreTransactions))return C&&w.warn(`Event dropped due to being matched by \`ignoreTransactions\` option.
Event: ${Xt(t)}`),!0}else{if(zy(t,e.ignoreErrors))return C&&w.warn(`Event dropped due to being matched by \`ignoreErrors\` option.
Event: ${Xt(t)}`),!0;if(Jy(t))return C&&w.warn(`Event dropped due to not having an error message, error type or stacktrace.
Event: ${Xt(t)}`),!0;if(qy(t,e.denyUrls))return C&&w.warn(`Event dropped due to being matched by \`denyUrls\` option.
Event: ${Xt(t)}.
Url: ${Vi(t)}`),!0;if(!Yy(t,e.allowUrls))return C&&w.warn(`Event dropped due to not being matched by \`allowUrls\` option.
Event: ${Xt(t)}.
Url: ${Vi(t)}`),!0}return!1}function zy(t,e){return e?.length?Nh(t).some(n=>Ts(n,e)):!1}function Gy(t,e){if(!e?.length)return!1;const n=t.transaction;return n?Ts(n,e):!1}function qy(t,e){if(!e?.length)return!1;const n=Vi(t);return n?Ts(n,e):!1}function Yy(t,e){if(!e?.length)return!0;const n=Vi(t);return n?Ts(n,e):!0}function Ky(t=[]){for(let e=t.length-1;e>=0;e--){const n=t[e];if(n&&n.filename!=="<anonymous>"&&n.filename!=="[native code]")return n.filename||null}return null}function Vi(t){try{const n=[...t.exception?.values??[]].reverse().find(r=>r.mechanism?.parent_id===void 0&&r.stacktrace?.frames?.length)?.stacktrace?.frames;return n?Ky(n):null}catch{return C&&w.error(`Cannot extract url for event ${Xt(t)}`),null}}function Jy(t){return t.exception?.values?.length?!t.message&&!t.exception.values.some(e=>e.stacktrace||e.type&&e.type!=="Error"||e.value):!1}function Xy(t,e,n,r,i,s){if(!i.exception?.values||!s||!Ft(s.originalException,Error))return;const o=i.exception.values.length>0?i.exception.values[i.exception.values.length-1]:void 0;o&&(i.exception.values=Wo(t,e,r,s.originalException,n,i.exception.values,o,0))}function Wo(t,e,n,r,i,s,o,a){if(s.length>=n+1)return s;let c=[...s];if(Ft(r[i],Error)){fu(o,a);const l=t(e,r[i]),u=c.length;pu(l,i,u,a),c=Wo(t,e,n,r[i],i,[l,...c],l,u)}return Array.isArray(r.errors)&&r.errors.forEach((l,u)=>{if(Ft(l,Error)){fu(o,a);const d=t(e,l),h=c.length;pu(d,`errors[${u}]`,h,a),c=Wo(t,e,n,l,i,[d,...c],d,h)}}),c}function fu(t,e){t.mechanism={handled:!0,type:"auto.core.linked_errors",...t.mechanism,...t.type==="AggregateError"&&{is_exception_group:!0},exception_id:e}}function pu(t,e,n,r){t.mechanism={handled:!0,...t.mechanism,type:"chained",source:e,exception_id:n,parent_id:r}}function Qy(t){const e="console";fn(e,t),pn(e,Zy)}function Zy(){"console"in O&&sm.forEach(function(t){t in O.console&&Ce(O.console,t,function(e){return ji[t]=e,function(...n){$e("console",{args:n,level:t}),ji[t]?.apply(O.console,n)}})})}function eE(t){return t==="warn"?"warning":["fatal","error","warning","log","info","debug"].includes(t)?t:"log"}const tE="Dedupe",nE=(()=>{let t;return{name:tE,processEvent(e){if(e.type)return e;try{if(iE(e,t))return C&&w.warn("Event dropped due to being a duplicate of previously captured event."),null}catch{}return t=e}}}),rE=nE;function iE(t,e){return e?!!(sE(t,e)||oE(t,e)):!1}function sE(t,e){const n=t.message,r=e.message;return!(!n&&!r||n&&!r||!n&&r||n!==r||!Uh(t,e)||!Fh(t,e))}function oE(t,e){const n=gu(e),r=gu(t);return!(!n||!r||n.type!==r.type||n.value!==r.value||!Uh(t,e)||!Fh(t,e))}function Fh(t,e){let n=Rl(t),r=Rl(e);if(!n&&!r)return!0;if(n&&!r||!n&&r||(n=n,r=r,r.length!==n.length))return!1;for(let i=0;i<r.length;i++){const s=r[i],o=n[i];if(s.filename!==o.filename||s.lineno!==o.lineno||s.colno!==o.colno||s.function!==o.function)return!1}return!0}function Uh(t,e){let n=t.fingerprint,r=e.fingerprint;if(!n&&!r)return!0;if(n&&!r||!n&&r)return!1;n=n,r=r;try{return n.join("")===r.join("")}catch{return!1}}function gu(t){return t.exception?.values?.[0]}function $h(t){if(t!==void 0)return t>=400&&t<500?"warning":t>=500?"error":void 0}const Fr=O;function aE(){return"history"in Fr&&!!Fr.history}function cE(){if(!("fetch"in Fr))return!1;try{return new Headers,new Request("data:,"),new Response,!0}catch{return!1}}function jo(t){return t&&/^function\s+\w+\(\)\s+\{\s+\[native code\]\s+\}$/.test(t.toString())}function lE(){if(typeof EdgeRuntime=="string")return!0;if(!cE())return!1;if(jo(Fr.fetch))return!0;let t=!1;const e=Fr.document;if(e&&typeof e.createElement=="function")try{const n=e.createElement("iframe");n.hidden=!0,e.head.appendChild(n),n.contentWindow?.fetch&&(t=jo(n.contentWindow.fetch)),e.head.removeChild(n)}catch(n){C&&w.warn("Could not create sandbox iframe for pure fetch check, bailing to window.fetch: ",n)}return t}function uE(t,e){const n="fetch";fn(n,t),pn(n,()=>dE(void 0,e))}function dE(t,e=!1){e&&!lE()||Ce(O,"fetch",function(n){return function(...r){const i=new Error,{method:s,url:o}=hE(r),a={args:r,fetchData:{method:s,url:o},startTimestamp:at()*1e3,virtualError:i,headers:fE(r)};return $e("fetch",{...a}),n.apply(O,r).then(async c=>($e("fetch",{...a,endTimestamp:at()*1e3,response:c}),c),c=>{if($e("fetch",{...a,endTimestamp:at()*1e3,error:c}),Ua(c)&&c.stack===void 0&&(c.stack=i.stack,on(c,"framesToPop",1)),c instanceof TypeError&&(c.message==="Failed to fetch"||c.message==="Load failed"||c.message==="NetworkError when attempting to fetch resource."))try{const l=new URL(a.fetchData.url);c.message=`${c.message} (${l.host})`}catch{}throw c})}})}function Vo(t,e){return!!t&&typeof t=="object"&&!!t[e]}function mu(t){return typeof t=="string"?t:t?Vo(t,"url")?t.url:t.toString?t.toString():"":""}function hE(t){if(t.length===0)return{method:"GET",url:""};if(t.length===2){const[n,r]=t;return{url:mu(n),method:Vo(r,"method")?String(r.method).toUpperCase():"GET"}}const e=t[0];return{url:mu(e),method:Vo(e,"method")?String(e.method).toUpperCase():"GET"}}function fE(t){const[e,n]=t;try{if(typeof n=="object"&&n!==null&&"headers"in n&&n.headers)return new Headers(n.headers);if(bm(e))return new Headers(e.headers)}catch{}}function pE(){return"npm"}const q=O;let zo=0;function Bh(){return zo>0}function gE(){zo++,setTimeout(()=>{zo--})}function xn(t,e={}){function n(i){return typeof i=="function"}if(!n(t))return t;try{const i=t.__sentry_wrapped__;if(i)return typeof i=="function"?i:t;if(Wa(t))return t}catch{return t}const r=function(...i){try{const s=i.map(o=>xn(o,e));return t.apply(this,s)}catch(s){throw gE(),Wm(o=>{o.addEventProcessor(a=>(e.mechanism&&(xo(a,void 0),On(a,e.mechanism)),a.extra={...a.extra,arguments:i},a)),ty(s)}),s}};try{for(const i in t)Object.prototype.hasOwnProperty.call(t,i)&&(r[i]=t[i])}catch{}ah(r,t),on(t,"__sentry_wrapped__",r);try{Object.getOwnPropertyDescriptor(r,"name").configurable&&Object.defineProperty(r,"name",{get(){return t.name}})}catch{}return r}function mE(){const t=Ha(),{referrer:e}=q.document||{},{userAgent:n}=q.navigator||{},r={...e&&{Referer:e},...n&&{"User-Agent":n}};return{url:t,headers:r}}function qa(t,e){const n=Ya(t,e),r={type:wE(e),value:bE(e)};return n.length&&(r.stacktrace={frames:n}),r.type===void 0&&r.value===""&&(r.value="Unrecoverable error caught"),r}function _E(t,e,n,r){const s=_e()?.getOptions().normalizeDepth,o=kE(e),a={__serialized__:vh(e,s)};if(o)return{exception:{values:[qa(t,o)]},extra:a};const c={exception:{values:[{type:Cs(e)?e.constructor.name:r?"UnhandledRejection":"Error",value:TE(e,{isUnhandledRejection:r})}]},extra:a};if(n){const l=Ya(t,n);l.length&&(c.exception.values[0].stacktrace={frames:l})}return c}function uo(t,e){return{exception:{values:[qa(t,e)]}}}function Ya(t,e){const n=e.stacktrace||e.stack||"",r=EE(e),i=vE(e);try{return t(n,r,i)}catch{}return[]}const yE=/Minified React error #\d+;/i;function EE(t){return t&&yE.test(t.message)?1:0}function vE(t){return typeof t.framesToPop=="number"?t.framesToPop:0}function Hh(t){return typeof WebAssembly<"u"&&typeof WebAssembly.Exception<"u"?t instanceof WebAssembly.Exception:!1}function wE(t){const e=t?.name;return!e&&Hh(t)?t.message&&Array.isArray(t.message)&&t.message.length==2?t.message[0]:"WebAssembly.Exception":e}function bE(t){const e=t?.message;return Hh(t)?Array.isArray(t.message)&&t.message.length==2?t.message[1]:"wasm exception":e?e.error&&typeof e.error.message=="string"?e.error.message:e:"No error message"}function SE(t,e,n,r){const i=n?.syntheticException||void 0,s=Ka(t,e,i,r);return On(s),s.level="error",n?.event_id&&(s.event_id=n.event_id),Is(s)}function CE(t,e,n="info",r,i){const s=r?.syntheticException||void 0,o=Go(t,e,s,i);return o.level=n,r?.event_id&&(o.event_id=r.event_id),Is(o)}function Ka(t,e,n,r,i){let s;if(ih(e)&&e.error)return uo(t,e.error);if(Nl(e)||ym(e)){const o=e;if("stack"in e)s=uo(t,e);else{const a=o.name||(Nl(o)?"DOMError":"DOMException"),c=o.message?`${a}: ${o.message}`:a;s=Go(t,c,n,r),xo(s,c)}return"code"in o&&(s.tags={...s.tags,"DOMException.code":`${o.code}`}),s}return Ua(e)?uo(t,e):Mr(e)||Cs(e)?(s=_E(t,e,n,i),On(s,{synthetic:!0}),s):(s=Go(t,e,n,r),xo(s,`${e}`),On(s,{synthetic:!0}),s)}function Go(t,e,n,r){const i={};if(r&&n){const s=Ya(t,n);s.length&&(i.exception={values:[{value:e,stacktrace:{frames:s}}]}),On(i,{synthetic:!0})}if($a(e)){const{__sentry_template_string__:s,__sentry_template_values__:o}=e;return i.logentry={message:s,params:o},i}return i.message=e,i}function TE(t,{isUnhandledRejection:e}){const n=Im(t),r=e?"promise rejection":"exception";return ih(t)?`Event \`ErrorEvent\` captured as ${r} with message \`${t.message}\``:Cs(t)?`Event \`${IE(t)}\` (type=${t.type}) captured as ${r}`:`Object captured as ${r} with keys: ${n}`}function IE(t){try{const e=Object.getPrototypeOf(t);return e?e.constructor.name:void 0}catch{}}function kE(t){for(const e in t)if(Object.prototype.hasOwnProperty.call(t,e)){const n=t[e];if(n instanceof Error)return n}}class RE extends vy{constructor(e){const n=AE(e),r=q.SENTRY_SDK_SOURCE||pE();My(n,"browser",["browser"],r),n._metadata?.sdk&&(n._metadata.sdk.settings={infer_ip:n.sendDefaultPii?"auto":"never",...n._metadata.sdk.settings}),super(n);const{sendDefaultPii:i,sendClientReports:s,enableLogs:o,_experiments:a,enableMetrics:c}=this._options,l=c??a?.enableMetrics??!0;q.document&&(s||o||l)&&q.document.addEventListener("visibilitychange",()=>{q.document.visibilityState==="hidden"&&(s&&this._flushOutcomes(),o&&Ih(this),l&&Rh(this))}),i&&this.on("beforeSendSession",Dy)}eventFromException(e,n){return SE(this._options.stackParser,e,n,this._options.attachStacktrace)}eventFromMessage(e,n="info",r){return CE(this._options.stackParser,e,n,r,this._options.attachStacktrace)}_prepareEvent(e,n,r,i){return e.platform=e.platform||"javascript",super._prepareEvent(e,n,r,i)}}function AE(t){return{release:typeof __SENTRY_RELEASE__=="string"?__SENTRY_RELEASE__:q.SENTRY_RELEASE?.id,sendClientReports:!0,parentSpanIsAlwaysRootSpan:!0,...t}}const NE=typeof __SENTRY_DEBUG__>"u"||__SENTRY_DEBUG__,fe=O,PE=1e3;let _u,qo,Yo;function LE(t){fn("dom",t),pn("dom",OE)}function OE(){if(!fe.document)return;const t=$e.bind(null,"dom"),e=yu(t,!0);fe.document.addEventListener("click",e,!1),fe.document.addEventListener("keypress",e,!1),["EventTarget","Node"].forEach(n=>{const i=fe[n]?.prototype;i?.hasOwnProperty?.("addEventListener")&&(Ce(i,"addEventListener",function(s){return function(o,a,c){if(o==="click"||o=="keypress")try{const l=this.__sentry_instrumentation_handlers__=this.__sentry_instrumentation_handlers__||{},u=l[o]=l[o]||{refCount:0};if(!u.handler){const d=yu(t);u.handler=d,s.call(this,o,d,c)}u.refCount++}catch{}return s.call(this,o,a,c)}}),Ce(i,"removeEventListener",function(s){return function(o,a,c){if(o==="click"||o=="keypress")try{const l=this.__sentry_instrumentation_handlers__||{},u=l[o];u&&(u.refCount--,u.refCount<=0&&(s.call(this,o,u.handler,c),u.handler=void 0,delete l[o]),Object.keys(l).length===0&&delete this.__sentry_instrumentation_handlers__)}catch{}return s.call(this,o,a,c)}}))})}function DE(t){if(t.type!==qo)return!1;try{if(!t.target||t.target._sentryId!==Yo)return!1}catch{}return!0}function ME(t,e){return t!=="keypress"?!1:e?.tagName?!(e.tagName==="INPUT"||e.tagName==="TEXTAREA"||e.isContentEditable):!0}function yu(t,e=!1){return n=>{if(!n||n._sentryCaptured)return;const r=xE(n);if(ME(n.type,r))return;on(n,"_sentryCaptured",!0),r&&!r._sentryId&&on(r,"_sentryId",Re());const i=n.type==="keypress"?"input":n.type;DE(n)||(t({event:n,name:i,global:e}),qo=n.type,Yo=r?r._sentryId:void 0),clearTimeout(_u),_u=fe.setTimeout(()=>{Yo=void 0,qo=void 0},PE)}}function xE(t){try{return t.target}catch{return null}}let yi;function Wh(t){const e="history";fn(e,t),pn(e,FE)}function FE(){if(fe.addEventListener("popstate",()=>{const e=fe.location.href,n=yi;if(yi=e,n===e)return;$e("history",{from:n,to:e})}),!aE())return;function t(e){return function(...n){const r=n.length>2?n[2]:void 0;if(r){const i=yi,s=UE(String(r));if(yi=s,i===s)return e.apply(this,n);$e("history",{from:i,to:s})}return e.apply(this,n)}}Ce(fe.history,"pushState",t),Ce(fe.history,"replaceState",t)}function UE(t){try{return new URL(t,fe.location.origin).toString()}catch{return t}}const Pi={};function $E(t){const e=Pi[t];if(e)return e;let n=fe[t];if(jo(n))return Pi[t]=n.bind(fe);const r=fe.document;if(r&&typeof r.createElement=="function")try{const i=r.createElement("iframe");i.hidden=!0,r.head.appendChild(i);const s=i.contentWindow;s?.[t]&&(n=s[t]),r.head.removeChild(i)}catch(i){NE&&w.warn(`Could not create sandbox iframe for ${t} check, bailing to window.${t}: `,i)}return n&&(Pi[t]=n.bind(fe))}function BE(t){Pi[t]=void 0}const Er="__sentry_xhr_v3__";function HE(t){fn("xhr",t),pn("xhr",WE)}function WE(){if(!fe.XMLHttpRequest)return;const t=XMLHttpRequest.prototype;t.open=new Proxy(t.open,{apply(e,n,r){const i=new Error,s=at()*1e3,o=ot(r[0])?r[0].toUpperCase():void 0,a=jE(r[1]);if(!o||!a)return e.apply(n,r);n[Er]={method:o,url:a,request_headers:{}},o==="POST"&&a.match(/sentry_key/)&&(n.__sentry_own_request__=!0);const c=()=>{const l=n[Er];if(l&&n.readyState===4){try{l.status_code=n.status}catch{}const u={endTimestamp:at()*1e3,startTimestamp:s,xhr:n,virtualError:i};$e("xhr",u)}};return"onreadystatechange"in n&&typeof n.onreadystatechange=="function"?n.onreadystatechange=new Proxy(n.onreadystatechange,{apply(l,u,d){return c(),l.apply(u,d)}}):n.addEventListener("readystatechange",c),n.setRequestHeader=new Proxy(n.setRequestHeader,{apply(l,u,d){const[h,f]=d,p=u[Er];return p&&ot(h)&&ot(f)&&(p.request_headers[h.toLowerCase()]=f),l.apply(u,d)}}),e.apply(n,r)}}),t.send=new Proxy(t.send,{apply(e,n,r){const i=n[Er];if(!i)return e.apply(n,r);r[0]!==void 0&&(i.body=r[0]);const s={startTimestamp:at()*1e3,xhr:n};return $e("xhr",s),e.apply(n,r)}})}function jE(t){if(ot(t))return t;try{return t.toString()}catch{}}const VE=40;function zE(t,e=$E("fetch")){let n=0,r=0;async function i(s){const o=s.body.length;n+=o,r++;const a={body:s.body,method:"POST",referrerPolicy:"strict-origin",headers:t.headers,keepalive:n<=6e4&&r<15,...t.fetchOptions};try{const c=await e(t.url,a);return{statusCode:c.status,headers:{"x-sentry-rate-limits":c.headers.get("X-Sentry-Rate-Limits"),"retry-after":c.headers.get("Retry-After")}}}catch(c){throw BE("fetch"),c}finally{n-=o,r--}}return Oy(t,i,xh(t.bufferSize||VE))}const GE=30,qE=50;function Ko(t,e,n,r){const i={filename:t,function:e==="<anonymous>"?sn:e,in_app:!0};return n!==void 0&&(i.lineno=n),r!==void 0&&(i.colno=r),i}const YE=/^\s*at (\S+?)(?::(\d+))(?::(\d+))\s*$/i,KE=/^\s*at (?:(.+?\)(?: \[.+\])?|.*?) ?\((?:address at )?)?(?:async )?((?:<anonymous>|[-a-z]+:|.*bundle|\/)?.*?)(?::(\d+))?(?::(\d+))?\)?\s*$/i,JE=/\((\S*)(?::(\d+))(?::(\d+))\)/,XE=/at (.+?) ?\(data:(.+?),/,QE=t=>{const e=t.match(XE);if(e)return{filename:`<data:${e[2]}>`,function:e[1]};const n=YE.exec(t);if(n){const[,i,s,o]=n;return Ko(i,sn,+s,+o)}const r=KE.exec(t);if(r){if(r[2]&&r[2].indexOf("eval")===0){const a=JE.exec(r[2]);a&&(r[2]=a[1],r[3]=a[2],r[4]=a[3])}const[s,o]=jh(r[1]||sn,r[2]);return Ko(o,s,r[3]?+r[3]:void 0,r[4]?+r[4]:void 0)}},ZE=[GE,QE],ev=/^\s*(.*?)(?:\((.*?)\))?(?:^|@)?((?:[-a-z]+)?:\/.*?|\[native code\]|[^@]*(?:bundle|\d+\.js)|\/[\w\-. /=]+)(?::(\d+))?(?::(\d+))?\s*$/i,tv=/(\S+) line (\d+)(?: > eval line \d+)* > eval/i,nv=t=>{const e=ev.exec(t);if(e){if(e[3]&&e[3].indexOf(" > eval")>-1){const s=tv.exec(e[3]);s&&(e[1]=e[1]||"eval",e[3]=s[1],e[4]=s[2],e[5]="")}let r=e[3],i=e[1]||sn;return[i,r]=jh(i,r),Ko(r,i,e[4]?+e[4]:void 0,e[5]?+e[5]:void 0)}},rv=[qE,nv],iv=[ZE,rv],sv=th(...iv),jh=(t,e)=>{const n=t.indexOf("safari-extension")!==-1,r=t.indexOf("safari-web-extension")!==-1;return n||r?[t.indexOf("@")!==-1?t.split("@")[0]:sn,n?`safari-extension:${e}`:`safari-web-extension:${e}`]:[t,e]},ks=typeof __SENTRY_DEBUG__>"u"||__SENTRY_DEBUG__,Ei=1024,ov="Breadcrumbs",av=((t={})=>{const e={console:!0,dom:!0,fetch:!0,history:!0,sentry:!0,xhr:!0,...t};return{name:ov,setup(n){e.console&&Qy(dv(n)),e.dom&&LE(uv(n,e.dom)),e.xhr&&HE(hv(n)),e.fetch&&uE(fv(n)),e.history&&Wh(pv(n)),e.sentry&&n.on("beforeSendEvent",lv(n))}}}),cv=av;function lv(t){return function(n){_e()===t&&an({category:`sentry.${n.type==="transaction"?"transaction":"event"}`,event_id:n.event_id,level:n.level,message:Xt(n)},{event:n})}}function uv(t,e){return function(r){if(_e()!==t)return;let i,s,o=typeof e=="object"?e.serializeAttribute:void 0,a=typeof e=="object"&&typeof e.maxStringLength=="number"?e.maxStringLength:void 0;a&&a>Ei&&(ks&&w.warn(`\`dom.maxStringLength\` cannot exceed ${Ei}, but a value of ${a} was configured. Sentry will use ${Ei} instead.`),a=Ei),typeof o=="string"&&(o=[o]);try{const l=r.event,u=gv(l)?l.target:l;i=oh(u,{keyAttrs:o,maxStringLength:a}),s=Tm(u)}catch{i="<unknown>"}if(i.length===0)return;const c={category:`ui.${r.name}`,message:i};s&&(c.data={"ui.component_name":s}),an(c,{event:r.event,name:r.name,global:r.global})}}function dv(t){return function(n){if(_e()!==t)return;const r={category:"console",data:{arguments:n.args,logger:"console"},level:eE(n.level),message:Ol(n.args," ")};if(n.level==="assert")if(n.args[0]===!1)r.message=`Assertion failed: ${Ol(n.args.slice(1)," ")||"console.assert"}`,r.data.arguments=n.args.slice(1);else return;an(r,{input:n.args,level:n.level})}}function hv(t){return function(n){if(_e()!==t)return;const{startTimestamp:r,endTimestamp:i}=n,s=n.xhr[Er];if(!r||!i||!s)return;const{method:o,url:a,status_code:c,body:l}=s,u={method:o,url:a,status_code:c},d={xhr:n.xhr,input:l,startTimestamp:r,endTimestamp:i},h={category:"xhr",data:u,type:"http",level:$h(c)};t.emit("beforeOutgoingRequestBreadcrumb",h,d),an(h,d)}}function fv(t){return function(n){if(_e()!==t)return;const{startTimestamp:r,endTimestamp:i}=n;if(i&&!(n.fetchData.url.match(/sentry_key/)&&n.fetchData.method==="POST"))if(n.fetchData.method,n.fetchData.url,n.error){const s=n.fetchData,o={data:n.error,input:n.args,startTimestamp:r,endTimestamp:i},a={category:"fetch",data:s,level:"error",type:"http"};t.emit("beforeOutgoingRequestBreadcrumb",a,o),an(a,o)}else{const s=n.response,o={...n.fetchData,status_code:s?.status};n.fetchData.request_body_size,n.fetchData.response_body_size,s?.status;const a={input:n.args,response:s,startTimestamp:r,endTimestamp:i},c={category:"fetch",data:o,type:"http",level:$h(o.status_code)};t.emit("beforeOutgoingRequestBreadcrumb",c,a),an(c,a)}}}function pv(t){return function(n){if(_e()!==t)return;let r=n.from,i=n.to;const s=lo(q.location.href);let o=r?lo(r):void 0;const a=lo(i);o?.path||(o=s),s.protocol===a.protocol&&s.host===a.host&&(i=a.relative),s.protocol===o.protocol&&s.host===o.host&&(r=o.relative),an({category:"navigation",data:{from:r,to:i}})}}function gv(t){return!!t&&!!t.target}const mv=["EventTarget","Window","Node","ApplicationCache","AudioTrackList","BroadcastChannel","ChannelMergerNode","CryptoOperation","EventSource","FileReader","HTMLUnknownElement","IDBDatabase","IDBRequest","IDBTransaction","KeyOperation","MediaController","MessagePort","ModalWindow","Notification","SVGElementInstance","Screen","SharedWorker","TextTrack","TextTrackCue","TextTrackList","WebSocket","WebSocketWorker","Worker","XMLHttpRequest","XMLHttpRequestEventTarget","XMLHttpRequestUpload"],_v="BrowserApiErrors",yv=((t={})=>{const e={XMLHttpRequest:!0,eventTarget:!0,requestAnimationFrame:!0,setInterval:!0,setTimeout:!0,unregisterOriginalCallbacks:!1,...t};return{name:_v,setupOnce(){e.setTimeout&&Ce(q,"setTimeout",Eu),e.setInterval&&Ce(q,"setInterval",Eu),e.requestAnimationFrame&&Ce(q,"requestAnimationFrame",vv),e.XMLHttpRequest&&"XMLHttpRequest"in q&&Ce(XMLHttpRequest.prototype,"send",wv);const n=e.eventTarget;n&&(Array.isArray(n)?n:mv).forEach(i=>bv(i,e))}}}),Ev=yv;function Eu(t){return function(...e){const n=e[0];return e[0]=xn(n,{mechanism:{handled:!1,type:`auto.browser.browserapierrors.${xt(t)}`}}),t.apply(this,e)}}function vv(t){return function(e){return t.apply(this,[xn(e,{mechanism:{data:{handler:xt(t)},handled:!1,type:"auto.browser.browserapierrors.requestAnimationFrame"}})])}}function wv(t){return function(...e){const n=this;return["onload","onerror","onprogress","onreadystatechange"].forEach(i=>{i in n&&typeof n[i]=="function"&&Ce(n,i,function(s){const o={mechanism:{data:{handler:xt(s)},handled:!1,type:`auto.browser.browserapierrors.xhr.${i}`}},a=Wa(s);return a&&(o.mechanism.data.handler=xt(a)),xn(s,o)})}),t.apply(this,e)}}function bv(t,e){const r=q[t]?.prototype;r?.hasOwnProperty?.("addEventListener")&&(Ce(r,"addEventListener",function(i){return function(s,o,a){try{Sv(o)&&(o.handleEvent=xn(o.handleEvent,{mechanism:{data:{handler:xt(o),target:t},handled:!1,type:"auto.browser.browserapierrors.handleEvent"}}))}catch{}return e.unregisterOriginalCallbacks&&Cv(this,s,o),i.apply(this,[s,xn(o,{mechanism:{data:{handler:xt(o),target:t},handled:!1,type:"auto.browser.browserapierrors.addEventListener"}}),a])}}),Ce(r,"removeEventListener",function(i){return function(s,o,a){try{const c=o.__sentry_wrapped__;c&&i.call(this,s,c,a)}catch{}return i.call(this,s,o,a)}}))}function Sv(t){return typeof t.handleEvent=="function"}function Cv(t,e,n){t&&typeof t=="object"&&"removeEventListener"in t&&typeof t.removeEventListener=="function"&&t.removeEventListener(e,n)}const Tv=()=>({name:"BrowserSession",setupOnce(){if(typeof q.document>"u"){ks&&w.warn("Using the `browserSessionIntegration` in non-browser environments is not supported.");return}eu({ignoreDuration:!0}),tu(),Wh(({from:t,to:e})=>{t!==void 0&&t!==e&&(eu({ignoreDuration:!0}),tu())})}}),Iv="GlobalHandlers",kv=((t={})=>{const e={onerror:!0,onunhandledrejection:!0,...t};return{name:Iv,setupOnce(){Error.stackTraceLimit=50},setup(n){e.onerror&&(Av(n),vu("onerror")),e.onunhandledrejection&&(Nv(n),vu("onunhandledrejection"))}}}),Rv=kv;function Av(t){pm(e=>{const{stackParser:n,attachStacktrace:r}=Vh();if(_e()!==t||Bh())return;const{msg:i,url:s,line:o,column:a,error:c}=e,l=Ov(Ka(n,c||i,void 0,r,!1),s,o,a);l.level="error",bh(l,{originalException:c,mechanism:{handled:!1,type:"auto.browser.global_handlers.onerror"}})})}function Nv(t){mm(e=>{const{stackParser:n,attachStacktrace:r}=Vh();if(_e()!==t||Bh())return;const i=Pv(e),s=Ss(i)?Lv(i):Ka(n,i,void 0,r,!0);s.level="error",bh(s,{originalException:i,mechanism:{handled:!1,type:"auto.browser.global_handlers.onunhandledrejection"}})})}function Pv(t){if(Ss(t))return t;try{if("reason"in t)return t.reason;if("detail"in t&&"reason"in t.detail)return t.detail.reason}catch{}return t}function Lv(t){return{exception:{values:[{type:"UnhandledRejection",value:`Non-Error promise rejection captured with value: ${String(t)}`}]}}}function Ov(t,e,n,r){const i=t.exception=t.exception||{},s=i.values=i.values||[],o=s[0]=s[0]||{},a=o.stacktrace=o.stacktrace||{},c=a.frames=a.frames||[],l=r,u=n,d=Dv(e)??Ha();return c.length===0&&c.push({colno:l,filename:d,function:sn,in_app:!0,lineno:u}),t}function vu(t){ks&&w.log(`Global Handler attached: ${t}`)}function Vh(){return _e()?.getOptions()||{stackParser:()=>[],attachStacktrace:!1}}function Dv(t){if(!(!ot(t)||t.length===0)){if(t.startsWith("data:")){const e=t.match(/^data:([^;]+)/),n=e?e[1]:"text/javascript",r=t.includes("base64,");return`<data:${n}${r?",base64":""}>`}return t}}const Mv=()=>({name:"HttpContext",preprocessEvent(t){if(!q.navigator&&!q.location&&!q.document)return;const e=mE(),n={...e.headers,...t.request?.headers};t.request={...e,...t.request,headers:n}}}),xv="cause",Fv=5,Uv="LinkedErrors",$v=((t={})=>{const e=t.limit||Fv,n=t.key||xv;return{name:Uv,preprocessEvent(r,i,s){const o=s.getOptions();Xy(qa,o.stackParser,n,e,r,i)}}}),Bv=$v;function Hv(){return Wv()?(ks&&Kn(()=>{console.error("[Sentry] You cannot use Sentry.init() in a browser extension, see: https://docs.sentry.io/platforms/javascript/best-practices/browser-extensions/")}),!0):!1}function Wv(){if(typeof q.window>"u")return!1;const t=q;if(t.nw||!(t.chrome||t.browser)?.runtime?.id)return!1;const n=Ha(),r=["chrome-extension","moz-extension","ms-browser-extension","safari-web-extension"];return!(q===q.top&&r.some(s=>n.startsWith(`${s}://`)))}function jv(t){return[jy(),$y(),Ev(),cv(),Rv(),Bv(),rE(),Mv(),Tv()]}function Vv(t={}){const e=!t.skipBrowserExtensionCheck&&Hv();let n=t.defaultIntegrations==null?jv():t.defaultIntegrations;const r={...t,enabled:e?!1:t.enabled,stackParser:hm(t.stackParser||sv),integrations:cy({integrations:t.integrations,defaultIntegrations:n}),transport:t.transport||zE};return Ty(RE,r)}const zv="https://adc1b5518c6a55273a1398d1b8b9cd3e@o4510415124496384.ingest.de.sentry.io/4510415129083984";Vv({dsn:zv,sendDefaultPii:!0});/**
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
 */const Gv=()=>{};var wu={};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const zh={NODE_ADMIN:!1,SDK_VERSION:"${JSCORE_VERSION}"};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const g=function(t,e){if(!t)throw Qn(e)},Qn=function(t){return new Error("Firebase Database ("+zh.SDK_VERSION+") INTERNAL ASSERT FAILED: "+t)};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Gh=function(t){const e=[];let n=0;for(let r=0;r<t.length;r++){let i=t.charCodeAt(r);i<128?e[n++]=i:i<2048?(e[n++]=i>>6|192,e[n++]=i&63|128):(i&64512)===55296&&r+1<t.length&&(t.charCodeAt(r+1)&64512)===56320?(i=65536+((i&1023)<<10)+(t.charCodeAt(++r)&1023),e[n++]=i>>18|240,e[n++]=i>>12&63|128,e[n++]=i>>6&63|128,e[n++]=i&63|128):(e[n++]=i>>12|224,e[n++]=i>>6&63|128,e[n++]=i&63|128)}return e},qv=function(t){const e=[];let n=0,r=0;for(;n<t.length;){const i=t[n++];if(i<128)e[r++]=String.fromCharCode(i);else if(i>191&&i<224){const s=t[n++];e[r++]=String.fromCharCode((i&31)<<6|s&63)}else if(i>239&&i<365){const s=t[n++],o=t[n++],a=t[n++],c=((i&7)<<18|(s&63)<<12|(o&63)<<6|a&63)-65536;e[r++]=String.fromCharCode(55296+(c>>10)),e[r++]=String.fromCharCode(56320+(c&1023))}else{const s=t[n++],o=t[n++];e[r++]=String.fromCharCode((i&15)<<12|(s&63)<<6|o&63)}}return e.join("")},Rs={byteToCharMap_:null,charToByteMap_:null,byteToCharMapWebSafe_:null,charToByteMapWebSafe_:null,ENCODED_VALS_BASE:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",get ENCODED_VALS(){return this.ENCODED_VALS_BASE+"+/="},get ENCODED_VALS_WEBSAFE(){return this.ENCODED_VALS_BASE+"-_."},HAS_NATIVE_SUPPORT:typeof atob=="function",encodeByteArray(t,e){if(!Array.isArray(t))throw Error("encodeByteArray takes an array as a parameter");this.init_();const n=e?this.byteToCharMapWebSafe_:this.byteToCharMap_,r=[];for(let i=0;i<t.length;i+=3){const s=t[i],o=i+1<t.length,a=o?t[i+1]:0,c=i+2<t.length,l=c?t[i+2]:0,u=s>>2,d=(s&3)<<4|a>>4;let h=(a&15)<<2|l>>6,f=l&63;c||(f=64,o||(h=64)),r.push(n[u],n[d],n[h],n[f])}return r.join("")},encodeString(t,e){return this.HAS_NATIVE_SUPPORT&&!e?btoa(t):this.encodeByteArray(Gh(t),e)},decodeString(t,e){return this.HAS_NATIVE_SUPPORT&&!e?atob(t):qv(this.decodeStringToByteArray(t,e))},decodeStringToByteArray(t,e){this.init_();const n=e?this.charToByteMapWebSafe_:this.charToByteMap_,r=[];for(let i=0;i<t.length;){const s=n[t.charAt(i++)],a=i<t.length?n[t.charAt(i)]:0;++i;const l=i<t.length?n[t.charAt(i)]:64;++i;const d=i<t.length?n[t.charAt(i)]:64;if(++i,s==null||a==null||l==null||d==null)throw new Yv;const h=s<<2|a>>4;if(r.push(h),l!==64){const f=a<<4&240|l>>2;if(r.push(f),d!==64){const p=l<<6&192|d;r.push(p)}}}return r},init_(){if(!this.byteToCharMap_){this.byteToCharMap_={},this.charToByteMap_={},this.byteToCharMapWebSafe_={},this.charToByteMapWebSafe_={};for(let t=0;t<this.ENCODED_VALS.length;t++)this.byteToCharMap_[t]=this.ENCODED_VALS.charAt(t),this.charToByteMap_[this.byteToCharMap_[t]]=t,this.byteToCharMapWebSafe_[t]=this.ENCODED_VALS_WEBSAFE.charAt(t),this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[t]]=t,t>=this.ENCODED_VALS_BASE.length&&(this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(t)]=t,this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(t)]=t)}}};class Yv extends Error{constructor(){super(...arguments),this.name="DecodeBase64StringError"}}const qh=function(t){const e=Gh(t);return Rs.encodeByteArray(e,!0)},zi=function(t){return qh(t).replace(/\./g,"")},Gi=function(t){try{return Rs.decodeString(t,!0)}catch(e){console.error("base64Decode failed: ",e)}return null};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Kv(t){return Yh(void 0,t)}function Yh(t,e){if(!(e instanceof Object))return e;switch(e.constructor){case Date:const n=e;return new Date(n.getTime());case Object:t===void 0&&(t={});break;case Array:t=[];break;default:return e}for(const n in e)!e.hasOwnProperty(n)||!Jv(n)||(t[n]=Yh(t[n],e[n]));return t}function Jv(t){return t!=="__proto__"}/**
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
 */function Kh(){if(typeof self<"u")return self;if(typeof window<"u")return window;if(typeof global<"u")return global;throw new Error("Unable to locate global object.")}/**
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
 */const Xv=()=>Kh().__FIREBASE_DEFAULTS__,Qv=()=>{if(typeof process>"u"||typeof wu>"u")return;const t=wu.__FIREBASE_DEFAULTS__;if(t)return JSON.parse(t)},Zv=()=>{if(typeof document>"u")return;let t;try{t=document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/)}catch{return}const e=t&&Gi(t[1]);return e&&JSON.parse(e)},Ja=()=>{try{return Gv()||Xv()||Qv()||Zv()}catch(t){console.info(`Unable to get __FIREBASE_DEFAULTS__ due to: ${t}`);return}},Jh=t=>Ja()?.emulatorHosts?.[t],ew=t=>{const e=Jh(t);if(!e)return;const n=e.lastIndexOf(":");if(n<=0||n+1===e.length)throw new Error(`Invalid host ${e} with no separate hostname and port!`);const r=parseInt(e.substring(n+1),10);return e[0]==="["?[e.substring(1,n-1),r]:[e.substring(0,n),r]},Xh=()=>Ja()?.config,Qh=t=>Ja()?.[`_${t}`];/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class dt{constructor(){this.reject=()=>{},this.resolve=()=>{},this.promise=new Promise((e,n)=>{this.resolve=e,this.reject=n})}wrapCallback(e){return(n,r)=>{n?this.reject(n):this.resolve(r),typeof e=="function"&&(this.promise.catch(()=>{}),e.length===1?e(n):e(n,r))}}}/**
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
 */function Zn(t){try{return(t.startsWith("http://")||t.startsWith("https://")?new URL(t).hostname:t).endsWith(".cloudworkstations.dev")}catch{return!1}}async function Zh(t){return(await fetch(t,{credentials:"include"})).ok}/**
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
 */function tw(t,e){if(t.uid)throw new Error('The "uid" field is no longer supported by mockUserToken. Please use "sub" instead for Firebase Auth User ID.');const n={alg:"none",type:"JWT"},r=e||"demo-project",i=t.iat||0,s=t.sub||t.user_id;if(!s)throw new Error("mockUserToken must contain 'sub' or 'user_id' field!");const o={iss:`https://securetoken.google.com/${r}`,aud:r,iat:i,exp:i+3600,auth_time:i,sub:s,user_id:s,firebase:{sign_in_provider:"custom",identities:{}},...t};return[zi(JSON.stringify(n)),zi(JSON.stringify(o)),""].join(".")}const br={};function nw(){const t={prod:[],emulator:[]};for(const e of Object.keys(br))br[e]?t.emulator.push(e):t.prod.push(e);return t}function rw(t){let e=document.getElementById(t),n=!1;return e||(e=document.createElement("div"),e.setAttribute("id",t),n=!0),{created:n,element:e}}let bu=!1;function ef(t,e){if(typeof window>"u"||typeof document>"u"||!Zn(window.location.host)||br[t]===e||br[t]||bu)return;br[t]=e;function n(h){return`__firebase__banner__${h}`}const r="__firebase__banner",s=nw().prod.length>0;function o(){const h=document.getElementById(r);h&&h.remove()}function a(h){h.style.display="flex",h.style.background="#7faaf0",h.style.position="fixed",h.style.bottom="5px",h.style.left="5px",h.style.padding=".5em",h.style.borderRadius="5px",h.style.alignItems="center"}function c(h,f){h.setAttribute("width","24"),h.setAttribute("id",f),h.setAttribute("height","24"),h.setAttribute("viewBox","0 0 24 24"),h.setAttribute("fill","none"),h.style.marginLeft="-6px"}function l(){const h=document.createElement("span");return h.style.cursor="pointer",h.style.marginLeft="16px",h.style.fontSize="24px",h.innerHTML=" &times;",h.onclick=()=>{bu=!0,o()},h}function u(h,f){h.setAttribute("id",f),h.innerText="Learn more",h.href="https://firebase.google.com/docs/studio/preview-apps#preview-backend",h.setAttribute("target","__blank"),h.style.paddingLeft="5px",h.style.textDecoration="underline"}function d(){const h=rw(r),f=n("text"),p=document.getElementById(f)||document.createElement("span"),y=n("learnmore"),m=document.getElementById(y)||document.createElement("a"),A=n("preprendIcon"),N=document.getElementById(A)||document.createElementNS("http://www.w3.org/2000/svg","svg");if(h.created){const le=h.element;a(le),u(m,y);const S=l();c(N,A),le.append(N,p,m,S),document.body.appendChild(le)}s?(p.innerText="Preview backend disconnected.",N.innerHTML=`<g clip-path="url(#clip0_6013_33858)">
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
 */function me(){return typeof navigator<"u"&&typeof navigator.userAgent=="string"?navigator.userAgent:""}function Xa(){return typeof window<"u"&&!!(window.cordova||window.phonegap||window.PhoneGap)&&/ios|iphone|ipod|ipad|android|blackberry|iemobile/i.test(me())}function iw(){return typeof navigator<"u"&&navigator.userAgent==="Cloudflare-Workers"}function sw(){const t=typeof chrome=="object"?chrome.runtime:typeof browser=="object"?browser.runtime:void 0;return typeof t=="object"&&t.id!==void 0}function tf(){return typeof navigator=="object"&&navigator.product==="ReactNative"}function ow(){const t=me();return t.indexOf("MSIE ")>=0||t.indexOf("Trident/")>=0}function aw(){return zh.NODE_ADMIN===!0}function Qa(){try{return typeof indexedDB=="object"}catch{return!1}}function cw(){return new Promise((t,e)=>{try{let n=!0;const r="validate-browser-context-for-indexeddb-analytics-module",i=self.indexedDB.open(r);i.onsuccess=()=>{i.result.close(),n||self.indexedDB.deleteDatabase(r),t(!0)},i.onupgradeneeded=()=>{n=!1},i.onerror=()=>{e(i.error?.message||"")}}catch(n){e(n)}})}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const lw="FirebaseError";class jt extends Error{constructor(e,n,r){super(n),this.code=e,this.customData=r,this.name=lw,Object.setPrototypeOf(this,jt.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,er.prototype.create)}}class er{constructor(e,n,r){this.service=e,this.serviceName=n,this.errors=r}create(e,...n){const r=n[0]||{},i=`${this.service}/${e}`,s=this.errors[e],o=s?uw(s,r):"Error",a=`${this.serviceName}: ${o} (${i}).`;return new jt(i,a,r)}}function uw(t,e){return t.replace(dw,(n,r)=>{const i=e[r];return i!=null?String(i):`<${r}?>`})}const dw=/\{\$([^}]+)}/g;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ur(t){return JSON.parse(t)}function X(t){return JSON.stringify(t)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const nf=function(t){let e={},n={},r={},i="";try{const s=t.split(".");e=Ur(Gi(s[0])||""),n=Ur(Gi(s[1])||""),i=s[2],r=n.d||{},delete n.d}catch{}return{header:e,claims:n,data:r,signature:i}},hw=function(t){const e=nf(t),n=e.claims;return!!n&&typeof n=="object"&&n.hasOwnProperty("iat")},fw=function(t){const e=nf(t).claims;return typeof e=="object"&&e.admin===!0};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Xe(t,e){return Object.prototype.hasOwnProperty.call(t,e)}function Fn(t,e){if(Object.prototype.hasOwnProperty.call(t,e))return t[e]}function Jo(t){for(const e in t)if(Object.prototype.hasOwnProperty.call(t,e))return!1;return!0}function qi(t,e,n){const r={};for(const i in t)Object.prototype.hasOwnProperty.call(t,i)&&(r[i]=e.call(n,t[i],i,t));return r}function cn(t,e){if(t===e)return!0;const n=Object.keys(t),r=Object.keys(e);for(const i of n){if(!r.includes(i))return!1;const s=t[i],o=e[i];if(Su(s)&&Su(o)){if(!cn(s,o))return!1}else if(s!==o)return!1}for(const i of r)if(!n.includes(i))return!1;return!0}function Su(t){return t!==null&&typeof t=="object"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function tr(t){const e=[];for(const[n,r]of Object.entries(t))Array.isArray(r)?r.forEach(i=>{e.push(encodeURIComponent(n)+"="+encodeURIComponent(i))}):e.push(encodeURIComponent(n)+"="+encodeURIComponent(r));return e.length?"&"+e.join("&"):""}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class pw{constructor(){this.chain_=[],this.buf_=[],this.W_=[],this.pad_=[],this.inbuf_=0,this.total_=0,this.blockSize=512/8,this.pad_[0]=128;for(let e=1;e<this.blockSize;++e)this.pad_[e]=0;this.reset()}reset(){this.chain_[0]=1732584193,this.chain_[1]=4023233417,this.chain_[2]=2562383102,this.chain_[3]=271733878,this.chain_[4]=3285377520,this.inbuf_=0,this.total_=0}compress_(e,n){n||(n=0);const r=this.W_;if(typeof e=="string")for(let d=0;d<16;d++)r[d]=e.charCodeAt(n)<<24|e.charCodeAt(n+1)<<16|e.charCodeAt(n+2)<<8|e.charCodeAt(n+3),n+=4;else for(let d=0;d<16;d++)r[d]=e[n]<<24|e[n+1]<<16|e[n+2]<<8|e[n+3],n+=4;for(let d=16;d<80;d++){const h=r[d-3]^r[d-8]^r[d-14]^r[d-16];r[d]=(h<<1|h>>>31)&4294967295}let i=this.chain_[0],s=this.chain_[1],o=this.chain_[2],a=this.chain_[3],c=this.chain_[4],l,u;for(let d=0;d<80;d++){d<40?d<20?(l=a^s&(o^a),u=1518500249):(l=s^o^a,u=1859775393):d<60?(l=s&o|a&(s|o),u=2400959708):(l=s^o^a,u=3395469782);const h=(i<<5|i>>>27)+l+c+u+r[d]&4294967295;c=a,a=o,o=(s<<30|s>>>2)&4294967295,s=i,i=h}this.chain_[0]=this.chain_[0]+i&4294967295,this.chain_[1]=this.chain_[1]+s&4294967295,this.chain_[2]=this.chain_[2]+o&4294967295,this.chain_[3]=this.chain_[3]+a&4294967295,this.chain_[4]=this.chain_[4]+c&4294967295}update(e,n){if(e==null)return;n===void 0&&(n=e.length);const r=n-this.blockSize;let i=0;const s=this.buf_;let o=this.inbuf_;for(;i<n;){if(o===0)for(;i<=r;)this.compress_(e,i),i+=this.blockSize;if(typeof e=="string"){for(;i<n;)if(s[o]=e.charCodeAt(i),++o,++i,o===this.blockSize){this.compress_(s),o=0;break}}else for(;i<n;)if(s[o]=e[i],++o,++i,o===this.blockSize){this.compress_(s),o=0;break}}this.inbuf_=o,this.total_+=n}digest(){const e=[];let n=this.total_*8;this.inbuf_<56?this.update(this.pad_,56-this.inbuf_):this.update(this.pad_,this.blockSize-(this.inbuf_-56));for(let i=this.blockSize-1;i>=56;i--)this.buf_[i]=n&255,n/=256;this.compress_(this.buf_);let r=0;for(let i=0;i<5;i++)for(let s=24;s>=0;s-=8)e[r]=this.chain_[i]>>s&255,++r;return e}}function gw(t,e){const n=new mw(t,e);return n.subscribe.bind(n)}class mw{constructor(e,n){this.observers=[],this.unsubscribes=[],this.observerCount=0,this.task=Promise.resolve(),this.finalized=!1,this.onNoObservers=n,this.task.then(()=>{e(this)}).catch(r=>{this.error(r)})}next(e){this.forEachObserver(n=>{n.next(e)})}error(e){this.forEachObserver(n=>{n.error(e)}),this.close(e)}complete(){this.forEachObserver(e=>{e.complete()}),this.close()}subscribe(e,n,r){let i;if(e===void 0&&n===void 0&&r===void 0)throw new Error("Missing Observer.");_w(e,["next","error","complete"])?i=e:i={next:e,error:n,complete:r},i.next===void 0&&(i.next=ho),i.error===void 0&&(i.error=ho),i.complete===void 0&&(i.complete=ho);const s=this.unsubscribeOne.bind(this,this.observers.length);return this.finalized&&this.task.then(()=>{try{this.finalError?i.error(this.finalError):i.complete()}catch{}}),this.observers.push(i),s}unsubscribeOne(e){this.observers===void 0||this.observers[e]===void 0||(delete this.observers[e],this.observerCount-=1,this.observerCount===0&&this.onNoObservers!==void 0&&this.onNoObservers(this))}forEachObserver(e){if(!this.finalized)for(let n=0;n<this.observers.length;n++)this.sendOne(n,e)}sendOne(e,n){this.task.then(()=>{if(this.observers!==void 0&&this.observers[e]!==void 0)try{n(this.observers[e])}catch(r){typeof console<"u"&&console.error&&console.error(r)}})}close(e){this.finalized||(this.finalized=!0,e!==void 0&&(this.finalError=e),this.task.then(()=>{this.observers=void 0,this.onNoObservers=void 0}))}}function _w(t,e){if(typeof t!="object"||t===null)return!1;for(const n of e)if(n in t&&typeof t[n]=="function")return!0;return!1}function ho(){}function As(t,e){return`${t} failed: ${e} argument `}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const yw=function(t){const e=[];let n=0;for(let r=0;r<t.length;r++){let i=t.charCodeAt(r);if(i>=55296&&i<=56319){const s=i-55296;r++,g(r<t.length,"Surrogate pair missing trail surrogate.");const o=t.charCodeAt(r)-56320;i=65536+(s<<10)+o}i<128?e[n++]=i:i<2048?(e[n++]=i>>6|192,e[n++]=i&63|128):i<65536?(e[n++]=i>>12|224,e[n++]=i>>6&63|128,e[n++]=i&63|128):(e[n++]=i>>18|240,e[n++]=i>>12&63|128,e[n++]=i>>6&63|128,e[n++]=i&63|128)}return e},Ns=function(t){let e=0;for(let n=0;n<t.length;n++){const r=t.charCodeAt(n);r<128?e++:r<2048?e+=2:r>=55296&&r<=56319?(e+=4,n++):e+=3}return e};/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ew=1e3,vw=2,ww=14400*1e3,bw=.5;function Sw(t,e=Ew,n=vw){const r=e*Math.pow(n,t),i=Math.round(bw*r*(Math.random()-.5)*2);return Math.min(ww,r+i)}/**
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
 */function ce(t){return t&&t._delegate?t._delegate:t}class ht{constructor(e,n,r){this.name=e,this.instanceFactory=n,this.type=r,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}setInstantiationMode(e){return this.instantiationMode=e,this}setMultipleInstances(e){return this.multipleInstances=e,this}setServiceProps(e){return this.serviceProps=e,this}setInstanceCreatedCallback(e){return this.onInstanceCreated=e,this}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Kt="[DEFAULT]";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Cw{constructor(e,n){this.name=e,this.container=n,this.component=null,this.instances=new Map,this.instancesDeferred=new Map,this.instancesOptions=new Map,this.onInitCallbacks=new Map}get(e){const n=this.normalizeInstanceIdentifier(e);if(!this.instancesDeferred.has(n)){const r=new dt;if(this.instancesDeferred.set(n,r),this.isInitialized(n)||this.shouldAutoInitialize())try{const i=this.getOrInitializeService({instanceIdentifier:n});i&&r.resolve(i)}catch{}}return this.instancesDeferred.get(n).promise}getImmediate(e){const n=this.normalizeInstanceIdentifier(e?.identifier),r=e?.optional??!1;if(this.isInitialized(n)||this.shouldAutoInitialize())try{return this.getOrInitializeService({instanceIdentifier:n})}catch(i){if(r)return null;throw i}else{if(r)return null;throw Error(`Service ${this.name} is not available`)}}getComponent(){return this.component}setComponent(e){if(e.name!==this.name)throw Error(`Mismatching Component ${e.name} for Provider ${this.name}.`);if(this.component)throw Error(`Component for ${this.name} has already been provided`);if(this.component=e,!!this.shouldAutoInitialize()){if(Iw(e))try{this.getOrInitializeService({instanceIdentifier:Kt})}catch{}for(const[n,r]of this.instancesDeferred.entries()){const i=this.normalizeInstanceIdentifier(n);try{const s=this.getOrInitializeService({instanceIdentifier:i});r.resolve(s)}catch{}}}}clearInstance(e=Kt){this.instancesDeferred.delete(e),this.instancesOptions.delete(e),this.instances.delete(e)}async delete(){const e=Array.from(this.instances.values());await Promise.all([...e.filter(n=>"INTERNAL"in n).map(n=>n.INTERNAL.delete()),...e.filter(n=>"_delete"in n).map(n=>n._delete())])}isComponentSet(){return this.component!=null}isInitialized(e=Kt){return this.instances.has(e)}getOptions(e=Kt){return this.instancesOptions.get(e)||{}}initialize(e={}){const{options:n={}}=e,r=this.normalizeInstanceIdentifier(e.instanceIdentifier);if(this.isInitialized(r))throw Error(`${this.name}(${r}) has already been initialized`);if(!this.isComponentSet())throw Error(`Component ${this.name} has not been registered yet`);const i=this.getOrInitializeService({instanceIdentifier:r,options:n});for(const[s,o]of this.instancesDeferred.entries()){const a=this.normalizeInstanceIdentifier(s);r===a&&o.resolve(i)}return i}onInit(e,n){const r=this.normalizeInstanceIdentifier(n),i=this.onInitCallbacks.get(r)??new Set;i.add(e),this.onInitCallbacks.set(r,i);const s=this.instances.get(r);return s&&e(s,r),()=>{i.delete(e)}}invokeOnInitCallbacks(e,n){const r=this.onInitCallbacks.get(n);if(r)for(const i of r)try{i(e,n)}catch{}}getOrInitializeService({instanceIdentifier:e,options:n={}}){let r=this.instances.get(e);if(!r&&this.component&&(r=this.component.instanceFactory(this.container,{instanceIdentifier:Tw(e),options:n}),this.instances.set(e,r),this.instancesOptions.set(e,n),this.invokeOnInitCallbacks(r,e),this.component.onInstanceCreated))try{this.component.onInstanceCreated(this.container,e,r)}catch{}return r||null}normalizeInstanceIdentifier(e=Kt){return this.component?this.component.multipleInstances?e:Kt:e}shouldAutoInitialize(){return!!this.component&&this.component.instantiationMode!=="EXPLICIT"}}function Tw(t){return t===Kt?void 0:t}function Iw(t){return t.instantiationMode==="EAGER"}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class kw{constructor(e){this.name=e,this.providers=new Map}addComponent(e){const n=this.getProvider(e.name);if(n.isComponentSet())throw new Error(`Component ${e.name} has already been registered with ${this.name}`);n.setComponent(e)}addOrOverwriteComponent(e){this.getProvider(e.name).isComponentSet()&&this.providers.delete(e.name),this.addComponent(e)}getProvider(e){if(this.providers.has(e))return this.providers.get(e);const n=new Cw(e,this);return this.providers.set(e,n),n}getProviders(){return Array.from(this.providers.values())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var L;(function(t){t[t.DEBUG=0]="DEBUG",t[t.VERBOSE=1]="VERBOSE",t[t.INFO=2]="INFO",t[t.WARN=3]="WARN",t[t.ERROR=4]="ERROR",t[t.SILENT=5]="SILENT"})(L||(L={}));const Rw={debug:L.DEBUG,verbose:L.VERBOSE,info:L.INFO,warn:L.WARN,error:L.ERROR,silent:L.SILENT},Aw=L.INFO,Nw={[L.DEBUG]:"log",[L.VERBOSE]:"log",[L.INFO]:"info",[L.WARN]:"warn",[L.ERROR]:"error"},Pw=(t,e,...n)=>{if(e<t.logLevel)return;const r=new Date().toISOString(),i=Nw[e];if(i)console[i](`[${r}]  ${t.name}:`,...n);else throw new Error(`Attempted to log a message with an invalid logType (value: ${e})`)};class Ps{constructor(e){this.name=e,this._logLevel=Aw,this._logHandler=Pw,this._userLogHandler=null}get logLevel(){return this._logLevel}set logLevel(e){if(!(e in L))throw new TypeError(`Invalid value "${e}" assigned to \`logLevel\``);this._logLevel=e}setLogLevel(e){this._logLevel=typeof e=="string"?Rw[e]:e}get logHandler(){return this._logHandler}set logHandler(e){if(typeof e!="function")throw new TypeError("Value assigned to `logHandler` must be a function");this._logHandler=e}get userLogHandler(){return this._userLogHandler}set userLogHandler(e){this._userLogHandler=e}debug(...e){this._userLogHandler&&this._userLogHandler(this,L.DEBUG,...e),this._logHandler(this,L.DEBUG,...e)}log(...e){this._userLogHandler&&this._userLogHandler(this,L.VERBOSE,...e),this._logHandler(this,L.VERBOSE,...e)}info(...e){this._userLogHandler&&this._userLogHandler(this,L.INFO,...e),this._logHandler(this,L.INFO,...e)}warn(...e){this._userLogHandler&&this._userLogHandler(this,L.WARN,...e),this._logHandler(this,L.WARN,...e)}error(...e){this._userLogHandler&&this._userLogHandler(this,L.ERROR,...e),this._logHandler(this,L.ERROR,...e)}}const Lw=(t,e)=>e.some(n=>t instanceof n);let Cu,Tu;function Ow(){return Cu||(Cu=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])}function Dw(){return Tu||(Tu=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])}const rf=new WeakMap,Xo=new WeakMap,sf=new WeakMap,fo=new WeakMap,Za=new WeakMap;function Mw(t){const e=new Promise((n,r)=>{const i=()=>{t.removeEventListener("success",s),t.removeEventListener("error",o)},s=()=>{n(Pt(t.result)),i()},o=()=>{r(t.error),i()};t.addEventListener("success",s),t.addEventListener("error",o)});return e.then(n=>{n instanceof IDBCursor&&rf.set(n,t)}).catch(()=>{}),Za.set(e,t),e}function xw(t){if(Xo.has(t))return;const e=new Promise((n,r)=>{const i=()=>{t.removeEventListener("complete",s),t.removeEventListener("error",o),t.removeEventListener("abort",o)},s=()=>{n(),i()},o=()=>{r(t.error||new DOMException("AbortError","AbortError")),i()};t.addEventListener("complete",s),t.addEventListener("error",o),t.addEventListener("abort",o)});Xo.set(t,e)}let Qo={get(t,e,n){if(t instanceof IDBTransaction){if(e==="done")return Xo.get(t);if(e==="objectStoreNames")return t.objectStoreNames||sf.get(t);if(e==="store")return n.objectStoreNames[1]?void 0:n.objectStore(n.objectStoreNames[0])}return Pt(t[e])},set(t,e,n){return t[e]=n,!0},has(t,e){return t instanceof IDBTransaction&&(e==="done"||e==="store")?!0:e in t}};function Fw(t){Qo=t(Qo)}function Uw(t){return t===IDBDatabase.prototype.transaction&&!("objectStoreNames"in IDBTransaction.prototype)?function(e,...n){const r=t.call(po(this),e,...n);return sf.set(r,e.sort?e.sort():[e]),Pt(r)}:Dw().includes(t)?function(...e){return t.apply(po(this),e),Pt(rf.get(this))}:function(...e){return Pt(t.apply(po(this),e))}}function $w(t){return typeof t=="function"?Uw(t):(t instanceof IDBTransaction&&xw(t),Lw(t,Ow())?new Proxy(t,Qo):t)}function Pt(t){if(t instanceof IDBRequest)return Mw(t);if(fo.has(t))return fo.get(t);const e=$w(t);return e!==t&&(fo.set(t,e),Za.set(e,t)),e}const po=t=>Za.get(t);function Bw(t,e,{blocked:n,upgrade:r,blocking:i,terminated:s}={}){const o=indexedDB.open(t,e),a=Pt(o);return r&&o.addEventListener("upgradeneeded",c=>{r(Pt(o.result),c.oldVersion,c.newVersion,Pt(o.transaction),c)}),n&&o.addEventListener("blocked",c=>n(c.oldVersion,c.newVersion,c)),a.then(c=>{s&&c.addEventListener("close",()=>s()),i&&c.addEventListener("versionchange",l=>i(l.oldVersion,l.newVersion,l))}).catch(()=>{}),a}const Hw=["get","getKey","getAll","getAllKeys","count"],Ww=["put","add","delete","clear"],go=new Map;function Iu(t,e){if(!(t instanceof IDBDatabase&&!(e in t)&&typeof e=="string"))return;if(go.get(e))return go.get(e);const n=e.replace(/FromIndex$/,""),r=e!==n,i=Ww.includes(n);if(!(n in(r?IDBIndex:IDBObjectStore).prototype)||!(i||Hw.includes(n)))return;const s=async function(o,...a){const c=this.transaction(o,i?"readwrite":"readonly");let l=c.store;return r&&(l=l.index(a.shift())),(await Promise.all([l[n](...a),i&&c.done]))[0]};return go.set(e,s),s}Fw(t=>({...t,get:(e,n,r)=>Iu(e,n)||t.get(e,n,r),has:(e,n)=>!!Iu(e,n)||t.has(e,n)}));/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class jw{constructor(e){this.container=e}getPlatformInfoString(){return this.container.getProviders().map(n=>{if(Vw(n)){const r=n.getImmediate();return`${r.library}/${r.version}`}else return null}).filter(n=>n).join(" ")}}function Vw(t){return t.getComponent()?.type==="VERSION"}const Zo="@firebase/app",ku="0.14.4";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ft=new Ps("@firebase/app"),zw="@firebase/app-compat",Gw="@firebase/analytics-compat",qw="@firebase/analytics",Yw="@firebase/app-check-compat",Kw="@firebase/app-check",Jw="@firebase/auth",Xw="@firebase/auth-compat",Qw="@firebase/database",Zw="@firebase/data-connect",eb="@firebase/database-compat",tb="@firebase/functions",nb="@firebase/functions-compat",rb="@firebase/installations",ib="@firebase/installations-compat",sb="@firebase/messaging",ob="@firebase/messaging-compat",ab="@firebase/performance",cb="@firebase/performance-compat",lb="@firebase/remote-config",ub="@firebase/remote-config-compat",db="@firebase/storage",hb="@firebase/storage-compat",fb="@firebase/firestore",pb="@firebase/ai",gb="@firebase/firestore-compat",mb="firebase",_b="12.4.0";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ea="[DEFAULT]",yb={[Zo]:"fire-core",[zw]:"fire-core-compat",[qw]:"fire-analytics",[Gw]:"fire-analytics-compat",[Kw]:"fire-app-check",[Yw]:"fire-app-check-compat",[Jw]:"fire-auth",[Xw]:"fire-auth-compat",[Qw]:"fire-rtdb",[Zw]:"fire-data-connect",[eb]:"fire-rtdb-compat",[tb]:"fire-fn",[nb]:"fire-fn-compat",[rb]:"fire-iid",[ib]:"fire-iid-compat",[sb]:"fire-fcm",[ob]:"fire-fcm-compat",[ab]:"fire-perf",[cb]:"fire-perf-compat",[lb]:"fire-rc",[ub]:"fire-rc-compat",[db]:"fire-gcs",[hb]:"fire-gcs-compat",[fb]:"fire-fst",[gb]:"fire-fst-compat",[pb]:"fire-vertex","fire-js":"fire-js",[mb]:"fire-js-all"};/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Yi=new Map,Eb=new Map,ta=new Map;function Ru(t,e){try{t.container.addComponent(e)}catch(n){ft.debug(`Component ${e.name} failed to register with FirebaseApp ${t.name}`,n)}}function Ut(t){const e=t.name;if(ta.has(e))return ft.debug(`There were multiple attempts to register component ${e}.`),!1;ta.set(e,t);for(const n of Yi.values())Ru(n,t);for(const n of Eb.values())Ru(n,t);return!0}function ri(t,e){const n=t.container.getProvider("heartbeat").getImmediate({optional:!0});return n&&n.triggerHeartbeat(),t.container.getProvider(e)}function De(t){return t==null?!1:t.settings!==void 0}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const vb={"no-app":"No Firebase App '{$appName}' has been created - call initializeApp() first","bad-app-name":"Illegal App name: '{$appName}'","duplicate-app":"Firebase App named '{$appName}' already exists with different options or config","app-deleted":"Firebase App named '{$appName}' already deleted","server-app-deleted":"Firebase Server App has been deleted","no-options":"Need to provide options, when not being deployed to hosting via source.","invalid-app-argument":"firebase.{$appName}() takes either no argument or a Firebase App instance.","invalid-log-argument":"First argument to `onLog` must be null or a function.","idb-open":"Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.","idb-get":"Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.","idb-set":"Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.","idb-delete":"Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}.","finalization-registry-not-supported":"FirebaseServerApp deleteOnDeref field defined but the JS runtime does not support FinalizationRegistry.","invalid-server-app-environment":"FirebaseServerApp is not for use in browser environments."},Lt=new er("app","Firebase",vb);/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class wb{constructor(e,n,r){this._isDeleted=!1,this._options={...e},this._config={...n},this._name=n.name,this._automaticDataCollectionEnabled=n.automaticDataCollectionEnabled,this._container=r,this.container.addComponent(new ht("app",()=>this,"PUBLIC"))}get automaticDataCollectionEnabled(){return this.checkDestroyed(),this._automaticDataCollectionEnabled}set automaticDataCollectionEnabled(e){this.checkDestroyed(),this._automaticDataCollectionEnabled=e}get name(){return this.checkDestroyed(),this._name}get options(){return this.checkDestroyed(),this._options}get config(){return this.checkDestroyed(),this._config}get container(){return this._container}get isDeleted(){return this._isDeleted}set isDeleted(e){this._isDeleted=e}checkDestroyed(){if(this.isDeleted)throw Lt.create("app-deleted",{appName:this._name})}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const nr=_b;function of(t,e={}){let n=t;typeof e!="object"&&(e={name:e});const r={name:ea,automaticDataCollectionEnabled:!0,...e},i=r.name;if(typeof i!="string"||!i)throw Lt.create("bad-app-name",{appName:String(i)});if(n||(n=Xh()),!n)throw Lt.create("no-options");const s=Yi.get(i);if(s){if(cn(n,s.options)&&cn(r,s.config))return s;throw Lt.create("duplicate-app",{appName:i})}const o=new kw(i);for(const c of ta.values())o.addComponent(c);const a=new wb(n,r,o);return Yi.set(i,a),a}function ec(t=ea){const e=Yi.get(t);if(!e&&t===ea&&Xh())return of();if(!e)throw Lt.create("no-app",{appName:t});return e}function ct(t,e,n){let r=yb[t]??t;n&&(r+=`-${n}`);const i=r.match(/\s|\//),s=e.match(/\s|\//);if(i||s){const o=[`Unable to register library "${r}" with version "${e}":`];i&&o.push(`library name "${r}" contains illegal characters (whitespace or "/")`),i&&s&&o.push("and"),s&&o.push(`version name "${e}" contains illegal characters (whitespace or "/")`),ft.warn(o.join(" "));return}Ut(new ht(`${r}-version`,()=>({library:r,version:e}),"VERSION"))}/**
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
 */const bb="firebase-heartbeat-database",Sb=1,$r="firebase-heartbeat-store";let mo=null;function af(){return mo||(mo=Bw(bb,Sb,{upgrade:(t,e)=>{switch(e){case 0:try{t.createObjectStore($r)}catch(n){console.warn(n)}}}}).catch(t=>{throw Lt.create("idb-open",{originalErrorMessage:t.message})})),mo}async function Cb(t){try{const n=(await af()).transaction($r),r=await n.objectStore($r).get(cf(t));return await n.done,r}catch(e){if(e instanceof jt)ft.warn(e.message);else{const n=Lt.create("idb-get",{originalErrorMessage:e?.message});ft.warn(n.message)}}}async function Au(t,e){try{const r=(await af()).transaction($r,"readwrite");await r.objectStore($r).put(e,cf(t)),await r.done}catch(n){if(n instanceof jt)ft.warn(n.message);else{const r=Lt.create("idb-set",{originalErrorMessage:n?.message});ft.warn(r.message)}}}function cf(t){return`${t.name}!${t.options.appId}`}/**
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
 */const Tb=1024,Ib=30;class kb{constructor(e){this.container=e,this._heartbeatsCache=null;const n=this.container.getProvider("app").getImmediate();this._storage=new Ab(n),this._heartbeatsCachePromise=this._storage.read().then(r=>(this._heartbeatsCache=r,r))}async triggerHeartbeat(){try{const n=this.container.getProvider("platform-logger").getImmediate().getPlatformInfoString(),r=Nu();if(this._heartbeatsCache?.heartbeats==null&&(this._heartbeatsCache=await this._heartbeatsCachePromise,this._heartbeatsCache?.heartbeats==null)||this._heartbeatsCache.lastSentHeartbeatDate===r||this._heartbeatsCache.heartbeats.some(i=>i.date===r))return;if(this._heartbeatsCache.heartbeats.push({date:r,agent:n}),this._heartbeatsCache.heartbeats.length>Ib){const i=Nb(this._heartbeatsCache.heartbeats);this._heartbeatsCache.heartbeats.splice(i,1)}return this._storage.overwrite(this._heartbeatsCache)}catch(e){ft.warn(e)}}async getHeartbeatsHeader(){try{if(this._heartbeatsCache===null&&await this._heartbeatsCachePromise,this._heartbeatsCache?.heartbeats==null||this._heartbeatsCache.heartbeats.length===0)return"";const e=Nu(),{heartbeatsToSend:n,unsentEntries:r}=Rb(this._heartbeatsCache.heartbeats),i=zi(JSON.stringify({version:2,heartbeats:n}));return this._heartbeatsCache.lastSentHeartbeatDate=e,r.length>0?(this._heartbeatsCache.heartbeats=r,await this._storage.overwrite(this._heartbeatsCache)):(this._heartbeatsCache.heartbeats=[],this._storage.overwrite(this._heartbeatsCache)),i}catch(e){return ft.warn(e),""}}}function Nu(){return new Date().toISOString().substring(0,10)}function Rb(t,e=Tb){const n=[];let r=t.slice();for(const i of t){const s=n.find(o=>o.agent===i.agent);if(s){if(s.dates.push(i.date),Pu(n)>e){s.dates.pop();break}}else if(n.push({agent:i.agent,dates:[i.date]}),Pu(n)>e){n.pop();break}r=r.slice(1)}return{heartbeatsToSend:n,unsentEntries:r}}class Ab{constructor(e){this.app=e,this._canUseIndexedDBPromise=this.runIndexedDBEnvironmentCheck()}async runIndexedDBEnvironmentCheck(){return Qa()?cw().then(()=>!0).catch(()=>!1):!1}async read(){if(await this._canUseIndexedDBPromise){const n=await Cb(this.app);return n?.heartbeats?n:{heartbeats:[]}}else return{heartbeats:[]}}async overwrite(e){if(await this._canUseIndexedDBPromise){const r=await this.read();return Au(this.app,{lastSentHeartbeatDate:e.lastSentHeartbeatDate??r.lastSentHeartbeatDate,heartbeats:e.heartbeats})}else return}async add(e){if(await this._canUseIndexedDBPromise){const r=await this.read();return Au(this.app,{lastSentHeartbeatDate:e.lastSentHeartbeatDate??r.lastSentHeartbeatDate,heartbeats:[...r.heartbeats,...e.heartbeats]})}else return}}function Pu(t){return zi(JSON.stringify({version:2,heartbeats:t})).length}function Nb(t){if(t.length===0)return-1;let e=0,n=t[0].date;for(let r=1;r<t.length;r++)t[r].date<n&&(n=t[r].date,e=r);return e}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Pb(t){Ut(new ht("platform-logger",e=>new jw(e),"PRIVATE")),Ut(new ht("heartbeat",e=>new kb(e),"PRIVATE")),ct(Zo,ku,t),ct(Zo,ku,"esm2020"),ct("fire-js","")}Pb("");var Lu={};const Ou="@firebase/database",Du="1.1.0";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let lf="";function Lb(t){lf=t}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ob{constructor(e){this.domStorage_=e,this.prefix_="firebase:"}set(e,n){n==null?this.domStorage_.removeItem(this.prefixedName_(e)):this.domStorage_.setItem(this.prefixedName_(e),X(n))}get(e){const n=this.domStorage_.getItem(this.prefixedName_(e));return n==null?null:Ur(n)}remove(e){this.domStorage_.removeItem(this.prefixedName_(e))}prefixedName_(e){return this.prefix_+e}toString(){return this.domStorage_.toString()}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Db{constructor(){this.cache_={},this.isInMemoryStorage=!0}set(e,n){n==null?delete this.cache_[e]:this.cache_[e]=n}get(e){return Xe(this.cache_,e)?this.cache_[e]:null}remove(e){delete this.cache_[e]}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const uf=function(t){try{if(typeof window<"u"&&typeof window[t]<"u"){const e=window[t];return e.setItem("firebase:sentinel","cache"),e.removeItem("firebase:sentinel"),new Ob(e)}}catch{}return new Db},Zt=uf("localStorage"),Mb=uf("sessionStorage");/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Sn=new Ps("@firebase/database"),xb=(function(){let t=1;return function(){return t++}})(),df=function(t){const e=yw(t),n=new pw;n.update(e);const r=n.digest();return Rs.encodeByteArray(r)},ii=function(...t){let e="";for(let n=0;n<t.length;n++){const r=t[n];Array.isArray(r)||r&&typeof r=="object"&&typeof r.length=="number"?e+=ii.apply(null,r):typeof r=="object"?e+=X(r):e+=r,e+=" "}return e};let Sr=null,Mu=!0;const Fb=function(t,e){g(!0,"Can't turn on custom loggers persistently."),Sn.logLevel=L.VERBOSE,Sr=Sn.log.bind(Sn)},ie=function(...t){if(Mu===!0&&(Mu=!1,Sr===null&&Mb.get("logging_enabled")===!0&&Fb()),Sr){const e=ii.apply(null,t);Sr(e)}},si=function(t){return function(...e){ie(t,...e)}},na=function(...t){const e="FIREBASE INTERNAL ERROR: "+ii(...t);Sn.error(e)},pt=function(...t){const e=`FIREBASE FATAL ERROR: ${ii(...t)}`;throw Sn.error(e),new Error(e)},ge=function(...t){const e="FIREBASE WARNING: "+ii(...t);Sn.warn(e)},Ub=function(){typeof window<"u"&&window.location&&window.location.protocol&&window.location.protocol.indexOf("https:")!==-1&&ge("Insecure Firebase access from a secure page. Please use https in calls to new Firebase().")},tc=function(t){return typeof t=="number"&&(t!==t||t===Number.POSITIVE_INFINITY||t===Number.NEGATIVE_INFINITY)},$b=function(t){if(document.readyState==="complete")t();else{let e=!1;const n=function(){if(!document.body){setTimeout(n,Math.floor(10));return}e||(e=!0,t())};document.addEventListener?(document.addEventListener("DOMContentLoaded",n,!1),window.addEventListener("load",n,!1)):document.attachEvent&&(document.attachEvent("onreadystatechange",()=>{document.readyState==="complete"&&n()}),window.attachEvent("onload",n))}},Un="[MIN_NAME]",ln="[MAX_NAME]",gn=function(t,e){if(t===e)return 0;if(t===Un||e===ln)return-1;if(e===Un||t===ln)return 1;{const n=xu(t),r=xu(e);return n!==null?r!==null?n-r===0?t.length-e.length:n-r:-1:r!==null?1:t<e?-1:1}},Bb=function(t,e){return t===e?0:t<e?-1:1},hr=function(t,e){if(e&&t in e)return e[t];throw new Error("Missing required key ("+t+") in object: "+X(e))},nc=function(t){if(typeof t!="object"||t===null)return X(t);const e=[];for(const r in t)e.push(r);e.sort();let n="{";for(let r=0;r<e.length;r++)r!==0&&(n+=","),n+=X(e[r]),n+=":",n+=nc(t[e[r]]);return n+="}",n},hf=function(t,e){const n=t.length;if(n<=e)return[t];const r=[];for(let i=0;i<n;i+=e)i+e>n?r.push(t.substring(i,n)):r.push(t.substring(i,i+e));return r};function ae(t,e){for(const n in t)t.hasOwnProperty(n)&&e(n,t[n])}const ff=function(t){g(!tc(t),"Invalid JSON number");const e=11,n=52,r=(1<<e-1)-1;let i,s,o,a,c;t===0?(s=0,o=0,i=1/t===-1/0?1:0):(i=t<0,t=Math.abs(t),t>=Math.pow(2,1-r)?(a=Math.min(Math.floor(Math.log(t)/Math.LN2),r),s=a+r,o=Math.round(t*Math.pow(2,n-a)-Math.pow(2,n))):(s=0,o=Math.round(t/Math.pow(2,1-r-n))));const l=[];for(c=n;c;c-=1)l.push(o%2?1:0),o=Math.floor(o/2);for(c=e;c;c-=1)l.push(s%2?1:0),s=Math.floor(s/2);l.push(i?1:0),l.reverse();const u=l.join("");let d="";for(c=0;c<64;c+=8){let h=parseInt(u.substr(c,8),2).toString(16);h.length===1&&(h="0"+h),d=d+h}return d.toLowerCase()},Hb=function(){return!!(typeof window=="object"&&window.chrome&&window.chrome.extension&&!/^chrome/.test(window.location.href))},Wb=function(){return typeof Windows=="object"&&typeof Windows.UI=="object"};function jb(t,e){let n="Unknown Error";t==="too_big"?n="The data requested exceeds the maximum size that can be accessed with a single request.":t==="permission_denied"?n="Client doesn't have permission to access the desired data.":t==="unavailable"&&(n="The service is unavailable");const r=new Error(t+" at "+e._path.toString()+": "+n);return r.code=t.toUpperCase(),r}const Vb=new RegExp("^-?(0*)\\d{1,10}$"),zb=-2147483648,Gb=2147483647,xu=function(t){if(Vb.test(t)){const e=Number(t);if(e>=zb&&e<=Gb)return e}return null},rr=function(t){try{t()}catch(e){setTimeout(()=>{const n=e.stack||"";throw ge("Exception was thrown by user callback.",n),e},Math.floor(0))}},qb=function(){return(typeof window=="object"&&window.navigator&&window.navigator.userAgent||"").search(/googlebot|google webmaster tools|bingbot|yahoo! slurp|baiduspider|yandexbot|duckduckbot/i)>=0},Cr=function(t,e){const n=setTimeout(t,e);return typeof n=="number"&&typeof Deno<"u"&&Deno.unrefTimer?Deno.unrefTimer(n):typeof n=="object"&&n.unref&&n.unref(),n};/**
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
 */class Yb{constructor(e,n){this.appCheckProvider=n,this.appName=e.name,De(e)&&e.settings.appCheckToken&&(this.serverAppAppCheckToken=e.settings.appCheckToken),this.appCheck=n?.getImmediate({optional:!0}),this.appCheck||n?.get().then(r=>this.appCheck=r)}getToken(e){if(this.serverAppAppCheckToken){if(e)throw new Error("Attempted reuse of `FirebaseServerApp.appCheckToken` after previous usage failed.");return Promise.resolve({token:this.serverAppAppCheckToken})}return this.appCheck?this.appCheck.getToken(e):new Promise((n,r)=>{setTimeout(()=>{this.appCheck?this.getToken(e).then(n,r):n(null)},0)})}addTokenChangeListener(e){this.appCheckProvider?.get().then(n=>n.addTokenListener(e))}notifyForInvalidToken(){ge(`Provided AppCheck credentials for the app named "${this.appName}" are invalid. This usually indicates your app was not initialized correctly.`)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Kb{constructor(e,n,r){this.appName_=e,this.firebaseOptions_=n,this.authProvider_=r,this.auth_=null,this.auth_=r.getImmediate({optional:!0}),this.auth_||r.onInit(i=>this.auth_=i)}getToken(e){return this.auth_?this.auth_.getToken(e).catch(n=>n&&n.code==="auth/token-not-initialized"?(ie("Got auth/token-not-initialized error.  Treating as null token."),null):Promise.reject(n)):new Promise((n,r)=>{setTimeout(()=>{this.auth_?this.getToken(e).then(n,r):n(null)},0)})}addTokenChangeListener(e){this.auth_?this.auth_.addAuthTokenListener(e):this.authProvider_.get().then(n=>n.addAuthTokenListener(e))}removeTokenChangeListener(e){this.authProvider_.get().then(n=>n.removeAuthTokenListener(e))}notifyForInvalidToken(){let e='Provided authentication credentials for the app named "'+this.appName_+'" are invalid. This usually indicates your app was not initialized correctly. ';"credential"in this.firebaseOptions_?e+='Make sure the "credential" property provided to initializeApp() is authorized to access the specified "databaseURL" and is from the correct project.':"serviceAccount"in this.firebaseOptions_?e+='Make sure the "serviceAccount" property provided to initializeApp() is authorized to access the specified "databaseURL" and is from the correct project.':e+='Make sure the "apiKey" and "databaseURL" properties provided to initializeApp() match the values provided for your app at https://console.firebase.google.com/.',ge(e)}}class Li{constructor(e){this.accessToken=e}getToken(e){return Promise.resolve({accessToken:this.accessToken})}addTokenChangeListener(e){e(this.accessToken)}removeTokenChangeListener(e){}notifyForInvalidToken(){}}Li.OWNER="owner";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const rc="5",pf="v",gf="s",mf="r",_f="f",yf=/(console\.firebase|firebase-console-\w+\.corp|firebase\.corp)\.google\.com/,Ef="ls",vf="p",ra="ac",wf="websocket",bf="long_polling";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Sf{constructor(e,n,r,i,s=!1,o="",a=!1,c=!1,l=null){this.secure=n,this.namespace=r,this.webSocketOnly=i,this.nodeAdmin=s,this.persistenceKey=o,this.includeNamespaceInQueryParams=a,this.isUsingEmulator=c,this.emulatorOptions=l,this._host=e.toLowerCase(),this._domain=this._host.substr(this._host.indexOf(".")+1),this.internalHost=Zt.get("host:"+e)||this._host}isCacheableHost(){return this.internalHost.substr(0,2)==="s-"}isCustomHost(){return this._domain!=="firebaseio.com"&&this._domain!=="firebaseio-demo.com"}get host(){return this._host}set host(e){e!==this.internalHost&&(this.internalHost=e,this.isCacheableHost()&&Zt.set("host:"+this._host,this.internalHost))}toString(){let e=this.toURLString();return this.persistenceKey&&(e+="<"+this.persistenceKey+">"),e}toURLString(){const e=this.secure?"https://":"http://",n=this.includeNamespaceInQueryParams?`?ns=${this.namespace}`:"";return`${e}${this.host}/${n}`}}function Jb(t){return t.host!==t.internalHost||t.isCustomHost()||t.includeNamespaceInQueryParams}function Cf(t,e,n){g(typeof e=="string","typeof type must == string"),g(typeof n=="object","typeof params must == object");let r;if(e===wf)r=(t.secure?"wss://":"ws://")+t.internalHost+"/.ws?";else if(e===bf)r=(t.secure?"https://":"http://")+t.internalHost+"/.lp?";else throw new Error("Unknown connection type: "+e);Jb(t)&&(n.ns=t.namespace);const i=[];return ae(n,(s,o)=>{i.push(s+"="+o)}),r+i.join("&")}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Xb{constructor(){this.counters_={}}incrementCounter(e,n=1){Xe(this.counters_,e)||(this.counters_[e]=0),this.counters_[e]+=n}get(){return Kv(this.counters_)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const _o={},yo={};function ic(t){const e=t.toString();return _o[e]||(_o[e]=new Xb),_o[e]}function Qb(t,e){const n=t.toString();return yo[n]||(yo[n]=e()),yo[n]}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Zb{constructor(e){this.onMessage_=e,this.pendingResponses=[],this.currentResponseNum=0,this.closeAfterResponse=-1,this.onClose=null}closeAfter(e,n){this.closeAfterResponse=e,this.onClose=n,this.closeAfterResponse<this.currentResponseNum&&(this.onClose(),this.onClose=null)}handleResponse(e,n){for(this.pendingResponses[e]=n;this.pendingResponses[this.currentResponseNum];){const r=this.pendingResponses[this.currentResponseNum];delete this.pendingResponses[this.currentResponseNum];for(let i=0;i<r.length;++i)r[i]&&rr(()=>{this.onMessage_(r[i])});if(this.currentResponseNum===this.closeAfterResponse){this.onClose&&(this.onClose(),this.onClose=null);break}this.currentResponseNum++}}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Fu="start",eS="close",tS="pLPCommand",nS="pRTLPCB",Tf="id",If="pw",kf="ser",rS="cb",iS="seg",sS="ts",oS="d",aS="dframe",Rf=1870,Af=30,cS=Rf-Af,lS=25e3,uS=3e4;class vn{constructor(e,n,r,i,s,o,a){this.connId=e,this.repoInfo=n,this.applicationId=r,this.appCheckToken=i,this.authToken=s,this.transportSessionId=o,this.lastSessionId=a,this.bytesSent=0,this.bytesReceived=0,this.everConnected_=!1,this.log_=si(e),this.stats_=ic(n),this.urlFn=c=>(this.appCheckToken&&(c[ra]=this.appCheckToken),Cf(n,bf,c))}open(e,n){this.curSegmentNum=0,this.onDisconnect_=n,this.myPacketOrderer=new Zb(e),this.isClosed_=!1,this.connectTimeoutTimer_=setTimeout(()=>{this.log_("Timed out trying to connect."),this.onClosed_(),this.connectTimeoutTimer_=null},Math.floor(uS)),$b(()=>{if(this.isClosed_)return;this.scriptTagHolder=new sc((...s)=>{const[o,a,c,l,u]=s;if(this.incrementIncomingBytes_(s),!!this.scriptTagHolder)if(this.connectTimeoutTimer_&&(clearTimeout(this.connectTimeoutTimer_),this.connectTimeoutTimer_=null),this.everConnected_=!0,o===Fu)this.id=a,this.password=c;else if(o===eS)a?(this.scriptTagHolder.sendNewPolls=!1,this.myPacketOrderer.closeAfter(a,()=>{this.onClosed_()})):this.onClosed_();else throw new Error("Unrecognized command received: "+o)},(...s)=>{const[o,a]=s;this.incrementIncomingBytes_(s),this.myPacketOrderer.handleResponse(o,a)},()=>{this.onClosed_()},this.urlFn);const r={};r[Fu]="t",r[kf]=Math.floor(Math.random()*1e8),this.scriptTagHolder.uniqueCallbackIdentifier&&(r[rS]=this.scriptTagHolder.uniqueCallbackIdentifier),r[pf]=rc,this.transportSessionId&&(r[gf]=this.transportSessionId),this.lastSessionId&&(r[Ef]=this.lastSessionId),this.applicationId&&(r[vf]=this.applicationId),this.appCheckToken&&(r[ra]=this.appCheckToken),typeof location<"u"&&location.hostname&&yf.test(location.hostname)&&(r[mf]=_f);const i=this.urlFn(r);this.log_("Connecting via long-poll to "+i),this.scriptTagHolder.addTag(i,()=>{})})}start(){this.scriptTagHolder.startLongPoll(this.id,this.password),this.addDisconnectPingFrame(this.id,this.password)}static forceAllow(){vn.forceAllow_=!0}static forceDisallow(){vn.forceDisallow_=!0}static isAvailable(){return vn.forceAllow_?!0:!vn.forceDisallow_&&typeof document<"u"&&document.createElement!=null&&!Hb()&&!Wb()}markConnectionHealthy(){}shutdown_(){this.isClosed_=!0,this.scriptTagHolder&&(this.scriptTagHolder.close(),this.scriptTagHolder=null),this.myDisconnFrame&&(document.body.removeChild(this.myDisconnFrame),this.myDisconnFrame=null),this.connectTimeoutTimer_&&(clearTimeout(this.connectTimeoutTimer_),this.connectTimeoutTimer_=null)}onClosed_(){this.isClosed_||(this.log_("Longpoll is closing itself"),this.shutdown_(),this.onDisconnect_&&(this.onDisconnect_(this.everConnected_),this.onDisconnect_=null))}close(){this.isClosed_||(this.log_("Longpoll is being closed."),this.shutdown_())}send(e){const n=X(e);this.bytesSent+=n.length,this.stats_.incrementCounter("bytes_sent",n.length);const r=qh(n),i=hf(r,cS);for(let s=0;s<i.length;s++)this.scriptTagHolder.enqueueSegment(this.curSegmentNum,i.length,i[s]),this.curSegmentNum++}addDisconnectPingFrame(e,n){this.myDisconnFrame=document.createElement("iframe");const r={};r[aS]="t",r[Tf]=e,r[If]=n,this.myDisconnFrame.src=this.urlFn(r),this.myDisconnFrame.style.display="none",document.body.appendChild(this.myDisconnFrame)}incrementIncomingBytes_(e){const n=X(e).length;this.bytesReceived+=n,this.stats_.incrementCounter("bytes_received",n)}}class sc{constructor(e,n,r,i){this.onDisconnect=r,this.urlFn=i,this.outstandingRequests=new Set,this.pendingSegs=[],this.currentSerial=Math.floor(Math.random()*1e8),this.sendNewPolls=!0;{this.uniqueCallbackIdentifier=xb(),window[tS+this.uniqueCallbackIdentifier]=e,window[nS+this.uniqueCallbackIdentifier]=n,this.myIFrame=sc.createIFrame_();let s="";this.myIFrame.src&&this.myIFrame.src.substr(0,11)==="javascript:"&&(s='<script>document.domain="'+document.domain+'";<\/script>');const o="<html><body>"+s+"</body></html>";try{this.myIFrame.doc.open(),this.myIFrame.doc.write(o),this.myIFrame.doc.close()}catch(a){ie("frame writing exception"),a.stack&&ie(a.stack),ie(a)}}}static createIFrame_(){const e=document.createElement("iframe");if(e.style.display="none",document.body){document.body.appendChild(e);try{e.contentWindow.document||ie("No IE domain setting required")}catch{const r=document.domain;e.src="javascript:void((function(){document.open();document.domain='"+r+"';document.close();})())"}}else throw"Document body has not initialized. Wait to initialize Firebase until after the document is ready.";return e.contentDocument?e.doc=e.contentDocument:e.contentWindow?e.doc=e.contentWindow.document:e.document&&(e.doc=e.document),e}close(){this.alive=!1,this.myIFrame&&(this.myIFrame.doc.body.textContent="",setTimeout(()=>{this.myIFrame!==null&&(document.body.removeChild(this.myIFrame),this.myIFrame=null)},Math.floor(0)));const e=this.onDisconnect;e&&(this.onDisconnect=null,e())}startLongPoll(e,n){for(this.myID=e,this.myPW=n,this.alive=!0;this.newRequest_(););}newRequest_(){if(this.alive&&this.sendNewPolls&&this.outstandingRequests.size<(this.pendingSegs.length>0?2:1)){this.currentSerial++;const e={};e[Tf]=this.myID,e[If]=this.myPW,e[kf]=this.currentSerial;let n=this.urlFn(e),r="",i=0;for(;this.pendingSegs.length>0&&this.pendingSegs[0].d.length+Af+r.length<=Rf;){const o=this.pendingSegs.shift();r=r+"&"+iS+i+"="+o.seg+"&"+sS+i+"="+o.ts+"&"+oS+i+"="+o.d,i++}return n=n+r,this.addLongPollTag_(n,this.currentSerial),!0}else return!1}enqueueSegment(e,n,r){this.pendingSegs.push({seg:e,ts:n,d:r}),this.alive&&this.newRequest_()}addLongPollTag_(e,n){this.outstandingRequests.add(n);const r=()=>{this.outstandingRequests.delete(n),this.newRequest_()},i=setTimeout(r,Math.floor(lS)),s=()=>{clearTimeout(i),r()};this.addTag(e,s)}addTag(e,n){setTimeout(()=>{try{if(!this.sendNewPolls)return;const r=this.myIFrame.doc.createElement("script");r.type="text/javascript",r.async=!0,r.src=e,r.onload=r.onreadystatechange=function(){const i=r.readyState;(!i||i==="loaded"||i==="complete")&&(r.onload=r.onreadystatechange=null,r.parentNode&&r.parentNode.removeChild(r),n())},r.onerror=()=>{ie("Long-poll script failed to load: "+e),this.sendNewPolls=!1,this.close()},this.myIFrame.doc.body.appendChild(r)}catch{}},Math.floor(1))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const dS=16384,hS=45e3;let Ki=null;typeof MozWebSocket<"u"?Ki=MozWebSocket:typeof WebSocket<"u"&&(Ki=WebSocket);class Me{constructor(e,n,r,i,s,o,a){this.connId=e,this.applicationId=r,this.appCheckToken=i,this.authToken=s,this.keepaliveTimer=null,this.frames=null,this.totalFrames=0,this.bytesSent=0,this.bytesReceived=0,this.log_=si(this.connId),this.stats_=ic(n),this.connURL=Me.connectionURL_(n,o,a,i,r),this.nodeAdmin=n.nodeAdmin}static connectionURL_(e,n,r,i,s){const o={};return o[pf]=rc,typeof location<"u"&&location.hostname&&yf.test(location.hostname)&&(o[mf]=_f),n&&(o[gf]=n),r&&(o[Ef]=r),i&&(o[ra]=i),s&&(o[vf]=s),Cf(e,wf,o)}open(e,n){this.onDisconnect=n,this.onMessage=e,this.log_("Websocket connecting to "+this.connURL),this.everConnected_=!1,Zt.set("previous_websocket_failure",!0);try{let r;aw(),this.mySock=new Ki(this.connURL,[],r)}catch(r){this.log_("Error instantiating WebSocket.");const i=r.message||r.data;i&&this.log_(i),this.onClosed_();return}this.mySock.onopen=()=>{this.log_("Websocket connected."),this.everConnected_=!0},this.mySock.onclose=()=>{this.log_("Websocket connection was disconnected."),this.mySock=null,this.onClosed_()},this.mySock.onmessage=r=>{this.handleIncomingFrame(r)},this.mySock.onerror=r=>{this.log_("WebSocket error.  Closing connection.");const i=r.message||r.data;i&&this.log_(i),this.onClosed_()}}start(){}static forceDisallow(){Me.forceDisallow_=!0}static isAvailable(){let e=!1;if(typeof navigator<"u"&&navigator.userAgent){const n=/Android ([0-9]{0,}\.[0-9]{0,})/,r=navigator.userAgent.match(n);r&&r.length>1&&parseFloat(r[1])<4.4&&(e=!0)}return!e&&Ki!==null&&!Me.forceDisallow_}static previouslyFailed(){return Zt.isInMemoryStorage||Zt.get("previous_websocket_failure")===!0}markConnectionHealthy(){Zt.remove("previous_websocket_failure")}appendFrame_(e){if(this.frames.push(e),this.frames.length===this.totalFrames){const n=this.frames.join("");this.frames=null;const r=Ur(n);this.onMessage(r)}}handleNewFrameCount_(e){this.totalFrames=e,this.frames=[]}extractFrameCount_(e){if(g(this.frames===null,"We already have a frame buffer"),e.length<=6){const n=Number(e);if(!isNaN(n))return this.handleNewFrameCount_(n),null}return this.handleNewFrameCount_(1),e}handleIncomingFrame(e){if(this.mySock===null)return;const n=e.data;if(this.bytesReceived+=n.length,this.stats_.incrementCounter("bytes_received",n.length),this.resetKeepAlive(),this.frames!==null)this.appendFrame_(n);else{const r=this.extractFrameCount_(n);r!==null&&this.appendFrame_(r)}}send(e){this.resetKeepAlive();const n=X(e);this.bytesSent+=n.length,this.stats_.incrementCounter("bytes_sent",n.length);const r=hf(n,dS);r.length>1&&this.sendString_(String(r.length));for(let i=0;i<r.length;i++)this.sendString_(r[i])}shutdown_(){this.isClosed_=!0,this.keepaliveTimer&&(clearInterval(this.keepaliveTimer),this.keepaliveTimer=null),this.mySock&&(this.mySock.close(),this.mySock=null)}onClosed_(){this.isClosed_||(this.log_("WebSocket is closing itself"),this.shutdown_(),this.onDisconnect&&(this.onDisconnect(this.everConnected_),this.onDisconnect=null))}close(){this.isClosed_||(this.log_("WebSocket is being closed"),this.shutdown_())}resetKeepAlive(){clearInterval(this.keepaliveTimer),this.keepaliveTimer=setInterval(()=>{this.mySock&&this.sendString_("0"),this.resetKeepAlive()},Math.floor(hS))}sendString_(e){try{this.mySock.send(e)}catch(n){this.log_("Exception thrown from WebSocket.send():",n.message||n.data,"Closing connection."),setTimeout(this.onClosed_.bind(this),0)}}}Me.responsesRequiredToBeHealthy=2;Me.healthyTimeout=3e4;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Br{static get ALL_TRANSPORTS(){return[vn,Me]}static get IS_TRANSPORT_INITIALIZED(){return this.globalTransportInitialized_}constructor(e){this.initTransports_(e)}initTransports_(e){const n=Me&&Me.isAvailable();let r=n&&!Me.previouslyFailed();if(e.webSocketOnly&&(n||ge("wss:// URL used, but browser isn't known to support websockets.  Trying anyway."),r=!0),r)this.transports_=[Me];else{const i=this.transports_=[];for(const s of Br.ALL_TRANSPORTS)s&&s.isAvailable()&&i.push(s);Br.globalTransportInitialized_=!0}}initialTransport(){if(this.transports_.length>0)return this.transports_[0];throw new Error("No transports available")}upgradeTransport(){return this.transports_.length>1?this.transports_[1]:null}}Br.globalTransportInitialized_=!1;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const fS=6e4,pS=5e3,gS=10*1024,mS=100*1024,Eo="t",Uu="d",_S="s",$u="r",yS="e",Bu="o",Hu="a",Wu="n",ju="p",ES="h";class vS{constructor(e,n,r,i,s,o,a,c,l,u){this.id=e,this.repoInfo_=n,this.applicationId_=r,this.appCheckToken_=i,this.authToken_=s,this.onMessage_=o,this.onReady_=a,this.onDisconnect_=c,this.onKill_=l,this.lastSessionId=u,this.connectionCount=0,this.pendingDataMessages=[],this.state_=0,this.log_=si("c:"+this.id+":"),this.transportManager_=new Br(n),this.log_("Connection created"),this.start_()}start_(){const e=this.transportManager_.initialTransport();this.conn_=new e(this.nextTransportId_(),this.repoInfo_,this.applicationId_,this.appCheckToken_,this.authToken_,null,this.lastSessionId),this.primaryResponsesRequired_=e.responsesRequiredToBeHealthy||0;const n=this.connReceiver_(this.conn_),r=this.disconnReceiver_(this.conn_);this.tx_=this.conn_,this.rx_=this.conn_,this.secondaryConn_=null,this.isHealthy_=!1,setTimeout(()=>{this.conn_&&this.conn_.open(n,r)},Math.floor(0));const i=e.healthyTimeout||0;i>0&&(this.healthyTimeout_=Cr(()=>{this.healthyTimeout_=null,this.isHealthy_||(this.conn_&&this.conn_.bytesReceived>mS?(this.log_("Connection exceeded healthy timeout but has received "+this.conn_.bytesReceived+" bytes.  Marking connection healthy."),this.isHealthy_=!0,this.conn_.markConnectionHealthy()):this.conn_&&this.conn_.bytesSent>gS?this.log_("Connection exceeded healthy timeout but has sent "+this.conn_.bytesSent+" bytes.  Leaving connection alive."):(this.log_("Closing unhealthy connection after timeout."),this.close()))},Math.floor(i)))}nextTransportId_(){return"c:"+this.id+":"+this.connectionCount++}disconnReceiver_(e){return n=>{e===this.conn_?this.onConnectionLost_(n):e===this.secondaryConn_?(this.log_("Secondary connection lost."),this.onSecondaryConnectionLost_()):this.log_("closing an old connection")}}connReceiver_(e){return n=>{this.state_!==2&&(e===this.rx_?this.onPrimaryMessageReceived_(n):e===this.secondaryConn_?this.onSecondaryMessageReceived_(n):this.log_("message on old connection"))}}sendRequest(e){const n={t:"d",d:e};this.sendData_(n)}tryCleanupConnection(){this.tx_===this.secondaryConn_&&this.rx_===this.secondaryConn_&&(this.log_("cleaning up and promoting a connection: "+this.secondaryConn_.connId),this.conn_=this.secondaryConn_,this.secondaryConn_=null)}onSecondaryControl_(e){if(Eo in e){const n=e[Eo];n===Hu?this.upgradeIfSecondaryHealthy_():n===$u?(this.log_("Got a reset on secondary, closing it"),this.secondaryConn_.close(),(this.tx_===this.secondaryConn_||this.rx_===this.secondaryConn_)&&this.close()):n===Bu&&(this.log_("got pong on secondary."),this.secondaryResponsesRequired_--,this.upgradeIfSecondaryHealthy_())}}onSecondaryMessageReceived_(e){const n=hr("t",e),r=hr("d",e);if(n==="c")this.onSecondaryControl_(r);else if(n==="d")this.pendingDataMessages.push(r);else throw new Error("Unknown protocol layer: "+n)}upgradeIfSecondaryHealthy_(){this.secondaryResponsesRequired_<=0?(this.log_("Secondary connection is healthy."),this.isHealthy_=!0,this.secondaryConn_.markConnectionHealthy(),this.proceedWithUpgrade_()):(this.log_("sending ping on secondary."),this.secondaryConn_.send({t:"c",d:{t:ju,d:{}}}))}proceedWithUpgrade_(){this.secondaryConn_.start(),this.log_("sending client ack on secondary"),this.secondaryConn_.send({t:"c",d:{t:Hu,d:{}}}),this.log_("Ending transmission on primary"),this.conn_.send({t:"c",d:{t:Wu,d:{}}}),this.tx_=this.secondaryConn_,this.tryCleanupConnection()}onPrimaryMessageReceived_(e){const n=hr("t",e),r=hr("d",e);n==="c"?this.onControl_(r):n==="d"&&this.onDataMessage_(r)}onDataMessage_(e){this.onPrimaryResponse_(),this.onMessage_(e)}onPrimaryResponse_(){this.isHealthy_||(this.primaryResponsesRequired_--,this.primaryResponsesRequired_<=0&&(this.log_("Primary connection is healthy."),this.isHealthy_=!0,this.conn_.markConnectionHealthy()))}onControl_(e){const n=hr(Eo,e);if(Uu in e){const r=e[Uu];if(n===ES){const i={...r};this.repoInfo_.isUsingEmulator&&(i.h=this.repoInfo_.host),this.onHandshake_(i)}else if(n===Wu){this.log_("recvd end transmission on primary"),this.rx_=this.secondaryConn_;for(let i=0;i<this.pendingDataMessages.length;++i)this.onDataMessage_(this.pendingDataMessages[i]);this.pendingDataMessages=[],this.tryCleanupConnection()}else n===_S?this.onConnectionShutdown_(r):n===$u?this.onReset_(r):n===yS?na("Server Error: "+r):n===Bu?(this.log_("got pong on primary."),this.onPrimaryResponse_(),this.sendPingOnPrimaryIfNecessary_()):na("Unknown control packet command: "+n)}}onHandshake_(e){const n=e.ts,r=e.v,i=e.h;this.sessionId=e.s,this.repoInfo_.host=i,this.state_===0&&(this.conn_.start(),this.onConnectionEstablished_(this.conn_,n),rc!==r&&ge("Protocol version mismatch detected"),this.tryStartUpgrade_())}tryStartUpgrade_(){const e=this.transportManager_.upgradeTransport();e&&this.startUpgrade_(e)}startUpgrade_(e){this.secondaryConn_=new e(this.nextTransportId_(),this.repoInfo_,this.applicationId_,this.appCheckToken_,this.authToken_,this.sessionId),this.secondaryResponsesRequired_=e.responsesRequiredToBeHealthy||0;const n=this.connReceiver_(this.secondaryConn_),r=this.disconnReceiver_(this.secondaryConn_);this.secondaryConn_.open(n,r),Cr(()=>{this.secondaryConn_&&(this.log_("Timed out trying to upgrade."),this.secondaryConn_.close())},Math.floor(fS))}onReset_(e){this.log_("Reset packet received.  New host: "+e),this.repoInfo_.host=e,this.state_===1?this.close():(this.closeConnections_(),this.start_())}onConnectionEstablished_(e,n){this.log_("Realtime connection established."),this.conn_=e,this.state_=1,this.onReady_&&(this.onReady_(n,this.sessionId),this.onReady_=null),this.primaryResponsesRequired_===0?(this.log_("Primary connection is healthy."),this.isHealthy_=!0):Cr(()=>{this.sendPingOnPrimaryIfNecessary_()},Math.floor(pS))}sendPingOnPrimaryIfNecessary_(){!this.isHealthy_&&this.state_===1&&(this.log_("sending ping on primary."),this.sendData_({t:"c",d:{t:ju,d:{}}}))}onSecondaryConnectionLost_(){const e=this.secondaryConn_;this.secondaryConn_=null,(this.tx_===e||this.rx_===e)&&this.close()}onConnectionLost_(e){this.conn_=null,!e&&this.state_===0?(this.log_("Realtime connection failed."),this.repoInfo_.isCacheableHost()&&(Zt.remove("host:"+this.repoInfo_.host),this.repoInfo_.internalHost=this.repoInfo_.host)):this.state_===1&&this.log_("Realtime connection lost."),this.close()}onConnectionShutdown_(e){this.log_("Connection shutdown command received. Shutting down..."),this.onKill_&&(this.onKill_(e),this.onKill_=null),this.onDisconnect_=null,this.close()}sendData_(e){if(this.state_!==1)throw"Connection is not connected";this.tx_.send(e)}close(){this.state_!==2&&(this.log_("Closing realtime connection."),this.state_=2,this.closeConnections_(),this.onDisconnect_&&(this.onDisconnect_(),this.onDisconnect_=null))}closeConnections_(){this.log_("Shutting down all connections"),this.conn_&&(this.conn_.close(),this.conn_=null),this.secondaryConn_&&(this.secondaryConn_.close(),this.secondaryConn_=null),this.healthyTimeout_&&(clearTimeout(this.healthyTimeout_),this.healthyTimeout_=null)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Nf{put(e,n,r,i){}merge(e,n,r,i){}refreshAuthToken(e){}refreshAppCheckToken(e){}onDisconnectPut(e,n,r){}onDisconnectMerge(e,n,r){}onDisconnectCancel(e,n){}reportStats(e){}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Pf{constructor(e){this.allowedEvents_=e,this.listeners_={},g(Array.isArray(e)&&e.length>0,"Requires a non-empty array")}trigger(e,...n){if(Array.isArray(this.listeners_[e])){const r=[...this.listeners_[e]];for(let i=0;i<r.length;i++)r[i].callback.apply(r[i].context,n)}}on(e,n,r){this.validateEventType_(e),this.listeners_[e]=this.listeners_[e]||[],this.listeners_[e].push({callback:n,context:r});const i=this.getInitialEvent(e);i&&n.apply(r,i)}off(e,n,r){this.validateEventType_(e);const i=this.listeners_[e]||[];for(let s=0;s<i.length;s++)if(i[s].callback===n&&(!r||r===i[s].context)){i.splice(s,1);return}}validateEventType_(e){g(this.allowedEvents_.find(n=>n===e),"Unknown event: "+e)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ji extends Pf{static getInstance(){return new Ji}constructor(){super(["online"]),this.online_=!0,typeof window<"u"&&typeof window.addEventListener<"u"&&!Xa()&&(window.addEventListener("online",()=>{this.online_||(this.online_=!0,this.trigger("online",!0))},!1),window.addEventListener("offline",()=>{this.online_&&(this.online_=!1,this.trigger("online",!1))},!1))}getInitialEvent(e){return g(e==="online","Unknown event type: "+e),[this.online_]}currentlyOnline(){return this.online_}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Vu=32,zu=768;class D{constructor(e,n){if(n===void 0){this.pieces_=e.split("/");let r=0;for(let i=0;i<this.pieces_.length;i++)this.pieces_[i].length>0&&(this.pieces_[r]=this.pieces_[i],r++);this.pieces_.length=r,this.pieceNum_=0}else this.pieces_=e,this.pieceNum_=n}toString(){let e="";for(let n=this.pieceNum_;n<this.pieces_.length;n++)this.pieces_[n]!==""&&(e+="/"+this.pieces_[n]);return e||"/"}}function P(){return new D("")}function T(t){return t.pieceNum_>=t.pieces_.length?null:t.pieces_[t.pieceNum_]}function $t(t){return t.pieces_.length-t.pieceNum_}function F(t){let e=t.pieceNum_;return e<t.pieces_.length&&e++,new D(t.pieces_,e)}function oc(t){return t.pieceNum_<t.pieces_.length?t.pieces_[t.pieces_.length-1]:null}function wS(t){let e="";for(let n=t.pieceNum_;n<t.pieces_.length;n++)t.pieces_[n]!==""&&(e+="/"+encodeURIComponent(String(t.pieces_[n])));return e||"/"}function Hr(t,e=0){return t.pieces_.slice(t.pieceNum_+e)}function Lf(t){if(t.pieceNum_>=t.pieces_.length)return null;const e=[];for(let n=t.pieceNum_;n<t.pieces_.length-1;n++)e.push(t.pieces_[n]);return new D(e,0)}function z(t,e){const n=[];for(let r=t.pieceNum_;r<t.pieces_.length;r++)n.push(t.pieces_[r]);if(e instanceof D)for(let r=e.pieceNum_;r<e.pieces_.length;r++)n.push(e.pieces_[r]);else{const r=e.split("/");for(let i=0;i<r.length;i++)r[i].length>0&&n.push(r[i])}return new D(n,0)}function k(t){return t.pieceNum_>=t.pieces_.length}function pe(t,e){const n=T(t),r=T(e);if(n===null)return e;if(n===r)return pe(F(t),F(e));throw new Error("INTERNAL ERROR: innerPath ("+e+") is not within outerPath ("+t+")")}function bS(t,e){const n=Hr(t,0),r=Hr(e,0);for(let i=0;i<n.length&&i<r.length;i++){const s=gn(n[i],r[i]);if(s!==0)return s}return n.length===r.length?0:n.length<r.length?-1:1}function ac(t,e){if($t(t)!==$t(e))return!1;for(let n=t.pieceNum_,r=e.pieceNum_;n<=t.pieces_.length;n++,r++)if(t.pieces_[n]!==e.pieces_[r])return!1;return!0}function ke(t,e){let n=t.pieceNum_,r=e.pieceNum_;if($t(t)>$t(e))return!1;for(;n<t.pieces_.length;){if(t.pieces_[n]!==e.pieces_[r])return!1;++n,++r}return!0}class SS{constructor(e,n){this.errorPrefix_=n,this.parts_=Hr(e,0),this.byteLength_=Math.max(1,this.parts_.length);for(let r=0;r<this.parts_.length;r++)this.byteLength_+=Ns(this.parts_[r]);Of(this)}}function CS(t,e){t.parts_.length>0&&(t.byteLength_+=1),t.parts_.push(e),t.byteLength_+=Ns(e),Of(t)}function TS(t){const e=t.parts_.pop();t.byteLength_-=Ns(e),t.parts_.length>0&&(t.byteLength_-=1)}function Of(t){if(t.byteLength_>zu)throw new Error(t.errorPrefix_+"has a key path longer than "+zu+" bytes ("+t.byteLength_+").");if(t.parts_.length>Vu)throw new Error(t.errorPrefix_+"path specified exceeds the maximum depth that can be written ("+Vu+") or object contains a cycle "+Jt(t))}function Jt(t){return t.parts_.length===0?"":"in property '"+t.parts_.join(".")+"'"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class cc extends Pf{static getInstance(){return new cc}constructor(){super(["visible"]);let e,n;typeof document<"u"&&typeof document.addEventListener<"u"&&(typeof document.hidden<"u"?(n="visibilitychange",e="hidden"):typeof document.mozHidden<"u"?(n="mozvisibilitychange",e="mozHidden"):typeof document.msHidden<"u"?(n="msvisibilitychange",e="msHidden"):typeof document.webkitHidden<"u"&&(n="webkitvisibilitychange",e="webkitHidden")),this.visible_=!0,n&&document.addEventListener(n,()=>{const r=!document[e];r!==this.visible_&&(this.visible_=r,this.trigger("visible",r))},!1)}getInitialEvent(e){return g(e==="visible","Unknown event type: "+e),[this.visible_]}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const fr=1e3,IS=300*1e3,Gu=30*1e3,kS=1.3,RS=3e4,AS="server_kill",qu=3;class lt extends Nf{constructor(e,n,r,i,s,o,a,c){if(super(),this.repoInfo_=e,this.applicationId_=n,this.onDataUpdate_=r,this.onConnectStatus_=i,this.onServerInfoUpdate_=s,this.authTokenProvider_=o,this.appCheckTokenProvider_=a,this.authOverride_=c,this.id=lt.nextPersistentConnectionId_++,this.log_=si("p:"+this.id+":"),this.interruptReasons_={},this.listens=new Map,this.outstandingPuts_=[],this.outstandingGets_=[],this.outstandingPutCount_=0,this.outstandingGetCount_=0,this.onDisconnectRequestQueue_=[],this.connected_=!1,this.reconnectDelay_=fr,this.maxReconnectDelay_=IS,this.securityDebugCallback_=null,this.lastSessionId=null,this.establishConnectionTimer_=null,this.visible_=!1,this.requestCBHash_={},this.requestNumber_=0,this.realtime_=null,this.authToken_=null,this.appCheckToken_=null,this.forceTokenRefresh_=!1,this.invalidAuthTokenCount_=0,this.invalidAppCheckTokenCount_=0,this.firstConnection_=!0,this.lastConnectionAttemptTime_=null,this.lastConnectionEstablishedTime_=null,c)throw new Error("Auth override specified in options, but not supported on non Node.js platforms");cc.getInstance().on("visible",this.onVisible_,this),e.host.indexOf("fblocal")===-1&&Ji.getInstance().on("online",this.onOnline_,this)}sendRequest(e,n,r){const i=++this.requestNumber_,s={r:i,a:e,b:n};this.log_(X(s)),g(this.connected_,"sendRequest call when we're not connected not allowed."),this.realtime_.sendRequest(s),r&&(this.requestCBHash_[i]=r)}get(e){this.initConnection_();const n=new dt,i={action:"g",request:{p:e._path.toString(),q:e._queryObject},onComplete:o=>{const a=o.d;o.s==="ok"?n.resolve(a):n.reject(a)}};this.outstandingGets_.push(i),this.outstandingGetCount_++;const s=this.outstandingGets_.length-1;return this.connected_&&this.sendGet_(s),n.promise}listen(e,n,r,i){this.initConnection_();const s=e._queryIdentifier,o=e._path.toString();this.log_("Listen called for "+o+" "+s),this.listens.has(o)||this.listens.set(o,new Map),g(e._queryParams.isDefault()||!e._queryParams.loadsAllData(),"listen() called for non-default but complete query"),g(!this.listens.get(o).has(s),"listen() called twice for same path/queryId.");const a={onComplete:i,hashFn:n,query:e,tag:r};this.listens.get(o).set(s,a),this.connected_&&this.sendListen_(a)}sendGet_(e){const n=this.outstandingGets_[e];this.sendRequest("g",n.request,r=>{delete this.outstandingGets_[e],this.outstandingGetCount_--,this.outstandingGetCount_===0&&(this.outstandingGets_=[]),n.onComplete&&n.onComplete(r)})}sendListen_(e){const n=e.query,r=n._path.toString(),i=n._queryIdentifier;this.log_("Listen on "+r+" for "+i);const s={p:r},o="q";e.tag&&(s.q=n._queryObject,s.t=e.tag),s.h=e.hashFn(),this.sendRequest(o,s,a=>{const c=a.d,l=a.s;lt.warnOnListenWarnings_(c,n),(this.listens.get(r)&&this.listens.get(r).get(i))===e&&(this.log_("listen response",a),l!=="ok"&&this.removeListen_(r,i),e.onComplete&&e.onComplete(l,c))})}static warnOnListenWarnings_(e,n){if(e&&typeof e=="object"&&Xe(e,"w")){const r=Fn(e,"w");if(Array.isArray(r)&&~r.indexOf("no_index")){const i='".indexOn": "'+n._queryParams.getIndex().toString()+'"',s=n._path.toString();ge(`Using an unspecified index. Your data will be downloaded and filtered on the client. Consider adding ${i} at ${s} to your security rules for better performance.`)}}}refreshAuthToken(e){this.authToken_=e,this.log_("Auth token refreshed"),this.authToken_?this.tryAuth():this.connected_&&this.sendRequest("unauth",{},()=>{}),this.reduceReconnectDelayIfAdminCredential_(e)}reduceReconnectDelayIfAdminCredential_(e){(e&&e.length===40||fw(e))&&(this.log_("Admin auth credential detected.  Reducing max reconnect time."),this.maxReconnectDelay_=Gu)}refreshAppCheckToken(e){this.appCheckToken_=e,this.log_("App check token refreshed"),this.appCheckToken_?this.tryAppCheck():this.connected_&&this.sendRequest("unappeck",{},()=>{})}tryAuth(){if(this.connected_&&this.authToken_){const e=this.authToken_,n=hw(e)?"auth":"gauth",r={cred:e};this.authOverride_===null?r.noauth=!0:typeof this.authOverride_=="object"&&(r.authvar=this.authOverride_),this.sendRequest(n,r,i=>{const s=i.s,o=i.d||"error";this.authToken_===e&&(s==="ok"?this.invalidAuthTokenCount_=0:this.onAuthRevoked_(s,o))})}}tryAppCheck(){this.connected_&&this.appCheckToken_&&this.sendRequest("appcheck",{token:this.appCheckToken_},e=>{const n=e.s,r=e.d||"error";n==="ok"?this.invalidAppCheckTokenCount_=0:this.onAppCheckRevoked_(n,r)})}unlisten(e,n){const r=e._path.toString(),i=e._queryIdentifier;this.log_("Unlisten called for "+r+" "+i),g(e._queryParams.isDefault()||!e._queryParams.loadsAllData(),"unlisten() called for non-default but complete query"),this.removeListen_(r,i)&&this.connected_&&this.sendUnlisten_(r,i,e._queryObject,n)}sendUnlisten_(e,n,r,i){this.log_("Unlisten on "+e+" for "+n);const s={p:e},o="n";i&&(s.q=r,s.t=i),this.sendRequest(o,s)}onDisconnectPut(e,n,r){this.initConnection_(),this.connected_?this.sendOnDisconnect_("o",e,n,r):this.onDisconnectRequestQueue_.push({pathString:e,action:"o",data:n,onComplete:r})}onDisconnectMerge(e,n,r){this.initConnection_(),this.connected_?this.sendOnDisconnect_("om",e,n,r):this.onDisconnectRequestQueue_.push({pathString:e,action:"om",data:n,onComplete:r})}onDisconnectCancel(e,n){this.initConnection_(),this.connected_?this.sendOnDisconnect_("oc",e,null,n):this.onDisconnectRequestQueue_.push({pathString:e,action:"oc",data:null,onComplete:n})}sendOnDisconnect_(e,n,r,i){const s={p:n,d:r};this.log_("onDisconnect "+e,s),this.sendRequest(e,s,o=>{i&&setTimeout(()=>{i(o.s,o.d)},Math.floor(0))})}put(e,n,r,i){this.putInternal("p",e,n,r,i)}merge(e,n,r,i){this.putInternal("m",e,n,r,i)}putInternal(e,n,r,i,s){this.initConnection_();const o={p:n,d:r};s!==void 0&&(o.h=s),this.outstandingPuts_.push({action:e,request:o,onComplete:i}),this.outstandingPutCount_++;const a=this.outstandingPuts_.length-1;this.connected_?this.sendPut_(a):this.log_("Buffering put: "+n)}sendPut_(e){const n=this.outstandingPuts_[e].action,r=this.outstandingPuts_[e].request,i=this.outstandingPuts_[e].onComplete;this.outstandingPuts_[e].queued=this.connected_,this.sendRequest(n,r,s=>{this.log_(n+" response",s),delete this.outstandingPuts_[e],this.outstandingPutCount_--,this.outstandingPutCount_===0&&(this.outstandingPuts_=[]),i&&i(s.s,s.d)})}reportStats(e){if(this.connected_){const n={c:e};this.log_("reportStats",n),this.sendRequest("s",n,r=>{if(r.s!=="ok"){const s=r.d;this.log_("reportStats","Error sending stats: "+s)}})}}onDataMessage_(e){if("r"in e){this.log_("from server: "+X(e));const n=e.r,r=this.requestCBHash_[n];r&&(delete this.requestCBHash_[n],r(e.b))}else{if("error"in e)throw"A server-side error has occurred: "+e.error;"a"in e&&this.onDataPush_(e.a,e.b)}}onDataPush_(e,n){this.log_("handleServerMessage",e,n),e==="d"?this.onDataUpdate_(n.p,n.d,!1,n.t):e==="m"?this.onDataUpdate_(n.p,n.d,!0,n.t):e==="c"?this.onListenRevoked_(n.p,n.q):e==="ac"?this.onAuthRevoked_(n.s,n.d):e==="apc"?this.onAppCheckRevoked_(n.s,n.d):e==="sd"?this.onSecurityDebugPacket_(n):na("Unrecognized action received from server: "+X(e)+`
Are you using the latest client?`)}onReady_(e,n){this.log_("connection ready"),this.connected_=!0,this.lastConnectionEstablishedTime_=new Date().getTime(),this.handleTimestamp_(e),this.lastSessionId=n,this.firstConnection_&&this.sendConnectStats_(),this.restoreState_(),this.firstConnection_=!1,this.onConnectStatus_(!0)}scheduleConnect_(e){g(!this.realtime_,"Scheduling a connect when we're already connected/ing?"),this.establishConnectionTimer_&&clearTimeout(this.establishConnectionTimer_),this.establishConnectionTimer_=setTimeout(()=>{this.establishConnectionTimer_=null,this.establishConnection_()},Math.floor(e))}initConnection_(){!this.realtime_&&this.firstConnection_&&this.scheduleConnect_(0)}onVisible_(e){e&&!this.visible_&&this.reconnectDelay_===this.maxReconnectDelay_&&(this.log_("Window became visible.  Reducing delay."),this.reconnectDelay_=fr,this.realtime_||this.scheduleConnect_(0)),this.visible_=e}onOnline_(e){e?(this.log_("Browser went online."),this.reconnectDelay_=fr,this.realtime_||this.scheduleConnect_(0)):(this.log_("Browser went offline.  Killing connection."),this.realtime_&&this.realtime_.close())}onRealtimeDisconnect_(){if(this.log_("data client disconnected"),this.connected_=!1,this.realtime_=null,this.cancelSentTransactions_(),this.requestCBHash_={},this.shouldReconnect_()){this.visible_?this.lastConnectionEstablishedTime_&&(new Date().getTime()-this.lastConnectionEstablishedTime_>RS&&(this.reconnectDelay_=fr),this.lastConnectionEstablishedTime_=null):(this.log_("Window isn't visible.  Delaying reconnect."),this.reconnectDelay_=this.maxReconnectDelay_,this.lastConnectionAttemptTime_=new Date().getTime());const e=Math.max(0,new Date().getTime()-this.lastConnectionAttemptTime_);let n=Math.max(0,this.reconnectDelay_-e);n=Math.random()*n,this.log_("Trying to reconnect in "+n+"ms"),this.scheduleConnect_(n),this.reconnectDelay_=Math.min(this.maxReconnectDelay_,this.reconnectDelay_*kS)}this.onConnectStatus_(!1)}async establishConnection_(){if(this.shouldReconnect_()){this.log_("Making a connection attempt"),this.lastConnectionAttemptTime_=new Date().getTime(),this.lastConnectionEstablishedTime_=null;const e=this.onDataMessage_.bind(this),n=this.onReady_.bind(this),r=this.onRealtimeDisconnect_.bind(this),i=this.id+":"+lt.nextConnectionId_++,s=this.lastSessionId;let o=!1,a=null;const c=function(){a?a.close():(o=!0,r())},l=function(d){g(a,"sendRequest call when we're not connected not allowed."),a.sendRequest(d)};this.realtime_={close:c,sendRequest:l};const u=this.forceTokenRefresh_;this.forceTokenRefresh_=!1;try{const[d,h]=await Promise.all([this.authTokenProvider_.getToken(u),this.appCheckTokenProvider_.getToken(u)]);o?ie("getToken() completed but was canceled"):(ie("getToken() completed. Creating connection."),this.authToken_=d&&d.accessToken,this.appCheckToken_=h&&h.token,a=new vS(i,this.repoInfo_,this.applicationId_,this.appCheckToken_,this.authToken_,e,n,r,f=>{ge(f+" ("+this.repoInfo_.toString()+")"),this.interrupt(AS)},s))}catch(d){this.log_("Failed to get token: "+d),o||(this.repoInfo_.nodeAdmin&&ge(d),c())}}}interrupt(e){ie("Interrupting connection for reason: "+e),this.interruptReasons_[e]=!0,this.realtime_?this.realtime_.close():(this.establishConnectionTimer_&&(clearTimeout(this.establishConnectionTimer_),this.establishConnectionTimer_=null),this.connected_&&this.onRealtimeDisconnect_())}resume(e){ie("Resuming connection for reason: "+e),delete this.interruptReasons_[e],Jo(this.interruptReasons_)&&(this.reconnectDelay_=fr,this.realtime_||this.scheduleConnect_(0))}handleTimestamp_(e){const n=e-new Date().getTime();this.onServerInfoUpdate_({serverTimeOffset:n})}cancelSentTransactions_(){for(let e=0;e<this.outstandingPuts_.length;e++){const n=this.outstandingPuts_[e];n&&"h"in n.request&&n.queued&&(n.onComplete&&n.onComplete("disconnect"),delete this.outstandingPuts_[e],this.outstandingPutCount_--)}this.outstandingPutCount_===0&&(this.outstandingPuts_=[])}onListenRevoked_(e,n){let r;n?r=n.map(s=>nc(s)).join("$"):r="default";const i=this.removeListen_(e,r);i&&i.onComplete&&i.onComplete("permission_denied")}removeListen_(e,n){const r=new D(e).toString();let i;if(this.listens.has(r)){const s=this.listens.get(r);i=s.get(n),s.delete(n),s.size===0&&this.listens.delete(r)}else i=void 0;return i}onAuthRevoked_(e,n){ie("Auth token revoked: "+e+"/"+n),this.authToken_=null,this.forceTokenRefresh_=!0,this.realtime_.close(),(e==="invalid_token"||e==="permission_denied")&&(this.invalidAuthTokenCount_++,this.invalidAuthTokenCount_>=qu&&(this.reconnectDelay_=Gu,this.authTokenProvider_.notifyForInvalidToken()))}onAppCheckRevoked_(e,n){ie("App check token revoked: "+e+"/"+n),this.appCheckToken_=null,this.forceTokenRefresh_=!0,(e==="invalid_token"||e==="permission_denied")&&(this.invalidAppCheckTokenCount_++,this.invalidAppCheckTokenCount_>=qu&&this.appCheckTokenProvider_.notifyForInvalidToken())}onSecurityDebugPacket_(e){this.securityDebugCallback_?this.securityDebugCallback_(e):"msg"in e&&console.log("FIREBASE: "+e.msg.replace(`
`,`
FIREBASE: `))}restoreState_(){this.tryAuth(),this.tryAppCheck();for(const e of this.listens.values())for(const n of e.values())this.sendListen_(n);for(let e=0;e<this.outstandingPuts_.length;e++)this.outstandingPuts_[e]&&this.sendPut_(e);for(;this.onDisconnectRequestQueue_.length;){const e=this.onDisconnectRequestQueue_.shift();this.sendOnDisconnect_(e.action,e.pathString,e.data,e.onComplete)}for(let e=0;e<this.outstandingGets_.length;e++)this.outstandingGets_[e]&&this.sendGet_(e)}sendConnectStats_(){const e={};let n="js";e["sdk."+n+"."+lf.replace(/\./g,"-")]=1,Xa()?e["framework.cordova"]=1:tf()&&(e["framework.reactnative"]=1),this.reportStats(e)}shouldReconnect_(){const e=Ji.getInstance().currentlyOnline();return Jo(this.interruptReasons_)&&e}}lt.nextPersistentConnectionId_=0;lt.nextConnectionId_=0;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class I{constructor(e,n){this.name=e,this.node=n}static Wrap(e,n){return new I(e,n)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ls{getCompare(){return this.compare.bind(this)}indexedValueChanged(e,n){const r=new I(Un,e),i=new I(Un,n);return this.compare(r,i)!==0}minPost(){return I.MIN}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let vi;class Df extends Ls{static get __EMPTY_NODE(){return vi}static set __EMPTY_NODE(e){vi=e}compare(e,n){return gn(e.name,n.name)}isDefinedOn(e){throw Qn("KeyIndex.isDefinedOn not expected to be called.")}indexedValueChanged(e,n){return!1}minPost(){return I.MIN}maxPost(){return new I(ln,vi)}makePost(e,n){return g(typeof e=="string","KeyIndex indexValue must always be a string."),new I(e,vi)}toString(){return".key"}}const Cn=new Df;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class wi{constructor(e,n,r,i,s=null){this.isReverse_=i,this.resultGenerator_=s,this.nodeStack_=[];let o=1;for(;!e.isEmpty();)if(e=e,o=n?r(e.key,n):1,i&&(o*=-1),o<0)this.isReverse_?e=e.left:e=e.right;else if(o===0){this.nodeStack_.push(e);break}else this.nodeStack_.push(e),this.isReverse_?e=e.right:e=e.left}getNext(){if(this.nodeStack_.length===0)return null;let e=this.nodeStack_.pop(),n;if(this.resultGenerator_?n=this.resultGenerator_(e.key,e.value):n={key:e.key,value:e.value},this.isReverse_)for(e=e.left;!e.isEmpty();)this.nodeStack_.push(e),e=e.right;else for(e=e.right;!e.isEmpty();)this.nodeStack_.push(e),e=e.left;return n}hasNext(){return this.nodeStack_.length>0}peek(){if(this.nodeStack_.length===0)return null;const e=this.nodeStack_[this.nodeStack_.length-1];return this.resultGenerator_?this.resultGenerator_(e.key,e.value):{key:e.key,value:e.value}}}class ee{constructor(e,n,r,i,s){this.key=e,this.value=n,this.color=r??ee.RED,this.left=i??Ee.EMPTY_NODE,this.right=s??Ee.EMPTY_NODE}copy(e,n,r,i,s){return new ee(e??this.key,n??this.value,r??this.color,i??this.left,s??this.right)}count(){return this.left.count()+1+this.right.count()}isEmpty(){return!1}inorderTraversal(e){return this.left.inorderTraversal(e)||!!e(this.key,this.value)||this.right.inorderTraversal(e)}reverseTraversal(e){return this.right.reverseTraversal(e)||e(this.key,this.value)||this.left.reverseTraversal(e)}min_(){return this.left.isEmpty()?this:this.left.min_()}minKey(){return this.min_().key}maxKey(){return this.right.isEmpty()?this.key:this.right.maxKey()}insert(e,n,r){let i=this;const s=r(e,i.key);return s<0?i=i.copy(null,null,null,i.left.insert(e,n,r),null):s===0?i=i.copy(null,n,null,null,null):i=i.copy(null,null,null,null,i.right.insert(e,n,r)),i.fixUp_()}removeMin_(){if(this.left.isEmpty())return Ee.EMPTY_NODE;let e=this;return!e.left.isRed_()&&!e.left.left.isRed_()&&(e=e.moveRedLeft_()),e=e.copy(null,null,null,e.left.removeMin_(),null),e.fixUp_()}remove(e,n){let r,i;if(r=this,n(e,r.key)<0)!r.left.isEmpty()&&!r.left.isRed_()&&!r.left.left.isRed_()&&(r=r.moveRedLeft_()),r=r.copy(null,null,null,r.left.remove(e,n),null);else{if(r.left.isRed_()&&(r=r.rotateRight_()),!r.right.isEmpty()&&!r.right.isRed_()&&!r.right.left.isRed_()&&(r=r.moveRedRight_()),n(e,r.key)===0){if(r.right.isEmpty())return Ee.EMPTY_NODE;i=r.right.min_(),r=r.copy(i.key,i.value,null,null,r.right.removeMin_())}r=r.copy(null,null,null,null,r.right.remove(e,n))}return r.fixUp_()}isRed_(){return this.color}fixUp_(){let e=this;return e.right.isRed_()&&!e.left.isRed_()&&(e=e.rotateLeft_()),e.left.isRed_()&&e.left.left.isRed_()&&(e=e.rotateRight_()),e.left.isRed_()&&e.right.isRed_()&&(e=e.colorFlip_()),e}moveRedLeft_(){let e=this.colorFlip_();return e.right.left.isRed_()&&(e=e.copy(null,null,null,null,e.right.rotateRight_()),e=e.rotateLeft_(),e=e.colorFlip_()),e}moveRedRight_(){let e=this.colorFlip_();return e.left.left.isRed_()&&(e=e.rotateRight_(),e=e.colorFlip_()),e}rotateLeft_(){const e=this.copy(null,null,ee.RED,null,this.right.left);return this.right.copy(null,null,this.color,e,null)}rotateRight_(){const e=this.copy(null,null,ee.RED,this.left.right,null);return this.left.copy(null,null,this.color,null,e)}colorFlip_(){const e=this.left.copy(null,null,!this.left.color,null,null),n=this.right.copy(null,null,!this.right.color,null,null);return this.copy(null,null,!this.color,e,n)}checkMaxDepth_(){const e=this.check_();return Math.pow(2,e)<=this.count()+1}check_(){if(this.isRed_()&&this.left.isRed_())throw new Error("Red node has red child("+this.key+","+this.value+")");if(this.right.isRed_())throw new Error("Right child of ("+this.key+","+this.value+") is red");const e=this.left.check_();if(e!==this.right.check_())throw new Error("Black depths differ");return e+(this.isRed_()?0:1)}}ee.RED=!0;ee.BLACK=!1;class NS{copy(e,n,r,i,s){return this}insert(e,n,r){return new ee(e,n,null)}remove(e,n){return this}count(){return 0}isEmpty(){return!0}inorderTraversal(e){return!1}reverseTraversal(e){return!1}minKey(){return null}maxKey(){return null}check_(){return 0}isRed_(){return!1}}class Ee{constructor(e,n=Ee.EMPTY_NODE){this.comparator_=e,this.root_=n}insert(e,n){return new Ee(this.comparator_,this.root_.insert(e,n,this.comparator_).copy(null,null,ee.BLACK,null,null))}remove(e){return new Ee(this.comparator_,this.root_.remove(e,this.comparator_).copy(null,null,ee.BLACK,null,null))}get(e){let n,r=this.root_;for(;!r.isEmpty();){if(n=this.comparator_(e,r.key),n===0)return r.value;n<0?r=r.left:n>0&&(r=r.right)}return null}getPredecessorKey(e){let n,r=this.root_,i=null;for(;!r.isEmpty();)if(n=this.comparator_(e,r.key),n===0){if(r.left.isEmpty())return i?i.key:null;for(r=r.left;!r.right.isEmpty();)r=r.right;return r.key}else n<0?r=r.left:n>0&&(i=r,r=r.right);throw new Error("Attempted to find predecessor key for a nonexistent key.  What gives?")}isEmpty(){return this.root_.isEmpty()}count(){return this.root_.count()}minKey(){return this.root_.minKey()}maxKey(){return this.root_.maxKey()}inorderTraversal(e){return this.root_.inorderTraversal(e)}reverseTraversal(e){return this.root_.reverseTraversal(e)}getIterator(e){return new wi(this.root_,null,this.comparator_,!1,e)}getIteratorFrom(e,n){return new wi(this.root_,e,this.comparator_,!1,n)}getReverseIteratorFrom(e,n){return new wi(this.root_,e,this.comparator_,!0,n)}getReverseIterator(e){return new wi(this.root_,null,this.comparator_,!0,e)}}Ee.EMPTY_NODE=new NS;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function PS(t,e){return gn(t.name,e.name)}function lc(t,e){return gn(t,e)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let ia;function LS(t){ia=t}const Mf=function(t){return typeof t=="number"?"number:"+ff(t):"string:"+t},xf=function(t){if(t.isLeafNode()){const e=t.val();g(typeof e=="string"||typeof e=="number"||typeof e=="object"&&Xe(e,".sv"),"Priority must be a string or number.")}else g(t===ia||t.isEmpty(),"priority of unexpected type.");g(t===ia||t.getPriority().isEmpty(),"Priority nodes can't have a priority of their own.")};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Yu;class Z{static set __childrenNodeConstructor(e){Yu=e}static get __childrenNodeConstructor(){return Yu}constructor(e,n=Z.__childrenNodeConstructor.EMPTY_NODE){this.value_=e,this.priorityNode_=n,this.lazyHash_=null,g(this.value_!==void 0&&this.value_!==null,"LeafNode shouldn't be created with null/undefined value."),xf(this.priorityNode_)}isLeafNode(){return!0}getPriority(){return this.priorityNode_}updatePriority(e){return new Z(this.value_,e)}getImmediateChild(e){return e===".priority"?this.priorityNode_:Z.__childrenNodeConstructor.EMPTY_NODE}getChild(e){return k(e)?this:T(e)===".priority"?this.priorityNode_:Z.__childrenNodeConstructor.EMPTY_NODE}hasChild(){return!1}getPredecessorChildName(e,n){return null}updateImmediateChild(e,n){return e===".priority"?this.updatePriority(n):n.isEmpty()&&e!==".priority"?this:Z.__childrenNodeConstructor.EMPTY_NODE.updateImmediateChild(e,n).updatePriority(this.priorityNode_)}updateChild(e,n){const r=T(e);return r===null?n:n.isEmpty()&&r!==".priority"?this:(g(r!==".priority"||$t(e)===1,".priority must be the last token in a path"),this.updateImmediateChild(r,Z.__childrenNodeConstructor.EMPTY_NODE.updateChild(F(e),n)))}isEmpty(){return!1}numChildren(){return 0}forEachChild(e,n){return!1}val(e){return e&&!this.getPriority().isEmpty()?{".value":this.getValue(),".priority":this.getPriority().val()}:this.getValue()}hash(){if(this.lazyHash_===null){let e="";this.priorityNode_.isEmpty()||(e+="priority:"+Mf(this.priorityNode_.val())+":");const n=typeof this.value_;e+=n+":",n==="number"?e+=ff(this.value_):e+=this.value_,this.lazyHash_=df(e)}return this.lazyHash_}getValue(){return this.value_}compareTo(e){return e===Z.__childrenNodeConstructor.EMPTY_NODE?1:e instanceof Z.__childrenNodeConstructor?-1:(g(e.isLeafNode(),"Unknown node type"),this.compareToLeafNode_(e))}compareToLeafNode_(e){const n=typeof e.value_,r=typeof this.value_,i=Z.VALUE_TYPE_ORDER.indexOf(n),s=Z.VALUE_TYPE_ORDER.indexOf(r);return g(i>=0,"Unknown leaf type: "+n),g(s>=0,"Unknown leaf type: "+r),i===s?r==="object"?0:this.value_<e.value_?-1:this.value_===e.value_?0:1:s-i}withIndex(){return this}isIndexed(){return!0}equals(e){if(e===this)return!0;if(e.isLeafNode()){const n=e;return this.value_===n.value_&&this.priorityNode_.equals(n.priorityNode_)}else return!1}}Z.VALUE_TYPE_ORDER=["object","boolean","number","string"];/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Ff,Uf;function OS(t){Ff=t}function DS(t){Uf=t}class MS extends Ls{compare(e,n){const r=e.node.getPriority(),i=n.node.getPriority(),s=r.compareTo(i);return s===0?gn(e.name,n.name):s}isDefinedOn(e){return!e.getPriority().isEmpty()}indexedValueChanged(e,n){return!e.getPriority().equals(n.getPriority())}minPost(){return I.MIN}maxPost(){return new I(ln,new Z("[PRIORITY-POST]",Uf))}makePost(e,n){const r=Ff(e);return new I(n,new Z("[PRIORITY-POST]",r))}toString(){return".priority"}}const G=new MS;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const xS=Math.log(2);class FS{constructor(e){const n=s=>parseInt(Math.log(s)/xS,10),r=s=>parseInt(Array(s+1).join("1"),2);this.count=n(e+1),this.current_=this.count-1;const i=r(this.count);this.bits_=e+1&i}nextBitIsOne(){const e=!(this.bits_&1<<this.current_);return this.current_--,e}}const Xi=function(t,e,n,r){t.sort(e);const i=function(c,l){const u=l-c;let d,h;if(u===0)return null;if(u===1)return d=t[c],h=n?n(d):d,new ee(h,d.node,ee.BLACK,null,null);{const f=parseInt(u/2,10)+c,p=i(c,f),y=i(f+1,l);return d=t[f],h=n?n(d):d,new ee(h,d.node,ee.BLACK,p,y)}},s=function(c){let l=null,u=null,d=t.length;const h=function(p,y){const m=d-p,A=d;d-=p;const N=i(m+1,A),le=t[m],S=n?n(le):le;f(new ee(S,le.node,y,null,N))},f=function(p){l?(l.left=p,l=p):(u=p,l=p)};for(let p=0;p<c.count;++p){const y=c.nextBitIsOne(),m=Math.pow(2,c.count-(p+1));y?h(m,ee.BLACK):(h(m,ee.BLACK),h(m,ee.RED))}return u},o=new FS(t.length),a=s(o);return new Ee(r||e,a)};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let vo;const yn={};class rt{static get Default(){return g(yn&&G,"ChildrenNode.ts has not been loaded"),vo=vo||new rt({".priority":yn},{".priority":G}),vo}constructor(e,n){this.indexes_=e,this.indexSet_=n}get(e){const n=Fn(this.indexes_,e);if(!n)throw new Error("No index defined for "+e);return n instanceof Ee?n:null}hasIndex(e){return Xe(this.indexSet_,e.toString())}addIndex(e,n){g(e!==Cn,"KeyIndex always exists and isn't meant to be added to the IndexMap.");const r=[];let i=!1;const s=n.getIterator(I.Wrap);let o=s.getNext();for(;o;)i=i||e.isDefinedOn(o.node),r.push(o),o=s.getNext();let a;i?a=Xi(r,e.getCompare()):a=yn;const c=e.toString(),l={...this.indexSet_};l[c]=e;const u={...this.indexes_};return u[c]=a,new rt(u,l)}addToIndexes(e,n){const r=qi(this.indexes_,(i,s)=>{const o=Fn(this.indexSet_,s);if(g(o,"Missing index implementation for "+s),i===yn)if(o.isDefinedOn(e.node)){const a=[],c=n.getIterator(I.Wrap);let l=c.getNext();for(;l;)l.name!==e.name&&a.push(l),l=c.getNext();return a.push(e),Xi(a,o.getCompare())}else return yn;else{const a=n.get(e.name);let c=i;return a&&(c=c.remove(new I(e.name,a))),c.insert(e,e.node)}});return new rt(r,this.indexSet_)}removeFromIndexes(e,n){const r=qi(this.indexes_,i=>{if(i===yn)return i;{const s=n.get(e.name);return s?i.remove(new I(e.name,s)):i}});return new rt(r,this.indexSet_)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let pr;class v{static get EMPTY_NODE(){return pr||(pr=new v(new Ee(lc),null,rt.Default))}constructor(e,n,r){this.children_=e,this.priorityNode_=n,this.indexMap_=r,this.lazyHash_=null,this.priorityNode_&&xf(this.priorityNode_),this.children_.isEmpty()&&g(!this.priorityNode_||this.priorityNode_.isEmpty(),"An empty node cannot have a priority")}isLeafNode(){return!1}getPriority(){return this.priorityNode_||pr}updatePriority(e){return this.children_.isEmpty()?this:new v(this.children_,e,this.indexMap_)}getImmediateChild(e){if(e===".priority")return this.getPriority();{const n=this.children_.get(e);return n===null?pr:n}}getChild(e){const n=T(e);return n===null?this:this.getImmediateChild(n).getChild(F(e))}hasChild(e){return this.children_.get(e)!==null}updateImmediateChild(e,n){if(g(n,"We should always be passing snapshot nodes"),e===".priority")return this.updatePriority(n);{const r=new I(e,n);let i,s;n.isEmpty()?(i=this.children_.remove(e),s=this.indexMap_.removeFromIndexes(r,this.children_)):(i=this.children_.insert(e,n),s=this.indexMap_.addToIndexes(r,this.children_));const o=i.isEmpty()?pr:this.priorityNode_;return new v(i,o,s)}}updateChild(e,n){const r=T(e);if(r===null)return n;{g(T(e)!==".priority"||$t(e)===1,".priority must be the last token in a path");const i=this.getImmediateChild(r).updateChild(F(e),n);return this.updateImmediateChild(r,i)}}isEmpty(){return this.children_.isEmpty()}numChildren(){return this.children_.count()}val(e){if(this.isEmpty())return null;const n={};let r=0,i=0,s=!0;if(this.forEachChild(G,(o,a)=>{n[o]=a.val(e),r++,s&&v.INTEGER_REGEXP_.test(o)?i=Math.max(i,Number(o)):s=!1}),!e&&s&&i<2*r){const o=[];for(const a in n)o[a]=n[a];return o}else return e&&!this.getPriority().isEmpty()&&(n[".priority"]=this.getPriority().val()),n}hash(){if(this.lazyHash_===null){let e="";this.getPriority().isEmpty()||(e+="priority:"+Mf(this.getPriority().val())+":"),this.forEachChild(G,(n,r)=>{const i=r.hash();i!==""&&(e+=":"+n+":"+i)}),this.lazyHash_=e===""?"":df(e)}return this.lazyHash_}getPredecessorChildName(e,n,r){const i=this.resolveIndex_(r);if(i){const s=i.getPredecessorKey(new I(e,n));return s?s.name:null}else return this.children_.getPredecessorKey(e)}getFirstChildName(e){const n=this.resolveIndex_(e);if(n){const r=n.minKey();return r&&r.name}else return this.children_.minKey()}getFirstChild(e){const n=this.getFirstChildName(e);return n?new I(n,this.children_.get(n)):null}getLastChildName(e){const n=this.resolveIndex_(e);if(n){const r=n.maxKey();return r&&r.name}else return this.children_.maxKey()}getLastChild(e){const n=this.getLastChildName(e);return n?new I(n,this.children_.get(n)):null}forEachChild(e,n){const r=this.resolveIndex_(e);return r?r.inorderTraversal(i=>n(i.name,i.node)):this.children_.inorderTraversal(n)}getIterator(e){return this.getIteratorFrom(e.minPost(),e)}getIteratorFrom(e,n){const r=this.resolveIndex_(n);if(r)return r.getIteratorFrom(e,i=>i);{const i=this.children_.getIteratorFrom(e.name,I.Wrap);let s=i.peek();for(;s!=null&&n.compare(s,e)<0;)i.getNext(),s=i.peek();return i}}getReverseIterator(e){return this.getReverseIteratorFrom(e.maxPost(),e)}getReverseIteratorFrom(e,n){const r=this.resolveIndex_(n);if(r)return r.getReverseIteratorFrom(e,i=>i);{const i=this.children_.getReverseIteratorFrom(e.name,I.Wrap);let s=i.peek();for(;s!=null&&n.compare(s,e)>0;)i.getNext(),s=i.peek();return i}}compareTo(e){return this.isEmpty()?e.isEmpty()?0:-1:e.isLeafNode()||e.isEmpty()?1:e===oi?-1:0}withIndex(e){if(e===Cn||this.indexMap_.hasIndex(e))return this;{const n=this.indexMap_.addIndex(e,this.children_);return new v(this.children_,this.priorityNode_,n)}}isIndexed(e){return e===Cn||this.indexMap_.hasIndex(e)}equals(e){if(e===this)return!0;if(e.isLeafNode())return!1;{const n=e;if(this.getPriority().equals(n.getPriority()))if(this.children_.count()===n.children_.count()){const r=this.getIterator(G),i=n.getIterator(G);let s=r.getNext(),o=i.getNext();for(;s&&o;){if(s.name!==o.name||!s.node.equals(o.node))return!1;s=r.getNext(),o=i.getNext()}return s===null&&o===null}else return!1;else return!1}}resolveIndex_(e){return e===Cn?null:this.indexMap_.get(e.toString())}}v.INTEGER_REGEXP_=/^(0|[1-9]\d*)$/;class US extends v{constructor(){super(new Ee(lc),v.EMPTY_NODE,rt.Default)}compareTo(e){return e===this?0:1}equals(e){return e===this}getPriority(){return this}getImmediateChild(e){return v.EMPTY_NODE}isEmpty(){return!1}}const oi=new US;Object.defineProperties(I,{MIN:{value:new I(Un,v.EMPTY_NODE)},MAX:{value:new I(ln,oi)}});Df.__EMPTY_NODE=v.EMPTY_NODE;Z.__childrenNodeConstructor=v;LS(oi);DS(oi);/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const $S=!0;function J(t,e=null){if(t===null)return v.EMPTY_NODE;if(typeof t=="object"&&".priority"in t&&(e=t[".priority"]),g(e===null||typeof e=="string"||typeof e=="number"||typeof e=="object"&&".sv"in e,"Invalid priority type found: "+typeof e),typeof t=="object"&&".value"in t&&t[".value"]!==null&&(t=t[".value"]),typeof t!="object"||".sv"in t){const n=t;return new Z(n,J(e))}if(!(t instanceof Array)&&$S){const n=[];let r=!1;if(ae(t,(o,a)=>{if(o.substring(0,1)!=="."){const c=J(a);c.isEmpty()||(r=r||!c.getPriority().isEmpty(),n.push(new I(o,c)))}}),n.length===0)return v.EMPTY_NODE;const s=Xi(n,PS,o=>o.name,lc);if(r){const o=Xi(n,G.getCompare());return new v(s,J(e),new rt({".priority":o},{".priority":G}))}else return new v(s,J(e),rt.Default)}else{let n=v.EMPTY_NODE;return ae(t,(r,i)=>{if(Xe(t,r)&&r.substring(0,1)!=="."){const s=J(i);(s.isLeafNode()||!s.isEmpty())&&(n=n.updateImmediateChild(r,s))}}),n.updatePriority(J(e))}}OS(J);/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class BS extends Ls{constructor(e){super(),this.indexPath_=e,g(!k(e)&&T(e)!==".priority","Can't create PathIndex with empty path or .priority key")}extractChild(e){return e.getChild(this.indexPath_)}isDefinedOn(e){return!e.getChild(this.indexPath_).isEmpty()}compare(e,n){const r=this.extractChild(e.node),i=this.extractChild(n.node),s=r.compareTo(i);return s===0?gn(e.name,n.name):s}makePost(e,n){const r=J(e),i=v.EMPTY_NODE.updateChild(this.indexPath_,r);return new I(n,i)}maxPost(){const e=v.EMPTY_NODE.updateChild(this.indexPath_,oi);return new I(ln,e)}toString(){return Hr(this.indexPath_,0).join("/")}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class HS extends Ls{compare(e,n){const r=e.node.compareTo(n.node);return r===0?gn(e.name,n.name):r}isDefinedOn(e){return!0}indexedValueChanged(e,n){return!e.equals(n)}minPost(){return I.MIN}maxPost(){return I.MAX}makePost(e,n){const r=J(e);return new I(n,r)}toString(){return".value"}}const WS=new HS;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function $f(t){return{type:"value",snapshotNode:t}}function $n(t,e){return{type:"child_added",snapshotNode:e,childName:t}}function Wr(t,e){return{type:"child_removed",snapshotNode:e,childName:t}}function jr(t,e,n){return{type:"child_changed",snapshotNode:e,childName:t,oldSnap:n}}function jS(t,e){return{type:"child_moved",snapshotNode:e,childName:t}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class uc{constructor(e){this.index_=e}updateChild(e,n,r,i,s,o){g(e.isIndexed(this.index_),"A node must be indexed if only a child is updated");const a=e.getImmediateChild(n);return a.getChild(i).equals(r.getChild(i))&&a.isEmpty()===r.isEmpty()||(o!=null&&(r.isEmpty()?e.hasChild(n)?o.trackChildChange(Wr(n,a)):g(e.isLeafNode(),"A child remove without an old child only makes sense on a leaf node"):a.isEmpty()?o.trackChildChange($n(n,r)):o.trackChildChange(jr(n,r,a))),e.isLeafNode()&&r.isEmpty())?e:e.updateImmediateChild(n,r).withIndex(this.index_)}updateFullNode(e,n,r){return r!=null&&(e.isLeafNode()||e.forEachChild(G,(i,s)=>{n.hasChild(i)||r.trackChildChange(Wr(i,s))}),n.isLeafNode()||n.forEachChild(G,(i,s)=>{if(e.hasChild(i)){const o=e.getImmediateChild(i);o.equals(s)||r.trackChildChange(jr(i,s,o))}else r.trackChildChange($n(i,s))})),n.withIndex(this.index_)}updatePriority(e,n){return e.isEmpty()?v.EMPTY_NODE:e.updatePriority(n)}filtersNodes(){return!1}getIndexedFilter(){return this}getIndex(){return this.index_}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Vr{constructor(e){this.indexedFilter_=new uc(e.getIndex()),this.index_=e.getIndex(),this.startPost_=Vr.getStartPost_(e),this.endPost_=Vr.getEndPost_(e),this.startIsInclusive_=!e.startAfterSet_,this.endIsInclusive_=!e.endBeforeSet_}getStartPost(){return this.startPost_}getEndPost(){return this.endPost_}matches(e){const n=this.startIsInclusive_?this.index_.compare(this.getStartPost(),e)<=0:this.index_.compare(this.getStartPost(),e)<0,r=this.endIsInclusive_?this.index_.compare(e,this.getEndPost())<=0:this.index_.compare(e,this.getEndPost())<0;return n&&r}updateChild(e,n,r,i,s,o){return this.matches(new I(n,r))||(r=v.EMPTY_NODE),this.indexedFilter_.updateChild(e,n,r,i,s,o)}updateFullNode(e,n,r){n.isLeafNode()&&(n=v.EMPTY_NODE);let i=n.withIndex(this.index_);i=i.updatePriority(v.EMPTY_NODE);const s=this;return n.forEachChild(G,(o,a)=>{s.matches(new I(o,a))||(i=i.updateImmediateChild(o,v.EMPTY_NODE))}),this.indexedFilter_.updateFullNode(e,i,r)}updatePriority(e,n){return e}filtersNodes(){return!0}getIndexedFilter(){return this.indexedFilter_}getIndex(){return this.index_}static getStartPost_(e){if(e.hasStart()){const n=e.getIndexStartName();return e.getIndex().makePost(e.getIndexStartValue(),n)}else return e.getIndex().minPost()}static getEndPost_(e){if(e.hasEnd()){const n=e.getIndexEndName();return e.getIndex().makePost(e.getIndexEndValue(),n)}else return e.getIndex().maxPost()}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class VS{constructor(e){this.withinDirectionalStart=n=>this.reverse_?this.withinEndPost(n):this.withinStartPost(n),this.withinDirectionalEnd=n=>this.reverse_?this.withinStartPost(n):this.withinEndPost(n),this.withinStartPost=n=>{const r=this.index_.compare(this.rangedFilter_.getStartPost(),n);return this.startIsInclusive_?r<=0:r<0},this.withinEndPost=n=>{const r=this.index_.compare(n,this.rangedFilter_.getEndPost());return this.endIsInclusive_?r<=0:r<0},this.rangedFilter_=new Vr(e),this.index_=e.getIndex(),this.limit_=e.getLimit(),this.reverse_=!e.isViewFromLeft(),this.startIsInclusive_=!e.startAfterSet_,this.endIsInclusive_=!e.endBeforeSet_}updateChild(e,n,r,i,s,o){return this.rangedFilter_.matches(new I(n,r))||(r=v.EMPTY_NODE),e.getImmediateChild(n).equals(r)?e:e.numChildren()<this.limit_?this.rangedFilter_.getIndexedFilter().updateChild(e,n,r,i,s,o):this.fullLimitUpdateChild_(e,n,r,s,o)}updateFullNode(e,n,r){let i;if(n.isLeafNode()||n.isEmpty())i=v.EMPTY_NODE.withIndex(this.index_);else if(this.limit_*2<n.numChildren()&&n.isIndexed(this.index_)){i=v.EMPTY_NODE.withIndex(this.index_);let s;this.reverse_?s=n.getReverseIteratorFrom(this.rangedFilter_.getEndPost(),this.index_):s=n.getIteratorFrom(this.rangedFilter_.getStartPost(),this.index_);let o=0;for(;s.hasNext()&&o<this.limit_;){const a=s.getNext();if(this.withinDirectionalStart(a))if(this.withinDirectionalEnd(a))i=i.updateImmediateChild(a.name,a.node),o++;else break;else continue}}else{i=n.withIndex(this.index_),i=i.updatePriority(v.EMPTY_NODE);let s;this.reverse_?s=i.getReverseIterator(this.index_):s=i.getIterator(this.index_);let o=0;for(;s.hasNext();){const a=s.getNext();o<this.limit_&&this.withinDirectionalStart(a)&&this.withinDirectionalEnd(a)?o++:i=i.updateImmediateChild(a.name,v.EMPTY_NODE)}}return this.rangedFilter_.getIndexedFilter().updateFullNode(e,i,r)}updatePriority(e,n){return e}filtersNodes(){return!0}getIndexedFilter(){return this.rangedFilter_.getIndexedFilter()}getIndex(){return this.index_}fullLimitUpdateChild_(e,n,r,i,s){let o;if(this.reverse_){const d=this.index_.getCompare();o=(h,f)=>d(f,h)}else o=this.index_.getCompare();const a=e;g(a.numChildren()===this.limit_,"");const c=new I(n,r),l=this.reverse_?a.getFirstChild(this.index_):a.getLastChild(this.index_),u=this.rangedFilter_.matches(c);if(a.hasChild(n)){const d=a.getImmediateChild(n);let h=i.getChildAfterChild(this.index_,l,this.reverse_);for(;h!=null&&(h.name===n||a.hasChild(h.name));)h=i.getChildAfterChild(this.index_,h,this.reverse_);const f=h==null?1:o(h,c);if(u&&!r.isEmpty()&&f>=0)return s?.trackChildChange(jr(n,r,d)),a.updateImmediateChild(n,r);{s?.trackChildChange(Wr(n,d));const y=a.updateImmediateChild(n,v.EMPTY_NODE);return h!=null&&this.rangedFilter_.matches(h)?(s?.trackChildChange($n(h.name,h.node)),y.updateImmediateChild(h.name,h.node)):y}}else return r.isEmpty()?e:u&&o(l,c)>=0?(s!=null&&(s.trackChildChange(Wr(l.name,l.node)),s.trackChildChange($n(n,r))),a.updateImmediateChild(n,r).updateImmediateChild(l.name,v.EMPTY_NODE)):e}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class dc{constructor(){this.limitSet_=!1,this.startSet_=!1,this.startNameSet_=!1,this.startAfterSet_=!1,this.endSet_=!1,this.endNameSet_=!1,this.endBeforeSet_=!1,this.limit_=0,this.viewFrom_="",this.indexStartValue_=null,this.indexStartName_="",this.indexEndValue_=null,this.indexEndName_="",this.index_=G}hasStart(){return this.startSet_}isViewFromLeft(){return this.viewFrom_===""?this.startSet_:this.viewFrom_==="l"}getIndexStartValue(){return g(this.startSet_,"Only valid if start has been set"),this.indexStartValue_}getIndexStartName(){return g(this.startSet_,"Only valid if start has been set"),this.startNameSet_?this.indexStartName_:Un}hasEnd(){return this.endSet_}getIndexEndValue(){return g(this.endSet_,"Only valid if end has been set"),this.indexEndValue_}getIndexEndName(){return g(this.endSet_,"Only valid if end has been set"),this.endNameSet_?this.indexEndName_:ln}hasLimit(){return this.limitSet_}hasAnchoredLimit(){return this.limitSet_&&this.viewFrom_!==""}getLimit(){return g(this.limitSet_,"Only valid if limit has been set"),this.limit_}getIndex(){return this.index_}loadsAllData(){return!(this.startSet_||this.endSet_||this.limitSet_)}isDefault(){return this.loadsAllData()&&this.index_===G}copy(){const e=new dc;return e.limitSet_=this.limitSet_,e.limit_=this.limit_,e.startSet_=this.startSet_,e.startAfterSet_=this.startAfterSet_,e.indexStartValue_=this.indexStartValue_,e.startNameSet_=this.startNameSet_,e.indexStartName_=this.indexStartName_,e.endSet_=this.endSet_,e.endBeforeSet_=this.endBeforeSet_,e.indexEndValue_=this.indexEndValue_,e.endNameSet_=this.endNameSet_,e.indexEndName_=this.indexEndName_,e.index_=this.index_,e.viewFrom_=this.viewFrom_,e}}function zS(t){return t.loadsAllData()?new uc(t.getIndex()):t.hasLimit()?new VS(t):new Vr(t)}function Ku(t){const e={};if(t.isDefault())return e;let n;if(t.index_===G?n="$priority":t.index_===WS?n="$value":t.index_===Cn?n="$key":(g(t.index_ instanceof BS,"Unrecognized index type!"),n=t.index_.toString()),e.orderBy=X(n),t.startSet_){const r=t.startAfterSet_?"startAfter":"startAt";e[r]=X(t.indexStartValue_),t.startNameSet_&&(e[r]+=","+X(t.indexStartName_))}if(t.endSet_){const r=t.endBeforeSet_?"endBefore":"endAt";e[r]=X(t.indexEndValue_),t.endNameSet_&&(e[r]+=","+X(t.indexEndName_))}return t.limitSet_&&(t.isViewFromLeft()?e.limitToFirst=t.limit_:e.limitToLast=t.limit_),e}function Ju(t){const e={};if(t.startSet_&&(e.sp=t.indexStartValue_,t.startNameSet_&&(e.sn=t.indexStartName_),e.sin=!t.startAfterSet_),t.endSet_&&(e.ep=t.indexEndValue_,t.endNameSet_&&(e.en=t.indexEndName_),e.ein=!t.endBeforeSet_),t.limitSet_){e.l=t.limit_;let n=t.viewFrom_;n===""&&(t.isViewFromLeft()?n="l":n="r"),e.vf=n}return t.index_!==G&&(e.i=t.index_.toString()),e}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Qi extends Nf{reportStats(e){throw new Error("Method not implemented.")}static getListenId_(e,n){return n!==void 0?"tag$"+n:(g(e._queryParams.isDefault(),"should have a tag if it's not a default query."),e._path.toString())}constructor(e,n,r,i){super(),this.repoInfo_=e,this.onDataUpdate_=n,this.authTokenProvider_=r,this.appCheckTokenProvider_=i,this.log_=si("p:rest:"),this.listens_={}}listen(e,n,r,i){const s=e._path.toString();this.log_("Listen called for "+s+" "+e._queryIdentifier);const o=Qi.getListenId_(e,r),a={};this.listens_[o]=a;const c=Ku(e._queryParams);this.restRequest_(s+".json",c,(l,u)=>{let d=u;if(l===404&&(d=null,l=null),l===null&&this.onDataUpdate_(s,d,!1,r),Fn(this.listens_,o)===a){let h;l?l===401?h="permission_denied":h="rest_error:"+l:h="ok",i(h,null)}})}unlisten(e,n){const r=Qi.getListenId_(e,n);delete this.listens_[r]}get(e){const n=Ku(e._queryParams),r=e._path.toString(),i=new dt;return this.restRequest_(r+".json",n,(s,o)=>{let a=o;s===404&&(a=null,s=null),s===null?(this.onDataUpdate_(r,a,!1,null),i.resolve(a)):i.reject(new Error(a))}),i.promise}refreshAuthToken(e){}restRequest_(e,n={},r){return n.format="export",Promise.all([this.authTokenProvider_.getToken(!1),this.appCheckTokenProvider_.getToken(!1)]).then(([i,s])=>{i&&i.accessToken&&(n.auth=i.accessToken),s&&s.token&&(n.ac=s.token);const o=(this.repoInfo_.secure?"https://":"http://")+this.repoInfo_.host+e+"?ns="+this.repoInfo_.namespace+tr(n);this.log_("Sending REST request for "+o);const a=new XMLHttpRequest;a.onreadystatechange=()=>{if(r&&a.readyState===4){this.log_("REST Response for "+o+" received. status:",a.status,"response:",a.responseText);let c=null;if(a.status>=200&&a.status<300){try{c=Ur(a.responseText)}catch{ge("Failed to parse JSON response for "+o+": "+a.responseText)}r(null,c)}else a.status!==401&&a.status!==404&&ge("Got unsuccessful REST response for "+o+" Status: "+a.status),r(a.status);r=null}},a.open("GET",o,!0),a.send()})}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class GS{constructor(){this.rootNode_=v.EMPTY_NODE}getNode(e){return this.rootNode_.getChild(e)}updateSnapshot(e,n){this.rootNode_=this.rootNode_.updateChild(e,n)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Zi(){return{value:null,children:new Map}}function Bf(t,e,n){if(k(e))t.value=n,t.children.clear();else if(t.value!==null)t.value=t.value.updateChild(e,n);else{const r=T(e);t.children.has(r)||t.children.set(r,Zi());const i=t.children.get(r);e=F(e),Bf(i,e,n)}}function sa(t,e,n){t.value!==null?n(e,t.value):qS(t,(r,i)=>{const s=new D(e.toString()+"/"+r);sa(i,s,n)})}function qS(t,e){t.children.forEach((n,r)=>{e(r,n)})}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class YS{constructor(e){this.collection_=e,this.last_=null}get(){const e=this.collection_.get(),n={...e};return this.last_&&ae(this.last_,(r,i)=>{n[r]=n[r]-i}),this.last_=e,n}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Xu=10*1e3,KS=30*1e3,JS=300*1e3;class XS{constructor(e,n){this.server_=n,this.statsToReport_={},this.statsListener_=new YS(e);const r=Xu+(KS-Xu)*Math.random();Cr(this.reportStats_.bind(this),Math.floor(r))}reportStats_(){const e=this.statsListener_.get(),n={};let r=!1;ae(e,(i,s)=>{s>0&&Xe(this.statsToReport_,i)&&(n[i]=s,r=!0)}),r&&this.server_.reportStats(n),Cr(this.reportStats_.bind(this),Math.floor(Math.random()*2*JS))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var xe;(function(t){t[t.OVERWRITE=0]="OVERWRITE",t[t.MERGE=1]="MERGE",t[t.ACK_USER_WRITE=2]="ACK_USER_WRITE",t[t.LISTEN_COMPLETE=3]="LISTEN_COMPLETE"})(xe||(xe={}));function hc(){return{fromUser:!0,fromServer:!1,queryId:null,tagged:!1}}function fc(){return{fromUser:!1,fromServer:!0,queryId:null,tagged:!1}}function pc(t){return{fromUser:!1,fromServer:!0,queryId:t,tagged:!0}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class es{constructor(e,n,r){this.path=e,this.affectedTree=n,this.revert=r,this.type=xe.ACK_USER_WRITE,this.source=hc()}operationForChild(e){if(k(this.path)){if(this.affectedTree.value!=null)return g(this.affectedTree.children.isEmpty(),"affectedTree should not have overlapping affected paths."),this;{const n=this.affectedTree.subtree(new D(e));return new es(P(),n,this.revert)}}else return g(T(this.path)===e,"operationForChild called for unrelated child."),new es(F(this.path),this.affectedTree,this.revert)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class zr{constructor(e,n){this.source=e,this.path=n,this.type=xe.LISTEN_COMPLETE}operationForChild(e){return k(this.path)?new zr(this.source,P()):new zr(this.source,F(this.path))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class un{constructor(e,n,r){this.source=e,this.path=n,this.snap=r,this.type=xe.OVERWRITE}operationForChild(e){return k(this.path)?new un(this.source,P(),this.snap.getImmediateChild(e)):new un(this.source,F(this.path),this.snap)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Bn{constructor(e,n,r){this.source=e,this.path=n,this.children=r,this.type=xe.MERGE}operationForChild(e){if(k(this.path)){const n=this.children.subtree(new D(e));return n.isEmpty()?null:n.value?new un(this.source,P(),n.value):new Bn(this.source,P(),n)}else return g(T(this.path)===e,"Can't get a merge for a child not on the path of the operation"),new Bn(this.source,F(this.path),this.children)}toString(){return"Operation("+this.path+": "+this.source.toString()+" merge: "+this.children.toString()+")"}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Bt{constructor(e,n,r){this.node_=e,this.fullyInitialized_=n,this.filtered_=r}isFullyInitialized(){return this.fullyInitialized_}isFiltered(){return this.filtered_}isCompleteForPath(e){if(k(e))return this.isFullyInitialized()&&!this.filtered_;const n=T(e);return this.isCompleteForChild(n)}isCompleteForChild(e){return this.isFullyInitialized()&&!this.filtered_||this.node_.hasChild(e)}getNode(){return this.node_}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class QS{constructor(e){this.query_=e,this.index_=this.query_._queryParams.getIndex()}}function ZS(t,e,n,r){const i=[],s=[];return e.forEach(o=>{o.type==="child_changed"&&t.index_.indexedValueChanged(o.oldSnap,o.snapshotNode)&&s.push(jS(o.childName,o.snapshotNode))}),gr(t,i,"child_removed",e,r,n),gr(t,i,"child_added",e,r,n),gr(t,i,"child_moved",s,r,n),gr(t,i,"child_changed",e,r,n),gr(t,i,"value",e,r,n),i}function gr(t,e,n,r,i,s){const o=r.filter(a=>a.type===n);o.sort((a,c)=>tC(t,a,c)),o.forEach(a=>{const c=eC(t,a,s);i.forEach(l=>{l.respondsTo(a.type)&&e.push(l.createEvent(c,t.query_))})})}function eC(t,e,n){return e.type==="value"||e.type==="child_removed"||(e.prevName=n.getPredecessorChildName(e.childName,e.snapshotNode,t.index_)),e}function tC(t,e,n){if(e.childName==null||n.childName==null)throw Qn("Should only compare child_ events.");const r=new I(e.childName,e.snapshotNode),i=new I(n.childName,n.snapshotNode);return t.index_.compare(r,i)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Os(t,e){return{eventCache:t,serverCache:e}}function Tr(t,e,n,r){return Os(new Bt(e,n,r),t.serverCache)}function Hf(t,e,n,r){return Os(t.eventCache,new Bt(e,n,r))}function ts(t){return t.eventCache.isFullyInitialized()?t.eventCache.getNode():null}function dn(t){return t.serverCache.isFullyInitialized()?t.serverCache.getNode():null}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let wo;const nC=()=>(wo||(wo=new Ee(Bb)),wo);class M{static fromObject(e){let n=new M(null);return ae(e,(r,i)=>{n=n.set(new D(r),i)}),n}constructor(e,n=nC()){this.value=e,this.children=n}isEmpty(){return this.value===null&&this.children.isEmpty()}findRootMostMatchingPathAndValue(e,n){if(this.value!=null&&n(this.value))return{path:P(),value:this.value};if(k(e))return null;{const r=T(e),i=this.children.get(r);if(i!==null){const s=i.findRootMostMatchingPathAndValue(F(e),n);return s!=null?{path:z(new D(r),s.path),value:s.value}:null}else return null}}findRootMostValueAndPath(e){return this.findRootMostMatchingPathAndValue(e,()=>!0)}subtree(e){if(k(e))return this;{const n=T(e),r=this.children.get(n);return r!==null?r.subtree(F(e)):new M(null)}}set(e,n){if(k(e))return new M(n,this.children);{const r=T(e),s=(this.children.get(r)||new M(null)).set(F(e),n),o=this.children.insert(r,s);return new M(this.value,o)}}remove(e){if(k(e))return this.children.isEmpty()?new M(null):new M(null,this.children);{const n=T(e),r=this.children.get(n);if(r){const i=r.remove(F(e));let s;return i.isEmpty()?s=this.children.remove(n):s=this.children.insert(n,i),this.value===null&&s.isEmpty()?new M(null):new M(this.value,s)}else return this}}get(e){if(k(e))return this.value;{const n=T(e),r=this.children.get(n);return r?r.get(F(e)):null}}setTree(e,n){if(k(e))return n;{const r=T(e),s=(this.children.get(r)||new M(null)).setTree(F(e),n);let o;return s.isEmpty()?o=this.children.remove(r):o=this.children.insert(r,s),new M(this.value,o)}}fold(e){return this.fold_(P(),e)}fold_(e,n){const r={};return this.children.inorderTraversal((i,s)=>{r[i]=s.fold_(z(e,i),n)}),n(e,this.value,r)}findOnPath(e,n){return this.findOnPath_(e,P(),n)}findOnPath_(e,n,r){const i=this.value?r(n,this.value):!1;if(i)return i;if(k(e))return null;{const s=T(e),o=this.children.get(s);return o?o.findOnPath_(F(e),z(n,s),r):null}}foreachOnPath(e,n){return this.foreachOnPath_(e,P(),n)}foreachOnPath_(e,n,r){if(k(e))return this;{this.value&&r(n,this.value);const i=T(e),s=this.children.get(i);return s?s.foreachOnPath_(F(e),z(n,i),r):new M(null)}}foreach(e){this.foreach_(P(),e)}foreach_(e,n){this.children.inorderTraversal((r,i)=>{i.foreach_(z(e,r),n)}),this.value&&n(e,this.value)}foreachChild(e){this.children.inorderTraversal((n,r)=>{r.value&&e(n,r.value)})}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Be{constructor(e){this.writeTree_=e}static empty(){return new Be(new M(null))}}function Ir(t,e,n){if(k(e))return new Be(new M(n));{const r=t.writeTree_.findRootMostValueAndPath(e);if(r!=null){const i=r.path;let s=r.value;const o=pe(i,e);return s=s.updateChild(o,n),new Be(t.writeTree_.set(i,s))}else{const i=new M(n),s=t.writeTree_.setTree(e,i);return new Be(s)}}}function oa(t,e,n){let r=t;return ae(n,(i,s)=>{r=Ir(r,z(e,i),s)}),r}function Qu(t,e){if(k(e))return Be.empty();{const n=t.writeTree_.setTree(e,new M(null));return new Be(n)}}function aa(t,e){return mn(t,e)!=null}function mn(t,e){const n=t.writeTree_.findRootMostValueAndPath(e);return n!=null?t.writeTree_.get(n.path).getChild(pe(n.path,e)):null}function Zu(t){const e=[],n=t.writeTree_.value;return n!=null?n.isLeafNode()||n.forEachChild(G,(r,i)=>{e.push(new I(r,i))}):t.writeTree_.children.inorderTraversal((r,i)=>{i.value!=null&&e.push(new I(r,i.value))}),e}function Ot(t,e){if(k(e))return t;{const n=mn(t,e);return n!=null?new Be(new M(n)):new Be(t.writeTree_.subtree(e))}}function ca(t){return t.writeTree_.isEmpty()}function Hn(t,e){return Wf(P(),t.writeTree_,e)}function Wf(t,e,n){if(e.value!=null)return n.updateChild(t,e.value);{let r=null;return e.children.inorderTraversal((i,s)=>{i===".priority"?(g(s.value!==null,"Priority writes must always be leaf nodes"),r=s.value):n=Wf(z(t,i),s,n)}),!n.getChild(t).isEmpty()&&r!==null&&(n=n.updateChild(z(t,".priority"),r)),n}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ds(t,e){return Gf(e,t)}function rC(t,e,n,r,i){g(r>t.lastWriteId,"Stacking an older write on top of newer ones"),i===void 0&&(i=!0),t.allWrites.push({path:e,snap:n,writeId:r,visible:i}),i&&(t.visibleWrites=Ir(t.visibleWrites,e,n)),t.lastWriteId=r}function iC(t,e,n,r){g(r>t.lastWriteId,"Stacking an older merge on top of newer ones"),t.allWrites.push({path:e,children:n,writeId:r,visible:!0}),t.visibleWrites=oa(t.visibleWrites,e,n),t.lastWriteId=r}function sC(t,e){for(let n=0;n<t.allWrites.length;n++){const r=t.allWrites[n];if(r.writeId===e)return r}return null}function oC(t,e){const n=t.allWrites.findIndex(a=>a.writeId===e);g(n>=0,"removeWrite called with nonexistent writeId.");const r=t.allWrites[n];t.allWrites.splice(n,1);let i=r.visible,s=!1,o=t.allWrites.length-1;for(;i&&o>=0;){const a=t.allWrites[o];a.visible&&(o>=n&&aC(a,r.path)?i=!1:ke(r.path,a.path)&&(s=!0)),o--}if(i){if(s)return cC(t),!0;if(r.snap)t.visibleWrites=Qu(t.visibleWrites,r.path);else{const a=r.children;ae(a,c=>{t.visibleWrites=Qu(t.visibleWrites,z(r.path,c))})}return!0}else return!1}function aC(t,e){if(t.snap)return ke(t.path,e);for(const n in t.children)if(t.children.hasOwnProperty(n)&&ke(z(t.path,n),e))return!0;return!1}function cC(t){t.visibleWrites=jf(t.allWrites,lC,P()),t.allWrites.length>0?t.lastWriteId=t.allWrites[t.allWrites.length-1].writeId:t.lastWriteId=-1}function lC(t){return t.visible}function jf(t,e,n){let r=Be.empty();for(let i=0;i<t.length;++i){const s=t[i];if(e(s)){const o=s.path;let a;if(s.snap)ke(n,o)?(a=pe(n,o),r=Ir(r,a,s.snap)):ke(o,n)&&(a=pe(o,n),r=Ir(r,P(),s.snap.getChild(a)));else if(s.children){if(ke(n,o))a=pe(n,o),r=oa(r,a,s.children);else if(ke(o,n))if(a=pe(o,n),k(a))r=oa(r,P(),s.children);else{const c=Fn(s.children,T(a));if(c){const l=c.getChild(F(a));r=Ir(r,P(),l)}}}else throw Qn("WriteRecord should have .snap or .children")}}return r}function Vf(t,e,n,r,i){if(!r&&!i){const s=mn(t.visibleWrites,e);if(s!=null)return s;{const o=Ot(t.visibleWrites,e);if(ca(o))return n;if(n==null&&!aa(o,P()))return null;{const a=n||v.EMPTY_NODE;return Hn(o,a)}}}else{const s=Ot(t.visibleWrites,e);if(!i&&ca(s))return n;if(!i&&n==null&&!aa(s,P()))return null;{const o=function(l){return(l.visible||i)&&(!r||!~r.indexOf(l.writeId))&&(ke(l.path,e)||ke(e,l.path))},a=jf(t.allWrites,o,e),c=n||v.EMPTY_NODE;return Hn(a,c)}}}function uC(t,e,n){let r=v.EMPTY_NODE;const i=mn(t.visibleWrites,e);if(i)return i.isLeafNode()||i.forEachChild(G,(s,o)=>{r=r.updateImmediateChild(s,o)}),r;if(n){const s=Ot(t.visibleWrites,e);return n.forEachChild(G,(o,a)=>{const c=Hn(Ot(s,new D(o)),a);r=r.updateImmediateChild(o,c)}),Zu(s).forEach(o=>{r=r.updateImmediateChild(o.name,o.node)}),r}else{const s=Ot(t.visibleWrites,e);return Zu(s).forEach(o=>{r=r.updateImmediateChild(o.name,o.node)}),r}}function dC(t,e,n,r,i){g(r||i,"Either existingEventSnap or existingServerSnap must exist");const s=z(e,n);if(aa(t.visibleWrites,s))return null;{const o=Ot(t.visibleWrites,s);return ca(o)?i.getChild(n):Hn(o,i.getChild(n))}}function hC(t,e,n,r){const i=z(e,n),s=mn(t.visibleWrites,i);if(s!=null)return s;if(r.isCompleteForChild(n)){const o=Ot(t.visibleWrites,i);return Hn(o,r.getNode().getImmediateChild(n))}else return null}function fC(t,e){return mn(t.visibleWrites,e)}function pC(t,e,n,r,i,s,o){let a;const c=Ot(t.visibleWrites,e),l=mn(c,P());if(l!=null)a=l;else if(n!=null)a=Hn(c,n);else return[];if(a=a.withIndex(o),!a.isEmpty()&&!a.isLeafNode()){const u=[],d=o.getCompare(),h=s?a.getReverseIteratorFrom(r,o):a.getIteratorFrom(r,o);let f=h.getNext();for(;f&&u.length<i;)d(f,r)!==0&&u.push(f),f=h.getNext();return u}else return[]}function gC(){return{visibleWrites:Be.empty(),allWrites:[],lastWriteId:-1}}function ns(t,e,n,r){return Vf(t.writeTree,t.treePath,e,n,r)}function gc(t,e){return uC(t.writeTree,t.treePath,e)}function ed(t,e,n,r){return dC(t.writeTree,t.treePath,e,n,r)}function rs(t,e){return fC(t.writeTree,z(t.treePath,e))}function mC(t,e,n,r,i,s){return pC(t.writeTree,t.treePath,e,n,r,i,s)}function mc(t,e,n){return hC(t.writeTree,t.treePath,e,n)}function zf(t,e){return Gf(z(t.treePath,e),t.writeTree)}function Gf(t,e){return{treePath:t,writeTree:e}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class _C{constructor(){this.changeMap=new Map}trackChildChange(e){const n=e.type,r=e.childName;g(n==="child_added"||n==="child_changed"||n==="child_removed","Only child changes supported for tracking"),g(r!==".priority","Only non-priority child changes can be tracked.");const i=this.changeMap.get(r);if(i){const s=i.type;if(n==="child_added"&&s==="child_removed")this.changeMap.set(r,jr(r,e.snapshotNode,i.snapshotNode));else if(n==="child_removed"&&s==="child_added")this.changeMap.delete(r);else if(n==="child_removed"&&s==="child_changed")this.changeMap.set(r,Wr(r,i.oldSnap));else if(n==="child_changed"&&s==="child_added")this.changeMap.set(r,$n(r,e.snapshotNode));else if(n==="child_changed"&&s==="child_changed")this.changeMap.set(r,jr(r,e.snapshotNode,i.oldSnap));else throw Qn("Illegal combination of changes: "+e+" occurred after "+i)}else this.changeMap.set(r,e)}getChanges(){return Array.from(this.changeMap.values())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class yC{getCompleteChild(e){return null}getChildAfterChild(e,n,r){return null}}const qf=new yC;class _c{constructor(e,n,r=null){this.writes_=e,this.viewCache_=n,this.optCompleteServerCache_=r}getCompleteChild(e){const n=this.viewCache_.eventCache;if(n.isCompleteForChild(e))return n.getNode().getImmediateChild(e);{const r=this.optCompleteServerCache_!=null?new Bt(this.optCompleteServerCache_,!0,!1):this.viewCache_.serverCache;return mc(this.writes_,e,r)}}getChildAfterChild(e,n,r){const i=this.optCompleteServerCache_!=null?this.optCompleteServerCache_:dn(this.viewCache_),s=mC(this.writes_,i,n,1,r,e);return s.length===0?null:s[0]}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function EC(t){return{filter:t}}function vC(t,e){g(e.eventCache.getNode().isIndexed(t.filter.getIndex()),"Event snap not indexed"),g(e.serverCache.getNode().isIndexed(t.filter.getIndex()),"Server snap not indexed")}function wC(t,e,n,r,i){const s=new _C;let o,a;if(n.type===xe.OVERWRITE){const l=n;l.source.fromUser?o=la(t,e,l.path,l.snap,r,i,s):(g(l.source.fromServer,"Unknown source."),a=l.source.tagged||e.serverCache.isFiltered()&&!k(l.path),o=is(t,e,l.path,l.snap,r,i,a,s))}else if(n.type===xe.MERGE){const l=n;l.source.fromUser?o=SC(t,e,l.path,l.children,r,i,s):(g(l.source.fromServer,"Unknown source."),a=l.source.tagged||e.serverCache.isFiltered(),o=ua(t,e,l.path,l.children,r,i,a,s))}else if(n.type===xe.ACK_USER_WRITE){const l=n;l.revert?o=IC(t,e,l.path,r,i,s):o=CC(t,e,l.path,l.affectedTree,r,i,s)}else if(n.type===xe.LISTEN_COMPLETE)o=TC(t,e,n.path,r,s);else throw Qn("Unknown operation type: "+n.type);const c=s.getChanges();return bC(e,o,c),{viewCache:o,changes:c}}function bC(t,e,n){const r=e.eventCache;if(r.isFullyInitialized()){const i=r.getNode().isLeafNode()||r.getNode().isEmpty(),s=ts(t);(n.length>0||!t.eventCache.isFullyInitialized()||i&&!r.getNode().equals(s)||!r.getNode().getPriority().equals(s.getPriority()))&&n.push($f(ts(e)))}}function Yf(t,e,n,r,i,s){const o=e.eventCache;if(rs(r,n)!=null)return e;{let a,c;if(k(n))if(g(e.serverCache.isFullyInitialized(),"If change path is empty, we must have complete server data"),e.serverCache.isFiltered()){const l=dn(e),u=l instanceof v?l:v.EMPTY_NODE,d=gc(r,u);a=t.filter.updateFullNode(e.eventCache.getNode(),d,s)}else{const l=ns(r,dn(e));a=t.filter.updateFullNode(e.eventCache.getNode(),l,s)}else{const l=T(n);if(l===".priority"){g($t(n)===1,"Can't have a priority with additional path components");const u=o.getNode();c=e.serverCache.getNode();const d=ed(r,n,u,c);d!=null?a=t.filter.updatePriority(u,d):a=o.getNode()}else{const u=F(n);let d;if(o.isCompleteForChild(l)){c=e.serverCache.getNode();const h=ed(r,n,o.getNode(),c);h!=null?d=o.getNode().getImmediateChild(l).updateChild(u,h):d=o.getNode().getImmediateChild(l)}else d=mc(r,l,e.serverCache);d!=null?a=t.filter.updateChild(o.getNode(),l,d,u,i,s):a=o.getNode()}}return Tr(e,a,o.isFullyInitialized()||k(n),t.filter.filtersNodes())}}function is(t,e,n,r,i,s,o,a){const c=e.serverCache;let l;const u=o?t.filter:t.filter.getIndexedFilter();if(k(n))l=u.updateFullNode(c.getNode(),r,null);else if(u.filtersNodes()&&!c.isFiltered()){const f=c.getNode().updateChild(n,r);l=u.updateFullNode(c.getNode(),f,null)}else{const f=T(n);if(!c.isCompleteForPath(n)&&$t(n)>1)return e;const p=F(n),m=c.getNode().getImmediateChild(f).updateChild(p,r);f===".priority"?l=u.updatePriority(c.getNode(),m):l=u.updateChild(c.getNode(),f,m,p,qf,null)}const d=Hf(e,l,c.isFullyInitialized()||k(n),u.filtersNodes()),h=new _c(i,d,s);return Yf(t,d,n,i,h,a)}function la(t,e,n,r,i,s,o){const a=e.eventCache;let c,l;const u=new _c(i,e,s);if(k(n))l=t.filter.updateFullNode(e.eventCache.getNode(),r,o),c=Tr(e,l,!0,t.filter.filtersNodes());else{const d=T(n);if(d===".priority")l=t.filter.updatePriority(e.eventCache.getNode(),r),c=Tr(e,l,a.isFullyInitialized(),a.isFiltered());else{const h=F(n),f=a.getNode().getImmediateChild(d);let p;if(k(h))p=r;else{const y=u.getCompleteChild(d);y!=null?oc(h)===".priority"&&y.getChild(Lf(h)).isEmpty()?p=y:p=y.updateChild(h,r):p=v.EMPTY_NODE}if(f.equals(p))c=e;else{const y=t.filter.updateChild(a.getNode(),d,p,h,u,o);c=Tr(e,y,a.isFullyInitialized(),t.filter.filtersNodes())}}}return c}function td(t,e){return t.eventCache.isCompleteForChild(e)}function SC(t,e,n,r,i,s,o){let a=e;return r.foreach((c,l)=>{const u=z(n,c);td(e,T(u))&&(a=la(t,a,u,l,i,s,o))}),r.foreach((c,l)=>{const u=z(n,c);td(e,T(u))||(a=la(t,a,u,l,i,s,o))}),a}function nd(t,e,n){return n.foreach((r,i)=>{e=e.updateChild(r,i)}),e}function ua(t,e,n,r,i,s,o,a){if(e.serverCache.getNode().isEmpty()&&!e.serverCache.isFullyInitialized())return e;let c=e,l;k(n)?l=r:l=new M(null).setTree(n,r);const u=e.serverCache.getNode();return l.children.inorderTraversal((d,h)=>{if(u.hasChild(d)){const f=e.serverCache.getNode().getImmediateChild(d),p=nd(t,f,h);c=is(t,c,new D(d),p,i,s,o,a)}}),l.children.inorderTraversal((d,h)=>{const f=!e.serverCache.isCompleteForChild(d)&&h.value===null;if(!u.hasChild(d)&&!f){const p=e.serverCache.getNode().getImmediateChild(d),y=nd(t,p,h);c=is(t,c,new D(d),y,i,s,o,a)}}),c}function CC(t,e,n,r,i,s,o){if(rs(i,n)!=null)return e;const a=e.serverCache.isFiltered(),c=e.serverCache;if(r.value!=null){if(k(n)&&c.isFullyInitialized()||c.isCompleteForPath(n))return is(t,e,n,c.getNode().getChild(n),i,s,a,o);if(k(n)){let l=new M(null);return c.getNode().forEachChild(Cn,(u,d)=>{l=l.set(new D(u),d)}),ua(t,e,n,l,i,s,a,o)}else return e}else{let l=new M(null);return r.foreach((u,d)=>{const h=z(n,u);c.isCompleteForPath(h)&&(l=l.set(u,c.getNode().getChild(h)))}),ua(t,e,n,l,i,s,a,o)}}function TC(t,e,n,r,i){const s=e.serverCache,o=Hf(e,s.getNode(),s.isFullyInitialized()||k(n),s.isFiltered());return Yf(t,o,n,r,qf,i)}function IC(t,e,n,r,i,s){let o;if(rs(r,n)!=null)return e;{const a=new _c(r,e,i),c=e.eventCache.getNode();let l;if(k(n)||T(n)===".priority"){let u;if(e.serverCache.isFullyInitialized())u=ns(r,dn(e));else{const d=e.serverCache.getNode();g(d instanceof v,"serverChildren would be complete if leaf node"),u=gc(r,d)}u=u,l=t.filter.updateFullNode(c,u,s)}else{const u=T(n);let d=mc(r,u,e.serverCache);d==null&&e.serverCache.isCompleteForChild(u)&&(d=c.getImmediateChild(u)),d!=null?l=t.filter.updateChild(c,u,d,F(n),a,s):e.eventCache.getNode().hasChild(u)?l=t.filter.updateChild(c,u,v.EMPTY_NODE,F(n),a,s):l=c,l.isEmpty()&&e.serverCache.isFullyInitialized()&&(o=ns(r,dn(e)),o.isLeafNode()&&(l=t.filter.updateFullNode(l,o,s)))}return o=e.serverCache.isFullyInitialized()||rs(r,P())!=null,Tr(e,l,o,t.filter.filtersNodes())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class kC{constructor(e,n){this.query_=e,this.eventRegistrations_=[];const r=this.query_._queryParams,i=new uc(r.getIndex()),s=zS(r);this.processor_=EC(s);const o=n.serverCache,a=n.eventCache,c=i.updateFullNode(v.EMPTY_NODE,o.getNode(),null),l=s.updateFullNode(v.EMPTY_NODE,a.getNode(),null),u=new Bt(c,o.isFullyInitialized(),i.filtersNodes()),d=new Bt(l,a.isFullyInitialized(),s.filtersNodes());this.viewCache_=Os(d,u),this.eventGenerator_=new QS(this.query_)}get query(){return this.query_}}function RC(t){return t.viewCache_.serverCache.getNode()}function AC(t){return ts(t.viewCache_)}function NC(t,e){const n=dn(t.viewCache_);return n&&(t.query._queryParams.loadsAllData()||!k(e)&&!n.getImmediateChild(T(e)).isEmpty())?n.getChild(e):null}function rd(t){return t.eventRegistrations_.length===0}function PC(t,e){t.eventRegistrations_.push(e)}function id(t,e,n){const r=[];if(n){g(e==null,"A cancel should cancel all event registrations.");const i=t.query._path;t.eventRegistrations_.forEach(s=>{const o=s.createCancelEvent(n,i);o&&r.push(o)})}if(e){let i=[];for(let s=0;s<t.eventRegistrations_.length;++s){const o=t.eventRegistrations_[s];if(!o.matches(e))i.push(o);else if(e.hasAnyCallback()){i=i.concat(t.eventRegistrations_.slice(s+1));break}}t.eventRegistrations_=i}else t.eventRegistrations_=[];return r}function sd(t,e,n,r){e.type===xe.MERGE&&e.source.queryId!==null&&(g(dn(t.viewCache_),"We should always have a full cache before handling merges"),g(ts(t.viewCache_),"Missing event cache, even though we have a server cache"));const i=t.viewCache_,s=wC(t.processor_,i,e,n,r);return vC(t.processor_,s.viewCache),g(s.viewCache.serverCache.isFullyInitialized()||!i.serverCache.isFullyInitialized(),"Once a server snap is complete, it should never go back"),t.viewCache_=s.viewCache,Kf(t,s.changes,s.viewCache.eventCache.getNode(),null)}function LC(t,e){const n=t.viewCache_.eventCache,r=[];return n.getNode().isLeafNode()||n.getNode().forEachChild(G,(s,o)=>{r.push($n(s,o))}),n.isFullyInitialized()&&r.push($f(n.getNode())),Kf(t,r,n.getNode(),e)}function Kf(t,e,n,r){const i=r?[r]:t.eventRegistrations_;return ZS(t.eventGenerator_,e,n,i)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let ss;class Jf{constructor(){this.views=new Map}}function OC(t){g(!ss,"__referenceConstructor has already been defined"),ss=t}function DC(){return g(ss,"Reference.ts has not been loaded"),ss}function MC(t){return t.views.size===0}function yc(t,e,n,r){const i=e.source.queryId;if(i!==null){const s=t.views.get(i);return g(s!=null,"SyncTree gave us an op for an invalid query."),sd(s,e,n,r)}else{let s=[];for(const o of t.views.values())s=s.concat(sd(o,e,n,r));return s}}function Xf(t,e,n,r,i){const s=e._queryIdentifier,o=t.views.get(s);if(!o){let a=ns(n,i?r:null),c=!1;a?c=!0:r instanceof v?(a=gc(n,r),c=!1):(a=v.EMPTY_NODE,c=!1);const l=Os(new Bt(a,c,!1),new Bt(r,i,!1));return new kC(e,l)}return o}function xC(t,e,n,r,i,s){const o=Xf(t,e,r,i,s);return t.views.has(e._queryIdentifier)||t.views.set(e._queryIdentifier,o),PC(o,n),LC(o,n)}function FC(t,e,n,r){const i=e._queryIdentifier,s=[];let o=[];const a=Ht(t);if(i==="default")for(const[c,l]of t.views.entries())o=o.concat(id(l,n,r)),rd(l)&&(t.views.delete(c),l.query._queryParams.loadsAllData()||s.push(l.query));else{const c=t.views.get(i);c&&(o=o.concat(id(c,n,r)),rd(c)&&(t.views.delete(i),c.query._queryParams.loadsAllData()||s.push(c.query)))}return a&&!Ht(t)&&s.push(new(DC())(e._repo,e._path)),{removed:s,events:o}}function Qf(t){const e=[];for(const n of t.views.values())n.query._queryParams.loadsAllData()||e.push(n);return e}function Dt(t,e){let n=null;for(const r of t.views.values())n=n||NC(r,e);return n}function Zf(t,e){if(e._queryParams.loadsAllData())return Ms(t);{const r=e._queryIdentifier;return t.views.get(r)}}function ep(t,e){return Zf(t,e)!=null}function Ht(t){return Ms(t)!=null}function Ms(t){for(const e of t.views.values())if(e.query._queryParams.loadsAllData())return e;return null}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let os;function UC(t){g(!os,"__referenceConstructor has already been defined"),os=t}function $C(){return g(os,"Reference.ts has not been loaded"),os}let BC=1;class od{constructor(e){this.listenProvider_=e,this.syncPointTree_=new M(null),this.pendingWriteTree_=gC(),this.tagToQueryMap=new Map,this.queryToTagMap=new Map}}function tp(t,e,n,r,i){return rC(t.pendingWriteTree_,e,n,r,i),i?ir(t,new un(hc(),e,n)):[]}function HC(t,e,n,r){iC(t.pendingWriteTree_,e,n,r);const i=M.fromObject(n);return ir(t,new Bn(hc(),e,i))}function Ct(t,e,n=!1){const r=sC(t.pendingWriteTree_,e);if(oC(t.pendingWriteTree_,e)){let s=new M(null);return r.snap!=null?s=s.set(P(),!0):ae(r.children,o=>{s=s.set(new D(o),!0)}),ir(t,new es(r.path,s,n))}else return[]}function ai(t,e,n){return ir(t,new un(fc(),e,n))}function WC(t,e,n){const r=M.fromObject(n);return ir(t,new Bn(fc(),e,r))}function jC(t,e){return ir(t,new zr(fc(),e))}function VC(t,e,n){const r=vc(t,n);if(r){const i=wc(r),s=i.path,o=i.queryId,a=pe(s,e),c=new zr(pc(o),a);return bc(t,s,c)}else return[]}function as(t,e,n,r,i=!1){const s=e._path,o=t.syncPointTree_.get(s);let a=[];if(o&&(e._queryIdentifier==="default"||ep(o,e))){const c=FC(o,e,n,r);MC(o)&&(t.syncPointTree_=t.syncPointTree_.remove(s));const l=c.removed;if(a=c.events,!i){const u=l.findIndex(h=>h._queryParams.loadsAllData())!==-1,d=t.syncPointTree_.findOnPath(s,(h,f)=>Ht(f));if(u&&!d){const h=t.syncPointTree_.subtree(s);if(!h.isEmpty()){const f=qC(h);for(let p=0;p<f.length;++p){const y=f[p],m=y.query,A=sp(t,y);t.listenProvider_.startListening(kr(m),Gr(t,m),A.hashFn,A.onComplete)}}}!d&&l.length>0&&!r&&(u?t.listenProvider_.stopListening(kr(e),null):l.forEach(h=>{const f=t.queryToTagMap.get(xs(h));t.listenProvider_.stopListening(kr(h),f)}))}YC(t,l)}return a}function np(t,e,n,r){const i=vc(t,r);if(i!=null){const s=wc(i),o=s.path,a=s.queryId,c=pe(o,e),l=new un(pc(a),c,n);return bc(t,o,l)}else return[]}function zC(t,e,n,r){const i=vc(t,r);if(i){const s=wc(i),o=s.path,a=s.queryId,c=pe(o,e),l=M.fromObject(n),u=new Bn(pc(a),c,l);return bc(t,o,u)}else return[]}function da(t,e,n,r=!1){const i=e._path;let s=null,o=!1;t.syncPointTree_.foreachOnPath(i,(h,f)=>{const p=pe(h,i);s=s||Dt(f,p),o=o||Ht(f)});let a=t.syncPointTree_.get(i);a?(o=o||Ht(a),s=s||Dt(a,P())):(a=new Jf,t.syncPointTree_=t.syncPointTree_.set(i,a));let c;s!=null?c=!0:(c=!1,s=v.EMPTY_NODE,t.syncPointTree_.subtree(i).foreachChild((f,p)=>{const y=Dt(p,P());y&&(s=s.updateImmediateChild(f,y))}));const l=ep(a,e);if(!l&&!e._queryParams.loadsAllData()){const h=xs(e);g(!t.queryToTagMap.has(h),"View does not exist, but we have a tag");const f=KC();t.queryToTagMap.set(h,f),t.tagToQueryMap.set(f,h)}const u=Ds(t.pendingWriteTree_,i);let d=xC(a,e,n,u,s,c);if(!l&&!o&&!r){const h=Zf(a,e);d=d.concat(JC(t,e,h))}return d}function Ec(t,e,n){const i=t.pendingWriteTree_,s=t.syncPointTree_.findOnPath(e,(o,a)=>{const c=pe(o,e),l=Dt(a,c);if(l)return l});return Vf(i,e,s,n,!0)}function GC(t,e){const n=e._path;let r=null;t.syncPointTree_.foreachOnPath(n,(l,u)=>{const d=pe(l,n);r=r||Dt(u,d)});let i=t.syncPointTree_.get(n);i?r=r||Dt(i,P()):(i=new Jf,t.syncPointTree_=t.syncPointTree_.set(n,i));const s=r!=null,o=s?new Bt(r,!0,!1):null,a=Ds(t.pendingWriteTree_,e._path),c=Xf(i,e,a,s?o.getNode():v.EMPTY_NODE,s);return AC(c)}function ir(t,e){return rp(e,t.syncPointTree_,null,Ds(t.pendingWriteTree_,P()))}function rp(t,e,n,r){if(k(t.path))return ip(t,e,n,r);{const i=e.get(P());n==null&&i!=null&&(n=Dt(i,P()));let s=[];const o=T(t.path),a=t.operationForChild(o),c=e.children.get(o);if(c&&a){const l=n?n.getImmediateChild(o):null,u=zf(r,o);s=s.concat(rp(a,c,l,u))}return i&&(s=s.concat(yc(i,t,r,n))),s}}function ip(t,e,n,r){const i=e.get(P());n==null&&i!=null&&(n=Dt(i,P()));let s=[];return e.children.inorderTraversal((o,a)=>{const c=n?n.getImmediateChild(o):null,l=zf(r,o),u=t.operationForChild(o);u&&(s=s.concat(ip(u,a,c,l)))}),i&&(s=s.concat(yc(i,t,r,n))),s}function sp(t,e){const n=e.query,r=Gr(t,n);return{hashFn:()=>(RC(e)||v.EMPTY_NODE).hash(),onComplete:i=>{if(i==="ok")return r?VC(t,n._path,r):jC(t,n._path);{const s=jb(i,n);return as(t,n,null,s)}}}}function Gr(t,e){const n=xs(e);return t.queryToTagMap.get(n)}function xs(t){return t._path.toString()+"$"+t._queryIdentifier}function vc(t,e){return t.tagToQueryMap.get(e)}function wc(t){const e=t.indexOf("$");return g(e!==-1&&e<t.length-1,"Bad queryKey."),{queryId:t.substr(e+1),path:new D(t.substr(0,e))}}function bc(t,e,n){const r=t.syncPointTree_.get(e);g(r,"Missing sync point for query tag that we're tracking");const i=Ds(t.pendingWriteTree_,e);return yc(r,n,i,null)}function qC(t){return t.fold((e,n,r)=>{if(n&&Ht(n))return[Ms(n)];{let i=[];return n&&(i=Qf(n)),ae(r,(s,o)=>{i=i.concat(o)}),i}})}function kr(t){return t._queryParams.loadsAllData()&&!t._queryParams.isDefault()?new($C())(t._repo,t._path):t}function YC(t,e){for(let n=0;n<e.length;++n){const r=e[n];if(!r._queryParams.loadsAllData()){const i=xs(r),s=t.queryToTagMap.get(i);t.queryToTagMap.delete(i),t.tagToQueryMap.delete(s)}}}function KC(){return BC++}function JC(t,e,n){const r=e._path,i=Gr(t,e),s=sp(t,n),o=t.listenProvider_.startListening(kr(e),i,s.hashFn,s.onComplete),a=t.syncPointTree_.subtree(r);if(i)g(!Ht(a.value),"If we're adding a query, it shouldn't be shadowed");else{const c=a.fold((l,u,d)=>{if(!k(l)&&u&&Ht(u))return[Ms(u).query];{let h=[];return u&&(h=h.concat(Qf(u).map(f=>f.query))),ae(d,(f,p)=>{h=h.concat(p)}),h}});for(let l=0;l<c.length;++l){const u=c[l];t.listenProvider_.stopListening(kr(u),Gr(t,u))}}return o}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Sc{constructor(e){this.node_=e}getImmediateChild(e){const n=this.node_.getImmediateChild(e);return new Sc(n)}node(){return this.node_}}class Cc{constructor(e,n){this.syncTree_=e,this.path_=n}getImmediateChild(e){const n=z(this.path_,e);return new Cc(this.syncTree_,n)}node(){return Ec(this.syncTree_,this.path_)}}const XC=function(t){return t=t||{},t.timestamp=t.timestamp||new Date().getTime(),t},ad=function(t,e,n){if(!t||typeof t!="object")return t;if(g(".sv"in t,"Unexpected leaf node or priority contents"),typeof t[".sv"]=="string")return QC(t[".sv"],e,n);if(typeof t[".sv"]=="object")return ZC(t[".sv"],e);g(!1,"Unexpected server value: "+JSON.stringify(t,null,2))},QC=function(t,e,n){switch(t){case"timestamp":return n.timestamp;default:g(!1,"Unexpected server value: "+t)}},ZC=function(t,e,n){t.hasOwnProperty("increment")||g(!1,"Unexpected server value: "+JSON.stringify(t,null,2));const r=t.increment;typeof r!="number"&&g(!1,"Unexpected increment value: "+r);const i=e.node();if(g(i!==null&&typeof i<"u","Expected ChildrenNode.EMPTY_NODE for nulls"),!i.isLeafNode())return r;const o=i.getValue();return typeof o!="number"?r:o+r},op=function(t,e,n,r){return Tc(e,new Cc(n,t),r)},ap=function(t,e,n){return Tc(t,new Sc(e),n)};function Tc(t,e,n){const r=t.getPriority().val(),i=ad(r,e.getImmediateChild(".priority"),n);let s;if(t.isLeafNode()){const o=t,a=ad(o.getValue(),e,n);return a!==o.getValue()||i!==o.getPriority().val()?new Z(a,J(i)):t}else{const o=t;return s=o,i!==o.getPriority().val()&&(s=s.updatePriority(new Z(i))),o.forEachChild(G,(a,c)=>{const l=Tc(c,e.getImmediateChild(a),n);l!==c&&(s=s.updateImmediateChild(a,l))}),s}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ic{constructor(e="",n=null,r={children:{},childCount:0}){this.name=e,this.parent=n,this.node=r}}function kc(t,e){let n=e instanceof D?e:new D(e),r=t,i=T(n);for(;i!==null;){const s=Fn(r.node.children,i)||{children:{},childCount:0};r=new Ic(i,r,s),n=F(n),i=T(n)}return r}function sr(t){return t.node.value}function cp(t,e){t.node.value=e,ha(t)}function lp(t){return t.node.childCount>0}function eT(t){return sr(t)===void 0&&!lp(t)}function Fs(t,e){ae(t.node.children,(n,r)=>{e(new Ic(n,t,r))})}function up(t,e,n,r){n&&e(t),Fs(t,i=>{up(i,e,!0)})}function tT(t,e,n){let r=t.parent;for(;r!==null;){if(e(r))return!0;r=r.parent}return!1}function ci(t){return new D(t.parent===null?t.name:ci(t.parent)+"/"+t.name)}function ha(t){t.parent!==null&&nT(t.parent,t.name,t)}function nT(t,e,n){const r=eT(n),i=Xe(t.node.children,e);r&&i?(delete t.node.children[e],t.node.childCount--,ha(t)):!r&&!i&&(t.node.children[e]=n.node,t.node.childCount++,ha(t))}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const rT=/[\[\].#$\/\u0000-\u001F\u007F]/,iT=/[\[\].#$\u0000-\u001F\u007F]/,bo=10*1024*1024,Rc=function(t){return typeof t=="string"&&t.length!==0&&!rT.test(t)},dp=function(t){return typeof t=="string"&&t.length!==0&&!iT.test(t)},sT=function(t){return t&&(t=t.replace(/^\/*\.info(\/|$)/,"/")),dp(t)},oT=function(t){return t===null||typeof t=="string"||typeof t=="number"&&!tc(t)||t&&typeof t=="object"&&Xe(t,".sv")},hp=function(t,e,n,r){r&&e===void 0||Us(As(t,"value"),e,n)},Us=function(t,e,n){const r=n instanceof D?new SS(n,t):n;if(e===void 0)throw new Error(t+"contains undefined "+Jt(r));if(typeof e=="function")throw new Error(t+"contains a function "+Jt(r)+" with contents = "+e.toString());if(tc(e))throw new Error(t+"contains "+e.toString()+" "+Jt(r));if(typeof e=="string"&&e.length>bo/3&&Ns(e)>bo)throw new Error(t+"contains a string greater than "+bo+" utf8 bytes "+Jt(r)+" ('"+e.substring(0,50)+"...')");if(e&&typeof e=="object"){let i=!1,s=!1;if(ae(e,(o,a)=>{if(o===".value")i=!0;else if(o!==".priority"&&o!==".sv"&&(s=!0,!Rc(o)))throw new Error(t+" contains an invalid key ("+o+") "+Jt(r)+`.  Keys must be non-empty strings and can't contain ".", "#", "$", "/", "[", or "]"`);CS(r,o),Us(t,a,r),TS(r)}),i&&s)throw new Error(t+' contains ".value" child '+Jt(r)+" in addition to actual children.")}},aT=function(t,e){let n,r;for(n=0;n<e.length;n++){r=e[n];const s=Hr(r);for(let o=0;o<s.length;o++)if(!(s[o]===".priority"&&o===s.length-1)){if(!Rc(s[o]))throw new Error(t+"contains an invalid key ("+s[o]+") in path "+r.toString()+`. Keys must be non-empty strings and can't contain ".", "#", "$", "/", "[", or "]"`)}}e.sort(bS);let i=null;for(n=0;n<e.length;n++){if(r=e[n],i!==null&&ke(i,r))throw new Error(t+"contains a path "+i.toString()+" that is ancestor of another path "+r.toString());i=r}},cT=function(t,e,n,r){const i=As(t,"values");if(!(e&&typeof e=="object")||Array.isArray(e))throw new Error(i+" must be an object containing the children to replace.");const s=[];ae(e,(o,a)=>{const c=new D(o);if(Us(i,a,z(n,c)),oc(c)===".priority"&&!oT(a))throw new Error(i+"contains an invalid value for '"+c.toString()+"', which must be a valid Firebase priority (a string, finite number, server value, or null).");s.push(c)}),aT(i,s)},fp=function(t,e,n,r){if(!dp(n))throw new Error(As(t,e)+'was an invalid path = "'+n+`". Paths must be non-empty strings and can't contain ".", "#", "$", "[", or "]"`)},lT=function(t,e,n,r){n&&(n=n.replace(/^\/*\.info(\/|$)/,"/")),fp(t,e,n)},Ac=function(t,e){if(T(e)===".info")throw new Error(t+" failed = Can't modify data under /.info/")},uT=function(t,e){const n=e.path.toString();if(typeof e.repoInfo.host!="string"||e.repoInfo.host.length===0||!Rc(e.repoInfo.namespace)&&e.repoInfo.host.split(":")[0]!=="localhost"||n.length!==0&&!sT(n))throw new Error(As(t,"url")+`must be a valid firebase URL and the path can't contain ".", "#", "$", "[", or "]".`)};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class dT{constructor(){this.eventLists_=[],this.recursionDepth_=0}}function $s(t,e){let n=null;for(let r=0;r<e.length;r++){const i=e[r],s=i.getPath();n!==null&&!ac(s,n.path)&&(t.eventLists_.push(n),n=null),n===null&&(n={events:[],path:s}),n.events.push(i)}n&&t.eventLists_.push(n)}function pp(t,e,n){$s(t,n),gp(t,r=>ac(r,e))}function Le(t,e,n){$s(t,n),gp(t,r=>ke(r,e)||ke(e,r))}function gp(t,e){t.recursionDepth_++;let n=!0;for(let r=0;r<t.eventLists_.length;r++){const i=t.eventLists_[r];if(i){const s=i.path;e(s)?(hT(t.eventLists_[r]),t.eventLists_[r]=null):n=!1}}n&&(t.eventLists_=[]),t.recursionDepth_--}function hT(t){for(let e=0;e<t.events.length;e++){const n=t.events[e];if(n!==null){t.events[e]=null;const r=n.getEventRunner();Sr&&ie("event: "+n.toString()),rr(r)}}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const fT="repo_interrupt",pT=25;class gT{constructor(e,n,r,i){this.repoInfo_=e,this.forceRestClient_=n,this.authTokenProvider_=r,this.appCheckProvider_=i,this.dataUpdateCount=0,this.statsListener_=null,this.eventQueue_=new dT,this.nextWriteId_=1,this.interceptServerDataCallback_=null,this.onDisconnect_=Zi(),this.transactionQueueTree_=new Ic,this.persistentConnection_=null,this.key=this.repoInfo_.toURLString()}toString(){return(this.repoInfo_.secure?"https://":"http://")+this.repoInfo_.host}}function mT(t,e,n){if(t.stats_=ic(t.repoInfo_),t.forceRestClient_||qb())t.server_=new Qi(t.repoInfo_,(r,i,s,o)=>{cd(t,r,i,s,o)},t.authTokenProvider_,t.appCheckProvider_),setTimeout(()=>ld(t,!0),0);else{if(typeof n<"u"&&n!==null){if(typeof n!="object")throw new Error("Only objects are supported for option databaseAuthVariableOverride");try{X(n)}catch(r){throw new Error("Invalid authOverride provided: "+r)}}t.persistentConnection_=new lt(t.repoInfo_,e,(r,i,s,o)=>{cd(t,r,i,s,o)},r=>{ld(t,r)},r=>{_T(t,r)},t.authTokenProvider_,t.appCheckProvider_,n),t.server_=t.persistentConnection_}t.authTokenProvider_.addTokenChangeListener(r=>{t.server_.refreshAuthToken(r)}),t.appCheckProvider_.addTokenChangeListener(r=>{t.server_.refreshAppCheckToken(r.token)}),t.statsReporter_=Qb(t.repoInfo_,()=>new XS(t.stats_,t.server_)),t.infoData_=new GS,t.infoSyncTree_=new od({startListening:(r,i,s,o)=>{let a=[];const c=t.infoData_.getNode(r._path);return c.isEmpty()||(a=ai(t.infoSyncTree_,r._path,c),setTimeout(()=>{o("ok")},0)),a},stopListening:()=>{}}),Nc(t,"connected",!1),t.serverSyncTree_=new od({startListening:(r,i,s,o)=>(t.server_.listen(r,s,i,(a,c)=>{const l=o(a,c);Le(t.eventQueue_,r._path,l)}),[]),stopListening:(r,i)=>{t.server_.unlisten(r,i)}})}function mp(t){const n=t.infoData_.getNode(new D(".info/serverTimeOffset")).val()||0;return new Date().getTime()+n}function Bs(t){return XC({timestamp:mp(t)})}function cd(t,e,n,r,i){t.dataUpdateCount++;const s=new D(e);n=t.interceptServerDataCallback_?t.interceptServerDataCallback_(e,n):n;let o=[];if(i)if(r){const c=qi(n,l=>J(l));o=zC(t.serverSyncTree_,s,c,i)}else{const c=J(n);o=np(t.serverSyncTree_,s,c,i)}else if(r){const c=qi(n,l=>J(l));o=WC(t.serverSyncTree_,s,c)}else{const c=J(n);o=ai(t.serverSyncTree_,s,c)}let a=s;o.length>0&&(a=Wn(t,s)),Le(t.eventQueue_,a,o)}function ld(t,e){Nc(t,"connected",e),e===!1&&wT(t)}function _T(t,e){ae(e,(n,r)=>{Nc(t,n,r)})}function Nc(t,e,n){const r=new D("/.info/"+e),i=J(n);t.infoData_.updateSnapshot(r,i);const s=ai(t.infoSyncTree_,r,i);Le(t.eventQueue_,r,s)}function Pc(t){return t.nextWriteId_++}function yT(t,e,n){const r=GC(t.serverSyncTree_,e);return r!=null?Promise.resolve(r):t.server_.get(e).then(i=>{const s=J(i).withIndex(e._queryParams.getIndex());da(t.serverSyncTree_,e,n,!0);let o;if(e._queryParams.loadsAllData())o=ai(t.serverSyncTree_,e._path,s);else{const a=Gr(t.serverSyncTree_,e);o=np(t.serverSyncTree_,e._path,s,a)}return Le(t.eventQueue_,e._path,o),as(t.serverSyncTree_,e,n,null,!0),s},i=>(li(t,"get for query "+X(e)+" failed: "+i),Promise.reject(new Error(i))))}function ET(t,e,n,r,i){li(t,"set",{path:e.toString(),value:n,priority:r});const s=Bs(t),o=J(n,r),a=Ec(t.serverSyncTree_,e),c=ap(o,a,s),l=Pc(t),u=tp(t.serverSyncTree_,e,c,l,!0);$s(t.eventQueue_,u),t.server_.put(e.toString(),o.val(!0),(h,f)=>{const p=h==="ok";p||ge("set at "+e+" failed: "+h);const y=Ct(t.serverSyncTree_,l,!p);Le(t.eventQueue_,e,y),fa(t,i,h,f)});const d=Oc(t,e);Wn(t,d),Le(t.eventQueue_,d,[])}function vT(t,e,n,r){li(t,"update",{path:e.toString(),value:n});let i=!0;const s=Bs(t),o={};if(ae(n,(a,c)=>{i=!1,o[a]=op(z(e,a),J(c),t.serverSyncTree_,s)}),i)ie("update() called with empty data.  Don't do anything."),fa(t,r,"ok",void 0);else{const a=Pc(t),c=HC(t.serverSyncTree_,e,o,a);$s(t.eventQueue_,c),t.server_.merge(e.toString(),n,(l,u)=>{const d=l==="ok";d||ge("update at "+e+" failed: "+l);const h=Ct(t.serverSyncTree_,a,!d),f=h.length>0?Wn(t,e):e;Le(t.eventQueue_,f,h),fa(t,r,l,u)}),ae(n,l=>{const u=Oc(t,z(e,l));Wn(t,u)}),Le(t.eventQueue_,e,[])}}function wT(t){li(t,"onDisconnectEvents");const e=Bs(t),n=Zi();sa(t.onDisconnect_,P(),(i,s)=>{const o=op(i,s,t.serverSyncTree_,e);Bf(n,i,o)});let r=[];sa(n,P(),(i,s)=>{r=r.concat(ai(t.serverSyncTree_,i,s));const o=Oc(t,i);Wn(t,o)}),t.onDisconnect_=Zi(),Le(t.eventQueue_,P(),r)}function bT(t,e,n){let r;T(e._path)===".info"?r=da(t.infoSyncTree_,e,n):r=da(t.serverSyncTree_,e,n),pp(t.eventQueue_,e._path,r)}function _p(t,e,n){let r;T(e._path)===".info"?r=as(t.infoSyncTree_,e,n):r=as(t.serverSyncTree_,e,n),pp(t.eventQueue_,e._path,r)}function ST(t){t.persistentConnection_&&t.persistentConnection_.interrupt(fT)}function li(t,...e){let n="";t.persistentConnection_&&(n=t.persistentConnection_.id+":"),ie(n,...e)}function fa(t,e,n,r){e&&rr(()=>{if(n==="ok")e(null);else{const i=(n||"error").toUpperCase();let s=i;r&&(s+=": "+r);const o=new Error(s);o.code=i,e(o)}})}function yp(t,e,n){return Ec(t.serverSyncTree_,e,n)||v.EMPTY_NODE}function Lc(t,e=t.transactionQueueTree_){if(e||Hs(t,e),sr(e)){const n=vp(t,e);g(n.length>0,"Sending zero length transaction queue"),n.every(i=>i.status===0)&&CT(t,ci(e),n)}else lp(e)&&Fs(e,n=>{Lc(t,n)})}function CT(t,e,n){const r=n.map(l=>l.currentWriteId),i=yp(t,e,r);let s=i;const o=i.hash();for(let l=0;l<n.length;l++){const u=n[l];g(u.status===0,"tryToSendTransactionQueue_: items in queue should all be run."),u.status=1,u.retryCount++;const d=pe(e,u.path);s=s.updateChild(d,u.currentOutputSnapshotRaw)}const a=s.val(!0),c=e;t.server_.put(c.toString(),a,l=>{li(t,"transaction put response",{path:c.toString(),status:l});let u=[];if(l==="ok"){const d=[];for(let h=0;h<n.length;h++)n[h].status=2,u=u.concat(Ct(t.serverSyncTree_,n[h].currentWriteId)),n[h].onComplete&&d.push(()=>n[h].onComplete(null,!0,n[h].currentOutputSnapshotResolved)),n[h].unwatcher();Hs(t,kc(t.transactionQueueTree_,e)),Lc(t,t.transactionQueueTree_),Le(t.eventQueue_,e,u);for(let h=0;h<d.length;h++)rr(d[h])}else{if(l==="datastale")for(let d=0;d<n.length;d++)n[d].status===3?n[d].status=4:n[d].status=0;else{ge("transaction at "+c.toString()+" failed: "+l);for(let d=0;d<n.length;d++)n[d].status=4,n[d].abortReason=l}Wn(t,e)}},o)}function Wn(t,e){const n=Ep(t,e),r=ci(n),i=vp(t,n);return TT(t,i,r),r}function TT(t,e,n){if(e.length===0)return;const r=[];let i=[];const o=e.filter(a=>a.status===0).map(a=>a.currentWriteId);for(let a=0;a<e.length;a++){const c=e[a],l=pe(n,c.path);let u=!1,d;if(g(l!==null,"rerunTransactionsUnderNode_: relativePath should not be null."),c.status===4)u=!0,d=c.abortReason,i=i.concat(Ct(t.serverSyncTree_,c.currentWriteId,!0));else if(c.status===0)if(c.retryCount>=pT)u=!0,d="maxretry",i=i.concat(Ct(t.serverSyncTree_,c.currentWriteId,!0));else{const h=yp(t,c.path,o);c.currentInputSnapshot=h;const f=e[a].update(h.val());if(f!==void 0){Us("transaction failed: Data returned ",f,c.path);let p=J(f);typeof f=="object"&&f!=null&&Xe(f,".priority")||(p=p.updatePriority(h.getPriority()));const m=c.currentWriteId,A=Bs(t),N=ap(p,h,A);c.currentOutputSnapshotRaw=p,c.currentOutputSnapshotResolved=N,c.currentWriteId=Pc(t),o.splice(o.indexOf(m),1),i=i.concat(tp(t.serverSyncTree_,c.path,N,c.currentWriteId,c.applyLocally)),i=i.concat(Ct(t.serverSyncTree_,m,!0))}else u=!0,d="nodata",i=i.concat(Ct(t.serverSyncTree_,c.currentWriteId,!0))}Le(t.eventQueue_,n,i),i=[],u&&(e[a].status=2,(function(h){setTimeout(h,Math.floor(0))})(e[a].unwatcher),e[a].onComplete&&(d==="nodata"?r.push(()=>e[a].onComplete(null,!1,e[a].currentInputSnapshot)):r.push(()=>e[a].onComplete(new Error(d),!1,null))))}Hs(t,t.transactionQueueTree_);for(let a=0;a<r.length;a++)rr(r[a]);Lc(t,t.transactionQueueTree_)}function Ep(t,e){let n,r=t.transactionQueueTree_;for(n=T(e);n!==null&&sr(r)===void 0;)r=kc(r,n),e=F(e),n=T(e);return r}function vp(t,e){const n=[];return wp(t,e,n),n.sort((r,i)=>r.order-i.order),n}function wp(t,e,n){const r=sr(e);if(r)for(let i=0;i<r.length;i++)n.push(r[i]);Fs(e,i=>{wp(t,i,n)})}function Hs(t,e){const n=sr(e);if(n){let r=0;for(let i=0;i<n.length;i++)n[i].status!==2&&(n[r]=n[i],r++);n.length=r,cp(e,n.length>0?n:void 0)}Fs(e,r=>{Hs(t,r)})}function Oc(t,e){const n=ci(Ep(t,e)),r=kc(t.transactionQueueTree_,e);return tT(r,i=>{So(t,i)}),So(t,r),up(r,i=>{So(t,i)}),n}function So(t,e){const n=sr(e);if(n){const r=[];let i=[],s=-1;for(let o=0;o<n.length;o++)n[o].status===3||(n[o].status===1?(g(s===o-1,"All SENT items should be at beginning of queue."),s=o,n[o].status=3,n[o].abortReason="set"):(g(n[o].status===0,"Unexpected transaction status in abort"),n[o].unwatcher(),i=i.concat(Ct(t.serverSyncTree_,n[o].currentWriteId,!0)),n[o].onComplete&&r.push(n[o].onComplete.bind(null,new Error("set"),!1,null))));s===-1?cp(e,void 0):n.length=s+1,Le(t.eventQueue_,ci(e),i);for(let o=0;o<r.length;o++)rr(r[o])}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function IT(t){let e="";const n=t.split("/");for(let r=0;r<n.length;r++)if(n[r].length>0){let i=n[r];try{i=decodeURIComponent(i.replace(/\+/g," "))}catch{}e+="/"+i}return e}function kT(t){const e={};t.charAt(0)==="?"&&(t=t.substring(1));for(const n of t.split("&")){if(n.length===0)continue;const r=n.split("=");r.length===2?e[decodeURIComponent(r[0])]=decodeURIComponent(r[1]):ge(`Invalid query segment '${n}' in query '${t}'`)}return e}const ud=function(t,e){const n=RT(t),r=n.namespace;n.domain==="firebase.com"&&pt(n.host+" is no longer supported. Please use <YOUR FIREBASE>.firebaseio.com instead"),(!r||r==="undefined")&&n.domain!=="localhost"&&pt("Cannot parse Firebase url. Please use https://<YOUR FIREBASE>.firebaseio.com"),n.secure||Ub();const i=n.scheme==="ws"||n.scheme==="wss";return{repoInfo:new Sf(n.host,n.secure,r,i,e,"",r!==n.subdomain),path:new D(n.pathString)}},RT=function(t){let e="",n="",r="",i="",s="",o=!0,a="https",c=443;if(typeof t=="string"){let l=t.indexOf("//");l>=0&&(a=t.substring(0,l-1),t=t.substring(l+2));let u=t.indexOf("/");u===-1&&(u=t.length);let d=t.indexOf("?");d===-1&&(d=t.length),e=t.substring(0,Math.min(u,d)),u<d&&(i=IT(t.substring(u,d)));const h=kT(t.substring(Math.min(t.length,d)));l=e.indexOf(":"),l>=0?(o=a==="https"||a==="wss",c=parseInt(e.substring(l+1),10)):l=e.length;const f=e.slice(0,l);if(f.toLowerCase()==="localhost")n="localhost";else if(f.split(".").length<=2)n=f;else{const p=e.indexOf(".");r=e.substring(0,p).toLowerCase(),n=e.substring(p+1),s=r}"ns"in h&&(s=h.ns)}return{host:e,port:c,domain:n,subdomain:r,secure:o,scheme:a,pathString:i,namespace:s}};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const dd="-0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ_abcdefghijklmnopqrstuvwxyz",AT=(function(){let t=0;const e=[];return function(n){const r=n===t;t=n;let i;const s=new Array(8);for(i=7;i>=0;i--)s[i]=dd.charAt(n%64),n=Math.floor(n/64);g(n===0,"Cannot push at time == 0");let o=s.join("");if(r){for(i=11;i>=0&&e[i]===63;i--)e[i]=0;e[i]++}else for(i=0;i<12;i++)e[i]=Math.floor(Math.random()*64);for(i=0;i<12;i++)o+=dd.charAt(e[i]);return g(o.length===20,"nextPushId: Length should be 20."),o}})();/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class bp{constructor(e,n,r,i){this.eventType=e,this.eventRegistration=n,this.snapshot=r,this.prevName=i}getPath(){const e=this.snapshot.ref;return this.eventType==="value"?e._path:e.parent._path}getEventType(){return this.eventType}getEventRunner(){return this.eventRegistration.getEventRunner(this)}toString(){return this.getPath().toString()+":"+this.eventType+":"+X(this.snapshot.exportVal())}}class Sp{constructor(e,n,r){this.eventRegistration=e,this.error=n,this.path=r}getPath(){return this.path}getEventType(){return"cancel"}getEventRunner(){return this.eventRegistration.getEventRunner(this)}toString(){return this.path.toString()+":cancel"}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Dc{constructor(e,n){this.snapshotCallback=e,this.cancelCallback=n}onValue(e,n){this.snapshotCallback.call(null,e,n)}onCancel(e){return g(this.hasCancelCallback,"Raising a cancel event on a listener with no cancel callback"),this.cancelCallback.call(null,e)}get hasCancelCallback(){return!!this.cancelCallback}matches(e){return this.snapshotCallback===e.snapshotCallback||this.snapshotCallback.userCallback!==void 0&&this.snapshotCallback.userCallback===e.snapshotCallback.userCallback&&this.snapshotCallback.context===e.snapshotCallback.context}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Mc{constructor(e,n,r,i){this._repo=e,this._path=n,this._queryParams=r,this._orderByCalled=i}get key(){return k(this._path)?null:oc(this._path)}get ref(){return new Qe(this._repo,this._path)}get _queryIdentifier(){const e=Ju(this._queryParams),n=nc(e);return n==="{}"?"default":n}get _queryObject(){return Ju(this._queryParams)}isEqual(e){if(e=ce(e),!(e instanceof Mc))return!1;const n=this._repo===e._repo,r=ac(this._path,e._path),i=this._queryIdentifier===e._queryIdentifier;return n&&r&&i}toJSON(){return this.toString()}toString(){return this._repo.toString()+wS(this._path)}}class Qe extends Mc{constructor(e,n){super(e,n,new dc,!1)}get parent(){const e=Lf(this._path);return e===null?null:new Qe(this._repo,e)}get root(){let e=this;for(;e.parent!==null;)e=e.parent;return e}}class jn{constructor(e,n,r){this._node=e,this.ref=n,this._index=r}get priority(){return this._node.getPriority().val()}get key(){return this.ref.key}get size(){return this._node.numChildren()}child(e){const n=new D(e),r=Vn(this.ref,e);return new jn(this._node.getChild(n),r,G)}exists(){return!this._node.isEmpty()}exportVal(){return this._node.val(!0)}forEach(e){return this._node.isLeafNode()?!1:!!this._node.forEachChild(this._index,(r,i)=>e(new jn(i,Vn(this.ref,r),G)))}hasChild(e){const n=new D(e);return!this._node.getChild(n).isEmpty()}hasChildren(){return this._node.isLeafNode()?!1:!this._node.isEmpty()}toJSON(){return this.exportVal()}val(){return this._node.val()}}function se(t,e){return t=ce(t),t._checkNotDeleted("ref"),e!==void 0?Vn(t._root,e):t._root}function Vn(t,e){return t=ce(t),T(t._path)===null?lT("child","path",e):fp("child","path",e),new Qe(t._repo,z(t._path,e))}function hd(t,e){t=ce(t),Ac("push",t._path),hp("push",e,t._path,!0);const n=mp(t._repo),r=AT(n),i=Vn(t,r),s=Vn(t,r);let o;return o=Promise.resolve(s),i.then=o.then.bind(o),i.catch=o.then.bind(o,void 0),i}function zn(t){return Ac("remove",t._path),gt(t,null)}function gt(t,e){t=ce(t),Ac("set",t._path),hp("set",e,t._path,!1);const n=new dt;return ET(t._repo,t._path,e,null,n.wrapCallback(()=>{})),n.promise}function Oi(t,e){cT("update",e,t._path);const n=new dt;return vT(t._repo,t._path,e,n.wrapCallback(()=>{})),n.promise}function nn(t){t=ce(t);const e=new Dc(()=>{}),n=new ui(e);return yT(t._repo,t,n).then(r=>new jn(r,new Qe(t._repo,t._path),t._queryParams.getIndex()))}class ui{constructor(e){this.callbackContext=e}respondsTo(e){return e==="value"}createEvent(e,n){const r=n._queryParams.getIndex();return new bp("value",this,new jn(e.snapshotNode,new Qe(n._repo,n._path),r))}getEventRunner(e){return e.getEventType()==="cancel"?()=>this.callbackContext.onCancel(e.error):()=>this.callbackContext.onValue(e.snapshot,null)}createCancelEvent(e,n){return this.callbackContext.hasCancelCallback?new Sp(this,e,n):null}matches(e){return e instanceof ui?!e.callbackContext||!this.callbackContext?!0:e.callbackContext.matches(this.callbackContext):!1}hasAnyCallback(){return this.callbackContext!==null}}class Ws{constructor(e,n){this.eventType=e,this.callbackContext=n}respondsTo(e){let n=e==="children_added"?"child_added":e;return n=n==="children_removed"?"child_removed":n,this.eventType===n}createCancelEvent(e,n){return this.callbackContext.hasCancelCallback?new Sp(this,e,n):null}createEvent(e,n){g(e.childName!=null,"Child events should have a childName.");const r=Vn(new Qe(n._repo,n._path),e.childName),i=n._queryParams.getIndex();return new bp(e.type,this,new jn(e.snapshotNode,r,i),e.prevName)}getEventRunner(e){return e.getEventType()==="cancel"?()=>this.callbackContext.onCancel(e.error):()=>this.callbackContext.onValue(e.snapshot,e.prevName)}matches(e){return e instanceof Ws?this.eventType===e.eventType&&(!this.callbackContext||!e.callbackContext||this.callbackContext.matches(e.callbackContext)):!1}hasAnyCallback(){return!!this.callbackContext}}function xc(t,e,n,r,i){const s=new Dc(n,void 0),o=e==="value"?new ui(s):new Ws(e,s);return bT(t._repo,t,o),()=>_p(t._repo,t,o)}function NT(t,e,n,r){return xc(t,"value",e)}function PT(t,e,n,r){return xc(t,"child_added",e)}function LT(t,e,n,r){return xc(t,"child_removed",e)}function js(t,e,n){let r=null;const i=n?new Dc(n):null;e==="value"?r=new ui(i):e&&(r=new Ws(e,i)),_p(t._repo,t,r)}OC(Qe);UC(Qe);/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const OT="FIREBASE_DATABASE_EMULATOR_HOST",pa={};let DT=!1;function MT(t,e,n,r){const i=e.lastIndexOf(":"),s=e.substring(0,i),o=Zn(s);t.repoInfo_=new Sf(e,o,t.repoInfo_.namespace,t.repoInfo_.webSocketOnly,t.repoInfo_.nodeAdmin,t.repoInfo_.persistenceKey,t.repoInfo_.includeNamespaceInQueryParams,!0,n),r&&(t.authTokenProvider_=r)}function xT(t,e,n,r,i){let s=r||t.options.databaseURL;s===void 0&&(t.options.projectId||pt("Can't determine Firebase Database URL. Be sure to include  a Project ID when calling firebase.initializeApp()."),ie("Using default host for project ",t.options.projectId),s=`${t.options.projectId}-default-rtdb.firebaseio.com`);let o=ud(s,i),a=o.repoInfo,c;typeof process<"u"&&Lu&&(c=Lu[OT]),c?(s=`http://${c}?ns=${a.namespace}`,o=ud(s,i),a=o.repoInfo):o.repoInfo.secure;const l=new Kb(t.name,t.options,e);uT("Invalid Firebase Database URL",o),k(o.path)||pt("Database URL must point to the root of a Firebase Database (not including a child path).");const u=UT(a,t,l,new Yb(t,n));return new $T(u,t)}function FT(t,e){const n=pa[e];(!n||n[t.key]!==t)&&pt(`Database ${e}(${t.repoInfo_}) has already been deleted.`),ST(t),delete n[t.key]}function UT(t,e,n,r){let i=pa[e.name];i||(i={},pa[e.name]=i);let s=i[t.toURLString()];return s&&pt("Database initialized multiple times. Please make sure the format of the database URL matches with each database() call."),s=new gT(t,DT,n,r),i[t.toURLString()]=s,s}class $T{constructor(e,n){this._repoInternal=e,this.app=n,this.type="database",this._instanceStarted=!1}get _repo(){return this._instanceStarted||(mT(this._repoInternal,this.app.options.appId,this.app.options.databaseAuthVariableOverride),this._instanceStarted=!0),this._repoInternal}get _root(){return this._rootInternal||(this._rootInternal=new Qe(this._repo,P())),this._rootInternal}_delete(){return this._rootInternal!==null&&(FT(this._repo,this.app.name),this._repoInternal=null,this._rootInternal=null),Promise.resolve()}_checkNotDeleted(e){this._rootInternal===null&&pt("Cannot call "+e+" on a deleted database.")}}function BT(t=ec(),e){const n=ri(t,"database").getImmediate({identifier:e});if(!n._instanceStarted){const r=ew("database");r&&HT(n,...r)}return n}function HT(t,e,n,r={}){t=ce(t),t._checkNotDeleted("useEmulator");const i=`${e}:${n}`,s=t._repoInternal;if(t._instanceStarted){if(i===t._repoInternal.repoInfo_.host&&cn(r,s.repoInfo_.emulatorOptions))return;pt("connectDatabaseEmulator() cannot initialize or alter the emulator configuration after the database instance has started.")}let o;if(s.repoInfo_.nodeAdmin)r.mockUserToken&&pt('mockUserToken is not supported by the Admin SDK. For client access with mock users, please use the "firebase" package instead of "firebase-admin".'),o=new Li(Li.OWNER);else if(r.mockUserToken){const a=typeof r.mockUserToken=="string"?r.mockUserToken:tw(r.mockUserToken,t.app.options.projectId);o=new Li(a)}Zn(e)&&(Zh(e),ef("Database",!0)),MT(s,i,r,o)}/**
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
 */function WT(t){Lb(nr),Ut(new ht("database",(e,{instanceIdentifier:n})=>{const r=e.getProvider("app").getImmediate(),i=e.getProvider("auth-internal"),s=e.getProvider("app-check-internal");return xT(r,i,s,n)},"PUBLIC").setMultipleInstances(!0)),ct(Ou,Du,t),ct(Ou,Du,"esm2020")}lt.prototype.simpleListen=function(t,e){this.sendRequest("q",{p:t},e)};lt.prototype.echo=function(t,e){this.sendRequest("echo",{d:t},e)};WT();var jT="firebase",VT="12.4.0";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ct(jT,VT,"app");/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ga=new Map,Cp={activated:!1,tokenObservers:[]},zT={initialized:!1,enabled:!1};function Q(t){return ga.get(t)||{...Cp}}function GT(t,e){return ga.set(t,e),ga.get(t)}function Vs(){return zT}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Tp="https://content-firebaseappcheck.googleapis.com/v1",qT="exchangeRecaptchaEnterpriseToken",YT="exchangeDebugToken",fd={RETRIAL_MIN_WAIT:30*1e3,RETRIAL_MAX_WAIT:960*1e3},KT=1440*60*1e3;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class JT{constructor(e,n,r,i,s){if(this.operation=e,this.retryPolicy=n,this.getWaitDuration=r,this.lowerBound=i,this.upperBound=s,this.pending=null,this.nextErrorWaitInterval=i,i>s)throw new Error("Proactive refresh lower bound greater than upper bound!")}start(){this.nextErrorWaitInterval=this.lowerBound,this.process(!0).catch(()=>{})}stop(){this.pending&&(this.pending.reject("cancelled"),this.pending=null)}isRunning(){return!!this.pending}async process(e){this.stop();try{this.pending=new dt,this.pending.promise.catch(n=>{}),await XT(this.getNextRun(e)),this.pending.resolve(),await this.pending.promise,this.pending=new dt,this.pending.promise.catch(n=>{}),await this.operation(),this.pending.resolve(),await this.pending.promise,this.process(!0).catch(()=>{})}catch(n){this.retryPolicy(n)?this.process(!1).catch(()=>{}):this.stop()}}getNextRun(e){if(e)return this.nextErrorWaitInterval=this.lowerBound,this.getWaitDuration();{const n=this.nextErrorWaitInterval;return this.nextErrorWaitInterval*=2,this.nextErrorWaitInterval>this.upperBound&&(this.nextErrorWaitInterval=this.upperBound),n}}}function XT(t){return new Promise(e=>{setTimeout(e,t)})}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const QT={"already-initialized":"You have already called initializeAppCheck() for FirebaseApp {$appName} with different options. To avoid this error, call initializeAppCheck() with the same options as when it was originally called. This will return the already initialized instance.","use-before-activation":"App Check is being used before initializeAppCheck() is called for FirebaseApp {$appName}. Call initializeAppCheck() before instantiating other Firebase services.","fetch-network-error":"Fetch failed to connect to a network. Check Internet connection. Original error: {$originalErrorMessage}.","fetch-parse-error":"Fetch client could not parse response. Original error: {$originalErrorMessage}.","fetch-status-error":"Fetch server returned an HTTP error status. HTTP status: {$httpStatus}.","storage-open":"Error thrown when opening storage. Original error: {$originalErrorMessage}.","storage-get":"Error thrown when reading from storage. Original error: {$originalErrorMessage}.","storage-set":"Error thrown when writing to storage. Original error: {$originalErrorMessage}.","recaptcha-error":"ReCAPTCHA error.","initial-throttle":"{$httpStatus} error. Attempts allowed again after {$time}",throttled:"Requests throttled due to previous {$httpStatus} error. Attempts allowed again after {$time}"},ve=new er("appCheck","AppCheck",QT);/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function pd(t=!1){return t?self.grecaptcha?.enterprise:self.grecaptcha}function Fc(t){if(!Q(t).activated)throw ve.create("use-before-activation",{appName:t.name})}function Ip(t){const e=Math.round(t/1e3),n=Math.floor(e/(3600*24)),r=Math.floor((e-n*3600*24)/3600),i=Math.floor((e-n*3600*24-r*3600)/60),s=e-n*3600*24-r*3600-i*60;let o="";return n&&(o+=bi(n)+"d:"),r&&(o+=bi(r)+"h:"),o+=bi(i)+"m:"+bi(s)+"s",o}function bi(t){return t===0?"00":t>=10?t.toString():"0"+t}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Uc({url:t,body:e},n){const r={"Content-Type":"application/json"},i=n.getImmediate({optional:!0});if(i){const d=await i.getHeartbeatsHeader();d&&(r["X-Firebase-Client"]=d)}const s={method:"POST",body:JSON.stringify(e),headers:r};let o;try{o=await fetch(t,s)}catch(d){throw ve.create("fetch-network-error",{originalErrorMessage:d?.message})}if(o.status!==200)throw ve.create("fetch-status-error",{httpStatus:o.status});let a;try{a=await o.json()}catch(d){throw ve.create("fetch-parse-error",{originalErrorMessage:d?.message})}const c=a.ttl.match(/^([\d.]+)(s)$/);if(!c||!c[2]||isNaN(Number(c[1])))throw ve.create("fetch-parse-error",{originalErrorMessage:`ttl field (timeToLive) is not in standard Protobuf Duration format: ${a.ttl}`});const l=Number(c[1])*1e3,u=Date.now();return{token:a.token,expireTimeMillis:u+l,issuedAtTimeMillis:u}}function ZT(t,e){const{projectId:n,appId:r,apiKey:i}=t.options;return{url:`${Tp}/projects/${n}/apps/${r}:${qT}?key=${i}`,body:{recaptcha_enterprise_token:e}}}function kp(t,e){const{projectId:n,appId:r,apiKey:i}=t.options;return{url:`${Tp}/projects/${n}/apps/${r}:${YT}?key=${i}`,body:{debug_token:e}}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const eI="firebase-app-check-database",tI=1,qr="firebase-app-check-store",Rp="debug-token";let Si=null;function Ap(){return Si||(Si=new Promise((t,e)=>{try{const n=indexedDB.open(eI,tI);n.onsuccess=r=>{t(r.target.result)},n.onerror=r=>{e(ve.create("storage-open",{originalErrorMessage:r.target.error?.message}))},n.onupgradeneeded=r=>{const i=r.target.result;switch(r.oldVersion){case 0:i.createObjectStore(qr,{keyPath:"compositeKey"})}}}catch(n){e(ve.create("storage-open",{originalErrorMessage:n?.message}))}}),Si)}function nI(t){return Pp(Lp(t))}function rI(t,e){return Np(Lp(t),e)}function iI(t){return Np(Rp,t)}function sI(){return Pp(Rp)}async function Np(t,e){const r=(await Ap()).transaction(qr,"readwrite"),s=r.objectStore(qr).put({compositeKey:t,value:e});return new Promise((o,a)=>{s.onsuccess=c=>{o()},r.onerror=c=>{a(ve.create("storage-set",{originalErrorMessage:c.target.error?.message}))}})}async function Pp(t){const n=(await Ap()).transaction(qr,"readonly"),i=n.objectStore(qr).get(t);return new Promise((s,o)=>{i.onsuccess=a=>{const c=a.target.result;s(c?c.value:void 0)},n.onerror=a=>{o(ve.create("storage-get",{originalErrorMessage:a.target.error?.message}))}})}function Lp(t){return`${t.options.appId}-${t.name}`}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Tt=new Ps("@firebase/app-check");/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function oI(t){if(Qa()){let e;try{e=await nI(t)}catch(n){Tt.warn(`Failed to read token from IndexedDB. Error: ${n}`)}return e}}function Co(t,e){return Qa()?rI(t,e).catch(n=>{Tt.warn(`Failed to write token to IndexedDB. Error: ${n}`)}):Promise.resolve()}async function aI(){let t;try{t=await sI()}catch{}if(t)return t;{const e=crypto.randomUUID();return iI(e).catch(n=>Tt.warn(`Failed to persist debug token to IndexedDB. Error: ${n}`)),e}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function $c(){return Vs().enabled}async function Bc(){const t=Vs();if(t.enabled&&t.token)return t.token.promise;throw Error(`
            Can't get debug token in production mode.
        `)}function cI(){const t=Kh(),e=Vs();if(e.initialized=!0,typeof t.FIREBASE_APPCHECK_DEBUG_TOKEN!="string"&&t.FIREBASE_APPCHECK_DEBUG_TOKEN!==!0)return;e.enabled=!0;const n=new dt;e.token=n,typeof t.FIREBASE_APPCHECK_DEBUG_TOKEN=="string"?n.resolve(t.FIREBASE_APPCHECK_DEBUG_TOKEN):n.resolve(aI())}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const lI={error:"UNKNOWN_ERROR"};function uI(t){return Rs.encodeString(JSON.stringify(t),!1)}async function ma(t,e=!1,n=!1){const r=t.app;Fc(r);const i=Q(r);let s=i.token,o;if(s&&!wn(s)&&(i.token=void 0,s=void 0),!s){const l=await i.cachedTokenPromise;l&&(wn(l)?s=l:await Co(r,void 0))}if(!e&&s&&wn(s))return{token:s.token};let a=!1;if($c())try{i.exchangeTokenPromise||(i.exchangeTokenPromise=Uc(kp(r,await Bc()),t.heartbeatServiceProvider).finally(()=>{i.exchangeTokenPromise=void 0}),a=!0);const l=await i.exchangeTokenPromise;return await Co(r,l),i.token=l,{token:l.token}}catch(l){return l.code==="appCheck/throttled"||l.code==="appCheck/initial-throttle"?Tt.warn(l.message):n&&Tt.error(l),To(l)}try{i.exchangeTokenPromise||(i.exchangeTokenPromise=i.provider.getToken().finally(()=>{i.exchangeTokenPromise=void 0}),a=!0),s=await Q(r).exchangeTokenPromise}catch(l){l.code==="appCheck/throttled"||l.code==="appCheck/initial-throttle"?Tt.warn(l.message):n&&Tt.error(l),o=l}let c;return s?o?wn(s)?c={token:s.token,internalError:o}:c=To(o):(c={token:s.token},i.token=s,await Co(r,s)):c=To(o),a&&Mp(r,c),c}async function dI(t){const e=t.app;Fc(e);const{provider:n}=Q(e);if($c()){const r=await Bc(),{token:i}=await Uc(kp(e,r),t.heartbeatServiceProvider);return{token:i}}else{const{token:r}=await n.getToken();return{token:r}}}function Op(t,e,n,r){const{app:i}=t,s=Q(i),o={next:n,error:r,type:e};if(s.tokenObservers=[...s.tokenObservers,o],s.token&&wn(s.token)){const a=s.token;Promise.resolve().then(()=>{n({token:a.token}),gd(t)}).catch(()=>{})}s.cachedTokenPromise.then(()=>gd(t))}function Dp(t,e){const n=Q(t),r=n.tokenObservers.filter(i=>i.next!==e);r.length===0&&n.tokenRefresher&&n.tokenRefresher.isRunning()&&n.tokenRefresher.stop(),n.tokenObservers=r}function gd(t){const{app:e}=t,n=Q(e);let r=n.tokenRefresher;r||(r=hI(t),n.tokenRefresher=r),!r.isRunning()&&n.isTokenAutoRefreshEnabled&&r.start()}function hI(t){const{app:e}=t;return new JT(async()=>{const n=Q(e);let r;if(n.token?r=await ma(t,!0):r=await ma(t),r.error)throw r.error;if(r.internalError)throw r.internalError},()=>!0,()=>{const n=Q(e);if(n.token){let r=n.token.issuedAtTimeMillis+(n.token.expireTimeMillis-n.token.issuedAtTimeMillis)*.5+3e5;const i=n.token.expireTimeMillis-300*1e3;return r=Math.min(r,i),Math.max(0,r-Date.now())}else return 0},fd.RETRIAL_MIN_WAIT,fd.RETRIAL_MAX_WAIT)}function Mp(t,e){const n=Q(t).tokenObservers;for(const r of n)try{r.type==="EXTERNAL"&&e.error!=null?r.error(e.error):r.next(e)}catch{}}function wn(t){return t.expireTimeMillis-Date.now()>0}function To(t){return{token:uI(lI),error:t}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class fI{constructor(e,n){this.app=e,this.heartbeatServiceProvider=n}_delete(){const{tokenObservers:e}=Q(this.app);for(const n of e)Dp(this.app,n.next);return Promise.resolve()}}function pI(t,e){return new fI(t,e)}function gI(t){return{getToken:e=>ma(t,e),getLimitedUseToken:()=>dI(t),addTokenListener:e=>Op(t,"INTERNAL",e),removeTokenListener:e=>Dp(t.app,e)}}const mI="@firebase/app-check",_I="0.11.0",yI="https://www.google.com/recaptcha/enterprise.js";function EI(t,e){const n=new dt,r=Q(t);r.reCAPTCHAState={initialized:n};const i=vI(t),s=pd(!0);return s?md(t,e,s,i,n):SI(()=>{const o=pd(!0);if(!o)throw new Error("no recaptcha");md(t,e,o,i,n)}),n.promise}function md(t,e,n,r,i){n.ready(()=>{bI(t,e,n,r),i.resolve(n)})}function vI(t){const e=`fire_app_check_${t.name}`,n=document.createElement("div");return n.id=e,n.style.display="none",document.body.appendChild(n),e}async function wI(t){Fc(t);const n=await Q(t).reCAPTCHAState.initialized.promise;return new Promise((r,i)=>{const s=Q(t).reCAPTCHAState;n.ready(()=>{r(n.execute(s.widgetId,{action:"fire_app_check"}))})})}function bI(t,e,n,r){const i=n.render(r,{sitekey:e,size:"invisible",callback:()=>{Q(t).reCAPTCHAState.succeeded=!0},"error-callback":()=>{Q(t).reCAPTCHAState.succeeded=!1}}),s=Q(t);s.reCAPTCHAState={...s.reCAPTCHAState,widgetId:i}}function SI(t){const e=document.createElement("script");e.src=yI,e.onload=t,document.head.appendChild(e)}class Hc{constructor(e){this._siteKey=e,this._throttleData=null}async getToken(){TI(this._throttleData);const e=await wI(this._app).catch(r=>{throw ve.create("recaptcha-error")});if(!Q(this._app).reCAPTCHAState?.succeeded)throw ve.create("recaptcha-error");let n;try{n=await Uc(ZT(this._app,e),this._heartbeatServiceProvider)}catch(r){throw r.code?.includes("fetch-status-error")?(this._throttleData=CI(Number(r.customData?.httpStatus),this._throttleData),ve.create("initial-throttle",{time:Ip(this._throttleData.allowRequestsAfter-Date.now()),httpStatus:this._throttleData.httpStatus})):r}return this._throttleData=null,n}initialize(e){this._app=e,this._heartbeatServiceProvider=ri(e,"heartbeat"),EI(e,this._siteKey).catch(()=>{})}isEqual(e){return e instanceof Hc?this._siteKey===e._siteKey:!1}}function CI(t,e){if(t===404||t===403)return{backoffCount:1,allowRequestsAfter:Date.now()+KT,httpStatus:t};{const n=e?e.backoffCount:0,r=Sw(n,1e3,2);return{backoffCount:n+1,allowRequestsAfter:Date.now()+r,httpStatus:t}}}function TI(t){if(t&&Date.now()-t.allowRequestsAfter<=0)throw ve.create("throttled",{time:Ip(t.allowRequestsAfter-Date.now()),httpStatus:t.httpStatus})}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function II(t=ec(),e){t=ce(t);const n=ri(t,"app-check");if(Vs().initialized||cI(),$c()&&Bc().then(i=>console.log(`App Check debug token: ${i}. You will need to add it to your app's App Check settings in the Firebase console for it to work.`)),n.isInitialized()){const i=n.getImmediate(),s=n.getOptions();if(s.isTokenAutoRefreshEnabled===e.isTokenAutoRefreshEnabled&&s.provider.isEqual(e.provider))return i;throw ve.create("already-initialized",{appName:t.name})}const r=n.initialize({options:e});return kI(t,e.provider,e.isTokenAutoRefreshEnabled),Q(t).isTokenAutoRefreshEnabled&&Op(r,"INTERNAL",()=>{}),r}function kI(t,e,n=!1){const r=GT(t,{...Cp});r.activated=!0,r.provider=e,r.cachedTokenPromise=oI(t).then(i=>(i&&wn(i)&&(r.token=i,Mp(t,{token:i.token})),i)),r.isTokenAutoRefreshEnabled=n&&t.automaticDataCollectionEnabled,!t.automaticDataCollectionEnabled&&n&&Tt.warn("`isTokenAutoRefreshEnabled` is true but `automaticDataCollectionEnabled` was set to false during `initializeApp()`. This blocks automatic token refresh."),r.provider.initialize(t)}const RI="app-check",_d="app-check-internal";function AI(){Ut(new ht(RI,t=>{const e=t.getProvider("app").getImmediate(),n=t.getProvider("heartbeat");return pI(e,n)},"PUBLIC").setInstantiationMode("EXPLICIT").setInstanceCreatedCallback((t,e,n)=>{t.getProvider(_d).initialize()})),Ut(new ht(_d,t=>{const e=t.getProvider("app-check").getImmediate();return gI(e)},"PUBLIC").setInstantiationMode("EXPLICIT")),ct(mI,_I)}AI();const NI={apiKey:"AIzaSyA-fvCaKCjyEFX__YAVr1oPGdVsUEhFehA",authDomain:"vidu-aae11.firebaseapp.com",projectId:"vidu-aae11",databaseURL:"https://vidu-aae11-default-rtdb.europe-west1.firebasedatabase.app",storageBucket:"vidu-aae11.firebasestorage.app",messagingSenderId:"765724787439",appId:"1:765724787439:web:61a3b5dd538149564c911a",measurementId:"G-EGJ53HLGY4"},Wc=of(NI),yd="6LdLWRcsAAAAACUOtILeWfkB3q_3r9V5f5Ujvq4o";let _a;if(yd.trim()!=="")_a=new Hc(yd),console.info("[Firebase App Check: PROD] Initializing with ReCAPTCHA Enterprise.");else throw console.error("[Firebase App Check: PROD] VITE_RECAPTCHA_ENTERPRISE_SITE_KEY is missing or empty. App Check will NOT be initialized, leaving Firebase services unprotected!"),new Error("Firebase App Check configuration missing in production.");if(_a)try{II(Wc,{provider:_a,isTokenAutoRefreshEnabled:!0})}catch(t){console.error("[Firebase App Check] initializeAppCheck call failed:",t)}const oe=BT(Wc),Fe=[];function Qt(t,e,n,r=null,i=null,s=null){e==="value"?NT(t,n):e==="child_added"?PT(t,n):e==="child_removed"?LT(t,n):console.warn(`Unknown listener type: ${e}`),Fe.push({ref:t,type:e,callback:n,roomId:r,userId:i,category:s})}function PI(){Fe.forEach(({ref:t,type:e,callback:n})=>{try{js(t,e,n)}catch(r){console.warn("Failed to remove firebase rtdb listener",r)}}),Fe.length=0}function zs(t){if(!t)return;Fe.filter(r=>r.roomId===t).forEach(({ref:r,type:i,callback:s})=>{try{js(r,i,s)}catch(o){console.warn(`Failed to remove listener for room ${t}`,o)}});const n=Fe.filter(r=>r.roomId!==t);Fe.length=0,Fe.push(...n)}function LI(t,e){if(!t||!e)return;const n=s=>s.userId===t&&s.roomId===e;Fe.filter(n).forEach(({ref:s,type:o,callback:a})=>{try{js(s,o,a)}catch(c){console.warn(`Failed to remove listener for user ${t} in room ${e}`,c)}});const i=Fe.filter(s=>!n(s));Fe.length=0,Fe.push(...i)}function Di(t,e,n=null){Qt(t,"value",e,n)}const Gt=t=>se(oe,`rooms/${t}`),Ci=t=>se(oe,`rooms/${t}/members`),Ed=(t,e)=>se(oe,`rooms/${t}/members/${e}`),OI=t=>se(oe,`rooms/${t}/cancellation`),Gs=t=>se(oe,`rooms/${t}/watch`),DI=t=>se(oe,`users/${t}/recentCalls`),jc=(t,e)=>se(oe,`users/${t}/recentCalls/${e}`),Vc=t=>se(oe,`users/${t}/outgoingCall`),xp=t=>se(oe,`rooms/${t}/offerCandidates`),Fp=t=>se(oe,`rooms/${t}/answerCandidates`);function Up(){return{"dependent-sdk-initialized-before-auth":"Another Firebase SDK was initialized and is trying to use Auth before Auth is initialized. Please be sure to call `initializeAuth` or `getAuth` before starting any other Firebase SDK."}}const MI=Up,$p=new er("auth","Firebase",Up());/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const cs=new Ps("@firebase/auth");function xI(t,...e){cs.logLevel<=L.WARN&&cs.warn(`Auth (${nr}): ${t}`,...e)}function Mi(t,...e){cs.logLevel<=L.ERROR&&cs.error(`Auth (${nr}): ${t}`,...e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ke(t,...e){throw Gc(t,...e)}function He(t,...e){return Gc(t,...e)}function zc(t,e,n){const r={...MI(),[e]:n};return new er("auth","Firebase",r).create(e,{appName:t.name})}function rn(t){return zc(t,"operation-not-supported-in-this-environment","Operations that alter the current user are not supported in conjunction with FirebaseServerApp")}function FI(t,e,n){const r=n;if(!(e instanceof r))throw r.name!==e.constructor.name&&Ke(t,"argument-error"),zc(t,"argument-error",`Type of ${e.constructor.name} does not match expected instance.Did you pass a reference from a different Auth SDK?`)}function Gc(t,...e){if(typeof t!="string"){const n=e[0],r=[...e.slice(1)];return r[0]&&(r[0].appName=t.name),t._errorFactory.create(n,...r)}return $p.create(t,...e)}function b(t,e,...n){if(!t)throw Gc(e,...n)}function it(t){const e="INTERNAL ASSERTION FAILED: "+t;throw Mi(e),new Error(e)}function mt(t,e){t||it(e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ya(){return typeof self<"u"&&self.location?.href||""}function UI(){return vd()==="http:"||vd()==="https:"}function vd(){return typeof self<"u"&&self.location?.protocol||null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function $I(){return typeof navigator<"u"&&navigator&&"onLine"in navigator&&typeof navigator.onLine=="boolean"&&(UI()||sw()||"connection"in navigator)?navigator.onLine:!0}function BI(){if(typeof navigator>"u")return null;const t=navigator;return t.languages&&t.languages[0]||t.language||null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class di{constructor(e,n){this.shortDelay=e,this.longDelay=n,mt(n>e,"Short delay should be less than long delay!"),this.isMobile=Xa()||tf()}get(){return $I()?this.isMobile?this.longDelay:this.shortDelay:Math.min(5e3,this.shortDelay)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function qc(t,e){mt(t.emulator,"Emulator should always be set here");const{url:n}=t.emulator;return e?`${n}${e.startsWith("/")?e.slice(1):e}`:n}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Bp{static initialize(e,n,r){this.fetchImpl=e,n&&(this.headersImpl=n),r&&(this.responseImpl=r)}static fetch(){if(this.fetchImpl)return this.fetchImpl;if(typeof self<"u"&&"fetch"in self)return self.fetch;if(typeof globalThis<"u"&&globalThis.fetch)return globalThis.fetch;if(typeof fetch<"u")return fetch;it("Could not find fetch implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static headers(){if(this.headersImpl)return this.headersImpl;if(typeof self<"u"&&"Headers"in self)return self.Headers;if(typeof globalThis<"u"&&globalThis.Headers)return globalThis.Headers;if(typeof Headers<"u")return Headers;it("Could not find Headers implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static response(){if(this.responseImpl)return this.responseImpl;if(typeof self<"u"&&"Response"in self)return self.Response;if(typeof globalThis<"u"&&globalThis.Response)return globalThis.Response;if(typeof Response<"u")return Response;it("Could not find Response implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const HI={CREDENTIAL_MISMATCH:"custom-token-mismatch",MISSING_CUSTOM_TOKEN:"internal-error",INVALID_IDENTIFIER:"invalid-email",MISSING_CONTINUE_URI:"internal-error",INVALID_PASSWORD:"wrong-password",MISSING_PASSWORD:"missing-password",INVALID_LOGIN_CREDENTIALS:"invalid-credential",EMAIL_EXISTS:"email-already-in-use",PASSWORD_LOGIN_DISABLED:"operation-not-allowed",INVALID_IDP_RESPONSE:"invalid-credential",INVALID_PENDING_TOKEN:"invalid-credential",FEDERATED_USER_ID_ALREADY_LINKED:"credential-already-in-use",MISSING_REQ_TYPE:"internal-error",EMAIL_NOT_FOUND:"user-not-found",RESET_PASSWORD_EXCEED_LIMIT:"too-many-requests",EXPIRED_OOB_CODE:"expired-action-code",INVALID_OOB_CODE:"invalid-action-code",MISSING_OOB_CODE:"internal-error",CREDENTIAL_TOO_OLD_LOGIN_AGAIN:"requires-recent-login",INVALID_ID_TOKEN:"invalid-user-token",TOKEN_EXPIRED:"user-token-expired",USER_NOT_FOUND:"user-token-expired",TOO_MANY_ATTEMPTS_TRY_LATER:"too-many-requests",PASSWORD_DOES_NOT_MEET_REQUIREMENTS:"password-does-not-meet-requirements",INVALID_CODE:"invalid-verification-code",INVALID_SESSION_INFO:"invalid-verification-id",INVALID_TEMPORARY_PROOF:"invalid-credential",MISSING_SESSION_INFO:"missing-verification-id",SESSION_EXPIRED:"code-expired",MISSING_ANDROID_PACKAGE_NAME:"missing-android-pkg-name",UNAUTHORIZED_DOMAIN:"unauthorized-continue-uri",INVALID_OAUTH_CLIENT_ID:"invalid-oauth-client-id",ADMIN_ONLY_OPERATION:"admin-restricted-operation",INVALID_MFA_PENDING_CREDENTIAL:"invalid-multi-factor-session",MFA_ENROLLMENT_NOT_FOUND:"multi-factor-info-not-found",MISSING_MFA_ENROLLMENT_ID:"missing-multi-factor-info",MISSING_MFA_PENDING_CREDENTIAL:"missing-multi-factor-session",SECOND_FACTOR_EXISTS:"second-factor-already-in-use",SECOND_FACTOR_LIMIT_EXCEEDED:"maximum-second-factor-count-exceeded",BLOCKING_FUNCTION_ERROR_RESPONSE:"internal-error",RECAPTCHA_NOT_ENABLED:"recaptcha-not-enabled",MISSING_RECAPTCHA_TOKEN:"missing-recaptcha-token",INVALID_RECAPTCHA_TOKEN:"invalid-recaptcha-token",INVALID_RECAPTCHA_ACTION:"invalid-recaptcha-action",MISSING_CLIENT_TYPE:"missing-client-type",MISSING_RECAPTCHA_VERSION:"missing-recaptcha-version",INVALID_RECAPTCHA_VERSION:"invalid-recaptcha-version",INVALID_REQ_TYPE:"invalid-req-type"};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const WI=["/v1/accounts:signInWithCustomToken","/v1/accounts:signInWithEmailLink","/v1/accounts:signInWithIdp","/v1/accounts:signInWithPassword","/v1/accounts:signInWithPhoneNumber","/v1/token"],jI=new di(3e4,6e4);function Yc(t,e){return t.tenantId&&!e.tenantId?{...e,tenantId:t.tenantId}:e}async function or(t,e,n,r,i={}){return Hp(t,i,async()=>{let s={},o={};r&&(e==="GET"?o=r:s={body:JSON.stringify(r)});const a=tr({key:t.config.apiKey,...o}).slice(1),c=await t._getAdditionalHeaders();c["Content-Type"]="application/json",t.languageCode&&(c["X-Firebase-Locale"]=t.languageCode);const l={method:e,headers:c,...s};return iw()||(l.referrerPolicy="no-referrer"),t.emulatorConfig&&Zn(t.emulatorConfig.host)&&(l.credentials="include"),Bp.fetch()(await Wp(t,t.config.apiHost,n,a),l)})}async function Hp(t,e,n){t._canInitEmulator=!1;const r={...HI,...e};try{const i=new zI(t),s=await Promise.race([n(),i.promise]);i.clearNetworkTimeout();const o=await s.json();if("needConfirmation"in o)throw Ti(t,"account-exists-with-different-credential",o);if(s.ok&&!("errorMessage"in o))return o;{const a=s.ok?o.errorMessage:o.error.message,[c,l]=a.split(" : ");if(c==="FEDERATED_USER_ID_ALREADY_LINKED")throw Ti(t,"credential-already-in-use",o);if(c==="EMAIL_EXISTS")throw Ti(t,"email-already-in-use",o);if(c==="USER_DISABLED")throw Ti(t,"user-disabled",o);const u=r[c]||c.toLowerCase().replace(/[_\s]+/g,"-");if(l)throw zc(t,u,l);Ke(t,u)}}catch(i){if(i instanceof jt)throw i;Ke(t,"network-request-failed",{message:String(i)})}}async function VI(t,e,n,r,i={}){const s=await or(t,e,n,r,i);return"mfaPendingCredential"in s&&Ke(t,"multi-factor-auth-required",{_serverResponse:s}),s}async function Wp(t,e,n,r){const i=`${e}${n}?${r}`,s=t,o=s.config.emulator?qc(t.config,i):`${t.config.apiScheme}://${i}`;return WI.includes(n)&&(await s._persistenceManagerAvailable,s._getPersistenceType()==="COOKIE")?s._getPersistence()._getFinalTarget(o).toString():o}class zI{clearNetworkTimeout(){clearTimeout(this.timer)}constructor(e){this.auth=e,this.timer=null,this.promise=new Promise((n,r)=>{this.timer=setTimeout(()=>r(He(this.auth,"network-request-failed")),jI.get())})}}function Ti(t,e,n){const r={appName:t.name};n.email&&(r.email=n.email),n.phoneNumber&&(r.phoneNumber=n.phoneNumber);const i=He(t,e,r);return i.customData._tokenResponse=n,i}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function GI(t,e){return or(t,"POST","/v1/accounts:delete",e)}async function ls(t,e){return or(t,"POST","/v1/accounts:lookup",e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Rr(t){if(t)try{const e=new Date(Number(t));if(!isNaN(e.getTime()))return e.toUTCString()}catch{}}async function qI(t,e=!1){const n=ce(t),r=await n.getIdToken(e),i=Kc(r);b(i&&i.exp&&i.auth_time&&i.iat,n.auth,"internal-error");const s=typeof i.firebase=="object"?i.firebase:void 0,o=s?.sign_in_provider;return{claims:i,token:r,authTime:Rr(Io(i.auth_time)),issuedAtTime:Rr(Io(i.iat)),expirationTime:Rr(Io(i.exp)),signInProvider:o||null,signInSecondFactor:s?.sign_in_second_factor||null}}function Io(t){return Number(t)*1e3}function Kc(t){const[e,n,r]=t.split(".");if(e===void 0||n===void 0||r===void 0)return Mi("JWT malformed, contained fewer than 3 sections"),null;try{const i=Gi(n);return i?JSON.parse(i):(Mi("Failed to decode base64 JWT payload"),null)}catch(i){return Mi("Caught error parsing JWT payload as JSON",i?.toString()),null}}function wd(t){const e=Kc(t);return b(e,"internal-error"),b(typeof e.exp<"u","internal-error"),b(typeof e.iat<"u","internal-error"),Number(e.exp)-Number(e.iat)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Yr(t,e,n=!1){if(n)return e;try{return await e}catch(r){throw r instanceof jt&&YI(r)&&t.auth.currentUser===t&&await t.auth.signOut(),r}}function YI({code:t}){return t==="auth/user-disabled"||t==="auth/user-token-expired"}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class KI{constructor(e){this.user=e,this.isRunning=!1,this.timerId=null,this.errorBackoff=3e4}_start(){this.isRunning||(this.isRunning=!0,this.schedule())}_stop(){this.isRunning&&(this.isRunning=!1,this.timerId!==null&&clearTimeout(this.timerId))}getInterval(e){if(e){const n=this.errorBackoff;return this.errorBackoff=Math.min(this.errorBackoff*2,96e4),n}else{this.errorBackoff=3e4;const r=(this.user.stsTokenManager.expirationTime??0)-Date.now()-3e5;return Math.max(0,r)}}schedule(e=!1){if(!this.isRunning)return;const n=this.getInterval(e);this.timerId=setTimeout(async()=>{await this.iteration()},n)}async iteration(){try{await this.user.getIdToken(!0)}catch(e){e?.code==="auth/network-request-failed"&&this.schedule(!0);return}this.schedule()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ea{constructor(e,n){this.createdAt=e,this.lastLoginAt=n,this._initializeTime()}_initializeTime(){this.lastSignInTime=Rr(this.lastLoginAt),this.creationTime=Rr(this.createdAt)}_copy(e){this.createdAt=e.createdAt,this.lastLoginAt=e.lastLoginAt,this._initializeTime()}toJSON(){return{createdAt:this.createdAt,lastLoginAt:this.lastLoginAt}}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function us(t){const e=t.auth,n=await t.getIdToken(),r=await Yr(t,ls(e,{idToken:n}));b(r?.users.length,e,"internal-error");const i=r.users[0];t._notifyReloadListener(i);const s=i.providerUserInfo?.length?jp(i.providerUserInfo):[],o=XI(t.providerData,s),a=t.isAnonymous,c=!(t.email&&i.passwordHash)&&!o?.length,l=a?c:!1,u={uid:i.localId,displayName:i.displayName||null,photoURL:i.photoUrl||null,email:i.email||null,emailVerified:i.emailVerified||!1,phoneNumber:i.phoneNumber||null,tenantId:i.tenantId||null,providerData:o,metadata:new Ea(i.createdAt,i.lastLoginAt),isAnonymous:l};Object.assign(t,u)}async function JI(t){const e=ce(t);await us(e),await e.auth._persistUserIfCurrent(e),e.auth._notifyListenersIfCurrent(e)}function XI(t,e){return[...t.filter(r=>!e.some(i=>i.providerId===r.providerId)),...e]}function jp(t){return t.map(({providerId:e,...n})=>({providerId:e,uid:n.rawId||"",displayName:n.displayName||null,email:n.email||null,phoneNumber:n.phoneNumber||null,photoURL:n.photoUrl||null}))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function QI(t,e){const n=await Hp(t,{},async()=>{const r=tr({grant_type:"refresh_token",refresh_token:e}).slice(1),{tokenApiHost:i,apiKey:s}=t.config,o=await Wp(t,i,"/v1/token",`key=${s}`),a=await t._getAdditionalHeaders();a["Content-Type"]="application/x-www-form-urlencoded";const c={method:"POST",headers:a,body:r};return t.emulatorConfig&&Zn(t.emulatorConfig.host)&&(c.credentials="include"),Bp.fetch()(o,c)});return{accessToken:n.access_token,expiresIn:n.expires_in,refreshToken:n.refresh_token}}async function ZI(t,e){return or(t,"POST","/v2/accounts:revokeToken",Yc(t,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Tn{constructor(){this.refreshToken=null,this.accessToken=null,this.expirationTime=null}get isExpired(){return!this.expirationTime||Date.now()>this.expirationTime-3e4}updateFromServerResponse(e){b(e.idToken,"internal-error"),b(typeof e.idToken<"u","internal-error"),b(typeof e.refreshToken<"u","internal-error");const n="expiresIn"in e&&typeof e.expiresIn<"u"?Number(e.expiresIn):wd(e.idToken);this.updateTokensAndExpiration(e.idToken,e.refreshToken,n)}updateFromIdToken(e){b(e.length!==0,"internal-error");const n=wd(e);this.updateTokensAndExpiration(e,null,n)}async getToken(e,n=!1){return!n&&this.accessToken&&!this.isExpired?this.accessToken:(b(this.refreshToken,e,"user-token-expired"),this.refreshToken?(await this.refresh(e,this.refreshToken),this.accessToken):null)}clearRefreshToken(){this.refreshToken=null}async refresh(e,n){const{accessToken:r,refreshToken:i,expiresIn:s}=await QI(e,n);this.updateTokensAndExpiration(r,i,Number(s))}updateTokensAndExpiration(e,n,r){this.refreshToken=n||null,this.accessToken=e||null,this.expirationTime=Date.now()+r*1e3}static fromJSON(e,n){const{refreshToken:r,accessToken:i,expirationTime:s}=n,o=new Tn;return r&&(b(typeof r=="string","internal-error",{appName:e}),o.refreshToken=r),i&&(b(typeof i=="string","internal-error",{appName:e}),o.accessToken=i),s&&(b(typeof s=="number","internal-error",{appName:e}),o.expirationTime=s),o}toJSON(){return{refreshToken:this.refreshToken,accessToken:this.accessToken,expirationTime:this.expirationTime}}_assign(e){this.accessToken=e.accessToken,this.refreshToken=e.refreshToken,this.expirationTime=e.expirationTime}_clone(){return Object.assign(new Tn,this.toJSON())}_performRefresh(){return it("not implemented")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Et(t,e){b(typeof t=="string"||typeof t>"u","internal-error",{appName:e})}class Ue{constructor({uid:e,auth:n,stsTokenManager:r,...i}){this.providerId="firebase",this.proactiveRefresh=new KI(this),this.reloadUserInfo=null,this.reloadListener=null,this.uid=e,this.auth=n,this.stsTokenManager=r,this.accessToken=r.accessToken,this.displayName=i.displayName||null,this.email=i.email||null,this.emailVerified=i.emailVerified||!1,this.phoneNumber=i.phoneNumber||null,this.photoURL=i.photoURL||null,this.isAnonymous=i.isAnonymous||!1,this.tenantId=i.tenantId||null,this.providerData=i.providerData?[...i.providerData]:[],this.metadata=new Ea(i.createdAt||void 0,i.lastLoginAt||void 0)}async getIdToken(e){const n=await Yr(this,this.stsTokenManager.getToken(this.auth,e));return b(n,this.auth,"internal-error"),this.accessToken!==n&&(this.accessToken=n,await this.auth._persistUserIfCurrent(this),this.auth._notifyListenersIfCurrent(this)),n}getIdTokenResult(e){return qI(this,e)}reload(){return JI(this)}_assign(e){this!==e&&(b(this.uid===e.uid,this.auth,"internal-error"),this.displayName=e.displayName,this.photoURL=e.photoURL,this.email=e.email,this.emailVerified=e.emailVerified,this.phoneNumber=e.phoneNumber,this.isAnonymous=e.isAnonymous,this.tenantId=e.tenantId,this.providerData=e.providerData.map(n=>({...n})),this.metadata._copy(e.metadata),this.stsTokenManager._assign(e.stsTokenManager))}_clone(e){const n=new Ue({...this,auth:e,stsTokenManager:this.stsTokenManager._clone()});return n.metadata._copy(this.metadata),n}_onReload(e){b(!this.reloadListener,this.auth,"internal-error"),this.reloadListener=e,this.reloadUserInfo&&(this._notifyReloadListener(this.reloadUserInfo),this.reloadUserInfo=null)}_notifyReloadListener(e){this.reloadListener?this.reloadListener(e):this.reloadUserInfo=e}_startProactiveRefresh(){this.proactiveRefresh._start()}_stopProactiveRefresh(){this.proactiveRefresh._stop()}async _updateTokensIfNecessary(e,n=!1){let r=!1;e.idToken&&e.idToken!==this.stsTokenManager.accessToken&&(this.stsTokenManager.updateFromServerResponse(e),r=!0),n&&await us(this),await this.auth._persistUserIfCurrent(this),r&&this.auth._notifyListenersIfCurrent(this)}async delete(){if(De(this.auth.app))return Promise.reject(rn(this.auth));const e=await this.getIdToken();return await Yr(this,GI(this.auth,{idToken:e})),this.stsTokenManager.clearRefreshToken(),this.auth.signOut()}toJSON(){return{uid:this.uid,email:this.email||void 0,emailVerified:this.emailVerified,displayName:this.displayName||void 0,isAnonymous:this.isAnonymous,photoURL:this.photoURL||void 0,phoneNumber:this.phoneNumber||void 0,tenantId:this.tenantId||void 0,providerData:this.providerData.map(e=>({...e})),stsTokenManager:this.stsTokenManager.toJSON(),_redirectEventId:this._redirectEventId,...this.metadata.toJSON(),apiKey:this.auth.config.apiKey,appName:this.auth.name}}get refreshToken(){return this.stsTokenManager.refreshToken||""}static _fromJSON(e,n){const r=n.displayName??void 0,i=n.email??void 0,s=n.phoneNumber??void 0,o=n.photoURL??void 0,a=n.tenantId??void 0,c=n._redirectEventId??void 0,l=n.createdAt??void 0,u=n.lastLoginAt??void 0,{uid:d,emailVerified:h,isAnonymous:f,providerData:p,stsTokenManager:y}=n;b(d&&y,e,"internal-error");const m=Tn.fromJSON(this.name,y);b(typeof d=="string",e,"internal-error"),Et(r,e.name),Et(i,e.name),b(typeof h=="boolean",e,"internal-error"),b(typeof f=="boolean",e,"internal-error"),Et(s,e.name),Et(o,e.name),Et(a,e.name),Et(c,e.name),Et(l,e.name),Et(u,e.name);const A=new Ue({uid:d,auth:e,email:i,emailVerified:h,displayName:r,isAnonymous:f,photoURL:o,phoneNumber:s,tenantId:a,stsTokenManager:m,createdAt:l,lastLoginAt:u});return p&&Array.isArray(p)&&(A.providerData=p.map(N=>({...N}))),c&&(A._redirectEventId=c),A}static async _fromIdTokenResponse(e,n,r=!1){const i=new Tn;i.updateFromServerResponse(n);const s=new Ue({uid:n.localId,auth:e,stsTokenManager:i,isAnonymous:r});return await us(s),s}static async _fromGetAccountInfoResponse(e,n,r){const i=n.users[0];b(i.localId!==void 0,"internal-error");const s=i.providerUserInfo!==void 0?jp(i.providerUserInfo):[],o=!(i.email&&i.passwordHash)&&!s?.length,a=new Tn;a.updateFromIdToken(r);const c=new Ue({uid:i.localId,auth:e,stsTokenManager:a,isAnonymous:o}),l={uid:i.localId,displayName:i.displayName||null,photoURL:i.photoUrl||null,email:i.email||null,emailVerified:i.emailVerified||!1,phoneNumber:i.phoneNumber||null,tenantId:i.tenantId||null,providerData:s,metadata:new Ea(i.createdAt,i.lastLoginAt),isAnonymous:!(i.email&&i.passwordHash)&&!s?.length};return Object.assign(c,l),c}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const bd=new Map;function st(t){mt(t instanceof Function,"Expected a class definition");let e=bd.get(t);return e?(mt(e instanceof t,"Instance stored in cache mismatched with class"),e):(e=new t,bd.set(t,e),e)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Vp{constructor(){this.type="NONE",this.storage={}}async _isAvailable(){return!0}async _set(e,n){this.storage[e]=n}async _get(e){const n=this.storage[e];return n===void 0?null:n}async _remove(e){delete this.storage[e]}_addListener(e,n){}_removeListener(e,n){}}Vp.type="NONE";const va=Vp;/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function xi(t,e,n){return`firebase:${t}:${e}:${n}`}class In{constructor(e,n,r){this.persistence=e,this.auth=n,this.userKey=r;const{config:i,name:s}=this.auth;this.fullUserKey=xi(this.userKey,i.apiKey,s),this.fullPersistenceKey=xi("persistence",i.apiKey,s),this.boundEventHandler=n._onStorageEvent.bind(n),this.persistence._addListener(this.fullUserKey,this.boundEventHandler)}setCurrentUser(e){return this.persistence._set(this.fullUserKey,e.toJSON())}async getCurrentUser(){const e=await this.persistence._get(this.fullUserKey);if(!e)return null;if(typeof e=="string"){const n=await ls(this.auth,{idToken:e}).catch(()=>{});return n?Ue._fromGetAccountInfoResponse(this.auth,n,e):null}return Ue._fromJSON(this.auth,e)}removeCurrentUser(){return this.persistence._remove(this.fullUserKey)}savePersistenceForRedirect(){return this.persistence._set(this.fullPersistenceKey,this.persistence.type)}async setPersistence(e){if(this.persistence===e)return;const n=await this.getCurrentUser();if(await this.removeCurrentUser(),this.persistence=e,n)return this.setCurrentUser(n)}delete(){this.persistence._removeListener(this.fullUserKey,this.boundEventHandler)}static async create(e,n,r="authUser"){if(!n.length)return new In(st(va),e,r);const i=(await Promise.all(n.map(async l=>{if(await l._isAvailable())return l}))).filter(l=>l);let s=i[0]||st(va);const o=xi(r,e.config.apiKey,e.name);let a=null;for(const l of n)try{const u=await l._get(o);if(u){let d;if(typeof u=="string"){const h=await ls(e,{idToken:u}).catch(()=>{});if(!h)break;d=await Ue._fromGetAccountInfoResponse(e,h,u)}else d=Ue._fromJSON(e,u);l!==s&&(a=d),s=l;break}}catch{}const c=i.filter(l=>l._shouldAllowMigration);return!s._shouldAllowMigration||!c.length?new In(s,e,r):(s=c[0],a&&await s._set(o,a.toJSON()),await Promise.all(n.map(async l=>{if(l!==s)try{await l._remove(o)}catch{}})),new In(s,e,r))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Sd(t){const e=t.toLowerCase();if(e.includes("opera/")||e.includes("opr/")||e.includes("opios/"))return"Opera";if(Yp(e))return"IEMobile";if(e.includes("msie")||e.includes("trident/"))return"IE";if(e.includes("edge/"))return"Edge";if(zp(e))return"Firefox";if(e.includes("silk/"))return"Silk";if(Jp(e))return"Blackberry";if(Xp(e))return"Webos";if(Gp(e))return"Safari";if((e.includes("chrome/")||qp(e))&&!e.includes("edge/"))return"Chrome";if(Kp(e))return"Android";{const n=/([a-zA-Z\d\.]+)\/[a-zA-Z\d\.]*$/,r=t.match(n);if(r?.length===2)return r[1]}return"Other"}function zp(t=me()){return/firefox\//i.test(t)}function Gp(t=me()){const e=t.toLowerCase();return e.includes("safari/")&&!e.includes("chrome/")&&!e.includes("crios/")&&!e.includes("android")}function qp(t=me()){return/crios\//i.test(t)}function Yp(t=me()){return/iemobile/i.test(t)}function Kp(t=me()){return/android/i.test(t)}function Jp(t=me()){return/blackberry/i.test(t)}function Xp(t=me()){return/webos/i.test(t)}function Jc(t=me()){return/iphone|ipad|ipod/i.test(t)||/macintosh/i.test(t)&&/mobile/i.test(t)}function ek(t=me()){return Jc(t)&&!!window.navigator?.standalone}function tk(){return ow()&&document.documentMode===10}function Qp(t=me()){return Jc(t)||Kp(t)||Xp(t)||Jp(t)||/windows phone/i.test(t)||Yp(t)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Zp(t,e=[]){let n;switch(t){case"Browser":n=Sd(me());break;case"Worker":n=`${Sd(me())}-${t}`;break;default:n=t}const r=e.length?e.join(","):"FirebaseCore-web";return`${n}/JsCore/${nr}/${r}`}/**
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
 */class nk{constructor(e){this.auth=e,this.queue=[]}pushCallback(e,n){const r=s=>new Promise((o,a)=>{try{const c=e(s);o(c)}catch(c){a(c)}});r.onAbort=n,this.queue.push(r);const i=this.queue.length-1;return()=>{this.queue[i]=()=>Promise.resolve()}}async runMiddleware(e){if(this.auth.currentUser===e)return;const n=[];try{for(const r of this.queue)await r(e),r.onAbort&&n.push(r.onAbort)}catch(r){n.reverse();for(const i of n)try{i()}catch{}throw this.auth._errorFactory.create("login-blocked",{originalMessage:r?.message})}}}/**
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
 */async function rk(t,e={}){return or(t,"GET","/v2/passwordPolicy",Yc(t,e))}/**
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
 */const ik=6;class sk{constructor(e){const n=e.customStrengthOptions;this.customStrengthOptions={},this.customStrengthOptions.minPasswordLength=n.minPasswordLength??ik,n.maxPasswordLength&&(this.customStrengthOptions.maxPasswordLength=n.maxPasswordLength),n.containsLowercaseCharacter!==void 0&&(this.customStrengthOptions.containsLowercaseLetter=n.containsLowercaseCharacter),n.containsUppercaseCharacter!==void 0&&(this.customStrengthOptions.containsUppercaseLetter=n.containsUppercaseCharacter),n.containsNumericCharacter!==void 0&&(this.customStrengthOptions.containsNumericCharacter=n.containsNumericCharacter),n.containsNonAlphanumericCharacter!==void 0&&(this.customStrengthOptions.containsNonAlphanumericCharacter=n.containsNonAlphanumericCharacter),this.enforcementState=e.enforcementState,this.enforcementState==="ENFORCEMENT_STATE_UNSPECIFIED"&&(this.enforcementState="OFF"),this.allowedNonAlphanumericCharacters=e.allowedNonAlphanumericCharacters?.join("")??"",this.forceUpgradeOnSignin=e.forceUpgradeOnSignin??!1,this.schemaVersion=e.schemaVersion}validatePassword(e){const n={isValid:!0,passwordPolicy:this};return this.validatePasswordLengthOptions(e,n),this.validatePasswordCharacterOptions(e,n),n.isValid&&(n.isValid=n.meetsMinPasswordLength??!0),n.isValid&&(n.isValid=n.meetsMaxPasswordLength??!0),n.isValid&&(n.isValid=n.containsLowercaseLetter??!0),n.isValid&&(n.isValid=n.containsUppercaseLetter??!0),n.isValid&&(n.isValid=n.containsNumericCharacter??!0),n.isValid&&(n.isValid=n.containsNonAlphanumericCharacter??!0),n}validatePasswordLengthOptions(e,n){const r=this.customStrengthOptions.minPasswordLength,i=this.customStrengthOptions.maxPasswordLength;r&&(n.meetsMinPasswordLength=e.length>=r),i&&(n.meetsMaxPasswordLength=e.length<=i)}validatePasswordCharacterOptions(e,n){this.updatePasswordCharacterOptionsStatuses(n,!1,!1,!1,!1);let r;for(let i=0;i<e.length;i++)r=e.charAt(i),this.updatePasswordCharacterOptionsStatuses(n,r>="a"&&r<="z",r>="A"&&r<="Z",r>="0"&&r<="9",this.allowedNonAlphanumericCharacters.includes(r))}updatePasswordCharacterOptionsStatuses(e,n,r,i,s){this.customStrengthOptions.containsLowercaseLetter&&(e.containsLowercaseLetter||(e.containsLowercaseLetter=n)),this.customStrengthOptions.containsUppercaseLetter&&(e.containsUppercaseLetter||(e.containsUppercaseLetter=r)),this.customStrengthOptions.containsNumericCharacter&&(e.containsNumericCharacter||(e.containsNumericCharacter=i)),this.customStrengthOptions.containsNonAlphanumericCharacter&&(e.containsNonAlphanumericCharacter||(e.containsNonAlphanumericCharacter=s))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ok{constructor(e,n,r,i){this.app=e,this.heartbeatServiceProvider=n,this.appCheckServiceProvider=r,this.config=i,this.currentUser=null,this.emulatorConfig=null,this.operations=Promise.resolve(),this.authStateSubscription=new Cd(this),this.idTokenSubscription=new Cd(this),this.beforeStateQueue=new nk(this),this.redirectUser=null,this.isProactiveRefreshEnabled=!1,this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION=1,this._canInitEmulator=!0,this._isInitialized=!1,this._deleted=!1,this._initializationPromise=null,this._popupRedirectResolver=null,this._errorFactory=$p,this._agentRecaptchaConfig=null,this._tenantRecaptchaConfigs={},this._projectPasswordPolicy=null,this._tenantPasswordPolicies={},this._resolvePersistenceManagerAvailable=void 0,this.lastNotifiedUid=void 0,this.languageCode=null,this.tenantId=null,this.settings={appVerificationDisabledForTesting:!1},this.frameworks=[],this.name=e.name,this.clientVersion=i.sdkClientVersion,this._persistenceManagerAvailable=new Promise(s=>this._resolvePersistenceManagerAvailable=s)}_initializeWithPersistence(e,n){return n&&(this._popupRedirectResolver=st(n)),this._initializationPromise=this.queue(async()=>{if(!this._deleted&&(this.persistenceManager=await In.create(this,e),this._resolvePersistenceManagerAvailable?.(),!this._deleted)){if(this._popupRedirectResolver?._shouldInitProactively)try{await this._popupRedirectResolver._initialize(this)}catch{}await this.initializeCurrentUser(n),this.lastNotifiedUid=this.currentUser?.uid||null,!this._deleted&&(this._isInitialized=!0)}}),this._initializationPromise}async _onStorageEvent(){if(this._deleted)return;const e=await this.assertedPersistence.getCurrentUser();if(!(!this.currentUser&&!e)){if(this.currentUser&&e&&this.currentUser.uid===e.uid){this._currentUser._assign(e),await this.currentUser.getIdToken();return}await this._updateCurrentUser(e,!0)}}async initializeCurrentUserFromIdToken(e){try{const n=await ls(this,{idToken:e}),r=await Ue._fromGetAccountInfoResponse(this,n,e);await this.directlySetCurrentUser(r)}catch(n){console.warn("FirebaseServerApp could not login user with provided authIdToken: ",n),await this.directlySetCurrentUser(null)}}async initializeCurrentUser(e){if(De(this.app)){const s=this.app.settings.authIdToken;return s?new Promise(o=>{setTimeout(()=>this.initializeCurrentUserFromIdToken(s).then(o,o))}):this.directlySetCurrentUser(null)}const n=await this.assertedPersistence.getCurrentUser();let r=n,i=!1;if(e&&this.config.authDomain){await this.getOrInitRedirectPersistenceManager();const s=this.redirectUser?._redirectEventId,o=r?._redirectEventId,a=await this.tryRedirectSignIn(e);(!s||s===o)&&a?.user&&(r=a.user,i=!0)}if(!r)return this.directlySetCurrentUser(null);if(!r._redirectEventId){if(i)try{await this.beforeStateQueue.runMiddleware(r)}catch(s){r=n,this._popupRedirectResolver._overrideRedirectResult(this,()=>Promise.reject(s))}return r?this.reloadAndSetCurrentUserOrClear(r):this.directlySetCurrentUser(null)}return b(this._popupRedirectResolver,this,"argument-error"),await this.getOrInitRedirectPersistenceManager(),this.redirectUser&&this.redirectUser._redirectEventId===r._redirectEventId?this.directlySetCurrentUser(r):this.reloadAndSetCurrentUserOrClear(r)}async tryRedirectSignIn(e){let n=null;try{n=await this._popupRedirectResolver._completeRedirectFn(this,e,!0)}catch{await this._setRedirectUser(null)}return n}async reloadAndSetCurrentUserOrClear(e){try{await us(e)}catch(n){if(n?.code!=="auth/network-request-failed")return this.directlySetCurrentUser(null)}return this.directlySetCurrentUser(e)}useDeviceLanguage(){this.languageCode=BI()}async _delete(){this._deleted=!0}async updateCurrentUser(e){if(De(this.app))return Promise.reject(rn(this));const n=e?ce(e):null;return n&&b(n.auth.config.apiKey===this.config.apiKey,this,"invalid-user-token"),this._updateCurrentUser(n&&n._clone(this))}async _updateCurrentUser(e,n=!1){if(!this._deleted)return e&&b(this.tenantId===e.tenantId,this,"tenant-id-mismatch"),n||await this.beforeStateQueue.runMiddleware(e),this.queue(async()=>{await this.directlySetCurrentUser(e),this.notifyAuthListeners()})}async signOut(){return De(this.app)?Promise.reject(rn(this)):(await this.beforeStateQueue.runMiddleware(null),(this.redirectPersistenceManager||this._popupRedirectResolver)&&await this._setRedirectUser(null),this._updateCurrentUser(null,!0))}setPersistence(e){return De(this.app)?Promise.reject(rn(this)):this.queue(async()=>{await this.assertedPersistence.setPersistence(st(e))})}_getRecaptchaConfig(){return this.tenantId==null?this._agentRecaptchaConfig:this._tenantRecaptchaConfigs[this.tenantId]}async validatePassword(e){this._getPasswordPolicyInternal()||await this._updatePasswordPolicy();const n=this._getPasswordPolicyInternal();return n.schemaVersion!==this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION?Promise.reject(this._errorFactory.create("unsupported-password-policy-schema-version",{})):n.validatePassword(e)}_getPasswordPolicyInternal(){return this.tenantId===null?this._projectPasswordPolicy:this._tenantPasswordPolicies[this.tenantId]}async _updatePasswordPolicy(){const e=await rk(this),n=new sk(e);this.tenantId===null?this._projectPasswordPolicy=n:this._tenantPasswordPolicies[this.tenantId]=n}_getPersistenceType(){return this.assertedPersistence.persistence.type}_getPersistence(){return this.assertedPersistence.persistence}_updateErrorMap(e){this._errorFactory=new er("auth","Firebase",e())}onAuthStateChanged(e,n,r){return this.registerStateListener(this.authStateSubscription,e,n,r)}beforeAuthStateChanged(e,n){return this.beforeStateQueue.pushCallback(e,n)}onIdTokenChanged(e,n,r){return this.registerStateListener(this.idTokenSubscription,e,n,r)}authStateReady(){return new Promise((e,n)=>{if(this.currentUser)e();else{const r=this.onAuthStateChanged(()=>{r(),e()},n)}})}async revokeAccessToken(e){if(this.currentUser){const n=await this.currentUser.getIdToken(),r={providerId:"apple.com",tokenType:"ACCESS_TOKEN",token:e,idToken:n};this.tenantId!=null&&(r.tenantId=this.tenantId),await ZI(this,r)}}toJSON(){return{apiKey:this.config.apiKey,authDomain:this.config.authDomain,appName:this.name,currentUser:this._currentUser?.toJSON()}}async _setRedirectUser(e,n){const r=await this.getOrInitRedirectPersistenceManager(n);return e===null?r.removeCurrentUser():r.setCurrentUser(e)}async getOrInitRedirectPersistenceManager(e){if(!this.redirectPersistenceManager){const n=e&&st(e)||this._popupRedirectResolver;b(n,this,"argument-error"),this.redirectPersistenceManager=await In.create(this,[st(n._redirectPersistence)],"redirectUser"),this.redirectUser=await this.redirectPersistenceManager.getCurrentUser()}return this.redirectPersistenceManager}async _redirectUserForId(e){return this._isInitialized&&await this.queue(async()=>{}),this._currentUser?._redirectEventId===e?this._currentUser:this.redirectUser?._redirectEventId===e?this.redirectUser:null}async _persistUserIfCurrent(e){if(e===this.currentUser)return this.queue(async()=>this.directlySetCurrentUser(e))}_notifyListenersIfCurrent(e){e===this.currentUser&&this.notifyAuthListeners()}_key(){return`${this.config.authDomain}:${this.config.apiKey}:${this.name}`}_startProactiveRefresh(){this.isProactiveRefreshEnabled=!0,this.currentUser&&this._currentUser._startProactiveRefresh()}_stopProactiveRefresh(){this.isProactiveRefreshEnabled=!1,this.currentUser&&this._currentUser._stopProactiveRefresh()}get _currentUser(){return this.currentUser}notifyAuthListeners(){if(!this._isInitialized)return;this.idTokenSubscription.next(this.currentUser);const e=this.currentUser?.uid??null;this.lastNotifiedUid!==e&&(this.lastNotifiedUid=e,this.authStateSubscription.next(this.currentUser))}registerStateListener(e,n,r,i){if(this._deleted)return()=>{};const s=typeof n=="function"?n:n.next.bind(n);let o=!1;const a=this._isInitialized?Promise.resolve():this._initializationPromise;if(b(a,this,"internal-error"),a.then(()=>{o||s(this.currentUser)}),typeof n=="function"){const c=e.addObserver(n,r,i);return()=>{o=!0,c()}}else{const c=e.addObserver(n);return()=>{o=!0,c()}}}async directlySetCurrentUser(e){this.currentUser&&this.currentUser!==e&&this._currentUser._stopProactiveRefresh(),e&&this.isProactiveRefreshEnabled&&e._startProactiveRefresh(),this.currentUser=e,e?await this.assertedPersistence.setCurrentUser(e):await this.assertedPersistence.removeCurrentUser()}queue(e){return this.operations=this.operations.then(e,e),this.operations}get assertedPersistence(){return b(this.persistenceManager,this,"internal-error"),this.persistenceManager}_logFramework(e){!e||this.frameworks.includes(e)||(this.frameworks.push(e),this.frameworks.sort(),this.clientVersion=Zp(this.config.clientPlatform,this._getFrameworks()))}_getFrameworks(){return this.frameworks}async _getAdditionalHeaders(){const e={"X-Client-Version":this.clientVersion};this.app.options.appId&&(e["X-Firebase-gmpid"]=this.app.options.appId);const n=await this.heartbeatServiceProvider.getImmediate({optional:!0})?.getHeartbeatsHeader();n&&(e["X-Firebase-Client"]=n);const r=await this._getAppCheckToken();return r&&(e["X-Firebase-AppCheck"]=r),e}async _getAppCheckToken(){if(De(this.app)&&this.app.settings.appCheckToken)return this.app.settings.appCheckToken;const e=await this.appCheckServiceProvider.getImmediate({optional:!0})?.getToken();return e?.error&&xI(`Error while retrieving App Check token: ${e.error}`),e?.token}}function ar(t){return ce(t)}class Cd{constructor(e){this.auth=e,this.observer=null,this.addObserver=gw(n=>this.observer=n)}get next(){return b(this.observer,this.auth,"internal-error"),this.observer.next.bind(this.observer)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Xc={async loadJS(){throw new Error("Unable to load external scripts")},recaptchaV2Script:"",recaptchaEnterpriseScript:"",gapiScript:""};function ak(t){Xc=t}function ck(t){return Xc.loadJS(t)}function lk(){return Xc.gapiScript}function uk(t){return`__${t}${Math.floor(Math.random()*1e6)}`}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function dk(t,e){const n=ri(t,"auth");if(n.isInitialized()){const i=n.getImmediate(),s=n.getOptions();if(cn(s,e??{}))return i;Ke(i,"already-initialized")}return n.initialize({options:e})}function hk(t,e){const n=e?.persistence||[],r=(Array.isArray(n)?n:[n]).map(st);e?.errorMap&&t._updateErrorMap(e.errorMap),t._initializeWithPersistence(r,e?.popupRedirectResolver)}function fk(t,e,n){const r=ar(t);b(/^https?:\/\//.test(e),r,"invalid-emulator-scheme");const i=!1,s=eg(e),{host:o,port:a}=pk(e),c=a===null?"":`:${a}`,l={url:`${s}//${o}${c}/`},u=Object.freeze({host:o,port:a,protocol:s.replace(":",""),options:Object.freeze({disableWarnings:i})});if(!r._canInitEmulator){b(r.config.emulator&&r.emulatorConfig,r,"emulator-config-failed"),b(cn(l,r.config.emulator)&&cn(u,r.emulatorConfig),r,"emulator-config-failed");return}r.config.emulator=l,r.emulatorConfig=u,r.settings.appVerificationDisabledForTesting=!0,Zn(o)?(Zh(`${s}//${o}${c}`),ef("Auth",!0)):gk()}function eg(t){const e=t.indexOf(":");return e<0?"":t.substr(0,e+1)}function pk(t){const e=eg(t),n=/(\/\/)?([^?#/]+)/.exec(t.substr(e.length));if(!n)return{host:"",port:null};const r=n[2].split("@").pop()||"",i=/^(\[[^\]]+\])(:|$)/.exec(r);if(i){const s=i[1];return{host:s,port:Td(r.substr(s.length+1))}}else{const[s,o]=r.split(":");return{host:s,port:Td(o)}}}function Td(t){if(!t)return null;const e=Number(t);return isNaN(e)?null:e}function gk(){function t(){const e=document.createElement("p"),n=e.style;e.innerText="Running in emulator mode. Do not use with production credentials.",n.position="fixed",n.width="100%",n.backgroundColor="#ffffff",n.border=".1em solid #000000",n.color="#b50000",n.bottom="0px",n.left="0px",n.margin="0px",n.zIndex="10000",n.textAlign="center",e.classList.add("firebase-emulator-warning"),document.body.appendChild(e)}typeof console<"u"&&typeof console.info=="function"&&console.info("WARNING: You are using the Auth Emulator, which is intended for local testing only.  Do not use with production credentials."),typeof window<"u"&&typeof document<"u"&&(document.readyState==="loading"?window.addEventListener("DOMContentLoaded",t):t())}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class tg{constructor(e,n){this.providerId=e,this.signInMethod=n}toJSON(){return it("not implemented")}_getIdTokenResponse(e){return it("not implemented")}_linkToIdToken(e,n){return it("not implemented")}_getReauthenticationResolver(e){return it("not implemented")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function kn(t,e){return VI(t,"POST","/v1/accounts:signInWithIdp",Yc(t,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const mk="http://localhost";class hn extends tg{constructor(){super(...arguments),this.pendingToken=null}static _fromParams(e){const n=new hn(e.providerId,e.signInMethod);return e.idToken||e.accessToken?(e.idToken&&(n.idToken=e.idToken),e.accessToken&&(n.accessToken=e.accessToken),e.nonce&&!e.pendingToken&&(n.nonce=e.nonce),e.pendingToken&&(n.pendingToken=e.pendingToken)):e.oauthToken&&e.oauthTokenSecret?(n.accessToken=e.oauthToken,n.secret=e.oauthTokenSecret):Ke("argument-error"),n}toJSON(){return{idToken:this.idToken,accessToken:this.accessToken,secret:this.secret,nonce:this.nonce,pendingToken:this.pendingToken,providerId:this.providerId,signInMethod:this.signInMethod}}static fromJSON(e){const n=typeof e=="string"?JSON.parse(e):e,{providerId:r,signInMethod:i,...s}=n;if(!r||!i)return null;const o=new hn(r,i);return o.idToken=s.idToken||void 0,o.accessToken=s.accessToken||void 0,o.secret=s.secret,o.nonce=s.nonce,o.pendingToken=s.pendingToken||null,o}_getIdTokenResponse(e){const n=this.buildRequest();return kn(e,n)}_linkToIdToken(e,n){const r=this.buildRequest();return r.idToken=n,kn(e,r)}_getReauthenticationResolver(e){const n=this.buildRequest();return n.autoCreate=!1,kn(e,n)}buildRequest(){const e={requestUri:mk,returnSecureToken:!0};if(this.pendingToken)e.pendingToken=this.pendingToken;else{const n={};this.idToken&&(n.id_token=this.idToken),this.accessToken&&(n.access_token=this.accessToken),this.secret&&(n.oauth_token_secret=this.secret),n.providerId=this.providerId,this.nonce&&!this.pendingToken&&(n.nonce=this.nonce),e.postBody=tr(n)}return e}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Qc{constructor(e){this.providerId=e,this.defaultLanguageCode=null,this.customParameters={}}setDefaultLanguage(e){this.defaultLanguageCode=e}setCustomParameters(e){return this.customParameters=e,this}getCustomParameters(){return this.customParameters}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class hi extends Qc{constructor(){super(...arguments),this.scopes=[]}addScope(e){return this.scopes.includes(e)||this.scopes.push(e),this}getScopes(){return[...this.scopes]}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class vt extends hi{constructor(){super("facebook.com")}static credential(e){return hn._fromParams({providerId:vt.PROVIDER_ID,signInMethod:vt.FACEBOOK_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return vt.credentialFromTaggedObject(e)}static credentialFromError(e){return vt.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return vt.credential(e.oauthAccessToken)}catch{return null}}}vt.FACEBOOK_SIGN_IN_METHOD="facebook.com";vt.PROVIDER_ID="facebook.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ye extends hi{constructor(){super("google.com"),this.addScope("profile")}static credential(e,n){return hn._fromParams({providerId:ye.PROVIDER_ID,signInMethod:ye.GOOGLE_SIGN_IN_METHOD,idToken:e,accessToken:n})}static credentialFromResult(e){return ye.credentialFromTaggedObject(e)}static credentialFromError(e){return ye.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthIdToken:n,oauthAccessToken:r}=e;if(!n&&!r)return null;try{return ye.credential(n,r)}catch{return null}}}ye.GOOGLE_SIGN_IN_METHOD="google.com";ye.PROVIDER_ID="google.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class wt extends hi{constructor(){super("github.com")}static credential(e){return hn._fromParams({providerId:wt.PROVIDER_ID,signInMethod:wt.GITHUB_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return wt.credentialFromTaggedObject(e)}static credentialFromError(e){return wt.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return wt.credential(e.oauthAccessToken)}catch{return null}}}wt.GITHUB_SIGN_IN_METHOD="github.com";wt.PROVIDER_ID="github.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class bt extends hi{constructor(){super("twitter.com")}static credential(e,n){return hn._fromParams({providerId:bt.PROVIDER_ID,signInMethod:bt.TWITTER_SIGN_IN_METHOD,oauthToken:e,oauthTokenSecret:n})}static credentialFromResult(e){return bt.credentialFromTaggedObject(e)}static credentialFromError(e){return bt.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthAccessToken:n,oauthTokenSecret:r}=e;if(!n||!r)return null;try{return bt.credential(n,r)}catch{return null}}}bt.TWITTER_SIGN_IN_METHOD="twitter.com";bt.PROVIDER_ID="twitter.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Gn{constructor(e){this.user=e.user,this.providerId=e.providerId,this._tokenResponse=e._tokenResponse,this.operationType=e.operationType}static async _fromIdTokenResponse(e,n,r,i=!1){const s=await Ue._fromIdTokenResponse(e,r,i),o=Id(r);return new Gn({user:s,providerId:o,_tokenResponse:r,operationType:n})}static async _forOperation(e,n,r){await e._updateTokensIfNecessary(r,!0);const i=Id(r);return new Gn({user:e,providerId:i,_tokenResponse:r,operationType:n})}}function Id(t){return t.providerId?t.providerId:"phoneNumber"in t?"phone":null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ds extends jt{constructor(e,n,r,i){super(n.code,n.message),this.operationType=r,this.user=i,Object.setPrototypeOf(this,ds.prototype),this.customData={appName:e.name,tenantId:e.tenantId??void 0,_serverResponse:n.customData._serverResponse,operationType:r}}static _fromErrorAndOperation(e,n,r,i){return new ds(e,n,r,i)}}function ng(t,e,n,r){return(e==="reauthenticate"?n._getReauthenticationResolver(t):n._getIdTokenResponse(t)).catch(s=>{throw s.code==="auth/multi-factor-auth-required"?ds._fromErrorAndOperation(t,s,e,r):s})}async function _k(t,e,n=!1){const r=await Yr(t,e._linkToIdToken(t.auth,await t.getIdToken()),n);return Gn._forOperation(t,"link",r)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function yk(t,e,n=!1){const{auth:r}=t;if(De(r.app))return Promise.reject(rn(r));const i="reauthenticate";try{const s=await Yr(t,ng(r,i,e,t),n);b(s.idToken,r,"internal-error");const o=Kc(s.idToken);b(o,r,"internal-error");const{sub:a}=o;return b(t.uid===a,r,"user-mismatch"),Gn._forOperation(t,i,s)}catch(s){throw s?.code==="auth/user-not-found"&&Ke(r,"user-mismatch"),s}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function rg(t,e,n=!1){if(De(t.app))return Promise.reject(rn(t));const r="signIn",i=await ng(t,r,e),s=await Gn._fromIdTokenResponse(t,r,i);return n||await t._updateCurrentUser(s.user),s}async function Ek(t,e){return rg(ar(t),e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ko(t,e){return ce(t).setPersistence(e)}function vk(t,e,n,r){return ce(t).onIdTokenChanged(e,n,r)}function wk(t,e,n){return ce(t).beforeAuthStateChanged(e,n)}function ig(t,e,n,r){return ce(t).onAuthStateChanged(e,n,r)}function bk(t){return ce(t).signOut()}const hs="__sak";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class sg{constructor(e,n){this.storageRetriever=e,this.type=n}_isAvailable(){try{return this.storage?(this.storage.setItem(hs,"1"),this.storage.removeItem(hs),Promise.resolve(!0)):Promise.resolve(!1)}catch{return Promise.resolve(!1)}}_set(e,n){return this.storage.setItem(e,JSON.stringify(n)),Promise.resolve()}_get(e){const n=this.storage.getItem(e);return Promise.resolve(n?JSON.parse(n):null)}_remove(e){return this.storage.removeItem(e),Promise.resolve()}get storage(){return this.storageRetriever()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Sk=1e3,Ck=10;class og extends sg{constructor(){super(()=>window.localStorage,"LOCAL"),this.boundEventHandler=(e,n)=>this.onStorageEvent(e,n),this.listeners={},this.localCache={},this.pollTimer=null,this.fallbackToPolling=Qp(),this._shouldAllowMigration=!0}forAllChangedKeys(e){for(const n of Object.keys(this.listeners)){const r=this.storage.getItem(n),i=this.localCache[n];r!==i&&e(n,i,r)}}onStorageEvent(e,n=!1){if(!e.key){this.forAllChangedKeys((o,a,c)=>{this.notifyListeners(o,c)});return}const r=e.key;n?this.detachListener():this.stopPolling();const i=()=>{const o=this.storage.getItem(r);!n&&this.localCache[r]===o||this.notifyListeners(r,o)},s=this.storage.getItem(r);tk()&&s!==e.newValue&&e.newValue!==e.oldValue?setTimeout(i,Ck):i()}notifyListeners(e,n){this.localCache[e]=n;const r=this.listeners[e];if(r)for(const i of Array.from(r))i(n&&JSON.parse(n))}startPolling(){this.stopPolling(),this.pollTimer=setInterval(()=>{this.forAllChangedKeys((e,n,r)=>{this.onStorageEvent(new StorageEvent("storage",{key:e,oldValue:n,newValue:r}),!0)})},Sk)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}attachListener(){window.addEventListener("storage",this.boundEventHandler)}detachListener(){window.removeEventListener("storage",this.boundEventHandler)}_addListener(e,n){Object.keys(this.listeners).length===0&&(this.fallbackToPolling?this.startPolling():this.attachListener()),this.listeners[e]||(this.listeners[e]=new Set,this.localCache[e]=this.storage.getItem(e)),this.listeners[e].add(n)}_removeListener(e,n){this.listeners[e]&&(this.listeners[e].delete(n),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&(this.detachListener(),this.stopPolling())}async _set(e,n){await super._set(e,n),this.localCache[e]=JSON.stringify(n)}async _get(e){const n=await super._get(e);return this.localCache[e]=JSON.stringify(n),n}async _remove(e){await super._remove(e),delete this.localCache[e]}}og.type="LOCAL";const ag=og;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class cg extends sg{constructor(){super(()=>window.sessionStorage,"SESSION")}_addListener(e,n){}_removeListener(e,n){}}cg.type="SESSION";const lg=cg;/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Tk(t){return Promise.all(t.map(async e=>{try{return{fulfilled:!0,value:await e}}catch(n){return{fulfilled:!1,reason:n}}}))}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class qs{constructor(e){this.eventTarget=e,this.handlersMap={},this.boundEventHandler=this.handleEvent.bind(this)}static _getInstance(e){const n=this.receivers.find(i=>i.isListeningto(e));if(n)return n;const r=new qs(e);return this.receivers.push(r),r}isListeningto(e){return this.eventTarget===e}async handleEvent(e){const n=e,{eventId:r,eventType:i,data:s}=n.data,o=this.handlersMap[i];if(!o?.size)return;n.ports[0].postMessage({status:"ack",eventId:r,eventType:i});const a=Array.from(o).map(async l=>l(n.origin,s)),c=await Tk(a);n.ports[0].postMessage({status:"done",eventId:r,eventType:i,response:c})}_subscribe(e,n){Object.keys(this.handlersMap).length===0&&this.eventTarget.addEventListener("message",this.boundEventHandler),this.handlersMap[e]||(this.handlersMap[e]=new Set),this.handlersMap[e].add(n)}_unsubscribe(e,n){this.handlersMap[e]&&n&&this.handlersMap[e].delete(n),(!n||this.handlersMap[e].size===0)&&delete this.handlersMap[e],Object.keys(this.handlersMap).length===0&&this.eventTarget.removeEventListener("message",this.boundEventHandler)}}qs.receivers=[];/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Zc(t="",e=10){let n="";for(let r=0;r<e;r++)n+=Math.floor(Math.random()*10);return t+n}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ik{constructor(e){this.target=e,this.handlers=new Set}removeMessageHandler(e){e.messageChannel&&(e.messageChannel.port1.removeEventListener("message",e.onMessage),e.messageChannel.port1.close()),this.handlers.delete(e)}async _send(e,n,r=50){const i=typeof MessageChannel<"u"?new MessageChannel:null;if(!i)throw new Error("connection_unavailable");let s,o;return new Promise((a,c)=>{const l=Zc("",20);i.port1.start();const u=setTimeout(()=>{c(new Error("unsupported_event"))},r);o={messageChannel:i,onMessage(d){const h=d;if(h.data.eventId===l)switch(h.data.status){case"ack":clearTimeout(u),s=setTimeout(()=>{c(new Error("timeout"))},3e3);break;case"done":clearTimeout(s),a(h.data.response);break;default:clearTimeout(u),clearTimeout(s),c(new Error("invalid_response"));break}}},this.handlers.add(o),i.port1.addEventListener("message",o.onMessage),this.target.postMessage({eventType:e,eventId:l,data:n},[i.port2])}).finally(()=>{o&&this.removeMessageHandler(o)})}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ye(){return window}function kk(t){Ye().location.href=t}/**
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
 */function ug(){return typeof Ye().WorkerGlobalScope<"u"&&typeof Ye().importScripts=="function"}async function Rk(){if(!navigator?.serviceWorker)return null;try{return(await navigator.serviceWorker.ready).active}catch{return null}}function Ak(){return navigator?.serviceWorker?.controller||null}function Nk(){return ug()?self:null}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const dg="firebaseLocalStorageDb",Pk=1,fs="firebaseLocalStorage",hg="fbase_key";class fi{constructor(e){this.request=e}toPromise(){return new Promise((e,n)=>{this.request.addEventListener("success",()=>{e(this.request.result)}),this.request.addEventListener("error",()=>{n(this.request.error)})})}}function Ys(t,e){return t.transaction([fs],e?"readwrite":"readonly").objectStore(fs)}function Lk(){const t=indexedDB.deleteDatabase(dg);return new fi(t).toPromise()}function wa(){const t=indexedDB.open(dg,Pk);return new Promise((e,n)=>{t.addEventListener("error",()=>{n(t.error)}),t.addEventListener("upgradeneeded",()=>{const r=t.result;try{r.createObjectStore(fs,{keyPath:hg})}catch(i){n(i)}}),t.addEventListener("success",async()=>{const r=t.result;r.objectStoreNames.contains(fs)?e(r):(r.close(),await Lk(),e(await wa()))})})}async function kd(t,e,n){const r=Ys(t,!0).put({[hg]:e,value:n});return new fi(r).toPromise()}async function Ok(t,e){const n=Ys(t,!1).get(e),r=await new fi(n).toPromise();return r===void 0?null:r.value}function Rd(t,e){const n=Ys(t,!0).delete(e);return new fi(n).toPromise()}const Dk=800,Mk=3;class fg{constructor(){this.type="LOCAL",this._shouldAllowMigration=!0,this.listeners={},this.localCache={},this.pollTimer=null,this.pendingWrites=0,this.receiver=null,this.sender=null,this.serviceWorkerReceiverAvailable=!1,this.activeServiceWorker=null,this._workerInitializationPromise=this.initializeServiceWorkerMessaging().then(()=>{},()=>{})}async _openDb(){return this.db?this.db:(this.db=await wa(),this.db)}async _withRetries(e){let n=0;for(;;)try{const r=await this._openDb();return await e(r)}catch(r){if(n++>Mk)throw r;this.db&&(this.db.close(),this.db=void 0)}}async initializeServiceWorkerMessaging(){return ug()?this.initializeReceiver():this.initializeSender()}async initializeReceiver(){this.receiver=qs._getInstance(Nk()),this.receiver._subscribe("keyChanged",async(e,n)=>({keyProcessed:(await this._poll()).includes(n.key)})),this.receiver._subscribe("ping",async(e,n)=>["keyChanged"])}async initializeSender(){if(this.activeServiceWorker=await Rk(),!this.activeServiceWorker)return;this.sender=new Ik(this.activeServiceWorker);const e=await this.sender._send("ping",{},800);e&&e[0]?.fulfilled&&e[0]?.value.includes("keyChanged")&&(this.serviceWorkerReceiverAvailable=!0)}async notifyServiceWorker(e){if(!(!this.sender||!this.activeServiceWorker||Ak()!==this.activeServiceWorker))try{await this.sender._send("keyChanged",{key:e},this.serviceWorkerReceiverAvailable?800:50)}catch{}}async _isAvailable(){try{if(!indexedDB)return!1;const e=await wa();return await kd(e,hs,"1"),await Rd(e,hs),!0}catch{}return!1}async _withPendingWrite(e){this.pendingWrites++;try{await e()}finally{this.pendingWrites--}}async _set(e,n){return this._withPendingWrite(async()=>(await this._withRetries(r=>kd(r,e,n)),this.localCache[e]=n,this.notifyServiceWorker(e)))}async _get(e){const n=await this._withRetries(r=>Ok(r,e));return this.localCache[e]=n,n}async _remove(e){return this._withPendingWrite(async()=>(await this._withRetries(n=>Rd(n,e)),delete this.localCache[e],this.notifyServiceWorker(e)))}async _poll(){const e=await this._withRetries(i=>{const s=Ys(i,!1).getAll();return new fi(s).toPromise()});if(!e)return[];if(this.pendingWrites!==0)return[];const n=[],r=new Set;if(e.length!==0)for(const{fbase_key:i,value:s}of e)r.add(i),JSON.stringify(this.localCache[i])!==JSON.stringify(s)&&(this.notifyListeners(i,s),n.push(i));for(const i of Object.keys(this.localCache))this.localCache[i]&&!r.has(i)&&(this.notifyListeners(i,null),n.push(i));return n}notifyListeners(e,n){this.localCache[e]=n;const r=this.listeners[e];if(r)for(const i of Array.from(r))i(n)}startPolling(){this.stopPolling(),this.pollTimer=setInterval(async()=>this._poll(),Dk)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}_addListener(e,n){Object.keys(this.listeners).length===0&&this.startPolling(),this.listeners[e]||(this.listeners[e]=new Set,this._get(e)),this.listeners[e].add(n)}_removeListener(e,n){this.listeners[e]&&(this.listeners[e].delete(n),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&this.stopPolling()}}fg.type="LOCAL";const pg=fg;new di(3e4,6e4);/**
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
 */function gg(t,e){return e?st(e):(b(t._popupRedirectResolver,t,"argument-error"),t._popupRedirectResolver)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class el extends tg{constructor(e){super("custom","custom"),this.params=e}_getIdTokenResponse(e){return kn(e,this._buildIdpRequest())}_linkToIdToken(e,n){return kn(e,this._buildIdpRequest(n))}_getReauthenticationResolver(e){return kn(e,this._buildIdpRequest())}_buildIdpRequest(e){const n={requestUri:this.params.requestUri,sessionId:this.params.sessionId,postBody:this.params.postBody,tenantId:this.params.tenantId,pendingToken:this.params.pendingToken,returnSecureToken:!0,returnIdpCredential:!0};return e&&(n.idToken=e),n}}function xk(t){return rg(t.auth,new el(t),t.bypassAuthState)}function Fk(t){const{auth:e,user:n}=t;return b(n,e,"internal-error"),yk(n,new el(t),t.bypassAuthState)}async function Uk(t){const{auth:e,user:n}=t;return b(n,e,"internal-error"),_k(n,new el(t),t.bypassAuthState)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class mg{constructor(e,n,r,i,s=!1){this.auth=e,this.resolver=r,this.user=i,this.bypassAuthState=s,this.pendingPromise=null,this.eventManager=null,this.filter=Array.isArray(n)?n:[n]}execute(){return new Promise(async(e,n)=>{this.pendingPromise={resolve:e,reject:n};try{this.eventManager=await this.resolver._initialize(this.auth),await this.onExecution(),this.eventManager.registerConsumer(this)}catch(r){this.reject(r)}})}async onAuthEvent(e){const{urlResponse:n,sessionId:r,postBody:i,tenantId:s,error:o,type:a}=e;if(o){this.reject(o);return}const c={auth:this.auth,requestUri:n,sessionId:r,tenantId:s||void 0,postBody:i||void 0,user:this.user,bypassAuthState:this.bypassAuthState};try{this.resolve(await this.getIdpTask(a)(c))}catch(l){this.reject(l)}}onError(e){this.reject(e)}getIdpTask(e){switch(e){case"signInViaPopup":case"signInViaRedirect":return xk;case"linkViaPopup":case"linkViaRedirect":return Uk;case"reauthViaPopup":case"reauthViaRedirect":return Fk;default:Ke(this.auth,"internal-error")}}resolve(e){mt(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.resolve(e),this.unregisterAndCleanUp()}reject(e){mt(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.reject(e),this.unregisterAndCleanUp()}unregisterAndCleanUp(){this.eventManager&&this.eventManager.unregisterConsumer(this),this.pendingPromise=null,this.cleanUp()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const $k=new di(2e3,1e4);async function Bk(t,e,n){if(De(t.app))return Promise.reject(He(t,"operation-not-supported-in-this-environment"));const r=ar(t);FI(t,e,Qc);const i=gg(r,n);return new en(r,"signInViaPopup",e,i).executeNotNull()}class en extends mg{constructor(e,n,r,i,s){super(e,n,i,s),this.provider=r,this.authWindow=null,this.pollId=null,en.currentPopupAction&&en.currentPopupAction.cancel(),en.currentPopupAction=this}async executeNotNull(){const e=await this.execute();return b(e,this.auth,"internal-error"),e}async onExecution(){mt(this.filter.length===1,"Popup operations only handle one event");const e=Zc();this.authWindow=await this.resolver._openPopup(this.auth,this.provider,this.filter[0],e),this.authWindow.associatedEvent=e,this.resolver._originValidation(this.auth).catch(n=>{this.reject(n)}),this.resolver._isIframeWebStorageSupported(this.auth,n=>{n||this.reject(He(this.auth,"web-storage-unsupported"))}),this.pollUserCancellation()}get eventId(){return this.authWindow?.associatedEvent||null}cancel(){this.reject(He(this.auth,"cancelled-popup-request"))}cleanUp(){this.authWindow&&this.authWindow.close(),this.pollId&&window.clearTimeout(this.pollId),this.authWindow=null,this.pollId=null,en.currentPopupAction=null}pollUserCancellation(){const e=()=>{if(this.authWindow?.window?.closed){this.pollId=window.setTimeout(()=>{this.pollId=null,this.reject(He(this.auth,"popup-closed-by-user"))},8e3);return}this.pollId=window.setTimeout(e,$k.get())};e()}}en.currentPopupAction=null;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Hk="pendingRedirect",Fi=new Map;class Wk extends mg{constructor(e,n,r=!1){super(e,["signInViaRedirect","linkViaRedirect","reauthViaRedirect","unknown"],n,void 0,r),this.eventId=null}async execute(){let e=Fi.get(this.auth._key());if(!e){try{const r=await jk(this.resolver,this.auth)?await super.execute():null;e=()=>Promise.resolve(r)}catch(n){e=()=>Promise.reject(n)}Fi.set(this.auth._key(),e)}return this.bypassAuthState||Fi.set(this.auth._key(),()=>Promise.resolve(null)),e()}async onAuthEvent(e){if(e.type==="signInViaRedirect")return super.onAuthEvent(e);if(e.type==="unknown"){this.resolve(null);return}if(e.eventId){const n=await this.auth._redirectUserForId(e.eventId);if(n)return this.user=n,super.onAuthEvent(e);this.resolve(null)}}async onExecution(){}cleanUp(){}}async function jk(t,e){const n=Gk(e),r=zk(t);if(!await r._isAvailable())return!1;const i=await r._get(n)==="true";return await r._remove(n),i}function Vk(t,e){Fi.set(t._key(),e)}function zk(t){return st(t._redirectPersistence)}function Gk(t){return xi(Hk,t.config.apiKey,t.name)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function qk(t,e){return await ar(t)._initializationPromise,_g(t,e,!1)}async function _g(t,e,n=!1){if(De(t.app))return Promise.reject(rn(t));const r=ar(t),i=gg(r,e),o=await new Wk(r,i,n).execute();return o&&!n&&(delete o.user._redirectEventId,await r._persistUserIfCurrent(o.user),await r._setRedirectUser(null,e)),o}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Yk=600*1e3;class Kk{constructor(e){this.auth=e,this.cachedEventUids=new Set,this.consumers=new Set,this.queuedRedirectEvent=null,this.hasHandledPotentialRedirect=!1,this.lastProcessedEventTime=Date.now()}registerConsumer(e){this.consumers.add(e),this.queuedRedirectEvent&&this.isEventForConsumer(this.queuedRedirectEvent,e)&&(this.sendToConsumer(this.queuedRedirectEvent,e),this.saveEventToCache(this.queuedRedirectEvent),this.queuedRedirectEvent=null)}unregisterConsumer(e){this.consumers.delete(e)}onEvent(e){if(this.hasEventBeenHandled(e))return!1;let n=!1;return this.consumers.forEach(r=>{this.isEventForConsumer(e,r)&&(n=!0,this.sendToConsumer(e,r),this.saveEventToCache(e))}),this.hasHandledPotentialRedirect||!Jk(e)||(this.hasHandledPotentialRedirect=!0,n||(this.queuedRedirectEvent=e,n=!0)),n}sendToConsumer(e,n){if(e.error&&!yg(e)){const r=e.error.code?.split("auth/")[1]||"internal-error";n.onError(He(this.auth,r))}else n.onAuthEvent(e)}isEventForConsumer(e,n){const r=n.eventId===null||!!e.eventId&&e.eventId===n.eventId;return n.filter.includes(e.type)&&r}hasEventBeenHandled(e){return Date.now()-this.lastProcessedEventTime>=Yk&&this.cachedEventUids.clear(),this.cachedEventUids.has(Ad(e))}saveEventToCache(e){this.cachedEventUids.add(Ad(e)),this.lastProcessedEventTime=Date.now()}}function Ad(t){return[t.type,t.eventId,t.sessionId,t.tenantId].filter(e=>e).join("-")}function yg({type:t,error:e}){return t==="unknown"&&e?.code==="auth/no-auth-event"}function Jk(t){switch(t.type){case"signInViaRedirect":case"linkViaRedirect":case"reauthViaRedirect":return!0;case"unknown":return yg(t);default:return!1}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Xk(t,e={}){return or(t,"GET","/v1/projects",e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Qk=/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/,Zk=/^https?/;async function eR(t){if(t.config.emulator)return;const{authorizedDomains:e}=await Xk(t);for(const n of e)try{if(tR(n))return}catch{}Ke(t,"unauthorized-domain")}function tR(t){const e=ya(),{protocol:n,hostname:r}=new URL(e);if(t.startsWith("chrome-extension://")){const o=new URL(t);return o.hostname===""&&r===""?n==="chrome-extension:"&&t.replace("chrome-extension://","")===e.replace("chrome-extension://",""):n==="chrome-extension:"&&o.hostname===r}if(!Zk.test(n))return!1;if(Qk.test(t))return r===t;const i=t.replace(/\./g,"\\.");return new RegExp("^(.+\\."+i+"|"+i+")$","i").test(r)}/**
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
 */const nR=new di(3e4,6e4);function Nd(){const t=Ye().___jsl;if(t?.H){for(const e of Object.keys(t.H))if(t.H[e].r=t.H[e].r||[],t.H[e].L=t.H[e].L||[],t.H[e].r=[...t.H[e].L],t.CP)for(let n=0;n<t.CP.length;n++)t.CP[n]=null}}function rR(t){return new Promise((e,n)=>{function r(){Nd(),gapi.load("gapi.iframes",{callback:()=>{e(gapi.iframes.getContext())},ontimeout:()=>{Nd(),n(He(t,"network-request-failed"))},timeout:nR.get()})}if(Ye().gapi?.iframes?.Iframe)e(gapi.iframes.getContext());else if(Ye().gapi?.load)r();else{const i=uk("iframefcb");return Ye()[i]=()=>{gapi.load?r():n(He(t,"network-request-failed"))},ck(`${lk()}?onload=${i}`).catch(s=>n(s))}}).catch(e=>{throw Ui=null,e})}let Ui=null;function iR(t){return Ui=Ui||rR(t),Ui}/**
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
 */const sR=new di(5e3,15e3),oR="__/auth/iframe",aR="emulator/auth/iframe",cR={style:{position:"absolute",top:"-100px",width:"1px",height:"1px"},"aria-hidden":"true",tabindex:"-1"},lR=new Map([["identitytoolkit.googleapis.com","p"],["staging-identitytoolkit.sandbox.googleapis.com","s"],["test-identitytoolkit.sandbox.googleapis.com","t"]]);function uR(t){const e=t.config;b(e.authDomain,t,"auth-domain-config-required");const n=e.emulator?qc(e,aR):`https://${t.config.authDomain}/${oR}`,r={apiKey:e.apiKey,appName:t.name,v:nr},i=lR.get(t.config.apiHost);i&&(r.eid=i);const s=t._getFrameworks();return s.length&&(r.fw=s.join(",")),`${n}?${tr(r).slice(1)}`}async function dR(t){const e=await iR(t),n=Ye().gapi;return b(n,t,"internal-error"),e.open({where:document.body,url:uR(t),messageHandlersFilter:n.iframes.CROSS_ORIGIN_IFRAMES_FILTER,attributes:cR,dontclear:!0},r=>new Promise(async(i,s)=>{await r.restyle({setHideOnLeave:!1});const o=He(t,"network-request-failed"),a=Ye().setTimeout(()=>{s(o)},sR.get());function c(){Ye().clearTimeout(a),i(r)}r.ping(c).then(c,()=>{s(o)})}))}/**
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
 */const hR={location:"yes",resizable:"yes",statusbar:"yes",toolbar:"no"},fR=500,pR=600,gR="_blank",mR="http://localhost";class Pd{constructor(e){this.window=e,this.associatedEvent=null}close(){if(this.window)try{this.window.close()}catch{}}}function _R(t,e,n,r=fR,i=pR){const s=Math.max((window.screen.availHeight-i)/2,0).toString(),o=Math.max((window.screen.availWidth-r)/2,0).toString();let a="";const c={...hR,width:r.toString(),height:i.toString(),top:s,left:o},l=me().toLowerCase();n&&(a=qp(l)?gR:n),zp(l)&&(e=e||mR,c.scrollbars="yes");const u=Object.entries(c).reduce((h,[f,p])=>`${h}${f}=${p},`,"");if(ek(l)&&a!=="_self")return yR(e||"",a),new Pd(null);const d=window.open(e||"",a,u);b(d,t,"popup-blocked");try{d.focus()}catch{}return new Pd(d)}function yR(t,e){const n=document.createElement("a");n.href=t,n.target=e;const r=document.createEvent("MouseEvent");r.initMouseEvent("click",!0,!0,window,1,0,0,0,0,!1,!1,!1,!1,1,null),n.dispatchEvent(r)}/**
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
 */const ER="__/auth/handler",vR="emulator/auth/handler",wR=encodeURIComponent("fac");async function Ld(t,e,n,r,i,s){b(t.config.authDomain,t,"auth-domain-config-required"),b(t.config.apiKey,t,"invalid-api-key");const o={apiKey:t.config.apiKey,appName:t.name,authType:n,redirectUrl:r,v:nr,eventId:i};if(e instanceof Qc){e.setDefaultLanguage(t.languageCode),o.providerId=e.providerId||"",Jo(e.getCustomParameters())||(o.customParameters=JSON.stringify(e.getCustomParameters()));for(const[u,d]of Object.entries({}))o[u]=d}if(e instanceof hi){const u=e.getScopes().filter(d=>d!=="");u.length>0&&(o.scopes=u.join(","))}t.tenantId&&(o.tid=t.tenantId);const a=o;for(const u of Object.keys(a))a[u]===void 0&&delete a[u];const c=await t._getAppCheckToken(),l=c?`#${wR}=${encodeURIComponent(c)}`:"";return`${bR(t)}?${tr(a).slice(1)}${l}`}function bR({config:t}){return t.emulator?qc(t,vR):`https://${t.authDomain}/${ER}`}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ro="webStorageSupport";class SR{constructor(){this.eventManagers={},this.iframes={},this.originValidationPromises={},this._redirectPersistence=lg,this._completeRedirectFn=_g,this._overrideRedirectResult=Vk}async _openPopup(e,n,r,i){mt(this.eventManagers[e._key()]?.manager,"_initialize() not called before _openPopup()");const s=await Ld(e,n,r,ya(),i);return _R(e,s,Zc())}async _openRedirect(e,n,r,i){await this._originValidation(e);const s=await Ld(e,n,r,ya(),i);return kk(s),new Promise(()=>{})}_initialize(e){const n=e._key();if(this.eventManagers[n]){const{manager:i,promise:s}=this.eventManagers[n];return i?Promise.resolve(i):(mt(s,"If manager is not set, promise should be"),s)}const r=this.initAndGetManager(e);return this.eventManagers[n]={promise:r},r.catch(()=>{delete this.eventManagers[n]}),r}async initAndGetManager(e){const n=await dR(e),r=new Kk(e);return n.register("authEvent",i=>(b(i?.authEvent,e,"invalid-auth-event"),{status:r.onEvent(i.authEvent)?"ACK":"ERROR"}),gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER),this.eventManagers[e._key()]={manager:r},this.iframes[e._key()]=n,r}_isIframeWebStorageSupported(e,n){this.iframes[e._key()].send(Ro,{type:Ro},i=>{const s=i?.[0]?.[Ro];s!==void 0&&n(!!s),Ke(e,"internal-error")},gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER)}_originValidation(e){const n=e._key();return this.originValidationPromises[n]||(this.originValidationPromises[n]=eR(e)),this.originValidationPromises[n]}get _shouldInitProactively(){return Qp()||Gp()||Jc()}}const CR=SR;var Od="@firebase/auth",Dd="1.11.0";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class TR{constructor(e){this.auth=e,this.internalListeners=new Map}getUid(){return this.assertAuthConfigured(),this.auth.currentUser?.uid||null}async getToken(e){return this.assertAuthConfigured(),await this.auth._initializationPromise,this.auth.currentUser?{accessToken:await this.auth.currentUser.getIdToken(e)}:null}addAuthTokenListener(e){if(this.assertAuthConfigured(),this.internalListeners.has(e))return;const n=this.auth.onIdTokenChanged(r=>{e(r?.stsTokenManager.accessToken||null)});this.internalListeners.set(e,n),this.updateProactiveRefresh()}removeAuthTokenListener(e){this.assertAuthConfigured();const n=this.internalListeners.get(e);n&&(this.internalListeners.delete(e),n(),this.updateProactiveRefresh())}assertAuthConfigured(){b(this.auth._initializationPromise,"dependent-sdk-initialized-before-auth")}updateProactiveRefresh(){this.internalListeners.size>0?this.auth._startProactiveRefresh():this.auth._stopProactiveRefresh()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function IR(t){switch(t){case"Node":return"node";case"ReactNative":return"rn";case"Worker":return"webworker";case"Cordova":return"cordova";case"WebExtension":return"web-extension";default:return}}function kR(t){Ut(new ht("auth",(e,{options:n})=>{const r=e.getProvider("app").getImmediate(),i=e.getProvider("heartbeat"),s=e.getProvider("app-check-internal"),{apiKey:o,authDomain:a}=r.options;b(o&&!o.includes(":"),"invalid-api-key",{appName:r.name});const c={apiKey:o,authDomain:a,clientPlatform:t,apiHost:"identitytoolkit.googleapis.com",tokenApiHost:"securetoken.googleapis.com",apiScheme:"https",sdkClientVersion:Zp(t)},l=new ok(r,i,s,c);return hk(l,n),l},"PUBLIC").setInstantiationMode("EXPLICIT").setInstanceCreatedCallback((e,n,r)=>{e.getProvider("auth-internal").initialize()})),Ut(new ht("auth-internal",e=>{const n=ar(e.getProvider("auth").getImmediate());return(r=>new TR(r))(n)},"PRIVATE").setInstantiationMode("EXPLICIT")),ct(Od,Dd,IR(t)),ct(Od,Dd,"esm2020")}/**
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
 */const RR=300,AR=Qh("authIdTokenMaxAge")||RR;let Md=null;const NR=t=>async e=>{const n=e&&await e.getIdTokenResult(),r=n&&(new Date().getTime()-Date.parse(n.issuedAtTime))/1e3;if(r&&r>AR)return;const i=n?.token;Md!==i&&(Md=i,await fetch(t,{method:i?"POST":"DELETE",headers:i?{Authorization:`Bearer ${i}`}:{}}))};function PR(t=ec()){const e=ri(t,"auth");if(e.isInitialized())return e.getImmediate();const n=dk(t,{popupRedirectResolver:CR,persistence:[pg,ag,lg]}),r=Qh("authTokenSyncURL");if(r&&typeof isSecureContext=="boolean"&&isSecureContext){const s=new URL(r,location.origin);if(location.origin===s.origin){const o=NR(s.toString());wk(n,o,()=>o(n.currentUser)),vk(n,a=>o(a))}}const i=Jh("auth");return i&&fk(n,`http://${i}`),n}function LR(){return document.getElementsByTagName("head")?.[0]??document}ak({loadJS(t){return new Promise((e,n)=>{const r=document.createElement("script");r.setAttribute("src",t),r.onload=e,r.onerror=i=>{const s=He("internal-error");s.customData=i,n(s)},r.type="text/javascript",r.charset="UTF-8",LR().appendChild(r)})},gapiScript:"https://apis.google.com/js/api.js",recaptchaV2Script:"https://www.google.com/recaptcha/api.js",recaptchaEnterpriseScript:"https://www.google.com/recaptcha/enterprise.js?render="});kR("Browser");const RN=()=>!1,OR=t=>{try{t&&localStorage.setItem("debug:console","1")}catch{}},U=(...t)=>{},DR=(...t)=>{localStorage.getItem("debug:console")};function MR(){if(typeof window>"u"||typeof navigator>"u")return!1;const t=navigator.userAgent||navigator.vendor||"",e=/iPad|iPhone|iPod/.test(t),n=/Macintosh/.test(t)&&typeof navigator.maxTouchPoints=="number"&&navigator.maxTouchPoints>1,r=(e||n)&&!window.MSStream,i=/Android/i.test(t),s=r||i;return console.table({"User Agent":t,isAndroid:i,isiOSUA:e,isiPadOSDesktopUA:n,isMobileDevice:s}),s}const xR="765724787439-21p8n3e2tsfq2qk4oriq7ipp7m4o50ad.apps.googleusercontent.com",Ar=new Set;function FR(t){return U("[ONE TAP] Callback registered, total callbacks:",Ar.size+1),Ar.add(t),()=>Ar.delete(t)}function En(t){U("[ONE TAP] Notifying status:",t,"to",Ar.size,"callbacks"),Ar.forEach(e=>{try{e(t)}catch{}})}function Eg(){if(typeof google>"u"||!google.accounts?.id){setTimeout(()=>Eg(),100);return}google.accounts.id.initialize({client_id:xR,callback:UR,auto_select:!1,cancel_on_tap_outside:!0,context:"signin",use_fedcm_for_prompt:!0,itp_support:!0})}function vg(){if(tl()){En("not_needed");return}window.google?.accounts?.id&&(En("prompting"),window.google.accounts.id.prompt(t=>{t.isSkippedMoment()?En("skipped"):t.isDismissedMoment()?En("dismissed"):En("displayed")}))}async function UR(t){try{U("[ONE TAP] Received credential, signing in with Firebase..."),En("signing_in");const e=ye.credential(t.credential),n=await Ek(Ae,e);U("[ONE TAP] ✅ Successfully signed in:",n.user.email),bg(!1)}catch(e){const n=e?.code||"unknown",r=e?.message||String(e);alert(n==="auth/account-exists-with-different-credential"?"An account already exists with the same email but different sign-in credentials.":`One Tap sign-in failed: ${r}`)}}const Ae=PR(Wc),wg=(async()=>{try{await ko(Ae,pg)}catch{try{await ko(Ae,ag)}catch{await ko(Ae,va)}}try{const t=await Cg();t.success?console.log("[AUTH] ✅ Redirect sign-in completed, user:",t.user?.email||t.user?.uid):t.error?console.error("[AUTH] ❌ Redirect sign-in failed:",t.error):console.debug("[AUTH] No pending redirect result found.")}catch(t){console.error("[AUTH] Error during handleRedirectResult execution:",t)}setTimeout(()=>{Eg(),vg()},500)})();let vr=!1;function bg(t){vr=t}function $R(){try{const t=document.createElement("a");t.href=window.location.href,t.target="_blank",t.rel="noopener noreferrer external",document.body.appendChild(t),t.click(),document.body.removeChild(t)}catch{}}let mr=null;const BR=()=>Math.random().toString(36).substring(2,15),ba="guestUser",HR=2880*60*1e3;function WR(){try{const t=typeof localStorage<"u"?localStorage.getItem(ba):null;if(!t)return null;const e=JSON.parse(t);if(!e||typeof e!="object"||!e.id)return null;if(e.expiresAt&&Date.now()>e.expiresAt){try{localStorage.removeItem(ba)}catch{}return null}return e}catch{return null}}function jR(t,e=HR){const n=Date.now(),r={id:t,createdAt:n,expiresAt:n+e};try{typeof localStorage<"u"&&localStorage.setItem(ba,JSON.stringify(r))}catch{}return r}function de(){const t=Ze();if(t)return t;if(!mr){const e=WR();e&&e.id?mr=e.id:(mr=BR(),jR(mr))}return mr}function tl(){return Ae.currentUser!==null}function Ze(){return Ae.currentUser?.uid??null}function VR(){return new Promise(t=>{const e=ig(Ae,n=>{e(),t(n)})})}function nl(t,{truncate:e=7}={}){return ig(Ae,n=>{const r=!!n,i=n?.displayName||"Guest User",s=typeof i=="string"&&i.length>e?i.slice(0,e)+"...":i;try{t({user:n,isLoggedIn:r,userName:s})}catch{}})}async function Sg(){const t=new ye;t.setCustomParameters({prompt:"select_account"});const e=MR(),n=(()=>{try{return typeof window<"u"&&window.matchMedia&&window.matchMedia("(display-mode: standalone)").matches||typeof navigator<"u"&&navigator.standalone===!0}catch{return!1}})(),r=n&&/iphone|ipad|ipod/i.test(navigator.userAgent||""),i=!0;try{if(r&&vr){vr=!1,$R();return}const s=await Bk(Ae,t),a=ye.credentialFromResult(s).accessToken,c=s.user;console.log("Signed in user:",c),U("Google Access Token exists:",!!a),vr=!1}catch(s){const o=s?.code||"unknown",a=s?.message||String(s);if(o==="auth/popup-closed-by-user"||o==="auth/cancelled-popup-request"){console.log("Sign-in cancelled by user");return}if((o==="auth/network-request-failed"||o==="auth/popup-blocked")&&r){console.warn(`[AUTH] ${o} inside iOS standalone PWA. Arming Safari fallback.`),vr=!0,alert(`Sign-in is blocked in the installed app on iOS.

Tap the Login button again to open in Safari and complete sign-in.`);return}if(o==="auth/popup-blocked"&&e){alert("Pop-up blocked. Please enable pop-ups for this site in your browser settings, or try signing in from a desktop browser.");return}const c=s?.customData?.email,l=ye.credentialFromError(s);if(console.error("Error during Google sign-in:",{errorCode:o,errorMessage:a,email:c,credential:l,origin:typeof window<"u"?window.location.origin:"n/a"}),o==="auth/unauthorized-domain"){const u=typeof window<"u"?window.location.origin:"",d=["This app's host is not whitelisted in Firebase Authentication.","Fix: In Firebase Console, go to Build → Authentication → Settings → Authorized domains and add this origin:",u?`• ${u}`:"• <your dev origin>","","Common dev hosts to add:","• http://localhost (covers any port)","• http://127.0.0.1","• http://[::1] (IPv6 localhost)","• Your LAN IP, e.g. http://192.168.x.y","","Tip: avoid opening index.html directly from the filesystem (file://). Use a dev server instead."];u&&typeof navigator<"u"&&navigator.clipboard?.writeText&&navigator.clipboard.writeText(u).catch(()=>{}),alert(`Sign-in failed: Unauthorized domain.

${d.join(`
`)}`);return}alert(`Sign-in failed: ${a}`)}}async function Cg(){try{const t=await qk(Ae);if(t){const n=ye.credentialFromResult(t)?.accessToken,r=t.user;return console.log("[AUTH] Redirect result found - signed in user:",r?.email||r?.uid),U("Google Access Token exists:",!!n),{success:!0,user:r}}return console.log("[AUTH] No redirect result (normal page load)"),{success:!1,user:null}}catch(t){const e=t?.code||"unknown",n=t?.message||String(t),r=t?.customData?.email,i=ye.credentialFromError(t);if(console.error("Error handling redirect result:",{errorCode:e,errorMessage:n,email:r,credential:i,origin:typeof window<"u"?window.location.origin:"n/a"}),e==="auth/unauthorized-domain"){const s=typeof window<"u"?window.location.origin:"",o=["This app's host is not whitelisted in Firebase Authentication.","Fix: In Firebase Console, go to Build → Authentication → Settings → Authorized domains and add this origin:",s?`• ${s}`:"• <your dev origin>","","Common dev hosts to add:","• http://localhost (covers any port)","• http://127.0.0.1","• http://[::1] (IPv6 localhost)","• Your LAN IP, e.g. http://192.168.x.y","","Tip: avoid opening index.html directly from the filesystem (file://). Use a dev server instead."];s&&typeof navigator<"u"&&navigator.clipboard?.writeText&&navigator.clipboard.writeText(s).catch(()=>{}),alert(`Sign-in failed: Unauthorized domain.

${o.join(`
`)}`)}else alert(`Sign-in failed: ${n}`);return{success:!1,user:null,error:t}}}async function Tg(){try{await bk(Ae),console.info("User signed out"),setTimeout(()=>vg(),1500)}catch(t){throw console.error("Error signing out:",t),t}}const zR=Object.freeze(Object.defineProperty({__proto__:null,auth:Ae,authReady:wg,getCurrentUserAsync:VR,getLoggedInUserId:Ze,getUserId:de,handleRedirectResult:Cg,isLoggedIn:tl,onAuthChange:nl,setSafariExternalOpenArmed:bg,signInWithGoogle:Sg,signOutUser:Tg},Symbol.toStringTag,{value:"Module"})),GR=t=>String(t).replace(/[&<>"'`=\/]/g,n=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;","`":"&#x60;","=":"&#x3D;","/":"&#x2F;"})[n]),qR=(t,e)=>t.replace(/\$\{([^}]+)\}/g,(n,r)=>{const i=r.trim(),s=i.split(".").reduce((a,c)=>a?.[c],e);return s==null?"":i.endsWith("Html")?String(s):GR(String(s))}),YR=(t,e={})=>{const n=document.createElement("template");return n.innerHTML=qR(t,e),n.content.cloneNode(!0)},KR=(t,e)=>{const n=[];let r=e;for(;r&&r!==t;){const i=r.parentElement;if(!i)break;const s=Array.prototype.indexOf.call(i.children,r);n.push(s),r=i}return n.reverse()},JR=(t,e)=>e.reduce((n,r)=>n&&n.children?n.children[r]:null,t),XR=t=>Array.from(t.querySelectorAll("input, textarea, select")).map(e=>({name:e.name,id:e.id,path:KR(t,e),value:e.value,checked:e.checked,selectionStart:e.selectionStart,selectionEnd:e.selectionEnd,wasFocused:document.activeElement===e})),QR=t=>t.replace(/["'\\]/g,"\\$&"),ZR=(t,e)=>{e.forEach(n=>{let r=null;if(n.name){const i=QR(n.name);r=t.querySelector(`input[name="${i}"], textarea[name="${i}"], select[name="${i}"]`)}else n.id?r=t.querySelector(`#${n.id}`):n.path&&(r=JR(t,n.path));if(r){if(r.value=n.value,n.checked!==void 0&&(r.checked=n.checked),n.selectionStart!=null&&r.setSelectionRange)try{r.setSelectionRange(n.selectionStart,n.selectionEnd)}catch{}if(n.wasFocused)try{r.focus()}catch{}}})},eA=t=>Array.from(t.querySelectorAll("video, audio")).map(e=>({src:e.currentSrc||e.src,currentTime:e.currentTime,paused:e.paused,volume:e.volume,playbackRate:e.playbackRate,muted:e.muted})),tA=(t,e)=>{const n=t.querySelectorAll("video, audio");for(const r of n)if(r.currentSrc===e||r.src===e)return r;return null},nA=(t,e)=>{e.forEach(n=>{if(!n.src)return;const r=tA(t,n.src);r&&(r.currentTime=n.currentTime,r.volume=n.volume,r.playbackRate=n.playbackRate,r.muted=n.muted,n.paused||r.play().catch(()=>{}))})},rA=()=>document.readyState!=="loading",iA=({initialProps:t={},template:e="",handlers:n={},parent:r=null,containerTag:i="div",className:s="",onMount:o=null,onCleanup:a=null,autoAppend:c=!0,preserveInputState:l=!0}={})=>{if(!rA())return console.error("createComponent: DOM must be ready before creating components."),null;const u=document.createElement(i);s&&(u.className=s);let d={...t};const h=new Set,f=/\$\{([^}]+)\}/g;let p;for(;(p=f.exec(e))!==null;){const S=p[1].trim().split(".")[0];h.add(S)}const y=[],m=[],A={},N=()=>{let S=[],re=[];l&&(S=XR(u),re=eA(u)),u.textContent="";const Ie=YR(e,d);u.appendChild(Ie),Object.keys(n).forEach(ze=>{const we=u.querySelectorAll(`[onclick="${ze}"]`),_n=n[ze];we.forEach(Y=>{Y.removeAttribute("onclick"),typeof _n=="function"&&Y.addEventListener("click",_n)})}),l&&(ZR(u,S),nA(u,re)),y.forEach(ze=>ze({...d}))},le=S=>{if(!Array.isArray(S)||S.length===0)return;const re={props:{...d},changedKeys:S};m.forEach(Ie=>Ie(re))};for(const S of Object.keys(t))A[S]=[],Object.defineProperty(u,S,{get(){return d[S]},set(re){d[S]!==re&&(d[S]=re,h.has(S)&&N(),A[S].forEach(Ie=>Ie(re)),le([S]))},configurable:!0,enumerable:!0});if(u.update=S=>{let re=!1,Ie=!1;const ze=[];for(const we in S)S[we]!==d[we]&&(d[we]=S[we],h.has(we)&&(Ie=!0),A[we]&&A[we].forEach(_n=>_n(S[we])),re=!0,ze.push(we));re&&Ie&&N(),ze.length>0&&le(ze)},u.onRender=S=>{typeof S=="function"&&y.push(S)},u.onAnyPropUpdated=S=>{typeof S=="function"&&m.push(S)},u.onPropUpdated=(S,re)=>{typeof re=="function"&&A[S]&&A[S].push(re)},u.dispose=()=>{a&&(Array.isArray(a)?a.forEach(S=>{typeof S=="function"&&S()}):typeof a=="function"&&a()),y.length=0,m.length=0;for(const S in A)A[S].length=0;u.remove()},N(),c&&r&&!r.contains(u)&&r.appendChild(u),typeof o=="function")try{o(u)}catch(S){DR("[createComponent]: Error in onMount handler of component",S)}return u};let _r=null;const sA=(t,e=null)=>{if(_r)return _r;if(!t)return console.error("Auth UI: Parent element is required"),null;let n=null,r=null,i=10;typeof e=="number"&&(i=e);const s=tl();return _r=iA({initialProps:{isLoggedIn:s,userName:"Guest User",signingInDisplay:"none",loginBtnMarginRightPx:i},template:`
      <button style="margin-right: \${loginBtnMarginRightPx}px" id="goog-login-btn" class="login-btn" onclick="handleLogin" disabled>Login</button>
      <button id="goog-logout-btn" class="logout-btn" onclick="handleLogout" disabled>Logout</button>
      <span class="signing-in-indicator" style="display: \${signingInDisplay}; color: var(--text-secondary, #888); font-size: 0.9rem;">Signing in...</span>
      <div class="user-info">\${isLoggedIn ? 'Logged in: ' + userName : 'Logged out'}</div>
    `,handlers:{handleLogin:Sg,handleLogout:Tg},onMount:o=>{const a=c=>{const l=o.querySelector("#goog-login-btn"),u=o.querySelector("#goog-logout-btn");l&&u&&(l.disabled=c,u.disabled=!c)};a(s),n=nl(({isLoggedIn:c,userName:l})=>{U("[AuthComponent] Auth state changed:",{isLoggedIn:c,userName:l}),a(c),o.update({isLoggedIn:c,userName:l,signingInDisplay:"none"})}),r=FR(c=>{U("[AuthComponent] One Tap status:",c),c==="signing_in"?o.update({signingInDisplay:"inline-block"}):o.update({signingInDisplay:"none"})})},onCleanup:()=>{n&&(n(),n=null),r&&(r(),r=null),_r=null},className:"auth-component",parent:t}),_r},rl=t=>t?!0:(console.warn("Element not found. el.id: =>",t?.id??"(no id)","el: =>",t),console.trace(),!1),il=t=>{if(rl(t))return t.classList.contains("hidden")},R=t=>{rl(t)&&t.classList.contains("hidden")&&t.classList.remove("hidden")},E=t=>{rl(t)&&!t.classList.contains("hidden")&&t.classList.add("hidden")},Ig=t=>t.classList.contains("small-frame"),Rn=t=>{if(t&&!Ig(t)){t.classList.add("small-frame");const e=document.createElement("div");e.classList.add("small-frame-toggle-div");const n=document.createElement("span");n.classList.add("small-frame-toggle-icon"),n.textContent="❮",e.appendChild(n),t.appendChild(e),e.addEventListener("click",()=>{t.classList.contains("closed")?(t.classList.remove("closed"),e.classList.remove("closed"),n.classList.remove("closed")):(t.classList.add("closed"),e.classList.add("closed"),n.classList.add("closed"))})}},It=t=>{if(Ig(t)){t.classList.remove("small-frame");const e=document.querySelector(".small-frame-close");e&&e.remove()}};function Sa(t){return document.pictureInPictureElement===t}function Ks(t="room"){const e=new URL(window.location);e.searchParams.delete(t),window.history.replaceState({},"",e)}const j=t=>{const e=document.getElementById(t);return e||(console.warn(`Element with id: ${t} not found.`),null)};let Je=null,Vt=null,Js=null,sl=null,be=null,te=null,K=null,B=null,W=null,Te=null,Ne=null,Oe=null,je=null,cr=null,kg=null,Ve=null,Xs=null,lr=null,ur=null,ol=null,al=null,cl=null,ll=null;function xd(){Je=j("lobby"),Vt=j("lobby-call-btn"),Js=j("title-auth-bar"),sl=j("videos"),be=j("local-video-el"),te=j("local-video-box"),K=j("remote-video-el"),B=j("remote-video-box"),W=j("shared-video-el"),Te=j("shared-video-box"),Ne=j("chat-controls"),Oe=j("call-btn"),je=j("hang-up-btn"),cr=j("switch-camera-btn"),Ve=j("mute-btn"),Xs=j("fullscreen-partner-btn"),lr=j("mic-btn"),ur=j("camera-btn"),ol=j("app-pip-btn"),al=j("app-title-h1"),cl=j("app-title-a"),ll=j("app-title-span")}document.readyState==="loading"?document.addEventListener("DOMContentLoaded",xd):xd();const Rg=()=>({lobbyDiv:Je,lobbyCallBtn:Vt,titleAuthBar:Js,videosWrapper:sl,localVideoEl:be,localBoxEl:te,remoteVideoEl:K,remoteBoxEl:B,sharedVideoEl:W,sharedBoxEl:Te,chatControls:Ne,callBtn:Oe,hangUpBtn:je,switchCameraBtn:cr,installBtn:kg,mutePartnerBtn:Ve,fullscreenPartnerBtn:Xs,micBtn:lr,cameraBtn:ur,appPipBtn:ol,appTitleH1:al,appTitleA:cl,appTitleSpan:ll});function Ag(t,e=3,n=100){return new Promise(r=>{let i=0;const s=()=>{const o=document.getElementById(t);if(o){r(o);return}if(i++,i>=e){console.warn(`Element ${t} not found after ${e} attempts`),r(null);return}setTimeout(s,n)};s()})}async function Ng(t,e=3,n=100){const r={},i=t.map(async s=>{const o=await Ag(s,e,n);return r[s]=o,o});return await Promise.all(i),r}async function oA(){const t=await Ng(["searchBtn","searchQuery","searchResults"],5,200),e=document.querySelector(".search-section");t.searchContainer=e;const n=Object.entries(t).filter(([r,i])=>!i).map(([r])=>r);return n.length>0&&console.warn("Some YouTube elements not found:",n),t}const aA=Object.freeze(Object.defineProperty({__proto__:null,get appPipBtn(){return ol},get appTitleA(){return cl},get appTitleH1(){return al},get appTitleSpan(){return ll},get callBtn(){return Oe},get cameraBtn(){return ur},get chatControls(){return Ne},get fullscreenPartnerBtn(){return Xs},getElements:Rg,get hangUpBtn(){return je},initializeYouTubeElements:oA,installBtn:kg,get lobbyCallBtn(){return Vt},get lobbyDiv(){return Je},get localBoxEl(){return te},get localVideoEl(){return be},get micBtn(){return lr},get mutePartnerBtn(){return Ve},get remoteBoxEl(){return B},get remoteVideoEl(){return K},robustElementAccess:Ag,get sharedBoxEl(){return Te},get sharedVideoEl(){return W},get switchCameraBtn(){return cr},get titleAuthBar(){return Js},get videosWrapper(){return sl},waitForElements:Ng},Symbol.toStringTag,{value:"Module"})),Fd="yt-video-box",Ca="yt-player-root";let H=null,_t=!1;const Nr=()=>H,cA=()=>_t,Pg=t=>_t=t,An=()=>{const t=document.getElementById(Fd);if(!t)throw new Error(`Container #${Fd} not found`);return t};function lA(){return new Promise(t=>{window.YT&&window.YT.Player?t():window.onYouTubeIframeAPIReady=()=>{t()}})}function Lg(){const t=An();if(!document.getElementById(Ca)){const e=document.createElement("div");e.id=Ca,t.appendChild(e)}R(t)}function Ta(){const t=An();E(t)}function Ao(){const t=An();return t&&!t.classList.contains("hidden")}function Ia(t){return t?t.includes("youtube.com")||t.includes("youtu.be"):!1}function Og(t){if(!t)return null;const e=[/(?:youtube\.com\/watch\?v=)([\w-]+)/,/(?:youtu\.be\/)([\w-]+)/,/(?:youtube\.com\/embed\/)([\w-]+)/,/(?:youtube\.com\/shorts\/)([\w-]+)/];for(const n of e){const r=t.match(n);if(r&&r[1])return r[1]}return null}async function uA({url:t,onReady:e,onStateChange:n}){const r=Og(t);if(!r)throw new Error("Invalid YouTube URL");if(await lA(),H){try{H.destroy()}catch(o){console.warn("Error destroying previous YouTube player:",o)}H=null}const i=(o=!0)=>{const a=An(),c=H.getIframe();if(c&&a){try{a.tabIndex=-1,a.focus({preventScroll:!0})}catch{if(document.activeElement===c)try{c.blur()}catch{}}if(o){const l=u=>{if(u.code==="Space"){const d=An(),h=H.getIframe();if(document.activeElement===h||document.activeElement===d)return;u.preventDefault(),console.debug("Space pressed, refocusing iframe"),H.getPlayerState()!==window.YT.PlayerState.PLAYING?dl():Qs()}};document.addEventListener("keydown",l,{once:!0})}}},s=()=>{const o=An(),a=H.getIframe();if(o&&a&&document.activeElement!==a)try{a.focus()}catch{}};return Lg(),new Promise((o,a)=>{try{H=new window.YT.Player(Ca,{videoId:r,playerVars:{autoplay:1,mute:0,controls:1,fs:1,rel:0,modestbranding:1,disablekb:0,origin:window.location.origin},events:{onReady:c=>{_t=!0,e&&e(c),o(H)},onStateChange:c=>{c.data===window.YT.PlayerState.ENDED&&i(!1),c.data===window.YT.PlayerState.PAUSED&&i(),c.data===window.YT.PlayerState.PLAYING&&s(),n&&n(c)},onError:c=>{console.error("YouTube player error:",c.data),a(new Error(`YouTube error: ${c.data}`))}}})}catch(c){a(c)}})}function ul(){if(H){try{Ta(),H.destroy()}catch(t){console.warn("Error destroying YouTube player:",t)}H=null,_t=!1}}function dl(){H&&_t&&H.playVideo()}function Qs(){H&&_t&&H.pauseVideo()}function dA(t){H&&_t&&H.seekTo(t,!0)}function ps(){return H&&_t?H.getCurrentTime():0}function hl(){return H&&_t?H.getPlayerState():-1}const kt={UNSTARTED:-1,ENDED:0,PLAYING:1,PAUSED:2,BUFFERING:3,CUED:5};let We=null,pi=null,Dg=!1,Pe="none",fl=null;const gi=()=>Dg,Mg=t=>Dg=t,yr=()=>Pe,hA=t=>{["yt","url","none"].includes(t)?Pe=t:console.warn("Invalid lastWatched platform:",t)};let Rt=!1,Pr=null,Lr=0;async function Nn(t){if(!We)return;console.debug("Updating watch sync state, roomId:",We);const e=Gs(We);try{await Oi(e,{...t,updatedBy:pi})}catch(n){console.error("Failed to update watch state:",n)}}function fA(t,e,n){if(!t)return;We=t,pi=n;const r=Gs(t);Di(r,pA,t),wA()}function pA(t){const e=t.val();e&&e.updatedBy!==pi&&(Date.now()-Lr<500||(e.url&&e.url!==fl&&gA(e.url),e.isYouTube?mA(e):vA(e)))}function gA(t){fl=t,Ia(t)?(E(Te),xg(t),Pe="yt"):(ul(),R(Te),W.src=t,Pe="url")}function mA(t){!Nr()||!cA()||(_A(t),yA(t))}function _A(t){const e=hl(),n=e===kt.PLAYING;if([kt.BUFFERING,kt.UNSTARTED].includes(e)){EA();return}Rt||(t.playing&&!n?(dl(),Pe="yt"):!t.playing&&n&&(Qs(),Pe="yt"))}function yA(t){if(t.currentTime===void 0)return;const e=ps();Math.abs(e-t.currentTime)>.3&&!Rt&&(dA(t.currentTime),setTimeout(()=>{t.playing?dl():Qs(),Pe="yt"},500))}function EA(){Rt=!0,clearTimeout(Pr),Pr=setTimeout(async()=>{Rt=!1;const t=hl()===kt.PLAYING;await Nn({playing:t,currentTime:ps()})},700)}function vA(t){t.playing!==void 0&&(t.playing&&W.paused?W.play().catch(e=>console.warn("Play failed:",e)):!t.playing&&!W.paused&&W.pause()),t.currentTime!==void 0&&Math.abs(W.currentTime-t.currentTime)>1&&(W.currentTime=t.currentTime,t.playing?W.play().catch(n=>console.warn("Play failed:",n)):W.pause())}function wA(){W.addEventListener("play",async()=>{!Nr()&&We&&(Lr=Date.now(),await Nn({playing:!0,isYouTube:!1})),Pe="url"}),W.addEventListener("pause",async()=>{!Nr()&&We&&(Lr=Date.now(),await Nn({playing:!1,isYouTube:!1})),Pe="url"}),W.addEventListener("seeked",async()=>{!Nr()&&We&&(Lr=Date.now(),await Nn({currentTime:W.currentTime,playing:!W.paused,isYouTube:!1})),Pe="url"})}async function bA(t){if(!t)return!1;if(Lr=Date.now(),Ia(t)){if(E(Te),!await xg(t))return!1;Pe="yt"}else ul(),R(Te),W.src=t,Pe="url";if(We){const e=Gs(We);gt(e,{url:t,playing:!1,currentTime:0,isYouTube:Ia(t),updatedBy:pi})}return!0}async function bn(t){if(!t||!t.url)return console.warn("Non-existing or invalid video."),!1;fl=t.url;const e=await bA(t.url);return Ra(),e}async function xg(t){if(!Og(t))return console.error("Invalid YouTube URL:",t),!1;try{return await uA({url:t,onReady:n=>{if(Pg(!0),We){const r=Gs(We);gt(r,{url:t,playing:!1,currentTime:0,isYouTube:!0,updatedBy:pi})}},onStateChange:async n=>{if(!Nr())return;const i=n.data===kt.PLAYING,s=n.data===kt.PAUSED;if(n.data===kt.BUFFERING){Rt=!0,Pr&&clearTimeout(Pr),Pr=setTimeout(async()=>{Rt=!1;const c=hl()===kt.PLAYING;await Nn({playing:c,currentTime:ps()})},700);return}s&&Rt||!Rt&&(i||s)&&await Nn({playing:i,currentTime:ps()})}}),!0}catch(n){return console.error("Failed to load YouTube video:",n),!1}}function SA(t,{inactivityMs:e=3e3,listenTarget:n=document,onShow:r=null,onHide:i=null,hideOnEsc:s=!1,excludeEvents:o=["keydown"]}={}){if(!t)return()=>{};let a=null;const l=["pointermove","pointerdown","pointerup","touchstart","touchmove","mousemove","mousedown","keydown"].filter(m=>!Array.isArray(o)||!o.includes(m));function u(){R(t);try{typeof r=="function"&&r()}catch(m){console.warn("showHideOnInactivity onShow callback error:",m)}a&&clearTimeout(a),a=setTimeout(()=>{E(t);try{typeof i=="function"&&i()}catch(m){console.warn("showHideOnInactivity onHide callback error:",m)}a=null},e)}l.forEach(m=>n.addEventListener(m,u,{passive:!0}));function d(){if(document.hidden){a&&(clearTimeout(a),a=null);try{E(t)}catch(m){console.warn("showHideOnInactivity onHide (visibilitychange) callback error:",m)}}else u()}document.addEventListener("visibilitychange",d);function h(m){if(!m.relatedTarget){a&&(clearTimeout(a),a=null),E(t);try{typeof i=="function"&&i()}catch(A){console.warn("showHideOnInactivity onHide (visibilitychange) callback error:",A)}}}n.addEventListener("mouseout",h);function f(m){if(s&&(m.key==="Escape"||m.key==="Esc")){a&&(clearTimeout(a),a=null),E(t);try{typeof i=="function"&&i()}catch(A){console.warn("showHideOnInactivity onHide (esc) callback error:",A)}}}document.addEventListener("keydown",f);function p(){a||u()}n.addEventListener("touchend",p,{passive:!0}),E(t);function y(){l.forEach(m=>n.removeEventListener(m,u)),document.removeEventListener("visibilitychange",d),n.removeEventListener("mouseout",h),n.removeEventListener("touchend",p),document.removeEventListener("keydown",f),a&&(clearTimeout(a),a=null)}return y}let At=null,Nt=null,Fg="user";function ka(){return Fg}function Ug(t){Fg=t}function Zs(t=!0){return!At||!(At instanceof MediaStream)?(t&&console.error("Invalid remote MediaStream accessed:",At),null):At}function $g(t){At=t}function Bg(){At&&(At.getTracks().forEach(t=>t.stop()),At=null)}function eo(t=!0){return!Nt||!(Nt instanceof MediaStream)?(t&&(console.error("Invalid local MediaStream accessed:",Nt),console.error("Call createLocalStream() before accessing local stream.")),null):Nt}function gs(t){Nt=t}function Hg(){Nt&&(Nt.getTracks().forEach(t=>t.stop()),Nt=null)}const CA=Object.freeze(Object.defineProperty({__proto__:null,cleanupLocalStream:Hg,cleanupRemoteStream:Bg,getFacingMode:ka,getLocalStream:eo,getRemoteStream:Zs,setFacingMode:Ug,setLocalStream:gs,setRemoteStream:$g},Symbol.toStringTag,{value:"Module"}));let Kr=!1,Ii=!1,Ud=null,$d=null,Or=null;const TA=()=>Kr;let pl=()=>{if(Kr)return;const t=Zs(!1);if(!K||!t||K.paused||K.readyState<2){Ii||(Ii=!0,K.addEventListener("playing",()=>{Ii=!1,pl()},{once:!0}));return}if(Ii=!1,Kr=!0,R(B),R(te),Rn(te),E(Je),E(Vt),Oe.disabled=!0,Oe.classList.add("disabled"),je.disabled=!1,je.classList.remove("disabled"),Ve.disabled=!1,Ve.classList.remove("disabled"),Or||(Or=SA(Ne,{inactivityMs:2500,hideOnEsc:!0})),!Ud){const e=()=>{gi()?Rn(B):It(B),R(B)};K.addEventListener("leavepictureinpicture",e),Ud=()=>K.removeEventListener("leavepictureinpicture",e)}if(!$d){const e=()=>E(B);K.addEventListener("enterpictureinpicture",e),$d=()=>K.removeEventListener("enterpictureinpicture",e)}},Wg=()=>{Kr&&(Kr=!1,It(te),E(te),It(B),E(B),Oe.disabled=!1,Oe.classList.remove("disabled"),R(Vt),je.disabled=!0,je.classList.add("disabled"),Ve.disabled=!0,Ve.classList.add("disabled"),Or&&(Or(),Or=null),R(Je),R(Ne))};const ms=()=>{const t=Zs(!1);return t&&t.getVideoTracks().length>0&&t.getVideoTracks()[0].enabled&&t.getVideoTracks()[0].readyState==="live"};function IA(){return"pictureInPictureEnabled"in document&&typeof document.pictureInPictureEnabled=="boolean"&&document.pictureInPictureEnabled}function Ra(){if(!gi()){if(Mg(!0),E(Je),Ne.classList.remove("bottom"),Ne.classList.add("watch-mode"),TA()?(E(Oe),R(je)):(E(je),E(lr),E(Ve),R(Oe)),E(Vt),E(ur),E(cr),R(Ne),!ms()){E(B),It(B),Sa(be)||(R(te),Rn(te));return}E(te),It(te),Sa(K)?(E(B),It(B)):IA()?K.requestPictureInPicture().then(()=>{E(B),It(B)}).catch(t=>{console.warn("Failed to enter Picture-in-Picture:",t),Rn(B),R(B)}):(Rn(B),R(B))}}function $i(){gi()&&(R(Oe),R(je),R(lr),R(Ve),R(ur),R(cr),Ne.classList.remove("watch-mode"),Ne.classList.add("bottom"),R(Ne),ms()&&(Sa(K)&&document.exitPictureInPicture().catch(t=>{console.error("Failed to exit Picture-in-Picture:",t)}),It(B),R(B)),Rn(te),R(te),ms()||(R(Je),R(Vt)),Mg(!1))}class Pn{constructor(){this.logs=[],this.isEnabled=!0,this.maxLogs=1e3,this.sessionId=this.generateSessionId()}log(e,n,r={}){if(!this.isEnabled)return;const i={timestamp:performance.now(),sessionId:this.sessionId,category:e,event:n,data:{...r},id:this.generateLogId()};this.logs.push(i),this.logs.length>this.maxLogs&&(this.logs=this.logs.slice(-this.maxLogs)),typeof window<"u"&&window.location?.hostname==="localhost"&&console.log(`[DIAG] ${e}:${n}`,r)}logListenerAttachment(e,n,r,i={}){this.log("LISTENER","ATTACHED",{roomId:e,listenerType:n,currentCount:r,...i})}logListenerCleanup(e,n,r={}){this.log("LISTENER","CLEANUP",{removedCount:e.length,preservedCount:n.length,removedRoomIds:e,preservedRoomIds:n,...r})}logDuplicateListener(e,n,r={}){this.log("LISTENER","DUPLICATE_PREVENTED",{roomId:e,listenerType:n,...r})}logIncomingCallEvent(e,n,r,i={}){this.log("INCOMING_CALL","DETECTED",{callerId:e,roomId:n,isFresh:r.isFresh,validationMethod:r.method,age:r.age,reason:r.reason,...i})}logNotificationDecision(e,n,r,i={}){this.log("INCOMING_CALL","NOTIFICATION_DECISION",{decision:e,reason:n,roomId:r,...i})}logCallingUILifecycle(e,n,r={}){this.log("CALLING_UI",e,{roomId:n,...r})}logFirebaseOperation(e,n,r=null,i={}){this.log("FIREBASE","OPERATION",{operation:e,success:n,error:r?{message:r.message,code:r.code,stack:r.stack}:null,...i})}logFirebaseConnectionState(e,n={}){this.log("FIREBASE","CONNECTION_STATE",{state:e,...n})}logRoomCreation(e,n,r,i={}){this.log("ROOM","CREATED",{roomId:e,isInitiator:n,creationTime:r.creationTime,listenerAttachTime:r.listenerAttachTime,timeDiff:r.listenerAttachTime-r.creationTime,...i})}logMemberJoinEvent(e,n,r,i={}){this.log("ROOM","MEMBER_JOINED",{roomId:e,memberId:n,joinedAt:r.joinedAt,role:r.role,...i})}logContactSave(e,n,r={}){this.log("CONTACT","SAVED",{contactId:e,roomId:n,...r})}logContactCall(e,n,r,i={}){this.log("CONTACT","CALL_INITIATED",{contactId:e,roomId:n,forceInitiator:r,...i})}logFreshnessValidation(e,n,r,i={}){this.log("FRESHNESS","VALIDATION",{roomId:e,method:n,result:{isFresh:r.isFresh,age:r.age,threshold:r.threshold,reason:r.reason},...i})}logRaceCondition(e,n,r,i={}){this.log("RACE_CONDITION",e,{roomId:n,events:r,...i})}getLogs(e={}){let n=[...this.logs];return e.category&&(n=n.filter(r=>r.category===e.category)),e.event&&(n=n.filter(r=>r.event===e.event)),e.roomId&&(n=n.filter(r=>r.data.roomId===e.roomId)),e.since&&(n=n.filter(r=>r.timestamp>=e.since)),e.until&&(n=n.filter(r=>r.timestamp<=e.until)),n}getCallFlowTrace(e){return this.getLogs({roomId:e}).sort((n,r)=>n.timestamp-r.timestamp)}getListenerDiagnostics(e=null){const n=this.getLogs({category:"LISTENER"});return e?n.filter(r=>r.data.roomId===e):n}getFailureAnalysis(){const e=this.logs.filter(n=>n.category==="FIREBASE"&&n.data.success===!1||n.category==="INCOMING_CALL"&&n.data.decision==="REJECT"||n.category==="LISTENER"&&n.event==="DUPLICATE_PREVENTED");return{totalFailures:e.length,firebaseFailures:e.filter(n=>n.category==="FIREBASE").length,rejectedCalls:e.filter(n=>n.category==="INCOMING_CALL"&&n.data.decision==="REJECT").length,duplicateListeners:e.filter(n=>n.event==="DUPLICATE_PREVENTED").length,failures:e}}exportDiagnostics(){return{sessionId:this.sessionId,exportTime:Date.now(),logCount:this.logs.length,logs:[...this.logs],summary:this.getFailureAnalysis()}}exportLogsAsJSON(){return JSON.stringify(this.exportDiagnostics(),null,2)}downloadLogs(e=null){e||(e=`diagnostic-logs-${this.sessionId}-${Date.now()}.json`);const n=this.exportLogsAsJSON(),r=new Blob([n],{type:"application/json"}),i=document.createElement("a");i.href=URL.createObjectURL(r),i.download=e,i.click(),URL.revokeObjectURL(i.href)}getLogsInTimeRange(e,n){return this.logs.filter(r=>r.timestamp>=e&&r.timestamp<=n)}getLogsSince(e){return this.logs.filter(n=>n.timestamp>=e)}clearOldLogs(e=1440*60*1e3){const n=Date.now()-e;this.logs=this.logs.filter(r=>r.timestamp>=n)}clearLogs(){this.logs=[]}persistLogs(){try{const e=`diagnostic-logs-${this.sessionId}`;return localStorage.setItem(e,this.exportLogsAsJSON()),e}catch(e){return console.warn("Failed to persist logs to localStorage:",e),null}}loadPersistedLogs(e){try{const n=localStorage.getItem(e);if(n){const r=JSON.parse(n);if(r.logs&&Array.isArray(r.logs)){const i=new Set(this.logs.map(o=>o.id)),s=r.logs.filter(o=>!i.has(o.id));return this.logs=[...this.logs,...s].sort((o,a)=>o.timestamp-a.timestamp),s.length}}return 0}catch(n){return console.warn("Failed to load persisted logs:",n),0}}static getPersistedLogKeys(){const e=[];for(let n=0;n<localStorage.length;n++){const r=localStorage.key(n);r&&r.startsWith("diagnostic-logs-")&&e.push(r)}return e}static cleanupPersistedLogs(e=1440*60*1e3){const n=Date.now()-e;Pn.getPersistedLogKeys().forEach(i=>{try{const s=localStorage.getItem(i);if(s){const o=JSON.parse(s);o.exportTime&&o.exportTime<n&&localStorage.removeItem(i)}}catch{localStorage.removeItem(i)}})}enable(){this.isEnabled=!0}disable(){this.isEnabled=!1}generateSessionId(){return`session_${performance.now()}_${Math.random().toString(36).substr(2,9)}`}generateLogId(){return`log_${performance.now()}_${Math.random().toString(36).substr(2,9)}`}formatTimestamp(e){return new Date(e).toISOString()}startTiming(e){const n=`timing_${e}_${Date.now()}`;return this.log("TIMING","START",{operation:e,timingId:n}),n}endTiming(e,n={}){const r=this.logs.find(i=>i.category==="TIMING"&&i.event==="START"&&i.data.timingId===e);if(r){const i=Date.now()-r.timestamp;return this.log("TIMING","END",{timingId:e,duration:i,operation:r.data.operation,...n}),i}return null}}let No=null;function _(){return No||(No=new Pn),No}typeof window<"u"&&(window.diagnosticLogger={getInstance:()=>_(),exportLogs:()=>{const e=_().exportLogsAsJSON();return console.log("Diagnostic logs exported:"),console.log(e),e},downloadLogs:t=>{_().downloadLogs(t),console.log("Diagnostic logs downloaded")},getRoomLogs:t=>{const n=_().getCallFlowTrace(t);return console.log(`Logs for room ${t}:`,n),n},getFailures:()=>{const e=_().getFailureAnalysis();return console.log("Failure analysis:",e),e},getListenerDiagnostics:t=>{const n=_().getListenerDiagnostics(t);return console.log("Listener diagnostics:",n),n},getLogsSince:t=>{const n=_().getLogsSince(t);return console.log(`Logs since ${new Date(t).toISOString()}:`,n),n},getLogsInRange:(t,e)=>{const r=_().getLogsInTimeRange(t,e);return console.log(`Logs from ${new Date(t).toISOString()} to ${new Date(e).toISOString()}:`,r),r},persistLogs:()=>{const e=_().persistLogs();return console.log(`Logs persisted with key: ${e}`),e},loadPersistedLogs:t=>{const n=_().loadPersistedLogs(t);return console.log(`Loaded ${n} persisted logs`),n},getPersistedKeys:()=>{const t=Pn.getPersistedLogKeys();return console.log("Persisted log keys:",t),t},clearLogs:()=>{_().clearLogs(),console.log("Diagnostic logs cleared")},enable:()=>{_().enable(),console.log("Diagnostic logging enabled")},disable:()=>{_().disable(),console.log("Diagnostic logging disabled")},getSessionInfo:()=>{const t=_(),e={sessionId:t.sessionId,logCount:t.logs.length,isEnabled:t.isEnabled,maxLogs:t.maxLogs};return console.log("Session info:",e),e},help:()=>{console.log(`
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
      `)}},window.addEventListener("beforeunload",()=>{try{const t=_();t.logs.length>0&&t.persistLogs(),Pn.cleanupPersistedLogs()}catch{}}),(window.location.hostname==="localhost"||window.location.hostname==="127.0.0.1")&&setTimeout(()=>{try{const t=_(),e=typeof localStorage<"u"&&localStorage.getItem("debug:console")==="1";if(!t.isEnabled||!e)return;const n=Pn.getPersistedLogKeys();n.length>0&&(console.log(`Found ${n.length} persisted diagnostic log sessions. Use diagnosticLogger.loadPersistedLogs(key) to load them.`),console.log("Available keys:",n))}catch{}},1e3));class kA{constructor(){this.currentRoomId=null}async createNewRoom(e,n,r=null){const i=Date.now();r||(r=Math.random().toString(36).substring(2,15)),_().log("ROOM","CREATE_START",{roomId:r,userId:n,hasOffer:!!e,timestamp:i});const s=Gt(r);try{return await gt(s,{offer:{type:e.type,sdp:e.sdp},createdAt:Date.now(),createdBy:n}),_().logFirebaseOperation("create_room",!0,null,{roomId:r,userId:n,duration:Date.now()-i}),await this.joinRoom(r,n),_().log("ROOM","CREATE_COMPLETE",{roomId:r,userId:n,totalDuration:Date.now()-i}),r}catch(o){throw _().logFirebaseOperation("create_room",!1,o,{roomId:r,userId:n,duration:Date.now()-i}),o}}async checkRoomStatus(e){const n=Gt(e),r=await nn(n);if(!r.exists())return{exists:!1,hasMembers:!1,memberCount:0};const i=r.val(),s=i.members||{},o=Object.keys(s).length;return{exists:!0,hasMembers:o>0,memberCount:o,roomData:i}}async getRoomData(e){const n=Gt(e),r=await nn(n);if(!r.exists())throw new Error("Room does not exist");return r.val()}async saveAnswer(e,n){const r=Gt(e);await Oi(r,{answer:n})}async joinRoom(e,n,r="Guest User"){const i=Ed(e,n);await gt(i,{displayName:r,joinedAt:Date.now()}),_().logFirebaseOperation("set","joinRoom",`rooms/${e}/members/${n}`)}async leaveRoom(e,n=null,{deleteRoomIfEmpty:r=!0}={}){const i=n||this.currentRoomId;if(!i||!e)return;const s=Ed(i,e),o=Ci(i),a=Gt(i);try{await zn(s)}catch(c){_().logFirebaseOperation("leave_room_remove_member",!1,c,{roomId:i,userId:e})}if(r)try{const c=await nn(o),l=c.exists()?c.val():{};(l?Object.keys(l).length:0)===0&&await zn(a).catch(d=>{_().logFirebaseOperation("delete_empty_room",!1,d,{roomId:i})})}catch(c){_().logFirebaseOperation("check_members_after_leave",!1,c,{roomId:i})}(!n||n===this.currentRoomId)&&(this.currentRoomId=null)}async rejectCall(e,n,r="user_rejected"){if(!e||!n)return;const i=Gt(e),s={rejection:{by:n,reason:r,at:Date.now()}};try{await Oi(i,s),_().log("ROOM","REJECT_SET",{roomId:e,byUserId:n,reason:r})}catch(o){throw _().log("ROOM","REJECT_SET_FAILED",{roomId:e,byUserId:n,reason:r,error:String(o?.message||o)}),o}}async cancelCall(e,n,r="caller_cancelled"){if(!e||!n)return;const i=Gt(e),s={cancellation:{by:n,reason:r,at:Date.now()}};try{await Oi(i,s),_().log("ROOM","CANCEL_SET",{roomId:e,byUserId:n,reason:r})}catch(o){throw _().log("ROOM","CANCEL_SET_FAILED",{roomId:e,byUserId:n,reason:r,error:String(o?.message||o)}),o}}onCallCancelled(e,n){const r=OI(e);Qt(r,"value",n,e),_().logFirebaseOperation("on","onCallCancelled",`rooms/${e}/cancellation`,{event:"value"})}onMemberJoined(e,n){const r=Ci(e);Qt(r,"child_added",n,e),_().logFirebaseOperation("on","onMemberJoined",`rooms/${e}/members`,{event:"child_added"})}onMemberLeft(e,n){const r=Ci(e);Qt(r,"child_removed",n,e),_().logFirebaseOperation("on","onMemberLeft",`rooms/${e}/members`,{event:"child_removed"})}onIncomingCall(e,n,r){const i=Ci(e),s=a=>{r("join",a.key,a.val())},o=a=>{r("leave",a.key,a.val())};return Qt(i,"child_added",s,e,n),Qt(i,"child_removed",o,e,n),()=>LI(n,e)}get roomId(){return this.currentRoomId}}const V=new kA,_s=3e4;let nt=null,wr=null;async function RA(t,e=null){const n=de(),r=Ze();if(!r)return;const i=Vc(r);await gt(i,{roomId:t,targetContactName:e,initiatedAt:Date.now(),callerUserId:n})}async function ys(){const t=Ze();if(!t)return;const e=Vc(t);await zn(e).catch(()=>{})}async function jg(t,e){if(!t)return!1;try{const n=Vc(t),r=await nn(n);if(!r.exists())return!1;const i=r.val();return i.roomId!==e?!1:Date.now()-i.initiatedAt<_s}catch(n){return console.warn("Failed to check outgoing call freshness",n),!1}}async function Vg(t){if(!t)return!1;try{const e=se(oe,`rooms/${t}/createdAt`),n=await nn(e);if(!n.exists())return!1;const r=n.val();return typeof r!="number"?!1:Date.now()-r<_s}catch(e){return console.warn("Failed to check room freshness",e),!1}}async function zg(t,e,n){const r=_(),i=Date.now();Mt(),await RA(t,e);const s=document.createElement("div");s.id="calling-modal",s.style.cssText=`
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
  `;const u=async()=>{r.logCallingUILifecycle("CANCEL",t,{contactName:e,reason:"user_cancelled",duration:Date.now()-i});try{await Promise.all([ys(),V.cancelCall(t,de(),"caller_cancelled"),V.leaveRoom(de(),t)])}catch(d){r.log("ROOM","CALLER_CANCELLED_CLEANUP_FAIL",{roomId:t,error:String(d)})}Mt()};l.onclick=u,o.appendChild(a),o.appendChild(c),o.appendChild(l),s.appendChild(o),document.body.appendChild(s),s.dataset.roomId=t,nt=s,wr=setTimeout(async()=>{r.logCallingUILifecycle("TIMEOUT",t,{contactName:e,reason:"auto_timeout",duration:Date.now()-i,timeoutMs:_s});try{await Promise.all([ys(),V.cancelCall(t,de(),"auto_timeout"),V.leaveRoom(de(),t)])}catch(d){r.log("ROOM","CALLER_TIMEOUT_CLEANUP_FAIL",{roomId:t,error:String(d)})}Mt()},_s)}function Mt(){if(nt){const t=nt.dataset?.roomId||"unknown";_().logCallingUILifecycle("HIDE",t,{reason:"hide_called",hadTimeout:!!wr,timestamp:Date.now()})}wr&&(clearTimeout(wr),wr=null),nt&&(nt.remove(),nt=null)}async function gl(){if(nt){const t=nt.dataset?.roomId||"unknown";_().logCallingUILifecycle("ANSWERED",t,{reason:"call_answered",timestamp:Date.now()})}await ys(),Mt()}async function AA(t="user_rejected"){const e=_(),n=nt?.dataset?.roomId||"unknown";e.logCallingUILifecycle("REJECTED",n,{reason:t,timestamp:Date.now()}),await ys(),Mt()}const NA=Object.freeze(Object.defineProperty({__proto__:null,hideCallingUI:Mt,isOutgoingCallFresh:jg,isRoomCallFresh:Vg,onCallAnswered:gl,onCallRejected:AA,showCallingUI:zg},Symbol.toStringTag,{value:"Module"}));let Ln=null;function ml(t,e={}){return new Promise(n=>{const r=document.createElement("dialog");r.innerHTML=`
      <p>${t}</p>
      <div class="confirm-dialog-actions">
        <button data-action="cancel">Cancel</button>
        <button data-action="confirm" autofocus>Confirm</button>
      </div>
    `,r.classList.add("confirm-dialog");const i=r.querySelector('[data-action="confirm"]'),s=r.querySelector('[data-action="cancel"]');if(!i||!s){console.error("dialog element not found!"),n(!1);return}let o=null;function a(c){o&&clearTimeout(o),r.close(),r.remove(),Ln===a&&(Ln=null),n(c)}i.addEventListener("click",()=>{a(!0)}),s.addEventListener("click",()=>{a(!1)}),r.addEventListener("cancel",()=>a(!1)),document.body.appendChild(r),r.showModal(),Ln=a,e.autoRemoveSeconds&&typeof e.autoRemoveSeconds=="number"&&e.autoRemoveSeconds>0&&(o=setTimeout(()=>{a(!1)},e.autoRemoveSeconds*1e3))})}function PA(){if(typeof Ln=="function"){try{Ln(!1)}catch{}return Ln=null,!0}return!1}const LA=Object.freeze(Object.defineProperty({__proto__:null,default:ml,dismissActiveConfirmDialog:PA},Symbol.toStringTag,{value:"Module"}));async function Bd(t,e,n){const r=Ze();if(r){const i=se(oe,`users/${r}/contacts/${t}`);await gt(i,{contactId:t,contactName:e,roomId:n,savedAt:Date.now()});return}try{const i=localStorage.getItem("contacts")||"{}",s=JSON.parse(i);s[t]={contactId:t,contactName:e,roomId:n,savedAt:Date.now()},localStorage.setItem("contacts",JSON.stringify(s))}catch(i){console.warn("Failed to save contact to localStorage",i)}}async function Es(){const t=Ze();if(t)try{const e=se(oe,`users/${t}/contacts`),n=await nn(e);return n.exists()?n.val():{}}catch(e){return console.warn("Failed to read contacts from RTDB",e),{}}try{const e=localStorage.getItem("contacts")||"{}";return JSON.parse(e)}catch(e){return console.warn("Failed to read contacts from localStorage",e),{}}}async function OA(t,e,n){if(!t||!e)return;const i=(await Es())?.[t];if(i){i.roomId!==e&&(await Bd(t,i.contactName,e),await Jr(n)),console.log(`[CONTACT SAVE] Re-attaching listener for existing contact room: ${e}`),qn(e);return}if(!await ml("Save contact?",{autoRemoveSeconds:15}))return;const o=window.prompt("Enter a name for this contact:",t)||t;await Bd(t,o,e),console.log(`[CONTACT SAVE] Attaching listener for saved contact room: ${e}`),qn(e),await Jr(n)}async function Jr(t){if(!t)return;const e=await Es(),n=Object.keys(e);let r=t.querySelector(".contacts-container");if(r||(r=document.createElement("div"),r.className="contacts-container",t.appendChild(r)),n.length===0){r.innerHTML="<p>No saved contacts yet.</p>",E(r);return}R(r),r.innerHTML=`
    <h3>Saved Contacts</h3>
    <div class="contacts-list">
      ${n.map(i=>{const s=e[i];return`
            <div class="contact-entry">
              <button 
                class="contact-call-btn" 
                data-room-id="${s.roomId}"
                data-contact-name="${s.contactName}"
              >
                Call
              </button>
              <span class="contact-name">${s.contactName}</span>
              <button 
                class="contact-delete-btn" 
                data-contact-id="${i}"
              >
                ✕
              </button>
            </div>
          `}).join("")}
    </div>
  `,DA(r,t)}function DA(t,e){t.querySelectorAll(".contact-call-btn").forEach(n=>{n.onclick=async()=>{const r=n.getAttribute("data-room-id"),i=n.getAttribute("data-contact-name");r&&(console.log(`[CONTACT CALL] Ensuring listener is active for room: ${r}`),qn(r),await zg(r,i),to(r,{forceInitiator:!0}).catch(s=>{console.warn("Failed to call contact:",s),Mt()}))}}),t.querySelectorAll(".contact-delete-btn").forEach(n=>{n.onclick=async()=>{const r=n.getAttribute("data-contact-id");!r||!window.confirm("Delete this contact?")||(await MA(r),await Jr(e))}})}async function MA(t){const e=Ze();if(e){try{await zn(se(oe,`users/${e}/contacts/${t}`))}catch(n){console.warn("Failed to delete contact from RTDB",n)}return}try{const n=localStorage.getItem("contacts")||"{}",r=JSON.parse(n);r[t]&&(delete r[t],localStorage.setItem("contacts",JSON.stringify(r)))}catch(n){console.warn("Failed to delete contact from localStorage",n)}}const Xr=new WeakMap;function _l(t,e,n){if(!t||!n)throw new Error("setupIceCandidates: pc and roomId are required");if(Xr.has(t)||Xr.set(t,[]),e==="initiator")Hd(t,"offerCandidates",n),Wd(t,"answerCandidates",n);else if(e==="joiner")Hd(t,"answerCandidates",n),Wd(t,"offerCandidates",n);else throw new Error(`Invalid role: ${e} specified for ICE candidate setup.`)}function Hd(t,e,n){t.onicecandidate=r=>{if(r.candidate){const i=hd(e==="offerCandidates"?xp(n):Fp(n));gt(i,r.candidate.toJSON())}}}function Wd(t,e,n){const r=e==="offerCandidates"?xp(n):Fp(n);let i=!1;const s=()=>{if(i)return;i=!0;const a=()=>{t.remoteDescription&&(yl(t),t.removeEventListener("signalingstatechange",a))};t.addEventListener("signalingstatechange",a)};Qt(r,"child_added",a=>{const c=a.val();if(!(!t||t.signalingState==="closed")&&c)if(t.remoteDescription)try{t.addIceCandidate(new RTCIceCandidate(c))}catch{}else{const l=Xr.get(t);l&&(l.push(c),l.length===1&&s())}},n)}function yl(t){if(!t||!Xr.has(t))return;const e=Xr.get(t);if(e.length!==0){U(`🔄 Draining ${e.length} queued ICE candidate(s)`);for(const n of e)try{t.addIceCandidate(new RTCIceCandidate(n)).catch(r=>{U("Error adding queued ICE candidate:",r)})}catch{}e.length=0}}const xA=Object.freeze(Object.defineProperty({__proto__:null,drainIceCandidateQueue:yl,setupIceCandidates:_l},Symbol.toStringTag,{value:"Module"}));let Ge=null,jd=null;function Gg(t){jd=t,t.onconnectionstatechange=()=>{U("onconnectionstatechange:",t.connectionState),t.connectionState==="connected"?(pl(),gl().catch(e=>console.warn("Failed to clear calling state on connect:",e)),Ge&&(clearTimeout(Ge),Ge=null)):t.connectionState==="disconnected"?(Ge&&clearTimeout(Ge),Ge=setTimeout(()=>{t===jd&&t.connectionState==="disconnected"&&ne.cleanupCall({reason:"connection_lost"}),Ge=null},3e3)):t.connectionState==="failed"&&(Ks(),Ge&&(clearTimeout(Ge),Ge=null),ne.cleanupCall({reason:"connection_failed"}))},t.addEventListener("iceconnectionstatechange",e=>{U("ICE iceconnectionstatechange:",t.iceConnectionState),t.iceConnectionState==="failed"&&(console.warn("ICE connection failed, restarting ICE..."),t.restartIce())})}function Aa(t,e,n={}){if(!t||typeof e!="function")throw new Error("closeOnClickOutside: valid element and onClose callback required");const{ignore:r=[],esc:i=!0,events:s=["mousedown","touchstart"]}=n,o=Array.isArray(r)?r.filter(Boolean):[],a=l=>{try{const u=l.target;if(t.contains(u))return;for(const d of o)if(d&&d.contains&&d.contains(u)||d===u)return;e(l)}catch(u){console.error("closeOnClickOutside handler error:",u)}},c=l=>{i&&l.key==="Escape"&&e(l)};return s.forEach(l=>document.addEventListener(l,a,{passive:!0})),i&&document.addEventListener("keydown",c),function(){s.forEach(u=>document.removeEventListener(u,a,{passive:!0})),i&&document.removeEventListener("keydown",c)}}const FA=CSS.supports?.("position-anchor: --msg-toggle")&&CSS.supports?.("right: anchor(right)")&&CSS.supports?.("bottom: anchor(top)");function UA(t){const e=t.getBoundingClientRect();return e.top>=0&&e.left>=0&&e.bottom<=window.innerHeight&&e.right<=window.innerWidth}function Vd(t){const e=document.createElement("div");e.innerHTML=`
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
  `,document.body.appendChild(e);const n=e.querySelector("#messages-toggle-btn"),r=e.querySelector("#messages-box"),i=e.querySelector("#messages"),s=e.querySelector("#messages-form"),o=e.querySelector("#messages-input"),a=n?.parentNode||null,c=n?.nextSibling||null;if(!n||!r||!i||!s||!o)return console.error("Messages UI elements not found."),null;let l=!1;function u(){if(!n||!r||r.classList.contains("hidden"))return;const Y=n.getBoundingClientRect(),he=r.getBoundingClientRect(),Sl=8;let no=Y.top-he.height-Sl;no<8&&(no=Y.bottom+Sl);let dr=Y.left+Y.width/2-he.width/2;const Cl=window.innerWidth-he.width-8;dr<8&&(dr=8),dr>Cl&&(dr=Cl),r.style.top=`${Math.round(no)}px`,r.style.left=`${Math.round(dr)}px`}function d(){l||(l=!0,window.addEventListener("resize",u,{passive:!0}),window.addEventListener("scroll",u,{passive:!0}),window.addEventListener("orientationchange",u,{passive:!0}))}function h(){l&&(l=!1,window.removeEventListener("resize",u),window.removeEventListener("scroll",u),window.removeEventListener("orientationchange",u))}const f=document.querySelector(".top-bar .top-right-menu")||document.querySelector(".top-right-menu");function p(){!n||!f||n.parentNode!==f&&f.appendChild(n)}function y(){!n||!a||n.parentNode!==a&&(c&&c.parentNode===a?a.insertBefore(n,c):a.appendChild(n))}const m=window.matchMedia("(max-width: 800px)"),A=Y=>{Y.matches?p():y()};A(m),m.addEventListener("change",A);const N=new MutationObserver(Y=>{Y.forEach(he=>{he.type==="attributes"&&he.attributeName==="class"&&r.classList.contains("hidden")})});N.observe(r,{attributes:!0});function le(){r.classList.toggle("hidden"),r.classList.contains("hidden")?(o.blur(),h(),r.style.top="",r.style.left="",r.style.bottom="",r.style.right=""):(o.focus(),FA?requestAnimationFrame(()=>{UA(r)||(u(),d())}):(u(),d()))}n.addEventListener("click",le),Aa(r,()=>{E(r),h(),r.style.top="",r.style.left="",r.style.bottom="",r.style.right=""},{ignore:[n],esc:!0});function S(){R(n)}function re(){E(n)}function Ie(Y){const he=document.createElement("p");he.textContent=Y,Y.startsWith("You:")?he.style.textAlign="right":Y.startsWith("Partner:")&&(he.style.textAlign="left"),i.appendChild(he),i.scrollTop=i.scrollHeight}function ze(Y){Ie(`Partner: ${Y}`),il(r)&&we()}function we(){n.classList.add("new-message"),setTimeout(()=>{n.classList.remove("new-message")},4e3)}s.addEventListener("submit",Y=>{Y.preventDefault();const he=o.value.trim();he&&(t(he),Ie(`You: ${he}`),o.value="")});function _n(){try{m.removeEventListener("change",A)}catch{}y(),h(),N.disconnect(),n&&re(),e&&e.parentNode&&e.parentNode.removeChild(e)}return{appendChatMessage:Ie,receiveMessage:ze,toggleMessages:le,showMessagesToggle:S,hideMessagesToggle:re,cleanup:_n}}function qg(t,e){let n,r;return e==="initiator"?(n=t.createDataChannel("chat"),r=Vd(s=>{n.readyState==="open"&&n.send(s)}),n.onopen=()=>{r.showMessagesToggle(),r.appendChatMessage("💬 Chat connected")},n.onmessage=s=>r.receiveMessage(s.data)):e==="joiner"&&(t.ondatachannel=i=>{n=i.channel,r=Vd(s=>n.send(s)),n.onopen=()=>{r.showMessagesToggle(),r.appendChatMessage("💬 Chat connected")},n.onmessage=s=>r.receiveMessage(s.data)}),{dataChannel:n,messagesUI:r}}const El={iceServers:[{urls:"stun:stun.l.google.com:19302"}]},Po=new WeakMap;function Yg(t,e,n){Po.has(t)||Po.set(t,{});const r=Po.get(t),i=e==="offer"?"lastOffer":"lastAnswer";return r[i]===n?!0:(r[i]=n,!1)}function Kg(t,e){return t?e==="offer"?t.signalingState==="stable":t.signalingState==="have-local-offer"||t.signalingState==="stable":!1}function vl(t,e){e.getTracks().forEach(n=>{t.addTrack(n,e)})}async function Jg(t){const e=await t.createOffer();return await t.setLocalDescription(e),e}async function Xg(t){const e=await t.createAnswer();return await t.setLocalDescription(e),e}async function Qg(t,e,n){if(Yg(t,e.type,e.sdp))return console.debug(`Ignoring duplicate ${e.type} - already processed`),!1;if(!Kg(t,e.type))return console.warn(`Ignoring ${e.type} - unexpected signaling state:`,t.signalingState),!1;try{return await t.setRemoteDescription(new RTCSessionDescription(e)),n(t),console.debug(`Remote description set (${e.type})`),!0}catch(r){return console.error(`Failed to set remote description (${e.type}):`,r),!1}}function Zg(){return Math.random().toString(36).substring(2,9)}const $A=Object.freeze(Object.defineProperty({__proto__:null,addLocalTracks:vl,createAnswer:Xg,createOffer:Jg,generateRoomId:Zg,isDuplicateSdp:Yg,isValidSignalingState:Kg,rtcConfig:El,setRemoteDescription:Qg},Symbol.toStringTag,{value:"Module"}));async function BA({localStream:t,remoteVideoEl:e,mutePartnerBtn:n,setupRemoteStream:r,setupWatchSync:i,targetRoomId:s=null}){if(!t)return{success:!1};const o=new RTCPeerConnection(El),a="initiator",c=s||Zg(),l=de();vl(o,t);const{dataChannel:u,messagesUI:d}=qg(o,a);if(!r(o,e,n))return console.error("Error setting up remote stream"),o.close(),{success:!1};_l(o,a,c),Gg(o);const f=await Jg(o);await V.createNewRoom(f,l,c),i(c,a,l);const p=`${window.location.origin}${window.location.pathname}?room=${c}`;return{success:!0,pc:o,roomId:c,roomLink:p,dataChannel:u,messagesUI:d,role:a}}async function HA({roomId:t,localStream:e,remoteVideoEl:n,mutePartnerBtn:r,setupRemoteStream:i,setupWatchSync:s}){if(!e)return{success:!1};if(!t)return{success:!1};const o=await V.checkRoomStatus(t);if(!o.exists)return{success:!1};if(!o.hasMembers)return{success:!1};let a;try{a=await V.getRoomData(t)}catch(m){return U("Error: "+m.message),{success:!1}}const c=a.offer;if(!c)return{success:!1};const l=new RTCPeerConnection(El),u="joiner",d=de();vl(l,e);const{dataChannel:h,messagesUI:f}=qg(l,u);if(!i(l,n,r))return console.error("Error setting up remote stream for joiner"),l.close(),{success:!1};_l(l,u,t),Gg(l),await Qg(l,c,yl);const y=await Xg(l);try{await V.saveAnswer(t,y)}catch(m){return console.error("Failed to save answer to Firebase:",m),l.close(),{success:!1}}return s(t,u,d),await V.joinRoom(t,d),{success:!0,pc:l,roomId:t,dataChannel:h,messagesUI:f,role:u}}class WA{constructor(){this.listeners=new Map}on(e,n){this.listeners.has(e)||this.listeners.set(e,new Set),this.listeners.get(e).add(n)}off(e,n){this.listeners.has(e)&&this.listeners.get(e).delete(n)}emit(e,n){if(this.listeners.has(e))for(const r of Array.from(this.listeners.get(e)))try{r(n)}catch(i){console.warn("CallController listener error",i)}}}class jA{constructor(){this.emitter=new WA,this.resetState()}resetState(){this.state="idle",this.roomId=null,this.roomLink=null,this.role=null,this.partnerId=null,this.pc=null,this.dataChannel=null,this.messagesUI=null,this.localVideoEl=null,this.remoteVideoEl=null,this.isHangingUp=!1,this.isCleaningUp=!1,this.listeners=new Map}getState(){return{state:this.state,roomId:this.roomId,roomLink:this.roomLink,role:this.role,partnerId:this.partnerId,hasPc:!!this.pc,isHangingUp:this.isHangingUp,isCleaningUp:this.isCleaningUp}}on(e,n){this.emitter.on(e,n)}off(e,n){this.emitter.off(e,n)}setPartnerId(e){this.partnerId=e}setupCancellationListener(e){if(!e)return;const n=se(oe,`rooms/${e}/cancellation`);let r=!1;const i=async s=>{const o=s.val();if(o&&!r){r=!0;try{this.remoteVideoEl&&(this.remoteVideoEl.srcObject=null)}catch(a){console.warn("Failed to clear remote video after cancellation",a)}try{this.pc&&this.pc.close()}catch{}try{await this.cleanupCall({reason:o.reason||"remote_cancelled"})}catch(a){console.warn("Failed to trigger CallController cleanup",a)}}};Di(n,i,e),this.listeners.has("cancellation")||this.listeners.set("cancellation",[]),this.listeners.get("cancellation").push({ref:n,callback:i,roomId:e})}setupAnswerListener(e,n,r){if(!e||!n)return;const i=se(oe,`rooms/${e}/answer`),s=async o=>{const a=o.val();if(a){const{setRemoteDescription:c}=await tt(async()=>{const{setRemoteDescription:l}=await Promise.resolve().then(()=>$A);return{setRemoteDescription:l}},void 0);await c(n,a,r)}};Di(i,s,e),this.listeners.has("answer")||this.listeners.set("answer",[]),this.listeners.get("answer").push({ref:i,callback:s,roomId:e})}setupRejectionListener(e){if(!e)return;const n=se(oe,`rooms/${e}/rejection`);let r=!1;const i=async s=>{const o=s.val();if(o&&!r&&(r=!0,this.pc?.connectionState!=="connected")){try{const{onCallRejected:a}=await tt(async()=>{const{onCallRejected:c}=await Promise.resolve().then(()=>NA);return{onCallRejected:c}},void 0);await a(o.reason||"user_rejected")}catch{}try{await V.leaveRoom(de(),e)}catch{}try{this.pc&&this.pc.close()}catch{}}};Di(n,i,e),this.listeners.has("rejection")||this.listeners.set("rejection",[]),this.listeners.get("rejection").push({ref:n,callback:i,roomId:e})}setupMemberJoinedListener(e){if(!e)return;const n=de(),r=i=>{i.key!==n&&(this.setPartnerId(i.key),this.emitter.emit("memberJoined",{memberId:i.key,roomId:e}))};V.onMemberJoined(e,r),this.listeners.has("member-joined")||this.listeners.set("member-joined",[]),this.listeners.get("member-joined").push({callback:r,roomId:e})}setupMemberLeftListener(e){if(!e)return;const n=de(),r=i=>{i.key!==n&&this.pc?.connectionState==="connected"&&this.emitter.emit("memberLeft",{memberId:i.key,roomId:e})};V.onMemberLeft(e,r),this.listeners.has("member-left")||this.listeners.set("member-left",[]),this.listeners.get("member-left").push({callback:r,roomId:e})}removeTrackedListeners(){try{for(const[e,n]of this.listeners.entries())for(const r of n)try{r.ref&&js(r.ref,"value",r.callback)}catch(i){console.warn(`Failed to remove ${e} listener`,i)}}catch(e){console.warn("Failed to remove tracked listeners",e)}finally{this.listeners.clear()}if(this.roomId)try{zs(this.roomId)}catch(e){console.warn("Failed to remove RTDB listeners for room",e)}}async createCall(e={}){this.state="creating";try{e.localVideoEl&&(this.localVideoEl=e.localVideoEl),e.remoteVideoEl&&(this.remoteVideoEl=e.remoteVideoEl);const n=await BA(e);if(!n||!n.success)return this.state="idle",this.emitter.emit("error",{phase:"createCall",detail:n}),this.emitCallFailed("createCall",n),n;this.pc=n.pc,this.roomId=n.roomId,this.roomLink=n.roomLink||null,this.role=n.role||"initiator",this.dataChannel=n.dataChannel||null,this.messagesUI=n.messagesUI||null,this.state="waiting";const{drainIceCandidateQueue:r}=await tt(async()=>{const{drainIceCandidateQueue:i}=await Promise.resolve().then(()=>xA);return{drainIceCandidateQueue:i}},void 0);return this.setupAnswerListener(this.roomId,this.pc,r),this.setupCancellationListener(this.roomId),this.setupRejectionListener(this.roomId),this.setupMemberJoinedListener(this.roomId),this.setupMemberLeftListener(this.roomId),this.emitter.emit("created",{roomId:this.roomId,roomLink:this.roomLink,role:this.role}),n}catch(n){throw this.state="idle",this.emitter.emit("error",{phase:"createCall",error:n}),this.emitCallFailed("createCall",n),n}}async answerCall(e={}){this.state="joining";try{e.localVideoEl&&(this.localVideoEl=e.localVideoEl),e.remoteVideoEl&&(this.remoteVideoEl=e.remoteVideoEl);const n=await HA(e);return!n||!n.success?(this.state="idle",this.emitter.emit("error",{phase:"answerCall",detail:n}),this.emitCallFailed("answerCall",n),n):(this.pc=n.pc,this.roomId=n.roomId,this.role=n.role||"joiner",this.dataChannel=n.dataChannel||null,this.messagesUI=n.messagesUI||null,this.state="connected",this.setupCancellationListener(this.roomId),this.setupMemberJoinedListener(this.roomId),this.setupMemberLeftListener(this.roomId),this.emitter.emit("answered",{roomId:this.roomId,role:this.role}),n)}catch(n){throw this.state="idle",this.emitter.emit("error",{phase:"answerCall",error:n}),this.emitCallFailed("answerCall",n),n}}async hangUp({emitCancel:e=!0,reason:n="user_hung_up"}={}){if(!this.isHangingUp){this.isHangingUp=!0;try{if(e&&this.roomId)try{await V.cancelCall(this.roomId,de(),n)}catch(r){console.warn("CallController: cancelCall failed (non-fatal)",r)}await this.cleanupCall({reason:n}),this.emitter.emit("hangup",{roomId:this.roomId,reason:n})}catch(r){throw this.emitter.emit("error",{phase:"hangUp",error:r}),r}finally{this.isHangingUp=!1}}}isRemoteHangup(e){return e?["remote","cancelled","partner_disconnected","connection_failed"].some(r=>e.includes(r)):!1}emitCallFailed(e,n){this.emitter.emit("callFailed",{phase:e,error:n?.message||n?.error||n||"Unknown error"})}async cleanupCall({reason:e}={}){if(!this.isCleaningUp){this.isCleaningUp=!0;try{const n=this.roomId,r=this.partnerId;this.removeTrackedListeners();try{await V.leaveRoom(de(),this.roomId)}catch{}try{if(this.pc){try{this.pc.close()}catch{}this.pc=null}}catch{}try{this.remoteVideoEl&&(this.remoteVideoEl.srcObject=null)}catch(i){console.warn("CallController: failed to clear remote video",i)}try{this.localVideoEl&&(this.localVideoEl.srcObject=null)}catch(i){console.warn("CallController: failed to clear local video",i)}try{const{cleanupLocalStream:i}=await tt(async()=>{const{cleanupLocalStream:s}=await Promise.resolve().then(()=>CA);return{cleanupLocalStream:s}},void 0);i()}catch(i){console.warn("CallController: failed to cleanup local stream",i)}try{const{resetLocalStreamInitFlag:i}=await tt(async()=>{const{resetLocalStreamInitFlag:s}=await Promise.resolve().then(()=>kN);return{resetLocalStreamInitFlag:s}},void 0);i()}catch{}this.isRemoteHangup(e)&&this.emitter.emit("remoteHangup",{roomId:n,partnerId:r,reason:e}),this.resetState(),this.emitter.emit("cleanup",{roomId:n,partnerId:r,reason:e})}catch(n){throw this.emitter.emit("error",{phase:"cleanupCall",error:n}),n}finally{this.isCleaningUp=!1}}}}const ne=new jA,Na={default:{echoCancellation:!0,noiseSuppression:!0,autoGainControl:!0},withVoiceIsolationIfSupported:{echoCancellation:!0,noiseSuppression:!0,autoGainControl:!0,voiceIsolation:!0,restrictOwnAudio:!0,googHighpassFilter:!0,googTypingNoiseDetection:!0,highpassFilter:!0,typingNoiseDetection:!0}};function em(){const t=navigator.mediaDevices.getSupportedConstraints();return["voiceIsolation","highpassFilter","typingNoiseDetection"].every(r=>t[r])?Na.withVoiceIsolationIfSupported:Na.default}const VA=()=>Na.default,zA={desktop:{landscape:{width:{ideal:1920},height:{ideal:1080},frameRate:{min:10,ideal:30},aspectRatio:{ideal:16/9}},portrait:{width:{ideal:1080},height:{ideal:1920},frameRate:{min:10,ideal:30},aspectRatio:{ideal:9/16}}},mobile:{portrait:{width:{ideal:1080},height:{ideal:1920},aspectRatio:{ideal:9/16},frameRate:{ideal:30}},landscape:{width:{ideal:1920},height:{ideal:1080},aspectRatio:{ideal:16/9},frameRate:{ideal:30}}}},GA=()=>window.screen?.orientation?.type?.includes("portrait")||window.orientation===0||window.orientation===180;function wl(t){const e=GA()?"portrait":"landscape",r=/Mobi|Android/i.test(navigator.userAgent)?"mobile":"desktop",i=zA[r][e];return{facingMode:t,...i}}function qA(){return!!(navigator.mediaDevices&&navigator.mediaDevices.enumerateDevices)}async function YA(){return qA()?(await navigator.mediaDevices.enumerateDevices()).filter(e=>e.kind==="videoinput"):[]}async function KA(){const t=await YA();let e=!1,n=!1;return t.forEach(r=>{const i=r.label.toLowerCase();(i.includes("front")||i.includes("user"))&&(e=!0),(i.includes("back")||i.includes("rear")||i.includes("environment"))&&(n=!0)}),e&&n}async function JA({localStream:t,localVideo:e,currentFacingMode:n,peerConnection:r=null}){if(!t||!e)return console.error("switchCamera: missing localStream or localVideo"),null;const i=n==="user"?"environment":"user";try{const s=await navigator.mediaDevices.getUserMedia({video:wl(i),audio:em()}),o=s.getVideoTracks()[0],a=s.getAudioTracks()[0],c=t.getVideoTracks()[0],l=c?c.enabled:!0,u=t.getAudioTracks()[0],d=u?!u.enabled:!1;if(r){const h=r.getSenders().find(p=>p.track&&p.track.kind==="video");h&&h.replaceTrack(o);const f=r.getSenders().find(p=>p.track&&p.track.kind==="audio");f&&a&&f.replaceTrack(a)}return o&&(o.enabled=l),a&&(a.enabled=!d),t.getTracks().forEach(h=>h.stop()),e.srcObject=new MediaStream([o].filter(Boolean)),{newStream:s,facingMode:i}}catch(s){return console.error("Failed to switch camera:",s),null}}let Lo=!1,qt=null,Yt=null;function XA({getLocalStream:t,getFacingMode:e}){return qt&&Yt&&qt.removeEventListener("change",Yt),qt=window.matchMedia("(orientation: portrait)"),Yt=()=>{try{const n=typeof t=="function"?t():null,r=typeof e=="function"?e():"user";QA({localStream:n,currentFacingMode:r})}catch(n){console.error("Orientation handler failed:",n)}},qt.addEventListener("change",Yt),()=>{qt&&Yt&&qt.removeEventListener("change",Yt),qt=null,Yt=null}}async function QA({localStream:t,currentFacingMode:e}){if(!(Lo||!t?.getVideoTracks()[0])){Lo=!0;try{const n=t.getVideoTracks()[0],r=wl(e);U("Applying constraints:",r),await n.applyConstraints(r),U("Video constraints updated successfully")}catch(n){console.error("Failed to apply orientation constraints:",n)}finally{Lo=!1}}}let Pa=!1,vs=[];function ZA(t,e){if(!e)return;const n=e.getAudioTracks()[0];n&&(n.enabled=t)}function eN(t,e,n){n&&(n.muted=!t,n.volume=e)}function tN(t,e){const n=e.querySelector("i");n.className=t?"fa fa-microphone-slash":"fa fa-microphone"}function nN(t,e){if(!t)return;const n=()=>{if(t.muted!==Pa){const r=e.querySelector("i");r.className=t.muted?"fa fa-volume-mute":"fa fa-volume-up",Pa=t.muted}};t.addEventListener("volumechange",n),vs.push(()=>{t&&t.removeEventListener("volumechange",n)})}function rN({getLocalStream:t,getLocalVideo:e,getRemoteVideo:n,getPeerConnection:r=()=>null,setLocalStream:i=null,micBtn:s,cameraBtn:o,switchCameraBtn:a,mutePartnerBtn:c,fullscreenPartnerBtn:l}){s&&(s.onclick=()=>{const d=t(),h=e();if(!h||!d)return;const f=!h.muted;ZA(!f,d),eN(!f,0,h),tN(f,s)}),o&&(o.onclick=()=>{const d=t();if(!d)return;const h=d.getVideoTracks()[0];if(h){h.enabled=!h.enabled;const f=o.querySelector("i");f.className=h.enabled?"fa fa-video":"fa fa-video-slash"}});const u=XA({getLocalStream:t,getFacingMode:ka});vs.push(u),a&&(a.onclick=async()=>{const d=await JA({localStream:t(),localVideo:e(),currentFacingMode:ka(),peerConnection:r()||null});d?(Ug(d.facingMode),console.log("Switched camera to facingMode:",d.facingMode),d.newStream&&typeof i=="function"&&i(d.newStream)):console.error("Camera switch failed.")},(async()=>await KA()?R(a):E(a))()),c&&(c.onclick=()=>{const d=n();d&&(d.muted=!d.muted)}),l&&(l.onclick=()=>{const d=n();d.requestFullscreen?d.requestFullscreen():d.webkitRequestFullscreen&&d.webkitRequestFullscreen()})}function iN(){vs.forEach(t=>t()),vs=[],Pa=!1}let Oo=null,St=null,$=null,x=null,zd=!1,ki=!1,qe=[],La="",ue=-1,Oa=[];const sN="AIzaSyBPUjW7ac277WIYTbN4M8dUomK39qRQjhA",oN="https://www.googleapis.com/youtube/v3";async function aN(){if(zd||ki)return!1;ki=!0;const{initializeYouTubeElements:t}=await tt(async()=>{const{initializeYouTubeElements:o}=await Promise.resolve().then(()=>aA);return{initializeYouTubeElements:o}},void 0),e=await t();if(Oo=e.searchContainer,St=e.searchBtn,$=e.searchQuery,x=e.searchResults,!Oo||!St||!$||!x)return console.error("YouTube search elements not found in DOM"),ki=!1,!1;const n=o=>/^https?:\/\//i.test(o),r=o=>{(x?.querySelectorAll(".search-result-item")||[]).forEach((c,l)=>{l===o?(c.classList.add("focused"),c.scrollIntoView({block:"nearest"})):c.classList.remove("focused")}),ue=o??-1};St.onclick=async()=>{const o=$.value.trim();if(il($)){R($),$.focus();return}if(!o){Bi(),E($);return}if(Yd()&&o===La)Da(qe);else if(!n(o))await Gd(o);else{bn&&await bn({url:o}),E(x),$.value="",E($),ue=-1;return}},Oo.addEventListener("keydown",async o=>{const a=x.querySelectorAll(".search-result-item");if(a.length>0&&(o.key==="ArrowDown"||o.key==="ArrowUp")){if(o.key==="ArrowDown"){let c=ue+1;c>=a.length&&(c=0),r(c)}else if(o.key==="ArrowUp"){let c=ue-1;c<0&&(c=ue===-1?0:a.length-1),r(c)}return}if(o.key==="Enter"){if(a.length>0&&ue>=0){a[ue].click(),E($),E(x),ue=-1;return}const c=$.value.trim();if(c)if(Yd()&&c===La)Da(qe);else if(!n(c))await Gd(c);else{bn&&await bn({url:c}),E(x),ue=-1,$.value="",E($);return}}else o.key==="Escape"&&(lN()?Bi():$.value?$.value="":E($))}),$.addEventListener("input",()=>{$.value.trim()===""&&Bi(),ue=-1});const i=Aa($,()=>E($),{ignore:[St],esc:!1});Oa.push(i);const s=Aa(x,()=>E(x),{ignore:[St],esc:!1});return Oa.push(s),ki=!1,zd=!0,!0}async function Gd(t){if(!St||!x){console.error("Search elements not initialized");return}qe=[],La=t,St.disabled=!0,x.innerHTML='<div class="search-loading">Searching YouTube...</div>',R(x);try{const e=await fetch(`${oN}/search?part=snippet&maxResults=10&q=${encodeURIComponent(t)}&type=video&key=${sN}`);if(!e.ok)throw e.status===403?new Error("YouTube API quota exceeded. Please try again later."):e.status===400?new Error("Invalid API key or request."):new Error(`YouTube API error: ${e.status}`);const n=await e.json();if(!n.items||n.items.length===0){qd("No videos found"),qe=[];return}qe=n.items.map(r=>({id:r.id.videoId,title:r.snippet.title,thumbnail:r.snippet.thumbnails.medium.url,channel:r.snippet.channelTitle,url:`https://www.youtube.com/watch?v=${r.id.videoId}`})),Da(qe)}catch(e){console.error("YouTube search failed:",e),qd(e.message||"Search failed. Please try again.")}finally{St.disabled=!1}}function Da(t){if(!x){console.error("Search results element not initialized");return}if(!t||t.length===0){x.innerHTML='<div class="no-results">No results found</div>',qe=[],ue=-1;return}x.innerHTML="",t.forEach(n=>{const r=document.createElement("div");r.className="search-result-item",r.innerHTML=`
      <img src="${n.thumbnail}" alt="${n.title}" class="result-thumbnail">
      <div class="search-result-info">
        <div class="search-result-title">${n.title}</div>
        <div class="search-result-channel">${n.channel}</div>
      </div>
    `,r.onclick=async()=>{if(bn){if(await bn(n),E(x),ue=-1,!$){console.error("Search query element not initialized");return}$.value="",E($)}},x.appendChild(r)}),R(x),ue=0,x.querySelectorAll(".search-result-item").forEach((n,r)=>{r===ue?(n.classList.add("focused"),n.scrollIntoView({block:"nearest"})):n.classList.remove("focused")})}function qd(t){if(qe=[],ue=-1,!x){console.error("Search results element not initialized");return}x.innerHTML=`<div class="search-error">${t}</div>`,R(x)}function Bi(){qe=[],ue=-1,x&&(x.innerHTML="",E(x))}function cN(){Bi(),Oa.forEach(t=>t())}function lN(){return!il(x)}function Yd(){return qe.length>0}const uN=async()=>{const t=eo(!1);if(t&&t instanceof MediaStream)return console.debug("Reusing existing local MediaStream."),t;const e=wl("user"),n=em();try{const r=await navigator.mediaDevices.getUserMedia({video:e,audio:n});return gs(r),r}catch(r){if(r.name==="OverconstrainedError"){console.warn(`❌ Constraint failed on property: ${r.constraint}, falling back to basic constraints`);const i=VA(),s=await navigator.mediaDevices.getUserMedia({video:!0,audio:i});return gs(s),s}throw r}};async function dN(t){const e=await uN(),n=new MediaStream(e.getVideoTracks());return t.srcObject=n,!0}function hN(t,e,n){return t.ontrack=r=>{if(U(`REMOTE TRACK RECEIVED: ${r.track.kind}`),!r.streams||!r.streams[0]||!(r.streams[0]instanceof MediaStream))return console.error("No valid remote MediaStream found in event.streams:",r.streams),!1;const i=r.streams[0];if(Zs(!1)!==i){$g(i),e.srcObject=i,nN(e,n);try{const o=document.getElementById("remote-video-box")||e.parentElement;o&&(o.classList?.remove("hidden"),e.classList?.remove("hidden"),o.style.visibility="visible",o.style.opacity="1",o.style.position="",o.style.left="",o.style.top="",e.style.visibility="visible",e.style.opacity="1")}catch(o){console.warn("Visibility override failed:",o)}}},!0}let Kd=!1;function fN(t,e){const n=document.createElement("dialog");n.className="copy-link-dialog";const r=document.createElement("div");r.className="copy-link-dialog__content";const i=document.createElement("h2");i.className="copy-link-dialog__title",i.textContent=e.title,r.appendChild(i);const s=document.createElement("div");s.className="copy-link-dialog__input-container";const o=document.createElement("input");o.type="text",o.className="copy-link-dialog__input",o.value=t,o.readOnly=!0,o.setAttribute("aria-label","Link to copy"),s.appendChild(o),r.appendChild(s);const a=document.createElement("div");a.className="copy-link-dialog__buttons";const c=document.createElement("button");c.className="copy-link-dialog__button copy-link-dialog__button--primary",c.textContent=e.buttonText,c.autofocus=!0;const l=document.createElement("button");l.className="copy-link-dialog__button copy-link-dialog__button--secondary",l.textContent=e.cancelText,a.appendChild(c),a.appendChild(l),r.appendChild(a);const u=document.createElement("p");return u.className="copy-link-dialog__feedback",u.setAttribute("aria-live","polite"),r.appendChild(u),n.appendChild(r),{dialog:n,input:o,copyButton:c,cancelButton:l,feedback:u}}function pN(t,e={}){const n={title:"Share this link",buttonText:"Copy",cancelText:"Cancel",successMessage:"✓ Copied to clipboard!",errorMessage:"Failed to copy. Click the link to select it manually.",autoClose:!0,autoCloseDelay:1200,onCopy:null,onError:null,onCancel:null,onClose:null,...e};gN();const{dialog:r,input:i,copyButton:s,cancelButton:o,feedback:a}=fN(t,n);mN(r);let c=!1;const l=async()=>{await _N(t,i)?(c=!0,a.textContent=n.successMessage,a.classList.remove("copy-link-dialog__feedback--error"),n.onCopy&&n.onCopy(t),n.autoClose&&setTimeout(()=>{r.close()},n.autoCloseDelay)):(a.textContent=n.errorMessage,a.classList.add("copy-link-dialog__feedback--error"),i.readOnly=!1,i.addEventListener("click",()=>{i.select()}),n.onError&&n.onError())};return s.addEventListener("click",l),o.addEventListener("click",()=>{n.onCancel&&n.onCancel(),r.close()}),r.addEventListener("keydown",u=>{u.key==="Enter"&&!u.shiftKey&&!u.ctrlKey&&!u.altKey&&!u.metaKey&&(u.preventDefault(),l())}),r.addEventListener("close",()=>{!c&&n.onCancel&&n.onCancel(),n.onClose&&n.onClose(),setTimeout(()=>{r.remove()},300)}),document.body.appendChild(r),r.showModal(),r}function gN(){if(Kd)return;const t=document.createElement("style");t.textContent=`
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
  `,document.head.appendChild(t),Kd=!0}function mN(t){t.showModal||(t.showModal=function(){this.setAttribute("open",""),this.style.display="block",this.style.position="fixed",this.style.top="50%",this.style.left="50%",this.style.transform="translate(-50%, -50%)";const e=getComputedStyle(document.documentElement).getPropertyValue("--z-ui-overlay").trim();this.style.zIndex=e||"1000"},t.close=function(){this.removeAttribute("open"),this.style.display="none"})}async function _N(t,e=null){if(navigator.clipboard&&navigator.clipboard.writeText)try{return await navigator.clipboard.writeText(t),!0}catch(n){return console.warn("Clipboard API failed, using fallback:",n),!1}if(!e)return!1;try{return e.select(),e.setSelectionRange(0,99999),document.execCommand("copy")}catch(n){return console.error("Fallback copy failed:",n),!1}}function yN(){const t=window.matchMedia&&window.matchMedia("(display-mode: standalone)").matches||navigator.standalone===!0,e=/iphone|ipad|ipod/i.test(navigator.userAgent||"");if(!t||!e||!window.location.hostname.includes("github.io"))return;const r="https://vidu-aae11.web.app",i=r.replace(/\/$/,"");let s;try{s=new URL(i).hostname}catch(l){console.error("[PWA Redirect] Invalid VITE_APP_HOSTING_URL:",r,l);return}if(window.location.hostname===s)return;const o="/HangVidU/";let a=window.location.pathname;a.startsWith(o)?a="/"+a.slice(o.length):a==="/HangVidU"&&(a="/");let c;try{c=new URL(a+window.location.search+window.location.hash,i).toString()}catch(l){console.error("[PWA Redirect] Failed to construct target URL:",l);return}console.log("[PWA Redirect] iOS standalone PWA on gh-pages → redirecting to Firebase Hosting:",c),window.location.replace(c)}OR(!0);_().disable();let bl=[];async function EN(){wN();const t=Rg(),n=["localVideoEl","remoteVideoEl","localBoxEl","remoteBoxEl","chatControls","lobbyDiv","titleAuthBar"].filter(r=>!t[r]);if(n.length>0)return console.error("Critical elements missing:",n),!1;try{{const{setupPWA:i}=await tt(async()=>{const{setupPWA:s}=await import("./PWA-DIDFnWP9.js");return{setupPWA:s}},[]);await i()}aN(),CN(),await wg;const r=sA(Js);return r&&bl.push(r.dispose),await Dr(),!0}catch(r){return console.error("Failed to get user media:",r),!1}}let Ma=!1;function vN(){Ma=!1}async function Dr(){Ma||(Ma=!0,await dN(be),rN({getLocalStream:eo,getLocalVideo:()=>be,getRemoteVideo:()=>K,getPeerConnection:()=>ne.getState().pc,setLocalStream:gs,micBtn:lr,cameraBtn:ur,switchCameraBtn:cr,mutePartnerBtn:Ve,fullscreenPartnerBtn:Xs}),be&&(be.addEventListener("enterpictureinpicture",()=>te&&E(te)),be.addEventListener("leavepictureinpicture",()=>{te&&!(gi()&&ms())&&R(te)})))}function wN(){E(B),E(te),E(Te),E(Ne)}function Hi(t=null){return{localStream:eo(),localVideoEl:be,remoteVideoEl:K,mutePartnerBtn:Ve,setupRemoteStream:hN,setupWatchSync:fA,targetRoomId:t}}function Wi(t,e=!1){return t.success?(e&&t.roomLink&&pN(t.roomLink,{onCopy:()=>U("Link ready! Share with your partner."),onCancel:()=>U("Link ready! Use the copy button to use it, or create a new one.")}),!0):!1}async function to(t,{forceInitiator:e=!1}={}){try{await Dr()}catch(s){return console.error("Failed to initialize local media stream:",s),!1}const n=Date.now();if(e){_().logRoomCreation(t,!0,{creationTime:n,listenerAttachTime:n,timeDiff:0},{trigger:"force_initiator",reason:"calling_saved_contact"}),await Dr();const s=await ne.createCall(Hi(t));return Wi(s,!1)}let r=await V.checkRoomStatus(t);if(r.exists&&!r.hasMembers){let o=0;for(;o<3&&!r.hasMembers;)await new Promise(a=>setTimeout(a,250*(o+1))),r=await V.checkRoomStatus(t),o++}if(!r.exists||!r.hasMembers){_().logRoomCreation(t,!0,{creationTime:n,listenerAttachTime:n,timeDiff:0},{trigger:"room_empty_or_nonexistent",roomExists:r.exists,memberCount:r.memberCount||0}),await Dr();const s=await ne.createCall(Hi(t));return Wi(s,!0)}_().log("ROOM","JOINING_EXISTING",{roomId:t,memberCount:r.memberCount,roomExists:r.exists});const i=await ne.answerCall({roomId:t,...Hi()});return Wi(i,!1)}const Se=new Set,tm=new Map;function Jd(t){t&&(zs(t),Se.delete(t),tm.delete(t),_().log("LISTENER","INCOMING_CLEANUP",{roomId:t,remainingListeners:Se.size}))}function bN(){U(`[LISTENER] Removing all incoming listeners (${Se.size} rooms)`);const t=Array.from(Se);t.forEach(e=>{zs(e)}),Se.clear(),tm.clear(),_().log("LISTENER","ALL_INCOMING_CLEANUP",{roomsCleared:t.length})}async function SN(t){const e=Date.now(),n=e+1440*60*1e3,r=Ze();if(r){const i=jc(r,t);await gt(i,{roomId:t,savedAt:e,expiresAt:n});return}try{const i=localStorage.getItem("recentCalls")||"{}",s=JSON.parse(i);s[t]={roomId:t,savedAt:e,expiresAt:n},localStorage.setItem("recentCalls",JSON.stringify(s))}catch(i){console.warn("Failed to save recent call to localStorage",i)}}async function Do(t){const e=Ze();if(e){try{await zn(jc(e,t))}catch(n){console.warn("Failed to remove recent call from RTDB",n)}return}try{const n=localStorage.getItem("recentCalls")||"{}",r=JSON.parse(n);r[t]&&(delete r[t],localStorage.setItem("recentCalls",JSON.stringify(r)))}catch(n){console.warn("Failed to remove recent call from localStorage",n)}}function qn(t){t&&(Se.has(t)&&(Se.delete(t),zs(t)),U(`[LISTENER] Attaching listener for room: ${t} (total: ${Se.size+1})`),Se.add(t),_().logListenerAttachment(t,"member_join",Se.size,{action:"incoming_call_listener_attached"}),V.onMemberJoined(t,async e=>{const n=e.key,r=e.val?e.val():null,i=de();if(n&&n!==i){_().logMemberJoinEvent(t,n,r||{},{detectedBy:"incoming_call_listener",currentUserId:i});const s=r&&typeof r.joinedAt=="number"?r.joinedAt:null,o=2e4;let a=!1,c="none",l=0;if(s&&(l=Date.now()-s,a=l<o,c="joinedAt"),!a){const N=await jg(n,t),le=await Vg(t);a=N||le,c=N?"outgoingState":le?"roomCreatedAt":"failed"}const u={isFresh:a,method:c,age:l,reason:a?"call_is_fresh":"call_is_stale"};if(_().logIncomingCallEvent(n,t,u,{memberData:r,joinedAt:s,CALL_FRESH_MS:o}),!a){_().logNotificationDecision("REJECT","stale_call",t,{age:l,validationMethod:c,joiningUserId:n});return}let d;try{d=await V.getRoomData(t)}catch{return}if(!d||typeof d!="object")return;const h=!!d.offer,f=!!d.answer,p=d.createdBy;if(!h||f||p===i)return;const y=ne.getState();if(!!y.pc&&y.pc.connectionState==="connected"){_().logNotificationDecision("REJECT","already_in_call",t,{joiningUserId:n,currentCallState:y.pc?.connectionState});return}if(_().logNotificationDecision("SHOW","fresh_call_detected",t,{joiningUserId:n,freshnessResult:u}),await ml(`Incoming call from ${n} for room ${t}.

Accept?`))Jd(t),_().logNotificationDecision("ACCEPT","user_accepted",t,{joiningUserId:n}),to(t).catch(N=>{console.warn("Failed to answer incoming call:",N),_().logFirebaseOperation("join_room_on_accept",!1,N,{roomId:t,joiningUserId:n})});else{_().logNotificationDecision("REJECT","user_rejected",t,{joiningUserId:n});try{await V.rejectCall(t,de(),"user_rejected")}catch(N){console.warn("Failed to signal rejection via RTDB:",N)}await Do(t).catch(N=>{console.warn("Failed to remove recent call on rejection:",N)})}}}),V.onCallCancelled(t,async e=>{if(e&&typeof e.val=="function"&&e.val()){try{const{dismissActiveConfirmDialog:r}=await tt(async()=>{const{dismissActiveConfirmDialog:i}=await Promise.resolve().then(()=>LA);return{dismissActiveConfirmDialog:i}},void 0);typeof r=="function"&&r()}catch{}await Do(t).catch(()=>{})}}),V.onMemberLeft(t,async e=>{const n=e.key,r=de();if(!(!n||n===r))try{(await V.checkRoomStatus(t)).hasMembers||(await Do(t),Jd(t),U(`Removed saved recent call and listeners for room ${t} because it is now empty`))}catch(i){console.warn("Failed to evaluate room status on member leave",i)}}))}async function Xd(){const t=Date.now();_().log("LISTENER","STARTUP_BEGIN",{timestamp:t,currentListenerCount:Se.size});try{if(typeof window<"u"){const{getCurrentUserAsync:n}=await tt(async()=>{const{getCurrentUserAsync:r}=await Promise.resolve().then(()=>zR);return{getCurrentUserAsync:r}},void 0);await n()}}catch{}const e=Ze();if(_().log("LISTENER","AUTH_STATE_DETERMINED",{isLoggedIn:!!e,userId:e||"guest"}),e){const n=DI(e);try{const r=await nn(n),i=r.exists()?r.val():null,s=new Set;if(i)for(const[o,a]of Object.entries(i)){if(!a||a.expiresAt&&a.expiresAt<Date.now()){await zn(jc(e,o)).catch(()=>{});continue}s.add(o)}try{const o=await Es();Object.values(o||{}).forEach(a=>{a?.roomId&&s.add(a.roomId)})}catch{}s.forEach(o=>qn(o)),_().log("LISTENER","STARTUP_COMPLETE",{storage:"rtdb",roomsToListen:Array.from(s),totalListeners:Se.size,duration:Date.now()-t})}catch(r){console.warn("Failed to read recent calls from RTDB",r),_().logFirebaseOperation("read_recent_calls",!1,r,{storage:"rtdb",userId:e})}return}try{const n=localStorage.getItem("recentCalls")||"{}",r=JSON.parse(n),i={},s=new Set;for(const[o,a]of Object.entries(r||{}))!a||a.expiresAt&&a.expiresAt<Date.now()||(i[o]=a,s.add(o));try{const o=await Es();Object.values(o||{}).forEach(a=>{a?.roomId&&s.add(a.roomId)})}catch{}s.forEach(o=>qn(o)),localStorage.setItem("recentCalls",JSON.stringify(i)),_().log("LISTENER","STARTUP_COMPLETE",{storage:"localStorage",roomsToListen:Array.from(s),totalListeners:Se.size,duration:Date.now()-t,expiredRoomsRemoved:Object.keys(r||{}).length-s.size})}catch(n){console.warn("Failed to read recent calls from localStorage",n),_().logFirebaseOperation("read_recent_calls",!1,n,{storage:"localStorage"})}}function Mo(){return W&&Te&&!Te.classList.contains("hidden")&&W.src&&W.src.trim()!==""}let Qd=!1;function CN(){if(Qd)return;const t=()=>{const e=document.activeElement;return e&&(e.tagName==="INPUT"||e.tagName==="TEXTAREA"||e.isContentEditable)};document.addEventListener("keydown",e=>{if(!t()&&((e.key==="w"||e.key==="W")&&(console.log("=== W KEY PRESSED ==="),console.log("lastWatched:",yr()),console.log("isYTVisible():",Ao()),console.log("isSharedVideoVisible():",Mo()),console.log("isWatchModeActive():",gi()),yr()==="yt"?Ao()?(Ta(),$i()):(Lg(),Ra()):yr()==="url"&&(Mo()?(E(Te),$i()):(R(Te),Ra()))),e.key==="m"||e.key==="M")){const n=ne.getState();n.messagesUI&&n.messagesUI.toggleMessages()}e.key==="Escape"&&(yr()==="yt"&&Ao()?(Qs(),Ta()):yr()==="url"&&Mo()&&(W.pause(),E(Te)),$i())}),Qd=!0}const nm=async()=>{await Dr();const t=await ne.createCall(Hi());Wi(t,!0)};Oe.onclick=nm;Vt.onclick=nm;je.onclick=async()=>{console.debug("Hanging up..."),await ne.hangUp({emitCancel:!0,reason:"user_hung_up"})};async function TN(){const e=new URLSearchParams(window.location.search).get("room");if(!e)return!1;const n=await to(e);return n||(Ks(),Wg()),n}yN();window.onload=async()=>{if(!await EN()){Oe.disabled=!0,console.error("Initialization failed. Cannot start chat.");return}await Xd().catch(i=>console.warn("Failed to start saved-room listeners",i)),Jr(Je).catch(i=>{console.warn("Failed to render contacts list:",i)});let e=null;const n=nl(async({isLoggedIn:i,user:s})=>{try{const o=e===null,a=e===!0&&!i,c=e===!1&&i;e=i,await Jr(Je),a?(U("[AUTH] User logged out - cleaning up incoming listeners"),bN()):c?(U("[AUTH] User logged in - re-attaching incoming listeners"),await Xd().catch(l=>console.warn("Failed to re-attach saved-room listeners on login",l))):o&&i&&U("[AUTH] Initial load with logged-in user")}catch(o){console.warn("Failed to handle auth change:",o)}});bl.push(()=>{try{typeof n=="function"&&n()}catch{}}),await TN()};window.addEventListener("beforeunload",async t=>{const e=ne.getState();if(e.pc&&e.pc.connectionState==="connected")return t.preventDefault(),t.returnValue="You are in an active call. Are you sure you want to leave?",t.returnValue;await IN()});ne.on("memberJoined",({memberId:t,roomId:e})=>{console.debug("CallController memberJoined event",{memberId:t,roomId:e}),ne.setPartnerId(t),pl(),gl().catch(n=>console.warn("Failed to clear calling state:",n)),SN(e).catch(n=>console.warn("Failed to save recent call:",n))});ne.on("memberLeft",({memberId:t})=>{console.debug("CallController memberLeft event",{memberId:t}),console.info("Partner has left the call")});ne.on("cleanup",({roomId:t,reason:e})=>{console.debug("CallController cleanup event",{roomId:t,reason:e}),Mt(),Bg(),Wg(),Ks()});ne.on("cleanup",({roomId:t,partnerId:e,reason:n})=>{console.debug("CallController cleanup event",{roomId:t,partnerId:e,reason:n}),e&&t&&setTimeout(()=>{OA(e,t,Je).catch(r=>{console.warn("Failed to save contact after cleanup:",r)})},500)});async function IN(){await ne.hangUp({emitCancel:!0,reason:"page_unload"}),iN(),PI(),document.pictureInPictureElement&&document.exitPictureInPicture().catch(e=>console.error(e));const t=ne.getState();t.messagesUI&&t.messagesUI.cleanup&&t.messagesUI.cleanup(),window.history.replaceState({},document.title,window.location.pathname),W.src="",Hg(),be&&be.srcObject&&(be.srcObject=null),K&&K.srcObject&&(K.srcObject=null),$i(),Ks(),hA("none"),ul(),Pg(!1),cN(),bl.forEach(e=>e())}window.onloadCallback=function(){grecaptcha.enterprise.render("recaptcha-container",{sitekey:"6LdLWRcsAAAAACUOtILeWfkB3q_3r9V5f5Ujvq4o"})};const kN=Object.freeze(Object.defineProperty({__proto__:null,joinOrCreateRoomWithId:to,listenForIncomingOnRoom:qn,resetLocalStreamInitFlag:vN},Symbol.toStringTag,{value:"Module"}));export{tt as _,iA as c,U as d,E as h,RN as i,R as s};
