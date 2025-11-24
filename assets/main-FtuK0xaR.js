(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))s(r);new MutationObserver(r=>{for(const i of r)if(i.type==="childList")for(const o of i.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&s(o)}).observe(document,{childList:!0,subtree:!0});function n(r){const i={};return r.integrity&&(i.integrity=r.integrity),r.referrerPolicy&&(i.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?i.credentials="include":r.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function s(r){if(r.ep)return;r.ep=!0;const i=n(r);fetch(r.href,i)}})();const wg="modulepreload",bg=function(t){return"/HangVidU/"+t},ol={},Ge=function(e,n,s){let r=Promise.resolve();if(n&&n.length>0){let c=function(l){return Promise.all(l.map(u=>Promise.resolve(u).then(d=>({status:"fulfilled",value:d}),d=>({status:"rejected",reason:d}))))};document.getElementsByTagName("link");const o=document.querySelector("meta[property=csp-nonce]"),a=o?.nonce||o?.getAttribute("nonce");r=c(n.map(l=>{if(l=bg(l),l in ol)return;ol[l]=!0;const u=l.endsWith(".css"),d=u?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${l}"]${d}`))return;const h=document.createElement("link");if(h.rel=u?"stylesheet":wg,u||(h.as="script"),h.crossOrigin="",h.href=l,a&&h.setAttribute("nonce",a),document.head.appendChild(h),u)return new Promise((f,p)=>{h.addEventListener("load",f),h.addEventListener("error",()=>p(new Error(`Unable to preload CSS for ${l}`)))})}))}function i(o){const a=new Event("vite:preloadError",{cancelable:!0});if(a.payload=o,window.dispatchEvent(a),!a.defaultPrevented)throw o}return r.then(o=>{for(const a of o||[])a.status==="rejected"&&i(a.reason);return e().catch(i)})},C=typeof __SENTRY_DEBUG__>"u"||__SENTRY_DEBUG__,O=globalThis,Jt="10.26.0";function mi(){return _i(O),O}function _i(t){const e=t.__SENTRY__=t.__SENTRY__||{};return e.version=e.version||Jt,e[Jt]=e[Jt]||{}}function Vn(t,e,n=O){const s=n.__SENTRY__=n.__SENTRY__||{},r=s[Jt]=s[Jt]||{};return r[t]||(r[t]=e())}const Sg=["debug","info","warn","error","log","assert","trace"],Cg="Sentry Logger ",Fr={};function jn(t){if(!("console"in O))return t();const e=O.console,n={},s=Object.keys(Fr);s.forEach(r=>{const i=Fr[r];n[r]=e[r],e[r]=i});try{return t()}finally{s.forEach(r=>{e[r]=n[r]})}}function Ig(){ba().enabled=!0}function Tg(){ba().enabled=!1}function kd(){return ba().enabled}function Rg(...t){wa("log",...t)}function kg(...t){wa("warn",...t)}function Ag(...t){wa("error",...t)}function wa(t,...e){C&&kd()&&jn(()=>{O.console[t](`${Cg}[${t}]:`,...e)})}function ba(){return C?Vn("loggerSettings",()=>({enabled:!1})):{enabled:!1}}const w={enable:Ig,disable:Tg,isEnabled:kd,log:Rg,warn:kg,error:Ag},Ad=50,Zt="?",al=/\(error: (.*)\)/,cl=/captureMessage|captureException/;function Nd(...t){const e=t.sort((n,s)=>n[0]-s[0]).map(n=>n[1]);return(n,s=0,r=0)=>{const i=[],o=n.split(`
`);for(let a=s;a<o.length;a++){let c=o[a];c.length>1024&&(c=c.slice(0,1024));const l=al.test(c)?c.replace(al,"$1"):c;if(!l.match(/\S*Error: /)){for(const u of e){const d=u(l);if(d){i.push(d);break}}if(i.length>=Ad+r)break}}return Pg(i.slice(r))}}function Ng(t){return Array.isArray(t)?Nd(...t):t}function Pg(t){if(!t.length)return[];const e=Array.from(t);return/sentryWrapped/.test(dr(e).function||"")&&e.pop(),e.reverse(),cl.test(dr(e).function||"")&&(e.pop(),cl.test(dr(e).function||"")&&e.pop()),e.slice(0,Ad).map(n=>({...n,filename:n.filename||dr(e).filename,function:n.function||Zt}))}function dr(t){return t[t.length-1]||{}}const Ki="<anonymous>";function Pt(t){try{return!t||typeof t!="function"?Ki:t.name||Ki}catch{return Ki}}function ll(t){const e=t.exception;if(e){const n=[];try{return e.values.forEach(s=>{s.stacktrace.frames&&n.push(...s.stacktrace.frames)}),n}catch{return}}}function Pd(t){return"__v_isVNode"in t&&t.__v_isVNode?"[VueVNode]":"[VueViewModel]"}const wr={},ul={};function ln(t,e){wr[t]=wr[t]||[],wr[t].push(e)}function un(t,e){if(!ul[t]){ul[t]=!0;try{e()}catch(n){C&&w.error(`Error while instrumenting ${t}`,n)}}}function Fe(t,e){const n=t&&wr[t];if(n)for(const s of n)try{s(e)}catch(r){C&&w.error(`Error while triggering instrumentation handler.
Type: ${t}
Name: ${Pt(s)}
Error:`,r)}}let Ji=null;function Lg(t){const e="error";ln(e,t),un(e,Og)}function Og(){Ji=O.onerror,O.onerror=function(t,e,n,s,r){return Fe("error",{column:s,error:r,line:n,msg:t,url:e}),Ji?Ji.apply(this,arguments):!1},O.onerror.__SENTRY_INSTRUMENTED__=!0}let Qi=null;function Dg(t){const e="unhandledrejection";ln(e,t),un(e,xg)}function xg(){Qi=O.onunhandledrejection,O.onunhandledrejection=function(t){return Fe("unhandledrejection",t),Qi?Qi.apply(this,arguments):!0},O.onunhandledrejection.__SENTRY_INSTRUMENTED__=!0}const Ld=Object.prototype.toString;function Sa(t){switch(Ld.call(t)){case"[object Error]":case"[object Exception]":case"[object DOMException]":case"[object WebAssembly.Exception]":return!0;default:return Lt(t,Error)}}function Gn(t,e){return Ld.call(t)===`[object ${e}]`}function Od(t){return Gn(t,"ErrorEvent")}function dl(t){return Gn(t,"DOMError")}function Mg(t){return Gn(t,"DOMException")}function rt(t){return Gn(t,"String")}function Ca(t){return typeof t=="object"&&t!==null&&"__sentry_template_string__"in t&&"__sentry_template_values__"in t}function yi(t){return t===null||Ca(t)||typeof t!="object"&&typeof t!="function"}function Ns(t){return Gn(t,"Object")}function Ei(t){return typeof Event<"u"&&Lt(t,Event)}function Fg(t){return typeof Element<"u"&&Lt(t,Element)}function Ug(t){return Gn(t,"RegExp")}function zs(t){return!!(t?.then&&typeof t.then=="function")}function $g(t){return Ns(t)&&"nativeEvent"in t&&"preventDefault"in t&&"stopPropagation"in t}function Lt(t,e){try{return t instanceof e}catch{return!1}}function Dd(t){return!!(typeof t=="object"&&t!==null&&(t.__isVue||t._isVue||t.__v_isVNode))}function Bg(t){return typeof Request<"u"&&Lt(t,Request)}const Ia=O,Hg=80;function xd(t,e={}){if(!t)return"<unknown>";try{let n=t;const s=5,r=[];let i=0,o=0;const a=" > ",c=a.length;let l;const u=Array.isArray(e)?e:e.keyAttrs,d=!Array.isArray(e)&&e.maxStringLength||Hg;for(;n&&i++<s&&(l=Wg(n,u),!(l==="html"||i>1&&o+r.length*c+l.length>=d));)r.push(l),o+=l.length,n=n.parentNode;return r.reverse().join(a)}catch{return"<unknown>"}}function Wg(t,e){const n=t,s=[];if(!n?.tagName)return"";if(Ia.HTMLElement&&n instanceof HTMLElement&&n.dataset){if(n.dataset.sentryComponent)return n.dataset.sentryComponent;if(n.dataset.sentryElement)return n.dataset.sentryElement}s.push(n.tagName.toLowerCase());const r=e?.length?e.filter(o=>n.getAttribute(o)).map(o=>[o,n.getAttribute(o)]):null;if(r?.length)r.forEach(o=>{s.push(`[${o[0]}="${o[1]}"]`)});else{n.id&&s.push(`#${n.id}`);const o=n.className;if(o&&rt(o)){const a=o.split(/\s+/);for(const c of a)s.push(`.${c}`)}}const i=["aria-label","type","name","title","alt"];for(const o of i){const a=n.getAttribute(o);a&&s.push(`[${o}="${a}"]`)}return s.join("")}function Ta(){try{return Ia.document.location.href}catch{return""}}function Vg(t){if(!Ia.HTMLElement)return null;let e=t;const n=5;for(let s=0;s<n;s++){if(!e)return null;if(e instanceof HTMLElement){if(e.dataset.sentryComponent)return e.dataset.sentryComponent;if(e.dataset.sentryElement)return e.dataset.sentryElement}e=e.parentNode}return null}function be(t,e,n){if(!(e in t))return;const s=t[e];if(typeof s!="function")return;const r=n(s);typeof r=="function"&&Md(r,s);try{t[e]=r}catch{C&&w.log(`Failed to replace method "${e}" in object`,t)}}function en(t,e,n){try{Object.defineProperty(t,e,{value:n,writable:!0,configurable:!0})}catch{C&&w.log(`Failed to add non-enumerable property "${e}" to object`,t)}}function Md(t,e){try{const n=e.prototype||{};t.prototype=e.prototype=n,en(t,"__sentry_original__",e)}catch{}}function Ra(t){return t.__sentry_original__}function Fd(t){if(Sa(t))return{message:t.message,name:t.name,stack:t.stack,...fl(t)};if(Ei(t)){const e={type:t.type,target:hl(t.target),currentTarget:hl(t.currentTarget),...fl(t)};return typeof CustomEvent<"u"&&Lt(t,CustomEvent)&&(e.detail=t.detail),e}else return t}function hl(t){try{return Fg(t)?xd(t):Object.prototype.toString.call(t)}catch{return"<unknown>"}}function fl(t){if(typeof t=="object"&&t!==null){const e={};for(const n in t)Object.prototype.hasOwnProperty.call(t,n)&&(e[n]=t[n]);return e}else return{}}function jg(t){const e=Object.keys(Fd(t));return e.sort(),e[0]?e.join(", "):"[object has no keys]"}function Ud(t,e=0){return typeof t!="string"||e===0||t.length<=e?t:`${t.slice(0,e)}...`}function pl(t,e){if(!Array.isArray(t))return"";const n=[];for(let s=0;s<t.length;s++){const r=t[s];try{Dd(r)?n.push(Pd(r)):n.push(String(r))}catch{n.push("[value cannot be serialized]")}}return n.join(e)}function br(t,e,n=!1){return rt(t)?Ug(e)?e.test(t):rt(e)?n?t===e:t.includes(e):!1:!1}function vi(t,e=[],n=!1){return e.some(s=>br(t,s,n))}function Gg(){const t=O;return t.crypto||t.msCrypto}let Xi;function zg(){return Math.random()*16}function Te(t=Gg()){try{if(t?.randomUUID)return t.randomUUID().replace(/-/g,"")}catch{}return Xi||(Xi="10000000100040008000"+1e11),Xi.replace(/[018]/g,e=>(e^(zg()&15)>>e/4).toString(16))}function $d(t){return t.exception?.values?.[0]}function zt(t){const{message:e,event_id:n}=t;if(e)return e;const s=$d(t);return s?s.type&&s.value?`${s.type}: ${s.value}`:s.type||s.value||n||"<unknown>":n||"<unknown>"}function Io(t,e,n){const s=t.exception=t.exception||{},r=s.values=s.values||[],i=r[0]=r[0]||{};i.value||(i.value=e||""),i.type||(i.type="Error")}function Rn(t,e){const n=$d(t);if(!n)return;const s={type:"generic",handled:!0},r=n.mechanism;if(n.mechanism={...s,...r,...e},e&&"data"in e){const i={...r?.data,...e.data};n.mechanism.data=i}}function gl(t){if(qg(t))return!0;try{en(t,"__sentry_captured__",!0)}catch{}return!1}function qg(t){try{return t.__sentry_captured__}catch{}}const Bd=1e3;function qs(){return Date.now()/Bd}function Yg(){const{performance:t}=O;if(!t?.now||!t.timeOrigin)return qs;const e=t.timeOrigin;return()=>(e+t.now())/Bd}let ml;function it(){return(ml??(ml=Yg()))()}function Kg(t){const e=it(),n={sid:Te(),init:!0,timestamp:e,started:e,duration:0,status:"ok",errors:0,ignoreDuration:!1,toJSON:()=>Qg(n)};return t&&kn(n,t),n}function kn(t,e={}){if(e.user&&(!t.ipAddress&&e.user.ip_address&&(t.ipAddress=e.user.ip_address),!t.did&&!e.did&&(t.did=e.user.id||e.user.email||e.user.username)),t.timestamp=e.timestamp||it(),e.abnormal_mechanism&&(t.abnormal_mechanism=e.abnormal_mechanism),e.ignoreDuration&&(t.ignoreDuration=e.ignoreDuration),e.sid&&(t.sid=e.sid.length===32?e.sid:Te()),e.init!==void 0&&(t.init=e.init),!t.did&&e.did&&(t.did=`${e.did}`),typeof e.started=="number"&&(t.started=e.started),t.ignoreDuration)t.duration=void 0;else if(typeof e.duration=="number")t.duration=e.duration;else{const n=t.timestamp-t.started;t.duration=n>=0?n:0}e.release&&(t.release=e.release),e.environment&&(t.environment=e.environment),!t.ipAddress&&e.ipAddress&&(t.ipAddress=e.ipAddress),!t.userAgent&&e.userAgent&&(t.userAgent=e.userAgent),typeof e.errors=="number"&&(t.errors=e.errors),e.status&&(t.status=e.status)}function Jg(t,e){let n={};t.status==="ok"&&(n={status:"exited"}),kn(t,n)}function Qg(t){return{sid:`${t.sid}`,init:t.init,started:new Date(t.started*1e3).toISOString(),timestamp:new Date(t.timestamp*1e3).toISOString(),status:t.status,errors:t.errors,did:typeof t.did=="number"||typeof t.did=="string"?`${t.did}`:void 0,duration:t.duration,abnormal_mechanism:t.abnormal_mechanism,attrs:{release:t.release,environment:t.environment,ip_address:t.ipAddress,user_agent:t.userAgent}}}function Ys(t,e,n=2){if(!e||typeof e!="object"||n<=0)return e;if(t&&Object.keys(e).length===0)return t;const s={...t};for(const r in e)Object.prototype.hasOwnProperty.call(e,r)&&(s[r]=Ys(s[r],e[r],n-1));return s}function _l(){return Te()}function Hd(){return Te().substring(16)}const To="_sentrySpan";function yl(t,e){e?en(t,To,e):delete t[To]}function El(t){return t[To]}const Xg=100;class at{constructor(){this._notifyingListeners=!1,this._scopeListeners=[],this._eventProcessors=[],this._breadcrumbs=[],this._attachments=[],this._user={},this._tags={},this._extra={},this._contexts={},this._sdkProcessingMetadata={},this._propagationContext={traceId:_l(),sampleRand:Math.random()}}clone(){const e=new at;return e._breadcrumbs=[...this._breadcrumbs],e._tags={...this._tags},e._extra={...this._extra},e._contexts={...this._contexts},this._contexts.flags&&(e._contexts.flags={values:[...this._contexts.flags.values]}),e._user=this._user,e._level=this._level,e._session=this._session,e._transactionName=this._transactionName,e._fingerprint=this._fingerprint,e._eventProcessors=[...this._eventProcessors],e._attachments=[...this._attachments],e._sdkProcessingMetadata={...this._sdkProcessingMetadata},e._propagationContext={...this._propagationContext},e._client=this._client,e._lastEventId=this._lastEventId,yl(e,El(this)),e}setClient(e){this._client=e}setLastEventId(e){this._lastEventId=e}getClient(){return this._client}lastEventId(){return this._lastEventId}addScopeListener(e){this._scopeListeners.push(e)}addEventProcessor(e){return this._eventProcessors.push(e),this}setUser(e){return this._user=e||{email:void 0,id:void 0,ip_address:void 0,username:void 0},this._session&&kn(this._session,{user:e}),this._notifyScopeListeners(),this}getUser(){return this._user}setTags(e){return this._tags={...this._tags,...e},this._notifyScopeListeners(),this}setTag(e,n){return this.setTags({[e]:n})}setExtras(e){return this._extra={...this._extra,...e},this._notifyScopeListeners(),this}setExtra(e,n){return this._extra={...this._extra,[e]:n},this._notifyScopeListeners(),this}setFingerprint(e){return this._fingerprint=e,this._notifyScopeListeners(),this}setLevel(e){return this._level=e,this._notifyScopeListeners(),this}setTransactionName(e){return this._transactionName=e,this._notifyScopeListeners(),this}setContext(e,n){return n===null?delete this._contexts[e]:this._contexts[e]=n,this._notifyScopeListeners(),this}setSession(e){return e?this._session=e:delete this._session,this._notifyScopeListeners(),this}getSession(){return this._session}update(e){if(!e)return this;const n=typeof e=="function"?e(this):e,s=n instanceof at?n.getScopeData():Ns(n)?e:void 0,{tags:r,extra:i,user:o,contexts:a,level:c,fingerprint:l=[],propagationContext:u}=s||{};return this._tags={...this._tags,...r},this._extra={...this._extra,...i},this._contexts={...this._contexts,...a},o&&Object.keys(o).length&&(this._user=o),c&&(this._level=c),l.length&&(this._fingerprint=l),u&&(this._propagationContext=u),this}clear(){return this._breadcrumbs=[],this._tags={},this._extra={},this._user={},this._contexts={},this._level=void 0,this._transactionName=void 0,this._fingerprint=void 0,this._session=void 0,yl(this,void 0),this._attachments=[],this.setPropagationContext({traceId:_l(),sampleRand:Math.random()}),this._notifyScopeListeners(),this}addBreadcrumb(e,n){const s=typeof n=="number"?n:Xg;if(s<=0)return this;const r={timestamp:qs(),...e,message:e.message?Ud(e.message,2048):e.message};return this._breadcrumbs.push(r),this._breadcrumbs.length>s&&(this._breadcrumbs=this._breadcrumbs.slice(-s),this._client?.recordDroppedEvent("buffer_overflow","log_item")),this._notifyScopeListeners(),this}getLastBreadcrumb(){return this._breadcrumbs[this._breadcrumbs.length-1]}clearBreadcrumbs(){return this._breadcrumbs=[],this._notifyScopeListeners(),this}addAttachment(e){return this._attachments.push(e),this}clearAttachments(){return this._attachments=[],this}getScopeData(){return{breadcrumbs:this._breadcrumbs,attachments:this._attachments,contexts:this._contexts,tags:this._tags,extra:this._extra,user:this._user,level:this._level,fingerprint:this._fingerprint||[],eventProcessors:this._eventProcessors,propagationContext:this._propagationContext,sdkProcessingMetadata:this._sdkProcessingMetadata,transactionName:this._transactionName,span:El(this)}}setSDKProcessingMetadata(e){return this._sdkProcessingMetadata=Ys(this._sdkProcessingMetadata,e,2),this}setPropagationContext(e){return this._propagationContext=e,this}getPropagationContext(){return this._propagationContext}captureException(e,n){const s=n?.event_id||Te();if(!this._client)return C&&w.warn("No client configured on scope - will not capture exception!"),s;const r=new Error("Sentry syntheticException");return this._client.captureException(e,{originalException:e,syntheticException:r,...n,event_id:s},this),s}captureMessage(e,n,s){const r=s?.event_id||Te();if(!this._client)return C&&w.warn("No client configured on scope - will not capture message!"),r;const i=s?.syntheticException??new Error(e);return this._client.captureMessage(e,n,{originalException:e,syntheticException:i,...s,event_id:r},this),r}captureEvent(e,n){const s=n?.event_id||Te();return this._client?(this._client.captureEvent(e,{...n,event_id:s},this),s):(C&&w.warn("No client configured on scope - will not capture event!"),s)}_notifyScopeListeners(){this._notifyingListeners||(this._notifyingListeners=!0,this._scopeListeners.forEach(e=>{e(this)}),this._notifyingListeners=!1)}}function Zg(){return Vn("defaultCurrentScope",()=>new at)}function em(){return Vn("defaultIsolationScope",()=>new at)}class tm{constructor(e,n){let s;e?s=e:s=new at;let r;n?r=n:r=new at,this._stack=[{scope:s}],this._isolationScope=r}withScope(e){const n=this._pushScope();let s;try{s=e(n)}catch(r){throw this._popScope(),r}return zs(s)?s.then(r=>(this._popScope(),r),r=>{throw this._popScope(),r}):(this._popScope(),s)}getClient(){return this.getStackTop().client}getScope(){return this.getStackTop().scope}getIsolationScope(){return this._isolationScope}getStackTop(){return this._stack[this._stack.length-1]}_pushScope(){const e=this.getScope().clone();return this._stack.push({client:this.getClient(),scope:e}),e}_popScope(){return this._stack.length<=1?!1:!!this._stack.pop()}}function An(){const t=mi(),e=_i(t);return e.stack=e.stack||new tm(Zg(),em())}function nm(t){return An().withScope(t)}function sm(t,e){const n=An();return n.withScope(()=>(n.getStackTop().scope=t,e(t)))}function vl(t){return An().withScope(()=>t(An().getIsolationScope()))}function rm(){return{withIsolationScope:vl,withScope:nm,withSetScope:sm,withSetIsolationScope:(t,e)=>vl(e),getCurrentScope:()=>An().getScope(),getIsolationScope:()=>An().getIsolationScope()}}function ka(t){const e=_i(t);return e.acs?e.acs:rm()}function Mt(){const t=mi();return ka(t).getCurrentScope()}function Ks(){const t=mi();return ka(t).getIsolationScope()}function im(){return Vn("globalScope",()=>new at)}function om(...t){const e=mi(),n=ka(e);if(t.length===2){const[s,r]=t;return s?n.withSetScope(s,r):n.withScope(r)}return n.withScope(t[0])}function me(){return Mt().getClient()}function am(t){const e=t.getPropagationContext(),{traceId:n,parentSpanId:s,propagationSpanId:r}=e,i={trace_id:n,span_id:r||Hd()};return s&&(i.parent_span_id=s),i}const cm="sentry.source",lm="sentry.sample_rate",um="sentry.previous_trace_sample_rate",dm="sentry.op",hm="sentry.origin",Wd="sentry.profile_id",Vd="sentry.exclusive_time",fm=0,pm=1,gm="_sentryScope",mm="_sentryIsolationScope";function _m(t){if(t){if(typeof t=="object"&&"deref"in t&&typeof t.deref=="function")try{return t.deref()}catch{return}return t}}function jd(t){const e=t;return{scope:e[gm],isolationScope:_m(e[mm])}}const ym="sentry-",Em=/^sentry-/;function vm(t){const e=wm(t);if(!e)return;const n=Object.entries(e).reduce((s,[r,i])=>{if(r.match(Em)){const o=r.slice(ym.length);s[o]=i}return s},{});if(Object.keys(n).length>0)return n}function wm(t){if(!(!t||!rt(t)&&!Array.isArray(t)))return Array.isArray(t)?t.reduce((e,n)=>{const s=wl(n);return Object.entries(s).forEach(([r,i])=>{e[r]=i}),e},{}):wl(t)}function wl(t){return t.split(",").map(e=>{const n=e.indexOf("=");if(n===-1)return[];const s=e.slice(0,n),r=e.slice(n+1);return[s,r].map(i=>{try{return decodeURIComponent(i.trim())}catch{return}})}).reduce((e,[n,s])=>(n&&s&&(e[n]=s),e),{})}const bm=/^o(\d+)\./,Sm=/^(?:(\w+):)\/\/(?:(\w+)(?::(\w+)?)?@)([\w.-]+)(?::(\d+))?\/(.+)/;function Cm(t){return t==="http"||t==="https"}function Js(t,e=!1){const{host:n,path:s,pass:r,port:i,projectId:o,protocol:a,publicKey:c}=t;return`${a}://${c}${e&&r?`:${r}`:""}@${n}${i?`:${i}`:""}/${s&&`${s}/`}${o}`}function Im(t){const e=Sm.exec(t);if(!e){jn(()=>{console.error(`Invalid Sentry Dsn: ${t}`)});return}const[n,s,r="",i="",o="",a=""]=e.slice(1);let c="",l=a;const u=l.split("/");if(u.length>1&&(c=u.slice(0,-1).join("/"),l=u.pop()),l){const d=l.match(/^\d+/);d&&(l=d[0])}return Gd({host:i,pass:r,path:c,projectId:l,port:o,protocol:n,publicKey:s})}function Gd(t){return{protocol:t.protocol,publicKey:t.publicKey||"",pass:t.pass||"",host:t.host,port:t.port||"",path:t.path||"",projectId:t.projectId}}function Tm(t){if(!C)return!0;const{port:e,projectId:n,protocol:s}=t;return["protocol","publicKey","host","projectId"].find(o=>t[o]?!1:(w.error(`Invalid Sentry Dsn: ${o} missing`),!0))?!1:n.match(/^\d+$/)?Cm(s)?e&&isNaN(parseInt(e,10))?(w.error(`Invalid Sentry Dsn: Invalid port ${e}`),!1):!0:(w.error(`Invalid Sentry Dsn: Invalid protocol ${s}`),!1):(w.error(`Invalid Sentry Dsn: Invalid projectId ${n}`),!1)}function Rm(t){return t.match(bm)?.[1]}function km(t){const e=t.getOptions(),{host:n}=t.getDsn()||{};let s;return e.orgId?s=String(e.orgId):n&&(s=Rm(n)),s}function Am(t){const e=typeof t=="string"?Im(t):Gd(t);if(!(!e||!Tm(e)))return e}function Nm(t){if(typeof t=="boolean")return Number(t);const e=typeof t=="string"?parseFloat(t):t;if(!(typeof e!="number"||isNaN(e)||e<0||e>1))return e}const zd=1;let bl=!1;function Pm(t){const{spanId:e,traceId:n,isRemote:s}=t.spanContext(),r=s?e:Aa(t).parent_span_id,i=jd(t).scope,o=s?i?.getPropagationContext().propagationSpanId||Hd():e;return{parent_span_id:r,span_id:o,trace_id:n}}function Lm(t){if(t&&t.length>0)return t.map(({context:{spanId:e,traceId:n,traceFlags:s,...r},attributes:i})=>({span_id:e,trace_id:n,sampled:s===zd,attributes:i,...r}))}function Sl(t){return typeof t=="number"?Cl(t):Array.isArray(t)?t[0]+t[1]/1e9:t instanceof Date?Cl(t.getTime()):it()}function Cl(t){return t>9999999999?t/1e3:t}function Aa(t){if(Dm(t))return t.getSpanJSON();const{spanId:e,traceId:n}=t.spanContext();if(Om(t)){const{attributes:s,startTime:r,name:i,endTime:o,status:a,links:c}=t,l="parentSpanId"in t?t.parentSpanId:"parentSpanContext"in t?t.parentSpanContext?.spanId:void 0;return{span_id:e,trace_id:n,data:s,description:i,parent_span_id:l,start_timestamp:Sl(r),timestamp:Sl(o)||void 0,status:Mm(a),op:s[dm],origin:s[hm],links:Lm(c)}}return{span_id:e,trace_id:n,start_timestamp:0,data:{}}}function Om(t){const e=t;return!!e.attributes&&!!e.startTime&&!!e.name&&!!e.endTime&&!!e.status}function Dm(t){return typeof t.getSpanJSON=="function"}function xm(t){const{traceFlags:e}=t.spanContext();return e===zd}function Mm(t){if(!(!t||t.code===fm))return t.code===pm?"ok":t.message||"internal_error"}const Fm="_sentryRootSpan";function qd(t){return t[Fm]||t}function Il(){bl||(jn(()=>{console.warn("[Sentry] Returning null from `beforeSendSpan` is disallowed. To drop certain spans, configure the respective integrations directly or use `ignoreSpans`.")}),bl=!0)}function Um(t){if(typeof __SENTRY_TRACING__=="boolean"&&!__SENTRY_TRACING__)return!1;const e=me()?.getOptions();return!!e&&(e.tracesSampleRate!=null||!!e.tracesSampler)}function Tl(t){w.log(`Ignoring span ${t.op} - ${t.description} because it matches \`ignoreSpans\`.`)}function Rl(t,e){if(!e?.length||!t.description)return!1;for(const n of e){if(Bm(n)){if(br(t.description,n))return C&&Tl(t),!0;continue}if(!n.name&&!n.op)continue;const s=n.name?br(t.description,n.name):!0,r=n.op?t.op&&br(t.op,n.op):!0;if(s&&r)return C&&Tl(t),!0}return!1}function $m(t,e){const n=e.parent_span_id,s=e.span_id;if(n)for(const r of t)r.parent_span_id===s&&(r.parent_span_id=n)}function Bm(t){return typeof t=="string"||t instanceof RegExp}const Na="production",Hm="_frozenDsc";function Yd(t,e){const n=e.getOptions(),{publicKey:s}=e.getDsn()||{},r={environment:n.environment||Na,release:n.release,public_key:s,trace_id:t,org_id:km(e)};return e.emit("createDsc",r),r}function Wm(t,e){const n=e.getPropagationContext();return n.dsc||Yd(n.traceId,t)}function Vm(t){const e=me();if(!e)return{};const n=qd(t),s=Aa(n),r=s.data,i=n.spanContext().traceState,o=i?.get("sentry.sample_rate")??r[lm]??r[um];function a(p){return(typeof o=="number"||typeof o=="string")&&(p.sample_rate=`${o}`),p}const c=n[Hm];if(c)return a(c);const l=i?.get("sentry.dsc"),u=l&&vm(l);if(u)return a(u);const d=Yd(t.spanContext().traceId,e),h=r[cm],f=s.description;return h!=="url"&&f&&(d.transaction=f),Um()&&(d.sampled=String(xm(n)),d.sample_rand=i?.get("sentry.sample_rand")??jd(n).scope?.getPropagationContext().sampleRand.toString()),a(d),e.emit("createDsc",d,n),d}function Ze(t,e=100,n=1/0){try{return Ro("",t,e,n)}catch(s){return{ERROR:`**non-serializable** (${s})`}}}function Kd(t,e=3,n=100*1024){const s=Ze(t,e);return qm(s)>n?Kd(t,e-1,n):s}function Ro(t,e,n=1/0,s=1/0,r=Ym()){const[i,o]=r;if(e==null||["boolean","string"].includes(typeof e)||typeof e=="number"&&Number.isFinite(e))return e;const a=jm(t,e);if(!a.startsWith("[object "))return a;if(e.__sentry_skip_normalization__)return e;const c=typeof e.__sentry_override_normalization_depth__=="number"?e.__sentry_override_normalization_depth__:n;if(c===0)return a.replace("object ","");if(i(e))return"[Circular ~]";const l=e;if(l&&typeof l.toJSON=="function")try{const f=l.toJSON();return Ro("",f,c-1,s,r)}catch{}const u=Array.isArray(e)?[]:{};let d=0;const h=Fd(e);for(const f in h){if(!Object.prototype.hasOwnProperty.call(h,f))continue;if(d>=s){u[f]="[MaxProperties ~]";break}const p=h[f];u[f]=Ro(f,p,c-1,s,r),d++}return o(e),u}function jm(t,e){try{if(t==="domain"&&e&&typeof e=="object"&&e._events)return"[Domain]";if(t==="domainEmitter")return"[DomainEmitter]";if(typeof global<"u"&&e===global)return"[Global]";if(typeof window<"u"&&e===window)return"[Window]";if(typeof document<"u"&&e===document)return"[Document]";if(Dd(e))return Pd(e);if($g(e))return"[SyntheticEvent]";if(typeof e=="number"&&!Number.isFinite(e))return`[${e}]`;if(typeof e=="function")return`[Function: ${Pt(e)}]`;if(typeof e=="symbol")return`[${String(e)}]`;if(typeof e=="bigint")return`[BigInt: ${String(e)}]`;const n=Gm(e);return/^HTML(\w*)Element$/.test(n)?`[HTMLElement: ${n}]`:`[object ${n}]`}catch(n){return`**non-serializable** (${n})`}}function Gm(t){const e=Object.getPrototypeOf(t);return e?.constructor?e.constructor.name:"null prototype"}function zm(t){return~-encodeURI(t).split(/%..|./).length}function qm(t){return zm(JSON.stringify(t))}function Ym(){const t=new WeakSet;function e(s){return t.has(s)?!0:(t.add(s),!1)}function n(s){t.delete(s)}return[e,n]}function zn(t,e=[]){return[t,e]}function Km(t,e){const[n,s]=t;return[n,[...s,e]]}function kl(t,e){const n=t[1];for(const s of n){const r=s[0].type;if(e(s,r))return!0}return!1}function ko(t){const e=_i(O);return e.encodePolyfill?e.encodePolyfill(t):new TextEncoder().encode(t)}function Jm(t){const[e,n]=t;let s=JSON.stringify(e);function r(i){typeof s=="string"?s=typeof i=="string"?s+i:[ko(s),i]:s.push(typeof i=="string"?ko(i):i)}for(const i of n){const[o,a]=i;if(r(`
${JSON.stringify(o)}
`),typeof a=="string"||a instanceof Uint8Array)r(a);else{let c;try{c=JSON.stringify(a)}catch{c=JSON.stringify(Ze(a))}r(c)}}return typeof s=="string"?s:Qm(s)}function Qm(t){const e=t.reduce((r,i)=>r+i.length,0),n=new Uint8Array(e);let s=0;for(const r of t)n.set(r,s),s+=r.length;return n}function Xm(t){const e=typeof t.data=="string"?ko(t.data):t.data;return[{type:"attachment",length:e.length,filename:t.filename,content_type:t.contentType,attachment_type:t.attachmentType},e]}const Zm={session:"session",sessions:"session",attachment:"attachment",transaction:"transaction",event:"error",client_report:"internal",user_report:"default",profile:"profile",profile_chunk:"profile",replay_event:"replay",replay_recording:"replay",check_in:"monitor",feedback:"feedback",span:"span",raw_security:"security",log:"log_item",metric:"metric",trace_metric:"metric"};function Al(t){return Zm[t]}function Jd(t){if(!t?.sdk)return;const{name:e,version:n}=t.sdk;return{name:e,version:n}}function e_(t,e,n,s){const r=t.sdkProcessingMetadata?.dynamicSamplingContext;return{event_id:t.event_id,sent_at:new Date().toISOString(),...e&&{sdk:e},...!!n&&s&&{dsn:Js(s)},...r&&{trace:r}}}function t_(t,e){if(!e)return t;const n=t.sdk||{};return t.sdk={...n,name:n.name||e.name,version:n.version||e.version,integrations:[...t.sdk?.integrations||[],...e.integrations||[]],packages:[...t.sdk?.packages||[],...e.packages||[]],settings:t.sdk?.settings||e.settings?{...t.sdk?.settings,...e.settings}:void 0},t}function n_(t,e,n,s){const r=Jd(n),i={sent_at:new Date().toISOString(),...r&&{sdk:r},...!!s&&e&&{dsn:Js(e)}},o="aggregates"in t?[{type:"sessions"},t]:[{type:"session"},t.toJSON()];return zn(i,[o])}function s_(t,e,n,s){const r=Jd(n),i=t.type&&t.type!=="replay_event"?t.type:"event";t_(t,n?.sdk);const o=e_(t,r,s,e);return delete t.sdkProcessingMetadata,zn(o,[[{type:i},t]])}const Zi=0,Nl=1,Pl=2;function wi(t){return new Ps(e=>{e(t)})}function Pa(t){return new Ps((e,n)=>{n(t)})}class Ps{constructor(e){this._state=Zi,this._handlers=[],this._runExecutor(e)}then(e,n){return new Ps((s,r)=>{this._handlers.push([!1,i=>{if(!e)s(i);else try{s(e(i))}catch(o){r(o)}},i=>{if(!n)r(i);else try{s(n(i))}catch(o){r(o)}}]),this._executeHandlers()})}catch(e){return this.then(n=>n,e)}finally(e){return new Ps((n,s)=>{let r,i;return this.then(o=>{i=!1,r=o,e&&e()},o=>{i=!0,r=o,e&&e()}).then(()=>{if(i){s(r);return}n(r)})})}_executeHandlers(){if(this._state===Zi)return;const e=this._handlers.slice();this._handlers=[],e.forEach(n=>{n[0]||(this._state===Nl&&n[1](this._value),this._state===Pl&&n[2](this._value),n[0]=!0)})}_runExecutor(e){const n=(i,o)=>{if(this._state===Zi){if(zs(o)){o.then(s,r);return}this._state=i,this._value=o,this._executeHandlers()}},s=i=>{n(Nl,i)},r=i=>{n(Pl,i)};try{e(s,r)}catch(i){r(i)}}}function r_(t,e,n,s=0){try{const r=Ao(e,n,t,s);return zs(r)?r:wi(r)}catch(r){return Pa(r)}}function Ao(t,e,n,s){const r=n[s];if(!t||!r)return t;const i=r({...t},e);return C&&i===null&&w.log(`Event processor "${r.id||"?"}" dropped event`),zs(i)?i.then(o=>Ao(o,e,n,s+1)):Ao(i,e,n,s+1)}function i_(t,e){const{fingerprint:n,span:s,breadcrumbs:r,sdkProcessingMetadata:i}=e;o_(t,e),s&&l_(t,s),u_(t,n),a_(t,r),c_(t,i)}function Ll(t,e){const{extra:n,tags:s,user:r,contexts:i,level:o,sdkProcessingMetadata:a,breadcrumbs:c,fingerprint:l,eventProcessors:u,attachments:d,propagationContext:h,transactionName:f,span:p}=e;hr(t,"extra",n),hr(t,"tags",s),hr(t,"user",r),hr(t,"contexts",i),t.sdkProcessingMetadata=Ys(t.sdkProcessingMetadata,a,2),o&&(t.level=o),f&&(t.transactionName=f),p&&(t.span=p),c.length&&(t.breadcrumbs=[...t.breadcrumbs,...c]),l.length&&(t.fingerprint=[...t.fingerprint,...l]),u.length&&(t.eventProcessors=[...t.eventProcessors,...u]),d.length&&(t.attachments=[...t.attachments,...d]),t.propagationContext={...t.propagationContext,...h}}function hr(t,e,n){t[e]=Ys(t[e],n,1)}function o_(t,e){const{extra:n,tags:s,user:r,contexts:i,level:o,transactionName:a}=e;Object.keys(n).length&&(t.extra={...n,...t.extra}),Object.keys(s).length&&(t.tags={...s,...t.tags}),Object.keys(r).length&&(t.user={...r,...t.user}),Object.keys(i).length&&(t.contexts={...i,...t.contexts}),o&&(t.level=o),a&&t.type!=="transaction"&&(t.transaction=a)}function a_(t,e){const n=[...t.breadcrumbs||[],...e];t.breadcrumbs=n.length?n:void 0}function c_(t,e){t.sdkProcessingMetadata={...t.sdkProcessingMetadata,...e}}function l_(t,e){t.contexts={trace:Pm(e),...t.contexts},t.sdkProcessingMetadata={dynamicSamplingContext:Vm(e),...t.sdkProcessingMetadata};const n=qd(e),s=Aa(n).description;s&&!t.transaction&&t.type==="transaction"&&(t.transaction=s)}function u_(t,e){t.fingerprint=t.fingerprint?Array.isArray(t.fingerprint)?t.fingerprint:[t.fingerprint]:[],e&&(t.fingerprint=t.fingerprint.concat(e)),t.fingerprint.length||delete t.fingerprint}let $t,Ol,Dl,ft;function d_(t){const e=O._sentryDebugIds,n=O._debugIds;if(!e&&!n)return{};const s=e?Object.keys(e):[],r=n?Object.keys(n):[];if(ft&&s.length===Ol&&r.length===Dl)return ft;Ol=s.length,Dl=r.length,ft={},$t||($t={});const i=(o,a)=>{for(const c of o){const l=a[c],u=$t?.[c];if(u&&ft&&l)ft[u[0]]=l,$t&&($t[c]=[u[0],l]);else if(l){const d=t(c);for(let h=d.length-1;h>=0;h--){const p=d[h]?.filename;if(p&&ft&&$t){ft[p]=l,$t[c]=[p,l];break}}}}};return e&&i(s,e),n&&i(r,n),ft}function h_(t,e,n,s,r,i){const{normalizeDepth:o=3,normalizeMaxBreadth:a=1e3}=t,c={...e,event_id:e.event_id||n.event_id||Te(),timestamp:e.timestamp||qs()},l=n.integrations||t.integrations.map(m=>m.name);f_(c,t),m_(c,l),r&&r.emit("applyFrameMetadata",e),e.type===void 0&&p_(c,t.stackParser);const u=y_(s,n.captureContext);n.mechanism&&Rn(c,n.mechanism);const d=r?r.getEventProcessors():[],h=im().getScopeData();if(i){const m=i.getScopeData();Ll(h,m)}if(u){const m=u.getScopeData();Ll(h,m)}const f=[...n.attachments||[],...h.attachments];f.length&&(n.attachments=f),i_(c,h);const p=[...d,...h.eventProcessors];return r_(p,c,n).then(m=>(m&&g_(m),typeof o=="number"&&o>0?__(m,o,a):m))}function f_(t,e){const{environment:n,release:s,dist:r,maxValueLength:i}=e;t.environment=t.environment||n||Na,!t.release&&s&&(t.release=s),!t.dist&&r&&(t.dist=r);const o=t.request;o?.url&&(o.url=i?Ud(o.url,i):o.url)}function p_(t,e){const n=d_(e);t.exception?.values?.forEach(s=>{s.stacktrace?.frames?.forEach(r=>{r.filename&&(r.debug_id=n[r.filename])})})}function g_(t){const e={};if(t.exception?.values?.forEach(s=>{s.stacktrace?.frames?.forEach(r=>{r.debug_id&&(r.abs_path?e[r.abs_path]=r.debug_id:r.filename&&(e[r.filename]=r.debug_id),delete r.debug_id)})}),Object.keys(e).length===0)return;t.debug_meta=t.debug_meta||{},t.debug_meta.images=t.debug_meta.images||[];const n=t.debug_meta.images;Object.entries(e).forEach(([s,r])=>{n.push({type:"sourcemap",code_file:s,debug_id:r})})}function m_(t,e){e.length>0&&(t.sdk=t.sdk||{},t.sdk.integrations=[...t.sdk.integrations||[],...e])}function __(t,e,n){if(!t)return null;const s={...t,...t.breadcrumbs&&{breadcrumbs:t.breadcrumbs.map(r=>({...r,...r.data&&{data:Ze(r.data,e,n)}}))},...t.user&&{user:Ze(t.user,e,n)},...t.contexts&&{contexts:Ze(t.contexts,e,n)},...t.extra&&{extra:Ze(t.extra,e,n)}};return t.contexts?.trace&&s.contexts&&(s.contexts.trace=t.contexts.trace,t.contexts.trace.data&&(s.contexts.trace.data=Ze(t.contexts.trace.data,e,n))),t.spans&&(s.spans=t.spans.map(r=>({...r,...r.data&&{data:Ze(r.data,e,n)}}))),t.contexts?.flags&&s.contexts&&(s.contexts.flags=Ze(t.contexts.flags,3,n)),s}function y_(t,e){if(!e)return t;const n=t?t.clone():new at;return n.update(e),n}function E_(t,e){return Mt().captureException(t,void 0)}function Qd(t,e){return Mt().captureEvent(t,e)}function xl(t){const e=Ks(),n=Mt(),{userAgent:s}=O.navigator||{},r=Kg({user:n.getUser()||e.getUser(),...s&&{userAgent:s},...t}),i=e.getSession();return i?.status==="ok"&&kn(i,{status:"exited"}),Xd(),e.setSession(r),r}function Xd(){const t=Ks(),n=Mt().getSession()||t.getSession();n&&Jg(n),Zd(),t.setSession()}function Zd(){const t=Ks(),e=me(),n=t.getSession();n&&e&&e.captureSession(n)}function Ml(t=!1){if(t){Xd();return}Zd()}const v_="7";function w_(t){const e=t.protocol?`${t.protocol}:`:"",n=t.port?`:${t.port}`:"";return`${e}//${t.host}${n}${t.path?`/${t.path}`:""}/api/`}function b_(t){return`${w_(t)}${t.projectId}/envelope/`}function S_(t,e){const n={sentry_version:v_};return t.publicKey&&(n.sentry_key=t.publicKey),e&&(n.sentry_client=`${e.name}/${e.version}`),new URLSearchParams(n).toString()}function C_(t,e,n){return e||`${b_(t)}?${S_(t,n)}`}const Fl=[];function I_(t){const e={};return t.forEach(n=>{const{name:s}=n,r=e[s];r&&!r.isDefaultInstance&&n.isDefaultInstance||(e[s]=n)}),Object.values(e)}function T_(t){const e=t.defaultIntegrations||[],n=t.integrations;e.forEach(r=>{r.isDefaultInstance=!0});let s;if(Array.isArray(n))s=[...e,...n];else if(typeof n=="function"){const r=n(e);s=Array.isArray(r)?r:[r]}else s=e;return I_(s)}function R_(t,e){const n={};return e.forEach(s=>{s&&eh(t,s,n)}),n}function Ul(t,e){for(const n of e)n?.afterAllSetup&&n.afterAllSetup(t)}function eh(t,e,n){if(n[e.name]){C&&w.log(`Integration skipped because it was already installed: ${e.name}`);return}if(n[e.name]=e,!Fl.includes(e.name)&&typeof e.setupOnce=="function"&&(e.setupOnce(),Fl.push(e.name)),e.setup&&typeof e.setup=="function"&&e.setup(t),typeof e.preprocessEvent=="function"){const s=e.preprocessEvent.bind(e);t.on("preprocessEvent",(r,i)=>s(r,i,t))}if(typeof e.processEvent=="function"){const s=e.processEvent.bind(e),r=Object.assign((i,o)=>s(i,o,t),{id:e.name});t.addEventProcessor(r)}C&&w.log(`Integration installed: ${e.name}`)}function k_(t){return[{type:"log",item_count:t.length,content_type:"application/vnd.sentry.items.log+json"},{items:t}]}function A_(t,e,n,s){const r={};return e?.sdk&&(r.sdk={name:e.sdk.name,version:e.sdk.version}),n&&s&&(r.dsn=Js(s)),zn(r,[k_(t)])}function th(t,e){const n=e??N_(t)??[];if(n.length===0)return;const s=t.getOptions(),r=A_(n,s._metadata,s.tunnel,t.getDsn());nh().set(t,[]),t.emit("flushLogs"),t.sendEnvelope(r)}function N_(t){return nh().get(t)}function nh(){return Vn("clientToLogBufferMap",()=>new WeakMap)}function P_(t){return[{type:"trace_metric",item_count:t.length,content_type:"application/vnd.sentry.items.trace-metric+json"},{items:t}]}function L_(t,e,n,s){const r={};return e?.sdk&&(r.sdk={name:e.sdk.name,version:e.sdk.version}),n&&s&&(r.dsn=Js(s)),zn(r,[P_(t)])}function sh(t,e){const n=e??O_(t)??[];if(n.length===0)return;const s=t.getOptions(),r=L_(n,s._metadata,s.tunnel,t.getDsn());rh().set(t,[]),t.emit("flushMetrics"),t.sendEnvelope(r)}function O_(t){return rh().get(t)}function rh(){return Vn("clientToMetricBufferMap",()=>new WeakMap)}function D_(t,e,n){const s=[{type:"client_report"},{timestamp:qs(),discarded_events:t}];return zn(e?{dsn:e}:{},[s])}function ih(t){const e=[];t.message&&e.push(t.message);try{const n=t.exception.values[t.exception.values.length-1];n?.value&&(e.push(n.value),n.type&&e.push(`${n.type}: ${n.value}`))}catch{}return e}function x_(t){const{trace_id:e,parent_span_id:n,span_id:s,status:r,origin:i,data:o,op:a}=t.contexts?.trace??{};return{data:o??{},description:t.transaction,op:a,parent_span_id:n,span_id:s??"",start_timestamp:t.start_timestamp??0,status:r,timestamp:t.timestamp,trace_id:e??"",origin:i,profile_id:o?.[Wd],exclusive_time:o?.[Vd],measurements:t.measurements,is_segment:!0}}function M_(t){return{type:"transaction",timestamp:t.timestamp,start_timestamp:t.start_timestamp,transaction:t.description,contexts:{trace:{trace_id:t.trace_id,span_id:t.span_id,parent_span_id:t.parent_span_id,op:t.op,status:t.status,origin:t.origin,data:{...t.data,...t.profile_id&&{[Wd]:t.profile_id},...t.exclusive_time&&{[Vd]:t.exclusive_time}}}},measurements:t.measurements}}const $l="Not capturing exception because it's already been captured.",Bl="Discarded session because of missing or non-string release",oh=Symbol.for("SentryInternalError"),ah=Symbol.for("SentryDoNotSendEventError"),F_=5e3;function Sr(t){return{message:t,[oh]:!0}}function eo(t){return{message:t,[ah]:!0}}function Hl(t){return!!t&&typeof t=="object"&&oh in t}function Wl(t){return!!t&&typeof t=="object"&&ah in t}function Vl(t,e,n,s,r){let i=0,o,a=!1;t.on(n,()=>{i=0,clearTimeout(o),a=!1}),t.on(e,c=>{i+=s(c),i>=8e5?r(t):a||(a=!0,o=setTimeout(()=>{r(t)},F_))}),t.on("flush",()=>{r(t)})}class U_{constructor(e){if(this._options=e,this._integrations={},this._numProcessing=0,this._outcomes={},this._hooks={},this._eventProcessors=[],e.dsn?this._dsn=Am(e.dsn):C&&w.warn("No DSN provided, client will not send events."),this._dsn){const s=C_(this._dsn,e.tunnel,e._metadata?e._metadata.sdk:void 0);this._transport=e.transport({tunnel:this._options.tunnel,recordDroppedEvent:this.recordDroppedEvent.bind(this),...e.transportOptions,url:s})}this._options.enableLogs&&Vl(this,"afterCaptureLog","flushLogs",W_,th),(this._options.enableMetrics??this._options._experiments?.enableMetrics??!0)&&Vl(this,"afterCaptureMetric","flushMetrics",H_,sh)}captureException(e,n,s){const r=Te();if(gl(e))return C&&w.log($l),r;const i={event_id:r,...n};return this._process(this.eventFromException(e,i).then(o=>this._captureEvent(o,i,s))),i.event_id}captureMessage(e,n,s,r){const i={event_id:Te(),...s},o=Ca(e)?e:String(e),a=yi(e)?this.eventFromMessage(o,n,i):this.eventFromException(e,i);return this._process(a.then(c=>this._captureEvent(c,i,r))),i.event_id}captureEvent(e,n,s){const r=Te();if(n?.originalException&&gl(n.originalException))return C&&w.log($l),r;const i={event_id:r,...n},o=e.sdkProcessingMetadata||{},a=o.capturedSpanScope,c=o.capturedSpanIsolationScope;return this._process(this._captureEvent(e,i,a||s,c)),i.event_id}captureSession(e){this.sendSession(e),kn(e,{init:!1})}getDsn(){return this._dsn}getOptions(){return this._options}getSdkMetadata(){return this._options._metadata}getTransport(){return this._transport}async flush(e){const n=this._transport;if(!n)return!0;this.emit("flush");const s=await this._isClientDoneProcessing(e),r=await n.flush(e);return s&&r}async close(e){const n=await this.flush(e);return this.getOptions().enabled=!1,this.emit("close"),n}getEventProcessors(){return this._eventProcessors}addEventProcessor(e){this._eventProcessors.push(e)}init(){(this._isEnabled()||this._options.integrations.some(({name:e})=>e.startsWith("Spotlight")))&&this._setupIntegrations()}getIntegrationByName(e){return this._integrations[e]}addIntegration(e){const n=this._integrations[e.name];eh(this,e,this._integrations),n||Ul(this,[e])}sendEvent(e,n={}){this.emit("beforeSendEvent",e,n);let s=s_(e,this._dsn,this._options._metadata,this._options.tunnel);for(const r of n.attachments||[])s=Km(s,Xm(r));this.sendEnvelope(s).then(r=>this.emit("afterSendEvent",e,r))}sendSession(e){const{release:n,environment:s=Na}=this._options;if("aggregates"in e){const i=e.attrs||{};if(!i.release&&!n){C&&w.warn(Bl);return}i.release=i.release||n,i.environment=i.environment||s,e.attrs=i}else{if(!e.release&&!n){C&&w.warn(Bl);return}e.release=e.release||n,e.environment=e.environment||s}this.emit("beforeSendSession",e);const r=n_(e,this._dsn,this._options._metadata,this._options.tunnel);this.sendEnvelope(r)}recordDroppedEvent(e,n,s=1){if(this._options.sendClientReports){const r=`${e}:${n}`;C&&w.log(`Recording outcome: "${r}"${s>1?` (${s} times)`:""}`),this._outcomes[r]=(this._outcomes[r]||0)+s}}on(e,n){const s=this._hooks[e]=this._hooks[e]||new Set,r=(...i)=>n(...i);return s.add(r),()=>{s.delete(r)}}emit(e,...n){const s=this._hooks[e];s&&s.forEach(r=>r(...n))}async sendEnvelope(e){if(this.emit("beforeEnvelope",e),this._isEnabled()&&this._transport)try{return await this._transport.send(e)}catch(n){return C&&w.error("Error while sending envelope:",n),{}}return C&&w.error("Transport disabled"),{}}_setupIntegrations(){const{integrations:e}=this._options;this._integrations=R_(this,e),Ul(this,e)}_updateSessionFromEvent(e,n){let s=n.level==="fatal",r=!1;const i=n.exception?.values;if(i){r=!0,s=!1;for(const c of i)if(c.mechanism?.handled===!1){s=!0;break}}const o=e.status==="ok";(o&&e.errors===0||o&&s)&&(kn(e,{...s&&{status:"crashed"},errors:e.errors||Number(r||s)}),this.captureSession(e))}async _isClientDoneProcessing(e){let n=0;for(;!e||n<e;){if(await new Promise(s=>setTimeout(s,1)),!this._numProcessing)return!0;n++}return!1}_isEnabled(){return this.getOptions().enabled!==!1&&this._transport!==void 0}_prepareEvent(e,n,s,r){const i=this.getOptions(),o=Object.keys(this._integrations);return!n.integrations&&o?.length&&(n.integrations=o),this.emit("preprocessEvent",e,n),e.type||r.setLastEventId(e.event_id||n.event_id),h_(i,e,n,s,this,r).then(a=>{if(a===null)return a;this.emit("postprocessEvent",a,n),a.contexts={trace:am(s),...a.contexts};const c=Wm(this,s);return a.sdkProcessingMetadata={dynamicSamplingContext:c,...a.sdkProcessingMetadata},a})}_captureEvent(e,n={},s=Mt(),r=Ks()){return C&&No(e)&&w.log(`Captured error event \`${ih(e)[0]||"<unknown>"}\``),this._processEvent(e,n,s,r).then(i=>i.event_id,i=>{C&&(Wl(i)?w.log(i.message):Hl(i)?w.warn(i.message):w.warn(i))})}_processEvent(e,n,s,r){const i=this.getOptions(),{sampleRate:o}=i,a=ch(e),c=No(e),l=e.type||"error",u=`before send for type \`${l}\``,d=typeof o>"u"?void 0:Nm(o);if(c&&typeof d=="number"&&Math.random()>d)return this.recordDroppedEvent("sample_rate","error"),Pa(eo(`Discarding event because it's not included in the random sample (sampling rate = ${o})`));const h=l==="replay_event"?"replay":l;return this._prepareEvent(e,n,s,r).then(f=>{if(f===null)throw this.recordDroppedEvent("event_processor",h),eo("An event processor returned `null`, will not send event.");if(n.data&&n.data.__sentry__===!0)return f;const y=B_(this,i,f,n);return $_(y,u)}).then(f=>{if(f===null){if(this.recordDroppedEvent("before_send",h),a){const A=1+(e.spans||[]).length;this.recordDroppedEvent("before_send","span",A)}throw eo(`${u} returned \`null\`, will not send event.`)}const p=s.getSession()||r.getSession();if(c&&p&&this._updateSessionFromEvent(p,f),a){const m=f.sdkProcessingMetadata?.spanCountBeforeProcessing||0,A=f.spans?f.spans.length:0,N=m-A;N>0&&this.recordDroppedEvent("before_send","span",N)}const y=f.transaction_info;if(a&&y&&f.transaction!==e.transaction){const m="custom";f.transaction_info={...y,source:m}}return this.sendEvent(f,n),f}).then(null,f=>{throw Wl(f)||Hl(f)?f:(this.captureException(f,{mechanism:{handled:!1,type:"internal"},data:{__sentry__:!0},originalException:f}),Sr(`Event processing pipeline threw an error, original event will not be sent. Details have been sent as a new event.
Reason: ${f}`))})}_process(e){this._numProcessing++,e.then(n=>(this._numProcessing--,n),n=>(this._numProcessing--,n))}_clearOutcomes(){const e=this._outcomes;return this._outcomes={},Object.entries(e).map(([n,s])=>{const[r,i]=n.split(":");return{reason:r,category:i,quantity:s}})}_flushOutcomes(){C&&w.log("Flushing outcomes...");const e=this._clearOutcomes();if(e.length===0){C&&w.log("No outcomes to send");return}if(!this._dsn){C&&w.log("No dsn provided, will not send outcomes");return}C&&w.log("Sending outcomes:",e);const n=D_(e,this._options.tunnel&&Js(this._dsn));this.sendEnvelope(n)}}function $_(t,e){const n=`${e} must return \`null\` or a valid event.`;if(zs(t))return t.then(s=>{if(!Ns(s)&&s!==null)throw Sr(n);return s},s=>{throw Sr(`${e} rejected with ${s}`)});if(!Ns(t)&&t!==null)throw Sr(n);return t}function B_(t,e,n,s){const{beforeSend:r,beforeSendTransaction:i,beforeSendSpan:o,ignoreSpans:a}=e;let c=n;if(No(c)&&r)return r(c,s);if(ch(c)){if(o||a){const l=x_(c);if(a?.length&&Rl(l,a))return null;if(o){const u=o(l);u?c=Ys(n,M_(u)):Il()}if(c.spans){const u=[],d=c.spans;for(const f of d){if(a?.length&&Rl(f,a)){$m(d,f);continue}if(o){const p=o(f);p?u.push(p):(Il(),u.push(f))}else u.push(f)}const h=c.spans.length-u.length;h&&t.recordDroppedEvent("before_send","span",h),c.spans=u}}if(i){if(c.spans){const l=c.spans.length;c.sdkProcessingMetadata={...n.sdkProcessingMetadata,spanCountBeforeProcessing:l}}return i(c,s)}}return c}function No(t){return t.type===void 0}function ch(t){return t.type==="transaction"}function H_(t){let e=0;return t.name&&(e+=t.name.length*2),e+=8,e+lh(t.attributes)}function W_(t){let e=0;return t.message&&(e+=t.message.length*2),e+lh(t.attributes)}function lh(t){if(!t)return 0;let e=0;return Object.values(t).forEach(n=>{Array.isArray(n)?e+=n.length*jl(n[0]):yi(n)?e+=jl(n):e+=100}),e}function jl(t){return typeof t=="string"?t.length*2:typeof t=="number"?8:typeof t=="boolean"?4:0}function V_(t,e){e.debug===!0&&(C?w.enable():jn(()=>{console.warn("[Sentry] Cannot initialize SDK with `debug` option using a non-debug bundle.")})),Mt().update(e.initialScope);const s=new t(e);return j_(s),s.init(),s}function j_(t){Mt().setClient(t)}const uh=Symbol.for("SentryBufferFullError");function dh(t=100){const e=new Set;function n(){return e.size<t}function s(o){e.delete(o)}function r(o){if(!n())return Pa(uh);const a=o();return e.add(a),a.then(()=>s(a),()=>s(a)),a}function i(o){if(!e.size)return wi(!0);const a=Promise.allSettled(Array.from(e)).then(()=>!0);if(!o)return a;const c=[a,new Promise(l=>setTimeout(()=>l(!1),o))];return Promise.race(c)}return{get $(){return Array.from(e)},add:r,drain:i}}const G_=60*1e3;function z_(t,e=Date.now()){const n=parseInt(`${t}`,10);if(!isNaN(n))return n*1e3;const s=Date.parse(`${t}`);return isNaN(s)?G_:s-e}function q_(t,e){return t[e]||t.all||0}function Y_(t,e,n=Date.now()){return q_(t,e)>n}function K_(t,{statusCode:e,headers:n},s=Date.now()){const r={...t},i=n?.["x-sentry-rate-limits"],o=n?.["retry-after"];if(i)for(const a of i.trim().split(",")){const[c,l,,,u]=a.split(":",5),d=parseInt(c,10),h=(isNaN(d)?60:d)*1e3;if(!l)r.all=s+h;else for(const f of l.split(";"))f==="metric_bucket"?(!u||u.split(";").includes("custom"))&&(r[f]=s+h):r[f]=s+h}else o?r.all=s+z_(o,s):e===429&&(r.all=s+60*1e3);return r}const J_=64;function Q_(t,e,n=dh(t.bufferSize||J_)){let s={};const r=o=>n.drain(o);function i(o){const a=[];if(kl(o,(d,h)=>{const f=Al(h);Y_(s,f)?t.recordDroppedEvent("ratelimit_backoff",f):a.push(d)}),a.length===0)return Promise.resolve({});const c=zn(o[0],a),l=d=>{kl(c,(h,f)=>{t.recordDroppedEvent(d,Al(f))})},u=()=>e({body:Jm(c)}).then(d=>(d.statusCode!==void 0&&(d.statusCode<200||d.statusCode>=300)&&C&&w.warn(`Sentry responded with status code ${d.statusCode} to sent event.`),s=K_(s,d),d),d=>{throw l("network_error"),C&&w.error("Encountered error running transport request:",d),d});return n.add(u).then(d=>d,d=>{if(d===uh)return C&&w.error("Skipped sending event because buffer is full."),l("queue_overflow"),Promise.resolve({});throw d})}return{send:i,flush:r}}function to(t){if(!t)return{};const e=t.match(/^(([^:/?#]+):)?(\/\/([^/?#]*))?([^?#]*)(\?([^#]*))?(#(.*))?$/);if(!e)return{};const n=e[6]||"",s=e[8]||"";return{host:e[4],path:e[5],protocol:e[2],search:n,hash:s,relative:e[5]+n+s}}function X_(t){"aggregates"in t?t.attrs?.ip_address===void 0&&(t.attrs={...t.attrs,ip_address:"{{auto}}"}):t.ipAddress===void 0&&(t.ipAddress="{{auto}}")}function Z_(t,e,n=[e],s="npm"){const r=t._metadata||{};r.sdk||(r.sdk={name:`sentry.javascript.${e}`,packages:n.map(i=>({name:`${s}:@sentry/${i}`,version:Jt})),version:Jt}),t._metadata=r}const ey=100;function tn(t,e){const n=me(),s=Ks();if(!n)return;const{beforeBreadcrumb:r=null,maxBreadcrumbs:i=ey}=n.getOptions();if(i<=0)return;const a={timestamp:qs(),...t},c=r?jn(()=>r(a,e)):a;c!==null&&(n.emit&&n.emit("beforeAddBreadcrumb",c,e),s.addBreadcrumb(c,i))}let Gl;const ty="FunctionToString",zl=new WeakMap,ny=(()=>({name:ty,setupOnce(){Gl=Function.prototype.toString;try{Function.prototype.toString=function(...t){const e=Ra(this),n=zl.has(me())&&e!==void 0?e:this;return Gl.apply(n,t)}}catch{}},setup(t){zl.set(t,!0)}})),sy=ny,ry=[/^Script error\.?$/,/^Javascript error: Script error\.? on line 0$/,/^ResizeObserver loop completed with undelivered notifications.$/,/^Cannot redefine property: googletag$/,/^Can't find variable: gmo$/,/^undefined is not an object \(evaluating 'a\.[A-Z]'\)$/,`can't redefine non-configurable property "solana"`,"vv().getRestrictions is not a function. (In 'vv().getRestrictions(1,a)', 'vv().getRestrictions' is undefined)","Can't find variable: _AutofillCallbackHandler",/^Non-Error promise rejection captured with value: Object Not Found Matching Id:\d+, MethodName:simulateEvent, ParamCount:\d+$/,/^Java exception was raised during method invocation$/],iy="EventFilters",oy=(t={})=>{let e;return{name:iy,setup(n){const s=n.getOptions();e=ql(t,s)},processEvent(n,s,r){if(!e){const i=r.getOptions();e=ql(t,i)}return cy(n,e)?null:n}}},ay=((t={})=>({...oy(t),name:"InboundFilters"}));function ql(t={},e={}){return{allowUrls:[...t.allowUrls||[],...e.allowUrls||[]],denyUrls:[...t.denyUrls||[],...e.denyUrls||[]],ignoreErrors:[...t.ignoreErrors||[],...e.ignoreErrors||[],...t.disableErrorDefaults?[]:ry],ignoreTransactions:[...t.ignoreTransactions||[],...e.ignoreTransactions||[]]}}function cy(t,e){if(t.type){if(t.type==="transaction"&&uy(t,e.ignoreTransactions))return C&&w.warn(`Event dropped due to being matched by \`ignoreTransactions\` option.
Event: ${zt(t)}`),!0}else{if(ly(t,e.ignoreErrors))return C&&w.warn(`Event dropped due to being matched by \`ignoreErrors\` option.
Event: ${zt(t)}`),!0;if(py(t))return C&&w.warn(`Event dropped due to not having an error message, error type or stacktrace.
Event: ${zt(t)}`),!0;if(dy(t,e.denyUrls))return C&&w.warn(`Event dropped due to being matched by \`denyUrls\` option.
Event: ${zt(t)}.
Url: ${Ur(t)}`),!0;if(!hy(t,e.allowUrls))return C&&w.warn(`Event dropped due to not being matched by \`allowUrls\` option.
Event: ${zt(t)}.
Url: ${Ur(t)}`),!0}return!1}function ly(t,e){return e?.length?ih(t).some(n=>vi(n,e)):!1}function uy(t,e){if(!e?.length)return!1;const n=t.transaction;return n?vi(n,e):!1}function dy(t,e){if(!e?.length)return!1;const n=Ur(t);return n?vi(n,e):!1}function hy(t,e){if(!e?.length)return!0;const n=Ur(t);return n?vi(n,e):!0}function fy(t=[]){for(let e=t.length-1;e>=0;e--){const n=t[e];if(n&&n.filename!=="<anonymous>"&&n.filename!=="[native code]")return n.filename||null}return null}function Ur(t){try{const n=[...t.exception?.values??[]].reverse().find(s=>s.mechanism?.parent_id===void 0&&s.stacktrace?.frames?.length)?.stacktrace?.frames;return n?fy(n):null}catch{return C&&w.error(`Cannot extract url for event ${zt(t)}`),null}}function py(t){return t.exception?.values?.length?!t.message&&!t.exception.values.some(e=>e.stacktrace||e.type&&e.type!=="Error"||e.value):!1}function gy(t,e,n,s,r,i){if(!r.exception?.values||!i||!Lt(i.originalException,Error))return;const o=r.exception.values.length>0?r.exception.values[r.exception.values.length-1]:void 0;o&&(r.exception.values=Po(t,e,s,i.originalException,n,r.exception.values,o,0))}function Po(t,e,n,s,r,i,o,a){if(i.length>=n+1)return i;let c=[...i];if(Lt(s[r],Error)){Yl(o,a);const l=t(e,s[r]),u=c.length;Kl(l,r,u,a),c=Po(t,e,n,s[r],r,[l,...c],l,u)}return Array.isArray(s.errors)&&s.errors.forEach((l,u)=>{if(Lt(l,Error)){Yl(o,a);const d=t(e,l),h=c.length;Kl(d,`errors[${u}]`,h,a),c=Po(t,e,n,l,r,[d,...c],d,h)}}),c}function Yl(t,e){t.mechanism={handled:!0,type:"auto.core.linked_errors",...t.mechanism,...t.type==="AggregateError"&&{is_exception_group:!0},exception_id:e}}function Kl(t,e,n,s){t.mechanism={handled:!0,...t.mechanism,type:"chained",source:e,exception_id:n,parent_id:s}}function my(t){const e="console";ln(e,t),un(e,_y)}function _y(){"console"in O&&Sg.forEach(function(t){t in O.console&&be(O.console,t,function(e){return Fr[t]=e,function(...n){Fe("console",{args:n,level:t}),Fr[t]?.apply(O.console,n)}})})}function yy(t){return t==="warn"?"warning":["fatal","error","warning","log","info","debug"].includes(t)?t:"log"}const Ey="Dedupe",vy=(()=>{let t;return{name:Ey,processEvent(e){if(e.type)return e;try{if(by(e,t))return C&&w.warn("Event dropped due to being a duplicate of previously captured event."),null}catch{}return t=e}}}),wy=vy;function by(t,e){return e?!!(Sy(t,e)||Cy(t,e)):!1}function Sy(t,e){const n=t.message,s=e.message;return!(!n&&!s||n&&!s||!n&&s||n!==s||!fh(t,e)||!hh(t,e))}function Cy(t,e){const n=Jl(e),s=Jl(t);return!(!n||!s||n.type!==s.type||n.value!==s.value||!fh(t,e)||!hh(t,e))}function hh(t,e){let n=ll(t),s=ll(e);if(!n&&!s)return!0;if(n&&!s||!n&&s||(n=n,s=s,s.length!==n.length))return!1;for(let r=0;r<s.length;r++){const i=s[r],o=n[r];if(i.filename!==o.filename||i.lineno!==o.lineno||i.colno!==o.colno||i.function!==o.function)return!1}return!0}function fh(t,e){let n=t.fingerprint,s=e.fingerprint;if(!n&&!s)return!0;if(n&&!s||!n&&s)return!1;n=n,s=s;try{return n.join("")===s.join("")}catch{return!1}}function Jl(t){return t.exception?.values?.[0]}function ph(t){if(t!==void 0)return t>=400&&t<500?"warning":t>=500?"error":void 0}const Ls=O;function Iy(){return"history"in Ls&&!!Ls.history}function Ty(){if(!("fetch"in Ls))return!1;try{return new Headers,new Request("data:,"),new Response,!0}catch{return!1}}function Lo(t){return t&&/^function\s+\w+\(\)\s+\{\s+\[native code\]\s+\}$/.test(t.toString())}function Ry(){if(typeof EdgeRuntime=="string")return!0;if(!Ty())return!1;if(Lo(Ls.fetch))return!0;let t=!1;const e=Ls.document;if(e&&typeof e.createElement=="function")try{const n=e.createElement("iframe");n.hidden=!0,e.head.appendChild(n),n.contentWindow?.fetch&&(t=Lo(n.contentWindow.fetch)),e.head.removeChild(n)}catch(n){C&&w.warn("Could not create sandbox iframe for pure fetch check, bailing to window.fetch: ",n)}return t}function ky(t,e){const n="fetch";ln(n,t),un(n,()=>Ay(void 0,e))}function Ay(t,e=!1){e&&!Ry()||be(O,"fetch",function(n){return function(...s){const r=new Error,{method:i,url:o}=Ny(s),a={args:s,fetchData:{method:i,url:o},startTimestamp:it()*1e3,virtualError:r,headers:Py(s)};return Fe("fetch",{...a}),n.apply(O,s).then(async c=>(Fe("fetch",{...a,endTimestamp:it()*1e3,response:c}),c),c=>{if(Fe("fetch",{...a,endTimestamp:it()*1e3,error:c}),Sa(c)&&c.stack===void 0&&(c.stack=r.stack,en(c,"framesToPop",1)),c instanceof TypeError&&(c.message==="Failed to fetch"||c.message==="Load failed"||c.message==="NetworkError when attempting to fetch resource."))try{const l=new URL(a.fetchData.url);c.message=`${c.message} (${l.host})`}catch{}throw c})}})}function Oo(t,e){return!!t&&typeof t=="object"&&!!t[e]}function Ql(t){return typeof t=="string"?t:t?Oo(t,"url")?t.url:t.toString?t.toString():"":""}function Ny(t){if(t.length===0)return{method:"GET",url:""};if(t.length===2){const[n,s]=t;return{url:Ql(n),method:Oo(s,"method")?String(s.method).toUpperCase():"GET"}}const e=t[0];return{url:Ql(e),method:Oo(e,"method")?String(e.method).toUpperCase():"GET"}}function Py(t){const[e,n]=t;try{if(typeof n=="object"&&n!==null&&"headers"in n&&n.headers)return new Headers(n.headers);if(Bg(e))return new Headers(e.headers)}catch{}}function Ly(){return"npm"}const q=O;let Do=0;function gh(){return Do>0}function Oy(){Do++,setTimeout(()=>{Do--})}function Nn(t,e={}){function n(r){return typeof r=="function"}if(!n(t))return t;try{const r=t.__sentry_wrapped__;if(r)return typeof r=="function"?r:t;if(Ra(t))return t}catch{return t}const s=function(...r){try{const i=r.map(o=>Nn(o,e));return t.apply(this,i)}catch(i){throw Oy(),om(o=>{o.addEventProcessor(a=>(e.mechanism&&(Io(a,void 0),Rn(a,e.mechanism)),a.extra={...a.extra,arguments:r},a)),E_(i)}),i}};try{for(const r in t)Object.prototype.hasOwnProperty.call(t,r)&&(s[r]=t[r])}catch{}Md(s,t),en(t,"__sentry_wrapped__",s);try{Object.getOwnPropertyDescriptor(s,"name").configurable&&Object.defineProperty(s,"name",{get(){return t.name}})}catch{}return s}function Dy(){const t=Ta(),{referrer:e}=q.document||{},{userAgent:n}=q.navigator||{},s={...e&&{Referer:e},...n&&{"User-Agent":n}};return{url:t,headers:s}}function La(t,e){const n=Oa(t,e),s={type:$y(e),value:By(e)};return n.length&&(s.stacktrace={frames:n}),s.type===void 0&&s.value===""&&(s.value="Unrecoverable error caught"),s}function xy(t,e,n,s){const i=me()?.getOptions().normalizeDepth,o=Gy(e),a={__serialized__:Kd(e,i)};if(o)return{exception:{values:[La(t,o)]},extra:a};const c={exception:{values:[{type:Ei(e)?e.constructor.name:s?"UnhandledRejection":"Error",value:Vy(e,{isUnhandledRejection:s})}]},extra:a};if(n){const l=Oa(t,n);l.length&&(c.exception.values[0].stacktrace={frames:l})}return c}function no(t,e){return{exception:{values:[La(t,e)]}}}function Oa(t,e){const n=e.stacktrace||e.stack||"",s=Fy(e),r=Uy(e);try{return t(n,s,r)}catch{}return[]}const My=/Minified React error #\d+;/i;function Fy(t){return t&&My.test(t.message)?1:0}function Uy(t){return typeof t.framesToPop=="number"?t.framesToPop:0}function mh(t){return typeof WebAssembly<"u"&&typeof WebAssembly.Exception<"u"?t instanceof WebAssembly.Exception:!1}function $y(t){const e=t?.name;return!e&&mh(t)?t.message&&Array.isArray(t.message)&&t.message.length==2?t.message[0]:"WebAssembly.Exception":e}function By(t){const e=t?.message;return mh(t)?Array.isArray(t.message)&&t.message.length==2?t.message[1]:"wasm exception":e?e.error&&typeof e.error.message=="string"?e.error.message:e:"No error message"}function Hy(t,e,n,s){const r=n?.syntheticException||void 0,i=Da(t,e,r,s);return Rn(i),i.level="error",n?.event_id&&(i.event_id=n.event_id),wi(i)}function Wy(t,e,n="info",s,r){const i=s?.syntheticException||void 0,o=xo(t,e,i,r);return o.level=n,s?.event_id&&(o.event_id=s.event_id),wi(o)}function Da(t,e,n,s,r){let i;if(Od(e)&&e.error)return no(t,e.error);if(dl(e)||Mg(e)){const o=e;if("stack"in e)i=no(t,e);else{const a=o.name||(dl(o)?"DOMError":"DOMException"),c=o.message?`${a}: ${o.message}`:a;i=xo(t,c,n,s),Io(i,c)}return"code"in o&&(i.tags={...i.tags,"DOMException.code":`${o.code}`}),i}return Sa(e)?no(t,e):Ns(e)||Ei(e)?(i=xy(t,e,n,r),Rn(i,{synthetic:!0}),i):(i=xo(t,e,n,s),Io(i,`${e}`),Rn(i,{synthetic:!0}),i)}function xo(t,e,n,s){const r={};if(s&&n){const i=Oa(t,n);i.length&&(r.exception={values:[{value:e,stacktrace:{frames:i}}]}),Rn(r,{synthetic:!0})}if(Ca(e)){const{__sentry_template_string__:i,__sentry_template_values__:o}=e;return r.logentry={message:i,params:o},r}return r.message=e,r}function Vy(t,{isUnhandledRejection:e}){const n=jg(t),s=e?"promise rejection":"exception";return Od(t)?`Event \`ErrorEvent\` captured as ${s} with message \`${t.message}\``:Ei(t)?`Event \`${jy(t)}\` (type=${t.type}) captured as ${s}`:`Object captured as ${s} with keys: ${n}`}function jy(t){try{const e=Object.getPrototypeOf(t);return e?e.constructor.name:void 0}catch{}}function Gy(t){for(const e in t)if(Object.prototype.hasOwnProperty.call(t,e)){const n=t[e];if(n instanceof Error)return n}}class zy extends U_{constructor(e){const n=qy(e),s=q.SENTRY_SDK_SOURCE||Ly();Z_(n,"browser",["browser"],s),n._metadata?.sdk&&(n._metadata.sdk.settings={infer_ip:n.sendDefaultPii?"auto":"never",...n._metadata.sdk.settings}),super(n);const{sendDefaultPii:r,sendClientReports:i,enableLogs:o,_experiments:a,enableMetrics:c}=this._options,l=c??a?.enableMetrics??!0;q.document&&(i||o||l)&&q.document.addEventListener("visibilitychange",()=>{q.document.visibilityState==="hidden"&&(i&&this._flushOutcomes(),o&&th(this),l&&sh(this))}),r&&this.on("beforeSendSession",X_)}eventFromException(e,n){return Hy(this._options.stackParser,e,n,this._options.attachStacktrace)}eventFromMessage(e,n="info",s){return Wy(this._options.stackParser,e,n,s,this._options.attachStacktrace)}_prepareEvent(e,n,s,r){return e.platform=e.platform||"javascript",super._prepareEvent(e,n,s,r)}}function qy(t){return{release:typeof __SENTRY_RELEASE__=="string"?__SENTRY_RELEASE__:q.SENTRY_RELEASE?.id,sendClientReports:!0,parentSpanIsAlwaysRootSpan:!0,...t}}const Yy=typeof __SENTRY_DEBUG__>"u"||__SENTRY_DEBUG__,he=O,Ky=1e3;let Xl,Mo,Fo;function Jy(t){ln("dom",t),un("dom",Qy)}function Qy(){if(!he.document)return;const t=Fe.bind(null,"dom"),e=Zl(t,!0);he.document.addEventListener("click",e,!1),he.document.addEventListener("keypress",e,!1),["EventTarget","Node"].forEach(n=>{const r=he[n]?.prototype;r?.hasOwnProperty?.("addEventListener")&&(be(r,"addEventListener",function(i){return function(o,a,c){if(o==="click"||o=="keypress")try{const l=this.__sentry_instrumentation_handlers__=this.__sentry_instrumentation_handlers__||{},u=l[o]=l[o]||{refCount:0};if(!u.handler){const d=Zl(t);u.handler=d,i.call(this,o,d,c)}u.refCount++}catch{}return i.call(this,o,a,c)}}),be(r,"removeEventListener",function(i){return function(o,a,c){if(o==="click"||o=="keypress")try{const l=this.__sentry_instrumentation_handlers__||{},u=l[o];u&&(u.refCount--,u.refCount<=0&&(i.call(this,o,u.handler,c),u.handler=void 0,delete l[o]),Object.keys(l).length===0&&delete this.__sentry_instrumentation_handlers__)}catch{}return i.call(this,o,a,c)}}))})}function Xy(t){if(t.type!==Mo)return!1;try{if(!t.target||t.target._sentryId!==Fo)return!1}catch{}return!0}function Zy(t,e){return t!=="keypress"?!1:e?.tagName?!(e.tagName==="INPUT"||e.tagName==="TEXTAREA"||e.isContentEditable):!0}function Zl(t,e=!1){return n=>{if(!n||n._sentryCaptured)return;const s=eE(n);if(Zy(n.type,s))return;en(n,"_sentryCaptured",!0),s&&!s._sentryId&&en(s,"_sentryId",Te());const r=n.type==="keypress"?"input":n.type;Xy(n)||(t({event:n,name:r,global:e}),Mo=n.type,Fo=s?s._sentryId:void 0),clearTimeout(Xl),Xl=he.setTimeout(()=>{Fo=void 0,Mo=void 0},Ky)}}function eE(t){try{return t.target}catch{return null}}let fr;function _h(t){const e="history";ln(e,t),un(e,tE)}function tE(){if(he.addEventListener("popstate",()=>{const e=he.location.href,n=fr;if(fr=e,n===e)return;Fe("history",{from:n,to:e})}),!Iy())return;function t(e){return function(...n){const s=n.length>2?n[2]:void 0;if(s){const r=fr,i=nE(String(s));if(fr=i,r===i)return e.apply(this,n);Fe("history",{from:r,to:i})}return e.apply(this,n)}}be(he.history,"pushState",t),be(he.history,"replaceState",t)}function nE(t){try{return new URL(t,he.location.origin).toString()}catch{return t}}const Cr={};function sE(t){const e=Cr[t];if(e)return e;let n=he[t];if(Lo(n))return Cr[t]=n.bind(he);const s=he.document;if(s&&typeof s.createElement=="function")try{const r=s.createElement("iframe");r.hidden=!0,s.head.appendChild(r);const i=r.contentWindow;i?.[t]&&(n=i[t]),s.head.removeChild(r)}catch(r){Yy&&w.warn(`Could not create sandbox iframe for ${t} check, bailing to window.${t}: `,r)}return n&&(Cr[t]=n.bind(he))}function rE(t){Cr[t]=void 0}const ps="__sentry_xhr_v3__";function iE(t){ln("xhr",t),un("xhr",oE)}function oE(){if(!he.XMLHttpRequest)return;const t=XMLHttpRequest.prototype;t.open=new Proxy(t.open,{apply(e,n,s){const r=new Error,i=it()*1e3,o=rt(s[0])?s[0].toUpperCase():void 0,a=aE(s[1]);if(!o||!a)return e.apply(n,s);n[ps]={method:o,url:a,request_headers:{}},o==="POST"&&a.match(/sentry_key/)&&(n.__sentry_own_request__=!0);const c=()=>{const l=n[ps];if(l&&n.readyState===4){try{l.status_code=n.status}catch{}const u={endTimestamp:it()*1e3,startTimestamp:i,xhr:n,virtualError:r};Fe("xhr",u)}};return"onreadystatechange"in n&&typeof n.onreadystatechange=="function"?n.onreadystatechange=new Proxy(n.onreadystatechange,{apply(l,u,d){return c(),l.apply(u,d)}}):n.addEventListener("readystatechange",c),n.setRequestHeader=new Proxy(n.setRequestHeader,{apply(l,u,d){const[h,f]=d,p=u[ps];return p&&rt(h)&&rt(f)&&(p.request_headers[h.toLowerCase()]=f),l.apply(u,d)}}),e.apply(n,s)}}),t.send=new Proxy(t.send,{apply(e,n,s){const r=n[ps];if(!r)return e.apply(n,s);s[0]!==void 0&&(r.body=s[0]);const i={startTimestamp:it()*1e3,xhr:n};return Fe("xhr",i),e.apply(n,s)}})}function aE(t){if(rt(t))return t;try{return t.toString()}catch{}}const cE=40;function lE(t,e=sE("fetch")){let n=0,s=0;async function r(i){const o=i.body.length;n+=o,s++;const a={body:i.body,method:"POST",referrerPolicy:"strict-origin",headers:t.headers,keepalive:n<=6e4&&s<15,...t.fetchOptions};try{const c=await e(t.url,a);return{statusCode:c.status,headers:{"x-sentry-rate-limits":c.headers.get("X-Sentry-Rate-Limits"),"retry-after":c.headers.get("Retry-After")}}}catch(c){throw rE("fetch"),c}finally{n-=o,s--}}return Q_(t,r,dh(t.bufferSize||cE))}const uE=30,dE=50;function Uo(t,e,n,s){const r={filename:t,function:e==="<anonymous>"?Zt:e,in_app:!0};return n!==void 0&&(r.lineno=n),s!==void 0&&(r.colno=s),r}const hE=/^\s*at (\S+?)(?::(\d+))(?::(\d+))\s*$/i,fE=/^\s*at (?:(.+?\)(?: \[.+\])?|.*?) ?\((?:address at )?)?(?:async )?((?:<anonymous>|[-a-z]+:|.*bundle|\/)?.*?)(?::(\d+))?(?::(\d+))?\)?\s*$/i,pE=/\((\S*)(?::(\d+))(?::(\d+))\)/,gE=/at (.+?) ?\(data:(.+?),/,mE=t=>{const e=t.match(gE);if(e)return{filename:`<data:${e[2]}>`,function:e[1]};const n=hE.exec(t);if(n){const[,r,i,o]=n;return Uo(r,Zt,+i,+o)}const s=fE.exec(t);if(s){if(s[2]&&s[2].indexOf("eval")===0){const a=pE.exec(s[2]);a&&(s[2]=a[1],s[3]=a[2],s[4]=a[3])}const[i,o]=yh(s[1]||Zt,s[2]);return Uo(o,i,s[3]?+s[3]:void 0,s[4]?+s[4]:void 0)}},_E=[uE,mE],yE=/^\s*(.*?)(?:\((.*?)\))?(?:^|@)?((?:[-a-z]+)?:\/.*?|\[native code\]|[^@]*(?:bundle|\d+\.js)|\/[\w\-. /=]+)(?::(\d+))?(?::(\d+))?\s*$/i,EE=/(\S+) line (\d+)(?: > eval line \d+)* > eval/i,vE=t=>{const e=yE.exec(t);if(e){if(e[3]&&e[3].indexOf(" > eval")>-1){const i=EE.exec(e[3]);i&&(e[1]=e[1]||"eval",e[3]=i[1],e[4]=i[2],e[5]="")}let s=e[3],r=e[1]||Zt;return[r,s]=yh(r,s),Uo(s,r,e[4]?+e[4]:void 0,e[5]?+e[5]:void 0)}},wE=[dE,vE],bE=[_E,wE],SE=Nd(...bE),yh=(t,e)=>{const n=t.indexOf("safari-extension")!==-1,s=t.indexOf("safari-web-extension")!==-1;return n||s?[t.indexOf("@")!==-1?t.split("@")[0]:Zt,n?`safari-extension:${e}`:`safari-web-extension:${e}`]:[t,e]},bi=typeof __SENTRY_DEBUG__>"u"||__SENTRY_DEBUG__,pr=1024,CE="Breadcrumbs",IE=((t={})=>{const e={console:!0,dom:!0,fetch:!0,history:!0,sentry:!0,xhr:!0,...t};return{name:CE,setup(n){e.console&&my(AE(n)),e.dom&&Jy(kE(n,e.dom)),e.xhr&&iE(NE(n)),e.fetch&&ky(PE(n)),e.history&&_h(LE(n)),e.sentry&&n.on("beforeSendEvent",RE(n))}}}),TE=IE;function RE(t){return function(n){me()===t&&tn({category:`sentry.${n.type==="transaction"?"transaction":"event"}`,event_id:n.event_id,level:n.level,message:zt(n)},{event:n})}}function kE(t,e){return function(s){if(me()!==t)return;let r,i,o=typeof e=="object"?e.serializeAttribute:void 0,a=typeof e=="object"&&typeof e.maxStringLength=="number"?e.maxStringLength:void 0;a&&a>pr&&(bi&&w.warn(`\`dom.maxStringLength\` cannot exceed ${pr}, but a value of ${a} was configured. Sentry will use ${pr} instead.`),a=pr),typeof o=="string"&&(o=[o]);try{const l=s.event,u=OE(l)?l.target:l;r=xd(u,{keyAttrs:o,maxStringLength:a}),i=Vg(u)}catch{r="<unknown>"}if(r.length===0)return;const c={category:`ui.${s.name}`,message:r};i&&(c.data={"ui.component_name":i}),tn(c,{event:s.event,name:s.name,global:s.global})}}function AE(t){return function(n){if(me()!==t)return;const s={category:"console",data:{arguments:n.args,logger:"console"},level:yy(n.level),message:pl(n.args," ")};if(n.level==="assert")if(n.args[0]===!1)s.message=`Assertion failed: ${pl(n.args.slice(1)," ")||"console.assert"}`,s.data.arguments=n.args.slice(1);else return;tn(s,{input:n.args,level:n.level})}}function NE(t){return function(n){if(me()!==t)return;const{startTimestamp:s,endTimestamp:r}=n,i=n.xhr[ps];if(!s||!r||!i)return;const{method:o,url:a,status_code:c,body:l}=i,u={method:o,url:a,status_code:c},d={xhr:n.xhr,input:l,startTimestamp:s,endTimestamp:r},h={category:"xhr",data:u,type:"http",level:ph(c)};t.emit("beforeOutgoingRequestBreadcrumb",h,d),tn(h,d)}}function PE(t){return function(n){if(me()!==t)return;const{startTimestamp:s,endTimestamp:r}=n;if(r&&!(n.fetchData.url.match(/sentry_key/)&&n.fetchData.method==="POST"))if(n.fetchData.method,n.fetchData.url,n.error){const i=n.fetchData,o={data:n.error,input:n.args,startTimestamp:s,endTimestamp:r},a={category:"fetch",data:i,level:"error",type:"http"};t.emit("beforeOutgoingRequestBreadcrumb",a,o),tn(a,o)}else{const i=n.response,o={...n.fetchData,status_code:i?.status};n.fetchData.request_body_size,n.fetchData.response_body_size,i?.status;const a={input:n.args,response:i,startTimestamp:s,endTimestamp:r},c={category:"fetch",data:o,type:"http",level:ph(o.status_code)};t.emit("beforeOutgoingRequestBreadcrumb",c,a),tn(c,a)}}}function LE(t){return function(n){if(me()!==t)return;let s=n.from,r=n.to;const i=to(q.location.href);let o=s?to(s):void 0;const a=to(r);o?.path||(o=i),i.protocol===a.protocol&&i.host===a.host&&(r=a.relative),i.protocol===o.protocol&&i.host===o.host&&(s=o.relative),tn({category:"navigation",data:{from:s,to:r}})}}function OE(t){return!!t&&!!t.target}const DE=["EventTarget","Window","Node","ApplicationCache","AudioTrackList","BroadcastChannel","ChannelMergerNode","CryptoOperation","EventSource","FileReader","HTMLUnknownElement","IDBDatabase","IDBRequest","IDBTransaction","KeyOperation","MediaController","MessagePort","ModalWindow","Notification","SVGElementInstance","Screen","SharedWorker","TextTrack","TextTrackCue","TextTrackList","WebSocket","WebSocketWorker","Worker","XMLHttpRequest","XMLHttpRequestEventTarget","XMLHttpRequestUpload"],xE="BrowserApiErrors",ME=((t={})=>{const e={XMLHttpRequest:!0,eventTarget:!0,requestAnimationFrame:!0,setInterval:!0,setTimeout:!0,unregisterOriginalCallbacks:!1,...t};return{name:xE,setupOnce(){e.setTimeout&&be(q,"setTimeout",eu),e.setInterval&&be(q,"setInterval",eu),e.requestAnimationFrame&&be(q,"requestAnimationFrame",UE),e.XMLHttpRequest&&"XMLHttpRequest"in q&&be(XMLHttpRequest.prototype,"send",$E);const n=e.eventTarget;n&&(Array.isArray(n)?n:DE).forEach(r=>BE(r,e))}}}),FE=ME;function eu(t){return function(...e){const n=e[0];return e[0]=Nn(n,{mechanism:{handled:!1,type:`auto.browser.browserapierrors.${Pt(t)}`}}),t.apply(this,e)}}function UE(t){return function(e){return t.apply(this,[Nn(e,{mechanism:{data:{handler:Pt(t)},handled:!1,type:"auto.browser.browserapierrors.requestAnimationFrame"}})])}}function $E(t){return function(...e){const n=this;return["onload","onerror","onprogress","onreadystatechange"].forEach(r=>{r in n&&typeof n[r]=="function"&&be(n,r,function(i){const o={mechanism:{data:{handler:Pt(i)},handled:!1,type:`auto.browser.browserapierrors.xhr.${r}`}},a=Ra(i);return a&&(o.mechanism.data.handler=Pt(a)),Nn(i,o)})}),t.apply(this,e)}}function BE(t,e){const s=q[t]?.prototype;s?.hasOwnProperty?.("addEventListener")&&(be(s,"addEventListener",function(r){return function(i,o,a){try{HE(o)&&(o.handleEvent=Nn(o.handleEvent,{mechanism:{data:{handler:Pt(o),target:t},handled:!1,type:"auto.browser.browserapierrors.handleEvent"}}))}catch{}return e.unregisterOriginalCallbacks&&WE(this,i,o),r.apply(this,[i,Nn(o,{mechanism:{data:{handler:Pt(o),target:t},handled:!1,type:"auto.browser.browserapierrors.addEventListener"}}),a])}}),be(s,"removeEventListener",function(r){return function(i,o,a){try{const c=o.__sentry_wrapped__;c&&r.call(this,i,c,a)}catch{}return r.call(this,i,o,a)}}))}function HE(t){return typeof t.handleEvent=="function"}function WE(t,e,n){t&&typeof t=="object"&&"removeEventListener"in t&&typeof t.removeEventListener=="function"&&t.removeEventListener(e,n)}const VE=()=>({name:"BrowserSession",setupOnce(){if(typeof q.document>"u"){bi&&w.warn("Using the `browserSessionIntegration` in non-browser environments is not supported.");return}xl({ignoreDuration:!0}),Ml(),_h(({from:t,to:e})=>{t!==void 0&&t!==e&&(xl({ignoreDuration:!0}),Ml())})}}),jE="GlobalHandlers",GE=((t={})=>{const e={onerror:!0,onunhandledrejection:!0,...t};return{name:jE,setupOnce(){Error.stackTraceLimit=50},setup(n){e.onerror&&(qE(n),tu("onerror")),e.onunhandledrejection&&(YE(n),tu("onunhandledrejection"))}}}),zE=GE;function qE(t){Lg(e=>{const{stackParser:n,attachStacktrace:s}=Eh();if(me()!==t||gh())return;const{msg:r,url:i,line:o,column:a,error:c}=e,l=QE(Da(n,c||r,void 0,s,!1),i,o,a);l.level="error",Qd(l,{originalException:c,mechanism:{handled:!1,type:"auto.browser.global_handlers.onerror"}})})}function YE(t){Dg(e=>{const{stackParser:n,attachStacktrace:s}=Eh();if(me()!==t||gh())return;const r=KE(e),i=yi(r)?JE(r):Da(n,r,void 0,s,!0);i.level="error",Qd(i,{originalException:r,mechanism:{handled:!1,type:"auto.browser.global_handlers.onunhandledrejection"}})})}function KE(t){if(yi(t))return t;try{if("reason"in t)return t.reason;if("detail"in t&&"reason"in t.detail)return t.detail.reason}catch{}return t}function JE(t){return{exception:{values:[{type:"UnhandledRejection",value:`Non-Error promise rejection captured with value: ${String(t)}`}]}}}function QE(t,e,n,s){const r=t.exception=t.exception||{},i=r.values=r.values||[],o=i[0]=i[0]||{},a=o.stacktrace=o.stacktrace||{},c=a.frames=a.frames||[],l=s,u=n,d=XE(e)??Ta();return c.length===0&&c.push({colno:l,filename:d,function:Zt,in_app:!0,lineno:u}),t}function tu(t){bi&&w.log(`Global Handler attached: ${t}`)}function Eh(){return me()?.getOptions()||{stackParser:()=>[],attachStacktrace:!1}}function XE(t){if(!(!rt(t)||t.length===0)){if(t.startsWith("data:")){const e=t.match(/^data:([^;]+)/),n=e?e[1]:"text/javascript",s=t.includes("base64,");return`<data:${n}${s?",base64":""}>`}return t}}const ZE=()=>({name:"HttpContext",preprocessEvent(t){if(!q.navigator&&!q.location&&!q.document)return;const e=Dy(),n={...e.headers,...t.request?.headers};t.request={...e,...t.request,headers:n}}}),ev="cause",tv=5,nv="LinkedErrors",sv=((t={})=>{const e=t.limit||tv,n=t.key||ev;return{name:nv,preprocessEvent(s,r,i){const o=i.getOptions();gy(La,o.stackParser,n,e,s,r)}}}),rv=sv;function iv(){return ov()?(bi&&jn(()=>{console.error("[Sentry] You cannot use Sentry.init() in a browser extension, see: https://docs.sentry.io/platforms/javascript/best-practices/browser-extensions/")}),!0):!1}function ov(){if(typeof q.window>"u")return!1;const t=q;if(t.nw||!(t.chrome||t.browser)?.runtime?.id)return!1;const n=Ta(),s=["chrome-extension","moz-extension","ms-browser-extension","safari-web-extension"];return!(q===q.top&&s.some(i=>n.startsWith(`${i}://`)))}function av(t){return[ay(),sy(),FE(),TE(),zE(),rv(),wy(),ZE(),VE()]}function cv(t={}){const e=!t.skipBrowserExtensionCheck&&iv();let n=t.defaultIntegrations==null?av():t.defaultIntegrations;const s={...t,enabled:e?!1:t.enabled,stackParser:Ng(t.stackParser||SE),integrations:T_({integrations:t.integrations,defaultIntegrations:n}),transport:t.transport||lE};return V_(zy,s)}const lv="https://adc1b5518c6a55273a1398d1b8b9cd3e@o4510415124496384.ingest.de.sentry.io/4510415129083984";cv({dsn:lv,sendDefaultPii:!0});/**
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
 */const uv=()=>{};var nu={};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const vh={NODE_ADMIN:!1,SDK_VERSION:"${JSCORE_VERSION}"};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const g=function(t,e){if(!t)throw qn(e)},qn=function(t){return new Error("Firebase Database ("+vh.SDK_VERSION+") INTERNAL ASSERT FAILED: "+t)};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const wh=function(t){const e=[];let n=0;for(let s=0;s<t.length;s++){let r=t.charCodeAt(s);r<128?e[n++]=r:r<2048?(e[n++]=r>>6|192,e[n++]=r&63|128):(r&64512)===55296&&s+1<t.length&&(t.charCodeAt(s+1)&64512)===56320?(r=65536+((r&1023)<<10)+(t.charCodeAt(++s)&1023),e[n++]=r>>18|240,e[n++]=r>>12&63|128,e[n++]=r>>6&63|128,e[n++]=r&63|128):(e[n++]=r>>12|224,e[n++]=r>>6&63|128,e[n++]=r&63|128)}return e},dv=function(t){const e=[];let n=0,s=0;for(;n<t.length;){const r=t[n++];if(r<128)e[s++]=String.fromCharCode(r);else if(r>191&&r<224){const i=t[n++];e[s++]=String.fromCharCode((r&31)<<6|i&63)}else if(r>239&&r<365){const i=t[n++],o=t[n++],a=t[n++],c=((r&7)<<18|(i&63)<<12|(o&63)<<6|a&63)-65536;e[s++]=String.fromCharCode(55296+(c>>10)),e[s++]=String.fromCharCode(56320+(c&1023))}else{const i=t[n++],o=t[n++];e[s++]=String.fromCharCode((r&15)<<12|(i&63)<<6|o&63)}}return e.join("")},xa={byteToCharMap_:null,charToByteMap_:null,byteToCharMapWebSafe_:null,charToByteMapWebSafe_:null,ENCODED_VALS_BASE:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",get ENCODED_VALS(){return this.ENCODED_VALS_BASE+"+/="},get ENCODED_VALS_WEBSAFE(){return this.ENCODED_VALS_BASE+"-_."},HAS_NATIVE_SUPPORT:typeof atob=="function",encodeByteArray(t,e){if(!Array.isArray(t))throw Error("encodeByteArray takes an array as a parameter");this.init_();const n=e?this.byteToCharMapWebSafe_:this.byteToCharMap_,s=[];for(let r=0;r<t.length;r+=3){const i=t[r],o=r+1<t.length,a=o?t[r+1]:0,c=r+2<t.length,l=c?t[r+2]:0,u=i>>2,d=(i&3)<<4|a>>4;let h=(a&15)<<2|l>>6,f=l&63;c||(f=64,o||(h=64)),s.push(n[u],n[d],n[h],n[f])}return s.join("")},encodeString(t,e){return this.HAS_NATIVE_SUPPORT&&!e?btoa(t):this.encodeByteArray(wh(t),e)},decodeString(t,e){return this.HAS_NATIVE_SUPPORT&&!e?atob(t):dv(this.decodeStringToByteArray(t,e))},decodeStringToByteArray(t,e){this.init_();const n=e?this.charToByteMapWebSafe_:this.charToByteMap_,s=[];for(let r=0;r<t.length;){const i=n[t.charAt(r++)],a=r<t.length?n[t.charAt(r)]:0;++r;const l=r<t.length?n[t.charAt(r)]:64;++r;const d=r<t.length?n[t.charAt(r)]:64;if(++r,i==null||a==null||l==null||d==null)throw new hv;const h=i<<2|a>>4;if(s.push(h),l!==64){const f=a<<4&240|l>>2;if(s.push(f),d!==64){const p=l<<6&192|d;s.push(p)}}}return s},init_(){if(!this.byteToCharMap_){this.byteToCharMap_={},this.charToByteMap_={},this.byteToCharMapWebSafe_={},this.charToByteMapWebSafe_={};for(let t=0;t<this.ENCODED_VALS.length;t++)this.byteToCharMap_[t]=this.ENCODED_VALS.charAt(t),this.charToByteMap_[this.byteToCharMap_[t]]=t,this.byteToCharMapWebSafe_[t]=this.ENCODED_VALS_WEBSAFE.charAt(t),this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[t]]=t,t>=this.ENCODED_VALS_BASE.length&&(this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(t)]=t,this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(t)]=t)}}};class hv extends Error{constructor(){super(...arguments),this.name="DecodeBase64StringError"}}const bh=function(t){const e=wh(t);return xa.encodeByteArray(e,!0)},$r=function(t){return bh(t).replace(/\./g,"")},Br=function(t){try{return xa.decodeString(t,!0)}catch(e){console.error("base64Decode failed: ",e)}return null};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function fv(t){return Sh(void 0,t)}function Sh(t,e){if(!(e instanceof Object))return e;switch(e.constructor){case Date:const n=e;return new Date(n.getTime());case Object:t===void 0&&(t={});break;case Array:t=[];break;default:return e}for(const n in e)!e.hasOwnProperty(n)||!pv(n)||(t[n]=Sh(t[n],e[n]));return t}function pv(t){return t!=="__proto__"}/**
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
 */function gv(){if(typeof self<"u")return self;if(typeof window<"u")return window;if(typeof global<"u")return global;throw new Error("Unable to locate global object.")}/**
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
 */const mv=()=>gv().__FIREBASE_DEFAULTS__,_v=()=>{if(typeof process>"u"||typeof nu>"u")return;const t=nu.__FIREBASE_DEFAULTS__;if(t)return JSON.parse(t)},yv=()=>{if(typeof document>"u")return;let t;try{t=document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/)}catch{return}const e=t&&Br(t[1]);return e&&JSON.parse(e)},Ma=()=>{try{return uv()||mv()||_v()||yv()}catch(t){console.info(`Unable to get __FIREBASE_DEFAULTS__ due to: ${t}`);return}},Ch=t=>Ma()?.emulatorHosts?.[t],Ev=t=>{const e=Ch(t);if(!e)return;const n=e.lastIndexOf(":");if(n<=0||n+1===e.length)throw new Error(`Invalid host ${e} with no separate hostname and port!`);const s=parseInt(e.substring(n+1),10);return e[0]==="["?[e.substring(1,n-1),s]:[e.substring(0,n),s]},Ih=()=>Ma()?.config,Th=t=>Ma()?.[`_${t}`];/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Qs{constructor(){this.reject=()=>{},this.resolve=()=>{},this.promise=new Promise((e,n)=>{this.resolve=e,this.reject=n})}wrapCallback(e){return(n,s)=>{n?this.reject(n):this.resolve(s),typeof e=="function"&&(this.promise.catch(()=>{}),e.length===1?e(n):e(n,s))}}}/**
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
 */function Yn(t){try{return(t.startsWith("http://")||t.startsWith("https://")?new URL(t).hostname:t).endsWith(".cloudworkstations.dev")}catch{return!1}}async function Rh(t){return(await fetch(t,{credentials:"include"})).ok}/**
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
 */function vv(t,e){if(t.uid)throw new Error('The "uid" field is no longer supported by mockUserToken. Please use "sub" instead for Firebase Auth User ID.');const n={alg:"none",type:"JWT"},s=e||"demo-project",r=t.iat||0,i=t.sub||t.user_id;if(!i)throw new Error("mockUserToken must contain 'sub' or 'user_id' field!");const o={iss:`https://securetoken.google.com/${s}`,aud:s,iat:r,exp:r+3600,auth_time:r,sub:i,user_id:i,firebase:{sign_in_provider:"custom",identities:{}},...t};return[$r(JSON.stringify(n)),$r(JSON.stringify(o)),""].join(".")}const _s={};function wv(){const t={prod:[],emulator:[]};for(const e of Object.keys(_s))_s[e]?t.emulator.push(e):t.prod.push(e);return t}function bv(t){let e=document.getElementById(t),n=!1;return e||(e=document.createElement("div"),e.setAttribute("id",t),n=!0),{created:n,element:e}}let su=!1;function kh(t,e){if(typeof window>"u"||typeof document>"u"||!Yn(window.location.host)||_s[t]===e||_s[t]||su)return;_s[t]=e;function n(h){return`__firebase__banner__${h}`}const s="__firebase__banner",i=wv().prod.length>0;function o(){const h=document.getElementById(s);h&&h.remove()}function a(h){h.style.display="flex",h.style.background="#7faaf0",h.style.position="fixed",h.style.bottom="5px",h.style.left="5px",h.style.padding=".5em",h.style.borderRadius="5px",h.style.alignItems="center"}function c(h,f){h.setAttribute("width","24"),h.setAttribute("id",f),h.setAttribute("height","24"),h.setAttribute("viewBox","0 0 24 24"),h.setAttribute("fill","none"),h.style.marginLeft="-6px"}function l(){const h=document.createElement("span");return h.style.cursor="pointer",h.style.marginLeft="16px",h.style.fontSize="24px",h.innerHTML=" &times;",h.onclick=()=>{su=!0,o()},h}function u(h,f){h.setAttribute("id",f),h.innerText="Learn more",h.href="https://firebase.google.com/docs/studio/preview-apps#preview-backend",h.setAttribute("target","__blank"),h.style.paddingLeft="5px",h.style.textDecoration="underline"}function d(){const h=bv(s),f=n("text"),p=document.getElementById(f)||document.createElement("span"),y=n("learnmore"),m=document.getElementById(y)||document.createElement("a"),A=n("preprendIcon"),N=document.getElementById(A)||document.createElementNS("http://www.w3.org/2000/svg","svg");if(h.created){const ae=h.element;a(ae),u(m,y);const S=l();c(N,A),ae.append(N,p,m,S),document.body.appendChild(ae)}i?(p.innerText="Preview backend disconnected.",N.innerHTML=`<g clip-path="url(#clip0_6013_33858)">
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
 */function ge(){return typeof navigator<"u"&&typeof navigator.userAgent=="string"?navigator.userAgent:""}function Fa(){return typeof window<"u"&&!!(window.cordova||window.phonegap||window.PhoneGap)&&/ios|iphone|ipod|ipad|android|blackberry|iemobile/i.test(ge())}function Sv(){return typeof navigator<"u"&&navigator.userAgent==="Cloudflare-Workers"}function Cv(){const t=typeof chrome=="object"?chrome.runtime:typeof browser=="object"?browser.runtime:void 0;return typeof t=="object"&&t.id!==void 0}function Ah(){return typeof navigator=="object"&&navigator.product==="ReactNative"}function Iv(){const t=ge();return t.indexOf("MSIE ")>=0||t.indexOf("Trident/")>=0}function Tv(){return vh.NODE_ADMIN===!0}function Rv(){try{return typeof indexedDB=="object"}catch{return!1}}function kv(){return new Promise((t,e)=>{try{let n=!0;const s="validate-browser-context-for-indexeddb-analytics-module",r=self.indexedDB.open(s);r.onsuccess=()=>{r.result.close(),n||self.indexedDB.deleteDatabase(s),t(!0)},r.onupgradeneeded=()=>{n=!1},r.onerror=()=>{e(r.error?.message||"")}}catch(n){e(n)}})}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Av="FirebaseError";class Ft extends Error{constructor(e,n,s){super(n),this.code=e,this.customData=s,this.name=Av,Object.setPrototypeOf(this,Ft.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,Xs.prototype.create)}}class Xs{constructor(e,n,s){this.service=e,this.serviceName=n,this.errors=s}create(e,...n){const s=n[0]||{},r=`${this.service}/${e}`,i=this.errors[e],o=i?Nv(i,s):"Error",a=`${this.serviceName}: ${o} (${r}).`;return new Ft(r,a,s)}}function Nv(t,e){return t.replace(Pv,(n,s)=>{const r=e[s];return r!=null?String(r):`<${s}?>`})}const Pv=/\{\$([^}]+)}/g;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Os(t){return JSON.parse(t)}function Q(t){return JSON.stringify(t)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Nh=function(t){let e={},n={},s={},r="";try{const i=t.split(".");e=Os(Br(i[0])||""),n=Os(Br(i[1])||""),r=i[2],s=n.d||{},delete n.d}catch{}return{header:e,claims:n,data:s,signature:r}},Lv=function(t){const e=Nh(t),n=e.claims;return!!n&&typeof n=="object"&&n.hasOwnProperty("iat")},Ov=function(t){const e=Nh(t).claims;return typeof e=="object"&&e.admin===!0};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Je(t,e){return Object.prototype.hasOwnProperty.call(t,e)}function Pn(t,e){if(Object.prototype.hasOwnProperty.call(t,e))return t[e]}function $o(t){for(const e in t)if(Object.prototype.hasOwnProperty.call(t,e))return!1;return!0}function Hr(t,e,n){const s={};for(const r in t)Object.prototype.hasOwnProperty.call(t,r)&&(s[r]=e.call(n,t[r],r,t));return s}function nn(t,e){if(t===e)return!0;const n=Object.keys(t),s=Object.keys(e);for(const r of n){if(!s.includes(r))return!1;const i=t[r],o=e[r];if(ru(i)&&ru(o)){if(!nn(i,o))return!1}else if(i!==o)return!1}for(const r of s)if(!n.includes(r))return!1;return!0}function ru(t){return t!==null&&typeof t=="object"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Kn(t){const e=[];for(const[n,s]of Object.entries(t))Array.isArray(s)?s.forEach(r=>{e.push(encodeURIComponent(n)+"="+encodeURIComponent(r))}):e.push(encodeURIComponent(n)+"="+encodeURIComponent(s));return e.length?"&"+e.join("&"):""}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Dv{constructor(){this.chain_=[],this.buf_=[],this.W_=[],this.pad_=[],this.inbuf_=0,this.total_=0,this.blockSize=512/8,this.pad_[0]=128;for(let e=1;e<this.blockSize;++e)this.pad_[e]=0;this.reset()}reset(){this.chain_[0]=1732584193,this.chain_[1]=4023233417,this.chain_[2]=2562383102,this.chain_[3]=271733878,this.chain_[4]=3285377520,this.inbuf_=0,this.total_=0}compress_(e,n){n||(n=0);const s=this.W_;if(typeof e=="string")for(let d=0;d<16;d++)s[d]=e.charCodeAt(n)<<24|e.charCodeAt(n+1)<<16|e.charCodeAt(n+2)<<8|e.charCodeAt(n+3),n+=4;else for(let d=0;d<16;d++)s[d]=e[n]<<24|e[n+1]<<16|e[n+2]<<8|e[n+3],n+=4;for(let d=16;d<80;d++){const h=s[d-3]^s[d-8]^s[d-14]^s[d-16];s[d]=(h<<1|h>>>31)&4294967295}let r=this.chain_[0],i=this.chain_[1],o=this.chain_[2],a=this.chain_[3],c=this.chain_[4],l,u;for(let d=0;d<80;d++){d<40?d<20?(l=a^i&(o^a),u=1518500249):(l=i^o^a,u=1859775393):d<60?(l=i&o|a&(i|o),u=2400959708):(l=i^o^a,u=3395469782);const h=(r<<5|r>>>27)+l+c+u+s[d]&4294967295;c=a,a=o,o=(i<<30|i>>>2)&4294967295,i=r,r=h}this.chain_[0]=this.chain_[0]+r&4294967295,this.chain_[1]=this.chain_[1]+i&4294967295,this.chain_[2]=this.chain_[2]+o&4294967295,this.chain_[3]=this.chain_[3]+a&4294967295,this.chain_[4]=this.chain_[4]+c&4294967295}update(e,n){if(e==null)return;n===void 0&&(n=e.length);const s=n-this.blockSize;let r=0;const i=this.buf_;let o=this.inbuf_;for(;r<n;){if(o===0)for(;r<=s;)this.compress_(e,r),r+=this.blockSize;if(typeof e=="string"){for(;r<n;)if(i[o]=e.charCodeAt(r),++o,++r,o===this.blockSize){this.compress_(i),o=0;break}}else for(;r<n;)if(i[o]=e[r],++o,++r,o===this.blockSize){this.compress_(i),o=0;break}}this.inbuf_=o,this.total_+=n}digest(){const e=[];let n=this.total_*8;this.inbuf_<56?this.update(this.pad_,56-this.inbuf_):this.update(this.pad_,this.blockSize-(this.inbuf_-56));for(let r=this.blockSize-1;r>=56;r--)this.buf_[r]=n&255,n/=256;this.compress_(this.buf_);let s=0;for(let r=0;r<5;r++)for(let i=24;i>=0;i-=8)e[s]=this.chain_[r]>>i&255,++s;return e}}function xv(t,e){const n=new Mv(t,e);return n.subscribe.bind(n)}class Mv{constructor(e,n){this.observers=[],this.unsubscribes=[],this.observerCount=0,this.task=Promise.resolve(),this.finalized=!1,this.onNoObservers=n,this.task.then(()=>{e(this)}).catch(s=>{this.error(s)})}next(e){this.forEachObserver(n=>{n.next(e)})}error(e){this.forEachObserver(n=>{n.error(e)}),this.close(e)}complete(){this.forEachObserver(e=>{e.complete()}),this.close()}subscribe(e,n,s){let r;if(e===void 0&&n===void 0&&s===void 0)throw new Error("Missing Observer.");Fv(e,["next","error","complete"])?r=e:r={next:e,error:n,complete:s},r.next===void 0&&(r.next=so),r.error===void 0&&(r.error=so),r.complete===void 0&&(r.complete=so);const i=this.unsubscribeOne.bind(this,this.observers.length);return this.finalized&&this.task.then(()=>{try{this.finalError?r.error(this.finalError):r.complete()}catch{}}),this.observers.push(r),i}unsubscribeOne(e){this.observers===void 0||this.observers[e]===void 0||(delete this.observers[e],this.observerCount-=1,this.observerCount===0&&this.onNoObservers!==void 0&&this.onNoObservers(this))}forEachObserver(e){if(!this.finalized)for(let n=0;n<this.observers.length;n++)this.sendOne(n,e)}sendOne(e,n){this.task.then(()=>{if(this.observers!==void 0&&this.observers[e]!==void 0)try{n(this.observers[e])}catch(s){typeof console<"u"&&console.error&&console.error(s)}})}close(e){this.finalized||(this.finalized=!0,e!==void 0&&(this.finalError=e),this.task.then(()=>{this.observers=void 0,this.onNoObservers=void 0}))}}function Fv(t,e){if(typeof t!="object"||t===null)return!1;for(const n of e)if(n in t&&typeof t[n]=="function")return!0;return!1}function so(){}function Si(t,e){return`${t} failed: ${e} argument `}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Uv=function(t){const e=[];let n=0;for(let s=0;s<t.length;s++){let r=t.charCodeAt(s);if(r>=55296&&r<=56319){const i=r-55296;s++,g(s<t.length,"Surrogate pair missing trail surrogate.");const o=t.charCodeAt(s)-56320;r=65536+(i<<10)+o}r<128?e[n++]=r:r<2048?(e[n++]=r>>6|192,e[n++]=r&63|128):r<65536?(e[n++]=r>>12|224,e[n++]=r>>6&63|128,e[n++]=r&63|128):(e[n++]=r>>18|240,e[n++]=r>>12&63|128,e[n++]=r>>6&63|128,e[n++]=r&63|128)}return e},Ci=function(t){let e=0;for(let n=0;n<t.length;n++){const s=t.charCodeAt(n);s<128?e++:s<2048?e+=2:s>=55296&&s<=56319?(e+=4,n++):e+=3}return e};/**
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
 */function ue(t){return t&&t._delegate?t._delegate:t}class sn{constructor(e,n,s){this.name=e,this.instanceFactory=n,this.type=s,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}setInstantiationMode(e){return this.instantiationMode=e,this}setMultipleInstances(e){return this.multipleInstances=e,this}setServiceProps(e){return this.serviceProps=e,this}setInstanceCreatedCallback(e){return this.onInstanceCreated=e,this}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Vt="[DEFAULT]";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class $v{constructor(e,n){this.name=e,this.container=n,this.component=null,this.instances=new Map,this.instancesDeferred=new Map,this.instancesOptions=new Map,this.onInitCallbacks=new Map}get(e){const n=this.normalizeInstanceIdentifier(e);if(!this.instancesDeferred.has(n)){const s=new Qs;if(this.instancesDeferred.set(n,s),this.isInitialized(n)||this.shouldAutoInitialize())try{const r=this.getOrInitializeService({instanceIdentifier:n});r&&s.resolve(r)}catch{}}return this.instancesDeferred.get(n).promise}getImmediate(e){const n=this.normalizeInstanceIdentifier(e?.identifier),s=e?.optional??!1;if(this.isInitialized(n)||this.shouldAutoInitialize())try{return this.getOrInitializeService({instanceIdentifier:n})}catch(r){if(s)return null;throw r}else{if(s)return null;throw Error(`Service ${this.name} is not available`)}}getComponent(){return this.component}setComponent(e){if(e.name!==this.name)throw Error(`Mismatching Component ${e.name} for Provider ${this.name}.`);if(this.component)throw Error(`Component for ${this.name} has already been provided`);if(this.component=e,!!this.shouldAutoInitialize()){if(Hv(e))try{this.getOrInitializeService({instanceIdentifier:Vt})}catch{}for(const[n,s]of this.instancesDeferred.entries()){const r=this.normalizeInstanceIdentifier(n);try{const i=this.getOrInitializeService({instanceIdentifier:r});s.resolve(i)}catch{}}}}clearInstance(e=Vt){this.instancesDeferred.delete(e),this.instancesOptions.delete(e),this.instances.delete(e)}async delete(){const e=Array.from(this.instances.values());await Promise.all([...e.filter(n=>"INTERNAL"in n).map(n=>n.INTERNAL.delete()),...e.filter(n=>"_delete"in n).map(n=>n._delete())])}isComponentSet(){return this.component!=null}isInitialized(e=Vt){return this.instances.has(e)}getOptions(e=Vt){return this.instancesOptions.get(e)||{}}initialize(e={}){const{options:n={}}=e,s=this.normalizeInstanceIdentifier(e.instanceIdentifier);if(this.isInitialized(s))throw Error(`${this.name}(${s}) has already been initialized`);if(!this.isComponentSet())throw Error(`Component ${this.name} has not been registered yet`);const r=this.getOrInitializeService({instanceIdentifier:s,options:n});for(const[i,o]of this.instancesDeferred.entries()){const a=this.normalizeInstanceIdentifier(i);s===a&&o.resolve(r)}return r}onInit(e,n){const s=this.normalizeInstanceIdentifier(n),r=this.onInitCallbacks.get(s)??new Set;r.add(e),this.onInitCallbacks.set(s,r);const i=this.instances.get(s);return i&&e(i,s),()=>{r.delete(e)}}invokeOnInitCallbacks(e,n){const s=this.onInitCallbacks.get(n);if(s)for(const r of s)try{r(e,n)}catch{}}getOrInitializeService({instanceIdentifier:e,options:n={}}){let s=this.instances.get(e);if(!s&&this.component&&(s=this.component.instanceFactory(this.container,{instanceIdentifier:Bv(e),options:n}),this.instances.set(e,s),this.instancesOptions.set(e,n),this.invokeOnInitCallbacks(s,e),this.component.onInstanceCreated))try{this.component.onInstanceCreated(this.container,e,s)}catch{}return s||null}normalizeInstanceIdentifier(e=Vt){return this.component?this.component.multipleInstances?e:Vt:e}shouldAutoInitialize(){return!!this.component&&this.component.instantiationMode!=="EXPLICIT"}}function Bv(t){return t===Vt?void 0:t}function Hv(t){return t.instantiationMode==="EAGER"}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Wv{constructor(e){this.name=e,this.providers=new Map}addComponent(e){const n=this.getProvider(e.name);if(n.isComponentSet())throw new Error(`Component ${e.name} has already been registered with ${this.name}`);n.setComponent(e)}addOrOverwriteComponent(e){this.getProvider(e.name).isComponentSet()&&this.providers.delete(e.name),this.addComponent(e)}getProvider(e){if(this.providers.has(e))return this.providers.get(e);const n=new $v(e,this);return this.providers.set(e,n),n}getProviders(){return Array.from(this.providers.values())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var L;(function(t){t[t.DEBUG=0]="DEBUG",t[t.VERBOSE=1]="VERBOSE",t[t.INFO=2]="INFO",t[t.WARN=3]="WARN",t[t.ERROR=4]="ERROR",t[t.SILENT=5]="SILENT"})(L||(L={}));const Vv={debug:L.DEBUG,verbose:L.VERBOSE,info:L.INFO,warn:L.WARN,error:L.ERROR,silent:L.SILENT},jv=L.INFO,Gv={[L.DEBUG]:"log",[L.VERBOSE]:"log",[L.INFO]:"info",[L.WARN]:"warn",[L.ERROR]:"error"},zv=(t,e,...n)=>{if(e<t.logLevel)return;const s=new Date().toISOString(),r=Gv[e];if(r)console[r](`[${s}]  ${t.name}:`,...n);else throw new Error(`Attempted to log a message with an invalid logType (value: ${e})`)};class Ua{constructor(e){this.name=e,this._logLevel=jv,this._logHandler=zv,this._userLogHandler=null}get logLevel(){return this._logLevel}set logLevel(e){if(!(e in L))throw new TypeError(`Invalid value "${e}" assigned to \`logLevel\``);this._logLevel=e}setLogLevel(e){this._logLevel=typeof e=="string"?Vv[e]:e}get logHandler(){return this._logHandler}set logHandler(e){if(typeof e!="function")throw new TypeError("Value assigned to `logHandler` must be a function");this._logHandler=e}get userLogHandler(){return this._userLogHandler}set userLogHandler(e){this._userLogHandler=e}debug(...e){this._userLogHandler&&this._userLogHandler(this,L.DEBUG,...e),this._logHandler(this,L.DEBUG,...e)}log(...e){this._userLogHandler&&this._userLogHandler(this,L.VERBOSE,...e),this._logHandler(this,L.VERBOSE,...e)}info(...e){this._userLogHandler&&this._userLogHandler(this,L.INFO,...e),this._logHandler(this,L.INFO,...e)}warn(...e){this._userLogHandler&&this._userLogHandler(this,L.WARN,...e),this._logHandler(this,L.WARN,...e)}error(...e){this._userLogHandler&&this._userLogHandler(this,L.ERROR,...e),this._logHandler(this,L.ERROR,...e)}}const qv=(t,e)=>e.some(n=>t instanceof n);let iu,ou;function Yv(){return iu||(iu=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])}function Kv(){return ou||(ou=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])}const Ph=new WeakMap,Bo=new WeakMap,Lh=new WeakMap,ro=new WeakMap,$a=new WeakMap;function Jv(t){const e=new Promise((n,s)=>{const r=()=>{t.removeEventListener("success",i),t.removeEventListener("error",o)},i=()=>{n(It(t.result)),r()},o=()=>{s(t.error),r()};t.addEventListener("success",i),t.addEventListener("error",o)});return e.then(n=>{n instanceof IDBCursor&&Ph.set(n,t)}).catch(()=>{}),$a.set(e,t),e}function Qv(t){if(Bo.has(t))return;const e=new Promise((n,s)=>{const r=()=>{t.removeEventListener("complete",i),t.removeEventListener("error",o),t.removeEventListener("abort",o)},i=()=>{n(),r()},o=()=>{s(t.error||new DOMException("AbortError","AbortError")),r()};t.addEventListener("complete",i),t.addEventListener("error",o),t.addEventListener("abort",o)});Bo.set(t,e)}let Ho={get(t,e,n){if(t instanceof IDBTransaction){if(e==="done")return Bo.get(t);if(e==="objectStoreNames")return t.objectStoreNames||Lh.get(t);if(e==="store")return n.objectStoreNames[1]?void 0:n.objectStore(n.objectStoreNames[0])}return It(t[e])},set(t,e,n){return t[e]=n,!0},has(t,e){return t instanceof IDBTransaction&&(e==="done"||e==="store")?!0:e in t}};function Xv(t){Ho=t(Ho)}function Zv(t){return t===IDBDatabase.prototype.transaction&&!("objectStoreNames"in IDBTransaction.prototype)?function(e,...n){const s=t.call(io(this),e,...n);return Lh.set(s,e.sort?e.sort():[e]),It(s)}:Kv().includes(t)?function(...e){return t.apply(io(this),e),It(Ph.get(this))}:function(...e){return It(t.apply(io(this),e))}}function ew(t){return typeof t=="function"?Zv(t):(t instanceof IDBTransaction&&Qv(t),qv(t,Yv())?new Proxy(t,Ho):t)}function It(t){if(t instanceof IDBRequest)return Jv(t);if(ro.has(t))return ro.get(t);const e=ew(t);return e!==t&&(ro.set(t,e),$a.set(e,t)),e}const io=t=>$a.get(t);function tw(t,e,{blocked:n,upgrade:s,blocking:r,terminated:i}={}){const o=indexedDB.open(t,e),a=It(o);return s&&o.addEventListener("upgradeneeded",c=>{s(It(o.result),c.oldVersion,c.newVersion,It(o.transaction),c)}),n&&o.addEventListener("blocked",c=>n(c.oldVersion,c.newVersion,c)),a.then(c=>{i&&c.addEventListener("close",()=>i()),r&&c.addEventListener("versionchange",l=>r(l.oldVersion,l.newVersion,l))}).catch(()=>{}),a}const nw=["get","getKey","getAll","getAllKeys","count"],sw=["put","add","delete","clear"],oo=new Map;function au(t,e){if(!(t instanceof IDBDatabase&&!(e in t)&&typeof e=="string"))return;if(oo.get(e))return oo.get(e);const n=e.replace(/FromIndex$/,""),s=e!==n,r=sw.includes(n);if(!(n in(s?IDBIndex:IDBObjectStore).prototype)||!(r||nw.includes(n)))return;const i=async function(o,...a){const c=this.transaction(o,r?"readwrite":"readonly");let l=c.store;return s&&(l=l.index(a.shift())),(await Promise.all([l[n](...a),r&&c.done]))[0]};return oo.set(e,i),i}Xv(t=>({...t,get:(e,n,s)=>au(e,n)||t.get(e,n,s),has:(e,n)=>!!au(e,n)||t.has(e,n)}));/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class rw{constructor(e){this.container=e}getPlatformInfoString(){return this.container.getProviders().map(n=>{if(iw(n)){const s=n.getImmediate();return`${s.library}/${s.version}`}else return null}).filter(n=>n).join(" ")}}function iw(t){return t.getComponent()?.type==="VERSION"}const Wo="@firebase/app",cu="0.14.4";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ct=new Ua("@firebase/app"),ow="@firebase/app-compat",aw="@firebase/analytics-compat",cw="@firebase/analytics",lw="@firebase/app-check-compat",uw="@firebase/app-check",dw="@firebase/auth",hw="@firebase/auth-compat",fw="@firebase/database",pw="@firebase/data-connect",gw="@firebase/database-compat",mw="@firebase/functions",_w="@firebase/functions-compat",yw="@firebase/installations",Ew="@firebase/installations-compat",vw="@firebase/messaging",ww="@firebase/messaging-compat",bw="@firebase/performance",Sw="@firebase/performance-compat",Cw="@firebase/remote-config",Iw="@firebase/remote-config-compat",Tw="@firebase/storage",Rw="@firebase/storage-compat",kw="@firebase/firestore",Aw="@firebase/ai",Nw="@firebase/firestore-compat",Pw="firebase",Lw="12.4.0";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Vo="[DEFAULT]",Ow={[Wo]:"fire-core",[ow]:"fire-core-compat",[cw]:"fire-analytics",[aw]:"fire-analytics-compat",[uw]:"fire-app-check",[lw]:"fire-app-check-compat",[dw]:"fire-auth",[hw]:"fire-auth-compat",[fw]:"fire-rtdb",[pw]:"fire-data-connect",[gw]:"fire-rtdb-compat",[mw]:"fire-fn",[_w]:"fire-fn-compat",[yw]:"fire-iid",[Ew]:"fire-iid-compat",[vw]:"fire-fcm",[ww]:"fire-fcm-compat",[bw]:"fire-perf",[Sw]:"fire-perf-compat",[Cw]:"fire-rc",[Iw]:"fire-rc-compat",[Tw]:"fire-gcs",[Rw]:"fire-gcs-compat",[kw]:"fire-fst",[Nw]:"fire-fst-compat",[Aw]:"fire-vertex","fire-js":"fire-js",[Pw]:"fire-js-all"};/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Wr=new Map,Dw=new Map,jo=new Map;function lu(t,e){try{t.container.addComponent(e)}catch(n){ct.debug(`Component ${e.name} failed to register with FirebaseApp ${t.name}`,n)}}function Ln(t){const e=t.name;if(jo.has(e))return ct.debug(`There were multiple attempts to register component ${e}.`),!1;jo.set(e,t);for(const n of Wr.values())lu(n,t);for(const n of Dw.values())lu(n,t);return!0}function Ba(t,e){const n=t.container.getProvider("heartbeat").getImmediate({optional:!0});return n&&n.triggerHeartbeat(),t.container.getProvider(e)}function Le(t){return t==null?!1:t.settings!==void 0}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const xw={"no-app":"No Firebase App '{$appName}' has been created - call initializeApp() first","bad-app-name":"Illegal App name: '{$appName}'","duplicate-app":"Firebase App named '{$appName}' already exists with different options or config","app-deleted":"Firebase App named '{$appName}' already deleted","server-app-deleted":"Firebase Server App has been deleted","no-options":"Need to provide options, when not being deployed to hosting via source.","invalid-app-argument":"firebase.{$appName}() takes either no argument or a Firebase App instance.","invalid-log-argument":"First argument to `onLog` must be null or a function.","idb-open":"Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.","idb-get":"Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.","idb-set":"Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.","idb-delete":"Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}.","finalization-registry-not-supported":"FirebaseServerApp deleteOnDeref field defined but the JS runtime does not support FinalizationRegistry.","invalid-server-app-environment":"FirebaseServerApp is not for use in browser environments."},Tt=new Xs("app","Firebase",xw);/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Mw{constructor(e,n,s){this._isDeleted=!1,this._options={...e},this._config={...n},this._name=n.name,this._automaticDataCollectionEnabled=n.automaticDataCollectionEnabled,this._container=s,this.container.addComponent(new sn("app",()=>this,"PUBLIC"))}get automaticDataCollectionEnabled(){return this.checkDestroyed(),this._automaticDataCollectionEnabled}set automaticDataCollectionEnabled(e){this.checkDestroyed(),this._automaticDataCollectionEnabled=e}get name(){return this.checkDestroyed(),this._name}get options(){return this.checkDestroyed(),this._options}get config(){return this.checkDestroyed(),this._config}get container(){return this._container}get isDeleted(){return this._isDeleted}set isDeleted(e){this._isDeleted=e}checkDestroyed(){if(this.isDeleted)throw Tt.create("app-deleted",{appName:this._name})}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Jn=Lw;function Oh(t,e={}){let n=t;typeof e!="object"&&(e={name:e});const s={name:Vo,automaticDataCollectionEnabled:!0,...e},r=s.name;if(typeof r!="string"||!r)throw Tt.create("bad-app-name",{appName:String(r)});if(n||(n=Ih()),!n)throw Tt.create("no-options");const i=Wr.get(r);if(i){if(nn(n,i.options)&&nn(s,i.config))return i;throw Tt.create("duplicate-app",{appName:r})}const o=new Wv(r);for(const c of jo.values())o.addComponent(c);const a=new Mw(n,s,o);return Wr.set(r,a),a}function Dh(t=Vo){const e=Wr.get(t);if(!e&&t===Vo&&Ih())return Oh();if(!e)throw Tt.create("no-app",{appName:t});return e}function Rt(t,e,n){let s=Ow[t]??t;n&&(s+=`-${n}`);const r=s.match(/\s|\//),i=e.match(/\s|\//);if(r||i){const o=[`Unable to register library "${s}" with version "${e}":`];r&&o.push(`library name "${s}" contains illegal characters (whitespace or "/")`),r&&i&&o.push("and"),i&&o.push(`version name "${e}" contains illegal characters (whitespace or "/")`),ct.warn(o.join(" "));return}Ln(new sn(`${s}-version`,()=>({library:s,version:e}),"VERSION"))}/**
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
 */const Fw="firebase-heartbeat-database",Uw=1,Ds="firebase-heartbeat-store";let ao=null;function xh(){return ao||(ao=tw(Fw,Uw,{upgrade:(t,e)=>{switch(e){case 0:try{t.createObjectStore(Ds)}catch(n){console.warn(n)}}}}).catch(t=>{throw Tt.create("idb-open",{originalErrorMessage:t.message})})),ao}async function $w(t){try{const n=(await xh()).transaction(Ds),s=await n.objectStore(Ds).get(Mh(t));return await n.done,s}catch(e){if(e instanceof Ft)ct.warn(e.message);else{const n=Tt.create("idb-get",{originalErrorMessage:e?.message});ct.warn(n.message)}}}async function uu(t,e){try{const s=(await xh()).transaction(Ds,"readwrite");await s.objectStore(Ds).put(e,Mh(t)),await s.done}catch(n){if(n instanceof Ft)ct.warn(n.message);else{const s=Tt.create("idb-set",{originalErrorMessage:n?.message});ct.warn(s.message)}}}function Mh(t){return`${t.name}!${t.options.appId}`}/**
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
 */const Bw=1024,Hw=30;class Ww{constructor(e){this.container=e,this._heartbeatsCache=null;const n=this.container.getProvider("app").getImmediate();this._storage=new jw(n),this._heartbeatsCachePromise=this._storage.read().then(s=>(this._heartbeatsCache=s,s))}async triggerHeartbeat(){try{const n=this.container.getProvider("platform-logger").getImmediate().getPlatformInfoString(),s=du();if(this._heartbeatsCache?.heartbeats==null&&(this._heartbeatsCache=await this._heartbeatsCachePromise,this._heartbeatsCache?.heartbeats==null)||this._heartbeatsCache.lastSentHeartbeatDate===s||this._heartbeatsCache.heartbeats.some(r=>r.date===s))return;if(this._heartbeatsCache.heartbeats.push({date:s,agent:n}),this._heartbeatsCache.heartbeats.length>Hw){const r=Gw(this._heartbeatsCache.heartbeats);this._heartbeatsCache.heartbeats.splice(r,1)}return this._storage.overwrite(this._heartbeatsCache)}catch(e){ct.warn(e)}}async getHeartbeatsHeader(){try{if(this._heartbeatsCache===null&&await this._heartbeatsCachePromise,this._heartbeatsCache?.heartbeats==null||this._heartbeatsCache.heartbeats.length===0)return"";const e=du(),{heartbeatsToSend:n,unsentEntries:s}=Vw(this._heartbeatsCache.heartbeats),r=$r(JSON.stringify({version:2,heartbeats:n}));return this._heartbeatsCache.lastSentHeartbeatDate=e,s.length>0?(this._heartbeatsCache.heartbeats=s,await this._storage.overwrite(this._heartbeatsCache)):(this._heartbeatsCache.heartbeats=[],this._storage.overwrite(this._heartbeatsCache)),r}catch(e){return ct.warn(e),""}}}function du(){return new Date().toISOString().substring(0,10)}function Vw(t,e=Bw){const n=[];let s=t.slice();for(const r of t){const i=n.find(o=>o.agent===r.agent);if(i){if(i.dates.push(r.date),hu(n)>e){i.dates.pop();break}}else if(n.push({agent:r.agent,dates:[r.date]}),hu(n)>e){n.pop();break}s=s.slice(1)}return{heartbeatsToSend:n,unsentEntries:s}}class jw{constructor(e){this.app=e,this._canUseIndexedDBPromise=this.runIndexedDBEnvironmentCheck()}async runIndexedDBEnvironmentCheck(){return Rv()?kv().then(()=>!0).catch(()=>!1):!1}async read(){if(await this._canUseIndexedDBPromise){const n=await $w(this.app);return n?.heartbeats?n:{heartbeats:[]}}else return{heartbeats:[]}}async overwrite(e){if(await this._canUseIndexedDBPromise){const s=await this.read();return uu(this.app,{lastSentHeartbeatDate:e.lastSentHeartbeatDate??s.lastSentHeartbeatDate,heartbeats:e.heartbeats})}else return}async add(e){if(await this._canUseIndexedDBPromise){const s=await this.read();return uu(this.app,{lastSentHeartbeatDate:e.lastSentHeartbeatDate??s.lastSentHeartbeatDate,heartbeats:[...s.heartbeats,...e.heartbeats]})}else return}}function hu(t){return $r(JSON.stringify({version:2,heartbeats:t})).length}function Gw(t){if(t.length===0)return-1;let e=0,n=t[0].date;for(let s=1;s<t.length;s++)t[s].date<n&&(n=t[s].date,e=s);return e}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function zw(t){Ln(new sn("platform-logger",e=>new rw(e),"PRIVATE")),Ln(new sn("heartbeat",e=>new Ww(e),"PRIVATE")),Rt(Wo,cu,t),Rt(Wo,cu,"esm2020"),Rt("fire-js","")}zw("");var fu={};const pu="@firebase/database",gu="1.1.0";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Fh="";function qw(t){Fh=t}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Yw{constructor(e){this.domStorage_=e,this.prefix_="firebase:"}set(e,n){n==null?this.domStorage_.removeItem(this.prefixedName_(e)):this.domStorage_.setItem(this.prefixedName_(e),Q(n))}get(e){const n=this.domStorage_.getItem(this.prefixedName_(e));return n==null?null:Os(n)}remove(e){this.domStorage_.removeItem(this.prefixedName_(e))}prefixedName_(e){return this.prefix_+e}toString(){return this.domStorage_.toString()}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Kw{constructor(){this.cache_={},this.isInMemoryStorage=!0}set(e,n){n==null?delete this.cache_[e]:this.cache_[e]=n}get(e){return Je(this.cache_,e)?this.cache_[e]:null}remove(e){delete this.cache_[e]}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Uh=function(t){try{if(typeof window<"u"&&typeof window[t]<"u"){const e=window[t];return e.setItem("firebase:sentinel","cache"),e.removeItem("firebase:sentinel"),new Yw(e)}}catch{}return new Kw},Yt=Uh("localStorage"),Jw=Uh("sessionStorage");/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const _n=new Ua("@firebase/database"),Qw=(function(){let t=1;return function(){return t++}})(),$h=function(t){const e=Uv(t),n=new Dv;n.update(e);const s=n.digest();return xa.encodeByteArray(s)},Zs=function(...t){let e="";for(let n=0;n<t.length;n++){const s=t[n];Array.isArray(s)||s&&typeof s=="object"&&typeof s.length=="number"?e+=Zs.apply(null,s):typeof s=="object"?e+=Q(s):e+=s,e+=" "}return e};let ys=null,mu=!0;const Xw=function(t,e){g(!0,"Can't turn on custom loggers persistently."),_n.logLevel=L.VERBOSE,ys=_n.log.bind(_n)},se=function(...t){if(mu===!0&&(mu=!1,ys===null&&Jw.get("logging_enabled")===!0&&Xw()),ys){const e=Zs.apply(null,t);ys(e)}},er=function(t){return function(...e){se(t,...e)}},Go=function(...t){const e="FIREBASE INTERNAL ERROR: "+Zs(...t);_n.error(e)},lt=function(...t){const e=`FIREBASE FATAL ERROR: ${Zs(...t)}`;throw _n.error(e),new Error(e)},pe=function(...t){const e="FIREBASE WARNING: "+Zs(...t);_n.warn(e)},Zw=function(){typeof window<"u"&&window.location&&window.location.protocol&&window.location.protocol.indexOf("https:")!==-1&&pe("Insecure Firebase access from a secure page. Please use https in calls to new Firebase().")},Ha=function(t){return typeof t=="number"&&(t!==t||t===Number.POSITIVE_INFINITY||t===Number.NEGATIVE_INFINITY)},eb=function(t){if(document.readyState==="complete")t();else{let e=!1;const n=function(){if(!document.body){setTimeout(n,Math.floor(10));return}e||(e=!0,t())};document.addEventListener?(document.addEventListener("DOMContentLoaded",n,!1),window.addEventListener("load",n,!1)):document.attachEvent&&(document.attachEvent("onreadystatechange",()=>{document.readyState==="complete"&&n()}),window.attachEvent("onload",n))}},On="[MIN_NAME]",rn="[MAX_NAME]",dn=function(t,e){if(t===e)return 0;if(t===On||e===rn)return-1;if(e===On||t===rn)return 1;{const n=_u(t),s=_u(e);return n!==null?s!==null?n-s===0?t.length-e.length:n-s:-1:s!==null?1:t<e?-1:1}},tb=function(t,e){return t===e?0:t<e?-1:1},os=function(t,e){if(e&&t in e)return e[t];throw new Error("Missing required key ("+t+") in object: "+Q(e))},Wa=function(t){if(typeof t!="object"||t===null)return Q(t);const e=[];for(const s in t)e.push(s);e.sort();let n="{";for(let s=0;s<e.length;s++)s!==0&&(n+=","),n+=Q(e[s]),n+=":",n+=Wa(t[e[s]]);return n+="}",n},Bh=function(t,e){const n=t.length;if(n<=e)return[t];const s=[];for(let r=0;r<n;r+=e)r+e>n?s.push(t.substring(r,n)):s.push(t.substring(r,r+e));return s};function oe(t,e){for(const n in t)t.hasOwnProperty(n)&&e(n,t[n])}const Hh=function(t){g(!Ha(t),"Invalid JSON number");const e=11,n=52,s=(1<<e-1)-1;let r,i,o,a,c;t===0?(i=0,o=0,r=1/t===-1/0?1:0):(r=t<0,t=Math.abs(t),t>=Math.pow(2,1-s)?(a=Math.min(Math.floor(Math.log(t)/Math.LN2),s),i=a+s,o=Math.round(t*Math.pow(2,n-a)-Math.pow(2,n))):(i=0,o=Math.round(t/Math.pow(2,1-s-n))));const l=[];for(c=n;c;c-=1)l.push(o%2?1:0),o=Math.floor(o/2);for(c=e;c;c-=1)l.push(i%2?1:0),i=Math.floor(i/2);l.push(r?1:0),l.reverse();const u=l.join("");let d="";for(c=0;c<64;c+=8){let h=parseInt(u.substr(c,8),2).toString(16);h.length===1&&(h="0"+h),d=d+h}return d.toLowerCase()},nb=function(){return!!(typeof window=="object"&&window.chrome&&window.chrome.extension&&!/^chrome/.test(window.location.href))},sb=function(){return typeof Windows=="object"&&typeof Windows.UI=="object"};function rb(t,e){let n="Unknown Error";t==="too_big"?n="The data requested exceeds the maximum size that can be accessed with a single request.":t==="permission_denied"?n="Client doesn't have permission to access the desired data.":t==="unavailable"&&(n="The service is unavailable");const s=new Error(t+" at "+e._path.toString()+": "+n);return s.code=t.toUpperCase(),s}const ib=new RegExp("^-?(0*)\\d{1,10}$"),ob=-2147483648,ab=2147483647,_u=function(t){if(ib.test(t)){const e=Number(t);if(e>=ob&&e<=ab)return e}return null},Qn=function(t){try{t()}catch(e){setTimeout(()=>{const n=e.stack||"";throw pe("Exception was thrown by user callback.",n),e},Math.floor(0))}},cb=function(){return(typeof window=="object"&&window.navigator&&window.navigator.userAgent||"").search(/googlebot|google webmaster tools|bingbot|yahoo! slurp|baiduspider|yandexbot|duckduckbot/i)>=0},Es=function(t,e){const n=setTimeout(t,e);return typeof n=="number"&&typeof Deno<"u"&&Deno.unrefTimer?Deno.unrefTimer(n):typeof n=="object"&&n.unref&&n.unref(),n};/**
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
 */class lb{constructor(e,n){this.appCheckProvider=n,this.appName=e.name,Le(e)&&e.settings.appCheckToken&&(this.serverAppAppCheckToken=e.settings.appCheckToken),this.appCheck=n?.getImmediate({optional:!0}),this.appCheck||n?.get().then(s=>this.appCheck=s)}getToken(e){if(this.serverAppAppCheckToken){if(e)throw new Error("Attempted reuse of `FirebaseServerApp.appCheckToken` after previous usage failed.");return Promise.resolve({token:this.serverAppAppCheckToken})}return this.appCheck?this.appCheck.getToken(e):new Promise((n,s)=>{setTimeout(()=>{this.appCheck?this.getToken(e).then(n,s):n(null)},0)})}addTokenChangeListener(e){this.appCheckProvider?.get().then(n=>n.addTokenListener(e))}notifyForInvalidToken(){pe(`Provided AppCheck credentials for the app named "${this.appName}" are invalid. This usually indicates your app was not initialized correctly.`)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ub{constructor(e,n,s){this.appName_=e,this.firebaseOptions_=n,this.authProvider_=s,this.auth_=null,this.auth_=s.getImmediate({optional:!0}),this.auth_||s.onInit(r=>this.auth_=r)}getToken(e){return this.auth_?this.auth_.getToken(e).catch(n=>n&&n.code==="auth/token-not-initialized"?(se("Got auth/token-not-initialized error.  Treating as null token."),null):Promise.reject(n)):new Promise((n,s)=>{setTimeout(()=>{this.auth_?this.getToken(e).then(n,s):n(null)},0)})}addTokenChangeListener(e){this.auth_?this.auth_.addAuthTokenListener(e):this.authProvider_.get().then(n=>n.addAuthTokenListener(e))}removeTokenChangeListener(e){this.authProvider_.get().then(n=>n.removeAuthTokenListener(e))}notifyForInvalidToken(){let e='Provided authentication credentials for the app named "'+this.appName_+'" are invalid. This usually indicates your app was not initialized correctly. ';"credential"in this.firebaseOptions_?e+='Make sure the "credential" property provided to initializeApp() is authorized to access the specified "databaseURL" and is from the correct project.':"serviceAccount"in this.firebaseOptions_?e+='Make sure the "serviceAccount" property provided to initializeApp() is authorized to access the specified "databaseURL" and is from the correct project.':e+='Make sure the "apiKey" and "databaseURL" properties provided to initializeApp() match the values provided for your app at https://console.firebase.google.com/.',pe(e)}}class Ir{constructor(e){this.accessToken=e}getToken(e){return Promise.resolve({accessToken:this.accessToken})}addTokenChangeListener(e){e(this.accessToken)}removeTokenChangeListener(e){}notifyForInvalidToken(){}}Ir.OWNER="owner";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Va="5",Wh="v",Vh="s",jh="r",Gh="f",zh=/(console\.firebase|firebase-console-\w+\.corp|firebase\.corp)\.google\.com/,qh="ls",Yh="p",zo="ac",Kh="websocket",Jh="long_polling";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Qh{constructor(e,n,s,r,i=!1,o="",a=!1,c=!1,l=null){this.secure=n,this.namespace=s,this.webSocketOnly=r,this.nodeAdmin=i,this.persistenceKey=o,this.includeNamespaceInQueryParams=a,this.isUsingEmulator=c,this.emulatorOptions=l,this._host=e.toLowerCase(),this._domain=this._host.substr(this._host.indexOf(".")+1),this.internalHost=Yt.get("host:"+e)||this._host}isCacheableHost(){return this.internalHost.substr(0,2)==="s-"}isCustomHost(){return this._domain!=="firebaseio.com"&&this._domain!=="firebaseio-demo.com"}get host(){return this._host}set host(e){e!==this.internalHost&&(this.internalHost=e,this.isCacheableHost()&&Yt.set("host:"+this._host,this.internalHost))}toString(){let e=this.toURLString();return this.persistenceKey&&(e+="<"+this.persistenceKey+">"),e}toURLString(){const e=this.secure?"https://":"http://",n=this.includeNamespaceInQueryParams?`?ns=${this.namespace}`:"";return`${e}${this.host}/${n}`}}function db(t){return t.host!==t.internalHost||t.isCustomHost()||t.includeNamespaceInQueryParams}function Xh(t,e,n){g(typeof e=="string","typeof type must == string"),g(typeof n=="object","typeof params must == object");let s;if(e===Kh)s=(t.secure?"wss://":"ws://")+t.internalHost+"/.ws?";else if(e===Jh)s=(t.secure?"https://":"http://")+t.internalHost+"/.lp?";else throw new Error("Unknown connection type: "+e);db(t)&&(n.ns=t.namespace);const r=[];return oe(n,(i,o)=>{r.push(i+"="+o)}),s+r.join("&")}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class hb{constructor(){this.counters_={}}incrementCounter(e,n=1){Je(this.counters_,e)||(this.counters_[e]=0),this.counters_[e]+=n}get(){return fv(this.counters_)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const co={},lo={};function ja(t){const e=t.toString();return co[e]||(co[e]=new hb),co[e]}function fb(t,e){const n=t.toString();return lo[n]||(lo[n]=e()),lo[n]}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class pb{constructor(e){this.onMessage_=e,this.pendingResponses=[],this.currentResponseNum=0,this.closeAfterResponse=-1,this.onClose=null}closeAfter(e,n){this.closeAfterResponse=e,this.onClose=n,this.closeAfterResponse<this.currentResponseNum&&(this.onClose(),this.onClose=null)}handleResponse(e,n){for(this.pendingResponses[e]=n;this.pendingResponses[this.currentResponseNum];){const s=this.pendingResponses[this.currentResponseNum];delete this.pendingResponses[this.currentResponseNum];for(let r=0;r<s.length;++r)s[r]&&Qn(()=>{this.onMessage_(s[r])});if(this.currentResponseNum===this.closeAfterResponse){this.onClose&&(this.onClose(),this.onClose=null);break}this.currentResponseNum++}}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const yu="start",gb="close",mb="pLPCommand",_b="pRTLPCB",Zh="id",ef="pw",tf="ser",yb="cb",Eb="seg",vb="ts",wb="d",bb="dframe",nf=1870,sf=30,Sb=nf-sf,Cb=25e3,Ib=3e4;class gn{constructor(e,n,s,r,i,o,a){this.connId=e,this.repoInfo=n,this.applicationId=s,this.appCheckToken=r,this.authToken=i,this.transportSessionId=o,this.lastSessionId=a,this.bytesSent=0,this.bytesReceived=0,this.everConnected_=!1,this.log_=er(e),this.stats_=ja(n),this.urlFn=c=>(this.appCheckToken&&(c[zo]=this.appCheckToken),Xh(n,Jh,c))}open(e,n){this.curSegmentNum=0,this.onDisconnect_=n,this.myPacketOrderer=new pb(e),this.isClosed_=!1,this.connectTimeoutTimer_=setTimeout(()=>{this.log_("Timed out trying to connect."),this.onClosed_(),this.connectTimeoutTimer_=null},Math.floor(Ib)),eb(()=>{if(this.isClosed_)return;this.scriptTagHolder=new Ga((...i)=>{const[o,a,c,l,u]=i;if(this.incrementIncomingBytes_(i),!!this.scriptTagHolder)if(this.connectTimeoutTimer_&&(clearTimeout(this.connectTimeoutTimer_),this.connectTimeoutTimer_=null),this.everConnected_=!0,o===yu)this.id=a,this.password=c;else if(o===gb)a?(this.scriptTagHolder.sendNewPolls=!1,this.myPacketOrderer.closeAfter(a,()=>{this.onClosed_()})):this.onClosed_();else throw new Error("Unrecognized command received: "+o)},(...i)=>{const[o,a]=i;this.incrementIncomingBytes_(i),this.myPacketOrderer.handleResponse(o,a)},()=>{this.onClosed_()},this.urlFn);const s={};s[yu]="t",s[tf]=Math.floor(Math.random()*1e8),this.scriptTagHolder.uniqueCallbackIdentifier&&(s[yb]=this.scriptTagHolder.uniqueCallbackIdentifier),s[Wh]=Va,this.transportSessionId&&(s[Vh]=this.transportSessionId),this.lastSessionId&&(s[qh]=this.lastSessionId),this.applicationId&&(s[Yh]=this.applicationId),this.appCheckToken&&(s[zo]=this.appCheckToken),typeof location<"u"&&location.hostname&&zh.test(location.hostname)&&(s[jh]=Gh);const r=this.urlFn(s);this.log_("Connecting via long-poll to "+r),this.scriptTagHolder.addTag(r,()=>{})})}start(){this.scriptTagHolder.startLongPoll(this.id,this.password),this.addDisconnectPingFrame(this.id,this.password)}static forceAllow(){gn.forceAllow_=!0}static forceDisallow(){gn.forceDisallow_=!0}static isAvailable(){return gn.forceAllow_?!0:!gn.forceDisallow_&&typeof document<"u"&&document.createElement!=null&&!nb()&&!sb()}markConnectionHealthy(){}shutdown_(){this.isClosed_=!0,this.scriptTagHolder&&(this.scriptTagHolder.close(),this.scriptTagHolder=null),this.myDisconnFrame&&(document.body.removeChild(this.myDisconnFrame),this.myDisconnFrame=null),this.connectTimeoutTimer_&&(clearTimeout(this.connectTimeoutTimer_),this.connectTimeoutTimer_=null)}onClosed_(){this.isClosed_||(this.log_("Longpoll is closing itself"),this.shutdown_(),this.onDisconnect_&&(this.onDisconnect_(this.everConnected_),this.onDisconnect_=null))}close(){this.isClosed_||(this.log_("Longpoll is being closed."),this.shutdown_())}send(e){const n=Q(e);this.bytesSent+=n.length,this.stats_.incrementCounter("bytes_sent",n.length);const s=bh(n),r=Bh(s,Sb);for(let i=0;i<r.length;i++)this.scriptTagHolder.enqueueSegment(this.curSegmentNum,r.length,r[i]),this.curSegmentNum++}addDisconnectPingFrame(e,n){this.myDisconnFrame=document.createElement("iframe");const s={};s[bb]="t",s[Zh]=e,s[ef]=n,this.myDisconnFrame.src=this.urlFn(s),this.myDisconnFrame.style.display="none",document.body.appendChild(this.myDisconnFrame)}incrementIncomingBytes_(e){const n=Q(e).length;this.bytesReceived+=n,this.stats_.incrementCounter("bytes_received",n)}}class Ga{constructor(e,n,s,r){this.onDisconnect=s,this.urlFn=r,this.outstandingRequests=new Set,this.pendingSegs=[],this.currentSerial=Math.floor(Math.random()*1e8),this.sendNewPolls=!0;{this.uniqueCallbackIdentifier=Qw(),window[mb+this.uniqueCallbackIdentifier]=e,window[_b+this.uniqueCallbackIdentifier]=n,this.myIFrame=Ga.createIFrame_();let i="";this.myIFrame.src&&this.myIFrame.src.substr(0,11)==="javascript:"&&(i='<script>document.domain="'+document.domain+'";<\/script>');const o="<html><body>"+i+"</body></html>";try{this.myIFrame.doc.open(),this.myIFrame.doc.write(o),this.myIFrame.doc.close()}catch(a){se("frame writing exception"),a.stack&&se(a.stack),se(a)}}}static createIFrame_(){const e=document.createElement("iframe");if(e.style.display="none",document.body){document.body.appendChild(e);try{e.contentWindow.document||se("No IE domain setting required")}catch{const s=document.domain;e.src="javascript:void((function(){document.open();document.domain='"+s+"';document.close();})())"}}else throw"Document body has not initialized. Wait to initialize Firebase until after the document is ready.";return e.contentDocument?e.doc=e.contentDocument:e.contentWindow?e.doc=e.contentWindow.document:e.document&&(e.doc=e.document),e}close(){this.alive=!1,this.myIFrame&&(this.myIFrame.doc.body.textContent="",setTimeout(()=>{this.myIFrame!==null&&(document.body.removeChild(this.myIFrame),this.myIFrame=null)},Math.floor(0)));const e=this.onDisconnect;e&&(this.onDisconnect=null,e())}startLongPoll(e,n){for(this.myID=e,this.myPW=n,this.alive=!0;this.newRequest_(););}newRequest_(){if(this.alive&&this.sendNewPolls&&this.outstandingRequests.size<(this.pendingSegs.length>0?2:1)){this.currentSerial++;const e={};e[Zh]=this.myID,e[ef]=this.myPW,e[tf]=this.currentSerial;let n=this.urlFn(e),s="",r=0;for(;this.pendingSegs.length>0&&this.pendingSegs[0].d.length+sf+s.length<=nf;){const o=this.pendingSegs.shift();s=s+"&"+Eb+r+"="+o.seg+"&"+vb+r+"="+o.ts+"&"+wb+r+"="+o.d,r++}return n=n+s,this.addLongPollTag_(n,this.currentSerial),!0}else return!1}enqueueSegment(e,n,s){this.pendingSegs.push({seg:e,ts:n,d:s}),this.alive&&this.newRequest_()}addLongPollTag_(e,n){this.outstandingRequests.add(n);const s=()=>{this.outstandingRequests.delete(n),this.newRequest_()},r=setTimeout(s,Math.floor(Cb)),i=()=>{clearTimeout(r),s()};this.addTag(e,i)}addTag(e,n){setTimeout(()=>{try{if(!this.sendNewPolls)return;const s=this.myIFrame.doc.createElement("script");s.type="text/javascript",s.async=!0,s.src=e,s.onload=s.onreadystatechange=function(){const r=s.readyState;(!r||r==="loaded"||r==="complete")&&(s.onload=s.onreadystatechange=null,s.parentNode&&s.parentNode.removeChild(s),n())},s.onerror=()=>{se("Long-poll script failed to load: "+e),this.sendNewPolls=!1,this.close()},this.myIFrame.doc.body.appendChild(s)}catch{}},Math.floor(1))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Tb=16384,Rb=45e3;let Vr=null;typeof MozWebSocket<"u"?Vr=MozWebSocket:typeof WebSocket<"u"&&(Vr=WebSocket);class Oe{constructor(e,n,s,r,i,o,a){this.connId=e,this.applicationId=s,this.appCheckToken=r,this.authToken=i,this.keepaliveTimer=null,this.frames=null,this.totalFrames=0,this.bytesSent=0,this.bytesReceived=0,this.log_=er(this.connId),this.stats_=ja(n),this.connURL=Oe.connectionURL_(n,o,a,r,s),this.nodeAdmin=n.nodeAdmin}static connectionURL_(e,n,s,r,i){const o={};return o[Wh]=Va,typeof location<"u"&&location.hostname&&zh.test(location.hostname)&&(o[jh]=Gh),n&&(o[Vh]=n),s&&(o[qh]=s),r&&(o[zo]=r),i&&(o[Yh]=i),Xh(e,Kh,o)}open(e,n){this.onDisconnect=n,this.onMessage=e,this.log_("Websocket connecting to "+this.connURL),this.everConnected_=!1,Yt.set("previous_websocket_failure",!0);try{let s;Tv(),this.mySock=new Vr(this.connURL,[],s)}catch(s){this.log_("Error instantiating WebSocket.");const r=s.message||s.data;r&&this.log_(r),this.onClosed_();return}this.mySock.onopen=()=>{this.log_("Websocket connected."),this.everConnected_=!0},this.mySock.onclose=()=>{this.log_("Websocket connection was disconnected."),this.mySock=null,this.onClosed_()},this.mySock.onmessage=s=>{this.handleIncomingFrame(s)},this.mySock.onerror=s=>{this.log_("WebSocket error.  Closing connection.");const r=s.message||s.data;r&&this.log_(r),this.onClosed_()}}start(){}static forceDisallow(){Oe.forceDisallow_=!0}static isAvailable(){let e=!1;if(typeof navigator<"u"&&navigator.userAgent){const n=/Android ([0-9]{0,}\.[0-9]{0,})/,s=navigator.userAgent.match(n);s&&s.length>1&&parseFloat(s[1])<4.4&&(e=!0)}return!e&&Vr!==null&&!Oe.forceDisallow_}static previouslyFailed(){return Yt.isInMemoryStorage||Yt.get("previous_websocket_failure")===!0}markConnectionHealthy(){Yt.remove("previous_websocket_failure")}appendFrame_(e){if(this.frames.push(e),this.frames.length===this.totalFrames){const n=this.frames.join("");this.frames=null;const s=Os(n);this.onMessage(s)}}handleNewFrameCount_(e){this.totalFrames=e,this.frames=[]}extractFrameCount_(e){if(g(this.frames===null,"We already have a frame buffer"),e.length<=6){const n=Number(e);if(!isNaN(n))return this.handleNewFrameCount_(n),null}return this.handleNewFrameCount_(1),e}handleIncomingFrame(e){if(this.mySock===null)return;const n=e.data;if(this.bytesReceived+=n.length,this.stats_.incrementCounter("bytes_received",n.length),this.resetKeepAlive(),this.frames!==null)this.appendFrame_(n);else{const s=this.extractFrameCount_(n);s!==null&&this.appendFrame_(s)}}send(e){this.resetKeepAlive();const n=Q(e);this.bytesSent+=n.length,this.stats_.incrementCounter("bytes_sent",n.length);const s=Bh(n,Tb);s.length>1&&this.sendString_(String(s.length));for(let r=0;r<s.length;r++)this.sendString_(s[r])}shutdown_(){this.isClosed_=!0,this.keepaliveTimer&&(clearInterval(this.keepaliveTimer),this.keepaliveTimer=null),this.mySock&&(this.mySock.close(),this.mySock=null)}onClosed_(){this.isClosed_||(this.log_("WebSocket is closing itself"),this.shutdown_(),this.onDisconnect&&(this.onDisconnect(this.everConnected_),this.onDisconnect=null))}close(){this.isClosed_||(this.log_("WebSocket is being closed"),this.shutdown_())}resetKeepAlive(){clearInterval(this.keepaliveTimer),this.keepaliveTimer=setInterval(()=>{this.mySock&&this.sendString_("0"),this.resetKeepAlive()},Math.floor(Rb))}sendString_(e){try{this.mySock.send(e)}catch(n){this.log_("Exception thrown from WebSocket.send():",n.message||n.data,"Closing connection."),setTimeout(this.onClosed_.bind(this),0)}}}Oe.responsesRequiredToBeHealthy=2;Oe.healthyTimeout=3e4;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class xs{static get ALL_TRANSPORTS(){return[gn,Oe]}static get IS_TRANSPORT_INITIALIZED(){return this.globalTransportInitialized_}constructor(e){this.initTransports_(e)}initTransports_(e){const n=Oe&&Oe.isAvailable();let s=n&&!Oe.previouslyFailed();if(e.webSocketOnly&&(n||pe("wss:// URL used, but browser isn't known to support websockets.  Trying anyway."),s=!0),s)this.transports_=[Oe];else{const r=this.transports_=[];for(const i of xs.ALL_TRANSPORTS)i&&i.isAvailable()&&r.push(i);xs.globalTransportInitialized_=!0}}initialTransport(){if(this.transports_.length>0)return this.transports_[0];throw new Error("No transports available")}upgradeTransport(){return this.transports_.length>1?this.transports_[1]:null}}xs.globalTransportInitialized_=!1;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const kb=6e4,Ab=5e3,Nb=10*1024,Pb=100*1024,uo="t",Eu="d",Lb="s",vu="r",Ob="e",wu="o",bu="a",Su="n",Cu="p",Db="h";class xb{constructor(e,n,s,r,i,o,a,c,l,u){this.id=e,this.repoInfo_=n,this.applicationId_=s,this.appCheckToken_=r,this.authToken_=i,this.onMessage_=o,this.onReady_=a,this.onDisconnect_=c,this.onKill_=l,this.lastSessionId=u,this.connectionCount=0,this.pendingDataMessages=[],this.state_=0,this.log_=er("c:"+this.id+":"),this.transportManager_=new xs(n),this.log_("Connection created"),this.start_()}start_(){const e=this.transportManager_.initialTransport();this.conn_=new e(this.nextTransportId_(),this.repoInfo_,this.applicationId_,this.appCheckToken_,this.authToken_,null,this.lastSessionId),this.primaryResponsesRequired_=e.responsesRequiredToBeHealthy||0;const n=this.connReceiver_(this.conn_),s=this.disconnReceiver_(this.conn_);this.tx_=this.conn_,this.rx_=this.conn_,this.secondaryConn_=null,this.isHealthy_=!1,setTimeout(()=>{this.conn_&&this.conn_.open(n,s)},Math.floor(0));const r=e.healthyTimeout||0;r>0&&(this.healthyTimeout_=Es(()=>{this.healthyTimeout_=null,this.isHealthy_||(this.conn_&&this.conn_.bytesReceived>Pb?(this.log_("Connection exceeded healthy timeout but has received "+this.conn_.bytesReceived+" bytes.  Marking connection healthy."),this.isHealthy_=!0,this.conn_.markConnectionHealthy()):this.conn_&&this.conn_.bytesSent>Nb?this.log_("Connection exceeded healthy timeout but has sent "+this.conn_.bytesSent+" bytes.  Leaving connection alive."):(this.log_("Closing unhealthy connection after timeout."),this.close()))},Math.floor(r)))}nextTransportId_(){return"c:"+this.id+":"+this.connectionCount++}disconnReceiver_(e){return n=>{e===this.conn_?this.onConnectionLost_(n):e===this.secondaryConn_?(this.log_("Secondary connection lost."),this.onSecondaryConnectionLost_()):this.log_("closing an old connection")}}connReceiver_(e){return n=>{this.state_!==2&&(e===this.rx_?this.onPrimaryMessageReceived_(n):e===this.secondaryConn_?this.onSecondaryMessageReceived_(n):this.log_("message on old connection"))}}sendRequest(e){const n={t:"d",d:e};this.sendData_(n)}tryCleanupConnection(){this.tx_===this.secondaryConn_&&this.rx_===this.secondaryConn_&&(this.log_("cleaning up and promoting a connection: "+this.secondaryConn_.connId),this.conn_=this.secondaryConn_,this.secondaryConn_=null)}onSecondaryControl_(e){if(uo in e){const n=e[uo];n===bu?this.upgradeIfSecondaryHealthy_():n===vu?(this.log_("Got a reset on secondary, closing it"),this.secondaryConn_.close(),(this.tx_===this.secondaryConn_||this.rx_===this.secondaryConn_)&&this.close()):n===wu&&(this.log_("got pong on secondary."),this.secondaryResponsesRequired_--,this.upgradeIfSecondaryHealthy_())}}onSecondaryMessageReceived_(e){const n=os("t",e),s=os("d",e);if(n==="c")this.onSecondaryControl_(s);else if(n==="d")this.pendingDataMessages.push(s);else throw new Error("Unknown protocol layer: "+n)}upgradeIfSecondaryHealthy_(){this.secondaryResponsesRequired_<=0?(this.log_("Secondary connection is healthy."),this.isHealthy_=!0,this.secondaryConn_.markConnectionHealthy(),this.proceedWithUpgrade_()):(this.log_("sending ping on secondary."),this.secondaryConn_.send({t:"c",d:{t:Cu,d:{}}}))}proceedWithUpgrade_(){this.secondaryConn_.start(),this.log_("sending client ack on secondary"),this.secondaryConn_.send({t:"c",d:{t:bu,d:{}}}),this.log_("Ending transmission on primary"),this.conn_.send({t:"c",d:{t:Su,d:{}}}),this.tx_=this.secondaryConn_,this.tryCleanupConnection()}onPrimaryMessageReceived_(e){const n=os("t",e),s=os("d",e);n==="c"?this.onControl_(s):n==="d"&&this.onDataMessage_(s)}onDataMessage_(e){this.onPrimaryResponse_(),this.onMessage_(e)}onPrimaryResponse_(){this.isHealthy_||(this.primaryResponsesRequired_--,this.primaryResponsesRequired_<=0&&(this.log_("Primary connection is healthy."),this.isHealthy_=!0,this.conn_.markConnectionHealthy()))}onControl_(e){const n=os(uo,e);if(Eu in e){const s=e[Eu];if(n===Db){const r={...s};this.repoInfo_.isUsingEmulator&&(r.h=this.repoInfo_.host),this.onHandshake_(r)}else if(n===Su){this.log_("recvd end transmission on primary"),this.rx_=this.secondaryConn_;for(let r=0;r<this.pendingDataMessages.length;++r)this.onDataMessage_(this.pendingDataMessages[r]);this.pendingDataMessages=[],this.tryCleanupConnection()}else n===Lb?this.onConnectionShutdown_(s):n===vu?this.onReset_(s):n===Ob?Go("Server Error: "+s):n===wu?(this.log_("got pong on primary."),this.onPrimaryResponse_(),this.sendPingOnPrimaryIfNecessary_()):Go("Unknown control packet command: "+n)}}onHandshake_(e){const n=e.ts,s=e.v,r=e.h;this.sessionId=e.s,this.repoInfo_.host=r,this.state_===0&&(this.conn_.start(),this.onConnectionEstablished_(this.conn_,n),Va!==s&&pe("Protocol version mismatch detected"),this.tryStartUpgrade_())}tryStartUpgrade_(){const e=this.transportManager_.upgradeTransport();e&&this.startUpgrade_(e)}startUpgrade_(e){this.secondaryConn_=new e(this.nextTransportId_(),this.repoInfo_,this.applicationId_,this.appCheckToken_,this.authToken_,this.sessionId),this.secondaryResponsesRequired_=e.responsesRequiredToBeHealthy||0;const n=this.connReceiver_(this.secondaryConn_),s=this.disconnReceiver_(this.secondaryConn_);this.secondaryConn_.open(n,s),Es(()=>{this.secondaryConn_&&(this.log_("Timed out trying to upgrade."),this.secondaryConn_.close())},Math.floor(kb))}onReset_(e){this.log_("Reset packet received.  New host: "+e),this.repoInfo_.host=e,this.state_===1?this.close():(this.closeConnections_(),this.start_())}onConnectionEstablished_(e,n){this.log_("Realtime connection established."),this.conn_=e,this.state_=1,this.onReady_&&(this.onReady_(n,this.sessionId),this.onReady_=null),this.primaryResponsesRequired_===0?(this.log_("Primary connection is healthy."),this.isHealthy_=!0):Es(()=>{this.sendPingOnPrimaryIfNecessary_()},Math.floor(Ab))}sendPingOnPrimaryIfNecessary_(){!this.isHealthy_&&this.state_===1&&(this.log_("sending ping on primary."),this.sendData_({t:"c",d:{t:Cu,d:{}}}))}onSecondaryConnectionLost_(){const e=this.secondaryConn_;this.secondaryConn_=null,(this.tx_===e||this.rx_===e)&&this.close()}onConnectionLost_(e){this.conn_=null,!e&&this.state_===0?(this.log_("Realtime connection failed."),this.repoInfo_.isCacheableHost()&&(Yt.remove("host:"+this.repoInfo_.host),this.repoInfo_.internalHost=this.repoInfo_.host)):this.state_===1&&this.log_("Realtime connection lost."),this.close()}onConnectionShutdown_(e){this.log_("Connection shutdown command received. Shutting down..."),this.onKill_&&(this.onKill_(e),this.onKill_=null),this.onDisconnect_=null,this.close()}sendData_(e){if(this.state_!==1)throw"Connection is not connected";this.tx_.send(e)}close(){this.state_!==2&&(this.log_("Closing realtime connection."),this.state_=2,this.closeConnections_(),this.onDisconnect_&&(this.onDisconnect_(),this.onDisconnect_=null))}closeConnections_(){this.log_("Shutting down all connections"),this.conn_&&(this.conn_.close(),this.conn_=null),this.secondaryConn_&&(this.secondaryConn_.close(),this.secondaryConn_=null),this.healthyTimeout_&&(clearTimeout(this.healthyTimeout_),this.healthyTimeout_=null)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class rf{put(e,n,s,r){}merge(e,n,s,r){}refreshAuthToken(e){}refreshAppCheckToken(e){}onDisconnectPut(e,n,s){}onDisconnectMerge(e,n,s){}onDisconnectCancel(e,n){}reportStats(e){}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class of{constructor(e){this.allowedEvents_=e,this.listeners_={},g(Array.isArray(e)&&e.length>0,"Requires a non-empty array")}trigger(e,...n){if(Array.isArray(this.listeners_[e])){const s=[...this.listeners_[e]];for(let r=0;r<s.length;r++)s[r].callback.apply(s[r].context,n)}}on(e,n,s){this.validateEventType_(e),this.listeners_[e]=this.listeners_[e]||[],this.listeners_[e].push({callback:n,context:s});const r=this.getInitialEvent(e);r&&n.apply(s,r)}off(e,n,s){this.validateEventType_(e);const r=this.listeners_[e]||[];for(let i=0;i<r.length;i++)if(r[i].callback===n&&(!s||s===r[i].context)){r.splice(i,1);return}}validateEventType_(e){g(this.allowedEvents_.find(n=>n===e),"Unknown event: "+e)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class jr extends of{static getInstance(){return new jr}constructor(){super(["online"]),this.online_=!0,typeof window<"u"&&typeof window.addEventListener<"u"&&!Fa()&&(window.addEventListener("online",()=>{this.online_||(this.online_=!0,this.trigger("online",!0))},!1),window.addEventListener("offline",()=>{this.online_&&(this.online_=!1,this.trigger("online",!1))},!1))}getInitialEvent(e){return g(e==="online","Unknown event type: "+e),[this.online_]}currentlyOnline(){return this.online_}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Iu=32,Tu=768;class D{constructor(e,n){if(n===void 0){this.pieces_=e.split("/");let s=0;for(let r=0;r<this.pieces_.length;r++)this.pieces_[r].length>0&&(this.pieces_[s]=this.pieces_[r],s++);this.pieces_.length=s,this.pieceNum_=0}else this.pieces_=e,this.pieceNum_=n}toString(){let e="";for(let n=this.pieceNum_;n<this.pieces_.length;n++)this.pieces_[n]!==""&&(e+="/"+this.pieces_[n]);return e||"/"}}function P(){return new D("")}function I(t){return t.pieceNum_>=t.pieces_.length?null:t.pieces_[t.pieceNum_]}function Ot(t){return t.pieces_.length-t.pieceNum_}function F(t){let e=t.pieceNum_;return e<t.pieces_.length&&e++,new D(t.pieces_,e)}function za(t){return t.pieceNum_<t.pieces_.length?t.pieces_[t.pieces_.length-1]:null}function Mb(t){let e="";for(let n=t.pieceNum_;n<t.pieces_.length;n++)t.pieces_[n]!==""&&(e+="/"+encodeURIComponent(String(t.pieces_[n])));return e||"/"}function Ms(t,e=0){return t.pieces_.slice(t.pieceNum_+e)}function af(t){if(t.pieceNum_>=t.pieces_.length)return null;const e=[];for(let n=t.pieceNum_;n<t.pieces_.length-1;n++)e.push(t.pieces_[n]);return new D(e,0)}function G(t,e){const n=[];for(let s=t.pieceNum_;s<t.pieces_.length;s++)n.push(t.pieces_[s]);if(e instanceof D)for(let s=e.pieceNum_;s<e.pieces_.length;s++)n.push(e.pieces_[s]);else{const s=e.split("/");for(let r=0;r<s.length;r++)s[r].length>0&&n.push(s[r])}return new D(n,0)}function k(t){return t.pieceNum_>=t.pieces_.length}function fe(t,e){const n=I(t),s=I(e);if(n===null)return e;if(n===s)return fe(F(t),F(e));throw new Error("INTERNAL ERROR: innerPath ("+e+") is not within outerPath ("+t+")")}function Fb(t,e){const n=Ms(t,0),s=Ms(e,0);for(let r=0;r<n.length&&r<s.length;r++){const i=dn(n[r],s[r]);if(i!==0)return i}return n.length===s.length?0:n.length<s.length?-1:1}function qa(t,e){if(Ot(t)!==Ot(e))return!1;for(let n=t.pieceNum_,s=e.pieceNum_;n<=t.pieces_.length;n++,s++)if(t.pieces_[n]!==e.pieces_[s])return!1;return!0}function Ie(t,e){let n=t.pieceNum_,s=e.pieceNum_;if(Ot(t)>Ot(e))return!1;for(;n<t.pieces_.length;){if(t.pieces_[n]!==e.pieces_[s])return!1;++n,++s}return!0}class Ub{constructor(e,n){this.errorPrefix_=n,this.parts_=Ms(e,0),this.byteLength_=Math.max(1,this.parts_.length);for(let s=0;s<this.parts_.length;s++)this.byteLength_+=Ci(this.parts_[s]);cf(this)}}function $b(t,e){t.parts_.length>0&&(t.byteLength_+=1),t.parts_.push(e),t.byteLength_+=Ci(e),cf(t)}function Bb(t){const e=t.parts_.pop();t.byteLength_-=Ci(e),t.parts_.length>0&&(t.byteLength_-=1)}function cf(t){if(t.byteLength_>Tu)throw new Error(t.errorPrefix_+"has a key path longer than "+Tu+" bytes ("+t.byteLength_+").");if(t.parts_.length>Iu)throw new Error(t.errorPrefix_+"path specified exceeds the maximum depth that can be written ("+Iu+") or object contains a cycle "+jt(t))}function jt(t){return t.parts_.length===0?"":"in property '"+t.parts_.join(".")+"'"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ya extends of{static getInstance(){return new Ya}constructor(){super(["visible"]);let e,n;typeof document<"u"&&typeof document.addEventListener<"u"&&(typeof document.hidden<"u"?(n="visibilitychange",e="hidden"):typeof document.mozHidden<"u"?(n="mozvisibilitychange",e="mozHidden"):typeof document.msHidden<"u"?(n="msvisibilitychange",e="msHidden"):typeof document.webkitHidden<"u"&&(n="webkitvisibilitychange",e="webkitHidden")),this.visible_=!0,n&&document.addEventListener(n,()=>{const s=!document[e];s!==this.visible_&&(this.visible_=s,this.trigger("visible",s))},!1)}getInitialEvent(e){return g(e==="visible","Unknown event type: "+e),[this.visible_]}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const as=1e3,Hb=300*1e3,Ru=30*1e3,Wb=1.3,Vb=3e4,jb="server_kill",ku=3;class ot extends rf{constructor(e,n,s,r,i,o,a,c){if(super(),this.repoInfo_=e,this.applicationId_=n,this.onDataUpdate_=s,this.onConnectStatus_=r,this.onServerInfoUpdate_=i,this.authTokenProvider_=o,this.appCheckTokenProvider_=a,this.authOverride_=c,this.id=ot.nextPersistentConnectionId_++,this.log_=er("p:"+this.id+":"),this.interruptReasons_={},this.listens=new Map,this.outstandingPuts_=[],this.outstandingGets_=[],this.outstandingPutCount_=0,this.outstandingGetCount_=0,this.onDisconnectRequestQueue_=[],this.connected_=!1,this.reconnectDelay_=as,this.maxReconnectDelay_=Hb,this.securityDebugCallback_=null,this.lastSessionId=null,this.establishConnectionTimer_=null,this.visible_=!1,this.requestCBHash_={},this.requestNumber_=0,this.realtime_=null,this.authToken_=null,this.appCheckToken_=null,this.forceTokenRefresh_=!1,this.invalidAuthTokenCount_=0,this.invalidAppCheckTokenCount_=0,this.firstConnection_=!0,this.lastConnectionAttemptTime_=null,this.lastConnectionEstablishedTime_=null,c)throw new Error("Auth override specified in options, but not supported on non Node.js platforms");Ya.getInstance().on("visible",this.onVisible_,this),e.host.indexOf("fblocal")===-1&&jr.getInstance().on("online",this.onOnline_,this)}sendRequest(e,n,s){const r=++this.requestNumber_,i={r,a:e,b:n};this.log_(Q(i)),g(this.connected_,"sendRequest call when we're not connected not allowed."),this.realtime_.sendRequest(i),s&&(this.requestCBHash_[r]=s)}get(e){this.initConnection_();const n=new Qs,r={action:"g",request:{p:e._path.toString(),q:e._queryObject},onComplete:o=>{const a=o.d;o.s==="ok"?n.resolve(a):n.reject(a)}};this.outstandingGets_.push(r),this.outstandingGetCount_++;const i=this.outstandingGets_.length-1;return this.connected_&&this.sendGet_(i),n.promise}listen(e,n,s,r){this.initConnection_();const i=e._queryIdentifier,o=e._path.toString();this.log_("Listen called for "+o+" "+i),this.listens.has(o)||this.listens.set(o,new Map),g(e._queryParams.isDefault()||!e._queryParams.loadsAllData(),"listen() called for non-default but complete query"),g(!this.listens.get(o).has(i),"listen() called twice for same path/queryId.");const a={onComplete:r,hashFn:n,query:e,tag:s};this.listens.get(o).set(i,a),this.connected_&&this.sendListen_(a)}sendGet_(e){const n=this.outstandingGets_[e];this.sendRequest("g",n.request,s=>{delete this.outstandingGets_[e],this.outstandingGetCount_--,this.outstandingGetCount_===0&&(this.outstandingGets_=[]),n.onComplete&&n.onComplete(s)})}sendListen_(e){const n=e.query,s=n._path.toString(),r=n._queryIdentifier;this.log_("Listen on "+s+" for "+r);const i={p:s},o="q";e.tag&&(i.q=n._queryObject,i.t=e.tag),i.h=e.hashFn(),this.sendRequest(o,i,a=>{const c=a.d,l=a.s;ot.warnOnListenWarnings_(c,n),(this.listens.get(s)&&this.listens.get(s).get(r))===e&&(this.log_("listen response",a),l!=="ok"&&this.removeListen_(s,r),e.onComplete&&e.onComplete(l,c))})}static warnOnListenWarnings_(e,n){if(e&&typeof e=="object"&&Je(e,"w")){const s=Pn(e,"w");if(Array.isArray(s)&&~s.indexOf("no_index")){const r='".indexOn": "'+n._queryParams.getIndex().toString()+'"',i=n._path.toString();pe(`Using an unspecified index. Your data will be downloaded and filtered on the client. Consider adding ${r} at ${i} to your security rules for better performance.`)}}}refreshAuthToken(e){this.authToken_=e,this.log_("Auth token refreshed"),this.authToken_?this.tryAuth():this.connected_&&this.sendRequest("unauth",{},()=>{}),this.reduceReconnectDelayIfAdminCredential_(e)}reduceReconnectDelayIfAdminCredential_(e){(e&&e.length===40||Ov(e))&&(this.log_("Admin auth credential detected.  Reducing max reconnect time."),this.maxReconnectDelay_=Ru)}refreshAppCheckToken(e){this.appCheckToken_=e,this.log_("App check token refreshed"),this.appCheckToken_?this.tryAppCheck():this.connected_&&this.sendRequest("unappeck",{},()=>{})}tryAuth(){if(this.connected_&&this.authToken_){const e=this.authToken_,n=Lv(e)?"auth":"gauth",s={cred:e};this.authOverride_===null?s.noauth=!0:typeof this.authOverride_=="object"&&(s.authvar=this.authOverride_),this.sendRequest(n,s,r=>{const i=r.s,o=r.d||"error";this.authToken_===e&&(i==="ok"?this.invalidAuthTokenCount_=0:this.onAuthRevoked_(i,o))})}}tryAppCheck(){this.connected_&&this.appCheckToken_&&this.sendRequest("appcheck",{token:this.appCheckToken_},e=>{const n=e.s,s=e.d||"error";n==="ok"?this.invalidAppCheckTokenCount_=0:this.onAppCheckRevoked_(n,s)})}unlisten(e,n){const s=e._path.toString(),r=e._queryIdentifier;this.log_("Unlisten called for "+s+" "+r),g(e._queryParams.isDefault()||!e._queryParams.loadsAllData(),"unlisten() called for non-default but complete query"),this.removeListen_(s,r)&&this.connected_&&this.sendUnlisten_(s,r,e._queryObject,n)}sendUnlisten_(e,n,s,r){this.log_("Unlisten on "+e+" for "+n);const i={p:e},o="n";r&&(i.q=s,i.t=r),this.sendRequest(o,i)}onDisconnectPut(e,n,s){this.initConnection_(),this.connected_?this.sendOnDisconnect_("o",e,n,s):this.onDisconnectRequestQueue_.push({pathString:e,action:"o",data:n,onComplete:s})}onDisconnectMerge(e,n,s){this.initConnection_(),this.connected_?this.sendOnDisconnect_("om",e,n,s):this.onDisconnectRequestQueue_.push({pathString:e,action:"om",data:n,onComplete:s})}onDisconnectCancel(e,n){this.initConnection_(),this.connected_?this.sendOnDisconnect_("oc",e,null,n):this.onDisconnectRequestQueue_.push({pathString:e,action:"oc",data:null,onComplete:n})}sendOnDisconnect_(e,n,s,r){const i={p:n,d:s};this.log_("onDisconnect "+e,i),this.sendRequest(e,i,o=>{r&&setTimeout(()=>{r(o.s,o.d)},Math.floor(0))})}put(e,n,s,r){this.putInternal("p",e,n,s,r)}merge(e,n,s,r){this.putInternal("m",e,n,s,r)}putInternal(e,n,s,r,i){this.initConnection_();const o={p:n,d:s};i!==void 0&&(o.h=i),this.outstandingPuts_.push({action:e,request:o,onComplete:r}),this.outstandingPutCount_++;const a=this.outstandingPuts_.length-1;this.connected_?this.sendPut_(a):this.log_("Buffering put: "+n)}sendPut_(e){const n=this.outstandingPuts_[e].action,s=this.outstandingPuts_[e].request,r=this.outstandingPuts_[e].onComplete;this.outstandingPuts_[e].queued=this.connected_,this.sendRequest(n,s,i=>{this.log_(n+" response",i),delete this.outstandingPuts_[e],this.outstandingPutCount_--,this.outstandingPutCount_===0&&(this.outstandingPuts_=[]),r&&r(i.s,i.d)})}reportStats(e){if(this.connected_){const n={c:e};this.log_("reportStats",n),this.sendRequest("s",n,s=>{if(s.s!=="ok"){const i=s.d;this.log_("reportStats","Error sending stats: "+i)}})}}onDataMessage_(e){if("r"in e){this.log_("from server: "+Q(e));const n=e.r,s=this.requestCBHash_[n];s&&(delete this.requestCBHash_[n],s(e.b))}else{if("error"in e)throw"A server-side error has occurred: "+e.error;"a"in e&&this.onDataPush_(e.a,e.b)}}onDataPush_(e,n){this.log_("handleServerMessage",e,n),e==="d"?this.onDataUpdate_(n.p,n.d,!1,n.t):e==="m"?this.onDataUpdate_(n.p,n.d,!0,n.t):e==="c"?this.onListenRevoked_(n.p,n.q):e==="ac"?this.onAuthRevoked_(n.s,n.d):e==="apc"?this.onAppCheckRevoked_(n.s,n.d):e==="sd"?this.onSecurityDebugPacket_(n):Go("Unrecognized action received from server: "+Q(e)+`
Are you using the latest client?`)}onReady_(e,n){this.log_("connection ready"),this.connected_=!0,this.lastConnectionEstablishedTime_=new Date().getTime(),this.handleTimestamp_(e),this.lastSessionId=n,this.firstConnection_&&this.sendConnectStats_(),this.restoreState_(),this.firstConnection_=!1,this.onConnectStatus_(!0)}scheduleConnect_(e){g(!this.realtime_,"Scheduling a connect when we're already connected/ing?"),this.establishConnectionTimer_&&clearTimeout(this.establishConnectionTimer_),this.establishConnectionTimer_=setTimeout(()=>{this.establishConnectionTimer_=null,this.establishConnection_()},Math.floor(e))}initConnection_(){!this.realtime_&&this.firstConnection_&&this.scheduleConnect_(0)}onVisible_(e){e&&!this.visible_&&this.reconnectDelay_===this.maxReconnectDelay_&&(this.log_("Window became visible.  Reducing delay."),this.reconnectDelay_=as,this.realtime_||this.scheduleConnect_(0)),this.visible_=e}onOnline_(e){e?(this.log_("Browser went online."),this.reconnectDelay_=as,this.realtime_||this.scheduleConnect_(0)):(this.log_("Browser went offline.  Killing connection."),this.realtime_&&this.realtime_.close())}onRealtimeDisconnect_(){if(this.log_("data client disconnected"),this.connected_=!1,this.realtime_=null,this.cancelSentTransactions_(),this.requestCBHash_={},this.shouldReconnect_()){this.visible_?this.lastConnectionEstablishedTime_&&(new Date().getTime()-this.lastConnectionEstablishedTime_>Vb&&(this.reconnectDelay_=as),this.lastConnectionEstablishedTime_=null):(this.log_("Window isn't visible.  Delaying reconnect."),this.reconnectDelay_=this.maxReconnectDelay_,this.lastConnectionAttemptTime_=new Date().getTime());const e=Math.max(0,new Date().getTime()-this.lastConnectionAttemptTime_);let n=Math.max(0,this.reconnectDelay_-e);n=Math.random()*n,this.log_("Trying to reconnect in "+n+"ms"),this.scheduleConnect_(n),this.reconnectDelay_=Math.min(this.maxReconnectDelay_,this.reconnectDelay_*Wb)}this.onConnectStatus_(!1)}async establishConnection_(){if(this.shouldReconnect_()){this.log_("Making a connection attempt"),this.lastConnectionAttemptTime_=new Date().getTime(),this.lastConnectionEstablishedTime_=null;const e=this.onDataMessage_.bind(this),n=this.onReady_.bind(this),s=this.onRealtimeDisconnect_.bind(this),r=this.id+":"+ot.nextConnectionId_++,i=this.lastSessionId;let o=!1,a=null;const c=function(){a?a.close():(o=!0,s())},l=function(d){g(a,"sendRequest call when we're not connected not allowed."),a.sendRequest(d)};this.realtime_={close:c,sendRequest:l};const u=this.forceTokenRefresh_;this.forceTokenRefresh_=!1;try{const[d,h]=await Promise.all([this.authTokenProvider_.getToken(u),this.appCheckTokenProvider_.getToken(u)]);o?se("getToken() completed but was canceled"):(se("getToken() completed. Creating connection."),this.authToken_=d&&d.accessToken,this.appCheckToken_=h&&h.token,a=new xb(r,this.repoInfo_,this.applicationId_,this.appCheckToken_,this.authToken_,e,n,s,f=>{pe(f+" ("+this.repoInfo_.toString()+")"),this.interrupt(jb)},i))}catch(d){this.log_("Failed to get token: "+d),o||(this.repoInfo_.nodeAdmin&&pe(d),c())}}}interrupt(e){se("Interrupting connection for reason: "+e),this.interruptReasons_[e]=!0,this.realtime_?this.realtime_.close():(this.establishConnectionTimer_&&(clearTimeout(this.establishConnectionTimer_),this.establishConnectionTimer_=null),this.connected_&&this.onRealtimeDisconnect_())}resume(e){se("Resuming connection for reason: "+e),delete this.interruptReasons_[e],$o(this.interruptReasons_)&&(this.reconnectDelay_=as,this.realtime_||this.scheduleConnect_(0))}handleTimestamp_(e){const n=e-new Date().getTime();this.onServerInfoUpdate_({serverTimeOffset:n})}cancelSentTransactions_(){for(let e=0;e<this.outstandingPuts_.length;e++){const n=this.outstandingPuts_[e];n&&"h"in n.request&&n.queued&&(n.onComplete&&n.onComplete("disconnect"),delete this.outstandingPuts_[e],this.outstandingPutCount_--)}this.outstandingPutCount_===0&&(this.outstandingPuts_=[])}onListenRevoked_(e,n){let s;n?s=n.map(i=>Wa(i)).join("$"):s="default";const r=this.removeListen_(e,s);r&&r.onComplete&&r.onComplete("permission_denied")}removeListen_(e,n){const s=new D(e).toString();let r;if(this.listens.has(s)){const i=this.listens.get(s);r=i.get(n),i.delete(n),i.size===0&&this.listens.delete(s)}else r=void 0;return r}onAuthRevoked_(e,n){se("Auth token revoked: "+e+"/"+n),this.authToken_=null,this.forceTokenRefresh_=!0,this.realtime_.close(),(e==="invalid_token"||e==="permission_denied")&&(this.invalidAuthTokenCount_++,this.invalidAuthTokenCount_>=ku&&(this.reconnectDelay_=Ru,this.authTokenProvider_.notifyForInvalidToken()))}onAppCheckRevoked_(e,n){se("App check token revoked: "+e+"/"+n),this.appCheckToken_=null,this.forceTokenRefresh_=!0,(e==="invalid_token"||e==="permission_denied")&&(this.invalidAppCheckTokenCount_++,this.invalidAppCheckTokenCount_>=ku&&this.appCheckTokenProvider_.notifyForInvalidToken())}onSecurityDebugPacket_(e){this.securityDebugCallback_?this.securityDebugCallback_(e):"msg"in e&&console.log("FIREBASE: "+e.msg.replace(`
`,`
FIREBASE: `))}restoreState_(){this.tryAuth(),this.tryAppCheck();for(const e of this.listens.values())for(const n of e.values())this.sendListen_(n);for(let e=0;e<this.outstandingPuts_.length;e++)this.outstandingPuts_[e]&&this.sendPut_(e);for(;this.onDisconnectRequestQueue_.length;){const e=this.onDisconnectRequestQueue_.shift();this.sendOnDisconnect_(e.action,e.pathString,e.data,e.onComplete)}for(let e=0;e<this.outstandingGets_.length;e++)this.outstandingGets_[e]&&this.sendGet_(e)}sendConnectStats_(){const e={};let n="js";e["sdk."+n+"."+Fh.replace(/\./g,"-")]=1,Fa()?e["framework.cordova"]=1:Ah()&&(e["framework.reactnative"]=1),this.reportStats(e)}shouldReconnect_(){const e=jr.getInstance().currentlyOnline();return $o(this.interruptReasons_)&&e}}ot.nextPersistentConnectionId_=0;ot.nextConnectionId_=0;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class T{constructor(e,n){this.name=e,this.node=n}static Wrap(e,n){return new T(e,n)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ii{getCompare(){return this.compare.bind(this)}indexedValueChanged(e,n){const s=new T(On,e),r=new T(On,n);return this.compare(s,r)!==0}minPost(){return T.MIN}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let gr;class lf extends Ii{static get __EMPTY_NODE(){return gr}static set __EMPTY_NODE(e){gr=e}compare(e,n){return dn(e.name,n.name)}isDefinedOn(e){throw qn("KeyIndex.isDefinedOn not expected to be called.")}indexedValueChanged(e,n){return!1}minPost(){return T.MIN}maxPost(){return new T(rn,gr)}makePost(e,n){return g(typeof e=="string","KeyIndex indexValue must always be a string."),new T(e,gr)}toString(){return".key"}}const yn=new lf;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class mr{constructor(e,n,s,r,i=null){this.isReverse_=r,this.resultGenerator_=i,this.nodeStack_=[];let o=1;for(;!e.isEmpty();)if(e=e,o=n?s(e.key,n):1,r&&(o*=-1),o<0)this.isReverse_?e=e.left:e=e.right;else if(o===0){this.nodeStack_.push(e);break}else this.nodeStack_.push(e),this.isReverse_?e=e.right:e=e.left}getNext(){if(this.nodeStack_.length===0)return null;let e=this.nodeStack_.pop(),n;if(this.resultGenerator_?n=this.resultGenerator_(e.key,e.value):n={key:e.key,value:e.value},this.isReverse_)for(e=e.left;!e.isEmpty();)this.nodeStack_.push(e),e=e.right;else for(e=e.right;!e.isEmpty();)this.nodeStack_.push(e),e=e.left;return n}hasNext(){return this.nodeStack_.length>0}peek(){if(this.nodeStack_.length===0)return null;const e=this.nodeStack_[this.nodeStack_.length-1];return this.resultGenerator_?this.resultGenerator_(e.key,e.value):{key:e.key,value:e.value}}}class Z{constructor(e,n,s,r,i){this.key=e,this.value=n,this.color=s??Z.RED,this.left=r??ye.EMPTY_NODE,this.right=i??ye.EMPTY_NODE}copy(e,n,s,r,i){return new Z(e??this.key,n??this.value,s??this.color,r??this.left,i??this.right)}count(){return this.left.count()+1+this.right.count()}isEmpty(){return!1}inorderTraversal(e){return this.left.inorderTraversal(e)||!!e(this.key,this.value)||this.right.inorderTraversal(e)}reverseTraversal(e){return this.right.reverseTraversal(e)||e(this.key,this.value)||this.left.reverseTraversal(e)}min_(){return this.left.isEmpty()?this:this.left.min_()}minKey(){return this.min_().key}maxKey(){return this.right.isEmpty()?this.key:this.right.maxKey()}insert(e,n,s){let r=this;const i=s(e,r.key);return i<0?r=r.copy(null,null,null,r.left.insert(e,n,s),null):i===0?r=r.copy(null,n,null,null,null):r=r.copy(null,null,null,null,r.right.insert(e,n,s)),r.fixUp_()}removeMin_(){if(this.left.isEmpty())return ye.EMPTY_NODE;let e=this;return!e.left.isRed_()&&!e.left.left.isRed_()&&(e=e.moveRedLeft_()),e=e.copy(null,null,null,e.left.removeMin_(),null),e.fixUp_()}remove(e,n){let s,r;if(s=this,n(e,s.key)<0)!s.left.isEmpty()&&!s.left.isRed_()&&!s.left.left.isRed_()&&(s=s.moveRedLeft_()),s=s.copy(null,null,null,s.left.remove(e,n),null);else{if(s.left.isRed_()&&(s=s.rotateRight_()),!s.right.isEmpty()&&!s.right.isRed_()&&!s.right.left.isRed_()&&(s=s.moveRedRight_()),n(e,s.key)===0){if(s.right.isEmpty())return ye.EMPTY_NODE;r=s.right.min_(),s=s.copy(r.key,r.value,null,null,s.right.removeMin_())}s=s.copy(null,null,null,null,s.right.remove(e,n))}return s.fixUp_()}isRed_(){return this.color}fixUp_(){let e=this;return e.right.isRed_()&&!e.left.isRed_()&&(e=e.rotateLeft_()),e.left.isRed_()&&e.left.left.isRed_()&&(e=e.rotateRight_()),e.left.isRed_()&&e.right.isRed_()&&(e=e.colorFlip_()),e}moveRedLeft_(){let e=this.colorFlip_();return e.right.left.isRed_()&&(e=e.copy(null,null,null,null,e.right.rotateRight_()),e=e.rotateLeft_(),e=e.colorFlip_()),e}moveRedRight_(){let e=this.colorFlip_();return e.left.left.isRed_()&&(e=e.rotateRight_(),e=e.colorFlip_()),e}rotateLeft_(){const e=this.copy(null,null,Z.RED,null,this.right.left);return this.right.copy(null,null,this.color,e,null)}rotateRight_(){const e=this.copy(null,null,Z.RED,this.left.right,null);return this.left.copy(null,null,this.color,null,e)}colorFlip_(){const e=this.left.copy(null,null,!this.left.color,null,null),n=this.right.copy(null,null,!this.right.color,null,null);return this.copy(null,null,!this.color,e,n)}checkMaxDepth_(){const e=this.check_();return Math.pow(2,e)<=this.count()+1}check_(){if(this.isRed_()&&this.left.isRed_())throw new Error("Red node has red child("+this.key+","+this.value+")");if(this.right.isRed_())throw new Error("Right child of ("+this.key+","+this.value+") is red");const e=this.left.check_();if(e!==this.right.check_())throw new Error("Black depths differ");return e+(this.isRed_()?0:1)}}Z.RED=!0;Z.BLACK=!1;class Gb{copy(e,n,s,r,i){return this}insert(e,n,s){return new Z(e,n,null)}remove(e,n){return this}count(){return 0}isEmpty(){return!0}inorderTraversal(e){return!1}reverseTraversal(e){return!1}minKey(){return null}maxKey(){return null}check_(){return 0}isRed_(){return!1}}class ye{constructor(e,n=ye.EMPTY_NODE){this.comparator_=e,this.root_=n}insert(e,n){return new ye(this.comparator_,this.root_.insert(e,n,this.comparator_).copy(null,null,Z.BLACK,null,null))}remove(e){return new ye(this.comparator_,this.root_.remove(e,this.comparator_).copy(null,null,Z.BLACK,null,null))}get(e){let n,s=this.root_;for(;!s.isEmpty();){if(n=this.comparator_(e,s.key),n===0)return s.value;n<0?s=s.left:n>0&&(s=s.right)}return null}getPredecessorKey(e){let n,s=this.root_,r=null;for(;!s.isEmpty();)if(n=this.comparator_(e,s.key),n===0){if(s.left.isEmpty())return r?r.key:null;for(s=s.left;!s.right.isEmpty();)s=s.right;return s.key}else n<0?s=s.left:n>0&&(r=s,s=s.right);throw new Error("Attempted to find predecessor key for a nonexistent key.  What gives?")}isEmpty(){return this.root_.isEmpty()}count(){return this.root_.count()}minKey(){return this.root_.minKey()}maxKey(){return this.root_.maxKey()}inorderTraversal(e){return this.root_.inorderTraversal(e)}reverseTraversal(e){return this.root_.reverseTraversal(e)}getIterator(e){return new mr(this.root_,null,this.comparator_,!1,e)}getIteratorFrom(e,n){return new mr(this.root_,e,this.comparator_,!1,n)}getReverseIteratorFrom(e,n){return new mr(this.root_,e,this.comparator_,!0,n)}getReverseIterator(e){return new mr(this.root_,null,this.comparator_,!0,e)}}ye.EMPTY_NODE=new Gb;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function zb(t,e){return dn(t.name,e.name)}function Ka(t,e){return dn(t,e)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let qo;function qb(t){qo=t}const uf=function(t){return typeof t=="number"?"number:"+Hh(t):"string:"+t},df=function(t){if(t.isLeafNode()){const e=t.val();g(typeof e=="string"||typeof e=="number"||typeof e=="object"&&Je(e,".sv"),"Priority must be a string or number.")}else g(t===qo||t.isEmpty(),"priority of unexpected type.");g(t===qo||t.getPriority().isEmpty(),"Priority nodes can't have a priority of their own.")};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Au;class X{static set __childrenNodeConstructor(e){Au=e}static get __childrenNodeConstructor(){return Au}constructor(e,n=X.__childrenNodeConstructor.EMPTY_NODE){this.value_=e,this.priorityNode_=n,this.lazyHash_=null,g(this.value_!==void 0&&this.value_!==null,"LeafNode shouldn't be created with null/undefined value."),df(this.priorityNode_)}isLeafNode(){return!0}getPriority(){return this.priorityNode_}updatePriority(e){return new X(this.value_,e)}getImmediateChild(e){return e===".priority"?this.priorityNode_:X.__childrenNodeConstructor.EMPTY_NODE}getChild(e){return k(e)?this:I(e)===".priority"?this.priorityNode_:X.__childrenNodeConstructor.EMPTY_NODE}hasChild(){return!1}getPredecessorChildName(e,n){return null}updateImmediateChild(e,n){return e===".priority"?this.updatePriority(n):n.isEmpty()&&e!==".priority"?this:X.__childrenNodeConstructor.EMPTY_NODE.updateImmediateChild(e,n).updatePriority(this.priorityNode_)}updateChild(e,n){const s=I(e);return s===null?n:n.isEmpty()&&s!==".priority"?this:(g(s!==".priority"||Ot(e)===1,".priority must be the last token in a path"),this.updateImmediateChild(s,X.__childrenNodeConstructor.EMPTY_NODE.updateChild(F(e),n)))}isEmpty(){return!1}numChildren(){return 0}forEachChild(e,n){return!1}val(e){return e&&!this.getPriority().isEmpty()?{".value":this.getValue(),".priority":this.getPriority().val()}:this.getValue()}hash(){if(this.lazyHash_===null){let e="";this.priorityNode_.isEmpty()||(e+="priority:"+uf(this.priorityNode_.val())+":");const n=typeof this.value_;e+=n+":",n==="number"?e+=Hh(this.value_):e+=this.value_,this.lazyHash_=$h(e)}return this.lazyHash_}getValue(){return this.value_}compareTo(e){return e===X.__childrenNodeConstructor.EMPTY_NODE?1:e instanceof X.__childrenNodeConstructor?-1:(g(e.isLeafNode(),"Unknown node type"),this.compareToLeafNode_(e))}compareToLeafNode_(e){const n=typeof e.value_,s=typeof this.value_,r=X.VALUE_TYPE_ORDER.indexOf(n),i=X.VALUE_TYPE_ORDER.indexOf(s);return g(r>=0,"Unknown leaf type: "+n),g(i>=0,"Unknown leaf type: "+s),r===i?s==="object"?0:this.value_<e.value_?-1:this.value_===e.value_?0:1:i-r}withIndex(){return this}isIndexed(){return!0}equals(e){if(e===this)return!0;if(e.isLeafNode()){const n=e;return this.value_===n.value_&&this.priorityNode_.equals(n.priorityNode_)}else return!1}}X.VALUE_TYPE_ORDER=["object","boolean","number","string"];/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let hf,ff;function Yb(t){hf=t}function Kb(t){ff=t}class Jb extends Ii{compare(e,n){const s=e.node.getPriority(),r=n.node.getPriority(),i=s.compareTo(r);return i===0?dn(e.name,n.name):i}isDefinedOn(e){return!e.getPriority().isEmpty()}indexedValueChanged(e,n){return!e.getPriority().equals(n.getPriority())}minPost(){return T.MIN}maxPost(){return new T(rn,new X("[PRIORITY-POST]",ff))}makePost(e,n){const s=hf(e);return new T(n,new X("[PRIORITY-POST]",s))}toString(){return".priority"}}const z=new Jb;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Qb=Math.log(2);class Xb{constructor(e){const n=i=>parseInt(Math.log(i)/Qb,10),s=i=>parseInt(Array(i+1).join("1"),2);this.count=n(e+1),this.current_=this.count-1;const r=s(this.count);this.bits_=e+1&r}nextBitIsOne(){const e=!(this.bits_&1<<this.current_);return this.current_--,e}}const Gr=function(t,e,n,s){t.sort(e);const r=function(c,l){const u=l-c;let d,h;if(u===0)return null;if(u===1)return d=t[c],h=n?n(d):d,new Z(h,d.node,Z.BLACK,null,null);{const f=parseInt(u/2,10)+c,p=r(c,f),y=r(f+1,l);return d=t[f],h=n?n(d):d,new Z(h,d.node,Z.BLACK,p,y)}},i=function(c){let l=null,u=null,d=t.length;const h=function(p,y){const m=d-p,A=d;d-=p;const N=r(m+1,A),ae=t[m],S=n?n(ae):ae;f(new Z(S,ae.node,y,null,N))},f=function(p){l?(l.left=p,l=p):(u=p,l=p)};for(let p=0;p<c.count;++p){const y=c.nextBitIsOne(),m=Math.pow(2,c.count-(p+1));y?h(m,Z.BLACK):(h(m,Z.BLACK),h(m,Z.RED))}return u},o=new Xb(t.length),a=i(o);return new ye(s||e,a)};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let ho;const pn={};class tt{static get Default(){return g(pn&&z,"ChildrenNode.ts has not been loaded"),ho=ho||new tt({".priority":pn},{".priority":z}),ho}constructor(e,n){this.indexes_=e,this.indexSet_=n}get(e){const n=Pn(this.indexes_,e);if(!n)throw new Error("No index defined for "+e);return n instanceof ye?n:null}hasIndex(e){return Je(this.indexSet_,e.toString())}addIndex(e,n){g(e!==yn,"KeyIndex always exists and isn't meant to be added to the IndexMap.");const s=[];let r=!1;const i=n.getIterator(T.Wrap);let o=i.getNext();for(;o;)r=r||e.isDefinedOn(o.node),s.push(o),o=i.getNext();let a;r?a=Gr(s,e.getCompare()):a=pn;const c=e.toString(),l={...this.indexSet_};l[c]=e;const u={...this.indexes_};return u[c]=a,new tt(u,l)}addToIndexes(e,n){const s=Hr(this.indexes_,(r,i)=>{const o=Pn(this.indexSet_,i);if(g(o,"Missing index implementation for "+i),r===pn)if(o.isDefinedOn(e.node)){const a=[],c=n.getIterator(T.Wrap);let l=c.getNext();for(;l;)l.name!==e.name&&a.push(l),l=c.getNext();return a.push(e),Gr(a,o.getCompare())}else return pn;else{const a=n.get(e.name);let c=r;return a&&(c=c.remove(new T(e.name,a))),c.insert(e,e.node)}});return new tt(s,this.indexSet_)}removeFromIndexes(e,n){const s=Hr(this.indexes_,r=>{if(r===pn)return r;{const i=n.get(e.name);return i?r.remove(new T(e.name,i)):r}});return new tt(s,this.indexSet_)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let cs;class v{static get EMPTY_NODE(){return cs||(cs=new v(new ye(Ka),null,tt.Default))}constructor(e,n,s){this.children_=e,this.priorityNode_=n,this.indexMap_=s,this.lazyHash_=null,this.priorityNode_&&df(this.priorityNode_),this.children_.isEmpty()&&g(!this.priorityNode_||this.priorityNode_.isEmpty(),"An empty node cannot have a priority")}isLeafNode(){return!1}getPriority(){return this.priorityNode_||cs}updatePriority(e){return this.children_.isEmpty()?this:new v(this.children_,e,this.indexMap_)}getImmediateChild(e){if(e===".priority")return this.getPriority();{const n=this.children_.get(e);return n===null?cs:n}}getChild(e){const n=I(e);return n===null?this:this.getImmediateChild(n).getChild(F(e))}hasChild(e){return this.children_.get(e)!==null}updateImmediateChild(e,n){if(g(n,"We should always be passing snapshot nodes"),e===".priority")return this.updatePriority(n);{const s=new T(e,n);let r,i;n.isEmpty()?(r=this.children_.remove(e),i=this.indexMap_.removeFromIndexes(s,this.children_)):(r=this.children_.insert(e,n),i=this.indexMap_.addToIndexes(s,this.children_));const o=r.isEmpty()?cs:this.priorityNode_;return new v(r,o,i)}}updateChild(e,n){const s=I(e);if(s===null)return n;{g(I(e)!==".priority"||Ot(e)===1,".priority must be the last token in a path");const r=this.getImmediateChild(s).updateChild(F(e),n);return this.updateImmediateChild(s,r)}}isEmpty(){return this.children_.isEmpty()}numChildren(){return this.children_.count()}val(e){if(this.isEmpty())return null;const n={};let s=0,r=0,i=!0;if(this.forEachChild(z,(o,a)=>{n[o]=a.val(e),s++,i&&v.INTEGER_REGEXP_.test(o)?r=Math.max(r,Number(o)):i=!1}),!e&&i&&r<2*s){const o=[];for(const a in n)o[a]=n[a];return o}else return e&&!this.getPriority().isEmpty()&&(n[".priority"]=this.getPriority().val()),n}hash(){if(this.lazyHash_===null){let e="";this.getPriority().isEmpty()||(e+="priority:"+uf(this.getPriority().val())+":"),this.forEachChild(z,(n,s)=>{const r=s.hash();r!==""&&(e+=":"+n+":"+r)}),this.lazyHash_=e===""?"":$h(e)}return this.lazyHash_}getPredecessorChildName(e,n,s){const r=this.resolveIndex_(s);if(r){const i=r.getPredecessorKey(new T(e,n));return i?i.name:null}else return this.children_.getPredecessorKey(e)}getFirstChildName(e){const n=this.resolveIndex_(e);if(n){const s=n.minKey();return s&&s.name}else return this.children_.minKey()}getFirstChild(e){const n=this.getFirstChildName(e);return n?new T(n,this.children_.get(n)):null}getLastChildName(e){const n=this.resolveIndex_(e);if(n){const s=n.maxKey();return s&&s.name}else return this.children_.maxKey()}getLastChild(e){const n=this.getLastChildName(e);return n?new T(n,this.children_.get(n)):null}forEachChild(e,n){const s=this.resolveIndex_(e);return s?s.inorderTraversal(r=>n(r.name,r.node)):this.children_.inorderTraversal(n)}getIterator(e){return this.getIteratorFrom(e.minPost(),e)}getIteratorFrom(e,n){const s=this.resolveIndex_(n);if(s)return s.getIteratorFrom(e,r=>r);{const r=this.children_.getIteratorFrom(e.name,T.Wrap);let i=r.peek();for(;i!=null&&n.compare(i,e)<0;)r.getNext(),i=r.peek();return r}}getReverseIterator(e){return this.getReverseIteratorFrom(e.maxPost(),e)}getReverseIteratorFrom(e,n){const s=this.resolveIndex_(n);if(s)return s.getReverseIteratorFrom(e,r=>r);{const r=this.children_.getReverseIteratorFrom(e.name,T.Wrap);let i=r.peek();for(;i!=null&&n.compare(i,e)>0;)r.getNext(),i=r.peek();return r}}compareTo(e){return this.isEmpty()?e.isEmpty()?0:-1:e.isLeafNode()||e.isEmpty()?1:e===tr?-1:0}withIndex(e){if(e===yn||this.indexMap_.hasIndex(e))return this;{const n=this.indexMap_.addIndex(e,this.children_);return new v(this.children_,this.priorityNode_,n)}}isIndexed(e){return e===yn||this.indexMap_.hasIndex(e)}equals(e){if(e===this)return!0;if(e.isLeafNode())return!1;{const n=e;if(this.getPriority().equals(n.getPriority()))if(this.children_.count()===n.children_.count()){const s=this.getIterator(z),r=n.getIterator(z);let i=s.getNext(),o=r.getNext();for(;i&&o;){if(i.name!==o.name||!i.node.equals(o.node))return!1;i=s.getNext(),o=r.getNext()}return i===null&&o===null}else return!1;else return!1}}resolveIndex_(e){return e===yn?null:this.indexMap_.get(e.toString())}}v.INTEGER_REGEXP_=/^(0|[1-9]\d*)$/;class Zb extends v{constructor(){super(new ye(Ka),v.EMPTY_NODE,tt.Default)}compareTo(e){return e===this?0:1}equals(e){return e===this}getPriority(){return this}getImmediateChild(e){return v.EMPTY_NODE}isEmpty(){return!1}}const tr=new Zb;Object.defineProperties(T,{MIN:{value:new T(On,v.EMPTY_NODE)},MAX:{value:new T(rn,tr)}});lf.__EMPTY_NODE=v.EMPTY_NODE;X.__childrenNodeConstructor=v;qb(tr);Kb(tr);/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const eS=!0;function J(t,e=null){if(t===null)return v.EMPTY_NODE;if(typeof t=="object"&&".priority"in t&&(e=t[".priority"]),g(e===null||typeof e=="string"||typeof e=="number"||typeof e=="object"&&".sv"in e,"Invalid priority type found: "+typeof e),typeof t=="object"&&".value"in t&&t[".value"]!==null&&(t=t[".value"]),typeof t!="object"||".sv"in t){const n=t;return new X(n,J(e))}if(!(t instanceof Array)&&eS){const n=[];let s=!1;if(oe(t,(o,a)=>{if(o.substring(0,1)!=="."){const c=J(a);c.isEmpty()||(s=s||!c.getPriority().isEmpty(),n.push(new T(o,c)))}}),n.length===0)return v.EMPTY_NODE;const i=Gr(n,zb,o=>o.name,Ka);if(s){const o=Gr(n,z.getCompare());return new v(i,J(e),new tt({".priority":o},{".priority":z}))}else return new v(i,J(e),tt.Default)}else{let n=v.EMPTY_NODE;return oe(t,(s,r)=>{if(Je(t,s)&&s.substring(0,1)!=="."){const i=J(r);(i.isLeafNode()||!i.isEmpty())&&(n=n.updateImmediateChild(s,i))}}),n.updatePriority(J(e))}}Yb(J);/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class tS extends Ii{constructor(e){super(),this.indexPath_=e,g(!k(e)&&I(e)!==".priority","Can't create PathIndex with empty path or .priority key")}extractChild(e){return e.getChild(this.indexPath_)}isDefinedOn(e){return!e.getChild(this.indexPath_).isEmpty()}compare(e,n){const s=this.extractChild(e.node),r=this.extractChild(n.node),i=s.compareTo(r);return i===0?dn(e.name,n.name):i}makePost(e,n){const s=J(e),r=v.EMPTY_NODE.updateChild(this.indexPath_,s);return new T(n,r)}maxPost(){const e=v.EMPTY_NODE.updateChild(this.indexPath_,tr);return new T(rn,e)}toString(){return Ms(this.indexPath_,0).join("/")}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class nS extends Ii{compare(e,n){const s=e.node.compareTo(n.node);return s===0?dn(e.name,n.name):s}isDefinedOn(e){return!0}indexedValueChanged(e,n){return!e.equals(n)}minPost(){return T.MIN}maxPost(){return T.MAX}makePost(e,n){const s=J(e);return new T(n,s)}toString(){return".value"}}const sS=new nS;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function pf(t){return{type:"value",snapshotNode:t}}function Dn(t,e){return{type:"child_added",snapshotNode:e,childName:t}}function Fs(t,e){return{type:"child_removed",snapshotNode:e,childName:t}}function Us(t,e,n){return{type:"child_changed",snapshotNode:e,childName:t,oldSnap:n}}function rS(t,e){return{type:"child_moved",snapshotNode:e,childName:t}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ja{constructor(e){this.index_=e}updateChild(e,n,s,r,i,o){g(e.isIndexed(this.index_),"A node must be indexed if only a child is updated");const a=e.getImmediateChild(n);return a.getChild(r).equals(s.getChild(r))&&a.isEmpty()===s.isEmpty()||(o!=null&&(s.isEmpty()?e.hasChild(n)?o.trackChildChange(Fs(n,a)):g(e.isLeafNode(),"A child remove without an old child only makes sense on a leaf node"):a.isEmpty()?o.trackChildChange(Dn(n,s)):o.trackChildChange(Us(n,s,a))),e.isLeafNode()&&s.isEmpty())?e:e.updateImmediateChild(n,s).withIndex(this.index_)}updateFullNode(e,n,s){return s!=null&&(e.isLeafNode()||e.forEachChild(z,(r,i)=>{n.hasChild(r)||s.trackChildChange(Fs(r,i))}),n.isLeafNode()||n.forEachChild(z,(r,i)=>{if(e.hasChild(r)){const o=e.getImmediateChild(r);o.equals(i)||s.trackChildChange(Us(r,i,o))}else s.trackChildChange(Dn(r,i))})),n.withIndex(this.index_)}updatePriority(e,n){return e.isEmpty()?v.EMPTY_NODE:e.updatePriority(n)}filtersNodes(){return!1}getIndexedFilter(){return this}getIndex(){return this.index_}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class $s{constructor(e){this.indexedFilter_=new Ja(e.getIndex()),this.index_=e.getIndex(),this.startPost_=$s.getStartPost_(e),this.endPost_=$s.getEndPost_(e),this.startIsInclusive_=!e.startAfterSet_,this.endIsInclusive_=!e.endBeforeSet_}getStartPost(){return this.startPost_}getEndPost(){return this.endPost_}matches(e){const n=this.startIsInclusive_?this.index_.compare(this.getStartPost(),e)<=0:this.index_.compare(this.getStartPost(),e)<0,s=this.endIsInclusive_?this.index_.compare(e,this.getEndPost())<=0:this.index_.compare(e,this.getEndPost())<0;return n&&s}updateChild(e,n,s,r,i,o){return this.matches(new T(n,s))||(s=v.EMPTY_NODE),this.indexedFilter_.updateChild(e,n,s,r,i,o)}updateFullNode(e,n,s){n.isLeafNode()&&(n=v.EMPTY_NODE);let r=n.withIndex(this.index_);r=r.updatePriority(v.EMPTY_NODE);const i=this;return n.forEachChild(z,(o,a)=>{i.matches(new T(o,a))||(r=r.updateImmediateChild(o,v.EMPTY_NODE))}),this.indexedFilter_.updateFullNode(e,r,s)}updatePriority(e,n){return e}filtersNodes(){return!0}getIndexedFilter(){return this.indexedFilter_}getIndex(){return this.index_}static getStartPost_(e){if(e.hasStart()){const n=e.getIndexStartName();return e.getIndex().makePost(e.getIndexStartValue(),n)}else return e.getIndex().minPost()}static getEndPost_(e){if(e.hasEnd()){const n=e.getIndexEndName();return e.getIndex().makePost(e.getIndexEndValue(),n)}else return e.getIndex().maxPost()}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class iS{constructor(e){this.withinDirectionalStart=n=>this.reverse_?this.withinEndPost(n):this.withinStartPost(n),this.withinDirectionalEnd=n=>this.reverse_?this.withinStartPost(n):this.withinEndPost(n),this.withinStartPost=n=>{const s=this.index_.compare(this.rangedFilter_.getStartPost(),n);return this.startIsInclusive_?s<=0:s<0},this.withinEndPost=n=>{const s=this.index_.compare(n,this.rangedFilter_.getEndPost());return this.endIsInclusive_?s<=0:s<0},this.rangedFilter_=new $s(e),this.index_=e.getIndex(),this.limit_=e.getLimit(),this.reverse_=!e.isViewFromLeft(),this.startIsInclusive_=!e.startAfterSet_,this.endIsInclusive_=!e.endBeforeSet_}updateChild(e,n,s,r,i,o){return this.rangedFilter_.matches(new T(n,s))||(s=v.EMPTY_NODE),e.getImmediateChild(n).equals(s)?e:e.numChildren()<this.limit_?this.rangedFilter_.getIndexedFilter().updateChild(e,n,s,r,i,o):this.fullLimitUpdateChild_(e,n,s,i,o)}updateFullNode(e,n,s){let r;if(n.isLeafNode()||n.isEmpty())r=v.EMPTY_NODE.withIndex(this.index_);else if(this.limit_*2<n.numChildren()&&n.isIndexed(this.index_)){r=v.EMPTY_NODE.withIndex(this.index_);let i;this.reverse_?i=n.getReverseIteratorFrom(this.rangedFilter_.getEndPost(),this.index_):i=n.getIteratorFrom(this.rangedFilter_.getStartPost(),this.index_);let o=0;for(;i.hasNext()&&o<this.limit_;){const a=i.getNext();if(this.withinDirectionalStart(a))if(this.withinDirectionalEnd(a))r=r.updateImmediateChild(a.name,a.node),o++;else break;else continue}}else{r=n.withIndex(this.index_),r=r.updatePriority(v.EMPTY_NODE);let i;this.reverse_?i=r.getReverseIterator(this.index_):i=r.getIterator(this.index_);let o=0;for(;i.hasNext();){const a=i.getNext();o<this.limit_&&this.withinDirectionalStart(a)&&this.withinDirectionalEnd(a)?o++:r=r.updateImmediateChild(a.name,v.EMPTY_NODE)}}return this.rangedFilter_.getIndexedFilter().updateFullNode(e,r,s)}updatePriority(e,n){return e}filtersNodes(){return!0}getIndexedFilter(){return this.rangedFilter_.getIndexedFilter()}getIndex(){return this.index_}fullLimitUpdateChild_(e,n,s,r,i){let o;if(this.reverse_){const d=this.index_.getCompare();o=(h,f)=>d(f,h)}else o=this.index_.getCompare();const a=e;g(a.numChildren()===this.limit_,"");const c=new T(n,s),l=this.reverse_?a.getFirstChild(this.index_):a.getLastChild(this.index_),u=this.rangedFilter_.matches(c);if(a.hasChild(n)){const d=a.getImmediateChild(n);let h=r.getChildAfterChild(this.index_,l,this.reverse_);for(;h!=null&&(h.name===n||a.hasChild(h.name));)h=r.getChildAfterChild(this.index_,h,this.reverse_);const f=h==null?1:o(h,c);if(u&&!s.isEmpty()&&f>=0)return i?.trackChildChange(Us(n,s,d)),a.updateImmediateChild(n,s);{i?.trackChildChange(Fs(n,d));const y=a.updateImmediateChild(n,v.EMPTY_NODE);return h!=null&&this.rangedFilter_.matches(h)?(i?.trackChildChange(Dn(h.name,h.node)),y.updateImmediateChild(h.name,h.node)):y}}else return s.isEmpty()?e:u&&o(l,c)>=0?(i!=null&&(i.trackChildChange(Fs(l.name,l.node)),i.trackChildChange(Dn(n,s))),a.updateImmediateChild(n,s).updateImmediateChild(l.name,v.EMPTY_NODE)):e}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Qa{constructor(){this.limitSet_=!1,this.startSet_=!1,this.startNameSet_=!1,this.startAfterSet_=!1,this.endSet_=!1,this.endNameSet_=!1,this.endBeforeSet_=!1,this.limit_=0,this.viewFrom_="",this.indexStartValue_=null,this.indexStartName_="",this.indexEndValue_=null,this.indexEndName_="",this.index_=z}hasStart(){return this.startSet_}isViewFromLeft(){return this.viewFrom_===""?this.startSet_:this.viewFrom_==="l"}getIndexStartValue(){return g(this.startSet_,"Only valid if start has been set"),this.indexStartValue_}getIndexStartName(){return g(this.startSet_,"Only valid if start has been set"),this.startNameSet_?this.indexStartName_:On}hasEnd(){return this.endSet_}getIndexEndValue(){return g(this.endSet_,"Only valid if end has been set"),this.indexEndValue_}getIndexEndName(){return g(this.endSet_,"Only valid if end has been set"),this.endNameSet_?this.indexEndName_:rn}hasLimit(){return this.limitSet_}hasAnchoredLimit(){return this.limitSet_&&this.viewFrom_!==""}getLimit(){return g(this.limitSet_,"Only valid if limit has been set"),this.limit_}getIndex(){return this.index_}loadsAllData(){return!(this.startSet_||this.endSet_||this.limitSet_)}isDefault(){return this.loadsAllData()&&this.index_===z}copy(){const e=new Qa;return e.limitSet_=this.limitSet_,e.limit_=this.limit_,e.startSet_=this.startSet_,e.startAfterSet_=this.startAfterSet_,e.indexStartValue_=this.indexStartValue_,e.startNameSet_=this.startNameSet_,e.indexStartName_=this.indexStartName_,e.endSet_=this.endSet_,e.endBeforeSet_=this.endBeforeSet_,e.indexEndValue_=this.indexEndValue_,e.endNameSet_=this.endNameSet_,e.indexEndName_=this.indexEndName_,e.index_=this.index_,e.viewFrom_=this.viewFrom_,e}}function oS(t){return t.loadsAllData()?new Ja(t.getIndex()):t.hasLimit()?new iS(t):new $s(t)}function Nu(t){const e={};if(t.isDefault())return e;let n;if(t.index_===z?n="$priority":t.index_===sS?n="$value":t.index_===yn?n="$key":(g(t.index_ instanceof tS,"Unrecognized index type!"),n=t.index_.toString()),e.orderBy=Q(n),t.startSet_){const s=t.startAfterSet_?"startAfter":"startAt";e[s]=Q(t.indexStartValue_),t.startNameSet_&&(e[s]+=","+Q(t.indexStartName_))}if(t.endSet_){const s=t.endBeforeSet_?"endBefore":"endAt";e[s]=Q(t.indexEndValue_),t.endNameSet_&&(e[s]+=","+Q(t.indexEndName_))}return t.limitSet_&&(t.isViewFromLeft()?e.limitToFirst=t.limit_:e.limitToLast=t.limit_),e}function Pu(t){const e={};if(t.startSet_&&(e.sp=t.indexStartValue_,t.startNameSet_&&(e.sn=t.indexStartName_),e.sin=!t.startAfterSet_),t.endSet_&&(e.ep=t.indexEndValue_,t.endNameSet_&&(e.en=t.indexEndName_),e.ein=!t.endBeforeSet_),t.limitSet_){e.l=t.limit_;let n=t.viewFrom_;n===""&&(t.isViewFromLeft()?n="l":n="r"),e.vf=n}return t.index_!==z&&(e.i=t.index_.toString()),e}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class zr extends rf{reportStats(e){throw new Error("Method not implemented.")}static getListenId_(e,n){return n!==void 0?"tag$"+n:(g(e._queryParams.isDefault(),"should have a tag if it's not a default query."),e._path.toString())}constructor(e,n,s,r){super(),this.repoInfo_=e,this.onDataUpdate_=n,this.authTokenProvider_=s,this.appCheckTokenProvider_=r,this.log_=er("p:rest:"),this.listens_={}}listen(e,n,s,r){const i=e._path.toString();this.log_("Listen called for "+i+" "+e._queryIdentifier);const o=zr.getListenId_(e,s),a={};this.listens_[o]=a;const c=Nu(e._queryParams);this.restRequest_(i+".json",c,(l,u)=>{let d=u;if(l===404&&(d=null,l=null),l===null&&this.onDataUpdate_(i,d,!1,s),Pn(this.listens_,o)===a){let h;l?l===401?h="permission_denied":h="rest_error:"+l:h="ok",r(h,null)}})}unlisten(e,n){const s=zr.getListenId_(e,n);delete this.listens_[s]}get(e){const n=Nu(e._queryParams),s=e._path.toString(),r=new Qs;return this.restRequest_(s+".json",n,(i,o)=>{let a=o;i===404&&(a=null,i=null),i===null?(this.onDataUpdate_(s,a,!1,null),r.resolve(a)):r.reject(new Error(a))}),r.promise}refreshAuthToken(e){}restRequest_(e,n={},s){return n.format="export",Promise.all([this.authTokenProvider_.getToken(!1),this.appCheckTokenProvider_.getToken(!1)]).then(([r,i])=>{r&&r.accessToken&&(n.auth=r.accessToken),i&&i.token&&(n.ac=i.token);const o=(this.repoInfo_.secure?"https://":"http://")+this.repoInfo_.host+e+"?ns="+this.repoInfo_.namespace+Kn(n);this.log_("Sending REST request for "+o);const a=new XMLHttpRequest;a.onreadystatechange=()=>{if(s&&a.readyState===4){this.log_("REST Response for "+o+" received. status:",a.status,"response:",a.responseText);let c=null;if(a.status>=200&&a.status<300){try{c=Os(a.responseText)}catch{pe("Failed to parse JSON response for "+o+": "+a.responseText)}s(null,c)}else a.status!==401&&a.status!==404&&pe("Got unsuccessful REST response for "+o+" Status: "+a.status),s(a.status);s=null}},a.open("GET",o,!0),a.send()})}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class aS{constructor(){this.rootNode_=v.EMPTY_NODE}getNode(e){return this.rootNode_.getChild(e)}updateSnapshot(e,n){this.rootNode_=this.rootNode_.updateChild(e,n)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function qr(){return{value:null,children:new Map}}function gf(t,e,n){if(k(e))t.value=n,t.children.clear();else if(t.value!==null)t.value=t.value.updateChild(e,n);else{const s=I(e);t.children.has(s)||t.children.set(s,qr());const r=t.children.get(s);e=F(e),gf(r,e,n)}}function Yo(t,e,n){t.value!==null?n(e,t.value):cS(t,(s,r)=>{const i=new D(e.toString()+"/"+s);Yo(r,i,n)})}function cS(t,e){t.children.forEach((n,s)=>{e(s,n)})}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class lS{constructor(e){this.collection_=e,this.last_=null}get(){const e=this.collection_.get(),n={...e};return this.last_&&oe(this.last_,(s,r)=>{n[s]=n[s]-r}),this.last_=e,n}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Lu=10*1e3,uS=30*1e3,dS=300*1e3;class hS{constructor(e,n){this.server_=n,this.statsToReport_={},this.statsListener_=new lS(e);const s=Lu+(uS-Lu)*Math.random();Es(this.reportStats_.bind(this),Math.floor(s))}reportStats_(){const e=this.statsListener_.get(),n={};let s=!1;oe(e,(r,i)=>{i>0&&Je(this.statsToReport_,r)&&(n[r]=i,s=!0)}),s&&this.server_.reportStats(n),Es(this.reportStats_.bind(this),Math.floor(Math.random()*2*dS))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var De;(function(t){t[t.OVERWRITE=0]="OVERWRITE",t[t.MERGE=1]="MERGE",t[t.ACK_USER_WRITE=2]="ACK_USER_WRITE",t[t.LISTEN_COMPLETE=3]="LISTEN_COMPLETE"})(De||(De={}));function Xa(){return{fromUser:!0,fromServer:!1,queryId:null,tagged:!1}}function Za(){return{fromUser:!1,fromServer:!0,queryId:null,tagged:!1}}function ec(t){return{fromUser:!1,fromServer:!0,queryId:t,tagged:!0}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Yr{constructor(e,n,s){this.path=e,this.affectedTree=n,this.revert=s,this.type=De.ACK_USER_WRITE,this.source=Xa()}operationForChild(e){if(k(this.path)){if(this.affectedTree.value!=null)return g(this.affectedTree.children.isEmpty(),"affectedTree should not have overlapping affected paths."),this;{const n=this.affectedTree.subtree(new D(e));return new Yr(P(),n,this.revert)}}else return g(I(this.path)===e,"operationForChild called for unrelated child."),new Yr(F(this.path),this.affectedTree,this.revert)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Bs{constructor(e,n){this.source=e,this.path=n,this.type=De.LISTEN_COMPLETE}operationForChild(e){return k(this.path)?new Bs(this.source,P()):new Bs(this.source,F(this.path))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class on{constructor(e,n,s){this.source=e,this.path=n,this.snap=s,this.type=De.OVERWRITE}operationForChild(e){return k(this.path)?new on(this.source,P(),this.snap.getImmediateChild(e)):new on(this.source,F(this.path),this.snap)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class xn{constructor(e,n,s){this.source=e,this.path=n,this.children=s,this.type=De.MERGE}operationForChild(e){if(k(this.path)){const n=this.children.subtree(new D(e));return n.isEmpty()?null:n.value?new on(this.source,P(),n.value):new xn(this.source,P(),n)}else return g(I(this.path)===e,"Can't get a merge for a child not on the path of the operation"),new xn(this.source,F(this.path),this.children)}toString(){return"Operation("+this.path+": "+this.source.toString()+" merge: "+this.children.toString()+")"}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Dt{constructor(e,n,s){this.node_=e,this.fullyInitialized_=n,this.filtered_=s}isFullyInitialized(){return this.fullyInitialized_}isFiltered(){return this.filtered_}isCompleteForPath(e){if(k(e))return this.isFullyInitialized()&&!this.filtered_;const n=I(e);return this.isCompleteForChild(n)}isCompleteForChild(e){return this.isFullyInitialized()&&!this.filtered_||this.node_.hasChild(e)}getNode(){return this.node_}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class fS{constructor(e){this.query_=e,this.index_=this.query_._queryParams.getIndex()}}function pS(t,e,n,s){const r=[],i=[];return e.forEach(o=>{o.type==="child_changed"&&t.index_.indexedValueChanged(o.oldSnap,o.snapshotNode)&&i.push(rS(o.childName,o.snapshotNode))}),ls(t,r,"child_removed",e,s,n),ls(t,r,"child_added",e,s,n),ls(t,r,"child_moved",i,s,n),ls(t,r,"child_changed",e,s,n),ls(t,r,"value",e,s,n),r}function ls(t,e,n,s,r,i){const o=s.filter(a=>a.type===n);o.sort((a,c)=>mS(t,a,c)),o.forEach(a=>{const c=gS(t,a,i);r.forEach(l=>{l.respondsTo(a.type)&&e.push(l.createEvent(c,t.query_))})})}function gS(t,e,n){return e.type==="value"||e.type==="child_removed"||(e.prevName=n.getPredecessorChildName(e.childName,e.snapshotNode,t.index_)),e}function mS(t,e,n){if(e.childName==null||n.childName==null)throw qn("Should only compare child_ events.");const s=new T(e.childName,e.snapshotNode),r=new T(n.childName,n.snapshotNode);return t.index_.compare(s,r)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ti(t,e){return{eventCache:t,serverCache:e}}function vs(t,e,n,s){return Ti(new Dt(e,n,s),t.serverCache)}function mf(t,e,n,s){return Ti(t.eventCache,new Dt(e,n,s))}function Kr(t){return t.eventCache.isFullyInitialized()?t.eventCache.getNode():null}function an(t){return t.serverCache.isFullyInitialized()?t.serverCache.getNode():null}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let fo;const _S=()=>(fo||(fo=new ye(tb)),fo);class x{static fromObject(e){let n=new x(null);return oe(e,(s,r)=>{n=n.set(new D(s),r)}),n}constructor(e,n=_S()){this.value=e,this.children=n}isEmpty(){return this.value===null&&this.children.isEmpty()}findRootMostMatchingPathAndValue(e,n){if(this.value!=null&&n(this.value))return{path:P(),value:this.value};if(k(e))return null;{const s=I(e),r=this.children.get(s);if(r!==null){const i=r.findRootMostMatchingPathAndValue(F(e),n);return i!=null?{path:G(new D(s),i.path),value:i.value}:null}else return null}}findRootMostValueAndPath(e){return this.findRootMostMatchingPathAndValue(e,()=>!0)}subtree(e){if(k(e))return this;{const n=I(e),s=this.children.get(n);return s!==null?s.subtree(F(e)):new x(null)}}set(e,n){if(k(e))return new x(n,this.children);{const s=I(e),i=(this.children.get(s)||new x(null)).set(F(e),n),o=this.children.insert(s,i);return new x(this.value,o)}}remove(e){if(k(e))return this.children.isEmpty()?new x(null):new x(null,this.children);{const n=I(e),s=this.children.get(n);if(s){const r=s.remove(F(e));let i;return r.isEmpty()?i=this.children.remove(n):i=this.children.insert(n,r),this.value===null&&i.isEmpty()?new x(null):new x(this.value,i)}else return this}}get(e){if(k(e))return this.value;{const n=I(e),s=this.children.get(n);return s?s.get(F(e)):null}}setTree(e,n){if(k(e))return n;{const s=I(e),i=(this.children.get(s)||new x(null)).setTree(F(e),n);let o;return i.isEmpty()?o=this.children.remove(s):o=this.children.insert(s,i),new x(this.value,o)}}fold(e){return this.fold_(P(),e)}fold_(e,n){const s={};return this.children.inorderTraversal((r,i)=>{s[r]=i.fold_(G(e,r),n)}),n(e,this.value,s)}findOnPath(e,n){return this.findOnPath_(e,P(),n)}findOnPath_(e,n,s){const r=this.value?s(n,this.value):!1;if(r)return r;if(k(e))return null;{const i=I(e),o=this.children.get(i);return o?o.findOnPath_(F(e),G(n,i),s):null}}foreachOnPath(e,n){return this.foreachOnPath_(e,P(),n)}foreachOnPath_(e,n,s){if(k(e))return this;{this.value&&s(n,this.value);const r=I(e),i=this.children.get(r);return i?i.foreachOnPath_(F(e),G(n,r),s):new x(null)}}foreach(e){this.foreach_(P(),e)}foreach_(e,n){this.children.inorderTraversal((s,r)=>{r.foreach_(G(e,s),n)}),this.value&&n(e,this.value)}foreachChild(e){this.children.inorderTraversal((n,s)=>{s.value&&e(n,s.value)})}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ue{constructor(e){this.writeTree_=e}static empty(){return new Ue(new x(null))}}function ws(t,e,n){if(k(e))return new Ue(new x(n));{const s=t.writeTree_.findRootMostValueAndPath(e);if(s!=null){const r=s.path;let i=s.value;const o=fe(r,e);return i=i.updateChild(o,n),new Ue(t.writeTree_.set(r,i))}else{const r=new x(n),i=t.writeTree_.setTree(e,r);return new Ue(i)}}}function Ko(t,e,n){let s=t;return oe(n,(r,i)=>{s=ws(s,G(e,r),i)}),s}function Ou(t,e){if(k(e))return Ue.empty();{const n=t.writeTree_.setTree(e,new x(null));return new Ue(n)}}function Jo(t,e){return hn(t,e)!=null}function hn(t,e){const n=t.writeTree_.findRootMostValueAndPath(e);return n!=null?t.writeTree_.get(n.path).getChild(fe(n.path,e)):null}function Du(t){const e=[],n=t.writeTree_.value;return n!=null?n.isLeafNode()||n.forEachChild(z,(s,r)=>{e.push(new T(s,r))}):t.writeTree_.children.inorderTraversal((s,r)=>{r.value!=null&&e.push(new T(s,r.value))}),e}function kt(t,e){if(k(e))return t;{const n=hn(t,e);return n!=null?new Ue(new x(n)):new Ue(t.writeTree_.subtree(e))}}function Qo(t){return t.writeTree_.isEmpty()}function Mn(t,e){return _f(P(),t.writeTree_,e)}function _f(t,e,n){if(e.value!=null)return n.updateChild(t,e.value);{let s=null;return e.children.inorderTraversal((r,i)=>{r===".priority"?(g(i.value!==null,"Priority writes must always be leaf nodes"),s=i.value):n=_f(G(t,r),i,n)}),!n.getChild(t).isEmpty()&&s!==null&&(n=n.updateChild(G(t,".priority"),s)),n}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ri(t,e){return wf(e,t)}function yS(t,e,n,s,r){g(s>t.lastWriteId,"Stacking an older write on top of newer ones"),r===void 0&&(r=!0),t.allWrites.push({path:e,snap:n,writeId:s,visible:r}),r&&(t.visibleWrites=ws(t.visibleWrites,e,n)),t.lastWriteId=s}function ES(t,e,n,s){g(s>t.lastWriteId,"Stacking an older merge on top of newer ones"),t.allWrites.push({path:e,children:n,writeId:s,visible:!0}),t.visibleWrites=Ko(t.visibleWrites,e,n),t.lastWriteId=s}function vS(t,e){for(let n=0;n<t.allWrites.length;n++){const s=t.allWrites[n];if(s.writeId===e)return s}return null}function wS(t,e){const n=t.allWrites.findIndex(a=>a.writeId===e);g(n>=0,"removeWrite called with nonexistent writeId.");const s=t.allWrites[n];t.allWrites.splice(n,1);let r=s.visible,i=!1,o=t.allWrites.length-1;for(;r&&o>=0;){const a=t.allWrites[o];a.visible&&(o>=n&&bS(a,s.path)?r=!1:Ie(s.path,a.path)&&(i=!0)),o--}if(r){if(i)return SS(t),!0;if(s.snap)t.visibleWrites=Ou(t.visibleWrites,s.path);else{const a=s.children;oe(a,c=>{t.visibleWrites=Ou(t.visibleWrites,G(s.path,c))})}return!0}else return!1}function bS(t,e){if(t.snap)return Ie(t.path,e);for(const n in t.children)if(t.children.hasOwnProperty(n)&&Ie(G(t.path,n),e))return!0;return!1}function SS(t){t.visibleWrites=yf(t.allWrites,CS,P()),t.allWrites.length>0?t.lastWriteId=t.allWrites[t.allWrites.length-1].writeId:t.lastWriteId=-1}function CS(t){return t.visible}function yf(t,e,n){let s=Ue.empty();for(let r=0;r<t.length;++r){const i=t[r];if(e(i)){const o=i.path;let a;if(i.snap)Ie(n,o)?(a=fe(n,o),s=ws(s,a,i.snap)):Ie(o,n)&&(a=fe(o,n),s=ws(s,P(),i.snap.getChild(a)));else if(i.children){if(Ie(n,o))a=fe(n,o),s=Ko(s,a,i.children);else if(Ie(o,n))if(a=fe(o,n),k(a))s=Ko(s,P(),i.children);else{const c=Pn(i.children,I(a));if(c){const l=c.getChild(F(a));s=ws(s,P(),l)}}}else throw qn("WriteRecord should have .snap or .children")}}return s}function Ef(t,e,n,s,r){if(!s&&!r){const i=hn(t.visibleWrites,e);if(i!=null)return i;{const o=kt(t.visibleWrites,e);if(Qo(o))return n;if(n==null&&!Jo(o,P()))return null;{const a=n||v.EMPTY_NODE;return Mn(o,a)}}}else{const i=kt(t.visibleWrites,e);if(!r&&Qo(i))return n;if(!r&&n==null&&!Jo(i,P()))return null;{const o=function(l){return(l.visible||r)&&(!s||!~s.indexOf(l.writeId))&&(Ie(l.path,e)||Ie(e,l.path))},a=yf(t.allWrites,o,e),c=n||v.EMPTY_NODE;return Mn(a,c)}}}function IS(t,e,n){let s=v.EMPTY_NODE;const r=hn(t.visibleWrites,e);if(r)return r.isLeafNode()||r.forEachChild(z,(i,o)=>{s=s.updateImmediateChild(i,o)}),s;if(n){const i=kt(t.visibleWrites,e);return n.forEachChild(z,(o,a)=>{const c=Mn(kt(i,new D(o)),a);s=s.updateImmediateChild(o,c)}),Du(i).forEach(o=>{s=s.updateImmediateChild(o.name,o.node)}),s}else{const i=kt(t.visibleWrites,e);return Du(i).forEach(o=>{s=s.updateImmediateChild(o.name,o.node)}),s}}function TS(t,e,n,s,r){g(s||r,"Either existingEventSnap or existingServerSnap must exist");const i=G(e,n);if(Jo(t.visibleWrites,i))return null;{const o=kt(t.visibleWrites,i);return Qo(o)?r.getChild(n):Mn(o,r.getChild(n))}}function RS(t,e,n,s){const r=G(e,n),i=hn(t.visibleWrites,r);if(i!=null)return i;if(s.isCompleteForChild(n)){const o=kt(t.visibleWrites,r);return Mn(o,s.getNode().getImmediateChild(n))}else return null}function kS(t,e){return hn(t.visibleWrites,e)}function AS(t,e,n,s,r,i,o){let a;const c=kt(t.visibleWrites,e),l=hn(c,P());if(l!=null)a=l;else if(n!=null)a=Mn(c,n);else return[];if(a=a.withIndex(o),!a.isEmpty()&&!a.isLeafNode()){const u=[],d=o.getCompare(),h=i?a.getReverseIteratorFrom(s,o):a.getIteratorFrom(s,o);let f=h.getNext();for(;f&&u.length<r;)d(f,s)!==0&&u.push(f),f=h.getNext();return u}else return[]}function NS(){return{visibleWrites:Ue.empty(),allWrites:[],lastWriteId:-1}}function Jr(t,e,n,s){return Ef(t.writeTree,t.treePath,e,n,s)}function tc(t,e){return IS(t.writeTree,t.treePath,e)}function xu(t,e,n,s){return TS(t.writeTree,t.treePath,e,n,s)}function Qr(t,e){return kS(t.writeTree,G(t.treePath,e))}function PS(t,e,n,s,r,i){return AS(t.writeTree,t.treePath,e,n,s,r,i)}function nc(t,e,n){return RS(t.writeTree,t.treePath,e,n)}function vf(t,e){return wf(G(t.treePath,e),t.writeTree)}function wf(t,e){return{treePath:t,writeTree:e}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class LS{constructor(){this.changeMap=new Map}trackChildChange(e){const n=e.type,s=e.childName;g(n==="child_added"||n==="child_changed"||n==="child_removed","Only child changes supported for tracking"),g(s!==".priority","Only non-priority child changes can be tracked.");const r=this.changeMap.get(s);if(r){const i=r.type;if(n==="child_added"&&i==="child_removed")this.changeMap.set(s,Us(s,e.snapshotNode,r.snapshotNode));else if(n==="child_removed"&&i==="child_added")this.changeMap.delete(s);else if(n==="child_removed"&&i==="child_changed")this.changeMap.set(s,Fs(s,r.oldSnap));else if(n==="child_changed"&&i==="child_added")this.changeMap.set(s,Dn(s,e.snapshotNode));else if(n==="child_changed"&&i==="child_changed")this.changeMap.set(s,Us(s,e.snapshotNode,r.oldSnap));else throw qn("Illegal combination of changes: "+e+" occurred after "+r)}else this.changeMap.set(s,e)}getChanges(){return Array.from(this.changeMap.values())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class OS{getCompleteChild(e){return null}getChildAfterChild(e,n,s){return null}}const bf=new OS;class sc{constructor(e,n,s=null){this.writes_=e,this.viewCache_=n,this.optCompleteServerCache_=s}getCompleteChild(e){const n=this.viewCache_.eventCache;if(n.isCompleteForChild(e))return n.getNode().getImmediateChild(e);{const s=this.optCompleteServerCache_!=null?new Dt(this.optCompleteServerCache_,!0,!1):this.viewCache_.serverCache;return nc(this.writes_,e,s)}}getChildAfterChild(e,n,s){const r=this.optCompleteServerCache_!=null?this.optCompleteServerCache_:an(this.viewCache_),i=PS(this.writes_,r,n,1,s,e);return i.length===0?null:i[0]}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function DS(t){return{filter:t}}function xS(t,e){g(e.eventCache.getNode().isIndexed(t.filter.getIndex()),"Event snap not indexed"),g(e.serverCache.getNode().isIndexed(t.filter.getIndex()),"Server snap not indexed")}function MS(t,e,n,s,r){const i=new LS;let o,a;if(n.type===De.OVERWRITE){const l=n;l.source.fromUser?o=Xo(t,e,l.path,l.snap,s,r,i):(g(l.source.fromServer,"Unknown source."),a=l.source.tagged||e.serverCache.isFiltered()&&!k(l.path),o=Xr(t,e,l.path,l.snap,s,r,a,i))}else if(n.type===De.MERGE){const l=n;l.source.fromUser?o=US(t,e,l.path,l.children,s,r,i):(g(l.source.fromServer,"Unknown source."),a=l.source.tagged||e.serverCache.isFiltered(),o=Zo(t,e,l.path,l.children,s,r,a,i))}else if(n.type===De.ACK_USER_WRITE){const l=n;l.revert?o=HS(t,e,l.path,s,r,i):o=$S(t,e,l.path,l.affectedTree,s,r,i)}else if(n.type===De.LISTEN_COMPLETE)o=BS(t,e,n.path,s,i);else throw qn("Unknown operation type: "+n.type);const c=i.getChanges();return FS(e,o,c),{viewCache:o,changes:c}}function FS(t,e,n){const s=e.eventCache;if(s.isFullyInitialized()){const r=s.getNode().isLeafNode()||s.getNode().isEmpty(),i=Kr(t);(n.length>0||!t.eventCache.isFullyInitialized()||r&&!s.getNode().equals(i)||!s.getNode().getPriority().equals(i.getPriority()))&&n.push(pf(Kr(e)))}}function Sf(t,e,n,s,r,i){const o=e.eventCache;if(Qr(s,n)!=null)return e;{let a,c;if(k(n))if(g(e.serverCache.isFullyInitialized(),"If change path is empty, we must have complete server data"),e.serverCache.isFiltered()){const l=an(e),u=l instanceof v?l:v.EMPTY_NODE,d=tc(s,u);a=t.filter.updateFullNode(e.eventCache.getNode(),d,i)}else{const l=Jr(s,an(e));a=t.filter.updateFullNode(e.eventCache.getNode(),l,i)}else{const l=I(n);if(l===".priority"){g(Ot(n)===1,"Can't have a priority with additional path components");const u=o.getNode();c=e.serverCache.getNode();const d=xu(s,n,u,c);d!=null?a=t.filter.updatePriority(u,d):a=o.getNode()}else{const u=F(n);let d;if(o.isCompleteForChild(l)){c=e.serverCache.getNode();const h=xu(s,n,o.getNode(),c);h!=null?d=o.getNode().getImmediateChild(l).updateChild(u,h):d=o.getNode().getImmediateChild(l)}else d=nc(s,l,e.serverCache);d!=null?a=t.filter.updateChild(o.getNode(),l,d,u,r,i):a=o.getNode()}}return vs(e,a,o.isFullyInitialized()||k(n),t.filter.filtersNodes())}}function Xr(t,e,n,s,r,i,o,a){const c=e.serverCache;let l;const u=o?t.filter:t.filter.getIndexedFilter();if(k(n))l=u.updateFullNode(c.getNode(),s,null);else if(u.filtersNodes()&&!c.isFiltered()){const f=c.getNode().updateChild(n,s);l=u.updateFullNode(c.getNode(),f,null)}else{const f=I(n);if(!c.isCompleteForPath(n)&&Ot(n)>1)return e;const p=F(n),m=c.getNode().getImmediateChild(f).updateChild(p,s);f===".priority"?l=u.updatePriority(c.getNode(),m):l=u.updateChild(c.getNode(),f,m,p,bf,null)}const d=mf(e,l,c.isFullyInitialized()||k(n),u.filtersNodes()),h=new sc(r,d,i);return Sf(t,d,n,r,h,a)}function Xo(t,e,n,s,r,i,o){const a=e.eventCache;let c,l;const u=new sc(r,e,i);if(k(n))l=t.filter.updateFullNode(e.eventCache.getNode(),s,o),c=vs(e,l,!0,t.filter.filtersNodes());else{const d=I(n);if(d===".priority")l=t.filter.updatePriority(e.eventCache.getNode(),s),c=vs(e,l,a.isFullyInitialized(),a.isFiltered());else{const h=F(n),f=a.getNode().getImmediateChild(d);let p;if(k(h))p=s;else{const y=u.getCompleteChild(d);y!=null?za(h)===".priority"&&y.getChild(af(h)).isEmpty()?p=y:p=y.updateChild(h,s):p=v.EMPTY_NODE}if(f.equals(p))c=e;else{const y=t.filter.updateChild(a.getNode(),d,p,h,u,o);c=vs(e,y,a.isFullyInitialized(),t.filter.filtersNodes())}}}return c}function Mu(t,e){return t.eventCache.isCompleteForChild(e)}function US(t,e,n,s,r,i,o){let a=e;return s.foreach((c,l)=>{const u=G(n,c);Mu(e,I(u))&&(a=Xo(t,a,u,l,r,i,o))}),s.foreach((c,l)=>{const u=G(n,c);Mu(e,I(u))||(a=Xo(t,a,u,l,r,i,o))}),a}function Fu(t,e,n){return n.foreach((s,r)=>{e=e.updateChild(s,r)}),e}function Zo(t,e,n,s,r,i,o,a){if(e.serverCache.getNode().isEmpty()&&!e.serverCache.isFullyInitialized())return e;let c=e,l;k(n)?l=s:l=new x(null).setTree(n,s);const u=e.serverCache.getNode();return l.children.inorderTraversal((d,h)=>{if(u.hasChild(d)){const f=e.serverCache.getNode().getImmediateChild(d),p=Fu(t,f,h);c=Xr(t,c,new D(d),p,r,i,o,a)}}),l.children.inorderTraversal((d,h)=>{const f=!e.serverCache.isCompleteForChild(d)&&h.value===null;if(!u.hasChild(d)&&!f){const p=e.serverCache.getNode().getImmediateChild(d),y=Fu(t,p,h);c=Xr(t,c,new D(d),y,r,i,o,a)}}),c}function $S(t,e,n,s,r,i,o){if(Qr(r,n)!=null)return e;const a=e.serverCache.isFiltered(),c=e.serverCache;if(s.value!=null){if(k(n)&&c.isFullyInitialized()||c.isCompleteForPath(n))return Xr(t,e,n,c.getNode().getChild(n),r,i,a,o);if(k(n)){let l=new x(null);return c.getNode().forEachChild(yn,(u,d)=>{l=l.set(new D(u),d)}),Zo(t,e,n,l,r,i,a,o)}else return e}else{let l=new x(null);return s.foreach((u,d)=>{const h=G(n,u);c.isCompleteForPath(h)&&(l=l.set(u,c.getNode().getChild(h)))}),Zo(t,e,n,l,r,i,a,o)}}function BS(t,e,n,s,r){const i=e.serverCache,o=mf(e,i.getNode(),i.isFullyInitialized()||k(n),i.isFiltered());return Sf(t,o,n,s,bf,r)}function HS(t,e,n,s,r,i){let o;if(Qr(s,n)!=null)return e;{const a=new sc(s,e,r),c=e.eventCache.getNode();let l;if(k(n)||I(n)===".priority"){let u;if(e.serverCache.isFullyInitialized())u=Jr(s,an(e));else{const d=e.serverCache.getNode();g(d instanceof v,"serverChildren would be complete if leaf node"),u=tc(s,d)}u=u,l=t.filter.updateFullNode(c,u,i)}else{const u=I(n);let d=nc(s,u,e.serverCache);d==null&&e.serverCache.isCompleteForChild(u)&&(d=c.getImmediateChild(u)),d!=null?l=t.filter.updateChild(c,u,d,F(n),a,i):e.eventCache.getNode().hasChild(u)?l=t.filter.updateChild(c,u,v.EMPTY_NODE,F(n),a,i):l=c,l.isEmpty()&&e.serverCache.isFullyInitialized()&&(o=Jr(s,an(e)),o.isLeafNode()&&(l=t.filter.updateFullNode(l,o,i)))}return o=e.serverCache.isFullyInitialized()||Qr(s,P())!=null,vs(e,l,o,t.filter.filtersNodes())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class WS{constructor(e,n){this.query_=e,this.eventRegistrations_=[];const s=this.query_._queryParams,r=new Ja(s.getIndex()),i=oS(s);this.processor_=DS(i);const o=n.serverCache,a=n.eventCache,c=r.updateFullNode(v.EMPTY_NODE,o.getNode(),null),l=i.updateFullNode(v.EMPTY_NODE,a.getNode(),null),u=new Dt(c,o.isFullyInitialized(),r.filtersNodes()),d=new Dt(l,a.isFullyInitialized(),i.filtersNodes());this.viewCache_=Ti(d,u),this.eventGenerator_=new fS(this.query_)}get query(){return this.query_}}function VS(t){return t.viewCache_.serverCache.getNode()}function jS(t){return Kr(t.viewCache_)}function GS(t,e){const n=an(t.viewCache_);return n&&(t.query._queryParams.loadsAllData()||!k(e)&&!n.getImmediateChild(I(e)).isEmpty())?n.getChild(e):null}function Uu(t){return t.eventRegistrations_.length===0}function zS(t,e){t.eventRegistrations_.push(e)}function $u(t,e,n){const s=[];if(n){g(e==null,"A cancel should cancel all event registrations.");const r=t.query._path;t.eventRegistrations_.forEach(i=>{const o=i.createCancelEvent(n,r);o&&s.push(o)})}if(e){let r=[];for(let i=0;i<t.eventRegistrations_.length;++i){const o=t.eventRegistrations_[i];if(!o.matches(e))r.push(o);else if(e.hasAnyCallback()){r=r.concat(t.eventRegistrations_.slice(i+1));break}}t.eventRegistrations_=r}else t.eventRegistrations_=[];return s}function Bu(t,e,n,s){e.type===De.MERGE&&e.source.queryId!==null&&(g(an(t.viewCache_),"We should always have a full cache before handling merges"),g(Kr(t.viewCache_),"Missing event cache, even though we have a server cache"));const r=t.viewCache_,i=MS(t.processor_,r,e,n,s);return xS(t.processor_,i.viewCache),g(i.viewCache.serverCache.isFullyInitialized()||!r.serverCache.isFullyInitialized(),"Once a server snap is complete, it should never go back"),t.viewCache_=i.viewCache,Cf(t,i.changes,i.viewCache.eventCache.getNode(),null)}function qS(t,e){const n=t.viewCache_.eventCache,s=[];return n.getNode().isLeafNode()||n.getNode().forEachChild(z,(i,o)=>{s.push(Dn(i,o))}),n.isFullyInitialized()&&s.push(pf(n.getNode())),Cf(t,s,n.getNode(),e)}function Cf(t,e,n,s){const r=s?[s]:t.eventRegistrations_;return pS(t.eventGenerator_,e,n,r)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Zr;class If{constructor(){this.views=new Map}}function YS(t){g(!Zr,"__referenceConstructor has already been defined"),Zr=t}function KS(){return g(Zr,"Reference.ts has not been loaded"),Zr}function JS(t){return t.views.size===0}function rc(t,e,n,s){const r=e.source.queryId;if(r!==null){const i=t.views.get(r);return g(i!=null,"SyncTree gave us an op for an invalid query."),Bu(i,e,n,s)}else{let i=[];for(const o of t.views.values())i=i.concat(Bu(o,e,n,s));return i}}function Tf(t,e,n,s,r){const i=e._queryIdentifier,o=t.views.get(i);if(!o){let a=Jr(n,r?s:null),c=!1;a?c=!0:s instanceof v?(a=tc(n,s),c=!1):(a=v.EMPTY_NODE,c=!1);const l=Ti(new Dt(a,c,!1),new Dt(s,r,!1));return new WS(e,l)}return o}function QS(t,e,n,s,r,i){const o=Tf(t,e,s,r,i);return t.views.has(e._queryIdentifier)||t.views.set(e._queryIdentifier,o),zS(o,n),qS(o,n)}function XS(t,e,n,s){const r=e._queryIdentifier,i=[];let o=[];const a=xt(t);if(r==="default")for(const[c,l]of t.views.entries())o=o.concat($u(l,n,s)),Uu(l)&&(t.views.delete(c),l.query._queryParams.loadsAllData()||i.push(l.query));else{const c=t.views.get(r);c&&(o=o.concat($u(c,n,s)),Uu(c)&&(t.views.delete(r),c.query._queryParams.loadsAllData()||i.push(c.query)))}return a&&!xt(t)&&i.push(new(KS())(e._repo,e._path)),{removed:i,events:o}}function Rf(t){const e=[];for(const n of t.views.values())n.query._queryParams.loadsAllData()||e.push(n);return e}function At(t,e){let n=null;for(const s of t.views.values())n=n||GS(s,e);return n}function kf(t,e){if(e._queryParams.loadsAllData())return ki(t);{const s=e._queryIdentifier;return t.views.get(s)}}function Af(t,e){return kf(t,e)!=null}function xt(t){return ki(t)!=null}function ki(t){for(const e of t.views.values())if(e.query._queryParams.loadsAllData())return e;return null}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let ei;function ZS(t){g(!ei,"__referenceConstructor has already been defined"),ei=t}function eC(){return g(ei,"Reference.ts has not been loaded"),ei}let tC=1;class Hu{constructor(e){this.listenProvider_=e,this.syncPointTree_=new x(null),this.pendingWriteTree_=NS(),this.tagToQueryMap=new Map,this.queryToTagMap=new Map}}function Nf(t,e,n,s,r){return yS(t.pendingWriteTree_,e,n,s,r),r?Xn(t,new on(Xa(),e,n)):[]}function nC(t,e,n,s){ES(t.pendingWriteTree_,e,n,s);const r=x.fromObject(n);return Xn(t,new xn(Xa(),e,r))}function Et(t,e,n=!1){const s=vS(t.pendingWriteTree_,e);if(wS(t.pendingWriteTree_,e)){let i=new x(null);return s.snap!=null?i=i.set(P(),!0):oe(s.children,o=>{i=i.set(new D(o),!0)}),Xn(t,new Yr(s.path,i,n))}else return[]}function nr(t,e,n){return Xn(t,new on(Za(),e,n))}function sC(t,e,n){const s=x.fromObject(n);return Xn(t,new xn(Za(),e,s))}function rC(t,e){return Xn(t,new Bs(Za(),e))}function iC(t,e,n){const s=oc(t,n);if(s){const r=ac(s),i=r.path,o=r.queryId,a=fe(i,e),c=new Bs(ec(o),a);return cc(t,i,c)}else return[]}function ti(t,e,n,s,r=!1){const i=e._path,o=t.syncPointTree_.get(i);let a=[];if(o&&(e._queryIdentifier==="default"||Af(o,e))){const c=XS(o,e,n,s);JS(o)&&(t.syncPointTree_=t.syncPointTree_.remove(i));const l=c.removed;if(a=c.events,!r){const u=l.findIndex(h=>h._queryParams.loadsAllData())!==-1,d=t.syncPointTree_.findOnPath(i,(h,f)=>xt(f));if(u&&!d){const h=t.syncPointTree_.subtree(i);if(!h.isEmpty()){const f=cC(h);for(let p=0;p<f.length;++p){const y=f[p],m=y.query,A=Df(t,y);t.listenProvider_.startListening(bs(m),Hs(t,m),A.hashFn,A.onComplete)}}}!d&&l.length>0&&!s&&(u?t.listenProvider_.stopListening(bs(e),null):l.forEach(h=>{const f=t.queryToTagMap.get(Ai(h));t.listenProvider_.stopListening(bs(h),f)}))}lC(t,l)}return a}function Pf(t,e,n,s){const r=oc(t,s);if(r!=null){const i=ac(r),o=i.path,a=i.queryId,c=fe(o,e),l=new on(ec(a),c,n);return cc(t,o,l)}else return[]}function oC(t,e,n,s){const r=oc(t,s);if(r){const i=ac(r),o=i.path,a=i.queryId,c=fe(o,e),l=x.fromObject(n),u=new xn(ec(a),c,l);return cc(t,o,u)}else return[]}function ea(t,e,n,s=!1){const r=e._path;let i=null,o=!1;t.syncPointTree_.foreachOnPath(r,(h,f)=>{const p=fe(h,r);i=i||At(f,p),o=o||xt(f)});let a=t.syncPointTree_.get(r);a?(o=o||xt(a),i=i||At(a,P())):(a=new If,t.syncPointTree_=t.syncPointTree_.set(r,a));let c;i!=null?c=!0:(c=!1,i=v.EMPTY_NODE,t.syncPointTree_.subtree(r).foreachChild((f,p)=>{const y=At(p,P());y&&(i=i.updateImmediateChild(f,y))}));const l=Af(a,e);if(!l&&!e._queryParams.loadsAllData()){const h=Ai(e);g(!t.queryToTagMap.has(h),"View does not exist, but we have a tag");const f=uC();t.queryToTagMap.set(h,f),t.tagToQueryMap.set(f,h)}const u=Ri(t.pendingWriteTree_,r);let d=QS(a,e,n,u,i,c);if(!l&&!o&&!s){const h=kf(a,e);d=d.concat(dC(t,e,h))}return d}function ic(t,e,n){const r=t.pendingWriteTree_,i=t.syncPointTree_.findOnPath(e,(o,a)=>{const c=fe(o,e),l=At(a,c);if(l)return l});return Ef(r,e,i,n,!0)}function aC(t,e){const n=e._path;let s=null;t.syncPointTree_.foreachOnPath(n,(l,u)=>{const d=fe(l,n);s=s||At(u,d)});let r=t.syncPointTree_.get(n);r?s=s||At(r,P()):(r=new If,t.syncPointTree_=t.syncPointTree_.set(n,r));const i=s!=null,o=i?new Dt(s,!0,!1):null,a=Ri(t.pendingWriteTree_,e._path),c=Tf(r,e,a,i?o.getNode():v.EMPTY_NODE,i);return jS(c)}function Xn(t,e){return Lf(e,t.syncPointTree_,null,Ri(t.pendingWriteTree_,P()))}function Lf(t,e,n,s){if(k(t.path))return Of(t,e,n,s);{const r=e.get(P());n==null&&r!=null&&(n=At(r,P()));let i=[];const o=I(t.path),a=t.operationForChild(o),c=e.children.get(o);if(c&&a){const l=n?n.getImmediateChild(o):null,u=vf(s,o);i=i.concat(Lf(a,c,l,u))}return r&&(i=i.concat(rc(r,t,s,n))),i}}function Of(t,e,n,s){const r=e.get(P());n==null&&r!=null&&(n=At(r,P()));let i=[];return e.children.inorderTraversal((o,a)=>{const c=n?n.getImmediateChild(o):null,l=vf(s,o),u=t.operationForChild(o);u&&(i=i.concat(Of(u,a,c,l)))}),r&&(i=i.concat(rc(r,t,s,n))),i}function Df(t,e){const n=e.query,s=Hs(t,n);return{hashFn:()=>(VS(e)||v.EMPTY_NODE).hash(),onComplete:r=>{if(r==="ok")return s?iC(t,n._path,s):rC(t,n._path);{const i=rb(r,n);return ti(t,n,null,i)}}}}function Hs(t,e){const n=Ai(e);return t.queryToTagMap.get(n)}function Ai(t){return t._path.toString()+"$"+t._queryIdentifier}function oc(t,e){return t.tagToQueryMap.get(e)}function ac(t){const e=t.indexOf("$");return g(e!==-1&&e<t.length-1,"Bad queryKey."),{queryId:t.substr(e+1),path:new D(t.substr(0,e))}}function cc(t,e,n){const s=t.syncPointTree_.get(e);g(s,"Missing sync point for query tag that we're tracking");const r=Ri(t.pendingWriteTree_,e);return rc(s,n,r,null)}function cC(t){return t.fold((e,n,s)=>{if(n&&xt(n))return[ki(n)];{let r=[];return n&&(r=Rf(n)),oe(s,(i,o)=>{r=r.concat(o)}),r}})}function bs(t){return t._queryParams.loadsAllData()&&!t._queryParams.isDefault()?new(eC())(t._repo,t._path):t}function lC(t,e){for(let n=0;n<e.length;++n){const s=e[n];if(!s._queryParams.loadsAllData()){const r=Ai(s),i=t.queryToTagMap.get(r);t.queryToTagMap.delete(r),t.tagToQueryMap.delete(i)}}}function uC(){return tC++}function dC(t,e,n){const s=e._path,r=Hs(t,e),i=Df(t,n),o=t.listenProvider_.startListening(bs(e),r,i.hashFn,i.onComplete),a=t.syncPointTree_.subtree(s);if(r)g(!xt(a.value),"If we're adding a query, it shouldn't be shadowed");else{const c=a.fold((l,u,d)=>{if(!k(l)&&u&&xt(u))return[ki(u).query];{let h=[];return u&&(h=h.concat(Rf(u).map(f=>f.query))),oe(d,(f,p)=>{h=h.concat(p)}),h}});for(let l=0;l<c.length;++l){const u=c[l];t.listenProvider_.stopListening(bs(u),Hs(t,u))}}return o}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class lc{constructor(e){this.node_=e}getImmediateChild(e){const n=this.node_.getImmediateChild(e);return new lc(n)}node(){return this.node_}}class uc{constructor(e,n){this.syncTree_=e,this.path_=n}getImmediateChild(e){const n=G(this.path_,e);return new uc(this.syncTree_,n)}node(){return ic(this.syncTree_,this.path_)}}const hC=function(t){return t=t||{},t.timestamp=t.timestamp||new Date().getTime(),t},Wu=function(t,e,n){if(!t||typeof t!="object")return t;if(g(".sv"in t,"Unexpected leaf node or priority contents"),typeof t[".sv"]=="string")return fC(t[".sv"],e,n);if(typeof t[".sv"]=="object")return pC(t[".sv"],e);g(!1,"Unexpected server value: "+JSON.stringify(t,null,2))},fC=function(t,e,n){switch(t){case"timestamp":return n.timestamp;default:g(!1,"Unexpected server value: "+t)}},pC=function(t,e,n){t.hasOwnProperty("increment")||g(!1,"Unexpected server value: "+JSON.stringify(t,null,2));const s=t.increment;typeof s!="number"&&g(!1,"Unexpected increment value: "+s);const r=e.node();if(g(r!==null&&typeof r<"u","Expected ChildrenNode.EMPTY_NODE for nulls"),!r.isLeafNode())return s;const o=r.getValue();return typeof o!="number"?s:o+s},xf=function(t,e,n,s){return dc(e,new uc(n,t),s)},Mf=function(t,e,n){return dc(t,new lc(e),n)};function dc(t,e,n){const s=t.getPriority().val(),r=Wu(s,e.getImmediateChild(".priority"),n);let i;if(t.isLeafNode()){const o=t,a=Wu(o.getValue(),e,n);return a!==o.getValue()||r!==o.getPriority().val()?new X(a,J(r)):t}else{const o=t;return i=o,r!==o.getPriority().val()&&(i=i.updatePriority(new X(r))),o.forEachChild(z,(a,c)=>{const l=dc(c,e.getImmediateChild(a),n);l!==c&&(i=i.updateImmediateChild(a,l))}),i}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class hc{constructor(e="",n=null,s={children:{},childCount:0}){this.name=e,this.parent=n,this.node=s}}function fc(t,e){let n=e instanceof D?e:new D(e),s=t,r=I(n);for(;r!==null;){const i=Pn(s.node.children,r)||{children:{},childCount:0};s=new hc(r,s,i),n=F(n),r=I(n)}return s}function Zn(t){return t.node.value}function Ff(t,e){t.node.value=e,ta(t)}function Uf(t){return t.node.childCount>0}function gC(t){return Zn(t)===void 0&&!Uf(t)}function Ni(t,e){oe(t.node.children,(n,s)=>{e(new hc(n,t,s))})}function $f(t,e,n,s){n&&e(t),Ni(t,r=>{$f(r,e,!0)})}function mC(t,e,n){let s=t.parent;for(;s!==null;){if(e(s))return!0;s=s.parent}return!1}function sr(t){return new D(t.parent===null?t.name:sr(t.parent)+"/"+t.name)}function ta(t){t.parent!==null&&_C(t.parent,t.name,t)}function _C(t,e,n){const s=gC(n),r=Je(t.node.children,e);s&&r?(delete t.node.children[e],t.node.childCount--,ta(t)):!s&&!r&&(t.node.children[e]=n.node,t.node.childCount++,ta(t))}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const yC=/[\[\].#$\/\u0000-\u001F\u007F]/,EC=/[\[\].#$\u0000-\u001F\u007F]/,po=10*1024*1024,pc=function(t){return typeof t=="string"&&t.length!==0&&!yC.test(t)},Bf=function(t){return typeof t=="string"&&t.length!==0&&!EC.test(t)},vC=function(t){return t&&(t=t.replace(/^\/*\.info(\/|$)/,"/")),Bf(t)},wC=function(t){return t===null||typeof t=="string"||typeof t=="number"&&!Ha(t)||t&&typeof t=="object"&&Je(t,".sv")},Hf=function(t,e,n,s){s&&e===void 0||Pi(Si(t,"value"),e,n)},Pi=function(t,e,n){const s=n instanceof D?new Ub(n,t):n;if(e===void 0)throw new Error(t+"contains undefined "+jt(s));if(typeof e=="function")throw new Error(t+"contains a function "+jt(s)+" with contents = "+e.toString());if(Ha(e))throw new Error(t+"contains "+e.toString()+" "+jt(s));if(typeof e=="string"&&e.length>po/3&&Ci(e)>po)throw new Error(t+"contains a string greater than "+po+" utf8 bytes "+jt(s)+" ('"+e.substring(0,50)+"...')");if(e&&typeof e=="object"){let r=!1,i=!1;if(oe(e,(o,a)=>{if(o===".value")r=!0;else if(o!==".priority"&&o!==".sv"&&(i=!0,!pc(o)))throw new Error(t+" contains an invalid key ("+o+") "+jt(s)+`.  Keys must be non-empty strings and can't contain ".", "#", "$", "/", "[", or "]"`);$b(s,o),Pi(t,a,s),Bb(s)}),r&&i)throw new Error(t+' contains ".value" child '+jt(s)+" in addition to actual children.")}},bC=function(t,e){let n,s;for(n=0;n<e.length;n++){s=e[n];const i=Ms(s);for(let o=0;o<i.length;o++)if(!(i[o]===".priority"&&o===i.length-1)){if(!pc(i[o]))throw new Error(t+"contains an invalid key ("+i[o]+") in path "+s.toString()+`. Keys must be non-empty strings and can't contain ".", "#", "$", "/", "[", or "]"`)}}e.sort(Fb);let r=null;for(n=0;n<e.length;n++){if(s=e[n],r!==null&&Ie(r,s))throw new Error(t+"contains a path "+r.toString()+" that is ancestor of another path "+s.toString());r=s}},SC=function(t,e,n,s){const r=Si(t,"values");if(!(e&&typeof e=="object")||Array.isArray(e))throw new Error(r+" must be an object containing the children to replace.");const i=[];oe(e,(o,a)=>{const c=new D(o);if(Pi(r,a,G(n,c)),za(c)===".priority"&&!wC(a))throw new Error(r+"contains an invalid value for '"+c.toString()+"', which must be a valid Firebase priority (a string, finite number, server value, or null).");i.push(c)}),bC(r,i)},Wf=function(t,e,n,s){if(!Bf(n))throw new Error(Si(t,e)+'was an invalid path = "'+n+`". Paths must be non-empty strings and can't contain ".", "#", "$", "[", or "]"`)},CC=function(t,e,n,s){n&&(n=n.replace(/^\/*\.info(\/|$)/,"/")),Wf(t,e,n)},gc=function(t,e){if(I(e)===".info")throw new Error(t+" failed = Can't modify data under /.info/")},IC=function(t,e){const n=e.path.toString();if(typeof e.repoInfo.host!="string"||e.repoInfo.host.length===0||!pc(e.repoInfo.namespace)&&e.repoInfo.host.split(":")[0]!=="localhost"||n.length!==0&&!vC(n))throw new Error(Si(t,"url")+`must be a valid firebase URL and the path can't contain ".", "#", "$", "[", or "]".`)};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class TC{constructor(){this.eventLists_=[],this.recursionDepth_=0}}function Li(t,e){let n=null;for(let s=0;s<e.length;s++){const r=e[s],i=r.getPath();n!==null&&!qa(i,n.path)&&(t.eventLists_.push(n),n=null),n===null&&(n={events:[],path:i}),n.events.push(r)}n&&t.eventLists_.push(n)}function Vf(t,e,n){Li(t,n),jf(t,s=>qa(s,e))}function Ne(t,e,n){Li(t,n),jf(t,s=>Ie(s,e)||Ie(e,s))}function jf(t,e){t.recursionDepth_++;let n=!0;for(let s=0;s<t.eventLists_.length;s++){const r=t.eventLists_[s];if(r){const i=r.path;e(i)?(RC(t.eventLists_[s]),t.eventLists_[s]=null):n=!1}}n&&(t.eventLists_=[]),t.recursionDepth_--}function RC(t){for(let e=0;e<t.events.length;e++){const n=t.events[e];if(n!==null){t.events[e]=null;const s=n.getEventRunner();ys&&se("event: "+n.toString()),Qn(s)}}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const kC="repo_interrupt",AC=25;class NC{constructor(e,n,s,r){this.repoInfo_=e,this.forceRestClient_=n,this.authTokenProvider_=s,this.appCheckProvider_=r,this.dataUpdateCount=0,this.statsListener_=null,this.eventQueue_=new TC,this.nextWriteId_=1,this.interceptServerDataCallback_=null,this.onDisconnect_=qr(),this.transactionQueueTree_=new hc,this.persistentConnection_=null,this.key=this.repoInfo_.toURLString()}toString(){return(this.repoInfo_.secure?"https://":"http://")+this.repoInfo_.host}}function PC(t,e,n){if(t.stats_=ja(t.repoInfo_),t.forceRestClient_||cb())t.server_=new zr(t.repoInfo_,(s,r,i,o)=>{Vu(t,s,r,i,o)},t.authTokenProvider_,t.appCheckProvider_),setTimeout(()=>ju(t,!0),0);else{if(typeof n<"u"&&n!==null){if(typeof n!="object")throw new Error("Only objects are supported for option databaseAuthVariableOverride");try{Q(n)}catch(s){throw new Error("Invalid authOverride provided: "+s)}}t.persistentConnection_=new ot(t.repoInfo_,e,(s,r,i,o)=>{Vu(t,s,r,i,o)},s=>{ju(t,s)},s=>{LC(t,s)},t.authTokenProvider_,t.appCheckProvider_,n),t.server_=t.persistentConnection_}t.authTokenProvider_.addTokenChangeListener(s=>{t.server_.refreshAuthToken(s)}),t.appCheckProvider_.addTokenChangeListener(s=>{t.server_.refreshAppCheckToken(s.token)}),t.statsReporter_=fb(t.repoInfo_,()=>new hS(t.stats_,t.server_)),t.infoData_=new aS,t.infoSyncTree_=new Hu({startListening:(s,r,i,o)=>{let a=[];const c=t.infoData_.getNode(s._path);return c.isEmpty()||(a=nr(t.infoSyncTree_,s._path,c),setTimeout(()=>{o("ok")},0)),a},stopListening:()=>{}}),mc(t,"connected",!1),t.serverSyncTree_=new Hu({startListening:(s,r,i,o)=>(t.server_.listen(s,i,r,(a,c)=>{const l=o(a,c);Ne(t.eventQueue_,s._path,l)}),[]),stopListening:(s,r)=>{t.server_.unlisten(s,r)}})}function Gf(t){const n=t.infoData_.getNode(new D(".info/serverTimeOffset")).val()||0;return new Date().getTime()+n}function Oi(t){return hC({timestamp:Gf(t)})}function Vu(t,e,n,s,r){t.dataUpdateCount++;const i=new D(e);n=t.interceptServerDataCallback_?t.interceptServerDataCallback_(e,n):n;let o=[];if(r)if(s){const c=Hr(n,l=>J(l));o=oC(t.serverSyncTree_,i,c,r)}else{const c=J(n);o=Pf(t.serverSyncTree_,i,c,r)}else if(s){const c=Hr(n,l=>J(l));o=sC(t.serverSyncTree_,i,c)}else{const c=J(n);o=nr(t.serverSyncTree_,i,c)}let a=i;o.length>0&&(a=Fn(t,i)),Ne(t.eventQueue_,a,o)}function ju(t,e){mc(t,"connected",e),e===!1&&MC(t)}function LC(t,e){oe(e,(n,s)=>{mc(t,n,s)})}function mc(t,e,n){const s=new D("/.info/"+e),r=J(n);t.infoData_.updateSnapshot(s,r);const i=nr(t.infoSyncTree_,s,r);Ne(t.eventQueue_,s,i)}function _c(t){return t.nextWriteId_++}function OC(t,e,n){const s=aC(t.serverSyncTree_,e);return s!=null?Promise.resolve(s):t.server_.get(e).then(r=>{const i=J(r).withIndex(e._queryParams.getIndex());ea(t.serverSyncTree_,e,n,!0);let o;if(e._queryParams.loadsAllData())o=nr(t.serverSyncTree_,e._path,i);else{const a=Hs(t.serverSyncTree_,e);o=Pf(t.serverSyncTree_,e._path,i,a)}return Ne(t.eventQueue_,e._path,o),ti(t.serverSyncTree_,e,n,null,!0),i},r=>(rr(t,"get for query "+Q(e)+" failed: "+r),Promise.reject(new Error(r))))}function DC(t,e,n,s,r){rr(t,"set",{path:e.toString(),value:n,priority:s});const i=Oi(t),o=J(n,s),a=ic(t.serverSyncTree_,e),c=Mf(o,a,i),l=_c(t),u=Nf(t.serverSyncTree_,e,c,l,!0);Li(t.eventQueue_,u),t.server_.put(e.toString(),o.val(!0),(h,f)=>{const p=h==="ok";p||pe("set at "+e+" failed: "+h);const y=Et(t.serverSyncTree_,l,!p);Ne(t.eventQueue_,e,y),na(t,r,h,f)});const d=Ec(t,e);Fn(t,d),Ne(t.eventQueue_,d,[])}function xC(t,e,n,s){rr(t,"update",{path:e.toString(),value:n});let r=!0;const i=Oi(t),o={};if(oe(n,(a,c)=>{r=!1,o[a]=xf(G(e,a),J(c),t.serverSyncTree_,i)}),r)se("update() called with empty data.  Don't do anything."),na(t,s,"ok",void 0);else{const a=_c(t),c=nC(t.serverSyncTree_,e,o,a);Li(t.eventQueue_,c),t.server_.merge(e.toString(),n,(l,u)=>{const d=l==="ok";d||pe("update at "+e+" failed: "+l);const h=Et(t.serverSyncTree_,a,!d),f=h.length>0?Fn(t,e):e;Ne(t.eventQueue_,f,h),na(t,s,l,u)}),oe(n,l=>{const u=Ec(t,G(e,l));Fn(t,u)}),Ne(t.eventQueue_,e,[])}}function MC(t){rr(t,"onDisconnectEvents");const e=Oi(t),n=qr();Yo(t.onDisconnect_,P(),(r,i)=>{const o=xf(r,i,t.serverSyncTree_,e);gf(n,r,o)});let s=[];Yo(n,P(),(r,i)=>{s=s.concat(nr(t.serverSyncTree_,r,i));const o=Ec(t,r);Fn(t,o)}),t.onDisconnect_=qr(),Ne(t.eventQueue_,P(),s)}function FC(t,e,n){let s;I(e._path)===".info"?s=ea(t.infoSyncTree_,e,n):s=ea(t.serverSyncTree_,e,n),Vf(t.eventQueue_,e._path,s)}function zf(t,e,n){let s;I(e._path)===".info"?s=ti(t.infoSyncTree_,e,n):s=ti(t.serverSyncTree_,e,n),Vf(t.eventQueue_,e._path,s)}function UC(t){t.persistentConnection_&&t.persistentConnection_.interrupt(kC)}function rr(t,...e){let n="";t.persistentConnection_&&(n=t.persistentConnection_.id+":"),se(n,...e)}function na(t,e,n,s){e&&Qn(()=>{if(n==="ok")e(null);else{const r=(n||"error").toUpperCase();let i=r;s&&(i+=": "+s);const o=new Error(i);o.code=r,e(o)}})}function qf(t,e,n){return ic(t.serverSyncTree_,e,n)||v.EMPTY_NODE}function yc(t,e=t.transactionQueueTree_){if(e||Di(t,e),Zn(e)){const n=Kf(t,e);g(n.length>0,"Sending zero length transaction queue"),n.every(r=>r.status===0)&&$C(t,sr(e),n)}else Uf(e)&&Ni(e,n=>{yc(t,n)})}function $C(t,e,n){const s=n.map(l=>l.currentWriteId),r=qf(t,e,s);let i=r;const o=r.hash();for(let l=0;l<n.length;l++){const u=n[l];g(u.status===0,"tryToSendTransactionQueue_: items in queue should all be run."),u.status=1,u.retryCount++;const d=fe(e,u.path);i=i.updateChild(d,u.currentOutputSnapshotRaw)}const a=i.val(!0),c=e;t.server_.put(c.toString(),a,l=>{rr(t,"transaction put response",{path:c.toString(),status:l});let u=[];if(l==="ok"){const d=[];for(let h=0;h<n.length;h++)n[h].status=2,u=u.concat(Et(t.serverSyncTree_,n[h].currentWriteId)),n[h].onComplete&&d.push(()=>n[h].onComplete(null,!0,n[h].currentOutputSnapshotResolved)),n[h].unwatcher();Di(t,fc(t.transactionQueueTree_,e)),yc(t,t.transactionQueueTree_),Ne(t.eventQueue_,e,u);for(let h=0;h<d.length;h++)Qn(d[h])}else{if(l==="datastale")for(let d=0;d<n.length;d++)n[d].status===3?n[d].status=4:n[d].status=0;else{pe("transaction at "+c.toString()+" failed: "+l);for(let d=0;d<n.length;d++)n[d].status=4,n[d].abortReason=l}Fn(t,e)}},o)}function Fn(t,e){const n=Yf(t,e),s=sr(n),r=Kf(t,n);return BC(t,r,s),s}function BC(t,e,n){if(e.length===0)return;const s=[];let r=[];const o=e.filter(a=>a.status===0).map(a=>a.currentWriteId);for(let a=0;a<e.length;a++){const c=e[a],l=fe(n,c.path);let u=!1,d;if(g(l!==null,"rerunTransactionsUnderNode_: relativePath should not be null."),c.status===4)u=!0,d=c.abortReason,r=r.concat(Et(t.serverSyncTree_,c.currentWriteId,!0));else if(c.status===0)if(c.retryCount>=AC)u=!0,d="maxretry",r=r.concat(Et(t.serverSyncTree_,c.currentWriteId,!0));else{const h=qf(t,c.path,o);c.currentInputSnapshot=h;const f=e[a].update(h.val());if(f!==void 0){Pi("transaction failed: Data returned ",f,c.path);let p=J(f);typeof f=="object"&&f!=null&&Je(f,".priority")||(p=p.updatePriority(h.getPriority()));const m=c.currentWriteId,A=Oi(t),N=Mf(p,h,A);c.currentOutputSnapshotRaw=p,c.currentOutputSnapshotResolved=N,c.currentWriteId=_c(t),o.splice(o.indexOf(m),1),r=r.concat(Nf(t.serverSyncTree_,c.path,N,c.currentWriteId,c.applyLocally)),r=r.concat(Et(t.serverSyncTree_,m,!0))}else u=!0,d="nodata",r=r.concat(Et(t.serverSyncTree_,c.currentWriteId,!0))}Ne(t.eventQueue_,n,r),r=[],u&&(e[a].status=2,(function(h){setTimeout(h,Math.floor(0))})(e[a].unwatcher),e[a].onComplete&&(d==="nodata"?s.push(()=>e[a].onComplete(null,!1,e[a].currentInputSnapshot)):s.push(()=>e[a].onComplete(new Error(d),!1,null))))}Di(t,t.transactionQueueTree_);for(let a=0;a<s.length;a++)Qn(s[a]);yc(t,t.transactionQueueTree_)}function Yf(t,e){let n,s=t.transactionQueueTree_;for(n=I(e);n!==null&&Zn(s)===void 0;)s=fc(s,n),e=F(e),n=I(e);return s}function Kf(t,e){const n=[];return Jf(t,e,n),n.sort((s,r)=>s.order-r.order),n}function Jf(t,e,n){const s=Zn(e);if(s)for(let r=0;r<s.length;r++)n.push(s[r]);Ni(e,r=>{Jf(t,r,n)})}function Di(t,e){const n=Zn(e);if(n){let s=0;for(let r=0;r<n.length;r++)n[r].status!==2&&(n[s]=n[r],s++);n.length=s,Ff(e,n.length>0?n:void 0)}Ni(e,s=>{Di(t,s)})}function Ec(t,e){const n=sr(Yf(t,e)),s=fc(t.transactionQueueTree_,e);return mC(s,r=>{go(t,r)}),go(t,s),$f(s,r=>{go(t,r)}),n}function go(t,e){const n=Zn(e);if(n){const s=[];let r=[],i=-1;for(let o=0;o<n.length;o++)n[o].status===3||(n[o].status===1?(g(i===o-1,"All SENT items should be at beginning of queue."),i=o,n[o].status=3,n[o].abortReason="set"):(g(n[o].status===0,"Unexpected transaction status in abort"),n[o].unwatcher(),r=r.concat(Et(t.serverSyncTree_,n[o].currentWriteId,!0)),n[o].onComplete&&s.push(n[o].onComplete.bind(null,new Error("set"),!1,null))));i===-1?Ff(e,void 0):n.length=i+1,Ne(t.eventQueue_,sr(e),r);for(let o=0;o<s.length;o++)Qn(s[o])}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function HC(t){let e="";const n=t.split("/");for(let s=0;s<n.length;s++)if(n[s].length>0){let r=n[s];try{r=decodeURIComponent(r.replace(/\+/g," "))}catch{}e+="/"+r}return e}function WC(t){const e={};t.charAt(0)==="?"&&(t=t.substring(1));for(const n of t.split("&")){if(n.length===0)continue;const s=n.split("=");s.length===2?e[decodeURIComponent(s[0])]=decodeURIComponent(s[1]):pe(`Invalid query segment '${n}' in query '${t}'`)}return e}const Gu=function(t,e){const n=VC(t),s=n.namespace;n.domain==="firebase.com"&&lt(n.host+" is no longer supported. Please use <YOUR FIREBASE>.firebaseio.com instead"),(!s||s==="undefined")&&n.domain!=="localhost"&&lt("Cannot parse Firebase url. Please use https://<YOUR FIREBASE>.firebaseio.com"),n.secure||Zw();const r=n.scheme==="ws"||n.scheme==="wss";return{repoInfo:new Qh(n.host,n.secure,s,r,e,"",s!==n.subdomain),path:new D(n.pathString)}},VC=function(t){let e="",n="",s="",r="",i="",o=!0,a="https",c=443;if(typeof t=="string"){let l=t.indexOf("//");l>=0&&(a=t.substring(0,l-1),t=t.substring(l+2));let u=t.indexOf("/");u===-1&&(u=t.length);let d=t.indexOf("?");d===-1&&(d=t.length),e=t.substring(0,Math.min(u,d)),u<d&&(r=HC(t.substring(u,d)));const h=WC(t.substring(Math.min(t.length,d)));l=e.indexOf(":"),l>=0?(o=a==="https"||a==="wss",c=parseInt(e.substring(l+1),10)):l=e.length;const f=e.slice(0,l);if(f.toLowerCase()==="localhost")n="localhost";else if(f.split(".").length<=2)n=f;else{const p=e.indexOf(".");s=e.substring(0,p).toLowerCase(),n=e.substring(p+1),i=s}"ns"in h&&(i=h.ns)}return{host:e,port:c,domain:n,subdomain:s,secure:o,scheme:a,pathString:r,namespace:i}};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const zu="-0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ_abcdefghijklmnopqrstuvwxyz",jC=(function(){let t=0;const e=[];return function(n){const s=n===t;t=n;let r;const i=new Array(8);for(r=7;r>=0;r--)i[r]=zu.charAt(n%64),n=Math.floor(n/64);g(n===0,"Cannot push at time == 0");let o=i.join("");if(s){for(r=11;r>=0&&e[r]===63;r--)e[r]=0;e[r]++}else for(r=0;r<12;r++)e[r]=Math.floor(Math.random()*64);for(r=0;r<12;r++)o+=zu.charAt(e[r]);return g(o.length===20,"nextPushId: Length should be 20."),o}})();/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Qf{constructor(e,n,s,r){this.eventType=e,this.eventRegistration=n,this.snapshot=s,this.prevName=r}getPath(){const e=this.snapshot.ref;return this.eventType==="value"?e._path:e.parent._path}getEventType(){return this.eventType}getEventRunner(){return this.eventRegistration.getEventRunner(this)}toString(){return this.getPath().toString()+":"+this.eventType+":"+Q(this.snapshot.exportVal())}}class Xf{constructor(e,n,s){this.eventRegistration=e,this.error=n,this.path=s}getPath(){return this.path}getEventType(){return"cancel"}getEventRunner(){return this.eventRegistration.getEventRunner(this)}toString(){return this.path.toString()+":cancel"}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class vc{constructor(e,n){this.snapshotCallback=e,this.cancelCallback=n}onValue(e,n){this.snapshotCallback.call(null,e,n)}onCancel(e){return g(this.hasCancelCallback,"Raising a cancel event on a listener with no cancel callback"),this.cancelCallback.call(null,e)}get hasCancelCallback(){return!!this.cancelCallback}matches(e){return this.snapshotCallback===e.snapshotCallback||this.snapshotCallback.userCallback!==void 0&&this.snapshotCallback.userCallback===e.snapshotCallback.userCallback&&this.snapshotCallback.context===e.snapshotCallback.context}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class wc{constructor(e,n,s,r){this._repo=e,this._path=n,this._queryParams=s,this._orderByCalled=r}get key(){return k(this._path)?null:za(this._path)}get ref(){return new Qe(this._repo,this._path)}get _queryIdentifier(){const e=Pu(this._queryParams),n=Wa(e);return n==="{}"?"default":n}get _queryObject(){return Pu(this._queryParams)}isEqual(e){if(e=ue(e),!(e instanceof wc))return!1;const n=this._repo===e._repo,s=qa(this._path,e._path),r=this._queryIdentifier===e._queryIdentifier;return n&&s&&r}toJSON(){return this.toString()}toString(){return this._repo.toString()+Mb(this._path)}}class Qe extends wc{constructor(e,n){super(e,n,new Qa,!1)}get parent(){const e=af(this._path);return e===null?null:new Qe(this._repo,e)}get root(){let e=this;for(;e.parent!==null;)e=e.parent;return e}}class Un{constructor(e,n,s){this._node=e,this.ref=n,this._index=s}get priority(){return this._node.getPriority().val()}get key(){return this.ref.key}get size(){return this._node.numChildren()}child(e){const n=new D(e),s=$n(this.ref,e);return new Un(this._node.getChild(n),s,z)}exists(){return!this._node.isEmpty()}exportVal(){return this._node.val(!0)}forEach(e){return this._node.isLeafNode()?!1:!!this._node.forEachChild(this._index,(s,r)=>e(new Un(r,$n(this.ref,s),z)))}hasChild(e){const n=new D(e);return!this._node.getChild(n).isEmpty()}hasChildren(){return this._node.isLeafNode()?!1:!this._node.isEmpty()}toJSON(){return this.exportVal()}val(){return this._node.val()}}function re(t,e){return t=ue(t),t._checkNotDeleted("ref"),e!==void 0?$n(t._root,e):t._root}function $n(t,e){return t=ue(t),I(t._path)===null?CC("child","path",e):Wf("child","path",e),new Qe(t._repo,G(t._path,e))}function qu(t,e){t=ue(t),gc("push",t._path),Hf("push",e,t._path,!0);const n=Gf(t._repo),s=jC(n),r=$n(t,s),i=$n(t,s);let o;return o=Promise.resolve(i),r.then=o.then.bind(o),r.catch=o.then.bind(o,void 0),r}function Bn(t){return gc("remove",t._path),ut(t,null)}function ut(t,e){t=ue(t),gc("set",t._path),Hf("set",e,t._path,!1);const n=new Qs;return DC(t._repo,t._path,e,null,n.wrapCallback(()=>{})),n.promise}function Tr(t,e){SC("update",e,t._path);const n=new Qs;return xC(t._repo,t._path,e,n.wrapCallback(()=>{})),n.promise}function Qt(t){t=ue(t);const e=new vc(()=>{}),n=new ir(e);return OC(t._repo,t,n).then(s=>new Un(s,new Qe(t._repo,t._path),t._queryParams.getIndex()))}class ir{constructor(e){this.callbackContext=e}respondsTo(e){return e==="value"}createEvent(e,n){const s=n._queryParams.getIndex();return new Qf("value",this,new Un(e.snapshotNode,new Qe(n._repo,n._path),s))}getEventRunner(e){return e.getEventType()==="cancel"?()=>this.callbackContext.onCancel(e.error):()=>this.callbackContext.onValue(e.snapshot,null)}createCancelEvent(e,n){return this.callbackContext.hasCancelCallback?new Xf(this,e,n):null}matches(e){return e instanceof ir?!e.callbackContext||!this.callbackContext?!0:e.callbackContext.matches(this.callbackContext):!1}hasAnyCallback(){return this.callbackContext!==null}}class xi{constructor(e,n){this.eventType=e,this.callbackContext=n}respondsTo(e){let n=e==="children_added"?"child_added":e;return n=n==="children_removed"?"child_removed":n,this.eventType===n}createCancelEvent(e,n){return this.callbackContext.hasCancelCallback?new Xf(this,e,n):null}createEvent(e,n){g(e.childName!=null,"Child events should have a childName.");const s=$n(new Qe(n._repo,n._path),e.childName),r=n._queryParams.getIndex();return new Qf(e.type,this,new Un(e.snapshotNode,s,r),e.prevName)}getEventRunner(e){return e.getEventType()==="cancel"?()=>this.callbackContext.onCancel(e.error):()=>this.callbackContext.onValue(e.snapshot,e.prevName)}matches(e){return e instanceof xi?this.eventType===e.eventType&&(!this.callbackContext||!e.callbackContext||this.callbackContext.matches(e.callbackContext)):!1}hasAnyCallback(){return!!this.callbackContext}}function bc(t,e,n,s,r){const i=new vc(n,void 0),o=e==="value"?new ir(i):new xi(e,i);return FC(t._repo,t,o),()=>zf(t._repo,t,o)}function GC(t,e,n,s){return bc(t,"value",e)}function zC(t,e,n,s){return bc(t,"child_added",e)}function qC(t,e,n,s){return bc(t,"child_removed",e)}function Mi(t,e,n){let s=null;const r=n?new vc(n):null;e==="value"?s=new ir(r):e&&(s=new xi(e,r)),zf(t._repo,t,s)}YS(Qe);ZS(Qe);/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const YC="FIREBASE_DATABASE_EMULATOR_HOST",sa={};let KC=!1;function JC(t,e,n,s){const r=e.lastIndexOf(":"),i=e.substring(0,r),o=Yn(i);t.repoInfo_=new Qh(e,o,t.repoInfo_.namespace,t.repoInfo_.webSocketOnly,t.repoInfo_.nodeAdmin,t.repoInfo_.persistenceKey,t.repoInfo_.includeNamespaceInQueryParams,!0,n),s&&(t.authTokenProvider_=s)}function QC(t,e,n,s,r){let i=s||t.options.databaseURL;i===void 0&&(t.options.projectId||lt("Can't determine Firebase Database URL. Be sure to include  a Project ID when calling firebase.initializeApp()."),se("Using default host for project ",t.options.projectId),i=`${t.options.projectId}-default-rtdb.firebaseio.com`);let o=Gu(i,r),a=o.repoInfo,c;typeof process<"u"&&fu&&(c=fu[YC]),c?(i=`http://${c}?ns=${a.namespace}`,o=Gu(i,r),a=o.repoInfo):o.repoInfo.secure;const l=new ub(t.name,t.options,e);IC("Invalid Firebase Database URL",o),k(o.path)||lt("Database URL must point to the root of a Firebase Database (not including a child path).");const u=ZC(a,t,l,new lb(t,n));return new eI(u,t)}function XC(t,e){const n=sa[e];(!n||n[t.key]!==t)&&lt(`Database ${e}(${t.repoInfo_}) has already been deleted.`),UC(t),delete n[t.key]}function ZC(t,e,n,s){let r=sa[e.name];r||(r={},sa[e.name]=r);let i=r[t.toURLString()];return i&&lt("Database initialized multiple times. Please make sure the format of the database URL matches with each database() call."),i=new NC(t,KC,n,s),r[t.toURLString()]=i,i}class eI{constructor(e,n){this._repoInternal=e,this.app=n,this.type="database",this._instanceStarted=!1}get _repo(){return this._instanceStarted||(PC(this._repoInternal,this.app.options.appId,this.app.options.databaseAuthVariableOverride),this._instanceStarted=!0),this._repoInternal}get _root(){return this._rootInternal||(this._rootInternal=new Qe(this._repo,P())),this._rootInternal}_delete(){return this._rootInternal!==null&&(XC(this._repo,this.app.name),this._repoInternal=null,this._rootInternal=null),Promise.resolve()}_checkNotDeleted(e){this._rootInternal===null&&lt("Cannot call "+e+" on a deleted database.")}}function tI(t=Dh(),e){const n=Ba(t,"database").getImmediate({identifier:e});if(!n._instanceStarted){const s=Ev("database");s&&nI(n,...s)}return n}function nI(t,e,n,s={}){t=ue(t),t._checkNotDeleted("useEmulator");const r=`${e}:${n}`,i=t._repoInternal;if(t._instanceStarted){if(r===t._repoInternal.repoInfo_.host&&nn(s,i.repoInfo_.emulatorOptions))return;lt("connectDatabaseEmulator() cannot initialize or alter the emulator configuration after the database instance has started.")}let o;if(i.repoInfo_.nodeAdmin)s.mockUserToken&&lt('mockUserToken is not supported by the Admin SDK. For client access with mock users, please use the "firebase" package instead of "firebase-admin".'),o=new Ir(Ir.OWNER);else if(s.mockUserToken){const a=typeof s.mockUserToken=="string"?s.mockUserToken:vv(s.mockUserToken,t.app.options.projectId);o=new Ir(a)}Yn(e)&&(Rh(e),kh("Database",!0)),JC(i,r,s,o)}/**
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
 */function sI(t){qw(Jn),Ln(new sn("database",(e,{instanceIdentifier:n})=>{const s=e.getProvider("app").getImmediate(),r=e.getProvider("auth-internal"),i=e.getProvider("app-check-internal");return QC(s,r,i,n)},"PUBLIC").setMultipleInstances(!0)),Rt(pu,gu,t),Rt(pu,gu,"esm2020")}ot.prototype.simpleListen=function(t,e){this.sendRequest("q",{p:t},e)};ot.prototype.echo=function(t,e){this.sendRequest("echo",{d:t},e)};sI();var rI="firebase",iI="12.4.0";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */Rt(rI,iI,"app");const oI={apiKey:"AIzaSyA-fvCaKCjyEFX__YAVr1oPGdVsUEhFehA",authDomain:"vidu-aae11.firebaseapp.com",projectId:"vidu-aae11",databaseURL:"https://vidu-aae11-default-rtdb.europe-west1.firebasedatabase.app",storageBucket:"vidu-aae11.firebasestorage.app",messagingSenderId:"765724787439",appId:"1:765724787439:web:61a3b5dd538149564c911a",measurementId:"G-EGJ53HLGY4"},Zf=Oh(oI),ie=tI(Zf),xe=[];function qt(t,e,n,s=null,r=null,i=null){e==="value"?GC(t,n):e==="child_added"?zC(t,n):e==="child_removed"?qC(t,n):console.warn(`Unknown listener type: ${e}`),xe.push({ref:t,type:e,callback:n,roomId:s,userId:r,category:i})}function aI(){xe.forEach(({ref:t,type:e,callback:n})=>{try{Mi(t,e,n)}catch(s){console.warn("Failed to remove firebase rtdb listener",s)}}),xe.length=0}function Fi(t){if(!t)return;xe.filter(s=>s.roomId===t).forEach(({ref:s,type:r,callback:i})=>{try{Mi(s,r,i)}catch(o){console.warn(`Failed to remove listener for room ${t}`,o)}});const n=xe.filter(s=>s.roomId!==t);xe.length=0,xe.push(...n)}function cI(t,e){if(!t||!e)return;const n=i=>i.userId===t&&i.roomId===e;xe.filter(n).forEach(({ref:i,type:o,callback:a})=>{try{Mi(i,o,a)}catch(c){console.warn(`Failed to remove listener for user ${t} in room ${e}`,c)}});const r=xe.filter(i=>!n(i));xe.length=0,xe.push(...r)}function Rr(t,e,n=null){qt(t,"value",e,n)}const Bt=t=>re(ie,`rooms/${t}`),_r=t=>re(ie,`rooms/${t}/members`),Yu=(t,e)=>re(ie,`rooms/${t}/members/${e}`),lI=t=>re(ie,`rooms/${t}/cancellation`),Ui=t=>re(ie,`rooms/${t}/watch`),uI=t=>re(ie,`users/${t}/recentCalls`),Sc=(t,e)=>re(ie,`users/${t}/recentCalls/${e}`),Cc=t=>re(ie,`users/${t}/outgoingCall`),ep=t=>re(ie,`rooms/${t}/offerCandidates`),tp=t=>re(ie,`rooms/${t}/answerCandidates`);function np(){return{"dependent-sdk-initialized-before-auth":"Another Firebase SDK was initialized and is trying to use Auth before Auth is initialized. Please be sure to call `initializeAuth` or `getAuth` before starting any other Firebase SDK."}}const dI=np,sp=new Xs("auth","Firebase",np());/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ni=new Ua("@firebase/auth");function hI(t,...e){ni.logLevel<=L.WARN&&ni.warn(`Auth (${Jn}): ${t}`,...e)}function kr(t,...e){ni.logLevel<=L.ERROR&&ni.error(`Auth (${Jn}): ${t}`,...e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ye(t,...e){throw Tc(t,...e)}function $e(t,...e){return Tc(t,...e)}function Ic(t,e,n){const s={...dI(),[e]:n};return new Xs("auth","Firebase",s).create(e,{appName:t.name})}function Xt(t){return Ic(t,"operation-not-supported-in-this-environment","Operations that alter the current user are not supported in conjunction with FirebaseServerApp")}function fI(t,e,n){const s=n;if(!(e instanceof s))throw s.name!==e.constructor.name&&Ye(t,"argument-error"),Ic(t,"argument-error",`Type of ${e.constructor.name} does not match expected instance.Did you pass a reference from a different Auth SDK?`)}function Tc(t,...e){if(typeof t!="string"){const n=e[0],s=[...e.slice(1)];return s[0]&&(s[0].appName=t.name),t._errorFactory.create(n,...s)}return sp.create(t,...e)}function b(t,e,...n){if(!t)throw Tc(e,...n)}function nt(t){const e="INTERNAL ASSERTION FAILED: "+t;throw kr(e),new Error(e)}function dt(t,e){t||nt(e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ra(){return typeof self<"u"&&self.location?.href||""}function pI(){return Ku()==="http:"||Ku()==="https:"}function Ku(){return typeof self<"u"&&self.location?.protocol||null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function gI(){return typeof navigator<"u"&&navigator&&"onLine"in navigator&&typeof navigator.onLine=="boolean"&&(pI()||Cv()||"connection"in navigator)?navigator.onLine:!0}function mI(){if(typeof navigator>"u")return null;const t=navigator;return t.languages&&t.languages[0]||t.language||null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class or{constructor(e,n){this.shortDelay=e,this.longDelay=n,dt(n>e,"Short delay should be less than long delay!"),this.isMobile=Fa()||Ah()}get(){return gI()?this.isMobile?this.longDelay:this.shortDelay:Math.min(5e3,this.shortDelay)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Rc(t,e){dt(t.emulator,"Emulator should always be set here");const{url:n}=t.emulator;return e?`${n}${e.startsWith("/")?e.slice(1):e}`:n}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class rp{static initialize(e,n,s){this.fetchImpl=e,n&&(this.headersImpl=n),s&&(this.responseImpl=s)}static fetch(){if(this.fetchImpl)return this.fetchImpl;if(typeof self<"u"&&"fetch"in self)return self.fetch;if(typeof globalThis<"u"&&globalThis.fetch)return globalThis.fetch;if(typeof fetch<"u")return fetch;nt("Could not find fetch implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static headers(){if(this.headersImpl)return this.headersImpl;if(typeof self<"u"&&"Headers"in self)return self.Headers;if(typeof globalThis<"u"&&globalThis.Headers)return globalThis.Headers;if(typeof Headers<"u")return Headers;nt("Could not find Headers implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static response(){if(this.responseImpl)return this.responseImpl;if(typeof self<"u"&&"Response"in self)return self.Response;if(typeof globalThis<"u"&&globalThis.Response)return globalThis.Response;if(typeof Response<"u")return Response;nt("Could not find Response implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const _I={CREDENTIAL_MISMATCH:"custom-token-mismatch",MISSING_CUSTOM_TOKEN:"internal-error",INVALID_IDENTIFIER:"invalid-email",MISSING_CONTINUE_URI:"internal-error",INVALID_PASSWORD:"wrong-password",MISSING_PASSWORD:"missing-password",INVALID_LOGIN_CREDENTIALS:"invalid-credential",EMAIL_EXISTS:"email-already-in-use",PASSWORD_LOGIN_DISABLED:"operation-not-allowed",INVALID_IDP_RESPONSE:"invalid-credential",INVALID_PENDING_TOKEN:"invalid-credential",FEDERATED_USER_ID_ALREADY_LINKED:"credential-already-in-use",MISSING_REQ_TYPE:"internal-error",EMAIL_NOT_FOUND:"user-not-found",RESET_PASSWORD_EXCEED_LIMIT:"too-many-requests",EXPIRED_OOB_CODE:"expired-action-code",INVALID_OOB_CODE:"invalid-action-code",MISSING_OOB_CODE:"internal-error",CREDENTIAL_TOO_OLD_LOGIN_AGAIN:"requires-recent-login",INVALID_ID_TOKEN:"invalid-user-token",TOKEN_EXPIRED:"user-token-expired",USER_NOT_FOUND:"user-token-expired",TOO_MANY_ATTEMPTS_TRY_LATER:"too-many-requests",PASSWORD_DOES_NOT_MEET_REQUIREMENTS:"password-does-not-meet-requirements",INVALID_CODE:"invalid-verification-code",INVALID_SESSION_INFO:"invalid-verification-id",INVALID_TEMPORARY_PROOF:"invalid-credential",MISSING_SESSION_INFO:"missing-verification-id",SESSION_EXPIRED:"code-expired",MISSING_ANDROID_PACKAGE_NAME:"missing-android-pkg-name",UNAUTHORIZED_DOMAIN:"unauthorized-continue-uri",INVALID_OAUTH_CLIENT_ID:"invalid-oauth-client-id",ADMIN_ONLY_OPERATION:"admin-restricted-operation",INVALID_MFA_PENDING_CREDENTIAL:"invalid-multi-factor-session",MFA_ENROLLMENT_NOT_FOUND:"multi-factor-info-not-found",MISSING_MFA_ENROLLMENT_ID:"missing-multi-factor-info",MISSING_MFA_PENDING_CREDENTIAL:"missing-multi-factor-session",SECOND_FACTOR_EXISTS:"second-factor-already-in-use",SECOND_FACTOR_LIMIT_EXCEEDED:"maximum-second-factor-count-exceeded",BLOCKING_FUNCTION_ERROR_RESPONSE:"internal-error",RECAPTCHA_NOT_ENABLED:"recaptcha-not-enabled",MISSING_RECAPTCHA_TOKEN:"missing-recaptcha-token",INVALID_RECAPTCHA_TOKEN:"invalid-recaptcha-token",INVALID_RECAPTCHA_ACTION:"invalid-recaptcha-action",MISSING_CLIENT_TYPE:"missing-client-type",MISSING_RECAPTCHA_VERSION:"missing-recaptcha-version",INVALID_RECAPTCHA_VERSION:"invalid-recaptcha-version",INVALID_REQ_TYPE:"invalid-req-type"};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const yI=["/v1/accounts:signInWithCustomToken","/v1/accounts:signInWithEmailLink","/v1/accounts:signInWithIdp","/v1/accounts:signInWithPassword","/v1/accounts:signInWithPhoneNumber","/v1/token"],EI=new or(3e4,6e4);function kc(t,e){return t.tenantId&&!e.tenantId?{...e,tenantId:t.tenantId}:e}async function es(t,e,n,s,r={}){return ip(t,r,async()=>{let i={},o={};s&&(e==="GET"?o=s:i={body:JSON.stringify(s)});const a=Kn({key:t.config.apiKey,...o}).slice(1),c=await t._getAdditionalHeaders();c["Content-Type"]="application/json",t.languageCode&&(c["X-Firebase-Locale"]=t.languageCode);const l={method:e,headers:c,...i};return Sv()||(l.referrerPolicy="no-referrer"),t.emulatorConfig&&Yn(t.emulatorConfig.host)&&(l.credentials="include"),rp.fetch()(await op(t,t.config.apiHost,n,a),l)})}async function ip(t,e,n){t._canInitEmulator=!1;const s={..._I,...e};try{const r=new wI(t),i=await Promise.race([n(),r.promise]);r.clearNetworkTimeout();const o=await i.json();if("needConfirmation"in o)throw yr(t,"account-exists-with-different-credential",o);if(i.ok&&!("errorMessage"in o))return o;{const a=i.ok?o.errorMessage:o.error.message,[c,l]=a.split(" : ");if(c==="FEDERATED_USER_ID_ALREADY_LINKED")throw yr(t,"credential-already-in-use",o);if(c==="EMAIL_EXISTS")throw yr(t,"email-already-in-use",o);if(c==="USER_DISABLED")throw yr(t,"user-disabled",o);const u=s[c]||c.toLowerCase().replace(/[_\s]+/g,"-");if(l)throw Ic(t,u,l);Ye(t,u)}}catch(r){if(r instanceof Ft)throw r;Ye(t,"network-request-failed",{message:String(r)})}}async function vI(t,e,n,s,r={}){const i=await es(t,e,n,s,r);return"mfaPendingCredential"in i&&Ye(t,"multi-factor-auth-required",{_serverResponse:i}),i}async function op(t,e,n,s){const r=`${e}${n}?${s}`,i=t,o=i.config.emulator?Rc(t.config,r):`${t.config.apiScheme}://${r}`;return yI.includes(n)&&(await i._persistenceManagerAvailable,i._getPersistenceType()==="COOKIE")?i._getPersistence()._getFinalTarget(o).toString():o}class wI{clearNetworkTimeout(){clearTimeout(this.timer)}constructor(e){this.auth=e,this.timer=null,this.promise=new Promise((n,s)=>{this.timer=setTimeout(()=>s($e(this.auth,"network-request-failed")),EI.get())})}}function yr(t,e,n){const s={appName:t.name};n.email&&(s.email=n.email),n.phoneNumber&&(s.phoneNumber=n.phoneNumber);const r=$e(t,e,s);return r.customData._tokenResponse=n,r}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function bI(t,e){return es(t,"POST","/v1/accounts:delete",e)}async function si(t,e){return es(t,"POST","/v1/accounts:lookup",e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ss(t){if(t)try{const e=new Date(Number(t));if(!isNaN(e.getTime()))return e.toUTCString()}catch{}}async function SI(t,e=!1){const n=ue(t),s=await n.getIdToken(e),r=Ac(s);b(r&&r.exp&&r.auth_time&&r.iat,n.auth,"internal-error");const i=typeof r.firebase=="object"?r.firebase:void 0,o=i?.sign_in_provider;return{claims:r,token:s,authTime:Ss(mo(r.auth_time)),issuedAtTime:Ss(mo(r.iat)),expirationTime:Ss(mo(r.exp)),signInProvider:o||null,signInSecondFactor:i?.sign_in_second_factor||null}}function mo(t){return Number(t)*1e3}function Ac(t){const[e,n,s]=t.split(".");if(e===void 0||n===void 0||s===void 0)return kr("JWT malformed, contained fewer than 3 sections"),null;try{const r=Br(n);return r?JSON.parse(r):(kr("Failed to decode base64 JWT payload"),null)}catch(r){return kr("Caught error parsing JWT payload as JSON",r?.toString()),null}}function Ju(t){const e=Ac(t);return b(e,"internal-error"),b(typeof e.exp<"u","internal-error"),b(typeof e.iat<"u","internal-error"),Number(e.exp)-Number(e.iat)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Ws(t,e,n=!1){if(n)return e;try{return await e}catch(s){throw s instanceof Ft&&CI(s)&&t.auth.currentUser===t&&await t.auth.signOut(),s}}function CI({code:t}){return t==="auth/user-disabled"||t==="auth/user-token-expired"}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class II{constructor(e){this.user=e,this.isRunning=!1,this.timerId=null,this.errorBackoff=3e4}_start(){this.isRunning||(this.isRunning=!0,this.schedule())}_stop(){this.isRunning&&(this.isRunning=!1,this.timerId!==null&&clearTimeout(this.timerId))}getInterval(e){if(e){const n=this.errorBackoff;return this.errorBackoff=Math.min(this.errorBackoff*2,96e4),n}else{this.errorBackoff=3e4;const s=(this.user.stsTokenManager.expirationTime??0)-Date.now()-3e5;return Math.max(0,s)}}schedule(e=!1){if(!this.isRunning)return;const n=this.getInterval(e);this.timerId=setTimeout(async()=>{await this.iteration()},n)}async iteration(){try{await this.user.getIdToken(!0)}catch(e){e?.code==="auth/network-request-failed"&&this.schedule(!0);return}this.schedule()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ia{constructor(e,n){this.createdAt=e,this.lastLoginAt=n,this._initializeTime()}_initializeTime(){this.lastSignInTime=Ss(this.lastLoginAt),this.creationTime=Ss(this.createdAt)}_copy(e){this.createdAt=e.createdAt,this.lastLoginAt=e.lastLoginAt,this._initializeTime()}toJSON(){return{createdAt:this.createdAt,lastLoginAt:this.lastLoginAt}}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function ri(t){const e=t.auth,n=await t.getIdToken(),s=await Ws(t,si(e,{idToken:n}));b(s?.users.length,e,"internal-error");const r=s.users[0];t._notifyReloadListener(r);const i=r.providerUserInfo?.length?ap(r.providerUserInfo):[],o=RI(t.providerData,i),a=t.isAnonymous,c=!(t.email&&r.passwordHash)&&!o?.length,l=a?c:!1,u={uid:r.localId,displayName:r.displayName||null,photoURL:r.photoUrl||null,email:r.email||null,emailVerified:r.emailVerified||!1,phoneNumber:r.phoneNumber||null,tenantId:r.tenantId||null,providerData:o,metadata:new ia(r.createdAt,r.lastLoginAt),isAnonymous:l};Object.assign(t,u)}async function TI(t){const e=ue(t);await ri(e),await e.auth._persistUserIfCurrent(e),e.auth._notifyListenersIfCurrent(e)}function RI(t,e){return[...t.filter(s=>!e.some(r=>r.providerId===s.providerId)),...e]}function ap(t){return t.map(({providerId:e,...n})=>({providerId:e,uid:n.rawId||"",displayName:n.displayName||null,email:n.email||null,phoneNumber:n.phoneNumber||null,photoURL:n.photoUrl||null}))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function kI(t,e){const n=await ip(t,{},async()=>{const s=Kn({grant_type:"refresh_token",refresh_token:e}).slice(1),{tokenApiHost:r,apiKey:i}=t.config,o=await op(t,r,"/v1/token",`key=${i}`),a=await t._getAdditionalHeaders();a["Content-Type"]="application/x-www-form-urlencoded";const c={method:"POST",headers:a,body:s};return t.emulatorConfig&&Yn(t.emulatorConfig.host)&&(c.credentials="include"),rp.fetch()(o,c)});return{accessToken:n.access_token,expiresIn:n.expires_in,refreshToken:n.refresh_token}}async function AI(t,e){return es(t,"POST","/v2/accounts:revokeToken",kc(t,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class En{constructor(){this.refreshToken=null,this.accessToken=null,this.expirationTime=null}get isExpired(){return!this.expirationTime||Date.now()>this.expirationTime-3e4}updateFromServerResponse(e){b(e.idToken,"internal-error"),b(typeof e.idToken<"u","internal-error"),b(typeof e.refreshToken<"u","internal-error");const n="expiresIn"in e&&typeof e.expiresIn<"u"?Number(e.expiresIn):Ju(e.idToken);this.updateTokensAndExpiration(e.idToken,e.refreshToken,n)}updateFromIdToken(e){b(e.length!==0,"internal-error");const n=Ju(e);this.updateTokensAndExpiration(e,null,n)}async getToken(e,n=!1){return!n&&this.accessToken&&!this.isExpired?this.accessToken:(b(this.refreshToken,e,"user-token-expired"),this.refreshToken?(await this.refresh(e,this.refreshToken),this.accessToken):null)}clearRefreshToken(){this.refreshToken=null}async refresh(e,n){const{accessToken:s,refreshToken:r,expiresIn:i}=await kI(e,n);this.updateTokensAndExpiration(s,r,Number(i))}updateTokensAndExpiration(e,n,s){this.refreshToken=n||null,this.accessToken=e||null,this.expirationTime=Date.now()+s*1e3}static fromJSON(e,n){const{refreshToken:s,accessToken:r,expirationTime:i}=n,o=new En;return s&&(b(typeof s=="string","internal-error",{appName:e}),o.refreshToken=s),r&&(b(typeof r=="string","internal-error",{appName:e}),o.accessToken=r),i&&(b(typeof i=="number","internal-error",{appName:e}),o.expirationTime=i),o}toJSON(){return{refreshToken:this.refreshToken,accessToken:this.accessToken,expirationTime:this.expirationTime}}_assign(e){this.accessToken=e.accessToken,this.refreshToken=e.refreshToken,this.expirationTime=e.expirationTime}_clone(){return Object.assign(new En,this.toJSON())}_performRefresh(){return nt("not implemented")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function pt(t,e){b(typeof t=="string"||typeof t>"u","internal-error",{appName:e})}class Me{constructor({uid:e,auth:n,stsTokenManager:s,...r}){this.providerId="firebase",this.proactiveRefresh=new II(this),this.reloadUserInfo=null,this.reloadListener=null,this.uid=e,this.auth=n,this.stsTokenManager=s,this.accessToken=s.accessToken,this.displayName=r.displayName||null,this.email=r.email||null,this.emailVerified=r.emailVerified||!1,this.phoneNumber=r.phoneNumber||null,this.photoURL=r.photoURL||null,this.isAnonymous=r.isAnonymous||!1,this.tenantId=r.tenantId||null,this.providerData=r.providerData?[...r.providerData]:[],this.metadata=new ia(r.createdAt||void 0,r.lastLoginAt||void 0)}async getIdToken(e){const n=await Ws(this,this.stsTokenManager.getToken(this.auth,e));return b(n,this.auth,"internal-error"),this.accessToken!==n&&(this.accessToken=n,await this.auth._persistUserIfCurrent(this),this.auth._notifyListenersIfCurrent(this)),n}getIdTokenResult(e){return SI(this,e)}reload(){return TI(this)}_assign(e){this!==e&&(b(this.uid===e.uid,this.auth,"internal-error"),this.displayName=e.displayName,this.photoURL=e.photoURL,this.email=e.email,this.emailVerified=e.emailVerified,this.phoneNumber=e.phoneNumber,this.isAnonymous=e.isAnonymous,this.tenantId=e.tenantId,this.providerData=e.providerData.map(n=>({...n})),this.metadata._copy(e.metadata),this.stsTokenManager._assign(e.stsTokenManager))}_clone(e){const n=new Me({...this,auth:e,stsTokenManager:this.stsTokenManager._clone()});return n.metadata._copy(this.metadata),n}_onReload(e){b(!this.reloadListener,this.auth,"internal-error"),this.reloadListener=e,this.reloadUserInfo&&(this._notifyReloadListener(this.reloadUserInfo),this.reloadUserInfo=null)}_notifyReloadListener(e){this.reloadListener?this.reloadListener(e):this.reloadUserInfo=e}_startProactiveRefresh(){this.proactiveRefresh._start()}_stopProactiveRefresh(){this.proactiveRefresh._stop()}async _updateTokensIfNecessary(e,n=!1){let s=!1;e.idToken&&e.idToken!==this.stsTokenManager.accessToken&&(this.stsTokenManager.updateFromServerResponse(e),s=!0),n&&await ri(this),await this.auth._persistUserIfCurrent(this),s&&this.auth._notifyListenersIfCurrent(this)}async delete(){if(Le(this.auth.app))return Promise.reject(Xt(this.auth));const e=await this.getIdToken();return await Ws(this,bI(this.auth,{idToken:e})),this.stsTokenManager.clearRefreshToken(),this.auth.signOut()}toJSON(){return{uid:this.uid,email:this.email||void 0,emailVerified:this.emailVerified,displayName:this.displayName||void 0,isAnonymous:this.isAnonymous,photoURL:this.photoURL||void 0,phoneNumber:this.phoneNumber||void 0,tenantId:this.tenantId||void 0,providerData:this.providerData.map(e=>({...e})),stsTokenManager:this.stsTokenManager.toJSON(),_redirectEventId:this._redirectEventId,...this.metadata.toJSON(),apiKey:this.auth.config.apiKey,appName:this.auth.name}}get refreshToken(){return this.stsTokenManager.refreshToken||""}static _fromJSON(e,n){const s=n.displayName??void 0,r=n.email??void 0,i=n.phoneNumber??void 0,o=n.photoURL??void 0,a=n.tenantId??void 0,c=n._redirectEventId??void 0,l=n.createdAt??void 0,u=n.lastLoginAt??void 0,{uid:d,emailVerified:h,isAnonymous:f,providerData:p,stsTokenManager:y}=n;b(d&&y,e,"internal-error");const m=En.fromJSON(this.name,y);b(typeof d=="string",e,"internal-error"),pt(s,e.name),pt(r,e.name),b(typeof h=="boolean",e,"internal-error"),b(typeof f=="boolean",e,"internal-error"),pt(i,e.name),pt(o,e.name),pt(a,e.name),pt(c,e.name),pt(l,e.name),pt(u,e.name);const A=new Me({uid:d,auth:e,email:r,emailVerified:h,displayName:s,isAnonymous:f,photoURL:o,phoneNumber:i,tenantId:a,stsTokenManager:m,createdAt:l,lastLoginAt:u});return p&&Array.isArray(p)&&(A.providerData=p.map(N=>({...N}))),c&&(A._redirectEventId=c),A}static async _fromIdTokenResponse(e,n,s=!1){const r=new En;r.updateFromServerResponse(n);const i=new Me({uid:n.localId,auth:e,stsTokenManager:r,isAnonymous:s});return await ri(i),i}static async _fromGetAccountInfoResponse(e,n,s){const r=n.users[0];b(r.localId!==void 0,"internal-error");const i=r.providerUserInfo!==void 0?ap(r.providerUserInfo):[],o=!(r.email&&r.passwordHash)&&!i?.length,a=new En;a.updateFromIdToken(s);const c=new Me({uid:r.localId,auth:e,stsTokenManager:a,isAnonymous:o}),l={uid:r.localId,displayName:r.displayName||null,photoURL:r.photoUrl||null,email:r.email||null,emailVerified:r.emailVerified||!1,phoneNumber:r.phoneNumber||null,tenantId:r.tenantId||null,providerData:i,metadata:new ia(r.createdAt,r.lastLoginAt),isAnonymous:!(r.email&&r.passwordHash)&&!i?.length};return Object.assign(c,l),c}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Qu=new Map;function st(t){dt(t instanceof Function,"Expected a class definition");let e=Qu.get(t);return e?(dt(e instanceof t,"Instance stored in cache mismatched with class"),e):(e=new t,Qu.set(t,e),e)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class cp{constructor(){this.type="NONE",this.storage={}}async _isAvailable(){return!0}async _set(e,n){this.storage[e]=n}async _get(e){const n=this.storage[e];return n===void 0?null:n}async _remove(e){delete this.storage[e]}_addListener(e,n){}_removeListener(e,n){}}cp.type="NONE";const oa=cp;/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ar(t,e,n){return`firebase:${t}:${e}:${n}`}class vn{constructor(e,n,s){this.persistence=e,this.auth=n,this.userKey=s;const{config:r,name:i}=this.auth;this.fullUserKey=Ar(this.userKey,r.apiKey,i),this.fullPersistenceKey=Ar("persistence",r.apiKey,i),this.boundEventHandler=n._onStorageEvent.bind(n),this.persistence._addListener(this.fullUserKey,this.boundEventHandler)}setCurrentUser(e){return this.persistence._set(this.fullUserKey,e.toJSON())}async getCurrentUser(){const e=await this.persistence._get(this.fullUserKey);if(!e)return null;if(typeof e=="string"){const n=await si(this.auth,{idToken:e}).catch(()=>{});return n?Me._fromGetAccountInfoResponse(this.auth,n,e):null}return Me._fromJSON(this.auth,e)}removeCurrentUser(){return this.persistence._remove(this.fullUserKey)}savePersistenceForRedirect(){return this.persistence._set(this.fullPersistenceKey,this.persistence.type)}async setPersistence(e){if(this.persistence===e)return;const n=await this.getCurrentUser();if(await this.removeCurrentUser(),this.persistence=e,n)return this.setCurrentUser(n)}delete(){this.persistence._removeListener(this.fullUserKey,this.boundEventHandler)}static async create(e,n,s="authUser"){if(!n.length)return new vn(st(oa),e,s);const r=(await Promise.all(n.map(async l=>{if(await l._isAvailable())return l}))).filter(l=>l);let i=r[0]||st(oa);const o=Ar(s,e.config.apiKey,e.name);let a=null;for(const l of n)try{const u=await l._get(o);if(u){let d;if(typeof u=="string"){const h=await si(e,{idToken:u}).catch(()=>{});if(!h)break;d=await Me._fromGetAccountInfoResponse(e,h,u)}else d=Me._fromJSON(e,u);l!==i&&(a=d),i=l;break}}catch{}const c=r.filter(l=>l._shouldAllowMigration);return!i._shouldAllowMigration||!c.length?new vn(i,e,s):(i=c[0],a&&await i._set(o,a.toJSON()),await Promise.all(n.map(async l=>{if(l!==i)try{await l._remove(o)}catch{}})),new vn(i,e,s))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Xu(t){const e=t.toLowerCase();if(e.includes("opera/")||e.includes("opr/")||e.includes("opios/"))return"Opera";if(hp(e))return"IEMobile";if(e.includes("msie")||e.includes("trident/"))return"IE";if(e.includes("edge/"))return"Edge";if(lp(e))return"Firefox";if(e.includes("silk/"))return"Silk";if(pp(e))return"Blackberry";if(gp(e))return"Webos";if(up(e))return"Safari";if((e.includes("chrome/")||dp(e))&&!e.includes("edge/"))return"Chrome";if(fp(e))return"Android";{const n=/([a-zA-Z\d\.]+)\/[a-zA-Z\d\.]*$/,s=t.match(n);if(s?.length===2)return s[1]}return"Other"}function lp(t=ge()){return/firefox\//i.test(t)}function up(t=ge()){const e=t.toLowerCase();return e.includes("safari/")&&!e.includes("chrome/")&&!e.includes("crios/")&&!e.includes("android")}function dp(t=ge()){return/crios\//i.test(t)}function hp(t=ge()){return/iemobile/i.test(t)}function fp(t=ge()){return/android/i.test(t)}function pp(t=ge()){return/blackberry/i.test(t)}function gp(t=ge()){return/webos/i.test(t)}function Nc(t=ge()){return/iphone|ipad|ipod/i.test(t)||/macintosh/i.test(t)&&/mobile/i.test(t)}function NI(t=ge()){return Nc(t)&&!!window.navigator?.standalone}function PI(){return Iv()&&document.documentMode===10}function mp(t=ge()){return Nc(t)||fp(t)||gp(t)||pp(t)||/windows phone/i.test(t)||hp(t)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function _p(t,e=[]){let n;switch(t){case"Browser":n=Xu(ge());break;case"Worker":n=`${Xu(ge())}-${t}`;break;default:n=t}const s=e.length?e.join(","):"FirebaseCore-web";return`${n}/JsCore/${Jn}/${s}`}/**
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
 */class LI{constructor(e){this.auth=e,this.queue=[]}pushCallback(e,n){const s=i=>new Promise((o,a)=>{try{const c=e(i);o(c)}catch(c){a(c)}});s.onAbort=n,this.queue.push(s);const r=this.queue.length-1;return()=>{this.queue[r]=()=>Promise.resolve()}}async runMiddleware(e){if(this.auth.currentUser===e)return;const n=[];try{for(const s of this.queue)await s(e),s.onAbort&&n.push(s.onAbort)}catch(s){n.reverse();for(const r of n)try{r()}catch{}throw this.auth._errorFactory.create("login-blocked",{originalMessage:s?.message})}}}/**
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
 */async function OI(t,e={}){return es(t,"GET","/v2/passwordPolicy",kc(t,e))}/**
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
 */const DI=6;class xI{constructor(e){const n=e.customStrengthOptions;this.customStrengthOptions={},this.customStrengthOptions.minPasswordLength=n.minPasswordLength??DI,n.maxPasswordLength&&(this.customStrengthOptions.maxPasswordLength=n.maxPasswordLength),n.containsLowercaseCharacter!==void 0&&(this.customStrengthOptions.containsLowercaseLetter=n.containsLowercaseCharacter),n.containsUppercaseCharacter!==void 0&&(this.customStrengthOptions.containsUppercaseLetter=n.containsUppercaseCharacter),n.containsNumericCharacter!==void 0&&(this.customStrengthOptions.containsNumericCharacter=n.containsNumericCharacter),n.containsNonAlphanumericCharacter!==void 0&&(this.customStrengthOptions.containsNonAlphanumericCharacter=n.containsNonAlphanumericCharacter),this.enforcementState=e.enforcementState,this.enforcementState==="ENFORCEMENT_STATE_UNSPECIFIED"&&(this.enforcementState="OFF"),this.allowedNonAlphanumericCharacters=e.allowedNonAlphanumericCharacters?.join("")??"",this.forceUpgradeOnSignin=e.forceUpgradeOnSignin??!1,this.schemaVersion=e.schemaVersion}validatePassword(e){const n={isValid:!0,passwordPolicy:this};return this.validatePasswordLengthOptions(e,n),this.validatePasswordCharacterOptions(e,n),n.isValid&&(n.isValid=n.meetsMinPasswordLength??!0),n.isValid&&(n.isValid=n.meetsMaxPasswordLength??!0),n.isValid&&(n.isValid=n.containsLowercaseLetter??!0),n.isValid&&(n.isValid=n.containsUppercaseLetter??!0),n.isValid&&(n.isValid=n.containsNumericCharacter??!0),n.isValid&&(n.isValid=n.containsNonAlphanumericCharacter??!0),n}validatePasswordLengthOptions(e,n){const s=this.customStrengthOptions.minPasswordLength,r=this.customStrengthOptions.maxPasswordLength;s&&(n.meetsMinPasswordLength=e.length>=s),r&&(n.meetsMaxPasswordLength=e.length<=r)}validatePasswordCharacterOptions(e,n){this.updatePasswordCharacterOptionsStatuses(n,!1,!1,!1,!1);let s;for(let r=0;r<e.length;r++)s=e.charAt(r),this.updatePasswordCharacterOptionsStatuses(n,s>="a"&&s<="z",s>="A"&&s<="Z",s>="0"&&s<="9",this.allowedNonAlphanumericCharacters.includes(s))}updatePasswordCharacterOptionsStatuses(e,n,s,r,i){this.customStrengthOptions.containsLowercaseLetter&&(e.containsLowercaseLetter||(e.containsLowercaseLetter=n)),this.customStrengthOptions.containsUppercaseLetter&&(e.containsUppercaseLetter||(e.containsUppercaseLetter=s)),this.customStrengthOptions.containsNumericCharacter&&(e.containsNumericCharacter||(e.containsNumericCharacter=r)),this.customStrengthOptions.containsNonAlphanumericCharacter&&(e.containsNonAlphanumericCharacter||(e.containsNonAlphanumericCharacter=i))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class MI{constructor(e,n,s,r){this.app=e,this.heartbeatServiceProvider=n,this.appCheckServiceProvider=s,this.config=r,this.currentUser=null,this.emulatorConfig=null,this.operations=Promise.resolve(),this.authStateSubscription=new Zu(this),this.idTokenSubscription=new Zu(this),this.beforeStateQueue=new LI(this),this.redirectUser=null,this.isProactiveRefreshEnabled=!1,this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION=1,this._canInitEmulator=!0,this._isInitialized=!1,this._deleted=!1,this._initializationPromise=null,this._popupRedirectResolver=null,this._errorFactory=sp,this._agentRecaptchaConfig=null,this._tenantRecaptchaConfigs={},this._projectPasswordPolicy=null,this._tenantPasswordPolicies={},this._resolvePersistenceManagerAvailable=void 0,this.lastNotifiedUid=void 0,this.languageCode=null,this.tenantId=null,this.settings={appVerificationDisabledForTesting:!1},this.frameworks=[],this.name=e.name,this.clientVersion=r.sdkClientVersion,this._persistenceManagerAvailable=new Promise(i=>this._resolvePersistenceManagerAvailable=i)}_initializeWithPersistence(e,n){return n&&(this._popupRedirectResolver=st(n)),this._initializationPromise=this.queue(async()=>{if(!this._deleted&&(this.persistenceManager=await vn.create(this,e),this._resolvePersistenceManagerAvailable?.(),!this._deleted)){if(this._popupRedirectResolver?._shouldInitProactively)try{await this._popupRedirectResolver._initialize(this)}catch{}await this.initializeCurrentUser(n),this.lastNotifiedUid=this.currentUser?.uid||null,!this._deleted&&(this._isInitialized=!0)}}),this._initializationPromise}async _onStorageEvent(){if(this._deleted)return;const e=await this.assertedPersistence.getCurrentUser();if(!(!this.currentUser&&!e)){if(this.currentUser&&e&&this.currentUser.uid===e.uid){this._currentUser._assign(e),await this.currentUser.getIdToken();return}await this._updateCurrentUser(e,!0)}}async initializeCurrentUserFromIdToken(e){try{const n=await si(this,{idToken:e}),s=await Me._fromGetAccountInfoResponse(this,n,e);await this.directlySetCurrentUser(s)}catch(n){console.warn("FirebaseServerApp could not login user with provided authIdToken: ",n),await this.directlySetCurrentUser(null)}}async initializeCurrentUser(e){if(Le(this.app)){const i=this.app.settings.authIdToken;return i?new Promise(o=>{setTimeout(()=>this.initializeCurrentUserFromIdToken(i).then(o,o))}):this.directlySetCurrentUser(null)}const n=await this.assertedPersistence.getCurrentUser();let s=n,r=!1;if(e&&this.config.authDomain){await this.getOrInitRedirectPersistenceManager();const i=this.redirectUser?._redirectEventId,o=s?._redirectEventId,a=await this.tryRedirectSignIn(e);(!i||i===o)&&a?.user&&(s=a.user,r=!0)}if(!s)return this.directlySetCurrentUser(null);if(!s._redirectEventId){if(r)try{await this.beforeStateQueue.runMiddleware(s)}catch(i){s=n,this._popupRedirectResolver._overrideRedirectResult(this,()=>Promise.reject(i))}return s?this.reloadAndSetCurrentUserOrClear(s):this.directlySetCurrentUser(null)}return b(this._popupRedirectResolver,this,"argument-error"),await this.getOrInitRedirectPersistenceManager(),this.redirectUser&&this.redirectUser._redirectEventId===s._redirectEventId?this.directlySetCurrentUser(s):this.reloadAndSetCurrentUserOrClear(s)}async tryRedirectSignIn(e){let n=null;try{n=await this._popupRedirectResolver._completeRedirectFn(this,e,!0)}catch{await this._setRedirectUser(null)}return n}async reloadAndSetCurrentUserOrClear(e){try{await ri(e)}catch(n){if(n?.code!=="auth/network-request-failed")return this.directlySetCurrentUser(null)}return this.directlySetCurrentUser(e)}useDeviceLanguage(){this.languageCode=mI()}async _delete(){this._deleted=!0}async updateCurrentUser(e){if(Le(this.app))return Promise.reject(Xt(this));const n=e?ue(e):null;return n&&b(n.auth.config.apiKey===this.config.apiKey,this,"invalid-user-token"),this._updateCurrentUser(n&&n._clone(this))}async _updateCurrentUser(e,n=!1){if(!this._deleted)return e&&b(this.tenantId===e.tenantId,this,"tenant-id-mismatch"),n||await this.beforeStateQueue.runMiddleware(e),this.queue(async()=>{await this.directlySetCurrentUser(e),this.notifyAuthListeners()})}async signOut(){return Le(this.app)?Promise.reject(Xt(this)):(await this.beforeStateQueue.runMiddleware(null),(this.redirectPersistenceManager||this._popupRedirectResolver)&&await this._setRedirectUser(null),this._updateCurrentUser(null,!0))}setPersistence(e){return Le(this.app)?Promise.reject(Xt(this)):this.queue(async()=>{await this.assertedPersistence.setPersistence(st(e))})}_getRecaptchaConfig(){return this.tenantId==null?this._agentRecaptchaConfig:this._tenantRecaptchaConfigs[this.tenantId]}async validatePassword(e){this._getPasswordPolicyInternal()||await this._updatePasswordPolicy();const n=this._getPasswordPolicyInternal();return n.schemaVersion!==this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION?Promise.reject(this._errorFactory.create("unsupported-password-policy-schema-version",{})):n.validatePassword(e)}_getPasswordPolicyInternal(){return this.tenantId===null?this._projectPasswordPolicy:this._tenantPasswordPolicies[this.tenantId]}async _updatePasswordPolicy(){const e=await OI(this),n=new xI(e);this.tenantId===null?this._projectPasswordPolicy=n:this._tenantPasswordPolicies[this.tenantId]=n}_getPersistenceType(){return this.assertedPersistence.persistence.type}_getPersistence(){return this.assertedPersistence.persistence}_updateErrorMap(e){this._errorFactory=new Xs("auth","Firebase",e())}onAuthStateChanged(e,n,s){return this.registerStateListener(this.authStateSubscription,e,n,s)}beforeAuthStateChanged(e,n){return this.beforeStateQueue.pushCallback(e,n)}onIdTokenChanged(e,n,s){return this.registerStateListener(this.idTokenSubscription,e,n,s)}authStateReady(){return new Promise((e,n)=>{if(this.currentUser)e();else{const s=this.onAuthStateChanged(()=>{s(),e()},n)}})}async revokeAccessToken(e){if(this.currentUser){const n=await this.currentUser.getIdToken(),s={providerId:"apple.com",tokenType:"ACCESS_TOKEN",token:e,idToken:n};this.tenantId!=null&&(s.tenantId=this.tenantId),await AI(this,s)}}toJSON(){return{apiKey:this.config.apiKey,authDomain:this.config.authDomain,appName:this.name,currentUser:this._currentUser?.toJSON()}}async _setRedirectUser(e,n){const s=await this.getOrInitRedirectPersistenceManager(n);return e===null?s.removeCurrentUser():s.setCurrentUser(e)}async getOrInitRedirectPersistenceManager(e){if(!this.redirectPersistenceManager){const n=e&&st(e)||this._popupRedirectResolver;b(n,this,"argument-error"),this.redirectPersistenceManager=await vn.create(this,[st(n._redirectPersistence)],"redirectUser"),this.redirectUser=await this.redirectPersistenceManager.getCurrentUser()}return this.redirectPersistenceManager}async _redirectUserForId(e){return this._isInitialized&&await this.queue(async()=>{}),this._currentUser?._redirectEventId===e?this._currentUser:this.redirectUser?._redirectEventId===e?this.redirectUser:null}async _persistUserIfCurrent(e){if(e===this.currentUser)return this.queue(async()=>this.directlySetCurrentUser(e))}_notifyListenersIfCurrent(e){e===this.currentUser&&this.notifyAuthListeners()}_key(){return`${this.config.authDomain}:${this.config.apiKey}:${this.name}`}_startProactiveRefresh(){this.isProactiveRefreshEnabled=!0,this.currentUser&&this._currentUser._startProactiveRefresh()}_stopProactiveRefresh(){this.isProactiveRefreshEnabled=!1,this.currentUser&&this._currentUser._stopProactiveRefresh()}get _currentUser(){return this.currentUser}notifyAuthListeners(){if(!this._isInitialized)return;this.idTokenSubscription.next(this.currentUser);const e=this.currentUser?.uid??null;this.lastNotifiedUid!==e&&(this.lastNotifiedUid=e,this.authStateSubscription.next(this.currentUser))}registerStateListener(e,n,s,r){if(this._deleted)return()=>{};const i=typeof n=="function"?n:n.next.bind(n);let o=!1;const a=this._isInitialized?Promise.resolve():this._initializationPromise;if(b(a,this,"internal-error"),a.then(()=>{o||i(this.currentUser)}),typeof n=="function"){const c=e.addObserver(n,s,r);return()=>{o=!0,c()}}else{const c=e.addObserver(n);return()=>{o=!0,c()}}}async directlySetCurrentUser(e){this.currentUser&&this.currentUser!==e&&this._currentUser._stopProactiveRefresh(),e&&this.isProactiveRefreshEnabled&&e._startProactiveRefresh(),this.currentUser=e,e?await this.assertedPersistence.setCurrentUser(e):await this.assertedPersistence.removeCurrentUser()}queue(e){return this.operations=this.operations.then(e,e),this.operations}get assertedPersistence(){return b(this.persistenceManager,this,"internal-error"),this.persistenceManager}_logFramework(e){!e||this.frameworks.includes(e)||(this.frameworks.push(e),this.frameworks.sort(),this.clientVersion=_p(this.config.clientPlatform,this._getFrameworks()))}_getFrameworks(){return this.frameworks}async _getAdditionalHeaders(){const e={"X-Client-Version":this.clientVersion};this.app.options.appId&&(e["X-Firebase-gmpid"]=this.app.options.appId);const n=await this.heartbeatServiceProvider.getImmediate({optional:!0})?.getHeartbeatsHeader();n&&(e["X-Firebase-Client"]=n);const s=await this._getAppCheckToken();return s&&(e["X-Firebase-AppCheck"]=s),e}async _getAppCheckToken(){if(Le(this.app)&&this.app.settings.appCheckToken)return this.app.settings.appCheckToken;const e=await this.appCheckServiceProvider.getImmediate({optional:!0})?.getToken();return e?.error&&hI(`Error while retrieving App Check token: ${e.error}`),e?.token}}function ts(t){return ue(t)}class Zu{constructor(e){this.auth=e,this.observer=null,this.addObserver=xv(n=>this.observer=n)}get next(){return b(this.observer,this.auth,"internal-error"),this.observer.next.bind(this.observer)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Pc={async loadJS(){throw new Error("Unable to load external scripts")},recaptchaV2Script:"",recaptchaEnterpriseScript:"",gapiScript:""};function FI(t){Pc=t}function UI(t){return Pc.loadJS(t)}function $I(){return Pc.gapiScript}function BI(t){return`__${t}${Math.floor(Math.random()*1e6)}`}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function HI(t,e){const n=Ba(t,"auth");if(n.isInitialized()){const r=n.getImmediate(),i=n.getOptions();if(nn(i,e??{}))return r;Ye(r,"already-initialized")}return n.initialize({options:e})}function WI(t,e){const n=e?.persistence||[],s=(Array.isArray(n)?n:[n]).map(st);e?.errorMap&&t._updateErrorMap(e.errorMap),t._initializeWithPersistence(s,e?.popupRedirectResolver)}function VI(t,e,n){const s=ts(t);b(/^https?:\/\//.test(e),s,"invalid-emulator-scheme");const r=!1,i=yp(e),{host:o,port:a}=jI(e),c=a===null?"":`:${a}`,l={url:`${i}//${o}${c}/`},u=Object.freeze({host:o,port:a,protocol:i.replace(":",""),options:Object.freeze({disableWarnings:r})});if(!s._canInitEmulator){b(s.config.emulator&&s.emulatorConfig,s,"emulator-config-failed"),b(nn(l,s.config.emulator)&&nn(u,s.emulatorConfig),s,"emulator-config-failed");return}s.config.emulator=l,s.emulatorConfig=u,s.settings.appVerificationDisabledForTesting=!0,Yn(o)?(Rh(`${i}//${o}${c}`),kh("Auth",!0)):GI()}function yp(t){const e=t.indexOf(":");return e<0?"":t.substr(0,e+1)}function jI(t){const e=yp(t),n=/(\/\/)?([^?#/]+)/.exec(t.substr(e.length));if(!n)return{host:"",port:null};const s=n[2].split("@").pop()||"",r=/^(\[[^\]]+\])(:|$)/.exec(s);if(r){const i=r[1];return{host:i,port:ed(s.substr(i.length+1))}}else{const[i,o]=s.split(":");return{host:i,port:ed(o)}}}function ed(t){if(!t)return null;const e=Number(t);return isNaN(e)?null:e}function GI(){function t(){const e=document.createElement("p"),n=e.style;e.innerText="Running in emulator mode. Do not use with production credentials.",n.position="fixed",n.width="100%",n.backgroundColor="#ffffff",n.border=".1em solid #000000",n.color="#b50000",n.bottom="0px",n.left="0px",n.margin="0px",n.zIndex="10000",n.textAlign="center",e.classList.add("firebase-emulator-warning"),document.body.appendChild(e)}typeof console<"u"&&typeof console.info=="function"&&console.info("WARNING: You are using the Auth Emulator, which is intended for local testing only.  Do not use with production credentials."),typeof window<"u"&&typeof document<"u"&&(document.readyState==="loading"?window.addEventListener("DOMContentLoaded",t):t())}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ep{constructor(e,n){this.providerId=e,this.signInMethod=n}toJSON(){return nt("not implemented")}_getIdTokenResponse(e){return nt("not implemented")}_linkToIdToken(e,n){return nt("not implemented")}_getReauthenticationResolver(e){return nt("not implemented")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function wn(t,e){return vI(t,"POST","/v1/accounts:signInWithIdp",kc(t,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const zI="http://localhost";class cn extends Ep{constructor(){super(...arguments),this.pendingToken=null}static _fromParams(e){const n=new cn(e.providerId,e.signInMethod);return e.idToken||e.accessToken?(e.idToken&&(n.idToken=e.idToken),e.accessToken&&(n.accessToken=e.accessToken),e.nonce&&!e.pendingToken&&(n.nonce=e.nonce),e.pendingToken&&(n.pendingToken=e.pendingToken)):e.oauthToken&&e.oauthTokenSecret?(n.accessToken=e.oauthToken,n.secret=e.oauthTokenSecret):Ye("argument-error"),n}toJSON(){return{idToken:this.idToken,accessToken:this.accessToken,secret:this.secret,nonce:this.nonce,pendingToken:this.pendingToken,providerId:this.providerId,signInMethod:this.signInMethod}}static fromJSON(e){const n=typeof e=="string"?JSON.parse(e):e,{providerId:s,signInMethod:r,...i}=n;if(!s||!r)return null;const o=new cn(s,r);return o.idToken=i.idToken||void 0,o.accessToken=i.accessToken||void 0,o.secret=i.secret,o.nonce=i.nonce,o.pendingToken=i.pendingToken||null,o}_getIdTokenResponse(e){const n=this.buildRequest();return wn(e,n)}_linkToIdToken(e,n){const s=this.buildRequest();return s.idToken=n,wn(e,s)}_getReauthenticationResolver(e){const n=this.buildRequest();return n.autoCreate=!1,wn(e,n)}buildRequest(){const e={requestUri:zI,returnSecureToken:!0};if(this.pendingToken)e.pendingToken=this.pendingToken;else{const n={};this.idToken&&(n.id_token=this.idToken),this.accessToken&&(n.access_token=this.accessToken),this.secret&&(n.oauth_token_secret=this.secret),n.providerId=this.providerId,this.nonce&&!this.pendingToken&&(n.nonce=this.nonce),e.postBody=Kn(n)}return e}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Lc{constructor(e){this.providerId=e,this.defaultLanguageCode=null,this.customParameters={}}setDefaultLanguage(e){this.defaultLanguageCode=e}setCustomParameters(e){return this.customParameters=e,this}getCustomParameters(){return this.customParameters}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ar extends Lc{constructor(){super(...arguments),this.scopes=[]}addScope(e){return this.scopes.includes(e)||this.scopes.push(e),this}getScopes(){return[...this.scopes]}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class gt extends ar{constructor(){super("facebook.com")}static credential(e){return cn._fromParams({providerId:gt.PROVIDER_ID,signInMethod:gt.FACEBOOK_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return gt.credentialFromTaggedObject(e)}static credentialFromError(e){return gt.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return gt.credential(e.oauthAccessToken)}catch{return null}}}gt.FACEBOOK_SIGN_IN_METHOD="facebook.com";gt.PROVIDER_ID="facebook.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class _e extends ar{constructor(){super("google.com"),this.addScope("profile")}static credential(e,n){return cn._fromParams({providerId:_e.PROVIDER_ID,signInMethod:_e.GOOGLE_SIGN_IN_METHOD,idToken:e,accessToken:n})}static credentialFromResult(e){return _e.credentialFromTaggedObject(e)}static credentialFromError(e){return _e.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthIdToken:n,oauthAccessToken:s}=e;if(!n&&!s)return null;try{return _e.credential(n,s)}catch{return null}}}_e.GOOGLE_SIGN_IN_METHOD="google.com";_e.PROVIDER_ID="google.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class mt extends ar{constructor(){super("github.com")}static credential(e){return cn._fromParams({providerId:mt.PROVIDER_ID,signInMethod:mt.GITHUB_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return mt.credentialFromTaggedObject(e)}static credentialFromError(e){return mt.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return mt.credential(e.oauthAccessToken)}catch{return null}}}mt.GITHUB_SIGN_IN_METHOD="github.com";mt.PROVIDER_ID="github.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class _t extends ar{constructor(){super("twitter.com")}static credential(e,n){return cn._fromParams({providerId:_t.PROVIDER_ID,signInMethod:_t.TWITTER_SIGN_IN_METHOD,oauthToken:e,oauthTokenSecret:n})}static credentialFromResult(e){return _t.credentialFromTaggedObject(e)}static credentialFromError(e){return _t.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthAccessToken:n,oauthTokenSecret:s}=e;if(!n||!s)return null;try{return _t.credential(n,s)}catch{return null}}}_t.TWITTER_SIGN_IN_METHOD="twitter.com";_t.PROVIDER_ID="twitter.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Hn{constructor(e){this.user=e.user,this.providerId=e.providerId,this._tokenResponse=e._tokenResponse,this.operationType=e.operationType}static async _fromIdTokenResponse(e,n,s,r=!1){const i=await Me._fromIdTokenResponse(e,s,r),o=td(s);return new Hn({user:i,providerId:o,_tokenResponse:s,operationType:n})}static async _forOperation(e,n,s){await e._updateTokensIfNecessary(s,!0);const r=td(s);return new Hn({user:e,providerId:r,_tokenResponse:s,operationType:n})}}function td(t){return t.providerId?t.providerId:"phoneNumber"in t?"phone":null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ii extends Ft{constructor(e,n,s,r){super(n.code,n.message),this.operationType=s,this.user=r,Object.setPrototypeOf(this,ii.prototype),this.customData={appName:e.name,tenantId:e.tenantId??void 0,_serverResponse:n.customData._serverResponse,operationType:s}}static _fromErrorAndOperation(e,n,s,r){return new ii(e,n,s,r)}}function vp(t,e,n,s){return(e==="reauthenticate"?n._getReauthenticationResolver(t):n._getIdTokenResponse(t)).catch(i=>{throw i.code==="auth/multi-factor-auth-required"?ii._fromErrorAndOperation(t,i,e,s):i})}async function qI(t,e,n=!1){const s=await Ws(t,e._linkToIdToken(t.auth,await t.getIdToken()),n);return Hn._forOperation(t,"link",s)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function YI(t,e,n=!1){const{auth:s}=t;if(Le(s.app))return Promise.reject(Xt(s));const r="reauthenticate";try{const i=await Ws(t,vp(s,r,e,t),n);b(i.idToken,s,"internal-error");const o=Ac(i.idToken);b(o,s,"internal-error");const{sub:a}=o;return b(t.uid===a,s,"user-mismatch"),Hn._forOperation(t,r,i)}catch(i){throw i?.code==="auth/user-not-found"&&Ye(s,"user-mismatch"),i}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function wp(t,e,n=!1){if(Le(t.app))return Promise.reject(Xt(t));const s="signIn",r=await vp(t,s,e),i=await Hn._fromIdTokenResponse(t,s,r);return n||await t._updateCurrentUser(i.user),i}async function KI(t,e){return wp(ts(t),e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function _o(t,e){return ue(t).setPersistence(e)}function JI(t,e,n,s){return ue(t).onIdTokenChanged(e,n,s)}function QI(t,e,n){return ue(t).beforeAuthStateChanged(e,n)}function bp(t,e,n,s){return ue(t).onAuthStateChanged(e,n,s)}function XI(t){return ue(t).signOut()}const oi="__sak";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Sp{constructor(e,n){this.storageRetriever=e,this.type=n}_isAvailable(){try{return this.storage?(this.storage.setItem(oi,"1"),this.storage.removeItem(oi),Promise.resolve(!0)):Promise.resolve(!1)}catch{return Promise.resolve(!1)}}_set(e,n){return this.storage.setItem(e,JSON.stringify(n)),Promise.resolve()}_get(e){const n=this.storage.getItem(e);return Promise.resolve(n?JSON.parse(n):null)}_remove(e){return this.storage.removeItem(e),Promise.resolve()}get storage(){return this.storageRetriever()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ZI=1e3,eT=10;class Cp extends Sp{constructor(){super(()=>window.localStorage,"LOCAL"),this.boundEventHandler=(e,n)=>this.onStorageEvent(e,n),this.listeners={},this.localCache={},this.pollTimer=null,this.fallbackToPolling=mp(),this._shouldAllowMigration=!0}forAllChangedKeys(e){for(const n of Object.keys(this.listeners)){const s=this.storage.getItem(n),r=this.localCache[n];s!==r&&e(n,r,s)}}onStorageEvent(e,n=!1){if(!e.key){this.forAllChangedKeys((o,a,c)=>{this.notifyListeners(o,c)});return}const s=e.key;n?this.detachListener():this.stopPolling();const r=()=>{const o=this.storage.getItem(s);!n&&this.localCache[s]===o||this.notifyListeners(s,o)},i=this.storage.getItem(s);PI()&&i!==e.newValue&&e.newValue!==e.oldValue?setTimeout(r,eT):r()}notifyListeners(e,n){this.localCache[e]=n;const s=this.listeners[e];if(s)for(const r of Array.from(s))r(n&&JSON.parse(n))}startPolling(){this.stopPolling(),this.pollTimer=setInterval(()=>{this.forAllChangedKeys((e,n,s)=>{this.onStorageEvent(new StorageEvent("storage",{key:e,oldValue:n,newValue:s}),!0)})},ZI)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}attachListener(){window.addEventListener("storage",this.boundEventHandler)}detachListener(){window.removeEventListener("storage",this.boundEventHandler)}_addListener(e,n){Object.keys(this.listeners).length===0&&(this.fallbackToPolling?this.startPolling():this.attachListener()),this.listeners[e]||(this.listeners[e]=new Set,this.localCache[e]=this.storage.getItem(e)),this.listeners[e].add(n)}_removeListener(e,n){this.listeners[e]&&(this.listeners[e].delete(n),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&(this.detachListener(),this.stopPolling())}async _set(e,n){await super._set(e,n),this.localCache[e]=JSON.stringify(n)}async _get(e){const n=await super._get(e);return this.localCache[e]=JSON.stringify(n),n}async _remove(e){await super._remove(e),delete this.localCache[e]}}Cp.type="LOCAL";const Ip=Cp;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Tp extends Sp{constructor(){super(()=>window.sessionStorage,"SESSION")}_addListener(e,n){}_removeListener(e,n){}}Tp.type="SESSION";const Rp=Tp;/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function tT(t){return Promise.all(t.map(async e=>{try{return{fulfilled:!0,value:await e}}catch(n){return{fulfilled:!1,reason:n}}}))}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class $i{constructor(e){this.eventTarget=e,this.handlersMap={},this.boundEventHandler=this.handleEvent.bind(this)}static _getInstance(e){const n=this.receivers.find(r=>r.isListeningto(e));if(n)return n;const s=new $i(e);return this.receivers.push(s),s}isListeningto(e){return this.eventTarget===e}async handleEvent(e){const n=e,{eventId:s,eventType:r,data:i}=n.data,o=this.handlersMap[r];if(!o?.size)return;n.ports[0].postMessage({status:"ack",eventId:s,eventType:r});const a=Array.from(o).map(async l=>l(n.origin,i)),c=await tT(a);n.ports[0].postMessage({status:"done",eventId:s,eventType:r,response:c})}_subscribe(e,n){Object.keys(this.handlersMap).length===0&&this.eventTarget.addEventListener("message",this.boundEventHandler),this.handlersMap[e]||(this.handlersMap[e]=new Set),this.handlersMap[e].add(n)}_unsubscribe(e,n){this.handlersMap[e]&&n&&this.handlersMap[e].delete(n),(!n||this.handlersMap[e].size===0)&&delete this.handlersMap[e],Object.keys(this.handlersMap).length===0&&this.eventTarget.removeEventListener("message",this.boundEventHandler)}}$i.receivers=[];/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Oc(t="",e=10){let n="";for(let s=0;s<e;s++)n+=Math.floor(Math.random()*10);return t+n}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class nT{constructor(e){this.target=e,this.handlers=new Set}removeMessageHandler(e){e.messageChannel&&(e.messageChannel.port1.removeEventListener("message",e.onMessage),e.messageChannel.port1.close()),this.handlers.delete(e)}async _send(e,n,s=50){const r=typeof MessageChannel<"u"?new MessageChannel:null;if(!r)throw new Error("connection_unavailable");let i,o;return new Promise((a,c)=>{const l=Oc("",20);r.port1.start();const u=setTimeout(()=>{c(new Error("unsupported_event"))},s);o={messageChannel:r,onMessage(d){const h=d;if(h.data.eventId===l)switch(h.data.status){case"ack":clearTimeout(u),i=setTimeout(()=>{c(new Error("timeout"))},3e3);break;case"done":clearTimeout(i),a(h.data.response);break;default:clearTimeout(u),clearTimeout(i),c(new Error("invalid_response"));break}}},this.handlers.add(o),r.port1.addEventListener("message",o.onMessage),this.target.postMessage({eventType:e,eventId:l,data:n},[r.port2])}).finally(()=>{o&&this.removeMessageHandler(o)})}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function qe(){return window}function sT(t){qe().location.href=t}/**
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
 */function kp(){return typeof qe().WorkerGlobalScope<"u"&&typeof qe().importScripts=="function"}async function rT(){if(!navigator?.serviceWorker)return null;try{return(await navigator.serviceWorker.ready).active}catch{return null}}function iT(){return navigator?.serviceWorker?.controller||null}function oT(){return kp()?self:null}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ap="firebaseLocalStorageDb",aT=1,ai="firebaseLocalStorage",Np="fbase_key";class cr{constructor(e){this.request=e}toPromise(){return new Promise((e,n)=>{this.request.addEventListener("success",()=>{e(this.request.result)}),this.request.addEventListener("error",()=>{n(this.request.error)})})}}function Bi(t,e){return t.transaction([ai],e?"readwrite":"readonly").objectStore(ai)}function cT(){const t=indexedDB.deleteDatabase(Ap);return new cr(t).toPromise()}function aa(){const t=indexedDB.open(Ap,aT);return new Promise((e,n)=>{t.addEventListener("error",()=>{n(t.error)}),t.addEventListener("upgradeneeded",()=>{const s=t.result;try{s.createObjectStore(ai,{keyPath:Np})}catch(r){n(r)}}),t.addEventListener("success",async()=>{const s=t.result;s.objectStoreNames.contains(ai)?e(s):(s.close(),await cT(),e(await aa()))})})}async function nd(t,e,n){const s=Bi(t,!0).put({[Np]:e,value:n});return new cr(s).toPromise()}async function lT(t,e){const n=Bi(t,!1).get(e),s=await new cr(n).toPromise();return s===void 0?null:s.value}function sd(t,e){const n=Bi(t,!0).delete(e);return new cr(n).toPromise()}const uT=800,dT=3;class Pp{constructor(){this.type="LOCAL",this._shouldAllowMigration=!0,this.listeners={},this.localCache={},this.pollTimer=null,this.pendingWrites=0,this.receiver=null,this.sender=null,this.serviceWorkerReceiverAvailable=!1,this.activeServiceWorker=null,this._workerInitializationPromise=this.initializeServiceWorkerMessaging().then(()=>{},()=>{})}async _openDb(){return this.db?this.db:(this.db=await aa(),this.db)}async _withRetries(e){let n=0;for(;;)try{const s=await this._openDb();return await e(s)}catch(s){if(n++>dT)throw s;this.db&&(this.db.close(),this.db=void 0)}}async initializeServiceWorkerMessaging(){return kp()?this.initializeReceiver():this.initializeSender()}async initializeReceiver(){this.receiver=$i._getInstance(oT()),this.receiver._subscribe("keyChanged",async(e,n)=>({keyProcessed:(await this._poll()).includes(n.key)})),this.receiver._subscribe("ping",async(e,n)=>["keyChanged"])}async initializeSender(){if(this.activeServiceWorker=await rT(),!this.activeServiceWorker)return;this.sender=new nT(this.activeServiceWorker);const e=await this.sender._send("ping",{},800);e&&e[0]?.fulfilled&&e[0]?.value.includes("keyChanged")&&(this.serviceWorkerReceiverAvailable=!0)}async notifyServiceWorker(e){if(!(!this.sender||!this.activeServiceWorker||iT()!==this.activeServiceWorker))try{await this.sender._send("keyChanged",{key:e},this.serviceWorkerReceiverAvailable?800:50)}catch{}}async _isAvailable(){try{if(!indexedDB)return!1;const e=await aa();return await nd(e,oi,"1"),await sd(e,oi),!0}catch{}return!1}async _withPendingWrite(e){this.pendingWrites++;try{await e()}finally{this.pendingWrites--}}async _set(e,n){return this._withPendingWrite(async()=>(await this._withRetries(s=>nd(s,e,n)),this.localCache[e]=n,this.notifyServiceWorker(e)))}async _get(e){const n=await this._withRetries(s=>lT(s,e));return this.localCache[e]=n,n}async _remove(e){return this._withPendingWrite(async()=>(await this._withRetries(n=>sd(n,e)),delete this.localCache[e],this.notifyServiceWorker(e)))}async _poll(){const e=await this._withRetries(r=>{const i=Bi(r,!1).getAll();return new cr(i).toPromise()});if(!e)return[];if(this.pendingWrites!==0)return[];const n=[],s=new Set;if(e.length!==0)for(const{fbase_key:r,value:i}of e)s.add(r),JSON.stringify(this.localCache[r])!==JSON.stringify(i)&&(this.notifyListeners(r,i),n.push(r));for(const r of Object.keys(this.localCache))this.localCache[r]&&!s.has(r)&&(this.notifyListeners(r,null),n.push(r));return n}notifyListeners(e,n){this.localCache[e]=n;const s=this.listeners[e];if(s)for(const r of Array.from(s))r(n)}startPolling(){this.stopPolling(),this.pollTimer=setInterval(async()=>this._poll(),uT)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}_addListener(e,n){Object.keys(this.listeners).length===0&&this.startPolling(),this.listeners[e]||(this.listeners[e]=new Set,this._get(e)),this.listeners[e].add(n)}_removeListener(e,n){this.listeners[e]&&(this.listeners[e].delete(n),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&this.stopPolling()}}Pp.type="LOCAL";const Lp=Pp;new or(3e4,6e4);/**
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
 */function Op(t,e){return e?st(e):(b(t._popupRedirectResolver,t,"argument-error"),t._popupRedirectResolver)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Dc extends Ep{constructor(e){super("custom","custom"),this.params=e}_getIdTokenResponse(e){return wn(e,this._buildIdpRequest())}_linkToIdToken(e,n){return wn(e,this._buildIdpRequest(n))}_getReauthenticationResolver(e){return wn(e,this._buildIdpRequest())}_buildIdpRequest(e){const n={requestUri:this.params.requestUri,sessionId:this.params.sessionId,postBody:this.params.postBody,tenantId:this.params.tenantId,pendingToken:this.params.pendingToken,returnSecureToken:!0,returnIdpCredential:!0};return e&&(n.idToken=e),n}}function hT(t){return wp(t.auth,new Dc(t),t.bypassAuthState)}function fT(t){const{auth:e,user:n}=t;return b(n,e,"internal-error"),YI(n,new Dc(t),t.bypassAuthState)}async function pT(t){const{auth:e,user:n}=t;return b(n,e,"internal-error"),qI(n,new Dc(t),t.bypassAuthState)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Dp{constructor(e,n,s,r,i=!1){this.auth=e,this.resolver=s,this.user=r,this.bypassAuthState=i,this.pendingPromise=null,this.eventManager=null,this.filter=Array.isArray(n)?n:[n]}execute(){return new Promise(async(e,n)=>{this.pendingPromise={resolve:e,reject:n};try{this.eventManager=await this.resolver._initialize(this.auth),await this.onExecution(),this.eventManager.registerConsumer(this)}catch(s){this.reject(s)}})}async onAuthEvent(e){const{urlResponse:n,sessionId:s,postBody:r,tenantId:i,error:o,type:a}=e;if(o){this.reject(o);return}const c={auth:this.auth,requestUri:n,sessionId:s,tenantId:i||void 0,postBody:r||void 0,user:this.user,bypassAuthState:this.bypassAuthState};try{this.resolve(await this.getIdpTask(a)(c))}catch(l){this.reject(l)}}onError(e){this.reject(e)}getIdpTask(e){switch(e){case"signInViaPopup":case"signInViaRedirect":return hT;case"linkViaPopup":case"linkViaRedirect":return pT;case"reauthViaPopup":case"reauthViaRedirect":return fT;default:Ye(this.auth,"internal-error")}}resolve(e){dt(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.resolve(e),this.unregisterAndCleanUp()}reject(e){dt(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.reject(e),this.unregisterAndCleanUp()}unregisterAndCleanUp(){this.eventManager&&this.eventManager.unregisterConsumer(this),this.pendingPromise=null,this.cleanUp()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const gT=new or(2e3,1e4);async function mT(t,e,n){if(Le(t.app))return Promise.reject($e(t,"operation-not-supported-in-this-environment"));const s=ts(t);fI(t,e,Lc);const r=Op(s,n);return new Kt(s,"signInViaPopup",e,r).executeNotNull()}class Kt extends Dp{constructor(e,n,s,r,i){super(e,n,r,i),this.provider=s,this.authWindow=null,this.pollId=null,Kt.currentPopupAction&&Kt.currentPopupAction.cancel(),Kt.currentPopupAction=this}async executeNotNull(){const e=await this.execute();return b(e,this.auth,"internal-error"),e}async onExecution(){dt(this.filter.length===1,"Popup operations only handle one event");const e=Oc();this.authWindow=await this.resolver._openPopup(this.auth,this.provider,this.filter[0],e),this.authWindow.associatedEvent=e,this.resolver._originValidation(this.auth).catch(n=>{this.reject(n)}),this.resolver._isIframeWebStorageSupported(this.auth,n=>{n||this.reject($e(this.auth,"web-storage-unsupported"))}),this.pollUserCancellation()}get eventId(){return this.authWindow?.associatedEvent||null}cancel(){this.reject($e(this.auth,"cancelled-popup-request"))}cleanUp(){this.authWindow&&this.authWindow.close(),this.pollId&&window.clearTimeout(this.pollId),this.authWindow=null,this.pollId=null,Kt.currentPopupAction=null}pollUserCancellation(){const e=()=>{if(this.authWindow?.window?.closed){this.pollId=window.setTimeout(()=>{this.pollId=null,this.reject($e(this.auth,"popup-closed-by-user"))},8e3);return}this.pollId=window.setTimeout(e,gT.get())};e()}}Kt.currentPopupAction=null;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const _T="pendingRedirect",Nr=new Map;class yT extends Dp{constructor(e,n,s=!1){super(e,["signInViaRedirect","linkViaRedirect","reauthViaRedirect","unknown"],n,void 0,s),this.eventId=null}async execute(){let e=Nr.get(this.auth._key());if(!e){try{const s=await ET(this.resolver,this.auth)?await super.execute():null;e=()=>Promise.resolve(s)}catch(n){e=()=>Promise.reject(n)}Nr.set(this.auth._key(),e)}return this.bypassAuthState||Nr.set(this.auth._key(),()=>Promise.resolve(null)),e()}async onAuthEvent(e){if(e.type==="signInViaRedirect")return super.onAuthEvent(e);if(e.type==="unknown"){this.resolve(null);return}if(e.eventId){const n=await this.auth._redirectUserForId(e.eventId);if(n)return this.user=n,super.onAuthEvent(e);this.resolve(null)}}async onExecution(){}cleanUp(){}}async function ET(t,e){const n=bT(e),s=wT(t);if(!await s._isAvailable())return!1;const r=await s._get(n)==="true";return await s._remove(n),r}function vT(t,e){Nr.set(t._key(),e)}function wT(t){return st(t._redirectPersistence)}function bT(t){return Ar(_T,t.config.apiKey,t.name)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function ST(t,e){return await ts(t)._initializationPromise,xp(t,e,!1)}async function xp(t,e,n=!1){if(Le(t.app))return Promise.reject(Xt(t));const s=ts(t),r=Op(s,e),o=await new yT(s,r,n).execute();return o&&!n&&(delete o.user._redirectEventId,await s._persistUserIfCurrent(o.user),await s._setRedirectUser(null,e)),o}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const CT=600*1e3;class IT{constructor(e){this.auth=e,this.cachedEventUids=new Set,this.consumers=new Set,this.queuedRedirectEvent=null,this.hasHandledPotentialRedirect=!1,this.lastProcessedEventTime=Date.now()}registerConsumer(e){this.consumers.add(e),this.queuedRedirectEvent&&this.isEventForConsumer(this.queuedRedirectEvent,e)&&(this.sendToConsumer(this.queuedRedirectEvent,e),this.saveEventToCache(this.queuedRedirectEvent),this.queuedRedirectEvent=null)}unregisterConsumer(e){this.consumers.delete(e)}onEvent(e){if(this.hasEventBeenHandled(e))return!1;let n=!1;return this.consumers.forEach(s=>{this.isEventForConsumer(e,s)&&(n=!0,this.sendToConsumer(e,s),this.saveEventToCache(e))}),this.hasHandledPotentialRedirect||!TT(e)||(this.hasHandledPotentialRedirect=!0,n||(this.queuedRedirectEvent=e,n=!0)),n}sendToConsumer(e,n){if(e.error&&!Mp(e)){const s=e.error.code?.split("auth/")[1]||"internal-error";n.onError($e(this.auth,s))}else n.onAuthEvent(e)}isEventForConsumer(e,n){const s=n.eventId===null||!!e.eventId&&e.eventId===n.eventId;return n.filter.includes(e.type)&&s}hasEventBeenHandled(e){return Date.now()-this.lastProcessedEventTime>=CT&&this.cachedEventUids.clear(),this.cachedEventUids.has(rd(e))}saveEventToCache(e){this.cachedEventUids.add(rd(e)),this.lastProcessedEventTime=Date.now()}}function rd(t){return[t.type,t.eventId,t.sessionId,t.tenantId].filter(e=>e).join("-")}function Mp({type:t,error:e}){return t==="unknown"&&e?.code==="auth/no-auth-event"}function TT(t){switch(t.type){case"signInViaRedirect":case"linkViaRedirect":case"reauthViaRedirect":return!0;case"unknown":return Mp(t);default:return!1}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function RT(t,e={}){return es(t,"GET","/v1/projects",e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const kT=/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/,AT=/^https?/;async function NT(t){if(t.config.emulator)return;const{authorizedDomains:e}=await RT(t);for(const n of e)try{if(PT(n))return}catch{}Ye(t,"unauthorized-domain")}function PT(t){const e=ra(),{protocol:n,hostname:s}=new URL(e);if(t.startsWith("chrome-extension://")){const o=new URL(t);return o.hostname===""&&s===""?n==="chrome-extension:"&&t.replace("chrome-extension://","")===e.replace("chrome-extension://",""):n==="chrome-extension:"&&o.hostname===s}if(!AT.test(n))return!1;if(kT.test(t))return s===t;const r=t.replace(/\./g,"\\.");return new RegExp("^(.+\\."+r+"|"+r+")$","i").test(s)}/**
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
 */const LT=new or(3e4,6e4);function id(){const t=qe().___jsl;if(t?.H){for(const e of Object.keys(t.H))if(t.H[e].r=t.H[e].r||[],t.H[e].L=t.H[e].L||[],t.H[e].r=[...t.H[e].L],t.CP)for(let n=0;n<t.CP.length;n++)t.CP[n]=null}}function OT(t){return new Promise((e,n)=>{function s(){id(),gapi.load("gapi.iframes",{callback:()=>{e(gapi.iframes.getContext())},ontimeout:()=>{id(),n($e(t,"network-request-failed"))},timeout:LT.get()})}if(qe().gapi?.iframes?.Iframe)e(gapi.iframes.getContext());else if(qe().gapi?.load)s();else{const r=BI("iframefcb");return qe()[r]=()=>{gapi.load?s():n($e(t,"network-request-failed"))},UI(`${$I()}?onload=${r}`).catch(i=>n(i))}}).catch(e=>{throw Pr=null,e})}let Pr=null;function DT(t){return Pr=Pr||OT(t),Pr}/**
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
 */const xT=new or(5e3,15e3),MT="__/auth/iframe",FT="emulator/auth/iframe",UT={style:{position:"absolute",top:"-100px",width:"1px",height:"1px"},"aria-hidden":"true",tabindex:"-1"},$T=new Map([["identitytoolkit.googleapis.com","p"],["staging-identitytoolkit.sandbox.googleapis.com","s"],["test-identitytoolkit.sandbox.googleapis.com","t"]]);function BT(t){const e=t.config;b(e.authDomain,t,"auth-domain-config-required");const n=e.emulator?Rc(e,FT):`https://${t.config.authDomain}/${MT}`,s={apiKey:e.apiKey,appName:t.name,v:Jn},r=$T.get(t.config.apiHost);r&&(s.eid=r);const i=t._getFrameworks();return i.length&&(s.fw=i.join(",")),`${n}?${Kn(s).slice(1)}`}async function HT(t){const e=await DT(t),n=qe().gapi;return b(n,t,"internal-error"),e.open({where:document.body,url:BT(t),messageHandlersFilter:n.iframes.CROSS_ORIGIN_IFRAMES_FILTER,attributes:UT,dontclear:!0},s=>new Promise(async(r,i)=>{await s.restyle({setHideOnLeave:!1});const o=$e(t,"network-request-failed"),a=qe().setTimeout(()=>{i(o)},xT.get());function c(){qe().clearTimeout(a),r(s)}s.ping(c).then(c,()=>{i(o)})}))}/**
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
 */const WT={location:"yes",resizable:"yes",statusbar:"yes",toolbar:"no"},VT=500,jT=600,GT="_blank",zT="http://localhost";class od{constructor(e){this.window=e,this.associatedEvent=null}close(){if(this.window)try{this.window.close()}catch{}}}function qT(t,e,n,s=VT,r=jT){const i=Math.max((window.screen.availHeight-r)/2,0).toString(),o=Math.max((window.screen.availWidth-s)/2,0).toString();let a="";const c={...WT,width:s.toString(),height:r.toString(),top:i,left:o},l=ge().toLowerCase();n&&(a=dp(l)?GT:n),lp(l)&&(e=e||zT,c.scrollbars="yes");const u=Object.entries(c).reduce((h,[f,p])=>`${h}${f}=${p},`,"");if(NI(l)&&a!=="_self")return YT(e||"",a),new od(null);const d=window.open(e||"",a,u);b(d,t,"popup-blocked");try{d.focus()}catch{}return new od(d)}function YT(t,e){const n=document.createElement("a");n.href=t,n.target=e;const s=document.createEvent("MouseEvent");s.initMouseEvent("click",!0,!0,window,1,0,0,0,0,!1,!1,!1,!1,1,null),n.dispatchEvent(s)}/**
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
 */const KT="__/auth/handler",JT="emulator/auth/handler",QT=encodeURIComponent("fac");async function ad(t,e,n,s,r,i){b(t.config.authDomain,t,"auth-domain-config-required"),b(t.config.apiKey,t,"invalid-api-key");const o={apiKey:t.config.apiKey,appName:t.name,authType:n,redirectUrl:s,v:Jn,eventId:r};if(e instanceof Lc){e.setDefaultLanguage(t.languageCode),o.providerId=e.providerId||"",$o(e.getCustomParameters())||(o.customParameters=JSON.stringify(e.getCustomParameters()));for(const[u,d]of Object.entries({}))o[u]=d}if(e instanceof ar){const u=e.getScopes().filter(d=>d!=="");u.length>0&&(o.scopes=u.join(","))}t.tenantId&&(o.tid=t.tenantId);const a=o;for(const u of Object.keys(a))a[u]===void 0&&delete a[u];const c=await t._getAppCheckToken(),l=c?`#${QT}=${encodeURIComponent(c)}`:"";return`${XT(t)}?${Kn(a).slice(1)}${l}`}function XT({config:t}){return t.emulator?Rc(t,JT):`https://${t.authDomain}/${KT}`}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const yo="webStorageSupport";class ZT{constructor(){this.eventManagers={},this.iframes={},this.originValidationPromises={},this._redirectPersistence=Rp,this._completeRedirectFn=xp,this._overrideRedirectResult=vT}async _openPopup(e,n,s,r){dt(this.eventManagers[e._key()]?.manager,"_initialize() not called before _openPopup()");const i=await ad(e,n,s,ra(),r);return qT(e,i,Oc())}async _openRedirect(e,n,s,r){await this._originValidation(e);const i=await ad(e,n,s,ra(),r);return sT(i),new Promise(()=>{})}_initialize(e){const n=e._key();if(this.eventManagers[n]){const{manager:r,promise:i}=this.eventManagers[n];return r?Promise.resolve(r):(dt(i,"If manager is not set, promise should be"),i)}const s=this.initAndGetManager(e);return this.eventManagers[n]={promise:s},s.catch(()=>{delete this.eventManagers[n]}),s}async initAndGetManager(e){const n=await HT(e),s=new IT(e);return n.register("authEvent",r=>(b(r?.authEvent,e,"invalid-auth-event"),{status:s.onEvent(r.authEvent)?"ACK":"ERROR"}),gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER),this.eventManagers[e._key()]={manager:s},this.iframes[e._key()]=n,s}_isIframeWebStorageSupported(e,n){this.iframes[e._key()].send(yo,{type:yo},r=>{const i=r?.[0]?.[yo];i!==void 0&&n(!!i),Ye(e,"internal-error")},gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER)}_originValidation(e){const n=e._key();return this.originValidationPromises[n]||(this.originValidationPromises[n]=NT(e)),this.originValidationPromises[n]}get _shouldInitProactively(){return mp()||up()||Nc()}}const eR=ZT;var cd="@firebase/auth",ld="1.11.0";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class tR{constructor(e){this.auth=e,this.internalListeners=new Map}getUid(){return this.assertAuthConfigured(),this.auth.currentUser?.uid||null}async getToken(e){return this.assertAuthConfigured(),await this.auth._initializationPromise,this.auth.currentUser?{accessToken:await this.auth.currentUser.getIdToken(e)}:null}addAuthTokenListener(e){if(this.assertAuthConfigured(),this.internalListeners.has(e))return;const n=this.auth.onIdTokenChanged(s=>{e(s?.stsTokenManager.accessToken||null)});this.internalListeners.set(e,n),this.updateProactiveRefresh()}removeAuthTokenListener(e){this.assertAuthConfigured();const n=this.internalListeners.get(e);n&&(this.internalListeners.delete(e),n(),this.updateProactiveRefresh())}assertAuthConfigured(){b(this.auth._initializationPromise,"dependent-sdk-initialized-before-auth")}updateProactiveRefresh(){this.internalListeners.size>0?this.auth._startProactiveRefresh():this.auth._stopProactiveRefresh()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function nR(t){switch(t){case"Node":return"node";case"ReactNative":return"rn";case"Worker":return"webworker";case"Cordova":return"cordova";case"WebExtension":return"web-extension";default:return}}function sR(t){Ln(new sn("auth",(e,{options:n})=>{const s=e.getProvider("app").getImmediate(),r=e.getProvider("heartbeat"),i=e.getProvider("app-check-internal"),{apiKey:o,authDomain:a}=s.options;b(o&&!o.includes(":"),"invalid-api-key",{appName:s.name});const c={apiKey:o,authDomain:a,clientPlatform:t,apiHost:"identitytoolkit.googleapis.com",tokenApiHost:"securetoken.googleapis.com",apiScheme:"https",sdkClientVersion:_p(t)},l=new MI(s,r,i,c);return WI(l,n),l},"PUBLIC").setInstantiationMode("EXPLICIT").setInstanceCreatedCallback((e,n,s)=>{e.getProvider("auth-internal").initialize()})),Ln(new sn("auth-internal",e=>{const n=ts(e.getProvider("auth").getImmediate());return(s=>new tR(s))(n)},"PRIVATE").setInstantiationMode("EXPLICIT")),Rt(cd,ld,nR(t)),Rt(cd,ld,"esm2020")}/**
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
 */const rR=300,iR=Th("authIdTokenMaxAge")||rR;let ud=null;const oR=t=>async e=>{const n=e&&await e.getIdTokenResult(),s=n&&(new Date().getTime()-Date.parse(n.issuedAtTime))/1e3;if(s&&s>iR)return;const r=n?.token;ud!==r&&(ud=r,await fetch(t,{method:r?"POST":"DELETE",headers:r?{Authorization:`Bearer ${r}`}:{}}))};function aR(t=Dh()){const e=Ba(t,"auth");if(e.isInitialized())return e.getImmediate();const n=HI(t,{popupRedirectResolver:eR,persistence:[Lp,Ip,Rp]}),s=Th("authTokenSyncURL");if(s&&typeof isSecureContext=="boolean"&&isSecureContext){const i=new URL(s,location.origin);if(location.origin===i.origin){const o=oR(i.toString());QI(n,o,()=>o(n.currentUser)),JI(n,a=>o(a))}}const r=Ch("auth");return r&&VI(n,`http://${r}`),n}function cR(){return document.getElementsByTagName("head")?.[0]??document}FI({loadJS(t){return new Promise((e,n)=>{const s=document.createElement("script");s.setAttribute("src",t),s.onload=e,s.onerror=r=>{const i=$e("internal-error");i.customData=r,n(i)},s.type="text/javascript",s.charset="UTF-8",cR().appendChild(s)})},gapiScript:"https://apis.google.com/js/api.js",recaptchaV2Script:"https://www.google.com/recaptcha/api.js",recaptchaEnterpriseScript:"https://www.google.com/recaptcha/enterprise.js?render="});sR("Browser");const rA=()=>!1,lR=t=>{try{t&&localStorage.setItem("debug:console","1")}catch{}},W=(...t)=>{},uR=(...t)=>{localStorage.getItem("debug:console")};function dR(){if(typeof window>"u"||typeof navigator>"u")return!1;const t=navigator.userAgent||navigator.vendor||"",e=/iPad|iPhone|iPod/.test(t),n=/Macintosh/.test(t)&&typeof navigator.maxTouchPoints=="number"&&navigator.maxTouchPoints>1,s=(e||n)&&!window.MSStream,r=/Android/i.test(t),i=s||r;return console.table({"User Agent":t,isAndroid:r,isiOSUA:e,isiPadOSDesktopUA:n,isMobileDevice:i}),i}const hR="765724787439-21p8n3e2tsfq2qk4oriq7ipp7m4o50ad.apps.googleusercontent.com",Cs=new Set;function Fp(t){return W("[ONE TAP] Callback registered, total callbacks:",Cs.size+1),Cs.add(t),()=>Cs.delete(t)}function Gt(t){W("[ONE TAP] Notifying status:",t,"to",Cs.size,"callbacks"),Cs.forEach(e=>{try{e(t)}catch{}})}function xc(){if(typeof google>"u"||!google.accounts?.id){setTimeout(()=>xc(),100);return}google.accounts.id.initialize({client_id:hR,callback:fR,auto_select:!1,cancel_on_tap_outside:!0,context:"signin",use_fedcm_for_prompt:!0,itp_support:!0})}function Mc(){if(ci()){Gt("not_needed");return}window.google?.accounts?.id&&(Gt("prompting"),window.google.accounts.id.prompt(t=>{t.isNotDisplayed()?Gt("not_displayed"):t.isSkippedMoment()?Gt("skipped"):t.isDismissedMoment()?Gt("dismissed"):Gt("displayed")}))}async function fR(t){try{W("[ONE TAP] Received credential, signing in with Firebase..."),Gt("signing_in");const e=_e.credential(t.credential),n=await KI(Re,e);W("[ONE TAP] ✅ Successfully signed in:",n.user.email),Bp(!1)}catch(e){const n=e?.code||"unknown",s=e?.message||String(e);alert(n==="auth/account-exists-with-different-credential"?"An account already exists with the same email but different sign-in credentials.":`One Tap sign-in failed: ${s}`)}}function Up(){typeof google<"u"&&google.accounts?.id&&google.accounts.id.cancel()}const pR=Object.freeze(Object.defineProperty({__proto__:null,cancelOneTap:Up,initOneTap:xc,onOneTapStatusChange:Fp,showOneTapSignin:Mc},Symbol.toStringTag,{value:"Module"})),Re=aR(Zf),$p=(async()=>{try{await _o(Re,Lp)}catch{try{await _o(Re,Ip)}catch{await _o(Re,oa)}}try{const t=await Wp();t.success?console.log("[AUTH] ✅ Redirect sign-in completed, user:",t.user?.email||t.user?.uid):t.error?console.error("[AUTH] ❌ Redirect sign-in failed:",t.error):console.debug("[AUTH] No pending redirect result found.")}catch(t){console.error("[AUTH] Error during handleRedirectResult execution:",t)}setTimeout(()=>{xc(),Mc()},500)})();let gs=!1;function Bp(t){gs=t}function gR(){try{const t=document.createElement("a");t.href=window.location.href,t.target="_blank",t.rel="noopener noreferrer external",document.body.appendChild(t),t.click(),document.body.removeChild(t)}catch{}}let us=null;const mR=()=>Math.random().toString(36).substring(2,15),ca="guestUser",_R=2880*60*1e3;function yR(){try{const t=typeof localStorage<"u"?localStorage.getItem(ca):null;if(!t)return null;const e=JSON.parse(t);if(!e||typeof e!="object"||!e.id)return null;if(e.expiresAt&&Date.now()>e.expiresAt){try{localStorage.removeItem(ca)}catch{}return null}return e}catch{return null}}function ER(t,e=_R){const n=Date.now(),s={id:t,createdAt:n,expiresAt:n+e};try{typeof localStorage<"u"&&localStorage.setItem(ca,JSON.stringify(s))}catch{}return s}function le(){const t=Xe();if(t)return t;if(!us){const e=yR();e&&e.id?us=e.id:(us=mR(),ER(us))}return us}function ci(){return Re.currentUser!==null}function Xe(){return Re.currentUser?.uid??null}function vR(){return new Promise(t=>{const e=bp(Re,n=>{e(),t(n)})})}function Fc(t,{truncate:e=7}={}){return bp(Re,n=>{const s=!!n,r=n?.displayName||"Guest User",i=typeof r=="string"&&r.length>e?r.slice(0,e)+"...":r;try{t({user:n,isLoggedIn:s,userName:i})}catch{}})}async function Hp(){const t=new _e;t.setCustomParameters({prompt:"select_account"});const e=dR(),n=(()=>{try{return typeof window<"u"&&window.matchMedia&&window.matchMedia("(display-mode: standalone)").matches||typeof navigator<"u"&&navigator.standalone===!0}catch{return!1}})(),s=n&&/iphone|ipad|ipod/i.test(navigator.userAgent||""),r=!0;try{if(s&&gs){gs=!1,gR();return}const i=await mT(Re,t),a=_e.credentialFromResult(i).accessToken,c=i.user;console.log("Signed in user:",c),W("Google Access Token exists:",!!a),gs=!1}catch(i){const o=i?.code||"unknown",a=i?.message||String(i);if(o==="auth/popup-closed-by-user"||o==="auth/cancelled-popup-request"){console.log("Sign-in cancelled by user");return}if((o==="auth/network-request-failed"||o==="auth/popup-blocked")&&s){console.warn(`[AUTH] ${o} inside iOS standalone PWA. Arming Safari fallback.`),gs=!0,alert(`Sign-in is blocked in the installed app on iOS.

Tap the Login button again to open in Safari and complete sign-in.`);return}if(o==="auth/popup-blocked"&&e){alert("Pop-up blocked. Please enable pop-ups for this site in your browser settings, or try signing in from a desktop browser.");return}const c=i?.customData?.email,l=_e.credentialFromError(i);if(console.error("Error during Google sign-in:",{errorCode:o,errorMessage:a,email:c,credential:l,origin:typeof window<"u"?window.location.origin:"n/a"}),o==="auth/unauthorized-domain"){const u=typeof window<"u"?window.location.origin:"",d=["This app's host is not whitelisted in Firebase Authentication.","Fix: In Firebase Console, go to Build → Authentication → Settings → Authorized domains and add this origin:",u?`• ${u}`:"• <your dev origin>","","Common dev hosts to add:","• http://localhost (covers any port)","• http://127.0.0.1","• http://[::1] (IPv6 localhost)","• Your LAN IP, e.g. http://192.168.x.y","","Tip: avoid opening index.html directly from the filesystem (file://). Use a dev server instead."];u&&typeof navigator<"u"&&navigator.clipboard?.writeText&&navigator.clipboard.writeText(u).catch(()=>{}),alert(`Sign-in failed: Unauthorized domain.

${d.join(`
`)}`);return}alert(`Sign-in failed: ${a}`)}}async function Wp(){try{const t=await ST(Re);if(t){const n=_e.credentialFromResult(t)?.accessToken,s=t.user;return console.log("[AUTH] Redirect result found - signed in user:",s?.email||s?.uid),W("Google Access Token exists:",!!n),{success:!0,user:s}}return console.log("[AUTH] No redirect result (normal page load)"),{success:!1,user:null}}catch(t){const e=t?.code||"unknown",n=t?.message||String(t),s=t?.customData?.email,r=_e.credentialFromError(t);if(console.error("Error handling redirect result:",{errorCode:e,errorMessage:n,email:s,credential:r,origin:typeof window<"u"?window.location.origin:"n/a"}),e==="auth/unauthorized-domain"){const i=typeof window<"u"?window.location.origin:"",o=["This app's host is not whitelisted in Firebase Authentication.","Fix: In Firebase Console, go to Build → Authentication → Settings → Authorized domains and add this origin:",i?`• ${i}`:"• <your dev origin>","","Common dev hosts to add:","• http://localhost (covers any port)","• http://127.0.0.1","• http://[::1] (IPv6 localhost)","• Your LAN IP, e.g. http://192.168.x.y","","Tip: avoid opening index.html directly from the filesystem (file://). Use a dev server instead."];i&&typeof navigator<"u"&&navigator.clipboard?.writeText&&navigator.clipboard.writeText(i).catch(()=>{}),alert(`Sign-in failed: Unauthorized domain.

${o.join(`
`)}`)}else alert(`Sign-in failed: ${n}`);return{success:!1,user:null,error:t}}}async function Vp(){try{await XI(Re),console.info("User signed out"),setTimeout(()=>Mc(),1500)}catch(t){throw console.error("Error signing out:",t),t}}const wR=Object.freeze(Object.defineProperty({__proto__:null,auth:Re,authReady:$p,getCurrentUserAsync:vR,getLoggedInUserId:Xe,getUserId:le,handleRedirectResult:Wp,isLoggedIn:ci,onAuthChange:Fc,setSafariExternalOpenArmed:Bp,signInWithGoogle:Hp,signOutUser:Vp},Symbol.toStringTag,{value:"Module"})),bR=t=>String(t).replace(/[&<>"'`=\/]/g,n=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;","`":"&#x60;","=":"&#x3D;","/":"&#x2F;"})[n]),SR=(t,e)=>t.replace(/\$\{([^}]+)\}/g,(n,s)=>{const r=s.trim(),i=r.split(".").reduce((a,c)=>a?.[c],e);return i==null?"":r.endsWith("Html")?String(i):bR(String(i))}),CR=(t,e={})=>{const n=document.createElement("template");return n.innerHTML=SR(t,e),n.content.cloneNode(!0)},IR=(t,e)=>{const n=[];let s=e;for(;s&&s!==t;){const r=s.parentElement;if(!r)break;const i=Array.prototype.indexOf.call(r.children,s);n.push(i),s=r}return n.reverse()},TR=(t,e)=>e.reduce((n,s)=>n&&n.children?n.children[s]:null,t),RR=t=>Array.from(t.querySelectorAll("input, textarea, select")).map(e=>({name:e.name,id:e.id,path:IR(t,e),value:e.value,checked:e.checked,selectionStart:e.selectionStart,selectionEnd:e.selectionEnd,wasFocused:document.activeElement===e})),kR=t=>t.replace(/["'\\]/g,"\\$&"),AR=(t,e)=>{e.forEach(n=>{let s=null;if(n.name){const r=kR(n.name);s=t.querySelector(`input[name="${r}"], textarea[name="${r}"], select[name="${r}"]`)}else n.id?s=t.querySelector(`#${n.id}`):n.path&&(s=TR(t,n.path));if(s){if(s.value=n.value,n.checked!==void 0&&(s.checked=n.checked),n.selectionStart!=null&&s.setSelectionRange)try{s.setSelectionRange(n.selectionStart,n.selectionEnd)}catch{}if(n.wasFocused)try{s.focus()}catch{}}})},NR=t=>Array.from(t.querySelectorAll("video, audio")).map(e=>({src:e.currentSrc||e.src,currentTime:e.currentTime,paused:e.paused,volume:e.volume,playbackRate:e.playbackRate,muted:e.muted})),PR=(t,e)=>{const n=t.querySelectorAll("video, audio");for(const s of n)if(s.currentSrc===e||s.src===e)return s;return null},LR=(t,e)=>{e.forEach(n=>{if(!n.src)return;const s=PR(t,n.src);s&&(s.currentTime=n.currentTime,s.volume=n.volume,s.playbackRate=n.playbackRate,s.muted=n.muted,n.paused||s.play().catch(()=>{}))})},OR=()=>document.readyState!=="loading",DR=({initialProps:t={},template:e="",handlers:n={},parent:s=null,containerTag:r="div",className:i="",onMount:o=null,onCleanup:a=null,autoAppend:c=!0,preserveInputState:l=!0}={})=>{if(!OR())return console.error("createComponent: DOM must be ready before creating components."),null;const u=document.createElement(r);i&&(u.className=i);let d={...t};const h=new Set,f=/\$\{([^}]+)\}/g;let p;for(;(p=f.exec(e))!==null;){const S=p[1].trim().split(".")[0];h.add(S)}const y=[],m=[],A={},N=()=>{let S=[],ne=[];l&&(S=RR(u),ne=NR(u)),u.textContent="";const Ce=CR(e,d);u.appendChild(Ce),Object.keys(n).forEach(Ve=>{const Ee=u.querySelectorAll(`[onclick="${Ve}"]`),fn=n[Ve];Ee.forEach(Y=>{Y.removeAttribute("onclick"),typeof fn=="function"&&Y.addEventListener("click",fn)})}),l&&(AR(u,S),LR(u,ne)),y.forEach(Ve=>Ve({...d}))},ae=S=>{if(!Array.isArray(S)||S.length===0)return;const ne={props:{...d},changedKeys:S};m.forEach(Ce=>Ce(ne))};for(const S of Object.keys(t))A[S]=[],Object.defineProperty(u,S,{get(){return d[S]},set(ne){d[S]!==ne&&(d[S]=ne,h.has(S)&&N(),A[S].forEach(Ce=>Ce(ne)),ae([S]))},configurable:!0,enumerable:!0});if(u.update=S=>{let ne=!1,Ce=!1;const Ve=[];for(const Ee in S)S[Ee]!==d[Ee]&&(d[Ee]=S[Ee],h.has(Ee)&&(Ce=!0),A[Ee]&&A[Ee].forEach(fn=>fn(S[Ee])),ne=!0,Ve.push(Ee));ne&&Ce&&N(),Ve.length>0&&ae(Ve)},u.onRender=S=>{typeof S=="function"&&y.push(S)},u.onAnyPropUpdated=S=>{typeof S=="function"&&m.push(S)},u.onPropUpdated=(S,ne)=>{typeof ne=="function"&&A[S]&&A[S].push(ne)},u.dispose=()=>{a&&(Array.isArray(a)?a.forEach(S=>{typeof S=="function"&&S()}):typeof a=="function"&&a()),y.length=0,m.length=0;for(const S in A)A[S].length=0;u.remove()},N(),c&&s&&!s.contains(u)&&s.appendChild(u),typeof o=="function")try{o(u)}catch(S){uR("[createComponent]: Error in onMount handler of component",S)}return u};let ds=null;const xR=(t,e=null)=>{if(ds)return ds;if(!t)return console.error("Auth UI: Parent element is required"),null;let n=null,s=null,r=10;typeof e=="number"&&(r=e);const i=ci();return ds=DR({initialProps:{isLoggedIn:i,userName:"Guest User",loginDisabledAttr:"disabled",logoutDisabledAttr:"disabled",signingInDisplay:"none",loginBtnMarginRightPx:r},template:`
      <button style="margin-right: \${loginBtnMarginRightPx}px" id="goog-login-btn" class="login-btn" onclick="handleLogin" \${loginDisabledAttr}>Login</button>
      <button id="goog-logout-btn" class="logout-btn" onclick="handleLogout" \${logoutDisabledAttr}>Logout</button>
      <span class="signing-in-indicator" style="display: \${signingInDisplay}; color: var(--text-secondary, #888); font-size: 0.9rem;">Signing in...</span>
      <div class="user-info">\${isLoggedIn ? 'Logged in: ' + userName : 'Logged out'}</div>
    `,handlers:{handleLogin:()=>{Up(),document.cookie="g_state=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;",Hp()},handleLogout:Vp},onMount:o=>{n=Fc(({isLoggedIn:a,userName:c})=>{console.debug("[AuthComponent] Auth state changed:",{isLoggedIn:a,userName:c}),o.update({isLoggedIn:a,userName:c,logoutDisabledAttr:a?"":"disabled",signingInDisplay:"none"})}),s=Fp(a=>{W("[AuthComponent] One Tap status:",a),a==="signing_in"?o.update({signingInDisplay:"inline-block",loginDisabledAttr:"disabled"}):["not_displayed","skipped","dismissed","not_needed"].includes(a)?ci()||o.update({loginDisabledAttr:"",signingInDisplay:"none"}):a==="displayed"&&o.update({loginDisabledAttr:"disabled",signingInDisplay:"none"})})},onCleanup:()=>{n&&(n(),n=null),s&&(s(),s=null),ds=null},className:"auth-component",parent:t}),ds},Uc=t=>t?!0:(console.warn("Element not found. el.id: =>",t?.id??"(no id)","el: =>",t),console.trace(),!1),$c=t=>{if(Uc(t))return t.classList.contains("hidden")},R=t=>{Uc(t)&&t.classList.contains("hidden")&&t.classList.remove("hidden")},E=t=>{Uc(t)&&!t.classList.contains("hidden")&&t.classList.add("hidden")},jp=t=>t.classList.contains("small-frame"),bn=t=>{if(t&&!jp(t)){t.classList.add("small-frame");const e=document.createElement("div");e.classList.add("small-frame-toggle-div");const n=document.createElement("span");n.classList.add("small-frame-toggle-icon"),n.textContent="❮",e.appendChild(n),t.appendChild(e),e.addEventListener("click",()=>{t.classList.contains("closed")?(t.classList.remove("closed"),e.classList.remove("closed"),n.classList.remove("closed")):(t.classList.add("closed"),e.classList.add("closed"),n.classList.add("closed"))})}},vt=t=>{if(jp(t)){t.classList.remove("small-frame");const e=document.querySelector(".small-frame-close");e&&e.remove()}};function la(t){return document.pictureInPictureElement===t}function Hi(t="room"){const e=new URL(window.location);e.searchParams.delete(t),window.history.replaceState({},"",e)}const V=t=>{const e=document.getElementById(t);return e||(console.warn(`Element with id: ${t} not found.`),null)};let Ke=null,Ut=null,Wi=null,Bc=null,ve=null,ee=null,K=null,$=null,H=null,Se=null,ke=null,Pe=null,He=null,ns=null,Gp=null,We=null,Vi=null,ss=null,rs=null,Hc=null,Wc=null,Vc=null,jc=null;function dd(){Ke=V("lobby"),Ut=V("lobby-call-btn"),Wi=V("title-auth-bar"),Bc=V("videos"),ve=V("local-video-el"),ee=V("local-video-box"),K=V("remote-video-el"),$=V("remote-video-box"),H=V("shared-video-el"),Se=V("shared-video-box"),ke=V("chat-controls"),Pe=V("call-btn"),He=V("hang-up-btn"),ns=V("switch-camera-btn"),We=V("mute-btn"),Vi=V("fullscreen-partner-btn"),ss=V("mic-btn"),rs=V("camera-btn"),Hc=V("app-pip-btn"),Wc=V("app-title-h1"),Vc=V("app-title-a"),jc=V("app-title-span")}document.readyState==="loading"?document.addEventListener("DOMContentLoaded",dd):dd();const zp=()=>({lobbyDiv:Ke,lobbyCallBtn:Ut,titleAuthBar:Wi,videosWrapper:Bc,localVideoEl:ve,localBoxEl:ee,remoteVideoEl:K,remoteBoxEl:$,sharedVideoEl:H,sharedBoxEl:Se,chatControls:ke,callBtn:Pe,hangUpBtn:He,switchCameraBtn:ns,installBtn:Gp,mutePartnerBtn:We,fullscreenPartnerBtn:Vi,micBtn:ss,cameraBtn:rs,appPipBtn:Hc,appTitleH1:Wc,appTitleA:Vc,appTitleSpan:jc});function qp(t,e=3,n=100){return new Promise(s=>{let r=0;const i=()=>{const o=document.getElementById(t);if(o){s(o);return}if(r++,r>=e){console.warn(`Element ${t} not found after ${e} attempts`),s(null);return}setTimeout(i,n)};i()})}async function Yp(t,e=3,n=100){const s={},r=t.map(async i=>{const o=await qp(i,e,n);return s[i]=o,o});return await Promise.all(r),s}async function MR(){const t=await Yp(["searchBtn","searchQuery","searchResults"],5,200),e=document.querySelector(".search-section");t.searchContainer=e;const n=Object.entries(t).filter(([s,r])=>!r).map(([s])=>s);return n.length>0&&console.warn("Some YouTube elements not found:",n),t}const FR=Object.freeze(Object.defineProperty({__proto__:null,get appPipBtn(){return Hc},get appTitleA(){return Vc},get appTitleH1(){return Wc},get appTitleSpan(){return jc},get callBtn(){return Pe},get cameraBtn(){return rs},get chatControls(){return ke},get fullscreenPartnerBtn(){return Vi},getElements:zp,get hangUpBtn(){return He},initializeYouTubeElements:MR,installBtn:Gp,get lobbyCallBtn(){return Ut},get lobbyDiv(){return Ke},get localBoxEl(){return ee},get localVideoEl(){return ve},get micBtn(){return ss},get mutePartnerBtn(){return We},get remoteBoxEl(){return $},get remoteVideoEl(){return K},robustElementAccess:qp,get sharedBoxEl(){return Se},get sharedVideoEl(){return H},get switchCameraBtn(){return ns},get titleAuthBar(){return Wi},get videosWrapper(){return Bc},waitForElements:Yp},Symbol.toStringTag,{value:"Module"})),hd="yt-video-box",ua="yt-player-root";let B=null,ht=!1;const Is=()=>B,UR=()=>ht,Kp=t=>ht=t,Sn=()=>{const t=document.getElementById(hd);if(!t)throw new Error(`Container #${hd} not found`);return t};function $R(){return new Promise(t=>{window.YT&&window.YT.Player?t():window.onYouTubeIframeAPIReady=()=>{t()}})}function Jp(){const t=Sn();if(!document.getElementById(ua)){const e=document.createElement("div");e.id=ua,t.appendChild(e)}R(t)}function da(){const t=Sn();E(t)}function Eo(){const t=Sn();return t&&!t.classList.contains("hidden")}function ha(t){return t?t.includes("youtube.com")||t.includes("youtu.be"):!1}function Qp(t){if(!t)return null;const e=[/(?:youtube\.com\/watch\?v=)([\w-]+)/,/(?:youtu\.be\/)([\w-]+)/,/(?:youtube\.com\/embed\/)([\w-]+)/,/(?:youtube\.com\/shorts\/)([\w-]+)/];for(const n of e){const s=t.match(n);if(s&&s[1])return s[1]}return null}async function BR({url:t,onReady:e,onStateChange:n}){const s=Qp(t);if(!s)throw new Error("Invalid YouTube URL");if(await $R(),B){try{B.destroy()}catch(o){console.warn("Error destroying previous YouTube player:",o)}B=null}const r=(o=!0)=>{const a=Sn(),c=B.getIframe();if(c&&a){try{a.tabIndex=-1,a.focus({preventScroll:!0})}catch{if(document.activeElement===c)try{c.blur()}catch{}}if(o){const l=u=>{if(u.code==="Space"){const d=Sn(),h=B.getIframe();if(document.activeElement===h||document.activeElement===d)return;u.preventDefault(),console.debug("Space pressed, refocusing iframe"),B.getPlayerState()!==window.YT.PlayerState.PLAYING?zc():ji()}};document.addEventListener("keydown",l,{once:!0})}}},i=()=>{const o=Sn(),a=B.getIframe();if(o&&a&&document.activeElement!==a)try{a.focus()}catch{}};return Jp(),new Promise((o,a)=>{try{B=new window.YT.Player(ua,{videoId:s,playerVars:{autoplay:1,mute:0,controls:1,fs:1,rel:0,modestbranding:1,disablekb:0,origin:window.location.origin},events:{onReady:c=>{ht=!0,e&&e(c),o(B)},onStateChange:c=>{c.data===window.YT.PlayerState.ENDED&&r(!1),c.data===window.YT.PlayerState.PAUSED&&r(),c.data===window.YT.PlayerState.PLAYING&&i(),n&&n(c)},onError:c=>{console.error("YouTube player error:",c.data),a(new Error(`YouTube error: ${c.data}`))}}})}catch(c){a(c)}})}function Gc(){if(B){try{da(),B.destroy()}catch(t){console.warn("Error destroying YouTube player:",t)}B=null,ht=!1}}function zc(){B&&ht&&B.playVideo()}function ji(){B&&ht&&B.pauseVideo()}function HR(t){B&&ht&&B.seekTo(t,!0)}function li(){return B&&ht?B.getCurrentTime():0}function qc(){return B&&ht?B.getPlayerState():-1}const wt={UNSTARTED:-1,ENDED:0,PLAYING:1,PAUSED:2,BUFFERING:3,CUED:5};let Be=null,lr=null,Xp=!1,Ae="none",Yc=null;const ur=()=>Xp,Zp=t=>Xp=t,hs=()=>Ae,WR=t=>{["yt","url","none"].includes(t)?Ae=t:console.warn("Invalid lastWatched platform:",t)};let bt=!1,Ts=null,Rs=0;async function Cn(t){if(!Be)return;console.debug("Updating watch sync state, roomId:",Be);const e=Ui(Be);try{await Tr(e,{...t,updatedBy:lr})}catch(n){console.error("Failed to update watch state:",n)}}function VR(t,e,n){if(!t)return;Be=t,lr=n;const s=Ui(t);Rr(s,jR,t),QR()}function jR(t){const e=t.val();e&&e.updatedBy!==lr&&(Date.now()-Rs<500||(e.url&&e.url!==Yc&&GR(e.url),e.isYouTube?zR(e):JR(e)))}function GR(t){Yc=t,ha(t)?(E(Se),eg(t),Ae="yt"):(Gc(),R(Se),H.src=t,Ae="url")}function zR(t){!Is()||!UR()||(qR(t),YR(t))}function qR(t){const e=qc(),n=e===wt.PLAYING;if([wt.BUFFERING,wt.UNSTARTED].includes(e)){KR();return}bt||(t.playing&&!n?(zc(),Ae="yt"):!t.playing&&n&&(ji(),Ae="yt"))}function YR(t){if(t.currentTime===void 0)return;const e=li();Math.abs(e-t.currentTime)>.3&&!bt&&(HR(t.currentTime),setTimeout(()=>{t.playing?zc():ji(),Ae="yt"},500))}function KR(){bt=!0,clearTimeout(Ts),Ts=setTimeout(async()=>{bt=!1;const t=qc()===wt.PLAYING;await Cn({playing:t,currentTime:li()})},700)}function JR(t){t.playing!==void 0&&(t.playing&&H.paused?H.play().catch(e=>console.warn("Play failed:",e)):!t.playing&&!H.paused&&H.pause()),t.currentTime!==void 0&&Math.abs(H.currentTime-t.currentTime)>1&&(H.currentTime=t.currentTime,t.playing?H.play().catch(n=>console.warn("Play failed:",n)):H.pause())}function QR(){H.addEventListener("play",async()=>{!Is()&&Be&&(Rs=Date.now(),await Cn({playing:!0,isYouTube:!1})),Ae="url"}),H.addEventListener("pause",async()=>{!Is()&&Be&&(Rs=Date.now(),await Cn({playing:!1,isYouTube:!1})),Ae="url"}),H.addEventListener("seeked",async()=>{!Is()&&Be&&(Rs=Date.now(),await Cn({currentTime:H.currentTime,playing:!H.paused,isYouTube:!1})),Ae="url"})}async function XR(t){if(!t)return!1;if(Rs=Date.now(),ha(t)){if(E(Se),!await eg(t))return!1;Ae="yt"}else Gc(),R(Se),H.src=t,Ae="url";if(Be){const e=Ui(Be);ut(e,{url:t,playing:!1,currentTime:0,isYouTube:ha(t),updatedBy:lr})}return!0}async function mn(t){if(!t||!t.url)return console.warn("Non-existing or invalid video."),!1;Yc=t.url;const e=await XR(t.url);return pa(),e}async function eg(t){if(!Qp(t))return console.error("Invalid YouTube URL:",t),!1;try{return await BR({url:t,onReady:n=>{if(Kp(!0),Be){const s=Ui(Be);ut(s,{url:t,playing:!1,currentTime:0,isYouTube:!0,updatedBy:lr})}},onStateChange:async n=>{if(!Is())return;const r=n.data===wt.PLAYING,i=n.data===wt.PAUSED;if(n.data===wt.BUFFERING){bt=!0,Ts&&clearTimeout(Ts),Ts=setTimeout(async()=>{bt=!1;const c=qc()===wt.PLAYING;await Cn({playing:c,currentTime:li()})},700);return}i&&bt||!bt&&(r||i)&&await Cn({playing:r,currentTime:li()})}}),!0}catch(n){return console.error("Failed to load YouTube video:",n),!1}}function ZR(t,{inactivityMs:e=3e3,listenTarget:n=document,onShow:s=null,onHide:r=null,hideOnEsc:i=!1,excludeEvents:o=["keydown"]}={}){if(!t)return()=>{};let a=null;const l=["pointermove","pointerdown","pointerup","touchstart","touchmove","mousemove","mousedown","keydown"].filter(m=>!Array.isArray(o)||!o.includes(m));function u(){R(t);try{typeof s=="function"&&s()}catch(m){console.warn("showHideOnInactivity onShow callback error:",m)}a&&clearTimeout(a),a=setTimeout(()=>{E(t);try{typeof r=="function"&&r()}catch(m){console.warn("showHideOnInactivity onHide callback error:",m)}a=null},e)}l.forEach(m=>n.addEventListener(m,u,{passive:!0}));function d(){if(document.hidden){a&&(clearTimeout(a),a=null);try{E(t)}catch(m){console.warn("showHideOnInactivity onHide (visibilitychange) callback error:",m)}}else u()}document.addEventListener("visibilitychange",d);function h(m){if(!m.relatedTarget){a&&(clearTimeout(a),a=null),E(t);try{typeof r=="function"&&r()}catch(A){console.warn("showHideOnInactivity onHide (visibilitychange) callback error:",A)}}}n.addEventListener("mouseout",h);function f(m){if(i&&(m.key==="Escape"||m.key==="Esc")){a&&(clearTimeout(a),a=null),E(t);try{typeof r=="function"&&r()}catch(A){console.warn("showHideOnInactivity onHide (esc) callback error:",A)}}}document.addEventListener("keydown",f);function p(){a||u()}n.addEventListener("touchend",p,{passive:!0}),E(t);function y(){l.forEach(m=>n.removeEventListener(m,u)),document.removeEventListener("visibilitychange",d),n.removeEventListener("mouseout",h),n.removeEventListener("touchend",p),document.removeEventListener("keydown",f),a&&(clearTimeout(a),a=null)}return y}let St=null,Ct=null,tg="user";function fa(){return tg}function ng(t){tg=t}function Gi(t=!0){return!St||!(St instanceof MediaStream)?(t&&console.error("Invalid remote MediaStream accessed:",St),null):St}function sg(t){St=t}function rg(){St&&(St.getTracks().forEach(t=>t.stop()),St=null)}function zi(t=!0){return!Ct||!(Ct instanceof MediaStream)?(t&&(console.error("Invalid local MediaStream accessed:",Ct),console.error("Call createLocalStream() before accessing local stream.")),null):Ct}function ui(t){Ct=t}function ig(){Ct&&(Ct.getTracks().forEach(t=>t.stop()),Ct=null)}const ek=Object.freeze(Object.defineProperty({__proto__:null,cleanupLocalStream:ig,cleanupRemoteStream:rg,getFacingMode:fa,getLocalStream:zi,getRemoteStream:Gi,setFacingMode:ng,setLocalStream:ui,setRemoteStream:sg},Symbol.toStringTag,{value:"Module"}));let Vs=!1,Er=!1,fd=null,pd=null,ks=null;const tk=()=>Vs;let Kc=()=>{if(Vs)return;const t=Gi(!1);if(!K||!t||K.paused||K.readyState<2){Er||(Er=!0,K.addEventListener("playing",()=>{Er=!1,Kc()},{once:!0}));return}if(Er=!1,Vs=!0,R($),R(ee),bn(ee),E(Ke),E(Ut),Pe.disabled=!0,Pe.classList.add("disabled"),He.disabled=!1,He.classList.remove("disabled"),We.disabled=!1,We.classList.remove("disabled"),ks||(ks=ZR(ke,{inactivityMs:2500,hideOnEsc:!0})),!fd){const e=()=>{ur()?bn($):vt($),R($)};K.addEventListener("leavepictureinpicture",e),fd=()=>K.removeEventListener("leavepictureinpicture",e)}if(!pd){const e=()=>E($);K.addEventListener("enterpictureinpicture",e),pd=()=>K.removeEventListener("enterpictureinpicture",e)}},og=()=>{Vs&&(Vs=!1,vt(ee),E(ee),vt($),E($),Pe.disabled=!1,Pe.classList.remove("disabled"),R(Ut),He.disabled=!0,He.classList.add("disabled"),We.disabled=!0,We.classList.add("disabled"),ks&&(ks(),ks=null),R(Ke),R(ke))};const di=()=>{const t=Gi(!1);return t&&t.getVideoTracks().length>0&&t.getVideoTracks()[0].enabled&&t.getVideoTracks()[0].readyState==="live"};function nk(){return"pictureInPictureEnabled"in document&&typeof document.pictureInPictureEnabled=="boolean"&&document.pictureInPictureEnabled}function pa(){if(!ur()){if(Zp(!0),E(Ke),ke.classList.remove("bottom"),ke.classList.add("watch-mode"),tk()?(E(Pe),R(He)):(E(He),E(ss),E(We),R(Pe)),E(Ut),E(rs),E(ns),R(ke),!di()){E($),vt($),la(ve)||(R(ee),bn(ee));return}E(ee),vt(ee),la(K)?(E($),vt($)):nk()?K.requestPictureInPicture().then(()=>{E($),vt($)}).catch(t=>{console.warn("Failed to enter Picture-in-Picture:",t),bn($),R($)}):(bn($),R($))}}function Lr(){ur()&&(R(Pe),R(He),R(ss),R(We),R(rs),R(ns),ke.classList.remove("watch-mode"),ke.classList.add("bottom"),R(ke),di()&&(la(K)&&document.exitPictureInPicture().catch(t=>{console.error("Failed to exit Picture-in-Picture:",t)}),vt($),R($)),bn(ee),R(ee),di()||(R(Ke),R(Ut)),Zp(!1))}class In{constructor(){this.logs=[],this.isEnabled=!0,this.maxLogs=1e3,this.sessionId=this.generateSessionId()}log(e,n,s={}){if(!this.isEnabled)return;const r={timestamp:performance.now(),sessionId:this.sessionId,category:e,event:n,data:{...s},id:this.generateLogId()};this.logs.push(r),this.logs.length>this.maxLogs&&(this.logs=this.logs.slice(-this.maxLogs)),typeof window<"u"&&window.location?.hostname==="localhost"&&console.log(`[DIAG] ${e}:${n}`,s)}logListenerAttachment(e,n,s,r={}){this.log("LISTENER","ATTACHED",{roomId:e,listenerType:n,currentCount:s,...r})}logListenerCleanup(e,n,s={}){this.log("LISTENER","CLEANUP",{removedCount:e.length,preservedCount:n.length,removedRoomIds:e,preservedRoomIds:n,...s})}logDuplicateListener(e,n,s={}){this.log("LISTENER","DUPLICATE_PREVENTED",{roomId:e,listenerType:n,...s})}logIncomingCallEvent(e,n,s,r={}){this.log("INCOMING_CALL","DETECTED",{callerId:e,roomId:n,isFresh:s.isFresh,validationMethod:s.method,age:s.age,reason:s.reason,...r})}logNotificationDecision(e,n,s,r={}){this.log("INCOMING_CALL","NOTIFICATION_DECISION",{decision:e,reason:n,roomId:s,...r})}logCallingUILifecycle(e,n,s={}){this.log("CALLING_UI",e,{roomId:n,...s})}logFirebaseOperation(e,n,s=null,r={}){this.log("FIREBASE","OPERATION",{operation:e,success:n,error:s?{message:s.message,code:s.code,stack:s.stack}:null,...r})}logFirebaseConnectionState(e,n={}){this.log("FIREBASE","CONNECTION_STATE",{state:e,...n})}logRoomCreation(e,n,s,r={}){this.log("ROOM","CREATED",{roomId:e,isInitiator:n,creationTime:s.creationTime,listenerAttachTime:s.listenerAttachTime,timeDiff:s.listenerAttachTime-s.creationTime,...r})}logMemberJoinEvent(e,n,s,r={}){this.log("ROOM","MEMBER_JOINED",{roomId:e,memberId:n,joinedAt:s.joinedAt,role:s.role,...r})}logContactSave(e,n,s={}){this.log("CONTACT","SAVED",{contactId:e,roomId:n,...s})}logContactCall(e,n,s,r={}){this.log("CONTACT","CALL_INITIATED",{contactId:e,roomId:n,forceInitiator:s,...r})}logFreshnessValidation(e,n,s,r={}){this.log("FRESHNESS","VALIDATION",{roomId:e,method:n,result:{isFresh:s.isFresh,age:s.age,threshold:s.threshold,reason:s.reason},...r})}logRaceCondition(e,n,s,r={}){this.log("RACE_CONDITION",e,{roomId:n,events:s,...r})}getLogs(e={}){let n=[...this.logs];return e.category&&(n=n.filter(s=>s.category===e.category)),e.event&&(n=n.filter(s=>s.event===e.event)),e.roomId&&(n=n.filter(s=>s.data.roomId===e.roomId)),e.since&&(n=n.filter(s=>s.timestamp>=e.since)),e.until&&(n=n.filter(s=>s.timestamp<=e.until)),n}getCallFlowTrace(e){return this.getLogs({roomId:e}).sort((n,s)=>n.timestamp-s.timestamp)}getListenerDiagnostics(e=null){const n=this.getLogs({category:"LISTENER"});return e?n.filter(s=>s.data.roomId===e):n}getFailureAnalysis(){const e=this.logs.filter(n=>n.category==="FIREBASE"&&n.data.success===!1||n.category==="INCOMING_CALL"&&n.data.decision==="REJECT"||n.category==="LISTENER"&&n.event==="DUPLICATE_PREVENTED");return{totalFailures:e.length,firebaseFailures:e.filter(n=>n.category==="FIREBASE").length,rejectedCalls:e.filter(n=>n.category==="INCOMING_CALL"&&n.data.decision==="REJECT").length,duplicateListeners:e.filter(n=>n.event==="DUPLICATE_PREVENTED").length,failures:e}}exportDiagnostics(){return{sessionId:this.sessionId,exportTime:Date.now(),logCount:this.logs.length,logs:[...this.logs],summary:this.getFailureAnalysis()}}exportLogsAsJSON(){return JSON.stringify(this.exportDiagnostics(),null,2)}downloadLogs(e=null){e||(e=`diagnostic-logs-${this.sessionId}-${Date.now()}.json`);const n=this.exportLogsAsJSON(),s=new Blob([n],{type:"application/json"}),r=document.createElement("a");r.href=URL.createObjectURL(s),r.download=e,r.click(),URL.revokeObjectURL(r.href)}getLogsInTimeRange(e,n){return this.logs.filter(s=>s.timestamp>=e&&s.timestamp<=n)}getLogsSince(e){return this.logs.filter(n=>n.timestamp>=e)}clearOldLogs(e=1440*60*1e3){const n=Date.now()-e;this.logs=this.logs.filter(s=>s.timestamp>=n)}clearLogs(){this.logs=[]}persistLogs(){try{const e=`diagnostic-logs-${this.sessionId}`;return localStorage.setItem(e,this.exportLogsAsJSON()),e}catch(e){return console.warn("Failed to persist logs to localStorage:",e),null}}loadPersistedLogs(e){try{const n=localStorage.getItem(e);if(n){const s=JSON.parse(n);if(s.logs&&Array.isArray(s.logs)){const r=new Set(this.logs.map(o=>o.id)),i=s.logs.filter(o=>!r.has(o.id));return this.logs=[...this.logs,...i].sort((o,a)=>o.timestamp-a.timestamp),i.length}}return 0}catch(n){return console.warn("Failed to load persisted logs:",n),0}}static getPersistedLogKeys(){const e=[];for(let n=0;n<localStorage.length;n++){const s=localStorage.key(n);s&&s.startsWith("diagnostic-logs-")&&e.push(s)}return e}static cleanupPersistedLogs(e=1440*60*1e3){const n=Date.now()-e;In.getPersistedLogKeys().forEach(r=>{try{const i=localStorage.getItem(r);if(i){const o=JSON.parse(i);o.exportTime&&o.exportTime<n&&localStorage.removeItem(r)}}catch{localStorage.removeItem(r)}})}enable(){this.isEnabled=!0}disable(){this.isEnabled=!1}generateSessionId(){return`session_${performance.now()}_${Math.random().toString(36).substr(2,9)}`}generateLogId(){return`log_${performance.now()}_${Math.random().toString(36).substr(2,9)}`}formatTimestamp(e){return new Date(e).toISOString()}startTiming(e){const n=`timing_${e}_${Date.now()}`;return this.log("TIMING","START",{operation:e,timingId:n}),n}endTiming(e,n={}){const s=this.logs.find(r=>r.category==="TIMING"&&r.event==="START"&&r.data.timingId===e);if(s){const r=Date.now()-s.timestamp;return this.log("TIMING","END",{timingId:e,duration:r,operation:s.data.operation,...n}),r}return null}}let vo=null;function _(){return vo||(vo=new In),vo}typeof window<"u"&&(window.diagnosticLogger={getInstance:()=>_(),exportLogs:()=>{const e=_().exportLogsAsJSON();return console.log("Diagnostic logs exported:"),console.log(e),e},downloadLogs:t=>{_().downloadLogs(t),console.log("Diagnostic logs downloaded")},getRoomLogs:t=>{const n=_().getCallFlowTrace(t);return console.log(`Logs for room ${t}:`,n),n},getFailures:()=>{const e=_().getFailureAnalysis();return console.log("Failure analysis:",e),e},getListenerDiagnostics:t=>{const n=_().getListenerDiagnostics(t);return console.log("Listener diagnostics:",n),n},getLogsSince:t=>{const n=_().getLogsSince(t);return console.log(`Logs since ${new Date(t).toISOString()}:`,n),n},getLogsInRange:(t,e)=>{const s=_().getLogsInTimeRange(t,e);return console.log(`Logs from ${new Date(t).toISOString()} to ${new Date(e).toISOString()}:`,s),s},persistLogs:()=>{const e=_().persistLogs();return console.log(`Logs persisted with key: ${e}`),e},loadPersistedLogs:t=>{const n=_().loadPersistedLogs(t);return console.log(`Loaded ${n} persisted logs`),n},getPersistedKeys:()=>{const t=In.getPersistedLogKeys();return console.log("Persisted log keys:",t),t},clearLogs:()=>{_().clearLogs(),console.log("Diagnostic logs cleared")},enable:()=>{_().enable(),console.log("Diagnostic logging enabled")},disable:()=>{_().disable(),console.log("Diagnostic logging disabled")},getSessionInfo:()=>{const t=_(),e={sessionId:t.sessionId,logCount:t.logs.length,isEnabled:t.isEnabled,maxLogs:t.maxLogs};return console.log("Session info:",e),e},help:()=>{console.log(`
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
      `)}},window.addEventListener("beforeunload",()=>{try{const t=_();t.logs.length>0&&t.persistLogs(),In.cleanupPersistedLogs()}catch{}}),(window.location.hostname==="localhost"||window.location.hostname==="127.0.0.1")&&setTimeout(()=>{try{const t=_(),e=typeof localStorage<"u"&&localStorage.getItem("debug:console")==="1";if(!t.isEnabled||!e)return;const n=In.getPersistedLogKeys();n.length>0&&(console.log(`Found ${n.length} persisted diagnostic log sessions. Use diagnosticLogger.loadPersistedLogs(key) to load them.`),console.log("Available keys:",n))}catch{}},1e3));class sk{constructor(){this.currentRoomId=null}async createNewRoom(e,n,s=null){const r=Date.now();s||(s=Math.random().toString(36).substring(2,15)),_().log("ROOM","CREATE_START",{roomId:s,userId:n,hasOffer:!!e,timestamp:r});const i=Bt(s);try{return await ut(i,{offer:{type:e.type,sdp:e.sdp},createdAt:Date.now(),createdBy:n}),_().logFirebaseOperation("create_room",!0,null,{roomId:s,userId:n,duration:Date.now()-r}),await this.joinRoom(s,n),_().log("ROOM","CREATE_COMPLETE",{roomId:s,userId:n,totalDuration:Date.now()-r}),s}catch(o){throw _().logFirebaseOperation("create_room",!1,o,{roomId:s,userId:n,duration:Date.now()-r}),o}}async checkRoomStatus(e){const n=Bt(e),s=await Qt(n);if(!s.exists())return{exists:!1,hasMembers:!1,memberCount:0};const r=s.val(),i=r.members||{},o=Object.keys(i).length;return{exists:!0,hasMembers:o>0,memberCount:o,roomData:r}}async getRoomData(e){const n=Bt(e),s=await Qt(n);if(!s.exists())throw new Error("Room does not exist");return s.val()}async saveAnswer(e,n){const s=Bt(e);await Tr(s,{answer:n})}async joinRoom(e,n,s="Guest User"){const r=Yu(e,n);await ut(r,{displayName:s,joinedAt:Date.now()}),_().logFirebaseOperation("set","joinRoom",`rooms/${e}/members/${n}`)}async leaveRoom(e,n=null,{deleteRoomIfEmpty:s=!0}={}){const r=n||this.currentRoomId;if(!r||!e)return;const i=Yu(r,e),o=_r(r),a=Bt(r);try{await Bn(i)}catch(c){_().logFirebaseOperation("leave_room_remove_member",!1,c,{roomId:r,userId:e})}if(s)try{const c=await Qt(o),l=c.exists()?c.val():{};(l?Object.keys(l).length:0)===0&&await Bn(a).catch(d=>{_().logFirebaseOperation("delete_empty_room",!1,d,{roomId:r})})}catch(c){_().logFirebaseOperation("check_members_after_leave",!1,c,{roomId:r})}(!n||n===this.currentRoomId)&&(this.currentRoomId=null)}async rejectCall(e,n,s="user_rejected"){if(!e||!n)return;const r=Bt(e),i={rejection:{by:n,reason:s,at:Date.now()}};try{await Tr(r,i),_().log("ROOM","REJECT_SET",{roomId:e,byUserId:n,reason:s})}catch(o){throw _().log("ROOM","REJECT_SET_FAILED",{roomId:e,byUserId:n,reason:s,error:String(o?.message||o)}),o}}async cancelCall(e,n,s="caller_cancelled"){if(!e||!n)return;const r=Bt(e),i={cancellation:{by:n,reason:s,at:Date.now()}};try{await Tr(r,i),_().log("ROOM","CANCEL_SET",{roomId:e,byUserId:n,reason:s})}catch(o){throw _().log("ROOM","CANCEL_SET_FAILED",{roomId:e,byUserId:n,reason:s,error:String(o?.message||o)}),o}}onCallCancelled(e,n){const s=lI(e);qt(s,"value",n,e),_().logFirebaseOperation("on","onCallCancelled",`rooms/${e}/cancellation`,{event:"value"})}onMemberJoined(e,n){const s=_r(e);qt(s,"child_added",n,e),_().logFirebaseOperation("on","onMemberJoined",`rooms/${e}/members`,{event:"child_added"})}onMemberLeft(e,n){const s=_r(e);qt(s,"child_removed",n,e),_().logFirebaseOperation("on","onMemberLeft",`rooms/${e}/members`,{event:"child_removed"})}onIncomingCall(e,n,s){const r=_r(e),i=a=>{s("join",a.key,a.val())},o=a=>{s("leave",a.key,a.val())};return qt(r,"child_added",i,e,n),qt(r,"child_removed",o,e,n),()=>cI(n,e)}get roomId(){return this.currentRoomId}}const j=new sk,hi=3e4;let et=null,ms=null;async function rk(t,e=null){const n=le(),s=Xe();if(!s)return;const r=Cc(s);await ut(r,{roomId:t,targetContactName:e,initiatedAt:Date.now(),callerUserId:n})}async function fi(){const t=Xe();if(!t)return;const e=Cc(t);await Bn(e).catch(()=>{})}async function ag(t,e){if(!t)return!1;try{const n=Cc(t),s=await Qt(n);if(!s.exists())return!1;const r=s.val();return r.roomId!==e?!1:Date.now()-r.initiatedAt<hi}catch(n){return console.warn("Failed to check outgoing call freshness",n),!1}}async function cg(t){if(!t)return!1;try{const e=re(ie,`rooms/${t}/createdAt`),n=await Qt(e);if(!n.exists())return!1;const s=n.val();return typeof s!="number"?!1:Date.now()-s<hi}catch(e){return console.warn("Failed to check room freshness",e),!1}}async function lg(t,e,n){const s=_(),r=Date.now();Nt(),await rk(t,e);const i=document.createElement("div");i.id="calling-modal",i.style.cssText=`
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
  `;const u=async()=>{s.logCallingUILifecycle("CANCEL",t,{contactName:e,reason:"user_cancelled",duration:Date.now()-r});try{await Promise.all([fi(),j.cancelCall(t,le(),"caller_cancelled"),j.leaveRoom(le(),t)])}catch(d){s.log("ROOM","CALLER_CANCELLED_CLEANUP_FAIL",{roomId:t,error:String(d)})}Nt()};l.onclick=u,o.appendChild(a),o.appendChild(c),o.appendChild(l),i.appendChild(o),document.body.appendChild(i),i.dataset.roomId=t,et=i,ms=setTimeout(async()=>{s.logCallingUILifecycle("TIMEOUT",t,{contactName:e,reason:"auto_timeout",duration:Date.now()-r,timeoutMs:hi});try{await Promise.all([fi(),j.cancelCall(t,le(),"auto_timeout"),j.leaveRoom(le(),t)])}catch(d){s.log("ROOM","CALLER_TIMEOUT_CLEANUP_FAIL",{roomId:t,error:String(d)})}Nt()},hi)}function Nt(){if(et){const t=et.dataset?.roomId||"unknown";_().logCallingUILifecycle("HIDE",t,{reason:"hide_called",hadTimeout:!!ms,timestamp:Date.now()})}ms&&(clearTimeout(ms),ms=null),et&&(et.remove(),et=null)}async function Jc(){if(et){const t=et.dataset?.roomId||"unknown";_().logCallingUILifecycle("ANSWERED",t,{reason:"call_answered",timestamp:Date.now()})}await fi(),Nt()}async function ik(t="user_rejected"){const e=_(),n=et?.dataset?.roomId||"unknown";e.logCallingUILifecycle("REJECTED",n,{reason:t,timestamp:Date.now()}),await fi(),Nt()}const ok=Object.freeze(Object.defineProperty({__proto__:null,hideCallingUI:Nt,isOutgoingCallFresh:ag,isRoomCallFresh:cg,onCallAnswered:Jc,onCallRejected:ik,showCallingUI:lg},Symbol.toStringTag,{value:"Module"}));let Tn=null;function Qc(t,e={}){return new Promise(n=>{const s=document.createElement("dialog");s.innerHTML=`
      <p>${t}</p>
      <div class="confirm-dialog-actions">
        <button data-action="cancel">Cancel</button>
        <button data-action="confirm" autofocus>Confirm</button>
      </div>
    `,s.classList.add("confirm-dialog");const r=s.querySelector('[data-action="confirm"]'),i=s.querySelector('[data-action="cancel"]');if(!r||!i){console.error("dialog element not found!"),n(!1);return}let o=null;function a(c){o&&clearTimeout(o),s.close(),s.remove(),Tn===a&&(Tn=null),n(c)}r.addEventListener("click",()=>{a(!0)}),i.addEventListener("click",()=>{a(!1)}),s.addEventListener("cancel",()=>a(!1)),document.body.appendChild(s),s.showModal(),Tn=a,e.autoRemoveSeconds&&typeof e.autoRemoveSeconds=="number"&&e.autoRemoveSeconds>0&&(o=setTimeout(()=>{a(!1)},e.autoRemoveSeconds*1e3))})}function ak(){if(typeof Tn=="function"){try{Tn(!1)}catch{}return Tn=null,!0}return!1}const ck=Object.freeze(Object.defineProperty({__proto__:null,default:Qc,dismissActiveConfirmDialog:ak},Symbol.toStringTag,{value:"Module"}));async function gd(t,e,n){const s=Xe();if(s){const r=re(ie,`users/${s}/contacts/${t}`);await ut(r,{contactId:t,contactName:e,roomId:n,savedAt:Date.now()});return}try{const r=localStorage.getItem("contacts")||"{}",i=JSON.parse(r);i[t]={contactId:t,contactName:e,roomId:n,savedAt:Date.now()},localStorage.setItem("contacts",JSON.stringify(i))}catch(r){console.warn("Failed to save contact to localStorage",r)}}async function pi(){const t=Xe();if(t)try{const e=re(ie,`users/${t}/contacts`),n=await Qt(e);return n.exists()?n.val():{}}catch(e){return console.warn("Failed to read contacts from RTDB",e),{}}try{const e=localStorage.getItem("contacts")||"{}";return JSON.parse(e)}catch(e){return console.warn("Failed to read contacts from localStorage",e),{}}}async function lk(t,e,n){if(!t||!e)return;const r=(await pi())?.[t];if(r){r.roomId!==e&&(await gd(t,r.contactName,e),await js(n)),console.log(`[CONTACT SAVE] Re-attaching listener for existing contact room: ${e}`),Wn(e);return}if(!await Qc("Save contact?",{autoRemoveSeconds:15}))return;const o=window.prompt("Enter a name for this contact:",t)||t;await gd(t,o,e),console.log(`[CONTACT SAVE] Attaching listener for saved contact room: ${e}`),Wn(e),await js(n)}async function js(t){if(!t)return;const e=await pi(),n=Object.keys(e);let s=t.querySelector(".contacts-container");if(s||(s=document.createElement("div"),s.className="contacts-container",t.appendChild(s)),n.length===0){s.innerHTML="<p>No saved contacts yet.</p>",E(s);return}R(s),s.innerHTML=`
    <h3>Saved Contacts</h3>
    <div class="contacts-list">
      ${n.map(r=>{const i=e[r];return`
            <div class="contact-entry">
              <button 
                class="contact-call-btn" 
                data-room-id="${i.roomId}"
                data-contact-name="${i.contactName}"
              >
                Call
              </button>
              <span class="contact-name">${i.contactName}</span>
              <button 
                class="contact-delete-btn" 
                data-contact-id="${r}"
              >
                ✕
              </button>
            </div>
          `}).join("")}
    </div>
  `,uk(s,t)}function uk(t,e){t.querySelectorAll(".contact-call-btn").forEach(n=>{n.onclick=async()=>{const s=n.getAttribute("data-room-id"),r=n.getAttribute("data-contact-name");s&&(console.log(`[CONTACT CALL] Ensuring listener is active for room: ${s}`),Wn(s),await lg(s,r),qi(s,{forceInitiator:!0}).catch(i=>{console.warn("Failed to call contact:",i),Nt()}))}}),t.querySelectorAll(".contact-delete-btn").forEach(n=>{n.onclick=async()=>{const s=n.getAttribute("data-contact-id");!s||!window.confirm("Delete this contact?")||(await dk(s),await js(e))}})}async function dk(t){const e=Xe();if(e){try{await Bn(re(ie,`users/${e}/contacts/${t}`))}catch(n){console.warn("Failed to delete contact from RTDB",n)}return}try{const n=localStorage.getItem("contacts")||"{}",s=JSON.parse(n);s[t]&&(delete s[t],localStorage.setItem("contacts",JSON.stringify(s)))}catch(n){console.warn("Failed to delete contact from localStorage",n)}}const Gs=new WeakMap;function Xc(t,e,n){if(!t||!n)throw new Error("setupIceCandidates: pc and roomId are required");if(Gs.has(t)||Gs.set(t,[]),e==="initiator")md(t,"offerCandidates",n),_d(t,"answerCandidates",n);else if(e==="joiner")md(t,"answerCandidates",n),_d(t,"offerCandidates",n);else throw new Error(`Invalid role: ${e} specified for ICE candidate setup.`)}function md(t,e,n){t.onicecandidate=s=>{if(s.candidate){const r=qu(e==="offerCandidates"?ep(n):tp(n));ut(r,s.candidate.toJSON())}}}function _d(t,e,n){const s=e==="offerCandidates"?ep(n):tp(n);let r=!1;const i=()=>{if(r)return;r=!0;const a=()=>{t.remoteDescription&&(Zc(t),t.removeEventListener("signalingstatechange",a))};t.addEventListener("signalingstatechange",a)};qt(s,"child_added",a=>{const c=a.val();if(!(!t||t.signalingState==="closed")&&c)if(t.remoteDescription)try{t.addIceCandidate(new RTCIceCandidate(c))}catch{}else{const l=Gs.get(t);l&&(l.push(c),l.length===1&&i())}},n)}function Zc(t){if(!t||!Gs.has(t))return;const e=Gs.get(t);if(e.length!==0){W(`🔄 Draining ${e.length} queued ICE candidate(s)`);for(const n of e)try{t.addIceCandidate(new RTCIceCandidate(n)).catch(s=>{W("Error adding queued ICE candidate:",s)})}catch{}e.length=0}}const hk=Object.freeze(Object.defineProperty({__proto__:null,drainIceCandidateQueue:Zc,setupIceCandidates:Xc},Symbol.toStringTag,{value:"Module"}));let je=null,yd=null;function ug(t){yd=t,t.onconnectionstatechange=()=>{W("onconnectionstatechange:",t.connectionState),t.connectionState==="connected"?(Kc(),Jc().catch(e=>console.warn("Failed to clear calling state on connect:",e)),je&&(clearTimeout(je),je=null)):t.connectionState==="disconnected"?(je&&clearTimeout(je),je=setTimeout(()=>{t===yd&&t.connectionState==="disconnected"&&te.cleanupCall({reason:"connection_lost"}),je=null},3e3)):t.connectionState==="failed"&&(Hi(),je&&(clearTimeout(je),je=null),te.cleanupCall({reason:"connection_failed"}))},t.addEventListener("iceconnectionstatechange",e=>{W("ICE iceconnectionstatechange:",t.iceConnectionState),t.iceConnectionState==="failed"&&(console.warn("ICE connection failed, restarting ICE..."),t.restartIce())})}function ga(t,e,n={}){if(!t||typeof e!="function")throw new Error("closeOnClickOutside: valid element and onClose callback required");const{ignore:s=[],esc:r=!0,events:i=["mousedown","touchstart"]}=n,o=Array.isArray(s)?s.filter(Boolean):[],a=l=>{try{const u=l.target;if(t.contains(u))return;for(const d of o)if(d&&d.contains&&d.contains(u)||d===u)return;e(l)}catch(u){console.error("closeOnClickOutside handler error:",u)}},c=l=>{r&&l.key==="Escape"&&e(l)};return i.forEach(l=>document.addEventListener(l,a,{passive:!0})),r&&document.addEventListener("keydown",c),function(){i.forEach(u=>document.removeEventListener(u,a,{passive:!0})),r&&document.removeEventListener("keydown",c)}}const fk=CSS.supports?.("position-anchor: --msg-toggle")&&CSS.supports?.("right: anchor(right)")&&CSS.supports?.("bottom: anchor(top)");function pk(t){const e=t.getBoundingClientRect();return e.top>=0&&e.left>=0&&e.bottom<=window.innerHeight&&e.right<=window.innerWidth}function Ed(t){const e=document.createElement("div");e.innerHTML=`
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
  `,document.body.appendChild(e);const n=e.querySelector("#messages-toggle-btn"),s=e.querySelector("#messages-box"),r=e.querySelector("#messages"),i=e.querySelector("#messages-form"),o=e.querySelector("#messages-input"),a=n?.parentNode||null,c=n?.nextSibling||null;if(!n||!s||!r||!i||!o)return console.error("Messages UI elements not found."),null;let l=!1;function u(){if(!n||!s||s.classList.contains("hidden"))return;const Y=n.getBoundingClientRect(),de=s.getBoundingClientRect(),rl=8;let Yi=Y.top-de.height-rl;Yi<8&&(Yi=Y.bottom+rl);let is=Y.left+Y.width/2-de.width/2;const il=window.innerWidth-de.width-8;is<8&&(is=8),is>il&&(is=il),s.style.top=`${Math.round(Yi)}px`,s.style.left=`${Math.round(is)}px`}function d(){l||(l=!0,window.addEventListener("resize",u,{passive:!0}),window.addEventListener("scroll",u,{passive:!0}),window.addEventListener("orientationchange",u,{passive:!0}))}function h(){l&&(l=!1,window.removeEventListener("resize",u),window.removeEventListener("scroll",u),window.removeEventListener("orientationchange",u))}const f=document.querySelector(".top-bar .top-right-menu")||document.querySelector(".top-right-menu");function p(){!n||!f||n.parentNode!==f&&f.appendChild(n)}function y(){!n||!a||n.parentNode!==a&&(c&&c.parentNode===a?a.insertBefore(n,c):a.appendChild(n))}const m=window.matchMedia("(max-width: 800px)"),A=Y=>{Y.matches?p():y()};A(m),m.addEventListener("change",A);const N=new MutationObserver(Y=>{Y.forEach(de=>{de.type==="attributes"&&de.attributeName==="class"&&s.classList.contains("hidden")})});N.observe(s,{attributes:!0});function ae(){s.classList.toggle("hidden"),s.classList.contains("hidden")?(o.blur(),h(),s.style.top="",s.style.left="",s.style.bottom="",s.style.right=""):(o.focus(),fk?requestAnimationFrame(()=>{pk(s)||(u(),d())}):(u(),d()))}n.addEventListener("click",ae),ga(s,()=>{E(s),h(),s.style.top="",s.style.left="",s.style.bottom="",s.style.right=""},{ignore:[n],esc:!0});function S(){R(n)}function ne(){E(n)}function Ce(Y){const de=document.createElement("p");de.textContent=Y,Y.startsWith("You:")?de.style.textAlign="right":Y.startsWith("Partner:")&&(de.style.textAlign="left"),r.appendChild(de),r.scrollTop=r.scrollHeight}function Ve(Y){Ce(`Partner: ${Y}`),$c(s)&&Ee()}function Ee(){n.classList.add("new-message"),setTimeout(()=>{n.classList.remove("new-message")},4e3)}i.addEventListener("submit",Y=>{Y.preventDefault();const de=o.value.trim();de&&(t(de),Ce(`You: ${de}`),o.value="")});function fn(){try{m.removeEventListener("change",A)}catch{}y(),h(),N.disconnect(),n&&ne(),e&&e.parentNode&&e.parentNode.removeChild(e)}return{appendChatMessage:Ce,receiveMessage:Ve,toggleMessages:ae,showMessagesToggle:S,hideMessagesToggle:ne,cleanup:fn}}function dg(t,e){let n,s;return e==="initiator"?(n=t.createDataChannel("chat"),s=Ed(i=>{n.readyState==="open"&&n.send(i)}),n.onopen=()=>{s.showMessagesToggle(),s.appendChatMessage("💬 Chat connected")},n.onmessage=i=>s.receiveMessage(i.data)):e==="joiner"&&(t.ondatachannel=r=>{n=r.channel,s=Ed(i=>n.send(i)),n.onopen=()=>{s.showMessagesToggle(),s.appendChatMessage("💬 Chat connected")},n.onmessage=i=>s.receiveMessage(i.data)}),{dataChannel:n,messagesUI:s}}const el={iceServers:[{urls:"stun:stun.l.google.com:19302"}]},wo=new WeakMap;function hg(t,e,n){wo.has(t)||wo.set(t,{});const s=wo.get(t),r=e==="offer"?"lastOffer":"lastAnswer";return s[r]===n?!0:(s[r]=n,!1)}function fg(t,e){return t?e==="offer"?t.signalingState==="stable":t.signalingState==="have-local-offer"||t.signalingState==="stable":!1}function tl(t,e){e.getTracks().forEach(n=>{t.addTrack(n,e)})}async function pg(t){const e=await t.createOffer();return await t.setLocalDescription(e),e}async function gg(t){const e=await t.createAnswer();return await t.setLocalDescription(e),e}async function mg(t,e,n){if(hg(t,e.type,e.sdp))return console.debug(`Ignoring duplicate ${e.type} - already processed`),!1;if(!fg(t,e.type))return console.warn(`Ignoring ${e.type} - unexpected signaling state:`,t.signalingState),!1;try{return await t.setRemoteDescription(new RTCSessionDescription(e)),n(t),console.debug(`Remote description set (${e.type})`),!0}catch(s){return console.error(`Failed to set remote description (${e.type}):`,s),!1}}function _g(){return Math.random().toString(36).substring(2,9)}const gk=Object.freeze(Object.defineProperty({__proto__:null,addLocalTracks:tl,createAnswer:gg,createOffer:pg,generateRoomId:_g,isDuplicateSdp:hg,isValidSignalingState:fg,rtcConfig:el,setRemoteDescription:mg},Symbol.toStringTag,{value:"Module"}));async function mk({localStream:t,remoteVideoEl:e,mutePartnerBtn:n,setupRemoteStream:s,setupWatchSync:r,targetRoomId:i=null}){if(!t)return{success:!1};const o=new RTCPeerConnection(el),a="initiator",c=i||_g(),l=le();tl(o,t);const{dataChannel:u,messagesUI:d}=dg(o,a);if(!s(o,e,n))return console.error("Error setting up remote stream"),o.close(),{success:!1};Xc(o,a,c),ug(o);const f=await pg(o);await j.createNewRoom(f,l,c),r(c,a,l);const p=`${window.location.origin}${window.location.pathname}?room=${c}`;return{success:!0,pc:o,roomId:c,roomLink:p,dataChannel:u,messagesUI:d,role:a}}async function _k({roomId:t,localStream:e,remoteVideoEl:n,mutePartnerBtn:s,setupRemoteStream:r,setupWatchSync:i}){if(!e)return{success:!1};if(!t)return{success:!1};const o=await j.checkRoomStatus(t);if(!o.exists)return{success:!1};if(!o.hasMembers)return{success:!1};let a;try{a=await j.getRoomData(t)}catch(m){return W("Error: "+m.message),{success:!1}}const c=a.offer;if(!c)return{success:!1};const l=new RTCPeerConnection(el),u="joiner",d=le();tl(l,e);const{dataChannel:h,messagesUI:f}=dg(l,u);if(!r(l,n,s))return console.error("Error setting up remote stream for joiner"),l.close(),{success:!1};Xc(l,u,t),ug(l),await mg(l,c,Zc);const y=await gg(l);try{await j.saveAnswer(t,y)}catch(m){return console.error("Failed to save answer to Firebase:",m),l.close(),{success:!1}}return i(t,u,d),await j.joinRoom(t,d),{success:!0,pc:l,roomId:t,dataChannel:h,messagesUI:f,role:u}}class yk{constructor(){this.listeners=new Map}on(e,n){this.listeners.has(e)||this.listeners.set(e,new Set),this.listeners.get(e).add(n)}off(e,n){this.listeners.has(e)&&this.listeners.get(e).delete(n)}emit(e,n){if(this.listeners.has(e))for(const s of Array.from(this.listeners.get(e)))try{s(n)}catch(r){console.warn("CallController listener error",r)}}}class Ek{constructor(){this.emitter=new yk,this.resetState()}resetState(){this.state="idle",this.roomId=null,this.roomLink=null,this.role=null,this.partnerId=null,this.pc=null,this.dataChannel=null,this.messagesUI=null,this.localVideoEl=null,this.remoteVideoEl=null,this.isHangingUp=!1,this.isCleaningUp=!1,this.listeners=new Map}getState(){return{state:this.state,roomId:this.roomId,roomLink:this.roomLink,role:this.role,partnerId:this.partnerId,hasPc:!!this.pc,isHangingUp:this.isHangingUp,isCleaningUp:this.isCleaningUp}}on(e,n){this.emitter.on(e,n)}off(e,n){this.emitter.off(e,n)}setPartnerId(e){this.partnerId=e}setupCancellationListener(e){if(!e)return;const n=re(ie,`rooms/${e}/cancellation`);let s=!1;const r=async i=>{const o=i.val();if(o&&!s){s=!0;try{this.remoteVideoEl&&(this.remoteVideoEl.srcObject=null)}catch(a){console.warn("Failed to clear remote video after cancellation",a)}try{this.pc&&this.pc.close()}catch{}try{await this.cleanupCall({reason:o.reason||"remote_cancelled"})}catch(a){console.warn("Failed to trigger CallController cleanup",a)}}};Rr(n,r,e),this.listeners.has("cancellation")||this.listeners.set("cancellation",[]),this.listeners.get("cancellation").push({ref:n,callback:r,roomId:e})}setupAnswerListener(e,n,s){if(!e||!n)return;const r=re(ie,`rooms/${e}/answer`),i=async o=>{const a=o.val();if(a){const{setRemoteDescription:c}=await Ge(async()=>{const{setRemoteDescription:l}=await Promise.resolve().then(()=>gk);return{setRemoteDescription:l}},void 0);await c(n,a,s)}};Rr(r,i,e),this.listeners.has("answer")||this.listeners.set("answer",[]),this.listeners.get("answer").push({ref:r,callback:i,roomId:e})}setupRejectionListener(e){if(!e)return;const n=re(ie,`rooms/${e}/rejection`);let s=!1;const r=async i=>{const o=i.val();if(o&&!s&&(s=!0,this.pc?.connectionState!=="connected")){try{const{onCallRejected:a}=await Ge(async()=>{const{onCallRejected:c}=await Promise.resolve().then(()=>ok);return{onCallRejected:c}},void 0);await a(o.reason||"user_rejected")}catch{}try{await j.leaveRoom(le(),e)}catch{}try{this.pc&&this.pc.close()}catch{}}};Rr(n,r,e),this.listeners.has("rejection")||this.listeners.set("rejection",[]),this.listeners.get("rejection").push({ref:n,callback:r,roomId:e})}setupMemberJoinedListener(e){if(!e)return;const n=le(),s=r=>{r.key!==n&&(this.setPartnerId(r.key),this.emitter.emit("memberJoined",{memberId:r.key,roomId:e}))};j.onMemberJoined(e,s),this.listeners.has("member-joined")||this.listeners.set("member-joined",[]),this.listeners.get("member-joined").push({callback:s,roomId:e})}setupMemberLeftListener(e){if(!e)return;const n=le(),s=r=>{r.key!==n&&this.pc?.connectionState==="connected"&&this.emitter.emit("memberLeft",{memberId:r.key,roomId:e})};j.onMemberLeft(e,s),this.listeners.has("member-left")||this.listeners.set("member-left",[]),this.listeners.get("member-left").push({callback:s,roomId:e})}removeTrackedListeners(){try{for(const[e,n]of this.listeners.entries())for(const s of n)try{s.ref&&Mi(s.ref,"value",s.callback)}catch(r){console.warn(`Failed to remove ${e} listener`,r)}}catch(e){console.warn("Failed to remove tracked listeners",e)}finally{this.listeners.clear()}if(this.roomId)try{Fi(this.roomId)}catch(e){console.warn("Failed to remove RTDB listeners for room",e)}}async createCall(e={}){this.state="creating";try{e.localVideoEl&&(this.localVideoEl=e.localVideoEl),e.remoteVideoEl&&(this.remoteVideoEl=e.remoteVideoEl);const n=await mk(e);if(!n||!n.success)return this.state="idle",this.emitter.emit("error",{phase:"createCall",detail:n}),this.emitCallFailed("createCall",n),n;this.pc=n.pc,this.roomId=n.roomId,this.roomLink=n.roomLink||null,this.role=n.role||"initiator",this.dataChannel=n.dataChannel||null,this.messagesUI=n.messagesUI||null,this.state="waiting";const{drainIceCandidateQueue:s}=await Ge(async()=>{const{drainIceCandidateQueue:r}=await Promise.resolve().then(()=>hk);return{drainIceCandidateQueue:r}},void 0);return this.setupAnswerListener(this.roomId,this.pc,s),this.setupCancellationListener(this.roomId),this.setupRejectionListener(this.roomId),this.setupMemberJoinedListener(this.roomId),this.setupMemberLeftListener(this.roomId),this.emitter.emit("created",{roomId:this.roomId,roomLink:this.roomLink,role:this.role}),n}catch(n){throw this.state="idle",this.emitter.emit("error",{phase:"createCall",error:n}),this.emitCallFailed("createCall",n),n}}async answerCall(e={}){this.state="joining";try{e.localVideoEl&&(this.localVideoEl=e.localVideoEl),e.remoteVideoEl&&(this.remoteVideoEl=e.remoteVideoEl);const n=await _k(e);return!n||!n.success?(this.state="idle",this.emitter.emit("error",{phase:"answerCall",detail:n}),this.emitCallFailed("answerCall",n),n):(this.pc=n.pc,this.roomId=n.roomId,this.role=n.role||"joiner",this.dataChannel=n.dataChannel||null,this.messagesUI=n.messagesUI||null,this.state="connected",this.setupCancellationListener(this.roomId),this.setupMemberJoinedListener(this.roomId),this.setupMemberLeftListener(this.roomId),this.emitter.emit("answered",{roomId:this.roomId,role:this.role}),n)}catch(n){throw this.state="idle",this.emitter.emit("error",{phase:"answerCall",error:n}),this.emitCallFailed("answerCall",n),n}}async hangUp({emitCancel:e=!0,reason:n="user_hung_up"}={}){if(!this.isHangingUp){this.isHangingUp=!0;try{if(e&&this.roomId)try{await j.cancelCall(this.roomId,le(),n)}catch(s){console.warn("CallController: cancelCall failed (non-fatal)",s)}await this.cleanupCall({reason:n}),this.emitter.emit("hangup",{roomId:this.roomId,reason:n})}catch(s){throw this.emitter.emit("error",{phase:"hangUp",error:s}),s}finally{this.isHangingUp=!1}}}isRemoteHangup(e){return e?["remote","cancelled","partner_disconnected","connection_failed"].some(s=>e.includes(s)):!1}emitCallFailed(e,n){this.emitter.emit("callFailed",{phase:e,error:n?.message||n?.error||n||"Unknown error"})}async cleanupCall({reason:e}={}){if(!this.isCleaningUp){this.isCleaningUp=!0;try{const n=this.roomId,s=this.partnerId;this.removeTrackedListeners();try{await j.leaveRoom(le(),this.roomId)}catch{}try{if(this.pc){try{this.pc.close()}catch{}this.pc=null}}catch{}try{this.remoteVideoEl&&(this.remoteVideoEl.srcObject=null)}catch(r){console.warn("CallController: failed to clear remote video",r)}try{this.localVideoEl&&(this.localVideoEl.srcObject=null)}catch(r){console.warn("CallController: failed to clear local video",r)}try{const{cleanupLocalStream:r}=await Ge(async()=>{const{cleanupLocalStream:i}=await Promise.resolve().then(()=>ek);return{cleanupLocalStream:i}},void 0);r()}catch(r){console.warn("CallController: failed to cleanup local stream",r)}try{const{resetLocalStreamInitFlag:r}=await Ge(async()=>{const{resetLocalStreamInitFlag:i}=await Promise.resolve().then(()=>sA);return{resetLocalStreamInitFlag:i}},void 0);r()}catch{}this.isRemoteHangup(e)&&this.emitter.emit("remoteHangup",{roomId:n,partnerId:s,reason:e}),this.resetState(),this.emitter.emit("cleanup",{roomId:n,partnerId:s,reason:e})}catch(n){throw this.emitter.emit("error",{phase:"cleanupCall",error:n}),n}finally{this.isCleaningUp=!1}}}}const te=new Ek,ma={default:{echoCancellation:!0,noiseSuppression:!0,autoGainControl:!0},withVoiceIsolationIfSupported:{echoCancellation:!0,noiseSuppression:!0,autoGainControl:!0,voiceIsolation:!0,restrictOwnAudio:!0,googHighpassFilter:!0,googTypingNoiseDetection:!0,highpassFilter:!0,typingNoiseDetection:!0}};function yg(){const t=navigator.mediaDevices.getSupportedConstraints();return["voiceIsolation","highpassFilter","typingNoiseDetection"].every(s=>t[s])?ma.withVoiceIsolationIfSupported:ma.default}const vk=()=>ma.default,wk={desktop:{landscape:{width:{ideal:1920},height:{ideal:1080},frameRate:{min:10,ideal:30},aspectRatio:{ideal:16/9}},portrait:{width:{ideal:1080},height:{ideal:1920},frameRate:{min:10,ideal:30},aspectRatio:{ideal:9/16}}},mobile:{portrait:{width:{ideal:1080},height:{ideal:1920},aspectRatio:{ideal:9/16},frameRate:{ideal:30}},landscape:{width:{ideal:1920},height:{ideal:1080},aspectRatio:{ideal:16/9},frameRate:{ideal:30}}}},bk=()=>window.screen?.orientation?.type?.includes("portrait")||window.orientation===0||window.orientation===180;function nl(t){const e=bk()?"portrait":"landscape",s=/Mobi|Android/i.test(navigator.userAgent)?"mobile":"desktop",r=wk[s][e];return{facingMode:t,...r}}function Sk(){return!!(navigator.mediaDevices&&navigator.mediaDevices.enumerateDevices)}async function Ck(){return Sk()?(await navigator.mediaDevices.enumerateDevices()).filter(e=>e.kind==="videoinput"):[]}async function Ik(){const t=await Ck();let e=!1,n=!1;return t.forEach(s=>{const r=s.label.toLowerCase();(r.includes("front")||r.includes("user"))&&(e=!0),(r.includes("back")||r.includes("rear")||r.includes("environment"))&&(n=!0)}),e&&n}async function Tk({localStream:t,localVideo:e,currentFacingMode:n,peerConnection:s=null}){if(!t||!e)return console.error("switchCamera: missing localStream or localVideo"),null;const r=n==="user"?"environment":"user";try{const i=await navigator.mediaDevices.getUserMedia({video:nl(r),audio:yg()}),o=i.getVideoTracks()[0],a=i.getAudioTracks()[0],c=t.getVideoTracks()[0],l=c?c.enabled:!0,u=t.getAudioTracks()[0],d=u?!u.enabled:!1;if(s){const h=s.getSenders().find(p=>p.track&&p.track.kind==="video");h&&h.replaceTrack(o);const f=s.getSenders().find(p=>p.track&&p.track.kind==="audio");f&&a&&f.replaceTrack(a)}return o&&(o.enabled=l),a&&(a.enabled=!d),t.getTracks().forEach(h=>h.stop()),e.srcObject=new MediaStream([o].filter(Boolean)),{newStream:i,facingMode:r}}catch(i){return console.error("Failed to switch camera:",i),null}}let bo=!1,Ht=null,Wt=null;function Rk({getLocalStream:t,getFacingMode:e}){return Ht&&Wt&&Ht.removeEventListener("change",Wt),Ht=window.matchMedia("(orientation: portrait)"),Wt=()=>{try{const n=typeof t=="function"?t():null,s=typeof e=="function"?e():"user";kk({localStream:n,currentFacingMode:s})}catch(n){console.error("Orientation handler failed:",n)}},Ht.addEventListener("change",Wt),()=>{Ht&&Wt&&Ht.removeEventListener("change",Wt),Ht=null,Wt=null}}async function kk({localStream:t,currentFacingMode:e}){if(!(bo||!t?.getVideoTracks()[0])){bo=!0;try{const n=t.getVideoTracks()[0],s=nl(e);W("Applying constraints:",s),await n.applyConstraints(s),W("Video constraints updated successfully")}catch(n){console.error("Failed to apply orientation constraints:",n)}finally{bo=!1}}}let _a=!1,gi=[];function Ak(t,e){if(!e)return;const n=e.getAudioTracks()[0];n&&(n.enabled=t)}function Nk(t,e,n){n&&(n.muted=!t,n.volume=e)}function Pk(t,e){const n=e.querySelector("i");n.className=t?"fa fa-microphone-slash":"fa fa-microphone"}function Lk(t,e){if(!t)return;const n=()=>{if(t.muted!==_a){const s=e.querySelector("i");s.className=t.muted?"fa fa-volume-mute":"fa fa-volume-up",_a=t.muted}};t.addEventListener("volumechange",n),gi.push(()=>{t&&t.removeEventListener("volumechange",n)})}function Ok({getLocalStream:t,getLocalVideo:e,getRemoteVideo:n,getPeerConnection:s=()=>null,setLocalStream:r=null,micBtn:i,cameraBtn:o,switchCameraBtn:a,mutePartnerBtn:c,fullscreenPartnerBtn:l}){i&&(i.onclick=()=>{const d=t(),h=e();if(!h||!d)return;const f=!h.muted;Ak(!f,d),Nk(!f,0,h),Pk(f,i)}),o&&(o.onclick=()=>{const d=t();if(!d)return;const h=d.getVideoTracks()[0];if(h){h.enabled=!h.enabled;const f=o.querySelector("i");f.className=h.enabled?"fa fa-video":"fa fa-video-slash"}});const u=Rk({getLocalStream:t,getFacingMode:fa});gi.push(u),a&&(a.onclick=async()=>{const d=await Tk({localStream:t(),localVideo:e(),currentFacingMode:fa(),peerConnection:s()||null});d?(ng(d.facingMode),console.log("Switched camera to facingMode:",d.facingMode),d.newStream&&typeof r=="function"&&r(d.newStream)):console.error("Camera switch failed.")},(async()=>await Ik()?R(a):E(a))()),c&&(c.onclick=()=>{const d=n();d&&(d.muted=!d.muted)}),l&&(l.onclick=()=>{const d=n();d.requestFullscreen?d.requestFullscreen():d.webkitRequestFullscreen&&d.webkitRequestFullscreen()})}function Dk(){gi.forEach(t=>t()),gi=[],_a=!1}let fs=null,yt=null,U=null,M=null,vd=!1,vr=!1,ze=[],ya="",ce=-1,Or=[];const xk="AIzaSyBPUjW7ac277WIYTbN4M8dUomK39qRQjhA",Mk="https://www.googleapis.com/youtube/v3";async function Fk(){if(vd||vr)return!1;vr=!0;const{initializeYouTubeElements:t}=await Ge(async()=>{const{initializeYouTubeElements:o}=await Promise.resolve().then(()=>FR);return{initializeYouTubeElements:o}},void 0),e=await t();if(fs=e.searchContainer,yt=e.searchBtn,U=e.searchQuery,M=e.searchResults,!fs||!yt||!U||!M)return console.error("YouTube search elements not found in DOM"),vr=!1,!1;try{const{onOneTapStatusChange:o}=await Ge(async()=>{const{onOneTapStatusChange:c}=await Promise.resolve().then(()=>pR);return{onOneTapStatusChange:c}},void 0),a=o(c=>{c==="displayed"?E(fs):R(fs)});Or.push(a)}catch(o){console.warn("Could not set up One Tap search section visibility:",o)}const n=o=>/^https?:\/\//i.test(o),s=o=>{(M?.querySelectorAll(".search-result-item")||[]).forEach((c,l)=>{l===o?(c.classList.add("focused"),c.scrollIntoView({block:"nearest"})):c.classList.remove("focused")}),ce=o??-1};yt.onclick=async()=>{const o=U.value.trim();if($c(U)){R(U),U.focus();return}if(!o){Dr(),E(U);return}if(Sd()&&o===ya)Ea(ze);else if(!n(o))await wd(o);else{mn&&await mn({url:o}),E(M),U.value="",E(U),ce=-1;return}},fs.addEventListener("keydown",async o=>{const a=M.querySelectorAll(".search-result-item");if(a.length>0&&(o.key==="ArrowDown"||o.key==="ArrowUp")){if(o.key==="ArrowDown"){let c=ce+1;c>=a.length&&(c=0),s(c)}else if(o.key==="ArrowUp"){let c=ce-1;c<0&&(c=ce===-1?0:a.length-1),s(c)}return}if(o.key==="Enter"){if(a.length>0&&ce>=0){a[ce].click(),E(U),E(M),ce=-1;return}const c=U.value.trim();if(c)if(Sd()&&c===ya)Ea(ze);else if(!n(c))await wd(c);else{mn&&await mn({url:c}),E(M),ce=-1,U.value="",E(U);return}}else o.key==="Escape"&&($k()?Dr():U.value?U.value="":E(U))}),U.addEventListener("input",()=>{U.value.trim()===""&&Dr(),ce=-1});const r=ga(U,()=>E(U),{ignore:[yt],esc:!1});Or.push(r);const i=ga(M,()=>E(M),{ignore:[yt],esc:!1});return Or.push(i),vr=!1,vd=!0,!0}async function wd(t){if(!yt||!M){console.error("Search elements not initialized");return}ze=[],ya=t,yt.disabled=!0,M.innerHTML='<div class="search-loading">Searching YouTube...</div>',R(M);try{const e=await fetch(`${Mk}/search?part=snippet&maxResults=10&q=${encodeURIComponent(t)}&type=video&key=${xk}`);if(!e.ok)throw e.status===403?new Error("YouTube API quota exceeded. Please try again later."):e.status===400?new Error("Invalid API key or request."):new Error(`YouTube API error: ${e.status}`);const n=await e.json();if(!n.items||n.items.length===0){bd("No videos found"),ze=[];return}ze=n.items.map(s=>({id:s.id.videoId,title:s.snippet.title,thumbnail:s.snippet.thumbnails.medium.url,channel:s.snippet.channelTitle,url:`https://www.youtube.com/watch?v=${s.id.videoId}`})),Ea(ze)}catch(e){console.error("YouTube search failed:",e),bd(e.message||"Search failed. Please try again.")}finally{yt.disabled=!1}}function Ea(t){if(!M){console.error("Search results element not initialized");return}if(!t||t.length===0){M.innerHTML='<div class="no-results">No results found</div>',ze=[],ce=-1;return}M.innerHTML="",t.forEach(n=>{const s=document.createElement("div");s.className="search-result-item",s.innerHTML=`
      <img src="${n.thumbnail}" alt="${n.title}" class="result-thumbnail">
      <div class="search-result-info">
        <div class="search-result-title">${n.title}</div>
        <div class="search-result-channel">${n.channel}</div>
      </div>
    `,s.onclick=async()=>{if(mn){if(await mn(n),E(M),ce=-1,!U){console.error("Search query element not initialized");return}U.value="",E(U)}},M.appendChild(s)}),R(M),ce=0,M.querySelectorAll(".search-result-item").forEach((n,s)=>{s===ce?(n.classList.add("focused"),n.scrollIntoView({block:"nearest"})):n.classList.remove("focused")})}function bd(t){if(ze=[],ce=-1,!M){console.error("Search results element not initialized");return}M.innerHTML=`<div class="search-error">${t}</div>`,R(M)}function Dr(){ze=[],ce=-1,M&&(M.innerHTML="",E(M))}function Uk(){Dr(),Or.forEach(t=>t())}function $k(){return!$c(M)}function Sd(){return ze.length>0}const Bk=async()=>{const t=zi(!1);if(t&&t instanceof MediaStream)return console.debug("Reusing existing local MediaStream."),t;const e=nl("user"),n=yg();try{const s=await navigator.mediaDevices.getUserMedia({video:e,audio:n});return ui(s),s}catch(s){if(s.name==="OverconstrainedError"){console.warn(`❌ Constraint failed on property: ${s.constraint}, falling back to basic constraints`);const r=vk(),i=await navigator.mediaDevices.getUserMedia({video:!0,audio:r});return ui(i),i}throw s}};async function Hk(t){const e=await Bk(),n=new MediaStream(e.getVideoTracks());return t.srcObject=n,!0}function Wk(t,e,n){return t.ontrack=s=>{if(W(`REMOTE TRACK RECEIVED: ${s.track.kind}`),!s.streams||!s.streams[0]||!(s.streams[0]instanceof MediaStream))return console.error("No valid remote MediaStream found in event.streams:",s.streams),!1;const r=s.streams[0];if(Gi(!1)!==r){sg(r),e.srcObject=r,Lk(e,n);try{const o=document.getElementById("remote-video-box")||e.parentElement;o&&(o.classList?.remove("hidden"),e.classList?.remove("hidden"),o.style.visibility="visible",o.style.opacity="1",o.style.position="",o.style.left="",o.style.top="",e.style.visibility="visible",e.style.opacity="1")}catch(o){console.warn("Visibility override failed:",o)}}},!0}let Cd=!1;function Vk(t,e){const n=document.createElement("dialog");n.className="copy-link-dialog";const s=document.createElement("div");s.className="copy-link-dialog__content";const r=document.createElement("h2");r.className="copy-link-dialog__title",r.textContent=e.title,s.appendChild(r);const i=document.createElement("div");i.className="copy-link-dialog__input-container";const o=document.createElement("input");o.type="text",o.className="copy-link-dialog__input",o.value=t,o.readOnly=!0,o.setAttribute("aria-label","Link to copy"),i.appendChild(o),s.appendChild(i);const a=document.createElement("div");a.className="copy-link-dialog__buttons";const c=document.createElement("button");c.className="copy-link-dialog__button copy-link-dialog__button--primary",c.textContent=e.buttonText,c.autofocus=!0;const l=document.createElement("button");l.className="copy-link-dialog__button copy-link-dialog__button--secondary",l.textContent=e.cancelText,a.appendChild(c),a.appendChild(l),s.appendChild(a);const u=document.createElement("p");return u.className="copy-link-dialog__feedback",u.setAttribute("aria-live","polite"),s.appendChild(u),n.appendChild(s),{dialog:n,input:o,copyButton:c,cancelButton:l,feedback:u}}function jk(t,e={}){const n={title:"Share this link",buttonText:"Copy",cancelText:"Cancel",successMessage:"✓ Copied to clipboard!",errorMessage:"Failed to copy. Click the link to select it manually.",autoClose:!0,autoCloseDelay:1200,onCopy:null,onError:null,onCancel:null,onClose:null,...e};Gk();const{dialog:s,input:r,copyButton:i,cancelButton:o,feedback:a}=Vk(t,n);zk(s);let c=!1;const l=async()=>{await qk(t,r)?(c=!0,a.textContent=n.successMessage,a.classList.remove("copy-link-dialog__feedback--error"),n.onCopy&&n.onCopy(t),n.autoClose&&setTimeout(()=>{s.close()},n.autoCloseDelay)):(a.textContent=n.errorMessage,a.classList.add("copy-link-dialog__feedback--error"),r.readOnly=!1,r.addEventListener("click",()=>{r.select()}),n.onError&&n.onError())};return i.addEventListener("click",l),o.addEventListener("click",()=>{n.onCancel&&n.onCancel(),s.close()}),s.addEventListener("keydown",u=>{u.key==="Enter"&&!u.shiftKey&&!u.ctrlKey&&!u.altKey&&!u.metaKey&&(u.preventDefault(),l())}),s.addEventListener("close",()=>{!c&&n.onCancel&&n.onCancel(),n.onClose&&n.onClose(),setTimeout(()=>{s.remove()},300)}),document.body.appendChild(s),s.showModal(),s}function Gk(){if(Cd)return;const t=document.createElement("style");t.textContent=`
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
  `,document.head.appendChild(t),Cd=!0}function zk(t){t.showModal||(t.showModal=function(){this.setAttribute("open",""),this.style.display="block",this.style.position="fixed",this.style.top="50%",this.style.left="50%",this.style.transform="translate(-50%, -50%)";const e=getComputedStyle(document.documentElement).getPropertyValue("--z-ui-overlay").trim();this.style.zIndex=e||"1000"},t.close=function(){this.removeAttribute("open"),this.style.display="none"})}async function qk(t,e=null){if(navigator.clipboard&&navigator.clipboard.writeText)try{return await navigator.clipboard.writeText(t),!0}catch(n){return console.warn("Clipboard API failed, using fallback:",n),!1}if(!e)return!1;try{return e.select(),e.setSelectionRange(0,99999),document.execCommand("copy")}catch(n){return console.error("Fallback copy failed:",n),!1}}function Yk(){const t=window.matchMedia&&window.matchMedia("(display-mode: standalone)").matches||navigator.standalone===!0,e=/iphone|ipad|ipod/i.test(navigator.userAgent||"");if(!t||!e||!window.location.hostname.includes("github.io"))return;const s="https://vidu-aae11.web.app",r=s.replace(/\/$/,"");let i;try{i=new URL(r).hostname}catch(l){console.error("[PWA Redirect] Invalid VITE_APP_HOSTING_URL:",s,l);return}if(window.location.hostname===i)return;const o="/HangVidU/";let a=window.location.pathname;a.startsWith(o)?a="/"+a.slice(o.length):a==="/HangVidU"&&(a="/");let c;try{c=new URL(a+window.location.search+window.location.hash,r).toString()}catch(l){console.error("[PWA Redirect] Failed to construct target URL:",l);return}console.log("[PWA Redirect] iOS standalone PWA on gh-pages → redirecting to Firebase Hosting:",c),window.location.replace(c)}lR(!0);_().disable();let sl=[];async function Kk(){Qk();const t=zp(),n=["localVideoEl","remoteVideoEl","localBoxEl","remoteBoxEl","chatControls","lobbyDiv","titleAuthBar"].filter(s=>!t[s]);if(n.length>0)return console.error("Critical elements missing:",n),!1;try{{const{setupPWA:r}=await Ge(async()=>{const{setupPWA:i}=await import("./PWA-2g7IKWDB.js");return{setupPWA:i}},[]);await r()}Fk(),eA(),await $p;const s=xR(Wi);return s&&sl.push(s.dispose),await As(),!0}catch(s){return console.error("Failed to get user media:",s),!1}}let va=!1;function Jk(){va=!1}async function As(){va||(va=!0,await Hk(ve),Ok({getLocalStream:zi,getLocalVideo:()=>ve,getRemoteVideo:()=>K,getPeerConnection:()=>te.getState().pc,setLocalStream:ui,micBtn:ss,cameraBtn:rs,switchCameraBtn:ns,mutePartnerBtn:We,fullscreenPartnerBtn:Vi}),ve&&(ve.addEventListener("enterpictureinpicture",()=>ee&&E(ee)),ve.addEventListener("leavepictureinpicture",()=>{ee&&!(ur()&&di())&&R(ee)})))}function Qk(){E($),E(ee),E(Se),E(ke)}function xr(t=null){return{localStream:zi(),localVideoEl:ve,remoteVideoEl:K,mutePartnerBtn:We,setupRemoteStream:Wk,setupWatchSync:VR,targetRoomId:t}}function Mr(t,e=!1){return t.success?(e&&t.roomLink&&jk(t.roomLink,{onCopy:()=>W("Link ready! Share with your partner."),onCancel:()=>W("Link ready! Use the copy button to use it, or create a new one.")}),!0):!1}async function qi(t,{forceInitiator:e=!1}={}){try{await As()}catch(i){return console.error("Failed to initialize local media stream:",i),!1}const n=Date.now();if(e){_().logRoomCreation(t,!0,{creationTime:n,listenerAttachTime:n,timeDiff:0},{trigger:"force_initiator",reason:"calling_saved_contact"}),await As();const i=await te.createCall(xr(t));return Mr(i,!1)}let s=await j.checkRoomStatus(t);if(s.exists&&!s.hasMembers){let o=0;for(;o<3&&!s.hasMembers;)await new Promise(a=>setTimeout(a,250*(o+1))),s=await j.checkRoomStatus(t),o++}if(!s.exists||!s.hasMembers){_().logRoomCreation(t,!0,{creationTime:n,listenerAttachTime:n,timeDiff:0},{trigger:"room_empty_or_nonexistent",roomExists:s.exists,memberCount:s.memberCount||0}),await As();const i=await te.createCall(xr(t));return Mr(i,!0)}_().log("ROOM","JOINING_EXISTING",{roomId:t,memberCount:s.memberCount,roomExists:s.exists});const r=await te.answerCall({roomId:t,...xr()});return Mr(r,!1)}const we=new Set,Eg=new Map;function Id(t){t&&(Fi(t),we.delete(t),Eg.delete(t),_().log("LISTENER","INCOMING_CLEANUP",{roomId:t,remainingListeners:we.size}))}function Xk(){W(`[LISTENER] Removing all incoming listeners (${we.size} rooms)`);const t=Array.from(we);t.forEach(e=>{Fi(e)}),we.clear(),Eg.clear(),_().log("LISTENER","ALL_INCOMING_CLEANUP",{roomsCleared:t.length})}async function Zk(t){const e=Date.now(),n=e+1440*60*1e3,s=Xe();if(s){const r=Sc(s,t);await ut(r,{roomId:t,savedAt:e,expiresAt:n});return}try{const r=localStorage.getItem("recentCalls")||"{}",i=JSON.parse(r);i[t]={roomId:t,savedAt:e,expiresAt:n},localStorage.setItem("recentCalls",JSON.stringify(i))}catch(r){console.warn("Failed to save recent call to localStorage",r)}}async function So(t){const e=Xe();if(e){try{await Bn(Sc(e,t))}catch(n){console.warn("Failed to remove recent call from RTDB",n)}return}try{const n=localStorage.getItem("recentCalls")||"{}",s=JSON.parse(n);s[t]&&(delete s[t],localStorage.setItem("recentCalls",JSON.stringify(s)))}catch(n){console.warn("Failed to remove recent call from localStorage",n)}}function Wn(t){t&&(we.has(t)&&(we.delete(t),Fi(t)),W(`[LISTENER] Attaching listener for room: ${t} (total: ${we.size+1})`),we.add(t),_().logListenerAttachment(t,"member_join",we.size,{action:"incoming_call_listener_attached"}),j.onMemberJoined(t,async e=>{const n=e.key,s=e.val?e.val():null,r=le();if(n&&n!==r){_().logMemberJoinEvent(t,n,s||{},{detectedBy:"incoming_call_listener",currentUserId:r});const i=s&&typeof s.joinedAt=="number"?s.joinedAt:null,o=2e4;let a=!1,c="none",l=0;if(i&&(l=Date.now()-i,a=l<o,c="joinedAt"),!a){const N=await ag(n,t),ae=await cg(t);a=N||ae,c=N?"outgoingState":ae?"roomCreatedAt":"failed"}const u={isFresh:a,method:c,age:l,reason:a?"call_is_fresh":"call_is_stale"};if(_().logIncomingCallEvent(n,t,u,{memberData:s,joinedAt:i,CALL_FRESH_MS:o}),!a){_().logNotificationDecision("REJECT","stale_call",t,{age:l,validationMethod:c,joiningUserId:n});return}let d;try{d=await j.getRoomData(t)}catch{return}if(!d||typeof d!="object")return;const h=!!d.offer,f=!!d.answer,p=d.createdBy;if(!h||f||p===r)return;const y=te.getState();if(!!y.pc&&y.pc.connectionState==="connected"){_().logNotificationDecision("REJECT","already_in_call",t,{joiningUserId:n,currentCallState:y.pc?.connectionState});return}if(_().logNotificationDecision("SHOW","fresh_call_detected",t,{joiningUserId:n,freshnessResult:u}),await Qc(`Incoming call from ${n} for room ${t}.

Accept?`))Id(t),_().logNotificationDecision("ACCEPT","user_accepted",t,{joiningUserId:n}),qi(t).catch(N=>{console.warn("Failed to answer incoming call:",N),_().logFirebaseOperation("join_room_on_accept",!1,N,{roomId:t,joiningUserId:n})});else{_().logNotificationDecision("REJECT","user_rejected",t,{joiningUserId:n});try{await j.rejectCall(t,le(),"user_rejected")}catch(N){console.warn("Failed to signal rejection via RTDB:",N)}await So(t).catch(N=>{console.warn("Failed to remove recent call on rejection:",N)})}}}),j.onCallCancelled(t,async e=>{if(e&&typeof e.val=="function"&&e.val()){try{const{dismissActiveConfirmDialog:s}=await Ge(async()=>{const{dismissActiveConfirmDialog:r}=await Promise.resolve().then(()=>ck);return{dismissActiveConfirmDialog:r}},void 0);typeof s=="function"&&s()}catch{}await So(t).catch(()=>{})}}),j.onMemberLeft(t,async e=>{const n=e.key,s=le();if(!(!n||n===s))try{(await j.checkRoomStatus(t)).hasMembers||(await So(t),Id(t),W(`Removed saved recent call and listeners for room ${t} because it is now empty`))}catch(r){console.warn("Failed to evaluate room status on member leave",r)}}))}async function Td(){const t=Date.now();_().log("LISTENER","STARTUP_BEGIN",{timestamp:t,currentListenerCount:we.size});try{if(typeof window<"u"){const{getCurrentUserAsync:n}=await Ge(async()=>{const{getCurrentUserAsync:s}=await Promise.resolve().then(()=>wR);return{getCurrentUserAsync:s}},void 0);await n()}}catch{}const e=Xe();if(_().log("LISTENER","AUTH_STATE_DETERMINED",{isLoggedIn:!!e,userId:e||"guest"}),e){const n=uI(e);try{const s=await Qt(n),r=s.exists()?s.val():null,i=new Set;if(r)for(const[o,a]of Object.entries(r)){if(!a||a.expiresAt&&a.expiresAt<Date.now()){await Bn(Sc(e,o)).catch(()=>{});continue}i.add(o)}try{const o=await pi();Object.values(o||{}).forEach(a=>{a?.roomId&&i.add(a.roomId)})}catch{}i.forEach(o=>Wn(o)),_().log("LISTENER","STARTUP_COMPLETE",{storage:"rtdb",roomsToListen:Array.from(i),totalListeners:we.size,duration:Date.now()-t})}catch(s){console.warn("Failed to read recent calls from RTDB",s),_().logFirebaseOperation("read_recent_calls",!1,s,{storage:"rtdb",userId:e})}return}try{const n=localStorage.getItem("recentCalls")||"{}",s=JSON.parse(n),r={},i=new Set;for(const[o,a]of Object.entries(s||{}))!a||a.expiresAt&&a.expiresAt<Date.now()||(r[o]=a,i.add(o));try{const o=await pi();Object.values(o||{}).forEach(a=>{a?.roomId&&i.add(a.roomId)})}catch{}i.forEach(o=>Wn(o)),localStorage.setItem("recentCalls",JSON.stringify(r)),_().log("LISTENER","STARTUP_COMPLETE",{storage:"localStorage",roomsToListen:Array.from(i),totalListeners:we.size,duration:Date.now()-t,expiredRoomsRemoved:Object.keys(s||{}).length-i.size})}catch(n){console.warn("Failed to read recent calls from localStorage",n),_().logFirebaseOperation("read_recent_calls",!1,n,{storage:"localStorage"})}}function Co(){return H&&Se&&!Se.classList.contains("hidden")&&H.src&&H.src.trim()!==""}let Rd=!1;function eA(){if(Rd)return;const t=()=>{const e=document.activeElement;return e&&(e.tagName==="INPUT"||e.tagName==="TEXTAREA"||e.isContentEditable)};document.addEventListener("keydown",e=>{if(!t()&&((e.key==="w"||e.key==="W")&&(console.log("=== W KEY PRESSED ==="),console.log("lastWatched:",hs()),console.log("isYTVisible():",Eo()),console.log("isSharedVideoVisible():",Co()),console.log("isWatchModeActive():",ur()),hs()==="yt"?Eo()?(da(),Lr()):(Jp(),pa()):hs()==="url"&&(Co()?(E(Se),Lr()):(R(Se),pa()))),e.key==="m"||e.key==="M")){const n=te.getState();n.messagesUI&&n.messagesUI.toggleMessages()}e.key==="Escape"&&(hs()==="yt"&&Eo()?(ji(),da()):hs()==="url"&&Co()&&(H.pause(),E(Se)),Lr())}),Rd=!0}const vg=async()=>{await As();const t=await te.createCall(xr());Mr(t,!0)};Pe.onclick=vg;Ut.onclick=vg;He.onclick=async()=>{console.debug("Hanging up..."),await te.hangUp({emitCancel:!0,reason:"user_hung_up"})};async function tA(){const e=new URLSearchParams(window.location.search).get("room");if(!e)return!1;const n=await qi(e);return n||(Hi(),og()),n}Yk();window.onload=async()=>{if(!await Kk()){Pe.disabled=!0,console.error("Initialization failed. Cannot start chat.");return}await Td().catch(r=>console.warn("Failed to start saved-room listeners",r)),js(Ke).catch(r=>{console.warn("Failed to render contacts list:",r)});let e=null;const n=Fc(async({isLoggedIn:r,user:i})=>{try{const o=e===null,a=e===!0&&!r,c=e===!1&&r;e=r,await js(Ke),a?(W("[AUTH] User logged out - cleaning up incoming listeners"),Xk()):c?(W("[AUTH] User logged in - re-attaching incoming listeners"),await Td().catch(l=>console.warn("Failed to re-attach saved-room listeners on login",l))):o&&r&&W("[AUTH] Initial load with logged-in user")}catch(o){console.warn("Failed to handle auth change:",o)}});sl.push(()=>{try{typeof n=="function"&&n()}catch{}}),await tA()};window.addEventListener("beforeunload",async t=>{const e=te.getState();if(e.pc&&e.pc.connectionState==="connected")return t.preventDefault(),t.returnValue="You are in an active call. Are you sure you want to leave?",t.returnValue;await nA()});te.on("memberJoined",({memberId:t,roomId:e})=>{console.debug("CallController memberJoined event",{memberId:t,roomId:e}),te.setPartnerId(t),Kc(),Jc().catch(n=>console.warn("Failed to clear calling state:",n)),Zk(e).catch(n=>console.warn("Failed to save recent call:",n))});te.on("memberLeft",({memberId:t})=>{console.debug("CallController memberLeft event",{memberId:t}),console.info("Partner has left the call")});te.on("cleanup",({roomId:t,reason:e})=>{console.debug("CallController cleanup event",{roomId:t,reason:e}),Nt(),rg(),og(),Hi()});te.on("cleanup",({roomId:t,partnerId:e,reason:n})=>{console.debug("CallController cleanup event",{roomId:t,partnerId:e,reason:n}),e&&t&&setTimeout(()=>{lk(e,t,Ke).catch(s=>{console.warn("Failed to save contact after cleanup:",s)})},500)});async function nA(){await te.hangUp({emitCancel:!0,reason:"page_unload"}),Dk(),aI(),document.pictureInPictureElement&&document.exitPictureInPicture().catch(e=>console.error(e));const t=te.getState();t.messagesUI&&t.messagesUI.cleanup&&t.messagesUI.cleanup(),window.history.replaceState({},document.title,window.location.pathname),H.src="",ig(),ve&&ve.srcObject&&(ve.srcObject=null),K&&K.srcObject&&(K.srcObject=null),Lr(),Hi(),WR("none"),Gc(),Kp(!1),Uk(),sl.forEach(e=>e())}const sA=Object.freeze(Object.defineProperty({__proto__:null,joinOrCreateRoomWithId:qi,listenForIncomingOnRoom:Wn,resetLocalStreamInitFlag:Jk},Symbol.toStringTag,{value:"Module"}));export{Ge as _,DR as c,W as d,E as h,rA as i,R as s};
