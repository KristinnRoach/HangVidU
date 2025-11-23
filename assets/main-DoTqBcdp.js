(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))s(i);new MutationObserver(i=>{for(const r of i)if(r.type==="childList")for(const o of r.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&s(o)}).observe(document,{childList:!0,subtree:!0});function n(i){const r={};return i.integrity&&(r.integrity=i.integrity),i.referrerPolicy&&(r.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?r.credentials="include":i.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function s(i){if(i.ep)return;i.ep=!0;const r=n(i);fetch(i.href,r)}})();const Ig="modulepreload",Tg=function(t){return"/HangVidU/"+t},cl={},Oe=function(e,n,s){let i=Promise.resolve();if(n&&n.length>0){let c=function(l){return Promise.all(l.map(u=>Promise.resolve(u).then(d=>({status:"fulfilled",value:d}),d=>({status:"rejected",reason:d}))))};document.getElementsByTagName("link");const o=document.querySelector("meta[property=csp-nonce]"),a=o?.nonce||o?.getAttribute("nonce");i=c(n.map(l=>{if(l=Tg(l),l in cl)return;cl[l]=!0;const u=l.endsWith(".css"),d=u?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${l}"]${d}`))return;const h=document.createElement("link");if(h.rel=u?"stylesheet":Ig,u||(h.as="script"),h.crossOrigin="",h.href=l,a&&h.setAttribute("nonce",a),document.head.appendChild(h),u)return new Promise((f,p)=>{h.addEventListener("load",f),h.addEventListener("error",()=>p(new Error(`Unable to preload CSS for ${l}`)))})}))}function r(o){const a=new Event("vite:preloadError",{cancelable:!0});if(a.payload=o,window.dispatchEvent(a),!a.defaultPrevented)throw o}return i.then(o=>{for(const a of o||[])a.status==="rejected"&&r(a.reason);return e().catch(r)})},C=typeof __SENTRY_DEBUG__>"u"||__SENTRY_DEBUG__,O=globalThis,Xt="10.26.0";function yr(){return Er(O),O}function Er(t){const e=t.__SENTRY__=t.__SENTRY__||{};return e.version=e.version||Xt,e[Xt]=e[Xt]||{}}function Gn(t,e,n=O){const s=n.__SENTRY__=n.__SENTRY__||{},i=s[Xt]=s[Xt]||{};return i[t]||(i[t]=e())}const Rg=["debug","info","warn","error","log","assert","trace"],kg="Sentry Logger ",Ui={};function zn(t){if(!("console"in O))return t();const e=O.console,n={},s=Object.keys(Ui);s.forEach(i=>{const r=Ui[i];n[i]=e[i],e[i]=r});try{return t()}finally{s.forEach(i=>{e[i]=n[i]})}}function Ag(){Ca().enabled=!0}function Ng(){Ca().enabled=!1}function Pd(){return Ca().enabled}function Pg(...t){Sa("log",...t)}function Lg(...t){Sa("warn",...t)}function Og(...t){Sa("error",...t)}function Sa(t,...e){C&&Pd()&&zn(()=>{O.console[t](`${kg}[${t}]:`,...e)})}function Ca(){return C?Gn("loggerSettings",()=>({enabled:!1})):{enabled:!1}}const w={enable:Ag,disable:Ng,isEnabled:Pd,log:Pg,warn:Lg,error:Og},Ld=50,tn="?",ll=/\(error: (.*)\)/,ul=/captureMessage|captureException/;function Od(...t){const e=t.sort((n,s)=>n[0]-s[0]).map(n=>n[1]);return(n,s=0,i=0)=>{const r=[],o=n.split(`
`);for(let a=s;a<o.length;a++){let c=o[a];c.length>1024&&(c=c.slice(0,1024));const l=ll.test(c)?c.replace(ll,"$1"):c;if(!l.match(/\S*Error: /)){for(const u of e){const d=u(l);if(d){r.push(d);break}}if(r.length>=Ld+i)break}}return Mg(r.slice(i))}}function Dg(t){return Array.isArray(t)?Od(...t):t}function Mg(t){if(!t.length)return[];const e=Array.from(t);return/sentryWrapped/.test(hi(e).function||"")&&e.pop(),e.reverse(),ul.test(hi(e).function||"")&&(e.pop(),ul.test(hi(e).function||"")&&e.pop()),e.slice(0,Ld).map(n=>({...n,filename:n.filename||hi(e).filename,function:n.function||tn}))}function hi(t){return t[t.length-1]||{}}const Qr="<anonymous>";function Lt(t){try{return!t||typeof t!="function"?Qr:t.name||Qr}catch{return Qr}}function dl(t){const e=t.exception;if(e){const n=[];try{return e.values.forEach(s=>{s.stacktrace.frames&&n.push(...s.stacktrace.frames)}),n}catch{return}}}function Dd(t){return"__v_isVNode"in t&&t.__v_isVNode?"[VueVNode]":"[VueViewModel]"}const bi={},hl={};function dn(t,e){bi[t]=bi[t]||[],bi[t].push(e)}function hn(t,e){if(!hl[t]){hl[t]=!0;try{e()}catch(n){C&&w.error(`Error while instrumenting ${t}`,n)}}}function $e(t,e){const n=t&&bi[t];if(n)for(const s of n)try{s(e)}catch(i){C&&w.error(`Error while triggering instrumentation handler.
Type: ${t}
Name: ${Lt(s)}
Error:`,i)}}let Xr=null;function xg(t){const e="error";dn(e,t),hn(e,Fg)}function Fg(){Xr=O.onerror,O.onerror=function(t,e,n,s,i){return $e("error",{column:s,error:i,line:n,msg:t,url:e}),Xr?Xr.apply(this,arguments):!1},O.onerror.__SENTRY_INSTRUMENTED__=!0}let Zr=null;function Ug(t){const e="unhandledrejection";dn(e,t),hn(e,$g)}function $g(){Zr=O.onunhandledrejection,O.onunhandledrejection=function(t){return $e("unhandledrejection",t),Zr?Zr.apply(this,arguments):!0},O.onunhandledrejection.__SENTRY_INSTRUMENTED__=!0}const Md=Object.prototype.toString;function Ia(t){switch(Md.call(t)){case"[object Error]":case"[object Exception]":case"[object DOMException]":case"[object WebAssembly.Exception]":return!0;default:return Ot(t,Error)}}function qn(t,e){return Md.call(t)===`[object ${e}]`}function xd(t){return qn(t,"ErrorEvent")}function fl(t){return qn(t,"DOMError")}function Bg(t){return qn(t,"DOMException")}function rt(t){return qn(t,"String")}function Ta(t){return typeof t=="object"&&t!==null&&"__sentry_template_string__"in t&&"__sentry_template_values__"in t}function vr(t){return t===null||Ta(t)||typeof t!="object"&&typeof t!="function"}function Ps(t){return qn(t,"Object")}function wr(t){return typeof Event<"u"&&Ot(t,Event)}function Hg(t){return typeof Element<"u"&&Ot(t,Element)}function Wg(t){return qn(t,"RegExp")}function qs(t){return!!(t?.then&&typeof t.then=="function")}function Vg(t){return Ps(t)&&"nativeEvent"in t&&"preventDefault"in t&&"stopPropagation"in t}function Ot(t,e){try{return t instanceof e}catch{return!1}}function Fd(t){return!!(typeof t=="object"&&t!==null&&(t.__isVue||t._isVue||t.__v_isVNode))}function jg(t){return typeof Request<"u"&&Ot(t,Request)}const Ra=O,Gg=80;function Ud(t,e={}){if(!t)return"<unknown>";try{let n=t;const s=5,i=[];let r=0,o=0;const a=" > ",c=a.length;let l;const u=Array.isArray(e)?e:e.keyAttrs,d=!Array.isArray(e)&&e.maxStringLength||Gg;for(;n&&r++<s&&(l=zg(n,u),!(l==="html"||r>1&&o+i.length*c+l.length>=d));)i.push(l),o+=l.length,n=n.parentNode;return i.reverse().join(a)}catch{return"<unknown>"}}function zg(t,e){const n=t,s=[];if(!n?.tagName)return"";if(Ra.HTMLElement&&n instanceof HTMLElement&&n.dataset){if(n.dataset.sentryComponent)return n.dataset.sentryComponent;if(n.dataset.sentryElement)return n.dataset.sentryElement}s.push(n.tagName.toLowerCase());const i=e?.length?e.filter(o=>n.getAttribute(o)).map(o=>[o,n.getAttribute(o)]):null;if(i?.length)i.forEach(o=>{s.push(`[${o[0]}="${o[1]}"]`)});else{n.id&&s.push(`#${n.id}`);const o=n.className;if(o&&rt(o)){const a=o.split(/\s+/);for(const c of a)s.push(`.${c}`)}}const r=["aria-label","type","name","title","alt"];for(const o of r){const a=n.getAttribute(o);a&&s.push(`[${o}="${a}"]`)}return s.join("")}function ka(){try{return Ra.document.location.href}catch{return""}}function qg(t){if(!Ra.HTMLElement)return null;let e=t;const n=5;for(let s=0;s<n;s++){if(!e)return null;if(e instanceof HTMLElement){if(e.dataset.sentryComponent)return e.dataset.sentryComponent;if(e.dataset.sentryElement)return e.dataset.sentryElement}e=e.parentNode}return null}function Se(t,e,n){if(!(e in t))return;const s=t[e];if(typeof s!="function")return;const i=n(s);typeof i=="function"&&$d(i,s);try{t[e]=i}catch{C&&w.log(`Failed to replace method "${e}" in object`,t)}}function nn(t,e,n){try{Object.defineProperty(t,e,{value:n,writable:!0,configurable:!0})}catch{C&&w.log(`Failed to add non-enumerable property "${e}" to object`,t)}}function $d(t,e){try{const n=e.prototype||{};t.prototype=e.prototype=n,nn(t,"__sentry_original__",e)}catch{}}function Aa(t){return t.__sentry_original__}function Bd(t){if(Ia(t))return{message:t.message,name:t.name,stack:t.stack,...gl(t)};if(wr(t)){const e={type:t.type,target:pl(t.target),currentTarget:pl(t.currentTarget),...gl(t)};return typeof CustomEvent<"u"&&Ot(t,CustomEvent)&&(e.detail=t.detail),e}else return t}function pl(t){try{return Hg(t)?Ud(t):Object.prototype.toString.call(t)}catch{return"<unknown>"}}function gl(t){if(typeof t=="object"&&t!==null){const e={};for(const n in t)Object.prototype.hasOwnProperty.call(t,n)&&(e[n]=t[n]);return e}else return{}}function Yg(t){const e=Object.keys(Bd(t));return e.sort(),e[0]?e.join(", "):"[object has no keys]"}function Hd(t,e=0){return typeof t!="string"||e===0||t.length<=e?t:`${t.slice(0,e)}...`}function ml(t,e){if(!Array.isArray(t))return"";const n=[];for(let s=0;s<t.length;s++){const i=t[s];try{Fd(i)?n.push(Dd(i)):n.push(String(i))}catch{n.push("[value cannot be serialized]")}}return n.join(e)}function Si(t,e,n=!1){return rt(t)?Wg(e)?e.test(t):rt(e)?n?t===e:t.includes(e):!1:!1}function br(t,e=[],n=!1){return e.some(s=>Si(t,s,n))}function Kg(){const t=O;return t.crypto||t.msCrypto}let eo;function Jg(){return Math.random()*16}function Re(t=Kg()){try{if(t?.randomUUID)return t.randomUUID().replace(/-/g,"")}catch{}return eo||(eo="10000000100040008000"+1e11),eo.replace(/[018]/g,e=>(e^(Jg()&15)>>e/4).toString(16))}function Wd(t){return t.exception?.values?.[0]}function Yt(t){const{message:e,event_id:n}=t;if(e)return e;const s=Wd(t);return s?s.type&&s.value?`${s.type}: ${s.value}`:s.type||s.value||n||"<unknown>":n||"<unknown>"}function Ro(t,e,n){const s=t.exception=t.exception||{},i=s.values=s.values||[],r=i[0]=i[0]||{};r.value||(r.value=e||""),r.type||(r.type="Error")}function An(t,e){const n=Wd(t);if(!n)return;const s={type:"generic",handled:!0},i=n.mechanism;if(n.mechanism={...s,...i,...e},e&&"data"in e){const r={...i?.data,...e.data};n.mechanism.data=r}}function _l(t){if(Qg(t))return!0;try{nn(t,"__sentry_captured__",!0)}catch{}return!1}function Qg(t){try{return t.__sentry_captured__}catch{}}const Vd=1e3;function Ys(){return Date.now()/Vd}function Xg(){const{performance:t}=O;if(!t?.now||!t.timeOrigin)return Ys;const e=t.timeOrigin;return()=>(e+t.now())/Vd}let yl;function ot(){return(yl??(yl=Xg()))()}function Zg(t){const e=ot(),n={sid:Re(),init:!0,timestamp:e,started:e,duration:0,status:"ok",errors:0,ignoreDuration:!1,toJSON:()=>tm(n)};return t&&Nn(n,t),n}function Nn(t,e={}){if(e.user&&(!t.ipAddress&&e.user.ip_address&&(t.ipAddress=e.user.ip_address),!t.did&&!e.did&&(t.did=e.user.id||e.user.email||e.user.username)),t.timestamp=e.timestamp||ot(),e.abnormal_mechanism&&(t.abnormal_mechanism=e.abnormal_mechanism),e.ignoreDuration&&(t.ignoreDuration=e.ignoreDuration),e.sid&&(t.sid=e.sid.length===32?e.sid:Re()),e.init!==void 0&&(t.init=e.init),!t.did&&e.did&&(t.did=`${e.did}`),typeof e.started=="number"&&(t.started=e.started),t.ignoreDuration)t.duration=void 0;else if(typeof e.duration=="number")t.duration=e.duration;else{const n=t.timestamp-t.started;t.duration=n>=0?n:0}e.release&&(t.release=e.release),e.environment&&(t.environment=e.environment),!t.ipAddress&&e.ipAddress&&(t.ipAddress=e.ipAddress),!t.userAgent&&e.userAgent&&(t.userAgent=e.userAgent),typeof e.errors=="number"&&(t.errors=e.errors),e.status&&(t.status=e.status)}function em(t,e){let n={};t.status==="ok"&&(n={status:"exited"}),Nn(t,n)}function tm(t){return{sid:`${t.sid}`,init:t.init,started:new Date(t.started*1e3).toISOString(),timestamp:new Date(t.timestamp*1e3).toISOString(),status:t.status,errors:t.errors,did:typeof t.did=="number"||typeof t.did=="string"?`${t.did}`:void 0,duration:t.duration,abnormal_mechanism:t.abnormal_mechanism,attrs:{release:t.release,environment:t.environment,ip_address:t.ipAddress,user_agent:t.userAgent}}}function Ks(t,e,n=2){if(!e||typeof e!="object"||n<=0)return e;if(t&&Object.keys(e).length===0)return t;const s={...t};for(const i in e)Object.prototype.hasOwnProperty.call(e,i)&&(s[i]=Ks(s[i],e[i],n-1));return s}function El(){return Re()}function jd(){return Re().substring(16)}const ko="_sentrySpan";function vl(t,e){e?nn(t,ko,e):delete t[ko]}function wl(t){return t[ko]}const nm=100;class ct{constructor(){this._notifyingListeners=!1,this._scopeListeners=[],this._eventProcessors=[],this._breadcrumbs=[],this._attachments=[],this._user={},this._tags={},this._extra={},this._contexts={},this._sdkProcessingMetadata={},this._propagationContext={traceId:El(),sampleRand:Math.random()}}clone(){const e=new ct;return e._breadcrumbs=[...this._breadcrumbs],e._tags={...this._tags},e._extra={...this._extra},e._contexts={...this._contexts},this._contexts.flags&&(e._contexts.flags={values:[...this._contexts.flags.values]}),e._user=this._user,e._level=this._level,e._session=this._session,e._transactionName=this._transactionName,e._fingerprint=this._fingerprint,e._eventProcessors=[...this._eventProcessors],e._attachments=[...this._attachments],e._sdkProcessingMetadata={...this._sdkProcessingMetadata},e._propagationContext={...this._propagationContext},e._client=this._client,e._lastEventId=this._lastEventId,vl(e,wl(this)),e}setClient(e){this._client=e}setLastEventId(e){this._lastEventId=e}getClient(){return this._client}lastEventId(){return this._lastEventId}addScopeListener(e){this._scopeListeners.push(e)}addEventProcessor(e){return this._eventProcessors.push(e),this}setUser(e){return this._user=e||{email:void 0,id:void 0,ip_address:void 0,username:void 0},this._session&&Nn(this._session,{user:e}),this._notifyScopeListeners(),this}getUser(){return this._user}setTags(e){return this._tags={...this._tags,...e},this._notifyScopeListeners(),this}setTag(e,n){return this.setTags({[e]:n})}setExtras(e){return this._extra={...this._extra,...e},this._notifyScopeListeners(),this}setExtra(e,n){return this._extra={...this._extra,[e]:n},this._notifyScopeListeners(),this}setFingerprint(e){return this._fingerprint=e,this._notifyScopeListeners(),this}setLevel(e){return this._level=e,this._notifyScopeListeners(),this}setTransactionName(e){return this._transactionName=e,this._notifyScopeListeners(),this}setContext(e,n){return n===null?delete this._contexts[e]:this._contexts[e]=n,this._notifyScopeListeners(),this}setSession(e){return e?this._session=e:delete this._session,this._notifyScopeListeners(),this}getSession(){return this._session}update(e){if(!e)return this;const n=typeof e=="function"?e(this):e,s=n instanceof ct?n.getScopeData():Ps(n)?e:void 0,{tags:i,extra:r,user:o,contexts:a,level:c,fingerprint:l=[],propagationContext:u}=s||{};return this._tags={...this._tags,...i},this._extra={...this._extra,...r},this._contexts={...this._contexts,...a},o&&Object.keys(o).length&&(this._user=o),c&&(this._level=c),l.length&&(this._fingerprint=l),u&&(this._propagationContext=u),this}clear(){return this._breadcrumbs=[],this._tags={},this._extra={},this._user={},this._contexts={},this._level=void 0,this._transactionName=void 0,this._fingerprint=void 0,this._session=void 0,vl(this,void 0),this._attachments=[],this.setPropagationContext({traceId:El(),sampleRand:Math.random()}),this._notifyScopeListeners(),this}addBreadcrumb(e,n){const s=typeof n=="number"?n:nm;if(s<=0)return this;const i={timestamp:Ys(),...e,message:e.message?Hd(e.message,2048):e.message};return this._breadcrumbs.push(i),this._breadcrumbs.length>s&&(this._breadcrumbs=this._breadcrumbs.slice(-s),this._client?.recordDroppedEvent("buffer_overflow","log_item")),this._notifyScopeListeners(),this}getLastBreadcrumb(){return this._breadcrumbs[this._breadcrumbs.length-1]}clearBreadcrumbs(){return this._breadcrumbs=[],this._notifyScopeListeners(),this}addAttachment(e){return this._attachments.push(e),this}clearAttachments(){return this._attachments=[],this}getScopeData(){return{breadcrumbs:this._breadcrumbs,attachments:this._attachments,contexts:this._contexts,tags:this._tags,extra:this._extra,user:this._user,level:this._level,fingerprint:this._fingerprint||[],eventProcessors:this._eventProcessors,propagationContext:this._propagationContext,sdkProcessingMetadata:this._sdkProcessingMetadata,transactionName:this._transactionName,span:wl(this)}}setSDKProcessingMetadata(e){return this._sdkProcessingMetadata=Ks(this._sdkProcessingMetadata,e,2),this}setPropagationContext(e){return this._propagationContext=e,this}getPropagationContext(){return this._propagationContext}captureException(e,n){const s=n?.event_id||Re();if(!this._client)return C&&w.warn("No client configured on scope - will not capture exception!"),s;const i=new Error("Sentry syntheticException");return this._client.captureException(e,{originalException:e,syntheticException:i,...n,event_id:s},this),s}captureMessage(e,n,s){const i=s?.event_id||Re();if(!this._client)return C&&w.warn("No client configured on scope - will not capture message!"),i;const r=s?.syntheticException??new Error(e);return this._client.captureMessage(e,n,{originalException:e,syntheticException:r,...s,event_id:i},this),i}captureEvent(e,n){const s=n?.event_id||Re();return this._client?(this._client.captureEvent(e,{...n,event_id:s},this),s):(C&&w.warn("No client configured on scope - will not capture event!"),s)}_notifyScopeListeners(){this._notifyingListeners||(this._notifyingListeners=!0,this._scopeListeners.forEach(e=>{e(this)}),this._notifyingListeners=!1)}}function sm(){return Gn("defaultCurrentScope",()=>new ct)}function im(){return Gn("defaultIsolationScope",()=>new ct)}class rm{constructor(e,n){let s;e?s=e:s=new ct;let i;n?i=n:i=new ct,this._stack=[{scope:s}],this._isolationScope=i}withScope(e){const n=this._pushScope();let s;try{s=e(n)}catch(i){throw this._popScope(),i}return qs(s)?s.then(i=>(this._popScope(),i),i=>{throw this._popScope(),i}):(this._popScope(),s)}getClient(){return this.getStackTop().client}getScope(){return this.getStackTop().scope}getIsolationScope(){return this._isolationScope}getStackTop(){return this._stack[this._stack.length-1]}_pushScope(){const e=this.getScope().clone();return this._stack.push({client:this.getClient(),scope:e}),e}_popScope(){return this._stack.length<=1?!1:!!this._stack.pop()}}function Pn(){const t=yr(),e=Er(t);return e.stack=e.stack||new rm(sm(),im())}function om(t){return Pn().withScope(t)}function am(t,e){const n=Pn();return n.withScope(()=>(n.getStackTop().scope=t,e(t)))}function bl(t){return Pn().withScope(()=>t(Pn().getIsolationScope()))}function cm(){return{withIsolationScope:bl,withScope:om,withSetScope:am,withSetIsolationScope:(t,e)=>bl(e),getCurrentScope:()=>Pn().getScope(),getIsolationScope:()=>Pn().getIsolationScope()}}function Na(t){const e=Er(t);return e.acs?e.acs:cm()}function Ft(){const t=yr();return Na(t).getCurrentScope()}function Js(){const t=yr();return Na(t).getIsolationScope()}function lm(){return Gn("globalScope",()=>new ct)}function um(...t){const e=yr(),n=Na(e);if(t.length===2){const[s,i]=t;return s?n.withSetScope(s,i):n.withScope(i)}return n.withScope(t[0])}function _e(){return Ft().getClient()}function dm(t){const e=t.getPropagationContext(),{traceId:n,parentSpanId:s,propagationSpanId:i}=e,r={trace_id:n,span_id:i||jd()};return s&&(r.parent_span_id=s),r}const hm="sentry.source",fm="sentry.sample_rate",pm="sentry.previous_trace_sample_rate",gm="sentry.op",mm="sentry.origin",Gd="sentry.profile_id",zd="sentry.exclusive_time",_m=0,ym=1,Em="_sentryScope",vm="_sentryIsolationScope";function wm(t){if(t){if(typeof t=="object"&&"deref"in t&&typeof t.deref=="function")try{return t.deref()}catch{return}return t}}function qd(t){const e=t;return{scope:e[Em],isolationScope:wm(e[vm])}}const bm="sentry-",Sm=/^sentry-/;function Cm(t){const e=Im(t);if(!e)return;const n=Object.entries(e).reduce((s,[i,r])=>{if(i.match(Sm)){const o=i.slice(bm.length);s[o]=r}return s},{});if(Object.keys(n).length>0)return n}function Im(t){if(!(!t||!rt(t)&&!Array.isArray(t)))return Array.isArray(t)?t.reduce((e,n)=>{const s=Sl(n);return Object.entries(s).forEach(([i,r])=>{e[i]=r}),e},{}):Sl(t)}function Sl(t){return t.split(",").map(e=>{const n=e.indexOf("=");if(n===-1)return[];const s=e.slice(0,n),i=e.slice(n+1);return[s,i].map(r=>{try{return decodeURIComponent(r.trim())}catch{return}})}).reduce((e,[n,s])=>(n&&s&&(e[n]=s),e),{})}const Tm=/^o(\d+)\./,Rm=/^(?:(\w+):)\/\/(?:(\w+)(?::(\w+)?)?@)([\w.-]+)(?::(\d+))?\/(.+)/;function km(t){return t==="http"||t==="https"}function Qs(t,e=!1){const{host:n,path:s,pass:i,port:r,projectId:o,protocol:a,publicKey:c}=t;return`${a}://${c}${e&&i?`:${i}`:""}@${n}${r?`:${r}`:""}/${s&&`${s}/`}${o}`}function Am(t){const e=Rm.exec(t);if(!e){zn(()=>{console.error(`Invalid Sentry Dsn: ${t}`)});return}const[n,s,i="",r="",o="",a=""]=e.slice(1);let c="",l=a;const u=l.split("/");if(u.length>1&&(c=u.slice(0,-1).join("/"),l=u.pop()),l){const d=l.match(/^\d+/);d&&(l=d[0])}return Yd({host:r,pass:i,path:c,projectId:l,port:o,protocol:n,publicKey:s})}function Yd(t){return{protocol:t.protocol,publicKey:t.publicKey||"",pass:t.pass||"",host:t.host,port:t.port||"",path:t.path||"",projectId:t.projectId}}function Nm(t){if(!C)return!0;const{port:e,projectId:n,protocol:s}=t;return["protocol","publicKey","host","projectId"].find(o=>t[o]?!1:(w.error(`Invalid Sentry Dsn: ${o} missing`),!0))?!1:n.match(/^\d+$/)?km(s)?e&&isNaN(parseInt(e,10))?(w.error(`Invalid Sentry Dsn: Invalid port ${e}`),!1):!0:(w.error(`Invalid Sentry Dsn: Invalid protocol ${s}`),!1):(w.error(`Invalid Sentry Dsn: Invalid projectId ${n}`),!1)}function Pm(t){return t.match(Tm)?.[1]}function Lm(t){const e=t.getOptions(),{host:n}=t.getDsn()||{};let s;return e.orgId?s=String(e.orgId):n&&(s=Pm(n)),s}function Om(t){const e=typeof t=="string"?Am(t):Yd(t);if(!(!e||!Nm(e)))return e}function Dm(t){if(typeof t=="boolean")return Number(t);const e=typeof t=="string"?parseFloat(t):t;if(!(typeof e!="number"||isNaN(e)||e<0||e>1))return e}const Kd=1;let Cl=!1;function Mm(t){const{spanId:e,traceId:n,isRemote:s}=t.spanContext(),i=s?e:Pa(t).parent_span_id,r=qd(t).scope,o=s?r?.getPropagationContext().propagationSpanId||jd():e;return{parent_span_id:i,span_id:o,trace_id:n}}function xm(t){if(t&&t.length>0)return t.map(({context:{spanId:e,traceId:n,traceFlags:s,...i},attributes:r})=>({span_id:e,trace_id:n,sampled:s===Kd,attributes:r,...i}))}function Il(t){return typeof t=="number"?Tl(t):Array.isArray(t)?t[0]+t[1]/1e9:t instanceof Date?Tl(t.getTime()):ot()}function Tl(t){return t>9999999999?t/1e3:t}function Pa(t){if(Um(t))return t.getSpanJSON();const{spanId:e,traceId:n}=t.spanContext();if(Fm(t)){const{attributes:s,startTime:i,name:r,endTime:o,status:a,links:c}=t,l="parentSpanId"in t?t.parentSpanId:"parentSpanContext"in t?t.parentSpanContext?.spanId:void 0;return{span_id:e,trace_id:n,data:s,description:r,parent_span_id:l,start_timestamp:Il(i),timestamp:Il(o)||void 0,status:Bm(a),op:s[gm],origin:s[mm],links:xm(c)}}return{span_id:e,trace_id:n,start_timestamp:0,data:{}}}function Fm(t){const e=t;return!!e.attributes&&!!e.startTime&&!!e.name&&!!e.endTime&&!!e.status}function Um(t){return typeof t.getSpanJSON=="function"}function $m(t){const{traceFlags:e}=t.spanContext();return e===Kd}function Bm(t){if(!(!t||t.code===_m))return t.code===ym?"ok":t.message||"internal_error"}const Hm="_sentryRootSpan";function Jd(t){return t[Hm]||t}function Rl(){Cl||(zn(()=>{console.warn("[Sentry] Returning null from `beforeSendSpan` is disallowed. To drop certain spans, configure the respective integrations directly or use `ignoreSpans`.")}),Cl=!0)}function Wm(t){if(typeof __SENTRY_TRACING__=="boolean"&&!__SENTRY_TRACING__)return!1;const e=_e()?.getOptions();return!!e&&(e.tracesSampleRate!=null||!!e.tracesSampler)}function kl(t){w.log(`Ignoring span ${t.op} - ${t.description} because it matches \`ignoreSpans\`.`)}function Al(t,e){if(!e?.length||!t.description)return!1;for(const n of e){if(jm(n)){if(Si(t.description,n))return C&&kl(t),!0;continue}if(!n.name&&!n.op)continue;const s=n.name?Si(t.description,n.name):!0,i=n.op?t.op&&Si(t.op,n.op):!0;if(s&&i)return C&&kl(t),!0}return!1}function Vm(t,e){const n=e.parent_span_id,s=e.span_id;if(n)for(const i of t)i.parent_span_id===s&&(i.parent_span_id=n)}function jm(t){return typeof t=="string"||t instanceof RegExp}const La="production",Gm="_frozenDsc";function Qd(t,e){const n=e.getOptions(),{publicKey:s}=e.getDsn()||{},i={environment:n.environment||La,release:n.release,public_key:s,trace_id:t,org_id:Lm(e)};return e.emit("createDsc",i),i}function zm(t,e){const n=e.getPropagationContext();return n.dsc||Qd(n.traceId,t)}function qm(t){const e=_e();if(!e)return{};const n=Jd(t),s=Pa(n),i=s.data,r=n.spanContext().traceState,o=r?.get("sentry.sample_rate")??i[fm]??i[pm];function a(p){return(typeof o=="number"||typeof o=="string")&&(p.sample_rate=`${o}`),p}const c=n[Gm];if(c)return a(c);const l=r?.get("sentry.dsc"),u=l&&Cm(l);if(u)return a(u);const d=Qd(t.spanContext().traceId,e),h=i[hm],f=s.description;return h!=="url"&&f&&(d.transaction=f),Wm()&&(d.sampled=String($m(n)),d.sample_rand=r?.get("sentry.sample_rand")??qd(n).scope?.getPropagationContext().sampleRand.toString()),a(d),e.emit("createDsc",d,n),d}function et(t,e=100,n=1/0){try{return Ao("",t,e,n)}catch(s){return{ERROR:`**non-serializable** (${s})`}}}function Xd(t,e=3,n=100*1024){const s=et(t,e);return Qm(s)>n?Xd(t,e-1,n):s}function Ao(t,e,n=1/0,s=1/0,i=Xm()){const[r,o]=i;if(e==null||["boolean","string"].includes(typeof e)||typeof e=="number"&&Number.isFinite(e))return e;const a=Ym(t,e);if(!a.startsWith("[object "))return a;if(e.__sentry_skip_normalization__)return e;const c=typeof e.__sentry_override_normalization_depth__=="number"?e.__sentry_override_normalization_depth__:n;if(c===0)return a.replace("object ","");if(r(e))return"[Circular ~]";const l=e;if(l&&typeof l.toJSON=="function")try{const f=l.toJSON();return Ao("",f,c-1,s,i)}catch{}const u=Array.isArray(e)?[]:{};let d=0;const h=Bd(e);for(const f in h){if(!Object.prototype.hasOwnProperty.call(h,f))continue;if(d>=s){u[f]="[MaxProperties ~]";break}const p=h[f];u[f]=Ao(f,p,c-1,s,i),d++}return o(e),u}function Ym(t,e){try{if(t==="domain"&&e&&typeof e=="object"&&e._events)return"[Domain]";if(t==="domainEmitter")return"[DomainEmitter]";if(typeof global<"u"&&e===global)return"[Global]";if(typeof window<"u"&&e===window)return"[Window]";if(typeof document<"u"&&e===document)return"[Document]";if(Fd(e))return Dd(e);if(Vg(e))return"[SyntheticEvent]";if(typeof e=="number"&&!Number.isFinite(e))return`[${e}]`;if(typeof e=="function")return`[Function: ${Lt(e)}]`;if(typeof e=="symbol")return`[${String(e)}]`;if(typeof e=="bigint")return`[BigInt: ${String(e)}]`;const n=Km(e);return/^HTML(\w*)Element$/.test(n)?`[HTMLElement: ${n}]`:`[object ${n}]`}catch(n){return`**non-serializable** (${n})`}}function Km(t){const e=Object.getPrototypeOf(t);return e?.constructor?e.constructor.name:"null prototype"}function Jm(t){return~-encodeURI(t).split(/%..|./).length}function Qm(t){return Jm(JSON.stringify(t))}function Xm(){const t=new WeakSet;function e(s){return t.has(s)?!0:(t.add(s),!1)}function n(s){t.delete(s)}return[e,n]}function Yn(t,e=[]){return[t,e]}function Zm(t,e){const[n,s]=t;return[n,[...s,e]]}function Nl(t,e){const n=t[1];for(const s of n){const i=s[0].type;if(e(s,i))return!0}return!1}function No(t){const e=Er(O);return e.encodePolyfill?e.encodePolyfill(t):new TextEncoder().encode(t)}function e_(t){const[e,n]=t;let s=JSON.stringify(e);function i(r){typeof s=="string"?s=typeof r=="string"?s+r:[No(s),r]:s.push(typeof r=="string"?No(r):r)}for(const r of n){const[o,a]=r;if(i(`
${JSON.stringify(o)}
`),typeof a=="string"||a instanceof Uint8Array)i(a);else{let c;try{c=JSON.stringify(a)}catch{c=JSON.stringify(et(a))}i(c)}}return typeof s=="string"?s:t_(s)}function t_(t){const e=t.reduce((i,r)=>i+r.length,0),n=new Uint8Array(e);let s=0;for(const i of t)n.set(i,s),s+=i.length;return n}function n_(t){const e=typeof t.data=="string"?No(t.data):t.data;return[{type:"attachment",length:e.length,filename:t.filename,content_type:t.contentType,attachment_type:t.attachmentType},e]}const s_={session:"session",sessions:"session",attachment:"attachment",transaction:"transaction",event:"error",client_report:"internal",user_report:"default",profile:"profile",profile_chunk:"profile",replay_event:"replay",replay_recording:"replay",check_in:"monitor",feedback:"feedback",span:"span",raw_security:"security",log:"log_item",metric:"metric",trace_metric:"metric"};function Pl(t){return s_[t]}function Zd(t){if(!t?.sdk)return;const{name:e,version:n}=t.sdk;return{name:e,version:n}}function i_(t,e,n,s){const i=t.sdkProcessingMetadata?.dynamicSamplingContext;return{event_id:t.event_id,sent_at:new Date().toISOString(),...e&&{sdk:e},...!!n&&s&&{dsn:Qs(s)},...i&&{trace:i}}}function r_(t,e){if(!e)return t;const n=t.sdk||{};return t.sdk={...n,name:n.name||e.name,version:n.version||e.version,integrations:[...t.sdk?.integrations||[],...e.integrations||[]],packages:[...t.sdk?.packages||[],...e.packages||[]],settings:t.sdk?.settings||e.settings?{...t.sdk?.settings,...e.settings}:void 0},t}function o_(t,e,n,s){const i=Zd(n),r={sent_at:new Date().toISOString(),...i&&{sdk:i},...!!s&&e&&{dsn:Qs(e)}},o="aggregates"in t?[{type:"sessions"},t]:[{type:"session"},t.toJSON()];return Yn(r,[o])}function a_(t,e,n,s){const i=Zd(n),r=t.type&&t.type!=="replay_event"?t.type:"event";r_(t,n?.sdk);const o=i_(t,i,s,e);return delete t.sdkProcessingMetadata,Yn(o,[[{type:r},t]])}const to=0,Ll=1,Ol=2;function Sr(t){return new Ls(e=>{e(t)})}function Oa(t){return new Ls((e,n)=>{n(t)})}class Ls{constructor(e){this._state=to,this._handlers=[],this._runExecutor(e)}then(e,n){return new Ls((s,i)=>{this._handlers.push([!1,r=>{if(!e)s(r);else try{s(e(r))}catch(o){i(o)}},r=>{if(!n)i(r);else try{s(n(r))}catch(o){i(o)}}]),this._executeHandlers()})}catch(e){return this.then(n=>n,e)}finally(e){return new Ls((n,s)=>{let i,r;return this.then(o=>{r=!1,i=o,e&&e()},o=>{r=!0,i=o,e&&e()}).then(()=>{if(r){s(i);return}n(i)})})}_executeHandlers(){if(this._state===to)return;const e=this._handlers.slice();this._handlers=[],e.forEach(n=>{n[0]||(this._state===Ll&&n[1](this._value),this._state===Ol&&n[2](this._value),n[0]=!0)})}_runExecutor(e){const n=(r,o)=>{if(this._state===to){if(qs(o)){o.then(s,i);return}this._state=r,this._value=o,this._executeHandlers()}},s=r=>{n(Ll,r)},i=r=>{n(Ol,r)};try{e(s,i)}catch(r){i(r)}}}function c_(t,e,n,s=0){try{const i=Po(e,n,t,s);return qs(i)?i:Sr(i)}catch(i){return Oa(i)}}function Po(t,e,n,s){const i=n[s];if(!t||!i)return t;const r=i({...t},e);return C&&r===null&&w.log(`Event processor "${i.id||"?"}" dropped event`),qs(r)?r.then(o=>Po(o,e,n,s+1)):Po(r,e,n,s+1)}function l_(t,e){const{fingerprint:n,span:s,breadcrumbs:i,sdkProcessingMetadata:r}=e;u_(t,e),s&&f_(t,s),p_(t,n),d_(t,i),h_(t,r)}function Dl(t,e){const{extra:n,tags:s,user:i,contexts:r,level:o,sdkProcessingMetadata:a,breadcrumbs:c,fingerprint:l,eventProcessors:u,attachments:d,propagationContext:h,transactionName:f,span:p}=e;fi(t,"extra",n),fi(t,"tags",s),fi(t,"user",i),fi(t,"contexts",r),t.sdkProcessingMetadata=Ks(t.sdkProcessingMetadata,a,2),o&&(t.level=o),f&&(t.transactionName=f),p&&(t.span=p),c.length&&(t.breadcrumbs=[...t.breadcrumbs,...c]),l.length&&(t.fingerprint=[...t.fingerprint,...l]),u.length&&(t.eventProcessors=[...t.eventProcessors,...u]),d.length&&(t.attachments=[...t.attachments,...d]),t.propagationContext={...t.propagationContext,...h}}function fi(t,e,n){t[e]=Ks(t[e],n,1)}function u_(t,e){const{extra:n,tags:s,user:i,contexts:r,level:o,transactionName:a}=e;Object.keys(n).length&&(t.extra={...n,...t.extra}),Object.keys(s).length&&(t.tags={...s,...t.tags}),Object.keys(i).length&&(t.user={...i,...t.user}),Object.keys(r).length&&(t.contexts={...r,...t.contexts}),o&&(t.level=o),a&&t.type!=="transaction"&&(t.transaction=a)}function d_(t,e){const n=[...t.breadcrumbs||[],...e];t.breadcrumbs=n.length?n:void 0}function h_(t,e){t.sdkProcessingMetadata={...t.sdkProcessingMetadata,...e}}function f_(t,e){t.contexts={trace:Mm(e),...t.contexts},t.sdkProcessingMetadata={dynamicSamplingContext:qm(e),...t.sdkProcessingMetadata};const n=Jd(e),s=Pa(n).description;s&&!t.transaction&&t.type==="transaction"&&(t.transaction=s)}function p_(t,e){t.fingerprint=t.fingerprint?Array.isArray(t.fingerprint)?t.fingerprint:[t.fingerprint]:[],e&&(t.fingerprint=t.fingerprint.concat(e)),t.fingerprint.length||delete t.fingerprint}let Bt,Ml,xl,pt;function g_(t){const e=O._sentryDebugIds,n=O._debugIds;if(!e&&!n)return{};const s=e?Object.keys(e):[],i=n?Object.keys(n):[];if(pt&&s.length===Ml&&i.length===xl)return pt;Ml=s.length,xl=i.length,pt={},Bt||(Bt={});const r=(o,a)=>{for(const c of o){const l=a[c],u=Bt?.[c];if(u&&pt&&l)pt[u[0]]=l,Bt&&(Bt[c]=[u[0],l]);else if(l){const d=t(c);for(let h=d.length-1;h>=0;h--){const p=d[h]?.filename;if(p&&pt&&Bt){pt[p]=l,Bt[c]=[p,l];break}}}}};return e&&r(s,e),n&&r(i,n),pt}function m_(t,e,n,s,i,r){const{normalizeDepth:o=3,normalizeMaxBreadth:a=1e3}=t,c={...e,event_id:e.event_id||n.event_id||Re(),timestamp:e.timestamp||Ys()},l=n.integrations||t.integrations.map(m=>m.name);__(c,t),v_(c,l),i&&i.emit("applyFrameMetadata",e),e.type===void 0&&y_(c,t.stackParser);const u=b_(s,n.captureContext);n.mechanism&&An(c,n.mechanism);const d=i?i.getEventProcessors():[],h=lm().getScopeData();if(r){const m=r.getScopeData();Dl(h,m)}if(u){const m=u.getScopeData();Dl(h,m)}const f=[...n.attachments||[],...h.attachments];f.length&&(n.attachments=f),l_(c,h);const p=[...d,...h.eventProcessors];return c_(p,c,n).then(m=>(m&&E_(m),typeof o=="number"&&o>0?w_(m,o,a):m))}function __(t,e){const{environment:n,release:s,dist:i,maxValueLength:r}=e;t.environment=t.environment||n||La,!t.release&&s&&(t.release=s),!t.dist&&i&&(t.dist=i);const o=t.request;o?.url&&(o.url=r?Hd(o.url,r):o.url)}function y_(t,e){const n=g_(e);t.exception?.values?.forEach(s=>{s.stacktrace?.frames?.forEach(i=>{i.filename&&(i.debug_id=n[i.filename])})})}function E_(t){const e={};if(t.exception?.values?.forEach(s=>{s.stacktrace?.frames?.forEach(i=>{i.debug_id&&(i.abs_path?e[i.abs_path]=i.debug_id:i.filename&&(e[i.filename]=i.debug_id),delete i.debug_id)})}),Object.keys(e).length===0)return;t.debug_meta=t.debug_meta||{},t.debug_meta.images=t.debug_meta.images||[];const n=t.debug_meta.images;Object.entries(e).forEach(([s,i])=>{n.push({type:"sourcemap",code_file:s,debug_id:i})})}function v_(t,e){e.length>0&&(t.sdk=t.sdk||{},t.sdk.integrations=[...t.sdk.integrations||[],...e])}function w_(t,e,n){if(!t)return null;const s={...t,...t.breadcrumbs&&{breadcrumbs:t.breadcrumbs.map(i=>({...i,...i.data&&{data:et(i.data,e,n)}}))},...t.user&&{user:et(t.user,e,n)},...t.contexts&&{contexts:et(t.contexts,e,n)},...t.extra&&{extra:et(t.extra,e,n)}};return t.contexts?.trace&&s.contexts&&(s.contexts.trace=t.contexts.trace,t.contexts.trace.data&&(s.contexts.trace.data=et(t.contexts.trace.data,e,n))),t.spans&&(s.spans=t.spans.map(i=>({...i,...i.data&&{data:et(i.data,e,n)}}))),t.contexts?.flags&&s.contexts&&(s.contexts.flags=et(t.contexts.flags,3,n)),s}function b_(t,e){if(!e)return t;const n=t?t.clone():new ct;return n.update(e),n}function S_(t,e){return Ft().captureException(t,void 0)}function eh(t,e){return Ft().captureEvent(t,e)}function Fl(t){const e=Js(),n=Ft(),{userAgent:s}=O.navigator||{},i=Zg({user:n.getUser()||e.getUser(),...s&&{userAgent:s},...t}),r=e.getSession();return r?.status==="ok"&&Nn(r,{status:"exited"}),th(),e.setSession(i),i}function th(){const t=Js(),n=Ft().getSession()||t.getSession();n&&em(n),nh(),t.setSession()}function nh(){const t=Js(),e=_e(),n=t.getSession();n&&e&&e.captureSession(n)}function Ul(t=!1){if(t){th();return}nh()}const C_="7";function I_(t){const e=t.protocol?`${t.protocol}:`:"",n=t.port?`:${t.port}`:"";return`${e}//${t.host}${n}${t.path?`/${t.path}`:""}/api/`}function T_(t){return`${I_(t)}${t.projectId}/envelope/`}function R_(t,e){const n={sentry_version:C_};return t.publicKey&&(n.sentry_key=t.publicKey),e&&(n.sentry_client=`${e.name}/${e.version}`),new URLSearchParams(n).toString()}function k_(t,e,n){return e||`${T_(t)}?${R_(t,n)}`}const $l=[];function A_(t){const e={};return t.forEach(n=>{const{name:s}=n,i=e[s];i&&!i.isDefaultInstance&&n.isDefaultInstance||(e[s]=n)}),Object.values(e)}function N_(t){const e=t.defaultIntegrations||[],n=t.integrations;e.forEach(i=>{i.isDefaultInstance=!0});let s;if(Array.isArray(n))s=[...e,...n];else if(typeof n=="function"){const i=n(e);s=Array.isArray(i)?i:[i]}else s=e;return A_(s)}function P_(t,e){const n={};return e.forEach(s=>{s&&sh(t,s,n)}),n}function Bl(t,e){for(const n of e)n?.afterAllSetup&&n.afterAllSetup(t)}function sh(t,e,n){if(n[e.name]){C&&w.log(`Integration skipped because it was already installed: ${e.name}`);return}if(n[e.name]=e,!$l.includes(e.name)&&typeof e.setupOnce=="function"&&(e.setupOnce(),$l.push(e.name)),e.setup&&typeof e.setup=="function"&&e.setup(t),typeof e.preprocessEvent=="function"){const s=e.preprocessEvent.bind(e);t.on("preprocessEvent",(i,r)=>s(i,r,t))}if(typeof e.processEvent=="function"){const s=e.processEvent.bind(e),i=Object.assign((r,o)=>s(r,o,t),{id:e.name});t.addEventProcessor(i)}C&&w.log(`Integration installed: ${e.name}`)}function L_(t){return[{type:"log",item_count:t.length,content_type:"application/vnd.sentry.items.log+json"},{items:t}]}function O_(t,e,n,s){const i={};return e?.sdk&&(i.sdk={name:e.sdk.name,version:e.sdk.version}),n&&s&&(i.dsn=Qs(s)),Yn(i,[L_(t)])}function ih(t,e){const n=e??D_(t)??[];if(n.length===0)return;const s=t.getOptions(),i=O_(n,s._metadata,s.tunnel,t.getDsn());rh().set(t,[]),t.emit("flushLogs"),t.sendEnvelope(i)}function D_(t){return rh().get(t)}function rh(){return Gn("clientToLogBufferMap",()=>new WeakMap)}function M_(t){return[{type:"trace_metric",item_count:t.length,content_type:"application/vnd.sentry.items.trace-metric+json"},{items:t}]}function x_(t,e,n,s){const i={};return e?.sdk&&(i.sdk={name:e.sdk.name,version:e.sdk.version}),n&&s&&(i.dsn=Qs(s)),Yn(i,[M_(t)])}function oh(t,e){const n=e??F_(t)??[];if(n.length===0)return;const s=t.getOptions(),i=x_(n,s._metadata,s.tunnel,t.getDsn());ah().set(t,[]),t.emit("flushMetrics"),t.sendEnvelope(i)}function F_(t){return ah().get(t)}function ah(){return Gn("clientToMetricBufferMap",()=>new WeakMap)}function U_(t,e,n){const s=[{type:"client_report"},{timestamp:Ys(),discarded_events:t}];return Yn(e?{dsn:e}:{},[s])}function ch(t){const e=[];t.message&&e.push(t.message);try{const n=t.exception.values[t.exception.values.length-1];n?.value&&(e.push(n.value),n.type&&e.push(`${n.type}: ${n.value}`))}catch{}return e}function $_(t){const{trace_id:e,parent_span_id:n,span_id:s,status:i,origin:r,data:o,op:a}=t.contexts?.trace??{};return{data:o??{},description:t.transaction,op:a,parent_span_id:n,span_id:s??"",start_timestamp:t.start_timestamp??0,status:i,timestamp:t.timestamp,trace_id:e??"",origin:r,profile_id:o?.[Gd],exclusive_time:o?.[zd],measurements:t.measurements,is_segment:!0}}function B_(t){return{type:"transaction",timestamp:t.timestamp,start_timestamp:t.start_timestamp,transaction:t.description,contexts:{trace:{trace_id:t.trace_id,span_id:t.span_id,parent_span_id:t.parent_span_id,op:t.op,status:t.status,origin:t.origin,data:{...t.data,...t.profile_id&&{[Gd]:t.profile_id},...t.exclusive_time&&{[zd]:t.exclusive_time}}}},measurements:t.measurements}}const Hl="Not capturing exception because it's already been captured.",Wl="Discarded session because of missing or non-string release",lh=Symbol.for("SentryInternalError"),uh=Symbol.for("SentryDoNotSendEventError"),H_=5e3;function Ci(t){return{message:t,[lh]:!0}}function no(t){return{message:t,[uh]:!0}}function Vl(t){return!!t&&typeof t=="object"&&lh in t}function jl(t){return!!t&&typeof t=="object"&&uh in t}function Gl(t,e,n,s,i){let r=0,o,a=!1;t.on(n,()=>{r=0,clearTimeout(o),a=!1}),t.on(e,c=>{r+=s(c),r>=8e5?i(t):a||(a=!0,o=setTimeout(()=>{i(t)},H_))}),t.on("flush",()=>{i(t)})}class W_{constructor(e){if(this._options=e,this._integrations={},this._numProcessing=0,this._outcomes={},this._hooks={},this._eventProcessors=[],e.dsn?this._dsn=Om(e.dsn):C&&w.warn("No DSN provided, client will not send events."),this._dsn){const s=k_(this._dsn,e.tunnel,e._metadata?e._metadata.sdk:void 0);this._transport=e.transport({tunnel:this._options.tunnel,recordDroppedEvent:this.recordDroppedEvent.bind(this),...e.transportOptions,url:s})}this._options.enableLogs&&Gl(this,"afterCaptureLog","flushLogs",z_,ih),(this._options.enableMetrics??this._options._experiments?.enableMetrics??!0)&&Gl(this,"afterCaptureMetric","flushMetrics",G_,oh)}captureException(e,n,s){const i=Re();if(_l(e))return C&&w.log(Hl),i;const r={event_id:i,...n};return this._process(this.eventFromException(e,r).then(o=>this._captureEvent(o,r,s))),r.event_id}captureMessage(e,n,s,i){const r={event_id:Re(),...s},o=Ta(e)?e:String(e),a=vr(e)?this.eventFromMessage(o,n,r):this.eventFromException(e,r);return this._process(a.then(c=>this._captureEvent(c,r,i))),r.event_id}captureEvent(e,n,s){const i=Re();if(n?.originalException&&_l(n.originalException))return C&&w.log(Hl),i;const r={event_id:i,...n},o=e.sdkProcessingMetadata||{},a=o.capturedSpanScope,c=o.capturedSpanIsolationScope;return this._process(this._captureEvent(e,r,a||s,c)),r.event_id}captureSession(e){this.sendSession(e),Nn(e,{init:!1})}getDsn(){return this._dsn}getOptions(){return this._options}getSdkMetadata(){return this._options._metadata}getTransport(){return this._transport}async flush(e){const n=this._transport;if(!n)return!0;this.emit("flush");const s=await this._isClientDoneProcessing(e),i=await n.flush(e);return s&&i}async close(e){const n=await this.flush(e);return this.getOptions().enabled=!1,this.emit("close"),n}getEventProcessors(){return this._eventProcessors}addEventProcessor(e){this._eventProcessors.push(e)}init(){(this._isEnabled()||this._options.integrations.some(({name:e})=>e.startsWith("Spotlight")))&&this._setupIntegrations()}getIntegrationByName(e){return this._integrations[e]}addIntegration(e){const n=this._integrations[e.name];sh(this,e,this._integrations),n||Bl(this,[e])}sendEvent(e,n={}){this.emit("beforeSendEvent",e,n);let s=a_(e,this._dsn,this._options._metadata,this._options.tunnel);for(const i of n.attachments||[])s=Zm(s,n_(i));this.sendEnvelope(s).then(i=>this.emit("afterSendEvent",e,i))}sendSession(e){const{release:n,environment:s=La}=this._options;if("aggregates"in e){const r=e.attrs||{};if(!r.release&&!n){C&&w.warn(Wl);return}r.release=r.release||n,r.environment=r.environment||s,e.attrs=r}else{if(!e.release&&!n){C&&w.warn(Wl);return}e.release=e.release||n,e.environment=e.environment||s}this.emit("beforeSendSession",e);const i=o_(e,this._dsn,this._options._metadata,this._options.tunnel);this.sendEnvelope(i)}recordDroppedEvent(e,n,s=1){if(this._options.sendClientReports){const i=`${e}:${n}`;C&&w.log(`Recording outcome: "${i}"${s>1?` (${s} times)`:""}`),this._outcomes[i]=(this._outcomes[i]||0)+s}}on(e,n){const s=this._hooks[e]=this._hooks[e]||new Set,i=(...r)=>n(...r);return s.add(i),()=>{s.delete(i)}}emit(e,...n){const s=this._hooks[e];s&&s.forEach(i=>i(...n))}async sendEnvelope(e){if(this.emit("beforeEnvelope",e),this._isEnabled()&&this._transport)try{return await this._transport.send(e)}catch(n){return C&&w.error("Error while sending envelope:",n),{}}return C&&w.error("Transport disabled"),{}}_setupIntegrations(){const{integrations:e}=this._options;this._integrations=P_(this,e),Bl(this,e)}_updateSessionFromEvent(e,n){let s=n.level==="fatal",i=!1;const r=n.exception?.values;if(r){i=!0,s=!1;for(const c of r)if(c.mechanism?.handled===!1){s=!0;break}}const o=e.status==="ok";(o&&e.errors===0||o&&s)&&(Nn(e,{...s&&{status:"crashed"},errors:e.errors||Number(i||s)}),this.captureSession(e))}async _isClientDoneProcessing(e){let n=0;for(;!e||n<e;){if(await new Promise(s=>setTimeout(s,1)),!this._numProcessing)return!0;n++}return!1}_isEnabled(){return this.getOptions().enabled!==!1&&this._transport!==void 0}_prepareEvent(e,n,s,i){const r=this.getOptions(),o=Object.keys(this._integrations);return!n.integrations&&o?.length&&(n.integrations=o),this.emit("preprocessEvent",e,n),e.type||i.setLastEventId(e.event_id||n.event_id),m_(r,e,n,s,this,i).then(a=>{if(a===null)return a;this.emit("postprocessEvent",a,n),a.contexts={trace:dm(s),...a.contexts};const c=zm(this,s);return a.sdkProcessingMetadata={dynamicSamplingContext:c,...a.sdkProcessingMetadata},a})}_captureEvent(e,n={},s=Ft(),i=Js()){return C&&Lo(e)&&w.log(`Captured error event \`${ch(e)[0]||"<unknown>"}\``),this._processEvent(e,n,s,i).then(r=>r.event_id,r=>{C&&(jl(r)?w.log(r.message):Vl(r)?w.warn(r.message):w.warn(r))})}_processEvent(e,n,s,i){const r=this.getOptions(),{sampleRate:o}=r,a=dh(e),c=Lo(e),l=e.type||"error",u=`before send for type \`${l}\``,d=typeof o>"u"?void 0:Dm(o);if(c&&typeof d=="number"&&Math.random()>d)return this.recordDroppedEvent("sample_rate","error"),Oa(no(`Discarding event because it's not included in the random sample (sampling rate = ${o})`));const h=l==="replay_event"?"replay":l;return this._prepareEvent(e,n,s,i).then(f=>{if(f===null)throw this.recordDroppedEvent("event_processor",h),no("An event processor returned `null`, will not send event.");if(n.data&&n.data.__sentry__===!0)return f;const E=j_(this,r,f,n);return V_(E,u)}).then(f=>{if(f===null){if(this.recordDroppedEvent("before_send",h),a){const A=1+(e.spans||[]).length;this.recordDroppedEvent("before_send","span",A)}throw no(`${u} returned \`null\`, will not send event.`)}const p=s.getSession()||i.getSession();if(c&&p&&this._updateSessionFromEvent(p,f),a){const m=f.sdkProcessingMetadata?.spanCountBeforeProcessing||0,A=f.spans?f.spans.length:0,N=m-A;N>0&&this.recordDroppedEvent("before_send","span",N)}const E=f.transaction_info;if(a&&E&&f.transaction!==e.transaction){const m="custom";f.transaction_info={...E,source:m}}return this.sendEvent(f,n),f}).then(null,f=>{throw jl(f)||Vl(f)?f:(this.captureException(f,{mechanism:{handled:!1,type:"internal"},data:{__sentry__:!0},originalException:f}),Ci(`Event processing pipeline threw an error, original event will not be sent. Details have been sent as a new event.
Reason: ${f}`))})}_process(e){this._numProcessing++,e.then(n=>(this._numProcessing--,n),n=>(this._numProcessing--,n))}_clearOutcomes(){const e=this._outcomes;return this._outcomes={},Object.entries(e).map(([n,s])=>{const[i,r]=n.split(":");return{reason:i,category:r,quantity:s}})}_flushOutcomes(){C&&w.log("Flushing outcomes...");const e=this._clearOutcomes();if(e.length===0){C&&w.log("No outcomes to send");return}if(!this._dsn){C&&w.log("No dsn provided, will not send outcomes");return}C&&w.log("Sending outcomes:",e);const n=U_(e,this._options.tunnel&&Qs(this._dsn));this.sendEnvelope(n)}}function V_(t,e){const n=`${e} must return \`null\` or a valid event.`;if(qs(t))return t.then(s=>{if(!Ps(s)&&s!==null)throw Ci(n);return s},s=>{throw Ci(`${e} rejected with ${s}`)});if(!Ps(t)&&t!==null)throw Ci(n);return t}function j_(t,e,n,s){const{beforeSend:i,beforeSendTransaction:r,beforeSendSpan:o,ignoreSpans:a}=e;let c=n;if(Lo(c)&&i)return i(c,s);if(dh(c)){if(o||a){const l=$_(c);if(a?.length&&Al(l,a))return null;if(o){const u=o(l);u?c=Ks(n,B_(u)):Rl()}if(c.spans){const u=[],d=c.spans;for(const f of d){if(a?.length&&Al(f,a)){Vm(d,f);continue}if(o){const p=o(f);p?u.push(p):(Rl(),u.push(f))}else u.push(f)}const h=c.spans.length-u.length;h&&t.recordDroppedEvent("before_send","span",h),c.spans=u}}if(r){if(c.spans){const l=c.spans.length;c.sdkProcessingMetadata={...n.sdkProcessingMetadata,spanCountBeforeProcessing:l}}return r(c,s)}}return c}function Lo(t){return t.type===void 0}function dh(t){return t.type==="transaction"}function G_(t){let e=0;return t.name&&(e+=t.name.length*2),e+=8,e+hh(t.attributes)}function z_(t){let e=0;return t.message&&(e+=t.message.length*2),e+hh(t.attributes)}function hh(t){if(!t)return 0;let e=0;return Object.values(t).forEach(n=>{Array.isArray(n)?e+=n.length*zl(n[0]):vr(n)?e+=zl(n):e+=100}),e}function zl(t){return typeof t=="string"?t.length*2:typeof t=="number"?8:typeof t=="boolean"?4:0}function q_(t,e){e.debug===!0&&(C?w.enable():zn(()=>{console.warn("[Sentry] Cannot initialize SDK with `debug` option using a non-debug bundle.")})),Ft().update(e.initialScope);const s=new t(e);return Y_(s),s.init(),s}function Y_(t){Ft().setClient(t)}const fh=Symbol.for("SentryBufferFullError");function ph(t=100){const e=new Set;function n(){return e.size<t}function s(o){e.delete(o)}function i(o){if(!n())return Oa(fh);const a=o();return e.add(a),a.then(()=>s(a),()=>s(a)),a}function r(o){if(!e.size)return Sr(!0);const a=Promise.allSettled(Array.from(e)).then(()=>!0);if(!o)return a;const c=[a,new Promise(l=>setTimeout(()=>l(!1),o))];return Promise.race(c)}return{get $(){return Array.from(e)},add:i,drain:r}}const K_=60*1e3;function J_(t,e=Date.now()){const n=parseInt(`${t}`,10);if(!isNaN(n))return n*1e3;const s=Date.parse(`${t}`);return isNaN(s)?K_:s-e}function Q_(t,e){return t[e]||t.all||0}function X_(t,e,n=Date.now()){return Q_(t,e)>n}function Z_(t,{statusCode:e,headers:n},s=Date.now()){const i={...t},r=n?.["x-sentry-rate-limits"],o=n?.["retry-after"];if(r)for(const a of r.trim().split(",")){const[c,l,,,u]=a.split(":",5),d=parseInt(c,10),h=(isNaN(d)?60:d)*1e3;if(!l)i.all=s+h;else for(const f of l.split(";"))f==="metric_bucket"?(!u||u.split(";").includes("custom"))&&(i[f]=s+h):i[f]=s+h}else o?i.all=s+J_(o,s):e===429&&(i.all=s+60*1e3);return i}const ey=64;function ty(t,e,n=ph(t.bufferSize||ey)){let s={};const i=o=>n.drain(o);function r(o){const a=[];if(Nl(o,(d,h)=>{const f=Pl(h);X_(s,f)?t.recordDroppedEvent("ratelimit_backoff",f):a.push(d)}),a.length===0)return Promise.resolve({});const c=Yn(o[0],a),l=d=>{Nl(c,(h,f)=>{t.recordDroppedEvent(d,Pl(f))})},u=()=>e({body:e_(c)}).then(d=>(d.statusCode!==void 0&&(d.statusCode<200||d.statusCode>=300)&&C&&w.warn(`Sentry responded with status code ${d.statusCode} to sent event.`),s=Z_(s,d),d),d=>{throw l("network_error"),C&&w.error("Encountered error running transport request:",d),d});return n.add(u).then(d=>d,d=>{if(d===fh)return C&&w.error("Skipped sending event because buffer is full."),l("queue_overflow"),Promise.resolve({});throw d})}return{send:r,flush:i}}function so(t){if(!t)return{};const e=t.match(/^(([^:/?#]+):)?(\/\/([^/?#]*))?([^?#]*)(\?([^#]*))?(#(.*))?$/);if(!e)return{};const n=e[6]||"",s=e[8]||"";return{host:e[4],path:e[5],protocol:e[2],search:n,hash:s,relative:e[5]+n+s}}function ny(t){"aggregates"in t?t.attrs?.ip_address===void 0&&(t.attrs={...t.attrs,ip_address:"{{auto}}"}):t.ipAddress===void 0&&(t.ipAddress="{{auto}}")}function sy(t,e,n=[e],s="npm"){const i=t._metadata||{};i.sdk||(i.sdk={name:`sentry.javascript.${e}`,packages:n.map(r=>({name:`${s}:@sentry/${r}`,version:Xt})),version:Xt}),t._metadata=i}const iy=100;function sn(t,e){const n=_e(),s=Js();if(!n)return;const{beforeBreadcrumb:i=null,maxBreadcrumbs:r=iy}=n.getOptions();if(r<=0)return;const a={timestamp:Ys(),...t},c=i?zn(()=>i(a,e)):a;c!==null&&(n.emit&&n.emit("beforeAddBreadcrumb",c,e),s.addBreadcrumb(c,r))}let ql;const ry="FunctionToString",Yl=new WeakMap,oy=(()=>({name:ry,setupOnce(){ql=Function.prototype.toString;try{Function.prototype.toString=function(...t){const e=Aa(this),n=Yl.has(_e())&&e!==void 0?e:this;return ql.apply(n,t)}}catch{}},setup(t){Yl.set(t,!0)}})),ay=oy,cy=[/^Script error\.?$/,/^Javascript error: Script error\.? on line 0$/,/^ResizeObserver loop completed with undelivered notifications.$/,/^Cannot redefine property: googletag$/,/^Can't find variable: gmo$/,/^undefined is not an object \(evaluating 'a\.[A-Z]'\)$/,`can't redefine non-configurable property "solana"`,"vv().getRestrictions is not a function. (In 'vv().getRestrictions(1,a)', 'vv().getRestrictions' is undefined)","Can't find variable: _AutofillCallbackHandler",/^Non-Error promise rejection captured with value: Object Not Found Matching Id:\d+, MethodName:simulateEvent, ParamCount:\d+$/,/^Java exception was raised during method invocation$/],ly="EventFilters",uy=(t={})=>{let e;return{name:ly,setup(n){const s=n.getOptions();e=Kl(t,s)},processEvent(n,s,i){if(!e){const r=i.getOptions();e=Kl(t,r)}return hy(n,e)?null:n}}},dy=((t={})=>({...uy(t),name:"InboundFilters"}));function Kl(t={},e={}){return{allowUrls:[...t.allowUrls||[],...e.allowUrls||[]],denyUrls:[...t.denyUrls||[],...e.denyUrls||[]],ignoreErrors:[...t.ignoreErrors||[],...e.ignoreErrors||[],...t.disableErrorDefaults?[]:cy],ignoreTransactions:[...t.ignoreTransactions||[],...e.ignoreTransactions||[]]}}function hy(t,e){if(t.type){if(t.type==="transaction"&&py(t,e.ignoreTransactions))return C&&w.warn(`Event dropped due to being matched by \`ignoreTransactions\` option.
Event: ${Yt(t)}`),!0}else{if(fy(t,e.ignoreErrors))return C&&w.warn(`Event dropped due to being matched by \`ignoreErrors\` option.
Event: ${Yt(t)}`),!0;if(yy(t))return C&&w.warn(`Event dropped due to not having an error message, error type or stacktrace.
Event: ${Yt(t)}`),!0;if(gy(t,e.denyUrls))return C&&w.warn(`Event dropped due to being matched by \`denyUrls\` option.
Event: ${Yt(t)}.
Url: ${$i(t)}`),!0;if(!my(t,e.allowUrls))return C&&w.warn(`Event dropped due to not being matched by \`allowUrls\` option.
Event: ${Yt(t)}.
Url: ${$i(t)}`),!0}return!1}function fy(t,e){return e?.length?ch(t).some(n=>br(n,e)):!1}function py(t,e){if(!e?.length)return!1;const n=t.transaction;return n?br(n,e):!1}function gy(t,e){if(!e?.length)return!1;const n=$i(t);return n?br(n,e):!1}function my(t,e){if(!e?.length)return!0;const n=$i(t);return n?br(n,e):!0}function _y(t=[]){for(let e=t.length-1;e>=0;e--){const n=t[e];if(n&&n.filename!=="<anonymous>"&&n.filename!=="[native code]")return n.filename||null}return null}function $i(t){try{const n=[...t.exception?.values??[]].reverse().find(s=>s.mechanism?.parent_id===void 0&&s.stacktrace?.frames?.length)?.stacktrace?.frames;return n?_y(n):null}catch{return C&&w.error(`Cannot extract url for event ${Yt(t)}`),null}}function yy(t){return t.exception?.values?.length?!t.message&&!t.exception.values.some(e=>e.stacktrace||e.type&&e.type!=="Error"||e.value):!1}function Ey(t,e,n,s,i,r){if(!i.exception?.values||!r||!Ot(r.originalException,Error))return;const o=i.exception.values.length>0?i.exception.values[i.exception.values.length-1]:void 0;o&&(i.exception.values=Oo(t,e,s,r.originalException,n,i.exception.values,o,0))}function Oo(t,e,n,s,i,r,o,a){if(r.length>=n+1)return r;let c=[...r];if(Ot(s[i],Error)){Jl(o,a);const l=t(e,s[i]),u=c.length;Ql(l,i,u,a),c=Oo(t,e,n,s[i],i,[l,...c],l,u)}return Array.isArray(s.errors)&&s.errors.forEach((l,u)=>{if(Ot(l,Error)){Jl(o,a);const d=t(e,l),h=c.length;Ql(d,`errors[${u}]`,h,a),c=Oo(t,e,n,l,i,[d,...c],d,h)}}),c}function Jl(t,e){t.mechanism={handled:!0,type:"auto.core.linked_errors",...t.mechanism,...t.type==="AggregateError"&&{is_exception_group:!0},exception_id:e}}function Ql(t,e,n,s){t.mechanism={handled:!0,...t.mechanism,type:"chained",source:e,exception_id:n,parent_id:s}}function vy(t){const e="console";dn(e,t),hn(e,wy)}function wy(){"console"in O&&Rg.forEach(function(t){t in O.console&&Se(O.console,t,function(e){return Ui[t]=e,function(...n){$e("console",{args:n,level:t}),Ui[t]?.apply(O.console,n)}})})}function by(t){return t==="warn"?"warning":["fatal","error","warning","log","info","debug"].includes(t)?t:"log"}const Sy="Dedupe",Cy=(()=>{let t;return{name:Sy,processEvent(e){if(e.type)return e;try{if(Ty(e,t))return C&&w.warn("Event dropped due to being a duplicate of previously captured event."),null}catch{}return t=e}}}),Iy=Cy;function Ty(t,e){return e?!!(Ry(t,e)||ky(t,e)):!1}function Ry(t,e){const n=t.message,s=e.message;return!(!n&&!s||n&&!s||!n&&s||n!==s||!mh(t,e)||!gh(t,e))}function ky(t,e){const n=Xl(e),s=Xl(t);return!(!n||!s||n.type!==s.type||n.value!==s.value||!mh(t,e)||!gh(t,e))}function gh(t,e){let n=dl(t),s=dl(e);if(!n&&!s)return!0;if(n&&!s||!n&&s||(n=n,s=s,s.length!==n.length))return!1;for(let i=0;i<s.length;i++){const r=s[i],o=n[i];if(r.filename!==o.filename||r.lineno!==o.lineno||r.colno!==o.colno||r.function!==o.function)return!1}return!0}function mh(t,e){let n=t.fingerprint,s=e.fingerprint;if(!n&&!s)return!0;if(n&&!s||!n&&s)return!1;n=n,s=s;try{return n.join("")===s.join("")}catch{return!1}}function Xl(t){return t.exception?.values?.[0]}function _h(t){if(t!==void 0)return t>=400&&t<500?"warning":t>=500?"error":void 0}const Os=O;function Ay(){return"history"in Os&&!!Os.history}function Ny(){if(!("fetch"in Os))return!1;try{return new Headers,new Request("data:,"),new Response,!0}catch{return!1}}function Do(t){return t&&/^function\s+\w+\(\)\s+\{\s+\[native code\]\s+\}$/.test(t.toString())}function Py(){if(typeof EdgeRuntime=="string")return!0;if(!Ny())return!1;if(Do(Os.fetch))return!0;let t=!1;const e=Os.document;if(e&&typeof e.createElement=="function")try{const n=e.createElement("iframe");n.hidden=!0,e.head.appendChild(n),n.contentWindow?.fetch&&(t=Do(n.contentWindow.fetch)),e.head.removeChild(n)}catch(n){C&&w.warn("Could not create sandbox iframe for pure fetch check, bailing to window.fetch: ",n)}return t}function Ly(t,e){const n="fetch";dn(n,t),hn(n,()=>Oy(void 0,e))}function Oy(t,e=!1){e&&!Py()||Se(O,"fetch",function(n){return function(...s){const i=new Error,{method:r,url:o}=Dy(s),a={args:s,fetchData:{method:r,url:o},startTimestamp:ot()*1e3,virtualError:i,headers:My(s)};return $e("fetch",{...a}),n.apply(O,s).then(async c=>($e("fetch",{...a,endTimestamp:ot()*1e3,response:c}),c),c=>{if($e("fetch",{...a,endTimestamp:ot()*1e3,error:c}),Ia(c)&&c.stack===void 0&&(c.stack=i.stack,nn(c,"framesToPop",1)),c instanceof TypeError&&(c.message==="Failed to fetch"||c.message==="Load failed"||c.message==="NetworkError when attempting to fetch resource."))try{const l=new URL(a.fetchData.url);c.message=`${c.message} (${l.host})`}catch{}throw c})}})}function Mo(t,e){return!!t&&typeof t=="object"&&!!t[e]}function Zl(t){return typeof t=="string"?t:t?Mo(t,"url")?t.url:t.toString?t.toString():"":""}function Dy(t){if(t.length===0)return{method:"GET",url:""};if(t.length===2){const[n,s]=t;return{url:Zl(n),method:Mo(s,"method")?String(s.method).toUpperCase():"GET"}}const e=t[0];return{url:Zl(e),method:Mo(e,"method")?String(e.method).toUpperCase():"GET"}}function My(t){const[e,n]=t;try{if(typeof n=="object"&&n!==null&&"headers"in n&&n.headers)return new Headers(n.headers);if(jg(e))return new Headers(e.headers)}catch{}}function xy(){return"npm"}const q=O;let xo=0;function yh(){return xo>0}function Fy(){xo++,setTimeout(()=>{xo--})}function Ln(t,e={}){function n(i){return typeof i=="function"}if(!n(t))return t;try{const i=t.__sentry_wrapped__;if(i)return typeof i=="function"?i:t;if(Aa(t))return t}catch{return t}const s=function(...i){try{const r=i.map(o=>Ln(o,e));return t.apply(this,r)}catch(r){throw Fy(),um(o=>{o.addEventProcessor(a=>(e.mechanism&&(Ro(a,void 0),An(a,e.mechanism)),a.extra={...a.extra,arguments:i},a)),S_(r)}),r}};try{for(const i in t)Object.prototype.hasOwnProperty.call(t,i)&&(s[i]=t[i])}catch{}$d(s,t),nn(t,"__sentry_wrapped__",s);try{Object.getOwnPropertyDescriptor(s,"name").configurable&&Object.defineProperty(s,"name",{get(){return t.name}})}catch{}return s}function Uy(){const t=ka(),{referrer:e}=q.document||{},{userAgent:n}=q.navigator||{},s={...e&&{Referer:e},...n&&{"User-Agent":n}};return{url:t,headers:s}}function Da(t,e){const n=Ma(t,e),s={type:Vy(e),value:jy(e)};return n.length&&(s.stacktrace={frames:n}),s.type===void 0&&s.value===""&&(s.value="Unrecoverable error caught"),s}function $y(t,e,n,s){const r=_e()?.getOptions().normalizeDepth,o=Ky(e),a={__serialized__:Xd(e,r)};if(o)return{exception:{values:[Da(t,o)]},extra:a};const c={exception:{values:[{type:wr(e)?e.constructor.name:s?"UnhandledRejection":"Error",value:qy(e,{isUnhandledRejection:s})}]},extra:a};if(n){const l=Ma(t,n);l.length&&(c.exception.values[0].stacktrace={frames:l})}return c}function io(t,e){return{exception:{values:[Da(t,e)]}}}function Ma(t,e){const n=e.stacktrace||e.stack||"",s=Hy(e),i=Wy(e);try{return t(n,s,i)}catch{}return[]}const By=/Minified React error #\d+;/i;function Hy(t){return t&&By.test(t.message)?1:0}function Wy(t){return typeof t.framesToPop=="number"?t.framesToPop:0}function Eh(t){return typeof WebAssembly<"u"&&typeof WebAssembly.Exception<"u"?t instanceof WebAssembly.Exception:!1}function Vy(t){const e=t?.name;return!e&&Eh(t)?t.message&&Array.isArray(t.message)&&t.message.length==2?t.message[0]:"WebAssembly.Exception":e}function jy(t){const e=t?.message;return Eh(t)?Array.isArray(t.message)&&t.message.length==2?t.message[1]:"wasm exception":e?e.error&&typeof e.error.message=="string"?e.error.message:e:"No error message"}function Gy(t,e,n,s){const i=n?.syntheticException||void 0,r=xa(t,e,i,s);return An(r),r.level="error",n?.event_id&&(r.event_id=n.event_id),Sr(r)}function zy(t,e,n="info",s,i){const r=s?.syntheticException||void 0,o=Fo(t,e,r,i);return o.level=n,s?.event_id&&(o.event_id=s.event_id),Sr(o)}function xa(t,e,n,s,i){let r;if(xd(e)&&e.error)return io(t,e.error);if(fl(e)||Bg(e)){const o=e;if("stack"in e)r=io(t,e);else{const a=o.name||(fl(o)?"DOMError":"DOMException"),c=o.message?`${a}: ${o.message}`:a;r=Fo(t,c,n,s),Ro(r,c)}return"code"in o&&(r.tags={...r.tags,"DOMException.code":`${o.code}`}),r}return Ia(e)?io(t,e):Ps(e)||wr(e)?(r=$y(t,e,n,i),An(r,{synthetic:!0}),r):(r=Fo(t,e,n,s),Ro(r,`${e}`),An(r,{synthetic:!0}),r)}function Fo(t,e,n,s){const i={};if(s&&n){const r=Ma(t,n);r.length&&(i.exception={values:[{value:e,stacktrace:{frames:r}}]}),An(i,{synthetic:!0})}if(Ta(e)){const{__sentry_template_string__:r,__sentry_template_values__:o}=e;return i.logentry={message:r,params:o},i}return i.message=e,i}function qy(t,{isUnhandledRejection:e}){const n=Yg(t),s=e?"promise rejection":"exception";return xd(t)?`Event \`ErrorEvent\` captured as ${s} with message \`${t.message}\``:wr(t)?`Event \`${Yy(t)}\` (type=${t.type}) captured as ${s}`:`Object captured as ${s} with keys: ${n}`}function Yy(t){try{const e=Object.getPrototypeOf(t);return e?e.constructor.name:void 0}catch{}}function Ky(t){for(const e in t)if(Object.prototype.hasOwnProperty.call(t,e)){const n=t[e];if(n instanceof Error)return n}}class Jy extends W_{constructor(e){const n=Qy(e),s=q.SENTRY_SDK_SOURCE||xy();sy(n,"browser",["browser"],s),n._metadata?.sdk&&(n._metadata.sdk.settings={infer_ip:n.sendDefaultPii?"auto":"never",...n._metadata.sdk.settings}),super(n);const{sendDefaultPii:i,sendClientReports:r,enableLogs:o,_experiments:a,enableMetrics:c}=this._options,l=c??a?.enableMetrics??!0;q.document&&(r||o||l)&&q.document.addEventListener("visibilitychange",()=>{q.document.visibilityState==="hidden"&&(r&&this._flushOutcomes(),o&&ih(this),l&&oh(this))}),i&&this.on("beforeSendSession",ny)}eventFromException(e,n){return Gy(this._options.stackParser,e,n,this._options.attachStacktrace)}eventFromMessage(e,n="info",s){return zy(this._options.stackParser,e,n,s,this._options.attachStacktrace)}_prepareEvent(e,n,s,i){return e.platform=e.platform||"javascript",super._prepareEvent(e,n,s,i)}}function Qy(t){return{release:typeof __SENTRY_RELEASE__=="string"?__SENTRY_RELEASE__:q.SENTRY_RELEASE?.id,sendClientReports:!0,parentSpanIsAlwaysRootSpan:!0,...t}}const Xy=typeof __SENTRY_DEBUG__>"u"||__SENTRY_DEBUG__,fe=O,Zy=1e3;let eu,Uo,$o;function eE(t){dn("dom",t),hn("dom",tE)}function tE(){if(!fe.document)return;const t=$e.bind(null,"dom"),e=tu(t,!0);fe.document.addEventListener("click",e,!1),fe.document.addEventListener("keypress",e,!1),["EventTarget","Node"].forEach(n=>{const i=fe[n]?.prototype;i?.hasOwnProperty?.("addEventListener")&&(Se(i,"addEventListener",function(r){return function(o,a,c){if(o==="click"||o=="keypress")try{const l=this.__sentry_instrumentation_handlers__=this.__sentry_instrumentation_handlers__||{},u=l[o]=l[o]||{refCount:0};if(!u.handler){const d=tu(t);u.handler=d,r.call(this,o,d,c)}u.refCount++}catch{}return r.call(this,o,a,c)}}),Se(i,"removeEventListener",function(r){return function(o,a,c){if(o==="click"||o=="keypress")try{const l=this.__sentry_instrumentation_handlers__||{},u=l[o];u&&(u.refCount--,u.refCount<=0&&(r.call(this,o,u.handler,c),u.handler=void 0,delete l[o]),Object.keys(l).length===0&&delete this.__sentry_instrumentation_handlers__)}catch{}return r.call(this,o,a,c)}}))})}function nE(t){if(t.type!==Uo)return!1;try{if(!t.target||t.target._sentryId!==$o)return!1}catch{}return!0}function sE(t,e){return t!=="keypress"?!1:e?.tagName?!(e.tagName==="INPUT"||e.tagName==="TEXTAREA"||e.isContentEditable):!0}function tu(t,e=!1){return n=>{if(!n||n._sentryCaptured)return;const s=iE(n);if(sE(n.type,s))return;nn(n,"_sentryCaptured",!0),s&&!s._sentryId&&nn(s,"_sentryId",Re());const i=n.type==="keypress"?"input":n.type;nE(n)||(t({event:n,name:i,global:e}),Uo=n.type,$o=s?s._sentryId:void 0),clearTimeout(eu),eu=fe.setTimeout(()=>{$o=void 0,Uo=void 0},Zy)}}function iE(t){try{return t.target}catch{return null}}let pi;function vh(t){const e="history";dn(e,t),hn(e,rE)}function rE(){if(fe.addEventListener("popstate",()=>{const e=fe.location.href,n=pi;if(pi=e,n===e)return;$e("history",{from:n,to:e})}),!Ay())return;function t(e){return function(...n){const s=n.length>2?n[2]:void 0;if(s){const i=pi,r=oE(String(s));if(pi=r,i===r)return e.apply(this,n);$e("history",{from:i,to:r})}return e.apply(this,n)}}Se(fe.history,"pushState",t),Se(fe.history,"replaceState",t)}function oE(t){try{return new URL(t,fe.location.origin).toString()}catch{return t}}const Ii={};function aE(t){const e=Ii[t];if(e)return e;let n=fe[t];if(Do(n))return Ii[t]=n.bind(fe);const s=fe.document;if(s&&typeof s.createElement=="function")try{const i=s.createElement("iframe");i.hidden=!0,s.head.appendChild(i);const r=i.contentWindow;r?.[t]&&(n=r[t]),s.head.removeChild(i)}catch(i){Xy&&w.warn(`Could not create sandbox iframe for ${t} check, bailing to window.${t}: `,i)}return n&&(Ii[t]=n.bind(fe))}function cE(t){Ii[t]=void 0}const ms="__sentry_xhr_v3__";function lE(t){dn("xhr",t),hn("xhr",uE)}function uE(){if(!fe.XMLHttpRequest)return;const t=XMLHttpRequest.prototype;t.open=new Proxy(t.open,{apply(e,n,s){const i=new Error,r=ot()*1e3,o=rt(s[0])?s[0].toUpperCase():void 0,a=dE(s[1]);if(!o||!a)return e.apply(n,s);n[ms]={method:o,url:a,request_headers:{}},o==="POST"&&a.match(/sentry_key/)&&(n.__sentry_own_request__=!0);const c=()=>{const l=n[ms];if(l&&n.readyState===4){try{l.status_code=n.status}catch{}const u={endTimestamp:ot()*1e3,startTimestamp:r,xhr:n,virtualError:i};$e("xhr",u)}};return"onreadystatechange"in n&&typeof n.onreadystatechange=="function"?n.onreadystatechange=new Proxy(n.onreadystatechange,{apply(l,u,d){return c(),l.apply(u,d)}}):n.addEventListener("readystatechange",c),n.setRequestHeader=new Proxy(n.setRequestHeader,{apply(l,u,d){const[h,f]=d,p=u[ms];return p&&rt(h)&&rt(f)&&(p.request_headers[h.toLowerCase()]=f),l.apply(u,d)}}),e.apply(n,s)}}),t.send=new Proxy(t.send,{apply(e,n,s){const i=n[ms];if(!i)return e.apply(n,s);s[0]!==void 0&&(i.body=s[0]);const r={startTimestamp:ot()*1e3,xhr:n};return $e("xhr",r),e.apply(n,s)}})}function dE(t){if(rt(t))return t;try{return t.toString()}catch{}}const hE=40;function fE(t,e=aE("fetch")){let n=0,s=0;async function i(r){const o=r.body.length;n+=o,s++;const a={body:r.body,method:"POST",referrerPolicy:"strict-origin",headers:t.headers,keepalive:n<=6e4&&s<15,...t.fetchOptions};try{const c=await e(t.url,a);return{statusCode:c.status,headers:{"x-sentry-rate-limits":c.headers.get("X-Sentry-Rate-Limits"),"retry-after":c.headers.get("Retry-After")}}}catch(c){throw cE("fetch"),c}finally{n-=o,s--}}return ty(t,i,ph(t.bufferSize||hE))}const pE=30,gE=50;function Bo(t,e,n,s){const i={filename:t,function:e==="<anonymous>"?tn:e,in_app:!0};return n!==void 0&&(i.lineno=n),s!==void 0&&(i.colno=s),i}const mE=/^\s*at (\S+?)(?::(\d+))(?::(\d+))\s*$/i,_E=/^\s*at (?:(.+?\)(?: \[.+\])?|.*?) ?\((?:address at )?)?(?:async )?((?:<anonymous>|[-a-z]+:|.*bundle|\/)?.*?)(?::(\d+))?(?::(\d+))?\)?\s*$/i,yE=/\((\S*)(?::(\d+))(?::(\d+))\)/,EE=/at (.+?) ?\(data:(.+?),/,vE=t=>{const e=t.match(EE);if(e)return{filename:`<data:${e[2]}>`,function:e[1]};const n=mE.exec(t);if(n){const[,i,r,o]=n;return Bo(i,tn,+r,+o)}const s=_E.exec(t);if(s){if(s[2]&&s[2].indexOf("eval")===0){const a=yE.exec(s[2]);a&&(s[2]=a[1],s[3]=a[2],s[4]=a[3])}const[r,o]=wh(s[1]||tn,s[2]);return Bo(o,r,s[3]?+s[3]:void 0,s[4]?+s[4]:void 0)}},wE=[pE,vE],bE=/^\s*(.*?)(?:\((.*?)\))?(?:^|@)?((?:[-a-z]+)?:\/.*?|\[native code\]|[^@]*(?:bundle|\d+\.js)|\/[\w\-. /=]+)(?::(\d+))?(?::(\d+))?\s*$/i,SE=/(\S+) line (\d+)(?: > eval line \d+)* > eval/i,CE=t=>{const e=bE.exec(t);if(e){if(e[3]&&e[3].indexOf(" > eval")>-1){const r=SE.exec(e[3]);r&&(e[1]=e[1]||"eval",e[3]=r[1],e[4]=r[2],e[5]="")}let s=e[3],i=e[1]||tn;return[i,s]=wh(i,s),Bo(s,i,e[4]?+e[4]:void 0,e[5]?+e[5]:void 0)}},IE=[gE,CE],TE=[wE,IE],RE=Od(...TE),wh=(t,e)=>{const n=t.indexOf("safari-extension")!==-1,s=t.indexOf("safari-web-extension")!==-1;return n||s?[t.indexOf("@")!==-1?t.split("@")[0]:tn,n?`safari-extension:${e}`:`safari-web-extension:${e}`]:[t,e]},Cr=typeof __SENTRY_DEBUG__>"u"||__SENTRY_DEBUG__,gi=1024,kE="Breadcrumbs",AE=((t={})=>{const e={console:!0,dom:!0,fetch:!0,history:!0,sentry:!0,xhr:!0,...t};return{name:kE,setup(n){e.console&&vy(OE(n)),e.dom&&eE(LE(n,e.dom)),e.xhr&&lE(DE(n)),e.fetch&&Ly(ME(n)),e.history&&vh(xE(n)),e.sentry&&n.on("beforeSendEvent",PE(n))}}}),NE=AE;function PE(t){return function(n){_e()===t&&sn({category:`sentry.${n.type==="transaction"?"transaction":"event"}`,event_id:n.event_id,level:n.level,message:Yt(n)},{event:n})}}function LE(t,e){return function(s){if(_e()!==t)return;let i,r,o=typeof e=="object"?e.serializeAttribute:void 0,a=typeof e=="object"&&typeof e.maxStringLength=="number"?e.maxStringLength:void 0;a&&a>gi&&(Cr&&w.warn(`\`dom.maxStringLength\` cannot exceed ${gi}, but a value of ${a} was configured. Sentry will use ${gi} instead.`),a=gi),typeof o=="string"&&(o=[o]);try{const l=s.event,u=FE(l)?l.target:l;i=Ud(u,{keyAttrs:o,maxStringLength:a}),r=qg(u)}catch{i="<unknown>"}if(i.length===0)return;const c={category:`ui.${s.name}`,message:i};r&&(c.data={"ui.component_name":r}),sn(c,{event:s.event,name:s.name,global:s.global})}}function OE(t){return function(n){if(_e()!==t)return;const s={category:"console",data:{arguments:n.args,logger:"console"},level:by(n.level),message:ml(n.args," ")};if(n.level==="assert")if(n.args[0]===!1)s.message=`Assertion failed: ${ml(n.args.slice(1)," ")||"console.assert"}`,s.data.arguments=n.args.slice(1);else return;sn(s,{input:n.args,level:n.level})}}function DE(t){return function(n){if(_e()!==t)return;const{startTimestamp:s,endTimestamp:i}=n,r=n.xhr[ms];if(!s||!i||!r)return;const{method:o,url:a,status_code:c,body:l}=r,u={method:o,url:a,status_code:c},d={xhr:n.xhr,input:l,startTimestamp:s,endTimestamp:i},h={category:"xhr",data:u,type:"http",level:_h(c)};t.emit("beforeOutgoingRequestBreadcrumb",h,d),sn(h,d)}}function ME(t){return function(n){if(_e()!==t)return;const{startTimestamp:s,endTimestamp:i}=n;if(i&&!(n.fetchData.url.match(/sentry_key/)&&n.fetchData.method==="POST"))if(n.fetchData.method,n.fetchData.url,n.error){const r=n.fetchData,o={data:n.error,input:n.args,startTimestamp:s,endTimestamp:i},a={category:"fetch",data:r,level:"error",type:"http"};t.emit("beforeOutgoingRequestBreadcrumb",a,o),sn(a,o)}else{const r=n.response,o={...n.fetchData,status_code:r?.status};n.fetchData.request_body_size,n.fetchData.response_body_size,r?.status;const a={input:n.args,response:r,startTimestamp:s,endTimestamp:i},c={category:"fetch",data:o,type:"http",level:_h(o.status_code)};t.emit("beforeOutgoingRequestBreadcrumb",c,a),sn(c,a)}}}function xE(t){return function(n){if(_e()!==t)return;let s=n.from,i=n.to;const r=so(q.location.href);let o=s?so(s):void 0;const a=so(i);o?.path||(o=r),r.protocol===a.protocol&&r.host===a.host&&(i=a.relative),r.protocol===o.protocol&&r.host===o.host&&(s=o.relative),sn({category:"navigation",data:{from:s,to:i}})}}function FE(t){return!!t&&!!t.target}const UE=["EventTarget","Window","Node","ApplicationCache","AudioTrackList","BroadcastChannel","ChannelMergerNode","CryptoOperation","EventSource","FileReader","HTMLUnknownElement","IDBDatabase","IDBRequest","IDBTransaction","KeyOperation","MediaController","MessagePort","ModalWindow","Notification","SVGElementInstance","Screen","SharedWorker","TextTrack","TextTrackCue","TextTrackList","WebSocket","WebSocketWorker","Worker","XMLHttpRequest","XMLHttpRequestEventTarget","XMLHttpRequestUpload"],$E="BrowserApiErrors",BE=((t={})=>{const e={XMLHttpRequest:!0,eventTarget:!0,requestAnimationFrame:!0,setInterval:!0,setTimeout:!0,unregisterOriginalCallbacks:!1,...t};return{name:$E,setupOnce(){e.setTimeout&&Se(q,"setTimeout",nu),e.setInterval&&Se(q,"setInterval",nu),e.requestAnimationFrame&&Se(q,"requestAnimationFrame",WE),e.XMLHttpRequest&&"XMLHttpRequest"in q&&Se(XMLHttpRequest.prototype,"send",VE);const n=e.eventTarget;n&&(Array.isArray(n)?n:UE).forEach(i=>jE(i,e))}}}),HE=BE;function nu(t){return function(...e){const n=e[0];return e[0]=Ln(n,{mechanism:{handled:!1,type:`auto.browser.browserapierrors.${Lt(t)}`}}),t.apply(this,e)}}function WE(t){return function(e){return t.apply(this,[Ln(e,{mechanism:{data:{handler:Lt(t)},handled:!1,type:"auto.browser.browserapierrors.requestAnimationFrame"}})])}}function VE(t){return function(...e){const n=this;return["onload","onerror","onprogress","onreadystatechange"].forEach(i=>{i in n&&typeof n[i]=="function"&&Se(n,i,function(r){const o={mechanism:{data:{handler:Lt(r)},handled:!1,type:`auto.browser.browserapierrors.xhr.${i}`}},a=Aa(r);return a&&(o.mechanism.data.handler=Lt(a)),Ln(r,o)})}),t.apply(this,e)}}function jE(t,e){const s=q[t]?.prototype;s?.hasOwnProperty?.("addEventListener")&&(Se(s,"addEventListener",function(i){return function(r,o,a){try{GE(o)&&(o.handleEvent=Ln(o.handleEvent,{mechanism:{data:{handler:Lt(o),target:t},handled:!1,type:"auto.browser.browserapierrors.handleEvent"}}))}catch{}return e.unregisterOriginalCallbacks&&zE(this,r,o),i.apply(this,[r,Ln(o,{mechanism:{data:{handler:Lt(o),target:t},handled:!1,type:"auto.browser.browserapierrors.addEventListener"}}),a])}}),Se(s,"removeEventListener",function(i){return function(r,o,a){try{const c=o.__sentry_wrapped__;c&&i.call(this,r,c,a)}catch{}return i.call(this,r,o,a)}}))}function GE(t){return typeof t.handleEvent=="function"}function zE(t,e,n){t&&typeof t=="object"&&"removeEventListener"in t&&typeof t.removeEventListener=="function"&&t.removeEventListener(e,n)}const qE=()=>({name:"BrowserSession",setupOnce(){if(typeof q.document>"u"){Cr&&w.warn("Using the `browserSessionIntegration` in non-browser environments is not supported.");return}Fl({ignoreDuration:!0}),Ul(),vh(({from:t,to:e})=>{t!==void 0&&t!==e&&(Fl({ignoreDuration:!0}),Ul())})}}),YE="GlobalHandlers",KE=((t={})=>{const e={onerror:!0,onunhandledrejection:!0,...t};return{name:YE,setupOnce(){Error.stackTraceLimit=50},setup(n){e.onerror&&(QE(n),su("onerror")),e.onunhandledrejection&&(XE(n),su("onunhandledrejection"))}}}),JE=KE;function QE(t){xg(e=>{const{stackParser:n,attachStacktrace:s}=bh();if(_e()!==t||yh())return;const{msg:i,url:r,line:o,column:a,error:c}=e,l=tv(xa(n,c||i,void 0,s,!1),r,o,a);l.level="error",eh(l,{originalException:c,mechanism:{handled:!1,type:"auto.browser.global_handlers.onerror"}})})}function XE(t){Ug(e=>{const{stackParser:n,attachStacktrace:s}=bh();if(_e()!==t||yh())return;const i=ZE(e),r=vr(i)?ev(i):xa(n,i,void 0,s,!0);r.level="error",eh(r,{originalException:i,mechanism:{handled:!1,type:"auto.browser.global_handlers.onunhandledrejection"}})})}function ZE(t){if(vr(t))return t;try{if("reason"in t)return t.reason;if("detail"in t&&"reason"in t.detail)return t.detail.reason}catch{}return t}function ev(t){return{exception:{values:[{type:"UnhandledRejection",value:`Non-Error promise rejection captured with value: ${String(t)}`}]}}}function tv(t,e,n,s){const i=t.exception=t.exception||{},r=i.values=i.values||[],o=r[0]=r[0]||{},a=o.stacktrace=o.stacktrace||{},c=a.frames=a.frames||[],l=s,u=n,d=nv(e)??ka();return c.length===0&&c.push({colno:l,filename:d,function:tn,in_app:!0,lineno:u}),t}function su(t){Cr&&w.log(`Global Handler attached: ${t}`)}function bh(){return _e()?.getOptions()||{stackParser:()=>[],attachStacktrace:!1}}function nv(t){if(!(!rt(t)||t.length===0)){if(t.startsWith("data:")){const e=t.match(/^data:([^;]+)/),n=e?e[1]:"text/javascript",s=t.includes("base64,");return`<data:${n}${s?",base64":""}>`}return t}}const sv=()=>({name:"HttpContext",preprocessEvent(t){if(!q.navigator&&!q.location&&!q.document)return;const e=Uy(),n={...e.headers,...t.request?.headers};t.request={...e,...t.request,headers:n}}}),iv="cause",rv=5,ov="LinkedErrors",av=((t={})=>{const e=t.limit||rv,n=t.key||iv;return{name:ov,preprocessEvent(s,i,r){const o=r.getOptions();Ey(Da,o.stackParser,n,e,s,i)}}}),cv=av;function lv(){return uv()?(Cr&&zn(()=>{console.error("[Sentry] You cannot use Sentry.init() in a browser extension, see: https://docs.sentry.io/platforms/javascript/best-practices/browser-extensions/")}),!0):!1}function uv(){if(typeof q.window>"u")return!1;const t=q;if(t.nw||!(t.chrome||t.browser)?.runtime?.id)return!1;const n=ka(),s=["chrome-extension","moz-extension","ms-browser-extension","safari-web-extension"];return!(q===q.top&&s.some(r=>n.startsWith(`${r}://`)))}function dv(t){return[dy(),ay(),HE(),NE(),JE(),cv(),Iy(),sv(),qE()]}function hv(t={}){const e=!t.skipBrowserExtensionCheck&&lv();let n=t.defaultIntegrations==null?dv():t.defaultIntegrations;const s={...t,enabled:e?!1:t.enabled,stackParser:Dg(t.stackParser||RE),integrations:N_({integrations:t.integrations,defaultIntegrations:n}),transport:t.transport||fE};return q_(Jy,s)}const fv="https://adc1b5518c6a55273a1398d1b8b9cd3e@o4510415124496384.ingest.de.sentry.io/4510415129083984";hv({dsn:fv,sendDefaultPii:!0});/**
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
 */const pv=()=>{};var iu={};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Sh={NODE_ADMIN:!1,SDK_VERSION:"${JSCORE_VERSION}"};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const g=function(t,e){if(!t)throw Kn(e)},Kn=function(t){return new Error("Firebase Database ("+Sh.SDK_VERSION+") INTERNAL ASSERT FAILED: "+t)};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ch=function(t){const e=[];let n=0;for(let s=0;s<t.length;s++){let i=t.charCodeAt(s);i<128?e[n++]=i:i<2048?(e[n++]=i>>6|192,e[n++]=i&63|128):(i&64512)===55296&&s+1<t.length&&(t.charCodeAt(s+1)&64512)===56320?(i=65536+((i&1023)<<10)+(t.charCodeAt(++s)&1023),e[n++]=i>>18|240,e[n++]=i>>12&63|128,e[n++]=i>>6&63|128,e[n++]=i&63|128):(e[n++]=i>>12|224,e[n++]=i>>6&63|128,e[n++]=i&63|128)}return e},gv=function(t){const e=[];let n=0,s=0;for(;n<t.length;){const i=t[n++];if(i<128)e[s++]=String.fromCharCode(i);else if(i>191&&i<224){const r=t[n++];e[s++]=String.fromCharCode((i&31)<<6|r&63)}else if(i>239&&i<365){const r=t[n++],o=t[n++],a=t[n++],c=((i&7)<<18|(r&63)<<12|(o&63)<<6|a&63)-65536;e[s++]=String.fromCharCode(55296+(c>>10)),e[s++]=String.fromCharCode(56320+(c&1023))}else{const r=t[n++],o=t[n++];e[s++]=String.fromCharCode((i&15)<<12|(r&63)<<6|o&63)}}return e.join("")},Fa={byteToCharMap_:null,charToByteMap_:null,byteToCharMapWebSafe_:null,charToByteMapWebSafe_:null,ENCODED_VALS_BASE:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",get ENCODED_VALS(){return this.ENCODED_VALS_BASE+"+/="},get ENCODED_VALS_WEBSAFE(){return this.ENCODED_VALS_BASE+"-_."},HAS_NATIVE_SUPPORT:typeof atob=="function",encodeByteArray(t,e){if(!Array.isArray(t))throw Error("encodeByteArray takes an array as a parameter");this.init_();const n=e?this.byteToCharMapWebSafe_:this.byteToCharMap_,s=[];for(let i=0;i<t.length;i+=3){const r=t[i],o=i+1<t.length,a=o?t[i+1]:0,c=i+2<t.length,l=c?t[i+2]:0,u=r>>2,d=(r&3)<<4|a>>4;let h=(a&15)<<2|l>>6,f=l&63;c||(f=64,o||(h=64)),s.push(n[u],n[d],n[h],n[f])}return s.join("")},encodeString(t,e){return this.HAS_NATIVE_SUPPORT&&!e?btoa(t):this.encodeByteArray(Ch(t),e)},decodeString(t,e){return this.HAS_NATIVE_SUPPORT&&!e?atob(t):gv(this.decodeStringToByteArray(t,e))},decodeStringToByteArray(t,e){this.init_();const n=e?this.charToByteMapWebSafe_:this.charToByteMap_,s=[];for(let i=0;i<t.length;){const r=n[t.charAt(i++)],a=i<t.length?n[t.charAt(i)]:0;++i;const l=i<t.length?n[t.charAt(i)]:64;++i;const d=i<t.length?n[t.charAt(i)]:64;if(++i,r==null||a==null||l==null||d==null)throw new mv;const h=r<<2|a>>4;if(s.push(h),l!==64){const f=a<<4&240|l>>2;if(s.push(f),d!==64){const p=l<<6&192|d;s.push(p)}}}return s},init_(){if(!this.byteToCharMap_){this.byteToCharMap_={},this.charToByteMap_={},this.byteToCharMapWebSafe_={},this.charToByteMapWebSafe_={};for(let t=0;t<this.ENCODED_VALS.length;t++)this.byteToCharMap_[t]=this.ENCODED_VALS.charAt(t),this.charToByteMap_[this.byteToCharMap_[t]]=t,this.byteToCharMapWebSafe_[t]=this.ENCODED_VALS_WEBSAFE.charAt(t),this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[t]]=t,t>=this.ENCODED_VALS_BASE.length&&(this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(t)]=t,this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(t)]=t)}}};class mv extends Error{constructor(){super(...arguments),this.name="DecodeBase64StringError"}}const Ih=function(t){const e=Ch(t);return Fa.encodeByteArray(e,!0)},Bi=function(t){return Ih(t).replace(/\./g,"")},Hi=function(t){try{return Fa.decodeString(t,!0)}catch(e){console.error("base64Decode failed: ",e)}return null};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function _v(t){return Th(void 0,t)}function Th(t,e){if(!(e instanceof Object))return e;switch(e.constructor){case Date:const n=e;return new Date(n.getTime());case Object:t===void 0&&(t={});break;case Array:t=[];break;default:return e}for(const n in e)!e.hasOwnProperty(n)||!yv(n)||(t[n]=Th(t[n],e[n]));return t}function yv(t){return t!=="__proto__"}/**
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
 */function Ev(){if(typeof self<"u")return self;if(typeof window<"u")return window;if(typeof global<"u")return global;throw new Error("Unable to locate global object.")}/**
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
 */const vv=()=>Ev().__FIREBASE_DEFAULTS__,wv=()=>{if(typeof process>"u"||typeof iu>"u")return;const t=iu.__FIREBASE_DEFAULTS__;if(t)return JSON.parse(t)},bv=()=>{if(typeof document>"u")return;let t;try{t=document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/)}catch{return}const e=t&&Hi(t[1]);return e&&JSON.parse(e)},Ua=()=>{try{return pv()||vv()||wv()||bv()}catch(t){console.info(`Unable to get __FIREBASE_DEFAULTS__ due to: ${t}`);return}},Rh=t=>Ua()?.emulatorHosts?.[t],Sv=t=>{const e=Rh(t);if(!e)return;const n=e.lastIndexOf(":");if(n<=0||n+1===e.length)throw new Error(`Invalid host ${e} with no separate hostname and port!`);const s=parseInt(e.substring(n+1),10);return e[0]==="["?[e.substring(1,n-1),s]:[e.substring(0,n),s]},kh=()=>Ua()?.config,Ah=t=>Ua()?.[`_${t}`];/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Xs{constructor(){this.reject=()=>{},this.resolve=()=>{},this.promise=new Promise((e,n)=>{this.resolve=e,this.reject=n})}wrapCallback(e){return(n,s)=>{n?this.reject(n):this.resolve(s),typeof e=="function"&&(this.promise.catch(()=>{}),e.length===1?e(n):e(n,s))}}}/**
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
 */function Jn(t){try{return(t.startsWith("http://")||t.startsWith("https://")?new URL(t).hostname:t).endsWith(".cloudworkstations.dev")}catch{return!1}}async function Nh(t){return(await fetch(t,{credentials:"include"})).ok}/**
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
 */function Cv(t,e){if(t.uid)throw new Error('The "uid" field is no longer supported by mockUserToken. Please use "sub" instead for Firebase Auth User ID.');const n={alg:"none",type:"JWT"},s=e||"demo-project",i=t.iat||0,r=t.sub||t.user_id;if(!r)throw new Error("mockUserToken must contain 'sub' or 'user_id' field!");const o={iss:`https://securetoken.google.com/${s}`,aud:s,iat:i,exp:i+3600,auth_time:i,sub:r,user_id:r,firebase:{sign_in_provider:"custom",identities:{}},...t};return[Bi(JSON.stringify(n)),Bi(JSON.stringify(o)),""].join(".")}const Es={};function Iv(){const t={prod:[],emulator:[]};for(const e of Object.keys(Es))Es[e]?t.emulator.push(e):t.prod.push(e);return t}function Tv(t){let e=document.getElementById(t),n=!1;return e||(e=document.createElement("div"),e.setAttribute("id",t),n=!0),{created:n,element:e}}let ru=!1;function Ph(t,e){if(typeof window>"u"||typeof document>"u"||!Jn(window.location.host)||Es[t]===e||Es[t]||ru)return;Es[t]=e;function n(h){return`__firebase__banner__${h}`}const s="__firebase__banner",r=Iv().prod.length>0;function o(){const h=document.getElementById(s);h&&h.remove()}function a(h){h.style.display="flex",h.style.background="#7faaf0",h.style.position="fixed",h.style.bottom="5px",h.style.left="5px",h.style.padding=".5em",h.style.borderRadius="5px",h.style.alignItems="center"}function c(h,f){h.setAttribute("width","24"),h.setAttribute("id",f),h.setAttribute("height","24"),h.setAttribute("viewBox","0 0 24 24"),h.setAttribute("fill","none"),h.style.marginLeft="-6px"}function l(){const h=document.createElement("span");return h.style.cursor="pointer",h.style.marginLeft="16px",h.style.fontSize="24px",h.innerHTML=" &times;",h.onclick=()=>{ru=!0,o()},h}function u(h,f){h.setAttribute("id",f),h.innerText="Learn more",h.href="https://firebase.google.com/docs/studio/preview-apps#preview-backend",h.setAttribute("target","__blank"),h.style.paddingLeft="5px",h.style.textDecoration="underline"}function d(){const h=Tv(s),f=n("text"),p=document.getElementById(f)||document.createElement("span"),E=n("learnmore"),m=document.getElementById(E)||document.createElement("a"),A=n("preprendIcon"),N=document.getElementById(A)||document.createElementNS("http://www.w3.org/2000/svg","svg");if(h.created){const ae=h.element;a(ae),u(m,E);const S=l();c(N,A),ae.append(N,p,m,S),document.body.appendChild(ae)}r?(p.innerText="Preview backend disconnected.",N.innerHTML=`<g clip-path="url(#clip0_6013_33858)">
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
 */function me(){return typeof navigator<"u"&&typeof navigator.userAgent=="string"?navigator.userAgent:""}function $a(){return typeof window<"u"&&!!(window.cordova||window.phonegap||window.PhoneGap)&&/ios|iphone|ipod|ipad|android|blackberry|iemobile/i.test(me())}function Rv(){return typeof navigator<"u"&&navigator.userAgent==="Cloudflare-Workers"}function kv(){const t=typeof chrome=="object"?chrome.runtime:typeof browser=="object"?browser.runtime:void 0;return typeof t=="object"&&t.id!==void 0}function Lh(){return typeof navigator=="object"&&navigator.product==="ReactNative"}function Av(){const t=me();return t.indexOf("MSIE ")>=0||t.indexOf("Trident/")>=0}function Nv(){return Sh.NODE_ADMIN===!0}function Pv(){try{return typeof indexedDB=="object"}catch{return!1}}function Lv(){return new Promise((t,e)=>{try{let n=!0;const s="validate-browser-context-for-indexeddb-analytics-module",i=self.indexedDB.open(s);i.onsuccess=()=>{i.result.close(),n||self.indexedDB.deleteDatabase(s),t(!0)},i.onupgradeneeded=()=>{n=!1},i.onerror=()=>{e(i.error?.message||"")}}catch(n){e(n)}})}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ov="FirebaseError";class Ut extends Error{constructor(e,n,s){super(n),this.code=e,this.customData=s,this.name=Ov,Object.setPrototypeOf(this,Ut.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,Zs.prototype.create)}}class Zs{constructor(e,n,s){this.service=e,this.serviceName=n,this.errors=s}create(e,...n){const s=n[0]||{},i=`${this.service}/${e}`,r=this.errors[e],o=r?Dv(r,s):"Error",a=`${this.serviceName}: ${o} (${i}).`;return new Ut(i,a,s)}}function Dv(t,e){return t.replace(Mv,(n,s)=>{const i=e[s];return i!=null?String(i):`<${s}?>`})}const Mv=/\{\$([^}]+)}/g;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ds(t){return JSON.parse(t)}function Q(t){return JSON.stringify(t)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Oh=function(t){let e={},n={},s={},i="";try{const r=t.split(".");e=Ds(Hi(r[0])||""),n=Ds(Hi(r[1])||""),i=r[2],s=n.d||{},delete n.d}catch{}return{header:e,claims:n,data:s,signature:i}},xv=function(t){const e=Oh(t),n=e.claims;return!!n&&typeof n=="object"&&n.hasOwnProperty("iat")},Fv=function(t){const e=Oh(t).claims;return typeof e=="object"&&e.admin===!0};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Qe(t,e){return Object.prototype.hasOwnProperty.call(t,e)}function On(t,e){if(Object.prototype.hasOwnProperty.call(t,e))return t[e]}function Ho(t){for(const e in t)if(Object.prototype.hasOwnProperty.call(t,e))return!1;return!0}function Wi(t,e,n){const s={};for(const i in t)Object.prototype.hasOwnProperty.call(t,i)&&(s[i]=e.call(n,t[i],i,t));return s}function rn(t,e){if(t===e)return!0;const n=Object.keys(t),s=Object.keys(e);for(const i of n){if(!s.includes(i))return!1;const r=t[i],o=e[i];if(ou(r)&&ou(o)){if(!rn(r,o))return!1}else if(r!==o)return!1}for(const i of s)if(!n.includes(i))return!1;return!0}function ou(t){return t!==null&&typeof t=="object"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Qn(t){const e=[];for(const[n,s]of Object.entries(t))Array.isArray(s)?s.forEach(i=>{e.push(encodeURIComponent(n)+"="+encodeURIComponent(i))}):e.push(encodeURIComponent(n)+"="+encodeURIComponent(s));return e.length?"&"+e.join("&"):""}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Uv{constructor(){this.chain_=[],this.buf_=[],this.W_=[],this.pad_=[],this.inbuf_=0,this.total_=0,this.blockSize=512/8,this.pad_[0]=128;for(let e=1;e<this.blockSize;++e)this.pad_[e]=0;this.reset()}reset(){this.chain_[0]=1732584193,this.chain_[1]=4023233417,this.chain_[2]=2562383102,this.chain_[3]=271733878,this.chain_[4]=3285377520,this.inbuf_=0,this.total_=0}compress_(e,n){n||(n=0);const s=this.W_;if(typeof e=="string")for(let d=0;d<16;d++)s[d]=e.charCodeAt(n)<<24|e.charCodeAt(n+1)<<16|e.charCodeAt(n+2)<<8|e.charCodeAt(n+3),n+=4;else for(let d=0;d<16;d++)s[d]=e[n]<<24|e[n+1]<<16|e[n+2]<<8|e[n+3],n+=4;for(let d=16;d<80;d++){const h=s[d-3]^s[d-8]^s[d-14]^s[d-16];s[d]=(h<<1|h>>>31)&4294967295}let i=this.chain_[0],r=this.chain_[1],o=this.chain_[2],a=this.chain_[3],c=this.chain_[4],l,u;for(let d=0;d<80;d++){d<40?d<20?(l=a^r&(o^a),u=1518500249):(l=r^o^a,u=1859775393):d<60?(l=r&o|a&(r|o),u=2400959708):(l=r^o^a,u=3395469782);const h=(i<<5|i>>>27)+l+c+u+s[d]&4294967295;c=a,a=o,o=(r<<30|r>>>2)&4294967295,r=i,i=h}this.chain_[0]=this.chain_[0]+i&4294967295,this.chain_[1]=this.chain_[1]+r&4294967295,this.chain_[2]=this.chain_[2]+o&4294967295,this.chain_[3]=this.chain_[3]+a&4294967295,this.chain_[4]=this.chain_[4]+c&4294967295}update(e,n){if(e==null)return;n===void 0&&(n=e.length);const s=n-this.blockSize;let i=0;const r=this.buf_;let o=this.inbuf_;for(;i<n;){if(o===0)for(;i<=s;)this.compress_(e,i),i+=this.blockSize;if(typeof e=="string"){for(;i<n;)if(r[o]=e.charCodeAt(i),++o,++i,o===this.blockSize){this.compress_(r),o=0;break}}else for(;i<n;)if(r[o]=e[i],++o,++i,o===this.blockSize){this.compress_(r),o=0;break}}this.inbuf_=o,this.total_+=n}digest(){const e=[];let n=this.total_*8;this.inbuf_<56?this.update(this.pad_,56-this.inbuf_):this.update(this.pad_,this.blockSize-(this.inbuf_-56));for(let i=this.blockSize-1;i>=56;i--)this.buf_[i]=n&255,n/=256;this.compress_(this.buf_);let s=0;for(let i=0;i<5;i++)for(let r=24;r>=0;r-=8)e[s]=this.chain_[i]>>r&255,++s;return e}}function $v(t,e){const n=new Bv(t,e);return n.subscribe.bind(n)}class Bv{constructor(e,n){this.observers=[],this.unsubscribes=[],this.observerCount=0,this.task=Promise.resolve(),this.finalized=!1,this.onNoObservers=n,this.task.then(()=>{e(this)}).catch(s=>{this.error(s)})}next(e){this.forEachObserver(n=>{n.next(e)})}error(e){this.forEachObserver(n=>{n.error(e)}),this.close(e)}complete(){this.forEachObserver(e=>{e.complete()}),this.close()}subscribe(e,n,s){let i;if(e===void 0&&n===void 0&&s===void 0)throw new Error("Missing Observer.");Hv(e,["next","error","complete"])?i=e:i={next:e,error:n,complete:s},i.next===void 0&&(i.next=ro),i.error===void 0&&(i.error=ro),i.complete===void 0&&(i.complete=ro);const r=this.unsubscribeOne.bind(this,this.observers.length);return this.finalized&&this.task.then(()=>{try{this.finalError?i.error(this.finalError):i.complete()}catch{}}),this.observers.push(i),r}unsubscribeOne(e){this.observers===void 0||this.observers[e]===void 0||(delete this.observers[e],this.observerCount-=1,this.observerCount===0&&this.onNoObservers!==void 0&&this.onNoObservers(this))}forEachObserver(e){if(!this.finalized)for(let n=0;n<this.observers.length;n++)this.sendOne(n,e)}sendOne(e,n){this.task.then(()=>{if(this.observers!==void 0&&this.observers[e]!==void 0)try{n(this.observers[e])}catch(s){typeof console<"u"&&console.error&&console.error(s)}})}close(e){this.finalized||(this.finalized=!0,e!==void 0&&(this.finalError=e),this.task.then(()=>{this.observers=void 0,this.onNoObservers=void 0}))}}function Hv(t,e){if(typeof t!="object"||t===null)return!1;for(const n of e)if(n in t&&typeof t[n]=="function")return!0;return!1}function ro(){}function Ir(t,e){return`${t} failed: ${e} argument `}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Wv=function(t){const e=[];let n=0;for(let s=0;s<t.length;s++){let i=t.charCodeAt(s);if(i>=55296&&i<=56319){const r=i-55296;s++,g(s<t.length,"Surrogate pair missing trail surrogate.");const o=t.charCodeAt(s)-56320;i=65536+(r<<10)+o}i<128?e[n++]=i:i<2048?(e[n++]=i>>6|192,e[n++]=i&63|128):i<65536?(e[n++]=i>>12|224,e[n++]=i>>6&63|128,e[n++]=i&63|128):(e[n++]=i>>18|240,e[n++]=i>>12&63|128,e[n++]=i>>6&63|128,e[n++]=i&63|128)}return e},Tr=function(t){let e=0;for(let n=0;n<t.length;n++){const s=t.charCodeAt(n);s<128?e++:s<2048?e+=2:s>=55296&&s<=56319?(e+=4,n++):e+=3}return e};/**
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
 */function ue(t){return t&&t._delegate?t._delegate:t}class on{constructor(e,n,s){this.name=e,this.instanceFactory=n,this.type=s,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}setInstantiationMode(e){return this.instantiationMode=e,this}setMultipleInstances(e){return this.multipleInstances=e,this}setServiceProps(e){return this.serviceProps=e,this}setInstanceCreatedCallback(e){return this.onInstanceCreated=e,this}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const jt="[DEFAULT]";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Vv{constructor(e,n){this.name=e,this.container=n,this.component=null,this.instances=new Map,this.instancesDeferred=new Map,this.instancesOptions=new Map,this.onInitCallbacks=new Map}get(e){const n=this.normalizeInstanceIdentifier(e);if(!this.instancesDeferred.has(n)){const s=new Xs;if(this.instancesDeferred.set(n,s),this.isInitialized(n)||this.shouldAutoInitialize())try{const i=this.getOrInitializeService({instanceIdentifier:n});i&&s.resolve(i)}catch{}}return this.instancesDeferred.get(n).promise}getImmediate(e){const n=this.normalizeInstanceIdentifier(e?.identifier),s=e?.optional??!1;if(this.isInitialized(n)||this.shouldAutoInitialize())try{return this.getOrInitializeService({instanceIdentifier:n})}catch(i){if(s)return null;throw i}else{if(s)return null;throw Error(`Service ${this.name} is not available`)}}getComponent(){return this.component}setComponent(e){if(e.name!==this.name)throw Error(`Mismatching Component ${e.name} for Provider ${this.name}.`);if(this.component)throw Error(`Component for ${this.name} has already been provided`);if(this.component=e,!!this.shouldAutoInitialize()){if(Gv(e))try{this.getOrInitializeService({instanceIdentifier:jt})}catch{}for(const[n,s]of this.instancesDeferred.entries()){const i=this.normalizeInstanceIdentifier(n);try{const r=this.getOrInitializeService({instanceIdentifier:i});s.resolve(r)}catch{}}}}clearInstance(e=jt){this.instancesDeferred.delete(e),this.instancesOptions.delete(e),this.instances.delete(e)}async delete(){const e=Array.from(this.instances.values());await Promise.all([...e.filter(n=>"INTERNAL"in n).map(n=>n.INTERNAL.delete()),...e.filter(n=>"_delete"in n).map(n=>n._delete())])}isComponentSet(){return this.component!=null}isInitialized(e=jt){return this.instances.has(e)}getOptions(e=jt){return this.instancesOptions.get(e)||{}}initialize(e={}){const{options:n={}}=e,s=this.normalizeInstanceIdentifier(e.instanceIdentifier);if(this.isInitialized(s))throw Error(`${this.name}(${s}) has already been initialized`);if(!this.isComponentSet())throw Error(`Component ${this.name} has not been registered yet`);const i=this.getOrInitializeService({instanceIdentifier:s,options:n});for(const[r,o]of this.instancesDeferred.entries()){const a=this.normalizeInstanceIdentifier(r);s===a&&o.resolve(i)}return i}onInit(e,n){const s=this.normalizeInstanceIdentifier(n),i=this.onInitCallbacks.get(s)??new Set;i.add(e),this.onInitCallbacks.set(s,i);const r=this.instances.get(s);return r&&e(r,s),()=>{i.delete(e)}}invokeOnInitCallbacks(e,n){const s=this.onInitCallbacks.get(n);if(s)for(const i of s)try{i(e,n)}catch{}}getOrInitializeService({instanceIdentifier:e,options:n={}}){let s=this.instances.get(e);if(!s&&this.component&&(s=this.component.instanceFactory(this.container,{instanceIdentifier:jv(e),options:n}),this.instances.set(e,s),this.instancesOptions.set(e,n),this.invokeOnInitCallbacks(s,e),this.component.onInstanceCreated))try{this.component.onInstanceCreated(this.container,e,s)}catch{}return s||null}normalizeInstanceIdentifier(e=jt){return this.component?this.component.multipleInstances?e:jt:e}shouldAutoInitialize(){return!!this.component&&this.component.instantiationMode!=="EXPLICIT"}}function jv(t){return t===jt?void 0:t}function Gv(t){return t.instantiationMode==="EAGER"}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class zv{constructor(e){this.name=e,this.providers=new Map}addComponent(e){const n=this.getProvider(e.name);if(n.isComponentSet())throw new Error(`Component ${e.name} has already been registered with ${this.name}`);n.setComponent(e)}addOrOverwriteComponent(e){this.getProvider(e.name).isComponentSet()&&this.providers.delete(e.name),this.addComponent(e)}getProvider(e){if(this.providers.has(e))return this.providers.get(e);const n=new Vv(e,this);return this.providers.set(e,n),n}getProviders(){return Array.from(this.providers.values())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var L;(function(t){t[t.DEBUG=0]="DEBUG",t[t.VERBOSE=1]="VERBOSE",t[t.INFO=2]="INFO",t[t.WARN=3]="WARN",t[t.ERROR=4]="ERROR",t[t.SILENT=5]="SILENT"})(L||(L={}));const qv={debug:L.DEBUG,verbose:L.VERBOSE,info:L.INFO,warn:L.WARN,error:L.ERROR,silent:L.SILENT},Yv=L.INFO,Kv={[L.DEBUG]:"log",[L.VERBOSE]:"log",[L.INFO]:"info",[L.WARN]:"warn",[L.ERROR]:"error"},Jv=(t,e,...n)=>{if(e<t.logLevel)return;const s=new Date().toISOString(),i=Kv[e];if(i)console[i](`[${s}]  ${t.name}:`,...n);else throw new Error(`Attempted to log a message with an invalid logType (value: ${e})`)};class Ba{constructor(e){this.name=e,this._logLevel=Yv,this._logHandler=Jv,this._userLogHandler=null}get logLevel(){return this._logLevel}set logLevel(e){if(!(e in L))throw new TypeError(`Invalid value "${e}" assigned to \`logLevel\``);this._logLevel=e}setLogLevel(e){this._logLevel=typeof e=="string"?qv[e]:e}get logHandler(){return this._logHandler}set logHandler(e){if(typeof e!="function")throw new TypeError("Value assigned to `logHandler` must be a function");this._logHandler=e}get userLogHandler(){return this._userLogHandler}set userLogHandler(e){this._userLogHandler=e}debug(...e){this._userLogHandler&&this._userLogHandler(this,L.DEBUG,...e),this._logHandler(this,L.DEBUG,...e)}log(...e){this._userLogHandler&&this._userLogHandler(this,L.VERBOSE,...e),this._logHandler(this,L.VERBOSE,...e)}info(...e){this._userLogHandler&&this._userLogHandler(this,L.INFO,...e),this._logHandler(this,L.INFO,...e)}warn(...e){this._userLogHandler&&this._userLogHandler(this,L.WARN,...e),this._logHandler(this,L.WARN,...e)}error(...e){this._userLogHandler&&this._userLogHandler(this,L.ERROR,...e),this._logHandler(this,L.ERROR,...e)}}const Qv=(t,e)=>e.some(n=>t instanceof n);let au,cu;function Xv(){return au||(au=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])}function Zv(){return cu||(cu=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])}const Dh=new WeakMap,Wo=new WeakMap,Mh=new WeakMap,oo=new WeakMap,Ha=new WeakMap;function ew(t){const e=new Promise((n,s)=>{const i=()=>{t.removeEventListener("success",r),t.removeEventListener("error",o)},r=()=>{n(Tt(t.result)),i()},o=()=>{s(t.error),i()};t.addEventListener("success",r),t.addEventListener("error",o)});return e.then(n=>{n instanceof IDBCursor&&Dh.set(n,t)}).catch(()=>{}),Ha.set(e,t),e}function tw(t){if(Wo.has(t))return;const e=new Promise((n,s)=>{const i=()=>{t.removeEventListener("complete",r),t.removeEventListener("error",o),t.removeEventListener("abort",o)},r=()=>{n(),i()},o=()=>{s(t.error||new DOMException("AbortError","AbortError")),i()};t.addEventListener("complete",r),t.addEventListener("error",o),t.addEventListener("abort",o)});Wo.set(t,e)}let Vo={get(t,e,n){if(t instanceof IDBTransaction){if(e==="done")return Wo.get(t);if(e==="objectStoreNames")return t.objectStoreNames||Mh.get(t);if(e==="store")return n.objectStoreNames[1]?void 0:n.objectStore(n.objectStoreNames[0])}return Tt(t[e])},set(t,e,n){return t[e]=n,!0},has(t,e){return t instanceof IDBTransaction&&(e==="done"||e==="store")?!0:e in t}};function nw(t){Vo=t(Vo)}function sw(t){return t===IDBDatabase.prototype.transaction&&!("objectStoreNames"in IDBTransaction.prototype)?function(e,...n){const s=t.call(ao(this),e,...n);return Mh.set(s,e.sort?e.sort():[e]),Tt(s)}:Zv().includes(t)?function(...e){return t.apply(ao(this),e),Tt(Dh.get(this))}:function(...e){return Tt(t.apply(ao(this),e))}}function iw(t){return typeof t=="function"?sw(t):(t instanceof IDBTransaction&&tw(t),Qv(t,Xv())?new Proxy(t,Vo):t)}function Tt(t){if(t instanceof IDBRequest)return ew(t);if(oo.has(t))return oo.get(t);const e=iw(t);return e!==t&&(oo.set(t,e),Ha.set(e,t)),e}const ao=t=>Ha.get(t);function rw(t,e,{blocked:n,upgrade:s,blocking:i,terminated:r}={}){const o=indexedDB.open(t,e),a=Tt(o);return s&&o.addEventListener("upgradeneeded",c=>{s(Tt(o.result),c.oldVersion,c.newVersion,Tt(o.transaction),c)}),n&&o.addEventListener("blocked",c=>n(c.oldVersion,c.newVersion,c)),a.then(c=>{r&&c.addEventListener("close",()=>r()),i&&c.addEventListener("versionchange",l=>i(l.oldVersion,l.newVersion,l))}).catch(()=>{}),a}const ow=["get","getKey","getAll","getAllKeys","count"],aw=["put","add","delete","clear"],co=new Map;function lu(t,e){if(!(t instanceof IDBDatabase&&!(e in t)&&typeof e=="string"))return;if(co.get(e))return co.get(e);const n=e.replace(/FromIndex$/,""),s=e!==n,i=aw.includes(n);if(!(n in(s?IDBIndex:IDBObjectStore).prototype)||!(i||ow.includes(n)))return;const r=async function(o,...a){const c=this.transaction(o,i?"readwrite":"readonly");let l=c.store;return s&&(l=l.index(a.shift())),(await Promise.all([l[n](...a),i&&c.done]))[0]};return co.set(e,r),r}nw(t=>({...t,get:(e,n,s)=>lu(e,n)||t.get(e,n,s),has:(e,n)=>!!lu(e,n)||t.has(e,n)}));/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class cw{constructor(e){this.container=e}getPlatformInfoString(){return this.container.getProviders().map(n=>{if(lw(n)){const s=n.getImmediate();return`${s.library}/${s.version}`}else return null}).filter(n=>n).join(" ")}}function lw(t){return t.getComponent()?.type==="VERSION"}const jo="@firebase/app",uu="0.14.4";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const lt=new Ba("@firebase/app"),uw="@firebase/app-compat",dw="@firebase/analytics-compat",hw="@firebase/analytics",fw="@firebase/app-check-compat",pw="@firebase/app-check",gw="@firebase/auth",mw="@firebase/auth-compat",_w="@firebase/database",yw="@firebase/data-connect",Ew="@firebase/database-compat",vw="@firebase/functions",ww="@firebase/functions-compat",bw="@firebase/installations",Sw="@firebase/installations-compat",Cw="@firebase/messaging",Iw="@firebase/messaging-compat",Tw="@firebase/performance",Rw="@firebase/performance-compat",kw="@firebase/remote-config",Aw="@firebase/remote-config-compat",Nw="@firebase/storage",Pw="@firebase/storage-compat",Lw="@firebase/firestore",Ow="@firebase/ai",Dw="@firebase/firestore-compat",Mw="firebase",xw="12.4.0";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Go="[DEFAULT]",Fw={[jo]:"fire-core",[uw]:"fire-core-compat",[hw]:"fire-analytics",[dw]:"fire-analytics-compat",[pw]:"fire-app-check",[fw]:"fire-app-check-compat",[gw]:"fire-auth",[mw]:"fire-auth-compat",[_w]:"fire-rtdb",[yw]:"fire-data-connect",[Ew]:"fire-rtdb-compat",[vw]:"fire-fn",[ww]:"fire-fn-compat",[bw]:"fire-iid",[Sw]:"fire-iid-compat",[Cw]:"fire-fcm",[Iw]:"fire-fcm-compat",[Tw]:"fire-perf",[Rw]:"fire-perf-compat",[kw]:"fire-rc",[Aw]:"fire-rc-compat",[Nw]:"fire-gcs",[Pw]:"fire-gcs-compat",[Lw]:"fire-fst",[Dw]:"fire-fst-compat",[Ow]:"fire-vertex","fire-js":"fire-js",[Mw]:"fire-js-all"};/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Vi=new Map,Uw=new Map,zo=new Map;function du(t,e){try{t.container.addComponent(e)}catch(n){lt.debug(`Component ${e.name} failed to register with FirebaseApp ${t.name}`,n)}}function Dn(t){const e=t.name;if(zo.has(e))return lt.debug(`There were multiple attempts to register component ${e}.`),!1;zo.set(e,t);for(const n of Vi.values())du(n,t);for(const n of Uw.values())du(n,t);return!0}function Wa(t,e){const n=t.container.getProvider("heartbeat").getImmediate({optional:!0});return n&&n.triggerHeartbeat(),t.container.getProvider(e)}function De(t){return t==null?!1:t.settings!==void 0}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const $w={"no-app":"No Firebase App '{$appName}' has been created - call initializeApp() first","bad-app-name":"Illegal App name: '{$appName}'","duplicate-app":"Firebase App named '{$appName}' already exists with different options or config","app-deleted":"Firebase App named '{$appName}' already deleted","server-app-deleted":"Firebase Server App has been deleted","no-options":"Need to provide options, when not being deployed to hosting via source.","invalid-app-argument":"firebase.{$appName}() takes either no argument or a Firebase App instance.","invalid-log-argument":"First argument to `onLog` must be null or a function.","idb-open":"Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.","idb-get":"Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.","idb-set":"Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.","idb-delete":"Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}.","finalization-registry-not-supported":"FirebaseServerApp deleteOnDeref field defined but the JS runtime does not support FinalizationRegistry.","invalid-server-app-environment":"FirebaseServerApp is not for use in browser environments."},Rt=new Zs("app","Firebase",$w);/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Bw{constructor(e,n,s){this._isDeleted=!1,this._options={...e},this._config={...n},this._name=n.name,this._automaticDataCollectionEnabled=n.automaticDataCollectionEnabled,this._container=s,this.container.addComponent(new on("app",()=>this,"PUBLIC"))}get automaticDataCollectionEnabled(){return this.checkDestroyed(),this._automaticDataCollectionEnabled}set automaticDataCollectionEnabled(e){this.checkDestroyed(),this._automaticDataCollectionEnabled=e}get name(){return this.checkDestroyed(),this._name}get options(){return this.checkDestroyed(),this._options}get config(){return this.checkDestroyed(),this._config}get container(){return this._container}get isDeleted(){return this._isDeleted}set isDeleted(e){this._isDeleted=e}checkDestroyed(){if(this.isDeleted)throw Rt.create("app-deleted",{appName:this._name})}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Xn=xw;function xh(t,e={}){let n=t;typeof e!="object"&&(e={name:e});const s={name:Go,automaticDataCollectionEnabled:!0,...e},i=s.name;if(typeof i!="string"||!i)throw Rt.create("bad-app-name",{appName:String(i)});if(n||(n=kh()),!n)throw Rt.create("no-options");const r=Vi.get(i);if(r){if(rn(n,r.options)&&rn(s,r.config))return r;throw Rt.create("duplicate-app",{appName:i})}const o=new zv(i);for(const c of zo.values())o.addComponent(c);const a=new Bw(n,s,o);return Vi.set(i,a),a}function Fh(t=Go){const e=Vi.get(t);if(!e&&t===Go&&kh())return xh();if(!e)throw Rt.create("no-app",{appName:t});return e}function kt(t,e,n){let s=Fw[t]??t;n&&(s+=`-${n}`);const i=s.match(/\s|\//),r=e.match(/\s|\//);if(i||r){const o=[`Unable to register library "${s}" with version "${e}":`];i&&o.push(`library name "${s}" contains illegal characters (whitespace or "/")`),i&&r&&o.push("and"),r&&o.push(`version name "${e}" contains illegal characters (whitespace or "/")`),lt.warn(o.join(" "));return}Dn(new on(`${s}-version`,()=>({library:s,version:e}),"VERSION"))}/**
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
 */const Hw="firebase-heartbeat-database",Ww=1,Ms="firebase-heartbeat-store";let lo=null;function Uh(){return lo||(lo=rw(Hw,Ww,{upgrade:(t,e)=>{switch(e){case 0:try{t.createObjectStore(Ms)}catch(n){console.warn(n)}}}}).catch(t=>{throw Rt.create("idb-open",{originalErrorMessage:t.message})})),lo}async function Vw(t){try{const n=(await Uh()).transaction(Ms),s=await n.objectStore(Ms).get($h(t));return await n.done,s}catch(e){if(e instanceof Ut)lt.warn(e.message);else{const n=Rt.create("idb-get",{originalErrorMessage:e?.message});lt.warn(n.message)}}}async function hu(t,e){try{const s=(await Uh()).transaction(Ms,"readwrite");await s.objectStore(Ms).put(e,$h(t)),await s.done}catch(n){if(n instanceof Ut)lt.warn(n.message);else{const s=Rt.create("idb-set",{originalErrorMessage:n?.message});lt.warn(s.message)}}}function $h(t){return`${t.name}!${t.options.appId}`}/**
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
 */const jw=1024,Gw=30;class zw{constructor(e){this.container=e,this._heartbeatsCache=null;const n=this.container.getProvider("app").getImmediate();this._storage=new Yw(n),this._heartbeatsCachePromise=this._storage.read().then(s=>(this._heartbeatsCache=s,s))}async triggerHeartbeat(){try{const n=this.container.getProvider("platform-logger").getImmediate().getPlatformInfoString(),s=fu();if(this._heartbeatsCache?.heartbeats==null&&(this._heartbeatsCache=await this._heartbeatsCachePromise,this._heartbeatsCache?.heartbeats==null)||this._heartbeatsCache.lastSentHeartbeatDate===s||this._heartbeatsCache.heartbeats.some(i=>i.date===s))return;if(this._heartbeatsCache.heartbeats.push({date:s,agent:n}),this._heartbeatsCache.heartbeats.length>Gw){const i=Kw(this._heartbeatsCache.heartbeats);this._heartbeatsCache.heartbeats.splice(i,1)}return this._storage.overwrite(this._heartbeatsCache)}catch(e){lt.warn(e)}}async getHeartbeatsHeader(){try{if(this._heartbeatsCache===null&&await this._heartbeatsCachePromise,this._heartbeatsCache?.heartbeats==null||this._heartbeatsCache.heartbeats.length===0)return"";const e=fu(),{heartbeatsToSend:n,unsentEntries:s}=qw(this._heartbeatsCache.heartbeats),i=Bi(JSON.stringify({version:2,heartbeats:n}));return this._heartbeatsCache.lastSentHeartbeatDate=e,s.length>0?(this._heartbeatsCache.heartbeats=s,await this._storage.overwrite(this._heartbeatsCache)):(this._heartbeatsCache.heartbeats=[],this._storage.overwrite(this._heartbeatsCache)),i}catch(e){return lt.warn(e),""}}}function fu(){return new Date().toISOString().substring(0,10)}function qw(t,e=jw){const n=[];let s=t.slice();for(const i of t){const r=n.find(o=>o.agent===i.agent);if(r){if(r.dates.push(i.date),pu(n)>e){r.dates.pop();break}}else if(n.push({agent:i.agent,dates:[i.date]}),pu(n)>e){n.pop();break}s=s.slice(1)}return{heartbeatsToSend:n,unsentEntries:s}}class Yw{constructor(e){this.app=e,this._canUseIndexedDBPromise=this.runIndexedDBEnvironmentCheck()}async runIndexedDBEnvironmentCheck(){return Pv()?Lv().then(()=>!0).catch(()=>!1):!1}async read(){if(await this._canUseIndexedDBPromise){const n=await Vw(this.app);return n?.heartbeats?n:{heartbeats:[]}}else return{heartbeats:[]}}async overwrite(e){if(await this._canUseIndexedDBPromise){const s=await this.read();return hu(this.app,{lastSentHeartbeatDate:e.lastSentHeartbeatDate??s.lastSentHeartbeatDate,heartbeats:e.heartbeats})}else return}async add(e){if(await this._canUseIndexedDBPromise){const s=await this.read();return hu(this.app,{lastSentHeartbeatDate:e.lastSentHeartbeatDate??s.lastSentHeartbeatDate,heartbeats:[...s.heartbeats,...e.heartbeats]})}else return}}function pu(t){return Bi(JSON.stringify({version:2,heartbeats:t})).length}function Kw(t){if(t.length===0)return-1;let e=0,n=t[0].date;for(let s=1;s<t.length;s++)t[s].date<n&&(n=t[s].date,e=s);return e}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Jw(t){Dn(new on("platform-logger",e=>new cw(e),"PRIVATE")),Dn(new on("heartbeat",e=>new zw(e),"PRIVATE")),kt(jo,uu,t),kt(jo,uu,"esm2020"),kt("fire-js","")}Jw("");var gu={};const mu="@firebase/database",_u="1.1.0";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Bh="";function Qw(t){Bh=t}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Xw{constructor(e){this.domStorage_=e,this.prefix_="firebase:"}set(e,n){n==null?this.domStorage_.removeItem(this.prefixedName_(e)):this.domStorage_.setItem(this.prefixedName_(e),Q(n))}get(e){const n=this.domStorage_.getItem(this.prefixedName_(e));return n==null?null:Ds(n)}remove(e){this.domStorage_.removeItem(this.prefixedName_(e))}prefixedName_(e){return this.prefix_+e}toString(){return this.domStorage_.toString()}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Zw{constructor(){this.cache_={},this.isInMemoryStorage=!0}set(e,n){n==null?delete this.cache_[e]:this.cache_[e]=n}get(e){return Qe(this.cache_,e)?this.cache_[e]:null}remove(e){delete this.cache_[e]}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Hh=function(t){try{if(typeof window<"u"&&typeof window[t]<"u"){const e=window[t];return e.setItem("firebase:sentinel","cache"),e.removeItem("firebase:sentinel"),new Xw(e)}}catch{}return new Zw},Jt=Hh("localStorage"),eb=Hh("sessionStorage");/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const En=new Ba("@firebase/database"),tb=(function(){let t=1;return function(){return t++}})(),Wh=function(t){const e=Wv(t),n=new Uv;n.update(e);const s=n.digest();return Fa.encodeByteArray(s)},ei=function(...t){let e="";for(let n=0;n<t.length;n++){const s=t[n];Array.isArray(s)||s&&typeof s=="object"&&typeof s.length=="number"?e+=ei.apply(null,s):typeof s=="object"?e+=Q(s):e+=s,e+=" "}return e};let vs=null,yu=!0;const nb=function(t,e){g(!0,"Can't turn on custom loggers persistently."),En.logLevel=L.VERBOSE,vs=En.log.bind(En)},se=function(...t){if(yu===!0&&(yu=!1,vs===null&&eb.get("logging_enabled")===!0&&nb()),vs){const e=ei.apply(null,t);vs(e)}},ti=function(t){return function(...e){se(t,...e)}},qo=function(...t){const e="FIREBASE INTERNAL ERROR: "+ei(...t);En.error(e)},ut=function(...t){const e=`FIREBASE FATAL ERROR: ${ei(...t)}`;throw En.error(e),new Error(e)},ge=function(...t){const e="FIREBASE WARNING: "+ei(...t);En.warn(e)},sb=function(){typeof window<"u"&&window.location&&window.location.protocol&&window.location.protocol.indexOf("https:")!==-1&&ge("Insecure Firebase access from a secure page. Please use https in calls to new Firebase().")},Va=function(t){return typeof t=="number"&&(t!==t||t===Number.POSITIVE_INFINITY||t===Number.NEGATIVE_INFINITY)},ib=function(t){if(document.readyState==="complete")t();else{let e=!1;const n=function(){if(!document.body){setTimeout(n,Math.floor(10));return}e||(e=!0,t())};document.addEventListener?(document.addEventListener("DOMContentLoaded",n,!1),window.addEventListener("load",n,!1)):document.attachEvent&&(document.attachEvent("onreadystatechange",()=>{document.readyState==="complete"&&n()}),window.attachEvent("onload",n))}},Mn="[MIN_NAME]",an="[MAX_NAME]",fn=function(t,e){if(t===e)return 0;if(t===Mn||e===an)return-1;if(e===Mn||t===an)return 1;{const n=Eu(t),s=Eu(e);return n!==null?s!==null?n-s===0?t.length-e.length:n-s:-1:s!==null?1:t<e?-1:1}},rb=function(t,e){return t===e?0:t<e?-1:1},cs=function(t,e){if(e&&t in e)return e[t];throw new Error("Missing required key ("+t+") in object: "+Q(e))},ja=function(t){if(typeof t!="object"||t===null)return Q(t);const e=[];for(const s in t)e.push(s);e.sort();let n="{";for(let s=0;s<e.length;s++)s!==0&&(n+=","),n+=Q(e[s]),n+=":",n+=ja(t[e[s]]);return n+="}",n},Vh=function(t,e){const n=t.length;if(n<=e)return[t];const s=[];for(let i=0;i<n;i+=e)i+e>n?s.push(t.substring(i,n)):s.push(t.substring(i,i+e));return s};function oe(t,e){for(const n in t)t.hasOwnProperty(n)&&e(n,t[n])}const jh=function(t){g(!Va(t),"Invalid JSON number");const e=11,n=52,s=(1<<e-1)-1;let i,r,o,a,c;t===0?(r=0,o=0,i=1/t===-1/0?1:0):(i=t<0,t=Math.abs(t),t>=Math.pow(2,1-s)?(a=Math.min(Math.floor(Math.log(t)/Math.LN2),s),r=a+s,o=Math.round(t*Math.pow(2,n-a)-Math.pow(2,n))):(r=0,o=Math.round(t/Math.pow(2,1-s-n))));const l=[];for(c=n;c;c-=1)l.push(o%2?1:0),o=Math.floor(o/2);for(c=e;c;c-=1)l.push(r%2?1:0),r=Math.floor(r/2);l.push(i?1:0),l.reverse();const u=l.join("");let d="";for(c=0;c<64;c+=8){let h=parseInt(u.substr(c,8),2).toString(16);h.length===1&&(h="0"+h),d=d+h}return d.toLowerCase()},ob=function(){return!!(typeof window=="object"&&window.chrome&&window.chrome.extension&&!/^chrome/.test(window.location.href))},ab=function(){return typeof Windows=="object"&&typeof Windows.UI=="object"};function cb(t,e){let n="Unknown Error";t==="too_big"?n="The data requested exceeds the maximum size that can be accessed with a single request.":t==="permission_denied"?n="Client doesn't have permission to access the desired data.":t==="unavailable"&&(n="The service is unavailable");const s=new Error(t+" at "+e._path.toString()+": "+n);return s.code=t.toUpperCase(),s}const lb=new RegExp("^-?(0*)\\d{1,10}$"),ub=-2147483648,db=2147483647,Eu=function(t){if(lb.test(t)){const e=Number(t);if(e>=ub&&e<=db)return e}return null},Zn=function(t){try{t()}catch(e){setTimeout(()=>{const n=e.stack||"";throw ge("Exception was thrown by user callback.",n),e},Math.floor(0))}},hb=function(){return(typeof window=="object"&&window.navigator&&window.navigator.userAgent||"").search(/googlebot|google webmaster tools|bingbot|yahoo! slurp|baiduspider|yandexbot|duckduckbot/i)>=0},ws=function(t,e){const n=setTimeout(t,e);return typeof n=="number"&&typeof Deno<"u"&&Deno.unrefTimer?Deno.unrefTimer(n):typeof n=="object"&&n.unref&&n.unref(),n};/**
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
 */class fb{constructor(e,n){this.appCheckProvider=n,this.appName=e.name,De(e)&&e.settings.appCheckToken&&(this.serverAppAppCheckToken=e.settings.appCheckToken),this.appCheck=n?.getImmediate({optional:!0}),this.appCheck||n?.get().then(s=>this.appCheck=s)}getToken(e){if(this.serverAppAppCheckToken){if(e)throw new Error("Attempted reuse of `FirebaseServerApp.appCheckToken` after previous usage failed.");return Promise.resolve({token:this.serverAppAppCheckToken})}return this.appCheck?this.appCheck.getToken(e):new Promise((n,s)=>{setTimeout(()=>{this.appCheck?this.getToken(e).then(n,s):n(null)},0)})}addTokenChangeListener(e){this.appCheckProvider?.get().then(n=>n.addTokenListener(e))}notifyForInvalidToken(){ge(`Provided AppCheck credentials for the app named "${this.appName}" are invalid. This usually indicates your app was not initialized correctly.`)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class pb{constructor(e,n,s){this.appName_=e,this.firebaseOptions_=n,this.authProvider_=s,this.auth_=null,this.auth_=s.getImmediate({optional:!0}),this.auth_||s.onInit(i=>this.auth_=i)}getToken(e){return this.auth_?this.auth_.getToken(e).catch(n=>n&&n.code==="auth/token-not-initialized"?(se("Got auth/token-not-initialized error.  Treating as null token."),null):Promise.reject(n)):new Promise((n,s)=>{setTimeout(()=>{this.auth_?this.getToken(e).then(n,s):n(null)},0)})}addTokenChangeListener(e){this.auth_?this.auth_.addAuthTokenListener(e):this.authProvider_.get().then(n=>n.addAuthTokenListener(e))}removeTokenChangeListener(e){this.authProvider_.get().then(n=>n.removeAuthTokenListener(e))}notifyForInvalidToken(){let e='Provided authentication credentials for the app named "'+this.appName_+'" are invalid. This usually indicates your app was not initialized correctly. ';"credential"in this.firebaseOptions_?e+='Make sure the "credential" property provided to initializeApp() is authorized to access the specified "databaseURL" and is from the correct project.':"serviceAccount"in this.firebaseOptions_?e+='Make sure the "serviceAccount" property provided to initializeApp() is authorized to access the specified "databaseURL" and is from the correct project.':e+='Make sure the "apiKey" and "databaseURL" properties provided to initializeApp() match the values provided for your app at https://console.firebase.google.com/.',ge(e)}}class Ti{constructor(e){this.accessToken=e}getToken(e){return Promise.resolve({accessToken:this.accessToken})}addTokenChangeListener(e){e(this.accessToken)}removeTokenChangeListener(e){}notifyForInvalidToken(){}}Ti.OWNER="owner";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ga="5",Gh="v",zh="s",qh="r",Yh="f",Kh=/(console\.firebase|firebase-console-\w+\.corp|firebase\.corp)\.google\.com/,Jh="ls",Qh="p",Yo="ac",Xh="websocket",Zh="long_polling";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ef{constructor(e,n,s,i,r=!1,o="",a=!1,c=!1,l=null){this.secure=n,this.namespace=s,this.webSocketOnly=i,this.nodeAdmin=r,this.persistenceKey=o,this.includeNamespaceInQueryParams=a,this.isUsingEmulator=c,this.emulatorOptions=l,this._host=e.toLowerCase(),this._domain=this._host.substr(this._host.indexOf(".")+1),this.internalHost=Jt.get("host:"+e)||this._host}isCacheableHost(){return this.internalHost.substr(0,2)==="s-"}isCustomHost(){return this._domain!=="firebaseio.com"&&this._domain!=="firebaseio-demo.com"}get host(){return this._host}set host(e){e!==this.internalHost&&(this.internalHost=e,this.isCacheableHost()&&Jt.set("host:"+this._host,this.internalHost))}toString(){let e=this.toURLString();return this.persistenceKey&&(e+="<"+this.persistenceKey+">"),e}toURLString(){const e=this.secure?"https://":"http://",n=this.includeNamespaceInQueryParams?`?ns=${this.namespace}`:"";return`${e}${this.host}/${n}`}}function gb(t){return t.host!==t.internalHost||t.isCustomHost()||t.includeNamespaceInQueryParams}function tf(t,e,n){g(typeof e=="string","typeof type must == string"),g(typeof n=="object","typeof params must == object");let s;if(e===Xh)s=(t.secure?"wss://":"ws://")+t.internalHost+"/.ws?";else if(e===Zh)s=(t.secure?"https://":"http://")+t.internalHost+"/.lp?";else throw new Error("Unknown connection type: "+e);gb(t)&&(n.ns=t.namespace);const i=[];return oe(n,(r,o)=>{i.push(r+"="+o)}),s+i.join("&")}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class mb{constructor(){this.counters_={}}incrementCounter(e,n=1){Qe(this.counters_,e)||(this.counters_[e]=0),this.counters_[e]+=n}get(){return _v(this.counters_)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const uo={},ho={};function za(t){const e=t.toString();return uo[e]||(uo[e]=new mb),uo[e]}function _b(t,e){const n=t.toString();return ho[n]||(ho[n]=e()),ho[n]}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class yb{constructor(e){this.onMessage_=e,this.pendingResponses=[],this.currentResponseNum=0,this.closeAfterResponse=-1,this.onClose=null}closeAfter(e,n){this.closeAfterResponse=e,this.onClose=n,this.closeAfterResponse<this.currentResponseNum&&(this.onClose(),this.onClose=null)}handleResponse(e,n){for(this.pendingResponses[e]=n;this.pendingResponses[this.currentResponseNum];){const s=this.pendingResponses[this.currentResponseNum];delete this.pendingResponses[this.currentResponseNum];for(let i=0;i<s.length;++i)s[i]&&Zn(()=>{this.onMessage_(s[i])});if(this.currentResponseNum===this.closeAfterResponse){this.onClose&&(this.onClose(),this.onClose=null);break}this.currentResponseNum++}}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const vu="start",Eb="close",vb="pLPCommand",wb="pRTLPCB",nf="id",sf="pw",rf="ser",bb="cb",Sb="seg",Cb="ts",Ib="d",Tb="dframe",of=1870,af=30,Rb=of-af,kb=25e3,Ab=3e4;class _n{constructor(e,n,s,i,r,o,a){this.connId=e,this.repoInfo=n,this.applicationId=s,this.appCheckToken=i,this.authToken=r,this.transportSessionId=o,this.lastSessionId=a,this.bytesSent=0,this.bytesReceived=0,this.everConnected_=!1,this.log_=ti(e),this.stats_=za(n),this.urlFn=c=>(this.appCheckToken&&(c[Yo]=this.appCheckToken),tf(n,Zh,c))}open(e,n){this.curSegmentNum=0,this.onDisconnect_=n,this.myPacketOrderer=new yb(e),this.isClosed_=!1,this.connectTimeoutTimer_=setTimeout(()=>{this.log_("Timed out trying to connect."),this.onClosed_(),this.connectTimeoutTimer_=null},Math.floor(Ab)),ib(()=>{if(this.isClosed_)return;this.scriptTagHolder=new qa((...r)=>{const[o,a,c,l,u]=r;if(this.incrementIncomingBytes_(r),!!this.scriptTagHolder)if(this.connectTimeoutTimer_&&(clearTimeout(this.connectTimeoutTimer_),this.connectTimeoutTimer_=null),this.everConnected_=!0,o===vu)this.id=a,this.password=c;else if(o===Eb)a?(this.scriptTagHolder.sendNewPolls=!1,this.myPacketOrderer.closeAfter(a,()=>{this.onClosed_()})):this.onClosed_();else throw new Error("Unrecognized command received: "+o)},(...r)=>{const[o,a]=r;this.incrementIncomingBytes_(r),this.myPacketOrderer.handleResponse(o,a)},()=>{this.onClosed_()},this.urlFn);const s={};s[vu]="t",s[rf]=Math.floor(Math.random()*1e8),this.scriptTagHolder.uniqueCallbackIdentifier&&(s[bb]=this.scriptTagHolder.uniqueCallbackIdentifier),s[Gh]=Ga,this.transportSessionId&&(s[zh]=this.transportSessionId),this.lastSessionId&&(s[Jh]=this.lastSessionId),this.applicationId&&(s[Qh]=this.applicationId),this.appCheckToken&&(s[Yo]=this.appCheckToken),typeof location<"u"&&location.hostname&&Kh.test(location.hostname)&&(s[qh]=Yh);const i=this.urlFn(s);this.log_("Connecting via long-poll to "+i),this.scriptTagHolder.addTag(i,()=>{})})}start(){this.scriptTagHolder.startLongPoll(this.id,this.password),this.addDisconnectPingFrame(this.id,this.password)}static forceAllow(){_n.forceAllow_=!0}static forceDisallow(){_n.forceDisallow_=!0}static isAvailable(){return _n.forceAllow_?!0:!_n.forceDisallow_&&typeof document<"u"&&document.createElement!=null&&!ob()&&!ab()}markConnectionHealthy(){}shutdown_(){this.isClosed_=!0,this.scriptTagHolder&&(this.scriptTagHolder.close(),this.scriptTagHolder=null),this.myDisconnFrame&&(document.body.removeChild(this.myDisconnFrame),this.myDisconnFrame=null),this.connectTimeoutTimer_&&(clearTimeout(this.connectTimeoutTimer_),this.connectTimeoutTimer_=null)}onClosed_(){this.isClosed_||(this.log_("Longpoll is closing itself"),this.shutdown_(),this.onDisconnect_&&(this.onDisconnect_(this.everConnected_),this.onDisconnect_=null))}close(){this.isClosed_||(this.log_("Longpoll is being closed."),this.shutdown_())}send(e){const n=Q(e);this.bytesSent+=n.length,this.stats_.incrementCounter("bytes_sent",n.length);const s=Ih(n),i=Vh(s,Rb);for(let r=0;r<i.length;r++)this.scriptTagHolder.enqueueSegment(this.curSegmentNum,i.length,i[r]),this.curSegmentNum++}addDisconnectPingFrame(e,n){this.myDisconnFrame=document.createElement("iframe");const s={};s[Tb]="t",s[nf]=e,s[sf]=n,this.myDisconnFrame.src=this.urlFn(s),this.myDisconnFrame.style.display="none",document.body.appendChild(this.myDisconnFrame)}incrementIncomingBytes_(e){const n=Q(e).length;this.bytesReceived+=n,this.stats_.incrementCounter("bytes_received",n)}}class qa{constructor(e,n,s,i){this.onDisconnect=s,this.urlFn=i,this.outstandingRequests=new Set,this.pendingSegs=[],this.currentSerial=Math.floor(Math.random()*1e8),this.sendNewPolls=!0;{this.uniqueCallbackIdentifier=tb(),window[vb+this.uniqueCallbackIdentifier]=e,window[wb+this.uniqueCallbackIdentifier]=n,this.myIFrame=qa.createIFrame_();let r="";this.myIFrame.src&&this.myIFrame.src.substr(0,11)==="javascript:"&&(r='<script>document.domain="'+document.domain+'";<\/script>');const o="<html><body>"+r+"</body></html>";try{this.myIFrame.doc.open(),this.myIFrame.doc.write(o),this.myIFrame.doc.close()}catch(a){se("frame writing exception"),a.stack&&se(a.stack),se(a)}}}static createIFrame_(){const e=document.createElement("iframe");if(e.style.display="none",document.body){document.body.appendChild(e);try{e.contentWindow.document||se("No IE domain setting required")}catch{const s=document.domain;e.src="javascript:void((function(){document.open();document.domain='"+s+"';document.close();})())"}}else throw"Document body has not initialized. Wait to initialize Firebase until after the document is ready.";return e.contentDocument?e.doc=e.contentDocument:e.contentWindow?e.doc=e.contentWindow.document:e.document&&(e.doc=e.document),e}close(){this.alive=!1,this.myIFrame&&(this.myIFrame.doc.body.textContent="",setTimeout(()=>{this.myIFrame!==null&&(document.body.removeChild(this.myIFrame),this.myIFrame=null)},Math.floor(0)));const e=this.onDisconnect;e&&(this.onDisconnect=null,e())}startLongPoll(e,n){for(this.myID=e,this.myPW=n,this.alive=!0;this.newRequest_(););}newRequest_(){if(this.alive&&this.sendNewPolls&&this.outstandingRequests.size<(this.pendingSegs.length>0?2:1)){this.currentSerial++;const e={};e[nf]=this.myID,e[sf]=this.myPW,e[rf]=this.currentSerial;let n=this.urlFn(e),s="",i=0;for(;this.pendingSegs.length>0&&this.pendingSegs[0].d.length+af+s.length<=of;){const o=this.pendingSegs.shift();s=s+"&"+Sb+i+"="+o.seg+"&"+Cb+i+"="+o.ts+"&"+Ib+i+"="+o.d,i++}return n=n+s,this.addLongPollTag_(n,this.currentSerial),!0}else return!1}enqueueSegment(e,n,s){this.pendingSegs.push({seg:e,ts:n,d:s}),this.alive&&this.newRequest_()}addLongPollTag_(e,n){this.outstandingRequests.add(n);const s=()=>{this.outstandingRequests.delete(n),this.newRequest_()},i=setTimeout(s,Math.floor(kb)),r=()=>{clearTimeout(i),s()};this.addTag(e,r)}addTag(e,n){setTimeout(()=>{try{if(!this.sendNewPolls)return;const s=this.myIFrame.doc.createElement("script");s.type="text/javascript",s.async=!0,s.src=e,s.onload=s.onreadystatechange=function(){const i=s.readyState;(!i||i==="loaded"||i==="complete")&&(s.onload=s.onreadystatechange=null,s.parentNode&&s.parentNode.removeChild(s),n())},s.onerror=()=>{se("Long-poll script failed to load: "+e),this.sendNewPolls=!1,this.close()},this.myIFrame.doc.body.appendChild(s)}catch{}},Math.floor(1))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Nb=16384,Pb=45e3;let ji=null;typeof MozWebSocket<"u"?ji=MozWebSocket:typeof WebSocket<"u"&&(ji=WebSocket);class Me{constructor(e,n,s,i,r,o,a){this.connId=e,this.applicationId=s,this.appCheckToken=i,this.authToken=r,this.keepaliveTimer=null,this.frames=null,this.totalFrames=0,this.bytesSent=0,this.bytesReceived=0,this.log_=ti(this.connId),this.stats_=za(n),this.connURL=Me.connectionURL_(n,o,a,i,s),this.nodeAdmin=n.nodeAdmin}static connectionURL_(e,n,s,i,r){const o={};return o[Gh]=Ga,typeof location<"u"&&location.hostname&&Kh.test(location.hostname)&&(o[qh]=Yh),n&&(o[zh]=n),s&&(o[Jh]=s),i&&(o[Yo]=i),r&&(o[Qh]=r),tf(e,Xh,o)}open(e,n){this.onDisconnect=n,this.onMessage=e,this.log_("Websocket connecting to "+this.connURL),this.everConnected_=!1,Jt.set("previous_websocket_failure",!0);try{let s;Nv(),this.mySock=new ji(this.connURL,[],s)}catch(s){this.log_("Error instantiating WebSocket.");const i=s.message||s.data;i&&this.log_(i),this.onClosed_();return}this.mySock.onopen=()=>{this.log_("Websocket connected."),this.everConnected_=!0},this.mySock.onclose=()=>{this.log_("Websocket connection was disconnected."),this.mySock=null,this.onClosed_()},this.mySock.onmessage=s=>{this.handleIncomingFrame(s)},this.mySock.onerror=s=>{this.log_("WebSocket error.  Closing connection.");const i=s.message||s.data;i&&this.log_(i),this.onClosed_()}}start(){}static forceDisallow(){Me.forceDisallow_=!0}static isAvailable(){let e=!1;if(typeof navigator<"u"&&navigator.userAgent){const n=/Android ([0-9]{0,}\.[0-9]{0,})/,s=navigator.userAgent.match(n);s&&s.length>1&&parseFloat(s[1])<4.4&&(e=!0)}return!e&&ji!==null&&!Me.forceDisallow_}static previouslyFailed(){return Jt.isInMemoryStorage||Jt.get("previous_websocket_failure")===!0}markConnectionHealthy(){Jt.remove("previous_websocket_failure")}appendFrame_(e){if(this.frames.push(e),this.frames.length===this.totalFrames){const n=this.frames.join("");this.frames=null;const s=Ds(n);this.onMessage(s)}}handleNewFrameCount_(e){this.totalFrames=e,this.frames=[]}extractFrameCount_(e){if(g(this.frames===null,"We already have a frame buffer"),e.length<=6){const n=Number(e);if(!isNaN(n))return this.handleNewFrameCount_(n),null}return this.handleNewFrameCount_(1),e}handleIncomingFrame(e){if(this.mySock===null)return;const n=e.data;if(this.bytesReceived+=n.length,this.stats_.incrementCounter("bytes_received",n.length),this.resetKeepAlive(),this.frames!==null)this.appendFrame_(n);else{const s=this.extractFrameCount_(n);s!==null&&this.appendFrame_(s)}}send(e){this.resetKeepAlive();const n=Q(e);this.bytesSent+=n.length,this.stats_.incrementCounter("bytes_sent",n.length);const s=Vh(n,Nb);s.length>1&&this.sendString_(String(s.length));for(let i=0;i<s.length;i++)this.sendString_(s[i])}shutdown_(){this.isClosed_=!0,this.keepaliveTimer&&(clearInterval(this.keepaliveTimer),this.keepaliveTimer=null),this.mySock&&(this.mySock.close(),this.mySock=null)}onClosed_(){this.isClosed_||(this.log_("WebSocket is closing itself"),this.shutdown_(),this.onDisconnect&&(this.onDisconnect(this.everConnected_),this.onDisconnect=null))}close(){this.isClosed_||(this.log_("WebSocket is being closed"),this.shutdown_())}resetKeepAlive(){clearInterval(this.keepaliveTimer),this.keepaliveTimer=setInterval(()=>{this.mySock&&this.sendString_("0"),this.resetKeepAlive()},Math.floor(Pb))}sendString_(e){try{this.mySock.send(e)}catch(n){this.log_("Exception thrown from WebSocket.send():",n.message||n.data,"Closing connection."),setTimeout(this.onClosed_.bind(this),0)}}}Me.responsesRequiredToBeHealthy=2;Me.healthyTimeout=3e4;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class xs{static get ALL_TRANSPORTS(){return[_n,Me]}static get IS_TRANSPORT_INITIALIZED(){return this.globalTransportInitialized_}constructor(e){this.initTransports_(e)}initTransports_(e){const n=Me&&Me.isAvailable();let s=n&&!Me.previouslyFailed();if(e.webSocketOnly&&(n||ge("wss:// URL used, but browser isn't known to support websockets.  Trying anyway."),s=!0),s)this.transports_=[Me];else{const i=this.transports_=[];for(const r of xs.ALL_TRANSPORTS)r&&r.isAvailable()&&i.push(r);xs.globalTransportInitialized_=!0}}initialTransport(){if(this.transports_.length>0)return this.transports_[0];throw new Error("No transports available")}upgradeTransport(){return this.transports_.length>1?this.transports_[1]:null}}xs.globalTransportInitialized_=!1;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Lb=6e4,Ob=5e3,Db=10*1024,Mb=100*1024,fo="t",wu="d",xb="s",bu="r",Fb="e",Su="o",Cu="a",Iu="n",Tu="p",Ub="h";class $b{constructor(e,n,s,i,r,o,a,c,l,u){this.id=e,this.repoInfo_=n,this.applicationId_=s,this.appCheckToken_=i,this.authToken_=r,this.onMessage_=o,this.onReady_=a,this.onDisconnect_=c,this.onKill_=l,this.lastSessionId=u,this.connectionCount=0,this.pendingDataMessages=[],this.state_=0,this.log_=ti("c:"+this.id+":"),this.transportManager_=new xs(n),this.log_("Connection created"),this.start_()}start_(){const e=this.transportManager_.initialTransport();this.conn_=new e(this.nextTransportId_(),this.repoInfo_,this.applicationId_,this.appCheckToken_,this.authToken_,null,this.lastSessionId),this.primaryResponsesRequired_=e.responsesRequiredToBeHealthy||0;const n=this.connReceiver_(this.conn_),s=this.disconnReceiver_(this.conn_);this.tx_=this.conn_,this.rx_=this.conn_,this.secondaryConn_=null,this.isHealthy_=!1,setTimeout(()=>{this.conn_&&this.conn_.open(n,s)},Math.floor(0));const i=e.healthyTimeout||0;i>0&&(this.healthyTimeout_=ws(()=>{this.healthyTimeout_=null,this.isHealthy_||(this.conn_&&this.conn_.bytesReceived>Mb?(this.log_("Connection exceeded healthy timeout but has received "+this.conn_.bytesReceived+" bytes.  Marking connection healthy."),this.isHealthy_=!0,this.conn_.markConnectionHealthy()):this.conn_&&this.conn_.bytesSent>Db?this.log_("Connection exceeded healthy timeout but has sent "+this.conn_.bytesSent+" bytes.  Leaving connection alive."):(this.log_("Closing unhealthy connection after timeout."),this.close()))},Math.floor(i)))}nextTransportId_(){return"c:"+this.id+":"+this.connectionCount++}disconnReceiver_(e){return n=>{e===this.conn_?this.onConnectionLost_(n):e===this.secondaryConn_?(this.log_("Secondary connection lost."),this.onSecondaryConnectionLost_()):this.log_("closing an old connection")}}connReceiver_(e){return n=>{this.state_!==2&&(e===this.rx_?this.onPrimaryMessageReceived_(n):e===this.secondaryConn_?this.onSecondaryMessageReceived_(n):this.log_("message on old connection"))}}sendRequest(e){const n={t:"d",d:e};this.sendData_(n)}tryCleanupConnection(){this.tx_===this.secondaryConn_&&this.rx_===this.secondaryConn_&&(this.log_("cleaning up and promoting a connection: "+this.secondaryConn_.connId),this.conn_=this.secondaryConn_,this.secondaryConn_=null)}onSecondaryControl_(e){if(fo in e){const n=e[fo];n===Cu?this.upgradeIfSecondaryHealthy_():n===bu?(this.log_("Got a reset on secondary, closing it"),this.secondaryConn_.close(),(this.tx_===this.secondaryConn_||this.rx_===this.secondaryConn_)&&this.close()):n===Su&&(this.log_("got pong on secondary."),this.secondaryResponsesRequired_--,this.upgradeIfSecondaryHealthy_())}}onSecondaryMessageReceived_(e){const n=cs("t",e),s=cs("d",e);if(n==="c")this.onSecondaryControl_(s);else if(n==="d")this.pendingDataMessages.push(s);else throw new Error("Unknown protocol layer: "+n)}upgradeIfSecondaryHealthy_(){this.secondaryResponsesRequired_<=0?(this.log_("Secondary connection is healthy."),this.isHealthy_=!0,this.secondaryConn_.markConnectionHealthy(),this.proceedWithUpgrade_()):(this.log_("sending ping on secondary."),this.secondaryConn_.send({t:"c",d:{t:Tu,d:{}}}))}proceedWithUpgrade_(){this.secondaryConn_.start(),this.log_("sending client ack on secondary"),this.secondaryConn_.send({t:"c",d:{t:Cu,d:{}}}),this.log_("Ending transmission on primary"),this.conn_.send({t:"c",d:{t:Iu,d:{}}}),this.tx_=this.secondaryConn_,this.tryCleanupConnection()}onPrimaryMessageReceived_(e){const n=cs("t",e),s=cs("d",e);n==="c"?this.onControl_(s):n==="d"&&this.onDataMessage_(s)}onDataMessage_(e){this.onPrimaryResponse_(),this.onMessage_(e)}onPrimaryResponse_(){this.isHealthy_||(this.primaryResponsesRequired_--,this.primaryResponsesRequired_<=0&&(this.log_("Primary connection is healthy."),this.isHealthy_=!0,this.conn_.markConnectionHealthy()))}onControl_(e){const n=cs(fo,e);if(wu in e){const s=e[wu];if(n===Ub){const i={...s};this.repoInfo_.isUsingEmulator&&(i.h=this.repoInfo_.host),this.onHandshake_(i)}else if(n===Iu){this.log_("recvd end transmission on primary"),this.rx_=this.secondaryConn_;for(let i=0;i<this.pendingDataMessages.length;++i)this.onDataMessage_(this.pendingDataMessages[i]);this.pendingDataMessages=[],this.tryCleanupConnection()}else n===xb?this.onConnectionShutdown_(s):n===bu?this.onReset_(s):n===Fb?qo("Server Error: "+s):n===Su?(this.log_("got pong on primary."),this.onPrimaryResponse_(),this.sendPingOnPrimaryIfNecessary_()):qo("Unknown control packet command: "+n)}}onHandshake_(e){const n=e.ts,s=e.v,i=e.h;this.sessionId=e.s,this.repoInfo_.host=i,this.state_===0&&(this.conn_.start(),this.onConnectionEstablished_(this.conn_,n),Ga!==s&&ge("Protocol version mismatch detected"),this.tryStartUpgrade_())}tryStartUpgrade_(){const e=this.transportManager_.upgradeTransport();e&&this.startUpgrade_(e)}startUpgrade_(e){this.secondaryConn_=new e(this.nextTransportId_(),this.repoInfo_,this.applicationId_,this.appCheckToken_,this.authToken_,this.sessionId),this.secondaryResponsesRequired_=e.responsesRequiredToBeHealthy||0;const n=this.connReceiver_(this.secondaryConn_),s=this.disconnReceiver_(this.secondaryConn_);this.secondaryConn_.open(n,s),ws(()=>{this.secondaryConn_&&(this.log_("Timed out trying to upgrade."),this.secondaryConn_.close())},Math.floor(Lb))}onReset_(e){this.log_("Reset packet received.  New host: "+e),this.repoInfo_.host=e,this.state_===1?this.close():(this.closeConnections_(),this.start_())}onConnectionEstablished_(e,n){this.log_("Realtime connection established."),this.conn_=e,this.state_=1,this.onReady_&&(this.onReady_(n,this.sessionId),this.onReady_=null),this.primaryResponsesRequired_===0?(this.log_("Primary connection is healthy."),this.isHealthy_=!0):ws(()=>{this.sendPingOnPrimaryIfNecessary_()},Math.floor(Ob))}sendPingOnPrimaryIfNecessary_(){!this.isHealthy_&&this.state_===1&&(this.log_("sending ping on primary."),this.sendData_({t:"c",d:{t:Tu,d:{}}}))}onSecondaryConnectionLost_(){const e=this.secondaryConn_;this.secondaryConn_=null,(this.tx_===e||this.rx_===e)&&this.close()}onConnectionLost_(e){this.conn_=null,!e&&this.state_===0?(this.log_("Realtime connection failed."),this.repoInfo_.isCacheableHost()&&(Jt.remove("host:"+this.repoInfo_.host),this.repoInfo_.internalHost=this.repoInfo_.host)):this.state_===1&&this.log_("Realtime connection lost."),this.close()}onConnectionShutdown_(e){this.log_("Connection shutdown command received. Shutting down..."),this.onKill_&&(this.onKill_(e),this.onKill_=null),this.onDisconnect_=null,this.close()}sendData_(e){if(this.state_!==1)throw"Connection is not connected";this.tx_.send(e)}close(){this.state_!==2&&(this.log_("Closing realtime connection."),this.state_=2,this.closeConnections_(),this.onDisconnect_&&(this.onDisconnect_(),this.onDisconnect_=null))}closeConnections_(){this.log_("Shutting down all connections"),this.conn_&&(this.conn_.close(),this.conn_=null),this.secondaryConn_&&(this.secondaryConn_.close(),this.secondaryConn_=null),this.healthyTimeout_&&(clearTimeout(this.healthyTimeout_),this.healthyTimeout_=null)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class cf{put(e,n,s,i){}merge(e,n,s,i){}refreshAuthToken(e){}refreshAppCheckToken(e){}onDisconnectPut(e,n,s){}onDisconnectMerge(e,n,s){}onDisconnectCancel(e,n){}reportStats(e){}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class lf{constructor(e){this.allowedEvents_=e,this.listeners_={},g(Array.isArray(e)&&e.length>0,"Requires a non-empty array")}trigger(e,...n){if(Array.isArray(this.listeners_[e])){const s=[...this.listeners_[e]];for(let i=0;i<s.length;i++)s[i].callback.apply(s[i].context,n)}}on(e,n,s){this.validateEventType_(e),this.listeners_[e]=this.listeners_[e]||[],this.listeners_[e].push({callback:n,context:s});const i=this.getInitialEvent(e);i&&n.apply(s,i)}off(e,n,s){this.validateEventType_(e);const i=this.listeners_[e]||[];for(let r=0;r<i.length;r++)if(i[r].callback===n&&(!s||s===i[r].context)){i.splice(r,1);return}}validateEventType_(e){g(this.allowedEvents_.find(n=>n===e),"Unknown event: "+e)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Gi extends lf{static getInstance(){return new Gi}constructor(){super(["online"]),this.online_=!0,typeof window<"u"&&typeof window.addEventListener<"u"&&!$a()&&(window.addEventListener("online",()=>{this.online_||(this.online_=!0,this.trigger("online",!0))},!1),window.addEventListener("offline",()=>{this.online_&&(this.online_=!1,this.trigger("online",!1))},!1))}getInitialEvent(e){return g(e==="online","Unknown event type: "+e),[this.online_]}currentlyOnline(){return this.online_}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ru=32,ku=768;class D{constructor(e,n){if(n===void 0){this.pieces_=e.split("/");let s=0;for(let i=0;i<this.pieces_.length;i++)this.pieces_[i].length>0&&(this.pieces_[s]=this.pieces_[i],s++);this.pieces_.length=s,this.pieceNum_=0}else this.pieces_=e,this.pieceNum_=n}toString(){let e="";for(let n=this.pieceNum_;n<this.pieces_.length;n++)this.pieces_[n]!==""&&(e+="/"+this.pieces_[n]);return e||"/"}}function P(){return new D("")}function T(t){return t.pieceNum_>=t.pieces_.length?null:t.pieces_[t.pieceNum_]}function Dt(t){return t.pieces_.length-t.pieceNum_}function F(t){let e=t.pieceNum_;return e<t.pieces_.length&&e++,new D(t.pieces_,e)}function Ya(t){return t.pieceNum_<t.pieces_.length?t.pieces_[t.pieces_.length-1]:null}function Bb(t){let e="";for(let n=t.pieceNum_;n<t.pieces_.length;n++)t.pieces_[n]!==""&&(e+="/"+encodeURIComponent(String(t.pieces_[n])));return e||"/"}function Fs(t,e=0){return t.pieces_.slice(t.pieceNum_+e)}function uf(t){if(t.pieceNum_>=t.pieces_.length)return null;const e=[];for(let n=t.pieceNum_;n<t.pieces_.length-1;n++)e.push(t.pieces_[n]);return new D(e,0)}function G(t,e){const n=[];for(let s=t.pieceNum_;s<t.pieces_.length;s++)n.push(t.pieces_[s]);if(e instanceof D)for(let s=e.pieceNum_;s<e.pieces_.length;s++)n.push(e.pieces_[s]);else{const s=e.split("/");for(let i=0;i<s.length;i++)s[i].length>0&&n.push(s[i])}return new D(n,0)}function k(t){return t.pieceNum_>=t.pieces_.length}function pe(t,e){const n=T(t),s=T(e);if(n===null)return e;if(n===s)return pe(F(t),F(e));throw new Error("INTERNAL ERROR: innerPath ("+e+") is not within outerPath ("+t+")")}function Hb(t,e){const n=Fs(t,0),s=Fs(e,0);for(let i=0;i<n.length&&i<s.length;i++){const r=fn(n[i],s[i]);if(r!==0)return r}return n.length===s.length?0:n.length<s.length?-1:1}function Ka(t,e){if(Dt(t)!==Dt(e))return!1;for(let n=t.pieceNum_,s=e.pieceNum_;n<=t.pieces_.length;n++,s++)if(t.pieces_[n]!==e.pieces_[s])return!1;return!0}function Te(t,e){let n=t.pieceNum_,s=e.pieceNum_;if(Dt(t)>Dt(e))return!1;for(;n<t.pieces_.length;){if(t.pieces_[n]!==e.pieces_[s])return!1;++n,++s}return!0}class Wb{constructor(e,n){this.errorPrefix_=n,this.parts_=Fs(e,0),this.byteLength_=Math.max(1,this.parts_.length);for(let s=0;s<this.parts_.length;s++)this.byteLength_+=Tr(this.parts_[s]);df(this)}}function Vb(t,e){t.parts_.length>0&&(t.byteLength_+=1),t.parts_.push(e),t.byteLength_+=Tr(e),df(t)}function jb(t){const e=t.parts_.pop();t.byteLength_-=Tr(e),t.parts_.length>0&&(t.byteLength_-=1)}function df(t){if(t.byteLength_>ku)throw new Error(t.errorPrefix_+"has a key path longer than "+ku+" bytes ("+t.byteLength_+").");if(t.parts_.length>Ru)throw new Error(t.errorPrefix_+"path specified exceeds the maximum depth that can be written ("+Ru+") or object contains a cycle "+Gt(t))}function Gt(t){return t.parts_.length===0?"":"in property '"+t.parts_.join(".")+"'"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ja extends lf{static getInstance(){return new Ja}constructor(){super(["visible"]);let e,n;typeof document<"u"&&typeof document.addEventListener<"u"&&(typeof document.hidden<"u"?(n="visibilitychange",e="hidden"):typeof document.mozHidden<"u"?(n="mozvisibilitychange",e="mozHidden"):typeof document.msHidden<"u"?(n="msvisibilitychange",e="msHidden"):typeof document.webkitHidden<"u"&&(n="webkitvisibilitychange",e="webkitHidden")),this.visible_=!0,n&&document.addEventListener(n,()=>{const s=!document[e];s!==this.visible_&&(this.visible_=s,this.trigger("visible",s))},!1)}getInitialEvent(e){return g(e==="visible","Unknown event type: "+e),[this.visible_]}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ls=1e3,Gb=300*1e3,Au=30*1e3,zb=1.3,qb=3e4,Yb="server_kill",Nu=3;class at extends cf{constructor(e,n,s,i,r,o,a,c){if(super(),this.repoInfo_=e,this.applicationId_=n,this.onDataUpdate_=s,this.onConnectStatus_=i,this.onServerInfoUpdate_=r,this.authTokenProvider_=o,this.appCheckTokenProvider_=a,this.authOverride_=c,this.id=at.nextPersistentConnectionId_++,this.log_=ti("p:"+this.id+":"),this.interruptReasons_={},this.listens=new Map,this.outstandingPuts_=[],this.outstandingGets_=[],this.outstandingPutCount_=0,this.outstandingGetCount_=0,this.onDisconnectRequestQueue_=[],this.connected_=!1,this.reconnectDelay_=ls,this.maxReconnectDelay_=Gb,this.securityDebugCallback_=null,this.lastSessionId=null,this.establishConnectionTimer_=null,this.visible_=!1,this.requestCBHash_={},this.requestNumber_=0,this.realtime_=null,this.authToken_=null,this.appCheckToken_=null,this.forceTokenRefresh_=!1,this.invalidAuthTokenCount_=0,this.invalidAppCheckTokenCount_=0,this.firstConnection_=!0,this.lastConnectionAttemptTime_=null,this.lastConnectionEstablishedTime_=null,c)throw new Error("Auth override specified in options, but not supported on non Node.js platforms");Ja.getInstance().on("visible",this.onVisible_,this),e.host.indexOf("fblocal")===-1&&Gi.getInstance().on("online",this.onOnline_,this)}sendRequest(e,n,s){const i=++this.requestNumber_,r={r:i,a:e,b:n};this.log_(Q(r)),g(this.connected_,"sendRequest call when we're not connected not allowed."),this.realtime_.sendRequest(r),s&&(this.requestCBHash_[i]=s)}get(e){this.initConnection_();const n=new Xs,i={action:"g",request:{p:e._path.toString(),q:e._queryObject},onComplete:o=>{const a=o.d;o.s==="ok"?n.resolve(a):n.reject(a)}};this.outstandingGets_.push(i),this.outstandingGetCount_++;const r=this.outstandingGets_.length-1;return this.connected_&&this.sendGet_(r),n.promise}listen(e,n,s,i){this.initConnection_();const r=e._queryIdentifier,o=e._path.toString();this.log_("Listen called for "+o+" "+r),this.listens.has(o)||this.listens.set(o,new Map),g(e._queryParams.isDefault()||!e._queryParams.loadsAllData(),"listen() called for non-default but complete query"),g(!this.listens.get(o).has(r),"listen() called twice for same path/queryId.");const a={onComplete:i,hashFn:n,query:e,tag:s};this.listens.get(o).set(r,a),this.connected_&&this.sendListen_(a)}sendGet_(e){const n=this.outstandingGets_[e];this.sendRequest("g",n.request,s=>{delete this.outstandingGets_[e],this.outstandingGetCount_--,this.outstandingGetCount_===0&&(this.outstandingGets_=[]),n.onComplete&&n.onComplete(s)})}sendListen_(e){const n=e.query,s=n._path.toString(),i=n._queryIdentifier;this.log_("Listen on "+s+" for "+i);const r={p:s},o="q";e.tag&&(r.q=n._queryObject,r.t=e.tag),r.h=e.hashFn(),this.sendRequest(o,r,a=>{const c=a.d,l=a.s;at.warnOnListenWarnings_(c,n),(this.listens.get(s)&&this.listens.get(s).get(i))===e&&(this.log_("listen response",a),l!=="ok"&&this.removeListen_(s,i),e.onComplete&&e.onComplete(l,c))})}static warnOnListenWarnings_(e,n){if(e&&typeof e=="object"&&Qe(e,"w")){const s=On(e,"w");if(Array.isArray(s)&&~s.indexOf("no_index")){const i='".indexOn": "'+n._queryParams.getIndex().toString()+'"',r=n._path.toString();ge(`Using an unspecified index. Your data will be downloaded and filtered on the client. Consider adding ${i} at ${r} to your security rules for better performance.`)}}}refreshAuthToken(e){this.authToken_=e,this.log_("Auth token refreshed"),this.authToken_?this.tryAuth():this.connected_&&this.sendRequest("unauth",{},()=>{}),this.reduceReconnectDelayIfAdminCredential_(e)}reduceReconnectDelayIfAdminCredential_(e){(e&&e.length===40||Fv(e))&&(this.log_("Admin auth credential detected.  Reducing max reconnect time."),this.maxReconnectDelay_=Au)}refreshAppCheckToken(e){this.appCheckToken_=e,this.log_("App check token refreshed"),this.appCheckToken_?this.tryAppCheck():this.connected_&&this.sendRequest("unappeck",{},()=>{})}tryAuth(){if(this.connected_&&this.authToken_){const e=this.authToken_,n=xv(e)?"auth":"gauth",s={cred:e};this.authOverride_===null?s.noauth=!0:typeof this.authOverride_=="object"&&(s.authvar=this.authOverride_),this.sendRequest(n,s,i=>{const r=i.s,o=i.d||"error";this.authToken_===e&&(r==="ok"?this.invalidAuthTokenCount_=0:this.onAuthRevoked_(r,o))})}}tryAppCheck(){this.connected_&&this.appCheckToken_&&this.sendRequest("appcheck",{token:this.appCheckToken_},e=>{const n=e.s,s=e.d||"error";n==="ok"?this.invalidAppCheckTokenCount_=0:this.onAppCheckRevoked_(n,s)})}unlisten(e,n){const s=e._path.toString(),i=e._queryIdentifier;this.log_("Unlisten called for "+s+" "+i),g(e._queryParams.isDefault()||!e._queryParams.loadsAllData(),"unlisten() called for non-default but complete query"),this.removeListen_(s,i)&&this.connected_&&this.sendUnlisten_(s,i,e._queryObject,n)}sendUnlisten_(e,n,s,i){this.log_("Unlisten on "+e+" for "+n);const r={p:e},o="n";i&&(r.q=s,r.t=i),this.sendRequest(o,r)}onDisconnectPut(e,n,s){this.initConnection_(),this.connected_?this.sendOnDisconnect_("o",e,n,s):this.onDisconnectRequestQueue_.push({pathString:e,action:"o",data:n,onComplete:s})}onDisconnectMerge(e,n,s){this.initConnection_(),this.connected_?this.sendOnDisconnect_("om",e,n,s):this.onDisconnectRequestQueue_.push({pathString:e,action:"om",data:n,onComplete:s})}onDisconnectCancel(e,n){this.initConnection_(),this.connected_?this.sendOnDisconnect_("oc",e,null,n):this.onDisconnectRequestQueue_.push({pathString:e,action:"oc",data:null,onComplete:n})}sendOnDisconnect_(e,n,s,i){const r={p:n,d:s};this.log_("onDisconnect "+e,r),this.sendRequest(e,r,o=>{i&&setTimeout(()=>{i(o.s,o.d)},Math.floor(0))})}put(e,n,s,i){this.putInternal("p",e,n,s,i)}merge(e,n,s,i){this.putInternal("m",e,n,s,i)}putInternal(e,n,s,i,r){this.initConnection_();const o={p:n,d:s};r!==void 0&&(o.h=r),this.outstandingPuts_.push({action:e,request:o,onComplete:i}),this.outstandingPutCount_++;const a=this.outstandingPuts_.length-1;this.connected_?this.sendPut_(a):this.log_("Buffering put: "+n)}sendPut_(e){const n=this.outstandingPuts_[e].action,s=this.outstandingPuts_[e].request,i=this.outstandingPuts_[e].onComplete;this.outstandingPuts_[e].queued=this.connected_,this.sendRequest(n,s,r=>{this.log_(n+" response",r),delete this.outstandingPuts_[e],this.outstandingPutCount_--,this.outstandingPutCount_===0&&(this.outstandingPuts_=[]),i&&i(r.s,r.d)})}reportStats(e){if(this.connected_){const n={c:e};this.log_("reportStats",n),this.sendRequest("s",n,s=>{if(s.s!=="ok"){const r=s.d;this.log_("reportStats","Error sending stats: "+r)}})}}onDataMessage_(e){if("r"in e){this.log_("from server: "+Q(e));const n=e.r,s=this.requestCBHash_[n];s&&(delete this.requestCBHash_[n],s(e.b))}else{if("error"in e)throw"A server-side error has occurred: "+e.error;"a"in e&&this.onDataPush_(e.a,e.b)}}onDataPush_(e,n){this.log_("handleServerMessage",e,n),e==="d"?this.onDataUpdate_(n.p,n.d,!1,n.t):e==="m"?this.onDataUpdate_(n.p,n.d,!0,n.t):e==="c"?this.onListenRevoked_(n.p,n.q):e==="ac"?this.onAuthRevoked_(n.s,n.d):e==="apc"?this.onAppCheckRevoked_(n.s,n.d):e==="sd"?this.onSecurityDebugPacket_(n):qo("Unrecognized action received from server: "+Q(e)+`
Are you using the latest client?`)}onReady_(e,n){this.log_("connection ready"),this.connected_=!0,this.lastConnectionEstablishedTime_=new Date().getTime(),this.handleTimestamp_(e),this.lastSessionId=n,this.firstConnection_&&this.sendConnectStats_(),this.restoreState_(),this.firstConnection_=!1,this.onConnectStatus_(!0)}scheduleConnect_(e){g(!this.realtime_,"Scheduling a connect when we're already connected/ing?"),this.establishConnectionTimer_&&clearTimeout(this.establishConnectionTimer_),this.establishConnectionTimer_=setTimeout(()=>{this.establishConnectionTimer_=null,this.establishConnection_()},Math.floor(e))}initConnection_(){!this.realtime_&&this.firstConnection_&&this.scheduleConnect_(0)}onVisible_(e){e&&!this.visible_&&this.reconnectDelay_===this.maxReconnectDelay_&&(this.log_("Window became visible.  Reducing delay."),this.reconnectDelay_=ls,this.realtime_||this.scheduleConnect_(0)),this.visible_=e}onOnline_(e){e?(this.log_("Browser went online."),this.reconnectDelay_=ls,this.realtime_||this.scheduleConnect_(0)):(this.log_("Browser went offline.  Killing connection."),this.realtime_&&this.realtime_.close())}onRealtimeDisconnect_(){if(this.log_("data client disconnected"),this.connected_=!1,this.realtime_=null,this.cancelSentTransactions_(),this.requestCBHash_={},this.shouldReconnect_()){this.visible_?this.lastConnectionEstablishedTime_&&(new Date().getTime()-this.lastConnectionEstablishedTime_>qb&&(this.reconnectDelay_=ls),this.lastConnectionEstablishedTime_=null):(this.log_("Window isn't visible.  Delaying reconnect."),this.reconnectDelay_=this.maxReconnectDelay_,this.lastConnectionAttemptTime_=new Date().getTime());const e=Math.max(0,new Date().getTime()-this.lastConnectionAttemptTime_);let n=Math.max(0,this.reconnectDelay_-e);n=Math.random()*n,this.log_("Trying to reconnect in "+n+"ms"),this.scheduleConnect_(n),this.reconnectDelay_=Math.min(this.maxReconnectDelay_,this.reconnectDelay_*zb)}this.onConnectStatus_(!1)}async establishConnection_(){if(this.shouldReconnect_()){this.log_("Making a connection attempt"),this.lastConnectionAttemptTime_=new Date().getTime(),this.lastConnectionEstablishedTime_=null;const e=this.onDataMessage_.bind(this),n=this.onReady_.bind(this),s=this.onRealtimeDisconnect_.bind(this),i=this.id+":"+at.nextConnectionId_++,r=this.lastSessionId;let o=!1,a=null;const c=function(){a?a.close():(o=!0,s())},l=function(d){g(a,"sendRequest call when we're not connected not allowed."),a.sendRequest(d)};this.realtime_={close:c,sendRequest:l};const u=this.forceTokenRefresh_;this.forceTokenRefresh_=!1;try{const[d,h]=await Promise.all([this.authTokenProvider_.getToken(u),this.appCheckTokenProvider_.getToken(u)]);o?se("getToken() completed but was canceled"):(se("getToken() completed. Creating connection."),this.authToken_=d&&d.accessToken,this.appCheckToken_=h&&h.token,a=new $b(i,this.repoInfo_,this.applicationId_,this.appCheckToken_,this.authToken_,e,n,s,f=>{ge(f+" ("+this.repoInfo_.toString()+")"),this.interrupt(Yb)},r))}catch(d){this.log_("Failed to get token: "+d),o||(this.repoInfo_.nodeAdmin&&ge(d),c())}}}interrupt(e){se("Interrupting connection for reason: "+e),this.interruptReasons_[e]=!0,this.realtime_?this.realtime_.close():(this.establishConnectionTimer_&&(clearTimeout(this.establishConnectionTimer_),this.establishConnectionTimer_=null),this.connected_&&this.onRealtimeDisconnect_())}resume(e){se("Resuming connection for reason: "+e),delete this.interruptReasons_[e],Ho(this.interruptReasons_)&&(this.reconnectDelay_=ls,this.realtime_||this.scheduleConnect_(0))}handleTimestamp_(e){const n=e-new Date().getTime();this.onServerInfoUpdate_({serverTimeOffset:n})}cancelSentTransactions_(){for(let e=0;e<this.outstandingPuts_.length;e++){const n=this.outstandingPuts_[e];n&&"h"in n.request&&n.queued&&(n.onComplete&&n.onComplete("disconnect"),delete this.outstandingPuts_[e],this.outstandingPutCount_--)}this.outstandingPutCount_===0&&(this.outstandingPuts_=[])}onListenRevoked_(e,n){let s;n?s=n.map(r=>ja(r)).join("$"):s="default";const i=this.removeListen_(e,s);i&&i.onComplete&&i.onComplete("permission_denied")}removeListen_(e,n){const s=new D(e).toString();let i;if(this.listens.has(s)){const r=this.listens.get(s);i=r.get(n),r.delete(n),r.size===0&&this.listens.delete(s)}else i=void 0;return i}onAuthRevoked_(e,n){se("Auth token revoked: "+e+"/"+n),this.authToken_=null,this.forceTokenRefresh_=!0,this.realtime_.close(),(e==="invalid_token"||e==="permission_denied")&&(this.invalidAuthTokenCount_++,this.invalidAuthTokenCount_>=Nu&&(this.reconnectDelay_=Au,this.authTokenProvider_.notifyForInvalidToken()))}onAppCheckRevoked_(e,n){se("App check token revoked: "+e+"/"+n),this.appCheckToken_=null,this.forceTokenRefresh_=!0,(e==="invalid_token"||e==="permission_denied")&&(this.invalidAppCheckTokenCount_++,this.invalidAppCheckTokenCount_>=Nu&&this.appCheckTokenProvider_.notifyForInvalidToken())}onSecurityDebugPacket_(e){this.securityDebugCallback_?this.securityDebugCallback_(e):"msg"in e&&console.log("FIREBASE: "+e.msg.replace(`
`,`
FIREBASE: `))}restoreState_(){this.tryAuth(),this.tryAppCheck();for(const e of this.listens.values())for(const n of e.values())this.sendListen_(n);for(let e=0;e<this.outstandingPuts_.length;e++)this.outstandingPuts_[e]&&this.sendPut_(e);for(;this.onDisconnectRequestQueue_.length;){const e=this.onDisconnectRequestQueue_.shift();this.sendOnDisconnect_(e.action,e.pathString,e.data,e.onComplete)}for(let e=0;e<this.outstandingGets_.length;e++)this.outstandingGets_[e]&&this.sendGet_(e)}sendConnectStats_(){const e={};let n="js";e["sdk."+n+"."+Bh.replace(/\./g,"-")]=1,$a()?e["framework.cordova"]=1:Lh()&&(e["framework.reactnative"]=1),this.reportStats(e)}shouldReconnect_(){const e=Gi.getInstance().currentlyOnline();return Ho(this.interruptReasons_)&&e}}at.nextPersistentConnectionId_=0;at.nextConnectionId_=0;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
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
 */class Rr{getCompare(){return this.compare.bind(this)}indexedValueChanged(e,n){const s=new R(Mn,e),i=new R(Mn,n);return this.compare(s,i)!==0}minPost(){return R.MIN}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let mi;class hf extends Rr{static get __EMPTY_NODE(){return mi}static set __EMPTY_NODE(e){mi=e}compare(e,n){return fn(e.name,n.name)}isDefinedOn(e){throw Kn("KeyIndex.isDefinedOn not expected to be called.")}indexedValueChanged(e,n){return!1}minPost(){return R.MIN}maxPost(){return new R(an,mi)}makePost(e,n){return g(typeof e=="string","KeyIndex indexValue must always be a string."),new R(e,mi)}toString(){return".key"}}const vn=new hf;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class _i{constructor(e,n,s,i,r=null){this.isReverse_=i,this.resultGenerator_=r,this.nodeStack_=[];let o=1;for(;!e.isEmpty();)if(e=e,o=n?s(e.key,n):1,i&&(o*=-1),o<0)this.isReverse_?e=e.left:e=e.right;else if(o===0){this.nodeStack_.push(e);break}else this.nodeStack_.push(e),this.isReverse_?e=e.right:e=e.left}getNext(){if(this.nodeStack_.length===0)return null;let e=this.nodeStack_.pop(),n;if(this.resultGenerator_?n=this.resultGenerator_(e.key,e.value):n={key:e.key,value:e.value},this.isReverse_)for(e=e.left;!e.isEmpty();)this.nodeStack_.push(e),e=e.right;else for(e=e.right;!e.isEmpty();)this.nodeStack_.push(e),e=e.left;return n}hasNext(){return this.nodeStack_.length>0}peek(){if(this.nodeStack_.length===0)return null;const e=this.nodeStack_[this.nodeStack_.length-1];return this.resultGenerator_?this.resultGenerator_(e.key,e.value):{key:e.key,value:e.value}}}class Z{constructor(e,n,s,i,r){this.key=e,this.value=n,this.color=s??Z.RED,this.left=i??Ee.EMPTY_NODE,this.right=r??Ee.EMPTY_NODE}copy(e,n,s,i,r){return new Z(e??this.key,n??this.value,s??this.color,i??this.left,r??this.right)}count(){return this.left.count()+1+this.right.count()}isEmpty(){return!1}inorderTraversal(e){return this.left.inorderTraversal(e)||!!e(this.key,this.value)||this.right.inorderTraversal(e)}reverseTraversal(e){return this.right.reverseTraversal(e)||e(this.key,this.value)||this.left.reverseTraversal(e)}min_(){return this.left.isEmpty()?this:this.left.min_()}minKey(){return this.min_().key}maxKey(){return this.right.isEmpty()?this.key:this.right.maxKey()}insert(e,n,s){let i=this;const r=s(e,i.key);return r<0?i=i.copy(null,null,null,i.left.insert(e,n,s),null):r===0?i=i.copy(null,n,null,null,null):i=i.copy(null,null,null,null,i.right.insert(e,n,s)),i.fixUp_()}removeMin_(){if(this.left.isEmpty())return Ee.EMPTY_NODE;let e=this;return!e.left.isRed_()&&!e.left.left.isRed_()&&(e=e.moveRedLeft_()),e=e.copy(null,null,null,e.left.removeMin_(),null),e.fixUp_()}remove(e,n){let s,i;if(s=this,n(e,s.key)<0)!s.left.isEmpty()&&!s.left.isRed_()&&!s.left.left.isRed_()&&(s=s.moveRedLeft_()),s=s.copy(null,null,null,s.left.remove(e,n),null);else{if(s.left.isRed_()&&(s=s.rotateRight_()),!s.right.isEmpty()&&!s.right.isRed_()&&!s.right.left.isRed_()&&(s=s.moveRedRight_()),n(e,s.key)===0){if(s.right.isEmpty())return Ee.EMPTY_NODE;i=s.right.min_(),s=s.copy(i.key,i.value,null,null,s.right.removeMin_())}s=s.copy(null,null,null,null,s.right.remove(e,n))}return s.fixUp_()}isRed_(){return this.color}fixUp_(){let e=this;return e.right.isRed_()&&!e.left.isRed_()&&(e=e.rotateLeft_()),e.left.isRed_()&&e.left.left.isRed_()&&(e=e.rotateRight_()),e.left.isRed_()&&e.right.isRed_()&&(e=e.colorFlip_()),e}moveRedLeft_(){let e=this.colorFlip_();return e.right.left.isRed_()&&(e=e.copy(null,null,null,null,e.right.rotateRight_()),e=e.rotateLeft_(),e=e.colorFlip_()),e}moveRedRight_(){let e=this.colorFlip_();return e.left.left.isRed_()&&(e=e.rotateRight_(),e=e.colorFlip_()),e}rotateLeft_(){const e=this.copy(null,null,Z.RED,null,this.right.left);return this.right.copy(null,null,this.color,e,null)}rotateRight_(){const e=this.copy(null,null,Z.RED,this.left.right,null);return this.left.copy(null,null,this.color,null,e)}colorFlip_(){const e=this.left.copy(null,null,!this.left.color,null,null),n=this.right.copy(null,null,!this.right.color,null,null);return this.copy(null,null,!this.color,e,n)}checkMaxDepth_(){const e=this.check_();return Math.pow(2,e)<=this.count()+1}check_(){if(this.isRed_()&&this.left.isRed_())throw new Error("Red node has red child("+this.key+","+this.value+")");if(this.right.isRed_())throw new Error("Right child of ("+this.key+","+this.value+") is red");const e=this.left.check_();if(e!==this.right.check_())throw new Error("Black depths differ");return e+(this.isRed_()?0:1)}}Z.RED=!0;Z.BLACK=!1;class Kb{copy(e,n,s,i,r){return this}insert(e,n,s){return new Z(e,n,null)}remove(e,n){return this}count(){return 0}isEmpty(){return!0}inorderTraversal(e){return!1}reverseTraversal(e){return!1}minKey(){return null}maxKey(){return null}check_(){return 0}isRed_(){return!1}}class Ee{constructor(e,n=Ee.EMPTY_NODE){this.comparator_=e,this.root_=n}insert(e,n){return new Ee(this.comparator_,this.root_.insert(e,n,this.comparator_).copy(null,null,Z.BLACK,null,null))}remove(e){return new Ee(this.comparator_,this.root_.remove(e,this.comparator_).copy(null,null,Z.BLACK,null,null))}get(e){let n,s=this.root_;for(;!s.isEmpty();){if(n=this.comparator_(e,s.key),n===0)return s.value;n<0?s=s.left:n>0&&(s=s.right)}return null}getPredecessorKey(e){let n,s=this.root_,i=null;for(;!s.isEmpty();)if(n=this.comparator_(e,s.key),n===0){if(s.left.isEmpty())return i?i.key:null;for(s=s.left;!s.right.isEmpty();)s=s.right;return s.key}else n<0?s=s.left:n>0&&(i=s,s=s.right);throw new Error("Attempted to find predecessor key for a nonexistent key.  What gives?")}isEmpty(){return this.root_.isEmpty()}count(){return this.root_.count()}minKey(){return this.root_.minKey()}maxKey(){return this.root_.maxKey()}inorderTraversal(e){return this.root_.inorderTraversal(e)}reverseTraversal(e){return this.root_.reverseTraversal(e)}getIterator(e){return new _i(this.root_,null,this.comparator_,!1,e)}getIteratorFrom(e,n){return new _i(this.root_,e,this.comparator_,!1,n)}getReverseIteratorFrom(e,n){return new _i(this.root_,e,this.comparator_,!0,n)}getReverseIterator(e){return new _i(this.root_,null,this.comparator_,!0,e)}}Ee.EMPTY_NODE=new Kb;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Jb(t,e){return fn(t.name,e.name)}function Qa(t,e){return fn(t,e)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Ko;function Qb(t){Ko=t}const ff=function(t){return typeof t=="number"?"number:"+jh(t):"string:"+t},pf=function(t){if(t.isLeafNode()){const e=t.val();g(typeof e=="string"||typeof e=="number"||typeof e=="object"&&Qe(e,".sv"),"Priority must be a string or number.")}else g(t===Ko||t.isEmpty(),"priority of unexpected type.");g(t===Ko||t.getPriority().isEmpty(),"Priority nodes can't have a priority of their own.")};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Pu;class X{static set __childrenNodeConstructor(e){Pu=e}static get __childrenNodeConstructor(){return Pu}constructor(e,n=X.__childrenNodeConstructor.EMPTY_NODE){this.value_=e,this.priorityNode_=n,this.lazyHash_=null,g(this.value_!==void 0&&this.value_!==null,"LeafNode shouldn't be created with null/undefined value."),pf(this.priorityNode_)}isLeafNode(){return!0}getPriority(){return this.priorityNode_}updatePriority(e){return new X(this.value_,e)}getImmediateChild(e){return e===".priority"?this.priorityNode_:X.__childrenNodeConstructor.EMPTY_NODE}getChild(e){return k(e)?this:T(e)===".priority"?this.priorityNode_:X.__childrenNodeConstructor.EMPTY_NODE}hasChild(){return!1}getPredecessorChildName(e,n){return null}updateImmediateChild(e,n){return e===".priority"?this.updatePriority(n):n.isEmpty()&&e!==".priority"?this:X.__childrenNodeConstructor.EMPTY_NODE.updateImmediateChild(e,n).updatePriority(this.priorityNode_)}updateChild(e,n){const s=T(e);return s===null?n:n.isEmpty()&&s!==".priority"?this:(g(s!==".priority"||Dt(e)===1,".priority must be the last token in a path"),this.updateImmediateChild(s,X.__childrenNodeConstructor.EMPTY_NODE.updateChild(F(e),n)))}isEmpty(){return!1}numChildren(){return 0}forEachChild(e,n){return!1}val(e){return e&&!this.getPriority().isEmpty()?{".value":this.getValue(),".priority":this.getPriority().val()}:this.getValue()}hash(){if(this.lazyHash_===null){let e="";this.priorityNode_.isEmpty()||(e+="priority:"+ff(this.priorityNode_.val())+":");const n=typeof this.value_;e+=n+":",n==="number"?e+=jh(this.value_):e+=this.value_,this.lazyHash_=Wh(e)}return this.lazyHash_}getValue(){return this.value_}compareTo(e){return e===X.__childrenNodeConstructor.EMPTY_NODE?1:e instanceof X.__childrenNodeConstructor?-1:(g(e.isLeafNode(),"Unknown node type"),this.compareToLeafNode_(e))}compareToLeafNode_(e){const n=typeof e.value_,s=typeof this.value_,i=X.VALUE_TYPE_ORDER.indexOf(n),r=X.VALUE_TYPE_ORDER.indexOf(s);return g(i>=0,"Unknown leaf type: "+n),g(r>=0,"Unknown leaf type: "+s),i===r?s==="object"?0:this.value_<e.value_?-1:this.value_===e.value_?0:1:r-i}withIndex(){return this}isIndexed(){return!0}equals(e){if(e===this)return!0;if(e.isLeafNode()){const n=e;return this.value_===n.value_&&this.priorityNode_.equals(n.priorityNode_)}else return!1}}X.VALUE_TYPE_ORDER=["object","boolean","number","string"];/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let gf,mf;function Xb(t){gf=t}function Zb(t){mf=t}class eS extends Rr{compare(e,n){const s=e.node.getPriority(),i=n.node.getPriority(),r=s.compareTo(i);return r===0?fn(e.name,n.name):r}isDefinedOn(e){return!e.getPriority().isEmpty()}indexedValueChanged(e,n){return!e.getPriority().equals(n.getPriority())}minPost(){return R.MIN}maxPost(){return new R(an,new X("[PRIORITY-POST]",mf))}makePost(e,n){const s=gf(e);return new R(n,new X("[PRIORITY-POST]",s))}toString(){return".priority"}}const z=new eS;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const tS=Math.log(2);class nS{constructor(e){const n=r=>parseInt(Math.log(r)/tS,10),s=r=>parseInt(Array(r+1).join("1"),2);this.count=n(e+1),this.current_=this.count-1;const i=s(this.count);this.bits_=e+1&i}nextBitIsOne(){const e=!(this.bits_&1<<this.current_);return this.current_--,e}}const zi=function(t,e,n,s){t.sort(e);const i=function(c,l){const u=l-c;let d,h;if(u===0)return null;if(u===1)return d=t[c],h=n?n(d):d,new Z(h,d.node,Z.BLACK,null,null);{const f=parseInt(u/2,10)+c,p=i(c,f),E=i(f+1,l);return d=t[f],h=n?n(d):d,new Z(h,d.node,Z.BLACK,p,E)}},r=function(c){let l=null,u=null,d=t.length;const h=function(p,E){const m=d-p,A=d;d-=p;const N=i(m+1,A),ae=t[m],S=n?n(ae):ae;f(new Z(S,ae.node,E,null,N))},f=function(p){l?(l.left=p,l=p):(u=p,l=p)};for(let p=0;p<c.count;++p){const E=c.nextBitIsOne(),m=Math.pow(2,c.count-(p+1));E?h(m,Z.BLACK):(h(m,Z.BLACK),h(m,Z.RED))}return u},o=new nS(t.length),a=r(o);return new Ee(s||e,a)};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let po;const mn={};class nt{static get Default(){return g(mn&&z,"ChildrenNode.ts has not been loaded"),po=po||new nt({".priority":mn},{".priority":z}),po}constructor(e,n){this.indexes_=e,this.indexSet_=n}get(e){const n=On(this.indexes_,e);if(!n)throw new Error("No index defined for "+e);return n instanceof Ee?n:null}hasIndex(e){return Qe(this.indexSet_,e.toString())}addIndex(e,n){g(e!==vn,"KeyIndex always exists and isn't meant to be added to the IndexMap.");const s=[];let i=!1;const r=n.getIterator(R.Wrap);let o=r.getNext();for(;o;)i=i||e.isDefinedOn(o.node),s.push(o),o=r.getNext();let a;i?a=zi(s,e.getCompare()):a=mn;const c=e.toString(),l={...this.indexSet_};l[c]=e;const u={...this.indexes_};return u[c]=a,new nt(u,l)}addToIndexes(e,n){const s=Wi(this.indexes_,(i,r)=>{const o=On(this.indexSet_,r);if(g(o,"Missing index implementation for "+r),i===mn)if(o.isDefinedOn(e.node)){const a=[],c=n.getIterator(R.Wrap);let l=c.getNext();for(;l;)l.name!==e.name&&a.push(l),l=c.getNext();return a.push(e),zi(a,o.getCompare())}else return mn;else{const a=n.get(e.name);let c=i;return a&&(c=c.remove(new R(e.name,a))),c.insert(e,e.node)}});return new nt(s,this.indexSet_)}removeFromIndexes(e,n){const s=Wi(this.indexes_,i=>{if(i===mn)return i;{const r=n.get(e.name);return r?i.remove(new R(e.name,r)):i}});return new nt(s,this.indexSet_)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let us;class v{static get EMPTY_NODE(){return us||(us=new v(new Ee(Qa),null,nt.Default))}constructor(e,n,s){this.children_=e,this.priorityNode_=n,this.indexMap_=s,this.lazyHash_=null,this.priorityNode_&&pf(this.priorityNode_),this.children_.isEmpty()&&g(!this.priorityNode_||this.priorityNode_.isEmpty(),"An empty node cannot have a priority")}isLeafNode(){return!1}getPriority(){return this.priorityNode_||us}updatePriority(e){return this.children_.isEmpty()?this:new v(this.children_,e,this.indexMap_)}getImmediateChild(e){if(e===".priority")return this.getPriority();{const n=this.children_.get(e);return n===null?us:n}}getChild(e){const n=T(e);return n===null?this:this.getImmediateChild(n).getChild(F(e))}hasChild(e){return this.children_.get(e)!==null}updateImmediateChild(e,n){if(g(n,"We should always be passing snapshot nodes"),e===".priority")return this.updatePriority(n);{const s=new R(e,n);let i,r;n.isEmpty()?(i=this.children_.remove(e),r=this.indexMap_.removeFromIndexes(s,this.children_)):(i=this.children_.insert(e,n),r=this.indexMap_.addToIndexes(s,this.children_));const o=i.isEmpty()?us:this.priorityNode_;return new v(i,o,r)}}updateChild(e,n){const s=T(e);if(s===null)return n;{g(T(e)!==".priority"||Dt(e)===1,".priority must be the last token in a path");const i=this.getImmediateChild(s).updateChild(F(e),n);return this.updateImmediateChild(s,i)}}isEmpty(){return this.children_.isEmpty()}numChildren(){return this.children_.count()}val(e){if(this.isEmpty())return null;const n={};let s=0,i=0,r=!0;if(this.forEachChild(z,(o,a)=>{n[o]=a.val(e),s++,r&&v.INTEGER_REGEXP_.test(o)?i=Math.max(i,Number(o)):r=!1}),!e&&r&&i<2*s){const o=[];for(const a in n)o[a]=n[a];return o}else return e&&!this.getPriority().isEmpty()&&(n[".priority"]=this.getPriority().val()),n}hash(){if(this.lazyHash_===null){let e="";this.getPriority().isEmpty()||(e+="priority:"+ff(this.getPriority().val())+":"),this.forEachChild(z,(n,s)=>{const i=s.hash();i!==""&&(e+=":"+n+":"+i)}),this.lazyHash_=e===""?"":Wh(e)}return this.lazyHash_}getPredecessorChildName(e,n,s){const i=this.resolveIndex_(s);if(i){const r=i.getPredecessorKey(new R(e,n));return r?r.name:null}else return this.children_.getPredecessorKey(e)}getFirstChildName(e){const n=this.resolveIndex_(e);if(n){const s=n.minKey();return s&&s.name}else return this.children_.minKey()}getFirstChild(e){const n=this.getFirstChildName(e);return n?new R(n,this.children_.get(n)):null}getLastChildName(e){const n=this.resolveIndex_(e);if(n){const s=n.maxKey();return s&&s.name}else return this.children_.maxKey()}getLastChild(e){const n=this.getLastChildName(e);return n?new R(n,this.children_.get(n)):null}forEachChild(e,n){const s=this.resolveIndex_(e);return s?s.inorderTraversal(i=>n(i.name,i.node)):this.children_.inorderTraversal(n)}getIterator(e){return this.getIteratorFrom(e.minPost(),e)}getIteratorFrom(e,n){const s=this.resolveIndex_(n);if(s)return s.getIteratorFrom(e,i=>i);{const i=this.children_.getIteratorFrom(e.name,R.Wrap);let r=i.peek();for(;r!=null&&n.compare(r,e)<0;)i.getNext(),r=i.peek();return i}}getReverseIterator(e){return this.getReverseIteratorFrom(e.maxPost(),e)}getReverseIteratorFrom(e,n){const s=this.resolveIndex_(n);if(s)return s.getReverseIteratorFrom(e,i=>i);{const i=this.children_.getReverseIteratorFrom(e.name,R.Wrap);let r=i.peek();for(;r!=null&&n.compare(r,e)>0;)i.getNext(),r=i.peek();return i}}compareTo(e){return this.isEmpty()?e.isEmpty()?0:-1:e.isLeafNode()||e.isEmpty()?1:e===ni?-1:0}withIndex(e){if(e===vn||this.indexMap_.hasIndex(e))return this;{const n=this.indexMap_.addIndex(e,this.children_);return new v(this.children_,this.priorityNode_,n)}}isIndexed(e){return e===vn||this.indexMap_.hasIndex(e)}equals(e){if(e===this)return!0;if(e.isLeafNode())return!1;{const n=e;if(this.getPriority().equals(n.getPriority()))if(this.children_.count()===n.children_.count()){const s=this.getIterator(z),i=n.getIterator(z);let r=s.getNext(),o=i.getNext();for(;r&&o;){if(r.name!==o.name||!r.node.equals(o.node))return!1;r=s.getNext(),o=i.getNext()}return r===null&&o===null}else return!1;else return!1}}resolveIndex_(e){return e===vn?null:this.indexMap_.get(e.toString())}}v.INTEGER_REGEXP_=/^(0|[1-9]\d*)$/;class sS extends v{constructor(){super(new Ee(Qa),v.EMPTY_NODE,nt.Default)}compareTo(e){return e===this?0:1}equals(e){return e===this}getPriority(){return this}getImmediateChild(e){return v.EMPTY_NODE}isEmpty(){return!1}}const ni=new sS;Object.defineProperties(R,{MIN:{value:new R(Mn,v.EMPTY_NODE)},MAX:{value:new R(an,ni)}});hf.__EMPTY_NODE=v.EMPTY_NODE;X.__childrenNodeConstructor=v;Qb(ni);Zb(ni);/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const iS=!0;function J(t,e=null){if(t===null)return v.EMPTY_NODE;if(typeof t=="object"&&".priority"in t&&(e=t[".priority"]),g(e===null||typeof e=="string"||typeof e=="number"||typeof e=="object"&&".sv"in e,"Invalid priority type found: "+typeof e),typeof t=="object"&&".value"in t&&t[".value"]!==null&&(t=t[".value"]),typeof t!="object"||".sv"in t){const n=t;return new X(n,J(e))}if(!(t instanceof Array)&&iS){const n=[];let s=!1;if(oe(t,(o,a)=>{if(o.substring(0,1)!=="."){const c=J(a);c.isEmpty()||(s=s||!c.getPriority().isEmpty(),n.push(new R(o,c)))}}),n.length===0)return v.EMPTY_NODE;const r=zi(n,Jb,o=>o.name,Qa);if(s){const o=zi(n,z.getCompare());return new v(r,J(e),new nt({".priority":o},{".priority":z}))}else return new v(r,J(e),nt.Default)}else{let n=v.EMPTY_NODE;return oe(t,(s,i)=>{if(Qe(t,s)&&s.substring(0,1)!=="."){const r=J(i);(r.isLeafNode()||!r.isEmpty())&&(n=n.updateImmediateChild(s,r))}}),n.updatePriority(J(e))}}Xb(J);/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class rS extends Rr{constructor(e){super(),this.indexPath_=e,g(!k(e)&&T(e)!==".priority","Can't create PathIndex with empty path or .priority key")}extractChild(e){return e.getChild(this.indexPath_)}isDefinedOn(e){return!e.getChild(this.indexPath_).isEmpty()}compare(e,n){const s=this.extractChild(e.node),i=this.extractChild(n.node),r=s.compareTo(i);return r===0?fn(e.name,n.name):r}makePost(e,n){const s=J(e),i=v.EMPTY_NODE.updateChild(this.indexPath_,s);return new R(n,i)}maxPost(){const e=v.EMPTY_NODE.updateChild(this.indexPath_,ni);return new R(an,e)}toString(){return Fs(this.indexPath_,0).join("/")}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class oS extends Rr{compare(e,n){const s=e.node.compareTo(n.node);return s===0?fn(e.name,n.name):s}isDefinedOn(e){return!0}indexedValueChanged(e,n){return!e.equals(n)}minPost(){return R.MIN}maxPost(){return R.MAX}makePost(e,n){const s=J(e);return new R(n,s)}toString(){return".value"}}const aS=new oS;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function _f(t){return{type:"value",snapshotNode:t}}function xn(t,e){return{type:"child_added",snapshotNode:e,childName:t}}function Us(t,e){return{type:"child_removed",snapshotNode:e,childName:t}}function $s(t,e,n){return{type:"child_changed",snapshotNode:e,childName:t,oldSnap:n}}function cS(t,e){return{type:"child_moved",snapshotNode:e,childName:t}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Xa{constructor(e){this.index_=e}updateChild(e,n,s,i,r,o){g(e.isIndexed(this.index_),"A node must be indexed if only a child is updated");const a=e.getImmediateChild(n);return a.getChild(i).equals(s.getChild(i))&&a.isEmpty()===s.isEmpty()||(o!=null&&(s.isEmpty()?e.hasChild(n)?o.trackChildChange(Us(n,a)):g(e.isLeafNode(),"A child remove without an old child only makes sense on a leaf node"):a.isEmpty()?o.trackChildChange(xn(n,s)):o.trackChildChange($s(n,s,a))),e.isLeafNode()&&s.isEmpty())?e:e.updateImmediateChild(n,s).withIndex(this.index_)}updateFullNode(e,n,s){return s!=null&&(e.isLeafNode()||e.forEachChild(z,(i,r)=>{n.hasChild(i)||s.trackChildChange(Us(i,r))}),n.isLeafNode()||n.forEachChild(z,(i,r)=>{if(e.hasChild(i)){const o=e.getImmediateChild(i);o.equals(r)||s.trackChildChange($s(i,r,o))}else s.trackChildChange(xn(i,r))})),n.withIndex(this.index_)}updatePriority(e,n){return e.isEmpty()?v.EMPTY_NODE:e.updatePriority(n)}filtersNodes(){return!1}getIndexedFilter(){return this}getIndex(){return this.index_}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Bs{constructor(e){this.indexedFilter_=new Xa(e.getIndex()),this.index_=e.getIndex(),this.startPost_=Bs.getStartPost_(e),this.endPost_=Bs.getEndPost_(e),this.startIsInclusive_=!e.startAfterSet_,this.endIsInclusive_=!e.endBeforeSet_}getStartPost(){return this.startPost_}getEndPost(){return this.endPost_}matches(e){const n=this.startIsInclusive_?this.index_.compare(this.getStartPost(),e)<=0:this.index_.compare(this.getStartPost(),e)<0,s=this.endIsInclusive_?this.index_.compare(e,this.getEndPost())<=0:this.index_.compare(e,this.getEndPost())<0;return n&&s}updateChild(e,n,s,i,r,o){return this.matches(new R(n,s))||(s=v.EMPTY_NODE),this.indexedFilter_.updateChild(e,n,s,i,r,o)}updateFullNode(e,n,s){n.isLeafNode()&&(n=v.EMPTY_NODE);let i=n.withIndex(this.index_);i=i.updatePriority(v.EMPTY_NODE);const r=this;return n.forEachChild(z,(o,a)=>{r.matches(new R(o,a))||(i=i.updateImmediateChild(o,v.EMPTY_NODE))}),this.indexedFilter_.updateFullNode(e,i,s)}updatePriority(e,n){return e}filtersNodes(){return!0}getIndexedFilter(){return this.indexedFilter_}getIndex(){return this.index_}static getStartPost_(e){if(e.hasStart()){const n=e.getIndexStartName();return e.getIndex().makePost(e.getIndexStartValue(),n)}else return e.getIndex().minPost()}static getEndPost_(e){if(e.hasEnd()){const n=e.getIndexEndName();return e.getIndex().makePost(e.getIndexEndValue(),n)}else return e.getIndex().maxPost()}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class lS{constructor(e){this.withinDirectionalStart=n=>this.reverse_?this.withinEndPost(n):this.withinStartPost(n),this.withinDirectionalEnd=n=>this.reverse_?this.withinStartPost(n):this.withinEndPost(n),this.withinStartPost=n=>{const s=this.index_.compare(this.rangedFilter_.getStartPost(),n);return this.startIsInclusive_?s<=0:s<0},this.withinEndPost=n=>{const s=this.index_.compare(n,this.rangedFilter_.getEndPost());return this.endIsInclusive_?s<=0:s<0},this.rangedFilter_=new Bs(e),this.index_=e.getIndex(),this.limit_=e.getLimit(),this.reverse_=!e.isViewFromLeft(),this.startIsInclusive_=!e.startAfterSet_,this.endIsInclusive_=!e.endBeforeSet_}updateChild(e,n,s,i,r,o){return this.rangedFilter_.matches(new R(n,s))||(s=v.EMPTY_NODE),e.getImmediateChild(n).equals(s)?e:e.numChildren()<this.limit_?this.rangedFilter_.getIndexedFilter().updateChild(e,n,s,i,r,o):this.fullLimitUpdateChild_(e,n,s,r,o)}updateFullNode(e,n,s){let i;if(n.isLeafNode()||n.isEmpty())i=v.EMPTY_NODE.withIndex(this.index_);else if(this.limit_*2<n.numChildren()&&n.isIndexed(this.index_)){i=v.EMPTY_NODE.withIndex(this.index_);let r;this.reverse_?r=n.getReverseIteratorFrom(this.rangedFilter_.getEndPost(),this.index_):r=n.getIteratorFrom(this.rangedFilter_.getStartPost(),this.index_);let o=0;for(;r.hasNext()&&o<this.limit_;){const a=r.getNext();if(this.withinDirectionalStart(a))if(this.withinDirectionalEnd(a))i=i.updateImmediateChild(a.name,a.node),o++;else break;else continue}}else{i=n.withIndex(this.index_),i=i.updatePriority(v.EMPTY_NODE);let r;this.reverse_?r=i.getReverseIterator(this.index_):r=i.getIterator(this.index_);let o=0;for(;r.hasNext();){const a=r.getNext();o<this.limit_&&this.withinDirectionalStart(a)&&this.withinDirectionalEnd(a)?o++:i=i.updateImmediateChild(a.name,v.EMPTY_NODE)}}return this.rangedFilter_.getIndexedFilter().updateFullNode(e,i,s)}updatePriority(e,n){return e}filtersNodes(){return!0}getIndexedFilter(){return this.rangedFilter_.getIndexedFilter()}getIndex(){return this.index_}fullLimitUpdateChild_(e,n,s,i,r){let o;if(this.reverse_){const d=this.index_.getCompare();o=(h,f)=>d(f,h)}else o=this.index_.getCompare();const a=e;g(a.numChildren()===this.limit_,"");const c=new R(n,s),l=this.reverse_?a.getFirstChild(this.index_):a.getLastChild(this.index_),u=this.rangedFilter_.matches(c);if(a.hasChild(n)){const d=a.getImmediateChild(n);let h=i.getChildAfterChild(this.index_,l,this.reverse_);for(;h!=null&&(h.name===n||a.hasChild(h.name));)h=i.getChildAfterChild(this.index_,h,this.reverse_);const f=h==null?1:o(h,c);if(u&&!s.isEmpty()&&f>=0)return r?.trackChildChange($s(n,s,d)),a.updateImmediateChild(n,s);{r?.trackChildChange(Us(n,d));const E=a.updateImmediateChild(n,v.EMPTY_NODE);return h!=null&&this.rangedFilter_.matches(h)?(r?.trackChildChange(xn(h.name,h.node)),E.updateImmediateChild(h.name,h.node)):E}}else return s.isEmpty()?e:u&&o(l,c)>=0?(r!=null&&(r.trackChildChange(Us(l.name,l.node)),r.trackChildChange(xn(n,s))),a.updateImmediateChild(n,s).updateImmediateChild(l.name,v.EMPTY_NODE)):e}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Za{constructor(){this.limitSet_=!1,this.startSet_=!1,this.startNameSet_=!1,this.startAfterSet_=!1,this.endSet_=!1,this.endNameSet_=!1,this.endBeforeSet_=!1,this.limit_=0,this.viewFrom_="",this.indexStartValue_=null,this.indexStartName_="",this.indexEndValue_=null,this.indexEndName_="",this.index_=z}hasStart(){return this.startSet_}isViewFromLeft(){return this.viewFrom_===""?this.startSet_:this.viewFrom_==="l"}getIndexStartValue(){return g(this.startSet_,"Only valid if start has been set"),this.indexStartValue_}getIndexStartName(){return g(this.startSet_,"Only valid if start has been set"),this.startNameSet_?this.indexStartName_:Mn}hasEnd(){return this.endSet_}getIndexEndValue(){return g(this.endSet_,"Only valid if end has been set"),this.indexEndValue_}getIndexEndName(){return g(this.endSet_,"Only valid if end has been set"),this.endNameSet_?this.indexEndName_:an}hasLimit(){return this.limitSet_}hasAnchoredLimit(){return this.limitSet_&&this.viewFrom_!==""}getLimit(){return g(this.limitSet_,"Only valid if limit has been set"),this.limit_}getIndex(){return this.index_}loadsAllData(){return!(this.startSet_||this.endSet_||this.limitSet_)}isDefault(){return this.loadsAllData()&&this.index_===z}copy(){const e=new Za;return e.limitSet_=this.limitSet_,e.limit_=this.limit_,e.startSet_=this.startSet_,e.startAfterSet_=this.startAfterSet_,e.indexStartValue_=this.indexStartValue_,e.startNameSet_=this.startNameSet_,e.indexStartName_=this.indexStartName_,e.endSet_=this.endSet_,e.endBeforeSet_=this.endBeforeSet_,e.indexEndValue_=this.indexEndValue_,e.endNameSet_=this.endNameSet_,e.indexEndName_=this.indexEndName_,e.index_=this.index_,e.viewFrom_=this.viewFrom_,e}}function uS(t){return t.loadsAllData()?new Xa(t.getIndex()):t.hasLimit()?new lS(t):new Bs(t)}function Lu(t){const e={};if(t.isDefault())return e;let n;if(t.index_===z?n="$priority":t.index_===aS?n="$value":t.index_===vn?n="$key":(g(t.index_ instanceof rS,"Unrecognized index type!"),n=t.index_.toString()),e.orderBy=Q(n),t.startSet_){const s=t.startAfterSet_?"startAfter":"startAt";e[s]=Q(t.indexStartValue_),t.startNameSet_&&(e[s]+=","+Q(t.indexStartName_))}if(t.endSet_){const s=t.endBeforeSet_?"endBefore":"endAt";e[s]=Q(t.indexEndValue_),t.endNameSet_&&(e[s]+=","+Q(t.indexEndName_))}return t.limitSet_&&(t.isViewFromLeft()?e.limitToFirst=t.limit_:e.limitToLast=t.limit_),e}function Ou(t){const e={};if(t.startSet_&&(e.sp=t.indexStartValue_,t.startNameSet_&&(e.sn=t.indexStartName_),e.sin=!t.startAfterSet_),t.endSet_&&(e.ep=t.indexEndValue_,t.endNameSet_&&(e.en=t.indexEndName_),e.ein=!t.endBeforeSet_),t.limitSet_){e.l=t.limit_;let n=t.viewFrom_;n===""&&(t.isViewFromLeft()?n="l":n="r"),e.vf=n}return t.index_!==z&&(e.i=t.index_.toString()),e}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class qi extends cf{reportStats(e){throw new Error("Method not implemented.")}static getListenId_(e,n){return n!==void 0?"tag$"+n:(g(e._queryParams.isDefault(),"should have a tag if it's not a default query."),e._path.toString())}constructor(e,n,s,i){super(),this.repoInfo_=e,this.onDataUpdate_=n,this.authTokenProvider_=s,this.appCheckTokenProvider_=i,this.log_=ti("p:rest:"),this.listens_={}}listen(e,n,s,i){const r=e._path.toString();this.log_("Listen called for "+r+" "+e._queryIdentifier);const o=qi.getListenId_(e,s),a={};this.listens_[o]=a;const c=Lu(e._queryParams);this.restRequest_(r+".json",c,(l,u)=>{let d=u;if(l===404&&(d=null,l=null),l===null&&this.onDataUpdate_(r,d,!1,s),On(this.listens_,o)===a){let h;l?l===401?h="permission_denied":h="rest_error:"+l:h="ok",i(h,null)}})}unlisten(e,n){const s=qi.getListenId_(e,n);delete this.listens_[s]}get(e){const n=Lu(e._queryParams),s=e._path.toString(),i=new Xs;return this.restRequest_(s+".json",n,(r,o)=>{let a=o;r===404&&(a=null,r=null),r===null?(this.onDataUpdate_(s,a,!1,null),i.resolve(a)):i.reject(new Error(a))}),i.promise}refreshAuthToken(e){}restRequest_(e,n={},s){return n.format="export",Promise.all([this.authTokenProvider_.getToken(!1),this.appCheckTokenProvider_.getToken(!1)]).then(([i,r])=>{i&&i.accessToken&&(n.auth=i.accessToken),r&&r.token&&(n.ac=r.token);const o=(this.repoInfo_.secure?"https://":"http://")+this.repoInfo_.host+e+"?ns="+this.repoInfo_.namespace+Qn(n);this.log_("Sending REST request for "+o);const a=new XMLHttpRequest;a.onreadystatechange=()=>{if(s&&a.readyState===4){this.log_("REST Response for "+o+" received. status:",a.status,"response:",a.responseText);let c=null;if(a.status>=200&&a.status<300){try{c=Ds(a.responseText)}catch{ge("Failed to parse JSON response for "+o+": "+a.responseText)}s(null,c)}else a.status!==401&&a.status!==404&&ge("Got unsuccessful REST response for "+o+" Status: "+a.status),s(a.status);s=null}},a.open("GET",o,!0),a.send()})}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class dS{constructor(){this.rootNode_=v.EMPTY_NODE}getNode(e){return this.rootNode_.getChild(e)}updateSnapshot(e,n){this.rootNode_=this.rootNode_.updateChild(e,n)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Yi(){return{value:null,children:new Map}}function yf(t,e,n){if(k(e))t.value=n,t.children.clear();else if(t.value!==null)t.value=t.value.updateChild(e,n);else{const s=T(e);t.children.has(s)||t.children.set(s,Yi());const i=t.children.get(s);e=F(e),yf(i,e,n)}}function Jo(t,e,n){t.value!==null?n(e,t.value):hS(t,(s,i)=>{const r=new D(e.toString()+"/"+s);Jo(i,r,n)})}function hS(t,e){t.children.forEach((n,s)=>{e(s,n)})}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class fS{constructor(e){this.collection_=e,this.last_=null}get(){const e=this.collection_.get(),n={...e};return this.last_&&oe(this.last_,(s,i)=>{n[s]=n[s]-i}),this.last_=e,n}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Du=10*1e3,pS=30*1e3,gS=300*1e3;class mS{constructor(e,n){this.server_=n,this.statsToReport_={},this.statsListener_=new fS(e);const s=Du+(pS-Du)*Math.random();ws(this.reportStats_.bind(this),Math.floor(s))}reportStats_(){const e=this.statsListener_.get(),n={};let s=!1;oe(e,(i,r)=>{r>0&&Qe(this.statsToReport_,i)&&(n[i]=r,s=!0)}),s&&this.server_.reportStats(n),ws(this.reportStats_.bind(this),Math.floor(Math.random()*2*gS))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var xe;(function(t){t[t.OVERWRITE=0]="OVERWRITE",t[t.MERGE=1]="MERGE",t[t.ACK_USER_WRITE=2]="ACK_USER_WRITE",t[t.LISTEN_COMPLETE=3]="LISTEN_COMPLETE"})(xe||(xe={}));function ec(){return{fromUser:!0,fromServer:!1,queryId:null,tagged:!1}}function tc(){return{fromUser:!1,fromServer:!0,queryId:null,tagged:!1}}function nc(t){return{fromUser:!1,fromServer:!0,queryId:t,tagged:!0}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ki{constructor(e,n,s){this.path=e,this.affectedTree=n,this.revert=s,this.type=xe.ACK_USER_WRITE,this.source=ec()}operationForChild(e){if(k(this.path)){if(this.affectedTree.value!=null)return g(this.affectedTree.children.isEmpty(),"affectedTree should not have overlapping affected paths."),this;{const n=this.affectedTree.subtree(new D(e));return new Ki(P(),n,this.revert)}}else return g(T(this.path)===e,"operationForChild called for unrelated child."),new Ki(F(this.path),this.affectedTree,this.revert)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Hs{constructor(e,n){this.source=e,this.path=n,this.type=xe.LISTEN_COMPLETE}operationForChild(e){return k(this.path)?new Hs(this.source,P()):new Hs(this.source,F(this.path))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class cn{constructor(e,n,s){this.source=e,this.path=n,this.snap=s,this.type=xe.OVERWRITE}operationForChild(e){return k(this.path)?new cn(this.source,P(),this.snap.getImmediateChild(e)):new cn(this.source,F(this.path),this.snap)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Fn{constructor(e,n,s){this.source=e,this.path=n,this.children=s,this.type=xe.MERGE}operationForChild(e){if(k(this.path)){const n=this.children.subtree(new D(e));return n.isEmpty()?null:n.value?new cn(this.source,P(),n.value):new Fn(this.source,P(),n)}else return g(T(this.path)===e,"Can't get a merge for a child not on the path of the operation"),new Fn(this.source,F(this.path),this.children)}toString(){return"Operation("+this.path+": "+this.source.toString()+" merge: "+this.children.toString()+")"}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Mt{constructor(e,n,s){this.node_=e,this.fullyInitialized_=n,this.filtered_=s}isFullyInitialized(){return this.fullyInitialized_}isFiltered(){return this.filtered_}isCompleteForPath(e){if(k(e))return this.isFullyInitialized()&&!this.filtered_;const n=T(e);return this.isCompleteForChild(n)}isCompleteForChild(e){return this.isFullyInitialized()&&!this.filtered_||this.node_.hasChild(e)}getNode(){return this.node_}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class _S{constructor(e){this.query_=e,this.index_=this.query_._queryParams.getIndex()}}function yS(t,e,n,s){const i=[],r=[];return e.forEach(o=>{o.type==="child_changed"&&t.index_.indexedValueChanged(o.oldSnap,o.snapshotNode)&&r.push(cS(o.childName,o.snapshotNode))}),ds(t,i,"child_removed",e,s,n),ds(t,i,"child_added",e,s,n),ds(t,i,"child_moved",r,s,n),ds(t,i,"child_changed",e,s,n),ds(t,i,"value",e,s,n),i}function ds(t,e,n,s,i,r){const o=s.filter(a=>a.type===n);o.sort((a,c)=>vS(t,a,c)),o.forEach(a=>{const c=ES(t,a,r);i.forEach(l=>{l.respondsTo(a.type)&&e.push(l.createEvent(c,t.query_))})})}function ES(t,e,n){return e.type==="value"||e.type==="child_removed"||(e.prevName=n.getPredecessorChildName(e.childName,e.snapshotNode,t.index_)),e}function vS(t,e,n){if(e.childName==null||n.childName==null)throw Kn("Should only compare child_ events.");const s=new R(e.childName,e.snapshotNode),i=new R(n.childName,n.snapshotNode);return t.index_.compare(s,i)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function kr(t,e){return{eventCache:t,serverCache:e}}function bs(t,e,n,s){return kr(new Mt(e,n,s),t.serverCache)}function Ef(t,e,n,s){return kr(t.eventCache,new Mt(e,n,s))}function Ji(t){return t.eventCache.isFullyInitialized()?t.eventCache.getNode():null}function ln(t){return t.serverCache.isFullyInitialized()?t.serverCache.getNode():null}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let go;const wS=()=>(go||(go=new Ee(rb)),go);class M{static fromObject(e){let n=new M(null);return oe(e,(s,i)=>{n=n.set(new D(s),i)}),n}constructor(e,n=wS()){this.value=e,this.children=n}isEmpty(){return this.value===null&&this.children.isEmpty()}findRootMostMatchingPathAndValue(e,n){if(this.value!=null&&n(this.value))return{path:P(),value:this.value};if(k(e))return null;{const s=T(e),i=this.children.get(s);if(i!==null){const r=i.findRootMostMatchingPathAndValue(F(e),n);return r!=null?{path:G(new D(s),r.path),value:r.value}:null}else return null}}findRootMostValueAndPath(e){return this.findRootMostMatchingPathAndValue(e,()=>!0)}subtree(e){if(k(e))return this;{const n=T(e),s=this.children.get(n);return s!==null?s.subtree(F(e)):new M(null)}}set(e,n){if(k(e))return new M(n,this.children);{const s=T(e),r=(this.children.get(s)||new M(null)).set(F(e),n),o=this.children.insert(s,r);return new M(this.value,o)}}remove(e){if(k(e))return this.children.isEmpty()?new M(null):new M(null,this.children);{const n=T(e),s=this.children.get(n);if(s){const i=s.remove(F(e));let r;return i.isEmpty()?r=this.children.remove(n):r=this.children.insert(n,i),this.value===null&&r.isEmpty()?new M(null):new M(this.value,r)}else return this}}get(e){if(k(e))return this.value;{const n=T(e),s=this.children.get(n);return s?s.get(F(e)):null}}setTree(e,n){if(k(e))return n;{const s=T(e),r=(this.children.get(s)||new M(null)).setTree(F(e),n);let o;return r.isEmpty()?o=this.children.remove(s):o=this.children.insert(s,r),new M(this.value,o)}}fold(e){return this.fold_(P(),e)}fold_(e,n){const s={};return this.children.inorderTraversal((i,r)=>{s[i]=r.fold_(G(e,i),n)}),n(e,this.value,s)}findOnPath(e,n){return this.findOnPath_(e,P(),n)}findOnPath_(e,n,s){const i=this.value?s(n,this.value):!1;if(i)return i;if(k(e))return null;{const r=T(e),o=this.children.get(r);return o?o.findOnPath_(F(e),G(n,r),s):null}}foreachOnPath(e,n){return this.foreachOnPath_(e,P(),n)}foreachOnPath_(e,n,s){if(k(e))return this;{this.value&&s(n,this.value);const i=T(e),r=this.children.get(i);return r?r.foreachOnPath_(F(e),G(n,i),s):new M(null)}}foreach(e){this.foreach_(P(),e)}foreach_(e,n){this.children.inorderTraversal((s,i)=>{i.foreach_(G(e,s),n)}),this.value&&n(e,this.value)}foreachChild(e){this.children.inorderTraversal((n,s)=>{s.value&&e(n,s.value)})}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Be{constructor(e){this.writeTree_=e}static empty(){return new Be(new M(null))}}function Ss(t,e,n){if(k(e))return new Be(new M(n));{const s=t.writeTree_.findRootMostValueAndPath(e);if(s!=null){const i=s.path;let r=s.value;const o=pe(i,e);return r=r.updateChild(o,n),new Be(t.writeTree_.set(i,r))}else{const i=new M(n),r=t.writeTree_.setTree(e,i);return new Be(r)}}}function Qo(t,e,n){let s=t;return oe(n,(i,r)=>{s=Ss(s,G(e,i),r)}),s}function Mu(t,e){if(k(e))return Be.empty();{const n=t.writeTree_.setTree(e,new M(null));return new Be(n)}}function Xo(t,e){return pn(t,e)!=null}function pn(t,e){const n=t.writeTree_.findRootMostValueAndPath(e);return n!=null?t.writeTree_.get(n.path).getChild(pe(n.path,e)):null}function xu(t){const e=[],n=t.writeTree_.value;return n!=null?n.isLeafNode()||n.forEachChild(z,(s,i)=>{e.push(new R(s,i))}):t.writeTree_.children.inorderTraversal((s,i)=>{i.value!=null&&e.push(new R(s,i.value))}),e}function At(t,e){if(k(e))return t;{const n=pn(t,e);return n!=null?new Be(new M(n)):new Be(t.writeTree_.subtree(e))}}function Zo(t){return t.writeTree_.isEmpty()}function Un(t,e){return vf(P(),t.writeTree_,e)}function vf(t,e,n){if(e.value!=null)return n.updateChild(t,e.value);{let s=null;return e.children.inorderTraversal((i,r)=>{i===".priority"?(g(r.value!==null,"Priority writes must always be leaf nodes"),s=r.value):n=vf(G(t,i),r,n)}),!n.getChild(t).isEmpty()&&s!==null&&(n=n.updateChild(G(t,".priority"),s)),n}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ar(t,e){return Cf(e,t)}function bS(t,e,n,s,i){g(s>t.lastWriteId,"Stacking an older write on top of newer ones"),i===void 0&&(i=!0),t.allWrites.push({path:e,snap:n,writeId:s,visible:i}),i&&(t.visibleWrites=Ss(t.visibleWrites,e,n)),t.lastWriteId=s}function SS(t,e,n,s){g(s>t.lastWriteId,"Stacking an older merge on top of newer ones"),t.allWrites.push({path:e,children:n,writeId:s,visible:!0}),t.visibleWrites=Qo(t.visibleWrites,e,n),t.lastWriteId=s}function CS(t,e){for(let n=0;n<t.allWrites.length;n++){const s=t.allWrites[n];if(s.writeId===e)return s}return null}function IS(t,e){const n=t.allWrites.findIndex(a=>a.writeId===e);g(n>=0,"removeWrite called with nonexistent writeId.");const s=t.allWrites[n];t.allWrites.splice(n,1);let i=s.visible,r=!1,o=t.allWrites.length-1;for(;i&&o>=0;){const a=t.allWrites[o];a.visible&&(o>=n&&TS(a,s.path)?i=!1:Te(s.path,a.path)&&(r=!0)),o--}if(i){if(r)return RS(t),!0;if(s.snap)t.visibleWrites=Mu(t.visibleWrites,s.path);else{const a=s.children;oe(a,c=>{t.visibleWrites=Mu(t.visibleWrites,G(s.path,c))})}return!0}else return!1}function TS(t,e){if(t.snap)return Te(t.path,e);for(const n in t.children)if(t.children.hasOwnProperty(n)&&Te(G(t.path,n),e))return!0;return!1}function RS(t){t.visibleWrites=wf(t.allWrites,kS,P()),t.allWrites.length>0?t.lastWriteId=t.allWrites[t.allWrites.length-1].writeId:t.lastWriteId=-1}function kS(t){return t.visible}function wf(t,e,n){let s=Be.empty();for(let i=0;i<t.length;++i){const r=t[i];if(e(r)){const o=r.path;let a;if(r.snap)Te(n,o)?(a=pe(n,o),s=Ss(s,a,r.snap)):Te(o,n)&&(a=pe(o,n),s=Ss(s,P(),r.snap.getChild(a)));else if(r.children){if(Te(n,o))a=pe(n,o),s=Qo(s,a,r.children);else if(Te(o,n))if(a=pe(o,n),k(a))s=Qo(s,P(),r.children);else{const c=On(r.children,T(a));if(c){const l=c.getChild(F(a));s=Ss(s,P(),l)}}}else throw Kn("WriteRecord should have .snap or .children")}}return s}function bf(t,e,n,s,i){if(!s&&!i){const r=pn(t.visibleWrites,e);if(r!=null)return r;{const o=At(t.visibleWrites,e);if(Zo(o))return n;if(n==null&&!Xo(o,P()))return null;{const a=n||v.EMPTY_NODE;return Un(o,a)}}}else{const r=At(t.visibleWrites,e);if(!i&&Zo(r))return n;if(!i&&n==null&&!Xo(r,P()))return null;{const o=function(l){return(l.visible||i)&&(!s||!~s.indexOf(l.writeId))&&(Te(l.path,e)||Te(e,l.path))},a=wf(t.allWrites,o,e),c=n||v.EMPTY_NODE;return Un(a,c)}}}function AS(t,e,n){let s=v.EMPTY_NODE;const i=pn(t.visibleWrites,e);if(i)return i.isLeafNode()||i.forEachChild(z,(r,o)=>{s=s.updateImmediateChild(r,o)}),s;if(n){const r=At(t.visibleWrites,e);return n.forEachChild(z,(o,a)=>{const c=Un(At(r,new D(o)),a);s=s.updateImmediateChild(o,c)}),xu(r).forEach(o=>{s=s.updateImmediateChild(o.name,o.node)}),s}else{const r=At(t.visibleWrites,e);return xu(r).forEach(o=>{s=s.updateImmediateChild(o.name,o.node)}),s}}function NS(t,e,n,s,i){g(s||i,"Either existingEventSnap or existingServerSnap must exist");const r=G(e,n);if(Xo(t.visibleWrites,r))return null;{const o=At(t.visibleWrites,r);return Zo(o)?i.getChild(n):Un(o,i.getChild(n))}}function PS(t,e,n,s){const i=G(e,n),r=pn(t.visibleWrites,i);if(r!=null)return r;if(s.isCompleteForChild(n)){const o=At(t.visibleWrites,i);return Un(o,s.getNode().getImmediateChild(n))}else return null}function LS(t,e){return pn(t.visibleWrites,e)}function OS(t,e,n,s,i,r,o){let a;const c=At(t.visibleWrites,e),l=pn(c,P());if(l!=null)a=l;else if(n!=null)a=Un(c,n);else return[];if(a=a.withIndex(o),!a.isEmpty()&&!a.isLeafNode()){const u=[],d=o.getCompare(),h=r?a.getReverseIteratorFrom(s,o):a.getIteratorFrom(s,o);let f=h.getNext();for(;f&&u.length<i;)d(f,s)!==0&&u.push(f),f=h.getNext();return u}else return[]}function DS(){return{visibleWrites:Be.empty(),allWrites:[],lastWriteId:-1}}function Qi(t,e,n,s){return bf(t.writeTree,t.treePath,e,n,s)}function sc(t,e){return AS(t.writeTree,t.treePath,e)}function Fu(t,e,n,s){return NS(t.writeTree,t.treePath,e,n,s)}function Xi(t,e){return LS(t.writeTree,G(t.treePath,e))}function MS(t,e,n,s,i,r){return OS(t.writeTree,t.treePath,e,n,s,i,r)}function ic(t,e,n){return PS(t.writeTree,t.treePath,e,n)}function Sf(t,e){return Cf(G(t.treePath,e),t.writeTree)}function Cf(t,e){return{treePath:t,writeTree:e}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class xS{constructor(){this.changeMap=new Map}trackChildChange(e){const n=e.type,s=e.childName;g(n==="child_added"||n==="child_changed"||n==="child_removed","Only child changes supported for tracking"),g(s!==".priority","Only non-priority child changes can be tracked.");const i=this.changeMap.get(s);if(i){const r=i.type;if(n==="child_added"&&r==="child_removed")this.changeMap.set(s,$s(s,e.snapshotNode,i.snapshotNode));else if(n==="child_removed"&&r==="child_added")this.changeMap.delete(s);else if(n==="child_removed"&&r==="child_changed")this.changeMap.set(s,Us(s,i.oldSnap));else if(n==="child_changed"&&r==="child_added")this.changeMap.set(s,xn(s,e.snapshotNode));else if(n==="child_changed"&&r==="child_changed")this.changeMap.set(s,$s(s,e.snapshotNode,i.oldSnap));else throw Kn("Illegal combination of changes: "+e+" occurred after "+i)}else this.changeMap.set(s,e)}getChanges(){return Array.from(this.changeMap.values())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class FS{getCompleteChild(e){return null}getChildAfterChild(e,n,s){return null}}const If=new FS;class rc{constructor(e,n,s=null){this.writes_=e,this.viewCache_=n,this.optCompleteServerCache_=s}getCompleteChild(e){const n=this.viewCache_.eventCache;if(n.isCompleteForChild(e))return n.getNode().getImmediateChild(e);{const s=this.optCompleteServerCache_!=null?new Mt(this.optCompleteServerCache_,!0,!1):this.viewCache_.serverCache;return ic(this.writes_,e,s)}}getChildAfterChild(e,n,s){const i=this.optCompleteServerCache_!=null?this.optCompleteServerCache_:ln(this.viewCache_),r=MS(this.writes_,i,n,1,s,e);return r.length===0?null:r[0]}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function US(t){return{filter:t}}function $S(t,e){g(e.eventCache.getNode().isIndexed(t.filter.getIndex()),"Event snap not indexed"),g(e.serverCache.getNode().isIndexed(t.filter.getIndex()),"Server snap not indexed")}function BS(t,e,n,s,i){const r=new xS;let o,a;if(n.type===xe.OVERWRITE){const l=n;l.source.fromUser?o=ea(t,e,l.path,l.snap,s,i,r):(g(l.source.fromServer,"Unknown source."),a=l.source.tagged||e.serverCache.isFiltered()&&!k(l.path),o=Zi(t,e,l.path,l.snap,s,i,a,r))}else if(n.type===xe.MERGE){const l=n;l.source.fromUser?o=WS(t,e,l.path,l.children,s,i,r):(g(l.source.fromServer,"Unknown source."),a=l.source.tagged||e.serverCache.isFiltered(),o=ta(t,e,l.path,l.children,s,i,a,r))}else if(n.type===xe.ACK_USER_WRITE){const l=n;l.revert?o=GS(t,e,l.path,s,i,r):o=VS(t,e,l.path,l.affectedTree,s,i,r)}else if(n.type===xe.LISTEN_COMPLETE)o=jS(t,e,n.path,s,r);else throw Kn("Unknown operation type: "+n.type);const c=r.getChanges();return HS(e,o,c),{viewCache:o,changes:c}}function HS(t,e,n){const s=e.eventCache;if(s.isFullyInitialized()){const i=s.getNode().isLeafNode()||s.getNode().isEmpty(),r=Ji(t);(n.length>0||!t.eventCache.isFullyInitialized()||i&&!s.getNode().equals(r)||!s.getNode().getPriority().equals(r.getPriority()))&&n.push(_f(Ji(e)))}}function Tf(t,e,n,s,i,r){const o=e.eventCache;if(Xi(s,n)!=null)return e;{let a,c;if(k(n))if(g(e.serverCache.isFullyInitialized(),"If change path is empty, we must have complete server data"),e.serverCache.isFiltered()){const l=ln(e),u=l instanceof v?l:v.EMPTY_NODE,d=sc(s,u);a=t.filter.updateFullNode(e.eventCache.getNode(),d,r)}else{const l=Qi(s,ln(e));a=t.filter.updateFullNode(e.eventCache.getNode(),l,r)}else{const l=T(n);if(l===".priority"){g(Dt(n)===1,"Can't have a priority with additional path components");const u=o.getNode();c=e.serverCache.getNode();const d=Fu(s,n,u,c);d!=null?a=t.filter.updatePriority(u,d):a=o.getNode()}else{const u=F(n);let d;if(o.isCompleteForChild(l)){c=e.serverCache.getNode();const h=Fu(s,n,o.getNode(),c);h!=null?d=o.getNode().getImmediateChild(l).updateChild(u,h):d=o.getNode().getImmediateChild(l)}else d=ic(s,l,e.serverCache);d!=null?a=t.filter.updateChild(o.getNode(),l,d,u,i,r):a=o.getNode()}}return bs(e,a,o.isFullyInitialized()||k(n),t.filter.filtersNodes())}}function Zi(t,e,n,s,i,r,o,a){const c=e.serverCache;let l;const u=o?t.filter:t.filter.getIndexedFilter();if(k(n))l=u.updateFullNode(c.getNode(),s,null);else if(u.filtersNodes()&&!c.isFiltered()){const f=c.getNode().updateChild(n,s);l=u.updateFullNode(c.getNode(),f,null)}else{const f=T(n);if(!c.isCompleteForPath(n)&&Dt(n)>1)return e;const p=F(n),m=c.getNode().getImmediateChild(f).updateChild(p,s);f===".priority"?l=u.updatePriority(c.getNode(),m):l=u.updateChild(c.getNode(),f,m,p,If,null)}const d=Ef(e,l,c.isFullyInitialized()||k(n),u.filtersNodes()),h=new rc(i,d,r);return Tf(t,d,n,i,h,a)}function ea(t,e,n,s,i,r,o){const a=e.eventCache;let c,l;const u=new rc(i,e,r);if(k(n))l=t.filter.updateFullNode(e.eventCache.getNode(),s,o),c=bs(e,l,!0,t.filter.filtersNodes());else{const d=T(n);if(d===".priority")l=t.filter.updatePriority(e.eventCache.getNode(),s),c=bs(e,l,a.isFullyInitialized(),a.isFiltered());else{const h=F(n),f=a.getNode().getImmediateChild(d);let p;if(k(h))p=s;else{const E=u.getCompleteChild(d);E!=null?Ya(h)===".priority"&&E.getChild(uf(h)).isEmpty()?p=E:p=E.updateChild(h,s):p=v.EMPTY_NODE}if(f.equals(p))c=e;else{const E=t.filter.updateChild(a.getNode(),d,p,h,u,o);c=bs(e,E,a.isFullyInitialized(),t.filter.filtersNodes())}}}return c}function Uu(t,e){return t.eventCache.isCompleteForChild(e)}function WS(t,e,n,s,i,r,o){let a=e;return s.foreach((c,l)=>{const u=G(n,c);Uu(e,T(u))&&(a=ea(t,a,u,l,i,r,o))}),s.foreach((c,l)=>{const u=G(n,c);Uu(e,T(u))||(a=ea(t,a,u,l,i,r,o))}),a}function $u(t,e,n){return n.foreach((s,i)=>{e=e.updateChild(s,i)}),e}function ta(t,e,n,s,i,r,o,a){if(e.serverCache.getNode().isEmpty()&&!e.serverCache.isFullyInitialized())return e;let c=e,l;k(n)?l=s:l=new M(null).setTree(n,s);const u=e.serverCache.getNode();return l.children.inorderTraversal((d,h)=>{if(u.hasChild(d)){const f=e.serverCache.getNode().getImmediateChild(d),p=$u(t,f,h);c=Zi(t,c,new D(d),p,i,r,o,a)}}),l.children.inorderTraversal((d,h)=>{const f=!e.serverCache.isCompleteForChild(d)&&h.value===null;if(!u.hasChild(d)&&!f){const p=e.serverCache.getNode().getImmediateChild(d),E=$u(t,p,h);c=Zi(t,c,new D(d),E,i,r,o,a)}}),c}function VS(t,e,n,s,i,r,o){if(Xi(i,n)!=null)return e;const a=e.serverCache.isFiltered(),c=e.serverCache;if(s.value!=null){if(k(n)&&c.isFullyInitialized()||c.isCompleteForPath(n))return Zi(t,e,n,c.getNode().getChild(n),i,r,a,o);if(k(n)){let l=new M(null);return c.getNode().forEachChild(vn,(u,d)=>{l=l.set(new D(u),d)}),ta(t,e,n,l,i,r,a,o)}else return e}else{let l=new M(null);return s.foreach((u,d)=>{const h=G(n,u);c.isCompleteForPath(h)&&(l=l.set(u,c.getNode().getChild(h)))}),ta(t,e,n,l,i,r,a,o)}}function jS(t,e,n,s,i){const r=e.serverCache,o=Ef(e,r.getNode(),r.isFullyInitialized()||k(n),r.isFiltered());return Tf(t,o,n,s,If,i)}function GS(t,e,n,s,i,r){let o;if(Xi(s,n)!=null)return e;{const a=new rc(s,e,i),c=e.eventCache.getNode();let l;if(k(n)||T(n)===".priority"){let u;if(e.serverCache.isFullyInitialized())u=Qi(s,ln(e));else{const d=e.serverCache.getNode();g(d instanceof v,"serverChildren would be complete if leaf node"),u=sc(s,d)}u=u,l=t.filter.updateFullNode(c,u,r)}else{const u=T(n);let d=ic(s,u,e.serverCache);d==null&&e.serverCache.isCompleteForChild(u)&&(d=c.getImmediateChild(u)),d!=null?l=t.filter.updateChild(c,u,d,F(n),a,r):e.eventCache.getNode().hasChild(u)?l=t.filter.updateChild(c,u,v.EMPTY_NODE,F(n),a,r):l=c,l.isEmpty()&&e.serverCache.isFullyInitialized()&&(o=Qi(s,ln(e)),o.isLeafNode()&&(l=t.filter.updateFullNode(l,o,r)))}return o=e.serverCache.isFullyInitialized()||Xi(s,P())!=null,bs(e,l,o,t.filter.filtersNodes())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class zS{constructor(e,n){this.query_=e,this.eventRegistrations_=[];const s=this.query_._queryParams,i=new Xa(s.getIndex()),r=uS(s);this.processor_=US(r);const o=n.serverCache,a=n.eventCache,c=i.updateFullNode(v.EMPTY_NODE,o.getNode(),null),l=r.updateFullNode(v.EMPTY_NODE,a.getNode(),null),u=new Mt(c,o.isFullyInitialized(),i.filtersNodes()),d=new Mt(l,a.isFullyInitialized(),r.filtersNodes());this.viewCache_=kr(d,u),this.eventGenerator_=new _S(this.query_)}get query(){return this.query_}}function qS(t){return t.viewCache_.serverCache.getNode()}function YS(t){return Ji(t.viewCache_)}function KS(t,e){const n=ln(t.viewCache_);return n&&(t.query._queryParams.loadsAllData()||!k(e)&&!n.getImmediateChild(T(e)).isEmpty())?n.getChild(e):null}function Bu(t){return t.eventRegistrations_.length===0}function JS(t,e){t.eventRegistrations_.push(e)}function Hu(t,e,n){const s=[];if(n){g(e==null,"A cancel should cancel all event registrations.");const i=t.query._path;t.eventRegistrations_.forEach(r=>{const o=r.createCancelEvent(n,i);o&&s.push(o)})}if(e){let i=[];for(let r=0;r<t.eventRegistrations_.length;++r){const o=t.eventRegistrations_[r];if(!o.matches(e))i.push(o);else if(e.hasAnyCallback()){i=i.concat(t.eventRegistrations_.slice(r+1));break}}t.eventRegistrations_=i}else t.eventRegistrations_=[];return s}function Wu(t,e,n,s){e.type===xe.MERGE&&e.source.queryId!==null&&(g(ln(t.viewCache_),"We should always have a full cache before handling merges"),g(Ji(t.viewCache_),"Missing event cache, even though we have a server cache"));const i=t.viewCache_,r=BS(t.processor_,i,e,n,s);return $S(t.processor_,r.viewCache),g(r.viewCache.serverCache.isFullyInitialized()||!i.serverCache.isFullyInitialized(),"Once a server snap is complete, it should never go back"),t.viewCache_=r.viewCache,Rf(t,r.changes,r.viewCache.eventCache.getNode(),null)}function QS(t,e){const n=t.viewCache_.eventCache,s=[];return n.getNode().isLeafNode()||n.getNode().forEachChild(z,(r,o)=>{s.push(xn(r,o))}),n.isFullyInitialized()&&s.push(_f(n.getNode())),Rf(t,s,n.getNode(),e)}function Rf(t,e,n,s){const i=s?[s]:t.eventRegistrations_;return yS(t.eventGenerator_,e,n,i)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let er;class kf{constructor(){this.views=new Map}}function XS(t){g(!er,"__referenceConstructor has already been defined"),er=t}function ZS(){return g(er,"Reference.ts has not been loaded"),er}function eC(t){return t.views.size===0}function oc(t,e,n,s){const i=e.source.queryId;if(i!==null){const r=t.views.get(i);return g(r!=null,"SyncTree gave us an op for an invalid query."),Wu(r,e,n,s)}else{let r=[];for(const o of t.views.values())r=r.concat(Wu(o,e,n,s));return r}}function Af(t,e,n,s,i){const r=e._queryIdentifier,o=t.views.get(r);if(!o){let a=Qi(n,i?s:null),c=!1;a?c=!0:s instanceof v?(a=sc(n,s),c=!1):(a=v.EMPTY_NODE,c=!1);const l=kr(new Mt(a,c,!1),new Mt(s,i,!1));return new zS(e,l)}return o}function tC(t,e,n,s,i,r){const o=Af(t,e,s,i,r);return t.views.has(e._queryIdentifier)||t.views.set(e._queryIdentifier,o),JS(o,n),QS(o,n)}function nC(t,e,n,s){const i=e._queryIdentifier,r=[];let o=[];const a=xt(t);if(i==="default")for(const[c,l]of t.views.entries())o=o.concat(Hu(l,n,s)),Bu(l)&&(t.views.delete(c),l.query._queryParams.loadsAllData()||r.push(l.query));else{const c=t.views.get(i);c&&(o=o.concat(Hu(c,n,s)),Bu(c)&&(t.views.delete(i),c.query._queryParams.loadsAllData()||r.push(c.query)))}return a&&!xt(t)&&r.push(new(ZS())(e._repo,e._path)),{removed:r,events:o}}function Nf(t){const e=[];for(const n of t.views.values())n.query._queryParams.loadsAllData()||e.push(n);return e}function Nt(t,e){let n=null;for(const s of t.views.values())n=n||KS(s,e);return n}function Pf(t,e){if(e._queryParams.loadsAllData())return Nr(t);{const s=e._queryIdentifier;return t.views.get(s)}}function Lf(t,e){return Pf(t,e)!=null}function xt(t){return Nr(t)!=null}function Nr(t){for(const e of t.views.values())if(e.query._queryParams.loadsAllData())return e;return null}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let tr;function sC(t){g(!tr,"__referenceConstructor has already been defined"),tr=t}function iC(){return g(tr,"Reference.ts has not been loaded"),tr}let rC=1;class Vu{constructor(e){this.listenProvider_=e,this.syncPointTree_=new M(null),this.pendingWriteTree_=DS(),this.tagToQueryMap=new Map,this.queryToTagMap=new Map}}function Of(t,e,n,s,i){return bS(t.pendingWriteTree_,e,n,s,i),i?es(t,new cn(ec(),e,n)):[]}function oC(t,e,n,s){SS(t.pendingWriteTree_,e,n,s);const i=M.fromObject(n);return es(t,new Fn(ec(),e,i))}function vt(t,e,n=!1){const s=CS(t.pendingWriteTree_,e);if(IS(t.pendingWriteTree_,e)){let r=new M(null);return s.snap!=null?r=r.set(P(),!0):oe(s.children,o=>{r=r.set(new D(o),!0)}),es(t,new Ki(s.path,r,n))}else return[]}function si(t,e,n){return es(t,new cn(tc(),e,n))}function aC(t,e,n){const s=M.fromObject(n);return es(t,new Fn(tc(),e,s))}function cC(t,e){return es(t,new Hs(tc(),e))}function lC(t,e,n){const s=cc(t,n);if(s){const i=lc(s),r=i.path,o=i.queryId,a=pe(r,e),c=new Hs(nc(o),a);return uc(t,r,c)}else return[]}function nr(t,e,n,s,i=!1){const r=e._path,o=t.syncPointTree_.get(r);let a=[];if(o&&(e._queryIdentifier==="default"||Lf(o,e))){const c=nC(o,e,n,s);eC(o)&&(t.syncPointTree_=t.syncPointTree_.remove(r));const l=c.removed;if(a=c.events,!i){const u=l.findIndex(h=>h._queryParams.loadsAllData())!==-1,d=t.syncPointTree_.findOnPath(r,(h,f)=>xt(f));if(u&&!d){const h=t.syncPointTree_.subtree(r);if(!h.isEmpty()){const f=hC(h);for(let p=0;p<f.length;++p){const E=f[p],m=E.query,A=Ff(t,E);t.listenProvider_.startListening(Cs(m),Ws(t,m),A.hashFn,A.onComplete)}}}!d&&l.length>0&&!s&&(u?t.listenProvider_.stopListening(Cs(e),null):l.forEach(h=>{const f=t.queryToTagMap.get(Pr(h));t.listenProvider_.stopListening(Cs(h),f)}))}fC(t,l)}return a}function Df(t,e,n,s){const i=cc(t,s);if(i!=null){const r=lc(i),o=r.path,a=r.queryId,c=pe(o,e),l=new cn(nc(a),c,n);return uc(t,o,l)}else return[]}function uC(t,e,n,s){const i=cc(t,s);if(i){const r=lc(i),o=r.path,a=r.queryId,c=pe(o,e),l=M.fromObject(n),u=new Fn(nc(a),c,l);return uc(t,o,u)}else return[]}function na(t,e,n,s=!1){const i=e._path;let r=null,o=!1;t.syncPointTree_.foreachOnPath(i,(h,f)=>{const p=pe(h,i);r=r||Nt(f,p),o=o||xt(f)});let a=t.syncPointTree_.get(i);a?(o=o||xt(a),r=r||Nt(a,P())):(a=new kf,t.syncPointTree_=t.syncPointTree_.set(i,a));let c;r!=null?c=!0:(c=!1,r=v.EMPTY_NODE,t.syncPointTree_.subtree(i).foreachChild((f,p)=>{const E=Nt(p,P());E&&(r=r.updateImmediateChild(f,E))}));const l=Lf(a,e);if(!l&&!e._queryParams.loadsAllData()){const h=Pr(e);g(!t.queryToTagMap.has(h),"View does not exist, but we have a tag");const f=pC();t.queryToTagMap.set(h,f),t.tagToQueryMap.set(f,h)}const u=Ar(t.pendingWriteTree_,i);let d=tC(a,e,n,u,r,c);if(!l&&!o&&!s){const h=Pf(a,e);d=d.concat(gC(t,e,h))}return d}function ac(t,e,n){const i=t.pendingWriteTree_,r=t.syncPointTree_.findOnPath(e,(o,a)=>{const c=pe(o,e),l=Nt(a,c);if(l)return l});return bf(i,e,r,n,!0)}function dC(t,e){const n=e._path;let s=null;t.syncPointTree_.foreachOnPath(n,(l,u)=>{const d=pe(l,n);s=s||Nt(u,d)});let i=t.syncPointTree_.get(n);i?s=s||Nt(i,P()):(i=new kf,t.syncPointTree_=t.syncPointTree_.set(n,i));const r=s!=null,o=r?new Mt(s,!0,!1):null,a=Ar(t.pendingWriteTree_,e._path),c=Af(i,e,a,r?o.getNode():v.EMPTY_NODE,r);return YS(c)}function es(t,e){return Mf(e,t.syncPointTree_,null,Ar(t.pendingWriteTree_,P()))}function Mf(t,e,n,s){if(k(t.path))return xf(t,e,n,s);{const i=e.get(P());n==null&&i!=null&&(n=Nt(i,P()));let r=[];const o=T(t.path),a=t.operationForChild(o),c=e.children.get(o);if(c&&a){const l=n?n.getImmediateChild(o):null,u=Sf(s,o);r=r.concat(Mf(a,c,l,u))}return i&&(r=r.concat(oc(i,t,s,n))),r}}function xf(t,e,n,s){const i=e.get(P());n==null&&i!=null&&(n=Nt(i,P()));let r=[];return e.children.inorderTraversal((o,a)=>{const c=n?n.getImmediateChild(o):null,l=Sf(s,o),u=t.operationForChild(o);u&&(r=r.concat(xf(u,a,c,l)))}),i&&(r=r.concat(oc(i,t,s,n))),r}function Ff(t,e){const n=e.query,s=Ws(t,n);return{hashFn:()=>(qS(e)||v.EMPTY_NODE).hash(),onComplete:i=>{if(i==="ok")return s?lC(t,n._path,s):cC(t,n._path);{const r=cb(i,n);return nr(t,n,null,r)}}}}function Ws(t,e){const n=Pr(e);return t.queryToTagMap.get(n)}function Pr(t){return t._path.toString()+"$"+t._queryIdentifier}function cc(t,e){return t.tagToQueryMap.get(e)}function lc(t){const e=t.indexOf("$");return g(e!==-1&&e<t.length-1,"Bad queryKey."),{queryId:t.substr(e+1),path:new D(t.substr(0,e))}}function uc(t,e,n){const s=t.syncPointTree_.get(e);g(s,"Missing sync point for query tag that we're tracking");const i=Ar(t.pendingWriteTree_,e);return oc(s,n,i,null)}function hC(t){return t.fold((e,n,s)=>{if(n&&xt(n))return[Nr(n)];{let i=[];return n&&(i=Nf(n)),oe(s,(r,o)=>{i=i.concat(o)}),i}})}function Cs(t){return t._queryParams.loadsAllData()&&!t._queryParams.isDefault()?new(iC())(t._repo,t._path):t}function fC(t,e){for(let n=0;n<e.length;++n){const s=e[n];if(!s._queryParams.loadsAllData()){const i=Pr(s),r=t.queryToTagMap.get(i);t.queryToTagMap.delete(i),t.tagToQueryMap.delete(r)}}}function pC(){return rC++}function gC(t,e,n){const s=e._path,i=Ws(t,e),r=Ff(t,n),o=t.listenProvider_.startListening(Cs(e),i,r.hashFn,r.onComplete),a=t.syncPointTree_.subtree(s);if(i)g(!xt(a.value),"If we're adding a query, it shouldn't be shadowed");else{const c=a.fold((l,u,d)=>{if(!k(l)&&u&&xt(u))return[Nr(u).query];{let h=[];return u&&(h=h.concat(Nf(u).map(f=>f.query))),oe(d,(f,p)=>{h=h.concat(p)}),h}});for(let l=0;l<c.length;++l){const u=c[l];t.listenProvider_.stopListening(Cs(u),Ws(t,u))}}return o}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class dc{constructor(e){this.node_=e}getImmediateChild(e){const n=this.node_.getImmediateChild(e);return new dc(n)}node(){return this.node_}}class hc{constructor(e,n){this.syncTree_=e,this.path_=n}getImmediateChild(e){const n=G(this.path_,e);return new hc(this.syncTree_,n)}node(){return ac(this.syncTree_,this.path_)}}const mC=function(t){return t=t||{},t.timestamp=t.timestamp||new Date().getTime(),t},ju=function(t,e,n){if(!t||typeof t!="object")return t;if(g(".sv"in t,"Unexpected leaf node or priority contents"),typeof t[".sv"]=="string")return _C(t[".sv"],e,n);if(typeof t[".sv"]=="object")return yC(t[".sv"],e);g(!1,"Unexpected server value: "+JSON.stringify(t,null,2))},_C=function(t,e,n){switch(t){case"timestamp":return n.timestamp;default:g(!1,"Unexpected server value: "+t)}},yC=function(t,e,n){t.hasOwnProperty("increment")||g(!1,"Unexpected server value: "+JSON.stringify(t,null,2));const s=t.increment;typeof s!="number"&&g(!1,"Unexpected increment value: "+s);const i=e.node();if(g(i!==null&&typeof i<"u","Expected ChildrenNode.EMPTY_NODE for nulls"),!i.isLeafNode())return s;const o=i.getValue();return typeof o!="number"?s:o+s},Uf=function(t,e,n,s){return fc(e,new hc(n,t),s)},$f=function(t,e,n){return fc(t,new dc(e),n)};function fc(t,e,n){const s=t.getPriority().val(),i=ju(s,e.getImmediateChild(".priority"),n);let r;if(t.isLeafNode()){const o=t,a=ju(o.getValue(),e,n);return a!==o.getValue()||i!==o.getPriority().val()?new X(a,J(i)):t}else{const o=t;return r=o,i!==o.getPriority().val()&&(r=r.updatePriority(new X(i))),o.forEachChild(z,(a,c)=>{const l=fc(c,e.getImmediateChild(a),n);l!==c&&(r=r.updateImmediateChild(a,l))}),r}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class pc{constructor(e="",n=null,s={children:{},childCount:0}){this.name=e,this.parent=n,this.node=s}}function gc(t,e){let n=e instanceof D?e:new D(e),s=t,i=T(n);for(;i!==null;){const r=On(s.node.children,i)||{children:{},childCount:0};s=new pc(i,s,r),n=F(n),i=T(n)}return s}function ts(t){return t.node.value}function Bf(t,e){t.node.value=e,sa(t)}function Hf(t){return t.node.childCount>0}function EC(t){return ts(t)===void 0&&!Hf(t)}function Lr(t,e){oe(t.node.children,(n,s)=>{e(new pc(n,t,s))})}function Wf(t,e,n,s){n&&e(t),Lr(t,i=>{Wf(i,e,!0)})}function vC(t,e,n){let s=t.parent;for(;s!==null;){if(e(s))return!0;s=s.parent}return!1}function ii(t){return new D(t.parent===null?t.name:ii(t.parent)+"/"+t.name)}function sa(t){t.parent!==null&&wC(t.parent,t.name,t)}function wC(t,e,n){const s=EC(n),i=Qe(t.node.children,e);s&&i?(delete t.node.children[e],t.node.childCount--,sa(t)):!s&&!i&&(t.node.children[e]=n.node,t.node.childCount++,sa(t))}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const bC=/[\[\].#$\/\u0000-\u001F\u007F]/,SC=/[\[\].#$\u0000-\u001F\u007F]/,mo=10*1024*1024,mc=function(t){return typeof t=="string"&&t.length!==0&&!bC.test(t)},Vf=function(t){return typeof t=="string"&&t.length!==0&&!SC.test(t)},CC=function(t){return t&&(t=t.replace(/^\/*\.info(\/|$)/,"/")),Vf(t)},IC=function(t){return t===null||typeof t=="string"||typeof t=="number"&&!Va(t)||t&&typeof t=="object"&&Qe(t,".sv")},jf=function(t,e,n,s){s&&e===void 0||Or(Ir(t,"value"),e,n)},Or=function(t,e,n){const s=n instanceof D?new Wb(n,t):n;if(e===void 0)throw new Error(t+"contains undefined "+Gt(s));if(typeof e=="function")throw new Error(t+"contains a function "+Gt(s)+" with contents = "+e.toString());if(Va(e))throw new Error(t+"contains "+e.toString()+" "+Gt(s));if(typeof e=="string"&&e.length>mo/3&&Tr(e)>mo)throw new Error(t+"contains a string greater than "+mo+" utf8 bytes "+Gt(s)+" ('"+e.substring(0,50)+"...')");if(e&&typeof e=="object"){let i=!1,r=!1;if(oe(e,(o,a)=>{if(o===".value")i=!0;else if(o!==".priority"&&o!==".sv"&&(r=!0,!mc(o)))throw new Error(t+" contains an invalid key ("+o+") "+Gt(s)+`.  Keys must be non-empty strings and can't contain ".", "#", "$", "/", "[", or "]"`);Vb(s,o),Or(t,a,s),jb(s)}),i&&r)throw new Error(t+' contains ".value" child '+Gt(s)+" in addition to actual children.")}},TC=function(t,e){let n,s;for(n=0;n<e.length;n++){s=e[n];const r=Fs(s);for(let o=0;o<r.length;o++)if(!(r[o]===".priority"&&o===r.length-1)){if(!mc(r[o]))throw new Error(t+"contains an invalid key ("+r[o]+") in path "+s.toString()+`. Keys must be non-empty strings and can't contain ".", "#", "$", "/", "[", or "]"`)}}e.sort(Hb);let i=null;for(n=0;n<e.length;n++){if(s=e[n],i!==null&&Te(i,s))throw new Error(t+"contains a path "+i.toString()+" that is ancestor of another path "+s.toString());i=s}},RC=function(t,e,n,s){const i=Ir(t,"values");if(!(e&&typeof e=="object")||Array.isArray(e))throw new Error(i+" must be an object containing the children to replace.");const r=[];oe(e,(o,a)=>{const c=new D(o);if(Or(i,a,G(n,c)),Ya(c)===".priority"&&!IC(a))throw new Error(i+"contains an invalid value for '"+c.toString()+"', which must be a valid Firebase priority (a string, finite number, server value, or null).");r.push(c)}),TC(i,r)},Gf=function(t,e,n,s){if(!Vf(n))throw new Error(Ir(t,e)+'was an invalid path = "'+n+`". Paths must be non-empty strings and can't contain ".", "#", "$", "[", or "]"`)},kC=function(t,e,n,s){n&&(n=n.replace(/^\/*\.info(\/|$)/,"/")),Gf(t,e,n)},_c=function(t,e){if(T(e)===".info")throw new Error(t+" failed = Can't modify data under /.info/")},AC=function(t,e){const n=e.path.toString();if(typeof e.repoInfo.host!="string"||e.repoInfo.host.length===0||!mc(e.repoInfo.namespace)&&e.repoInfo.host.split(":")[0]!=="localhost"||n.length!==0&&!CC(n))throw new Error(Ir(t,"url")+`must be a valid firebase URL and the path can't contain ".", "#", "$", "[", or "]".`)};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class NC{constructor(){this.eventLists_=[],this.recursionDepth_=0}}function Dr(t,e){let n=null;for(let s=0;s<e.length;s++){const i=e[s],r=i.getPath();n!==null&&!Ka(r,n.path)&&(t.eventLists_.push(n),n=null),n===null&&(n={events:[],path:r}),n.events.push(i)}n&&t.eventLists_.push(n)}function zf(t,e,n){Dr(t,n),qf(t,s=>Ka(s,e))}function Pe(t,e,n){Dr(t,n),qf(t,s=>Te(s,e)||Te(e,s))}function qf(t,e){t.recursionDepth_++;let n=!0;for(let s=0;s<t.eventLists_.length;s++){const i=t.eventLists_[s];if(i){const r=i.path;e(r)?(PC(t.eventLists_[s]),t.eventLists_[s]=null):n=!1}}n&&(t.eventLists_=[]),t.recursionDepth_--}function PC(t){for(let e=0;e<t.events.length;e++){const n=t.events[e];if(n!==null){t.events[e]=null;const s=n.getEventRunner();vs&&se("event: "+n.toString()),Zn(s)}}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const LC="repo_interrupt",OC=25;class DC{constructor(e,n,s,i){this.repoInfo_=e,this.forceRestClient_=n,this.authTokenProvider_=s,this.appCheckProvider_=i,this.dataUpdateCount=0,this.statsListener_=null,this.eventQueue_=new NC,this.nextWriteId_=1,this.interceptServerDataCallback_=null,this.onDisconnect_=Yi(),this.transactionQueueTree_=new pc,this.persistentConnection_=null,this.key=this.repoInfo_.toURLString()}toString(){return(this.repoInfo_.secure?"https://":"http://")+this.repoInfo_.host}}function MC(t,e,n){if(t.stats_=za(t.repoInfo_),t.forceRestClient_||hb())t.server_=new qi(t.repoInfo_,(s,i,r,o)=>{Gu(t,s,i,r,o)},t.authTokenProvider_,t.appCheckProvider_),setTimeout(()=>zu(t,!0),0);else{if(typeof n<"u"&&n!==null){if(typeof n!="object")throw new Error("Only objects are supported for option databaseAuthVariableOverride");try{Q(n)}catch(s){throw new Error("Invalid authOverride provided: "+s)}}t.persistentConnection_=new at(t.repoInfo_,e,(s,i,r,o)=>{Gu(t,s,i,r,o)},s=>{zu(t,s)},s=>{xC(t,s)},t.authTokenProvider_,t.appCheckProvider_,n),t.server_=t.persistentConnection_}t.authTokenProvider_.addTokenChangeListener(s=>{t.server_.refreshAuthToken(s)}),t.appCheckProvider_.addTokenChangeListener(s=>{t.server_.refreshAppCheckToken(s.token)}),t.statsReporter_=_b(t.repoInfo_,()=>new mS(t.stats_,t.server_)),t.infoData_=new dS,t.infoSyncTree_=new Vu({startListening:(s,i,r,o)=>{let a=[];const c=t.infoData_.getNode(s._path);return c.isEmpty()||(a=si(t.infoSyncTree_,s._path,c),setTimeout(()=>{o("ok")},0)),a},stopListening:()=>{}}),yc(t,"connected",!1),t.serverSyncTree_=new Vu({startListening:(s,i,r,o)=>(t.server_.listen(s,r,i,(a,c)=>{const l=o(a,c);Pe(t.eventQueue_,s._path,l)}),[]),stopListening:(s,i)=>{t.server_.unlisten(s,i)}})}function Yf(t){const n=t.infoData_.getNode(new D(".info/serverTimeOffset")).val()||0;return new Date().getTime()+n}function Mr(t){return mC({timestamp:Yf(t)})}function Gu(t,e,n,s,i){t.dataUpdateCount++;const r=new D(e);n=t.interceptServerDataCallback_?t.interceptServerDataCallback_(e,n):n;let o=[];if(i)if(s){const c=Wi(n,l=>J(l));o=uC(t.serverSyncTree_,r,c,i)}else{const c=J(n);o=Df(t.serverSyncTree_,r,c,i)}else if(s){const c=Wi(n,l=>J(l));o=aC(t.serverSyncTree_,r,c)}else{const c=J(n);o=si(t.serverSyncTree_,r,c)}let a=r;o.length>0&&(a=$n(t,r)),Pe(t.eventQueue_,a,o)}function zu(t,e){yc(t,"connected",e),e===!1&&BC(t)}function xC(t,e){oe(e,(n,s)=>{yc(t,n,s)})}function yc(t,e,n){const s=new D("/.info/"+e),i=J(n);t.infoData_.updateSnapshot(s,i);const r=si(t.infoSyncTree_,s,i);Pe(t.eventQueue_,s,r)}function Ec(t){return t.nextWriteId_++}function FC(t,e,n){const s=dC(t.serverSyncTree_,e);return s!=null?Promise.resolve(s):t.server_.get(e).then(i=>{const r=J(i).withIndex(e._queryParams.getIndex());na(t.serverSyncTree_,e,n,!0);let o;if(e._queryParams.loadsAllData())o=si(t.serverSyncTree_,e._path,r);else{const a=Ws(t.serverSyncTree_,e);o=Df(t.serverSyncTree_,e._path,r,a)}return Pe(t.eventQueue_,e._path,o),nr(t.serverSyncTree_,e,n,null,!0),r},i=>(ri(t,"get for query "+Q(e)+" failed: "+i),Promise.reject(new Error(i))))}function UC(t,e,n,s,i){ri(t,"set",{path:e.toString(),value:n,priority:s});const r=Mr(t),o=J(n,s),a=ac(t.serverSyncTree_,e),c=$f(o,a,r),l=Ec(t),u=Of(t.serverSyncTree_,e,c,l,!0);Dr(t.eventQueue_,u),t.server_.put(e.toString(),o.val(!0),(h,f)=>{const p=h==="ok";p||ge("set at "+e+" failed: "+h);const E=vt(t.serverSyncTree_,l,!p);Pe(t.eventQueue_,e,E),ia(t,i,h,f)});const d=wc(t,e);$n(t,d),Pe(t.eventQueue_,d,[])}function $C(t,e,n,s){ri(t,"update",{path:e.toString(),value:n});let i=!0;const r=Mr(t),o={};if(oe(n,(a,c)=>{i=!1,o[a]=Uf(G(e,a),J(c),t.serverSyncTree_,r)}),i)se("update() called with empty data.  Don't do anything."),ia(t,s,"ok",void 0);else{const a=Ec(t),c=oC(t.serverSyncTree_,e,o,a);Dr(t.eventQueue_,c),t.server_.merge(e.toString(),n,(l,u)=>{const d=l==="ok";d||ge("update at "+e+" failed: "+l);const h=vt(t.serverSyncTree_,a,!d),f=h.length>0?$n(t,e):e;Pe(t.eventQueue_,f,h),ia(t,s,l,u)}),oe(n,l=>{const u=wc(t,G(e,l));$n(t,u)}),Pe(t.eventQueue_,e,[])}}function BC(t){ri(t,"onDisconnectEvents");const e=Mr(t),n=Yi();Jo(t.onDisconnect_,P(),(i,r)=>{const o=Uf(i,r,t.serverSyncTree_,e);yf(n,i,o)});let s=[];Jo(n,P(),(i,r)=>{s=s.concat(si(t.serverSyncTree_,i,r));const o=wc(t,i);$n(t,o)}),t.onDisconnect_=Yi(),Pe(t.eventQueue_,P(),s)}function HC(t,e,n){let s;T(e._path)===".info"?s=na(t.infoSyncTree_,e,n):s=na(t.serverSyncTree_,e,n),zf(t.eventQueue_,e._path,s)}function Kf(t,e,n){let s;T(e._path)===".info"?s=nr(t.infoSyncTree_,e,n):s=nr(t.serverSyncTree_,e,n),zf(t.eventQueue_,e._path,s)}function WC(t){t.persistentConnection_&&t.persistentConnection_.interrupt(LC)}function ri(t,...e){let n="";t.persistentConnection_&&(n=t.persistentConnection_.id+":"),se(n,...e)}function ia(t,e,n,s){e&&Zn(()=>{if(n==="ok")e(null);else{const i=(n||"error").toUpperCase();let r=i;s&&(r+=": "+s);const o=new Error(r);o.code=i,e(o)}})}function Jf(t,e,n){return ac(t.serverSyncTree_,e,n)||v.EMPTY_NODE}function vc(t,e=t.transactionQueueTree_){if(e||xr(t,e),ts(e)){const n=Xf(t,e);g(n.length>0,"Sending zero length transaction queue"),n.every(i=>i.status===0)&&VC(t,ii(e),n)}else Hf(e)&&Lr(e,n=>{vc(t,n)})}function VC(t,e,n){const s=n.map(l=>l.currentWriteId),i=Jf(t,e,s);let r=i;const o=i.hash();for(let l=0;l<n.length;l++){const u=n[l];g(u.status===0,"tryToSendTransactionQueue_: items in queue should all be run."),u.status=1,u.retryCount++;const d=pe(e,u.path);r=r.updateChild(d,u.currentOutputSnapshotRaw)}const a=r.val(!0),c=e;t.server_.put(c.toString(),a,l=>{ri(t,"transaction put response",{path:c.toString(),status:l});let u=[];if(l==="ok"){const d=[];for(let h=0;h<n.length;h++)n[h].status=2,u=u.concat(vt(t.serverSyncTree_,n[h].currentWriteId)),n[h].onComplete&&d.push(()=>n[h].onComplete(null,!0,n[h].currentOutputSnapshotResolved)),n[h].unwatcher();xr(t,gc(t.transactionQueueTree_,e)),vc(t,t.transactionQueueTree_),Pe(t.eventQueue_,e,u);for(let h=0;h<d.length;h++)Zn(d[h])}else{if(l==="datastale")for(let d=0;d<n.length;d++)n[d].status===3?n[d].status=4:n[d].status=0;else{ge("transaction at "+c.toString()+" failed: "+l);for(let d=0;d<n.length;d++)n[d].status=4,n[d].abortReason=l}$n(t,e)}},o)}function $n(t,e){const n=Qf(t,e),s=ii(n),i=Xf(t,n);return jC(t,i,s),s}function jC(t,e,n){if(e.length===0)return;const s=[];let i=[];const o=e.filter(a=>a.status===0).map(a=>a.currentWriteId);for(let a=0;a<e.length;a++){const c=e[a],l=pe(n,c.path);let u=!1,d;if(g(l!==null,"rerunTransactionsUnderNode_: relativePath should not be null."),c.status===4)u=!0,d=c.abortReason,i=i.concat(vt(t.serverSyncTree_,c.currentWriteId,!0));else if(c.status===0)if(c.retryCount>=OC)u=!0,d="maxretry",i=i.concat(vt(t.serverSyncTree_,c.currentWriteId,!0));else{const h=Jf(t,c.path,o);c.currentInputSnapshot=h;const f=e[a].update(h.val());if(f!==void 0){Or("transaction failed: Data returned ",f,c.path);let p=J(f);typeof f=="object"&&f!=null&&Qe(f,".priority")||(p=p.updatePriority(h.getPriority()));const m=c.currentWriteId,A=Mr(t),N=$f(p,h,A);c.currentOutputSnapshotRaw=p,c.currentOutputSnapshotResolved=N,c.currentWriteId=Ec(t),o.splice(o.indexOf(m),1),i=i.concat(Of(t.serverSyncTree_,c.path,N,c.currentWriteId,c.applyLocally)),i=i.concat(vt(t.serverSyncTree_,m,!0))}else u=!0,d="nodata",i=i.concat(vt(t.serverSyncTree_,c.currentWriteId,!0))}Pe(t.eventQueue_,n,i),i=[],u&&(e[a].status=2,(function(h){setTimeout(h,Math.floor(0))})(e[a].unwatcher),e[a].onComplete&&(d==="nodata"?s.push(()=>e[a].onComplete(null,!1,e[a].currentInputSnapshot)):s.push(()=>e[a].onComplete(new Error(d),!1,null))))}xr(t,t.transactionQueueTree_);for(let a=0;a<s.length;a++)Zn(s[a]);vc(t,t.transactionQueueTree_)}function Qf(t,e){let n,s=t.transactionQueueTree_;for(n=T(e);n!==null&&ts(s)===void 0;)s=gc(s,n),e=F(e),n=T(e);return s}function Xf(t,e){const n=[];return Zf(t,e,n),n.sort((s,i)=>s.order-i.order),n}function Zf(t,e,n){const s=ts(e);if(s)for(let i=0;i<s.length;i++)n.push(s[i]);Lr(e,i=>{Zf(t,i,n)})}function xr(t,e){const n=ts(e);if(n){let s=0;for(let i=0;i<n.length;i++)n[i].status!==2&&(n[s]=n[i],s++);n.length=s,Bf(e,n.length>0?n:void 0)}Lr(e,s=>{xr(t,s)})}function wc(t,e){const n=ii(Qf(t,e)),s=gc(t.transactionQueueTree_,e);return vC(s,i=>{_o(t,i)}),_o(t,s),Wf(s,i=>{_o(t,i)}),n}function _o(t,e){const n=ts(e);if(n){const s=[];let i=[],r=-1;for(let o=0;o<n.length;o++)n[o].status===3||(n[o].status===1?(g(r===o-1,"All SENT items should be at beginning of queue."),r=o,n[o].status=3,n[o].abortReason="set"):(g(n[o].status===0,"Unexpected transaction status in abort"),n[o].unwatcher(),i=i.concat(vt(t.serverSyncTree_,n[o].currentWriteId,!0)),n[o].onComplete&&s.push(n[o].onComplete.bind(null,new Error("set"),!1,null))));r===-1?Bf(e,void 0):n.length=r+1,Pe(t.eventQueue_,ii(e),i);for(let o=0;o<s.length;o++)Zn(s[o])}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function GC(t){let e="";const n=t.split("/");for(let s=0;s<n.length;s++)if(n[s].length>0){let i=n[s];try{i=decodeURIComponent(i.replace(/\+/g," "))}catch{}e+="/"+i}return e}function zC(t){const e={};t.charAt(0)==="?"&&(t=t.substring(1));for(const n of t.split("&")){if(n.length===0)continue;const s=n.split("=");s.length===2?e[decodeURIComponent(s[0])]=decodeURIComponent(s[1]):ge(`Invalid query segment '${n}' in query '${t}'`)}return e}const qu=function(t,e){const n=qC(t),s=n.namespace;n.domain==="firebase.com"&&ut(n.host+" is no longer supported. Please use <YOUR FIREBASE>.firebaseio.com instead"),(!s||s==="undefined")&&n.domain!=="localhost"&&ut("Cannot parse Firebase url. Please use https://<YOUR FIREBASE>.firebaseio.com"),n.secure||sb();const i=n.scheme==="ws"||n.scheme==="wss";return{repoInfo:new ef(n.host,n.secure,s,i,e,"",s!==n.subdomain),path:new D(n.pathString)}},qC=function(t){let e="",n="",s="",i="",r="",o=!0,a="https",c=443;if(typeof t=="string"){let l=t.indexOf("//");l>=0&&(a=t.substring(0,l-1),t=t.substring(l+2));let u=t.indexOf("/");u===-1&&(u=t.length);let d=t.indexOf("?");d===-1&&(d=t.length),e=t.substring(0,Math.min(u,d)),u<d&&(i=GC(t.substring(u,d)));const h=zC(t.substring(Math.min(t.length,d)));l=e.indexOf(":"),l>=0?(o=a==="https"||a==="wss",c=parseInt(e.substring(l+1),10)):l=e.length;const f=e.slice(0,l);if(f.toLowerCase()==="localhost")n="localhost";else if(f.split(".").length<=2)n=f;else{const p=e.indexOf(".");s=e.substring(0,p).toLowerCase(),n=e.substring(p+1),r=s}"ns"in h&&(r=h.ns)}return{host:e,port:c,domain:n,subdomain:s,secure:o,scheme:a,pathString:i,namespace:r}};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Yu="-0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ_abcdefghijklmnopqrstuvwxyz",YC=(function(){let t=0;const e=[];return function(n){const s=n===t;t=n;let i;const r=new Array(8);for(i=7;i>=0;i--)r[i]=Yu.charAt(n%64),n=Math.floor(n/64);g(n===0,"Cannot push at time == 0");let o=r.join("");if(s){for(i=11;i>=0&&e[i]===63;i--)e[i]=0;e[i]++}else for(i=0;i<12;i++)e[i]=Math.floor(Math.random()*64);for(i=0;i<12;i++)o+=Yu.charAt(e[i]);return g(o.length===20,"nextPushId: Length should be 20."),o}})();/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ep{constructor(e,n,s,i){this.eventType=e,this.eventRegistration=n,this.snapshot=s,this.prevName=i}getPath(){const e=this.snapshot.ref;return this.eventType==="value"?e._path:e.parent._path}getEventType(){return this.eventType}getEventRunner(){return this.eventRegistration.getEventRunner(this)}toString(){return this.getPath().toString()+":"+this.eventType+":"+Q(this.snapshot.exportVal())}}class tp{constructor(e,n,s){this.eventRegistration=e,this.error=n,this.path=s}getPath(){return this.path}getEventType(){return"cancel"}getEventRunner(){return this.eventRegistration.getEventRunner(this)}toString(){return this.path.toString()+":cancel"}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class bc{constructor(e,n){this.snapshotCallback=e,this.cancelCallback=n}onValue(e,n){this.snapshotCallback.call(null,e,n)}onCancel(e){return g(this.hasCancelCallback,"Raising a cancel event on a listener with no cancel callback"),this.cancelCallback.call(null,e)}get hasCancelCallback(){return!!this.cancelCallback}matches(e){return this.snapshotCallback===e.snapshotCallback||this.snapshotCallback.userCallback!==void 0&&this.snapshotCallback.userCallback===e.snapshotCallback.userCallback&&this.snapshotCallback.context===e.snapshotCallback.context}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Sc{constructor(e,n,s,i){this._repo=e,this._path=n,this._queryParams=s,this._orderByCalled=i}get key(){return k(this._path)?null:Ya(this._path)}get ref(){return new Xe(this._repo,this._path)}get _queryIdentifier(){const e=Ou(this._queryParams),n=ja(e);return n==="{}"?"default":n}get _queryObject(){return Ou(this._queryParams)}isEqual(e){if(e=ue(e),!(e instanceof Sc))return!1;const n=this._repo===e._repo,s=Ka(this._path,e._path),i=this._queryIdentifier===e._queryIdentifier;return n&&s&&i}toJSON(){return this.toString()}toString(){return this._repo.toString()+Bb(this._path)}}class Xe extends Sc{constructor(e,n){super(e,n,new Za,!1)}get parent(){const e=uf(this._path);return e===null?null:new Xe(this._repo,e)}get root(){let e=this;for(;e.parent!==null;)e=e.parent;return e}}class Bn{constructor(e,n,s){this._node=e,this.ref=n,this._index=s}get priority(){return this._node.getPriority().val()}get key(){return this.ref.key}get size(){return this._node.numChildren()}child(e){const n=new D(e),s=Hn(this.ref,e);return new Bn(this._node.getChild(n),s,z)}exists(){return!this._node.isEmpty()}exportVal(){return this._node.val(!0)}forEach(e){return this._node.isLeafNode()?!1:!!this._node.forEachChild(this._index,(s,i)=>e(new Bn(i,Hn(this.ref,s),z)))}hasChild(e){const n=new D(e);return!this._node.getChild(n).isEmpty()}hasChildren(){return this._node.isLeafNode()?!1:!this._node.isEmpty()}toJSON(){return this.exportVal()}val(){return this._node.val()}}function ie(t,e){return t=ue(t),t._checkNotDeleted("ref"),e!==void 0?Hn(t._root,e):t._root}function Hn(t,e){return t=ue(t),T(t._path)===null?kC("child","path",e):Gf("child","path",e),new Xe(t._repo,G(t._path,e))}function Ku(t,e){t=ue(t),_c("push",t._path),jf("push",e,t._path,!0);const n=Yf(t._repo),s=YC(n),i=Hn(t,s),r=Hn(t,s);let o;return o=Promise.resolve(r),i.then=o.then.bind(o),i.catch=o.then.bind(o,void 0),i}function Wn(t){return _c("remove",t._path),dt(t,null)}function dt(t,e){t=ue(t),_c("set",t._path),jf("set",e,t._path,!1);const n=new Xs;return UC(t._repo,t._path,e,null,n.wrapCallback(()=>{})),n.promise}function Ri(t,e){RC("update",e,t._path);const n=new Xs;return $C(t._repo,t._path,e,n.wrapCallback(()=>{})),n.promise}function Zt(t){t=ue(t);const e=new bc(()=>{}),n=new oi(e);return FC(t._repo,t,n).then(s=>new Bn(s,new Xe(t._repo,t._path),t._queryParams.getIndex()))}class oi{constructor(e){this.callbackContext=e}respondsTo(e){return e==="value"}createEvent(e,n){const s=n._queryParams.getIndex();return new ep("value",this,new Bn(e.snapshotNode,new Xe(n._repo,n._path),s))}getEventRunner(e){return e.getEventType()==="cancel"?()=>this.callbackContext.onCancel(e.error):()=>this.callbackContext.onValue(e.snapshot,null)}createCancelEvent(e,n){return this.callbackContext.hasCancelCallback?new tp(this,e,n):null}matches(e){return e instanceof oi?!e.callbackContext||!this.callbackContext?!0:e.callbackContext.matches(this.callbackContext):!1}hasAnyCallback(){return this.callbackContext!==null}}class Fr{constructor(e,n){this.eventType=e,this.callbackContext=n}respondsTo(e){let n=e==="children_added"?"child_added":e;return n=n==="children_removed"?"child_removed":n,this.eventType===n}createCancelEvent(e,n){return this.callbackContext.hasCancelCallback?new tp(this,e,n):null}createEvent(e,n){g(e.childName!=null,"Child events should have a childName.");const s=Hn(new Xe(n._repo,n._path),e.childName),i=n._queryParams.getIndex();return new ep(e.type,this,new Bn(e.snapshotNode,s,i),e.prevName)}getEventRunner(e){return e.getEventType()==="cancel"?()=>this.callbackContext.onCancel(e.error):()=>this.callbackContext.onValue(e.snapshot,e.prevName)}matches(e){return e instanceof Fr?this.eventType===e.eventType&&(!this.callbackContext||!e.callbackContext||this.callbackContext.matches(e.callbackContext)):!1}hasAnyCallback(){return!!this.callbackContext}}function Cc(t,e,n,s,i){const r=new bc(n,void 0),o=e==="value"?new oi(r):new Fr(e,r);return HC(t._repo,t,o),()=>Kf(t._repo,t,o)}function KC(t,e,n,s){return Cc(t,"value",e)}function JC(t,e,n,s){return Cc(t,"child_added",e)}function QC(t,e,n,s){return Cc(t,"child_removed",e)}function Ur(t,e,n){let s=null;const i=n?new bc(n):null;e==="value"?s=new oi(i):e&&(s=new Fr(e,i)),Kf(t._repo,t,s)}XS(Xe);sC(Xe);/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const XC="FIREBASE_DATABASE_EMULATOR_HOST",ra={};let ZC=!1;function eI(t,e,n,s){const i=e.lastIndexOf(":"),r=e.substring(0,i),o=Jn(r);t.repoInfo_=new ef(e,o,t.repoInfo_.namespace,t.repoInfo_.webSocketOnly,t.repoInfo_.nodeAdmin,t.repoInfo_.persistenceKey,t.repoInfo_.includeNamespaceInQueryParams,!0,n),s&&(t.authTokenProvider_=s)}function tI(t,e,n,s,i){let r=s||t.options.databaseURL;r===void 0&&(t.options.projectId||ut("Can't determine Firebase Database URL. Be sure to include  a Project ID when calling firebase.initializeApp()."),se("Using default host for project ",t.options.projectId),r=`${t.options.projectId}-default-rtdb.firebaseio.com`);let o=qu(r,i),a=o.repoInfo,c;typeof process<"u"&&gu&&(c=gu[XC]),c?(r=`http://${c}?ns=${a.namespace}`,o=qu(r,i),a=o.repoInfo):o.repoInfo.secure;const l=new pb(t.name,t.options,e);AC("Invalid Firebase Database URL",o),k(o.path)||ut("Database URL must point to the root of a Firebase Database (not including a child path).");const u=sI(a,t,l,new fb(t,n));return new iI(u,t)}function nI(t,e){const n=ra[e];(!n||n[t.key]!==t)&&ut(`Database ${e}(${t.repoInfo_}) has already been deleted.`),WC(t),delete n[t.key]}function sI(t,e,n,s){let i=ra[e.name];i||(i={},ra[e.name]=i);let r=i[t.toURLString()];return r&&ut("Database initialized multiple times. Please make sure the format of the database URL matches with each database() call."),r=new DC(t,ZC,n,s),i[t.toURLString()]=r,r}class iI{constructor(e,n){this._repoInternal=e,this.app=n,this.type="database",this._instanceStarted=!1}get _repo(){return this._instanceStarted||(MC(this._repoInternal,this.app.options.appId,this.app.options.databaseAuthVariableOverride),this._instanceStarted=!0),this._repoInternal}get _root(){return this._rootInternal||(this._rootInternal=new Xe(this._repo,P())),this._rootInternal}_delete(){return this._rootInternal!==null&&(nI(this._repo,this.app.name),this._repoInternal=null,this._rootInternal=null),Promise.resolve()}_checkNotDeleted(e){this._rootInternal===null&&ut("Cannot call "+e+" on a deleted database.")}}function rI(t=Fh(),e){const n=Wa(t,"database").getImmediate({identifier:e});if(!n._instanceStarted){const s=Sv("database");s&&oI(n,...s)}return n}function oI(t,e,n,s={}){t=ue(t),t._checkNotDeleted("useEmulator");const i=`${e}:${n}`,r=t._repoInternal;if(t._instanceStarted){if(i===t._repoInternal.repoInfo_.host&&rn(s,r.repoInfo_.emulatorOptions))return;ut("connectDatabaseEmulator() cannot initialize or alter the emulator configuration after the database instance has started.")}let o;if(r.repoInfo_.nodeAdmin)s.mockUserToken&&ut('mockUserToken is not supported by the Admin SDK. For client access with mock users, please use the "firebase" package instead of "firebase-admin".'),o=new Ti(Ti.OWNER);else if(s.mockUserToken){const a=typeof s.mockUserToken=="string"?s.mockUserToken:Cv(s.mockUserToken,t.app.options.projectId);o=new Ti(a)}Jn(e)&&(Nh(e),Ph("Database",!0)),eI(r,i,s,o)}/**
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
 */function aI(t){Qw(Xn),Dn(new on("database",(e,{instanceIdentifier:n})=>{const s=e.getProvider("app").getImmediate(),i=e.getProvider("auth-internal"),r=e.getProvider("app-check-internal");return tI(s,i,r,n)},"PUBLIC").setMultipleInstances(!0)),kt(mu,_u,t),kt(mu,_u,"esm2020")}at.prototype.simpleListen=function(t,e){this.sendRequest("q",{p:t},e)};at.prototype.echo=function(t,e){this.sendRequest("echo",{d:t},e)};aI();var cI="firebase",lI="12.4.0";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */kt(cI,lI,"app");const uI={apiKey:"AIzaSyA-fvCaKCjyEFX__YAVr1oPGdVsUEhFehA",authDomain:"vidu-aae11.firebaseapp.com",projectId:"vidu-aae11",databaseURL:"https://vidu-aae11-default-rtdb.europe-west1.firebasedatabase.app",storageBucket:"vidu-aae11.firebasestorage.app",messagingSenderId:"765724787439",appId:"1:765724787439:web:61a3b5dd538149564c911a",measurementId:"G-EGJ53HLGY4"},np=xh(uI),re=rI(np),Fe=[];function Kt(t,e,n,s=null,i=null,r=null){e==="value"?KC(t,n):e==="child_added"?JC(t,n):e==="child_removed"?QC(t,n):console.warn(`Unknown listener type: ${e}`),Fe.push({ref:t,type:e,callback:n,roomId:s,userId:i,category:r})}function dI(){Fe.forEach(({ref:t,type:e,callback:n})=>{try{Ur(t,e,n)}catch(s){console.warn("Failed to remove firebase rtdb listener",s)}}),Fe.length=0}function $r(t){if(!t)return;Fe.filter(s=>s.roomId===t).forEach(({ref:s,type:i,callback:r})=>{try{Ur(s,i,r)}catch(o){console.warn(`Failed to remove listener for room ${t}`,o)}});const n=Fe.filter(s=>s.roomId!==t);Fe.length=0,Fe.push(...n)}function hI(t,e){if(!t||!e)return;const n=r=>r.userId===t&&r.roomId===e;Fe.filter(n).forEach(({ref:r,type:o,callback:a})=>{try{Ur(r,o,a)}catch(c){console.warn(`Failed to remove listener for user ${t} in room ${e}`,c)}});const i=Fe.filter(r=>!n(r));Fe.length=0,Fe.push(...i)}function ki(t,e,n=null){Kt(t,"value",e,n)}const Ht=t=>ie(re,`rooms/${t}`),yi=t=>ie(re,`rooms/${t}/members`),Ju=(t,e)=>ie(re,`rooms/${t}/members/${e}`),fI=t=>ie(re,`rooms/${t}/cancellation`),Br=t=>ie(re,`rooms/${t}/watch`),pI=t=>ie(re,`users/${t}/recentCalls`),Ic=(t,e)=>ie(re,`users/${t}/recentCalls/${e}`),Tc=t=>ie(re,`users/${t}/outgoingCall`),sp=t=>ie(re,`rooms/${t}/offerCandidates`),ip=t=>ie(re,`rooms/${t}/answerCandidates`);function rp(){return{"dependent-sdk-initialized-before-auth":"Another Firebase SDK was initialized and is trying to use Auth before Auth is initialized. Please be sure to call `initializeAuth` or `getAuth` before starting any other Firebase SDK."}}const gI=rp,op=new Zs("auth","Firebase",rp());/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const sr=new Ba("@firebase/auth");function mI(t,...e){sr.logLevel<=L.WARN&&sr.warn(`Auth (${Xn}): ${t}`,...e)}function Ai(t,...e){sr.logLevel<=L.ERROR&&sr.error(`Auth (${Xn}): ${t}`,...e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ke(t,...e){throw kc(t,...e)}function He(t,...e){return kc(t,...e)}function Rc(t,e,n){const s={...gI(),[e]:n};return new Zs("auth","Firebase",s).create(e,{appName:t.name})}function en(t){return Rc(t,"operation-not-supported-in-this-environment","Operations that alter the current user are not supported in conjunction with FirebaseServerApp")}function _I(t,e,n){const s=n;if(!(e instanceof s))throw s.name!==e.constructor.name&&Ke(t,"argument-error"),Rc(t,"argument-error",`Type of ${e.constructor.name} does not match expected instance.Did you pass a reference from a different Auth SDK?`)}function kc(t,...e){if(typeof t!="string"){const n=e[0],s=[...e.slice(1)];return s[0]&&(s[0].appName=t.name),t._errorFactory.create(n,...s)}return op.create(t,...e)}function b(t,e,...n){if(!t)throw kc(e,...n)}function st(t){const e="INTERNAL ASSERTION FAILED: "+t;throw Ai(e),new Error(e)}function ht(t,e){t||st(e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function oa(){return typeof self<"u"&&self.location?.href||""}function yI(){return Qu()==="http:"||Qu()==="https:"}function Qu(){return typeof self<"u"&&self.location?.protocol||null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function EI(){return typeof navigator<"u"&&navigator&&"onLine"in navigator&&typeof navigator.onLine=="boolean"&&(yI()||kv()||"connection"in navigator)?navigator.onLine:!0}function vI(){if(typeof navigator>"u")return null;const t=navigator;return t.languages&&t.languages[0]||t.language||null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ai{constructor(e,n){this.shortDelay=e,this.longDelay=n,ht(n>e,"Short delay should be less than long delay!"),this.isMobile=$a()||Lh()}get(){return EI()?this.isMobile?this.longDelay:this.shortDelay:Math.min(5e3,this.shortDelay)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ac(t,e){ht(t.emulator,"Emulator should always be set here");const{url:n}=t.emulator;return e?`${n}${e.startsWith("/")?e.slice(1):e}`:n}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ap{static initialize(e,n,s){this.fetchImpl=e,n&&(this.headersImpl=n),s&&(this.responseImpl=s)}static fetch(){if(this.fetchImpl)return this.fetchImpl;if(typeof self<"u"&&"fetch"in self)return self.fetch;if(typeof globalThis<"u"&&globalThis.fetch)return globalThis.fetch;if(typeof fetch<"u")return fetch;st("Could not find fetch implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static headers(){if(this.headersImpl)return this.headersImpl;if(typeof self<"u"&&"Headers"in self)return self.Headers;if(typeof globalThis<"u"&&globalThis.Headers)return globalThis.Headers;if(typeof Headers<"u")return Headers;st("Could not find Headers implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static response(){if(this.responseImpl)return this.responseImpl;if(typeof self<"u"&&"Response"in self)return self.Response;if(typeof globalThis<"u"&&globalThis.Response)return globalThis.Response;if(typeof Response<"u")return Response;st("Could not find Response implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const wI={CREDENTIAL_MISMATCH:"custom-token-mismatch",MISSING_CUSTOM_TOKEN:"internal-error",INVALID_IDENTIFIER:"invalid-email",MISSING_CONTINUE_URI:"internal-error",INVALID_PASSWORD:"wrong-password",MISSING_PASSWORD:"missing-password",INVALID_LOGIN_CREDENTIALS:"invalid-credential",EMAIL_EXISTS:"email-already-in-use",PASSWORD_LOGIN_DISABLED:"operation-not-allowed",INVALID_IDP_RESPONSE:"invalid-credential",INVALID_PENDING_TOKEN:"invalid-credential",FEDERATED_USER_ID_ALREADY_LINKED:"credential-already-in-use",MISSING_REQ_TYPE:"internal-error",EMAIL_NOT_FOUND:"user-not-found",RESET_PASSWORD_EXCEED_LIMIT:"too-many-requests",EXPIRED_OOB_CODE:"expired-action-code",INVALID_OOB_CODE:"invalid-action-code",MISSING_OOB_CODE:"internal-error",CREDENTIAL_TOO_OLD_LOGIN_AGAIN:"requires-recent-login",INVALID_ID_TOKEN:"invalid-user-token",TOKEN_EXPIRED:"user-token-expired",USER_NOT_FOUND:"user-token-expired",TOO_MANY_ATTEMPTS_TRY_LATER:"too-many-requests",PASSWORD_DOES_NOT_MEET_REQUIREMENTS:"password-does-not-meet-requirements",INVALID_CODE:"invalid-verification-code",INVALID_SESSION_INFO:"invalid-verification-id",INVALID_TEMPORARY_PROOF:"invalid-credential",MISSING_SESSION_INFO:"missing-verification-id",SESSION_EXPIRED:"code-expired",MISSING_ANDROID_PACKAGE_NAME:"missing-android-pkg-name",UNAUTHORIZED_DOMAIN:"unauthorized-continue-uri",INVALID_OAUTH_CLIENT_ID:"invalid-oauth-client-id",ADMIN_ONLY_OPERATION:"admin-restricted-operation",INVALID_MFA_PENDING_CREDENTIAL:"invalid-multi-factor-session",MFA_ENROLLMENT_NOT_FOUND:"multi-factor-info-not-found",MISSING_MFA_ENROLLMENT_ID:"missing-multi-factor-info",MISSING_MFA_PENDING_CREDENTIAL:"missing-multi-factor-session",SECOND_FACTOR_EXISTS:"second-factor-already-in-use",SECOND_FACTOR_LIMIT_EXCEEDED:"maximum-second-factor-count-exceeded",BLOCKING_FUNCTION_ERROR_RESPONSE:"internal-error",RECAPTCHA_NOT_ENABLED:"recaptcha-not-enabled",MISSING_RECAPTCHA_TOKEN:"missing-recaptcha-token",INVALID_RECAPTCHA_TOKEN:"invalid-recaptcha-token",INVALID_RECAPTCHA_ACTION:"invalid-recaptcha-action",MISSING_CLIENT_TYPE:"missing-client-type",MISSING_RECAPTCHA_VERSION:"missing-recaptcha-version",INVALID_RECAPTCHA_VERSION:"invalid-recaptcha-version",INVALID_REQ_TYPE:"invalid-req-type"};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const bI=["/v1/accounts:signInWithCustomToken","/v1/accounts:signInWithEmailLink","/v1/accounts:signInWithIdp","/v1/accounts:signInWithPassword","/v1/accounts:signInWithPhoneNumber","/v1/token"],SI=new ai(3e4,6e4);function Nc(t,e){return t.tenantId&&!e.tenantId?{...e,tenantId:t.tenantId}:e}async function ns(t,e,n,s,i={}){return cp(t,i,async()=>{let r={},o={};s&&(e==="GET"?o=s:r={body:JSON.stringify(s)});const a=Qn({key:t.config.apiKey,...o}).slice(1),c=await t._getAdditionalHeaders();c["Content-Type"]="application/json",t.languageCode&&(c["X-Firebase-Locale"]=t.languageCode);const l={method:e,headers:c,...r};return Rv()||(l.referrerPolicy="no-referrer"),t.emulatorConfig&&Jn(t.emulatorConfig.host)&&(l.credentials="include"),ap.fetch()(await lp(t,t.config.apiHost,n,a),l)})}async function cp(t,e,n){t._canInitEmulator=!1;const s={...wI,...e};try{const i=new II(t),r=await Promise.race([n(),i.promise]);i.clearNetworkTimeout();const o=await r.json();if("needConfirmation"in o)throw Ei(t,"account-exists-with-different-credential",o);if(r.ok&&!("errorMessage"in o))return o;{const a=r.ok?o.errorMessage:o.error.message,[c,l]=a.split(" : ");if(c==="FEDERATED_USER_ID_ALREADY_LINKED")throw Ei(t,"credential-already-in-use",o);if(c==="EMAIL_EXISTS")throw Ei(t,"email-already-in-use",o);if(c==="USER_DISABLED")throw Ei(t,"user-disabled",o);const u=s[c]||c.toLowerCase().replace(/[_\s]+/g,"-");if(l)throw Rc(t,u,l);Ke(t,u)}}catch(i){if(i instanceof Ut)throw i;Ke(t,"network-request-failed",{message:String(i)})}}async function CI(t,e,n,s,i={}){const r=await ns(t,e,n,s,i);return"mfaPendingCredential"in r&&Ke(t,"multi-factor-auth-required",{_serverResponse:r}),r}async function lp(t,e,n,s){const i=`${e}${n}?${s}`,r=t,o=r.config.emulator?Ac(t.config,i):`${t.config.apiScheme}://${i}`;return bI.includes(n)&&(await r._persistenceManagerAvailable,r._getPersistenceType()==="COOKIE")?r._getPersistence()._getFinalTarget(o).toString():o}class II{clearNetworkTimeout(){clearTimeout(this.timer)}constructor(e){this.auth=e,this.timer=null,this.promise=new Promise((n,s)=>{this.timer=setTimeout(()=>s(He(this.auth,"network-request-failed")),SI.get())})}}function Ei(t,e,n){const s={appName:t.name};n.email&&(s.email=n.email),n.phoneNumber&&(s.phoneNumber=n.phoneNumber);const i=He(t,e,s);return i.customData._tokenResponse=n,i}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function TI(t,e){return ns(t,"POST","/v1/accounts:delete",e)}async function ir(t,e){return ns(t,"POST","/v1/accounts:lookup",e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Is(t){if(t)try{const e=new Date(Number(t));if(!isNaN(e.getTime()))return e.toUTCString()}catch{}}async function RI(t,e=!1){const n=ue(t),s=await n.getIdToken(e),i=Pc(s);b(i&&i.exp&&i.auth_time&&i.iat,n.auth,"internal-error");const r=typeof i.firebase=="object"?i.firebase:void 0,o=r?.sign_in_provider;return{claims:i,token:s,authTime:Is(yo(i.auth_time)),issuedAtTime:Is(yo(i.iat)),expirationTime:Is(yo(i.exp)),signInProvider:o||null,signInSecondFactor:r?.sign_in_second_factor||null}}function yo(t){return Number(t)*1e3}function Pc(t){const[e,n,s]=t.split(".");if(e===void 0||n===void 0||s===void 0)return Ai("JWT malformed, contained fewer than 3 sections"),null;try{const i=Hi(n);return i?JSON.parse(i):(Ai("Failed to decode base64 JWT payload"),null)}catch(i){return Ai("Caught error parsing JWT payload as JSON",i?.toString()),null}}function Xu(t){const e=Pc(t);return b(e,"internal-error"),b(typeof e.exp<"u","internal-error"),b(typeof e.iat<"u","internal-error"),Number(e.exp)-Number(e.iat)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Vs(t,e,n=!1){if(n)return e;try{return await e}catch(s){throw s instanceof Ut&&kI(s)&&t.auth.currentUser===t&&await t.auth.signOut(),s}}function kI({code:t}){return t==="auth/user-disabled"||t==="auth/user-token-expired"}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class AI{constructor(e){this.user=e,this.isRunning=!1,this.timerId=null,this.errorBackoff=3e4}_start(){this.isRunning||(this.isRunning=!0,this.schedule())}_stop(){this.isRunning&&(this.isRunning=!1,this.timerId!==null&&clearTimeout(this.timerId))}getInterval(e){if(e){const n=this.errorBackoff;return this.errorBackoff=Math.min(this.errorBackoff*2,96e4),n}else{this.errorBackoff=3e4;const s=(this.user.stsTokenManager.expirationTime??0)-Date.now()-3e5;return Math.max(0,s)}}schedule(e=!1){if(!this.isRunning)return;const n=this.getInterval(e);this.timerId=setTimeout(async()=>{await this.iteration()},n)}async iteration(){try{await this.user.getIdToken(!0)}catch(e){e?.code==="auth/network-request-failed"&&this.schedule(!0);return}this.schedule()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class aa{constructor(e,n){this.createdAt=e,this.lastLoginAt=n,this._initializeTime()}_initializeTime(){this.lastSignInTime=Is(this.lastLoginAt),this.creationTime=Is(this.createdAt)}_copy(e){this.createdAt=e.createdAt,this.lastLoginAt=e.lastLoginAt,this._initializeTime()}toJSON(){return{createdAt:this.createdAt,lastLoginAt:this.lastLoginAt}}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function rr(t){const e=t.auth,n=await t.getIdToken(),s=await Vs(t,ir(e,{idToken:n}));b(s?.users.length,e,"internal-error");const i=s.users[0];t._notifyReloadListener(i);const r=i.providerUserInfo?.length?up(i.providerUserInfo):[],o=PI(t.providerData,r),a=t.isAnonymous,c=!(t.email&&i.passwordHash)&&!o?.length,l=a?c:!1,u={uid:i.localId,displayName:i.displayName||null,photoURL:i.photoUrl||null,email:i.email||null,emailVerified:i.emailVerified||!1,phoneNumber:i.phoneNumber||null,tenantId:i.tenantId||null,providerData:o,metadata:new aa(i.createdAt,i.lastLoginAt),isAnonymous:l};Object.assign(t,u)}async function NI(t){const e=ue(t);await rr(e),await e.auth._persistUserIfCurrent(e),e.auth._notifyListenersIfCurrent(e)}function PI(t,e){return[...t.filter(s=>!e.some(i=>i.providerId===s.providerId)),...e]}function up(t){return t.map(({providerId:e,...n})=>({providerId:e,uid:n.rawId||"",displayName:n.displayName||null,email:n.email||null,phoneNumber:n.phoneNumber||null,photoURL:n.photoUrl||null}))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function LI(t,e){const n=await cp(t,{},async()=>{const s=Qn({grant_type:"refresh_token",refresh_token:e}).slice(1),{tokenApiHost:i,apiKey:r}=t.config,o=await lp(t,i,"/v1/token",`key=${r}`),a=await t._getAdditionalHeaders();a["Content-Type"]="application/x-www-form-urlencoded";const c={method:"POST",headers:a,body:s};return t.emulatorConfig&&Jn(t.emulatorConfig.host)&&(c.credentials="include"),ap.fetch()(o,c)});return{accessToken:n.access_token,expiresIn:n.expires_in,refreshToken:n.refresh_token}}async function OI(t,e){return ns(t,"POST","/v2/accounts:revokeToken",Nc(t,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class wn{constructor(){this.refreshToken=null,this.accessToken=null,this.expirationTime=null}get isExpired(){return!this.expirationTime||Date.now()>this.expirationTime-3e4}updateFromServerResponse(e){b(e.idToken,"internal-error"),b(typeof e.idToken<"u","internal-error"),b(typeof e.refreshToken<"u","internal-error");const n="expiresIn"in e&&typeof e.expiresIn<"u"?Number(e.expiresIn):Xu(e.idToken);this.updateTokensAndExpiration(e.idToken,e.refreshToken,n)}updateFromIdToken(e){b(e.length!==0,"internal-error");const n=Xu(e);this.updateTokensAndExpiration(e,null,n)}async getToken(e,n=!1){return!n&&this.accessToken&&!this.isExpired?this.accessToken:(b(this.refreshToken,e,"user-token-expired"),this.refreshToken?(await this.refresh(e,this.refreshToken),this.accessToken):null)}clearRefreshToken(){this.refreshToken=null}async refresh(e,n){const{accessToken:s,refreshToken:i,expiresIn:r}=await LI(e,n);this.updateTokensAndExpiration(s,i,Number(r))}updateTokensAndExpiration(e,n,s){this.refreshToken=n||null,this.accessToken=e||null,this.expirationTime=Date.now()+s*1e3}static fromJSON(e,n){const{refreshToken:s,accessToken:i,expirationTime:r}=n,o=new wn;return s&&(b(typeof s=="string","internal-error",{appName:e}),o.refreshToken=s),i&&(b(typeof i=="string","internal-error",{appName:e}),o.accessToken=i),r&&(b(typeof r=="number","internal-error",{appName:e}),o.expirationTime=r),o}toJSON(){return{refreshToken:this.refreshToken,accessToken:this.accessToken,expirationTime:this.expirationTime}}_assign(e){this.accessToken=e.accessToken,this.refreshToken=e.refreshToken,this.expirationTime=e.expirationTime}_clone(){return Object.assign(new wn,this.toJSON())}_performRefresh(){return st("not implemented")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function gt(t,e){b(typeof t=="string"||typeof t>"u","internal-error",{appName:e})}class Ue{constructor({uid:e,auth:n,stsTokenManager:s,...i}){this.providerId="firebase",this.proactiveRefresh=new AI(this),this.reloadUserInfo=null,this.reloadListener=null,this.uid=e,this.auth=n,this.stsTokenManager=s,this.accessToken=s.accessToken,this.displayName=i.displayName||null,this.email=i.email||null,this.emailVerified=i.emailVerified||!1,this.phoneNumber=i.phoneNumber||null,this.photoURL=i.photoURL||null,this.isAnonymous=i.isAnonymous||!1,this.tenantId=i.tenantId||null,this.providerData=i.providerData?[...i.providerData]:[],this.metadata=new aa(i.createdAt||void 0,i.lastLoginAt||void 0)}async getIdToken(e){const n=await Vs(this,this.stsTokenManager.getToken(this.auth,e));return b(n,this.auth,"internal-error"),this.accessToken!==n&&(this.accessToken=n,await this.auth._persistUserIfCurrent(this),this.auth._notifyListenersIfCurrent(this)),n}getIdTokenResult(e){return RI(this,e)}reload(){return NI(this)}_assign(e){this!==e&&(b(this.uid===e.uid,this.auth,"internal-error"),this.displayName=e.displayName,this.photoURL=e.photoURL,this.email=e.email,this.emailVerified=e.emailVerified,this.phoneNumber=e.phoneNumber,this.isAnonymous=e.isAnonymous,this.tenantId=e.tenantId,this.providerData=e.providerData.map(n=>({...n})),this.metadata._copy(e.metadata),this.stsTokenManager._assign(e.stsTokenManager))}_clone(e){const n=new Ue({...this,auth:e,stsTokenManager:this.stsTokenManager._clone()});return n.metadata._copy(this.metadata),n}_onReload(e){b(!this.reloadListener,this.auth,"internal-error"),this.reloadListener=e,this.reloadUserInfo&&(this._notifyReloadListener(this.reloadUserInfo),this.reloadUserInfo=null)}_notifyReloadListener(e){this.reloadListener?this.reloadListener(e):this.reloadUserInfo=e}_startProactiveRefresh(){this.proactiveRefresh._start()}_stopProactiveRefresh(){this.proactiveRefresh._stop()}async _updateTokensIfNecessary(e,n=!1){let s=!1;e.idToken&&e.idToken!==this.stsTokenManager.accessToken&&(this.stsTokenManager.updateFromServerResponse(e),s=!0),n&&await rr(this),await this.auth._persistUserIfCurrent(this),s&&this.auth._notifyListenersIfCurrent(this)}async delete(){if(De(this.auth.app))return Promise.reject(en(this.auth));const e=await this.getIdToken();return await Vs(this,TI(this.auth,{idToken:e})),this.stsTokenManager.clearRefreshToken(),this.auth.signOut()}toJSON(){return{uid:this.uid,email:this.email||void 0,emailVerified:this.emailVerified,displayName:this.displayName||void 0,isAnonymous:this.isAnonymous,photoURL:this.photoURL||void 0,phoneNumber:this.phoneNumber||void 0,tenantId:this.tenantId||void 0,providerData:this.providerData.map(e=>({...e})),stsTokenManager:this.stsTokenManager.toJSON(),_redirectEventId:this._redirectEventId,...this.metadata.toJSON(),apiKey:this.auth.config.apiKey,appName:this.auth.name}}get refreshToken(){return this.stsTokenManager.refreshToken||""}static _fromJSON(e,n){const s=n.displayName??void 0,i=n.email??void 0,r=n.phoneNumber??void 0,o=n.photoURL??void 0,a=n.tenantId??void 0,c=n._redirectEventId??void 0,l=n.createdAt??void 0,u=n.lastLoginAt??void 0,{uid:d,emailVerified:h,isAnonymous:f,providerData:p,stsTokenManager:E}=n;b(d&&E,e,"internal-error");const m=wn.fromJSON(this.name,E);b(typeof d=="string",e,"internal-error"),gt(s,e.name),gt(i,e.name),b(typeof h=="boolean",e,"internal-error"),b(typeof f=="boolean",e,"internal-error"),gt(r,e.name),gt(o,e.name),gt(a,e.name),gt(c,e.name),gt(l,e.name),gt(u,e.name);const A=new Ue({uid:d,auth:e,email:i,emailVerified:h,displayName:s,isAnonymous:f,photoURL:o,phoneNumber:r,tenantId:a,stsTokenManager:m,createdAt:l,lastLoginAt:u});return p&&Array.isArray(p)&&(A.providerData=p.map(N=>({...N}))),c&&(A._redirectEventId=c),A}static async _fromIdTokenResponse(e,n,s=!1){const i=new wn;i.updateFromServerResponse(n);const r=new Ue({uid:n.localId,auth:e,stsTokenManager:i,isAnonymous:s});return await rr(r),r}static async _fromGetAccountInfoResponse(e,n,s){const i=n.users[0];b(i.localId!==void 0,"internal-error");const r=i.providerUserInfo!==void 0?up(i.providerUserInfo):[],o=!(i.email&&i.passwordHash)&&!r?.length,a=new wn;a.updateFromIdToken(s);const c=new Ue({uid:i.localId,auth:e,stsTokenManager:a,isAnonymous:o}),l={uid:i.localId,displayName:i.displayName||null,photoURL:i.photoUrl||null,email:i.email||null,emailVerified:i.emailVerified||!1,phoneNumber:i.phoneNumber||null,tenantId:i.tenantId||null,providerData:r,metadata:new aa(i.createdAt,i.lastLoginAt),isAnonymous:!(i.email&&i.passwordHash)&&!r?.length};return Object.assign(c,l),c}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Zu=new Map;function it(t){ht(t instanceof Function,"Expected a class definition");let e=Zu.get(t);return e?(ht(e instanceof t,"Instance stored in cache mismatched with class"),e):(e=new t,Zu.set(t,e),e)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class dp{constructor(){this.type="NONE",this.storage={}}async _isAvailable(){return!0}async _set(e,n){this.storage[e]=n}async _get(e){const n=this.storage[e];return n===void 0?null:n}async _remove(e){delete this.storage[e]}_addListener(e,n){}_removeListener(e,n){}}dp.type="NONE";const ca=dp;/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ni(t,e,n){return`firebase:${t}:${e}:${n}`}class bn{constructor(e,n,s){this.persistence=e,this.auth=n,this.userKey=s;const{config:i,name:r}=this.auth;this.fullUserKey=Ni(this.userKey,i.apiKey,r),this.fullPersistenceKey=Ni("persistence",i.apiKey,r),this.boundEventHandler=n._onStorageEvent.bind(n),this.persistence._addListener(this.fullUserKey,this.boundEventHandler)}setCurrentUser(e){return this.persistence._set(this.fullUserKey,e.toJSON())}async getCurrentUser(){const e=await this.persistence._get(this.fullUserKey);if(!e)return null;if(typeof e=="string"){const n=await ir(this.auth,{idToken:e}).catch(()=>{});return n?Ue._fromGetAccountInfoResponse(this.auth,n,e):null}return Ue._fromJSON(this.auth,e)}removeCurrentUser(){return this.persistence._remove(this.fullUserKey)}savePersistenceForRedirect(){return this.persistence._set(this.fullPersistenceKey,this.persistence.type)}async setPersistence(e){if(this.persistence===e)return;const n=await this.getCurrentUser();if(await this.removeCurrentUser(),this.persistence=e,n)return this.setCurrentUser(n)}delete(){this.persistence._removeListener(this.fullUserKey,this.boundEventHandler)}static async create(e,n,s="authUser"){if(!n.length)return new bn(it(ca),e,s);const i=(await Promise.all(n.map(async l=>{if(await l._isAvailable())return l}))).filter(l=>l);let r=i[0]||it(ca);const o=Ni(s,e.config.apiKey,e.name);let a=null;for(const l of n)try{const u=await l._get(o);if(u){let d;if(typeof u=="string"){const h=await ir(e,{idToken:u}).catch(()=>{});if(!h)break;d=await Ue._fromGetAccountInfoResponse(e,h,u)}else d=Ue._fromJSON(e,u);l!==r&&(a=d),r=l;break}}catch{}const c=i.filter(l=>l._shouldAllowMigration);return!r._shouldAllowMigration||!c.length?new bn(r,e,s):(r=c[0],a&&await r._set(o,a.toJSON()),await Promise.all(n.map(async l=>{if(l!==r)try{await l._remove(o)}catch{}})),new bn(r,e,s))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ed(t){const e=t.toLowerCase();if(e.includes("opera/")||e.includes("opr/")||e.includes("opios/"))return"Opera";if(gp(e))return"IEMobile";if(e.includes("msie")||e.includes("trident/"))return"IE";if(e.includes("edge/"))return"Edge";if(hp(e))return"Firefox";if(e.includes("silk/"))return"Silk";if(_p(e))return"Blackberry";if(yp(e))return"Webos";if(fp(e))return"Safari";if((e.includes("chrome/")||pp(e))&&!e.includes("edge/"))return"Chrome";if(mp(e))return"Android";{const n=/([a-zA-Z\d\.]+)\/[a-zA-Z\d\.]*$/,s=t.match(n);if(s?.length===2)return s[1]}return"Other"}function hp(t=me()){return/firefox\//i.test(t)}function fp(t=me()){const e=t.toLowerCase();return e.includes("safari/")&&!e.includes("chrome/")&&!e.includes("crios/")&&!e.includes("android")}function pp(t=me()){return/crios\//i.test(t)}function gp(t=me()){return/iemobile/i.test(t)}function mp(t=me()){return/android/i.test(t)}function _p(t=me()){return/blackberry/i.test(t)}function yp(t=me()){return/webos/i.test(t)}function Lc(t=me()){return/iphone|ipad|ipod/i.test(t)||/macintosh/i.test(t)&&/mobile/i.test(t)}function DI(t=me()){return Lc(t)&&!!window.navigator?.standalone}function MI(){return Av()&&document.documentMode===10}function Ep(t=me()){return Lc(t)||mp(t)||yp(t)||_p(t)||/windows phone/i.test(t)||gp(t)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function vp(t,e=[]){let n;switch(t){case"Browser":n=ed(me());break;case"Worker":n=`${ed(me())}-${t}`;break;default:n=t}const s=e.length?e.join(","):"FirebaseCore-web";return`${n}/JsCore/${Xn}/${s}`}/**
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
 */class xI{constructor(e){this.auth=e,this.queue=[]}pushCallback(e,n){const s=r=>new Promise((o,a)=>{try{const c=e(r);o(c)}catch(c){a(c)}});s.onAbort=n,this.queue.push(s);const i=this.queue.length-1;return()=>{this.queue[i]=()=>Promise.resolve()}}async runMiddleware(e){if(this.auth.currentUser===e)return;const n=[];try{for(const s of this.queue)await s(e),s.onAbort&&n.push(s.onAbort)}catch(s){n.reverse();for(const i of n)try{i()}catch{}throw this.auth._errorFactory.create("login-blocked",{originalMessage:s?.message})}}}/**
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
 */async function FI(t,e={}){return ns(t,"GET","/v2/passwordPolicy",Nc(t,e))}/**
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
 */const UI=6;class $I{constructor(e){const n=e.customStrengthOptions;this.customStrengthOptions={},this.customStrengthOptions.minPasswordLength=n.minPasswordLength??UI,n.maxPasswordLength&&(this.customStrengthOptions.maxPasswordLength=n.maxPasswordLength),n.containsLowercaseCharacter!==void 0&&(this.customStrengthOptions.containsLowercaseLetter=n.containsLowercaseCharacter),n.containsUppercaseCharacter!==void 0&&(this.customStrengthOptions.containsUppercaseLetter=n.containsUppercaseCharacter),n.containsNumericCharacter!==void 0&&(this.customStrengthOptions.containsNumericCharacter=n.containsNumericCharacter),n.containsNonAlphanumericCharacter!==void 0&&(this.customStrengthOptions.containsNonAlphanumericCharacter=n.containsNonAlphanumericCharacter),this.enforcementState=e.enforcementState,this.enforcementState==="ENFORCEMENT_STATE_UNSPECIFIED"&&(this.enforcementState="OFF"),this.allowedNonAlphanumericCharacters=e.allowedNonAlphanumericCharacters?.join("")??"",this.forceUpgradeOnSignin=e.forceUpgradeOnSignin??!1,this.schemaVersion=e.schemaVersion}validatePassword(e){const n={isValid:!0,passwordPolicy:this};return this.validatePasswordLengthOptions(e,n),this.validatePasswordCharacterOptions(e,n),n.isValid&&(n.isValid=n.meetsMinPasswordLength??!0),n.isValid&&(n.isValid=n.meetsMaxPasswordLength??!0),n.isValid&&(n.isValid=n.containsLowercaseLetter??!0),n.isValid&&(n.isValid=n.containsUppercaseLetter??!0),n.isValid&&(n.isValid=n.containsNumericCharacter??!0),n.isValid&&(n.isValid=n.containsNonAlphanumericCharacter??!0),n}validatePasswordLengthOptions(e,n){const s=this.customStrengthOptions.minPasswordLength,i=this.customStrengthOptions.maxPasswordLength;s&&(n.meetsMinPasswordLength=e.length>=s),i&&(n.meetsMaxPasswordLength=e.length<=i)}validatePasswordCharacterOptions(e,n){this.updatePasswordCharacterOptionsStatuses(n,!1,!1,!1,!1);let s;for(let i=0;i<e.length;i++)s=e.charAt(i),this.updatePasswordCharacterOptionsStatuses(n,s>="a"&&s<="z",s>="A"&&s<="Z",s>="0"&&s<="9",this.allowedNonAlphanumericCharacters.includes(s))}updatePasswordCharacterOptionsStatuses(e,n,s,i,r){this.customStrengthOptions.containsLowercaseLetter&&(e.containsLowercaseLetter||(e.containsLowercaseLetter=n)),this.customStrengthOptions.containsUppercaseLetter&&(e.containsUppercaseLetter||(e.containsUppercaseLetter=s)),this.customStrengthOptions.containsNumericCharacter&&(e.containsNumericCharacter||(e.containsNumericCharacter=i)),this.customStrengthOptions.containsNonAlphanumericCharacter&&(e.containsNonAlphanumericCharacter||(e.containsNonAlphanumericCharacter=r))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class BI{constructor(e,n,s,i){this.app=e,this.heartbeatServiceProvider=n,this.appCheckServiceProvider=s,this.config=i,this.currentUser=null,this.emulatorConfig=null,this.operations=Promise.resolve(),this.authStateSubscription=new td(this),this.idTokenSubscription=new td(this),this.beforeStateQueue=new xI(this),this.redirectUser=null,this.isProactiveRefreshEnabled=!1,this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION=1,this._canInitEmulator=!0,this._isInitialized=!1,this._deleted=!1,this._initializationPromise=null,this._popupRedirectResolver=null,this._errorFactory=op,this._agentRecaptchaConfig=null,this._tenantRecaptchaConfigs={},this._projectPasswordPolicy=null,this._tenantPasswordPolicies={},this._resolvePersistenceManagerAvailable=void 0,this.lastNotifiedUid=void 0,this.languageCode=null,this.tenantId=null,this.settings={appVerificationDisabledForTesting:!1},this.frameworks=[],this.name=e.name,this.clientVersion=i.sdkClientVersion,this._persistenceManagerAvailable=new Promise(r=>this._resolvePersistenceManagerAvailable=r)}_initializeWithPersistence(e,n){return n&&(this._popupRedirectResolver=it(n)),this._initializationPromise=this.queue(async()=>{if(!this._deleted&&(this.persistenceManager=await bn.create(this,e),this._resolvePersistenceManagerAvailable?.(),!this._deleted)){if(this._popupRedirectResolver?._shouldInitProactively)try{await this._popupRedirectResolver._initialize(this)}catch{}await this.initializeCurrentUser(n),this.lastNotifiedUid=this.currentUser?.uid||null,!this._deleted&&(this._isInitialized=!0)}}),this._initializationPromise}async _onStorageEvent(){if(this._deleted)return;const e=await this.assertedPersistence.getCurrentUser();if(!(!this.currentUser&&!e)){if(this.currentUser&&e&&this.currentUser.uid===e.uid){this._currentUser._assign(e),await this.currentUser.getIdToken();return}await this._updateCurrentUser(e,!0)}}async initializeCurrentUserFromIdToken(e){try{const n=await ir(this,{idToken:e}),s=await Ue._fromGetAccountInfoResponse(this,n,e);await this.directlySetCurrentUser(s)}catch(n){console.warn("FirebaseServerApp could not login user with provided authIdToken: ",n),await this.directlySetCurrentUser(null)}}async initializeCurrentUser(e){if(De(this.app)){const r=this.app.settings.authIdToken;return r?new Promise(o=>{setTimeout(()=>this.initializeCurrentUserFromIdToken(r).then(o,o))}):this.directlySetCurrentUser(null)}const n=await this.assertedPersistence.getCurrentUser();let s=n,i=!1;if(e&&this.config.authDomain){await this.getOrInitRedirectPersistenceManager();const r=this.redirectUser?._redirectEventId,o=s?._redirectEventId,a=await this.tryRedirectSignIn(e);(!r||r===o)&&a?.user&&(s=a.user,i=!0)}if(!s)return this.directlySetCurrentUser(null);if(!s._redirectEventId){if(i)try{await this.beforeStateQueue.runMiddleware(s)}catch(r){s=n,this._popupRedirectResolver._overrideRedirectResult(this,()=>Promise.reject(r))}return s?this.reloadAndSetCurrentUserOrClear(s):this.directlySetCurrentUser(null)}return b(this._popupRedirectResolver,this,"argument-error"),await this.getOrInitRedirectPersistenceManager(),this.redirectUser&&this.redirectUser._redirectEventId===s._redirectEventId?this.directlySetCurrentUser(s):this.reloadAndSetCurrentUserOrClear(s)}async tryRedirectSignIn(e){let n=null;try{n=await this._popupRedirectResolver._completeRedirectFn(this,e,!0)}catch{await this._setRedirectUser(null)}return n}async reloadAndSetCurrentUserOrClear(e){try{await rr(e)}catch(n){if(n?.code!=="auth/network-request-failed")return this.directlySetCurrentUser(null)}return this.directlySetCurrentUser(e)}useDeviceLanguage(){this.languageCode=vI()}async _delete(){this._deleted=!0}async updateCurrentUser(e){if(De(this.app))return Promise.reject(en(this));const n=e?ue(e):null;return n&&b(n.auth.config.apiKey===this.config.apiKey,this,"invalid-user-token"),this._updateCurrentUser(n&&n._clone(this))}async _updateCurrentUser(e,n=!1){if(!this._deleted)return e&&b(this.tenantId===e.tenantId,this,"tenant-id-mismatch"),n||await this.beforeStateQueue.runMiddleware(e),this.queue(async()=>{await this.directlySetCurrentUser(e),this.notifyAuthListeners()})}async signOut(){return De(this.app)?Promise.reject(en(this)):(await this.beforeStateQueue.runMiddleware(null),(this.redirectPersistenceManager||this._popupRedirectResolver)&&await this._setRedirectUser(null),this._updateCurrentUser(null,!0))}setPersistence(e){return De(this.app)?Promise.reject(en(this)):this.queue(async()=>{await this.assertedPersistence.setPersistence(it(e))})}_getRecaptchaConfig(){return this.tenantId==null?this._agentRecaptchaConfig:this._tenantRecaptchaConfigs[this.tenantId]}async validatePassword(e){this._getPasswordPolicyInternal()||await this._updatePasswordPolicy();const n=this._getPasswordPolicyInternal();return n.schemaVersion!==this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION?Promise.reject(this._errorFactory.create("unsupported-password-policy-schema-version",{})):n.validatePassword(e)}_getPasswordPolicyInternal(){return this.tenantId===null?this._projectPasswordPolicy:this._tenantPasswordPolicies[this.tenantId]}async _updatePasswordPolicy(){const e=await FI(this),n=new $I(e);this.tenantId===null?this._projectPasswordPolicy=n:this._tenantPasswordPolicies[this.tenantId]=n}_getPersistenceType(){return this.assertedPersistence.persistence.type}_getPersistence(){return this.assertedPersistence.persistence}_updateErrorMap(e){this._errorFactory=new Zs("auth","Firebase",e())}onAuthStateChanged(e,n,s){return this.registerStateListener(this.authStateSubscription,e,n,s)}beforeAuthStateChanged(e,n){return this.beforeStateQueue.pushCallback(e,n)}onIdTokenChanged(e,n,s){return this.registerStateListener(this.idTokenSubscription,e,n,s)}authStateReady(){return new Promise((e,n)=>{if(this.currentUser)e();else{const s=this.onAuthStateChanged(()=>{s(),e()},n)}})}async revokeAccessToken(e){if(this.currentUser){const n=await this.currentUser.getIdToken(),s={providerId:"apple.com",tokenType:"ACCESS_TOKEN",token:e,idToken:n};this.tenantId!=null&&(s.tenantId=this.tenantId),await OI(this,s)}}toJSON(){return{apiKey:this.config.apiKey,authDomain:this.config.authDomain,appName:this.name,currentUser:this._currentUser?.toJSON()}}async _setRedirectUser(e,n){const s=await this.getOrInitRedirectPersistenceManager(n);return e===null?s.removeCurrentUser():s.setCurrentUser(e)}async getOrInitRedirectPersistenceManager(e){if(!this.redirectPersistenceManager){const n=e&&it(e)||this._popupRedirectResolver;b(n,this,"argument-error"),this.redirectPersistenceManager=await bn.create(this,[it(n._redirectPersistence)],"redirectUser"),this.redirectUser=await this.redirectPersistenceManager.getCurrentUser()}return this.redirectPersistenceManager}async _redirectUserForId(e){return this._isInitialized&&await this.queue(async()=>{}),this._currentUser?._redirectEventId===e?this._currentUser:this.redirectUser?._redirectEventId===e?this.redirectUser:null}async _persistUserIfCurrent(e){if(e===this.currentUser)return this.queue(async()=>this.directlySetCurrentUser(e))}_notifyListenersIfCurrent(e){e===this.currentUser&&this.notifyAuthListeners()}_key(){return`${this.config.authDomain}:${this.config.apiKey}:${this.name}`}_startProactiveRefresh(){this.isProactiveRefreshEnabled=!0,this.currentUser&&this._currentUser._startProactiveRefresh()}_stopProactiveRefresh(){this.isProactiveRefreshEnabled=!1,this.currentUser&&this._currentUser._stopProactiveRefresh()}get _currentUser(){return this.currentUser}notifyAuthListeners(){if(!this._isInitialized)return;this.idTokenSubscription.next(this.currentUser);const e=this.currentUser?.uid??null;this.lastNotifiedUid!==e&&(this.lastNotifiedUid=e,this.authStateSubscription.next(this.currentUser))}registerStateListener(e,n,s,i){if(this._deleted)return()=>{};const r=typeof n=="function"?n:n.next.bind(n);let o=!1;const a=this._isInitialized?Promise.resolve():this._initializationPromise;if(b(a,this,"internal-error"),a.then(()=>{o||r(this.currentUser)}),typeof n=="function"){const c=e.addObserver(n,s,i);return()=>{o=!0,c()}}else{const c=e.addObserver(n);return()=>{o=!0,c()}}}async directlySetCurrentUser(e){this.currentUser&&this.currentUser!==e&&this._currentUser._stopProactiveRefresh(),e&&this.isProactiveRefreshEnabled&&e._startProactiveRefresh(),this.currentUser=e,e?await this.assertedPersistence.setCurrentUser(e):await this.assertedPersistence.removeCurrentUser()}queue(e){return this.operations=this.operations.then(e,e),this.operations}get assertedPersistence(){return b(this.persistenceManager,this,"internal-error"),this.persistenceManager}_logFramework(e){!e||this.frameworks.includes(e)||(this.frameworks.push(e),this.frameworks.sort(),this.clientVersion=vp(this.config.clientPlatform,this._getFrameworks()))}_getFrameworks(){return this.frameworks}async _getAdditionalHeaders(){const e={"X-Client-Version":this.clientVersion};this.app.options.appId&&(e["X-Firebase-gmpid"]=this.app.options.appId);const n=await this.heartbeatServiceProvider.getImmediate({optional:!0})?.getHeartbeatsHeader();n&&(e["X-Firebase-Client"]=n);const s=await this._getAppCheckToken();return s&&(e["X-Firebase-AppCheck"]=s),e}async _getAppCheckToken(){if(De(this.app)&&this.app.settings.appCheckToken)return this.app.settings.appCheckToken;const e=await this.appCheckServiceProvider.getImmediate({optional:!0})?.getToken();return e?.error&&mI(`Error while retrieving App Check token: ${e.error}`),e?.token}}function ss(t){return ue(t)}class td{constructor(e){this.auth=e,this.observer=null,this.addObserver=$v(n=>this.observer=n)}get next(){return b(this.observer,this.auth,"internal-error"),this.observer.next.bind(this.observer)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Oc={async loadJS(){throw new Error("Unable to load external scripts")},recaptchaV2Script:"",recaptchaEnterpriseScript:"",gapiScript:""};function HI(t){Oc=t}function WI(t){return Oc.loadJS(t)}function VI(){return Oc.gapiScript}function jI(t){return`__${t}${Math.floor(Math.random()*1e6)}`}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function GI(t,e){const n=Wa(t,"auth");if(n.isInitialized()){const i=n.getImmediate(),r=n.getOptions();if(rn(r,e??{}))return i;Ke(i,"already-initialized")}return n.initialize({options:e})}function zI(t,e){const n=e?.persistence||[],s=(Array.isArray(n)?n:[n]).map(it);e?.errorMap&&t._updateErrorMap(e.errorMap),t._initializeWithPersistence(s,e?.popupRedirectResolver)}function qI(t,e,n){const s=ss(t);b(/^https?:\/\//.test(e),s,"invalid-emulator-scheme");const i=!1,r=wp(e),{host:o,port:a}=YI(e),c=a===null?"":`:${a}`,l={url:`${r}//${o}${c}/`},u=Object.freeze({host:o,port:a,protocol:r.replace(":",""),options:Object.freeze({disableWarnings:i})});if(!s._canInitEmulator){b(s.config.emulator&&s.emulatorConfig,s,"emulator-config-failed"),b(rn(l,s.config.emulator)&&rn(u,s.emulatorConfig),s,"emulator-config-failed");return}s.config.emulator=l,s.emulatorConfig=u,s.settings.appVerificationDisabledForTesting=!0,Jn(o)?(Nh(`${r}//${o}${c}`),Ph("Auth",!0)):KI()}function wp(t){const e=t.indexOf(":");return e<0?"":t.substr(0,e+1)}function YI(t){const e=wp(t),n=/(\/\/)?([^?#/]+)/.exec(t.substr(e.length));if(!n)return{host:"",port:null};const s=n[2].split("@").pop()||"",i=/^(\[[^\]]+\])(:|$)/.exec(s);if(i){const r=i[1];return{host:r,port:nd(s.substr(r.length+1))}}else{const[r,o]=s.split(":");return{host:r,port:nd(o)}}}function nd(t){if(!t)return null;const e=Number(t);return isNaN(e)?null:e}function KI(){function t(){const e=document.createElement("p"),n=e.style;e.innerText="Running in emulator mode. Do not use with production credentials.",n.position="fixed",n.width="100%",n.backgroundColor="#ffffff",n.border=".1em solid #000000",n.color="#b50000",n.bottom="0px",n.left="0px",n.margin="0px",n.zIndex="10000",n.textAlign="center",e.classList.add("firebase-emulator-warning"),document.body.appendChild(e)}typeof console<"u"&&typeof console.info=="function"&&console.info("WARNING: You are using the Auth Emulator, which is intended for local testing only.  Do not use with production credentials."),typeof window<"u"&&typeof document<"u"&&(document.readyState==="loading"?window.addEventListener("DOMContentLoaded",t):t())}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class bp{constructor(e,n){this.providerId=e,this.signInMethod=n}toJSON(){return st("not implemented")}_getIdTokenResponse(e){return st("not implemented")}_linkToIdToken(e,n){return st("not implemented")}_getReauthenticationResolver(e){return st("not implemented")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Sn(t,e){return CI(t,"POST","/v1/accounts:signInWithIdp",Nc(t,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const JI="http://localhost";class un extends bp{constructor(){super(...arguments),this.pendingToken=null}static _fromParams(e){const n=new un(e.providerId,e.signInMethod);return e.idToken||e.accessToken?(e.idToken&&(n.idToken=e.idToken),e.accessToken&&(n.accessToken=e.accessToken),e.nonce&&!e.pendingToken&&(n.nonce=e.nonce),e.pendingToken&&(n.pendingToken=e.pendingToken)):e.oauthToken&&e.oauthTokenSecret?(n.accessToken=e.oauthToken,n.secret=e.oauthTokenSecret):Ke("argument-error"),n}toJSON(){return{idToken:this.idToken,accessToken:this.accessToken,secret:this.secret,nonce:this.nonce,pendingToken:this.pendingToken,providerId:this.providerId,signInMethod:this.signInMethod}}static fromJSON(e){const n=typeof e=="string"?JSON.parse(e):e,{providerId:s,signInMethod:i,...r}=n;if(!s||!i)return null;const o=new un(s,i);return o.idToken=r.idToken||void 0,o.accessToken=r.accessToken||void 0,o.secret=r.secret,o.nonce=r.nonce,o.pendingToken=r.pendingToken||null,o}_getIdTokenResponse(e){const n=this.buildRequest();return Sn(e,n)}_linkToIdToken(e,n){const s=this.buildRequest();return s.idToken=n,Sn(e,s)}_getReauthenticationResolver(e){const n=this.buildRequest();return n.autoCreate=!1,Sn(e,n)}buildRequest(){const e={requestUri:JI,returnSecureToken:!0};if(this.pendingToken)e.pendingToken=this.pendingToken;else{const n={};this.idToken&&(n.id_token=this.idToken),this.accessToken&&(n.access_token=this.accessToken),this.secret&&(n.oauth_token_secret=this.secret),n.providerId=this.providerId,this.nonce&&!this.pendingToken&&(n.nonce=this.nonce),e.postBody=Qn(n)}return e}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Dc{constructor(e){this.providerId=e,this.defaultLanguageCode=null,this.customParameters={}}setDefaultLanguage(e){this.defaultLanguageCode=e}setCustomParameters(e){return this.customParameters=e,this}getCustomParameters(){return this.customParameters}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ci extends Dc{constructor(){super(...arguments),this.scopes=[]}addScope(e){return this.scopes.includes(e)||this.scopes.push(e),this}getScopes(){return[...this.scopes]}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class mt extends ci{constructor(){super("facebook.com")}static credential(e){return un._fromParams({providerId:mt.PROVIDER_ID,signInMethod:mt.FACEBOOK_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return mt.credentialFromTaggedObject(e)}static credentialFromError(e){return mt.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return mt.credential(e.oauthAccessToken)}catch{return null}}}mt.FACEBOOK_SIGN_IN_METHOD="facebook.com";mt.PROVIDER_ID="facebook.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ye extends ci{constructor(){super("google.com"),this.addScope("profile")}static credential(e,n){return un._fromParams({providerId:ye.PROVIDER_ID,signInMethod:ye.GOOGLE_SIGN_IN_METHOD,idToken:e,accessToken:n})}static credentialFromResult(e){return ye.credentialFromTaggedObject(e)}static credentialFromError(e){return ye.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthIdToken:n,oauthAccessToken:s}=e;if(!n&&!s)return null;try{return ye.credential(n,s)}catch{return null}}}ye.GOOGLE_SIGN_IN_METHOD="google.com";ye.PROVIDER_ID="google.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class _t extends ci{constructor(){super("github.com")}static credential(e){return un._fromParams({providerId:_t.PROVIDER_ID,signInMethod:_t.GITHUB_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return _t.credentialFromTaggedObject(e)}static credentialFromError(e){return _t.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return _t.credential(e.oauthAccessToken)}catch{return null}}}_t.GITHUB_SIGN_IN_METHOD="github.com";_t.PROVIDER_ID="github.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class yt extends ci{constructor(){super("twitter.com")}static credential(e,n){return un._fromParams({providerId:yt.PROVIDER_ID,signInMethod:yt.TWITTER_SIGN_IN_METHOD,oauthToken:e,oauthTokenSecret:n})}static credentialFromResult(e){return yt.credentialFromTaggedObject(e)}static credentialFromError(e){return yt.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthAccessToken:n,oauthTokenSecret:s}=e;if(!n||!s)return null;try{return yt.credential(n,s)}catch{return null}}}yt.TWITTER_SIGN_IN_METHOD="twitter.com";yt.PROVIDER_ID="twitter.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Vn{constructor(e){this.user=e.user,this.providerId=e.providerId,this._tokenResponse=e._tokenResponse,this.operationType=e.operationType}static async _fromIdTokenResponse(e,n,s,i=!1){const r=await Ue._fromIdTokenResponse(e,s,i),o=sd(s);return new Vn({user:r,providerId:o,_tokenResponse:s,operationType:n})}static async _forOperation(e,n,s){await e._updateTokensIfNecessary(s,!0);const i=sd(s);return new Vn({user:e,providerId:i,_tokenResponse:s,operationType:n})}}function sd(t){return t.providerId?t.providerId:"phoneNumber"in t?"phone":null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class or extends Ut{constructor(e,n,s,i){super(n.code,n.message),this.operationType=s,this.user=i,Object.setPrototypeOf(this,or.prototype),this.customData={appName:e.name,tenantId:e.tenantId??void 0,_serverResponse:n.customData._serverResponse,operationType:s}}static _fromErrorAndOperation(e,n,s,i){return new or(e,n,s,i)}}function Sp(t,e,n,s){return(e==="reauthenticate"?n._getReauthenticationResolver(t):n._getIdTokenResponse(t)).catch(r=>{throw r.code==="auth/multi-factor-auth-required"?or._fromErrorAndOperation(t,r,e,s):r})}async function QI(t,e,n=!1){const s=await Vs(t,e._linkToIdToken(t.auth,await t.getIdToken()),n);return Vn._forOperation(t,"link",s)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function XI(t,e,n=!1){const{auth:s}=t;if(De(s.app))return Promise.reject(en(s));const i="reauthenticate";try{const r=await Vs(t,Sp(s,i,e,t),n);b(r.idToken,s,"internal-error");const o=Pc(r.idToken);b(o,s,"internal-error");const{sub:a}=o;return b(t.uid===a,s,"user-mismatch"),Vn._forOperation(t,i,r)}catch(r){throw r?.code==="auth/user-not-found"&&Ke(s,"user-mismatch"),r}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Cp(t,e,n=!1){if(De(t.app))return Promise.reject(en(t));const s="signIn",i=await Sp(t,s,e),r=await Vn._fromIdTokenResponse(t,s,i);return n||await t._updateCurrentUser(r.user),r}async function ZI(t,e){return Cp(ss(t),e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Eo(t,e){return ue(t).setPersistence(e)}function eT(t,e,n,s){return ue(t).onIdTokenChanged(e,n,s)}function tT(t,e,n){return ue(t).beforeAuthStateChanged(e,n)}function Ip(t,e,n,s){return ue(t).onAuthStateChanged(e,n,s)}function nT(t){return ue(t).signOut()}const ar="__sak";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Tp{constructor(e,n){this.storageRetriever=e,this.type=n}_isAvailable(){try{return this.storage?(this.storage.setItem(ar,"1"),this.storage.removeItem(ar),Promise.resolve(!0)):Promise.resolve(!1)}catch{return Promise.resolve(!1)}}_set(e,n){return this.storage.setItem(e,JSON.stringify(n)),Promise.resolve()}_get(e){const n=this.storage.getItem(e);return Promise.resolve(n?JSON.parse(n):null)}_remove(e){return this.storage.removeItem(e),Promise.resolve()}get storage(){return this.storageRetriever()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const sT=1e3,iT=10;class Rp extends Tp{constructor(){super(()=>window.localStorage,"LOCAL"),this.boundEventHandler=(e,n)=>this.onStorageEvent(e,n),this.listeners={},this.localCache={},this.pollTimer=null,this.fallbackToPolling=Ep(),this._shouldAllowMigration=!0}forAllChangedKeys(e){for(const n of Object.keys(this.listeners)){const s=this.storage.getItem(n),i=this.localCache[n];s!==i&&e(n,i,s)}}onStorageEvent(e,n=!1){if(!e.key){this.forAllChangedKeys((o,a,c)=>{this.notifyListeners(o,c)});return}const s=e.key;n?this.detachListener():this.stopPolling();const i=()=>{const o=this.storage.getItem(s);!n&&this.localCache[s]===o||this.notifyListeners(s,o)},r=this.storage.getItem(s);MI()&&r!==e.newValue&&e.newValue!==e.oldValue?setTimeout(i,iT):i()}notifyListeners(e,n){this.localCache[e]=n;const s=this.listeners[e];if(s)for(const i of Array.from(s))i(n&&JSON.parse(n))}startPolling(){this.stopPolling(),this.pollTimer=setInterval(()=>{this.forAllChangedKeys((e,n,s)=>{this.onStorageEvent(new StorageEvent("storage",{key:e,oldValue:n,newValue:s}),!0)})},sT)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}attachListener(){window.addEventListener("storage",this.boundEventHandler)}detachListener(){window.removeEventListener("storage",this.boundEventHandler)}_addListener(e,n){Object.keys(this.listeners).length===0&&(this.fallbackToPolling?this.startPolling():this.attachListener()),this.listeners[e]||(this.listeners[e]=new Set,this.localCache[e]=this.storage.getItem(e)),this.listeners[e].add(n)}_removeListener(e,n){this.listeners[e]&&(this.listeners[e].delete(n),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&(this.detachListener(),this.stopPolling())}async _set(e,n){await super._set(e,n),this.localCache[e]=JSON.stringify(n)}async _get(e){const n=await super._get(e);return this.localCache[e]=JSON.stringify(n),n}async _remove(e){await super._remove(e),delete this.localCache[e]}}Rp.type="LOCAL";const kp=Rp;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ap extends Tp{constructor(){super(()=>window.sessionStorage,"SESSION")}_addListener(e,n){}_removeListener(e,n){}}Ap.type="SESSION";const Np=Ap;/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function rT(t){return Promise.all(t.map(async e=>{try{return{fulfilled:!0,value:await e}}catch(n){return{fulfilled:!1,reason:n}}}))}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Hr{constructor(e){this.eventTarget=e,this.handlersMap={},this.boundEventHandler=this.handleEvent.bind(this)}static _getInstance(e){const n=this.receivers.find(i=>i.isListeningto(e));if(n)return n;const s=new Hr(e);return this.receivers.push(s),s}isListeningto(e){return this.eventTarget===e}async handleEvent(e){const n=e,{eventId:s,eventType:i,data:r}=n.data,o=this.handlersMap[i];if(!o?.size)return;n.ports[0].postMessage({status:"ack",eventId:s,eventType:i});const a=Array.from(o).map(async l=>l(n.origin,r)),c=await rT(a);n.ports[0].postMessage({status:"done",eventId:s,eventType:i,response:c})}_subscribe(e,n){Object.keys(this.handlersMap).length===0&&this.eventTarget.addEventListener("message",this.boundEventHandler),this.handlersMap[e]||(this.handlersMap[e]=new Set),this.handlersMap[e].add(n)}_unsubscribe(e,n){this.handlersMap[e]&&n&&this.handlersMap[e].delete(n),(!n||this.handlersMap[e].size===0)&&delete this.handlersMap[e],Object.keys(this.handlersMap).length===0&&this.eventTarget.removeEventListener("message",this.boundEventHandler)}}Hr.receivers=[];/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Mc(t="",e=10){let n="";for(let s=0;s<e;s++)n+=Math.floor(Math.random()*10);return t+n}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class oT{constructor(e){this.target=e,this.handlers=new Set}removeMessageHandler(e){e.messageChannel&&(e.messageChannel.port1.removeEventListener("message",e.onMessage),e.messageChannel.port1.close()),this.handlers.delete(e)}async _send(e,n,s=50){const i=typeof MessageChannel<"u"?new MessageChannel:null;if(!i)throw new Error("connection_unavailable");let r,o;return new Promise((a,c)=>{const l=Mc("",20);i.port1.start();const u=setTimeout(()=>{c(new Error("unsupported_event"))},s);o={messageChannel:i,onMessage(d){const h=d;if(h.data.eventId===l)switch(h.data.status){case"ack":clearTimeout(u),r=setTimeout(()=>{c(new Error("timeout"))},3e3);break;case"done":clearTimeout(r),a(h.data.response);break;default:clearTimeout(u),clearTimeout(r),c(new Error("invalid_response"));break}}},this.handlers.add(o),i.port1.addEventListener("message",o.onMessage),this.target.postMessage({eventType:e,eventId:l,data:n},[i.port2])}).finally(()=>{o&&this.removeMessageHandler(o)})}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ye(){return window}function aT(t){Ye().location.href=t}/**
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
 */function Pp(){return typeof Ye().WorkerGlobalScope<"u"&&typeof Ye().importScripts=="function"}async function cT(){if(!navigator?.serviceWorker)return null;try{return(await navigator.serviceWorker.ready).active}catch{return null}}function lT(){return navigator?.serviceWorker?.controller||null}function uT(){return Pp()?self:null}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Lp="firebaseLocalStorageDb",dT=1,cr="firebaseLocalStorage",Op="fbase_key";class li{constructor(e){this.request=e}toPromise(){return new Promise((e,n)=>{this.request.addEventListener("success",()=>{e(this.request.result)}),this.request.addEventListener("error",()=>{n(this.request.error)})})}}function Wr(t,e){return t.transaction([cr],e?"readwrite":"readonly").objectStore(cr)}function hT(){const t=indexedDB.deleteDatabase(Lp);return new li(t).toPromise()}function la(){const t=indexedDB.open(Lp,dT);return new Promise((e,n)=>{t.addEventListener("error",()=>{n(t.error)}),t.addEventListener("upgradeneeded",()=>{const s=t.result;try{s.createObjectStore(cr,{keyPath:Op})}catch(i){n(i)}}),t.addEventListener("success",async()=>{const s=t.result;s.objectStoreNames.contains(cr)?e(s):(s.close(),await hT(),e(await la()))})})}async function id(t,e,n){const s=Wr(t,!0).put({[Op]:e,value:n});return new li(s).toPromise()}async function fT(t,e){const n=Wr(t,!1).get(e),s=await new li(n).toPromise();return s===void 0?null:s.value}function rd(t,e){const n=Wr(t,!0).delete(e);return new li(n).toPromise()}const pT=800,gT=3;class Dp{constructor(){this.type="LOCAL",this._shouldAllowMigration=!0,this.listeners={},this.localCache={},this.pollTimer=null,this.pendingWrites=0,this.receiver=null,this.sender=null,this.serviceWorkerReceiverAvailable=!1,this.activeServiceWorker=null,this._workerInitializationPromise=this.initializeServiceWorkerMessaging().then(()=>{},()=>{})}async _openDb(){return this.db?this.db:(this.db=await la(),this.db)}async _withRetries(e){let n=0;for(;;)try{const s=await this._openDb();return await e(s)}catch(s){if(n++>gT)throw s;this.db&&(this.db.close(),this.db=void 0)}}async initializeServiceWorkerMessaging(){return Pp()?this.initializeReceiver():this.initializeSender()}async initializeReceiver(){this.receiver=Hr._getInstance(uT()),this.receiver._subscribe("keyChanged",async(e,n)=>({keyProcessed:(await this._poll()).includes(n.key)})),this.receiver._subscribe("ping",async(e,n)=>["keyChanged"])}async initializeSender(){if(this.activeServiceWorker=await cT(),!this.activeServiceWorker)return;this.sender=new oT(this.activeServiceWorker);const e=await this.sender._send("ping",{},800);e&&e[0]?.fulfilled&&e[0]?.value.includes("keyChanged")&&(this.serviceWorkerReceiverAvailable=!0)}async notifyServiceWorker(e){if(!(!this.sender||!this.activeServiceWorker||lT()!==this.activeServiceWorker))try{await this.sender._send("keyChanged",{key:e},this.serviceWorkerReceiverAvailable?800:50)}catch{}}async _isAvailable(){try{if(!indexedDB)return!1;const e=await la();return await id(e,ar,"1"),await rd(e,ar),!0}catch{}return!1}async _withPendingWrite(e){this.pendingWrites++;try{await e()}finally{this.pendingWrites--}}async _set(e,n){return this._withPendingWrite(async()=>(await this._withRetries(s=>id(s,e,n)),this.localCache[e]=n,this.notifyServiceWorker(e)))}async _get(e){const n=await this._withRetries(s=>fT(s,e));return this.localCache[e]=n,n}async _remove(e){return this._withPendingWrite(async()=>(await this._withRetries(n=>rd(n,e)),delete this.localCache[e],this.notifyServiceWorker(e)))}async _poll(){const e=await this._withRetries(i=>{const r=Wr(i,!1).getAll();return new li(r).toPromise()});if(!e)return[];if(this.pendingWrites!==0)return[];const n=[],s=new Set;if(e.length!==0)for(const{fbase_key:i,value:r}of e)s.add(i),JSON.stringify(this.localCache[i])!==JSON.stringify(r)&&(this.notifyListeners(i,r),n.push(i));for(const i of Object.keys(this.localCache))this.localCache[i]&&!s.has(i)&&(this.notifyListeners(i,null),n.push(i));return n}notifyListeners(e,n){this.localCache[e]=n;const s=this.listeners[e];if(s)for(const i of Array.from(s))i(n)}startPolling(){this.stopPolling(),this.pollTimer=setInterval(async()=>this._poll(),pT)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}_addListener(e,n){Object.keys(this.listeners).length===0&&this.startPolling(),this.listeners[e]||(this.listeners[e]=new Set,this._get(e)),this.listeners[e].add(n)}_removeListener(e,n){this.listeners[e]&&(this.listeners[e].delete(n),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&this.stopPolling()}}Dp.type="LOCAL";const Mp=Dp;new ai(3e4,6e4);/**
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
 */function xp(t,e){return e?it(e):(b(t._popupRedirectResolver,t,"argument-error"),t._popupRedirectResolver)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class xc extends bp{constructor(e){super("custom","custom"),this.params=e}_getIdTokenResponse(e){return Sn(e,this._buildIdpRequest())}_linkToIdToken(e,n){return Sn(e,this._buildIdpRequest(n))}_getReauthenticationResolver(e){return Sn(e,this._buildIdpRequest())}_buildIdpRequest(e){const n={requestUri:this.params.requestUri,sessionId:this.params.sessionId,postBody:this.params.postBody,tenantId:this.params.tenantId,pendingToken:this.params.pendingToken,returnSecureToken:!0,returnIdpCredential:!0};return e&&(n.idToken=e),n}}function mT(t){return Cp(t.auth,new xc(t),t.bypassAuthState)}function _T(t){const{auth:e,user:n}=t;return b(n,e,"internal-error"),XI(n,new xc(t),t.bypassAuthState)}async function yT(t){const{auth:e,user:n}=t;return b(n,e,"internal-error"),QI(n,new xc(t),t.bypassAuthState)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Fp{constructor(e,n,s,i,r=!1){this.auth=e,this.resolver=s,this.user=i,this.bypassAuthState=r,this.pendingPromise=null,this.eventManager=null,this.filter=Array.isArray(n)?n:[n]}execute(){return new Promise(async(e,n)=>{this.pendingPromise={resolve:e,reject:n};try{this.eventManager=await this.resolver._initialize(this.auth),await this.onExecution(),this.eventManager.registerConsumer(this)}catch(s){this.reject(s)}})}async onAuthEvent(e){const{urlResponse:n,sessionId:s,postBody:i,tenantId:r,error:o,type:a}=e;if(o){this.reject(o);return}const c={auth:this.auth,requestUri:n,sessionId:s,tenantId:r||void 0,postBody:i||void 0,user:this.user,bypassAuthState:this.bypassAuthState};try{this.resolve(await this.getIdpTask(a)(c))}catch(l){this.reject(l)}}onError(e){this.reject(e)}getIdpTask(e){switch(e){case"signInViaPopup":case"signInViaRedirect":return mT;case"linkViaPopup":case"linkViaRedirect":return yT;case"reauthViaPopup":case"reauthViaRedirect":return _T;default:Ke(this.auth,"internal-error")}}resolve(e){ht(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.resolve(e),this.unregisterAndCleanUp()}reject(e){ht(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.reject(e),this.unregisterAndCleanUp()}unregisterAndCleanUp(){this.eventManager&&this.eventManager.unregisterConsumer(this),this.pendingPromise=null,this.cleanUp()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ET=new ai(2e3,1e4);async function vT(t,e,n){if(De(t.app))return Promise.reject(He(t,"operation-not-supported-in-this-environment"));const s=ss(t);_I(t,e,Dc);const i=xp(s,n);return new Qt(s,"signInViaPopup",e,i).executeNotNull()}class Qt extends Fp{constructor(e,n,s,i,r){super(e,n,i,r),this.provider=s,this.authWindow=null,this.pollId=null,Qt.currentPopupAction&&Qt.currentPopupAction.cancel(),Qt.currentPopupAction=this}async executeNotNull(){const e=await this.execute();return b(e,this.auth,"internal-error"),e}async onExecution(){ht(this.filter.length===1,"Popup operations only handle one event");const e=Mc();this.authWindow=await this.resolver._openPopup(this.auth,this.provider,this.filter[0],e),this.authWindow.associatedEvent=e,this.resolver._originValidation(this.auth).catch(n=>{this.reject(n)}),this.resolver._isIframeWebStorageSupported(this.auth,n=>{n||this.reject(He(this.auth,"web-storage-unsupported"))}),this.pollUserCancellation()}get eventId(){return this.authWindow?.associatedEvent||null}cancel(){this.reject(He(this.auth,"cancelled-popup-request"))}cleanUp(){this.authWindow&&this.authWindow.close(),this.pollId&&window.clearTimeout(this.pollId),this.authWindow=null,this.pollId=null,Qt.currentPopupAction=null}pollUserCancellation(){const e=()=>{if(this.authWindow?.window?.closed){this.pollId=window.setTimeout(()=>{this.pollId=null,this.reject(He(this.auth,"popup-closed-by-user"))},8e3);return}this.pollId=window.setTimeout(e,ET.get())};e()}}Qt.currentPopupAction=null;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const wT="pendingRedirect",Pi=new Map;class bT extends Fp{constructor(e,n,s=!1){super(e,["signInViaRedirect","linkViaRedirect","reauthViaRedirect","unknown"],n,void 0,s),this.eventId=null}async execute(){let e=Pi.get(this.auth._key());if(!e){try{const s=await ST(this.resolver,this.auth)?await super.execute():null;e=()=>Promise.resolve(s)}catch(n){e=()=>Promise.reject(n)}Pi.set(this.auth._key(),e)}return this.bypassAuthState||Pi.set(this.auth._key(),()=>Promise.resolve(null)),e()}async onAuthEvent(e){if(e.type==="signInViaRedirect")return super.onAuthEvent(e);if(e.type==="unknown"){this.resolve(null);return}if(e.eventId){const n=await this.auth._redirectUserForId(e.eventId);if(n)return this.user=n,super.onAuthEvent(e);this.resolve(null)}}async onExecution(){}cleanUp(){}}async function ST(t,e){const n=TT(e),s=IT(t);if(!await s._isAvailable())return!1;const i=await s._get(n)==="true";return await s._remove(n),i}function CT(t,e){Pi.set(t._key(),e)}function IT(t){return it(t._redirectPersistence)}function TT(t){return Ni(wT,t.config.apiKey,t.name)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function RT(t,e){return await ss(t)._initializationPromise,Up(t,e,!1)}async function Up(t,e,n=!1){if(De(t.app))return Promise.reject(en(t));const s=ss(t),i=xp(s,e),o=await new bT(s,i,n).execute();return o&&!n&&(delete o.user._redirectEventId,await s._persistUserIfCurrent(o.user),await s._setRedirectUser(null,e)),o}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const kT=600*1e3;class AT{constructor(e){this.auth=e,this.cachedEventUids=new Set,this.consumers=new Set,this.queuedRedirectEvent=null,this.hasHandledPotentialRedirect=!1,this.lastProcessedEventTime=Date.now()}registerConsumer(e){this.consumers.add(e),this.queuedRedirectEvent&&this.isEventForConsumer(this.queuedRedirectEvent,e)&&(this.sendToConsumer(this.queuedRedirectEvent,e),this.saveEventToCache(this.queuedRedirectEvent),this.queuedRedirectEvent=null)}unregisterConsumer(e){this.consumers.delete(e)}onEvent(e){if(this.hasEventBeenHandled(e))return!1;let n=!1;return this.consumers.forEach(s=>{this.isEventForConsumer(e,s)&&(n=!0,this.sendToConsumer(e,s),this.saveEventToCache(e))}),this.hasHandledPotentialRedirect||!NT(e)||(this.hasHandledPotentialRedirect=!0,n||(this.queuedRedirectEvent=e,n=!0)),n}sendToConsumer(e,n){if(e.error&&!$p(e)){const s=e.error.code?.split("auth/")[1]||"internal-error";n.onError(He(this.auth,s))}else n.onAuthEvent(e)}isEventForConsumer(e,n){const s=n.eventId===null||!!e.eventId&&e.eventId===n.eventId;return n.filter.includes(e.type)&&s}hasEventBeenHandled(e){return Date.now()-this.lastProcessedEventTime>=kT&&this.cachedEventUids.clear(),this.cachedEventUids.has(od(e))}saveEventToCache(e){this.cachedEventUids.add(od(e)),this.lastProcessedEventTime=Date.now()}}function od(t){return[t.type,t.eventId,t.sessionId,t.tenantId].filter(e=>e).join("-")}function $p({type:t,error:e}){return t==="unknown"&&e?.code==="auth/no-auth-event"}function NT(t){switch(t.type){case"signInViaRedirect":case"linkViaRedirect":case"reauthViaRedirect":return!0;case"unknown":return $p(t);default:return!1}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function PT(t,e={}){return ns(t,"GET","/v1/projects",e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const LT=/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/,OT=/^https?/;async function DT(t){if(t.config.emulator)return;const{authorizedDomains:e}=await PT(t);for(const n of e)try{if(MT(n))return}catch{}Ke(t,"unauthorized-domain")}function MT(t){const e=oa(),{protocol:n,hostname:s}=new URL(e);if(t.startsWith("chrome-extension://")){const o=new URL(t);return o.hostname===""&&s===""?n==="chrome-extension:"&&t.replace("chrome-extension://","")===e.replace("chrome-extension://",""):n==="chrome-extension:"&&o.hostname===s}if(!OT.test(n))return!1;if(LT.test(t))return s===t;const i=t.replace(/\./g,"\\.");return new RegExp("^(.+\\."+i+"|"+i+")$","i").test(s)}/**
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
 */const xT=new ai(3e4,6e4);function ad(){const t=Ye().___jsl;if(t?.H){for(const e of Object.keys(t.H))if(t.H[e].r=t.H[e].r||[],t.H[e].L=t.H[e].L||[],t.H[e].r=[...t.H[e].L],t.CP)for(let n=0;n<t.CP.length;n++)t.CP[n]=null}}function FT(t){return new Promise((e,n)=>{function s(){ad(),gapi.load("gapi.iframes",{callback:()=>{e(gapi.iframes.getContext())},ontimeout:()=>{ad(),n(He(t,"network-request-failed"))},timeout:xT.get()})}if(Ye().gapi?.iframes?.Iframe)e(gapi.iframes.getContext());else if(Ye().gapi?.load)s();else{const i=jI("iframefcb");return Ye()[i]=()=>{gapi.load?s():n(He(t,"network-request-failed"))},WI(`${VI()}?onload=${i}`).catch(r=>n(r))}}).catch(e=>{throw Li=null,e})}let Li=null;function UT(t){return Li=Li||FT(t),Li}/**
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
 */const $T=new ai(5e3,15e3),BT="__/auth/iframe",HT="emulator/auth/iframe",WT={style:{position:"absolute",top:"-100px",width:"1px",height:"1px"},"aria-hidden":"true",tabindex:"-1"},VT=new Map([["identitytoolkit.googleapis.com","p"],["staging-identitytoolkit.sandbox.googleapis.com","s"],["test-identitytoolkit.sandbox.googleapis.com","t"]]);function jT(t){const e=t.config;b(e.authDomain,t,"auth-domain-config-required");const n=e.emulator?Ac(e,HT):`https://${t.config.authDomain}/${BT}`,s={apiKey:e.apiKey,appName:t.name,v:Xn},i=VT.get(t.config.apiHost);i&&(s.eid=i);const r=t._getFrameworks();return r.length&&(s.fw=r.join(",")),`${n}?${Qn(s).slice(1)}`}async function GT(t){const e=await UT(t),n=Ye().gapi;return b(n,t,"internal-error"),e.open({where:document.body,url:jT(t),messageHandlersFilter:n.iframes.CROSS_ORIGIN_IFRAMES_FILTER,attributes:WT,dontclear:!0},s=>new Promise(async(i,r)=>{await s.restyle({setHideOnLeave:!1});const o=He(t,"network-request-failed"),a=Ye().setTimeout(()=>{r(o)},$T.get());function c(){Ye().clearTimeout(a),i(s)}s.ping(c).then(c,()=>{r(o)})}))}/**
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
 */const zT={location:"yes",resizable:"yes",statusbar:"yes",toolbar:"no"},qT=500,YT=600,KT="_blank",JT="http://localhost";class cd{constructor(e){this.window=e,this.associatedEvent=null}close(){if(this.window)try{this.window.close()}catch{}}}function QT(t,e,n,s=qT,i=YT){const r=Math.max((window.screen.availHeight-i)/2,0).toString(),o=Math.max((window.screen.availWidth-s)/2,0).toString();let a="";const c={...zT,width:s.toString(),height:i.toString(),top:r,left:o},l=me().toLowerCase();n&&(a=pp(l)?KT:n),hp(l)&&(e=e||JT,c.scrollbars="yes");const u=Object.entries(c).reduce((h,[f,p])=>`${h}${f}=${p},`,"");if(DI(l)&&a!=="_self")return XT(e||"",a),new cd(null);const d=window.open(e||"",a,u);b(d,t,"popup-blocked");try{d.focus()}catch{}return new cd(d)}function XT(t,e){const n=document.createElement("a");n.href=t,n.target=e;const s=document.createEvent("MouseEvent");s.initMouseEvent("click",!0,!0,window,1,0,0,0,0,!1,!1,!1,!1,1,null),n.dispatchEvent(s)}/**
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
 */const ZT="__/auth/handler",eR="emulator/auth/handler",tR=encodeURIComponent("fac");async function ld(t,e,n,s,i,r){b(t.config.authDomain,t,"auth-domain-config-required"),b(t.config.apiKey,t,"invalid-api-key");const o={apiKey:t.config.apiKey,appName:t.name,authType:n,redirectUrl:s,v:Xn,eventId:i};if(e instanceof Dc){e.setDefaultLanguage(t.languageCode),o.providerId=e.providerId||"",Ho(e.getCustomParameters())||(o.customParameters=JSON.stringify(e.getCustomParameters()));for(const[u,d]of Object.entries({}))o[u]=d}if(e instanceof ci){const u=e.getScopes().filter(d=>d!=="");u.length>0&&(o.scopes=u.join(","))}t.tenantId&&(o.tid=t.tenantId);const a=o;for(const u of Object.keys(a))a[u]===void 0&&delete a[u];const c=await t._getAppCheckToken(),l=c?`#${tR}=${encodeURIComponent(c)}`:"";return`${nR(t)}?${Qn(a).slice(1)}${l}`}function nR({config:t}){return t.emulator?Ac(t,eR):`https://${t.authDomain}/${ZT}`}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const vo="webStorageSupport";class sR{constructor(){this.eventManagers={},this.iframes={},this.originValidationPromises={},this._redirectPersistence=Np,this._completeRedirectFn=Up,this._overrideRedirectResult=CT}async _openPopup(e,n,s,i){ht(this.eventManagers[e._key()]?.manager,"_initialize() not called before _openPopup()");const r=await ld(e,n,s,oa(),i);return QT(e,r,Mc())}async _openRedirect(e,n,s,i){await this._originValidation(e);const r=await ld(e,n,s,oa(),i);return aT(r),new Promise(()=>{})}_initialize(e){const n=e._key();if(this.eventManagers[n]){const{manager:i,promise:r}=this.eventManagers[n];return i?Promise.resolve(i):(ht(r,"If manager is not set, promise should be"),r)}const s=this.initAndGetManager(e);return this.eventManagers[n]={promise:s},s.catch(()=>{delete this.eventManagers[n]}),s}async initAndGetManager(e){const n=await GT(e),s=new AT(e);return n.register("authEvent",i=>(b(i?.authEvent,e,"invalid-auth-event"),{status:s.onEvent(i.authEvent)?"ACK":"ERROR"}),gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER),this.eventManagers[e._key()]={manager:s},this.iframes[e._key()]=n,s}_isIframeWebStorageSupported(e,n){this.iframes[e._key()].send(vo,{type:vo},i=>{const r=i?.[0]?.[vo];r!==void 0&&n(!!r),Ke(e,"internal-error")},gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER)}_originValidation(e){const n=e._key();return this.originValidationPromises[n]||(this.originValidationPromises[n]=DT(e)),this.originValidationPromises[n]}get _shouldInitProactively(){return Ep()||fp()||Lc()}}const iR=sR;var ud="@firebase/auth",dd="1.11.0";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class rR{constructor(e){this.auth=e,this.internalListeners=new Map}getUid(){return this.assertAuthConfigured(),this.auth.currentUser?.uid||null}async getToken(e){return this.assertAuthConfigured(),await this.auth._initializationPromise,this.auth.currentUser?{accessToken:await this.auth.currentUser.getIdToken(e)}:null}addAuthTokenListener(e){if(this.assertAuthConfigured(),this.internalListeners.has(e))return;const n=this.auth.onIdTokenChanged(s=>{e(s?.stsTokenManager.accessToken||null)});this.internalListeners.set(e,n),this.updateProactiveRefresh()}removeAuthTokenListener(e){this.assertAuthConfigured();const n=this.internalListeners.get(e);n&&(this.internalListeners.delete(e),n(),this.updateProactiveRefresh())}assertAuthConfigured(){b(this.auth._initializationPromise,"dependent-sdk-initialized-before-auth")}updateProactiveRefresh(){this.internalListeners.size>0?this.auth._startProactiveRefresh():this.auth._stopProactiveRefresh()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function oR(t){switch(t){case"Node":return"node";case"ReactNative":return"rn";case"Worker":return"webworker";case"Cordova":return"cordova";case"WebExtension":return"web-extension";default:return}}function aR(t){Dn(new on("auth",(e,{options:n})=>{const s=e.getProvider("app").getImmediate(),i=e.getProvider("heartbeat"),r=e.getProvider("app-check-internal"),{apiKey:o,authDomain:a}=s.options;b(o&&!o.includes(":"),"invalid-api-key",{appName:s.name});const c={apiKey:o,authDomain:a,clientPlatform:t,apiHost:"identitytoolkit.googleapis.com",tokenApiHost:"securetoken.googleapis.com",apiScheme:"https",sdkClientVersion:vp(t)},l=new BI(s,i,r,c);return zI(l,n),l},"PUBLIC").setInstantiationMode("EXPLICIT").setInstanceCreatedCallback((e,n,s)=>{e.getProvider("auth-internal").initialize()})),Dn(new on("auth-internal",e=>{const n=ss(e.getProvider("auth").getImmediate());return(s=>new rR(s))(n)},"PRIVATE").setInstantiationMode("EXPLICIT")),kt(ud,dd,oR(t)),kt(ud,dd,"esm2020")}/**
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
 */const cR=300,lR=Ah("authIdTokenMaxAge")||cR;let hd=null;const uR=t=>async e=>{const n=e&&await e.getIdTokenResult(),s=n&&(new Date().getTime()-Date.parse(n.issuedAtTime))/1e3;if(s&&s>lR)return;const i=n?.token;hd!==i&&(hd=i,await fetch(t,{method:i?"POST":"DELETE",headers:i?{Authorization:`Bearer ${i}`}:{}}))};function dR(t=Fh()){const e=Wa(t,"auth");if(e.isInitialized())return e.getImmediate();const n=GI(t,{popupRedirectResolver:iR,persistence:[Mp,kp,Np]}),s=Ah("authTokenSyncURL");if(s&&typeof isSecureContext=="boolean"&&isSecureContext){const r=new URL(s,location.origin);if(location.origin===r.origin){const o=uR(r.toString());tT(n,o,()=>o(n.currentUser)),eT(n,a=>o(a))}}const i=Rh("auth");return i&&qI(n,`http://${i}`),n}function hR(){return document.getElementsByTagName("head")?.[0]??document}HI({loadJS(t){return new Promise((e,n)=>{const s=document.createElement("script");s.setAttribute("src",t),s.onload=e,s.onerror=i=>{const r=He("internal-error");r.customData=i,n(r)},s.type="text/javascript",s.charset="UTF-8",hR().appendChild(s)})},gapiScript:"https://apis.google.com/js/api.js",recaptchaV2Script:"https://www.google.com/recaptcha/api.js",recaptchaEnterpriseScript:"https://www.google.com/recaptcha/enterprise.js?render="});aR("Browser");const fR=()=>!1,pR=t=>{try{t&&localStorage.setItem("debug:console","1")}catch{}},U=(...t)=>{},gR=(...t)=>{localStorage.getItem("debug:console")};function mR(){if(typeof window>"u"||typeof navigator>"u")return!1;const t=navigator.userAgent||navigator.vendor||"",e=/iPad|iPhone|iPod/.test(t),n=/Macintosh/.test(t)&&typeof navigator.maxTouchPoints=="number"&&navigator.maxTouchPoints>1,s=(e||n)&&!window.MSStream,i=/Android/i.test(t),r=s||i;return console.table({"User Agent":t,isAndroid:i,isiOSUA:e,isiPadOSDesktopUA:n,isMobileDevice:r}),r}const _R="765724787439-21p8n3e2tsfq2qk4oriq7ipp7m4o50ad.apps.googleusercontent.com",Ts=new Set;function Bp(t){return U("[ONE TAP] Callback registered, total callbacks:",Ts.size+1),Ts.add(t),()=>Ts.delete(t)}function zt(t){U("[ONE TAP] Notifying status:",t,"to",Ts.size,"callbacks"),Ts.forEach(e=>{try{e(t)}catch{}})}function Fc(){if(typeof google>"u"||!google.accounts?.id){setTimeout(()=>Fc(),100);return}google.accounts.id.initialize({client_id:_R,callback:yR,auto_select:!1,cancel_on_tap_outside:!0,context:"signin",use_fedcm_for_prompt:!0,itp_support:!0})}function Uc(){if(lr()){zt("not_needed");return}window.google?.accounts?.id&&(zt("prompting"),window.google.accounts.id.prompt(t=>{t.isNotDisplayed()?zt("not_displayed"):t.isSkippedMoment()?zt("skipped"):t.isDismissedMoment()?zt("dismissed"):zt("displayed")}))}async function yR(t){try{U("[ONE TAP] Received credential, signing in with Firebase..."),zt("signing_in");const e=ye.credential(t.credential),n=await ZI(ke,e);U("[ONE TAP] ✅ Successfully signed in:",n.user.email),Vp(!1)}catch(e){const n=e?.code||"unknown",s=e?.message||String(e);alert(n==="auth/account-exists-with-different-credential"?"An account already exists with the same email but different sign-in credentials.":`One Tap sign-in failed: ${s}`)}}function Hp(){typeof google<"u"&&google.accounts?.id&&google.accounts.id.cancel()}const ER=Object.freeze(Object.defineProperty({__proto__:null,cancelOneTap:Hp,initOneTap:Fc,onOneTapStatusChange:Bp,showOneTapSignin:Uc},Symbol.toStringTag,{value:"Module"})),ke=dR(np),Wp=(async()=>{try{await Eo(ke,Mp)}catch{try{await Eo(ke,kp)}catch{await Eo(ke,ca)}}try{const t=await Gp();t.success?console.log("[AUTH] ✅ Redirect sign-in completed, user:",t.user?.email||t.user?.uid):t.error?console.error("[AUTH] ❌ Redirect sign-in failed:",t.error):console.debug("[AUTH] No pending redirect result found.")}catch(t){console.error("[AUTH] Error during handleRedirectResult execution:",t)}setTimeout(()=>{Fc(),Uc()},500)})();let _s=!1;function Vp(t){_s=t}function vR(){try{const t=document.createElement("a");t.href=window.location.href,t.target="_blank",t.rel="noopener noreferrer external",document.body.appendChild(t),t.click(),document.body.removeChild(t)}catch{}}let hs=null;const wR=()=>Math.random().toString(36).substring(2,15),ua="guestUser",bR=2880*60*1e3;function SR(){try{const t=typeof localStorage<"u"?localStorage.getItem(ua):null;if(!t)return null;const e=JSON.parse(t);if(!e||typeof e!="object"||!e.id)return null;if(e.expiresAt&&Date.now()>e.expiresAt){try{localStorage.removeItem(ua)}catch{}return null}return e}catch{return null}}function CR(t,e=bR){const n=Date.now(),s={id:t,createdAt:n,expiresAt:n+e};try{typeof localStorage<"u"&&localStorage.setItem(ua,JSON.stringify(s))}catch{}return s}function le(){const t=Ze();if(t)return t;if(!hs){const e=SR();e&&e.id?hs=e.id:(hs=wR(),CR(hs))}return hs}function lr(){return ke.currentUser!==null}function Ze(){return ke.currentUser?.uid??null}function IR(){return new Promise(t=>{const e=Ip(ke,n=>{e(),t(n)})})}function $c(t,{truncate:e=7}={}){return Ip(ke,n=>{const s=!!n,i=n?.displayName||"Guest User",r=typeof i=="string"&&i.length>e?i.slice(0,e)+"...":i;try{t({user:n,isLoggedIn:s,userName:r})}catch{}})}async function jp(){const t=new ye;t.setCustomParameters({prompt:"select_account"});const e=mR(),n=(()=>{try{return typeof window<"u"&&window.matchMedia&&window.matchMedia("(display-mode: standalone)").matches||typeof navigator<"u"&&navigator.standalone===!0}catch{return!1}})(),s=n&&/iphone|ipad|ipod/i.test(navigator.userAgent||""),i=!0;try{if(s&&_s){_s=!1,vR();return}const r=await vT(ke,t),a=ye.credentialFromResult(r).accessToken,c=r.user;console.log("Signed in user:",c),U("Google Access Token exists:",!!a),_s=!1}catch(r){const o=r?.code||"unknown",a=r?.message||String(r);if(o==="auth/popup-closed-by-user"||o==="auth/cancelled-popup-request"){console.log("Sign-in cancelled by user");return}if((o==="auth/network-request-failed"||o==="auth/popup-blocked")&&s){console.warn(`[AUTH] ${o} inside iOS standalone PWA. Arming Safari fallback.`),_s=!0,alert(`Sign-in is blocked in the installed app on iOS.

Tap the Login button again to open in Safari and complete sign-in.`);return}if(o==="auth/popup-blocked"&&e){alert("Pop-up blocked. Please enable pop-ups for this site in your browser settings, or try signing in from a desktop browser.");return}const c=r?.customData?.email,l=ye.credentialFromError(r);if(console.error("Error during Google sign-in:",{errorCode:o,errorMessage:a,email:c,credential:l,origin:typeof window<"u"?window.location.origin:"n/a"}),o==="auth/unauthorized-domain"){const u=typeof window<"u"?window.location.origin:"",d=["This app's host is not whitelisted in Firebase Authentication.","Fix: In Firebase Console, go to Build → Authentication → Settings → Authorized domains and add this origin:",u?`• ${u}`:"• <your dev origin>","","Common dev hosts to add:","• http://localhost (covers any port)","• http://127.0.0.1","• http://[::1] (IPv6 localhost)","• Your LAN IP, e.g. http://192.168.x.y","","Tip: avoid opening index.html directly from the filesystem (file://). Use a dev server instead."];u&&typeof navigator<"u"&&navigator.clipboard?.writeText&&navigator.clipboard.writeText(u).catch(()=>{}),alert(`Sign-in failed: Unauthorized domain.

${d.join(`
`)}`);return}alert(`Sign-in failed: ${a}`)}}async function Gp(){try{const t=await RT(ke);if(t){const n=ye.credentialFromResult(t)?.accessToken,s=t.user;return console.log("[AUTH] Redirect result found - signed in user:",s?.email||s?.uid),U("Google Access Token exists:",!!n),{success:!0,user:s}}return console.log("[AUTH] No redirect result (normal page load)"),{success:!1,user:null}}catch(t){const e=t?.code||"unknown",n=t?.message||String(t),s=t?.customData?.email,i=ye.credentialFromError(t);if(console.error("Error handling redirect result:",{errorCode:e,errorMessage:n,email:s,credential:i,origin:typeof window<"u"?window.location.origin:"n/a"}),e==="auth/unauthorized-domain"){const r=typeof window<"u"?window.location.origin:"",o=["This app's host is not whitelisted in Firebase Authentication.","Fix: In Firebase Console, go to Build → Authentication → Settings → Authorized domains and add this origin:",r?`• ${r}`:"• <your dev origin>","","Common dev hosts to add:","• http://localhost (covers any port)","• http://127.0.0.1","• http://[::1] (IPv6 localhost)","• Your LAN IP, e.g. http://192.168.x.y","","Tip: avoid opening index.html directly from the filesystem (file://). Use a dev server instead."];r&&typeof navigator<"u"&&navigator.clipboard?.writeText&&navigator.clipboard.writeText(r).catch(()=>{}),alert(`Sign-in failed: Unauthorized domain.

${o.join(`
`)}`)}else alert(`Sign-in failed: ${n}`);return{success:!1,user:null,error:t}}}async function zp(){try{await nT(ke),console.info("User signed out"),setTimeout(()=>Uc(),1500)}catch(t){throw console.error("Error signing out:",t),t}}const TR=Object.freeze(Object.defineProperty({__proto__:null,auth:ke,authReady:Wp,getCurrentUserAsync:IR,getLoggedInUserId:Ze,getUserId:le,handleRedirectResult:Gp,isLoggedIn:lr,onAuthChange:$c,setSafariExternalOpenArmed:Vp,signInWithGoogle:jp,signOutUser:zp},Symbol.toStringTag,{value:"Module"})),RR=t=>String(t).replace(/[&<>"'`=\/]/g,n=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;","`":"&#x60;","=":"&#x3D;","/":"&#x2F;"})[n]),kR=(t,e)=>t.replace(/\$\{([^}]+)\}/g,(n,s)=>{const i=s.trim(),r=i.split(".").reduce((a,c)=>a?.[c],e);return r==null?"":i.endsWith("Html")?String(r):RR(String(r))}),AR=(t,e={})=>{const n=document.createElement("template");return n.innerHTML=kR(t,e),n.content.cloneNode(!0)},NR=(t,e)=>{const n=[];let s=e;for(;s&&s!==t;){const i=s.parentElement;if(!i)break;const r=Array.prototype.indexOf.call(i.children,s);n.push(r),s=i}return n.reverse()},PR=(t,e)=>e.reduce((n,s)=>n&&n.children?n.children[s]:null,t),LR=t=>Array.from(t.querySelectorAll("input, textarea, select")).map(e=>({name:e.name,id:e.id,path:NR(t,e),value:e.value,checked:e.checked,selectionStart:e.selectionStart,selectionEnd:e.selectionEnd,wasFocused:document.activeElement===e})),OR=t=>t.replace(/["'\\]/g,"\\$&"),DR=(t,e)=>{e.forEach(n=>{let s=null;if(n.name){const i=OR(n.name);s=t.querySelector(`input[name="${i}"], textarea[name="${i}"], select[name="${i}"]`)}else n.id?s=t.querySelector(`#${n.id}`):n.path&&(s=PR(t,n.path));if(s){if(s.value=n.value,n.checked!==void 0&&(s.checked=n.checked),n.selectionStart!=null&&s.setSelectionRange)try{s.setSelectionRange(n.selectionStart,n.selectionEnd)}catch{}if(n.wasFocused)try{s.focus()}catch{}}})},MR=t=>Array.from(t.querySelectorAll("video, audio")).map(e=>({src:e.currentSrc||e.src,currentTime:e.currentTime,paused:e.paused,volume:e.volume,playbackRate:e.playbackRate,muted:e.muted})),xR=(t,e)=>{const n=t.querySelectorAll("video, audio");for(const s of n)if(s.currentSrc===e||s.src===e)return s;return null},FR=(t,e)=>{e.forEach(n=>{if(!n.src)return;const s=xR(t,n.src);s&&(s.currentTime=n.currentTime,s.volume=n.volume,s.playbackRate=n.playbackRate,s.muted=n.muted,n.paused||s.play().catch(()=>{}))})},UR=()=>document.readyState!=="loading",qp=({initialProps:t={},template:e="",handlers:n={},parent:s=null,containerTag:i="div",className:r="",onMount:o=null,onCleanup:a=null,autoAppend:c=!0,preserveInputState:l=!0}={})=>{if(!UR())return console.error("createComponent: DOM must be ready before creating components."),null;const u=document.createElement(i);r&&(u.className=r);let d={...t};const h=new Set,f=/\$\{([^}]+)\}/g;let p;for(;(p=f.exec(e))!==null;){const S=p[1].trim().split(".")[0];h.add(S)}const E=[],m=[],A={},N=()=>{let S=[],ne=[];l&&(S=LR(u),ne=MR(u)),u.textContent="";const Ie=AR(e,d);u.appendChild(Ie),Object.keys(n).forEach(Ge=>{const ve=u.querySelectorAll(`[onclick="${Ge}"]`),gn=n[Ge];ve.forEach(Y=>{Y.removeAttribute("onclick"),typeof gn=="function"&&Y.addEventListener("click",gn)})}),l&&(DR(u,S),FR(u,ne)),E.forEach(Ge=>Ge({...d}))},ae=S=>{if(!Array.isArray(S)||S.length===0)return;const ne={props:{...d},changedKeys:S};m.forEach(Ie=>Ie(ne))};for(const S of Object.keys(t))A[S]=[],Object.defineProperty(u,S,{get(){return d[S]},set(ne){d[S]!==ne&&(d[S]=ne,h.has(S)&&N(),A[S].forEach(Ie=>Ie(ne)),ae([S]))},configurable:!0,enumerable:!0});if(u.update=S=>{let ne=!1,Ie=!1;const Ge=[];for(const ve in S)S[ve]!==d[ve]&&(d[ve]=S[ve],h.has(ve)&&(Ie=!0),A[ve]&&A[ve].forEach(gn=>gn(S[ve])),ne=!0,Ge.push(ve));ne&&Ie&&N(),Ge.length>0&&ae(Ge)},u.onRender=S=>{typeof S=="function"&&E.push(S)},u.onAnyPropUpdated=S=>{typeof S=="function"&&m.push(S)},u.onPropUpdated=(S,ne)=>{typeof ne=="function"&&A[S]&&A[S].push(ne)},u.dispose=()=>{a&&(Array.isArray(a)?a.forEach(S=>{typeof S=="function"&&S()}):typeof a=="function"&&a()),E.length=0,m.length=0;for(const S in A)A[S].length=0;u.remove()},N(),c&&s&&!s.contains(u)&&s.appendChild(u),typeof o=="function")try{o(u)}catch(S){gR("[createComponent]: Error in onMount handler of component",S)}return u};let fs=null;const $R=(t,e=null)=>{if(fs)return fs;if(!t)return console.error("Auth UI: Parent element is required"),null;let n=null,s=null,i=10;typeof e=="number"&&(i=e);const r=lr();return fs=qp({initialProps:{isLoggedIn:r,userName:"Guest User",loginDisabledAttr:"disabled",logoutDisabledAttr:"disabled",signingInDisplay:"none",loginBtnMarginRightPx:i},template:`
      <button style="margin-right: \${loginBtnMarginRightPx}px" id="goog-login-btn" class="login-btn" onclick="handleLogin" \${loginDisabledAttr}>Login</button>
      <button id="goog-logout-btn" class="logout-btn" onclick="handleLogout" \${logoutDisabledAttr}>Logout</button>
      <span class="signing-in-indicator" style="display: \${signingInDisplay}; color: var(--text-secondary, #888); font-size: 0.9rem;">Signing in...</span>
      <div class="user-info">\${isLoggedIn ? 'Logged in: ' + userName : 'Logged out'}</div>
    `,handlers:{handleLogin:()=>{Hp(),document.cookie="g_state=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;",jp()},handleLogout:zp},onMount:o=>{n=$c(({isLoggedIn:a,userName:c})=>{console.debug("[AuthComponent] Auth state changed:",{isLoggedIn:a,userName:c}),o.update({isLoggedIn:a,userName:c,logoutDisabledAttr:a?"":"disabled",signingInDisplay:"none"})}),s=Bp(a=>{U("[AuthComponent] One Tap status:",a),a==="signing_in"?o.update({signingInDisplay:"inline-block",loginDisabledAttr:"disabled"}):["not_displayed","skipped","dismissed","not_needed"].includes(a)?lr()||o.update({loginDisabledAttr:"",signingInDisplay:"none"}):a==="displayed"&&o.update({loginDisabledAttr:"disabled",signingInDisplay:"none"})})},onCleanup:()=>{n&&(n(),n=null),s&&(s(),s=null),fs=null},className:"auth-component",parent:t}),fs},Bc=t=>t?!0:(console.warn("Element not found. el.id: =>",t?.id??"(no id)","el: =>",t),console.trace(),!1),Hc=t=>{if(Bc(t))return t.classList.contains("hidden")},I=t=>{Bc(t)&&t.classList.contains("hidden")&&t.classList.remove("hidden")},y=t=>{Bc(t)&&!t.classList.contains("hidden")&&t.classList.add("hidden")},Yp=t=>t.classList.contains("small-frame"),Cn=t=>{if(t&&!Yp(t)){t.classList.add("small-frame");const e=document.createElement("div");e.classList.add("small-frame-toggle-div");const n=document.createElement("span");n.classList.add("small-frame-toggle-icon"),n.textContent="❮",e.appendChild(n),t.appendChild(e),e.addEventListener("click",()=>{t.classList.contains("closed")?(t.classList.remove("closed"),e.classList.remove("closed"),n.classList.remove("closed")):(t.classList.add("closed"),e.classList.add("closed"),n.classList.add("closed"))})}},wt=t=>{if(Yp(t)){t.classList.remove("small-frame");const e=document.querySelector(".small-frame-close");e&&e.remove()}};function da(t){return document.pictureInPictureElement===t}function Vr(t="room"){const e=new URL(window.location);e.searchParams.delete(t),window.history.replaceState({},"",e)}const V=t=>{const e=document.getElementById(t);return e||(console.warn(`Element with id: ${t} not found.`),null)};let Je=null,$t=null,jr=null,Wc=null,we=null,ee=null,K=null,B=null,W=null,Ce=null,Ae=null,Le=null,Ve=null,is=null,Kp=null,je=null,Gr=null,rs=null,os=null,Vc=null,jc=null,Gc=null,zc=null;function fd(){Je=V("lobby"),$t=V("lobby-call-btn"),jr=V("title-auth-bar"),Wc=V("videos"),we=V("local-video-el"),ee=V("local-video-box"),K=V("remote-video-el"),B=V("remote-video-box"),W=V("shared-video-el"),Ce=V("shared-video-box"),Ae=V("chat-controls"),Le=V("call-btn"),Ve=V("hang-up-btn"),is=V("switch-camera-btn"),je=V("mute-btn"),Gr=V("fullscreen-partner-btn"),rs=V("mic-btn"),os=V("camera-btn"),Vc=V("app-pip-btn"),jc=V("app-title-h1"),Gc=V("app-title-a"),zc=V("app-title-span")}document.readyState==="loading"?document.addEventListener("DOMContentLoaded",fd):fd();const Jp=()=>({lobbyDiv:Je,lobbyCallBtn:$t,titleAuthBar:jr,videosWrapper:Wc,localVideoEl:we,localBoxEl:ee,remoteVideoEl:K,remoteBoxEl:B,sharedVideoEl:W,sharedBoxEl:Ce,chatControls:Ae,callBtn:Le,hangUpBtn:Ve,switchCameraBtn:is,installBtn:Kp,mutePartnerBtn:je,fullscreenPartnerBtn:Gr,micBtn:rs,cameraBtn:os,appPipBtn:Vc,appTitleH1:jc,appTitleA:Gc,appTitleSpan:zc});function Qp(t,e=3,n=100){return new Promise(s=>{let i=0;const r=()=>{const o=document.getElementById(t);if(o){s(o);return}if(i++,i>=e){console.warn(`Element ${t} not found after ${e} attempts`),s(null);return}setTimeout(r,n)};r()})}async function Xp(t,e=3,n=100){const s={},i=t.map(async r=>{const o=await Qp(r,e,n);return s[r]=o,o});return await Promise.all(i),s}async function BR(){const t=await Xp(["searchBtn","searchQuery","searchResults"],5,200),e=document.querySelector(".search-section");t.searchContainer=e;const n=Object.entries(t).filter(([s,i])=>!i).map(([s])=>s);return n.length>0&&console.warn("Some YouTube elements not found:",n),t}const HR=Object.freeze(Object.defineProperty({__proto__:null,get appPipBtn(){return Vc},get appTitleA(){return Gc},get appTitleH1(){return jc},get appTitleSpan(){return zc},get callBtn(){return Le},get cameraBtn(){return os},get chatControls(){return Ae},get fullscreenPartnerBtn(){return Gr},getElements:Jp,get hangUpBtn(){return Ve},initializeYouTubeElements:BR,installBtn:Kp,get lobbyCallBtn(){return $t},get lobbyDiv(){return Je},get localBoxEl(){return ee},get localVideoEl(){return we},get micBtn(){return rs},get mutePartnerBtn(){return je},get remoteBoxEl(){return B},get remoteVideoEl(){return K},robustElementAccess:Qp,get sharedBoxEl(){return Ce},get sharedVideoEl(){return W},get switchCameraBtn(){return is},get titleAuthBar(){return jr},get videosWrapper(){return Wc},waitForElements:Xp},Symbol.toStringTag,{value:"Module"})),pd="yt-video-box",ha="yt-player-root";let H=null,ft=!1;const Rs=()=>H,WR=()=>ft,Zp=t=>ft=t,In=()=>{const t=document.getElementById(pd);if(!t)throw new Error(`Container #${pd} not found`);return t};function VR(){return new Promise(t=>{window.YT&&window.YT.Player?t():window.onYouTubeIframeAPIReady=()=>{t()}})}function eg(){const t=In();if(!document.getElementById(ha)){const e=document.createElement("div");e.id=ha,t.appendChild(e)}I(t)}function fa(){const t=In();y(t)}function wo(){const t=In();return t&&!t.classList.contains("hidden")}function pa(t){return t?t.includes("youtube.com")||t.includes("youtu.be"):!1}function tg(t){if(!t)return null;const e=[/(?:youtube\.com\/watch\?v=)([\w-]+)/,/(?:youtu\.be\/)([\w-]+)/,/(?:youtube\.com\/embed\/)([\w-]+)/,/(?:youtube\.com\/shorts\/)([\w-]+)/];for(const n of e){const s=t.match(n);if(s&&s[1])return s[1]}return null}async function jR({url:t,onReady:e,onStateChange:n}){const s=tg(t);if(!s)throw new Error("Invalid YouTube URL");if(await VR(),H){try{H.destroy()}catch(o){console.warn("Error destroying previous YouTube player:",o)}H=null}const i=(o=!0)=>{const a=In(),c=H.getIframe();if(c&&a){try{a.tabIndex=-1,a.focus({preventScroll:!0})}catch{if(document.activeElement===c)try{c.blur()}catch{}}if(o){const l=u=>{if(u.code==="Space"){const d=In(),h=H.getIframe();if(document.activeElement===h||document.activeElement===d)return;u.preventDefault(),console.debug("Space pressed, refocusing iframe"),H.getPlayerState()!==window.YT.PlayerState.PLAYING?Yc():zr()}};document.addEventListener("keydown",l,{once:!0})}}},r=()=>{const o=In(),a=H.getIframe();if(o&&a&&document.activeElement!==a)try{a.focus()}catch{}};return eg(),new Promise((o,a)=>{try{H=new window.YT.Player(ha,{videoId:s,playerVars:{autoplay:1,mute:0,controls:1,fs:1,rel:0,modestbranding:1,disablekb:0,origin:window.location.origin},events:{onReady:c=>{ft=!0,e&&e(c),o(H)},onStateChange:c=>{c.data===window.YT.PlayerState.ENDED&&i(!1),c.data===window.YT.PlayerState.PAUSED&&i(),c.data===window.YT.PlayerState.PLAYING&&r(),n&&n(c)},onError:c=>{console.error("YouTube player error:",c.data),a(new Error(`YouTube error: ${c.data}`))}}})}catch(c){a(c)}})}function qc(){if(H){try{fa(),H.destroy()}catch(t){console.warn("Error destroying YouTube player:",t)}H=null,ft=!1}}function Yc(){H&&ft&&H.playVideo()}function zr(){H&&ft&&H.pauseVideo()}function GR(t){H&&ft&&H.seekTo(t,!0)}function ur(){return H&&ft?H.getCurrentTime():0}function Kc(){return H&&ft?H.getPlayerState():-1}const bt={UNSTARTED:-1,ENDED:0,PLAYING:1,PAUSED:2,BUFFERING:3,CUED:5};let We=null,ui=null,ng=!1,Ne="none",Jc=null;const di=()=>ng,sg=t=>ng=t,ps=()=>Ne,zR=t=>{["yt","url","none"].includes(t)?Ne=t:console.warn("Invalid lastWatched platform:",t)};let St=!1,ks=null,As=0;async function Tn(t){if(!We)return;console.debug("Updating watch sync state, roomId:",We);const e=Br(We);try{await Ri(e,{...t,updatedBy:ui})}catch(n){console.error("Failed to update watch state:",n)}}function qR(t,e,n){if(!t)return;We=t,ui=n;const s=Br(t);ki(s,YR,t),tk()}function YR(t){const e=t.val();e&&e.updatedBy!==ui&&(Date.now()-As<500||(e.url&&e.url!==Jc&&KR(e.url),e.isYouTube?JR(e):ek(e)))}function KR(t){Jc=t,pa(t)?(y(Ce),ig(t),Ne="yt"):(qc(),I(Ce),W.src=t,Ne="url")}function JR(t){!Rs()||!WR()||(QR(t),XR(t))}function QR(t){const e=Kc(),n=e===bt.PLAYING;if([bt.BUFFERING,bt.UNSTARTED].includes(e)){ZR();return}St||(t.playing&&!n?(Yc(),Ne="yt"):!t.playing&&n&&(zr(),Ne="yt"))}function XR(t){if(t.currentTime===void 0)return;const e=ur();Math.abs(e-t.currentTime)>.3&&!St&&(GR(t.currentTime),setTimeout(()=>{t.playing?Yc():zr(),Ne="yt"},500))}function ZR(){St=!0,clearTimeout(ks),ks=setTimeout(async()=>{St=!1;const t=Kc()===bt.PLAYING;await Tn({playing:t,currentTime:ur()})},700)}function ek(t){t.playing!==void 0&&(t.playing&&W.paused?W.play().catch(e=>console.warn("Play failed:",e)):!t.playing&&!W.paused&&W.pause()),t.currentTime!==void 0&&Math.abs(W.currentTime-t.currentTime)>1&&(W.currentTime=t.currentTime,t.playing?W.play().catch(n=>console.warn("Play failed:",n)):W.pause())}function tk(){W.addEventListener("play",async()=>{!Rs()&&We&&(As=Date.now(),await Tn({playing:!0,isYouTube:!1})),Ne="url"}),W.addEventListener("pause",async()=>{!Rs()&&We&&(As=Date.now(),await Tn({playing:!1,isYouTube:!1})),Ne="url"}),W.addEventListener("seeked",async()=>{!Rs()&&We&&(As=Date.now(),await Tn({currentTime:W.currentTime,playing:!W.paused,isYouTube:!1})),Ne="url"})}async function nk(t){if(!t)return!1;if(As=Date.now(),pa(t)){if(y(Ce),!await ig(t))return!1;Ne="yt"}else qc(),I(Ce),W.src=t,Ne="url";if(We){const e=Br(We);dt(e,{url:t,playing:!1,currentTime:0,isYouTube:pa(t),updatedBy:ui})}return!0}async function yn(t){if(!t||!t.url)return console.warn("Non-existing or invalid video."),!1;Jc=t.url;const e=await nk(t.url);return ma(),e}async function ig(t){if(!tg(t))return console.error("Invalid YouTube URL:",t),!1;try{return await jR({url:t,onReady:n=>{if(Zp(!0),We){const s=Br(We);dt(s,{url:t,playing:!1,currentTime:0,isYouTube:!0,updatedBy:ui})}},onStateChange:async n=>{if(!Rs())return;const i=n.data===bt.PLAYING,r=n.data===bt.PAUSED;if(n.data===bt.BUFFERING){St=!0,ks&&clearTimeout(ks),ks=setTimeout(async()=>{St=!1;const c=Kc()===bt.PLAYING;await Tn({playing:c,currentTime:ur()})},700);return}r&&St||!St&&(i||r)&&await Tn({playing:i,currentTime:ur()})}}),!0}catch(n){return console.error("Failed to load YouTube video:",n),!1}}function sk(t,{inactivityMs:e=3e3,listenTarget:n=document,onShow:s=null,onHide:i=null,hideOnEsc:r=!1,excludeEvents:o=["keydown"]}={}){if(!t)return()=>{};let a=null;const l=["pointermove","pointerdown","pointerup","touchstart","touchmove","mousemove","mousedown","keydown"].filter(m=>!Array.isArray(o)||!o.includes(m));function u(){I(t);try{typeof s=="function"&&s()}catch(m){console.warn("showHideOnInactivity onShow callback error:",m)}a&&clearTimeout(a),a=setTimeout(()=>{y(t);try{typeof i=="function"&&i()}catch(m){console.warn("showHideOnInactivity onHide callback error:",m)}a=null},e)}l.forEach(m=>n.addEventListener(m,u,{passive:!0}));function d(){if(document.hidden){a&&(clearTimeout(a),a=null);try{y(t)}catch(m){console.warn("showHideOnInactivity onHide (visibilitychange) callback error:",m)}}else u()}document.addEventListener("visibilitychange",d);function h(m){if(!m.relatedTarget){a&&(clearTimeout(a),a=null),y(t);try{typeof i=="function"&&i()}catch(A){console.warn("showHideOnInactivity onHide (visibilitychange) callback error:",A)}}}n.addEventListener("mouseout",h);function f(m){if(r&&(m.key==="Escape"||m.key==="Esc")){a&&(clearTimeout(a),a=null),y(t);try{typeof i=="function"&&i()}catch(A){console.warn("showHideOnInactivity onHide (esc) callback error:",A)}}}document.addEventListener("keydown",f);function p(){a||u()}n.addEventListener("touchend",p,{passive:!0}),y(t);function E(){l.forEach(m=>n.removeEventListener(m,u)),document.removeEventListener("visibilitychange",d),n.removeEventListener("mouseout",h),n.removeEventListener("touchend",p),document.removeEventListener("keydown",f),a&&(clearTimeout(a),a=null)}return E}let Ct=null,It=null,rg="user";function ga(){return rg}function og(t){rg=t}function qr(t=!0){return!Ct||!(Ct instanceof MediaStream)?(t&&console.error("Invalid remote MediaStream accessed:",Ct),null):Ct}function ag(t){Ct=t}function cg(){Ct&&(Ct.getTracks().forEach(t=>t.stop()),Ct=null)}function Yr(t=!0){return!It||!(It instanceof MediaStream)?(t&&(console.error("Invalid local MediaStream accessed:",It),console.error("Call createLocalStream() before accessing local stream.")),null):It}function dr(t){It=t}function lg(){It&&(It.getTracks().forEach(t=>t.stop()),It=null)}const ik=Object.freeze(Object.defineProperty({__proto__:null,cleanupLocalStream:lg,cleanupRemoteStream:cg,getFacingMode:ga,getLocalStream:Yr,getRemoteStream:qr,setFacingMode:og,setLocalStream:dr,setRemoteStream:ag},Symbol.toStringTag,{value:"Module"}));let js=!1,vi=!1,gd=null,md=null,Ns=null;const rk=()=>js;let Qc=()=>{if(js)return;const t=qr(!1);if(!K||!t||K.paused||K.readyState<2){vi||(vi=!0,K.addEventListener("playing",()=>{vi=!1,Qc()},{once:!0}));return}if(vi=!1,js=!0,I(B),I(ee),Cn(ee),y(Je),y($t),Le.disabled=!0,Le.classList.add("disabled"),Ve.disabled=!1,Ve.classList.remove("disabled"),je.disabled=!1,je.classList.remove("disabled"),Ns||(Ns=sk(Ae,{inactivityMs:2500,hideOnEsc:!0})),!gd){const e=()=>{di()?Cn(B):wt(B),I(B)};K.addEventListener("leavepictureinpicture",e),gd=()=>K.removeEventListener("leavepictureinpicture",e)}if(!md){const e=()=>y(B);K.addEventListener("enterpictureinpicture",e),md=()=>K.removeEventListener("enterpictureinpicture",e)}},ug=()=>{js&&(js=!1,wt(ee),y(ee),wt(B),y(B),Le.disabled=!1,Le.classList.remove("disabled"),I($t),Ve.disabled=!0,Ve.classList.add("disabled"),je.disabled=!0,je.classList.add("disabled"),Ns&&(Ns(),Ns=null),I(Je),I(Ae))};const hr=()=>{const t=qr(!1);return t&&t.getVideoTracks().length>0&&t.getVideoTracks()[0].enabled&&t.getVideoTracks()[0].readyState==="live"};function ok(){return"pictureInPictureEnabled"in document&&typeof document.pictureInPictureEnabled=="boolean"&&document.pictureInPictureEnabled}function ma(){if(!di()){if(sg(!0),y(Je),Ae.classList.remove("bottom"),Ae.classList.add("watch-mode"),rk()?(y(Le),I(Ve)):(y(Ve),y(rs),y(je),I(Le)),y($t),y(os),y(is),I(Ae),!hr()){y(B),wt(B),da(we)||(I(ee),Cn(ee));return}y(ee),wt(ee),da(K)?(y(B),wt(B)):ok()?K.requestPictureInPicture().then(()=>{y(B),wt(B)}).catch(t=>{console.warn("Failed to enter Picture-in-Picture:",t),Cn(B),I(B)}):(Cn(B),I(B))}}function Oi(){di()&&(I(Le),I(Ve),I(rs),I(je),I(os),I(is),Ae.classList.remove("watch-mode"),Ae.classList.add("bottom"),I(Ae),hr()&&(da(K)&&document.exitPictureInPicture().catch(t=>{console.error("Failed to exit Picture-in-Picture:",t)}),wt(B),I(B)),Cn(ee),I(ee),hr()||(I(Je),I($t)),sg(!1))}class Rn{constructor(){this.logs=[],this.isEnabled=!0,this.maxLogs=1e3,this.sessionId=this.generateSessionId()}log(e,n,s={}){if(!this.isEnabled)return;const i={timestamp:performance.now(),sessionId:this.sessionId,category:e,event:n,data:{...s},id:this.generateLogId()};this.logs.push(i),this.logs.length>this.maxLogs&&(this.logs=this.logs.slice(-this.maxLogs)),typeof window<"u"&&window.location?.hostname==="localhost"&&console.log(`[DIAG] ${e}:${n}`,s)}logListenerAttachment(e,n,s,i={}){this.log("LISTENER","ATTACHED",{roomId:e,listenerType:n,currentCount:s,...i})}logListenerCleanup(e,n,s={}){this.log("LISTENER","CLEANUP",{removedCount:e.length,preservedCount:n.length,removedRoomIds:e,preservedRoomIds:n,...s})}logDuplicateListener(e,n,s={}){this.log("LISTENER","DUPLICATE_PREVENTED",{roomId:e,listenerType:n,...s})}logIncomingCallEvent(e,n,s,i={}){this.log("INCOMING_CALL","DETECTED",{callerId:e,roomId:n,isFresh:s.isFresh,validationMethod:s.method,age:s.age,reason:s.reason,...i})}logNotificationDecision(e,n,s,i={}){this.log("INCOMING_CALL","NOTIFICATION_DECISION",{decision:e,reason:n,roomId:s,...i})}logCallingUILifecycle(e,n,s={}){this.log("CALLING_UI",e,{roomId:n,...s})}logFirebaseOperation(e,n,s=null,i={}){this.log("FIREBASE","OPERATION",{operation:e,success:n,error:s?{message:s.message,code:s.code,stack:s.stack}:null,...i})}logFirebaseConnectionState(e,n={}){this.log("FIREBASE","CONNECTION_STATE",{state:e,...n})}logRoomCreation(e,n,s,i={}){this.log("ROOM","CREATED",{roomId:e,isInitiator:n,creationTime:s.creationTime,listenerAttachTime:s.listenerAttachTime,timeDiff:s.listenerAttachTime-s.creationTime,...i})}logMemberJoinEvent(e,n,s,i={}){this.log("ROOM","MEMBER_JOINED",{roomId:e,memberId:n,joinedAt:s.joinedAt,role:s.role,...i})}logContactSave(e,n,s={}){this.log("CONTACT","SAVED",{contactId:e,roomId:n,...s})}logContactCall(e,n,s,i={}){this.log("CONTACT","CALL_INITIATED",{contactId:e,roomId:n,forceInitiator:s,...i})}logFreshnessValidation(e,n,s,i={}){this.log("FRESHNESS","VALIDATION",{roomId:e,method:n,result:{isFresh:s.isFresh,age:s.age,threshold:s.threshold,reason:s.reason},...i})}logRaceCondition(e,n,s,i={}){this.log("RACE_CONDITION",e,{roomId:n,events:s,...i})}getLogs(e={}){let n=[...this.logs];return e.category&&(n=n.filter(s=>s.category===e.category)),e.event&&(n=n.filter(s=>s.event===e.event)),e.roomId&&(n=n.filter(s=>s.data.roomId===e.roomId)),e.since&&(n=n.filter(s=>s.timestamp>=e.since)),e.until&&(n=n.filter(s=>s.timestamp<=e.until)),n}getCallFlowTrace(e){return this.getLogs({roomId:e}).sort((n,s)=>n.timestamp-s.timestamp)}getListenerDiagnostics(e=null){const n=this.getLogs({category:"LISTENER"});return e?n.filter(s=>s.data.roomId===e):n}getFailureAnalysis(){const e=this.logs.filter(n=>n.category==="FIREBASE"&&n.data.success===!1||n.category==="INCOMING_CALL"&&n.data.decision==="REJECT"||n.category==="LISTENER"&&n.event==="DUPLICATE_PREVENTED");return{totalFailures:e.length,firebaseFailures:e.filter(n=>n.category==="FIREBASE").length,rejectedCalls:e.filter(n=>n.category==="INCOMING_CALL"&&n.data.decision==="REJECT").length,duplicateListeners:e.filter(n=>n.event==="DUPLICATE_PREVENTED").length,failures:e}}exportDiagnostics(){return{sessionId:this.sessionId,exportTime:Date.now(),logCount:this.logs.length,logs:[...this.logs],summary:this.getFailureAnalysis()}}exportLogsAsJSON(){return JSON.stringify(this.exportDiagnostics(),null,2)}downloadLogs(e=null){e||(e=`diagnostic-logs-${this.sessionId}-${Date.now()}.json`);const n=this.exportLogsAsJSON(),s=new Blob([n],{type:"application/json"}),i=document.createElement("a");i.href=URL.createObjectURL(s),i.download=e,i.click(),URL.revokeObjectURL(i.href)}getLogsInTimeRange(e,n){return this.logs.filter(s=>s.timestamp>=e&&s.timestamp<=n)}getLogsSince(e){return this.logs.filter(n=>n.timestamp>=e)}clearOldLogs(e=1440*60*1e3){const n=Date.now()-e;this.logs=this.logs.filter(s=>s.timestamp>=n)}clearLogs(){this.logs=[]}persistLogs(){try{const e=`diagnostic-logs-${this.sessionId}`;return localStorage.setItem(e,this.exportLogsAsJSON()),e}catch(e){return console.warn("Failed to persist logs to localStorage:",e),null}}loadPersistedLogs(e){try{const n=localStorage.getItem(e);if(n){const s=JSON.parse(n);if(s.logs&&Array.isArray(s.logs)){const i=new Set(this.logs.map(o=>o.id)),r=s.logs.filter(o=>!i.has(o.id));return this.logs=[...this.logs,...r].sort((o,a)=>o.timestamp-a.timestamp),r.length}}return 0}catch(n){return console.warn("Failed to load persisted logs:",n),0}}static getPersistedLogKeys(){const e=[];for(let n=0;n<localStorage.length;n++){const s=localStorage.key(n);s&&s.startsWith("diagnostic-logs-")&&e.push(s)}return e}static cleanupPersistedLogs(e=1440*60*1e3){const n=Date.now()-e;Rn.getPersistedLogKeys().forEach(i=>{try{const r=localStorage.getItem(i);if(r){const o=JSON.parse(r);o.exportTime&&o.exportTime<n&&localStorage.removeItem(i)}}catch{localStorage.removeItem(i)}})}enable(){this.isEnabled=!0}disable(){this.isEnabled=!1}generateSessionId(){return`session_${performance.now()}_${Math.random().toString(36).substr(2,9)}`}generateLogId(){return`log_${performance.now()}_${Math.random().toString(36).substr(2,9)}`}formatTimestamp(e){return new Date(e).toISOString()}startTiming(e){const n=`timing_${e}_${Date.now()}`;return this.log("TIMING","START",{operation:e,timingId:n}),n}endTiming(e,n={}){const s=this.logs.find(i=>i.category==="TIMING"&&i.event==="START"&&i.data.timingId===e);if(s){const i=Date.now()-s.timestamp;return this.log("TIMING","END",{timingId:e,duration:i,operation:s.data.operation,...n}),i}return null}}let bo=null;function _(){return bo||(bo=new Rn),bo}typeof window<"u"&&(window.diagnosticLogger={getInstance:()=>_(),exportLogs:()=>{const e=_().exportLogsAsJSON();return console.log("Diagnostic logs exported:"),console.log(e),e},downloadLogs:t=>{_().downloadLogs(t),console.log("Diagnostic logs downloaded")},getRoomLogs:t=>{const n=_().getCallFlowTrace(t);return console.log(`Logs for room ${t}:`,n),n},getFailures:()=>{const e=_().getFailureAnalysis();return console.log("Failure analysis:",e),e},getListenerDiagnostics:t=>{const n=_().getListenerDiagnostics(t);return console.log("Listener diagnostics:",n),n},getLogsSince:t=>{const n=_().getLogsSince(t);return console.log(`Logs since ${new Date(t).toISOString()}:`,n),n},getLogsInRange:(t,e)=>{const s=_().getLogsInTimeRange(t,e);return console.log(`Logs from ${new Date(t).toISOString()} to ${new Date(e).toISOString()}:`,s),s},persistLogs:()=>{const e=_().persistLogs();return console.log(`Logs persisted with key: ${e}`),e},loadPersistedLogs:t=>{const n=_().loadPersistedLogs(t);return console.log(`Loaded ${n} persisted logs`),n},getPersistedKeys:()=>{const t=Rn.getPersistedLogKeys();return console.log("Persisted log keys:",t),t},clearLogs:()=>{_().clearLogs(),console.log("Diagnostic logs cleared")},enable:()=>{_().enable(),console.log("Diagnostic logging enabled")},disable:()=>{_().disable(),console.log("Diagnostic logging disabled")},getSessionInfo:()=>{const t=_(),e={sessionId:t.sessionId,logCount:t.logs.length,isEnabled:t.isEnabled,maxLogs:t.maxLogs};return console.log("Session info:",e),e},help:()=>{console.log(`
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
      `)}},window.addEventListener("beforeunload",()=>{try{const t=_();t.logs.length>0&&t.persistLogs(),Rn.cleanupPersistedLogs()}catch{}}),(window.location.hostname==="localhost"||window.location.hostname==="127.0.0.1")&&setTimeout(()=>{try{const t=_(),e=typeof localStorage<"u"&&localStorage.getItem("debug:console")==="1";if(!t.isEnabled||!e)return;const n=Rn.getPersistedLogKeys();n.length>0&&(console.log(`Found ${n.length} persisted diagnostic log sessions. Use diagnosticLogger.loadPersistedLogs(key) to load them.`),console.log("Available keys:",n))}catch{}},1e3));class ak{constructor(){this.currentRoomId=null}async createNewRoom(e,n,s=null){const i=Date.now();s||(s=Math.random().toString(36).substring(2,15)),_().log("ROOM","CREATE_START",{roomId:s,userId:n,hasOffer:!!e,timestamp:i});const r=Ht(s);try{return await dt(r,{offer:{type:e.type,sdp:e.sdp},createdAt:Date.now(),createdBy:n}),_().logFirebaseOperation("create_room",!0,null,{roomId:s,userId:n,duration:Date.now()-i}),await this.joinRoom(s,n),_().log("ROOM","CREATE_COMPLETE",{roomId:s,userId:n,totalDuration:Date.now()-i}),s}catch(o){throw _().logFirebaseOperation("create_room",!1,o,{roomId:s,userId:n,duration:Date.now()-i}),o}}async checkRoomStatus(e){const n=Ht(e),s=await Zt(n);if(!s.exists())return{exists:!1,hasMembers:!1,memberCount:0};const i=s.val(),r=i.members||{},o=Object.keys(r).length;return{exists:!0,hasMembers:o>0,memberCount:o,roomData:i}}async getRoomData(e){const n=Ht(e),s=await Zt(n);if(!s.exists())throw new Error("Room does not exist");return s.val()}async saveAnswer(e,n){const s=Ht(e);await Ri(s,{answer:n})}async joinRoom(e,n,s="Guest User"){const i=Ju(e,n);await dt(i,{displayName:s,joinedAt:Date.now()}),_().logFirebaseOperation("set","joinRoom",`rooms/${e}/members/${n}`)}async leaveRoom(e,n=null,{deleteRoomIfEmpty:s=!0}={}){const i=n||this.currentRoomId;if(!i||!e)return;const r=Ju(i,e),o=yi(i),a=Ht(i);try{await Wn(r)}catch(c){_().logFirebaseOperation("leave_room_remove_member",!1,c,{roomId:i,userId:e})}if(s)try{const c=await Zt(o),l=c.exists()?c.val():{};(l?Object.keys(l).length:0)===0&&await Wn(a).catch(d=>{_().logFirebaseOperation("delete_empty_room",!1,d,{roomId:i})})}catch(c){_().logFirebaseOperation("check_members_after_leave",!1,c,{roomId:i})}(!n||n===this.currentRoomId)&&(this.currentRoomId=null)}async rejectCall(e,n,s="user_rejected"){if(!e||!n)return;const i=Ht(e),r={rejection:{by:n,reason:s,at:Date.now()}};try{await Ri(i,r),_().log("ROOM","REJECT_SET",{roomId:e,byUserId:n,reason:s})}catch(o){throw _().log("ROOM","REJECT_SET_FAILED",{roomId:e,byUserId:n,reason:s,error:String(o?.message||o)}),o}}async cancelCall(e,n,s="caller_cancelled"){if(!e||!n)return;const i=Ht(e),r={cancellation:{by:n,reason:s,at:Date.now()}};try{await Ri(i,r),_().log("ROOM","CANCEL_SET",{roomId:e,byUserId:n,reason:s})}catch(o){throw _().log("ROOM","CANCEL_SET_FAILED",{roomId:e,byUserId:n,reason:s,error:String(o?.message||o)}),o}}onCallCancelled(e,n){const s=fI(e);Kt(s,"value",n,e),_().logFirebaseOperation("on","onCallCancelled",`rooms/${e}/cancellation`,{event:"value"})}onMemberJoined(e,n){const s=yi(e);Kt(s,"child_added",n,e),_().logFirebaseOperation("on","onMemberJoined",`rooms/${e}/members`,{event:"child_added"})}onMemberLeft(e,n){const s=yi(e);Kt(s,"child_removed",n,e),_().logFirebaseOperation("on","onMemberLeft",`rooms/${e}/members`,{event:"child_removed"})}onIncomingCall(e,n,s){const i=yi(e),r=a=>{s("join",a.key,a.val())},o=a=>{s("leave",a.key,a.val())};return Kt(i,"child_added",r,e,n),Kt(i,"child_removed",o,e,n),()=>hI(n,e)}get roomId(){return this.currentRoomId}}const j=new ak,fr=3e4;let tt=null,ys=null;async function ck(t,e=null){const n=le(),s=Ze();if(!s)return;const i=Tc(s);await dt(i,{roomId:t,targetContactName:e,initiatedAt:Date.now(),callerUserId:n})}async function pr(){const t=Ze();if(!t)return;const e=Tc(t);await Wn(e).catch(()=>{})}async function dg(t,e){if(!t)return!1;try{const n=Tc(t),s=await Zt(n);if(!s.exists())return!1;const i=s.val();return i.roomId!==e?!1:Date.now()-i.initiatedAt<fr}catch(n){return console.warn("Failed to check outgoing call freshness",n),!1}}async function hg(t){if(!t)return!1;try{const e=ie(re,`rooms/${t}/createdAt`),n=await Zt(e);if(!n.exists())return!1;const s=n.val();return typeof s!="number"?!1:Date.now()-s<fr}catch(e){return console.warn("Failed to check room freshness",e),!1}}async function fg(t,e,n){const s=_(),i=Date.now();Pt(),await ck(t,e);const r=document.createElement("div");r.id="calling-modal",r.style.cssText=`
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
  `;const u=async()=>{s.logCallingUILifecycle("CANCEL",t,{contactName:e,reason:"user_cancelled",duration:Date.now()-i});try{await Promise.all([pr(),j.cancelCall(t,le(),"caller_cancelled"),j.leaveRoom(le(),t)])}catch(d){s.log("ROOM","CALLER_CANCELLED_CLEANUP_FAIL",{roomId:t,error:String(d)})}Pt()};l.onclick=u,o.appendChild(a),o.appendChild(c),o.appendChild(l),r.appendChild(o),document.body.appendChild(r),r.dataset.roomId=t,tt=r,ys=setTimeout(async()=>{s.logCallingUILifecycle("TIMEOUT",t,{contactName:e,reason:"auto_timeout",duration:Date.now()-i,timeoutMs:fr});try{await Promise.all([pr(),j.cancelCall(t,le(),"auto_timeout"),j.leaveRoom(le(),t)])}catch(d){s.log("ROOM","CALLER_TIMEOUT_CLEANUP_FAIL",{roomId:t,error:String(d)})}Pt()},fr)}function Pt(){if(tt){const t=tt.dataset?.roomId||"unknown";_().logCallingUILifecycle("HIDE",t,{reason:"hide_called",hadTimeout:!!ys,timestamp:Date.now()})}ys&&(clearTimeout(ys),ys=null),tt&&(tt.remove(),tt=null)}async function Xc(){if(tt){const t=tt.dataset?.roomId||"unknown";_().logCallingUILifecycle("ANSWERED",t,{reason:"call_answered",timestamp:Date.now()})}await pr(),Pt()}async function lk(t="user_rejected"){const e=_(),n=tt?.dataset?.roomId||"unknown";e.logCallingUILifecycle("REJECTED",n,{reason:t,timestamp:Date.now()}),await pr(),Pt()}const uk=Object.freeze(Object.defineProperty({__proto__:null,hideCallingUI:Pt,isOutgoingCallFresh:dg,isRoomCallFresh:hg,onCallAnswered:Xc,onCallRejected:lk,showCallingUI:fg},Symbol.toStringTag,{value:"Module"}));let kn=null;function Zc(t,e={}){return new Promise(n=>{const s=document.createElement("dialog");s.innerHTML=`
      <p>${t}</p>
      <div class="confirm-dialog-actions">
        <button data-action="cancel">Cancel</button>
        <button data-action="confirm" autofocus>Confirm</button>
      </div>
    `,s.classList.add("confirm-dialog");const i=s.querySelector('[data-action="confirm"]'),r=s.querySelector('[data-action="cancel"]');if(!i||!r){console.error("dialog element not found!"),n(!1);return}let o=null;function a(c){o&&clearTimeout(o),s.close(),s.remove(),kn===a&&(kn=null),n(c)}i.addEventListener("click",()=>{a(!0)}),r.addEventListener("click",()=>{a(!1)}),s.addEventListener("cancel",()=>a(!1)),document.body.appendChild(s),s.showModal(),kn=a,e.autoRemoveSeconds&&typeof e.autoRemoveSeconds=="number"&&e.autoRemoveSeconds>0&&(o=setTimeout(()=>{a(!1)},e.autoRemoveSeconds*1e3))})}function dk(){if(typeof kn=="function"){try{kn(!1)}catch{}return kn=null,!0}return!1}const hk=Object.freeze(Object.defineProperty({__proto__:null,default:Zc,dismissActiveConfirmDialog:dk},Symbol.toStringTag,{value:"Module"}));async function _d(t,e,n){const s=Ze();if(s){const i=ie(re,`users/${s}/contacts/${t}`);await dt(i,{contactId:t,contactName:e,roomId:n,savedAt:Date.now()});return}try{const i=localStorage.getItem("contacts")||"{}",r=JSON.parse(i);r[t]={contactId:t,contactName:e,roomId:n,savedAt:Date.now()},localStorage.setItem("contacts",JSON.stringify(r))}catch(i){console.warn("Failed to save contact to localStorage",i)}}async function gr(){const t=Ze();if(t)try{const e=ie(re,`users/${t}/contacts`),n=await Zt(e);return n.exists()?n.val():{}}catch(e){return console.warn("Failed to read contacts from RTDB",e),{}}try{const e=localStorage.getItem("contacts")||"{}";return JSON.parse(e)}catch(e){return console.warn("Failed to read contacts from localStorage",e),{}}}async function fk(t,e,n){if(!t||!e)return;const i=(await gr())?.[t];if(i){i.roomId!==e&&(await _d(t,i.contactName,e),await Gs(n)),console.log(`[CONTACT SAVE] Re-attaching listener for existing contact room: ${e}`),jn(e);return}if(!await Zc("Save contact?",{autoRemoveSeconds:15}))return;const o=window.prompt("Enter a name for this contact:",t)||t;await _d(t,o,e),console.log(`[CONTACT SAVE] Attaching listener for saved contact room: ${e}`),jn(e),await Gs(n)}async function Gs(t){if(!t)return;const e=await gr(),n=Object.keys(e);let s=t.querySelector(".contacts-container");if(s||(s=document.createElement("div"),s.className="contacts-container",t.appendChild(s)),n.length===0){s.innerHTML="<p>No saved contacts yet.</p>",y(s);return}I(s),s.innerHTML=`
    <h3>Saved Contacts</h3>
    <div class="contacts-list">
      ${n.map(i=>{const r=e[i];return`
            <div class="contact-entry">
              <button 
                class="contact-call-btn" 
                data-room-id="${r.roomId}"
                data-contact-name="${r.contactName}"
              >
                Call
              </button>
              <span class="contact-name">${r.contactName}</span>
              <button 
                class="contact-delete-btn" 
                data-contact-id="${i}"
              >
                ✕
              </button>
            </div>
          `}).join("")}
    </div>
  `,pk(s,t)}function pk(t,e){t.querySelectorAll(".contact-call-btn").forEach(n=>{n.onclick=async()=>{const s=n.getAttribute("data-room-id"),i=n.getAttribute("data-contact-name");s&&(console.log(`[CONTACT CALL] Ensuring listener is active for room: ${s}`),jn(s),await fg(s,i),Kr(s,{forceInitiator:!0}).catch(r=>{console.warn("Failed to call contact:",r),Pt()}))}}),t.querySelectorAll(".contact-delete-btn").forEach(n=>{n.onclick=async()=>{const s=n.getAttribute("data-contact-id");!s||!window.confirm("Delete this contact?")||(await gk(s),await Gs(e))}})}async function gk(t){const e=Ze();if(e){try{await Wn(ie(re,`users/${e}/contacts/${t}`))}catch(n){console.warn("Failed to delete contact from RTDB",n)}return}try{const n=localStorage.getItem("contacts")||"{}",s=JSON.parse(n);s[t]&&(delete s[t],localStorage.setItem("contacts",JSON.stringify(s)))}catch(n){console.warn("Failed to delete contact from localStorage",n)}}const zs=new WeakMap;function el(t,e,n){if(!t||!n)throw new Error("setupIceCandidates: pc and roomId are required");if(zs.has(t)||zs.set(t,[]),e==="initiator")yd(t,"offerCandidates",n),Ed(t,"answerCandidates",n);else if(e==="joiner")yd(t,"answerCandidates",n),Ed(t,"offerCandidates",n);else throw new Error(`Invalid role: ${e} specified for ICE candidate setup.`)}function yd(t,e,n){t.onicecandidate=s=>{if(s.candidate){const i=Ku(e==="offerCandidates"?sp(n):ip(n));dt(i,s.candidate.toJSON())}}}function Ed(t,e,n){const s=e==="offerCandidates"?sp(n):ip(n);let i=!1;const r=()=>{if(i)return;i=!0;const a=()=>{t.remoteDescription&&(tl(t),t.removeEventListener("signalingstatechange",a))};t.addEventListener("signalingstatechange",a)};Kt(s,"child_added",a=>{const c=a.val();if(!(!t||t.signalingState==="closed")&&c)if(t.remoteDescription)try{t.addIceCandidate(new RTCIceCandidate(c))}catch{}else{const l=zs.get(t);l&&(l.push(c),l.length===1&&r())}},n)}function tl(t){if(!t||!zs.has(t))return;const e=zs.get(t);if(e.length!==0){U(`🔄 Draining ${e.length} queued ICE candidate(s)`);for(const n of e)try{t.addIceCandidate(new RTCIceCandidate(n)).catch(s=>{U("Error adding queued ICE candidate:",s)})}catch{}e.length=0}}const mk=Object.freeze(Object.defineProperty({__proto__:null,drainIceCandidateQueue:tl,setupIceCandidates:el},Symbol.toStringTag,{value:"Module"}));let ze=null,vd=null;function pg(t){vd=t,t.onconnectionstatechange=()=>{U("onconnectionstatechange:",t.connectionState),t.connectionState==="connected"?(Qc(),Xc().catch(e=>console.warn("Failed to clear calling state on connect:",e)),ze&&(clearTimeout(ze),ze=null)):t.connectionState==="disconnected"?(ze&&clearTimeout(ze),ze=setTimeout(()=>{t===vd&&t.connectionState==="disconnected"&&te.cleanupCall({reason:"connection_lost"}),ze=null},3e3)):t.connectionState==="failed"&&(Vr(),ze&&(clearTimeout(ze),ze=null),te.cleanupCall({reason:"connection_failed"}))},t.addEventListener("iceconnectionstatechange",e=>{U("ICE iceconnectionstatechange:",t.iceConnectionState),t.iceConnectionState==="failed"&&(console.warn("ICE connection failed, restarting ICE..."),t.restartIce())})}function _a(t,e,n={}){if(!t||typeof e!="function")throw new Error("closeOnClickOutside: valid element and onClose callback required");const{ignore:s=[],esc:i=!0,events:r=["mousedown","touchstart"]}=n,o=Array.isArray(s)?s.filter(Boolean):[],a=l=>{try{const u=l.target;if(t.contains(u))return;for(const d of o)if(d&&d.contains&&d.contains(u)||d===u)return;e(l)}catch(u){console.error("closeOnClickOutside handler error:",u)}},c=l=>{i&&l.key==="Escape"&&e(l)};return r.forEach(l=>document.addEventListener(l,a,{passive:!0})),i&&document.addEventListener("keydown",c),function(){r.forEach(u=>document.removeEventListener(u,a,{passive:!0})),i&&document.removeEventListener("keydown",c)}}const _k=CSS.supports?.("position-anchor: --msg-toggle")&&CSS.supports?.("right: anchor(right)")&&CSS.supports?.("bottom: anchor(top)");function yk(t){const e=t.getBoundingClientRect();return e.top>=0&&e.left>=0&&e.bottom<=window.innerHeight&&e.right<=window.innerWidth}function wd(t){const e=document.createElement("div");e.innerHTML=`
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
  `,document.body.appendChild(e);const n=e.querySelector("#messages-toggle-btn"),s=e.querySelector("#messages-box"),i=e.querySelector("#messages"),r=e.querySelector("#messages-form"),o=e.querySelector("#messages-input"),a=n?.parentNode||null,c=n?.nextSibling||null;if(!n||!s||!i||!r||!o)return console.error("Messages UI elements not found."),null;let l=!1;function u(){if(!n||!s||s.classList.contains("hidden"))return;const Y=n.getBoundingClientRect(),de=s.getBoundingClientRect(),ol=8;let Jr=Y.top-de.height-ol;Jr<8&&(Jr=Y.bottom+ol);let as=Y.left+Y.width/2-de.width/2;const al=window.innerWidth-de.width-8;as<8&&(as=8),as>al&&(as=al),s.style.top=`${Math.round(Jr)}px`,s.style.left=`${Math.round(as)}px`}function d(){l||(l=!0,window.addEventListener("resize",u,{passive:!0}),window.addEventListener("scroll",u,{passive:!0}),window.addEventListener("orientationchange",u,{passive:!0}))}function h(){l&&(l=!1,window.removeEventListener("resize",u),window.removeEventListener("scroll",u),window.removeEventListener("orientationchange",u))}const f=document.querySelector(".top-bar .top-right-menu")||document.querySelector(".top-right-menu");function p(){!n||!f||n.parentNode!==f&&f.appendChild(n)}function E(){!n||!a||n.parentNode!==a&&(c&&c.parentNode===a?a.insertBefore(n,c):a.appendChild(n))}const m=window.matchMedia("(max-width: 800px)"),A=Y=>{Y.matches?p():E()};A(m),m.addEventListener("change",A);const N=new MutationObserver(Y=>{Y.forEach(de=>{de.type==="attributes"&&de.attributeName==="class"&&s.classList.contains("hidden")})});N.observe(s,{attributes:!0});function ae(){s.classList.toggle("hidden"),s.classList.contains("hidden")?(o.blur(),h(),s.style.top="",s.style.left="",s.style.bottom="",s.style.right=""):(o.focus(),_k?requestAnimationFrame(()=>{yk(s)||(u(),d())}):(u(),d()))}n.addEventListener("click",ae),_a(s,()=>{y(s),h(),s.style.top="",s.style.left="",s.style.bottom="",s.style.right=""},{ignore:[n],esc:!0});function S(){I(n)}function ne(){y(n)}function Ie(Y){const de=document.createElement("p");de.textContent=Y,Y.startsWith("You:")?de.style.textAlign="right":Y.startsWith("Partner:")&&(de.style.textAlign="left"),i.appendChild(de),i.scrollTop=i.scrollHeight}function Ge(Y){Ie(`Partner: ${Y}`),Hc(s)&&ve()}function ve(){n.classList.add("new-message"),setTimeout(()=>{n.classList.remove("new-message")},4e3)}r.addEventListener("submit",Y=>{Y.preventDefault();const de=o.value.trim();de&&(t(de),Ie(`You: ${de}`),o.value="")});function gn(){try{m.removeEventListener("change",A)}catch{}E(),h(),N.disconnect(),n&&ne(),e&&e.parentNode&&e.parentNode.removeChild(e)}return{appendChatMessage:Ie,receiveMessage:Ge,toggleMessages:ae,showMessagesToggle:S,hideMessagesToggle:ne,cleanup:gn}}function gg(t,e){let n,s;return e==="initiator"?(n=t.createDataChannel("chat"),s=wd(r=>{n.readyState==="open"&&n.send(r)}),n.onopen=()=>{s.showMessagesToggle(),s.appendChatMessage("💬 Chat connected")},n.onmessage=r=>s.receiveMessage(r.data)):e==="joiner"&&(t.ondatachannel=i=>{n=i.channel,s=wd(r=>n.send(r)),n.onopen=()=>{s.showMessagesToggle(),s.appendChatMessage("💬 Chat connected")},n.onmessage=r=>s.receiveMessage(r.data)}),{dataChannel:n,messagesUI:s}}const nl={iceServers:[{urls:"stun:stun.l.google.com:19302"}]},So=new WeakMap;function mg(t,e,n){So.has(t)||So.set(t,{});const s=So.get(t),i=e==="offer"?"lastOffer":"lastAnswer";return s[i]===n?!0:(s[i]=n,!1)}function _g(t,e){return t?e==="offer"?t.signalingState==="stable":t.signalingState==="have-local-offer"||t.signalingState==="stable":!1}function sl(t,e){e.getTracks().forEach(n=>{t.addTrack(n,e)})}async function yg(t){const e=await t.createOffer();return await t.setLocalDescription(e),e}async function Eg(t){const e=await t.createAnswer();return await t.setLocalDescription(e),e}async function vg(t,e,n){if(mg(t,e.type,e.sdp))return console.debug(`Ignoring duplicate ${e.type} - already processed`),!1;if(!_g(t,e.type))return console.warn(`Ignoring ${e.type} - unexpected signaling state:`,t.signalingState),!1;try{return await t.setRemoteDescription(new RTCSessionDescription(e)),n(t),console.debug(`Remote description set (${e.type})`),!0}catch(s){return console.error(`Failed to set remote description (${e.type}):`,s),!1}}function wg(){return Math.random().toString(36).substring(2,9)}const Ek=Object.freeze(Object.defineProperty({__proto__:null,addLocalTracks:sl,createAnswer:Eg,createOffer:yg,generateRoomId:wg,isDuplicateSdp:mg,isValidSignalingState:_g,rtcConfig:nl,setRemoteDescription:vg},Symbol.toStringTag,{value:"Module"}));async function vk({localStream:t,remoteVideoEl:e,mutePartnerBtn:n,setupRemoteStream:s,setupWatchSync:i,targetRoomId:r=null}){if(!t)return{success:!1};const o=new RTCPeerConnection(nl),a="initiator",c=r||wg(),l=le();sl(o,t);const{dataChannel:u,messagesUI:d}=gg(o,a);if(!s(o,e,n))return console.error("Error setting up remote stream"),o.close(),{success:!1};el(o,a,c),pg(o);const f=await yg(o);await j.createNewRoom(f,l,c),i(c,a,l);const p=`${window.location.origin}${window.location.pathname}?room=${c}`;return{success:!0,pc:o,roomId:c,roomLink:p,dataChannel:u,messagesUI:d,role:a}}async function wk({roomId:t,localStream:e,remoteVideoEl:n,mutePartnerBtn:s,setupRemoteStream:i,setupWatchSync:r}){if(!e)return{success:!1};if(!t)return{success:!1};const o=await j.checkRoomStatus(t);if(!o.exists)return{success:!1};if(!o.hasMembers)return{success:!1};let a;try{a=await j.getRoomData(t)}catch(m){return U("Error: "+m.message),{success:!1}}const c=a.offer;if(!c)return{success:!1};const l=new RTCPeerConnection(nl),u="joiner",d=le();sl(l,e);const{dataChannel:h,messagesUI:f}=gg(l,u);if(!i(l,n,s))return console.error("Error setting up remote stream for joiner"),l.close(),{success:!1};el(l,u,t),pg(l),await vg(l,c,tl);const E=await Eg(l);try{await j.saveAnswer(t,E)}catch(m){return console.error("Failed to save answer to Firebase:",m),l.close(),{success:!1}}return r(t,u,d),await j.joinRoom(t,d),{success:!0,pc:l,roomId:t,dataChannel:h,messagesUI:f,role:u}}class bk{constructor(){this.listeners=new Map}on(e,n){this.listeners.has(e)||this.listeners.set(e,new Set),this.listeners.get(e).add(n)}off(e,n){this.listeners.has(e)&&this.listeners.get(e).delete(n)}emit(e,n){if(this.listeners.has(e))for(const s of Array.from(this.listeners.get(e)))try{s(n)}catch(i){console.warn("CallController listener error",i)}}}class Sk{constructor(){this.emitter=new bk,this.resetState()}resetState(){this.state="idle",this.roomId=null,this.roomLink=null,this.role=null,this.partnerId=null,this.pc=null,this.dataChannel=null,this.messagesUI=null,this.localVideoEl=null,this.remoteVideoEl=null,this.isHangingUp=!1,this.isCleaningUp=!1,this.listeners=new Map}getState(){return{state:this.state,roomId:this.roomId,roomLink:this.roomLink,role:this.role,partnerId:this.partnerId,hasPc:!!this.pc,isHangingUp:this.isHangingUp,isCleaningUp:this.isCleaningUp}}on(e,n){this.emitter.on(e,n)}off(e,n){this.emitter.off(e,n)}setPartnerId(e){this.partnerId=e}setupCancellationListener(e){if(!e)return;const n=ie(re,`rooms/${e}/cancellation`);let s=!1;const i=async r=>{const o=r.val();if(o&&!s){s=!0;try{this.remoteVideoEl&&(this.remoteVideoEl.srcObject=null)}catch(a){console.warn("Failed to clear remote video after cancellation",a)}try{this.pc&&this.pc.close()}catch{}try{await this.cleanupCall({reason:o.reason||"remote_cancelled"})}catch(a){console.warn("Failed to trigger CallController cleanup",a)}}};ki(n,i,e),this.listeners.has("cancellation")||this.listeners.set("cancellation",[]),this.listeners.get("cancellation").push({ref:n,callback:i,roomId:e})}setupAnswerListener(e,n,s){if(!e||!n)return;const i=ie(re,`rooms/${e}/answer`),r=async o=>{const a=o.val();if(a){const{setRemoteDescription:c}=await Oe(async()=>{const{setRemoteDescription:l}=await Promise.resolve().then(()=>Ek);return{setRemoteDescription:l}},void 0);await c(n,a,s)}};ki(i,r,e),this.listeners.has("answer")||this.listeners.set("answer",[]),this.listeners.get("answer").push({ref:i,callback:r,roomId:e})}setupRejectionListener(e){if(!e)return;const n=ie(re,`rooms/${e}/rejection`);let s=!1;const i=async r=>{const o=r.val();if(o&&!s&&(s=!0,this.pc?.connectionState!=="connected")){try{const{onCallRejected:a}=await Oe(async()=>{const{onCallRejected:c}=await Promise.resolve().then(()=>uk);return{onCallRejected:c}},void 0);await a(o.reason||"user_rejected")}catch{}try{await j.leaveRoom(le(),e)}catch{}try{this.pc&&this.pc.close()}catch{}}};ki(n,i,e),this.listeners.has("rejection")||this.listeners.set("rejection",[]),this.listeners.get("rejection").push({ref:n,callback:i,roomId:e})}setupMemberJoinedListener(e){if(!e)return;const n=le(),s=i=>{i.key!==n&&(this.setPartnerId(i.key),this.emitter.emit("memberJoined",{memberId:i.key,roomId:e}))};j.onMemberJoined(e,s),this.listeners.has("member-joined")||this.listeners.set("member-joined",[]),this.listeners.get("member-joined").push({callback:s,roomId:e})}setupMemberLeftListener(e){if(!e)return;const n=le(),s=i=>{i.key!==n&&this.pc?.connectionState==="connected"&&this.emitter.emit("memberLeft",{memberId:i.key,roomId:e})};j.onMemberLeft(e,s),this.listeners.has("member-left")||this.listeners.set("member-left",[]),this.listeners.get("member-left").push({callback:s,roomId:e})}removeTrackedListeners(){try{for(const[e,n]of this.listeners.entries())for(const s of n)try{s.ref&&Ur(s.ref,"value",s.callback)}catch(i){console.warn(`Failed to remove ${e} listener`,i)}}catch(e){console.warn("Failed to remove tracked listeners",e)}finally{this.listeners.clear()}if(this.roomId)try{$r(this.roomId)}catch(e){console.warn("Failed to remove RTDB listeners for room",e)}}async createCall(e={}){this.state="creating";try{e.localVideoEl&&(this.localVideoEl=e.localVideoEl),e.remoteVideoEl&&(this.remoteVideoEl=e.remoteVideoEl);const n=await vk(e);if(!n||!n.success)return this.state="idle",this.emitter.emit("error",{phase:"createCall",detail:n}),this.emitCallFailed("createCall",n),n;this.pc=n.pc,this.roomId=n.roomId,this.roomLink=n.roomLink||null,this.role=n.role||"initiator",this.dataChannel=n.dataChannel||null,this.messagesUI=n.messagesUI||null,this.state="waiting";const{drainIceCandidateQueue:s}=await Oe(async()=>{const{drainIceCandidateQueue:i}=await Promise.resolve().then(()=>mk);return{drainIceCandidateQueue:i}},void 0);return this.setupAnswerListener(this.roomId,this.pc,s),this.setupCancellationListener(this.roomId),this.setupRejectionListener(this.roomId),this.setupMemberJoinedListener(this.roomId),this.setupMemberLeftListener(this.roomId),this.emitter.emit("created",{roomId:this.roomId,roomLink:this.roomLink,role:this.role}),n}catch(n){throw this.state="idle",this.emitter.emit("error",{phase:"createCall",error:n}),this.emitCallFailed("createCall",n),n}}async answerCall(e={}){this.state="joining";try{e.localVideoEl&&(this.localVideoEl=e.localVideoEl),e.remoteVideoEl&&(this.remoteVideoEl=e.remoteVideoEl);const n=await wk(e);return!n||!n.success?(this.state="idle",this.emitter.emit("error",{phase:"answerCall",detail:n}),this.emitCallFailed("answerCall",n),n):(this.pc=n.pc,this.roomId=n.roomId,this.role=n.role||"joiner",this.dataChannel=n.dataChannel||null,this.messagesUI=n.messagesUI||null,this.state="connected",this.setupCancellationListener(this.roomId),this.setupMemberJoinedListener(this.roomId),this.setupMemberLeftListener(this.roomId),this.emitter.emit("answered",{roomId:this.roomId,role:this.role}),n)}catch(n){throw this.state="idle",this.emitter.emit("error",{phase:"answerCall",error:n}),this.emitCallFailed("answerCall",n),n}}async hangUp({emitCancel:e=!0,reason:n="user_hung_up"}={}){if(!this.isHangingUp){this.isHangingUp=!0;try{if(e&&this.roomId)try{await j.cancelCall(this.roomId,le(),n)}catch(s){console.warn("CallController: cancelCall failed (non-fatal)",s)}await this.cleanupCall({reason:n}),this.emitter.emit("hangup",{roomId:this.roomId,reason:n})}catch(s){throw this.emitter.emit("error",{phase:"hangUp",error:s}),s}finally{this.isHangingUp=!1}}}isRemoteHangup(e){return e?["remote","cancelled","partner_disconnected","connection_failed"].some(s=>e.includes(s)):!1}emitCallFailed(e,n){this.emitter.emit("callFailed",{phase:e,error:n?.message||n?.error||n||"Unknown error"})}async cleanupCall({reason:e}={}){if(!this.isCleaningUp){this.isCleaningUp=!0;try{const n=this.roomId,s=this.partnerId;this.removeTrackedListeners();try{await j.leaveRoom(le(),this.roomId)}catch{}try{if(this.pc){try{this.pc.close()}catch{}this.pc=null}}catch{}try{this.remoteVideoEl&&(this.remoteVideoEl.srcObject=null)}catch(i){console.warn("CallController: failed to clear remote video",i)}try{this.localVideoEl&&(this.localVideoEl.srcObject=null)}catch(i){console.warn("CallController: failed to clear local video",i)}try{const{cleanupLocalStream:i}=await Oe(async()=>{const{cleanupLocalStream:r}=await Promise.resolve().then(()=>ik);return{cleanupLocalStream:r}},void 0);i()}catch(i){console.warn("CallController: failed to cleanup local stream",i)}try{const{resetLocalStreamInitFlag:i}=await Oe(async()=>{const{resetLocalStreamInitFlag:r}=await Promise.resolve().then(()=>hA);return{resetLocalStreamInitFlag:r}},void 0);i()}catch{}this.isRemoteHangup(e)&&this.emitter.emit("remoteHangup",{roomId:n,partnerId:s,reason:e}),this.resetState(),this.emitter.emit("cleanup",{roomId:n,partnerId:s,reason:e})}catch(n){throw this.emitter.emit("error",{phase:"cleanupCall",error:n}),n}finally{this.isCleaningUp=!1}}}}const te=new Sk,ya={default:{echoCancellation:!0,noiseSuppression:!0,autoGainControl:!0},withVoiceIsolationIfSupported:{echoCancellation:!0,noiseSuppression:!0,autoGainControl:!0,voiceIsolation:!0,restrictOwnAudio:!0,googHighpassFilter:!0,googTypingNoiseDetection:!0,highpassFilter:!0,typingNoiseDetection:!0}};function bg(){const t=navigator.mediaDevices.getSupportedConstraints();return["voiceIsolation","highpassFilter","typingNoiseDetection"].every(s=>t[s])?ya.withVoiceIsolationIfSupported:ya.default}const Ck=()=>ya.default,Ik={desktop:{landscape:{width:{ideal:1920},height:{ideal:1080},frameRate:{min:10,ideal:30},aspectRatio:{ideal:16/9}},portrait:{width:{ideal:1080},height:{ideal:1920},frameRate:{min:10,ideal:30},aspectRatio:{ideal:9/16}}},mobile:{portrait:{width:{ideal:1080},height:{ideal:1920},aspectRatio:{ideal:9/16},frameRate:{ideal:30}},landscape:{width:{ideal:1920},height:{ideal:1080},aspectRatio:{ideal:16/9},frameRate:{ideal:30}}}},Tk=()=>window.screen?.orientation?.type?.includes("portrait")||window.orientation===0||window.orientation===180;function il(t){const e=Tk()?"portrait":"landscape",s=/Mobi|Android/i.test(navigator.userAgent)?"mobile":"desktop",i=Ik[s][e];return{facingMode:t,...i}}function Rk(){return!!(navigator.mediaDevices&&navigator.mediaDevices.enumerateDevices)}async function kk(){return Rk()?(await navigator.mediaDevices.enumerateDevices()).filter(e=>e.kind==="videoinput"):[]}async function Ak(){const t=await kk();let e=!1,n=!1;return t.forEach(s=>{const i=s.label.toLowerCase();(i.includes("front")||i.includes("user"))&&(e=!0),(i.includes("back")||i.includes("rear")||i.includes("environment"))&&(n=!0)}),e&&n}async function Nk({localStream:t,localVideo:e,currentFacingMode:n,peerConnection:s=null}){if(!t||!e)return console.error("switchCamera: missing localStream or localVideo"),null;const i=n==="user"?"environment":"user";try{const r=await navigator.mediaDevices.getUserMedia({video:il(i),audio:bg()}),o=r.getVideoTracks()[0],a=r.getAudioTracks()[0],c=t.getVideoTracks()[0],l=c?c.enabled:!0,u=t.getAudioTracks()[0],d=u?!u.enabled:!1;if(s){const h=s.getSenders().find(p=>p.track&&p.track.kind==="video");h&&h.replaceTrack(o);const f=s.getSenders().find(p=>p.track&&p.track.kind==="audio");f&&a&&f.replaceTrack(a)}return o&&(o.enabled=l),a&&(a.enabled=!d),t.getTracks().forEach(h=>h.stop()),e.srcObject=new MediaStream([o].filter(Boolean)),{newStream:r,facingMode:i}}catch(r){return console.error("Failed to switch camera:",r),null}}let Co=!1,Wt=null,Vt=null;function Pk({getLocalStream:t,getFacingMode:e}){return Wt&&Vt&&Wt.removeEventListener("change",Vt),Wt=window.matchMedia("(orientation: portrait)"),Vt=()=>{try{const n=typeof t=="function"?t():null,s=typeof e=="function"?e():"user";Lk({localStream:n,currentFacingMode:s})}catch(n){console.error("Orientation handler failed:",n)}},Wt.addEventListener("change",Vt),()=>{Wt&&Vt&&Wt.removeEventListener("change",Vt),Wt=null,Vt=null}}async function Lk({localStream:t,currentFacingMode:e}){if(!(Co||!t?.getVideoTracks()[0])){Co=!0;try{const n=t.getVideoTracks()[0],s=il(e);U("Applying constraints:",s),await n.applyConstraints(s),U("Video constraints updated successfully")}catch(n){console.error("Failed to apply orientation constraints:",n)}finally{Co=!1}}}let Ea=!1,mr=[];function Ok(t,e){if(!e)return;const n=e.getAudioTracks()[0];n&&(n.enabled=t)}function Dk(t,e,n){n&&(n.muted=!t,n.volume=e)}function Mk(t,e){const n=e.querySelector("i");n.className=t?"fa fa-microphone-slash":"fa fa-microphone"}function xk(t,e){if(!t)return;const n=()=>{if(t.muted!==Ea){const s=e.querySelector("i");s.className=t.muted?"fa fa-volume-mute":"fa fa-volume-up",Ea=t.muted}};t.addEventListener("volumechange",n),mr.push(()=>{t&&t.removeEventListener("volumechange",n)})}function Fk({getLocalStream:t,getLocalVideo:e,getRemoteVideo:n,getPeerConnection:s=()=>null,setLocalStream:i=null,micBtn:r,cameraBtn:o,switchCameraBtn:a,mutePartnerBtn:c,fullscreenPartnerBtn:l}){r&&(r.onclick=()=>{const d=t(),h=e();if(!h||!d)return;const f=!h.muted;Ok(!f,d),Dk(!f,0,h),Mk(f,r)}),o&&(o.onclick=()=>{const d=t();if(!d)return;const h=d.getVideoTracks()[0];if(h){h.enabled=!h.enabled;const f=o.querySelector("i");f.className=h.enabled?"fa fa-video":"fa fa-video-slash"}});const u=Pk({getLocalStream:t,getFacingMode:ga});mr.push(u),a&&(a.onclick=async()=>{const d=await Nk({localStream:t(),localVideo:e(),currentFacingMode:ga(),peerConnection:s()||null});d?(og(d.facingMode),console.log("Switched camera to facingMode:",d.facingMode),d.newStream&&typeof i=="function"&&i(d.newStream)):console.error("Camera switch failed.")},(async()=>await Ak()?I(a):y(a))()),c&&(c.onclick=()=>{const d=n();d&&(d.muted=!d.muted)}),l&&(l.onclick=()=>{const d=n();d.requestFullscreen?d.requestFullscreen():d.webkitRequestFullscreen&&d.webkitRequestFullscreen()})}function Uk(){mr.forEach(t=>t()),mr=[],Ea=!1}let gs=null,Et=null,$=null,x=null,bd=!1,wi=!1,qe=[],va="",ce=-1,Di=[];const $k="AIzaSyBq18HUW_U9E3AhSKVP58LZFK_GfzNHIGQ",Bk="https://www.googleapis.com/youtube/v3";async function Hk(){if(bd||wi)return!1;wi=!0;const{initializeYouTubeElements:t}=await Oe(async()=>{const{initializeYouTubeElements:o}=await Promise.resolve().then(()=>HR);return{initializeYouTubeElements:o}},void 0),e=await t();if(gs=e.searchContainer,Et=e.searchBtn,$=e.searchQuery,x=e.searchResults,!gs||!Et||!$||!x)return console.error("YouTube search elements not found in DOM"),wi=!1,!1;try{const{onOneTapStatusChange:o}=await Oe(async()=>{const{onOneTapStatusChange:c}=await Promise.resolve().then(()=>ER);return{onOneTapStatusChange:c}},void 0),a=o(c=>{c==="displayed"?y(gs):I(gs)});Di.push(a)}catch(o){console.warn("Could not set up One Tap search section visibility:",o)}const n=o=>/^https?:\/\//i.test(o),s=o=>{(x?.querySelectorAll(".search-result-item")||[]).forEach((c,l)=>{l===o?(c.classList.add("focused"),c.scrollIntoView({block:"nearest"})):c.classList.remove("focused")}),ce=o??-1};Et.onclick=async()=>{const o=$.value.trim();if(Hc($)){I($),$.focus();return}if(!o){Mi(),y($);return}if(Id()&&o===va)wa(qe);else if(!n(o))await Sd(o);else{yn&&await yn({url:o}),y(x),$.value="",y($),ce=-1;return}},gs.addEventListener("keydown",async o=>{const a=x.querySelectorAll(".search-result-item");if(a.length>0&&(o.key==="ArrowDown"||o.key==="ArrowUp")){if(o.key==="ArrowDown"){let c=ce+1;c>=a.length&&(c=0),s(c)}else if(o.key==="ArrowUp"){let c=ce-1;c<0&&(c=ce===-1?0:a.length-1),s(c)}return}if(o.key==="Enter"){if(a.length>0&&ce>=0){a[ce].click(),y($),y(x),ce=-1;return}const c=$.value.trim();if(c)if(Id()&&c===va)wa(qe);else if(!n(c))await Sd(c);else{yn&&await yn({url:c}),y(x),ce=-1,$.value="",y($);return}}else o.key==="Escape"&&(Vk()?Mi():$.value?$.value="":y($))}),$.addEventListener("input",()=>{$.value.trim()===""&&Mi(),ce=-1});const i=_a($,()=>y($),{ignore:[Et],esc:!1});Di.push(i);const r=_a(x,()=>y(x),{ignore:[Et],esc:!1});return Di.push(r),wi=!1,bd=!0,!0}async function Sd(t){if(!Et||!x){console.error("Search elements not initialized");return}qe=[],va=t,Et.disabled=!0,x.innerHTML='<div class="search-loading">Searching YouTube...</div>',I(x);try{const e=await fetch(`${Bk}/search?part=snippet&maxResults=10&q=${encodeURIComponent(t)}&type=video&key=${$k}`);if(!e.ok)throw e.status===403?new Error("YouTube API quota exceeded. Please try again later."):e.status===400?new Error("Invalid API key or request."):new Error(`YouTube API error: ${e.status}`);const n=await e.json();if(!n.items||n.items.length===0){Cd("No videos found"),qe=[];return}qe=n.items.map(s=>({id:s.id.videoId,title:s.snippet.title,thumbnail:s.snippet.thumbnails.medium.url,channel:s.snippet.channelTitle,url:`https://www.youtube.com/watch?v=${s.id.videoId}`})),wa(qe)}catch(e){console.error("YouTube search failed:",e),Cd(e.message||"Search failed. Please try again.")}finally{Et.disabled=!1}}function wa(t){if(!x){console.error("Search results element not initialized");return}if(!t||t.length===0){x.innerHTML='<div class="no-results">No results found</div>',qe=[],ce=-1;return}x.innerHTML="",t.forEach(n=>{const s=document.createElement("div");s.className="search-result-item",s.innerHTML=`
      <img src="${n.thumbnail}" alt="${n.title}" class="result-thumbnail">
      <div class="search-result-info">
        <div class="search-result-title">${n.title}</div>
        <div class="search-result-channel">${n.channel}</div>
      </div>
    `,s.onclick=async()=>{if(yn){if(await yn(n),y(x),ce=-1,!$){console.error("Search query element not initialized");return}$.value="",y($)}},x.appendChild(s)}),I(x),ce=0,x.querySelectorAll(".search-result-item").forEach((n,s)=>{s===ce?(n.classList.add("focused"),n.scrollIntoView({block:"nearest"})):n.classList.remove("focused")})}function Cd(t){if(qe=[],ce=-1,!x){console.error("Search results element not initialized");return}x.innerHTML=`<div class="search-error">${t}</div>`,I(x)}function Mi(){qe=[],ce=-1,x&&(x.innerHTML="",y(x))}function Wk(){Mi(),Di.forEach(t=>t())}function Vk(){return!Hc(x)}function Id(){return qe.length>0}function jk({title:t="",iconHtml:e="",disabledAttr:n="",id:s="",className:i="",onClick:r=null,onMount:o=null,parent:a=null}={}){return qp({initialProps:{title:t,iconHtml:e,disabledAttr:n,id:s},template:'\n      <button id="${id}" title="${title}" ${disabledAttr} onclick="handleClick">\n        ${iconHtml}\n      </button>\n    ',className:i,handlers:{handleClick:r},onMount:o,parent:a})}const Gk=({shouldShowInProd:t=!1}={})=>{if(localStorage.getItem("debug:console"),!t)return;const e=[];"serviceWorker"in navigator?e.push("✓ Service Workers supported"):e.push("❌ Service Workers not supported"),window.location.protocol==="https:"||window.location.hostname==="localhost"||window.location.hostname==="127.0.0.1"?e.push("✓ Secure context (HTTPS/localhost)"):e.push("❌ Not served over HTTPS or localhost"),window.matchMedia("(display-mode: standalone)").matches||window.navigator.standalone===!0?e.push("⚠️  App is already installed"):e.push("✓ App not yet installed"),console.group("[PWA] Install Prompt Debug"),console.log("Installability checks:"),e.forEach(s=>console.log(s)),console.log(`
Possible reasons beforeinstallprompt did not fire:`),console.log("1. Chrome throttled the prompt (recently dismissed/uninstalled)"),console.log("2. Manifest or Service Worker issues"),console.log("3. App already installed"),console.log(`
Workarounds:`),console.log("• Try in Incognito mode (bypasses throttling)"),console.log('• Use Chrome menu: ⋮ → "Install HangVidU..."'),console.groupEnd()};let qt=null,Td=!1,he=null;function zk(){return/iphone|ipad|ipod/i.test(window.navigator.userAgent)&&!window.MSStream}function qk(){if(Oe(()=>import("./update-handlers-_fAxyk55.js"),[]).setupUpdateHandler().catch(e=>{console.debug("[PWA] Update handler setup failed:",e)}),window.matchMedia("(display-mode: standalone)").matches||window.navigator.standalone===!0){console.info("[PWA]: App is already installed"),he&&y(he);return}if(!he){const e=document.querySelector(".top-right-menu");if(!e){console.warn("[PWA]: .top-right-menu container not found");return}he=jk({id:"install-btn",title:"Install App",iconHtml:'<i class="fa fa-plus"></i>',className:"hidden",onMount:n=>{},parent:e})}const t=he.querySelector?.("button")??he;if(!(t instanceof HTMLElement)){console.warn("[PWA]: Install button element not found in component");return}if(zk()){he.update({iconHtml:'<i class="fa fa-info"></i>',title:"Show Install Instructions"}),y(he),t.onclick=()=>{alert("Tap the Share icon and choose 'Add to Home Screen' to install this app.")};return}Td||(t.addEventListener("click",async()=>{if(!qt){console.warn("[PWA]: beforeInstallEvent is null - beforeinstallprompt may not have fired"),Gk({shouldShowInProd:!0});return}try{await qt.prompt();const{outcome:e}=await qt.userChoice;U(`User choice outcome: ${e}`),console.info(e==="accepted"?"[PWA]: User accepted the install prompt":"[PWA]: User dismissed the install prompt"),!fR()&&y(he),qt=null}catch(e){y(he),console.error("Error showing install prompt:",e)}}),Td=!0),window.addEventListener("appinstalled",()=>{y(he),qt=null}),qt?I(he):y(he)}window.addEventListener("beforeinstallprompt",t=>{console.debug("[PWA]: beforeinstallprompt fired"),t.preventDefault(),qt=t,he&&I(he)});const Yk=Object.freeze(Object.defineProperty({__proto__:null,setupPWA:qk},Symbol.toStringTag,{value:"Module"}));const Kk=async()=>{const t=Yr(!1);if(t&&t instanceof MediaStream)return console.debug("Reusing existing local MediaStream."),t;const e=il("user"),n=bg();try{const s=await navigator.mediaDevices.getUserMedia({video:e,audio:n});return dr(s),s}catch(s){if(s.name==="OverconstrainedError"){console.warn(`❌ Constraint failed on property: ${s.constraint}, falling back to basic constraints`);const i=Ck(),r=await navigator.mediaDevices.getUserMedia({video:!0,audio:i});return dr(r),r}throw s}};async function Jk(t){const e=await Kk(),n=new MediaStream(e.getVideoTracks());return t.srcObject=n,!0}function Qk(t,e,n){return t.ontrack=s=>{if(U(`REMOTE TRACK RECEIVED: ${s.track.kind}`),!s.streams||!s.streams[0]||!(s.streams[0]instanceof MediaStream))return console.error("No valid remote MediaStream found in event.streams:",s.streams),!1;const i=s.streams[0];if(qr(!1)!==i){ag(i),e.srcObject=i,xk(e,n);try{const o=document.getElementById("remote-video-box")||e.parentElement;o&&(o.classList?.remove("hidden"),e.classList?.remove("hidden"),o.style.visibility="visible",o.style.opacity="1",o.style.position="",o.style.left="",o.style.top="",e.style.visibility="visible",e.style.opacity="1")}catch(o){console.warn("Visibility override failed:",o)}}},!0}let Rd=!1;function Xk(t,e){const n=document.createElement("dialog");n.className="copy-link-dialog";const s=document.createElement("div");s.className="copy-link-dialog__content";const i=document.createElement("h2");i.className="copy-link-dialog__title",i.textContent=e.title,s.appendChild(i);const r=document.createElement("div");r.className="copy-link-dialog__input-container";const o=document.createElement("input");o.type="text",o.className="copy-link-dialog__input",o.value=t,o.readOnly=!0,o.setAttribute("aria-label","Link to copy"),r.appendChild(o),s.appendChild(r);const a=document.createElement("div");a.className="copy-link-dialog__buttons";const c=document.createElement("button");c.className="copy-link-dialog__button copy-link-dialog__button--primary",c.textContent=e.buttonText,c.autofocus=!0;const l=document.createElement("button");l.className="copy-link-dialog__button copy-link-dialog__button--secondary",l.textContent=e.cancelText,a.appendChild(c),a.appendChild(l),s.appendChild(a);const u=document.createElement("p");return u.className="copy-link-dialog__feedback",u.setAttribute("aria-live","polite"),s.appendChild(u),n.appendChild(s),{dialog:n,input:o,copyButton:c,cancelButton:l,feedback:u}}function Zk(t,e={}){const n={title:"Share this link",buttonText:"Copy",cancelText:"Cancel",successMessage:"✓ Copied to clipboard!",errorMessage:"Failed to copy. Click the link to select it manually.",autoClose:!0,autoCloseDelay:1200,onCopy:null,onError:null,onCancel:null,onClose:null,...e};eA();const{dialog:s,input:i,copyButton:r,cancelButton:o,feedback:a}=Xk(t,n);tA(s);let c=!1;const l=async()=>{await nA(t,i)?(c=!0,a.textContent=n.successMessage,a.classList.remove("copy-link-dialog__feedback--error"),n.onCopy&&n.onCopy(t),n.autoClose&&setTimeout(()=>{s.close()},n.autoCloseDelay)):(a.textContent=n.errorMessage,a.classList.add("copy-link-dialog__feedback--error"),i.readOnly=!1,i.addEventListener("click",()=>{i.select()}),n.onError&&n.onError())};return r.addEventListener("click",l),o.addEventListener("click",()=>{n.onCancel&&n.onCancel(),s.close()}),s.addEventListener("keydown",u=>{u.key==="Enter"&&!u.shiftKey&&!u.ctrlKey&&!u.altKey&&!u.metaKey&&(u.preventDefault(),l())}),s.addEventListener("close",()=>{!c&&n.onCancel&&n.onCancel(),n.onClose&&n.onClose(),setTimeout(()=>{s.remove()},300)}),document.body.appendChild(s),s.showModal(),s}function eA(){if(Rd)return;const t=document.createElement("style");t.textContent=`
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
  `,document.head.appendChild(t),Rd=!0}function tA(t){t.showModal||(t.showModal=function(){this.setAttribute("open",""),this.style.display="block",this.style.position="fixed",this.style.top="50%",this.style.left="50%",this.style.transform="translate(-50%, -50%)";const e=getComputedStyle(document.documentElement).getPropertyValue("--z-ui-overlay").trim();this.style.zIndex=e||"1000"},t.close=function(){this.removeAttribute("open"),this.style.display="none"})}async function nA(t,e=null){if(navigator.clipboard&&navigator.clipboard.writeText)try{return await navigator.clipboard.writeText(t),!0}catch(n){return console.warn("Clipboard API failed, using fallback:",n),!1}if(!e)return!1;try{return e.select(),e.setSelectionRange(0,99999),document.execCommand("copy")}catch(n){return console.error("Fallback copy failed:",n),!1}}function sA(){const t=window.matchMedia&&window.matchMedia("(display-mode: standalone)").matches||navigator.standalone===!0,e=/iphone|ipad|ipod/i.test(navigator.userAgent||"");if(!t||!e||!window.location.hostname.includes("github.io"))return;const s="https://vidu-aae11.web.app",i=s.replace(/\/$/,"");let r;try{r=new URL(i).hostname}catch(l){console.error("[PWA Redirect] Invalid VITE_APP_HOSTING_URL:",s,l);return}if(window.location.hostname===r)return;const o="/HangVidU/";let a=window.location.pathname;a.startsWith(o)?a="/"+a.slice(o.length):a==="/HangVidU"&&(a="/");let c;try{c=new URL(a+window.location.search+window.location.hash,i).toString()}catch(l){console.error("[PWA Redirect] Failed to construct target URL:",l);return}console.log("[PWA Redirect] iOS standalone PWA on gh-pages → redirecting to Firebase Hosting:",c),window.location.replace(c)}pR(!0);_().disable();let rl=[];async function iA(){oA();const t=Jp(),n=["localVideoEl","remoteVideoEl","localBoxEl","remoteBoxEl","chatControls","lobbyDiv","titleAuthBar"].filter(s=>!t[s]);if(n.length>0)return console.error("Critical elements missing:",n),!1;try{(await Oe(async()=>{const{setupPWA:i}=await Promise.resolve().then(()=>Yk);return{setupPWA:i}},void 0)).setupPWA,Hk(),lA(),await Wp;const s=$R(jr);return s&&rl.push(s.dispose),await _r(),!0}catch(s){return console.error("Failed to get user media:",s),!1}}let ba=!1;function rA(){ba=!1}async function _r(){ba||(ba=!0,await Jk(we),Fk({getLocalStream:Yr,getLocalVideo:()=>we,getRemoteVideo:()=>K,getPeerConnection:()=>te.getState().pc,setLocalStream:dr,micBtn:rs,cameraBtn:os,switchCameraBtn:is,mutePartnerBtn:je,fullscreenPartnerBtn:Gr}),we&&(we.addEventListener("enterpictureinpicture",()=>ee&&y(ee)),we.addEventListener("leavepictureinpicture",()=>{ee&&!(di()&&hr())&&I(ee)})))}function oA(){y(B),y(ee),y(Ce),y(Ae)}function xi(t=null){return{localStream:Yr(),localVideoEl:we,remoteVideoEl:K,mutePartnerBtn:je,setupRemoteStream:Qk,setupWatchSync:qR,targetRoomId:t}}function Fi(t,e=!1){return t.success?(e&&t.roomLink&&Zk(t.roomLink,{onCopy:()=>U("Link ready! Share with your partner."),onCancel:()=>U("Link ready! Use the copy button to use it, or create a new one.")}),!0):!1}async function Kr(t,{forceInitiator:e=!1}={}){const n=Date.now();if(e){_().logRoomCreation(t,!0,{creationTime:n,listenerAttachTime:n,timeDiff:0},{trigger:"force_initiator",reason:"calling_saved_contact"}),await _r();const r=await te.createCall(xi(t));return Fi(r,!1)}let s=await j.checkRoomStatus(t);if(s.exists&&!s.hasMembers){let o=0;for(;o<3&&!s.hasMembers;)await new Promise(a=>setTimeout(a,250*(o+1))),s=await j.checkRoomStatus(t),o++}if(!s.exists||!s.hasMembers){_().logRoomCreation(t,!0,{creationTime:n,listenerAttachTime:n,timeDiff:0},{trigger:"room_empty_or_nonexistent",roomExists:s.exists,memberCount:s.memberCount||0}),await _r();const r=await te.createCall(xi(t));return Fi(r,!0)}_().log("ROOM","JOINING_EXISTING",{roomId:t,memberCount:s.memberCount,roomExists:s.exists});const i=await te.answerCall({roomId:t,...xi()});return Fi(i,!1)}const be=new Set,Sg=new Map;function kd(t){t&&($r(t),be.delete(t),Sg.delete(t),_().log("LISTENER","INCOMING_CLEANUP",{roomId:t,remainingListeners:be.size}))}function aA(){U(`[LISTENER] Removing all incoming listeners (${be.size} rooms)`);const t=Array.from(be);t.forEach(e=>{$r(e)}),be.clear(),Sg.clear(),_().log("LISTENER","ALL_INCOMING_CLEANUP",{roomsCleared:t.length})}async function cA(t){const e=Date.now(),n=e+1440*60*1e3,s=Ze();if(s){const i=Ic(s,t);await dt(i,{roomId:t,savedAt:e,expiresAt:n});return}try{const i=localStorage.getItem("recentCalls")||"{}",r=JSON.parse(i);r[t]={roomId:t,savedAt:e,expiresAt:n},localStorage.setItem("recentCalls",JSON.stringify(r))}catch(i){console.warn("Failed to save recent call to localStorage",i)}}async function Io(t){const e=Ze();if(e){try{await Wn(Ic(e,t))}catch(n){console.warn("Failed to remove recent call from RTDB",n)}return}try{const n=localStorage.getItem("recentCalls")||"{}",s=JSON.parse(n);s[t]&&(delete s[t],localStorage.setItem("recentCalls",JSON.stringify(s)))}catch(n){console.warn("Failed to remove recent call from localStorage",n)}}function jn(t){t&&(be.has(t)&&(be.delete(t),$r(t)),U(`[LISTENER] Attaching listener for room: ${t} (total: ${be.size+1})`),be.add(t),_().logListenerAttachment(t,"member_join",be.size,{action:"incoming_call_listener_attached"}),j.onMemberJoined(t,async e=>{const n=e.key,s=e.val?e.val():null,i=le();if(n&&n!==i){_().logMemberJoinEvent(t,n,s||{},{detectedBy:"incoming_call_listener",currentUserId:i});const r=s&&typeof s.joinedAt=="number"?s.joinedAt:null,o=2e4;let a=!1,c="none",l=0;if(r&&(l=Date.now()-r,a=l<o,c="joinedAt"),!a){const N=await dg(n,t),ae=await hg(t);a=N||ae,c=N?"outgoingState":ae?"roomCreatedAt":"failed"}const u={isFresh:a,method:c,age:l,reason:a?"call_is_fresh":"call_is_stale"};if(_().logIncomingCallEvent(n,t,u,{memberData:s,joinedAt:r,CALL_FRESH_MS:o}),!a){_().logNotificationDecision("REJECT","stale_call",t,{age:l,validationMethod:c,joiningUserId:n});return}let d;try{d=await j.getRoomData(t)}catch{return}if(!d||typeof d!="object")return;const h=!!d.offer,f=!!d.answer,p=d.createdBy;if(!h||f||p===i)return;const E=te.getState();if(!!E.pc&&E.pc.connectionState==="connected"){_().logNotificationDecision("REJECT","already_in_call",t,{joiningUserId:n,currentCallState:E.pc?.connectionState});return}if(_().logNotificationDecision("SHOW","fresh_call_detected",t,{joiningUserId:n,freshnessResult:u}),await Zc(`Incoming call from ${n} for room ${t}.

Accept?`))kd(t),_().logNotificationDecision("ACCEPT","user_accepted",t,{joiningUserId:n}),Kr(t).catch(N=>{console.warn("Failed to answer incoming call:",N),_().logFirebaseOperation("join_room_on_accept",!1,N,{roomId:t,joiningUserId:n})});else{_().logNotificationDecision("REJECT","user_rejected",t,{joiningUserId:n});try{await j.rejectCall(t,le(),"user_rejected")}catch(N){console.warn("Failed to signal rejection via RTDB:",N)}await Io(t).catch(N=>{console.warn("Failed to remove recent call on rejection:",N)})}}}),j.onCallCancelled(t,async e=>{if(e&&typeof e.val=="function"&&e.val()){try{const{dismissActiveConfirmDialog:s}=await Oe(async()=>{const{dismissActiveConfirmDialog:i}=await Promise.resolve().then(()=>hk);return{dismissActiveConfirmDialog:i}},void 0);typeof s=="function"&&s()}catch{}await Io(t).catch(()=>{})}}),j.onMemberLeft(t,async e=>{const n=e.key,s=le();if(!(!n||n===s))try{(await j.checkRoomStatus(t)).hasMembers||(await Io(t),kd(t),U(`Removed saved recent call and listeners for room ${t} because it is now empty`))}catch(i){console.warn("Failed to evaluate room status on member leave",i)}}))}async function Ad(){const t=Date.now();_().log("LISTENER","STARTUP_BEGIN",{timestamp:t,currentListenerCount:be.size});try{if(typeof window<"u"){const{getCurrentUserAsync:n}=await Oe(async()=>{const{getCurrentUserAsync:s}=await Promise.resolve().then(()=>TR);return{getCurrentUserAsync:s}},void 0);await n()}}catch{}const e=Ze();if(_().log("LISTENER","AUTH_STATE_DETERMINED",{isLoggedIn:!!e,userId:e||"guest"}),e){const n=pI(e);try{const s=await Zt(n),i=s.exists()?s.val():null,r=new Set;if(i)for(const[o,a]of Object.entries(i)){if(!a||a.expiresAt&&a.expiresAt<Date.now()){await Wn(Ic(e,o)).catch(()=>{});continue}r.add(o)}try{const o=await gr();Object.values(o||{}).forEach(a=>{a?.roomId&&r.add(a.roomId)})}catch{}r.forEach(o=>jn(o)),_().log("LISTENER","STARTUP_COMPLETE",{storage:"rtdb",roomsToListen:Array.from(r),totalListeners:be.size,duration:Date.now()-t})}catch(s){console.warn("Failed to read recent calls from RTDB",s),_().logFirebaseOperation("read_recent_calls",!1,s,{storage:"rtdb",userId:e})}return}try{const n=localStorage.getItem("recentCalls")||"{}",s=JSON.parse(n),i={},r=new Set;for(const[o,a]of Object.entries(s||{}))!a||a.expiresAt&&a.expiresAt<Date.now()||(i[o]=a,r.add(o));try{const o=await gr();Object.values(o||{}).forEach(a=>{a?.roomId&&r.add(a.roomId)})}catch{}r.forEach(o=>jn(o)),localStorage.setItem("recentCalls",JSON.stringify(i)),_().log("LISTENER","STARTUP_COMPLETE",{storage:"localStorage",roomsToListen:Array.from(r),totalListeners:be.size,duration:Date.now()-t,expiredRoomsRemoved:Object.keys(s||{}).length-r.size})}catch(n){console.warn("Failed to read recent calls from localStorage",n),_().logFirebaseOperation("read_recent_calls",!1,n,{storage:"localStorage"})}}function To(){return W&&Ce&&!Ce.classList.contains("hidden")&&W.src&&W.src.trim()!==""}let Nd=!1;function lA(){if(Nd)return;const t=()=>{const e=document.activeElement;return e&&(e.tagName==="INPUT"||e.tagName==="TEXTAREA"||e.isContentEditable)};document.addEventListener("keydown",e=>{if(!t()&&((e.key==="w"||e.key==="W")&&(console.log("=== W KEY PRESSED ==="),console.log("lastWatched:",ps()),console.log("isYTVisible():",wo()),console.log("isSharedVideoVisible():",To()),console.log("isWatchModeActive():",di()),ps()==="yt"?wo()?(fa(),Oi()):(eg(),ma()):ps()==="url"&&(To()?(y(Ce),Oi()):(I(Ce),ma()))),e.key==="m"||e.key==="M")){const n=te.getState();n.messagesUI&&n.messagesUI.toggleMessages()}e.key==="Escape"&&(ps()==="yt"&&wo()?(zr(),fa()):ps()==="url"&&To()&&(W.pause(),y(Ce)),Oi())}),Nd=!0}const Cg=async()=>{await _r();const t=await te.createCall(xi());Fi(t,!0)};Le.onclick=Cg;$t.onclick=Cg;Ve.onclick=async()=>{console.debug("Hanging up..."),await te.hangUp({emitCancel:!0,reason:"user_hung_up"})};async function uA(){const e=new URLSearchParams(window.location.search).get("room");if(!e)return!1;const n=await Kr(e);return n||(Vr(),ug()),n}sA();window.onload=async()=>{if(!await iA()){Le.disabled=!0,console.error("Initialization failed. Cannot start chat.");return}await Ad().catch(i=>console.warn("Failed to start saved-room listeners",i)),Gs(Je).catch(i=>{console.warn("Failed to render contacts list:",i)});let e=null;const n=$c(async({isLoggedIn:i,user:r})=>{try{const o=e===null,a=e===!0&&!i,c=e===!1&&i;e=i,await Gs(Je),a?(U("[AUTH] User logged out - cleaning up incoming listeners"),aA()):c?(U("[AUTH] User logged in - re-attaching incoming listeners"),await Ad().catch(l=>console.warn("Failed to re-attach saved-room listeners on login",l))):o&&i&&U("[AUTH] Initial load with logged-in user")}catch(o){console.warn("Failed to handle auth change:",o)}});rl.push(()=>{try{typeof n=="function"&&n()}catch{}}),await uA()};window.addEventListener("beforeunload",async t=>{const e=te.getState();if(e.pc&&e.pc.connectionState==="connected")return t.preventDefault(),t.returnValue="You are in an active call. Are you sure you want to leave?",t.returnValue;await dA()});te.on("memberJoined",({memberId:t,roomId:e})=>{console.debug("CallController memberJoined event",{memberId:t,roomId:e}),te.setPartnerId(t),Qc(),Xc().catch(n=>console.warn("Failed to clear calling state:",n)),cA(e).catch(n=>console.warn("Failed to save recent call:",n))});te.on("memberLeft",({memberId:t})=>{console.debug("CallController memberLeft event",{memberId:t}),console.info("Partner has left the call")});te.on("cleanup",({roomId:t,reason:e})=>{console.debug("CallController cleanup event",{roomId:t,reason:e}),Pt(),cg(),ug(),Vr()});te.on("cleanup",({roomId:t,partnerId:e,reason:n})=>{console.debug("CallController cleanup event",{roomId:t,partnerId:e,reason:n}),e&&t&&setTimeout(()=>{fk(e,t,Je).catch(s=>{console.warn("Failed to save contact after cleanup:",s)})},500)});async function dA(){await te.hangUp({emitCancel:!0,reason:"page_unload"}),Uk(),dI(),document.pictureInPictureElement&&document.exitPictureInPicture().catch(e=>console.error(e));const t=te.getState();t.messagesUI&&t.messagesUI.cleanup&&t.messagesUI.cleanup(),window.history.replaceState({},document.title,window.location.pathname),W.src="",lg(),we&&we.srcObject&&(we.srcObject=null),K&&K.srcObject&&(K.srcObject=null),Oi(),Vr(),zR("none"),qc(),Zp(!1),Wk(),rl.forEach(e=>e())}const hA=Object.freeze(Object.defineProperty({__proto__:null,joinOrCreateRoomWithId:Kr,listenForIncomingOnRoom:jn,resetLocalStreamInitFlag:rA},Symbol.toStringTag,{value:"Module"}));export{Oe as _,qp as c};
